///<reference path="../reference.ts" />

module Plottable {
export module Utils {
  export module Array {
    var nativeArray = (<any>window).Array;

    /**
     * Takes two arrays of numbers and adds them together
     *
     * @param {number[]} aList The first array of numbers
     * @param {number[]} bList The second array of numbers
     * @return {number[]} An array of numbers where x[i] = aList[i] + bList[i]
     */
    export function add(aList: number[], bList: number[]): number[] {
      if (aList.length !== bList.length) {
        throw new Error("attempted to add arrays of unequal length");
      }
      return aList.map((_: number, i: number) => aList[i] + bList[i]);
    }

    /**
     * Take an array of values, and return the unique values.
     * Will work iff ∀ a, b, a.toString() == b.toString() => a == b; will break on Object inputs
     *
     * @param {T[]} values The values to find uniqueness for
     * @return {T[]} The unique values
     */
    export function uniq<T>(arr: T[]): T[] {
      var seen: d3.Set = d3.set();
      var result: T[] = [];
      arr.forEach((x) => {
        if (!seen.has(String(x))) {
          seen.add(String(x));
          result.push(x);
        }
      });
      return result;
    }

    /**
     * @param {T[][]} a The 2D array that will have its elements joined together.
     * @return {T[]} Every array in a, concatenated together in the order they appear.
     */
    export function flatten<T>(a: T[][]): T[] {
      return nativeArray.prototype.concat.apply([], a);
    }

    /**
     * Creates an array of length `count`, filled with value or (if value is a function), value()
     *
     * @param {T | ((index?: number) => T)} value The value to fill the array with or a value generator (called with index as arg)
     * @param {number} count The length of the array to generate
     * @return {any[]}
     */
    export function createFilledArray<T>(value: T | ((index?: number) => T), count: number) {
      var out: T[] = [];
      for (var i = 0; i < count; i++) {
        out[i] = typeof(value) === "function" ? (<(index?: number) => T> value)(i) : <T> value;
      }
      return out;
    }

  }
}
}
