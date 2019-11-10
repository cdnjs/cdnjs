// Umbrella JS  http://umbrellajs.com/
// -----------
// Small, lightweight jQuery alternative
// @author Francisco Presencia Fandos https://francisco.io/
// @inspiration http://youmightnotneedjquery.com/

// Initialize the library
var u = function (parameter, context) {
  // Make it an instance of u() to avoid needing 'new' as in 'new u()' and just
  // use 'u().bla();'.
  // @reference http://stackoverflow.com/q/24019863
  // @reference http://stackoverflow.com/q/8875878
  if (!(this instanceof u)) {
    return new u(parameter, context);
  }

  // No need to further processing it if it's already an instance
  if (parameter instanceof u) {
    return parameter;
  }

  // Parse it as a CSS selector if it's a string
  if (typeof parameter === 'string') {
    parameter = this.select(parameter, context);
  }

  // If we're referring a specific node as in on('click', function(){ u(this) })
  // or the select() function returned a single node such as in '#id'
  if (parameter && parameter.nodeName) {
    parameter = [parameter];
  }

  // Convert to an array, since there are many 'array-like' stuff in js-land
  this.nodes = this.slice(parameter);
};

// Map u(...).length to u(...).nodes.length
u.prototype = {
  get length () {
    return this.nodes.length;
  }
};

// This made the code faster, read "Initializing instance variables" in
// https://developers.google.com/speed/articles/optimizing-javascript
u.prototype.nodes = [];

// Add class(es) to the matched nodes
u.prototype.addClass = function () {
  return this.eacharg(arguments, function (el, name) {
    el.classList.add(name);
  });
};


// [INTERNAL USE ONLY]
// Add text in the specified position. It is used by other functions
u.prototype.adjacent = function (html, data, callback) {
  if (typeof data === 'number') {
    if (data === 0) {
      data = [];
    } else {
      data = new Array(data).join().split(',').map(Number.call, Number);
    }
  }

  // Loop through all the nodes. It cannot reuse the eacharg() since the data
  // we want to do it once even if there's no "data" and we accept a selector
  return this.each(function (node, j) {
    var fragment = document.createDocumentFragment();

    // Allow for data to be falsy and still loop once
    u(data || {}).map(function (el, i) {
      // Allow for callbacks that accept some data
      var part = (typeof html === 'function') ? html.call(this, el, i, node, j) : html;

      if (typeof part === 'string') {
        return this.generate(part);
      }

      return u(part);
    }).each(function (n) {
      this.isInPage(n)
        ? fragment.appendChild(u(n).clone().first())
        : fragment.appendChild(n);
    });

    callback.call(this, node, fragment);
  });
};

// Add some html as a sibling after each of the matched elements.
u.prototype.after = function (html, data) {
  return this.adjacent(html, data, function (node, fragment) {
    node.parentNode.insertBefore(fragment, node.nextSibling);
  });
};


// Add some html as a child at the end of each of the matched elements.
u.prototype.append = function (html, data) {
  return this.adjacent(html, data, function (node, fragment) {
    node.appendChild(fragment);
  });
};


// [INTERNAL USE ONLY]

// Normalize the arguments to an array of strings
// Allow for several class names like "a b, c" and several parameters
u.prototype.args = function (args, node, i) {
  if (typeof args === 'function') {
    args = args(node, i);
  }

  // First flatten it all to a string http://stackoverflow.com/q/22920305
  // If we try to slice a string bad things happen: ['n', 'a', 'm', 'e']
  if (typeof args !== 'string') {
    args = this.slice(args).map(this.str(node, i));
  }

  // Then convert that string to an array of not-null strings
  return args.toString().split(/[\s,]+/).filter(function (e) {
    return e.length;
  });
};


// Merge all of the nodes that the callback return into a simple array
u.prototype.array = function (callback) {
  callback = callback;
  var self = this;
  return this.nodes.reduce(function (list, node, i) {
    var val;
    if (callback) {
      val = callback.call(self, node, i);
      if (!val) val = false;
      if (typeof val === 'string') val = u(val);
      if (val instanceof u) val = val.nodes;
    } else {
      val = node.innerHTML;
    }
    return list.concat(val !== false ? val : []);
  }, []);
};


