///<reference path="../reference.ts" />

module Plottable {
export module Components {
  type _LayoutAllocation = {
    guaranteedWidths: number[];
    guaranteedHeights: number[];
    wantsWidthArr: boolean[];
    wantsHeightArr: boolean[];
  };

  type _IterateLayoutResult = {
    colProportionalSpace: number[];
    rowProportionalSpace: number[];
    guaranteedWidths: number[];
    guaranteedHeights: number[];
    wantsWidth: boolean;
    wantsHeight: boolean;
  };

  export class Table extends ComponentContainer {
    private _rowPadding = 0;
    private _columnPadding = 0;

    private _rows: Component[][] = [];

    private _rowWeights: number[] = [];
    private _columnWeights: number[] = [];

    private _nRows = 0;
    private _nCols = 0;

    private _calculatedLayout: _IterateLayoutResult = null;

    /**
     * A Table combines Components in the form of a grid. A
     * common case is combining a y-axis, x-axis, and the plotted data via
     * ```typescript
     * new Table([[yAxis, plot],
     *            [null,  xAxis]]);
     * ```
     *
     * @constructor
     * @param {Component[][]} [rows=[]] A 2-D array of Components to be added to the Table.
     *   null can be used if a cell is empty.
     */
    constructor(rows: Component[][] = []) {
      super();
      this.addClass("table");
      rows.forEach((row, rowIndex) => {
        row.forEach((component, colIndex) => {
          if (component != null) {
            this.add(component, rowIndex, colIndex);
          }
        });
      });
    }

    protected _forEach(callback: (component: Component) => any) {
      for (var r = 0; r < this._nRows; r++) {
        for (var c = 0; c < this._nCols; c++) {
          if (this._rows[r][c] != null) {
            callback(this._rows[r][c]);
          }
        }
      }
    }

    /**
     * Checks whether the specified Component is in the Table.
     */
    public has(component: Component) {
      for (var r = 0; r < this._nRows; r++) {
        for (var c = 0; c < this._nCols; c++) {
          if (this._rows[r][c] === component) {
            return true;
          }
        }
      }
      return false;
    }

    /**
     * Adds a Component in the specified row and column position.
     *
     * For example, instead of calling `new Table([[a, b], [null, c]])`, you
     * could call
     * ```typescript
     * var table = new Table();
     * table.add(a, 0, 0);
     * table.add(b, 0, 1);
     * table.add(c, 1, 1);
     * ```
     *
     * @param {Component} component The Component to be added.
     * @param {number} row
     * @param {number} col
     * @returns {Table} The calling Table.
     */
    public add(component: Component, row: number, col: number) {
      if (component == null) {
        throw Error("Cannot add null to a table cell");
      }

      if (!this.has(component)) {
        var currentComponent = this._rows[row] && this._rows[row][col];
        if (currentComponent != null) {
          throw new Error("cell is occupied");
        }
        component.detach();
        this._nRows = Math.max(row + 1, this._nRows);
        this._nCols = Math.max(col + 1, this._nCols);
        this._padTableToSize(this._nRows, this._nCols);
        this._rows[row][col] = component;

        this._adoptAndAnchor(component);
        this.redraw();
      }
      return this;
    }

    protected _remove(component: Component) {
      for (var r = 0; r < this._nRows; r++) {
        for (var c = 0; c < this._nCols; c++) {
          if (this._rows[r][c] === component) {
            this._rows[r][c] = null;
            return true;
          }
        }
      }
      return false;
    }

