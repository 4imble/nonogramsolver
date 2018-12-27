import ArrayHelper from "helpers/array";
import 'styles/site.scss'
import { Cell } from "domain/cell";
import GridValidator from "GridHelpers/GridValidator";
import { autoinject } from "aurelia-framework";
import Grid from "domain/grid";
import { setCommentRange } from "typescript";
import { CombinationTracker } from "GridHelpers/CombinationTracker";

@autoinject
export class App {
  secretAnswer: Array<Array<Cell>>;

  gridValidator: GridValidator;

  multiValidRows: Array<Array<Array<boolean>>> = [];


  constructor(private validator: GridValidator, private combinationTracker: CombinationTracker, public grid: Grid) {
    this.setupAnswer();
    this.setFixed();
  }

  async solve() {
    this.multiValidRows = [];
    for (let i = 0; i < this.grid.value.length; i++) {
      this.multiValidRows.push(this.validator.getValidAnswersForRow(i));
    }

    this.setGridForCombination();

    let limitCounter = 0;
    while(!this.validator.isValid() && limitCounter < 100)
    {
      limitCounter++;
      this.combinationTracker.increment(this.multiValidRows);
      this.setGridForCombination();
    }
  }

  setGridForCombination() {
    for (let i = 0; i < this.grid.value.length; i++) {
      this.setRowToValues(i);
    }
  }

  setRowToValues(rowNumber) {
    let row = this.grid.value[rowNumber];
    let combinationValue = this.combinationTracker.combinationCounts[rowNumber];
    let rowValues = this.multiValidRows[rowNumber][combinationValue];

    for (let cellValue = 0; cellValue < row.length; cellValue++) {
      let cell = row[cellValue];
      let value = rowValues[cellValue];
      if (cell.value != value)
        cell.toggle();
    }
  }

  async validate() {
    let score = this.validator.validateBlocks();
    alert(score);
  }

  setupAnswer() {
    this.secretAnswer = ArrayHelper.generate2dGrid(4);

    this.secretAnswer[0][1].toggle();
    this.secretAnswer[0][3].toggle();

    this.secretAnswer[1][0].toggle();
    this.secretAnswer[1][1].toggle();
    this.secretAnswer[1][2].toggle();
    this.secretAnswer[1][3].toggle();

    this.secretAnswer[2][0].toggle();
    this.secretAnswer[2][3].toggle();

    this.secretAnswer[3][2].toggle();
  }

  setFixed() {
    this.grid.value[2][0].isFixed = true;
  }
}


