///<reference path="../reference.ts" />

module Plottable {

export module TimeInterval {
  export var second = "second";
  export var minute = "minute";
  export var hour = "hour";
  export var day = "day";
  export var week = "week";
  export var month = "month";
  export var year = "year";
};

export module Axes {
  /**
   * Defines a configuration for a Time Axis tier.
   * For details on how ticks are generated see: https://github.com/mbostock/d3/wiki/Time-Scales#ticks
   * interval - A time unit associated with this configuration (seconds, minutes, hours, etc).
   * step - number of intervals between each tick.
   * formatter - formatter used to format tick labels.
   */
  export type TimeAxisTierConfiguration = {
    interval: string;
    step: number;
    formatter: Formatter;
  };

  /**
   * An array of linked TimeAxisTierConfigurations.
   * Each configuration will be shown on a different tier.
   * Currently, up to two tiers are supported.
   */
  export type TimeAxisConfiguration = TimeAxisTierConfiguration[];

  export class Time extends Axis<Date> {
    /**
     * The CSS class applied to each Time Axis tier
     */
    public static TIME_AXIS_TIER_CLASS = "time-axis-tier";

    private static _DEFAULT_TIME_AXIS_CONFIGURATIONS: TimeAxisConfiguration[] = [
      [
        {interval: TimeInterval.second, step: 1, formatter: Formatters.time("%I:%M:%S %p")},
        {interval: TimeInterval.day, step: 1, formatter: Formatters.time("%B %e, %Y")}
      ],
      [
        {interval: TimeInterval.second, step: 5, formatter: Formatters.time("%I:%M:%S %p")},
        {interval: TimeInterval.day, step: 1, formatter: Formatters.time("%B %e, %Y")}
      ],
      [
        {interval: TimeInterval.second, step: 10, formatter: Formatters.time("%I:%M:%S %p")},
        {interval: TimeInterval.day, step: 1, formatter: Formatters.time("%B %e, %Y")}
      ],
      [
        {interval: TimeInterval.second, step: 15, formatter: Formatters.time("%I:%M:%S %p")},
        {interval: TimeInterval.day, step: 1, formatter: Formatters.time("%B %e, %Y")}
      ],
      [
        {interval: TimeInterval.second, step: 30, formatter: Formatters.time("%I:%M:%S %p")},
        {interval: TimeInterval.day, step: 1, formatter: Formatters.time("%B %e, %Y")}
      ],
      [
        {interval: TimeInterval.minute, step: 1, formatter: Formatters.time("%I:%M %p")},
        {interval: TimeInterval.day, step: 1, formatter: Formatters.time("%B %e, %Y")}
      ],
      [
        {interval: TimeInterval.minute, step: 5, formatter: Formatters.time("%I:%M %p")},
        {interval: TimeInterval.day, step: 1, formatter: Formatters.time("%B %e, %Y")}
      ],
      [
        {interval: TimeInterval.minute, step: 10, formatter: Formatters.time("%I:%M %p")},
        {interval: TimeInterval.day, step: 1, formatter: Formatters.time("%B %e, %Y")}
      ],
      [
        {interval: TimeInterval.minute, step: 15, formatter: Formatters.time("%I:%M %p")},
        {interval: TimeInterval.day, step: 1, formatter: Formatters.time("%B %e, %Y")}
      ],
      [
        {interval: TimeInterval.minute, step: 30, formatter: Formatters.time("%I:%M %p")},
        {interval: TimeInterval.day, step: 1, formatter: Formatters.time("%B %e, %Y")}
      ],
      [
        {interval: TimeInterval.hour, step: 1, formatter: Formatters.time("%I %p")},
        {interval: TimeInterval.day, step: 1, formatter: Formatters.time("%B %e, %Y")}
      ],
      [
        {interval: TimeInterval.hour, step: 3, formatter: Formatters.time("%I %p")},
        {interval: TimeInterval.day, step: 1, formatter: Formatters.time("%B %e, %Y")}
      ],
      [
        {interval: TimeInterval.hour, step: 6, formatter: Formatters.time("%I %p")},
        {interval: TimeInterval.day, step: 1, formatter: Formatters.time("%B %e, %Y")}
      ],
      [
        {interval: TimeInterval.hour, step: 12, formatter: Formatters.time("%I %p")},
        {interval: TimeInterval.day, step: 1, formatter: Formatters.time("%B %e, %Y")}
      ],
      [
        {interval: TimeInterval.day, step: 1, formatter: Formatters.time("%a %e")},
        {interval: TimeInterval.month, step: 1, formatter: Formatters.time("%B %Y")}
      ],
      [
        {interval: TimeInterval.day, step: 1, formatter: Formatters.time("%e")},
        {interval: TimeInterval.month, step: 1, formatter: Formatters.time("%B %Y")}
      ],
      [
        {interval: TimeInterval.month, step: 1, formatter: Formatters.time("%B")},
        {interval: TimeInterval.year, step: 1, formatter: Formatters.time("%Y")}
      ],
      [
        {interval: TimeInterval.month, step: 1, formatter: Formatters.time("%b")},
        {interval: TimeInterval.year, step: 1, formatter: Formatters.time("%Y")}
      ],
      [
        {interval: TimeInterval.month, step: 3, formatter: Formatters.time("%b")},
        {interval: TimeInterval.year, step: 1, formatter: Formatters.time("%Y")}
      ],
      [
        {interval: TimeInterval.month, step: 6, formatter: Formatters.time("%b")},
        {interval: TimeInterval.year, step: 1, formatter: Formatters.time("%Y")}
      ],
      [
        {interval: TimeInterval.year, step: 1, formatter: Formatters.time("%Y")}
      ],
      [
        {interval: TimeInterval.year, step: 1, formatter: Formatters.time("%y")}
      ],
      [
        {interval: TimeInterval.year, step: 5, formatter: Formatters.time("%Y")}
      ],
      [
        {interval: TimeInterval.year, step: 25, formatter: Formatters.time("%Y")}
      ],
      [
        {interval: TimeInterval.year, step: 50, formatter: Formatters.time("%Y")}
      ],
      [
        {interval: TimeInterval.year, step: 100, formatter: Formatters.time("%Y")}
      ],
      [
        {interval: TimeInterval.year, step: 200, formatter: Formatters.time("%Y")}
      ],
      [
        {interval: TimeInterval.year, step: 500, formatter: Formatters.time("%Y")}
      ],
      [
        {interval: TimeInterval.year, step: 1000, formatter: Formatters.time("%Y")}
      ]
    ];

