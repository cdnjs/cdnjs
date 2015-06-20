///<reference path="../reference.ts" />

module Plottable {
export module Plots {
  export class Rectangle<X, Y> extends XYPlot<X, Y> {
    private static _X2_KEY = "x2";
    private static _Y2_KEY = "y2";

    /**
     * A Rectangle Plot displays rectangles based on the data.
     * The left and right edges of each rectangle can be set with x() and x2().
     *   If only x() is set the Rectangle Plot will attempt to compute the correct left and right edge positions.
     * The top and bottom edges of each rectangle can be set with y() and y2().
     *   If only y() is set the Rectangle Plot will attempt to compute the correct top and bottom edge positions.
     *
     * @constructor
     * @param {Scale.Scale} xScale
     * @param {Scale.Scale} yScale
     */
    constructor() {
      super();

      this.animator("rectangles", new Animators.Null());
      this.addClass("rectangle-plot");
    }

    protected _createDrawer(dataset: Dataset) {
      return new Drawers.Rectangle(dataset);
    }

    protected _generateAttrToProjector() {
      var attrToProjector = super._generateAttrToProjector();

      // Copy each of the different projectors.
      var xAttr = Plot._scaledAccessor(this.x());
      var x2Attr = attrToProjector[Rectangle._X2_KEY];
      var yAttr = Plot._scaledAccessor(this.y());
      var y2Attr = attrToProjector[Rectangle._Y2_KEY];

      var xScale = this.x().scale;
      var yScale = this.y().scale;

      if (x2Attr != null) {
        attrToProjector["width"] = (d, i, dataset) => Math.abs(x2Attr(d, i, dataset) - xAttr(d, i, dataset));
        attrToProjector["x"] = (d, i, dataset) => Math.min(x2Attr(d, i, dataset), xAttr(d, i, dataset));
      } else {
        attrToProjector["width"] = (d, i, dataset) => this._rectangleWidth(xScale);
        attrToProjector["x"] = (d, i, dataset) => xAttr(d, i, dataset) - 0.5 * attrToProjector["width"](d, i, dataset);
      }

      if (y2Attr != null) {
        attrToProjector["height"] = (d, i, dataset) => Math.abs(y2Attr(d, i, dataset) - yAttr(d, i, dataset));
        attrToProjector["y"] = (d, i, dataset) => {
	        return Math.max(y2Attr(d, i, dataset), yAttr(d, i, dataset)) - attrToProjector["height"](d, i, dataset);
        };
      } else {
        attrToProjector["height"] = (d, i, dataset) => this._rectangleWidth(yScale);
        attrToProjector["y"] = (d, i, dataset) => yAttr(d, i, dataset) - 0.5 * attrToProjector["height"](d, i, dataset);
      }

      // Clean up the attributes projected onto the SVG elements
      delete attrToProjector[Rectangle._X2_KEY];
      delete attrToProjector[Rectangle._Y2_KEY];

      return attrToProjector;
    }

    protected _generateDrawSteps(): Drawers.DrawStep[] {
      return [{attrToProjector: this._generateAttrToProjector(), animator: this._getAnimator("rectangles")}];
    }

    /**
     * Gets the AccessorScaleBinding for X.
     */
    public x(): AccessorScaleBinding<X, number>;
    /**
     * Sets X to a constant number or the result of an Accessor<number>.
     *
     * @param {number|Accessor<number>} x
     * @returns {Plots.Rectangle} The calling Rectangle Plot.
     */
    public x(x: number | Accessor<number>): Plots.Rectangle<X, Y>;
    /**
     * Sets X to a scaled constant value or scaled result of an Accessor.
     * The provided Scale will account for the values when autoDomain()-ing.
     *
     * @param {X|Accessor<X>} x
     * @param {Scale<X, number>} xScale
     * @returns {Plots.Rectangle} The calling Rectangle Plot.
     */
    public x(x: X | Accessor<X>, xScale: Scale<X, number>): Plots.Rectangle<X, Y>;
    public x(x?: number | Accessor<number> | X | Accessor<X>, xScale?: Scale<X, number>): any {
      if (x == null) {
        return super.x();
      }

      if (xScale == null) {
        super.x(<number | Accessor<number>>x);
      } else {
        super.x(<X | Accessor<X>>x, xScale);
      }

      if (xScale != null) {
        var x2Binding = this.x2();
        var x2 = x2Binding && x2Binding.accessor;
        if (x2 != null) {
          this._bindProperty(Rectangle._X2_KEY, x2, xScale);
        }
      }

      // The x and y scales should render in bands with no padding for category scales
      if (xScale instanceof Scales.Category) {
        (<Scales.Category> <any> xScale).innerPadding(0).outerPadding(0);
      }

      return this;
    }

    /**
     * Gets the AccessorScaleBinding for X2.
     */
    public x2(): AccessorScaleBinding<X, number>;
    /**
     * Sets X2 to a constant number or the result of an Accessor.
     * If a Scale has been set for X, it will also be used to scale X2.
     *
     * @param {number|Accessor<number>|X|Accessor<X>} x2
     * @returns {Plots.Rectangle} The calling Rectangle Plot.
     */
    public x2(x2: number | Accessor<number> | X | Accessor<X>): Plots.Rectangle<X, Y>;
    public x2(x2?: number | Accessor<number> | X | Accessor<X>): any {
      if (x2 == null) {
        return this._propertyBindings.get(Rectangle._X2_KEY);
      }

      var xBinding = this.x();
      var xScale = xBinding && xBinding.scale;
      this._bindProperty(Rectangle._X2_KEY, x2, xScale);

      this.render();
      return this;
    }