// [INTERNAL USE ONLY]

// Handle attributes for the matched elements
u.prototype.attr = function (name, value, data) {
  data = data ? 'data-' : '';

  // This will handle those elements that can accept a pair with these footprints:
  // .attr('a'), .attr('a', 'b'), .attr({ a: 'b' })
  return this.pairs(name, value, function (node, name) {
    return node.getAttribute(data + name);
  }, function (node, name, value) {
    node.setAttribute(data + name, value);
  });
};


// Add some html before each of the matched elements.
u.prototype.before = function (html, data) {
  return this.adjacent(html, data, function (node, fragment) {
    node.parentNode.insertBefore(fragment, node);
  });
};


// Get the direct children of all of the nodes with an optional filter
u.prototype.children = function (selector) {
  return this.map(function (node) {
    return this.slice(node.children);
  }).filter(selector);
};


/**
 * Deep clone a DOM node and its descendants.
 * @return {[Object]}         Returns an Umbrella.js instance.
 */
u.prototype.clone = function () {
  return this.map(function (node, i) {
    var clone = node.cloneNode(true);
    var dest = this.getAll(clone);

    this.getAll(node).each(function (src, i) {
      for (var key in this.mirror) {
        if (this.mirror[key]) {
          this.mirror[key](src, dest.nodes[i]);
        }
      }
    });

    return clone;
  });
};

/**
 * Return an array of DOM nodes of a source node and its children.
 * @param  {[Object]} context DOM node.
 * @param  {[String]} tag     DOM node tagName.
 * @return {[Array]}          Array containing queried DOM nodes.
 */
u.prototype.getAll = function getAll (context) {
  return u([context].concat(u('*', context).nodes));
};

// Store all of the operations to perform when cloning elements
u.prototype.mirror = {};

/**
 * Copy all JavaScript events of source node to destination node.
 * @param  {[Object]} source      DOM node
 * @param  {[Object]} destination DOM node
 * @return {[undefined]]}
 */
u.prototype.mirror.events = function (src, dest) {
  if (!src._e) return;

  for (var type in src._e) {
    src._e[type].forEach(function (event) {
      u(dest).on(type, event);
    });
  }
};

/**
 * Copy select input value to its clone.
 * @param  {[Object]} src  DOM node
 * @param  {[Object]} dest DOM node
 * @return {[undefined]}
 */
u.prototype.mirror.select = function (src, dest) {
  if (u(src).is('select')) {
    dest.value = src.value;
  }
};

/**
 * Copy textarea input value to its clone
 * @param  {[Object]} src  DOM node
 * @param  {[Object]} dest DOM node
 * @return {[undefined]}
 */
u.prototype.mirror.textarea = function (src, dest) {
  if (u(src).is('textarea')) {
    dest.value = src.value;
  }
};


// Find the first ancestor that matches the selector for each node
u.prototype.closest = function (selector) {
  return this.map(function (node) {
    // Keep going up and up on the tree. First element is also checked
    do {
      if (u(node).is(selector)) {
        return node;
      }
    } while ((node = node.parentNode) && node !== document);
  });
};


// Handle data-* attributes for the matched elements
u.prototype.data = function (name, value) {
  return this.attr(name, value, true);
};


// Loops through every node from the current call
u.prototype.each = function (callback) {
  // By doing callback.call we allow "this" to be the context for
  // the callback (see http://stackoverflow.com/q/4065353 precisely)
  this.nodes.forEach(callback.bind(this));

  return this;
};


// [INTERNAL USE ONLY]
// Loop through the combination of every node and every argument passed
u.prototype.eacharg = function (args, callback) {
  return this.each(function (node, i) {
    this.args(args, node, i).forEach(function (arg) {
      // Perform the callback for this node
      // By doing callback.call we allow "this" to be the context for
      // the callback (see http://stackoverflow.com/q/4065353 precisely)
      callback.call(this, node, arg);
    }, this);
  });
};


// Remove all children of the matched nodes from the DOM.
u.prototype.empty = function () {
  return this.each(function (node) {
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }
  });
};


