/*
 * Cloudinary's JavaScript library - Version 2.0.5
 * Copyright Cloudinary
 * see https://github.com/cloudinary/cloudinary_js
 */
(function() {
  (function(root, factory) {
    if ((typeof define === 'function') && define.amd) {
      return define('utf8_encode',factory);
    } else if (typeof exports === 'object') {
      return module.exports = factory();
    } else {
      root.cloudinary || (root.cloudinary = {});
      return root.cloudinary.utf8_encode = factory();
    }
  })(this, function() {
    return function(argString) {
      var c1, enc, end, n, start, string, stringl, utftext;
      if (argString === null || typeof argString === 'undefined') {
        return '';
      }
      string = argString + '';
      utftext = '';
      start = void 0;
      end = void 0;
      stringl = 0;
      start = end = 0;
      stringl = string.length;
      n = 0;
      while (n < stringl) {
        c1 = string.charCodeAt(n);
        enc = null;
        if (c1 < 128) {
          end++;
        } else if (c1 > 127 && c1 < 2048) {
          enc = String.fromCharCode(c1 >> 6 | 192, c1 & 63 | 128);
        } else {
          enc = String.fromCharCode(c1 >> 12 | 224, c1 >> 6 & 63 | 128, c1 & 63 | 128);
        }
        if (enc !== null) {
          if (end > start) {
            utftext += string.slice(start, end);
          }
          utftext += enc;
          start = end = n + 1;
        }
        n++;
      }
      if (end > start) {
        utftext += string.slice(start, stringl);
      }
      return utftext;
    };
  });

}).call(this);

(function() {
  (function(root, factory) {
    if ((typeof define === 'function') && define.amd) {
      return define('crc32',['utf8_encode'], factory);
    } else if (typeof exports === 'object') {
      return module.exports = factory(require('utf8_encode'));
    } else {
      root.cloudinary || (root.cloudinary = {});
      return root.cloudinary.crc32 = factory(root.cloudinary.utf8_encode);
    }
  })(this, function(utf8_encode) {
    return function(str) {
      var crc, i, iTop, table, x, y;
      str = utf8_encode(str);
      table = '00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D';
      crc = 0;
      x = 0;
      y = 0;
      crc = crc ^ -1;
      i = 0;
      iTop = str.length;
      while (i < iTop) {
        y = (crc ^ str.charCodeAt(i)) & 0xFF;
        x = '0x' + table.substr(y * 9, 8);
        crc = crc >>> 8 ^ x;
        i++;
      }
      crc = crc ^ -1;
      if (crc < 0) {
        crc += 4294967296;
      }
      return crc;
    };
  });

}).call(this);

(function() {
  (function(root, factory) {
    if ((typeof define === 'function') && define.amd) {
      return define('util', ['lodash'], factory);
    } else if (typeof exports === 'object') {
      return module.exports = factory(require('lodash'));
    } else {
      root.cloudinary || (root.cloudinary = {});
      return root.cloudinary.Util = factory(_);
    }
  })(this, function(_) {

    /**
      * Includes utility methods and lodash / jQuery shims
     */

    /**
      * Get data from the DOM element.
      *
      * This method will use jQuery's `data()` method if it is available, otherwise it will get the `data-` attribute
      * @param {Element} element - the element to get the data from
      * @param {string} name - the name of the data item
      * @returns the value associated with the `name`
      *
     */
    var Util, addClass, allStrings, augmentWidthOrHeight, contains, cssExpand, cssValue, curCSS, domStyle, getAttribute, getData, getStyles, getWidthOrHeight, hasClass, pnum, rnumnonpx, setAttribute, setAttributes, setData, width, without;
    getData = function(element, name) {
      if (_.isElement(element)) {
        return element.getAttribute("data-" + name);
      }
    };

    /**
      * Set data in the DOM element.
      *
      * This method will use jQuery's `data()` method if it is available, otherwise it will set the `data-` attribute
      * @param {Element} element - the element to set the data in
      * @param {string} name - the name of the data item
      * @param {*} value - the value to be set
      *
     */
    setData = function(element, name, value) {
      if (_.isElement(element)) {
        return element.setAttribute("data-" + name, value);
      }
    };

    /**
      * Get attribute from the DOM element.
      *
      * This method will use jQuery's `attr()` method if it is available, otherwise it will get the attribute directly
      * @param {Element} element - the element to set the attribute for
      * @param {string} name - the name of the attribute
      * @returns {*} the value of the attribute
      *
     */
    getAttribute = function(element, name) {
      if (_.isElement(element)) {
        return element.getAttribute(name);
      }
    };

    /**
      * Set attribute in the DOM element.
      *
      * This method will use jQuery's `attr()` method if it is available, otherwise it will set the attribute directly
      * @param {Element} element - the element to set the attribute for
      * @param {string} name - the name of the attribute
      * @param {*} value - the value to be set
      *
     */
    setAttribute = function(element, name, value) {
      if (_.isElement(element)) {
        return element.setAttribute(name, value);
      }
    };
    setAttributes = function(element, attributes) {
      var name, results, value;
      results = [];
      for (name in attributes) {
        value = attributes[name];
        if (value != null) {
          results.push(setAttribute(element, name, value));
        } else {
          results.push(element.removeAttribute(name));
        }
      }
      return results;
    };
    hasClass = function(element, name) {
      if (_.isElement(element)) {
        return element.className.match(new RegExp("\\b" + name + "\\b"));
      }
    };
    addClass = function(element, name) {
      if (!element.className.match(new RegExp("\\b" + name + "\\b"))) {
        return element.className = _.trim(element.className + " " + name);
      }
    };
    getStyles = function(elem) {
      if (elem.ownerDocument.defaultView.opener) {
        return elem.ownerDocument.defaultView.getComputedStyle(elem, null);
      }
      return window.getComputedStyle(elem, null);
    };
    cssExpand = ["Top", "Right", "Bottom", "Left"];
    contains = function(a, b) {
      var adown, bup;
      adown = (a.nodeType === 9 ? a.documentElement : a);
      bup = b && b.parentNode;
      return a === bup || !!(bup && bup.nodeType === 1 && adown.contains(bup));
    };
    domStyle = function(elem, name) {
      if (!(!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style)) {
        return elem.style[name];
      }
    };
    curCSS = function(elem, name, computed) {
      var maxWidth, minWidth, ret, style, width;
      width = void 0;
      minWidth = void 0;
      maxWidth = void 0;
      ret = void 0;
      style = elem.style;
      computed = computed || getStyles(elem);
      if (computed) {
        ret = computed.getPropertyValue(name) || computed[name];
      }
      if (computed) {
        if (ret === "" && !contains(elem.ownerDocument, elem)) {
          ret = domStyle(elem, name);
        }
        if (rnumnonpx.test(ret) && rmargin.test(name)) {
          width = style.width;
          minWidth = style.minWidth;
          maxWidth = style.maxWidth;
          style.minWidth = style.maxWidth = style.width = ret;
          ret = computed.width;
          style.width = width;
          style.minWidth = minWidth;
          style.maxWidth = maxWidth;
        }
      }
      if (ret !== undefined) {
        return ret + "";
      } else {
        return ret;
      }
    };
    cssValue = function(elem, name, convert, styles) {
      var val;
      val = curCSS(elem, name, styles);
      if (convert) {
        return parseFloat(val);
      } else {
        return val;
      }
    };
    augmentWidthOrHeight = function(elem, name, extra, isBorderBox, styles) {
      var j, len, side, sides, val;
      if (extra === (isBorderBox ? "border" : "content")) {
        return 0;
      } else {
        sides = name === "width" ? ["Right", "Left"] : ["Top", "Bottom"];
        val = 0;
        for (j = 0, len = sides.length; j < len; j++) {
          side = sides[j];
          if (extra === "margin") {
            val += cssValue(elem, extra + side, true, styles);
          }
          if (isBorderBox) {
            if (extra === "content") {
              val -= cssValue(elem, "padding" + side, true, styles);
            }
            if (extra !== "margin") {
              val -= cssValue(elem, "border" + side + "Width", true, styles);
            }
          } else {
            val += cssValue(elem, "padding" + side, true, styles);
            if (extra !== "padding") {
              val += cssValue(elem, "border" + side + "Width", true, styles);
            }
          }
        }
        return val;
      }
    };
    pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;
    rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");
    getWidthOrHeight = function(elem, name, extra) {
      var isBorderBox, styles, val, valueIsBorderBox;
      valueIsBorderBox = true;
      val = (name === "width" ? elem.offsetWidth : elem.offsetHeight);
      styles = getStyles(elem);
      isBorderBox = cssValue(elem, "boxSizing", false, styles) === "border-box";
      if (val <= 0 || (val == null)) {
        val = curCSS(elem, name, styles);
        if (val < 0 || (val == null)) {
          val = elem.style[name];
        }
        if (rnumnonpx.test(val)) {
          return val;
        }
        valueIsBorderBox = isBorderBox && (support.boxSizingReliable() || val === elem.style[name]);
        val = parseFloat(val) || 0;
      }
      return val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles);
    };
    width = function(element) {
      return getWidthOrHeight(element, "width", "content");
    };
    allStrings = function(list) {
      var item, j, len;
      for (j = 0, len = list.length; j < len; j++) {
        item = list[j];
        if (!Util.isString(item)) {
          return false;
        }
      }
      return true;
    };
    without = function(array, item) {
      var i, length, newArray;
      newArray = [];
      i = -1;
      length = array.length;
      while (++i < length) {
        if (array[i] !== item) {
          newArray.push(array[i]);
        }
      }
      return newArray;
    };
    Util = {
      hasClass: hasClass,
      addClass: addClass,

      /**
        * Get attribute from the DOM element.
        *
        * This method will use jQuery's `attr()` method if it is available, otherwise it will get the attribute directly
        * @param {Element} element - the element to set the attribute for
        * @param {string} name - the name of the attribute
        * @returns {*} the value of the attribute
        *
       */
      getAttribute: getAttribute,
      setAttribute: setAttribute,
      setAttributes: setAttributes,
      getData: getData,
      setData: setData,
      width: width,

      /**
       * Return true if all items in list are strings
       * @param {Array} list - an array of items
       */
      allStrings: allStrings,
      isString: _.isString,
      isArray: _.isArray,
      isEmpty: _.isEmpty,

      /**
       * Assign source properties to destination.
       * If the property is an object it is assigned as a whole, overriding the destination object.
       * @param {Object} destination - the object to assign to
       */
      assign: _.assign,

      /**
      * Recursively assign source properties to destination
      * @param {Object} destination - the object to assign to
       */
      merge: _.merge,

      /**
       * Convert string to camelCase
       * @param {string} string - the string to convert
       * @return {string} in camelCase format
       */
      camelCase: _.camelCase,

      /**
       * Convert string to snake_case
       * @param {string} string - the string to convert
       * @return {string} in snake_case format
       */
      snakeCase: _.snakeCase,

      /**
       * Create a new copy of the given object, including all internal objects.
       * @param {Object} value - the object to clone
       * @return {Object} a new deep copy of the object
       */
      cloneDeep: _.cloneDeep,

      /**
       * Creates a new array from the parameter with "falsey" values removed
       * @param {Array} array - the array to remove values from
       * @return {Array} a new array without falsey values
       */
      compact: _.compact,

      /**
       * Check if a given item is included in the given array
       * @param {Array} array - the array to search in
       * @param {*} item - the item to search for
       * @return {boolean} true if the item is included in the array
       */
      contains: _.contains,

      /**
      * Assign values from sources if they are not defined in the destination.
      * Once a value is set it does not change
      * @param {Object} destination - the object to assign defaults to
      * @param {...Object} source - the source object(s) to assign defaults from
      * @return {Object} destination after it was modified
       */
      defaults: _.defaults,

      /**
       * Returns values in the given array that are not included in the other array
       * @param {Array} arr - the array to select from
       * @param {Array} values - values to filter from arr
       * @return {Array} the filtered values
       */
      difference: _.difference,

      /**
      * Returns true if argument is a function.
      * @param {*} value - the value to check
      * @return {boolean} true if the value is a function
       */
      isFunction: _.isFunction,

      /**
       * Returns a list of all the function names in obj
       * @param {Object} object - the object to inspect
       * @return {Array} a list of functions of object
       */
      functions: _.functions,

      /**
       * Returns the provided value. This functions is used as a default predicate function.
       * @param {*} value
       * @return {*} the provided value
       */
      identity: _.identity,
      isPlainObject: _.isPlainObject,

      /**
       * Remove leading or trailing spaces from text
       * @param {string} text
       * @return {string} the `text` without leading or trailing spaces
       */
      trim: _.trim,

      /**
       * Creates a new array without the given item.
       * @param {Array} array - original array
       * @param {*} item - the item to exclude from the new array
       * @return {Array} a new array made of the original array's items except for `item`
       */
      without: without
    };
    return Util;
  });

}).call(this);

