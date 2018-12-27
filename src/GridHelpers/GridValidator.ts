import Grid from "domain/grid";
import { autoinject } from "aurelia-framework";

@autoinject
export default class GridValidator {
  constructor(private grid: Grid) {  }

  isValid() {
    return this.validateBlocks() == 0;
  }

  alertCount() {
    console.log(this.validateBlocks());
  }

  validateBlocks() {
    let rowsScore = this.validateRows();
    let columnsScore = this.validateColumns();
    return rowsScore + columnsScore;
  }

  validateRows() {
    let rowsScore = 0;
    for (let y = 0; y < this.grid.value.length; y++) {
      rowsScore += this.validateRow(y);
    }
    return rowsScore;
  }

  validateRow(rowNumber) {
    if(this.grid.value[rowNumber].some(x => x.isFixed && x.value != true))
      return 1;

    let rowScore = 0;
    var blocks = this.getBlocksForRow(rowNumber);
    var expectedBlocks = this.grid.rowCounts[rowNumber];

    for (let x = 0; x < this.grid.value.length; x++) {
      let left = blocks[x] || 0;
      let right = expectedBlocks[x] || 0;

      let diff = Math.abs(left - right);
      rowScore += diff;
    }

    return rowScore;
  }

  validateColumns() {
    let columnsScore = 0;

    for (let x = 0; x < this.grid.value.length; x++) {
      columnsScore += this.validateColumn(x);
    }

    return columnsScore;
  }

  validateColumn(columnNumber) {
    let columnScore = 0;
    var blocks = this.getBlocksForColumn(columnNumber);
    var expectedBlocks = this.grid.columnCounts[columnNumber];

    for (let x = 0; x < this.grid.value.length; x++) {
      let left = blocks[x] || 0;
      let right = expectedBlocks[x] || 0;

      let diff = Math.abs(left - right);
      columnScore += diff;
    }

    return columnScore;
  }

  getBlocksForRow(rowNumber: number) {
    let blocks: Array<number> = [];
    let blockCount: number = 0;
    for (let x = 0; x < this.grid.value.length; x++) {
      let cell = this.grid.value[rowNumber][x];

      if (cell.value) {
        blockCount++;
        if (x == this.grid.value.length - 1)
          blocks.push(blockCount);
      }
      else {
        if (blockCount)
          blocks.push(blockCount);
        blockCount = 0;
      }
    }
    return blocks;
  }

  getBlocksForColumn(columnNumber: number) {
    let blocks: Array<number> = [];
    let blockCount: number = 0;
    for (let x = 0; x < this.grid.value.length; x++) {
      let cell = this.grid.value[x][columnNumber];

      if (cell.value) {
        blockCount++;
        if (x == this.grid.value.length - 1)
          blocks.push(blockCount);
      }
      else {
        if (blockCount)
          blocks.push(blockCount);
        blockCount = 0;
      }
    }
    return blocks;
  }

  getValidAnswersForRow(rowNumber) {
    let validRows: Array<Array<boolean>> = [];
    let maxBinary = this.getBinaryWithLength(this.grid.value.length);

    for(let i = 0; i <= maxBinary; i++)
    {
      let valuesToTest = this.convertNumberToBooleanArray(i);
      for(let x = 0; x < valuesToTest.length; x++)
      {
        let cell = this.grid.value[rowNumber][x];
        let value = valuesToTest[x];
        if(cell.value != value)
          cell.toggle();
      }

      if(this.validateRow(rowNumber) == 0) {
        validRows.push(valuesToTest)
      }
    }

    return validRows;
  }

  getBinaryWithLength(length) {
    var binary = new Array(length + 1).join('1');
    return parseInt(binary, 2);
  }

  convertNumberToBooleanArray(number) {
    let binaryNumber = number.toString(2);
    let paddedBinaryNumber = new Array(this.grid.value.length - binaryNumber.length + 1).join('0') + binaryNumber;
    let binaryArray = paddedBinaryNumber.split("");
    let booleanArray = binaryArray.map(x => x === '1' ? true : false);

    return booleanArray;
  }
}
