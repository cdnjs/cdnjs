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
    instances.push(dem(ids[i]));
  callback.apply(null, callback);
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
// this helps with minificiation when using a lot of global references
var defineGlobal = function (id, ref) {
  define(id, [], function () { return ref; });
};
/*jsc
["tinymce.plugins.contextmenu.Plugin","tinymce.core.dom.DOMUtils","tinymce.core.Env","tinymce.core.PluginManager","tinymce.core.ui.Menu","tinymce.core.util.Tools","global!tinymce.util.Tools.resolve"]
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
  'tinymce.core.dom.DOMUtils',
  [
    'global!tinymce.util.Tools.resolve'
  ],
  function (resolve) {
    return resolve('tinymce.dom.DOMUtils');
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
  'tinymce.core.Env',
  [
    'global!tinymce.util.Tools.resolve'
  ],
  function (resolve) {
    return resolve('tinymce.Env');
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
  'tinymce.core.PluginManager',
  [
    'global!tinymce.util.Tools.resolve'
  ],
  function (resolve) {
    return resolve('tinymce.PluginManager');
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
  'tinymce.core.ui.Menu',
  [
    'global!tinymce.util.Tools.resolve'
  ],
  function (resolve) {
    return resolve('tinymce.ui.Menu');
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
  'tinymce.core.util.Tools',
  [
    'global!tinymce.util.Tools.resolve'
  ],
  function (resolve) {
    return resolve('tinymce.util.Tools');
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

/**
 * This class contains all core logic for the contextmenu plugin.
 *
 * @class tinymce.contextmenu.Plugin
 * @private
 */
define(
  'tinymce.plugins.contextmenu.Plugin',
  [
    'tinymce.core.dom.DOMUtils',
    'tinymce.core.Env',
    'tinymce.core.PluginManager',
    'tinymce.core.ui.Menu',
    'tinymce.core.util.Tools'
  ],
  function (DOMUtils, Env, PluginManager, Menu, Tools) {
    var DOM = DOMUtils.DOM;

    PluginManager.add('contextmenu', function (editor) {
      var menu, visibleState, contextmenuNeverUseNative = editor.settings.contextmenu_never_use_native;

      var isNativeOverrideKeyEvent = function (e) {
        return e.ctrlKey && !contextmenuNeverUseNative;
      };

      var isMacWebKit = function () {
        return Env.mac && Env.webkit;
      };

      var isContextMenuVisible = function () {
        return visibleState === true;
      };

      /**
       * This takes care of a os x native issue where it expands the selection
       * to the word at the caret position to do "lookups". Since we are overriding
       * the context menu we also need to override this expanding so the behavior becomes
       * normalized. Firefox on os x doesn't expand to the word when using the context menu.
       */
      editor.on('mousedown', function (e) {
        if (isMacWebKit() && e.button === 2 && !isNativeOverrideKeyEvent(e)) {
          if (editor.selection.isCollapsed()) {
            editor.once('contextmenu', function (e) {
              editor.selection.placeCaretAt(e.clientX, e.clientY);
            });
          }
        }
      });

      editor.on('contextmenu', function (e) {
        var contextmenu;

        if (isNativeOverrideKeyEvent(e)) {
          return;
        }

        e.preventDefault();
        contextmenu = editor.settings.contextmenu || 'link openlink image inserttable | cell row column deletetable';

        // Render menu
        if (!menu) {
          var items = [];

          Tools.each(contextmenu.split(/[ ,]/), function (name) {
            var item = editor.menuItems[name];

            if (name == '|') {
              item = { text: name };
            }

            if (item) {
              item.shortcut = ''; // Hide shortcuts
              items.push(item);
            }
          });

          for (var i = 0; i < items.length; i++) {
            if (items[i].text == '|') {
              if (i === 0 || i == items.length - 1) {
                items.splice(i, 1);
              }
            }
          }

          menu = new Menu({
            items: items,
            context: 'contextmenu',
            classes: 'contextmenu'
          }).renderTo();

          menu.on('hide', function (e) {
            if (e.control === this) {
              visibleState = false;
            }
          });

          editor.on('remove', function () {
            menu.remove();
            menu = null;
          });

        } else {
          menu.show();
        }

        // Position menu
        var pos = { x: e.pageX, y: e.pageY };

        if (!editor.inline) {
          pos = DOM.getPos(editor.getContentAreaContainer());
          pos.x += e.clientX;
          pos.y += e.clientY;
        }

        menu.moveTo(pos.x, pos.y);
        visibleState = true;
      });

      return {
        isContextMenuVisible: isContextMenuVisible
      };
    });
    return function () { };
  }
);
dem('tinymce.plugins.contextmenu.Plugin')();
})();
