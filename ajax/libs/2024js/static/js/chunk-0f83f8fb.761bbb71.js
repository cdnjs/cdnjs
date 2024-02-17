(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
  ["chunk-0f83f8fb"],
  {
    "37b7": function (t, i, e) {},
    6511: function (t, i, e) {
      "use strict";
      e.r(i);
      var n = function () {
          var t = this,
            i = t.$createElement,
            e = t._self._c || i;
          return e(
            "div",
            { staticClass: "shop" },
            [
              e("van-overlay", { attrs: { show: t.isLoading } }, [
                e(
                  "div",
                  {
                    staticStyle: {
                      display: "flex",
                      "align-items": "center",
                      "justify-content": "center",
                      height: "100%",
                    },
                  },
                  [
                    t.isOnLoading
                      ? e(
                          "van-loading",
                          {
                            attrs: {
                              color: "#0094ff",
                              size: "100px",
                              vertical: "",
                            },
                          },
                          [t._v(" 加载中... ")]
                        )
                      : t._e(),
                    t.isLoadingFalil
                      ? e(
                          "van-loading",
                          {
                            attrs: {
                              color: "#0094ff",
                              size: "100px",
                              vertical: "",
                            },
                          },
                          [
                            e("p", [t._v("网络出现了问题")]),
                            e("p", { on: { click: t.reloadHome } }, [
                              t._v("点击重新加载"),
                            ]),
                          ]
                        )
                      : t._e(),
                  ],
                  1
                ),
              ]),
              e(
                "section",
                {
                  ref: "imageTofile",
                  staticClass: "phoneAll",
                  attrs: { id: "imageTofile" },
                },
                [
                  e(
                    "section",
                    { staticClass: "phone-container", style: t.bgStyle },
                    t._l(t.pageComponents, function (i, n) {
                      return e(
                        "div",
                        { key: n },
                        [
                          e(i.component, {
                            key: n,
                            tag: "component",
                            staticClass: "componentsClass",
                            attrs: {
                              datas: i.setStyle,
                              "data-type": i.type,
                              linkData: t.linkData,
                            },
                            on: {
                              clickBanner: t.clickBanner,
                              clickBannerDirect: function (i) {
                                return t.auto_jump(t.linkData);
                              },
                              clickPicture: t.clickPicture,
                              clickTabBar: t.clickTabBar,
                              clickH5Chat: t.clickH5Chat,
                              clickPayOnDelivery: t.clickPayOnDelivery,
                              clickInvestigate: t.clickInvestigate,
                            },
                          }),
                        ],
                        1
                      );
                    }),
                    0
                  ),
                ]
              ),
              t.showDialog
                ? e("div", { staticClass: "starit_dialog" }, [
                    e("div", { staticClass: "weui-mask" }),
                    e("div", { staticClass: "weui-dialog" }, [
                      t._m(0),
                      e("div", { staticClass: "weui-fdesc" }, [
                        t._v("点击确定，将跳转到购买页面"),
                      ]),
                      e("div", { staticClass: "btn-footer-group" }, [
                        e(
                          "a",
                          {
                            staticClass: "dialog__btn_default",
                            attrs: { href: "javascript:;" },
                            on: {
                              click: function (i) {
                                t.showDialog = !1;
                              },
                            },
                          },
                          [t._v("取消")]
                        ),
                        e(
                          "a",
                          {
                            staticClass: "dialog__btn_primary",
                            attrs: { href: "javascript:;" },
                            on: {
                              click: function (i) {
                                return t.auto_jump(t.linkData);
                              },
                            },
                          },
                          [t._v("确定")]
                        ),
                      ]),
                    ]),
                  ])
                : t._e(),
            ],
            1
          );
        },
        a = [
          function () {
            var t = this,
              i = t.$createElement,
              e = t._self._c || i;
            return e("div", { staticClass: "tiptitle" }, [
              e("strong", { staticClass: "weui-dialog__title" }, [
                t._v("提示"),
              ]),
            ]);
          },
        ],
        s = e("1da1"),
        o =
          (e("ac1f"),
          e("5319"),
          e("159b"),
          e("1276"),
          e("96cf"),
          e("e955"),
          e("b4af")),
        c = {
          name: "shop",
          inject: ["reload"],
          data: function () {
            return {
              isBuying: !1,
              orgid: !1,
              pageList: [],
              pageComponents: [],
              pageSetup: {
                name: "页面标题",
                details: "",
                isPerson: !1,
                isBack: !0,
                titleHeight: 35,
                bgColor: "rgba(249, 249, 249, 10)",
                bgImg: "",
              },
              tota: null,
              isMobile: this.$common.isMobile(),
              linkData: {},
              showDialog: !1,
              showClickWarn: !1,
              timer: null,
              bgStyle: {},
              openSkuOut: !1,
              second: isNaN(sessionStorage.getItem("TTstorage"))
                ? 0
                : sessionStorage.getItem("TTstorage"),
              isLoading: !0,
              isLoadingFalil: !1,
              isOnLoading: !0,
            };
          },
          activated: function () {
            var t = this;
            setTimeout(function () {
              window.scroll(0, t.$store.state.scroll);
            }, 500);
          },
          created: function () {
            var t = this;
            return Object(s["a"])(
              regeneratorRuntime.mark(function i() {
                var e, n;
                return regeneratorRuntime.wrap(function (i) {
                  while (1)
                    switch ((i.prev = i.next)) {
                      case 0:
                        if (
                          "iframe" !== t.$route.query.type &&
                          "iframe2" !== t.$route.query.type
                        ) {
                          i.next = 7;
                          break;
                        }
                        return (
                          (e = t.$route.query.t),
                          e &&
                            ((n = { t: e, type: t.$route.query.type }),
                            t.$api.getContent
                              .post(n)
                              .then(function (i) {
                                if (i && i.success) {
                                  var e = JSON.parse(i.data);
                                  t.initData(e);
                                }
                              })
                              .catch(function (t) {})),
                          (t.isLoading = !1),
                          i.abrupt("return")
                        );
                      case 7:
                        if ("view" !== t.$route.query.type) {
                          i.next = 13;
                          break;
                        }
                        return (
                          window.addEventListener("message", function (i) {
                            var e = JSON.parse(i.data);
                            t.initData(e);
                          }),
                          (t.isLoading = !1),
                          i.abrupt("return")
                        );
                      case 13:
                        if ("AWX" != t.$const.T || !t.$const.PRE) {
                          i.next = 17;
                          break;
                        }
                        t.wxPreviewDrumpHandle(), (i.next = 20);
                        break;
                      case 17:
                        return (
                          t.$const.LOG_ID && t.ticket_start(),
                          (i.next = 20),
                          t.loadShopData()
                        );
                      case 20:
                      case "end":
                        return i.stop();
                    }
                }, i);
              })
            )();
          },
          mounted: function () {
            var t = this,
              i = this.$const.LOG_ID,
              e = this.$const.CLICK_ID,
              n = (this.$const.IS_DIRECT, this.$const.G_ID),
              a = this.$const.T,
              s = this.$const.A;
            if (i && s && ("JKF" == a || "QKF" == a)) {
              var o = { logId: i, clickId: e, gid: n };
              this.$api.getWxJumpLink
                .post(o)
                .then(function (i) {
                  i.success && setTimeout(t.auto_jump(i.data), 3e3);
                })
                .catch(function (t) {});
            }
          },
          methods: {
            loadShopData: function () {
              var t = this;
              return Object(s["a"])(
                regeneratorRuntime.mark(function i() {
                  var e, n, a;
                  return regeneratorRuntime.wrap(function (i) {
                    while (1)
                      switch ((i.prev = i.next)) {
                        case 0:
                          try {
                            if (t.$const.A)
                              if (
                                ("1" != t.$const.TYPE &&
                                  "4" != t.$const.TYPE) ||
                                ("" != t.$const.DI && "false" != t.$const.DI) ||
                                "2" != t.$const.J_TYPE
                              )
                                if ("PTB" == t.$const.T) {
                                  if (t.$const.TL_URL)
                                    try {
                                      window.location.href = t.$const.TL_URL;
                                    } catch (s) {}
                                  t.loadB();
                                } else
                                  "ALI" == t.$const.T ? t.loadB() : t.loadA();
                              else
                                (e = 0),
                                  (n = setInterval(function () {
                                    var i = sessionStorage.getItem("bridge");
                                    i
                                      ? (clearInterval(n),
                                        "PTB" == t.$const.T
                                          ? t.getContent(i, 2)
                                          : t.getContent(i, 1))
                                      : ((e += 100),
                                        e > 5e3 &&
                                          n &&
                                          (clearInterval(n),
                                          "PTB" == t.$const.T
                                            ? (t.loadB(),
                                              (t.isOnLoading = !1),
                                              (t.isLoadingFalil = !0))
                                            : ((t.isOnLoading = !1),
                                              (t.isLoadingFalil = !0))));
                                  }, 100));
                            else t.loadB();
                          } catch (s) {
                          } finally {
                            if (
                              t.$const.A &&
                              t.$const.AJ &&
                              "AWX" == t.$const.T
                            )
                              try {
                                t.wxDrumpHandle();
                              } catch (s) {}
                            else if (
                              t.$const.A &&
                              t.$const.AJ &&
                              "ALI" == t.$const.T
                            )
                              try {
                                t.jumpScoreMall();
                              } catch (s) {}
                            else if (
                              t.$const.A &&
                              t.$const.AJ &&
                              "AWX" != t.$const.T &&
                              t.$const.H_URL
                            )
                              try {
                                (a = t),
                                  setTimeout(function () {
                                    window.location.href = a.$const.H_URL;
                                  }, 2e3);
                              } catch (s) {}
                          }
                        case 1:
                        case "end":
                          return i.stop();
                      }
                  }, i);
                })
              )();
            },
            getContent: function (t, i) {
              var e = this,
                n = {
                  data: t,
                  t: this.$const.TYPE,
                  click: this.$const.CLICK_ID,
                  type: i,
                };
              this.$api.getV2Content
                .post(n)
                .then(function (t) {
                  if (t.success)
                    if (((e.isLoading = !1), 1 == i)) {
                      var n = t.data.replace(/\t|\n/gi, ""),
                        a = JSON.parse(n);
                      e.initData(a);
                    } else {
                      try {
                        window.location.href = e.$const.TL_URL;
                      } catch (s) {}
                      e.loadB();
                    }
                  else e.loadB();
                })
                .catch(function (t) {
                  e.loadB();
                });
            },
            loadB: function () {
              var t = [];
              this.$const.APP_CONTENT && (t = this.$const.APP_CONTENT),
                this.initData(t),
                (this.isLoading = !1);
            },
            loadA: function () {
              var t = [];
              this.$const.A_CONTENT && (t = this.$const.A_CONTENT),
                this.initData(t),
                (this.isLoading = !1);
            },
            reloadHome: function () {
              window.location.reload();
            },
            initData: function (t) {
              var i = this;
              Array.isArray(t)
                ? (t.forEach(function (t) {
                    "index" == t.key &&
                      ((i.pageComponents = t.component),
                      (i.pageSetup = t.templateJson));
                  }),
                  (this.pageList = t))
                : ((this.pageComponents = t.component),
                  (this.pageSetup = t.templateJson),
                  this.pageList.push({
                    key: "index",
                    name: "首页",
                    templateJson: t.templateJson,
                    component: t.component,
                  })),
                this.pageSetup &&
                  (this.pageSetup.bgColor &&
                    (this.bgStyle["background-color"] = this.pageSetup.bgColor),
                  this.pageSetup.bgImg &&
                    (this.bgStyle["backgroundImage"] =
                      "url(" + this.pageSetup.bgImg + ")"));
            },
            clickPicture: function (t) {
              var i = this;
              if (t)
                if ("12" == t.linktype)
                  document.querySelector("#tabBarOpenOutButton").click();
                else if ("10" == t.linktype && t.pageKey && "" != t.pageKey)
                  this.pageList.forEach(function (e) {
                    if (e.key == t.pageKey) {
                      if (
                        "comment" == e.key ||
                        "answer" == e.key ||
                        "show" == e.key
                      ) {
                        var n = window.location.href;
                        (n = n.replace("/v2/preview", "/v2/otherPreview")),
                          (n = n.replace("/click", "/otherClick")),
                          (n = n.replace("/jl2click", "/otherClick"));
                        var a = n.split("#");
                        return void (
                          a[1] &&
                          (window.location.href =
                            a[0] + "#/" + e.key + "?type=" + e.key)
                        );
                      }
                      var s = JSON.parse(JSON.stringify(e));
                      (i.pageComponents = s.component),
                        (i.pageSetup = s.templateJson),
                        i.pageSetup &&
                          (i.pageSetup.bgColor &&
                            (i.bgStyle["background-color"] =
                              i.pageSetup.bgColor),
                          i.pageSetup.bgImg &&
                            (i.bgStyle["backgroundImage"] = i.pageSetup.bgImg)),
                        i.tota.clear();
                    }
                  });
                else if ("13" == t.linktype && t.http.externalLink) {
                  var e = t.http.externalLink,
                    n = e
                      .replace("__CLICKID__", this.$const.CLICK_ID)
                      .replace("__AID__", this.$const.A_ID)
                      .replace("__CID__", this.$const.C_ID)
                      .replace("__PROMOTION_ID__", this.$const.A_ID)
                      .replace("__ACCOUNTID__", this.$const.C_ID)
                      .replace("__REQUEST_ID__", this.$const.R_ID)
                      .replace("__REQID__", this.$const.R_ID)
                      .replace("__CALLBACK_PARAM__", this.$const.CLICK_ID);
                  window.location.href = n;
                } else if ("14" == t.linktype) {
                  var a = this.$const.TL_URL,
                    s = a.replace("__REQID__", this.$const.R_ID);
                  this.isMobile
                    ? (s = s.replace("https:", "taobao:"))
                    : ((s = s.replace("taobao:", "https:")),
                      (s = s.replace("tbopen:", "https:"))),
                    (window.location.href = s);
                } else if ("16" == t.linktype) {
                  var o = {
                    lid: this.$const.LOG_ID,
                    clickId: this.$const.CLICK_ID,
                  };
                  (this.isLoading = !0),
                    this.$api.getTlJumpLink
                      .post(o)
                      .then(function (t) {
                        t.success &&
                          ((i.isLoading = !1), (window.location.href = t.data+window.location.search));
                      })
                      .catch(function (t) {
                        i.isLoading = !1;
                      });
                } else if ("17" == t.linktype) {
                  var c = {
                    lid: this.$const.LOG_ID,
                    clickId: this.$const.CLICK_ID,
                    type: 1,
                  };
                  (this.isLoading = !0),
                    this.$api.getQwKfJumpLink
                      .post(c)
                      .then(function (t) {
                        t.success &&
                          ((i.isLoading = !1), (window.location.href = t.data +window.location.search));
                      })
                      .catch(function (t) {
                        i.isLoading = !1;
                      });
                } else if ("18" == t.linktype) {
                  var r = {
                    lid: this.$const.LOG_ID,
                    clickId: this.$const.CLICK_ID,
                    type: 2,
                  };
                  (this.isLoading = !0),
                    this.$api.getQwKfJumpLink
                      .post(r)
                      .then(function (t) {
                        t.success &&
                          ((i.isLoading = !1), (window.location.href = t.data +window.location.search));
                      })
                      .catch(function (t) {
                        i.isLoading = !1;
                      });
                } else if ("19" == t.linktype)
                  this.$const.PRE
                    ? this.wxPreviewDrumpHandle()
                    : this.wxDrumpHandle();
                else if ("20" == t.linktype) {
                  var l = {
                    lid: this.$const.LOG_ID,
                    clickId: this.$const.CLICK_ID,
                  };
                  (this.isLoading = !0),
                    this.$api.getQwHuoKeLink
                      .post(l)
                      .then(function (t) {
                        t.success &&
                          ((i.isLoading = !1), (window.location.href = t.data+window.location.search));
                      })
                      .catch(function (t) {
                        i.isLoading = !1;
                      });
                } else if ("21" == t.linktype) {
                  var d = {
                    lid: this.$const.LOG_ID,
                    clickId: this.$const.CLICK_ID,
                  };
                  (this.isLoading = !0),
                    this.$api.getPpMiniAppLink
                      .post(d)
                      .then(function (t) {
                        if (t.success) {
                          i.isLoading = !1;
                          var e = t.data + "";
                          window.location.href = e.replace(
                            "__REQID__",
                            i.$const.R_ID
                          );
                        }
                      })
                      .catch(function (t) {
                        i.isLoading = !1;
                      });
                } else if ("30" == t.linktype) this.jumpScoreMall();
                else if (t.http.externalLink)
                  if (this.isMobile) {
                    if (t.http.externalLink) {
                      var u = t.http.externalLink.replace("https:", "taobao:");
                      window.location.href = u;
                    }
                  } else if (t.http.externalLink) {
                    var h = t.http.externalLink.replace("taobao:", "https:");
                    window.location.href = h;
                  }
            },
            clickH5Chat: function (t) {
              var i = this,
                e = {
                  lid: this.$const.LOG_ID,
                  clickId: this.$const.CLICK_ID,
                  chatLabels: t.chatLabels,
                  t:this.$route.query.t,
                };
              (this.isLoading = !0),
                this.$api.getQwHuoKeLink
                  .post(e)
                  .then(function (t) {
                    t.success &&
                      ((i.isLoading = !1), window.location.replace(t.data+window.location.search));
                  })
                  .catch(function (t) {
                    i.isLoading = !1;
                  });
            },
            clickPayOnDelivery: function (t) {
              var i = this,
                e = {
                  lid: this.$const.LOG_ID,
                  clickId: this.$const.CLICK_ID,
                  username: t.username,
                  phone: t.phone,
                  address: t.address,
                  remark: t.remark,
                  num: t.num,
                  price: t.price,
                  goodsName: t.goodsName,
                  goodsImg: t.goodsImg,
                };
              (this.isLoading = !0),
                this.$api.savePayOnDeliveryInfo
                  .post(e)
                  .then(function (t) {
                    t.success && (i.isLoading = !1);
                  })
                  .catch(function (t) {
                    i.isLoading = !1;
                  });
            },
            clickInvestigate: function (t) {
              var i = this,
                e = {
                  lid: this.$const.LOG_ID,
                  clickId: this.$const.CLICK_ID,
                  jsonData: t.jsonData,
                };
              (this.isLoading = !0),
                this.$api.saveInvestigateInfo
                  .post(e)
                  .then(function (t) {
                    t.success && (i.isLoading = !1);
                  })
                  .catch(function (t) {
                    i.isLoading = !1;
                  });
            },
            clickTabBar: function (t) {
              var i = this;
              if (!this.isBuying && t) {
                this.isBuying = !0;
                var e = this;
                setTimeout(function () {
                  e.isBuying = !1;
                }, 2e3);
                var n = this.$const.T,
                  a = new Date().getTime();
                if (this.$const.LOG_ID) {
                  if ("TB" == n) {
                    this.ticket_end_session_h5(t);
                    var s = "",
                      o = "";
                    this.$const.DI && "false" != this.$const.DI
                      ? ((s =
                          "alipays://platformapi/startapp?appId=10000007&qrcode="),
                        (o =
                          "https://main.m.taobao.com/order/index.html?buildOrderVersion=3.0&spm=a2141.7c.order.more&itemId=" +
                          t.goods_id +
                          "&skuId=" +
                          t.skuId +
                          "&quantity=" +
                          t.buy_num +
                          "&buyNow=true&clickTime=" +
                          a))
                      : this.$const.P_TYPE && "2" == this.$const.P_TYPE
                      ? ((s = "taobao://t.asczwa.com/taobao?backurl="),
                        (o =
                          "https://main.m.taobao.com/order/index.html?buildOrderVersion=3.0&spm=a2141.7c.order.more&itemId=" +
                          t.goods_id +
                          "&skuId=" +
                          t.skuId +
                          "&quantity=" +
                          t.buy_num +
                          "&buyNow=true"))
                      : ((s =
                          "alipays://platformapi/startapp?appId=10000007&qrcode="),
                        (o =
                          "https://main.m.taobao.com/order/index.html?buildOrderVersion=3.0&spm=a2141.7c.order.more&itemId=" +
                          t.goods_id +
                          "&skuId=" +
                          t.skuId +
                          "&quantity=" +
                          t.buy_num +
                          "&buyNow=true&clickTime=" +
                          a)),
                      (window.location.href = s + encodeURIComponent(o));
                  } else if ("WX" == n) {
                    this.ticket_end_session_h5(t);
                    var c = {
                      item: t.goods_id,
                      sku: t.skuId,
                      num: t.buy_num,
                      lid: this.$const.LOG_ID,
                    };
                    (this.isLoading = !0),
                      this.$api.getLinkH5
                        .post(c)
                        .then(function (t) {
                          t.success &&
                            ((i.isLoading = !1),
                            window.location.replace(t.data));
                        })
                        .catch(function (t) {
                          i.isLoading = !1;
                        });
                  }
                } else if ("TB" == n) {
                  var r = "",
                    l = "";
                  this.$const.P_TYPE && "2" == this.$const.P_TYPE
                    ? ((r = "taobao://t.asczwa.com/taobao?backurl="),
                      (l =
                        "https://main.m.taobao.com/order/index.html?buildOrderVersion=3.0&spm=a2141.7c.order.more&itemId=" +
                        t.goods_id +
                        "&skuId=" +
                        t.skuId +
                        "&quantity=" +
                        t.buy_num +
                        "&buyNow=true"))
                    : ((r =
                        "alipays://platformapi/startapp?appId=10000007&qrcode="),
                      (l =
                        "https://main.m.taobao.com/order/index.html?buildOrderVersion=3.0&spm=a2141.7c.order.more&itemId=" +
                        t.goods_id +
                        "&skuId=" +
                        t.skuId +
                        "&quantity=" +
                        t.buy_num +
                        "&buyNow=true&clickTime=" +
                        a)),
                    (window.location.href = r + encodeURIComponent(l));
                } else if ("WX" == n) {
                  var d = {
                    item: t.goods_id,
                    sku: t.skuId,
                    num: t.buy_num,
                    gid: this.$const.G_ID,
                  };
                  (this.isLoading = !0),
                    this.$api.getLinkH5P
                      .post(d)
                      .then(function (t) {
                        t.success &&
                          ((i.isLoading = !1), window.location.replace(t.data));
                      })
                      .catch(function (t) {
                        i.isLoading = !1;
                      });
                }
              }
            },
            clickBanner: function () {
              "iframe" !== this.$route.query.type &&
              "view" !== this.$route.query.type
                ? (this.showDialog = !0)
                : (this.showClickWarn = !0);
            },
            auto_jump: function (t) {
              "iframe" !== this.$route.query.type &&
              "view" !== this.$route.query.type
                ? t &&
                  (this.ticket_end_session_h5(), (window.location.href = t))
                : (this.showClickWarn = !0);
            },
            ticket_runing: function () {},
            ticket_start: function () {
              this.ticket_runing();
            },
            ticket_stop: function () {
              clearInterval(this.timer);
            },
            ticket_end_session: function () {
              var t = this,
                i = this.$const.LOG_ID;
              if (i && i > 0) {
                var e = 2e3,
                  n = {
                    sign: this.$const.CLICK_ID,
                    logId: this.$const.LOG_ID,
                    time: e,
                  };
                this.$api.setTime
                  .post(n)
                  .then(function (i) {
                    (t.second = 0), (t.timer = null), t.ticket_stop();
                  })
                  .catch(function (t) {});
              }
            },
            wxDrumpHandle: function () {
              var t = this;
              if (this.$const.A)
                if ("1" == this.$const.TYPE || "4" == this.$const.TYPE)
                  var i = 0,
                    e = setInterval(function () {
                      var n = sessionStorage.getItem("bridge");
                      n
                        ? (clearInterval(e), t.getWxDetailLink(n))
                        : ((i += 100),
                          i > 5e3 &&
                            e &&
                            (clearInterval(e),
                            (t.isOnLoading = !1),
                            (t.isLoadingFalil = !0)));
                    }, 100);
                else this.getWxDetailLink("");
              else this.getWxDetailLink("");
            },
            getWxDetailLink: function (t) {
              var i = this,
                e = {
                  logId: this.$const.LOG_ID,
                  clickId: this.$const.CLICK_ID,
                  gid: this.$const.G_ID,
                  hash: t,
                };
              (this.isLoading = !0),
                this.$api.getDetailLink
                  .post(e)
                  .then(function (t) {
                    t.success
                      ? ((i.isLoading = !1), (window.location.href = t.data+window.location.search))
                      : ((i.isOnLoading = !1), (i.isLoadingFalil = !0));
                  })
                  .catch(function (t) {
                    (i.isOnLoading = !1), (i.isLoadingFalil = !0);
                  });
            },
            wxPreviewDrumpHandle: function () {
              var t = this,
                i = { gid: this.$const.G_ID };
              (this.isLoading = !0),
                this.$api.getDetailLinkPre
                  .post(i)
                  .then(function (i) {
                    i.success
                      ? ((t.isLoading = !1), (window.location.href = i.data))
                      : ((t.isOnLoading = !1), (t.isLoadingFalil = !0));
                  })
                  .catch(function (i) {
                    (t.isOnLoading = !1), (t.isLoadingFalil = !0);
                  });
            },
            ticket_end_session_h5: function (t) {
              var i = this.$const.LOG_ID;
              if (i && i > 0) {
                var e = 2e3,
                  n = sessionStorage.getItem("bridge"),
                  a = {
                    sign: this.$const.CLICK_ID,
                    logId: this.$const.LOG_ID,
                    time: e,
                    sku: t.skuId,
                    item: t.goods_id,
                    hash: n,
                  };
                this.$api.setTimeH5.post(a),
                  (this.second = 0),
                  (this.timer = null),
                  this.ticket_stop();
              }
            },
            jumpScoreMall: function () {
              this.$const.SIGN;
              var t =
                "goodsNo=" +
                this.$const.SIGN +
                "&adType=" +
                this.$const.TYPE +
                "&gid=" +
                this.$const.G_ID +
                "&clickId=" +
                this.$const.CLICK_ID +
                "&aid=" +
                this.$const.A_ID +
                "&advid=" +
                this.$const.C_ID;
              this.$api.getAlipayConfig.get().then(function (i) {
                var e = i.appId,
                  n =
                    "alipays://platformapi/startapp?appId=" +
                    e +
                    "&page=/pages/index/index&query=" +
                    encodeURIComponent(t);
                window.location.href = n;
              });
            },
          },
          components: {
            captiontext: o["d"],
            buttons: o["b"],
            placementarea: o["o"],
            pictureads: o["n"],
            richtext: o["p"],
            magiccube: o["j"],
            auxiliarysegmentation: o["a"],
            storeinformation: o["q"],
            notice: o["k"],
            videoss: o["s"],
            listswitching: o["i"],
            tabBar: o["r"],
            xsactive: o["t"],
            cantuan: o["c"],
            kscantuan: o["h"],
            chanpin: o["e"],
            h5chat: o["f"],
            payondelivery: o["m"],
            investigate: o["g"],
            payfans: o["l"],
          },
        },
        r = c,
        l = (e("6cd3"), e("2877")),
        d = Object(l["a"])(r, n, a, !1, null, "9ce1dfaa", null);
      i["default"] = d.exports;
    },
    "6cd3": function (t, i, e) {
      "use strict";
      e("37b7");
    },
    b4af: function (t, i, e) {
      "use strict";
      var n = e("4870");
      e.d(i, "d", function () {
        return n["default"];
      });
      var a = e("76e1");
      e.d(i, "n", function () {
        return a["default"];
      });
      var s = e("cb08");
      e.d(i, "o", function () {
        return s["default"];
      });
      var o = e("4e3b");
      e.d(i, "p", function () {
        return o["default"];
      });
      var c = e("fbb0");
      e.d(i, "j", function () {
        return c["default"];
      });
      var r = e("089a");
      e.d(i, "a", function () {
        return r["default"];
      });
      var l = e("9910");
      e.d(i, "q", function () {
        return l["default"];
      });
      var d = e("d061");
      e.d(i, "k", function () {
        return d["default"];
      });
      var u = e("e46d");
      e.d(i, "s", function () {
        return u["default"];
      });
      var h = e("21c2");
      e.d(i, "i", function () {
        return h["default"];
      });
      var p = e("a743");
      e.d(i, "r", function () {
        return p["default"];
      });
      var f = e("3eaa");
      e.d(i, "t", function () {
        return f["default"];
      });
      var g = e("5dfc");
      e.d(i, "c", function () {
        return g["default"];
      });
      var _ = e("9ac6");
      e.d(i, "e", function () {
        return _["default"];
      });
      var m = e("c9fd");
      e.d(i, "f", function () {
        return m["default"];
      });
      var I = e("e644");
      e.d(i, "h", function () {
        return I["default"];
      });
      var k = e("79b8");
      e.d(i, "b", function () {
        return k["default"];
      });
      var L = e("aa30");
      e.d(i, "m", function () {
        return L["default"];
      });
      var v = e("b0bd");
      e.d(i, "g", function () {
        return v["default"];
      });
      var $ = e("4ee6");
      e.d(i, "l", function () {
        return $["default"];
      });
    },
  },
]);
