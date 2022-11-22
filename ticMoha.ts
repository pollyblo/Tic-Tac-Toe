import * as readlineSync from "readline-sync";

/* ----- Fonction pour crée des Grilles vide ----- */
function creeGrille(n: number): Array<Array<string>> {
    let grille = new Array<Array<string>>();
    for (let i = 0; i < n; i++) {
        let ligne = new Array<string>();
        for (let j = 0; j < n; j++) {
            ligne.push(" ");
        }
        grille.push(ligne);
    }
    return grille;
}

/* ----- Fonction pour savoir la talle des cotes de Grille ----- */
function talleCote(grille: Array<Array<string>>): number {
    return grille.length;
}

/* ----- Fonction pour savoir si la Cellule donnés est vide dans la Grille ----- */
function estVide(grille: Array<Array<string>>, i: number, j: number): boolean {
    if (grille.length - 1 < i || grille.length - 1 < j) {
        return false;
    } else {
        if (grille[i][j] != " ") return false;
        else return true;
    }
}

/* ----- Fonction pour ecrire un Symbole dans la Cellule donnée dans la Grille ----- */
function ecrire(
    grille: Array<Array<string>>,
    i: number,
    j: number,
    symbole: string
): Array<Array<string>> {
    if (estVide(grille, i, j) === false) {
        console.log("Pas Bon ");
    } else if (symbole != "O" && symbole != "X") {
        console.log("Le Symbole n'est pas bon ");
    } else {
        grille[i][j] = symbole;
        return grille;
    }
    return grille;
}

/* ----- Fonction pour effacer une Cellule donnée par des cordonnées dans la Grille ----- */
function effacer(grille: Array<Array<string>>, i: number, j: number): Array<Array<string>> {
    if (grille.length - 1 < i || grille.length - 1 < j || i < 0 || j < 0) {
        return grille;
    } else {
        grille[i][j] = " ";
        return grille;
    }
}

/* ----- Fonction  pour savoir si une Cellule a un Symbole donnée dans la Grille ----- */
function est(grille: Array<Array<string>>, i: number, j: number, symbole: string): boolean {
    if (grille.length - 1 < i || grille.length - 1 < j || i < 0 || j < 0) return false;
    else if (symbole != "O" && symbole != "X") return false;
    else if (grille[i][j] === symbole) return true;
    else return false;
}

/* ----- Fonction pour afficher la Grille avec les Symbole ----- */
function affiche(grille: Array<Array<string>>): any {
    for (let i = 0; i < grille.length; i++) {
        for (let j = 0; j < grille[i].length; j++) {
            if (j === grille[i].length - 1) {
                process.stdin.write(grille[i][j]);
            } else {
                process.stdin.write(grille[i][j] + "|");
            }
        }
        process.stdin.write("\n");
    }
}


