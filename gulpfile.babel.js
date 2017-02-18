import gulp from 'gulp';

import sass from 'gulp-sass';
import riot from 'gulp-riot';
import concat from 'gulp-concat';
import babel from 'gulp-babel';
import sourcemaps from 'gulp-sourcemaps';
import browserSync from 'browser-sync';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';

import browserify from 'browserify';
import babelify from 'babelify';
import source  from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';


// リソースファイルのコピー
// ディレクトリが増えた時は追加してください
// このタスクは自動監視では実行されません
// 必要な時に直接呼び出すか、gulp buildしてください
gulp.task('cpResource', function () {
    return gulp.src(
        ['src/img/**/*', 'src/fonts/**/*'],
        { base: 'src' }
    )
        .pipe(gulp.dest('dist'));
});

// htmlのコピー
// 今のところ特に何もしていません
gulp.task('cpHtml', function () {
    return gulp.src(
        ['src/*.html'],
        { base: 'src' }
    )
        .pipe(gulp.dest('dist'));
});

// js（riotタグ以外）をコンパイル・結合します
// ES2015で書けます
// 出力 : dist/js/main.js
// gulp.task('script', () =>
//     gulp.src('./src/js/**/*.js')
//         .pipe(plumber({
//             errorHandler: notify.onError("Error on compiling script : <%= error.message %>")
//         }))
//         .pipe(sourcemaps.init())
//         .pipe(babel())
//         .pipe(concat("main.js"))
//         .pipe(sourcemaps.write('./'))
//         .pipe(gulp.dest('./dist/js'))
// );
gulp.task('script', ()=> {

    browserify({ entries: ['src/js/index.js'] ,debug: true})
    .transform(babelify, {presets: ["es2015"]})
    .bundle()
    .on('error', function(err){   //ここからエラーだった時の記述
        notify.onError('Error on compiling es2015' + err.message);
        console.log(err.message);
        console.log(err.stack);
    })
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist/js/'))
})


// sassをコンパイル・結合します
// 出力 : dist/css/style.css
gulp.task('sass', () => {
    gulp.src('./src/css/**/*.scss')
        .pipe(plumber({
            errorHandler: notify.onError("Error on compiling sass : <%= error.message %>")
        }))
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(concat("style.css"))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/css'));
});


//riot
// riotタグをコンパイル・結合します
// 出力 : dist/js/tags.js
gulp.task('riot', () => {
    gulp.src(["src/tag/*.tag"])
        .pipe(plumber({
            errorHandler: notify.onError("Error on compiling riot tag : <%= error.message %>")
        }))
        .pipe(riot())
        .pipe(sourcemaps.init())
        .pipe(concat("tags.js"))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/js/'))
})

//自動監視のタスク
gulp.task('watch', () => {
    gulp.watch('./src/css/**/*.scss', ['sass']);
    gulp.watch('./src/js/**/*.js', ['script']);
    gulp.watch('./src/tag/**/*.tag', ['riot']);
    gulp.watch('./src/*.html', ['cpHtml']);

});


gulp.task("browserSync", () => {
    browserSync({
        server: {
            baseDir: "./dist"    // サーバとなる Root ディレクトリ
        }
    });
    // ファイルの監視 : 以下のファイルが変わったらリロード処理を呼び出す
    gulp.watch("./dist/**/*", ["reload"]);
});
gulp.task("reload", () => {
    browserSync.reload();
});

// ビルド
gulp.task("build", ["cpResource", "cpHtml", "script", "sass", "riot"]);

// 開始 : 最初に一式ビルドしてから監視を開始する
gulp.task("default", ["build", "watch", "browserSync", "reload"]);
