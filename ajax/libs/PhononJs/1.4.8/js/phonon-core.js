/*!
 * Platform.js <https://mths.be/platform>
 * Copyright 2014-2016 Benjamin Tan <https://demoneaux.github.io/>
 * Copyright 2011-2013 John-David Dalton <http://allyoucanleet.com/>
 * Available under MIT license <https://mths.be/mit>
 */
;(function() {
  'use strict';

  /** Used to determine if values are of the language type `Object`. */
  var objectTypes = {
    'function': true,
    'object': true
  };

  /** Used as a reference to the global object. */
  var root = (objectTypes[typeof window] && window) || this;

  /** Backup possible global object. */
  var oldRoot = root;

  /** Detect free variable `exports`. */
  var freeExports = objectTypes[typeof exports] && exports;

  /** Detect free variable `module`. */
  var freeModule = objectTypes[typeof module] && module && !module.nodeType && module;

  /** Detect free variable `global` from Node.js or Browserified code and use it as `root`. */
  var freeGlobal = freeExports && freeModule && typeof global == 'object' && global;
  if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal)) {
    root = freeGlobal;
  }

  /**
   * Used as the maximum length of an array-like object.
   * See the [ES6 spec](http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength)
   * for more details.
   */
  var maxSafeInteger = Math.pow(2, 53) - 1;

  /** Regular expression to detect Opera. */
  var reOpera = /\bOpera/;

  /** Possible global object. */
  var thisBinding = this;

  /** Used for native method references. */
  var objectProto = Object.prototype;

  /** Used to check for own properties of an object. */
  var hasOwnProperty = objectProto.hasOwnProperty;

  /** Used to resolve the internal `[[Class]]` of values. */
  var toString = objectProto.toString;

  /*--------------------------------------------------------------------------*/

  /**
   * Capitalizes a string value.
   *
   * @private
   * @param {string} string The string to capitalize.
   * @returns {string} The capitalized string.
   */
  function capitalize(string) {
    string = String(string);
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  /**
   * A utility function to clean up the OS name.
   *
   * @private
   * @param {string} os The OS name to clean up.
   * @param {string} [pattern] A `RegExp` pattern matching the OS name.
   * @param {string} [label] A label for the OS.
   */
  function cleanupOS(os, pattern, label) {
    // Platform tokens are defined at:
    // http://msdn.microsoft.com/en-us/library/ms537503(VS.85).aspx
    // http://web.archive.org/web/20081122053950/http://msdn.microsoft.com/en-us/library/ms537503(VS.85).aspx
    var data = {
      '10.0': '10',
      '6.4':  '10 Technical Preview',
      '6.3':  '8.1',
      '6.2':  '8',
      '6.1':  'Server 2008 R2 / 7',
      '6.0':  'Server 2008 / Vista',
      '5.2':  'Server 2003 / XP 64-bit',
      '5.1':  'XP',
      '5.01': '2000 SP1',
      '5.0':  '2000',
      '4.0':  'NT',
      '4.90': 'ME'
    };
    // Detect Windows version from platform tokens.
    if (pattern && label && /^Win/i.test(os) && !/^Windows Phone /i.test(os) &&
        (data = data[/[\d.]+$/.exec(os)])) {
      os = 'Windows ' + data;
    }
    // Correct character case and cleanup string.
    os = String(os);

    if (pattern && label) {
      os = os.replace(RegExp(pattern, 'i'), label);
    }

    os = format(
      os.replace(/ ce$/i, ' CE')
        .replace(/\bhpw/i, 'web')
        .replace(/\bMacintosh\b/, 'Mac OS')
        .replace(/_PowerPC\b/i, ' OS')
        .replace(/\b(OS X) [^ \d]+/i, '$1')
        .replace(/\bMac (OS X)\b/, '$1')
        .replace(/\/(\d)/, ' $1')
        .replace(/_/g, '.')
        .replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, '')
        .replace(/\bx86\.64\b/gi, 'x86_64')
        .replace(/\b(Windows Phone) OS\b/, '$1')
        .replace(/\b(Chrome OS \w+) [\d.]+\b/, '$1')
        .split(' on ')[0]
    );

    return os;
  }

  /**
   * An iteration utility for arrays and objects.
   *
   * @private
   * @param {Array|Object} object The object to iterate over.
   * @param {Function} callback The function called per iteration.
   */
  function each(object, callback) {
    var index = -1,
        length = object ? object.length : 0;

    if (typeof length == 'number' && length > -1 && length <= maxSafeInteger) {
      while (++index < length) {
        callback(object[index], index, object);
      }
    } else {
      forOwn(object, callback);
    }
  }

  /**
   * Trim and conditionally capitalize string values.
   *
   * @private
   * @param {string} string The string to format.
   * @returns {string} The formatted string.
   */
  function format(string) {
    string = trim(string);
    return /^(?:webOS|i(?:OS|P))/.test(string)
      ? string
      : capitalize(string);
  }

  /**
   * Iterates over an object's own properties, executing the `callback` for each.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} callback The function executed per own property.
   */
  function forOwn(object, callback) {
    for (var key in object) {
      if (hasOwnProperty.call(object, key)) {
        callback(object[key], key, object);
      }
    }
  }

  /**
   * Gets the internal `[[Class]]` of a value.
   *
   * @private
   * @param {*} value The value.
   * @returns {string} The `[[Class]]`.
   */
  function getClassOf(value) {
    return value == null
      ? capitalize(value)
      : toString.call(value).slice(8, -1);
  }

  /**
   * Host objects can return type values that are different from their actual
   * data type. The objects we are concerned with usually return non-primitive
   * types of "object", "function", or "unknown".
   *
   * @private
   * @param {*} object The owner of the property.
   * @param {string} property The property to check.
   * @returns {boolean} Returns `true` if the property value is a non-primitive, else `false`.
   */
  function isHostType(object, property) {
    var type = object != null ? typeof object[property] : 'number';
    return !/^(?:boolean|number|string|undefined)$/.test(type) &&
      (type == 'object' ? !!object[property] : true);
  }

  /**
   * Prepares a string for use in a `RegExp` by making hyphens and spaces optional.
   *
   * @private
   * @param {string} string The string to qualify.
   * @returns {string} The qualified string.
   */
  function qualify(string) {
    return String(string).replace(/([ -])(?!$)/g, '$1?');
  }

  /**
   * A bare-bones `Array#reduce` like utility function.
   *
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} callback The function called per iteration.
   * @returns {*} The accumulated result.
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
   *
   * @private
   * @param {string} string The string to trim.
   * @returns {string} The trimmed string.
   */
  function trim(string) {
    return String(string).replace(/^ +| +$/g, '');
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Creates a new platform object.
   *
   * @memberOf platform
   * @param {Object|string} [ua=navigator.userAgent] The user agent string or
   *  context object.
   * @returns {Object} A platform object.
   */
  function parse(ua) {

    /** The environment context object. */
    var context = root;

    /** Used to flag when a custom context is provided. */
    var isCustomContext = ua && typeof ua == 'object' && getClassOf(ua) != 'String';

    // Juggle arguments.
    if (isCustomContext) {
      context = ua;
      ua = null;
    }

    /** Browser navigator object. */
    var nav = context.navigator || {};

    /** Browser user agent string. */
    var userAgent = nav.userAgent || '';

    ua || (ua = userAgent);

    /** Used to flag when `thisBinding` is the [ModuleScope]. */
    var isModuleScope = isCustomContext || thisBinding == oldRoot;

    /** Used to detect if browser is like Chrome. */
    var likeChrome = isCustomContext
      ? !!nav.likeChrome
      : /\bChrome\b/.test(ua) && !/internal|\n/i.test(toString.toString());

    /** Internal `[[Class]]` value shortcuts. */
    var objectClass = 'Object',
        airRuntimeClass = isCustomContext ? objectClass : 'ScriptBridgingProxyObject',
        enviroClass = isCustomContext ? objectClass : 'Environment',
        javaClass = (isCustomContext && context.java) ? 'JavaPackage' : getClassOf(context.java),
        phantomClass = isCustomContext ? objectClass : 'RuntimeObject';

    /** Detect Java environments. */
    var java = /\bJava/.test(javaClass) && context.java;

    /** Detect Rhino. */
    var rhino = java && getClassOf(context.environment) == enviroClass;

    /** A character to represent alpha. */
    var alpha = java ? 'a' : '\u03b1';

    /** A character to represent beta. */
    var beta = java ? 'b' : '\u03b2';

    /** Browser document object. */
    var doc = context.document || {};

    /**
     * Detect Opera browser (Presto-based).
     * http://www.howtocreate.co.uk/operaStuff/operaObject.html
     * http://dev.opera.com/articles/view/opera-mini-web-content-authoring-guidelines/#operamini
     */
    var opera = context.operamini || context.opera;

    /** Opera `[[Class]]`. */
    var operaClass = reOpera.test(operaClass = (isCustomContext && opera) ? opera['[[Class]]'] : getClassOf(opera))
      ? operaClass
      : (opera = null);

    /*------------------------------------------------------------------------*/

    /** Temporary variable used over the script's lifetime. */
    var data;

    /** The CPU architecture. */
    var arch = ua;

    /** Platform description array. */
    var description = [];

    /** Platform alpha/beta indicator. */
    var prerelease = null;

    /** A flag to indicate that environment features should be used to resolve the platform. */
    var useFeatures = ua == userAgent;

    /** The browser/environment version. */
    var version = useFeatures && opera && typeof opera.version == 'function' && opera.version();

    /** A flag to indicate if the OS ends with "/ Version" */
    var isSpecialCasedOS;

    /* Detectable layout engines (order is important). */
    var layout = getLayout([
      { 'label': 'EdgeHTML', 'pattern': 'Edge' },
      'Trident',
      { 'label': 'WebKit', 'pattern': 'AppleWebKit' },
      'iCab',
      'Presto',
      'NetFront',
      'Tasman',
      'KHTML',
      'Gecko'
    ]);

    /* Detectable browser names (order is important). */
    var name = getName([
      'Adobe AIR',
      'Arora',
      'Avant Browser',
      'Breach',
      'Camino',
      'Electron',
      'Epiphany',
      'Fennec',
      'Flock',
      'Galeon',
      'GreenBrowser',
      'iCab',
      'Iceweasel',
      'K-Meleon',
      'Konqueror',
      'Lunascape',
      'Maxthon',
      { 'label': 'Microsoft Edge', 'pattern': 'Edge' },
      'Midori',
      'Nook Browser',
      'PaleMoon',
      'PhantomJS',
      'Raven',
      'Rekonq',
      'RockMelt',
      { 'label': 'Samsung Internet', 'pattern': 'SamsungBrowser' },
      'SeaMonkey',
      { 'label': 'Silk', 'pattern': '(?:Cloud9|Silk-Accelerated)' },
      'Sleipnir',
      'SlimBrowser',
      { 'label': 'SRWare Iron', 'pattern': 'Iron' },
      'Sunrise',
      'Swiftfox',
      'Waterfox',
      'WebPositive',
      'Opera Mini',
      { 'label': 'Opera Mini', 'pattern': 'OPiOS' },
      'Opera',
      { 'label': 'Opera', 'pattern': 'OPR' },
      'Chrome',
      { 'label': 'Chrome Mobile', 'pattern': '(?:CriOS|CrMo)' },
      { 'label': 'Firefox', 'pattern': '(?:Firefox|Minefield)' },
      { 'label': 'Firefox for iOS', 'pattern': 'FxiOS' },
      { 'label': 'IE', 'pattern': 'IEMobile' },
      { 'label': 'IE', 'pattern': 'MSIE' },
      'Safari'
    ]);

    /* Detectable products (order is important). */
    var product = getProduct([
      { 'label': 'BlackBerry', 'pattern': 'BB10' },
      'BlackBerry',
      { 'label': 'Galaxy S', 'pattern': 'GT-I9000' },
      { 'label': 'Galaxy S2', 'pattern': 'GT-I9100' },
      { 'label': 'Galaxy S3', 'pattern': 'GT-I9300' },
      { 'label': 'Galaxy S4', 'pattern': 'GT-I9500' },
      { 'label': 'Galaxy S5', 'pattern': 'SM-G900' },
      { 'label': 'Galaxy S6', 'pattern': 'SM-G920' },
      { 'label': 'Galaxy S6 Edge', 'pattern': 'SM-G925' },
      { 'label': 'Galaxy S7', 'pattern': 'SM-G930' },
      { 'label': 'Galaxy S7 Edge', 'pattern': 'SM-G935' },
      'Google TV',
      'Lumia',
      'iPad',
      'iPod',
      'iPhone',
      'Kindle',
      { 'label': 'Kindle Fire', 'pattern': '(?:Cloud9|Silk-Accelerated)' },
      'Nexus',
      'Nook',
      'PlayBook',
      'PlayStation Vita',
      'PlayStation',
      'TouchPad',
      'Transformer',
      { 'label': 'Wii U', 'pattern': 'WiiU' },
      'Wii',
      'Xbox One',
      { 'label': 'Xbox 360', 'pattern': 'Xbox' },
      'Xoom'
    ]);

    /* Detectable manufacturers. */
    var manufacturer = getManufacturer({
      'Apple': { 'iPad': 1, 'iPhone': 1, 'iPod': 1 },
      'Archos': {},
      'Amazon': { 'Kindle': 1, 'Kindle Fire': 1 },
      'Asus': { 'Transformer': 1 },
      'Barnes & Noble': { 'Nook': 1 },
      'BlackBerry': { 'PlayBook': 1 },
      'Google': { 'Google TV': 1, 'Nexus': 1 },
      'HP': { 'TouchPad': 1 },
      'HTC': {},
      'LG': {},
      'Microsoft': { 'Xbox': 1, 'Xbox One': 1 },
      'Motorola': { 'Xoom': 1 },
      'Nintendo': { 'Wii U': 1,  'Wii': 1 },
      'Nokia': { 'Lumia': 1 },
      'Samsung': { 'Galaxy S': 1, 'Galaxy S2': 1, 'Galaxy S3': 1, 'Galaxy S4': 1 },
      'Sony': { 'PlayStation': 1, 'PlayStation Vita': 1 }
    });

    /* Detectable operating systems (order is important). */
    var os = getOS([
      'Windows Phone',
      'Android',
      'CentOS',
      { 'label': 'Chrome OS', 'pattern': 'CrOS' },
      'Debian',
      'Fedora',
      'FreeBSD',
      'Gentoo',
      'Haiku',
      'Kubuntu',
      'Linux Mint',
      'OpenBSD',
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
      'Tizen',
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
     *
     * @private
     * @param {Array} guesses An array of guesses.
     * @returns {null|string} The detected layout engine.
     */
    function getLayout(guesses) {
      return reduce(guesses, function(result, guess) {
        return result || RegExp('\\b' + (
          guess.pattern || qualify(guess)
        ) + '\\b', 'i').exec(ua) && (guess.label || guess);
      });
    }

    /**
     * Picks the manufacturer from an array of guesses.
     *
     * @private
     * @param {Array} guesses An object of guesses.
     * @returns {null|string} The detected manufacturer.
     */
    function getManufacturer(guesses) {
      return reduce(guesses, function(result, value, key) {
        // Lookup the manufacturer by product or scan the UA for the manufacturer.
        return result || (
          value[product] ||
          value[/^[a-z]+(?: +[a-z]+\b)*/i.exec(product)] ||
          RegExp('\\b' + qualify(key) + '(?:\\b|\\w*\\d)', 'i').exec(ua)
        ) && key;
      });
    }

    /**
     * Picks the browser name from an array of guesses.
     *
     * @private
     * @param {Array} guesses An array of guesses.
     * @returns {null|string} The detected browser name.
     */
    function getName(guesses) {
      return reduce(guesses, function(result, guess) {
        return result || RegExp('\\b' + (
          guess.pattern || qualify(guess)
        ) + '\\b', 'i').exec(ua) && (guess.label || guess);
      });
    }

    /**
     * Picks the OS name from an array of guesses.
     *
     * @private
     * @param {Array} guesses An array of guesses.
     * @returns {null|string} The detected OS name.
     */
    function getOS(guesses) {
      return reduce(guesses, function(result, guess) {
        var pattern = guess.pattern || qualify(guess);
        if (!result && (result =
              RegExp('\\b' + pattern + '(?:/[\\d.]+|[ \\w.]*)', 'i').exec(ua)
            )) {
          result = cleanupOS(result, pattern, guess.label || guess);
        }
        return result;
      });
    }

    /**
     * Picks the product name from an array of guesses.
     *
     * @private
     * @param {Array} guesses An array of guesses.
     * @returns {null|string} The detected product name.
     */
    function getProduct(guesses) {
      return reduce(guesses, function(result, guess) {
        var pattern = guess.pattern || qualify(guess);
        if (!result && (result =
              RegExp('\\b' + pattern + ' *\\d+[.\\w_]*', 'i').exec(ua) ||
              RegExp('\\b' + pattern + ' *\\w+-[\\w]*', 'i').exec(ua) ||
              RegExp('\\b' + pattern + '(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)', 'i').exec(ua)
            )) {
          // Split by forward slash and append product version if needed.
          if ((result = String((guess.label && !RegExp(pattern, 'i').test(guess.label)) ? guess.label : result).split('/'))[1] && !/[\d.]+/.test(result[0])) {
            result[0] += ' ' + result[1];
          }
          // Correct character case and cleanup string.
          guess = guess.label || guess;
          result = format(result[0]
            .replace(RegExp(pattern, 'i'), guess)
            .replace(RegExp('; *(?:' + guess + '[_-])?', 'i'), ' ')
            .replace(RegExp('(' + guess + ')[-_.]?(\\w)', 'i'), '$1 $2'));
        }
        return result;
      });
    }

    /**
     * Resolves the version using an array of UA patterns.
     *
     * @private
     * @param {Array} patterns An array of UA patterns.
     * @returns {null|string} The detected version.
     */
    function getVersion(patterns) {
      return reduce(patterns, function(result, pattern) {
        return result || (RegExp(pattern +
          '(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)', 'i').exec(ua) || 0)[1] || null;
      });
    }

    /**
     * Returns `platform.description` when the platform object is coerced to a string.
     *
     * @name toString
     * @memberOf platform
     * @returns {string} Returns `platform.description` if available, else an empty string.
     */
    function toStringPlatform() {
      return this.description || '';
    }

    /*------------------------------------------------------------------------*/

    // Convert layout to an array so we can add extra details.
    layout && (layout = [layout]);

    // Detect product names that contain their manufacturer's name.
    if (manufacturer && !product) {
      product = getProduct([manufacturer]);
    }
    // Clean up Google TV.
    if ((data = /\bGoogle TV\b/.exec(product))) {
      product = data[0];
    }
    // Detect simulators.
    if (/\bSimulator\b/i.test(ua)) {
      product = (product ? product + ' ' : '') + 'Simulator';
    }
    // Detect Opera Mini 8+ running in Turbo/Uncompressed mode on iOS.
    if (name == 'Opera Mini' && /\bOPiOS\b/.test(ua)) {
      description.push('running in Turbo/Uncompressed mode');
    }
    // Detect IE Mobile 11.
    if (name == 'IE' && /\blike iPhone OS\b/.test(ua)) {
      data = parse(ua.replace(/like iPhone OS/, ''));
      manufacturer = data.manufacturer;
      product = data.product;
    }
    // Detect iOS.
    else if (/^iP/.test(product)) {
      name || (name = 'Safari');
      os = 'iOS' + ((data = / OS ([\d_]+)/i.exec(ua))
        ? ' ' + data[1].replace(/_/g, '.')
        : '');
    }
    // Detect Kubuntu.
    else if (name == 'Konqueror' && !/buntu/i.test(os)) {
      os = 'Kubuntu';
    }
    // Detect Android browsers.
    else if ((manufacturer && manufacturer != 'Google' &&
        ((/Chrome/.test(name) && !/\bMobile Safari\b/i.test(ua)) || /\bVita\b/.test(product))) ||
        (/\bAndroid\b/.test(os) && /^Chrome/.test(name) && /\bVersion\//i.test(ua))) {
      name = 'Android Browser';
      os = /\bAndroid\b/.test(os) ? os : 'Android';
    }
    // Detect Silk desktop/accelerated modes.
    else if (name == 'Silk') {
      if (!/\bMobi/i.test(ua)) {
        os = 'Android';
        description.unshift('desktop mode');
      }
      if (/Accelerated *= *true/i.test(ua)) {
        description.unshift('accelerated');
      }
    }
    // Detect PaleMoon identifying as Firefox.
    else if (name == 'PaleMoon' && (data = /\bFirefox\/([\d.]+)\b/.exec(ua))) {
      description.push('identifying as Firefox ' + data[1]);
    }
    // Detect Firefox OS and products running Firefox.
    else if (name == 'Firefox' && (data = /\b(Mobile|Tablet|TV)\b/i.exec(ua))) {
      os || (os = 'Firefox OS');
      product || (product = data[1]);
    }
    // Detect false positives for Firefox/Safari.
    else if (!name || (data = !/\bMinefield\b/i.test(ua) && /\b(?:Firefox|Safari)\b/.exec(name))) {
      // Escape the `/` for Firefox 1.
      if (name && !product && /[\/,]|^[^(]+?\)/.test(ua.slice(ua.indexOf(data + '/') + 8))) {
        // Clear name of false positives.
        name = null;
      }
      // Reassign a generic name.
      if ((data = product || manufacturer || os) &&
          (product || manufacturer || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(os))) {
        name = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(os) ? os : data) + ' Browser';
      }
    }
    // Add Chrome version to description for Electron.
    else if (name == 'Electron' && (data = (/\bChrome\/([\d.]+)\b/.exec(ua) || 0)[1])) {
      description.push('Chromium ' + data);
    }
    // Detect non-Opera (Presto-based) versions (order is important).
    if (!version) {
      version = getVersion([
        '(?:Cloud9|CriOS|CrMo|Edge|FxiOS|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$))',
        'Version',
        qualify(name),
        '(?:Firefox|Minefield|NetFront)'
      ]);
    }
    // Detect stubborn layout engines.
    if ((data =
          layout == 'iCab' && parseFloat(version) > 3 && 'WebKit' ||
          /\bOpera\b/.test(name) && (/\bOPR\b/.test(ua) ? 'Blink' : 'Presto') ||
          /\b(?:Midori|Nook|Safari)\b/i.test(ua) && !/^(?:Trident|EdgeHTML)$/.test(layout) && 'WebKit' ||
          !layout && /\bMSIE\b/i.test(ua) && (os == 'Mac OS' ? 'Tasman' : 'Trident') ||
          layout == 'WebKit' && /\bPlayStation\b(?! Vita\b)/i.test(name) && 'NetFront'
        )) {
      layout = [data];
    }
    // Detect Windows Phone 7 desktop mode.
    if (name == 'IE' && (data = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(ua) || 0)[1])) {
      name += ' Mobile';
      os = 'Windows Phone ' + (/\+$/.test(data) ? data : data + '.x');
      description.unshift('desktop mode');
    }
    // Detect Windows Phone 8.x desktop mode.
    else if (/\bWPDesktop\b/i.test(ua)) {
      name = 'IE Mobile';
      os = 'Windows Phone 8.x';
      description.unshift('desktop mode');
      version || (version = (/\brv:([\d.]+)/.exec(ua) || 0)[1]);
    }
    // Detect IE 11 identifying as other browsers.
    else if (name != 'IE' && layout == 'Trident' && (data = /\brv:([\d.]+)/.exec(ua))) {
      if (name) {
        description.push('identifying as ' + name + (version ? ' ' + version : ''));
      }
      name = 'IE';
      version = data[1];
    }
    // Leverage environment features.
    if (useFeatures) {
      // Detect server-side environments.
      // Rhino has a global function while others have a global object.
      if (isHostType(context, 'global')) {
        if (java) {
          data = java.lang.System;
          arch = data.getProperty('os.arch');
          os = os || data.getProperty('os.name') + ' ' + data.getProperty('os.version');
        }
        if (isModuleScope && isHostType(context, 'system') && (data = [context.system])[0]) {
          os || (os = data[0].os || null);
          try {
            data[1] = context.require('ringo/engine').version;
            version = data[1].join('.');
            name = 'RingoJS';
          } catch(e) {
            if (data[0].global.system == context.system) {
              name = 'Narwhal';
            }
          }
        }
        else if (
          typeof context.process == 'object' && !context.process.browser &&
          (data = context.process)
        ) {
          if (typeof data.versions == 'object') {
            if (typeof data.versions.electron == 'string') {
              description.push('Node ' + data.versions.node);
              name = 'Electron';
              version = data.versions.electron;
            } else if (typeof data.versions.nw == 'string') {
              description.push('Chromium ' + version, 'Node ' + data.versions.node);
              name = 'NW.js';
              version = data.versions.nw;
            }
          } else {
            name = 'Node.js';
            arch = data.arch;
            os = data.platform;
            version = /[\d.]+/.exec(data.version)
            version = version ? version[0] : 'unknown';
          }
        }
        else if (rhino) {
          name = 'Rhino';
        }
      }
      // Detect Adobe AIR.
      else if (getClassOf((data = context.runtime)) == airRuntimeClass) {
        name = 'Adobe AIR';
        os = data.flash.system.Capabilities.os;
      }
      // Detect PhantomJS.
      else if (getClassOf((data = context.phantom)) == phantomClass) {
        name = 'PhantomJS';
        version = (data = data.version || null) && (data.major + '.' + data.minor + '.' + data.patch);
      }
      // Detect IE compatibility modes.
      else if (typeof doc.documentMode == 'number' && (data = /\bTrident\/(\d+)/i.exec(ua))) {
        // We're in compatibility mode when the Trident version + 4 doesn't
        // equal the document mode.
        version = [version, doc.documentMode];
        if ((data = +data[1] + 4) != version[1]) {
          description.push('IE ' + version[1] + ' mode');
          layout && (layout[1] = '');
          version[1] = data;
        }
        version = name == 'IE' ? String(version[1].toFixed(1)) : version[0];
      }
      // Detect IE 11 masking as other browsers.
      else if (typeof doc.documentMode == 'number' && /^(?:Chrome|Firefox)\b/.test(name)) {
        description.push('masking as ' + name + ' ' + version);
        name = 'IE';
        version = '11.0';
        layout = ['Trident'];
        os = 'Windows';
      }
      os = os && format(os);
    }
    // Detect prerelease phases.
    if (version && (data =
          /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(version) ||
          /(?:alpha|beta)(?: ?\d)?/i.exec(ua + ';' + (useFeatures && nav.appMinorVersion)) ||
          /\bMinefield\b/i.test(ua) && 'a'
        )) {
      prerelease = /b/i.test(data) ? 'beta' : 'alpha';
      version = version.replace(RegExp(data + '\\+?$'), '') +
        (prerelease == 'beta' ? beta : alpha) + (/\d+\+?/.exec(data) || '');
    }
    // Detect Firefox Mobile.
    if (name == 'Fennec' || name == 'Firefox' && /\b(?:Android|Firefox OS)\b/.test(os)) {
      name = 'Firefox Mobile';
    }
    // Obscure Maxthon's unreliable version.
    else if (name == 'Maxthon' && version) {
      version = version.replace(/\.[\d.]+/, '.x');
    }
    // Detect Xbox 360 and Xbox One.
    else if (/\bXbox\b/i.test(product)) {
      if (product == 'Xbox 360') {
        os = null;
      }
      if (product == 'Xbox 360' && /\bIEMobile\b/.test(ua)) {
        description.unshift('mobile mode');
      }
    }
    // Add mobile postfix.
    else if ((/^(?:Chrome|IE|Opera)$/.test(name) || name && !product && !/Browser|Mobi/.test(name)) &&
        (os == 'Windows CE' || /Mobi/i.test(ua))) {
      name += ' Mobile';
    }
    // Detect IE platform preview.
    else if (name == 'IE' && useFeatures) {
      try {
        if (context.external === null) {
          description.unshift('platform preview');
        }
      } catch(e) {
        description.unshift('embedded');
      }
    }
    // Detect BlackBerry OS version.
    // http://docs.blackberry.com/en/developers/deliverables/18169/HTTP_headers_sent_by_BB_Browser_1234911_11.jsp
    else if ((/\bBlackBerry\b/.test(product) || /\bBB10\b/.test(ua)) && (data =
          (RegExp(product.replace(/ +/g, ' *') + '/([.\\d]+)', 'i').exec(ua) || 0)[1] ||
          version
        )) {
      data = [data, /BB10/.test(ua)];
      os = (data[1] ? (product = null, manufacturer = 'BlackBerry') : 'Device Software') + ' ' + data[0];
      version = null;
    }
    // Detect Opera identifying/masking itself as another browser.
    // http://www.opera.com/support/kb/view/843/
    else if (this != forOwn && product != 'Wii' && (
          (useFeatures && opera) ||
          (/Opera/.test(name) && /\b(?:MSIE|Firefox)\b/i.test(ua)) ||
          (name == 'Firefox' && /\bOS X (?:\d+\.){2,}/.test(os)) ||
          (name == 'IE' && (
            (os && !/^Win/.test(os) && version > 5.5) ||
            /\bWindows XP\b/.test(os) && version > 8 ||
            version == 8 && !/\bTrident\b/.test(ua)
          ))
        ) && !reOpera.test((data = parse.call(forOwn, ua.replace(reOpera, '') + ';'))) && data.name) {
      // When "identifying", the UA contains both Opera and the other browser's name.
      data = 'ing as ' + data.name + ((data = data.version) ? ' ' + data : '');
      if (reOpera.test(name)) {
        if (/\bIE\b/.test(data) && os == 'Mac OS') {
          os = null;
        }
        data = 'identify' + data;
      }
      // When "masking", the UA contains only the other browser's name.
      else {
        data = 'mask' + data;
        if (operaClass) {
          name = format(operaClass.replace(/([a-z])([A-Z])/g, '$1 $2'));
        } else {
          name = 'Opera';
        }
        if (/\bIE\b/.test(data)) {
          os = null;
        }
        if (!useFeatures) {
          version = null;
        }
      }
      layout = ['Presto'];
      description.push(data);
    }
    // Detect WebKit Nightly and approximate Chrome/Safari versions.
    if ((data = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(ua) || 0)[1])) {
      // Correct build number for numeric comparison.
      // (e.g. "532.5" becomes "532.05")
      data = [parseFloat(data.replace(/\.(\d)$/, '.0$1')), data];
      // Nightly builds are postfixed with a "+".
      if (name == 'Safari' && data[1].slice(-1) == '+') {
        name = 'WebKit Nightly';
        prerelease = 'alpha';
        version = data[1].slice(0, -1);
      }
      // Clear incorrect browser versions.
      else if (version == data[1] ||
          version == (data[2] = (/\bSafari\/([\d.]+\+?)/i.exec(ua) || 0)[1])) {
        version = null;
      }
      // Use the full Chrome version when available.
      data[1] = (/\bChrome\/([\d.]+)/i.exec(ua) || 0)[1];
      // Detect Blink layout engine.
      if (data[0] == 537.36 && data[2] == 537.36 && parseFloat(data[1]) >= 28 && layout == 'WebKit') {
        layout = ['Blink'];
      }
      // Detect JavaScriptCore.
      // http://stackoverflow.com/questions/6768474/how-can-i-detect-which-javascript-engine-v8-or-jsc-is-used-at-runtime-in-androi
      if (!useFeatures || (!likeChrome && !data[1])) {
        layout && (layout[1] = 'like Safari');
        data = (data = data[0], data < 400 ? 1 : data < 500 ? 2 : data < 526 ? 3 : data < 533 ? 4 : data < 534 ? '4+' : data < 535 ? 5 : data < 537 ? 6 : data < 538 ? 7 : data < 601 ? 8 : '8');
      } else {
        layout && (layout[1] = 'like Chrome');
        data = data[1] || (data = data[0], data < 530 ? 1 : data < 532 ? 2 : data < 532.05 ? 3 : data < 533 ? 4 : data < 534.03 ? 5 : data < 534.07 ? 6 : data < 534.10 ? 7 : data < 534.13 ? 8 : data < 534.16 ? 9 : data < 534.24 ? 10 : data < 534.30 ? 11 : data < 535.01 ? 12 : data < 535.02 ? '13+' : data < 535.07 ? 15 : data < 535.11 ? 16 : data < 535.19 ? 17 : data < 536.05 ? 18 : data < 536.10 ? 19 : data < 537.01 ? 20 : data < 537.11 ? '21+' : data < 537.13 ? 23 : data < 537.18 ? 24 : data < 537.24 ? 25 : data < 537.36 ? 26 : layout != 'Blink' ? '27' : '28');
      }
      // Add the postfix of ".x" or "+" for approximate versions.
      layout && (layout[1] += ' ' + (data += typeof data == 'number' ? '.x' : /[.+]/.test(data) ? '' : '+'));
      // Obscure version for some Safari 1-2 releases.
      if (name == 'Safari' && (!version || parseInt(version) > 45)) {
        version = data;
      }
    }
    // Detect Opera desktop modes.
    if (name == 'Opera' &&  (data = /\bzbov|zvav$/.exec(os))) {
      name += ' ';
      description.unshift('desktop mode');
      if (data == 'zvav') {
        name += 'Mini';
        version = null;
      } else {
        name += 'Mobile';
      }
      os = os.replace(RegExp(' *' + data + '$'), '');
    }
    // Detect Chrome desktop mode.
    else if (name == 'Safari' && /\bChrome\b/.exec(layout && layout[1])) {
      description.unshift('desktop mode');
      name = 'Chrome Mobile';
      version = null;

      if (/\bOS X\b/.test(os)) {
        manufacturer = 'Apple';
        os = 'iOS 4.3+';
      } else {
        os = null;
      }
    }
    // Strip incorrect OS versions.
    if (version && version.indexOf((data = /[\d.]+$/.exec(os))) == 0 &&
        ua.indexOf('/' + data + '-') > -1) {
      os = trim(os.replace(data, ''));
    }
    // Add layout engine.
    if (layout && !/\b(?:Avant|Nook)\b/.test(name) && (
        /Browser|Lunascape|Maxthon/.test(name) ||
        name != 'Safari' && /^iOS/.test(os) && /\bSafari\b/.test(layout[1]) ||
        /^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|Web)/.test(name) && layout[1])) {
      // Don't add layout details to description if they are falsey.
      (data = layout[layout.length - 1]) && description.push(data);
    }
    // Combine contextual information.
    if (description.length) {
      description = ['(' + description.join('; ') + ')'];
    }
    // Append manufacturer to description.
    if (manufacturer && product && product.indexOf(manufacturer) < 0) {
      description.push('on ' + manufacturer);
    }
    // Append product to description.
    if (product) {
      description.push((/^on /.test(description[description.length - 1]) ? '' : 'on ') + product);
    }
    // Parse the OS into an object.
    if (os) {
      data = / ([\d.+]+)$/.exec(os);
      isSpecialCasedOS = data && os.charAt(os.length - data[0].length - 1) == '/';
      os = {
        'architecture': 32,
        'family': (data && !isSpecialCasedOS) ? os.replace(data[0], '') : os,
        'version': data ? data[1] : null,
        'toString': function() {
          var version = this.version;
          return this.family + ((version && !isSpecialCasedOS) ? ' ' + version : '') + (this.architecture == 64 ? ' 64-bit' : '');
        }
      };
    }
    // Add browser/OS architecture.
    if ((data = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(arch)) && !/\bi686\b/i.test(arch)) {
      if (os) {
        os.architecture = 64;
        os.family = os.family.replace(RegExp(' *' + data), '');
      }
      if (
          name && (/\bWOW64\b/i.test(ua) ||
          (useFeatures && /\w(?:86|32)$/.test(nav.cpuClass || nav.platform) && !/\bWin64; x64\b/i.test(ua)))
      ) {
        description.unshift('32-bit');
      }
    }
    // Chrome 39 and above on OS X is always 64-bit.
    else if (
        os && /^OS X/.test(os.family) &&
        name == 'Chrome' && parseFloat(version) >= 39
    ) {
      os.architecture = 64;
    }

    ua || (ua = null);

    /*------------------------------------------------------------------------*/

    /**
     * The platform object.
     *
     * @name platform
     * @type Object
     */
    var platform = {};

    /**
     * The platform description.
     *
     * @memberOf platform
     * @type string|null
     */
    platform.description = ua;

    /**
     * The name of the browser's layout engine.
     *
     * The list of common layout engines include:
     * "Blink", "EdgeHTML", "Gecko", "Trident" and "WebKit"
     *
     * @memberOf platform
     * @type string|null
     */
    platform.layout = layout && layout[0];

    /**
     * The name of the product's manufacturer.
     *
     * The list of manufacturers include:
     * "Apple", "Archos", "Amazon", "Asus", "Barnes & Noble", "BlackBerry",
     * "Google", "HP", "HTC", "LG", "Microsoft", "Motorola", "Nintendo",
     * "Nokia", "Samsung" and "Sony"
     *
     * @memberOf platform
     * @type string|null
     */
    platform.manufacturer = manufacturer;

    /**
     * The name of the browser/environment.
     *
     * The list of common browser names include:
     * "Chrome", "Electron", "Firefox", "Firefox for iOS", "IE",
     * "Microsoft Edge", "PhantomJS", "Safari", "SeaMonkey", "Silk",
     * "Opera Mini" and "Opera"
     *
     * Mobile versions of some browsers have "Mobile" appended to their name:
     * eg. "Chrome Mobile", "Firefox Mobile", "IE Mobile" and "Opera Mobile"
     *
     * @memberOf platform
     * @type string|null
     */
    platform.name = name;

    /**
     * The alpha/beta release indicator.
     *
     * @memberOf platform
     * @type string|null
     */
    platform.prerelease = prerelease;

    /**
     * The name of the product hosting the browser.
     *
     * The list of common products include:
     *
     * "BlackBerry", "Galaxy S4", "Lumia", "iPad", "iPod", "iPhone", "Kindle",
     * "Kindle Fire", "Nexus", "Nook", "PlayBook", "TouchPad" and "Transformer"
     *
     * @memberOf platform
     * @type string|null
     */
    platform.product = product;

    /**
     * The browser's user agent string.
     *
     * @memberOf platform
     * @type string|null
     */
    platform.ua = ua;

    /**
     * The browser/environment version.
     *
     * @memberOf platform
     * @type string|null
     */
    platform.version = name && version;

    /**
     * The name of the operating system.
     *
     * @memberOf platform
     * @type Object
     */
    platform.os = os || {

      /**
       * The CPU architecture the OS is built for.
       *
       * @memberOf platform.os
       * @type number|null
       */
      'architecture': null,

      /**
       * The family of the OS.
       *
       * Common values include:
       * "Windows", "Windows Server 2008 R2 / 7", "Windows Server 2008 / Vista",
       * "Windows XP", "OS X", "Ubuntu", "Debian", "Fedora", "Red Hat", "SuSE",
       * "Android", "iOS" and "Windows Phone"
       *
       * @memberOf platform.os
       * @type string|null
       */
      'family': null,

      /**
       * The version of the OS.
       *
       * @memberOf platform.os
       * @type string|null
       */
      'version': null,

      /**
       * Returns the OS string.
       *
       * @memberOf platform.os
       * @returns {string} The OS string.
       */
      'toString': function() { return 'null'; }
    };

    platform.parse = parse;
    platform.toString = toStringPlatform;

    if (platform.version) {
      description.unshift(version);
    }
    if (platform.name) {
      description.unshift(name);
    }
    if (os && name && !(os == String(os).split(' ')[0] && (os == name.split(' ')[0] || product))) {
      description.push(product ? '(' + os + ')' : 'on ' + os);
    }
    if (description.length) {
      platform.description = description.join(' ');
    }
    return platform;
  }

  /*--------------------------------------------------------------------------*/

  // Export platform.
  var platform = parse();

  // Some AMD build optimizers, like r.js, check for condition patterns like the following:
  if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
    // Expose platform on the global object to prevent errors when platform is
    // loaded by a script tag in the presence of an AMD loader.
    // See http://requirejs.org/docs/errors.html#mismatch for more details.
    root.platform = platform;

    // Define as an anonymous module so platform can be aliased through path mapping.
    define(function() {
      return platform;
    });
  }
  // Check for `exports` after `define` in case a build optimizer adds an `exports` object.
  else if (freeExports && freeModule) {
    // Export for CommonJS support.
    forOwn(platform, function(value, key) {
      freeExports[key] = value;
    });
  }
  else {
    // Export to the global object.
    root.platform = platform;
  }
}.call(this));