    private _tierLabelContainers: d3.Selection<void>[];
    private _tierMarkContainers: d3.Selection<void>[];
    private _tierBaselines: d3.Selection<void>[];
    private _tierHeights: number[];
    private _possibleTimeAxisConfigurations: TimeAxisConfiguration[];
    private _numTiers: number;
    private _measurer: SVGTypewriter.Measurers.Measurer;

    private _mostPreciseConfigIndex: number;

    private _tierLabelPositions: string[] = [];

    private static _LONG_DATE = new Date(9999, 8, 29, 12, 59, 9999);

    /**
     * Constructs a Time Axis.
     *
     * A Time Axis is a visual representation of a Time Scale.
     *
     * @constructor
     * @param {Scales.Time} scale
     * @param {string} orientation One of "top"/"bottom".
     */
    constructor(scale: Scales.Time, orientation: string) {
      super(scale, orientation);
      this.addClass("time-axis");
      this.tickLabelPadding(5);
      this.axisConfigurations(Time._DEFAULT_TIME_AXIS_CONFIGURATIONS);
    }

    /**
     * Gets the label positions for each tier.
     */
    public tierLabelPositions(): string[];
    /**
     * Sets the label positions for each tier.
     *
     * @param {string[]} newPositions The positions for each tier. "bottom" and "center" are the only supported values.
     * @returns {Axes.Time} The calling Time Axis.
     */
    public tierLabelPositions(newPositions: string[]): Time;
    public tierLabelPositions(newPositions?: string[]): any {
      if (newPositions == null) {
        return this._tierLabelPositions;
      } else {
        if (!newPositions.every((pos: string) => pos.toLowerCase() === "between" || pos.toLowerCase() === "center")) {
          throw new Error("Unsupported position for tier labels");
        }
        this._tierLabelPositions = newPositions;
        this.redraw();
        return this;
      }
    }

