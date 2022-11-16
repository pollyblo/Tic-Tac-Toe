import * as readlineSync from "readline-sync";

function creeGrille(n: number): Array<Array<string>> {
    let grille = new Array<Array<string>>();
    for (let i = 0; i < n; i++) {
        let ligne = new Array<string>();
        for (let j = 0; j < n; j++) {
            ligne.push(" ");
        }
        grille.push(ligne);
    }
    /* for (let i = 0; i < grille.length; i++) {
    console.log(grille.join(" | "));
  } */

    return grille;
}

function talleCote(grille: Array<Array<string>>): number {
    return grille.length;
}

function estVide(grille: Array<Array<string>>, i: number, j: number): boolean {
    if (grille.length - 1 < i || grille.length - 1 < j) {
        return false;
    } else {
        if (grille[i][j] != " ") return false;
        else return true;
    }
}

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

function effacer(grille: Array<Array<string>>, i: number, j: number): Array<Array<string>> {
    if (grille.length - 1 < i || grille.length - 1 < j || i < 0 || j < 0) {
        return grille;
    } else {
        grille[i][j] = " ";
        return grille;
    }
}

function est(grille: Array<Array<string>>, i: number, j: number, symbole: string): boolean {
    if (grille.length - 1 < i || grille.length - 1 < j || i < 0 || j < 0) return false;
    else if (symbole != "O" && symbole != "X") return false;
    else if (grille[i][j] === symbole) return true;
    else return false;
}

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
/* affiche(creeGrille(8)); */
/* console.log(est(ecrire(creeGrille(4), 2, 1, "X"), 2, 1, "X")); */

function main(): void {
    let historique: Array<Array<any>>;
    let n = Number(readlineSync.question("Entrez la talle de Grille: "));
    while (n < 3) {
        n = Number(readlineSync.question("Entrez la talle de Grille: "));
    }
    let grille = creeGrille(n);
    affiche(grille);
    let i;
    let j;

    for (let k = 0; k < n * n; k++) {
        let continuer = readlineSync.question("On continue ? [O]ui ou [N]on: ");
        if (continuer === "O") {
            if (k % 2 === 0) {
                console.log("C'est le tour du joueur X");
            } else {
                console.log("C'est le tour du joueur O");
            }

            do {
                i = Number(
                    readlineSync.question(
                        "Entrez le numéro de la ligne (appuyez sur entrée pour annuler la saisie): "
                    )
                );
                if (i > n - 1 || i < 0 || isNaN(i)) {
                    console.log("Saisie un nombre compris entre 0 et ", n - 1);
                }
            } while (i > n - 1 || i < 0 || isNaN(i));
            do {
                j = Number(
                    readlineSync.question(
                        "Entrez le numéro de la colonne (appuyez sur entrée pour annuler la saisie): "
                    )
                );
                if (j > n - 1 || j < 0 || isNaN(j)) {
                    console.log("Saisie un nombre compris entre 0 et ", n - 1);
                }
            } while (j > n - 1 || j < 0 || isNaN(j));
        } else if (continuer === "N") {
            break;
        } else {
            console.log("Error repondez O ou N");
        }
    }
}

main();