/* ========================================================================
 * Phonon: core.js v0.0.1
 * http://phonon.quarkdev.com
 * ========================================================================
 * Licensed under MIT (http://phonon.quarkdev.com)
 * ======================================================================== */

'use strict';

;(function(window, undefined) {

	var phonon = {};
	var readyCallbacks = [];

	/**
	 * Called when Phonon is ready
	 * Used in navigator.js
	 */
	phonon.onReady = function(callback) {
		readyCallbacks.push(callback);
	};

	/**
	 * Dispatches all the ready events
	 */
	phonon.dispatchGlobalReady = function() {
	    var i = readyCallbacks.length - 1;
	    for (; i >= 0; i--) {
	      readyCallbacks[i]();
	    }
	    
	    // Release memory
	    readyCallbacks = [];
	    phonon.dispatchGlobalReady = undefined;
	}

	/**
	 * CustomEvent polyfill
     * IE 9+, Android 4
	*/
	;(function () {
		function CustomEvent ( event, params ) {
			params = params || { bubbles: false, cancelable: false, detail: undefined };
			var evt = document.createEvent( 'CustomEvent' );
			evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
			return evt;
		}

		CustomEvent.prototype = window.Event.prototype;

		window.CustomEvent = CustomEvent;
	})();
phonon.device = (function (platform) {

	/* Use of platform.js
	* https://github.com/bestiejs/platform.js
	* License: https://github.com/bestiejs/platform.js/blob/master/LICENSE
	*/

	// device: append osVersion and os for backward compatibility
	return {
		osVersion: platform.os.version,
		os: platform.os.family,
		platform: platform,
		// Const
		ANDROID: 'Android',
		IOS: 'iOS'
	}

})(window.platform);

phonon.browser = (function (platform) {

	/* Use of platform.js
	* https://github.com/bestiejs/platform.js
	* License: https://github.com/bestiejs/platform.js/blob/master/LICENSE
	*/
	return {
		name: platform.name,
		version: platform.version,
		platform: platform
	}
})(window.platform);

phonon.ajax = (function () {

	/**
	* Creates the XMLHttpRequest Object
	* @param {boolean} useCrossDomain
	* @return {XMLHttpRequest | Null}
	* @private
	*/
	var createXhr = function (useCrossDomain) {
		var xhr = null;
		try  {
			xhr = new XMLHttpRequest();
			if ('withCredentials' in xhr && useCrossDomain) {
				xhr.withCredentials = true;
			}
		} catch (e) {
			console.error(e);
		}

		return xhr;
	};

	/**
	* Parses the API response in JSON format
	* @param {String} responseText
	* @return {JSONObject}
	* @private
	*/
	var toJSON = function(responseText) {
		var response = null;
		try  {
			response = JSON.parse(responseText);
		} catch (e) {
			response = null;
		}
		return response;
	};

	/**
	* Transforms an object to a string
	* @param {Object} data
	*/
	var objToString = function(data) {
		var strData = '';
		var key;

		for(key in data) {
			strData += key + '=' + data[key] + '&';
		}

		var last = strData.lastIndexOf('&');
		if(last !== -1) {
			data = strData.substring(0, last);
		}
		return strData;
	};

	/**
	* Executes an Ajax request
	* @param {Object} opts
	*/
	return function(opts) {

		var method = opts.method;
		var url = opts.url;
		var crossDomain = (typeof opts.crossDomain === 'boolean' ? opts.crossDomain : false);
		var contentType = opts.contentType;
		var dataType = opts.dataType;
		var data = opts.data;
		var timeout = opts.timeout;
		var success = opts.success;
		var error = opts.error;
		var headers = opts.headers;

		if(typeof method !== 'string') throw new TypeError('method must be a string');
		if(typeof url !== 'string') throw new TypeError('url must be a string');
		// https://github.com/quark-dev/Phonon-Framework/issues/195#issuecomment-274266194
		if(typeof opts.contentType === 'undefined') opts.contentType = 'application/x-www-form-urlencoded; charset=UTF-8';
		if(typeof data === 'object') data = contentType === 'application/json' ? JSON.stringify(data) : objToString(data);

		var xhr = createXhr(crossDomain);
		var flagError = 'NO_INTERNET_ACCESS';

		if(xhr) {

			xhr.open(method, url, true);

			if(typeof contentType === 'string') {
				xhr.setRequestHeader('Content-type', contentType);
			}
			if(dataType === 'xml') {
				if(xhr.overrideMimeType) xhr.overrideMimeType('application/xml; charset=utf-8');
			}

			if(typeof headers === 'object') {
				var key;
				for(key in headers) {
					xhr.setRequestHeader(key, headers[key]);
				}
			}

			xhr.onreadystatechange = function(event) {

				if (xhr.readyState === 4) {
					var res = null;

					if(dataType === 'json') {
						res = toJSON(xhr.responseText);
						if(res === null) {
							flagError = 'JSON_MALFORMED';
						}
					} else if(dataType === 'xml') {
						res = xhr.responseXML;
					} else {
						res = xhr.responseText;
					}

					var status = xhr.status.toString();

					// Success 2xx
					if (status[0] === '2' && typeof success === 'function') {

						success(res, xhr);

					} else {

						// error
						if (typeof error === 'function') {
							window.setTimeout(function() {
								error(res, flagError, xhr);
							}, 1);
						}
					}

					xhr = null;
				}
			};

			if (typeof timeout === 'number') {
				xhr.timeout = timeout;
				xhr.ontimeout = function () {
					flagError = 'TIMEOUT_EXCEEDED';
				};
			}
			xhr.send(data);

		} else {
			if (typeof error === 'function') {
				flagError = 'XMLHTTPREQUEST_UNAVAILABLE';
				error(flagError);
			}
		}

		return {
			cancel: function() {
				flagError = 'REQUEST_CANCELED';
				if(xhr) xhr.abort();
			}
		};
	};
})();

phonon.event = (function ($) {

    /**
     * Events
     * [1] touch enabled boolean
     * [2] start, move, end and tap events
     * [3] transitionEnd and animationEnd polyfill
     */

    // Use available events
    // mousecancel does not exists
    var availableEvents = ['mousedown', 'mousemove', 'mouseup'];

    // Check if touch is enabled
    var hasTouch = false;
    if(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
        hasTouch = true;
        availableEvents = ['touchstart', 'touchmove', 'touchend', 'touchcancel'];
    }

    if (window.navigator.pointerEnabled) {
        availableEvents = ['pointerdown', 'pointermove', 'pointerup', 'pointercancel'];
    } else if (window.navigator.msPointerEnabled) {
        availableEvents = ['MSPointerDown', 'MSPointerMove', 'MSPointerUp', 'MSPointerCancel'];
    }

    var api = {};

    api.hasTouch = hasTouch;

    api.start = availableEvents[0];
    api.move = availableEvents[1];
    api.end = availableEvents[2];
    api.cancel = typeof availableEvents[3] === 'undefined' ? null : availableEvents[3];

    api.tap = 'tap';

	/**
	 * By default, force click event if the browser does
	 * not support touch events
	 */
	api.forceTap = false

    /**
     * Animation/Transition event polyfill
    */
    var el = document.createElement('div');
    var transitions = [
        { name: 'transition', end: 'transitionend' } ,
        { name: 'MozTransition', end: 'transitionend' },
        { name: 'msTransition', end: 'msTransitionEnd' },
        { name: 'WebkitTransition', end: 'webkitTransitionEnd' }
    ];
    var animations = [
        { name: 'animation', end: 'animationend' } ,
        { name: 'MozAnimation', end: 'animationend' },
        { name: 'msAnimation', end: 'msAnimationEnd' },
        { name: 'WebkitAnimation', end: 'webkitAnimationEnd' }
    ];

    var transitionEnd = null;
    var animationEnd = null;

    var i = transitions.length - 1;
    for (i in transitions) {
        if (el.style[transitions[i].name] !== undefined) {
            transitionEnd = transitions[i].end;
            break;
        }
    }

    var j = animations.length - 1;
    for (j in animations) {
        if (el.style[animations[j].name] !== undefined) {
            animationEnd = animations[j].end;
            break;
        }
    }

    // fix bug on Android 4.1
    var osV = phonon.device.osVersion;
    if(osV && osV.length > 2) {
        osV = phonon.device.osVersion.substring(0,3);
    }

    if(phonon.device.os && phonon.device.os.toLowerCase() === 'android' && osV === '4.1') {
        transitionEnd = 'webkitTransitionEnd';
        animationEnd = 'webkitAnimationEnd';
    }

    api.transitionEnd = transitionEnd;
    api.animationEnd = animationEnd;

    var tapEls = [];

    var TapElement = (function () {

        function TapElement(el, callback) {
            this.el = el;
            this.callback = callback;
            this.moved = false;
            this.startX = 0;
            this.startY = 0;

            this.el.addEventListener(api.start, this, false);
        }

        TapElement.prototype.start = function(e) {

            this.el.addEventListener(api.move, this, false);
            this.el.addEventListener(api.end, this, false);

            this.moved = false;

            this.startX = (e.touches ? e.touches[0].clientX : e.clientX);
            this.startY = (e.touches ? e.touches[0].clientY : e.clientY);
        };

        TapElement.prototype.move = function(e) {

            var moveX = (e.touches ? e.touches[0].clientX : e.clientX);
            var moveY = (e.touches ? e.touches[0].clientY : e.clientY);

            //if finger moves more than 10px flag to cancel
            if (Math.abs(moveX - this.startX) > 10 || Math.abs(moveY - this.startY) > 10) {
                this.moved = true;
            }
        };

        TapElement.prototype.end = function(e) {

            this.el.removeEventListener(api.move, this, false);
            this.el.removeEventListener(api.end, this, false);

            if (api.cancel !== null) this.el.removeEventListener(api.cancel, this, false);

            if (!this.moved) {
                /**
                 * jQuery/Zepto compatibility with the tap event
                 * See issue: #147
                 */
                if (typeof $ !== 'undefined') {
                    var customEvent = new window.CustomEvent(
                        this.tap,
                        {
                            detail: {
                                event: 'tap',
                                target: this.element
                            },
                            bubbles: true,
                            cancelable: true
                        }
                    );
                    this.el.dispatchEvent(customEvent);
                }

                this.callback(e);
            }
        };

        TapElement.prototype.cancel = function() {
            this.moved = false;
            this.startX = 0;
            this.startY = 0;
        };

        TapElement.prototype.off = function() {
            this.el.removeEventListener(api.start, this, false);
            this.el.removeEventListener(api.move, this, false);
            this.el.removeEventListener(api.end, this, false);
            if(api.cancel !== null) this.el.removeEventListener(api.cancel, this, false);
        };

        TapElement.prototype.handleEvent = function(e) {
            switch (e.type) {
                case api.start: this.start(e); break;
                case api.move: this.move(e); break;
                case api.end: this.end(e); break;
                case api.cancel: this.cancel(e); break; // api.cancel can be null
            }
        };

        return TapElement;
    })();

    phonon.on = function(el, eventName, callback, useCapture) {
        var addEvent = function(el, eventName, callback, useCapture) {
            if(eventName === api.tap && (api.hasTouch || api.forceTap)) {
                var tap = new TapElement(el, callback);
                tapEls.push(tap);
                return;
            }

            if(eventName === api.tap) {
                eventName = 'click';
            }

            if(el.addEventListener) {
                el.addEventListener(eventName, callback, useCapture);
            } else if(el.attachEvent) {
                el.attachEvent('on' + eventName, callback, useCapture);
            }
        };

        if(typeof el.length !== 'undefined') {
            var i = 0;
            var l = el.length;
            for (; i < l; i++) {
                addEvent(el[i], eventName, callback, useCapture)
            }
            return
        }
        addEvent(el, eventName, callback, useCapture)
    };

    window.on = document.on = NodeList.prototype.on = HTMLElement.prototype.on = function(type, listener, useCapture) {
        phonon.on(this, type, listener, useCapture);
    };

    phonon.off = function(el, eventName, callback, useCapture) {

        var removeEvent = function (el, eventName, callback, useCapture) {
            if(eventName === api.tap && (api.hasTouch || api.forceTap)) {
                var i = 0;
                var l = tapEls.length;
                for (; i < l; i++) {
                    if(tapEls[i].el === el) {
                        tapEls[i].off();
                        tapEls.splice(i, 1);
                        break;
                    }
                }
                return;
            }

			if(eventName === api.tap) {
                eventName = 'click';
            }

            if(el.removeEventListener) {
                el.removeEventListener(eventName, callback, useCapture);
            } else if(el.attachEvent) {
                el.detachEvent('on' + eventName, callback, useCapture);
            }
        };

        if(typeof el.length !== 'undefined') {
            var i = 0;
            var l = el.length;
            for (; i < l; i++) {
                removeEvent(el[i], eventName, callback, useCapture)
            }
            return
        }

        removeEvent(el, eventName, callback, useCapture)
    };

    window.off = document.off = NodeList.prototype.off = HTMLElement.prototype.off = function(type, listener, useCapture) {
        phonon.off(this, type, listener, useCapture);
    };

    return api;

})(window.jQuery);

phonon.tagManager = (function () {

	if(typeof riot === 'undefined') {
		return;
	}

	var tags = [];

	var addTag = function(tag, name) {
	    tag[0].tagName = name;
	    tags.push(tag[0]);
	};

	var getAll = function() {
		return tags;
	};

	var trigger = function(pageName, eventName, eventParams) {

		var arr = [];
		var i = tags.length - 1;

		for (; i >= 0; i--) {
			if(tags[i].tagName === pageName) {
				arr.push(eventName);
				var conc = arr.concat(eventParams);
				tags[i].trigger.apply(this, conc);
				break;
			}
		}
	};

	return {
		addTag: addTag,
		getAll: getAll,
		trigger: trigger
	};

})();
	// init
	phonon.options = function(options) {
		var useI18n = false;
		if(typeof options.i18n === 'object' && options.i18n !== null) {
			phonon.i18n(options.i18n);
			useI18n = true;
		}

		options.navigator.useI18n = useI18n;
		phonon.navigator(options.navigator);
	};

	/**
	 * Shortcuts for dialog
	 */
	phonon.alert = function(text, title, cancelable, textOk) {
		return phonon.dialog().alert(text, title, cancelable, textOk);
	};

	phonon.confirm = function(text, title, cancelable, textOk, textCancel) {
		return phonon.dialog().confirm(text, title, cancelable, textOk, textCancel);
	};

	phonon.prompt = function(text, title, cancelable, textOk, textCancel) {
		return phonon.dialog().prompt(text, title, cancelable, textOk, textCancel);
	};

	phonon.passPrompt = function(text, title, cancelable, textOk, textCancel) {
		return phonon.dialog().passPrompt(text, title, cancelable, textOk, textCancel);
	};

	phonon.indicator = function(title, cancelable) {
		return phonon.dialog().indicator(title, cancelable);
	};

	/**
	* Changes the language and updates tags
	* @param {String} locale
	*/
	phonon.updateLocale = function(locale) {

		var riotEnabled = (typeof riot !== 'undefined' ? true : false);

		phonon.i18n().setPreference(locale).getAll(function(json) {

			if(riotEnabled) {

				var virtualDom = phonon.tagManager.getAll();
				var i = virtualDom.length - 1;
				for (; i >= 0; i--) {
					virtualDom[i].i18n = json;
				}

				// Global update
				riot.update();

			} else {
				phonon.i18n().bind();
			}
		});
	};

	
	window.phonon = phonon

	if(typeof exports === 'object') {
		module.exports = phonon;
	} else if(typeof define === 'function' && define.amd) {
		define(function() { return window.phonon = phonon });
	}


}(typeof window !== 'undefined' ? window : this));
/* ========================================================================
 * Phonon: i18n.js v0.2.1
 * http://phonon.quarkdev.com
 * ========================================================================
 * Licensed under MIT (http://phonon.quarkdev.com)
 * ======================================================================== */
