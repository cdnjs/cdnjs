///<reference path="../reference.ts" />

module Plottable {
export module Components {
  export class Legend extends Component {
    /**
     * The css class applied to each legend row
     */
    public static LEGEND_ROW_CLASS = "legend-row";
    /**
     * The css class applied to each legend entry
     */
    public static LEGEND_ENTRY_CLASS = "legend-entry";
    /**
     * The css class applied to each legend symbol
     */
    public static LEGEND_SYMBOL_CLASS = "legend-symbol";

    private _padding = 5;
    private _colorScale: Scales.Color;
    private _maxEntriesPerRow: number;
    private _comparator: (a: string, b: string) => number;
    private _measurer: SVGTypewriter.Measurers.Measurer;
    private _wrapper: SVGTypewriter.Wrappers.Wrapper;
    private _writer: SVGTypewriter.Writers.Writer;
    private _symbolFactoryAccessor: (datum: any, index: number) => SymbolFactory;
    private _redrawCallback: ScaleCallback<Scales.Color>;

    /**
     * The Legend consists of a series of entries, each with a color and label taken from the Color Scale.
     *
     * @constructor
     * @param {Scale.Color} scale
     */
    constructor(colorScale: Scales.Color) {
      super();
      this.addClass("legend");
      this.maxEntriesPerRow(1);

      if (colorScale == null ) {
        throw new Error("Legend requires a colorScale");
      }

      this._colorScale = colorScale;
      this._redrawCallback = (scale) => this.redraw();
      this._colorScale.onUpdate(this._redrawCallback);

      this.xAlignment("right").yAlignment("top");
      this.comparator((a: string, b: string) => this._colorScale.domain().indexOf(a) - this._colorScale.domain().indexOf(b));
      this._symbolFactoryAccessor = () => SymbolFactories.circle();
    }

    protected _setup() {
      super._setup();
      var fakeLegendRow = this.content().append("g").classed(Legend.LEGEND_ROW_CLASS, true);
      var fakeLegendEntry = fakeLegendRow.append("g").classed(Legend.LEGEND_ENTRY_CLASS, true);
      fakeLegendEntry.append("text");
      this._measurer = new SVGTypewriter.Measurers.Measurer(fakeLegendRow);
      this._wrapper = new SVGTypewriter.Wrappers.Wrapper().maxLines(1);
      this._writer = new SVGTypewriter.Writers.Writer(this._measurer, this._wrapper).addTitleElement(true);
    }

    /**
     * Gets the maximum number of entries per row.
     *
     * @returns {number}
     */
    public maxEntriesPerRow(): number;
    /**
     * Sets the maximum number of entries perrow.
     *
     * @param {number} maxEntriesPerRow
     * @returns {Legend} The calling Legend.
     */
    public maxEntriesPerRow(maxEntriesPerRow: number): Legend;
    public maxEntriesPerRow(maxEntriesPerRow?: number): any {
      if (maxEntriesPerRow == null) {
        return this._maxEntriesPerRow;
      } else {
        this._maxEntriesPerRow = maxEntriesPerRow;
        this.redraw();
        return this;
      }
    }

    /**
     * Gets the current comparator for the Legend's entries.
     *
     * @returns {(a: string, b: string) => number}
     */
    public comparator(): (a: string, b: string) => number;
    /**
     * Sets a new comparator for the Legend's entries.
     * The comparator is used to set the display order of the entries.
     *
     * @param {(a: string, b: string) => number} comparator
     * @returns {Legend} The calling Legend.
     */
    public comparator(comparator: (a: string, b: string) => number): Legend;
    public comparator(comparator?: (a: string, b: string) => number): any {
      if (comparator == null) {
        return this._comparator;
      } else {
        this._comparator = comparator;
        this.redraw();
        return this;
      }
    }

