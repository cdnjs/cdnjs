///<reference path="../reference.ts" />

module Plottable {
export module Utils {
  export module Math {

    var nativeMath: Math = (<any>window).Math;

    /**
     * Checks if x is between a and b.
     *
     * @param {number} x The value to test if in range
     * @param {number} a The beginning of the (inclusive) range
     * @param {number} b The ending of the (inclusive) range
     * @return {boolean} Whether x is in [a, b]
     */
    export function inRange(x: number, a: number, b: number) {
      return (nativeMath.min(a, b) <= x && x <= nativeMath.max(a, b));
    }

    /**
     * Clamps x to the range [min, max].
     *
     * @param {number} x The value to be clamped.
     * @param {number} min The minimum value.
     * @param {number} max The maximum value.
     * @return {number} A clamped value in the range [min, max].
     */
    export function clamp(x: number, min: number, max: number) {
      return nativeMath.min(nativeMath.max(min, x), max);
    }

    /**
     * Applies the accessor, if provided, to each element of `array` and returns the maximum value.
     * If no maximum value can be computed, returns defaultValue.
     */
    export function max<C>(array: C[], defaultValue: C): C;
    export function max<T, C>(array: T[], accessor: (t?: T, i?: number) => C, defaultValue: C): C;
    export function max(array: any[], firstArg: any, secondArg?: any): any {
      var accessor = typeof(firstArg) === "function" ? firstArg : null;
      var defaultValue = accessor == null ? firstArg : secondArg;
      /* tslint:disable:ban */
      var maxValue = accessor == null ? d3.max(array) : d3.max(array, accessor);
      /* tslint:enable:ban */
      return maxValue !== undefined ? maxValue : defaultValue;
    }

    /**
     * Applies the accessor, if provided, to each element of `array` and returns the minimum value.
     * If no minimum value can be computed, returns defaultValue.
     */
    export function min<C>(array: C[], defaultValue: C): C;
    export function min<T, C>(array: T[], accessor: (t?: T, i?: number) => C, defaultValue: C): C;
    export function min(array: any[], firstArg: any, secondArg?: any): any {
      var accessor = typeof(firstArg) === "function" ? firstArg : null;
      var defaultValue = accessor == null ? firstArg : secondArg;
      /* tslint:disable:ban */
      var minValue = accessor == null ? d3.min(array) : d3.min(array, accessor);
      /* tslint:enable:ban */
      return minValue !== undefined ? minValue : defaultValue;
    }

    /**
     * Returns true **only** if x is NaN
     */
    export function isNaN(n: any) {
      return n !== n;
    }

    /**
     * Returns true if the argument is a number, which is not NaN
     * Numbers represented as strings do not pass this function
     */
    export function isValidNumber(n: any) {
      return typeof n === "number" && !Plottable.Utils.Math.isNaN(n) && isFinite(n);
    }

    /**
     * Generates an array of consecutive, strictly increasing numbers
     * in the range [start, stop) separeted by step
     */
    export function range(start: number, stop: number, step = 1): number[] {
      if (step === 0) {
        throw new Error("step cannot be 0");
      }
      var length = nativeMath.max(nativeMath.ceil((stop - start) / step), 0);
      var range: number[] = [];

      for (var i = 0; i < length; ++i) {
        range[i] = start + step * i;
      }

      return range;
    }

    /**
     * Returns the square of the distance between two points
     *
     * @param {Point} p1
     * @param {Point} p2
     * @return {number} dist(p1, p2)^2
     */
    export function distanceSquared(p1: Point, p2: Point) {
      return nativeMath.pow(p2.y - p1.y, 2) + nativeMath.pow(p2.x - p1.x, 2);
    }
  }
}
}
