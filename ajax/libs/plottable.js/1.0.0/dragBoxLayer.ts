///<reference path="../reference.ts" />

module Plottable {

export type DragBoxCallback = (bounds: Bounds) => void;

export module Components {
  type _EdgeIndicator = {
    top: boolean;
    bottom: boolean;
    left: boolean;
    right: boolean;
  };

  export class DragBoxLayer extends Components.SelectionBoxLayer {
    private _dragInteraction: Interactions.Drag;
    private _detectionEdgeT: d3.Selection<void>;
    private _detectionEdgeB: d3.Selection<void>;
    private _detectionEdgeL: d3.Selection<void>;
    private _detectionEdgeR: d3.Selection<void>;
    private _detectionCornerTL: d3.Selection<void>;
    private _detectionCornerTR: d3.Selection<void>;
    private _detectionCornerBL: d3.Selection<void>;
    private _detectionCornerBR: d3.Selection<void>;

    private _detectionRadius = 3;
    private _resizable = false;
    protected _hasCorners = true;

    private _dragStartCallbacks: Utils.CallbackSet<DragBoxCallback>;
    private _dragCallbacks: Utils.CallbackSet<DragBoxCallback>;
    private _dragEndCallbacks: Utils.CallbackSet<DragBoxCallback>;

    /**
     * Constructs a DragBoxLayer.
     *
     * A DragBoxLayer is a SelectionBoxLayer with a built-in Drag Interaction.
     * A drag gesture will set the Bounds of the box.
     * If resizing is enabled using resizable(true), the edges of box can be repositioned.
     *
     * @constructor
     */
    constructor() {
      super();
      /*
       * Enable clipPath to hide _detectionEdge s and _detectionCorner s
       * that overlap with the edge of the DragBoxLayer. This prevents the
       * user's cursor from changing outside the DragBoxLayer, where they
       * wouldn't be able to grab the edges or corners for resizing.
       */
      this._clipPathEnabled = true;
      this.addClass("drag-box-layer");

      this._dragInteraction = new Interactions.Drag();
      this._setUpCallbacks();
      this._dragInteraction.attachTo(this);

      this._dragStartCallbacks = new Utils.CallbackSet<DragBoxCallback>();
      this._dragCallbacks = new Utils.CallbackSet<DragBoxCallback>();
      this._dragEndCallbacks = new Utils.CallbackSet<DragBoxCallback>();
    }

    private _setUpCallbacks() {
      var resizingEdges: _EdgeIndicator;
      var topLeft: Point;
      var bottomRight: Point;
      var startedNewBox: boolean;

      this._dragInteraction.onDragStart((s: Point) => {
        resizingEdges = this._getResizingEdges(s);

        if (!this.boxVisible() ||
            (!resizingEdges.top && !resizingEdges.bottom &&
             !resizingEdges.left && !resizingEdges.right)
           ) {
          this.bounds({
            topLeft: s,
            bottomRight: s
          });
          startedNewBox = true;
        } else {
          startedNewBox = false;
        }

        this.boxVisible(true);
        var bounds = this.bounds();
        // copy points so changes to topLeft and bottomRight don't mutate bounds
        topLeft = { x: bounds.topLeft.x, y: bounds.topLeft.y };
        bottomRight = { x: bounds.bottomRight.x, y: bounds.bottomRight.y };
        this._dragStartCallbacks.callCallbacks(bounds);
      });

      this._dragInteraction.onDrag((s: Point, e: Point) => {
        if (startedNewBox) {
          bottomRight.x = e.x;
          bottomRight.y = e.y;
        } else {
          if (resizingEdges.bottom) {
            bottomRight.y = e.y;
          } else if (resizingEdges.top) {
            topLeft.y = e.y;
          }

          if (resizingEdges.right) {
            bottomRight.x = e.x;
          } else if (resizingEdges.left) {
            topLeft.x = e.x;
          }
        }

        this.bounds({
          topLeft: topLeft,
          bottomRight: bottomRight
        });

        this._dragCallbacks.callCallbacks(this.bounds());
      });

      this._dragInteraction.onDragEnd((s: Point, e: Point) => {
        if (startedNewBox && s.x === e.x && s.y === e.y) {
          this.boxVisible(false);
        }

        this._dragEndCallbacks.callCallbacks(this.bounds());
      });
    }

    protected _setup() {
      super._setup();

      var createLine = () => this._box.append("line").style({
                               "opacity": 0,
                               "stroke": "pink"
                             });
      this._detectionEdgeT = createLine().classed("drag-edge-tb", true);
      this._detectionEdgeB = createLine().classed("drag-edge-tb", true);
      this._detectionEdgeL = createLine().classed("drag-edge-lr", true);
      this._detectionEdgeR = createLine().classed("drag-edge-lr", true);

      if (this._hasCorners) {
        var createCorner = () => this._box.append("circle")
                                     .style({
                                       "opacity": 0,
                                       "fill": "pink"
                                     });
        this._detectionCornerTL = createCorner().classed("drag-corner-tl", true);
        this._detectionCornerTR = createCorner().classed("drag-corner-tr", true);
        this._detectionCornerBL = createCorner().classed("drag-corner-bl", true);
        this._detectionCornerBR = createCorner().classed("drag-corner-br", true);
      }
    }