// .filter(selector)
// Delete all of the nodes that don't pass the selector
u.prototype.filter = function (selector) {
  // The default function if it's a css selector
  // Cannot change name to 'selector' since it'd mess with it inside this fn
  var callback = function (node) {
    // Make it compatible with some other browsers
    node.matches = node.matches || node.msMatchesSelector || node.webkitMatchesSelector;

    // Check if it's the same element (or any element if no selector was passed)
    return node.matches(selector || '*');
  };

  // filter() receives a function as in .filter(e => u(e).children().length)
  if (typeof selector === 'function') callback = selector;

  // filter() receives an instance of Umbrella as in .filter(u('a'))
  if (selector instanceof u) {
    callback = function (node) {
      return (selector.nodes).indexOf(node) !== -1;
    };
  }

  // Just a native filtering function for ultra-speed
  return u(this.nodes.filter(callback));
};


// Find all the nodes children of the current ones matched by a selector
u.prototype.find = function (selector) {
  return this.map(function (node) {
    return u(selector || '*', node);
  });
};


// Get the first of the nodes
u.prototype.first = function () {
  return this.nodes[0] || false;
};


// [INTERNAL USE ONLY]
// Generate a fragment of HTML. This irons out the inconsistences
u.prototype.generate = function (html) {
  // Table elements need to be child of <table> for some f***ed up reason
  if (/^\s*<tr[> ]/.test(html)) {
    return u(document.createElement('table')).html(html).children().children().nodes;
  } else if (/^\s*<t(h|d)[> ]/.test(html)) {
    return u(document.createElement('table')).html(html).children().children().children().nodes;
  } else if (/^\s*</.test(html)) {
    return u(document.createElement('div')).html(html).children().nodes;
  } else {
    return document.createTextNode(html);
  }
};

// Change the default event for the callback. Simple decorator to preventDefault
u.prototype.handle = function () {
  var args = this.slice(arguments).map(function (arg) {
    if (typeof arg === 'function') {
      return function (e) {
        e.preventDefault();
        arg.apply(this, arguments);
      };
    }
    return arg;
  }, this);

  return this.on.apply(this, args);
};


// Find out whether the matched elements have a class or not
u.prototype.hasClass = function () {
  // Check if any of them has all of the classes
  return this.is('.' + this.args(arguments).join('.'));
};


// Set or retrieve the html from the matched node(s)
u.prototype.html = function (text) {
  // Needs to check undefined as it might be ""
  if (text === undefined) {
    return this.first().innerHTML || '';
  }

  // If we're attempting to set some text
  // Loop through all the nodes
  return this.each(function (node) {
    // Set the inner html to the node
    node.innerHTML = text;
  });
};


// Check whether any of the nodes matches the selector
u.prototype.is = function (selector) {
  return this.filter(selector).length > 0;
};


/**
 * Internal use only. This function checks to see if an element is in the page's body. As contains is inclusive and determining if the body contains itself isn't the intention of isInPage this case explicitly returns false.
https://developer.mozilla.org/en-US/docs/Web/API/Node/contains
 * @param  {[Object]}  node DOM node
 * @return {Boolean}        The Node.contains() method returns a Boolean value indicating whether a node is a descendant of a given node or not.
 */
u.prototype.isInPage = function isInPage (node) {
  return (node === document.body) ? false : document.body.contains(node);
};

  // Get the last of the nodes
u.prototype.last = function () {
  return this.nodes[this.length - 1] || false;
};


// Merge all of the nodes that the callback returns
u.prototype.map = function (callback) {
  return callback ? u(this.array(callback)).unique() : this;
};


// Delete all of the nodes that equals the filter
u.prototype.not = function (filter) {
  return this.filter(function (node) {
    return !u(node).is(filter || true);
  });
};


// Removes the callback to the event listener for each node
u.prototype.off = function (events) {
  return this.eacharg(events, function (node, event) {
    u(node._e ? node._e[event] : []).each(function (cb) {
      node.removeEventListener(event, cb);
    });
  });
};


