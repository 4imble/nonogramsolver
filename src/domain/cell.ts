export class Cell {
  value: boolean = false;
  isFixed: boolean = false;

  get style() {
    return this.value ? "black" : "#e4e4e4";
  }

  toggle() {
    this.value = !this.value;
  }
}