    private _iterateLayout(availableWidth: number, availableHeight: number, isFinalOffer = false): _IterateLayoutResult {
    /*
     * Given availableWidth and availableHeight, figure out how to allocate it between rows and columns using an iterative algorithm.
     *
     * For both dimensions, keeps track of "guaranteedSpace", which the fixed-size components have requested, and
     * "proportionalSpace", which is being given to proportionally-growing components according to the weights on the table.
     * Here is how it works (example uses width but it is the same for height). First, columns are guaranteed no width, and
     * the free width is allocated to columns based on their colWeights. Then, in determineGuarantees, every component is
     * offered its column's width and may request some amount of it, which increases that column's guaranteed
     * width. If there are some components that were not satisfied with the width they were offered, and there is free
     * width that has not already been guaranteed, then the remaining width is allocated to the unsatisfied columns and the
     * algorithm runs again. If all components are satisfied, then the remaining width is allocated as proportional space
     * according to the colWeights.
     *
     * The guaranteed width for each column is monotonically increasing as the algorithm iterates. Since it is deterministic
     * and monotonically increasing, if the freeWidth does not change during an iteration it implies that no further progress
     * is possible, so the algorithm will not continue iterating on that dimension's account.
     *
     * If the algorithm runs more than 5 times, we stop and just use whatever we arrived at. It's not clear under what
     * circumstances this will happen or if it will happen at all. A message will be printed to the console if this occurs.
     *
     */
      var rows = this._rows;
      var cols = d3.transpose(this._rows);
      var availableWidthAfterPadding = availableWidth - this._columnPadding * (this._nCols - 1);
      var availableHeightAfterPadding = availableHeight - this._rowPadding * (this._nRows - 1);

      var rowWeights = Table._calcComponentWeights(this._rowWeights, rows, (c: Component) => (c == null) || c.fixedHeight());
      var colWeights = Table._calcComponentWeights(this._columnWeights, cols, (c: Component) => (c == null) || c.fixedWidth());

      // To give the table a good starting position to iterate from, we give the fixed-width components half-weight
      // so that they will get some initial space allocated to work with
      var heuristicColWeights = colWeights.map((c) => c === 0 ? 0.5 : c);
      var heuristicRowWeights = rowWeights.map((c) => c === 0 ? 0.5 : c);

      var colProportionalSpace = Table._calcProportionalSpace(heuristicColWeights, availableWidthAfterPadding );
      var rowProportionalSpace = Table._calcProportionalSpace(heuristicRowWeights, availableHeightAfterPadding);

      var guaranteedWidths = Utils.Array.createFilledArray(0, this._nCols);
      var guaranteedHeights = Utils.Array.createFilledArray(0, this._nRows);

      var freeWidth: number;
      var freeHeight: number;

      var nIterations = 0;
      while (true) {
        var offeredHeights = Utils.Array.add(guaranteedHeights, rowProportionalSpace);
        var offeredWidths = Utils.Array.add(guaranteedWidths, colProportionalSpace);
        var guarantees = this._determineGuarantees(offeredWidths, offeredHeights, isFinalOffer);
        guaranteedWidths = guarantees.guaranteedWidths;
        guaranteedHeights = guarantees.guaranteedHeights;
        var wantsWidth = guarantees.wantsWidthArr .some((x: boolean) => x);
        var wantsHeight = guarantees.wantsHeightArr.some((x: boolean) => x);

        var lastFreeWidth = freeWidth ;
        var lastFreeHeight = freeHeight;
        freeWidth = availableWidthAfterPadding - d3.sum(guarantees.guaranteedWidths );
        freeHeight = availableHeightAfterPadding - d3.sum(guarantees.guaranteedHeights);
        var xWeights: number[];
        if (wantsWidth) { // If something wants width, divide free space between components that want more width
          xWeights = guarantees.wantsWidthArr.map((x) => x ? 0.1 : 0);
          xWeights = Utils.Array.add(xWeights, colWeights);
        } else { // Otherwise, divide free space according to the weights
          xWeights = colWeights;
        }

        var yWeights: number[];
        if (wantsHeight) {
          yWeights = guarantees.wantsHeightArr.map((x) => x ? 0.1 : 0);
          yWeights = Utils.Array.add(yWeights, rowWeights);
        } else {
          yWeights = rowWeights;
        }

        colProportionalSpace = Table._calcProportionalSpace(xWeights, freeWidth );
        rowProportionalSpace = Table._calcProportionalSpace(yWeights, freeHeight);
        nIterations++;

        var canImproveWidthAllocation = freeWidth > 0 && freeWidth !== lastFreeWidth;
        var canImproveHeightAllocation = freeHeight > 0 && freeHeight !== lastFreeHeight;

        if (!(canImproveWidthAllocation || canImproveHeightAllocation)) {
          break;
        }

        if (nIterations > 5) {
          break;
        }
      }

      // Redo the proportional space one last time, to ensure we use the real weights not the wantsWidth/Height weights
      freeWidth = availableWidthAfterPadding - d3.sum(guarantees.guaranteedWidths );
      freeHeight = availableHeightAfterPadding - d3.sum(guarantees.guaranteedHeights);
      colProportionalSpace = Table._calcProportionalSpace(colWeights, freeWidth );
      rowProportionalSpace = Table._calcProportionalSpace(rowWeights, freeHeight);

      return {colProportionalSpace: colProportionalSpace,
              rowProportionalSpace: rowProportionalSpace,
              guaranteedWidths: guarantees.guaranteedWidths,
              guaranteedHeights: guarantees.guaranteedHeights,
              wantsWidth: wantsWidth,
              wantsHeight: wantsHeight};
    }

