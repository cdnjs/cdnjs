///<reference path="../reference.ts" />

module Plottable {
/*
 * ComponentContainer class encapsulates Table and ComponentGroup's shared functionality.
 * It will not do anything if instantiated directly.
 */
export class ComponentContainer extends Component {
  private _detachCallback: ComponentCallback;

  constructor() {
    super();
    this._detachCallback = (component: Component) => this.remove(component);
  }

  public anchor(selection: d3.Selection<void>) {
    super.anchor(selection);
    this._forEach((c) => c.anchor(this.content()));
    return this;
  }

  public render() {
    this._forEach((c) => c.render());
    return this;
  }

  /**
   * Checks whether the specified Component is in the ComponentContainer.
   */
  public has(component: Component): boolean {
    throw new Error("has() is not implemented on ComponentContainer");
  }

  protected _adoptAndAnchor(component: Component) {
    component.parent(this);
    component.onDetach(this._detachCallback);
    if (this._isAnchored) {
      component.anchor(this.content());
    }
  }

  /**
   * Removes the specified Component from the ComponentContainer.
   */
  public remove(component: Component) {
    if (this.has(component)) {
      component.offDetach(this._detachCallback);
      this._remove(component);
      component.detach();
      this.redraw();
    }
    return this;
  }

  /**
   * Carry out the actual removal of a Component.
   * Implementation dependent on the type of container.
   *
   * @return {boolean} true if the Component was successfully removed, false otherwise.
   */
  protected _remove(component: Component) {
    return false;
  }

  /**
   * Invokes a callback on each Component in the ComponentContainer.
   */
  protected _forEach(callback: (component: Component) => void) {
    throw new Error("_forEach() is not implemented on ComponentContainer");
  }

  /**
   * Destroys the ComponentContainer and all Components within it.
   */
  public destroy() {
    super.destroy();
    this._forEach((c: Component) => c.destroy());
  }
}
}
