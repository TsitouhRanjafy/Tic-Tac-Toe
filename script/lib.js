import { checkWinner } from "./helper.js";
import { myId, playerName, roomName } from "./main.js";

export const multiplayerEvent = (tableCases,booleanCases,togglePlayer,casesElement,croisElement,rondElement,winner,containerWinner) => {
    for (let i=0;i <= casesElement.length - 1;i++){
        casesElement[i].addEventListener(('click'),() => {
            
            if (booleanCases[casesElement[i].classList.value[5]-1][casesElement[i].classList.value[7]-1]) {
                console.table("déjà occupé");
                return; // case déjà remplie
            }
    
            if (togglePlayer){
                casesElement[i].innerHTML = rondElement 
                tableCases[casesElement[i].classList.value[5]-1][casesElement[i].classList.value[7]-1] = 'O'
            } else{
                casesElement[i].innerHTML = croisElement,rondElement 
                tableCases[casesElement[i].classList.value[5]-1][casesElement[i].classList.value[7]-1] = 'X'
            }
            booleanCases[casesElement[i].classList.value[5]-1][casesElement[i].classList.value[7]-1] = true
            togglePlayer = togglePlayer? false:true // toggle joueur
    
            console.table(tableCases);
            winner = checkWinner(tableCases)
            if (winner != '#'){
                casesElement = null
                const newWinner = document.createElement("p");
                newWinner.textContent = winner + " WIN";
                containerWinner.appendChild(newWinner);
                containerWinner.classList.add('show')
            }
        })
    }
}

export const multiplayerEventOnline = (serverSocket,tableCases,booleanCases,togglePlayer,casesElement,croisElement,rondElement,winner,containerWinner) => {
    for (let i=0;i <= casesElement.length - 1;i++){
        casesElement[i].addEventListener(('click'),(e) => {
            serverSocket.emit('cases_event',{
                line: casesElement[i].classList.value[5]-1,
                column: casesElement[i].classList.value[7]-1,
                playerId: myId,
                caseIndex: i,
                roomName: roomName
            });
        });
    }
    serverSocket.on('cases_event',(event) => {
        if (event.playerId == 'O') {
            casesElement[event.caseIndex].innerHTML = rondElement 
            tableCases[event.line][event.column] = event.playerId;
        } else {
            casesElement[event.caseIndex].innerHTML = croisElement,rondElement 
            tableCases[event.line][event.column] = event.playerId;
        }
        booleanCases[event.line][event.column] = true;

        winner = checkWinner(tableCases);
        if (winner != '#') {
            console.log("quelqu'un a gagné");
            casesElement = null;
            const newWinner = document.createElement("p");
            (winner == myId)? newWinner.textContent = "YOU WIN" : newWinner.textContent = "YOU LOSE";
            containerWinner.appendChild(newWinner);
            containerWinner.classList.add('show');
            // serverSocket.emit('winner_event',{ winner: winner });
        }
    })
    // serverSocket.on('winner_event',(event) => {
    // })
}