    /**
     * Gets the possible TimeAxisConfigurations.
     */
    public axisConfigurations(): TimeAxisConfiguration[];
    /**
     * Sets the possible TimeAxisConfigurations.
     * The Time Axis will choose the most precise configuration that will display in the available space.
     *
     * @param {TimeAxisConfiguration[]} configurations
     * @returns {Axes.Time} The calling Time Axis.
     */
    public axisConfigurations(configurations: TimeAxisConfiguration[]): Time;
    public axisConfigurations(configurations?: any): any {
      if (configurations == null) {
        return this._possibleTimeAxisConfigurations;
      }
      this._possibleTimeAxisConfigurations = configurations;
      this._numTiers = Utils.Math.max(this._possibleTimeAxisConfigurations.map((config: TimeAxisConfiguration) => config.length), 0);

      if (this._isAnchored) {
        this._setupDomElements();
      }

      var oldLabelPositions: string[] = this.tierLabelPositions();
      var newLabelPositions: string[] = [];
      for (var i = 0; i < this._numTiers; i++) {
        newLabelPositions.push(oldLabelPositions[i] || "between");
      }
      this.tierLabelPositions(newLabelPositions);

      this.redraw();
      return this;
    }

    /**
     * Gets the index of the most precise TimeAxisConfiguration that will fit in the current width.
     */
    private _getMostPreciseConfigurationIndex(): number {
      var mostPreciseIndex = this._possibleTimeAxisConfigurations.length;
      this._possibleTimeAxisConfigurations.forEach((interval: TimeAxisConfiguration, index: number) => {
        if (index < mostPreciseIndex && interval.every((tier: TimeAxisTierConfiguration) =>
          this._checkTimeAxisTierConfigurationWidth(tier))) {
          mostPreciseIndex = index;
        }
      });

      if (mostPreciseIndex === this._possibleTimeAxisConfigurations.length) {
        Utils.Window.warn("zoomed out too far: could not find suitable interval to display labels");
        --mostPreciseIndex;
      }

      return mostPreciseIndex;
    }

    public orientation(): string;
    public orientation(orientation: string): Time;
    public orientation(orientation?: string): any {
      if (orientation && (orientation.toLowerCase() === "right" || orientation.toLowerCase() === "left")) {
        throw new Error(orientation + " is not a supported orientation for TimeAxis - only horizontal orientations are supported");
      }
      return super.orientation(orientation); // maintains getter-setter functionality
    }

    protected _computeHeight() {
      var textHeight = this._measurer.measure().height;

      this._tierHeights = [];
      for (var i = 0; i < this._numTiers; i++) {
        this._tierHeights.push(textHeight + this.tickLabelPadding() +
                              ((this._tierLabelPositions[i]) === "between" ? 0 : this._maxLabelTickLength()));
      }

      this._computedHeight = d3.sum(this._tierHeights);
      return this._computedHeight;
    }

    private _getIntervalLength(config: TimeAxisTierConfiguration) {
      var startDate = this._scale.domain()[0];
      var d3Interval = Scales.Time.timeIntervalToD3Time(config.interval);
      var endDate = d3Interval.offset(startDate, config.step);
      if (endDate > this._scale.domain()[1]) {
        // this offset is too large, so just return available width
        return this.width();
      }
      // measure how much space one date can get
      var stepLength = Math.abs(this._scale.scale(endDate) - this._scale.scale(startDate));
      return stepLength;
    }

