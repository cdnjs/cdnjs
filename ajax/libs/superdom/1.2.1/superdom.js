let dom = (function nodeSelector () {
  // Convert a function into a property selector
  let DOM = sel => DOM[sel];

  // The second-level SELECTOR
  // dom.class.X; dom.class.X = 5; delete.dom.class.X
  // This is NOT matched though: dom.a.X
  let derivated = (selector, orig) => new Proxy(orig, {
    get: (orig, name) => {
      return DOM[selector(name)];
    }, set: (orig, name, value) => {
      DOM[selector(name)] = value;
      return true;
    }, deleteProperty: (orig, name) => {
      delete DOM[selector(name)];
      return true;
    }
  });

  // First level SELECTOR
  // dom.button || dom.class
  let getter = (orig, key) => {
    if (key in orig) return orig[key];

    // Allow extending the API
    if (key in orig.api.selectors) {
      return derivated(orig.api.selectors[key], orig);
    }

    return orig.api.array(orig.api.selectors(key));
  };

  let setter = (orig, key, value) => {
    let cb = DOM.api.fn(value, true);
    DOM[key].each(node => node.parentNode.replaceChild(cb(node)[0], node));
  };

  let deletter = (base, key) => {
    DOM[key].forEach(n => n.remove());
    return true;
  };

  DOM.api = {};

  // CANNOT SIMPLIFY TO return new Proxy() => ERROR WTF?
  DOM = new Proxy(DOM, {
    get: getter,
    set: setter,
    deleteProperty: deletter
  });

  return DOM;
})();

// Second level selector
// let a = dom.a.href; dom.a.href = '...'; delete dom.a.href;
dom = (function Attributes (DOM) {
  // Obtain a callback from the attribute passed, whatever the type
  DOM.api.fn = (value, parse = false) => {
    let cb = node => parse ? DOM(value) : value;
    if (value instanceof Function) cb = value;
    return cb;
  };

  // Returns something that is not a list of nodes, so keep them in reference
  DOM.api.proxify = (proxify, nodes, key) => {
    proxify._ = { ref: nodes, attr: key };
    return DOM.api.values(proxify);
  };

  DOM.api.array = nodes => {
    let getter = (orig, key) => {
      // Array original function: dom.a.map()
      if (key in orig) {
        return orig[key];
      }

      // Nodes API function: dom.a.class, dom.a.on
      if (key in DOM.api.nodes) {
        let nodeCb = DOM.api.nodes[key];
        if (nodeCb.get) nodeCb = nodeCb.get;
        let newNodes = nodes.map((nodes, i, all) => nodeCb(nodes, i, all));
        return DOM.api.proxify(newNodes, nodes, key);
      }

      // Navigation API function: dom.a.parent
      if (key in DOM.api.navigate) {
        let cb = DOM.api.navigate[key];
        // Make it into a simple array if an array of arrays was returned
        let newNodes = nodes.map(cb).reduce((all, one) => {
          return all.concat(one);
        }, []).filter(n => n);
        return DOM.api.array(newNodes);
      }

      // Defaults to the attribute: dom.a.href
      let newNodes = nodes.map(node => node.getAttribute(key) || '');
      return DOM.api.proxify(newNodes, nodes, key);
    };

    // Setting the array; convert to fn and then proceed
    let setter = (orig, key, value) => {
      let cb = DOM.api.fn(value);
      let nodeCb = DOM.api.nodes[key];
      if (nodeCb) {
        if (nodeCb.set) nodeCb = nodeCb.set;
        orig.map((node, i, all) => nodeCb(cb, node, i, all));
        return true;
      }

      if (value instanceof Function) {
        cb = (node, i, orig) => value(node.getAttribute(key) || '', i, orig);
      } else {
        cb = node => value;
      }
      orig.forEach((node, i, orig) => node.setAttribute(key, cb(node, i, orig) || ''));
    };

    let deletter = (orig, key) => {
      let cb = el => el.removeAttribute(key);
      if (DOM.api.nodes[key] && DOM.api.nodes[key].del) {
        cb = DOM.api.nodes[key].del;
      }
      orig.forEach(cb);
      return true;
    };

    return new Proxy(nodes, {
      get: getter,
      set: setter,
      deleteProperty: deletter
    });
  };

  return DOM;
})(dom);

