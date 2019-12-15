/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 *
 * Version: 5.0.13 (2019-08-06)
 */
(function (domGlobals) {
    'use strict';

    var global$1 = tinymce.util.Tools.resolve('tinymce.PluginManager');

    var global$2 = tinymce.util.Tools.resolve('tinymce.util.VK');

    var typeOf = function (x) {
      if (x === null) {
        return 'null';
      }
      var t = typeof x;
      if (t === 'object' && (Array.prototype.isPrototypeOf(x) || x.constructor && x.constructor.name === 'Array')) {
        return 'array';
      }
      if (t === 'object' && (String.prototype.isPrototypeOf(x) || x.constructor && x.constructor.name === 'String')) {
        return 'string';
      }
      return t;
    };
    var isType = function (type) {
      return function (value) {
        return typeOf(value) === type;
      };
    };
    var isString = isType('string');
    var isArray = isType('array');
    var isBoolean = isType('boolean');
    var isFunction = isType('function');

    var assumeExternalTargets = function (editor) {
      var externalTargets = editor.getParam('link_assume_external_targets', false);
      if (isBoolean(externalTargets) && externalTargets) {
        return 1;
      } else if (isString(externalTargets) && (externalTargets === 'http' || externalTargets === 'https')) {
        return externalTargets;
      }
      return 0;
    };
    var hasContextToolbar = function (editor) {
      return editor.getParam('link_context_toolbar', false, 'boolean');
    };
    var getLinkList = function (editor) {
      return editor.getParam('link_list');
    };
    var getDefaultLinkTarget = function (editor) {
      return editor.getParam('default_link_target');
    };
    var getTargetList = function (editor) {
      return editor.getParam('target_list', true);
    };
    var getRelList = function (editor) {
      return editor.getParam('rel_list', [], 'array');
    };
    var getLinkClassList = function (editor) {
      return editor.getParam('link_class_list', [], 'array');
    };
    var shouldShowLinkTitle = function (editor) {
      return editor.getParam('link_title', true, 'boolean');
    };
    var allowUnsafeLinkTarget = function (editor) {
      return editor.getParam('allow_unsafe_link_target', false, 'boolean');
    };
    var useQuickLink = function (editor) {
      return editor.getParam('link_quicklink', false, 'boolean');
    };
    var Settings = {
      assumeExternalTargets: assumeExternalTargets,
      hasContextToolbar: hasContextToolbar,
      getLinkList: getLinkList,
      getDefaultLinkTarget: getDefaultLinkTarget,
      getTargetList: getTargetList,
      getRelList: getRelList,
      getLinkClassList: getLinkClassList,
      shouldShowLinkTitle: shouldShowLinkTitle,
      allowUnsafeLinkTarget: allowUnsafeLinkTarget,
      useQuickLink: useQuickLink
    };

    var global$3 = tinymce.util.Tools.resolve('tinymce.dom.DOMUtils');

    var global$4 = tinymce.util.Tools.resolve('tinymce.Env');

    var appendClickRemove = function (link, evt) {
      domGlobals.document.body.appendChild(link);
      link.dispatchEvent(evt);
      domGlobals.document.body.removeChild(link);
    };
    var open = function (url) {
      if (!global$4.ie || global$4.ie > 10) {
        var link = domGlobals.document.createElement('a');
        link.target = '_blank';
        link.href = url;
        link.rel = 'noreferrer noopener';
        var evt = domGlobals.document.createEvent('MouseEvents');
        evt.initMouseEvent('click', true, true, domGlobals.window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        appendClickRemove(link, evt);
      } else {
        var win = domGlobals.window.open('', '_blank');
        if (win) {
          win.opener = null;
          var doc = win.document;
          doc.open();
          doc.write('<meta http-equiv="refresh" content="0; url=' + global$3.DOM.encode(url) + '">');
          doc.close();
        }
      }
    };
    var OpenUrl = { open: open };

    var noop = function () {
    };
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
      if (Object.freeze) {
        Object.freeze(me);
      }
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

    var slice = Array.prototype.slice;
    var rawIndexOf = function () {
      var pIndexOf = Array.prototype.indexOf;
      var fastIndex = function (xs, x) {
        return pIndexOf.call(xs, x);
      };
      var slowIndex = function (xs, x) {
        return slowIndexOf(xs, x);
      };
      return pIndexOf === undefined ? slowIndex : fastIndex;
    }();
    var contains = function (xs, x) {
      return rawIndexOf(xs, x) > -1;
    };
    var map = function (xs, f) {
      var len = xs.length;
      var r = new Array(len);
      for (var i = 0; i < len; i++) {
        var x = xs[i];
        r[i] = f(x, i, xs);
      }
      return r;
    };
    var each = function (xs, f) {
      for (var i = 0, len = xs.length; i < len; i++) {
        var x = xs[i];
        f(x, i, xs);
      }
    };
    var foldl = function (xs, f, acc) {
      each(xs, function (x) {
        acc = f(acc, x);
      });
      return acc;
    };
    var slowIndexOf = function (xs, x) {
      for (var i = 0, len = xs.length; i < len; ++i) {
        if (xs[i] === x) {
          return i;
        }
      }
      return -1;
    };
    var push = Array.prototype.push;
    var flatten = function (xs) {
      var r = [];
      for (var i = 0, len = xs.length; i < len; ++i) {
        if (!isArray(xs[i])) {
          throw new Error('Arr.flatten item ' + i + ' was not an array, input: ' + xs);
        }
        push.apply(r, xs[i]);
      }
      return r;
    };
    var bind = function (xs, f) {
      var output = map(xs, f);
      return flatten(output);
    };
    var from$1 = isFunction(Array.from) ? Array.from : function (x) {
      return slice.call(x);
    };

    var global$5 = tinymce.util.Tools.resolve('tinymce.util.Tools');

    var hasProtocol = function (url) {
      return /^\w+:/i.test(url);
    };
    var getHref = function (elm) {
      var href = elm.getAttribute('data-mce-href');
      return href ? href : elm.getAttribute('href');
    };
    var applyRelTargetRules = function (rel, isUnsafe) {
      var rules = ['noopener'];
      var rels = rel ? rel.split(/\s+/) : [];
      var toString = function (rels) {
        return global$5.trim(rels.sort().join(' '));
      };
      var addTargetRules = function (rels) {
        rels = removeTargetRules(rels);
        return rels.length > 0 ? rels.concat(rules) : rules;
      };
      var removeTargetRules = function (rels) {
        return rels.filter(function (val) {
          return global$5.inArray(rules, val) === -1;
        });
      };
      var newRels = isUnsafe ? addTargetRules(rels) : removeTargetRules(rels);
      return newRels.length > 0 ? toString(newRels) : '';
    };
    var trimCaretContainers = function (text) {
      return text.replace(/\uFEFF/g, '');
    };
    var getAnchorElement = function (editor, selectedElm) {
      selectedElm = selectedElm || editor.selection.getNode();
      if (isImageFigure(selectedElm)) {
        return editor.dom.select('a[href]', selectedElm)[0];
      } else {
        return editor.dom.getParent(selectedElm, 'a[href]');
      }
    };
    var getAnchorText = function (selection, anchorElm) {
      var text = anchorElm ? anchorElm.innerText || anchorElm.textContent : selection.getContent({ format: 'text' });
      return trimCaretContainers(text);
    };
    var isLink = function (elm) {
      return elm && elm.nodeName === 'A' && !!elm.href;
    };
    var hasLinks = function (elements) {
      return global$5.grep(elements, isLink).length > 0;
    };
    var isOnlyTextSelected = function (html) {
      if (/</.test(html) && (!/^<a [^>]+>[^<]+<\/a>$/.test(html) || html.indexOf('href=') === -1)) {
        return false;
      }
      return true;
    };
    var isImageFigure = function (elm) {
      return elm && elm.nodeName === 'FIGURE' && /\bimage\b/i.test(elm.className);
    };
    var getLinkAttrs = function (data) {
      return foldl([
        'title',
        'rel',
        'class',
        'target'
      ], function (acc, key) {
        data[key].each(function (value) {
          acc[key] = value.length > 0 ? value : null;
        });
        return acc;
      }, { href: data.href });
    };
    var handleExternalTargets = function (href, assumeExternalTargets) {
      if ((assumeExternalTargets === 'http' || assumeExternalTargets === 'https') && !hasProtocol(href)) {
        return assumeExternalTargets + '://' + href;
      }
      return href;
    };
    var updateLink = function (editor, anchorElm, text, linkAttrs) {
      text.each(function (text) {
        if (anchorElm.hasOwnProperty('innerText')) {
          anchorElm.innerText = text;
        } else {
          anchorElm.textContent = text;
        }
      });
      editor.dom.setAttribs(anchorElm, linkAttrs);
      editor.selection.select(anchorElm);
    };
    var createLink = function (editor, selectedElm, text, linkAttrs) {
      if (isImageFigure(selectedElm)) {
        linkImageFigure(editor, selectedElm, linkAttrs);
      } else {
        text.fold(function () {
          editor.execCommand('mceInsertLink', false, linkAttrs);
        }, function (text) {
          editor.insertContent(editor.dom.createHTML('a', linkAttrs, editor.dom.encode(text)));
        });
      }
    };
    var link = function (editor, attachState, data) {
      editor.undoManager.transact(function () {
        var selectedElm = editor.selection.getNode();
        var anchorElm = getAnchorElement(editor, selectedElm);
        var linkAttrs = getLinkAttrs(data);
        if (!(Settings.getRelList(editor).length > 0) && Settings.allowUnsafeLinkTarget(editor) === false) {
          var newRel = applyRelTargetRules(linkAttrs.rel, linkAttrs.target === '_blank');
          linkAttrs.rel = newRel ? newRel : null;
        }
        if (Option.from(linkAttrs.target).isNone()) {
          linkAttrs.target = Settings.getDefaultLinkTarget(editor);
        }
        linkAttrs.href = handleExternalTargets(linkAttrs.href, Settings.assumeExternalTargets(editor));
        if (data.href === attachState.href) {
          attachState.attach();
        }
        if (anchorElm) {
          editor.focus();
          updateLink(editor, anchorElm, data.text, linkAttrs);
        } else {
          createLink(editor, selectedElm, data.text, linkAttrs);
        }
      });
    };
    var unlink = function (editor) {
      editor.undoManager.transact(function () {
        var node = editor.selection.getNode();
        if (isImageFigure(node)) {
          unlinkImageFigure(editor, node);
        } else {
          var anchorElm = editor.dom.getParent(node, 'a[href]', editor.getBody());
          if (anchorElm) {
            editor.dom.remove(anchorElm, true);
          }
        }
        editor.focus();
      });
    };
    var unlinkImageFigure = function (editor, fig) {
      var img = editor.dom.select('img', fig)[0];
      if (img) {
        var a = editor.dom.getParents(img, 'a[href]', fig)[0];
        if (a) {
          a.parentNode.insertBefore(img, a);
          editor.dom.remove(a);
        }
      }
    };
    var linkImageFigure = function (editor, fig, attrs) {
      var img = editor.dom.select('img', fig)[0];
      if (img) {
        var a = editor.dom.create('a', attrs);
        img.parentNode.insertBefore(a, img);
        a.appendChild(img);
      }
    };
    var Utils = {
      link: link,
      unlink: unlink,
      isLink: isLink,
      hasLinks: hasLinks,
      getHref: getHref,
      isOnlyTextSelected: isOnlyTextSelected,
      getAnchorElement: getAnchorElement,
      getAnchorText: getAnchorText,
      applyRelTargetRules: applyRelTargetRules,
      hasProtocol: hasProtocol
    };

    var cat = function (arr) {
      var r = [];
      var push = function (x) {
        r.push(x);
      };
      for (var i = 0; i < arr.length; i++) {
        arr[i].each(push);
      }
      return r;
    };
    var findMap = function (arr, f) {
      for (var i = 0; i < arr.length; i++) {
        var r = f(arr[i], i);
        if (r.isSome()) {
          return r;
        }
      }
      return Option.none();
    };

    var getValue = function (item) {
      return isString(item.value) ? item.value : '';
    };
    var sanitizeList = function (list, extractValue) {
      var out = [];
      global$5.each(list, function (item) {
        var text = isString(item.text) ? item.text : isString(item.title) ? item.title : '';
        if (item.menu !== undefined) ; else {
          var value = extractValue(item);
          out.push({
            text: text,
            value: value
          });
        }
      });
      return out;
    };
    var sanitizeWith = function (extracter) {
      if (extracter === void 0) {
        extracter = getValue;
      }
      return function (list) {
        return Option.from(list).map(function (list) {
          return sanitizeList(list, extracter);
        });
      };
    };
    var sanitize = function (list) {
      return sanitizeWith(getValue)(list);
    };
    var createUi = function (name, label) {
      return function (items) {
        return {
          name: name,
          type: 'selectbox',
          label: label,
          items: items
        };
      };
    };
    var ListOptions = {
      sanitize: sanitize,
      sanitizeWith: sanitizeWith,
      createUi: createUi,
      getValue: getValue
    };

    var Cell = function (initial) {
      var value = initial;
      var get = function () {
        return value;
      };
      var set = function (v) {
        value = v;
      };
      var clone = function () {
        return Cell(get());
      };
      return {
        get: get,
        set: set,
        clone: clone
      };
    };

    var findTextByValue = function (value, catalog) {
      return findMap(catalog, function (item) {
        return Option.some(item).filter(function (i) {
          return i.value === value;
        });
      });
    };
    var getDelta = function (persistentText, fieldName, catalog, data) {
      var value = data[fieldName];
      var hasPersistentText = persistentText.length > 0;
      return value !== undefined ? findTextByValue(value, catalog).map(function (i) {
        return {
          url: {
            value: i.value,
            meta: {
              text: hasPersistentText ? persistentText : i.text,
              attach: noop
            }
          },
          text: hasPersistentText ? persistentText : i.text
        };
      }) : Option.none();
    };
    var findCatalog = function (settings, fieldName) {
      if (fieldName === 'link') {
        return settings.catalogs.link;
      } else if (fieldName === 'anchor') {
        return settings.catalogs.anchor;
      } else {
        return Option.none();
      }
    };
    var init = function (initialData, linkSettings) {
      var persistentText = Cell(initialData.text);
      var onUrlChange = function (data) {
        if (persistentText.get().length <= 0) {
          var urlText = data.url.meta.text !== undefined ? data.url.meta.text : data.url.value;
          return Option.some({ text: urlText });
        } else {
          return Option.none();
        }
      };
      var onCatalogChange = function (data, change) {
        var catalog = findCatalog(linkSettings, change.name).getOr([]);
        return getDelta(persistentText.get(), change.name, catalog, data);
      };
      var onChange = function (getData, change) {
        if (change.name === 'url') {
          return onUrlChange(getData());
        } else if (contains([
            'anchor',
            'link'
          ], change.name)) {
          return onCatalogChange(getData(), change);
        } else if (change.name === 'text') {
          persistentText.set(getData().text);
          return Option.none();
        } else {
          return Option.none();
        }
      };
      return { onChange: onChange };
    };
    var DialogChanges = {
      init: init,
      getDelta: getDelta
    };

    var __assign = function () {
      __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };

    var exports$1 = {}, module = { exports: exports$1 };
    (function (define, exports, module, require) {
      (function (f) {
        if (typeof exports === 'object' && typeof module !== 'undefined') {
          module.exports = f();
        } else if (typeof define === 'function' && define.amd) {
          define([], f);
        } else {
          var g;
          if (typeof window !== 'undefined') {
            g = window;
          } else if (typeof global !== 'undefined') {
            g = global;
          } else if (typeof self !== 'undefined') {
            g = self;
          } else {
            g = this;
          }
          g.EphoxContactWrapper = f();
        }
      }(function () {
        return function () {
          function r(e, n, t) {
            function o(i, f) {
              if (!n[i]) {
                if (!e[i]) {
                  var c = 'function' == typeof require && require;
                  if (!f && c)
                    return c(i, !0);
                  if (u)
                    return u(i, !0);
                  var a = new Error('Cannot find module \'' + i + '\'');
                  throw a.code = 'MODULE_NOT_FOUND', a;
                }
                var p = n[i] = { exports: {} };
                e[i][0].call(p.exports, function (r) {
                  var n = e[i][1][r];
                  return o(n || r);
                }, p, p.exports, r, e, n, t);
              }
              return n[i].exports;
            }
            for (var u = 'function' == typeof require && require, i = 0; i < t.length; i++)
              o(t[i]);
            return o;
          }
          return r;
        }()({
          1: [
            function (require, module, exports) {
              var process = module.exports = {};
              var cachedSetTimeout;
              var cachedClearTimeout;
              function defaultSetTimout() {
                throw new Error('setTimeout has not been defined');
              }
              function defaultClearTimeout() {
                throw new Error('clearTimeout has not been defined');
              }
              (function () {
                try {
                  if (typeof setTimeout === 'function') {
                    cachedSetTimeout = setTimeout;
                  } else {
                    cachedSetTimeout = defaultSetTimout;
                  }
                } catch (e) {
                  cachedSetTimeout = defaultSetTimout;
                }
                try {
                  if (typeof clearTimeout === 'function') {
                    cachedClearTimeout = clearTimeout;
                  } else {
                    cachedClearTimeout = defaultClearTimeout;
                  }
                } catch (e) {
                  cachedClearTimeout = defaultClearTimeout;
                }
              }());
              function runTimeout(fun) {
                if (cachedSetTimeout === setTimeout) {
                  return setTimeout(fun, 0);
                }
                if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
                  cachedSetTimeout = setTimeout;
                  return setTimeout(fun, 0);
                }
                try {
                  return cachedSetTimeout(fun, 0);
                } catch (e) {
                  try {
                    return cachedSetTimeout.call(null, fun, 0);
                  } catch (e) {
                    return cachedSetTimeout.call(this, fun, 0);
                  }
                }
              }
              function runClearTimeout(marker) {
                if (cachedClearTimeout === clearTimeout) {
                  return clearTimeout(marker);
                }
                if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
                  cachedClearTimeout = clearTimeout;
                  return clearTimeout(marker);
                }
                try {
                  return cachedClearTimeout(marker);
                } catch (e) {
                  try {
                    return cachedClearTimeout.call(null, marker);
                  } catch (e) {
                    return cachedClearTimeout.call(this, marker);
                  }
                }
              }
              var queue = [];
              var draining = false;
              var currentQueue;
              var queueIndex = -1;
              function cleanUpNextTick() {
                if (!draining || !currentQueue) {
                  return;
                }
                draining = false;
                if (currentQueue.length) {
                  queue = currentQueue.concat(queue);
                } else {
                  queueIndex = -1;
                }
                if (queue.length) {
                  drainQueue();
                }
              }
              function drainQueue() {
                if (draining) {
                  return;
                }
                var timeout = runTimeout(cleanUpNextTick);
                draining = true;
                var len = queue.length;
                while (len) {
                  currentQueue = queue;
                  queue = [];
                  while (++queueIndex < len) {
                    if (currentQueue) {
                      currentQueue[queueIndex].run();
                    }
                  }
                  queueIndex = -1;
                  len = queue.length;
                }
                currentQueue = null;
                draining = false;
                runClearTimeout(timeout);
              }
              process.nextTick = function (fun) {
                var args = new Array(arguments.length - 1);
                if (arguments.length > 1) {
                  for (var i = 1; i < arguments.length; i++) {
                    args[i - 1] = arguments[i];
                  }
                }
                queue.push(new Item(fun, args));
                if (queue.length === 1 && !draining) {
                  runTimeout(drainQueue);
                }
              };
              function Item(fun, array) {
                this.fun = fun;
                this.array = array;
              }
              Item.prototype.run = function () {
                this.fun.apply(null, this.array);
              };
              process.title = 'browser';
              process.browser = true;
              process.env = {};
              process.argv = [];
              process.version = '';
              process.versions = {};
              function noop() {
              }
              process.on = noop;
              process.addListener = noop;
              process.once = noop;
              process.off = noop;
              process.removeListener = noop;
              process.removeAllListeners = noop;
              process.emit = noop;
              process.prependListener = noop;
              process.prependOnceListener = noop;
              process.listeners = function (name) {
                return [];
              };
              process.binding = function (name) {
                throw new Error('process.binding is not supported');
              };
              process.cwd = function () {
                return '/';
              };
              process.chdir = function (dir) {
                throw new Error('process.chdir is not supported');
              };
              process.umask = function () {
                return 0;
              };
            },
            {}
          ],
          2: [
            function (require, module, exports) {
              (function (setImmediate) {
                (function (root) {
                  var setTimeoutFunc = setTimeout;
                  function noop() {
                  }
                  function bind(fn, thisArg) {
                    return function () {
                      fn.apply(thisArg, arguments);
                    };
                  }
                  function Promise(fn) {
                    if (typeof this !== 'object')
                      throw new TypeError('Promises must be constructed via new');
                    if (typeof fn !== 'function')
                      throw new TypeError('not a function');
                    this._state = 0;
                    this._handled = false;
                    this._value = undefined;
                    this._deferreds = [];
                    doResolve(fn, this);
                  }
                  function handle(self, deferred) {
                    while (self._state === 3) {
                      self = self._value;
                    }
                    if (self._state === 0) {
                      self._deferreds.push(deferred);
                      return;
                    }
                    self._handled = true;
                    Promise._immediateFn(function () {
                      var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
                      if (cb === null) {
                        (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
                        return;
                      }
                      var ret;
                      try {
                        ret = cb(self._value);
                      } catch (e) {
                        reject(deferred.promise, e);
                        return;
                      }
                      resolve(deferred.promise, ret);
                    });
                  }
                  function resolve(self, newValue) {
                    try {
                      if (newValue === self)
                        throw new TypeError('A promise cannot be resolved with itself.');
                      if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
                        var then = newValue.then;
                        if (newValue instanceof Promise) {
                          self._state = 3;
                          self._value = newValue;
                          finale(self);
                          return;
                        } else if (typeof then === 'function') {
                          doResolve(bind(then, newValue), self);
                          return;
                        }
                      }
                      self._state = 1;
                      self._value = newValue;
                      finale(self);
                    } catch (e) {
                      reject(self, e);
                    }
                  }
                  function reject(self, newValue) {
                    self._state = 2;
                    self._value = newValue;
                    finale(self);
                  }
                  function finale(self) {
                    if (self._state === 2 && self._deferreds.length === 0) {
                      Promise._immediateFn(function () {
                        if (!self._handled) {
                          Promise._unhandledRejectionFn(self._value);
                        }
                      });
                    }
                    for (var i = 0, len = self._deferreds.length; i < len; i++) {
                      handle(self, self._deferreds[i]);
                    }
                    self._deferreds = null;
                  }
                  function Handler(onFulfilled, onRejected, promise) {
                    this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
                    this.onRejected = typeof onRejected === 'function' ? onRejected : null;
                    this.promise = promise;
                  }
                  function doResolve(fn, self) {
                    var done = false;
                    try {
                      fn(function (value) {
                        if (done)
                          return;
                        done = true;
                        resolve(self, value);
                      }, function (reason) {
                        if (done)
                          return;
                        done = true;
                        reject(self, reason);
                      });
                    } catch (ex) {
                      if (done)
                        return;
                      done = true;
                      reject(self, ex);
                    }
                  }
                  Promise.prototype['catch'] = function (onRejected) {
                    return this.then(null, onRejected);
                  };
                  Promise.prototype.then = function (onFulfilled, onRejected) {
                    var prom = new this.constructor(noop);
                    handle(this, new Handler(onFulfilled, onRejected, prom));
                    return prom;
                  };
                  Promise.all = function (arr) {
                    var args = Array.prototype.slice.call(arr);
                    return new Promise(function (resolve, reject) {
                      if (args.length === 0)
                        return resolve([]);
                      var remaining = args.length;
                      function res(i, val) {
                        try {
                          if (val && (typeof val === 'object' || typeof val === 'function')) {
                            var then = val.then;
                            if (typeof then === 'function') {
                              then.call(val, function (val) {
                                res(i, val);
                              }, reject);
                              return;
                            }
                          }
                          args[i] = val;
                          if (--remaining === 0) {
                            resolve(args);
                          }
                        } catch (ex) {
                          reject(ex);
                        }
                      }
                      for (var i = 0; i < args.length; i++) {
                        res(i, args[i]);
                      }
                    });
                  };
                  Promise.resolve = function (value) {
                    if (value && typeof value === 'object' && value.constructor === Promise) {
                      return value;
                    }
                    return new Promise(function (resolve) {
                      resolve(value);
                    });
                  };
                  Promise.reject = function (value) {
                    return new Promise(function (resolve, reject) {
                      reject(value);
                    });
                  };
                  Promise.race = function (values) {
                    return new Promise(function (resolve, reject) {
                      for (var i = 0, len = values.length; i < len; i++) {
                        values[i].then(resolve, reject);
                      }
                    });
                  };
                  Promise._immediateFn = typeof setImmediate === 'function' ? function (fn) {
                    setImmediate(fn);
                  } : function (fn) {
                    setTimeoutFunc(fn, 0);
                  };
                  Promise._unhandledRejectionFn = function _unhandledRejectionFn(err) {
                    if (typeof console !== 'undefined' && console) {
                      console.warn('Possible Unhandled Promise Rejection:', err);
                    }
                  };
                  Promise._setImmediateFn = function _setImmediateFn(fn) {
                    Promise._immediateFn = fn;
                  };
                  Promise._setUnhandledRejectionFn = function _setUnhandledRejectionFn(fn) {
                    Promise._unhandledRejectionFn = fn;
                  };
                  if (typeof module !== 'undefined' && module.exports) {
                    module.exports = Promise;
                  } else if (!root.Promise) {
                    root.Promise = Promise;
                  }
                }(this));
              }.call(this, require('timers').setImmediate));
            },
            { 'timers': 3 }
          ],
          3: [
            function (require, module, exports) {
              (function (setImmediate, clearImmediate) {
                var nextTick = require('process/browser.js').nextTick;
                var apply = Function.prototype.apply;
                var slice = Array.prototype.slice;
                var immediateIds = {};
                var nextImmediateId = 0;
                exports.setTimeout = function () {
                  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
                };
                exports.setInterval = function () {
                  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
                };
                exports.clearTimeout = exports.clearInterval = function (timeout) {
                  timeout.close();
                };
                function Timeout(id, clearFn) {
                  this._id = id;
                  this._clearFn = clearFn;
                }
                Timeout.prototype.unref = Timeout.prototype.ref = function () {
                };
                Timeout.prototype.close = function () {
                  this._clearFn.call(window, this._id);
                };
                exports.enroll = function (item, msecs) {
                  clearTimeout(item._idleTimeoutId);
                  item._idleTimeout = msecs;
                };
                exports.unenroll = function (item) {
                  clearTimeout(item._idleTimeoutId);
                  item._idleTimeout = -1;
                };
                exports._unrefActive = exports.active = function (item) {
                  clearTimeout(item._idleTimeoutId);
                  var msecs = item._idleTimeout;
                  if (msecs >= 0) {
                    item._idleTimeoutId = setTimeout(function onTimeout() {
                      if (item._onTimeout)
                        item._onTimeout();
                    }, msecs);
                  }
                };
                exports.setImmediate = typeof setImmediate === 'function' ? setImmediate : function (fn) {
                  var id = nextImmediateId++;
                  var args = arguments.length < 2 ? false : slice.call(arguments, 1);
                  immediateIds[id] = true;
                  nextTick(function onNextTick() {
                    if (immediateIds[id]) {
                      if (args) {
                        fn.apply(null, args);
                      } else {
                        fn.call(null);
                      }
                      exports.clearImmediate(id);
                    }
                  });
                  return id;
                };
                exports.clearImmediate = typeof clearImmediate === 'function' ? clearImmediate : function (id) {
                  delete immediateIds[id];
                };
              }.call(this, require('timers').setImmediate, require('timers').clearImmediate));
            },
            {
              'process/browser.js': 1,
              'timers': 3
            }
          ],
          4: [
            function (require, module, exports) {
              var promisePolyfill = require('promise-polyfill');
              var Global = function () {
                if (typeof window !== 'undefined') {
                  return window;
                } else {
                  return Function('return this;')();
                }
              }();
              module.exports = { boltExport: Global.Promise || promisePolyfill };
            },
            { 'promise-polyfill': 2 }
          ]
        }, {}, [4])(4);
      }));
    }(undefined, exports$1, module, undefined));
    var Promise = module.exports.boltExport;

    var nu = function (baseFn) {
      var data = Option.none();
      var callbacks = [];
      var map = function (f) {
        return nu(function (nCallback) {
          get(function (data) {
            nCallback(f(data));
          });
        });
      };
      var get = function (nCallback) {
        if (isReady()) {
          call(nCallback);
        } else {
          callbacks.push(nCallback);
        }
      };
      var set = function (x) {
        data = Option.some(x);
        run(callbacks);
        callbacks = [];
      };
      var isReady = function () {
        return data.isSome();
      };
      var run = function (cbs) {
        each(cbs, call);
      };
      var call = function (cb) {
        data.each(function (x) {
          domGlobals.setTimeout(function () {
            cb(x);
          }, 0);
        });
      };
      baseFn(set);
      return {
        get: get,
        map: map,
        isReady: isReady
      };
    };
    var pure = function (a) {
      return nu(function (callback) {
        callback(a);
      });
    };
    var LazyValue = {
      nu: nu,
      pure: pure
    };

    var errorReporter = function (err) {
      domGlobals.setTimeout(function () {
        throw err;
      }, 0);
    };
    var make = function (run) {
      var get = function (callback) {
        run().then(callback, errorReporter);
      };
      var map = function (fab) {
        return make(function () {
          return run().then(fab);
        });
      };
      var bind = function (aFutureB) {
        return make(function () {
          return run().then(function (v) {
            return aFutureB(v).toPromise();
          });
        });
      };
      var anonBind = function (futureB) {
        return make(function () {
          return run().then(function () {
            return futureB.toPromise();
          });
        });
      };
      var toLazy = function () {
        return LazyValue.nu(get);
      };
      var toCached = function () {
        var cache = null;
        return make(function () {
          if (cache === null) {
            cache = run();
          }
          return cache;
        });
      };
      var toPromise = run;
      return {
        map: map,
        bind: bind,
        anonBind: anonBind,
        toLazy: toLazy,
        toCached: toCached,
        toPromise: toPromise,
        get: get
      };
    };
    var nu$1 = function (baseFn) {
      return make(function () {
        return new Promise(baseFn);
      });
    };
    var pure$1 = function (a) {
      return make(function () {
        return Promise.resolve(a);
      });
    };
    var Future = {
      nu: nu$1,
      pure: pure$1
    };

    var global$6 = tinymce.util.Tools.resolve('tinymce.util.Delay');

    var delayedConfirm = function (editor, message, callback) {
      var rng = editor.selection.getRng();
      global$6.setEditorTimeout(editor, function () {
        editor.windowManager.confirm(message, function (state) {
          editor.selection.setRng(rng);
          callback(state);
        });
      });
    };
    var tryEmailTransform = function (data) {
      var url = data.href;
      var suggestMailTo = url.indexOf('@') > 0 && url.indexOf('//') === -1 && url.indexOf('mailto:') === -1;
      return suggestMailTo ? Option.some({
        message: 'The URL you entered seems to be an email address. Do you want to add the required mailto: prefix?',
        preprocess: function (oldData) {
          return __assign({}, oldData, { href: 'mailto:' + url });
        }
      }) : Option.none();
    };
    var tryProtocolTransform = function (assumeExternalTargets) {
      return function (data) {
        var url = data.href;
        var suggestProtocol = assumeExternalTargets === 1 && !Utils.hasProtocol(url) || assumeExternalTargets === 0 && /^\s*www[\.|\d\.]/i.test(url);
        return suggestProtocol ? Option.some({
          message: 'The URL you entered seems to be an external link. Do you want to add the required http:// prefix?',
          preprocess: function (oldData) {
            return __assign({}, oldData, { href: 'http://' + url });
          }
        }) : Option.none();
      };
    };
    var preprocess = function (editor, assumeExternalTargets, data) {
      return findMap([
        tryEmailTransform,
        tryProtocolTransform(assumeExternalTargets)
      ], function (f) {
        return f(data);
      }).fold(function () {
        return Future.pure(data);
      }, function (transform) {
        return Future.nu(function (callback) {
          delayedConfirm(editor, transform.message, function (state) {
            callback(state ? transform.preprocess(data) : data);
          });
        });
      });
    };
    var DialogConfirms = { preprocess: preprocess };

    var getAnchors = function (editor) {
      var anchorNodes = editor.dom.select('a:not([href])');
      var anchors = bind(anchorNodes, function (anchor) {
        var id = anchor.name || anchor.id;
        return id ? [{
            text: id,
            value: '#' + id
          }] : [];
      });
      return anchors.length > 0 ? Option.some([{
          text: 'None',
          value: ''
        }].concat(anchors)) : Option.none();
    };
    var AnchorListOptions = { getAnchors: getAnchors };

    var getClasses = function (editor) {
      var list = Settings.getLinkClassList(editor);
      if (list.length > 0) {
        return ListOptions.sanitize(list);
      }
      return Option.none();
    };
    var ClassListOptions = { getClasses: getClasses };

    var global$7 = tinymce.util.Tools.resolve('tinymce.util.XHR');

    var parseJson = function (text) {
      try {
        return Option.some(JSON.parse(text));
      } catch (err) {
        return Option.none();
      }
    };
    var getLinks = function (editor) {
      var extractor = function (item) {
        return editor.convertURL(item.value || item.url, 'href');
      };
      var linkList = Settings.getLinkList(editor);
      return Future.nu(function (callback) {
        if (isString(linkList)) {
          global$7.send({
            url: linkList,
            success: function (text) {
              return callback(parseJson(text));
            },
            error: function (_) {
              return callback(Option.none());
            }
          });
        } else if (isFunction(linkList)) {
          linkList(function (output) {
            return callback(Option.some(output));
          });
        } else {
          callback(Option.from(linkList));
        }
      }).map(function (optItems) {
        return optItems.bind(ListOptions.sanitizeWith(extractor)).map(function (items) {
          if (items.length > 0) {
            return [{
                text: 'None',
                value: ''
              }].concat(items);
          } else {
            return items;
          }
        });
      });
    };
    var LinkListOptions = { getLinks: getLinks };

    var getRels = function (editor, initialTarget) {
      var list = Settings.getRelList(editor);
      if (list.length > 0) {
        var isTargetBlank_1 = initialTarget.is('_blank');
        var enforceSafe = Settings.allowUnsafeLinkTarget(editor) === false;
        var safeRelExtractor = function (item) {
          return Utils.applyRelTargetRules(ListOptions.getValue(item), isTargetBlank_1);
        };
        var sanitizer = enforceSafe ? ListOptions.sanitizeWith(safeRelExtractor) : ListOptions.sanitize;
        return sanitizer(list);
      }
      return Option.none();
    };
    var RelOptions = { getRels: getRels };

    var fallbacks = [
      {
        text: 'Current window',
        value: ''
      },
      {
        text: 'New window',
        value: '_blank'
      }
    ];
    var getTargets = function (editor) {
      var list = Settings.getTargetList(editor);
      if (isArray(list)) {
        return ListOptions.sanitize(list).orThunk(function () {
          return Option.some(fallbacks);
        });
      } else if (list === false) {
        return Option.none();
      }
      return Option.some(fallbacks);
    };
    var TargetOptions = { getTargets: getTargets };

    var nonEmptyAttr = function (dom, elem, name) {
      var val = dom.getAttrib(elem, name);
      return val !== null && val.length > 0 ? Option.some(val) : Option.none();
    };
    var extractFromAnchor = function (editor, anchor) {
      var dom = editor.dom;
      var onlyText = Utils.isOnlyTextSelected(editor.selection.getContent());
      var text = onlyText ? Option.some(Utils.getAnchorText(editor.selection, anchor)) : Option.none();
      var url = anchor ? Option.some(dom.getAttrib(anchor, 'href')) : Option.none();
      var target = anchor ? Option.from(dom.getAttrib(anchor, 'target')) : Option.none();
      var rel = nonEmptyAttr(dom, anchor, 'rel');
      var linkClass = nonEmptyAttr(dom, anchor, 'class');
      var title = nonEmptyAttr(dom, anchor, 'title');
      return {
        url: url,
        text: text,
        title: title,
        target: target,
        rel: rel,
        linkClass: linkClass
      };
    };
    var collect = function (editor, linkNode) {
      return LinkListOptions.getLinks(editor).map(function (links) {
        var anchor = extractFromAnchor(editor, linkNode);
        return {
          anchor: anchor,
          catalogs: {
            targets: TargetOptions.getTargets(editor),
            rels: RelOptions.getRels(editor, anchor.target),
            classes: ClassListOptions.getClasses(editor),
            anchor: AnchorListOptions.getAnchors(editor),
            link: links
          },
          optNode: Option.from(linkNode),
          flags: { titleEnabled: Settings.shouldShowLinkTitle(editor) }
        };
      });
    };
    var DialogInfo = { collect: collect };

    var handleSubmit = function (editor, info, assumeExternalTargets) {
      return function (api) {
        var data = api.getData();
        if (!data.url.value) {
          Utils.unlink(editor);
          api.close();
          return;
        }
        var getChangedValue = function (key) {
          return Option.from(data[key]).filter(function (value) {
            return !info.anchor[key].is(value);
          });
        };
        var changedData = {
          href: data.url.value,
          text: getChangedValue('text'),
          target: getChangedValue('target'),
          rel: getChangedValue('rel'),
          class: getChangedValue('linkClass'),
          title: getChangedValue('title')
        };
        var attachState = {
          href: data.url.value,
          attach: data.url.meta !== undefined && data.url.meta.attach ? data.url.meta.attach : function () {
          }
        };
        DialogConfirms.preprocess(editor, assumeExternalTargets, changedData).get(function (pData) {
          Utils.link(editor, attachState, pData);
        });
        api.close();
      };
    };
    var collectData = function (editor) {
      var anchorNode = Utils.getAnchorElement(editor);
      return DialogInfo.collect(editor, anchorNode);
    };
    var getInitialData = function (info, defaultTarget) {
      return {
        url: {
          value: info.anchor.url.getOr(''),
          meta: {
            attach: function () {
            },
            text: info.anchor.url.fold(function () {
              return '';
            }, function () {
              return info.anchor.text.getOr('');
            }),
            original: { value: info.anchor.url.getOr('') }
          }
        },
        text: info.anchor.text.getOr(''),
        title: info.anchor.title.getOr(''),
        anchor: info.anchor.url.getOr(''),
        link: info.anchor.url.getOr(''),
        rel: info.anchor.rel.getOr(''),
        target: info.anchor.target.or(defaultTarget).getOr(''),
        linkClass: info.anchor.linkClass.getOr('')
      };
    };
    var makeDialog = function (settings, onSubmit, editor) {
      var urlInput = [{
          name: 'url',
          type: 'urlinput',
          filetype: 'file',
          label: 'URL'
        }];
      var displayText = settings.anchor.text.map(function () {
        return {
          name: 'text',
          type: 'input',
          label: 'Text to display'
        };
      }).toArray();
      var titleText = settings.flags.titleEnabled ? [{
          name: 'title',
          type: 'input',
          label: 'Title'
        }] : [];
      var defaultTarget = Option.from(Settings.getDefaultLinkTarget(editor));
      var initialData = getInitialData(settings, defaultTarget);
      var dialogDelta = DialogChanges.init(initialData, settings);
      var catalogs = settings.catalogs;
      var body = {
        type: 'panel',
        items: flatten([
          urlInput,
          displayText,
          titleText,
          cat([
            catalogs.anchor.map(ListOptions.createUi('anchor', 'Anchors')),
            catalogs.rels.map(ListOptions.createUi('rel', 'Rel')),
            catalogs.targets.map(ListOptions.createUi('target', 'Open link in...')),
            catalogs.link.map(ListOptions.createUi('link', 'Link list')),
            catalogs.classes.map(ListOptions.createUi('linkClass', 'Class'))
          ])
        ])
      };
      return {
        title: 'Insert/Edit Link',
        size: 'normal',
        body: body,
        buttons: [
          {
            type: 'cancel',
            name: 'cancel',
            text: 'Cancel'
          },
          {
            type: 'submit',
            name: 'save',
            text: 'Save',
            primary: true
          }
        ],
        initialData: initialData,
        onChange: function (api, _a) {
          var name = _a.name;
          dialogDelta.onChange(api.getData, { name: name }).each(function (newData) {
            api.setData(newData);
          });
        },
        onSubmit: onSubmit
      };
    };
    var open$1 = function (editor) {
      var data = collectData(editor);
      data.map(function (info) {
        var onSubmit = handleSubmit(editor, info, Settings.assumeExternalTargets(editor));
        return makeDialog(info, onSubmit, editor);
      }).get(function (spec) {
        editor.windowManager.open(spec);
      });
    };
    var Dialog = { open: open$1 };

    var getLink = function (editor, elm) {
      return editor.dom.getParent(elm, 'a[href]');
    };
    var getSelectedLink = function (editor) {
      return getLink(editor, editor.selection.getStart());
    };
    var hasOnlyAltModifier = function (e) {
      return e.altKey === true && e.shiftKey === false && e.ctrlKey === false && e.metaKey === false;
    };
    var gotoLink = function (editor, a) {
      if (a) {
        var href = Utils.getHref(a);
        if (/^#/.test(href)) {
          var targetEl = editor.$(href);
          if (targetEl.length) {
            editor.selection.scrollIntoView(targetEl[0], true);
          }
        } else {
          OpenUrl.open(a.href);
        }
      }
    };
    var openDialog = function (editor) {
      return function () {
        Dialog.open(editor);
      };
    };
    var gotoSelectedLink = function (editor) {
      return function () {
        gotoLink(editor, getSelectedLink(editor));
      };
    };
    var leftClickedOnAHref = function (editor) {
      return function (elm) {
        var sel, rng, node;
        if (Settings.hasContextToolbar(editor) && Utils.isLink(elm)) {
          sel = editor.selection;
          rng = sel.getRng();
          node = rng.startContainer;
          if (node.nodeType === 3 && sel.isCollapsed() && rng.startOffset > 0 && rng.startOffset < node.data.length) {
            return true;
          }
        }
        return false;
      };
    };
    var setupGotoLinks = function (editor) {
      editor.on('click', function (e) {
        var link = getLink(editor, e.target);
        if (link && global$2.metaKeyPressed(e)) {
          e.preventDefault();
          gotoLink(editor, link);
        }
      });
      editor.on('keydown', function (e) {
        var link = getSelectedLink(editor);
        if (link && e.keyCode === 13 && hasOnlyAltModifier(e)) {
          e.preventDefault();
          gotoLink(editor, link);
        }
      });
    };
    var toggleActiveState = function (editor) {
      return function (api) {
        var nodeChangeHandler = function (e) {
          return api.setActive(!editor.readonly && !!Utils.getAnchorElement(editor, e.element));
        };
        editor.on('NodeChange', nodeChangeHandler);
        return function () {
          return editor.off('NodeChange', nodeChangeHandler);
        };
      };
    };
    var toggleEnabledState = function (editor) {
      return function (api) {
        api.setDisabled(!Utils.hasLinks(editor.dom.getParents(editor.selection.getStart())));
        var nodeChangeHandler = function (e) {
          return api.setDisabled(!Utils.hasLinks(e.parents));
        };
        editor.on('NodeChange', nodeChangeHandler);
        return function () {
          return editor.off('NodeChange', nodeChangeHandler);
        };
      };
    };
    var Actions = {
      openDialog: openDialog,
      gotoSelectedLink: gotoSelectedLink,
      leftClickedOnAHref: leftClickedOnAHref,
      setupGotoLinks: setupGotoLinks,
      toggleActiveState: toggleActiveState,
      toggleEnabledState: toggleEnabledState
    };

    var register = function (editor) {
      editor.addCommand('mceLink', function () {
        if (Settings.useQuickLink(editor)) {
          editor.fire('contexttoolbar-show', { toolbarKey: 'quicklink' });
        } else {
          Actions.openDialog(editor)();
        }
      });
    };
    var Commands = { register: register };

    var setup = function (editor) {
      editor.addShortcut('Meta+K', '', function () {
        editor.execCommand('mceLink');
      });
    };
    var Keyboard = { setup: setup };

    var setupButtons = function (editor) {
      editor.ui.registry.addToggleButton('link', {
        icon: 'link',
        tooltip: 'Insert/edit link',
        onAction: Actions.openDialog(editor),
        onSetup: Actions.toggleActiveState(editor)
      });
      editor.ui.registry.addButton('unlink', {
        icon: 'unlink',
        tooltip: 'Remove link',
        onAction: function () {
          return Utils.unlink(editor);
        },
        onSetup: Actions.toggleEnabledState(editor)
      });
    };
    var setupMenuItems = function (editor) {
      editor.ui.registry.addMenuItem('openlink', {
        text: 'Open link',
        icon: 'new-tab',
        onAction: Actions.gotoSelectedLink(editor),
        onSetup: Actions.toggleEnabledState(editor)
      });
      editor.ui.registry.addMenuItem('link', {
        icon: 'link',
        text: 'Link...',
        shortcut: 'Meta+K',
        onAction: Actions.openDialog(editor)
      });
      editor.ui.registry.addMenuItem('unlink', {
        icon: 'unlink',
        text: 'Remove link',
        onAction: function () {
          return Utils.unlink(editor);
        },
        onSetup: Actions.toggleEnabledState(editor)
      });
    };
    var setupContextMenu = function (editor) {
      var noLink = 'link';
      var inLink = 'link unlink openlink';
      editor.ui.registry.addContextMenu('link', {
        update: function (element) {
          return Utils.hasLinks(editor.dom.getParents(element, 'a')) ? inLink : noLink;
        }
      });
    };
    var setupContextToolbars = function (editor) {
      var collapseSelectionToEnd = function (editor) {
        editor.selection.collapse(false);
      };
      var onSetupLink = function (buttonApi) {
        var node = editor.selection.getNode();
        buttonApi.setDisabled(!Utils.getAnchorElement(editor, node));
        return function () {
        };
      };
      editor.ui.registry.addContextForm('quicklink', {
        launch: {
          type: 'contextformtogglebutton',
          icon: 'link',
          tooltip: 'Link',
          onSetup: Actions.toggleActiveState(editor)
        },
        label: 'Link',
        predicate: function (node) {
          return !!Utils.getAnchorElement(editor, node) && Settings.hasContextToolbar(editor);
        },
        initValue: function () {
          var elm = Utils.getAnchorElement(editor);
          return !!elm ? Utils.getHref(elm) : '';
        },
        commands: [
          {
            type: 'contextformtogglebutton',
            icon: 'link',
            tooltip: 'Link',
            primary: true,
            onSetup: function (buttonApi) {
              var node = editor.selection.getNode();
              buttonApi.setActive(!!Utils.getAnchorElement(editor, node));
              return Actions.toggleActiveState(editor)(buttonApi);
            },
            onAction: function (formApi) {
              var anchor = Utils.getAnchorElement(editor);
              var value = formApi.getValue();
              if (!anchor) {
                var attachState = {
                  href: value,
                  attach: function () {
                  }
                };
                var onlyText = Utils.isOnlyTextSelected(editor.selection.getContent());
                var text = onlyText ? Option.some(Utils.getAnchorText(editor.selection, anchor)).filter(function (t) {
                  return t.length > 0;
                }).or(Option.from(value)) : Option.none();
                Utils.link(editor, attachState, {
                  href: value,
                  text: text,
                  title: Option.none(),
                  rel: Option.none(),
                  target: Option.none(),
                  class: Option.none()
                });
                formApi.hide();
              } else {
                editor.dom.setAttrib(anchor, 'href', value);
                collapseSelectionToEnd(editor);
                formApi.hide();
              }
            }
          },
          {
            type: 'contextformbutton',
            icon: 'unlink',
            tooltip: 'Remove link',
            onSetup: onSetupLink,
            onAction: function (formApi) {
              Utils.unlink(editor);
              formApi.hide();
            }
          },
          {
            type: 'contextformbutton',
            icon: 'new-tab',
            tooltip: 'Open link',
            onSetup: onSetupLink,
            onAction: function (formApi) {
              Actions.gotoSelectedLink(editor)();
              formApi.hide();
            }
          }
        ]
      });
    };
    var Controls = {
      setupButtons: setupButtons,
      setupMenuItems: setupMenuItems,
      setupContextMenu: setupContextMenu,
      setupContextToolbars: setupContextToolbars
    };

    function Plugin () {
      global$1.add('link', function (editor) {
        Controls.setupButtons(editor);
        Controls.setupMenuItems(editor);
        Controls.setupContextMenu(editor);
        Controls.setupContextToolbars(editor);
        Actions.setupGotoLinks(editor);
        Commands.register(editor);
        Keyboard.setup(editor);
      });
    }

    Plugin();

}(window));
