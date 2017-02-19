/*
    ルーターのサンプルです。
    書き換えて利用してください。
*/

import riot from 'riot';
import route from 'riot-route';


route('/greeting',()=>{
    riot.mount('content', 'greeting');
});

route('/users', ()=>{
    riot.mount('content', 'users');
});

route('/starmap', ()=>{
    riot.mount('content', 'starmap');
});

route((path)=>{
    riot.mount('content', 'greeting');
    console.log('unhandled routing [' + path + '] show top page instead');
});

export default route;
