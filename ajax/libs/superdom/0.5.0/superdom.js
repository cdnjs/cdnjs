/*eslint padded-blocks: 0*/
var dom = new Proxy((() => {

  // GET dom.a.class.bla; SET dom.a.class.bla = true; DELETE dom.a.class.bla
  var classes = {
    get: (els, key) => els.filter(el => el.classList.contains(key)).length > 0,
    set: (els, key, value) => !els.forEach(el => el.classList[value ? 'add' : 'remove'](key)),
    deleteProperty: (els, key) => !els.forEach(el => el.classList.remove(key))
  };

  var attributes = {
    get: (els, key) => els.map(el => el.getAttribute(key)),
    set: (els, key, value) => !els.forEach((el, i) => {
      var auto = typeof value === 'string' ? () => value : value;
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

      if (key in dom_proxies) return new Proxy(els, dom_proxies[key]);
      return els.map(el => el[key]);
    },
    set: (els, key, value) => {
      if (els[key]) return els[key]; // keep array functions
      if (!els.length) return;
      if (key in attr_alias) key = attr_alias[key];

      var auto = typeof value === 'string' ? v => value : value;
      var setEach = (el, i) => el[key] = auto(el[key], i);
      if (key === 'class') setEach = (el, i) => el.classList.add(value);
      els.forEach(setEach);
    },
    deleteProperty: (els, key) => {
      if (els[key]) return els[key]; // keep array functions
      if (!els.length) return;
      if (key in attr_alias) key = attr_alias[key];

      els.forEach(el => el[key] = '');
      return true;
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
    nodes.forEach(node => node.parentNode.replaceChild(value, node));
    return true;
  };

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
  var attr_alias = { html: 'innerHTML' };

  return initial;
})(), {
  get: (base, key) => base.get(base, key),
  set: (base, key, value) => base.set(dom[key], value),
  deleteProperty: (base, key) => dom[key].forEach(n => n.remove())
});
