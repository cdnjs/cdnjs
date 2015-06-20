///<reference path="../reference.ts" />

module Plottable {

export type ComponentCallback = (component: Component) => void;

export module Components {
  export class Alignment {
    static TOP = "top";
    static BOTTOM = "bottom";
    static LEFT = "left";
    static RIGHT = "right";
    static CENTER = "center";
  }
}
export class Component {
  private _element: d3.Selection<void>;
  private _content: d3.Selection<void>;
  protected _boundingBox: d3.Selection<void>;
  private _backgroundContainer: d3.Selection<void>;
  private _foregroundContainer: d3.Selection<void>;
  protected _clipPathEnabled = false;
  private _origin: Point = { x: 0, y: 0 }; // Origin of the coordinate space for the Component.

  private _parent: ComponentContainer;
  private _xAlignment: string = "left";
  private static _xAlignToProportion: { [alignment: string]: number } = {
    "left": 0,
    "center": 0.5,
    "right": 1
  };
  private _yAlignment: string = "top";
  private static _yAlignToProportion: { [alignment: string]: number } = {
    "top": 0,
    "center": 0.5,
    "bottom": 1
  };
  protected _isSetup = false;
  protected _isAnchored = false;

  private _boxes: d3.Selection<void>[] = [];
  private _boxContainer: d3.Selection<void>;
  private _rootSVG: d3.Selection<void>;
  private _isTopLevelComponent = false;
  private _width: number; // Width and height of the Component. Used to size the hitbox, bounding box, etc
  private _height: number;
  private _cssClasses = new Utils.Set<string>();
  private _destroyed = false;
  private _onAnchorCallbacks = new Utils.CallbackSet<ComponentCallback>();
  private _onDetachCallbacks = new Utils.CallbackSet<ComponentCallback>();

  public constructor() {
    this._cssClasses.add("component");
  }

  /**
   * Attaches the Component as a child of a given d3 Selection.
   *
   * @param {d3.Selection} selection.
   * @returns {Component} The calling Component.
   */
  public anchor(selection: d3.Selection<void>) {
    if (this._destroyed) {
      throw new Error("Can't reuse destroy()-ed Components!");
    }

    if ((<Node> selection.node()).nodeName.toLowerCase() === "svg") {
      // svg node gets the "plottable" CSS class
      this._rootSVG = selection;
      this._rootSVG.classed("plottable", true);
      // visible overflow for firefox https://stackoverflow.com/questions/5926986/why-does-firefox-appear-to-truncate-embedded-svgs
      this._rootSVG.style("overflow", "visible");
      this._isTopLevelComponent = true;
    }

    if (this._element != null) {
      // reattach existing element
      (<Node> selection.node()).appendChild(<Node> this._element.node());
    } else {
      this._element = selection.append("g");
      this._setup();
    }
    this._isAnchored = true;
    this._onAnchorCallbacks.callCallbacks(this);
    return this;
  }

  /**
   * Adds a callback to be called on anchoring the Component to the DOM.
   * If the Component is already anchored, the callback is called immediately.
   *
   * @param {ComponentCallback} callback
   * @return {Component}
   */
  public onAnchor(callback: ComponentCallback) {
    if (this._isAnchored) {
      callback(this);
    }
    this._onAnchorCallbacks.add(callback);
    return this;
  }

  /**
   * Removes a callback that would be called on anchoring the Component to the DOM.
   * The callback is identified by reference equality.
   *
   * @param {ComponentCallback} callback
   * @return {Component}
   */
  public offAnchor(callback: ComponentCallback) {
    this._onAnchorCallbacks.delete(callback);
    return this;
  }

  /**
   * Creates additional elements as necessary for the Component to function.
   * Called during anchor() if the Component's element has not been created yet.
   * Override in subclasses to provide additional functionality.
   */
  protected _setup() {
    if (this._isSetup) {
      return;
    }
    this._cssClasses.forEach((cssClass: string) => {
      this._element.classed(cssClass, true);
    });
    this._cssClasses = new Utils.Set<string>();

    this._backgroundContainer = this._element.append("g").classed("background-container", true);
    this._addBox("background-fill", this._backgroundContainer);
    this._content = this._element.append("g").classed("content", true);
    this._foregroundContainer = this._element.append("g").classed("foreground-container", true);
    this._boxContainer = this._element.append("g").classed("box-container", true);

    if (this._clipPathEnabled) {
      this._generateClipPath();
    };

    this._boundingBox = this._addBox("bounding-box");

    this._isSetup = true;
  }