(function() {
  (function(root, factory) {
    if ((typeof define === 'function') && define.amd) {
      return define('configuration',['util'], factory);
    } else if (typeof exports === 'object') {
      return module.exports = factory(require('util'));
    } else {
      root.cloudinary || (root.cloudinary = {});
      return root.cloudinary.Configuration = factory(root.cloudinary.Util);
    }
  })(this, function(Util) {

    /**
     * Cloudinary configuration class
     */
    var Configuration;
    Configuration = (function() {

      /**
      * Defaults configuration.
      * @const {Object} Configuration.DEFAULT_CONFIGURATION_PARAMS
       */
      var DEFAULT_CONFIGURATION_PARAMS, ref;

      DEFAULT_CONFIGURATION_PARAMS = {
        secure: (typeof window !== "undefined" && window !== null ? (ref = window.location) != null ? ref.protocol : void 0 : void 0) === 'https:'
      };

      Configuration.CONFIG_PARAMS = ["api_key", "api_secret", "cdn_subdomain", "cloud_name", "cname", "private_cdn", "protocol", "resource_type", "responsive_width", "secure", "secure_cdn_subdomain", "secure_distribution", "shorten", "type", "url_suffix", "use_root_path", "version"];


      /**
       * Cloudinary configuration class
       * @constructor Configuration
       * @param {Object} options - configuration parameters
       */

      function Configuration(options) {
        if (options == null) {
          options = {};
        }
        this.configuration = Util.cloneDeep(options);
        Util.defaults(this.configuration, DEFAULT_CONFIGURATION_PARAMS);
      }


      /**
       * Initialize the configuration.
       * The function first tries to retrieve the configuration form the environment and then from the document.
       * @function Configuration#init
       * @return {Configuration} returns this for chaining
       * @see fromDocument
       * @see fromEnvironment
       */

      Configuration.prototype.init = function() {
        this.fromEnvironment();
        this.fromDocument();
        return this;
      };


      /**
       * Set a new configuration item
       * @function Configuration#set
       * @param {string} name - the name of the item to set
       * @param {*} value - the value to be set
       * @return {Configuration}
       *
       */

      Configuration.prototype.set = function(name, value) {
        this.configuration[name] = value;
        return this;
      };


      /**
       * Get the value of a configuration item
       * @function Configuration#get
       * @param {string} name - the name of the item to set
       * @return {*} the configuration item
       */

      Configuration.prototype.get = function(name) {
        return this.configuration[name];
      };

      Configuration.prototype.merge = function(config) {
        if (config == null) {
          config = {};
        }
        Util.assign(this.configuration, Util.cloneDeep(config));
        return this;
      };


      /**
       * Initialize Cloudinary from HTML meta tags.
       * @function Configuration#fromDocument
       * @return {Configuration}
       * @example <meta name="cloudinary_cloud_name" content="mycloud">
       *
       */

      Configuration.prototype.fromDocument = function() {
        var el, i, len, meta_elements;
        meta_elements = typeof document !== "undefined" && document !== null ? document.querySelectorAll('meta[name^="cloudinary_"]') : void 0;
        if (meta_elements) {
          for (i = 0, len = meta_elements.length; i < len; i++) {
            el = meta_elements[i];
            this.configuration[el.getAttribute('name').replace('cloudinary_', '')] = el.getAttribute('content');
          }
        }
        return this;
      };


      /**
       * Initialize Cloudinary from the `CLOUDINARY_URL` environment variable.
       *
       * This function will only run under Node.js environment.
       * @function Configuration#fromEnvironment
       * @requires Node.js
       */

      Configuration.prototype.fromEnvironment = function() {
        var cloudinary_url, k, ref1, ref2, uri, v;
        cloudinary_url = typeof process !== "undefined" && process !== null ? (ref1 = process.env) != null ? ref1.CLOUDINARY_URL : void 0 : void 0;
        if (cloudinary_url != null) {
          uri = require('url').parse(cloudinary_url, true);
          this.configuration = {
            cloud_name: uri.host,
            api_key: uri.auth && uri.auth.split(":")[0],
            api_secret: uri.auth && uri.auth.split(":")[1],
            private_cdn: uri.pathname != null,
            secure_distribution: uri.pathname && uri.pathname.substring(1)
          };
          if (uri.query != null) {
            ref2 = uri.query;
            for (k in ref2) {
              v = ref2[k];
              this.configuration[k] = v;
            }
          }
        }
        return this;
      };


      /**
      * Create or modify the Cloudinary client configuration
      *
      * Warning: `config()` returns the actual internal configuration object. modifying it will change the configuration.
      *
      * This is a backward compatibility method. For new code, use get(), merge() etc.
      * @function Configuration#config
      * @param {hash|string|boolean} new_config
      * @param {string} new_value
      * @returns {*} configuration, or value
      *
      * @see {@link fromEnvironment} for initialization using environment variables
      * @see {@link fromDocument} for initialization using HTML meta tags
       */

      Configuration.prototype.config = function(new_config, new_value) {
        switch (false) {
          case new_value === void 0:
            this.set(new_config, new_value);
            return this.configuration;
          case !Util.isString(new_config):
            return this.get(new_config);
          case !Util.isPlainObject(new_config):
            this.merge(new_config);
            return this.configuration;
          default:
            return this.configuration;
        }
      };


      /**
       * Returns a copy of the configuration parameters
       * @function Configuration#toOptions
       * @returns {Object} a key:value collection of the configuration parameters
       */

      Configuration.prototype.toOptions = function() {
        return Util.cloneDeep(this.configuration);
      };

      return Configuration;

    })();
    return Configuration;
  });

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  (function(root, factory) {
    if ((typeof define === 'function') && define.amd) {
      return define('parameters',['util', 'transformation', 'require'], factory);
    } else if (typeof exports === 'object') {
      return module.exports = factory(require('util'), require('transformation'), require);
    } else {
      root.cloudinary || (root.cloudinary = {});
      return root.cloudinary.parameters = factory(root.cloudinary.Util, root.cloudinary.Transformation, function() {
        return cloudinary.Transformation;
      });
    }
  })(this, function(Util, Transformation, require) {
    var ArrayParam, Param, RangeParam, RawParam, TransformationParam, parameters;
    Param = (function() {

      /**
       * Represents a single parameter
       * @class Param
       * @param {string} name - The name of the parameter in snake_case
       * @param {string} short - The name of the serialized form of the parameter.
       *                         If a value is not provided, the parameter will not be serialized.
       * @param {function} [process=Util.identity ] - Manipulate origValue when value is called
       * @ignore
       */
      function Param(name, short, process) {
        if (process == null) {
          process = Util.identity;
        }

        /**
         * The name of the parameter in snake_case
         * @member {string} Param#name
         */
        this.name = name;

        /**
         * The name of the serialized form of the parameter
         * @member {string} Param#short
         */
        this.short = short;

        /**
         * Manipulate origValue when value is called
         * @member {function} Param#process
         */
        this.process = process;
      }


      /**
       * Set a (unprocessed) value for this parameter
       * @function Param#set
       * @param {*} origValue - the value of the parameter
       * @return {Param} self for chaining
       */

      Param.prototype.set = function(origValue) {
        this.origValue = origValue;
        return this;
      };


      /**
       * Generate the serialized form of the parameter
       * @function Param#serialize
       * @return {string} the serialized form of the parameter
       */

      Param.prototype.serialize = function() {
        var val, valid;
        val = this.value();
        valid = Util.isArray(val) || Util.isPlainObject(val) || Util.isString(val) ? !Util.isEmpty(val) : val != null;
        if ((this.short != null) && valid) {
          return this.short + "_" + val;
        } else {
          return '';
        }
      };


      /**
       * Return the processed value of the parameter
       * @function Param#value
       */

      Param.prototype.value = function() {
        return this.process(this.origValue);
      };

      Param.norm_color = function(value) {
        return value != null ? value.replace(/^#/, 'rgb:') : void 0;
      };

      Param.prototype.build_array = function(arg) {
        if (arg == null) {
          arg = [];
        }
        if (Util.isArray(arg)) {
          return arg;
        } else {
          return [arg];
        }
      };


      /**
      * Covert value to video codec string.
      *
      * If the parameter is an object,
      * @param {(string|Object)} param - the video codec as either a String or a Hash
      * @return {string} the video codec string in the format codec:profile:level
      * @example
      * vc_[ :profile : [level]]
      * or
        { codec: 'h264', profile: 'basic', level: '3.1' }
      * @ignore
       */

      Param.process_video_params = function(param) {
        var video;
        switch (param.constructor) {
          case Object:
            video = "";
            if ('codec' in param) {
              video = param['codec'];
              if ('profile' in param) {
                video += ":" + param['profile'];
                if ('level' in param) {
                  video += ":" + param['level'];
                }
              }
            }
            return video;
          case String:
            return param;
          default:
            return null;
        }
      };

      return Param;

    })();
    ArrayParam = (function(superClass) {
      extend(ArrayParam, superClass);


      /**
       * A parameter that represents an array
       * @param {string} name - The name of the parameter in snake_case
       * @param {string} short - The name of the serialized form of the parameter
       *                         If a value is not provided, the parameter will not be serialized.
       * @param {string} [sep='.'] - The separator to use when joining the array elements together
       * @param {function} [process=Util.identity ] - Manipulate origValue when value is called
       * @class ArrayParam
       * @extends Param
       * @ignore
       */

      function ArrayParam(name, short, sep, process) {
        if (sep == null) {
          sep = '.';
        }
        this.sep = sep;
        ArrayParam.__super__.constructor.call(this, name, short, process);
      }

      ArrayParam.prototype.serialize = function() {
        var array, flat, t;
        if (this.short != null) {
          array = this.value();
          if (Util.isEmpty(array)) {
            return '';
          } else {
            flat = (function() {
              var i, len, ref, results;
              ref = this.value();
              results = [];
              for (i = 0, len = ref.length; i < len; i++) {
                t = ref[i];
                if (Util.isFunction(t.serialize)) {
                  results.push(t.serialize());
                } else {
                  results.push(t);
                }
              }
              return results;
            }).call(this);
            return this.short + "_" + (flat.join(this.sep));
          }
        } else {
          return '';
        }
      };

      ArrayParam.prototype.set = function(origValue) {
        if ((origValue == null) || Util.isArray(origValue)) {
          return ArrayParam.__super__.set.call(this, origValue);
        } else {
          return ArrayParam.__super__.set.call(this, [origValue]);
        }
      };

      return ArrayParam;

    })(Param);
    TransformationParam = (function(superClass) {
      extend(TransformationParam, superClass);


      /**
       * A parameter that represents a transformation
       * @param {string} name - The name of the parameter in snake_case
       * @param {string} [short='t'] - The name of the serialized form of the parameter
       * @param {string} [sep='.'] - The separator to use when joining the array elements together
       * @param {function} [process=Util.identity ] - Manipulate origValue when value is called
       * @class TransformationParam
       * @extends Param
       * @ignore
       */

      function TransformationParam(name, short, sep, process) {
        if (short == null) {
          short = "t";
        }
        if (sep == null) {
          sep = '.';
        }
        this.sep = sep;
        TransformationParam.__super__.constructor.call(this, name, short, process);
      }

      TransformationParam.prototype.serialize = function() {
        var joined, result, t;
        if (Util.isEmpty(this.value())) {
          return '';
        } else if (Util.allStrings(this.value())) {
          joined = this.value().join(this.sep);
          if (!Util.isEmpty(joined)) {
            return this.short + "_" + joined;
          } else {
            return '';
          }
        } else {
          result = (function() {
            var i, len, ref, results;
            ref = this.value();
            results = [];
            for (i = 0, len = ref.length; i < len; i++) {
              t = ref[i];
              if (t != null) {
                if (Util.isString(t) && !Util.isEmpty(t)) {
                  results.push(this.short + "_" + t);
                } else if (Util.isFunction(t.serialize)) {
                  results.push(t.serialize());
                } else if (Util.isPlainObject(t) && !Util.isEmpty(t)) {
                  Transformation || (Transformation = require('transformation'));
                  results.push(new Transformation(t).serialize());
                } else {
                  results.push(void 0);
                }
              }
            }
            return results;
          }).call(this);
          return Util.compact(result);
        }
      };

      TransformationParam.prototype.set = function(origValue1) {
        this.origValue = origValue1;
        if (Util.isArray(this.origValue)) {
          return TransformationParam.__super__.set.call(this, this.origValue);
        } else {
          return TransformationParam.__super__.set.call(this, [this.origValue]);
        }
      };

      return TransformationParam;

    })(Param);
    RangeParam = (function(superClass) {
      extend(RangeParam, superClass);


      /**
       * A parameter that represents a range
       * @param {string} name - The name of the parameter in snake_case
       * @param {string} short - The name of the serialized form of the parameter
       *                         If a value is not provided, the parameter will not be serialized.
       * @param {function} [process=norm_range_value ] - Manipulate origValue when value is called
       * @class RangeParam
       * @extends Param
       * @ignore
       */

      function RangeParam(name, short, process) {
        if (process == null) {
          process = this.norm_range_value;
        }
        RangeParam.__super__.constructor.call(this, name, short, process);
      }

      RangeParam.norm_range_value = function(value) {
        var modifier, offset;
        offset = String(value).match(new RegExp('^' + offset_any_pattern + '$'));
        if (offset) {
          modifier = offset[5] != null ? 'p' : '';
          value = (offset[1] || offset[4]) + modifier;
        }
        return value;
      };

      return RangeParam;

    })(Param);
    RawParam = (function(superClass) {
      extend(RawParam, superClass);

      function RawParam(name, short, process) {
        if (process == null) {
          process = Util.identity;
        }
        RawParam.__super__.constructor.call(this, name, short, process);
      }

      RawParam.prototype.serialize = function() {
        return this.value();
      };

      return RawParam;

    })(Param);
    parameters = {};
    parameters.Param = Param;
    parameters.ArrayParam = ArrayParam;
    parameters.RangeParam = RangeParam;
    parameters.RawParam = RawParam;
    parameters.TransformationParam = TransformationParam;
    return parameters;
  });

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  (function(root, factory) {
    if ((typeof define === 'function') && define.amd) {
      return define('transformation',['configuration', 'parameters', 'util'], factory);
    } else if (typeof exports === 'object') {
      return module.exports = factory(require('configuration'), require('parameters'), require('util'));
    } else {
      root.cloudinary || (root.cloudinary = {});
      return root.cloudinary.Transformation = factory(root.cloudinary.Configuration, root.cloudinary.parameters, root.cloudinary.Util);
    }
  })(this, function(Configuration, parameters, Util) {
    var ArrayParam, Param, RangeParam, RawParam, Transformation, TransformationBase, TransformationParam;
    Param = parameters.Param;
    ArrayParam = parameters.ArrayParam;
    RangeParam = parameters.RangeParam;
    RawParam = parameters.RawParam;
    TransformationParam = parameters.TransformationParam;
    TransformationBase = (function() {
      var lastArgCallback;

      lastArgCallback = function(args) {
        var callback;
        callback = args != null ? args[args.length - 1] : void 0;
        if (Util.isFunction(callback)) {
          return callback;
        } else {
          return void 0;
        }
      };


      /**
       * The base class for transformations.
       * Members of this class are documented as belonging to the {@link Transformation} class for convenience.
       * @class TransformationBase
       */

      function TransformationBase(options) {
        var chainedTo, m, trans;
        if (options == null) {
          options = {};
        }

        /** @private */
        chainedTo = void 0;

        /** @private */
        trans = {};

        /**
         * Return an options object that can be used to create an identical Transformation
         * @function Transformation#toOptions
         * @return {Object} Returns a plain object representing this transformation
         */
        this.toOptions = function() {
          var key, opt, ref, value;
          opt = {};
          for (key in trans) {
            value = trans[key];
            opt[key] = value.origValue;
          }
          ref = this.otherOptions;
          for (key in ref) {
            value = ref[key];
            if (value !== void 0) {
              opt[key] = value;
            }
          }
          return opt;
        };

        /**
         * Set a parent for this object for chaining purposes.
         *
         * @function Transformation#setParent
         * @param {Object} object - the parent to be assigned to
         * @returns {Transformation} Returns this instance for chaining purposes.
         */
        this.setParent = function(object) {
          chainedTo = object;
          this.fromOptions(typeof object.toOptions === "function" ? object.toOptions() : void 0);
          return this;
        };

        /**
         * Returns the parent of this object in the chain
         * @function Transformation#getParent
         * @protected
         * @return {Object} Returns the parent of this object if there is any
         */
        this.getParent = function() {
          return chainedTo;
        };

        /** @protected */
        this.param = function(value, name, abbr, defaultValue, process) {
          if (process == null) {
            if (Util.isFunction(defaultValue)) {
              process = defaultValue;
            } else {
              process = Util.identity;
            }
          }
          trans[name] = new Param(name, abbr, process).set(value);
          return this;
        };

        /** @protected */
        this.rawParam = function(value, name, abbr, defaultValue, process) {
          if (process == null) {
            process = Util.identity;
          }
          process = lastArgCallback(arguments);
          trans[name] = new RawParam(name, abbr, process).set(value);
          return this;
        };

        /** @protected */
        this.rangeParam = function(value, name, abbr, defaultValue, process) {
          if (process == null) {
            process = Util.identity;
          }
          process = lastArgCallback(arguments);
          trans[name] = new RangeParam(name, abbr, process).set(value);
          return this;
        };

        /** @protected */
        this.arrayParam = function(value, name, abbr, sep, defaultValue, process) {
          if (sep == null) {
            sep = ":";
          }
          if (defaultValue == null) {
            defaultValue = [];
          }
          if (process == null) {
            process = Util.identity;
          }
          process = lastArgCallback(arguments);
          trans[name] = new ArrayParam(name, abbr, sep, process).set(value);
          return this;
        };

        /** @protected */
        this.transformationParam = function(value, name, abbr, sep, defaultValue, process) {
          if (sep == null) {
            sep = ".";
          }
          if (process == null) {
            process = Util.identity;
          }
          process = lastArgCallback(arguments);
          trans[name] = new TransformationParam(name, abbr, sep, process).set(value);
          return this;
        };

        /**
         * Get the value associated with the given name.
         * @function Transformation#getValue
         * @param {string} name - the name of the parameter
         * @return {*} the processed value associated with the given name
         * @description Use {@link get}.origValue for the value originally provided for the parameter
         */
        this.getValue = function(name) {
          var ref, ref1;
          return (ref = (ref1 = trans[name]) != null ? ref1.value() : void 0) != null ? ref : this.otherOptions[name];
        };

        /**
         * Get the parameter object for the given parameter name
         * @function Transformation#get
         * @param {string} name the name of the transformation parameter
         * @returns {Param} the param object for the given name, or undefined
         */
        this.get = function(name) {
          return trans[name];
        };

        /**
         * Remove a transformation option from the transformation.
         * @function Transformation#remove
         * @param {string} name - the name of the option to remove
         * @return {*} Returns the option that was removed or null if no option by that name was found. The type of the
         *              returned value depends on the value.
         */
        this.remove = function(name) {
          var temp;
          switch (false) {
            case trans[name] == null:
              temp = trans[name];
              delete trans[name];
              return temp.origValue;
            case this.otherOptions[name] == null:
              temp = this.otherOptions[name];
              delete this.otherOptions[name];
              return temp;
            default:
              return null;
          }
        };

        /**
         * Return an array of all the keys (option names) in the transformation.
         * @return {Array<string>} the keys in snakeCase format
         */
        this.keys = function() {
          var key;
          return ((function() {
            var results;
            results = [];
            for (key in trans) {
              results.push(Util.snakeCase(key));
            }
            return results;
          })()).sort();
        };

        /**
         * Returns a plain object representation of the transformation. Values are processed.
         * @function Transformation#toPlainObject
         * @return {Object} the transformation options as plain object
         */
        this.toPlainObject = function() {
          var hash, key;
          hash = {};
          for (key in trans) {
            hash[key] = trans[key].value();
            if (Util.isPlainObject(hash[key])) {
              hash[key] = Util.cloneDeep(hash[key]);
            }
          }
          return hash;
        };

        /**
         * Complete the current transformation and chain to a new one.
         * In the URL, transformations are chained together by slashes.
         * @function Transformation#chain
         * @return {Transformation} Returns this transformation for chaining
         * @example
         * var tr = cloudinary.Transformation.new();
         * tr.width(10).crop('fit').chain().angle(15).serialize()
         * // produces "c_fit,w_10/a_15"
         */
        this.chain = function() {
          var tr;
          tr = new this.constructor(this.toOptions());
          trans = [];
          return this.set("transformation", tr);
        };
        this.otherOptions = {};

        /**
         * Transformation Class methods.
         * This is a list of the parameters defined in Transformation.
         * Values are camelCased.
         * @private
         * @ignore
         * @type {Array<string>}
         */
        this.methods = Util.difference(Util.functions(Transformation.prototype), Util.functions(TransformationBase.prototype));

        /**
         * Parameters that are filtered out before passing the options to an HTML tag.
         *
         * The list of parameters is a combination of `Transformation::methods` and `Configuration::CONFIG_PARAMS`
         * @const {Array<string>} Transformation.PARAM_NAMES
         * @private
         * @ignore
         * @see toHtmlAttributes
         */
        this.PARAM_NAMES = ((function() {
          var i, len, ref, results;
          ref = this.methods;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            m = ref[i];
            results.push(Util.snakeCase(m));
          }
          return results;
        }).call(this)).concat(Configuration.CONFIG_PARAMS);
        if (!Util.isEmpty(options)) {
          this.fromOptions(options);
        }
      }


      /**
       * Merge the provided options with own's options
       * @param {Object} [options={}] key-value list of options
       * @returns {Transformation} Returns this instance for chaining
       */

      TransformationBase.prototype.fromOptions = function(options) {
        var key, opt;
        options || (options = {});
        if (Util.isString(options) || Util.isArray(options) || options instanceof Transformation) {
          options = {
            transformation: options
          };
        }
        options = Util.cloneDeep(options, function(value) {
          if (value instanceof Transformation) {
            return new value.constructor(value.toOptions());
          }
        });
        for (key in options) {
          opt = options[key];
          this.set(key, opt);
        }
        return this;
      };


      /**
       * Set a parameter.
       * The parameter name `key` is converted to
       * @param {string} key - the name of the parameter
       * @param {*} value - the value of the parameter
       * @returns {Transformation} Returns this instance for chaining
       */

      TransformationBase.prototype.set = function(key, value) {
        var camelKey;
        camelKey = Util.camelCase(key);
        if (Util.contains(this.methods, camelKey)) {
          this[camelKey](value);
        } else {
          this.otherOptions[key] = value;
        }
        return this;
      };

      TransformationBase.prototype.hasLayer = function() {
        return this.getValue("overlay") || this.getValue("underlay");
      };


      /**
       * Generate a string representation of the transformation.
       * @function Transformation#serialize
       * @return {string} Returns the transformation as a string
       */

      TransformationBase.prototype.serialize = function() {
        var paramList, ref, resultArray, t, transformationList, transformationString, transformations, value;
        resultArray = [];
        paramList = this.keys();
        transformations = (ref = this.get("transformation")) != null ? ref.serialize() : void 0;
        paramList = Util.without(paramList, "transformation");
        transformationList = (function() {
          var i, len, ref1, results;
          results = [];
          for (i = 0, len = paramList.length; i < len; i++) {
            t = paramList[i];
            results.push((ref1 = this.get(t)) != null ? ref1.serialize() : void 0);
          }
          return results;
        }).call(this);
        switch (false) {
          case !Util.isString(transformations):
            transformationList.push(transformations);
            break;
          case !Util.isArray(transformations):
            resultArray = transformations;
        }
        transformationString = ((function() {
          var i, len, results;
          results = [];
          for (i = 0, len = transformationList.length; i < len; i++) {
            value = transformationList[i];
            if (Util.isArray(value) && !Util.isEmpty(value) || !Util.isArray(value) && value) {
              results.push(value);
            }
          }
          return results;
        })()).sort().join(',');
        if (!Util.isEmpty(transformationString)) {
          resultArray.push(transformationString);
        }
        return Util.compact(resultArray).join('/');
      };


      /**
       * Provide a list of all the valid transformation option names
       * @function Transformation#listNames
       * @private
       * @return {Array<string>} a array of all the valid option names
       */

      TransformationBase.prototype.listNames = function() {
        return this.methods;
      };


      /**
       * Returns attributes for an HTML tag.
       * @function Cloudinary.toHtmlAttributes
       * @return PlainObject
       */

      TransformationBase.prototype.toHtmlAttributes = function() {
        var height, i, j, k, key, len, len1, options, ref, ref1, ref2, ref3, ref4, value, width;
        options = {};
        ref = this.otherOptions;
        for (key in ref) {
          value = ref[key];
          if (!Util.contains(this.PARAM_NAMES, key)) {
            options[key] = value;
          }
        }
        ref1 = Util.difference(this.keys(), this.PARAM_NAMES);
        for (i = 0, len = ref1.length; i < len; i++) {
          key = ref1[i];
          options[key] = this.get(key).value;
        }
        ref2 = this.keys();
        for (j = 0, len1 = ref2.length; j < len1; j++) {
          k = ref2[j];
          if (/^html_/.exec(k)) {
            options[k.substr(5)] = this.getValue(k);
          }
        }
        if (!(this.hasLayer() || this.getValue("angle") || Util.contains(["fit", "limit", "lfill"], this.getValue("crop")))) {
          width = (ref3 = this.get("width")) != null ? ref3.origValue : void 0;
          height = (ref4 = this.get("height")) != null ? ref4.origValue : void 0;
          if (parseFloat(width) >= 1.0) {
            if (options['width'] == null) {
              options['width'] = width;
            }
          }
          if (parseFloat(height) >= 1.0) {
            if (options['height'] == null) {
              options['height'] = height;
            }
          }
        }
        return options;
      };

      TransformationBase.prototype.isValidParamName = function(name) {
        return this.methods.indexOf(Util.camelCase(name)) >= 0;
      };


      /**
       * Delegate to the parent (up the call chain) to produce HTML
       * @function Transformation#toHtml
       * @return {string} HTML representation of the parent if possible.
       * @example
       * tag = cloudinary.ImageTag.new("sample", {cloud_name: "demo"})
       * // ImageTag {name: "img", publicId: "sample"}
       * tag.toHtml()
       * // <img src="http://res.cloudinary.com/demo/image/upload/sample">
       * tag.transformation().crop("fit").width(300).toHtml()
       * // <img src="http://res.cloudinary.com/demo/image/upload/c_fit,w_300/sample">
       */

      TransformationBase.prototype.toHtml = function() {
        var ref;
        return (ref = this.getParent()) != null ? typeof ref.toHtml === "function" ? ref.toHtml() : void 0 : void 0;
      };

      TransformationBase.prototype.toString = function() {
        return this.serialize();
      };

      return TransformationBase;

    })();
    return Transformation = (function(superClass) {
      extend(Transformation, superClass);


      /**
       *  Represents a single transformation.
       *  @class Transformation
       *  @example
       *  t = new cloudinary.Transformation();
       * t.angle(20).crop("scale").width("auto");
       *
       * // or
       *
       * t = new cloudinary.Transformation( {angle: 20, crop: "scale", width: "auto"});
       */

      function Transformation(options) {
        if (options == null) {
          options = {};
        }
        Transformation.__super__.constructor.call(this, options);
      }


      /**
       * Convenience constructor
       * @param {Object} options
       * @return {Transformation}
       * @example cl = cloudinary.Transformation.new( {angle: 20, crop: "scale", width: "auto"})
       */

      Transformation["new"] = function(args) {
        return new Transformation(args);
      };


      /*
        Transformation Parameters
       */

      Transformation.prototype.angle = function(value) {
        return this.arrayParam(value, "angle", "a", ".");
      };

      Transformation.prototype.audioCodec = function(value) {
        return this.param(value, "audio_codec", "ac");
      };

      Transformation.prototype.audioFrequency = function(value) {
        return this.param(value, "audio_frequency", "af");
      };

      Transformation.prototype.aspectRatio = function(value) {
        return this.param(value, "aspect_ratio", "ar");
      };

      Transformation.prototype.background = function(value) {
        return this.param(value, "background", "b", Param.norm_color);
      };

      Transformation.prototype.bitRate = function(value) {
        return this.param(value, "bit_rate", "br");
      };

      Transformation.prototype.border = function(value) {
        return this.param(value, "border", "bo", function(border) {
          if (Util.isPlainObject(border)) {
            border = Util.assign({}, {
              color: "black",
              width: 2
            }, border);
            return border.width + "px_solid_" + (Param.norm_color(border.color));
          } else {
            return border;
          }
        });
      };

      Transformation.prototype.color = function(value) {
        return this.param(value, "color", "co", Param.norm_color);
      };

      Transformation.prototype.colorSpace = function(value) {
        return this.param(value, "color_space", "cs");
      };

      Transformation.prototype.crop = function(value) {
        return this.param(value, "crop", "c");
      };

      Transformation.prototype.defaultImage = function(value) {
        return this.param(value, "default_image", "d");
      };

      Transformation.prototype.delay = function(value) {
        return this.param(value, "delay", "l");
      };

      Transformation.prototype.density = function(value) {
        return this.param(value, "density", "dn");
      };

      Transformation.prototype.duration = function(value) {
        return this.rangeParam(value, "duration", "du");
      };

      Transformation.prototype.dpr = function(value) {
        return this.param(value, "dpr", "dpr", function(dpr) {
          dpr = dpr.toString();
          if (dpr === "auto") {
            return "1.0";
          } else if (dpr != null ? dpr.match(/^\d+$/) : void 0) {
            return dpr + ".0";
          } else {
            return dpr;
          }
        });
      };

      Transformation.prototype.effect = function(value) {
        return this.arrayParam(value, "effect", "e", ":");
      };

      Transformation.prototype.endOffset = function(value) {
        return this.rangeParam(value, "end_offset", "eo");
      };

      Transformation.prototype.fallbackContent = function(value) {
        return this.param(value, "fallback_content");
      };

      Transformation.prototype.fetchFormat = function(value) {
        return this.param(value, "fetch_format", "f");
      };

      Transformation.prototype.format = function(value) {
        return this.param(value, "format");
      };

      Transformation.prototype.flags = function(value) {
        return this.arrayParam(value, "flags", "fl", ".");
      };

      Transformation.prototype.gravity = function(value) {
        return this.param(value, "gravity", "g");
      };

      Transformation.prototype.height = function(value) {
        return this.param(value, "height", "h", (function(_this) {
          return function() {
            if (_this.getValue("crop") || _this.getValue("overlay") || _this.getValue("underlay")) {
              return value;
            } else {
              return null;
            }
          };
        })(this));
      };

      Transformation.prototype.htmlHeight = function(value) {
        return this.param(value, "html_height");
      };

      Transformation.prototype.htmlWidth = function(value) {
        return this.param(value, "html_width");
      };

      Transformation.prototype.offset = function(value) {
        var end_o, ref, start_o;
        ref = Util.isFunction(value != null ? value.split : void 0) ? value.split('..') : Util.isArray(value) ? value : [null, null], start_o = ref[0], end_o = ref[1];
        if (start_o != null) {
          this.startOffset(start_o);
        }
        if (end_o != null) {
          return this.endOffset(end_o);
        }
      };

      Transformation.prototype.opacity = function(value) {
        return this.param(value, "opacity", "o");
      };

      Transformation.prototype.overlay = function(value) {
        return this.param(value, "overlay", "l");
      };

      Transformation.prototype.page = function(value) {
        return this.param(value, "page", "pg");
      };

      Transformation.prototype.poster = function(value) {
        return this.param(value, "poster");
      };

      Transformation.prototype.prefix = function(value) {
        return this.param(value, "prefix", "p");
      };

      Transformation.prototype.quality = function(value) {
        return this.param(value, "quality", "q");
      };

      Transformation.prototype.radius = function(value) {
        return this.param(value, "radius", "r");
      };

      Transformation.prototype.rawTransformation = function(value) {
        return this.rawParam(value, "raw_transformation");
      };

      Transformation.prototype.size = function(value) {
        var height, ref, width;
        if (Util.isFunction(value != null ? value.split : void 0)) {
          ref = value.split('x'), width = ref[0], height = ref[1];
          this.width(width);
          return this.height(height);
        }
      };

      Transformation.prototype.sourceTypes = function(value) {
        return this.param(value, "source_types");
      };

      Transformation.prototype.sourceTransformation = function(value) {
        return this.param(value, "source_transformation");
      };

      Transformation.prototype.startOffset = function(value) {
        return this.rangeParam(value, "start_offset", "so");
      };

      Transformation.prototype.transformation = function(value) {
        return this.transformationParam(value, "transformation", "t");
      };

      Transformation.prototype.underlay = function(value) {
        return this.param(value, "underlay", "u");
      };

      Transformation.prototype.videoCodec = function(value) {
        return this.param(value, "video_codec", "vc", Param.process_video_params);
      };

      Transformation.prototype.videoSampling = function(value) {
        return this.param(value, "video_sampling", "vs");
      };

      Transformation.prototype.width = function(value) {
        return this.param(value, "width", "w", (function(_this) {
          return function() {
            if (_this.getValue("crop") || _this.getValue("overlay") || _this.getValue("underlay")) {
              return value;
            } else {
              return null;
            }
          };
        })(this));
      };

      Transformation.prototype.x = function(value) {
        return this.param(value, "x", "x");
      };

      Transformation.prototype.y = function(value) {
        return this.param(value, "y", "y");
      };

      Transformation.prototype.zoom = function(value) {
        return this.param(value, "zoom", "z");
      };

      return Transformation;

    })(TransformationBase);
  });

}).call(this);

