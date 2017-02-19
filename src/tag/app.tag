<app>
    <div>sample application</div>
    <div>
        <button onclick={ goGreeting }>Greeting</button>
        <button onclick={ goUsers }>Users list</button>
        <button onclick={ goStars }>StarMap</button>
    </div>
    <content></content>


    goGreeting(e){
        window.location="#"
    }
    goUsers(e){
        window.location="#users"
    }
    goStars(e){
        window.location="#starmap"
    }


</app>