  /**
   * Given available space in pixels, returns the minimum width and height this Component will need.
   *
   * @param {number} availableWidth
   * @param {number} availableHeight
   * @returns {SpaceRequest}
   */
  public requestedSpace(availableWidth: number, availableHeight: number): SpaceRequest {
    return {
      minWidth: 0,
      minHeight: 0
    };
  }

  /**
   * Computes and sets the size, position, and alignment of the Component from the specified values.
   * If no parameters are supplied and the Component is a root node,
   * they are inferred from the size of the Component's element.
   *
   * @param {Point} [origin] Origin of the space offered to the Component.
   * @param {number} [availableWidth] Available width in pixels.
   * @param {number} [availableHeight] Available height in pixels.
   * @returns {Component} The calling Component.
   */
  public computeLayout(origin?: Point, availableWidth?: number, availableHeight?: number) {
    if (origin == null || availableWidth == null || availableHeight == null) {
      if (this._element == null) {
        throw new Error("anchor() must be called before computeLayout()");
      } else if (this._isTopLevelComponent) {
        // we are the root node, retrieve height/width from root SVG
        origin = { x: 0, y: 0 };

        // Set width/height to 100% if not specified, to allow accurate size calculation
        // see http://www.w3.org/TR/CSS21/visudet.html#block-replaced-width
        // and http://www.w3.org/TR/CSS21/visudet.html#inline-replaced-height
        if (this._rootSVG.attr("width") == null) {
          this._rootSVG.attr("width", "100%");
        }
        if (this._rootSVG.attr("height") == null) {
          this._rootSVG.attr("height", "100%");
        }

        var elem: HTMLScriptElement = (<HTMLScriptElement> this._rootSVG.node());
        availableWidth = Utils.DOM.elementWidth(elem);
        availableHeight = Utils.DOM.elementHeight(elem);
      } else {
        throw new Error("null arguments cannot be passed to computeLayout() on a non-root node");
      }
    }
    var size = this._sizeFromOffer(availableWidth, availableHeight);
    this._width = size.width;
    this._height = size.height;
    var xAlignProportion = Component._xAlignToProportion[this._xAlignment];
    var yAlignProportion = Component._yAlignToProportion[this._yAlignment];
    this._origin = {
      x: origin.x + (availableWidth - this.width()) * xAlignProportion,
      y: origin.y + (availableHeight - this.height()) * yAlignProportion
    };
    this._element.attr("transform", "translate(" + this._origin.x + "," + this._origin.y + ")");
    this._boxes.forEach((b: d3.Selection<void>) => b.attr("width", this.width()).attr("height", this.height()));
    return this;
  }

  protected _sizeFromOffer(availableWidth: number, availableHeight: number) {
    var requestedSpace = this.requestedSpace(availableWidth, availableHeight);
    return {
      width: this.fixedWidth() ? Math.min(availableWidth , requestedSpace.minWidth) : availableWidth,
      height: this.fixedHeight() ? Math.min(availableHeight, requestedSpace.minHeight) : availableHeight
    };
  }

  /**
   * Queues the Component for rendering.
   *
   * @returns {Component} The calling Component.
   */
  public render() {
    if (this._isAnchored && this._isSetup && this.width() >= 0 && this.height() >= 0) {
      RenderController.registerToRender(this);
    }
    return this;
  }

  private _scheduleComputeLayout() {
    if (this._isAnchored && this._isSetup) {
      RenderController.registerToComputeLayout(this);
    }
  }

  /**
   * Renders the Component without waiting for the next frame.
   */
  public renderImmediately() {
    return this;
  }

  /**
   * Causes the Component to re-layout and render.
   *
   * This function should be called when a CSS change has occured that could
   * influence the layout of the Component, such as changing the font size.
   *
   * @returns {Component} The calling Component.
   */
  public redraw() {
    if (this._isAnchored && this._isSetup) {
      if (this._isTopLevelComponent) {
        this._scheduleComputeLayout();
      } else {
        this.parent().redraw();
      }
    }
    return this;
  }

