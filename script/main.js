import { multiplayerEvent,multiplayerEventOnline } from "./lib.js";

console.log("init js");

/* ------------------ Notre élément Html -------------------*/

let casesElement = document.getElementsByTagName('td') // tout notre cases
const iconReload = document.getElementById('icon-reload');
const containerWinner = document.getElementById('container-winner');
const playground = document.getElementById('main');
const localButton = document.getElementById('localButton');
const form = document.getElementById('form');
const inputPrenom  = document.getElementById('prenom');
const rondElement = `<div class="rond" ></div>`
const croisElement = `<div class="crois">
<div></div>
<div></div>
</div>`


/* ------------------ Notre variable -------------------*/

var winner = '#'
var playWithMachine = false;
var playMultyOnline = false;

var tableCases = [ // with default value
    ['#','#','#'],
    ['#','#','#'],
    ['#','#','#']
]

var booleanCases = [ // check if a case is occuped
    [false,false,false],
    [false,false,false],
    [false,false,false]
]

var togglePlayer = true; // true for ROND, false for CROIX

/********************* Notre variable for socket ***************/

export let playerName = null;
export var myId = null;

/* ------------------ Notre Fonction Principale -------------------*/

function main(){
    if (playWithMachine){
        // single player event here
    } else if (playMultyOnline){
        var socketServer = io('http://localhost:3000',{
            reconnectionAttempts: 3,
            time: 200,
        })
    
        socketServer.on('error',(err) => { 
            alert("server socket error",err.message);
        })
        socketServer.on("connect_error",(err) => {
            alert("server socket not connected",err.message);
        })
        
        socketServer.on('connect',() => {
            socketServer.emit('request_name',{ playerName: playerName });
            multiplayerEventOnline(socketServer,tableCases,booleanCases,togglePlayer,casesElement,croisElement,rondElement,winner,containerWinner)
        })
    
        socketServer.on('init_event',(init_value) => {
            if (playerName == init_value.playerName) {
                myId = init_value.playerId;
                console.log("✅ mutly online init, myId:",myId,"playerName:",playerName," playerFirst:",init_value.playerFirst);
            }
        })
    
    } else {
        multiplayerEvent(tableCases,booleanCases,togglePlayer,casesElement,croisElement,rondElement,winner,containerWinner);
        console.log("✅ multy offline init");
    }
}

/********************** Fonction pour DOM ******************************/

iconReload.addEventListener('click',(e) => {
    location.reload();
})

form.addEventListener('submit',(e) => {
    e.preventDefault();
    if (inputPrenom.value) {
        playerName = inputPrenom.value;
        playMultyOnline = true;
        form.classList.remove('show');
        playground.classList.remove('disable');
    }
    
    main();
})

localButton.addEventListener('click',() => {
    form.classList.remove('show');
    playground.classList.remove('disable');
    main();
})



/************************* Notre init Element *****************************/



















  

