///<reference path="../reference.ts" />

module Plottable {
export class Interaction {
  protected _componentAttachedTo: Component;

  private _anchorCallback = (component: Component) => this._anchor(component);

  private _isAnchored: boolean;

  protected _anchor(component: Component) {
    this._isAnchored = true;
  }

  protected _unanchor() {
    this._isAnchored = false;
  }

  /**
   * Attaches this Interaction to a Component.
   * If the Interaction was already attached to a Component, it first detaches itself from the old Component.
   *
   * @param {Component} component
   * @returns {Interaction} The calling Interaction.
   */
  public attachTo(component: Component) {
    if (this._componentAttachedTo) {
      this.detachFrom(this._componentAttachedTo);
    }

    this._componentAttachedTo = component;
    component.onAnchor(this._anchorCallback);

    return this;
  }

  /**
   * Detaches this Interaction from the Component.
   * This Interaction can be reused.
   *
   * @param {Component} component
   * @returns {Interaction} The calling Interaction.
   */
  public detachFrom(component: Component) {
    if (this._isAnchored) {
      this._unanchor();
    }
    this._componentAttachedTo = null;
    component.offAnchor(this._anchorCallback);

    return this;
  }

  /**
   * Translates an <svg>-coordinate-space point to Component-space coordinates.
   *
   * @param {Point} p A Point in <svg>-space coordinates.
   * @return {Point} The same location in Component-space coordinates.
   */
  protected _translateToComponentSpace(p: Point): Point {
    var origin = this._componentAttachedTo.originToSVG();
    return {
      x: p.x - origin.x,
      y: p.y - origin.y
    };
  }

  /**
   * Checks whether a Component-coordinate-space Point is inside the Component.
   *
   * @param {Point} p A Point in Compoennt-space coordinates.
   * @return {boolean} Whether or not the point is inside the Component.
   */
  protected _isInsideComponent(p: Point) {
    return 0 <= p.x && 0 <= p.y
           && p.x <= this._componentAttachedTo.width()
           && p.y <= this._componentAttachedTo.height();
  }
}
}
