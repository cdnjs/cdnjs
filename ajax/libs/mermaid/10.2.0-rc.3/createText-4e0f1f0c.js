import { aJ as Et, l as Ct, as as At } from "./mermaid-17672fee.js";
function zt(n, r) {
  var { includeImageAlt: t = !0 } = r || {};
  return tt(n, t);
}
function tt(n, r) {
  return n && typeof n == "object" && // @ts-ignore looks like a literal.
  (n.value || // @ts-ignore looks like an image.
  (r ? n.alt : "") || // @ts-ignore looks like a parent.
  "children" in n && qn(n.children, r) || Array.isArray(n) && qn(n, r)) || "";
}
function qn(n, r) {
  for (var t = [], e = -1; ++e < n.length; )
    t[e] = tt(n[e], r);
  return t.join("");
}
function en(n, r, t, e) {
  const i = n.length;
  let u = 0, a;
  if (r < 0 ? r = -r > i ? 0 : i + r : r = r > i ? i : r, t = t > 0 ? t : 0, e.length < 1e4)
    a = Array.from(e), a.unshift(r, t), [].splice.apply(n, a);
  else
    for (t && [].splice.apply(n, [r, t]); u < e.length; )
      a = e.slice(u, u + 1e4), a.unshift(r, 0), [].splice.apply(n, a), u += 1e4, r += 1e4;
}
function Z(n, r) {
  return n.length > 0 ? (en(n, n.length, 0, r), n) : r;
}
const Hn = {}.hasOwnProperty;
function It(n) {
  const r = {};
  let t = -1;
  for (; ++t < n.length; )
    Tt(r, n[t]);
  return r;
}
function Tt(n, r) {
  let t;
  for (t in r) {
    const i = (Hn.call(n, t) ? n[t] : void 0) || (n[t] = {}), u = r[t];
    let a;
    for (a in u) {
      Hn.call(i, a) || (i[a] = []);
      const l = u[a];
      Bt(
        // @ts-expect-error Looks like a list.
        i[a],
        Array.isArray(l) ? l : l ? [l] : []
      );
    }
  }
}
function Bt(n, r) {
  let t = -1;
  const e = [];
  for (; ++t < r.length; )
    (r[t].add === "after" ? n : e).push(r[t]);
  en(n, 0, 0, e);
}
const Lt = /[!-/:-@[-`{-~\u00A1\u00A7\u00AB\u00B6\u00B7\u00BB\u00BF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]/, tn = sn(/[A-Za-z]/), An = sn(/\d/), Ot = sn(/[\dA-Fa-f]/), v = sn(/[\dA-Za-z]/), Dt = sn(/[!-/:-@[-`{-~]/), Vn = sn(/[#-'*+\--9=?A-Z^-~]/);
function zn(n) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    n !== null && (n < 32 || n === 127)
  );
}
function Y(n) {
  return n !== null && (n < 0 || n === 32);
}
function C(n) {
  return n !== null && n < -2;
}
function q(n) {
  return n === -2 || n === -1 || n === 32;
}
const Pt = sn(/\s/), _t = sn(Lt);
function sn(n) {
  return r;
  function r(t) {
    return t !== null && n.test(String.fromCharCode(t));
  }
}
function T(n, r, t, e) {
  const i = e ? e - 1 : Number.POSITIVE_INFINITY;
  let u = 0;
  return a;
  function a(c) {
    return q(c) ? (n.enter(t), l(c)) : r(c);
  }
  function l(c) {
    return q(c) && u++ < i ? (n.consume(c), l) : (n.exit(t), r(c));
  }
}
const Mt = {
  tokenize: Rt
};
function Rt(n) {
  const r = n.attempt(
    this.parser.constructs.contentInitial,
    e,
    i
  );
  let t;
  return r;
  function e(l) {
    if (l === null) {
      n.consume(l);
      return;
    }
    return n.enter("lineEnding"), n.consume(l), n.exit("lineEnding"), T(n, r, "linePrefix");
  }
  function i(l) {
    return n.enter("paragraph"), u(l);
  }
  function u(l) {
    const c = n.enter("chunkText", {
      contentType: "text",
      previous: t
    });
    return t && (t.next = c), t = c, a(l);
  }
  function a(l) {
    if (l === null) {
      n.exit("chunkText"), n.exit("paragraph"), n.consume(l);
      return;
    }
    return C(l) ? (n.consume(l), n.exit("chunkText"), u) : (n.consume(l), a);
  }
}
const jt = {
  tokenize: qt
}, Nn = {
  tokenize: Ht
};
function qt(n) {
  const r = this, t = [];
  let e = 0, i, u, a;
  return l;
  function l(F) {
    if (e < t.length) {
      const L = t[e];
      return r.containerState = L[1], n.attempt(
        L[0].continuation,
        c,
        p
      )(F);
    }
    return p(F);
  }
  function c(F) {
    if (e++, r.containerState._closeFlow) {
      r.containerState._closeFlow = void 0, i && _();
      const L = r.events.length;
      let O = L, d;
      for (; O--; )
        if (r.events[O][0] === "exit" && r.events[O][1].type === "chunkFlow") {
          d = r.events[O][1].end;
          break;
        }
      y(e);
      let P = L;
      for (; P < r.events.length; )
        r.events[P][1].end = Object.assign({}, d), P++;
      return en(
        r.events,
        O + 1,
        0,
        r.events.slice(L)
      ), r.events.length = P, p(F);
    }
    return l(F);
  }
  function p(F) {
    if (e === t.length) {
      if (!i)
        return g(F);
      if (i.currentConstruct && i.currentConstruct.concrete)
        return k(F);
      r.interrupt = !!(i.currentConstruct && !i._gfmTableDynamicInterruptHack);
    }
    return r.containerState = {}, n.check(
      Nn,
      h,
      x
    )(F);
  }
  function h(F) {
    return i && _(), y(e), g(F);
  }
  function x(F) {
    return r.parser.lazy[r.now().line] = e !== t.length, a = r.now().offset, k(F);
  }
  function g(F) {
    return r.containerState = {}, n.attempt(
      Nn,
      f,
      k
    )(F);
  }
  function f(F) {
    return e++, t.push([r.currentConstruct, r.containerState]), g(F);
  }
  function k(F) {
    if (F === null) {
      i && _(), y(0), n.consume(F);
      return;
    }
    return i = i || r.parser.flow(r.now()), n.enter("chunkFlow", {
      contentType: "flow",
      previous: u,
      _tokenizer: i
    }), B(F);
  }
  function B(F) {
    if (F === null) {
      D(n.exit("chunkFlow"), !0), y(0), n.consume(F);
      return;
    }
    return C(F) ? (n.consume(F), D(n.exit("chunkFlow")), e = 0, r.interrupt = void 0, l) : (n.consume(F), B);
  }
  function D(F, L) {
    const O = r.sliceStream(F);
    if (L && O.push(null), F.previous = u, u && (u.next = F), u = F, i.defineSkip(F.start), i.write(O), r.parser.lazy[F.start.line]) {
      let d = i.events.length;
      for (; d--; )
        if (
          // The token starts before the line ending…
          i.events[d][1].start.offset < a && // …and either is not ended yet…
          (!i.events[d][1].end || // …or ends after it.
          i.events[d][1].end.offset > a)
        )
          return;
      const P = r.events.length;
      let R = P, j, N;
      for (; R--; )
        if (r.events[R][0] === "exit" && r.events[R][1].type === "chunkFlow") {
          if (j) {
            N = r.events[R][1].end;
            break;
          }
          j = !0;
        }
      for (y(e), d = P; d < r.events.length; )
        r.events[d][1].end = Object.assign({}, N), d++;
      en(
        r.events,
        R + 1,
        0,
        r.events.slice(P)
      ), r.events.length = d;
    }
  }
  function y(F) {
    let L = t.length;
    for (; L-- > F; ) {
      const O = t[L];
      r.containerState = O[1], O[0].exit.call(r, n);
    }
    t.length = F;
  }
  function _() {
    i.write([null]), u = void 0, i = void 0, r.containerState._closeFlow = void 0;
  }
}
function Ht(n, r, t) {
  return T(
    n,
    n.attempt(this.parser.constructs.document, r, t),
    "linePrefix",
    this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4
  );
}
function Qn(n) {
  if (n === null || Y(n) || Pt(n))
    return 1;
  if (_t(n))
    return 2;
}
function Bn(n, r, t) {
  const e = [];
  let i = -1;
  for (; ++i < n.length; ) {
    const u = n[i].resolveAll;
    u && !e.includes(u) && (r = u(r, t), e.push(u));
  }
  return r;
}
const In = {
  name: "attention",
  tokenize: Nt,
  resolveAll: Vt
};
function Vt(n, r) {
  let t = -1, e, i, u, a, l, c, p, h;
  for (; ++t < n.length; )
    if (n[t][0] === "enter" && n[t][1].type === "attentionSequence" && n[t][1]._close) {
      for (e = t; e--; )
        if (n[e][0] === "exit" && n[e][1].type === "attentionSequence" && n[e][1]._open && // If the markers are the same:
        r.sliceSerialize(n[e][1]).charCodeAt(0) === r.sliceSerialize(n[t][1]).charCodeAt(0)) {
          if ((n[e][1]._close || n[t][1]._open) && (n[t][1].end.offset - n[t][1].start.offset) % 3 && !((n[e][1].end.offset - n[e][1].start.offset + n[t][1].end.offset - n[t][1].start.offset) % 3))
            continue;
          c = n[e][1].end.offset - n[e][1].start.offset > 1 && n[t][1].end.offset - n[t][1].start.offset > 1 ? 2 : 1;
          const x = Object.assign({}, n[e][1].end), g = Object.assign({}, n[t][1].start);
          Un(x, -c), Un(g, c), a = {
            type: c > 1 ? "strongSequence" : "emphasisSequence",
            start: x,
            end: Object.assign({}, n[e][1].end)
          }, l = {
            type: c > 1 ? "strongSequence" : "emphasisSequence",
            start: Object.assign({}, n[t][1].start),
            end: g
          }, u = {
            type: c > 1 ? "strongText" : "emphasisText",
            start: Object.assign({}, n[e][1].end),
            end: Object.assign({}, n[t][1].start)
          }, i = {
            type: c > 1 ? "strong" : "emphasis",
            start: Object.assign({}, a.start),
            end: Object.assign({}, l.end)
          }, n[e][1].end = Object.assign({}, a.start), n[t][1].start = Object.assign({}, l.end), p = [], n[e][1].end.offset - n[e][1].start.offset && (p = Z(p, [
            ["enter", n[e][1], r],
            ["exit", n[e][1], r]
          ])), p = Z(p, [
            ["enter", i, r],
            ["enter", a, r],
            ["exit", a, r],
            ["enter", u, r]
          ]), p = Z(
            p,
            Bn(
              r.parser.constructs.insideSpan.null,
              n.slice(e + 1, t),
              r
            )
          ), p = Z(p, [
            ["exit", u, r],
            ["enter", l, r],
            ["exit", l, r],
            ["exit", i, r]
          ]), n[t][1].end.offset - n[t][1].start.offset ? (h = 2, p = Z(p, [
            ["enter", n[t][1], r],
            ["exit", n[t][1], r]
          ])) : h = 0, en(n, e - 1, t - e + 3, p), t = e + p.length - h - 2;
          break;
        }
    }
  for (t = -1; ++t < n.length; )
    n[t][1].type === "attentionSequence" && (n[t][1].type = "data");
  return n;
}
function Nt(n, r) {
  const t = this.parser.constructs.attentionMarkers.null, e = this.previous, i = Qn(e);
  let u;
  return a;
  function a(c) {
    return n.enter("attentionSequence"), u = c, l(c);
  }
  function l(c) {
    if (c === u)
      return n.consume(c), l;
    const p = n.exit("attentionSequence"), h = Qn(c), x = !h || h === 2 && i || t.includes(c), g = !i || i === 2 && h || t.includes(e);
    return p._open = !!(u === 42 ? x : x && (i || !g)), p._close = !!(u === 42 ? g : g && (h || !x)), r(c);
  }
}
function Un(n, r) {
  n.column += r, n.offset += r, n._bufferIndex += r;
}
const Qt = {
  name: "autolink",
  tokenize: Ut
};
function Ut(n, r, t) {
  let e = 1;
  return i;
  function i(k) {
    return n.enter("autolink"), n.enter("autolinkMarker"), n.consume(k), n.exit("autolinkMarker"), n.enter("autolinkProtocol"), u;
  }
  function u(k) {
    return tn(k) ? (n.consume(k), a) : Vn(k) ? p(k) : t(k);
  }
  function a(k) {
    return k === 43 || k === 45 || k === 46 || v(k) ? l(k) : p(k);
  }
  function l(k) {
    return k === 58 ? (n.consume(k), c) : (k === 43 || k === 45 || k === 46 || v(k)) && e++ < 32 ? (n.consume(k), l) : p(k);
  }
  function c(k) {
    return k === 62 ? (n.exit("autolinkProtocol"), f(k)) : k === null || k === 32 || k === 60 || zn(k) ? t(k) : (n.consume(k), c);
  }
  function p(k) {
    return k === 64 ? (n.consume(k), e = 0, h) : Vn(k) ? (n.consume(k), p) : t(k);
  }
  function h(k) {
    return v(k) ? x(k) : t(k);
  }
  function x(k) {
    return k === 46 ? (n.consume(k), e = 0, h) : k === 62 ? (n.exit("autolinkProtocol").type = "autolinkEmail", f(k)) : g(k);
  }
  function g(k) {
    return (k === 45 || v(k)) && e++ < 63 ? (n.consume(k), k === 45 ? g : x) : t(k);
  }
  function f(k) {
    return n.enter("autolinkMarker"), n.consume(k), n.exit("autolinkMarker"), n.exit("autolink"), r;
  }
}
const Sn = {
  tokenize: Wt,
  partial: !0
};
function Wt(n, r, t) {
  return T(n, e, "linePrefix");
  function e(i) {
    return i === null || C(i) ? r(i) : t(i);
  }
}
const et = {
  name: "blockQuote",
  tokenize: $t,
  continuation: {
    tokenize: Zt
  },
  exit: Yt
};
function $t(n, r, t) {
  const e = this;
  return i;
  function i(a) {
    if (a === 62) {
      const l = e.containerState;
      return l.open || (n.enter("blockQuote", {
        _container: !0
      }), l.open = !0), n.enter("blockQuotePrefix"), n.enter("blockQuoteMarker"), n.consume(a), n.exit("blockQuoteMarker"), u;
    }
    return t(a);
  }
  function u(a) {
    return q(a) ? (n.enter("blockQuotePrefixWhitespace"), n.consume(a), n.exit("blockQuotePrefixWhitespace"), n.exit("blockQuotePrefix"), r) : (n.exit("blockQuotePrefix"), r(a));
  }
}
function Zt(n, r, t) {
  return T(
    n,
    n.attempt(et, r, t),
    "linePrefix",
    this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4
  );
}
function Yt(n) {
  n.exit("blockQuote");
}
const rt = {
  name: "characterEscape",
  tokenize: Gt
};
function Gt(n, r, t) {
  return e;
  function e(u) {
    return n.enter("characterEscape"), n.enter("escapeMarker"), n.consume(u), n.exit("escapeMarker"), i;
  }
  function i(u) {
    return Dt(u) ? (n.enter("characterEscapeValue"), n.consume(u), n.exit("characterEscapeValue"), n.exit("characterEscape"), r) : t(u);
  }
}
const Wn = document.createElement("i");
function Ln(n) {
  const r = "&" + n + ";";
  Wn.innerHTML = r;
  const t = Wn.textContent;
  return t.charCodeAt(t.length - 1) === 59 && n !== "semi" || t === r ? !1 : t;
}
const it = {
  name: "characterReference",
  tokenize: Jt
};
function Jt(n, r, t) {
  const e = this;
  let i = 0, u, a;
  return l;
  function l(x) {
    return n.enter("characterReference"), n.enter("characterReferenceMarker"), n.consume(x), n.exit("characterReferenceMarker"), c;
  }
  function c(x) {
    return x === 35 ? (n.enter("characterReferenceMarkerNumeric"), n.consume(x), n.exit("characterReferenceMarkerNumeric"), p) : (n.enter("characterReferenceValue"), u = 31, a = v, h(x));
  }
  function p(x) {
    return x === 88 || x === 120 ? (n.enter("characterReferenceMarkerHexadecimal"), n.consume(x), n.exit("characterReferenceMarkerHexadecimal"), n.enter("characterReferenceValue"), u = 6, a = Ot, h) : (n.enter("characterReferenceValue"), u = 7, a = An, h(x));
  }
  function h(x) {
    let g;
    return x === 59 && i ? (g = n.exit("characterReferenceValue"), a === v && !Ln(e.sliceSerialize(g)) ? t(x) : (n.enter("characterReferenceMarker"), n.consume(x), n.exit("characterReferenceMarker"), n.exit("characterReference"), r)) : a(x) && i++ < u ? (n.consume(x), h) : t(x);
  }
}
const $n = {
  name: "codeFenced",
  tokenize: Kt,
  concrete: !0
};
function Kt(n, r, t) {
  const e = this, i = {
    tokenize: O,
    partial: !0
  }, u = {
    tokenize: L,
    partial: !0
  }, a = this.events[this.events.length - 1], l = a && a[1].type === "linePrefix" ? a[2].sliceSerialize(a[1], !0).length : 0;
  let c = 0, p;
  return h;
  function h(d) {
    return n.enter("codeFenced"), n.enter("codeFencedFence"), n.enter("codeFencedFenceSequence"), p = d, x(d);
  }
  function x(d) {
    return d === p ? (n.consume(d), c++, x) : (n.exit("codeFencedFenceSequence"), c < 3 ? t(d) : T(n, g, "whitespace")(d));
  }
  function g(d) {
    return d === null || C(d) ? D(d) : (n.enter("codeFencedFenceInfo"), n.enter("chunkString", {
      contentType: "string"
    }), f(d));
  }
  function f(d) {
    return d === null || Y(d) ? (n.exit("chunkString"), n.exit("codeFencedFenceInfo"), T(n, k, "whitespace")(d)) : d === 96 && d === p ? t(d) : (n.consume(d), f);
  }
  function k(d) {
    return d === null || C(d) ? D(d) : (n.enter("codeFencedFenceMeta"), n.enter("chunkString", {
      contentType: "string"
    }), B(d));
  }
  function B(d) {
    return d === null || C(d) ? (n.exit("chunkString"), n.exit("codeFencedFenceMeta"), D(d)) : d === 96 && d === p ? t(d) : (n.consume(d), B);
  }
  function D(d) {
    return n.exit("codeFencedFence"), e.interrupt ? r(d) : y(d);
  }
  function y(d) {
    return d === null ? F(d) : C(d) ? n.attempt(
      u,
      n.attempt(
        i,
        F,
        l ? T(
          n,
          y,
          "linePrefix",
          l + 1
        ) : y
      ),
      F
    )(d) : (n.enter("codeFlowValue"), _(d));
  }
  function _(d) {
    return d === null || C(d) ? (n.exit("codeFlowValue"), y(d)) : (n.consume(d), _);
  }
  function F(d) {
    return n.exit("codeFenced"), r(d);
  }
  function L(d, P, R) {
    const j = this;
    return N;
    function N(w) {
      return d.enter("lineEnding"), d.consume(w), d.exit("lineEnding"), S;
    }
    function S(w) {
      return j.parser.lazy[j.now().line] ? R(w) : P(w);
    }
  }
  function O(d, P, R) {
    let j = 0;
    return T(
      d,
      N,
      "linePrefix",
      this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4
    );
    function N(A) {
      return d.enter("codeFencedFence"), d.enter("codeFencedFenceSequence"), S(A);
    }
    function S(A) {
      return A === p ? (d.consume(A), j++, S) : j < c ? R(A) : (d.exit("codeFencedFenceSequence"), T(d, w, "whitespace")(A));
    }
    function w(A) {
      return A === null || C(A) ? (d.exit("codeFencedFence"), P(A)) : R(A);
    }
  }
}
const En = {
  name: "codeIndented",
  tokenize: vt
}, Xt = {
  tokenize: ne,
  partial: !0
};
function vt(n, r, t) {
  const e = this;
  return i;
  function i(p) {
    return n.enter("codeIndented"), T(n, u, "linePrefix", 4 + 1)(p);
  }
  function u(p) {
    const h = e.events[e.events.length - 1];
    return h && h[1].type === "linePrefix" && h[2].sliceSerialize(h[1], !0).length >= 4 ? a(p) : t(p);
  }
  function a(p) {
    return p === null ? c(p) : C(p) ? n.attempt(Xt, a, c)(p) : (n.enter("codeFlowValue"), l(p));
  }
  function l(p) {
    return p === null || C(p) ? (n.exit("codeFlowValue"), a(p)) : (n.consume(p), l);
  }
  function c(p) {
    return n.exit("codeIndented"), r(p);
  }
}
function ne(n, r, t) {
  const e = this;
  return i;
  function i(a) {
    return e.parser.lazy[e.now().line] ? t(a) : C(a) ? (n.enter("lineEnding"), n.consume(a), n.exit("lineEnding"), i) : T(n, u, "linePrefix", 4 + 1)(a);
  }
  function u(a) {
    const l = e.events[e.events.length - 1];
    return l && l[1].type === "linePrefix" && l[2].sliceSerialize(l[1], !0).length >= 4 ? r(a) : C(a) ? i(a) : t(a);
  }
}
const te = {
  name: "codeText",
  tokenize: ie,
  resolve: ee,
  previous: re
};
function ee(n) {
  let r = n.length - 4, t = 3, e, i;
  if ((n[t][1].type === "lineEnding" || n[t][1].type === "space") && (n[r][1].type === "lineEnding" || n[r][1].type === "space")) {
    for (e = t; ++e < r; )
      if (n[e][1].type === "codeTextData") {
        n[t][1].type = "codeTextPadding", n[r][1].type = "codeTextPadding", t += 2, r -= 2;
        break;
      }
  }
  for (e = t - 1, r++; ++e <= r; )
    i === void 0 ? e !== r && n[e][1].type !== "lineEnding" && (i = e) : (e === r || n[e][1].type === "lineEnding") && (n[i][1].type = "codeTextData", e !== i + 2 && (n[i][1].end = n[e - 1][1].end, n.splice(i + 2, e - i - 2), r -= e - i - 2, e = i + 2), i = void 0);
  return n;
}
function re(n) {
  return n !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function ie(n, r, t) {
  let e = 0, i, u;
  return a;
  function a(x) {
    return n.enter("codeText"), n.enter("codeTextSequence"), l(x);
  }
  function l(x) {
    return x === 96 ? (n.consume(x), e++, l) : (n.exit("codeTextSequence"), c(x));
  }
  function c(x) {
    return x === null ? t(x) : x === 96 ? (u = n.enter("codeTextSequence"), i = 0, h(x)) : x === 32 ? (n.enter("space"), n.consume(x), n.exit("space"), c) : C(x) ? (n.enter("lineEnding"), n.consume(x), n.exit("lineEnding"), c) : (n.enter("codeTextData"), p(x));
  }
  function p(x) {
    return x === null || x === 32 || x === 96 || C(x) ? (n.exit("codeTextData"), c(x)) : (n.consume(x), p);
  }
  function h(x) {
    return x === 96 ? (n.consume(x), i++, h) : i === e ? (n.exit("codeTextSequence"), n.exit("codeText"), r(x)) : (u.type = "codeTextData", p(x));
  }
}
function ut(n) {
  const r = {};
  let t = -1, e, i, u, a, l, c, p;
  for (; ++t < n.length; ) {
    for (; t in r; )
      t = r[t];
    if (e = n[t], t && e[1].type === "chunkFlow" && n[t - 1][1].type === "listItemPrefix" && (c = e[1]._tokenizer.events, u = 0, u < c.length && c[u][1].type === "lineEndingBlank" && (u += 2), u < c.length && c[u][1].type === "content"))
      for (; ++u < c.length && c[u][1].type !== "content"; )
        c[u][1].type === "chunkText" && (c[u][1]._isInFirstContentOfListItem = !0, u++);
    if (e[0] === "enter")
      e[1].contentType && (Object.assign(r, ue(n, t)), t = r[t], p = !0);
    else if (e[1]._container) {
      for (u = t, i = void 0; u-- && (a = n[u], a[1].type === "lineEnding" || a[1].type === "lineEndingBlank"); )
        a[0] === "enter" && (i && (n[i][1].type = "lineEndingBlank"), a[1].type = "lineEnding", i = u);
      i && (e[1].end = Object.assign({}, n[i][1].start), l = n.slice(i, t), l.unshift(e), en(n, i, t - i + 1, l));
    }
  }
  return !p;
}
function ue(n, r) {
  const t = n[r][1], e = n[r][2];
  let i = r - 1;
  const u = [], a = t._tokenizer || e.parser[t.contentType](t.start), l = a.events, c = [], p = {};
  let h, x, g = -1, f = t, k = 0, B = 0;
  const D = [B];
  for (; f; ) {
    for (; n[++i][1] !== f; )
      ;
    u.push(i), f._tokenizer || (h = e.sliceStream(f), f.next || h.push(null), x && a.defineSkip(f.start), f._isInFirstContentOfListItem && (a._gfmTasklistFirstContentOfListItem = !0), a.write(h), f._isInFirstContentOfListItem && (a._gfmTasklistFirstContentOfListItem = void 0)), x = f, f = f.next;
  }
  for (f = t; ++g < l.length; )
    // Find a void token that includes a break.
    l[g][0] === "exit" && l[g - 1][0] === "enter" && l[g][1].type === l[g - 1][1].type && l[g][1].start.line !== l[g][1].end.line && (B = g + 1, D.push(B), f._tokenizer = void 0, f.previous = void 0, f = f.next);
  for (a.events = [], f ? (f._tokenizer = void 0, f.previous = void 0) : D.pop(), g = D.length; g--; ) {
    const y = l.slice(D[g], D[g + 1]), _ = u.pop();
    c.unshift([_, _ + y.length - 1]), en(n, _, 2, y);
  }
  for (g = -1; ++g < c.length; )
    p[k + c[g][0]] = k + c[g][1], k += c[g][1] - c[g][0] - 1;
  return p;
}
const ae = {
  tokenize: se,
  resolve: oe
}, le = {
  tokenize: ce,
  partial: !0
};
function oe(n) {
  return ut(n), n;
}
function se(n, r) {
  let t;
  return e;
  function e(l) {
    return n.enter("content"), t = n.enter("chunkContent", {
      contentType: "content"
    }), i(l);
  }
  function i(l) {
    return l === null ? u(l) : C(l) ? n.check(
      le,
      a,
      u
    )(l) : (n.consume(l), i);
  }
  function u(l) {
    return n.exit("chunkContent"), n.exit("content"), r(l);
  }
  function a(l) {
    return n.consume(l), n.exit("chunkContent"), t.next = n.enter("chunkContent", {
      contentType: "content",
      previous: t
    }), t = t.next, i;
  }
}
function ce(n, r, t) {
  const e = this;
  return i;
  function i(a) {
    return n.exit("chunkContent"), n.enter("lineEnding"), n.consume(a), n.exit("lineEnding"), T(n, u, "linePrefix");
  }
  function u(a) {
    if (a === null || C(a))
      return t(a);
    const l = e.events[e.events.length - 1];
    return !e.parser.constructs.disable.null.includes("codeIndented") && l && l[1].type === "linePrefix" && l[2].sliceSerialize(l[1], !0).length >= 4 ? r(a) : n.interrupt(e.parser.constructs.flow, t, r)(a);
  }
}
function at(n, r, t, e, i, u, a, l, c) {
  const p = c || Number.POSITIVE_INFINITY;
  let h = 0;
  return x;
  function x(y) {
    return y === 60 ? (n.enter(e), n.enter(i), n.enter(u), n.consume(y), n.exit(u), g) : y === null || y === 41 || zn(y) ? t(y) : (n.enter(e), n.enter(a), n.enter(l), n.enter("chunkString", {
      contentType: "string"
    }), B(y));
  }
  function g(y) {
    return y === 62 ? (n.enter(u), n.consume(y), n.exit(u), n.exit(i), n.exit(e), r) : (n.enter(l), n.enter("chunkString", {
      contentType: "string"
    }), f(y));
  }
  function f(y) {
    return y === 62 ? (n.exit("chunkString"), n.exit(l), g(y)) : y === null || y === 60 || C(y) ? t(y) : (n.consume(y), y === 92 ? k : f);
  }
  function k(y) {
    return y === 60 || y === 62 || y === 92 ? (n.consume(y), f) : f(y);
  }
  function B(y) {
    return y === 40 ? ++h > p ? t(y) : (n.consume(y), B) : y === 41 ? h-- ? (n.consume(y), B) : (n.exit("chunkString"), n.exit(l), n.exit(a), n.exit(e), r(y)) : y === null || Y(y) ? h ? t(y) : (n.exit("chunkString"), n.exit(l), n.exit(a), n.exit(e), r(y)) : zn(y) ? t(y) : (n.consume(y), y === 92 ? D : B);
  }
  function D(y) {
    return y === 40 || y === 41 || y === 92 ? (n.consume(y), B) : B(y);
  }
}
function lt(n, r, t, e, i, u) {
  const a = this;
  let l = 0, c;
  return p;
  function p(f) {
    return n.enter(e), n.enter(i), n.consume(f), n.exit(i), n.enter(u), h;
  }
  function h(f) {
    return f === null || f === 91 || f === 93 && !c || /* To do: remove in the future once we’ve switched from
     * `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
     * which doesn’t need this */
    /* Hidden footnotes hook */
    /* c8 ignore next 3 */
    f === 94 && !l && "_hiddenFootnoteSupport" in a.parser.constructs || l > 999 ? t(f) : f === 93 ? (n.exit(u), n.enter(i), n.consume(f), n.exit(i), n.exit(e), r) : C(f) ? (n.enter("lineEnding"), n.consume(f), n.exit("lineEnding"), h) : (n.enter("chunkString", {
      contentType: "string"
    }), x(f));
  }
  function x(f) {
    return f === null || f === 91 || f === 93 || C(f) || l++ > 999 ? (n.exit("chunkString"), h(f)) : (n.consume(f), c = c || !q(f), f === 92 ? g : x);
  }
  function g(f) {
    return f === 91 || f === 92 || f === 93 ? (n.consume(f), l++, x) : x(f);
  }
}
function ot(n, r, t, e, i, u) {
  let a;
  return l;
  function l(g) {
    return n.enter(e), n.enter(i), n.consume(g), n.exit(i), a = g === 40 ? 41 : g, c;
  }
  function c(g) {
    return g === a ? (n.enter(i), n.consume(g), n.exit(i), n.exit(e), r) : (n.enter(u), p(g));
  }
  function p(g) {
    return g === a ? (n.exit(u), c(a)) : g === null ? t(g) : C(g) ? (n.enter("lineEnding"), n.consume(g), n.exit("lineEnding"), T(n, p, "linePrefix")) : (n.enter("chunkString", {
      contentType: "string"
    }), h(g));
  }
  function h(g) {
    return g === a || g === null || C(g) ? (n.exit("chunkString"), p(g)) : (n.consume(g), g === 92 ? x : h);
  }
  function x(g) {
    return g === a || g === 92 ? (n.consume(g), h) : h(g);
  }
}
function dn(n, r) {
  let t;
  return e;
  function e(i) {
    return C(i) ? (n.enter("lineEnding"), n.consume(i), n.exit("lineEnding"), t = !0, e) : q(i) ? T(
      n,
      e,
      t ? "linePrefix" : "lineSuffix"
    )(i) : r(i);
  }
}
function fn(n) {
  return n.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
const he = {
  name: "definition",
  tokenize: me
}, pe = {
  tokenize: fe,
  partial: !0
};
function me(n, r, t) {
  const e = this;
  let i;
  return u;
  function u(c) {
    return n.enter("definition"), lt.call(
      e,
      n,
      a,
      t,
      "definitionLabel",
      "definitionLabelMarker",
      "definitionLabelString"
    )(c);
  }
  function a(c) {
    return i = fn(
      e.sliceSerialize(e.events[e.events.length - 1][1]).slice(1, -1)
    ), c === 58 ? (n.enter("definitionMarker"), n.consume(c), n.exit("definitionMarker"), dn(
      n,
      at(
        n,
        n.attempt(
          pe,
          T(n, l, "whitespace"),
          T(n, l, "whitespace")
        ),
        t,
        "definitionDestination",
        "definitionDestinationLiteral",
        "definitionDestinationLiteralMarker",
        "definitionDestinationRaw",
        "definitionDestinationString"
      )
    )) : t(c);
  }
  function l(c) {
    return c === null || C(c) ? (n.exit("definition"), e.parser.defined.includes(i) || e.parser.defined.push(i), r(c)) : t(c);
  }
}
function fe(n, r, t) {
  return e;
  function e(a) {
    return Y(a) ? dn(n, i)(a) : t(a);
  }
  function i(a) {
    return a === 34 || a === 39 || a === 40 ? ot(
      n,
      T(n, u, "whitespace"),
      t,
      "definitionTitle",
      "definitionTitleMarker",
      "definitionTitleString"
    )(a) : t(a);
  }
  function u(a) {
    return a === null || C(a) ? r(a) : t(a);
  }
}
const xe = {
  name: "hardBreakEscape",
  tokenize: ge
};
function ge(n, r, t) {
  return e;
  function e(u) {
    return n.enter("hardBreakEscape"), n.enter("escapeMarker"), n.consume(u), i;
  }
  function i(u) {
    return C(u) ? (n.exit("escapeMarker"), n.exit("hardBreakEscape"), r(u)) : t(u);
  }
}
const ke = {
  name: "headingAtx",
  tokenize: be,
  resolve: de
};
function de(n, r) {
  let t = n.length - 2, e = 3, i, u;
  return n[e][1].type === "whitespace" && (e += 2), t - 2 > e && n[t][1].type === "whitespace" && (t -= 2), n[t][1].type === "atxHeadingSequence" && (e === t - 1 || t - 4 > e && n[t - 2][1].type === "whitespace") && (t -= e + 1 === t ? 2 : 4), t > e && (i = {
    type: "atxHeadingText",
    start: n[e][1].start,
    end: n[t][1].end
  }, u = {
    type: "chunkText",
    start: n[e][1].start,
    end: n[t][1].end,
    // @ts-expect-error Constants are fine to assign.
    contentType: "text"
  }, en(n, e, t - e + 1, [
    ["enter", i, r],
    ["enter", u, r],
    ["exit", u, r],
    ["exit", i, r]
  ])), n;
}
function be(n, r, t) {
  const e = this;
  let i = 0;
  return u;
  function u(h) {
    return n.enter("atxHeading"), n.enter("atxHeadingSequence"), a(h);
  }
  function a(h) {
    return h === 35 && i++ < 6 ? (n.consume(h), a) : h === null || Y(h) ? (n.exit("atxHeadingSequence"), e.interrupt ? r(h) : l(h)) : t(h);
  }
  function l(h) {
    return h === 35 ? (n.enter("atxHeadingSequence"), c(h)) : h === null || C(h) ? (n.exit("atxHeading"), r(h)) : q(h) ? T(n, l, "whitespace")(h) : (n.enter("atxHeadingText"), p(h));
  }
  function c(h) {
    return h === 35 ? (n.consume(h), c) : (n.exit("atxHeadingSequence"), l(h));
  }
  function p(h) {
    return h === null || h === 35 || Y(h) ? (n.exit("atxHeadingText"), l(h)) : (n.consume(h), p);
  }
}
const ye = [
  "address",
  "article",
  "aside",
  "base",
  "basefont",
  "blockquote",
  "body",
  "caption",
  "center",
  "col",
  "colgroup",
  "dd",
  "details",
  "dialog",
  "dir",
  "div",
  "dl",
  "dt",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "frame",
  "frameset",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hr",
  "html",
  "iframe",
  "legend",
  "li",
  "link",
  "main",
  "menu",
  "menuitem",
  "nav",
  "noframes",
  "ol",
  "optgroup",
  "option",
  "p",
  "param",
  "section",
  "summary",
  "table",
  "tbody",
  "td",
  "tfoot",
  "th",
  "thead",
  "title",
  "tr",
  "track",
  "ul"
], Zn = ["pre", "script", "style", "textarea"], Se = {
  name: "htmlFlow",
  tokenize: Ee,
  resolveTo: we,
  concrete: !0
}, Fe = {
  tokenize: Ce,
  partial: !0
};
function we(n) {
  let r = n.length;
  for (; r-- && !(n[r][0] === "enter" && n[r][1].type === "htmlFlow"); )
    ;
  return r > 1 && n[r - 2][1].type === "linePrefix" && (n[r][1].start = n[r - 2][1].start, n[r + 1][1].start = n[r - 2][1].start, n.splice(r - 2, 2)), n;
}
function Ee(n, r, t) {
  const e = this;
  let i, u, a, l, c;
  return p;
  function p(o) {
    return n.enter("htmlFlow"), n.enter("htmlFlowData"), n.consume(o), h;
  }
  function h(o) {
    return o === 33 ? (n.consume(o), x) : o === 47 ? (n.consume(o), k) : o === 63 ? (n.consume(o), i = 3, e.interrupt ? r : W) : tn(o) ? (n.consume(o), a = String.fromCharCode(o), u = !0, B) : t(o);
  }
  function x(o) {
    return o === 45 ? (n.consume(o), i = 2, g) : o === 91 ? (n.consume(o), i = 5, a = "CDATA[", l = 0, f) : tn(o) ? (n.consume(o), i = 4, e.interrupt ? r : W) : t(o);
  }
  function g(o) {
    return o === 45 ? (n.consume(o), e.interrupt ? r : W) : t(o);
  }
  function f(o) {
    return o === a.charCodeAt(l++) ? (n.consume(o), l === a.length ? e.interrupt ? r : S : f) : t(o);
  }
  function k(o) {
    return tn(o) ? (n.consume(o), a = String.fromCharCode(o), B) : t(o);
  }
  function B(o) {
    return o === null || o === 47 || o === 62 || Y(o) ? o !== 47 && u && Zn.includes(a.toLowerCase()) ? (i = 1, e.interrupt ? r(o) : S(o)) : ye.includes(a.toLowerCase()) ? (i = 6, o === 47 ? (n.consume(o), D) : e.interrupt ? r(o) : S(o)) : (i = 7, e.interrupt && !e.parser.lazy[e.now().line] ? t(o) : u ? _(o) : y(o)) : o === 45 || v(o) ? (n.consume(o), a += String.fromCharCode(o), B) : t(o);
  }
  function D(o) {
    return o === 62 ? (n.consume(o), e.interrupt ? r : S) : t(o);
  }
  function y(o) {
    return q(o) ? (n.consume(o), y) : j(o);
  }
  function _(o) {
    return o === 47 ? (n.consume(o), j) : o === 58 || o === 95 || tn(o) ? (n.consume(o), F) : q(o) ? (n.consume(o), _) : j(o);
  }
  function F(o) {
    return o === 45 || o === 46 || o === 58 || o === 95 || v(o) ? (n.consume(o), F) : L(o);
  }
  function L(o) {
    return o === 61 ? (n.consume(o), O) : q(o) ? (n.consume(o), L) : _(o);
  }
  function O(o) {
    return o === null || o === 60 || o === 61 || o === 62 || o === 96 ? t(o) : o === 34 || o === 39 ? (n.consume(o), c = o, d) : q(o) ? (n.consume(o), O) : (c = null, P(o));
  }
  function d(o) {
    return o === null || C(o) ? t(o) : o === c ? (n.consume(o), R) : (n.consume(o), d);
  }
  function P(o) {
    return o === null || o === 34 || o === 39 || o === 60 || o === 61 || o === 62 || o === 96 || Y(o) ? L(o) : (n.consume(o), P);
  }
  function R(o) {
    return o === 47 || o === 62 || q(o) ? _(o) : t(o);
  }
  function j(o) {
    return o === 62 ? (n.consume(o), N) : t(o);
  }
  function N(o) {
    return q(o) ? (n.consume(o), N) : o === null || C(o) ? S(o) : t(o);
  }
  function S(o) {
    return o === 45 && i === 2 ? (n.consume(o), G) : o === 60 && i === 1 ? (n.consume(o), nn) : o === 62 && i === 4 ? (n.consume(o), H) : o === 63 && i === 3 ? (n.consume(o), W) : o === 93 && i === 5 ? (n.consume(o), Q) : C(o) && (i === 6 || i === 7) ? n.check(
      Fe,
      H,
      w
    )(o) : o === null || C(o) ? w(o) : (n.consume(o), S);
  }
  function w(o) {
    return n.exit("htmlFlowData"), A(o);
  }
  function A(o) {
    return o === null ? s(o) : C(o) ? n.attempt(
      {
        tokenize: U,
        partial: !0
      },
      A,
      s
    )(o) : (n.enter("htmlFlowData"), S(o));
  }
  function U(o, cn, xn) {
    return hn;
    function hn(K) {
      return o.enter("lineEnding"), o.consume(K), o.exit("lineEnding"), V;
    }
    function V(K) {
      return e.parser.lazy[e.now().line] ? xn(K) : cn(K);
    }
  }
  function G(o) {
    return o === 45 ? (n.consume(o), W) : S(o);
  }
  function nn(o) {
    return o === 47 ? (n.consume(o), a = "", J) : S(o);
  }
  function J(o) {
    return o === 62 && Zn.includes(a.toLowerCase()) ? (n.consume(o), H) : tn(o) && a.length < 8 ? (n.consume(o), a += String.fromCharCode(o), J) : S(o);
  }
  function Q(o) {
    return o === 93 ? (n.consume(o), W) : S(o);
  }
  function W(o) {
    return o === 62 ? (n.consume(o), H) : o === 45 && i === 2 ? (n.consume(o), W) : S(o);
  }
  function H(o) {
    return o === null || C(o) ? (n.exit("htmlFlowData"), s(o)) : (n.consume(o), H);
  }
  function s(o) {
    return n.exit("htmlFlow"), r(o);
  }
}
function Ce(n, r, t) {
  return e;
  function e(i) {
    return n.exit("htmlFlowData"), n.enter("lineEndingBlank"), n.consume(i), n.exit("lineEndingBlank"), n.attempt(Sn, r, t);
  }
}
const Ae = {
  name: "htmlText",
  tokenize: ze
};
function ze(n, r, t) {
  const e = this;
  let i, u, a, l;
  return c;
  function c(s) {
    return n.enter("htmlText"), n.enter("htmlTextData"), n.consume(s), p;
  }
  function p(s) {
    return s === 33 ? (n.consume(s), h) : s === 47 ? (n.consume(s), P) : s === 63 ? (n.consume(s), O) : tn(s) ? (n.consume(s), N) : t(s);
  }
  function h(s) {
    return s === 45 ? (n.consume(s), x) : s === 91 ? (n.consume(s), u = "CDATA[", a = 0, D) : tn(s) ? (n.consume(s), L) : t(s);
  }
  function x(s) {
    return s === 45 ? (n.consume(s), g) : t(s);
  }
  function g(s) {
    return s === null || s === 62 ? t(s) : s === 45 ? (n.consume(s), f) : k(s);
  }
  function f(s) {
    return s === null || s === 62 ? t(s) : k(s);
  }
  function k(s) {
    return s === null ? t(s) : s === 45 ? (n.consume(s), B) : C(s) ? (l = k, Q(s)) : (n.consume(s), k);
  }
  function B(s) {
    return s === 45 ? (n.consume(s), H) : k(s);
  }
  function D(s) {
    return s === u.charCodeAt(a++) ? (n.consume(s), a === u.length ? y : D) : t(s);
  }
  function y(s) {
    return s === null ? t(s) : s === 93 ? (n.consume(s), _) : C(s) ? (l = y, Q(s)) : (n.consume(s), y);
  }
  function _(s) {
    return s === 93 ? (n.consume(s), F) : y(s);
  }
  function F(s) {
    return s === 62 ? H(s) : s === 93 ? (n.consume(s), F) : y(s);
  }
  function L(s) {
    return s === null || s === 62 ? H(s) : C(s) ? (l = L, Q(s)) : (n.consume(s), L);
  }
  function O(s) {
    return s === null ? t(s) : s === 63 ? (n.consume(s), d) : C(s) ? (l = O, Q(s)) : (n.consume(s), O);
  }
  function d(s) {
    return s === 62 ? H(s) : O(s);
  }
  function P(s) {
    return tn(s) ? (n.consume(s), R) : t(s);
  }
  function R(s) {
    return s === 45 || v(s) ? (n.consume(s), R) : j(s);
  }
  function j(s) {
    return C(s) ? (l = j, Q(s)) : q(s) ? (n.consume(s), j) : H(s);
  }
  function N(s) {
    return s === 45 || v(s) ? (n.consume(s), N) : s === 47 || s === 62 || Y(s) ? S(s) : t(s);
  }
  function S(s) {
    return s === 47 ? (n.consume(s), H) : s === 58 || s === 95 || tn(s) ? (n.consume(s), w) : C(s) ? (l = S, Q(s)) : q(s) ? (n.consume(s), S) : H(s);
  }
  function w(s) {
    return s === 45 || s === 46 || s === 58 || s === 95 || v(s) ? (n.consume(s), w) : A(s);
  }
  function A(s) {
    return s === 61 ? (n.consume(s), U) : C(s) ? (l = A, Q(s)) : q(s) ? (n.consume(s), A) : S(s);
  }
  function U(s) {
    return s === null || s === 60 || s === 61 || s === 62 || s === 96 ? t(s) : s === 34 || s === 39 ? (n.consume(s), i = s, G) : C(s) ? (l = U, Q(s)) : q(s) ? (n.consume(s), U) : (n.consume(s), i = void 0, J);
  }
  function G(s) {
    return s === i ? (n.consume(s), nn) : s === null ? t(s) : C(s) ? (l = G, Q(s)) : (n.consume(s), G);
  }
  function nn(s) {
    return s === 62 || s === 47 || Y(s) ? S(s) : t(s);
  }
  function J(s) {
    return s === null || s === 34 || s === 39 || s === 60 || s === 61 || s === 96 ? t(s) : s === 62 || Y(s) ? S(s) : (n.consume(s), J);
  }
  function Q(s) {
    return n.exit("htmlTextData"), n.enter("lineEnding"), n.consume(s), n.exit("lineEnding"), T(
      n,
      W,
      "linePrefix",
      e.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4
    );
  }
  function W(s) {
    return n.enter("htmlTextData"), l(s);
  }
  function H(s) {
    return s === 62 ? (n.consume(s), n.exit("htmlTextData"), n.exit("htmlText"), r) : t(s);
  }
}
const On = {
  name: "labelEnd",
  tokenize: De,
  resolveTo: Oe,
  resolveAll: Le
}, Ie = {
  tokenize: Pe
}, Te = {
  tokenize: _e
}, Be = {
  tokenize: Me
};
function Le(n) {
  let r = -1, t;
  for (; ++r < n.length; )
    t = n[r][1], (t.type === "labelImage" || t.type === "labelLink" || t.type === "labelEnd") && (n.splice(r + 1, t.type === "labelImage" ? 4 : 2), t.type = "data", r++);
  return n;
}
function Oe(n, r) {
  let t = n.length, e = 0, i, u, a, l;
  for (; t--; )
    if (i = n[t][1], u) {
      if (i.type === "link" || i.type === "labelLink" && i._inactive)
        break;
      n[t][0] === "enter" && i.type === "labelLink" && (i._inactive = !0);
    } else if (a) {
      if (n[t][0] === "enter" && (i.type === "labelImage" || i.type === "labelLink") && !i._balanced && (u = t, i.type !== "labelLink")) {
        e = 2;
        break;
      }
    } else
      i.type === "labelEnd" && (a = t);
  const c = {
    type: n[u][1].type === "labelLink" ? "link" : "image",
    start: Object.assign({}, n[u][1].start),
    end: Object.assign({}, n[n.length - 1][1].end)
  }, p = {
    type: "label",
    start: Object.assign({}, n[u][1].start),
    end: Object.assign({}, n[a][1].end)
  }, h = {
    type: "labelText",
    start: Object.assign({}, n[u + e + 2][1].end),
    end: Object.assign({}, n[a - 2][1].start)
  };
  return l = [
    ["enter", c, r],
    ["enter", p, r]
  ], l = Z(l, n.slice(u + 1, u + e + 3)), l = Z(l, [["enter", h, r]]), l = Z(
    l,
    Bn(
      r.parser.constructs.insideSpan.null,
      n.slice(u + e + 4, a - 3),
      r
    )
  ), l = Z(l, [
    ["exit", h, r],
    n[a - 2],
    n[a - 1],
    ["exit", p, r]
  ]), l = Z(l, n.slice(a + 1)), l = Z(l, [["exit", c, r]]), en(n, u, n.length, l), n;
}
function De(n, r, t) {
  const e = this;
  let i = e.events.length, u, a;
  for (; i--; )
    if ((e.events[i][1].type === "labelImage" || e.events[i][1].type === "labelLink") && !e.events[i][1]._balanced) {
      u = e.events[i][1];
      break;
    }
  return l;
  function l(h) {
    return u ? u._inactive ? p(h) : (a = e.parser.defined.includes(
      fn(
        e.sliceSerialize({
          start: u.end,
          end: e.now()
        })
      )
    ), n.enter("labelEnd"), n.enter("labelMarker"), n.consume(h), n.exit("labelMarker"), n.exit("labelEnd"), c) : t(h);
  }
  function c(h) {
    return h === 40 ? n.attempt(
      Ie,
      r,
      a ? r : p
    )(h) : h === 91 ? n.attempt(
      Te,
      r,
      a ? n.attempt(Be, r, p) : p
    )(h) : a ? r(h) : p(h);
  }
  function p(h) {
    return u._balanced = !0, t(h);
  }
}
function Pe(n, r, t) {
  return e;
  function e(c) {
    return n.enter("resource"), n.enter("resourceMarker"), n.consume(c), n.exit("resourceMarker"), dn(n, i);
  }
  function i(c) {
    return c === 41 ? l(c) : at(
      n,
      u,
      t,
      "resourceDestination",
      "resourceDestinationLiteral",
      "resourceDestinationLiteralMarker",
      "resourceDestinationRaw",
      "resourceDestinationString",
      32
    )(c);
  }
  function u(c) {
    return Y(c) ? dn(n, a)(c) : l(c);
  }
  function a(c) {
    return c === 34 || c === 39 || c === 40 ? ot(
      n,
      dn(n, l),
      t,
      "resourceTitle",
      "resourceTitleMarker",
      "resourceTitleString"
    )(c) : l(c);
  }
  function l(c) {
    return c === 41 ? (n.enter("resourceMarker"), n.consume(c), n.exit("resourceMarker"), n.exit("resource"), r) : t(c);
  }
}
function _e(n, r, t) {
  const e = this;
  return i;
  function i(a) {
    return lt.call(
      e,
      n,
      u,
      t,
      "reference",
      "referenceMarker",
      "referenceString"
    )(a);
  }
  function u(a) {
    return e.parser.defined.includes(
      fn(
        e.sliceSerialize(e.events[e.events.length - 1][1]).slice(1, -1)
      )
    ) ? r(a) : t(a);
  }
}
function Me(n, r, t) {
  return e;
  function e(u) {
    return n.enter("reference"), n.enter("referenceMarker"), n.consume(u), n.exit("referenceMarker"), i;
  }
  function i(u) {
    return u === 93 ? (n.enter("referenceMarker"), n.consume(u), n.exit("referenceMarker"), n.exit("reference"), r) : t(u);
  }
}
const Re = {
  name: "labelStartImage",
  tokenize: je,
  resolveAll: On.resolveAll
};
function je(n, r, t) {
  const e = this;
  return i;
  function i(l) {
    return n.enter("labelImage"), n.enter("labelImageMarker"), n.consume(l), n.exit("labelImageMarker"), u;
  }
  function u(l) {
    return l === 91 ? (n.enter("labelMarker"), n.consume(l), n.exit("labelMarker"), n.exit("labelImage"), a) : t(l);
  }
  function a(l) {
    return l === 94 && "_hiddenFootnoteSupport" in e.parser.constructs ? t(l) : r(l);
  }
}
const qe = {
  name: "labelStartLink",
  tokenize: He,
  resolveAll: On.resolveAll
};
function He(n, r, t) {
  const e = this;
  return i;
  function i(a) {
    return n.enter("labelLink"), n.enter("labelMarker"), n.consume(a), n.exit("labelMarker"), n.exit("labelLink"), u;
  }
  function u(a) {
    return a === 94 && "_hiddenFootnoteSupport" in e.parser.constructs ? t(a) : r(a);
  }
}
const Cn = {
  name: "lineEnding",
  tokenize: Ve
};
function Ve(n, r) {
  return t;
  function t(e) {
    return n.enter("lineEnding"), n.consume(e), n.exit("lineEnding"), T(n, r, "linePrefix");
  }
}
const bn = {
  name: "thematicBreak",
  tokenize: Ne
};
function Ne(n, r, t) {
  let e = 0, i;
  return u;
  function u(c) {
    return n.enter("thematicBreak"), i = c, a(c);
  }
  function a(c) {
    return c === i ? (n.enter("thematicBreakSequence"), l(c)) : q(c) ? T(n, a, "whitespace")(c) : e < 3 || c !== null && !C(c) ? t(c) : (n.exit("thematicBreak"), r(c));
  }
  function l(c) {
    return c === i ? (n.consume(c), e++, l) : (n.exit("thematicBreakSequence"), a(c));
  }
}
const $ = {
  name: "list",
  tokenize: We,
  continuation: {
    tokenize: $e
  },
  exit: Ye
}, Qe = {
  tokenize: Ge,
  partial: !0
}, Ue = {
  tokenize: Ze,
  partial: !0
};
function We(n, r, t) {
  const e = this, i = e.events[e.events.length - 1];
  let u = i && i[1].type === "linePrefix" ? i[2].sliceSerialize(i[1], !0).length : 0, a = 0;
  return l;
  function l(f) {
    const k = e.containerState.type || (f === 42 || f === 43 || f === 45 ? "listUnordered" : "listOrdered");
    if (k === "listUnordered" ? !e.containerState.marker || f === e.containerState.marker : An(f)) {
      if (e.containerState.type || (e.containerState.type = k, n.enter(k, {
        _container: !0
      })), k === "listUnordered")
        return n.enter("listItemPrefix"), f === 42 || f === 45 ? n.check(bn, t, p)(f) : p(f);
      if (!e.interrupt || f === 49)
        return n.enter("listItemPrefix"), n.enter("listItemValue"), c(f);
    }
    return t(f);
  }
  function c(f) {
    return An(f) && ++a < 10 ? (n.consume(f), c) : (!e.interrupt || a < 2) && (e.containerState.marker ? f === e.containerState.marker : f === 41 || f === 46) ? (n.exit("listItemValue"), p(f)) : t(f);
  }
  function p(f) {
    return n.enter("listItemMarker"), n.consume(f), n.exit("listItemMarker"), e.containerState.marker = e.containerState.marker || f, n.check(
      Sn,
      // Can’t be empty when interrupting.
      e.interrupt ? t : h,
      n.attempt(
        Qe,
        g,
        x
      )
    );
  }
  function h(f) {
    return e.containerState.initialBlankLine = !0, u++, g(f);
  }
  function x(f) {
    return q(f) ? (n.enter("listItemPrefixWhitespace"), n.consume(f), n.exit("listItemPrefixWhitespace"), g) : t(f);
  }
  function g(f) {
    return e.containerState.size = u + e.sliceSerialize(n.exit("listItemPrefix"), !0).length, r(f);
  }
}
function $e(n, r, t) {
  const e = this;
  return e.containerState._closeFlow = void 0, n.check(Sn, i, u);
  function i(l) {
    return e.containerState.furtherBlankLines = e.containerState.furtherBlankLines || e.containerState.initialBlankLine, T(
      n,
      r,
      "listItemIndent",
      e.containerState.size + 1
    )(l);
  }
  function u(l) {
    return e.containerState.furtherBlankLines || !q(l) ? (e.containerState.furtherBlankLines = void 0, e.containerState.initialBlankLine = void 0, a(l)) : (e.containerState.furtherBlankLines = void 0, e.containerState.initialBlankLine = void 0, n.attempt(Ue, r, a)(l));
  }
  function a(l) {
    return e.containerState._closeFlow = !0, e.interrupt = void 0, T(
      n,
      n.attempt($, r, t),
      "linePrefix",
      e.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4
    )(l);
  }
}
function Ze(n, r, t) {
  const e = this;
  return T(
    n,
    i,
    "listItemIndent",
    e.containerState.size + 1
  );
  function i(u) {
    const a = e.events[e.events.length - 1];
    return a && a[1].type === "listItemIndent" && a[2].sliceSerialize(a[1], !0).length === e.containerState.size ? r(u) : t(u);
  }
}
function Ye(n) {
  n.exit(this.containerState.type);
}
function Ge(n, r, t) {
  const e = this;
  return T(
    n,
    i,
    "listItemPrefixWhitespace",
    e.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4 + 1
  );
  function i(u) {
    const a = e.events[e.events.length - 1];
    return !q(u) && a && a[1].type === "listItemPrefixWhitespace" ? r(u) : t(u);
  }
}
const Yn = {
  name: "setextUnderline",
  tokenize: Ke,
  resolveTo: Je
};
function Je(n, r) {
  let t = n.length, e, i, u;
  for (; t--; )
    if (n[t][0] === "enter") {
      if (n[t][1].type === "content") {
        e = t;
        break;
      }
      n[t][1].type === "paragraph" && (i = t);
    } else
      n[t][1].type === "content" && n.splice(t, 1), !u && n[t][1].type === "definition" && (u = t);
  const a = {
    type: "setextHeading",
    start: Object.assign({}, n[i][1].start),
    end: Object.assign({}, n[n.length - 1][1].end)
  };
  return n[i][1].type = "setextHeadingText", u ? (n.splice(i, 0, ["enter", a, r]), n.splice(u + 1, 0, ["exit", n[e][1], r]), n[e][1].end = Object.assign({}, n[u][1].end)) : n[e][1] = a, n.push(["exit", a, r]), n;
}
function Ke(n, r, t) {
  const e = this;
  let i = e.events.length, u, a;
  for (; i--; )
    if (e.events[i][1].type !== "lineEnding" && e.events[i][1].type !== "linePrefix" && e.events[i][1].type !== "content") {
      a = e.events[i][1].type === "paragraph";
      break;
    }
  return l;
  function l(h) {
    return !e.parser.lazy[e.now().line] && (e.interrupt || a) ? (n.enter("setextHeadingLine"), n.enter("setextHeadingLineSequence"), u = h, c(h)) : t(h);
  }
  function c(h) {
    return h === u ? (n.consume(h), c) : (n.exit("setextHeadingLineSequence"), T(n, p, "lineSuffix")(h));
  }
  function p(h) {
    return h === null || C(h) ? (n.exit("setextHeadingLine"), r(h)) : t(h);
  }
}
const Xe = {
  tokenize: ve
};
function ve(n) {
  const r = this, t = n.attempt(
    // Try to parse a blank line.
    Sn,
    e,
    // Try to parse initial flow (essentially, only code).
    n.attempt(
      this.parser.constructs.flowInitial,
      i,
      T(
        n,
        n.attempt(
          this.parser.constructs.flow,
          i,
          n.attempt(ae, i)
        ),
        "linePrefix"
      )
    )
  );
  return t;
  function e(u) {
    if (u === null) {
      n.consume(u);
      return;
    }
    return n.enter("lineEndingBlank"), n.consume(u), n.exit("lineEndingBlank"), r.currentConstruct = void 0, t;
  }
  function i(u) {
    if (u === null) {
      n.consume(u);
      return;
    }
    return n.enter("lineEnding"), n.consume(u), n.exit("lineEnding"), r.currentConstruct = void 0, t;
  }
}
const nr = {
  resolveAll: ct()
}, tr = st("string"), er = st("text");
function st(n) {
  return {
    tokenize: r,
    resolveAll: ct(
      n === "text" ? rr : void 0
    )
  };
  function r(t) {
    const e = this, i = this.parser.constructs[n], u = t.attempt(i, a, l);
    return a;
    function a(h) {
      return p(h) ? u(h) : l(h);
    }
    function l(h) {
      if (h === null) {
        t.consume(h);
        return;
      }
      return t.enter("data"), t.consume(h), c;
    }
    function c(h) {
      return p(h) ? (t.exit("data"), u(h)) : (t.consume(h), c);
    }
    function p(h) {
      if (h === null)
        return !0;
      const x = i[h];
      let g = -1;
      if (x)
        for (; ++g < x.length; ) {
          const f = x[g];
          if (!f.previous || f.previous.call(e, e.previous))
            return !0;
        }
      return !1;
    }
  }
}
function ct(n) {
  return r;
  function r(t, e) {
    let i = -1, u;
    for (; ++i <= t.length; )
      u === void 0 ? t[i] && t[i][1].type === "data" && (u = i, i++) : (!t[i] || t[i][1].type !== "data") && (i !== u + 2 && (t[u][1].end = t[i - 1][1].end, t.splice(u + 2, i - u - 2), i = u + 2), u = void 0);
    return n ? n(t, e) : t;
  }
}
function rr(n, r) {
  let t = 0;
  for (; ++t <= n.length; )
    if ((t === n.length || n[t][1].type === "lineEnding") && n[t - 1][1].type === "data") {
      const e = n[t - 1][1], i = r.sliceStream(e);
      let u = i.length, a = -1, l = 0, c;
      for (; u--; ) {
        const p = i[u];
        if (typeof p == "string") {
          for (a = p.length; p.charCodeAt(a - 1) === 32; )
            l++, a--;
          if (a)
            break;
          a = -1;
        } else if (p === -2)
          c = !0, l++;
        else if (p !== -1) {
          u++;
          break;
        }
      }
      if (l) {
        const p = {
          type: t === n.length || c || l < 2 ? "lineSuffix" : "hardBreakTrailing",
          start: {
            line: e.end.line,
            column: e.end.column - l,
            offset: e.end.offset - l,
            _index: e.start._index + u,
            _bufferIndex: u ? a : e.start._bufferIndex + a
          },
          end: Object.assign({}, e.end)
        };
        e.end = Object.assign({}, p.start), e.start.offset === e.end.offset ? Object.assign(e, p) : (n.splice(
          t,
          0,
          ["enter", p, r],
          ["exit", p, r]
        ), t += 2);
      }
      t++;
    }
  return n;
}
function ir(n, r, t) {
  let e = Object.assign(
    t ? Object.assign({}, t) : {
      line: 1,
      column: 1,
      offset: 0
    },
    {
      _index: 0,
      _bufferIndex: -1
    }
  );
  const i = {}, u = [];
  let a = [], l = [];
  const c = {
    consume: _,
    enter: F,
    exit: L,
    attempt: P(O),
    check: P(d),
    interrupt: P(d, {
      interrupt: !0
    })
  }, p = {
    previous: null,
    code: null,
    containerState: {},
    events: [],
    parser: n,
    sliceStream: f,
    sliceSerialize: g,
    now: k,
    defineSkip: B,
    write: x
  };
  let h = r.tokenize.call(p, c);
  return r.resolveAll && u.push(r), p;
  function x(S) {
    return a = Z(a, S), D(), a[a.length - 1] !== null ? [] : (R(r, 0), p.events = Bn(u, p.events, p), p.events);
  }
  function g(S, w) {
    return ar(f(S), w);
  }
  function f(S) {
    return ur(a, S);
  }
  function k() {
    return Object.assign({}, e);
  }
  function B(S) {
    i[S.line] = S.column, N();
  }
  function D() {
    let S;
    for (; e._index < a.length; ) {
      const w = a[e._index];
      if (typeof w == "string")
        for (S = e._index, e._bufferIndex < 0 && (e._bufferIndex = 0); e._index === S && e._bufferIndex < w.length; )
          y(w.charCodeAt(e._bufferIndex));
      else
        y(w);
    }
  }
  function y(S) {
    h = h(S);
  }
  function _(S) {
    C(S) ? (e.line++, e.column = 1, e.offset += S === -3 ? 2 : 1, N()) : S !== -1 && (e.column++, e.offset++), e._bufferIndex < 0 ? e._index++ : (e._bufferIndex++, e._bufferIndex === a[e._index].length && (e._bufferIndex = -1, e._index++)), p.previous = S;
  }
  function F(S, w) {
    const A = w || {};
    return A.type = S, A.start = k(), p.events.push(["enter", A, p]), l.push(A), A;
  }
  function L(S) {
    const w = l.pop();
    return w.end = k(), p.events.push(["exit", w, p]), w;
  }
  function O(S, w) {
    R(S, w.from);
  }
  function d(S, w) {
    w.restore();
  }
  function P(S, w) {
    return A;
    function A(U, G, nn) {
      let J, Q, W, H;
      return Array.isArray(U) ? (
        /* c8 ignore next 1 */
        o(U)
      ) : "tokenize" in U ? o([U]) : s(U);
      function s(V) {
        return K;
        function K(an) {
          const pn = an !== null && V[an], mn = an !== null && V.null, Fn = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(pn) ? pn : pn ? [pn] : [],
            ...Array.isArray(mn) ? mn : mn ? [mn] : []
          ];
          return o(Fn)(an);
        }
      }
      function o(V) {
        return J = V, Q = 0, V.length === 0 ? nn : cn(V[Q]);
      }
      function cn(V) {
        return K;
        function K(an) {
          return H = j(), W = V, V.partial || (p.currentConstruct = V), V.name && p.parser.constructs.disable.null.includes(V.name) ? hn() : V.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            w ? Object.assign(Object.create(p), w) : p,
            c,
            xn,
            hn
          )(an);
        }
      }
      function xn(V) {
        return S(W, H), G;
      }
      function hn(V) {
        return H.restore(), ++Q < J.length ? cn(J[Q]) : nn;
      }
    }
  }
  function R(S, w) {
    S.resolveAll && !u.includes(S) && u.push(S), S.resolve && en(
      p.events,
      w,
      p.events.length - w,
      S.resolve(p.events.slice(w), p)
    ), S.resolveTo && (p.events = S.resolveTo(p.events, p));
  }
  function j() {
    const S = k(), w = p.previous, A = p.currentConstruct, U = p.events.length, G = Array.from(l);
    return {
      restore: nn,
      from: U
    };
    function nn() {
      e = S, p.previous = w, p.currentConstruct = A, p.events.length = U, l = G, N();
    }
  }
  function N() {
    e.line in i && e.column < 2 && (e.column = i[e.line], e.offset += i[e.line] - 1);
  }
}
function ur(n, r) {
  const t = r.start._index, e = r.start._bufferIndex, i = r.end._index, u = r.end._bufferIndex;
  let a;
  return t === i ? a = [n[t].slice(e, u)] : (a = n.slice(t, i), e > -1 && (a[0] = a[0].slice(e)), u > 0 && a.push(n[i].slice(0, u))), a;
}
function ar(n, r) {
  let t = -1;
  const e = [];
  let i;
  for (; ++t < n.length; ) {
    const u = n[t];
    let a;
    if (typeof u == "string")
      a = u;
    else
      switch (u) {
        case -5: {
          a = "\r";
          break;
        }
        case -4: {
          a = `
`;
          break;
        }
        case -3: {
          a = `\r
`;
          break;
        }
        case -2: {
          a = r ? " " : "	";
          break;
        }
        case -1: {
          if (!r && i)
            continue;
          a = " ";
          break;
        }
        default:
          a = String.fromCharCode(u);
      }
    i = u === -2, e.push(a);
  }
  return e.join("");
}
const lr = {
  [42]: $,
  [43]: $,
  [45]: $,
  [48]: $,
  [49]: $,
  [50]: $,
  [51]: $,
  [52]: $,
  [53]: $,
  [54]: $,
  [55]: $,
  [56]: $,
  [57]: $,
  [62]: et
}, or = {
  [91]: he
}, sr = {
  [-2]: En,
  [-1]: En,
  [32]: En
}, cr = {
  [35]: ke,
  [42]: bn,
  [45]: [Yn, bn],
  [60]: Se,
  [61]: Yn,
  [95]: bn,
  [96]: $n,
  [126]: $n
}, hr = {
  [38]: it,
  [92]: rt
}, pr = {
  [-5]: Cn,
  [-4]: Cn,
  [-3]: Cn,
  [33]: Re,
  [38]: it,
  [42]: In,
  [60]: [Qt, Ae],
  [91]: qe,
  [92]: [xe, rt],
  [93]: On,
  [95]: In,
  [96]: te
}, mr = {
  null: [In, nr]
}, fr = {
  null: [42, 95]
}, xr = {
  null: []
}, gr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  attentionMarkers: fr,
  contentInitial: or,
  disable: xr,
  document: lr,
  flow: cr,
  flowInitial: sr,
  insideSpan: mr,
  string: hr,
  text: pr
}, Symbol.toStringTag, { value: "Module" }));
function kr(n = {}) {
  const r = It(
    // @ts-expect-error Same as above.
    [gr].concat(n.extensions || [])
  ), t = {
    defined: [],
    lazy: {},
    constructs: r,
    content: e(Mt),
    document: e(jt),
    flow: e(Xe),
    string: e(tr),
    text: e(er)
  };
  return t;
  function e(i) {
    return u;
    function u(a) {
      return ir(t, i, a);
    }
  }
}
const Gn = /[\0\t\n\r]/g;
function dr() {
  let n = 1, r = "", t = !0, e;
  return i;
  function i(u, a, l) {
    const c = [];
    let p, h, x, g, f;
    for (u = r + u.toString(a), x = 0, r = "", t && (u.charCodeAt(0) === 65279 && x++, t = void 0); x < u.length; ) {
      if (Gn.lastIndex = x, p = Gn.exec(u), g = p && p.index !== void 0 ? p.index : u.length, f = u.charCodeAt(g), !p) {
        r = u.slice(x);
        break;
      }
      if (f === 10 && x === g && e)
        c.push(-3), e = void 0;
      else
        switch (e && (c.push(-5), e = void 0), x < g && (c.push(u.slice(x, g)), n += g - x), f) {
          case 0: {
            c.push(65533), n++;
            break;
          }
          case 9: {
            for (h = Math.ceil(n / 4) * 4, c.push(-2); n++ < h; )
              c.push(-1);
            break;
          }
          case 10: {
            c.push(-4), n = 1;
            break;
          }
          default:
            e = !0, n = 1;
        }
      x = g + 1;
    }
    return l && (e && c.push(-5), r && c.push(r), c.push(null)), c;
  }
}
function br(n) {
  for (; !ut(n); )
    ;
  return n;
}
function ht(n, r) {
  const t = Number.parseInt(n, r);
  return (
    // C0 except for HT, LF, FF, CR, space
    t < 9 || t === 11 || t > 13 && t < 32 || // Control character (DEL) of the basic block and C1 controls.
    t > 126 && t < 160 || // Lone high surrogates and low surrogates.
    t > 55295 && t < 57344 || // Noncharacters.
    t > 64975 && t < 65008 || (t & 65535) === 65535 || (t & 65535) === 65534 || // Out of range
    t > 1114111 ? "�" : String.fromCharCode(t)
  );
}
const yr = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function Sr(n) {
  return n.replace(yr, Fr);
}
function Fr(n, r, t) {
  if (r)
    return r;
  if (t.charCodeAt(0) === 35) {
    const i = t.charCodeAt(1), u = i === 120 || i === 88;
    return ht(t.slice(u ? 2 : 1), u ? 16 : 10);
  }
  return Ln(t) || n;
}
function yn(n) {
  return !n || typeof n != "object" ? "" : "position" in n || "type" in n ? Jn(n.position) : "start" in n || "end" in n ? Jn(n) : "line" in n || "column" in n ? Tn(n) : "";
}
function Tn(n) {
  return Kn(n && n.line) + ":" + Kn(n && n.column);
}
function Jn(n) {
  return Tn(n && n.start) + "-" + Tn(n && n.end);
}
function Kn(n) {
  return n && typeof n == "number" ? n : 1;
}
const pt = {}.hasOwnProperty, mt = (
  /**
   * @type {(
   *   ((value: Value, encoding: Encoding, options?: Options | null | undefined) => Root) &
   *   ((value: Value, options?: Options | null | undefined) => Root)
   * )}
   */
  /**
   * @param {Value} value
   * @param {Encoding | Options | null | undefined} [encoding]
   * @param {Options | null | undefined} [options]
   * @returns {Root}
   */
  function(n, r, t) {
    return typeof r != "string" && (t = r, r = void 0), wr(t)(
      br(
        // @ts-expect-error: micromark types need to accept `null`.
        kr(t).document().write(dr()(n, r, !0))
      )
    );
  }
);
function wr(n) {
  const r = {
    transforms: [],
    canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
    enter: {
      autolink: l(Rn),
      autolinkProtocol: S,
      autolinkEmail: S,
      atxHeading: l(Pn),
      blockQuote: l(Fn),
      characterEscape: S,
      characterReference: S,
      codeFenced: l(Dn),
      codeFencedFenceInfo: c,
      codeFencedFenceMeta: c,
      codeIndented: l(Dn, c),
      codeText: l(xt, c),
      codeTextData: S,
      data: S,
      codeFlowValue: S,
      definition: l(gt),
      definitionDestinationString: c,
      definitionLabelString: c,
      definitionTitleString: c,
      emphasis: l(kt),
      hardBreakEscape: l(_n),
      hardBreakTrailing: l(_n),
      htmlFlow: l(Mn, c),
      htmlFlowData: S,
      htmlText: l(Mn, c),
      htmlTextData: S,
      image: l(dt),
      label: c,
      link: l(Rn),
      listItem: l(bt),
      listItemValue: k,
      listOrdered: l(jn, f),
      listUnordered: l(jn),
      paragraph: l(yt),
      reference: hn,
      referenceString: c,
      resourceDestinationString: c,
      resourceTitleString: c,
      setextHeading: l(Pn),
      strong: l(St),
      thematicBreak: l(wt)
    },
    exit: {
      atxHeading: h(),
      atxHeadingSequence: P,
      autolink: h(),
      autolinkEmail: mn,
      autolinkProtocol: pn,
      blockQuote: h(),
      characterEscapeValue: w,
      characterReferenceMarkerHexadecimal: K,
      characterReferenceMarkerNumeric: K,
      characterReferenceValue: an,
      codeFenced: h(_),
      codeFencedFence: y,
      codeFencedFenceInfo: B,
      codeFencedFenceMeta: D,
      codeFlowValue: w,
      codeIndented: h(F),
      codeText: h(J),
      codeTextData: w,
      data: w,
      definition: h(),
      definitionDestinationString: d,
      definitionLabelString: L,
      definitionTitleString: O,
      emphasis: h(),
      hardBreakEscape: h(U),
      hardBreakTrailing: h(U),
      htmlFlow: h(G),
      htmlFlowData: w,
      htmlText: h(nn),
      htmlTextData: w,
      image: h(W),
      label: s,
      labelText: H,
      lineEnding: A,
      link: h(Q),
      listItem: h(),
      listOrdered: h(),
      listUnordered: h(),
      paragraph: h(),
      referenceString: V,
      resourceDestinationString: o,
      resourceTitleString: cn,
      resource: xn,
      setextHeading: h(N),
      setextHeadingLineSequence: j,
      setextHeadingText: R,
      strong: h(),
      thematicBreak: h()
    }
  };
  ft(r, (n || {}).mdastExtensions || []);
  const t = {};
  return e;
  function e(m) {
    let b = {
      type: "root",
      children: []
    };
    const E = {
      stack: [b],
      tokenStack: [],
      config: r,
      enter: p,
      exit: x,
      buffer: c,
      resume: g,
      setData: u,
      getData: a
    }, z = [];
    let I = -1;
    for (; ++I < m.length; )
      if (m[I][1].type === "listOrdered" || m[I][1].type === "listUnordered")
        if (m[I][0] === "enter")
          z.push(I);
        else {
          const X = z.pop();
          I = i(m, X, I);
        }
    for (I = -1; ++I < m.length; ) {
      const X = r[m[I][0]];
      pt.call(X, m[I][1].type) && X[m[I][1].type].call(
        Object.assign(
          {
            sliceSerialize: m[I][2].sliceSerialize
          },
          E
        ),
        m[I][1]
      );
    }
    if (E.tokenStack.length > 0) {
      const X = E.tokenStack[E.tokenStack.length - 1];
      (X[1] || Xn).call(E, void 0, X[0]);
    }
    for (b.position = {
      start: on(
        m.length > 0 ? m[0][1].start : {
          line: 1,
          column: 1,
          offset: 0
        }
      ),
      end: on(
        m.length > 0 ? m[m.length - 2][1].end : {
          line: 1,
          column: 1,
          offset: 0
        }
      )
    }, I = -1; ++I < r.transforms.length; )
      b = r.transforms[I](b) || b;
    return b;
  }
  function i(m, b, E) {
    let z = b - 1, I = -1, X = !1, ln, rn, gn, kn;
    for (; ++z <= E; ) {
      const M = m[z];
      if (M[1].type === "listUnordered" || M[1].type === "listOrdered" || M[1].type === "blockQuote" ? (M[0] === "enter" ? I++ : I--, kn = void 0) : M[1].type === "lineEndingBlank" ? M[0] === "enter" && (ln && !kn && !I && !gn && (gn = z), kn = void 0) : M[1].type === "linePrefix" || M[1].type === "listItemValue" || M[1].type === "listItemMarker" || M[1].type === "listItemPrefix" || M[1].type === "listItemPrefixWhitespace" || (kn = void 0), !I && M[0] === "enter" && M[1].type === "listItemPrefix" || I === -1 && M[0] === "exit" && (M[1].type === "listUnordered" || M[1].type === "listOrdered")) {
        if (ln) {
          let wn = z;
          for (rn = void 0; wn--; ) {
            const un = m[wn];
            if (un[1].type === "lineEnding" || un[1].type === "lineEndingBlank") {
              if (un[0] === "exit")
                continue;
              rn && (m[rn][1].type = "lineEndingBlank", X = !0), un[1].type = "lineEnding", rn = wn;
            } else if (!(un[1].type === "linePrefix" || un[1].type === "blockQuotePrefix" || un[1].type === "blockQuotePrefixWhitespace" || un[1].type === "blockQuoteMarker" || un[1].type === "listItemIndent"))
              break;
          }
          gn && (!rn || gn < rn) && (ln._spread = !0), ln.end = Object.assign(
            {},
            rn ? m[rn][1].start : M[1].end
          ), m.splice(rn || z, 0, ["exit", ln, M[2]]), z++, E++;
        }
        M[1].type === "listItemPrefix" && (ln = {
          type: "listItem",
          // @ts-expect-error Patched
          _spread: !1,
          start: Object.assign({}, M[1].start)
        }, m.splice(z, 0, ["enter", ln, M[2]]), z++, E++, gn = void 0, kn = !0);
      }
    }
    return m[b][1]._spread = X, E;
  }
  function u(m, b) {
    t[m] = b;
  }
  function a(m) {
    return t[m];
  }
  function l(m, b) {
    return E;
    function E(z) {
      p.call(this, m(z), z), b && b.call(this, z);
    }
  }
  function c() {
    this.stack.push({
      type: "fragment",
      children: []
    });
  }
  function p(m, b, E) {
    return this.stack[this.stack.length - 1].children.push(m), this.stack.push(m), this.tokenStack.push([b, E]), m.position = {
      start: on(b.start)
    }, m;
  }
  function h(m) {
    return b;
    function b(E) {
      m && m.call(this, E), x.call(this, E);
    }
  }
  function x(m, b) {
    const E = this.stack.pop(), z = this.tokenStack.pop();
    if (z)
      z[0].type !== m.type && (b ? b.call(this, m, z[0]) : (z[1] || Xn).call(this, m, z[0]));
    else
      throw new Error(
        "Cannot close `" + m.type + "` (" + yn({
          start: m.start,
          end: m.end
        }) + "): it’s not open"
      );
    return E.position.end = on(m.end), E;
  }
  function g() {
    return zt(this.stack.pop());
  }
  function f() {
    u("expectingFirstListItemValue", !0);
  }
  function k(m) {
    if (a("expectingFirstListItemValue")) {
      const b = this.stack[this.stack.length - 2];
      b.start = Number.parseInt(this.sliceSerialize(m), 10), u("expectingFirstListItemValue");
    }
  }
  function B() {
    const m = this.resume(), b = this.stack[this.stack.length - 1];
    b.lang = m;
  }
  function D() {
    const m = this.resume(), b = this.stack[this.stack.length - 1];
    b.meta = m;
  }
  function y() {
    a("flowCodeInside") || (this.buffer(), u("flowCodeInside", !0));
  }
  function _() {
    const m = this.resume(), b = this.stack[this.stack.length - 1];
    b.value = m.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), u("flowCodeInside");
  }
  function F() {
    const m = this.resume(), b = this.stack[this.stack.length - 1];
    b.value = m.replace(/(\r?\n|\r)$/g, "");
  }
  function L(m) {
    const b = this.resume(), E = this.stack[this.stack.length - 1];
    E.label = b, E.identifier = fn(
      this.sliceSerialize(m)
    ).toLowerCase();
  }
  function O() {
    const m = this.resume(), b = this.stack[this.stack.length - 1];
    b.title = m;
  }
  function d() {
    const m = this.resume(), b = this.stack[this.stack.length - 1];
    b.url = m;
  }
  function P(m) {
    const b = this.stack[this.stack.length - 1];
    if (!b.depth) {
      const E = this.sliceSerialize(m).length;
      b.depth = E;
    }
  }
  function R() {
    u("setextHeadingSlurpLineEnding", !0);
  }
  function j(m) {
    const b = this.stack[this.stack.length - 1];
    b.depth = this.sliceSerialize(m).charCodeAt(0) === 61 ? 1 : 2;
  }
  function N() {
    u("setextHeadingSlurpLineEnding");
  }
  function S(m) {
    const b = this.stack[this.stack.length - 1];
    let E = b.children[b.children.length - 1];
    (!E || E.type !== "text") && (E = Ft(), E.position = {
      start: on(m.start)
    }, b.children.push(E)), this.stack.push(E);
  }
  function w(m) {
    const b = this.stack.pop();
    b.value += this.sliceSerialize(m), b.position.end = on(m.end);
  }
  function A(m) {
    const b = this.stack[this.stack.length - 1];
    if (a("atHardBreak")) {
      const E = b.children[b.children.length - 1];
      E.position.end = on(m.end), u("atHardBreak");
      return;
    }
    !a("setextHeadingSlurpLineEnding") && r.canContainEols.includes(b.type) && (S.call(this, m), w.call(this, m));
  }
  function U() {
    u("atHardBreak", !0);
  }
  function G() {
    const m = this.resume(), b = this.stack[this.stack.length - 1];
    b.value = m;
  }
  function nn() {
    const m = this.resume(), b = this.stack[this.stack.length - 1];
    b.value = m;
  }
  function J() {
    const m = this.resume(), b = this.stack[this.stack.length - 1];
    b.value = m;
  }
  function Q() {
    const m = this.stack[this.stack.length - 1];
    if (a("inReference")) {
      const b = a("referenceType") || "shortcut";
      m.type += "Reference", m.referenceType = b, delete m.url, delete m.title;
    } else
      delete m.identifier, delete m.label;
    u("referenceType");
  }
  function W() {
    const m = this.stack[this.stack.length - 1];
    if (a("inReference")) {
      const b = a("referenceType") || "shortcut";
      m.type += "Reference", m.referenceType = b, delete m.url, delete m.title;
    } else
      delete m.identifier, delete m.label;
    u("referenceType");
  }
  function H(m) {
    const b = this.sliceSerialize(m), E = this.stack[this.stack.length - 2];
    E.label = Sr(b), E.identifier = fn(b).toLowerCase();
  }
  function s() {
    const m = this.stack[this.stack.length - 1], b = this.resume(), E = this.stack[this.stack.length - 1];
    if (u("inReference", !0), E.type === "link") {
      const z = m.children;
      E.children = z;
    } else
      E.alt = b;
  }
  function o() {
    const m = this.resume(), b = this.stack[this.stack.length - 1];
    b.url = m;
  }
  function cn() {
    const m = this.resume(), b = this.stack[this.stack.length - 1];
    b.title = m;
  }
  function xn() {
    u("inReference");
  }
  function hn() {
    u("referenceType", "collapsed");
  }
  function V(m) {
    const b = this.resume(), E = this.stack[this.stack.length - 1];
    E.label = b, E.identifier = fn(
      this.sliceSerialize(m)
    ).toLowerCase(), u("referenceType", "full");
  }
  function K(m) {
    u("characterReferenceType", m.type);
  }
  function an(m) {
    const b = this.sliceSerialize(m), E = a("characterReferenceType");
    let z;
    E ? (z = ht(
      b,
      E === "characterReferenceMarkerNumeric" ? 10 : 16
    ), u("characterReferenceType")) : z = Ln(b);
    const I = this.stack.pop();
    I.value += z, I.position.end = on(m.end);
  }
  function pn(m) {
    w.call(this, m);
    const b = this.stack[this.stack.length - 1];
    b.url = this.sliceSerialize(m);
  }
  function mn(m) {
    w.call(this, m);
    const b = this.stack[this.stack.length - 1];
    b.url = "mailto:" + this.sliceSerialize(m);
  }
  function Fn() {
    return {
      type: "blockquote",
      children: []
    };
  }
  function Dn() {
    return {
      type: "code",
      lang: null,
      meta: null,
      value: ""
    };
  }
  function xt() {
    return {
      type: "inlineCode",
      value: ""
    };
  }
  function gt() {
    return {
      type: "definition",
      identifier: "",
      label: null,
      title: null,
      url: ""
    };
  }
  function kt() {
    return {
      type: "emphasis",
      children: []
    };
  }
  function Pn() {
    return {
      type: "heading",
      depth: void 0,
      children: []
    };
  }
  function _n() {
    return {
      type: "break"
    };
  }
  function Mn() {
    return {
      type: "html",
      value: ""
    };
  }
  function dt() {
    return {
      type: "image",
      title: null,
      url: "",
      alt: null
    };
  }
  function Rn() {
    return {
      type: "link",
      title: null,
      url: "",
      children: []
    };
  }
  function jn(m) {
    return {
      type: "list",
      ordered: m.type === "listOrdered",
      start: null,
      // @ts-expect-error Patched.
      spread: m._spread,
      children: []
    };
  }
  function bt(m) {
    return {
      type: "listItem",
      // @ts-expect-error Patched.
      spread: m._spread,
      checked: null,
      children: []
    };
  }
  function yt() {
    return {
      type: "paragraph",
      children: []
    };
  }
  function St() {
    return {
      type: "strong",
      children: []
    };
  }
  function Ft() {
    return {
      type: "text",
      value: ""
    };
  }
  function wt() {
    return {
      type: "thematicBreak"
    };
  }
}
function on(n) {
  return {
    line: n.line,
    column: n.column,
    offset: n.offset
  };
}
function ft(n, r) {
  let t = -1;
  for (; ++t < r.length; ) {
    const e = r[t];
    Array.isArray(e) ? ft(n, e) : Er(n, e);
  }
}
function Er(n, r) {
  let t;
  for (t in r)
    if (pt.call(r, t)) {
      if (t === "canContainEols") {
        const e = r[t];
        e && n[t].push(...e);
      } else if (t === "transforms") {
        const e = r[t];
        e && n[t].push(...e);
      } else if (t === "enter" || t === "exit") {
        const e = r[t];
        e && Object.assign(n[t], e);
      }
    }
}
function Xn(n, r) {
  throw n ? new Error(
    "Cannot close `" + n.type + "` (" + yn({
      start: n.start,
      end: n.end
    }) + "): a different token (`" + r.type + "`, " + yn({
      start: r.start,
      end: r.end
    }) + ") is open"
  ) : new Error(
    "Cannot close document, a token (`" + r.type + "`, " + yn({
      start: r.start,
      end: r.end
    }) + ") is still open"
  );
}
function Cr(n) {
  const r = n.replace(/\n{2,}/g, `
`);
  return Et(r);
}
function Ar(n) {
  const r = Cr(n), { children: t } = mt(r), e = [[]];
  let i = 0;
  function u(a, l = "normal") {
    a.type === "text" ? a.value.split(`
`).forEach((p, h) => {
      h !== 0 && (i++, e.push([])), p.split(" ").forEach((x) => {
        x && e[i].push({ content: x, type: l });
      });
    }) : (a.type === "strong" || a.type === "emphasis") && a.children.forEach((c) => {
      u(c, a.type);
    });
  }
  return t.forEach((a) => {
    a.type === "paragraph" && a.children.forEach((l) => {
      u(l);
    });
  }), e;
}
function zr(n) {
  const { children: r } = mt(n);
  function t(e) {
    return e.type === "text" ? e.value.replace(/\n/g, "<br/>") : e.type === "strong" ? `<strong>${e.children.map(t).join("")}</strong>` : e.type === "emphasis" ? `<em>${e.children.map(t).join("")}</em>` : e.type === "paragraph" ? `<p>${e.children.map(t).join("")}</p>` : `Unsupported markdown: ${e.type}`;
  }
  return r.map(t).join("");
}
function Ir(n, r) {
  r && n.attr("style", r);
}
function Tr(n, r, t, e) {
  const i = n.append("foreignObject"), u = i.append("xhtml:div"), a = r.label, l = r.isNode ? "nodeLabel" : "edgeLabel";
  u.html(
    `<span class="${l} ${e}" ` + (r.labelStyle ? 'style="' + r.labelStyle + '"' : "") + ">" + a + "</span>"
  ), Ir(u, r.labelStyle), u.style("display", "table-cell"), u.style("white-space", "nowrap"), u.style("max-width", t + "px"), u.attr("xmlns", "http://www.w3.org/1999/xhtml");
  let c = u.node().getBoundingClientRect();
  return c.width === t && (u.style("display", "table"), u.style("white-space", "break-spaces"), u.style("width", t + "px"), c = u.node().getBoundingClientRect()), i.style("width", c.width), i.style("height", c.height), i.node();
}
function vn(n, r, t) {
  return n.append("tspan").attr("class", "text-outer-tspan").attr("x", 0).attr("y", r * t - 0.1 + "em").attr("dy", t + "em");
}
function Br(n, r, t, e = !1) {
  const u = r.append("g");
  let a = u.insert("rect").attr("class", "background");
  const l = u.append("text").attr("y", "-10.1");
  let c = -1;
  if (t.forEach((p) => {
    c++;
    let h = vn(l, c, 1.1), x = [...p].reverse(), g, f = [];
    for (; x.length; )
      g = x.pop(), f.push(g), nt(h, f), h.node().getComputedTextLength() > n && (f.pop(), x.push(g), nt(h, f), f = [], c++, h = vn(l, c, 1.1));
  }), e) {
    const p = l.node().getBBox(), h = 2;
    return a.attr("x", -h).attr("y", -h).attr("width", p.width + 2 * h).attr("height", p.height + 2 * h), u.node();
  } else
    return l.node();
}
function nt(n, r) {
  n.text(""), r.forEach((t, e) => {
    const i = n.append("tspan").attr("font-style", t.type === "em" ? "italic" : "normal").attr("class", "text-inner-tspan").attr("font-weight", t.type === "strong" ? "bold" : "normal");
    e === 0 ? i.text(t.content) : i.text(" " + t.content);
  });
}
const Or = (n, r = "", {
  style: t = "",
  isTitle: e = !1,
  classes: i = "",
  useHtmlLabels: u = !0,
  isNode: a = !0,
  width: l,
  addSvgBackground: c = !1
} = {}) => {
  if (Ct.info("createText", r, t, e, i, u, a, c), u) {
    const p = zr(r), h = {
      isNode: a,
      label: At(p).replace(
        /fa[blrs]?:fa-[\w-]+/g,
        (g) => `<i class='${g.replace(":", " ")}'></i>`
      ),
      labelStyle: t.replace("fill:", "color:")
    };
    return Tr(n, h, l, i);
  } else {
    const p = Ar(r);
    return Br(l, n, p, c);
  }
};
export {
  Or as c
};