(function() {
  (function(root, factory) {
    if ((typeof define === 'function') && define.amd) {
      return define('tags/htmltag',['transformation', 'util'], factory);
    } else if (typeof exports === 'object') {
      return module.exports = factory(require('transformation'), require('util'));
    } else {
      root.cloudinary || (root.cloudinary = {});
      return root.cloudinary.HtmlTag = factory(root.cloudinary.Transformation, root.cloudinary.Util);
    }
  })(this, function(Transformation, Util) {
    var HtmlTag;
    return HtmlTag = (function() {

      /**
       * Represents an HTML (DOM) tag
       * @constructor HtmlTag
       * @param {string} name - the name of the tag
       * @param {string} [publicId]
       * @param {Object} options
       * @example tag = new HtmlTag( 'div', { 'width': 10})
       */
      var toAttribute;

      function HtmlTag(name, publicId, options) {
        var transformation;
        this.name = name;
        this.publicId = publicId;
        if (options == null) {
          if (Util.isPlainObject(publicId)) {
            options = publicId;
            this.publicId = void 0;
          } else {
            options = {};
          }
        }
        transformation = new Transformation(options);
        transformation.setParent(this);
        this.transformation = function() {
          return transformation;
        };
      }


      /**
       * Convenience constructor
       * Creates a new instance of an HTML (DOM) tag
       * @function HtmlTag.new
       * @param {string} name - the name of the tag
       * @param {string} [publicId]
       * @param {Object} options
       * @return {HtmlTag}
       * @example tag = HtmlTag.new( 'div', { 'width': 10})
       */

      HtmlTag["new"] = function(name, publicId, options) {
        return new this(name, publicId, options);
      };


      /**
       * Represent the given key and value as an HTML attribute.
       * @function HtmlTag#toAttribute
       * @protected
       * @param {string} key - attribute name
       * @param {*|boolean} value - the value of the attribute. If the value is boolean `true`, return the key only.
       * @returns {string} the attribute
       *
       */

      toAttribute = function(key, value) {
        if (!value) {
          return void 0;
        } else if (value === true) {
          return key;
        } else {
          return key + "=\"" + value + "\"";
        }
      };


      /**
       * combine key and value from the `attr` to generate an HTML tag attributes string.
       * `Transformation::toHtmlTagOptions` is used to filter out transformation and configuration keys.
       * @protected
       * @param {Object} attrs
       * @return {string} the attributes in the format `'key1="value1" key2="value2"'`
       * @ignore
       */

      HtmlTag.prototype.htmlAttrs = function(attrs) {
        var key, pairs, value;
        return pairs = ((function() {
          var results;
          results = [];
          for (key in attrs) {
            value = attrs[key];
            if (value) {
              results.push(toAttribute(key, value));
            }
          }
          return results;
        })()).sort().join(' ');
      };


      /**
       * Get all options related to this tag.
       * @function HtmlTag#getOptions
       * @returns {Object} the options
       *
       */

      HtmlTag.prototype.getOptions = function() {
        return this.transformation().toOptions();
      };


      /**
       * Get the value of option `name`
       * @function HtmlTag#getOption
       * @param {string} name - the name of the option
       * @returns {*} Returns the value of the option
       *
       */

      HtmlTag.prototype.getOption = function(name) {
        return this.transformation().getValue(name);
      };


      /**
       * Get the attributes of the tag.
       * @function HtmlTag#attributes
       * @returns {Object} attributes
       */

      HtmlTag.prototype.attributes = function() {
        return this.transformation().toHtmlAttributes();
      };


      /**
       * Set a tag attribute named `name` to `value`
       * @function HtmlTag#setAttr
       * @param {string} name - the name of the attribute
       * @param {string} value - the value of the attribute
       */

      HtmlTag.prototype.setAttr = function(name, value) {
        this.transformation().set("html_" + name, value);
        return this;
      };


      /**
       * Get the value of the tag attribute `name`
       * @function HtmlTag#getAttr
       * @param {string} name - the name of the attribute
       * @returns {*}
       */

      HtmlTag.prototype.getAttr = function(name) {
        return this.attributes()["html_" + name] || this.attributes()[name];
      };


      /**
       * Remove the tag attributed named `name`
       * @function HtmlTag#removeAttr
       * @param {string} name - the name of the attribute
       * @returns {*}
       */

      HtmlTag.prototype.removeAttr = function(name) {
        var ref;
        return (ref = this.transformation().remove("html_" + name)) != null ? ref : this.transformation().remove(name);
      };


      /**
       * @function HtmlTag#content
       * @protected
       * @ignore
       */

      HtmlTag.prototype.content = function() {
        return "";
      };


      /**
       * @function HtmlTag#openTag
       * @protected
       * @ignore
       */

      HtmlTag.prototype.openTag = function() {
        return "<" + this.name + " " + (this.htmlAttrs(this.attributes())) + ">";
      };


      /**
       * @function HtmlTag#closeTag
       * @protected
       * @ignore
       */

      HtmlTag.prototype.closeTag = function() {
        return "</" + this.name + ">";
      };


      /**
       * Generates an HTML representation of the tag.
       * @function HtmlTag#toHtml
       * @returns {string} Returns HTML in string format
       */

      HtmlTag.prototype.toHtml = function() {
        return this.openTag() + this.content() + this.closeTag();
      };


      /**
       * Creates a DOM object representing the tag.
       * @function HtmlTag#toDOM
       * @returns {Element}
       */

      HtmlTag.prototype.toDOM = function() {
        var element, name, ref, value;
        if (!Util.isFunction(typeof document !== "undefined" && document !== null ? document.createElement : void 0)) {
          throw "Can't create DOM if document is not present!";
        }
        element = document.createElement(this.name);
        ref = this.attributes();
        for (name in ref) {
          value = ref[name];
          element[name] = value;
        }
        return element;
      };

      return HtmlTag;

    })();
  });

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  (function(root, factory) {
    if ((typeof define === 'function') && define.amd) {
      return define('tags/videotag',['tags/htmltag', 'util', 'cloudinary', 'require'], factory);
    } else if (typeof exports === 'object') {
      return module.exports = factory(require('tags/htmltag'), require('util'), require('cloudinary'), require);
    } else {
      root.cloudinary || (root.cloudinary = {});
      return root.cloudinary.VideoTag = factory(root.cloudinary.HtmlTag, root.cloudinary.Util, root.cloudinary.Cloudinary, function() {
        return root.cloudinary.Cloudinary;
      });
    }
  })(this, function(HtmlTag, Util, Cloudinary, require) {
    var VideoTag;
    return VideoTag = (function(superClass) {
      var DEFAULT_POSTER_OPTIONS, DEFAULT_VIDEO_SOURCE_TYPES, VIDEO_TAG_PARAMS;

      extend(VideoTag, superClass);

      VIDEO_TAG_PARAMS = ['source_types', 'source_transformation', 'fallback_content', 'poster'];

      DEFAULT_VIDEO_SOURCE_TYPES = ['webm', 'mp4', 'ogv'];

      DEFAULT_POSTER_OPTIONS = {
        format: 'jpg',
        resource_type: 'video'
      };


      /**
       * Creates an HTML (DOM) Video tag using Cloudinary as the source.
       * @constructor VideoTag
       * @extends HtmlTag
       * @param {string} [publicId]
       * @param {Object} [options]
       */

      function VideoTag(publicId, options) {
        if (options == null) {
          options = {};
        }
        Cloudinary || (Cloudinary = require('cloudinary'));
        options = Util.defaults({}, options, Cloudinary.DEFAULT_VIDEO_PARAMS);
        VideoTag.__super__.constructor.call(this, "video", publicId.replace(/\.(mp4|ogv|webm)$/, ''), options);
      }


      /**
       * Set the transformation to apply on each source
       * @function VideoTag#setSourceTransformation
       * @param {Object} an object with pairs of source type and source transformation
       * @returns {VideoTag} Returns this instance for chaining purposes.
       */

      VideoTag.prototype.setSourceTransformation = function(value) {
        this.transformation().sourceTransformation(value);
        return this;
      };


      /**
       * Set the source types to include in the video tag
       * @function VideoTag#setSourceTypes
       * @param {Array<string>} an array of source types
       * @returns {VideoTag} Returns this instance for chaining purposes.
       */

      VideoTag.prototype.setSourceTypes = function(value) {
        this.transformation().sourceTypes(value);
        return this;
      };


      /**
       * Set the poster to be used in the video tag
       * @function VideoTag#setPoster
       * @param {string|Object} value
       * - string: a URL to use for the poster
       * - Object: transformation parameters to apply to the poster. May optionally include a public_id to use instead of the video public_id.
       * @returns {VideoTag} Returns this instance for chaining purposes.
       */

      VideoTag.prototype.setPoster = function(value) {
        this.transformation().poster(value);
        return this;
      };


      /**
       * Set the content to use as fallback in the video tag
       * @function VideoTag#setFallbackContent
       * @param {string} value - the content to use, in HTML format
       * @returns {VideoTag} Returns this instance for chaining purposes.
       */

      VideoTag.prototype.setFallbackContent = function(value) {
        this.transformation().fallbackContent(value);
        return this;
      };

      VideoTag.prototype.content = function() {
        var cld, fallback, innerTags, mimeType, sourceTransformation, sourceTypes, src, srcType, transformation, videoType;
        sourceTypes = this.transformation().getValue('source_types');
        sourceTransformation = this.transformation().getValue('source_transformation');
        fallback = this.transformation().getValue('fallback_content');
        Cloudinary || (Cloudinary = require('cloudinary'));
        if (Util.isArray(sourceTypes)) {
          cld = new Cloudinary(this.getOptions());
          innerTags = (function() {
            var i, len, results;
            results = [];
            for (i = 0, len = sourceTypes.length; i < len; i++) {
              srcType = sourceTypes[i];
              transformation = sourceTransformation[srcType] || {};
              src = cld.url("" + this.publicId, Util.defaults({}, transformation, {
                resource_type: 'video',
                format: srcType
              }));
              videoType = srcType === 'ogv' ? 'ogg' : srcType;
              mimeType = 'video/' + videoType;
              results.push("<source " + (this.htmlAttrs({
                src: src,
                type: mimeType
              })) + ">");
            }
            return results;
          }).call(this);
        } else {
          innerTags = [];
        }
        return innerTags.join('') + fallback;
      };

      VideoTag.prototype.attributes = function() {
        var a, attr, defaults, i, len, poster, ref, ref1, sourceTypes;
        Cloudinary || (Cloudinary = require('cloudinary'));
        sourceTypes = this.getOption('source_types');
        poster = (ref = this.getOption('poster')) != null ? ref : {};
        if (Util.isPlainObject(poster)) {
          defaults = poster.public_id != null ? Cloudinary.DEFAULT_IMAGE_PARAMS : DEFAULT_POSTER_OPTIONS;
          poster = new Cloudinary(this.getOptions()).url((ref1 = poster.public_id) != null ? ref1 : this.publicId, Util.defaults({}, poster, defaults));
        }
        attr = VideoTag.__super__.attributes.call(this) || [];
        for (i = 0, len = attr.length; i < len; i++) {
          a = attr[i];
          if (!Util.contains(VIDEO_TAG_PARAMS)) {
            attr = a;
          }
        }
        if (!Util.isArray(sourceTypes)) {
          attr["src"] = new Cloudinary(this.getOptions()).url(this.publicId, {
            resource_type: 'video',
            format: sourceTypes
          });
        }
        if (poster != null) {
          attr["poster"] = poster;
        }
        return attr;
      };

      return VideoTag;

    })(HtmlTag);
  });

}).call(this);

