///<reference path="../reference.ts" />

module Plottable {
export module Components {
  export class SelectionBoxLayer extends Component {
    protected _box: d3.Selection<void>;
    private _boxArea: d3.Selection<void>;
    private _boxVisible = false;
    private _boxBounds: Bounds = {
      topLeft: { x: 0, y: 0 },
      bottomRight: { x: 0, y: 0 }
    };

    constructor() {
      super();
      this.addClass("selection-box-layer");
    }

    protected _setup() {
      super._setup();

      this._box = this.content().append("g").classed("selection-box", true).remove();
      this._boxArea = this._box.append("rect").classed("selection-area", true);
    }

    protected _sizeFromOffer(availableWidth: number, availableHeight: number) {
      return {
        width: availableWidth,
        height: availableHeight
      };
    }

    /**
     * Gets the Bounds of the box.
     */
    public bounds(): Bounds;
    /**
     * Sets the Bounds of the box.
     *
     * @param {Bounds} newBounds
     * @return {SelectionBoxLayer} The calling SelectionBoxLayer.
     */
    public bounds(newBounds: Bounds): SelectionBoxLayer;
    public bounds(newBounds?: Bounds): any {
      if (newBounds == null) {
        return this._boxBounds;
      }

      this._setBounds(newBounds);
      this.render();
      return this;
    }

    protected _setBounds(newBounds: Bounds) {
      var topLeft: Point = {
        x: Math.min(newBounds.topLeft.x, newBounds.bottomRight.x),
        y: Math.min(newBounds.topLeft.y, newBounds.bottomRight.y)
      };
      var bottomRight: Point = {
        x: Math.max(newBounds.topLeft.x, newBounds.bottomRight.x),
        y: Math.max(newBounds.topLeft.y, newBounds.bottomRight.y)
      };
      this._boxBounds = {
        topLeft: topLeft,
        bottomRight: bottomRight
      };
    }

    public renderImmediately() {
      if (this._boxVisible) {
        var t = this._boxBounds.topLeft.y;
        var b = this._boxBounds.bottomRight.y;
        var l = this._boxBounds.topLeft.x;
        var r = this._boxBounds.bottomRight.x;

        this._boxArea.attr({
          x: l, y: t, width: r - l, height: b - t
        });
        (<Node> this.content().node()).appendChild(<Node> this._box.node());
      } else {
        this._box.remove();
      }
      return this;
    }

    /**
     * Gets whether the box is being shown.
     */
    public boxVisible(): boolean;
    /**
     * Shows or hides the selection box.
     *
     * @param {boolean} show Whether or not to show the box.
     * @return {SelectionBoxLayer} The calling SelectionBoxLayer.
     */
    public boxVisible(show: boolean): SelectionBoxLayer;
    public boxVisible(show?: boolean): any {
      if (show == null) {
        return this._boxVisible;
      }

      this._boxVisible = show;
      this.render();
      return this;
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