;(function (window, document) {

    var jsonCache = null;

    var opts = {
        localeFallback: null,
        localePreferred: window.navigator.userLanguage || window.navigator.language,
        directory: './',
        initCalled: false,
        loadJson: true
    };

    /**
     * Checks if the given argument is a DOM element
     * @param {DOMObject} o the argument to test
     * @return true if the object is a DOM element, false otherwise
     * @private
     */
    var isElement = function (o) {
        return (typeof Node === 'object' ? o instanceof Node : o && typeof o === 'object' && typeof o.nodeType === 'number' && typeof o.nodeName === 'string');
    };

    /**
     * Binds some text to the given DOM element
     * @param {DOMObject} el
     * @param {String} text
     * @private
     */
    var setText = function (el, text) {
        if(!('textContent' in el)) {
            el.innerText = text;
        } else {
            el.textContent = text;
        }
    };

    /**
    * Binds some html to the given DOM element
    * @param {DOMObject} el
    * @param {String} text
    * @private
    */
    var setHtml = function (el, text){
        el.innerHTML = text;
    }

    /**
     * Binds the value to the given DOM element
     * @param {DOMObject} el
     * @param {String} text
     * @private
     */
    var setValue = function (el, text) {
        el.value = text;
    };

    /**
     * Binds the placeholder to the given DOM element
     * @param {DOMObject} el
     * @param {String} text
     * @private
     */
    var setPlaceholder = function (el, text) {
        el.setAttribute('placeholder', text);
    };

    /**
     * Reads data-i18n attributes and set JSON values
     * @param {Array} elements
     * @param {JSON} json
     * @private
     */
    var computeNodes = function (elements, json) {

        var i = elements.length - 1;

        for (; i >= 0; i--) {
            var el = elements[i];
            var data = el.getAttribute('data-i18n').trim();
            var r = /(?:\s|^)(\w+):\s*(.*?)(?=\s+\w+:|$)/g, m;

            while (m = r.exec(data)) {
                var key = m[1].trim();
                var value = m[2].trim().replace(',', '');
                if (json[value] !== undefined) {
                    if (key === 'text') {
                        setText(el, json[value]);
                    } else if (key === 'html') {
                        setHtml(el, json[value]);
                    } else if (key === 'value') {
                        setValue(el, json[value]);
                    } else if (key === 'placeholder') {
                        setPlaceholder(el, json[value]);
                    } else {
                        throw new Error('The property: ' + key + ' is unknown');
                    }
                } else {
                    console.error('The value: ' + value + ' does not exist in the JSON file');
                }
            }
        }
    };


    /**
     * Public API
     */

    var api = {};

    /**
     * @param {Object} options
     * @public
     */
    function init(options) {
        if (opts.initCalled) {
            throw new Error('The i18n module has already been instantiated');
        }

        if(typeof options.directory === 'string') {
            options.directory = ( (options.directory.indexOf('/', options.directory.length - '/'.length) !== -1) ? options.directory : options.directory + '/');
        }

        var prop;
        for (prop in options) {
            opts[prop] = options[prop];
        }

		if(typeof options.use !== 'undefined') {
            opts.loadJson = false
        }

        opts.initCalled = true;
    }
    api.init = init;

    /**
     * Reads JSON data
     * @param {Function} callback
     */
    function getAll(callback) {
        if (!opts.initCalled) {
            throw new Error('Please, initialize The i18n module using the init method');
        }
        if (typeof callback !== 'function') {
            throw new Error('callback must be a function');
        }

        var locale = opts.localePreferred ? opts.localePreferred : opts.localeFallback;

        if(opts.loadJson) {
            // JSON
            if(jsonCache !== null) {
                callback(jsonCache);
                return;
            }

            var xhr = new XMLHttpRequest();

            xhr.open('GET', opts.directory + locale + '.json', true);
            if(xhr.overrideMimeType) xhr.overrideMimeType('application/json; charset=utf-8');

            var fallback = function() {
                // The preferred locale is not available
                opts.localePreferred = null;
                getAll(function (json) {
                    jsonCache = json;
                    callback(json);
                });
            };

            xhr.onreadystatechange = function () {
                if(xhr.readyState === 4 && (xhr.status === 200 || !xhr.status && xhr.responseText.length)) {
                    try {
                        var json = JSON.parse(xhr.responseText)
                        jsonCache = json
                        callback(jsonCache);                        
                    } catch (e) {
                        fallback();
                    }
                } else if(xhr.readyState === 4 && !(xhr.status === 200 || !xhr.status && xhr.responseText.length)) {
                    if(opts.localePreferred) {
                        fallback();
                    } else {
                        throw new Error('The default locale [' + opts.directory + opts.localeFallback + '.json] file is not found');
                    }
                }
            };
            xhr.send('');
        } else {
            // Array
            var data = opts.use[locale];
            if(typeof data === 'undefined') {
                data = opts.use[opts.localeFallback];
            }
            callback(data);
        }
    }
    api.getAll = getAll;

    /**
     * Gets a value in the JSON file with a key or many keys (array)
     * @param {String | Array} key
     * @param {Function} callback
     */
    function get(key, callback) {
        if (typeof key !== 'string' && !(key instanceof Array)) {
            throw new Error('key must be a string or an array');
        }

        var isArray = (key instanceof Array ? true : false);

        if(opts.loadJson && jsonCache !== null) {
            if(!isArray) {
                callback(jsonCache[key]);
            } else {

                var l = key.length, i = l - 1, obj = {};

                for (; i >= 0; i--) {
                    obj[key[i]] = jsonCache[key[i]];
                }
                callback(obj);
            }
            return;
        }

        getAll(function(json) {
            if(!isArray) {
                callback(json[key]);
            } else {
                var l = key.length, i = l - 1, obj = {};
                for (; i >= 0; i--) {
                    obj[key[i]] = json[key[i]];
                }
                callback(obj);
            }
        });
    }
    api.get = get;

    /**
     * Binds the HTML Object with JSON data
     * @param {DOMObject} el (optional) if el is not set, the document will be binded
     * @param {Function} callback (optional)
     */
    function bind(el, callback) {
        var element = el || document;
        var callbackFunction = callback;

        if (arguments.length === 1) {
            if (typeof el === 'function') {
                element = document;
                callbackFunction = el;
            }
        }

        if (!isElement(element)) {
            throw new TypeError('Not valid element object ' + element);
        }

        var elements = element.querySelectorAll('[data-i18n]');

        if(jsonCache === null) {

            getAll(function (json) {

                computeNodes(elements, json);
                if (typeof callbackFunction === 'function') callbackFunction();
            });
        } else {
            computeNodes(elements, jsonCache);
            if (typeof callbackFunction === 'function') callbackFunction();
        }
    }
    api.bind = bind;

    /**
     * Sets the preferred language
     * @param {String} l the new language
     */
    function setPreference(preference) {
        if (typeof preference !== 'string') {
            throw new Error('The language must be a string');
        }
        opts.localePreferred = preference;
        // reset the cache
        jsonCache = null;

        return api;
    }
    api.setPreference = setPreference;

    /**
     * Returns the preferred language
     * @return {String}
     */
    function getPreference() {
        return opts.localePreferred;
    }
    api.getPreference = getPreference;

    /**
     * Returns the browser language
     * @return {String}
     */
    function getLocale() {
        return window.navigator.userLanguage || window.navigator.language;
    }
    api.getLocale = getLocale;


    phonon.i18n = function (opts) {

        if(typeof opts === 'object') {
            init(opts);
        }

        return {
            getAll: function (callback) {
                getAll(callback);
                return this;
            },
            get: function (key, callback) {
                get(key, callback);
                return this;
            },
            bind: function (el, callback) {
                bind(el, callback);
                return this;
            },
            setPreference: function (preference) {
                setPreference(preference);
                return this;
            },
            getPreference: function () {
                return getPreference();
            },
            getLocale: function () {
                return getLocale();
            }
        };
    };

}(window, document));