(function() {
  (function(root, factory) {
    var require;
    if ((typeof define === 'function') && define.amd) {
      return define('cloudinary',['utf8_encode', 'crc32', 'util', 'transformation', 'configuration', 'tags/imagetag', 'tags/videotag', 'require'], factory);
    } else if (typeof exports === 'object') {
      return module.exports = factory(require('utf8_encode'), require('crc32'), require('util'), require('transformation'), require('configuration'), require('tags/imagetag'), require('tags/videotag'), require);
    } else {
      root.cloudinary || (root.cloudinary = {});

      /**
       * Resolves circular dependency
       * @private
       */
      require = function(name) {
        switch (name) {
          case 'tags/imagetag':
            return root.cloudinary.ImageTag;
          case 'tags/videotag':
            return root.cloudinary.VideoTag;
        }
      };
      return root.cloudinary.Cloudinary = factory(root.cloudinary.utf8_encode, root.cloudinary.crc32, root.cloudinary.Util, root.cloudinary.Transformation, root.cloudinary.Configuration, root.cloudinary.ImageTag, root.cloudinary.VideoTag, require);
    }
  })(this, function(utf8_encode, crc32, Util, Transformation, Configuration, ImageTag, VideoTag, require) {

    /**
     * Main Cloudinary class
     */
    var Cloudinary;
    return Cloudinary = (function() {
      var AKAMAI_SHARED_CDN, CF_SHARED_CDN, DEFAULT_POSTER_OPTIONS, DEFAULT_VIDEO_SOURCE_TYPES, OLD_AKAMAI_SHARED_CDN, SHARED_CDN, VERSION, absolutize, applyBreakpoints, cdnSubdomainNumber, closestAbove, cloudinaryUrlPrefix, defaultBreakpoints, finalizeResourceType, parentWidth;

      VERSION = "2.0.5";

      CF_SHARED_CDN = "d3jpl91pxevbkh.cloudfront.net";

      OLD_AKAMAI_SHARED_CDN = "cloudinary-a.akamaihd.net";

      AKAMAI_SHARED_CDN = "res.cloudinary.com";

      SHARED_CDN = AKAMAI_SHARED_CDN;

      DEFAULT_POSTER_OPTIONS = {
        format: 'jpg',
        resource_type: 'video'
      };

      DEFAULT_VIDEO_SOURCE_TYPES = ['webm', 'mp4', 'ogv'];


      /**
      * @const {Object} Cloudinary.DEFAULT_IMAGE_PARAMS
      * Defaults values for image parameters.
      *
      * (Previously defined using option_consume() )
       */

      Cloudinary.DEFAULT_IMAGE_PARAMS = {
        resource_type: "image",
        transformation: [],
        type: 'upload'
      };


      /**
      * Defaults values for video parameters.
      * @const {Object} Cloudinary.DEFAULT_VIDEO_PARAMS
      * (Previously defined using option_consume() )
       */

      Cloudinary.DEFAULT_VIDEO_PARAMS = {
        fallback_content: '',
        resource_type: "video",
        source_transformation: {},
        source_types: DEFAULT_VIDEO_SOURCE_TYPES,
        transformation: [],
        type: 'upload'
      };


      /**
       * Main Cloudinary class
       * @class Cloudinary
       * @param {Object} options - options to configure Cloudinary
       * @see Configuration for more details
       * @example
       *var cl = new cloudinary.Cloudinary( { cloud_name: "mycloud"});
       *var imgTag = cl.image("myPicID");
       */

      function Cloudinary(options) {
        var configuration;
        this.devicePixelRatioCache = {};
        this.responsiveConfig = {};
        this.responsiveResizeInitialized = false;
        configuration = new Configuration(options);
        this.config = function(newConfig, newValue) {
          return configuration.config(newConfig, newValue);
        };

        /**
         * Use \<meta\> tags in the document to configure this Cloudinary instance.
         * @return {Cloudinary} this for chaining
         */
        this.fromDocument = function() {
          configuration.fromDocument();
          return this;
        };

        /**
         * Use environment variables to configure this Cloudinary instance.
         * @return {Cloudinary} this for chaining
         */
        this.fromEnvironment = function() {
          configuration.fromEnvironment();
          return this;
        };

        /**
         * Initialize configuration.
         * @function Cloudinary#init
         * @see Configuration#init
         * @return {Cloudinary} this for chaining
         */
        this.init = function() {
          configuration.init();
          return this;
        };
      }


      /**
       * Convenience constructor
       * @param {Object} options
       * @return {Cloudinary}
       * @example cl = cloudinary.Cloudinary.new( { cloud_name: "mycloud"})
       */

      Cloudinary["new"] = function(options) {
        return new this(options);
      };


      /**
       * Return the resource type and action type based on the given configuration
       * @function Cloudinary#finalizeResourceType
       * @param {Object|string} resourceType
       * @param {string} [type='upload']
       * @param {string} [urlSuffix]
       * @param {boolean} [useRootPath]
       * @param {boolean} [shorten]
       * @returns {string} resource_type/type
       * @ignore
       */

      finalizeResourceType = function(resourceType, type, urlSuffix, useRootPath, shorten) {
        var options;
        if (Util.isPlainObject(resourceType)) {
          options = resourceType;
          resourceType = options.resource_type;
          type = options.type;
          urlSuffix = options.url_suffix;
          useRootPath = options.use_root_path;
          shorten = options.shorten;
        }
        if (type == null) {
          type = 'upload';
        }
        if (urlSuffix != null) {
          if (resourceType === 'image' && type === 'upload') {
            resourceType = "images";
            type = null;
          } else if (resourceType === 'raw' && type === 'upload') {
            resourceType = 'files';
            type = null;
          } else {
            throw new Error("URL Suffix only supported for image/upload and raw/upload");
          }
        }
        if (useRootPath) {
          if (resourceType === 'image' && type === 'upload' || resourceType === "images") {
            resourceType = null;
            type = null;
          } else {
            throw new Error("Root path only supported for image/upload");
          }
        }
        if (shorten && resourceType === 'image' && type === 'upload') {
          resourceType = 'iu';
          type = null;
        }
        return [resourceType, type].join("/");
      };

      absolutize = function(url) {
        var prefix;
        if (!url.match(/^https?:\//)) {
          prefix = document.location.protocol + '//' + document.location.host;
          if (url[0] === '?') {
            prefix += document.location.pathname;
          } else if (url[0] !== '/') {
            prefix += document.location.pathname.replace(/\/[^\/]*$/, '/');
          }
          url = prefix + url;
        }
        return url;
      };


      /**
       * Generate an resource URL.
       * @function Cloudinary#url
       * @param {string} publicId - the public ID of the resource
       * @param {Object} [options] - options for the tag and transformations, possible values include all {@link Transformation} parameters
       *                          and {@link Configuration} parameters
       * @param {string} [options.type='upload'] - the classification of the resource
       * @param {Object} [options.resource_type='image'] - the type of the resource
       * @return {string} The resource URL
       */

      Cloudinary.prototype.url = function(publicId, options) {
        var prefix, ref, resourceTypeAndType, transformation, transformationString, url, version;
        if (options == null) {
          options = {};
        }
        if (!publicId) {
          return publicId;
        }
        options = Util.defaults({}, options, this.config(), Cloudinary.DEFAULT_IMAGE_PARAMS);
        if (options.type === 'fetch') {
          options.fetch_format = options.fetch_format || options.format;
          publicId = absolutize(publicId);
        }
        transformation = new Transformation(options);
        transformationString = transformation.serialize();
        if (!options.cloud_name) {
          throw 'Unknown cloud_name';
        }
        if (options.url_suffix && !options.private_cdn) {
          throw 'URL Suffix only supported in private CDN';
        }
        if (publicId.search('/') >= 0 && !publicId.match(/^v[0-9]+/) && !publicId.match(/^https?:\//) && !((ref = options.version) != null ? ref.toString() : void 0)) {
          options.version = 1;
        }
        if (publicId.match(/^https?:/)) {
          if (options.type === 'upload' || options.type === 'asset') {
            url = publicId;
          } else {
            publicId = encodeURIComponent(publicId).replace(/%3A/g, ':').replace(/%2F/g, '/');
          }
        } else {
          publicId = encodeURIComponent(decodeURIComponent(publicId)).replace(/%3A/g, ':').replace(/%2F/g, '/');
          if (options.url_suffix) {
            if (options.url_suffix.match(/[\.\/]/)) {
              throw 'url_suffix should not include . or /';
            }
            publicId = publicId + '/' + options.url_suffix;
          }
          if (options.format) {
            if (!options.trust_public_id) {
              publicId = publicId.replace(/\.(jpg|png|gif|webp)$/, '');
            }
            publicId = publicId + '.' + options.format;
          }
        }
        prefix = cloudinaryUrlPrefix(publicId, options);
        resourceTypeAndType = finalizeResourceType(options.resource_type, options.type, options.url_suffix, options.use_root_path, options.shorten);
        version = options.version ? 'v' + options.version : '';
        return url || Util.compact([prefix, resourceTypeAndType, transformationString, version, publicId]).join('/').replace(/([^:])\/+/g, '$1/');
      };


      /**
       * Generate an video resource URL.
       * @function Cloudinary#video_url
       * @param {string} publicId - the public ID of the resource
       * @param {Object} [options] - options for the tag and transformations, possible values include all {@link Transformation} parameters
       *                          and {@link Configuration} parameters
       * @param {string} [options.type='upload'] - the classification of the resource
       * @return {string} The video URL
       */

      Cloudinary.prototype.video_url = function(publicId, options) {
        options = Util.assign({
          resource_type: 'video'
        }, options);
        return this.url(publicId, options);
      };


      /**
       * Generate an video thumbnail URL.
       * @function Cloudinary#video_thumbnail_url
       * @param {string} publicId - the public ID of the resource
       * @param {Object} [options] - options for the tag and transformations, possible values include all {@link Transformation} parameters
       *                          and {@link Configuration} parameters
       * @param {string} [options.type='upload'] - the classification of the resource
       * @return {string} The video thumbnail URL
       */

      Cloudinary.prototype.video_thumbnail_url = function(publicId, options) {
        options = Util.assign({}, DEFAULT_POSTER_OPTIONS, options);
        return this.url(publicId, options);
      };


      /**
       * Generate a string representation of the provided transformation options.
       * @function Cloudinary#transformation_string
       * @param {Object} options - the transformation options
       * @returns {string} The transformation string
       */

      Cloudinary.prototype.transformation_string = function(options) {
        return new Transformation(options).serialize();
      };


      /**
       * Generate an image tag.
       * @function Cloudinary#image
       * @param {string} publicId - the public ID of the image
       * @param {Object} [options] - options for the tag and transformations
       * @return {HTMLImageElement} an image tag element
       */

      Cloudinary.prototype.image = function(publicId, options) {
        var img, tag_options;
        if (options == null) {
          options = {};
        }
        tag_options = Util.assign({
          src: ''
        }, options);
        img = this.imageTag(publicId, tag_options).toDOM();
        Util.setData(img, 'src-cache', this.url(publicId, options));
        this.cloudinary_update(img, options);
        return img;
      };


      /**
       * Creates a new ImageTag instance, configured using this own's configuration.
       * @function Cloudinary#imageTag
       * @param {string} publicId - the public ID of the resource
       * @param {Object} options - additional options to pass to the new ImageTag instance
       * @return {ImageTag} An ImageTag that is attached (chained) to this Cloudinary instance
       */

      Cloudinary.prototype.imageTag = function(publicId, options) {
        options = Util.defaults({}, options, this.config());
        ImageTag || (ImageTag = require('tags/imagetag'));
        return new ImageTag(publicId, options);
      };


      /**
       * Generate an image tag for the video thumbnail.
       * @function Cloudinary#video_thumbnail
       * @param {string} publicId - the public ID of the video
       * @param {Object} [options] - options for the tag and transformations
       * @return {HTMLImageElement} An image tag element
       */

      Cloudinary.prototype.video_thumbnail = function(publicId, options) {
        return this.image(publicId, Util.merge({}, DEFAULT_POSTER_OPTIONS, options));
      };


      /**
       * @function Cloudinary#facebook_profile_image
       * @param {string} publicId - the public ID of the image
       * @param {Object} [options] - options for the tag and transformations
       * @return {HTMLImageElement} an image tag element
       */

      Cloudinary.prototype.facebook_profile_image = function(publicId, options) {
        return this.image(publicId, Util.assign({
          type: 'facebook'
        }, options));
      };


      /**
       * @function Cloudinary#twitter_profile_image
       * @param {string} publicId - the public ID of the image
       * @param {Object} [options] - options for the tag and transformations
       * @return {HTMLImageElement} an image tag element
       */

      Cloudinary.prototype.twitter_profile_image = function(publicId, options) {
        return this.image(publicId, Util.assign({
          type: 'twitter'
        }, options));
      };


      /**
       * @function Cloudinary#twitter_name_profile_image
       * @param {string} publicId - the public ID of the image
       * @param {Object} [options] - options for the tag and transformations
       * @return {HTMLImageElement} an image tag element
       */

      Cloudinary.prototype.twitter_name_profile_image = function(publicId, options) {
        return this.image(publicId, Util.assign({
          type: 'twitter_name'
        }, options));
      };


      /**
       * @function Cloudinary#gravatar_image
       * @param {string} publicId - the public ID of the image
       * @param {Object} [options] - options for the tag and transformations
       * @return {HTMLImageElement} an image tag element
       */

      Cloudinary.prototype.gravatar_image = function(publicId, options) {
        return this.image(publicId, Util.assign({
          type: 'gravatar'
        }, options));
      };


      /**
       * @function Cloudinary#fetch_image
       * @param {string} publicId - the public ID of the image
       * @param {Object} [options] - options for the tag and transformations
       * @return {HTMLImageElement} an image tag element
       */

      Cloudinary.prototype.fetch_image = function(publicId, options) {
        return this.image(publicId, Util.assign({
          type: 'fetch'
        }, options));
      };


      /**
       * @function Cloudinary#video
       * @param {string} publicId - the public ID of the image
       * @param {Object} [options] - options for the tag and transformations
       * @return {HTMLImageElement} an image tag element
       */

      Cloudinary.prototype.video = function(publicId, options) {
        if (options == null) {
          options = {};
        }
        return this.videoTag(publicId, options).toHtml();
      };


      /**
       * Creates a new VideoTag instance, configured using this own's configuration.
       * @function Cloudinary#videoTag
       * @param {string} publicId - the public ID of the resource
       * @param {Object} options - additional options to pass to the new VideoTag instance
       * @return {VideoTag} A VideoTag that is attached (chained) to this Cloudinary instance
       */

      Cloudinary.prototype.videoTag = function(publicId, options) {
        VideoTag || (VideoTag = require('tags/videotag'));
        options = Util.defaults({}, options, this.config());
        return new VideoTag(publicId, options);
      };


      /**
       * Generate the URL of the sprite image
       * @function Cloudinary#sprite_css
       * @param {string} publicId - the public ID of the resource
       * @param {Object} [options] - options for the tag and transformations
       * @see {@link http://cloudinary.com/documentation/sprite_generation Sprite generation}
       */

      Cloudinary.prototype.sprite_css = function(publicId, options) {
        options = Util.assign({
          type: 'sprite'
        }, options);
        if (!publicId.match(/.css$/)) {
          options.format = 'css';
        }
        return this.url(publicId, options);
      };


      /**
       * @function Cloudinary#responsive
       */

      Cloudinary.prototype.responsive = function(options) {
        var ref, ref1, responsiveResize, timeout;
        this.responsiveConfig = Util.merge(this.responsiveConfig || {}, options);
        this.cloudinary_update('img.cld-responsive, img.cld-hidpi', this.responsiveConfig);
        responsiveResize = (ref = (ref1 = this.responsiveConfig['responsive_resize']) != null ? ref1 : this.config('responsive_resize')) != null ? ref : true;
        if (responsiveResize && !this.responsiveResizeInitialized) {
          this.responsiveConfig.resizing = this.responsiveResizeInitialized = true;
          timeout = null;
          return window.addEventListener('resize', (function(_this) {
            return function() {
              var debounce, ref2, ref3, reset, run, wait;
              debounce = (ref2 = (ref3 = _this.responsiveConfig['responsive_debounce']) != null ? ref3 : _this.config('responsive_debounce')) != null ? ref2 : 100;
              reset = function() {
                if (timeout) {
                  clearTimeout(timeout);
                  return timeout = null;
                }
              };
              run = function() {
                return _this.cloudinary_update('img.cld-responsive', _this.responsiveConfig);
              };
              wait = function() {
                reset();
                return setTimeout((function() {
                  reset();
                  return run();
                }), debounce);
              };
              if (debounce) {
                return wait();
              } else {
                return run();
              }
            };
          })(this));
        }
      };


      /**
       * @function Cloudinary#calc_breakpoint
       * @private
       * @ignore
       */

      Cloudinary.prototype.calc_breakpoint = function(element, width) {
        var breakpoints, point;
        breakpoints = Util.getData(element, 'breakpoints') || Util.getData(element, 'stoppoints') || this.config('breakpoints') || this.config('stoppoints') || defaultBreakpoints;
        if (Util.isFunction(breakpoints)) {
          return breakpoints(width);
        } else {
          if (Util.isString(breakpoints)) {
            breakpoints = ((function() {
              var j, len, ref, results;
              ref = breakpoints.split(',');
              results = [];
              for (j = 0, len = ref.length; j < len; j++) {
                point = ref[j];
                results.push(parseInt(point));
              }
              return results;
            })()).sort(function(a, b) {
              return a - b;
            });
          }
          return closestAbove(breakpoints, width);
        }
      };


      /**
       * @function Cloudinary#calc_stoppoint
       * @deprecated Use {@link calc_breakpoint} instead.
       * @private
       * @ignore
       */

      Cloudinary.prototype.calc_stoppoint = Cloudinary.prototype.calc_breakpoint;


      /**
       * @function Cloudinary#device_pixel_ratio
       */

      Cloudinary.prototype.device_pixel_ratio = function() {
        var dpr, dprString, dprUsed;
        dpr = (typeof window !== "undefined" && window !== null ? window.devicePixelRatio : void 0) || 1;
        dprString = this.devicePixelRatioCache[dpr];
        if (!dprString) {
          dprUsed = closestAbove(this.supported_dpr_values, dpr);
          dprString = dprUsed.toString();
          if (dprString.match(/^\d+$/)) {
            dprString += '.0';
          }
          this.devicePixelRatioCache[dpr] = dprString;
        }
        return dprString;
      };

      Cloudinary.prototype.supported_dpr_values = [0.75, 1.0, 1.3, 1.5, 2.0, 3.0];

      defaultBreakpoints = function(width) {
        return 10 * Math.ceil(width / 10);
      };

      closestAbove = function(list, value) {
        var i;
        i = list.length - 2;
        while (i >= 0 && list[i] >= value) {
          i--;
        }
        return list[i + 1];
      };

      cdnSubdomainNumber = function(publicId) {
        return crc32(publicId) % 5 + 1;
      };

      cloudinaryUrlPrefix = function(publicId, options) {
        var cdnPart, host, path, protocol, ref, subdomain;
        if (((ref = options.cloud_name) != null ? ref.indexOf("/") : void 0) === 0) {
          return '/res' + options.cloud_name;
        }
        protocol = "http://";
        cdnPart = "";
        subdomain = "res";
        host = ".cloudinary.com";
        path = "/" + options.cloud_name;
        if (options.protocol) {
          protocol = options.protocol + '//';
        }
        if (options.private_cdn) {
          cdnPart = options.cloud_name + "-";
          path = "";
        }
        if (options.cdn_subdomain) {
          subdomain = "res-" + cdnSubdomainNumber(publicId);
        }
        if (options.secure) {
          protocol = "https://";
          if (options.secure_cdn_subdomain === false) {
            subdomain = "res";
          }
          if ((options.secure_distribution != null) && options.secure_distribution !== OLD_AKAMAI_SHARED_CDN && options.secure_distribution !== SHARED_CDN) {
            cdnPart = "";
            subdomain = "";
            host = options.secure_distribution;
          }
        } else if (options.cname) {
          protocol = "http://";
          cdnPart = "";
          subdomain = options.cdn_subdomain ? 'a' + ((crc32(publicId) % 5) + 1) + '.' : '';
          host = options.cname;
        }
        return [protocol, cdnPart, subdomain, host, path].join("");
      };


      /**
      * Finds all `img` tags under each node and sets it up to provide the image through Cloudinary
      * @function Cloudinary#processImageTags
       */

      Cloudinary.prototype.processImageTags = function(nodes, options) {
        var images, imgOptions, node, publicId, url;
        if (options == null) {
          options = {};
        }
        options = Util.defaults({}, options, this.config());
        images = (function() {
          var j, len, ref, results;
          results = [];
          for (j = 0, len = nodes.length; j < len; j++) {
            node = nodes[j];
            if (!(((ref = node.tagName) != null ? ref.toUpperCase() : void 0) === 'IMG')) {
              continue;
            }
            imgOptions = Util.assign({
              width: node.getAttribute('width'),
              height: node.getAttribute('height'),
              src: node.getAttribute('src')
            }, options);
            publicId = imgOptions['source'] || imgOptions['src'];
            delete imgOptions['source'];
            delete imgOptions['src'];
            url = this.url(publicId, imgOptions);
            imgOptions = new Transformation(imgOptions).toHtmlAttributes();
            Util.setData(node, 'src-cache', url);
            node.setAttribute('width', imgOptions.width);
            results.push(node.setAttribute('height', imgOptions.height));
          }
          return results;
        }).call(this);
        this.cloudinary_update(images, options);
        return this;
      };

      applyBreakpoints = function(tag, width, options) {
        var ref, ref1, ref2, ref3, responsive_use_breakpoints;
        responsive_use_breakpoints = (ref = (ref1 = (ref2 = (ref3 = options['responsive_use_breakpoints']) != null ? ref3 : options['responsive_use_stoppoints']) != null ? ref2 : this.config('responsive_use_breakpoints')) != null ? ref1 : this.config('responsive_use_stoppoints')) != null ? ref : 'resize';
        if ((!responsive_use_breakpoints) || (responsive_use_breakpoints === 'resize' && !options.resizing)) {
          return width;
        } else {
          return this.calc_breakpoint(tag, width);
        }
      };

      parentWidth = function(element) {
        var containerWidth;
        containerWidth = 0;
        while (((element = element != null ? element.parentNode : void 0) instanceof Element) && !containerWidth) {
          containerWidth = Util.width(element);
        }
        return containerWidth;
      };


      /**
      * Update hidpi (dpr_auto) and responsive (w_auto) fields according to the current container size and the device pixel ratio.
      * Only images marked with the cld-responsive class have w_auto updated.
      * @function Cloudinary#cloudinary_update
      * @param {(Array|string|NodeList)} elements - the elements to modify
      * @param {Object} options
      * @param {boolean|string} [options.responsive_use_breakpoints='resize']
      *  - when `true`, always use breakpoints for width
      * - when `"resize"` use exact width on first render and breakpoints on resize (default)
      * - when `false` always use exact width
      * @param {boolean} [options.responsive] - if `true`, enable responsive on this element. Can be done by adding cld-responsive.
      * @param {boolean} [options.responsive_preserve_height] - if set to true, original css height is preserved.
      *   Should only be used if the transformation supports different aspect ratios.
       */

      Cloudinary.prototype.cloudinary_update = function(elements, options) {
        var containerWidth, imageWidth, j, len, ref, requestedWidth, setUrl, src, tag;
        if (options == null) {
          options = {};
        }
        elements = (function() {
          switch (false) {
            case !Util.isArray(elements):
              return elements;
            case elements.constructor.name !== "NodeList":
              return elements;
            case !Util.isString(elements):
              return document.querySelectorAll(elements);
            default:
              return [elements];
          }
        })();
        for (j = 0, len = elements.length; j < len; j++) {
          tag = elements[j];
          if (!((ref = tag.tagName) != null ? ref.match(/img/i) : void 0)) {
            continue;
          }
          setUrl = true;
          if (options.responsive) {
            Util.addClass(tag, "cld-responsive");
          }
          src = Util.getData(tag, 'src-cache') || Util.getData(tag, 'src');
          if (!Util.isEmpty(src)) {
            src = src.replace(/\bdpr_(1\.0|auto)\b/g, 'dpr_' + this.device_pixel_ratio());
            if (Util.hasClass(tag, 'cld-responsive') && /\bw_auto\b/.exec(src)) {
              containerWidth = parentWidth(tag);
              if (containerWidth !== 0) {
                requestedWidth = applyBreakpoints.call(this, tag, containerWidth, options);
                imageWidth = Util.getData(tag, 'width') || 0;
                if (requestedWidth > imageWidth) {
                  imageWidth = requestedWidth;
                }
                Util.setData(tag, 'width', requestedWidth);
                src = src.replace(/\bw_auto\b/g, 'w_' + imageWidth);
                Util.setAttribute(tag, 'width', null);
                if (!options.responsive_preserve_height) {
                  Util.setAttribute(tag, 'height', null);
                }
              } else {
                setUrl = false;
              }
            }
            if (setUrl) {
              Util.setAttribute(tag, 'src', src);
            }
          }
        }
        return this;
      };


      /**
      * Provide a transformation object, initialized with own's options, for chaining purposes.
      * @function Cloudinary#transformation
      * @param {Object} options
      * @return {Transformation}
       */

      Cloudinary.prototype.transformation = function(options) {
        return Transformation["new"](this.config()).fromOptions(options).setParent(this);
      };

      return Cloudinary;

    })();
  });

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  (function(root, factory) {
    if ((typeof define === 'function') && define.amd) {
      return define('tags/imagetag',['tags/htmltag', 'cloudinary', 'require'], factory);
    } else if (typeof exports === 'object') {
      return module.exports = factory(require('tags/htmltag'), require('cloudinary'), require);
    } else {
      root.cloudinary || (root.cloudinary = {});
      return root.cloudinary.ImageTag = factory(root.cloudinary.HtmlTag, root.cloudinary.Cloudinary, function() {
        return root.cloudinary.Cloudinary;
      });
    }
  })(this, function(HtmlTag, Cloudinary, require) {
    var ImageTag;
    return ImageTag = (function(superClass) {
      extend(ImageTag, superClass);


      /**
       * Creates an HTML (DOM) Image tag using Cloudinary as the source.
       * @constructor ImageTag
       * @extends HtmlTag
       * @param {string} [publicId]
       * @param {Object} [options]
       */

      function ImageTag(publicId, options) {
        if (options == null) {
          options = {};
        }
        ImageTag.__super__.constructor.call(this, "img", publicId, options);
      }


      /** @override */

      ImageTag.prototype.closeTag = function() {
        return "";
      };


      /** @override */

      ImageTag.prototype.attributes = function() {
        var attr;
        Cloudinary || (Cloudinary = require('cloudinary'));
        attr = ImageTag.__super__.attributes.call(this) || [];
        if (attr['src'] == null) {
          attr['src'] = new Cloudinary(this.getOptions()).url(this.publicId);
        }
        return attr;
      };

      return ImageTag;

    })(HtmlTag);
  });

}).call(this);


/**
 * Creates the namespace for Cloudinary
 */

(function() {
  (function(root, factory) {
    if ((typeof define === 'function') && define.amd) {
      return define(['utf8_encode', 'crc32', 'util', 'transformation', 'configuration', 'tags/htmltag', 'tags/imagetag', 'tags/videotag', 'cloudinary'], factory);
    } else if (typeof exports === 'object') {
      return module.exports = factory(require('utf8_encode'), require('crc32'), require('util'), require('transformation'), require('configuration'), require('tags/htmltag'), require('tags/imagetag'), require('tags/videotag'), require('cloudinary'));
    } else {
      root.cloudinary || (root.cloudinary = {});
      return root.cloudinary = factory(root.cloudinary.utf8_encode, root.cloudinary.crc32, root.cloudinary.Util, root.cloudinary.Transformation, root.cloudinary.Configuration, root.cloudinary.HtmlTag, root.cloudinary.ImageTag, root.cloudinary.VideoTag, root.cloudinary.Cloudinary);
    }
  })(this, function(utf8_encode, crc32, Util, Transformation, Configuration, HtmlTag, ImageTag, VideoTag, Cloudinary) {
    return {
      utf8_encode: utf8_encode,
      crc32: crc32,
      Util: Util,
      Transformation: Transformation,
      Configuration: Configuration,
      HtmlTag: HtmlTag,
      ImageTag: ImageTag,
      VideoTag: VideoTag,
      Cloudinary: Cloudinary
    };
  });

}).call(this);

