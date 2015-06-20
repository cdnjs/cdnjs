///<reference path="../reference.ts" />

module Plottable {
export module Drawers {
  export class Arc extends Drawer {

    constructor(dataset: Dataset) {
      super(dataset);
      this._className = "arc";
      this._svgElementName = "path";
    }

  }
}
}
