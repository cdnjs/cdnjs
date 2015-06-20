///<reference path="../reference.ts" />

module Plottable {
export module Plots {
  export class ClusteredBar<X, Y> extends Bar<X, Y> {

    private _clusterOffsets: Utils.Map<Dataset, number>;

    /**
     * A ClusteredBar Plot groups bars across Datasets based on the primary value of the bars.
     *   On a vertical ClusteredBar Plot, the bars with the same X value are grouped.
     *   On a horizontal ClusteredBar Plot, the bars with the same Y value are grouped.
     *
     * @constructor
     * @param {string} [orientation="vertical"] One of "vertical"/"horizontal".
     */
    constructor(orientation = Bar.ORIENTATION_VERTICAL) {
      super(orientation);
      this._clusterOffsets = new Utils.Map<Dataset, number>();
    }

    protected _generateAttrToProjector() {
      var attrToProjector = super._generateAttrToProjector();
      // the width is constant, so set the inner scale range to that
      var innerScale = this._makeInnerScale();
      var innerWidthF = (d: any, i: number) => innerScale.rangeBand();
      attrToProjector["width"] = this._isVertical ? innerWidthF : attrToProjector["width"];
      attrToProjector["height"] = !this._isVertical ? innerWidthF : attrToProjector["height"];

      var xAttr = attrToProjector["x"];
      var yAttr = attrToProjector["y"];
      attrToProjector["x"] = this._isVertical ?
                               (d: any, i: number, ds: Dataset) => xAttr(d, i, ds) + this._clusterOffsets.get(ds) :
                               (d: any, i: number, ds: Dataset) => xAttr(d, i, ds);
      attrToProjector["y"] = this._isVertical ?
                               (d: any, i: number, ds: Dataset) => yAttr(d, i, ds) :
                               (d: any, i: number, ds: Dataset) => yAttr(d, i, ds) + this._clusterOffsets.get(ds);

      return attrToProjector;
    }

    private _updateClusterPosition() {
      var innerScale = this._makeInnerScale();
      this.datasets().forEach((d, i) => this._clusterOffsets.set(d, innerScale.scale(String(i)) - innerScale.rangeBand() / 2));
    }

    private _makeInnerScale() {
      var innerScale = new Scales.Category();
      innerScale.domain(this.datasets().map((d, i) => String(i)));
      var widthProjector = Plot._scaledAccessor(this.attr("width"));
      innerScale.range([0, widthProjector(null, 0, null)]);
      return innerScale;
    }

    protected _getDataToDraw() {
      this._updateClusterPosition();
      return super._getDataToDraw();
    }
  }
}
}
