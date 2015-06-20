///<reference path="../reference.ts" />

module Plottable {
export module Utils {
  /**
   * Shim for ES6 map.
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
   */
  export class Map<K, V> {
    private _keyValuePairs: { key: K; value: V; }[];
    private _es6Map: any;

    public constructor() {
      if (typeof (<any>window).Map === "function") {
        this._es6Map = new (<any>window).Map();
      } else {
        this._keyValuePairs = [];
      }
    }

    public set(key: K, value: V) {
      if (Utils.Math.isNaN(key)) {
        throw new Error("NaN may not be used as a key to the Map");
      }

      if (this._es6Map != null) {
        this._es6Map.set(key, value);
        return this;
      }

      for (var i = 0; i < this._keyValuePairs.length; i++) {
        if (this._keyValuePairs[i].key === key) {
          this._keyValuePairs[i].value = value;
          return this;
        }
      }
      this._keyValuePairs.push({ key: key, value: value });
      return this;
    }

    public get(key: K) {
      if (this._es6Map != null) {
        return <V>this._es6Map.get(key);
      }

      for (var i = 0; i < this._keyValuePairs.length; i++) {
        if (this._keyValuePairs[i].key === key) {
          return this._keyValuePairs[i].value;
        }
      }
      return undefined;
    }

    public has(key: K) {
      if (this._es6Map != null) {
        return <boolean>this._es6Map.has(key);
      }

      for (var i = 0; i < this._keyValuePairs.length; i++) {
        if (this._keyValuePairs[i].key === key) {
          return true;
        }
      }
      return false;
    }

    public forEach(callbackFn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any) {
      if (this._es6Map != null) {
        var callbackWrapper = (value: V, key: K) => callbackFn.call(thisArg, value, key, this);
        this._es6Map.forEach(callbackWrapper, thisArg);
        return;
      }

      this._keyValuePairs.forEach((keyValuePair) => {
        callbackFn.call(thisArg, keyValuePair.value, keyValuePair.key, this);
      });
    }

    public delete(key: K) {
      if (this._es6Map != null) {
        return <boolean>this._es6Map.delete(key);
      }

      for (var i = 0; i < this._keyValuePairs.length; i++) {
        if (this._keyValuePairs[i].key === key) {
          this._keyValuePairs.splice(i, 1);
          return true;
        }
      }
      return false;
    }
  }
}
}
