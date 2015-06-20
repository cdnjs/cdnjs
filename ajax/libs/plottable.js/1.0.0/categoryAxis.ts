///<reference path="../reference.ts" />

module Plottable {
export module Axes {
  export class Category extends Axis<string> {
    private _tickLabelAngle = 0;
    private _measurer: SVGTypewriter.Measurers.CacheCharacterMeasurer;
    private _wrapper: SVGTypewriter.Wrappers.SingleLineWrapper;
    private _writer: SVGTypewriter.Writers.Writer;

    /**
     * Constructs a Category Axis.
     *
     * A Category Axis is a visual representation of a Category Scale.
     *
     * @constructor
     * @param {Scales.Category} scale
     * @param {string} [orientation="bottom"] One of "top"/"bottom"/"left"/"right".
     */
    constructor(scale: Scales.Category, orientation: string) {
      super(scale, orientation);
      this.addClass("category-axis");
    }

    protected _setup() {
      super._setup();
      this._measurer = new SVGTypewriter.Measurers.CacheCharacterMeasurer(this._tickLabelContainer);
      this._wrapper = new SVGTypewriter.Wrappers.SingleLineWrapper();
      this._writer = new SVGTypewriter.Writers.Writer(this._measurer, this._wrapper);
    }

    protected _rescale() {
      return this.redraw();
    }

    public requestedSpace(offeredWidth: number, offeredHeight: number): SpaceRequest {
      var widthRequiredByTicks = this._isHorizontal() ? 0 : this._maxLabelTickLength() + this.tickLabelPadding() + this.margin();
      var heightRequiredByTicks = this._isHorizontal() ? this._maxLabelTickLength() + this.tickLabelPadding() + this.margin() : 0;

      if (this._scale.domain().length === 0) {
        return {
          minWidth: 0,
          minHeight: 0
        };
      }

      var categoryScale = <Scales.Category> this._scale;
      var measureResult = this._measureTicks(offeredWidth, offeredHeight, categoryScale, categoryScale.domain());

      return {
        minWidth: measureResult.usedWidth + widthRequiredByTicks,
        minHeight: measureResult.usedHeight + heightRequiredByTicks
      };
    }

    protected _getTickValues() {
      return this._scale.domain();
    }

    /**
     * Gets the tick label angle in degrees.
     */
    public tickLabelAngle(): number;
    /**
     * Sets the tick label angle in degrees.
     * Right now only -90/0/90 are supported. 0 is horizontal.
     *
     * @param {number} angle
     * @returns {Category} The calling Category Axis.
     */
    public tickLabelAngle(angle: number): Category;
    public tickLabelAngle(angle?: number): any {
      if (angle == null) {
        return this._tickLabelAngle;
      }
      if (angle !== 0 && angle !== 90 && angle !== -90) {
        throw new Error("Angle " + angle + " not supported; only 0, 90, and -90 are valid values");
      }
      this._tickLabelAngle = angle;
      this.redraw();
      return this;
    }

    /**
     * Measures the size of the ticks while also writing them to the DOM.
     * @param {d3.Selection} ticks The tick elements to be written to.
     */
    private _drawTicks(axisWidth: number, axisHeight: number, scale: Scales.Category, ticks: d3.Selection<string>) {
      var self = this;
      var xAlign: {[s: string]: string};
      var yAlign: {[s: string]: string};
      switch (this.tickLabelAngle()) {
        case 0:
          xAlign = {left: "right", right: "left", top: "center", bottom: "center"};
          yAlign = {left: "center", right: "center", top: "bottom", bottom: "top"};
          break;
        case 90:
          xAlign = {left: "center", right: "center", top: "right", bottom: "left"};
          yAlign = {left: "top", right: "bottom", top: "center", bottom: "center"};
          break;
        case -90:
          xAlign = {left: "center", right: "center", top: "left", bottom: "right"};
          yAlign = {left: "bottom", right: "top", top: "center", bottom: "center"};
          break;
      }
      ticks.each(function (d: string) {
        var bandWidth = scale.stepWidth();
        var width = self._isHorizontal() ? bandWidth : axisWidth - self._maxLabelTickLength() - self.tickLabelPadding();
        var height = self._isHorizontal() ? axisHeight - self._maxLabelTickLength() - self.tickLabelPadding() : bandWidth;
        var writeOptions = {
          selection: d3.select(this),
          xAlign: xAlign[self.orientation()],
          yAlign: yAlign[self.orientation()],
          textRotation: self.tickLabelAngle()
        };
        self._writer.write(self.formatter()(d), width, height, writeOptions);
      });
    }

