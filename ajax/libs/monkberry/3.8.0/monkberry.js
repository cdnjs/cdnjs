/**                                      _    _
 *                     /\/\   ___  _ __ | | _| |__   ___ _ __ _ __ _   _
 *                    /    \ / _ \| '_ \| |/ / '_ \ / _ \ '__| '__| | | |
 *                   / /\/\ \ (_) | | | |   <| |_) |  __/ |  | |  | |_| |
 *                   \/    \/\___/|_| |_|_|\_\_.__/ \___|_|  |_|   \__, |
 *                                                                 |___/
 *
 *        +---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+
 *  Enter ->  |       |                                   |           |           |       |
 *        +   +   +   +---+   +---+---+   +---+---+   +   +   +---+   +   +---+   +   +   +
 *        |       |           |                   |   |       |       |   |   |       |   |
 *        +---+---+---+---+---+   +---+---+---+---+   +---+---+   +---+   +   +---+---+   +
 *        |       |               |       |           |       |       |   |           |   |
 *        +   +   +   +---+---+---+   +   +   +---+---+   +   +---+   +   +---+---+   +   +
 *        |   |       |           |   |   |       |       |               |   |           |
 *        +   +---+---+   +---+   +   +   +---+   +   +---+---+---+---+---+   +   +   +---+
 *        |   |       |       |       |       |   |   |       |       |   |       |   |   |
 *        +   +---+   +---+   +---+---+---+   +   +   +   +   +   +   +   +---+---+   +   +
 *        |           |       |       |   |       |       |   |   |   |           |   |   |
 *        +---+---+---+   +---+   +   +   +   +---+---+---+   +---+   +---+---+   +   +   +
 *        |   |       |           |       |   |       |       |       |               |   |
 *        +   +   +   +---+---+---+   +---+   +   +   +   +---+   +---+---+   +---+---+   +
 *        |   |   |           |           |   |   |   |       |   |       |   |           |
 *        +   +   +---+---+   +---+---+---+   +---+   +---+   +   +   +   +   +   +---+   +
 *        |       |                           |       |   |       |   |       |   |       |
 *        +---+---+   +   +   +---+---+---+---+   +---+   +---+   +   +---+---+   +   +---+
 *        |           |   |                               |       |               |       -> Exit
 *        +---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+
 */
