import { checkWinner } from "./helper.js";

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
                // main.classList.add('disable')
            }
        })
    }
}
