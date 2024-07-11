var CroisOURond = false;
if (Math.random() <= 0.5) {
    CroisOURond = true;
}
var CroisEnHtml = "\n            <span></span>\n            <span></span>\n        ";
var RondEnHtml = "\n            <div></div>\n        ";
var croisResulat = [];
var rondResulat = [];
var nombreCaseRemplie = 0;
var joeurCrois = document.getElementById("joeur-crois");
var joeurRond = document.getElementById("joeur-rond");
var affichageRestCaseCrois = document.getElementById("restCaseRond");
var affichageRestCaseRond = document.getElementById("restCaseCrois");
if (CroisOURond) {
    var resteCasePourCrois = 4;
    var resteCasePourRond = 5;
    joeurCrois === null || joeurCrois === void 0 ? void 0 : joeurCrois.classList.add("toure");
    joeurRond === null || joeurRond === void 0 ? void 0 : joeurRond.classList.remove("toure");
}
else {
    var resteCasePourCrois = 5;
    var resteCasePourRond = 4;
    joeurCrois === null || joeurCrois === void 0 ? void 0 : joeurCrois.classList.remove("toure");
    joeurRond === null || joeurRond === void 0 ? void 0 : joeurRond.classList.add("toure");
}
if (affichageRestCaseCrois) {
    affichageRestCaseCrois.textContent = "".concat(resteCasePourCrois);
}
if (affichageRestCaseRond) {
    affichageRestCaseRond.textContent = "".concat(resteCasePourRond);
}
var caseRemplie = [
    [false, false, false],
    [false, false, false],
    [false, false, false]
];
var setValue = function (id, element) {
    if (caseRemplie[parseInt(id[5]) - 1][parseInt(id[7]) - 1]) {
        throw new Error("Déjà Remplie");
    }
    if (CroisOURond) {
        element.innerHTML = CroisEnHtml;
        CroisOURond = false;
        croisResulat.push(id);
        nombreCaseRemplie++;
        if (affichageRestCaseRond) {
            affichageRestCaseRond.textContent = "".concat(--resteCasePourRond);
        }
        joeurCrois === null || joeurCrois === void 0 ? void 0 : joeurCrois.classList.remove("toure");
        joeurRond === null || joeurRond === void 0 ? void 0 : joeurRond.classList.add("toure");
    }
    else {
        element.innerHTML = RondEnHtml;
        CroisOURond = true;
        rondResulat.push(id);
        nombreCaseRemplie++;
        if (affichageRestCaseCrois) {
            affichageRestCaseCrois.textContent = "".concat(--resteCasePourCrois);
        }
        joeurCrois === null || joeurCrois === void 0 ? void 0 : joeurCrois.classList.add("toure");
        joeurRond === null || joeurRond === void 0 ? void 0 : joeurRond.classList.remove("toure");
    }
    caseRemplie[parseInt(id[5]) - 1][parseInt(id[7]) - 1] = true;
    if (nombreCaseRemplie >= 5 && nombreCaseRemplie <= 9) {
        for (var i = 0; i < toutGagnant.length; i++) {
            if (verifierTabDansUneTab(toutGagnant[i], croisResulat)) {
                nombreCaseRemplie = 10;
                mettrePhrase("afficheResultat", "Le X a gagné", "joeur-crois", false);
                break;
            }
            if (verifierTabDansUneTab(toutGagnant[i], rondResulat)) {
                nombreCaseRemplie = 10;
                mettrePhrase("afficheResultat", "Le O a gagné", "joeur-rond", false);
                break;
            }
            if (nombreCaseRemplie == 9) {
                mettrePhrase("afficheResultat", "Le match est null", "", true);
            }
        }
    }
};
var gagnant1 = ["case-1-1", "case-1-2", "case-1-3"];
var gagnant2 = ["case-2-1", "case-2-2", "case-2-3"];
var gagnant3 = ["case-3-1", "case-3-2", "case-3-3"];
var gagnant4 = ["case-1-1", "case-2-1", "case-3-1"];
var gagnant5 = ["case-1-2", "case-2-2", "case-3-2"];
var gagnant6 = ["case-1-3", "case-2-3", "case-3-3"];
var gagnant7 = ["case-1-1", "case-2-2", "case-3-3"];
var gagnant8 = ["case-1-3", "case-2-2", "case-3-1"];
var toutGagnant = [gagnant1, gagnant2, gagnant3, gagnant4, gagnant5, gagnant6, gagnant7, gagnant8];
// _______ FONCTION ______ //
var verifierTabDansUneTab = function (tab1, tab2) {
    var cpt = 0;
    tab1.forEach(function (element1) {
        tab2.forEach(function (element2) {
            if (element1 == element2) {
                cpt++;
            }
        });
    });
    if (cpt == 3) {
        return true;
    }
    return false;
};
var mettrePhrase = function (id, phrase, idGagnant, matchNull) {
    if (matchNull === void 0) { matchNull = true; }
    var parent = document.getElementById(id);
    if (matchNull) {
        joeurRond === null || joeurRond === void 0 ? void 0 : joeurRond.classList.add("toure");
        joeurCrois === null || joeurCrois === void 0 ? void 0 : joeurCrois.classList.add("toure");
        if (parent) {
            parent.textContent = phrase;
            parent.classList.remove("hidden");
        }
        throw new Error("match null");
    }
    if (parent) {
        parent.textContent = phrase;
        parent.classList.remove("hidden");
    }
    joeurRond === null || joeurRond === void 0 ? void 0 : joeurRond.classList.add("perdant");
    joeurCrois === null || joeurCrois === void 0 ? void 0 : joeurCrois.classList.add("perdant");
    if (idGagnant) {
        var gagnant = document.getElementById(idGagnant);
        if (gagnant) {
            gagnant.classList.add("gagnant");
        }
    }
};