  /**
   * Renders the Component to a given <svg>.
   *
   * @param {String|d3.Selection} element A selector-string for the <svg>, or a d3 selection containing an <svg>.
   * @returns {Component} The calling Component.
   */
  public renderTo(element: String | d3.Selection<void>): Component {
    this.detach();
    if (element != null) {
      var selection: d3.Selection<void>;
      if (typeof(element) === "string") {
        selection = d3.select(<string> element);
      } else {
        selection = <d3.Selection<void>> element;
      }
      if (!selection.node() || (<Node> selection.node()).nodeName.toLowerCase() !== "svg") {
        throw new Error("Plottable requires a valid SVG to renderTo");
      }
      this.anchor(selection);
    }
    if (this._element == null) {
      throw new Error("If a Component has never been rendered before, then renderTo must be given a node to render to, " +
        "or a d3.Selection, or a selector string");
    }
    this.computeLayout();
    this.render();
    // flush so that consumers can immediately attach to stuff we create in the DOM
    RenderController.flush();
    return this;
  }

  /**
   * Gets the x alignment of the Component.
   */
  public xAlignment(): string;
  /**
   * Sets the x alignment of the Component.
   *
   * @param {string} xAlignment The x alignment of the Component ("left"/"center"/"right").
   * @returns {Component} The calling Component.
   */
  public xAlignment(xAlignment: string): Component;
  public xAlignment(xAlignment?: string): any {
    if (xAlignment == null) {
      return this._xAlignment;
    }

    xAlignment = xAlignment.toLowerCase();
    if (Component._xAlignToProportion[xAlignment] == null) {
      throw new Error("Unsupported alignment: " + xAlignment);
    }
    this._xAlignment = xAlignment;
    this.redraw();
    return this;
  }

  /**
   * Gets the y alignment of the Component.
   */
  public yAlignment(): string;
  /**
   * Sets the y alignment of the Component.
   *
   * @param {string} yAlignment The y alignment of the Component ("top"/"center"/"bottom").
   * @returns {Component} The calling Component.
   */
  public yAlignment(yAlignment: string): Component;
  public yAlignment(yAlignment?: string): any {
    if (yAlignment == null) {
      return this._yAlignment;
    }

    yAlignment = yAlignment.toLowerCase();
    if (Component._yAlignToProportion[yAlignment] == null) {
      throw new Error("Unsupported alignment: " + yAlignment);
    }
    this._yAlignment = yAlignment;
    this.redraw();
    return this;
  }

  private _addBox(className?: string, parentElement?: d3.Selection<void>) {
    if (this._element == null) {
      throw new Error("Adding boxes before anchoring is currently disallowed");
    }
    parentElement = parentElement == null ? this._boxContainer : parentElement;
    var box = parentElement.append("rect");
    if (className != null) { box.classed(className, true); }

    this._boxes.push(box);
    if (this.width() != null && this.height() != null) {
      box.attr("width", this.width()).attr("height", this.height());
    }
    return box;
  }

  private _generateClipPath() {
    // The clip path will prevent content from overflowing its Component space.
    // HACKHACK: IE <=9 does not respect the HTML base element in SVG.
    // They don't need the current URL in the clip path reference.
    var prefix = /MSIE [5-9]/.test(navigator.userAgent) ? "" : document.location.href;
    prefix = prefix.split("#")[0]; // To fix cases where an anchor tag was used
    var clipPathId = Utils.DOM.generateUniqueClipPathId();
    this._element.attr("clip-path", "url(\"" + prefix + "#" + clipPathId + "\")");
    var clipPathParent = this._boxContainer.append("clipPath")
                                           .attr("id", clipPathId);
    this._addBox("clip-rect", clipPathParent);
  }

  /**
   * Checks if the Component has a given CSS class.
   *
   * @param {string} cssClass The CSS class to check for.
   */
  public hasClass(cssClass: string) {
    if (cssClass == null) {
      return false;
    }

    if (this._element == null) {
      return this._cssClasses.has(cssClass);
    } else {
      return this._element.classed(cssClass);
    }
  }

  /**
   * Adds a given CSS class to the Component.
   *
   * @param {string} cssClass The CSS class to add.
   * @returns {Component} The calling Component.
   */
  public addClass(cssClass: string) {
    if (cssClass == null) {
      return this;
    }

    if (this._element == null) {
      this._cssClasses.add(cssClass);
    } else {
      this._element.classed(cssClass, true);
    }

    return this;
  }