    /**
     * Gets the Color Scale.
     *
     * @returns {Scales.Color}
     */
    public colorScale(): Scales.Color;
    /**
     * Sets the Color Scale.
     *
     * @param {Scales.Color} scale
     * @returns {Legend} The calling Legend.
     */
    public colorScale(colorScale: Scales.Color): Legend;
    public colorScale(colorScale?: Scales.Color): any {
      if (colorScale != null) {
        this._colorScale.offUpdate(this._redrawCallback);
        this._colorScale = colorScale;
        this._colorScale.onUpdate(this._redrawCallback);
        this.redraw();
        return this;
      } else {
        return this._colorScale;
      }
    }

    public destroy() {
      super.destroy();
      this._colorScale.offUpdate(this._redrawCallback);
    }

    private _calculateLayoutInfo(availableWidth: number, availableHeight: number) {
      var textHeight = this._measurer.measure().height;

      var availableWidthForEntries = Math.max(0, (availableWidth - this._padding));

      var entryNames = this._colorScale.domain().slice();
      entryNames.sort(this.comparator());

      var entryLengths: d3.Map<number> = d3.map<number>();
      var untruncatedEntryLengths: d3.Map<number> = d3.map<number>();
      entryNames.forEach((entryName) => {
        var untruncatedEntryLength = textHeight + this._measurer.measure(entryName).width + this._padding;
        var entryLength = Math.min(untruncatedEntryLength, availableWidthForEntries);
        entryLengths.set(entryName, entryLength);
        untruncatedEntryLengths.set(entryName, untruncatedEntryLength);
      });

      var rows = this._packRows(availableWidthForEntries, entryNames, entryLengths);

      var rowsAvailable = Math.floor((availableHeight - 2 * this._padding) / textHeight);
      if (rowsAvailable !== rowsAvailable) { // rowsAvailable can be NaN if this.textHeight = 0
        rowsAvailable = 0;
      }

      return {
        textHeight: textHeight,
        entryLengths: entryLengths,
        untruncatedEntryLengths: untruncatedEntryLengths,
        rows: rows,
        numRowsToDraw: Math.max(Math.min(rowsAvailable, rows.length), 0)
      };
    }

    public requestedSpace(offeredWidth: number, offeredHeight: number): SpaceRequest {
      var estimatedLayout = this._calculateLayoutInfo(offeredWidth, offeredHeight);

      var untruncatedRowLengths = estimatedLayout.rows.map((row) => {
        return d3.sum(row, (entry) => estimatedLayout.untruncatedEntryLengths.get(entry));
      });
      var longestUntruncatedRowLength = Utils.Math.max(untruncatedRowLengths, 0);

      return {
        minWidth: this._padding + longestUntruncatedRowLength,
        minHeight: estimatedLayout.rows.length * estimatedLayout.textHeight + 2 * this._padding
      };
    }

    private _packRows(availableWidth: number, entries: string[], entryLengths: d3.Map<number>) {
      var rows: string[][] = [];
      var currentRow: string[] = [];
      var spaceLeft = availableWidth;
      entries.forEach((e: string) => {
        var entryLength = entryLengths.get(e);
        if (entryLength > spaceLeft || currentRow.length === this._maxEntriesPerRow) {
          rows.push(currentRow);
          currentRow = [];
          spaceLeft = availableWidth;
        }
        currentRow.push(e);
        spaceLeft -= entryLength;
      });

      if (currentRow.length !== 0) {
        rows.push(currentRow);
      }
      return rows;
    }

