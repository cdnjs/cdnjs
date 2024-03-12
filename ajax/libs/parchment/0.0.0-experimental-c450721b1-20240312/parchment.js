var l = /* @__PURE__ */ ((a) => (a[a.TYPE = 3] = "TYPE", a[a.LEVEL = 12] = "LEVEL", a[a.ATTRIBUTE = 13] = "ATTRIBUTE", a[a.BLOT = 14] = "BLOT", a[a.INLINE = 7] = "INLINE", a[a.BLOCK = 11] = "BLOCK", a[a.BLOCK_BLOT = 10] = "BLOCK_BLOT", a[a.INLINE_BLOT = 6] = "INLINE_BLOT", a[a.BLOCK_ATTRIBUTE = 9] = "BLOCK_ATTRIBUTE", a[a.INLINE_ATTRIBUTE = 5] = "INLINE_ATTRIBUTE", a[a.ANY = 15] = "ANY", a))(l || {});
class b {
  constructor(t, e, s = {}) {
    this.attrName = t, this.keyName = e;
    const r = l.TYPE & l.ATTRIBUTE;
    this.scope = s.scope != null ? (
      // Ignore type bits, force attribute bit
      s.scope & l.LEVEL | r
    ) : l.ATTRIBUTE, s.whitelist != null && (this.whitelist = s.whitelist);
  }
  static keys(t) {
    return Array.from(t.attributes).map((e) => e.name);
  }
  add(t, e) {
    return this.canAdd(t, e) ? (t.setAttribute(this.keyName, e), !0) : !1;
  }
  canAdd(t, e) {
    return this.whitelist == null ? !0 : typeof e == "string" ? this.whitelist.indexOf(e.replace(/["']/g, "")) > -1 : this.whitelist.indexOf(e) > -1;
  }
  remove(t) {
    t.removeAttribute(this.keyName);
  }
  value(t) {
    const e = t.getAttribute(this.keyName);
    return this.canAdd(t, e) && e ? e : "";
  }
}
class N extends Error {
  constructor(t) {
    t = "[Parchment] " + t, super(t), this.message = t, this.name = this.constructor.name;
  }
}
const g = class g {
  constructor() {
    this.attributes = {}, this.classes = {}, this.tags = {}, this.types = {};
  }
  static find(t, e = !1) {
    if (t == null)
      return null;
    if (this.blots.has(t))
      return this.blots.get(t) || null;
    if (e) {
      let s = null;
      try {
        s = t.parentNode;
      } catch {
        return null;
      }
      return this.find(s, e);
    }
    return null;
  }
  create(t, e, s) {
    const r = this.query(e);
    if (r == null)
      throw new N(`Unable to create ${e} blot`);
    const i = r, h = (
      // @ts-expect-error Fix me later
      e instanceof Node || e.nodeType === Node.TEXT_NODE ? e : i.create(s)
    ), n = new i(t, h, s);
    return g.blots.set(n.domNode, n), n;
  }
  find(t, e = !1) {
    return g.find(t, e);
  }
  query(t, e = l.ANY) {
    let s;
    return typeof t == "string" ? s = this.types[t] || this.attributes[t] : t instanceof Text || t.nodeType === Node.TEXT_NODE ? s = this.types.text : typeof t == "number" ? t & l.LEVEL & l.BLOCK ? s = this.types.block : t & l.LEVEL & l.INLINE && (s = this.types.inline) : t instanceof Element && ((t.getAttribute("class") || "").split(/\s+/).some((i) => (s = this.classes[i], !!s)), s = s || this.tags[t.tagName]), s == null ? null : "scope" in s && e & l.LEVEL & s.scope && e & l.TYPE & s.scope ? s : null;
  }
  register(...t) {
    return t.map((e) => {
      const s = "blotName" in e, r = "attrName" in e;
      if (!s && !r)
        throw new N("Invalid definition");
      if (s && e.blotName === "abstract")
        throw new N("Cannot register abstract class");
      const i = s ? e.blotName : r ? e.attrName : void 0;
      return this.types[i] = e, r ? typeof e.keyName == "string" && (this.attributes[e.keyName] = e) : s && (e.className && (this.classes[e.className] = e), e.tagName && (Array.isArray(e.tagName) ? e.tagName = e.tagName.map((n) => n.toUpperCase()) : e.tagName = e.tagName.toUpperCase(), (Array.isArray(e.tagName) ? e.tagName : [e.tagName]).forEach((n) => {
        (this.tags[n] == null || e.className == null) && (this.tags[n] = e);
      }))), e;
    });
  }
};
g.blots = /* @__PURE__ */ new WeakMap();
let y = g;
function M(a, t) {
  return (a.getAttribute("class") || "").split(/\s+/).filter((s) => s.indexOf(`${t}-`) === 0);
}
class K extends b {
  static keys(t) {
    return (t.getAttribute("class") || "").split(/\s+/).map((e) => e.split("-").slice(0, -1).join("-"));
  }
  add(t, e) {
    return this.canAdd(t, e) ? (this.remove(t), t.classList.add(`${this.keyName}-${e}`), !0) : !1;
  }
  remove(t) {
    M(t, this.keyName).forEach((s) => {
      t.classList.remove(s);
    }), t.classList.length === 0 && t.removeAttribute("class");
  }
  value(t) {
    const s = (M(t, this.keyName)[0] || "").slice(this.keyName.length + 1);
    return this.canAdd(t, s) ? s : "";
  }
}
function x(a) {
  const t = a.split("-"), e = t.slice(1).map((s) => s[0].toUpperCase() + s.slice(1)).join("");
  return t[0] + e;
}
class Y extends b {
  static keys(t) {
    return (t.getAttribute("style") || "").split(";").map((e) => e.split(":")[0].trim());
  }
  add(t, e) {
    return this.canAdd(t, e) ? (t.style[x(this.keyName)] = e, !0) : !1;
  }
  remove(t) {
    t.style[x(this.keyName)] = "", t.getAttribute("style") || t.removeAttribute("style");
  }
  value(t) {
    const e = t.style[x(this.keyName)];
    return this.canAdd(t, e) ? e : "";
  }
}
class D {
  constructor(t) {
    this.attributes = {}, this.domNode = t, this.build();
  }
  attribute(t, e) {
    e ? t.add(this.domNode, e) && (t.value(this.domNode) != null ? this.attributes[t.attrName] = t : delete this.attributes[t.attrName]) : (t.remove(this.domNode), delete this.attributes[t.attrName]);
  }
  build() {
    this.attributes = {};
    const t = y.find(this.domNode);
    if (t == null)
      return;
    const e = b.keys(this.domNode), s = K.keys(this.domNode), r = Y.keys(this.domNode);
    e.concat(s).concat(r).forEach((i) => {
      const h = t.scroll.query(i, l.ATTRIBUTE);
      h instanceof b && (this.attributes[h.attrName] = h);
    });
  }
  copy(t) {
    Object.keys(this.attributes).forEach((e) => {
      const s = this.attributes[e].value(this.domNode);
      t.format(e, s);
    });
  }
  move(t) {
    this.copy(t), Object.keys(this.attributes).forEach((e) => {
      this.attributes[e].remove(this.domNode);
    }), this.attributes = {};
  }
  values() {
    return Object.keys(this.attributes).reduce(
      (t, e) => (t[e] = this.attributes[e].value(this.domNode), t),
      {}
    );
  }
}
const k = class k {
  constructor(t, e) {
    this.scroll = t, this.domNode = e, y.blots.set(e, this), this.prev = null, this.next = null;
  }
  static create(t) {
    if (this.tagName == null)
      throw new N("Blot definition missing tagName");
    let e, s;
    return Array.isArray(this.tagName) ? (typeof t == "string" ? (s = t.toUpperCase(), parseInt(s, 10).toString() === s && (s = parseInt(s, 10))) : typeof t == "number" && (s = t), typeof s == "number" ? e = document.createElement(this.tagName[s - 1]) : s && this.tagName.indexOf(s) > -1 ? e = document.createElement(s) : e = document.createElement(this.tagName[0])) : e = document.createElement(this.tagName), this.className && e.classList.add(this.className), e;
  }
  // Hack for accessing inherited static methods
  get statics() {
    return this.constructor;
  }
  attach() {
  }
  clone() {
    const t = this.domNode.cloneNode(!1);
    return this.scroll.create(t);
  }
  detach() {
    this.parent != null && this.parent.removeChild(this), y.blots.delete(this.domNode);
  }
  deleteAt(t, e) {
    this.isolate(t, e).remove();
  }
  formatAt(t, e, s, r) {
    const i = this.isolate(t, e);
    if (this.scroll.query(s, l.BLOT) != null && r)
      i.wrap(s, r);
    else if (this.scroll.query(s, l.ATTRIBUTE) != null) {
      const h = this.scroll.create(this.statics.scope);
      i.wrap(h), h.format(s, r);
    }
  }
  insertAt(t, e, s) {
    const r = s == null ? this.scroll.create("text", e) : this.scroll.create(e, s), i = this.split(t);
    this.parent.insertBefore(r, i || void 0);
  }
  isolate(t, e) {
    const s = this.split(t);
    if (s == null)
      throw new Error("Attempt to isolate at end");
    return s.split(e), s;
  }
  length() {
    return 1;
  }
  offset(t = this.parent) {
    return this.parent == null || this === t ? 0 : this.parent.children.offset(this) + this.parent.offset(t);
  }
  optimize(t) {
    this.statics.requiredContainer && !(this.parent instanceof this.statics.requiredContainer) && this.wrap(this.statics.requiredContainer.blotName);
  }
  remove() {
    this.domNode.parentNode != null && this.domNode.parentNode.removeChild(this.domNode), this.detach();
  }
  replaceWith(t, e) {
    const s = typeof t == "string" ? this.scroll.create(t, e) : t;
    return this.parent != null && (this.parent.insertBefore(s, this.next || void 0), this.remove()), s;
  }
  split(t, e) {
    return t === 0 ? this : this.next;
  }
  update(t, e) {
  }
  wrap(t, e) {
    const s = typeof t == "string" ? this.scroll.create(t, e) : t;
    if (this.parent != null && this.parent.insertBefore(s, this.next || void 0), typeof s.appendChild != "function")
      throw new N(`Cannot wrap ${t}`);
    return s.appendChild(this), s;
  }
};
k.blotName = "abstract";
let C = k;
const B = class B extends C {
  static value(t) {
    return !0;
  }
  index(t, e) {
    return this.domNode === t || this.domNode.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_CONTAINED_BY ? Math.min(e, 1) : -1;
  }
  position(t, e) {
    let r = Array.from(this.parent.domNode.childNodes).indexOf(this.domNode);
    return t > 0 && (r += 1), [this.parent.domNode, r];
  }
  value() {
    return {
      [this.statics.blotName]: this.statics.value(this.domNode) || !0
    };
  }
};
B.scope = l.INLINE_BLOT;
let A = B;
class q {
  constructor() {
    this.head = null, this.tail = null, this.length = 0;
  }
  append(...t) {
    if (this.insertBefore(t[0], null), t.length > 1) {
      const e = t.slice(1);
      this.append(...e);
    }
  }
  at(t) {
    const e = this.iterator();
    let s = e();
    for (; s && t > 0; )
      t -= 1, s = e();
    return s;
  }
  contains(t) {
    const e = this.iterator();
    let s = e();
    for (; s; ) {
      if (s === t)
        return !0;
      s = e();
    }
    return !1;
  }
  indexOf(t) {
    const e = this.iterator();
    let s = e(), r = 0;
    for (; s; ) {
      if (s === t)
        return r;
      r += 1, s = e();
    }
    return -1;
  }
  insertBefore(t, e) {
    t != null && (this.remove(t), t.next = e, e != null ? (t.prev = e.prev, e.prev != null && (e.prev.next = t), e.prev = t, e === this.head && (this.head = t)) : this.tail != null ? (this.tail.next = t, t.prev = this.tail, this.tail = t) : (t.prev = null, this.head = this.tail = t), this.length += 1);
  }
  offset(t) {
    let e = 0, s = this.head;
    for (; s != null; ) {
      if (s === t)
        return e;
      e += s.length(), s = s.next;
    }
    return -1;
  }
  remove(t) {
    this.contains(t) && (t.prev != null && (t.prev.next = t.next), t.next != null && (t.next.prev = t.prev), t === this.head && (this.head = t.next), t === this.tail && (this.tail = t.prev), this.length -= 1);
  }
  iterator(t = this.head) {
    return () => {
      const e = t;
      return t != null && (t = t.next), e;
    };
  }
  find(t, e = !1) {
    const s = this.iterator();
    let r = s();
    for (; r; ) {
      const i = r.length();
      if (t < i || e && t === i && (r.next == null || r.next.length() !== 0))
        return [r, t];
      t -= i, r = s();
    }
    return [null, 0];
  }
  forEach(t) {
    const e = this.iterator();
    let s = e();
    for (; s; )
      t(s), s = e();
  }
  forEachAt(t, e, s) {
    if (e <= 0)
      return;
    const [r, i] = this.find(t);
    let h = t - i;
    const n = this.iterator(r);
    let o = n();
    for (; o && h < t + e; ) {
      const c = o.length();
      t > h ? s(
        o,
        t - h,
        Math.min(e, h + c - t)
      ) : s(o, 0, Math.min(c, t + e - h)), h += c, o = n();
    }
  }
  map(t) {
    return this.reduce((e, s) => (e.push(t(s)), e), []);
  }
  reduce(t, e) {
    const s = this.iterator();
    let r = s();
    for (; r; )
      e = t(e, r), r = s();
    return e;
  }
}
function U(a, t) {
  const e = t.find(a);
  if (e)
    return e;
  try {
    return t.create(a);
  } catch {
    const r = t.create(l.INLINE);
    return Array.from(a.childNodes).forEach((i) => {
      r.domNode.appendChild(i);
    }), a.parentNode && a.parentNode.replaceChild(r.domNode, a), r.attach(), r;
  }
}
const f = class f extends C {
  constructor(t, e) {
    super(t, e), this.uiNode = null, this.build();
  }
  appendChild(t) {
    this.insertBefore(t);
  }
  attach() {
    super.attach(), this.children.forEach((t) => {
      t.attach();
    });
  }
  attachUI(t) {
    this.uiNode != null && this.uiNode.remove(), this.uiNode = t, f.uiClass && this.uiNode.classList.add(f.uiClass), this.uiNode.setAttribute("contenteditable", "false"), this.domNode.insertBefore(this.uiNode, this.domNode.firstChild);
  }
  build() {
    this.children = new q(), Array.from(this.domNode.childNodes).filter((t) => t !== this.uiNode).reverse().forEach((t) => {
      try {
        const e = U(t, this.scroll);
        this.insertBefore(e, this.children.head || void 0);
      } catch (e) {
        if (e instanceof N)
          return;
        throw e;
      }
    });
  }
  deleteAt(t, e) {
    if (t === 0 && e === this.length())
      return this.remove();
    this.children.forEachAt(t, e, (s, r, i) => {
      s.deleteAt(r, i);
    });
  }
  descendant(t, e = 0) {
    const [s, r] = this.children.find(e);
    return t.blotName == null && t(s) || t.blotName != null && s instanceof t ? [s, r] : s instanceof f ? s.descendant(t, r) : [null, -1];
  }
  descendants(t, e = 0, s = Number.MAX_VALUE) {
    let r = [], i = s;
    return this.children.forEachAt(
      e,
      s,
      (h, n, o) => {
        (t.blotName == null && t(h) || t.blotName != null && h instanceof t) && r.push(h), h instanceof f && (r = r.concat(
          h.descendants(t, n, i)
        )), i -= o;
      }
    ), r;
  }
  detach() {
    this.children.forEach((t) => {
      t.detach();
    }), super.detach();
  }
  enforceAllowedChildren() {
    let t = !1;
    this.children.forEach((e) => {
      t || this.statics.allowedChildren.some(
        (r) => e instanceof r
      ) || (e.statics.scope === l.BLOCK_BLOT ? (e.next != null && this.splitAfter(e), e.prev != null && this.splitAfter(e.prev), e.parent.unwrap(), t = !0) : e instanceof f ? e.unwrap() : e.remove());
    });
  }
  formatAt(t, e, s, r) {
    this.children.forEachAt(t, e, (i, h, n) => {
      i.formatAt(h, n, s, r);
    });
  }
  insertAt(t, e, s) {
    const [r, i] = this.children.find(t);
    if (r)
      r.insertAt(i, e, s);
    else {
      const h = s == null ? this.scroll.create("text", e) : this.scroll.create(e, s);
      this.appendChild(h);
    }
  }
  insertBefore(t, e) {
    t.parent != null && t.parent.children.remove(t);
    let s = null;
    this.children.insertBefore(t, e || null), t.parent = this, e != null && (s = e.domNode), (this.domNode.parentNode !== t.domNode || this.domNode.nextSibling !== s) && this.domNode.insertBefore(t.domNode, s), t.attach();
  }
  length() {
    return this.children.reduce((t, e) => t + e.length(), 0);
  }
  moveChildren(t, e) {
    this.children.forEach((s) => {
      t.insertBefore(s, e);
    });
  }
  optimize(t) {
    if (super.optimize(t), this.enforceAllowedChildren(), this.uiNode != null && this.uiNode !== this.domNode.firstChild && this.domNode.insertBefore(this.uiNode, this.domNode.firstChild), this.children.length === 0)
      if (this.statics.defaultChild != null) {
        const e = this.scroll.create(this.statics.defaultChild.blotName);
        this.appendChild(e);
      } else
        this.remove();
  }
  path(t, e = !1) {
    const [s, r] = this.children.find(t, e), i = [[this, t]];
    return s instanceof f ? i.concat(s.path(r, e)) : (s != null && i.push([s, r]), i);
  }
  removeChild(t) {
    this.children.remove(t);
  }
  replaceWith(t, e) {
    const s = typeof t == "string" ? this.scroll.create(t, e) : t;
    return s instanceof f && this.moveChildren(s), super.replaceWith(s);
  }
  split(t, e = !1) {
    if (!e) {
      if (t === 0)
        return this;
      if (t === this.length())
        return this.next;
    }
    const s = this.clone();
    return this.parent && this.parent.insertBefore(s, this.next || void 0), this.children.forEachAt(t, this.length(), (r, i, h) => {
      const n = r.split(i, e);
      n != null && s.appendChild(n);
    }), s;
  }
  splitAfter(t) {
    const e = this.clone();
    for (; t.next != null; )
      e.appendChild(t.next);
    return this.parent && this.parent.insertBefore(e, this.next || void 0), e;
  }
  unwrap() {
    this.parent && this.moveChildren(this.parent, this.next || void 0), this.remove();
  }
  update(t, e) {
    const s = [], r = [];
    t.forEach((i) => {
      i.target === this.domNode && i.type === "childList" && (s.push(...i.addedNodes), r.push(...i.removedNodes));
    }), r.forEach((i) => {
      if (i.parentNode != null && // @ts-expect-error Fix me later
      i.tagName !== "IFRAME" && document.body.compareDocumentPosition(i) & Node.DOCUMENT_POSITION_CONTAINED_BY)
        return;
      const h = this.scroll.find(i);
      h != null && (h.domNode.parentNode == null || h.domNode.parentNode === this.domNode) && h.detach();
    }), s.filter((i) => i.parentNode === this.domNode && i !== this.uiNode).sort((i, h) => i === h ? 0 : i.compareDocumentPosition(h) & Node.DOCUMENT_POSITION_FOLLOWING ? 1 : -1).forEach((i) => {
      let h = null;
      i.nextSibling != null && (h = this.scroll.find(i.nextSibling));
      const n = U(i, this.scroll);
      (n.next !== h || n.next == null) && (n.parent != null && n.parent.removeChild(this), this.insertBefore(n, h || void 0));
    }), this.enforceAllowedChildren();
  }
};
f.uiClass = "";
let m = f;
function V(a, t) {
  if (Object.keys(a).length !== Object.keys(t).length)
    return !1;
  for (const e in a)
    if (a[e] !== t[e])
      return !1;
  return !0;
}
const u = class u extends m {
  constructor(t, e) {
    super(t, e), this.attributes = new D(this.domNode);
  }
  static create(t) {
    return super.create(t);
  }
  static formats(t, e) {
    const s = e.query(u.blotName);
    if (!(s != null && t.tagName === s.tagName)) {
      if (typeof this.tagName == "string")
        return !0;
      if (Array.isArray(this.tagName))
        return t.tagName.toLowerCase();
    }
  }
  format(t, e) {
    if (t === this.statics.blotName && !e)
      this.children.forEach((s) => {
        s instanceof u || (s = s.wrap(u.blotName, !0)), this.attributes.copy(s);
      }), this.unwrap();
    else {
      const s = this.scroll.query(t, l.INLINE);
      if (s == null)
        return;
      s instanceof b ? this.attributes.attribute(s, e) : e && (t !== this.statics.blotName || this.formats()[t] !== e) && this.replaceWith(t, e);
    }
  }
  formats() {
    const t = this.attributes.values(), e = this.statics.formats(this.domNode, this.scroll);
    return e != null && (t[this.statics.blotName] = e), t;
  }
  formatAt(t, e, s, r) {
    this.formats()[s] != null || this.scroll.query(s, l.ATTRIBUTE) ? this.isolate(t, e).format(s, r) : super.formatAt(t, e, s, r);
  }
  optimize(t) {
    super.optimize(t);
    const e = this.formats();
    if (Object.keys(e).length === 0)
      return this.unwrap();
    const s = this.next;
    s instanceof u && s.prev === this && V(e, s.formats()) && (s.moveChildren(this), s.remove());
  }
  replaceWith(t, e) {
    const s = super.replaceWith(t, e);
    return this.attributes.copy(s), s;
  }
  update(t, e) {
    super.update(t, e), t.some(
      (r) => r.target === this.domNode && r.type === "attributes"
    ) && this.attributes.build();
  }
  wrap(t, e) {
    const s = super.wrap(t, e);
    return s instanceof u && this.attributes.move(s), s;
  }
};
u.allowedChildren = [u, A], u.blotName = "inline", u.scope = l.INLINE_BLOT, u.tagName = "SPAN";
let O = u;
const d = class d extends m {
  constructor(t, e) {
    super(t, e), this.attributes = new D(this.domNode);
  }
  static create(t) {
    return super.create(t);
  }
  static formats(t, e) {
    const s = e.query(d.blotName);
    if (!(s != null && t.tagName === s.tagName)) {
      if (typeof this.tagName == "string")
        return !0;
      if (Array.isArray(this.tagName))
        return t.tagName.toLowerCase();
    }
  }
  format(t, e) {
    const s = this.scroll.query(t, l.BLOCK);
    s != null && (s instanceof b ? this.attributes.attribute(s, e) : t === this.statics.blotName && !e ? this.replaceWith(d.blotName) : e && (t !== this.statics.blotName || this.formats()[t] !== e) && this.replaceWith(t, e));
  }
  formats() {
    const t = this.attributes.values(), e = this.statics.formats(this.domNode, this.scroll);
    return e != null && (t[this.statics.blotName] = e), t;
  }
  formatAt(t, e, s, r) {
    this.scroll.query(s, l.BLOCK) != null ? this.format(s, r) : super.formatAt(t, e, s, r);
  }
  insertAt(t, e, s) {
    if (s == null || this.scroll.query(e, l.INLINE) != null)
      super.insertAt(t, e, s);
    else {
      const r = this.split(t);
      if (r != null) {
        const i = this.scroll.create(e, s);
        r.parent.insertBefore(i, r);
      } else
        throw new Error("Attempt to insertAt after block boundaries");
    }
  }
  replaceWith(t, e) {
    const s = super.replaceWith(t, e);
    return this.attributes.copy(s), s;
  }
  update(t, e) {
    super.update(t, e), t.some(
      (r) => r.target === this.domNode && r.type === "attributes"
    ) && this.attributes.build();
  }
};
d.blotName = "block", d.scope = l.BLOCK_BLOT, d.tagName = "P", d.allowedChildren = [
  O,
  d,
  A
];
let T = d;
const L = class L extends m {
  checkMerge() {
    return this.next !== null && this.next.statics.blotName === this.statics.blotName;
  }
  deleteAt(t, e) {
    super.deleteAt(t, e), this.enforceAllowedChildren();
  }
  formatAt(t, e, s, r) {
    super.formatAt(t, e, s, r), this.enforceAllowedChildren();
  }
  insertAt(t, e, s) {
    super.insertAt(t, e, s), this.enforceAllowedChildren();
  }
  optimize(t) {
    super.optimize(t), this.children.length > 0 && this.next != null && this.checkMerge() && (this.next.moveChildren(this), this.next.remove());
  }
};
L.blotName = "container", L.scope = l.BLOCK_BLOT;
let I = L;
class X extends A {
  static formats(t, e) {
  }
  format(t, e) {
    super.formatAt(0, this.length(), t, e);
  }
  formatAt(t, e, s, r) {
    t === 0 && e === this.length() ? this.format(s, r) : super.formatAt(t, e, s, r);
  }
  formats() {
    return this.statics.formats(this.domNode, this.scroll);
  }
}
const j = {
  attributes: !0,
  characterData: !0,
  characterDataOldValue: !0,
  childList: !0,
  subtree: !0
}, $ = 100, p = class p extends m {
  constructor(t, e) {
    super(null, e), this.registry = t, this.scroll = this, this.build(), this.observer = new MutationObserver((s) => {
      this.update(s);
    }), this.observer.observe(this.domNode, j), this.attach();
  }
  create(t, e) {
    return this.registry.create(this, t, e);
  }
  find(t, e = !1) {
    const s = this.registry.find(t, e);
    return s ? s.scroll === this ? s : e ? this.find(s.scroll.domNode.parentNode, !0) : null : null;
  }
  query(t, e = l.ANY) {
    return this.registry.query(t, e);
  }
  register(...t) {
    return this.registry.register(...t);
  }
  build() {
    this.scroll != null && super.build();
  }
  detach() {
    super.detach(), this.observer.disconnect();
  }
  deleteAt(t, e) {
    this.update(), t === 0 && e === this.length() ? this.children.forEach((s) => {
      s.remove();
    }) : super.deleteAt(t, e);
  }
  formatAt(t, e, s, r) {
    this.update(), super.formatAt(t, e, s, r);
  }
  insertAt(t, e, s) {
    this.update(), super.insertAt(t, e, s);
  }
  optimize(t = [], e = {}) {
    super.optimize(e);
    const s = e.mutationsMap || /* @__PURE__ */ new WeakMap();
    let r = Array.from(this.observer.takeRecords());
    for (; r.length > 0; )
      t.push(r.pop());
    const i = (o, c = !0) => {
      o == null || o === this || o.domNode.parentNode != null && (s.has(o.domNode) || s.set(o.domNode, []), c && i(o.parent));
    }, h = (o) => {
      s.has(o.domNode) && (o instanceof m && o.children.forEach(h), s.delete(o.domNode), o.optimize(e));
    };
    let n = t;
    for (let o = 0; n.length > 0; o += 1) {
      if (o >= $)
        throw new Error("[Parchment] Maximum optimize iterations reached");
      for (n.forEach((c) => {
        const v = this.find(c.target, !0);
        v != null && (v.domNode === c.target && (c.type === "childList" ? (i(this.find(c.previousSibling, !1)), Array.from(c.addedNodes).forEach((P) => {
          const w = this.find(P, !1);
          i(w, !1), w instanceof m && w.children.forEach((W) => {
            i(W, !1);
          });
        })) : c.type === "attributes" && i(v.prev)), i(v));
      }), this.children.forEach(h), n = Array.from(this.observer.takeRecords()), r = n.slice(); r.length > 0; )
        t.push(r.pop());
    }
  }
  update(t, e = {}) {
    t = t || this.observer.takeRecords();
    const s = /* @__PURE__ */ new WeakMap();
    t.map((r) => {
      const i = this.find(r.target, !0);
      return i == null ? null : s.has(i.domNode) ? (s.get(i.domNode).push(r), null) : (s.set(i.domNode, [r]), i);
    }).forEach((r) => {
      r != null && r !== this && s.has(r.domNode) && r.update(s.get(r.domNode) || [], e);
    }), e.mutationsMap = s, s.has(this.domNode) && super.update(s.get(this.domNode), e), this.optimize(t, e);
  }
};
p.blotName = "scroll", p.defaultChild = T, p.allowedChildren = [T, I], p.scope = l.BLOCK_BLOT, p.tagName = "DIV";
let z = p;
const E = class E extends A {
  constructor(t, e) {
    super(t, e), this.text = this.statics.value(this.domNode);
  }
  static create(t) {
    return document.createTextNode(t);
  }
  static value(t) {
    return t.data;
  }
  deleteAt(t, e) {
    this.domNode.data = this.text = this.text.slice(0, t) + this.text.slice(t + e);
  }
  index(t, e) {
    return this.domNode === t ? e : -1;
  }
  insertAt(t, e, s) {
    s == null ? (this.text = this.text.slice(0, t) + e + this.text.slice(t), this.domNode.data = this.text) : super.insertAt(t, e, s);
  }
  length() {
    return this.text.length;
  }
  optimize(t) {
    super.optimize(t), this.text = this.statics.value(this.domNode), this.text.length === 0 ? this.remove() : this.next instanceof E && this.next.prev === this && (this.insertAt(this.length(), this.next.value()), this.next.remove());
  }
  position(t, e = !1) {
    return [this.domNode, t];
  }
  split(t, e = !1) {
    if (!e) {
      if (t === 0)
        return this;
      if (t === this.length())
        return this.next;
    }
    const s = this.scroll.create(this.domNode.splitText(t));
    return this.parent.insertBefore(s, this.next || void 0), this.text = this.statics.value(this.domNode), s;
  }
  update(t, e) {
    t.some((s) => s.type === "characterData" && s.target === this.domNode) && (this.text = this.statics.value(this.domNode));
  }
  value() {
    return this.text;
  }
};
E.blotName = "text", E.scope = l.INLINE_BLOT;
let R = E;
export {
  b as Attributor,
  D as AttributorStore,
  T as BlockBlot,
  K as ClassAttributor,
  I as ContainerBlot,
  X as EmbedBlot,
  O as InlineBlot,
  A as LeafBlot,
  m as ParentBlot,
  y as Registry,
  l as Scope,
  z as ScrollBlot,
  Y as StyleAttributor,
  R as TextBlot
};
//# sourceMappingURL=parchment.js.map