    /**
     * Gets the AccessorScaleBinding for Y.
     */
    public y(): AccessorScaleBinding<Y, number>;
    /**
     * Sets Y to a constant number or the result of an Accessor<number>.
     *
     * @param {number|Accessor<number>} y
     * @returns {Plots.Rectangle} The calling Rectangle Plot.
     */
    public y(y: number | Accessor<number>): Plots.Rectangle<X, Y>;
    /**
     * Sets Y to a scaled constant value or scaled result of an Accessor.
     * The provided Scale will account for the values when autoDomain()-ing.
     *
     * @param {Y|Accessor<Y>} y
     * @param {Scale<Y, number>} yScale
     * @returns {Plots.Rectangle} The calling Rectangle Plot.
     */
    public y(y: Y | Accessor<Y>, yScale: Scale<Y, number>): Plots.Rectangle<X, Y>;
    public y(y?: number | Accessor<number> | Y | Accessor<Y>, yScale?: Scale<Y, number>): any {
      if (y == null) {
        return super.y();
      }

      if (yScale == null) {
        super.y(<number | Accessor<number>>y);
      } else {
        super.y(<Y | Accessor<Y>>y, yScale);
      }

      if (yScale != null) {
        var y2Binding = this.y2();
        var y2 = y2Binding && y2Binding.accessor;
        if (y2 != null) {
          this._bindProperty(Rectangle._Y2_KEY, y2, yScale);
        }
      }

      // The x and y scales should render in bands with no padding for category scales
      if (yScale instanceof Scales.Category) {
        (<Scales.Category> <any> yScale).innerPadding(0).outerPadding(0);
      }

      return this;
    }

    /**
     * Gets the AccessorScaleBinding for Y2.
     */
    public y2(): AccessorScaleBinding<Y, number>;
    /**
     * Sets Y2 to a constant number or the result of an Accessor.
     * If a Scale has been set for Y, it will also be used to scale Y2.
     *
     * @param {number|Accessor<number>|Y|Accessor<Y>} y2
     * @returns {Plots.Rectangle} The calling Rectangle Plot.
     */
    public y2(y2: number | Accessor<number> | Y | Accessor<Y>): Plots.Rectangle<X, Y>;
    public y2(y2?: number | Accessor<number> | Y | Accessor<Y>): any {
      if (y2 == null) {
        return this._propertyBindings.get(Rectangle._Y2_KEY);
      }

      var yBinding = this.y();
      var yScale = yBinding && yBinding.scale;
      this._bindProperty(Rectangle._Y2_KEY, y2, yScale);

      this.render();
      return this;
    }

    protected _propertyProjectors(): AttributeToProjector {
      var attrToProjector = super._propertyProjectors();
      if (this.x2() != null) {
        attrToProjector["x2"] = Plot._scaledAccessor(this.x2());
      }
      if (this.y2() != null) {
        attrToProjector["y2"] = Plot._scaledAccessor(this.y2());
      }
      return attrToProjector;
    }

    protected _pixelPoint(datum: any, index: number, dataset: Dataset) {
      var attrToProjector = this._generateAttrToProjector();
      var rectX = attrToProjector["x"](datum, index, dataset);
      var rectY = attrToProjector["y"](datum, index, dataset);
      var rectWidth = attrToProjector["width"](datum, index, dataset);
      var rectHeight = attrToProjector["height"](datum, index, dataset);
      var x = rectX + rectWidth / 2;
      var y = rectY + rectHeight / 2;
      return { x: x, y: y };
    }

    private _rectangleWidth(scale: Scale<any, number>) {
      if (scale instanceof Plottable.Scales.Category) {
        return (<Plottable.Scales.Category> scale).rangeBand();
      } else {
        var accessor = scale === this.x().scale ? this.x().accessor : this.y().accessor;
        var accessorData = d3.set(Utils.Array.flatten(this.datasets().map((dataset) => {
          return dataset.data().map((d, i) => accessor(d, i, dataset).valueOf());
        }))).values().map((value) => +value);
        // Get the absolute difference between min and max
        var min = Plottable.Utils.Math.min(accessorData, 0);
        var max = Plottable.Utils.Math.max(accessorData, 0);
        var scaledMin = scale.scale(min);
        var scaledMax = scale.scale(max);
        return (scaledMax - scaledMin) / Math.abs(max - min);
      }
    }

    protected _getDataToDraw() {
      var dataToDraw = new Utils.Map<Dataset, any[]>();
      var attrToProjector = this._generateAttrToProjector();
      this.datasets().forEach((dataset) => {
        var data = dataset.data().filter((d, i) => Utils.Math.isValidNumber(attrToProjector["x"](d, i, dataset)) &&
                                                   Utils.Math.isValidNumber(attrToProjector["y"](d, i, dataset)) &&
                                                   Utils.Math.isValidNumber(attrToProjector["width"](d, i, dataset)) &&
                                                   Utils.Math.isValidNumber(attrToProjector["height"](d, i, dataset)));
        dataToDraw.set(dataset, data);
      });
      return dataToDraw;
    }

  }
}
}
