let CroisOURond : boolean = false;
if (Math.random()  <= 0.5){
    CroisOURond = true;
}

let CroisEnHtml = `
            <span></span>
            <span></span>
        `
let RondEnHtml = `
            <div></div>
        `
let croisResulat : Array<string> = [];
let rondResulat : Array<string> = [];
let nombreCaseRemplie : number  = 0;
let joeurCrois = document.getElementById("joeur-crois");
let joeurRond = document.getElementById("joeur-rond");
let affichageRestCaseCrois = document.getElementById("restCaseRond") ;
let affichageRestCaseRond = document.getElementById("restCaseCrois");

if (CroisOURond){
    var resteCasePourCrois : number = 4;
    var resteCasePourRond : number = 5;
    joeurCrois?.classList.add("toure");
    joeurRond?.classList.remove("toure");
}else{
    var resteCasePourCrois : number = 5;
    var resteCasePourRond : number = 4;
    joeurCrois?.classList.remove("toure");
    joeurRond?.classList.add("toure");
}
if (affichageRestCaseCrois){affichageRestCaseCrois.textContent = `${resteCasePourCrois}`;}
if (affichageRestCaseRond){affichageRestCaseRond.textContent = `${resteCasePourRond}`;}
let caseRemplie : Array<Array<boolean>> = [
    [false,false,false],
    [false,false,false],
    [false,false,false]
]; 

let setValue = (id : string,element : InnerHTML)  =>{
    if (caseRemplie[parseInt(id[5])-1][parseInt(id[7])-1]){
        throw new Error("Déjà Remplie");
    }
    if (CroisOURond){
        element.innerHTML = CroisEnHtml;
        CroisOURond = false;
        croisResulat.push(id); 
        nombreCaseRemplie++;
        if (affichageRestCaseRond){affichageRestCaseRond.textContent = `${--resteCasePourRond}`;}
        joeurCrois?.classList.remove("toure");
        joeurRond?.classList.add("toure");
    }else{
        element.innerHTML = RondEnHtml;
        CroisOURond = true;
        rondResulat.push(id);
        nombreCaseRemplie++;
        if (affichageRestCaseCrois){affichageRestCaseCrois.textContent = `${--resteCasePourCrois}`;}
        joeurCrois?.classList.add("toure");
        joeurRond?.classList.remove("toure");
    }
    caseRemplie[parseInt(id[5])-1][parseInt(id[7])-1] = true;
    if (nombreCaseRemplie >= 5 && nombreCaseRemplie <= 9){
        for (let i=0;i<toutGagnant.length;i++){
            if (verifierTabDansUneTab(toutGagnant[i],croisResulat)){
                nombreCaseRemplie = 10;
                mettrePhrase("afficheResultat","Le X a gagné","joeur-crois",false);
                break;
            }
            if (verifierTabDansUneTab(toutGagnant[i],rondResulat)){
                nombreCaseRemplie = 10;
                mettrePhrase("afficheResultat","Le O a gagné","joeur-rond",false);
                break;
            }
            if (nombreCaseRemplie == 9){
                mettrePhrase("afficheResultat","Le match est null","",true);
            }
        }
    }
}

const gagnant1 : Array<string[8]> = ["case-1-1","case-1-2","case-1-3"];
const gagnant2 : Array<string[8]> = ["case-2-1","case-2-2","case-2-3"];
const gagnant3 : Array<string[8]> = ["case-3-1","case-3-2","case-3-3"];
const gagnant4 : Array<string[8]> = ["case-1-1","case-2-1","case-3-1"];
const gagnant5 : Array<string[8]> = ["case-1-2","case-2-2","case-3-2"];
const gagnant6 : Array<string[8]> = ["case-1-3","case-2-3","case-3-3"];
const gagnant7 : Array<string[8]> = ["case-1-1","case-2-2","case-3-3"];
const gagnant8 : Array<string[8]> = ["case-1-3","case-2-2","case-3-1"];
const toutGagnant : Array<Array<string>> = [gagnant1,gagnant2,gagnant3,gagnant4,gagnant5,gagnant6,gagnant7,gagnant8];


// _______ FONCTION ______ //


const verifierTabDansUneTab = (tab1 : Array<string>,tab2 : Array<string>) : boolean =>{
    let cpt : number = 0;
    tab1.forEach((element1) => {
        tab2.forEach((element2) =>{
            if (element1 == element2){
                cpt++;
            }
        })
    });
    if (cpt == 3){
        return true;
    }
    return false;
}

let mettrePhrase = (id : string,phrase : string,idGagnant : string,matchNull : boolean = true) =>{
    let parent = document.getElementById(id);
    if (matchNull){
        joeurRond?.classList.add("toure");
        joeurCrois?.classList.add("toure");    
        if (parent){
            parent.textContent = phrase;
            parent.classList.remove("hidden") ;   
        }
        throw new Error("match null")    
    }
    if (parent){
        parent.textContent = phrase;
        parent.classList.remove("hidden")
    }
    joeurRond?.classList.add("perdant");
    joeurCrois?.classList.add("perdant");
    if (idGagnant){
        let gagnant = document.getElementById(idGagnant);
        if (gagnant){
            gagnant.classList.add("gagnant");
        }
    }
    
}
