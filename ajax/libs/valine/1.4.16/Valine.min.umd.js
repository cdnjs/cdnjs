!(function (e, t) {
    'object' == typeof exports && 'undefined' != typeof module
        ? t(require('balajs'), require('xss'))
        : 'function' == typeof define && define.amd
        ? define(['balajs', 'xss'], t)
        : t(e.balajs, e.xss)
})(this, function (e, t) {
    ;(e = e && e.hasOwnProperty('default') ? e.default : e),
        (t = t && t.hasOwnProperty('default') ? t.default : t)
    var n =
        'undefined' != typeof globalThis
            ? globalThis
            : 'undefined' != typeof window
            ? window
            : 'undefined' != typeof global
            ? global
            : 'undefined' != typeof self
            ? self
            : {}
    function r(e, t) {
        return e((t = { exports: {} }), t.exports), t.exports
    }
    var i = r(function (e) {
            !(function (t) {
                function n(e, t) {
                    var n = (65535 & e) + (65535 & t)
                    return (
                        (((e >> 16) + (t >> 16) + (n >> 16)) << 16) |
                        (65535 & n)
                    )
                }
                function r(e, t, r, i, o, a) {
                    return n(
                        ((s = n(n(t, e), n(i, a))) << (l = o)) |
                            (s >>> (32 - l)),
                        r
                    )
                    var s, l
                }
                function i(e, t, n, i, o, a, s) {
                    return r((t & n) | (~t & i), e, t, o, a, s)
                }
                function o(e, t, n, i, o, a, s) {
                    return r((t & i) | (n & ~i), e, t, o, a, s)
                }
                function a(e, t, n, i, o, a, s) {
                    return r(t ^ n ^ i, e, t, o, a, s)
                }
                function s(e, t, n, i, o, a, s) {
                    return r(n ^ (t | ~i), e, t, o, a, s)
                }
                function l(e, t) {
                    var r, l, c, p, u
                    ;(e[t >> 5] |= 128 << t % 32),
                        (e[14 + (((t + 64) >>> 9) << 4)] = t)
                    var d = 1732584193,
                        f = -271733879,
                        h = -1732584194,
                        g = 271733878
                    for (r = 0; r < e.length; r += 16)
                        (l = d),
                            (c = f),
                            (p = h),
                            (u = g),
                            (d = i(d, f, h, g, e[r], 7, -680876936)),
                            (g = i(g, d, f, h, e[r + 1], 12, -389564586)),
                            (h = i(h, g, d, f, e[r + 2], 17, 606105819)),
                            (f = i(f, h, g, d, e[r + 3], 22, -1044525330)),
                            (d = i(d, f, h, g, e[r + 4], 7, -176418897)),
                            (g = i(g, d, f, h, e[r + 5], 12, 1200080426)),
                            (h = i(h, g, d, f, e[r + 6], 17, -1473231341)),
                            (f = i(f, h, g, d, e[r + 7], 22, -45705983)),
                            (d = i(d, f, h, g, e[r + 8], 7, 1770035416)),
                            (g = i(g, d, f, h, e[r + 9], 12, -1958414417)),
                            (h = i(h, g, d, f, e[r + 10], 17, -42063)),
                            (f = i(f, h, g, d, e[r + 11], 22, -1990404162)),
                            (d = i(d, f, h, g, e[r + 12], 7, 1804603682)),
                            (g = i(g, d, f, h, e[r + 13], 12, -40341101)),
                            (h = i(h, g, d, f, e[r + 14], 17, -1502002290)),
                            (d = o(
                                d,
                                (f = i(f, h, g, d, e[r + 15], 22, 1236535329)),
                                h,
                                g,
                                e[r + 1],
                                5,
                                -165796510
                            )),
                            (g = o(g, d, f, h, e[r + 6], 9, -1069501632)),
                            (h = o(h, g, d, f, e[r + 11], 14, 643717713)),
                            (f = o(f, h, g, d, e[r], 20, -373897302)),
                            (d = o(d, f, h, g, e[r + 5], 5, -701558691)),
                            (g = o(g, d, f, h, e[r + 10], 9, 38016083)),
                            (h = o(h, g, d, f, e[r + 15], 14, -660478335)),
                            (f = o(f, h, g, d, e[r + 4], 20, -405537848)),
                            (d = o(d, f, h, g, e[r + 9], 5, 568446438)),
                            (g = o(g, d, f, h, e[r + 14], 9, -1019803690)),
                            (h = o(h, g, d, f, e[r + 3], 14, -187363961)),
                            (f = o(f, h, g, d, e[r + 8], 20, 1163531501)),
                            (d = o(d, f, h, g, e[r + 13], 5, -1444681467)),
                            (g = o(g, d, f, h, e[r + 2], 9, -51403784)),
                            (h = o(h, g, d, f, e[r + 7], 14, 1735328473)),
                            (d = a(
                                d,
                                (f = o(f, h, g, d, e[r + 12], 20, -1926607734)),
                                h,
                                g,
                                e[r + 5],
                                4,
                                -378558
                            )),
                            (g = a(g, d, f, h, e[r + 8], 11, -2022574463)),
                            (h = a(h, g, d, f, e[r + 11], 16, 1839030562)),
                            (f = a(f, h, g, d, e[r + 14], 23, -35309556)),
                            (d = a(d, f, h, g, e[r + 1], 4, -1530992060)),
                            (g = a(g, d, f, h, e[r + 4], 11, 1272893353)),
                            (h = a(h, g, d, f, e[r + 7], 16, -155497632)),
                            (f = a(f, h, g, d, e[r + 10], 23, -1094730640)),
                            (d = a(d, f, h, g, e[r + 13], 4, 681279174)),
                            (g = a(g, d, f, h, e[r], 11, -358537222)),
                            (h = a(h, g, d, f, e[r + 3], 16, -722521979)),
                            (f = a(f, h, g, d, e[r + 6], 23, 76029189)),
                            (d = a(d, f, h, g, e[r + 9], 4, -640364487)),
                            (g = a(g, d, f, h, e[r + 12], 11, -421815835)),
                            (h = a(h, g, d, f, e[r + 15], 16, 530742520)),
                            (d = s(
                                d,
                                (f = a(f, h, g, d, e[r + 2], 23, -995338651)),
                                h,
                                g,
                                e[r],
                                6,
                                -198630844
                            )),
                            (g = s(g, d, f, h, e[r + 7], 10, 1126891415)),
                            (h = s(h, g, d, f, e[r + 14], 15, -1416354905)),
                            (f = s(f, h, g, d, e[r + 5], 21, -57434055)),
                            (d = s(d, f, h, g, e[r + 12], 6, 1700485571)),
                            (g = s(g, d, f, h, e[r + 3], 10, -1894986606)),
                            (h = s(h, g, d, f, e[r + 10], 15, -1051523)),
                            (f = s(f, h, g, d, e[r + 1], 21, -2054922799)),
                            (d = s(d, f, h, g, e[r + 8], 6, 1873313359)),
                            (g = s(g, d, f, h, e[r + 15], 10, -30611744)),
                            (h = s(h, g, d, f, e[r + 6], 15, -1560198380)),
                            (f = s(f, h, g, d, e[r + 13], 21, 1309151649)),
                            (d = s(d, f, h, g, e[r + 4], 6, -145523070)),
                            (g = s(g, d, f, h, e[r + 11], 10, -1120210379)),
                            (h = s(h, g, d, f, e[r + 2], 15, 718787259)),
                            (f = s(f, h, g, d, e[r + 9], 21, -343485551)),
                            (d = n(d, l)),
                            (f = n(f, c)),
                            (h = n(h, p)),
                            (g = n(g, u))
                    return [d, f, h, g]
                }
                function c(e) {
                    var t,
                        n = '',
                        r = 32 * e.length
                    for (t = 0; t < r; t += 8)
                        n += String.fromCharCode((e[t >> 5] >>> t % 32) & 255)
                    return n
                }
                function p(e) {
                    var t,
                        n = []
                    for (
                        n[(e.length >> 2) - 1] = void 0, t = 0;
                        t < n.length;
                        t += 1
                    )
                        n[t] = 0
                    var r = 8 * e.length
                    for (t = 0; t < r; t += 8)
                        n[t >> 5] |= (255 & e.charCodeAt(t / 8)) << t % 32
                    return n
                }
                function u(e) {
                    var t,
                        n,
                        r = ''
                    for (n = 0; n < e.length; n += 1)
                        (t = e.charCodeAt(n)),
                            (r +=
                                '0123456789abcdef'.charAt((t >>> 4) & 15) +
                                '0123456789abcdef'.charAt(15 & t))
                    return r
                }
                function d(e) {
                    return unescape(encodeURIComponent(e))
                }
                function f(e) {
                    return (function (e) {
                        return c(l(p(e), 8 * e.length))
                    })(d(e))
                }
                function h(e, t) {
                    return (function (e, t) {
                        var n,
                            r,
                            i = p(e),
                            o = [],
                            a = []
                        for (
                            o[15] = a[15] = void 0,
                                i.length > 16 && (i = l(i, 8 * e.length)),
                                n = 0;
                            n < 16;
                            n += 1
                        )
                            (o[n] = 909522486 ^ i[n]),
                                (a[n] = 1549556828 ^ i[n])
                        return (
                            (r = l(o.concat(p(t)), 512 + 8 * t.length)),
                            c(l(a.concat(r), 640))
                        )
                    })(d(e), d(t))
                }
                function g(e, t, n) {
                    return t ? (n ? h(t, e) : u(h(t, e))) : n ? f(e) : u(f(e))
                }
                e.exports ? (e.exports = g) : (t.md5 = g)
            })(n)
        }),
        o = r(function (e, t) {
            !(function (e, t) {
                var n,
                    r,
                    i =
                        'function' == typeof Map
                            ? new Map()
                            : ((n = []),
                              (r = []),
                              {
                                  has: function (e) {
                                      return n.indexOf(e) > -1
                                  },
                                  get: function (e) {
                                      return r[n.indexOf(e)]
                                  },
                                  set: function (e, t) {
                                      ;-1 === n.indexOf(e) &&
                                          (n.push(e), r.push(t))
                                  },
                                  delete: function (e) {
                                      var t = n.indexOf(e)
                                      t > -1 && (n.splice(t, 1), r.splice(t, 1))
                                  },
                              }),
                    o = function (e) {
                        return new Event(e, { bubbles: !0 })
                    }
                try {
                    new Event('test')
                } catch (e) {
                    o = function (e) {
                        var t = document.createEvent('Event')
                        return t.initEvent(e, !0, !1), t
                    }
                }
                function a(e) {
                    var t = i.get(e)
                    t && t.destroy()
                }
                function s(e) {
                    var t = i.get(e)
                    t && t.update()
                }
                var l = null
                'undefined' == typeof window ||
                'function' != typeof window.getComputedStyle
                    ? (((l = function (e) {
                          return e
                      }).destroy = function (e) {
                          return e
                      }),
                      (l.update = function (e) {
                          return e
                      }))
                    : (((l = function (e, t) {
                          return (
                              e &&
                                  Array.prototype.forEach.call(
                                      e.length ? e : [e],
                                      function (e) {
                                          return (function (e) {
                                              if (
                                                  e &&
                                                  e.nodeName &&
                                                  'TEXTAREA' === e.nodeName &&
                                                  !i.has(e)
                                              ) {
                                                  var t = null,
                                                      n = null,
                                                      r = null,
                                                      a = function () {
                                                          e.clientWidth !== n &&
                                                              u()
                                                      },
                                                      s = function (t) {
                                                          window.removeEventListener(
                                                              'resize',
                                                              a,
                                                              !1
                                                          ),
                                                              e.removeEventListener(
                                                                  'input',
                                                                  u,
                                                                  !1
                                                              ),
                                                              e.removeEventListener(
                                                                  'keyup',
                                                                  u,
                                                                  !1
                                                              ),
                                                              e.removeEventListener(
                                                                  'autosize:destroy',
                                                                  s,
                                                                  !1
                                                              ),
                                                              e.removeEventListener(
                                                                  'autosize:update',
                                                                  u,
                                                                  !1
                                                              ),
                                                              Object.keys(
                                                                  t
                                                              ).forEach(
                                                                  function (n) {
                                                                      e.style[
                                                                          n
                                                                      ] = t[n]
                                                                  }
                                                              ),
                                                              i.delete(e)
                                                      }.bind(e, {
                                                          height:
                                                              e.style.height,
                                                          resize:
                                                              e.style.resize,
                                                          overflowY:
                                                              e.style.overflowY,
                                                          overflowX:
                                                              e.style.overflowX,
                                                          wordWrap:
                                                              e.style.wordWrap,
                                                      })
                                                  e.addEventListener(
                                                      'autosize:destroy',
                                                      s,
                                                      !1
                                                  ),
                                                      'onpropertychange' in e &&
                                                          'oninput' in e &&
                                                          e.addEventListener(
                                                              'keyup',
                                                              u,
                                                              !1
                                                          ),
                                                      window.addEventListener(
                                                          'resize',
                                                          a,
                                                          !1
                                                      ),
                                                      e.addEventListener(
                                                          'input',
                                                          u,
                                                          !1
                                                      ),
                                                      e.addEventListener(
                                                          'autosize:update',
                                                          u,
                                                          !1
                                                      ),
                                                      (e.style.overflowX =
                                                          'hidden'),
                                                      (e.style.wordWrap =
                                                          'break-word'),
                                                      i.set(e, {
                                                          destroy: s,
                                                          update: u,
                                                      }),
                                                      'vertical' ===
                                                      (l = window.getComputedStyle(
                                                          e,
                                                          null
                                                      )).resize
                                                          ? (e.style.resize =
                                                                'none')
                                                          : 'both' ===
                                                                l.resize &&
                                                            (e.style.resize =
                                                                'horizontal'),
                                                      (t =
                                                          'content-box' ===
                                                          l.boxSizing
                                                              ? -(
                                                                    parseFloat(
                                                                        l.paddingTop
                                                                    ) +
                                                                    parseFloat(
                                                                        l.paddingBottom
                                                                    )
                                                                )
                                                              : parseFloat(
                                                                    l.borderTopWidth
                                                                ) +
                                                                parseFloat(
                                                                    l.borderBottomWidth
                                                                )),
                                                      isNaN(t) && (t = 0),
                                                      u()
                                              }
                                              var l
                                              function c(t) {
                                                  var n = e.style.width
                                                  ;(e.style.width = '0px'),
                                                      (e.style.width = n),
                                                      (e.style.overflowY = t)
                                              }
                                              function p() {
                                                  if (0 !== e.scrollHeight) {
                                                      var r = (function (e) {
                                                              for (
                                                                  var t = [];
                                                                  e &&
                                                                  e.parentNode &&
                                                                  e.parentNode instanceof
                                                                      Element;

                                                              )
                                                                  e.parentNode
                                                                      .scrollTop &&
                                                                      t.push({
                                                                          node:
                                                                              e.parentNode,
                                                                          scrollTop:
                                                                              e
                                                                                  .parentNode
                                                                                  .scrollTop,
                                                                      }),
                                                                      (e =
                                                                          e.parentNode)
                                                              return t
                                                          })(e),
                                                          i =
                                                              document.documentElement &&
                                                              document
                                                                  .documentElement
                                                                  .scrollTop
                                                      ;(e.style.height = ''),
                                                          (e.style.height =
                                                              e.scrollHeight +
                                                              t +
                                                              'px'),
                                                          (n = e.clientWidth),
                                                          r.forEach(function (
                                                              e
                                                          ) {
                                                              e.node.scrollTop =
                                                                  e.scrollTop
                                                          }),
                                                          i &&
                                                              (document.documentElement.scrollTop = i)
                                                  }
                                              }
                                              function u() {
                                                  p()
                                                  var t = Math.round(
                                                          parseFloat(
                                                              e.style.height
                                                          )
                                                      ),
                                                      n = window.getComputedStyle(
                                                          e,
                                                          null
                                                      ),
                                                      i =
                                                          'content-box' ===
                                                          n.boxSizing
                                                              ? Math.round(
                                                                    parseFloat(
                                                                        n.height
                                                                    )
                                                                )
                                                              : e.offsetHeight
                                                  if (
                                                      (i < t
                                                          ? 'hidden' ===
                                                                n.overflowY &&
                                                            (c('scroll'),
                                                            p(),
                                                            (i =
                                                                'content-box' ===
                                                                n.boxSizing
                                                                    ? Math.round(
                                                                          parseFloat(
                                                                              window.getComputedStyle(
                                                                                  e,
                                                                                  null
                                                                              )
                                                                                  .height
                                                                          )
                                                                      )
                                                                    : e.offsetHeight))
                                                          : 'hidden' !==
                                                                n.overflowY &&
                                                            (c('hidden'),
                                                            p(),
                                                            (i =
                                                                'content-box' ===
                                                                n.boxSizing
                                                                    ? Math.round(
                                                                          parseFloat(
                                                                              window.getComputedStyle(
                                                                                  e,
                                                                                  null
                                                                              )
                                                                                  .height
                                                                          )
                                                                      )
                                                                    : e.offsetHeight)),
                                                      r !== i)
                                                  ) {
                                                      r = i
                                                      var a = o(
                                                          'autosize:resized'
                                                      )
                                                      try {
                                                          e.dispatchEvent(a)
                                                      } catch (e) {}
                                                  }
                                              }
                                          })(e)
                                      }
                                  ),
                              e
                          )
                      }).destroy = function (e) {
                          return (
                              e &&
                                  Array.prototype.forEach.call(
                                      e.length ? e : [e],
                                      a
                                  ),
                              e
                          )
                      }),
                      (l.update = function (e) {
                          return (
                              e &&
                                  Array.prototype.forEach.call(
                                      e.length ? e : [e],
                                      s
                                  ),
                              e
                          )
                      })),
                    (t.default = l),
                    (e.exports = t.default)
            })(e, t)
        }),
        a = Function.prototype.toString,
        s = /^\s*class\b/,
        l = function (e) {
            try {
                var t = a.call(e)
                return s.test(t)
            } catch (e) {
                return !1
            }
        },
        c = Object.prototype.toString,
        p =
            'function' == typeof Symbol &&
            'symbol' == typeof Symbol.toStringTag,
        u = Object.prototype.toString,
        d = Object.prototype.hasOwnProperty,
        f = function (e, t, n) {
            if (
                !(function (e) {
                    if (!e) return !1
                    if ('function' != typeof e && 'object' != typeof e)
                        return !1
                    if ('function' == typeof e && !e.prototype) return !0
                    if (p)
                        return (function (e) {
                            try {
                                return !l(e) && (a.call(e), !0)
                            } catch (e) {
                                return !1
                            }
                        })(e)
                    if (l(e)) return !1
                    var t = c.call(e)
                    return (
                        '[object Function]' === t ||
                        '[object GeneratorFunction]' === t
                    )
                })(t)
            )
                throw new TypeError('iterator must be a function')
            var r
            arguments.length >= 3 && (r = n),
                '[object Array]' === u.call(e)
                    ? (function (e, t, n) {
                          for (var r = 0, i = e.length; r < i; r++)
                              d.call(e, r) &&
                                  (null == n
                                      ? t(e[r], r, e)
                                      : t.call(n, e[r], r, e))
                      })(e, t, r)
                    : 'string' == typeof e
                    ? (function (e, t, n) {
                          for (var r = 0, i = e.length; r < i; r++)
                              null == n
                                  ? t(e.charAt(r), r, e)
                                  : t.call(n, e.charAt(r), r, e)
                      })(e, t, r)
                    : (function (e, t, n) {
                          for (var r in e)
                              d.call(e, r) &&
                                  (null == n
                                      ? t(e[r], r, e)
                                      : t.call(n, e[r], r, e))
                      })(e, t, r)
        },
        h = function () {}
    'production' !== process.env.NODE_ENV &&
        (h = function (e, t, n) {
            var r = arguments.length
            n = new Array(r > 2 ? r - 2 : 0)
            for (var i = 2; i < r; i++) n[i - 2] = arguments[i]
            if (void 0 === t)
                throw new Error(
                    '`warning(condition, format, ...args)` requires a warning message argument'
                )
            e ||
                function (e, t) {
                    var n = arguments.length
                    t = new Array(n > 1 ? n - 1 : 0)
                    for (var r = 1; r < n; r++) t[r - 1] = arguments[r]
                    var i = 0,
                        o =
                            'Warning: ' +
                            e.replace(/%s/g, function () {
                                return t[i++]
                            })
                    'undefined' != typeof console && console.error(o)
                    try {
                        throw new Error(o)
                    } catch (e) {}
                }.apply(null, [t].concat(n))
        })
    var g = h,
        y = Array.prototype.slice,
        v = Object.prototype.toString,
        m =
            Function.prototype.bind ||
            function (e) {
                var t = this
                if ('function' != typeof t || '[object Function]' !== v.call(t))
                    throw new TypeError(
                        'Function.prototype.bind called on incompatible ' + t
                    )
                for (
                    var n,
                        r = y.call(arguments, 1),
                        i = Math.max(0, t.length - r.length),
                        o = [],
                        a = 0;
                    a < i;
                    a++
                )
                    o.push('$' + a)
                if (
                    ((n = Function(
                        'binder',
                        'return function (' +
                            o.join(',') +
                            '){ return binder.apply(this,arguments); }'
                    )(function () {
                        if (this instanceof n) {
                            var i = t.apply(this, r.concat(y.call(arguments)))
                            return Object(i) === i ? i : this
                        }
                        return t.apply(e, r.concat(y.call(arguments)))
                    })),
                    t.prototype)
                ) {
                    var s = function () {}
                    ;(s.prototype = t.prototype),
                        (n.prototype = new s()),
                        (s.prototype = null)
                }
                return n
            },
        b = m.call(Function.call, Object.prototype.hasOwnProperty),
        w = n.Symbol,
        x = TypeError,
        k = Object.getOwnPropertyDescriptor
    if (k)
        try {
            k({}, '')
        } catch (e) {
            k = null
        }
    var A = function () {
            throw new x()
        },
        $ = k
            ? (function () {
                  try {
                      return A
                  } catch (e) {
                      try {
                          return k(arguments, 'callee').get
                      } catch (e) {
                          return A
                      }
                  }
              })()
            : A,
        S =
            'function' == typeof w &&
            'function' == typeof Symbol &&
            'symbol' == typeof w('foo') &&
            'symbol' == typeof Symbol('bar') &&
            (function () {
                if (
                    'function' != typeof Symbol ||
                    'function' != typeof Object.getOwnPropertySymbols
                )
                    return !1
                if ('symbol' == typeof Symbol.iterator) return !0
                var e = {},
                    t = Symbol('test'),
                    n = Object(t)
                if ('string' == typeof t) return !1
                if ('[object Symbol]' !== Object.prototype.toString.call(t))
                    return !1
                if ('[object Symbol]' !== Object.prototype.toString.call(n))
                    return !1
                for (t in ((e[t] = 42), e)) return !1
                if (
                    'function' == typeof Object.keys &&
                    0 !== Object.keys(e).length
                )
                    return !1
                if (
                    'function' == typeof Object.getOwnPropertyNames &&
                    0 !== Object.getOwnPropertyNames(e).length
                )
                    return !1
                var r = Object.getOwnPropertySymbols(e)
                if (1 !== r.length || r[0] !== t) return !1
                if (!Object.prototype.propertyIsEnumerable.call(e, t)) return !1
                if ('function' == typeof Object.getOwnPropertyDescriptor) {
                    var i = Object.getOwnPropertyDescriptor(e, t)
                    if (42 !== i.value || !0 !== i.enumerable) return !1
                }
                return !0
            })(),
        O =
            Object.getPrototypeOf ||
            function (e) {
                return e.__proto__
            },
        E = 'undefined' == typeof Uint8Array ? void 0 : O(Uint8Array),
        _ = {
            '%Array%': Array,
            '%ArrayBuffer%':
                'undefined' == typeof ArrayBuffer ? void 0 : ArrayBuffer,
            '%ArrayBufferPrototype%':
                'undefined' == typeof ArrayBuffer
                    ? void 0
                    : ArrayBuffer.prototype,
            '%ArrayIteratorPrototype%': S ? O([][Symbol.iterator]()) : void 0,
            '%ArrayPrototype%': Array.prototype,
            '%ArrayProto_entries%': Array.prototype.entries,
            '%ArrayProto_forEach%': Array.prototype.forEach,
            '%ArrayProto_keys%': Array.prototype.keys,
            '%ArrayProto_values%': Array.prototype.values,
            '%AsyncFromSyncIteratorPrototype%': void 0,
            '%AsyncFunction%': void 0,
            '%AsyncFunctionPrototype%': void 0,
            '%AsyncGenerator%': void 0,
            '%AsyncGeneratorFunction%': void 0,
            '%AsyncGeneratorPrototype%': void 0,
            '%AsyncIteratorPrototype%': void 0,
            '%Atomics%': 'undefined' == typeof Atomics ? void 0 : Atomics,
            '%Boolean%': Boolean,
            '%BooleanPrototype%': Boolean.prototype,
            '%DataView%': 'undefined' == typeof DataView ? void 0 : DataView,
            '%DataViewPrototype%':
                'undefined' == typeof DataView ? void 0 : DataView.prototype,
            '%Date%': Date,
            '%DatePrototype%': Date.prototype,
            '%decodeURI%': decodeURI,
            '%decodeURIComponent%': decodeURIComponent,
            '%encodeURI%': encodeURI,
            '%encodeURIComponent%': encodeURIComponent,
            '%Error%': Error,
            '%ErrorPrototype%': Error.prototype,
            '%eval%': eval,
            '%EvalError%': EvalError,
            '%EvalErrorPrototype%': EvalError.prototype,
            '%Float32Array%':
                'undefined' == typeof Float32Array ? void 0 : Float32Array,
            '%Float32ArrayPrototype%':
                'undefined' == typeof Float32Array
                    ? void 0
                    : Float32Array.prototype,
            '%Float64Array%':
                'undefined' == typeof Float64Array ? void 0 : Float64Array,
            '%Float64ArrayPrototype%':
                'undefined' == typeof Float64Array
                    ? void 0
                    : Float64Array.prototype,
            '%Function%': Function,
            '%FunctionPrototype%': Function.prototype,
            '%Generator%': void 0,
            '%GeneratorFunction%': void 0,
            '%GeneratorPrototype%': void 0,
            '%Int8Array%': 'undefined' == typeof Int8Array ? void 0 : Int8Array,
            '%Int8ArrayPrototype%':
                'undefined' == typeof Int8Array ? void 0 : Int8Array.prototype,
            '%Int16Array%':
                'undefined' == typeof Int16Array ? void 0 : Int16Array,
            '%Int16ArrayPrototype%':
                'undefined' == typeof Int16Array ? void 0 : Int8Array.prototype,
            '%Int32Array%':
                'undefined' == typeof Int32Array ? void 0 : Int32Array,
            '%Int32ArrayPrototype%':
                'undefined' == typeof Int32Array
                    ? void 0
                    : Int32Array.prototype,
            '%isFinite%': isFinite,
            '%isNaN%': isNaN,
            '%IteratorPrototype%': S ? O(O([][Symbol.iterator]())) : void 0,
            '%JSON%': 'object' == typeof JSON ? JSON : void 0,
            '%JSONParse%': 'object' == typeof JSON ? JSON.parse : void 0,
            '%Map%': 'undefined' == typeof Map ? void 0 : Map,
            '%MapIteratorPrototype%':
                'undefined' != typeof Map && S
                    ? O(new Map()[Symbol.iterator]())
                    : void 0,
            '%MapPrototype%':
                'undefined' == typeof Map ? void 0 : Map.prototype,
            '%Math%': Math,
            '%Number%': Number,
            '%NumberPrototype%': Number.prototype,
            '%Object%': Object,
            '%ObjectPrototype%': Object.prototype,
            '%ObjProto_toString%': Object.prototype.toString,
            '%ObjProto_valueOf%': Object.prototype.valueOf,
            '%parseFloat%': parseFloat,
            '%parseInt%': parseInt,
            '%Promise%': 'undefined' == typeof Promise ? void 0 : Promise,
            '%PromisePrototype%':
                'undefined' == typeof Promise ? void 0 : Promise.prototype,
            '%PromiseProto_then%':
                'undefined' == typeof Promise ? void 0 : Promise.prototype.then,
            '%Promise_all%':
                'undefined' == typeof Promise ? void 0 : Promise.all,
            '%Promise_reject%':
                'undefined' == typeof Promise ? void 0 : Promise.reject,
            '%Promise_resolve%':
                'undefined' == typeof Promise ? void 0 : Promise.resolve,
            '%Proxy%': 'undefined' == typeof Proxy ? void 0 : Proxy,
            '%RangeError%': RangeError,
            '%RangeErrorPrototype%': RangeError.prototype,
            '%ReferenceError%': ReferenceError,
            '%ReferenceErrorPrototype%': ReferenceError.prototype,
            '%Reflect%': 'undefined' == typeof Reflect ? void 0 : Reflect,
            '%RegExp%': RegExp,
            '%RegExpPrototype%': RegExp.prototype,
            '%Set%': 'undefined' == typeof Set ? void 0 : Set,
            '%SetIteratorPrototype%':
                'undefined' != typeof Set && S
                    ? O(new Set()[Symbol.iterator]())
                    : void 0,
            '%SetPrototype%':
                'undefined' == typeof Set ? void 0 : Set.prototype,
            '%SharedArrayBuffer%':
                'undefined' == typeof SharedArrayBuffer
                    ? void 0
                    : SharedArrayBuffer,
            '%SharedArrayBufferPrototype%':
                'undefined' == typeof SharedArrayBuffer
                    ? void 0
                    : SharedArrayBuffer.prototype,
            '%String%': String,
            '%StringIteratorPrototype%': S ? O(''[Symbol.iterator]()) : void 0,
            '%StringPrototype%': String.prototype,
            '%Symbol%': S ? Symbol : void 0,
            '%SymbolPrototype%': S ? Symbol.prototype : void 0,
            '%SyntaxError%': SyntaxError,
            '%SyntaxErrorPrototype%': SyntaxError.prototype,
            '%ThrowTypeError%': $,
            '%TypedArray%': E,
            '%TypedArrayPrototype%': E ? E.prototype : void 0,
            '%TypeError%': x,
            '%TypeErrorPrototype%': x.prototype,
            '%Uint8Array%':
                'undefined' == typeof Uint8Array ? void 0 : Uint8Array,
            '%Uint8ArrayPrototype%':
                'undefined' == typeof Uint8Array
                    ? void 0
                    : Uint8Array.prototype,
            '%Uint8ClampedArray%':
                'undefined' == typeof Uint8ClampedArray
                    ? void 0
                    : Uint8ClampedArray,
            '%Uint8ClampedArrayPrototype%':
                'undefined' == typeof Uint8ClampedArray
                    ? void 0
                    : Uint8ClampedArray.prototype,
            '%Uint16Array%':
                'undefined' == typeof Uint16Array ? void 0 : Uint16Array,
            '%Uint16ArrayPrototype%':
                'undefined' == typeof Uint16Array
                    ? void 0
                    : Uint16Array.prototype,
            '%Uint32Array%':
                'undefined' == typeof Uint32Array ? void 0 : Uint32Array,
            '%Uint32ArrayPrototype%':
                'undefined' == typeof Uint32Array
                    ? void 0
                    : Uint32Array.prototype,
            '%URIError%': URIError,
            '%URIErrorPrototype%': URIError.prototype,
            '%WeakMap%': 'undefined' == typeof WeakMap ? void 0 : WeakMap,
            '%WeakMapPrototype%':
                'undefined' == typeof WeakMap ? void 0 : WeakMap.prototype,
            '%WeakSet%': 'undefined' == typeof WeakSet ? void 0 : WeakSet,
            '%WeakSetPrototype%':
                'undefined' == typeof WeakSet ? void 0 : WeakSet.prototype,
        },
        P = m.call(Function.call, String.prototype.replace),
        j = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g,
        z = /\\(\\)?/g,
        C = function (e, t) {
            if ('string' != typeof e || 0 === e.length)
                throw new TypeError('intrinsic name must be a non-empty string')
            if (arguments.length > 1 && 'boolean' != typeof t)
                throw new TypeError('"allowMissing" argument must be a boolean')
            for (
                var n,
                    r =
                        ((n = []),
                        P(e, j, function (e, t, r, i) {
                            n[n.length] = r ? P(i, z, '$1') : t || e
                        }),
                        n),
                    i = (function (e, t) {
                        if (!(e in _))
                            throw new SyntaxError(
                                'intrinsic ' + e + ' does not exist!'
                            )
                        if (void 0 === _[e] && !t)
                            throw new x(
                                'intrinsic ' +
                                    e +
                                    ' exists, but is not available. Please file an issue!'
                            )
                        return _[e]
                    })('%' + (r.length > 0 ? r[0] : '') + '%', t),
                    o = 1;
                o < r.length;
                o += 1
            )
                if (null != i)
                    if (k && o + 1 >= r.length) {
                        var a = k(i, r[o])
                        if (!(t || r[o] in i))
                            throw new x(
                                'base intrinsic for ' +
                                    e +
                                    ' exists, but the property is not available.'
                            )
                        i = a ? a.get || a.value : i[r[o]]
                    } else i = i[r[o]]
            return i
        },
        I = C('%Function%'),
        T = I.apply,
        R = I.call,
        M = function () {
            return m.apply(R, arguments)
        }
    M.apply = function () {
        return m.apply(T, arguments)
    }
    var F,
        U = Object.prototype.toString,
        B = function (e) {
            var t = U.call(e),
                n = '[object Arguments]' === t
            return (
                n ||
                    (n =
                        '[object Array]' !== t &&
                        null !== e &&
                        'object' == typeof e &&
                        'number' == typeof e.length &&
                        e.length >= 0 &&
                        '[object Function]' === U.call(e.callee)),
                n
            )
        }
    if (!Object.keys) {
        var L = Object.prototype.hasOwnProperty,
            N = Object.prototype.toString,
            D = B,
            Q = Object.prototype.propertyIsEnumerable,
            q = !Q.call({ toString: null }, 'toString'),
            V = Q.call(function () {}, 'prototype'),
            W = [
                'toString',
                'toLocaleString',
                'valueOf',
                'hasOwnProperty',
                'isPrototypeOf',
                'propertyIsEnumerable',
                'constructor',
            ],
            H = function (e) {
                var t = e.constructor
                return t && t.prototype === e
            },
            Z = {
                $applicationCache: !0,
                $console: !0,
                $external: !0,
                $frame: !0,
                $frameElement: !0,
                $frames: !0,
                $innerHeight: !0,
                $innerWidth: !0,
                $onmozfullscreenchange: !0,
                $onmozfullscreenerror: !0,
                $outerHeight: !0,
                $outerWidth: !0,
                $pageXOffset: !0,
                $pageYOffset: !0,
                $parent: !0,
                $scrollLeft: !0,
                $scrollTop: !0,
                $scrollX: !0,
                $scrollY: !0,
                $self: !0,
                $webkitIndexedDB: !0,
                $webkitStorageInfo: !0,
                $window: !0,
            },
            K = (function () {
                if ('undefined' == typeof window) return !1
                for (var e in window)
                    try {
                        !Z['$' + e] &&
                            L.call(window, e) &&
                            null !== window[e] &&
                            window
                    } catch (e) {
                        return !0
                    }
                return !1
            })()
        F = function (e) {
            var t = null !== e && 'object' == typeof e,
                n = '[object Function]' === N.call(e),
                r = D(e),
                i = t && '[object String]' === N.call(e),
                o = []
            if (!t && !n && !r)
                throw new TypeError('Object.keys called on a non-object')
            var a = V && n
            if (i && e.length > 0 && !L.call(e, 0))
                for (var s = 0; s < e.length; ++s) o.push(String(s))
            if (r && e.length > 0)
                for (var l = 0; l < e.length; ++l) o.push(String(l))
            else
                for (var c in e)
                    (a && 'prototype' === c) ||
                        !L.call(e, c) ||
                        o.push(String(c))
            if (q)
                for (
                    var p = (function (e) {
                            if ('undefined' == typeof window || !K) return H(e)
                            try {
                                return H(e)
                            } catch (e) {
                                return !1
                            }
                        })(e),
                        u = 0;
                    u < W.length;
                    ++u
                )
                    (p && 'constructor' === W[u]) ||
                        !L.call(e, W[u]) ||
                        o.push(W[u])
            return o
        }
    }
    var J = Array.prototype.slice,
        X = Object.keys,
        G = X
            ? function (e) {
                  return X(e)
              }
            : F,
        Y = Object.keys
    G.shim = function () {
        return (
            Object.keys
                ? (function () {
                      var e = Object.keys(arguments)
                      return e && e.length === arguments.length
                  })(1, 2) ||
                  (Object.keys = function (e) {
                      return B(e) ? Y(J.call(e)) : Y(e)
                  })
                : (Object.keys = G),
            Object.keys || G
        )
    }
    var ee = G,
        te = 'function' == typeof Symbol && 'symbol' == typeof Symbol('foo'),
        ne = Object.prototype.toString,
        re = Array.prototype.concat,
        ie = Object.defineProperty,
        oe =
            ie &&
            (function () {
                var e = {}
                try {
                    for (var t in (ie(e, 'x', { enumerable: !1, value: e }), e))
                        return !1
                    return e.x === e
                } catch (e) {
                    return !1
                }
            })(),
        ae = function (e, t, n, r) {
            var i
            ;(t in e &&
                ('function' != typeof (i = r) ||
                    '[object Function]' !== ne.call(i) ||
                    !r())) ||
                (oe
                    ? ie(e, t, {
                          configurable: !0,
                          enumerable: !1,
                          value: n,
                          writable: !0,
                      })
                    : (e[t] = n))
        },
        se = function (e, t) {
            var n = arguments.length > 2 ? arguments[2] : {},
                r = ee(t)
            te && (r = re.call(r, Object.getOwnPropertySymbols(t)))
            for (var i = 0; i < r.length; i += 1) ae(e, r[i], t[r[i]], n[r[i]])
        }
    se.supportsDescriptors = !!oe
    var le,
        ce = se,
        pe = C('%TypeError%'),
        ue = C('%String%'),
        de = C('%TypeError%'),
        fe = M(C('String.prototype.indexOf')),
        he =
            'function' == typeof (le = C('String.prototype.replace', !1)) &&
            fe('String.prototype.replace', '.prototype.')
                ? M(le)
                : le,
        ge = /^[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]+/,
        ye = /[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]+$/,
        ve = function () {
            var e = (function (e) {
                if ('symbol' == typeof e)
                    throw new de('Cannot convert a Symbol value to a string')
                return ue(e)
            })(
                (function (e, t) {
                    if (null == e) throw new pe('Cannot call method on ' + e)
                    return e
                })(this)
            )
            return he(he(e, ge, ''), ye, '')
        },
        me = function () {
            return String.prototype.trim && '​' === '​'.trim()
                ? String.prototype.trim
                : ve
        },
        be = M(me())
    ce(be, {
        getPolyfill: me,
        implementation: ve,
        shim: function () {
            var e = me()
            return (
                ce(
                    String.prototype,
                    { trim: e },
                    {
                        trim: function () {
                            return String.prototype.trim !== e
                        },
                    }
                ),
                e
            )
        },
    })
    var we = be,
        xe = function (e) {
            g(!1, e)
        },
        ke = String.prototype.replace,
        Ae = String.prototype.split,
        $e = '||||',
        Se = function (e) {
            var t = e % 100,
                n = t % 10
            return 11 !== t && 1 === n
                ? 0
                : 2 <= n && n <= 4 && !(t >= 12 && t <= 14)
                ? 1
                : 2
        },
        Oe = {
            pluralTypes: {
                arabic: function (e) {
                    if (e < 3) return e
                    var t = e % 100
                    return t >= 3 && t <= 10 ? 3 : t >= 11 ? 4 : 5
                },
                bosnian_serbian: Se,
                chinese: function () {
                    return 0
                },
                croatian: Se,
                french: function (e) {
                    return e > 1 ? 1 : 0
                },
                german: function (e) {
                    return 1 !== e ? 1 : 0
                },
                russian: Se,
                lithuanian: function (e) {
                    return e % 10 == 1 && e % 100 != 11
                        ? 0
                        : e % 10 >= 2 &&
                          e % 10 <= 9 &&
                          (e % 100 < 11 || e % 100 > 19)
                        ? 1
                        : 2
                },
                czech: function (e) {
                    return 1 === e ? 0 : e >= 2 && e <= 4 ? 1 : 2
                },
                polish: function (e) {
                    if (1 === e) return 0
                    var t = e % 10
                    return 2 <= t && t <= 4 && (e % 100 < 10 || e % 100 >= 20)
                        ? 1
                        : 2
                },
                icelandic: function (e) {
                    return e % 10 != 1 || e % 100 == 11 ? 1 : 0
                },
                slovenian: function (e) {
                    var t = e % 100
                    return 1 === t
                        ? 0
                        : 2 === t
                        ? 1
                        : 3 === t || 4 === t
                        ? 2
                        : 3
                },
            },
            pluralTypeToLanguages: {
                arabic: ['ar'],
                bosnian_serbian: [
                    'bs-Latn-BA',
                    'bs-Cyrl-BA',
                    'srl-RS',
                    'sr-RS',
                ],
                chinese: [
                    'id',
                    'id-ID',
                    'ja',
                    'ko',
                    'ko-KR',
                    'lo',
                    'ms',
                    'th',
                    'th-TH',
                    'zh',
                ],
                croatian: ['hr', 'hr-HR'],
                german: [
                    'fa',
                    'da',
                    'de',
                    'en',
                    'es',
                    'fi',
                    'el',
                    'he',
                    'hi-IN',
                    'hu',
                    'hu-HU',
                    'it',
                    'nl',
                    'no',
                    'pt',
                    'sv',
                    'tr',
                ],
                french: ['fr', 'tl', 'pt-br'],
                russian: ['ru', 'ru-RU'],
                lithuanian: ['lt'],
                czech: ['cs', 'cs-CZ', 'sk'],
                polish: ['pl'],
                icelandic: ['is'],
                slovenian: ['sl-SL'],
            },
        }
    function Ee(e) {
        return e.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    }
    var _e = /%\{(.*?)\}/g
    function Pe(e, t, n, r, i) {
        if ('string' != typeof e)
            throw new TypeError(
                'Polyglot.transformPhrase expects argument #1 to be string'
            )
        if (null == t) return e
        var o = e,
            a = r || _e,
            s = i || Oe,
            l = 'number' == typeof t ? { smart_count: t } : t
        if (null != l.smart_count && o) {
            var c = Ae.call(o, $e)
            o = we(
                c[
                    (function (e, t, n) {
                        return s.pluralTypes[
                            (function (e, t) {
                                var n,
                                    r =
                                        ((n = {}),
                                        f(s.pluralTypeToLanguages, function (
                                            e,
                                            t
                                        ) {
                                            f(e, function (e) {
                                                n[e] = t
                                            })
                                        }),
                                        n)
                                return r[t] || r[Ae.call(t, /-/, 1)[0]] || r.en
                            })(0, t)
                        ](n)
                    })(0, n || 'en', l.smart_count)
                ] || c[0]
            )
        }
        return ke.call(o, a, function (e, t) {
            return b(l, t) && null != l[t] ? l[t] : e
        })
    }
    function je(e) {
        var t = e || {}
        ;(this.phrases = {}),
            this.extend(t.phrases || {}),
            (this.currentLocale = t.locale || 'en'),
            (this.onMissingKey =
                'function' == typeof t.onMissingKey
                    ? t.onMissingKey
                    : t.allowMissing
                    ? Pe
                    : null),
            (this.warn = t.warn || xe),
            (this.tokenRegex = (function (e) {
                var t = (e && e.prefix) || '%{',
                    n = (e && e.suffix) || '}'
                if (t === $e || n === $e)
                    throw new RangeError(
                        '"' + $e + '" token is reserved for pluralization'
                    )
                return new RegExp(Ee(t) + '(.*?)' + Ee(n), 'g')
            })(t.interpolation)),
            (this.pluralRules = t.pluralRules || Oe)
    }
    ;(je.prototype.locale = function (e) {
        return e && (this.currentLocale = e), this.currentLocale
    }),
        (je.prototype.extend = function (e, t) {
            f(
                e,
                function (e, n) {
                    var r = t ? t + '.' + n : n
                    'object' == typeof e
                        ? this.extend(e, r)
                        : (this.phrases[r] = e)
                },
                this
            )
        }),
        (je.prototype.unset = function (e, t) {
            'string' == typeof e
                ? delete this.phrases[e]
                : f(
                      e,
                      function (e, n) {
                          var r = t ? t + '.' + n : n
                          'object' == typeof e
                              ? this.unset(e, r)
                              : delete this.phrases[r]
                      },
                      this
                  )
        }),
        (je.prototype.clear = function () {
            this.phrases = {}
        }),
        (je.prototype.replace = function (e) {
            this.clear(), this.extend(e)
        }),
        (je.prototype.t = function (e, t) {
            var n,
                r,
                i = null == t ? {} : t
            return (
                'string' == typeof this.phrases[e]
                    ? (n = this.phrases[e])
                    : 'string' == typeof i._
                    ? (n = i._)
                    : this.onMissingKey
                    ? (r = (0, this.onMissingKey)(
                          e,
                          i,
                          this.currentLocale,
                          this.tokenRegex,
                          this.pluralRules
                      ))
                    : (this.warn('Missing translation for key: "' + e + '"'),
                      (r = e)),
                'string' == typeof n &&
                    (r = Pe(
                        n,
                        i,
                        this.currentLocale,
                        this.tokenRegex,
                        this.pluralRules
                    )),
                r
            )
        }),
        (je.prototype.has = function (e) {
            return b(this.phrases, e)
        }),
        (je.transformPhrase = function (e, t, n) {
            return Pe(e, t, n)
        })
    var ze = je,
        Ce = {
            nick: '昵称',
            mail: '邮箱',
            link: '网址(http://)',
            nickFail: '昵称不能少于3个字符',
            mailFail: '请填写正确的邮件地址',
            sofa: '来发评论吧~',
            submit: '提交',
            reply: '回复',
            cancelReply: '取消回复',
            comments: '评论',
            cancel: '取消',
            confirm: '确认',
            continue: '继续',
            more: '加载更多...',
            preview: '预览',
            emoji: '表情',
            expand: '查看更多...',
            seconds: '秒前',
            minutes: '分钟前',
            hours: '小时前',
            days: '天前',
            now: '刚刚',
            uploading: '正在传输...',
            uploadDone: '传输完成!',
            busy: '操作频繁，请稍候再试...',
            'code-98': 'Valine 初始化失败，请检查 av-min.js 版本',
            'code-99': 'Valine 初始化失败，请检查init中的`el`元素.',
            'code-100': 'Valine 初始化失败，请检查你的AppId和AppKey.',
            'code-140': '今日 API 调用总次数已超过开发版限制.',
            'code-401': '未经授权的操作，请检查你的AppId和AppKey.',
            'code-403': '访问被API域名白名单拒绝，请检查你的安全域名设置.',
        },
        Ie = {
            nick: 'NickName',
            mail: 'E-Mail',
            link: 'Website(http://)',
            nickFail: 'NickName cannot be less than 3 bytes.',
            mailFail: 'Please confirm your email address.',
            sofa: 'No comment yet.',
            submit: 'Submit',
            reply: 'Reply',
            cancelReply: 'Cancel reply',
            comments: 'Comments',
            cancel: 'Cancel',
            confirm: 'Confirm',
            continue: 'Continue',
            more: 'Load More...',
            preview: 'Preview',
            emoji: 'Emoji',
            expand: 'See more....',
            seconds: 'seconds ago',
            minutes: 'minutes ago',
            hours: 'hours ago',
            days: 'days ago',
            now: 'just now',
            uploading: 'Uploading ...',
            uploadDone: 'Upload completed!',
            busy: 'Submit is busy, please wait...',
            'code-98':
                'Valine initialization failed, please check your version of av-min.js.',
            'code-99':
                'Valine initialization failed, Please check the `el` element in the init method.',
            'code-100':
                'Valine initialization failed, Please check your appId and appKey.',
            'code-140':
                'The total number of API calls today has exceeded the development version limit.',
            'code-401':
                'Unauthorized operation, Please check your appId and appKey.',
            'code-403':
                'Access denied by API domain white list, Please check your security domain.',
        },
        Te = {
            nick: 'ニックネーム',
            mail: 'メールアドレス',
            link: 'サイト(http://)',
            nickFail: '3バイト以上のニックネームをご入力ください.',
            mailFail: 'メールアドレスをご確認ください.',
            sofa: 'コメントしましょう~',
            submit: '提出する',
            reply: '返信する',
            cancelReply: 'キャンセル',
            comments: 'コメント',
            cancel: 'キャンセル',
            confirm: '確認する',
            continue: '继续',
            more: 'さらに読み込む...',
            preview: 'プレビュー',
            emoji: '絵文字',
            expand: 'もっと見る',
            seconds: '秒前',
            minutes: '分前',
            hours: '時間前',
            days: '日前',
            now: 'たっだ今',
            uploading: 'アップロード中...',
            uploadDone: 'アップロードが完了しました!',
            busy: '20 秒間隔で提出してください    ...',
            'code-98':
                'ロードエラーです。av-min.js のバージョンを確認してください.',
            'code-99':
                'ロードエラーです。initにある`el`エレメントを確認ください.',
            'code-100': 'ロードエラーです。AppIdとAppKeyを確認ください.',
            'code-140': '今日のAPIコールの総数が開発バージョンの上限を超えた.',
            'code-401': '権限が制限されています。AppIdとAppKeyを確認ください.',
            'code-403':
                'アクセスがAPIなどに制限されました、ドメイン名のセキュリティ設定を確認ください',
        },
        Re = {
            zh: Ce,
            'zh-cn': Ce,
            'zh-CN': Ce,
            'zh-TW': {
                nick: '暱稱',
                mail: '郵箱',
                link: '網址(http://)',
                nickFail: '昵稱不能少於3個字符',
                mailFail: '請填寫正確的郵件地址',
                sofa: '來發評論吧~',
                submit: '提交',
                reply: '回覆',
                cancelReply: '取消回覆',
                comments: '評論',
                cancel: '取消',
                confirm: '確認',
                continue: '繼續',
                more: '加載更多...',
                preview: '預覽',
                emoji: '表情',
                expand: '查看更多...',
                seconds: '秒前',
                minutes: '分鐘前',
                hours: '小時前',
                days: '天前',
                now: '剛剛',
                uploading: '正在上傳...',
                uploadDone: '上傳完成!',
                busy: '操作頻繁，請稍候再試...',
                'code-98': 'Valine 初始化失敗，請檢查 av-min.js 版本',
                'code-99': 'Valine 初始化失敗，請檢查init中的`el`元素.',
                'code-100': 'Valine 初始化失敗，請檢查你的AppId和AppKey.',
                'code-140': '今日 API 調用總次數已超過開發版限制.',
                'code-401': '未經授權的操作，請檢查你的AppId和AppKey.',
                'code-403': '訪問被API域名白名單拒絕，請檢查你的安全域名設置.',
            },
            en: Ie,
            'en-US': Ie,
            ja: Te,
            'ja-JP': Te,
        },
        Me = {
            lang: 'zh-CN',
            langMode: null,
            appId: '',
            appKey: '',
            clazzName: 'Comment',
            meta: ['nick', 'mail', 'link'],
            path: location.pathname,
            placeholder: 'Just Go Go',
            pageSize: 10,
            recordIP: !0,
            serverURLs: '',
            visitor: !1,
            mathJax: !1,
            emojiCDN: '',
            emojiMaps: void 0,
            enableQQ: !1,
            requiredFields: [],
        },
        Fe = ['nick', 'mail', 'link'],
        Ue = function (e) {
            return (Date.now() + Math.round(1e3 * Math.random())).toString(32)
        },
        Be = {
            cdn: '//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/',
            maps: require('./weibo.json'),
            parse: function (e) {
                return String(e).replace(
                    new RegExp(
                        ':(' + Object.keys(Be.maps).join('|') + '):',
                        'ig'
                    ),
                    function (e, t) {
                        return Be.maps[t] ? Be.build(t) : e
                    }
                )
            },
            build: function (e) {
                var t = /^(https?:)?\/\//i,
                    n = Be.maps[e],
                    r = t.test(n) ? n : Be.cdn + n
                return t.test(r)
                    ? '<img alt="' +
                          e +
                          '" referrerPolicy="no-referrer" class="vemoji" src="' +
                          r +
                          '" />'
                    : ''
            },
        },
        Le = function (e) {
            return e instanceof Date
                ? e
                : !isNaN(e) || /^\d+$/.test(e)
                ? new Date(parseInt(e))
                : /GMT/.test(e || '')
                ? Le(new Date(e).getTime())
                : ((e = (e || '')
                      .replace(/(^\s*)|(\s*$)/g, '')
                      .replace(/\.\d+/, '')
                      .replace(/-/, '/')
                      .replace(/-/, '/')
                      .replace(/(\d)T(\d)/, '$1 $2')
                      .replace(/Z/, ' UTC')
                      .replace(/([+-]\d\d):?(\d\d)/, ' $1$2')),
                  new Date(e))
        },
        Ne = function (e, t) {
            for (var n = e.toString(); n.length < t; ) n = '0' + n
            return n
        },
        De = Object.getOwnPropertySymbols,
        Qe = Object.prototype.hasOwnProperty,
        qe = Object.prototype.propertyIsEnumerable,
        Ve = (function () {
            try {
                if (!Object.assign) return !1
                var e = new String('abc')
                if (((e[5] = 'de'), '5' === Object.getOwnPropertyNames(e)[0]))
                    return !1
                for (var t = {}, n = 0; n < 10; n++)
                    t['_' + String.fromCharCode(n)] = n
                if (
                    '0123456789' !==
                    Object.getOwnPropertyNames(t)
                        .map(function (e) {
                            return t[e]
                        })
                        .join('')
                )
                    return !1
                var r = {}
                return (
                    'abcdefghijklmnopqrst'.split('').forEach(function (e) {
                        r[e] = e
                    }),
                    'abcdefghijklmnopqrst' ===
                        Object.keys(Object.assign({}, r)).join('')
                )
            } catch (e) {
                return !1
            }
        })()
            ? Object.assign
            : function (e, t) {
                  for (
                      var n,
                          r,
                          i = (function (e) {
                              if (null == e)
                                  throw new TypeError(
                                      'Object.assign cannot be called with null or undefined'
                                  )
                              return Object(e)
                          })(e),
                          o = 1;
                      o < arguments.length;
                      o++
                  ) {
                      for (var a in (n = Object(arguments[o])))
                          Qe.call(n, a) && (i[a] = n[a])
                      if (De) {
                          r = De(n)
                          for (var s = 0; s < r.length; s++)
                              qe.call(n, r[s]) && (i[r[s]] = n[r[s]])
                      }
                  }
                  return i
              },
        We = window.localStorage
    function He(e) {
        return /^\{[\s\S]*\}$/.test(JSON.stringify(e))
    }
    function Ze(e) {
        return '[object Function]' === {}.toString.call(e)
    }
    function Ke(e) {
        if ('string' == typeof e)
            try {
                return JSON.parse(e)
            } catch (t) {
                return e
            }
    }
    function Je() {
        if (!(this instanceof Je)) return new Je()
    }
    ;(We = (function (e) {
        var t = '_Is_Incognit'
        try {
            e.setItem(t, 'yes')
        } catch (t) {
            if (
                ['QuotaExceededError', 'NS_ERROR_DOM_QUOTA_REACHED'].indexOf(
                    t.name
                ) > -1
            ) {
                var n = function () {}
                e.__proto__ = {
                    setItem: n,
                    getItem: n,
                    removeItem: n,
                    clear: n,
                }
            }
        } finally {
            'yes' === e.getItem(t) && e.removeItem(t)
        }
        return e
    })(We)),
        (Je.prototype = {
            set: function (e, t) {
                if (e && !He(e))
                    We.setItem(
                        e,
                        void 0 === (r = t) || 'function' == typeof r
                            ? r + ''
                            : JSON.stringify(r)
                    )
                else if (He(e)) for (var n in e) this.set(n, e[n])
                var r
                return this
            },
            get: function (e) {
                if (!e) {
                    var t = {}
                    return (
                        this.each(function (e, n) {
                            return (t[e] = n)
                        }),
                        t
                    )
                }
                if ('?' === e.charAt(0)) return this.has(e.substr(1))
                var n = arguments
                if (n.length > 1) {
                    for (var r = {}, i = 0, o = n.length; i < o; i++) {
                        var a = Ke(We.getItem(n[i]))
                        a && (r[n[i]] = a)
                    }
                    return r
                }
                return Ke(We.getItem(e))
            },
            clear: function () {
                return We.clear(), this
            },
            remove: function (e) {
                var t = this.get(e)
                return We.removeItem(e), t
            },
            has: function (e) {
                return {}.hasOwnProperty.call(this.get(), e)
            },
            keys: function () {
                var e = []
                return (
                    this.each(function (t) {
                        e.push(t)
                    }),
                    e
                )
            },
            each: function (e) {
                for (var t = 0, n = We.length; t < n; t++) {
                    var r = We.key(t)
                    e(r, this.get(r))
                }
                return this
            },
            search: function (e) {
                for (
                    var t = this.keys(), n = {}, r = 0, i = t.length;
                    r < i;
                    r++
                )
                    t[r].indexOf(e) > -1 && (n[t[r]] = this.get(t[r]))
                return n
            },
        })
    var Xe = null
    function Ge(e, t) {
        var n = arguments,
            r = null
        if ((Xe || (Xe = Je()), 0 === n.length)) return Xe.get()
        if (1 === n.length) {
            if ('string' == typeof e) return Xe.get(e)
            if (He(e)) return Xe.set(e)
        }
        if (2 === n.length && 'string' == typeof e) {
            if (!t) return Xe.remove(e)
            if (t && 'string' == typeof t) return Xe.set(e, t)
            t && Ze(t) && ((r = null), (r = t(e, Xe.get(e))), Ge.set(e, r))
        }
        if (2 === n.length && '[object Array]' === {}.toString.call(e) && Ze(t))
            for (var i = 0, o = e.length; i < o; i++)
                (r = t(e[i], Xe.get(e[i]))), Ge.set(e[i], r)
        return Ge
    }
    for (var Ye in Je.prototype) Ge[Ye] = Je.prototype[Ye]
    var et = document,
        tt = navigator,
        nt = /[&<>"'`\\]/g,
        rt = RegExp(nt.source),
        it = /&(?:amp|lt|gt|quot|#39|#x60|#x5c);/g,
        ot = RegExp(it.source),
        at = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
            '`': '&#x60;',
            '\\': '&#x5c;',
        },
        st = {}
    for (var lt in at) st[at[lt]] = lt
    var ct = null
    Array.prototype.forEach ||
        (Array.prototype.forEach = function (e, t) {
            var n, r
            if (null == this)
                throw new TypeError(' this is null or not defined')
            var i = Object(this),
                o = i.length >>> 0
            if ('function' != typeof e)
                throw new TypeError(e + ' is not a function')
            for (arguments.length > 1 && (n = t), r = 0; r < o; )
                r in i && e.call(n, i[r], r, i), r++
        }),
        window.NodeList &&
            !NodeList.prototype.forEach &&
            (NodeList.prototype.forEach = Array.prototype.forEach),
        String.prototype.trim ||
            (String.prototype.trim = function () {
                return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '')
            }),
        Ve(e.fn, {
            prepend: function (e) {
                return (
                    e instanceof HTMLElement || (e = e[0]),
                    this.forEach(function (t) {
                        t.insertAdjacentElement('afterBegin', e)
                    }),
                    this
                )
            },
            append: function (e) {
                return (
                    e instanceof HTMLElement || (e = e[0]),
                    this.forEach(function (t) {
                        t.insertAdjacentElement('beforeEnd', e)
                    }),
                    this
                )
            },
            remove: function () {
                return (
                    this.forEach(function (e) {
                        try {
                            e.parentNode.removeChild(e)
                        } catch (e) {}
                    }),
                    this
                )
            },
            find: function (t) {
                return e(t, this)
            },
            show: function () {
                return (
                    this.forEach(function (e) {
                        e.style.display = 'block'
                    }),
                    this
                )
            },
            hide: function () {
                return (
                    this.forEach(function (e) {
                        e.style.display = 'none'
                    }),
                    this
                )
            },
            on: function (t, n, r) {
                return (
                    e.fn.off(t, n, r),
                    this.forEach(function (e) {
                        t.split(' ').forEach(function (t) {
                            e.addEventListener
                                ? e.addEventListener(t, n, r || !1)
                                : e.attachEvent
                                ? e.attachEvent('on' + t, n)
                                : (e['on' + t] = n)
                        })
                    }),
                    this
                )
            },
            off: function (e, t, n) {
                return (
                    this.forEach(function (r) {
                        e.split(' ').forEach(function (e) {
                            r.removeEventListener
                                ? r.removeEventListener(e, t, n || !1)
                                : r.detachEvent
                                ? r.detachEvent('on' + e, t)
                                : (r['on' + e] = null)
                        })
                    }),
                    this
                )
            },
            html: function (e) {
                return void 0 !== e
                    ? (this.forEach(function (t) {
                          t.innerHTML = e
                      }),
                      this)
                    : this[0].innerHTML
            },
            text: function (e) {
                return void 0 !== e
                    ? (this.forEach(function (t) {
                          t.innerText = e
                      }),
                      this)
                    : this[0].innerText
            },
            empty: function (e) {
                return (
                    (e = e || 0),
                    this.forEach(function (t) {
                        setTimeout(function (e) {
                            t.innerText = ''
                        }, e)
                    }),
                    this
                )
            },
            val: function (e) {
                return void 0 !== e
                    ? (this.forEach(function (t) {
                          t.value = e
                      }),
                      this)
                    : this[0].value || ''
            },
            attr: function () {
                var e = arguments
                if ('object' == typeof arguments[0]) {
                    var t = arguments[0],
                        n = this
                    return (
                        Object.keys(t).forEach(function (e) {
                            n.forEach(function (n) {
                                n.setAttribute(e, t[e])
                            })
                        }),
                        this
                    )
                }
                return 'string' == typeof arguments[0] && arguments.length < 2
                    ? this[0].getAttribute(arguments[0]) || ''
                    : (this.forEach(function (t) {
                          t.setAttribute(e[0], e[1])
                      }),
                      this)
            },
            removeAttr: function (e) {
                return (
                    this.forEach(function (t) {
                        var n,
                            r = 0,
                            i = e && e.match(/[^\x20\t\r\n\f\*\/\\]+/g)
                        if (i && 1 === t.nodeType)
                            for (; (n = i[r++]); ) t.removeAttribute(n)
                    }),
                    this
                )
            },
            hasClass: function (e) {
                return (
                    !!this[0] &&
                    new RegExp('(\\s|^)' + e + '(\\s|$)').test(
                        this[0].getAttribute('class')
                    )
                )
            },
            addClass: function (t) {
                return (
                    this.forEach(function (n) {
                        var r = e(n),
                            i = r.attr('class')
                        !r.hasClass(t) && r.attr('class', (i += ' ' + t))
                    }),
                    this
                )
            },
            removeClass: function (t) {
                return (
                    this.forEach(function (n) {
                        var r = e(n),
                            i = r.attr('class')
                        if (r.hasClass(t)) {
                            var o = new RegExp('(\\s|^)' + t + '(\\s|$)')
                            r.attr('class', i.replace(o, ''))
                        }
                    }),
                    this
                )
            },
        }),
        Ve(e, {
            extend: Ve,
            noop: function () {},
            navi: tt,
            ua: tt.userAgent,
            lang: tt.language || tt.languages[0],
            detect: function (e) {
                var t = {},
                    n = {
                        Trident:
                            (e = e || navigator.userAgent).indexOf('Trident') >
                                -1 || e.indexOf('NET CLR') > -1,
                        Presto: e.indexOf('Presto') > -1,
                        WebKit: e.indexOf('AppleWebKit') > -1,
                        Gecko: e.indexOf('Gecko/') > -1,
                        Safari: e.indexOf('Safari') > -1,
                        Edge: e.indexOf('Edge') > -1 || e.indexOf('Edg') > -1,
                        Chrome:
                            e.indexOf('Chrome') > -1 || e.indexOf('CriOS') > -1,
                        IE: e.indexOf('MSIE') > -1 || e.indexOf('Trident') > -1,
                        Firefox:
                            e.indexOf('Firefox') > -1 ||
                            e.indexOf('FxiOS') > -1,
                        'Firefox Focus': e.indexOf('Focus') > -1,
                        Chromium: e.indexOf('Chromium') > -1,
                        Opera: e.indexOf('Opera') > -1 || e.indexOf('OPR') > -1,
                        Vivaldi: e.indexOf('Vivaldi') > -1,
                        Yandex: e.indexOf('YaBrowser') > -1,
                        Kindle:
                            e.indexOf('Kindle') > -1 || e.indexOf('Silk/') > -1,
                        360: e.indexOf('360EE') > -1 || e.indexOf('360SE') > -1,
                        UC: e.indexOf('UC') > -1 || e.indexOf(' UBrowser') > -1,
                        QQBrowser: e.indexOf('QQBrowser') > -1,
                        QQ: e.indexOf('QQ/') > -1,
                        Baidu:
                            e.indexOf('Baidu') > -1 ||
                            e.indexOf('BIDUBrowser') > -1,
                        Maxthon: e.indexOf('Maxthon') > -1,
                        Sogou:
                            e.indexOf('MetaSr') > -1 || e.indexOf('Sogou') > -1,
                        LBBROWSER: e.indexOf('LBBROWSER') > -1,
                        '2345Explorer': e.indexOf('2345Explorer') > -1,
                        TheWorld: e.indexOf('TheWorld') > -1,
                        XiaoMi: e.indexOf('MiuiBrowser') > -1,
                        Quark: e.indexOf('Quark') > -1,
                        Qiyu: e.indexOf('Qiyu') > -1,
                        Wechat: e.indexOf('MicroMessenger') > -1,
                        Taobao: e.indexOf('AliApp(TB') > -1,
                        Alipay: e.indexOf('AliApp(AP') > -1,
                        Weibo: e.indexOf('Weibo') > -1,
                        Douban: e.indexOf('com.douban.frodo') > -1,
                        Suning: e.indexOf('SNEBUY-APP') > -1,
                        iQiYi: e.indexOf('IqiyiApp') > -1,
                        Windows: e.indexOf('Windows') > -1,
                        Linux: e.indexOf('Linux') > -1 || e.indexOf('X11') > -1,
                        macOS: e.indexOf('Macintosh') > -1,
                        Android:
                            e.indexOf('Android') > -1 || e.indexOf('Adr') > -1,
                        Ubuntu: e.indexOf('Ubuntu') > -1,
                        FreeBSD: e.indexOf('FreeBSD') > -1,
                        Debian: e.indexOf('Debian') > -1,
                        'Windows Phone':
                            e.indexOf('IEMobile') > -1 ||
                            e.indexOf('Windows Phone') > -1,
                        BlackBerry:
                            e.indexOf('BlackBerry') > -1 ||
                            e.indexOf('RIM') > -1 ||
                            e.indexOf('BB10') > -1,
                        MeeGo: e.indexOf('MeeGo') > -1,
                        Symbian: e.indexOf('Symbian') > -1,
                        iOS: e.indexOf('like Mac OS X') > -1,
                        'Chrome OS': e.indexOf('CrOS') > -1,
                        WebOS: e.indexOf('hpwOS') > -1,
                        Mobile:
                            e.indexOf('Mobi') > -1 ||
                            e.indexOf('iPh') > -1 ||
                            e.indexOf('480') > -1,
                        Tablet:
                            e.indexOf('Tablet') > -1 ||
                            e.indexOf('Pad') > -1 ||
                            e.indexOf('Nexus 7') > -1,
                    }
                n.Mobile && (n.Mobile = !(e.indexOf('iPad') > -1))
                var r = {
                    browser: [
                        'Safari',
                        'Chrome',
                        'Edge',
                        'IE',
                        'Firefox',
                        'Firefox Focus',
                        'Chromium',
                        'Opera',
                        'Vivaldi',
                        'Yandex',
                        'Kindle',
                        '360',
                        'UC',
                        'QQBrowser',
                        'QQ',
                        'Baidu',
                        'Maxthon',
                        'Sogou',
                        'LBBROWSER',
                        '2345Explorer',
                        'TheWorld',
                        'XiaoMi',
                        'Quark',
                        'Qiyu',
                        'Wechat',
                        'Taobao',
                        'Alipay',
                        'Weibo',
                        'Douban',
                        'Suning',
                        'iQiYi',
                    ],
                    os: [
                        'Windows',
                        'Linux',
                        'Mac OS',
                        'macOS',
                        'Android',
                        'Ubuntu',
                        'FreeBSD',
                        'Debian',
                        'iOS',
                        'Windows Phone',
                        'BlackBerry',
                        'MeeGo',
                        'Symbian',
                        'Chrome OS',
                        'WebOS',
                    ],
                }
                for (var i in r)
                    if (r.hasOwnProperty(i))
                        for (var o = 0, a = r[i].length; o < a; o++) {
                            var s = r[i][o]
                            n[s] && (t[i] = s)
                        }
                var l = {
                    Windows: function () {
                        var t = e.replace(/^.*Windows NT ([\d.]+).*$/, '$1')
                        return (
                            {
                                6.4: '10',
                                6.3: '8.1',
                                6.2: '8',
                                6.1: '7',
                                '6.0': 'Vista',
                                5.2: 'XP',
                                5.1: 'XP',
                                '5.0': '2000',
                            }[t] || t
                        )
                    },
                    Android: e.replace(/^.*Android ([\d.]+);.*$/, '$1'),
                    iOS: e
                        .replace(/^.*OS ([\d_]+) like.*$/, '$1')
                        .replace(/_/g, '.'),
                    Debian: e.replace(/^.*Debian\/([\d.]+).*$/, '$1'),
                    'Windows Phone': e.replace(
                        /^.*Windows Phone( OS)? ([\d.]+);.*$/,
                        '$2'
                    ),
                    macOS: e
                        .replace(/^.*Mac OS X ([\d_]+).*$/, '$1')
                        .replace(/_/g, '.'),
                    WebOS: e.replace(/^.*hpwOS\/([\d.]+);.*$/, '$1'),
                    BlackBerry: e.replace(/^.*BB([\d.]+);*$/, '$1'),
                }
                t.osVersion = ''
                var c = l[t.os]
                c &&
                    (t.osVersion =
                        'function' == typeof c ? c() : c == e ? '' : c)
                var p = {
                    Safari: e.replace(/^.*Version\/([\d.]+).*$/, '$1'),
                    Chrome: e
                        .replace(/^.*Chrome\/([\d.]+).*$/, '$1')
                        .replace(/^.*CriOS\/([\d.]+).*$/, '$1'),
                    IE: e
                        .replace(/^.*MSIE ([\d.]+).*$/, '$1')
                        .replace(/^.*rv:([\d.]+).*$/, '$1'),
                    Edge: e.replace(/^.*Edge?\/([\d.]+).*$/, '$1'),
                    Firefox: e
                        .replace(/^.*Firefox\/([\d.]+).*$/, '$1')
                        .replace(/^.*FxiOS\/([\d.]+).*$/, '$1'),
                    'Firefox Focus': e.replace(/^.*Focus\/([\d.]+).*$/, '$1'),
                    Chromium: e.replace(/^.*Chromium\/([\d.]+).*$/, '$1'),
                    Opera: e
                        .replace(/^.*Opera\/([\d.]+).*$/, '$1')
                        .replace(/^.*OPR\/([\d.]+).*$/, '$1'),
                    Vivaldi: e.replace(/^.*Vivaldi\/([\d.]+).*$/, '$1'),
                    Yandex: e.replace(/^.*YaBrowser\/([\d.]+).*$/, '$1'),
                    Kindle: e.replace(/^.*Version\/([\d.]+).*$/, '$1'),
                    Maxthon: e.replace(/^.*Maxthon\/([\d.]+).*$/, '$1'),
                    QQBrowser: e.replace(/^.*QQBrowser\/([\d.]+).*$/, '$1'),
                    QQ: e.replace(/^.*QQ\/([\d.]+).*$/, '$1'),
                    Baidu: e.replace(/^.*BIDUBrowser[\s\/]([\d.]+).*$/, '$1'),
                    UC: e.replace(/^.*UC?Browser\/([\d.]+).*$/, '$1'),
                    Sogou: e
                        .replace(/^.*SE ([\d.X]+).*$/, '$1')
                        .replace(/^.*SogouMobileBrowser\/([\d.]+).*$/, '$1'),
                    '2345Explorer': e.replace(
                        /^.*2345Explorer\/([\d.]+).*$/,
                        '$1'
                    ),
                    TheWorld: e.replace(/^.*TheWorld ([\d.]+).*$/, '$1'),
                    XiaoMi: e.replace(/^.*MiuiBrowser\/([\d.]+).*$/, '$1'),
                    Quark: e.replace(/^.*Quark\/([\d.]+).*$/, '$1'),
                    Qiyu: e.replace(/^.*Qiyu\/([\d.]+).*$/, '$1'),
                    Wechat: e.replace(/^.*MicroMessenger\/([\d.]+).*$/, '$1'),
                    Taobao: e.replace(/^.*AliApp\(TB\/([\d.]+).*$/, '$1'),
                    Alipay: e.replace(/^.*AliApp\(AP\/([\d.]+).*$/, '$1'),
                    Weibo: e.replace(/^.*weibo__([\d.]+).*$/, '$1'),
                    Douban: e.replace(/^.*com.douban.frodo\/([\d.]+).*$/, '$1'),
                    Suning: e.replace(/^.*SNEBUY-APP([\d.]+).*$/, '$1'),
                    iQiYi: e.replace(/^.*IqiyiVersion\/([\d.]+).*$/, '$1'),
                }
                t.version = ''
                var u = p[t.browser]
                return (
                    u &&
                        (t.version =
                            'function' == typeof u ? u() : u == e ? '' : u),
                    null == t.browser && (t.browser = 'Unknow App'),
                    t
                )
            },
            store: Ge,
            escape: function (e) {
                return e && rt.test(e)
                    ? e.replace(nt, function (e) {
                          return at[e]
                      })
                    : e
            },
            unescape: function (e) {
                return e && ot.test(e)
                    ? e.replace(it, function (e) {
                          return st[e]
                      })
                    : e
            },
            dynamicLoadSource: function (t, n) {
                if (e('script[src="' + t + '"]').length) n && n()
                else {
                    var r = et.createElement('script')
                    ;(r.onload = r.onreadystatechange = function () {
                        ;(this.onload = this.onreadystatechange = null),
                            n && n(),
                            e(r).remove()
                    }),
                        (r.async = !0),
                        r.setAttribute('referrerPolicy', 'no-referrer'),
                        e('head')[0].appendChild(r),
                        (r.src = t)
                }
            },
            sdkLoader: function (t, n, r) {
                n in window && window[n]
                    ? (ct && clearTimeout(ct), r && r())
                    : e.dynamicLoadSource(t, function () {
                          ct = setTimeout(e.sdkLoader(t, n, r), 100)
                      })
            },
            deleteInWin: function (e, t) {
                var n = function (t) {
                    if (e in window)
                        try {
                            delete window[e]
                        } catch (t) {
                            window[e] = null
                        }
                }
                0 === t ? n() : setTimeout(n, t || 500)
            },
            ajax: function (e) {
                ;((e = e || {}).type = (e.type || 'GET').toUpperCase()),
                    (e.dataType = e.dataType || 'json'),
                    (e.async = e.async || !0),
                    (e.timeout = e.timeout || 8e3)
                var t =
                        '[object FormData]' == {}.toString.call(e.data)
                            ? e.data
                            : (function (e) {
                                  var t = []
                                  for (var n in e)
                                      t.push(
                                          encodeURIComponent(n) +
                                              '=' +
                                              encodeURIComponent(e[n])
                                      )
                                  return t.push('t=' + Date.now()), t.join('&')
                              })(e.data),
                    n = null,
                    r =
                        'XMLHttpRequest' in window
                            ? new XMLHttpRequest()
                            : new ActiveXObject('Microsoft.XMLHTTP')
                if (
                    ((r.onreadystatechange = function (t) {
                        if (4 == r.readyState) {
                            clearTimeout(n)
                            var i = r.status
                            i >= 200 && i < 300
                                ? e.success &&
                                  e.success(JSON.parse(r.responseText))
                                : e.fail && e.fail(i)
                        }
                    }),
                    'GET' == e.type)
                )
                    r.open('GET', e.url + '?' + t, e.async), r.send(null)
                else if ('POST' == e.type)
                    if (
                        (r.open('POST', e.url, e.async),
                        '[object Object]' == {}.toString.call(e.header))
                    ) {
                        for (var i in e.header)
                            e.header.hasOwnProperty(i) &&
                                r.setRequestHeader(i, e.header[i])
                        r.send(JSON.stringify(e.data))
                    } else r.send(t)
                n = setTimeout(function (e) {
                    clearTimeout(n), r.abort()
                }, e.timeout)
            },
        })
    var pt = !1,
        ut = function (e, t) {
            if (
                (e.$el && e.$loading.hide().$nodata.hide(),
                '[object Error]' === {}.toString.call(t))
            ) {
                var n = t.code || t.message || t.error || ''
                if (isNaN(n))
                    e.$el &&
                        e.$nodata.show(
                            '<pre style="text-align:left;"> ' +
                                JSON.stringify(t) +
                                '</pre>'
                        )
                else {
                    var r = e.i18n.t('code-' + n),
                        i =
                            (r == 'code-' + n ? void 0 : r) ||
                            t.message ||
                            t.error ||
                            ''
                    101 == n || -1 == n
                        ? e.$nodata.show()
                        : e.$el &&
                          e.$nodata.show(
                              '<pre style="text-align:left;">Code ' +
                                  n +
                                  ': ' +
                                  i +
                                  '</pre>'
                          )
                }
            } else
                e.$el &&
                    e.$nodata.show(
                        '<pre style="text-align:left;">' +
                            JSON.stringify(t) +
                            '</pre>'
                    )
        },
        dt = r(function (e) {
            e.exports = {
                defaults: {
                    baseUrl: null,
                    breaks: !1,
                    gfm: !0,
                    headerIds: !0,
                    headerPrefix: '',
                    highlight: null,
                    langPrefix: 'language-',
                    mangle: !0,
                    pedantic: !1,
                    renderer: null,
                    sanitize: !1,
                    sanitizer: null,
                    silent: !1,
                    smartLists: !1,
                    smartypants: !1,
                    tokenizer: null,
                    xhtml: !1,
                },
                getDefaults: function () {
                    return {
                        baseUrl: null,
                        breaks: !1,
                        gfm: !0,
                        headerIds: !0,
                        headerPrefix: '',
                        highlight: null,
                        langPrefix: 'language-',
                        mangle: !0,
                        pedantic: !1,
                        renderer: null,
                        sanitize: !1,
                        sanitizer: null,
                        silent: !1,
                        smartLists: !1,
                        smartypants: !1,
                        tokenizer: null,
                        xhtml: !1,
                    }
                },
                changeDefaults: function (t) {
                    e.exports.defaults = t
                },
            }
        })
    const ft = /[&<>"']/,
        ht = /[&<>"']/g,
        gt = /[<>"']|&(?!#?\w+;)/,
        yt = /[<>"']|&(?!#?\w+;)/g,
        vt = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
        },
        mt = (e) => vt[e],
        bt = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi
    function wt(e) {
        return e.replace(bt, (e, t) =>
            'colon' === (t = t.toLowerCase())
                ? ':'
                : '#' === t.charAt(0)
                ? 'x' === t.charAt(1)
                    ? String.fromCharCode(parseInt(t.substring(2), 16))
                    : String.fromCharCode(+t.substring(1))
                : ''
        )
    }
    const xt = /(^|[^\[])\^/g,
        kt = /[^\w:]/g,
        At = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i,
        $t = {},
        St = /^[^:]+:\/*[^/]*$/,
        Ot = /^([^:]+:)[\s\S]*$/,
        Et = /^([^:]+:\/*[^/]*)[\s\S]*$/
    function _t(e, t) {
        $t[' ' + e] || ($t[' ' + e] = St.test(e) ? e + '/' : Pt(e, '/', !0))
        const n = -1 === (e = $t[' ' + e]).indexOf(':')
        return '//' === t.substring(0, 2)
            ? n
                ? t
                : e.replace(Ot, '$1') + t
            : '/' === t.charAt(0)
            ? n
                ? t
                : e.replace(Et, '$1') + t
            : e + t
    }
    function Pt(e, t, n) {
        const r = e.length
        if (0 === r) return ''
        let i = 0
        for (; i < r; ) {
            const o = e.charAt(r - i - 1)
            if (o !== t || n) {
                if (o === t || !n) break
                i++
            } else i++
        }
        return e.substr(0, r - i)
    }
    var jt = {
        escape: function (e, t) {
            if (t) {
                if (ft.test(e)) return e.replace(ht, mt)
            } else if (gt.test(e)) return e.replace(yt, mt)
            return e
        },
        unescape: wt,
        edit: function (e, t) {
            ;(e = e.source || e), (t = t || '')
            const n = {
                replace: (t, r) => (
                    (r = (r = r.source || r).replace(xt, '$1')),
                    (e = e.replace(t, r)),
                    n
                ),
                getRegex: () => new RegExp(e, t),
            }
            return n
        },
        cleanUrl: function (e, t, n) {
            if (e) {
                let e
                try {
                    e = decodeURIComponent(wt(n)).replace(kt, '').toLowerCase()
                } catch (e) {
                    return null
                }
                if (
                    0 === e.indexOf('javascript:') ||
                    0 === e.indexOf('vbscript:') ||
                    0 === e.indexOf('data:')
                )
                    return null
            }
            t && !At.test(n) && (n = _t(t, n))
            try {
                n = encodeURI(n).replace(/%25/g, '%')
            } catch (e) {
                return null
            }
            return n
        },
        resolveUrl: _t,
        noopTest: { exec: function () {} },
        merge: function (e) {
            let t,
                n,
                r = 1
            for (; r < arguments.length; r++)
                for (n in (t = arguments[r]))
                    Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
            return e
        },
        splitCells: function (e, t) {
            const n = e
                .replace(/\|/g, (e, t, n) => {
                    let r = !1,
                        i = t
                    for (; --i >= 0 && '\\' === n[i]; ) r = !r
                    return r ? '|' : ' |'
                })
                .split(/ \|/)
            let r = 0
            if (n.length > t) n.splice(t)
            else for (; n.length < t; ) n.push('')
            for (; r < n.length; r++) n[r] = n[r].trim().replace(/\\\|/g, '|')
            return n
        },
        rtrim: Pt,
        findClosingBracket: function (e, t) {
            if (-1 === e.indexOf(t[1])) return -1
            const n = e.length
            let r = 0,
                i = 0
            for (; i < n; i++)
                if ('\\' === e[i]) i++
                else if (e[i] === t[0]) r++
                else if (e[i] === t[1] && --r < 0) return i
            return -1
        },
        checkSanitizeDeprecation: function (e) {
            e &&
                e.sanitize &&
                !e.silent &&
                console.warn(
                    'marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options'
                )
        },
    }
    const { defaults: zt } = dt,
        { rtrim: Ct, splitCells: It, escape: Tt, findClosingBracket: Rt } = jt
    function Mt(e, t, n) {
        const r = t.href,
            i = t.title ? Tt(t.title) : null
        return '!' !== e[0].charAt(0)
            ? { type: 'link', raw: n, href: r, title: i, text: e[1] }
            : { type: 'image', raw: n, text: Tt(e[1]), href: r, title: i }
    }
    var Ft = class {
        constructor(e) {
            this.options = e || zt
        }
        space(e) {
            const t = this.rules.block.newline.exec(e)
            if (t)
                return t[0].length > 1
                    ? { type: 'space', raw: t[0] }
                    : { raw: '\n' }
        }
        code(e, t) {
            const n = this.rules.block.code.exec(e)
            if (n) {
                const e = t[t.length - 1]
                if (e && 'paragraph' === e.type)
                    return (
                        t.pop(),
                        (e.text += '\n' + n[0].trimRight()),
                        (e.raw += '\n' + n[0]),
                        e
                    )
                {
                    const e = n[0].replace(/^ {4}/gm, '')
                    return {
                        type: 'code',
                        raw: n[0],
                        codeBlockStyle: 'indented',
                        text: this.options.pedantic ? e : Ct(e, '\n'),
                    }
                }
            }
        }
        fences(e) {
            const t = this.rules.block.fences.exec(e)
            if (t)
                return {
                    type: 'code',
                    raw: t[0],
                    lang: t[2] ? t[2].trim() : t[2],
                    text: t[3] || '',
                }
        }
        heading(e) {
            const t = this.rules.block.heading.exec(e)
            if (t)
                return {
                    type: 'heading',
                    raw: t[0],
                    depth: t[1].length,
                    text: t[2],
                }
        }
        nptable(e) {
            const t = this.rules.block.nptable.exec(e)
            if (t) {
                const e = {
                    type: 'table',
                    header: It(t[1].replace(/^ *| *\| *$/g, '')),
                    align: t[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
                    cells: t[3] ? t[3].replace(/\n$/, '').split('\n') : [],
                    raw: t[0],
                }
                if (e.header.length === e.align.length) {
                    let t,
                        n = e.align.length
                    for (t = 0; t < n; t++)
                        e.align[t] = /^ *-+: *$/.test(e.align[t])
                            ? 'right'
                            : /^ *:-+: *$/.test(e.align[t])
                            ? 'center'
                            : /^ *:-+ *$/.test(e.align[t])
                            ? 'left'
                            : null
                    for (n = e.cells.length, t = 0; t < n; t++)
                        e.cells[t] = It(e.cells[t], e.header.length)
                    return e
                }
            }
        }
        hr(e) {
            const t = this.rules.block.hr.exec(e)
            if (t) return { type: 'hr', raw: t[0] }
        }
        blockquote(e) {
            const t = this.rules.block.blockquote.exec(e)
            if (t) {
                const e = t[0].replace(/^ *> ?/gm, '')
                return { type: 'blockquote', raw: t[0], text: e }
            }
        }
        list(e) {
            const t = this.rules.block.list.exec(e)
            if (t) {
                let e = t[0]
                const n = t[2],
                    r = n.length > 1,
                    i = {
                        type: 'list',
                        raw: e,
                        ordered: r,
                        start: r ? +n : '',
                        loose: !1,
                        items: [],
                    },
                    o = t[0].match(this.rules.block.item)
                let a,
                    s,
                    l,
                    c,
                    p,
                    u,
                    d,
                    f = !1
                const h = o.length
                for (let t = 0; t < h; t++)
                    (e = a = o[t]),
                        (s = a.length),
                        ~(a = a.replace(/^ *([*+-]|\d+\.) */, '')).indexOf(
                            '\n '
                        ) &&
                            ((s -= a.length),
                            (a = a.replace(
                                this.options.pedantic
                                    ? /^ {1,4}/gm
                                    : new RegExp('^ {1,' + s + '}', 'gm'),
                                ''
                            ))),
                        t !== h - 1 &&
                            ((l = this.rules.block.bullet.exec(o[t + 1])[0]),
                            (n.length > 1
                                ? 1 === l.length
                                : l.length > 1 ||
                                  (this.options.smartLists && l !== n)) &&
                                ((c = o.slice(t + 1).join('\n')),
                                (i.raw = i.raw.substring(
                                    0,
                                    i.raw.length - c.length
                                )),
                                (t = h - 1))),
                        (p = f || /\n\n(?!\s*$)/.test(a)),
                        t !== h - 1 &&
                            ((f = '\n' === a.charAt(a.length - 1)),
                            p || (p = f)),
                        p && (i.loose = !0),
                        (u = /^\[[ xX]\] /.test(a)),
                        (d = void 0),
                        u &&
                            ((d = ' ' !== a[1]),
                            (a = a.replace(/^\[[ xX]\] +/, ''))),
                        i.items.push({
                            raw: e,
                            task: u,
                            checked: d,
                            loose: p,
                            text: a,
                        })
                return i
            }
        }
        html(e) {
            const t = this.rules.block.html.exec(e)
            if (t)
                return {
                    type: this.options.sanitize ? 'paragraph' : 'html',
                    raw: t[0],
                    pre:
                        !this.options.sanitizer &&
                        ('pre' === t[1] ||
                            'script' === t[1] ||
                            'style' === t[1]),
                    text: this.options.sanitize
                        ? this.options.sanitizer
                            ? this.options.sanitizer(t[0])
                            : Tt(t[0])
                        : t[0],
                }
        }
        def(e) {
            const t = this.rules.block.def.exec(e)
            if (t)
                return (
                    t[3] && (t[3] = t[3].substring(1, t[3].length - 1)),
                    {
                        tag: t[1].toLowerCase().replace(/\s+/g, ' '),
                        raw: t[0],
                        href: t[2],
                        title: t[3],
                    }
                )
        }
        table(e) {
            const t = this.rules.block.table.exec(e)
            if (t) {
                const e = {
                    type: 'table',
                    header: It(t[1].replace(/^ *| *\| *$/g, '')),
                    align: t[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
                    cells: t[3] ? t[3].replace(/\n$/, '').split('\n') : [],
                }
                if (e.header.length === e.align.length) {
                    e.raw = t[0]
                    let n,
                        r = e.align.length
                    for (n = 0; n < r; n++)
                        e.align[n] = /^ *-+: *$/.test(e.align[n])
                            ? 'right'
                            : /^ *:-+: *$/.test(e.align[n])
                            ? 'center'
                            : /^ *:-+ *$/.test(e.align[n])
                            ? 'left'
                            : null
                    for (r = e.cells.length, n = 0; n < r; n++)
                        e.cells[n] = It(
                            e.cells[n].replace(/^ *\| *| *\| *$/g, ''),
                            e.header.length
                        )
                    return e
                }
            }
        }
        lheading(e) {
            const t = this.rules.block.lheading.exec(e)
            if (t)
                return {
                    type: 'heading',
                    raw: t[0],
                    depth: '=' === t[2].charAt(0) ? 1 : 2,
                    text: t[1],
                }
        }
        paragraph(e) {
            const t = this.rules.block.paragraph.exec(e)
            if (t)
                return {
                    type: 'paragraph',
                    raw: t[0],
                    text:
                        '\n' === t[1].charAt(t[1].length - 1)
                            ? t[1].slice(0, -1)
                            : t[1],
                }
        }
        text(e) {
            const t = this.rules.block.text.exec(e)
            if (t) return { type: 'text', raw: t[0], text: t[0] }
        }
        escape(e) {
            const t = this.rules.inline.escape.exec(e)
            if (t) return { type: 'escape', raw: t[0], text: Tt(t[1]) }
        }
        tag(e, t, n) {
            const r = this.rules.inline.tag.exec(e)
            if (r)
                return (
                    !t && /^<a /i.test(r[0])
                        ? (t = !0)
                        : t && /^<\/a>/i.test(r[0]) && (t = !1),
                    !n && /^<(pre|code|kbd|script)(\s|>)/i.test(r[0])
                        ? (n = !0)
                        : n &&
                          /^<\/(pre|code|kbd|script)(\s|>)/i.test(r[0]) &&
                          (n = !1),
                    {
                        type: this.options.sanitize ? 'text' : 'html',
                        raw: r[0],
                        inLink: t,
                        inRawBlock: n,
                        text: this.options.sanitize
                            ? this.options.sanitizer
                                ? this.options.sanitizer(r[0])
                                : Tt(r[0])
                            : r[0],
                    }
                )
        }
        link(e) {
            const t = this.rules.inline.link.exec(e)
            if (t) {
                const e = Rt(t[2], '()')
                if (e > -1) {
                    const n =
                        (0 === t[0].indexOf('!') ? 5 : 4) + t[1].length + e
                    ;(t[2] = t[2].substring(0, e)),
                        (t[0] = t[0].substring(0, n).trim()),
                        (t[3] = '')
                }
                let n = t[2],
                    r = ''
                if (this.options.pedantic) {
                    const e = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(n)
                    e ? ((n = e[1]), (r = e[3])) : (r = '')
                } else r = t[3] ? t[3].slice(1, -1) : ''
                return Mt(
                    t,
                    {
                        href: (n = n.trim().replace(/^<([\s\S]*)>$/, '$1'))
                            ? n.replace(this.rules.inline._escapes, '$1')
                            : n,
                        title: r
                            ? r.replace(this.rules.inline._escapes, '$1')
                            : r,
                    },
                    t[0]
                )
            }
        }
        reflink(e, t) {
            let n
            if (
                (n = this.rules.inline.reflink.exec(e)) ||
                (n = this.rules.inline.nolink.exec(e))
            ) {
                let e = (n[2] || n[1]).replace(/\s+/g, ' ')
                if (!(e = t[e.toLowerCase()]) || !e.href) {
                    const e = n[0].charAt(0)
                    return { type: 'text', raw: e, text: e }
                }
                return Mt(n, e, n[0])
            }
        }
        strong(e) {
            const t = this.rules.inline.strong.exec(e)
            if (t)
                return {
                    type: 'strong',
                    raw: t[0],
                    text: t[4] || t[3] || t[2] || t[1],
                }
        }
        em(e) {
            const t = this.rules.inline.em.exec(e)
            if (t)
                return {
                    type: 'em',
                    raw: t[0],
                    text: t[6] || t[5] || t[4] || t[3] || t[2] || t[1],
                }
        }
        codespan(e) {
            const t = this.rules.inline.code.exec(e)
            if (t)
                return {
                    type: 'codespan',
                    raw: t[0],
                    text: Tt(t[2].trim(), !0),
                }
        }
        br(e) {
            const t = this.rules.inline.br.exec(e)
            if (t) return { type: 'br', raw: t[0] }
        }
        del(e) {
            const t = this.rules.inline.del.exec(e)
            if (t) return { type: 'del', raw: t[0], text: t[1] }
        }
        autolink(e, t) {
            const n = this.rules.inline.autolink.exec(e)
            if (n) {
                let e, r
                return (
                    (r =
                        '@' === n[2]
                            ? 'mailto:' +
                              (e = Tt(this.options.mangle ? t(n[1]) : n[1]))
                            : (e = Tt(n[1]))),
                    {
                        type: 'link',
                        raw: n[0],
                        text: e,
                        href: r,
                        tokens: [{ type: 'text', raw: e, text: e }],
                    }
                )
            }
        }
        url(e, t) {
            let n
            if ((n = this.rules.inline.url.exec(e))) {
                let e, r
                if ('@' === n[2])
                    r =
                        'mailto:' +
                        (e = Tt(this.options.mangle ? t(n[0]) : n[0]))
                else {
                    let t
                    do {
                        ;(t = n[0]),
                            (n[0] = this.rules.inline._backpedal.exec(n[0])[0])
                    } while (t !== n[0])
                    ;(e = Tt(n[0])), (r = 'www.' === n[1] ? 'http://' + e : e)
                }
                return {
                    type: 'link',
                    raw: n[0],
                    text: e,
                    href: r,
                    tokens: [{ type: 'text', raw: e, text: e }],
                }
            }
        }
        inlineText(e, t, n) {
            const r = this.rules.inline.text.exec(e)
            if (r) {
                let e
                return (
                    (e = t
                        ? this.options.sanitize
                            ? this.options.sanitizer
                                ? this.options.sanitizer(r[0])
                                : Tt(r[0])
                            : r[0]
                        : Tt(this.options.smartypants ? n(r[0]) : r[0])),
                    { type: 'text', raw: r[0], text: e }
                )
            }
        }
    }
    const { noopTest: Ut, edit: Bt, merge: Lt } = jt,
        Nt = {
            newline: /^\n+/,
            code: /^( {4}[^\n]+\n*)+/,
            fences: /^ {0,3}(`{3,}(?=[^`\n]*\n)|~{3,})([^\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?:\n+|$)|$)/,
            hr: /^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/,
            heading: /^ {0,3}(#{1,6}) +([^\n]*?)(?: +#+)? *(?:\n+|$)/,
            blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
            list: /^( {0,3})(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
            html:
                '^ {0,3}(?:<(script|pre|style)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?\\?>\\n*|<![A-Z][\\s\\S]*?>\\n*|<!\\[CDATA\\[[\\s\\S]*?\\]\\]>\\n*|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:\\n{2,}|$)|<(?!script|pre|style)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$)|</(?!script|pre|style)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$))',
            def: /^ {0,3}\[(label)\]: *\n? *<?([^\s>]+)>?(?:(?: +\n? *| *\n *)(title))? *(?:\n+|$)/,
            nptable: Ut,
            table: Ut,
            lheading: /^([^\n]+)\n {0,3}(=+|-+) *(?:\n+|$)/,
            _paragraph: /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html)[^\n]+)*)/,
            text: /^[^\n]+/,
            _label: /(?!\s*\])(?:\\[\[\]]|[^\[\]])+/,
            _title: /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/,
        }
    ;(Nt.def = Bt(Nt.def)
        .replace('label', Nt._label)
        .replace('title', Nt._title)
        .getRegex()),
        (Nt.bullet = /(?:[*+-]|\d{1,9}\.)/),
        (Nt.item = /^( *)(bull) ?[^\n]*(?:\n(?!\1bull ?)[^\n]*)*/),
        (Nt.item = Bt(Nt.item, 'gm').replace(/bull/g, Nt.bullet).getRegex()),
        (Nt.list = Bt(Nt.list)
            .replace(/bull/g, Nt.bullet)
            .replace(
                'hr',
                '\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))'
            )
            .replace('def', '\\n+(?=' + Nt.def.source + ')')
            .getRegex()),
        (Nt._tag =
            'address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul'),
        (Nt._comment = /<!--(?!-?>)[\s\S]*?-->/),
        (Nt.html = Bt(Nt.html, 'i')
            .replace('comment', Nt._comment)
            .replace('tag', Nt._tag)
            .replace(
                'attribute',
                / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/
            )
            .getRegex()),
        (Nt.paragraph = Bt(Nt._paragraph)
            .replace('hr', Nt.hr)
            .replace('heading', ' {0,3}#{1,6} ')
            .replace('|lheading', '')
            .replace('blockquote', ' {0,3}>')
            .replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n')
            .replace('list', ' {0,3}(?:[*+-]|1[.)]) ')
            .replace(
                'html',
                '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)'
            )
            .replace('tag', Nt._tag)
            .getRegex()),
        (Nt.blockquote = Bt(Nt.blockquote)
            .replace('paragraph', Nt.paragraph)
            .getRegex()),
        (Nt.normal = Lt({}, Nt)),
        (Nt.gfm = Lt({}, Nt.normal, {
            nptable:
                '^ *([^|\\n ].*\\|.*)\\n *([-:]+ *\\|[-| :]*)(?:\\n((?:(?!\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)',
            table:
                '^ *\\|(.+)\\n *\\|?( *[-:]+[-| :]*)(?:\\n *((?:(?!\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)',
        })),
        (Nt.gfm.nptable = Bt(Nt.gfm.nptable)
            .replace('hr', Nt.hr)
            .replace('heading', ' {0,3}#{1,6} ')
            .replace('blockquote', ' {0,3}>')
            .replace('code', ' {4}[^\\n]')
            .replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n')
            .replace('list', ' {0,3}(?:[*+-]|1[.)]) ')
            .replace(
                'html',
                '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)'
            )
            .replace('tag', Nt._tag)
            .getRegex()),
        (Nt.gfm.table = Bt(Nt.gfm.table)
            .replace('hr', Nt.hr)
            .replace('heading', ' {0,3}#{1,6} ')
            .replace('blockquote', ' {0,3}>')
            .replace('code', ' {4}[^\\n]')
            .replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n')
            .replace('list', ' {0,3}(?:[*+-]|1[.)]) ')
            .replace(
                'html',
                '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)'
            )
            .replace('tag', Nt._tag)
            .getRegex()),
        (Nt.pedantic = Lt({}, Nt.normal, {
            html: Bt(
                '^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|\'[^\']*\'|\\s[^\'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))'
            )
                .replace('comment', Nt._comment)
                .replace(
                    /tag/g,
                    '(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b'
                )
                .getRegex(),
            def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
            heading: /^ *(#{1,6}) *([^\n]+?) *(?:#+ *)?(?:\n+|$)/,
            fences: Ut,
            paragraph: Bt(Nt.normal._paragraph)
                .replace('hr', Nt.hr)
                .replace('heading', ' *#{1,6} *[^\n]')
                .replace('lheading', Nt.lheading)
                .replace('blockquote', ' {0,3}>')
                .replace('|fences', '')
                .replace('|list', '')
                .replace('|html', '')
                .getRegex(),
        }))
    const Dt = {
        escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
        autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
        url: Ut,
        tag:
            '^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>',
        link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,
        reflink: /^!?\[(label)\]\[(?!\s*\])((?:\\[\[\]]?|[^\[\]\\])+)\]/,
        nolink: /^!?\[(?!\s*\])((?:\[[^\[\]]*\]|\\[\[\]]|[^\[\]])*)\](?:\[\])?/,
        strong: /^__([^\s_])__(?!_)|^\*\*([^\s*])\*\*(?!\*)|^__([^\s][\s\S]*?[^\s])__(?!_)|^\*\*([^\s][\s\S]*?[^\s])\*\*(?!\*)/,
        em: /^_([^\s_])_(?!_)|^_([^\s_<][\s\S]*?[^\s_])_(?!_|[^\spunctuation])|^_([^\s_<][\s\S]*?[^\s])_(?!_|[^\spunctuation])|^\*([^\s*<\[])\*(?!\*)|^\*([^\s<"][\s\S]*?[^\s\[\*])\*(?![\]`punctuation])|^\*([^\s*"<\[][\s\S]*[^\s])\*(?!\*)/,
        code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
        br: /^( {2,}|\\)\n(?!\s*$)/,
        del: Ut,
        text: /^(`+|[^`])(?:[\s\S]*?(?:(?=[\\<!\[`*]|\b_|$)|[^ ](?= {2,}\n))|(?= {2,}\n))/,
        _punctuation: '!"#$%&\'()*+\\-./:;<=>?@\\[^_{|}~',
    }
    ;(Dt.em = Bt(Dt.em)
        .replace(/punctuation/g, Dt._punctuation)
        .getRegex()),
        (Dt._escapes = /\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g),
        (Dt._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/),
        (Dt._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/),
        (Dt.autolink = Bt(Dt.autolink)
            .replace('scheme', Dt._scheme)
            .replace('email', Dt._email)
            .getRegex()),
        (Dt._attribute = /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/),
        (Dt.tag = Bt(Dt.tag)
            .replace('comment', Nt._comment)
            .replace('attribute', Dt._attribute)
            .getRegex()),
        (Dt._label = /(?:\[[^\[\]]*\]|\\.|`[^`]*`|[^\[\]\\`])*?/),
        (Dt._href = /<(?:\\[<>]?|[^\s<>\\])*>|[^\s\x00-\x1f]*/),
        (Dt._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/),
        (Dt.link = Bt(Dt.link)
            .replace('label', Dt._label)
            .replace('href', Dt._href)
            .replace('title', Dt._title)
            .getRegex()),
        (Dt.reflink = Bt(Dt.reflink).replace('label', Dt._label).getRegex()),
        (Dt.normal = Lt({}, Dt)),
        (Dt.pedantic = Lt({}, Dt.normal, {
            strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
            em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/,
            link: Bt(/^!?\[(label)\]\((.*?)\)/)
                .replace('label', Dt._label)
                .getRegex(),
            reflink: Bt(/^!?\[(label)\]\s*\[([^\]]*)\]/)
                .replace('label', Dt._label)
                .getRegex(),
        })),
        (Dt.gfm = Lt({}, Dt.normal, {
            escape: Bt(Dt.escape).replace('])', '~|])').getRegex(),
            _extended_email: /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
            url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
            _backpedal: /(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,
            del: /^~+(?=\S)([\s\S]*?\S)~+/,
            text: /^(`+|[^`])(?:[\s\S]*?(?:(?=[\\<!\[`*~]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))|(?= {2,}\n|[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))/,
        })),
        (Dt.gfm.url = Bt(Dt.gfm.url, 'i')
            .replace('email', Dt.gfm._extended_email)
            .getRegex()),
        (Dt.breaks = Lt({}, Dt.gfm, {
            br: Bt(Dt.br).replace('{2,}', '*').getRegex(),
            text: Bt(Dt.gfm.text)
                .replace('\\b_', '\\b_| {2,}\\n')
                .replace(/\{2,\}/g, '*')
                .getRegex(),
        }))
    var Qt = { block: Nt, inline: Dt }
    const { defaults: qt } = dt,
        { block: Vt, inline: Wt } = Qt
    function Ht(e) {
        return e
            .replace(/---/g, '—')
            .replace(/--/g, '–')
            .replace(/(^|[-\u2014/(\[{"\s])'/g, '$1‘')
            .replace(/'/g, '’')
            .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, '$1“')
            .replace(/"/g, '”')
            .replace(/\.{3}/g, '…')
    }
    function Zt(e) {
        let t,
            n,
            r = ''
        const i = e.length
        for (t = 0; t < i; t++)
            (n = e.charCodeAt(t)),
                Math.random() > 0.5 && (n = 'x' + n.toString(16)),
                (r += '&#' + n + ';')
        return r
    }
    var Kt = class e {
        constructor(e) {
            ;(this.tokens = []),
                (this.tokens.links = Object.create(null)),
                (this.options = e || qt),
                (this.options.tokenizer = this.options.tokenizer || new Ft()),
                (this.tokenizer = this.options.tokenizer),
                (this.tokenizer.options = this.options)
            const t = { block: Vt.normal, inline: Wt.normal }
            this.options.pedantic
                ? ((t.block = Vt.pedantic), (t.inline = Wt.pedantic))
                : this.options.gfm &&
                  ((t.block = Vt.gfm),
                  (t.inline = this.options.breaks ? Wt.breaks : Wt.gfm)),
                (this.tokenizer.rules = t)
        }
        static get rules() {
            return { block: Vt, inline: Wt }
        }
        static lex(t, n) {
            return new e(n).lex(t)
        }
        lex(e) {
            return (
                (e = e.replace(/\r\n|\r/g, '\n').replace(/\t/g, '    ')),
                this.blockTokens(e, this.tokens, !0),
                this.inline(this.tokens),
                this.tokens
            )
        }
        blockTokens(e, t = [], n = !0) {
            let r, i, o
            for (e = e.replace(/^ +$/gm, ''); e; )
                if ((r = this.tokenizer.space(e)))
                    (e = e.substring(r.raw.length)), r.type && t.push(r)
                else if ((r = this.tokenizer.code(e, t)))
                    (e = e.substring(r.raw.length)), t.push(r)
                else if ((r = this.tokenizer.fences(e)))
                    (e = e.substring(r.raw.length)), t.push(r)
                else if ((r = this.tokenizer.heading(e)))
                    (e = e.substring(r.raw.length)), t.push(r)
                else if ((r = this.tokenizer.nptable(e)))
                    (e = e.substring(r.raw.length)), t.push(r)
                else if ((r = this.tokenizer.hr(e)))
                    (e = e.substring(r.raw.length)), t.push(r)
                else if ((r = this.tokenizer.blockquote(e)))
                    (e = e.substring(r.raw.length)),
                        (r.tokens = this.blockTokens(r.text, [], n)),
                        t.push(r)
                else if ((r = this.tokenizer.list(e))) {
                    for (
                        e = e.substring(r.raw.length),
                            o = r.items.length,
                            i = 0;
                        i < o;
                        i++
                    )
                        r.items[i].tokens = this.blockTokens(
                            r.items[i].text,
                            [],
                            !1
                        )
                    t.push(r)
                } else if ((r = this.tokenizer.html(e)))
                    (e = e.substring(r.raw.length)), t.push(r)
                else if (n && (r = this.tokenizer.def(e)))
                    (e = e.substring(r.raw.length)),
                        this.tokens.links[r.tag] ||
                            (this.tokens.links[r.tag] = {
                                href: r.href,
                                title: r.title,
                            })
                else if ((r = this.tokenizer.table(e)))
                    (e = e.substring(r.raw.length)), t.push(r)
                else if ((r = this.tokenizer.lheading(e)))
                    (e = e.substring(r.raw.length)), t.push(r)
                else if (n && (r = this.tokenizer.paragraph(e)))
                    (e = e.substring(r.raw.length)), t.push(r)
                else if ((r = this.tokenizer.text(e)))
                    (e = e.substring(r.raw.length)), t.push(r)
                else if (e) {
                    const t = 'Infinite loop on byte: ' + e.charCodeAt(0)
                    if (this.options.silent) {
                        console.error(t)
                        break
                    }
                    throw new Error(t)
                }
            return t
        }
        inline(e) {
            let t, n, r, i, o, a
            const s = e.length
            for (t = 0; t < s; t++)
                switch ((a = e[t]).type) {
                    case 'paragraph':
                    case 'text':
                    case 'heading':
                        ;(a.tokens = []), this.inlineTokens(a.text, a.tokens)
                        break
                    case 'table':
                        for (
                            a.tokens = { header: [], cells: [] },
                                i = a.header.length,
                                n = 0;
                            n < i;
                            n++
                        )
                            (a.tokens.header[n] = []),
                                this.inlineTokens(
                                    a.header[n],
                                    a.tokens.header[n]
                                )
                        for (i = a.cells.length, n = 0; n < i; n++)
                            for (
                                o = a.cells[n], a.tokens.cells[n] = [], r = 0;
                                r < o.length;
                                r++
                            )
                                (a.tokens.cells[n][r] = []),
                                    this.inlineTokens(
                                        o[r],
                                        a.tokens.cells[n][r]
                                    )
                        break
                    case 'blockquote':
                        this.inline(a.tokens)
                        break
                    case 'list':
                        for (i = a.items.length, n = 0; n < i; n++)
                            this.inline(a.items[n].tokens)
                }
            return e
        }
        inlineTokens(e, t = [], n = !1, r = !1) {
            let i
            for (; e; )
                if ((i = this.tokenizer.escape(e)))
                    (e = e.substring(i.raw.length)), t.push(i)
                else if ((i = this.tokenizer.tag(e, n, r)))
                    (e = e.substring(i.raw.length)),
                        (n = i.inLink),
                        (r = i.inRawBlock),
                        t.push(i)
                else if ((i = this.tokenizer.link(e)))
                    (e = e.substring(i.raw.length)),
                        'link' === i.type &&
                            (i.tokens = this.inlineTokens(i.text, [], !0, r)),
                        t.push(i)
                else if ((i = this.tokenizer.reflink(e, this.tokens.links)))
                    (e = e.substring(i.raw.length)),
                        'link' === i.type &&
                            (i.tokens = this.inlineTokens(i.text, [], !0, r)),
                        t.push(i)
                else if ((i = this.tokenizer.strong(e)))
                    (e = e.substring(i.raw.length)),
                        (i.tokens = this.inlineTokens(i.text, [], n, r)),
                        t.push(i)
                else if ((i = this.tokenizer.em(e)))
                    (e = e.substring(i.raw.length)),
                        (i.tokens = this.inlineTokens(i.text, [], n, r)),
                        t.push(i)
                else if ((i = this.tokenizer.codespan(e)))
                    (e = e.substring(i.raw.length)), t.push(i)
                else if ((i = this.tokenizer.br(e)))
                    (e = e.substring(i.raw.length)), t.push(i)
                else if ((i = this.tokenizer.del(e)))
                    (e = e.substring(i.raw.length)),
                        (i.tokens = this.inlineTokens(i.text, [], n, r)),
                        t.push(i)
                else if ((i = this.tokenizer.autolink(e, Zt)))
                    (e = e.substring(i.raw.length)), t.push(i)
                else if (n || !(i = this.tokenizer.url(e, Zt))) {
                    if ((i = this.tokenizer.inlineText(e, r, Ht)))
                        (e = e.substring(i.raw.length)), t.push(i)
                    else if (e) {
                        const t = 'Infinite loop on byte: ' + e.charCodeAt(0)
                        if (this.options.silent) {
                            console.error(t)
                            break
                        }
                        throw new Error(t)
                    }
                } else (e = e.substring(i.raw.length)), t.push(i)
            return t
        }
    }
    const { defaults: Jt } = dt,
        { cleanUrl: Xt, escape: Gt } = jt
    var Yt = class {
            constructor(e) {
                this.options = e || Jt
            }
            code(e, t, n) {
                const r = (t || '').match(/\S*/)[0]
                if (this.options.highlight) {
                    const t = this.options.highlight(e, r)
                    null != t && t !== e && ((n = !0), (e = t))
                }
                return r
                    ? '<pre><code class="' +
                          this.options.langPrefix +
                          Gt(r, !0) +
                          '">' +
                          (n ? e : Gt(e, !0)) +
                          '</code></pre>\n'
                    : '<pre><code>' + (n ? e : Gt(e, !0)) + '</code></pre>'
            }
            blockquote(e) {
                return '<blockquote>\n' + e + '</blockquote>\n'
            }
            html(e) {
                return e
            }
            heading(e, t, n, r) {
                return this.options.headerIds
                    ? '<h' +
                          t +
                          ' id="' +
                          this.options.headerPrefix +
                          r.slug(n) +
                          '">' +
                          e +
                          '</h' +
                          t +
                          '>\n'
                    : '<h' + t + '>' + e + '</h' + t + '>\n'
            }
            hr() {
                return this.options.xhtml ? '<hr/>\n' : '<hr>\n'
            }
            list(e, t, n) {
                const r = t ? 'ol' : 'ul'
                return (
                    '<' +
                    r +
                    (t && 1 !== n ? ' start="' + n + '"' : '') +
                    '>\n' +
                    e +
                    '</' +
                    r +
                    '>\n'
                )
            }
            listitem(e) {
                return '<li>' + e + '</li>\n'
            }
            checkbox(e) {
                return (
                    '<input ' +
                    (e ? 'checked="" ' : '') +
                    'disabled="" type="checkbox"' +
                    (this.options.xhtml ? ' /' : '') +
                    '> '
                )
            }
            paragraph(e) {
                return '<p>' + e + '</p>\n'
            }
            table(e, t) {
                return (
                    t && (t = '<tbody>' + t + '</tbody>'),
                    '<table>\n<thead>\n' + e + '</thead>\n' + t + '</table>\n'
                )
            }
            tablerow(e) {
                return '<tr>\n' + e + '</tr>\n'
            }
            tablecell(e, t) {
                const n = t.header ? 'th' : 'td'
                return (
                    (t.align
                        ? '<' + n + ' align="' + t.align + '">'
                        : '<' + n + '>') +
                    e +
                    '</' +
                    n +
                    '>\n'
                )
            }
            strong(e) {
                return '<strong>' + e + '</strong>'
            }
            em(e) {
                return '<em>' + e + '</em>'
            }
            codespan(e) {
                return '<code>' + e + '</code>'
            }
            br() {
                return this.options.xhtml ? '<br/>' : '<br>'
            }
            del(e) {
                return '<del>' + e + '</del>'
            }
            link(e, t, n) {
                if (
                    null ===
                    (e = Xt(this.options.sanitize, this.options.baseUrl, e))
                )
                    return n
                let r = '<a href="' + Gt(e) + '"'
                return t && (r += ' title="' + t + '"'), r + '>' + n + '</a>'
            }
            image(e, t, n) {
                if (
                    null ===
                    (e = Xt(this.options.sanitize, this.options.baseUrl, e))
                )
                    return n
                let r = '<img src="' + e + '" alt="' + n + '"'
                return (
                    t && (r += ' title="' + t + '"'),
                    r + (this.options.xhtml ? '/>' : '>')
                )
            }
            text(e) {
                return e
            }
        },
        en = class {
            strong(e) {
                return e
            }
            em(e) {
                return e
            }
            codespan(e) {
                return e
            }
            del(e) {
                return e
            }
            html(e) {
                return e
            }
            text(e) {
                return e
            }
            link(e, t, n) {
                return '' + n
            }
            image(e, t, n) {
                return '' + n
            }
            br() {
                return ''
            }
        },
        tn = class {
            constructor() {
                this.seen = {}
            }
            slug(e) {
                let t = e
                    .toLowerCase()
                    .trim()
                    .replace(/<[!\/a-z].*?>/gi, '')
                    .replace(
                        /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g,
                        ''
                    )
                    .replace(/\s/g, '-')
                if (this.seen.hasOwnProperty(t)) {
                    const e = t
                    do {
                        this.seen[e]++, (t = e + '-' + this.seen[e])
                    } while (this.seen.hasOwnProperty(t))
                }
                return (this.seen[t] = 0), t
            }
        }
    const { defaults: nn } = dt,
        { unescape: rn } = jt
    var on = class e {
        constructor(e) {
            ;(this.options = e || nn),
                (this.options.renderer = this.options.renderer || new Yt()),
                (this.renderer = this.options.renderer),
                (this.renderer.options = this.options),
                (this.textRenderer = new en()),
                (this.slugger = new tn())
        }
        static parse(t, n) {
            return new e(n).parse(t)
        }
        parse(e, t = !0) {
            let n,
                r,
                i,
                o,
                a,
                s,
                l,
                c,
                p,
                u,
                d,
                f,
                h,
                g,
                y,
                v,
                m,
                b,
                w = ''
            const x = e.length
            for (n = 0; n < x; n++)
                switch ((u = e[n]).type) {
                    case 'space':
                        continue
                    case 'hr':
                        w += this.renderer.hr()
                        continue
                    case 'heading':
                        w += this.renderer.heading(
                            this.parseInline(u.tokens),
                            u.depth,
                            rn(this.parseInline(u.tokens, this.textRenderer)),
                            this.slugger
                        )
                        continue
                    case 'code':
                        w += this.renderer.code(u.text, u.lang, u.escaped)
                        continue
                    case 'table':
                        for (
                            c = '', l = '', o = u.header.length, r = 0;
                            r < o;
                            r++
                        )
                            l += this.renderer.tablecell(
                                this.parseInline(u.tokens.header[r]),
                                { header: !0, align: u.align[r] }
                            )
                        for (
                            c += this.renderer.tablerow(l),
                                p = '',
                                o = u.cells.length,
                                r = 0;
                            r < o;
                            r++
                        ) {
                            for (
                                l = '',
                                    a = (s = u.tokens.cells[r]).length,
                                    i = 0;
                                i < a;
                                i++
                            )
                                l += this.renderer.tablecell(
                                    this.parseInline(s[i]),
                                    { header: !1, align: u.align[i] }
                                )
                            p += this.renderer.tablerow(l)
                        }
                        w += this.renderer.table(c, p)
                        continue
                    case 'blockquote':
                        ;(p = this.parse(u.tokens)),
                            (w += this.renderer.blockquote(p))
                        continue
                    case 'list':
                        for (
                            d = u.ordered,
                                f = u.start,
                                h = u.loose,
                                o = u.items.length,
                                p = '',
                                r = 0;
                            r < o;
                            r++
                        )
                            (v = (y = u.items[r]).checked),
                                (m = y.task),
                                (g = ''),
                                y.task &&
                                    ((b = this.renderer.checkbox(v)),
                                    h
                                        ? 'text' === y.tokens[0].type
                                            ? ((y.tokens[0].text =
                                                  b + ' ' + y.tokens[0].text),
                                              y.tokens[0].tokens &&
                                                  y.tokens[0].tokens.length >
                                                      0 &&
                                                  'text' ===
                                                      y.tokens[0].tokens[0]
                                                          .type &&
                                                  (y.tokens[0].tokens[0].text =
                                                      b +
                                                      ' ' +
                                                      y.tokens[0].tokens[0]
                                                          .text))
                                            : y.tokens.unshift({
                                                  type: 'text',
                                                  text: b,
                                              })
                                        : (g += b)),
                                (g += this.parse(y.tokens, h)),
                                (p += this.renderer.listitem(g, m, v))
                        w += this.renderer.list(p, d, f)
                        continue
                    case 'html':
                        w += this.renderer.html(u.text)
                        continue
                    case 'paragraph':
                        w += this.renderer.paragraph(this.parseInline(u.tokens))
                        continue
                    case 'text':
                        for (
                            p = u.tokens ? this.parseInline(u.tokens) : u.text;
                            n + 1 < x && 'text' === e[n + 1].type;

                        )
                            p +=
                                '\n' +
                                ((u = e[++n]).tokens
                                    ? this.parseInline(u.tokens)
                                    : u.text)
                        w += t ? this.renderer.paragraph(p) : p
                        continue
                    default: {
                        const e =
                            'Token with "' + u.type + '" type was not found.'
                        if (this.options.silent) return void console.error(e)
                        throw new Error(e)
                    }
                }
            return w
        }
        parseInline(e, t) {
            t = t || this.renderer
            let n,
                r,
                i = ''
            const o = e.length
            for (n = 0; n < o; n++)
                switch ((r = e[n]).type) {
                    case 'escape':
                        i += t.text(r.text)
                        break
                    case 'html':
                        i += t.html(r.text)
                        break
                    case 'link':
                        i += t.link(
                            r.href,
                            r.title,
                            this.parseInline(r.tokens, t)
                        )
                        break
                    case 'image':
                        i += t.image(r.href, r.title, r.text)
                        break
                    case 'strong':
                        i += t.strong(this.parseInline(r.tokens, t))
                        break
                    case 'em':
                        i += t.em(this.parseInline(r.tokens, t))
                        break
                    case 'codespan':
                        i += t.codespan(r.text)
                        break
                    case 'br':
                        i += t.br()
                        break
                    case 'del':
                        i += t.del(this.parseInline(r.tokens, t))
                        break
                    case 'text':
                        i += t.text(r.text)
                        break
                    default: {
                        const e =
                            'Token with "' + r.type + '" type was not found.'
                        if (this.options.silent) return void console.error(e)
                        throw new Error(e)
                    }
                }
            return i
        }
    }
    const { merge: an, checkSanitizeDeprecation: sn, escape: ln } = jt,
        { getDefaults: cn, changeDefaults: pn, defaults: un } = dt
    function dn(e, t, n) {
        if (null == e)
            throw new Error('marked(): input parameter is undefined or null')
        if ('string' != typeof e)
            throw new Error(
                'marked(): input parameter is of type ' +
                    Object.prototype.toString.call(e) +
                    ', string expected'
            )
        if (n || 'function' == typeof t) {
            n || ((n = t), (t = null)),
                (t = an({}, dn.defaults, t || {})),
                sn(t)
            const r = t.highlight
            let i,
                o,
                a = 0
            try {
                i = Kt.lex(e, t)
            } catch (e) {
                return n(e)
            }
            o = i.length
            const s = function (e) {
                if (e) return (t.highlight = r), n(e)
                let o
                try {
                    o = on.parse(i, t)
                } catch (t) {
                    e = t
                }
                return (t.highlight = r), e ? n(e) : n(null, o)
            }
            if (!r || r.length < 3) return s()
            if ((delete t.highlight, !o)) return s()
            for (; a < i.length; a++)
                !(function (e) {
                    'code' !== e.type
                        ? --o || s()
                        : r(e.text, e.lang, function (t, n) {
                              return t
                                  ? s(t)
                                  : null == n || n === e.text
                                  ? --o || s()
                                  : ((e.text = n),
                                    (e.escaped = !0),
                                    void (--o || s()))
                          })
                })(i[a])
        } else
            try {
                return (
                    (t = an({}, dn.defaults, t || {})),
                    sn(t),
                    on.parse(Kt.lex(e, t), t)
                )
            } catch (e) {
                if (
                    ((e.message +=
                        '\nPlease report this to https://github.com/markedjs/marked.'),
                    (t || dn.defaults).silent)
                )
                    return (
                        '<p>An error occurred:</p><pre>' +
                        ln(e.message + '', !0) +
                        '</pre>'
                    )
                throw e
            }
    }
    ;(dn.options = dn.setOptions = function (e) {
        return an(dn.defaults, e), pn(dn.defaults), dn
    }),
        (dn.getDefaults = cn),
        (dn.defaults = un),
        (dn.use = function (e) {
            const t = an({}, e)
            if (e.renderer) {
                const n = dn.defaults.renderer || new Yt()
                for (const t in e.renderer) {
                    const r = n[t]
                    n[t] = (...i) => {
                        let o = e.renderer[t].apply(n, i)
                        return !1 === o && (o = r.apply(n, i)), o
                    }
                }
                t.renderer = n
            }
            if (e.tokenizer) {
                const n = dn.defaults.tokenizer || new Ft()
                for (const t in e.tokenizer) {
                    const r = n[t]
                    n[t] = (...i) => {
                        let o = e.tokenizer[t].apply(n, i)
                        return !1 === o && (o = r.apply(n, i)), o
                    }
                }
                t.tokenizer = n
            }
            dn.setOptions(t)
        }),
        (dn.Parser = on),
        (dn.parser = on.parse),
        (dn.Renderer = Yt),
        (dn.TextRenderer = en),
        (dn.Lexer = Kt),
        (dn.lexer = Kt.lex),
        (dn.Tokenizer = Ft),
        (dn.Slugger = tn),
        (dn.parse = dn)
    var fn = dn,
        hn = r(function (e, t) {
            e.exports = (function () {
                var e,
                    t =
                        ((function (e) {
                            var t = (e.exports = function () {
                                return new RegExp(
                                    '(?:' +
                                        t.line().source +
                                        ')|(?:' +
                                        t.block().source +
                                        ')',
                                    'gm'
                                )
                            })
                            ;(t.line = function () {
                                return /(?:^|\s)\/\/(.+?)$/gm
                            }),
                                (t.block = function () {
                                    return /\/\*([\S\s]*?)\*\//gm
                                })
                        })((e = { exports: {} })),
                        e.exports),
                    n = [
                        '23AC69',
                        '91C132',
                        'F19726',
                        'E8552D',
                        '1AAB8E',
                        'E1147F',
                        '2980C1',
                        '1BA1E6',
                        '9FA0A0',
                        'F19726',
                        'E30B20',
                        'E30B20',
                        'A3338B',
                    ]
                return function (e, r) {
                    void 0 === r && (r = {})
                    var i = r.colors
                    void 0 === i && (i = n)
                    var o = 0,
                        a = {},
                        s = new RegExp(
                            '(' +
                                /[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af\u0400-\u04FF]+|\w+/
                                    .source +
                                '|' +
                                /</.source +
                                ')|(' +
                                t().source +
                                ')',
                            'gmi'
                        )
                    return e.replace(s, function (e, t, n) {
                        return n
                            ? (function (e) {
                                  return (
                                      '<span style="color: slategray">' +
                                      e +
                                      '</span>'
                                  )
                              })(n)
                            : '<' === t
                            ? '&lt;'
                            : (a[t] ? (r = a[t]) : (a[t] = r = i[o]),
                              (o = ++o % i.length),
                              '<span style="color: #' +
                                  r +
                                  '">' +
                                  t +
                                  '</span>')
                        var r
                    })
                }
            })()
        }),
        gn = new fn.Renderer()
    ;(gn.code = function (t, n) {
        return (
            '<pre><code class="hljs language-' +
            n +
            '">' +
            (n && hljs.getLanguage(n)
                ? hljs.highlight(n, t).value
                : e.escape(t)) +
            '</code></pre>'
        )
    }),
        fn.setOptions({
            renderer: 'hljs' in window ? gn : new fn.Renderer(),
            highlight: function (e, t) {
                return 'hljs' in window
                    ? (t &&
                          hljs.getLanguage(t) &&
                          hljs.highlight(t, e, !0).value) ||
                          hljs.highlightAuto(e).value
                    : hn(e)
            },
            gfm: !0,
            tables: !0,
            breaks: !0,
            pedantic: !1,
            sanitize: !0,
            smartLists: !0,
            smartypants: !0,
            headerPrefi: 'v-',
        })
    var yn = function (e, n, r, i) {
            if (/code|pre|span/i.test(e)) {
                if ('style' == n) {
                    var o = r.match(
                        /color:([#a-z0-9]{3,7}|\s+[#a-z0-9]{3,8})/gi
                    )
                    return o && o.length ? 'style="' + o[0] + '"' : ''
                }
                if ('class' == n) return n + "='" + t.escapeAttrValue(r) + "'"
            }
            return 'a' === e && 'class' == n && 'at' === r
                ? n + "='" + t.escapeAttrValue(r) + "'"
                : 'img' === e && /src|class/i.test(n)
                ? n +
                  "='" +
                  t.escapeAttrValue(r) +
                  "' referrerPolicy='no-referrer'"
                : void 0
        },
        vn = {
            comment: '',
            nick: '',
            mail: '',
            link: '',
            ua: e.ua,
            url: '',
            QQAvatar: '',
        },
        mn = '',
        bn = {
            cdn: 'https://gravatar.loli.net/avatar/',
            ds: [
                'mp',
                'identicon',
                'monsterid',
                'wavatar',
                'robohash',
                'retro',
                '',
            ],
            params: '',
            hide: !1,
        }
    function wn(e) {
        return e && this.init(e), this
    }
    ;(wn.prototype.init = function (t) {
        if ('undefined' == typeof document)
            throw new Error(
                'Sorry, Valine does not support Server-side rendering.'
            )
        var n, r
        return (
            t &&
                ((t = e.extend(Me, t)),
                (this.i18n =
                    ((r = t.langMode),
                    !Re[(n = t.lang || e.lang)] && n && r && (Re[n] = r),
                    new ze({ phrases: Re[n || 'zh'], locale: n }))),
                (this.cfg = t),
                (Be.maps = (!!t.emojiMaps && t.emojiMaps) || Be.maps),
                (Be.cdn = (!!t.emojiCDN && t.emojiCDN) || Be.cdn),
                this._init()),
            this
        )
    }),
        (wn.prototype._init = function () {
            var t,
                n,
                r = this
            try {
                var i = r.cfg,
                    o = i.avatar,
                    a = i.avatarForce,
                    s = i.avatar_cdn,
                    l = i.visitor,
                    c = i.path
                void 0 === c && (c = location.pathname)
                var p = i.pageSize,
                    u = i.recordIP
                r.config.path = c.replace(/index\.html?$/, '')
                var d = a ? '&q=' + Ue : ''
                ;(bn.params =
                    '?d=' +
                    (bn.ds.indexOf(o) > -1 ? o : 'mp') +
                    '&v=1.4.15' +
                    d),
                    (bn.hide = 'hide' === o),
                    (bn.cdn = /^https?\:\/\//.test(s) ? s : bn.cdn),
                    (r.cfg.pageSize = isNaN(p) ? 10 : p < 1 ? 10 : p),
                    u &&
                        ((t = function (e) {
                            return (vn.ip = e)
                        }),
                        (n = 'JSONcallback_' + Ue()),
                        e.sdkLoader('//api.ip.sb/jsonip?callback=' + n, n),
                        (window[n] = function (n) {
                            t && t(n.ip), e.deleteInWin(t)
                        }))
                var f = r.cfg.el || null,
                    h = e(f)
                if (
                    (f = f instanceof HTMLElement ? f : h[h.length - 1] || null)
                ) {
                    ;(r.$el = e(f)),
                        r.$el.addClass('v').attr('data-class', 'v'),
                        bn.hide && r.$el.addClass('hide-avatar'),
                        (r.cfg.meta = (
                            r.cfg.guest_info ||
                            r.cfg.meta ||
                            Fe
                        ).filter(function (e) {
                            return Fe.indexOf(e) > -1
                        })),
                        (r.cfg.requiredFields = r.cfg.requiredFields.filter(
                            function (e) {
                                return Fe.indexOf(e) > -1
                            }
                        ))
                    var g = (0 == r.cfg.meta.length ? Fe : r.cfg.meta).map(
                            function (e) {
                                var t = 'mail' == e ? 'email' : 'text'
                                return Fe.indexOf(e) > -1
                                    ? '<input name="' +
                                          e +
                                          '" placeholder="' +
                                          r.i18n.t(e) +
                                          '" class="v' +
                                          e +
                                          ' vinput" type="' +
                                          t +
                                          '">'
                                    : ''
                            }
                        ),
                        y =
                            '<div class="vpanel"><div class="vwrap"><p class="cancel-reply text-right" style="display:none;" title="' +
                            r.i18n.t('cancelReply') +
                            '"><svg class="vicon cancel-reply-btn" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4220" width="22" height="22"><path d="M796.454 985H227.545c-50.183 0-97.481-19.662-133.183-55.363-35.7-35.701-55.362-83-55.362-133.183V227.545c0-50.183 19.662-97.481 55.363-133.183 35.701-35.7 83-55.362 133.182-55.362h568.909c50.183 0 97.481 19.662 133.183 55.363 35.701 35.702 55.363 83 55.363 133.183v568.909c0 50.183-19.662 97.481-55.363 133.183S846.637 985 796.454 985zM227.545 91C152.254 91 91 152.254 91 227.545v568.909C91 871.746 152.254 933 227.545 933h568.909C871.746 933 933 871.746 933 796.454V227.545C933 152.254 871.746 91 796.454 91H227.545z" p-id="4221"></path><path d="M568.569 512l170.267-170.267c15.556-15.556 15.556-41.012 0-56.569s-41.012-15.556-56.569 0L512 455.431 341.733 285.165c-15.556-15.556-41.012-15.556-56.569 0s-15.556 41.012 0 56.569L455.431 512 285.165 682.267c-15.556 15.556-15.556 41.012 0 56.569 15.556 15.556 41.012 15.556 56.569 0L512 568.569l170.267 170.267c15.556 15.556 41.012 15.556 56.569 0 15.556-15.556 15.556-41.012 0-56.569L568.569 512z" p-id="4222" ></path></svg></p><div class="vheader item' +
                            g.length +
                            '">' +
                            g.join('') +
                            '</div><div class="vedit"><textarea id="veditor" class="veditor vinput" placeholder="' +
                            r.cfg.placeholder +
                            '"></textarea><div class="vrow"><div class="vcol vcol-60 status-bar"></div><div class="vcol vcol-40 vctrl text-right"><span title="' +
                            r.i18n.t('emoji') +
                            '"  class="vicon vemoji-btn"><svg  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="16172" width="22" height="22" ><path d="M512 1024a512 512 0 1 1 512-512 512 512 0 0 1-512 512zM512 56.888889a455.111111 455.111111 0 1 0 455.111111 455.111111 455.111111 455.111111 0 0 0-455.111111-455.111111zM312.888889 512A85.333333 85.333333 0 1 1 398.222222 426.666667 85.333333 85.333333 0 0 1 312.888889 512z" p-id="16173"></path><path d="M512 768A142.222222 142.222222 0 0 1 369.777778 625.777778a28.444444 28.444444 0 0 1 56.888889 0 85.333333 85.333333 0 0 0 170.666666 0 28.444444 28.444444 0 0 1 56.888889 0A142.222222 142.222222 0 0 1 512 768z" p-id="16174"></path><path d="M782.222222 391.964444l-113.777778 59.733334a29.013333 29.013333 0 0 1-38.684444-10.808889 28.444444 28.444444 0 0 1 10.24-38.684445l113.777778-56.888888a28.444444 28.444444 0 0 1 38.684444 10.24 28.444444 28.444444 0 0 1-10.24 36.408888z" p-id="16175"></path><path d="M640.568889 451.697778l113.777778 56.888889a27.875556 27.875556 0 0 0 38.684444-10.24 27.875556 27.875556 0 0 0-10.24-38.684445l-113.777778-56.888889a28.444444 28.444444 0 0 0-38.684444 10.808889 28.444444 28.444444 0 0 0 10.24 38.115556z" p-id="16176"></path></svg></span><span title="' +
                            r.i18n.t('preview') +
                            '" class="vicon vpreview-btn"><svg  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="17688" width="22" height="22"><path d="M502.390154 935.384615a29.538462 29.538462 0 1 1 0 59.076923H141.430154C79.911385 994.461538 29.538462 946.254769 29.538462 886.153846V137.846154C29.538462 77.745231 79.950769 29.538462 141.390769 29.538462h741.218462c61.44 0 111.852308 48.206769 111.852307 108.307692v300.268308a29.538462 29.538462 0 1 1-59.076923 0V137.846154c0-26.899692-23.355077-49.230769-52.775384-49.230769H141.390769c-29.420308 0-52.775385 22.331077-52.775384 49.230769v748.307692c0 26.899692 23.355077 49.230769 52.775384 49.230769h360.999385z" p-id="17689"></path><path d="M196.923077 216.615385m29.538461 0l374.153847 0q29.538462 0 29.538461 29.538461l0 0q0 29.538462-29.538461 29.538462l-374.153847 0q-29.538462 0-29.538461-29.538462l0 0q0-29.538462 29.538461-29.538461Z" p-id="17690"></path><path d="M649.846154 846.769231a216.615385 216.615385 0 1 0 0-433.230769 216.615385 216.615385 0 0 0 0 433.230769z m0 59.076923a275.692308 275.692308 0 1 1 0-551.384616 275.692308 275.692308 0 0 1 0 551.384616z" p-id="17691"></path><path d="M807.398383 829.479768m20.886847-20.886846l0 0q20.886846-20.886846 41.773692 0l125.321079 125.321079q20.886846 20.886846 0 41.773693l0 0q-20.886846 20.886846-41.773693 0l-125.321078-125.321079q-20.886846-20.886846 0-41.773693Z" p-id="17692"></path></svg></span></div></div></div><div class="vrow"><div class="vcol vcol-30" ><a alt="Markdown is supported" href="https://guides.github.com/features/mastering-markdown/" class="vicon" target="_blank"><svg class="markdown" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M14.85 3H1.15C.52 3 0 3.52 0 4.15v7.69C0 12.48.52 13 1.15 13h13.69c.64 0 1.15-.52 1.15-1.15v-7.7C16 3.52 15.48 3 14.85 3zM9 11H7V8L5.5 9.92 4 8v3H2V5h2l1.5 2L7 5h2v6zm2.99.5L9.5 8H11V5h2v3h1.5l-2.51 3.5z"></path></svg></a></div><div class="vcol vcol-70 text-right"><button type="button"  title="Cmd|Ctrl+Enter" class="vsubmit vbtn">' +
                            r.i18n.t('submit') +
                            '</button></div></div><div class="vemojis" style="display:none;"></div><div class="vinput vpreview" style="display:none;"></div></div></div><div class="vcount" style="display:none;"><span class="vnum">0</span> ' +
                            r.i18n.t('comments') +
                            '</div><div class="vload-top text-center" style="display:none;"><i class="vspinner" style="width:30px;height:30px;"></i></div><div class="vcards"></div><div class="vload-bottom text-center" style="display:none;"><i class="vspinner" style="width:30px;height:30px;"></i></div><div class="vempty" style="display:none;"></div><div class="vpage txt-center" style="display:none"><button type="button" class="vmore vbtn">' +
                            r.i18n.t('more') +
                            '</button></div><div class="vpower txt-right">Powered By <a href="https://valine.js.org" target="_blank">Valine</a><br>v1.4.15</div>'
                    r.$el.html(y),
                        r.$el.find('.cancel-reply').on('click', function (e) {
                            r.reset()
                        })
                    var v = r.$el.find('.vempty')
                    r.$nodata = {
                        show: function (e) {
                            return v.html(e || r.i18n.t('sofa')).show(), r
                        },
                        hide: function () {
                            return v.hide(), r
                        },
                    }
                    var m = r.$el.find('.vload-bottom'),
                        b = r.$el.find('.vload-top')
                    r.$loading = {
                        show: function (e) {
                            return (
                                (e && b.show()) || m.show(), r.$nodata.hide(), r
                            )
                        },
                        hide: function () {
                            return (
                                b.hide(),
                                m.hide(),
                                0 === r.$el.find('.vcard').length &&
                                    r.$nodata.show(),
                                r
                            )
                        },
                    }
                }
                !(function (t, n) {
                    if ('AV' in window) {
                        var r = window.AV.version || window.AV.VERSION
                        parseInt(r.split('.')[0]) > 2
                            ? (pt = !!AV.applicationId && !!AV.applicationKey)
                            : e.deleteInWin('AV', 0)
                    }
                    pt
                        ? n && n()
                        : e.sdkLoader(
                              '//cdn.jsdelivr.net/npm/leancloud-storage@3/dist/av-min.js',
                              'AV',
                              function (e) {
                                  var r = 'https://',
                                      i = t.app_id || t.appId,
                                      o = t.app_key || t.appKey
                                  if (!t.serverURLs)
                                      switch (i.slice(-9)) {
                                          case '-9Nh9j0Va':
                                              r += 'tab.'
                                              break
                                          case '-MdYXbMMI':
                                              r += 'us.'
                                      }
                                  AV.init({
                                      appId: i,
                                      appKey: o,
                                      serverURLs:
                                          t.serverURLs || r + 'avoscloud.com',
                                  }),
                                      (pt = !0),
                                      n && n()
                              }
                          )
                })(r.cfg, function (t) {
                    console.log(2)
                    var n = e('.valine-comment-count'),
                        i = 0
                    !(function t(n) {
                        var o = n[i++]
                        if (o) {
                            var a = e(o).attr('data-xid')
                            a &&
                                r
                                    .Q(a)
                                    .count()
                                    .then(function (e) {
                                        ;(o.innerText = e), t(n)
                                    })
                                    .catch(function (e) {
                                        o.innerText = 0
                                    })
                        }
                    })(n),
                        l && kn.add(AV.Object.extend('Counter'), r.cfg.path),
                        console.log(3),
                        r.$el && r.bind()
                })
            } catch (e) {
                console.log(e), ut(r, e)
            }
        })
    var xn = function (t, n) {
            var r = new t(),
                i = new AV.ACL()
            i.setPublicReadAccess(!0),
                i.setPublicWriteAccess(!0),
                r.setACL(i),
                r.set('url', n.url),
                r.set('xid', n.xid),
                r.set('title', n.title),
                r.set('time', 1),
                r
                    .save()
                    .then(function (t) {
                        e(n.el).find('.leancloud-visitors-count').text(1)
                    })
                    .catch(function (e) {
                        console.log(e)
                    })
        },
        kn = {
            add: function (t, n) {
                var r = this,
                    i = e('.leancloud_visitors,.leancloud-visitors')
                if (1 === i.length) {
                    var o = i[0],
                        a = decodeURI(e(o).attr('id')),
                        s = e(o).attr('data-flag-title'),
                        l = encodeURI(a),
                        c = { el: o, url: a, xid: l, title: s }
                    if (decodeURI(a) === decodeURI(n)) {
                        var p = new AV.Query(t)
                        p.equalTo('url', a),
                            p
                                .find()
                                .then(function (n) {
                                    if (n.length > 0) {
                                        var r = n[0]
                                        r.increment('time'),
                                            r
                                                .save()
                                                .then(function (t) {
                                                    e(o)
                                                        .find(
                                                            '.leancloud-visitors-count'
                                                        )
                                                        .text(t.get('time'))
                                                })
                                                .catch(function (e) {
                                                    console.log(e)
                                                })
                                    } else xn(t, c)
                                })
                                .catch(function (e) {
                                    console.log(e),
                                        101 == e.code ? xn(t, c) : ut(r, e)
                                })
                    } else kn.show(t, i)
                } else kn.show(t, i)
            },
            show: function (t, n) {
                var r = []
                if (
                    (n.forEach(function (t) {
                        var n = e(t).find('.leancloud-visitors-count')
                        n && n.text('0'),
                            r.push(
                                /\%/.test(e(t).attr('id'))
                                    ? decodeURI(e(t).attr('id'))
                                    : e(t).attr('id')
                            )
                    }),
                    r.length)
                ) {
                    var i = new AV.Query(t)
                    i.containedIn('url', r),
                        i
                            .find()
                            .then(function (t) {
                                t.length > 0 &&
                                    n.forEach(function (n) {
                                        t.forEach(function (t) {
                                            var r =
                                                    t.get('xid') ||
                                                    encodeURI(t.get('url')),
                                                i = t.get('time'),
                                                o = e(n),
                                                a = o.attr('id')
                                            if (
                                                (/\%/.test(a)
                                                    ? a
                                                    : encodeURI(a)) == r
                                            ) {
                                                var s = o.find(
                                                    '.leancloud-visitors-count'
                                                )
                                                s && s.text(i)
                                            }
                                        })
                                    })
                            })
                            .catch(function (e) {
                                console.log(e)
                            })
                }
            },
        }
    function An(e) {
        return new wn(e)
    }
    ;(wn.prototype.Q = function (e) {
        var t = this.config.clazzName
        if (1 == arguments.length) {
            var n = new AV.Query(t)
            n.doesNotExist('rid')
            var r = new AV.Query(t)
            r.equalTo('rid', '')
            var i = AV.Query.or(n, r)
            return (
                '*' === e ? i.exists('url') : i.equalTo('url', decodeURI(e)),
                i.addDescending('createdAt'),
                i.addDescending('insertedAt'),
                i
            )
        }
        var o = JSON.stringify(arguments[1]).replace(/(\[|\])/g, '')
        return AV.Query.doCloudQuery(
            'select * from ' +
                t +
                ' where rid in (' +
                o +
                ') order by -createdAt,-createdAt'
        )
    }),
        (wn.prototype.installLocale = function (e, t) {
            return this.i18n(e, t), this
        }),
        (wn.prototype.setPath = function (e) {
            return (this.config.path = e), this
        }),
        (wn.prototype.bind = function () {
            var n = this,
                r = n.$el.find('.vemojis'),
                a = n.$el.find('.vpreview'),
                s = n.$el.find('.vemoji-btn'),
                l = n.$el.find('.vpreview-btn'),
                c = n.$el.find('.veditor'),
                p = Be.maps,
                u = !1
            ;(n.$emoji = {
                show: function () {
                    return (
                        !u &&
                            (function (t) {
                                var n = []
                                for (var i in p)
                                    p.hasOwnProperty(i) &&
                                        Be.build(i) &&
                                        n.push(
                                            '<i title="' +
                                                i +
                                                '" >' +
                                                Be.build(i) +
                                                '</i>'
                                        )
                                r.html(n.join('')),
                                    (u = !0),
                                    r.find('i').on('click', function (t) {
                                        t.preventDefault(),
                                            b(
                                                c[0],
                                                ' :' +
                                                    e(this).attr('title') +
                                                    ':'
                                            )
                                    })
                            })(),
                        n.$preview.hide(),
                        r.show(),
                        s.addClass('actived'),
                        n.$emoji
                    )
                },
                hide: function () {
                    return s.removeClass('actived'), r.hide(), n.$emoji
                },
            }),
                (n.$preview = {
                    show: function () {
                        return (
                            mn
                                ? (n.$emoji.hide(),
                                  l.addClass('actived'),
                                  a.html(mn).show(),
                                  O())
                                : n.$preview.hide(),
                            n.$preview
                        )
                    },
                    hide: function () {
                        return (
                            l.removeClass('actived'),
                            a.hide().html(''),
                            n.$preview
                        )
                    },
                })
            var d = function (e) {
                var t,
                    r = ((t = e.val() || ''), Be.parse(fn(t)))
                r || n.$preview.hide(),
                    mn != r &&
                        ((mn = r),
                        l.hasClass('actived') > -1 &&
                            mn != a.html() &&
                            a.html(mn),
                        o(e[0]),
                        O())
            }
            s.on('click', function (e) {
                s.hasClass('actived') ? n.$emoji.hide() : n.$emoji.show()
            }),
                l.on('click', function (e) {
                    l.hasClass('actived')
                        ? n.$preview.hide()
                        : n.$preview.show()
                })
            var f = n.cfg.meta,
                h = {},
                g = { veditor: 'comment' }
            for (var y in (f.forEach(function (e) {
                g['v' + e] = e
            }),
            g))
                if (g.hasOwnProperty(y)) {
                    var v = g[y],
                        m = n.$el.find('.' + y)
                    ;(h[v] = m),
                        m.on('input change blur propertychange', function (t) {
                            var r, i, o
                            n.cfg.enableQQ &&
                                'blur' === t.type &&
                                'nick' === v &&
                                (isNaN(m.val())
                                    ? e.store.get('_v_Cache_Q') &&
                                      e.store.get('_v_Cache_Q').nick !=
                                          m.val() &&
                                      (e.store.remove('_v_Cache_Q'),
                                      (vn.nick = m.val()),
                                      (vn.mail = ''),
                                      (vn.QQAvatar = ''))
                                    : ((r = m.val()),
                                      (i = function (t) {
                                          var n = t.nick || m.val(),
                                              r = t.qq + '@qq.com'
                                          e('.vnick').val(n),
                                              e('.vmail').val(r),
                                              (vn.nick = n),
                                              (vn.mail = r),
                                              (vn.QQAvatar = t.pic)
                                      }),
                                      (o = e.store.get('_v_Cache_Q')) &&
                                      o.qq == r
                                          ? i && i(o)
                                          : e.ajax({
                                                type: 'POST',
                                                url:
                                                    '//valine.api.ioliu.cn/getqqinfo',
                                                data: { qq: r },
                                                success: function (t) {
                                                    t.errmsg ||
                                                        (e.store.set(
                                                            '_v_Cache_Q',
                                                            t
                                                        ),
                                                        i && i(t))
                                                },
                                            }))),
                                'comment' === v
                                    ? d(m)
                                    : (vn[v] = e
                                          .escape(
                                              m
                                                  .val()
                                                  .replace(/(^\s*)|(\s*$)/g, '')
                                          )
                                          .substring(0, 40))
                        })
                }
            var b = function (t, n) {
                    if (document.selection)
                        t.focus(),
                            (document.selection.createRange().text = n),
                            t.focus()
                    else if (t.selectionStart || '0' == t.selectionStart) {
                        var r = t.selectionStart,
                            i = t.selectionEnd,
                            o = t.scrollTop
                        ;(t.value =
                            t.value.substring(0, r) +
                            n +
                            t.value.substring(i, t.value.length)),
                            t.focus(),
                            (t.selectionStart = r + n.length),
                            (t.selectionEnd = r + n.length),
                            (t.scrollTop = o)
                    } else t.focus(), (t.value += n)
                    setTimeout(function (n) {
                        d(e(t))
                    }, 100)
                },
                w = { no: 1, size: n.cfg.pageSize, skip: n.cfg.pageSize },
                x = n.$el.find('.vpage')
            x.on('click', function (e) {
                x.hide(), w.no++, k()
            })
            var k = function () {
                var t = w.size,
                    r = w.no,
                    i = Number(n.$el.find('.vnum').text())
                n.$loading.show()
                var o = n.Q(n.cfg.path)
                o.limit(t),
                    o.skip((r - 1) * t),
                    o
                        .find()
                        .then(function (o) {
                            if (((w.skip = w.size), o && o.length)) {
                                var a = []
                                o.forEach(function (e) {
                                    a.push(e.id),
                                        A(e, n.$el.find('.vcards'), !0)
                                }),
                                    n.Q(n.cfg.path, a).then(function (t) {
                                        ;((t && t.results) || [])
                                            .forEach(function (t) {
                                                A(
                                                    t,
                                                    e(
                                                        '.vquote[data-self-id="' +
                                                            t.get('rid') +
                                                            '"]'
                                                    )
                                                )
                                            })
                                            .catch(function (e) {
                                                console.log(e)
                                            })
                                    }),
                                    t * r < i ? x.show() : x.hide(),
                                    O()
                            } else n.$nodata.show()
                            n.$loading.hide()
                        })
                        .catch(function (e) {
                            console.log(e), n.$loading.hide(), ut(n, e)
                        })
            }
            n.Q(n.cfg.path)
                .count()
                .then(function (e) {
                    e > 0
                        ? (n.$el.find('.vcount').show().find('.vnum').text(e),
                          k())
                        : n.$loading.hide()
                })
                .catch(function (e) {
                    console.log(4), ut(n, e)
                })
            var A = function (r, o, a) {
                    var s = e('<div class="vcard" id="' + r.id + '"></div>'),
                        l = r.get('ua'),
                        c = ''
                    l &&
                        !/ja/.test(n.cfg.lang) &&
                        (c =
                            '<span class="vsys">' +
                            (l = e.detect(l)).browser +
                            ' ' +
                            l.version +
                            '</span> <span class="vsys">' +
                            l.os +
                            ' ' +
                            l.osVersion +
                            '</span>'),
                        '*' === n.cfg.path &&
                            (c =
                                '<a href="' +
                                r.get('url') +
                                '" class="vsys">' +
                                r.get('url') +
                                '</a>')
                    var p,
                        u = r.get('link')
                            ? /^https?\:\/\//.test(r.get('link'))
                                ? r.get('link')
                                : 'http://' + r.get('link')
                            : '',
                        d = u
                            ? '<a class="vnick" rel="nofollow" href="' +
                              u +
                              '" target="_blank" >' +
                              r.get('nick') +
                              '</a>'
                            : '<span class="vnick">' +
                              r.get('nick') +
                              '</span>',
                        f =
                            (bn.hide
                                ? ''
                                : n.cfg.enableQQ && r.get('QQAvatar')
                                ? '<img class="vimg" src="' +
                                  r.get('QQAvatar') +
                                  '" referrerPolicy="no-referrer"/>'
                                : '<img class="vimg" src="' +
                                  (bn.cdn + i(r.get('mail')) + bn.params) +
                                  '">') +
                            '<div class="vh"><div class="vhead">' +
                            d +
                            ' ' +
                            c +
                            '</div><div class="vmeta"><span class="vtime" >' +
                            (function (e, t) {
                                if (!e) return ''
                                try {
                                    var n = Le(e).getTime(),
                                        r = new Date().getTime() - n,
                                        i = Math.floor(r / 864e5)
                                    if (0 === i) {
                                        var o = r % 864e5,
                                            a = Math.floor(o / 36e5)
                                        if (0 === a) {
                                            var s = o % 36e5,
                                                l = Math.floor(s / 6e4)
                                            return 0 === l
                                                ? Math.round((s % 6e4) / 1e3) +
                                                      ' ' +
                                                      t.t('seconds')
                                                : l + ' ' + t.t('minutes')
                                        }
                                        return a + ' ' + t.t('hours')
                                    }
                                    return i < 0
                                        ? t.t('now')
                                        : i < 8
                                        ? i + ' ' + t.t('days')
                                        : (function (e) {
                                              var t = Ne(e.getDate(), 2),
                                                  n = Ne(e.getMonth() + 1, 2)
                                              return (
                                                  Ne(e.getFullYear(), 2) +
                                                  '-' +
                                                  n +
                                                  '-' +
                                                  t
                                              )
                                          })(e)
                                } catch (e) {
                                    console.log(e)
                                }
                            })(r.get('insertedAt'), n.i18n) +
                            '</span><span class="vat" data-vm-id="' +
                            (r.get('rid') || r.id) +
                            '" data-self-id="' +
                            r.id +
                            '">' +
                            n.i18n.t('reply') +
                            '</span></div><div class="vcontent" data-expand="' +
                            n.i18n.t('expand') +
                            '">' +
                            ((p = r.get('comment')),
                            t(p, {
                                onTagAttr: function (e, t, n, r) {
                                    return yn(e, t, n)
                                },
                                onIgnoreTagAttr: function (e, t, n, r) {
                                    return yn(e, t, n)
                                },
                            }).replace(/\<\/?div\>/gi, '')) +
                            '</div><div class="vreply-wrapper" data-self-id="' +
                            r.id +
                            '"></div><div class="vquote" data-self-id="' +
                            r.id +
                            '"></div></div>'
                    s.html(f)
                    var h = s.find('.vat')
                    s.find('a').forEach(function (t) {
                        t &&
                            !e(t).hasClass('at') &&
                            e(t).attr({ target: '_blank', rel: 'noopener' })
                    }),
                        a ? o.append(s) : o.prepend(s)
                    var g = s.find('.vcontent')
                    g && E(g), h && S(h, r)
                },
                $ = {},
                S = function (t, r) {
                    t.on('click', function (i) {
                        var o = t.attr('data-vm-id'),
                            a = t.attr('data-self-id'),
                            s = n.$el.find('.vwrap'),
                            l = '@' + e.escape(r.get('nick'))
                        e('.vreply-wrapper[data-self-id="' + a + '"]')
                            .append(s)
                            .find('.cancel-reply')
                            .show(),
                            ($ = {
                                at: e.escape(l) + ' ',
                                rid: o,
                                pid: a,
                                rmail: r.get('mail'),
                            }),
                            h.comment.attr({ placeholder: l })[0].focus()
                    })
                },
                O = function () {
                    setTimeout(function () {
                        try {
                            n.cfg.mathjax &&
                                'MathJax' in window &&
                                'version' in window.MathJax &&
                                ((/^3.*/.test(window.MathJax.version) &&
                                    MathJax.typeset()) ||
                                    MathJax.Hub.Queue([
                                        'Typeset',
                                        MathJax.Hub,
                                        document.querySelector('.v'),
                                    ])),
                                'renderMathInElement' in window &&
                                    renderMathInElement(e('.v')[0], {
                                        delimiters: [
                                            {
                                                left: '$$',
                                                right: '$$',
                                                display: !0,
                                            },
                                            {
                                                left: '$',
                                                right: '$',
                                                display: !1,
                                            },
                                        ],
                                    })
                        } catch (e) {}
                    }, 100)
                },
                E = function (e) {
                    setTimeout(function () {
                        e[0].offsetHeight > 200 &&
                            (e.addClass('expand'),
                            e.on('click', function (t) {
                                e.removeClass('expand')
                            }))
                    })
                }
            !(function (t) {
                if ((t = e.store.get('_v_Cache_Meta') || t))
                    for (var r in f) {
                        var i = f[r]
                        n.$el.find('.v' + i).val(e.unescape(t[i])),
                            (vn[i] = t[i])
                    }
                var o = e.store.get('_v_Cache_Q')
                vn.QQAvatar = (n.cfg.enableQQ && !!o && o.pic) || ''
            })(),
                (n.reset = function () {
                    ;(vn.comment = ''),
                        h.comment.val(''),
                        d(h.comment),
                        h.comment.attr('placeholder', n.cfg.placeholder),
                        ($ = {}),
                        n.$preview.hide(),
                        n.$el.find('.vpanel').append(n.$el.find('.vwrap')),
                        n.$el.find('.cancel-reply').hide(),
                        (mn = '')
                })
            var _ = n.$el.find('.vsubmit'),
                P = function (t) {
                    if (
                        n.cfg.requiredFields.indexOf('nick') > -1 &&
                        vn.nick.length < 3
                    )
                        return (
                            h.nick[0].focus(),
                            void n.$el
                                .find('.status-bar')
                                .text('' + n.i18n.t('nickFail'))
                                .empty(3e3)
                        )
                    if (
                        n.cfg.requiredFields.indexOf('mail') > -1 &&
                        !/[\w-\.]+@([\w-]+\.)+[a-z]{2,3}/.test(vn.mail)
                    )
                        return (
                            h.mail[0].focus(),
                            void n.$el
                                .find('.status-bar')
                                .text('' + n.i18n.t('mailFail'))
                                .empty(3e3)
                        )
                    if ('' != mn) {
                        ;(vn.comment = mn), (vn.nick = vn.nick || 'Anonymous')
                        var r = e.store.get('vlx')
                        if (r && Date.now() / 1e3 - r / 1e3 < 20)
                            return void n.$el
                                .find('.status-bar')
                                .text(n.i18n.t('busy'))
                                .empty(3e3)
                        j()
                    } else h.comment[0].focus()
                },
                j = function () {
                    e.store.set('vlx', Date.now()),
                        _.attr({ disabled: !0 }),
                        n.$loading.show(!0)
                    var t,
                        r = new (AV.Object.extend(
                            n.cfg.clazzName || 'Comment'
                        ))()
                    if (
                        ((vn.url = decodeURI(n.cfg.path)),
                        (vn.insertedAt = new Date()),
                        $.rid)
                    ) {
                        var i = $.pid || $.rid
                        r.set('rid', $.rid),
                            r.set('pid', i),
                            (vn.comment = mn.replace(
                                '<p>',
                                '<p><a class="at" href="#' +
                                    i +
                                    '">' +
                                    $.at +
                                    '</a> , '
                            ))
                    }
                    for (var o in vn) vn.hasOwnProperty(o) && r.set(o, vn[o])
                    r.setACL(
                        ((t = new AV.ACL()).setPublicReadAccess(!0),
                        t.setPublicWriteAccess(!1),
                        t)
                    ),
                        r
                            .save()
                            .then(function (t) {
                                'Anonymous' != vn.nick &&
                                    e.store.set('_v_Cache_Meta', {
                                        nick: vn.nick,
                                        link: vn.link,
                                        mail: vn.mail,
                                    })
                                var r = n.$el.find('.vnum')
                                try {
                                    $.rid
                                        ? A(
                                              t,
                                              e(
                                                  '.vquote[data-self-id="' +
                                                      $.rid +
                                                      '"]'
                                              ),
                                              !0
                                          )
                                        : (Number(r.text())
                                              ? r.text(Number(r.text()) + 1)
                                              : n.$el
                                                    .find('.vcount')
                                                    .show()
                                                    .find('.vnum')
                                                    .text(Number(r.text()) + 1),
                                          A(t, n.$el.find('.vcards')),
                                          w.skip++),
                                        _.removeAttr('disabled'),
                                        n.$loading.hide(),
                                        n.reset()
                                } catch (e) {
                                    ut(n, e)
                                }
                            })
                            .catch(function (e) {
                                ut(n, e)
                            })
                }
            _.on('click', P),
                e(document)
                    .on('keydown', function (e) {
                        var t =
                            (e = event || e).keyCode || e.which || e.charCode
                        ;(e.ctrlKey || e.metaKey) && 13 === t && P(),
                            9 === t &&
                                'veditor' ==
                                    (document.activeElement.id || '') &&
                                (e.preventDefault(), b(c[0], '    '))
                    })
                    .on('paste', function (e) {
                        var t =
                            'clipboardData' in e
                                ? e.clipboardData
                                : (e.originalEvent &&
                                      e.originalEvent.clipboardData) ||
                                  window.clipboardData
                        t && z(t.items, !0)
                    }),
                c.on('dragenter dragleave dragover drop', function (e) {
                    e.stopPropagation(),
                        e.preventDefault(),
                        'drop' === e.type && z(e.dataTransfer.items)
                })
            var z = function (e, t) {
                    for (var n = [], r = 0, i = e.length; r < i; r++) {
                        var o = e[r]
                        if ('string' === o.kind && o.type.match('^text/html'))
                            !t &&
                                o.getAsString(function (e) {
                                    e && b(c[0], e.replace(/<[^>]+>/g, ''))
                                })
                        else if (-1 !== o.type.indexOf('image')) {
                            n.push(o.getAsFile())
                            continue
                        }
                    }
                    C(n)
                },
                C = function (e, t) {
                    t = t || 0
                    var r = e.length
                    if (r > 0) {
                        var i = e[t]
                        _.attr({ disabled: !0 })
                        var a = '![Uploading ' + i.name + '...]()'
                        b(c[0], a),
                            I(i, function (s) {
                                500 != s.code
                                    ? (c.val(
                                          c
                                              .val()
                                              .replace(
                                                  a,
                                                  '![' +
                                                      i.name +
                                                      '](' +
                                                      s.data.url +
                                                      ')\r\n'
                                              )
                                      ),
                                      o(c[0]),
                                      ++t < r
                                          ? C(e, t)
                                          : _.removeAttr('disabled'))
                                    : (c.val(c.val().replace(a, '')),
                                      o(c[0]),
                                      n.$el
                                          .find('.status-bar')
                                          .text(s.msg)
                                          .empty(3e3),
                                      _.removeAttr('disabled'))
                            })
                    }
                },
                I = function (t, n) {
                    var r = new FormData()
                    r.append('image', t),
                        e.ajax({
                            type: 'post',
                            url: 'https://pic.alexhchu.com/api/upload',
                            data: r,
                            success: function (e) {
                                n && n(e)
                            },
                        })
                }
        }),
        (module.exports = An),
        (module.exports.default = An)
})
//# sourceMappingURL=Valine.min.umd.js.map
