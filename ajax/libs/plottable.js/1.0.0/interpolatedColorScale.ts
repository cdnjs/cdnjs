///<reference path="../reference.ts" />

module Plottable {
export module Scales {
  type supportedScale = d3.scale.Linear<number, string> | d3.scale.Log<number, string> | d3.scale.Pow<number, string>;

  export class InterpolatedColor extends Scale<number, string> {
    public static REDS = [
      "#FFFFFF", // white
      "#FFF6E1",
      "#FEF4C0",
      "#FED976",
      "#FEB24C",
      "#FD8D3C",
      "#FC4E2A",
      "#E31A1C",
      "#B10026" // red
    ];
    public static BLUES = [
      "#FFFFFF", // white
      "#CCFFFF",
      "#A5FFFD",
      "#85F7FB",
      "#6ED3EF",
      "#55A7E0",
      "#417FD0",
      "#2545D3",
      "#0B02E1" // blue
    ];
    public static POSNEG = [
      "#0B02E1", // blue
      "#2545D3",
      "#417FD0",
      "#55A7E0",
      "#6ED3EF",
      "#85F7FB",
      "#A5FFFD",
      "#CCFFFF",
      "#FFFFFF", // white
      "#FFF6E1",
      "#FEF4C0",
      "#FED976",
      "#FEB24C",
      "#FD8D3C",
      "#FC4E2A",
      "#E31A1C",
      "#B10026" // red
    ];
    private _colorRange: string[];
    private _colorScale: supportedScale;
    private _d3Scale: supportedScale;

    /**
     * An InterpolatedColor Scale maps numbers to color hex values, expressed as strings.
     *
     * @param {string} [scaleType="linear"] One of "linear"/"log"/"sqrt"/"pow".
     */
    constructor(scaleType = "linear") {
      super();
      switch (scaleType) {
        case "linear":
          this._colorScale = d3.scale.linear<number, string>();
          break;
        case "log":
          this._colorScale = d3.scale.log<number, string>();
          break;
        case "sqrt":
          this._colorScale = d3.scale.sqrt<number, string>();
          break;
        case "pow":
          this._colorScale = d3.scale.pow<number, string>();
          break;
      }
      if (this._colorScale == null) {
        throw new Error("unknown QuantitativeScale scale type " + scaleType);
      }
      this.range(InterpolatedColor.REDS);
    }

    public extentOfValues(values: number[]): number[] {
      var extent = d3.extent(values);
      if (extent[0] == null || extent[1] == null) {
        return [];
      } else {
        return extent;
      }
    }

    /**
     * Generates the converted QuantitativeScale.
     */
    private _d3InterpolatedScale() {
      return this._colorScale.range([0, 1]).interpolate(this._interpolateColors());
    }

    /**
     * Generates the d3 interpolator for colors.
     */
    private _interpolateColors() {
      var colors = this._colorRange;
      if (colors.length < 2) {
        throw new Error("Color scale arrays must have at least two elements.");
      };
      return (a: number, b: number) => {
        return (t: number) => {
          // Clamp t parameter to [0,1]
          t = Math.max(0, Math.min(1, t));

          // Determine indices for colors
          var tScaled = t * (colors.length - 1);
          var i0 = Math.floor(tScaled);
          var i1 = Math.ceil(tScaled);
          var frac = (tScaled - i0);

          // Interpolate in the L*a*b color space
          return d3.interpolateLab(colors[i0], colors[i1])(frac);
        };
      };
    }

    private _resetScale(): any {
      this._d3Scale = this._d3InterpolatedScale();
      this._autoDomainIfAutomaticMode();
      this._dispatchUpdate();
    }

    public autoDomain() {
      // InterpolatedColorScales do not pad
      var includedValues = this._getAllIncludedValues();
      if (includedValues.length > 0) {
        this._setDomain([Utils.Math.min(includedValues, 0), Utils.Math.max(includedValues, 0)]);
      }
      return this;
    }

    public scale(value: number) {
      return this._d3Scale(value);
    }

    protected _getDomain() {
      return this._d3Scale.domain();
    }

    protected _setBackingScaleDomain(values: number[]) {
      this._d3Scale.domain(values);
    }

    protected _getRange() {
      return this._colorRange;
    }

    protected _setRange(range: string[]) {
      this._colorRange = range;
      this._resetScale();
    }
  }
}
}
