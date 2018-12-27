import ArrayHelper from "helpers/array";
import { Cell } from "./cell";

export default class Grid {
  columnCounts: Array<Array<number>> = [[2], [2], [1, 1], [3]];
  rowCounts: Array<Array<number>> = [[1, 1], [4], [1, 1], [1]];

  value: Array<Array<Cell>>;

  constructor() {
    this.setup();
  }

  setup() {
    this.value = ArrayHelper.generate2dGrid(4);
  }
}