    private _maxWidthForInterval(config: TimeAxisTierConfiguration): number {
      return this._measurer.measure(config.formatter(Time._LONG_DATE)).width;
    }

    /**
     * Check if tier configuration fits in the current width.
     */
    private _checkTimeAxisTierConfigurationWidth(config: TimeAxisTierConfiguration): boolean {
      var worstWidth = this._maxWidthForInterval(config) + 2 * this.tickLabelPadding();
      return Math.min(this._getIntervalLength(config), this.width()) >= worstWidth;
    }

    protected _sizeFromOffer(availableWidth: number, availableHeight: number) {
      // Makes sure that the size it requires is a multiple of tier sizes, such that
      // we have no leftover tiers

      var size = super._sizeFromOffer(availableWidth, availableHeight);
      size.height = this._tierHeights.reduce((prevValue, currValue, index, arr) => {
        return (prevValue + currValue > size.height) ? prevValue : (prevValue + currValue);
      });
      return size;
    }

    protected _setup() {
      super._setup();
      this._setupDomElements();
    }

    private _setupDomElements() {
      this.content().selectAll("." + Time.TIME_AXIS_TIER_CLASS).remove();

      this._tierLabelContainers = [];
      this._tierMarkContainers = [];
      this._tierBaselines = [];
      this._tickLabelContainer.remove();
      this._baseline.remove();

      for (var i = 0; i < this._numTiers; ++i) {
        var tierContainer = this.content().append("g").classed(Time.TIME_AXIS_TIER_CLASS, true);
        this._tierLabelContainers.push(tierContainer.append("g").classed(Axis.TICK_LABEL_CLASS + "-container", true));
        this._tierMarkContainers.push(tierContainer.append("g").classed(Axis.TICK_MARK_CLASS + "-container", true));
        this._tierBaselines.push(tierContainer.append("line").classed("baseline", true));
      }

      this._measurer = new SVGTypewriter.Measurers.Measurer(this._tierLabelContainers[0]);
    }

    private _getTickIntervalValues(config: TimeAxisTierConfiguration): any[] {
      return (<Scales.Time> this._scale).tickInterval(config.interval, config.step);
    }

    protected _getTickValues() {
      return this._possibleTimeAxisConfigurations[this._mostPreciseConfigIndex].reduce(
          (ticks: any[], config: TimeAxisTierConfiguration) => ticks.concat(this._getTickIntervalValues(config)),
          []
        );
    }

    private _cleanTiers() {
      for (var index = 0; index < this._tierLabelContainers.length; index++) {
        this._tierLabelContainers[index].selectAll("." + Axis.TICK_LABEL_CLASS).remove();
        this._tierMarkContainers[index].selectAll("." + Axis.TICK_MARK_CLASS).remove();
        this._tierBaselines[index].style("visibility", "hidden");
      }
    }

    private _getTickValuesForConfiguration(config: TimeAxisTierConfiguration) {
      var tickPos = (<Scales.Time> this._scale).tickInterval(config.interval, config.step);
      var domain = this._scale.domain();
      var tickPosValues = tickPos.map((d: Date) => d.valueOf()); // can't indexOf with objects
      if (tickPosValues.indexOf(domain[0].valueOf()) === -1) {
        tickPos.unshift(domain[0]);
      }
      if (tickPosValues.indexOf(domain[1].valueOf()) === -1) {
        tickPos.push(domain[1]);
      }
      return tickPos;
    }