/* -------------------------------------------------- */
function main(): void {
    let historique: Array<Array<any>> = [];

    /* ---- On demande la talle de la Grille et si l'utilizateur entre un valeur inferieur à 3 en lui demande jusqu'a qu'il entre un valeur valide ---- */
    let n = Number(readlineSync.question("Entrez la talle de Grille: "));
    while (n < 3) {
        n = Number(readlineSync.question("Entrez la talle de Grille: "));
    }

    /* ---- On Crée une Grille vide de n(talle) de côte ---- */
    let grille = creeGrille(n);
    affiche(grille);
    let i;
    let j;

    for (let k = 0; k < n * n; k++) {
        let continuer = readlineSync.question("On continue ? [O]ui ou [N]on: ").toUpperCase();
        if (continuer === "O") {
            if(historique.length != 0){
                
                let annuler;
                do {
                    console.log(historique[historique.length -1][0] + " , " + historique[historique.length -1][1] + " , " + historique[historique.length -1 ][2]);

                    annuler = readlineSync.question("Voulez-vous annulez ce coup ? [O]ui ou [N]on: ").toUpperCase();
                    if(annuler === "O") {
                        effacer(grille, historique[historique.length -1][0], historique[historique.length -1][1]);
                        historique.pop()
                        k--
                    }else if (annuler != "O" && annuler != "N"){
                        console.log("Entrez O ou N !!")
                    }else {
                        break
                    }
                } while (annuler != "O" && annuler != "N" || historique.length != 0)
            }

            do {
                if (k % 2 === 0) {
                    console.log("C'est le tour du joueur X");
                } else {
                    console.log("C'est le tour du joueur O");
                }

                do {
                    i = readlineSync.question("Entrez le numéro de la ligne (appuyez sur entrée pour annuler la saisie): ");
                    
                    if(i.length === 0){
                        i = n
                    }
                    i = Number(i)

                    if (i > n - 1 || i < 0 || isNaN(i)) {
                        console.log("Saisie un nombre compris entre 0 et ", n - 1);
                    }
                } while (i > n - 1 || i < 0  || isNaN(i) );

                do {
                    j = readlineSync.question("Entrez le numéro de la colonne (appuyez sur entrée pour annuler la saisie): ");

                    if(j.length === 0){
                        j = n
                    }
                    j = Number(j)
                    if (j > n - 1 || j < 0 || isNaN(j)) {
                        console.log("Saisie un nombre compris entre 0 et ", n - 1);
                    }
                } while (j > n - 1 || j < 0 || isNaN(j));

                if(estVide(grille, i, j) === false){
                    console.log("N'est pas vide")
                }
            }while(estVide(grille, i, j) === false)

            if (k % 2 === 0) {
                let ligne = new Array<any>()
                ligne.push(i,j,"X")
                historique.push(ligne);
                affiche(ecrire(grille, i, j, "X"));
                
            } else {
                let ligne = new Array<any>()
                ligne.push(i,j,"O")
                historique.push(ligne);
                affiche(ecrire(grille, i, j, "O"));
            }

            /* Calacula si hay ganador */
            let gagneXdg = 0;
            let gagneOdg = 0;
            let gagneXdd = 0;
            let gagneOdd = 0;
            for (let r = 0; r < grille.length; r++) {
                let gagneXh = 0;
                let gagneOh = 0;
                let gagneXv = 0;
                let gagneOv = 0;
                /* Horizontal */
                for (let s = 0; s < grille.length; s++) {
                    if (est(grille, r, s, "X")) gagneXh++;
                    else gagneXh = 0;
                }
                for (let t = 0; t < grille.length; t++) {
                    if (est(grille, r, t, "O")) gagneOh++;
                    else gagneOh = 0;
                }
                /* Vertical */
                for (let s = 0; s < grille.length; s++) {
                    if (est(grille, s, r, "X")) gagneXv++;
                    else gagneXv = 0;
                }
                for (let t = 0; t < grille.length; t++) {
                    if (est(grille, t, r, "O")) gagneOv++;
                    else gagneOv = 0;
                }
                /* Diagonal Izquierda-Derecha */
                if (est(grille, r, r, "X")) gagneXdg++;
                else gagneXdg = 0;
                if (est(grille, r, r, "O")) gagneOdg++;
                else gagneOdg = 0;
                /* Diagonal Derecha-Izquierda */
                if(est(grille, r, grille.length-(1+r), "X")) gagneXdd++;
                else gagneXdd = 0;
                if(est(grille, r, grille.length-(1+r), "O")) gagneOdd++;
                else gagneOdd = 0;

                if (gagneXh === n || gagneXv === n || gagneXdg === n || gagneXdd === n){
                    console.log("Le joueur X a gagné");
                    k = n * n;
                }else if (gagneOh === n || gagneOv === n || gagneOdg === n || gagneOdd === n) {
                    console.log("Le joueur O a gagné");
                    k = n * n;
                }
            }
            
        } else if (continuer === "N") {
            break;
        } else {
            console.log("Error repondez O ou N");
            k--;
        }
    }
}

main();