    private _determineGuarantees(offeredWidths: number[], offeredHeights: number[], isFinalOffer = false): _LayoutAllocation {
      var requestedWidths = Utils.Array.createFilledArray(0, this._nCols);
      var requestedHeights = Utils.Array.createFilledArray(0, this._nRows);
      var columnNeedsWidth = Utils.Array.createFilledArray(false, this._nCols);
      var rowNeedsHeight = Utils.Array.createFilledArray(false, this._nRows);

      this._rows.forEach((row: Component[], rowIndex: number) => {
        row.forEach((component: Component, colIndex: number) => {
          var spaceRequest: SpaceRequest;
          if (component != null) {
            spaceRequest = component.requestedSpace(offeredWidths[colIndex], offeredHeights[rowIndex]);
          } else {
            spaceRequest = {
              minWidth: 0,
              minHeight: 0
            };
          }

          var columnWidth = isFinalOffer ? Math.min(spaceRequest.minWidth, offeredWidths[colIndex]) : spaceRequest.minWidth;
          requestedWidths[colIndex] = Math.max(requestedWidths[colIndex], columnWidth);

          var rowHeight = isFinalOffer ? Math.min(spaceRequest.minHeight, offeredHeights[rowIndex]) : spaceRequest.minHeight;
          requestedHeights[rowIndex] = Math.max(requestedHeights[rowIndex], rowHeight);

          var componentNeedsWidth = spaceRequest.minWidth > offeredWidths[colIndex];
          columnNeedsWidth[colIndex] = columnNeedsWidth[colIndex] || componentNeedsWidth;

          var componentNeedsHeight = spaceRequest.minHeight > offeredHeights[rowIndex];
          rowNeedsHeight[rowIndex] = rowNeedsHeight[rowIndex] || componentNeedsHeight;
        });
      });

      return {
        guaranteedWidths: requestedWidths,
        guaranteedHeights: requestedHeights,
        wantsWidthArr: columnNeedsWidth,
        wantsHeightArr: rowNeedsHeight
      };
    }

    public requestedSpace(offeredWidth: number, offeredHeight: number): SpaceRequest {
      this._calculatedLayout = this._iterateLayout(offeredWidth, offeredHeight);
      return {
        minWidth: d3.sum(this._calculatedLayout.guaranteedWidths),
        minHeight: d3.sum(this._calculatedLayout.guaranteedHeights)
      };
    }

    public computeLayout(origin?: Point, availableWidth?: number, availableHeight?: number) {
      super.computeLayout(origin, availableWidth, availableHeight);
      var lastLayoutWidth = d3.sum(this._calculatedLayout.guaranteedWidths);
      var lastLayoutHeight = d3.sum(this._calculatedLayout.guaranteedHeights);
      var layout = this._calculatedLayout;
      if (lastLayoutWidth > this.width() || lastLayoutHeight > this.height()) {
        layout = this._iterateLayout(this.width(), this.height(), true);
      }

      var childYOrigin = 0;
      var rowHeights = Utils.Array.add(layout.rowProportionalSpace, layout.guaranteedHeights);
      var colWidths = Utils.Array.add(layout.colProportionalSpace, layout.guaranteedWidths );
      this._rows.forEach((row: Component[], rowIndex: number) => {
        var childXOrigin = 0;
        row.forEach((component: Component, colIndex: number) => {
          // recursively compute layout
          if (component != null) {
            component.computeLayout({ x: childXOrigin, y: childYOrigin }, colWidths[colIndex], rowHeights[rowIndex]);
          }
          childXOrigin += colWidths[colIndex] + this._columnPadding;
        });
        childYOrigin += rowHeights[rowIndex] + this._rowPadding;
      });
      return this;
    }

    /**
     * Gets the padding above and below each row in pixels.
     */
    public rowPadding(): number;
    /**
     * Sets the padding above and below each row in pixels.
     *
     * @param {number} rowPadding
     * @returns {Table} The calling Table.
     */
    public rowPadding(rowPadding: number): Table;
    public rowPadding(rowPadding?: number): any {
      if (rowPadding == null) {
        return this._rowPadding;
      }
      this._rowPadding = rowPadding;
      this.redraw();
      return this;
    }

