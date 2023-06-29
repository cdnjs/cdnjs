/** @license
 *
 *     Colour Palette Generator script.
 *     Copyright (c) 2014 Google Inc.
 *
 *     Licensed under the Apache License, Version 2.0 (the "License"); you may
 *     not use this file except in compliance with the License.  You may
 *     obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *     Unless required by applicable law or agreed to in writing, software
 *     distributed under the License is distributed on an "AS IS" BASIS,
 *     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
 *     implied.  See the License for the specific language governing
 *     permissions and limitations under the License.
 *
 * Furthermore, ColorBrewer colour schemes are covered by the following:
 *
 *     Copyright (c) 2002 Cynthia Brewer, Mark Harrower, and
 *                        The Pennsylvania State University.
 *
 *     Licensed under the Apache License, Version 2.0 (the "License"); you may
 *     not use this file except in compliance with the License. You may obtain
 *     a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *     Unless required by applicable law or agreed to in writing, software
 *     distributed under the License is distributed on an "AS IS" BASIS,
 *     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
 *     implied. See the License for the specific language governing
 *     permissions and limitations under the License.
 *
 *     Redistribution and use in source and binary forms, with or without
 *     modification, are permitted provided that the following conditions are
 *     met:
 *
 *     1. Redistributions as source code must retain the above copyright
 *     notice, this list of conditions and the following disclaimer.
 *
 *     2. The end-user documentation included with the redistribution, if any,
 *     must include the following acknowledgment: "This product includes color
 *     specifications and designs developed by Cynthia Brewer
 *     (http://colorbrewer.org/)." Alternately, this acknowledgment may appear
 *     in the software itself, if and wherever such third-party
 *     acknowledgments normally appear.
 *
 *     4. The name "ColorBrewer" must not be used to endorse or promote products
 *     derived from this software without prior written permission. For written
 *     permission, please contact Cynthia Brewer at cbrewer@psu.edu.
 *
 *     5. Products derived from this software may not be called "ColorBrewer",
 *     nor may "ColorBrewer" appear in their name, without prior written
 *     permission of Cynthia Brewer.
 *
 * Furthermore, Solarized colour schemes are covered by the following:
 *
 *     Copyright (c) 2011 Ethan Schoonover
 *
 *     Permission is hereby granted, free of charge, to any person obtaining
 *     a copy of this software and associated documentation files (the
 *     "Software"), to deal in the Software without restriction, including
 *     without limitation the rights to use, copy, modify, merge, publish,
 *     distribute, sublicense, and/or sell copies of the Software, and to
 *     permit persons to whom the Software is furnished to do so, subject to
 *     the following conditions:
 *
 *     The above copyright notice and this permission notice shall be included
 *     in all copies or substantial portions of the Software.
 *
 *     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 *     OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 *     MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 *     NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 *     LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 *     OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 *     WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

'use strict';

var palette = (function() {

  var proto = Array.prototype;
  var slice = function(arr, opt_begin, opt_end) {
    return proto.slice.apply(arr, proto.slice.call(arguments, 1));
  };

  var extend = function(arr, arr2) {
    return proto.push.apply(arr, arr2);
  };

  var function_type = typeof function() {};

  var INF = 1000000000;  // As far as we're concerned, that's infinity. ;)


  /**
   * Generate a colour palette from given scheme.
   *
   * If scheme argument is not a function it is passed to palettes.listSchemes
   * function (along with the number argument).  This may result in an array
   * of more than one available scheme.  If that is the case, scheme at
   * opt_index position is taken.
   *
   * This allows using different palettes for different data without having to
   * name the schemes specifically, for example:
   *
   *     palette_for_foo = palette('sequential', 10, 0);
   *     palette_for_bar = palette('sequential', 10, 1);
   *     palette_for_baz = palette('sequential', 10, 2);
   *
   * @param {!palette.SchemeType|string|palette.Palette} scheme Scheme to
   *     generate palette for.  Either a function constructed with
   *     palette.Scheme object, or anything that palette.listSchemes accepts
   *     as name argument.
   * @param {number} number Number of colours to return.  If negative, absolute
   *     value is taken and colours will be returned in reverse order.
   * @param {number=} opt_index If scheme is a name of a group or an array and
   *     results in more than one scheme, index of the scheme to use.  The
   *     index wraps around.
   * @param {...*} varargs Additional arguments to pass to palette or colour
   *     generator (if the chosen scheme uses those).
   * @return {Array<string>} Array of abs(number) 'RRGGBB' strings or null if
   *     no matching scheme was found.
   */
  var palette = function(scheme, number, opt_index, varargs) {
    number |= 0;
    if (number == 0) {
      return [];
    }

    if (typeof scheme !== function_type) {
      var arr = palette.listSchemes(
          /** @type {string|palette.Palette} */ (scheme), number);
      if (!arr.length) {
        return null;
      }
      scheme = arr[(opt_index || 0) % arr.length];
    }

    var args = slice(arguments, 2);
    args[0] = number;
    return scheme.apply(scheme, args);
  };


  /**
   * Returns a callable colour scheme object.
   *
   * Just after being created, the scheme has no colour palettes and no way of
   * generating any, thus generate method will return null.  To turn scheme
   * into a useful object, addPalette, addPalettes or setColorFunction methods
   * need to be used.
   *
   * To generate a colour palette with given number colours using function
   * returned by this method, just call it with desired number of colours.
   *
   * Since this function *returns* a callable object, it must *not* be used
   * with the new operator.
   *
   * @param {string} name Name of the scheme.
   * @param {string|!Array<string>=} opt_groups A group name or list of
   *     groups the scheme should be categorised under.  Three typical groups
   *     to use are 'qualitative', 'sequential' and 'diverging', but any
   *     groups may be created.
   * @return {!palette.SchemeType} A colour palette generator function, which
   *     in addition has methods and properties like a regular object.  Think
   *     of it as a callable object.
   */
  palette.Scheme = function(name, opt_groups) {
    /**
     * A map from a number to a colour palettes with given number of colours.
     * @type {!Object<number, palette.Palette>}
     */
    var palettes = {};

    /**
     * The biggest palette in palettes map.
     * @type {number}
     */
    var palettes_max = 0;

    /**
     * The smallest palette in palettes map.
     * @type {number}
     */
    var palettes_min = INF;

    var makeGenerator = function() {
      if (arguments.length <= 1) {
        return self.color_func.bind(self);
      } else {
        var args = slice(arguments);
        return function(x) {
          args[0] = x;
          return self.color_func.apply(self, args);
        };
      }
    };

    /**
     * Generate a colour palette from the scheme.
     *
     * If there was a palette added with addPalette (or addPalettes) with
     * enough colours, that palette will be used.  Otherwise, if colour
     * function has been set using setColorFunction method, that function will
     * be used to generate the palette.  Otherwise null is returned.
     *
     * @param {number} number Number of colours to return.  If negative,
     *     absolute value is taken and colours will be returned in reverse
     *     order.
     * @param {...*} varargs Additional arguments to pass to palette or colour
     *     generator (if the chosen scheme uses those).
     */
    var self = function(number, varargs) {
      number |= 0;
      if (!number) {
        return [];
      }

      var _number = number;
      number = Math.abs(number);

      if (number <= palettes_max) {
        for (var i = Math.max(number, palettes_min); !(i in palettes); ++i) {
          /* nop */
        }
        var colors = palettes[i];
        if (i > number) {
          var take_head =
              'shrinking_takes_head' in colors ?
              colors.shrinking_takes_head : self.shrinking_takes_head;
          if (take_head) {
            colors = colors.slice(0, number);
            i = number;
          } else {
            return palette.generate(
                function(x) { return colors[Math.round(x)]; },
                _number, 0, colors.length - 1);
          }
        }
        colors = colors.slice();
        if (_number < 0) {
          colors.reverse();
        }
        return colors;

      } else if (self.color_func) {
        return palette.generate(makeGenerator.apply(self, arguments),
                                _number, 0, 1, self.color_func_cyclic);

      } else {
        return null;
      }
    };

    /**
     * The name of the palette.
     * @type {string}
     */
    self.scheme_name = name;

    /**
     * A list of groups the palette belongs to.
     * @type {!Array<string>}
     */
    self.groups = opt_groups ?
      typeof opt_groups === 'string' ? [opt_groups] : opt_groups : [];

    /**
     * The biggest palette this scheme can generate.
     * @type {number}
     */
    self.max = 0;

    /**
     * The biggest palette this scheme can generate that is colour-blind
     * friendly.
     * @type {number}
     */
    self.cbf_max = INF;


    /**
     * Adds a colour palette to the colour scheme.
     *
     * @param {palette.Palette} palette An array of 'RRGGBB' strings
     *     representing the palette to add.
     * @param {boolean=} opt_is_cbf Whether the palette is colourblind friendly.
     */
    self.addPalette = function(palette, opt_is_cbf) {
      var len = palette.length;
      if (len) {
        palettes[len] = palette;
        palettes_min = Math.min(palettes_min, len);
        palettes_max = Math.max(palettes_max, len);
        self.max = Math.max(self.max, len);
        if (!opt_is_cbf && len != 1) {
          self.cbf_max = Math.min(self.cbf_max, len - 1);
        }
      }
    };

    /**
     * Adds number of colour palettes to the colour scheme.
     *
     * @param {palette.PalettesList} palettes A map or an array of colour
     *     palettes to add.  If map, i.e.  object, is used, properties should
     *     use integer property names.
     * @param {number=} opt_max Size of the biggest palette in palettes set.
     *     If not set, palettes must have a length property which will be used.
     * @param {number=} opt_cbf_max Size of the biggest palette which is still
     *     colourblind friendly.  1 by default.
     */
    self.addPalettes = function(palettes, opt_max, opt_cbf_max) {
      opt_max = opt_max || palettes.length;
      for (var i = 0; i < opt_max; ++i) {
        if (i in palettes) {
          self.addPalette(palettes[i], true);
        }
      }
      self.cbf_max = Math.min(self.cbf_max, opt_cbf_max || 1);
    };

    /**
     * Enable shrinking palettes taking head of the list of colours.
     *
     * When user requests n-colour palette but the smallest palette added with
     * addPalette (or addPalettes) is m-colour one (where n < m), n colours
     * across the palette will be returned.  For example:
     *     var ex = palette.Scheme('ex');
     *     ex.addPalette(['000000', 'bcbcbc', 'ffffff']);
     *     var pal = ex(2);
     *     // pal == ['000000', 'ffffff']
     *
     * This works for palettes where the distance between colours is
     * correlated to distance in the palette array, which is true in gradients
     * such as the one above.
     *
     * To turn this feature off shrinkByTakingHead can be set to true either
     * for all palettes in the scheme (if opt_idx is not given) or for palette
     * with given number of colours only.  In general, setting the option for
     * given palette overwrites whatever has been set for the scheme.  The
     * default, as described above, is false.
     *
     * Alternatively, the feature can be enabled by setting shrinking_takes_head
     * property for the palette Array or the scheme object.
     *
     * For example, all of the below give equivalent results:
     *     var pal = ['ff0000', '00ff00', '0000ff'];
     *
     *     var ex = palette.Scheme('ex');
     *     ex.addPalette(pal);               // ex(2) == ['ff0000', '0000ff']
     *     ex.shrinkByTakingHead(true);      // ex(2) == ['ff0000', '00ff00']
     *
     *     ex = palette.Scheme('ex');
     *     ex.addPalette(pal);               // ex(2) == ['ff0000', '0000ff']
     *     ex.shrinkByTakingHead(true, 3);   // ex(2) == ['ff0000', '00ff00']
     *
     *     ex = palette.Scheme('ex');
     *     ex.addPalette(pal);
     *     ex.addPalette(pal);               // ex(2) == ['ff0000', '0000ff']
     *     pal.shrinking_takes_head = true;  // ex(2) == ['ff0000', '00ff00']
     *
     * @param {boolean} enabled Whether to enable or disable the “shrinking
     *     takes head” feature.  It is disabled by default.
     * @param {number=} opt_idx If given, the “shrinking takes head” option
     *     for palette with given number of colours is set.  If such palette
     *     does not exist, nothing happens.
     */
    self.shrinkByTakingHead = function(enabled, opt_idx) {
      if (opt_idx !== void(0)) {
        if (opt_idx in palettes) {
          palettes[opt_idx].shrinking_takes_head = !!enabled;
        }
      } else {
        self.shrinking_takes_head = !!enabled;
      }
    };

    /**
     * Sets a colour generation function of the colour scheme.
     *
     * The function must accept a singe number argument whose value can be from
     * 0.0 to 1.0, and return a colour as an 'RRGGBB' string.  This function
     * will be used when generating palettes, i.e. if 11-colour palette is
     * requested, this function will be called with arguments 0.0, 0.1, …, 1.0.
     *
     * If the palette generated by the function is colourblind friendly,
     * opt_is_cbf should be set to true.
     *
     * In some cases, it is not desirable to reach 1.0 when generating
     * a palette.  This happens for hue-rainbows where the 0–1 range corresponds
     * to a 0°–360° range in hues, and since hue at 0° is the same as at 360°,
     * it's desired to stop short the end of the range when generating
     * a palette.  To accomplish this, opt_cyclic should be set to true.
     *
     * @param {palette.ColorFunction} func A colour generator function.
     * @param {boolean=} opt_is_cbf Whether palette generate with the function
     *     is colour-blind friendly.
     * @param {boolean=} opt_cyclic Whether colour at 0.0 is the same as the
     *     one at 1.0.
     */
    self.setColorFunction = function(func, opt_is_cbf, opt_cyclic) {
      self.color_func = func;
      self.color_func_cyclic = !!opt_cyclic;
      self.max = INF;
      if (!opt_is_cbf && self.cbf_max === INF) {
        self.cbf_max = 1;
      }
    };

    self.color = function(x, varargs) {
      if (self.color_func) {
        return self.color_func.apply(this, arguments);
      } else {
        return null;
      }
    };

    return self;
  };


  /**
   * Creates a new palette.Scheme and initialises it by calling addPalettes
   * method with the rest of the arguments.
   *
   * @param {string} name Name of the scheme.
   * @param {string|!Array<string>} groups A group name or list of group
   *     names the scheme belongs to.
   * @param {!Object<number, palette.Palette>|!Array<palette.Palette>}
   *     palettes A map or an array of colour palettes to add.  If map, i.e.
   *     object, is used, properties should use integer property names.
   * @param {number=} opt_max Size of the biggest palette in palettes set.
   *     If not set, palettes must have a length property which will be used.
   * @param {number=} opt_cbf_max Size of the biggest palette which is still
   *     colourblind friendly.  1 by default.
   * @return {!palette.SchemeType} A colour palette generator function, which
   *     in addition has methods and properties like a regular object.  Think
   *     of it as a callable object.
   */
  palette.Scheme.fromPalettes = function(name, groups,
                                         palettes, opt_max, opt_cbf_max) {
    var scheme = palette.Scheme(name, groups);
    scheme.addPalettes.apply(scheme, slice(arguments, 2));
    return scheme;
  };


  /**
   * Creates a new palette.Scheme and initialises it by calling
   * setColorFunction method with the rest of the arguments.
   *
   * @param {string} name Name of the scheme.
   * @param {string|!Array<string>} groups A group name or list of group
   *     names the scheme belongs to.
   * @param {palette.ColorFunction} func A colour generator function.
   * @param {boolean=} opt_is_cbf Whether palette generate with the function
   *     is colour-blind friendly.
   * @param {boolean=} opt_cyclic Whether colour at 0.0 is the same as the
   *     one at 1.0.
   * @return {!palette.SchemeType} A colour palette generator function, which
   *     in addition has methods and properties like a regular object.  Think
   *     of it as a callable object.
   */
  palette.Scheme.withColorFunction = function(name, groups,
                                              func, opt_is_cbf, opt_cyclic) {
    var scheme = palette.Scheme(name, groups);
    scheme.setColorFunction.apply(scheme, slice(arguments, 2));
    return scheme;
  };


  /**
   * A map of registered schemes.  Maps a scheme or group name to a list of
   * scheme objects.  Property name is either 'n-<name>' for single scheme
   * names or 'g-<name>' for scheme group names.
   *
   * @type {!Object<string, !Array<!Object>>}
   */
  var registered_schemes = {};


  /**
   * Registers a new colour scheme.
   *
   * @param {!palette.SchemeType} scheme The scheme to add.
   */
  palette.register = function(scheme) {
    registered_schemes['n-' + scheme.scheme_name] = [scheme];
    scheme.groups.forEach(function(g) {
      (registered_schemes['g-' + g] =
       registered_schemes['g-' + g] || []).push(scheme);
    });
    (registered_schemes['g-all'] =
       registered_schemes['g-all'] || []).push(scheme);
  };


  /**
   * List all schemes that match given name and number of colours.
   *
   * name argument can be either a string or an array of strings.  In the
   * former case, the function acts as if the argument was an array with name
   * as a single argument (i.e. “palette.listSchemes('foo')” is exactly the same
   * as “palette.listSchemes(['foo'])”).
   *
   * Each name can be either name of a palette (e.g. 'tol-sq' for Paul Tol's
   * sequential palette), or a name of a group (e.g. 'sequential' for all
   * sequential palettes).  Name can therefore map to a single scheme or
   * several schemes.
   *
   * Furthermore, name can be suffixed with '-cbf' to indicate that only
   * schemes that are colourblind friendly should be returned.  For example,
   * 'rainbow' returns a HSV rainbow scheme, but because it is not colourblind
   * friendly, 'rainbow-cbf' returns no schemes.
   *
   * Some schemes may produce colourblind friendly palettes for some number of
   * colours.  For example ColorBrewer's Dark2 scheme is colourblind friendly
   * if no more than 3 colours are generated.  If opt_number is not specified,
   * 'qualitative-cbf' will include 'cb-Dark2' but if opt_number is given as,
   * say, 5 it won't.
   *
   * Name can also be 'all' which will return all registered schemes.
   * Naturally, 'all-cbf' will return all colourblind friendly schemes.
   *
   * Schemes are added to the library using palette.register.  Schemes are
   * created using palette.Scheme function.  By default, the following schemes
   * are available:
   *
   *     Name            Description
   *     --------------  -----------------------------------------------------
   *     tol             Paul Tol's qualitative scheme, cbf, max 12 colours.
   *     tol-dv          Paul Tol's diverging scheme, cbf.
   *     tol-sq          Paul Tol's sequential scheme, cbf.
   *     tol-rainbow     Paul Tol's qualitative scheme, cbf.
   *
   *     rainbow         A rainbow palette.
   *
   *     cb-YlGn         ColorBrewer sequential schemes.
   *     cb-YlGnBu
   *     cb-GnBu
   *     cb-BuGn
   *     cb-PuBuGn
   *     cb-PuBu
   *     cb-BuPu
   *     cb-RdPu
   *     cb-PuRd
   *     cb-OrRd
   *     cb-YlOrRd
   *     cb-YlOrBr
   *     cb-Purples
   *     cb-Blues
   *     cb-Greens
   *     cb-Oranges
   *     cb-Reds
   *     cb-Greys
   *
   *     cb-PuOr         ColorBrewer diverging schemes.
   *     cb-BrBG
   *     cb-PRGn
   *     cb-PiYG
   *     cb-RdBu
   *     cb-RdGy
   *     cb-RdYlBu
   *     cb-Spectral
   *     cb-RdYlGn
   *
   *     cb-Accent       ColorBrewer qualitative schemes.
   *     cb-Dark2
   *     cb-Paired
   *     cb-Pastel1
   *     cb-Pastel2
   *     cb-Set1
   *     cb-Set2
   *     cb-Set3
   *
   *     sol-base        Solarized base colours.
   *     sol-accent      Solarized accent colours.
   *
   * The following groups are also available by default:
   *
   *     Name            Description
   *     --------------  -----------------------------------------------------
   *     all             All registered schemes.
   *     sequential      All sequential schemes.
   *     diverging       All diverging schemes.
   *     qualitative     All qualitative schemes.
   *     cb-sequential   All ColorBrewer sequential schemes.
   *     cb-diverging    All ColorBrewer diverging schemes.
   *     cb-qualitative  All ColorBrewer qualitative schemes.
   *
   * You can read more about Paul Tol's palettes at http://www.sron.nl/~pault/.
   * You can read more about ColorBrewer at http://colorbrewer2.org.
   *
   * @param {string|!Array<string>} name A name of a colour scheme, of
   *     a group of colour schemes, or an array of any of those.
   * @param {number=} opt_number When requesting only colourblind friendly
   *     schemes, number of colours the scheme must provide generating such
   *     that the palette is still colourblind friendly.  2 by default.
   * @return {!Array<!palette.SchemeType>} An array of colour scheme objects
   *     matching the criteria.  Sorted by scheme name.
   */
  palette.listSchemes = function(name, opt_number) {
    if (!opt_number) {
      opt_number = 2;
    } else if (opt_number < 0) {
      opt_number = -opt_number;
    }

    var ret = [];
    (typeof name === 'string' ? [name] : name).forEach(function(n) {
      var cbf = n.substring(n.length - 4) === '-cbf';
      if (cbf) {
        n = n.substring(0, n.length - 4);
      }
      var schemes =
          registered_schemes['g-' + n] ||
          registered_schemes['n-' + n] ||
          [];
      for (var i = 0, scheme; (scheme = schemes[i]); ++i) {
        if ((cbf ? scheme.cbf : scheme.max) >= opt_number) {
          ret.push(scheme);
        }
      }
    });

    ret.sort(function(a, b) {
      return a.scheme_name >= b.scheme_name ?
        a.scheme_name > b.scheme_name ? 1 : 0 : -1;
    });
    return ret;
  };


  /**
   * Generates a palette using given colour generating function.
   *
   * The color_func callback must accept a singe number argument whose value
   * can vary from 0.0 to 1.0 (or in general from opt_start to opt_end), and
   * return a colour as an 'RRGGBB' string.  This function will be used when
   * generating palettes, i.e. if 11-colour palette is requested, this
   * function will be called with arguments 0.0, 0.1, …, 1.0.
   *
   * In some cases, it is not desirable to reach 1.0 when generating
   * a palette.  This happens for hue-rainbows where the 0–1 range corresponds
   * to a 0°–360° range in hues, and since hue at 0° is the same as at 360°,
   * it's desired to stop short the end of the range when generating
   * a palette.  To accomplish this, opt_cyclic should be set to true.
   *
   * opt_start and opt_end may be used to change the range the colour
   * generation function is called with.  opt_end may be less than opt_start
   * which will case to traverse the range in reverse.  Another way to reverse
   * the palette is requesting negative number of colours.  The two methods do
   * not always lead to the same results (especially if opt_cyclic is set).
   *
   * @param {palette.ColorFunction} color_func A colours generating callback
   *     function.
   * @param {number} number Number of colours to generate in the palette.  If
   *     number is negative, colours in the palette will be reversed.  If only
   *     one colour is requested, colour at opt_start will be returned.
   * @param {number=} opt_start Optional starting point for the palette
   *     generation function.  Zero by default.
   * @param {number=} opt_end Optional ending point for the palette generation
   *     function.  One by default.
   * @param {boolean=} opt_cyclic If true, function will assume colour at
   *     point opt_start is the same as one at opt_end.
   * @return {palette.Palette} An array of 'RRGGBB' colours.
   */
  palette.generate = function(color_func, number, opt_start, opt_end,
                              opt_cyclic) {
    if (Math.abs(number) < 1) {
      return [];
    }

    opt_start = opt_start === void(0) ? 0 : opt_start;
    opt_end = opt_end === void(0) ? 1 : opt_end;

    if (Math.abs(number) < 2) {
      return [color_func(opt_start)];
    }

    var i = Math.abs(number);
    var x = opt_start;
    var ret = [];
    var step = (opt_end - opt_start) / (opt_cyclic ? i : (i - 1));

    for (; --i >= 0; x += step) {
      ret.push(color_func(x));
    }
    if (number < 0) {
      ret.reverse();
    }
    return ret;
  };


  /**
   * Clamps value to [0, 1] range.
   * @param {number} v Number to limit value of.
   * @return {number} If v is inside of [0, 1] range returns v, otherwise
   *     returns 0 or 1 depending which side of the range v is closer to.
   */
  var clamp = function(v) {
    return v > 0 ? (v < 1 ? v : 1) : 0;
  };

  /**
   * Converts r, g, b triple into RRGGBB hex representation.
   * @param {number} r Red value of the colour in the range [0, 1].
   * @param {number} g Green value of the colour in the range [0, 1].
   * @param {number} b Blue value of the colour in the range [0, 1].
   * @return {string} A lower-case RRGGBB representation of the colour.
   */
  palette.rgbColor = function(r, g, b) {
    return [r, g, b].map(function(v) {
      v = Number(Math.round(clamp(v) * 255)).toString(16);
      return v.length == 1 ? '0' + v : v;
    }).join('');
  };

  /**
   * Converts a linear r, g, b triple into RRGGBB hex representation.
   * @param {number} r Linear red value of the colour in the range [0, 1].
   * @param {number} g Linear green value of the colour in the range [0, 1].
   * @param {number} b Linear blue value of the colour in the range [0, 1].
   * @return {string} A lower-case RRGGBB representation of the colour.
   */
  palette.linearRgbColor = function(r, g, b) {
    // http://www.brucelindbloom.com/index.html?Eqn_XYZ_to_RGB.html
    return [r, g, b].map(function(v) {
      v = clamp(v);
      if (v <= 0.0031308) {
        v = 12.92 * v;
      } else {
        v = 1.055 * Math.pow(v, 1 / 2.4) - 0.055;
      }
      v = Number(Math.round(v * 255)).toString(16);
      return v.length == 1 ? '0' + v : v;
    }).join('');
  };

  /**
   * Converts an HSV colours to RRGGBB hex representation.
   * @param {number} h Hue in the range [0, 1].
   * @param {number=} opt_s Saturation in the range [0, 1].  One by default.
   * @param {number=} opt_v Value in the range [0, 1].  One by default.
   * @return {string} An RRGGBB representation of the colour.
   */
  palette.hsvColor = function(h, opt_s, opt_v) {
    h *= 6;
    var s = opt_s === void(0) ? 1 : clamp(opt_s);
    var v = opt_v === void(0) ? 1 : clamp(opt_v);
    var x = v * (1 - s * Math.abs(h % 2 - 1));
    var m = v * (1 - s);
    switch (Math.floor(h) % 6) {
    case 0: return palette.rgbColor(v, x, m);
    case 1: return palette.rgbColor(x, v, m);
    case 2: return palette.rgbColor(m, v, x);
    case 3: return palette.rgbColor(m, x, v);
    case 4: return palette.rgbColor(x, m, v);
    default: return palette.rgbColor(v, m, x);
    }
  };

  palette.register(palette.Scheme.withColorFunction(
    'rainbow', 'qualitative', palette.hsvColor, false, true));

  return palette;
})();


