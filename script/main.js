import { multiplayerEvent,multiplayerEventOnline } from "./lib.js";

console.log("init js");

/* ------------------ Notre élément Html -------------------*/

let casesElement = document.getElementsByClassName('case') // tout notre cases
const iconReload = document.getElementById('icon-reload');
const containerWinner = document.getElementById('container-winner');
const playground = document.getElementById('container');
const localButton = document.getElementById('localButton');
const formName = document.getElementById('form-name');
const formMode = document.getElementById('form-mode');
const formRoom = document.getElementById('form-room');
const containerTitle = document.getElementById('container-title');
const containerAcceuil = document.getElementById('container-acceuil');
const inputRoomName = document.getElementById('room');
const searchRoomButton = document.getElementById('searchRoomButton'); // not implementhed
const nameConainter = document.getElementById('userName');
const roomContainer = document.getElementById('roomName');
const inputPrenom  = document.getElementById('prenom');
const rondElement = `<div class="rond" ></div>`
const croisElement = `<hr/><hr/>`


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

/********************* Notre variable pour socket ***************/

export var playerName = null;
export var myId = null;
export var roomName = null;
export var matchId = null;

/* ------------------ Notre Fonction Principale -------------------*/

function main(){
        if (playWithMachine){
            // single player event here
        } else if (playMultyOnline){
            var socketServer = io('https://socket-server-tictactoe.onrender.com',{
                reconnectionAttempts: 3,
                time: 200,
            })
        
            // capture error
            socketServer.on('error',(err) => { 
                alert("server socket error",err.message);
            })
            socketServer.on("connect_error",(err) => {
                alert("server socket not connected",err.message);
            })
            
            // request name and roomName
            socketServer.on('connect',() => {
                socketServer.emit('request_name&room',{ playerName: playerName,roomName: roomName });
                multiplayerEventOnline(socketServer,tableCases,booleanCases,togglePlayer,casesElement,croisElement,rondElement,winner,containerWinner)
            })
        
            // tel on event inited
            socketServer.on('init_event',(init_value) => {
                if (playerName == init_value.playerName) {
                    myId = init_value.playerId;
                    matchId = init_value.matchId;
                    if (myId)
                        console.log("✅ mutly online init, myId:",myId,"mtachId:",matchId," playerFirst:",init_value.playerFirst);
                    else {
                        console.log("room already used");
                        playground.classList.add('disable');
                        containerData.classList.remove('show');
                        formMode.classList.add('show');
                    }
                }
            })
    
        } else {
            multiplayerEvent(tableCases,booleanCases,togglePlayer,casesElement,croisElement,rondElement,winner,containerWinner);
            console.log("✅ multy offline init");
        }
}

/********************** Fonction pour DOM ******************************/

iconReload.addEventListener('click',(e) => {
    alert("zevhbze")
    location.reload();
})

formName.addEventListener('submit',(e) => {
    e.preventDefault();
    if (inputPrenom.value) {
        playerName = inputPrenom.value.toLowerCase();

        formName.classList.remove('show');
        formMode.classList.add('show');
    }
})


formMode.addEventListener('submit', (e) => {
    e.preventDefault();
    formMode.classList.remove('show');
    formRoom.classList.add('show');
})

formRoom.addEventListener('submit',(e) => {
    e.preventDefault();
    if (inputRoomName.value) {
        roomName = inputRoomName.value;
        playMultyOnline = true;
        
        formRoom.classList.remove('show');


        containerTitle.classList.add('hidden');
        containerAcceuil.classList.add('hidden');
        playground.classList.remove('hidden');

        main(); // GO
    }
})

localButton.addEventListener('click',() => {
    formMode.classList.remove('show');
    playground.classList.remove('hidden');
    containerTitle.classList.add('hidden');
    containerAcceuil.classList.add('hidden');

    main();
})

// Empêcher les rechargements non désirés
window.addEventListener('beforeunload', (event) => {
    // Affiche une confirmation (optionnel, selon le navigateur)
    event.preventDefault();
    event.returnValue = ''; // Certains navigateurs nécessitent cela pour afficher une alerte
    console.log('Tentative de rechargement bloquée');
});


/************************* Notre init Element *****************************/



















  

