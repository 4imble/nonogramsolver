import { Cell } from "domain/cell";

export default class ArrayHelper {
  static generate2dGrid(size: number): Array<Array<Cell>> {
    let grid = new Array<Array<Cell>>(size);

    for (let y = 0; y < size; y++) {
      grid[y] = new Array<Cell>(size);
    }

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        grid[x][y] = new Cell();
      }
    };

    return grid;
  }

  static sum(array: Array<number>)
  {
    return array.reduce((a, b) => a + b);
  }
}
