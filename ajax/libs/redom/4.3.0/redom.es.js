function createElement(query, ns) {
  const { tag, id, className } = parse(query);
  const element = ns
    ? document.createElementNS(ns, tag)
    : document.createElement(tag);

  if (id) {
    element.id = id;
  }

  if (className) {
    if (ns) {
      element.setAttribute("class", className);
    } else {
      element.className = className;
    }
  }

  return element;
}

function parse(query) {
  const chunks = query.split(/([.#])/);
  let className = "";
  let id = "";

  for (let i = 1; i < chunks.length; i += 2) {
    switch (chunks[i]) {
      case ".":
        className += ` ${chunks[i + 1]}`;
        break;

      case "#":
        id = chunks[i + 1];
    }
  }

  return {
    className: className.trim(),
    tag: chunks[0] || "div",
    id,
  };
}

function html(query, ...args) {
  let element;

  const type = typeof query;

  if (type === "string") {
    element = createElement(query);
  } else if (type === "function") {
    const Query = query;
    element = new Query(...args);
  } else {
    throw new Error("At least one argument required");
  }

  parseArgumentsInternal(getEl(element), args, true);

  return element;
}

const el = html;
const h = html;

html.extend = function extendHtml(...args) {
  return html.bind(this, ...args);
};

function unmount(parent, _child) {
  let child = _child;
  const parentEl = getEl(parent);
  const childEl = getEl(child);

  if (child === childEl && childEl.__redom_view) {
    // try to look up the view if not provided
    child = childEl.__redom_view;
  }

  if (childEl.parentNode) {
    doUnmount(child, childEl, parentEl);

    parentEl.removeChild(childEl);
  }

  return child;
}

function doUnmount(child, childEl, parentEl) {
  const hooks = childEl.__redom_lifecycle;

  if (hooksAreEmpty(hooks)) {
    childEl.__redom_lifecycle = {};
    return;
  }

  let traverse = parentEl;

  if (childEl.__redom_mounted) {
    trigger(childEl, "onunmount");
  }

  while (traverse) {
    const parentHooks = traverse.__redom_lifecycle || {};

    for (const hook in hooks) {
      if (parentHooks[hook]) {
        parentHooks[hook] -= hooks[hook];
      }
    }

    if (hooksAreEmpty(parentHooks)) {
      traverse.__redom_lifecycle = null;
    }

    traverse = traverse.parentNode;
  }
}

function hooksAreEmpty(hooks) {
  if (hooks == null) {
    return true;
  }
  for (const key in hooks) {
    if (hooks[key]) {
      return false;
    }
  }
  return true;
}

/* global Node, ShadowRoot */


const hookNames = ["onmount", "onremount", "onunmount"];
const shadowRootAvailable =
  typeof window !== "undefined" && "ShadowRoot" in window;

function mount(parent, _child, before, replace) {
  let child = _child;
  const parentEl = getEl(parent);
  const childEl = getEl(child);

  if (child === childEl && childEl.__redom_view) {
    // try to look up the view if not provided
    child = childEl.__redom_view;
  }

  if (child !== childEl) {
    childEl.__redom_view = child;
  }

  const wasMounted = childEl.__redom_mounted;
  const oldParent = childEl.parentNode;

  if (wasMounted && oldParent !== parentEl) {
    doUnmount(child, childEl, oldParent);
  }

  if (before != null) {
    if (replace) {
      const beforeEl = getEl(before);

      if (beforeEl.__redom_mounted) {
        trigger(beforeEl, "onunmount");
      }

      parentEl.replaceChild(childEl, beforeEl);
    } else {
      parentEl.insertBefore(childEl, getEl(before));
    }
  } else {
    parentEl.appendChild(childEl);
  }

  doMount(child, childEl, parentEl, oldParent);

  return child;
}

function trigger(el, eventName) {
  if (eventName === "onmount" || eventName === "onremount") {
    el.__redom_mounted = true;
  } else if (eventName === "onunmount") {
    el.__redom_mounted = false;
  }

  const hooks = el.__redom_lifecycle;

  if (!hooks) {
    return;
  }

  const view = el.__redom_view;
  let hookCount = 0;

  view?.[eventName]?.();

  for (const hook in hooks) {
    if (hook) {
      hookCount++;
    }
  }

  if (hookCount) {
    let traverse = el.firstChild;

    while (traverse) {
      const next = traverse.nextSibling;

      trigger(traverse, eventName);

      traverse = next;
    }
  }
}

function doMount(child, childEl, parentEl, oldParent) {
  if (!childEl.__redom_lifecycle) {
    childEl.__redom_lifecycle = {};
  }

  const hooks = childEl.__redom_lifecycle;
  const remount = parentEl === oldParent;
  let hooksFound = false;

  for (const hookName of hookNames) {
    if (!remount) {
      // if already mounted, skip this phase
      if (child !== childEl) {
        // only Views can have lifecycle events
        if (hookName in child) {
          hooks[hookName] = (hooks[hookName] || 0) + 1;
        }
      }
    }
    if (hooks[hookName]) {
      hooksFound = true;
    }
  }

  if (!hooksFound) {
    childEl.__redom_lifecycle = {};
    return;
  }

  let traverse = parentEl;
  let triggered = false;

  if (remount || traverse?.__redom_mounted) {
    trigger(childEl, remount ? "onremount" : "onmount");
    triggered = true;
  }

  while (traverse) {
    const parent = traverse.parentNode;

    if (!traverse.__redom_lifecycle) {
      traverse.__redom_lifecycle = {};
    }

    const parentHooks = traverse.__redom_lifecycle;

    for (const hook in hooks) {
      parentHooks[hook] = (parentHooks[hook] || 0) + hooks[hook];
    }

    if (triggered) {
      break;
    }
    if (
      traverse.nodeType === Node.DOCUMENT_NODE ||
      (shadowRootAvailable && traverse instanceof ShadowRoot) ||
      parent?.__redom_mounted
    ) {
      trigger(traverse, remount ? "onremount" : "onmount");
      triggered = true;
    }
    traverse = parent;
  }
}

function setStyle(view, arg1, arg2) {
  const el = getEl(view);

  if (typeof arg1 === "object") {
    for (const key in arg1) {
      setStyleValue(el, key, arg1[key]);
    }
  } else {
    setStyleValue(el, arg1, arg2);
  }
}

function setStyleValue(el, key, value) {
  el.style[key] = value == null ? "" : value;
}

/* global SVGElement */


const xlinkns = "http://www.w3.org/1999/xlink";

function setAttr(view, arg1, arg2) {
  setAttrInternal(view, arg1, arg2);
}

function setAttrInternal(view, arg1, arg2, initial) {
  const el = getEl(view);

  const isObj = typeof arg1 === "object";

  if (isObj) {
    for (const key in arg1) {
      setAttrInternal(el, key, arg1[key], initial);
    }
  } else {
    const isSVG = el instanceof SVGElement;
    const isFunc = typeof arg2 === "function";

    if (arg1 === "style" && typeof arg2 === "object") {
      setStyle(el, arg2);
    } else if (isSVG && isFunc) {
      el[arg1] = arg2;
    } else if (arg1 === "dataset") {
      setData(el, arg2);
    } else if (!isSVG && (arg1 in el || isFunc) && arg1 !== "list") {
      el[arg1] = arg2;
    } else {
      if (isSVG && arg1 === "xlink") {
        setXlink(el, arg2);
        return;
      }
      if (initial && arg1 === "class") {
        setClassName(el, arg2);
        return;
      }
      if (arg2 == null) {
        el.removeAttribute(arg1);
      } else {
        el.setAttribute(arg1, arg2);
      }
    }
  }
}

function setClassName(el, additionToClassName) {
  if (additionToClassName == null) {
    el.removeAttribute("class");
  } else if (el.classList) {
    el.classList.add(additionToClassName);
  } else if (
    typeof el.className === "object" &&
    el.className &&
    el.className.baseVal
  ) {
    el.className.baseVal =
      `${el.className.baseVal} ${additionToClassName}`.trim();
  } else {
    el.className = `${el.className} ${additionToClassName}`.trim();
  }
}

function setXlink(el, arg1, arg2) {
  if (typeof arg1 === "object") {
    for (const key in arg1) {
      setXlink(el, key, arg1[key]);
    }
  } else {
    if (arg2 != null) {
      el.setAttributeNS(xlinkns, arg1, arg2);
    } else {
      el.removeAttributeNS(xlinkns, arg1, arg2);
    }
  }
}

function setData(el, arg1, arg2) {
  if (typeof arg1 === "object") {
    for (const key in arg1) {
      setData(el, key, arg1[key]);
    }
  } else {
    if (arg2 != null) {
      el.dataset[arg1] = arg2;
    } else {
      delete el.dataset[arg1];
    }
  }
}

function text(str) {
  return document.createTextNode(str != null ? str : "");
}

function parseArgumentsInternal(element, args, initial) {
  for (const arg of args) {
    if (arg !== 0 && !arg) {
      continue;
    }

    const type = typeof arg;

    if (type === "function") {
      arg(element);
    } else if (type === "string" || type === "number") {
      element.appendChild(text(arg));
    } else if (isNode(getEl(arg))) {
      mount(element, arg);
    } else if (arg.length) {
      parseArgumentsInternal(element, arg, initial);
    } else if (type === "object") {
      setAttrInternal(element, arg, null, initial);
    }
  }
}

function ensureEl(parent) {
  return typeof parent === "string" ? html(parent) : getEl(parent);
}

function getEl(parent) {
  return (
    (parent.nodeType && parent) || (!parent.el && parent) || getEl(parent.el)
  );
}

function isNode(arg) {
  return arg?.nodeType;
}

function dispatch(child, data, eventName = "redom") {
  const childEl = getEl(child);
  const event = new CustomEvent(eventName, { bubbles: true, detail: data });
  childEl.dispatchEvent(event);
}

function setChildren(parent, ...children) {
  const parentEl = getEl(parent);
  let current = traverse(parent, children, parentEl.firstChild);

  while (current) {
    const next = current.nextSibling;

    unmount(parent, current);

    current = next;
  }
}

function traverse(parent, children, _current) {
  let current = _current;

  const childEls = Array(children.length);

  for (let i = 0; i < children.length; i++) {
    childEls[i] = children[i] && getEl(children[i]);
  }

  for (let i = 0; i < children.length; i++) {
    const child = children[i];

    if (!child) {
      continue;
    }

    const childEl = childEls[i];

    if (childEl === current) {
      current = current.nextSibling;
      continue;
    }

    if (isNode(childEl)) {
      const next = current?.nextSibling;
      const exists = child.__redom_index != null;
      const replace = exists && next === childEls[i + 1];

      mount(parent, child, current, replace);

      if (replace) {
        current = next;
      }

      continue;
    }

    if (child.length != null) {
      current = traverse(parent, child, current);
    }
  }

  return current;
}

function listPool(View, key, initData) {
  return new ListPool(View, key, initData);
}

class ListPool {
  constructor(View, key, initData) {
    this.View = View;
    this.initData = initData;
    this.oldLookup = {};
    this.lookup = {};
    this.oldViews = [];
    this.views = [];

    if (key != null) {
      this.key = typeof key === "function" ? key : propKey(key);
    }
  }

  update(data, context) {
    const { View, key, initData } = this;
    const keySet = key != null;

    const oldLookup = this.lookup;
    const newLookup = {};

    const newViews = Array(data.length);
    const oldViews = this.views;

    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      let view;

      if (keySet) {
        const id = key(item);

        view = oldLookup[id] || new View(initData, item, i, data);
        newLookup[id] = view;
        view.__redom_id = id;
      } else {
        view = oldViews[i] || new View(initData, item, i, data);
      }
      view.update?.(item, i, data, context);

      const el = getEl(view.el);

      el.__redom_view = view;
      newViews[i] = view;
    }

    this.oldViews = oldViews;
    this.views = newViews;

    this.oldLookup = oldLookup;
    this.lookup = newLookup;
  }
}

function propKey(key) {
  return function proppedKey(item) {
    return item[key];
  };
}

function list(parent, View, key, initData) {
  return new List(parent, View, key, initData);
}

class List {
  constructor(parent, View, key, initData) {
    this.View = View;
    this.initData = initData;
    this.views = [];
    this.pool = new ListPool(View, key, initData);
    this.el = ensureEl(parent);
    this.keySet = key != null;
  }

  update(data, context) {
    const { keySet } = this;
    const oldViews = this.views;

    this.pool.update(data || [], context);

    const { views, lookup } = this.pool;

    if (keySet) {
      for (let i = 0; i < oldViews.length; i++) {
        const oldView = oldViews[i];
        const id = oldView.__redom_id;

        if (lookup[id] == null) {
          oldView.__redom_index = null;
          unmount(this, oldView);
        }
      }
    }

    for (let i = 0; i < views.length; i++) {
      const view = views[i];

      view.__redom_index = i;
    }

    setChildren(this, views);

    if (keySet) {
      this.lookup = lookup;
    }
    this.views = views;
  }
}

List.extend = function extendList(parent, View, key, initData) {
  return List.bind(List, parent, View, key, initData);
};

list.extend = List.extend;

/* global Node */


function place(View, initData) {
  return new Place(View, initData);
}

class Place {
  constructor(View, initData) {
    this.el = text("");
    this.visible = false;
    this.view = null;
    this._placeholder = this.el;

    if (View instanceof Node) {
      this._el = View;
    } else if (View.el instanceof Node) {
      this._el = View;
      this.view = View;
    } else {
      this._View = View;
    }

    this._initData = initData;
  }

  update(visible, data) {
    const placeholder = this._placeholder;
    const parentNode = this.el.parentNode;

    if (visible) {
      if (!this.visible) {
        if (this._el) {
          mount(parentNode, this._el, placeholder);
          unmount(parentNode, placeholder);

          this.el = getEl(this._el);
          this.visible = visible;
        } else {
          const View = this._View;
          const view = new View(this._initData);

          this.el = getEl(view);
          this.view = view;

          mount(parentNode, view, placeholder);
          unmount(parentNode, placeholder);
        }
      }
      this.view?.update?.(data);
    } else {
      if (this.visible) {
        if (this._el) {
          mount(parentNode, placeholder, this._el);
          unmount(parentNode, this._el);

          this.el = placeholder;
          this.visible = visible;

          return;
        }
        mount(parentNode, placeholder, this.view);
        unmount(parentNode, this.view);

        this.el = placeholder;
        this.view = null;
      }
    }
    this.visible = visible;
  }
}

function ref(ctx, key, value) {
  ctx[key] = value;
  return value;
}

/* global Node */


function router(parent, views, initData) {
  return new Router(parent, views, initData);
}

class Router {
  constructor(parent, views, initData) {
    this.el = ensureEl(parent);
    this.views = views;
    this.Views = views; // backwards compatibility
    this.initData = initData;
  }

  update(route, data) {
    if (route !== this.route) {
      const views = this.views;
      const View = views[route];

      this.route = route;

      if (View && (View instanceof Node || View.el instanceof Node)) {
        this.view = View;
      } else {
        this.view = View && new View(this.initData, data);
      }

      setChildren(this.el, [this.view]);
    }
    this.view?.update?.(data, route);
  }
}

const ns = "http://www.w3.org/2000/svg";

function svg(query, ...args) {
  let element;

  const type = typeof query;

  if (type === "string") {
    element = createElement(query, ns);
  } else if (type === "function") {
    const Query = query;
    element = new Query(...args);
  } else {
    throw new Error("At least one argument required");
  }

  parseArgumentsInternal(getEl(element), args, true);

  return element;
}

const s = svg;

svg.extend = function extendSvg(...args) {
  return svg.bind(this, ...args);
};

svg.ns = ns;

function viewFactory(views, key) {
  if (!views || typeof views !== "object") {
    throw new Error("views must be an object");
  }
  if (!key || typeof key !== "string") {
    throw new Error("key must be a string");
  }
  return function factoryView(initData, item, i, data) {
    const viewKey = item[key];
    const View = views[viewKey];

    if (View) {
      return new View(initData, item, i, data);
    }

    throw new Error(`view ${viewKey} not found`);
  };
}

export { List, ListPool, Place, Router, dispatch, el, h, html, list, listPool, mount, place, ref, router, s, setAttr, setChildren, setData, setStyle, setXlink, svg, text, unmount, viewFactory };
