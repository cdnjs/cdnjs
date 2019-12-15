!function() {
    'use strict';
    function u() {}
    var T = {};
    var s = [];
    var v = [];
    function n(i, f) {
        var n, e, r, t, l = v;
        for (t = arguments.length; 2 < t--; ) s.push(arguments[t]);
        if (f && null != f.children) {
            if (!s.length) s.push(f.children);
            delete f.children;
        }
        while (s.length) if ((e = s.pop()) && void 0 !== e.pop) for (t = e.length; t--; ) s.push(e[t]); else {
            if ('boolean' == typeof e) e = null;
            if (r = 'function' != typeof i) if (null == e) e = ''; else if ('number' == typeof e) e = String(e); else if ('string' != typeof e) r = !1;
            if (r && n) l[l.length - 1] += e; else if (l === v) l = [ e ]; else l.push(e);
            n = r;
        }
        var o = new u();
        o.nodeName = i;
        o.children = l;
        o.attributes = null == f ? void 0 : f;
        o.key = null == f ? void 0 : f.key;
        if (void 0 !== T.i) T.i(o);
        return o;
    }
    function _(i, f) {
        for (var n in f) i[n] = f[n];
        return i;
    }
    var f = 'function' == typeof Promise ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout;
    var a = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;
    var e = [];
    function t(i) {
        if (!i.__d && (i.__d = !0) && 1 == e.push(i)) (T.t || f)(r);
    }
    function r() {
        var i, f = e;
        e = [];
        while (i = f.pop()) if (i.__d) I(i);
    }
    function x(i, f, n) {
        if ('string' == typeof f || 'number' == typeof f) return void 0 !== i.splitText;
        if ('string' == typeof f.nodeName) return !i._componentConstructor && d(i, f.nodeName); else return n || i._componentConstructor === f.nodeName;
    }
    function d(i, f) {
        return i.__n === f || i.nodeName.toLowerCase() === f.toLowerCase();
    }
    function j(i) {
        var f = _({}, i.attributes);
        f.children = i.children;
        var n = i.nodeName.l;
        if (void 0 !== n) for (var e in n) if (void 0 === f[e]) f[e] = n[e];
        return f;
    }
    function S(i) {
        var f = i.parentNode;
        if (f) f.removeChild(i);
    }
    function h(i, f, n, e, r) {
        if ('className' === f) f = 'class';
        if ('key' === f) ; else if ('ref' === f) {
            if (n) n(null);
            if (e) e(i);
        } else if ('class' === f && !r) i.className = e || ''; else if ('style' === f) {
            if (!e || 'string' == typeof e || 'string' == typeof n) i.style.cssText = e || '';
            if (e && 'object' == typeof e) {
                if ('string' != typeof n) for (var t in n) if (!(t in e)) i.style[t] = '';
                for (var t in e) i.style[t] = 'number' == typeof e[t] && !1 === a.test(t) ? e[t] + 'px' : e[t];
            }
        } else if ('dangerouslySetInnerHTML' === f) {
            if (e) i.innerHTML = e.__html || '';
        } else if ('o' == f[0] && 'n' == f[1]) {
            var l = f !== (f = f.replace(/Capture$/, ''));
            f = f.toLowerCase().substring(2);
            if (e) {
                if (!n) i.addEventListener(f, c, l);
            } else i.removeEventListener(f, c, l);
            (i.__l || (i.__l = {}))[f] = e;
        } else if ('list' !== f && 'type' !== f && !r && f in i) {
            !function(i, f, n) {
                try {
                    i[f] = n;
                } catch (i) {}
            }(i, f, null == e ? '' : e);
            if (null == e || !1 === e) i.removeAttribute(f);
        } else {
            var o = r && f !== (f = f.replace(/^xlink:?/, ''));
            if (null == e || !1 === e) if (o) i.removeAttributeNS('http://www.w3.org/1999/xlink', f.toLowerCase()); else i.removeAttribute(f); else if ('function' != typeof e) if (o) i.setAttributeNS('http://www.w3.org/1999/xlink', f.toLowerCase(), e); else i.setAttribute(f, e);
        }
    }
    function c(i) {
        return this.__l[i.type](T.event && T.event(i) || i);
    }
    var C = [];
    var E = 0;
    var p = !1;
    var y = !1;
    function H() {
        var i;
        while (i = C.pop()) {
            if (T.o) T.o(i);
            if (i.u) i.u();
        }
    }
    function L(i, f, n, e, r, t) {
        if (!E++) {
            p = null != r && void 0 !== r.ownerSVGElement;
            y = null != i && !('__preactattr_' in i);
        }
        var l = P(i, f, n, e, t);
        if (r && l.parentNode !== r) r.appendChild(l);
        if (!--E) {
            y = !1;
            if (!t) H();
        }
        return l;
    }
    function P(i, f, n, e, r) {
        var t = i, l = p;
        if (null == f || 'boolean' == typeof f) f = '';
        if ('string' == typeof f || 'number' == typeof f) {
            if (i && void 0 !== i.splitText && i.parentNode && (!i._component || r)) {
                if (i.nodeValue != f) i.nodeValue = f;
            } else {
                t = document.createTextNode(f);
                if (i) {
                    if (i.parentNode) i.parentNode.replaceChild(t, i);
                    M(i, !0);
                }
            }
            t.__preactattr_ = !0;
            return t;
        }
        var o = f.nodeName;
        if ('function' == typeof o) return function(i, f, n, e) {
            var r = i && i._component, t = r, l = i, o = r && i._componentConstructor === f.nodeName, u = o, s = j(f);
            while (r && !u && (r = r.__u)) u = r.constructor === f.nodeName;
            if (r && u && (!e || r._component)) {
                z(r, s, 3, n, e);
                i = r.s;
            } else {
                if (t && !o) {
                    N(t);
                    i = l = null;
                }
                r = $(f.nodeName, s, n);
                if (i && !r.__b) {
                    r.__b = i;
                    l = null;
                }
                z(r, s, 1, n, e);
                i = r.s;
                if (l && i !== l) {
                    l._component = null;
                    M(l, !1);
                }
            }
            return i;
        }(i, f, n, e);
        p = 'svg' === o ? !0 : 'foreignObject' === o ? !1 : p;
        o = String(o);
        if (!i || !d(i, o)) {
            t = function(i, f) {
                var n = f ? document.createElementNS('http://www.w3.org/2000/svg', i) : document.createElement(i);
                n.__n = i;
                return n;
            }(o, p);
            if (i) {
                while (i.firstChild) t.appendChild(i.firstChild);
                if (i.parentNode) i.parentNode.replaceChild(t, i);
                M(i, !0);
            }
        }
        var u = t.firstChild, s = t.__preactattr_, v = f.children;
        if (null == s) {
            s = t.__preactattr_ = {};
            for (var a = t.attributes, c = a.length; c--; ) s[a[c].name] = a[c].value;
        }
        if (!y && v && 1 === v.length && 'string' == typeof v[0] && null != u && void 0 !== u.splitText && null == u.nextSibling) {
            if (u.nodeValue != v[0]) u.nodeValue = v[0];
        } else if (v && v.length || null != u) !function(i, f, n, e, r) {
            var t, l, o, u, s, v = i.childNodes, a = [], c = {}, d = 0, h = 0, p = v.length, y = 0, w = f ? f.length : 0;
            if (0 !== p) for (var g = 0; g < p; g++) {
                var m = v[g], b = m.__preactattr_, k = w && b ? m._component ? m._component.__k : b.key : null;
                if (null != k) {
                    d++;
                    c[k] = m;
                } else if (b || (void 0 !== m.splitText ? r ? m.nodeValue.trim() : 1 : r)) a[y++] = m;
            }
            if (0 !== w) for (var g = 0; g < w; g++) {
                u = f[g];
                s = null;
                var k = u.key;
                if (null != k) {
                    if (d && void 0 !== c[k]) {
                        s = c[k];
                        c[k] = void 0;
                        d--;
                    }
                } else if (!s && h < y) for (t = h; t < y; t++) if (void 0 !== a[t] && x(l = a[t], u, r)) {
                    s = l;
                    a[t] = void 0;
                    if (t === y - 1) y--;
                    if (t === h) h++;
                    break;
                }
                s = P(s, u, n, e);
                o = v[g];
                if (s && s !== i && s !== o) if (null == o) i.appendChild(s); else if (s === o.nextSibling) S(o); else i.insertBefore(s, o);
            }
            if (d) for (var g in c) if (void 0 !== c[g]) M(c[g], !1);
            while (h <= y) if (void 0 !== (s = a[y--])) M(s, !1);
        }(t, v, n, e, y || null != s.v);
        !function(i, f, n) {
            var e;
            for (e in n) if ((!f || null == f[e]) && null != n[e]) h(i, e, n[e], n[e] = void 0, p);
            for (e in f) if (!('children' === e || 'innerHTML' === e || e in n && f[e] === ('value' === e || 'checked' === e ? i[e] : n[e]))) h(i, e, n[e], n[e] = f[e], p);
        }(t, f.attributes, s);
        p = l;
        return t;
    }
    function M(i, f) {
        var n = i._component;
        if (n) N(n); else {
            if (null != i.__preactattr_ && i.__preactattr_.h) i.__preactattr_.h(null);
            if (!1 === f || null == i.__preactattr_) S(i);
            l(i);
        }
    }
    function l(i) {
        i = i.lastChild;
        while (i) {
            var f = i.previousSibling;
            M(i, !0);
            i = f;
        }
    }
    var o = {};
    function $(i, f, n) {
        var e, r = o[i.name];
        if (i.prototype && i.prototype.p) {
            e = new i(f, n);
            g.call(e, f, n);
        } else {
            e = new g(f, n);
            e.constructor = i;
            e.p = w;
        }
        if (r) for (var t = r.length; t--; ) if (r[t].constructor === i) {
            e.__b = r[t].__b;
            r.splice(t, 1);
            break;
        }
        return e;
    }
    function w(i, f, n) {
        return this.constructor(i, n);
    }
    function z(i, f, n, e, r) {
        if (!i.__x) {
            i.__x = !0;
            if (i.__r = f.h) delete f.h;
            if (i.__k = f.key) delete f.key;
            if (!i.s || r) {
                if (i.g) i.g();
            } else if (i.m) i.m(f, e);
            if (e && e !== i.context) {
                if (!i.__c) i.__c = i.context;
                i.context = e;
            }
            if (!i.__p) i.__p = i.k;
            i.k = f;
            i.__x = !1;
            if (0 !== n) if (1 === n || !1 !== T.S || !i.s) I(i, 1, r); else t(i);
            if (i.__r) i.__r(i);
        }
    }
    function I(i, f, n, e) {
        if (!i.__x) {
            var r, t, l, o = i.k, u = i.state, s = i.context, v = i.__p || o, a = i.__s || u, c = i.__c || s, d = i.s, h = i.__b, p = d || h, y = i._component, w = !1;
            if (d) {
                i.k = v;
                i.state = a;
                i.context = c;
                if (2 !== f && i.P && !1 === i.P(o, u, s)) w = !0; else if (i.T) i.T(o, u, s);
                i.k = o;
                i.state = u;
                i.context = s;
            }
            i.__p = i.__s = i.__c = i.__b = null;
            i.__d = !1;
            if (!w) {
                r = i.p(o, u, s);
                if (i._) s = _(_({}, s), i._());
                var g, m, b = r && r.nodeName;
                if ('function' == typeof b) {
                    var k = j(r);
                    t = y;
                    if (t && t.constructor === b && k.key == t.__k) z(t, k, 1, s, !1); else {
                        g = t;
                        i._component = t = $(b, k, s);
                        t.__b = t.__b || h;
                        t.__u = i;
                        z(t, k, 0, s, !1);
                        I(t, 1, n, !0);
                    }
                    m = t.s;
                } else {
                    l = p;
                    g = y;
                    if (g) l = i._component = null;
                    if (p || 1 === f) {
                        if (l) l._component = null;
                        m = L(l, r, s, n || !d, p && p.parentNode, !0);
                    }
                }
                if (p && m !== p && t !== y) {
                    var x = p.parentNode;
                    if (x && m !== x) {
                        x.replaceChild(m, p);
                        if (!g) {
                            p._component = null;
                            M(p, !1);
                        }
                    }
                }
                if (g) N(g);
                i.s = m;
                if (m && !e) {
                    var S = i, P = i;
                    while (P = P.__u) (S = P).s = m;
                    m._component = S;
                    m._componentConstructor = S.constructor;
                }
            }
            if (!d || n) C.unshift(i); else if (!w) {
                if (i.j) i.j(v, a, c);
                if (T.C) T.C(i);
            }
            if (null != i.__h) while (i.__h.length) i.__h.pop().call(i);
            if (!E && !e) H();
        }
    }
    function N(i) {
        if (T.H) T.H(i);
        var f = i.s;
        i.__x = !0;
        if (i.L) i.L();
        i.s = null;
        var n = i._component;
        if (n) N(n); else if (f) {
            if (f.__preactattr_ && f.__preactattr_.h) f.__preactattr_.h(null);
            i.__b = f;
            S(f);
            e = i, r = e.constructor.name, (o[r] || (o[r] = [])).push(e);
            l(f);
        }
        var e, r;
        if (i.__r) i.__r(null);
    }
    function g(i, f) {
        this.__d = !0;
        this.context = f;
        this.k = i;
        this.state = this.state || {};
    }
    _(g.prototype, {
        M: function(i, f) {
            var n = this.state;
            if (!this.__s) this.__s = _({}, n);
            _(n, 'function' == typeof i ? i(n, this.k) : i);
            if (f) (this.__h = this.__h || []).push(f);
            t(this);
        },
        $: function(i) {
            if (i) (this.__h = this.__h || []).push(i);
            I(this, 2);
        },
        p: function() {}
    });
    var i = {
        h: n,
        createElement: n,
        N: function(i, f) {
            return n(i.nodeName, _(_({}, i.attributes), f), 2 < arguments.length ? [].slice.call(arguments, 2) : i.children);
        },
        O: g,
        p: function(i, f, n) {
            return L(n, i, {}, !1, f, !1);
        },
        U: r,
        options: T
    };
    if ('undefined' != typeof module) module.q = i; else self.A = i;
}();