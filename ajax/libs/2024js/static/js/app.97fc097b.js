(function (t) {
  function e(e) {
    for (
      var s, i, r = e[0], c = e[1], d = e[2], l = 0, u = [];
      l < r.length;
      l++
    )
      (i = r[l]),
        Object.prototype.hasOwnProperty.call(o, i) && o[i] && u.push(o[i][0]),
        (o[i] = 0);
    for (s in c) Object.prototype.hasOwnProperty.call(c, s) && (t[s] = c[s]);
    p && p(e);
    while (u.length) u.shift()();
    return n.push.apply(n, d || []), a();
  }
  function a() {
    for (var t, e = 0; e < n.length; e++) {
      for (var a = n[e], s = !0, i = 1; i < a.length; i++) {
        var r = a[i];
        0 !== o[r] && (s = !1);
      }
      s && (n.splice(e--, 1), (t = c((c.s = a[0]))));
    }
    return t;
  }
  var s = {},
    i = { app: 0 },
    o = { app: 0 },
    n = [];
  function r(t) {
    return (
      c.p +
      "static/js/" +
      ({}[t] || t) +
      "." +
      {
        "chunk-0f83f8fb": "761bbb71",
        "chunk-5a64cf7e": "f0bf9443",
        "chunk-aa7bef62": "38c7f0d3",
        "chunk-b1af33fa": "2d919425",
        "chunk-b9f01bd4": "922608aa",
      }[t] +
      ".js"
    );
  }
  function c(e) {
    if (s[e]) return s[e].exports;
    var a = (s[e] = { i: e, l: !1, exports: {} });
    return t[e].call(a.exports, a, a.exports, c), (a.l = !0), a.exports;
  }
  (c.e = function (t) {
    var e = [],
      a = {
        "chunk-0f83f8fb": 1,
        "chunk-5a64cf7e": 1,
        "chunk-aa7bef62": 1,
        "chunk-b1af33fa": 1,
        "chunk-b9f01bd4": 1,
      };
    i[t]
      ? e.push(i[t])
      : 0 !== i[t] &&
        a[t] &&
        e.push(
          (i[t] = new Promise(function (e, a) {
            for (
              var s =
                  "static/css/" +
                  ({}[t] || t) +
                  "." +
                  {
                    "chunk-0f83f8fb": "ab256fe7",
                    "chunk-5a64cf7e": "87a13375",
                    "chunk-aa7bef62": "46f074b7",
                    "chunk-b1af33fa": "1664cba5",
                    "chunk-b9f01bd4": "5ca83967",
                  }[t] +
                  ".css",
                o = c.p + s,
                n = document.getElementsByTagName("link"),
                r = 0;
              r < n.length;
              r++
            ) {
              var d = n[r],
                l = d.getAttribute("data-href") || d.getAttribute("href");
              if ("stylesheet" === d.rel && (l === s || l === o)) return e();
            }
            var u = document.getElementsByTagName("style");
            for (r = 0; r < u.length; r++) {
              (d = u[r]), (l = d.getAttribute("data-href"));
              if (l === s || l === o) return e();
            }
            var p = document.createElement("link");
            (p.rel = "stylesheet"),
              (p.type = "text/css"),
              (p.onload = e),
              (p.onerror = function (e) {
                var s = (e && e.target && e.target.src) || o,
                  n = new Error(
                    "Loading CSS chunk " + t + " failed.\n(" + s + ")"
                  );
                (n.code = "CSS_CHUNK_LOAD_FAILED"),
                  (n.request = s),
                  delete i[t],
                  p.parentNode.removeChild(p),
                  a(n);
              }),
              (p.href = o);
            var m = document.getElementsByTagName("head")[0];
            m.appendChild(p);
          }).then(function () {
            i[t] = 0;
          }))
        );
    var s = o[t];
    if (0 !== s)
      if (s) e.push(s[2]);
      else {
        var n = new Promise(function (e, a) {
          s = o[t] = [e, a];
        });
        e.push((s[2] = n));
        var d,
          l = document.createElement("script");
        (l.charset = "utf-8"),
          (l.timeout = 120),
          c.nc && l.setAttribute("nonce", c.nc),
          (l.src = r(t));
        var u = new Error();
        d = function (e) {
          (l.onerror = l.onload = null), clearTimeout(p);
          var a = o[t];
          if (0 !== a) {
            if (a) {
              var s = e && ("load" === e.type ? "missing" : e.type),
                i = e && e.target && e.target.src;
              (u.message =
                "Loading chunk " + t + " failed.\n(" + s + ": " + i + ")"),
                (u.name = "ChunkLoadError"),
                (u.type = s),
                (u.request = i),
                a[1](u);
            }
            o[t] = void 0;
          }
        };
        var p = setTimeout(function () {
          d({ type: "timeout", target: l });
        }, 12e4);
        (l.onerror = l.onload = d), document.head.appendChild(l);
      }
    return Promise.all(e);
  }),
    (c.m = t),
    (c.c = s),
    (c.d = function (t, e, a) {
      c.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: a });
    }),
    (c.r = function (t) {
      "undefined" !== typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(t, "__esModule", { value: !0 });
    }),
    (c.t = function (t, e) {
      if ((1 & e && (t = c(t)), 8 & e)) return t;
      if (4 & e && "object" === typeof t && t && t.__esModule) return t;
      var a = Object.create(null);
      if (
        (c.r(a),
        Object.defineProperty(a, "default", { enumerable: !0, value: t }),
        2 & e && "string" != typeof t)
      )
        for (var s in t)
          c.d(
            a,
            s,
            function (e) {
              return t[e];
            }.bind(null, s)
          );
      return a;
    }),
    (c.n = function (t) {
      var e =
        t && t.__esModule
          ? function () {
              return t["default"];
            }
          : function () {
              return t;
            };
      return c.d(e, "a", e), e;
    }),
    (c.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }),
    (c.p = "/h5/"),
    (c.oe = function (t) {
      throw (console.error(t), t);
    });
  var d = (window["webpackJsonp"] = window["webpackJsonp"] || []),
    l = d.push.bind(d);
  (d.push = e), (d = d.slice());
  for (var u = 0; u < d.length; u++) e(d[u]);
  var p = l;
  n.push([0, "chunk-vendors"]), a();
})({
  0: function (t, e, a) {
    t.exports = a("56d7");
  },
  "046d": function (t, e, a) {},
  "04ec": function (t, e, a) {
    "use strict";
    a("3fe5");
  },
  "089a": function (t, e, a) {
    "use strict";
    a.r(e);
    var s = function () {
        var t = this,
          e = t.$createElement,
          a = t._self._c || e;
        return a(
          "div",
          { staticClass: "auxiliarysegmentation" },
          [
            a(
              "section",
              {
                staticClass: "contan",
                style: {
                  height: t.datas.blankHeight + "px",
                  padding: 0 === t.datas.paddType ? "0px" : "0px 15px",
                },
              },
              [
                a("div", {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: 1 === t.datas.segmentationtype,
                      expression: "datas.segmentationtype === 1",
                    },
                  ],
                  staticStyle: {
                    height: "1px",
                    width: "100%",
                    "border-top-width": "1px",
                  },
                  style: {
                    "border-top-style": t.datas.bordertp,
                    "border-top-color": t.datas.auxliarColor,
                  },
                }),
              ]
            ),
            t._t("deles"),
          ],
          2
        );
      },
      i = [],
      o = { name: "auxiliarysegmentation", props: { datas: Object } },
      n = o,
      r = (a("04ec"), a("2877")),
      c = Object(r["a"])(n, s, i, !1, null, "6f77adb5", null);
    e["default"] = c.exports;
  },
  "0b01": function (t, e, a) {},
  "0c59": function (t, e, a) {},
  1034: function (t, e, a) {
    "use strict";
    a("0b01");
  },
  1061: function (t, e, a) {
    "use strict";
    a("eea5");
  },
  "10f8": function (t, e, a) {},
  "1a97": function (t, e, a) {
    "use strict";
    a.r(e);
    var s = function () {
        var t = this,
          e = t.$createElement,
          a = t._self._c || e;
        return a("div", [
          a("p", [t._v("尊敬的用户：")]),
          a("p", [
            t._v(
              "本声明是由广告投放公司“" +
                t._s(t.state.company) +
                "”（以下简称“我们”）为处理你的个人信息而制定。"
            ),
          ]),
          a("p", [
            t._v(
              "感谢您使用我们的服务。为了保护您的个人信息安全，我们制定了以下个人信息授权与保护声明，请您仔细阅读并同意："
            ),
          ]),
          t._m(0),
          t._m(1),
          t._m(2),
          t._m(3),
          t._m(4),
          t._m(5),
          a("ol", { attrs: { start: "5" } }, [
            t._m(6),
            t._m(7),
            t._m(8),
            t._m(9),
            a("li", [
              a("p", [
                t._v(
                  "您的权利 您有权随时访问、更正、删除或限制我们对您个人信息的使用。如果您需要行使这些权利，请联系我们的客户服务部门或者联系邮箱。"
                ),
                a("br"),
                t._v("-邮箱：" + t._s(t.state.email)),
              ]),
            ]),
            t._m(10),
          ]),
          a("p", [
            t._v(
              "请您在使用我们的服务前，仔细阅读并理解以上个人信息授权与保护声明。如果您对其中的内容有任何疑问或不同意，请停止使用我们的服务。"
            ),
          ]),
          a("p", [t._v("感谢您的合作与支持！")]),
          a("p", [t._v("-联系邮箱：" + t._s(t.state.email))]),
          a("p", [t._v("更新日期：2023年10月12日")]),
          a("p", [t._v("生效日期：2023年10月12日")]),
        ]);
      },
      i = [
        function () {
          var t = this,
            e = t.$createElement,
            a = t._self._c || e;
          return a("ol", [
            a("li", [
              t._v(
                "授权范围 您同意授权我们收集、使用和存储您的个人信息，包括但不限于以下信息："
              ),
            ]),
          ]);
        },
        function () {
          var t = this,
            e = t.$createElement,
            a = t._self._c || e;
          return a("ul", [
            a("li", [t._v("姓名")]),
            a("li", [t._v("联系方式（包括手机号码）")]),
            a("li", [t._v("地址")]),
            a("li", [t._v("电子邮件地址")]),
            a("li", [t._v("身份证号码（仅在法律要求或您自愿提供的情况下）")]),
          ]);
        },
        function () {
          var t = this,
            e = t.$createElement,
            a = t._self._c || e;
          return a("ol", { attrs: { start: "2" } }, [
            a("li", [
              t._v("个人信息的使用 我们将使用您授权的个人信息用于以下目的："),
            ]),
          ]);
        },
        function () {
          var t = this,
            e = t.$createElement,
            a = t._self._c || e;
          return a("ul", [
            a("li", [t._v("提供您所需的服务")]),
            a("li", [t._v("处理您的订单或请求")]),
            a("li", [t._v("联系您并向您发送有关我们产品和服务的信息")]),
            a("li", [t._v("改善我们的产品和服务")]),
            a("li", [t._v("履行法律义务")]),
          ]);
        },
        function () {
          var t = this,
            e = t.$createElement,
            a = t._self._c || e;
          return a("ol", { attrs: { start: "3" } }, [
            a("li", [
              a("p", [
                t._v(
                  "个人信息的保护 我们承诺采取必要的技术和组织措施，保护您的个人信息安全。我们将采取合理的措施防止您的个人信息丢失、被盗用、泄露、篡改或损坏。"
                ),
              ]),
            ]),
            a("li", [
              a("p", [
                t._v(
                  "个人信息的共享与转让 除非经过您的明确同意或法律要求，否则我们不会将您的个人信息转让给任何第三方。我们仅在以下情况下可能会与第三方共享您的个人信息："
                ),
              ]),
            ]),
          ]);
        },
        function () {
          var t = this,
            e = t.$createElement,
            a = t._self._c || e;
          return a("ul", [
            a("li", [
              t._v(
                "为了提供您所需的服务，我们可能会与合作伙伴共享必要的个人信息；"
              ),
            ]),
            a("li", [
              t._v("在法律要求或政府部门要求下，我们可能会披露您的个人信息。"),
            ]),
          ]);
        },
        function () {
          var t = this,
            e = t.$createElement,
            a = t._self._c || e;
          return a("li", [
            a("p", [
              t._v(
                "个人信息的存储与使用期限 我们将妥善保存您的个人信息，并在达到收集目的后停止使用。除非法律要求或您主动删除，否则我们将在合理的时间内保留您的个人信息。"
              ),
            ]),
          ]);
        },
        function () {
          var t = this,
            e = t.$createElement,
            a = t._self._c || e;
          return a("li", [
            a("p", [
              t._v(
                "未成年人的个人信息保护 我们非常重视未成年人的个人信息保护。如果您是未满18岁的未成年人，请在法定监护人的指导下使用我们的服务，并确保您的监护人已同意您提供个人信息。"
              ),
            ]),
          ]);
        },
        function () {
          var t = this,
            e = t.$createElement,
            a = t._self._c || e;
          return a("li", [
            a("p", [
              t._v(
                "Cookie的使用 我们可能会使用Cookie技术来收集和存储相关信息，以提供更个性化的服务。您可以根据自己的需求选择是否接受Cookie。"
              ),
            ]),
          ]);
        },
        function () {
          var t = this,
            e = t.$createElement,
            a = t._self._c || e;
          return a("li", [
            a("p", [
              t._v(
                "其他网站的链接 我们的服务可能包含其他网站的链接，但这些网站的个人信息保护政策与我们无关。请在访问这些网站时仔细阅读并了解其个人信息保护政策。"
              ),
            ]),
          ]);
        },
        function () {
          var t = this,
            e = t.$createElement,
            a = t._self._c || e;
          return a("li", [
            a("p", [
              t._v(
                "个人信息保护政策的更新 我们保留随时更新个人信息保护政策的权利，并将在我们的网站上及时公布更新的内容。"
              ),
            ]),
          ]);
        },
      ],
      o = { name: "payfansstate", props: { state: Object } },
      n = o,
      r = a("2877"),
      c = Object(r["a"])(n, s, i, !1, null, null, null);
    e["default"] = c.exports;
  },
  "21c2": function (t, e, a) {
    "use strict";
    a.r(e);
    var s = function () {
        var t = this,
          e = t.$createElement,
          a = t._self._c || e;
        return a(
          "div",
          {
            ref: t.listSwitchName,
            staticClass: "listswitching",
            style: { backgroundImage: "url(" + t.datas.bgImg + ")" },
          },
          [
            a(
              "div",
              {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: t.datas.showMore && 0 == t.datas.commoditylisttype,
                    expression:
                      "datas.showMore && datas.commoditylisttype == 0",
                  },
                ],
                staticClass: "more",
                style: { "margin-right": t.datas.pageMargin + "px" },
              },
              [t._v(" 更多》 ")]
            ),
            a(
              "section",
              {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value:
                      !t.datas.imageList[0] && 0 === t.datas.commoditylisttype,
                    expression:
                      "!datas.imageList[0] && datas.commoditylisttype === 0",
                  },
                ],
                staticClass: "defaultcommodity",
                class: [
                  5 === t.datas.commodityType ? "defaultcommodityList5" : "",
                  1 === t.datas.commodityType ? "defaultcommodityListFlex" : "",
                ],
                style: {
                  "padding-top": t.datas.commodityMargin + "px",
                  "padding-left": t.datas.pageMargin + "px",
                  "padding-right": t.datas.pageMargin + "px",
                },
              },
              t._l(4, function (e) {
                return a(
                  "div",
                  {
                    key: e,
                    staticClass: "defaultcommodityList",
                    class: [
                      0 === t.datas.commodityType
                        ? "defaultcommodityList0"
                        : "",
                      1 === t.datas.commodityType
                        ? "defaultcommodityList1"
                        : "",
                      2 === t.datas.commodityType
                        ? "defaultcommodityList2"
                        : "",
                      3 === t.datas.commodityType
                        ? "defaultcommodityList3"
                        : "",
                      4 === t.datas.commodityType
                        ? "defaultcommodityList4"
                        : "",
                      5 === t.datas.commodityType
                        ? "defaultcommodityList5"
                        : "",
                    ],
                    style: {
                      border:
                        2 === t.datas.moditystyle
                          ? "1px solid rgba(50,50,51,0.1)"
                          : "",
                      "box-shadow":
                        1 === t.datas.moditystyle
                          ? "0 2px 8px rgba(93,113,127,0.08)"
                          : "",
                      margin: t.datas.commodityMargin + "px",
                      width:
                        1 === t.datas.commodityType
                          ? 50 - t.datas.commodityMargin / 6 + "%"
                          : 2 === t.datas.commodityType
                          ? 33 - t.datas.commodityMargin / 5 + "%"
                          : 4 === t.datas.commodityType
                          ? 50 - t.datas.commodityMargin / 5 + "%"
                          : "",
                      "border-radius": t.datas.borderRadius + "px",
                    },
                  },
                  [
                    a(
                      "div",
                      { staticClass: "bg-pic" },
                      [
                        a("img", {
                          style: {
                            "border-radius": t.datas.borderRadius + "px",
                          },
                          attrs: {
                            draggable: "false",
                            src:
                              t.$const.IMAGE_DOMAIN + "/sys/h5/image/imgs.png",
                            alt: "",
                          },
                        }),
                        a(
                          "van-tag",
                          {
                            directives: [
                              {
                                name: "show",
                                rawName: "v-show",
                                value:
                                  t.datas.commoditycorner &&
                                  0 === t.datas.commoditycornertype,
                                expression:
                                  "datas.commoditycorner && datas.commoditycornertype === 0",
                              },
                            ],
                            staticClass: "marks",
                            style: t.styleString,
                            attrs: {
                              mark: "",
                              color: t.datas.commodityTagColor || t.tagColor,
                            },
                          },
                          [t._v("新品")]
                        ),
                        a(
                          "van-tag",
                          {
                            directives: [
                              {
                                name: "show",
                                rawName: "v-show",
                                value:
                                  t.datas.commoditycorner &&
                                  1 === t.datas.commoditycornertype,
                                expression:
                                  "datas.commoditycorner && datas.commoditycornertype === 1",
                              },
                            ],
                            staticClass: "marks",
                            style: t.styleString,
                            attrs: {
                              color: t.datas.commodityTagColor || t.tagColor,
                            },
                          },
                          [t._v("热"), a("br"), t._v("卖")]
                        ),
                        a(
                          "van-tag",
                          {
                            directives: [
                              {
                                name: "show",
                                rawName: "v-show",
                                value:
                                  t.datas.commoditycorner &&
                                  2 === t.datas.commoditycornertype,
                                expression:
                                  "datas.commoditycorner && datas.commoditycornertype === 2",
                              },
                            ],
                            staticClass: "marks",
                            style: t.styleString,
                            attrs: {
                              color: t.datas.commodityTagColor || t.tagColor,
                            },
                          },
                          [t._v("NEW")]
                        ),
                        a(
                          "van-tag",
                          {
                            directives: [
                              {
                                name: "show",
                                rawName: "v-show",
                                value:
                                  t.datas.commoditycorner &&
                                  3 === t.datas.commoditycornertype,
                                expression:
                                  "datas.commoditycorner && datas.commoditycornertype === 3",
                              },
                            ],
                            staticClass: "marks",
                            style: t.styleString,
                            attrs: {
                              plain: "",
                              color: t.datas.commodityTagColor || t.tagColor,
                            },
                          },
                          [t._v("HOT")]
                        ),
                      ],
                      1
                    ),
                    a(
                      "div",
                      {
                        staticClass: "text",
                        style: {
                          background:
                            3 !== t.datas.moditystyle ? "#fff" : "none",
                          "border-top-right-radius":
                            t.datas.borderRadius + "px",
                          "border-bottom-right-radius":
                            t.datas.borderRadius + "px",
                        },
                      },
                      [
                        a(
                          "h5",
                          {
                            style: {
                              "font-weight": t.datas.textWeight,
                              "text-align":
                                "center" === t.datas.positions ? "center" : "",
                            },
                          },
                          [t._v(" 这里显示商品名称，最多显示1行 ")]
                        ),
                        a(
                          "p",
                          {
                            style: {
                              "text-align":
                                "center" === t.datas.positions ? "center" : "",
                            },
                          },
                          [t._v(" 这里显示商品描述，最多显示1行 ")]
                        ),
                        a("div", { staticClass: "mony" }, [
                          a(
                            "span",
                            {
                              directives: [
                                {
                                  name: "show",
                                  rawName: "v-show",
                                  value: t.datas.priceofcommodity,
                                  expression: "datas.priceofcommodity",
                                },
                              ],
                            },
                            [a("i", [t._v("￥")]), t._v("99")]
                          ),
                          a(
                            "div",
                            {
                              directives: [
                                {
                                  name: "show",
                                  rawName: "v-show",
                                  value: t.datas.purchasebutton,
                                  expression: "datas.purchasebutton",
                                },
                              ],
                            },
                            [
                              a("van-icon", {
                                directives: [
                                  {
                                    name: "show",
                                    rawName: "v-show",
                                    value: 0 === t.datas.purchasebuttonType,
                                    expression:
                                      "datas.purchasebuttonType === 0",
                                  },
                                ],
                                attrs: { name: "cart-circle-o", size: "23" },
                              }),
                              a("van-icon", {
                                directives: [
                                  {
                                    name: "show",
                                    rawName: "v-show",
                                    value: 1 === t.datas.purchasebuttonType,
                                    expression:
                                      "datas.purchasebuttonType === 1",
                                  },
                                ],
                                attrs: { name: "add-o", size: "23" },
                              }),
                              a("van-icon", {
                                directives: [
                                  {
                                    name: "show",
                                    rawName: "v-show",
                                    value: 2 === t.datas.purchasebuttonType,
                                    expression:
                                      "datas.purchasebuttonType === 2",
                                  },
                                ],
                                attrs: { name: "add", size: "23" },
                              }),
                              a("van-icon", {
                                directives: [
                                  {
                                    name: "show",
                                    rawName: "v-show",
                                    value: 3 === t.datas.purchasebuttonType,
                                    expression:
                                      "datas.purchasebuttonType === 3",
                                  },
                                ],
                                attrs: { name: "cart-o", size: "23" },
                              }),
                              a(
                                "em",
                                {
                                  directives: [
                                    {
                                      name: "show",
                                      rawName: "v-show",
                                      value: 4 === t.datas.purchasebuttonType,
                                      expression:
                                        "datas.purchasebuttonType === 4",
                                    },
                                  ],
                                },
                                [t._v(t._s(t.datas.purchase))]
                              ),
                              a(
                                "em",
                                {
                                  directives: [
                                    {
                                      name: "show",
                                      rawName: "v-show",
                                      value: 5 === t.datas.purchasebuttonType,
                                      expression:
                                        "datas.purchasebuttonType === 5",
                                    },
                                  ],
                                },
                                [t._v(t._s(t.datas.purchase))]
                              ),
                              a(
                                "em",
                                {
                                  directives: [
                                    {
                                      name: "show",
                                      rawName: "v-show",
                                      value: 6 === t.datas.purchasebuttonType,
                                      expression:
                                        "datas.purchasebuttonType === 6",
                                    },
                                  ],
                                },
                                [t._v(t._s(t.datas.purchase))]
                              ),
                              a(
                                "em",
                                {
                                  directives: [
                                    {
                                      name: "show",
                                      rawName: "v-show",
                                      value: 7 === t.datas.purchasebuttonType,
                                      expression:
                                        "datas.purchasebuttonType === 7",
                                    },
                                  ],
                                },
                                [t._v(t._s(t.datas.purchase))]
                              ),
                            ],
                            1
                          ),
                        ]),
                      ]
                    ),
                  ]
                );
              }),
              0
            ),
            a(
              "section",
              {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value:
                      t.datas.imageList[0] && 0 === t.datas.commoditylisttype,
                    expression:
                      "datas.imageList[0] && datas.commoditylisttype === 0",
                  },
                ],
                staticClass: "defaultcommodity",
                class: [
                  5 === t.datas.commodityType ? "defaultcommodityList5" : "",
                  1 === t.datas.commodityType ? "defaultcommodityListFlex" : "",
                ],
                style: {
                  "padding-top": t.datas.commodityMargin + "px",
                  "padding-left": t.datas.pageMargin + "px",
                  "padding-right": t.datas.pageMargin + "px",
                },
              },
              t._l(t.datas.imageList, function (e, s) {
                return a(
                  "div",
                  {
                    key: s,
                    staticClass: "defaultcommodityList",
                    class: [
                      0 === t.datas.commodityType
                        ? "defaultcommodityList0"
                        : "",
                      1 === t.datas.commodityType
                        ? "defaultcommodityList1"
                        : "",
                      2 === t.datas.commodityType
                        ? "defaultcommodityList2"
                        : "",
                      3 === t.datas.commodityType
                        ? "defaultcommodityList3"
                        : "",
                      4 === t.datas.commodityType
                        ? "defaultcommodityList4"
                        : "",
                      5 === t.datas.commodityType
                        ? "defaultcommodityList5"
                        : "",
                    ],
                    style: {
                      border:
                        2 === t.datas.moditystyle
                          ? "1px solid rgba(50,50,51,0.1)"
                          : "",
                      "box-shadow":
                        1 === t.datas.moditystyle
                          ? "0 2px 8px rgba(93,113,127,0.08)"
                          : "",
                      margin: t.datas.commodityMargin + "px",
                      width:
                        1 === t.datas.commodityType
                          ? 50 - t.datas.commodityMargin / 6 + "%"
                          : 2 === t.datas.commodityType
                          ? 33 - t.datas.commodityMargin / 5 + "%"
                          : 4 === t.datas.commodityType
                          ? 50 - t.datas.commodityMargin / 5 + "%"
                          : "",
                      "border-radius": t.datas.borderRadius + "px",
                    },
                  },
                  [
                    a(
                      "div",
                      { staticClass: "bg-pic" },
                      [
                        a("img", {
                          style: {
                            "border-radius": t.datas.borderRadius + "px",
                          },
                          attrs: {
                            draggable: "false",
                            src: e.coverUrl,
                            alt: "",
                          },
                        }),
                        a(
                          "van-tag",
                          {
                            directives: [
                              {
                                name: "show",
                                rawName: "v-show",
                                value:
                                  t.datas.commoditycorner &&
                                  0 === t.datas.commoditycornertype,
                                expression:
                                  "datas.commoditycorner && datas.commoditycornertype === 0",
                              },
                            ],
                            staticClass: "marks",
                            style: t.styleString,
                            attrs: {
                              mark: "",
                              color: t.datas.commodityTagColor || t.tagColor,
                            },
                          },
                          [t._v("新品")]
                        ),
                        a(
                          "van-tag",
                          {
                            directives: [
                              {
                                name: "show",
                                rawName: "v-show",
                                value:
                                  t.datas.commoditycorner &&
                                  1 === t.datas.commoditycornertype,
                                expression:
                                  "datas.commoditycorner && datas.commoditycornertype === 1",
                              },
                            ],
                            staticClass: "marks",
                            style: t.styleString,
                            attrs: {
                              color: t.datas.commodityTagColor || t.tagColor,
                            },
                          },
                          [t._v("热"), a("br"), t._v("卖")]
                        ),
                        a(
                          "van-tag",
                          {
                            directives: [
                              {
                                name: "show",
                                rawName: "v-show",
                                value:
                                  t.datas.commoditycorner &&
                                  2 === t.datas.commoditycornertype,
                                expression:
                                  "datas.commoditycorner && datas.commoditycornertype === 2",
                              },
                            ],
                            staticClass: "marks",
                            style: t.styleString,
                            attrs: {
                              color: t.datas.commodityTagColor || t.tagColor,
                            },
                          },
                          [t._v("NEW")]
                        ),
                        a(
                          "van-tag",
                          {
                            directives: [
                              {
                                name: "show",
                                rawName: "v-show",
                                value:
                                  t.datas.commoditycorner &&
                                  3 === t.datas.commoditycornertype,
                                expression:
                                  "datas.commoditycorner && datas.commoditycornertype === 3",
                              },
                            ],
                            staticClass: "marks",
                            style: t.styleString,
                            attrs: {
                              plain: "",
                              color: t.datas.commodityTagColor || t.tagColor,
                            },
                          },
                          [t._v("HOT")]
                        ),
                      ],
                      1
                    ),
                    a(
                      "div",
                      {
                        staticClass: "text",
                        style: {
                          background:
                            3 !== t.datas.moditystyle ? "#fff" : "none",
                          "border-top-right-radius":
                            t.datas.borderRadius + "px",
                          "border-bottom-right-radius":
                            t.datas.borderRadius + "px",
                        },
                      },
                      [
                        a(
                          "h5",
                          {
                            style: {
                              "font-weight": t.datas.textWeight,
                              "text-align":
                                "center" === t.datas.positions ? "center" : "",
                            },
                          },
                          [t._v(" " + t._s(e.name) + " ")]
                        ),
                        a(
                          "p",
                          {
                            style: {
                              "text-align":
                                "center" === t.datas.positions ? "center" : "",
                            },
                          },
                          [t._v(" " + t._s(e.introduce) + " ")]
                        ),
                        t.datas.priceofcommodity || t.datas.purchasebutton
                          ? a("div", { staticClass: "mony" }, [
                              a(
                                "span",
                                {
                                  directives: [
                                    {
                                      name: "show",
                                      rawName: "v-show",
                                      value: t.datas.priceofcommodity,
                                      expression: "datas.priceofcommodity",
                                    },
                                  ],
                                },
                                [
                                  a("i", [t._v("￥")]),
                                  t._v(" " + t._s(e.price) + " "),
                                ]
                              ),
                              a(
                                "div",
                                {
                                  directives: [
                                    {
                                      name: "show",
                                      rawName: "v-show",
                                      value: t.datas.purchasebutton,
                                      expression: "datas.purchasebutton",
                                    },
                                  ],
                                },
                                [
                                  a("van-icon", {
                                    directives: [
                                      {
                                        name: "show",
                                        rawName: "v-show",
                                        value: 0 === t.datas.purchasebuttonType,
                                        expression:
                                          "datas.purchasebuttonType === 0",
                                      },
                                    ],
                                    attrs: {
                                      name: "cart-circle-o",
                                      size: "23",
                                    },
                                  }),
                                  a("van-icon", {
                                    directives: [
                                      {
                                        name: "show",
                                        rawName: "v-show",
                                        value: 1 === t.datas.purchasebuttonType,
                                        expression:
                                          "datas.purchasebuttonType === 1",
                                      },
                                    ],
                                    attrs: { name: "add-o", size: "23" },
                                  }),
                                  a("van-icon", {
                                    directives: [
                                      {
                                        name: "show",
                                        rawName: "v-show",
                                        value: 2 === t.datas.purchasebuttonType,
                                        expression:
                                          "datas.purchasebuttonType === 2",
                                      },
                                    ],
                                    attrs: { name: "add", size: "23" },
                                  }),
                                  a("van-icon", {
                                    directives: [
                                      {
                                        name: "show",
                                        rawName: "v-show",
                                        value: 3 === t.datas.purchasebuttonType,
                                        expression:
                                          "datas.purchasebuttonType === 3",
                                      },
                                    ],
                                    attrs: { name: "cart-o", size: "23" },
                                  }),
                                  a(
                                    "em",
                                    {
                                      directives: [
                                        {
                                          name: "show",
                                          rawName: "v-show",
                                          value:
                                            4 === t.datas.purchasebuttonType,
                                          expression:
                                            "datas.purchasebuttonType === 4",
                                        },
                                      ],
                                    },
                                    [t._v(t._s(t.datas.purchase))]
                                  ),
                                  a(
                                    "em",
                                    {
                                      directives: [
                                        {
                                          name: "show",
                                          rawName: "v-show",
                                          value:
                                            5 === t.datas.purchasebuttonType,
                                          expression:
                                            "datas.purchasebuttonType === 5",
                                        },
                                      ],
                                    },
                                    [t._v(t._s(t.datas.purchase))]
                                  ),
                                  a(
                                    "em",
                                    {
                                      directives: [
                                        {
                                          name: "show",
                                          rawName: "v-show",
                                          value:
                                            6 === t.datas.purchasebuttonType,
                                          expression:
                                            "datas.purchasebuttonType === 6",
                                        },
                                      ],
                                    },
                                    [t._v(t._s(t.datas.purchase))]
                                  ),
                                  a(
                                    "em",
                                    {
                                      directives: [
                                        {
                                          name: "show",
                                          rawName: "v-show",
                                          value:
                                            7 === t.datas.purchasebuttonType,
                                          expression:
                                            "datas.purchasebuttonType === 7",
                                        },
                                      ],
                                    },
                                    [t._v(t._s(t.datas.purchase))]
                                  ),
                                ],
                                1
                              ),
                            ])
                          : t._e(),
                      ]
                    ),
                  ]
                );
              }),
              0
            ),
            a(
              "div",
              { staticClass: "tab-type2" },
              [
                a(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value:
                          t.datas.showMore && 1 == t.datas.commoditylisttype,
                        expression:
                          "datas.showMore && datas.commoditylisttype == 1",
                      },
                    ],
                    staticClass: "more",
                    style: {
                      "margin-right": t.datas.pageMargin + "px",
                      "margin-top": "0px",
                    },
                  },
                  [t._v(" 更多》 ")]
                ),
                a(
                  "van-tabs",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: 1 === t.datas.commoditylisttype,
                        expression: "datas.commoditylisttype === 1",
                      },
                    ],
                    attrs: {
                      animated: "",
                      swipeable: "",
                      color: t.datas.tabColor,
                    },
                    model: {
                      value: t.active1,
                      callback: function (e) {
                        t.active1 = e;
                      },
                      expression: "active1",
                    },
                  },
                  t._l(t.datas.commoditylisttypetab, function (e, s) {
                    return a(
                      "van-tab",
                      {
                        key: s,
                        style: {
                          "font-size": e.wordSize + "px",
                          "font-weight": e.wordWeight,
                        },
                        attrs: { name: s, title: e.text },
                      },
                      [
                        a(
                          "section",
                          {
                            directives: [
                              {
                                name: "show",
                                rawName: "v-show",
                                value:
                                  !e.imageList[0] &&
                                  1 === t.datas.commoditylisttype,
                                expression:
                                  "!item.imageList[0] && datas.commoditylisttype === 1",
                              },
                            ],
                            staticClass: "defaultcommodity",
                            class: [
                              5 === t.datas.commodityType
                                ? "defaultcommodityList5"
                                : "",
                            ],
                            style: {
                              "padding-top": t.datas.commodityMargin + "px",
                              "padding-left": t.datas.pageMargin + "px",
                              "padding-right": t.datas.pageMargin + "px",
                            },
                          },
                          t._l(4, function (e) {
                            return a(
                              "div",
                              {
                                key: e,
                                staticClass: "defaultcommodityList",
                                class: [
                                  0 === t.datas.commodityType
                                    ? "defaultcommodityList0"
                                    : "",
                                  1 === t.datas.commodityType
                                    ? "defaultcommodityList1"
                                    : "",
                                  2 === t.datas.commodityType
                                    ? "defaultcommodityList2"
                                    : "",
                                  3 === t.datas.commodityType
                                    ? "defaultcommodityList3"
                                    : "",
                                  4 === t.datas.commodityType
                                    ? "defaultcommodityList4"
                                    : "",
                                  5 === t.datas.commodityType
                                    ? "defaultcommodityList5"
                                    : "",
                                ],
                                style: {
                                  border:
                                    2 === t.datas.moditystyle
                                      ? "1px solid rgba(50,50,51,0.1)"
                                      : "",
                                  "box-shadow":
                                    1 === t.datas.moditystyle
                                      ? "0 2px 8px rgba(93,113,127,0.08)"
                                      : "",
                                  margin: t.datas.commodityMargin + "px",
                                  width:
                                    1 === t.datas.commodityType
                                      ? 50 - t.datas.commodityMargin / 6 + "%"
                                      : 2 === t.datas.commodityType
                                      ? 33 - t.datas.commodityMargin / 5 + "%"
                                      : 4 === t.datas.commodityType
                                      ? 50 - t.datas.commodityMargin / 5 + "%"
                                      : "",
                                  "border-radius": t.datas.borderRadius + "px",
                                },
                              },
                              [
                                a(
                                  "div",
                                  { staticClass: "bg-pic" },
                                  [
                                    a("img", {
                                      style: {
                                        "border-radius":
                                          t.datas.borderRadius + "px",
                                      },
                                      attrs: {
                                        draggable: "false",
                                        src:
                                          t.$const.IMAGE_DOMAIN +
                                          "/sys/h5/image/imgs.png",
                                        alt: "",
                                      },
                                    }),
                                    a(
                                      "van-tag",
                                      {
                                        directives: [
                                          {
                                            name: "show",
                                            rawName: "v-show",
                                            value:
                                              t.datas.commoditycorner &&
                                              0 === t.datas.commoditycornertype,
                                            expression:
                                              "\n                    datas.commoditycorner && datas.commoditycornertype === 0\n                  ",
                                          },
                                        ],
                                        staticClass: "marks",
                                        style: t.styleString,
                                        attrs: {
                                          mark: "",
                                          color:
                                            t.datas.commodityTagColor ||
                                            t.tagColor,
                                        },
                                      },
                                      [t._v("新品")]
                                    ),
                                    a(
                                      "van-tag",
                                      {
                                        directives: [
                                          {
                                            name: "show",
                                            rawName: "v-show",
                                            value:
                                              t.datas.commoditycorner &&
                                              1 === t.datas.commoditycornertype,
                                            expression:
                                              "\n                    datas.commoditycorner && datas.commoditycornertype === 1\n                  ",
                                          },
                                        ],
                                        staticClass: "marks",
                                        style: t.styleString,
                                        attrs: {
                                          color:
                                            t.datas.commodityTagColor ||
                                            t.tagColor,
                                        },
                                      },
                                      [t._v("热"), a("br"), t._v("卖")]
                                    ),
                                    a(
                                      "van-tag",
                                      {
                                        directives: [
                                          {
                                            name: "show",
                                            rawName: "v-show",
                                            value:
                                              t.datas.commoditycorner &&
                                              2 === t.datas.commoditycornertype,
                                            expression:
                                              "\n                    datas.commoditycorner && datas.commoditycornertype === 2\n                  ",
                                          },
                                        ],
                                        staticClass: "marks",
                                        style: t.styleString,
                                        attrs: {
                                          color:
                                            t.datas.commodityTagColor ||
                                            t.tagColor,
                                        },
                                      },
                                      [t._v("NEW")]
                                    ),
                                    a(
                                      "van-tag",
                                      {
                                        directives: [
                                          {
                                            name: "show",
                                            rawName: "v-show",
                                            value:
                                              t.datas.commoditycorner &&
                                              3 === t.datas.commoditycornertype,
                                            expression:
                                              "\n                    datas.commoditycorner && datas.commoditycornertype === 3\n                  ",
                                          },
                                        ],
                                        staticClass: "marks",
                                        style: t.styleString,
                                        attrs: {
                                          plain: "",
                                          color:
                                            t.datas.commodityTagColor ||
                                            t.tagColor,
                                        },
                                      },
                                      [t._v("HOT")]
                                    ),
                                  ],
                                  1
                                ),
                                a(
                                  "div",
                                  {
                                    staticClass: "text",
                                    style: {
                                      background:
                                        3 !== t.datas.moditystyle
                                          ? "#fff"
                                          : "none",
                                      "border-top-right-radius":
                                        t.datas.borderRadius + "px",
                                      "border-bottom-right-radius":
                                        t.datas.borderRadius + "px",
                                    },
                                  },
                                  [
                                    a(
                                      "h5",
                                      {
                                        style: {
                                          "font-weight": t.datas.textWeight,
                                          "text-align":
                                            "center" === t.datas.positions
                                              ? "center"
                                              : "",
                                        },
                                      },
                                      [t._v(" 这里显示商品名称，最多显示1行 ")]
                                    ),
                                    a(
                                      "p",
                                      {
                                        style: {
                                          "text-align":
                                            "center" === t.datas.positions
                                              ? "center"
                                              : "",
                                        },
                                      },
                                      [t._v(" 这里显示商品描述，最多显示1行 ")]
                                    ),
                                    a("div", { staticClass: "mony" }, [
                                      a(
                                        "span",
                                        {
                                          directives: [
                                            {
                                              name: "show",
                                              rawName: "v-show",
                                              value: t.datas.priceofcommodity,
                                              expression:
                                                "datas.priceofcommodity",
                                            },
                                          ],
                                        },
                                        [a("i", [t._v("￥")]), t._v("99")]
                                      ),
                                      a(
                                        "div",
                                        {
                                          directives: [
                                            {
                                              name: "show",
                                              rawName: "v-show",
                                              value: t.datas.purchasebutton,
                                              expression:
                                                "datas.purchasebutton",
                                            },
                                          ],
                                        },
                                        [
                                          a("van-icon", {
                                            directives: [
                                              {
                                                name: "show",
                                                rawName: "v-show",
                                                value:
                                                  0 ===
                                                  t.datas.purchasebuttonType,
                                                expression:
                                                  "datas.purchasebuttonType === 0",
                                              },
                                            ],
                                            attrs: {
                                              name: "cart-circle-o",
                                              size: "23",
                                            },
                                          }),
                                          a("van-icon", {
                                            directives: [
                                              {
                                                name: "show",
                                                rawName: "v-show",
                                                value:
                                                  1 ===
                                                  t.datas.purchasebuttonType,
                                                expression:
                                                  "datas.purchasebuttonType === 1",
                                              },
                                            ],
                                            attrs: {
                                              name: "add-o",
                                              size: "23",
                                            },
                                          }),
                                          a("van-icon", {
                                            directives: [
                                              {
                                                name: "show",
                                                rawName: "v-show",
                                                value:
                                                  2 ===
                                                  t.datas.purchasebuttonType,
                                                expression:
                                                  "datas.purchasebuttonType === 2",
                                              },
                                            ],
                                            attrs: { name: "add", size: "23" },
                                          }),
                                          a("van-icon", {
                                            directives: [
                                              {
                                                name: "show",
                                                rawName: "v-show",
                                                value:
                                                  3 ===
                                                  t.datas.purchasebuttonType,
                                                expression:
                                                  "datas.purchasebuttonType === 3",
                                              },
                                            ],
                                            attrs: {
                                              name: "cart-o",
                                              size: "23",
                                            },
                                          }),
                                          a(
                                            "em",
                                            {
                                              directives: [
                                                {
                                                  name: "show",
                                                  rawName: "v-show",
                                                  value:
                                                    4 ===
                                                    t.datas.purchasebuttonType,
                                                  expression:
                                                    "datas.purchasebuttonType === 4",
                                                },
                                              ],
                                            },
                                            [t._v(t._s(t.datas.purchase))]
                                          ),
                                          a(
                                            "em",
                                            {
                                              directives: [
                                                {
                                                  name: "show",
                                                  rawName: "v-show",
                                                  value:
                                                    5 ===
                                                    t.datas.purchasebuttonType,
                                                  expression:
                                                    "datas.purchasebuttonType === 5",
                                                },
                                              ],
                                            },
                                            [t._v(t._s(t.datas.purchase))]
                                          ),
                                          a(
                                            "em",
                                            {
                                              directives: [
                                                {
                                                  name: "show",
                                                  rawName: "v-show",
                                                  value:
                                                    6 ===
                                                    t.datas.purchasebuttonType,
                                                  expression:
                                                    "datas.purchasebuttonType === 6",
                                                },
                                              ],
                                            },
                                            [t._v(t._s(t.datas.purchase))]
                                          ),
                                          a(
                                            "em",
                                            {
                                              directives: [
                                                {
                                                  name: "show",
                                                  rawName: "v-show",
                                                  value:
                                                    7 ===
                                                    t.datas.purchasebuttonType,
                                                  expression:
                                                    "datas.purchasebuttonType === 7",
                                                },
                                              ],
                                            },
                                            [t._v(t._s(t.datas.purchase))]
                                          ),
                                        ],
                                        1
                                      ),
                                    ]),
                                  ]
                                ),
                              ]
                            );
                          }),
                          0
                        ),
                        a(
                          "section",
                          {
                            directives: [
                              {
                                name: "show",
                                rawName: "v-show",
                                value:
                                  e.imageList[0] &&
                                  1 === t.datas.commoditylisttype,
                                expression:
                                  "item.imageList[0] && datas.commoditylisttype === 1",
                              },
                            ],
                            staticClass: "defaultcommodity",
                            class: [
                              5 === t.datas.commodityType
                                ? "defaultcommodityList5"
                                : "",
                            ],
                            style: {
                              "padding-top": t.datas.commodityMargin + "px",
                              "padding-left": t.datas.pageMargin + "px",
                              "padding-right": t.datas.pageMargin + "px",
                            },
                          },
                          t._l(e.imageList, function (e, s) {
                            return a(
                              "div",
                              {
                                key: s,
                                staticClass: "defaultcommodityList",
                                class: [
                                  0 === t.datas.commodityType
                                    ? "defaultcommodityList0"
                                    : "",
                                  1 === t.datas.commodityType
                                    ? "defaultcommodityList1"
                                    : "",
                                  2 === t.datas.commodityType
                                    ? "defaultcommodityList2"
                                    : "",
                                  3 === t.datas.commodityType
                                    ? "defaultcommodityList3"
                                    : "",
                                  4 === t.datas.commodityType
                                    ? "defaultcommodityList4"
                                    : "",
                                  5 === t.datas.commodityType
                                    ? "defaultcommodityList5"
                                    : "",
                                ],
                                style: {
                                  border:
                                    2 === t.datas.moditystyle
                                      ? "1px solid rgba(50,50,51,0.1)"
                                      : "",
                                  "box-shadow":
                                    1 === t.datas.moditystyle
                                      ? "0 2px 8px rgba(93,113,127,0.08)"
                                      : "",
                                  margin: t.datas.commodityMargin + "px",
                                  width:
                                    1 === t.datas.commodityType
                                      ? 50 - t.datas.commodityMargin / 6 + "%"
                                      : 2 === t.datas.commodityType
                                      ? 33 - t.datas.commodityMargin / 5 + "%"
                                      : 4 === t.datas.commodityType
                                      ? 50 - t.datas.commodityMargin / 5 + "%"
                                      : "",
                                  "border-radius": t.datas.borderRadius + "px",
                                },
                              },
                              [
                                a(
                                  "div",
                                  { staticClass: "bg-pic" },
                                  [
                                    a("img", {
                                      style: {
                                        "border-radius":
                                          t.datas.borderRadius + "px",
                                      },
                                      attrs: {
                                        draggable: "false",
                                        src: e.coverUrl,
                                        alt: "",
                                      },
                                    }),
                                    a(
                                      "van-tag",
                                      {
                                        directives: [
                                          {
                                            name: "show",
                                            rawName: "v-show",
                                            value:
                                              t.datas.commoditycorner &&
                                              0 === t.datas.commoditycornertype,
                                            expression:
                                              "\n                    datas.commoditycorner && datas.commoditycornertype === 0\n                  ",
                                          },
                                        ],
                                        staticClass: "marks",
                                        style: t.styleString,
                                        attrs: {
                                          mark: "",
                                          color:
                                            t.datas.commodityTagColor ||
                                            t.tagColor,
                                        },
                                      },
                                      [t._v("新品")]
                                    ),
                                    a(
                                      "van-tag",
                                      {
                                        directives: [
                                          {
                                            name: "show",
                                            rawName: "v-show",
                                            value:
                                              t.datas.commoditycorner &&
                                              1 === t.datas.commoditycornertype,
                                            expression:
                                              "\n                    datas.commoditycorner && datas.commoditycornertype === 1\n                  ",
                                          },
                                        ],
                                        staticClass: "marks",
                                        style: t.styleString,
                                        attrs: {
                                          color:
                                            t.datas.commodityTagColor ||
                                            t.tagColor,
                                        },
                                      },
                                      [t._v("热"), a("br"), t._v("卖")]
                                    ),
                                    a(
                                      "van-tag",
                                      {
                                        directives: [
                                          {
                                            name: "show",
                                            rawName: "v-show",
                                            value:
                                              t.datas.commoditycorner &&
                                              2 === t.datas.commoditycornertype,
                                            expression:
                                              "\n                    datas.commoditycorner && datas.commoditycornertype === 2\n                  ",
                                          },
                                        ],
                                        staticClass: "marks",
                                        style: t.styleString,
                                        attrs: {
                                          color:
                                            t.datas.commodityTagColor ||
                                            t.tagColor,
                                        },
                                      },
                                      [t._v("NEW")]
                                    ),
                                    a(
                                      "van-tag",
                                      {
                                        directives: [
                                          {
                                            name: "show",
                                            rawName: "v-show",
                                            value:
                                              t.datas.commoditycorner &&
                                              3 === t.datas.commoditycornertype,
                                            expression:
                                              "\n                    datas.commoditycorner && datas.commoditycornertype === 3\n                  ",
                                          },
                                        ],
                                        staticClass: "marks",
                                        style: t.styleString,
                                        attrs: {
                                          plain: "",
                                          color:
                                            t.datas.commodityTagColor ||
                                            t.tagColor,
                                        },
                                      },
                                      [t._v("HOT")]
                                    ),
                                  ],
                                  1
                                ),
                                a(
                                  "div",
                                  {
                                    staticClass: "text",
                                    style: {
                                      background:
                                        3 !== t.datas.moditystyle
                                          ? "#fff"
                                          : "none",
                                      "border-top-right-radius":
                                        t.datas.borderRadius + "px",
                                      "border-bottom-right-radius":
                                        t.datas.borderRadius + "px",
                                    },
                                  },
                                  [
                                    a(
                                      "h5",
                                      {
                                        style: {
                                          "font-weight": t.datas.textWeight,
                                          "text-align":
                                            "center" === t.datas.positions
                                              ? "center"
                                              : "",
                                        },
                                      },
                                      [t._v(" " + t._s(e.name) + " ")]
                                    ),
                                    a(
                                      "p",
                                      {
                                        style: {
                                          "text-align":
                                            "center" === t.datas.positions
                                              ? "center"
                                              : "",
                                        },
                                      },
                                      [t._v(" " + t._s(e.introduce) + " ")]
                                    ),
                                    t.datas.priceofcommodity ||
                                    t.datas.purchasebutton
                                      ? a("div", { staticClass: "mony" }, [
                                          a(
                                            "span",
                                            {
                                              directives: [
                                                {
                                                  name: "show",
                                                  rawName: "v-show",
                                                  value:
                                                    t.datas.priceofcommodity,
                                                  expression:
                                                    "datas.priceofcommodity",
                                                },
                                              ],
                                            },
                                            [
                                              a("i", [t._v("￥")]),
                                              t._v(" " + t._s(e.price) + " "),
                                            ]
                                          ),
                                          a(
                                            "div",
                                            {
                                              directives: [
                                                {
                                                  name: "show",
                                                  rawName: "v-show",
                                                  value: t.datas.purchasebutton,
                                                  expression:
                                                    "datas.purchasebutton",
                                                },
                                              ],
                                            },
                                            [
                                              a("van-icon", {
                                                directives: [
                                                  {
                                                    name: "show",
                                                    rawName: "v-show",
                                                    value:
                                                      0 ===
                                                      t.datas
                                                        .purchasebuttonType,
                                                    expression:
                                                      "datas.purchasebuttonType === 0",
                                                  },
                                                ],
                                                attrs: {
                                                  name: "cart-circle-o",
                                                  size: "23",
                                                },
                                              }),
                                              a("van-icon", {
                                                directives: [
                                                  {
                                                    name: "show",
                                                    rawName: "v-show",
                                                    value:
                                                      1 ===
                                                      t.datas
                                                        .purchasebuttonType,
                                                    expression:
                                                      "datas.purchasebuttonType === 1",
                                                  },
                                                ],
                                                attrs: {
                                                  name: "add-o",
                                                  size: "23",
                                                },
                                              }),
                                              a("van-icon", {
                                                directives: [
                                                  {
                                                    name: "show",
                                                    rawName: "v-show",
                                                    value:
                                                      2 ===
                                                      t.datas
                                                        .purchasebuttonType,
                                                    expression:
                                                      "datas.purchasebuttonType === 2",
                                                  },
                                                ],
                                                attrs: {
                                                  name: "add",
                                                  size: "23",
                                                },
                                              }),
                                              a("van-icon", {
                                                directives: [
                                                  {
                                                    name: "show",
                                                    rawName: "v-show",
                                                    value:
                                                      3 ===
                                                      t.datas
                                                        .purchasebuttonType,
                                                    expression:
                                                      "datas.purchasebuttonType === 3",
                                                  },
                                                ],
                                                attrs: {
                                                  name: "cart-o",
                                                  size: "23",
                                                },
                                              }),
                                              a(
                                                "em",
                                                {
                                                  directives: [
                                                    {
                                                      name: "show",
                                                      rawName: "v-show",
                                                      value:
                                                        4 ===
                                                        t.datas
                                                          .purchasebuttonType,
                                                      expression:
                                                        "datas.purchasebuttonType === 4",
                                                    },
                                                  ],
                                                },
                                                [t._v(t._s(t.datas.purchase))]
                                              ),
                                              a(
                                                "em",
                                                {
                                                  directives: [
                                                    {
                                                      name: "show",
                                                      rawName: "v-show",
                                                      value:
                                                        5 ===
                                                        t.datas
                                                          .purchasebuttonType,
                                                      expression:
                                                        "datas.purchasebuttonType === 5",
                                                    },
                                                  ],
                                                },
                                                [t._v(t._s(t.datas.purchase))]
                                              ),
                                              a(
                                                "em",
                                                {
                                                  directives: [
                                                    {
                                                      name: "show",
                                                      rawName: "v-show",
                                                      value:
                                                        6 ===
                                                        t.datas
                                                          .purchasebuttonType,
                                                      expression:
                                                        "datas.purchasebuttonType === 6",
                                                    },
                                                  ],
                                                },
                                                [t._v(t._s(t.datas.purchase))]
                                              ),
                                              a(
                                                "em",
                                                {
                                                  directives: [
                                                    {
                                                      name: "show",
                                                      rawName: "v-show",
                                                      value:
                                                        7 ===
                                                        t.datas
                                                          .purchasebuttonType,
                                                      expression:
                                                        "datas.purchasebuttonType === 7",
                                                    },
                                                  ],
                                                },
                                                [t._v(t._s(t.datas.purchase))]
                                              ),
                                            ],
                                            1
                                          ),
                                        ])
                                      : t._e(),
                                  ]
                                ),
                              ]
                            );
                          }),
                          0
                        ),
                      ]
                    );
                  }),
                  1
                ),
              ],
              1
            ),
            a(
              "div",
              [
                a(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value:
                          t.datas.showMore && 2 == t.datas.commoditylisttype,
                        expression:
                          "datas.showMore && datas.commoditylisttype == 2",
                      },
                    ],
                    staticClass: "more",
                    style: {
                      "margin-right": t.datas.pageMargin + "px",
                      "margin-top": "0px",
                    },
                  },
                  [t._v(" 更多》 ")]
                ),
                a("van-tree-select", {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: 2 === t.datas.commoditylisttype,
                      expression: "datas.commoditylisttype === 2",
                    },
                  ],
                  staticClass: "type3",
                  attrs: {
                    height: "auto",
                    items: t.datas.commoditylisttypetab,
                    "main-active-index": t.active,
                  },
                  on: {
                    "update:mainActiveIndex": function (e) {
                      t.active = e;
                    },
                    "update:main-active-index": function (e) {
                      t.active = e;
                    },
                    "click-nav": t.treeSelect,
                  },
                  scopedSlots: t._u([
                    {
                      key: "content",
                      fn: function () {
                        return t._l(
                          t.datas.commoditylisttypetab,
                          function (e, s) {
                            return a("div", { key: s }, [
                              t.active === s
                                ? a(
                                    "section",
                                    {
                                      directives: [
                                        {
                                          name: "show",
                                          rawName: "v-show",
                                          value: !e.imageList[0],
                                          expression: "!item.imageList[0]",
                                        },
                                      ],
                                      staticClass: "defaultcommodity",
                                      style: {
                                        "padding-top":
                                          t.datas.commodityMargin + "px",
                                        "padding-left":
                                          t.datas.pageMargin + "px",
                                        "padding-right":
                                          t.datas.pageMargin + "px",
                                      },
                                    },
                                    t._l(4, function (e) {
                                      return a(
                                        "div",
                                        {
                                          key: e,
                                          staticClass:
                                            "defaultcommodityList defaultcommodityList3",
                                          style: {
                                            border:
                                              2 === t.datas.moditystyle
                                                ? "1px solid rgba(50,50,51,0.1)"
                                                : "",
                                            "box-shadow":
                                              1 === t.datas.moditystyle
                                                ? "0 2px 8px rgba(93,113,127,0.08)"
                                                : "",
                                            margin:
                                              t.datas.commodityMargin + "px",
                                            "border-radius":
                                              t.datas.borderRadius + "px",
                                          },
                                        },
                                        [
                                          a(
                                            "div",
                                            { staticClass: "bg-pic" },
                                            [
                                              a("img", {
                                                style: {
                                                  "border-radius":
                                                    t.datas.borderRadius + "px",
                                                },
                                                attrs: {
                                                  draggable: "false",
                                                  src:
                                                    t.$const.IMAGE_DOMAIN +
                                                    "/sys/h5/image/imgs.png",
                                                  alt: "",
                                                },
                                              }),
                                              a(
                                                "van-tag",
                                                {
                                                  directives: [
                                                    {
                                                      name: "show",
                                                      rawName: "v-show",
                                                      value:
                                                        t.datas
                                                          .commoditycorner &&
                                                        0 ===
                                                          t.datas
                                                            .commoditycornertype,
                                                      expression:
                                                        "\n                      datas.commoditycorner && datas.commoditycornertype === 0\n                    ",
                                                    },
                                                  ],
                                                  staticClass: "marks",
                                                  style: t.styleString,
                                                  attrs: {
                                                    mark: "",
                                                    color:
                                                      t.datas
                                                        .commodityTagColor ||
                                                      t.tagColor,
                                                  },
                                                },
                                                [t._v("新品")]
                                              ),
                                              a(
                                                "van-tag",
                                                {
                                                  directives: [
                                                    {
                                                      name: "show",
                                                      rawName: "v-show",
                                                      value:
                                                        t.datas
                                                          .commoditycorner &&
                                                        1 ===
                                                          t.datas
                                                            .commoditycornertype,
                                                      expression:
                                                        "\n                      datas.commoditycorner && datas.commoditycornertype === 1\n                    ",
                                                    },
                                                  ],
                                                  staticClass: "marks",
                                                  style: t.styleString,
                                                  attrs: {
                                                    color:
                                                      t.datas
                                                        .commodityTagColor ||
                                                      t.tagColor,
                                                  },
                                                },
                                                [
                                                  t._v("热"),
                                                  a("br"),
                                                  t._v("卖"),
                                                ]
                                              ),
                                              a(
                                                "van-tag",
                                                {
                                                  directives: [
                                                    {
                                                      name: "show",
                                                      rawName: "v-show",
                                                      value:
                                                        t.datas
                                                          .commoditycorner &&
                                                        2 ===
                                                          t.datas
                                                            .commoditycornertype,
                                                      expression:
                                                        "\n                      datas.commoditycorner && datas.commoditycornertype === 2\n                    ",
                                                    },
                                                  ],
                                                  staticClass: "marks",
                                                  style: t.styleString,
                                                  attrs: {
                                                    color:
                                                      t.datas
                                                        .commodityTagColor ||
                                                      t.tagColor,
                                                  },
                                                },
                                                [t._v("NEW")]
                                              ),
                                              a(
                                                "van-tag",
                                                {
                                                  directives: [
                                                    {
                                                      name: "show",
                                                      rawName: "v-show",
                                                      value:
                                                        t.datas
                                                          .commoditycorner &&
                                                        3 ===
                                                          t.datas
                                                            .commoditycornertype,
                                                      expression:
                                                        "\n                      datas.commoditycorner && datas.commoditycornertype === 3\n                    ",
                                                    },
                                                  ],
                                                  staticClass: "marks",
                                                  style: t.styleString,
                                                  attrs: {
                                                    plain: "",
                                                    color:
                                                      t.datas
                                                        .commodityTagColor ||
                                                      t.tagColor,
                                                  },
                                                },
                                                [t._v("HOT")]
                                              ),
                                            ],
                                            1
                                          ),
                                          a(
                                            "div",
                                            {
                                              staticClass: "text",
                                              style: {
                                                background:
                                                  3 !== t.datas.moditystyle
                                                    ? "#fff"
                                                    : "none",
                                                "border-top-right-radius":
                                                  t.datas.borderRadius + "px",
                                                "border-bottom-right-radius":
                                                  t.datas.borderRadius + "px",
                                              },
                                            },
                                            [
                                              a(
                                                "h5",
                                                {
                                                  style: {
                                                    "font-weight":
                                                      t.datas.textWeight,
                                                    "text-align":
                                                      "center" ===
                                                      t.datas.positions
                                                        ? "center"
                                                        : "",
                                                  },
                                                },
                                                [
                                                  t._v(
                                                    " 这里显示商品名称，最多显示1行 "
                                                  ),
                                                ]
                                              ),
                                              a(
                                                "p",
                                                {
                                                  style: {
                                                    "text-align":
                                                      "center" ===
                                                      t.datas.positions
                                                        ? "center"
                                                        : "",
                                                  },
                                                },
                                                [
                                                  t._v(
                                                    " 这里显示商品描述，最多显示1行 "
                                                  ),
                                                ]
                                              ),
                                              a(
                                                "div",
                                                { staticClass: "mony" },
                                                [
                                                  a(
                                                    "span",
                                                    {
                                                      directives: [
                                                        {
                                                          name: "show",
                                                          rawName: "v-show",
                                                          value:
                                                            t.datas
                                                              .priceofcommodity,
                                                          expression:
                                                            "datas.priceofcommodity",
                                                        },
                                                      ],
                                                    },
                                                    [
                                                      a("i", [t._v("￥")]),
                                                      t._v("99"),
                                                    ]
                                                  ),
                                                  a(
                                                    "div",
                                                    {
                                                      directives: [
                                                        {
                                                          name: "show",
                                                          rawName: "v-show",
                                                          value:
                                                            t.datas
                                                              .purchasebutton,
                                                          expression:
                                                            "datas.purchasebutton",
                                                        },
                                                      ],
                                                    },
                                                    [
                                                      a("van-icon", {
                                                        directives: [
                                                          {
                                                            name: "show",
                                                            rawName: "v-show",
                                                            value:
                                                              0 ===
                                                              t.datas
                                                                .purchasebuttonType,
                                                            expression:
                                                              "datas.purchasebuttonType === 0",
                                                          },
                                                        ],
                                                        attrs: {
                                                          name: "cart-circle-o",
                                                          size: "23",
                                                        },
                                                      }),
                                                      a("van-icon", {
                                                        directives: [
                                                          {
                                                            name: "show",
                                                            rawName: "v-show",
                                                            value:
                                                              1 ===
                                                              t.datas
                                                                .purchasebuttonType,
                                                            expression:
                                                              "datas.purchasebuttonType === 1",
                                                          },
                                                        ],
                                                        attrs: {
                                                          name: "add-o",
                                                          size: "23",
                                                        },
                                                      }),
                                                      a("van-icon", {
                                                        directives: [
                                                          {
                                                            name: "show",
                                                            rawName: "v-show",
                                                            value:
                                                              2 ===
                                                              t.datas
                                                                .purchasebuttonType,
                                                            expression:
                                                              "datas.purchasebuttonType === 2",
                                                          },
                                                        ],
                                                        attrs: {
                                                          name: "add",
                                                          size: "23",
                                                        },
                                                      }),
                                                      a("van-icon", {
                                                        directives: [
                                                          {
                                                            name: "show",
                                                            rawName: "v-show",
                                                            value:
                                                              3 ===
                                                              t.datas
                                                                .purchasebuttonType,
                                                            expression:
                                                              "datas.purchasebuttonType === 3",
                                                          },
                                                        ],
                                                        attrs: {
                                                          name: "cart-o",
                                                          size: "23",
                                                        },
                                                      }),
                                                      a(
                                                        "em",
                                                        {
                                                          directives: [
                                                            {
                                                              name: "show",
                                                              rawName: "v-show",
                                                              value:
                                                                4 ===
                                                                t.datas
                                                                  .purchasebuttonType,
                                                              expression:
                                                                "datas.purchasebuttonType === 4",
                                                            },
                                                          ],
                                                        },
                                                        [
                                                          t._v(
                                                            t._s(
                                                              t.datas.purchase
                                                            )
                                                          ),
                                                        ]
                                                      ),
                                                      a(
                                                        "em",
                                                        {
                                                          directives: [
                                                            {
                                                              name: "show",
                                                              rawName: "v-show",
                                                              value:
                                                                5 ===
                                                                t.datas
                                                                  .purchasebuttonType,
                                                              expression:
                                                                "datas.purchasebuttonType === 5",
                                                            },
                                                          ],
                                                        },
                                                        [
                                                          t._v(
                                                            t._s(
                                                              t.datas.purchase
                                                            )
                                                          ),
                                                        ]
                                                      ),
                                                      a(
                                                        "em",
                                                        {
                                                          directives: [
                                                            {
                                                              name: "show",
                                                              rawName: "v-show",
                                                              value:
                                                                6 ===
                                                                t.datas
                                                                  .purchasebuttonType,
                                                              expression:
                                                                "datas.purchasebuttonType === 6",
                                                            },
                                                          ],
                                                        },
                                                        [
                                                          t._v(
                                                            t._s(
                                                              t.datas.purchase
                                                            )
                                                          ),
                                                        ]
                                                      ),
                                                      a(
                                                        "em",
                                                        {
                                                          directives: [
                                                            {
                                                              name: "show",
                                                              rawName: "v-show",
                                                              value:
                                                                7 ===
                                                                t.datas
                                                                  .purchasebuttonType,
                                                              expression:
                                                                "datas.purchasebuttonType === 7",
                                                            },
                                                          ],
                                                        },
                                                        [
                                                          t._v(
                                                            t._s(
                                                              t.datas.purchase
                                                            )
                                                          ),
                                                        ]
                                                      ),
                                                    ],
                                                    1
                                                  ),
                                                ]
                                              ),
                                            ]
                                          ),
                                        ]
                                      );
                                    }),
                                    0
                                  )
                                : t._e(),
                              t.active === s
                                ? a(
                                    "section",
                                    {
                                      directives: [
                                        {
                                          name: "show",
                                          rawName: "v-show",
                                          value: e.imageList[0],
                                          expression: "item.imageList[0]",
                                        },
                                      ],
                                      staticClass: "defaultcommodity",
                                      style: {
                                        "padding-top":
                                          t.datas.commodityMargin + "px",
                                        "padding-left":
                                          t.datas.pageMargin + "px",
                                        "padding-right":
                                          t.datas.pageMargin + "px",
                                      },
                                    },
                                    t._l(e.imageList, function (e, s) {
                                      return a(
                                        "div",
                                        {
                                          key: s,
                                          staticClass:
                                            "defaultcommodityList defaultcommodityList3",
                                          style: {
                                            border:
                                              2 === t.datas.moditystyle
                                                ? "1px solid rgba(50,50,51,0.1)"
                                                : "",
                                            "box-shadow":
                                              1 === t.datas.moditystyle
                                                ? "0 2px 8px rgba(93,113,127,0.08)"
                                                : "",
                                            margin:
                                              t.datas.commodityMargin + "px",
                                            "border-radius":
                                              t.datas.borderRadius + "px",
                                          },
                                        },
                                        [
                                          a(
                                            "div",
                                            { staticClass: "bg-pic" },
                                            [
                                              a("img", {
                                                style: {
                                                  "border-radius":
                                                    t.datas.borderRadius + "px",
                                                },
                                                attrs: {
                                                  draggable: "false",
                                                  src: e.coverUrl,
                                                  alt: "",
                                                },
                                              }),
                                              a(
                                                "van-tag",
                                                {
                                                  directives: [
                                                    {
                                                      name: "show",
                                                      rawName: "v-show",
                                                      value:
                                                        t.datas
                                                          .commoditycorner &&
                                                        0 ===
                                                          t.datas
                                                            .commoditycornertype,
                                                      expression:
                                                        "\n                      datas.commoditycorner && datas.commoditycornertype === 0\n                    ",
                                                    },
                                                  ],
                                                  staticClass: "marks",
                                                  style: t.styleString,
                                                  attrs: {
                                                    mark: "",
                                                    color:
                                                      t.datas
                                                        .commodityTagColor ||
                                                      t.tagColor,
                                                  },
                                                },
                                                [t._v("新品")]
                                              ),
                                              a(
                                                "van-tag",
                                                {
                                                  directives: [
                                                    {
                                                      name: "show",
                                                      rawName: "v-show",
                                                      value:
                                                        t.datas
                                                          .commoditycorner &&
                                                        1 ===
                                                          t.datas
                                                            .commoditycornertype,
                                                      expression:
                                                        "\n                      datas.commoditycorner && datas.commoditycornertype === 1\n                    ",
                                                    },
                                                  ],
                                                  staticClass: "marks",
                                                  style: t.styleString,
                                                  attrs: {
                                                    color:
                                                      t.datas
                                                        .commodityTagColor ||
                                                      t.tagColor,
                                                  },
                                                },
                                                [
                                                  t._v("热"),
                                                  a("br"),
                                                  t._v("卖"),
                                                ]
                                              ),
                                              a(
                                                "van-tag",
                                                {
                                                  directives: [
                                                    {
                                                      name: "show",
                                                      rawName: "v-show",
                                                      value:
                                                        t.datas
                                                          .commoditycorner &&
                                                        2 ===
                                                          t.datas
                                                            .commoditycornertype,
                                                      expression:
                                                        "\n                      datas.commoditycorner && datas.commoditycornertype === 2\n                    ",
                                                    },
                                                  ],
                                                  staticClass: "marks",
                                                  style: t.styleString,
                                                  attrs: {
                                                    color:
                                                      t.datas
                                                        .commodityTagColor ||
                                                      t.tagColor,
                                                  },
                                                },
                                                [t._v("NEW")]
                                              ),
                                              a(
                                                "van-tag",
                                                {
                                                  directives: [
                                                    {
                                                      name: "show",
                                                      rawName: "v-show",
                                                      value:
                                                        t.datas
                                                          .commoditycorner &&
                                                        3 ===
                                                          t.datas
                                                            .commoditycornertype,
                                                      expression:
                                                        "\n                      datas.commoditycorner && datas.commoditycornertype === 3\n                    ",
                                                    },
                                                  ],
                                                  staticClass: "marks",
                                                  style: t.styleString,
                                                  attrs: {
                                                    plain: "",
                                                    color:
                                                      t.datas
                                                        .commodityTagColor ||
                                                      t.tagColor,
                                                  },
                                                },
                                                [t._v("HOT")]
                                              ),
                                            ],
                                            1
                                          ),
                                          a(
                                            "div",
                                            {
                                              staticClass: "text",
                                              style: {
                                                background:
                                                  3 !== t.datas.moditystyle
                                                    ? "#fff"
                                                    : "none",
                                                "border-top-right-radius":
                                                  t.datas.borderRadius + "px",
                                                "border-bottom-right-radius":
                                                  t.datas.borderRadius + "px",
                                              },
                                            },
                                            [
                                              a(
                                                "h5",
                                                {
                                                  style: {
                                                    "font-weight":
                                                      t.datas.textWeight,
                                                    "text-align":
                                                      "center" ===
                                                      t.datas.positions
                                                        ? "center"
                                                        : "",
                                                  },
                                                },
                                                [t._v(" " + t._s(e.name) + " ")]
                                              ),
                                              a(
                                                "p",
                                                {
                                                  style: {
                                                    "text-align":
                                                      "center" ===
                                                      t.datas.positions
                                                        ? "center"
                                                        : "",
                                                  },
                                                },
                                                [
                                                  t._v(
                                                    " " +
                                                      t._s(e.introduce) +
                                                      " "
                                                  ),
                                                ]
                                              ),
                                              t.datas.priceofcommodity ||
                                              t.datas.purchasebutton
                                                ? a(
                                                    "div",
                                                    { staticClass: "mony" },
                                                    [
                                                      a(
                                                        "span",
                                                        {
                                                          directives: [
                                                            {
                                                              name: "show",
                                                              rawName: "v-show",
                                                              value:
                                                                t.datas
                                                                  .priceofcommodity,
                                                              expression:
                                                                "datas.priceofcommodity",
                                                            },
                                                          ],
                                                        },
                                                        [
                                                          a("i", [t._v("￥")]),
                                                          t._v(
                                                            " " +
                                                              t._s(e.price) +
                                                              " "
                                                          ),
                                                        ]
                                                      ),
                                                      a(
                                                        "div",
                                                        {
                                                          directives: [
                                                            {
                                                              name: "show",
                                                              rawName: "v-show",
                                                              value:
                                                                t.datas
                                                                  .purchasebutton,
                                                              expression:
                                                                "datas.purchasebutton",
                                                            },
                                                          ],
                                                        },
                                                        [
                                                          a("van-icon", {
                                                            directives: [
                                                              {
                                                                name: "show",
                                                                rawName:
                                                                  "v-show",
                                                                value:
                                                                  0 ===
                                                                  t.datas
                                                                    .purchasebuttonType,
                                                                expression:
                                                                  "datas.purchasebuttonType === 0",
                                                              },
                                                            ],
                                                            attrs: {
                                                              name: "cart-circle-o",
                                                              size: "23",
                                                            },
                                                          }),
                                                          a("van-icon", {
                                                            directives: [
                                                              {
                                                                name: "show",
                                                                rawName:
                                                                  "v-show",
                                                                value:
                                                                  1 ===
                                                                  t.datas
                                                                    .purchasebuttonType,
                                                                expression:
                                                                  "datas.purchasebuttonType === 1",
                                                              },
                                                            ],
                                                            attrs: {
                                                              name: "add-o",
                                                              size: "23",
                                                            },
                                                          }),
                                                          a("van-icon", {
                                                            directives: [
                                                              {
                                                                name: "show",
                                                                rawName:
                                                                  "v-show",
                                                                value:
                                                                  2 ===
                                                                  t.datas
                                                                    .purchasebuttonType,
                                                                expression:
                                                                  "datas.purchasebuttonType === 2",
                                                              },
                                                            ],
                                                            attrs: {
                                                              name: "add",
                                                              size: "23",
                                                            },
                                                          }),
                                                          a("van-icon", {
                                                            directives: [
                                                              {
                                                                name: "show",
                                                                rawName:
                                                                  "v-show",
                                                                value:
                                                                  3 ===
                                                                  t.datas
                                                                    .purchasebuttonType,
                                                                expression:
                                                                  "datas.purchasebuttonType === 3",
                                                              },
                                                            ],
                                                            attrs: {
                                                              name: "cart-o",
                                                              size: "23",
                                                            },
                                                          }),
                                                          a(
                                                            "em",
                                                            {
                                                              directives: [
                                                                {
                                                                  name: "show",
                                                                  rawName:
                                                                    "v-show",
                                                                  value:
                                                                    4 ===
                                                                    t.datas
                                                                      .purchasebuttonType,
                                                                  expression:
                                                                    "datas.purchasebuttonType === 4",
                                                                },
                                                              ],
                                                            },
                                                            [
                                                              t._v(
                                                                t._s(
                                                                  t.datas
                                                                    .purchase
                                                                )
                                                              ),
                                                            ]
                                                          ),
                                                          a(
                                                            "em",
                                                            {
                                                              directives: [
                                                                {
                                                                  name: "show",
                                                                  rawName:
                                                                    "v-show",
                                                                  value:
                                                                    5 ===
                                                                    t.datas
                                                                      .purchasebuttonType,
                                                                  expression:
                                                                    "datas.purchasebuttonType === 5",
                                                                },
                                                              ],
                                                            },
                                                            [
                                                              t._v(
                                                                t._s(
                                                                  t.datas
                                                                    .purchase
                                                                )
                                                              ),
                                                            ]
                                                          ),
                                                          a(
                                                            "em",
                                                            {
                                                              directives: [
                                                                {
                                                                  name: "show",
                                                                  rawName:
                                                                    "v-show",
                                                                  value:
                                                                    6 ===
                                                                    t.datas
                                                                      .purchasebuttonType,
                                                                  expression:
                                                                    "datas.purchasebuttonType === 6",
                                                                },
                                                              ],
                                                            },
                                                            [
                                                              t._v(
                                                                t._s(
                                                                  t.datas
                                                                    .purchase
                                                                )
                                                              ),
                                                            ]
                                                          ),
                                                          a(
                                                            "em",
                                                            {
                                                              directives: [
                                                                {
                                                                  name: "show",
                                                                  rawName:
                                                                    "v-show",
                                                                  value:
                                                                    7 ===
                                                                    t.datas
                                                                      .purchasebuttonType,
                                                                  expression:
                                                                    "datas.purchasebuttonType === 7",
                                                                },
                                                              ],
                                                            },
                                                            [
                                                              t._v(
                                                                t._s(
                                                                  t.datas
                                                                    .purchase
                                                                )
                                                              ),
                                                            ]
                                                          ),
                                                        ],
                                                        1
                                                      ),
                                                    ]
                                                  )
                                                : t._e(),
                                            ]
                                          ),
                                        ]
                                      );
                                    }),
                                    0
                                  )
                                : t._e(),
                            ]);
                          }
                        );
                      },
                      proxy: !0,
                    },
                  ]),
                }),
              ],
              1
            ),
            t._t("deles"),
          ],
          2
        );
      },
      i = [],
      o =
        (a("159b"),
        {
          name: "listswitching",
          props: { datas: Object },
          data: function () {
            return {
              active1: 0,
              active: 0,
              listSwitchName: null,
              tagColor: "#07c160",
              styleString: {},
            };
          },
          created: function () {},
          mounted: function () {
            var t = this;
            this.$nextTick(function () {
              t.$refs[t.listSwitchName] &&
                (t.$refs[t.listSwitchName][0].querySelector(
                  ".van-sidebar-item--select"
                ).style.borderColor = t.datas.tabColor),
                (t.listSwitchName =
                  "listswitching" +
                  document.querySelectorAll(".listswitching").length),
                t.tagPositionStyle();
            });
          },
          methods: {
            treeSelect: function (t) {
              var e = this;
              setTimeout(function () {
                e.$refs[e.listSwitchName]
                  .querySelectorAll(".van-sidebar-item")
                  .forEach(function (e, a) {
                    a !== t && (e.style.borderColor = "transparent");
                  }),
                  (e.$refs[e.listSwitchName].querySelector(
                    ".van-sidebar-item--select"
                  ).style.borderColor = e.datas.tabColor);
              });
            },
            tagPositionStyle: function () {
              switch (
                ((this.styleString = { position: "absolute" }),
                this.datas.tagPosition)
              ) {
                case 0:
                  (this.styleString.top = "5px"),
                    (this.styleString.left = "0px");
                  break;
                case 1:
                  (this.styleString.bottom = "5px"),
                    (this.styleString.left = "0px");
                  break;
                case 2:
                  (this.styleString.top = "5px"),
                    (this.styleString.right = "0px"),
                    0 === this.datas.commoditycornertype &&
                      (this.styleString.borderRadius =
                        "10px 0px 0px 10px !important");
                  break;
                case 3:
                  (this.styleString.bottom = "5px"),
                    (this.styleString.right = "0px"),
                    0 === this.datas.commoditycornertype &&
                      (this.styleString.borderRadius =
                        "10px 0px 0px 10px !important");
                  break;
              }
            },
          },
          watch: {
            "datas.tabColor": function () {
              (this.$refs[this.listSwitchName].querySelector(
                ".van-tabs__line"
              ).style.backgroundColor = this.datas.tabColor),
                (this.$refs[this.listSwitchName].querySelector(
                  ".van-sidebar-item--select"
                ).style.borderColor = this.datas.tabColor);
            },
            "datas.commoditylisttype": function () {
              2 === this.datas.commoditylisttype &&
                (this.$refs[this.listSwitchName].querySelector(
                  ".van-sidebar-item--select"
                ).style.borderColor = this.datas.tabColor);
            },
            "datas.tagPosition": function () {
              this.tagPositionStyle();
            },
            "datas.commoditycornertype": function () {
              this.tagPositionStyle();
            },
          },
        }),
      n = o,
      r = (a("2d37"), a("2877")),
      c = Object(r["a"])(n, s, i, !1, null, "6d01af30", null);
    e["default"] = c.exports;
  },
  2395: function (t, e, a) {},
  2619: function (t, e, a) {
    "use strict";
    a("0c59");
  },
  "2aa4": function (t, e, a) {
    "use strict";
    a.r(e);
    var s = function () {
        var t = this,
          e = t.$createElement,
          a = t._self._c || e;
        return a(
          "div",
          {
            class:
              t.valueCom && t.complete
                ? "vk-data-goods-sku-popup show"
                : "vk-data-goods-sku-popup none",
            style: t.baseStyle,
          },
          [
            a("div", {
              staticClass: "mask",
              on: {
                click: function (e) {
                  return t.close("mask");
                },
                touchmove: function (t) {
                  t.preventDefault();
                },
              },
            }),
            a(
              "div",
              {
                staticClass: "layer attr-content",
                class: { "safe-area-inset-bottom": t.safeAreaInsetBottom },
                style: t.baseStyle2,
              },
              [
                a("div", { staticClass: "specification-wrapper" }, [
                  a("div", { staticClass: "specification-wrapper-content" }, [
                    a("div", { staticClass: "specification-header" }, [
                      a(
                        "div",
                        { staticClass: "specification-left" },
                        [
                          a("van-image", {
                            staticClass: "product-img",
                            attrs: {
                              src: t.selectShop.image
                                ? t.selectShop.image
                                : t.goodsInfo[t.goodsThumbName],
                            },
                            on: { click: t.previewImage },
                          }),
                        ],
                        1
                      ),
                      a("div", { staticClass: "specification-right" }, [
                        a(
                          "div",
                          {
                            staticClass: "price-content",
                            style: { color: t.themeColorFn("priceColor") },
                          },
                          [
                            a("span", { staticClass: "sign" }, [t._v("¥")]),
                            a(
                              "span",
                              {
                                staticClass: "price",
                                class: t.priceCom.length > 16 ? "price2" : "",
                              },
                              [t._v(t._s(t.priceCom))]
                            ),
                          ]
                        ),
                        t.hideStock
                          ? a("div", { staticClass: "inventory" })
                          : a("div", { staticClass: "inventory" }, [
                              t._v(t._s(t.stockText) + "：" + t._s(t.stockCom)),
                            ]),
                        a(
                          "div",
                          {
                            directives: [
                              {
                                name: "show",
                                rawName: "v-show",
                                value: t.isManyCom,
                                expression: "isManyCom",
                              },
                            ],
                            staticClass: "choose",
                          },
                          [t._v("已选：" + t._s(t.selectArr.join(" ")))]
                        ),
                      ]),
                    ]),
                    a(
                      "div",
                      { staticClass: "specification-content" },
                      [
                        t._l(t.goodsInfo[t.specListName], function (e, s) {
                          return a(
                            "div",
                            {
                              directives: [
                                {
                                  name: "show",
                                  rawName: "v-show",
                                  value: t.isManyCom,
                                  expression: "isManyCom",
                                },
                              ],
                              key: s,
                              staticClass: "specification-item",
                            },
                            [
                              a("div", { staticClass: "item-title" }, [
                                t._v(t._s(e.name)),
                              ]),
                              a(
                                "div",
                                { staticClass: "item-wrapper" },
                                t._l(e.list, function (e, i) {
                                  return a(
                                    "div",
                                    {
                                      key: i,
                                      staticClass: "item-content",
                                      class: [
                                        e.ishow ? "" : "noactived",
                                        t.subIndex[s] == i ? "actived" : "",
                                      ],
                                      style: [
                                        e.ishow
                                          ? ""
                                          : t.themeColorFn("disableStyle"),
                                        e.ishow
                                          ? t.themeColorFn("btnStyle")
                                          : "",
                                        t.subIndex[s] == i
                                          ? t.themeColorFn("activedStyle")
                                          : "",
                                      ],
                                      on: {
                                        click: function (a) {
                                          return t.skuClick(e, s, i);
                                        },
                                      },
                                    },
                                    [t._v(" " + t._s(e.name) + " ")]
                                  );
                                }),
                                0
                              ),
                            ]
                          );
                        }),
                        a("div", { staticClass: "number-box-view" }, [
                          a("div", { staticStyle: { flex: "1" } }, [
                            t._v("数量"),
                          ]),
                          a(
                            "div",
                            {
                              staticStyle: { flex: "4", "text-align": "right" },
                            },
                            [
                              a("van-stepper", {
                                attrs: { min: 1, max: t.maxBuyNumCom },
                                model: {
                                  value: t.selectNum,
                                  callback: function (e) {
                                    t.selectNum = e;
                                  },
                                  expression: "selectNum",
                                },
                              }),
                            ],
                            1
                          ),
                        ]),
                      ],
                      2
                    ),
                    a("div", [
                      t.outFoStock || 4 == t.mode
                        ? a("div", { staticClass: "btn-wrapper" }, [
                            a(
                              "div",
                              {
                                staticClass: "sure",
                                staticStyle: {
                                  color: "#ffffff",
                                  "background-color": "#cccccc",
                                },
                              },
                              [t._v(t._s(t.noStockText))]
                            ),
                          ])
                        : 1 == t.mode
                        ? a("div", { staticClass: "btn-wrapper" }, [
                            a(
                              "div",
                              {
                                staticClass: "sure add-cart",
                                staticStyle: {
                                  "border-radius": "20.98px 0px 0px 20.98px",
                                },
                                style: {
                                  color: t.themeColorFn("addCartColor"),
                                  backgroundColor: t.themeColorFn(
                                    "addCartBackgroundColor"
                                  ),
                                },
                                on: { click: t.addCart },
                              },
                              [t._v(" " + t._s(t.addCartText) + " ")]
                            ),
                            a(
                              "div",
                              {
                                staticClass: "sure",
                                staticStyle: {
                                  "border-radius": "0px 20.98px 20.98px 0px",
                                },
                                style: {
                                  color: t.themeColorFn("buyNowColor"),
                                  backgroundColor: t.themeColorFn(
                                    "buyNowBackgroundColor"
                                  ),
                                },
                                on: { click: t.buyNow },
                              },
                              [t._v(" " + t._s(t.buyNowText) + " ")]
                            ),
                          ])
                        : 2 == t.mode
                        ? a("div", { staticClass: "btn-wrapper" }, [
                            a(
                              "div",
                              {
                                staticClass: "sure add-cart",
                                style: {
                                  color: t.themeColorFn("addCartColor"),
                                  backgroundColor: t.themeColorFn(
                                    "addCartBackgroundColor"
                                  ),
                                },
                                on: { click: t.addCart },
                              },
                              [t._v(" " + t._s(t.addCartText) + " ")]
                            ),
                          ])
                        : 3 == t.mode
                        ? a("div", { staticClass: "btn-wrapper" }, [
                            a(
                              "div",
                              {
                                staticClass: "sure1",
                                style: {
                                  color: t.themeColorFn("buyNowColor"),
                                  backgroundColor: t.themeColorFn(
                                    "buyNowBackgroundColor"
                                  ),
                                },
                                on: { click: t.buyNow },
                              },
                              [t._v(" " + t._s(t.buyNowText) + " ")]
                            ),
                          ])
                        : t._e(),
                    ]),
                  ]),
                  0 != t.showClose
                    ? a(
                        "div",
                        {
                          staticClass: "close",
                          on: {
                            click: function (e) {
                              return t.close("close");
                            },
                          },
                        },
                        [
                          a("image", {
                            staticClass: "close-item",
                            attrs: { src: t.closeImage },
                          }),
                        ]
                      )
                    : t._e(),
                ]),
              ]
            ),
          ]
        );
      },
      i = [],
      o = a("53ca"),
      n = a("2909"),
      r = a("1da1"),
      c =
        (a("96cf"),
        a("a9e3"),
        a("d81d"),
        a("b0c0"),
        a("4de4"),
        a("99af"),
        a("ac1f"),
        a("5319"),
        a("159b"),
        a("b680"),
        a("28a2")),
      d = {},
      l = {
        name: "vk-data-goods-sku-popup",
        emits: [
          "update:modelValue",
          "input",
          "update-goods",
          "open",
          "close",
          "add-cart",
          "buy-now",
          "cart",
          "buy",
          "num-change",
        ],
        components: { ImagePreview: c["a"] },
        props: {
          goodsDetail: { Type: Object, default: null },
          value: { Type: Boolean, default: !1 },
          modelValue: { Type: Boolean, default: !1 },
          goodsId: { Type: String, default: "" },
          noStockText: { Type: String, default: "该商品已抢完" },
          stockText: { Type: String, default: "库存" },
          goodsIdName: { Type: String, default: "_id" },
          skuIdName: { Type: String, default: "_id" },
          skuListName: { Type: String, default: "sku_list" },
          specListName: { Type: String, default: "spec_list" },
          stockName: { Type: String, default: "stock" },
          skuArrName: { Type: String, default: "sku_name_arr" },
          defaultSingleSkuName: { Type: String, default: "默认" },
          mode: { Type: Number, default: 1 },
          maskCloseAble: { Type: Boolean, default: !0 },
          borderRadius: { Type: [String, Number], default: 0 },
          goodsThumbName: { Type: [String], default: "goods_thumb" },
          goodsThumbBackgroundColor: { Type: String, default: "transparent" },
          minBuyNum: { Type: [Number, String], default: 1 },
          maxBuyNum: { Type: [Number, String], default: 1e5 },
          stepBuyNum: { Type: [Number, String], default: 1 },
          stepStrictly: { Type: Boolean, default: !1 },
          localdata: { type: Object },
          priceColor: { Type: String },
          buyNowText: { Type: String, default: "立即购买" },
          buyNowColor: { Type: String },
          buyNowBackgroundColor: { Type: String },
          addCartText: { Type: String, default: "加入购物车" },
          addCartColor: { Type: String },
          addCartBackgroundColor: { Type: String },
          disableStyle: { Type: Object, default: null },
          activedStyle: { Type: Object, default: null },
          btnStyle: { Type: Object, default: null },
          showClose: { Type: Boolean, default: !0 },
          closeImage: {
            Type: String,
            default:
              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAEyUlEQVR42sSZeWwNURTGp4OqtBo7sSXELragdkpQsRRJ1Zr4hyJiJ9YgxNIg1qANiT+E1i5IY0kVVWtQEbuEKLFGUSH27/ANN5PXmTvzupzkl/tm8t6b7517lnvvC0lKSjJ8WmnQAUSDFqABqALKgl8gD7wE90E2SAeXwFf1SxISErQeVtKHwCgwFsSDSIf3hYFKoCkYDBaDdyAViHdueHmoF6FtwDLQ23b/E7gM7oIcejIERIDaoBFoC8qA8mA8SQNz6W1XC9GY+nCQCCYAk/c+gF0gBZwH312+IxR0BCPBUIaH2A+wHsxHCHxx+gLT5QGN6a2JfG8uvVCDws9oiDQYlxkMGfHyQvARlADTwcXk5OT6foV2kS8ATXidymlcyen1a/Jjl9IJh3hPkjELYqO8Cu0KjjNZvtETw5jFBWXPmGSTGQKSeOn5iQ0kVLL0CINfPNcPbDMKyRCbGzEMBJ+ZD8cChYFdqGTqfsWT8otPGoVsEHsMwxDFs3shNsxJ6BrQ0Po8OGUUkVHsNCVml+cntB1jUWwn2GEUsTEMrASbDK+2CCQ0kYX6nfLLisMmKqUr0S60M+jG10vAm+JSCa8+x7CKlzHwaktV6DiObzUzPJIxFO1BQ12wGtTReO9GetVgY/kjNJzZbcWmTjHfxw51AsRqvL8eOAtmsJuFu3g1l+1ZLB5eDTVZ3K0P7tL0TkWOpSg61kVkBtuuNRthGs+wtJST5aQI7cEbkkRXNYVKgX6kIdYuUhYzMQwxN8tiExCLFqHNeSF9/aem0BzGp5PYQCJ7c/Gsk1RfuSD6U1dNpcDf9ZigTmKbMRZ9iVTsHscGJluW2FMf1SSQWGnBmaB6kCJVTVVNJZE++Cx9drEllS1KMCINpURFmEbBWA63Fz9s95cGIdJgp/zXmT4pZcOvSUzuZttTbblmnc3PIjjmidDXvKgdhMh0JdbzuCjWrbNOVovjS5P7bkPJ/mBESkz2BO0166ybNeJ431S2q+01NntuIq3E0amzjiZtk9tssWyTDzO4525bACK9NAUn68TtkNhpEXpOSagRml+S6iLSSeweHv242Qhl13rRyvoDvDlKyTQny/ZQJ+1iH7vVbEx7OR5UiKVIO7VicgvHCtwrudloMIV7/0uadVYW57O4Wvvi8v4pymlKkrpwvsDeLLZAY2pkwbAB3PSQfC+4cH7l4k1ZH8zkZRq8ecO+Z5rN40JJqnXFuGfaxPCTLjcn0OZOpnArXw8HY4paIbw5CcMgXq6HN2/mt6+XGLrN15tBryIUGavMpCTrfKcDCKkAceA9S8nhAOehhSUyhXpkBxxnP4YM1InugP7cBkjBPcqVUWFYCEROxXiQz5JlXV+IfKh7mpfJac+lZ6V87QXVClBkTc7YWsWTPSDyitfzUTlJlj8TbvE6jluDOdwZ+jX57GLO3ADeuyZrDYi86vV81FD2UVGsmT+5Zl0BnkhoseOEaogL46pqO4v/IqUEyalIR4h85BgjHv6+aUWRMbb7EstX6O0cpT1Gco0ry8fWygLDMjmDnQeBt3Qe7uVfkeugDwVLcsVzGsuwLXbV+I63XNAkG5r/hvgRqgqWs6pJPKrsbvz/Q6yyun0w/h6lP+BnzrCpfPMT2L8FGAA7k1GZ/vnaqAAAAABJRU5ErkJggg==",
          },
          hideStock: { Type: Boolean, default: !1 },
          theme: { Type: String, default: "default" },
          defaultSelect: { Type: Object },
          useCache: { Type: Boolean, default: !0 },
          defaultGoods: { Type: Object },
          amountType: { Type: Number, default: 1 },
          selectedInit: { Type: Boolean, default: !1 },
          safeAreaInsetBottom: { Type: Boolean, default: !0 },
        },
        data: function () {
          return {
            complete: !1,
            goodsInfo: {},
            isShow: !1,
            initKey: !0,
            shopItemInfo: {},
            selectArr: [],
            subIndex: [],
            selectShop: {},
            selectNum: this.minBuyNum || 1,
            outFoStock: !1,
            openTime: 0,
            baseStyle: {},
            baseStyle2: {},
            themeColor: {
              default: {
                priceColor: "rgb(254, 86, 10)",
                buyNowColor: "#ffffff",
                buyNowBackgroundColor: "rgb(254, 86, 10)",
                addCartColor: "#ffffff",
                addCartBackgroundColor: "rgb(255, 148, 2)",
                btnStyle: {
                  color: "#333333",
                  borderColor: "#f4f4f4",
                  backgroundColor: "#ffffff",
                },
                activedStyle: {
                  color: "rgb(254, 86, 10)",
                  borderColor: "rgb(254, 86, 10)",
                  backgroundColor: "rgba(254,86,10,0.1)",
                },
                disableStyle: {
                  color: "#c3c3c3",
                  borderColor: "#f6f6f6",
                  backgroundColor: "#f6f6f6",
                },
              },
              "red-black": {
                priceColor: "rgb(255, 68, 68)",
                buyNowColor: "#ffffff",
                buyNowBackgroundColor: "rgb(255, 68, 68)",
                addCartColor: "#ffffff",
                addCartBackgroundColor: "rgb(85, 85, 85)",
                activedStyle: {
                  color: "rgb(255, 68, 68)",
                  borderColor: "rgb(255, 68, 68)",
                  backgroundColor: "rgba(255,68,68,0.1)",
                },
              },
              "black-white": {
                priceColor: "rgb(47, 47, 52)",
                buyNowColor: "#ffffff",
                buyNowBackgroundColor: "rgb(47, 47, 52)",
                addCartColor: "rgb(47, 47, 52)",
                addCartBackgroundColor: "rgb(235, 236, 242)",
                activedStyle: {
                  color: "rgb(47, 47, 52)",
                  borderColor: "rgba(47,47,52,0.12)",
                  backgroundColor: "rgba(47,47,52,0.12)",
                },
              },
              coffee: {
                priceColor: "rgb(195, 167, 105)",
                buyNowColor: "#ffffff",
                buyNowBackgroundColor: "rgb(195, 167, 105)",
                addCartColor: "rgb(195, 167, 105)",
                addCartBackgroundColor: "rgb(243, 238, 225)",
                activedStyle: {
                  color: "rgb(195, 167, 105)",
                  borderColor: "rgb(195, 167, 105)",
                  backgroundColor: "rgba(195, 167, 105,0.1)",
                },
              },
              green: {
                priceColor: "rgb(99, 190, 114)",
                buyNowColor: "#ffffff",
                buyNowBackgroundColor: "rgb(99, 190, 114)",
                addCartColor: "rgb(99, 190, 114)",
                addCartBackgroundColor: "rgb(225, 244, 227)",
                activedStyle: {
                  color: "rgb(99, 190, 114)",
                  borderColor: "rgb(99, 190, 114)",
                  backgroundColor: "rgba(99, 190, 114,0.1)",
                },
              },
            },
          };
        },
        created: function () {
          var t = this;
          t.$common.isMobile()
            ? (t.baseStyle = { left: "0", right: "0" })
            : (t.baseStyle2 = {
                width: "375px",
                display: "flex",
                "justify-content": "center",
                "align-items": "center",
              }),
            (t.baseStyle2[t.borderRadius] =
              t.borderRadius + "px " + t.borderRadius + "px 0 0"),
            t.valueCom && t.open();
        },
        mounted: function () {},
        methods: {
          init: function (t) {
            var e = this;
            (e.selectArr = []),
              (e.subIndex = []),
              (e.selectShop = {}),
              (e.selectNum = e.minBuyNum || 1),
              (e.outFoStock = !1),
              (e.shopItemInfo = {});
            var a = e.specListName;
            e.goodsInfo[a].map(function (t) {
              e.selectArr.push(""), e.subIndex.push(-1);
            }),
              e.checkItem(),
              e.checkInpath(-1),
              t || e.autoClickSku();
          },
          updateValue: function (t) {
            var e = this;
            t
              ? (e.$emit("open", !0),
                e.$emit("input", !0),
                e.$emit("update:modelValue", !0))
              : (e.$emit("input", !1),
                e.$emit("close", "close"),
                e.$emit("update:modelValue", !1));
          },
          updateGoodsInfo: function (t) {
            var e = this,
              a = e.skuListName;
            "{}" === JSON.stringify(e.goodsInfo) ||
            e.goodsInfo[e.goodsIdName] !== t[e.goodsIdName]
              ? ((e.goodsInfo = t), (e.initKey = !0))
              : (e.goodsInfo[a] = t[a]),
              e.initKey && ((e.initKey = !1), e.init());
            var s = e.getListItem(
              e.goodsInfo[a],
              e.skuIdName,
              e.selectShop[e.skuIdName]
            );
            Object.assign(e.selectShop, s),
              e.defaultSelectSku(),
              (e.complete = !0);
          },
          open: function () {
            var t = this;
            return Object(r["a"])(
              regeneratorRuntime.mark(function e() {
                var a, s;
                return regeneratorRuntime.wrap(function (e) {
                  while (1)
                    switch ((e.prev = e.next)) {
                      case 0:
                        (a = t),
                          (a.openTime = new Date().getTime()),
                          !0,
                          a.skuListName,
                          (s = a.goodsDetail),
                          s ? a.updateGoodsInfo(s) : (a.complete = !1),
                          a.$emit("open", "open");
                      case 7:
                      case "end":
                        return e.stop();
                    }
                }, e);
              })
            )();
          },
          close: function (t) {
            var e = this;
            if (new Date().getTime() - e.openTime < 400) return !1;
            "mask" == t
              ? !1 !== e.maskCloseAble &&
                (e.$emit("input", !1),
                e.$emit("close", "mask"),
                e.$emit("update:modelValue", !1))
              : (e.$emit("input", !1),
                e.$emit("close", "close"),
                e.$emit("update:modelValue", !1));
          },
          moveHandle: function () {},
          skuClick: function (t, e, a) {
            var s = this;
            t.ishow &&
              (s.selectArr[e] != t.name
                ? (s.$set(s.selectArr, e, t.name), s.$set(s.subIndex, e, a))
                : (s.$set(s.selectArr, e, ""), s.$set(s.subIndex, e, -1)),
              s.checkInpath(e),
              s.checkSelectShop());
          },
          checkSelectShop: function () {
            var t = this;
            if (
              t.selectArr.every(function (t) {
                return "" != t;
              })
            ) {
              t.selectShop = t.shopItemInfo[t.getArrayToSting(t.selectArr)];
              var e = t.selectShop[t.stockName];
              "undefined" !== typeof e && t.selectNum > e && (t.selectNum = e),
                t.selectNum > t.maxBuyNum && (t.selectNum = t.maxBuyNum),
                t.selectNum < t.minBuyNum && (t.selectNum = t.minBuyNum),
                t.selectedInit && (t.selectNum = t.minBuyNum || 1);
            } else t.selectShop = {};
          },
          checkInpath: function (t) {
            for (
              var e = this,
                a = e.specListName,
                s = e.goodsInfo[a],
                i = 0,
                o = s.length;
              i < o;
              i++
            )
              if (i != t)
                for (var r = s[i].list.length, c = 0; c < r; c++)
                  if (-1 == e.subIndex[i] || c != e.subIndex[i]) {
                    var d = Object(n["a"])(e.selectArr);
                    e.$set(d, i, s[i].list[c].name);
                    var l = d.filter(function (t) {
                      return "" !== t && "undefined" !== typeof t;
                    });
                    e.shopItemInfo.hasOwnProperty(e.getArrayToSting(l))
                      ? (s[i].list[c].ishow = !0)
                      : (s[i].list[c].ishow = !1);
                  }
            e.$set(e.goodsInfo, a, s);
          },
          checkItem: function () {
            var t = this,
              e = t.stockName,
              a = t.skuListName,
              s = t.goodsInfo[a],
              i = [],
              o = 0;
            s.map(function (t, a) {
              t[e] > 0 && (i.push(t), (o += t[e]));
            }),
              o <= 0 && (t.outFoStock = !0);
            i.reduce(
              function (e, a) {
                return e.concat(
                  a[t.skuArrName].reduce(
                    function (e, s) {
                      return e.concat(
                        e.map(function (e) {
                          return (
                            t.shopItemInfo.hasOwnProperty(
                              t.getArrayToSting(
                                [].concat(Object(n["a"])(e), [s])
                              )
                            ) ||
                              (t.shopItemInfo[
                                t.getArrayToSting(
                                  [].concat(Object(n["a"])(e), [s])
                                )
                              ] = a),
                            [].concat(Object(n["a"])(e), [s])
                          );
                        })
                      );
                    },
                    [[]]
                  )
                );
              },
              [[]]
            );
          },
          getArrayToSting: function (t) {
            var e = "";
            return (
              t.map(function (t, a) {
                (t = t.replace(/\./g, "。")), (e += 0 == a ? t : "," + t);
              }),
              e
            );
          },
          checkSelectComplete: function () {
            var t =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : {},
              e = this,
              a = new Date().getTime();
            if (e.clickTime && a - e.clickTime < 400) return !1;
            e.clickTime = a;
            var s = e.selectShop,
              i = e.selectNum,
              o = (e.stockText, e.stockName);
            return (
              !(!s || !s[e.skuIdName]) &&
              !(i <= 0) &&
              !(i > s[o]) &&
              void ("function" == typeof t.success && t.success(s))
            );
          },
          addCart: function () {
            var t = this;
            t.checkSelectComplete({
              success: function (e) {
                (e.buy_num = t.selectNum),
                  t.$emit("add-cart", e),
                  t.$emit("cart", e);
              },
            });
          },
          buyNow: function () {
            var t = this;
            t.checkSelectComplete({
              success: function (e) {
                (e.buy_num = t.selectNum),
                  t.$emit("buy-now", e),
                  t.$emit("buy", e);
              },
            });
          },
          getListItem: function (t, e, a) {
            var s;
            for (var i in t)
              if ("object" == Object(o["a"])(a)) {
                if (JSON.stringify(t[i][e]) === JSON.stringify(a)) {
                  s = t[i];
                  break;
                }
              } else if (t[i][e] === a) {
                s = t[i];
                break;
              }
            return s;
          },
          getListIndex: function (t, e, a) {
            for (var s = -1, i = 0; i < t.length; i++)
              if (t[i][e] === a) {
                s = i;
                break;
              }
            return s;
          },
          autoClickSku: function () {
            var t = this,
              e = t.stockName,
              a = t.goodsInfo[t.skuListName],
              s = t.goodsInfo[t.specListName];
            if (1 == s.length)
              for (var i = s[0].list, o = 0; o < i.length; o++) {
                var n = t.getListItem(a, t.skuArrName, [i[o].name]);
                if (n && n[e] > 0) {
                  t.skuClick(i[o], 0, o);
                  break;
                }
              }
            else
              s.length > 0 &&
                s.forEach(function (e, a) {
                  for (var s = e.list, i = 0; i < s.length; i++)
                    0 == i && t.skuClick(s[i], a, i);
                });
          },
          themeColorFn: function (t) {
            var e = this,
              a = e.theme,
              s = e.themeColor,
              i = e[t] ? e[t] : s[a][t];
            return i;
          },
          defaultSelectSku: function () {
            var t = this,
              e = t.defaultSelect;
            e && e.sku && e.sku.length > 0 && t.selectSku(e);
          },
          selectSku: function () {
            var t =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : {},
              e = this,
              a = t.sku,
              s = t.num,
              i = e.goodsInfo[e.specListName];
            if (a && i.length === a.length) {
              for (var o = [], n = !0, r = 0; r < a.length; r++) {
                var c = a[r],
                  d = i[r].list,
                  l = r,
                  u = e.getListIndex(d, "name", c);
                if (-1 == u) {
                  n = !1;
                  break;
                }
                o.push({ spec: d[u], index1: l, index2: u });
              }
              n &&
                (e.init(!0),
                o.map(function (t) {
                  e.skuClick(t.spec, t.index1, t.index2);
                }));
            }
            s > 0 && (e.selectNum = s);
          },
          priceFilter: function () {
            var t =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : 0,
              e = this;
            return (
              "string" == typeof t && (t = parseFloat(t)),
              0 === e.amountType ? t.toFixed(2) : (t / 100).toFixed(2)
            );
          },
          pushGoodsCache: function (t) {
            var e = this,
              a = e.goodsIdName;
            d[t[a]] = t;
          },
          stop: function () {},
          previewImage: function () {
            var t = this,
              e = t.selectShop,
              a = t.goodsInfo,
              s = t.goodsThumbName,
              i = e.image ? e.image : a[s];
            i && Object(c["a"])({ images: [i], closeable: !0 });
          },
          getMaxStock: function () {
            var t = 0,
              e = this,
              a = e.selectShop,
              s = void 0 === a ? {} : a,
              i = e.goodsInfo,
              o = void 0 === i ? {} : i,
              n = e.skuListName,
              r = e.stockName;
            if (s[r]) t = s[r];
            else {
              var c = o[n];
              if (c && c.length > 0) {
                var d = [];
                c.map(function (t, e) {
                  d.push(t[r]);
                });
                var l = Math.max.apply(Math, d);
                t = l;
              }
            }
            return t;
          },
          numChange: function (t) {
            this.$emit("num-change", t.value);
          },
        },
        computed: {
          valueCom: function () {
            return this.value;
          },
          maxBuyNumCom: function () {
            var t = this,
              e = t.getMaxStock(),
              a = t.maxBuyNum || 1e5;
            return a > e && (a = e), a;
          },
          isManyCom: function () {
            var t = this,
              e = t.goodsInfo,
              a = t.defaultSingleSkuName,
              s = t.specListName,
              i = !0;
            return (
              e[s] &&
                1 === e[s].length &&
                1 === e[s][0].list.length &&
                e[s][0].name === a &&
                (i = !1),
              i
            );
          },
          priceCom: function () {
            var t = "",
              e = this,
              a = e.selectShop,
              s = void 0 === a ? {} : a,
              i = e.goodsInfo,
              o = void 0 === i ? {} : i,
              n = e.skuListName,
              r = e.skuIdName;
            if (s[r]) t = e.priceFilter(s.price);
            else {
              var c = o[n];
              if (c && c.length > 0) {
                var d = [];
                c.map(function (t, e) {
                  d.push(t.price);
                });
                var l = e.priceFilter(Math.min.apply(Math, d)),
                  u = e.priceFilter(Math.max.apply(Math, d));
                t = l === u ? l + "" : "".concat(l, " - ").concat(u);
              }
            }
            return t;
          },
          stockCom: function () {
            var t = "",
              e = this,
              a = e.selectShop,
              s = void 0 === a ? {} : a,
              i = e.goodsInfo,
              o = void 0 === i ? {} : i,
              n = e.skuListName,
              r = e.stockName;
            if (s[r]) t = s[r];
            else {
              var c = o[n];
              if (c && c.length > 0) {
                var d = [];
                c.map(function (t, e) {
                  d.push(t[r]);
                });
                var l = Math.min.apply(Math, d),
                  u = Math.max.apply(Math, d);
                t = l === u ? l : "".concat(l, " - ").concat(u);
              }
            }
            return t;
          },
        },
        watch: {
          valueCom: function (t, e) {
            var a = this;
            t && a.open();
          },
          defaultGoods: {
            immediate: !0,
            handler: function (t, e) {
              var a = this,
                s = a.goodsIdName;
              "object" === Object(o["a"])(t) &&
                t &&
                t[s] &&
                !d[t[s]] &&
                a.pushGoodsCache(t);
            },
          },
        },
      },
      u = l,
      p = (a("455c"), a("2877")),
      m = Object(p["a"])(u, s, i, !1, null, "46666339", null);
    e["default"] = m.exports;
  },
  "2ce5": function (t, e, a) {
    "use strict";
    a("c1ea");
  },
  "2d37": function (t, e, a) {
    "use strict";
    a("8169");
  },
  "37c4": function (t, e, a) {},
  "3ba5": function (t, e, a) {},
  "3e85": function (t, e, a) {
    "use strict";
    a("046d");
  },
  "3eaa": function (t, e, a) {
    "use strict";
    a.r(e);
    var s = function () {
        var t = this,
          e = t.$createElement,
          a = t._self._c || e;
        return a(
          "div",
          { staticClass: "xsactive" },
          [
            a(
              "van-swipe",
              {
                staticClass: "my-swipe",
                attrs: { autoplay: 5e3, "lazy-render": "" },
                on: { change: t.onChange },
                scopedSlots: t._u([
                  {
                    key: "indicator",
                    fn: function () {
                      return [
                        a("div", { staticClass: "custom-indicator" }, [
                          t._v(
                            t._s(t.current + 1) +
                              "/" +
                              t._s(t.datas.imageList.length)
                          ),
                        ]),
                      ];
                    },
                    proxy: !0,
                  },
                ]),
              },
              t._l(t.datas.imageList, function (t, e) {
                return a("van-swipe-item", { key: e }, [
                  a("img", { attrs: { src: t.src } }),
                ]);
              }),
              1
            ),
            a("div", { staticClass: "goods-price-info" }, [
              a("div", { staticClass: "goods-price-left" }, [
                a("div", { staticClass: "discount-t ellipsis" }, [
                  t._v("活动价 ￥ "),
                  a("label", { staticClass: "goods-maxprice" }, [
                    t._v(t._s(t.datas.price)),
                  ]),
                  t.datas.orPrice && t.datas.price
                    ? a("div", { staticClass: "barClass" }, [
                        t._v(
                          " 直降" +
                            t._s(
                              (t.datas.orPrice - t.datas.price)
                                .toString()
                                .indexOf(".") > 0
                                ? (t.datas.orPrice - t.datas.price).toFixed(2)
                                : t.datas.orPrice - t.datas.price
                            ) +
                            "元 "
                        ),
                      ])
                    : t._e(),
                ]),
                a("div", { staticClass: "goods-price-wrap" }, [
                  a("label", { staticClass: "goods-minprice" }, [
                    t._v("即将恢复￥" + t._s(t.datas.orPrice)),
                  ]),
                  a("label", { staticClass: "goods-minprice" }, [
                    t._v("仅限" + t._s(t.datas.num) + "件"),
                  ]),
                ]),
              ]),
              a(
                "div",
                { staticClass: "goods-price-right" },
                [
                  a(
                    "div",
                    { staticClass: "jinsheng" },
                    [
                      a("van-icon", { attrs: { name: "clock" } }),
                      a("label", [t._v("限时活动")]),
                    ],
                    1
                  ),
                  a("van-count-down", {
                    attrs: { time: t.getTime() },
                    scopedSlots: t._u([
                      {
                        key: "default",
                        fn: function (e) {
                          return [
                            a("span", { staticClass: "block" }, [
                              t._v(t._s(e.hours)),
                            ]),
                            a("span", { staticClass: "colon" }, [t._v(":")]),
                            a("span", { staticClass: "block" }, [
                              t._v(t._s(e.minutes)),
                            ]),
                            a("span", { staticClass: "colon" }, [t._v(":")]),
                            a("span", { staticClass: "block" }, [
                              t._v(t._s(e.seconds)),
                            ]),
                          ];
                        },
                      },
                    ]),
                  }),
                ],
                1
              ),
            ]),
            a("div", { staticClass: "h5_card" }, [
              a("div", [
                a(
                  "label",
                  {
                    staticClass: "goods-label ellipsis",
                    staticStyle: {
                      "background-color": "#e04133",
                      "border-radius": "5px",
                    },
                  },
                  [t._v(t._s(t.datas.label))]
                ),
                a("label", { staticClass: "goods-title2" }, [
                  t._v(t._s(t.datas.goodsName)),
                ]),
              ]),
            ]),
            a(
              "div",
              {
                staticClass: "van-coupon",
                staticStyle: {
                  margin: "0 5px 5px",
                  "border-top-left-radius": "0",
                  "border-top-right-radius": "0",
                  "box-shadow": "none",
                  "-webkit-box-shadow": "none",
                  height: "150px",
                },
              },
              [
                a("div", { staticClass: "van-nav-bar van-hairline--bottom " }, [
                  a("div", { staticClass: "van-nav-bar__content" }, [
                    a(
                      "div",
                      {
                        staticClass:
                          "van-nav-bar__title van-ellipsis titleClass",
                      },
                      [t._v(t._s(t.datas.bzName))]
                    ),
                  ]),
                ]),
                a("div", { staticClass: "dataClass" }, [
                  t._m(0),
                  a("div", { staticClass: "steps" }, [
                    a("div", { staticClass: "steptext " }, [
                      t._v(t._s(t.datas.step1)),
                    ]),
                    a("div", { staticClass: "steptext " }, [
                      t._v(t._s(t.datas.step2)),
                    ]),
                    a("div", { staticClass: "steptext " }, [
                      t._v(t._s(t.datas.step3)),
                    ]),
                  ]),
                ]),
              ]
            ),
            t._t("deles"),
          ],
          2
        );
      },
      i = [
        function () {
          var t = this,
            e = t.$createElement,
            a = t._self._c || e;
          return a("div", { staticClass: "steps" }, [
            a("span", { staticClass: "step step-1" }, [t._v("1")]),
            a("div", { staticClass: "van-step__line1" }),
            a("span", { staticClass: "step step-2" }, [t._v("2")]),
            a("div", { staticClass: "van-step__line1" }),
            a("span", { staticClass: "step step-3" }, [t._v("3")]),
          ]);
        },
      ],
      o =
        (a("a9e3"),
        {
          name: "xsactive",
          props: { datas: Object },
          data: function () {
            return { current: 0 };
          },
          methods: {
            onChange: function (t) {
              this.current = t;
            },
            getTime: function () {
              var t = this.datas.day || 0,
                e = this.datas.hour || 0,
                a = this.datas.minutes || 0,
                s = this.datas.second || 0,
                i =
                  Number(3600 * t * 24) +
                  Number(3600 * e) +
                  Number(60 * a) +
                  Number(s);
              return 1e3 * i;
            },
          },
        }),
      n = o,
      r = (a("3e85"), a("2877")),
      c = Object(r["a"])(n, s, i, !1, null, "9dd03932", null);
    e["default"] = c.exports;
  },
  "3fe5": function (t, e, a) {},
  "429e": function (t, e, a) {},
  "455c": function (t, e, a) {
    "use strict";
    a("e1cc");
  },
  4870: function (t, e, a) {
    "use strict";
    a.r(e);
    var s = function () {
        var t = this,
          e = t.$createElement,
          a = t._self._c || e;
        return a(
          "div",
          {
            staticClass: "captiontext",
            style: { background: t.datas.backColor },
          },
          [
            a(
              "div",
              {
                staticStyle: { padding: "6px 0" },
                style: {
                  "border-bottom": t.datas.borderBott
                    ? "1px solid #F9F9F9"
                    : "1px solid #fff",
                },
              },
              [
                t.datas.name
                  ? a(
                      "h2",
                      {
                        style: {
                          "font-size": t.datas.wordSize + "px",
                          "font-weight": t.datas.wordWeight,
                          color: t.datas.wordColor,
                          "text-align": t.datas.positions,
                          height: t.datas.wordHeight + "px",
                          "line-height": t.datas.wordHeight + "px",
                          "padding-right":
                            "center" !== t.datas.positions && t.datas.more.show
                              ? "60px"
                              : "0",
                        },
                      },
                      [t._v(" " + t._s(t.datas.name) + " ")]
                    )
                  : t._e(),
                t.datas.description
                  ? a(
                      "p",
                      {
                        staticStyle: { "margin-top": "8px" },
                        style: {
                          "font-size": t.datas.descriptionSize + "px",
                          "font-weight": t.datas.descriptionWeight,
                          color: t.datas.descriptionColor,
                          "text-align": t.datas.positions,
                        },
                      },
                      [t._v(" " + t._s(t.datas.description) + " ")]
                    )
                  : t._e(),
                a(
                  "p",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: t.datas.more.show,
                        expression: "datas.more.show",
                      },
                    ],
                    staticClass: "more",
                    class: "center" !== t.datas.positions ? "lef" : "",
                    style: {
                      color: 0 === t.datas.more.type ? "#38f" : "",
                      top: (t.datas.wordHeight - 6) / 2 + "px",
                    },
                  },
                  [
                    t._v(
                      " " +
                        t._s(2 === t.datas.more.type ? "" : t.datas.more.text) +
                        " "
                    ),
                    a("span", [
                      t._v(" " + t._s(0 === t.datas.more.type ? "" : ">")),
                    ]),
                  ]
                ),
              ]
            ),
            t._t("deles"),
          ],
          2
        );
      },
      i = [],
      o = { name: "captiontext", props: { datas: Object } },
      n = o,
      r = (a("1061"), a("2877")),
      c = Object(r["a"])(n, s, i, !1, null, "3cfef22a", null);
    e["default"] = c.exports;
  },
  "48ab": function (t, e, a) {
    "use strict";
    a("fdfa");
  },
  "4e3b": function (t, e, a) {
    "use strict";
    a.r(e);
    var s = function () {
        var t = this,
          e = t.$createElement,
          a = t._self._c || e;
        return a(
          "div",
          { staticClass: "richtext", style: { background: t.datas.backColor } },
          [
            t.datas.myValue.length
              ? a("section", {
                  domProps: { innerHTML: t._s(t.unescape(t.datas.myValue)) },
                })
              : a("img", {
                  attrs: {
                    draggable: "false",
                    src: t.$const.IMAGE_DOMAIN + "/sys/h5/image/fwb.png",
                    alt: "",
                  },
                }),
            t._t("deles"),
          ],
          2
        );
      },
      i = [],
      o =
        (a("ac1f"),
        a("5319"),
        {
          name: "richtext",
          props: { datas: Object },
          methods: {
            unescape: function (t) {
              return t
                .replace(t ? /&(?!#?\w+;)/g : /&/g, "&amp;")
                .replace(/&lt;/g, "<")
                .replace(/&gt;/g, ">")
                .replace(/&quot;/g, '"');
            },
          },
        }),
      n = o,
      r = (a("dc74"), a("2877")),
      c = Object(r["a"])(n, s, i, !1, null, "ed3810d6", null);
    e["default"] = c.exports;
  },
  "4ee2": function (t, e, a) {},
  "4ee6": function (t, e, a) {
    "use strict";
    a.r(e);
    var s = function () {
        var t = this,
          e = t.$createElement,
          a = t._self._c || e;
        return a(
          "div",
          { staticClass: "payfans" },
          [
            a("div", { staticClass: "pingtuan-box" }, [
              a("div", { staticClass: "pd-box" }, [
                a("span", { staticClass: "pd-box-text" }, [
                  t._v("正在拼单 立即参与"),
                ]),
                a(
                  "div",
                  { staticClass: "pd-box-info" },
                  [
                    a(
                      "van-row",
                      [
                        a(
                          "van-col",
                          { attrs: { span: "12" } },
                          [
                            t.randomPeopleList
                              ? a(
                                  "van-swipe",
                                  {
                                    staticStyle: { height: "40px" },
                                    attrs: {
                                      vertical: "",
                                      autoplay: 3e3,
                                      touchable: !1,
                                      "show-indicators": !1,
                                    },
                                  },
                                  t._l(t.randomPeopleList, function (e, s) {
                                    return a("van-swipe-item", { key: s }, [
                                      a(
                                        "div",
                                        {
                                          staticStyle: {
                                            "text-align": "left",
                                            "margin-left": "20px",
                                          },
                                        },
                                        [
                                          a("img", {
                                            attrs: {
                                              referrerpolicy: "no-referrer",
                                              src: e.avatar,
                                            },
                                          }),
                                          a("span", { staticClass: "text_7" }, [
                                            t._v(t._s(e.people)),
                                          ]),
                                        ]
                                      ),
                                    ]);
                                  }),
                                  1
                                )
                              : t._e(),
                          ],
                          1
                        ),
                        a("van-col", { attrs: { span: "12" } }, [
                          a("div", { staticClass: "text-wrapper_1" }, [
                            a("span", { staticClass: "text_8" }, [
                              t._v("还剩"),
                            ]),
                            a("span", { staticClass: "text_9" }, [t._v("1人")]),
                            a("span", { staticClass: "text_8" }, [
                              t._v(
                                "拼成，剩余" +
                                  t._s(t.minutes) +
                                  ":" +
                                  t._s(t.seconds)
                              ),
                            ]),
                          ]),
                        ]),
                      ],
                      1
                    ),
                  ],
                  1
                ),
              ]),
            ]),
            a(
              "div",
              { staticClass: "buy-box" },
              [
                a(
                  "van-row",
                  [
                    a(
                      "van-col",
                      {
                        attrs: { span: "8" },
                        on: {
                          click: function (e) {
                            return t.openPay(t.datas.price.originPrice);
                          },
                        },
                      },
                      [
                        a("div", { staticClass: "text-group_2" }, [
                          a("div", { staticClass: "text-wrapper_2" }, [
                            a("span", { staticClass: "text_11" }, [
                              t._v(t._s(t.datas.price.originPrice)),
                            ]),
                            t._v(" "),
                            a("span", { staticClass: "text_12" }, [t._v("元")]),
                          ]),
                          a("span", { staticClass: "text_13" }, [
                            t._v("单独购买"),
                          ]),
                        ]),
                      ]
                    ),
                    a(
                      "van-col",
                      {
                        attrs: { span: "16" },
                        on: {
                          click: function (e) {
                            return t.openPay(t.datas.price.price);
                          },
                        },
                      },
                      [
                        a("span", { staticClass: "text_14" }, [
                          t._v(t._s(t.datas.price.price)),
                        ]),
                        t._v(" "),
                        a("span", { staticClass: "text_15" }, [t._v("元拼单")]),
                      ]
                    ),
                  ],
                  1
                ),
              ],
              1
            ),
            a(
              "div",
              { staticClass: "aggree-box" },
              [
                a(
                  "van-checkbox",
                  {
                    attrs: { "icon-size": "15px" },
                    model: {
                      value: t.aggreeRatio,
                      callback: function (e) {
                        t.aggreeRatio = e;
                      },
                      expression: "aggreeRatio",
                    },
                  },
                  [
                    a("span", { staticClass: "text_4" }, [
                      t._v("我已阅读并同意"),
                    ]),
                    a(
                      "span",
                      {
                        staticClass: "text_5",
                        on: {
                          click: function (e) {
                            t.showState = !0;
                          },
                        },
                      },
                      [t._v("《个人信息授权与保护声明》")]
                    ),
                  ]
                ),
              ],
              1
            ),
            a(
              "van-action-sheet",
              {
                attrs: { title: "个人信息授权与保护声明" },
                model: {
                  value: t.showState,
                  callback: function (e) {
                    t.showState = e;
                  },
                  expression: "showState",
                },
              },
              [a("state", { attrs: { state: t.datas.state } })],
              1
            ),
            a(
              "van-overlay",
              { attrs: { show: t.showPay } },
              [
                t.showPay
                  ? a("pay", {
                      attrs: { pay: t.datas.pay },
                      on: {
                        close: function (e) {
                          t.showPay = !1;
                        },
                      },
                    })
                  : t._e(),
              ],
              1
            ),
            t._t("deles"),
          ],
          2
        );
      },
      i = [],
      o = (a("4d90"), a("1a97")),
      n = a("c216"),
      r = {
        name: "payfans",
        components: { state: o["default"], pay: n["default"] },
        props: { datas: Object },
        setup: function () {},
        data: function () {
          return {
            aggreeRatio: !1,
            showState: !1,
            randomPeopleList: [],
            showPay: !1,
            minutes: null,
            seconds: null,
          };
        },
        created: function () {
          this.addData();
        },
        mounted: function () {
          (this.datas.pay.price = 0), this.countDown();
        },
        methods: {
          getRandomAvatar: function (t) {
            var e = "";
            return (
              (e =
                1 == t || 2 == t
                  ? Math.floor(300 * Math.random()) + 1 + ""
                  : Math.floor(200 * Math.random()) + 1 + ""),
              (e = e.padStart(3, "0")),
              "https://oss1.modsty.com/avatar/2022" + t + e + "12.jpg"
            );
          },
          addData: function () {
            for (var t = 0; t < 20; t++)
              this.randomPeopleList.push({
                avatar: this.getRandomAvatar(
                  (Math.floor(10 * Math.random()) + 1) % 2 == 0 ? 1 : 2
                ),
                people: this.getrandomName(t),
              });
          },
          getrandomName: function (t) {
            var e = [
              "用心守候",
              "沈新正",
              "啊心",
              "余生各自安好",
              "幸福人生",
              "阿白",
              "a前程似锦",
              "龘尐",
              "心",
              "晶晶",
              "丽芬",
              "努尔💕",
              "飞飞",
              "红姐",
              "雪",
              "明天会更好🌸 🌸",
              "傲娇の妖精",
              "懂",
              "ᦦ🐏莫℘࿐연",
              "飘雨",
              "卖女孩的小火柴",
            ];
            return e[t];
          },
          openPay: function (t) {
            (this.datas.pay.price = t),
              this.aggreeRatio
                ? (this.showPay = !0)
                : this.$toast("请先阅读并同意个人信息授权与保护声明", "none");
          },
          countDown: function () {
            var t = 600,
              e = this,
              a = setInterval(function () {
                var s = Math.floor(t / 60),
                  i = t % 60;
                (s = s < 10 ? "0" + s : s),
                  (i = i < 10 ? "0" + i : i),
                  (e.minutes = s),
                  (e.seconds = i),
                  t <= 0 ? clearInterval(a) : t--;
              }, 1e3);
          },
        },
        computed: {},
        watch: {},
      },
      c = r,
      d = (a("89fa"), a("2877")),
      l = Object(d["a"])(c, s, i, !1, null, "0b2d4038", null);
    e["default"] = l.exports;
  },
  5490: function (t, e, a) {},
  "56d7": function (t, e, a) {
    "use strict";
    a.r(e);
    a("e260"), a("e6cf"), a("cca6"), a("a79d");
    var s = a("2b0e"),
      i = function () {
        var t = this,
          e = t.$createElement,
          a = t._self._c || e;
        return a("div", { attrs: { id: "app" } }, [a("router-view")], 1);
      },
      o = [],
      n =
        (a("ac1f"),
        a("466d"),
        {
          provide: function () {
            return { reload: this.reload };
          },
          data: function () {
            return { isRouterAlive: !0 };
          },
          methods: {
            reload: function () {
              (this.isRouterAlive = !1),
                this.$nextTick(function () {
                  this.isRouterAlive = !0;
                });
            },
          },
          mounted: function () {
            if (
              !navigator.userAgent.match(
                /(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i
              )
            ) {
              var t = document.querySelector("html"),
                e = document.querySelector("#app");
              (t.style = "font-size: 37.5px;width: 375px; margin: 0 auto;"),
                (e.style = "width: 375px"),
                (window.onresize = function () {
                  (t.style = "font-size: 37.5px;width: 375px; margin: 0 auto;"),
                    (e.style = "width: 375px");
                });
            }
          },
        }),
      r = n,
      c = (a("7c55"), a("2877")),
      d = Object(c["a"])(r, i, o, !1, null, null, null),
      l = d.exports,
      u = (a("d3b7"), a("3ca3"), a("ddb0"), a("8c4f"));
    s["a"].use(u["a"]);
    var p = u["a"].prototype.push,
      m = u["a"].prototype.replace;
    (u["a"].prototype.push = function (t, e, a) {
      return e || a
        ? p.call(this, t, e, a)
        : p.call(this, t).catch(function (t) {
            return t;
          });
    }),
      (u["a"].prototype.replace = function (t, e, a) {
        return e || a
          ? m.call(this, t, e, a)
          : m.call(this, t).catch(function (t) {
              return t;
            });
      });
    var h = [
        {
          path: "/",
          name: "home",
          component: function () {
            return a.e("chunk-0f83f8fb").then(a.bind(null, "6511"));
          },
        },
        {
          path: "/comment",
          name: "comment",
          component: function () {
            return a.e("chunk-b1af33fa").then(a.bind(null, "4546"));
          },
        },
        {
          path: "/answer",
          name: "answer",
          component: function () {
            return a.e("chunk-b9f01bd4").then(a.bind(null, "6708"));
          },
        },
        {
          path: "/show",
          name: "show",
          component: function () {
            return a.e("chunk-5a64cf7e").then(a.bind(null, "83fe"));
          },
        },
        {
          path: "/index",
          name: "index",
          component: function () {
            return a.e("chunk-aa7bef62").then(a.bind(null, "1e4b"));
          },
        },
      ],
      v = new u["a"]({ base: "/h5", routes: h }),
      y = v,
      f = a("2f62"),
      g = a("0e44");
    s["a"].use(f["a"]);
    var b = new f["a"].Store({
        state: { USERDATA: {} },
        mutations: {
          PUT_USERDATA: function (t, e) {
            t.USERDATA = e;
          },
        },
        actions: {},
        modules: {},
        plugins: [
          Object(g["a"])({
            storage: window.localStorage,
            reducer: function (t) {
              return { USERDATA: t.USERDATA };
            },
          }),
        ],
      }),
      w =
        (a("159b"),
        a("1276"),
        a("5319"),
        {
          WHITELIST: ["home"],
          API_URL: "/h5",
          IMAGE_DOMAIN: "https://oss.feimaoyu.com",
        });
    Object.assign(w, APP_CONST);
    var C = w,
      x = (a("4ee2"), a("3ba5"), a("b970")),
      k = (a("157a"), a("5cfb"), a("b0c0"), C.WHITELIST);
    y.beforeEach(function (t, e, a) {
      k.indexOf(t.name), a();
    });
    var A = a("1da1"),
      S = (a("99af"), a("96cf"), a("5530")),
      T = a("d399"),
      _ = a("bc3a"),
      I = a.n(_),
      N = null,
      L = {
        400: "请求参数错误",
        401: "权限不足, 请重新登录",
        403: "服务器拒绝本次访问",
        404: "请求资源未找到",
        500: "内部服务器错误",
        501: "服务器不支持该请求中使用的方法",
        502: "网关错误",
        504: "网关超时",
      },
      j = I.a.create({ timeout: 1e4, baseURL: "" });
    function E(t, e) {
      return new Promise(function (a, s) {
        j.get(t, { params: e })
          .then(function (t) {
            a(t.data);
          })
          .catch(function (t) {
            s(t.data);
          });
      });
    }
    function R(t) {
      var e =
          arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
        a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
      return new Promise(function (s, i) {
        I()(
          Object(S["a"])(
            {
              method: "post",
              url: t,
              data: e,
              transformRequest: [
                function (t) {
                  if (a && a.fileUpload) return t;
                  var e = "";
                  for (var s in t)
                    ("undefined" != t[s] && void 0 != t[s]) || (t[s] = ""),
                      (e +=
                        encodeURIComponent(s) +
                        "=" +
                        encodeURIComponent(t[s]) +
                        "&");
                  return e;
                },
              ],
            },
            a
          )
        )
          .then(function (t) {
            s(t.data);
          })
          .catch(function (t) {
            i(t);
          });
      });
    }
    (j.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded"),
      (j.defaults.withCredentials = !0),
      j.interceptors.request.use(
        function (t) {
          return (
            (N = T["a"].loading({
              message: "拼命加载中...",
              forbidClick: !0,
              duration: 0,
              overlay: !0,
              loadingType: "spinner",
            })),
            "get" === t.method &&
              (t.params = Object(S["a"])(
                Object(S["a"])({}, t.params),
                {},
                { t: new Date().getTime() }
              )),
            t
          );
        },
        function (t) {
          return Message.error(t.message, "请求错误"), t;
        }
      ),
      j.interceptors.response.use(
        function (t) {
          N && N.clear();
          var e = t.data.code,
            a = t.status;
          return (
            (1002 !== e && 5012 !== e && 6005 != e) ||
              (localStorage.clear(), y.push({ path: "/login" })),
            200 === a ? Promise.resolve(t.data) : Promise.reject(t)
          );
        },
        function (t) {
          if ((N && N.clear(), t.response)) {
            var e =
              t.response.status in L
                ? L[t.response.status]
                : t.response.data.message;
            return Message({ message: e, type: "error" }), Promise.reject(t);
          }
          return (
            Message({ message: "请求超时, 请刷新重试", type: "error" }),
            Promise.reject(new Error("请求超时, 请刷新重试"))
          );
        }
      );
    var O = {
        getUrl: {
          url: "".concat(C.API_URL, "/getLink"),
          name: "获取链接",
          post: (function () {
            var t = Object(A["a"])(
              regeneratorRuntime.mark(function t(e) {
                var a,
                  s = arguments;
                return regeneratorRuntime.wrap(
                  function (t) {
                    while (1)
                      switch ((t.prev = t.next)) {
                        case 0:
                          return (
                            (a = s.length > 1 && void 0 !== s[1] ? s[1] : {}),
                            (t.next = 3),
                            R(this.url, e, a)
                          );
                        case 3:
                          return t.abrupt("return", t.sent);
                        case 4:
                        case "end":
                          return t.stop();
                      }
                  },
                  t,
                  this
                );
              })
            );
            function e(e) {
              return t.apply(this, arguments);
            }
            return e;
          })(),
        },
        getContent: {
          url: "".concat(C.API_URL, "/getContent.php"),
          name: "获取详细内容",
          post: (function () {
            var t = Object(A["a"])(
              regeneratorRuntime.mark(function t(e) {
                var a,
                  s = arguments;
                return regeneratorRuntime.wrap(
                  function (t) {
                    while (1)
                      switch ((t.prev = t.next)) {
                        case 0:
                          return (
                            (a = s.length > 1 && void 0 !== s[1] ? s[1] : {}),
                            (t.next = 3),
                            R(this.url, e, a)
                          );
                        case 3:
                          return t.abrupt("return", t.sent);
                        case 4:
                        case "end":
                          return t.stop();
                      }
                  },
                  t,
                  this
                );
              })
            );
            function e(e) {
              return t.apply(this, arguments);
            }
            return e;
          })(),
        },
        setTime: {
          url: "".concat(C.API_URL, "/setTime"),
          name: "保存停留时间",
          post: (function () {
            var t = Object(A["a"])(
              regeneratorRuntime.mark(function t(e) {
                var a,
                  s = arguments;
                return regeneratorRuntime.wrap(
                  function (t) {
                    while (1)
                      switch ((t.prev = t.next)) {
                        case 0:
                          return (
                            (a = s.length > 1 && void 0 !== s[1] ? s[1] : {}),
                            (t.next = 3),
                            R(this.url, e, a)
                          );
                        case 3:
                          return t.abrupt("return", t.sent);
                        case 4:
                        case "end":
                          return t.stop();
                      }
                  },
                  t,
                  this
                );
              })
            );
            function e(e) {
              return t.apply(this, arguments);
            }
            return e;
          })(),
        },
        setTimeH5: {
          url: "".concat(C.API_URL, "/v2/setTime"),
          name: "H5保存停留时间",
          post: (function () {
            var t = Object(A["a"])(
              regeneratorRuntime.mark(function t(e) {
                var a,
                  s = arguments;
                return regeneratorRuntime.wrap(
                  function (t) {
                    while (1)
                      switch ((t.prev = t.next)) {
                        case 0:
                          return (
                            (a = s.length > 1 && void 0 !== s[1] ? s[1] : {}),
                            (t.next = 3),
                            R(this.url, e, a)
                          );
                        case 3:
                          return t.abrupt("return", t.sent);
                        case 4:
                        case "end":
                          return t.stop();
                      }
                  },
                  t,
                  this
                );
              })
            );
            function e(e) {
              return t.apply(this, arguments);
            }
            return e;
          })(),
        },
        getLinkH5: {
          url: "".concat(C.API_URL, "/v2/getLink"),
          name: "获取跳转链接",
          post: (function () {
            var t = Object(A["a"])(
              regeneratorRuntime.mark(function t(e) {
                var a,
                  s = arguments;
                return regeneratorRuntime.wrap(
                  function (t) {
                    while (1)
                      switch ((t.prev = t.next)) {
                        case 0:
                          return (
                            (a = s.length > 1 && void 0 !== s[1] ? s[1] : {}),
                            (t.next = 3),
                            R(this.url, e, a)
                          );
                        case 3:
                          return t.abrupt("return", t.sent);
                        case 4:
                        case "end":
                          return t.stop();
                      }
                  },
                  t,
                  this
                );
              })
            );
            function e(e) {
              return t.apply(this, arguments);
            }
            return e;
          })(),
        },
        getLinkKf: {
          url: "".concat(C.API_URL, "/v2/getKfLink"),
          name: "获取客服链接",
          post: (function () {
            var t = Object(A["a"])(
              regeneratorRuntime.mark(function t(e) {
                var a,
                  s = arguments;
                return regeneratorRuntime.wrap(
                  function (t) {
                    while (1)
                      switch ((t.prev = t.next)) {
                        case 0:
                          return (
                            (a = s.length > 1 && void 0 !== s[1] ? s[1] : {}),
                            (t.next = 3),
                            R(this.url, e, a)
                          );
                        case 3:
                          return t.abrupt("return", t.sent);
                        case 4:
                        case "end":
                          return t.stop();
                      }
                  },
                  t,
                  this
                );
              })
            );
            function e(e) {
              return t.apply(this, arguments);
            }
            return e;
          })(),
        },
        getDetailLink: {
          url: "".concat(C.API_URL, "/v2/getDetailLink"),
          name: "获取微信详情跳转链接",
          post: (function () {
            var t = Object(A["a"])(
              regeneratorRuntime.mark(function t(e) {
                var a,
                  s = arguments;
                return regeneratorRuntime.wrap(
                  function (t) {
                    while (1)
                      switch ((t.prev = t.next)) {
                        case 0:
                          return (
                            (a = s.length > 1 && void 0 !== s[1] ? s[1] : {}),
                            (t.next = 3),
                            R(this.url, e, a)
                          );
                        case 3:
                          return t.abrupt("return", t.sent);
                        case 4:
                        case "end":
                          return t.stop();
                      }
                  },
                  t,
                  this
                );
              })
            );
            function e(e) {
              return t.apply(this, arguments);
            }
            return e;
          })(),
        },
        getWxJumpLink: {
          url: "".concat(C.API_URL, "/v2/getWxJumpLink"),
          name: "获取微信客服跳转链接",
          post: (function () {
            var t = Object(A["a"])(
              regeneratorRuntime.mark(function t(e) {
                var a,
                  s = arguments;
                return regeneratorRuntime.wrap(
                  function (t) {
                    while (1)
                      switch ((t.prev = t.next)) {
                        case 0:
                          return (
                            (a = s.length > 1 && void 0 !== s[1] ? s[1] : {}),
                            (t.next = 3),
                            R(this.url, e, a)
                          );
                        case 3:
                          return t.abrupt("return", t.sent);
                        case 4:
                        case "end":
                          return t.stop();
                      }
                  },
                  t,
                  this
                );
              })
            );
            function e(e) {
              return t.apply(this, arguments);
            }
            return e;
          })(),
        },
        getTlJumpLink: {
          url: "".concat(C.API_URL, "/v2/getTlJumpLink"),
          name: "获取淘联跳转链接",
          post: (function () {
            var t = Object(A["a"])(
              regeneratorRuntime.mark(function t(e) {
                var a,
                  s = arguments;
                return regeneratorRuntime.wrap(
                  function (t) {
                    while (1)
                      switch ((t.prev = t.next)) {
                        case 0:
                          return (
                            (a = s.length > 1 && void 0 !== s[1] ? s[1] : {}),
                            (t.next = 3),
                            R(this.url, e, a)
                          );
                        case 3:
                          return t.abrupt("return", t.sent);
                        case 4:
                        case "end":
                          return t.stop();
                      }
                  },
                  t,
                  this
                );
              })
            );
            function e(e) {
              return t.apply(this, arguments);
            }
            return e;
          })(),
        },
        getQwKfJumpLink: {
          url: "".concat(C.API_URL, "/v2/getQwKfJumpLink"),
          name: "获取企微客服链接",
          post: (function () {
            var t = Object(A["a"])(
              regeneratorRuntime.mark(function t(e) {
                var a,
                  s = arguments;
                return regeneratorRuntime.wrap(
                  function (t) {
                    while (1)
                      switch ((t.prev = t.next)) {
                        case 0:
                          return (
                            (a = s.length > 1 && void 0 !== s[1] ? s[1] : {}),
                            (t.next = 3),
                            R(this.url, e, a)
                          );
                        case 3:
                          return t.abrupt("return", t.sent);
                        case 4:
                        case "end":
                          return t.stop();
                      }
                  },
                  t,
                  this
                );
              })
            );
            function e(e) {
              return t.apply(this, arguments);
            }
            return e;
          })(),
        },
        getV2Content: {
          url: "".concat(C.API_URL, "/v2/getContent"),
          name: "获取v2详细内容",
          post: (function () {
            var t = Object(A["a"])(
              regeneratorRuntime.mark(function t(e) {
                var a,
                  s = arguments;
                return regeneratorRuntime.wrap(
                  function (t) {
                    while (1)
                      switch ((t.prev = t.next)) {
                        case 0:
                          return (
                            (a = s.length > 1 && void 0 !== s[1] ? s[1] : {}),
                            (t.next = 3),
                            R(this.url, e, a)
                          );
                        case 3:
                          return t.abrupt("return", t.sent);
                        case 4:
                        case "end":
                          return t.stop();
                      }
                  },
                  t,
                  this
                );
              })
            );
            function e(e) {
              return t.apply(this, arguments);
            }
            return e;
          })(),
        },
        getQwHuoKeLink: {
          url: "".concat(C.API_URL, "/v2/qwHuoKeLink.php"),
          name: "获取企微获客链接",
          post: (function () {
            var t = Object(A["a"])(
              regeneratorRuntime.mark(function t(e) {
                var a,
                  s = arguments;
                return regeneratorRuntime.wrap(
                  function (t) {
                    while (1)
                      switch ((t.prev = t.next)) {
                        case 0:
                          return (
                            (a = s.length > 1 && void 0 !== s[1] ? s[1] : {}),
                            (t.next = 3),
                            R(this.url, e, a)
                          );
                        case 3:
                          return t.abrupt("return", t.sent);
                        case 4:
                        case "end":
                          return t.stop();
                      }
                  },
                  t,
                  this
                );
              })
            );
            function e(e) {
              return t.apply(this, arguments);
            }
            return e;
          })(),
        },
        savePayOnDeliveryInfo: {
          url: "".concat(C.API_URL, "/v2/savePayOnDeliveryInfo"),
          name: "保存货到付款订单信息",
          post: (function () {
            var t = Object(A["a"])(
              regeneratorRuntime.mark(function t(e) {
                var a,
                  s = arguments;
                return regeneratorRuntime.wrap(
                  function (t) {
                    while (1)
                      switch ((t.prev = t.next)) {
                        case 0:
                          return (
                            (a = s.length > 1 && void 0 !== s[1] ? s[1] : {}),
                            (t.next = 3),
                            R(this.url, e, a)
                          );
                        case 3:
                          return t.abrupt("return", t.sent);
                        case 4:
                        case "end":
                          return t.stop();
                      }
                  },
                  t,
                  this
                );
              })
            );
            function e(e) {
              return t.apply(this, arguments);
            }
            return e;
          })(),
        },
        saveInvestigateInfo: {
          url: "".concat(C.API_URL, "/v2/saveInvestigateInfo"),
          name: "保存自定义表单信息",
          post: (function () {
            var t = Object(A["a"])(
              regeneratorRuntime.mark(function t(e) {
                var a,
                  s = arguments;
                return regeneratorRuntime.wrap(
                  function (t) {
                    while (1)
                      switch ((t.prev = t.next)) {
                        case 0:
                          return (
                            (a = s.length > 1 && void 0 !== s[1] ? s[1] : {}),
                            (t.next = 3),
                            R(this.url, e, a)
                          );
                        case 3:
                          return t.abrupt("return", t.sent);
                        case 4:
                        case "end":
                          return t.stop();
                      }
                  },
                  t,
                  this
                );
              })
            );
            function e(e) {
              return t.apply(this, arguments);
            }
            return e;
          })(),
        },
        getPpMiniAppLink: {
          url: "".concat(C.API_URL, "/v2/getPpMiniAppLink"),
          name: "获取品牌小程序链接",
          post: (function () {
            var t = Object(A["a"])(
              regeneratorRuntime.mark(function t(e) {
                var a,
                  s = arguments;
                return regeneratorRuntime.wrap(
                  function (t) {
                    while (1)
                      switch ((t.prev = t.next)) {
                        case 0:
                          return (
                            (a = s.length > 1 && void 0 !== s[1] ? s[1] : {}),
                            (t.next = 3),
                            R(this.url, e, a)
                          );
                        case 3:
                          return t.abrupt("return", t.sent);
                        case 4:
                        case "end":
                          return t.stop();
                      }
                  },
                  t,
                  this
                );
              })
            );
            function e(e) {
              return t.apply(this, arguments);
            }
            return e;
          })(),
        },
        getLinkH5P: {
          url: "".concat(C.API_URL, "/v2/getLinkPre"),
          name: "获取预览跳转链接",
          post: (function () {
            var t = Object(A["a"])(
              regeneratorRuntime.mark(function t(e) {
                var a,
                  s = arguments;
                return regeneratorRuntime.wrap(
                  function (t) {
                    while (1)
                      switch ((t.prev = t.next)) {
                        case 0:
                          return (
                            (a = s.length > 1 && void 0 !== s[1] ? s[1] : {}),
                            (t.next = 3),
                            R(this.url, e, a)
                          );
                        case 3:
                          return t.abrupt("return", t.sent);
                        case 4:
                        case "end":
                          return t.stop();
                      }
                  },
                  t,
                  this
                );
              })
            );
            function e(e) {
              return t.apply(this, arguments);
            }
            return e;
          })(),
        },
        getDetailLinkPre: {
          url: "".concat(C.API_URL, "/v2/getDetailLinkPre"),
          name: "获取微信详情预览跳转链接",
          post: (function () {
            var t = Object(A["a"])(
              regeneratorRuntime.mark(function t(e) {
                var a,
                  s = arguments;
                return regeneratorRuntime.wrap(
                  function (t) {
                    while (1)
                      switch ((t.prev = t.next)) {
                        case 0:
                          return (
                            (a = s.length > 1 && void 0 !== s[1] ? s[1] : {}),
                            (t.next = 3),
                            R(this.url, e, a)
                          );
                        case 3:
                          return t.abrupt("return", t.sent);
                        case 4:
                        case "end":
                          return t.stop();
                      }
                  },
                  t,
                  this
                );
              })
            );
            function e(e) {
              return t.apply(this, arguments);
            }
            return e;
          })(),
        },
        getMsgCode: {
          url: "".concat(C.API_URL, "/v2/pay/getMsgCode"),
          name: "获取验证码",
          post: (function () {
            var t = Object(A["a"])(
              regeneratorRuntime.mark(function t(e) {
                var a,
                  s = arguments;
                return regeneratorRuntime.wrap(
                  function (t) {
                    while (1)
                      switch ((t.prev = t.next)) {
                        case 0:
                          return (
                            (a = s.length > 1 && void 0 !== s[1] ? s[1] : {}),
                            (t.next = 3),
                            R(this.url, e, a)
                          );
                        case 3:
                          return t.abrupt("return", t.sent);
                        case 4:
                        case "end":
                          return t.stop();
                      }
                  },
                  t,
                  this
                );
              })
            );
            function e(e) {
              return t.apply(this, arguments);
            }
            return e;
          })(),
        },
        savePay: {
          url: "".concat(C.API_URL, "/v2/pay/").concat(C.LOG_ID),
          name: "保存付费加粉订单",
          post: (function () {
            var t = Object(A["a"])(
              regeneratorRuntime.mark(function t(e) {
                var a,
                  s = arguments;
                return regeneratorRuntime.wrap(
                  function (t) {
                    while (1)
                      switch ((t.prev = t.next)) {
                        case 0:
                          return (
                            (a = s.length > 1 && void 0 !== s[1] ? s[1] : {}),
                            (t.next = 3),
                            R(this.url, e, a)
                          );
                        case 3:
                          return t.abrupt("return", t.sent);
                        case 4:
                        case "end":
                          return t.stop();
                      }
                  },
                  t,
                  this
                );
              })
            );
            function e(e) {
              return t.apply(this, arguments);
            }
            return e;
          })(),
        },
        checkOrder: {
          url: "".concat(C.API_URL, "/v2/pay/check"),
          name: "获取付费加粉订单状态",
          post: (function () {
            var t = Object(A["a"])(
              regeneratorRuntime.mark(function t(e) {
                var a,
                  s = arguments;
                return regeneratorRuntime.wrap(
                  function (t) {
                    while (1)
                      switch ((t.prev = t.next)) {
                        case 0:
                          return (
                            (a = s.length > 1 && void 0 !== s[1] ? s[1] : {}),
                            (t.next = 3),
                            R(this.url, e, a)
                          );
                        case 3:
                          return t.abrupt("return", t.sent);
                        case 4:
                        case "end":
                          return t.stop();
                      }
                  },
                  t,
                  this
                );
              })
            );
            function e(e) {
              return t.apply(this, arguments);
            }
            return e;
          })(),
        },
        getAlipayConfig: {
          url: "".concat(C.API_URL, "/v2/getAlipayConfig"),
          name: "获取支付宝配置信息",
          get: (function () {
            var t = Object(A["a"])(
              regeneratorRuntime.mark(function t(e) {
                var a,
                  s = arguments;
                return regeneratorRuntime.wrap(
                  function (t) {
                    while (1)
                      switch ((t.prev = t.next)) {
                        case 0:
                          return (
                            (a = s.length > 1 && void 0 !== s[1] ? s[1] : {}),
                            (t.next = 3),
                            E(this.url, e, a)
                          );
                        case 3:
                          return t.abrupt("return", t.sent);
                        case 4:
                        case "end":
                          return t.stop();
                      }
                  },
                  t,
                  this
                );
              })
            );
            function e(e) {
              return t.apply(this, arguments);
            }
            return e;
          })(),
        },
      },
      M = a("d4ec"),
      B = a("bee2"),
      P = (function () {
        function t() {
          Object(M["a"])(this, t);
        }
        return (
          Object(B["a"])(t, [
            {
              key: "clearCookie",
              value: function (t) {
                var e = new Date();
                e.setTime(e.getTime() - 1);
                var a = this.getCookie(t);
                null != a &&
                  (document.cookie =
                    t + "=" + a + ";expires=" + e.toGMTString());
              },
            },
            {
              key: "setCookie",
              value: function (t, e, a) {
                var s = new Date();
                s.setTime(s.getTime() + 60 * a * 1e3),
                  (document.cookie =
                    t +
                    "=" +
                    escape(e) +
                    (null == a ? "" : ";expires=" + s.toGMTString()));
              },
            },
            {
              key: "getCookie",
              value: function (t) {
                if (document.cookie.length > 0) {
                  var e = document.cookie.indexOf(t + "=");
                  if (-1 != e) {
                    e = e + t.length + 1;
                    var a = document.cookie.indexOf(";", e);
                    return (
                      -1 == a && (a = document.cookie.length),
                      unescape(document.cookie.substring(e, a))
                    );
                  }
                }
                return "";
              },
            },
          ]),
          t
        );
      })(),
      D = a("53ca"),
      z = a("ade3"),
      Q =
        (a("b64b"),
        a("caad"),
        a("2532"),
        a("25f0"),
        (function () {
          function t() {
            Object(M["a"])(this, t),
              Object(z["a"])(this, "coursewareMetchArr", [
                "1",
                "2",
                "3",
                "6",
                "7",
              ]);
          }
          return (
            Object(B["a"])(t, [
              {
                key: "isIos",
                value: function () {
                  var t = navigator.userAgent;
                  return (
                    !(t.indexOf("Android") > -1 || t.indexOf("Linux") > -1) &&
                    (t.indexOf("iPhone") > -1 ||
                      (t.indexOf("iPad") > -1 || t.indexOf("Windows Phone"),
                      !1))
                  );
                },
              },
              {
                key: "isMobile",
                value: function () {
                  var t = navigator.userAgent.match(
                    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone|TTWebView|Hutool)/i
                  );
                  return !!t;
                },
              },
              {
                key: "addPlayButton",
                value: function (t) {
                  var e = document.createElement("div"),
                    a = document.createElement("img"),
                    s = document.querySelector("#".concat(t));
                  return (
                    (e.className = "playBtn"),
                    (e.style.cssText =
                      "width:100%;height:100%;background-color:rgba(0,0,0, .5);display: flex;justify-content: center;align-items: center;position:absolute;top:0;left:0;"),
                    (a.style.cssText = "width:60px;height:60px;"),
                    (a.src =
                      "https://g.alicdn.com/de/prismplayer/2.8.7/skins/default/img/bigplay.png"),
                    e.appendChild(a),
                    s.appendChild(e),
                    e
                  );
                },
              },
              {
                key: "getCureentEnv",
                value: function () {
                  var t = this;
                  return new Promise(function (e, a) {
                    if (t.isMobile()) {
                      var s = window.navigator.userAgent.toLowerCase();
                      try {
                        "micromessenger" == s.match(/MicroMessenger/i) || e(3);
                      } catch (i) {
                        a(i);
                      }
                    } else e(0);
                  });
                },
              },
              {
                key: "checkObjIsNull",
                value: function (t) {
                  return Object.keys(t).length > 0;
                },
              },
              {
                key: "getCoursewareData",
                value: function (t, e) {
                  if (this.coursewareMetchArr.includes(t)) {
                    var a = b.getters.getStoreProductData;
                    if (a[t] && a[t][e]) return a[t][e];
                  }
                },
              },
              {
                key: "replaceImageList",
                value: function (t) {
                  var e = this,
                    a = [];
                  return t.length > 0
                    ? (t.forEach(function (t) {
                        t.linktype
                          ? (t.http =
                              e.getCoursewareData(
                                t.linktype ? t.linktype : t.http.type,
                                t.http.id
                              ) || t.http)
                          : t.type &&
                            (!e.getCoursewareData(t.type.toString(), t.id) ||
                              a.push(
                                e.getCoursewareData(t.type.toString(), t.id)
                              ));
                      }),
                      a)
                    : [];
                },
              },
              {
                key: "assiginObj",
                value: function (t, e) {
                  var a = t;
                  if (
                    "object" != Object(D["a"])(t) ||
                    "object" != Object(D["a"])(e) ||
                    Object(D["a"])(t)
                  )
                    return e;
                  for (var s in e)
                    t.hasOwnProperty(s)
                      ? (a[s] = this.assiginObj(t[s], e[s]))
                      : (a[s] = e[s]);
                  return a;
                },
              },
            ]),
            t
          );
        })()),
      U = new Q();
    s["a"].use(x["a"]),
      (s["a"].prototype.$api = O),
      (s["a"].prototype.$utils = new P()),
      (s["a"].prototype.$common = U),
      (s["a"].prototype.$const = C);
    var J = a("ffe0");
    J.keys().forEach(function (t) {
      var e = J(t),
        a = t
          .replace(/^\.\//, "")
          .replace(/\.vue/, "")
          .replace(/^${}/, "")
          .split("/")[0];
      s["a"].component(a, e.default || e);
    });
    var F = a("caf9");
    s["a"].use(F["a"]),
      (s["a"].config.productionTip = !1),
      new s["a"]({
        router: y,
        store: b,
        render: function (t) {
          return t(l);
        },
      }).$mount("#app");
  },
  "5ac1": function (t, e, a) {
    "use strict";
    a("f2f8");
  },
  "5dfc": function (t, e, a) {
    "use strict";
    a.r(e);
    var s = function () {
        var t = this,
          e = t.$createElement,
          a = t._self._c || e;
        return a(
          "div",
          { staticClass: "cantuan box1" },
          [
            a(
              "van-notice-bar",
              {
                staticStyle: { "border-radius": "20px", height: "25px" },
                attrs: { scrollable: !1, background: "rgba(0, 0, 0, .5)" },
              },
              [
                t.datas.dataList
                  ? a(
                      "van-swipe",
                      {
                        staticClass: "notice-swipe body1",
                        attrs: {
                          vertical: "",
                          autoplay: 3e3,
                          touchable: !1,
                          "show-indicators": !1,
                        },
                      },
                      t._l(t.datas.dataList, function (e, s) {
                        return a(
                          "van-swipe-item",
                          { key: s, staticClass: "demoText" },
                          [
                            a("van-image", {
                              attrs: {
                                round: "",
                                width: "20px",
                                height: "20px",
                                src: e.avatar,
                              },
                            }),
                            t._v(
                              " " +
                                t._s(e.name) +
                                t._s(t.datas.demo) +
                                t._s(e.time) +
                                "分钟前 "
                            ),
                          ],
                          1
                        );
                      }),
                      1
                    )
                  : t._e(),
              ],
              1
            ),
            t._t("deles"),
          ],
          2
        );
      },
      i = [],
      o =
        (a("ac1f"),
        a("5319"),
        a("4d90"),
        {
          name: "cantuan",
          props: { datas: Object },
          created: function () {
            this.addData();
          },
          methods: {
            addData: function () {
              for (var t = 0; t < 20; t++)
                this.datas.dataList.push({
                  name:
                    (Math.floor(10 * Math.random()) + 1) % 2 == 0
                      ? this.randomUserName()
                      : this.getPhone(),
                  avatar: this.getRandomAvatar(
                    (Math.floor(10 * Math.random()) + 1) % 2 == 0 ? 1 : 2
                  ),
                  time: this.rndNumber(1, 50),
                });
            },
            randomUserName: function () {
              var t =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : "",
                e =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : 7;
              void 0 === t && (t = ""), void 0 === e && (e = 8);
              for (
                var a = [
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
                    [
                      "a",
                      "b",
                      "c",
                      "d",
                      "e",
                      "f",
                      "g",
                      "h",
                      "i",
                      "g",
                      "k",
                      "l",
                      "m",
                      "n",
                      "o",
                      "p",
                      "q",
                      "r",
                      "s",
                      "t",
                      "u",
                      "v",
                      "w",
                      "x",
                      "y",
                      "z",
                    ],
                  ],
                  s = t,
                  i = 0;
                i < e;
                i++
              ) {
                var o = "";
                if (0 != i && i != e - 1) o = "*";
                else {
                  var n = Math.floor(2 * Math.random());
                  (o = a[n][Math.floor(Math.random() * a[n].length)]),
                    1 === n &&
                      1 === Math.floor(2 * Math.random()) &&
                      (o = o.toUpperCase());
                }
                s += o;
              }
              return s;
            },
            getPhone: function () {
              for (
                var t = new Array(
                    "130",
                    "131",
                    "132",
                    "133",
                    "135",
                    "137",
                    "138",
                    "170",
                    "187",
                    "189"
                  ),
                  e = parseInt(10 * Math.random()),
                  a = t[e],
                  s = 0;
                s < 8;
                s++
              )
                a += Math.floor(10 * Math.random());
              return a.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2");
            },
            getRandomAvatar: function (t) {
              var e = "";
              return (
                (e =
                  1 == t || 2 == t
                    ? Math.floor(300 * Math.random()) + 1 + ""
                    : Math.floor(200 * Math.random()) + 1 + ""),
                (e = e.padStart(3, "0")),
                "https://oss1.modsty.com/avatar/2022" + t + e + "12.jpg"
              );
            },
            rndNumber: function (t, e) {
              var a = t + Math.floor(Math.random() * (e - t + 1));
              return a < t ? t : a > e ? e : a;
            },
          },
        }),
      n = o,
      r = (a("f61c"), a("2877")),
      c = Object(r["a"])(n, s, i, !1, null, "4448ab6d", null);
    e["default"] = c.exports;
  },
  "5e88": function (t, e, a) {
    "use strict";
    a("8639");
  },
  "641e": function (t, e, a) {
    "use strict";
    a("828c");
  },
  "643d": function (t, e, a) {
    "use strict";
    a("429e");
  },
  "73fb": function (t, e, a) {},
  "76e1": function (t, e, a) {
    "use strict";
    a.r(e);
    var s = function () {
        var t = this,
          e = t.$createElement,
          a = t._self._c || e;
        return a(
          "div",
          {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: t.delayShow,
                expression: "delayShow",
              },
            ],
            staticClass: "pictureads",
            style: t.positionStyle,
          },
          [
            t.imageList[0]
              ? t._e()
              : a("div", { staticClass: "upload" }, [
                  a("i", { staticClass: "iconfont icon-lunbotu" }),
                ]),
            t.imageList[0] && 0 === t.swiperType
              ? a(
                  "div",
                  {
                    staticClass: "type0",
                    style: {
                      "padding-left": t.datas.pageMargin + "px",
                      "padding-right": t.datas.pageMargin + "px",
                    },
                  },
                  t._l(t.imageList, function (e, s) {
                    return a(
                      "div",
                      {
                        key: s,
                        staticClass: "imgLis",
                        style: { "margin-bottom": t.datas.imageMargin + "px" },
                      },
                      [
                        a("img", {
                          directives: [
                            {
                              name: "lazy",
                              rawName: "v-lazy",
                              value: e.src,
                              expression: "item.src",
                            },
                          ],
                          key: e.src,
                          style: {
                            "border-radius": t.datas.borderRadius + "px",
                          },
                          attrs: { draggable: "false" },
                          on: {
                            click: function (a) {
                              return t.picClick(e);
                            },
                          },
                        }),
                        a(
                          "p",
                          {
                            directives: [
                              {
                                name: "show",
                                rawName: "v-show",
                                value: !!e.text,
                                expression: "item.text ? true : false",
                              },
                            ],
                            staticClass: "title",
                          },
                          [t._v(t._s(e.text))]
                        ),
                      ]
                    );
                  }),
                  0
                )
              : t._e(),
            (t.imageList[0] && 1 === t.swiperType) ||
            2 === t.swiperType ||
            3 === t.swiperType
              ? a("div", { staticClass: "swiper-container" }, [
                  a(
                    "div",
                    {
                      class:
                        3 === t.swiperType && t.imageList[0]
                          ? "type3 type1 swiper-wrapper type3H"
                          : "swiper-wrapper type1",
                    },
                    t._l(t.imageList, function (e, s) {
                      return a(
                        "div",
                        {
                          key: s,
                          staticClass: "swiper-slide",
                          style: t.swiperSlideStyle,
                        },
                        [
                          0 == s || s == t.imageList.length - 1
                            ? a("img", {
                                style: {
                                  "border-radius": t.datas.borderRadius + "px",
                                },
                                attrs: {
                                  src: e.src,
                                  alt: "",
                                  draggable: "false",
                                },
                                on: {
                                  click: function (a) {
                                    return t.picClick(e);
                                  },
                                },
                              })
                            : a("img", {
                                directives: [
                                  {
                                    name: "lazy",
                                    rawName: "v-lazy",
                                    value: e.src,
                                    expression: "item.src",
                                  },
                                ],
                                key: e.src,
                                style: {
                                  "border-radius": t.datas.borderRadius + "px",
                                },
                                attrs: { alt: "", draggable: "false" },
                                on: {
                                  click: function (a) {
                                    return t.picClick(e);
                                  },
                                },
                              }),
                          a(
                            "p",
                            {
                              directives: [
                                {
                                  name: "show",
                                  rawName: "v-show",
                                  value: !!e.text,
                                  expression: "item.text ? true : false",
                                },
                              ],
                              staticClass: "title",
                            },
                            [t._v(t._s(e.text))]
                          ),
                        ]
                      );
                    }),
                    0
                  ),
                  a("div", {
                    staticClass: "swiper-pagination",
                    staticStyle: { color: "#007aff" },
                  }),
                ])
              : t._e(),
            t._t("deles"),
          ],
          2
        );
      },
      i = [],
      o = (a("159b"), a("b619")),
      n =
        (a("f4bd"),
        {
          name: "pictureads",
          props: { datas: Object },
          data: function () {
            return {
              mySwiper: null,
              swiperSlideStyle: {},
              positionStyle: {},
              delayShow: !0,
            };
          },
          created: function () {
            var t = this;
            this.$nextTick(function () {
              var e = document.querySelector("#imageTofile").offsetWidth;
              (t.swiperSlideStyle = { width: "100%", height: e + "px" }),
                t.datas.position && 0 != t.datas.position
                  ? 1 == t.datas.position
                    ? (t.positionStyle = {
                        width: "100%",
                        position: "fixed",
                        top: "0px",
                        "z-index": 2,
                      })
                    : 2 == t.datas.position &&
                      (t.positionStyle = {
                        width: "100%",
                        position: "fixed",
                        bottom: "0px",
                        "z-index": 2,
                      })
                  : (t.positionStyle = { position: "relative" });
            });
          },
          mounted: function () {
            if (this.datas.delayShow && this.datas.delayShow > 0) {
              this.delayShow = !1;
              var t = this;
              setTimeout(function () {
                t.delayShow = !0;
              }, 1e3 * this.datas.delayShow);
            }
          },
          computed: {
            swiperType: function () {
              return this.addSwiper(), this.datas.swiperType;
            },
            imageList: function () {
              return this.addSwiper(), this.datas.imageList;
            },
            pagingType: function () {
              return this.addSwiper(), this.datas.pagingType;
            },
            rowindividual: function () {
              return (
                this.addSwiper(),
                1 === this.datas.swiperType ? 1 : this.datas.rowindividual
              );
            },
            imageMargin: function () {
              return (
                this.addSwiper(),
                1 === this.datas.swiperType ? 0 : this.datas.imageMargin
              );
            },
          },
          watch: {
            pagingType: function () {},
            rowindividual: function () {},
            imageMargin: function () {},
          },
          methods: {
            picClick: function (t) {
              t && this.$emit("clickPicture", t);
            },
            addSwiper: function () {
              var t = this;
              this.$nextTick(function () {
                if (0 !== t.datas.swiperType && t.datas.imageList[0]) {
                  t.mySwiper instanceof Array
                    ? t.mySwiper.forEach(function (t) {
                        t.destroy();
                      })
                    : t.mySwiper instanceof Object && t.mySwiper.destroy();
                  var e = {
                    loop: !0,
                    autoplay: !0,
                    pagination: {
                      el: ".swiper-pagination",
                      type: t.pagingType,
                    },
                  };
                  1 === t.datas.swiperType || 2 === t.datas.swiperType
                    ? ((e.slidesPerView = t.rowindividual),
                      (e.spaceBetween = t.imageMargin))
                    : 3 === t.datas.swiperType &&
                      ((e.slidesPerView = 1.3), (e.centeredSlides = !0)),
                    (t.mySwiper = new o["a"](".swiper-container", e));
                } else
                  t.mySwiper instanceof Array &&
                    t.mySwiper.forEach(function (t) {
                      t.destroy();
                    }),
                    t.mySwiper instanceof Object && t.mySwiper.destroy();
              });
            },
          },
        }),
      r = n,
      c = (a("8233"), a("2877")),
      d = Object(c["a"])(r, s, i, !1, null, "876ec2e2", null);
    e["default"] = d.exports;
  },
  "77a0": function (t, e, a) {},
  "79b8": function (t, e, a) {
    "use strict";
    a.r(e);
    var s = function () {
        var t = this,
          e = t.$createElement,
          a = t._self._c || e;
        return a(
          "div",
          {
            staticClass: "buttons",
            style: t.buttonWrapStyle,
            on: { click: t.b_click },
          },
          [
            0 == t.datas.buttonType || 1 == t.datas.buttonType
              ? a("div", { staticClass: "button_wrap" }, [
                  a("div", { style: t.buttonStyle }, [
                    a("span", [t._v(" " + t._s(t.datas.buttonContent) + " ")]),
                  ]),
                ])
              : a("div", { staticClass: "button_img_wrap" }, [
                  t.datas.img
                    ? a(
                        "div",
                        { style: t.buttonStyle },
                        [
                          a("van-image", {
                            staticStyle: { height: "99%", width: "100%" },
                            attrs: { src: t.datas.img },
                          }),
                        ],
                        1
                      )
                    : a("div", { staticClass: "upload" }, [
                        a("i", { staticClass: "iconfont icon-tupian" }),
                      ]),
                ]),
            t._t("deles"),
          ],
          2
        );
      },
      i = [],
      o = {
        name: "buttons",
        props: { datas: Object },
        methods: {
          b_click: function () {
            var t = this.datas.http;
            0 == t.type
              ? this.$emit("clickBannerDirect")
              : this.$emit("clickBanner");
          },
        },
        computed: {
          buttonWrapStyle: function () {
            var t = {};
            return (
              0 == this.datas.buttonLocation
                ? (t = { width: "100%", display: "flex", position: "relative" })
                : 1 == this.datas.buttonLocation
                ? (t = {
                    width: "100%",
                    position: "absolute",
                    top: "0",
                    "z-index": "999",
                    border: "none",
                    "box-sizing": "border-box",
                  })
                : 2 == this.datas.buttonLocation &&
                  (t = {
                    width: "100%",
                    left: "0",
                    bottom: "0",
                    border: "none",
                    height: "100%",
                    position: "absolute",
                    "z-index": "999",
                  }),
              2 != this.datas.buttonType
                ? (t["height"] = "70px")
                : this.datas.img
                ? (t["height"] = this.datas.buttonStyle.height + "px")
                : (t["height"] = "70px"),
              t
            );
          },
          buttonStyle: function () {
            return 0 == this.datas.buttonType
              ? {
                  "background-color": this.datas.buttonContentFillColor,
                  color: this.datas.buttonContentColor,
                  "border-radius": this.datas.buttonContentBorderScale + "px",
                  width:
                    0 == this.datas.buttonBaseType
                      ? "100%"
                      : this.datas.buttonStyle.width + "px",
                  height: this.datas.buttonStyle.height + "px",
                  "margin-left": this.datas.buttonStyle.left + "px",
                  "margin-top": this.datas.buttonStyle.top + "px",
                  "font-size": this.datas.buttonContentSize + "px",
                  "line-height": this.datas.buttonStyle.height + "px",
                  "border-color": this.datas.buttonContentBorderColor,
                  "border-width": this.datas.buttonContentBorderSize + "px",
                  "border-style": "solid",
                  "font-color": this.datas.buttonContentColor,
                }
              : 1 == this.datas.buttonType
              ? {
                  "background-color": this.datas.buttonContentFillColor,
                  color: this.datas.buttonContentColor,
                  width: "100%",
                  height: this.datas.buttonStyle.height + "px",
                  "margin-top": this.datas.buttonStyle.top + "px",
                  "font-size": this.datas.buttonContentSize + "px",
                  "line-height": this.datas.buttonStyle.height + "px",
                  "border-color": this.datas.buttonContentBorderColor,
                  "border-width": this.datas.buttonContentBorderSize + "px",
                  "border-style": "solid",
                  "font-color": this.datas.buttonContentColor,
                }
              : { width: "100%", height: "100%" };
          },
        },
      },
      n = o,
      r = (a("641e"), a("2877")),
      c = Object(r["a"])(n, s, i, !1, null, "6de9b0bf", null);
    e["default"] = c.exports;
  },
  "7c55": function (t, e, a) {
    "use strict";
    a("2395");
  },
  8169: function (t, e, a) {},
  8233: function (t, e, a) {
    "use strict";
    a("ad74");
  },
  "828c": function (t, e, a) {},
  8471: function (t, e, a) {
    "use strict";
    a("93f6");
  },
  8639: function (t, e, a) {},
  "89fa": function (t, e, a) {
    "use strict";
    a("9fa3");
  },
  "93f6": function (t, e, a) {},
  "94a3": function (t, e, a) {
    "use strict";
    a("77a0");
  },
  9910: function (t, e, a) {
    "use strict";
    a.r(e);
    var s = function () {
        var t = this,
          e = t.$createElement,
          a = t._self._c || e;
        return a(
          "div",
          { staticClass: "storeinformation" },
          [
            a(
              "section",
              {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value:
                      0 === t.datas.rubiksCubeType ||
                      2 === t.datas.rubiksCubeType,
                    expression:
                      "datas.rubiksCubeType === 0 || datas.rubiksCubeType === 2",
                  },
                ],
                staticClass: "type0",
              },
              [
                0 === t.datas.rubiksCubeType
                  ? a("div", {
                      staticClass: "menban",
                      staticStyle: { "background-color": "rgba(0, 0, 0, 0.3)" },
                    })
                  : a("div", {
                      staticClass: "menban",
                      staticStyle: {
                        "background-image":
                          "linear-gradient(to top, #000, transparent)",
                      },
                    }),
                a("div", { staticClass: "men" }, [
                  t.datas.bakcgroundImg
                    ? a("img", {
                        attrs: {
                          draggable: "false",
                          src: t.datas.bakcgroundImg,
                          alt: "",
                        },
                      })
                    : a("img", {
                        attrs: {
                          draggable: "false",
                          src:
                            t.$const.IMAGE_DOMAIN + "/sys/h5/image/backimg.png",
                          alt: "",
                        },
                      }),
                ]),
                a("div", { staticClass: "storIinformation" }, [
                  a("div", [
                    t.datas.headPortrait
                      ? a("img", {
                          attrs: {
                            draggable: "false",
                            src: t.datas.headPortrait,
                            alt: "",
                          },
                        })
                      : a("img", {
                          attrs: {
                            draggable: "false",
                            src:
                              t.$const.IMAGE_DOMAIN +
                              "/sys/h5/image/headerimg.png",
                            alt: "",
                          },
                        }),
                  ]),
                  a("div", [
                    a(
                      "p",
                      {
                        staticStyle: {
                          "margin-top": "5px",
                          "font-weight": "700",
                          "font-size": "18px",
                        },
                      },
                      [t._v(" " + t._s(t.datas.name) + " ")]
                    ),
                    a(
                      "p",
                      {
                        staticStyle: {
                          "font-size": "12px",
                          "margin-top": "10px",
                        },
                      },
                      [t._v(t._s(t.datas.Discount))]
                    ),
                  ]),
                ]),
              ]
            ),
            a(
              "section",
              {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: 1 === t.datas.rubiksCubeType,
                    expression: "datas.rubiksCubeType === 1",
                  },
                ],
                staticClass: "type1",
              },
              [
                a("div", {
                  staticClass: "menban",
                  staticStyle: {
                    "background-image":
                      "linear-gradient(to top, #000, transparent)",
                  },
                }),
                a("div", { staticClass: "men" }, [
                  t.datas.bakcgroundImg
                    ? a("img", {
                        attrs: {
                          draggable: "false",
                          src: t.datas.bakcgroundImg,
                          alt: "",
                        },
                      })
                    : a("img", {
                        attrs: {
                          draggable: "false",
                          src:
                            t.$const.IMAGE_DOMAIN + "/sys/h5/image/backimg.png",
                          alt: "",
                        },
                      }),
                ]),
                a("div", { staticClass: "storIinformation" }, [
                  a("div", [
                    t.datas.headPortrait
                      ? a("img", {
                          attrs: {
                            draggable: "false",
                            src: t.datas.headPortrait,
                            alt: "",
                          },
                        })
                      : a("img", {
                          attrs: {
                            draggable: "false",
                            src:
                              t.$const.IMAGE_DOMAIN +
                              "/sys/h5/image/headerimg.png",
                            alt: "",
                          },
                        }),
                  ]),
                  a("div", [
                    a(
                      "p",
                      {
                        staticStyle: {
                          "margin-top": "5px",
                          "font-weight": "700",
                          "font-size": "18px",
                        },
                      },
                      [t._v(" " + t._s(t.datas.name) + " ")]
                    ),
                    a(
                      "p",
                      {
                        staticStyle: {
                          "font-size": "12px",
                          "margin-top": "10px",
                        },
                      },
                      [t._v(t._s(t.datas.Discount))]
                    ),
                  ]),
                ]),
              ]
            ),
            a(
              "section",
              {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: 3 === t.datas.rubiksCubeType,
                    expression: "datas.rubiksCubeType === 3",
                  },
                ],
                staticClass: "type3",
              },
              [
                a("div", {
                  staticClass: "menban",
                  staticStyle: {
                    "background-image":
                      "linear-gradient(to top, #000, transparent)",
                  },
                }),
                a("div", { staticClass: "men" }, [
                  t.datas.bakcgroundImg
                    ? a("img", {
                        attrs: {
                          draggable: "false",
                          src: t.datas.bakcgroundImg,
                          alt: "",
                        },
                      })
                    : a("img", {
                        attrs: {
                          draggable: "false",
                          src:
                            t.$const.IMAGE_DOMAIN + "/sys/h5/image/backimg.png",
                          alt: "",
                        },
                      }),
                ]),
                a("div", { staticClass: "storIinformation" }, [
                  a("div", [
                    t.datas.headPortrait
                      ? a("img", {
                          attrs: {
                            draggable: "false",
                            src: t.datas.headPortrait,
                            alt: "",
                          },
                        })
                      : a("img", {
                          attrs: {
                            draggable: "false",
                            src:
                              t.$const.IMAGE_DOMAIN +
                              "/sys/h5/image/headerimg.png",
                            alt: "",
                          },
                        }),
                  ]),
                  a("div", [
                    a(
                      "p",
                      {
                        staticStyle: {
                          "margin-top": "5px",
                          "font-weight": "700",
                          "font-size": "18px",
                        },
                      },
                      [t._v(" " + t._s(t.datas.name) + " ")]
                    ),
                    a(
                      "p",
                      {
                        staticStyle: {
                          "font-size": "12px",
                          "margin-top": "10px",
                        },
                      },
                      [t._v(t._s(t.datas.Discount))]
                    ),
                  ]),
                ]),
              ]
            ),
            a(
              "section",
              {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: 4 === t.datas.rubiksCubeType,
                    expression: "datas.rubiksCubeType === 4",
                  },
                ],
                staticClass: "type4",
              },
              [
                a("div", {
                  staticClass: "menban",
                  staticStyle: {
                    "background-image":
                      "linear-gradient(to top, #000, transparent)",
                  },
                }),
                a("div", { staticClass: "men" }, [
                  t.datas.bakcgroundImg
                    ? a("img", {
                        attrs: {
                          draggable: "false",
                          src: t.datas.bakcgroundImg,
                          alt: "",
                        },
                      })
                    : a("img", {
                        attrs: {
                          draggable: "false",
                          src:
                            t.$const.IMAGE_DOMAIN + "/sys/h5/image/backimg.png",
                          alt: "",
                        },
                      }),
                ]),
                a("div", { staticClass: "storIinformation" }, [
                  a("div", [
                    t.datas.headPortrait
                      ? a("img", {
                          attrs: {
                            draggable: "false",
                            src: t.datas.headPortrait,
                            alt: "",
                          },
                        })
                      : a("img", {
                          attrs: {
                            draggable: "false",
                            src:
                              t.$const.IMAGE_DOMAIN +
                              "/sys/h5/image/headerimg.png",
                            alt: "",
                          },
                        }),
                  ]),
                  a("div", [
                    a(
                      "p",
                      {
                        staticStyle: {
                          "margin-top": "5px",
                          "font-weight": "700",
                          "font-size": "18px",
                          "line-height": "40px",
                          "border-bottom": "1px solid #fff",
                        },
                      },
                      [t._v(" " + t._s(t.datas.name) + " ")]
                    ),
                    a(
                      "p",
                      {
                        staticStyle: {
                          "font-size": "12px",
                          "margin-top": "10px",
                        },
                      },
                      [t._v(t._s(t.datas.Discount))]
                    ),
                  ]),
                ]),
              ]
            ),
            t._t("deles"),
          ],
          2
        );
      },
      i = [],
      o = { name: "storeinformation", props: { datas: Object } },
      n = o,
      r = (a("ef08"), a("2877")),
      c = Object(r["a"])(n, s, i, !1, null, "e5d13948", null);
    e["default"] = c.exports;
  },
  "9ac6": function (t, e, a) {
    "use strict";
    a.r(e);
    var s = function () {
        var t = this,
          e = t.$createElement,
          a = t._self._c || e;
        return a(
          "div",
          { staticClass: "chanpin" },
          [
            a("div", { staticClass: "van-coupon" }, [
              a("div", { staticClass: "van-nav-bar van-hairline--bottom " }, [
                a("div", { staticClass: "van-nav-bar__content" }, [
                  a(
                    "div",
                    {
                      staticClass: "van-nav-bar__title van-ellipsis titleClass",
                    },
                    [t._v(t._s(t.datas.demo))]
                  ),
                ]),
              ]),
              t.datas.imageList
                ? a("div", { staticClass: "dataClass" }, [
                    a(
                      "div",
                      { staticClass: "type0" },
                      t._l(t.datas.imageList, function (t, e) {
                        return a("div", { key: e, staticClass: "imgLis" }, [
                          a("img", {
                            attrs: { src: t.src, draggable: "false" },
                          }),
                        ]);
                      }),
                      0
                    ),
                  ])
                : t._e(),
            ]),
            t._t("deles"),
          ],
          2
        );
      },
      i = [],
      o = { name: "chanpin", props: { datas: Object } },
      n = o,
      r = (a("94a3"), a("2877")),
      c = Object(r["a"])(n, s, i, !1, null, "2b680af8", null);
    e["default"] = c.exports;
  },
  "9fa3": function (t, e, a) {},
  a743: function (t, e, a) {
    "use strict";
    a.r(e);
    var s = function () {
        var t = this,
          e = t.$createElement,
          a = t._self._c || e;
        return a("div", { staticClass: "tabBar", style: t.tabBarStyle }, [
          a("div", {
            attrs: { id: "tabBarOpenOutButton" },
            on: { click: t.openSku },
          }),
          a(
            "div",
            { staticClass: "h5-btn flex-align space-between" },
            [
              t.datas.barType && 1 != t.datas.barType
                ? t._e()
                : [
                    a(
                      "div",
                      {
                        staticClass: "flex-align",
                        staticStyle: {
                          width: "40%",
                          "justify-content": "space-around",
                        },
                      },
                      [
                        a(
                          "div",
                          { staticClass: "left-btn", on: { click: t.openSku } },
                          [
                            a("van-icon", {
                              attrs: { name: t.shopIcon, size: "16" },
                            }),
                            a(
                              "div",
                              {
                                staticStyle: {
                                  "font-size": "9px",
                                  color: "#969799",
                                },
                              },
                              [t._v("店铺")]
                            ),
                          ],
                          1
                        ),
                        a(
                          "div",
                          {
                            staticClass: "left-btn",
                            on: { click: t.openKefu },
                          },
                          [
                            a("van-icon", {
                              attrs: { name: t.kefuIcon, size: "16" },
                            }),
                            a(
                              "div",
                              {
                                staticStyle: {
                                  "font-size": "9px",
                                  color: "#969799",
                                },
                              },
                              [t._v("客服")]
                            ),
                          ],
                          1
                        ),
                        a(
                          "div",
                          { staticClass: "left-btn", on: { click: t.openSku } },
                          [
                            a("van-icon", {
                              attrs: {
                                name: "star-o",
                                size: "1.7em",
                                color: "#707070",
                              },
                            }),
                            a(
                              "div",
                              {
                                staticStyle: {
                                  "font-size": "9px",
                                  color: "#969799",
                                },
                              },
                              [t._v("收藏")]
                            ),
                          ],
                          1
                        ),
                      ]
                    ),
                    a(
                      "div",
                      {
                        staticClass: "flex-align btn-group",
                        staticStyle: { width: "60%" },
                      },
                      [
                        a(
                          "span",
                          {
                            staticClass: "btn cart upf",
                            on: { click: t.openSku },
                          },
                          [t._v(t._s(t.datas.cartText))]
                        ),
                        a(
                          "span",
                          {
                            staticClass: "btn buy upf",
                            on: { click: t.openSku },
                          },
                          [t._v(t._s(t.datas.buyText))]
                        ),
                      ]
                    ),
                  ],
              2 == t.datas.barType
                ? [
                    a(
                      "div",
                      {
                        staticClass: "flex-align",
                        staticStyle: {
                          width: "20%",
                          "justify-content": "space-around",
                        },
                      },
                      [
                        a(
                          "div",
                          {
                            staticClass: "left-btn",
                            on: { click: t.openKefu },
                          },
                          [
                            a("van-icon", {
                              attrs: { name: t.kefuIcon, size: "16" },
                            }),
                            a(
                              "div",
                              {
                                staticStyle: {
                                  "font-size": "9px",
                                  color: "#969799",
                                },
                              },
                              [t._v("客服")]
                            ),
                          ],
                          1
                        ),
                      ]
                    ),
                    a(
                      "div",
                      {
                        staticClass: "flex-align btn-group",
                        staticStyle: { width: "80%" },
                      },
                      [
                        a(
                          "span",
                          {
                            staticClass: "btn cantaunbuy upf",
                            on: { click: t.openSku },
                          },
                          [t._v(t._s(t.datas.cantuanText))]
                        ),
                      ]
                    ),
                  ]
                : t._e(),
              3 == t.datas.barType
                ? [
                    a(
                      "div",
                      {
                        staticClass: "flex-align",
                        staticStyle: {
                          width: "20%",
                          "justify-content": "space-around",
                        },
                      },
                      [
                        a(
                          "div",
                          {
                            staticClass: "left-btn",
                            staticStyle: { color: "#EB2E15" },
                            on: { click: t.openSku },
                          },
                          [
                            a("van-icon", {
                              attrs: {
                                name: "shopping-cart-o",
                                color: "#EB2E15",
                                size: "24",
                              },
                            }),
                            a("div", { staticStyle: { "font-size": "10px" } }, [
                              t._v("加入购物车"),
                            ]),
                          ],
                          1
                        ),
                      ]
                    ),
                    a(
                      "div",
                      {
                        staticClass: "flex-align btn-group",
                        staticStyle: { width: "80%" },
                      },
                      [
                        a(
                          "span",
                          {
                            staticClass: "btn zcybuy upf",
                            on: { click: t.openSku },
                          },
                          [t._v(t._s(t.datas.buyText))]
                        ),
                      ]
                    ),
                  ]
                : t._e(),
              4 == t.datas.barType
                ? [
                    a(
                      "div",
                      {
                        staticClass: "flex-align",
                        staticStyle: {
                          width: "20%",
                          "justify-content": "space-around",
                        },
                      },
                      [
                        a(
                          "div",
                          {
                            staticClass: "left-btn",
                            staticStyle: { color: "#EB2E15" },
                            on: { click: t.openSku },
                          },
                          [
                            a("van-icon", {
                              attrs: {
                                name: "shopping-cart-o",
                                color: "#EB2E15",
                                size: "24",
                              },
                            }),
                            a("div", { staticStyle: { "font-size": "10px" } }, [
                              t._v("加入购物车"),
                            ]),
                          ],
                          1
                        ),
                      ]
                    ),
                    a(
                      "div",
                      {
                        staticClass: "flex-align btn-group",
                        staticStyle: { width: "80%" },
                      },
                      [
                        a(
                          "span",
                          {
                            staticClass: "btn cart upf",
                            staticStyle: { "line-height": "12px !important" },
                            on: { click: t.openSku },
                          },
                          [
                            a(
                              "span",
                              {
                                staticStyle: {
                                  display: "block",
                                  padding: "5px",
                                },
                              },
                              [t._v("￥" + t._s(t.datas.originalPrice))]
                            ),
                            a(
                              "span",
                              {
                                staticStyle: {
                                  "-webkit-transform": "scale(0.5)",
                                  "font-size": "8px",
                                },
                              },
                              [t._v(t._s(t.datas.cartText2))]
                            ),
                          ]
                        ),
                        a(
                          "span",
                          {
                            staticClass: "btn buy upf",
                            staticStyle: { "line-height": "12px !important" },
                            on: { click: t.openSku },
                          },
                          [
                            a(
                              "span",
                              {
                                staticStyle: {
                                  display: "block",
                                  padding: "5px",
                                },
                              },
                              [t._v("￥" + t._s(t.datas.sellPrice))]
                            ),
                            a(
                              "span",
                              {
                                staticStyle: {
                                  "-webkit-transform": "scale(0.5)",
                                  "font-size": "8px",
                                },
                              },
                              [t._v(t._s(t.datas.buyText2))]
                            ),
                          ]
                        ),
                      ]
                    ),
                  ]
                : t._e(),
              a("vk-data-goods-sku-popup", {
                ref: "skuPopup",
                attrs: {
                  "border-radius": "20",
                  goodsDetail: t.goodsInfo,
                  mode: t.datas.barType && 1 != t.datas.barType ? 3 : t.skuMode,
                  skuIdName: "skuId",
                  buyNowText:
                    t.datas.barType && 1 != t.datas.barType
                      ? t.datas.cantuanText
                      : t.datas.buyText,
                  amountType: 0,
                },
                on: {
                  open: t.openSkuPopup,
                  close: t.closeSkuPopup,
                  "add-cart": t.buyNow,
                  "buy-now": t.buyNow,
                },
                model: {
                  value: t.skuKey,
                  callback: function (e) {
                    t.skuKey = e;
                  },
                  expression: "skuKey",
                },
              }),
            ],
            2
          ),
        ]);
      },
      i = [],
      o =
        (a("159b"),
        a("b0c0"),
        a("ac1f"),
        a("5319"),
        a("4d63"),
        a("25f0"),
        a("2aa4")),
      n = {
        name: "tabBar",
        props: { datas: Object },
        data: function () {
          return {
            active: 0,
            skuMode: 1,
            goodsInfo: {},
            skuKey: !1,
            tabBarStyle: {},
            kefuIcon:
              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAAXNSR0IArs4c6QAAHZdJREFUeF7tXQuYXEWxrjqzu0KQZLkCehNFAYGLAeXlVRDlLXAFlbcXEINIlMem+yxLAEVdFAXj7pzq3Wg0VxBBQAkimqCovAQV5eED5KmgAkFRhMTwymbn1P0qnr1fzE12us/MecxM9/fNt8k3VXWq/j7/9Ok+3VUIvnkEPALrRQA9Nh4Bj8D6EfAE8XeHR2ASBDxB/O3hEfAE8feARyAdAn4ESYeb1+oQBDxBOqSjfZjpEPAESYeb1+oQBDxBOqSjfZjpEPAESYeb1+oQBDxBOqSjfZjpEPAESYeb1+oQBDxBOqSjfZjpEPAESYeb1+oQBDxBOqSjfZjpEPAESYeb1+oQBDxBOqSjfZjpEPAESYeb1+oQBDxBOqSjfZjpEMiFIH19fZt1dXUdBQB7M/Nm4iozvxQEwfPMLJ8XAOD5if/Lvyf+H8fx6u8A4CEi+nO6ML2WRyAdApkTRCl1LACcj4hbpnPxX7T+IUQBgIflLyKu/kydOvWhwcHBl5pg35vwCPwLApkSRGv9WwCYmRPmj02QhpnvRsRboyh6NKdr+8u0KQKZEURr/RMAeFvBuD0BAD8GgFtrtdqdo6OjvyrYH3/5FkMgE4JorecCwOdKiMVTMrLEcXxnEAR3PP/883cuXLhQ5ji+eQTWiUBWBLkbAHYpO+aI+Cwz/xwAFgPAtVkuAsydO3f6ypUrZwRBMD2O4xmIOF0+zDwDAHomwWoFADwJAEuZ+UlEfJKZl3Z1dT05PDz8dNkxbnX/mk6Q2bNnd0+ZMuW5Op1eRtxkNW1xEASLoyi6Iq2DYRjOYOY3AsCOALDm37QmJ9OT1b17AOBe+YuI9zDzvUS0LIuLdaLNphNEa709ANzf4mDKcvJiRPx6FEW3TRaLUuqNiHgQABycEOLfShD7Y4h4JwBch4g3VKvVx0vgU0u64AlSp9sQ8cE4jq/s6ur62vDw8J/CMNyQmYUMEx95RCp7uwMRrweA26ZNm3br4ODgWNkdLot/TSdICz9i2fTJLfKy00awxDIyOv4AAK4iou+X2M9SuNZ0gkhUWuuWmKSXogeKdeJ2Icr4+PhV8+fPl4UA39ZCIBOChGE4j5nP9Gi3DALPMPNV8hkZGbm5ZbzOwdGsCLIbM8sk0aXJ48v6Wqs/1rjgUKgsMy8JgmBhFEWy9N3xLROCCKphGC5m5kMcEK51dXVNHxoa+uvaOkcddVRl+vTp+wZBsB8z7wsAb3aw60VTIOCJ8k/QMiOI1vr9AHCpY9+ERET1dPr6+qZWKhXZxvJ6ANhmrb/11P33Dgh0OlEyI4j86s+YMUN23m7t0B93ENFbHOT/n2gYhq9n5gnSyKPe/vLGuhGbXnc1AtcCwHlE9OtOwiMzggiISqkLEPFsF0AR8R31Xs652Ese93ZkZpnH7AcA+wPARq42vPxqBOQNvZCk7ijfLnhlSpD+/v6d4zj+pSNYC4joVEcda/HBwcEpy5Yt2wsR9yrBfGYFMz+NiH8DgPVtmpwih8wQcVMA2Ng60GwFO2Y0yZQg0kdaawHzPQ79tbynp+c18+bNk016mTel1CGIeDQAyOdlTb6g7JWSbTf3MfP9lUrlvjiOn6zVak+vWLHi6UsuucTpkNesWbM22HjjjTetVCqbIuJrmPnN8kFEWbR4RZN9r2euI0aTzAkShuGxzHx5PbTX+v5kIvqKo05D4snc5ZiEKLLJME1bCgA3BkHw3TiO7yaiP6Yxkkanr69vayFKpVLZnZllb9i2aeyk0LmGmUNjjBxYa7uWOUGSUUQm6y4ddhMRyXyhkKaUOmKNUaWeD6sPZCHij5o9d6p34cm+l02jiCjL4rJIcSAzb9CIvcl0EVFGyTCKoh9mdY2i7OZCkDAMP83M57oEGcfxbiMjI7JlpbCW7NQ9DgCOB4A1V8JkZLi4Vqt9a3R0tPQ7lwcGBjav1WoHx3F8JCK6vJtywT5ORpIRF6Wyy+ZCkP7+/m3jOJZRxLoh4uejKJKTiaVoSqnjEfEkADBEJPOqlmx9fX07VyqVIwDgSADYrtlBIOIXp02bFrbLjuFcCCKdoLX+FgAc7tAhS1944YUtFy5cuMpBx4taIjA4OBgsX778SGaW0fFQSzVbsZsQUUdRJAe5WrrlSRD5xVrkiNaxRHSlo44Xd0Sgv7//kDiOZzeZKH9ExA+3+rwkN4Iko4g8r8uJQ9v2XSJyWSK2tevl1oFABkQZQ8QTGznCXHRH5U2QQQD4pEvQiLhDFEX3ueh42cYQCMNQfpTOZua3Nmbpn9rM/BFjzJebYStvG7kS5PTTT5/e1dUl7wpc2iARneei4GUbRyA5GSrbhM4BgA0btYiIA1EUDTdqJ2/9XAmSPGZ9M3kZZxWrnAmPosjlsczKrheyQ2DOnDm7IuI5iCgrX422lvuxy50gYRgexMxOZ6HjOD58ZGTk2432jtdPj0AYhicy8wUA8Mr0VgCCIDi0Wq0uacRGnrq5EyQZRWT5bwfbQJn5CmOMvLDzrUAEkhennweAdzbihmyJiaLorkZs5KVbCEGUUmch4oUOQXKtVttmdHT0EQcdL5oRAlprIclAI+YRcZsoin7fiI08dAshSHIi8BkAqNgGycxnG2PKmO/XNoS2kktOjApR0j5y3V2pVA4qe/rUQggid0oYhpczs9QOsW13EZE/i26LVg5yySPX1wBgpzSXQ8Ql06ZNO2xwcHA8jX4eOkUS5O3MfKtjkP/lk505IpaxuFLqlUEQyJb3PdJcChHnR1HUl0Y3D53CCCLBaa2lXof1rw8iXhRF0YfyAMZfww0BpdQNsr3eTeuf0sz8fmPM19PoZq1TNEFOA4D5DkGuQMTtoyhyfdnocAkvmhYBrbVksZFsNq7t8TiO9xsZGfmdq2LW8oUSJMl8ImexJ6uP8S8YJLtETdbAePvpEEhz9ie50tVEJIVeS9UKJYggoZRaiIgnO6ByGxG9w0Hei+aMQBiGhpnnpLjsmUQ0lEIvM5XCCZIm80kcx/v6HLKZ3RNNMay1/ioAzHI0Jrt/9y/T0eXCCSIAaq2lDJp1wriyr3w43hRtK661lu1B73UJEBFvjKJIcpeVopWFIPJLI784tu0JInqNrbCXKwaBU0899VU9PT2SBHs3Fw/KtPO3FARJRhHJITXFFkhmPtoY43pC0da8l2sSAkqptwRB8H1m3sTB5DOVSuXtw8PDhSfEKA1BlFJVRAxtQUTERVEUSbI330qOgFLqBESUN+4u7XIikvPyhbbSECTZTn2xLRqIOBZFUbMzIdpe3ss5IqC1Ph8APuaodjwRuSYddLzE5OKlIYjWWl7+OWVh7+rq2mpoaOgPTUXEG8sMAa21PBJL8g7bdl+SzFw2thbSSkEQrbUGgMgFAWb+hjHmv110vGyxCMydO3f62NiYHJazTu3KzB8zxny2KM/LQhDn0YOZ32SMuaco4Px10yEQhuHRzCzHrm3bA729vTsVlYiucIIopT6BiK5JGS4johNsEfZy5UJAa30JAHzA1itm/pAx5iJb+WbKFUqQJHOG5Ll1mnvUarXdR0dH5eWiby2IgFJqO0S8DQA2s3T/FiLax1K2qWKFEkRrLTmyJFeWS8u0wI6LI142PQJa634AcEkDdAgRXZf+iuk0CyPIOeec84oXX3xR5hDWowciPhvH8e7GGKdE2OmgyVdLa70TIj4WRVFhKzZrRix75FatWvXI6OjoP7JCwvEMyTeJ6H1Z+bI+u4URJOXo0XJ5lSbr0DAM5VSlHACT0tavFllE/Bkz/xwRL8k7+XOSwf4wAJDd0lLyTZrU/LidiFxH+rr3slLq3Yj4nbqCiUAR2VAKIUgyekjqn3+3BQcAHlq5cuXuCxYseNZBp7SiNj8QzHyhMUYyG2betNZS12Oyo69/BoDTieiaZjqjtRYCHmBpcx4RnWUp2xSxQgji+tY8ifRUIlrQlKgLNqK1ftLhx0Gqyjb913tNCLTWUkR0YsSYFJ1m/4orpY5BxG9Ydsmjy5Ytm+la29HS9jrFCiFIim3QbXNISmvtnMC7UqnMzGrjntZalk8/aHsTSTFSY8xMW3kbOaXUbYi4p42sVPvKc/tJ7gRJimU+6JITKwiCI6vVqhTgaemW5AOT2F0eLSXma4lI5gZNbUqpAxAxTV3Bpo5qWmuX4w6ZYLE+YHMnSIrlvbYZPZRSByLi9Snu8qeI6FUp9CZVUUqdjoijKew2vU+UUnch4q42vuS5i6IIgtwMAHvbACEyiNgfRZHTPi1b23nLaa1lT1HaSfeWzS4rrbWWmh1SWSpN24SIpFZ6U5rNosXEhRDxU1EUOdWZSetkrgRRSknR+zscnH2xUqlsPzw8/CcHndKKaq2dfhzWCmQfIrqlmcGVyR85WIWIVrsjpOx0FEVNnQeV4hFLa/0pAPi4QyeX4tCMg7+TipbphhRHS+iPdW4CqX5ljPlFs/qmLAT5NQC8yTaodpmcT8RbwhuybCOa9dYjZlbGmMxrsuf2iJVixeSh3t7eNwwODsa2hCq7nCfI5D3k8piVV82Y3AjiWlMiz7fIeRHLE6Q+0rYpoJj5EWPM6+tbbEwiT4LI8uaBDu7uQUS3O8iXXtQTpH4XuaxmjY+PbzV//vxMj1znSZC/OBRb+TMRWe/yrQ97OSQ8Qer3g8tjFiIel3UN9lwIcsYZZ7yhVqtZ1zpv15Q+niD1CZKsrkmpva0spL9ARKdbyKUWyYUgYRi+j5mvtPWynV4OrhmzJ4jdHaC1vhYA3mMhfScR/aeFXGqRXAiS4g1y280/SvreoVTLvBN3sVLq04h4rsVd/TwRvdxCLrVIXgSx3vPPzC8ZYzZMHVGJFf0IYtc5WmvJnWWbVrbpW3DW9DIvgsghp147eOAGIrI9QGNpshxiYRhezcxHpPQmi60m3wWAQ1P6szMRyYvfpjet9esAwGp1KgiCd1Wr1e813YnEYOYEmTNnzjZBEDzsEEBTt1I7XDdz0TAMT2Lmr6S5UBAEW1Sr1cfT6K5Px2VJdS0bmWfX11o/AQAz6sXLzHONMVKOOpOWOUFSTNBnRVHkmug4E3CabTQMw5nM/NsUdn9BRG9NoTepimvfrGHsUiKyzmuVxm+ttYwKB1voXkJEJ1rIpRLJnCCuSYuZeS9jjGt56FTBF6GktU7zWJPJqJoc4JLd1du5YBEEwS7ValUqFGfWwjA8j5k/YXGBTFeyMieIUmoBIn7EItDVIlk8StheOw+50047bdvu7m6XtEVXEtGxWfnmeoiLmd9pjPlRVv5M2A3D8FBmlh+Tei3TlazMCaK1ljystnU8xomoux4irf69w7n0XyLiAVnnyrL1BxHPiaLowjzwdzk71NPTM3XevHkrsvArc4KEYXgDM9sWmP8dEW2bRaBlsynlybq7u89HxJPW4ZtMUM3SpUtHFi1aNJaH71rr7ZMM++vaL/dHRPxY1ts61oyzv79/2ziOrUZaZn6tMeaxLHDKnCBaa3lW3cnS+R8SkcuGRkuz5RWTjIrJEeS9AOABZv5xHMe3Z5nRcDI0tNZvA4CJz31F+ZPUN5RcXHVbEAQ7VavV39QVTCGQB0HkuOwWlr59mYis5yuWNr1YCyIQhuGGzPyCpetNf0c0cd08CPIcAGxkGegniOjTlrJerM0R0FrL42XdOWkcx4ePjIxIyemmt0wJMmvWrA16e3tftPU665c+tn54uXIg4JDx8SQisq5v6RJdpgRJSm5J9SjbNoeI0uRpsrXv5VoIAa317wFg63ouM/OAMcallEI9k//3faYECcNwR2a2LpPGzLONMf9j7b0XbGsElFKyzL2zRZCZPZpnShCttSSIky3Vtu0EIrrMVtjLtTcCtrufs3w0z5Qg/f39b4rj2GXH51FEdHV7d7uPzhYB2xEEEfuiKJpva9dFLlOCKKW2QETrrIjMfKgxZolLAF62fRGwnYMAwMlElGqXdD30MiXI3LlzNx4bG7Mu4ZVsq7ihntP++85AwGEVK7OSCJkSRLpRa70KALpsujTL9Wyb63uZciFg+x6EmY80xmRSHiMPgvzVttxvlst15ep67009BFzepGd5qjAPgsiGM6sNiMz8RWPMafXA89+3PwIue7EAYD8iuikLVPIgiEvG7uuNMTanyLLAwtssEQIuu3mDINiuWq26HOu2jjRzgoRheBUzH2Xp0cNE5HS6zdKuF2sxBFzOg/T29nYPDg6OZxFi5gRxTAzQEQemsujIdrPpcKLwMSJ6bVbxZ04QpdRRiHiVbQBZHn6x9cHLFY+Aw5n0W4hon6w8zpwgrnl5ASCzvf1ZgejtNh8Bh6wmFxPRuk5lNsWpzAkiXmqt2cHbjxLRBQ7yXrQNEbDNiwUA5xLRZ7KCIC+CSC4oq6KLiLgkiqK02f6ywsnbzREBl8yKAHAsEVknRncNIxeCOK5k/Z2INnUNxMu3DwIuuXmzPI8uiOZCEMeVLMmNlXlisva5ndovEofs7n8jos2zRCAvguwLADfaBoKIp0RR9CVbeS/XXgg41Ae5mohs37GlAikXggwMDGw0Pj4uyRtsW6b5Vm2d8HLFIKC1tq0wdSoRLcjSy1wIkqxk/QwAdrcM5gEieoOlrBdrIwRcahQy838YY6ySy6WFKE+CfA4A5to6GgTB7tVqVfZx+dZBCNimQZUs+caYHbOGJjeCuL5RR8Tzoyj6eNYAePvlQsChTnouO79zI8jAwMCW4+Pjj9p2ByL+KoqiXWzlvVzrI+D4ePU+Y4wkRs+05UaQZB5yLwDs4BCR33biAFari9o+XgHAilqttvXo6Ojfso45b4JEsvPEIaghIjrTQd6LtjACto9XAHANEaWt9eiEUN4EcXofItnO/WqWU3+2rLDL4xUAZL68OwFkrgRJHrPuBgDruQUzH2SM+UHL9rx33AoBh8crQMRtoiiStKSZtyIIMggAn3SIzJdEcACrVUWVUnch4q71/EfEG6Mo2r+eXLO+L4IgMnrIKGLbasy8izHGOsevrWEvVw4EtNYfBICLbLzJswyc+JM7QZLHLNmXJfMR2zZKRHNshb1cayEQhuFPmXkPG68rlcpuw8PDLj+wNmbXK1MUQWQlS1a0bNsL4+Pju86fP/9BWwUv1xoIaK2PA4Cv23jLzN8zxrzLRrZZMoUQpK+v79WVSkVqF7qc+/BLvs3q9RLZCcPwJma2PVN+BBFdk6f7hRAkecz6PAAM2AaLiM9WKpVdh4aG/mCr4+XKjYDLwai8J+cTyBVGEEnmEMfxr5i5x6EbP0NE5zrIe9ESI6C1vh4AbKsaZ3q0dn0wFUaQZBT5MgDMdujDp3p6enaZN2/ekw46XrSECCil3o2I37F07adEtKelbFPFiiaInA+RcyLWjZlHjDHKWsELlg6BwcHBYNmyZZJLV2rD122I+MEoir5aVzADgUIJkowi3wCAY1xiC4LgyGq1mkm6exc/vGw6BBzOnAMz322M2S3dlRrXKpwgYRgexMzfdwmFme/v7u7eZ2hoSEor+NZCCIRh+E5mtt46xMwfMMZcWlSIhRNEAldKXY6Ix7qAwMxfMsac4qLjZYtFQGp+xHF8EyK+1cYTZi48238pCJKUi74NAKbZADchg4jHRVF0hYuOly0OAaXUPES0Pr6AiAdHUSQrXYW1UhBEog/D8Gxmdk05+vsgCPatVquPF4agv7AVAg7Z2ifsXUpEH7AynqFQaQgiMWqtZRRxWs5j5q8aY2Szm28lReCss86a9tJLL92MiDvbuIiIY8y8OxH90kY+S5myEUT22aQpA+0TXmd5lzRoWyl1MSKe6GCmNNuKSkWQZBT5IgCkmXyfTkRfcOgEL5oDAg51Pia8eaRWq+09Ojr6RA7u1b1E6QiilNoCEeUl0tZ1vV9LABGPiaLIuliPq30v74aAUupkRFzoooWIh0dR9G0XnSxlS0cQCTYMw8OYOc2uzbhWq+04Ojp6f5agedv1EUjzfgsAziMiOXFamlZKgiSPWq5HcydAXUZEm5QG4Q50JAzDmZL50CV0Zv62MeZwF508ZEtLEAleKXUNIh6WAohMCzum8KdjVPr6+qZWKpXljgHLvOPA0dFRSVpdqlZqgvT19W1dqVRkW4LzfAQAbiOid5QK7TZ3pq+vb7NKpeK8/ads8441u6nUBGlwPiLqD+yxxx47Hn300bU2vzcLD09rvTcA3JzCkdLNO1qKIA3OR0T96eSg/59SdJ5XsUAgDMNTmTnNEjsRUWhxicJESj+CTCCjlFqAiB9pAKk9ieinDeh71XUgoLX+LACc4wpOq+yAaBmCNDhpX91//j2J6208ubzWej4AnJbC6l1E9OYUermrtBRBkjmJdQ6l9aB5BhFVc0e6zS6otf4aAJyQIqxaT0/PJvPmzVuRQjd3lZYjSDInkbysaVa2JgC+LAiC86vV6sO5I97iF1RKHYCIkjgj1QphEARbtNLu65YkSEIS+QV6edr7jZn/IlWs/P4tOwTl/UZXV9e5zGx9nmNty8y8lzHmVrsrlkOqZQmSkORpAHhFg1B+Jyn3dleDdtpWXSl1RDJq7JQ2yDiOdxsZGcktZWhaP9fWa2mCJBP3222PcK4PNGZ+IRlNXA9sNasfSmknyYApj1MfbsDBv4+Pj+/ZqmljW54gyUgih/rf30AnrlZl5psrlUq1Wq2mOZPS6OVLpa+1lnxlZwHAVg04dl+tVjuoLFvX08TRFgRJSDIMAP1pQFiHzuIgCBZ2IlESYgg56tbqqIP1TStXrjxywYIFzzapTwox0zYEEfTCMPwMM3+0iUh2DFGaSAyB/7KlS5d+aNGiRWNN7ItCTLUVQZKRpB8RL3DM+VsP/LYlSpOJITieSURD9QBtle/bjiDJxF3W6C9ARKuiLA6dJQnuhCxLWmktf+34tNY7IeIhzPzeJjxKTZi/R1L6RFH0Qwc8Sy/algRJHrc2TNIIZZHH9wVJLhEEweI4jpcQ0bKy93RydODQhBj7Ndnfy+T9iDHmqSbbLdxc2xJkAlml1PHyyAUAr84I7b8i4mJmXrJ06dLFixYtKs3W+oGBgc1XrVq1mhQAcCgAVDLAoK0eqdbGp+0JkjxybRcEgcxL0pxOdLmn5ETcHcz8YBAEDzLzvUT0gIuBtLKzZ8/unjJlykxElLorq/8CgJzR6E1rs47edcx8oTHmJxnZL4XZjiDIGqOJZNk4u8G1fdeOk+OnDyLib+M4luf0e4IgWL5q1ap/9PT0LF+xYsXyhQsXrqpndGBgYKPx8fGpzDwVAKYi4uYAMBMAdmDmHRBxBwDormenCd8/BgAXEtGCJtgqvYmOIoj0xty5c6ePjY0JSfpK1DsvIuJyZv4HAAihVgoJ1vp0lcDfBcmoISTpiNZxBFljNDkwGU3kMcS3yRGQxygZNa7rNKA6liATHa21lkKiUpZ6Rqd1vkW8tzPzRcaYiyxk21Kk4wkivaqUeiUAnISIJ+U8PynlTYWINwsxiOjyUjqYo1OeIGuALVnIV65cuZoozCyrQB3VpGANIgoxru6owCcJ1hNkHeDMmjVrg97eXiGJkMUqZX+L31BXAsDlnTjHqNdvniB1ENJaS0mGic8W9QBtoe+XCimCILiiWq3+poX8ztVVTxBLuPv6+l5WqVTWJIvMW1qx/UKIgYiXR1H0TCsGkKfPniAp0Ja5ytjY2LuY+YDkbfXrUpjJW+XqOI6vGBkZKU1pgbwBSHM9T5A0qK2lo5TaExH3B4C9EsI0wWpjJmS7CyLKaHE3It4eRZE/c58CUk+QFKBNpiKljgFAyPI2WTJm5q0QUf5mXZLhDgD4SUKKu6IoerTJoXWkOU+QnLr9lFNO2aS7u3s1WYQ4QRBsJqRBxE0S8giBJj5TAEDSGj3HzM8h4or1/H0ujuPbenp6fj40NPR8TqF01GU8QTqqu32wrgh4grgi5uU7CgFPkI7qbh+sKwKeIK6IefmOQsATpKO62wfrioAniCtiXr6jEPAE6aju9sG6IuAJ4oqYl+8oBDxBOqq7fbCuCHiCuCLm5TsKAU+QjupuH6wrAp4groh5+Y5CwBOko7rbB+uKgCeIK2JevqMQ8ATpqO72wboi4AniipiX7ygEPEE6qrt9sK4IeIK4IublOwoBT5CO6m4frCsCniCuiHn5jkLgfwHY7slfPplftwAAAABJRU5ErkJggg==",
            shopIcon:
              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAAXNSR0IArs4c6QAAF1pJREFUeF7tnQmYXUWVx3+nO2GJOIgKsmhccEMyCG6I6Cc6AmJI+r5AK467gjgqjuIMuIvrBHBECYorMrIo09LvvrDoCGi++URwxPlAEBRFUQR3EQYQEtJnvqq8jk1I0q+q7qt37+tT39ff6+WcOuf8q/59b91bdY5gzRAwBDaJgBg2hoAhsGkEjCA2OwyBzSBgBLHpYQgYQWwOGAJxCNgVJA4305ojCBhB5shAW5hxCBhB4nAzrTmCgBFkjgy0hRmHgBEkDjfTmiMIGEHmyEBbmHEIGEHicDOtOYKAEWSODLSFGYeAESQON9OaIwgYQebIQFuYcQgYQeJwM605goARZI4MtIUZh4ARJA4305ojCBhB5shAW5hxCDSKILqUpyE8nhEWot0vYSH4r23jIDCtzAhcgXAJU1zBFlwkE9yW2X6QuUYQRAsOQnklwmFB0Zlw3RH4DcJKplgpHS6so7O1JoiOeVK8AnhBHcEznypF4BxGWCGTXFppr4md1ZIguoQFjHIGsCwxPlNvHgKfkJK31cXt2hFEl/BQRjkTOLAuIJkf2RG4Ukr2ym51IwZrRRBdxiNZy1kI+9YBHPNhoAj8WUoeMlAPgNoQRMd4EsLZwJMHDYrZrw0CE1Ly4kF6Ux+CFJwOvGqQYJjtWiKwQkreMijPakEQLTgA+K9BgWB2a46A8jLp+LuL7K0eBBnjfITF2aM3g01B4BfMZ2+Z4A+5HR44QXSMf0Q4K3fgZq9hCChvkg6fzu314AlScDmwd+7AzV7jEFglJc/L7fVACaIFL4WEe0vlZoSfovwY4Xe5wTN7PSIg7ILyWGAfYMsetTYm9jwpWZWgH6w6WIK06KAsDfYaLkM4SdpMROiayoAQ0P3Yim05CPgowhMj3DhVSt4YoRetMjCC6Bh7I/72KrR9R0qeE6pk8vVCQAs+C7w+0Ks/sZpFciG/DdSLFh8cQQpOAt4a4fnTpOQHEXqmUiMEdJxtWMP/Rbj0FilZEaEXpTIQgug427OGa4AdgrxWviQdXhukY8K1RUAL3g8cF+hg1juIwRBkjLcgfDIQGFD2lw4XB+uZQi0R6G4v+lGwc8IB0uaiYL0IhcEQpOC73ScaIS5/S0r+IUTBZOuPgBb8JzAe5KnyeekEr1+CTEwLZyeItjgY5bxgb5UjpMMXgvVModYIaItx1JMkpN3GCItkkl+HKMXIDoIgZ6K8LNDZn3MXe8g3uTNQz8QbgIC2uAZl9yBXhbdLm48H6UQIZyVI9D2n8hHp8J6I+EylAQho4RfqbsHeexMul7Z/8djXlpcgBR+CiImu7C4dru0rEtb5wBDQJezOqH+qGdpeJCVfD1UKkc9GEH01W3EbP0PZJcRBlLOkw8uDdEy4cQhELdbhdCl5TT+DzUeQMV6DcFpwMMriuqaECY7FFDaJQORi3a1JF0nJjf2CNh9BWnwLDdyNKVwqbZ7dr+Ct33ohoAXunciTAr06VkpOCNTpWTwLQbTFc9GIXZgDOgPQM3omWCkCUYt1+IGUPK1SR2Z0losgn0E5MjCIW1nDrnIBtwbqmXhDEYherCtLpRPxbq0HnPpOEF3CQkb5ZQ++3FdEOVE6HBOsZwqNRiBysX6mlD4DZ+Wt/wQp/CQ/PsLzvaTkygg9U2kwApGL9dWMskjO5adVh56DIL8AHhXo+LlScmigjokPCQJRi3Xl3dLho1VD0FeC6BiHIlGn/lpSUlYdrPXXDAQiF+tXScmeVUfYX4IUPteVy3kV0q6TMvhRX0j/JltzBKIX68Ih0mayyvD6RhAteCpwRYSzb5OST0TomcoQIRC1WBe+Km2fCKSy1k+CuGORbw72VHiYtPl9sJ4pDBUCkYv1KYRF0ua6qsDoC0F0Mdsxnz8HO6l8SjoRpAo2ZApNQCBqGzwcJyUfqCq+/hCk4Cjg5Agn95aS/4nQM5UhRCBysX6tlIFnSzaDXb8Icj3wuKAxU74tHZ4fpGPCQ41A9GIdXiJl8CnFjWJZOUF0KS9kJGqPfmVBDfWsmWPBRS3WobL3aNUTJCZTu/Jb6bDTHBt7C7cHBCIX6y4Dzh7S4eoeTGxWpFKCaIvHo/wkwqn3SsmHI/RMZQ4gELlY/7CUvDcVnqoJ8nE0okLpCI/IkaEiFSzTHwwCkQnmrucmFskPWJPidWUE0f2Yx4P4KzAv0KGzpQzOchJowsSbjEBCso/kylTVEaTFG1BODR4I4TnS5jvBeoDP77qaPRhhD5QdY/ownb4hcBMj/JA7uLaKdE2Ri/WOlBQpEVZHkLjjktH1sHWMFsKJwK4pAJhu3xG4Bfhc6su76MX6CE+VSf43NspKCKItno9ySbATkdkSteBC8HUmrDUHgeSSzlGLdWG5tHlnLEzVEKSgDcGXsnvYkwVyHFMhzmvhc7K62hLWmofAgVLyzVi3IxfrP2c+i2TCr4+DWzJBdBkPZ4qbgi3Dx6Xk7aF6WnAp8KxQPZOvBQKXSRk/dtGLdeHV0uY/YhBIJ0jhj9OGnx0fYVeZ5OchTuvrmc/vfdGVlDp3ISZNtloEVjOfB8oEq2O7jVysXyhlXJnxKgjybWC/oICVb0gnfA2hy3gKU1ZdKgjruglP8XRZGXVOyEcSuVi/XUq2jYGiCoK4/+jbBBkXlkib84N0HDgHswvz+p/yPtQvkw9AQFkonahb8vVGohbr8OiYDIxJBNExnoX4NUFI+6WUwUkc/gZOwc/s0W4I3LWSvVFKHp3qUeRi/TVScnqo7TSCxKWtP0ba/v1FVIusjhply5QqRkD4mLT519ReIxfrUYmuUwkS80QpuRi8FmgqyKafHwEpSZpvMz3W8FcLUVevaIcjy/j+VUoWpA5N9yCNK9sVmug41bTpxyFwC8oy6fC9OPX7a2lcrZngdUg8QQpfUDO04uyklBxSIUiuKpHLnuK+dq6qX+unEgRc/cDLAHcENrTU86wOaItlKOfOKjhTYISDZZILQnTiCdJiDA1M7ha5tSQkIJOdGwjoOLuwJviJ5uFS8sUQhFII8jKUM0OMoTyzystskG0THjoEtOAuYOueA4tITxpPkDGORPhMz845wSkeJyv9Y1prhkAyAjrGr5GAkn7KydLhn0MMxxOk8PuoPhZijPk8RCYi8mUFGTHhuYKAtrjKnT0PiPccKTksQD7+sVvMy5oqH/OFBGmyw4mAFoRuc1olZVgZwPgrSIujUf49CPoRHiWTEcV0goyY8FxBQAs/lxb2HK+wUtqM9SwPCVeQFkegfC7EGCM8Vyb57yAdEzYENoKAjrMFa7gnEJzgSlTxV5AxXoLw1SAHlVdJhy8H6ZiwIbAxgrTYDeXaQHA+LSVvCtFJIciLkLCXLsD7pORDIQ6arCGwMQR0GYuZCtwRriyXTtjx23iCLGUvRoIPw39RSg63ITcEUhHQgn8CPh3Uj/B6afP5EJ1ogjgjOsYdCA8IMHixlOwfIF8LUR1na+7hcYwyxTxulAnuqIVjkU50M2A+FeGRrOVGlKvlPH4U2d1A1LTgU8Abg4wLe0qbq0J00ghS8A3gwBCDTXmb3k2Etxw4GHjCBjG6o8I/RDhW2rhM9rVvWvAgwO1dawGP3IjD7n7+xJgzE7mD13F2ZA3XAA8JsP1HKdk+QN6LphLErSfeE2RUOEnaHB2kk1lYx9gboQM8bLOmhd+iHC0lX8nsYpC5oBxiQtJ5nSDHIoW18G/DQ8v0RZ1LTyNIzI5KuIU1LJILuDUSn76qaczTOThKSk7pq2ORnUfteoVXSBm4zy7Svxi1yMw2H4jZVZxGkHEezBpfvP3BQYEqb5BO/XJb6UFsyZa+PuLfBcUDN6Hsm3rWOtBmT+IRb5vdfcWPgefWsVaktnghGlF/JnKjbBJB3AjpGGcigcmnhW9Lu37VpLTwT0Xc05GYdoqUvvRcbZqOcTgS9tRmvfPCydIO29iXI3At+BLw6kBb35OSZwbqePF0grQI3/a+ztNjpeSEGKf7oaMtDkOT1xK1KWGt6x7Dfwv84jy21SYe/884foyibq+qIUjsbdY666+TNqfFjl5VerqUxzLibxXT27qjpS4V68BaN8GeK4a6Z7ITNYjHkyNljCJvryohiHe+8OsJlzM3vK1lNznP3/MOrOkYVyFB26Y37atwN2vZQVb6DJADaREJDWodj59j8WN0vpQsiR2I5FusLkHcmfArIp2Iej4daet+alr4vWGvqKq/bj83SRmwy7RC41pwEvDWCrt0XQ0snu78ih8jZal0OC8Wj0oIknwVUS6XDvvEBhGrF/U2tndjV/MgniGnc3fvKmmSWrAS4v9bbta68mOEfaTkL2lehmlri1NR3hCmtV466erheqmSIClXEVeV9E7gGdIJ3qEZjJ0uZWdGuChT2qDkPGCzBahjLEH8Wu6hs8lW8PeWlIHJOiKM6iE8kbV+M+xjItTXqSRePSolSPcq4o7gBpc02ACAI6UMPGcSgKAW/hGhe6kXsocswMJGRJV3SMdnwa+8aYuPoLyr8o4336F7i+2eDPXlaqIxx7k39Ff4rLSjrzzre6vsCuIJMs4o93IRGnascSNjcUZ3a/yNVQ18N13li7v7karqNqQfVxVrgruYSK3ZpwfwABYwDv7rRSFOVCh7JcLZKK5yVCXjpEt4NCO8E+GIRD+/DxxQBYErJYgnyTKezpSvIpTy/N115baiuOf4lzCfr8kEf4gBzafLh5eifpNeHZrbPTvBKBMyiRvInpvHdi3jiI/pUT0r9lfQ3RpPeKJ0fGm84KaFr07mEgq+FBgN7uC+CmuZYn9Z6c+rJ7fKCeJJEpMSaPZQVqF+9/ANKDfwQG6Qs7h9ppoWftLsivAYpngKwsuDSzPM7keVEi4z5a+6X7/0cbmvLbmVe9kV5bH+a11M7vMFVRrvQ1+O8D9F+RUjuHjcrucbpOQGbbEDsAPqN4Cu+37dLmlHitR/pjND+RcpA3MlbAaIvhDEk6RgBfDmPgzCzC7/6AkD23VLIqT+99mcuxPAvd0B7XNYWboftngcaCdIybFVotc3gnRJ4m61GndAaiMAr6/QGrkXqMoxq6KvYYvHYRKckKEXIPtKkC5J3C3EI3pxpqYy9ytfrC0+g3JkTf2dza1hi8fFm1SUaXOA9Z0gXZK4x4FRNeJmG+0+/32Ttb218Ad2gtJY9tnXXroftnjcm7ybpc3Dewk+RiYLQbok6d9b3pjIZ9eZtfC9tliOVnvPO7tb0RLDFo8jR1vaLItGpAfFbATpkqSKF4k9hJUoonxJOry2l150XRk6V1YsuTBQL/YiZU6Tktf1otuQeFwo75KSf+slphSZrATpksRNqHcCW6Q43iddt+FyuZRhhVn82QvhGCQsMXKfYvhbt67AqnCCTPo9Wj232sbjJxCXory3qvccs4GSnSA+xnVJERxJgvKkzhZMwt9dCsvl/IXlsip+c2H3QM8xwF4JvlSh6h5/uwwlSQfSahTPOkyE45nH+2SC1VWA1EsfAyHItGP+hSK8CxnM1vCuH+eyluPlvLC32psCV5ewgFEcSQZ123UaU5wgK/lJLxNgNpkaxONcvALlgynb1meLc1N/HyhB/NVknO1ZvX77xH6xgUTond9d5PXlRKO/TRnlUNRvo+h3sVFXJLPtUsFKGZHQoAfwMscz7dEkcHboLW8P4fQsMnCCzPRUCxxB3FOJg8Bvrai6Tfh8wmu4WM7n5qo73+RVpfDxHAqeLGEZYDbv5Jkok2zBBTlvO7R/8bhoVwHfZC0XV3VVTxnnWhHkPmRp8WymWIz4/UfubPW8wED/hMvBhT/oM8E2XChn+DMnA226jBZTfjG/W7cyb6/ZAZ3vLp6bUb6M8rVBHutdf5s8Mx5hRzQoe6HbunM1wtVM+RLR59UtdVJtCbLhLNYWi1BPlI1dWdyi9DcI7lbjN8znlpz/UVMY161zsTPCTqgvZb0T8EAfy5S/yt3CFtwsE9yWYieXrk/Zui07McqOPpa17IQjjnA7yu3+c4rbGeFX0ua6XH7F2mkMQWIDND1DIAUBI0gKeqY79AgYQYZ+iC3AFASMICnome7QI2AEGfohbm6AupjtmM+TgSurOF8eg8RACKKFP066B+KD/y5TXCUr+V1MAKYzfAh0M8+4GjJ/PyO6K4FSSj6QM+KsBNFxtmE1JyIbTcfyOSkbewgp55gNtS1tMTlLgo1bpGSXXCBkI4gW9JRYTsrqktnlAtHsVINAwEnN43JdSbIQxN9LzuNa/8Jo9vZJKSvPLTu7VZMYKALaYn/Up4vqtR0oZZB8r/3eRy4PQcKz/x06yA1qUUiaUhICWvh/ii7xdq9teA5MacEXoLcTbR4d4aPS5t29ImVyzUdAC1w2TZfHrNd2jpT9P6CW5woSWi5auUA6vvyytTmCQEQtxVVSJqe4nRXdXARxaSBDznpkCX5WdEwgGwJGECNItsnWRENGECNIE+dtNp+NIEaQbJOtiYaMIEaQJs7bbD4bQYwg2SZbEw0ZQYwgTZy32Xw2ghhBsk22JhoyghhBmjhvs/lsBDGCZJtsTTRkBDGCNHHeZvPZCGIEyTbZmmjICGIEaeK8zeazEcQIkm2yNdGQEcQI0sR5m81nI4gRJNtka6IhI4gRpInzNpvPRhAjSLbJ1kRDRhAjSBPnbTafjSBGkGyTrYmGjCBGkCbO22w+G0GMINkmWxMNGUGMIE2ct9l8NoIYQbJNtiYaMoIYQZo4b7P5bAQxgmSbbE00ZAQxgjRx3mbz2QhiBMk22ZpoyAhiBGnivM3msxHECJJtsjXRkBHECNLEeZvNZyOIESTbZGuiISOIEaSJ8zabz3OdIK444/4BaH9fSp4RIG+iDUdAC34EPCkgjAulZHGAfJRongpTY3wFCaondyfKbtLhpqioTKlRCOhSdka4AWGrAMfPkJJXBshHieYhSMEK4M2BHp4iJUcF6ph4AxGIuL1yhV5PkjZH9zvcXAQ5Dnh/RDCnA5cB13vdKYRR1vmsG3yObOb3G8q6n+fN6MP1O91nSP+bs7kpH6d9cUM8LTPiv7t/XCn9z7Tj+t/QriD3+52T6YcvG8Y67YvwcJRnBd5aTU+jo6TklIg5FaSShyBL2J1RrgnyzIQNgc0hoCzMcQuehSD+H2XBpeD/W1gzBFIRuEhKDkjtpBf9nASJvc3qJQ6TmUsIKEdIhy/kCDkfQZawgFG+A+yVIzCzMbQIrJKS5+WKLhtB/G1Wi8NQvpIrOLMzhAgIh0ibyVyRZSWIJ0n4O5FcWJiduiMgHC9t3pHTzewE6S7Y7wQW5AzUbDUegUuk5AW5oxgMQVrsg/Ld3MGavcYi8Bcp2W4Q3g+EIP4q4rYXjHAO8OxBBG42G4NAKSWtQXk7MIJ4koyzNfdyMsrhgwLA7NYWgeuAFVJy6iA9HChBpgPXgv3A77taNkgwzHYtELge4cvczQr5OrcP2qNaEGQ9UVosYop9Efbtvi95AjB/0CCZ/b4hcBvwJ+CPKJcjtKVkVd+sRXRcK4JszH9dxmOYYqHfWufaWr/Fbt33I91P9/O9frvf/X/v5F3b8G/3biA73Zf7/cx+p+2s2UQf07IzP1fPkB2dYWfNJmxO/36mrLPrfj/d7/Tf3OdfZ8Q+r9un+/09M753+tN/u7v7++mf3edd3d/N3+Dzjg1+3rL7820o099v1f3dA1BuBLbu/rxN93M7lOu732/f/dy9+3ncuk9x2ycb0GpPkAZgaC4OMQJGkCEeXAstHQEjSDqG1sMQI2AEGeLBtdDSETCCpGNoPQwxAkaQIR5cCy0dASNIOobWwxAjYAQZ4sG10NIRMIKkY2g9DDECRpAhHlwLLR0BI0g6htbDECNgBBniwbXQ0hEwgqRjaD0MMQJGkCEeXAstHQEjSDqG1sMQI2AEGeLBtdDSETCCpGNoPQwxAkaQIR5cCy0dASNIOobWwxAjYAQZ4sG10NIRMIKkY2g9DDECRpAhHlwLLR0BI0g6htbDECNgBBniwbXQ0hH4f+y++iMmkpuKAAAAAElFTkSuQmCC",
          };
        },
        mounted: function () {},
        created: function () {
          var t = this;
          this.$common.isMobile()
            ? (this.tabBarStyle = { left: "0px" })
            : (this.tabBarStyle = {
                width: "375px",
                "justify-content": "center",
                display: "flex",
                "align-items": "center",
              });
          var e = {};
          if (1 == this.datas.skuType || "1" == this.datas.skuType) {
            e = {
              goods_name: this.datas.goodsName,
              goods_thumb: this.datas.goodsImg,
              _id: this.datas.goodsId,
            };
            var a = [],
              s = this.datas.skuSingleInfo;
            a.push({
              skuId: s.skuId,
              goods_id: this.datas.goodsId,
              goods_name: this.datas.goodsName,
              image: this.datas.goodsImg,
              price: s.price,
              sku_name_arr: ["默认"],
              stock: s.stock,
            }),
              (e["sku_list"] = a),
              (e["spec_list"] = [{ list: [{ name: "默认" }], name: "默认" }]);
          } else if (2 == this.datas.skuType || "2" == this.datas.skuType) {
            e = {
              goods_name: this.datas.goodsName,
              goods_thumb: this.datas.goodsImg,
              _id: this.datas.goodsId,
            };
            var i = this.datas.skuMultipleInfo,
              o = [];
            i.info.forEach(function (t) {
              var e = { name: t.name, list: [] };
              t.val.forEach(function (t) {
                e.list.push({ name: t });
              }),
                o.push(e);
            }),
              i.detail.forEach(function (e) {
                for (var a = [], s = 0; s < o.length; s++) a[s] = e[o[s].name];
                (e["sku_name_arr"] = a),
                  (e["goods_id"] = t.datas.goodsId),
                  (e["goods_name"] = t.datas.goodsName),
                  e.cover && (e["image"] = e.cover);
              }),
              (e["sku_list"] = i.detail),
              (e["spec_list"] = o);
          }
          this.goodsInfo = e;
        },
        methods: {
          openSkuPopup: function () {
            var t = document.getElementsByTagName("html")[0],
              e = t.className;
            e.indexOf("noscroll") > -1 ||
              (t.className = "" === e ? "noscroll" : e + " noscroll");
          },
          closeSkuPopup: function () {
            var t = document.getElementsByTagName("html")[0],
              e = t.className;
            e.indexOf("noscroll") > -1 &&
              (t.className = e.replace(
                new RegExp("(\\s|^)noscroll(\\s|$)"),
                ""
              ));
          },
          addCartFn: function (t) {},
          addCart: function (t) {},
          openSku: function () {
            (!this.$route.query.type ||
              ("view" !== this.$route.query.type &&
                "iframe" !== this.$route.query.type)) &&
              (this.skuKey = !0);
          },
          openKefu: function () {
            if (this.datas.customUrl) {
              var t = this.datas.customUrl.replace("https:", "taobao:");
              window.location.href = t;
            }
          },
          buyNow: function (t) {
            this.$emit("clickTabBar", t);
          },
          findGoodsInfo: function () {},
        },
        computed: {},
        watch: {},
        components: { vkDataGoodsSkuPopup: o["default"] },
        beforeDestroy: function () {},
      },
      r = n,
      c = (a("1034"), a("2877")),
      d = Object(c["a"])(r, s, i, !1, null, "0fc8af86", null);
    e["default"] = d.exports;
  },
  aa30: function (t, e, a) {
    "use strict";
    a.r(e);
    var s = function () {
        var t = this,
          e = t.$createElement,
          a = t._self._c || e;
        return a(
          "div",
          { staticClass: "payondelivery main" },
          [
            t.datas.showSubmit
              ? t._e()
              : a("div", { staticClass: "btnclass" }, [
                  a("div", { staticClass: "h5-btn flex-align space-between" }, [
                    a(
                      "div",
                      {
                        staticClass: "flex-align btn-group",
                        staticStyle: { width: "99%" },
                        attrs: { id: "payOndeliveryButton" },
                        on: { click: t.totop },
                      },
                      [
                        a(
                          "span",
                          { staticClass: "btn zcybuy upf" },
                          [
                            a("van-icon", {
                              attrs: { name: "shopping-cart-o", size: "20" },
                            }),
                            t._v(t._s(t.datas.btnText)),
                          ],
                          1
                        ),
                      ]
                    ),
                  ]),
                ]),
            t.datas.showSubmit
              ? a(
                  "div",
                  { ref: "containerPay", staticClass: "formclass" },
                  [
                    a("van-sticky", { attrs: { container: t.containerPay } }, [
                      a(
                        "div",
                        {
                          staticStyle: {
                            "overflow-y": "scroll",
                            "max-height": "100vh",
                          },
                        },
                        [
                          a("van-nav-bar", {
                            attrs: {
                              title: "订单信息",
                              "left-text": "返回",
                              "left-arrow": "",
                            },
                            on: { "click-left": t.backFun },
                          }),
                          t.showSuccess
                            ? t._e()
                            : a(
                                "div",
                                [
                                  a(
                                    "van-notice-bar",
                                    {
                                      attrs: {
                                        color: "#323233",
                                        background: "#f7f8fa",
                                        "left-icon": "good-job-o",
                                      },
                                    },
                                    [t._v(" " + t._s(t.datas.goodsZan) + " ")]
                                  ),
                                  a("van-card", {
                                    attrs: {
                                      num: t.datas.num,
                                      price: t.datas.price,
                                      background: "#fff",
                                      title: t.datas.goodsName,
                                      desc: t.datas.goodsDesc,
                                      thumb: t.datas.goodsImg,
                                    },
                                  }),
                                  a(
                                    "van-cell-group",
                                    [
                                      a("van-cell", {
                                        attrs: { center: "" },
                                        scopedSlots: t._u(
                                          [
                                            {
                                              key: "title",
                                              fn: function () {
                                                return [
                                                  a(
                                                    "span",
                                                    {
                                                      staticStyle: {
                                                        color: "#ff6a95",
                                                        padding: "5px",
                                                      },
                                                    },
                                                    [t._v("*")]
                                                  ),
                                                  t._v("购买产品 "),
                                                ];
                                              },
                                              proxy: !0,
                                            },
                                            {
                                              key: "label",
                                              fn: function () {
                                                return [
                                                  t.datas.goodsDetail
                                                    ? a(
                                                        "div",
                                                        {
                                                          staticClass:
                                                            "labelclass",
                                                        },
                                                        [
                                                          t._v(
                                                            t._s(
                                                              t.datas
                                                                .goodsDetail
                                                            ) + " "
                                                          ),
                                                        ]
                                                      )
                                                    : t._e(),
                                                  t.datas.goodsDetail &&
                                                  "" != t.datas.goodsDetail
                                                    ? t._e()
                                                    : a(
                                                        "div",
                                                        {
                                                          staticClass:
                                                            "labelclass",
                                                        },
                                                        [
                                                          t._v(
                                                            " " +
                                                              t._s(
                                                                t.datas
                                                                  .goodsName
                                                              ) +
                                                              " "
                                                          ),
                                                        ]
                                                      ),
                                                ];
                                              },
                                              proxy: !0,
                                            },
                                          ],
                                          null,
                                          !1,
                                          97150601
                                        ),
                                      }),
                                    ],
                                    1
                                  ),
                                  2 == t.datas.skuType && t.datas.skuVal
                                    ? a("van-cell", {
                                        attrs: { center: "" },
                                        scopedSlots: t._u(
                                          [
                                            {
                                              key: "title",
                                              fn: function () {
                                                return [
                                                  a(
                                                    "span",
                                                    {
                                                      staticStyle: {
                                                        color: "#ff6a95",
                                                        padding: "5px",
                                                      },
                                                    },
                                                    [t._v("*")]
                                                  ),
                                                  t._v("选择规格 "),
                                                ];
                                              },
                                              proxy: !0,
                                            },
                                            {
                                              key: "label",
                                              fn: function () {
                                                return [
                                                  2 == t.datas.skuType &&
                                                  t.datas.skuVal
                                                    ? a(
                                                        "van-radio-group",
                                                        {
                                                          staticStyle: {
                                                            margin: "5px",
                                                          },
                                                          attrs: {
                                                            direction:
                                                              "horizontal",
                                                          },
                                                          model: {
                                                            value:
                                                              t.datas.price,
                                                            callback: function (
                                                              e
                                                            ) {
                                                              t.$set(
                                                                t.datas,
                                                                "price",
                                                                e
                                                              );
                                                            },
                                                            expression:
                                                              "datas.price",
                                                          },
                                                        },
                                                        t._l(
                                                          t.datas.skuVal,
                                                          function (e, s) {
                                                            return a(
                                                              "van-radio",
                                                              {
                                                                key: s,
                                                                attrs: {
                                                                  name: e.price,
                                                                  checked:
                                                                    0 == s,
                                                                },
                                                                on: {
                                                                  click:
                                                                    function (
                                                                      a
                                                                    ) {
                                                                      return t.getSkuName(
                                                                        e.name
                                                                      );
                                                                    },
                                                                },
                                                              },
                                                              [
                                                                t._v(
                                                                  " " +
                                                                    t._s(
                                                                      e.name
                                                                    ) +
                                                                    " "
                                                                ),
                                                              ]
                                                            );
                                                          }
                                                        ),
                                                        1
                                                      )
                                                    : t._e(),
                                                ];
                                              },
                                              proxy: !0,
                                            },
                                          ],
                                          null,
                                          !1,
                                          1211486131
                                        ),
                                      })
                                    : t._e(),
                                  a("van-field", {
                                    attrs: { name: "stepper" },
                                    scopedSlots: t._u(
                                      [
                                        {
                                          key: "label",
                                          fn: function () {
                                            return [
                                              a(
                                                "span",
                                                {
                                                  staticStyle: {
                                                    color: "#ff6a95",
                                                    padding: "5px",
                                                  },
                                                },
                                                [t._v("*")]
                                              ),
                                              a(
                                                "span",
                                                {
                                                  staticStyle: {
                                                    color: "#323233",
                                                  },
                                                },
                                                [t._v("购买数量")]
                                              ),
                                            ];
                                          },
                                          proxy: !0,
                                        },
                                        {
                                          key: "input",
                                          fn: function () {
                                            return [
                                              a("van-stepper", {
                                                attrs: {
                                                  "input-width": "100",
                                                  theme: "round",
                                                },
                                                model: {
                                                  value: t.datas.num,
                                                  callback: function (e) {
                                                    t.$set(t.datas, "num", e);
                                                  },
                                                  expression: "datas.num",
                                                },
                                              }),
                                            ];
                                          },
                                          proxy: !0,
                                        },
                                      ],
                                      null,
                                      !1,
                                      1715808262
                                    ),
                                  }),
                                  a("van-field", {
                                    attrs: { placeholder: "请输入收货人" },
                                    scopedSlots: t._u(
                                      [
                                        {
                                          key: "label",
                                          fn: function () {
                                            return [
                                              a(
                                                "span",
                                                {
                                                  staticStyle: {
                                                    color: "#ff6a95",
                                                    padding: "5px",
                                                  },
                                                },
                                                [t._v("*")]
                                              ),
                                              a(
                                                "span",
                                                {
                                                  staticStyle: {
                                                    color: "#323233",
                                                  },
                                                },
                                                [t._v("收货人")]
                                              ),
                                            ];
                                          },
                                          proxy: !0,
                                        },
                                      ],
                                      null,
                                      !1,
                                      2967727519
                                    ),
                                    model: {
                                      value: t.username,
                                      callback: function (e) {
                                        t.username = e;
                                      },
                                      expression: "username",
                                    },
                                  }),
                                  a("van-field", {
                                    attrs: {
                                      type: "tel",
                                      placeholder: "请输入手机号码",
                                    },
                                    scopedSlots: t._u(
                                      [
                                        {
                                          key: "label",
                                          fn: function () {
                                            return [
                                              a(
                                                "span",
                                                {
                                                  staticStyle: {
                                                    color: "#ff6a95",
                                                    padding: "5px",
                                                  },
                                                },
                                                [t._v("*")]
                                              ),
                                              a(
                                                "span",
                                                {
                                                  staticStyle: {
                                                    color: "#323233",
                                                  },
                                                },
                                                [t._v("手机号码")]
                                              ),
                                            ];
                                          },
                                          proxy: !0,
                                        },
                                      ],
                                      null,
                                      !1,
                                      2578015635
                                    ),
                                    model: {
                                      value: t.phone,
                                      callback: function (e) {
                                        t.phone = e;
                                      },
                                      expression: "phone",
                                    },
                                  }),
                                  a("van-field", {
                                    attrs: {
                                      "is-link": "",
                                      readonly: "",
                                      name: "area",
                                      placeholder: "点击选择所在地区",
                                    },
                                    on: {
                                      click: function (e) {
                                        t.showArea = !0;
                                      },
                                    },
                                    scopedSlots: t._u(
                                      [
                                        {
                                          key: "label",
                                          fn: function () {
                                            return [
                                              a(
                                                "span",
                                                {
                                                  staticStyle: {
                                                    color: "#ff6a95",
                                                    padding: "5px",
                                                  },
                                                },
                                                [t._v("*")]
                                              ),
                                              a(
                                                "span",
                                                {
                                                  staticStyle: {
                                                    color: "#323233",
                                                  },
                                                },
                                                [t._v("所在地区")]
                                              ),
                                            ];
                                          },
                                          proxy: !0,
                                        },
                                      ],
                                      null,
                                      !1,
                                      3517912566
                                    ),
                                    model: {
                                      value: t.address,
                                      callback: function (e) {
                                        t.address = e;
                                      },
                                      expression: "address",
                                    },
                                  }),
                                  a(
                                    "van-popup",
                                    {
                                      attrs: { position: "bottom" },
                                      model: {
                                        value: t.showArea,
                                        callback: function (e) {
                                          t.showArea = e;
                                        },
                                        expression: "showArea",
                                      },
                                    },
                                    [
                                      a("van-area", {
                                        attrs: { "area-list": t.areaList },
                                        on: {
                                          confirm: t.onConfirm,
                                          cancel: function (e) {
                                            t.showArea = !1;
                                          },
                                        },
                                      }),
                                    ],
                                    1
                                  ),
                                  a("van-field", {
                                    attrs: {
                                      type: "textarea",
                                      autosize: "",
                                      placeholder: "请输入详细地址",
                                    },
                                    scopedSlots: t._u(
                                      [
                                        {
                                          key: "label",
                                          fn: function () {
                                            return [
                                              a(
                                                "span",
                                                {
                                                  staticStyle: {
                                                    color: "#ff6a95",
                                                    padding: "5px",
                                                  },
                                                },
                                                [t._v("*")]
                                              ),
                                              a(
                                                "span",
                                                {
                                                  staticStyle: {
                                                    color: "#323233",
                                                  },
                                                },
                                                [t._v("详细地址")]
                                              ),
                                            ];
                                          },
                                          proxy: !0,
                                        },
                                      ],
                                      null,
                                      !1,
                                      3851368068
                                    ),
                                    model: {
                                      value: t.addressDetail,
                                      callback: function (e) {
                                        t.addressDetail = e;
                                      },
                                      expression: "addressDetail",
                                    },
                                  }),
                                  a(
                                    "van-cell-group",
                                    [
                                      a("van-cell", {
                                        attrs: { center: "" },
                                        scopedSlots: t._u(
                                          [
                                            {
                                              key: "title",
                                              fn: function () {
                                                return [
                                                  a(
                                                    "span",
                                                    {
                                                      staticStyle: {
                                                        color: "#ff6a95",
                                                        padding: "5px",
                                                      },
                                                    },
                                                    [t._v("*")]
                                                  ),
                                                  t._v("支付方式 "),
                                                ];
                                              },
                                              proxy: !0,
                                            },
                                            2 == t.datas.payType
                                              ? {
                                                  key: "label",
                                                  fn: function () {
                                                    return [
                                                      a("van-icon", {
                                                        attrs: {
                                                          name: "https://oss1.modsty.com/sys/h5/image/wechatPay.png",
                                                          size: "18",
                                                        },
                                                      }),
                                                      t._v(
                                                        " 微信支付(在线支付) "
                                                      ),
                                                      a("van-icon", {
                                                        staticStyle: {
                                                          float: "right",
                                                        },
                                                        attrs: {
                                                          name: "passed",
                                                          color: "#ff6a95",
                                                          size: "18",
                                                        },
                                                      }),
                                                    ];
                                                  },
                                                  proxy: !0,
                                                }
                                              : {
                                                  key: "label",
                                                  fn: function () {
                                                    return [
                                                      a("van-icon", {
                                                        attrs: {
                                                          name: "guide-o",
                                                          color: "#ff6a95",
                                                          size: "18",
                                                        },
                                                      }),
                                                      t._v(
                                                        " 货到支付(验货满意后支付) "
                                                      ),
                                                      a("van-icon", {
                                                        staticStyle: {
                                                          float: "right",
                                                        },
                                                        attrs: {
                                                          name: "passed",
                                                          color: "#ff6a95",
                                                          size: "18",
                                                        },
                                                      }),
                                                    ];
                                                  },
                                                  proxy: !0,
                                                },
                                          ],
                                          null,
                                          !0
                                        ),
                                      }),
                                    ],
                                    1
                                  ),
                                  a(
                                    "van-cell-group",
                                    [
                                      a("van-cell", {
                                        attrs: {
                                          center: "",
                                          "value-class": "feeclass",
                                          value: "包邮",
                                        },
                                        scopedSlots: t._u(
                                          [
                                            {
                                              key: "title",
                                              fn: function () {
                                                return [
                                                  a(
                                                    "span",
                                                    {
                                                      staticStyle: {
                                                        color: "#ff6a95",
                                                        padding: "5px",
                                                      },
                                                    },
                                                    [t._v("*")]
                                                  ),
                                                  t._v("运费 "),
                                                ];
                                              },
                                              proxy: !0,
                                            },
                                          ],
                                          null,
                                          !1,
                                          2261492765
                                        ),
                                      }),
                                    ],
                                    1
                                  ),
                                  a(
                                    "van-cell-group",
                                    [
                                      a("van-cell", {
                                        attrs: {
                                          center: "",
                                          "value-class": "priceclass",
                                          value:
                                            t.datas.price && t.datas.num
                                              ? "￥" +
                                                (
                                                  t.datas.price * t.datas.num
                                                ).toFixed(2)
                                              : "￥0.00",
                                        },
                                        scopedSlots: t._u(
                                          [
                                            {
                                              key: "title",
                                              fn: function () {
                                                return [
                                                  a(
                                                    "span",
                                                    {
                                                      staticStyle: {
                                                        color: "#ff6a95",
                                                        padding: "5px",
                                                      },
                                                    },
                                                    [t._v("*")]
                                                  ),
                                                  t._v("实付金额 "),
                                                ];
                                              },
                                              proxy: !0,
                                            },
                                          ],
                                          null,
                                          !1,
                                          1058568830
                                        ),
                                      }),
                                    ],
                                    1
                                  ),
                                  a(
                                    "van-cell-group",
                                    [
                                      a("van-field", {
                                        attrs: {
                                          type: "textarea",
                                          autosize: "",
                                          placeholder: "请输入留言",
                                        },
                                        scopedSlots: t._u(
                                          [
                                            {
                                              key: "label",
                                              fn: function () {
                                                return [
                                                  a(
                                                    "span",
                                                    {
                                                      staticStyle: {
                                                        color: "#323233",
                                                      },
                                                    },
                                                    [t._v("买家留言")]
                                                  ),
                                                ];
                                              },
                                              proxy: !0,
                                            },
                                          ],
                                          null,
                                          !1,
                                          29270242
                                        ),
                                        model: {
                                          value: t.remark,
                                          callback: function (e) {
                                            t.remark = e;
                                          },
                                          expression: "remark",
                                        },
                                      }),
                                    ],
                                    1
                                  ),
                                  a(
                                    "div",
                                    {
                                      staticStyle: {
                                        margin: "20px",
                                        padding: "10px",
                                      },
                                    },
                                    [
                                      a(
                                        "van-button",
                                        {
                                          staticStyle: {
                                            "border-radius": "5px",
                                          },
                                          attrs: {
                                            block: "",
                                            type: "primary",
                                            color: "#ff2043",
                                            "native-type": "submit",
                                          },
                                          on: { click: t.saveOrder },
                                        },
                                        [
                                          a("van-icon", {
                                            attrs: {
                                              name: "shopping-cart-o",
                                              size: "20",
                                            },
                                          }),
                                          t._v(
                                            " " + t._s(t.datas.btnText) + " "
                                          ),
                                        ],
                                        1
                                      ),
                                    ],
                                    1
                                  ),
                                ],
                                1
                              ),
                          t.showSuccess
                            ? a(
                                "div",
                                {
                                  staticClass: "el-result",
                                  staticStyle: {
                                    background: "rgb(255, 255, 255)",
                                  },
                                },
                                [
                                  a("div", { staticClass: "el-result__icon" }, [
                                    a(
                                      "svg",
                                      {
                                        staticClass: "icon-success",
                                        attrs: {
                                          viewBox: "0 0 1024 1024",
                                          xmlns: "http://www.w3.org/2000/svg",
                                        },
                                      },
                                      [
                                        a("path", {
                                          attrs: {
                                            fill: "currentColor",
                                            d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm-55.808 536.384-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336L456.192 600.384z",
                                          },
                                        }),
                                      ]
                                    ),
                                  ]),
                                  a(
                                    "div",
                                    { staticClass: "el-result__title" },
                                    [a("p", [t._v("订单提交成功")])]
                                  ),
                                  a(
                                    "div",
                                    { staticClass: "el-result__subtitle" },
                                    [a("p", [t._v("等待商品发货(货到付款)")])]
                                  ),
                                  a(
                                    "div",
                                    {
                                      staticClass: "el-result__extra",
                                      on: { click: t.backFun },
                                    },
                                    [
                                      a(
                                        "button",
                                        {
                                          staticClass:
                                            "el-button el-button--primary el-button--default",
                                          staticStyle: {
                                            "border-radius": "5px",
                                            "--el-button-bg-color": "#ff2043",
                                            "--el-button-text-color": "#fff",
                                            "--el-button-border-color":
                                              "#ff2043",
                                            "--el-button-hover-bg-color":
                                              "rgb(255, 99, 123)",
                                            "--el-button-hover-text-color":
                                              "#fff",
                                            "--el-button-hover-border-color":
                                              "rgb(255, 99, 123)",
                                            "--el-button-active-bg-color":
                                              "rgb(208, 30, 58)",
                                            "--el-button-active-border-color":
                                              "rgb(208, 30, 58)",
                                          },
                                          attrs: {
                                            "aria-disabled": "false",
                                            type: "button",
                                          },
                                        },
                                        [a("span", {}, [t._v("返回商品页 ")])]
                                      ),
                                    ]
                                  ),
                                ]
                              )
                            : t._e(),
                        ],
                        1
                      ),
                    ]),
                  ],
                  1
                )
              : t._e(),
            t._t("deles"),
          ],
          2
        );
      },
      i = [],
      o = (a("b0c0"), a("a15b"), a("d81d"), a("434d")),
      n = {
        name: "payondelivery",
        props: { datas: Object },
        data: function () {
          return {
            containerPay: null,
            areaList: o["a"],
            active: 0,
            username: "",
            phone: "",
            address: "",
            addressDetail: "",
            skuName: "",
            remark: "",
            showArea: !1,
            showSuccess: !1,
          };
        },
        created: function () {
          this.datas.skuType &&
            2 == this.datas.skuType &&
            this.datas.skuVal &&
            ((this.datas.price = this.datas.skuVal[0].price),
            (this.skuName = this.datas.skuVal[0].name));
        },
        mounted: function () {
          this.containerPay = this.$refs.containerPay;
        },
        watch: {},
        methods: {
          getSkuName: function (t) {
            this.skuName = t;
          },
          totop: function () {
            (this.datas.showSubmit = !0),
              (document.documentElement.scrollTop = 0),
              (document.body.scrollTop = 0);
          },
          backFun: function () {
            (this.datas.showSubmit = !1),
              (this.showSuccess = !1),
              (this.username = ""),
              (this.phone = ""),
              (this.address = ""),
              (this.addressDetail = ""),
              (this.remark = "");
          },
          validatePhoneNumber: function (t) {
            var e = /^1[3456789]\d{9}$/;
            return e.test(t);
          },
          saveOrder: function () {
            if (2 != this.datas.payType)
              if ("" != this.username && null != this.username)
                if ("" != this.phone && null != this.phone)
                  if (this.validatePhoneNumber(this.phone))
                    if ("" != this.address && null != this.address)
                      if (
                        "" != this.addressDetail &&
                        null != this.addressDetail
                      ) {
                        var t = {
                          username: this.username,
                          phone: this.phone,
                          address: this.address + this.addressDetail,
                          remark: this.remark,
                          num: this.datas.num,
                          price: this.datas.price,
                          goodsName:
                            null != this.skuName && "" != this.skuName
                              ? this.datas.goodsName + " 规格：" + this.skuName
                              : this.datas.goodsName,
                          goodsImg: this.datas.goodsImg,
                        };
                        this.$emit("clickPayOnDelivery", t),
                          (this.showSuccess = !0);
                      } else this.$toast("请填写详细地址", "none");
                    else this.$toast("请选择所在地区", "none");
                  else this.$toast("请填写正确手机号码", "none");
                else this.$toast("请填写手机号码", "none");
              else this.$toast("请填写收货人", "none");
            else this.$toast("未配置微信支付", "none");
          },
          onConfirm: function (t) {
            (this.showArea = !1),
              (this.address = t
                .map(function (t) {
                  return t.name;
                })
                .join(""));
          },
        },
        computed: {},
        beforeDestroy: function () {},
      },
      r = n,
      c = (a("48ab"), a("2877")),
      d = Object(c["a"])(r, s, i, !1, null, "0c6dc158", null);
    e["default"] = d.exports;
  },
  ad74: function (t, e, a) {},
  b0bd: function (t, e, a) {
    "use strict";
    a.r(e);
    var s = function () {
        var t = this,
          e = t.$createElement,
          a = t._self._c || e;
        return a(
          "div",
          { staticClass: "investigate", on: { click: t.guanbi } },
          [
            t.showSuccess
              ? t._e()
              : t._l(t.datas.jsonData, function (e, s) {
                  return a(
                    "div",
                    {
                      key: s,
                      staticClass: "rescon",
                      on: {
                        mouseleave: function (e) {
                          return t.leave();
                        },
                      },
                    },
                    [
                      0 == e.type
                        ? a(
                            "div",
                            [
                              a(
                                "van-cell-group",
                                [
                                  a("van-field", {
                                    attrs: {
                                      label: e.name,
                                      placeholder: e.value,
                                    },
                                    scopedSlots: t._u(
                                      [
                                        {
                                          key: "label",
                                          fn: function () {
                                            return [
                                              a(
                                                "span",
                                                {
                                                  staticStyle: {
                                                    color: "#323233",
                                                  },
                                                },
                                                [t._v(t._s(e.name))]
                                              ),
                                              !e.isNeed ||
                                              (1 != e.isNeed && 3 != e.isNeed)
                                                ? t._e()
                                                : a(
                                                    "span",
                                                    {
                                                      staticStyle: {
                                                        color: "#ff6a95",
                                                        padding: "5px",
                                                      },
                                                    },
                                                    [t._v("*")]
                                                  ),
                                            ];
                                          },
                                          proxy: !0,
                                        },
                                      ],
                                      null,
                                      !0
                                    ),
                                    model: {
                                      value: e.value2,
                                      callback: function (a) {
                                        t.$set(e, "value2", a);
                                      },
                                      expression: "item1.value2",
                                    },
                                  }),
                                ],
                                1
                              ),
                            ],
                            1
                          )
                        : t._e(),
                      1 == e.type
                        ? a(
                            "div",
                            [
                              a(
                                "van-cell-group",
                                [
                                  a("van-field", {
                                    attrs: {
                                      label: e.name,
                                      placeholder: e.value3,
                                      "is-link": "",
                                      readonly: "",
                                    },
                                    on: {
                                      click: function (a) {
                                        return t.show(e, s);
                                      },
                                    },
                                    scopedSlots: t._u(
                                      [
                                        {
                                          key: "label",
                                          fn: function () {
                                            return [
                                              a(
                                                "span",
                                                {
                                                  staticStyle: {
                                                    color: "#323233",
                                                  },
                                                },
                                                [t._v(t._s(e.name))]
                                              ),
                                              !e.isNeed ||
                                              (1 != e.isNeed && 3 != e.isNeed)
                                                ? t._e()
                                                : a(
                                                    "span",
                                                    {
                                                      staticStyle: {
                                                        color: "#ff6a95",
                                                        padding: "5px",
                                                      },
                                                    },
                                                    [t._v("*")]
                                                  ),
                                            ];
                                          },
                                          proxy: !0,
                                        },
                                      ],
                                      null,
                                      !0
                                    ),
                                    model: {
                                      value: e.value2,
                                      callback: function (a) {
                                        t.$set(e, "value2", a);
                                      },
                                      expression: "item1.value2",
                                    },
                                  }),
                                ],
                                1
                              ),
                            ],
                            1
                          )
                        : t._e(),
                      2 == e.type
                        ? a(
                            "div",
                            [
                              a(
                                "van-cell-group",
                                [
                                  a("van-field", {
                                    attrs: { label: e.name },
                                    scopedSlots: t._u(
                                      [
                                        {
                                          key: "label",
                                          fn: function () {
                                            return [
                                              a(
                                                "span",
                                                {
                                                  staticStyle: {
                                                    color: "#323233",
                                                  },
                                                },
                                                [t._v(t._s(e.name))]
                                              ),
                                              !e.isNeed ||
                                              (1 != e.isNeed && 3 != e.isNeed)
                                                ? t._e()
                                                : a(
                                                    "span",
                                                    {
                                                      staticStyle: {
                                                        color: "#ff6a95",
                                                        padding: "5px",
                                                      },
                                                    },
                                                    [t._v("*")]
                                                  ),
                                            ];
                                          },
                                          proxy: !0,
                                        },
                                        {
                                          key: "input",
                                          fn: function () {
                                            return [
                                              a(
                                                "van-radio-group",
                                                {
                                                  attrs: {
                                                    direction: "horizontal",
                                                  },
                                                  model: {
                                                    value: e.value2,
                                                    callback: function (a) {
                                                      t.$set(e, "value2", a);
                                                    },
                                                    expression: "item1.value2",
                                                  },
                                                },
                                                t._l(e.value1, function (e, s) {
                                                  return a(
                                                    "van-radio",
                                                    {
                                                      key: s,
                                                      attrs: { name: e },
                                                    },
                                                    [t._v(t._s(e))]
                                                  );
                                                }),
                                                1
                                              ),
                                            ];
                                          },
                                          proxy: !0,
                                        },
                                      ],
                                      null,
                                      !0
                                    ),
                                  }),
                                ],
                                1
                              ),
                            ],
                            1
                          )
                        : t._e(),
                      3 == e.type
                        ? a(
                            "div",
                            [
                              a(
                                "van-cell-group",
                                [
                                  a("van-field", {
                                    attrs: { label: e.name },
                                    scopedSlots: t._u(
                                      [
                                        {
                                          key: "label",
                                          fn: function () {
                                            return [
                                              a(
                                                "span",
                                                {
                                                  staticStyle: {
                                                    color: "#323233",
                                                  },
                                                },
                                                [t._v(t._s(e.name))]
                                              ),
                                              !e.isNeed ||
                                              (1 != e.isNeed && 3 != e.isNeed)
                                                ? t._e()
                                                : a(
                                                    "span",
                                                    {
                                                      staticStyle: {
                                                        color: "#ff6a95",
                                                        padding: "5px",
                                                      },
                                                    },
                                                    [t._v("*")]
                                                  ),
                                            ];
                                          },
                                          proxy: !0,
                                        },
                                        {
                                          key: "input",
                                          fn: function () {
                                            return [
                                              a(
                                                "van-checkbox-group",
                                                {
                                                  attrs: {
                                                    direction: "horizontal",
                                                  },
                                                  model: {
                                                    value: e.value2,
                                                    callback: function (a) {
                                                      t.$set(e, "value2", a);
                                                    },
                                                    expression: "item1.value2",
                                                  },
                                                },
                                                t._l(e.value1, function (e, s) {
                                                  return a(
                                                    "van-checkbox",
                                                    {
                                                      key: s,
                                                      attrs: {
                                                        name: e,
                                                        shape: "square",
                                                      },
                                                    },
                                                    [t._v(t._s(e) + " ")]
                                                  );
                                                }),
                                                1
                                              ),
                                            ];
                                          },
                                          proxy: !0,
                                        },
                                      ],
                                      null,
                                      !0
                                    ),
                                  }),
                                ],
                                1
                              ),
                            ],
                            1
                          )
                        : t._e(),
                      4 == e.type
                        ? a(
                            "div",
                            [
                              a(
                                "van-cell-group",
                                [
                                  a("van-field", {
                                    attrs: {
                                      label: e.name,
                                      placeholder: e.value,
                                      type: "textarea",
                                      rows: "2",
                                      autosize: "",
                                    },
                                    scopedSlots: t._u(
                                      [
                                        {
                                          key: "label",
                                          fn: function () {
                                            return [
                                              a(
                                                "span",
                                                {
                                                  staticStyle: {
                                                    color: "#323233",
                                                  },
                                                },
                                                [t._v(t._s(e.name))]
                                              ),
                                              !e.isNeed ||
                                              (1 != e.isNeed && 3 != e.isNeed)
                                                ? t._e()
                                                : a(
                                                    "span",
                                                    {
                                                      staticStyle: {
                                                        color: "#ff6a95",
                                                        padding: "5px",
                                                      },
                                                    },
                                                    [t._v("*")]
                                                  ),
                                            ];
                                          },
                                          proxy: !0,
                                        },
                                      ],
                                      null,
                                      !0
                                    ),
                                    model: {
                                      value: e.value2,
                                      callback: function (a) {
                                        t.$set(e, "value2", a);
                                      },
                                      expression: "item1.value2",
                                    },
                                  }),
                                ],
                                1
                              ),
                            ],
                            1
                          )
                        : t._e(),
                    ]
                  );
                }),
            a(
              "van-popup",
              {
                attrs: { position: "bottom" },
                model: {
                  value: t.showPicker,
                  callback: function (e) {
                    t.showPicker = e;
                  },
                  expression: "showPicker",
                },
              },
              [
                a("van-picker", {
                  attrs: { "show-toolbar": "", columns: t.columns },
                  on: {
                    confirm: t.xuanze,
                    cancel: function (e) {
                      t.showPicker = !1;
                    },
                  },
                }),
              ],
              1
            ),
            t.showSuccess
              ? t._e()
              : a("div", { staticClass: "button" }, [
                  a("button", { on: { click: t.submit } }, [
                    t._v(t._s(t.datas.title)),
                  ]),
                ]),
            t.showSuccess
              ? a(
                  "div",
                  { ref: "containerForm", staticClass: "success-form" },
                  [
                    a("van-sticky", { attrs: { container: t.containerForm } }, [
                      a(
                        "div",
                        {
                          staticClass: "el-result",
                          staticStyle: {
                            background: "rgb(255, 255, 255)",
                            "max-height": "100vh",
                          },
                        },
                        [
                          a("div", { staticClass: "el-result__icon" }, [
                            a(
                              "svg",
                              {
                                staticClass: "icon-success",
                                attrs: {
                                  viewBox: "0 0 1024 1024",
                                  xmlns: "http://www.w3.org/2000/svg",
                                },
                              },
                              [
                                a("path", {
                                  attrs: {
                                    fill: "currentColor",
                                    d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm-55.808 536.384-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336L456.192 600.384z",
                                  },
                                }),
                              ]
                            ),
                          ]),
                          a("div", { staticClass: "el-result__title" }, [
                            a("p", [t._v("提交成功")]),
                          ]),
                          a(
                            "div",
                            {
                              staticClass: "el-result__extra",
                              on: { click: t.backFun },
                            },
                            [
                              a(
                                "button",
                                {
                                  staticClass:
                                    "el-button el-button--primary el-button--default",
                                  staticStyle: {
                                    "border-radius": "5px",
                                    "--el-button-bg-color": "#ff2043",
                                    "--el-button-text-color": "#fff",
                                    "--el-button-border-color": "#ff2043",
                                    "--el-button-hover-bg-color":
                                      "rgb(255, 99, 123)",
                                    "--el-button-hover-text-color": "#fff",
                                    "--el-button-hover-border-color":
                                      "rgb(255, 99, 123)",
                                    "--el-button-active-bg-color":
                                      "rgb(208, 30, 58)",
                                    "--el-button-active-border-color":
                                      "rgb(208, 30, 58)",
                                  },
                                  attrs: {
                                    "aria-disabled": "false",
                                    type: "button",
                                  },
                                },
                                [a("span", {}, [t._v("再次填写 ")])]
                              ),
                            ]
                          ),
                        ]
                      ),
                    ]),
                  ],
                  1
                )
              : t._e(),
            t._t("deles"),
          ],
          2
        );
      },
      i = [],
      o =
        (a("159b"),
        a("b0c0"),
        a("a15b"),
        {
          name: "investigate",
          data: function () {
            return {
              containerForm: null,
              jsonData: [],
              showPicker: !1,
              columns: [],
              currIndex: 0,
              showSuccess: !1,
            };
          },
          props: { datas: Object },
          created: function () {},
          mounted: function () {
            this.containerPay = this.$refs.containerPay;
          },
          methods: {
            backFun: function () {
              for (var t = 0; t < this.datas.jsonData.length; t++)
                3 == this.datas.jsonData[t].type
                  ? (this.datas.jsonData[t].value2 = [])
                  : (this.datas.jsonData[t].value2 = "");
              this.showSuccess = !1;
            },
            show: function (t, e) {
              var a = this;
              t.value &&
                (t.value1.forEach(function (t) {
                  a.columns.push({ text: t, value: t });
                }),
                (this.showPicker = !0),
                (this.currIndex = e));
            },
            xuanze: function (t) {
              (this.showPicker = !1),
                (this.datas.jsonData[this.currIndex].value2 = t.value);
            },
            guanbi: function () {
              this.datas.jsonData.forEach(function (t) {
                t.showPicker = !1;
              });
            },
            leave: function () {
              this.datas.jsonData.forEach(function (t) {
                t.showPicker = !1;
              });
            },
            submit: function () {
              for (var t = this, e = 0; e < this.datas.jsonData.length; e++) {
                if (
                  "" == this.datas.jsonData[e].value2 &&
                  (1 == this.datas.jsonData[e].isNeed ||
                    3 == this.datas.jsonData[e].isNeed)
                )
                  return void this.$toast(
                    this.datas.jsonData[e].name + "不能为空"
                  );
                if (3 == this.datas.jsonData[e].isNeed) {
                  var a = /^1[3456789]\d{9}$/,
                    s = /^0\d{2,3}-?\d{7,8}$/;
                  if (
                    !a.test(this.datas.jsonData[e].value2) &&
                    !s.test(this.datas.jsonData[e].value2)
                  )
                    return void this.$toast(
                      this.datas.jsonData[e].name + "格式错误"
                    );
                }
              }
              (this.jsonData = []),
                this.datas.jsonData.forEach(function (e) {
                  var a = {};
                  (a.name = e.name),
                    (a.value = e.value2),
                    a.value instanceof Array && (a.value = a.value.join(",")),
                    t.jsonData.push(a);
                });
              var i = { jsonData: JSON.stringify(this.jsonData) };
              this.$emit("clickInvestigate", i), (this.showSuccess = !0);
            },
          },
          watch: {},
        }),
      n = o,
      r = (a("5ac1"), a("2877")),
      c = Object(r["a"])(n, s, i, !1, null, "3544b495", null);
    e["default"] = c.exports;
  },
  c1ea: function (t, e, a) {},
  c216: function (t, e, a) {
    "use strict";
    a.r(e);
    var s = function () {
        var t = this,
          e = t.$createElement,
          a = t._self._c || e;
        return a(
          "div",
          { staticClass: "payfanspay" },
          [
            a("van-nav-bar", {
              attrs: { "left-text": "放弃购买", "left-arrow": "" },
              on: { "click-left": t.onClickLeft },
            }),
            a(
              "div",
              {
                staticClass: "container",
                style: { "background-image": t.pay.image },
              },
              [
                a("div", { staticClass: "content" }, [
                  a("div", { staticClass: "question" }, [
                    a("div", { staticClass: "text-wrapper_11" }, [
                      a("span", { staticClass: "text_4" }, [
                        t._v(t._s(t.pay.question)),
                      ]),
                      a("span", { staticClass: "text_5" }, [
                        t._v(t._s(t.pay.remark)),
                      ]),
                    ]),
                  ]),
                  a(
                    "div",
                    { staticClass: "choose-wrapper_1" },
                    t._l(t.pay.answer.split("#"), function (e) {
                      return t.pay.answer
                        ? a(
                            "div",
                            {
                              key: e,
                              staticClass: "text-wrapper_2",
                              class: e == t.payInfo.answer ? "active" : "",
                              on: {
                                click: function (a) {
                                  return t.chooseAnswer(e);
                                },
                              },
                            },
                            [
                              a("span", { staticClass: "text_6" }, [
                                t._v(t._s(e)),
                              ]),
                            ]
                          )
                        : t._e();
                    }),
                    0
                  ),
                  a("div", { staticClass: "phone" }, [
                    a("div", { staticClass: "text-wrapper_11" }, [
                      a("span", { staticClass: "text_4" }, [
                        t._v("您的手机号"),
                      ]),
                      a("span", { staticClass: "text_13" }, [
                        t._v(t._s(t.pay.phoneRemark)),
                      ]),
                    ]),
                  ]),
                  a(
                    "div",
                    { staticClass: "phone-field" },
                    [
                      a("van-field", {
                        staticStyle: { "background-color": "#F3F5F4" },
                        attrs: { placeholder: "请输入手机号", type: "tel" },
                        model: {
                          value: t.payInfo.phone,
                          callback: function (e) {
                            t.$set(t.payInfo, "phone", e);
                          },
                          expression: "payInfo.phone",
                        },
                      }),
                    ],
                    1
                  ),
                  t.payInfo.phone && /^[1][3-9][0-9]{9}$/.test(t.payInfo.phone)
                    ? a(
                        "div",
                        { staticClass: "phone-field" },
                        [
                          a("van-field", {
                            staticStyle: { "background-color": "#F3F5F4" },
                            attrs: {
                              center: "",
                              clearable: "",
                              placeholder: "请输入短信验证码",
                            },
                            scopedSlots: t._u(
                              [
                                {
                                  key: "button",
                                  fn: function () {
                                    return [
                                      a(
                                        "van-button",
                                        {
                                          attrs: {
                                            size: "small",
                                            plain: "",
                                            color: "#DA7934",
                                            disabled: t.disabled,
                                          },
                                          on: { click: t.getYzm },
                                        },
                                        [
                                          t._v("获取验证码"),
                                          t.disabled
                                            ? a("span", [
                                                t._v(" (" + t._s(t.time) + ")"),
                                              ])
                                            : t._e(),
                                        ]
                                      ),
                                    ];
                                  },
                                  proxy: !0,
                                },
                              ],
                              null,
                              !1,
                              4214278991
                            ),
                            model: {
                              value: t.payInfo.code,
                              callback: function (e) {
                                t.$set(t.payInfo, "code", e);
                              },
                              expression: "payInfo.code",
                            },
                          }),
                        ],
                        1
                      )
                    : t._e(),
                ]),
              ]
            ),
            a("div", { staticClass: "confirm" }, [
              a(
                "div",
                { staticClass: "button" },
                [
                  a(
                    "van-button",
                    {
                      attrs: {
                        disabled: t.buttonDisabled,
                        block: "",
                        round: "",
                        color: "linear-gradient(to right, #EC7243, #EC7241)",
                      },
                      on: { click: t.submit },
                    },
                    [t._v(" 确认支付 ¥ " + t._s(t.pay.price) + " ")]
                  ),
                ],
                1
              ),
            ]),
            a(
              "van-dialog",
              {
                attrs: {
                  title: "获取支付结果",
                  "cancel-button-text": "放弃支付",
                  "confirm-button-text": "我已支付",
                  "show-cancel-button": !0,
                  "show-confirm-button": !0,
                },
                on: {
                  cancel: function (e) {
                    t.payDialogShow = !1;
                  },
                  confirm: t.checkOrder,
                },
                model: {
                  value: t.payDialogShow,
                  callback: function (e) {
                    t.payDialogShow = e;
                  },
                  expression: "payDialogShow",
                },
              },
              [
                a(
                  "van-loading",
                  { attrs: { size: "50px", color: "#1989fa", vertical: "" } },
                  [t._v("支付结果确认中...")]
                ),
              ],
              1
            ),
            a(
              "van-dialog",
              {
                attrs: { title: "添加微信" },
                model: {
                  value: t.qrCodeShow,
                  callback: function (e) {
                    t.qrCodeShow = e;
                  },
                  expression: "qrCodeShow",
                },
              },
              [t.qrCode ? a("img", { attrs: { src: t.qrCode } }) : t._e()]
            ),
          ],
          1
        );
      },
      i = [],
      o = (a("a4d3"), a("e01a"), a("2241")),
      n = {
        name: "payfanspay",
        props: { pay: Object },
        data: function () {
          return {
            payInfo: {
              question: "",
              answer: "",
              phone: null,
              code: "",
              description: "",
              amount: null,
            },
            disabled: !1,
            time: 60,
            buttonDisabled: !1,
            payDialogShow: !1,
            orderId: "",
            qrCode: null,
            qrCodeShow: !1,
          };
        },
        methods: {
          onClickLeft: function () {
            var t = this,
              e = this.pay.abandonTip;
            o["a"]
              .confirm({
                message: e,
                confirmButtonText: "继续购买",
                cancelButtonText: "确定放弃",
              })
              .then(function () {})
              .catch(function () {
                t.$emit("close");
              });
          },
          getYzm: function () {
            var t = this;
            if (
              this.payInfo.phone &&
              /^[1][3-9][0-9]{9}$/.test(this.payInfo.phone)
            ) {
              var e = { phone: this.payInfo.phone };
              (this.time = 60),
                (this.disabled = !0),
                this.$api.getMsgCode
                  .post(e)
                  .then(function (e) {
                    if (e.success) {
                      t.$toast("发送成功");
                      var a = setInterval(function () {
                        (t.time -= 1),
                          t.time < 1 &&
                            (clearInterval(a), (t.disabled = !1), (t.time = 0));
                      }, 1e3);
                    } else
                      t.$toast("发送验证码发生错误"),
                        (t.disabled = !1),
                        (t.time = 0);
                  })
                  .catch(function (e) {
                    t.$toast("发送验证码发生错误1"),
                      (t.disabled = !1),
                      (t.time = 0);
                  });
            } else this.$toast("请填写正确的手机号码");
          },
          chooseAnswer: function (t) {
            this.payInfo.answer = t;
          },
          submit: function () {
            var t = this;
            if (this.payInfo.phone)
              if (this.payInfo.code)
                if (this.payInfo.answer) {
                  (this.buttonDisabled = !0),
                    (this.payInfo.amount = this.pay.price),
                    (this.payInfo.question = this.pay.question),
                    (this.payInfo.description = this.pay.description);
                  var e = { data: JSON.stringify(this.payInfo) };
                  (this.payDialogShow = !0),
                    this.$api.savePay
                      .post(e)
                      .then(function (e) {
                        e.success
                          ? ((t.orderId = e.data.orderId),
                            (t.payDialogShow = !0),
                            (window.location.href = e.data.url))
                          : (t.$toast("保存失败"), (t.buttonDisabled = !1));
                      })
                      .catch(function (e) {
                        t.$toast("保存失败1"), (t.buttonDisabled = !1);
                      });
                } else this.$toast("请选择问题答案");
              else this.$toast("请填写验证码");
            else this.$toast("请填写手机号");
          },
          checkOrder: function () {
            var t = this;
            if (!this.orderId)
              return (
                this.$toast("请先提交订单"), void (this.buttonDisabled = !1)
              );
            var e = { orderId: this.orderId };
            this.$api.checkOrder
              .post(e)
              .then(function (e) {
                if (e.success)
                  if ("2" == e.data || 2 == e.data)
                    if (1 == t.pay.success) {
                      t.$toast("支付成功，立即添加老师微信"),
                        (t.payDialogShow = !1);
                      var a = t.pay.qrcodeList;
                      (t.qrCode =
                        a[Math.floor(Math.random() * arr.length + 1) - 1]),
                        (t.qrCodeShow = !0);
                    } else
                      2 == t.pay.success &&
                        (t.$toast("支付成功"),
                        (window.location.href = t.pay.successUrl));
                  else
                    ("3" != e.data && 3 != e.data) ||
                      (t.$toast("未支付，请重新支付"), (t.payDialogShow = !1));
                else t.$toast("获取订单状态失败");
              })
              .catch(function (e) {
                t.$toast("获取订单状态失败");
              });
          },
        },
      },
      r = n,
      c = (a("c926"), a("2877")),
      d = Object(c["a"])(r, s, i, !1, null, "1e3e74b4", null);
    e["default"] = d.exports;
  },
  c926: function (t, e, a) {
    "use strict";
    a("d3e6");
  },
  c9fd: function (t, e, a) {
    "use strict";
    a.r(e);
    var s = function () {
        var t = this,
          e = t.$createElement,
          a = t._self._c || e;
        return a(
          "div",
          { staticClass: "h5chat main" },
          [
            t.datas.imageList && t.datas.showImg
              ? a("div", { staticClass: "dataClass" }, [
                  a(
                    "div",
                    { staticClass: "type0" },
                    [
                      a(
                        "van-swipe",
                        {
                          staticClass: "notice-swipe body1 imgLis",
                          attrs: { autoplay: 3e3, touchable: !1 },
                        },
                        t._l(t.datas.imageList, function (t, e) {
                          return a(
                            "van-swipe-item",
                            { key: e, staticClass: "demoText" },
                            [
                              a("img", {
                                attrs: { src: t.src, draggable: "false" },
                              }),
                            ]
                          );
                        }),
                        1
                      ),
                    ],
                    1
                  ),
                ])
              : t._e(),
            a(
              "div",
              { ref: "chatContentContainer", staticClass: "content" },
              [
                a(
                  "ul",
                  {
                    ref: "QAContent",
                    staticClass: "scroll",
                    staticStyle: { "max-height": "calc(100vh - 180px)" },
                  },
                  t._l(t.chatDataTemp, function (e, s) {
                    return a("div", { key: s }, [
                      a(
                        "li",
                        {
                          class: "text-" + e.class,
                          style: { "--url": "url(" + e.src + ")" },
                        },
                        [
                          a(
                            "span",
                            [
                              a("div", {
                                domProps: {
                                  innerHTML: t._s(t.unescape(e.chatContent)),
                                },
                              }),
                              e.chatImags
                                ? [
                                    a("img", {
                                      attrs: {
                                        src: e.chatImags,
                                        width: "100%",
                                      },
                                    }),
                                  ]
                                : t._e(),
                            ],
                            2
                          ),
                        ]
                      ),
                    ]);
                  }),
                  0
                ),
                a(
                  "van-sticky",
                  {
                    staticStyle: { "text-align": "center" },
                    attrs: {
                      container: t.chatContentContainer,
                      "offset-top": 50,
                    },
                  },
                  [
                    t.datas.chatLabel && t.datas.chatLabel.length > 0
                      ? a(
                          "div",
                          t._l(t.datas.chatLabel, function (e, s) {
                            return a(
                              "van-button",
                              {
                                key: s,
                                staticClass: "button1",
                                attrs: { type: "primary" },
                                on: {
                                  click: function (a) {
                                    return t.addContent(e);
                                  },
                                },
                              },
                              [t._v(" " + t._s(e.name) + " ")]
                            );
                          }),
                          1
                        )
                      : t._e(),
                  ]
                ),
                a(
                  "van-sticky",
                  {
                    staticStyle: { "text-align": "center" },
                    attrs: {
                      container: t.chatContentContainer,
                      "offset-top": 50,
                    },
                  },
                  [
                    t.datas.currentIndex != t.datas.chats.length ||
                    t.datas.showImg
                      ? t._e()
                      : a(
                          "div",
                          [
                            a(
                              "van-button",
                              {
                                staticClass: "button",
                                attrs: { type: "primary" },
                                on: { click: t.btnClick },
                              },
                              [t._v(" " + t._s(t.datas.btnText) + " ")]
                            ),
                          ],
                          1
                        ),
                  ]
                ),
              ],
              1
            ),
            t._t("deles"),
          ],
          2
        );
      },
      i = [],
      o =
        (a("159b"),
        a("ac1f"),
        a("5319"),
        a("b0c0"),
        a("25eb"),
        a("a9e3"),
        {
          name: "h5chat",
          props: { datas: Object },
          data: function () {
            return {
              chatContentContainer: null,
              chatDataTemp: [],
              chatLabels: "",
            };
          },
          mounted: function () {
            var t = this;
            this.datas.chatsTmp.forEach(function (e) {
              t.chatDataTemp.push({
                chatContent: t.unescape(e.chatContent),
                chatImags: e.chatImags,
                class: "left",
                src: t.datas.avatarList[0].src,
              });
              var a = e.chatContentArr
                ? JSON.parse(t.unescape(JSON.stringify(e.chatContentArr)))
                : [];
              if (a && a.length > 0)
                for (var s = 0; s < a.length; s++)
                  t.chatDataTemp.push({
                    chatContent: t.unescape(a[s].chatContent),
                    chatImags: a[s].chatImags,
                    class: "left",
                    src: t.datas.avatarList[0].src,
                  });
            }),
              this.scrollBottom(this);
          },
          methods: {
            unescape: function (t) {
              return t
                .replace(t ? /&(?!#?\w+;)/g : /&/g, "&amp;")
                .replace(/&lt;/g, "<")
                .replace(/&gt;/g, ">")
                .replace(/&quot;/g, '"');
            },
            btnClick: function () {
              var t = { chatLabels: this.chatLabels };
              this.$emit("clickH5Chat", t);
            },
            addContent: function (t) {
              if (((this.chatLabels += t.name + ","), t.jumpType)) {
                if (
                  (("4" == t.jumpType || (4 == t.jumpType && t.chatId)) &&
                    (this.datas.currentIndex = Number.parseInt(t.chatId) - 1),
                  "3" == t.jumpType || 3 == t.jumpType)
                )
                  return void this.btnClick();
                if (
                  ("1" == t.jumpType || 1 == t.jumpType) &&
                  t.jumpUrl &&
                  "" != t.jumpUrl
                )
                  return -1 !== t.jumpUrl.indexOf("work.weixin")
                    ? void this.$toast("不支持的获客链接")
                    : void (window.location.href = t.jumpUrl);
              }
              var e = this;
              (this.datas.showImg = !1),
                (this.datas.chatLabel = []),
                this.chatDataTemp.push({
                  chatContent: t.name,
                  class: "right",
                  src: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/2wBDAAcFBQYFBAcGBgYIBwcICxILCwoKCxYPEA0SGhYbGhkWGRgcICgiHB4mHhgZIzAkJiorLS4tGyIyNTEsNSgsLSz/wAALCACEAIQBAREA/8QAGwABAAIDAQEAAAAAAAAAAAAAAAMFAgQGAQj/xAAuEAEAAgECAggGAgMAAAAAAAAAAQIDBBEFIRIVMUFRZKLhEyJhcYHBFFIjkdH/2gAIAQEAAD8A+gSIAACIAAAAAIgAAACIAAAAAAAAAAAAQ6vVU0mH4l+c90eMqDPrtRqLb2vaI8I5QhrkvjtvS9on6WWnD+KWm8YtRbfflF/+rcAAABz/ABbPOXXTXux/JH7aIOl4dnnPoqWtzmOU/lsgAAA5jWxMa7NE/wB5QAvuDRMaKZ8bz+lgAAACk4zpZrmjUV7L8p+6sGVa2yXila7zPKHTaXDGn01MX9Y5/dMAAADHLirmxTjvXekuXzY/g5r4+3ozMf6Rrjgunr0Z1E8532p9FsAAAA09ZxLFp6zWtunk8I7vu5+1pyXm9uczO8sW/wAO4h/EmaXrvjnn9pXmLLjzU6eO1bx9WYAACHUavFpadLJbn3R3ypdXxTNqN60/x08I7Z/DRASYc+TBfp4rWpK40nGKZdq5/knx7vdY9vOHoAA5TLlvmyTkvbeYYAALrguW9seTHa29a7bfndaAACptwKs3ma59o8Ojv+3nUXmPR7nUXmPR7nUXmPR7nUXmPR7nUXmPR7nUXmPR7nUXmPR7t3Q6KuipeIv05t2z2djaAAAAAAAAAAAAAAAAAAAAAAAB/9k=",
                }),
                e.scrollBottom(e),
                !t.chatStatus || ("1" != t.chatStatus && 1 != t.chatStatus)
                  ? setTimeout(function () {
                      e.diguiAddCoent(e.datas.currentIndex);
                    }, 500)
                  : t.endMsg &&
                    "" != t.endMsg &&
                    this.chatDataTemp.push({
                      chatContent: this.unescape(t.endMsg),
                      class: "left",
                      src: this.datas.avatarList[0].src,
                    });
            },
            diguiAddCoent: function (t) {
              var e = this,
                a = this;
              try {
                (this.datas.avatarList && 0 != this.datas.avatarList.length) ||
                  ((this.datas.avatarList = []),
                  this.datas.avatarList.push({
                    src: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/2wBDAAcFBQYFBAcGBgYIBwcICxILCwoKCxYPEA0SGhYbGhkWGRgcICgiHB4mHhgZIzAkJiorLS4tGyIyNTEsNSgsLSz/wAALCACEAIQBAREA/8QAGwABAAIDAQEAAAAAAAAAAAAAAAMFAgQGAQj/xAAuEAEAAgECAggGAgMAAAAAAAAAAQIDBBEFIRIVMUFRZKLhEyJhcYHBFFIjkdH/2gAIAQEAAD8A+gSIAACIAAAAAIgAAACIAAAAAAAAAAAAQ6vVU0mH4l+c90eMqDPrtRqLb2vaI8I5QhrkvjtvS9on6WWnD+KWm8YtRbfflF/+rcAAABz/ABbPOXXTXux/JH7aIOl4dnnPoqWtzmOU/lsgAAA5jWxMa7NE/wB5QAvuDRMaKZ8bz+lgAAACk4zpZrmjUV7L8p+6sGVa2yXila7zPKHTaXDGn01MX9Y5/dMAAADHLirmxTjvXekuXzY/g5r4+3ozMf6Rrjgunr0Z1E8532p9FsAAAA09ZxLFp6zWtunk8I7vu5+1pyXm9uczO8sW/wAO4h/EmaXrvjnn9pXmLLjzU6eO1bx9WYAACHUavFpadLJbn3R3ypdXxTNqN60/x08I7Z/DRASYc+TBfp4rWpK40nGKZdq5/knx7vdY9vOHoAA5TLlvmyTkvbeYYAALrguW9seTHa29a7bfndaAACptwKs3ma59o8Ojv+3nUXmPR7nUXmPR7nUXmPR7nUXmPR7nUXmPR7nUXmPR7nUXmPR7t3Q6KuipeIv05t2z2djaAAAAAAAAAAAAAAAAAAAAAAAB/9k=",
                  })),
                  (this.datas.currentIndex = t + 1),
                  this.datas.currentIndex < this.datas.chats.length &&
                    ((this.datas.chats[this.datas.currentIndex].chatContent ||
                      this.datas.chats[this.datas.currentIndex].chatImags) &&
                      (function () {
                        var t = e.datas.chats[e.datas.currentIndex]
                          .chatContentArr
                          ? JSON.parse(
                              e.unescape(
                                JSON.stringify(
                                  e.datas.chats[e.datas.currentIndex]
                                    .chatContentArr
                                )
                              )
                            )
                          : [];
                        if (t && t.length > 0) {
                          e.chatDataTemp.push({
                            chatContent: e.unescape(
                              e.datas.chats[e.datas.currentIndex].chatContent
                            ),
                            chatImags:
                              e.datas.chats[e.datas.currentIndex].chatImags,
                            class: "left",
                            src: e.datas.avatarList[0].src,
                          });
                          for (
                            var s = function (e) {
                                setTimeout(function () {
                                  a.chatDataTemp.push({
                                    chatContent: a.unescape(t[e].chatContent),
                                    chatImags: t[e].chatImags,
                                    class: "left",
                                    src: a.datas.avatarList[0].src,
                                  }),
                                    a.scrollBottom(a);
                                }, 500 * (e + 1));
                              },
                              i = 0;
                            i < t.length;
                            i++
                          )
                            s(i);
                        } else
                          e.chatDataTemp.push({
                            chatContent: e.unescape(
                              e.datas.chats[e.datas.currentIndex].chatContent
                            ),
                            chatImags:
                              e.datas.chats[e.datas.currentIndex].chatImags,
                            class: "left",
                            src: e.datas.avatarList[0].src,
                          });
                      })(),
                    this.datas.chats[this.datas.currentIndex].chatLabel &&
                    this.datas.chats[this.datas.currentIndex].chatLabel.length >
                      0
                      ? (this.datas.chatLabel = JSON.parse(
                          this.unescape(
                            JSON.stringify(
                              this.datas.chats[this.datas.currentIndex]
                                .chatLabel
                            )
                          )
                        ))
                      : setTimeout(function () {
                          a.diguiAddCoent(a.datas.currentIndex);
                        }, 500)),
                  a.scrollBottom(a);
              } catch (s) {}
            },
            scrollBottom: function (t) {
              t.$nextTick(function () {
                var e = t.$refs.QAContent;
                e.scrollTo({ top: e.scrollHeight, behavior: "smooth" });
              });
            },
            getImgs: function () {
              (this.datas.imageList = [
                {
                  src: "https://test.codeachange.com/upload/1/img/20230509/20230509113002070467.png",
                },
              ]),
                (this.datas.avatarList = [
                  {
                    src: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F5b342386-43ce-4ab5-bf30-c1bb7e2d85d8%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1690436813&t=6b2483da111e7711b181619b62687e4c",
                  },
                ]);
            },
          },
        }),
      n = o,
      r = (a("2619"), a("2877")),
      c = Object(r["a"])(n, s, i, !1, null, "3b0952f3", null);
    e["default"] = c.exports;
  },
  cb08: function (t, e, a) {
    "use strict";
    a.r(e);
    var s = function () {
        var t = this,
          e = t.$createElement;
        t._self._c;
        return t._m(0);
      },
      i = [
        function () {
          var t = this,
            e = t.$createElement,
            a = t._self._c || e;
          return a("div", { staticClass: "placementarea" }, [
            a("span", [t._v("组件放置区域")]),
          ]);
        },
      ],
      o = { name: "placementarea" },
      n = o,
      r = (a("5e88"), a("2877")),
      c = Object(r["a"])(n, s, i, !1, null, "a34a52c2", null);
    e["default"] = c.exports;
  },
  d061: function (t, e, a) {
    "use strict";
    a.r(e);
    var s = function () {
        var t = this,
          e = t.$createElement,
          a = t._self._c || e;
        return a(
          "div",
          { staticClass: "notice" },
          [
            a("van-notice-bar", {
              attrs: {
                text: t.datas.noticeText,
                "left-icon": "volume-o",
                background: t.datas.backColor,
                color: t.datas.textColor,
              },
            }),
            t._t("deles"),
          ],
          2
        );
      },
      i = [],
      o = { name: "notice", props: { datas: Object } },
      n = o,
      r = (a("e647"), a("2877")),
      c = Object(r["a"])(n, s, i, !1, null, "0719fe2e", null);
    e["default"] = c.exports;
  },
  d3e6: function (t, e, a) {},
  da1f: function (t, e, a) {},
  dc74: function (t, e, a) {
    "use strict";
    a("73fb");
  },
  e1cc: function (t, e, a) {},
  e46d: function (t, e, a) {
    "use strict";
    a.r(e);
    var s = function () {
        var t = this,
          e = t.$createElement,
          a = t._self._c || e;
        return a("div", { staticClass: "videoss" }, [
          t.datas.src
            ? a(
                "section",
                { staticStyle: { position: "relative" } },
                [
                  a(
                    "van-swipe",
                    {
                      staticClass: "my-swipe",
                      style: t.swiperSlideStyle,
                      attrs: { "indicator-color": "white" },
                    },
                    [
                      a("van-swipe-item", [
                        a("video", {
                          style: t.swiperSlideStyle,
                          attrs: {
                            src: t.datas.src,
                            controls: "",
                            autoplay: t.datas.autoplay,
                            poster: t.datas.coverUrl,
                          },
                        }),
                      ]),
                      t._l(t.datas.imageList, function (e) {
                        return a("van-swipe-item", { key: e.src }, [
                          a("img", {
                            directives: [
                              {
                                name: "lazy",
                                rawName: "v-lazy",
                                value: e.src,
                                expression: "image.src",
                              },
                            ],
                            on: {
                              click: function (a) {
                                return t.picClick(e);
                              },
                            },
                          }),
                        ]);
                      }),
                    ],
                    2
                  ),
                ],
                1
              )
            : a(
                "section",
                { staticClass: "default" },
                [a("van-icon", { attrs: { name: "tv-o", size: "150px" } })],
                1
              ),
        ]);
      },
      i = [],
      o = a("2241"),
      n = {
        name: "videoss",
        props: { datas: Object },
        data: function () {
          return { mySwiper: null, swiperSlideStyle: {}, videoHeight: "400px" };
        },
        created: function () {
          var t = this;
          this.$nextTick(function () {
            var e = document.querySelector("#imageTofile").offsetWidth;
            if (
              ((e =
                2 == t.datas.scale
                  ? (3 * e) / 4
                  : 3 == t.datas.scale
                  ? (9 * e) / 16
                  : 4 == t.datas.scale
                  ? (16 * e) / 9
                  : 5 == t.datas.scale
                  ? (9 * e) / 18
                  : (4 * e) / 3),
              (t.swiperSlideStyle = { width: "100%", height: e + "px" }),
              (t.videoHeight = e + "px"),
              t.datas.src && t.datas.autoplay)
            ) {
              var a = document.querySelector("video").play();
              void 0 !== a &&
                a
                  .then(function (t) {})
                  .catch(function (e) {
                    t.datas.dialogText &&
                      o["a"]
                        .confirm({
                          message: t.datas.dialogText,
                          theme: "round-button",
                          showCancelButton: !1,
                          confirmButtonText: "点击观看",
                        })
                        .then(function () {
                          document.querySelector("video").play();
                        });
                  });
            }
          });
        },
        methods: {
          picClick: function (t) {
            t && this.$emit("clickPicture", t);
          },
        },
      },
      r = n,
      c = (a("2ce5"), a("2877")),
      d = Object(c["a"])(r, s, i, !1, null, "7dc80fbc", null);
    e["default"] = d.exports;
  },
  e644: function (t, e, a) {
    "use strict";
    a.r(e);
    var s = function () {
        var t = this,
          e = t.$createElement,
          a = t._self._c || e;
        return a(
          "div",
          { staticClass: "kscantuan" },
          [
            a("div", { staticClass: "van-coupon" }, [
              a("div", { staticClass: "van-nav-bar van-hairline--bottom " }, [
                a("div", { staticClass: "van-nav-bar__content" }, [
                  a(
                    "div",
                    {
                      staticClass: "van-nav-bar__title van-ellipsis titleClass",
                    },
                    [t._v(t._s(t.datas.demo))]
                  ),
                ]),
              ]),
              t.datas.dataList
                ? a(
                    "div",
                    { staticClass: "dataClass" },
                    [
                      t.datas.dataList
                        ? a(
                            "van-swipe",
                            {
                              staticStyle: { height: "225px" },
                              attrs: {
                                vertical: "",
                                autoplay: 5e3,
                                touchable: !1,
                                "show-indicators": !1,
                              },
                            },
                            [
                              a(
                                "van-swipe-item",
                                t._l(t.datas.dataList, function (e, s) {
                                  return a(
                                    "div",
                                    {
                                      directives: [
                                        {
                                          name: "show",
                                          rawName: "v-show",
                                          value: s < 5,
                                          expression: "key<5",
                                        },
                                      ],
                                      key: s,
                                      staticClass:
                                        "van-cell van-cell--center van-cell--clickable van-cell--borderless van-contact-card--add",
                                      attrs: { role: "button", tabindex: "0" },
                                    },
                                    [
                                      a("van-image", {
                                        attrs: {
                                          round: "",
                                          width: "20px",
                                          height: "20px",
                                          src: e.avatar,
                                        },
                                      }),
                                      a(
                                        "div",
                                        {
                                          staticClass:
                                            "van-cell__title van-contact-card__title",
                                          staticStyle: {
                                            "margin-left": "10px",
                                            display: "flex",
                                          },
                                        },
                                        [
                                          t._v(" 还差 "),
                                          a(
                                            "label",
                                            {
                                              staticStyle: {
                                                color: "#e2794e !important",
                                              },
                                            },
                                            [t._v(t._s(e.people))]
                                          ),
                                          t._v(" 人成团 | 距结束 "),
                                          a("van-count-down", {
                                            staticStyle: {
                                              "line-height": "24px",
                                            },
                                            attrs: {
                                              "use-slot": "",
                                              time: e.time,
                                              format: "mm 分 ss 秒",
                                            },
                                          }),
                                        ],
                                        1
                                      ),
                                      a(
                                        "van-button",
                                        {
                                          attrs: {
                                            round: "",
                                            color: "#fdb34c",
                                            size: "mini",
                                          },
                                          on: { click: t.openSku },
                                        },
                                        [t._v("去参团")]
                                      ),
                                    ],
                                    1
                                  );
                                }),
                                0
                              ),
                              a(
                                "van-swipe-item",
                                t._l(t.datas.dataList, function (e, s) {
                                  return a(
                                    "div",
                                    {
                                      directives: [
                                        {
                                          name: "show",
                                          rawName: "v-show",
                                          value: s > 4 && s < 10,
                                          expression: "key>4&&key<10",
                                        },
                                      ],
                                      key: s,
                                      staticClass:
                                        "van-cell van-cell--center van-cell--clickable van-cell--borderless van-contact-card--add",
                                      attrs: { role: "button", tabindex: "0" },
                                    },
                                    [
                                      a("van-image", {
                                        attrs: {
                                          round: "",
                                          width: "20px",
                                          height: "20px",
                                          src: e.avatar,
                                        },
                                      }),
                                      a(
                                        "div",
                                        {
                                          staticClass:
                                            "van-cell__title van-contact-card__title",
                                          staticStyle: {
                                            "margin-left": "10px",
                                            display: "flex",
                                          },
                                        },
                                        [
                                          t._v(" 还差 "),
                                          a(
                                            "label",
                                            {
                                              staticStyle: {
                                                color: "#e2794e !important",
                                              },
                                            },
                                            [t._v(t._s(e.people))]
                                          ),
                                          t._v(" 人成团 | 距结束 "),
                                          a("van-count-down", {
                                            staticStyle: {
                                              "line-height": "24px",
                                            },
                                            attrs: {
                                              "use-slot": "",
                                              time: e.time,
                                              format: "mm 分 ss 秒",
                                            },
                                          }),
                                        ],
                                        1
                                      ),
                                      a(
                                        "van-button",
                                        {
                                          attrs: {
                                            round: "",
                                            color: "#fdb34c",
                                            size: "mini",
                                          },
                                          on: { click: t.openSku },
                                        },
                                        [t._v("去参团")]
                                      ),
                                    ],
                                    1
                                  );
                                }),
                                0
                              ),
                              a(
                                "van-swipe-item",
                                t._l(t.datas.dataList, function (e, s) {
                                  return a(
                                    "div",
                                    {
                                      directives: [
                                        {
                                          name: "show",
                                          rawName: "v-show",
                                          value: s > 9 && s < 15,
                                          expression: "key>9&&key<15",
                                        },
                                      ],
                                      key: s,
                                      staticClass:
                                        "van-cell van-cell--center van-cell--clickable van-cell--borderless van-contact-card--add",
                                      attrs: { role: "button", tabindex: "0" },
                                    },
                                    [
                                      a("van-image", {
                                        attrs: {
                                          round: "",
                                          width: "20px",
                                          height: "20px",
                                          src: e.avatar,
                                        },
                                      }),
                                      a(
                                        "div",
                                        {
                                          staticClass:
                                            "van-cell__title van-contact-card__title",
                                          staticStyle: {
                                            "margin-left": "10px",
                                            display: "flex",
                                          },
                                        },
                                        [
                                          t._v(" 还差 "),
                                          a(
                                            "label",
                                            {
                                              staticStyle: {
                                                color: "#e2794e !important",
                                              },
                                            },
                                            [t._v(t._s(e.people))]
                                          ),
                                          t._v(" 人成团 | 距结束 "),
                                          a("van-count-down", {
                                            staticStyle: {
                                              "line-height": "24px",
                                            },
                                            attrs: {
                                              "use-slot": "",
                                              time: e.time,
                                              format: "mm 分 ss 秒",
                                            },
                                          }),
                                        ],
                                        1
                                      ),
                                      a(
                                        "van-button",
                                        {
                                          attrs: {
                                            round: "",
                                            color: "#fdb34c",
                                            size: "mini",
                                          },
                                          on: { click: t.openSku },
                                        },
                                        [t._v("去参团")]
                                      ),
                                    ],
                                    1
                                  );
                                }),
                                0
                              ),
                              a(
                                "van-swipe-item",
                                t._l(t.datas.dataList, function (e, s) {
                                  return a(
                                    "div",
                                    {
                                      directives: [
                                        {
                                          name: "show",
                                          rawName: "v-show",
                                          value: s > 14 && s < 20,
                                          expression: "key>14&&key<20",
                                        },
                                      ],
                                      key: s,
                                      staticClass:
                                        "van-cell van-cell--center van-cell--clickable van-cell--borderless van-contact-card--add",
                                      attrs: { role: "button", tabindex: "0" },
                                    },
                                    [
                                      a("van-image", {
                                        attrs: {
                                          round: "",
                                          width: "20px",
                                          height: "20px",
                                          src: e.avatar,
                                        },
                                      }),
                                      a(
                                        "div",
                                        {
                                          staticClass:
                                            "van-cell__title van-contact-card__title",
                                          staticStyle: {
                                            "margin-left": "10px",
                                            display: "flex",
                                          },
                                        },
                                        [
                                          t._v(" 还差 "),
                                          a(
                                            "label",
                                            {
                                              staticStyle: {
                                                color: "#e2794e !important",
                                              },
                                            },
                                            [t._v(t._s(e.people))]
                                          ),
                                          t._v(" 人成团 | 距结束 "),
                                          a("van-count-down", {
                                            staticStyle: {
                                              "line-height": "24px",
                                            },
                                            attrs: {
                                              "use-slot": "",
                                              time: e.time,
                                              format: "mm 分 ss 秒",
                                            },
                                          }),
                                        ],
                                        1
                                      ),
                                      a(
                                        "van-button",
                                        {
                                          attrs: {
                                            round: "",
                                            color: "#fdb34c",
                                            size: "mini",
                                          },
                                          on: { click: t.openSku },
                                        },
                                        [t._v("去参团")]
                                      ),
                                    ],
                                    1
                                  );
                                }),
                                0
                              ),
                            ],
                            1
                          )
                        : t._e(),
                    ],
                    1
                  )
                : t._e(),
            ]),
            t._t("deles"),
          ],
          2
        );
      },
      i = [],
      o =
        (a("4d90"),
        {
          name: "kscantuan",
          props: { datas: Object },
          created: function () {
            this.addData();
          },
          methods: {
            openSku: function () {
              this.datas.jumpType && 2 == this.datas.jumpType
                ? document.querySelector("#payOndeliveryButton").click()
                : document.querySelector("#tabBarOpenOutButton").click();
            },
            addData: function () {
              for (var t = 0; t < 20; t++)
                this.datas.dataList.push({
                  avatar: this.getRandomAvatar(
                    (Math.floor(10 * Math.random()) + 1) % 2 == 0 ? 1 : 2
                  ),
                  people: this.rndNumber(1, 5),
                  time: this.rndNumber(10, 60) * this.rndNumber(10, 60) * 1e3,
                });
            },
            getRandomAvatar: function (t) {
              var e = "";
              return (
                (e =
                  1 == t || 2 == t
                    ? Math.floor(300 * Math.random()) + 1 + ""
                    : Math.floor(200 * Math.random()) + 1 + ""),
                (e = e.padStart(3, "0")),
                "https://oss1.modsty.com/avatar/2022" + t + e + "12.jpg"
              );
            },
            rndNumber: function (t, e) {
              var a = t + Math.floor(Math.random() * (e - t + 1));
              return a < t ? t : a > e ? e : a;
            },
          },
        }),
      n = o,
      r = (a("ef45"), a("2877")),
      c = Object(r["a"])(n, s, i, !1, null, "8d259832", null);
    e["default"] = c.exports;
  },
  e647: function (t, e, a) {
    "use strict";
    a("da1f");
  },
  e955: function (t, e, a) {
    "use strict";
    a.r(e);
    var s = function () {
        var t = this,
          e = t.$createElement,
          a = t._self._c || e;
        return a("div", [
          a(
            "div",
            {
              staticClass: "headerTop",
              staticStyle: { position: "fixed" },
              style: { height: t.name.titleHeight + "px" },
            },
            [
              t.name.isBack
                ? a(
                    "div",
                    { staticClass: "lef", on: { click: t.pushHome } },
                    [a("van-icon", { attrs: { name: "arrow-left" } })],
                    1
                  )
                : t._e(),
              a(
                "div",
                {
                  staticClass: "header-title",
                  style: {
                    height: t.name.titleHeight + "px",
                    "line-height": t.name.titleHeight + "px",
                  },
                },
                [t._v(" " + t._s(t.name.name ? t.name.name : "") + " ")]
              ),
              t.name.isPerson
                ? a(
                    "div",
                    {
                      staticClass: "rig",
                      on: {
                        click: function (e) {
                          return t.$router.push({
                            name: t.name.urlname ? t.name.urlname : "personal",
                          });
                        },
                      },
                    },
                    [
                      a("span", {
                        domProps: {
                          innerHTML: t._s(
                            t.name.subhead ? t.name.subhead : "个人中心"
                          ),
                        },
                      }),
                    ]
                  )
                : t._e(),
            ]
          ),
          a("div", { style: { height: t.name.titleHeight + "px" } }),
        ]);
      },
      i = [],
      o = {
        name: "headerTop",
        props: { name: Object },
        data: function () {
          return { fanhui: !0 };
        },
        created: function () {},
        methods: {
          push: function () {
            this.$router.push({ name: "personal" });
          },
          pushHome: function () {
            if (this.$route.query.isonmini) {
              var t = window.localStorage.getItem("shopTemplateId");
              this.$router.push({ path: "/shop", query: { orgId: t } });
            } else if (window.history.length > 1) this.$router.go(-1);
            else if (window.location.hash.indexOf("#/shop") <= -1) {
              var e = window.localStorage.getItem("shopTemplateId");
              this.$router.push({ path: "/shop", query: { orgId: e } });
            }
          },
        },
      },
      n = o,
      r = (a("8471"), a("2877")),
      c = Object(r["a"])(n, s, i, !1, null, "9e6054d2", null);
    e["default"] = c.exports;
  },
  eea5: function (t, e, a) {},
  ef08: function (t, e, a) {
    "use strict";
    a("5490");
  },
  ef45: function (t, e, a) {
    "use strict";
    a("10f8");
  },
  f2f8: function (t, e, a) {},
  f61c: function (t, e, a) {
    "use strict";
    a("37c4");
  },
  fbb0: function (t, e, a) {
    "use strict";
    a.r(e);
    var s = function () {
        var t = this,
          e = t.$createElement,
          a = t._self._c || e;
        return a(
          "div",
          {
            staticClass: "magiccube",
            style: {
              "padding-left": t.datas.pageMargin + "px",
              "padding-right": t.datas.pageMargin + "px",
            },
          },
          [
            a("img", {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: !t.showimageList,
                  expression: "!showimageList",
                },
              ],
              staticStyle: { width: "100%" },
              attrs: {
                draggable: "false",
                src: t.$const.IMAGE_DOMAIN + "/sys/h5/image/mor.png",
                alt: "",
              },
            }),
            a(
              "section",
              {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: 0 === t.datas.rubiksCubeType && t.showimageList,
                    expression: "datas.rubiksCubeType === 0 && showimageList",
                  },
                ],
                staticClass: "buju buju0",
              },
              t._l(2, function (e) {
                return a(
                  "div",
                  { key: e, staticClass: "rubiksCubeType0 rubiksCubeType" },
                  [
                    a("img", {
                      style: { padding: t.datas.imgMargin / 2 + "px" },
                      attrs: {
                        draggable: "false",
                        src: t.datas.imageList[e - 1].src,
                        alt: "",
                      },
                    }),
                  ]
                );
              }),
              0
            ),
            a(
              "section",
              {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: 1 === t.datas.rubiksCubeType && t.showimageList,
                    expression: "datas.rubiksCubeType === 1 && showimageList",
                  },
                ],
                staticClass: "buju buju0",
              },
              t._l(3, function (e) {
                return a(
                  "div",
                  {
                    key: e,
                    staticClass: "rubiksCubeType1 rubiksCubeType",
                    style: {
                      margin: t.datas.imgMargin / 10 + "%",
                      width: "33.33%",
                    },
                  },
                  [
                    a("img", {
                      attrs: {
                        draggable: "false",
                        src: t.datas.imageList[e - 1].src,
                        alt: "",
                      },
                    }),
                  ]
                );
              }),
              0
            ),
            a(
              "section",
              {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: 2 === t.datas.rubiksCubeType && t.showimageList,
                    expression: "datas.rubiksCubeType === 2 && showimageList",
                  },
                ],
                staticClass: "buju buju0",
              },
              t._l(4, function (e) {
                return a(
                  "div",
                  {
                    key: e,
                    staticClass: "rubiksCubeType2 rubiksCubeType",
                    style: {
                      margin: t.datas.imgMargin / 10 + "%",
                      width: 25 - t.datas.imgMargin / 10 + "%",
                    },
                  },
                  [
                    a("img", {
                      attrs: {
                        draggable: "false",
                        src: t.datas.imageList[e - 1].src,
                        alt: "",
                      },
                    }),
                  ]
                );
              }),
              0
            ),
            a(
              "section",
              {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: 3 === t.datas.rubiksCubeType && t.showimageList,
                    expression: "datas.rubiksCubeType === 3 && showimageList",
                  },
                ],
                staticClass: "buju buju0",
              },
              t._l(4, function (e) {
                return a(
                  "div",
                  { key: e, staticClass: "rubiksCubeType3 rubiksCubeType" },
                  [
                    a("img", {
                      style: { padding: t.datas.imgMargin + "px" },
                      attrs: {
                        draggable: "false",
                        src: t.datas.imageList[e - 1].src,
                        alt: "",
                      },
                    }),
                  ]
                );
              }),
              0
            ),
            a(
              "section",
              {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: 4 === t.datas.rubiksCubeType && t.showimageList,
                    expression: "datas.rubiksCubeType === 4 && showimageList",
                  },
                ],
                staticClass: "buju buju4",
              },
              [
                a(
                  "div",
                  {
                    staticClass: "rubiksCubeType hw",
                    staticStyle: { "padding-top": "100%" },
                  },
                  [
                    a("img", {
                      staticStyle: { height: "300px" },
                      style: { "padding-right": t.datas.imgMargin + "px" },
                      attrs: {
                        draggable: "false",
                        src: t.datas.imageList[0].src,
                        alt: "",
                      },
                    }),
                  ]
                ),
                a(
                  "div",
                  {
                    staticStyle: {
                      display: "inline-flex",
                      "flex-direction": "column",
                      width: "100%",
                    },
                  },
                  t._l(2, function (e) {
                    return a(
                      "div",
                      {
                        key: e,
                        staticClass: " hw imgone",
                        staticStyle: {
                          "padding-top": "150px",
                          height: "150px",
                        },
                      },
                      [
                        a("img", {
                          staticStyle: { height: "150px" },
                          style: { padding: t.datas.imgMargin + "px" },
                          attrs: {
                            draggable: "false",
                            src: t.datas.imageList[e].src,
                            alt: "",
                          },
                        }),
                      ]
                    );
                  }),
                  0
                ),
              ]
            ),
            a(
              "section",
              {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: 5 === t.datas.rubiksCubeType && t.showimageList,
                    expression: "datas.rubiksCubeType === 5 && showimageList",
                  },
                ],
                staticClass: "buju buju5",
              },
              [
                a(
                  "div",
                  {
                    staticClass: "rubiksCubeType hw",
                    staticStyle: { display: "block", "padding-top": "50%" },
                  },
                  [
                    a("img", {
                      style: { "padding-bottom": t.datas.imgMargin + "px" },
                      attrs: {
                        draggable: "false",
                        src: t.datas.imageList[0].src,
                        alt: "",
                      },
                    }),
                  ]
                ),
                a(
                  "div",
                  { staticStyle: { display: "flex", width: "100%" } },
                  t._l(2, function (e) {
                    return a(
                      "div",
                      {
                        key: e,
                        staticClass: "rubiksCubeType hw imgtow",
                        staticStyle: { "padding-top": "50%" },
                      },
                      [
                        a("img", {
                          style: { padding: t.datas.imgMargin + "px" },
                          attrs: {
                            draggable: "false",
                            src: t.datas.imageList[e].src,
                            alt: "",
                          },
                        }),
                      ]
                    );
                  }),
                  0
                ),
              ]
            ),
            a(
              "section",
              {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: 6 === t.datas.rubiksCubeType && t.showimageList,
                    expression: "datas.rubiksCubeType === 6 && showimageList",
                  },
                ],
                staticClass: "buju buju4",
              },
              [
                a(
                  "div",
                  {
                    staticClass: "rubiksCubeType hw",
                    staticStyle: { "padding-top": "100%" },
                  },
                  [
                    a("img", {
                      staticStyle: { height: "300px" },
                      style: { "padding-right": t.datas.imgMargin + "px" },
                      attrs: {
                        draggable: "false",
                        src: t.datas.imageList[0].src,
                        alt: "",
                      },
                    }),
                  ]
                ),
                a(
                  "div",
                  {
                    staticStyle: {
                      display: "inline-flex",
                      "flex-direction": "column",
                      width: "100%",
                    },
                  },
                  [
                    a(
                      "div",
                      {
                        staticClass: "rubiksCubeType hw",
                        staticStyle: { "padding-top": "150px" },
                      },
                      [
                        a("img", {
                          style: {
                            "padding-bottom": t.datas.imgMargin + "px",
                            "padding-left": t.datas.imgMargin + "px",
                          },
                          attrs: {
                            draggable: "false",
                            src: t.datas.imageList[1].src,
                            alt: "",
                          },
                        }),
                      ]
                    ),
                    a(
                      "div",
                      { staticClass: "rubiksCubeType" },
                      t._l(2, function (e) {
                        return a(
                          "div",
                          {
                            key: e,
                            staticClass: "hw",
                            staticStyle: {
                              display: "inline-flex",
                              "justify-content": "center",
                              "align-items": "center",
                              "padding-top": "150px",
                            },
                          },
                          [
                            a("img", {
                              staticStyle: { height: "150px" },
                              style: {
                                "padding-left": t.datas.imgMargin + "px",
                                "padding-top": t.datas.imgMargin + "px",
                              },
                              attrs: {
                                draggable: "false",
                                src: t.datas.imageList[e + 1].src,
                                alt: "",
                              },
                            }),
                          ]
                        );
                      }),
                      0
                    ),
                  ]
                ),
              ]
            ),
            t._t("deles"),
          ],
          2
        );
      },
      i = [],
      o = {
        name: "magiccube",
        props: { datas: Object },
        computed: {
          showimageList: function () {
            return (
              !(
                0 === this.datas.rubiksCubeType &&
                !this.datas.imageList[0].src &&
                !this.datas.imageList[1].src
              ) &&
              !!(
                (1 !== this.datas.rubiksCubeType &&
                  4 !== this.datas.rubiksCubeType &&
                  5 !== this.datas.rubiksCubeType) ||
                this.datas.imageList[0].src ||
                this.datas.imageList[1].src ||
                this.datas.imageList[2].src
              ) &&
              !!(
                (2 !== this.datas.rubiksCubeType &&
                  6 !== this.datas.rubiksCubeType &&
                  3 !== this.datas.rubiksCubeType) ||
                this.datas.imageList[0].src ||
                this.datas.imageList[1].src ||
                this.datas.imageList[2].src ||
                this.datas.imageList[3].src
              )
            );
          },
        },
      },
      n = o,
      r = (a("643d"), a("2877")),
      c = Object(r["a"])(n, s, i, !1, null, "67678d50", null);
    e["default"] = c.exports;
  },
  fdfa: function (t, e, a) {},
  ffe0: function (t, e, a) {
    var s = {
      "./componentscom/auxiliarysegmentation/index.vue": "089a",
      "./componentscom/buttons/index.vue": "79b8",
      "./componentscom/cantuan/index.vue": "5dfc",
      "./componentscom/captiontext/index.vue": "4870",
      "./componentscom/chanpin/index.vue": "9ac6",
      "./componentscom/h5chat/index.vue": "c9fd",
      "./componentscom/investigate/index.vue": "b0bd",
      "./componentscom/kscantuan/index.vue": "e644",
      "./componentscom/listswitching/index.vue": "21c2",
      "./componentscom/magiccube/index.vue": "fbb0",
      "./componentscom/notice/index.vue": "d061",
      "./componentscom/payfans/index.vue": "4ee6",
      "./componentscom/payfans/pay.vue": "c216",
      "./componentscom/payfans/state.vue": "1a97",
      "./componentscom/payondelivery/index.vue": "aa30",
      "./componentscom/pictureads/index.vue": "76e1",
      "./componentscom/placementarea/index.vue": "cb08",
      "./componentscom/richtext/index.vue": "4e3b",
      "./componentscom/storeinformation/index.vue": "9910",
      "./componentscom/tabBar/index.vue": "a743",
      "./componentscom/videoss/index.vue": "e46d",
      "./componentscom/xsactive/index.vue": "3eaa",
      "./headerTop/index.vue": "e955",
      "./vk-data-goods-sku-popup/vk-data-goods-sku-popup.vue": "2aa4",
    };
    function i(t) {
      var e = o(t);
      return a(e);
    }
    function o(t) {
      if (!a.o(s, t)) {
        var e = new Error("Cannot find module '" + t + "'");
        throw ((e.code = "MODULE_NOT_FOUND"), e);
      }
      return s[t];
    }
    (i.keys = function () {
      return Object.keys(s);
    }),
      (i.resolve = o),
      (t.exports = i),
      (i.id = "ffe0");
  },
});