/** @typedef {function(number): string} */
palette.ColorFunction;

/** @typedef {!Array<string>} */
palette.Palette;

/** @typedef {!Object<number, palette.Palette>|!Array<palette.Palette>} */
palette.PalettesList;

/**
 * @typedef {
 *   function(number, ...?): Array<string>|
 *   {
 *     scheme_name: string,
 *     groups: !Array<string>,
 *     max: number,
 *     cbf_max: number,
 *     addPalette: function(!Array<string>, boolean=),
 *     addPalettes: function(palette.PalettesList, number=, number=),
 *     shrinkByTakingHead: function(boolean, number=),
 *     setColorFunction: function(palette.ColorFunction, boolean=, boolean=),
 *     color: function(number, ...?): ?string}}
 */
palette.SchemeType;


/* mpn65 palette start here. ************************************************/

/* The ‘mpn65’ palette is designed for systems which show many graphs which
   don’t have custom colour palettes chosen by humans or if number of necessary
   colours isn’t know a priori. */

(function() {
  var scheme = palette.Scheme.fromPalettes('mpn65', 'qualitative', [[
    'ff0029', '377eb8', '66a61e', '984ea3', '00d2d5', 'ff7f00', 'af8d00',
    '7f80cd', 'b3e900', 'c42e60', 'a65628', 'f781bf', '8dd3c7', 'bebada',
    'fb8072', '80b1d3', 'fdb462', 'fccde5', 'bc80bd', 'ffed6f', 'c4eaff',
    'cf8c00', '1b9e77', 'd95f02', 'e7298a', 'e6ab02', 'a6761d', '0097ff',
    '00d067', '000000', '252525', '525252', '737373', '969696', 'bdbdbd',
    'f43600', '4ba93b', '5779bb', '927acc', '97ee3f', 'bf3947', '9f5b00',
    'f48758', '8caed6', 'f2b94f', 'eff26e', 'e43872', 'd9b100', '9d7a00',
    '698cff', 'd9d9d9', '00d27e', 'd06800', '009f82', 'c49200', 'cbe8ff',
    'fecddf', 'c27eb6', '8cd2ce', 'c4b8d9', 'f883b0', 'a49100', 'f48800',
    '27d0df', 'a04a9b'
  ]]);
  scheme.shrinkByTakingHead(true);
  palette.register(scheme);
})();

