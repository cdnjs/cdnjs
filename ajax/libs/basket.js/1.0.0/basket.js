import { Promise as o } from "rsvp";
const a = "basket-", h = 5e3, l = [], u = {
  default: v
}, y = document.head || document.getElementsByTagName("head")[0], p = (e, t) => {
  try {
    return localStorage.setItem(a + e, JSON.stringify(t)), !0;
  } catch (r) {
    if (r.name.toUpperCase().indexOf("QUOTA") >= 0) {
      const n = Object.entries(localStorage).filter(([s]) => s.startsWith(a)).map(([, s]) => JSON.parse(s)).sort((s, c) => s.stamp - c.stamp);
      return n.length ? (i.remove(n[0].key), p(e, t)) : void 0;
    }
    return;
  }
}, x = (e) => new o((t, r) => {
  const n = new XMLHttpRequest();
  n.open("GET", e), n.onreadystatechange = () => {
    n.readyState === 4 && (n.status === 200 || n.status === 0 && n.responseText ? t({
      content: n.responseText,
      type: n.getResponseHeader("content-type")
    }) : r(new Error(n.statusText)));
  }, setTimeout(() => {
    n.readyState < 4 && n.abort();
  }, i.timeout), n.send();
}), g = (e, t) => {
  const r = Date.now();
  return {
    ...e,
    data: t.content,
    originalType: t.type,
    type: e.type || t.type,
    skipCache: e.skipCache || !1,
    stamp: r,
    expire: r + (e.expire || h) * 60 * 60 * 1e3
  };
}, S = (e) => x(e.url).then((t) => {
  const r = g(e, t);
  return e.skipCache || p(e.key, r), r;
}), k = (e, t) => !e || e.expire - Date.now() < 0 || t.unique !== e.unique || i.isValidItem && !i.isValidItem(e, t), q = (e) => {
  if (!e.url)
    return;
  e.key = e.key || e.url;
  const t = i.get(e.key);
  e.execute = e.execute !== !1;
  const r = k(t, e);
  if (e.live || r) {
    e.unique && (e.url += (e.url.includes("?") ? "&" : "?") + "basket-unique=" + e.unique);
    let n = S(e);
    return e.live && !r && (n = n.then(
      (s) => s,
      () => t
    )), n;
  }
  return t.type = e.type || t.originalType, t.execute = e.execute, o.resolve(t);
};
function v(e) {
  const t = document.createElement("script");
  t.defer = !0, t.text = e.data, y.appendChild(t);
}
const f = (e) => e.map((t) => (t.execute && w(t), t)), w = (e) => e.type && u[e.type] ? u[e.type](e) : u.default(e), d = (...e) => {
  const t = e.map(q);
  return o.all(t);
};
function m(...e) {
  const t = d.apply(null, e), r = this.then(() => t).then(f);
  return r.thenRequire = m, r;
}
const i = {
  require(...e) {
    for (const r of e)
      r.execute = r.execute !== !1, r.once && l.includes(r.url) ? r.execute = !1 : r.execute !== !1 && !l.includes(r.url) && l.push(r.url);
    const t = d.apply(null, e).then(f);
    return t.thenRequire = m, t;
  },
  remove(e) {
    return localStorage.removeItem(a + e), this;
  },
  get(e) {
    const t = localStorage.getItem(a + e);
    try {
      return JSON.parse(t || "false");
    } catch {
      return !1;
    }
  },
  clear(e) {
    const t = Date.now(), r = Object.keys(localStorage).filter((n) => n.startsWith(a));
    for (const n of r) {
      const s = n.slice(a.length), c = this.get(s);
      c && (!e || c.expire <= t) && this.remove(s);
    }
    return this;
  },
  isValidItem: null,
  timeout: 5e3,
  addHandler(e, t) {
    Array.isArray(e) || (e = [e]), e.forEach((r) => {
      u[r] = t;
    });
  },
  removeHandler(e) {
    this.addHandler(e, void 0);
  }
};
i.clear(!0);
export {
  i as default
};