// Derivated attribute (when it was Nodes and not Navigate)
// let a = dom.a.class.demo; dom.a.class.demo = true; delete dom.a.class.demo
dom = (function Values (DOM) {
  let specialAttrs = {
    _flat: lists => [...new Set([].concat.apply([], lists))],
    _text: lists => [...new Set([].concat.apply([], lists))].join(' ')
  };

  DOM.api.values = attributes => {
    // dom.a.href._blank; dom.a.class.bla
    let getter = (orig, key) => {
      if (key in orig || typeof orig[key] !== 'undefined') {
        return orig[key];
      }
      let nodes = orig._.ref;
      let cb = DOM.api.attributes[orig._.attr];
      if (cb && cb.get) {
        cb = cb.get;
        orig.map((attr, i, all) => cb(attr, key, nodes[i], i, all));
      }
      if (key in specialAttrs) {
        return specialAttrs[key](orig);
      }
      // TODO: personalized attr (such as in parent)
      return specialAttrs._flat(orig).includes(key);
    };

    // dom.a.class.bla = false; dom.a.href._blank = false;
    let setter = (orig, key, value) => {
      let nodes = orig._.ref;
      let attrCb = DOM.api.attributes[orig._.attr];
      if (attrCb) {
        if (attrCb.set) attrCb = attrCb.set;
        orig.map((attr, i, all) => attrCb(DOM.api.fn(value), key, nodes[i], i, all));
      }
      return true;
    };

    let deletter = (orig, key) => {
      let nodes = orig._.ref;
      let attrCb = DOM.api.attributes[orig._.attr].del;
      if (attrCb) {
        orig.map((attr, i, all) => attrCb(key, nodes[i], i, all));
      }
      return true;
    };

    return new Proxy(attributes, {
      get: getter,
      set: setter,
      deleteProperty: deletter
    });
  };

  return DOM;
})(dom);

if (typeof module !== 'undefined') {
  module.exports = dom;
}

// An attribute handles derivatives from Nodes so it normally has its
// corresponding dom.api.nodes. Example:
//   dom.api.nodes.class => dom.a.class;
//   dom.api.attributes.class => dom.a.class.test = true;
// If it has no dom.api.nodes, then the default getAttribute() will be used
dom.api.attributes = {};

dom.api.attributes.class = {
  // dom.a.class.bla = false; dom.a.class.bla = ['a', 'b'] => true;
  set: (cb, key, node, i, all) => {
    let val = cb(node.classList.contains(key), i, all);
    node.classList[val ? 'add' : 'remove'](key);
  },
  del: (key, node) => {
    node.classList.remove(key);
  }
};

// dom.a.on.click = function(){}
dom.api.attributes.on = (cb, key, node) => {
  dom.api.helpers.args(key).forEach(event => node.addEventListener(event, cb));
};

// dom.a.handle.click = function(){}
dom.api.attributes.handle = (cb, key, node) => {
  dom.api.helpers.args(key).forEach(event => node.addEventListener(event, (...args) => {
    args[0].preventDefault();
    cb(...args);
  }));
};

dom.api.attributes.trigger = {
  get: (prevVal, key, node) => {
    // Accept different types of event names
    dom.api.helpers.args(key).forEach(event => {
      let ev = new CustomEvent(event, { bubbles: true, cancelable: true });
      node.dispatchEvent(ev);
    });
  }
};


dom.api.helpers = {};
dom.api.helpers.args = val => val.split(/[\s,]+/);

// Change the current node selection
dom.api.navigate = {};
dom.api.navigate.parent = node => node.parentNode || false;
dom.api.navigate.children = node => node.children;


// dom.a.each = a => {}
dom.api.nodes = {};
dom.api.nodes.each = (cb, node, i, all) => cb(node, i, all);

dom.api.nodes.html = {
  get: node => node.innerHTML,
  set: (cb, node, i, all) => node.innerHTML = cb(node.innerHTML, i, all) || '',
  del: node => node.innerHTML = ''
};

dom.api.nodes.text = {
  get: node => node.textContent,
  set: (cb, node, i, all) => node.textContent = cb(node.textContent, i, all) || '',
  del: node => node.textContent = ''
};

// dom.a.class; dom.a.class = classes => newClasses; delete dom.a.class
dom.api.nodes.class = {
  get: node => Array.from(node.classList),
  set: (cb, node, i, all) => {
    let val = cb(Array.from(node.classList), i, all);
    val = typeof val === 'string' ? dom.api.helpers.args(val) : val;
    val.forEach(one => node.classList.add(one));
  }
};


// Selector-level extensible

// Choose which method to use
dom.api.selectors = (name = '') => name instanceof Element
  ? [name]  // Already a node, just keep it
  : /^\s*\</.test(name)
    ? dom.api.selectors.generate(name)
    : [...document.querySelectorAll(name)];

// The one to generate a chunk of html
dom.api.selectors.generate = html => {
  let type = /^\s*<t(h|r|d)/.test(html) ? 'table' : 'div';
  let cont = document.createElement(type);
  cont.innerHTML = html.replace(/^\s*/, '').replace(/\s*$/, '');
  return [...cont.childNodes];
};

// Some custom selectors:
dom.api.selectors.id = name => `#${name}`;
dom.api.selectors.class = name => `.${name}`;
dom.api.selectors.attr = name => `[${name}]`;

