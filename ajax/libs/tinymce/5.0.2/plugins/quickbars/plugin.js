/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 *
 * Version: 5.0.2 (2019-03-05)
 */
(function () {
var quickbars = (function (domGlobals) {
    'use strict';

    var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

    var unique = 0;
    var generate = function (prefix) {
      var date = new Date();
      var time = date.getTime();
      var random = Math.floor(Math.random() * 1000000000);
      unique++;
      return prefix + '_' + random + unique + String(time);
    };

    var createTableHtml = function (cols, rows) {
      var x, y, html;
      html = '<table data-mce-id="mce" style="width: 100%">';
      html += '<tbody>';
      for (y = 0; y < rows; y++) {
        html += '<tr>';
        for (x = 0; x < cols; x++) {
          html += '<td><br></td>';
        }
        html += '</tr>';
      }
      html += '</tbody>';
      html += '</table>';
      return html;
    };
    var getInsertedElement = function (editor) {
      var elms = editor.dom.select('*[data-mce-id]');
      return elms[0];
    };
    var insertTableHtml = function (editor, cols, rows) {
      editor.undoManager.transact(function () {
        var tableElm, cellElm;
        editor.insertContent(createTableHtml(cols, rows));
        tableElm = getInsertedElement(editor);
        tableElm.removeAttribute('data-mce-id');
        cellElm = editor.dom.select('td,th', tableElm);
        editor.selection.setCursorLocation(cellElm[0], 0);
      });
    };
    var insertTable = function (editor, cols, rows) {
      editor.plugins.table ? editor.plugins.table.insertTable(cols, rows) : insertTableHtml(editor, cols, rows);
    };
    var insertBlob = function (editor, base64, blob) {
      var blobCache, blobInfo;
      blobCache = editor.editorUpload.blobCache;
      blobInfo = blobCache.create(generate('mceu'), blob, base64);
      blobCache.add(blobInfo);
      editor.insertContent(editor.dom.createHTML('img', { src: blobInfo.blobUri() }));
    };
    var Actions = {
      insertTable: insertTable,
      insertBlob: insertBlob
    };

    var Global = typeof window !== 'undefined' ? window : Function('return this;')();

    var path = function (parts, scope) {
      var o = scope !== undefined && scope !== null ? scope : Global;
      for (var i = 0; i < parts.length && o !== undefined && o !== null; ++i)
        o = o[parts[i]];
      return o;
    };
    var resolve = function (p, scope) {
      var parts = p.split('.');
      return path(parts, scope);
    };

    var unsafe = function (name, scope) {
      return resolve(name, scope);
    };
    var getOrDie = function (name, scope) {
      var actual = unsafe(name, scope);
      if (actual === undefined || actual === null)
        throw name + ' not available on this browser';
      return actual;
    };
    var Global$1 = { getOrDie: getOrDie };

    function FileReader () {
      var f = Global$1.getOrDie('FileReader');
      return new f();
    }

    var global$1 = tinymce.util.Tools.resolve('tinymce.util.Promise');

    var blobToBase64 = function (blob) {
      return new global$1(function (resolve) {
        var reader = FileReader();
        reader.onloadend = function () {
          resolve(reader.result.split(',')[1]);
        };
        reader.readAsDataURL(blob);
      });
    };
    var Conversions = { blobToBase64: blobToBase64 };

    var pickFile = function () {
      return new global$1(function (resolve) {
        var fileInput;
        fileInput = domGlobals.document.createElement('input');
        fileInput.type = 'file';
        fileInput.style.position = 'fixed';
        fileInput.style.left = 0;
        fileInput.style.top = 0;
        fileInput.style.opacity = 0.001;
        domGlobals.document.body.appendChild(fileInput);
        fileInput.onchange = function (e) {
          resolve(Array.prototype.slice.call(e.target.files));
        };
        fileInput.click();
        fileInput.parentNode.removeChild(fileInput);
      });
    };
    var Picker = { pickFile: pickFile };

    var setupButtons = function (editor) {
      editor.ui.registry.addButton('quickimage', {
        icon: 'image',
        tooltip: 'Insert image',
        onAction: function () {
          Picker.pickFile().then(function (files) {
            var blob = files[0];
            Conversions.blobToBase64(blob).then(function (base64) {
              Actions.insertBlob(editor, base64, blob);
            });
          });
        }
      });
      editor.ui.registry.addButton('quicktable', {
        icon: 'table',
        tooltip: 'Insert table',
        onAction: function () {
          Actions.insertTable(editor, 2, 2);
        }
      });
    };
    var InsertButtons = { setupButtons: setupButtons };

    var constant = function (value) {
      return function () {
        return value;
      };
    };
    var never = constant(false);
    var always = constant(true);

    var never$1 = never;
    var always$1 = always;
    var none = function () {
      return NONE;
    };
    var NONE = function () {
      var eq = function (o) {
        return o.isNone();
      };
      var call = function (thunk) {
        return thunk();
      };
      var id = function (n) {
        return n;
      };
      var noop = function () {
      };
      var nul = function () {
        return null;
      };
      var undef = function () {
        return undefined;
      };
      var me = {
        fold: function (n, s) {
          return n();
        },
        is: never$1,
        isSome: never$1,
        isNone: always$1,
        getOr: id,
        getOrThunk: call,
        getOrDie: function (msg) {
          throw new Error(msg || 'error: getOrDie called on none.');
        },
        getOrNull: nul,
        getOrUndefined: undef,
        or: id,
        orThunk: call,
        map: none,
        ap: none,
        each: noop,
        bind: none,
        flatten: none,
        exists: never$1,
        forall: always$1,
        filter: none,
        equals: eq,
        equals_: eq,
        toArray: function () {
          return [];
        },
        toString: constant('none()')
      };
      if (Object.freeze)
        Object.freeze(me);
      return me;
    }();
    var some = function (a) {
      var constant_a = function () {
        return a;
      };
      var self = function () {
        return me;
      };
      var map = function (f) {
        return some(f(a));
      };
      var bind = function (f) {
        return f(a);
      };
      var me = {
        fold: function (n, s) {
          return s(a);
        },
        is: function (v) {
          return a === v;
        },
        isSome: always$1,
        isNone: never$1,
        getOr: constant_a,
        getOrThunk: constant_a,
        getOrDie: constant_a,
        getOrNull: constant_a,
        getOrUndefined: constant_a,
        or: self,
        orThunk: self,
        map: map,
        ap: function (optfab) {
          return optfab.fold(none, function (fab) {
            return some(fab(a));
          });
        },
        each: function (f) {
          f(a);
        },
        bind: bind,
        flatten: constant_a,
        exists: bind,
        forall: bind,
        filter: function (f) {
          return f(a) ? me : NONE;
        },
        equals: function (o) {
          return o.is(a);
        },
        equals_: function (o, elementEq) {
          return o.fold(never$1, function (b) {
            return elementEq(a, b);
          });
        },
        toArray: function () {
          return [a];
        },
        toString: function () {
          return 'some(' + a + ')';
        }
      };
      return me;
    };
    var from = function (value) {
      return value === null || value === undefined ? NONE : some(value);
    };
    var Option = {
      some: some,
      none: none,
      from: from
    };

    var fromHtml = function (html, scope) {
      var doc = scope || domGlobals.document;
      var div = doc.createElement('div');
      div.innerHTML = html;
      if (!div.hasChildNodes() || div.childNodes.length > 1) {
        domGlobals.console.error('HTML does not have a single root node', html);
        throw new Error('HTML must have a single root node');
      }
      return fromDom(div.childNodes[0]);
    };
    var fromTag = function (tag, scope) {
      var doc = scope || domGlobals.document;
      var node = doc.createElement(tag);
      return fromDom(node);
    };
    var fromText = function (text, scope) {
      var doc = scope || domGlobals.document;
      var node = doc.createTextNode(text);
      return fromDom(node);
    };
    var fromDom = function (node) {
      if (node === null || node === undefined) {
        throw new Error('Node cannot be null or undefined');
      }
      return { dom: constant(node) };
    };
    var fromPoint = function (docElm, x, y) {
      var doc = docElm.dom();
      return Option.from(doc.elementFromPoint(x, y)).map(fromDom);
    };
    var Element = {
      fromHtml: fromHtml,
      fromTag: fromTag,
      fromText: fromText,
      fromDom: fromDom,
      fromPoint: fromPoint
    };

    var ATTRIBUTE = domGlobals.Node.ATTRIBUTE_NODE;
    var CDATA_SECTION = domGlobals.Node.CDATA_SECTION_NODE;
    var COMMENT = domGlobals.Node.COMMENT_NODE;
    var DOCUMENT = domGlobals.Node.DOCUMENT_NODE;
    var DOCUMENT_TYPE = domGlobals.Node.DOCUMENT_TYPE_NODE;
    var DOCUMENT_FRAGMENT = domGlobals.Node.DOCUMENT_FRAGMENT_NODE;
    var ELEMENT = domGlobals.Node.ELEMENT_NODE;
    var TEXT = domGlobals.Node.TEXT_NODE;
    var PROCESSING_INSTRUCTION = domGlobals.Node.PROCESSING_INSTRUCTION_NODE;
    var ENTITY_REFERENCE = domGlobals.Node.ENTITY_REFERENCE_NODE;
    var ENTITY = domGlobals.Node.ENTITY_NODE;
    var NOTATION = domGlobals.Node.NOTATION_NODE;

    var name = function (element) {
      var r = element.dom().nodeName;
      return r.toLowerCase();
    };

    var typeOf = function (x) {
      if (x === null)
        return 'null';
      var t = typeof x;
      if (t === 'object' && Array.prototype.isPrototypeOf(x))
        return 'array';
      if (t === 'object' && String.prototype.isPrototypeOf(x))
        return 'string';
      return t;
    };
    var isType = function (type) {
      return function (value) {
        return typeOf(value) === type;
      };
    };
    var isString = isType('string');
    var isObject = isType('object');
    var isArray = isType('array');
    var isBoolean = isType('boolean');
    var isUndefined = isType('undefined');
    var isFunction = isType('function');

    var find = function (xs, pred) {
      for (var i = 0, len = xs.length; i < len; i++) {
        var x = xs[i];
        if (pred(x, i, xs)) {
          return Option.some(x);
        }
      }
      return Option.none();
    };
    var slice = Array.prototype.slice;
    var from$1 = isFunction(Array.from) ? Array.from : function (x) {
      return slice.call(x);
    };

    function ClosestOrAncestor (is, ancestor, scope, a, isRoot) {
      return is(scope, a) ? Option.some(scope) : isFunction(isRoot) && isRoot(scope) ? Option.none() : ancestor(scope, a, isRoot);
    }

    var node = function () {
      var f = Global$1.getOrDie('Node');
      return f;
    };
    var compareDocumentPosition = function (a, b, match) {
      return (a.compareDocumentPosition(b) & match) !== 0;
    };
    var documentPositionPreceding = function (a, b) {
      return compareDocumentPosition(a, b, node().DOCUMENT_POSITION_PRECEDING);
    };
    var documentPositionContainedBy = function (a, b) {
      return compareDocumentPosition(a, b, node().DOCUMENT_POSITION_CONTAINED_BY);
    };
    var Node = {
      documentPositionPreceding: documentPositionPreceding,
      documentPositionContainedBy: documentPositionContainedBy
    };

    var cached = function (f) {
      var called = false;
      var r;
      return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        if (!called) {
          called = true;
          r = f.apply(null, args);
        }
        return r;
      };
    };

    var firstMatch = function (regexes, s) {
      for (var i = 0; i < regexes.length; i++) {
        var x = regexes[i];
        if (x.test(s))
          return x;
      }
      return undefined;
    };
    var find$1 = function (regexes, agent) {
      var r = firstMatch(regexes, agent);
      if (!r)
        return {
          major: 0,
          minor: 0
        };
      var group = function (i) {
        return Number(agent.replace(r, '$' + i));
      };
      return nu(group(1), group(2));
    };
    var detect = function (versionRegexes, agent) {
      var cleanedAgent = String(agent).toLowerCase();
      if (versionRegexes.length === 0)
        return unknown();
      return find$1(versionRegexes, cleanedAgent);
    };
    var unknown = function () {
      return nu(0, 0);
    };
    var nu = function (major, minor) {
      return {
        major: major,
        minor: minor
      };
    };
    var Version = {
      nu: nu,
      detect: detect,
      unknown: unknown
    };

    var edge = 'Edge';
    var chrome = 'Chrome';
    var ie = 'IE';
    var opera = 'Opera';
    var firefox = 'Firefox';
    var safari = 'Safari';
    var isBrowser = function (name, current) {
      return function () {
        return current === name;
      };
    };
    var unknown$1 = function () {
      return nu$1({
        current: undefined,
        version: Version.unknown()
      });
    };
    var nu$1 = function (info) {
      var current = info.current;
      var version = info.version;
      return {
        current: current,
        version: version,
        isEdge: isBrowser(edge, current),
        isChrome: isBrowser(chrome, current),
        isIE: isBrowser(ie, current),
        isOpera: isBrowser(opera, current),
        isFirefox: isBrowser(firefox, current),
        isSafari: isBrowser(safari, current)
      };
    };
    var Browser = {
      unknown: unknown$1,
      nu: nu$1,
      edge: constant(edge),
      chrome: constant(chrome),
      ie: constant(ie),
      opera: constant(opera),
      firefox: constant(firefox),
      safari: constant(safari)
    };

    var windows = 'Windows';
    var ios = 'iOS';
    var android = 'Android';
    var linux = 'Linux';
    var osx = 'OSX';
    var solaris = 'Solaris';
    var freebsd = 'FreeBSD';
    var isOS = function (name, current) {
      return function () {
        return current === name;
      };
    };
    var unknown$2 = function () {
      return nu$2({
        current: undefined,
        version: Version.unknown()
      });
    };
    var nu$2 = function (info) {
      var current = info.current;
      var version = info.version;
      return {
        current: current,
        version: version,
        isWindows: isOS(windows, current),
        isiOS: isOS(ios, current),
        isAndroid: isOS(android, current),
        isOSX: isOS(osx, current),
        isLinux: isOS(linux, current),
        isSolaris: isOS(solaris, current),
        isFreeBSD: isOS(freebsd, current)
      };
    };
    var OperatingSystem = {
      unknown: unknown$2,
      nu: nu$2,
      windows: constant(windows),
      ios: constant(ios),
      android: constant(android),
      linux: constant(linux),
      osx: constant(osx),
      solaris: constant(solaris),
      freebsd: constant(freebsd)
    };

    var DeviceType = function (os, browser, userAgent) {
      var isiPad = os.isiOS() && /ipad/i.test(userAgent) === true;
      var isiPhone = os.isiOS() && !isiPad;
      var isAndroid3 = os.isAndroid() && os.version.major === 3;
      var isAndroid4 = os.isAndroid() && os.version.major === 4;
      var isTablet = isiPad || isAndroid3 || isAndroid4 && /mobile/i.test(userAgent) === true;
      var isTouch = os.isiOS() || os.isAndroid();
      var isPhone = isTouch && !isTablet;
      var iOSwebview = browser.isSafari() && os.isiOS() && /safari/i.test(userAgent) === false;
      return {
        isiPad: constant(isiPad),
        isiPhone: constant(isiPhone),
        isTablet: constant(isTablet),
        isPhone: constant(isPhone),
        isTouch: constant(isTouch),
        isAndroid: os.isAndroid,
        isiOS: os.isiOS,
        isWebView: constant(iOSwebview)
      };
    };

    var detect$1 = function (candidates, userAgent) {
      var agent = String(userAgent).toLowerCase();
      return find(candidates, function (candidate) {
        return candidate.search(agent);
      });
    };
    var detectBrowser = function (browsers, userAgent) {
      return detect$1(browsers, userAgent).map(function (browser) {
        var version = Version.detect(browser.versionRegexes, userAgent);
        return {
          current: browser.name,
          version: version
        };
      });
    };
    var detectOs = function (oses, userAgent) {
      return detect$1(oses, userAgent).map(function (os) {
        var version = Version.detect(os.versionRegexes, userAgent);
        return {
          current: os.name,
          version: version
        };
      });
    };
    var UaString = {
      detectBrowser: detectBrowser,
      detectOs: detectOs
    };

    var contains = function (str, substr) {
      return str.indexOf(substr) !== -1;
    };

    var normalVersionRegex = /.*?version\/\ ?([0-9]+)\.([0-9]+).*/;
    var checkContains = function (target) {
      return function (uastring) {
        return contains(uastring, target);
      };
    };
    var browsers = [
      {
        name: 'Edge',
        versionRegexes: [/.*?edge\/ ?([0-9]+)\.([0-9]+)$/],
        search: function (uastring) {
          var monstrosity = contains(uastring, 'edge/') && contains(uastring, 'chrome') && contains(uastring, 'safari') && contains(uastring, 'applewebkit');
          return monstrosity;
        }
      },
      {
        name: 'Chrome',
        versionRegexes: [
          /.*?chrome\/([0-9]+)\.([0-9]+).*/,
          normalVersionRegex
        ],
        search: function (uastring) {
          return contains(uastring, 'chrome') && !contains(uastring, 'chromeframe');
        }
      },
      {
        name: 'IE',
        versionRegexes: [
          /.*?msie\ ?([0-9]+)\.([0-9]+).*/,
          /.*?rv:([0-9]+)\.([0-9]+).*/
        ],
        search: function (uastring) {
          return contains(uastring, 'msie') || contains(uastring, 'trident');
        }
      },
      {
        name: 'Opera',
        versionRegexes: [
          normalVersionRegex,
          /.*?opera\/([0-9]+)\.([0-9]+).*/
        ],
        search: checkContains('opera')
      },
      {
        name: 'Firefox',
        versionRegexes: [/.*?firefox\/\ ?([0-9]+)\.([0-9]+).*/],
        search: checkContains('firefox')
      },
      {
        name: 'Safari',
        versionRegexes: [
          normalVersionRegex,
          /.*?cpu os ([0-9]+)_([0-9]+).*/
        ],
        search: function (uastring) {
          return (contains(uastring, 'safari') || contains(uastring, 'mobile/')) && contains(uastring, 'applewebkit');
        }
      }
    ];
    var oses = [
      {
        name: 'Windows',
        search: checkContains('win'),
        versionRegexes: [/.*?windows\ nt\ ?([0-9]+)\.([0-9]+).*/]
      },
      {
        name: 'iOS',
        search: function (uastring) {
          return contains(uastring, 'iphone') || contains(uastring, 'ipad');
        },
        versionRegexes: [
          /.*?version\/\ ?([0-9]+)\.([0-9]+).*/,
          /.*cpu os ([0-9]+)_([0-9]+).*/,
          /.*cpu iphone os ([0-9]+)_([0-9]+).*/
        ]
      },
      {
        name: 'Android',
        search: checkContains('android'),
        versionRegexes: [/.*?android\ ?([0-9]+)\.([0-9]+).*/]
      },
      {
        name: 'OSX',
        search: checkContains('os x'),
        versionRegexes: [/.*?os\ x\ ?([0-9]+)_([0-9]+).*/]
      },
      {
        name: 'Linux',
        search: checkContains('linux'),
        versionRegexes: []
      },
      {
        name: 'Solaris',
        search: checkContains('sunos'),
        versionRegexes: []
      },
      {
        name: 'FreeBSD',
        search: checkContains('freebsd'),
        versionRegexes: []
      }
    ];
    var PlatformInfo = {
      browsers: constant(browsers),
      oses: constant(oses)
    };

    var detect$2 = function (userAgent) {
      var browsers = PlatformInfo.browsers();
      var oses = PlatformInfo.oses();
      var browser = UaString.detectBrowser(browsers, userAgent).fold(Browser.unknown, Browser.nu);
      var os = UaString.detectOs(oses, userAgent).fold(OperatingSystem.unknown, OperatingSystem.nu);
      var deviceType = DeviceType(os, browser, userAgent);
      return {
        browser: browser,
        os: os,
        deviceType: deviceType
      };
    };
    var PlatformDetection = { detect: detect$2 };

    var detect$3 = cached(function () {
      var userAgent = domGlobals.navigator.userAgent;
      return PlatformDetection.detect(userAgent);
    });
    var PlatformDetection$1 = { detect: detect$3 };

    var ELEMENT$1 = ELEMENT;
    var is = function (element, selector) {
      var elem = element.dom();
      if (elem.nodeType !== ELEMENT$1) {
        return false;
      } else if (elem.matches !== undefined) {
        return elem.matches(selector);
      } else if (elem.msMatchesSelector !== undefined) {
        return elem.msMatchesSelector(selector);
      } else if (elem.webkitMatchesSelector !== undefined) {
        return elem.webkitMatchesSelector(selector);
      } else if (elem.mozMatchesSelector !== undefined) {
        return elem.mozMatchesSelector(selector);
      } else {
        throw new Error('Browser lacks native selectors');
      }
    };

    var regularContains = function (e1, e2) {
      var d1 = e1.dom();
      var d2 = e2.dom();
      return d1 === d2 ? false : d1.contains(d2);
    };
    var ieContains = function (e1, e2) {
      return Node.documentPositionContainedBy(e1.dom(), e2.dom());
    };
    var browser = PlatformDetection$1.detect().browser;
    var contains$1 = browser.isIE() ? ieContains : regularContains;

    var ancestor = function (scope, predicate, isRoot) {
      var element = scope.dom();
      var stop = isFunction(isRoot) ? isRoot : constant(false);
      while (element.parentNode) {
        element = element.parentNode;
        var el = Element.fromDom(element);
        if (predicate(el)) {
          return Option.some(el);
        } else if (stop(el)) {
          break;
        }
      }
      return Option.none();
    };
    var closest = function (scope, predicate, isRoot) {
      var is = function (s) {
        return predicate(s);
      };
      return ClosestOrAncestor(is, ancestor, scope, predicate, isRoot);
    };

    var ancestor$1 = function (scope, selector, isRoot) {
      return ancestor(scope, function (e) {
        return is(e, selector);
      }, isRoot);
    };
    var closest$1 = function (scope, selector, isRoot) {
      return ClosestOrAncestor(is, ancestor$1, scope, selector, isRoot);
    };

    var validDefaultOrDie = function (value, predicate) {
      if (predicate(value)) {
        return true;
      }
      throw new Error('Default value doesn\'t match requested type.');
    };
    var items = function (value, defaultValue) {
      if (isArray(value) || isObject(value)) {
        throw new Error('expected a string but found: ' + value);
      }
      if (isUndefined(value)) {
        return defaultValue;
      }
      if (isBoolean(value)) {
        return value === false ? '' : defaultValue;
      }
      return value;
    };
    var getToolbarItemsOr = function (predicate) {
      return function (editor, name, defaultValue) {
        var value = name in editor.settings ? editor.settings[name] : defaultValue;
        validDefaultOrDie(defaultValue, predicate);
        return items(value, defaultValue);
      };
    };
    var EditorSettings = { getToolbarItemsOr: getToolbarItemsOr(isString) };

    var getTextSelectionToolbarItems = function (editor) {
      return EditorSettings.getToolbarItemsOr(editor, 'quickbars_selection_toolbar', 'bold italic | quicklink h2 h3 blockquote');
    };
    var getInsertToolbarItems = function (editor) {
      return EditorSettings.getToolbarItemsOr(editor, 'quickbars_insert_toolbar', 'quickimage quicktable');
    };
    var Settings = {
      getTextSelectionToolbarItems: getTextSelectionToolbarItems,
      getInsertToolbarItems: getInsertToolbarItems
    };

    var addToEditor = function (editor) {
      editor.ui.registry.addContextToolbar('quickblock', {
        predicate: function (node) {
          var sugarNode = Element.fromDom(node);
          var textBlockElementsMap = editor.schema.getTextBlockElements();
          var isRoot = function (elem) {
            return elem.dom() === editor.getBody();
          };
          return closest$1(sugarNode, 'table', isRoot).fold(function () {
            return closest(sugarNode, function (elem) {
              return name(elem) in textBlockElementsMap && editor.dom.isEmpty(elem.dom());
            }, isRoot).isSome();
          }, function () {
            return false;
          });
        },
        items: Settings.getInsertToolbarItems(editor),
        position: 'line',
        scope: 'editor'
      });
    };
    var InsertToolbars = { addToEditor: addToEditor };

    var addToEditor$1 = function (editor) {
      editor.ui.registry.addContextToolbar('imageselection', {
        predicate: function (node) {
          return node.nodeName === 'IMG' || node.nodeName === 'FIGURE' && /image/i.test(node.className);
        },
        items: 'alignleft aligncenter alignright',
        position: 'node'
      });
      editor.ui.registry.addContextToolbar('textselection', {
        predicate: function (node) {
          return !editor.selection.isCollapsed();
        },
        items: Settings.getTextSelectionToolbarItems(editor),
        position: 'selection'
      });
    };
    var SelectionToolbars = { addToEditor: addToEditor$1 };

    global.add('quickbars', function (editor) {
      InsertButtons.setupButtons(editor);
      InsertToolbars.addToEditor(editor);
      SelectionToolbars.addToEditor(editor);
    });
    function Plugin () {
    }

    return Plugin;

}(window));
})();