/* Paul Tol's schemes start here. *******************************************/
/* See http://www.sron.nl/~pault/ */

(function() {
  var rgb = palette.rgbColor;

  /**
   * Calculates value of a polynomial at given point.
   * For example, poly(x, 1, 2, 3) calculates value of “1 + 2*x + 3*X²”.
   * @param {number} x Value to calculate polynomial for.
   * @param {...number} varargs Coefficients of the polynomial specified in
   *     the order of rising powers of x including constant as the first
   *     variable argument.
   */
  var poly = function(x, varargs) {
    var i = arguments.length - 1, n = arguments[i];
    while (i > 1) {
      n = n * x + arguments[--i];
    }
    return n;
  };

  /**
   * Calculate approximate value of error function with maximum error of 0.0005.
   * See <https://en.wikipedia.org/wiki/Error_function>.
   * @param {number} x Argument of the error function.
   * @return {number} Value of error function for x.
   */
  var erf = function(x) {
    // https://en.wikipedia.org/wiki/Error_function#Approximation_with_elementary_functions
    // This produces a maximum error of 0.0005 which is more then we need.  In
    // the worst case, that error is multiplied by four and then divided by two
    // before being multiplied by 255, so in the end, the error is multiplied by
    // 510 which produces 0.255 which is less than a single colour step.
    var y = poly(Math.abs(x), 1, 0.278393, 0.230389, 0.000972, 0.078108);
    y *= y; // y^2
    y *= y; // y^4
    y = 1 - 1 / y;
    return x < 0 ? -y : y;
  };

  palette.register(palette.Scheme.fromPalettes('tol', 'qualitative', [
    ['4477aa'],
    ['4477aa', 'cc6677'],
    ['4477aa', 'ddcc77', 'cc6677'],
    ['4477aa', '117733', 'ddcc77', 'cc6677'],
    ['332288', '88ccee', '117733', 'ddcc77', 'cc6677'],
    ['332288', '88ccee', '117733', 'ddcc77', 'cc6677', 'aa4499'],
    ['332288', '88ccee', '44aa99', '117733', 'ddcc77', 'cc6677', 'aa4499'],
    ['332288', '88ccee', '44aa99', '117733', '999933', 'ddcc77', 'cc6677',
     'aa4499'],
    ['332288', '88ccee', '44aa99', '117733', '999933', 'ddcc77', 'cc6677',
     '882255', 'aa4499'],
    ['332288', '88ccee', '44aa99', '117733', '999933', 'ddcc77', '661100',
     'cc6677', '882255', 'aa4499'],
    ['332288', '6699cc', '88ccee', '44aa99', '117733', '999933', 'ddcc77',
     '661100', 'cc6677', '882255', 'aa4499'],
    ['332288', '6699cc', '88ccee', '44aa99', '117733', '999933', 'ddcc77',
     '661100', 'cc6677', 'aa4466', '882255', 'aa4499']
  ], 12, 12));

  /**
   * Calculates a colour along Paul Tol's sequential colours axis.
   * See <http://www.sron.nl/~pault/colourschemes.pdf> figure 7 and equation 1.
   * @param {number} x Position of the colour on the axis in the [0, 1] range.
   * @return {string} An RRGGBB representation of the colour.
   */
  palette.tolSequentialColor = function(x) {
    return rgb(1 - 0.392 * (1 + erf((x - 0.869) / 0.255)),
               1.021 - 0.456 * (1 + erf((x - 0.527) / 0.376)),
               1 - 0.493 * (1 + erf((x - 0.272) / 0.309)));
  };

  palette.register(palette.Scheme.withColorFunction(
    'tol-sq', 'sequential', palette.tolSequentialColor, true));

  /**
   * Calculates a colour along Paul Tol's diverging colours axis.
   * See <http://www.sron.nl/~pault/colourschemes.pdf> figure 8 and equation 2.
   * @param {number} x Position of the colour on the axis in the [0, 1] range.
   * @return {string} An RRGGBB representation of the colour.
   */
  palette.tolDivergingColor = function(x) {
    var g = poly(x, 0.572, 1.524, -1.811) / poly(x, 1, -0.291, 0.1574);
    return rgb(poly(x, 0.235, -2.13, 26.92, -65.5, 63.5, -22.36),
               g * g,
               1 / poly(x, 1.579, -4.03, 12.92, -31.4, 48.6, -23.36));
  };

  palette.register(palette.Scheme.withColorFunction(
    'tol-dv', 'diverging', palette.tolDivergingColor, true));

  /**
   * Calculates a colour along Paul Tol's rainbow colours axis.
   * See <http://www.sron.nl/~pault/colourschemes.pdf> figure 13 and equation 3.
   * @param {number} x Position of the colour on the axis in the [0, 1] range.
   * @return {string} An RRGGBB representation of the colour.
   */
  palette.tolRainbowColor = function(x) {
    return rgb(poly(x, 0.472, -0.567, 4.05) / poly(x, 1, 8.72, -19.17, 14.1),
               poly(x, 0.108932, -1.22635, 27.284, -98.577, 163.3, -131.395,
                    40.634),
               1 / poly(x, 1.97, 3.54, -68.5, 243, -297, 125));
  };

  palette.register(palette.Scheme.withColorFunction(
    'tol-rainbow', 'qualitative', palette.tolRainbowColor, true));
})();


