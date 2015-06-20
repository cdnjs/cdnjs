///<reference path="../reference.ts" />

module Plottable {
export module Utils {
  /**
   * A set of callbacks which can be all invoked at once.
   * Each callback exists at most once in the set (based on reference equality).
   * All callbacks should have the same signature.
   */
  export class CallbackSet<CB extends Function> extends Set<CB> {
    public callCallbacks(...args: any[]) {
      this.forEach((callback) => {
        callback.apply(this, args);
      });
      return this;
    }
  }
}
}
