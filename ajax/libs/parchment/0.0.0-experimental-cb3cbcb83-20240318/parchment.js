var Scope = /* @__PURE__ */ ((Scope2) => (Scope2[Scope2.TYPE = 3] = "TYPE", Scope2[Scope2.LEVEL = 12] = "LEVEL", Scope2[Scope2.ATTRIBUTE = 13] = "ATTRIBUTE", Scope2[Scope2.BLOT = 14] = "BLOT", Scope2[Scope2.INLINE = 7] = "INLINE", Scope2[Scope2.BLOCK = 11] = "BLOCK", Scope2[Scope2.BLOCK_BLOT = 10] = "BLOCK_BLOT", Scope2[Scope2.INLINE_BLOT = 6] = "INLINE_BLOT", Scope2[Scope2.BLOCK_ATTRIBUTE = 9] = "BLOCK_ATTRIBUTE", Scope2[Scope2.INLINE_ATTRIBUTE = 5] = "INLINE_ATTRIBUTE", Scope2[Scope2.ANY = 15] = "ANY", Scope2))(Scope || {});
class Attributor {
  constructor(attrName, keyName, options = {}) {
    this.attrName = attrName, this.keyName = keyName;
    const attributeBit = Scope.TYPE & Scope.ATTRIBUTE;
    this.scope = options.scope != null ? (
      // Ignore type bits, force attribute bit
      options.scope & Scope.LEVEL | attributeBit
    ) : Scope.ATTRIBUTE, options.whitelist != null && (this.whitelist = options.whitelist);
  }
  static keys(node) {
    return Array.from(node.attributes).map((item) => item.name);
  }
  add(node, value) {
    return this.canAdd(node, value) ? (node.setAttribute(this.keyName, value), !0) : !1;
  }
  canAdd(_node, value) {
    return this.whitelist == null ? !0 : typeof value == "string" ? this.whitelist.indexOf(value.replace(/["']/g, "")) > -1 : this.whitelist.indexOf(value) > -1;
  }
  remove(node) {
    node.removeAttribute(this.keyName);
  }
  value(node) {
    const value = node.getAttribute(this.keyName);
    return this.canAdd(node, value) && value ? value : "";
  }
}
class ParchmentError extends Error {
  constructor(message) {
    message = "[Parchment] " + message, super(message), this.message = message, this.name = this.constructor.name;
  }
}
const _Registry = class _Registry {
  constructor() {
    this.attributes = {}, this.classes = {}, this.tags = {}, this.types = {};
  }
  static find(node, bubble = !1) {
    if (node == null)
      return null;
    if (this.blots.has(node))
      return this.blots.get(node) || null;
    if (bubble) {
      let parentNode = null;
      try {
        parentNode = node.parentNode;
      } catch {
        return null;
      }
      return this.find(parentNode, bubble);
    }
    return null;
  }
  create(scroll, input, value) {
    const match2 = this.query(input);
    if (match2 == null)
      throw new ParchmentError(`Unable to create ${input} blot`);
    const blotClass = match2, node = (
      // @ts-expect-error Fix me later
      input instanceof Node || input.nodeType === Node.TEXT_NODE ? input : blotClass.create(value)
    ), blot = new blotClass(scroll, node, value);
    return _Registry.blots.set(blot.domNode, blot), blot;
  }
  find(node, bubble = !1) {
    return _Registry.find(node, bubble);
  }
  query(query, scope = Scope.ANY) {
    let match2;
    return typeof query == "string" ? match2 = this.types[query] || this.attributes[query] : query instanceof Text || query.nodeType === Node.TEXT_NODE ? match2 = this.types.text : typeof query == "number" ? query & Scope.LEVEL & Scope.BLOCK ? match2 = this.types.block : query & Scope.LEVEL & Scope.INLINE && (match2 = this.types.inline) : query instanceof Element && ((query.getAttribute("class") || "").split(/\s+/).some((name) => (match2 = this.classes[name], !!match2)), match2 = match2 || this.tags[query.tagName]), match2 == null ? null : "scope" in match2 && scope & Scope.LEVEL & match2.scope && scope & Scope.TYPE & match2.scope ? match2 : null;
  }
  register(...definitions) {
    return definitions.map((definition) => {
      const isBlot = "blotName" in definition, isAttr = "attrName" in definition;
      if (!isBlot && !isAttr)
        throw new ParchmentError("Invalid definition");
      if (isBlot && definition.blotName === "abstract")
        throw new ParchmentError("Cannot register abstract class");
      const key = isBlot ? definition.blotName : isAttr ? definition.attrName : void 0;
      return this.types[key] = definition, isAttr ? typeof definition.keyName == "string" && (this.attributes[definition.keyName] = definition) : isBlot && (definition.className && (this.classes[definition.className] = definition), definition.tagName && (Array.isArray(definition.tagName) ? definition.tagName = definition.tagName.map((tagName) => tagName.toUpperCase()) : definition.tagName = definition.tagName.toUpperCase(), (Array.isArray(definition.tagName) ? definition.tagName : [definition.tagName]).forEach((tag) => {
        (this.tags[tag] == null || definition.className == null) && (this.tags[tag] = definition);
      }))), definition;
    });
  }
};
_Registry.blots = /* @__PURE__ */ new WeakMap();
let Registry = _Registry;
function match(node, prefix) {
  return (node.getAttribute("class") || "").split(/\s+/).filter((name) => name.indexOf(`${prefix}-`) === 0);
}
class ClassAttributor extends Attributor {
  static keys(node) {
    return (node.getAttribute("class") || "").split(/\s+/).map((name) => name.split("-").slice(0, -1).join("-"));
  }
  add(node, value) {
    return this.canAdd(node, value) ? (this.remove(node), node.classList.add(`${this.keyName}-${value}`), !0) : !1;
  }
  remove(node) {
    match(node, this.keyName).forEach((name) => {
      node.classList.remove(name);
    }), node.classList.length === 0 && node.removeAttribute("class");
  }
  value(node) {
    const value = (match(node, this.keyName)[0] || "").slice(this.keyName.length + 1);
    return this.canAdd(node, value) ? value : "";
  }
}
const ClassAttributor$1 = ClassAttributor;
function camelize(name) {
  const parts = name.split("-"), rest = parts.slice(1).map((part) => part[0].toUpperCase() + part.slice(1)).join("");
  return parts[0] + rest;
}
class StyleAttributor extends Attributor {
  static keys(node) {
    return (node.getAttribute("style") || "").split(";").map((value) => value.split(":")[0].trim());
  }
  add(node, value) {
    return this.canAdd(node, value) ? (node.style[camelize(this.keyName)] = value, !0) : !1;
  }
  remove(node) {
    node.style[camelize(this.keyName)] = "", node.getAttribute("style") || node.removeAttribute("style");
  }
  value(node) {
    const value = node.style[camelize(this.keyName)];
    return this.canAdd(node, value) ? value : "";
  }
}
const StyleAttributor$1 = StyleAttributor;
class AttributorStore {
  constructor(domNode) {
    this.attributes = {}, this.domNode = domNode, this.build();
  }
  attribute(attribute, value) {
    value ? attribute.add(this.domNode, value) && (attribute.value(this.domNode) != null ? this.attributes[attribute.attrName] = attribute : delete this.attributes[attribute.attrName]) : (attribute.remove(this.domNode), delete this.attributes[attribute.attrName]);
  }
  build() {
    this.attributes = {};
    const blot = Registry.find(this.domNode);
    if (blot == null)
      return;
    const attributes = Attributor.keys(this.domNode), classes = ClassAttributor$1.keys(this.domNode), styles = StyleAttributor$1.keys(this.domNode);
    attributes.concat(classes).concat(styles).forEach((name) => {
      const attr = blot.scroll.query(name, Scope.ATTRIBUTE);
      attr instanceof Attributor && (this.attributes[attr.attrName] = attr);
    });
  }
  copy(target) {
    Object.keys(this.attributes).forEach((key) => {
      const value = this.attributes[key].value(this.domNode);
      target.format(key, value);
    });
  }
  move(target) {
    this.copy(target), Object.keys(this.attributes).forEach((key) => {
      this.attributes[key].remove(this.domNode);
    }), this.attributes = {};
  }
  values() {
    return Object.keys(this.attributes).reduce(
      (attributes, name) => (attributes[name] = this.attributes[name].value(this.domNode), attributes),
      {}
    );
  }
}
const AttributorStore$1 = AttributorStore, _ShadowBlot = class _ShadowBlot {
  constructor(scroll, domNode) {
    this.scroll = scroll, this.domNode = domNode, Registry.blots.set(domNode, this), this.prev = null, this.next = null;
  }
  static create(rawValue) {
    if (this.tagName == null)
      throw new ParchmentError("Blot definition missing tagName");
    let node, value;
    return Array.isArray(this.tagName) ? (typeof rawValue == "string" ? (value = rawValue.toUpperCase(), parseInt(value, 10).toString() === value && (value = parseInt(value, 10))) : typeof rawValue == "number" && (value = rawValue), typeof value == "number" ? node = document.createElement(this.tagName[value - 1]) : value && this.tagName.indexOf(value) > -1 ? node = document.createElement(value) : node = document.createElement(this.tagName[0])) : node = document.createElement(this.tagName), this.className && node.classList.add(this.className), node;
  }
  // Hack for accessing inherited static methods
  get statics() {
    return this.constructor;
  }
  attach() {
  }
  clone() {
    const domNode = this.domNode.cloneNode(!1);
    return this.scroll.create(domNode);
  }
  detach() {
    this.parent != null && this.parent.removeChild(this), Registry.blots.delete(this.domNode);
  }
  deleteAt(index, length) {
    this.isolate(index, length).remove();
  }
  formatAt(index, length, name, value) {
    const blot = this.isolate(index, length);
    if (this.scroll.query(name, Scope.BLOT) != null && value)
      blot.wrap(name, value);
    else if (this.scroll.query(name, Scope.ATTRIBUTE) != null) {
      const parent = this.scroll.create(this.statics.scope);
      blot.wrap(parent), parent.format(name, value);
    }
  }
  insertAt(index, value, def) {
    const blot = def == null ? this.scroll.create("text", value) : this.scroll.create(value, def), ref = this.split(index);
    this.parent.insertBefore(blot, ref || void 0);
  }
  isolate(index, length) {
    const target = this.split(index);
    if (target == null)
      throw new Error("Attempt to isolate at end");
    return target.split(length), target;
  }
  length() {
    return 1;
  }
  offset(root = this.parent) {
    return this.parent == null || this === root ? 0 : this.parent.children.offset(this) + this.parent.offset(root);
  }
  optimize(_context) {
    this.statics.requiredContainer && !(this.parent instanceof this.statics.requiredContainer) && this.wrap(this.statics.requiredContainer.blotName);
  }
  remove() {
    this.domNode.parentNode != null && this.domNode.parentNode.removeChild(this.domNode), this.detach();
  }
  replaceWith(name, value) {
    const replacement = typeof name == "string" ? this.scroll.create(name, value) : name;
    return this.parent != null && (this.parent.insertBefore(replacement, this.next || void 0), this.remove()), replacement;
  }
  split(index, _force) {
    return index === 0 ? this : this.next;
  }
  update(_mutations, _context) {
  }
  wrap(name, value) {
    const wrapper = typeof name == "string" ? this.scroll.create(name, value) : name;
    if (this.parent != null && this.parent.insertBefore(wrapper, this.next || void 0), typeof wrapper.appendChild != "function")
      throw new ParchmentError(`Cannot wrap ${name}`);
    return wrapper.appendChild(this), wrapper;
  }
};
_ShadowBlot.blotName = "abstract";
let ShadowBlot = _ShadowBlot;
const _LeafBlot = class _LeafBlot extends ShadowBlot {
  /**
   * Returns the value represented by domNode if it is this Blot's type
   * No checking that domNode can represent this Blot type is required so
   * applications needing it should check externally before calling.
   */
  static value(_domNode) {
    return !0;
  }
  /**
   * Given location represented by node and offset from DOM Selection Range,
   * return index to that location.
   */
  index(node, offset) {
    return this.domNode === node || this.domNode.compareDocumentPosition(node) & Node.DOCUMENT_POSITION_CONTAINED_BY ? Math.min(offset, 1) : -1;
  }
  /**
   * Given index to location within blot, return node and offset representing
   * that location, consumable by DOM Selection Range
   */
  position(index, _inclusive) {
    let offset = Array.from(this.parent.domNode.childNodes).indexOf(this.domNode);
    return index > 0 && (offset += 1), [this.parent.domNode, offset];
  }
  /**
   * Return value represented by this blot
   * Should not change without interaction from API or
   * user change detectable by update()
   */
  value() {
    return {
      [this.statics.blotName]: this.statics.value(this.domNode) || !0
    };
  }
};
_LeafBlot.scope = Scope.INLINE_BLOT;
let LeafBlot = _LeafBlot;
const LeafBlot$1 = LeafBlot;
class LinkedList {
  constructor() {
    this.head = null, this.tail = null, this.length = 0;
  }
  append(...nodes) {
    if (this.insertBefore(nodes[0], null), nodes.length > 1) {
      const rest = nodes.slice(1);
      this.append(...rest);
    }
  }
  at(index) {
    const next = this.iterator();
    let cur = next();
    for (; cur && index > 0; )
      index -= 1, cur = next();
    return cur;
  }
  contains(node) {
    const next = this.iterator();
    let cur = next();
    for (; cur; ) {
      if (cur === node)
        return !0;
      cur = next();
    }
    return !1;
  }
  indexOf(node) {
    const next = this.iterator();
    let cur = next(), index = 0;
    for (; cur; ) {
      if (cur === node)
        return index;
      index += 1, cur = next();
    }
    return -1;
  }
  insertBefore(node, refNode) {
    node != null && (this.remove(node), node.next = refNode, refNode != null ? (node.prev = refNode.prev, refNode.prev != null && (refNode.prev.next = node), refNode.prev = node, refNode === this.head && (this.head = node)) : this.tail != null ? (this.tail.next = node, node.prev = this.tail, this.tail = node) : (node.prev = null, this.head = this.tail = node), this.length += 1);
  }
  offset(target) {
    let index = 0, cur = this.head;
    for (; cur != null; ) {
      if (cur === target)
        return index;
      index += cur.length(), cur = cur.next;
    }
    return -1;
  }
  remove(node) {
    this.contains(node) && (node.prev != null && (node.prev.next = node.next), node.next != null && (node.next.prev = node.prev), node === this.head && (this.head = node.next), node === this.tail && (this.tail = node.prev), this.length -= 1);
  }
  iterator(curNode = this.head) {
    return () => {
      const ret = curNode;
      return curNode != null && (curNode = curNode.next), ret;
    };
  }
  find(index, inclusive = !1) {
    const next = this.iterator();
    let cur = next();
    for (; cur; ) {
      const length = cur.length();
      if (index < length || inclusive && index === length && (cur.next == null || cur.next.length() !== 0))
        return [cur, index];
      index -= length, cur = next();
    }
    return [null, 0];
  }
  forEach(callback) {
    const next = this.iterator();
    let cur = next();
    for (; cur; )
      callback(cur), cur = next();
  }
  forEachAt(index, length, callback) {
    if (length <= 0)
      return;
    const [startNode, offset] = this.find(index);
    let curIndex = index - offset;
    const next = this.iterator(startNode);
    let cur = next();
    for (; cur && curIndex < index + length; ) {
      const curLength = cur.length();
      index > curIndex ? callback(
        cur,
        index - curIndex,
        Math.min(length, curIndex + curLength - index)
      ) : callback(cur, 0, Math.min(curLength, index + length - curIndex)), curIndex += curLength, cur = next();
    }
  }
  map(callback) {
    return this.reduce((memo, cur) => (memo.push(callback(cur)), memo), []);
  }
  reduce(callback, memo) {
    const next = this.iterator();
    let cur = next();
    for (; cur; )
      memo = callback(memo, cur), cur = next();
    return memo;
  }
}
function makeAttachedBlot(node, scroll) {
  const found = scroll.find(node);
  if (found)
    return found;
  try {
    return scroll.create(node);
  } catch {
    const blot = scroll.create(Scope.INLINE);
    return Array.from(node.childNodes).forEach((child) => {
      blot.domNode.appendChild(child);
    }), node.parentNode && node.parentNode.replaceChild(blot.domNode, node), blot.attach(), blot;
  }
}
const _ParentBlot = class _ParentBlot extends ShadowBlot {
  constructor(scroll, domNode) {
    super(scroll, domNode), this.uiNode = null, this.build();
  }
  appendChild(other) {
    this.insertBefore(other);
  }
  attach() {
    super.attach(), this.children.forEach((child) => {
      child.attach();
    });
  }
  attachUI(node) {
    this.uiNode != null && this.uiNode.remove(), this.uiNode = node, _ParentBlot.uiClass && this.uiNode.classList.add(_ParentBlot.uiClass), this.uiNode.setAttribute("contenteditable", "false"), this.domNode.insertBefore(this.uiNode, this.domNode.firstChild);
  }
  /**
   * Called during construction, should fill its own children LinkedList.
   */
  build() {
    this.children = new LinkedList(), Array.from(this.domNode.childNodes).filter((node) => node !== this.uiNode).reverse().forEach((node) => {
      try {
        const child = makeAttachedBlot(node, this.scroll);
        this.insertBefore(child, this.children.head || void 0);
      } catch (err) {
        if (err instanceof ParchmentError)
          return;
        throw err;
      }
    });
  }
  deleteAt(index, length) {
    if (index === 0 && length === this.length())
      return this.remove();
    this.children.forEachAt(index, length, (child, offset, childLength) => {
      child.deleteAt(offset, childLength);
    });
  }
  descendant(criteria, index = 0) {
    const [child, offset] = this.children.find(index);
    return criteria.blotName == null && criteria(child) || criteria.blotName != null && child instanceof criteria ? [child, offset] : child instanceof _ParentBlot ? child.descendant(criteria, offset) : [null, -1];
  }
  descendants(criteria, index = 0, length = Number.MAX_VALUE) {
    let descendants = [], lengthLeft = length;
    return this.children.forEachAt(
      index,
      length,
      (child, childIndex, childLength) => {
        (criteria.blotName == null && criteria(child) || criteria.blotName != null && child instanceof criteria) && descendants.push(child), child instanceof _ParentBlot && (descendants = descendants.concat(
          child.descendants(criteria, childIndex, lengthLeft)
        )), lengthLeft -= childLength;
      }
    ), descendants;
  }
  detach() {
    this.children.forEach((child) => {
      child.detach();
    }), super.detach();
  }
  enforceAllowedChildren() {
    let done = !1;
    this.children.forEach((child) => {
      done || this.statics.allowedChildren.some(
        (def) => child instanceof def
      ) || (child.statics.scope === Scope.BLOCK_BLOT ? (child.next != null && this.splitAfter(child), child.prev != null && this.splitAfter(child.prev), child.parent.unwrap(), done = !0) : child instanceof _ParentBlot ? child.unwrap() : child.remove());
    });
  }
  formatAt(index, length, name, value) {
    this.children.forEachAt(index, length, (child, offset, childLength) => {
      child.formatAt(offset, childLength, name, value);
    });
  }
  insertAt(index, value, def) {
    const [child, offset] = this.children.find(index);
    if (child)
      child.insertAt(offset, value, def);
    else {
      const blot = def == null ? this.scroll.create("text", value) : this.scroll.create(value, def);
      this.appendChild(blot);
    }
  }
  insertBefore(childBlot, refBlot) {
    childBlot.parent != null && childBlot.parent.children.remove(childBlot);
    let refDomNode = null;
    this.children.insertBefore(childBlot, refBlot || null), childBlot.parent = this, refBlot != null && (refDomNode = refBlot.domNode), (this.domNode.parentNode !== childBlot.domNode || this.domNode.nextSibling !== refDomNode) && this.domNode.insertBefore(childBlot.domNode, refDomNode), childBlot.attach();
  }
  length() {
    return this.children.reduce((memo, child) => memo + child.length(), 0);
  }
  moveChildren(targetParent, refNode) {
    this.children.forEach((child) => {
      targetParent.insertBefore(child, refNode);
    });
  }
  optimize(context) {
    if (super.optimize(context), this.enforceAllowedChildren(), this.uiNode != null && this.uiNode !== this.domNode.firstChild && this.domNode.insertBefore(this.uiNode, this.domNode.firstChild), this.children.length === 0)
      if (this.statics.defaultChild != null) {
        const child = this.scroll.create(this.statics.defaultChild.blotName);
        this.appendChild(child);
      } else
        this.remove();
  }
  path(index, inclusive = !1) {
    const [child, offset] = this.children.find(index, inclusive), position = [[this, index]];
    return child instanceof _ParentBlot ? position.concat(child.path(offset, inclusive)) : (child != null && position.push([child, offset]), position);
  }
  removeChild(child) {
    this.children.remove(child);
  }
  replaceWith(name, value) {
    const replacement = typeof name == "string" ? this.scroll.create(name, value) : name;
    return replacement instanceof _ParentBlot && this.moveChildren(replacement), super.replaceWith(replacement);
  }
  split(index, force = !1) {
    if (!force) {
      if (index === 0)
        return this;
      if (index === this.length())
        return this.next;
    }
    const after = this.clone();
    return this.parent && this.parent.insertBefore(after, this.next || void 0), this.children.forEachAt(index, this.length(), (child, offset, _length) => {
      const split = child.split(offset, force);
      split != null && after.appendChild(split);
    }), after;
  }
  splitAfter(child) {
    const after = this.clone();
    for (; child.next != null; )
      after.appendChild(child.next);
    return this.parent && this.parent.insertBefore(after, this.next || void 0), after;
  }
  unwrap() {
    this.parent && this.moveChildren(this.parent, this.next || void 0), this.remove();
  }
  update(mutations, _context) {
    const addedNodes = [], removedNodes = [];
    mutations.forEach((mutation) => {
      mutation.target === this.domNode && mutation.type === "childList" && (addedNodes.push(...mutation.addedNodes), removedNodes.push(...mutation.removedNodes));
    }), removedNodes.forEach((node) => {
      if (node.parentNode != null && // @ts-expect-error Fix me later
      node.tagName !== "IFRAME" && document.body.compareDocumentPosition(node) & Node.DOCUMENT_POSITION_CONTAINED_BY)
        return;
      const blot = this.scroll.find(node);
      blot != null && (blot.domNode.parentNode == null || blot.domNode.parentNode === this.domNode) && blot.detach();
    }), addedNodes.filter((node) => node.parentNode === this.domNode && node !== this.uiNode).sort((a, b) => a === b ? 0 : a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? 1 : -1).forEach((node) => {
      let refBlot = null;
      node.nextSibling != null && (refBlot = this.scroll.find(node.nextSibling));
      const blot = makeAttachedBlot(node, this.scroll);
      (blot.next !== refBlot || blot.next == null) && (blot.parent != null && blot.parent.removeChild(this), this.insertBefore(blot, refBlot || void 0));
    }), this.enforceAllowedChildren();
  }
};
_ParentBlot.uiClass = "";
let ParentBlot = _ParentBlot;
const ParentBlot$1 = ParentBlot;
function isEqual(obj1, obj2) {
  if (Object.keys(obj1).length !== Object.keys(obj2).length)
    return !1;
  for (const prop in obj1)
    if (obj1[prop] !== obj2[prop])
      return !1;
  return !0;
}
const _InlineBlot = class _InlineBlot extends ParentBlot$1 {
  static create(value) {
    return super.create(value);
  }
  static formats(domNode, scroll) {
    const match2 = scroll.query(_InlineBlot.blotName);
    if (!(match2 != null && domNode.tagName === match2.tagName)) {
      if (typeof this.tagName == "string")
        return !0;
      if (Array.isArray(this.tagName))
        return domNode.tagName.toLowerCase();
    }
  }
  constructor(scroll, domNode) {
    super(scroll, domNode), this.attributes = new AttributorStore$1(this.domNode);
  }
  format(name, value) {
    if (name === this.statics.blotName && !value)
      this.children.forEach((child) => {
        child instanceof _InlineBlot || (child = child.wrap(_InlineBlot.blotName, !0)), this.attributes.copy(child);
      }), this.unwrap();
    else {
      const format = this.scroll.query(name, Scope.INLINE);
      if (format == null)
        return;
      format instanceof Attributor ? this.attributes.attribute(format, value) : value && (name !== this.statics.blotName || this.formats()[name] !== value) && this.replaceWith(name, value);
    }
  }
  formats() {
    const formats = this.attributes.values(), format = this.statics.formats(this.domNode, this.scroll);
    return format != null && (formats[this.statics.blotName] = format), formats;
  }
  formatAt(index, length, name, value) {
    this.formats()[name] != null || this.scroll.query(name, Scope.ATTRIBUTE) ? this.isolate(index, length).format(name, value) : super.formatAt(index, length, name, value);
  }
  optimize(context) {
    super.optimize(context);
    const formats = this.formats();
    if (Object.keys(formats).length === 0)
      return this.unwrap();
    const next = this.next;
    next instanceof _InlineBlot && next.prev === this && isEqual(formats, next.formats()) && (next.moveChildren(this), next.remove());
  }
  replaceWith(name, value) {
    const replacement = super.replaceWith(name, value);
    return this.attributes.copy(replacement), replacement;
  }
  update(mutations, context) {
    super.update(mutations, context), mutations.some(
      (mutation) => mutation.target === this.domNode && mutation.type === "attributes"
    ) && this.attributes.build();
  }
  wrap(name, value) {
    const wrapper = super.wrap(name, value);
    return wrapper instanceof _InlineBlot && this.attributes.move(wrapper), wrapper;
  }
};
_InlineBlot.allowedChildren = [_InlineBlot, LeafBlot$1], _InlineBlot.blotName = "inline", _InlineBlot.scope = Scope.INLINE_BLOT, _InlineBlot.tagName = "SPAN";
let InlineBlot = _InlineBlot;
const InlineBlot$1 = InlineBlot, _BlockBlot = class _BlockBlot extends ParentBlot$1 {
  static create(value) {
    return super.create(value);
  }
  static formats(domNode, scroll) {
    const match2 = scroll.query(_BlockBlot.blotName);
    if (!(match2 != null && domNode.tagName === match2.tagName)) {
      if (typeof this.tagName == "string")
        return !0;
      if (Array.isArray(this.tagName))
        return domNode.tagName.toLowerCase();
    }
  }
  constructor(scroll, domNode) {
    super(scroll, domNode), this.attributes = new AttributorStore$1(this.domNode);
  }
  format(name, value) {
    const format = this.scroll.query(name, Scope.BLOCK);
    format != null && (format instanceof Attributor ? this.attributes.attribute(format, value) : name === this.statics.blotName && !value ? this.replaceWith(_BlockBlot.blotName) : value && (name !== this.statics.blotName || this.formats()[name] !== value) && this.replaceWith(name, value));
  }
  formats() {
    const formats = this.attributes.values(), format = this.statics.formats(this.domNode, this.scroll);
    return format != null && (formats[this.statics.blotName] = format), formats;
  }
  formatAt(index, length, name, value) {
    this.scroll.query(name, Scope.BLOCK) != null ? this.format(name, value) : super.formatAt(index, length, name, value);
  }
  insertAt(index, value, def) {
    if (def == null || this.scroll.query(value, Scope.INLINE) != null)
      super.insertAt(index, value, def);
    else {
      const after = this.split(index);
      if (after != null) {
        const blot = this.scroll.create(value, def);
        after.parent.insertBefore(blot, after);
      } else
        throw new Error("Attempt to insertAt after block boundaries");
    }
  }
  replaceWith(name, value) {
    const replacement = super.replaceWith(name, value);
    return this.attributes.copy(replacement), replacement;
  }
  update(mutations, context) {
    super.update(mutations, context), mutations.some(
      (mutation) => mutation.target === this.domNode && mutation.type === "attributes"
    ) && this.attributes.build();
  }
};
_BlockBlot.blotName = "block", _BlockBlot.scope = Scope.BLOCK_BLOT, _BlockBlot.tagName = "P", _BlockBlot.allowedChildren = [
  InlineBlot$1,
  _BlockBlot,
  LeafBlot$1
];
let BlockBlot = _BlockBlot;
const BlockBlot$1 = BlockBlot, _ContainerBlot = class _ContainerBlot extends ParentBlot$1 {
  checkMerge() {
    return this.next !== null && this.next.statics.blotName === this.statics.blotName;
  }
  deleteAt(index, length) {
    super.deleteAt(index, length), this.enforceAllowedChildren();
  }
  formatAt(index, length, name, value) {
    super.formatAt(index, length, name, value), this.enforceAllowedChildren();
  }
  insertAt(index, value, def) {
    super.insertAt(index, value, def), this.enforceAllowedChildren();
  }
  optimize(context) {
    super.optimize(context), this.children.length > 0 && this.next != null && this.checkMerge() && (this.next.moveChildren(this), this.next.remove());
  }
};
_ContainerBlot.blotName = "container", _ContainerBlot.scope = Scope.BLOCK_BLOT;
let ContainerBlot = _ContainerBlot;
const ContainerBlot$1 = ContainerBlot;
class EmbedBlot extends LeafBlot$1 {
  static formats(_domNode, _scroll) {
  }
  format(name, value) {
    super.formatAt(0, this.length(), name, value);
  }
  formatAt(index, length, name, value) {
    index === 0 && length === this.length() ? this.format(name, value) : super.formatAt(index, length, name, value);
  }
  formats() {
    return this.statics.formats(this.domNode, this.scroll);
  }
}
const EmbedBlot$1 = EmbedBlot, OBSERVER_CONFIG = {
  attributes: !0,
  characterData: !0,
  characterDataOldValue: !0,
  childList: !0,
  subtree: !0
}, MAX_OPTIMIZE_ITERATIONS = 100, _ScrollBlot = class _ScrollBlot extends ParentBlot$1 {
  constructor(registry, node) {
    super(null, node), this.registry = registry, this.scroll = this, this.build(), this.observer = new MutationObserver((mutations) => {
      this.update(mutations);
    }), this.observer.observe(this.domNode, OBSERVER_CONFIG), this.attach();
  }
  create(input, value) {
    return this.registry.create(this, input, value);
  }
  find(node, bubble = !1) {
    const blot = this.registry.find(node, bubble);
    return blot ? blot.scroll === this ? blot : bubble ? this.find(blot.scroll.domNode.parentNode, !0) : null : null;
  }
  query(query, scope = Scope.ANY) {
    return this.registry.query(query, scope);
  }
  register(...definitions) {
    return this.registry.register(...definitions);
  }
  build() {
    this.scroll != null && super.build();
  }
  detach() {
    super.detach(), this.observer.disconnect();
  }
  deleteAt(index, length) {
    this.update(), index === 0 && length === this.length() ? this.children.forEach((child) => {
      child.remove();
    }) : super.deleteAt(index, length);
  }
  formatAt(index, length, name, value) {
    this.update(), super.formatAt(index, length, name, value);
  }
  insertAt(index, value, def) {
    this.update(), super.insertAt(index, value, def);
  }
  optimize(mutations = [], context = {}) {
    super.optimize(context);
    const mutationsMap = context.mutationsMap || /* @__PURE__ */ new WeakMap();
    let records = Array.from(this.observer.takeRecords());
    for (; records.length > 0; )
      mutations.push(records.pop());
    const mark = (blot, markParent = !0) => {
      blot == null || blot === this || blot.domNode.parentNode != null && (mutationsMap.has(blot.domNode) || mutationsMap.set(blot.domNode, []), markParent && mark(blot.parent));
    }, optimize = (blot) => {
      mutationsMap.has(blot.domNode) && (blot instanceof ParentBlot$1 && blot.children.forEach(optimize), mutationsMap.delete(blot.domNode), blot.optimize(context));
    };
    let remaining = mutations;
    for (let i = 0; remaining.length > 0; i += 1) {
      if (i >= MAX_OPTIMIZE_ITERATIONS)
        throw new Error("[Parchment] Maximum optimize iterations reached");
      for (remaining.forEach((mutation) => {
        const blot = this.find(mutation.target, !0);
        blot != null && (blot.domNode === mutation.target && (mutation.type === "childList" ? (mark(this.find(mutation.previousSibling, !1)), Array.from(mutation.addedNodes).forEach((node) => {
          const child = this.find(node, !1);
          mark(child, !1), child instanceof ParentBlot$1 && child.children.forEach((grandChild) => {
            mark(grandChild, !1);
          });
        })) : mutation.type === "attributes" && mark(blot.prev)), mark(blot));
      }), this.children.forEach(optimize), remaining = Array.from(this.observer.takeRecords()), records = remaining.slice(); records.length > 0; )
        mutations.push(records.pop());
    }
  }
  update(mutations, context = {}) {
    mutations = mutations || this.observer.takeRecords();
    const mutationsMap = /* @__PURE__ */ new WeakMap();
    mutations.map((mutation) => {
      const blot = this.find(mutation.target, !0);
      return blot == null ? null : mutationsMap.has(blot.domNode) ? (mutationsMap.get(blot.domNode).push(mutation), null) : (mutationsMap.set(blot.domNode, [mutation]), blot);
    }).forEach((blot) => {
      blot != null && blot !== this && mutationsMap.has(blot.domNode) && blot.update(mutationsMap.get(blot.domNode) || [], context);
    }), context.mutationsMap = mutationsMap, mutationsMap.has(this.domNode) && super.update(mutationsMap.get(this.domNode), context), this.optimize(mutations, context);
  }
};
_ScrollBlot.blotName = "scroll", _ScrollBlot.defaultChild = BlockBlot$1, _ScrollBlot.allowedChildren = [BlockBlot$1, ContainerBlot$1], _ScrollBlot.scope = Scope.BLOCK_BLOT, _ScrollBlot.tagName = "DIV";
let ScrollBlot = _ScrollBlot;
const ScrollBlot$1 = ScrollBlot, _TextBlot = class _TextBlot extends LeafBlot$1 {
  static create(value) {
    return document.createTextNode(value);
  }
  static value(domNode) {
    return domNode.data;
  }
  constructor(scroll, node) {
    super(scroll, node), this.text = this.statics.value(this.domNode);
  }
  deleteAt(index, length) {
    this.domNode.data = this.text = this.text.slice(0, index) + this.text.slice(index + length);
  }
  index(node, offset) {
    return this.domNode === node ? offset : -1;
  }
  insertAt(index, value, def) {
    def == null ? (this.text = this.text.slice(0, index) + value + this.text.slice(index), this.domNode.data = this.text) : super.insertAt(index, value, def);
  }
  length() {
    return this.text.length;
  }
  optimize(context) {
    super.optimize(context), this.text = this.statics.value(this.domNode), this.text.length === 0 ? this.remove() : this.next instanceof _TextBlot && this.next.prev === this && (this.insertAt(this.length(), this.next.value()), this.next.remove());
  }
  position(index, _inclusive = !1) {
    return [this.domNode, index];
  }
  split(index, force = !1) {
    if (!force) {
      if (index === 0)
        return this;
      if (index === this.length())
        return this.next;
    }
    const after = this.scroll.create(this.domNode.splitText(index));
    return this.parent.insertBefore(after, this.next || void 0), this.text = this.statics.value(this.domNode), after;
  }
  update(mutations, _context) {
    mutations.some((mutation) => mutation.type === "characterData" && mutation.target === this.domNode) && (this.text = this.statics.value(this.domNode));
  }
  value() {
    return this.text;
  }
};
_TextBlot.blotName = "text", _TextBlot.scope = Scope.INLINE_BLOT;
let TextBlot = _TextBlot;
const TextBlot$1 = TextBlot;
export {
  Attributor,
  AttributorStore$1 as AttributorStore,
  BlockBlot$1 as BlockBlot,
  ClassAttributor$1 as ClassAttributor,
  ContainerBlot$1 as ContainerBlot,
  EmbedBlot$1 as EmbedBlot,
  InlineBlot$1 as InlineBlot,
  LeafBlot$1 as LeafBlot,
  ParentBlot$1 as ParentBlot,
  Registry,
  Scope,
  ScrollBlot$1 as ScrollBlot,
  StyleAttributor$1 as StyleAttributor,
  TextBlot$1 as TextBlot
};
//# sourceMappingURL=parchment.js.map
