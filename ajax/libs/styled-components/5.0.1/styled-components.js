(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react-is'), require('react')) :
  typeof define === 'function' && define.amd ? define(['react-is', 'react'], factory) :
  (global = global || self, global.styled = factory(global.ReactIs, global.React));
}(this, (function (reactIs, React) { 'use strict';

  var reactIs__default = 'default' in reactIs ? reactIs['default'] : reactIs;
  var React__default = 'default' in React ? React['default'] : React;

  // 
  function isStyledComponent(target) {
    return target && typeof target.styledComponentId === 'string';
  }

  // 
  var interleave = (function (strings, interpolations) {
    var result = [strings[0]];

    for (var i = 0, len = interpolations.length; i < len; i += 1) {
      result.push(interpolations[i], strings[i + 1]);
    }

    return result;
  });

  // 
  var isPlainObject = (function (x) {
    return typeof x === 'object' && x.constructor === Object;
  });

  // 
  var EMPTY_ARRAY = Object.freeze([]);
  var EMPTY_OBJECT = Object.freeze({});

  // 
  function isFunction(test) {
    return typeof test === 'function';
  }

  // 
  function getComponentName(target) {
    return ( typeof target === 'string' && target ) || // $FlowFixMe
    target.displayName || // $FlowFixMe
    target.name || 'Component';
  }

  // 
  function isStatelessFunction(test) {
    return typeof test === 'function' && !(test.prototype && test.prototype.isReactComponent);
  }

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  // 
  var SC_ATTR = typeof process !== 'undefined' && (process.env.REACT_APP_SC_ATTR || process.env.SC_ATTR) || 'data-styled';
  var SC_ATTR_ACTIVE = 'active';
  var SC_ATTR_VERSION = 'data-styled-version';
  var SC_VERSION = "5.0.1";
  var IS_BROWSER = typeof window !== 'undefined' && 'HTMLElement' in window;
  var DISABLE_SPEEDY = typeof SC_DISABLE_SPEEDY === 'boolean' && SC_DISABLE_SPEEDY || typeof process !== 'undefined' && (process.env.REACT_APP_SC_DISABLE_SPEEDY || process.env.SC_DISABLE_SPEEDY) || "development" !== 'production'; // Shared empty execution context when generating static styles

  var STATIC_EXECUTION_CONTEXT = {};

  // 

  /* eslint-disable camelcase, no-undef */
  var getNonce = function getNonce() {
    return typeof __webpack_nonce__ !== 'undefined' ? __webpack_nonce__ : null;
  };

  var errorMap = {
    "1": "Cannot create styled-component for component: %s.\n\n",
    "2": "Can't collect styles once you've consumed a `ServerStyleSheet`'s styles! `ServerStyleSheet` is a one off instance for each server-side render cycle.\n\n- Are you trying to reuse it across renders?\n- Are you accidentally calling collectStyles twice?\n\n",
    "3": "Streaming SSR is only supported in a Node.js environment; Please do not try to call this method in the browser.\n\n",
    "4": "The `StyleSheetManager` expects a valid target or sheet prop!\n\n- Does this error occur on the client and is your target falsy?\n- Does this error occur on the server and is the sheet falsy?\n\n",
    "5": "The clone method cannot be used on the client!\n\n- Are you running in a client-like environment on the server?\n- Are you trying to run SSR on the client?\n\n",
    "6": "Trying to insert a new style tag, but the given Node is unmounted!\n\n- Are you using a custom target that isn't mounted?\n- Does your document not have a valid head element?\n- Have you accidentally removed a style tag manually?\n\n",
    "7": "ThemeProvider: Please return an object from your \"theme\" prop function, e.g.\n\n```js\ntheme={() => ({})}\n```\n\n",
    "8": "ThemeProvider: Please make your \"theme\" prop an object.\n\n",
    "9": "Missing document `<head>`\n\n",
    "10": "Cannot find a StyleSheet instance. Usually this happens if there are multiple copies of styled-components loaded at once. Check out this issue for how to troubleshoot and fix the common cases where this situation can happen: https://github.com/styled-components/styled-components/issues/1941#issuecomment-417862021\n\n",
    "11": "_This error was replaced with a dev-time warning, it will be deleted for v4 final._ [createGlobalStyle] received children which will not be rendered. Please use the component without passing children elements.\n\n",
    "12": "It seems you are interpolating a keyframe declaration (%s) into an untagged string. This was supported in styled-components v3, but is not longer supported in v4 as keyframes are now injected on-demand. Please wrap your string in the css\\`\\` helper which ensures the styles are injected correctly. See https://www.styled-components.com/docs/api#css\n\n",
    "13": "%s is not a styled component and cannot be referred to via component selector. See https://www.styled-components.com/docs/advanced#referring-to-other-components for more details.\n\n",
    "14": "ThemeProvider: \"theme\" prop is required.\n\n",
    "15": "A stylis plugin has been supplied that is not named. We need a name for each plugin to be able to prevent styling collisions between different stylis configurations within the same app. Before you pass your plugin to `<StyleSheetManager stylisPlugins={[]}>`, please make sure each plugin is uniquely-named, e.g.\n\n```js\nObject.defineProperty(importedPlugin, 'name', { value: 'some-unique-name' });\n```\n\n",
    "16": "Reached the limit of how many styled components may be created at group %s.\nYou may only create up to 1,073,741,824 components. If you're creating components dynamically,\nas for instance in your render method then you may be running into this limitation.\n\n",
    "17": "CSSStyleSheet could not be found on HTMLStyleElement.\nHas styled-components' style tag been unmounted or altered by another script?\n"
  };

  // 
  var ERRORS =  errorMap ;
  /**
   * super basic version of sprintf
   */

  function format() {
    var a = arguments.length <= 0 ? undefined : arguments[0];
    var b = [];

    for (var c = 1, len = arguments.length; c < len; c += 1) {
      b.push(c < 0 || arguments.length <= c ? undefined : arguments[c]);
    }

    b.forEach(function (d) {
      a = a.replace(/%[a-z]/, d);
    });
    return a;
  }
  /**
   * Create an error file out of errors.md for development and a simple web link to the full errors
   * in production mode.
   */


  function throwStyledComponentsError(code) {
    for (var _len = arguments.length, interpolations = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      interpolations[_key - 1] = arguments[_key];
    }

    {
      throw new Error(format.apply(void 0, [ERRORS[code]].concat(interpolations)).trim());
    }
  }

  // 
  var ELEMENT_TYPE = 1;
  /* Node.ELEMENT_TYPE */

  /** Find last style element if any inside target */

  var findLastStyleTag = function findLastStyleTag(target) {
    var childNodes = target.childNodes;

    for (var i = childNodes.length; i >= 0; i--) {
      var child = childNodes[i];

      if (child && child.nodeType === ELEMENT_TYPE && child.hasAttribute(SC_ATTR)) {
        return child;
      }
    }

    return undefined;
  };
  /** Create a style element inside `target` or <head> after the last */


  var makeStyleTag = function makeStyleTag(target) {
    var head = document.head;
    var parent = target || head;
    var style = document.createElement('style');
    var prevStyle = findLastStyleTag(parent);
    var nextSibling = prevStyle !== undefined ? prevStyle.nextSibling : null;
    style.setAttribute(SC_ATTR, SC_ATTR_ACTIVE);
    style.setAttribute(SC_ATTR_VERSION, SC_VERSION);
    var nonce = getNonce();
    if (nonce) style.setAttribute('nonce', nonce);
    parent.insertBefore(style, nextSibling);
    return style;
  };
  /** Get the CSSStyleSheet instance for a given style element */

  var getSheet = function getSheet(tag) {
    if (tag.sheet) {
      return tag.sheet;
    } // Avoid Firefox quirk where the style element might not have a sheet property


    var _document = document,
        styleSheets = _document.styleSheets;

    for (var i = 0, l = styleSheets.length; i < l; i++) {
      var sheet = styleSheets[i];

      if (sheet.ownerNode === tag) {
        return sheet;
      }
    }

    throwStyledComponentsError(17);
    return undefined;
  };

  // 
  /** Create a CSSStyleSheet-like tag depending on the environment */

  var makeTag = function makeTag(_ref) {
    var isServer = _ref.isServer,
        useCSSOMInjection = _ref.useCSSOMInjection,
        target = _ref.target;

    if (isServer) {
      return new VirtualTag(target);
    } else if (useCSSOMInjection) {
      return new CSSOMTag(target);
    } else {
      return new TextTag(target);
    }
  };
  var CSSOMTag =
  /*#__PURE__*/
  function () {
    function CSSOMTag(target) {
      var element = this.element = makeStyleTag(target); // Avoid Edge bug where empty style elements don't create sheets

      element.appendChild(document.createTextNode(''));
      this.sheet = getSheet(element);
      this.length = 0;
    }

    var _proto = CSSOMTag.prototype;

    _proto.insertRule = function insertRule(index, rule) {
      try {
        this.sheet.insertRule(rule, index);
        this.length++;
        return true;
      } catch (_error) {
        return false;
      }
    };

    _proto.deleteRule = function deleteRule(index) {
      this.sheet.deleteRule(index);
      this.length--;
    };

    _proto.getRule = function getRule(index) {
      var rule = this.sheet.cssRules[index]; // Avoid IE11 quirk where cssText is inaccessible on some invalid rules

      if (rule !== undefined && typeof rule.cssText === 'string') {
        return rule.cssText;
      } else {
        return '';
      }
    };

    return CSSOMTag;
  }();
  /** A Tag that emulates the CSSStyleSheet API but uses text nodes */

  var TextTag =
  /*#__PURE__*/
  function () {
    function TextTag(target) {
      var element = this.element = makeStyleTag(target);
      this.nodes = element.childNodes;
      this.length = 0;
    }

    var _proto2 = TextTag.prototype;

    _proto2.insertRule = function insertRule(index, rule) {
      if (index <= this.length && index >= 0) {
        var node = document.createTextNode(rule);
        var refNode = this.nodes[index];
        this.element.insertBefore(node, refNode || null);
        this.length++;
        return true;
      } else {
        return false;
      }
    };

    _proto2.deleteRule = function deleteRule(index) {
      this.element.removeChild(this.nodes[index]);
      this.length--;
    };

    _proto2.getRule = function getRule(index) {
      if (index < this.length) {
        return this.nodes[index].textContent;
      } else {
        return '';
      }
    };

    return TextTag;
  }();
  /** A completely virtual (server-side) Tag that doesn't manipulate the DOM */

  var VirtualTag =
  /*#__PURE__*/
  function () {
    function VirtualTag(_target) {
      this.rules = [];
      this.length = 0;
    }

    var _proto3 = VirtualTag.prototype;

    _proto3.insertRule = function insertRule(index, rule) {
      if (index <= this.length) {
        this.rules.splice(index, 0, rule);
        this.length++;
        return true;
      } else {
        return false;
      }
    };

    _proto3.deleteRule = function deleteRule(index) {
      this.rules.splice(index, 1);
      this.length--;
    };

    _proto3.getRule = function getRule(index) {
      if (index < this.length) {
        return this.rules[index];
      } else {
        return '';
      }
    };

    return VirtualTag;
  }();

  // 
  /** Create a GroupedTag with an underlying Tag implementation */

  var makeGroupedTag = function makeGroupedTag(tag) {
    return new DefaultGroupedTag(tag);
  };
  var BASE_SIZE = 1 << 9;

  var DefaultGroupedTag =
  /*#__PURE__*/
  function () {
    function DefaultGroupedTag(tag) {
      this.groupSizes = new Uint32Array(BASE_SIZE);
      this.length = BASE_SIZE;
      this.tag = tag;
    }

    var _proto = DefaultGroupedTag.prototype;

    _proto.indexOfGroup = function indexOfGroup(group) {
      var index = 0;

      for (var i = 0; i < group; i++) {
        index += this.groupSizes[i];
      }

      return index;
    };

    _proto.insertRules = function insertRules(group, rules) {
      if (group >= this.groupSizes.length) {
        var oldBuffer = this.groupSizes;
        var oldSize = oldBuffer.length;
        var newSize = oldSize;

        while (group >= newSize) {
          newSize <<= 1;

          if (newSize < 0) {
            throwStyledComponentsError(16, "" + group);
          }
        }

        this.groupSizes = new Uint32Array(newSize);
        this.groupSizes.set(oldBuffer);
        this.length = newSize;

        for (var i = oldSize; i < newSize; i++) {
          this.groupSizes[i] = 0;
        }
      }

      var ruleIndex = this.indexOfGroup(group + 1);

      for (var _i = 0, l = rules.length; _i < l; _i++) {
        if (this.tag.insertRule(ruleIndex, rules[_i])) {
          this.groupSizes[group]++;
          ruleIndex++;
        }
      }
    };

    _proto.clearGroup = function clearGroup(group) {
      if (group < this.length) {
        var length = this.groupSizes[group];
        var startIndex = this.indexOfGroup(group);
        var endIndex = startIndex + length;
        this.groupSizes[group] = 0;

        for (var i = startIndex; i < endIndex; i++) {
          this.tag.deleteRule(startIndex);
        }
      }
    };

    _proto.getGroup = function getGroup(group) {
      var css = '';

      if (group >= this.length || this.groupSizes[group] === 0) {
        return css;
      }

      var length = this.groupSizes[group];
      var startIndex = this.indexOfGroup(group);
      var endIndex = startIndex + length;

      for (var i = startIndex; i < endIndex; i++) {
        css += this.tag.getRule(i) + "\n";
      }

      return css;
    };

    return DefaultGroupedTag;
  }();

  // 
  var MAX_SMI = 1 << 31 - 1;
  var groupIDRegister = new Map();
  var reverseRegister = new Map();
  var nextFreeGroup = 1;
  var getGroupForId = function getGroupForId(id) {
    if (groupIDRegister.has(id)) {
      return groupIDRegister.get(id);
    }

    var group = nextFreeGroup++;

    if ( ((group | 0) < 0 || group > MAX_SMI)) {
      throwStyledComponentsError(16, "" + group);
    }

    groupIDRegister.set(id, group);
    reverseRegister.set(group, id);
    return group;
  };
  var getIdForGroup = function getIdForGroup(group) {
    return reverseRegister.get(group);
  };
  var setGroupForId = function setGroupForId(id, group) {
    if (group >= nextFreeGroup) {
      nextFreeGroup = group + 1;
    }

    groupIDRegister.set(id, group);
    reverseRegister.set(group, id);
  };

  // 
  var SELECTOR = "style[" + SC_ATTR + "][" + SC_ATTR_VERSION + "=\"" + SC_VERSION + "\"]";
  var RULE_RE = /(?:\s*)?(.*?){((?:{[^}]*}|(?!{).*?)*)}/g;
  var MARKER_RE = new RegExp("^" + SC_ATTR + "\\.g(\\d+)\\[id=\"([\\w\\d-]+)\"\\]");
  var outputSheet = function outputSheet(sheet) {
    var tag = sheet.getTag();
    var length = tag.length;
    var css = '';

    for (var group = 0; group < length; group++) {
      var id = getIdForGroup(group);
      if (id === undefined) continue;
      var names = sheet.names.get(id);
      var rules = tag.getGroup(group);
      if (names === undefined || rules.length === 0) continue;
      var selector = SC_ATTR + ".g" + group + "[id=\"" + id + "\"]";
      var content = '';

      if (names !== undefined) {
        names.forEach(function (name) {
          if (name.length > 0) {
            content += name + ",";
          }
        });
      } // NOTE: It's easier to collect rules and have the marker
      // after the actual rules to simplify the rehydration


      css += "" + rules + selector + "{content:\"" + content + "\"}\n";
    }

    return css;
  };

  var rehydrateNamesFromContent = function rehydrateNamesFromContent(sheet, id, content) {
    var names = content.split(',');
    var name;

    for (var i = 0, l = names.length; i < l; i++) {
      // eslint-disable-next-line
      if (name = names[i]) {
        sheet.registerName(id, name);
      }
    }
  };

  var rehydrateSheetFromTag = function rehydrateSheetFromTag(sheet, style) {
    var rawHTML = style.innerHTML;
    var rules = [];
    var parts; // parts = [match, selector, content]
    // eslint-disable-next-line no-cond-assign

    while (parts = RULE_RE.exec(rawHTML)) {
      var marker = parts[1].match(MARKER_RE);

      if (marker) {
        var group = parseInt(marker[1], 10) | 0;
        var id = marker[2];

        if (group !== 0) {
          // Rehydrate componentId to group index mapping
          setGroupForId(id, group); // Rehydrate names and rules
          // looks like: data-styled.g11[id="idA"]{content:"nameA,"}

          rehydrateNamesFromContent(sheet, id, parts[2].split('"')[1]);
          sheet.getTag().insertRules(group, rules);
        }

        rules.length = 0;
      } else {
        rules.push(parts[0].trim());
      }
    }
  };

  var rehydrateSheet = function rehydrateSheet(sheet) {
    var nodes = document.querySelectorAll(SELECTOR);

    for (var i = 0, l = nodes.length; i < l; i++) {
      var node = nodes[i];

      if (node && node.getAttribute(SC_ATTR) !== SC_ATTR_ACTIVE) {
        rehydrateSheetFromTag(sheet, node);

        if (node.parentNode) {
          node.parentNode.removeChild(node);
        }
      }
    }
  };

  var SHOULD_REHYDRATE = IS_BROWSER;
  var defaultOptions = {
    isServer: !IS_BROWSER,
    useCSSOMInjection: !DISABLE_SPEEDY
  };
  /** Contains the main stylesheet logic for stringification and caching */

  var StyleSheet =
  /*#__PURE__*/
  function () {
    /** Register a group ID to give it an index */
    StyleSheet.registerId = function registerId(id) {
      return getGroupForId(id);
    };

    function StyleSheet(options, globalStyles, names) {
      if (options === void 0) {
        options = defaultOptions;
      }

      if (globalStyles === void 0) {
        globalStyles = {};
      }

      this.options = _extends({}, defaultOptions, {}, options);
      this.gs = globalStyles;
      this.names = new Map(names); // We rehydrate only once and use the sheet that is created first

      if (!this.options.isServer && IS_BROWSER && SHOULD_REHYDRATE) {
        SHOULD_REHYDRATE = false;
        rehydrateSheet(this);
      }
    }

    var _proto = StyleSheet.prototype;

    _proto.reconstructWithOptions = function reconstructWithOptions(options) {
      return new StyleSheet(_extends({}, this.options, {}, options), this.gs, this.names);
    };

    _proto.allocateGSInstance = function allocateGSInstance(id) {
      return this.gs[id] = (this.gs[id] || 0) + 1;
    }
    /** Lazily initialises a GroupedTag for when it's actually needed */
    ;

    _proto.getTag = function getTag() {
      return this.tag || (this.tag = makeGroupedTag(makeTag(this.options)));
    }
    /** Check whether a name is known for caching */
    ;

    _proto.hasNameForId = function hasNameForId(id, name) {
      return this.names.has(id) && this.names.get(id).has(name);
    }
    /** Mark a group's name as known for caching */
    ;

    _proto.registerName = function registerName(id, name) {
      getGroupForId(id);

      if (!this.names.has(id)) {
        var groupNames = new Set();
        groupNames.add(name);
        this.names.set(id, groupNames);
      } else {
        this.names.get(id).add(name);
      }
    }
    /** Insert new rules which also marks the name as known */
    ;

    _proto.insertRules = function insertRules(id, name, rules) {
      this.registerName(id, name);
      this.getTag().insertRules(getGroupForId(id), rules);
    }
    /** Clears all cached names for a given group ID */
    ;

    _proto.clearNames = function clearNames(id) {
      if (this.names.has(id)) {
        this.names.get(id).clear();
      }
    }
    /** Clears all rules for a given group ID */
    ;

    _proto.clearRules = function clearRules(id) {
      this.getTag().clearGroup(getGroupForId(id));
      this.clearNames(id);
    }
    /** Clears the entire tag which deletes all rules but not its names */
    ;

    _proto.clearTag = function clearTag() {
      // NOTE: This does not clear the names, since it's only used during SSR
      // so that we can continuously output only new rules
      this.tag = undefined;
    }
    /** Outputs the current sheet as a CSS string with markers for SSR */
    ;

    _proto.toString = function toString() {
      return outputSheet(this);
    };

    return StyleSheet;
  }();

  //

  var shallowequal = function shallowEqual(objA, objB, compare, compareContext) {
    var ret = compare ? compare.call(compareContext, objA, objB) : void 0;

    if (ret !== void 0) {
      return !!ret;
    }

    if (objA === objB) {
      return true;
    }

    if (typeof objA !== "object" || !objA || typeof objB !== "object" || !objB) {
      return false;
    }

    var keysA = Object.keys(objA);
    var keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) {
      return false;
    }

    var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);

    // Test for A's keys different from B.
    for (var idx = 0; idx < keysA.length; idx++) {
      var key = keysA[idx];

      if (!bHasOwnProperty(key)) {
        return false;
      }

      var valueA = objA[key];
      var valueB = objB[key];

      ret = compare ? compare.call(compareContext, valueA, valueB, key) : void 0;

      if (ret === false || (ret === void 0 && valueA !== valueB)) {
        return false;
      }
    }

    return true;
  };

  function stylis_min (W) {
    function M(d, c, e, h, a) {
      for (var m = 0, b = 0, v = 0, n = 0, q, g, x = 0, K = 0, k, u = k = q = 0, l = 0, r = 0, I = 0, t = 0, B = e.length, J = B - 1, y, f = '', p = '', F = '', G = '', C; l < B;) {
        g = e.charCodeAt(l);
        l === J && 0 !== b + n + v + m && (0 !== b && (g = 47 === b ? 10 : 47), n = v = m = 0, B++, J++);

        if (0 === b + n + v + m) {
          if (l === J && (0 < r && (f = f.replace(N, '')), 0 < f.trim().length)) {
            switch (g) {
              case 32:
              case 9:
              case 59:
              case 13:
              case 10:
                break;

              default:
                f += e.charAt(l);
            }

            g = 59;
          }

          switch (g) {
            case 123:
              f = f.trim();
              q = f.charCodeAt(0);
              k = 1;

              for (t = ++l; l < B;) {
                switch (g = e.charCodeAt(l)) {
                  case 123:
                    k++;
                    break;

                  case 125:
                    k--;
                    break;

                  case 47:
                    switch (g = e.charCodeAt(l + 1)) {
                      case 42:
                      case 47:
                        a: {
                          for (u = l + 1; u < J; ++u) {
                            switch (e.charCodeAt(u)) {
                              case 47:
                                if (42 === g && 42 === e.charCodeAt(u - 1) && l + 2 !== u) {
                                  l = u + 1;
                                  break a;
                                }

                                break;

                              case 10:
                                if (47 === g) {
                                  l = u + 1;
                                  break a;
                                }

                            }
                          }

                          l = u;
                        }

                    }

                    break;

                  case 91:
                    g++;

                  case 40:
                    g++;

                  case 34:
                  case 39:
                    for (; l++ < J && e.charCodeAt(l) !== g;) {
                    }

                }

                if (0 === k) break;
                l++;
              }

              k = e.substring(t, l);
              0 === q && (q = (f = f.replace(ca, '').trim()).charCodeAt(0));

              switch (q) {
                case 64:
                  0 < r && (f = f.replace(N, ''));
                  g = f.charCodeAt(1);

                  switch (g) {
                    case 100:
                    case 109:
                    case 115:
                    case 45:
                      r = c;
                      break;

                    default:
                      r = O;
                  }

                  k = M(c, r, k, g, a + 1);
                  t = k.length;
                  0 < A && (r = X(O, f, I), C = H(3, k, r, c, D, z, t, g, a, h), f = r.join(''), void 0 !== C && 0 === (t = (k = C.trim()).length) && (g = 0, k = ''));
                  if (0 < t) switch (g) {
                    case 115:
                      f = f.replace(da, ea);

                    case 100:
                    case 109:
                    case 45:
                      k = f + '{' + k + '}';
                      break;

                    case 107:
                      f = f.replace(fa, '$1 $2');
                      k = f + '{' + k + '}';
                      k = 1 === w || 2 === w && L('@' + k, 3) ? '@-webkit-' + k + '@' + k : '@' + k;
                      break;

                    default:
                      k = f + k, 112 === h && (k = (p += k, ''));
                  } else k = '';
                  break;

                default:
                  k = M(c, X(c, f, I), k, h, a + 1);
              }

              F += k;
              k = I = r = u = q = 0;
              f = '';
              g = e.charCodeAt(++l);
              break;

            case 125:
            case 59:
              f = (0 < r ? f.replace(N, '') : f).trim();
              if (1 < (t = f.length)) switch (0 === u && (q = f.charCodeAt(0), 45 === q || 96 < q && 123 > q) && (t = (f = f.replace(' ', ':')).length), 0 < A && void 0 !== (C = H(1, f, c, d, D, z, p.length, h, a, h)) && 0 === (t = (f = C.trim()).length) && (f = '\x00\x00'), q = f.charCodeAt(0), g = f.charCodeAt(1), q) {
                case 0:
                  break;

                case 64:
                  if (105 === g || 99 === g) {
                    G += f + e.charAt(l);
                    break;
                  }

                default:
                  58 !== f.charCodeAt(t - 1) && (p += P(f, q, g, f.charCodeAt(2)));
              }
              I = r = u = q = 0;
              f = '';
              g = e.charCodeAt(++l);
          }
        }

        switch (g) {
          case 13:
          case 10:
            47 === b ? b = 0 : 0 === 1 + q && 107 !== h && 0 < f.length && (r = 1, f += '\x00');
            0 < A * Y && H(0, f, c, d, D, z, p.length, h, a, h);
            z = 1;
            D++;
            break;

          case 59:
          case 125:
            if (0 === b + n + v + m) {
              z++;
              break;
            }

          default:
            z++;
            y = e.charAt(l);

            switch (g) {
              case 9:
              case 32:
                if (0 === n + m + b) switch (x) {
                  case 44:
                  case 58:
                  case 9:
                  case 32:
                    y = '';
                    break;

                  default:
                    32 !== g && (y = ' ');
                }
                break;

              case 0:
                y = '\\0';
                break;

              case 12:
                y = '\\f';
                break;

              case 11:
                y = '\\v';
                break;

              case 38:
                0 === n + b + m && (r = I = 1, y = '\f' + y);
                break;

              case 108:
                if (0 === n + b + m + E && 0 < u) switch (l - u) {
                  case 2:
                    112 === x && 58 === e.charCodeAt(l - 3) && (E = x);

                  case 8:
                    111 === K && (E = K);
                }
                break;

              case 58:
                0 === n + b + m && (u = l);
                break;

              case 44:
                0 === b + v + n + m && (r = 1, y += '\r');
                break;

              case 34:
              case 39:
                0 === b && (n = n === g ? 0 : 0 === n ? g : n);
                break;

              case 91:
                0 === n + b + v && m++;
                break;

              case 93:
                0 === n + b + v && m--;
                break;

              case 41:
                0 === n + b + m && v--;
                break;

              case 40:
                if (0 === n + b + m) {
                  if (0 === q) switch (2 * x + 3 * K) {
                    case 533:
                      break;

                    default:
                      q = 1;
                  }
                  v++;
                }

                break;

              case 64:
                0 === b + v + n + m + u + k && (k = 1);
                break;

              case 42:
              case 47:
                if (!(0 < n + m + v)) switch (b) {
                  case 0:
                    switch (2 * g + 3 * e.charCodeAt(l + 1)) {
                      case 235:
                        b = 47;
                        break;

                      case 220:
                        t = l, b = 42;
                    }

                    break;

                  case 42:
                    47 === g && 42 === x && t + 2 !== l && (33 === e.charCodeAt(t + 2) && (p += e.substring(t, l + 1)), y = '', b = 0);
                }
            }

            0 === b && (f += y);
        }

        K = x;
        x = g;
        l++;
      }

      t = p.length;

      if (0 < t) {
        r = c;
        if (0 < A && (C = H(2, p, r, d, D, z, t, h, a, h), void 0 !== C && 0 === (p = C).length)) return G + p + F;
        p = r.join(',') + '{' + p + '}';

        if (0 !== w * E) {
          2 !== w || L(p, 2) || (E = 0);

          switch (E) {
            case 111:
              p = p.replace(ha, ':-moz-$1') + p;
              break;

            case 112:
              p = p.replace(Q, '::-webkit-input-$1') + p.replace(Q, '::-moz-$1') + p.replace(Q, ':-ms-input-$1') + p;
          }

          E = 0;
        }
      }

      return G + p + F;
    }

    function X(d, c, e) {
      var h = c.trim().split(ia);
      c = h;
      var a = h.length,
          m = d.length;

      switch (m) {
        case 0:
        case 1:
          var b = 0;

          for (d = 0 === m ? '' : d[0] + ' '; b < a; ++b) {
            c[b] = Z(d, c[b], e).trim();
          }

          break;

        default:
          var v = b = 0;

          for (c = []; b < a; ++b) {
            for (var n = 0; n < m; ++n) {
              c[v++] = Z(d[n] + ' ', h[b], e).trim();
            }
          }

      }

      return c;
    }

    function Z(d, c, e) {
      var h = c.charCodeAt(0);
      33 > h && (h = (c = c.trim()).charCodeAt(0));

      switch (h) {
        case 38:
          return c.replace(F, '$1' + d.trim());

        case 58:
          return d.trim() + c.replace(F, '$1' + d.trim());

        default:
          if (0 < 1 * e && 0 < c.indexOf('\f')) return c.replace(F, (58 === d.charCodeAt(0) ? '' : '$1') + d.trim());
      }

      return d + c;
    }

    function P(d, c, e, h) {
      var a = d + ';',
          m = 2 * c + 3 * e + 4 * h;

      if (944 === m) {
        d = a.indexOf(':', 9) + 1;
        var b = a.substring(d, a.length - 1).trim();
        b = a.substring(0, d).trim() + b + ';';
        return 1 === w || 2 === w && L(b, 1) ? '-webkit-' + b + b : b;
      }

      if (0 === w || 2 === w && !L(a, 1)) return a;

      switch (m) {
        case 1015:
          return 97 === a.charCodeAt(10) ? '-webkit-' + a + a : a;

        case 951:
          return 116 === a.charCodeAt(3) ? '-webkit-' + a + a : a;

        case 963:
          return 110 === a.charCodeAt(5) ? '-webkit-' + a + a : a;

        case 1009:
          if (100 !== a.charCodeAt(4)) break;

        case 969:
        case 942:
          return '-webkit-' + a + a;

        case 978:
          return '-webkit-' + a + '-moz-' + a + a;

        case 1019:
        case 983:
          return '-webkit-' + a + '-moz-' + a + '-ms-' + a + a;

        case 883:
          if (45 === a.charCodeAt(8)) return '-webkit-' + a + a;
          if (0 < a.indexOf('image-set(', 11)) return a.replace(ja, '$1-webkit-$2') + a;
          break;

        case 932:
          if (45 === a.charCodeAt(4)) switch (a.charCodeAt(5)) {
            case 103:
              return '-webkit-box-' + a.replace('-grow', '') + '-webkit-' + a + '-ms-' + a.replace('grow', 'positive') + a;

            case 115:
              return '-webkit-' + a + '-ms-' + a.replace('shrink', 'negative') + a;

            case 98:
              return '-webkit-' + a + '-ms-' + a.replace('basis', 'preferred-size') + a;
          }
          return '-webkit-' + a + '-ms-' + a + a;

        case 964:
          return '-webkit-' + a + '-ms-flex-' + a + a;

        case 1023:
          if (99 !== a.charCodeAt(8)) break;
          b = a.substring(a.indexOf(':', 15)).replace('flex-', '').replace('space-between', 'justify');
          return '-webkit-box-pack' + b + '-webkit-' + a + '-ms-flex-pack' + b + a;

        case 1005:
          return ka.test(a) ? a.replace(aa, ':-webkit-') + a.replace(aa, ':-moz-') + a : a;

        case 1e3:
          b = a.substring(13).trim();
          c = b.indexOf('-') + 1;

          switch (b.charCodeAt(0) + b.charCodeAt(c)) {
            case 226:
              b = a.replace(G, 'tb');
              break;

            case 232:
              b = a.replace(G, 'tb-rl');
              break;

            case 220:
              b = a.replace(G, 'lr');
              break;

            default:
              return a;
          }

          return '-webkit-' + a + '-ms-' + b + a;

        case 1017:
          if (-1 === a.indexOf('sticky', 9)) break;

        case 975:
          c = (a = d).length - 10;
          b = (33 === a.charCodeAt(c) ? a.substring(0, c) : a).substring(d.indexOf(':', 7) + 1).trim();

          switch (m = b.charCodeAt(0) + (b.charCodeAt(7) | 0)) {
            case 203:
              if (111 > b.charCodeAt(8)) break;

            case 115:
              a = a.replace(b, '-webkit-' + b) + ';' + a;
              break;

            case 207:
            case 102:
              a = a.replace(b, '-webkit-' + (102 < m ? 'inline-' : '') + 'box') + ';' + a.replace(b, '-webkit-' + b) + ';' + a.replace(b, '-ms-' + b + 'box') + ';' + a;
          }

          return a + ';';

        case 938:
          if (45 === a.charCodeAt(5)) switch (a.charCodeAt(6)) {
            case 105:
              return b = a.replace('-items', ''), '-webkit-' + a + '-webkit-box-' + b + '-ms-flex-' + b + a;

            case 115:
              return '-webkit-' + a + '-ms-flex-item-' + a.replace(ba, '') + a;

            default:
              return '-webkit-' + a + '-ms-flex-line-pack' + a.replace('align-content', '').replace(ba, '') + a;
          }
          break;

        case 973:
        case 989:
          if (45 !== a.charCodeAt(3) || 122 === a.charCodeAt(4)) break;

        case 931:
        case 953:
          if (!0 === la.test(d)) return 115 === (b = d.substring(d.indexOf(':') + 1)).charCodeAt(0) ? P(d.replace('stretch', 'fill-available'), c, e, h).replace(':fill-available', ':stretch') : a.replace(b, '-webkit-' + b) + a.replace(b, '-moz-' + b.replace('fill-', '')) + a;
          break;

        case 962:
          if (a = '-webkit-' + a + (102 === a.charCodeAt(5) ? '-ms-' + a : '') + a, 211 === e + h && 105 === a.charCodeAt(13) && 0 < a.indexOf('transform', 10)) return a.substring(0, a.indexOf(';', 27) + 1).replace(ma, '$1-webkit-$2') + a;
      }

      return a;
    }

    function L(d, c) {
      var e = d.indexOf(1 === c ? ':' : '{'),
          h = d.substring(0, 3 !== c ? e : 10);
      e = d.substring(e + 1, d.length - 1);
      return R(2 !== c ? h : h.replace(na, '$1'), e, c);
    }

    function ea(d, c) {
      var e = P(c, c.charCodeAt(0), c.charCodeAt(1), c.charCodeAt(2));
      return e !== c + ';' ? e.replace(oa, ' or ($1)').substring(4) : '(' + c + ')';
    }

    function H(d, c, e, h, a, m, b, v, n, q) {
      for (var g = 0, x = c, w; g < A; ++g) {
        switch (w = S[g].call(B, d, x, e, h, a, m, b, v, n, q)) {
          case void 0:
          case !1:
          case !0:
          case null:
            break;

          default:
            x = w;
        }
      }

      if (x !== c) return x;
    }

    function T(d) {
      switch (d) {
        case void 0:
        case null:
          A = S.length = 0;
          break;

        default:
          if ('function' === typeof d) S[A++] = d;else if ('object' === typeof d) for (var c = 0, e = d.length; c < e; ++c) {
            T(d[c]);
          } else Y = !!d | 0;
      }

      return T;
    }

    function U(d) {
      d = d.prefix;
      void 0 !== d && (R = null, d ? 'function' !== typeof d ? w = 1 : (w = 2, R = d) : w = 0);
      return U;
    }

    function B(d, c) {
      var e = d;
      33 > e.charCodeAt(0) && (e = e.trim());
      V = e;
      e = [V];

      if (0 < A) {
        var h = H(-1, c, e, e, D, z, 0, 0, 0, 0);
        void 0 !== h && 'string' === typeof h && (c = h);
      }

      var a = M(O, e, c, 0, 0);
      0 < A && (h = H(-2, a, e, e, D, z, a.length, 0, 0, 0), void 0 !== h && (a = h));
      V = '';
      E = 0;
      z = D = 1;
      return a;
    }

    var ca = /^\0+/g,
        N = /[\0\r\f]/g,
        aa = /: */g,
        ka = /zoo|gra/,
        ma = /([,: ])(transform)/g,
        ia = /,\r+?/g,
        F = /([\t\r\n ])*\f?&/g,
        fa = /@(k\w+)\s*(\S*)\s*/,
        Q = /::(place)/g,
        ha = /:(read-only)/g,
        G = /[svh]\w+-[tblr]{2}/,
        da = /\(\s*(.*)\s*\)/g,
        oa = /([\s\S]*?);/g,
        ba = /-self|flex-/g,
        na = /[^]*?(:[rp][el]a[\w-]+)[^]*/,
        la = /stretch|:\s*\w+\-(?:conte|avail)/,
        ja = /([^-])(image-set\()/,
        z = 1,
        D = 1,
        E = 0,
        w = 1,
        O = [],
        S = [],
        A = 0,
        R = null,
        Y = 0,
        V = '';
    B.use = T;
    B.set = U;
    void 0 !== W && U(W);
    return B;
  }

  // 

  /* eslint-disable */
  var SEED = 5381; // When we have separate strings it's useful to run a progressive
  // version of djb2 where we pretend that we're still looping over
  // the same string

  var phash = function phash(h, x) {
    var i = x.length;

    while (i) {
      h = h * 33 ^ x.charCodeAt(--i);
    }

    return h;
  }; // This is a djb2 hashing function

  var hash = function hash(x) {
    return phash(SEED, x);
  };

  /**
   * MIT License
   *
   * Copyright (c) 2016 Sultan Tarimo
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy of
   * this software and associated documentation files (the "Software"),
   * to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
   * sell copies of the Software and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
   * OR IMPLIED INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
   * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR
   * IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
   */

  /* eslint-disable */
  function insertRulePlugin (insertRule) {
    var delimiter = '/*|*/';
    var needle = delimiter + "}";

    function toSheet(block) {
      if (block) {
        try {
          insertRule(block + "}");
        } catch (e) {}
      }
    }

    return function ruleSheet(context, content, selectors, parents, line, column, length, ns, depth, at) {
      switch (context) {
        // property
        case 1:
          // @import
          if (depth === 0 && content.charCodeAt(0) === 64) return insertRule(content + ";"), '';
          break;
        // selector

        case 2:
          if (ns === 0) return content + delimiter;
          break;
        // at-rule

        case 3:
          switch (ns) {
            // @font-face, @page
            case 102:
            case 112:
              return insertRule(selectors[0] + content), '';

            default:
              return content + (at === 0 ? delimiter : '');
          }

        case -2:
          content.split(needle).forEach(toSheet);
      }
    };
  }

  var COMMENT_REGEX = /^\s*\/\/.*$/gm;
  function createStylisInstance(_temp) {
    var _ref = _temp === void 0 ? EMPTY_OBJECT : _temp,
        _ref$options = _ref.options,
        options = _ref$options === void 0 ? EMPTY_OBJECT : _ref$options,
        _ref$plugins = _ref.plugins,
        plugins = _ref$plugins === void 0 ? EMPTY_ARRAY : _ref$plugins;

    var stylis = new stylis_min(options); // Wrap `insertRulePlugin to build a list of rules,
    // and then make our own plugin to return the rules. This
    // makes it easier to hook into the existing SSR architecture

    var parsingRules = []; // eslint-disable-next-line consistent-return

    var returnRulesPlugin = function returnRulesPlugin(context) {
      if (context === -2) {
        var parsedRules = parsingRules;
        parsingRules = [];
        return parsedRules;
      }
    };

    var parseRulesPlugin = insertRulePlugin(function (rule) {
      parsingRules.push(rule);
    });

    var _componentId;

    var _selector;

    var _selectorRegexp;

    var selfReferenceReplacer = function selfReferenceReplacer(match, offset, string) {
      if ( // the first self-ref is always untouched
      offset > 0 && // there should be at least two self-refs to do a replacement (.b > .b)
      string.slice(0, offset).indexOf(_selector) !== -1 && // no consecutive self refs (.b.b); that is a precedence boost and treated differently
      string.slice(offset - _selector.length, offset) !== _selector) {
        return "." + _componentId;
      }

      return match;
    };
    /**
     * When writing a style like
     *
     * & + & {
     *   color: red;
     * }
     *
     * The second ampersand should be a reference to the static component class. stylis
     * has no knowledge of static class so we have to intelligently replace the base selector.
     *
     * https://github.com/thysultan/stylis.js#plugins <- more info about the context phase values
     * "2" means this plugin is taking effect at the very end after all other processing is complete
     */


    var selfReferenceReplacementPlugin = function selfReferenceReplacementPlugin(context, _, selectors) {
      if (context === 2 && selectors.length && selectors[0].lastIndexOf(_selector) > 0) {
        // eslint-disable-next-line no-param-reassign
        selectors[0] = selectors[0].replace(_selectorRegexp, selfReferenceReplacer);
      }
    };

    stylis.use([].concat(plugins, [selfReferenceReplacementPlugin, parseRulesPlugin, returnRulesPlugin]));

    function stringifyRules(css, selector, prefix, componentId) {
      if (componentId === void 0) {
        componentId = '&';
      }

      var flatCSS = css.replace(COMMENT_REGEX, '');
      var cssStr = selector && prefix ? prefix + " " + selector + " { " + flatCSS + " }" : flatCSS; // stylis has no concept of state to be passed to plugins
      // but since JS is single=threaded, we can rely on that to ensure
      // these properties stay in sync with the current stylis run

      _componentId = componentId;
      _selector = selector;
      _selectorRegexp = new RegExp("\\" + _selector + "\\b", 'g');
      return stylis(prefix || !selector ? '' : selector, cssStr);
    }

    stringifyRules.hash = plugins.length ? plugins.reduce(function (acc, plugin) {
      if (!plugin.name) {
        throwStyledComponentsError(15);
      }

      return phash(acc, plugin.name);
    }, SEED).toString() : '';
    return stringifyRules;
  }

  // 
  var StyleSheetContext = React__default.createContext();
  var StyleSheetConsumer = StyleSheetContext.Consumer;
  var StylisContext = React__default.createContext();
  var StylisConsumer = StylisContext.Consumer;
  var masterSheet = new StyleSheet();
  var masterStylis = createStylisInstance();
  function useStyleSheet() {
    return React.useContext(StyleSheetContext) || masterSheet;
  }
  function useStylis() {
    return React.useContext(StylisContext) || masterStylis;
  }
  function StyleSheetManager(props) {
    var _useState = React.useState(props.stylisPlugins),
        plugins = _useState[0],
        setPlugins = _useState[1];

    var contextStyleSheet = useStyleSheet();
    var styleSheet = React.useMemo(function () {
      var sheet = contextStyleSheet;

      if (props.sheet) {
        // eslint-disable-next-line prefer-destructuring
        sheet = props.sheet;
      } else if (props.target) {
        sheet = sheet.reconstructWithOptions({
          target: props.target
        });
      }

      if (props.disableCSSOMInjection) {
        sheet = sheet.reconstructWithOptions({
          useCSSOMInjection: false
        });
      }

      return sheet;
    }, [props.disableCSSOMInjection, props.sheet, props.target]);
    var stylis = React.useMemo(function () {
      return createStylisInstance({
        options: {
          prefix: !props.disableVendorPrefixes
        },
        plugins: plugins
      });
    }, [props.disableVendorPrefixes, plugins]);
    React.useEffect(function () {
      if (!shallowequal(plugins, props.stylisPlugins)) setPlugins(props.stylisPlugins);
    }, [props.stylisPlugins]);
    return React__default.createElement(StyleSheetContext.Provider, {
      value: styleSheet
    }, React__default.createElement(StylisContext.Provider, {
      value: stylis
    },  React__default.Children.only(props.children) ));
  }

  // 

  var Keyframes =
  /*#__PURE__*/
  function () {
    function Keyframes(name, stringifyArgs) {
      var _this = this;

      this.inject = function (styleSheet) {
        if (!styleSheet.hasNameForId(_this.id, _this.name)) {
          styleSheet.insertRules(_this.id, _this.name, masterStylis.apply(void 0, _this.stringifyArgs));
        }
      };

      this.toString = function () {
        return throwStyledComponentsError(12, String(_this.name));
      };

      this.name = name;
      this.id = "sc-keyframes-" + name;
      this.stringifyArgs = stringifyArgs;
    }

    var _proto = Keyframes.prototype;

    _proto.getName = function getName() {
      return this.name;
    };

    return Keyframes;
  }();

  // 

  /**
   * inlined version of
   * https://github.com/facebook/fbjs/blob/master/packages/fbjs/src/core/hyphenateStyleName.js
   */
  var uppercasePattern = /([A-Z])/g;
  var msPattern = /^ms-/;
  /**
   * Hyphenates a camelcased CSS property name, for example:
   *
   *   > hyphenateStyleName('backgroundColor')
   *   < "background-color"
   *   > hyphenateStyleName('MozTransition')
   *   < "-moz-transition"
   *   > hyphenateStyleName('msTransition')
   *   < "-ms-transition"
   *
   * As Modernizr suggests (http://modernizr.com/docs/#prefixed), an `ms` prefix
   * is converted to `-ms-`.
   *
   * @param {string} string
   * @return {string}
   */

  function hyphenateStyleName(string) {
    return string.replace(uppercasePattern, '-$1').toLowerCase().replace(msPattern, '-ms-');
  }

  var unitlessKeys = {
    animationIterationCount: 1,
    borderImageOutset: 1,
    borderImageSlice: 1,
    borderImageWidth: 1,
    boxFlex: 1,
    boxFlexGroup: 1,
    boxOrdinalGroup: 1,
    columnCount: 1,
    columns: 1,
    flex: 1,
    flexGrow: 1,
    flexPositive: 1,
    flexShrink: 1,
    flexNegative: 1,
    flexOrder: 1,
    gridRow: 1,
    gridRowEnd: 1,
    gridRowSpan: 1,
    gridRowStart: 1,
    gridColumn: 1,
    gridColumnEnd: 1,
    gridColumnSpan: 1,
    gridColumnStart: 1,
    msGridRow: 1,
    msGridRowSpan: 1,
    msGridColumn: 1,
    msGridColumnSpan: 1,
    fontWeight: 1,
    lineHeight: 1,
    opacity: 1,
    order: 1,
    orphans: 1,
    tabSize: 1,
    widows: 1,
    zIndex: 1,
    zoom: 1,
    WebkitLineClamp: 1,
    // SVG-related properties
    fillOpacity: 1,
    floodOpacity: 1,
    stopOpacity: 1,
    strokeDasharray: 1,
    strokeDashoffset: 1,
    strokeMiterlimit: 1,
    strokeOpacity: 1,
    strokeWidth: 1
  };

  // 

  function addUnitIfNeeded(name, value) {
    // https://github.com/amilajack/eslint-plugin-flowtype-errors/issues/133
    // $FlowFixMe
    if (value == null || typeof value === 'boolean' || value === '') {
      return '';
    }

    if (typeof value === 'number' && value !== 0 && !(name in unitlessKeys)) {
      return value + "px"; // Presumes implicit 'px' suffix for unitless numbers
    }

    return String(value).trim();
  }

  // 
  /**
   * It's falsish not falsy because 0 is allowed.
   */

  var isFalsish = function isFalsish(chunk) {
    return chunk === undefined || chunk === null || chunk === false || chunk === '';
  };

  var objToCssArray = function objToCssArray(obj, prevKey) {
    var rules = [];
    var keys = Object.keys(obj);
    keys.forEach(function (key) {
      if (!isFalsish(obj[key])) {
        if (isPlainObject(obj[key])) {
          rules.push.apply(rules, objToCssArray(obj[key], key));
          return rules;
        } else if (isFunction(obj[key])) {
          rules.push(hyphenateStyleName(key) + ":", obj[key], ';');
          return rules;
        }

        rules.push(hyphenateStyleName(key) + ": " + addUnitIfNeeded(key, obj[key]) + ";");
      }

      return rules;
    });
    return prevKey ? [prevKey + " {"].concat(rules, ['}']) : rules;
  };
  function flatten(chunk, executionContext, styleSheet) {
    if (Array.isArray(chunk)) {
      var ruleSet = [];

      for (var i = 0, len = chunk.length, result; i < len; i += 1) {
        result = flatten(chunk[i], executionContext, styleSheet);
        if (result === '') continue;else if (Array.isArray(result)) ruleSet.push.apply(ruleSet, result);else ruleSet.push(result);
      }

      return ruleSet;
    }

    if (isFalsish(chunk)) {
      return '';
    }
    /* Handle other components */


    if (isStyledComponent(chunk)) {
      return "." + chunk.styledComponentId;
    }
    /* Either execute or defer the function */


    if (isFunction(chunk)) {
      if (isStatelessFunction(chunk) && executionContext) {
        var _result = chunk(executionContext);

        if ( reactIs.isElement(_result)) {
          // eslint-disable-next-line no-console
          console.warn(getComponentName(chunk) + " is not a styled component and cannot be referred to via component selector. See https://www.styled-components.com/docs/advanced#referring-to-other-components for more details.");
        }

        return flatten(_result, executionContext, styleSheet);
      } else return chunk;
    }

    if (chunk instanceof Keyframes) {
      if (styleSheet) {
        chunk.inject(styleSheet);
        return chunk.getName();
      } else return chunk;
    }
    /* Handle objects */


    return isPlainObject(chunk) ? objToCssArray(chunk) : chunk.toString();
  }

  // 
  function css(styles) {
    for (var _len = arguments.length, interpolations = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      interpolations[_key - 1] = arguments[_key];
    }

    if (isFunction(styles) || isPlainObject(styles)) {
      // $FlowFixMe
      return flatten(interleave(EMPTY_ARRAY, [styles].concat(interpolations)));
    }

    if (interpolations.length === 0 && styles.length === 1 && typeof styles[0] === "string") {
      // $FlowFixMe
      return styles;
    } // $FlowFixMe


    return flatten(interleave(styles, interpolations));
  }

  // 
  function isStaticRules(rules) {
    for (var i = 0; i < rules.length; i += 1) {
      var rule = rules[i];

      if (isFunction(rule) && !isStyledComponent(rule)) {
        // functions are allowed to be static if they're just being
        // used to get the classname of a nested styled component
        return false;
      }
    }

    return true;
  }

  // 

  var GlobalStyle =
  /*#__PURE__*/
  function () {
    function GlobalStyle(rules, componentId) {
      this.rules = rules;
      this.componentId = componentId;
      this.isStatic = isStaticRules(rules);
    }

    var _proto = GlobalStyle.prototype;

    _proto.createStyles = function createStyles(instance, executionContext, styleSheet, stylis) {
      var flatCSS = flatten(this.rules, executionContext, styleSheet);
      var css = stylis(flatCSS.join(''), '');
      var id = this.componentId + instance; // NOTE: We use the id as a name as well, since these rules never change

      styleSheet.insertRules(id, id, css);
    };

    _proto.removeStyles = function removeStyles(instance, styleSheet) {
      styleSheet.clearRules(this.componentId + instance);
    };

    _proto.renderStyles = function renderStyles(instance, executionContext, styleSheet, stylis) {
      StyleSheet.registerId(this.componentId + instance); // NOTE: Remove old styles, then inject the new ones

      this.removeStyles(instance, styleSheet);
      this.createStyles(instance, executionContext, styleSheet, stylis);
    };

    return GlobalStyle;
  }();

  // 
  var invalidHookCallRe = /invalid hook call/i;
  var seen = new Set();
  var checkDynamicCreation = function checkDynamicCreation(displayName, componentId) {
    {
      var parsedIdString = componentId ? " with the id of \"" + componentId + "\"" : '';
      var message = "The component " + displayName + parsedIdString + " has been created dynamically.\n" + 'You may see this warning because you\'ve called styled inside another component.\n' + 'To resolve this only create new StyledComponents outside of any render method and function component.';

      try {
        // We purposefully call `useRef` outside of a component and expect it to throw
        // If it doesn't, then we're inside another component.
        // eslint-disable-next-line react-hooks/rules-of-hooks
        React.useRef();

        if (!seen.has(message)) {
          // eslint-disable-next-line no-console
          console.warn(message);
          seen.add(message);
        }
      } catch (error) {
        // The error here is expected, since we're expecting anything that uses `checkDynamicCreation` to
        // be called outside of a React component.
        if (invalidHookCallRe.test(error.message)) {
          // This shouldn't happen, but resets `warningSeen` if we had this error happen intermittently
          seen["delete"](message);
        }
      }
    }
  };

  // 
  var determineTheme = (function (props, providedTheme, defaultProps) {
    if (defaultProps === void 0) {
      defaultProps = EMPTY_OBJECT;
    }

    return props.theme !== defaultProps.theme && props.theme || providedTheme || defaultProps.theme;
  });

  var ThemeContext = React__default.createContext();
  var ThemeConsumer = ThemeContext.Consumer;

  function mergeTheme(theme, outerTheme) {
    if (!theme) {
      return throwStyledComponentsError(14);
    }

    if (isFunction(theme)) {
      var mergedTheme = theme(outerTheme);

      if ( (mergedTheme === null || Array.isArray(mergedTheme) || typeof mergedTheme !== 'object')) {
        return throwStyledComponentsError(7);
      }

      return mergedTheme;
    }

    if (Array.isArray(theme) || typeof theme !== 'object') {
      return throwStyledComponentsError(8);
    }

    return outerTheme ? _extends({}, outerTheme, {}, theme) : theme;
  }
  /**
   * Provide a theme to an entire react component tree via context
   */


  function ThemeProvider(props) {
    var outerTheme = React.useContext(ThemeContext);
    var themeContext = React.useMemo(function () {
      return mergeTheme(props.theme, outerTheme);
    }, [props.theme, outerTheme]);

    if (!props.children) {
      return null;
    }

    return React__default.createElement(ThemeContext.Provider, {
      value: themeContext
    }, props.children);
  }

  // 

  /* eslint-disable no-bitwise */
  var AD_REPLACER_R = /(a)(d)/gi;
  /* This is the "capacity" of our alphabet i.e. 2x26 for all letters plus their capitalised
   * counterparts */

  var charsLength = 52;
  /* start at 75 for 'a' until 'z' (25) and then start at 65 for capitalised letters */

  var getAlphabeticChar = function getAlphabeticChar(code) {
    return String.fromCharCode(code + (code > 25 ? 39 : 97));
  };
  /* input a number, usually a hash and convert it to base-52 */


  function generateAlphabeticName(code) {
    var name = '';
    var x;
    /* get a char and divide by alphabet-length */

    for (x = Math.abs(code); x > charsLength; x = x / charsLength | 0) {
      name = getAlphabeticChar(x % charsLength) + name;
    }

    return (getAlphabeticChar(x % charsLength) + name).replace(AD_REPLACER_R, '$1-$2');
  }

  // 
  var generateComponentId = (function (str) {
    return generateAlphabeticName(hash(str) >>> 0);
  });

  function createGlobalStyle(strings) {
    for (var _len = arguments.length, interpolations = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      interpolations[_key - 1] = arguments[_key];
    }

    var rules = css.apply(void 0, [strings].concat(interpolations));
    var styledComponentId = "sc-global-" + generateComponentId(JSON.stringify(rules));
    var globalStyle = new GlobalStyle(rules, styledComponentId);

    {
      checkDynamicCreation(styledComponentId);
    }

    function GlobalStyleComponent(props) {
      var styleSheet = useStyleSheet();
      var stylis = useStylis();
      var theme = React.useContext(ThemeContext);
      var instanceRef = React.useRef(null);

      if (instanceRef.current === null) {
        instanceRef.current = styleSheet.allocateGSInstance(styledComponentId);
      }

      var instance = instanceRef.current;

      if ( React__default.Children.count(props.children)) {
        // eslint-disable-next-line no-console
        console.warn("The global style component " + styledComponentId + " was given child JSX. createGlobalStyle does not render children.");
      }

      if ( rules.some(function (rule) {
        return typeof rule === 'string' && rule.indexOf('@import') !== -1;
      })) {
        console.warn("Please do not use @import CSS syntax in createGlobalStyle at this time, as the CSSOM APIs we use in production do not handle it well. Instead, we recommend using a library such as react-helmet to inject a typical <link> meta tag to the stylesheet, or simply embedding it manually in your index.html <head> section for a simpler app.");
      }

      if (globalStyle.isStatic) {
        globalStyle.renderStyles(instance, STATIC_EXECUTION_CONTEXT, styleSheet, stylis);
      } else {
        var context = _extends({}, props, {
          theme: determineTheme(props, theme, GlobalStyleComponent.defaultProps)
        });

        globalStyle.renderStyles(instance, context, styleSheet, stylis);
      }

      React.useEffect(function () {
        return function () {
          return globalStyle.removeStyles(instance, styleSheet);
        };
      }, EMPTY_ARRAY);
      return null;
    } // $FlowFixMe


    return React__default.memo(GlobalStyleComponent);
  }

  // 
  function keyframes(strings) {
    /* Warning if you've used keyframes on React Native */
    if ( typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
      // eslint-disable-next-line no-console
      console.warn('`keyframes` cannot be used on ReactNative, only on the web. To do animation in ReactNative please use Animated.');
    }

    for (var _len = arguments.length, interpolations = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      interpolations[_key - 1] = arguments[_key];
    }

    var rules = css.apply(void 0, [strings].concat(interpolations)).join('');
    var name = generateComponentId(rules);
    return new Keyframes(name, [rules, name, '@keyframes']);
  }

  var ServerStyleSheet =
  /*#__PURE__*/
  function () {
    function ServerStyleSheet() {
      var _this = this;

      this._emitSheetCSS = function () {
        var css = _this.instance.toString();

        var nonce = getNonce();
        var attrs = [nonce && "nonce=\"" + nonce + "\"", SC_ATTR + "=\"true\"", SC_ATTR_VERSION + "=\"" + SC_VERSION + "\""];
        var htmlAttr = attrs.filter(Boolean).join(' ');
        return "<style " + htmlAttr + ">" + css + "</style>";
      };

      this.getStyleTags = function () {
        if (_this.sealed) {
          return throwStyledComponentsError(2);
        }

        return _this._emitSheetCSS();
      };

      this.getStyleElement = function () {
        var _props;

        if (_this.sealed) {
          return throwStyledComponentsError(2);
        }

        var props = (_props = {}, _props[SC_ATTR] = '', _props[SC_ATTR_VERSION] = SC_VERSION, _props.dangerouslySetInnerHTML = {
          __html: _this.instance.toString()
        }, _props);
        var nonce = getNonce();

        if (nonce) {
          props.nonce = nonce;
        } // v4 returned an array for this fn, so we'll do the same for v5 for backward compat


        return [React__default.createElement("style", _extends({}, props, {
          key: "sc-0-0"
        }))];
      };

      this.seal = function () {
        _this.sealed = true;
      };

      this.instance = new StyleSheet({
        isServer: true
      });
      this.sealed = false;
    }

    var _proto = ServerStyleSheet.prototype;

    _proto.collectStyles = function collectStyles(children) {
      if (this.sealed) {
        return throwStyledComponentsError(2);
      }

      return React__default.createElement(StyleSheetManager, {
        sheet: this.instance
      }, children);
    };

    // eslint-disable-next-line consistent-return
    _proto.interleaveWithNodeStream = function interleaveWithNodeStream(input) {
      {
        return throwStyledComponentsError(3);
      }
    };

    return ServerStyleSheet;
  }();

  /**
   * Copyright 2015, Yahoo! Inc.
   * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
   */
  var REACT_STATICS = {
    childContextTypes: true,
    contextType: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    getDerivedStateFromError: true,
    getDerivedStateFromProps: true,
    mixins: true,
    propTypes: true,
    type: true
  };
  var KNOWN_STATICS = {
    name: true,
    length: true,
    prototype: true,
    caller: true,
    callee: true,
    arguments: true,
    arity: true
  };
  var FORWARD_REF_STATICS = {
    '$$typeof': true,
    render: true,
    defaultProps: true,
    displayName: true,
    propTypes: true
  };
  var MEMO_STATICS = {
    '$$typeof': true,
    compare: true,
    defaultProps: true,
    displayName: true,
    propTypes: true,
    type: true
  };
  var TYPE_STATICS = {};
  TYPE_STATICS[reactIs__default.ForwardRef] = FORWARD_REF_STATICS;
  TYPE_STATICS[reactIs__default.Memo] = MEMO_STATICS;

  function getStatics(component) {
    // React v16.11 and below
    if (reactIs__default.isMemo(component)) {
      return MEMO_STATICS;
    } // React v16.12 and above


    return TYPE_STATICS[component['$$typeof']] || REACT_STATICS;
  }

  var defineProperty = Object.defineProperty;
  var getOwnPropertyNames = Object.getOwnPropertyNames;
  var getOwnPropertySymbols = Object.getOwnPropertySymbols;
  var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
  var getPrototypeOf = Object.getPrototypeOf;
  var objectPrototype = Object.prototype;
  function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
    if (typeof sourceComponent !== 'string') {
      // don't hoist over string (html) components
      if (objectPrototype) {
        var inheritedComponent = getPrototypeOf(sourceComponent);

        if (inheritedComponent && inheritedComponent !== objectPrototype) {
          hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
        }
      }

      var keys = getOwnPropertyNames(sourceComponent);

      if (getOwnPropertySymbols) {
        keys = keys.concat(getOwnPropertySymbols(sourceComponent));
      }

      var targetStatics = getStatics(targetComponent);
      var sourceStatics = getStatics(sourceComponent);

      for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];

        if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
          var descriptor = getOwnPropertyDescriptor(sourceComponent, key);

          try {
            // Avoid failures from read-only properties
            defineProperty(targetComponent, key, descriptor);
          } catch (e) {}
        }
      }
    }

    return targetComponent;
  }

  var hoistNonReactStatics_cjs = hoistNonReactStatics;

  // export default <Config: { theme?: any }, Instance>(
  //  Component: AbstractComponent<Config, Instance>
  // ): AbstractComponent<$Diff<Config, { theme?: any }> & { theme?: any }, Instance>
  //
  // but the old build system tooling doesn't support the syntax

  var withTheme = (function (Component) {
    // $FlowFixMe This should be React.forwardRef<Config, Instance>
    var WithTheme = React__default.forwardRef(function (props, ref) {
      var theme = React.useContext(ThemeContext); // $FlowFixMe defaultProps isn't declared so it can be inferrable

      var defaultProps = Component.defaultProps;
      var themeProp = determineTheme(props, theme, defaultProps);

      if ( themeProp === undefined) {
        // eslint-disable-next-line no-console
        console.warn("[withTheme] You are not using a ThemeProvider nor passing a theme prop or a theme in defaultProps in component class \"" + getComponentName(Component) + "\"");
      }

      return React__default.createElement(Component, _extends({}, props, {
        theme: themeProp,
        ref: ref
      }));
    });
    hoistNonReactStatics_cjs(WithTheme, Component);
    WithTheme.displayName = "WithTheme(" + getComponentName(Component) + ")";
    return WithTheme;
  });

  // 

  var useTheme = function useTheme() {
    return React.useContext(ThemeContext);
  };

  // 
  var __PRIVATE__ = {
    StyleSheet: StyleSheet,
    masterSheet: masterSheet
  };

  // 
  /* Define bundle version for export */

  var version = "5.0.1";
  /* Warning if you've imported this file on React Native */

  if ( typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    // eslint-disable-next-line no-console
    console.warn("It looks like you've imported 'styled-components' on React Native.\n" + "Perhaps you're looking to import 'styled-components/native'?\n" + 'Read more about this at https://www.styled-components.com/docs/basics#react-native');
  }
  /* Warning if there are several instances of styled-components */


  if ( typeof window !== 'undefined') {
    window['__styled-components-init__'] = window['__styled-components-init__'] || 0;

    if (window['__styled-components-init__'] === 1) {
      // eslint-disable-next-line no-console
      console.warn("It looks like there are several instances of 'styled-components' initialized in this application. " + 'This may cause dynamic styles not rendering properly, errors happening during rehydration process, ' + 'missing theme prop, and makes your application bigger without a good reason.\n\n' + 'See https://s-c.sh/2BAXzed for more info.');
    }

    window['__styled-components-init__'] += 1;
  }

  var secondary = /*#__PURE__*/Object.freeze({
    __proto__: null,
    createGlobalStyle: createGlobalStyle,
    css: css,
    isStyledComponent: isStyledComponent,
    keyframes: keyframes,
    ServerStyleSheet: ServerStyleSheet,
    StyleSheetConsumer: StyleSheetConsumer,
    StyleSheetContext: StyleSheetContext,
    StyleSheetManager: StyleSheetManager,
    ThemeConsumer: ThemeConsumer,
    ThemeContext: ThemeContext,
    ThemeProvider: ThemeProvider,
    useTheme: useTheme,
    version: version,
    withTheme: withTheme,
    __PRIVATE__: __PRIVATE__
  });

  function constructWithOptions(componentConstructor, tag, options) {
    if (options === void 0) {
      options = EMPTY_OBJECT;
    }

    if (!reactIs.isValidElementType(tag)) {
      return throwStyledComponentsError(1, String(tag));
    }
    /* This is callable directly as a template function */
    // $FlowFixMe: Not typed to avoid destructuring arguments


    var templateFunction = function templateFunction() {
      return componentConstructor(tag, options, css.apply(void 0, arguments));
    };
    /* If config methods are called, wrap up a new template function and merge options */


    templateFunction.withConfig = function (config) {
      return constructWithOptions(componentConstructor, tag, _extends({}, options, {}, config));
    };
    /* Modify/inject new props at runtime */


    templateFunction.attrs = function (attrs) {
      return constructWithOptions(componentConstructor, tag, _extends({}, options, {
        attrs: Array.prototype.concat(options.attrs, attrs).filter(Boolean)
      }));
    };

    return templateFunction;
  }

  function memoize(fn) {
    var cache = {};
    return function (arg) {
      if (cache[arg] === undefined) cache[arg] = fn(arg);
      return cache[arg];
    };
  }

  var reactPropsRegex = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|download|draggable|encType|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|itemProp|itemScope|itemType|itemID|itemRef|on|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/; // https://esbench.com/bench/5bfee68a4cd7e6009ef61d23

  var index = memoize(function (prop) {
    return reactPropsRegex.test(prop) || prop.charCodeAt(0) === 111
    /* o */
    && prop.charCodeAt(1) === 110
    /* n */
    && prop.charCodeAt(2) < 91;
  }
  /* Z+1 */
  );

  /* eslint-disable */

  /**
    mixin-deep; https://github.com/jonschlinkert/mixin-deep
    Inlined such that it will be consistently transpiled to an IE-compatible syntax.

    The MIT License (MIT)

    Copyright (c) 2014-present, Jon Schlinkert.

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.
  */
  var isObject = function isObject(val) {
    return typeof val === 'function' || typeof val === 'object' && val !== null && !Array.isArray(val);
  };

  var isValidKey = function isValidKey(key) {
    return key !== '__proto__' && key !== 'constructor' && key !== 'prototype';
  };

  function mixin(target, val, key) {
    var obj = target[key];

    if (isObject(val) && isObject(obj)) {
      mixinDeep(obj, val);
    } else {
      target[key] = val;
    }
  }

  function mixinDeep(target) {
    for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }

    for (var _i = 0, _rest = rest; _i < _rest.length; _i++) {
      var obj = _rest[_i];

      if (isObject(obj)) {
        for (var key in obj) {
          if (isValidKey(key)) {
            mixin(target, obj[key], key);
          }
        }
      }
    }

    return target;
  }

  // 
  /*
   ComponentStyle is all the CSS-specific stuff, not
   the React-specific stuff.
   */

  var ComponentStyle =
  /*#__PURE__*/
  function () {
    function ComponentStyle(rules, componentId) {
      this.rules = rules;
      this.staticRulesId = '';
      this.isStatic = "development" === 'production' ;
      this.componentId = componentId;
      this.baseHash = hash(componentId); // NOTE: This registers the componentId, which ensures a consistent order
      // for this component's styles compared to others

      StyleSheet.registerId(componentId);
    }
    /*
     * Flattens a rule set into valid CSS
     * Hashes it, wraps the whole chunk in a .hash1234 {}
     * Returns the hash to be injected on render()
     * */


    var _proto = ComponentStyle.prototype;

    _proto.generateAndInjectStyles = function generateAndInjectStyles(executionContext, styleSheet, stylis) {
      var componentId = this.componentId; // force dynamic classnames if user-supplied stylis plugins are in use

      if (this.isStatic && !stylis.hash) {
        if (this.staticRulesId && styleSheet.hasNameForId(componentId, this.staticRulesId)) {
          return this.staticRulesId;
        }

        var cssStatic = flatten(this.rules, executionContext, styleSheet).join('');
        var name = generateAlphabeticName(phash(this.baseHash, cssStatic.length) >>> 0);

        if (!styleSheet.hasNameForId(componentId, name)) {
          var cssStaticFormatted = stylis(cssStatic, "." + name, undefined, componentId);
          styleSheet.insertRules(componentId, name, cssStaticFormatted);
        }

        this.staticRulesId = name;
        return name;
      } else {
        var length = this.rules.length;
        var dynamicHash = phash(this.baseHash, stylis.hash);
        var css = '';

        for (var i = 0; i < length; i++) {
          var partRule = this.rules[i];

          if (typeof partRule === 'string') {
            css += partRule;
            dynamicHash = phash(dynamicHash, partRule + i);
          } else {
            var partChunk = flatten(partRule, executionContext, styleSheet);
            var partString = Array.isArray(partChunk) ? partChunk.join('') : partChunk;
            dynamicHash = phash(dynamicHash, partString + i);
            css += partString;
          }
        }

        var _name = generateAlphabeticName(dynamicHash >>> 0);

        if (!styleSheet.hasNameForId(componentId, _name)) {
          var cssFormatted = stylis(css, "." + _name, undefined, componentId);
          styleSheet.insertRules(componentId, _name, cssFormatted);
        }

        return _name;
      }
    };

    return ComponentStyle;
  }();

  // 
  var LIMIT = 200;
  var createWarnTooManyClasses = (function (displayName, componentId) {
    var generatedClasses = {};
    var warningSeen = false;
    return function (className) {
      if (!warningSeen) {
        generatedClasses[className] = true;

        if (Object.keys(generatedClasses).length >= LIMIT) {
          // Unable to find latestRule in test environment.

          /* eslint-disable no-console, prefer-template */
          var parsedIdString = componentId ? " with the id of \"" + componentId + "\"" : '';
          console.warn("Over " + LIMIT + " classes were generated for component " + displayName + parsedIdString + ".\n" + 'Consider using the attrs method, together with a style object for frequently changed styles.\n' + 'Example:\n' + '  const Component = styled.div.attrs(props => ({\n' + '    style: {\n' + '      background: props.background,\n' + '    },\n' + '  }))`width: 100%;`\n\n' + '  <Component />');
          warningSeen = true;
          generatedClasses = {};
        }
      }
    };
  });

  // 
  var escapeRegex = /[[\].#*$><+~=|^:(),"'`-]+/g;
  var dashesAtEnds = /(^-|-$)/g;
  /**
   * TODO: Explore using CSS.escape when it becomes more available
   * in evergreen browsers.
   */

  function escape(str) {
    return str // Replace all possible CSS selectors
    .replace(escapeRegex, '-') // Remove extraneous hyphens at the start and end
    .replace(dashesAtEnds, '');
  }

  // 
  function isTag(target) {
    return typeof target === 'string' && ( target.charAt(0) === target.charAt(0).toLowerCase() );
  }

  // 
  function generateDisplayName(target) {
    // $FlowFixMe
    return isTag(target) ? "styled." + target : "Styled(" + getComponentName(target) + ")";
  }

  /**
   * Convenience function for joining strings to form className chains
   */
  function joinStrings(a, b) {
    return a && b ? a + " " + b : a || b;
  }

  /* global $Call */

  var identifiers = {};
  /* We depend on components having unique IDs */

  function generateId(displayName, parentComponentId) {
    var name = typeof displayName !== 'string' ? 'sc' : escape(displayName); // Ensure that no displayName can lead to duplicate componentIds

    identifiers[name] = (identifiers[name] || 0) + 1;
    var componentId = name + "-" + generateComponentId(name + identifiers[name]);
    return parentComponentId ? parentComponentId + "-" + componentId : componentId;
  }

  function useResolvedAttrs(theme, props, attrs) {
    if (theme === void 0) {
      theme = EMPTY_OBJECT;
    }

    // NOTE: can't memoize this
    // returns [context, resolvedAttrs]
    // where resolvedAttrs is only the things injected by the attrs themselves
    var context = _extends({}, props, {
      theme: theme
    });

    var resolvedAttrs = {};
    attrs.forEach(function (attrDef) {
      var resolvedAttrDef = attrDef;
      var key;

      if (isFunction(resolvedAttrDef)) {
        resolvedAttrDef = resolvedAttrDef(context);
      }
      /* eslint-disable guard-for-in */


      for (key in resolvedAttrDef) {
        context[key] = resolvedAttrs[key] = key === 'className' ? joinStrings(resolvedAttrs[key], resolvedAttrDef[key]) : resolvedAttrDef[key];
      }
      /* eslint-enable guard-for-in */

    });
    return [context, resolvedAttrs];
  }

  function useInjectedStyle(componentStyle, hasAttrs, resolvedAttrs, warnTooManyClasses) {
    var styleSheet = useStyleSheet();
    var stylis = useStylis(); // statically styled-components don't need to build an execution context object,
    // and shouldn't be increasing the number of class names

    var isStatic = componentStyle.isStatic && !hasAttrs;
    var className = isStatic ? componentStyle.generateAndInjectStyles(EMPTY_OBJECT, styleSheet, stylis) : componentStyle.generateAndInjectStyles(resolvedAttrs, styleSheet, stylis);
    React.useDebugValue(className);

    if ( !isStatic && warnTooManyClasses) {
      warnTooManyClasses(className);
    }

    return className;
  }

  function useStyledComponentImpl(forwardedComponent, props, forwardedRef) {
    var componentAttrs = forwardedComponent.attrs,
        componentStyle = forwardedComponent.componentStyle,
        defaultProps = forwardedComponent.defaultProps,
        foldedComponentIds = forwardedComponent.foldedComponentIds,
        styledComponentId = forwardedComponent.styledComponentId,
        target = forwardedComponent.target;
    React.useDebugValue(styledComponentId); // NOTE: the non-hooks version only subscribes to this when !componentStyle.isStatic,
    // but that'd be against the rules-of-hooks. We could be naughty and do it anyway as it
    // should be an immutable value, but behave for now.

    var theme = determineTheme(props, React.useContext(ThemeContext), defaultProps);

    var _useResolvedAttrs = useResolvedAttrs(theme || EMPTY_OBJECT, props, componentAttrs),
        context = _useResolvedAttrs[0],
        attrs = _useResolvedAttrs[1];

    var generatedClassName = useInjectedStyle(componentStyle, componentAttrs.length > 0, context,  forwardedComponent.warnTooManyClasses );
    var refToForward = forwardedRef;
    var elementToBeCreated = attrs.as || props.as || target;
    var isTargetTag = isTag(elementToBeCreated);
    var computedProps = attrs !== props ? _extends({}, props, {}, attrs) : props;
    var shouldFilterProps = isTargetTag || 'as' in computedProps || 'forwardedAs' in computedProps;
    var propsForElement = shouldFilterProps ? {} : _extends({}, computedProps);

    if (shouldFilterProps) {
      // eslint-disable-next-line guard-for-in
      for (var key in computedProps) {
        if (key === 'forwardedAs') {
          propsForElement.as = computedProps[key];
        } else if (key !== 'as' && key !== 'forwardedAs' && (!isTargetTag || index(key))) {
          // Don't pass through non HTML tags through to HTML elements
          propsForElement[key] = computedProps[key];
        }
      }
    }

    if (props.style && attrs.style !== props.style) {
      propsForElement.style = _extends({}, props.style, {}, attrs.style);
    }

    propsForElement.className = Array.prototype.concat(foldedComponentIds, styledComponentId, generatedClassName !== styledComponentId ? generatedClassName : null, props.className, attrs.className).filter(Boolean).join(' ');
    propsForElement.ref = refToForward;
    return React.createElement(elementToBeCreated, propsForElement);
  }

  function createStyledComponent(target, options, rules) {
    var isTargetStyledComp = isStyledComponent(target);
    var isCompositeComponent = !isTag(target);
    var _options$displayName = options.displayName,
        displayName = _options$displayName === void 0 ? generateDisplayName(target) : _options$displayName,
        _options$componentId = options.componentId,
        componentId = _options$componentId === void 0 ? generateId(options.displayName, options.parentComponentId) : _options$componentId,
        _options$attrs = options.attrs,
        attrs = _options$attrs === void 0 ? EMPTY_ARRAY : _options$attrs;
    var styledComponentId = options.displayName && options.componentId ? escape(options.displayName) + "-" + options.componentId : options.componentId || componentId; // fold the underlying StyledComponent attrs up (implicit extend)

    var finalAttrs = // $FlowFixMe
    isTargetStyledComp && target.attrs ? Array.prototype.concat(target.attrs, attrs).filter(Boolean) : attrs;
    var componentStyle = new ComponentStyle(isTargetStyledComp ? // fold the underlying StyledComponent rules up (implicit extend)
    // $FlowFixMe
    target.componentStyle.rules.concat(rules) : rules, styledComponentId);
    /**
     * forwardRef creates a new interim component, which we'll take advantage of
     * instead of extending ParentComponent to create _another_ interim class
     */

    var WrappedStyledComponent; // eslint-disable-next-line react-hooks/rules-of-hooks

    var forwardRef = function forwardRef(props, ref) {
      return useStyledComponentImpl(WrappedStyledComponent, props, ref);
    };

    forwardRef.displayName = displayName; // $FlowFixMe this is a forced cast to merge it StyledComponentWrapperProperties

    WrappedStyledComponent = React__default.forwardRef(forwardRef);
    WrappedStyledComponent.attrs = finalAttrs;
    WrappedStyledComponent.componentStyle = componentStyle;
    WrappedStyledComponent.displayName = displayName; // this static is used to preserve the cascade of static classes for component selector
    // purposes; this is especially important with usage of the css prop

    WrappedStyledComponent.foldedComponentIds = isTargetStyledComp ? // $FlowFixMe
    Array.prototype.concat(target.foldedComponentIds, target.styledComponentId) : EMPTY_ARRAY;
    WrappedStyledComponent.styledComponentId = styledComponentId; // fold the underlying StyledComponent target up since we folded the styles

    WrappedStyledComponent.target = isTargetStyledComp ? // $FlowFixMe
    target.target : target; // $FlowFixMe

    WrappedStyledComponent.withComponent = function withComponent(tag) {
      var previousComponentId = options.componentId,
          optionsToCopy = _objectWithoutPropertiesLoose(options, ["componentId"]);

      var newComponentId = previousComponentId && previousComponentId + "-" + (isTag(tag) ? tag : escape(getComponentName(tag)));

      var newOptions = _extends({}, optionsToCopy, {
        attrs: finalAttrs,
        componentId: newComponentId
      });

      return createStyledComponent(tag, newOptions, rules);
    }; // $FlowFixMe


    Object.defineProperty(WrappedStyledComponent, 'defaultProps', {
      get: function get() {
        return this._foldedDefaultProps;
      },
      set: function set(obj) {
        // $FlowFixMe
        this._foldedDefaultProps = isTargetStyledComp ? mixinDeep({}, target.defaultProps, obj) : obj;
      }
    });

    {
      checkDynamicCreation(displayName, styledComponentId);
      WrappedStyledComponent.warnTooManyClasses = createWarnTooManyClasses(displayName, styledComponentId);
    } // $FlowFixMe


    WrappedStyledComponent.toString = function () {
      return "." + WrappedStyledComponent.styledComponentId;
    };

    if (isCompositeComponent) {
      hoistNonReactStatics_cjs(WrappedStyledComponent, target, {
        // all SC-specific things should not be hoisted
        attrs: true,
        componentStyle: true,
        displayName: true,
        foldedComponentIds: true,
        self: true,
        styledComponentId: true,
        target: true,
        withComponent: true
      });
    }

    return WrappedStyledComponent;
  }

  // 
  // Thanks to ReactDOMFactories for this handy list!
  var domElements = ['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'big', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'marquee', 'menu', 'menuitem', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr', // SVG
  'circle', 'clipPath', 'defs', 'ellipse', 'foreignObject', 'g', 'image', 'line', 'linearGradient', 'marker', 'mask', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'stop', 'svg', 'text', 'tspan'];

  // 

  var styled = function styled(tag) {
    return constructWithOptions(createStyledComponent, tag);
  }; // Shorthands for all valid HTML Elements


  domElements.forEach(function (domElement) {
    styled[domElement] = styled(domElement);
  });

  // 
  /**
   * eliminates the need to do styled.default since the other APIs
   * are directly assigned as properties to the main function
   * */
  // eslint-disable-next-line guard-for-in

  for (var key in secondary) {
    styled[key] = secondary[key];
  }

  return styled;

})));
//# sourceMappingURL=styled-components.js.map
