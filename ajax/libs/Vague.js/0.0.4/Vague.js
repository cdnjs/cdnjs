/**
 *
 * Version: 0.0.4
 * Author: Gianluca Guarini
 * Contact: gianluca.guarini@gmail.com
 * Website: http://www.gianlucaguarini.com/
 * Twitter: @gianlucaguarini
 *
 * Copyright (c) 2013 Gianluca Guarini
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 **/

;(function(window, document, $) {
  "use strict";

  // Plugin private cache

  var cache = {
    filterId: 0
  };

  var Vague = function(elm, customOptions) {
    // Default oprions
    var defaultOptions = {
      intensity: 5,
      forceSVGUrl: false
    },
      options = $.extend(defaultOptions, customOptions);

    /*
     *
     * PUBLIC VARS
     *
     */

    this.$elm = elm instanceof $ ? elm : $(elm);

    /*
     *
     * PRIVATE VARS
     *
     */


    var blurred = false;

    /*
     *
     * features detection
     *
     */

    var browserPrefixes = ' -webkit- -moz- -o- -ms- '.split(' '),
      cssPrefixString = {},
      cssPrefix = function(property) {
        if (cssPrefixString[property] || cssPrefixString[property] === '') return cssPrefixString[property] + property;
        var e = document.createElement('div');
        var prefixes = ['', 'Moz', 'Webkit', 'O', 'ms', 'Khtml']; // Various supports...
        for (var i in prefixes) {
          if (typeof e.style[prefixes[i] + property] !== 'undefined') {
            cssPrefixString[property] = prefixes[i];
            return prefixes[i] + property;
          }
        }
        return property.toLowerCase();
      },

      // https://github.com/Modernizr/Modernizr/blob/master/feature-detects/css-filters.js
      cssfilters = function() {
        var el = document.createElement('div');
        el.style.cssText = browserPrefixes.join('filter' + ':blur(2px); ');
        return !!el.style.length && ((document.documentMode === undefined || document.documentMode > 9));
      }(),

      // https://github.com/Modernizr/Modernizr/blob/master/feature-detects/svg-filters.js
      svgfilters = function() {
        var result = false;
        try {
          result = typeof SVGFEColorMatrixElement !== undefined &&
            SVGFEColorMatrixElement.SVG_FECOLORMATRIX_TYPE_SATURATE == 2;
        } catch (e) {}
        return result;
      }(),

      /*
       *
       * PRIVATE METHODS
       *
       */

      appendSVGFilter = function() {

        var filterMarkup = "<svg id='vague-svg-blur' style='position:absolute;' width='0' height='0' >" +
          "<filter id='blur-effect-id-" + cache.filterId + "'>" +
          "<feGaussianBlur stdDeviation='" + options.intensity + "' />" +
          "</filter>" +
          "</svg>";

        $("body").append(filterMarkup);

      };

    /*
     *
     * PUBLIC METHODS
     *
     */

    this.init = function() {
      // checking the css filter feature

      if (svgfilters) {
        appendSVGFilter();
      }

      this.$elm.data("vague-filter-id", cache.filterId);

      cache.filterId++;

    };

    this.blur = function() {
      var filterValue,
        loc = window.location,
        svgUrl = options.forceSVGUrl ? loc.protocol + "//" + loc.host + loc.pathname : '',
        filterId = this.$elm.data("vague-filter-id"),
        cssProp = {};
      if (cssfilters) {
        filterValue = "blur(" + options.intensity + "px)";
      } else if (svgfilters) {
        filterValue = "url(" + svgUrl + "#blur-effect-id-" + filterId + ")";
      } else {
        filterValue = "progid:DXImageTransform.Microsoft.Blur(pixelradius=" + options.intensity + ")";
      }
      cssProp[cssPrefix('Filter')] = filterValue;

      this.$elm.css(cssProp);

      blurred = true;
    };

    this.unblur = function() {
      var cssProp = {};
      cssProp[cssPrefix('Filter')] = "none";
      this.$elm.css(cssProp);
      blurred = false;
    };

    this.toggleblur = function() {
      if (blurred) {
        this.unblur();
      } else {
        this.blur();
      }
    };

    this.destroy = function() {
      if (svgfilters) {
        $("filter#blur-effect-id-" + this.$elm.data("vague-filter-id")).parent().remove();
      }
      this.unblur();
    };
    return this.init();
  };

  $.fn.Vague = function(options) {
    return new Vague(this, options);
  };

  window.Vague = Vague;

}(window, document, jQuery));