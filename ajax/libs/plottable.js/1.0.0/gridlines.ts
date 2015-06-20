///<reference path="../reference.ts" />

module Plottable {
export module Components {
  export class Gridlines extends Component {
    private _xScale: QuantitativeScale<any>;
    private _yScale: QuantitativeScale<any>;
    private _xLinesContainer: d3.Selection<void>;
    private _yLinesContainer: d3.Selection<void>;

    private _renderCallback: ScaleCallback<QuantitativeScale<any>>;

    /**
     * @constructor
     * @param {QuantitativeScale} xScale The scale to base the x gridlines on. Pass null if no gridlines are desired.
     * @param {QuantitativeScale} yScale The scale to base the y gridlines on. Pass null if no gridlines are desired.
     */
    constructor(xScale: QuantitativeScale<any>, yScale: QuantitativeScale<any>) {
      if (xScale != null && !(QuantitativeScale.prototype.isPrototypeOf(xScale))) {
        throw new Error("xScale needs to inherit from Scale.QuantitativeScale");
      }
      if (yScale != null && !(QuantitativeScale.prototype.isPrototypeOf(yScale))) {
        throw new Error("yScale needs to inherit from Scale.QuantitativeScale");
      }
      super();
      this.addClass("gridlines");
      this._xScale = xScale;
      this._yScale = yScale;
      this._renderCallback = (scale) => this.render();
      if (this._xScale) {
        this._xScale.onUpdate(this._renderCallback);
      }
      if (this._yScale) {
        this._yScale.onUpdate(this._renderCallback);
      }
    }

    public destroy() {
      super.destroy();
      if (this._xScale) {
        this._xScale.offUpdate(this._renderCallback);
      }
      if (this._yScale) {
        this._yScale.offUpdate(this._renderCallback);
      }
      return this;
    }

    protected _setup() {
      super._setup();
      this._xLinesContainer = this.content().append("g").classed("x-gridlines", true);
      this._yLinesContainer = this.content().append("g").classed("y-gridlines", true);
    }

    public renderImmediately() {
      super.renderImmediately();
      this._redrawXLines();
      this._redrawYLines();
      return this;
    }

    private _redrawXLines() {
      if (this._xScale) {
        var xTicks = this._xScale.ticks();
        var getScaledXValue = (tickVal: number) => this._xScale.scale(tickVal);
        var xLines = this._xLinesContainer.selectAll("line").data(xTicks);
        xLines.enter().append("line");
        xLines.attr("x1", getScaledXValue)
              .attr("y1", 0)
              .attr("x2", getScaledXValue)
              .attr("y2", this.height())
             .classed("zeroline", (t: number) => t === 0);
        xLines.exit().remove();
      }
    }

    private _redrawYLines() {
      if (this._yScale) {
        var yTicks = this._yScale.ticks();
        var getScaledYValue = (tickVal: number) => this._yScale.scale(tickVal);
        var yLines = this._yLinesContainer.selectAll("line").data(yTicks);
        yLines.enter().append("line");
        yLines.attr("x1", 0)
              .attr("y1", getScaledYValue)
              .attr("x2", this.width())
              .attr("y2", getScaledYValue)
              .classed("zeroline", (t: number) => t === 0);
        yLines.exit().remove();
      }
    }
  }
}
}