    /**
     * Gets the padding to the left and right of each column in pixels.
     */
    public columnPadding(): number;
    /**
     * Sets the padding to the left and right of each column in pixels.
     *
     * @param {number} columnPadding
     * @returns {Table} The calling Table.
     */
    public columnPadding(columnPadding: number): Table;
    public columnPadding(columnPadding?: number): any {
      if (columnPadding == null) {
        return this._columnPadding;
      }
      this._columnPadding = columnPadding;
      this.redraw();
      return this;
    }

    /**
     * Gets the weight of the specified row.
     *
     * @param {number} index
     */
    public rowWeight(index: number): number;
    /**
     * Sets the weight of the specified row.
     * Space is allocated to rows based on their weight. Rows with higher weights receive proportionally more space.
     *
     * A common case would be to have one row take up 2/3rds of the space,
     * and the other row take up 1/3rd.
     *
     * Example:
     *
     * ```JavaScript
     * plot = new Plottable.Component.Table([
     *  [row1],
     *  [row2]
     * ]);
     *
     * // assign twice as much space to the first row
     * plot
     *  .rowWeight(0, 2)
     *  .rowWeight(1, 1)
     * ```
     *
     * @param {number} index
     * @param {number} weight
     * @returns {Table} The calling Table.
     */
    public rowWeight(index: number, weight: number): Table;
    public rowWeight(index: number, weight?: number): any {
      if (weight == null) {
        return this._rowWeights[index];
      }
      this._rowWeights[index] = weight;
      this.redraw();
      return this;
    }

    /**
     * Gets the weight of the specified column.
     *
     * @param {number} index
     */
    public columnWeight(index: number): number;
    /**
     * Sets the weight of the specified column.
     * Space is allocated to columns based on their weight. Columns with higher weights receive proportionally more space.
     *
     * Please see `rowWeight` docs for an example.
     *
     * @param {number} index
     * @param {number} weight
     * @returns {Table} The calling Table.
     */
    public columnWeight(index: number, weight: number): Table;
    public columnWeight(index: number, weight?: number): any {
      if (weight == null) {
        return this._columnWeights[index];
      }
      this._columnWeights[index] = weight;
      this.redraw();
      return this;
    }

    public fixedWidth(): boolean {
      var cols = d3.transpose(this._rows);
      return Table._fixedSpace(cols, (c: Component) => (c == null) || c.fixedWidth());
    }

    public fixedHeight(): boolean {
      return Table._fixedSpace(this._rows, (c: Component) => (c == null) || c.fixedHeight());
    }

    private _padTableToSize(nRows: number, nCols: number) {
      for (var i = 0; i < nRows; i++) {
        if (this._rows[i] === undefined) {
          this._rows[i] = [];
          this._rowWeights[i] = null;
        }
        for (var j = 0; j < nCols; j++) {
          if (this._rows[i][j] === undefined) {
            this._rows[i][j] = null;
          }
        }
      }
      for (j = 0; j < nCols; j++) {
        if (this._columnWeights[j] === undefined) {
          this._columnWeights[j] = null;
        }
      }
    }

    private static _calcComponentWeights(setWeights: number[],
                                        componentGroups: Component[][],
                                        fixityAccessor: (c: Component) => boolean) {
      // If the row/col weight was explicitly set, then return it outright
      // If the weight was not explicitly set, then guess it using the heuristic that if all components are fixed-space
      // then weight is 0, otherwise weight is 1
      return setWeights.map((w, i) => {
        if (w != null) {
          return w;
        }
        var fixities = componentGroups[i].map(fixityAccessor);
        var allFixed = fixities.reduce((a, b) => a && b, true);
        return allFixed ? 0 : 1;
      });
    }

    private static _calcProportionalSpace(weights: number[], freeSpace: number): number[] {
      var weightSum = d3.sum(weights);
      if (weightSum === 0) {
        return Utils.Array.createFilledArray(0, weights.length);
      } else {
        return weights.map((w) => freeSpace * w / weightSum);
      }
    }

    private static _fixedSpace(componentGroup: Component[][], fixityAccessor: (c: Component) => boolean) {
      var all = (bools: boolean[]) => bools.reduce((a, b) => a && b, true);
      var groupIsFixed = (components: Component[]) => all(components.map(fixityAccessor));
      return all(componentGroup.map(groupIsFixed));
    }
  }
}
}
