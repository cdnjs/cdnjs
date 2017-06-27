/*!
 * Platform.js <http://mths.be/platform>
 * Copyright 2010-2011 John-David Dalton <http://allyoucanleet.com/>
 * Available under MIT license <http://mths.be/mit>
 */
;(function(window) {

  /** Backup possible window/global object */
  var oldWin = window,

  /** Possible global object */
  thisBinding = this,

  /** Detect free variable `exports` */
  freeExports = typeof exports == 'object' && exports,

  /** Detect free variable `global` */
  freeGlobal = typeof global == 'object' && global && (global == global.global ? (window = global) : global),

  /** Used to resolve a value's internal [[Class]] */
  toString = {}.toString,

  /** Detect Java environment */
  java = /Java/.test(getClassOf(window.java)) && window.java,

  /** A character to represent alpha */
  alpha = java ? 'a' : '\u03b1',

  /** A character to represent beta */
  beta = java ? 'b' : '\u03b2',

  /** Browser document object */
  doc = window.document || {},

  /** Used to preserve a pristine reference */
  hasOwnProperty = {}.hasOwnProperty,

  /** Browser navigator object */
  nav = window.navigator || {},

  /** Previous platform object */
  old = window.platform,

  /** Browser user agent string */
  userAgent = nav.userAgent || 'unknown platform',

  /**
   * Detect Opera browser
   * http://www.howtocreate.co.uk/operaStuff/operaObject.html
   * http://dev.opera.com/articles/view/opera-mini-web-content-authoring-guidelines/#operamini
   */
  opera = window.operamini || window.opera,

  /** Opera regexp */
  reOpera = /Opera/,

  /** Opera [[Class]] */
  operaClass = reOpera.test(operaClass = getClassOf(opera)) ? operaClass : (opera = null);

  /*--------------------------------------------------------------------------*/

  /**
   * Capitalizes a string value.
   * @private
   * @param {String} string The string to capitalize.
   * @returns {String} The capitalized string.
   */
  function capitalize(string) {
    string = String(string);
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  /**
   * Camel cases a spaced separated string.
   * @private
   * @param {String} string The string to camel case.
   * @returns {String} The camel casesed string.
   */
  function camelCase(string) {
    return String(string).replace(/([a-z\d]) +([a-z])/ig, '$1$2');
  }

  /**
   * An iteration utility for arrays and objects.
   * Callbacks may terminate the loop by explicitly returning `false`.
   * @private
   * @param {Array|Object} object The object to iterate over.
   * @param {Function} callback The function called per iteration.
   * @returns {Array|Object} Returns the object iterated over.
   */
  function each(object, callback) {
    var index = -1,
        length = object.length;

    if (length == length >>> 0) {
      while (++index < length) {
        if (callback(object[index], index, object) === false) {
          break;
        }
      }
    } else {
      forIn(object, callback);
    }
    return object;
  }

  /**
   * Iterates over an object's own properties, executing the `callback` for each.
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} callback The function executed per own property.
   * @returns {Object} Returns the object iterated over.
   */
  function forIn(object, callback) {
    for (var key in object) {
      if (hasKey(object, key) &&
        callback(object[key], key, object) === false) {
        break;
      }
    }
    return object;
  }

  /**
   * Trim and conditionally capitalize string values.
   * @private
   * @param {String} string The string to format.
   * @returns {String} The formatted string.
   */
  function format(string) {
    string = trim(string);
    return /^(?:webOS|i(?:OS|P))/.test(string)
      ? string
      : capitalize(string);
  }

  /**
   * Gets the internal [[Class]] of a value.
   * @private
   * @param {Mixed} value The value.
   * @returns {String} The [[Class]].
   */
  function getClassOf(value) {
    return value == null
      ? capitalize(value)
      : toString.call(value).slice(8, -1);
  }

  /**
   * Checks if an object has the specified key as a direct property.
   * @private
   * @param {Object} object The object to check.
   * @param {String} key The key to check for.
   * @returns {Boolean} Returns `true` if key is a direct property, else `false`.
   */
  function hasKey(object, key) {
    var result,
        parent = (object.constructor || Object).prototype;

    // for modern browsers
    object = Object(object);
    if (getClassOf(hasOwnProperty) == 'Function') {
      result = hasOwnProperty.call(object, key);
    }
    // for Safari 2
    else if ({}.__proto__ == Object.prototype) {
      object.__proto__ = [object.__proto__, object.__proto__ = null, result = key in object][0];
    }
    // for others (not as accurate)
    else {
      result = key in object && !(key in parent && object[key] === parent[key]);
    }
    return result;
  }

  /**
   * Host objects can return type values that are different from their actual
   * data type. The objects we are concerned with usually return non-primitive
   * types of object, function, or unknown.
   * @private
   * @param {Mixed} object The owner of the property.
   * @param {String} property The property to check.
   * @returns {Boolean} Returns `true` if the property value is a non-primitive, else `false`.
   */
  function isHostType(object, property) {
    var type = object != null ? typeof object[property] : 'number';
    return !/^(?:boolean|number|string|undefined)$/.test(type) &&
      (type == 'object' ? !!object[property] : true);
  }

  /**
   * A bare-bones` Array#reduce` utility function.
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} callback The function called per iteration.
   * @param {Mixed} accumulator Initial value of the accumulator.
   * @returns {Mixed} The accumulator.
   */
  function reduce(array, callback) {
    var accumulator = null;
    each(array, function(value, index) {
      accumulator = callback(accumulator, value, index, array);
    });
    return accumulator;
  }

  /**
   * Removes leading and trailing whitespace from a string.
   * @private
   * @param {String} string The string to trim.
   * @returns {String} The trimmed string.
   */
  function trim(string) {
    return String(string).replace(/^ +| +$/g, '');
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Creates a new platform object.
   * @memberOf platform
   * @param {String} [ua = navigator.userAgent] The user agent string.
   * @returns {Object} A platform object.
   */
  function parse(ua) {

    ua || (ua = userAgent);

    /** Temporary variable used over the script's lifetime */
    var data = {},

    /** Platform description array */
    description = [],

    /** Platform alpha/beta indicator */
    prerelease = null,

    /** A flag to indicate that environment features should be used to resolve the platform */
    useFeatures = ua == userAgent,

    /** The browser/environment version */
    version = useFeatures && opera && typeof opera.version == 'function' && opera.version(),

    /* Detectable layout engines (order is important) */
    layout = getLayout([
      'WebKit',
      'iCab',
      'Presto',
      'NetFront',
      'Tasman',
      'Trident',
      'KHTML',
      'Gecko'
    ]),

    /* Detectable browser names (order is important) */
    name = getName([
      'Arora',
      'Avant Browser',
      'Camino',
      'Epiphany',
      'Fennec',
      'Flock',
      'Galeon',
      'GreenBrowser',
      'iCab',
      'Iron',
      'K-Meleon',
      'Konqueror',
      'Lunascape',
      'Maxthon',
      'Midori',
      'Nook Browser',
      'Raven',
      'Rekonq',
      'RockMelt',
      'SeaMonkey',
      'Silk',
      'Sleipnir',
      'SlimBrowser',
      'Sunrise',
      'Swiftfox',
      'Opera Mini',
      'Opera',
      'Chrome',
      'Firefox',
      'IE',
      'Safari'
    ]),

    /* Detectable products (order is important) */
    product = getProduct([
      'BlackBerry',
      'Galaxy S',
      'Galaxy S2',
      'iPad',
      'iPod',
      'iPhone',
      'Kindle',
      'Kindle Fire',
      'Nook',
      'PlayBook',
      'TouchPad',
      'Transformer',
      'Xoom'
    ]),

    /* Detectable manufacturers */
    manufacturer = getManufacturer({
      'Apple': { 'iPad': 1, 'iPhone': 1, 'iPod': 1 },
      'Amazon': { 'Kindle': 1, 'Kindle Fire': 1 },
      'Asus': { 'Transformer': 1 },
      'Barnes & Noble': { 'Nook': 1 },
      'BlackBerry': { 'PlayBook': 1 },
      'HP': { 'TouchPad': 1 },
      'LG': { },
      'Motorola': { 'Xoom': 1 },
      'Nokia': { },
      'Samsung': { 'Galaxy S': 1, 'Galaxy S2': 1 }
    }),

    /* Detectable OSes (order is important) */
    os = getOS([
      'Android',
      'CentOS',
      'Debian',
      'Fedora',
      'FreeBSD',
      'Gentoo',
      'Kubuntu',
      'Linux Mint',
      'Red Hat',
      'SuSE',
      'Ubuntu',
      'Xubuntu',
      'Cygwin',
      'Symbian OS',
      'hpwOS',
      'webOS ',
      'webOS',
      'Tablet OS',
      'Linux',
      'Mac OS X',
      'Macintosh',
      'Mac',
      'Windows 98;',
      'Windows '
    ]);

    /*------------------------------------------------------------------------*/

    /**
     * Picks the layout engine from an array of guesses.
     * @private
     * @param {Array} guesses An array of guesses.
     * @returns {String|Null} The detected layout engine.
     */
    function getLayout(guesses) {
      return reduce(guesses, function(result, guess) {
        return result || RegExp('\\b' +
          (guess == 'WebKit' ? 'AppleWebKit' : guess) + '\\b', 'i').exec(ua) && guess;
      });
    }

    /**
     * Picks the manufacturer from an array of guesses.
     * @private
     * @param {Array} guesses An array of guesses.
     * @returns {String|Null} The detected manufacturer.
     */
    function getManufacturer(guesses) {
      return reduce(guesses, function(result, value, key) {
        // lookup the manufacturer by product or scan the UA for the manufacturer
        return result || reduce([key, camelCase(key)], function(result, key) {
          return result || (
            value[product] ||
            value[0/*Opera 9.25 fix*/, /^[a-z]+/i.exec(product)] ||
            RegExp('\\b' + key + '(?:\\b|\\w*\\d)', 'i').exec(ua)
          );
        }) && key;
      });
    }

    /**
     * Picks the browser name from an array of guesses.
     * @private
     * @param {Array} guesses An array of guesses.
     * @returns {String|Null} The detected browser name.
     */
    function getName(guesses) {
      return reduce(guesses, function(result, guess) {
        return result || reduce([guess, camelCase(guess)], function(result, guess) {
          return result || RegExp('\\b' + (
            (guess == 'Firefox' && '(?:Firefox|Minefield)') ||
            (guess == 'IE' && 'MSIE') ||
            (guess == 'Silk' && '(?:Cloud9|Silk)') ||
            guess
          ) + '\\b', 'i').exec(ua);
        }) && guess;
      });
    }

    /**
     * Picks the OS name from an array of guesses.
     * @private
     * @param {Array} guesses An array of guesses.
     * @returns {String|Null} The detected OS name.
     */
    function getOS(guesses) {
      return reduce(guesses, function(result, guess) {
        if (!result && (result =
            reduce([guess, camelCase(guess)], function(result, guess) {
              return result || RegExp('\\b' + guess + '(?:/[\\d.]+|[ \\w.]*)', 'i').exec(ua);
            }))) {
          // platform tokens defined at
          // http://msdn.microsoft.com/en-us/library/ms537503(VS.85).aspx
          data = {
            '6.2': '8',
            '6.1': 'Server 2008 R2 / 7',
            '6.0': 'Server 2008 / Vista',
            '5.2': 'Server 2003 / XP 64-bit',
            '5.1': 'XP',
            '5.0': '2000',
            '4.0': 'NT',
            '4.9': 'ME'
          };
          // detect Windows version from platform tokens
          if (/^Win/i.test(result) &&
              (data = data[0/*Opera 9.25 fix*/, /[456]\.\d/.exec(result)])) {
            result = 'Windows ' + data;
          }
          // correct character case and cleanup
          result = format(String(result)
            .replace(RegExp(guess + '|' + camelCase(guess), 'i'), guess)
            .replace(/hpw/i, 'web')
            .replace(/Macintosh/, 'Mac OS')
            .replace(/_PowerPC/i, ' OS')
            .replace(/(OS X) [^ \d]+/i, '$1')
            .replace(/\/(\d)/, ' $1')
            .replace(/_/g, '.')
            .replace(/[ .]*fc[ \d.]+$/, '')
            .replace(/x86\.64/gi, 'x86_64')
            .split(' on ')[0]);
        }
        return result;
      });
    }

    /**
     * Picks the product name from an array of guesses.
     * @private
     * @param {Array} guesses An array of guesses.
     * @returns {String|Null} The detected product name.
     */
    function getProduct(guesses) {
      return reduce(guesses, function(result, guess) {
        if (!result && (result =
            reduce([guess, camelCase(guess)], function(result, guess) {
              return result ||
                (guess == 'Galaxy S' && /\bGT-I9000\b/i.test(ua) && guess) ||
                (guess == 'Galaxy S2' && /\bGT-I9100\b/i.test(ua) && guess) ||
                (guess == 'Kindle Fire' && /\b(?:Cloud9|Silk)\b/i.test(ua) && guess) ||
                RegExp('\\b' + guess + ' *\\d+[.\\w_]*', 'i').exec(ua) ||
                RegExp('\\b' + guess + '(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)', 'i').exec(ua);
            }))) {
          // split by forward slash and append product version if needed
          if ((result = String(result).split('/'))[1] && !/[\d.]+/.test(result[0])) {
            result[0] += ' ' + result[1];
          }
          // correct character case and cleanup
          result = format(result[0]
            .replace(RegExp(guess + '|' + camelCase(guess), 'i'), guess)
            .replace(RegExp('; *(?:' + guess + '[_-])?', 'i'), ' ')
            .replace(RegExp('(' + guess + ')(\\w)', 'i'), '$1 $2'));
        }
        return result;
      });
    }

    /**
     * Resolves the version using an array of UA tokens.
     * @private
     * @param {Array} tokens An array of UA tokens.
     * @returns {String|Null} The detected version.
     */
    function getVersion(tokens) {
      return reduce(tokens, function(result, token) {
        return result || reduce([token, camelCase(token)], function(result, token) {
          return result || (RegExp((
            (token == 'Firefox' && '(?:Firefox|Minefield)') ||
            (token == 'Silk' && '(?:Cloud9|Silk)') ||
            token
          ) + '(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/-]*)', 'i').exec(ua) || 0)[1] || null;
        });
      });
    }

    /*------------------------------------------------------------------------*/

    /**
     * Restores a previously overwritten platform object.
     * @memberOf platform
     * @type Function
     * @returns {Object} The current platform object.
     */
    function noConflict() {
      window['platform'] = old;
      return this;
    }

    /**
     * Return platform description when the platform object is coerced to a string.
     * @name toString
     * @memberOf platform
     * @type Function
     * @returns {String} The platform description.
     */
    function toStringPlatform() {
      return this.description;
    }

    /*------------------------------------------------------------------------*/

    // convert layout to an array so we can add extra details
    layout && (layout = [layout]);

    // detect product names that contain their manufacturer's name
    if (manufacturer && !product) {
      product = getProduct([manufacturer]);
    }
    // detect simulators
    if (/\bSimulator\b/i.test(ua)) {
      product = (product ? product + ' ' : '') + 'Simulator';
    }
    // detect iOS
    if (/^iP/.test(product)) {
      name || (name = 'Safari');
      os = 'iOS' + ((data = / OS ([\d_]+)/i.exec(ua))
        ? ' ' + data[1].replace(/_/g, '.')
        : '');
    }
    // detect Kubuntu
    else if (name == 'Konqueror' && !/buntu/i.test(os)) {
      os = 'Kubuntu';
    }
    // detect Android browsers
    else if (name == 'Chrome' && manufacturer) {
      name = 'Android Browser';
      os = /Android/.test(os) ? os : 'Android';
    }
    // detect false positives for Firefox/Safari
    else if (!name || (data = !/\bMinefield\b/i.test(ua) && /Firefox|Safari/.exec(name))) {
      // clear name of false positives
      if (name && !product && /[/,]/.test(ua.slice(ua.indexOf(data + '/') + 8))) {
        name = null;
      }
      // reassign a generic name
      if ((data = product || manufacturer || os) &&
          (product || manufacturer || /Android|Symbian OS|Tablet OS|webOS/.test(os))) {
        name = /[a-z]+(?: Hat)?/i.exec(/Android/.test(os) ? os : data) + ' Browser';
      }
    }
    // detect non-Opera versions (order is important)
    if (!version) {
      version = getVersion([
        /Mini|Raven|Silk/.test(name) ? name : 'version',
        name,
        'AdobeAIR',
        'Firefox',
        'NetFront'
      ]);
    }
    // detect stubborn layout engines
    if (layout == 'iCab' && parseFloat(version) > 3) {
      layout = ['WebKit'];
    } else if (name == 'Konqueror' && /\bKHTML\b/i.test(ua)) {
      layout = ['KHTML'];
    } else if (data =
        /Opera/.test(name) && 'Presto' ||
        /\b(?:Midori|Nook|Safari)\b/i.test(ua) && 'WebKit' ||
        !layout && /\bMSIE\b/i.test(ua) && (/^Mac/.test(os) ? 'Tasman' : 'Trident')) {
      layout = [data];
    }
    // leverage environment features
    if (useFeatures) {
      // detect server-side environments
      // Rhino has a global function while others have a global object
      if (isHostType(thisBinding, 'global')) {
        if (java && !os) {
          data = java.lang.System;
          os = data.getProperty('os.name') + ' ' + data.getProperty('os.version');
        }
        if (typeof exports == 'object' && exports) {
          // if `thisBinding` is the [ModuleScope]
          if (thisBinding == oldWin && typeof system == 'object' && (data = [system])[0]) {
            os || (os = data[0].os || null);
            try {
              data[1] = require('ringo/engine').version;
              version = data[1].join('.');
              name = 'RingoJS';
            } catch(e) {
              if (data[0].global == freeGlobal) {
                name = 'Narwhal';
              }
            }
          } else if (typeof process == 'object' && (data = process)) {
            name = 'Node.js';
            version = /[\d.]+/.exec(data.version)[0];
            os = data.platform;
          }
        } else if (getClassOf(window.environment) == 'Environment') {
          name = 'Rhino';
        }
      }
      // detect Adobe AIR
      else if (getClassOf(data = window.runtime) == 'ScriptBridgingProxyObject') {
        name = 'Adobe AIR';
        os = data.flash.system.Capabilities.os;
      }
      // detect PhantomJS
      else if (getClassOf(data = window.phantom) == 'RuntimeObject') {
        name = 'PhantomJS';
        version = (data = data.version || null) && (data.major + '.' + data.minor + '.' + data.patch);
      }
      // detect IE compatibility modes
      else if (typeof doc.documentMode == 'number' && (data = /\bTrident\/(\d+)/i.exec(ua))) {
        version = [version, doc.documentMode];
        // we're in compatibility mode when the Trident version + 4 doesn't
        // equal the document mode
        if ((data = +data[1] + 4) != version[1]) {
          description.push('IE ' + version[1] + ' mode');
          layout[1] = '';
          version[1] = data;
        }
        version = name == 'IE' ? String(version[1].toFixed(1)) : version[0];
      }
      os = os && format(os);
    }
    // detect prerelease phases
    if (version && (data =
        /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(version) ||
        /(?:alpha|beta)(?: ?\d)?/i.exec(ua + ';' + (useFeatures && nav.appMinorVersion)) ||
        /\bMinefield\b/i.test(ua) && 'a')) {
      prerelease = /b/i.test(data) ? 'beta' : 'alpha';
      version = version.replace(RegExp(data + '\\+?$'), '') +
        (prerelease == 'beta' ? beta : alpha) + (/\d+\+?/.exec(data) || '');
    }
    // obscure Maxthon's unreliable version
    if (name == 'Maxthon' && version) {
      version = version.replace(/\.[\d.]+/, '.x');
    }
    // detect Silk desktop/accelerated modes
    else if (name == 'Silk') {
      if (!/Mobi/i.test(ua)) {
        os = 'Android';
        description.unshift('desktop mode');
      }
      if (/Accelerated *= *true/i.test(ua)) {
        description.unshift('accelerated');
      }
    }
    // detect Windows Phone desktop mode
    else if (name == 'IE' && (data = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(ua) || 0)[1])) {
      name += ' Mobile';
      os = 'Windows Phone OS ' + data + '.x';
      description.unshift('desktop mode');
    }
    // add mobile postfix
    else if ((name == 'IE' || name && !product) && !/Browser/.test(name) && /Mobi/i.test(ua)) {
      name += ' Mobile';
    }
    // detect IE platform preview
    else if (name == 'IE' && typeof external == 'object' && !external) {
      description.unshift('platform preview');
    }
    // detect BlackBerry OS version
    // http://docs.blackberry.com/en/developers/deliverables/18169/HTTP_headers_sent_by_BB_Browser_1234911_11.jsp
    else if (/BlackBerry/.test(product) && (data =
        (RegExp(product.replace(/ +/g, ' *') + '/([.\\d]+)', 'i').exec(ua) || 0)[1] ||
        version)) {
      os = 'Device Software ' + data;
      version = null;
    }
    // detect Opera identifying/masking itself as another browser
    // http://www.opera.com/support/kb/view/843/
    else if (useFeatures && opera &&
        (data = parse(ua.replace(reOpera, '') + ';')).name &&
        !reOpera.test(data.name)) {
      layout = ['Presto'];
      data = 'ing as ' + data.name + ((data = data.version) ? ' ' + data : '');
      if (reOpera.test(name)) {
        data = 'identify' + data;
      } else {
        data = 'mask' + data;
        name = format(operaClass.replace(/([a-z])([A-Z])/g, '$1 $2'));
      }
      description.push(data);
    }
    // detect WebKit Nightly and approximate Chrome/Safari versions
    if ((data = (/AppleWebKit\/([\d.]+\+?)/i.exec(ua) || 0)[1])) {
      // nightly builds are postfixed with a `+`
      data = [parseFloat(data), data];
      if (data[1].slice(-1) == '+' && name == 'Safari') {
        name = 'WebKit Nightly';
        prerelease = 'alpha';
        version = data[1].slice(0, -1);
      }
      // use the full Chrome version when available
      data = [data[0], (/Chrome\/([\d.]+)/i.exec(ua) || 0)[1]];
      // detect JavaScriptCore
      // http://stackoverflow.com/questions/6768474/how-can-i-detect-which-javascript-engine-v8-or-jsc-is-used-at-runtime-in-androi
      if (!useFeatures || (/internal|\n/i.test(toString.toString()) && !data[1])) {
        layout[1] = 'like Safari';
        data = (data = data[0], data < 400 ? 1 : data < 500 ? 2 : data < 526 ? 3 : data < 533 ? 4 : data < 534 ? '4+' : data < 535 ? 5 : '5');
      } else {
        layout[1] = 'like Chrome';
        data = data[1] || (data = data[0], data < 530 ? 1 : data < 532 ? 2 : data < 532.5 ? 3 : data < 533 ? 4 : data < 534.3 ? 5 : data < 534.7 ? 6 : data < 534.1 ? 7 : data < 534.13 ? 8 : data < 534.16 ? 9 : data < 534.24 ? 10 : data < 534.3 ? 11 : data < 535.1 ? 12 : data < 535.2 ? '13+' : data < 535.5 ? 15 : data < 535.7 ? 16 : '17');
      }
      // add the postfix of ".x" or "+" for approximate versions
      layout[1] += ' ' + (data += typeof data == 'number' ? '.x' : /[.+]/.test(data) ? '' : '+');
      // obscure version for some Safari 1-2 releases
      if (name == 'Safari' && (!version || parseInt(version) > 45)) {
        version = data;
      }
    }
    // strip incorrect OS versions
    if (version && version.indexOf(data = /[\d.]+$/.exec(os)) == 0 &&
        ua.indexOf('/' + data + '-') > -1) {
      os = trim(os.replace(data, ''));
    }
    // add layout engine
    if (layout && !/Avant|Nook/.test(name) && (
        /Browser|Lunascape|Maxthon/.test(name) ||
        /Adobe|Arora|Midori|Phantom|Rekonq|RockMelt|Sleipnir|WebKit/.test(name) && layout[1])) {
      // don't add layout details to description if they are falsey
      (data = layout[layout.length - 1]) && description.push(data);
    }
    // combine contextual information
    if (description.length) {
      description = ['(' + description.join('; ') + ')'];
    }
    // append manufacturer
    if (manufacturer && product && product.indexOf(manufacturer) < 0) {
      description.push('on ' + manufacturer);
    }
    // append product
    if (product) {
      description.push((/^on /.test(description[description.length -1]) ? '' : 'on ') + product);
    }
    // add browser/OS architecture
    if ((data = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i).test(ua) && !/\bi686\b/i.test(ua)) {
      os = os && os + (data.test(os) ? '' : ' 64-bit');
      if (name && (/WOW64/i.test(ua) ||
          (useFeatures && /\w(?:86|32)$/.test(nav.cpuClass || nav.platform)))) {
        description.unshift('32-bit');
      }
    }

    /*------------------------------------------------------------------------*/

    /**
     * The platform object.
     * @name platform
     * @type Object
     */
    return {

      /**
       * The browser/environment version.
       * @memberOf platform
       * @type String|Null
       */
      'version': name && version && (description.unshift(version), version),

      /**
       * The name of the browser/environment.
       * @memberOf platform
       * @type String|Null
       */
      'name': name && (description.unshift(name), name),

      /**
       * The name of the operating system.
       * @memberOf platform
       * @type String|Null
       */
      'os': os && (name &&
        !(os == os.split(' ')[0] && (os == name.split(' ')[0] || product)) &&
          description.push(product ? '(' + os + ')' : 'on ' + os), os),

      /**
       * The platform description.
       * @memberOf platform
       * @type String
       */
      'description': description.length ? description.join(' ') : ua,

      /**
       * The name of the browser layout engine.
       * @memberOf platform
       * @type String|Null
       */
      'layout': layout && layout[0],

      /**
       * The name of the product's manufacturer.
       * @memberOf platform
       * @type String|Null
       */
      'manufacturer': manufacturer,

      /**
       * The alpha/beta release indicator.
       * @memberOf platform
       * @type String|Null
       */
      'prerelease': prerelease,

      /**
       * The name of the product hosting the browser.
       * @memberOf platform
       * @type String|Null
       */
      'product': product,

      // avoid platform object conflicts in browsers
      'noConflict': noConflict,

      // parses a user agent string into a platform object
      'parse': parse,

      // returns the platform description
      'toString': toStringPlatform
    };
  }

  /*--------------------------------------------------------------------------*/

  // expose platform
  // in Narwhal, Node.js, or Ringo
  if (freeExports) {
    forIn(parse(), function(value, key) {
      freeExports[key] = value;
    });
  }
  // via curl.js or RequireJS
  else if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
    define(function() { return parse(); });
  }
  // in a browser or Rhino
  else {
    // use square bracket notation so Closure Compiler won't munge `platform`
    // http://code.google.com/closure/compiler/docs/api-tutorial3.html#export
    window['platform'] = parse();
  }
}(this));