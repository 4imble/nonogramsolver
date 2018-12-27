import Grid from "domain/grid";
import { autoinject, computedFrom } from "aurelia-framework";

@autoinject
export class CombinationTracker {
  rowCount: number = 0;
  combinationCounts: Array<number> = [];

  constructor(private grid: Grid) {
    this.initalise();
  }

  initalise() {
    this.combinationCounts = [];
    for (let i = 0; i < this.grid.value.length; i++) {
      this.combinationCounts.push(0);
    }
  }

  increment(multiValidRows: Array<Array<Array<boolean>>>) {
    const count = this.combinationCounts[this.rowCount];
    if(count == multiValidRows.length && count == multiValidRows[this.rowCount].length)
      throw "max limit reached";

    if (count < multiValidRows[this.rowCount].length - 1)
    {
      this.combinationCounts[this.rowCount]++;
      this.rowCount = 0;
    }
    else {
      this.combinationCounts[this.rowCount] = 0;
      this.rowCount++;
      this.increment(multiValidRows)
    }
  }

  @computedFrom("combinationCounts.length")
  get iterations() {
    return this.combinationCounts.length;
  }
}