    private _getResizingEdges(p: Point) {
      var edges = {
        top: false,
        bottom: false,
        left: false,
        right: false
      };

      if (!this.resizable()) {
        return edges;
      }

      var bounds = this.bounds();
      var t = bounds.topLeft.y;
      var b = bounds.bottomRight.y;
      var l = bounds.topLeft.x;
      var r = bounds.bottomRight.x;
      var rad = this._detectionRadius;

      if (l - rad <= p.x && p.x <= r + rad) {
        edges.top = (t - rad <= p.y && p.y <= t + rad);
        edges.bottom = (b - rad <= p.y && p.y <= b + rad);
      }

      if (t - rad <= p.y && p.y <= b + rad) {
        edges.left = (l - rad <= p.x && p.x <= l + rad);
        edges.right = (r - rad <= p.x && p.x <= r + rad);
      }

      return edges;
    }

    public renderImmediately() {
      super.renderImmediately();
      if (this.boxVisible()) {
        var bounds = this.bounds();
        var t = bounds.topLeft.y;
        var b = bounds.bottomRight.y;
        var l = bounds.topLeft.x;
        var r = bounds.bottomRight.x;

        this._detectionEdgeT.attr({
          x1: l, y1: t, x2: r, y2: t,
          "stroke-width": this._detectionRadius * 2
        });
        this._detectionEdgeB.attr({
          x1: l, y1: b, x2: r, y2: b,
          "stroke-width": this._detectionRadius * 2
        });
        this._detectionEdgeL.attr({
          x1: l, y1: t, x2: l, y2: b,
          "stroke-width": this._detectionRadius * 2
        });
        this._detectionEdgeR.attr({
          x1: r, y1: t, x2: r, y2: b,
          "stroke-width": this._detectionRadius * 2
        });

        if (this._hasCorners) {
          this._detectionCornerTL.attr({ cx: l, cy: t, r: this._detectionRadius });
          this._detectionCornerTR.attr({ cx: r, cy: t, r: this._detectionRadius });
          this._detectionCornerBL.attr({ cx: l, cy: b, r: this._detectionRadius });
          this._detectionCornerBR.attr({ cx: r, cy: b, r: this._detectionRadius });
        }
        return this;
      }
    }

    /**
     * Gets the detection radius of the drag box in pixels.
     */
    public detectionRadius(): number;
    /**
     * Sets the detection radius of the drag box in pixels.
     *
     * @param {number} r
     * @return {DragBoxLayer} The calling DragBoxLayer.
     */
    public detectionRadius(r: number): DragBoxLayer;
    public detectionRadius(r?: number): any {
      if (r == null) {
        return this._detectionRadius;
      }
      if (r < 0) {
        throw new Error("detection radius cannot be negative.");
      }
      this._detectionRadius = r;
      this.render();
      return this;
    }

    /**
     * Gets whether or not the drag box is resizable.
     */
    public resizable(): boolean;
    /**
     * Sets whether or not the drag box is resizable.
     *
     * @param {boolean} canResize
     * @return {DragBoxLayer} The calling DragBoxLayer.
     */
    public resizable(canResize: boolean): DragBoxLayer;
    public resizable(canResize?: boolean): any {
      if (canResize == null) {
        return this._resizable;
      }
      this._resizable = canResize;
      this._setResizableClasses(canResize);
      return this;
    }

    // Sets resizable classes. Overridden by subclasses that only resize in one dimension.
    protected _setResizableClasses(canResize: boolean) {
      if (canResize) {
        this.addClass("x-resizable");
        this.addClass("y-resizable");
      } else {
        this.removeClass("x-resizable");
        this.removeClass("y-resizable");
      }
    }

    /**
     * Sets the callback to be called when dragging starts.
     *
     * @param {DragBoxCallback} callback
     * @returns {DragBoxLayer} The calling DragBoxLayer.
     */
    public onDragStart(callback: DragBoxCallback) {
      this._dragStartCallbacks.add(callback);
      return this;
    }

    /**
     * Removes a callback to be called when dragging starts.
     *
     * @param {DragBoxCallback} callback
     * @returns {DragBoxLayer} The calling DragBoxLayer.
     */
    public offDragStart(callback: DragBoxCallback) {
      this._dragStartCallbacks.delete(callback);
      return this;
    }

    /**
     * Sets a callback to be called during dragging.
     *
     * @param {DragBoxCallback} callback
     * @returns {DragBoxLayer} The calling DragBoxLayer.
     */
    public onDrag(callback: DragBoxCallback) {
      this._dragCallbacks.add(callback);
      return this;
    }

    /**
     * Removes a callback to be called during dragging.
     *
     * @param {DragBoxCallback} callback
     * @returns {DragBoxLayer} The calling DragBoxLayer.
     */
    public offDrag(callback: DragBoxCallback) {
      this._dragCallbacks.delete(callback);
      return this;
    }

    /**
     * Sets a callback to be called when dragging ends.
     *
     * @param {DragBoxCallback} callback
     * @returns {DragBoxLayer} The calling DragBoxLayer.
     */
    public onDragEnd(callback: DragBoxCallback) {
      this._dragEndCallbacks.add(callback);
      return this;
    }

    /**
     * Removes a callback to be called when dragging ends.
     *
     * @param {DragBoxCallback} callback
     * @returns {DragBoxLayer} The calling DragBoxLayer.
     */
    public offDragEnd(callback: DragBoxCallback) {
      this._dragEndCallbacks.delete(callback);
      return this;
    }

    /**
     * Gets the internal Interactions.Drag of the DragBoxLayer.
     */
    public dragInteraction() {
      return this._dragInteraction;
    }
  }
}
}