    /**
     * Gets the Entities (representing Legend entries) at a particular point.
     * Returns an empty array if no Entities are present at that location.
     *
     * @param {Point} p
     * @returns {Entity<Legend>[]}
     */
    public entitiesAt(p: Point) {
      if (!this._isSetup) {
        return [];
      }

      var entities: Entity<Legend>[] = [];
      var layout = this._calculateLayoutInfo(this.width(), this.height());
      var legendPadding = this._padding;
      var legend = this;
      this.content().selectAll("g." + Legend.LEGEND_ROW_CLASS).each(function(d: any, i: number) {
        var lowY = i * layout.textHeight + legendPadding;
        var highY = (i + 1) * layout.textHeight + legendPadding;
        var symbolY = (lowY + highY) / 2;
        var lowX = legendPadding;
        var highX = legendPadding;
        d3.select(this).selectAll("g." + Legend.LEGEND_ENTRY_CLASS).each(function(value: string) {
          highX += layout.entryLengths.get(value);
          var symbolX = lowX + layout.textHeight / 2;
          if (highX >= p.x && lowX <= p.x &&
              highY >= p.y && lowY <= p.y) {
            var entrySelection = d3.select(this);
            var datum = entrySelection.datum();
            entities.push({
              datum: datum,
              position: { x: symbolX, y: symbolY },
              selection: entrySelection,
              component: legend
            });
          }
          lowX += layout.entryLengths.get(value);
        });
      });

      return entities;
    }

    public renderImmediately() {
      super.renderImmediately();

      var layout = this._calculateLayoutInfo(this.width(), this.height());

      var rowsToDraw = layout.rows.slice(0, layout.numRowsToDraw);
      var rows = this.content().selectAll("g." + Legend.LEGEND_ROW_CLASS).data(rowsToDraw);
      rows.enter().append("g").classed(Legend.LEGEND_ROW_CLASS, true);
      rows.exit().remove();

      rows.attr("transform", (d: any, i: number) => "translate(0, " + (i * layout.textHeight + this._padding) + ")");

      var entries = rows.selectAll("g." + Legend.LEGEND_ENTRY_CLASS).data((d) => d);
      var entriesEnter = entries.enter().append("g").classed(Legend.LEGEND_ENTRY_CLASS, true);
      entriesEnter.append("path");
      entriesEnter.append("g").classed("text-container", true);
      entries.exit().remove();

      var legendPadding = this._padding;
      rows.each(function (values: string[]) {
        var xShift = legendPadding;
        var entriesInRow = d3.select(this).selectAll("g." + Legend.LEGEND_ENTRY_CLASS);
        entriesInRow.attr("transform", (value: string, i: number) => {
          var translateString = "translate(" + xShift + ", 0)";
          xShift += layout.entryLengths.get(value);
          return translateString;
        });
      });

      entries.select("path").attr("d", (d: any, i: number) => this.symbol()(d, i)(layout.textHeight * 0.6))
                            .attr("transform", "translate(" + (layout.textHeight / 2) + "," + layout.textHeight / 2 + ")")
                            .attr("fill", (value: string) => this._colorScale.scale(value) )
                            .classed(Legend.LEGEND_SYMBOL_CLASS, true);

      var padding = this._padding;
      var textContainers = entries.select("g.text-container");
      textContainers.text(""); // clear out previous results
      textContainers.append("title").text((value: string) => value);
      var self = this;
      textContainers.attr("transform", "translate(" + layout.textHeight + ", 0)")
                    .each(function(value: string) {
                      var container = d3.select(this);
                      var maxTextLength = layout.entryLengths.get(value) - layout.textHeight - padding;
                      var writeOptions = {
                        selection: container,
                        xAlign: "left",
                        yAlign: "top",
                        textRotation: 0
                      };

                      self._writer.write(value, maxTextLength, self.height(), writeOptions);
                    });
      return this;
    }

    /**
     * Gets the function determining the symbols of the Legend.
     *
     * @returns {(datum: any, index: number) => symbolFactory}
     */
    public symbol(): (datum: any, index: number) => SymbolFactory;
    /**
     * Sets the function determining the symbols of the Legend.
     *
     * @param {(datum: any, index: number) => SymbolFactory} symbol
     * @returns {Legend} The calling Legend
     */
    public symbol(symbol: (datum: any, index: number) => SymbolFactory): Legend;
    public symbol(symbol?: (datum: any, index: number) => SymbolFactory): any {
      if (symbol == null) {
        return this._symbolFactoryAccessor;
      } else {
        this._symbolFactoryAccessor = symbol;
        this.render();
        return this;
      }
    }

    public fixedWidth() {
      return true;
    }

    public fixedHeight() {
      return true;
    }
  }
}
}