  /**
   * Removes a given CSS class from the Component.
   *
   * @param {string} cssClass The CSS class to remove.
   * @returns {Component} The calling Component.
   */
  public removeClass(cssClass: string) {
    if (cssClass == null) {
      return this;
    }

    if (this._element == null) {
      this._cssClasses.delete(cssClass);
    } else {
      this._element.classed(cssClass, false);
    }

    return this;
  }

  /**
   * Checks if the Component has a fixed width or if it grows to fill available space.
   * Returns false by default on the base Component class.
   */
  public fixedWidth() {
    return false;
  }

  /**
   * Checks if the Component has a fixed height or if it grows to fill available space.
   * Returns false by default on the base Component class.
   */
  public fixedHeight() {
    return false;
  }

  /**
   * Detaches a Component from the DOM. The Component can be reused.
   *
   * This should only be used if you plan on reusing the calling Component. Otherwise, use destroy().
   *
   * @returns The calling Component.
   */
  public detach() {
    this.parent(null);

    if (this._isAnchored) {
      this._element.remove();
    }
    this._isAnchored = false;

    this._onDetachCallbacks.callCallbacks(this);
    return this;
  }

  /**
   * Adds a callback to be called when the Component is detach()-ed.
   *
   * @param {ComponentCallback} callback
   * @return {Component} The calling Component.
   */
  public onDetach(callback: ComponentCallback) {
    this._onDetachCallbacks.add(callback);
    return this;
  }

  /**
   * Removes a callback to be called when the Component is detach()-ed.
   * The callback is identified by reference equality.
   *
   * @param {ComponentCallback} callback
   * @return {Component} The calling Component.
   */
  public offDetach(callback: ComponentCallback) {
    this._onDetachCallbacks.delete(callback);
    return this;
  }

  /**
   * Gets the parent ComponentContainer for this Component.
   */
  public parent(): ComponentContainer;
  /**
   * Sets the parent ComponentContainer for this Component.
   * An error will be thrown if the parent does not contain this Component.
   * Adding a Component to a ComponentContainer should be done
   * using the appropriate method on the ComponentContainer.
   */
  public parent(parent: ComponentContainer): Component;
  public parent(parent?: ComponentContainer): any {
    if (parent === undefined) {
     return this._parent;
    }
    if (parent !== null && !parent.has(this)) {
      throw new Error("Passed invalid parent");
    }
    this._parent = parent;
    return this;
  }

  /**
   * Removes a Component from the DOM and disconnects all listeners.
   */
  public destroy() {
    this._destroyed = true;
    this.detach();
  }

  /**
   * Gets the width of the Component in pixels.
   */
  public width(): number {
    return this._width;
  }

  /**
   * Gets the height of the Component in pixels.
   */
  public height(): number {
    return this._height;
  }

  /**
   * Gets the origin of the Component relative to its parent.
   *
   * @return {Point}
   */
  public origin(): Point {
    return {
      x: this._origin.x,
      y: this._origin.y
    };
  }

  /**
   * Gets the origin of the Component relative to the root <svg>.
   *
   * @return {Point}
   */
  public originToSVG(): Point {
    var origin = this.origin();
    var ancestor = this.parent();
    while (ancestor != null) {
      var ancestorOrigin = ancestor.origin();
      origin.x += ancestorOrigin.x;
      origin.y += ancestorOrigin.y;
      ancestor = ancestor.parent();
    }
    return origin;
  }

  /**
   * Gets the Selection containing the <g> in front of the visual elements of the Component.
   *
   * Will return undefined if the Component has not been anchored.
   *
   * @return {d3.Selection}
   */
  public foreground(): d3.Selection<void> {
    return this._foregroundContainer;
  }

  /**
   * Gets a Selection containing a <g> that holds the visual elements of the Component.
   *
   * Will return undefined if the Component has not been anchored.
   *
   * @return {d3.Selection} content selection for the Component
   */
  public content(): d3.Selection<void> {
    return this._content;
  }

  /**
   * Gets the Selection containing the <g> behind the visual elements of the Component.
   *
   * Will return undefined if the Component has not been anchored.
   *
   * @return {d3.Selection} background selection for the Component
   */
  public background(): d3.Selection<void> {
    return this._backgroundContainer;
  }
}
}