    private _renderTierLabels(container: d3.Selection<void>, config: TimeAxisTierConfiguration, index: number) {
      var tickPos = this._getTickValuesForConfiguration(config);
      var labelPos: Date[] = [];
      if (this._tierLabelPositions[index] === "between" && config.step === 1) {
        tickPos.map((datum: any, index: any) => {
          if (index + 1 >= tickPos.length) {
            return;
          }
          labelPos.push(new Date((tickPos[index + 1].valueOf() - tickPos[index].valueOf()) / 2 + tickPos[index].valueOf()));
        });
      } else {
        labelPos = tickPos;
      }

      var tickLabels = container.selectAll("." + Axis.TICK_LABEL_CLASS).data(labelPos, (d) => String(d.valueOf()));
      var tickLabelsEnter = tickLabels.enter().append("g").classed(Axis.TICK_LABEL_CLASS, true);
      tickLabelsEnter.append("text");
      var xTranslate = (this._tierLabelPositions[index] === "center" || config.step === 1) ? 0 : this.tickLabelPadding();
      var yTranslate = this.orientation() === "bottom" ?
          d3.sum(this._tierHeights.slice(0, index + 1)) - this.tickLabelPadding() :
          this.height() - d3.sum(this._tierHeights.slice(0, index)) - this.tickLabelPadding();

      var textSelection = tickLabels.selectAll("text");
      if (textSelection.size() > 0) {
        Utils.DOM.translate(textSelection, xTranslate, yTranslate);
      }
      tickLabels.exit().remove();
      tickLabels.attr("transform", (d: any) => "translate(" + this._scale.scale(d) + ",0)");
      var anchor = (this._tierLabelPositions[index] === "center" || config.step === 1) ? "middle" : "start";
      tickLabels.selectAll("text").text(config.formatter).style("text-anchor", anchor);
    }

    private _renderTickMarks(tickValues: Date[], index: number) {
      var tickMarks = this._tierMarkContainers[index].selectAll("." + Axis.TICK_MARK_CLASS).data(tickValues);
      tickMarks.enter().append("line").classed(Axis.TICK_MARK_CLASS, true);
      var attr = this._generateTickMarkAttrHash();
      var offset = this._tierHeights.slice(0, index).reduce((translate: number, height: number) => translate + height, 0);
      if (this.orientation() === "bottom") {
        attr["y1"] = offset;
        attr["y2"] = offset + (this._tierLabelPositions[index] === "center" ? this.tickLength() : this._tierHeights[index]);
      } else {
        attr["y1"] = this.height() - offset;
        attr["y2"] = this.height() - (offset + (this._tierLabelPositions[index] === "center" ?
                                                  this.tickLength() : this._tierHeights[index]));
      }
      tickMarks.attr(attr);
      if (this.orientation() === "bottom") {
        attr["y1"] = offset;
        attr["y2"] = offset + this._tierHeights[index];
      } else {
        attr["y1"] = this.height() - offset;
        attr["y2"] = this.height() - (offset + this._tierHeights[index]);
      }
      d3.select(tickMarks[0][0]).attr(attr);

      // Add end-tick classes to first and last tick for CSS customization purposes
      d3.select(tickMarks[0][0]).classed(Axis.END_TICK_MARK_CLASS, true);
      d3.select(tickMarks[0][tickMarks.size() - 1]).classed(Axis.END_TICK_MARK_CLASS, true);

      tickMarks.exit().remove();
    }

    private _renderLabellessTickMarks(tickValues: Date[]) {
      var tickMarks = this._tickMarkContainer.selectAll("." + Axis.TICK_MARK_CLASS).data(tickValues);
      tickMarks.enter().append("line").classed(Axis.TICK_MARK_CLASS, true);
      var attr = this._generateTickMarkAttrHash();
      attr["y2"] = (this.orientation() === "bottom") ? this.tickLabelPadding() : this.height() - this.tickLabelPadding();
      tickMarks.attr(attr);
      tickMarks.exit().remove();
    }

    private _generateLabellessTicks() {
      if (this._mostPreciseConfigIndex < 1) {
        return [];
      }

      return this._getTickIntervalValues(this._possibleTimeAxisConfigurations[this._mostPreciseConfigIndex - 1][0]);
    }

