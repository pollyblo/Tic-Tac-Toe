// 1

function createGrid(n: number): string[][] {
  let emptyGrid: string[][] = [];

  for (let i = 0; i < n; i++) {
    let line: string[] = [];
    for (let j = 0; j < n; j++) {
      line.push("");
    }
    emptyGrid.push(line);
  }

  return emptyGrid;
}

// console.log(createGrid(3));

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
        grid[line][column] = "";
    } else if (symbol = "X" || symbol = "O")) {
        grid[line][column] = symbol;
    } 
}