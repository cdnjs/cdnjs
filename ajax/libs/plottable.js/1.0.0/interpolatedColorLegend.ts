///<reference path="../reference.ts" />

module Plottable {
export module Components {
  export class InterpolatedColorLegend extends Component {
    private _measurer: SVGTypewriter.Measurers.Measurer;
    private _wrapper: SVGTypewriter.Wrappers.Wrapper;
    private _writer: SVGTypewriter.Writers.Writer;
    private _scale: Scales.InterpolatedColor;
    private _orientation: String ;
    private _padding = 5;
    private _numSwatches = 10;
    private _formatter: Formatter;

    private _swatchContainer: d3.Selection<void>;
    private _swatchBoundingBox: d3.Selection<void>;
    private _lowerLabel: d3.Selection<void>;
    private _upperLabel: d3.Selection<void>;
    private _redrawCallback: ScaleCallback<Scales.InterpolatedColor>;

    /**
     * The css class applied to the legend labels.
     */
    public static LEGEND_LABEL_CLASS = "legend-label";

    /**
     * Creates an InterpolatedColorLegend.
     *
     * The InterpolatedColorLegend consists of a sequence of swatches that show the
     * associated InterpolatedColor Scale sampled at various points.
     * Two labels show the maximum and minimum values of the InterpolatedColor Scale.
     *
     * @constructor
     * @param {Scales.InterpolatedColor} interpolatedColorScale
     */
    constructor(interpolatedColorScale: Scales.InterpolatedColor) {
      super();
      if (interpolatedColorScale == null ) {
        throw new Error("InterpolatedColorLegend requires a interpolatedColorScale");
      }
      this._scale = interpolatedColorScale;
      this._redrawCallback = (scale) => this.redraw();
      this._scale.onUpdate(this._redrawCallback);
      this._formatter = Formatters.general();
      this._orientation = "horizontal";

      this.addClass("legend");
      this.addClass("interpolated-color-legend");
    }

    public destroy() {
      super.destroy();
      this._scale.offUpdate(this._redrawCallback);
    }

    /**
     * Gets the Formatter for the labels.
     */
    public formatter(): Formatter;
    /**
     * Sets the Formatter for the labels.
     *
     * @param {Formatter} formatter
     * @returns {InterpolatedColorLegend} The calling InterpolatedColorLegend.
     */
    public formatter(formatter: Formatter): InterpolatedColorLegend;
    public formatter(formatter?: Formatter): any {
      if (formatter === undefined) {
        return this._formatter;
      }
      this._formatter = formatter;
      this.redraw();
      return this;
    }

    private static _ensureOrientation(orientation: string) {
      orientation = orientation.toLowerCase();
      if (orientation === "horizontal" || orientation === "left" || orientation === "right") {
        return orientation;
      } else {
        throw new Error("\"" + orientation + "\" is not a valid orientation for InterpolatedColorLegend");
      }
    }

    /**
     * Gets the orientation.
     */
    public orientation(): string;
    /**
     * Sets the orientation.
     *
     * @param {string} orientation One of "horizontal"/"left"/"right".
     * @returns {InterpolatedColorLegend} The calling InterpolatedColorLegend.
     */
    public orientation(orientation: string): InterpolatedColorLegend;
    public orientation(orientation?: string): any {
      if (orientation == null) {
        return this._orientation;
      } else {
        this._orientation = InterpolatedColorLegend._ensureOrientation(orientation);
        this.redraw();
        return this;
      }
    }

    public fixedWidth() {
      return true;
    }

    public fixedHeight() {
      return true;
    }

    private _generateTicks() {
      var domain = this._scale.domain();
      var slope = (domain[1] - domain[0]) / this._numSwatches;
      var ticks: number[] = [];
      for (var i = 0; i <= this._numSwatches; i++) {
        ticks.push(domain[0] + slope * i);
      }
      return ticks;
    }

    protected _setup() {
      super._setup();

      this._swatchContainer = this.content().append("g").classed("swatch-container", true);
      this._swatchBoundingBox = this.content().append("rect").classed("swatch-bounding-box", true);
      this._lowerLabel = this.content().append("g").classed(InterpolatedColorLegend.LEGEND_LABEL_CLASS, true);
      this._upperLabel = this.content().append("g").classed(InterpolatedColorLegend.LEGEND_LABEL_CLASS, true);

      this._measurer = new SVGTypewriter.Measurers.Measurer(this.content());
      this._wrapper = new SVGTypewriter.Wrappers.Wrapper();
      this._writer = new SVGTypewriter.Writers.Writer(this._measurer, this._wrapper);
    }

