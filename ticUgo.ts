import { realpath } from "fs";
import * as readlineSync from "readline-sync";

// 1

function createGrid(n: number): string[][] {
  let emptyGrid: string[][] = [];

  for (let i = 0; i < n; i++) {
    let line: string[] = [];
    for (let j = 0; j < n; j++) {
      line.push(" ");
    }
    emptyGrid.push(line);
  }

  return emptyGrid;
}

// console.log(createGrid(4));

// 2

function lengthSide(grid: string[][]): number {
  return grid.length || grid[0].length;
}

// console.log(lengthSide(createGrid(5)));

// 3

function isEmpty(grid: string[][], line: number, column: number): boolean {
  if ((line || column) < 0 || (line || column) > grid.length - 1) {
    return false;
  } else if (grid[line][column] === "") {
    return true;
  } else {
    return false;
  }
}

// console.log(isEmpty(createGrid(5), 3, 4));

// 4

function write(grid: string[][], line: number, column: number, symbol: string): string[][] {
  if ((line || column) < 0 || (line || column) > grid.length - 1) {
    console.log("Vous dépassez la taille du tableau, vous ne pouvez pas écrire");
  } else if (!(symbol === "X") && !(symbol === "O")) {
    console.log("Vous utilisez un mauvais symbole");
  } else if (!isEmpty(grid, line, column)) {
    console.log("Cette case n'est pas vide, vous ne pouvez pas écrire dessus");
  } else {
    grid[line][column] = symbol;
  }
  return grid;
}

// 5

function erase(grid: string[][], line: number, column: number): string[][] {
  if ((line || column) < 0 || (line || column) > grid.length - 1) {
    console.log("Vous dépassez la taille du tableau, vous ne pouvez pas effacer");
  } else {
    grid[line][column] = "";
  }
  return grid;
}

// 6

function exists(grid: string[][], line: number, column: number, symbol: string): boolean {
  if ((line || column) < 0 || (line || column) > grid.length - 1) {
    console.log("Vous dépassez la taille du tableau");
    return false;
  } else if (!(symbol === "X") && !(symbol === "O")) {
    console.log("Ce symbole ne peut pas exister");
    return false;
  } else if (grid[line][column] == "X" || grid[line][column] == "O") {
    return true;
  } else {
    return false;
  }
}

// 7

function display(grid: string[][]): void {
  for (let i = 0; i <= grid.length - 1; i++) {
    for (let j = 0; j <= grid[0].length - 1; j++) {
      if (j === grid.length - 1) {
        process.stdin.write(grid[i][j]);
      } else {
        process.stdin.write(grid[i][j] + "|");
      }
    }
    process.stdin.write("\n");
  }
}

// Main

function main(): void {
  let playerX = true;
  let playerO = false;

  // Demander au joueur la taille de la grille
  let gridSize = Number(readlineSync.question("Quelle taille de grille souhaitez-vous ? "));
  while (gridSize < 3) {
    gridSize = Number(readlineSync.question("Quelle taille de grille souhaitez-vous ? "));
  }

  // Création de la grille
  let newGrid = createGrid(gridSize);

  // Demander si la partie doit continuer
  let continueGame = readlineSync.question("On continue ? [O]ui ou [N]on : ");

  while (continueGame != "O" && continueGame != "N") {
    continueGame = readlineSync.question("On continue ? [O]ui ou [N]on : ");
  }

  // Indiquer à quel joueur c'est le tour
  if (playerX && !playerO) {
    playerX = false;
    playerO = true;
    console.log("C'est au tour de joueur X");
  } else {
    playerX = true;
    playerO = false;
    console.log("C'est au tour de joueur O");
  }

  let line;
  let column;
  // Demander la ligne où le joueur veut jouer
  do {
    do {
      line = Number(readlineSync.question("Ligne ? "));

      if (line > gridSize - 1 || line < 0) {
        console.log("Mauvaise valeur! Réessayez...");
      }
    } while (line > gridSize - 1 || line < 0);

    // Demander la colonne où le joueur veut jouer
    do {
      column = Number(readlineSync.question("Colonne ? "));

      if (column > gridSize - 1 || column < 0) {
        console.log("Mauvaise valeur! Réessayez...");
      }
    } while (column > gridSize - 1 || column < 0);

    if (!isEmpty(newGrid, line, column)) {
      console.log("Cette cas a déjà été jouée!");
    }
  } while (!isEmpty(newGrid, line, column));

  newGrid;
}

main();
