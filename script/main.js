import { multiplayerEvent } from "./lib.js";

console.log("init js");

/* ------------------ Notre élément Html -------------------*/

var winner = '#'
var playWithMachine = false;
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

var tableCases = [
    ['#','#','#'],
    ['#','#','#'],
    ['#','#','#']
]

var booleanCases = [
    [false,false,false],
    [false,false,false],
    [false,false,false]
]

var togglePlayer = false;


/* ------------------ Notre fonctions -------------------*/



const simpleplayer = () => {
    
}

if (playWithMachine){
    
} else {
    multiplayerEvent(tableCases,booleanCases,togglePlayer,casesElement,croisElement,rondElement,winner,containerWinner);
}


iconReload.addEventListener('click',(e) => {
    location.reload();
})



















  