    /**
     * Measures the size of the ticks without making any (permanent) DOM
     * changes.
     *
     * @param {string[]} ticks The strings that will be printed on the ticks.
     */
    private _measureTicks(axisWidth: number, axisHeight: number, scale: Scales.Category, ticks: string[]) {
      var axisSpace = this._isHorizontal() ? axisWidth : axisHeight;
      var totalOuterPaddingRatio = 2 * scale.outerPadding();
      var totalInnerPaddingRatio = (ticks.length - 1) * scale.innerPadding();
      var expectedRangeBand = axisSpace / (totalOuterPaddingRatio + totalInnerPaddingRatio + ticks.length);
      var stepWidth = expectedRangeBand * (1 + scale.innerPadding());

      var wrappingResults = ticks.map((s: string) => {

        // HACKHACK: https://github.com/palantir/svg-typewriter/issues/25
        var width = axisWidth - this._maxLabelTickLength() - this.tickLabelPadding(); // default for left/right
        if (this._isHorizontal()) { // case for top/bottom
          width = stepWidth; // defaults to the band width
          if (this._tickLabelAngle !== 0) { // rotated label
            width = axisHeight - this._maxLabelTickLength() - this.tickLabelPadding(); // use the axis height
          }
          // HACKHACK: Wrapper fails under negative circumstances
          width = Math.max(width, 0);
        }

        // HACKHACK: https://github.com/palantir/svg-typewriter/issues/25
        var height = stepWidth; // default for left/right
        if (this._isHorizontal()) { // case for top/bottom
          height = axisHeight - this._maxLabelTickLength() - this.tickLabelPadding();
          if (this._tickLabelAngle !== 0) { // rotated label
            height = axisWidth - this._maxLabelTickLength() - this.tickLabelPadding();
          }
          // HACKHACK: Wrapper fails under negative circumstances
          height = Math.max(height, 0);
        }

        return this._wrapper.wrap(this.formatter()(s), this._measurer, width, height);
      });

      // HACKHACK: https://github.com/palantir/svg-typewriter/issues/25
      var widthFn = (this._isHorizontal() && this._tickLabelAngle === 0) ? d3.sum : Utils.Math.max;
      var heightFn = (this._isHorizontal() && this._tickLabelAngle === 0) ? Utils.Math.max : d3.sum;

      var textFits = wrappingResults.every((t: SVGTypewriter.Wrappers.WrappingResult) =>
                    !SVGTypewriter.Utils.StringMethods.isNotEmptyString(t.truncatedText) && t.noLines === 1);
      var usedWidth = widthFn<SVGTypewriter.Wrappers.WrappingResult, number>(wrappingResults,
                      (t: SVGTypewriter.Wrappers.WrappingResult) => this._measurer.measure(t.wrappedText).width, 0);
      var usedHeight = heightFn<SVGTypewriter.Wrappers.WrappingResult, number>(wrappingResults,
                      (t: SVGTypewriter.Wrappers.WrappingResult) => this._measurer.measure(t.wrappedText).height, 0);

      // If the tick labels are rotated, reverse usedWidth and usedHeight
      // HACKHACK: https://github.com/palantir/svg-typewriter/issues/25
      if (this._tickLabelAngle !== 0) {
        var tempHeight = usedHeight;
        usedHeight = usedWidth;
        usedWidth = tempHeight;
      }

      return {
        textFits: textFits,
        usedWidth: usedWidth,
        usedHeight: usedHeight
      };
    }

    public renderImmediately() {
      super.renderImmediately();
      var catScale = <Scales.Category> this._scale;
      var tickLabels = this._tickLabelContainer.selectAll("." + Axis.TICK_LABEL_CLASS).data(this._scale.domain(), (d) => d);

      var getTickLabelTransform = (d: string, i: number) => {
        var innerPaddingWidth = catScale.stepWidth() - catScale.rangeBand();
        var scaledValue = catScale.scale(d) - catScale.rangeBand() / 2 - innerPaddingWidth / 2;
        var x = this._isHorizontal() ? scaledValue : 0;
        var y = this._isHorizontal() ? 0 : scaledValue;
        return "translate(" + x + "," + y + ")";
      };
      tickLabels.enter().append("g").classed(Axis.TICK_LABEL_CLASS, true);
      tickLabels.exit().remove();
      tickLabels.attr("transform", getTickLabelTransform);
      // erase all text first, then rewrite
      tickLabels.text("");
      this._drawTicks(this.width(), this.height(), catScale, tickLabels);

      var xTranslate = this.orientation() === "right" ? this._maxLabelTickLength() + this.tickLabelPadding() : 0;
      var yTranslate = this.orientation() === "bottom" ? this._maxLabelTickLength() + this.tickLabelPadding() : 0;
      Utils.DOM.translate(this._tickLabelContainer, xTranslate, yTranslate);
      return this;
    }

    public computeLayout(origin?: Point, availableWidth?: number, availableHeight?: number) {
      // When anyone calls redraw(), computeLayout() will be called
      // on everyone, including this. Since CSS or something might have
      // affected the size of the characters, clear the cache.
      this._measurer.reset();
      return super.computeLayout(origin, availableWidth, availableHeight);
    }
  }
}
}
