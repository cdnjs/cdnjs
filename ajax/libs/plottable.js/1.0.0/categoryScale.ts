///<reference path="../reference.ts" />

module Plottable {
export module Scales {
  export class Category extends Scale<string, number> {
    private _d3Scale: d3.scale.Ordinal<string, number>;
    private _range = [0, 1];

    private _innerPadding: number;
    private _outerPadding: number;

    /**
     * A Category Scale maps strings to numbers.
     *
     * @constructor
     */
    constructor() {
      super();
      this._d3Scale = d3.scale.ordinal<string, number>();
      var d3InnerPadding = 0.3;
      this._innerPadding = Category._convertToPlottableInnerPadding(d3InnerPadding);
      this._outerPadding = Category._convertToPlottableOuterPadding(0.5, d3InnerPadding);
    }

    public extentOfValues(values: string[]) {
      return Utils.Array.uniq(values);
    }

    protected _getExtent(): string[] {
      return Utils.Array.uniq(this._getAllIncludedValues());
    }

    public domain(): string[];
    public domain(values: string[]): Category;
    public domain(values?: string[]): any {
      return super.domain(values);
    }

    protected _setDomain(values: string[]) {
      super._setDomain(values);
      this.range(this.range()); // update range
    }

    public range(): [number, number];
    public range(values: [number, number]): Category;
    public range(values?: [number, number]): any {
      if (values == null) {
        return this._range;
      } else {
        this._range = values;
        var d3InnerPadding = 1 - 1 / (1 + this.innerPadding());
        var d3OuterPadding = this.outerPadding() / (1 + this.innerPadding());
        this._d3Scale.rangeBands(values, d3InnerPadding, d3OuterPadding);
        return this;
      }
    }

    private static _convertToPlottableInnerPadding(d3InnerPadding: number): number {
      return 1 / (1 - d3InnerPadding) - 1;
    }

    private static _convertToPlottableOuterPadding(d3OuterPadding: number, d3InnerPadding: number): number {
      return d3OuterPadding / (1 - d3InnerPadding);
    }

    /**
     * Returns the width of the range band.
     *
     * @returns {number} The range band width
     */
    public rangeBand(): number {
      return this._d3Scale.rangeBand();
    }

    /**
     * Returns the step width of the scale.
     *
     * The step width is the pixel distance between adjacent values in the domain.
     *
     * @returns {number}
     */
    public stepWidth(): number {
      return this.rangeBand() * (1 + this.innerPadding());
    }

    /**
     * Gets the inner padding.
     *
     * The inner padding is defined as the padding in between bands on the scale,
     * expressed as a multiple of the rangeBand().
     *
     * @returns {number}
     */
    public innerPadding(): number;
    /**
     * Sets the inner padding.
     *
     * The inner padding is defined as the padding in between bands on the scale,
     * expressed as a multiple of the rangeBand().
     *
     * @returns {Category} The calling Category Scale.
     */
    public innerPadding(innerPadding: number): Category;
    public innerPadding(innerPadding?: number): any {
      if (innerPadding == null) {
        return this._innerPadding;
      }
      this._innerPadding = innerPadding;
      this.range(this.range());
      this._dispatchUpdate();
      return this;
    }

    /**
     * Gets the outer padding.
     *
     * The outer padding is the padding in between the outer bands and the edges of the range,
     * expressed as a multiple of the rangeBand().
     *
     * @returns {number}
     */
    public outerPadding(): number;
    /**
     * Sets the outer padding.
     *
     * The outer padding is the padding in between the outer bands and the edges of the range,
     * expressed as a multiple of the rangeBand().
     *
     * @returns {Category} The calling Category Scale.
     */
    public outerPadding(outerPadding: number): Category;
    public outerPadding(outerPadding?: number): any {
      if (outerPadding == null) {
        return this._outerPadding;
      }
      this._outerPadding = outerPadding;
      this.range(this.range());
      this._dispatchUpdate();
      return this;
    }

    public scale(value: string): number {
      // scale it to the middle
      return this._d3Scale(value) + this.rangeBand() / 2;
    }

    protected _getDomain() {
      return this._d3Scale.domain();
    }

    protected _setBackingScaleDomain(values: string[]) {
      this._d3Scale.domain(values);
    }

    protected _getRange() {
      return this._d3Scale.range();
    }

    protected _setRange(values: number[]) {
      this._d3Scale.range(values);
    }
  }
}
}