// Attach a callback to the specified events
u.prototype.on = function (events, cb, cb2) {
  if (typeof cb === 'string') {
    var sel = cb;
    cb = function (e) {
      var args = arguments;
      u(e.currentTarget).find(sel).each(function (target) {
        if (target === e.target || target.contains(e.target)) {
          try {
            Object.defineProperty(e, 'currentTarget', {
              get: function () {
                return target;
              }
            });
          } catch (err) {}
          cb2.apply(target, args);
        }
      });
    };
  }

  // Add the custom data as arguments to the callback
  var callback = function (e) {
    return cb.apply(this, [e].concat(e.detail || []));
  };

  return this.eacharg(events, function (node, event) {
    node.addEventListener(event, callback);

    // Store it so we can dereference it with `.off()` later on
    node._e = node._e || {};
    node._e[event] = node._e[event] || [];
    node._e[event].push(callback);
  });
};


// [INTERNAL USE ONLY]

// Take the arguments and a couple of callback to handle the getter/setter pairs
// such as: .css('a'), .css('a', 'b'), .css({ a: 'b' })
u.prototype.pairs = function (name, value, get, set) {
  // Convert it into a plain object if it is not
  if (typeof value !== 'undefined') {
    var nm = name;
    name = {};
    name[nm] = value;
  }

  if (typeof name === 'object') {
    // Set the value of each one, for each of the { prop: value } pairs
    return this.each(function (node) {
      for (var key in name) {
        set(node, key, name[key]);
      }
    });
  }

  // Return the style of the first one
  return this.length ? get(this.first(), name) : '';
};

// [INTERNAL USE ONLY]

// Parametize an object: { a: 'b', c: 'd' } => 'a=b&c=d'
u.prototype.param = function (obj) {
  return Object.keys(obj).map(function (key) {
    return this.uri(key) + '=' + this.uri(obj[key]);
  }.bind(this)).join('&');
};

// Travel the matched elements one node up
u.prototype.parent = function (selector) {
  return this.map(function (node) {
    return node.parentNode;
  }).filter(selector);
};


// Add nodes at the beginning of each node
u.prototype.prepend = function (html, data) {
  return this.adjacent(html, data, function (node, fragment) {
    node.insertBefore(fragment, node.firstChild);
  });
};


// Delete the matched nodes from the DOM
u.prototype.remove = function () {
  // Loop through all the nodes
  return this.each(function (node) {
    // Perform the removal only if the node has a parent
    if (node.parentNode) {
      node.parentNode.removeChild(node);
    }
  });
};


// Removes a class from all of the matched nodes
u.prototype.removeClass = function () {
  // Loop the combination of each node with each argument
  return this.eacharg(arguments, function (el, name) {
    // Remove the class using the native method
    el.classList.remove(name);
  });
};


// Replace the matched elements with the passed argument.
u.prototype.replace = function (html, data) {
  var nodes = [];
  this.adjacent(html, data, function (node, fragment) {
    nodes = nodes.concat(this.slice(fragment.children));
    node.parentNode.replaceChild(fragment, node);
  });
  return u(nodes);
};


// Scroll to the first matched element
u.prototype.scroll = function () {
  this.first().scrollIntoView({ behavior: 'smooth' });
  return this;
};


// [INTERNAL USE ONLY]
// Select the adecuate part from the context
u.prototype.select = function (parameter, context) {
  // Allow for spaces before or after
  parameter = parameter.replace(/^\s*/, '').replace(/\s*$/, '');

  if (/^</.test(parameter)) {
    return u().generate(parameter);
  }

  return (context || document).querySelectorAll(parameter);
};


// Convert forms into a string able to be submitted
// Original source: http://stackoverflow.com/q/11661187
u.prototype.serialize = function () {
  var self = this;

  // Store the class in a variable for manipulation
  return this.slice(this.first().elements).reduce(function (query, el) {
    // We only want to match enabled elements with names, but not files
    if (!el.name || el.disabled || el.type === 'file') return query;

    // Ignore the checkboxes that are not checked
    if (/(checkbox|radio)/.test(el.type) && !el.checked) return query;

    // Handle multiple selects
    if (el.type === 'select-multiple') {
      u(el.options).each(function (opt) {
        if (opt.selected) {
          query += '&' + self.uri(el.name) + '=' + self.uri(opt.value);
        }
      });
      return query;
    }

    // Add the element to the object
    return query + '&' + self.uri(el.name) + '=' + self.uri(el.value);
  }, '').slice(1);
};


