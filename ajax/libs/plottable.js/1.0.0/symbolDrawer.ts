///<reference path="../reference.ts" />

module Plottable {
export module Drawers {
  export class Symbol extends Drawer {

    constructor(dataset: Dataset) {
      super(dataset);
      this._svgElementName = "path";
      this._className = "symbol";
    }

  }
}
}
