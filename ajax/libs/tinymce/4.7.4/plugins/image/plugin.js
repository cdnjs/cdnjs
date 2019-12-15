(function () {

var defs = {}; // id -> {dependencies, definition, instance (possibly undefined)}

// Used when there is no 'main' module.
// The name is probably (hopefully) unique so minification removes for releases.
var register_3795 = function (id) {
  var module = dem(id);
  var fragments = id.split('.');
  var target = Function('return this;')();
  for (var i = 0; i < fragments.length - 1; ++i) {
    if (target[fragments[i]] === undefined)
      target[fragments[i]] = {};
    target = target[fragments[i]];
  }
  target[fragments[fragments.length - 1]] = module;
};

var instantiate = function (id) {
  var actual = defs[id];
  var dependencies = actual.deps;
  var definition = actual.defn;
  var len = dependencies.length;
  var instances = new Array(len);
  for (var i = 0; i < len; ++i)
    instances[i] = dem(dependencies[i]);
  var defResult = definition.apply(null, instances);
  if (defResult === undefined)
     throw 'module [' + id + '] returned undefined';
  actual.instance = defResult;
};

var def = function (id, dependencies, definition) {
  if (typeof id !== 'string')
    throw 'module id must be a string';
  else if (dependencies === undefined)
    throw 'no dependencies for ' + id;
  else if (definition === undefined)
    throw 'no definition function for ' + id;
  defs[id] = {
    deps: dependencies,
    defn: definition,
    instance: undefined
  };
};

var dem = function (id) {
  var actual = defs[id];
  if (actual === undefined)
    throw 'module [' + id + '] was undefined';
  else if (actual.instance === undefined)
    instantiate(id);
  return actual.instance;
};

var req = function (ids, callback) {
  var len = ids.length;
  var instances = new Array(len);
  for (var i = 0; i < len; ++i)
    instances[i] = dem(ids[i]);
  callback.apply(null, instances);
};

var ephox = {};

ephox.bolt = {
  module: {
    api: {
      define: def,
      require: req,
      demand: dem
    }
  }
};

var define = def;
var require = req;
var demand = dem;
// this helps with minification when using a lot of global references
var defineGlobal = function (id, ref) {
  define(id, [], function () { return ref; });
};
/*jsc
["tinymce.plugins.image.Plugin","tinymce.core.PluginManager","tinymce.plugins.image.api.Commands","tinymce.plugins.image.core.FilterContent","tinymce.plugins.image.ui.Buttons","global!tinymce.util.Tools.resolve","tinymce.plugins.image.ui.Dialog","tinymce.core.util.Tools","global!Math","global!RegExp","tinymce.plugins.image.api.Settings","tinymce.plugins.image.core.Utils","tinymce.plugins.image.ui.AdvTab","tinymce.plugins.image.ui.MainTab","tinymce.plugins.image.ui.SizeManager","tinymce.plugins.image.ui.UploadTab","global!document","ephox.sand.api.FileReader","tinymce.core.util.Promise","tinymce.core.util.XHR","ephox.sand.api.URL","tinymce.core.ui.Factory","tinymce.plugins.image.core.Uploader","ephox.sand.util.Global","ephox.sand.api.XMLHttpRequest","global!window","ephox.katamari.api.Resolve","ephox.katamari.api.Global"]
jsc*/
defineGlobal("global!tinymce.util.Tools.resolve", tinymce.util.Tools.resolve);
/**
 * ResolveGlobal.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define(
  'tinymce.core.PluginManager',
  [
    'global!tinymce.util.Tools.resolve'
  ],
  function (resolve) {
    return resolve('tinymce.PluginManager');
  }
);

defineGlobal("global!Math", Math);
defineGlobal("global!RegExp", RegExp);
/**
 * ResolveGlobal.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define(
  'tinymce.core.util.Tools',
  [
    'global!tinymce.util.Tools.resolve'
  ],
  function (resolve) {
    return resolve('tinymce.util.Tools');
  }
);

/**
 * Settings.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define(
  'tinymce.plugins.image.api.Settings',
  [
  ],
  function () {
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
      return editor.getParam('images_upload_url', false);
    };

    var hasUploadHandler = function (editor) {
      return editor.getParam('images_upload_handler', false);
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

    return {
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
  }
);
defineGlobal("global!document", document);
define(
  'ephox.katamari.api.Global',

  [
  ],

  function () {
    // Use window object as the global if it's available since CSP will block script evals
    var global = typeof window !== 'undefined' ? window : Function('return this;')();
    return global;
  }
);


define(
  'ephox.katamari.api.Resolve',

  [
    'ephox.katamari.api.Global'
  ],

  function (Global) {
    /** path :: ([String], JsObj?) -> JsObj */
    var path = function (parts, scope) {
      var o = scope !== undefined ? scope : Global;
      for (var i = 0; i < parts.length && o !== undefined && o !== null; ++i)
        o = o[parts[i]];
      return o;
    };

    /** resolve :: (String, JsObj?) -> JsObj */
    var resolve = function (p, scope) {
      var parts = p.split('.');
      return path(parts, scope);
    };

    /** step :: (JsObj, String) -> JsObj */
    var step = function (o, part) {
      if (o[part] === undefined || o[part] === null)
        o[part] = {};
      return o[part];
    };

    /** forge :: ([String], JsObj?) -> JsObj */
    var forge = function (parts, target) {
      var o = target !== undefined ? target : Global;      
      for (var i = 0; i < parts.length; ++i)
        o = step(o, parts[i]);
      return o;
    };

    /** namespace :: (String, JsObj?) -> JsObj */
    var namespace = function (name, target) {
      var parts = name.split('.');
      return forge(parts, target);
    };

    return {
      path: path,
      resolve: resolve,
      forge: forge,
      namespace: namespace
    };
  }
);