/* Solarized colour schemes start here. *************************************/
/* See http://ethanschoonover.com/solarized */

(function() {
  /*
   * Those are not really designed to be used in graphs, but we're keeping
   * them here in case someone cares.
   */
  palette.register(palette.Scheme.fromPalettes('sol-base', 'sequential', [
    ['002b36', '073642', '586e75', '657b83', '839496', '93a1a1', 'eee8d5',
     'fdf6e3']
  ], 1, 8));
  palette.register(palette.Scheme.fromPalettes('sol-accent', 'qualitative', [
    ['b58900', 'cb4b16', 'dc322f', 'd33682', '6c71c4', '268bd2', '2aa198',
     '859900']
  ]));
})();


/* ColorBrewer colour schemes start here. ***********************************/
/* See http://colorbrewer2.org/ */

(function() {
  var schemes = {
    YlGn: {
      type: 'sequential',
      cbf: 42,
      3: ['f7fcb9', 'addd8e', '31a354'],
      4: ['ffffcc', 'c2e699', '78c679', '238443'],
      5: ['ffffcc', 'c2e699', '78c679', '31a354', '006837'],
      6: ['ffffcc', 'd9f0a3', 'addd8e', '78c679', '31a354', '006837'],
      7: ['ffffcc', 'd9f0a3', 'addd8e', '78c679', '41ab5d', '238443',
          '005a32'],
      8: ['ffffe5', 'f7fcb9', 'd9f0a3', 'addd8e', '78c679', '41ab5d',
          '238443', '005a32'],
      9: ['ffffe5', 'f7fcb9', 'd9f0a3', 'addd8e', '78c679', '41ab5d',
          '238443', '006837', '004529']
    },
    YlGnBu: {
      type: 'sequential',
      cbf: 42,
      3: ['edf8b1', '7fcdbb', '2c7fb8'],
      4: ['ffffcc', 'a1dab4', '41b6c4', '225ea8'],
      5: ['ffffcc', 'a1dab4', '41b6c4', '2c7fb8', '253494'],
      6: ['ffffcc', 'c7e9b4', '7fcdbb', '41b6c4', '2c7fb8', '253494'],
      7: ['ffffcc', 'c7e9b4', '7fcdbb', '41b6c4', '1d91c0', '225ea8',
          '0c2c84'],
      8: ['ffffd9', 'edf8b1', 'c7e9b4', '7fcdbb', '41b6c4', '1d91c0',
          '225ea8', '0c2c84'],
      9: ['ffffd9', 'edf8b1', 'c7e9b4', '7fcdbb', '41b6c4', '1d91c0',
          '225ea8', '253494', '081d58']
    },
    GnBu: {
      type: 'sequential',
      cbf: 42,
      3: ['e0f3db', 'a8ddb5', '43a2ca'],
      4: ['f0f9e8', 'bae4bc', '7bccc4', '2b8cbe'],
      5: ['f0f9e8', 'bae4bc', '7bccc4', '43a2ca', '0868ac'],
      6: ['f0f9e8', 'ccebc5', 'a8ddb5', '7bccc4', '43a2ca', '0868ac'],
      7: ['f0f9e8', 'ccebc5', 'a8ddb5', '7bccc4', '4eb3d3', '2b8cbe',
          '08589e'],
      8: ['f7fcf0', 'e0f3db', 'ccebc5', 'a8ddb5', '7bccc4', '4eb3d3',
          '2b8cbe', '08589e'],
      9: ['f7fcf0', 'e0f3db', 'ccebc5', 'a8ddb5', '7bccc4', '4eb3d3',
          '2b8cbe', '0868ac', '084081']
    },
    BuGn: {
      type: 'sequential',
      cbf: 42,
      3: ['e5f5f9', '99d8c9', '2ca25f'],
      4: ['edf8fb', 'b2e2e2', '66c2a4', '238b45'],
      5: ['edf8fb', 'b2e2e2', '66c2a4', '2ca25f', '006d2c'],
      6: ['edf8fb', 'ccece6', '99d8c9', '66c2a4', '2ca25f', '006d2c'],
      7: ['edf8fb', 'ccece6', '99d8c9', '66c2a4', '41ae76', '238b45',
          '005824'],
      8: ['f7fcfd', 'e5f5f9', 'ccece6', '99d8c9', '66c2a4', '41ae76',
          '238b45', '005824'],
      9: ['f7fcfd', 'e5f5f9', 'ccece6', '99d8c9', '66c2a4', '41ae76',
          '238b45', '006d2c', '00441b']
    },
    PuBuGn: {
      type: 'sequential',
      cbf: 42,
      3: ['ece2f0', 'a6bddb', '1c9099'],
      4: ['f6eff7', 'bdc9e1', '67a9cf', '02818a'],
      5: ['f6eff7', 'bdc9e1', '67a9cf', '1c9099', '016c59'],
      6: ['f6eff7', 'd0d1e6', 'a6bddb', '67a9cf', '1c9099', '016c59'],
      7: ['f6eff7', 'd0d1e6', 'a6bddb', '67a9cf', '3690c0', '02818a',
          '016450'],
      8: ['fff7fb', 'ece2f0', 'd0d1e6', 'a6bddb', '67a9cf', '3690c0',
          '02818a', '016450'],
      9: ['fff7fb', 'ece2f0', 'd0d1e6', 'a6bddb', '67a9cf', '3690c0',
          '02818a', '016c59', '014636']
    },
    PuBu: {
      type: 'sequential',
      cbf: 42,
      3: ['ece7f2', 'a6bddb', '2b8cbe'],
      4: ['f1eef6', 'bdc9e1', '74a9cf', '0570b0'],
      5: ['f1eef6', 'bdc9e1', '74a9cf', '2b8cbe', '045a8d'],
      6: ['f1eef6', 'd0d1e6', 'a6bddb', '74a9cf', '2b8cbe', '045a8d'],
      7: ['f1eef6', 'd0d1e6', 'a6bddb', '74a9cf', '3690c0', '0570b0',
          '034e7b'],
      8: ['fff7fb', 'ece7f2', 'd0d1e6', 'a6bddb', '74a9cf', '3690c0',
          '0570b0', '034e7b'],
      9: ['fff7fb', 'ece7f2', 'd0d1e6', 'a6bddb', '74a9cf', '3690c0',
          '0570b0', '045a8d', '023858']
    },
    BuPu: {
      type: 'sequential',
      cbf: 42,
      3: ['e0ecf4', '9ebcda', '8856a7'],
      4: ['edf8fb', 'b3cde3', '8c96c6', '88419d'],
      5: ['edf8fb', 'b3cde3', '8c96c6', '8856a7', '810f7c'],
      6: ['edf8fb', 'bfd3e6', '9ebcda', '8c96c6', '8856a7', '810f7c'],
      7: ['edf8fb', 'bfd3e6', '9ebcda', '8c96c6', '8c6bb1', '88419d',
          '6e016b'],
      8: ['f7fcfd', 'e0ecf4', 'bfd3e6', '9ebcda', '8c96c6', '8c6bb1',
          '88419d', '6e016b'],
      9: ['f7fcfd', 'e0ecf4', 'bfd3e6', '9ebcda', '8c96c6', '8c6bb1',
          '88419d', '810f7c', '4d004b']
    },
    RdPu: {
      type: 'sequential',
      cbf: 42,
      3: ['fde0dd', 'fa9fb5', 'c51b8a'],
      4: ['feebe2', 'fbb4b9', 'f768a1', 'ae017e'],
      5: ['feebe2', 'fbb4b9', 'f768a1', 'c51b8a', '7a0177'],
      6: ['feebe2', 'fcc5c0', 'fa9fb5', 'f768a1', 'c51b8a', '7a0177'],
      7: ['feebe2', 'fcc5c0', 'fa9fb5', 'f768a1', 'dd3497', 'ae017e',
          '7a0177'],
      8: ['fff7f3', 'fde0dd', 'fcc5c0', 'fa9fb5', 'f768a1', 'dd3497',
          'ae017e', '7a0177'],
      9: ['fff7f3', 'fde0dd', 'fcc5c0', 'fa9fb5', 'f768a1', 'dd3497',
          'ae017e', '7a0177', '49006a']
    },
    PuRd: {
      type: 'sequential',
      cbf: 42,
      3: ['e7e1ef', 'c994c7', 'dd1c77'],
      4: ['f1eef6', 'd7b5d8', 'df65b0', 'ce1256'],
      5: ['f1eef6', 'd7b5d8', 'df65b0', 'dd1c77', '980043'],
      6: ['f1eef6', 'd4b9da', 'c994c7', 'df65b0', 'dd1c77', '980043'],
      7: ['f1eef6', 'd4b9da', 'c994c7', 'df65b0', 'e7298a', 'ce1256',
          '91003f'],
      8: ['f7f4f9', 'e7e1ef', 'd4b9da', 'c994c7', 'df65b0', 'e7298a',
          'ce1256', '91003f'],
      9: ['f7f4f9', 'e7e1ef', 'd4b9da', 'c994c7', 'df65b0', 'e7298a',
          'ce1256', '980043', '67001f']
    },
    OrRd: {
      type: 'sequential',
      cbf: 42,
      3: ['fee8c8', 'fdbb84', 'e34a33'],
      4: ['fef0d9', 'fdcc8a', 'fc8d59', 'd7301f'],
      5: ['fef0d9', 'fdcc8a', 'fc8d59', 'e34a33', 'b30000'],
      6: ['fef0d9', 'fdd49e', 'fdbb84', 'fc8d59', 'e34a33', 'b30000'],
      7: ['fef0d9', 'fdd49e', 'fdbb84', 'fc8d59', 'ef6548', 'd7301f',
          '990000'],
      8: ['fff7ec', 'fee8c8', 'fdd49e', 'fdbb84', 'fc8d59', 'ef6548',
          'd7301f', '990000'],
      9: ['fff7ec', 'fee8c8', 'fdd49e', 'fdbb84', 'fc8d59', 'ef6548',
          'd7301f', 'b30000', '7f0000']
    },
    YlOrRd: {
      type: 'sequential',
      cbf: 42,
      3: ['ffeda0', 'feb24c', 'f03b20'],
      4: ['ffffb2', 'fecc5c', 'fd8d3c', 'e31a1c'],
      5: ['ffffb2', 'fecc5c', 'fd8d3c', 'f03b20', 'bd0026'],
      6: ['ffffb2', 'fed976', 'feb24c', 'fd8d3c', 'f03b20', 'bd0026'],
      7: ['ffffb2', 'fed976', 'feb24c', 'fd8d3c', 'fc4e2a', 'e31a1c',
          'b10026'],
      8: ['ffffcc', 'ffeda0', 'fed976', 'feb24c', 'fd8d3c', 'fc4e2a',
          'e31a1c', 'b10026'],
      9: ['ffffcc', 'ffeda0', 'fed976', 'feb24c', 'fd8d3c', 'fc4e2a',
          'e31a1c', 'bd0026', '800026']
    },
    YlOrBr: {
      type: 'sequential',
      cbf: 42,
      3: ['fff7bc', 'fec44f', 'd95f0e'],
      4: ['ffffd4', 'fed98e', 'fe9929', 'cc4c02'],
      5: ['ffffd4', 'fed98e', 'fe9929', 'd95f0e', '993404'],
      6: ['ffffd4', 'fee391', 'fec44f', 'fe9929', 'd95f0e', '993404'],
      7: ['ffffd4', 'fee391', 'fec44f', 'fe9929', 'ec7014', 'cc4c02',
          '8c2d04'],
      8: ['ffffe5', 'fff7bc', 'fee391', 'fec44f', 'fe9929', 'ec7014',
          'cc4c02', '8c2d04'],
      9: ['ffffe5', 'fff7bc', 'fee391', 'fec44f', 'fe9929', 'ec7014',
          'cc4c02', '993404', '662506']
    },
    Purples: {
      type: 'sequential',
      cbf: 42,
      3: ['efedf5', 'bcbddc', '756bb1'],
      4: ['f2f0f7', 'cbc9e2', '9e9ac8', '6a51a3'],
      5: ['f2f0f7', 'cbc9e2', '9e9ac8', '756bb1', '54278f'],
      6: ['f2f0f7', 'dadaeb', 'bcbddc', '9e9ac8', '756bb1', '54278f'],
      7: ['f2f0f7', 'dadaeb', 'bcbddc', '9e9ac8', '807dba', '6a51a3',
          '4a1486'],
      8: ['fcfbfd', 'efedf5', 'dadaeb', 'bcbddc', '9e9ac8', '807dba',
          '6a51a3', '4a1486'],
      9: ['fcfbfd', 'efedf5', 'dadaeb', 'bcbddc', '9e9ac8', '807dba',
          '6a51a3', '54278f', '3f007d']
    },
    Blues: {
      type: 'sequential',
      cbf: 42,
      3: ['deebf7', '9ecae1', '3182bd'],
      4: ['eff3ff', 'bdd7e7', '6baed6', '2171b5'],
      5: ['eff3ff', 'bdd7e7', '6baed6', '3182bd', '08519c'],
      6: ['eff3ff', 'c6dbef', '9ecae1', '6baed6', '3182bd', '08519c'],
      7: ['eff3ff', 'c6dbef', '9ecae1', '6baed6', '4292c6', '2171b5',
          '084594'],
      8: ['f7fbff', 'deebf7', 'c6dbef', '9ecae1', '6baed6', '4292c6',
          '2171b5', '084594'],
      9: ['f7fbff', 'deebf7', 'c6dbef', '9ecae1', '6baed6', '4292c6',
          '2171b5', '08519c', '08306b']
    },
    Greens: {
      type: 'sequential',
      cbf: 42,
      3: ['e5f5e0', 'a1d99b', '31a354'],
      4: ['edf8e9', 'bae4b3', '74c476', '238b45'],
      5: ['edf8e9', 'bae4b3', '74c476', '31a354', '006d2c'],
      6: ['edf8e9', 'c7e9c0', 'a1d99b', '74c476', '31a354', '006d2c'],
      7: ['edf8e9', 'c7e9c0', 'a1d99b', '74c476', '41ab5d', '238b45',
          '005a32'],
      8: ['f7fcf5', 'e5f5e0', 'c7e9c0', 'a1d99b', '74c476', '41ab5d',
          '238b45', '005a32'],
      9: ['f7fcf5', 'e5f5e0', 'c7e9c0', 'a1d99b', '74c476', '41ab5d',
          '238b45', '006d2c', '00441b']
    },
    Oranges: {
      type: 'sequential',
      cbf: 42,
      3: ['fee6ce', 'fdae6b', 'e6550d'],
      4: ['feedde', 'fdbe85', 'fd8d3c', 'd94701'],
      5: ['feedde', 'fdbe85', 'fd8d3c', 'e6550d', 'a63603'],
      6: ['feedde', 'fdd0a2', 'fdae6b', 'fd8d3c', 'e6550d', 'a63603'],
      7: ['feedde', 'fdd0a2', 'fdae6b', 'fd8d3c', 'f16913', 'd94801',
          '8c2d04'],
      8: ['fff5eb', 'fee6ce', 'fdd0a2', 'fdae6b', 'fd8d3c', 'f16913',
          'd94801', '8c2d04'],
      9: ['fff5eb', 'fee6ce', 'fdd0a2', 'fdae6b', 'fd8d3c', 'f16913',
          'd94801', 'a63603', '7f2704']
    },
    Reds: {
      type: 'sequential',
      cbf: 42,
      3: ['fee0d2', 'fc9272', 'de2d26'],
      4: ['fee5d9', 'fcae91', 'fb6a4a', 'cb181d'],
      5: ['fee5d9', 'fcae91', 'fb6a4a', 'de2d26', 'a50f15'],
      6: ['fee5d9', 'fcbba1', 'fc9272', 'fb6a4a', 'de2d26', 'a50f15'],
      7: ['fee5d9', 'fcbba1', 'fc9272', 'fb6a4a', 'ef3b2c', 'cb181d',
          '99000d'],
      8: ['fff5f0', 'fee0d2', 'fcbba1', 'fc9272', 'fb6a4a', 'ef3b2c',
          'cb181d', '99000d'],
      9: ['fff5f0', 'fee0d2', 'fcbba1', 'fc9272', 'fb6a4a', 'ef3b2c',
          'cb181d', 'a50f15', '67000d']
    },
    Greys: {
      type: 'sequential',
      cbf: 42,
      3: ['f0f0f0', 'bdbdbd', '636363'],
      4: ['f7f7f7', 'cccccc', '969696', '525252'],
      5: ['f7f7f7', 'cccccc', '969696', '636363', '252525'],
      6: ['f7f7f7', 'd9d9d9', 'bdbdbd', '969696', '636363', '252525'],
      7: ['f7f7f7', 'd9d9d9', 'bdbdbd', '969696', '737373', '525252',
          '252525'],
      8: ['ffffff', 'f0f0f0', 'd9d9d9', 'bdbdbd', '969696', '737373',
          '525252', '252525'],
      9: ['ffffff', 'f0f0f0', 'd9d9d9', 'bdbdbd', '969696', '737373',
          '525252', '252525', '000000']
    },
    PuOr: {
      type: 'diverging',
      cbf: 42,
      3: ['f1a340', 'f7f7f7', '998ec3'],
      4: ['e66101', 'fdb863', 'b2abd2', '5e3c99'],
      5: ['e66101', 'fdb863', 'f7f7f7', 'b2abd2', '5e3c99'],
      6: ['b35806', 'f1a340', 'fee0b6', 'd8daeb', '998ec3', '542788'],
      7: ['b35806', 'f1a340', 'fee0b6', 'f7f7f7', 'd8daeb', '998ec3',
          '542788'],
      8: ['b35806', 'e08214', 'fdb863', 'fee0b6', 'd8daeb', 'b2abd2',
          '8073ac', '542788'],
      9: ['b35806', 'e08214', 'fdb863', 'fee0b6', 'f7f7f7', 'd8daeb',
          'b2abd2', '8073ac', '542788'],
      10: ['7f3b08', 'b35806', 'e08214', 'fdb863', 'fee0b6', 'd8daeb',
           'b2abd2', '8073ac', '542788', '2d004b'],
      11: ['7f3b08', 'b35806', 'e08214', 'fdb863', 'fee0b6', 'f7f7f7',
           'd8daeb', 'b2abd2', '8073ac', '542788', '2d004b']
    },
    BrBG: {
      type: 'diverging',
      cbf: 42,
      3: ['d8b365', 'f5f5f5', '5ab4ac'],
      4: ['a6611a', 'dfc27d', '80cdc1', '018571'],
      5: ['a6611a', 'dfc27d', 'f5f5f5', '80cdc1', '018571'],
      6: ['8c510a', 'd8b365', 'f6e8c3', 'c7eae5', '5ab4ac', '01665e'],
      7: ['8c510a', 'd8b365', 'f6e8c3', 'f5f5f5', 'c7eae5', '5ab4ac',
          '01665e'],
      8: ['8c510a', 'bf812d', 'dfc27d', 'f6e8c3', 'c7eae5', '80cdc1',
          '35978f', '01665e'],
      9: ['8c510a', 'bf812d', 'dfc27d', 'f6e8c3', 'f5f5f5', 'c7eae5',
          '80cdc1', '35978f', '01665e'],
      10: ['543005', '8c510a', 'bf812d', 'dfc27d', 'f6e8c3', 'c7eae5',
           '80cdc1', '35978f', '01665e', '003c30'],
      11: ['543005', '8c510a', 'bf812d', 'dfc27d', 'f6e8c3', 'f5f5f5',
           'c7eae5', '80cdc1', '35978f', '01665e', '003c30']
    },
    PRGn: {
      type: 'diverging',
      cbf: 42,
      3: ['af8dc3', 'f7f7f7', '7fbf7b'],
      4: ['7b3294', 'c2a5cf', 'a6dba0', '008837'],
      5: ['7b3294', 'c2a5cf', 'f7f7f7', 'a6dba0', '008837'],
      6: ['762a83', 'af8dc3', 'e7d4e8', 'd9f0d3', '7fbf7b', '1b7837'],
      7: ['762a83', 'af8dc3', 'e7d4e8', 'f7f7f7', 'd9f0d3', '7fbf7b',
          '1b7837'],
      8: ['762a83', '9970ab', 'c2a5cf', 'e7d4e8', 'd9f0d3', 'a6dba0',
          '5aae61', '1b7837'],
      9: ['762a83', '9970ab', 'c2a5cf', 'e7d4e8', 'f7f7f7', 'd9f0d3',
          'a6dba0', '5aae61', '1b7837'],
      10: ['40004b', '762a83', '9970ab', 'c2a5cf', 'e7d4e8', 'd9f0d3',
           'a6dba0', '5aae61', '1b7837', '00441b'],
      11: ['40004b', '762a83', '9970ab', 'c2a5cf', 'e7d4e8', 'f7f7f7',
           'd9f0d3', 'a6dba0', '5aae61', '1b7837', '00441b']
    },
    PiYG: {
      type: 'diverging',
      cbf: 42,
      3: ['e9a3c9', 'f7f7f7', 'a1d76a'],
      4: ['d01c8b', 'f1b6da', 'b8e186', '4dac26'],
      5: ['d01c8b', 'f1b6da', 'f7f7f7', 'b8e186', '4dac26'],
      6: ['c51b7d', 'e9a3c9', 'fde0ef', 'e6f5d0', 'a1d76a', '4d9221'],
      7: ['c51b7d', 'e9a3c9', 'fde0ef', 'f7f7f7', 'e6f5d0', 'a1d76a',
          '4d9221'],
      8: ['c51b7d', 'de77ae', 'f1b6da', 'fde0ef', 'e6f5d0', 'b8e186',
          '7fbc41', '4d9221'],
      9: ['c51b7d', 'de77ae', 'f1b6da', 'fde0ef', 'f7f7f7', 'e6f5d0',
          'b8e186', '7fbc41', '4d9221'],
      10: ['8e0152', 'c51b7d', 'de77ae', 'f1b6da', 'fde0ef', 'e6f5d0',
           'b8e186', '7fbc41', '4d9221', '276419'],
      11: ['8e0152', 'c51b7d', 'de77ae', 'f1b6da', 'fde0ef', 'f7f7f7',
           'e6f5d0', 'b8e186', '7fbc41', '4d9221', '276419']
    },
    RdBu: {
      type: 'diverging',
      cbf: 42,
      3: ['ef8a62', 'f7f7f7', '67a9cf'],
      4: ['ca0020', 'f4a582', '92c5de', '0571b0'],
      5: ['ca0020', 'f4a582', 'f7f7f7', '92c5de', '0571b0'],
      6: ['b2182b', 'ef8a62', 'fddbc7', 'd1e5f0', '67a9cf', '2166ac'],
      7: ['b2182b', 'ef8a62', 'fddbc7', 'f7f7f7', 'd1e5f0', '67a9cf',
          '2166ac'],
      8: ['b2182b', 'd6604d', 'f4a582', 'fddbc7', 'd1e5f0', '92c5de',
          '4393c3', '2166ac'],
      9: ['b2182b', 'd6604d', 'f4a582', 'fddbc7', 'f7f7f7', 'd1e5f0',
          '92c5de', '4393c3', '2166ac'],
      10: ['67001f', 'b2182b', 'd6604d', 'f4a582', 'fddbc7', 'd1e5f0',
           '92c5de', '4393c3', '2166ac', '053061'],
      11: ['67001f', 'b2182b', 'd6604d', 'f4a582', 'fddbc7', 'f7f7f7',
           'd1e5f0', '92c5de', '4393c3', '2166ac', '053061']
    },
    RdGy: {
      type: 'diverging',
      cbf: 42,
      3: ['ef8a62', 'ffffff', '999999'],
      4: ['ca0020', 'f4a582', 'bababa', '404040'],
      5: ['ca0020', 'f4a582', 'ffffff', 'bababa', '404040'],
      6: ['b2182b', 'ef8a62', 'fddbc7', 'e0e0e0', '999999', '4d4d4d'],
      7: ['b2182b', 'ef8a62', 'fddbc7', 'ffffff', 'e0e0e0', '999999',
          '4d4d4d'],
      8: ['b2182b', 'd6604d', 'f4a582', 'fddbc7', 'e0e0e0', 'bababa',
          '878787', '4d4d4d'],
      9: ['b2182b', 'd6604d', 'f4a582', 'fddbc7', 'ffffff', 'e0e0e0',
          'bababa', '878787', '4d4d4d'],
      10: ['67001f', 'b2182b', 'd6604d', 'f4a582', 'fddbc7', 'e0e0e0',
           'bababa', '878787', '4d4d4d', '1a1a1a'],
      11: ['67001f', 'b2182b', 'd6604d', 'f4a582', 'fddbc7', 'ffffff',
           'e0e0e0', 'bababa', '878787', '4d4d4d', '1a1a1a']
    },
    RdYlBu: {
      type: 'diverging',
      cbf: 42,
      3: ['fc8d59', 'ffffbf', '91bfdb'],
      4: ['d7191c', 'fdae61', 'abd9e9', '2c7bb6'],
      5: ['d7191c', 'fdae61', 'ffffbf', 'abd9e9', '2c7bb6'],
      6: ['d73027', 'fc8d59', 'fee090', 'e0f3f8', '91bfdb', '4575b4'],
      7: ['d73027', 'fc8d59', 'fee090', 'ffffbf', 'e0f3f8', '91bfdb',
          '4575b4'],
      8: ['d73027', 'f46d43', 'fdae61', 'fee090', 'e0f3f8', 'abd9e9',
          '74add1', '4575b4'],
      9: ['d73027', 'f46d43', 'fdae61', 'fee090', 'ffffbf', 'e0f3f8',
          'abd9e9', '74add1', '4575b4'],
      10: ['a50026', 'd73027', 'f46d43', 'fdae61', 'fee090', 'e0f3f8',
           'abd9e9', '74add1', '4575b4', '313695'],
      11: ['a50026', 'd73027', 'f46d43', 'fdae61', 'fee090', 'ffffbf',
           'e0f3f8', 'abd9e9', '74add1', '4575b4', '313695']
    },
    Spectral: {
      type: 'diverging',
      cbf: 0,
      3: ['fc8d59', 'ffffbf', '99d594'],
      4: ['d7191c', 'fdae61', 'abdda4', '2b83ba'],
      5: ['d7191c', 'fdae61', 'ffffbf', 'abdda4', '2b83ba'],
      6: ['d53e4f', 'fc8d59', 'fee08b', 'e6f598', '99d594', '3288bd'],
      7: ['d53e4f', 'fc8d59', 'fee08b', 'ffffbf', 'e6f598', '99d594',
          '3288bd'],
      8: ['d53e4f', 'f46d43', 'fdae61', 'fee08b', 'e6f598', 'abdda4',
          '66c2a5', '3288bd'],
      9: ['d53e4f', 'f46d43', 'fdae61', 'fee08b', 'ffffbf', 'e6f598',
          'abdda4', '66c2a5', '3288bd'],
      10: ['9e0142', 'd53e4f', 'f46d43', 'fdae61', 'fee08b', 'e6f598',
           'abdda4', '66c2a5', '3288bd', '5e4fa2'],
      11: ['9e0142', 'd53e4f', 'f46d43', 'fdae61', 'fee08b', 'ffffbf',
           'e6f598', 'abdda4', '66c2a5', '3288bd', '5e4fa2']
    },
    RdYlGn: {
      type: 'diverging',
      cbf: 0,
      3: ['fc8d59', 'ffffbf', '91cf60'],
      4: ['d7191c', 'fdae61', 'a6d96a', '1a9641'],
      5: ['d7191c', 'fdae61', 'ffffbf', 'a6d96a', '1a9641'],
      6: ['d73027', 'fc8d59', 'fee08b', 'd9ef8b', '91cf60', '1a9850'],
      7: ['d73027', 'fc8d59', 'fee08b', 'ffffbf', 'd9ef8b', '91cf60',
          '1a9850'],
      8: ['d73027', 'f46d43', 'fdae61', 'fee08b', 'd9ef8b', 'a6d96a',
          '66bd63', '1a9850'],
      9: ['d73027', 'f46d43', 'fdae61', 'fee08b', 'ffffbf', 'd9ef8b',
          'a6d96a', '66bd63', '1a9850'],
      10: ['a50026', 'd73027', 'f46d43', 'fdae61', 'fee08b', 'd9ef8b',
           'a6d96a', '66bd63', '1a9850', '006837'],
      11: ['a50026', 'd73027', 'f46d43', 'fdae61', 'fee08b', 'ffffbf',
           'd9ef8b', 'a6d96a', '66bd63', '1a9850', '006837']
    },
    Accent: {
      type: 'qualitative',
      cbf: 0,
      3: ['7fc97f', 'beaed4', 'fdc086'],
      4: ['7fc97f', 'beaed4', 'fdc086', 'ffff99'],
      5: ['7fc97f', 'beaed4', 'fdc086', 'ffff99', '386cb0'],
      6: ['7fc97f', 'beaed4', 'fdc086', 'ffff99', '386cb0', 'f0027f'],
      7: ['7fc97f', 'beaed4', 'fdc086', 'ffff99', '386cb0', 'f0027f',
          'bf5b17'],
      8: ['7fc97f', 'beaed4', 'fdc086', 'ffff99', '386cb0', 'f0027f',
          'bf5b17', '666666']
    },
    Dark2: {
      type: 'qualitative',
      cbf: 3,
      3: ['1b9e77', 'd95f02', '7570b3'],
      4: ['1b9e77', 'd95f02', '7570b3', 'e7298a'],
      5: ['1b9e77', 'd95f02', '7570b3', 'e7298a', '66a61e'],
      6: ['1b9e77', 'd95f02', '7570b3', 'e7298a', '66a61e', 'e6ab02'],
      7: ['1b9e77', 'd95f02', '7570b3', 'e7298a', '66a61e', 'e6ab02',
          'a6761d'],
      8: ['1b9e77', 'd95f02', '7570b3', 'e7298a', '66a61e', 'e6ab02',
          'a6761d', '666666']
    },
    Paired: {
      type: 'qualitative',
      cbf: 4,
      3: ['a6cee3', '1f78b4', 'b2df8a'],
      4: ['a6cee3', '1f78b4', 'b2df8a', '33a02c'],
      5: ['a6cee3', '1f78b4', 'b2df8a', '33a02c', 'fb9a99'],
      6: ['a6cee3', '1f78b4', 'b2df8a', '33a02c', 'fb9a99', 'e31a1c'],
      7: ['a6cee3', '1f78b4', 'b2df8a', '33a02c', 'fb9a99', 'e31a1c',
          'fdbf6f'],
      8: ['a6cee3', '1f78b4', 'b2df8a', '33a02c', 'fb9a99', 'e31a1c',
          'fdbf6f', 'ff7f00'],
      9: ['a6cee3', '1f78b4', 'b2df8a', '33a02c', 'fb9a99', 'e31a1c',
          'fdbf6f', 'ff7f00', 'cab2d6'],
      10: ['a6cee3', '1f78b4', 'b2df8a', '33a02c', 'fb9a99', 'e31a1c',
           'fdbf6f', 'ff7f00', 'cab2d6', '6a3d9a'],
      11: ['a6cee3', '1f78b4', 'b2df8a', '33a02c', 'fb9a99', 'e31a1c',
           'fdbf6f', 'ff7f00', 'cab2d6', '6a3d9a', 'ffff99'],
      12: ['a6cee3', '1f78b4', 'b2df8a', '33a02c', 'fb9a99', 'e31a1c',
           'fdbf6f', 'ff7f00', 'cab2d6', '6a3d9a', 'ffff99', 'b15928']
    },
    Pastel1: {
      type: 'qualitative',
      cbf: 0,
      3: ['fbb4ae', 'b3cde3', 'ccebc5'],
      4: ['fbb4ae', 'b3cde3', 'ccebc5', 'decbe4'],
      5: ['fbb4ae', 'b3cde3', 'ccebc5', 'decbe4', 'fed9a6'],
      6: ['fbb4ae', 'b3cde3', 'ccebc5', 'decbe4', 'fed9a6', 'ffffcc'],
      7: ['fbb4ae', 'b3cde3', 'ccebc5', 'decbe4', 'fed9a6', 'ffffcc',
          'e5d8bd'],
      8: ['fbb4ae', 'b3cde3', 'ccebc5', 'decbe4', 'fed9a6', 'ffffcc',
          'e5d8bd', 'fddaec'],
      9: ['fbb4ae', 'b3cde3', 'ccebc5', 'decbe4', 'fed9a6', 'ffffcc',
          'e5d8bd', 'fddaec', 'f2f2f2']
    },
    Pastel2: {
      type: 'qualitative',
      cbf: 0,
      3: ['b3e2cd', 'fdcdac', 'cbd5e8'],
      4: ['b3e2cd', 'fdcdac', 'cbd5e8', 'f4cae4'],
      5: ['b3e2cd', 'fdcdac', 'cbd5e8', 'f4cae4', 'e6f5c9'],
      6: ['b3e2cd', 'fdcdac', 'cbd5e8', 'f4cae4', 'e6f5c9', 'fff2ae'],
      7: ['b3e2cd', 'fdcdac', 'cbd5e8', 'f4cae4', 'e6f5c9', 'fff2ae',
          'f1e2cc'],
      8: ['b3e2cd', 'fdcdac', 'cbd5e8', 'f4cae4', 'e6f5c9', 'fff2ae',
          'f1e2cc', 'cccccc']
    },
    Set1: {
      type: 'qualitative',
      cbf: 0,
      3: ['e41a1c', '377eb8', '4daf4a'],
      4: ['e41a1c', '377eb8', '4daf4a', '984ea3'],
      5: ['e41a1c', '377eb8', '4daf4a', '984ea3', 'ff7f00'],
      6: ['e41a1c', '377eb8', '4daf4a', '984ea3', 'ff7f00', 'ffff33'],
      7: ['e41a1c', '377eb8', '4daf4a', '984ea3', 'ff7f00', 'ffff33',
          'a65628'],
      8: ['e41a1c', '377eb8', '4daf4a', '984ea3', 'ff7f00', 'ffff33',
          'a65628', 'f781bf'],
      9: ['e41a1c', '377eb8', '4daf4a', '984ea3', 'ff7f00', 'ffff33',
          'a65628', 'f781bf', '999999']
    },
    Set2: {
      type: 'qualitative',
      cbf: 3,
      3: ['66c2a5', 'fc8d62', '8da0cb'],
      4: ['66c2a5', 'fc8d62', '8da0cb', 'e78ac3'],
      5: ['66c2a5', 'fc8d62', '8da0cb', 'e78ac3', 'a6d854'],
      6: ['66c2a5', 'fc8d62', '8da0cb', 'e78ac3', 'a6d854', 'ffd92f'],
      7: ['66c2a5', 'fc8d62', '8da0cb', 'e78ac3', 'a6d854', 'ffd92f',
          'e5c494'],
      8: ['66c2a5', 'fc8d62', '8da0cb', 'e78ac3', 'a6d854', 'ffd92f',
          'e5c494', 'b3b3b3']
    },
    Set3: {
      type: 'qualitative',
      cbf: 0,
      3: ['8dd3c7', 'ffffb3', 'bebada'],
      4: ['8dd3c7', 'ffffb3', 'bebada', 'fb8072'],
      5: ['8dd3c7', 'ffffb3', 'bebada', 'fb8072', '80b1d3'],
      6: ['8dd3c7', 'ffffb3', 'bebada', 'fb8072', '80b1d3', 'fdb462'],
      7: ['8dd3c7', 'ffffb3', 'bebada', 'fb8072', '80b1d3', 'fdb462',
          'b3de69'],
      8: ['8dd3c7', 'ffffb3', 'bebada', 'fb8072', '80b1d3', 'fdb462',
          'b3de69', 'fccde5'],
      9: ['8dd3c7', 'ffffb3', 'bebada', 'fb8072', '80b1d3', 'fdb462',
          'b3de69', 'fccde5', 'd9d9d9'],
      10: ['8dd3c7', 'ffffb3', 'bebada', 'fb8072', '80b1d3', 'fdb462',
           'b3de69', 'fccde5', 'd9d9d9', 'bc80bd'],
      11: ['8dd3c7', 'ffffb3', 'bebada', 'fb8072', '80b1d3', 'fdb462',
           'b3de69', 'fccde5', 'd9d9d9', 'bc80bd', 'ccebc5'],
      12: ['8dd3c7', 'ffffb3', 'bebada', 'fb8072', '80b1d3', 'fdb462',
           'b3de69', 'fccde5', 'd9d9d9', 'bc80bd', 'ccebc5', 'ffed6f']
    }
  };

  for (var name in schemes) {
    var scheme = schemes[name];
    scheme = palette.Scheme.fromPalettes(
      'cb-' + name, [scheme.type, 'cb-' + scheme.type], scheme, 12, scheme.cbf);
    palette.register(scheme);
  }
})();

if(typeof module === "object" && module.exports) {
  module.exports = palette
}