/* ========================================================================
 * Phonon: navigator.js v1.2
 * http://phonon.quarkdev.com
 * ========================================================================
 * Licensed under MIT (http://phonon.quarkdev.com)
 * ======================================================================== */
;(function (window, riot, phonon) {

  'use strict';

  window.phononDOM = {}

  var pages = [];
  var pageHistory = [];
  var started = false;
  var onActiveTransition = false;

  var currentPage = null;
  var previousPage = null;

  var forward = true;
  var safeLink = false;

  var riotEnabled = (riot === undefined ? false : true);

  var opts = {
    defaultPage: null,
    defaultTemplateExtension: null,
    hashPrefix: '!',
    animatePages: true,
    templateRootDirectory: '',
    useI18n: true,
    enableBrowserBackButton: false,
    useHash: true
  };

  /**
   * "Encapsulated" class
   * The activity takes care of creating a window for you in which you can place your UI with.
   * An activity is based on several window states that we call the activitiy life cycle.
   */
  var Activity = (function () {

    /**
     * @constructor
	 * @param {Object} scope
     */
    function Activity(scope) {
		if(typeof scope === 'object') {
			var handler;
			for(handler in scope) {
				if(this[handler] !== undefined && this[handler] !== 'constructor') {
					this[handler + 'Callback'] = scope[handler];
				}
			}
		}
	}

    /**
     *
     * @param {Function} callback
     */
    Activity.prototype.onCreate = function (callback) {
      this.onCreateCallback = callback;
    };

    /**
     * onReady is called after onCreate and for each page refresh (optional)
     * @param {Function} callback
     */
    Activity.prototype.onReady = function (callback) {
      this.onReadyCallback = callback;
    };

    /**
     * Called when the user leaves the page
     * @param {Function} callback
     */
    Activity.prototype.onClose = function (callback) {
      this.onCloseCallback = function (self) {
        callback(self);
      };
    };

    /**
     * Called when the page is completely hidden
     * @param {Function} callback
     */
    Activity.prototype.onHidden = function (callback) {
      this.onHiddenCallback = callback;
    };

    /**
     * Called when the page transition is finished
     * @param {Function} callback
     */
    Activity.prototype.onTransitionEnd = function (callback) {
      this.onTransitionEndCallback = callback;
    };

    /**
     * Called when the page hash changes
     * @param {Function} callback
     */
    Activity.prototype.onHashChanged = function (callback) {
      this.onHashChangedCallback = function (req) {
        callback.apply(this, req);
      };
    };

    Activity.prototype.onTabChanged = function (callback) {
      this.onTabChangedCallback = function (tabNumber) {
        callback(tabNumber);
      };
    };

    return Activity;
  })();

  /**
   * Retrieves the page object
   * @param {String} pageName
   */
  var getPageObject = function(pageName) {

    var i = pages.length - 1;

    for (; i >= 0; i--) {
      if(pages[i].name === pageName) {
        return pages[i];
      }
    }
    return null;
  };

  function DOMEval(pageName, code) {
      // create page in window object
      if(typeof window.phononDOM[pageName] === 'undefined') {
        window.phononDOM[pageName] = {}
      }

      // add a js variable as shortcut
      var fullCode = 'var page = window.phononDOM["' + pageName + '"];';
      fullCode += code;

      // execute script
	  var script = document.createElement('script');
	  script.text = fullCode;
	  document.head.appendChild(script).parentNode.removeChild(script);
  }

  /**
   * Retrives the DOM element for a given page
   * @param {String} pageName
   */
  var getPageEl = function(pageName) {
    var pages = document.querySelectorAll('[data-page]');
    var i = pages.length - 1;
    var elPage = null;

    for (; i >= 0; i--) {
      var pageAlias = pages[i].getAttribute('data-alias')
      if(pages[i].tagName.toLowerCase() === pageName || pageAlias === pageName) {
        elPage = pages[i];
        break;
      }
    }
    return elPage;
  };

  function forwardAnimation() {

    if(opts.animatePages) {
      var previousPageEl = this;

      previousPageEl.classList.remove('page-sliding');
      previousPageEl.classList.remove('left');
      previousPageEl.off(phonon.event.animationEnd, forwardAnimation, false);

      previousPageEl.classList.remove('app-active');
    }
    callTransitionEnd(currentPage);
    callHiddenCallback(previousPage);

    onActiveTransition = false;
  }

  function previousAnimation() {

    if(opts.animatePages) {
      var previousPageEl = this;

      previousPageEl.classList.remove('page-sliding');
      previousPageEl.classList.remove('right');
      previousPageEl.off(phonon.event.animationEnd, previousAnimation, false);

      previousPageEl.classList.remove('app-active');
    }

    callTransitionEnd(currentPage);
    callHiddenCallback(previousPage);

    onActiveTransition = false;
  }

  function dispatchDOMEvent(eventName, pageName, parameters) {

	  var eventInitDict = {
          detail: { page: pageName },
          bubbles: true,
          cancelable: true
      };

	  if(typeof parameters !== 'undefined') {
		  eventInitDict.detail.req = parameters
	  }

	  var event = new window.CustomEvent(eventName, eventInitDict);

	  document.dispatchEvent(event);
  }

  /**
   * Dispatches page event from addEvent API
   *
   * @param {String} eventName
   * @param {Array} eventHandlers
   * @param {Object} data
   */
  function dispatchEvent(eventName, eventHandlers, data) {
      var i = 0;
      var l = eventHandlers.length;
      for (; i < l; i++) {
          var eventHandler = eventHandlers[i]
          if (eventHandler.event === eventName) {
              if (typeof eventHandler.callback === 'function') {
                  eventHandler.callback(data)
              }
          }
      }
  }

  function callCreate(pageName) {

    if(riotEnabled) {
      // Call the "create" event in VM
      phonon.tagManager.trigger(pageName, 'create');
    }

    /*
     * dispatch the event before calling the activity's callback
     * so that UI components are ready to use
     * issue #52 is related to this
    */
	dispatchDOMEvent('pagecreated', pageName)

	var page = getPageObject(pageName);

    // Call the onCreate callback
    if(page.activity instanceof Activity && typeof page.activity.onCreateCallback === 'function') {
      page.activity.onCreateCallback();
    }

    dispatchEvent('create', page.callbackRegistered);

    if(typeof window.phononDOM[page.name] === 'object') {
        var fn = window.phononDOM[page.name]['onCreate'];
        if(typeof fn === 'function') {
            fn()
        }
    }
  }

  function callReady(pageName) {

	var page = getPageObject(pageName);

    window.setTimeout(function() {

      if(riotEnabled) {
        // Call the "ready" event in VM
        phonon.tagManager.trigger(pageName, 'ready');
      }

      // Dispatch the global event pageopened
	  dispatchDOMEvent('pageopened', pageName)

      // Call the onReady callback
      if(page.activity instanceof Activity && typeof page.activity.onReadyCallback === 'function') {
        page.activity.onReadyCallback();
      }

      dispatchEvent('ready', page.callbackRegistered)

      if(typeof window.phononDOM[page.name] === 'object') {
          var fn = window.phononDOM[page.name]['onReady'];
          if(typeof fn === 'function') {
              fn()
          }
      }

    }, page.readyDelay);
  }

  function callTransitionEnd(pageName) {
    if(riotEnabled) {
      phonon.tagManager.trigger(pageName, 'transitionend');
    }

	dispatchDOMEvent('pagetransitionend', pageName);

    var page = getPageObject(pageName);

    // Call the onTransitionEnd callback
    if(page.activity instanceof Activity && typeof page.activity.onTransitionEndCallback === 'function') {
      page.activity.onTransitionEndCallback();
    }

    dispatchEvent('transitionend', page.callbackRegistered)

    if(typeof window.phononDOM[page.name] === 'object') {
        var fn = window.phononDOM[page.name]['onTransitionEnd'];
        if(typeof fn === 'function') {
            fn()
        }
    }
  }

  function callHiddenCallback(pageName) {

    if(riotEnabled) {
      phonon.tagManager.trigger(pageName, 'hidden');
    }

	dispatchDOMEvent('pagehidden', pageName)

    var page = getPageObject(pageName);

    // Call the onHidden callback
    if(page.activity instanceof Activity && typeof page.activity.onHiddenCallback === 'function') {
      page.activity.onHiddenCallback();
    }

    dispatchEvent('hidden', page.callbackRegistered)

    if(typeof window.phononDOM[page.name] === 'object') {
        var fn = window.phononDOM[page.name]['onHidden'];
        if(typeof fn === 'function') {
            fn()
        }
    }
  }

  function callTabChanged(pageName, tabNumber) {

    if(riotEnabled) {
      phonon.tagManager.trigger(pageName, 'tabchanged', tabNumber);
    }

	dispatchDOMEvent('pagetabchanged', pageName)

    var page = getPageObject(pageName);

    // Call the onTabChanged callback
    if(page.activity instanceof Activity && typeof page.activity.onTabChangedCallback === 'function') {
      page.activity.onTabChangedCallback(tabNumber);
    }

    dispatchEvent('tabchanged', page.callbackRegistered, tabNumber);

    if(typeof window.phononDOM[page.name] === 'object') {
        var fn = window.phononDOM[page.name]['onTabChanged'];
        if(typeof fn === 'function') {
            fn(tabNumber)
        }
    }
  }

  function callClose(pageName, nextPageName, hash) {
    function close() {
	  dispatchDOMEvent('pageclosed', pageName)

      var currentHash = window.location.hash.split('#')[1];

      if(currentHash === hash || !opts.useHash) {
        onRoute(hash);
      } else {
        window.location.hash = hash;
      }
    }

    // cancel the page transition
    if(isComponentVisible()) return;

    var page = getPageObject(pageName);

    // close the page directly
    if(!page.async) {
      close(true);
      return;
    }

    var api = {close: close};

    if(riotEnabled) {
      phonon.tagManager.trigger(pageName, 'close', api);
    }

    // Call the onclose callback
    if(page.activity instanceof Activity && typeof page.activity.onCloseCallback === 'function') {
      page.activity.onCloseCallback(api);
    }

    dispatchEvent('close', page.callbackRegistered, api);

    if(typeof window.phononDOM[page.name] === 'object') {
        var fn = window.phononDOM[page.name]['onClose'];
        if(typeof fn === 'function') {
            fn(api)
        }
    }
  }

  function callHash(pageName, params) {

    if(typeof params === 'undefined') return;

    if(riotEnabled) {
      phonon.tagManager.trigger(pageName, 'hashchanged', params);
    }

	dispatchDOMEvent('pagehash', pageName, params)

    var page = getPageObject(pageName);

    // Call the onHashChanged callback
    if(page.activity instanceof Activity && typeof page.activity.onHashChangedCallback === 'function') {
      page.activity.onHashChangedCallback(params);
    }

    dispatchEvent('hashchanged', page.callbackRegistered, params);

    if(typeof window.phononDOM[page.name] === 'object') {
        var fn = window.phononDOM[page.name]['onHashChanged'];
        if(typeof fn === 'function') {
            fn(params)
        }
    }
  }

  function callCallback(callbackName, options) {
    if(callbackName === 'tabchanged') {
      callTabChanged(options.page, options.tabNumber);
    }
  }

  function mount(pageName, fn, postData) {
    if(riotEnabled) {

      riot.compile(function() {

        if(opts.useI18n) {
          phonon.i18n().getAll(function(json) {
            phonon.tagManager.addTag(riot.mount(pageName, {i18n: json}), pageName);
            fn();
          });
        } else {
          phonon.tagManager.addTag(riot.mount(pageName, {i18n: null}), pageName);
          fn();
        }
      });
    }

    if(!riotEnabled) {

      var page = getPageObject(pageName);

      if(page.content !== null) {

        if(page.nocache === null || page.showloader === null){
          var setLoaderAndCache = function(pageName){
            var elPage = getPageEl(pageName);
            page.nocache = false
            page.showloader = false
              if(elPage.getAttribute('data-nocache') === 'true') page.nocache = true
              if(elPage.getAttribute('data-loader') === 'true') page.showloader = true
          };
          setLoaderAndCache(pageName)
        }

       if(page.showloader) document.body.classList.add('loading');

        loadContent(page.content, function(template) {
          if(page.showloader) document.body.classList.remove('loading');

          var elPage = getPageEl(pageName);

          var virtualDiv = document.createElement('div');
          virtualDiv.innerHTML = template;

          var virtualElPage = virtualDiv.querySelector(pageName);

          if(virtualElPage === null) {
            throw new Error('Error with ' + page.content + ' : the template for ' + pageName + ' must start with the parent node <' + pageName + ' class="app-page">');
          }
          var attrs = virtualElPage.attributes;

          var i = attrs.length - 1;

          for (; i >= 0; i--) {
            var attr = attrs.item(i);
            if(attr.nodeName !== 'class' && attr.nodeValue !== 'app-page') elPage.setAttribute(attr.nodeName, attr.nodeValue);
          }


		  var evalJs = function(element) {
			  var s = element.getElementsByTagName('script');
              // convert nodeList to array
              s = Array.prototype.slice.call(s);
			  for(var i=0; i < s.length; i++) {
                  var type = s[i].getAttribute('type');
                  if(type === 'text/javascript' || type === null) {
                    DOMEval(page.name, s[i].innerHTML);
                  }
			  }
		  };

          if(opts.useI18n) {
            phonon.i18n().bind(virtualElPage, function() {
              elPage.innerHTML = virtualElPage.innerHTML;
			  evalJs(virtualDiv);

              fn();
            });
          } else {
            elPage.innerHTML = virtualElPage.innerHTML;
			evalJs(virtualDiv);
            fn();
          }

        }, postData);
      } else {
        fn();
      }
    }
  }

  function loadContent(url, fn, postData) {
    var req = new XMLHttpRequest();
    if(req.overrideMimeType) req.overrideMimeType('text/html; charset=utf-8');
    req.onreadystatechange = function() {
      if(req.readyState === 4 && (req.status === 200 || !req.status && req.responseText.length)) {
        fn(req.responseText, opts, url);
      }
    };

    if(typeof postData !== 'string'){
      req.open('GET', opts.templateRootDirectory + url, true);
      req.send('');
    }else{
      req.open('POST', opts.templateRootDirectory + url, true);
      req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      req.send(postData);
    }
  }

  function createPage(pageName, properties) {
	properties = typeof properties === 'object' ? properties : {};

	var newPage = {
      name: pageName,
      mounted: false,
      async: false,
      activity: null,
      content: null,
      readyDelay: 1,
      callbackRegistered: [],
      nocache: null,
      showloader: null
	};

	var prop;
	for(prop in properties) {
		newPage[prop] = properties[prop];
	}

	return newPage;
  }

  function createOrUpdatePage(pageName, properties) {
	  properties = typeof properties === 'object' ? properties : {};

	  var page = getPageObject(pageName);
	  if(page === null) {
		  return pages.push(createPage(pageName, properties));
	  }

	  var prop;
	  for(prop in properties) {
		  page[prop] = properties[prop];
	  }

	  return true;
  }

  /**
   * Checks if a "front" UI component is active
   * Returns true if an UI component is active, false otherwise
   * @return {Boolean}
   */
  function isComponentVisible() {
    // close active dialogs, popovers, panels and side-panels
    if(typeof phonon.dialog !== 'undefined' && phonon.dialogUtil.closeActive()) return true;
    if(typeof phonon.popover !== 'undefined' && phonon.popoverUtil.closeActive()) return true;
    if(typeof phonon.panel !== 'undefined' && phonon.panelUtil.closeActive()) return true;
    if(typeof phonon.sidePanel !== 'undefined' && phonon.sidePanelUtil.closeActive()) return true;

    return false;
  }

  function getLastPage() {
    var page = {page: opts.defaultPage, params: ''};
    if(pageHistory.length > 0) {

      var inddex = -1;
      var i = pageHistory.length - 1;

      for (; i >= 0; i--) {
        if(pageHistory[i].page === currentPage) {
          inddex = i - 1;
          break;
        }
      }

      if(inddex > -1) {
        page = pageHistory[inddex];
        pageHistory = pageHistory.slice(0, inddex);
      }
    }
    return page;
  }

  function serializeForm(evt){
    var evt    = evt || window.event;
    var form   = evt.target;
    var field, query='';
    if(typeof form == 'object' && form.nodeName == "FORM"){
        var i;
        for(i=form.elements.length-1; i>=0; i--){
            field = form.elements[i];
            if(field.name && field.type != 'file' && field.type != 'reset'){
                if(field.type == 'select-multiple'){
                    for(j=form.elements[i].options.length-1; j>=0; j--){
                        if(field.options[j].selected){
                            query += '&' + field.name + "=" + encodeURIComponent(field.options[j].value).replace(/%20/g,'+');
                        }
                    }
                }
                else{
                    if((field.type != 'submit' && field.type != 'button') || evt.target == field){
                        if((field.type != 'checkbox' && field.type != 'radio') || field.checked){
                            query += '&' + field.name + "=" + encodeURIComponent(field.value).replace(/%20/g,'+');
                        }
                    }
                }
            }
        }
    }
    return query.substr(1);
  }

  function navigationListener(evt) {
    /*
     * user interactions are safed (with or without data-navigation | href)
     * the goal is to prevent the backward button if enableBrowserBackButton = false
     */
    safeLink = true;

    var target = evt.target;
    var nav = null;
    var validHref = false;
    var params = '';
    var formData;

    if(evt.type == 'submit'){ // dev
      var formAction = target.getAttribute('action');
      if(formAction.match(new RegExp('^#'+opts.hashPrefix))){
          evt.preventDefault();
          nav = formAction.substr(1+(opts.hashPrefix.length))
          callClose(currentPage, nav, opts.hashPrefix+nav);
          onBeforeTransition(nav, function() {
              //callHash(nav);
          }, serializeForm(evt)); // dev
          return changePage(formAction.substr(1+(opts.hashPrefix.length)))
      }
    }

    for (; target && target !== document; target = target.parentNode) {
      var dataNav = target.getAttribute('data-navigation');
      if(typeof target.href !== 'undefined' && target.href.indexOf('#!') !== -1) {
        validHref = true;
        break;
      }
      if(dataNav) {
        nav = dataNav;
        break;
      }
    }

    if(validHref && opts.useHash) {

      // onRoute will be called
      return;
    }

    if(nav === null && !validHref) {
      return;
    }

    var page = opts.defaultPage;

    if(nav !== null) {
      if(nav === '$previous-page') {
        var pObj = getLastPage();
        page = pObj.page;
        params = pObj.params;
      } else {
        page = nav;
      }

    } else {

      // regex
      var match = target.href.match('/#' + opts.hashPrefix + '([A-Za-z0-9\-\.]+)?(.*)/');
      if(match) {
        page = match[1];
        params = match[2];
      }
    }

    var hash = opts.hashPrefix + page;

    if(params !== '') {
      hash = hash + '/' + params;
      hash = hash.replace('//', '/');
    }

    callClose(currentPage, page, hash);
  }

  function startTransition(previousPage, pageName) {

    var previousPageEl = getPageEl(previousPage);
    var elCurrentPage = getPageEl(pageName);

    elCurrentPage.classList.add('app-active');

    if(opts.animatePages) {
      previousPageEl.classList.add('page-sliding');

      if(forward) {
        previousPageEl.classList.add( 'left' );
        previousPageEl.on(phonon.event.animationEnd, forwardAnimation, false);
      } else {
        previousPageEl.classList.add( 'right' );
        previousPageEl.on(phonon.event.animationEnd, previousAnimation, false);
      }
    } else {

      previousPageEl.classList.remove('app-active');

      if(forward) {
        forwardAnimation();
      } else {
        previousAnimation();
      }
    }

    // Scroll to top
    var contents = elCurrentPage.querySelectorAll('.content');
    var i = contents.length - 1;
    for (; i >= 0; i--) {
      var content = contents[i];
      if(content !== null && content.scrollTop !== 0) {
          content.scrollTop = 0;
      }
    }

    // delete history if the current page is the default page
    if(pageName === opts.defaultPage) {
      pageHistory = [];
    }
  }

  /**
   * Calls page events (onCreate, onReady) after
   * the page is actually ready (set its template)
   * @param {String} pageName
   * @param {Function} callback
   */
  function onBeforeTransition(pageName, callback, postData) {
    if(onActiveTransition) {
      if(typeof callback === 'function') {
        return callback();
      }
    }

    var page = getPageObject(pageName);

    if(started) {

      onActiveTransition = true;

      previousPage = currentPage;
      currentPage = pageName;
    }

    if(!page.mounted || page.nocache) {
      mount(page.name, function() {

        page.mounted = true;

        callCreate(pageName);
        callReady(pageName);

        // Call global-ready callbacks once
        if(!started) phonon.dispatchGlobalReady();

        if(started) startTransition(previousPage, pageName);

        if(!started) {

          started = true;

          var el = getPageEl(pageName);
          if(!el.classList.contains('app-active')) {
            el.classList.add('app-active');
          }
        }

        // call the callback after the mount
        if(typeof callback === 'function') {
          callback();
        }
      }, postData);
    } else {

      callReady(pageName);
      startTransition(previousPage, pageName);

      // call the callback directly
      if(typeof callback === 'function') {
        callback();
      }
    }
  }

  function init(options) {

    if(typeof options.templateRootDirectory === 'string' && options.templateRootDirectory !== '') {
      options.templateRootDirectory = ( (options.templateRootDirectory.indexOf('/', options.templateRootDirectory.length - '/'.length) !== -1) ? options.templateRootDirectory : options.templateRootDirectory + '/');
    }
    if(typeof options.hashPrefix === 'object') options.hashPrefix = '';

    var prop;
    for(prop in options) {
      opts[prop] = options[prop];
    }

    // navigation listeners are accepted (safe)
    if(opts.enableBrowserBackButton) safeLink = true;

    // Add page nodes
    var pages = document.querySelectorAll('[data-page]');
    var i = pages.length - 1;
    for (; i >= 0; i--) {

      var page = pages[i];

      // add the page class
      if(!page.classList.contains('app-page')) {
        page.classList.add('app-page');
      }

      createOrUpdatePage( page.tagName.toLowerCase() );
    }
  }

  function start() {
    if(started) {
      throw new Error('The app has been already started');
    }

    // android, ios or browser
    var osName = '';
    if(phonon.device.os) {
        osName = phonon.device.os.toLowerCase()
    }

    var osClass = 'web';

    if(osName === 'android') {
      osClass = 'android';
    } else if(osName === 'ios') {
      osClass = 'ios';
    }

    if(!document.body.classList.contains(osClass)) {
      document.body.classList.add(osClass);
    }

    onRoute();
  }

  function changePage(pageName, pageParams) {

    var currentPageObject = getPageObject(currentPage);
    var pageObject = getPageObject(pageName);

    if(pageObject) {

      var hash =  opts.hashPrefix + pageObject.name

      if(typeof pageParams !== 'undefined') {
        hash = opts.hashPrefix + pageObject.name + '/' + pageParams;
      }

      if(currentPageObject.async) {
        callClose(currentPage, pageObject.name, hash);
      } else {
        if(window.location.hash.indexOf(hash) === -1 && opts.useHash) {
          window.location.hash = hash;
        }
      }
    } else {
      throw new Error('The following page: ' + pageName + ' does not exists');
    }
  }

  /**
   * @param {String | HashEvent} virtualHash
   */
  function onRoute(virtualHash, postData) {
    var hash = (typeof virtualHash === 'string' ? virtualHash : window.location.href.split('#')[1] || '');
    var pageName;

    var parsed = hash.split('/');
    var params = parsed.slice(1, parsed.length);
    var page = parsed[0];

    // angular hash system
    var withSlash = opts.hashPrefix.indexOf('/');
    if(withSlash !== -1) {
      page = (typeof parsed[1] === 'undefined' ? '' : parsed[1]);
      params = parsed.slice(2, parsed.length);
      pageName = page.substring(withSlash+1, page.length);
    } else {
      // default hash system
      pageName = page.substring(opts.hashPrefix.length, page.length);
    }


    var pageObject = getPageObject(pageName);

    /*
     * if we get an invalid URL,
     * then we start the default page
     */
    if(!started && !pageObject) {

      // fallback default page
      currentPage = opts.defaultPage;

      pageObject = getPageObject(opts.defaultPage);

      /*
       * updates the URL if necessary
       */
      if(opts.useHash) {

        // the onRoute will be called again
        window.location.hash = opts.hashPrefix + opts.defaultPage;
        return;
      }
    } else if(!started && pageObject) {
      // update default value
      currentPage = pageObject.name;
    }

    if(pageObject) {

      /*
       * [1] change page only if changePage() is called programatically
       * [2] back button: if UI components are visible like dialogs, cancel the page transition
       * [3] the back button can be the physical button on Android or the browser's back button
       */

      isComponentVisible();

      if(pageObject.name === currentPage && started) {
        callHash(pageObject.name, params);
        return;
      }

      if(started && !safeLink) {
        return;
      }

      var inArray = false;
      var i = pageHistory.length - 1;

      for (; i >= 0; i--) {
        if(pageHistory[i].page === pageObject.name) {
          inArray = true;
          break;
        }
      }

      if(pageHistory.length > 0) {
        if(pageObject.name === opts.defaultPage) {
          forward = false;
        }
      } else {
        forward = true;
      }

      if(pageHistory.length > 1 && pageHistory[pageHistory.length - 2].page === pageObject.name) {
        forward = false;
      }

      if(!inArray) {
        var strParams = params.join('/');
        pageHistory.push( {page: pageObject.name, params: strParams} );
      }

      /*
       * Page Scope is called once before calling callbacks
       * since v1.0.8, we call the page scope here when the page is not yet mounted
       * because before this version, the onCreate callback was called before the onHash callback
       * since v1.0.2 the order has changed => the onHash callback is called before page callbacks (onCreate, etc.)
       * see issues: #16, #31 and #38
       */
      if(typeof pageObject.callback === 'function' && !pageObject.mounted) {
        pageObject.callback(pageObject.activity);
      }

      if(!pageObject.mounted) {
        onBeforeTransition(pageObject.name, function() {
          callHash(pageObject.name, params);
        }, postData);

      } else {
        onBeforeTransition(pageObject.name, null, postData);
        callHash(pageObject.name, params);
      }

      if(!opts.enableBrowserBackButton) safeLink = false;
    }
  }

  /**
   * One listener to navigate through the app pages
   */
  document.on('tap', navigationListener);
  /**
   * Handle (port) forms to event
   */
  document.on('submit', navigationListener);

  /*
   * [1] we do not call onRoute() directly because it is used in callClose
   * in order to prevent the back button on navigator:
   * the hash changes, but it is refused by this module (not trusted behavior)
   * so we need to call this function with a "virtual hash" as argument
   * [2] window.on(...) seems buggy
   */
  if(opts.useHash) window.addEventListener('hashchange', onRoute);

  document.on('backbutton', function() {
    if(isComponentVisible()) return;
    var last = getLastPage();
    callClose(currentPage, last.page, opts.hashPrefix + last.page + '/' + last.params);
  });

  phonon.navigator = function(options) {
    if(typeof options === 'object') {
      init(options);
    }

    return {

      currentPage: currentPage,
      previousPage: previousPage,
      start: start,
      changePage: function(pageName, pageParams) {
        safeLink = true;

        /*
         * wait the end of front components animations like dialogs, panels, etc before changing the page
         * [1] avoid several animations at the same time
         * [2] it is more logical to see them disappearing before the page changes
         */

        var wait = (isComponentVisible() ? 400 : 1);

        window.setTimeout(function() {
          if (pageName == '$previous-page') {
            var last = getLastPage();
            if (last) {
              pageName = last.page;
              pageParams = last.params;
            }
          }
          changePage(pageName, pageParams);
        }, wait);
      },
      on: function(options, callback) {
        if(typeof options.page !== 'string') {
          throw new Error('Page name must be a string');
        }
        if(typeof options.preventClose !== 'undefined' && typeof options.preventClose !== 'boolean') {
          throw new Error('preventClose option must be a boolean');
        }
        if(typeof options.readyDelay !== 'undefined' && typeof options.readyDelay !== 'number') {
          throw new Error('readyDelay option must be a number');
        }
        if(typeof options.content !== null && typeof opts.defaultTemplateExtension === 'string') {
            options.content = options.page + '.' + opts.defaultTemplateExtension;
        }

        // vuejs, riotjs support
        var page = getPageObject(options.page);
        var exists = page === null ? false : true;
        if(!exists) {
            page = createPage(options.page);
        }

        if(typeof callback === 'function' || typeof callback === 'object') {
          page.activity = new Activity(callback);
        } else {
          page.activity = null;
        }

        page.callback = callback;
        page.async = (typeof options.preventClose === 'boolean' ? options.preventClose : false);
        page.content = (typeof options.content === 'string' ? options.content : null);
        page.readyDelay = (typeof options.readyDelay === 'number' ? options.readyDelay : 1);

        createOrUpdatePage(options.page.toLowerCase(), page);
      },
      // register a page event only such as home:create
      onPage: function (pageName) {
          if (typeof pageName !== 'string'){
              throw new Error('PageName must be a string');
          }

          createOrUpdatePage(pageName, {});

          return {
              addEvent: function (eventName, callback) {
                  var page = getPageObject(pageName);
                  page.callbackRegistered.push({event: eventName, callback: callback});
              }
          }
      },
      callCallback: callCallback
    };
  };

})(typeof window !== 'undefined' ? window : this, typeof riot !== 'undefined' ? riot : undefined, phonon);
