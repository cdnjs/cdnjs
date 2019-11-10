/*eslint padded-blocks: 0*/
var dom = new Proxy((() => {

  var specialClasses = {
    _flat: lists => [].concat.apply([], lists),
    _text: lists => [].concat.apply([], lists).join(' ')
  };

  // GET dom.a.class.bla; SET dom.a.class.bla = true; DELETE dom.a.class.bla
  var classes = {
    // Get whether a specific class is set or not
    get: (lists, key) => key in lists
      ? lists[key]
      : key in specialClasses
        ? specialClasses[key](lists)
        : lists.filter(list => list.includes(key)).length > 0
    ,
    // Set or remove a specific class
    set: (lists, key, value) =>
      !lists._.ref.forEach(el =>
        el.classList[value ? 'add' : 'remove'](key)
      )
    ,
    // Remove a specific class
    deleteProperty: (lists, key) =>
      !lists._.forEach(el =>
        el.classList.remove(key)
      )
  };

  var attributes = {
    get: (els, key) => els.map(el => el.getAttribute(key)),
    set: (els, key, value) => !els.forEach((el, i) => {
      var auto = !(value instanceof Function) ? () => value : value;
      el.setAttribute(key, auto(el.getAttribute(key) || '', i, el));
    }),
    deleteProperty: (els, key) => !els.forEach(el => el.removeAttribute(key))
  };



  // GET dom.a.html; SET dom.a.html = 5; DELETE dom.a.html
  var dom_handler = {
    get: (els, key) => {
      if (els[key]) return els[key]; // keep array functions
      if (!els.length) return;
      if (key in attr_alias) key = attr_alias[key];

      if (key in dom_proxies) {
        if (key === 'class') {
          var parts = els.map(el => Array.from(el.classList));
          parts._ = { ref: els };
          return new Proxy(parts, dom_proxies[key]);
        }
        return new Proxy(els, dom_proxies[key]);
      }

      if (key in recursive) {
        // Make it recursive again
        return new Proxy(els.reduce(recursive[key], []), dom_handler);
      }

      var attrs = els.map(el => el.getAttribute(key) || el[key]);
      attrs._ = { ref: els };
      return new Proxy(attrs, {
        get: (list, key) => key in list
          ? list[key]
          : list.includes(key)
      });
    },
    set: (els, key, value) => {
      if (els[key]) return els[key]; // keep array functions
      if (!els.length) return;
      if (key in attr_alias) key = attr_alias[key];

      var auto = !(value instanceof Function) ? () => value : value;
      var setEach = (el, i) => {
        if (key in el) {
          return el[key] = auto(el[key], i);
        }
        return el.setAttribute(key, auto(el[key], i));
      }
      if (key === 'class') setEach = (el, i) => el.classList.add(value);

      return !els.forEach(setEach);
    },
    deleteProperty: (els, key) => {
      if (els[key]) return els[key]; // keep array functions
      if (!els.length) return;
      if (key in attr_alias) key = attr_alias[key];

      return !els.forEach(el => el[key] = '');
    }
  };

  // From umbrella.js (http://umbrellajs.com/)
  var initial = html => {
    var type = /^\s*<t(h|r|d)/.test(html) ? 'table' : 'div';
    var container = document.createElement(type);
    container.innerHTML = html;
    return Array.from(container.childNodes);
  };

  // dom.a = '<span>Hi there</span>'
  initial.set = (nodes, value) => {
    if (typeof value === 'string') {
      value = dom(value);
    }
    if (value instanceof Array) {
      value = value.reduce((frag, val) => {
        frag.appendChild(val).parentNode;
        return frag;
      }, document.createDocumentFragment());
    }
    //nodes.forEach(node => node.parentNode.replaceChild(value, node));

    var auto = !(value instanceof Function)
      ? node => value : node => dom(value(node))[0];
    console.log("Auto:", auto(value));
    nodes.forEach(node => node.parentNode.replaceChild(auto(node), node));
    return true;
  };

  // var as = dom.a
  initial.get = (base, key) => {
    var toReturn;
    switch (key) {
      case 'id':
        toReturn = new Proxy(base, {
          get: (t, key) => dom['#' + key],
          set: (t, key, value) => { dom['#' + key] = value; return true; },
          deleteProperty: (t, key) => { delete dom['#' + key]; return true; }
        });
        break;
      case 'class':
        toReturn = new Proxy(base, {
          get: (t, key) => dom['.' + key],
          set: (t, key, value) => { dom['.' + key] = value; return true; },
          deleteProperty: (t, key) => { delete dom['.' + key]; return true; }
        });
        break;
      case 'attr':
        toReturn = new Proxy(base, {
          get: (t, key) => dom[`[${key}]`],
          set: (t, key, value) => { dom[`[${key}]`] = value; return true; },
          deleteProperty: (t, key) => { delete dom[`[${key}]`]; return true; }
        });
        break;
      default:
        if (/^\s*\</.test(key)) toReturn = dom(key);
        else {
          var objs = Array.from(document.querySelectorAll(key));
          toReturn = new Proxy(objs, dom_handler);
        }
    }
    return toReturn;
  };

  var dom_proxies = {
    attr: attributes,
    class: classes
  };

  var recursive = {
    parentNode: (all, el) => {
      var parent = el.parentNode;
      if (parent.nodeName === '#document')
        return all;
      return all.concat(parent);
    },
    children: (all, el) => all.concat(Array.from(el.children))
  };

  var attr_alias = {
    html: 'innerHTML',
    text: 'textContent',
    parent: 'parentNode'
  };

  return initial;
})(), {
  get: (base, key) => base.get(base, key),
  set: (base, key, value) => base.set(dom[key], value),
  deleteProperty: (base, key) => dom[key].forEach(n => n.remove())
});
