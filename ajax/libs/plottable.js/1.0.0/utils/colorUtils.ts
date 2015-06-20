///<reference path="../reference.ts" />

module Plottable {
export module Utils {
  export module Color {
    var nativeMath: Math = (<any>window).Math;

    /**
     * Return contrast ratio between two colors
     * Based on implementation from chroma.js by Gregor Aisch (gka) (licensed under BSD)
     * chroma.js may be found here: https://github.com/gka/chroma.js
     * License may be found here: https://github.com/gka/chroma.js/blob/master/LICENSE
     * see http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef
     */
    export function contrast(a: string, b: string) {
      var l1 = luminance(a) + 0.05;
      var l2 = luminance(b) + 0.05;
      return l1 > l2 ? l1 / l2 : l2 / l1;
    }

    /**
     * Returns a brighter copy of this color. Each channel is multiplied by 0.7 ^ -factor.
     * Channel values are capped at the maximum value of 255, and the minimum value of 30.
     */
    export function lightenColor(color: string, factor: number) {
      var hsl = <d3.Hsl> d3.hsl(color).brighter(factor);
      return hsl.rgb().toString();
    }

    /**
     * Gets the Hex Code of the color resulting by applying the className CSS class to the
     * colorTester selection. Returns null if the tester is transparent.
     *
     * @param {d3.Selection<void>} colorTester The d3 selection to apply the CSS class to
     * @param {string} className The name of the class to be applied
     * @return {string} The hex code of the computed color
     */
    export function colorTest(colorTester: d3.Selection<void>, className: string) {
      colorTester.classed(className, true);
      // Use regex to get the text inside the rgb parentheses
      var colorStyle = colorTester.style("background-color");
      if (colorStyle === "transparent") {
        return null;
      }
      var rgb = /\((.+)\)/.exec(colorStyle)[1]
                          .split(",")
                          .map((colorValue: string) => {
                            var colorNumber = +colorValue;
                            var hexValue = colorNumber.toString(16);
                            return colorNumber < 16 ? "0" + hexValue : hexValue;
                          });
      if (rgb.length === 4 && rgb[3] === "00") {
        return null;
      }
      var hexCode = "#" + rgb.join("");
      colorTester.classed(className, false);
      return hexCode;
    }

    /**
     * Return relative luminance (defined here: http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef)
     * Based on implementation from chroma.js by Gregor Aisch (gka) (licensed under BSD)
     * chroma.js may be found here: https://github.com/gka/chroma.js
     * License may be found here: https://github.com/gka/chroma.js/blob/master/LICENSE
     */
    function luminance(color: string) {
      var rgb = d3.rgb(color);

      var lum = (x: number) => {
        x = x / 255;
        return x <= 0.03928 ? x / 12.92 : nativeMath.pow((x + 0.055) / 1.055, 2.4);
      };
      var r = lum(rgb.r);
      var g = lum(rgb.g);
      var b = lum(rgb.b);
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    }
  }
}
}