(function (document) {
  /**
   * Monkberry.
   * @class
   */
  function Monkberry() {
    this.pool = new Pool();
    this.templates = {};
    this.filters = {};
    this.wrappers = {};
  }

  /**
   * Main loops processor.
   * @param {Monkberry.View} parent - Parent view, where to place loop elements.
   * @param {Element} node - Parent element, where to append child. Note what it can be a comment element.
   * @param {Map} map - Map contains views from previous loop render.
   * @param {string} template - Template name to render.
   * @param {*} data - Data object passed into view.update() function.
   * @param {*} array - Data iterating on.
   * @param {object} options - Loop options, value and key names.
   */
  Monkberry.prototype.foreach = function (parent, node, map, template, data, array, options) {
    var i, j, len, keys, transform, arrayLength, childrenSize = map.length;

    // Get array length, and convert object ot array, if needed.
    if (Array.isArray(array)) {
      transform = transformArray;
      arrayLength = array.length;
    } else {
      transform = transformObject;
      keys = Object.keys(array);
      arrayLength = keys.length;
    }

    // In new array contains less items what before, remove surpluses.
    len = childrenSize - arrayLength;
    for (i in map.items) {
      if (len-- > 0) {
        map.items[i].remove();
      } else {
        break;
      }
    }

    // If there is already some views, update there data with new.
    j = 0;
    for (i in map.items) {
      map.items[i].update(transform(data, array, keys, j, options));
      j++;
    }

    // If new array contains more items when previous, render new views and append them.
    for (j = childrenSize, len = arrayLength; j < len; j++) {
      // Render new view.
      var view = this.render(template, undefined, undefined, {omit: true});

      // Set view hierarchy.
      view.parent = parent;
      parent.nested.push(view);

      // Add nodes DOM.
      if (node.nodeType == 8) {
        view.insertBefore(node);
      } else {
        view.appendTo(node);
      }

      // Call onRender actions.
      if (view.onRender) {
        view.onRender();
      }

      // Set view data (note what it must be after adding nodes to DOM).
      view.update(transform(data, array, keys, j, options));

      // Remember to remove from children map on view remove.
      i = map.push(view);
      view.onRemove = (function (i) {
        return function () {
          map.remove(i);
        };
      })(i);
    }
  };

  /**
   * Main if/else, custom tags, blocks processor.
   * @param {Monkberry.View} parent - Parent view, where to place loop elements.
   * @param {Element} node - Parent element, where to append child. Note what it can be a comment element.
   * @param {{ref:object}} child - Object which may contains previous rendered view.
   * @param {string} template - Template name to render.
   * @param {*} data - Data object passed into view.update() function.
   * @param {boolean} test - Whenever to insert then view.
   * @returns {boolean} Returns test value.
   */
  Monkberry.prototype.insert = function (parent, node, child/*.ref*/, template, data, test) {
    if (child.ref) { // If view was already inserted, update or remove it.
      if (test) {
        child.ref.update(data);
      } else {
        child.ref.remove();
      }
    } else if (test) {
      // Render new view.
      var view = this.render(template, undefined, undefined, {omit: true});

      // Set view hierarchy.
      view.parent = parent;
      parent.nested.push(view);

      // Add nodes DOM.
      if (node.nodeType == 8) {
        view.insertBefore(node);
      } else {
        view.appendTo(node);
      }

      // Call onRender actions.
      if (view.onRender) {
        view.onRender();
      }

      // Set view data (note what it must be after adding nodes to DOM).
      view.update(data);

      // Remember to remove child ref on remove of view.
      child.ref = view;
      view.onRemove = function () {
        child.ref = null;
      };
    }

    return test;
  };

  /**
   * Render template to view.
   * @param {string} name - Template name.
   * @param {Object} values - Data to update view.
   * @param {boolean} noCache - Do not take views from pool.
   * @param {Object} options - Optional. Extra render options.
   * @return {Monkberry.View}
   */
  Monkberry.prototype.render = function (name, values, noCache, options) {
    noCache = noCache || false;
    var omitCallback = options && options.omit || false;

    if (this.templates[name]) {
      var view;

      if (noCache) {
        view = this.templates[name]();
        view.name = name;
        view.pool = this.pool;
      } else {
        view = this.pool.pull(name);
        if (!view) {
          view = this.templates[name]();
          view.name = name;
          view.pool = this.pool;
        }
      }

      if (!omitCallback && view.onRender) {
        view.onRender();
      }

      if (values !== undefined) {
        view.update(values);
      }

      if (this.wrappers[name] && !view.wrapped[name]) {
        view = this.wrappers[name](view);
        view.wrapped[name] = true;
      }

      return view;
    } else {
      throw new Error('Template with name "' + name + '" does not found.');
    }
  };

  /**
   * Prerepder view for future usage.
   * @param {string} name - Template name.
   * @param {number} times - Times of prerender.
   */
  Monkberry.prototype.prerender = function (name, times) {
    while (times--) {
      this.pool.push(name, this.render(name, undefined, true));
    }
  };

  /**
   * Mount template into monkberry.
   * @param {Object} templates
   */
  Monkberry.prototype.mount = function (templates) {
    var _this = this;

    // Some of templates mounts as factory which returns list of templates.
    if (typeof templates === 'function') {
      templates = templates(this, document);
    }

    Object.keys(templates).forEach(function (name) {
      _this.templates[name] = templates[name];
    });
  };

  /**
   * Create new Monkberry instance with separate pool, templates and wrappers.
   * Note what filters will be same.
   * @returns {Monkberry}
   */
  Monkberry.prototype.createPool = function () {
    var pool = new Monkberry();
    pool.filters = this.filters;
    return pool;
  };

  /**
   * Get info about prerendered templates.
   * @returns {Object}
   */
  Monkberry.prototype.getPoolInfo = function () {
    var name, info = {};
    for(name in this.pool.store) {
      info[name] = this.pool.store[name].length;
    }
    return info;
  };

  Monkberry.prototype.view = function () {
    return new Monkberry.View;
  };

  Monkberry.prototype.map = function () {
    return new Map;
  };

  /**
   * Main class for view.
   * @class
   */
  Monkberry.View = function View() {
    this.name = ''; // Name of template.
    this.parent = null; // Parent view.
    this.nested = []; // Nested views.
    this.nodes = []; // Root DOM nodes.
    this.wrapped = {}; // List of already applied wrappers.
    this.onRender = null; // Function to call on render.
    this.onRemove = null; // Function to call on remove.
  };

  /**
   * Updates view. You can specify only part of data what is needs to be updated.
   * @param {Object} data
   */
  Monkberry.View.prototype.update = function (data) {
    var _this = this;

    // Collect keys.
    var keys = typeof data === 'object' ? Object.keys(data) : [];

    // Clear cache to prevent double updating.
    if (_this.__cache__) {
      keys.forEach(function (key) {
        if (key in _this.__cache__) {
          delete _this.__cache__[key];
        }
      });
    }

    // Update view.
    if (_this.__update__) {
      keys.forEach(function (key) {
        if (_this.__update__.hasOwnProperty(key)) {
          _this.__update__[key](data, data[key]);
        }
      });
    }
  };

  /**
   * @param {Element} toNode
   */
  Monkberry.View.prototype.appendTo = function (toNode) {
    for (var i = 0, len = this.nodes.length; i < len; i++) {
      toNode.appendChild(this.nodes[i]);
    }
  };

  /**
   * @param {Element} toNode
   */
  Monkberry.View.prototype.insertBefore = function (toNode) {
    if (toNode.parentNode) {
      for (var i = 0, len = this.nodes.length; i < len; i++) {
        toNode.parentNode.insertBefore(this.nodes[i], toNode);
      }
    } else {
      throw new Error(
        "Can not insert child view into parent node. " +
        "You need append your view first and then update."
      );
    }
  };

  /**
   * Return rendered node, or DocumentFragment of rendered nodes if more then one root node in template.
   * @returns {Element|DocumentFragment}
   */
  Monkberry.View.prototype.createDocument = function () {
    if (this.nodes.length == 1) {
      return this.nodes[0];
    } else {
      var fragment = document.createDocumentFragment();
      for (var i = 0, len = this.nodes.length; i < len; i++) {
        fragment.appendChild(this.nodes[i]);
      }
      return fragment;
    }
  };

  /**
   * @deprecated since version 3.1.0. Use createDocument() instead.
   * @returns {Element|DocumentFragment}
   */
  Monkberry.View.prototype.dom = function () {
    return this.createDocument();
  };

  /**
   * Remove view from DOM.
   * @param {boolean} force - If true, do not put this view into pool.
   */
  Monkberry.View.prototype.remove = function (force) {
    force = force || false;
    // Remove appended nodes.
    var i = this.nodes.length;
    while (i--) {
      this.nodes[i].parentNode.removeChild(this.nodes[i]);
    }
    // Remove self from parent's children map or child ref.
    if (this.onRemove) {
      this.onRemove();
    }
    // Remove all nested views.
    i = this.nested.length;
    while (i--) {
      this.nested[i].remove(force);
    }
    // Remove this view from parent's nested views.
    if (this.parent) {
      i = this.parent.nested.indexOf(this);
      this.parent.nested.splice(i, 1);
    }
    // Store view in pool for reuse in future.
    if (!force) {
      this.pool.push(this.name, this);
    }
  };

  /**
   * @param {string} id
   * @returns {Element}
   * @deprecated Use querySelector instead of.
   */
  Monkberry.View.prototype.getElementById = function (id) {
    return this.querySelector('#' + id);
  };

  /**
   * @param {string} query
   * @returns {Element}
   */
  Monkberry.View.prototype.querySelector = function (query) {
    for (var i = 0; i < this.nodes.length; i++) {
      if (this.nodes[i].matches && this.nodes[i].matches(query)) {
        return this.nodes[i];
      }

      if (this.nodes[i].nodeType === 8) {
        throw 'Can not use querySelector with non-element nodes on first level.';
      }

      if (this.nodes[i].querySelector) {
        var element = this.nodes[i].querySelector(query);
        if (element) {
          return element;
        }
      }
    }
    return null;
  };

  /**
   * Pool stores pre rendered views for faster template
   * rendering and removed views for reuseing DOM nodes.
   */
  function Pool() {
    this.store = {};
  }

  Pool.prototype.push = function (name, view) {
    if (!this.store[name]) {
      this.store[name] = [];
    }
    this.store[name].push(view);
  };

  Pool.prototype.pull = function (name) {
    if (this.store[name]) {
      return this.store[name].pop();
    } else {
      return void 0;
    }
  };

  /**
   * Simple Map implementation with length property.
   */
  function Map() {
    this.items = Object.create(null);
    this.length = 0;
    this.next = 0;
  }

  Map.prototype.push = function (element) {
    this.items[this.next] = element;
    this.length += 1;
    this.next += 1;
    return this.next - 1;
  };

  Map.prototype.remove = function (i) {
    if (i in this.items) {
      delete this.items[i];
      this.length -= 1;
    } else {
      throw new Error('You are trying to delete not existing element "' + i + '" form map.');
    }
  };

  Map.prototype.forEach = function (callback) {
    for (var i in this.items) {
      callback(this.items[i]);
    }
  };

  //
  // Helper function for working with foreach loops data.
  // Will transform data for "key, value of array" constructions.
  //

  function transformArray(data, array, keys, i, options) {
    if (options) {
      var t = data;
      t[options.value] = array[i];

      if (options.key) {
        t[options.key] = i;
      }

      return t;
    } else {
      return array[i];
    }
  }

  function transformObject(data, array, keys, i, options) {
    if (options) {
      var t = data;
      t[options.value] = array[keys[i]];

      if (options.key) {
        t[options.key] = keys[i];
      }

      return t;
    } else {
      return array[keys[i]];
    }
  }

  if (typeof module !== "undefined") {
    module.exports = new Monkberry();
  } else {
    window.monkberry = new Monkberry();
  }
})(window.document);
