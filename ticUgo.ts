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