    public renderImmediately() {
      this._mostPreciseConfigIndex = this._getMostPreciseConfigurationIndex();
      var tierConfigs = this._possibleTimeAxisConfigurations[this._mostPreciseConfigIndex];

      this._cleanTiers();

      tierConfigs.forEach((config: TimeAxisTierConfiguration, i: number) =>
        this._renderTierLabels(this._tierLabelContainers[i], config, i)
      );
      var tierTicks = tierConfigs.map((config: TimeAxisTierConfiguration, i: number) =>
        this._getTickValuesForConfiguration(config)
      );

      var baselineOffset = 0;
      for (var i = 0; i < Math.max(tierConfigs.length, 1); ++i) {
        var attr = this._generateBaselineAttrHash();
        attr["y1"] += (this.orientation() === "bottom") ? baselineOffset : -baselineOffset;
        attr["y2"] = attr["y1"];
        this._tierBaselines[i].attr(attr).style("visibility", "inherit");
        baselineOffset += this._tierHeights[i];
      }

      var labelLessTicks: Date[] = [];
      var domain = this._scale.domain();
      var totalLength = this._scale.scale(domain[1]) - this._scale.scale(domain[0]);
      if (this._getIntervalLength(tierConfigs[0]) * 1.5 >= totalLength) {
        labelLessTicks = this._generateLabellessTicks();
      }

      this._renderLabellessTickMarks(labelLessTicks);

      this._hideOverflowingTiers();
      for (i = 0; i < tierConfigs.length; ++i) {
        this._renderTickMarks(tierTicks[i], i);
        this._hideOverlappingAndCutOffLabels(i);
      }

      return this;
    }

    private _hideOverflowingTiers() {
      var availableHeight = this.height();
      var usedHeight = 0;

      this.content()
        .selectAll("." + Time.TIME_AXIS_TIER_CLASS)
        .attr("visibility", (d: any, i: number) => {
          usedHeight += this._tierHeights[i];
          return usedHeight <= availableHeight ? "inherit" : "hidden";
        });
    }

    private _hideOverlappingAndCutOffLabels(index: number) {
      var boundingBox = (<Element> this._boundingBox.node()).getBoundingClientRect();

      var isInsideBBox = (tickBox: ClientRect) => {
        return (
          Math.floor(boundingBox.left) <= Math.ceil(tickBox.left) &&
          Math.floor(boundingBox.top) <= Math.ceil(tickBox.top) &&
          Math.floor(tickBox.right) <= Math.ceil(boundingBox.left + this.width()) &&
          Math.floor(tickBox.bottom) <= Math.ceil(boundingBox.top + this.height())
        );
      };

      var visibleTickMarks = this._tierMarkContainers[index]
                                    .selectAll("." + Axis.TICK_MARK_CLASS)
                                    .filter(function(d: Element, i: number) {
                                      var visibility = d3.select(this).style("visibility");
                                      return visibility === "visible" || visibility === "inherit";
                                    });

      // We use the ClientRects because x1/x2 attributes are not comparable to ClientRects of labels
      var visibleTickMarkRects = visibleTickMarks[0].map((mark: Element) => mark.getBoundingClientRect() );

      var visibleTickLabels = this._tierLabelContainers[index]
                                    .selectAll("." + Axis.TICK_LABEL_CLASS)
                                    .filter(function(d: Element, i: number) {
                                      var visibility = d3.select(this).style("visibility");
                                      return visibility === "visible" || visibility === "inherit";
                                    });
      var lastLabelClientRect: ClientRect;

      visibleTickLabels.each(function (d: Element, i: number) {
        var clientRect = this.getBoundingClientRect();
        var tickLabel = d3.select(this);
        var leadingTickMark = visibleTickMarkRects[i];
        var trailingTickMark = visibleTickMarkRects[i + 1];
        if (!isInsideBBox(clientRect) || (lastLabelClientRect != null && Utils.DOM.clientRectsOverlap(clientRect, lastLabelClientRect))
            || (leadingTickMark.right > clientRect.left || trailingTickMark.left < clientRect.right)) {
          tickLabel.style("visibility", "hidden");
        } else {
          lastLabelClientRect = clientRect;
          tickLabel.style("visibility", "inherit");
        }
      });
    }
  }
}
}