// Travel the matched elements at the same level
u.prototype.siblings = function (selector) {
  return this.parent().children(selector).not(this);
};


// Find the size of the first matched element
u.prototype.size = function () {
  return this.first().getBoundingClientRect();
};


// [INTERNAL USE ONLY]

// Force it to be an array AND also it clones them
// http://toddmotto.com/a-comprehensive-dive-into-nodelists-arrays-converting-nodelists-and-understanding-the-dom/
u.prototype.slice = function (pseudo) {
  // Check that it's not a valid object
  if (!pseudo ||
      pseudo.length === 0 ||
      typeof pseudo === 'string' ||
      pseudo.toString() === '[object Function]') return [];

  // Accept also a u() object (that has .nodes)
  return pseudo.length ? [].slice.call(pseudo.nodes || pseudo) : [pseudo];
};


// [INTERNAL USE ONLY]

// Create a string from different things
u.prototype.str = function (node, i) {
  return function (arg) {
    // Call the function with the corresponding nodes
    if (typeof arg === 'function') {
      return arg.call(this, node, i);
    }

    // From an array or other 'weird' things
    return arg.toString();
  };
};


// Set or retrieve the text content from the matched node(s)
u.prototype.text = function (text) {
  // Needs to check undefined as it might be ""
  if (text === undefined) {
    return this.first().textContent || '';
  }

  // If we're attempting to set some text
  // Loop through all the nodes
  return this.each(function (node) {
    // Set the text content to the node
    node.textContent = text;
  });
};


// Activate/deactivate classes in the elements
u.prototype.toggleClass = function (classes, addOrRemove) {
  /* jshint -W018 */
  // Check if addOrRemove was passed as a boolean
  if (!!addOrRemove === addOrRemove) {
    return this[addOrRemove ? 'addClass' : 'removeClass'](classes);
  }
  /* jshint +W018 */

  // Loop through all the nodes and classes combinations
  return this.eacharg(classes, function (el, name) {
    el.classList.toggle(name);
  });
};


// Call an event manually on all the nodes
u.prototype.trigger = function (events) {
  var data = this.slice(arguments).slice(1);

  return this.eacharg(events, function (node, event) {
    var ev;

    // Allow the event to bubble up and to be cancelable (as default)
    var opts = { bubbles: true, cancelable: true, detail: data };

    try {
      // Accept different types of event names or an event itself
      ev = new window.CustomEvent(event, opts);
    } catch (e) {
      ev = document.createEvent('CustomEvent');
      ev.initCustomEvent(event, true, true, data);
    }

    node.dispatchEvent(ev);
  });
};

// [INTERNAL USE ONLY]

// Removed duplicated nodes, used for some specific methods
u.prototype.unique = function () {
  return u(this.nodes.reduce(function (clean, node) {
    var istruthy = node !== null && node !== undefined && node !== false;
    return (istruthy && clean.indexOf(node) === -1) ? clean.concat(node) : clean;
  }, []));
};

// [INTERNAL USE ONLY]

// Encode the different strings https://gist.github.com/brettz9/7147458
u.prototype.uri = function (str) {
  return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
};


u.prototype.wrap = function (selector) {
  function findDeepestNode (node) {
    while (node.firstElementChild) {
      node = node.firstElementChild;
    }

    return u(node);
  }
  // 1) Construct dom node e.g. u('<a>'),
  // 2) clone the currently matched node
  // 3) append cloned dom node to constructed node based on selector
  return this.map(function (node) {
    return u(selector).each(function (n) {
      findDeepestNode(n)
        .append(node.cloneNode(true));

      node
        .parentNode
        .replaceChild(n, node);
    });
  });
};

// Export it for webpack
if (typeof module === 'object' && module.exports) {
  // Avoid breaking it for `import { u } from ...`. Add `import u from ...`
  module.exports = u;
  module.exports.u = u;
}