define(
  'ephox.sand.util.Global',

  [
    'ephox.katamari.api.Resolve'
  ],

  function (Resolve) {
    var unsafe = function (name, scope) {
      return Resolve.resolve(name, scope);
    };

    var getOrDie = function (name, scope) {
      var actual = unsafe(name, scope);

      if (actual === undefined) throw name + ' not available on this browser';
      return actual;
    };

    return {
      getOrDie: getOrDie
    };
  }
);
define(
  'ephox.sand.api.FileReader',

  [
    'ephox.sand.util.Global'
  ],

  function (Global) {
    /*
     * IE10 and above per
     * https://developer.mozilla.org/en-US/docs/Web/API/FileReader
     */
    return function () {
      var f = Global.getOrDie('FileReader');
      return new f();
    };
  }
);
/**
 * ResolveGlobal.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define(
  'tinymce.core.util.Promise',
  [
    'global!tinymce.util.Tools.resolve'
  ],
  function (resolve) {
    return resolve('tinymce.util.Promise');
  }
);

/**
 * ResolveGlobal.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define(
  'tinymce.core.util.XHR',
  [
    'global!tinymce.util.Tools.resolve'
  ],
  function (resolve) {
    return resolve('tinymce.util.XHR');
  }
);

/**
 * Utils.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

/**
 * @class tinymce.image.core.Utils
 * @private
 */
