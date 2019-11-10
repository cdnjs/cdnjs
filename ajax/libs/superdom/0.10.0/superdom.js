var dom = (function nodeSelector () {
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
    if (key in orig.api.selectors) return derivated(orig.api.selectors[key], orig);
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

  DOM.api = {
    nodes: {}
  };

  // CANNOT SIMPLIFY TO return new Proxy() => ERROR WTF?
  DOM = new Proxy(DOM, {
    get: getter,
    set: setter,
    deleteProperty: deletter
  });

  return DOM;
})(dom);

// Second level selector
dom = (function Attributes (DOM) {
  // Obtain a callback from the attribute passed, whatever the type
  DOM.api.fn = (value, parse = false) => {
    let cb = node => parse ? DOM(value) : value;
    if (value instanceof Function) cb = value;
    return cb;
  };

  DOM.api.array = nodes => {
    let getter = (orig, key) => {
      if (key in orig) return orig[key];

      let proxify = (() => {
        let nodeCb = dom.api.nodes[key];
        if (nodeCb) {
          if (nodeCb.get) nodeCb = nodeCb.get;
          return nodes.map((nodes, i, all) => nodeCb(nodes, i, all));
        }
        return nodes.map(node => node.getAttribute(key) || undefined);
      })();

      proxify._ = { ref: nodes, attr: key };
      return DOM.api.values(proxify);
    };

    // Setting the array; convert to fn and then proceed
    let setter = (orig, key, value) => {
      let nodeCb = dom.api.nodes[key];
      if (nodeCb) {
        if (nodeCb.set) nodeCb = nodeCb.set;
        orig.map((node, i, all) => nodeCb(DOM.api.fn(value), node, i, all));
        return true;
      }
    };

    let deletter = (orig, key) => {
      let cb = el => el.removeAttribute(key);
      if (dom.api.nodes[key] && dom.api.nodes[key].del) {
        cb = dom.api.nodes[key].del;
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

dom = (function Values (DOM) {
  var specialAttrs = {
    _flat: lists => [...new Set([].concat.apply([], lists))],
    _text: lists => [...new Set([].concat.apply([], lists))].join(' ')
  };

  DOM.api.values = attributes => {
    // dom.a.href._blank; dom.a.class.bla
    let getter = (attrs, key) => {
      if (key in attrs || typeof attrs[key] !== 'undefined') {
        return attrs[key];
      }
      if (key in specialAttrs) {
        return specialAttrs[key](attrs);
      }
      // TODO: personalized attr (such as in parent)
      return specialAttrs._flat(attrs).includes(key);
      // console.log("Called", attrs.map(node => node.getAttribute(key)));
      // return attrs.map(node => node.getAttribute(key));
    };

    // dom.a.class.bla = false; dom.a.href._blank = false;
    let setter = (attrs, key, value) => {
      let nodes = attrs._.ref;
      let attrCb = dom.api.attribute[attrs._.attr];
      if (attrCb) {
        if (attrCb.set) attrCb = attrCb.set;
        attrs.map((attr, i, all) => attrCb(DOM.api.fn(value), key, nodes[i], i, all));
      }
      return true;
    };

    let deletter = (orig, key) => {
      let nodes = orig._.ref;
      let attrCb = dom.api.attribute[orig._.attr].del;
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

// Extensible! Yay!

// Selector-level extensible
dom.api.selectors = (name = '') => /^\s*\</.test(name)
  ? dom.api.generate(name)
  : [...document.querySelectorAll(name)];
dom.api.selectors.id = name => `#${name}`;
dom.api.selectors.class = name => `.${name}`;
dom.api.selectors.attr = name => `[${name}]`;

dom.api.generate = html => {
  var type = /^\s*<t(h|r|d)/.test(html) ? 'table' : 'div';
  var cont = document.createElement(type);
  cont.innerHTML = html.replace(/^\s*/, '').replace(/\s*$/, '');
  return [...cont.childNodes];
};

// NodeList-level getter
// dom.a()
dom.api.nodes = nodes => nodes;

// dom.a.each = a => {}
dom.api.nodes.each = (cb, node, i, all) => cb(node, i, all);

dom.api.nodes.html = {
  get: node => node.innerHTML,
  set: (cb, node, i, all) => node.innerHTML = cb(node.innerHTML, i, all) || '',
  del: node => node.innerHTML = ''
};

// dom.a.class; dom.a.class = classes => newClasses; delete dom.a.class
dom.api.nodes.class = {
  get: node => Array.from(node.classList),
  set: (cb, node, i, all) => {
    let val = cb(Array.from(node.classList), i, all);
    val = typeof val === 'string' ? val.split(/[\s,]+/) : val;
    val.forEach(one => node.classList.add(one));
  }
};

dom.api.attribute = {};

dom.api.attribute.class = {
  // dom.a.class.bla = false; dom.a.class.bla = ['a', 'b'] => true;
  set: (cb, key, node, i, all) => {
    let val = cb(node.classList.contains(key), i, all);
    node.classList[val ? 'add' : 'remove'](key);
  },
  del: (key, node) => {
    node.classList.remove(key);
  }
};

dom.api.alias = {};
// dom.api.alias.html = 'innerHTML';
dom.api.alias.text = 'textContent';

// let html = dom.a.html; dom.a.html = 'bla'; dom.a.html = html => ''; delete dom.a.html;
// dom.api.nodes.html = {
//   get: (node, i, all) => node.innerHTML,
//   set: (cb, node, i, all) => node.innerHTML = cb(node.innerHTML, i, all) || '',
//   delete: (node, i, all) => node.innerHTML = ''
// };
// dom.api.nodes.html = (cb, node, i, all) => node.innerHTML = cb(node.innerHTML, i, all) || '';
dom.api.nodes.text = (cb, node, i, all) => node.textContent = cb(node.textContent, i, all) || '';

// NodeList-level setter
dom.api.replace = (nodes, value) => {};

if (module) {
  module.exports = dom;
}
