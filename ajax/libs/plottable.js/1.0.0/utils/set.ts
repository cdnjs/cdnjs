///<reference path="../reference.ts" />

module Plottable {
export module Utils {
  /**
   * Shim for ES6 set.
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
   */
  export class Set<T> {
    public size: number;

    private _values: T[];
    private _es6Set: any;

    constructor() {
      if (typeof (<any>window).Set === "function") {
        this._es6Set = new (<any>window).Set();
      } else {
        this._values = [];
      }
      this.size = 0;
    }

    public add(value: T) {
      if (this._es6Set != null) {
        this._es6Set.add(value);
        this.size = this._es6Set.size;
        return this;
      }

      if (!this.has(value)) {
        this._values.push(value);
        this.size = this._values.length;
      }
      return this;
    }

    public delete(value: T) {
      if (this._es6Set != null) {
        var deleted = <boolean>this._es6Set.delete(value);
        this.size = this._es6Set.size;
        return deleted;
      }

      var index = this._values.indexOf(value);
      if (index !== -1) {
        this._values.splice(index, 1);
        this.size = this._values.length;
        return true;
      }
      return false;
    }

    public has(value: T) {
      if (this._es6Set != null) {
        return <boolean>this._es6Set.has(value);
      }

      return this._values.indexOf(value) !== -1;
    }

    public forEach(callback: (value: T, value2: T, set: Set<T>) => void, thisArg?: any) {
      if (this._es6Set != null) {
        var callbackWrapper = (value: T, value2: T) => callback.call(thisArg, value, value2, this);
        this._es6Set.forEach(callbackWrapper, thisArg);
        return;
      }

      this._values.forEach((value: T) => {
        callback.call(thisArg, value, value, this);
      });
    }

  }
}
}
