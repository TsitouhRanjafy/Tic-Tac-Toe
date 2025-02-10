console.log("init js");

/* ------------------ Notre élément Html -------------------*/

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
var winner = '#'
var playWithMachine = true;
let cases = document.getElementsByTagName('td') // tout notre cases
const iconReload = document.getElementById('icon-reload');
const containerWinner = document.getElementById('container-winner');
const main = document.getElementById('main')
const rondHtml = `<div class="rond" ></div>`
const croisHtml = `<div class="crois">
                        <div></div>
                        <div></div>
                    </div>`


var togglePlayer = true;

const reload = () => {
    location.reload();
}


/*-------------- NOTRE FONCTION START------------------ */

const checkWinner = () => {

    for (let i=1;i <= 3;i++){
        
        // pour ligne 
        // 1-1 1-2 1-3
        // 2-1 2-2 2-3
        // 3-1 3-2 3-3
        if (tableCases[i-1][0] == 'O' && tableCases[i-1][1] == 'O' && tableCases[i-1][2] == 'O'){
            return 'O';
        }
        if (tableCases[i-1][0] == 'X' && tableCases[i-1][1] == 'X' && tableCases[i-1][2] == 'X'){
            return 'X';
        }

        // pour colonne
        // 1-1 2-1 3-1
        // 1-2 2-2 3-2
        // 1-3 2-3 3-3
        if (tableCases[0][i-1] == 'O' && tableCases[1][i-1] == 'O' && tableCases[2][i-1] == 'O'){
            return 'O';
        }
        if (tableCases[0][i-1] == 'X' && tableCases[1][i-1] == 'X' && tableCases[2][i-1] == 'X'){
            return 'X';
        }
    }
    // vertical
    // 1-1 2-2 3-3
    // 1-3 2-2 3-1
    if (tableCases[0][0] == 'O' && tableCases[1][1] == 'O' && tableCases[2][2] == 'O'){
        return 'O';
    }
    if (tableCases[0][0] == 'X' && tableCases[1][1] == 'X' && tableCases[2][2] == 'X'){
        return 'X';
    }
    if (tableCases[0][2] == 'O' && tableCases[1][1] == 'O' && tableCases[2][0] == 'O'){
        return 'O';
    }
    if (tableCases[0][2] == 'X' && tableCases[1][1] == 'X' && tableCases[2][0] == 'X'){
        return 'X';
    }
    return '#'

}


/*-------------- NOTRE FONCTION FIN ------------------ */

const multiplayerEvent = () => {
    for (let i=0;i <= cases.length - 1;i++){
        cases[i].addEventListener(('click'),() => {
            
            if (booleanCases[cases[i].classList.value[5]-1][cases[i].classList.value[7]-1]) {
                console.table("déjà occupé");
                return; // case déjà remplie
            }
    
            if (togglePlayer){
                cases[i].innerHTML = rondHtml 
                tableCases[cases[i].classList.value[5]-1][cases[i].classList.value[7]-1] = 'O'
            } else{
                cases[i].innerHTML = croisHtml 
                tableCases[cases[i].classList.value[5]-1][cases[i].classList.value[7]-1] = 'X'
            }
            booleanCases[cases[i].classList.value[5]-1][cases[i].classList.value[7]-1] = true
            togglePlayer = togglePlayer? false:true // toggle joueur
    
            console.table(tableCases);
            winner = checkWinner()
            if (winner != '#'){
                cases = null
                containerWinner.innerHTML = winner + " WIN" + ` 
                    <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon-reload" id="icon-reload" onclick="reload();">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>  
                `
                containerWinner.classList.add('show')
                // main.classList.add('disable')
            }
        })
    }
}

const simpleplayer = () => {
    
}

if (playWithMachine){

} else {
    multiplayerEvent();
}





















  

