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
const cases = document.getElementsByTagName('td') // tout notre cases
const rondHtml = `<div class="rond" ></div>`
const croisHtml = `<div class="crois">
                        <div></div>
                        <div></div>
                    </div>`


var joueur1_joueur2 = true;


for (let i=0;i <= cases.length - 1;i++){
    cases[i].addEventListener(('click'),() => {
        console.log("ok");
        
        cases[i].innerHTML = rondHtml + "<span>.</span>"
    })
}


















/*-------------- NOTRE FONCTION ------------------ */

const insertRond = (elementHtml) => {
    elementHtml.innerHtml = rondHtml + "<span>.</span>"
}