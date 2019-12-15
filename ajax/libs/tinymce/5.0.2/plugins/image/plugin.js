/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 *
 * Version: 5.0.2 (2019-03-05)
 */
(function () {
var image = (function (domGlobals) {
    'use strict';

    var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

    var noop = function () {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
    };
    var constant = function (value) {
      return function () {
        return value;
      };
    };
    var identity = function (x) {
      return x;
    };
    var die = function (msg) {
      return function () {
        throw new Error(msg);
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
    var isFunction = isType('function');
    var isNumber = isType('number');

    var each = function (xs, f) {
      for (var i = 0, len = xs.length; i < len; i++) {
        var x = xs[i];
        f(x, i, xs);
      }
    };
    var find = function (xs, pred) {
      for (var i = 0, len = xs.length; i < len; i++) {
        var x = xs[i];
        if (pred(x, i, xs)) {
          return Option.some(x);
        }
      }
      return Option.none();
    };
    var push = Array.prototype.push;
    var flatten = function (xs) {
      var r = [];
      for (var i = 0, len = xs.length; i < len; ++i) {
        if (!Array.prototype.isPrototypeOf(xs[i]))
          throw new Error('Arr.flatten item ' + i + ' was not an array, input: ' + xs);
        push.apply(r, xs[i]);
      }
      return r;
    };
    var slice = Array.prototype.slice;
    var head = function (xs) {
      return xs.length === 0 ? Option.none() : Option.some(xs[0]);
    };
    var from$1 = isFunction(Array.from) ? Array.from : function (x) {
      return slice.call(x);
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
        if (isReady())
          call(nCallback);
        else
          callbacks.push(nCallback);
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
          setTimeout(function () {
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

    var bounce = function (f) {
      return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        var me = this;
        setTimeout(function () {
          f.apply(me, args);
        }, 0);
      };
    };

    var nu$1 = function (baseFn) {
      var get = function (callback) {
        baseFn(bounce(callback));
      };
      var map = function (fab) {
        return nu$1(function (callback) {
          get(function (a) {
            var value = fab(a);
            callback(value);
          });
        });
      };
      var bind = function (aFutureB) {
        return nu$1(function (callback) {
          get(function (a) {
            aFutureB(a).get(callback);
          });
        });
      };
      var anonBind = function (futureB) {
        return nu$1(function (callback) {
          get(function (a) {
            futureB.get(callback);
          });
        });
      };
      var toLazy = function () {
        return LazyValue.nu(get);
      };
      var toCached = function () {
        var cache = null;
        return nu$1(function (callback) {
          if (cache === null) {
            cache = toLazy();
          }
          cache.get(callback);
        });
      };
      return {
        map: map,
        bind: bind,
        anonBind: anonBind,
        toLazy: toLazy,
        toCached: toCached,
        get: get
      };
    };
    var pure$1 = function (a) {
      return nu$1(function (callback) {
        callback(a);
      });
    };
    var Future = {
      nu: nu$1,
      pure: pure$1
    };

    var value = function (o) {
      var is = function (v) {
        return o === v;
      };
      var or = function (opt) {
        return value(o);
      };
      var orThunk = function (f) {
        return value(o);
      };
      var map = function (f) {
        return value(f(o));
      };
      var mapError = function (f) {
        return value(o);
      };
      var each = function (f) {
        f(o);
      };
      var bind = function (f) {
        return f(o);
      };
      var fold = function (_, onValue) {
        return onValue(o);
      };
      var exists = function (f) {
        return f(o);
      };
      var forall = function (f) {
        return f(o);
      };
      var toOption = function () {
        return Option.some(o);
      };
      return {
        is: is,
        isValue: always,
        isError: never,
        getOr: constant(o),
        getOrThunk: constant(o),
        getOrDie: constant(o),
        or: or,
        orThunk: orThunk,
        fold: fold,
        map: map,
        mapError: mapError,
        each: each,
        bind: bind,
        exists: exists,
        forall: forall,
        toOption: toOption
      };
    };
    var error = function (message) {
      var getOrThunk = function (f) {
        return f();
      };
      var getOrDie = function () {
        return die(String(message))();
      };
      var or = function (opt) {
        return opt;
      };
      var orThunk = function (f) {
        return f();
      };
      var map = function (f) {
        return error(message);
      };
      var mapError = function (f) {
        return error(f(message));
      };
      var bind = function (f) {
        return error(message);
      };
      var fold = function (onError, _) {
        return onError(message);
      };
      return {
        is: never,
        isValue: never,
        isError: always,
        getOr: identity,
        getOrThunk: getOrThunk,
        getOrDie: getOrDie,
        or: or,
        orThunk: orThunk,
        fold: fold,
        map: map,
        mapError: mapError,
        each: noop,
        bind: bind,
        exists: never,
        forall: always,
        toOption: Option.none
      };
    };
    var Result = {
      value: value,
      error: error
    };

    var wrap = function (delegate) {
      var toCached = function () {
        return wrap(delegate.toCached());
      };
      var bindFuture = function (f) {
        return wrap(delegate.bind(function (resA) {
          return resA.fold(function (err) {
            return Future.pure(Result.error(err));
          }, function (a) {
            return f(a);
          });
        }));
      };
      var bindResult = function (f) {
        return wrap(delegate.map(function (resA) {
          return resA.bind(f);
        }));
      };
      var mapResult = function (f) {
        return wrap(delegate.map(function (resA) {
          return resA.map(f);
        }));
      };
      var mapError = function (f) {
        return wrap(delegate.map(function (resA) {
          return resA.mapError(f);
        }));
      };
      var foldResult = function (whenError, whenValue) {
        return delegate.map(function (res) {
          return res.fold(whenError, whenValue);
        });
      };
      var withTimeout = function (timeout, errorThunk) {
        return wrap(Future.nu(function (callback) {
          var timedOut = false;
          var timer = window.setTimeout(function () {
            timedOut = true;
            callback(Result.error(errorThunk()));
          }, timeout);
          delegate.get(function (result) {
            if (!timedOut) {
              window.clearTimeout(timer);
              callback(result);
            }
          });
        }));
      };
      return __assign({}, delegate, {
        toCached: toCached,
        bindFuture: bindFuture,
        bindResult: bindResult,
        mapResult: mapResult,
        mapError: mapError,
        foldResult: foldResult,
        withTimeout: withTimeout
      });
    };
    var nu$2 = function (worker) {
      return wrap(Future.nu(worker));
    };
    var value$1 = function (value) {
      return wrap(Future.pure(Result.value(value)));
    };
    var error$1 = function (error) {
      return wrap(Future.pure(Result.error(error)));
    };
    var fromResult = function (result) {
      return wrap(Future.pure(result));
    };
    var fromFuture = function (future) {
      return wrap(future.map(Result.value));
    };
    var fromPromise = function (promise) {
      return nu$2(function (completer) {
        promise.then(function (value) {
          completer(Result.value(value));
        }, function (error) {
          completer(Result.error(error));
        });
      });
    };
    var FutureResult = {
      nu: nu$2,
      wrap: wrap,
      pure: value$1,
      value: value$1,
      error: error$1,
      fromResult: fromResult,
      fromFuture: fromFuture,
      fromPromise: fromPromise
    };

    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var shallow = function (old, nu) {
      return nu;
    };
    var deep = function (old, nu) {
      var bothObjects = isObject(old) && isObject(nu);
      return bothObjects ? deepMerge(old, nu) : nu;
    };
    var baseMerge = function (merger) {
      return function () {
        var objects = new Array(arguments.length);
        for (var i = 0; i < objects.length; i++)
          objects[i] = arguments[i];
        if (objects.length === 0)
          throw new Error('Can\'t merge zero objects');
        var ret = {};
        for (var j = 0; j < objects.length; j++) {
          var curObject = objects[j];
          for (var key in curObject)
            if (hasOwnProperty.call(curObject, key)) {
              ret[key] = merger(ret[key], curObject[key]);
            }
        }
        return ret;
      };
    };
    var deepMerge = baseMerge(deep);
    var merge = baseMerge(shallow);

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

    var url = function () {
      return Global$1.getOrDie('URL');
    };
    var createObjectURL = function (blob) {
      return url().createObjectURL(blob);
    };
    var revokeObjectURL = function (u) {
      url().revokeObjectURL(u);
    };
    var URL = {
      createObjectURL: createObjectURL,
      revokeObjectURL: revokeObjectURL
    };

    var makeItems = function (info) {
      var imageUrl = {
        name: 'src',
        type: 'urlinput',
        filetype: 'image',
        label: 'Source'
      };
      var imageList = info.imageList.map(function (items) {
        return {
          name: 'images',
          type: 'selectbox',
          label: 'Image list',
          items: items
        };
      });
      var imageDescription = {
        name: 'alt',
        type: 'input',
        label: 'Image description'
      };
      var imageTitle = {
        name: 'title',
        type: 'input',
        label: 'Image title'
      };
      var imageDimensions = {
        name: 'dimensions',
        type: 'sizeinput'
      };
      var classList = info.classList.map(function (items) {
        return {
          name: 'classes',
          type: 'selectbox',
          label: 'Class',
          items: items
        };
      });
      var caption = {
        type: 'label',
        label: 'Caption',
        items: [{
            type: 'checkbox',
            name: 'caption',
            label: 'Show caption'
          }]
      };
      return flatten([
        [imageUrl],
        imageList.toArray(),
        info.hasDescription ? [imageDescription] : [],
        info.hasImageTitle ? [imageTitle] : [],
        info.hasDimensions ? [imageDimensions] : [],
        [{
            type: 'grid',
            columns: 2,
            items: flatten([
              classList.toArray(),
              info.hasImageCaption ? [caption] : []
            ])
          }]
      ]);
    };
    var makeTab = function (info) {
      return {
        title: 'General',
        items: makeItems(info)
      };
    };
    var MainTab = {
      makeTab: makeTab,
      makeItems: makeItems
    };

    function FileReader () {
      var f = Global$1.getOrDie('FileReader');
      return new f();
    }

    var global$1 = tinymce.util.Tools.resolve('tinymce.util.Promise');

    var global$2 = tinymce.util.Tools.resolve('tinymce.util.Tools');

    var global$3 = tinymce.util.Tools.resolve('tinymce.util.XHR');

    var hasDimensions = function (editor) {
      return editor.settings.image_dimensions === false ? false : true;
    };
    var hasAdvTab = function (editor) {
      return editor.settings.image_advtab === true ? true : false;
    };
    var getPrependUrl = function (editor) {
      return editor.getParam('image_prepend_url', '');
    };
    var getClassList = function (editor) {
      return editor.getParam('image_class_list');
    };
    var hasDescription = function (editor) {
      return editor.settings.image_description === false ? false : true;
    };
    var hasImageTitle = function (editor) {
      return editor.settings.image_title === true ? true : false;
    };
    var hasImageCaption = function (editor) {
      return editor.settings.image_caption === true ? true : false;
    };
    var getImageList = function (editor) {
      return editor.getParam('image_list', false);
    };
    var hasUploadUrl = function (editor) {
      return !!editor.getParam('images_upload_url', false);
    };
    var hasUploadHandler = function (editor) {
      return !!editor.getParam('images_upload_handler', false);
    };
    var getUploadUrl = function (editor) {
      return editor.getParam('images_upload_url');
    };
    var getUploadHandler = function (editor) {
      return editor.getParam('images_upload_handler');
    };
    var getUploadBasePath = function (editor) {
      return editor.getParam('images_upload_base_path');
    };
    var getUploadCredentials = function (editor) {
      return editor.getParam('images_upload_credentials');
    };
    var Settings = {
      hasDimensions: hasDimensions,
      hasAdvTab: hasAdvTab,
      getPrependUrl: getPrependUrl,
      getClassList: getClassList,
      hasDescription: hasDescription,
      hasImageTitle: hasImageTitle,
      hasImageCaption: hasImageCaption,
      getImageList: getImageList,
      hasUploadUrl: hasUploadUrl,
      hasUploadHandler: hasUploadHandler,
      getUploadUrl: getUploadUrl,
      getUploadHandler: getUploadHandler,
      getUploadBasePath: getUploadBasePath,
      getUploadCredentials: getUploadCredentials
    };

    var parseIntAndGetMax = function (val1, val2) {
      return Math.max(parseInt(val1, 10), parseInt(val2, 10));
    };
    var getImageSize = function (url, callback) {
      var img = domGlobals.document.createElement('img');
      function done(dimensions) {
        if (img.parentNode) {
          img.parentNode.removeChild(img);
        }
        callback(dimensions);
      }
      img.onload = function () {
        var width = parseIntAndGetMax(img.width, img.clientWidth);
        var height = parseIntAndGetMax(img.height, img.clientHeight);
        var dimensions = {
          width: width,
          height: height
        };
        done(Result.value(dimensions));
      };
      img.onerror = function () {
        done(Result.error(undefined));
      };
      var style = img.style;
      style.visibility = 'hidden';
      style.position = 'fixed';
      style.bottom = style.left = '0px';
      style.width = style.height = 'auto';
      domGlobals.document.body.appendChild(img);
      img.src = url;
    };
    var buildListItems = function (inputList, itemCallback, startItems) {
      function appendItems(values, output) {
        output = output || [];
        global$2.each(values, function (item) {
          var menuItem = { text: item.text || item.title };
          if (item.menu) {
            menuItem.menu = appendItems(item.menu);
          } else {
            menuItem.value = item.value;
            itemCallback(menuItem);
          }
          output.push(menuItem);
        });
        return output;
      }
      return appendItems(inputList, startItems || []);
    };
    var removePixelSuffix = function (value) {
      if (value) {
        value = value.replace(/px$/, '');
      }
      return value;
    };
    var addPixelSuffix = function (value) {
      if (value.length > 0 && /^[0-9]+$/.test(value)) {
        value += 'px';
      }
      return value;
    };
    var mergeMargins = function (css) {
      if (css.margin) {
        var splitMargin = String(css.margin).split(' ');
        switch (splitMargin.length) {
        case 1:
          css['margin-top'] = css['margin-top'] || splitMargin[0];
          css['margin-right'] = css['margin-right'] || splitMargin[0];
          css['margin-bottom'] = css['margin-bottom'] || splitMargin[0];
          css['margin-left'] = css['margin-left'] || splitMargin[0];
          break;
        case 2:
          css['margin-top'] = css['margin-top'] || splitMargin[0];
          css['margin-right'] = css['margin-right'] || splitMargin[1];
          css['margin-bottom'] = css['margin-bottom'] || splitMargin[0];
          css['margin-left'] = css['margin-left'] || splitMargin[1];
          break;
        case 3:
          css['margin-top'] = css['margin-top'] || splitMargin[0];
          css['margin-right'] = css['margin-right'] || splitMargin[1];
          css['margin-bottom'] = css['margin-bottom'] || splitMargin[2];
          css['margin-left'] = css['margin-left'] || splitMargin[1];
          break;
        case 4:
          css['margin-top'] = css['margin-top'] || splitMargin[0];
          css['margin-right'] = css['margin-right'] || splitMargin[1];
          css['margin-bottom'] = css['margin-bottom'] || splitMargin[2];
          css['margin-left'] = css['margin-left'] || splitMargin[3];
        }
        delete css.margin;
      }
      return css;
    };
    var createImageList = function (editor, callback) {
      var imageList = Settings.getImageList(editor);
      if (typeof imageList === 'string') {
        global$3.send({
          url: imageList,
          success: function (text) {
            callback(JSON.parse(text));
          }
        });
      } else if (typeof imageList === 'function') {
        imageList(callback);
      } else {
        callback(imageList);
      }
    };
    var waitLoadImage = function (editor, data, imgElm) {
      function selectImage() {
        imgElm.onload = imgElm.onerror = null;
        if (editor.selection) {
          editor.selection.select(imgElm);
          editor.nodeChanged();
        }
      }
      imgElm.onload = function () {
        if (!data.width && !data.height && Settings.hasDimensions(editor)) {
          editor.dom.setAttribs(imgElm, {
            width: imgElm.clientWidth,
            height: imgElm.clientHeight
          });
        }
        selectImage();
      };
      imgElm.onerror = selectImage;
    };
    var blobToDataUri = function (blob) {
      return new global$1(function (resolve, reject) {
        var reader = FileReader();
        reader.onload = function () {
          resolve(reader.result);
        };
        reader.onerror = function () {
          reject(reader.error.message);
        };
        reader.readAsDataURL(blob);
      });
    };
    var Utils = {
      getImageSize: getImageSize,
      buildListItems: buildListItems,
      removePixelSuffix: removePixelSuffix,
      addPixelSuffix: addPixelSuffix,
      mergeMargins: mergeMargins,
      createImageList: createImageList,
      waitLoadImage: waitLoadImage,
      blobToDataUri: blobToDataUri
    };

    var global$4 = tinymce.util.Tools.resolve('tinymce.dom.DOMUtils');

    var DOM = global$4.DOM;
    var getHspace = function (image) {
      if (image.style.marginLeft && image.style.marginRight && image.style.marginLeft === image.style.marginRight) {
        return Utils.removePixelSuffix(image.style.marginLeft);
      } else {
        return '';
      }
    };
    var getVspace = function (image) {
      if (image.style.marginTop && image.style.marginBottom && image.style.marginTop === image.style.marginBottom) {
        return Utils.removePixelSuffix(image.style.marginTop);
      } else {
        return '';
      }
    };
    var getBorder = function (image) {
      if (image.style.borderWidth) {
        return Utils.removePixelSuffix(image.style.borderWidth);
      } else {
        return '';
      }
    };
    var getAttrib = function (image, name) {
      if (image.hasAttribute(name)) {
        return image.getAttribute(name);
      } else {
        return '';
      }
    };
    var getStyle = function (image, name) {
      return image.style[name] ? image.style[name] : '';
    };
    var hasCaption = function (image) {
      return image.parentNode !== null && image.parentNode.nodeName === 'FIGURE';
    };
    var setAttrib = function (image, name, value) {
      image.setAttribute(name, value);
    };
    var wrapInFigure = function (image) {
      var figureElm = DOM.create('figure', { class: 'image' });
      DOM.insertAfter(figureElm, image);
      figureElm.appendChild(image);
      figureElm.appendChild(DOM.create('figcaption', { contentEditable: true }, 'Caption'));
      figureElm.contentEditable = 'false';
    };
    var removeFigure = function (image) {
      var figureElm = image.parentNode;
      DOM.insertAfter(image, figureElm);
      DOM.remove(figureElm);
    };
    var toggleCaption = function (image) {
      if (hasCaption(image)) {
        removeFigure(image);
      } else {
        wrapInFigure(image);
      }
    };
    var normalizeStyle = function (image, normalizeCss) {
      var attrValue = image.getAttribute('style');
      var value = normalizeCss(attrValue !== null ? attrValue : '');
      if (value.length > 0) {
        image.setAttribute('style', value);
        image.setAttribute('data-mce-style', value);
      } else {
        image.removeAttribute('style');
      }
    };
    var setSize = function (name, normalizeCss) {
      return function (image, name, value) {
        if (image.style[name]) {
          image.style[name] = Utils.addPixelSuffix(value);
          normalizeStyle(image, normalizeCss);
        } else {
          setAttrib(image, name, value);
        }
      };
    };
    var getSize = function (image, name) {
      if (image.style[name]) {
        return Utils.removePixelSuffix(image.style[name]);
      } else {
        return getAttrib(image, name);
      }
    };
    var setHspace = function (image, value) {
      var pxValue = Utils.addPixelSuffix(value);
      image.style.marginLeft = pxValue;
      image.style.marginRight = pxValue;
    };
    var setVspace = function (image, value) {
      var pxValue = Utils.addPixelSuffix(value);
      image.style.marginTop = pxValue;
      image.style.marginBottom = pxValue;
    };
    var setBorder = function (image, value) {
      var pxValue = Utils.addPixelSuffix(value);
      image.style.borderWidth = pxValue;
    };
    var setBorderStyle = function (image, value) {
      image.style.borderStyle = value;
    };
    var getBorderStyle = function (image) {
      return getStyle(image, 'borderStyle');
    };
    var isFigure = function (elm) {
      return elm.nodeName === 'FIGURE';
    };
    var isImage = function (elm) {
      return elm.nodeName === 'IMG';
    };
    var defaultData = function () {
      return {
        src: '',
        alt: '',
        title: '',
        width: '',
        height: '',
        class: '',
        style: '',
        caption: false,
        hspace: '',
        vspace: '',
        border: '',
        borderStyle: ''
      };
    };
    var getStyleValue = function (normalizeCss, data) {
      var image = domGlobals.document.createElement('img');
      setAttrib(image, 'style', data.style);
      if (getHspace(image) || data.hspace !== '') {
        setHspace(image, data.hspace);
      }
      if (getVspace(image) || data.vspace !== '') {
        setVspace(image, data.vspace);
      }
      if (getBorder(image) || data.border !== '') {
        setBorder(image, data.border);
      }
      if (getBorderStyle(image) || data.borderStyle !== '') {
        setBorderStyle(image, data.borderStyle);
      }
      return normalizeCss(image.getAttribute('style'));
    };
    var create = function (normalizeCss, data) {
      var image = domGlobals.document.createElement('img');
      write(normalizeCss, merge(data, { caption: false }), image);
      setAttrib(image, 'alt', data.alt);
      if (data.caption) {
        var figure = DOM.create('figure', { class: 'image' });
        figure.appendChild(image);
        figure.appendChild(DOM.create('figcaption', { contentEditable: true }, 'Caption'));
        figure.contentEditable = 'false';
        return figure;
      } else {
        return image;
      }
    };
    var read = function (normalizeCss, image) {
      return {
        src: getAttrib(image, 'src'),
        alt: getAttrib(image, 'alt'),
        title: getAttrib(image, 'title'),
        width: getSize(image, 'width'),
        height: getSize(image, 'height'),
        class: getAttrib(image, 'class'),
        style: normalizeCss(getAttrib(image, 'style')),
        caption: hasCaption(image),
        hspace: getHspace(image),
        vspace: getVspace(image),
        border: getBorder(image),
        borderStyle: getStyle(image, 'borderStyle')
      };
    };
    var updateProp = function (image, oldData, newData, name, set) {
      if (newData[name] !== oldData[name]) {
        set(image, name, newData[name]);
      }
    };
    var normalized = function (set, normalizeCss) {
      return function (image, name, value) {
        set(image, value);
        normalizeStyle(image, normalizeCss);
      };
    };
    var write = function (normalizeCss, newData, image) {
      var oldData = read(normalizeCss, image);
      updateProp(image, oldData, newData, 'caption', function (image, _name, _value) {
        return toggleCaption(image);
      });
      updateProp(image, oldData, newData, 'src', setAttrib);
      updateProp(image, oldData, newData, 'alt', setAttrib);
      updateProp(image, oldData, newData, 'title', setAttrib);
      updateProp(image, oldData, newData, 'width', setSize('width', normalizeCss));
      updateProp(image, oldData, newData, 'height', setSize('height', normalizeCss));
      updateProp(image, oldData, newData, 'class', setAttrib);
      updateProp(image, oldData, newData, 'style', normalized(function (image, value) {
        return setAttrib(image, 'style', value);
      }, normalizeCss));
      updateProp(image, oldData, newData, 'hspace', normalized(setHspace, normalizeCss));
      updateProp(image, oldData, newData, 'vspace', normalized(setVspace, normalizeCss));
      updateProp(image, oldData, newData, 'border', normalized(setBorder, normalizeCss));
      updateProp(image, oldData, newData, 'borderStyle', normalized(setBorderStyle, normalizeCss));
    };

    var normalizeCss = function (editor, cssText) {
      var css = editor.dom.styles.parse(cssText);
      var mergedCss = Utils.mergeMargins(css);
      var compressed = editor.dom.styles.parse(editor.dom.styles.serialize(mergedCss));
      return editor.dom.styles.serialize(compressed);
    };
    var getSelectedImage = function (editor) {
      var imgElm = editor.selection.getNode();
      var figureElm = editor.dom.getParent(imgElm, 'figure.image');
      if (figureElm) {
        return editor.dom.select('img', figureElm)[0];
      }
      if (imgElm && (imgElm.nodeName !== 'IMG' || imgElm.getAttribute('data-mce-object') || imgElm.getAttribute('data-mce-placeholder'))) {
        return null;
      }
      return imgElm;
    };
    var splitTextBlock = function (editor, figure) {
      var dom = editor.dom;
      var textBlock = dom.getParent(figure.parentNode, function (node) {
        return editor.schema.getTextBlockElements()[node.nodeName];
      }, editor.getBody());
      if (textBlock) {
        return dom.split(textBlock, figure);
      } else {
        return figure;
      }
    };
    var readImageDataFromSelection = function (editor) {
      var image = getSelectedImage(editor);
      return image ? read(function (css) {
        return normalizeCss(editor, css);
      }, image) : defaultData();
    };
    var insertImageAtCaret = function (editor, data) {
      var elm = create(function (css) {
        return normalizeCss(editor, css);
      }, data);
      editor.dom.setAttrib(elm, 'data-mce-id', '__mcenew');
      editor.focus();
      editor.selection.setContent(elm.outerHTML);
      var insertedElm = editor.dom.select('*[data-mce-id="__mcenew"]')[0];
      editor.dom.setAttrib(insertedElm, 'data-mce-id', null);
      if (isFigure(insertedElm)) {
        var figure = splitTextBlock(editor, insertedElm);
        editor.selection.select(figure);
      } else {
        editor.selection.select(insertedElm);
      }
    };
    var syncSrcAttr = function (editor, image) {
      editor.dom.setAttrib(image, 'src', image.getAttribute('src'));
    };
    var deleteImage = function (editor, image) {
      if (image) {
        var elm = editor.dom.is(image.parentNode, 'figure.image') ? image.parentNode : image;
        editor.dom.remove(elm);
        editor.focus();
        editor.nodeChanged();
        if (editor.dom.isEmpty(editor.getBody())) {
          editor.setContent('');
          editor.selection.setCursorLocation();
        }
      }
    };
    var writeImageDataToSelection = function (editor, data) {
      var image = getSelectedImage(editor);
      write(function (css) {
        return normalizeCss(editor, css);
      }, data, image);
      syncSrcAttr(editor, image);
      if (isFigure(image.parentNode)) {
        var figure = image.parentNode;
        splitTextBlock(editor, figure);
        editor.selection.select(image.parentNode);
      } else {
        editor.selection.select(image);
        Utils.waitLoadImage(editor, data, image);
      }
    };
    var insertOrUpdateImage = function (editor, data) {
      var image = getSelectedImage(editor);
      if (image) {
        if (data.src) {
          writeImageDataToSelection(editor, data);
        } else {
          deleteImage(editor, image);
        }
      } else if (data.src) {
        insertImageAtCaret(editor, data);
      }
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
      global$2.each(list, function (item) {
        var text = isString(item.text) ? item.text : isString(item.title) ? item.title : '';
        if (item.menu !== undefined) {
          var items = sanitizeList(item.menu, extractValue);
          out.push({
            text: text,
            items: items
          });
        } else {
          var value = extractValue(item);
          out.push({
            text: text,
            value: value
          });
        }
      });
      return out;
    };
    var sanitizer = function (extracter) {
      if (extracter === void 0) {
        extracter = getValue;
      }
      return function (list) {
        if (list) {
          return Option.from(list).map(function (list) {
            return sanitizeList(list, extracter);
          });
        } else {
          return Option.none();
        }
      };
    };
    var sanitize = function (list) {
      return sanitizer(getValue)(list);
    };
    var isGroup = function (item) {
      return Object.prototype.hasOwnProperty.call(item, 'items');
    };
    var findEntryDelegate = function (list, value) {
      return findMap(list, function (item) {
        if (isGroup(item)) {
          return findEntryDelegate(item.items, value);
        } else if (item.value === value) {
          return Option.some(item);
        } else {
          return Option.none();
        }
      });
    };
    var findEntry = function (optList, value) {
      return optList.bind(function (list) {
        return findEntryDelegate(list, value);
      });
    };
    var ListUtils = {
      sanitizer: sanitizer,
      sanitize: sanitize,
      findEntry: findEntry
    };

    function XMLHttpRequest () {
      var f = Global$1.getOrDie('XMLHttpRequest');
      return new f();
    }

    var noop$1 = function () {
    };
    var pathJoin = function (path1, path2) {
      if (path1) {
        return path1.replace(/\/$/, '') + '/' + path2.replace(/^\//, '');
      }
      return path2;
    };
    function Uploader (settings) {
      var defaultHandler = function (blobInfo, success, failure, progress) {
        var xhr, formData;
        xhr = XMLHttpRequest();
        xhr.open('POST', settings.url);
        xhr.withCredentials = settings.credentials;
        xhr.upload.onprogress = function (e) {
          progress(e.loaded / e.total * 100);
        };
        xhr.onerror = function () {
          failure('Image upload failed due to a XHR Transport error. Code: ' + xhr.status);
        };
        xhr.onload = function () {
          var json;
          if (xhr.status < 200 || xhr.status >= 300) {
            failure('HTTP Error: ' + xhr.status);
            return;
          }
          json = JSON.parse(xhr.responseText);
          if (!json || typeof json.location !== 'string') {
            failure('Invalid JSON: ' + xhr.responseText);
            return;
          }
          success(pathJoin(settings.basePath, json.location));
        };
        formData = new domGlobals.FormData();
        formData.append('file', blobInfo.blob(), blobInfo.filename());
        xhr.send(formData);
      };
      var uploadBlob = function (blobInfo, handler) {
        return new global$1(function (resolve, reject) {
          try {
            handler(blobInfo, resolve, reject, noop$1);
          } catch (ex) {
            reject(ex.message);
          }
        });
      };
      var isDefaultHandler = function (handler) {
        return handler === defaultHandler;
      };
      var upload = function (blobInfo) {
        return !settings.url && isDefaultHandler(settings.handler) ? global$1.reject('Upload url missing from the settings.') : uploadBlob(blobInfo, settings.handler);
      };
      settings = global$2.extend({
        credentials: false,
        handler: defaultHandler
      }, settings);
      return { upload: upload };
    }

    var makeTab$1 = function (info) {
      return {
        title: 'Advanced',
        items: [
          {
            type: 'input',
            label: 'Style',
            name: 'style'
          },
          {
            type: 'grid',
            columns: 2,
            items: [
              {
                type: 'input',
                label: 'Vertical space',
                name: 'vspace'
              },
              {
                type: 'input',
                label: 'Horizontal space',
                name: 'hspace'
              },
              {
                type: 'input',
                label: 'Border width',
                name: 'border'
              },
              {
                type: 'selectbox',
                name: 'borderstyle',
                label: 'Border style',
                items: [
                  {
                    text: 'Select...',
                    value: ''
                  },
                  {
                    text: 'Solid',
                    value: 'solid'
                  },
                  {
                    text: 'Dotted',
                    value: 'dotted'
                  },
                  {
                    text: 'Dashed',
                    value: 'dashed'
                  },
                  {
                    text: 'Double',
                    value: 'double'
                  },
                  {
                    text: 'Groove',
                    value: 'groove'
                  },
                  {
                    text: 'Ridge',
                    value: 'ridge'
                  },
                  {
                    text: 'Inset',
                    value: 'inset'
                  },
                  {
                    text: 'Outset',
                    value: 'outset'
                  },
                  {
                    text: 'None',
                    value: 'none'
                  },
                  {
                    text: 'Hidden',
                    value: 'hidden'
                  }
                ]
              }
            ]
          }
        ]
      };
    };
    var AdvTab = { makeTab: makeTab$1 };

    var collect = function (editor) {
      var urlListSanitizer = ListUtils.sanitizer(function (item) {
        return editor.convertURL(item.value || item.url, 'src');
      });
      var futureImageList = Future.nu(function (completer) {
        Utils.createImageList(editor, function (imageList) {
          completer(urlListSanitizer(imageList).map(function (items) {
            return flatten([
              [{
                  text: 'None',
                  value: ''
                }],
              items
            ]);
          }));
        });
      });
      var classList = ListUtils.sanitize(Settings.getClassList(editor));
      var hasAdvTab = Settings.hasAdvTab(editor);
      var hasUploadUrl = Settings.hasUploadUrl(editor);
      var hasUploadHandler = Settings.hasUploadHandler(editor);
      var image = readImageDataFromSelection(editor);
      var hasDescription = Settings.hasDescription(editor);
      var hasImageTitle = Settings.hasImageTitle(editor);
      var hasDimensions = Settings.hasDimensions(editor);
      var hasImageCaption = Settings.hasImageCaption(editor);
      var url = Settings.getUploadUrl(editor);
      var basePath = Settings.getUploadBasePath(editor);
      var credentials = Settings.getUploadCredentials(editor);
      var handler = Settings.getUploadHandler(editor);
      var prependURL = Option.some(Settings.getPrependUrl(editor)).filter(function (preUrl) {
        return isString(preUrl) && preUrl.length > 0;
      });
      return futureImageList.map(function (imageList) {
        return {
          image: image,
          imageList: imageList,
          classList: classList,
          hasAdvTab: hasAdvTab,
          hasUploadUrl: hasUploadUrl,
          hasUploadHandler: hasUploadHandler,
          hasDescription: hasDescription,
          hasImageTitle: hasImageTitle,
          hasDimensions: hasDimensions,
          hasImageCaption: hasImageCaption,
          url: url,
          basePath: basePath,
          credentials: credentials,
          handler: handler,
          prependURL: prependURL
        };
      });
    };

    var makeTab$2 = function (info) {
      var items = [{
          type: 'dropzone',
          name: 'fileinput'
        }];
      return {
        title: 'Upload',
        items: items
      };
    };
    var UploadTab = { makeTab: makeTab$2 };

    var createState = function (info) {
      return {
        prevImage: ListUtils.findEntry(info.imageList, info.image.src),
        prevAlt: info.image.alt,
        open: true
      };
    };
    var fromImageData = function (image) {
      return {
        src: {
          value: image.src,
          meta: {}
        },
        images: image.src,
        alt: image.alt,
        title: image.title,
        dimensions: {
          width: image.width,
          height: image.height
        },
        classes: image.class,
        caption: image.caption,
        style: image.style,
        vspace: image.vspace,
        border: image.border,
        hspace: image.hspace,
        borderstyle: image.borderStyle,
        fileinput: []
      };
    };
    var toImageData = function (data) {
      return {
        src: data.src.value,
        alt: data.alt,
        title: data.title,
        width: data.dimensions.width,
        height: data.dimensions.height,
        class: data.classes,
        style: data.style,
        caption: data.caption,
        hspace: data.hspace,
        vspace: data.vspace,
        border: data.border,
        borderStyle: data.borderstyle
      };
    };
    var addPrependUrl2 = function (info, srcURL) {
      if (!/^(?:[a-zA-Z]+:)?\/\//.test(srcURL)) {
        return info.prependURL.bind(function (prependUrl) {
          if (srcURL.substring(0, prependUrl.length) !== prependUrl) {
            return Option.some(prependUrl + srcURL);
          }
          return Option.none();
        });
      }
      return Option.none();
    };
    var addPrependUrl = function (info, api) {
      var data = api.getData();
      addPrependUrl2(info, data.src.value).each(function (srcURL) {
        api.setData({
          src: {
            value: srcURL,
            meta: data.src.meta
          }
        });
      });
    };
    var formFillFromMeta2 = function (info, data) {
      var meta = data.src.meta;
      if (meta !== undefined) {
        var dataCopy_1 = deepMerge({}, data);
        if (info.hasDescription && isString(meta.alt)) {
          dataCopy_1.alt = meta.alt;
        }
        if (info.hasImageTitle && isString(meta.title)) {
          dataCopy_1.title = meta.title;
        }
        if (info.hasDimensions) {
          if (isString(meta.width)) {
            dataCopy_1.dimensions.width = meta.width;
          }
          if (isString(meta.height)) {
            dataCopy_1.dimensions.height = meta.height;
          }
        }
        if (isString(meta.class)) {
          ListUtils.findEntry(info.classList, meta.class).each(function (entry) {
            dataCopy_1.classes = entry.value;
          });
        }
        if (info.hasAdvTab) {
          if (isString(meta.vspace)) {
            dataCopy_1.vspace = meta.vspace;
          }
          if (isString(meta.border)) {
            dataCopy_1.border = meta.border;
          }
          if (isString(meta.hspace)) {
            dataCopy_1.hspace = meta.hspace;
          }
          if (isString(meta.borderstyle)) {
            dataCopy_1.borderstyle = meta.borderstyle;
          }
        }
        return Option.some(dataCopy_1);
      }
      return Option.none();
    };
    var formFillFromMeta = function (info, api) {
      formFillFromMeta2(info, api.getData()).each(function (data) {
        return api.setData(data);
      });
    };
    var calculateImageSize = function (helpers, info, state, api) {
      var data = api.getData();
      var url = data.src.value;
      var meta = data.src.meta || {};
      if (!meta.width && !meta.height && info.hasDimensions) {
        helpers.imageSize(url).get(function (result) {
          result.each(function (size) {
            if (state.open) {
              api.setData({ dimensions: size });
            }
          });
        });
      }
    };
    var updateImagesDropdown = function (info, state, api) {
      var data = api.getData();
      var image = ListUtils.findEntry(info.imageList, data.src.value);
      state.prevImage = image;
      api.setData({
        images: image.map(function (entry) {
          return entry.value;
        }).getOr('')
      });
    };
    var changeSrc = function (helpers, info, state, api) {
      addPrependUrl(info, api);
      formFillFromMeta(info, api);
      calculateImageSize(helpers, info, state, api);
      updateImagesDropdown(info, state, api);
    };
    var changeImages = function (helpers, info, state, api) {
      var data = api.getData();
      var image = ListUtils.findEntry(info.imageList, data.images);
      image.each(function (img) {
        var updateAlt = data.alt === '' || state.prevImage.map(function (image) {
          return image.text === data.alt;
        }).getOr(false);
        if (updateAlt) {
          if (img.value === '') {
            api.setData({
              src: img,
              alt: state.prevAlt
            });
          } else {
            api.setData({
              src: img,
              alt: img.text
            });
          }
        } else {
          api.setData({ src: img });
        }
      });
      state.prevImage = image;
      changeSrc(helpers, info, state, api);
    };
    var calcVSpace = function (css) {
      var matchingTopBottom = css['margin-top'] && css['margin-bottom'] && css['margin-top'] === css['margin-bottom'];
      return matchingTopBottom ? Utils.removePixelSuffix(String(css['margin-top'])) : '';
    };
    var calcHSpace = function (css) {
      var matchingLeftRight = css['margin-right'] && css['margin-left'] && css['margin-right'] === css['margin-left'];
      return matchingLeftRight ? Utils.removePixelSuffix(String(css['margin-right'])) : '';
    };
    var calcBorderWidth = function (css) {
      return css['border-width'] ? Utils.removePixelSuffix(String(css['border-width'])) : '';
    };
    var calcBorderStyle = function (css) {
      return css['border-style'] ? String(css['border-style']) : '';
    };
    var calcStyle = function (parseStyle, serializeStyle, css) {
      return serializeStyle(parseStyle(serializeStyle(css)));
    };
    var changeStyle2 = function (parseStyle, serializeStyle, data) {
      var css = Utils.mergeMargins(parseStyle(data.style));
      var dataCopy = deepMerge({}, data);
      dataCopy.vspace = calcVSpace(css);
      dataCopy.hspace = calcHSpace(css);
      dataCopy.border = calcBorderWidth(css);
      dataCopy.borderstyle = calcBorderStyle(css);
      dataCopy.style = calcStyle(parseStyle, serializeStyle, css);
      return dataCopy;
    };
    var changeStyle = function (helpers, api) {
      var data = api.getData();
      var newData = changeStyle2(helpers.parseStyle, helpers.serializeStyle, data);
      api.setData(newData);
    };
    var changeAStyle = function (helpers, info, api) {
      var data = deepMerge(fromImageData(info.image), api.getData());
      var style = getStyleValue(helpers.normalizeCss, toImageData(data));
      api.setData({ style: style });
    };
    var changeFileInput = function (helpers, info, state, api) {
      var data = api.getData();
      api.block('Uploading image');
      head(data.fileinput).fold(function () {
        api.unblock();
      }, function (file) {
        var blobUri = URL.createObjectURL(file);
        var uploader = Uploader({
          url: info.url,
          basePath: info.basePath,
          credentials: info.credentials,
          handler: info.handler
        });
        var finalize = function () {
          api.unblock();
          URL.revokeObjectURL(blobUri);
        };
        Utils.blobToDataUri(file).then(function (dataUrl) {
          var blobInfo = helpers.createBlobCache(file, blobUri, dataUrl);
          uploader.upload(blobInfo).then(function (url) {
            api.setData({
              src: {
                value: url,
                meta: {}
              }
            });
            api.showTab('General');
            changeSrc(helpers, info, state, api);
            finalize();
          }).catch(function (err) {
            finalize();
            helpers.alertErr(api, err);
          });
        });
      });
    };
    var changeHandler = function (helpers, info, state) {
      return function (api, evt) {
        if (evt.name === 'src') {
          changeSrc(helpers, info, state, api);
        } else if (evt.name === 'images') {
          changeImages(helpers, info, state, api);
        } else if (evt.name === 'alt') {
          state.prevAlt = api.getData().alt;
        } else if (evt.name === 'style') {
          changeStyle(helpers, api);
        } else if (evt.name === 'vspace' || evt.name === 'hspace' || evt.name === 'border' || evt.name === 'borderstyle') {
          changeAStyle(helpers, info, api);
        } else if (evt.name === 'fileinput') {
          changeFileInput(helpers, info, state, api);
        }
      };
    };
    var closeHandler = function (state) {
      return function () {
        state.open = false;
      };
    };
    var makeDialogBody = function (info) {
      if (info.hasAdvTab || info.hasUploadUrl || info.hasUploadHandler) {
        var tabPanel = {
          type: 'tabpanel',
          tabs: flatten([
            [MainTab.makeTab(info)],
            info.hasAdvTab ? [AdvTab.makeTab(info)] : [],
            info.hasUploadUrl || info.hasUploadHandler ? [UploadTab.makeTab(info)] : []
          ])
        };
        return tabPanel;
      } else {
        var panel = {
          type: 'panel',
          items: MainTab.makeItems(info)
        };
        return panel;
      }
    };
    var makeDialog = function (helpers) {
      return function (info) {
        var state = createState(info);
        return {
          title: 'Insert/Edit Image',
          size: 'normal',
          body: makeDialogBody(info),
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
          initialData: fromImageData(info.image),
          onSubmit: helpers.onSubmit(info),
          onChange: changeHandler(helpers, info, state),
          onClose: closeHandler(state)
        };
      };
    };
    var submitHandler = function (editor) {
      return function (info) {
        return function (api) {
          var data = deepMerge(fromImageData(info.image), api.getData());
          editor.undoManager.transact(function () {
            insertOrUpdateImage(editor, toImageData(data));
          });
          editor.editorUpload.uploadImagesAuto();
          api.close();
        };
      };
    };
    var imageSize = function (editor) {
      return function (url) {
        return FutureResult.nu(function (completer) {
          Utils.getImageSize(editor.documentBaseURI.toAbsolute(url), function (data) {
            var result = data.bind(function (dimensions) {
              return (isString(dimensions.width) || isNumber(dimensions.width)) && (isString(dimensions.height) || isNumber(dimensions.height)) ? Result.value({
                width: String(dimensions.width),
                height: String(dimensions.height)
              }) : Result.error(undefined);
            });
            completer(result);
          });
        });
      };
    };
    var createBlobCache = function (editor) {
      return function (file, blobUri, dataUrl) {
        return editor.editorUpload.blobCache.create({
          blob: file,
          blobUri: blobUri,
          name: file.name ? file.name.replace(/\.[^\.]+$/, '') : null,
          base64: dataUrl.split(',')[1]
        });
      };
    };
    var alertErr = function (editor) {
      return function (api, message) {
        editor.windowManager.alert(message, api.close);
      };
    };
    var normalizeCss$1 = function (editor) {
      return function (cssText) {
        return normalizeCss(editor, cssText);
      };
    };
    var parseStyle = function (editor) {
      return function (cssText) {
        return editor.dom.parseStyle(cssText);
      };
    };
    var serializeStyle = function (editor) {
      return function (stylesArg, name) {
        return editor.dom.serializeStyle(stylesArg, name);
      };
    };
    var Dialog = function (editor) {
      var helpers = {
        onSubmit: submitHandler(editor),
        imageSize: imageSize(editor),
        createBlobCache: createBlobCache(editor),
        alertErr: alertErr(editor),
        normalizeCss: normalizeCss$1(editor),
        parseStyle: parseStyle(editor),
        serializeStyle: serializeStyle(editor)
      };
      var open = function () {
        return collect(editor).map(makeDialog(helpers)).get(function (spec) {
          editor.windowManager.open(spec);
        });
      };
      return { open: open };
    };

    var register = function (editor) {
      editor.addCommand('mceImage', Dialog(editor).open);
    };
    var Commands = { register: register };

    var hasImageClass = function (node) {
      var className = node.attr('class');
      return className && /\bimage\b/.test(className);
    };
    var toggleContentEditableState = function (state) {
      return function (nodes) {
        var i = nodes.length, node;
        var toggleContentEditable = function (node) {
          node.attr('contenteditable', state ? 'true' : null);
        };
        while (i--) {
          node = nodes[i];
          if (hasImageClass(node)) {
            node.attr('contenteditable', state ? 'false' : null);
            global$2.each(node.getAll('figcaption'), toggleContentEditable);
          }
        }
      };
    };
    var setup = function (editor) {
      editor.on('preInit', function () {
        editor.parser.addNodeFilter('figure', toggleContentEditableState(true));
        editor.serializer.addNodeFilter('figure', toggleContentEditableState(false));
      });
    };
    var FilterContent = { setup: setup };

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

    var Immutable = function () {
      var fields = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        fields[_i] = arguments[_i];
      }
      return function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          values[_i] = arguments[_i];
        }
        if (fields.length !== values.length) {
          throw new Error('Wrong number of arguments to struct. Expected "[' + fields.length + ']", got ' + values.length + ' arguments');
        }
        var struct = {};
        each(fields, function (name, i) {
          struct[name] = constant(values[i]);
        });
        return struct;
      };
    };

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
      return nu$3(group(1), group(2));
    };
    var detect = function (versionRegexes, agent) {
      var cleanedAgent = String(agent).toLowerCase();
      if (versionRegexes.length === 0)
        return unknown();
      return find$1(versionRegexes, cleanedAgent);
    };
    var unknown = function () {
      return nu$3(0, 0);
    };
    var nu$3 = function (major, minor) {
      return {
        major: major,
        minor: minor
      };
    };
    var Version = {
      nu: nu$3,
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
      return nu$4({
        current: undefined,
        version: Version.unknown()
      });
    };
    var nu$4 = function (info) {
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
      nu: nu$4,
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
      return nu$5({
        current: undefined,
        version: Version.unknown()
      });
    };
    var nu$5 = function (info) {
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
      nu: nu$5,
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

    var parent = function (element) {
      var dom = element.dom();
      return Option.from(dom.parentNode).map(Element.fromDom);
    };
    var spot = Immutable('element', 'offset');

    var getRootElement = function (elm) {
      return parent(elm).filter(function (parentElm) {
        return name(parentElm) === 'figure';
      }).getOr(elm);
    };
    var register$1 = function (editor) {
      var makeContextMenuItem = function (node) {
        return {
          text: 'Image',
          icon: 'image',
          onAction: function () {
            var rootElm = getRootElement(Element.fromDom(node));
            editor.selection.select(rootElm.dom());
            Dialog(editor).open();
          }
        };
      };
      editor.ui.registry.addToggleButton('image', {
        icon: 'image',
        tooltip: 'Insert/edit image',
        onAction: Dialog(editor).open,
        onSetup: function (buttonApi) {
          return editor.selection.selectorChangedWithUnbind('img:not([data-mce-object],[data-mce-placeholder]),figure.image', buttonApi.setActive).unbind;
        }
      });
      editor.ui.registry.addMenuItem('image', {
        icon: 'image',
        text: 'Image...',
        onAction: Dialog(editor).open
      });
      editor.ui.registry.addContextMenu('image', {
        update: function (element) {
          return isFigure(element) || isImage(element) ? [makeContextMenuItem(element)] : [];
        }
      });
    };
    var Buttons = { register: register$1 };

    global.add('image', function (editor) {
      FilterContent.setup(editor);
      Buttons.register(editor);
      Commands.register(editor);
    });
    function Plugin () {
    }

    return Plugin;

}(window));
})();
