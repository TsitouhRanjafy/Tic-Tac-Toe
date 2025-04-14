import { multiplayerEvent } from "./lib.js";

console.log("init js");

/* ------------------ Notre élément Html -------------------*/

let casesElement = document.getElementsByTagName('td') // tout notre cases
const iconReload = document.getElementById('icon-reload');
const containerWinner = document.getElementById('container-winner');
const main = document.getElementById('main')
const rondElement = `<div class="rond" ></div>`
const croisElement = `<div class="crois">
<div></div>
<div></div>
</div>`



/* ------------------ Notre variable -------------------*/

var winner = '#'
var playWithMachine = false;
var plaOnline = true;

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

const socketServer = io('http://localhost:3000',{
    reconnectionAttempts: 3,
    time: 200,
})

/* ------------------ Notre fonctions -------------------*/

const simpleplayer = () => {
    
}

if (playWithMachine){
    // single player event here
} else if (plaOnline){

    socketServer.on('error',(err) => { 
        alert("server socket error",err.message);
    })
    socketServer.on("connect_error",(err) => {
        alert("server socket not connected",err.message);
    })
    socketServer.on('connect',(err) => {
        console.log("✅ mutly online init");
    })

} else {
    console.log("multy offline init");
    multiplayerEvent(tableCases,booleanCases,togglePlayer,casesElement,croisElement,rondElement,winner,containerWinner);
}


iconReload.addEventListener('click',(e) => {
    location.reload();
})



















  