    public requestedSpace(offeredWidth: number, offeredHeight: number): SpaceRequest {
      var textHeight = this._measurer.measure().height;

      var ticks = this._generateTicks();
      var numSwatches = ticks.length;

      var domain = this._scale.domain();
      var labelWidths = domain.map((d: number) => this._measurer.measure(this._formatter(d)).width);

      var desiredHeight: number;
      var desiredWidth: number;
      if (this._isVertical()) {
        var longestWidth = Utils.Math.max(labelWidths, 0);
        desiredWidth = this._padding + textHeight + this._padding + longestWidth + this._padding;
        desiredHeight = this._padding + numSwatches * textHeight + this._padding;
      } else {
        desiredHeight = this._padding + textHeight + this._padding;
        desiredWidth = this._padding + labelWidths[0] + this._padding
                        + numSwatches * textHeight
                        + this._padding + labelWidths[1] + this._padding;
      }

      return {
        minWidth: desiredWidth,
        minHeight: desiredHeight
      };
    }

    private _isVertical() {
      return this._orientation !== "horizontal";
    }

    public renderImmediately() {
      super.renderImmediately();

      var domain = this._scale.domain();

      var text0 = this._formatter(domain[0]);
      var text0Width = this._measurer.measure(text0).width;
      var text1 = this._formatter(domain[1]);
      var text1Width = this._measurer.measure(text1).width;

      var ticks = this._generateTicks();
      var numSwatches = ticks.length;

      var padding = this._padding;

      var upperLabelShift: Point = { x: 0, y: 0 };
      var lowerLabelShift: Point = { x: 0, y: 0 };
      var lowerWriteOptions = {
                selection: this._lowerLabel,
                xAlign: "center",
                yAlign: "center",
                textRotation: 0
            };
      var upperWriteOptions = {
                selection: this._upperLabel,
                xAlign: "center",
                yAlign: "center",
                textRotation: 0
            };

      var swatchWidth: number;
      var swatchHeight: number;
      var swatchX: (d: any, i: number) => number;
      var swatchY: (d: any, i: number) => number;

      var boundingBoxAttr: { [key: string]: number } = {
        x: 0,
        y: padding,
        width: 0,
        height: 0
      };

      if (this._isVertical()) {
        var longestTextWidth = Math.max(text0Width, text1Width);
        swatchWidth = Math.max( (this.width() - 3 * padding - longestTextWidth), 0);
        swatchHeight = Math.max( ((this.height() - 2 * padding) / numSwatches), 0);
        swatchY = (d: any, i: number) => padding + (numSwatches - (i + 1)) * swatchHeight;

        upperWriteOptions.yAlign = "top";
        upperLabelShift.y = padding;
        lowerWriteOptions.yAlign = "bottom";
        lowerLabelShift.y = -padding;

        if (this._orientation === "left") {
          swatchX = (d: any, i: number) => padding + longestTextWidth + padding;
          upperWriteOptions.xAlign = "right";
          upperLabelShift.x = -(padding + swatchWidth + padding);
          lowerWriteOptions.xAlign = "right";
          lowerLabelShift.x = -(padding + swatchWidth + padding);
        } else { // right
          swatchX = (d: any, i: number) => padding;
          upperWriteOptions.xAlign = "left";
          upperLabelShift.x = padding + swatchWidth + padding;
          lowerWriteOptions.xAlign = "left";
          lowerLabelShift.x = padding + swatchWidth + padding;
        }
        boundingBoxAttr["width"] = swatchWidth;
        boundingBoxAttr["height"] = numSwatches * swatchHeight;
      } else { // horizontal
        swatchWidth = Math.max( ((this.width() - 4 * padding - text0Width - text1Width) / numSwatches), 0);
        swatchHeight = Math.max( (this.height() - 2 * padding), 0);
        swatchX = (d: any, i: number) => (padding + text0Width + padding) + i * swatchWidth;
        swatchY = (d: any, i: number) => padding;

        upperWriteOptions.xAlign = "right";
        upperLabelShift.x = -padding;
        lowerWriteOptions.xAlign = "left";
        lowerLabelShift.x = padding;

        boundingBoxAttr["width"] = numSwatches * swatchWidth;
        boundingBoxAttr["height"] = swatchHeight;
      }
      boundingBoxAttr["x"] = swatchX(null, 0); // position of the first swatch

      this._upperLabel.text(""); // clear the upper label
      this._writer.write(text1, this.width(), this.height(), upperWriteOptions);
      var upperTranslateString = "translate(" + upperLabelShift.x + ", " + upperLabelShift.y + ")";
      this._upperLabel.attr("transform", upperTranslateString);

      this._lowerLabel.text(""); // clear the lower label
      this._writer.write(text0, this.width(), this.height(), lowerWriteOptions);
      var lowerTranslateString = "translate(" + lowerLabelShift.x + ", " + lowerLabelShift.y + ")";
      this._lowerLabel.attr("transform", lowerTranslateString);

      this._swatchBoundingBox.attr(boundingBoxAttr);

      var swatches = this._swatchContainer.selectAll("rect.swatch").data(ticks);
      swatches.enter().append("rect").classed("swatch", true);
      swatches.exit().remove();
      swatches.attr({
        "fill": (d: any, i: number) => this._scale.scale(d),
        "width": swatchWidth,
        "height": swatchHeight,
        "x": swatchX,
        "y": swatchY
      });
      return this;
    }

  }
}
}