define(
  'tinymce.plugins.image.core.Utils',
  [
    'global!Math',
    'global!document',
    'ephox.sand.api.FileReader',
    'tinymce.core.util.Promise',
    'tinymce.core.util.Tools',
    'tinymce.core.util.XHR',
    'tinymce.plugins.image.api.Settings'
  ],
  function (Math, document, FileReader, Promise, Tools, XHR, Settings) {
    var parseIntAndGetMax = function (val1, val2) {
      return Math.max(parseInt(val1, 10), parseInt(val2, 10));
    };

    var getImageSize = function (url, callback) {
      var img = document.createElement('img');

      function done(width, height) {
        if (img.parentNode) {
          img.parentNode.removeChild(img);
        }

        callback({ width: width, height: height });
      }

      img.onload = function () {
        var width = parseIntAndGetMax(img.width, img.clientWidth);
        var height = parseIntAndGetMax(img.height, img.clientHeight);
        done(width, height);
      };

      img.onerror = function () {
        done();
      };

      var style = img.style;
      style.visibility = 'hidden';
      style.position = 'fixed';
      style.bottom = style.left = 0;
      style.width = style.height = 'auto';

      document.body.appendChild(img);
      img.src = url;
    };


    var buildListItems = function (inputList, itemCallback, startItems) {
      function appendItems(values, output) {
        output = output || [];

        Tools.each(values, function (item) {
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

        var splitMargin = css.margin.split(" ");

        switch (splitMargin.length) {
          case 1: //margin: toprightbottomleft;
            css['margin-top'] = css['margin-top'] || splitMargin[0];
            css['margin-right'] = css['margin-right'] || splitMargin[0];
            css['margin-bottom'] = css['margin-bottom'] || splitMargin[0];
            css['margin-left'] = css['margin-left'] || splitMargin[0];
            break;
          case 2: //margin: topbottom rightleft;
            css['margin-top'] = css['margin-top'] || splitMargin[0];
            css['margin-right'] = css['margin-right'] || splitMargin[1];
            css['margin-bottom'] = css['margin-bottom'] || splitMargin[0];
            css['margin-left'] = css['margin-left'] || splitMargin[1];
            break;
          case 3: //margin: top rightleft bottom;
            css['margin-top'] = css['margin-top'] || splitMargin[0];
            css['margin-right'] = css['margin-right'] || splitMargin[1];
            css['margin-bottom'] = css['margin-bottom'] || splitMargin[2];
            css['margin-left'] = css['margin-left'] || splitMargin[1];
            break;
          case 4: //margin: top right bottom left;
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

      if (typeof imageList === "string") {
        XHR.send({
          url: imageList,
          success: function (text) {
            callback(JSON.parse(text));
          }
        });
      } else if (typeof imageList === "function") {
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
      return new Promise(function (resolve, reject) {
        var reader = new FileReader();
        reader.onload = function () {
          resolve(reader.result);
        };
        reader.onerror = function () {
          reject(FileReader.error.message);
        };
        reader.readAsDataURL(blob);
      });
    };

    return {
      getImageSize: getImageSize,
      buildListItems: buildListItems,
      removePixelSuffix: removePixelSuffix,
      addPixelSuffix: addPixelSuffix,
      mergeMargins: mergeMargins,
      createImageList: createImageList,
      waitLoadImage: waitLoadImage,
      blobToDataUri: blobToDataUri
    };
  }
);

define(
  'tinymce.plugins.image.ui.AdvTab',

  [
    'tinymce.plugins.image.api.Settings',
    'tinymce.plugins.image.core.Utils'
  ],

  function (Settings, Utils) {
    var updateVSpaceHSpaceBorder = function (editor) {
      return function (evt) {
        var dom = editor.dom;
        var rootControl = evt.control.rootControl;

        if (!Settings.hasAdvTab(editor)) {
          return;
        }

        var data = rootControl.toJSON();
        var css = dom.parseStyle(data.style);

        rootControl.find('#vspace').value("");
        rootControl.find('#hspace').value("");

        css = Utils.mergeMargins(css);

          //Move opposite equal margins to vspace/hspace field
        if ((css['margin-top'] && css['margin-bottom']) || (css['margin-right'] && css['margin-left'])) {
          if (css['margin-top'] === css['margin-bottom']) {
            rootControl.find('#vspace').value(Utils.removePixelSuffix(css['margin-top']));
          } else {
            rootControl.find('#vspace').value('');
          }
          if (css['margin-right'] === css['margin-left']) {
            rootControl.find('#hspace').value(Utils.removePixelSuffix(css['margin-right']));
          } else {
            rootControl.find('#hspace').value('');
          }
        }

          //Move border-width
        if (css['border-width']) {
          rootControl.find('#border').value(Utils.removePixelSuffix(css['border-width']));
        }

        rootControl.find('#style').value(dom.serializeStyle(dom.parseStyle(dom.serializeStyle(css))));
      };
    };

    var makeTab = function (editor, updateStyle) {
      return {
        title: 'Advanced',
        type: 'form',
        pack: 'start',
        items: [
          {
            label: 'Style',
            name: 'style',
            type: 'textbox',
            onchange: updateVSpaceHSpaceBorder(editor)
          },
          {
            type: 'form',
            layout: 'grid',
            packV: 'start',
            columns: 2,
            padding: 0,
            alignH: ['left', 'right'],
            defaults: {
              type: 'textbox',
              maxWidth: 50,
              onchange: function (evt) {
                updateStyle(editor, evt.control.rootControl);
              }
            },
            items: [
              { label: 'Vertical space', name: 'vspace' },
              { label: 'Horizontal space', name: 'hspace' },
              { label: 'Border', name: 'border' }
            ]
          }
        ]
      };
    };

    return {
      makeTab: makeTab
    };
  }
);

define(
  'tinymce.plugins.image.ui.SizeManager',

  [

  ],
  function () {
    var doSyncSize = function (widthCtrl, heightCtrl) {
      widthCtrl.state.set('oldVal', widthCtrl.value());
      heightCtrl.state.set('oldVal', heightCtrl.value());
    };

    var doSizeControls = function (win, f) {
      var widthCtrl = win.find('#width')[0];
      var heightCtrl = win.find('#height')[0];
      var constrained = win.find('#constrain')[0];
      if (widthCtrl && heightCtrl && constrained) {
        f(widthCtrl, heightCtrl, constrained.checked());
      }
    };

    var doUpdateSize = function (widthCtrl, heightCtrl, isContrained) {
      var oldWidth = widthCtrl.state.get('oldVal');
      var oldHeight = heightCtrl.state.get('oldVal');
      var newWidth = widthCtrl.value();
      var newHeight = heightCtrl.value();

      if (isContrained && oldWidth && oldHeight && newWidth && newHeight) {
        if (newWidth !== oldWidth) {
          newHeight = Math.round((newWidth / oldWidth) * newHeight);

          if (!isNaN(newHeight)) {
            heightCtrl.value(newHeight);
          }
        } else {
          newWidth = Math.round((newHeight / oldHeight) * newWidth);

          if (!isNaN(newWidth)) {
            widthCtrl.value(newWidth);
          }
        }
      }

      doSyncSize(widthCtrl, heightCtrl);
    };

    var syncSize = function (win) {
      doSizeControls(win, doSyncSize);
    };

    var updateSize = function (win) {
      doSizeControls(win, doUpdateSize);
    };

    var createUi = function () {
      var recalcSize = function (evt) {
        updateSize(evt.control.rootControl);
      };

      return {
        type: 'container',
        label: 'Dimensions',
        layout: 'flex',
        align: 'center',
        spacing: 5,
        items: [
          {
            name: 'width', type: 'textbox', maxLength: 5, size: 5,
            onchange: recalcSize, ariaLabel: 'Width'
          },
          { type: 'label', text: 'x' },
          {
            name: 'height', type: 'textbox', maxLength: 5, size: 5,
            onchange: recalcSize, ariaLabel: 'Height'
          },
          { name: 'constrain', type: 'checkbox', checked: true, text: 'Constrain proportions' }
        ]
      };
    };

    return {
      createUi: createUi,
      syncSize: syncSize,
      updateSize: updateSize
    };
  }
);
define(
  'tinymce.plugins.image.ui.MainTab',

  [
    'tinymce.core.util.Tools',
    'tinymce.plugins.image.api.Settings',
    'tinymce.plugins.image.core.Utils',
    'tinymce.plugins.image.ui.SizeManager'
  ],

  function (Tools, Settings, Utils, SizeManager) {
    var onSrcChange = function (evt, editor) {
      var srcURL, prependURL, absoluteURLPattern, meta = evt.meta || {};
      var control = evt.control;
      var rootControl = control.rootControl;
      var imageListCtrl = rootControl.find('#image-list')[0];

      if (imageListCtrl) {
        imageListCtrl.value(editor.convertURL(control.value(), 'src'));
      }

      Tools.each(meta, function (value, key) {
        rootControl.find('#' + key).value(value);
      });

      if (!meta.width && !meta.height) {
        srcURL = editor.convertURL(control.value(), 'src');

        // Pattern test the src url and make sure we haven't already prepended the url
        prependURL = Settings.getPrependUrl(editor);
        absoluteURLPattern = new RegExp('^(?:[a-z]+:)?//', 'i');
        if (prependURL && !absoluteURLPattern.test(srcURL) && srcURL.substring(0, prependURL.length) !== prependURL) {
          srcURL = prependURL + srcURL;
        }

        control.value(srcURL);

        Utils.getImageSize(editor.documentBaseURI.toAbsolute(control.value()), function (data) {
          if (data.width && data.height && Settings.hasDimensions(editor)) {
            rootControl.find('#width').value(data.width);
            rootControl.find('#height').value(data.height);
            SizeManager.updateSize(rootControl);
          }
        });
      }
    };

    var onBeforeCall = function (evt) {
      evt.meta = evt.control.rootControl.toJSON();
    };

    var getGeneralItems = function (editor, imageListCtrl) {
      var generalFormItems = [
        {
          name: 'src',
          type: 'filepicker',
          filetype: 'image',
          label: 'Source',
          autofocus: true,
          onchange: function (evt) {
            onSrcChange(evt, editor);
          },
          onbeforecall: onBeforeCall
        },
        imageListCtrl
      ];

      if (Settings.hasDescription(editor)) {
        generalFormItems.push({ name: 'alt', type: 'textbox', label: 'Image description' });
      }

      if (Settings.hasImageTitle(editor)) {
        generalFormItems.push({ name: 'title', type: 'textbox', label: 'Image Title' });
      }

      if (Settings.hasDimensions(editor)) {
        generalFormItems.push(
          SizeManager.createUi()
        );
      }

      if (Settings.getClassList(editor)) {
        generalFormItems.push({
          name: 'class',
          type: 'listbox',
          label: 'Class',
          values: Utils.buildListItems(
            Settings.getClassList(editor),
            function (item) {
              if (item.value) {
                item.textStyle = function () {
                  return editor.formatter.getCssText({ inline: 'img', classes: [item.value] });
                };
              }
            }
          )
        });
      }

      if (Settings.hasImageCaption(editor)) {
        generalFormItems.push({ name: 'caption', type: 'checkbox', label: 'Caption' });
      }

      return generalFormItems;
    };

    var makeTab = function (editor, imageListCtrl) {
      return {
        title: 'General',
        type: 'form',
        items: getGeneralItems(editor, imageListCtrl)
      };
    };

    return {
      makeTab: makeTab,
      getGeneralItems: getGeneralItems
    };
  }
);

define(
  'ephox.sand.api.URL',

  [
    'ephox.sand.util.Global'
  ],

  function (Global) {
    /*
     * IE10 and above per
     * https://developer.mozilla.org/en-US/docs/Web/API/URL.createObjectURL
     *
     * Also Safari 6.1+
     * Safari 6.0 has 'webkitURL' instead, but doesn't support flexbox so we
     * aren't supporting it anyway
     */
    var url = function () {
      return Global.getOrDie('URL');
    };

    var createObjectURL = function (blob) {
      return url().createObjectURL(blob);
    };

    var revokeObjectURL = function (u) {
      url().revokeObjectURL(u);
    };

    return {
      createObjectURL: createObjectURL,
      revokeObjectURL: revokeObjectURL
    };
  }
);
/**
 * ResolveGlobal.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define(
  'tinymce.core.ui.Factory',
  [
    'global!tinymce.util.Tools.resolve'
  ],
  function (resolve) {
    return resolve('tinymce.ui.Factory');
  }
);

define(
  'ephox.sand.api.XMLHttpRequest',

  [
    'ephox.sand.util.Global'
  ],

  function (Global) {
    /*
     * IE8 and above per
     * https://developer.mozilla.org/en/docs/XMLHttpRequest
     */
    return function () {
      var f = Global.getOrDie('XMLHttpRequest');
      return new f();
    };
  }
);
defineGlobal("global!window", window);
/**
 * Uploader.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

/**
 * This is basically cut down version of tinymce.core.file.Uploader, which we could use directly
 * if it wasn't marked as private.
 */
define(
  'tinymce.plugins.image.core.Uploader',
  [
    'ephox.sand.api.XMLHttpRequest',
    'global!document',
    'global!window',
    'tinymce.core.util.Promise',
    'tinymce.core.util.Tools'
  ],
  function (XMLHttpRequest, document, window, Promise, Tools) {
    var noop = function () {};

    var pathJoin = function (path1, path2) {
      if (path1) {
        return path1.replace(/\/$/, '') + '/' + path2.replace(/^\//, '');
      }

      return path2;
    };

    return function (settings) {
      var defaultHandler = function (blobInfo, success, failure, progress) {
        var xhr, formData;

        xhr = new XMLHttpRequest();
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

        formData = new window.FormData();
        formData.append('file', blobInfo.blob(), blobInfo.filename());

        xhr.send(formData);
      };

      var uploadBlob = function (blobInfo, handler) {
        return new Promise(function (resolve, reject) {
          try {
            handler(blobInfo, resolve, reject, noop);
          } catch (ex) {
            reject(ex.message);
          }
        });
      };

      var isDefaultHandler = function (handler) {
        return handler === defaultHandler;
      };

      var upload = function (blobInfo) {
        return (!settings.url && isDefaultHandler(settings.handler)) ? Promise.reject('Upload url missing from the settings.') : uploadBlob(blobInfo, settings.handler);
      };

      settings = Tools.extend({
        credentials: false,
        handler: defaultHandler
      }, settings);

      return {
        upload: upload
      };
    };
  }
);
define(
  'tinymce.plugins.image.ui.UploadTab',

  [
    'ephox.sand.api.URL',
    'tinymce.core.ui.Factory',
    'tinymce.plugins.image.api.Settings',
    'tinymce.plugins.image.core.Utils',
    'tinymce.plugins.image.core.Uploader'
  ],

  function (URL, Factory, Settings, Utils, Uploader) {
    var onFileInput = function (editor) {
      return function (evt) {
        var Throbber = Factory.get('Throbber');
        var rootControl = evt.control.rootControl;
        var throbber = new Throbber(rootControl.getEl());
        var file = evt.control.value();
        var blobUri = URL.createObjectURL(file);

        var uploader = new Uploader({
          url: Settings.getUploadUrl(editor),
          basePath: Settings.getUploadBasePath(editor),
          credentials: Settings.getUploadCredentials(editor),
          handler: Settings.getUploadHandler(editor)
        });

        var finalize = function () {
          throbber.hide();
          URL.revokeObjectURL(blobUri);
        };

        throbber.show();

        return Utils.blobToDataUri(file).then(function (dataUrl) {
          var blobInfo = editor.editorUpload.blobCache.create({
            blob: file,
            blobUri: blobUri,
            name: file.name ? file.name.replace(/\.[^\.]+$/, '') : null, // strip extension
            base64: dataUrl.split(',')[1]
          });
          return uploader.upload(blobInfo).then(function (url) {
            var src = rootControl.find('#src');
            src.value(url);
            rootControl.find('tabpanel')[0].activateTab(0); // switch to General tab
            src.fire('change'); // this will invoke onSrcChange (and any other handlers, if any).
            finalize();
            return url;
          });
        })['catch'](function (err) {
          editor.windowManager.alert(err);
          finalize();
        });
      };
    };

    var acceptExts = '.jpg,.jpeg,.png,.gif';

    var makeTab = function (editor) {
      return {
        title: 'Upload',
        type: 'form',
        layout: 'flex',
        direction: 'column',
        align: 'stretch',
        padding: '20 20 20 20',
        items: [
          {
            type: 'container',
            layout: 'flex',
            direction: 'column',
            align: 'center',
            spacing: 10,
            items: [
              {
                text: "Browse for an image",
                type: 'browsebutton',
                accept: acceptExts,
                onchange: onFileInput(editor)
              },
              {
                text: 'OR',
                type: 'label'
              }
            ]
          },
          {
            text: "Drop an image here",
            type: 'dropzone',
            accept: acceptExts,
            height: 100,
            onchange: onFileInput(editor)
          }
        ]
      };
    };

    return {
      makeTab: makeTab
    };
  }
);

/**
 * Dialog.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

/**
 * @class tinymce.image.ui.Dialog
 * @private
 */
define(
  'tinymce.plugins.image.ui.Dialog',
  [
    'global!Math',
    'global!RegExp',
    'tinymce.core.util.Tools',
    'tinymce.plugins.image.api.Settings',
    'tinymce.plugins.image.core.Utils',
    'tinymce.plugins.image.ui.AdvTab',
    'tinymce.plugins.image.ui.MainTab',
    'tinymce.plugins.image.ui.SizeManager',
    'tinymce.plugins.image.ui.UploadTab'
  ],
  function (Math, RegExp, Tools, Settings, Utils, AdvTab, MainTab, SizeManager, UploadTab) {
    return function (editor) {
      var updateStyle = function (editor, rootControl) {
        if (!Settings.hasAdvTab(editor)) {
          return;
        }
        var dom = editor.dom;
        var data = rootControl.toJSON();
        var css = dom.parseStyle(data.style);

        css = Utils.mergeMargins(css);

        if (data.vspace) {
          css['margin-top'] = css['margin-bottom'] = Utils.addPixelSuffix(data.vspace);
        }
        if (data.hspace) {
          css['margin-left'] = css['margin-right'] = Utils.addPixelSuffix(data.hspace);
        }
        if (data.border) {
          css['border-width'] = Utils.addPixelSuffix(data.border);
        }

        rootControl.find('#style').value(dom.serializeStyle(dom.parseStyle(dom.serializeStyle(css))));
      };

      function showDialog(imageList) {
        var win, data = {}, imgElm, figureElm, dom = editor.dom;
        var imageListCtrl;

        function onSubmitForm() {
          var figureElm, oldImg;

          SizeManager.updateSize(win);
          updateStyle(editor, win);

          data = Tools.extend(data, win.toJSON());

          if (!data.alt) {
            data.alt = '';
          }

          if (!data.title) {
            data.title = '';
          }

          if (data.width === '') {
            data.width = null;
          }

          if (data.height === '') {
            data.height = null;
          }

          if (!data.style) {
            data.style = null;
          }

          // Setup new data excluding style properties
          /*eslint dot-notation: 0*/
          data = {
            src: data.src,
            alt: data.alt,
            title: data.title,
            width: data.width,
            height: data.height,
            style: data.style,
            caption: data.caption,
            "class": data["class"]
          };

          editor.undoManager.transact(function () {
            if (!data.src) {
              if (imgElm) {
                var elm = dom.is(imgElm.parentNode, 'figure.image') ? imgElm.parentNode : imgElm;
                dom.remove(elm);
                editor.focus();
                editor.nodeChanged();

                if (dom.isEmpty(editor.getBody())) {
                  editor.setContent('');
                  editor.selection.setCursorLocation();
                }
              }

              return;
            }

            if (data.title === "") {
              data.title = null;
            }

            if (!imgElm) {
              data.id = '__mcenew';
              editor.focus();
              editor.selection.setContent(dom.createHTML('img', data));
              imgElm = dom.get('__mcenew');
              dom.setAttrib(imgElm, 'id', null);
            } else {
              dom.setAttribs(imgElm, data);
            }

            editor.editorUpload.uploadImagesAuto();

            if (data.caption === false) {
              if (dom.is(imgElm.parentNode, 'figure.image')) {
                figureElm = imgElm.parentNode;
                dom.insertAfter(imgElm, figureElm);
                dom.remove(figureElm);
              }
            }

            if (data.caption === true) {
              if (!dom.is(imgElm.parentNode, 'figure.image')) {
                oldImg = imgElm;
                imgElm = imgElm.cloneNode(true);
                figureElm = dom.create('figure', { 'class': 'image' });
                figureElm.appendChild(imgElm);
                figureElm.appendChild(dom.create('figcaption', { contentEditable: true }, 'Caption'));
                figureElm.contentEditable = false;

                var textBlock = dom.getParent(oldImg, function (node) {
                  return editor.schema.getTextBlockElements()[node.nodeName];
                });

                if (textBlock) {
                  dom.split(textBlock, oldImg, figureElm);
                } else {
                  dom.replace(figureElm, oldImg);
                }

                editor.selection.select(figureElm);
              }

              return;
            }

            Utils.waitLoadImage(editor, data, imgElm);
          });
        }

        imgElm = editor.selection.getNode();
        figureElm = dom.getParent(imgElm, 'figure.image');
        if (figureElm) {
          imgElm = dom.select('img', figureElm)[0];
        }

        if (imgElm &&
          (imgElm.nodeName !== 'IMG' ||
            imgElm.getAttribute('data-mce-object') ||
            imgElm.getAttribute('data-mce-placeholder'))) {
          imgElm = null;
        }

        if (imgElm) {
          data = {
            src: dom.getAttrib(imgElm, 'src'),
            alt: dom.getAttrib(imgElm, 'alt'),
            title: dom.getAttrib(imgElm, 'title'),
            "class": dom.getAttrib(imgElm, 'class'),
            width: dom.getAttrib(imgElm, 'width'),
            height: dom.getAttrib(imgElm, 'height'),
            caption: !!figureElm
          };
        }

        if (imageList) {
          imageListCtrl = {
            type: 'listbox',
            label: 'Image list',
            name: 'image-list',
            values: Utils.buildListItems(
              imageList,
              function (item) {
                item.value = editor.convertURL(item.value || item.url, 'src');
              },
              [{ text: 'None', value: '' }]
            ),
            value: data.src && editor.convertURL(data.src, 'src'),
            onselect: function (e) {
              var altCtrl = win.find('#alt');

              if (!altCtrl.value() || (e.lastControl && altCtrl.value() === e.lastControl.text())) {
                altCtrl.value(e.control.text());
              }

              win.find('#src').value(e.control.value()).fire('change');
            },
            onPostRender: function () {
              /*eslint consistent-this: 0*/
              imageListCtrl = this;
            }
          };
        }

        if (Settings.hasAdvTab(editor) || Settings.hasUploadUrl(editor) || Settings.hasUploadHandler(editor)) {
          var body = [
            MainTab.makeTab(editor, imageListCtrl)
          ];

          if (Settings.hasAdvTab(editor)) {
            // Parse styles from img
            if (imgElm) {
              if (imgElm.style.marginLeft && imgElm.style.marginRight && imgElm.style.marginLeft === imgElm.style.marginRight) {
                data.hspace = Utils.removePixelSuffix(imgElm.style.marginLeft);
              }
              if (imgElm.style.marginTop && imgElm.style.marginBottom && imgElm.style.marginTop === imgElm.style.marginBottom) {
                data.vspace = Utils.removePixelSuffix(imgElm.style.marginTop);
              }
              if (imgElm.style.borderWidth) {
                data.border = Utils.removePixelSuffix(imgElm.style.borderWidth);
              }

              data.style = editor.dom.serializeStyle(editor.dom.parseStyle(editor.dom.getAttrib(imgElm, 'style')));
            }

            body.push(AdvTab.makeTab(editor, updateStyle));
          }

          if (Settings.hasUploadUrl(editor) || Settings.hasUploadHandler(editor)) {
            body.push(UploadTab.makeTab(editor));
          }

          // Advanced dialog shows general+advanced tabs
          win = editor.windowManager.open({
            title: 'Insert/edit image',
            data: data,
            bodyType: 'tabpanel',
            body: body,
            onSubmit: onSubmitForm
          });
        } else {
          // Simple default dialog
          win = editor.windowManager.open({
            title: 'Insert/edit image',
            data: data,
            body: MainTab.getGeneralItems(editor, imageListCtrl),
            onSubmit: onSubmitForm
          });
        }

        SizeManager.syncSize(win);
      }

      function open() {
        Utils.createImageList(editor, showDialog);
      }

      return {
        open: open
      };
    };
  }
);

/**
 * Commands.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define(
  'tinymce.plugins.image.api.Commands',
  [
    'tinymce.plugins.image.ui.Dialog'
  ],
  function (Dialog) {
    var register = function (editor) {
      editor.addCommand('mceImage', Dialog(editor).open);
    };

    return {
      register: register
    };
  }
);
/**
 * FilterContent.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define(
  'tinymce.plugins.image.core.FilterContent',
  [
    'tinymce.core.util.Tools'
  ],
  function (Tools) {
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
            Tools.each(node.getAll('figcaption'), toggleContentEditable);
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

    return {
      setup: setup
    };
  }
);
/**
 * Buttons.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define(
  'tinymce.plugins.image.ui.Buttons',
  [
    'tinymce.plugins.image.ui.Dialog'
  ],
  function (Dialog) {
    var register = function (editor) {
      editor.addButton('image', {
        icon: 'image',
        tooltip: 'Insert/edit image',
        onclick: Dialog(editor).open,
        stateSelector: 'img:not([data-mce-object],[data-mce-placeholder]),figure.image'
      });

      editor.addMenuItem('image', {
        icon: 'image',
        text: 'Image',
        onclick: Dialog(editor).open,
        context: 'insert',
        prependToContext: true
      });
    };

    return {
      register: register
    };
  }
);
/**
 * Plugin.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define(
  'tinymce.plugins.image.Plugin',
  [
    'tinymce.core.PluginManager',
    'tinymce.plugins.image.api.Commands',
    'tinymce.plugins.image.core.FilterContent',
    'tinymce.plugins.image.ui.Buttons'
  ],
  function (PluginManager, Commands, FilterContent, Buttons) {
    PluginManager.add('image', function (editor) {
      FilterContent.setup(editor);
      Buttons.register(editor);
      Commands.register(editor);
    });

    return function () { };
  }
);
dem('tinymce.plugins.image.Plugin')();
})();
