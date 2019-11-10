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
["tinymce.plugins.contextmenu.Plugin","ephox.katamari.api.Cell","tinymce.core.PluginManager","tinymce.plugins.contextmenu.api.Api","tinymce.plugins.contextmenu.core.Bind","global!tinymce.util.Tools.resolve","tinymce.plugins.contextmenu.api.Settings","tinymce.plugins.contextmenu.core.Coords","tinymce.plugins.contextmenu.ui.ContextMenu","tinymce.core.Env","tinymce.core.dom.DOMUtils","tinymce.core.ui.Factory","tinymce.core.util.Tools"]
jsc*/
define(
  'ephox.katamari.api.Cell',

  [
  ],

  function () {
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

    return Cell;
  }
);

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

/**
 * Api.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define(
  'tinymce.plugins.contextmenu.api.Api',
  [
  ],
  function () {
    var get = function (visibleState) {
      var isContextMenuVisible = function () {
        return visibleState.get();
      };

      return {
        isContextMenuVisible: isContextMenuVisible
      };
    };

    return {
      get: get
    };
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
  'tinymce.plugins.contextmenu.api.Settings',
  [
  ],
  function () {
    var shouldNeverUseNative = function (editor) {
      return editor.settings.contextmenu_never_use_native;
    };

    var getContextMenu = function (editor) {
      return editor.getParam('contextmenu', 'link openlink image inserttable | cell row column deletetable');
    };

    return {
      shouldNeverUseNative: shouldNeverUseNative,
      getContextMenu: getContextMenu
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
  'tinymce.core.dom.DOMUtils',
  [
    'global!tinymce.util.Tools.resolve'
  ],
  function (resolve) {
    return resolve('tinymce.dom.DOMUtils');
  }
);

/**
 * Coords.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define(
  'tinymce.plugins.contextmenu.core.Coords',
  [
    'tinymce.core.Env',
    'tinymce.core.dom.DOMUtils'
  ],
  function (Env, DOMUtils) {
    var nu = function (x, y) {
      return { x: x, y: y };
    };

    var transpose = function (pos, dx, dy) {
      return nu(pos.x + dx, pos.y + dy);
    };

    var fromPageXY = function (e) {
      return nu(e.pageX, e.pageY);
    };

    var fromClientXY = function (e) {
      return nu(e.clientX, e.clientY);
    };

    var transposeUiContainer = function (element, pos) {
      if (element && DOMUtils.DOM.getStyle(element, 'position', true) !== 'static') {
        var containerPos = DOMUtils.DOM.getPos(element);
        var dx = containerPos.x - element.scrollLeft;
        var dy = containerPos.y - element.scrollTop;
        return transpose(pos, -dx, -dy);
      } else {
        return transpose(pos, 0, 0);
      }
    };

    var transposeContentAreaContainer = function (element, pos) {
      var containerPos = DOMUtils.DOM.getPos(element);
      return transpose(pos, containerPos.x, containerPos.y);
    };

    var getUiContainer = function (editor) {
      return Env.container;
    };

    var getPos = function (editor, e) {
      if (editor.inline) {
        return transposeUiContainer(getUiContainer(editor), fromPageXY(e));
      } else {
        var iframePos = transposeContentAreaContainer(editor.getContentAreaContainer(), fromClientXY(e));
        return transposeUiContainer(getUiContainer(editor), iframePos);
      }
    };

    return {
      getPos: getPos
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
 * ContextMenu.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define(
  'tinymce.plugins.contextmenu.ui.ContextMenu',
  [
    'tinymce.core.ui.Factory',
    'tinymce.core.util.Tools',
    'tinymce.plugins.contextmenu.api.Settings'
  ],
  function (Factory, Tools, Settings) {
    var renderMenu = function (editor, visibleState) {
      var menu, contextmenu, items = [];

      contextmenu = Settings.getContextMenu(editor);
      Tools.each(contextmenu.split(/[ ,]/), function (name) {
        var item = editor.menuItems[name];

        if (name === '|') {
          item = { text: name };
        }

        if (item) {
          item.shortcut = ''; // Hide shortcuts
          items.push(item);
        }
      });

      for (var i = 0; i < items.length; i++) {
        if (items[i].text === '|') {
          if (i === 0 || i === items.length - 1) {
            items.splice(i, 1);
          }
        }
      }

      menu = Factory.create('menu', {
        items: items,
        context: 'contextmenu',
        classes: 'contextmenu'
      }).renderTo();

      menu.on('hide', function (e) {
        if (e.control === this) {
          visibleState.set(false);
        }
      });

      editor.on('remove', function () {
        menu.remove();
        menu = null;
      });

      return menu;
    };

    var show = function (editor, pos, visibleState, menu) {
      if (menu.get() === null) {
        menu.set(renderMenu(editor, visibleState));
      } else {
        menu.get().show();
      }

      menu.get().moveTo(pos.x, pos.y);
      visibleState.set(true);
    };

    return {
      show: show
    };
  }
);
/**
 * Bind.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define(
  'tinymce.plugins.contextmenu.core.Bind',
  [
    'tinymce.plugins.contextmenu.api.Settings',
    'tinymce.plugins.contextmenu.core.Coords',
    'tinymce.plugins.contextmenu.ui.ContextMenu'
  ],
  function (Settings, Coords, ContextMenu) {
    var isNativeOverrideKeyEvent = function (editor, e) {
      return e.ctrlKey && !Settings.shouldNeverUseNative(editor);
    };

    var setup = function (editor, visibleState, menu) {
      editor.on('contextmenu', function (e) {
        if (isNativeOverrideKeyEvent(editor, e)) {
          return;
        }

        e.preventDefault();
        ContextMenu.show(editor, Coords.getPos(editor, e), visibleState, menu);
      });
    };

    return {
      setup: setup
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
  'tinymce.plugins.contextmenu.Plugin',
  [
    'ephox.katamari.api.Cell',
    'tinymce.core.PluginManager',
    'tinymce.plugins.contextmenu.api.Api',
    'tinymce.plugins.contextmenu.core.Bind'
  ],
  function (Cell, PluginManager, Api, Bind) {
    PluginManager.add('contextmenu', function (editor) {
      var menu = Cell(null), visibleState = Cell(false);

      Bind.setup(editor, visibleState, menu);

      return Api.get(visibleState);
    });

    return function () { };
  }
);
dem('tinymce.plugins.contextmenu.Plugin')();
})();
