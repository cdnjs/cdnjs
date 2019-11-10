/* Gridifier v2.0.0
 * Async Responsive HTML Grids
 * http://gridifier.io
 * 
 * Gridifier is dual-licensed:
 *   GPLV3 per non-commercial usage; 
 *   Commercial license per commercial usage.
 * Read http://gridifier.io/license for details.
 * Copyright 2015 nTech
 */

(function(a, b) {
    if (typeof define === "function" && define.amd) {
        define([], b);
    } else if (typeof exports === "object" && exports) {
        module.exports = b();
    } else {
        a.Gridifier = b();
    }
})(this, function() {
    var a = function(a, b) {
        var c = function(a, b) {
            for (var c in b) a.prototype[c] = b[c];
        };
        var d = function(a, b) {
            for (var c in b) {
                (function(a, c) {
                    Xa[a] = function() {
                        return b[a].apply(c, arguments);
                    };
                })(c, a);
            }
        };
        var e = function(a) {
            throw new Error(H.ERR + a);
        };
        var f = function() {
            return function() {};
        };
        var g = function(a, b) {
            return function() {
                return b[a].apply(b, arguments);
            };
        };
        var h = f();
        var i = f();
        var j = function() {
            return {
                isScheduled: function() {
                    return false;
                }
            };
        };
        var k = f();
        var l = f();
        var m = f();
        var n = f();
        var o = f();
        var p = f();
        var q = f();
        var r = f();
        var s = f();
        var t = f();
        var u = f();
        var v = f();
        var w = f();
        var x = f();
        var y = f();
        var z = f();
        var A = f();
        var B = function() {
            return {
                getCoordsChanger: f()
            };
        };
        var C = f();
        var D = f();
        var E = f();
        var F = f();
        var G = f();
        var H = {
            DATA: "data-gridifier",
            OWCACHED: "-cached-per-ow",
            OHCACHED: "-cached-per-oh",
            ERR: "Gridifier error: ",
            NOT_NATIVE: "is not jQuery/Native DOM object.",
            IS_ACTIVE: "-toggle-is-active"
        };
        var I = {
            SRM: {
                CACHED_PER_OW_ITEM_GUID_DATA: H.DATA + H.OWCACHED + "-guid",
                CACHED_PER_OH_ITEM_GUID_DATA: H.DATA + H.OHCACHED + "-guid",
                CACHED_PER_OW_DATA: H.DATA + H.OWCACHED,
                CACHED_PER_OH_DATA: H.DATA + H.OHCACHED,
                EMPTY_DATA: "e"
            },
            COLL: {
                SORT_INDEX_DATA: H.DATA + "-orig-sort-index",
                NOT_COLLECTABLE_DATA: H.DATA + "-not-collectable"
            },
            ITEM: {
                IS_CONNECTED_DATA: H.DATA + "-connected"
            },
            REND: {
                CN_RENDERED_DATA: H.DATA + "-cn-rendered",
                SCH_TO_HIDE_DATA: H.DATA + "-sch-to-hide",
                SILENT_DATA: H.DATA + "-sch-for-silentr"
            },
            DRAGIFIER_REPOS_DELAY: 20,
            DRAGIFIER_DISCR_REPOS_DELAY: 100,
            IS_DRAGGABLE_DATA: H.DATA + "-is-draggable",
            GUID_DATA: H.DATA + "-guid",
            RANGE_SIZE: 500,
            REFLOW_FIX_DELAY: 0,
            UPDATE_Z_DELAY: 100,
            INSERT_QUEUE_DELAY: 100,
            INSERT_BATCH_DELAY: 100,
            RENDER_QUEUE_DELAY: 20,
            RENDER_DEF_DELAY: 40,
            DISC_TYPES: {
                SOFT: 0,
                HARD: 1
            },
            DISC_BATCH: 12,
            DISC_DELAY: 60,
            RSORT_REPOS_DELAY: 20,
            MAX_Z: "16777271"
        };
        var J = {
            IS_ACTIVE: H.DATA + H.IS_ACTIVE,
            IS_ACTIVE_WITH_CC: H.DATA + H.IS_ACTIVE + "-with-cc",
            SYNCER_DATA: H.DATA + "-toggle-syncer-id"
        };
        var K = {
            MATRICES: {
                X: "1, 0, 0, ",
                Y: "0, 1, 0, ",
                Z: "0, 0, 1, ",
                XY: "1, 1, 0, ",
                XZ: "1, 0, 1, ",
                YZ: "0, 1, 1, ",
                XYZ: "1, 1, 1, "
            },
            FNS: {
                X: "rotateX",
                Y: "rotateY",
                Z: "rotateZ"
            },
            FADES: {
                NONE: 0,
                FULL: 1,
                ON_HIDE_MIDDLE: 2
            },
            GUID_DATA: H.DATA + "rotate-guid",
            SCENE_CLASS_PREFIX: "gridifierRotateSceneId"
        };
        var L = {
            INITIAL_GUID: -1,
            SHIFTED: 8,
            APPEND: {
                DEF: 0,
                REV: 1
            },
            PREPEND: {
                DEF: 2,
                REV: 3
            },
            LEFT: {
                TOP: 0,
                BOTTOM: 1
            },
            BOTTOM: {
                RIGHT: 2,
                LEFT: 3
            },
            RIGHT: {
                TOP: 4,
                BOTTOM: 5
            },
            TOP: {
                LEFT: 6,
                RIGHT: 7
            },
            CLEANERS: {
                INSIDE: 0,
                INSIDE_OR_BEFORE: 1
            }
        };
        var M = {
            PREPEND: 0,
            REV_PREPEND: 1,
            APPEND: 2,
            REV_APPEND: 3,
            MIR_PREPEND: 4,
            INS_BEFORE: 5,
            INS_AFTER: 6,
            SIL_APPEND: 7
        };
        var N = {
            SHOW: 0,
            HIDE: 1,
            RENDER: 2,
            DEL_RENDER: 3
        };
        var O = {
            FILTER: "filter",
            SORT: "sort",
            TOGGLE: "toggle",
            DRAG: "drag",
            RSORT: "rsort",
            COORDSCHANGER: "coordsChanger"
        };
        var P = {
            NOT_NATIVE: "one of items " + H.NOT_NATIVE,
            GRID_NOT_NATIVE: "grid " + H.NOT_NATIVE,
            NO_CNS: "no inserted items",
            CANT_FIND_CN: "can't find conn. by item",
            WRONG_IBA_ITEM: "wrong insertBefore/After targetItem",
            TOO_BIG_ITEM: "too wide(ver.grid)/too tall(hor.grid) item"
        };
        var Q = {
            SHOW: "Show",
            HIDE: "Hide",
            GRID_RESIZE: "GridResize",
            CSS_CHANGE: "CssChange",
            REPOSITION_END: "RepositionEnd",
            REPOSITION: "Reposition",
            DISCONNECT: "Disconnect",
            INSERT: "Insert",
            DRAG_END: "DragEnd"
        };
        var R = {
            REPOSITION_END_FOR_DRAG: "RepositionEndForDrag",
            BEFORE_SHOW_FOR_RSORT: "BeforeShowForRsort",
            SET_SETTING_FOR_NZER: "SetSettingForNzer",
            RSORT_CHANGE: "RsortChange"
        };
        var S = function() {
            var a = function() {
                return function(a) {
                    return a;
                };
            };
            var b = function() {
                return function(a) {
                    return Math.round(a);
                };
            };
            var c = function() {
                return function(a, b, c, d) {
                    d.css.set(a, {
                        left: Math.round(parseFloat(b)) + "px",
                        top: Math.round(parseFloat(c)) + "px"
                    });
                };
            };
            var d = [ [ "default", new n() ], [ "position", new o() ], [ "translate", new p(a(), a(), f(), false) ], [ "translateInt", new p(b(), b(), c(), false) ], [ "translate3d", new p(a(), a(), f(), true) ], [ "translate3dInt", new p(b(), b(), c(), true) ] ];
            for (var e = 0; e < d.length; e++) ab.addApi("coordsChanger", d[e][0], d[e][1]);
        };
        n = function() {
            return function(a, b, c, d, e, f, g, h, i) {
                var i = i || false;
                if (i) {
                    return;
                }
                if (b != a.style.left) f.css.set(a, {
                    left: b
                });
                if (c != a.style.top) f.css.set(a, {
                    top: c
                });
            };
        };
        o = function() {
            return function(a, b, c, d, e, f, g, h, i) {
                if (!f.hasTransitions()) {
                    h("coordsChanger")["default"].apply(this, arguments);
                    return;
                }
                b = parseFloat(b) + "px";
                c = parseFloat(c) + "px";
                var i = i || false;
                if (i) {
                    f.css3.transform(a, "scale3d(1,1,1)");
                    return;
                }
                if (b != a.style.left) {
                    f.css3.transitionProperty(a, "left " + d + "ms " + e);
                    f.css.set(a, {
                        left: b
                    });
                }
                if (c != a.style.top) {
                    f.css3.transitionProperty(a, "top " + d + "ms " + e);
                    f.css.set(a, {
                        top: c
                    });
                }
            };
        };
        p = function(a, b, c, d) {
            var e = d ? "translate3d" : "translate";
            var f = d ? "(0px,0px,0px)" : "(0px,0px)";
            return function(g, h, i, j, k, l, m, n, o) {
                if (!l.hasTransitions()) {
                    n("coordsChanger")["default"].apply(this, arguments);
                    return;
                }
                var o = o || false;
                if (o) {
                    c(g, h, i, l);
                    l.css3.transform(g, "scale3d(1,1,1) " + e + f);
                    return;
                }
                var h = parseFloat(h);
                var i = parseFloat(i);
                var p = parseFloat(g.style.left);
                var q = parseFloat(g.style.top);
                var r = function(a, b) {
                    if (a > b) return a - b;
                    return a < b ? (b - a) * -1 : 0;
                };
                var s = r(h, p);
                var t = r(i, q);
                var u = d ? /.*translate3d\((.*)\).*/ : /.*translate\((.*)\).*/;
                var v = u.exec(g.style[m.get("transform")]);
                if (v == null || typeof v[1] == "undefined" || v[1] == null) {
                    var w = true;
                } else {
                    var x = v[1].split(",");
                    var y = x[0].gridifierTrim();
                    var z = x[1].gridifierTrim();
                    if (y == s + "px" && z == t + "px") var w = false; else var w = true;
                }
                if (w) {
                    l.css3.transitionProperty(g, m.getForCss("transform", g) + " " + j + "ms " + k);
                    s = a(s);
                    t = b(t);
                    if (d) {
                        l.css3.perspective(g, "1000");
                        l.css3.backfaceVisibility(g, "hidden");
                    }
                    var A = d ? ",0px" : "";
                    l.css3.transformProperty(g, e, s + "px," + t + "px" + A);
                }
            };
        };
        B = function() {
            this._selectToggler = null;
        };
        c(B, {
            getCoordsChanger: function() {
                return function(a, b, c, d) {
                    var b = parseFloat(b);
                    var c = parseFloat(c);
                    if (!d.hasTransitions()) {
                        d.css.set(a, {
                            left: b + "px",
                            top: c + "px"
                        });
                        return;
                    }
                    var e = parseFloat(a.style.left);
                    var f = parseFloat(a.style.top);
                    var g = function(a, b) {
                        if (a > b) return a - b;
                        return a < b ? (b - a) * -1 : 0;
                    };
                    var h = g(b, e);
                    var i = g(c, f);
                    d.css3.transitionProperty(a, "none");
                    d.css3.perspective(a, "1000");
                    d.css3.backfaceVisibility(a, "hidden");
                    d.css3.transformProperty(a, "translate3d", h + "px," + i + "px,0px");
                };
            },
            getPointerStyler: function() {
                return function(a, b) {
                    b.css.addClass(a, "gridifier-drag-pointer");
                    a.style.backgroundColor = "red";
                };
            },
            getSelectToggler: function() {
                if (this._selectToggler != null) return this._selectToggler;
                this._selectToggler = {
                    _target: document.body,
                    _props: [ "webkitTouchCallout", "webkit", "khtml", "moz", "ms", "userSelect" ],
                    _origProps: {},
                    _hasProp: function(a) {
                        return typeof this._target["style"][a] != "undefined";
                    },
                    disableSelect: function() {
                        for (var a = 0; a < this._props.length; a++) {
                            var b = a == 0 || a == 5 ? this._props[a] : this._props[a] + "UserSelect";
                            if (this._hasProp(b)) {
                                this._origProps[b] = this._target["style"][b];
                                this._target["style"][b] = "none";
                            }
                        }
                    },
                    enableSelect: function() {
                        for (var a in this._origProps) this._target["style"][a] = this._origProps[a];
                        this._origProps = {};
                    }
                };
                return this._selectToggler;
            }
        });
        var T = function() {
            this._settings = {
                grid: "vertical",
                prepend: "mirrored",
                append: "default",
                intersections: true,
                align: "top",
                sortDispersion: false,
                "class": "grid-item",
                data: false,
                query: false,
                loadImages: false,
                dragifier: false,
                dragifierMode: "i",
                gridResize: "fit",
                gridResizeDelay: 100,
                toggleTime: 500,
                toggleTiming: "ease",
                coordsChangeTime: 300,
                coordsChangeTiming: "ease",
                rotatePerspective: "200px",
                rotateBackface: true,
                rotateAngles: [ 0, -180, 180, 0 ],
                widthPtAs: 0,
                widthPxAs: 0,
                heightPtAs: 0,
                heightPxAs: 0,
                repackSize: null,
                filter: {
                    selected: "all",
                    all: function(a) {
                        return true;
                    }
                },
                sort: {
                    selected: "default",
                    "default": function(a, b, c, d) {
                        var e = "data-gridifier-orig-sort-index";
                        return d.int(d.get(a, e)) - d.int(d.get(b, e));
                    }
                },
                toggle: {
                    selected: "scale"
                },
                drag: {
                    selected: "cloneCss",
                    cloneCss: function(a, b, c) {
                        c.copyComputedStyle(b, a);
                    }
                },
                rsort: {
                    selected: "default",
                    "default": function(a) {
                        return a;
                    }
                },
                coordsChanger: {
                    selected: "translate3dInt"
                },
                insertRange: 3e3,
                vpResizeDelay: null,
                queueSize: 12,
                queueDelay: 25,
                disableQueueOnDrags: true
            };
            var a = typeof b != "undefined" ? b : {};
            this._parse(a);
        };
        c(T, {
            _parse: function(a) {
                this._parseCoreSettings(a);
                this._adjustCoreSettings(a);
                this._parseApiSettings(a);
            },
            _parseCoreSettings: function(a) {
                if (Z.hasAnyProp(a, [ "class", "data", "query" ])) this.set([ [ "class", false ], [ "data", false ], [ "query", false ] ]);
                for (var b in a) {
                    var c = a[b];
                    var d = /^on(.*)$/;
                    if (Z.hasOwnProp(this._settings, b) && !this._isApiSetting(b)) this.set(b, c); else if (d.test(b)) Xa[b](c);
                }
            },
            _adjustCoreSettings: function(a) {
                if (this.eq("grid", "horizontal") && !Z.hasOwnProp(a, "align")) this.set("align", "left");
                if (Z.hasOwnProp(a, "align")) this.set("intersections", false);
                if (this.eq("dragifierMode", "d")) {
                    this.set("intersections", true);
                    this.set("sortDispersion", true);
                    if (!Z.hasOwnProp(a, "disableQueueOnDrags")) this.set("disableQueueOnDrags", false);
                }
            },
            _parseApiSettings: function(a) {
                for (var b in a) {
                    var c = a[b];
                    if (this._isApiSetting(b)) this._parseApiSetting(b, c);
                }
            },
            _isApiSetting: function(a) {
                for (var b in O) {
                    if (O[b] == a) return true;
                }
                return false;
            },
            _parseApiSetting: function(a, b) {
                if (typeof b == "string" || b instanceof String || a == O.FILTER && Z.isArray(b)) {
                    this._settings[a].selected = b;
                } else if (typeof b == "function") {
                    this._settings[a].userfn = b;
                    this._settings[a].selected = "userfn";
                } else if (typeof b == "object") {
                    for (var c in b) {
                        if (c == "selected") continue;
                        var d = b[c];
                        this._settings[a][c] = d;
                    }
                    if (Z.hasOwnProp(b, "selected")) this._settings[a].selected = b.selected;
                }
            },
            get: function(a) {
                this._check(a, "get");
                return this._settings[a];
            },
            set: function(a, b) {
                if (!Z.isArray(a)) {
                    this._check(a, "set");
                    this._settings[a] = b;
                    _a.emitInternal(R.SET_SETTING_FOR_NZER, a);
                    return;
                }
                for (var c = 0; c < a.length; c++) this.set(a[c][0], a[c][1]);
            },
            getApi: function(a) {
                this._check(a, "getApi");
                var b = this.get(a);
                var c = function(b) {
                    e("getApi('" + a + "') -> " + b + " fn not found");
                };
                if (a != O.FILTER) {
                    if (!Z.hasOwnProp(b, b.selected)) c(b.selected);
                    return b[b.selected];
                }
                var d = b.selected;
                if (!Z.isArray(d)) d = [ d ];
                var f = [];
                for (var g = 0; g < d.length; g++) {
                    if (!Z.hasOwnProp(b, d[g])) c(d[g]);
                    f.push(b[d[g]]);
                }
                return f;
            },
            setApi: function(a, b) {
                this._check(a, "setApi");
                this.get(a).selected = b;
                if (a == O.RSORT) _a.emitInternal(R.RSORT_CHANGE);
            },
            addApi: function(a, b, c) {
                this._check(a, "addApi");
                this.get(a)[b] = c;
            },
            eq: function(a, b) {
                this._check(a, "eq");
                return this._settings[a] == b;
            },
            notEq: function(a, b) {
                return !this.eq(a, b);
            },
            _check: function(a, b) {
                if (!Z.hasOwnProp(this._settings, a)) e("No setting '" + a + "' to " + b);
            }
        });
        var U = function() {
            this._created = false;
            this._repositionTimeout = null;
            var a = this;
            _a.onRsortChange(function() {
                a._update.call(a);
            });
            this._update();
        };
        c(U, {
            _update: function() {
                var a = this;
                var b = ab.get("rsort").selected;
                if (b != "default" && !this._created) {
                    this._created = true;
                    new i(ab);
                }
                a._change(b);
            },
            _change: function(a) {
                var b = this;
                if (a == "default") _a.onBeforeShowForRsort(null); else {
                    _a.onBeforeShowForRsort(function() {
                        clearTimeout(b._repositionTimeout);
                        b._repositionTimeout = setTimeout(function() {
                            b._reposition();
                        }, I.RESORT_REPOS_DELAY);
                    });
                }
            },
            _reposition: function() {
                if (ab.get("repackSize") == null) {
                    Lb.all();
                    return;
                }
                var a = ab.get("repackSize");
                var b = Xa.all();
                if (b.length < a) {
                    Lb.all();
                    return;
                }
                Lb.fromFirstSortedCn([ b[b.length - a] ]);
            }
        });
        i = function(a) {
            this._createBySizesRsorts(a);
        };
        c(i, {
            _createBySizesRsorts: function(a) {
                var b = this;
                var c = 1e5;
                var d = g("addApi", a);
                var e = function(a) {
                    for (var b = 0; b < a.length; b++) {
                        var c = Math.abs(a[b].x2 - a[b].x1) + 1;
                        var d = Math.abs(a[b].y2 - a[b].y1) + 1;
                        a[b].area = Math.round(c * d);
                        a[b].isLandscape = c >= d;
                    }
                };
                var f = function(a) {
                    var b = [];
                    for (var c = 0; c < a.length; c++) {
                        var d = true;
                        for (var e = 0; e < b.length; e++) {
                            if (b[e].area == a[c].area) {
                                b[e].cns.push(a[c]);
                                d = false;
                                break;
                            }
                        }
                        if (d) b.push({
                            area: a[c].area,
                            cns: [ a[c] ]
                        });
                    }
                    return b;
                };
                var h = function(a) {
                    var b = [ {
                        area: "landscape",
                        cns: []
                    }, {
                        area: "portrait",
                        cns: []
                    } ];
                    for (var c = 0; c < a.length; c++) {
                        var d = a[c].isLandscape ? 0 : 1;
                        b[d].cns.push(a[c]);
                    }
                    return b;
                };
                var i = function(a, b, c) {
                    var c = c || false;
                    if (!c) {
                        var d = f(a);
                        d.sort(function(a, b) {
                            return parseFloat(b.area) - parseFloat(a.area);
                        });
                    } else var d = h(a);
                    var e = [];
                    var g = false;
                    while (!g) {
                        var i = true;
                        for (var j = 0; j < d.length; j++) {
                            if (d[j].cns.length != 0) {
                                if (j == 0) {
                                    for (var k = 0; k < b; k++) {
                                        if (d[j].cns.length != 0) e.push(d[j].cns.shift());
                                    }
                                } else e.push(d[j].cns.shift());
                                i = false;
                            }
                        }
                        if (i) g = true;
                    }
                    return e;
                };
                var j = function(a) {
                    var b = 0;
                    for (var c = 0; c < a.length; c++) a[c].rsortPos = ++b;
                };
                var k = function(a, b) {
                    var c = [];
                    var d = [];
                    for (var e = 0; e < a.length; e++) {
                        d.push(a[e]);
                        if ((e + 1) % b == 0) {
                            c.push(d);
                            d = [];
                        }
                    }
                    if (d.length != 0) c.push(d);
                    return c;
                };
                var l = function(a, b) {
                    a.splice(0, a.length);
                    for (var c = 0; c < b.length; c++) {
                        for (var d = 0; d < b[c].length; d++) a.push(b[c][d]);
                    }
                    return a;
                };
                var m = function(a, b) {
                    return function(c) {
                        e(c);
                        j(c);
                        var d = k(c, a);
                        for (var f = 0; f < d.length; f++) d[f] = i(d[f], b);
                        return l(c, d);
                    };
                };
                d("rsort", "areaEvenly", m(c, 1));
                var n = [ 2, 3, 4, 5 ];
                var o = [];
                for (var p = 0; p < n.length; p++) o.push([ "areaEvenlyAll-" + n[p], c, n[p] ]);
                var q = [ 1, 2, 3, 4 ];
                for (var p = 5; p <= 50; p += 5) q.push(p);
                for (var p = 0; p < q.length; p++) {
                    for (var r = 1; r <= 5; r++) o.push([ "areaEvenly" + q[p] + "-" + r, q[p], r ]);
                }
                for (var p = 0; p < o.length; p++) {
                    var s = o[p];
                    d("rsort", s[0], m(s[1], s[2]));
                }
                var t = function(a) {
                    var b = a ? -1 : 1;
                    return function(a) {
                        e(a);
                        j(a);
                        var d = k(a, c);
                        for (var f = 0; f < d.length; f++) {
                            d[f].sort(function(a, c) {
                                if (a.area > c.area) return -1 * b; else if (a.area < c.area) return 1 * b; else return a.rsortPos - c.rsortPos;
                            });
                        }
                        return l(a, d);
                    };
                };
                d("rsort", "areaDesc", t(false));
                d("rsort", "areaAsc", t(true));
                d("rsort", "orientationEvenly", function(a) {
                    e(a);
                    j(a);
                    var b = k(a, c);
                    for (var d = 0; d < b.length; d++) b[d] = i(b[d], 1, true);
                    return l(a, b);
                });
            }
        });
        h = function() {
            var a = this;
            this._applyReplacers = function(a, b) {
                for (var c = 0; c < b.length; c++) a = a.replace(b[c][0], b[c][1]);
                return a;
            };
            var b = {
                byOriginalPos: function(a, b) {
                    return Z.int(Z.get(a, I.COLL.SORT_INDEX_DATA)) - Z.int(Z.get(b, I.COLL.SORT_INDEX_DATA));
                },
                byComparator: function(a, b, c) {
                    var d = c ? -1 : 1;
                    if (a > b) return 1 * d; else if (a < b) return -1 * d;
                    return 0;
                },
                byMultipleComparators: function(a, b, c) {
                    for (var d = 0; d < c.length; d++) {
                        var e = this.byComparator(c[d].forFirst, c[d].forSecond, c[d].reverseOrder);
                        if (e == 0) {
                            if (d == c.length - 1) return this.byOriginalPos(a, b);
                            continue;
                        }
                        return e;
                    }
                },
                buildComparators: function(a, b, c, d, f, g) {
                    if (typeof d == "undefined") e("No sort comp param.");
                    if (!Z.isArray(d)) var h = [ [ d, g ] ]; else {
                        var h = [];
                        for (var i = 0; i < d.length; i++) {
                            var g = false;
                            if (d[i].indexOf("|desc") !== -1) {
                                g = true;
                                d[i] = d[i].replace("|desc", "");
                            }
                            h.push([ d[i], g ]);
                        }
                    }
                    var j = [];
                    for (var i = 0; i < h.length; i++) {
                        j.push({
                            forFirst: c(a, h[i][0], f),
                            forSecond: c(b, h[i][0], f),
                            reverseOrder: h[i][1]
                        });
                    }
                    return j;
                },
                sortBy: function(a, b, c, d, e, f) {
                    return this.byMultipleComparators(a, b, this.buildComparators(a, b, c, d, f || false, e || false));
                }
            };
            var c = {
                Data: function(a, b) {
                    return Z.get(a, b);
                },
                Content: function(a) {
                    return a.innerHTML;
                },
                Query: function(a, b) {
                    return Z.find.byQuery(a, b)[0].innerHTML;
                }
            };
            var d = function(a, b, c) {
                return !b ? c(a) : c(this._applyReplacers(a, b));
            };
            var f = {
                Def: function(a) {
                    return a;
                },
                Int: function(a) {
                    return Z.int(a);
                },
                Float: function(a) {
                    return parseFloat(a);
                }
            };
            var g = function(b, c) {
                return function(e, f, g) {
                    return d.call(a, b(e, f), g, c);
                };
            };
            var h = function(a, b) {
                if (!b) {
                    return function(b, c, d, e, f) {
                        return this.sortBy(b, c, a, d, e, f);
                    };
                } else {
                    return function(b, c, d, e) {
                        return this.sortBy(b, c, a, null, d, e);
                    };
                }
            };
            var i = {};
            for (var j in c) {
                for (var k in f) {
                    var l = "by" + j + (k == "Def" ? "" : k);
                    i[l] = g(c[j], f[k]);
                    b[l] = h(i[l], j == "Content");
                }
            }
            b.comparatorFns = i;
            return b;
        };
        x = function(a) {
            this._settings = a;
            this._rotate = new y();
            this.create();
        };
        c(x, {
            create: function() {
                var a = [ "", "WithFade", "WithFadeOut" ];
                var b = [ K.FADES.NONE, K.FADES.FULL, K.FADES.ON_HIDE_MIDDLE ];
                for (var c = 0; c < a.length; c++) {
                    for (var d in K.MATRICES) {
                        var e = K.MATRICES[d];
                        this._create("rotate3d" + d + a[c], "show3d", "hide3d", e, b[c]);
                    }
                    for (var d in K.FNS) {
                        var f = K.FNS[d];
                        this._create("rotate" + d + a[c], "show", "hide", f, b[c]);
                    }
                }
            },
            _create: function(a, b, c, d, e) {
                var f = this;
                f._settings.addApi("toggle", a, {
                    show: function(a, c, g, h, i, j, k, l, m, n) {
                        k.flush(a);
                        if (!l.hasTransitions()) {
                            l.show(a);
                            j.emit(m.EVENT.SHOW, a);
                            return;
                        }
                        f._rotate.setFadeType(e);
                        f._rotate.setParams(h, i, j, k, l, m, n);
                        f._rotate[b](a, d);
                    },
                    hide: function(a, b, g, h, i, j, k, l, m, n) {
                        k.flush(a);
                        if (!l.hasTransitions()) {
                            l.hide(a);
                            j.emit(m.EVENT.HIDE, a);
                            return;
                        }
                        f._rotate.setFadeType(e);
                        f._rotate.setParams(h, i, j, k, l, m, n);
                        f._rotate[c](a, d);
                    }
                });
            }
        });
        s = function(a) {
            var a = a || false;
            var b = function(a, b) {
                return function(c, d, e, f, g) {
                    if (b) {
                        var h = g.prefix.getForCss("opacity", c);
                        f.css3.transitionProperty(c, h + " " + d + "ms " + e);
                    }
                    f.css3.opacity(c, a);
                };
            };
            if (!a) return new t(f(), f(), f(), f()); else {
                return new t(b("0", false), b("1", true), b("0", true), b("1", false));
            }
        };
        v = function(a) {
            this._create(a);
            this._createPairs(a);
            this._createCustom(a);
        };
        c(v, {
            _create: function(a) {
                var b = [ "Left", "LeftTop", "LeftBottom", "Right", "RightTop", "RightBottom", "Top", "TopLeft", "TopRight", "Bottom", "BottomLeft", "BottomRight" ];
                var c = [ [ false, false, false ], [ true, false, false ], [ false, true, false ], [ false, false, true ], [ true, false, true ], [ false, true, true ] ];
                var d = function(b, d) {
                    var e = new w();
                    var f = "toggle";
                    for (var g = 0; g <= 5; g++) {
                        var h = c[g];
                        a.addApi(f, "slide" + b[g], e.create(false, h[0], h[1], h[2], d));
                    }
                    for (var g = 0; g <= 5; g++) {
                        var h = c[g];
                        a.addApi(f, "slide" + b[g + 6], e.create(true, h[0], h[1], h[2], d));
                    }
                };
                d(b, false);
                for (var e = 0; e < b.length; e++) b[e] += "WithFade";
                d(b, true);
            },
            _createPairs: function(a) {
                var b = new w();
                var c = [ [ "LeftThenRight", "Left", "Right" ], [ "TopThenBottom", "Top", "Bottom" ], [ "LeftTopThenRightTop", "LeftTop", "RightTop" ], [ "TopLeftThenBottomLeft", "TopLeft", "BottomLeft" ], [ "LeftBottomThenRightBottom", "LeftBottom", "RightBottom" ], [ "TopRightThenBottomRight", "TopRight", "BottomRight" ] ];
                for (var d = 0; d < c.length; d++) {
                    var e = "slide";
                    var f = "WithFade";
                    a.addApi("toggle", e + c[d][0], b.createCycled([ a.get("toggle")[e + c[d][1]], a.get("toggle")[e + c[d][2]] ]));
                    a.addApi("toggle", e + c[d][0] + f, b.createCycled([ a.get("toggle")[e + c[d][1] + f], a.get("toggle")[e + c[d][2] + f] ]));
                }
            },
            _createCustom: function(a) {
                var b = new w();
                var c = "slide";
                var d = "WithFade";
                var e = [ [ "ClockwiseFromCenters", "Left", "Top", "Right", "Bottom" ], [ "ClockwiseFromSides", "Left", "Top", "Right", "Bottom" ], [ "ClockwiseFromCorners", "LeftTop", "RightTop", "RightBottom", "LeftBottom" ] ];
                for (var f = 0; f < e.length; f++) {
                    a.addApi("toggle", c + e[f][0], b.createCycled([ a.get("toggle")[c + e[f][1]], a.get("toggle")[c + e[f][2]], a.get("toggle")[c + e[f][3]], a.get("toggle")[c + e[f][4]] ]));
                    a.addApi("toggle", c + e[f][0] + d, b.createCycled([ a.get("toggle")[c + e[f][1] + d], a.get("toggle")[c + e[f][2] + d], a.get("toggle")[c + e[f][3] + d], a.get("toggle")[c + e[f][4] + d] ]));
                }
            }
        });
        var V = function() {
            ab.addApi("toggle", "scale", new s());
            ab.addApi("toggle", "scaleWithFade", new s(true));
            ab.addApi("toggle", "fade", new u());
            ab.addApi("toggle", "visibility", new r());
            var a = new v(ab);
            var b = new x(ab);
        };
        c(V, {
            hasTranslateTransform: function(a, b) {
                var c = /.*translate\((.*)\).*/;
                var d = /.*translate3d\((.*)\).*/;
                if (c.test(a.style[b.get("transform", a)]) || d.test(a.style[b.get("transform", a)])) return true;
                return false;
            },
            updateTransformOrigin: function(a, b, c, d, e, f) {
                var g = parseFloat(b);
                var h = parseFloat(c);
                var i = parseFloat(a.style.left);
                var j = parseFloat(a.style.top);
                var k = function(a, b) {
                    if (a > b) return a - b;
                    return a < b ? (b - a) * -1 : 0;
                };
                var l = k(g, i);
                var m = k(h, j);
                f.css3.transformOrigin(a, l + d / 2 + "px " + (m + e / 2) + "px");
            },
            resetTransformOrigin: function(a, b) {
                b.css3.transformOrigin(a, "50% 50%");
            }
        });
        var W = function() {
            this._syncTimeouts = {};
            this._nextSyncId = 0;
        };
        c(W, {
            markAsSynced: function(a) {
                Z.set(a, J.SYNCER_DATA, ++this._nextSyncId);
            },
            isSynced: function(a) {
                return Z.has(a, J.SYNCER_DATA);
            },
            _getSyncId: function(a) {
                if (this.isSynced(a)) return Z.get(a, J.SYNCER_DATA);
                this.markAsSynced(a);
                return Z.get(a, J.SYNCER_DATA);
            },
            add: function(a, b) {
                var c = this._getSyncId(a);
                if (!Z.hasOwnProp(this._syncTimeouts, c)) this._syncTimeouts[c] = [];
                this._syncTimeouts[c].push(b);
            },
            flush: function(a) {
                var b = this._getSyncId(a);
                if (Z.hasOwnProp(this._syncTimeouts, b)) {
                    for (var c = 0; c < this._syncTimeouts[b].length; c++) clearTimeout(this._syncTimeouts[b][c]);
                    this._syncTimeouts[b] = [];
                }
            }
        });
        u = function() {
            return {
                show: function(a, b, c, d, e, f, g, h, i) {
                    g.flush(a);
                    if (!h.hasTransitions()) {
                        h.show(a);
                        f.emit(i.EVENT.SHOW, a);
                        return;
                    }
                    if (!h.has(a, i.TOGGLE.IS_ACTIVE)) {
                        h.css3.transition(a, "none");
                        h.css3.opacity(a, "0");
                        h.set(a, i.TOGGLE.IS_ACTIVE, "y");
                    }
                    g.add(a, setTimeout(function() {
                        var b = i.prefix.getForCss("opacity", a);
                        h.show(a);
                        h.css3.transition(a, b + " " + d + "ms " + e);
                        h.css3.opacity(a, 1);
                    }, 40));
                    g.add(a, setTimeout(function() {
                        h.rm(a, i.TOGGLE.IS_ACTIVE);
                        f.emit(i.EVENT.SHOW, a);
                    }, d + 60));
                },
                hide: function(a, b, c, d, e, f, g, h, i) {
                    g.flush(a);
                    if (!h.hasTransitions()) {
                        h.hide(a);
                        f.emit(i.EVENT.HIDE, a);
                        return;
                    }
                    var j = i.prefix.getForCss("opacity", a);
                    h.css3.transition(a, j + " " + d + "ms " + e);
                    h.set(a, i.TOGGLE.IS_ACTIVE, "y");
                    h.css3.opacity(a, "0");
                    g.add(a, setTimeout(function() {
                        h.rm(a, i.TOGGLE.IS_ACTIVE);
                        h.hide(a);
                        h.css3.transition(a, "none");
                        h.css3.opacity(a, "1");
                        h.css3.transition(a, "");
                        f.emit(i.EVENT.HIDE, a);
                    }, d + 20));
                }
            };
        };
        y = function() {
            this._fadeType = null;
            this._nextRotateGUID = 0;
        };
        c(y, {
            setParams: function(a, b, c, d, e, f, g) {
                this._time = a;
                this._timing = b;
                this._ev = c;
                this._sync = d;
                this._dom = e;
                this._api = f;
                this._cn = g;
            },
            setFadeType: function(a) {
                this._fadeType = a;
            },
            show3d: function(a, b) {
                this._rotate(a, "rotate3d", b, false);
            },
            hide3d: function(a, b) {
                this._rotate(a, "rotate3d", b, true);
            },
            show: function(a, b) {
                this._rotate(a, b, "", false);
            },
            hide: function(a, b) {
                this._rotate(a, b, "", true);
            },
            _rotate: function(a, b, c, d) {
                var e = this._dom;
                var f = this._api;
                var g = this._ev;
                var h = this._cn.x1;
                var i = this._cn.y1;
                var j = !d;
                if (!e.has(a, f.ROTATE.GUID_DATA)) {
                    var k = true;
                    e.set(a, f.ROTATE.GUID_DATA, ++this._nextRotateGUID);
                    var l = this._createScene(a, h, i);
                    var m = this._createFrames(l);
                    var n = this._createClone(a);
                    e.css.addClass(l, f.ROTATE.SCENE_CLASS_PREFIX + this._nextRotateGUID);
                    e.set(a, f.TOGGLE.IS_ACTIVE, "y");
                    var o = this._createFrame(true, m, b, c, j, 2);
                    var p = this._createFrame(false, m, b, c, j, 1);
                    p.appendChild(n);
                    e.hide(a);
                } else {
                    var k = false;
                    var q = e.get(a, f.ROTATE.GUID_DATA);
                    var l = e.find.byClass(f.grid, f.ROTATE.SCENE_CLASS_PREFIX + q)[0];
                    var m = l.childNodes[0];
                    var o = m.childNodes[0];
                    var p = m.childNodes[1];
                    var n = p.childNodes[0];
                    var r = f.getS("coordsChangeTime");
                    var s = f.getS("coordsChangeTiming");
                    f.cc(l, h, i, r, s, e, f.prefix, f.getS);
                }
                var t = f.prefix.getForCss("transform", o);
                var u = f.prefix.getForCss("transform", p);
                e.css3.transitionProperty(o, t + " " + this._time + "ms " + this._timing);
                e.css3.transitionProperty(p, u + " " + this._time + "ms " + this._timing);
                this._sync.add(a, setTimeout(function() {
                    var a = f.getS("rotateAngles");
                    var d = a[j ? 2 : 0];
                    var g = a[j ? 3 : 1];
                    e.css3.transformProperty(o, b, c + d + "deg");
                    e.css3.transformProperty(p, b, c + g + "deg");
                }, 40));
                if (k) this._initFade(l, j, a); else this._syncFade(l, j);
                this._sync.add(a, setTimeout(function() {
                    l.parentNode.removeChild(l);
                    e.rm(a, f.TOGGLE.IS_ACTIVE);
                    e.rm(a, f.ROTATE.GUID_DATA);
                    if (j) {
                        e.show(a);
                        g.emit(f.EVENT.SHOW, a);
                    } else {
                        e.hide(a);
                        g.emit(f.EVENT.HIDE, a);
                    }
                }, this._time + 40));
            },
            _createScene: function(a, b, c) {
                var d = this._api;
                var e = this._dom;
                var f = e.div();
                var g = d.sr.getUncomputedCSS(a);
                e.css.set(f, {
                    position: "absolute",
                    left: b,
                    top: c,
                    width: d.srManager.outerWidth(a) + "px",
                    height: d.srManager.outerHeight(a) + "px"
                });
                e.css.set4(f, "margin", g);
                e.css3.perspective(f, d.getS("rotatePerspective"));
                d.grid.appendChild(f);
                var h = d.getS("coordsChangeTime");
                var i = d.getS("coordsChangeTiming");
                d.cc(f, b, c, h, i, e, d.prefix, d.getS, true);
                d.cc(f, b, c, h, i, e, d.prefix, d.getS);
                return f;
            },
            _createFrames: function(a) {
                var b = this._dom;
                var c = b.div();
                b.css.set(c, {
                    width: "100%",
                    height: "100%",
                    position: "absolute"
                });
                b.css3.transformStyle(c, "preserve-3d");
                b.css3.perspective(c, this._api.getS("rotatePerspective"));
                a.appendChild(c);
                return c;
            },
            _createClone: function(a) {
                var b = this._dom;
                var c = this._api;
                var d = a.cloneNode(true);
                c.collect.markAsNotCollectable(d);
                var e = c.sr.getUncomputedCSS(a);
                var f = b.int(e.height);
                b.css.set(d, {
                    left: "0px",
                    top: "0px",
                    visibility: "visible",
                    width: c.srManager.outerWidth(a) + "px",
                    height: c.srManager.outerHeight(a) + "px"
                });
                b.css.set4(d, "margin", 0);
                b.css3.transition(d, "");
                b.css3.transform(d, "");
                if (f == 0) b.css.set4(d, "padding", 0);
                return d;
            },
            _createFrame: function(a, b, c, d, e, f) {
                var g = this._dom;
                var h = this._api;
                var i = g.div();
                g.css.set(i, {
                    display: "block",
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    zIndex: f
                });
                if (!h.getS("rotateBackface")) g.css3.backfaceVisibility(i, "hidden");
                b.appendChild(i);
                var j = h.prefix.getForCss("transform", i);
                g.css3.transitionProperty(i, j + " 0ms " + this._timing);
                var k = h.getS("rotateAngles");
                if (a) var l = e ? 0 : 2;
                if (!a) var l = e ? 1 : 3;
                g.css3.transformProperty(i, c, d + k[l] + "deg");
                return i;
            },
            _initFade: function(a, b, c) {
                var d = this._dom;
                var e = this._api;
                var f = this._time;
                var g = this._timing;
                var h = e.prefix.getForCss("opacity", a);
                var i = function() {
                    d.css3.transition(a, "none");
                    d.css3.opacity(a, b ? 0 : 1);
                    return b ? 1 : 0;
                };
                if (this._fadeType == e.ROTATE.FADES.NONE) return; else if (this._fadeType == e.ROTATE.FADES.FULL) {
                    var j = i();
                    this._sync.add(c, setTimeout(function() {
                        d.css3.transition(a, h + " " + f + "ms " + g);
                        d.css3.opacity(a, j);
                    }, 40));
                } else {
                    d.css3.transition(a, h + " " + f / 2 + "ms " + g);
                    if (b) return;
                    this._sync.add(c, setTimeout(function() {
                        d.css3.opacity(a, 0);
                    }, f / 2));
                }
            },
            _syncFade: function(a, b) {
                if (this._fadeType == this._api.ROTATE.FADES.NONE) return; else this._dom.css3.opacity(a, b ? 1 : 0);
            }
        });
        t = function(a, b, c, d) {
            return {
                show: function(c, d, e, f, g, h, i, j, k, l) {
                    i.flush(c);
                    if (!j.hasTransitions()) {
                        j.show(c);
                        h.emit(k.EVENT.SHOW, c);
                        return;
                    }
                    if (k.toggle.hasTranslateTransform(c, k.prefix)) {
                        var m = k.srManager;
                        k.toggle.updateTransformOrigin(c, l.x1, l.y1, m.outerWidth(c, true), m.outerHeight(c, true), j);
                    }
                    if (!j.has(c, k.TOGGLE.IS_ACTIVE)) {
                        j.css3.transition(c, "none");
                        a(c, f, g, j, k);
                        j.css3.transformProperty(c, "scale3d", "0,0,0");
                        j.set(c, k.TOGGLE.IS_ACTIVE, "y");
                    }
                    i.add(c, setTimeout(function() {
                        var a = k.prefix.getForCss("transform", c);
                        j.show(c);
                        j.css3.transition(c, a + " " + f + "ms " + g);
                        j.css3.transformProperty(c, "scale3d", "1,1,1");
                        b(c, f, g, j, k);
                    }, 40));
                    i.add(c, setTimeout(function() {
                        k.toggle.resetTransformOrigin(c, j);
                        j.rm(c, k.TOGGLE.IS_ACTIVE);
                        h.emit(k.EVENT.SHOW, c);
                    }, f + 60));
                },
                hide: function(a, b, e, f, g, h, i, j, k, l) {
                    i.flush(a);
                    if (!j.hasTransitions()) {
                        j.hide(a);
                        h.emit(k.EVENT.HIDE, a);
                        return;
                    }
                    if (k.toggle.hasTranslateTransform(a, k.prefix)) {
                        var m = k.srManager;
                        k.toggle.updateTransformOrigin(a, l.x1, l.y1, m.outerWidth(a, true), m.outerHeight(a, true), j);
                    }
                    var n = k.prefix.getForCss("transform", a);
                    j.css3.transition(a, n + " " + f + "ms " + g);
                    j.set(a, k.TOGGLE.IS_ACTIVE, "y");
                    j.css3.transformProperty(a, "scale3d", "0,0,0");
                    c(a, f, g, j, k);
                    var o = f > 200 ? f - 100 : f - 50;
                    if (o < 0) o = 0;
                    i.add(a, setTimeout(function() {
                        j.hide(a);
                    }, o));
                    i.add(a, setTimeout(function() {
                        j.hide(a);
                        j.css3.transition(a, "none");
                        j.css3.transformProperty(a, "scale3d", "1,1,1");
                        d(a, f, g, j, k);
                        j.css3.transition(a, "");
                        k.toggle.resetTransformOrigin(a, j);
                        j.rm(a, k.TOGGLE.IS_ACTIVE);
                        h.emit(k.EVENT.HIDE, a);
                    }, f + 20));
                }
            };
        };
        w = function() {};
        c(w, {
            create: function(a, b, c, d, e) {
                var f = this;
                var e = e || false;
                var a = a || false;
                if (!a) {
                    var g = "Width";
                    var h = "Height";
                    var i = "top";
                } else {
                    var g = "Height";
                    var h = "Width";
                    var i = "left";
                }
                var b = b || false;
                var c = c || false;
                var j = !d;
                var k = d;
                var l = function(a, b) {
                    if (j) return b.srManager["outer" + g](a, true) * -1; else if (k) {
                        var c = b.srManager["outer" + g](b.grid);
                        var d = b.srManager["outer" + g](a, true);
                        return c + d;
                    }
                };
                var m = function(a, d) {
                    if (b) return 0; else if (c) {
                        var e = d.srManager["outer" + h](d.grid);
                        var f = d.srManager["outer" + h](a, true);
                        return e + f;
                    } else return a.style[i];
                };
                var n = function(b, c) {
                    var d = {};
                    d.x = l(b, c) + "px";
                    d.y = m(b, c) + "px";
                    if (a) {
                        var e = d.y;
                        d.y = d.x;
                        d.x = e;
                    }
                    return d;
                };
                return {
                    show: function(a, b, c, d, f, g, h, i, j, k) {
                        h.flush(a);
                        if (!i.hasTransitions()) {
                            i.show(a);
                            g.emit(j.EVENT.SHOW, a);
                            return;
                        }
                        var l = n(a, j);
                        h.add(a, setTimeout(function() {
                            i.set(a, j.TOGGLE.IS_ACTIVE_WITH_CC, "y");
                            if (!i.has(a, j.TOGGLE.IS_ACTIVE)) {
                                if (e) {
                                    i.css3.transition(a, "none");
                                    i.css3.opacity(a, 0);
                                    i.css3.transition(a, "");
                                }
                                j.cc(a, l.x, l.y, 0, f, i, j.prefix, j.getS);
                                i.set(a, j.TOGGLE.IS_ACTIVE, "y");
                            }
                        }, 0));
                        h.add(a, setTimeout(function() {
                            i.show(a);
                            if (e) {
                                var b = j.prefix.getForCss("opacity", a);
                                i.css3.transitionProperty(a, b + " " + d + "ms " + f);
                                i.css3.opacity(a, 1);
                            }
                            j.cc(a, k.x1, k.y1, d, f, i, j.prefix, j.getS);
                        }, 40));
                        h.add(a, setTimeout(function() {
                            i.rm(a, j.TOGGLE.IS_ACTIVE_WITH_CC);
                            i.rm(a, j.TOGGLE.IS_ACTIVE);
                            g.emit(j.EVENT.SHOW, a);
                        }, d + 60));
                    },
                    hide: function(a, b, c, d, f, g, h, i, j, k) {
                        h.flush(a);
                        if (!i.hasTransitions()) {
                            i.hide(a);
                            g.emit(j.EVENT.HIDE, a);
                            return;
                        }
                        var l = n(a, j);
                        i.set(a, j.TOGGLE.IS_ACTIVE, "y");
                        i.set(a, j.TOGGLE.IS_ACTIVE_WITH_CC, "y");
                        if (e) {
                            var m = j.prefix.getForCss("opacity", a);
                            i.css3.transition(a, m + " " + d + "ms " + f);
                            i.css3.opacity(a, 0);
                        }
                        j.cc(a, l.x, l.y, d, f, i, j.prefix, j.getS);
                        h.add(a, setTimeout(function() {
                            i.hide(a);
                        }, d));
                        h.add(a, setTimeout(function() {
                            if (e) {
                                var b = j.prefix.getForCss("opacity", a);
                                i.css3.transitionProperty(a, b + " 0ms " + f);
                                i.css3.opacity(a, 1);
                            }
                            i.rm(a, j.TOGGLE.IS_ACTIVE_WITH_CC);
                            i.hide(a);
                            i.rm(a, j.TOGGLE.IS_ACTIVE);
                            g.emit(j.EVENT.HIDE, a);
                        }, d + 20));
                    }
                };
            },
            createCycled: function(a) {
                var b = 1;
                return {
                    show: function() {
                        b++;
                        var c = b % a.length;
                        var d = a[c];
                        d.show.apply(this, arguments);
                    },
                    hide: function() {
                        b++;
                        var c = b % a.length;
                        var d = a[c];
                        d.hide.apply(this, arguments);
                    }
                };
            }
        });
        r = function() {
            return {
                show: function(a, b, c, d, e, f, g, h, i) {
                    g.flush(a);
                    h.show(a);
                    f.emit(i.EVENT.SHOW, a);
                },
                hide: function(a, b, c, d, e, f, g, h, i) {
                    g.flush(a);
                    h.hide(a);
                    f.emit(i.EVENT.HIDE, a);
                }
            };
        };
        var X = function() {
            var a = "gridifierEvents";
            var b = "gridifierHandle";
            var c = function() {
                var a = new Date().getTime();
                return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function(b) {
                    var c = (a + Math.random() * 16) % 16 | 0;
                    a = Math.floor(a / 16);
                    return (b == "x" ? c : c & 3 | 8).toString(16);
                });
            };
            function d(a) {
                a = a || window.event;
                if (a.isFixed) {
                    return a;
                }
                a.isFixed = true;
                a.preventDefault = a.preventDefault || function() {
                    this.returnValue = false;
                };
                a.stopPropagation = a.stopPropagation || function() {
                    this.cancelBubble = true;
                };
                if (!a.target) {
                    a.target = a.srcElement;
                }
                if (!a.relatedTarget && a.fromElement) {
                    a.relatedTarget = a.fromElement == a.target ? a.toElement : a.fromElement;
                }
                if (a.pageX == null && a.clientX != null) {
                    var b = document.documentElement, c = document.body;
                    a.pageX = a.clientX + (b && b.scrollLeft || c && c.scrollLeft || 0) - (b.clientLeft || 0);
                    a.pageY = a.clientY + (b && b.scrollTop || c && c.scrollTop || 0) - (b.clientTop || 0);
                }
                if (!a.which && a.button) {
                    a.which = a.button & 1 ? 1 : a.button & 2 ? 3 : a.button & 4 ? 2 : 0;
                }
                return a;
            }
            function e(b) {
                b = d(b);
                var c = this[a][b.type];
                for (var e in c) {
                    var f = c[e].call(this, b);
                    if (f === false) {
                        b.preventDefault();
                        b.stopPropagation();
                    } else if (f !== undefined) {
                        b.result = f;
                    }
                    if (b.stopNow) break;
                }
            }
            return {
                add: function(d, f, g) {
                    if (d.setInterval && (d != window && !d.frameElement)) {
                        d = window;
                    }
                    if (!g.guid) g.guid = c();
                    if (!d[a]) {
                        d[a] = {};
                        d[b] = function(a) {
                            if (typeof X !== "undefined") {
                                return e.call(d, a);
                            }
                        };
                    }
                    if (!d[a][f]) {
                        d[a][f] = {};
                        if (d.addEventListener) d.addEventListener(f, d[b], false); else if (d.attachEvent) d.attachEvent("on" + f, d[b]);
                    }
                    d[a][f][g.guid] = g;
                },
                rm: function(c, d, e) {
                    var f = c[a] && c[a][d];
                    if (!f) return;
                    if (!e) {
                        for (var g in f) {
                            delete c[a][d][g];
                        }
                        return;
                    } else {
                        delete f[e.guid];
                        for (var h in f) return;
                    }
                    if (c.removeEventListener) c.removeEventListener(d, c[b], false); else if (c.detachEvent) c.detachEvent("on" + d, c[b]);
                    delete c[a][d];
                    for (var h in c[a]) return;
                    try {
                        delete c[b];
                        delete c[a];
                    } catch (i) {
                        c.removeAttribute(b);
                        c.removeAttribute(a);
                    }
                }
            };
        }();
        var Y = {
            _prefixes: [ "Moz", "Webkit", "ms", "Ms", "Khtml", "O" ],
            _getter: function(a, b, c) {
                b = b || document.documentElement;
                var d = b.style;
                if (typeof d[a] === "string") return a;
                var e = a;
                var a = a.charAt(0).toUpperCase() + a.slice(1);
                for (var f = 0; f < this._prefixes.length; f++) {
                    var g = this._prefixes[f] + a;
                    if (typeof d[g] === "string") return c(g, e, f);
                }
            },
            get: function(a, b) {
                return this._getter(a, b, function(a) {
                    return a;
                });
            },
            getForCss: function(a, b) {
                var c = this;
                return this._getter(a, b, function(a, b, d) {
                    return "-" + c._prefixes[d].toLowerCase() + "-" + b;
                });
            }
        };
        var Z = {
            init: function() {
                this._createTrimFunction();
                this._createHasOwnPropFn();
                this._checkIfHasTransitions(Z.div());
                this.browsers.init();
                this.css3.init();
            },
            _createTrimFunction: function() {
                if (typeof String.prototype.gridifierTrim !== "function") {
                    String.prototype.gridifierTrim = function() {
                        return this.replace(/^\s+|\s+$/g, "");
                    };
                }
            },
            _createHasOwnPropFn: function() {
                var a = Z.div();
                var b = document.body || document.documentElement;
                b.appendChild(a);
                if (Object.prototype.hasOwnProperty.call(a, "innerHTML")) {
                    this._hasOwnPropFn = function(a, b) {
                        return Object.prototype.hasOwnProperty.call(a, b);
                    };
                } else {
                    this._hasOwnPropFn = function(a, b) {
                        for (var c in a) {
                            if (c == b) return true;
                        }
                        return false;
                    };
                }
                b.removeChild(a);
            },
            _checkIfHasTransitions: function(a) {
                var b = [ "WebkitTransition", "MozTransition", "OTransition", "msTransition", "MsTransition", "transition" ];
                this._hasTransitions = false;
                for (var c = 0; c < b.length; c++) {
                    if (a.style[b[c]] !== undefined) this._hasTransitions = true;
                }
            },
            get: function(a, b) {
                return a.getAttribute(b);
            },
            set: function(a, b, c) {
                if (this.isArray(b)) {
                    for (var d = 0; d < b.length; d++) a.setAttribute(b[d][0], b[d][1]);
                    return;
                }
                a.setAttribute(b, c);
            },
            rm: function(a, b) {
                a.removeAttribute(b);
            },
            rmIfHas: function(a, b) {
                if (this.isArray(b)) {
                    for (var c in b) {
                        if (this.has(a, b[c])) this.rm(a, b[c]);
                    }
                    return;
                }
                if (this.has(a, b)) this.rm(a, b);
            },
            has: function(a, b) {
                if (a.getAttribute(b) === null || a.getAttribute(b) === "") return false;
                return true;
            },
            "int": function(a) {
                return parseInt(a, 10);
            },
            isJquery: function(a) {
                if (typeof jQuery == "undefined") return false;
                return a && a instanceof jQuery;
            },
            isNative: function(a) {
                if (typeof a != "undefined" && typeof a.tagName != "undefined" && typeof a.nodeName != "undefined" && typeof a.ownerDocument != "undefined" && typeof a.removeAttribute != "undefined") return true; else return false;
            },
            isArray: function(a) {
                return Object.prototype.toString.call(a) == "[object Array]";
            },
            isObj: function(a) {
                return typeof a == "object" && a !== null;
            },
            isChildOf: function(a, b) {
                if (a == b) return false;
                var c = a.parentNode;
                while (c != undefined) {
                    if (c == b) return true;
                    if (c == document.body) break;
                    c = c.parentNode;
                }
                return false;
            },
            hasTransitions: function() {
                return this._hasTransitions;
            },
            hasVal: function(a, b) {
                for (var c in a) {
                    if (a[c] == b) return true;
                }
                return false;
            },
            hasOwnProp: function(a, b) {
                return this._hasOwnPropFn(a, b);
            },
            hasAnyProp: function(a, b) {
                for (var c = 0; c < b.length; c++) {
                    if (this._hasOwnPropFn(a, b[c])) return true;
                }
                return false;
            },
            toFixed: function(a, b) {
                return parseFloat(+(Math.round(+(a.toString() + "e" + b)).toString() + "e" + -b));
            },
            areRoundedOrFlooredEq: function(a, b) {
                return Math.round(a) == Math.round(b) || Math.floor(a) == Math.floor(b);
            },
            areRoundedOrCeiledEq: function(a, b) {
                return Math.round(a) == Math.round(b) || Math.ceil(a) == Math.ceil(b);
            },
            filter: function(a, b, c) {
                var c = c || window;
                var d = [];
                for (var e = 0; e < a.length; e++) {
                    if (b.call(c, a[e])) d.push(a[e]);
                }
                return d;
            },
            show: function(a) {
                a.style.visibility = "visible";
            },
            hide: function(a) {
                a.style.visibility = "hidden";
            },
            div: function() {
                return document.createElement("div");
            },
            browsers: {
                _navigator: null,
                init: function() {
                    this._navigator = typeof navigator != "undefined" ? navigator.userAgent : "";
                },
                isAndroid: function() {
                    return /android/i.test(this._navigator);
                },
                isAndroidFirefox: function() {
                    if (!this.isAndroid()) return false;
                    return /firefox|iceweasel/i.test(this._navigator);
                },
                isAndroidUC: function() {
                    if (!this.isAndroid()) return false;
                    return /UCBrowser/i.test(this._navigator);
                }
            },
            css: {
                set: function(a, b) {
                    if (!Z.isNative(a)) e("Error: not DOM.");
                    for (var c in b) a.style[c] = b[c];
                },
                set4: function(a, b, c) {
                    var d = [ "Left", "Right", "Top", "Bottom" ];
                    for (var e = 0; e < d.length; e++) a.style[b + d[e]] = Z.isObj(c) ? c[b + d[e]] : c;
                },
                hasClass: function(a, b) {
                    var c = a.getAttribute("class");
                    if (c == null || c.length == 0) return false;
                    c = c.split(" ");
                    for (var d = 0; d < c.length; d++) {
                        c[d] = c[d].gridifierTrim();
                        if (c[d] == b) return true;
                    }
                    return false;
                },
                addClass: function(a, b) {
                    var c = a.getAttribute("class");
                    if (c == null || c.length == 0) var d = b; else var d = c + " " + b;
                    Z.set(a, "class", d);
                },
                removeClass: function(a, b) {
                    var c = a.getAttribute("class").split(" ");
                    var d = "";
                    for (var e = 0; e < c.length; e++) {
                        if (c[e].gridifierTrim() != b) d += c[e] + " ";
                    }
                    d = d.substring(0, d.length - 1);
                    Z.set(a, "class", d);
                }
            },
            css3: {
                _opacityProps: [ "opacity" ],
                _perspectiveProps: [ "perspective" ],
                _transformStyleProps: [ "transformStyle" ],
                _backfaceVisibilityProps: [ "backfaceVisibility" ],
                _transformOriginProps: [ "transformOrigin" ],
                init: function() {
                    var a = [ [ "Webkit", "Moz" ], [ "webkit", "moz", "o", "ms" ] ];
                    for (var b = 0; b < a[0].length; b++) {
                        var c = a[0][b];
                        this._opacityProps.push(c + "Opacity");
                        this._perspectiveProps.push(c + "Perspective");
                        this._transformStyleProps.push(c + "TransformStyle");
                        this._backfaceVisibilityProps.push(c + "BackfaceVisibility");
                    }
                    for (var b = 0; b < a[1].length; b++) {
                        this._transformOriginProps.push(a[1][b] + "TransformOrigin");
                    }
                },
                transition: function(a, b) {
                    a.style[Y.get("transition", a)] = b;
                },
                transitionProperty: function(a, b) {
                    var c = a.style[Y.get("transition", a)];
                    if (c.length == 0) {
                        a.style[Y.get("transition", a)] = b;
                        return;
                    }
                    var d = function(a) {
                        return a.replace(/cubic-bezier\([^\)]+/g, function(a) {
                            return a.replace(/,/g, ";");
                        });
                    };
                    var e = function(a) {
                        return a.replace(/cubic-bezier\([^\)]+/g, function(a) {
                            return a.replace(/;/g, ",");
                        });
                    };
                    var f = d(b);
                    c = d(c);
                    var g = c.split(",");
                    for (var h = 0; h < g.length; h++) {
                        var i = g[h].gridifierTrim();
                        if (i.length == 0) continue;
                        var j = i.split(" ");
                        var k = j[0];
                        if (f.search(k) === -1) f += ", " + i;
                    }
                    a.style[Y.get("transition", a)] = e(f).gridifierTrim();
                },
                transform: function(a, b) {
                    a.style[Y.get("transform", a)] = b;
                },
                transformProperty: function(a, b, c) {
                    var d = a.style[Y.get("transform", a)];
                    if (d.length == 0) {
                        a.style[Y.get("transform", a)] = b + "(" + c + ")";
                        return;
                    }
                    var e = "";
                    var f = d.split(/\)/);
                    var g = false;
                    for (var h = 0; h < f.length; h++) {
                        var i = f[h].gridifierTrim();
                        if (i.length == 0) continue;
                        if (i.search(b) !== -1) {
                            e += " " + b + "(" + c + ")";
                            g = true;
                        } else e += " " + i + ")";
                    }
                    if (!g) e += " " + b + "(" + c + ")";
                    a.style[Y.get("transform", a)] = e.gridifierTrim();
                },
                style: function(a, b, c) {
                    for (var d = 0; d < b.length; d++) a.style[b[d]] = c;
                },
                opacity: function(a, b) {
                    this.style(a, this._opacityProps, b);
                },
                perspective: function(a, b) {
                    this.style(a, this._perspectiveProps, b);
                },
                transformStyle: function(a, b) {
                    this.style(a, this._transformStyleProps, b);
                },
                backfaceVisibility: function(a, b) {
                    this.style(a, this._backfaceVisibilityProps, b);
                },
                transformOrigin: function(a, b) {
                    for (var c = 0; c < this._transformOriginProps.length; c++) {
                        if (typeof a.style[this._transformOriginProps[c]] != "undefined") a.style[this._transformOriginProps[c]] = b;
                    }
                }
            },
            find: {
                byId: function(a) {
                    return document.getElementById(a);
                },
                byClass: function(a, b) {
                    return a.querySelectorAll("." + b);
                },
                byQuery: function(a, b) {
                    var c = b.gridifierTrim()[0];
                    if (c == ">") {
                        var d = b.substr(2, b.length - 1);
                        var e = a.querySelectorAll(d);
                        var f = [];
                        for (var g = 0; g < e.length; g++) {
                            if (e[g].parentNode == a) f.push(e[g]);
                        }
                        return f;
                    }
                    return a.querySelectorAll(b);
                }
            },
            remove: {
                byQuery: function(a, b) {
                    var c = Z.find.byQuery(a, b);
                    for (var d = 0; d < c.length; d++) {
                        var e = c[d];
                        e.parentNode.removeChild(e);
                    }
                }
            }
        };
        var $ = {
            getComputedCSS: null,
            _getProps: {
                forOw: [ "paddingLeft", "paddingRight", "marginLeft", "marginRight", "borderLeftWidth", "borderRightWidth" ],
                forOh: [ "paddingTop", "paddingBottom", "marginTop", "marginBottom", "borderTopWidth", "borderBottomWidth" ],
                forPosLeft: [ "marginLeft" ],
                forPosTop: [ "marginTop" ]
            },
            _prefixedProps: {
                boxSizing: null
            },
            _borderBoxType: null,
            _borderBoxTypes: {
                OUTER: 0,
                INNER: 1
            },
            _ptValsCalcType: null,
            _ptValsCalcTypes: {
                BROWSER: 0,
                RECALC: 1
            },
            recalcPtWidthFn: function(a, b, c, d) {
                return this.outerWidth(a, b, c, d);
            },
            recalcPtHeightFn: function(a, b, c, d) {
                return this.outerHeight(a, b, c, d);
            },
            _lastRawWidth: null,
            _lastRawHeight: null,
            _lastBorderWidth: null,
            _lastBorderHeight: null,
            _hasLastBorderBox: false,
            init: function() {
                this.getComputedCSS = this._getComputedCSSFn();
                this._findPrefixedProps();
                this._findBorderBoxType(Z.div());
                this._findPtValsCalcType(Z.div(), Z.div());
            },
            clearRecursiveSubcallsData: function() {
                this._lastRawWidth = null;
                this._lastRawHeight = null;
                this._lastBorderWidth = null;
                this._lastBorderHeight = null;
                this._hasLastBorderBox = false;
            },
            _areBrowserPtVals: function() {
                return this._ptValsCalcType == this._ptValsCalcTypes.BROWSER;
            },
            _areRecalcPtVals: function() {
                return this._ptValsCalcType == this._ptValsCalcTypes.RECALC;
            },
            getUncomputedCSS: function(a) {
                var b = a.parentNode.cloneNode();
                var c = a.cloneNode();
                b.appendChild(c);
                b.style.display = "none";
                var d = a.parentNode.nodeName == "HTML" ? a.parentNode : a.parentNode.parentNode;
                d.appendChild(b);
                var e = this.getComputedCSS(c);
                var f = {};
                var g = [ "paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "width", "height" ];
                for (var h = 0; h < g.length; h++) f[g[h]] = e[g[h]];
                d.removeChild(b);
                return f;
            },
            _ensureHasParentNode: function(a) {
                if (a.parentNode == null || !Z.hasOwnProp(a.parentNode, "innerHTML")) e("no parentNode");
            },
            _ensureHasComputedProp: function(a, b) {
                if (!(b in a)) e("no prop " + b);
            },
            _hasPtCSSVal: function(a, b, c) {
                var d = function(a, b, c) {
                    this._ensureHasParentNode(b);
                    c = c || this.getUncomputedCSS(b);
                    this._ensureHasComputedProp(c, a);
                    var d = new RegExp("(.*\\d)%$");
                    return d.test(c[a]);
                };
                if (Z.isArray(a)) {
                    for (var e = 0; e < a.length; e++) {
                        if (d.call(this, a[e], b, c)) return true;
                    }
                    return false;
                } else return d.call(this, a, b, c);
            },
            _getPtCSSVal: function(a, b, c) {
                this._ensureHasParentNode(b);
                c = c || this.getUncomputedCSS(b);
                this._ensureHasComputedProp(c, a);
                return c[a];
            },
            _recalcPtVal: function(a, b, c, d) {
                var e = parseFloat(this._getPtCSSVal(d, a, c));
                return b / 100 * e;
            },
            _recalcTwoSidePropPtVals: function(a, b, c, d, e, f) {
                var g = e + (f ? "Top" : "Left");
                var h = e + (f ? "Bottom" : "Right");
                var i = c[g];
                var j = c[h];
                if (this._hasPtCSSVal(g, a, d)) i = this._recalcPtVal(a, b, d, g);
                if (this._hasPtCSSVal(h, a, d)) j = this._recalcPtVal(a, b, d, h);
                return i + j;
            },
            _isDefBoxSizing: function(a) {
                var b = this._prefixedProps.boxSizing;
                if (b && a[b] && a[b] === "border-box") return true;
                return false;
            },
            _isOuterBoxSizing: function() {
                return this._borderBoxType === this._borderBoxTypes.OUTER;
            },
            _isCascadedCSSVal: function(a) {
                return window.getComputedStyle || a.indexOf("px") !== -1 ? false : true;
            },
            _cascadedToComputed: function(a, b, c) {
                var d = new RegExp("(?=.*\\d)");
                if (!d.test(b)) return b;
                var e = a.style;
                var f = a.runtimeStyle;
                var g = e.left;
                var h = f && f.left;
                if (h) f.left = c.left;
                e.left = b;
                b = e.pixelLeft;
                e.left = g;
                if (h) f.left = h;
                return b;
            },
            _normalizeComputedCSS: function(a) {
                var b = parseFloat(a);
                var c = a.indexOf("%") === -1 && !isNaN(b);
                return c ? b : false;
            },
            _getComputedProps: function(a, b, c) {
                var d = {};
                for (var e = 0; e < this._getProps[a].length; e++) {
                    var f = this._getProps[a][e];
                    var g = b[f];
                    if (this._isCascadedCSSVal(g)) g = this._cascadedToComputed(c, g, b);
                    g = parseFloat(g);
                    g = isNaN(g) ? 0 : g;
                    d[f] = g;
                }
                return d;
            },
            positionLeft: function(a) {
                var b = this.getComputedCSS(a);
                if (b.display == "none") return 0;
                var c = this._getComputedProps("forPosLeft", b, a);
                return a.offsetLeft - c.marginLeft;
            },
            positionTop: function(a) {
                var b = this.getComputedCSS(a);
                if (b.display == "none") return 0;
                var c = this._getComputedProps("forPosTop", b, a);
                return a.offsetTop - c.marginTop;
            },
            offsetLeft: function(a) {
                var b = a.getBoundingClientRect();
                var c = window.pageXOffset || document.documentElement.scrollLeft;
                return b.left + c;
            },
            offsetTop: function(a) {
                var b = a.getBoundingClientRect();
                var c = window.pageYOffset || document.documentElement.scrollTop;
                return b.top + c;
            },
            cloneComputedStyle: function(a, b) {
                var c = function(a) {
                    return a.replace(/-+(.)?/g, function(a, b) {
                        return b ? b.toUpperCase() : "";
                    });
                };
                var d = this.getComputedCSS(a);
                for (var e in d) {
                    if (e == "cssText") continue;
                    var f = c(e);
                    if (b.style[f] != d[f]) b.style[f] = d[f];
                }
                this._reclone(d, b);
            },
            _reclone: function(a, b) {
                var c = [ "font", "fontSize", "fontWeight", "lineHeight" ];
                var d = [ "Width", "Color", "Style" ];
                var e = [ "Left", "Right", "Top", "Bottom" ];
                for (var f = 0; f < d.length; f++) {
                    for (var g = 0; g < e.length; g++) c.push("border" + e[g] + d[f]);
                }
                for (var f = 0; f < c.length; f++) {
                    var h = c[f];
                    if (typeof a[h] != "undefined" && b.style[h] != a[h]) b.style[h] = a[h];
                }
            }
        };
        $._getComputedCSSFn = function() {
            if (window.getComputedStyle) {
                return function(a) {
                    return window.getComputedStyle(a, null);
                };
            } else {
                return function(a) {
                    return a.currentStyle;
                };
            }
        };
        $._findPrefixedProps = function() {
            this._prefixedProps.boxSizing = Y.get("boxSizing");
        };
        $._findBorderBoxType = function(a) {
            Z.css.set(a, {
                width: "100px",
                padding: "10px 20px",
                borderWidth: "10px 20px",
                borderStyle: "solid"
            });
            var b = this._prefixedProps.boxSizing;
            a.style[b] = "border-box";
            var c = document.body || document.documentElement;
            c.appendChild(a);
            var d = this.getComputedCSS(a);
            if (this._normalizeComputedCSS(d.width) === 100) this._borderBoxType = this._borderBoxTypes.OUTER; else this._borderBoxType = this._borderBoxTypes.INNER;
            c.removeChild(a);
        };
        $._findPtValsCalcType = function(a, b, c) {
            Z.css.set(a, {
                width: "1178px",
                height: "300px",
                position: "absolute",
                left: "-9000px",
                top: "0px",
                visibility: "hidden"
            });
            var d = document.body || document.documentElement;
            d.appendChild(a);
            Z.css.set(b, {
                width: "10%",
                height: "200px"
            });
            a.appendChild(b);
            var e = 117.796875.toFixed(1);
            var f = parseFloat(this.outerWidth(b, true, true)).toFixed(1);
            this._ptValsCalcType = e == f ? this._ptValsCalcTypes.BROWSER : this._ptValsCalcTypes.RECALC;
            d.removeChild(a);
        };
        $.outerWidth = function(a, b, c, d) {
            var b = b || false;
            var c = c || false;
            var d = d || false;
            var e = this.getComputedCSS(a);
            if (c || this._areBrowserPtVals()) var f = false; else if (this._areRecalcPtVals()) {
                this._ensureHasParentNode(a);
                var f = this._hasPtCSSVal("width", a);
            }
            if (e.display === "none") return 0;
            var g = this._getComputedProps("forOw", e, a);
            var h = g.paddingLeft + g.paddingRight;
            var i = g.marginLeft + g.marginRight;
            var j = g.borderLeftWidth + g.borderRightWidth;
            var k = 0;
            var l = this._normalizeComputedCSS(e.width);
            if (l !== false) k = l;
            var m = null;
            var n = null;
            if (f) {
                m = this.getUncomputedCSS(a);
                n = this.recalcPtWidthFn.call(this, a.parentNode, false, a.parentNode.nodeName == "HTML", true);
                if (this._hasLastBorderBox && this._hasPtCSSVal("width", a, m)) n -= this._lastBorderWidth;
            }
            if (f && this._hasPtCSSVal([ "paddingLeft", "paddingRight" ], a, m)) {
                h = this._recalcTwoSidePropPtVals(a, n, g, m, "padding");
            }
            if (f && this._hasPtCSSVal("width", a, m)) k = this._recalcPtVal(a, n, m, "width");
            if (!this._isDefBoxSizing(e) || this._isDefBoxSizing(e) && !this._isOuterBoxSizing()) {
                this._lastRawWidth = k;
                k += h;
                if (!d) k += j;
                this._hasLastBorderBox = false;
            } else {
                this._hasLastBorderBox = true;
                this._lastRawWidth = k;
                this._lastBorderWidth = j;
            }
            if (b) {
                if (f && this._hasPtCSSVal([ "marginLeft", "marginRight" ], a, m)) {
                    i = this._recalcTwoSidePropPtVals(a, n, g, m, "margin");
                }
                k += i;
            }
            return k;
        };
        $.outerHeight = function(a, b, c, d) {
            var b = b || false;
            var c = c || false;
            var d = d || false;
            var e = this.getComputedCSS(a);
            if (c || this._areBrowserPtVals()) var f = false; else if (this._areRecalcPtVals()) {
                this._ensureHasParentNode(a);
                var f = this._hasPtCSSVal("height", a);
            }
            if (e.display === "none") return 0;
            var g = this._getComputedProps("forOh", e, a);
            var h = g.paddingTop + g.paddingBottom;
            var i = g.marginTop + g.marginBottom;
            var j = g.borderTopWidth + g.borderBottomWidth;
            var k = 0;
            var l = this._normalizeComputedCSS(e.height);
            if (l !== false) k = l;
            var m = null;
            var n = null;
            var o = null;
            if (f) {
                m = this.getUncomputedCSS(a);
                n = this.recalcPtWidthFn.call(this, a.parentNode, false, a.parentNode.nodeName == "HTML", true);
                if (this._hasLastBorderBox) n -= this._lastBorderWidth;
                o = this.recalcPtHeightFn.call(this, a.parentNode, false, a.parentNode.nodeName == "HTML", true);
                if (this._hasLastBorderBox && this._hasPtCSSVal("height", a, m)) o -= this._lastBorderHeight;
            }
            if (f && this._hasPtCSSVal([ "paddingTop", "paddingBottom" ], a, m)) {
                h = this._recalcTwoSidePropPtVals(a, n, g, m, "padding", true);
            }
            if (f && this._hasPtCSSVal("height", a, m)) k = this._recalcPtVal(a, o, m, "height");
            if (!this._isDefBoxSizing(e) || this._isDefBoxSizing(e) && !this._isOuterBoxSizing()) {
                this._lastRawHeight = k;
                k += h;
                if (!d) k += j;
                this._hasLastBorderBox = false;
            } else {
                this._hasLastBorderBox = true;
                this._lastRawHeight = k;
                this._lastBorderHeight = j;
            }
            if (b) {
                if (f && this._hasPtCSSVal([ "marginTop", "marginBottom" ], a, m)) {
                    i = this._recalcTwoSidePropPtVals(a, n, g, m, "margin", true);
                }
                k += i;
            }
            return k;
        };
        var _ = function() {};
        c(_, {
            find: function(a, b) {
                var b = b || false;
                var c = sb.get();
                if (!b && c.length == 0) e(P.NO_CNS);
                var d = eb.get(a);
                var f = null;
                for (var g = 0; g < c.length; g++) {
                    if (d == c[g].itemGUID) {
                        f = c[g];
                        break;
                    }
                }
                if (f == null) {
                    if (!Mb.isEmpty()) {
                        var h = Mb.getQueued();
                        for (var g = 0; g < h.length; g++) {
                            if (d == h[g].cn.itemGUID) {
                                f = h[g].cn;
                                break;
                            }
                        }
                    }
                }
                if (!b && f == null) e(P.CANT_FIND_CN);
                return f;
            },
            create: function(a, b) {
                var c = [ "x1", "x2", "y1", "y2" ];
                for (var d = 0; d < c.length; d++) {
                    var e = c[d];
                    var f = b[e];
                    b[e] = Z.toFixed(b[e], 2);
                    if (isNaN(b[e])) b[e] = f;
                }
                b.item = a;
                b.itemGUID = eb.get(a);
                b.hOffset = Z.hasOwnProp(b, "hOffset") ? b.hOffset : 0;
                b.vOffset = Z.hasOwnProp(b, "vOffset") ? b.vOffset : 0;
                b.restrictCollect = Z.hasOwnProp(b, "restrictCollect") ? b.restrictCollect : false;
                if (!Za.isConnected(a)) Za.markAsConnected(a);
                return b;
            },
            rm: function(a, b) {
                for (var c = 0; c < a.length; c++) {
                    if (eb.get(b.item) == eb.get(a[c].item)) {
                        a.splice(c, 1);
                        return;
                    }
                }
            },
            _remapGUIDS: function(a) {
                for (var b = 0; b < a.length; b++) a[b].itemGUID = eb.markForAppend(a[b].item);
            },
            remapAllGUIDS: function() {
                eb.reinit();
                this._remapGUIDS(wb.sortForReappend(sb.get()));
            },
            remapGUIDSIn: function(a) {
                this._remapGUIDS(a);
            },
            getByGUIDS: function(a) {
                var b = sb.get();
                var c = [];
                for (var d = 0; d < b.length; d++) {
                    for (var e = 0; e < a.length; e++) {
                        if (b[d].itemGUID == a[e]) {
                            c.push(b[d]);
                            break;
                        }
                    }
                }
                return c;
            },
            syncParams: function(a) {
                var b = sb.get();
                var c = [ "x1", "x2", "y1", "y2", "hOffset", "vOffset", "restrictCollect" ];
                for (var d = 0; d < a.length; d++) {
                    for (var e = 0; e < b.length; e++) {
                        if (a[d].itemGUID == b[e].itemGUID) {
                            for (var f = 0; f < c.length; f++) b[e][c[f]] = a[d][c[f]];
                            break;
                        }
                    }
                }
            },
            _getMinSize: function(a, b, c, d) {
                var e = sb.get();
                if (e.length == 0) return 0;
                var f = function(f) {
                    if (e[f][a] >= e[f][b] || e[f][a] < 0 || e[f][b] > c) return Ya["outer" + d](e[f].item, true); else return e[f][b] - e[f][a] + 1;
                };
                var g = f(0);
                for (var h = 1; h < e.length; h++) {
                    var i = f(h);
                    if (i < g) g = i;
                }
                return g;
            },
            getMinWidth: function() {
                return this._getMinSize("x1", "x2", $a.x2(), "Width");
            },
            getMinHeight: function() {
                return this._getMinSize("y1", "y2", $a.y2(), "Height");
            },
            _compareGUIDS: function(a, b, c) {
                var d = eb.get(b);
                for (var e = 0; e < a.length; e++) {
                    if (c(eb.get(a[e].item), d)) return true;
                }
                return false;
            },
            isAnyGUIDSmallerThan: function(a, b) {
                return this._compareGUIDS(a, b, function(a, b) {
                    return a < b;
                });
            },
            isAnyGUIDBiggerThan: function(a, b) {
                return this._compareGUIDS(a, b, function(a, b) {
                    return a > b;
                });
            },
            getMaxY: function() {
                var a = sb.get();
                var b = 0;
                for (var c = 0; c < a.length; c++) {
                    if (a[c].y2 > b) b = a[c].y2;
                }
                return b;
            },
            restoreOnSortDispersion: function(a, b, c) {
                var d = wb.sortForReappend(sb.get());
                var e = d[d.length - 1];
                var f = function(a, b, c) {
                    a.x1 = b;
                    a.x2 = b;
                    a.y1 = c;
                    a.y2 = c;
                };
                if (ab.eq("append", "default")) b(a, e, f); else c(a, e, f);
            },
            getAllBACoord: function(a, b) {
                var c = sb.get();
                var d = [];
                for (var e = 0; e < c.length; e++) {
                    if (ab.eq("sortDispersion", false) && b(c[e], a)) d.push(c[e]);
                }
                return d;
            },
            fixAllXYPosAfterPrepend: function(a, b, c, d, e) {
                if (a[d] >= 0) return false;
                var f = Math.round(Math.abs(a[d]));
                a[e] = Math.abs(a[d] - a[e]);
                a[d] = 0;
                var g = sb.get();
                for (var h = 0; h < g.length; h++) {
                    if (a.itemGUID == g[h].itemGUID) continue;
                    g[h][d] += f;
                    g[h][e] += f;
                }
                for (var h = 0; h < b.length; h++) b[h][c] += f;
                vb.incAllBy(f, d, e);
                vb.createPrepended(a[d], a[e], d, e);
                return true;
            }
        });
        var aa = function() {};
        c(aa, {
            isIntersectingAny: function(a, b) {
                for (var c = 0; c < a.length; c++) {
                    var d = a[c];
                    var e = b.y1 < d.y1 && b.y2 < d.y1;
                    var f = b.y1 > d.y2 && b.y2 > d.y2;
                    var g = b.x1 < d.x1 && b.x2 < d.x1;
                    var h = b.x1 > d.x2 && b.x2 > d.x2;
                    if (!e && !f && !g && !h) return true;
                }
                return false;
            },
            getAllWithIntersectedCenter: function(a) {
                var b = sb.get();
                var c = [];
                for (var d = 0; d < b.length; d++) {
                    var e = b[d].x2 - b[d].x1 + 1;
                    var f = b[d].y2 - b[d].y1 + 1;
                    var g = b[d].x1 + e / 2;
                    var h = b[d].y1 + f / 2;
                    var i = {
                        x1: g,
                        x2: g,
                        y1: h,
                        y2: h
                    };
                    if (this.isIntersectingAny([ i ], a)) c.push(b[d]);
                }
                return c;
            },
            _findAllMaybeIntCns: function(a, b) {
                var c = sb.get();
                var d = [];
                for (var e = 0; e < c.length; e++) {
                    if (b(a, c[e])) continue;
                    d.push(c[e]);
                }
                return d;
            },
            findAllMaybeIntOnVgAppend: function(a) {
                return this._findAllMaybeIntCns(a, function(a, b) {
                    return a.y > b.y2;
                });
            },
            findAllMaybeIntOnVgPrepend: function(a) {
                return this._findAllMaybeIntCns(a, function(a, b) {
                    return a.y < b.y1;
                });
            },
            findAllMaybeIntOnHgAppend: function(a) {
                return this._findAllMaybeIntCns(a, function(a, b) {
                    return a.x > b.x2;
                });
            },
            findAllMaybeIntOnHgPrepend: function(a) {
                return this._findAllMaybeIntCns(a, function(a, b) {
                    return a.x < b.x1;
                });
            }
        });
        var ba = function() {
            this._ranges = null;
            if (ab.eq("grid", "vertical")) this.init("y1", "y2"); else this.init("x1", "x2");
        };
        c(ba, {
            init: function(a, b) {
                var c = {
                    cnIndexes: []
                };
                c[a] = -1;
                c[b] = I.RANGE_SIZE - 1;
                this._ranges = [ c ];
                this._attachAllCns(a, b);
            },
            incAllBy: function(a, b, c) {
                for (var d = 0; d < this._ranges.length; d++) {
                    this._ranges[d][b] += a;
                    this._ranges[d][c] += a;
                }
            },
            createPrepended: function(a, b, c, d) {
                var e = {
                    cnIndexes: []
                };
                e[c] = -1;
                e[d] = b;
                this._ranges.unshift(e);
            },
            _createNext: function(a, b) {
                var c = this._ranges[this._ranges.length - 1][b] + 1;
                var d = {
                    cnIndexes: []
                };
                d[a] = c;
                d[b] = c + I.RANGE_SIZE - 1;
                this._ranges.push(d);
            },
            attachCn: function(a, b, c, d) {
                while (a[d] + 1 > this._ranges[this._ranges.length - 1][d]) this._createNext(c, d);
                var f = false;
                for (var g = 0; g < this._ranges.length; g++) {
                    var h = a[d] < this._ranges[g][c];
                    var i = a[c] > this._ranges[g][d];
                    if (!h && !i) {
                        this._ranges[g].cnIndexes.push(b);
                        f = true;
                    }
                }
                if (!f) e("Range for cn NF");
            },
            _attachAllCns: function(a, b) {
                var c = sb.get();
                for (var d = 0; d < c.length; d++) this.attachCn(c[d], d, a, b);
            },
            mapAllIntAndSideCns: function(a, b, c, d, e, f, g, h) {
                var i = this._ranges;
                var j = e(i);
                var k = [];
                for (var l = 0; l < a.length; l++) {
                    var m = false;
                    var n = j != e(i);
                    while (!m) {
                        if (j > f(i) || j < 0) {
                            j = e(i);
                            break;
                        }
                        if (a[l][b] >= i[j][c] && a[l][b] <= i[j][d]) m = true; else {
                            j = h(j);
                            n = false;
                        }
                    }
                    if (!n) k = g(j, i);
                    a[l].cnIndexes = k;
                }
                return a;
            },
            firstRngIndexFn: function() {
                return function(a) {
                    return 0;
                };
            },
            lastRngIndexFn: function() {
                return function(a) {
                    return a.length - 1;
                };
            },
            lowerCrCnIndexesFn: function() {
                return function(a, b) {
                    var c = [];
                    for (var d = a; d >= 0; d--) c.push(b[d].cnIndexes);
                    return c;
                };
            },
            upperCrCnIndexesFn: function() {
                return function(a, b) {
                    var c = [];
                    for (var d = a; d < b.length; d++) c.push(b[d].cnIndexes);
                    return c;
                };
            },
            incFn: function() {
                return function(a) {
                    return ++a;
                };
            },
            decFn: function() {
                return function(a) {
                    return --a;
                };
            },
            getAllCnsFromIntRange: function(a, b, c) {
                var d = this._ranges;
                for (var e = 0; e < d.length; e++) {
                    if (a >= d[e][b] && a <= d[e][c]) return d[e].cnIndexes;
                }
                var f = function(a, b) {
                    for (var c = 0; c < a.length; c++) {
                        if (a[c] == b) return true;
                    }
                    return false;
                };
                var g = [];
                for (var e = 0; e < d.length; e++) {
                    for (var h = 0; h < d[e].cnIndexes.length; h++) {
                        if (!f(g, d[e].cnIndexes[h])) g.push(d[e].cnIndexes[h]);
                    }
                }
                return g;
            },
            getAllCnsFromIntAndTLSideRgs: function(a, b, c) {
                var d = this._ranges;
                var e = [];
                var f = null;
                for (var g = d.length - 1; g >= 0; g--) {
                    if (a >= d[g][b] && a <= d[g][c]) {
                        f = g;
                        break;
                    }
                }
                if (f == null) f = d.length - 1;
                for (var g = f; g >= 0; g--) e.push(d[g].cnIndexes);
                return e;
            },
            getAllCnsFromIntAndRBSideRgs: function(a, b, c) {
                var d = this._ranges;
                var e = [];
                var f = null;
                for (var g = 0; g < d.length; g++) {
                    if (a >= d[g][b] && a <= d[g][c]) {
                        f = g;
                        break;
                    }
                }
                if (f == null) f = 0;
                for (var g = f; g < d.length; g++) e.push(d[g].cnIndexes);
                return e;
            }
        });
        var ca = function() {};
        c(ca, {
            _sortForReappend: function(a, b, c, d) {
                if (ab.eq("sortDispersion", false)) {
                    a.sort(function(a, b) {
                        return eb.get(a.item) > eb.get(b.item) ? 1 : -1;
                    });
                } else {
                    if (ab.eq("append", "default")) {
                        a.sort(function(a, d) {
                            if (Z.areRoundedOrFlooredEq(a[b], d[b])) return a[c] < d[c] ? -1 : 1; else return a[b] < d[b] ? -1 : 1;
                        });
                    } else {
                        a.sort(function(a, c) {
                            if (Z.areRoundedOrFlooredEq(a[b], c[b])) return a[d] > c[d] ? -1 : 1; else return a[b] < c[b] ? -1 : 1;
                        });
                    }
                    var e = ab.getApi("rsort");
                    a = e(a);
                }
                return a;
            },
            sortForReappend: function(a) {
                if (ab.eq("grid", "vertical")) return this._sortForReappend(a, "y1", "x1", "x2"); else return this._sortForReappend(a, "x1", "y2", "y1");
            }
        });
        var da = function() {
            this._lastXYExpandedCns = [];
        };
        c(da, {
            _isBefore: function(a, b, c, d) {
                return a[c] < b[c] && a[d] < b[c];
            },
            _isAfter: function(a, b, c, d) {
                return a[c] > b[d] && a[d] > b[d];
            },
            getLastXYExpandedCns: function() {
                return this._lastXYExpandedCns;
            },
            isIntMoreThanOneCnXY: function(a, b, c) {
                var d = this;
                var e = sb.get();
                var f = [];
                var g = function(a) {
                    if (f.length == 0) return false;
                    for (var g = 0; g < f.length; g++) {
                        var h = e[f[g]];
                        var i = h[b];
                        var j = h[c];
                        h[b] = Math.ceil(h[b]);
                        h[c] = Math.floor(h[c]);
                        var k = d._isBefore(a, h, b, c);
                        var l = d._isAfter(a, h, b, c);
                        h[b] = i;
                        h[c] = j;
                        if (!k && !l) return true;
                    }
                    return false;
                };
                var h = 0;
                for (var i = 0; i < e.length; i++) {
                    if (!d._isBefore(a, e[i], b, c) && !d._isAfter(a, e[i], b, c) && !g(e[i])) {
                        f.push(i);
                        h++;
                    }
                }
                return h > 1;
            },
            getMostBigFromAllXYIntCns: function(a, b, c) {
                var d = sb.get();
                var e = null;
                for (var f = 0; f < d.length; f++) {
                    if (!this._isBefore(a, d[f], b, c) && !this._isAfter(a, d[f], b, c)) {
                        if (e == null) e = d[f]; else {
                            var g = Math.abs(d[f][c] - d[f][b]);
                            var h = Math.abs(e[c] - e[b]);
                            if (g > h) e = d[f];
                        }
                    }
                }
                return e;
            },
            getAllXYIntCns: function(a, b, c) {
                var d = sb.get();
                var e = [];
                for (var f = 0; f < d.length; f++) {
                    if (!this._isBefore(a, d[f], b, c) && !this._isAfter(a, d[f], b, c)) e.push(d[f]);
                }
                return e;
            },
            expandXYAllCnsToMostBig: function(a, b, c, d, e) {
                var f = g("eq", ab);
                var h = this.getMostBigFromAllXYIntCns(a, b, c);
                if (h == null) return;
                var i = this.getAllXYIntCns(a, b, c);
                var j = [];
                for (var k = 0; k < i.length; k++) {
                    i[k][b] = h[b];
                    i[k][c] = h[c];
                    if (f("align", "left") || f("align", "top")) {
                        if (i[k][d] != 0) j.push(i[k]);
                        i[k][d] = 0;
                    } else {
                        var l = Ya["outer" + e](i[k].item, true);
                        if (f("align", "center")) var m = Math.abs(i[k][c] - i[k][b] + 1) / 2 - l / 2; else var m = Math.abs(i[k][c] - i[k][b] + 1) - l;
                        if (i[k][d] != m) {
                            i[k][d] = m;
                            j.push(i[k]);
                        }
                    }
                }
                this._lastXYExpandedCns = j;
            }
        });
        var ea = function() {
            this._crs = [];
            this._nextFlushCb = null;
        };
        c(ea, {
            eq: function(a, b) {
                return a.side == b;
            },
            isInitial: function(a) {
                return a.itemGUID == L.INITIAL_GUID;
            },
            create: function(a, b, c, d, e) {
                this._crs.push({
                    type: a,
                    side: b,
                    x: Z.toFixed(c, 2),
                    y: Z.toFixed(d, 2),
                    itemGUID: typeof e == "undefined" ? L.INITIAL_GUID : e
                });
            },
            count: function() {
                return this._crs.length;
            },
            get: function() {
                return this._crs;
            },
            set: function(a) {
                this._crs = a;
            },
            setNextFlushCb: function(a) {
                this._nextFlushCb = a;
            },
            flush: function() {
                this._crs = [];
                if (typeof this._nextFlushCb == "function") {
                    this._nextFlushCb();
                    this._nextFlushCb = null;
                }
            },
            getClone: function() {
                var a = [];
                var b = [ "type", "side", "x", "y", "itemGUID" ];
                for (var c = 0; c < this._crs.length; c++) {
                    var d = {};
                    for (var e = 0; e < b.length; e++) d[b[e]] = this._crs[c][b[e]];
                    d.crIndex = c;
                    a.push(d);
                }
                return a;
            }
        });
        var fa = function() {
            this._cleaner = null;
        };
        c(fa, {
            _updateCleaner: function() {
                var a = L.CLEANERS;
                this._cleaner = ab.eq("sortDispersion", false) ? a.INSIDE_OR_BEFORE : a.INSIDE;
            },
            _isInsideCleaner: function() {
                this._updateCleaner();
                return this._cleaner == L.CLEANERS.INSIDE;
            },
            _isMappedCrIntAnySideCn: function(a, b, c, d, e) {
                var f = sb.get();
                for (var g = 0; g < a.cnIndexes.length; g++) {
                    for (var h = 0; h < a.cnIndexes[g].length; h++) {
                        var i = f[a.cnIndexes[g][h]];
                        nb.roundCnPerCr(i, a);
                        if (a[b] >= i[c] && a[b] <= i[d] && e.call(this, a, i)) {
                            nb.unroundCnPerCr(i, a);
                            return true;
                        }
                        nb.unroundCnPerCr(i, a);
                    }
                }
                return false;
            },
            _isMappedCrIntAnyTopCn: function(a) {
                return this._isMappedCrIntAnySideCn(a, "x", "x1", "x2", function(a, b) {
                    return this._isInsideCleaner() ? a.y >= b.y1 && a.y <= b.y2 : a.y >= b.y1;
                });
            },
            _isMappedCrIntAnyBottomCn: function(a) {
                return this._isMappedCrIntAnySideCn(a, "x", "x1", "x2", function(a, b) {
                    return this._isInsideCleaner() ? a.y <= b.y2 && a.y >= b.y1 : a.y <= b.y2;
                });
            },
            _isMappedCrIntAnyLeftCn: function(a) {
                return this._isMappedCrIntAnySideCn(a, "y", "y1", "y2", function(a, b) {
                    return this._isInsideCleaner() ? a.x >= b.x1 && a.x <= b.x2 : a.x >= b.x1;
                });
            },
            _isMappedCrIntAnyRightCn: function(a) {
                return this._isMappedCrIntAnySideCn(a, "y", "y1", "y2", function(a, b) {
                    return this._isInsideCleaner() ? a.x <= b.x2 && a.x >= b.x1 : a.x <= b.x2;
                });
            },
            _rmIntFrom: function(a, b, c) {
                var d = jb.get();
                var e = jb.getClone();
                e.sort(function(a, d) {
                    if (a[b] == d[b]) return 0; else if (c(a[b], d[b])) return -1; else return 1;
                });
                e = sb["mapAllIntAnd" + a + "Cns"](e);
                for (var f = 0; f < e.length; f++) {
                    var g = "_isMappedCrIntAny" + a + "Cn";
                    d[e[f].crIndex].isInt = this[g](e[f]);
                }
                for (var f = 0; f < d.length; f++) {
                    if (d[f].isInt) {
                        d.splice(f, 1);
                        f--;
                    }
                }
            },
            rmIntFromTop: function() {
                this._rmIntFrom("Top", "y", function(a, b) {
                    return a.y > b.y;
                });
            },
            rmIntFromBottom: function() {
                this._rmIntFrom("Bottom", "y", function(a, b) {
                    return a.y < b.y;
                });
            },
            rmIntFromLeft: function() {
                this._rmIntFrom("Left", "x", function(a, b) {
                    return a.x > b.x;
                });
            },
            rmIntFromRight: function() {
                this._rmIntFrom("Right", "x", function(a, b) {
                    return a.x < b.x;
                });
            },
            _rmAllTooFar: function(a, b) {
                var c = jb.get();
                if (c.length == 0) return;
                var d = c[0];
                for (var e = 1; e < c.length; e++) {
                    if (a(c[e], d)) d = c[e];
                }
                for (var e = 0; e < c.length; e++) {
                    if (b(c[e], d, Z.int(ab.get("insertRange")))) {
                        c.splice(e, 1);
                        e--;
                    }
                }
            },
            _crSmCr: function(a) {
                return function(b, c) {
                    return b[a] < c[a];
                };
            },
            _crBgCr: function(a) {
                return function(b, c) {
                    return b[a] > c[a];
                };
            },
            _crSmValidC: function(a, b) {
                return function(c, d, e) {
                    return c[a] < d[a] + e * b;
                };
            },
            _crBgValidC: function(a, b) {
                return function(c, d, e) {
                    return c[a] > d[a] + e * b;
                };
            },
            rmAllTooBottomFromMostTop: function() {
                this._rmAllTooFar(this._crSmCr("y"), this._crBgValidC("y", 1));
            },
            rmAllTooTopFromMostBottom: function() {
                this._rmAllTooFar(this._crBgCr("y"), this._crSmValidC("y", -1));
            },
            rmAllTooRightFromMostLeft: function() {
                this._rmAllTooFar(this._crSmCr("x"), this._crBgValidC("x", 1));
            },
            rmAllTooLeftFromMostRight: function() {
                this._rmAllTooFar(this._crBgCr("x"), this._crSmValidC("x", -1));
            }
        });
        var ga = function() {};
        c(ga, {
            _mostYClose: function(a, b, c, d, e, f) {
                var g = sb.get();
                var h = null;
                var i = ab.eq("grid", "vertical") ? e(a) : f(a);
                for (var j = 0; j < i.length; j++) {
                    for (var k = 0; k < i[j].length; k++) {
                        var l = g[i[j][k]];
                        if ((a.x >= l.x1 && a.x <= l.x2 || b(a, l)) && c(a, l)) {
                            if (h == null) h = l; else {
                                if (d(l, h)) h = l;
                            }
                        }
                    }
                }
                return h;
            },
            _crXBgCnX2: function(a, b) {
                return a.x > b.x2;
            },
            _crXSmCnX1: function(a, b) {
                return a.x < b.x1;
            },
            _crYBgCnY2: function(a, b) {
                return a.y > b.y2;
            },
            _crYSmCnY1: function(a, b) {
                return a.y < b.y1;
            },
            _cnX1BgCnX2: function(a, b) {
                return a.x1 > b.x2;
            },
            _cnX1SmCnX1: function(a, b) {
                return a.x1 < b.x1;
            },
            _cnY2BgCnY2: function(a, b) {
                return a.y2 > b.y2;
            },
            _cnY1SmCnY1: function(a, b) {
                return a.y1 < b.y1;
            },
            _intXCns: function(a) {
                return sb.getAllIntXCns(a);
            },
            _intXAndUpperCns: function(a) {
                return sb.getAllIntXAndTopCns(a);
            },
            _intXAndLowerCns: function(a) {
                return sb.getAllIntXAndBottomCns(a);
            },
            _intYAndLeftCns: function(a) {
                return sb.getAllIntYAndLeftCns(a);
            },
            _intYAndRightCns: function(a) {
                return sb.getAllIntYAndRightCns(a);
            },
            mostBottomFromTopOrTopLeft: function(a) {
                var b = this;
                return this._mostYClose(a, b._crXBgCnX2, b._crYBgCnY2, b._cnY2BgCnY2, b._intXAndUpperCns, b._intYAndLeftCns);
            },
            mostBottomFromTopOrTopRight: function(a) {
                var b = this;
                return this._mostYClose(a, b._crXSmCnX1, b._crYBgCnY2, b._cnY2BgCnY2, b._intXAndUpperCns, b._intYAndRightCns);
            },
            mostTopFromBottomOrBottomLeft: function(a) {
                var b = this;
                return this._mostYClose(a, b._crXBgCnX2, b._crYSmCnY1, b._cnY1SmCnY1, b._intXAndLowerCns, b._intYAndLeftCns);
            },
            mostTopFromBottomOrBottomRight: function(a) {
                var b = this;
                return this._mostYClose(a, b._crXSmCnX1, b._crYSmCnY1, b._cnY1SmCnY1, b._intXAndLowerCns, b._intYAndRightCns);
            },
            _mostXClose: function(a, b, c, d, e) {
                var f = sb.get();
                var g = null;
                var h = function(d) {
                    if (a.y >= d.y1 && a.y <= d.y2 && b(a, d)) {
                        if (g == null) g = d; else {
                            if (c(d, g)) g = d;
                        }
                    }
                };
                if (ab.eq("grid", "vertical")) {
                    var i = d(a);
                    for (var j = 0; j < i.length; j++) h(f[i[j]]);
                } else {
                    var i = e(a);
                    for (var j = 0; j < i.length; j++) {
                        for (var k = 0; k < i[j].length; k++) h(f[i[j][k]]);
                    }
                }
                return g;
            },
            mostLeftFromRight: function(a) {
                var b = this;
                return this._mostXClose(a, b._crXSmCnX1, b._cnX1SmCnX1, b._intXCns, b._intYAndRightCns);
            },
            mostRightFromLeft: function(a) {
                var b = this;
                return this._mostXClose(a, b._crXBgCnX2, b._cnX1BgCnX2, b._intXCns, b._intYAndLeftCns);
            }
        });
        var ha = function() {};
        c(ha, {
            recreateForFirst: function(a, b) {
                if (ab.eq("append", "reversed")) {
                    hb.setLast(M.REV_APPEND);
                    this._recreate(a, b, Gb, "Rev");
                } else {
                    hb.setLast(M.APPEND);
                    this._recreate(a, b, Eb, "Def");
                }
            },
            _recreate: function(a, b, c, d) {
                sb.reinitRanges();
                g("recreateCrs", c)();
                if (ab.eq("grid", "vertical")) {
                    kb.rmIntFromBottom();
                } else {
                    kb.rmIntFromRight();
                }
            }
        });
        var ia = function() {};
        c(ia, {
            roundCnPerCr: function(a, b) {
                a.origX1 = a.x1;
                a.origX2 = a.x2;
                a.origY1 = a.y1;
                a.origY2 = a.y2;
                var c = function(a) {
                    return jb.eq(b, a);
                };
                if (c(L.BOTTOM.LEFT) || c(L.RIGHT.TOP)) {
                    a.x1 = Math.floor(a.x1);
                    a.y1 = Math.floor(a.y1);
                } else if (c(L.LEFT.TOP) || c(L.BOTTOM.RIGHT)) {
                    a.x2 = Math.ceil(a.x2);
                    a.y1 = Math.floor(a.y1);
                } else if (c(L.LEFT.BOTTOM) || c(L.TOP.RIGHT)) {
                    a.x2 = Math.ceil(a.x2);
                    a.y2 = Math.ceil(a.y2);
                } else if (c(L.TOP.LEFT) || c(L.RIGHT.BOTTOM)) {
                    a.x1 = Math.floor(a.x1);
                    a.y2 = Math.ceil(a.y2);
                }
            },
            unroundCnPerCr: function(a, b) {
                a.x1 = a.origX1;
                a.y1 = a.origY1;
                a.x2 = a.origX2;
                a.y2 = a.origY2;
            }
        });
        var ja = function() {
            this._crs = null;
        };
        c(ja, {
            attach: function(a) {
                this._crs = a;
            },
            getSelected: function() {
                return this._crs;
            },
            _selectOnlyMostSideCr: function(a, b, c) {
                var d = null;
                var e = null;
                var f = this._crs.length;
                while (f--) {
                    if (this._crs[f].side == a) {
                        if (d == null || c(this._crs[f][b], e)) {
                            d = this._crs[f].itemGUID;
                            e = this._crs[f][b];
                        }
                    }
                }
                if (d == null) return;
                var f = this._crs.length;
                while (f--) {
                    if (this._crs[f].side == a && this._crs[f].itemGUID != d) this._crs.splice(f, 1);
                }
            },
            _bgCond: function(a, b) {
                return a > b;
            },
            _smCond: function(a, b) {
                return a < b;
            },
            selectOnlyMostBottom: function(a) {
                this._selectOnlyMostSideCr(a, "y", this._bgCond);
            },
            selectOnlyMostTop: function(a) {
                this._selectOnlyMostSideCr(a, "y", this._smCond);
            },
            selectOnlyMostRight: function(a) {
                this._selectOnlyMostSideCr(a, "x", this._bgCond);
            },
            selectOnlyMostLeft: function(a) {
                this._selectOnlyMostSideCr(a, "x", this._smCond);
            },
            _selectOnly: function(a, b) {
                for (var c = 0; c < this._crs.length; c++) {
                    if (!jb.isInitial(this._crs[c]) && b(this._crs[c].itemGUID) && a != this._crs[c].side) {
                        this._crs.splice(c, 1);
                        c--;
                    }
                }
            },
            selectOnlyFromAppended: function(a) {
                this._selectOnly(a, function(a) {
                    return !eb.wasPrepended(a);
                });
            },
            selectOnlyFromPrepended: function(a) {
                this._selectOnly(a, function(a) {
                    return eb.wasPrepended(a);
                });
            }
        });
        var ka = function() {
            this._crs = null;
            this._newCrs = null;
        };
        c(ka, {
            attach: function(a) {
                this._crs = a;
                this._newCrs = [];
            },
            getNew: function() {
                return this._newCrs;
            },
            _createShifted: function(a, b, c) {
                this._newCrs.push({
                    type: c.type,
                    side: L.SHIFTED,
                    x: parseFloat(a),
                    y: parseFloat(b),
                    itemGUID: Z.int(c.itemGUID)
                });
            },
            shiftAll: function() {
                var a = [ [ L.LEFT.TOP, "LeftTop" ], [ L.LEFT.BOTTOM, "LeftBottom" ], [ L.BOTTOM.RIGHT, "BottomRight" ], [ L.BOTTOM.LEFT, "TopLeft" ], [ L.TOP.LEFT, "TopLeft" ], [ L.TOP.RIGHT, "BottomRight" ], [ L.RIGHT.BOTTOM, "RightBottom" ], [ L.RIGHT.TOP, "RightTop" ] ];
                for (var b = 0; b < this._crs.length; b++) {
                    this._newCrs.push(this._crs[b]);
                    for (var c = 0; c < a.length; c++) {
                        if (jb.eq(this._crs[b], a[c][0])) {
                            this["_shift" + a[c][1]](this._crs[b]);
                            break;
                        }
                    }
                }
            },
            _shiftLeftTop: function(a) {
                var b = lb.mostBottomFromTopOrTopLeft(a);
                if (b != null) {
                    if (b.y2 + 1 != a.y) this._createShifted(a.x, b.y2 + 1, a);
                } else if (a.y != 0) this._createShifted(a.x, 0, a);
            },
            _shiftLeftBottom: function(a) {
                var b = lb.mostTopFromBottomOrBottomLeft(a);
                if (b != null) {
                    if (b.y1 - 1 != a.y) this._createShifted(a.x, b.y1 - 1, a);
                } else {
                    var c = tb.getMaxY();
                    if (c != 0 && c - 1 != a.y) this._createShifted(a.x, c - 1, a);
                }
            },
            _shiftBottomRight: function(a) {
                var b = lb.mostLeftFromRight(a);
                if (b != null) {
                    if (b.x1 - 1 != a.x) this._createShifted(b.x1 - 1, a.y, a);
                } else {
                    if (ab.eq("grid", "horizontal") && a.type == L.PREPEND.DEF) return;
                    if (a.x != $a.x2()) this._createShifted($a.x2(), a.y, a);
                }
            },
            _shiftTopLeft: function(a) {
                var b = lb.mostRightFromLeft(a);
                if (b != null) {
                    if (b.x2 + 1 != a.x) this._createShifted(b.x2 + 1, a.y, a);
                } else if (a.x != 0) this._createShifted(0, a.y, a);
            },
            _shiftRightBottom: function(a) {
                var b = lb.mostTopFromBottomOrBottomRight(a);
                if (b != null) {
                    if (b.y1 - 1 != a.y) this._createShifted(a.x, b.y1 - 1, a);
                } else {
                    var c = tb.getMaxY();
                    if (c != 0 && c - 1 != a.y) this._createShifted(a.x, c - 1, a);
                }
            },
            _shiftRightTop: function(a) {
                var b = lb.mostBottomFromTopOrTopRight(a);
                if (b != null) {
                    if (b.y2 + 1 != a.y) this._createShifted(a.x, b.y2 + 1, a);
                } else if (a.y != 0) this._createShifted(a.x, 0, a);
            },
            _shiftAllTo: function(a, b, c) {
                this._newCrs = this._crs;
                for (var d = 0; d < this._newCrs.length; d++) {
                    if (this._newCrs[d].side == a) this._newCrs[d][b] = c;
                }
            },
            shiftAllToRight: function(a) {
                this._shiftAllTo(a, "x", $a.x2());
            },
            shiftAllToLeft: function(a) {
                this._shiftAllTo(a, "x", 0);
            },
            shiftAllToTop: function(a) {
                this._shiftAllTo(a, "y", 0);
            },
            shiftAllToBottom: function(a) {
                this._shiftAllTo(a, "y", $a.y2());
            }
        });
        var la = function() {
            this._crs = null;
        };
        c(la, {
            attach: function(a) {
                this._crs = a;
            },
            getSorted: function() {
                return this._crs;
            },
            _sortForVG: function(a, b) {
                this._crs.sort(function(c, d) {
                    if (Z.areRoundedOrCeiledEq(c.y, d.y)) {
                        if (a) {
                            if (b) return c.x > d.x ? 1 : -1; else return c.x < d.x ? 1 : -1;
                        } else {
                            if (b) return c.x > d.x ? 1 : -1; else return c.x < d.x ? 1 : -1;
                        }
                    } else {
                        if (a) return c.y < d.y ? 1 : -1; else return c.y < d.y ? -1 : 1;
                    }
                });
            },
            _sortForHG: function(a, b) {
                this._crs.sort(function(c, d) {
                    if (Z.areRoundedOrCeiledEq(c.x, d.x)) {
                        if (a) {
                            if (b) return c.y < d.y ? 1 : -1; else return c.y > d.y ? 1 : -1;
                        } else {
                            if (b) return c.y < d.y ? -1 : 1; else return c.y > d.y ? -1 : 1;
                        }
                    } else {
                        if (a) return c.x < d.x ? 1 : -1; else return c.x < d.x ? -1 : 1;
                    }
                });
            },
            sortForPrepend: function() {
                var a = ab.get("prepend") == "default";
                if (ab.eq("grid", "vertical")) this._sortForVG(true, a); else this._sortForHG(true, a);
            },
            sortForAppend: function() {
                var a = ab.get("append") == "default";
                if (ab.eq("grid", "vertical")) this._sortForVG(false, a); else this._sortForHG(false, a);
            }
        });
        var ma = function() {
            this._collectFn = null;
            this._createCollectFn();
            d(this, {
                collect: this.collect,
                collectNew: this.collectDisconnected,
                collectConnected: this.collectConnected
            });
        };
        c(ma, {
            _createCollectFn: function() {
                var a = this;
                this._collectFn = function(b) {
                    if (ab.notEq("class", false)) var c = "." + ab.get("class"); else if (ab.notEq("data", false)) var c = "[" + ab.get("data") + "]"; else var c = ab.get("query");
                    return a.filterCollectable(Z.find.byQuery(b, c));
                };
            },
            filterCollectable: function(a) {
                return Z.filter(a, function(a) {
                    return !this.isNotCollectable(a);
                }, this);
            },
            markAsNotCollectable: function(a) {
                Z.set(a, I.COLL.NOT_COLLECTABLE_DATA, "r");
            },
            unmarkAsNotCollectable: function(a) {
                Z.rmIfHas(a, I.COLL.NOT_COLLECTABLE_DATA);
            },
            isNotCollectable: function(a) {
                return Z.has(a, I.COLL.NOT_COLLECTABLE_DATA);
            },
            collect: function() {
                return this._collectFn($a.get());
            },
            collectByQuery: function(a) {
                return this.filterCollectable(Z.find.byQuery($a.get(), a));
            },
            collectConnected: function() {
                return Za.filterConnected(this._collectFn($a.get()));
            },
            collectDisconnected: function() {
                return Za.filterNotConnected(this._collectFn($a.get()));
            },
            filter: function(a) {
                var b = ab.getApi("filter");
                for (var c = 0; c < b.length; c++) {
                    var d = [];
                    for (var e = 0; e < a.length; e++) {
                        if (b[c](a[e])) d.push(a[e]);
                    }
                    a = d;
                }
                return a;
            },
            sort: function(a) {
                this.saveOriginalOrder(a);
                a.sort(function(a, b) {
                    return ab.getApi("sort")(a, b, Ub, Z);
                });
                this.flushOriginalOrder(a);
                return a;
            },
            saveOriginalOrder: function(a) {
                for (var b = 0; b < a.length; b++) Z.set(a[b], I.COLL.SORT_INDEX_DATA, b + 1);
            },
            flushOriginalOrder: function(a) {
                for (var b = 0; b < a.length; b++) Z.rm(a[b], I.COLL.SORT_INDEX_DATA);
            }
        });
        var na = function() {
            this._max = 9999;
            this._min = 1e4;
            this._firstPrepended = null;
        };
        c(na, {
            reinit: function() {
                this._max = 9999;
                this._min = 1e4;
            },
            reinitMax: function(a) {
                this._max = typeof a == "undefined" || a == null ? 9999 : a;
            },
            get: function(a) {
                return Z.int(Z.get(a, I.GUID_DATA));
            },
            set: function(a, b) {
                Z.set(a, I.GUID_DATA, b);
            },
            rm: function(a) {
                Z.rm(a, I.GUID_DATA);
            },
            markForAppend: function(a) {
                Z.set(a, I.GUID_DATA, ++this._max);
                return this._max;
            },
            markForPrepend: function(a) {
                Z.set(a, I.GUID_DATA, --this._min);
                return this._min;
            },
            markIfFirstPrepended: function(a) {
                if (this._firstPrepended != null) return;
                this._firstPrepended = Z.int(Z.get(a, I.GUID_DATA));
            },
            unmarkFirstPrepended: function() {
                this._firstPrepended = null;
            },
            wasPrepended: function(a) {
                return this._firstPrepended == null ? false : Z.int(a) <= this._firstPrepended;
            }
        });
        var oa = function() {};
        c(oa, {
            markAsConnected: function(a) {
                Z.set(a, I.ITEM.IS_CONNECTED_DATA, "y");
            },
            unmarkAsConnected: function(a) {
                Z.rm(a, I.ITEM.IS_CONNECTED_DATA);
            },
            isConnected: function(a) {
                return Z.has(a, I.ITEM.IS_CONNECTED_DATA);
            },
            filterConnected: function(a) {
                return Z.filter(a, function(a) {
                    return this.isConnected(a);
                }, this);
            },
            filterNotConnected: function(a) {
                return Z.filter(a, function(a) {
                    return !this.isConnected(a);
                }, this);
            },
            toNative: function(a) {
                var b = [];
                if (Z.isJquery(a)) {
                    for (var c = 0; c < a.length; c++) b.push(a.get(c));
                } else if (Z.isNative(a)) {
                    b.push(a);
                } else if (Z.isArray(a)) {
                    for (var c = 0; c < a.length; c++) {
                        b.push(Z.isJquery(a[c]) ? a[c].get(0) : a[c]);
                        if (!Z.isNative(b[b.length - 1])) e(P.NOT_NATIVE);
                    }
                } else e(P.NOT_NATIVE);
                return b;
            }
        });
        var pa = function() {
            this._eventsData = [];
            var a = function(a) {
                return function(b, c) {
                    var d = this.changeCss(a, b, c);
                    fb.updateAs();
                    Lb.fromFirstSortedCn(d);
                    return Xa;
                };
            };
            d(this, {
                toggleCss: a("toggle"),
                addCss: a("add"),
                rmCss: a("rm")
            });
        };
        c(pa, {
            changeCss: function(a, b, c) {
                var b = Za.filterConnected(Za.toNative(b));
                var c = Z.isArray(c) ? c : [ c ];
                for (var d = 0; d < b.length; d++) {
                    var e = [];
                    var f = [];
                    var g = function(a, b) {
                        e.push(b);
                        if (!Z.css.hasClass(a, b)) Z.css.addClass(a, b);
                    };
                    var h = function(a, b) {
                        f.push(b);
                        if (Z.css.hasClass(a, b)) Z.css.removeClass(a, b);
                    };
                    for (var i = 0; i < c.length; i++) {
                        if (a == "toggle") {
                            if (Z.css.hasClass(b[d], c[i])) h(b[d], c[i]); else g(b[d], c[i]);
                        } else if (a == "add") g(b[d], c[i]); else if (a == "rm") h(b[d], c[i]);
                    }
                    this._saveEventData(b[d], e, f);
                }
                return b;
            },
            _saveEventData: function(a, b, c) {
                var d = eb.get(a);
                var e = null;
                for (var f = 0; f < this._eventsData.length; f++) {
                    if (this._eventsData[f].itemGUID == d) {
                        e = this._eventsData[f];
                        break;
                    }
                }
                if (e == null) {
                    e = {};
                    this._eventsData.push(e);
                }
                e.itemGUID = d;
                e.added = b;
                e.removed = c;
            },
            emitEvents: function(a) {
                if (this._eventsData.length == 0) return;
                for (var b = 0; b < a.length; b++) {
                    for (var c = 0; c < this._eventsData.length; c++) {
                        if (Z.int(a[b].itemGUID) == this._eventsData[c].itemGUID) {
                            var d = this._eventsData[c];
                            (function(a, b, c) {
                                setTimeout(function() {
                                    _a.emit(Q.CSS_CHANGE, a, b, c);
                                }, ab.get("coordsChangeTime"));
                            })(a[b].item, d.added, d.removed);
                            this._eventsData.splice(c, 1);
                            break;
                        }
                    }
                }
            }
        });
        var qa = function() {
            this._owCache = [];
            this._ohCache = [];
            this._nextOwGUID = 0;
            this._nextOhGUID = 0;
            this._isActive = false;
            this._owAntialias = 0;
            this._ohAntialias = 0;
        };
        c(qa, {
            setOuterWidthAntialiasValue: function(a) {
                this._owAntialias = a;
            },
            setOuterHeightAntialiasValue: function(a) {
                this._ohAntialias = a;
            },
            _markAsCachedPerOw: function(a, b) {
                Z.set(a, [ [ I.SRM.CACHED_PER_OW_DATA, I.SRM.EMPTY_DATA ], [ I.SRM.CACHED_PER_OW_ITEM_GUID_DATA, b ] ]);
            },
            _markAsCachedPerOh: function(a, b) {
                Z.set(a, [ [ I.SRM.CACHED_PER_OH_DATA, I.SRM.EMPTY_DATA ], [ I.SRM.CACHED_PER_OH_ITEM_GUID_DATA, b ] ]);
            },
            unmarkAsCached: function(a) {
                Z.rmIfHas(a, [ I.SRM.CACHED_PER_OW_DATA, I.SRM.CACHED_PER_OW_ITEM_GUID_DATA, I.SRM.CACHED_PER_OH_DATA, I.SRM.CACHED_PER_OH_ITEM_GUID_DATA ]);
            },
            _getCachedItemEntry: function(a, b, c) {
                for (var d = 0; d < b.length; d++) {
                    if (parseInt(b[d].GUID) == parseInt(c)) return b[d];
                }
            },
            _getOwCachedItemEntry: function(a) {
                return this._getCachedItemEntry(a, this._owCache, Z.get(a, I.SRM.CACHED_PER_OW_ITEM_GUID_DATA));
            },
            _getOhCachedItemEntry: function(a) {
                return this._getCachedItemEntry(a, this._ohCache, Z.get(a, I.SRM.CACHED_PER_OH_ITEM_GUID_DATA));
            },
            _isCallCached: function(a, b, c, d) {
                if (!Z.has(a, c)) return false;
                var e = d(a);
                if (b) return e.cachedCalls.withMargins != null; else return e.cachedCalls.withoutMargins != null;
            },
            _isOwCallCached: function(a, b) {
                var c = this;
                return this._isCallCached(a, b, I.SRM.CACHED_PER_OW_DATA, function(a) {
                    return c._getOwCachedItemEntry(a);
                });
            },
            _isOhCallCached: function(a, b) {
                var c = this;
                return this._isCallCached(a, b, I.SRM.CACHED_PER_OH_DATA, function(a) {
                    return c._getOhCachedItemEntry(a);
                });
            },
            startCachingTransaction: function() {
                this._isActive = true;
            },
            stopCachingTransaction: function() {
                this._isActive = false;
                for (var a = 0; a < this._owCache.length; a++) this.unmarkAsCached(this._owCache[a].item);
                for (var a = 0; a < this._ohCache.length; a++) this.unmarkAsCached(this._ohCache[a].item);
                this._owCache = [];
                this._ohCache = [];
                this._nextOwGUID = 0;
                this._nextOhGUID = 0;
            },
            _callRealOuter: function(a, b, c, d, e, f, g) {
                var h = this;
                var g = g || false;
                var i = $.recalcPtWidthFn;
                var j = $.recalcPtHeightFn;
                var k = function(a) {
                    return function(b, c, d, e) {
                        return h[a](b, c, true, d, e, true);
                    };
                };
                $.recalcPtWidthFn = k("outerWidth");
                $.recalcPtHeightFn = k("outerHeight");
                if (!f) $.clearRecursiveSubcallsData();
                var l = !g ? "outerWidth" : "outerHeight";
                var m = $[l](a, b, d, e);
                if (!c) m -= !g ? this._owAntialias : this._ohAntialias;
                $.recalcPtWidthFn = i;
                $.recalcPtHeightFn = j;
                return m;
            },
            _callRealOw: function(a, b, c, d, e, f) {
                return this._callRealOuter(a, b, c, d, e, f);
            },
            _callRealOh: function(a, b, c, d, e, f) {
                return this._callRealOuter(a, b, c, d, e, f, true);
            },
            _outer: function(a, b, c, d, e, f, g) {
                var h = arguments;
                var g = g || false;
                h[2] = h[2] || false;
                h[5] = h[5] || false;
                if (!this._isActive) return !g ? this._callRealOw.apply(this, h) : this._callRealOh.apply(this, h);
                var i = null;
                if (!g && this._isOwCallCached(a, b)) i = this._getOwCachedItemEntry(a); else if (g && this._isOhCallCached(a, b)) i = this._getOhCachedItemEntry(a);
                if (i != null) {
                    var j = i.cachedCalls;
                    return b ? j.withMargins : j.withoutMargins;
                }
                var k = !g ? this._callRealOw.apply(this, h) : this._callRealOh.apply(this, h);
                if (!g && Z.has(a, I.SRM.CACHED_PER_OW_DATA) || g && Z.has(a, I.SRM.CACHED_PER_OH_DATA)) {
                    var i = !g ? this._getOwCachedItemEntry(a) : this._getOhCachedItemEntry(a);
                    if (b) i.cachedCalls.withMargins = k; else i.cachedCalls.withoutMargins = k;
                } else {
                    if (!g) this._markAsCachedPerOw(a, ++this._nextOwGUID); else this._markAsCachedPerOh(a, ++this._nextOhGUID);
                    var l = {
                        withMargins: b ? k : null,
                        withoutMargins: !b ? k : null
                    };
                    var m = !g ? this._owCache : this._ohCache;
                    m.push({
                        GUID: !g ? this._nextOwGUID : this._nextOhGUID,
                        item: a,
                        cachedCalls: l
                    });
                }
                return k;
            },
            outerWidth: function(a, b, c, d, e, f) {
                return this._outer(a, b, c, d, e, f);
            },
            outerHeight: function(a, b, c, d, e, f) {
                return this._outer(a, b, c, d, e, f, true);
            },
            positionTop: function(a) {
                return $.positionTop(a);
            },
            positionLeft: function(a) {
                return $.positionLeft(a);
            },
            _offset: function(a, b, c, d) {
                var b = b || false;
                if (b) {
                    var e = this[c](a);
                    var f = this[c](a, true);
                    var g = f - e;
                    var h = g / 2;
                    var i = $[d](a) - h;
                } else var i = $[d](a);
                return i;
            },
            offsetLeft: function(a, b) {
                return this._offset(a, b, "outerWidth", "offsetLeft");
            },
            offsetTop: function(a, b) {
                return this._offset(a, b, "outerHeight", "offsetTop");
            },
            viewportWidth: function() {
                return document.documentElement.clientWidth;
            },
            viewportHeight: function() {
                return document.documentElement.clientHeight;
            },
            viewportScrollLeft: function() {
                return window.pageXOffset || document.documentElement.scrollLeft;
            },
            viewportScrollTop: function() {
                return window.pageYOffset || document.documentElement.scrollTop;
            },
            viewportDocumentCoords: function() {
                return {
                    x1: this.viewportScrollLeft(),
                    x2: this.viewportScrollLeft() + this.viewportWidth() - 1,
                    y1: this.viewportScrollTop(),
                    y2: this.viewportScrollTop() + this.viewportHeight() - 1
                };
            },
            itemSizes: function(a) {
                return {
                    width: this.outerWidth(a, true),
                    height: this.outerHeight(a, true)
                };
            },
            copyComputedStyle: function(a, b) {
                var c = this;
                var d = function(a, b) {
                    $.cloneComputedStyle(a, b);
                    for (var e = 0; e < a.childNodes.length; e++) {
                        if (a.childNodes[e].nodeType == 1) {
                            d(a.childNodes[e], b.childNodes[e]);
                            var f = $.getComputedCSS(a.childNodes[e]);
                            if (/.*px.*/.test(f.left)) b.childNodes[e].style.left = c.positionLeft(a.childNodes[e]) + "px";
                            if (/.*px.*/.test(f.top)) b.childNodes[e].style.top = c.positionTop(a.childNodes[e]) + "px";
                            var g = $.getUncomputedCSS(a.childNodes[e]);
                            b.childNodes[e].style.width = c.outerWidth(a.childNodes[e]) + "px";
                            if (Z.int(g.height) != 0) b.childNodes[e].style.height = c.outerHeight(a.childNodes[e]) + "px";
                        }
                    }
                };
                d(a, b);
            }
        });
        var ra = function() {
            d(this, {
                disconnect: function(a) {
                    var b = this;
                    a = Za.filterConnected(Za.toNative(a));
                    setTimeout(function() {
                        Lb.sync();
                        b.disconnect(a, I.DISC_TYPES.HARD);
                        Lb.all();
                    }, I.REFLOW_FIX_DELAY);
                    return Xa;
                },
                pop: function() {
                    var a = Xa.first();
                    if (a != null) Xa.disconnect(a);
                    return a;
                },
                shift: function() {
                    var a = Xa.last();
                    if (a != null) Xa.disconnect(a);
                    return a;
                }
            });
        };
        c(ra, {
            disconnect: function(a, b) {
                var b = b || I.DISC_TYPES.SOFT;
                var a = Za.filterConnected(Za.toNative(a));
                if (b == I.DISC_TYPES.HARD) {
                    for (var c = 0; c < a.length; c++) db.markAsNotCollectable(a[c]);
                }
                var d = this._findCnsToDisc(a);
                for (var c = 0; c < d.length; c++) {
                    sb.rm(d[c]);
                    eb.rm(d[c].item);
                }
                if (sb.count() == 0) this._recreateCrs();
                for (var c = 0; c < d.length; c++) Za.unmarkAsConnected(d[c].item);
                sb.reinitRanges();
                this._scheduleRender(d);
            },
            _findCnsToDisc: function(a) {
                var b = [];
                for (var c = 0; c < a.length; c++) b.push(tb.find(a[c]));
                return wb.sortForReappend(b);
            },
            _recreateCrs: function() {
                jb.flush();
                if (ab.eq("append", "default")) Eb.createInitialCr(); else Gb.createInitialCr();
            },
            _scheduleRender: function(a) {
                var b = Ob.itemsToBatches(a, I.DISC_BATCH, true);
                Ab.markAsSchToHide(a);
                for (var c = 0; c < b.length; c++) {
                    (function(a, b) {
                        setTimeout(function() {
                            Ab.hide(a);
                        }, I.DISC_DELAY * b);
                    })(b[c], c);
                }
            }
        });
        var sa = function() {};
        c(sa, {
            filter: function() {
                var a = db.collect();
                var b = db.collectConnected();
                var c = db.sort(db.filter(a));
                var d = this._findConnItemsToHide(b);
                Jb.disconnect(d);
                this._recreateGUIDS(c);
                this._recreateCns(c);
            },
            _findConnItemsToHide: function(a) {
                return Z.filter(a, function(a) {
                    return db.filter([ a ]).length == 0;
                }, this);
            },
            _recreateGUIDS: function(a) {
                eb.reinit();
                for (var b = 0; b < a.length; b++) eb.markForAppend(a[b]);
            },
            _recreateCns: function(a) {
                var b = sb.get();
                b.splice(0, b.length);
                if (ab.eq("grid", "vertical")) var c = {
                    c1: "y",
                    c2: "x"
                }; else var c = {
                    c1: "x",
                    c2: "y"
                };
                var d = 0;
                for (var e = 0; e < a.length; e++) {
                    var f = {};
                    f[c.c1 + "1"] = d;
                    f[c.c1 + "2"] = d;
                    f[c.c2 + "1"] = 0;
                    f[c.c2 + "2"] = 0;
                    sb.add(a[e], f);
                    d++;
                }
            }
        });
        var ta = function() {};
        c(ta, {
            resort: function() {
                var a = db.sort(db.collectConnected());
                if (ab.eq("sortDispersion", true)) this._resortOnSD(a);
                eb.reinit();
                for (var b = 0; b < a.length; b++) eb.markForAppend(a[b]);
            },
            _resortOnSD: function(a) {
                if (ab.eq("grid", "vertical")) var b = {
                    c1: "y",
                    c2: "x"
                }; else var b = {
                    c1: "x",
                    c2: "y"
                };
                var c = 0;
                for (var d = 0; d < a.length; d++) {
                    var e = tb.find(a[d]);
                    e[b.c1 + "1"] = c;
                    e[b.c1 + "2"] = c;
                    e[b.c2 + "1"] = 0;
                    e[b.c2 + "2"] = 0;
                    c++;
                }
            }
        });
        k = function() {
            this._shouldUpdateZ = false;
            this._disableZUpdates = false;
            this._updateZTimeout = null;
            var a = this;
            Xa.onReposition(function() {
                if (!a._shouldUpdateZ || a._disableZUpdates) return;
                clearTimeout(a._updateZTimeout);
                a._updateZTimeout = setTimeout(function() {
                    a._updateZ.call(a);
                }, I.UPDATE_Z_DELAY);
            });
            _a.onSetSettingForNzer(function(b) {
                var c = [ "widthPx", "heightPx", "widthPt", "heightPt" ];
                var d = false;
                for (var e = 0; e < c.length; e++) {
                    if (b == c[e] + "As") d = true;
                }
                if (d) a.updateAs();
            });
            d(this, {
                disableZUpdates: function() {
                    a._disableZUpdates = true;
                    return Xa;
                }
            });
            this.updateAs();
        };
        c(k, {
            updateAs: function() {
                var a = this._updateAs("x", "width", "Width");
                var b = this._updateAs("y", "height", "Height");
                this._shouldUpdateZ = a || b;
            },
            _updateAs: function(a, b, c) {
                var d = parseFloat(ab.get(b + "PxAs"));
                var e = parseFloat(ab.get(b + "PtAs"));
                if (d == 0 && e == 0) {
                    Ya["setOuter" + c + "AntialiasValue"](0);
                    return false;
                }
                if (e != 0) var f = ($a[a + "2"]() + 1) * (e / 100); else var f = d;
                Ya["setOuter" + c + "AntialiasValue"](f);
                return true;
            },
            _updateZ: function() {
                var a = function(a) {
                    for (var b = 0; b < a.length; b++) {
                        var c = Math.abs(a[b].x2 - a[b].x1) + 1;
                        var d = Math.abs(a[b].y2 - a[b].y1) + 1;
                        a[b].normArea = Math.round(c * d);
                    }
                };
                var b = function(a, b) {
                    if (a.normArea > b.normArea) return 1;
                    return a.normArea < b.normArea ? -1 : 0;
                };
                var c = function(a) {
                    var b = {};
                    for (var c = 0; c < a.length; c++) {
                        if (typeof b[a[c].normArea] == "undefined") b[a[c].normArea] = [];
                        b[a[c].normArea].push(a[c]);
                    }
                    return b;
                };
                var d = sb.get();
                a(d);
                d.sort(b);
                var e = c(d);
                var f = [];
                for (var g in e) {
                    e[g] = wb.sortForReappend(e[g]);
                    f.push(Z.int(g));
                }
                f.sort(function(a, b) {
                    if (a > b) return 1;
                    return a < b ? -1 : 0;
                });
                var h = 1;
                for (var i = 0; i < f.length; i++) {
                    for (var j = 0; j < e[f[i]].length; j++) {
                        e[f[i]][j].item.style.zIndex = h;
                        h++;
                    }
                }
            }
        });
        var ua = function() {
            this._onResize = null;
            this._bindEvents();
            d(this, {
                destroy: function() {
                    this._unbindEvents();
                    return Xa;
                },
                set: function(a, b) {
                    ab.set(a, b);
                    return Xa;
                },
                setApi: function(a, b) {
                    ab.setApi(a, b);
                    return Xa;
                },
                addApi: function(a, b, c) {
                    ab.addApi(a, b, c);
                    return Xa;
                },
                get: function(a) {
                    return ab.get(a);
                },
                toggle: function(a) {
                    return Xa.setApi("toggle", a);
                },
                sort: function(a) {
                    return Xa.setApi("sort", a);
                },
                coordsChanger: function(a) {
                    return Xa.setApi("coordsChanger", a);
                },
                drag: function(a) {
                    return Xa.setApi("drag", a);
                },
                rsort: function(a) {
                    Xa.setApi("rsort", a);
                    Lb.all();
                    return Xa;
                },
                resort: function() {
                    Lb.sync();
                    Ib.resort();
                    Lb.all();
                    return Xa;
                },
                filter: function(a) {
                    Lb.sync();
                    Xa.setApi("filter", a);
                    Kb.filter();
                    Lb.all();
                    return Xa;
                },
                reposition: function() {
                    fb.updateAs();
                    Lb.all();
                    return Xa;
                },
                prepend: function(a, b, c) {
                    var d = g("eq", ab);
                    if (d("loadImages", true)) {
                        var e = d("prepend", "mirrored") ? M.INS_BEFORE : M.PREPEND;
                        ib.schedule(Za.toNative(a), e, {
                            batchSize: b,
                            batchDelay: c,
                            beforeItem: null
                        });
                    } else {
                        if (d("prepend", "mirrored")) Xa.insertBefore(a, null, b, c); else this.exec(M.PREPEND, a, b, c);
                    }
                    return Xa;
                },
                append: function(a, b, c) {
                    if (ab.eq("loadImages", true)) {
                        ib.schedule(Za.toNative(a), M.APPEND, {
                            batchSize: b,
                            batchDelay: c
                        });
                    } else this.exec(M.APPEND, a, b, c);
                    return Xa;
                },
                silentAppend: function(a, b, c) {
                    if (ab.eq("loadImages", true)) {
                        ib.schedule(Za.toNative(a), M.SIL_APPEND, {
                            batchSize: b,
                            batchDelay: c
                        });
                    } else this.execSilentAppend(a, b, c);
                    return Xa;
                },
                silentRender: function(a, b, c) {
                    Db.exec(a, b, c);
                    return Xa;
                },
                getSilent: function(a) {
                    return Db.getScheduled(a);
                },
                insertBefore: function(a, b, c, d) {
                    if (ab.eq("loadImages", true)) {
                        ib.schedule(Za.toNative(a), M.INS_BEFORE, {
                            batchSize: c,
                            batchDelay: d,
                            beforeItem: b
                        });
                    } else this.exec(M.INS_BEFORE, a, c, d, b);
                    return Xa;
                },
                insertAfter: function(a, b, c, d) {
                    if (ab.eq("loadImages", true)) {
                        ib.schedule(Za.toNative(a), M.INS_AFTER, {
                            batchSize: c,
                            batchDelay: d,
                            afterItem: b
                        });
                    } else this.exec(M.INS_AFTER, a, c, d, b);
                    return Xa;
                },
                appendNew: function(a, b) {
                    Xa.append(Xa.collectNew(), a, b);
                    return Xa;
                },
                prependNew: function(a, b) {
                    Xa.prepend(Xa.collectNew(), a, b);
                    return Xa;
                },
                rotate: function(a, b, c, d) {
                    Xa.toggle(b);
                    var a = Za.toNative(a);
                    if (typeof c == "undefined") {
                        Ab.rotate(a);
                        return Xa;
                    }
                    Ob.scheduleFnExec(a, c, d, function(a) {
                        Ab.rotate(a);
                    });
                    return Xa;
                }
            });
        };
        c(ua, {
            _bindEvents: function() {
                var a = g("get", ab);
                var b = null;
                this._onResize = function() {
                    if (a("vpResizeDelay") == null) {
                        Xa.reposition();
                        return;
                    }
                    clearTimeout(b);
                    b = setTimeout(function() {
                        Xa.reposition();
                    }, a("vpResizeDelay"));
                };
                X.add(window, "resize", this._onResize);
            },
            _unbindEvents: function() {
                X.rm(window, "resize", this._onResize);
                if (Xa.isDragifierOn()) Xa.dragifierOff();
            },
            exec: function(a, b, c, d, e) {
                setTimeout(function() {
                    Ob.schedule(a, b, c, d, e);
                }, I.REFLOW_FIX_DELAY);
            },
            execSilentAppend: function(a, b, c) {
                Db.schedule(Za.toNative(a));
                this.exec(M.APPEND, a, b, c);
            }
        });
        var va = function() {
            this._callbacks = {};
            this._insertEvTimeout = null;
            this._init();
        };
        c(va, {
            _init: function() {
                var a = this;
                var b = function(b, c, d) {
                    for (var e in b) {
                        var f = b[e];
                        this._callbacks[f] = c ? null : [];
                        (function(b) {
                            d["on" + b] = function(d) {
                                if (!c) a._callbacks[b].push(d); else a._callbacks[b] = d;
                            };
                        })(f);
                    }
                };
                b.call(a, Q, false, Xa);
                b.call(a, R, true, a);
            },
            _getArgs: function(a, b, c) {
                if (!Z.hasVal(a, b)) e("no " + b + " to emit");
                var d = [];
                Array.prototype.push.apply(d, c);
                d.shift();
                return d;
            },
            emit: function(a) {
                var b = this._getArgs(Q, a, arguments);
                var c = this;
                if (a == Q.INSERT) {
                    this._emitInsertEvent(b[0]);
                    return;
                }
                for (var d = 0; d < this._callbacks[a].length; d++) {
                    if (a == Q.REPOSITION || a == Q.REPOSITION_END) {
                        (function(a, b) {
                            setTimeout(function() {
                                a.apply(c, b);
                            }, 0);
                        })(this._callbacks[a][d], b);
                    } else this._callbacks[a][d].apply(this, b);
                }
                if (a == Q.HIDE && db.isNotCollectable(b[0])) {
                    for (var d = 0; d < this._callbacks[Q.DISCONNECT].length; d++) this._callbacks[Q.DISCONNECT][d](b[0]);
                }
            },
            _emitInsertEvent: function(a) {
                var b = function(a) {
                    for (var b = 0; b < this._callbacks[Q.INSERT].length; b++) this._callbacks[Q.INSERT][b](a);
                };
                if (this._insertEvTimeout != null) {
                    clearTimeout(this._insertEvTimeout);
                    this._insertEvTimeout = null;
                    a = a.concat(this._insertEvItems);
                }
                var c = this;
                this._insertEvItems = a;
                this._insertEvTimeout = setTimeout(function() {
                    c._insertEvTimeout = null;
                    b.call(c, a);
                }, 20);
            },
            emitInternal: function(a) {
                var b = this._getArgs(R, a, arguments);
                if (this._callbacks[a] == null) return;
                this._callbacks[a].apply(this, b);
                if (a == R.REPOSITION_END_FOR_DRAG) this._callbacks[a] = null;
            },
            rmInternal: function(a) {
                this._getArgs(R, a, arguments);
                this._callbacks[a] = null;
            }
        });
        var wa = function() {
            var a = this;
            d(this, {
                first: function() {
                    return a.get("first");
                },
                last: function() {
                    return a.get("last");
                },
                next: function(b) {
                    return a.get("next", b);
                },
                prev: function(b) {
                    return a.get("prev", b);
                },
                all: function() {
                    return a.get("all");
                }
            });
        };
        c(wa, {
            get: function(a, b) {
                var c = sb.get();
                if (c.length == 0) return a == "all" ? [] : null;
                c = wb.sortForReappend(c);
                if (a == "first") return c[0].item; else if (a == "last") return c[c.length - 1].item;
                var d = function(a, b) {
                    return eb.get(a) == eb.get(Za.toNative(b)[0]);
                };
                if (a == "next") {
                    for (var e = 0; e < c.length; e++) {
                        if (d(c[e].item, b)) return e + 1 > c.length - 1 ? null : c[e + 1].item;
                    }
                } else if (a == "prev") {
                    for (var e = c.length - 1; e >= 0; e--) {
                        if (d(c[e].item, b)) return e - 1 < 0 ? null : c[e - 1].item;
                    }
                } else if (a == "all") {
                    var f = [];
                    for (var e = 0; e < c.length; e++) f.push(c[e].item);
                    return f;
                }
                return null;
            }
        });
        var xa = function() {
            this._last = null;
        };
        c(xa, {
            isInitial: function(a) {
                if (this._last == null) {
                    this._last = a;
                    return true;
                }
                return false;
            },
            isSameAsPrev: function(a) {
                if (this._last != a) {
                    this._last = a;
                    return false;
                }
                return true;
            },
            setLast: function(a) {
                this._last = a;
            }
        });
        var ya = function(a, b, c, d, e) {
            this._op = b;
            this._crInitialCr = c;
            this._addItemCrs = d;
            this._cantFitCond = e;
            var f = this;
            a.recreateCrs = g("_recreateCrs", this);
            a.createInitialCr = g("_createInitialCr", this);
        };
        c(ya, {
            initCrs: function(a, b, c) {
                if (hb.isInitial(this._op)) {
                    this._createInitialCr();
                    return;
                }
                if (hb.isSameAsPrev(this._op)) return;
                this._recreateCrs();
                kb["rmIntFrom" + a]();
                kb["rmAllToo" + b + "FromMost" + c]();
            },
            _createInitialCr: function() {
                this._crInitialCr(jb, $a);
            },
            _recreateCrs: function(a) {
                var a = a || false;
                if (!a) jb.flush();
                var b = sb.get();
                for (var c = 0; c < b.length; c++) this._addItemCrs.call(this, b[c], b[c].itemGUID);
                if (jb.count() == 0) this._createInitialCr();
            },
            cleanCrs: function(a, b, c) {
                kb["rmAllToo" + b + "FromMost" + c]();
                kb["rmIntFrom" + a]();
            },
            filterCrs: function(a, b, c, d, e) {
                var f = jb.getClone();
                ob.attach(f);
                ob["selectOnlyFrom" + a](b);
                f = ob.getSelected();
                if (ab.eq("intersections", true)) {
                    pb.attach(f);
                    pb.shiftAll();
                    f = pb.getNew();
                } else {
                    ob.attach(f);
                    ob["selectOnlyMost" + c](b);
                    f = ob.getSelected();
                    pb.attach(f);
                    pb["shiftAllTo" + d](b);
                    f = pb.getNew();
                }
                qb.attach(f);
                qb["sortFor" + e]();
                return qb.getSorted();
            },
            findCnCoords: function(a, b, c, d, f, g, h) {
                var i = null;
                for (var j = 0; j < b.length; j++) {
                    var k = rb.find(this._op, a, b[j]);
                    if (this._cantFitCond.call(this, k)) {
                        continue;
                    }
                    var l = ub["findAllMaybeIntOn" + c](b[j]);
                    if (ub.isIntersectingAny(l, k)) {
                        continue;
                    }
                    i = k;
                    var m = sb["getAll" + d](k[f]);
                    if (tb["isAnyGUID" + g + "Than"](m, a)) {
                        continue;
                    }
                    if (ab.eq("intersections", false) && sb["isIntMoreThanOneCn" + h](i)) {
                        i = null;
                    }
                    if (i != null) {
                        break;
                    }
                }
                if (i == null) e(P.TOO_BIG_ITEM);
                return i;
            },
            createCn: function(a, b, c) {
                var d = sb.add(a, b);
                if (ab.eq("intersections", false)) {
                    if (ab.eq("grid", "vertical")) sb.expandYAllRowCnsToMostTall(d); else sb.expandXAllColCnsToMostWide(d);
                }
                this._addItemCrs.call(this, d, eb.get(a));
                return d;
            },
            render: function(a, b) {
                if (ab.eq("intersections", true)) Ab.show(b); else {
                    if (ab.eq("grid", "vertical")) var c = sb.getLastRowYExpandedCns(); else var c = sb.getLastColXExpandedCns();
                    for (var d = 0; d < c.length; d++) {
                        if (c[d].itemGUID == b.itemGUID) {
                            c.splice(d, 1);
                            d--;
                        }
                    }
                    Ab.renderAfterDelay(c);
                    Ab.show(b);
                }
            },
            fixAllXYPosAfterPrepend: function(a, b) {
                if (ab.eq("grid", "vertical")) var c = sb.fixAllYPosAfterPrepend(a, b); else var c = sb.fixAllXPosAfterPrepend(a, b);
                return c;
            },
            renderAfterPrependFix: function(a) {
                Ab.render(sb.get(), [ a ]);
            }
        });
        var za = function() {
            this._fixRoundingVal = 1;
        };
        c(za, {
            fixLowRounding: function(a) {
                return a - this._fixRoundingVal;
            },
            fixHighRounding: function(a) {
                return a + this._fixRoundingVal;
            }
        });
        z = function() {
            this._cells = [];
        };
        c(z, {
            cells: function() {
                return this._cells;
            },
            discretize: function() {
                var a = tb.getMinWidth();
                var b = tb.getMinHeight();
                var c = ab.eq("append", "default") ? "Def" : "Rev";
                this._cells = Yb["discretizeOn" + c + "Append"](a, b);
            },
            intCellsToCoords: function(a) {
                var b = {
                    x1: a[0].x1,
                    x2: a[0].x2,
                    y1: a[0].y1,
                    y2: a[0].y2
                };
                for (var c = 1; c < a.length; c++) {
                    if (a[c].x1 < b.x1) b.x1 = a[c].x1;
                    if (a[c].x2 > b.x2) b.x2 = a[c].x2;
                    if (a[c].y1 < b.y1) b.y1 = a[c].y1;
                    if (a[c].y2 > b.y2) b.y2 = a[c].y2;
                }
                return b;
            },
            markIntCellsBy: function(a) {
                for (var b = 0; b < this._cells.length; b++) {
                    for (var c = 0; c < this._cells[b].length; c++) {
                        var d = this._cells[b][c];
                        var e = {
                            x1: d.centerX,
                            x2: d.centerX,
                            y1: d.centerY,
                            y2: d.centerY
                        };
                        this._cells[b][c].isInt = ub.isIntersectingAny([ e ], a);
                    }
                }
            },
            getAllCellsWithIntCenter: function(a) {
                var b = [];
                var c = [];
                var d = {
                    rows: 0,
                    cols: 0
                };
                var e = function(a) {
                    for (var b = 0; b < c.length; b++) {
                        if (c[b] == a) return true;
                    }
                    return false;
                };
                for (var f = 0; f < this._cells.length; f++) {
                    var g = false;
                    var h = [];
                    for (var i = 0; i < this._cells[f].length; i++) {
                        var j = this._cells[f][i];
                        var k = {
                            x1: j.centerX,
                            x2: j.centerX,
                            y1: j.centerY,
                            y2: j.centerY
                        };
                        if (ub.isIntersectingAny([ k ], a)) {
                            h.push(j);
                            if (!g) {
                                d.rows++;
                                g = true;
                            }
                            if (!e(i)) {
                                d.cols++;
                                c.push(i);
                            }
                        }
                    }
                    if (h.length > 0) b.push(h);
                }
                return {
                    intCells: b,
                    "int": d
                };
            }
        });
        A = function() {};
        c(A, {
            _rev: function(a) {
                var b = [];
                var c = 0;
                for (var d = 0; d < a.length; d++) {
                    if (a[d].length > c) c = a[d].length;
                }
                var e = 0;
                for (var f = 0; f < c; f++) {
                    var g = [];
                    for (var h = 0; h < a.length; h++) {
                        if (typeof a[h][e] != "undefined") g.push(a[h][e]);
                    }
                    b.push(g);
                    e++;
                }
                return b;
            },
            _coords: function(a) {
                a.isInt = false;
                a.centerX = a.x1 + (a.x2 - a.x1 + 1) / 2;
                a.centerY = a.y1 + (a.y2 - a.y1 + 1) / 2;
                return a;
            },
            _onDefAppend: function(a, b, c, d, e) {
                var f = [];
                var g = -1;
                var h = true;
                while (h) {
                    var i = [];
                    var j = -1;
                    var k = true;
                    while (k) {
                        j += b;
                        if (j > d) k = false; else i.push(this._coords(e(g, j, a, b)));
                    }
                    f.push(i);
                    g += a;
                    if (g + a > c) h = false;
                }
                return f;
            },
            _onRevAppend: function(a, b, c, d, e) {
                var f = [];
                var g = -1;
                var h = true;
                while (h) {
                    var i = [];
                    var j = c + 1;
                    var k = true;
                    while (k) {
                        j -= b;
                        if (j < 0) k = false; else i.unshift(this._coords(e(g, j, a, b)));
                    }
                    f.push(i);
                    g += a;
                    if (g + a > d) h = false;
                }
                return f;
            },
            discretizeOnDefAppend: function(a, b) {
                var c = {
                    vg: function(a, b, c, d) {
                        return {
                            x1: b - d + 1,
                            x2: b,
                            y1: a + 1,
                            y2: a + c
                        };
                    },
                    hg: function(a, b, c, d) {
                        return {
                            x1: a + 1,
                            x2: a + c,
                            y1: b - d + 1,
                            y2: b
                        };
                    }
                };
                if (ab.eq("grid", "vertical")) return this._onDefAppend(b, a, $a.y2(), $a.x2(), c.vg); else return this._rev(this._onDefAppend(a, b, $a.x2(), $a.y2(), c.hg));
            },
            discretizeOnRevAppend: function(a, b) {
                var c = {
                    vg: function(a, b, c, d) {
                        return {
                            x1: b,
                            x2: b + d - 1,
                            y1: a + 1,
                            y2: a + c
                        };
                    },
                    hg: function(a, b, c, d) {
                        return {
                            x1: a + 1,
                            x2: a + c,
                            y1: b,
                            y2: b + d - 1
                        };
                    }
                };
                if (ab.eq("grid", "vertical")) return this._onRevAppend(b, a, $a.x2(), $a.y2(), c.vg); else return this._rev(this._onRevAppend(a, b, $a.y2(), $a.x2(), c.hg));
            },
            _normalizeCnXYCoords: function(a, b, c, d, e, f, g) {
                var h = b[e] - b[d] + 1;
                var i = Ya["outer" + c](a, true);
                if (h < i || i < h) {
                    if (g) {
                        if (ab.eq("append", "default")) b[d] = b[e] - i + 1; else b[e] = b[d] + i - 1;
                    } else b[e] = b[d] + i - 1;
                }
                if (b[d] < 0) {
                    b[d] = 0;
                    b[e] = i - 1;
                }
                if (b[e] > f) {
                    b[e] = f;
                    b[d] = b[e] - i + 1;
                }
                return b;
            },
            normalizeCnXCoords: function(a, b) {
                var c = [ a, b, "Width", "x1", "x2", $a.x2() ];
                c.push(ab.eq("grid", "vertical"));
                return this._normalizeCnXYCoords.apply(this, c);
            },
            normalizeCnYCoords: function(a, b) {
                var c = [ a, b, "Height", "y1", "y2", $a.y2() ];
                c.push(!ab.eq("grid", "vertical"));
                return this._normalizeCnXYCoords.apply(this, c);
            }
        });
        C = function() {
            this._items = [];
            this._isDragging = false;
            this._areEventsBinded = false;
            this._origReposQueueSize = null;
            this._coordsChanger = Xb.getCoordsChanger();
            this._createEvents();
            if (!ab.eq("dragifier", false)) this._bindEvents();
            d(this, {
                dragifierOn: function() {
                    this._bindEvents();
                },
                dragifierOff: function() {
                    this._unbindEvents();
                },
                isDragifierOn: function() {
                    return this._areEventsBinded;
                }
            });
        };
        c(C, {
            _createEvents: function() {
                var a = this;
                this._touch = {
                    start: function(b) {
                        a._touchStart.call(a, b);
                    },
                    end: function(b) {
                        if (!a._isDragging) return;
                        b.preventDefault();
                        setTimeout(function() {
                            a._touchEnd.call(a, b);
                        }, 0);
                    },
                    move: function(b) {
                        if (!a._isDragging) return;
                        b.preventDefault();
                        setTimeout(function() {
                            a._touchMove.call(a, b);
                        }, 0);
                    }
                };
                this._mouse = {
                    down: function(b) {
                        a._mouseDown.call(a, b);
                    },
                    up: function(b) {
                        setTimeout(function() {
                            a._mouseUp.call(a, b);
                        }, 0);
                    },
                    move: function(b) {
                        setTimeout(function() {
                            a._mouseMove.call(a, b);
                        }, 0);
                    }
                };
            },
            _touchStart: function(a) {
                var b = this;
                var c = a.changedTouches[0];
                var d = b._findClosestConnected(a.target);
                if (d == null) return;
                b._initDrag.call(b, a);
                if (b._isAlreadyDraggable(d)) {
                    b._findAlreadyDraggable(d).addDragId(c.identifier);
                    return;
                }
                b._initDraggableItem.call(b, d, c, true);
            },
            _touchEnd: function(a) {
                var b = this;
                if (!b._isDragging) return;
                var c = a.changedTouches;
                for (var d = 0; d < c.length; d++) {
                    var e = b._findDraggableById(c[d].identifier, true);
                    if (e.item == null) continue;
                    e.item.rmDragId(c[d].identifier);
                    if (e.item.getDragIdsCount() == 0) {
                        e.item.unbind();
                        b._items.splice(e.itemIndex, 1);
                    }
                }
                if (b._items.length == 0) b._endDrag();
            },
            _touchMove: function(a) {
                var b = this;
                if (!b._isDragging) return;
                b._reposQueueSync();
                var c = a.changedTouches;
                for (var d = 0; d < c.length; d++) {
                    var e = b._findDraggableById(c[d].identifier);
                    if (e == null) continue;
                    e.dragMove(c[d].pageX, c[d].pageY);
                }
            },
            _mouseDown: function(a) {
                var b = this;
                var c = b._findClosestConnected(a.target);
                if (c == null || Z.browsers.isAndroidUC()) return;
                b._initDrag.call(b, a);
                b._initDraggableItem.call(b, c, a, false);
            },
            _mouseUp: function(a) {
                var b = this;
                if (!b._isDragging || Z.browsers.isAndroidUC()) return;
                b._endDrag();
                b._items[0].unbind();
                b._items.splice(0, 1);
            },
            _mouseMove: function(a) {
                var b = this;
                if (!b._isDragging || Z.browsers.isAndroidUC()) return;
                b._reposQueueSync();
                b._items[0].dragMove(a.pageX, a.pageY);
            },
            _initDrag: function(a) {
                a.preventDefault();
                this._reposQueueOff();
                Xb.getSelectToggler().disableSelect();
                Ya.startCachingTransaction();
                this._isDragging = true;
            },
            _endDrag: function() {
                this._reposQueueOn();
                Xb.getSelectToggler().enableSelect();
                Ya.stopCachingTransaction();
                this._isDragging = false;
            },
            _initDraggableItem: function(a, b, c) {
                var d = this._createDraggableItem();
                d.bind(a, b.pageX, b.pageY);
                if (c) d.addDragId(b.identifier);
                this._items.push(d);
            },
            _toggleEvents: function(a) {
                X[a]($a.get(), "mousedown", this._mouse.down);
                X[a](document.body, "mouseup", this._mouse.up);
                X[a](document.body, "mousemove", this._mouse.move);
                X[a]($a.get(), "touchstart", this._touch.start);
                X[a](document.body, "touchend", this._touch.end);
                X[a](document.body, "touchmove", this._touch.move);
            },
            _bindEvents: function() {
                if (this._areEventsBinded) return;
                this._areEventsBinded = true;
                this._toggleEvents("add");
            },
            _unbindEvents: function() {
                if (!this._areEventsBinded) return;
                this._areEventsBinded = false;
                this._toggleEvents("rm");
            },
            _reposQueueOff: function() {
                if (ab.eq("disableQueueOnDrags", false)) return;
                this._origReposQueueSize = ab.get("queueSize");
                this._reposQueueSync();
            },
            _reposQueueOn: function() {
                if (ab.eq("disableQueueOnDrags", false)) return;
                ab.set("queueSize", this._origReposQueueSize);
            },
            _reposQueueSync: function() {
                if (ab.eq("disableQueueOnDrags", false)) return;
                ab.set("queueSize", Xa.all().length);
            },
            _findClosestConnected: function(a) {
                if (a == $a.get()) return null;
                var b = ab.get("dragifier");
                var c = typeof b == "string" || b instanceof String;
                var d = null;
                var e = null;
                var f = false;
                while (d == null && e != $a.get()) {
                    e = e == null ? a : e.parentNode;
                    if (c) {
                        if (Z.css.hasClass(e, b)) f = true;
                    }
                    if (Za.isConnected(e)) d = e;
                }
                return d == null || c && !f ? null : d;
            },
            _createDraggableItem: function() {
                return ab.eq("dragifierMode", "i") ? new E() : new G();
            },
            _isAlreadyDraggable: function(a) {
                for (var b = 0; b < this._items.length; b++) {
                    if (eb.get(this._items[b].get()) == eb.get(a)) return true;
                }
                return false;
            },
            _findAlreadyDraggable: function(a) {
                for (var b = 0; b < this._items.length; b++) {
                    if (eb.get(this._items[b].get()) == eb.get(a)) return this._items[b];
                }
                e("Drag.item NF.");
            },
            _findDraggableById: function(a, b) {
                var b = b || false;
                for (var c = 0; c < this._items.length; c++) {
                    if (this._items[c].hasDragId(a)) {
                        if (b) return {
                            item: this._items[c],
                            itemIndex: c
                        }; else return this._items[c];
                    }
                }
            },
            render: function(a, b, c) {
                this._coordsChanger(a, b, c, Z);
            }
        });
        D = function() {
            this._itemCenterCursorOffset = {
                x: null,
                y: null
            };
            this._gridOffset = {
                left: null,
                top: null
            };
            this._repositionTimeout = null;
        };
        c(D, {
            calcGridOffsets: function() {
                this._gridOffset.left = Ya.offsetLeft($a.get());
                this._gridOffset.top = Ya.offsetTop($a.get());
            },
            _getOffset: function(a, b, c, d, e, f, g) {
                var b = b || false;
                var h = tb.find(a);
                if (ab.eq("intersections", false) && ab.eq("grid", c)) var i = h[d + "Offset"]; else var i = 0;
                if (!b) return this._gridOffset[e] + h[g] + i;
                var j = Ya["outer" + f](a);
                var k = Ya["outer" + f](a, true);
                var l = k - j;
                var m = l / 2;
                return this._gridOffset[e] + h[g] - m + i;
            },
            _getOffsetLeft: function(a, b) {
                return this._getOffset(a, b, "horizontal", "h", "left", "Width", "x1");
            },
            _getOffsetTop: function(a, b) {
                return this._getOffset(a, b, "vertical", "v", "top", "Height", "y1");
            },
            findItemCenterCursorOffsets: function(a, b, c) {
                var d = this._getOffsetLeft(a) + Ya.outerWidth(a, true) / 2;
                var e = this._getOffsetTop(a) + Ya.outerHeight(a, true) / 2;
                this._itemCenterCursorOffset = {
                    x: d - b,
                    y: e - c
                };
            },
            createClone: function(a) {
                var b = a.cloneNode(true);
                var c = {
                    left: this._getOffsetLeft(a),
                    top: this._getOffsetTop(a)
                };
                db.markAsNotCollectable(b);
                ab.getApi("drag")(b, a, Ya);
                if (Z.hasTransitions()) {
                    Z.css3.transform(b, "");
                    Z.css3.transition(b, "none");
                }
                Z.css.set(b, {
                    width: Ya.outerWidth(a) + "px",
                    height: Ya.outerHeight(a) + "px",
                    zIndex: I.MAX_Z,
                    left: c.left + "px",
                    top: c.top + "px"
                });
                Z.css.set4(b, "margin", $.getComputedCSS(a));
                document.body.appendChild(b);
                _b.render(b, c.left, c.top);
                return b;
            },
            createPointer: function(a) {
                var b = {
                    left: this._getOffsetLeft(a, true),
                    top: this._getOffsetTop(a, true)
                };
                var c = Z.div();
                Z.css.set(c, {
                    width: Ya.outerWidth(a, true) + "px",
                    height: Ya.outerHeight(a, true) + "px",
                    position: "absolute",
                    left: b.left - this._gridOffset.left + "px",
                    top: b.top - this._gridOffset.top + "px"
                });
                var d = $.getComputedCSS(a);
                $a.get().appendChild(c);
                Xb.getPointerStyler()(c, Z);
                var e = parseFloat(d.marginLeft);
                var f = parseFloat(d.marginTop);
                _b.render(c, b.left - this._gridOffset.left + (isNaN(e) ? 0 : e), b.top - this._gridOffset.top + (isNaN(f) ? 0 : f));
                return c;
            },
            calcCloneNewDocPosition: function(a, b, c) {
                return {
                    x: b - Ya.outerWidth(a, true) / 2 - this._itemCenterCursorOffset.x * -1,
                    y: c - Ya.outerHeight(a, true) / 2 - this._itemCenterCursorOffset.y * -1
                };
            },
            calcCloneNewGridPosition: function(a, b) {
                return {
                    x1: b.x - this._gridOffset.left,
                    x2: b.x + Ya.outerWidth(a, true) - 1 - this._gridOffset.left,
                    y1: b.y - this._gridOffset.top,
                    y2: b.y + Ya.outerHeight(a, true) - 1 - this._gridOffset.top
                };
            },
            hasDragId: function(a, b) {
                for (var c = 0; c < b.length; c++) {
                    if (b[c] == a) return true;
                }
                return false;
            },
            rmDragId: function(a, b) {
                for (var c = 0; c < b.length; c++) {
                    if (b[c] == a) {
                        b.splice(c, 1);
                        break;
                    }
                }
            },
            initItem: function(a) {
                if (Z.hasTransitions()) Z.css3.transitionProperty(a, "Visibility 0ms ease");
            },
            hideItem: function(a) {
                a.style.visibility = "hidden";
                Z.set(a, I.IS_DRAGGABLE_DATA, "y");
            },
            showItem: function(a) {
                a.style.visibility = "visible";
                Z.rm(a, I.IS_DRAGGABLE_DATA);
            },
            repositionItems: function() {
                if (ab.eq("append", "default")) var a = function() {
                    Eb.createInitialCr();
                }; else var a = function() {
                    Gb.createInitialCr();
                };
                jb.setNextFlushCb(a);
                _a.onRepositionEndForDrag(function() {
                    var a = wb.sortForReappend(sb.get());
                    var b = [];
                    for (var c = 0; c < a.length; c++) b.push(a[c].item);
                    _a.emit(Q.DRAG_END, b);
                });
                this._reposition();
            },
            _reposition: function() {
                if (!Z.browsers.isAndroidFirefox() && !Z.browsers.isAndroidUC()) {
                    Lb.all();
                    return;
                }
                clearTimeout(this._repositionTimeout);
                this._repositionTimeout = setTimeout(function() {
                    Lb.all();
                }, I.DRAGIFIER_REPOS_DELAY);
            }
        });
        E = function() {
            this._dragIds = [];
            this._item = null;
            this._clone = null;
        };
        c(E, {
            get: function() {
                return this._item;
            },
            addDragId: function(a) {
                this._dragIds.push(a);
            },
            hasDragId: function(a) {
                return Zb.hasDragId(a, this._dragIds);
            },
            rmDragId: function(a) {
                Zb.rmDragId(a, this._dragIds);
            },
            getDragIdsCount: function() {
                return this._dragIds.length;
            },
            bind: function(a, b, c) {
                this._item = a;
                Zb.initItem(a);
                Zb.calcGridOffsets();
                Zb.findItemCenterCursorOffsets(a, b, c);
                this._clone = Zb.createClone(a);
                Zb.hideItem(a);
            },
            unbind: function() {
                document.body.removeChild(this._clone);
                Zb.showItem(this._item);
                this._item = null;
            },
            dragMove: function(a, b) {
                var c = Zb.calcCloneNewDocPosition(this._item, a, b);
                var d = Zb.calcCloneNewGridPosition(this._item, c);
                _b.render(this._clone, c.x, c.y);
                var e = this._getNewIntCns(d);
                if (e.length == 0) return;
                if (ab.eq("sortDispersion", false)) {
                    this._swapGUIDS(e);
                    Zb.repositionItems();
                } else {
                    if (this._swapPositions(e)) Zb.repositionItems();
                }
            },
            _getNewIntCns: function(a) {
                var b = eb.get(this._item);
                var c = ub.getAllWithIntersectedCenter(a);
                var d = [];
                for (var e = 0; e < c.length; e++) {
                    if (c[e].itemGUID != b) d.push(c[e]);
                }
                return d;
            },
            _swapGUIDS: function(a) {
                var b = eb.get(this._item);
                var c = a[0];
                for (var d = 0; d < a.length; d++) {
                    if (a[d].itemGUID < c.itemGUID) c = a[d];
                }
                eb.set(this._item, c.itemGUID);
                eb.set(this._clone, c.itemGUID);
                eb.set(c.item, b);
            },
            _swapPositions: function(a) {
                var b = tb.find(this._item, true);
                if (b == null) return false;
                a = wb.sortForReappend(a);
                var c = a[0];
                var d = eb.get(c.item);
                var e = eb.get(this._item);
                eb.set(this._item, d);
                eb.set(c.item, e);
                this._swapCnData(b, c, d);
                return true;
            },
            _swapCnData: function(a, b, c) {
                var d = a.item;
                a.item = b.item;
                b.item = d;
                var e = a.itemGUID;
                a.itemGUID = c;
                b.itemGUID = e;
            }
        });
        F = function() {};
        c(F, {
            getIntCellsData: function(a) {
                if (a.int.cols == 0 && a.int.rows == 0) {
                    a.int.cols = 1;
                    a.int.rows = 1;
                }
                return a;
            },
            isAnyIntCellEmpty: function(a) {
                var b = a.intCells;
                var c = false;
                for (var d = 0; d < b.length; d++) {
                    for (var e = 0; e < b[d].length; e++) {
                        if (!b[d][e].isInt) c = true;
                    }
                }
                return c;
            },
            isIntEnoughRowsAndCols: function(a, b) {
                if (b.int.rows < a.int.rows || b.int.cols < a.int.cols) return false;
                return true;
            },
            normalizeOverflowedCells: function(a, b, c) {
                if (c.int.rows > b.int.rows) {
                    var d = c.int.rows - b.int.rows;
                    for (var e = 0; e < d; e++) a.pop();
                }
                if (c.int.cols > b.int.cols) {
                    var f = c.int.cols - b.int.cols;
                    for (var g = 0; g < a.length; g++) {
                        for (var e = 0; e < f; e++) a[g].pop();
                    }
                }
                var h = [];
                for (var g = 0; g < a.length; g++) {
                    for (var i = 0; i < a[g].length; i++) h.push(a[g][i]);
                }
                return h;
            }
        });
        G = function() {
            this._dragIds = [];
            this._item = null;
            this._itemCn = null;
            this._clone = null;
            this._pointer = null;
            this._discretizer = new z();
        };
        c(G, {
            get: function() {
                return this._item;
            },
            addDragId: function(a) {
                this._dragIds.push(a);
            },
            hasDragId: function(a) {
                return Zb.hasDragId(a, this._dragIds);
            },
            rmDragId: function(a) {
                Zb.rmDragId(a, this._dragIds);
            },
            getDragIdsCount: function() {
                return this._dragIds.length;
            },
            bind: function(a, b, c) {
                this._item = a;
                Zb.initItem(a);
                this._initCn();
                Zb.calcGridOffsets();
                Zb.findItemCenterCursorOffsets(a, b, c);
                this._clone = Zb.createClone(a);
                this._pointer = Zb.createPointer(a);
                this._discretizer.discretize();
                this._discretizer.markIntCellsBy(this._itemCn);
                Zb.hideItem(a);
            },
            _initCn: function() {
                this._itemCn = tb.find(this._item);
                this._itemCn.restrictCollect = true;
            },
            unbind: function() {
                document.body.removeChild(this._clone);
                $a.get().removeChild(this._pointer);
                Zb.showItem(this._item);
                this._item = null;
                this._itemCn.restrictCollect = false;
            },
            dragMove: function(a, b) {
                var c = Zb.calcCloneNewDocPosition(this._item, a, b);
                var d = Zb.calcCloneNewGridPosition(this._item, c);
                _b.render(this._clone, c.x, c.y);
                var e = $b.getIntCellsData(this._discretizer.getAllCellsWithIntCenter(this._itemCn));
                var f = this._discretizer.getAllCellsWithIntCenter(d);
                if (!$b.isAnyIntCellEmpty(f)) return;
                if (!$b.isIntEnoughRowsAndCols(e, f)) return;
                this._repositionGrid($b.normalizeOverflowedCells(f.intCells, e, f));
            },
            _repositionGrid: function(a) {
                var b = this._discretizer.intCellsToCoords(a);
                b = Yb.normalizeCnXCoords(this._item, b);
                b = Yb.normalizeCnYCoords(this._item, b);
                this._adjustPosition(b);
                this._discretizer.markIntCellsBy(b);
                setTimeout(function() {
                    Zb.repositionItems();
                }, I.DRAGIFIER_DISCR_REPOS_DELAY);
            },
            _adjustPosition: function(a) {
                var b = [ "x1", "x2", "y1", "y2" ];
                for (var c = 0; c < b.length; c++) this._itemCn[b[c]] = a[b[c]];
                var d = g("get", ab);
                ab.getApi("coordsChanger")(this._item, a.x1 + "px", a.y1 + "px", d("coordsChangeTime"), d("coordsChangeTiming"), Z, Y, d);
                _b.render(this._pointer, a.x1, a.y1);
            }
        });
        var Aa = function() {
            this._position = new ya(this, M.APPEND, function(a) {
                a.create(L.APPEND.DEF, L.RIGHT.TOP, 0, 0);
            }, function(a, b) {
                if (a.y2 + 1 <= $a.y2()) {
                    jb.create(L.APPEND.DEF, L.BOTTOM.LEFT, parseFloat(a.x1), parseFloat(a.y2 + 1), Z.int(b));
                }
                jb.create(L.APPEND.DEF, L.RIGHT.TOP, parseFloat(a.x2 + 1), parseFloat(a.y1), Z.int(b));
            }, function(a) {
                return a.y2 > gb.fixHighRounding($a.y2());
            });
        };
        c(Aa, {
            position: function(a) {
                var b = this._position;
                b.initCrs("Right", "Left", "Right");
                var c = b.filterCrs("Prepended", L.RIGHT.TOP, "Right", "Top", "Append");
                var d = b.createCn(a, b.findCnCoords(a, c, "HgAppend", "BehindX", "x2", "Smaller", "X"), c);
                sb.attachToRanges(d);
                b.cleanCrs("Right", "Left", "Right");
                b.render(a, d);
            }
        });
        var Ba = function() {
            this._cns = [];
        };
        c(Ba, {
            reinitRanges: function() {
                vb.init("x1", "x2");
            },
            attachToRanges: function(a) {
                vb.attachCn(a, sb.get().length - 1, "x1", "x2");
            },
            mapAllIntAndLeftCns: function(a) {
                var b = vb;
                return vb.mapAllIntAndSideCns(a, "x", "x1", "x2", b.lastRngIndexFn(), b.lastRngIndexFn(), b.lowerCrCnIndexesFn(), b.decFn());
            },
            mapAllIntAndRightCns: function(a) {
                var b = vb;
                return vb.mapAllIntAndSideCns(a, "x", "x1", "x2", b.firstRngIndexFn(), b.lastRngIndexFn(), b.upperCrCnIndexesFn(), b.incFn());
            },
            getAllIntYCns: function(a) {
                return vb.getAllCnsFromIntRange(a.x, "x1", "x2");
            },
            getAllIntYAndLeftCns: function(a) {
                return vb.getAllCnsFromIntAndTLSideRgs(a.x, "x1", "x2");
            },
            getAllIntYAndRightCns: function(a) {
                return vb.getAllCnsFromIntAndRBSideRgs(a.x, "x1", "x2");
            },
            getLastColXExpandedCns: function() {
                return xb.getLastXYExpandedCns();
            },
            isIntMoreThanOneCnX: function(a) {
                return xb.isIntMoreThanOneCnXY(a, "x1", "x2");
            },
            getMostWideFromAllXIntCns: function(a) {
                return xb.getMostBigFromAllXYIntCns(a, "x1", "x2");
            },
            getAllXIntCns: function(a) {
                return xb.getAllXYIntCns(a, "x1", "x2");
            },
            expandXAllColCnsToMostWide: function(a) {
                return xb.expandXYAllCnsToMostBig(a, "x1", "x2", "hOffset", "Width");
            },
            get: function() {
                return this._cns;
            },
            count: function() {
                return this._cns.length;
            },
            restore: function(a) {
                this._cns = this._cns.concat(a);
            },
            add: function(a, b) {
                var c = tb.create(a, b);
                this._cns.push(c);
                _a.emit(Q.REPOSITION, c.item, c, this);
                return c;
            },
            rm: function(a) {
                tb.rm(this._cns, a);
            },
            restoreOnSortDispersion: function(a) {
                tb.restoreOnSortDispersion(a, function(a, b, c) {
                    var d = b.y2 + 1;
                    for (var e = 0; e < a.length; e++) {
                        c(a[e], b.x1, d++);
                    }
                }, function(a, b, c) {
                    var d = b.y1 - 1;
                    for (var e = 0; e < a.length; e++) {
                        c(a[e], b.x1, d--);
                    }
                });
                this.restore(a);
            },
            getAllBehindX: function(a) {
                return tb.getAllBACoord(a, function(a, b) {
                    return a.x1 > b;
                });
            },
            getAllBeforeX: function(a) {
                return tb.getAllBACoord(a, function(a, b) {
                    return a.x2 < b;
                });
            },
            fixAllXPosAfterPrepend: function(a, b) {
                return tb.fixAllXYPosAfterPrepend(a, b, "x", "x1", "x2");
            }
        });
        var Ca = function() {};
        c(Ca, {
            find: function(a, b, c) {
                var d = Ya.itemSizes(b);
                var e = parseFloat;
                if (a == M.APPEND) return {
                    x1: e(c.x),
                    x2: e(c.x + d.width - 1),
                    y1: e(c.y),
                    y2: e(c.y + d.height - 1)
                };
                if (a == M.REV_APPEND) return {
                    x1: e(c.x),
                    x2: e(c.x + d.width - 1),
                    y1: e(c.y - d.height + 1),
                    y2: e(c.y)
                };
                if (a == M.PREPEND) return {
                    x1: e(c.x - d.width + 1),
                    x2: e(c.x),
                    y1: e(c.y - d.height + 1),
                    y2: e(c.y)
                };
                if (a == M.REV_PREPEND) return {
                    x1: e(c.x - d.width + 1),
                    x2: e(c.x),
                    y1: e(c.y),
                    y2: e(c.y + d.height - 1)
                };
            }
        });
        var Da = function() {
            this._position = new ya(this, M.PREPEND, function(a, b) {
                a.create(L.PREPEND.DEF, L.TOP.RIGHT, 0, b.y2());
            }, function(a, b) {
                if (a.y1 - 1 >= 0) {
                    jb.create(L.PREPEND.DEF, L.TOP.RIGHT, parseFloat(a.x2), parseFloat(a.y1 - 1), Z.int(b));
                }
                jb.create(L.PREPEND.DEF, L.LEFT.BOTTOM, parseFloat(a.x1 - 1), parseFloat(a.y2), Z.int(b));
            }, function(a) {
                return a.y1 < gb.fixLowRounding(0);
            });
        };
        c(Da, {
            position: function(a) {
                var b = this._position;
                b.initCrs("Left", "Right", "Left");
                var c = b.filterCrs("Appended", L.LEFT.BOTTOM, "Left", "Bottom", "Prepend");
                var d = b.createCn(a, b.findCnCoords(a, c, "HgPrepend", "BeforeX", "x1", "Bigger", "X"), c);
                eb.markIfFirstPrepended(a);
                var e = b.fixAllXYPosAfterPrepend(d, jb.get());
                sb.attachToRanges(d);
                b.cleanCrs("Left", "Right", "Left");
                if (e) b.renderAfterPrependFix(d);
                b.render(a, d);
            }
        });
        var Ea = function() {
            this._position = new ya(this, M.REV_APPEND, function(a, b) {
                a.create(L.APPEND.REV, L.TOP.LEFT, 0, parseFloat(b.y2()));
            }, function(a, b) {
                if (a.y1 - 1 >= 0) {
                    jb.create(L.APPEND.REV, L.TOP.LEFT, parseFloat(a.x1), parseFloat(a.y1 - 1), Z.int(b));
                }
                jb.create(L.APPEND.REV, L.RIGHT.BOTTOM, parseFloat(a.x2 + 1), parseFloat(a.y2), Z.int(b));
            }, function(a) {
                return a.y1 < gb.fixLowRounding(0);
            });
        };
        c(Ea, {
            position: function(a) {
                var b = this._position;
                b.initCrs("Right", "Left", "Right");
                var c = b.filterCrs("Prepended", L.RIGHT.BOTTOM, "Right", "Bottom", "Append");
                var d = b.createCn(a, b.findCnCoords(a, c, "HgAppend", "BehindX", "x2", "Smaller", "X"), c);
                sb.attachToRanges(d);
                b.cleanCrs("Right", "Left", "Right");
                b.render(a, d);
            }
        });
        var Fa = function() {
            this._position = new ya(this, M.REV_PREPEND, function(a, b) {
                a.create(L.PREPEND.REV, L.LEFT.TOP, 0, 0);
            }, function(a, b) {
                if (a.y2 + 1 <= $a.y2()) {
                    jb.create(L.PREPEND.REV, L.BOTTOM.RIGHT, parseFloat(a.x2), parseFloat(a.y2 + 1), Z.int(b));
                }
                jb.create(L.PREPEND.REV, L.LEFT.TOP, parseFloat(a.x1 - 1), parseFloat(a.y1), Z.int(b));
            }, function(a) {
                return a.y2 > gb.fixHighRounding($a.y2());
            });
        };
        c(Fa, {
            position: function(a) {
                var b = this._position;
                b.initCrs("Left", "Right", "Left");
                var c = b.filterCrs("Appended", L.LEFT.TOP, "Left", "Top", "Prepend");
                var d = b.createCn(a, b.findCnCoords(a, c, "HgPrepend", "BeforeX", "x1", "Bigger", "X"), c);
                eb.markIfFirstPrepended(a);
                var e = b.fixAllXYPosAfterPrepend(d, jb.get());
                sb.attachToRanges(d);
                b.cleanCrs("Left", "Right", "Left");
                if (e) b.renderAfterPrependFix(d);
                b.render(a, d);
            }
        });
        var Ga = function() {
            this._position = new ya(this, M.APPEND, function(a) {
                a.create(L.APPEND.DEF, L.RIGHT.TOP, 0, 0);
            }, function(a, b) {
                if (a.x2 + 1 <= $a.x2()) {
                    jb.create(L.APPEND.DEF, L.RIGHT.TOP, parseFloat(a.x2 + 1), parseFloat(a.y1), Z.int(b));
                }
                jb.create(L.APPEND.DEF, L.BOTTOM.LEFT, parseFloat(a.x1), parseFloat(a.y2 + 1), Z.int(b));
            }, function(a) {
                return a.x2 > gb.fixHighRounding($a.x2());
            });
        };
        c(Ga, {
            position: function(a) {
                var b = this._position;
                b.initCrs("Bottom", "Top", "Bottom");
                var c = b.filterCrs("Prepended", L.BOTTOM.LEFT, "Bottom", "Left", "Append");
                var d = b.createCn(a, b.findCnCoords(a, c, "VgAppend", "BelowY", "y2", "Smaller", "Y"), c);
                sb.attachToRanges(d);
                b.cleanCrs("Bottom", "Top", "Bottom");
                b.render(a, d);
            }
        });
        var Ha = function() {
            this._cns = [];
        };
        c(Ha, {
            reinitRanges: function() {
                vb.init("y1", "y2");
            },
            attachToRanges: function(a) {
                vb.attachCn(a, sb.get().length - 1, "y1", "y2");
            },
            mapAllIntAndTopCns: function(a) {
                var b = vb;
                return vb.mapAllIntAndSideCns(a, "y", "y1", "y2", b.lastRngIndexFn(), b.lastRngIndexFn(), b.lowerCrCnIndexesFn(), b.decFn());
            },
            mapAllIntAndBottomCns: function(a) {
                var b = vb;
                return vb.mapAllIntAndSideCns(a, "y", "y1", "y2", b.firstRngIndexFn(), b.lastRngIndexFn(), b.upperCrCnIndexesFn(), b.incFn());
            },
            getAllIntXCns: function(a) {
                return vb.getAllCnsFromIntRange(a.y, "y1", "y2");
            },
            getAllIntXAndTopCns: function(a) {
                return vb.getAllCnsFromIntAndTLSideRgs(a.y, "y1", "y2");
            },
            getAllIntXAndBottomCns: function(a) {
                return vb.getAllCnsFromIntAndRBSideRgs(a.y, "y1", "y2");
            },
            getLastRowYExpandedCns: function() {
                return xb.getLastXYExpandedCns();
            },
            isIntMoreThanOneCnY: function(a) {
                return xb.isIntMoreThanOneCnXY(a, "y1", "y2");
            },
            getMostTallFromAllYIntCns: function(a) {
                return xb.getMostBigFromAllXYIntCns(a, "y1", "y2");
            },
            getAllYIntCns: function(a) {
                return xb.getAllXYIntCns(a, "y1", "y2");
            },
            expandYAllRowCnsToMostTall: function(a) {
                return xb.expandXYAllCnsToMostBig(a, "y1", "y2", "vOffset", "Height");
            },
            get: function() {
                return this._cns;
            },
            count: function() {
                return this._cns.length;
            },
            restore: function(a) {
                this._cns = this._cns.concat(a);
            },
            add: function(a, b) {
                var c = tb.create(a, b);
                this._cns.push(c);
                _a.emit(Q.REPOSITION, c.item, c, this);
                return c;
            },
            rm: function(a) {
                tb.rm(this._cns, a);
            },
            restoreOnSortDispersion: function(a) {
                tb.restoreOnSortDispersion(a, function(a, b, c) {
                    var d = b.x2 + 1;
                    for (var e = 0; e < a.length; e++) {
                        c(a[e], d++, b.y1);
                    }
                }, function(a, b, c) {
                    var d = b.x1 - 1;
                    for (var e = 0; e < a.length; e++) {
                        c(a[e], d--, b.y1);
                    }
                });
                this.restore(a);
            },
            getAllBelowY: function(a) {
                return tb.getAllBACoord(a, function(a, b) {
                    return a.y1 > b;
                });
            },
            getAllAboveY: function(a) {
                return tb.getAllBACoord(a, function(a, b) {
                    return a.y2 < b;
                });
            },
            fixAllYPosAfterPrepend: function(a, b) {
                return tb.fixAllXYPosAfterPrepend(a, b, "y", "y1", "y2");
            }
        });
        var Ia = function() {};
        c(Ia, {
            find: function(a, b, c) {
                var d = Ya.itemSizes(b);
                var e = parseFloat;
                if (a == M.APPEND) return {
                    x1: e(c.x),
                    x2: e(c.x + d.width - 1),
                    y1: e(c.y),
                    y2: e(c.y + d.height - 1)
                };
                if (a == M.REV_APPEND) return {
                    x1: e(c.x - d.width + 1),
                    x2: e(c.x),
                    y1: e(c.y),
                    y2: e(c.y + d.height - 1)
                };
                if (a == M.PREPEND) return {
                    x1: e(c.x),
                    x2: e(c.x + d.width - 1),
                    y1: e(c.y - d.height + 1),
                    y2: e(c.y)
                };
                if (a == M.REV_PREPEND) return {
                    x1: e(c.x - d.width + 1),
                    x2: e(c.x),
                    y1: e(c.y - d.height + 1),
                    y2: e(c.y)
                };
            }
        });
        var Ja = function() {
            this._position = new ya(this, M.PREPEND, function(a) {
                a.create(L.PREPEND.DEF, L.RIGHT.BOTTOM, 0, 0);
            }, function(a, b) {
                if (a.x2 + 1 <= $a.x2()) {
                    jb.create(L.PREPEND.DEF, L.RIGHT.BOTTOM, parseFloat(a.x2 + 1), parseFloat(a.y2), Z.int(b));
                }
                jb.create(L.PREPEND.DEF, L.TOP.LEFT, parseFloat(a.x1), parseFloat(a.y1 - 1), Z.int(b));
            }, function(a) {
                return a.x2 > gb.fixHighRounding($a.x2());
            });
        };
        c(Ja, {
            position: function(a) {
                var b = this._position;
                b.initCrs("Top", "Bottom", "Top");
                var c = b.filterCrs("Appended", L.TOP.LEFT, "Top", "Left", "Prepend");
                var d = b.createCn(a, b.findCnCoords(a, c, "VgPrepend", "AboveY", "y1", "Bigger", "Y"), c);
                eb.markIfFirstPrepended(a);
                var e = b.fixAllXYPosAfterPrepend(d, jb.get());
                sb.attachToRanges(d);
                b.cleanCrs("Top", "Bottom", "Top");
                if (e) b.renderAfterPrependFix(d);
                b.render(a, d);
            }
        });
        var Ka = function() {
            this._position = new ya(this, M.REV_APPEND, function(a, b) {
                a.create(L.APPEND.REV, L.LEFT.TOP, parseFloat(b.x2()), 0);
            }, function(a, b) {
                if (a.x1 - 1 >= 0) {
                    jb.create(L.APPEND.REV, L.LEFT.TOP, parseFloat(a.x1 - 1), parseFloat(a.y1), Z.int(b));
                }
                jb.create(L.APPEND.REV, L.BOTTOM.RIGHT, parseFloat(a.x2), parseFloat(a.y2 + 1), Z.int(b));
            }, function(a) {
                return a.x1 < gb.fixLowRounding(0);
            });
        };
        c(Ka, {
            position: function(a) {
                var b = this._position;
                b.initCrs("Bottom", "Top", "Bottom");
                var c = b.filterCrs("Prepended", L.BOTTOM.RIGHT, "Bottom", "Right", "Append");
                var d = b.createCn(a, b.findCnCoords(a, c, "VgAppend", "BelowY", "y2", "Smaller", "Y"), c);
                sb.attachToRanges(d);
                b.cleanCrs("Bottom", "Top", "Bottom");
                b.render(a, d);
            }
        });
        var La = function() {
            this._position = new ya(this, M.REV_PREPEND, function(a, b) {
                a.create(L.PREPEND.REV, L.LEFT.BOTTOM, b.x2(), 0);
            }, function(a, b) {
                if (a.x1 - 1 >= 0) {
                    jb.create(L.PREPEND.REV, L.LEFT.BOTTOM, parseFloat(a.x1 - 1), parseFloat(a.y2), Z.int(b));
                }
                jb.create(L.PREPEND.REV, L.TOP.RIGHT, parseFloat(a.x2), parseFloat(a.y1 - 1), Z.int(b));
            }, function(a) {
                return a.x1 < gb.fixLowRounding(0);
            });
        };
        c(La, {
            position: function(a) {
                var b = this._position;
                b.initCrs("Top", "Bottom", "Top");
                var c = b.filterCrs("Appended", L.TOP.RIGHT, "Top", "Right", "Prepend");
                var d = b.createCn(a, b.findCnCoords(a, c, "VgPrepend", "AboveY", "y1", "Bigger", "Y"), c);
                eb.markIfFirstPrepended(a);
                var e = b.fixAllXYPosAfterPrepend(d, jb.get());
                sb.attachToRanges(d);
                b.cleanCrs("Top", "Bottom", "Top");
                if (e) b.renderAfterPrependFix(d);
                b.render(a, d);
            }
        });
        var Ma = function() {
            this._grid = null;
            this._markingFn = null;
            this._resizeTimeout = null;
            this._createMarkingFn();
            this._toNative(a);
            this._adjustCSS();
            d(this, {
                grid: this.get,
                gridWidth: this.width,
                gridHeight: this.height
            });
        };
        c(Ma, {
            _createMarkingFn: function() {
                this._markingFn = function(a) {
                    if (ab.notEq("class", false)) {
                        if (!Z.css.hasClass(a, ab.get("class"))) Z.css.addClass(a, ab.get("class"));
                    } else if (ab.notEq("data", false)) Z.set(a, ab.get("data"), "gi");
                };
            },
            _toNative: function(a) {
                if (Z.isJquery(a)) this._grid = a.get(0); else if (Z.isNative(a)) this._grid = a; else if (Z.isArray(a) && Z.isNative(a[0])) this._grid = a[0]; else e(P.GRID_NOT_NATIVE);
            },
            _adjustCSS: function() {
                var a = $.getComputedCSS(this._grid);
                if (a.position != "relative" && a.position != "absolute") Z.css.set(this._grid, {
                    position: "relative"
                });
            },
            get: function() {
                return this._grid;
            },
            x2: function() {
                return Ya.outerWidth(this._grid, false, true) - 1;
            },
            y2: function() {
                return Ya.outerHeight(this._grid, false, true) - 1;
            },
            width: function() {
                return Math.round(this.x2() + 1);
            },
            height: function() {
                return Math.round(this.y2() + 1);
            },
            mark: function(a) {
                var a = Za.toNative(a);
                for (var b = 0; b < a.length; b++) this._markingFn(a[b]);
                return a;
            },
            add: function(a) {
                var a = this.mark(a);
                for (var b = 0; b < a.length; b++) {
                    if (!Z.isChildOf(a[b], this._grid)) this._grid.appendChild(a[b]);
                }
            },
            ensureCanFit: function(a) {
                var b = this;
                var c = function(a, c) {
                    var d = Math.round(Ya["outer" + c](a, true));
                    var f = Math.round(Ya["outer" + c](b._grid, false, true));
                    if (d > f) e("Item " + c + "(" + d + "px) > Grid " + c + "(" + f + "px).");
                };
                for (var d = 0; d < a.length; d++) c(a[d], ab.eq("grid", "vertical") ? "Width" : "Height");
            },
            scheduleResize: function() {
                var a = this;
                clearTimeout(this._resizeTimeout);
                this._resizeTimeout = setTimeout(function() {
                    if (!Mb.isEmpty()) {
                        a.scheduleResize();
                        return;
                    }
                    if (ab.eq("grid", "vertical")) a._resize.call(a, "y2", "height", function() {
                        return a.y2();
                    }); else a._resize.call(a, "x2", "width", function() {
                        return a.x2();
                    });
                }, ab.get("gridResizeDelay"));
            },
            _resize: function(a, b, c) {
                var d = sb.get();
                if (d.length == 0) return;
                var e = d[0][a];
                for (var f = 1; f < d.length; f++) {
                    if (d[f][a] > e) e = d[f][a];
                }
                var g = {};
                g[b] = e + 1 + "px";
                if (ab.eq("gridResize", "fit") || ab.eq("gridResize", "expand") && c() < e) Z.css.set(this._grid, g);
                _a.emit(Q.GRID_RESIZE, this._grid);
            }
        });
        l = function() {
            this._batches = [];
            this._loaded = [];
        };
        c(l, {
            schedule: function(a, b, c) {
                if (a.length == 0) {
                    this._batches.push({
                        items: a,
                        images: [],
                        op: b,
                        data: c
                    });
                    this._checkLoad();
                    return;
                }
                var d = this._findImages(a);
                this._batches.push({
                    items: a,
                    images: d,
                    op: b,
                    data: c
                });
                if (d.length == 0) {
                    this._checkLoad();
                    return;
                }
                for (var e = 0; e < d.length; e++) d[e].scheduleLoad();
            },
            _findImages: function(a) {
                var b = [];
                for (var c = 0; c < a.length; c++) {
                    if (a[c].nodeName == "IMG") {
                        if (!this._isAlreadyLoaded(a[c])) b.push(new m(a[c]));
                        continue;
                    }
                    if (!this._isValidNode(a[c])) continue;
                    var d = a[c].querySelectorAll("img");
                    for (var e = 0; e < d.length; e++) {
                        if (!this._isAlreadyLoaded(d[e])) b.push(new m(d[e]));
                    }
                }
                return b;
            },
            _isAlreadyLoaded: function(a) {
                for (var b = 0; b < this._loaded.length; b++) {
                    if (this._loaded[b] === a.src) return true;
                }
                return a.src.length == 0;
            },
            _isValidNode: function(a) {
                return a.nodeType && (a.nodeType == 1 || a.nodeType == 9 || a.nodeType == 11);
            },
            onLoad: function(a) {
                this._loaded.push(a.src);
                this._checkLoad();
            },
            _checkLoad: function() {
                for (var a = 0; a < this._batches.length; a++) {
                    var b = true;
                    var c = this._batches[a].images;
                    for (var d = 0; d < c.length; d++) {
                        if (!c[d].isLoaded()) {
                            b = false;
                            break;
                        }
                    }
                    if (!b) break;
                    for (var d = 0; d < c.length; d++) c[d].destroy();
                    this._batches[a].images = [];
                    this._callOp(this._batches[a].items, this._batches[a].op, this._batches[a].data);
                    this._batches.splice(a, 1);
                    a--;
                }
            },
            _callOp: function(a, b, c) {
                var d = c.batchSize;
                var f = c.batchDelay;
                if (b == M.APPEND || b == M.PREPEND) bb.exec(b, a, d, f); else if (b == M.SIL_APPEND) bb.execSilentAppend(a, d, f); else if (b == M.INS_BEFORE) bb.exec(b, a, d, f, c.beforeItem); else if (b == M.INS_AFTER) bb.exec(b, a, d, f, c.afterItem); else e("Wrong op.");
            }
        });
        m = function(a) {
            this._image = a;
            this._loadedImage = null;
            this._isLoaded = false;
            this._onLoad = null;
            this._onError = null;
        };
        c(m, {
            _bindEvents: function() {
                var a = this;
                a._onLoad = function() {
                    a._load.call(a);
                };
                a._onError = function() {
                    a._error.call(a);
                };
                X.add(a._loadedImage, "load", a._onLoad);
                X.add(a._loadedImage, "error", a._onError);
            },
            _unbindEvents: function() {
                var a = this;
                if (a._onLoad != null) X.rm(a._loadedImage, "load", a._onLoad);
                if (a._onError != null) X.rm(a._loadedImage, "error", a._onError);
            },
            destroy: function() {
                this._unbindEvents();
            },
            scheduleLoad: function() {
                if (this._isAlreadyLoaded()) {
                    this._isLoaded = true;
                    ib.onLoad(this._image);
                    return;
                }
                this._loadedImage = this._loader();
                this._bindEvents();
                this._loadedImage.src = this._image.src;
            },
            _loader: function() {
                return new Image();
            },
            isLoaded: function() {
                return this._isLoaded;
            },
            _isAlreadyLoaded: function() {
                return this._image.complete && this._image.naturalWidth !== undefined && this._image.naturalWidth !== 0;
            },
            _load: function() {
                this._isLoaded = true;
                ib.onLoad(this._image);
            },
            _error: function() {
                this._isLoaded = true;
                ib.onLoad(this._image);
            }
        });
        var Na = function() {};
        c(Na, {
            exec: function(a) {
                var b = this;
                Rb.exec(a, function(a) {
                    b._append.call(b, a);
                });
            },
            _append: function(a) {
                eb.markForAppend(a);
                if (ab.eq("append", "default")) {
                    Eb.position(a);
                } else {
                    Gb.position(a);
                }
            },
            execInsBefore: function(a, b) {
                var c = this;
                Rb.execInsertBA(a, b, function(a) {
                    c.exec.call(c, a);
                }, function() {
                    return 0;
                }, function(a, b) {
                    return a.splice(b, a.length - b);
                }, -1, function(a) {
                    Lb.from(a[0]);
                });
            },
            execInsAfter: function(a, b) {
                var c = this;
                Rb.execInsertBA(a, b, function(a) {
                    c.exec.call(c, a);
                }, function(a) {
                    return a.length - 1;
                }, function(a, b) {
                    return a.splice(b + 1, a.length - b - 1);
                }, 1, function(a) {
                    if (a.length > 0) Lb.from(a[0]);
                });
            }
        });
        var Oa = function() {};
        c(Oa, {
            exec: function(a) {
                var b = this;
                Rb.exec(a, function(a) {
                    b._prepend.call(b, a);
                });
            },
            _prepend: function(a) {
                eb.markForPrepend(a);
                if (ab.eq("prepend", "default")) {
                    Fb.position(a);
                } else {
                    Hb.position(a);
                }
            }
        });
        var Pa = function() {
            this._queue = [];
            this._isWaitingForRpsQueue = false;
        };
        c(Pa, {
            itemsToBatches: function(a, b, c) {
                var c = c || false;
                var a = c ? a : Za.toNative(a);
                var d = [];
                var e = 0;
                var f = [];
                var g = false;
                for (var h = 0; h < a.length; h++) {
                    f.push(a[h]);
                    g = false;
                    e++;
                    if (e == b) {
                        d.push(f);
                        f = [];
                        g = true;
                        e = 0;
                    }
                }
                if (!g) d.push(f);
                return d;
            },
            schedule: function(a, b, c, d, e) {
                this._schedule(b, e, c, d, a, this._exec);
            },
            scheduleFnExec: function(a, b, c, d) {
                var c = c || I.INSERT_BATCH_DELAY;
                var e = this.itemsToBatches(a, b);
                for (var f = 0; f < e.length; f++) {
                    (function(a, b) {
                        setTimeout(function() {
                            d(a);
                        }, c * b);
                    })(e[f], f);
                }
            },
            _schedule: function(a, b, c, d, e, f) {
                var g = this;
                var h = function(a) {
                    setTimeout(function() {
                        g._execSchedule.call(g, a, b, e, f);
                    }, 0);
                };
                if (typeof c == "undefined") {
                    h(a);
                    return;
                }
                this.scheduleFnExec(a, c, d, function(a) {
                    h(a);
                });
            },
            _execSchedule: function(a, b, c, d) {
                var e = this;
                if (Mb.isEmpty()) d(a, b, c); else {
                    e._queue.push({
                        op: c,
                        items: a,
                        targetItem: b
                    });
                    if (e._isWaitingForRpsQueue) return;
                    setTimeout(function() {
                        e._isWaitingForRpsQueue = true;
                        e._process.call(e);
                    }, I.INSERT_QUEUE_DELAY);
                }
            },
            _process: function() {
                var a = this;
                var b = true;
                for (var c = 0; c < this._queue.length; c++) {
                    if (!Mb.isEmpty()) {
                        setTimeout(function() {
                            a._process.call(a);
                        }, I.INSERT_QUEUE_DELAY);
                        b = false;
                        break;
                    }
                    var d = this._queue[c];
                    this._exec(d.items, d.targetItem, d.op);
                    this._queue.shift();
                    c--;
                }
                if (b) this._isWaitingForRpsQueue = false;
            },
            _exec: function(a, b, c) {
                if (c == M.PREPEND) Qb.exec(a); else if (c == M.APPEND) Pb.exec(a); else if (c == M.INS_BEFORE) Pb.execInsBefore(a, b); else if (c == M.INS_AFTER) Pb.execInsAfter(a, b); else e("wrong op");
            }
        });
        var Qa = function() {};
        c(Qa, {
            exec: function(a, b) {
                var a = Za.filterNotConnected(Za.toNative(a));
                if (a.length == 0) return;
                Ya.startCachingTransaction();
                $a.ensureCanFit(a);
                a = db.sort(db.filter(a));
                for (var c = 0; c < a.length; c++) {
                    db.unmarkAsNotCollectable(a[c]);
                    $a.add(a[c]);
                    b(a[c]);
                }
                Ya.stopCachingTransaction();
                $a.scheduleResize();
                _a.emit(Q.INSERT, a);
            },
            execInsertBA: function(a, b, c, d, f, g, h) {
                var a = Za.filterNotConnected(Za.toNative(a));
                if (a.length == 0) return;
                var i = sb.get();
                if (i.length == 0) {
                    c(a);
                    return;
                }
                i = wb.sortForReappend(i);
                var j = [];
                var b = this._getTargetItem(b, i, d);
                var k = this._getTargetItemGuid(b, f, i, j);
                if (k == null) e(P.WRONG_IBA_ITEM);
                this._reposition(j, a, k, c, g, h);
            },
            _getTargetItem: function(a, b, c) {
                if (typeof a == "undefined" || a == null) var a = b[c(b)].item; else {
                    var a = Za.toNative(a)[0];
                    if (typeof a == "undefined" || a == null) a = b[c(b)].item;
                }
                return a;
            },
            _getTargetItemGuid: function(a, b, c, d) {
                var e = null;
                for (var f = 0; f < c.length; f++) {
                    if (eb.get(c[f].item) == eb.get(a)) {
                        e = c[f].itemGUID;
                        Array.prototype.push.apply(d, b(c, f));
                        break;
                    }
                }
                return e;
            },
            _reposition: function(a, b, c, d, e, f) {
                sb.reinitRanges();
                eb.reinitMax(c + 1 * e);
                var g = ab.eq("append", "default") ? Eb : Gb;
                g.recreateCrs();
                d(b);
                if (ab.eq("sortDispersion", false)) {
                    sb.restore(a);
                    tb.remapGUIDSIn(a);
                } else {
                    sb.restoreOnSortDispersion(a);
                    tb.remapAllGUIDS();
                }
                f(a);
            }
        });
        var Ra = function() {};
        c(Ra, {
            show: function(a) {
                var b = Bb;
                if (!Z.isArray(a)) var a = [ a ];
                for (var c = 0; c < a.length; c++) {
                    var d = a[c];
                    this.unmarkAsSchToHide(d.item);
                    if (b.isRendered(d)) continue;
                    b.markAsRendered(d);
                    Cb.schedule(N.SHOW, d, b.left(d), b.top(d));
                }
            },
            hide: function(a) {
                var b = Bb;
                if (!Z.isArray(a)) var a = [ a ];
                for (var c = 0; c < a.length; c++) {
                    var d = a[c];
                    if (!this.wasSchToHide(d.item)) continue;
                    b.unmarkAsRendered(d);
                    Cb.schedule(N.HIDE, d, b.left(d), b.top(d));
                }
            },
            renderRepositioned: function(a) {
                this.render(a, false);
            },
            render: function(a, b) {
                var c = Bb;
                var b = b || false;
                for (var d = 0; d < a.length; d++) {
                    var e = a[d];
                    if (b !== false) {
                        var f = false;
                        for (var g = 0; g < b.length; g++) {
                            if (a[d].itemGUID == b[g].itemGUID) {
                                f = true;
                                break;
                            }
                        }
                        if (f) continue;
                    }
                    Cb.schedule(N.RENDER, e, c.left(e), c.top(e));
                }
            },
            renderAfterDelay: function(a, b) {
                var b = b || I.RENDER_DEF_DELAY;
                for (var c = 0; c < a.length; c++) Cb.schedule(N.DEL_RENDER, a[c], null, null, b);
            },
            rotate: function(a) {
                var b = [];
                for (var c = 0; c < a.length; c++) {
                    var d = tb.find(a[c]);
                    Bb.unmarkAsRendered(d);
                    b.push(d);
                }
                this.show(b);
            },
            markAsSchToHide: function(a) {
                for (var b = 0; b < a.length; b++) Z.set(a[b].item, I.REND.SCH_TO_HIDE_DATA, "y");
            },
            unmarkAsSchToHide: function(a) {
                Z.rm(a, I.REND.SCH_TO_HIDE_DATA);
            },
            wasSchToHide: function(a) {
                return Z.has(a, I.REND.SCH_TO_HIDE_DATA);
            }
        });
        var Sa = function() {};
        c(Sa, {
            isRendered: function(a) {
                return Z.has(a.item, I.REND.CN_RENDERED_DATA);
            },
            markAsRendered: function(a) {
                Z.set(a.item, I.REND.CN_RENDERED_DATA, "y");
            },
            unmarkAsRendered: function(a) {
                Z.rm(a.item, I.REND.CN_RENDERED_DATA);
            },
            left: function(a) {
                var b = g("eq", ab);
                if (b("grid", "vertical")) var c = a.x1; else var c = b("intersections", true) ? a.x1 : a.x1 + a.hOffset;
                return c + "px";
            },
            top: function(a) {
                var b = g("eq", ab);
                if (b("grid", "vertical")) var c = b("intersections", true) ? a.y1 : a.y1 + a.vOffset; else var c = a.y1;
                return c + "px";
            }
        });
        var Ta = function() {
            this._queue = null;
            this._queueTimeout = null;
        };
        c(Ta, {
            _reinit: function() {
                if (this._queue == null) this._queue = []; else clearTimeout(this._queueTimeout);
            },
            schedule: function(a, b, c, d, e) {
                this._reinit();
                if (a == N.SHOW && Db.isScheduled(b.item)) return;
                var f = this;
                this._queue.push({
                    op: a,
                    cn: b,
                    left: c,
                    top: d,
                    delay: e
                });
                this._queueTimeout = setTimeout(function() {
                    f._process.call(f);
                }, I.RENDER_QUEUE_DELAY);
            },
            _getApi: function() {
                return {
                    toggle: Vb,
                    cc: ab.getApi("coordsChanger"),
                    grid: $a.get(),
                    sr: $,
                    srManager: Ya,
                    collect: db,
                    prefix: Y,
                    dom: Z,
                    getS: g("get", ab),
                    EVENT: Q,
                    TOGGLE: J,
                    ROTATE: K
                };
            },
            _process: function() {
                for (var a = 0; a < this._queue.length; a++) {
                    var b = this._queue[a];
                    if (Db.isScheduled(b.cn.item)) continue;
                    if (b.op == N.SHOW) {
                        if (!Za.isConnected(b.cn.item)) continue;
                        var c = "show";
                    } else var c = b.op == N.HIDE ? "hide" : "render";
                    this["_" + c](b.cn, b.left, b.top, this._getApi(), b.op, b.delay);
                }
                $a.scheduleResize();
                this._queue = null;
            },
            _show: function(a, b, c, d) {
                var e = g("get", ab);
                d.dom.css.set(a.item, {
                    position: "absolute",
                    left: b,
                    top: c
                });
                ab.getApi("coordsChanger")(a.item, b, c, e("coordsChangeTime"), e("coordsChangeTiming"), d.dom, d.prefix, e, true);
                _a.emitInternal(R.BEFORE_SHOW_FOR_RSORT);
                ab.getApi("toggle").show(a.item, b, c, e("toggleTime"), e("toggleTiming"), _a, Wb, d.dom, d, {
                    x1: b,
                    y1: c
                });
            },
            _hide: function(a, b, c, d) {
                var e = g("get", ab);
                Ab.unmarkAsSchToHide(a.item);
                ab.getApi("toggle").hide(a.item, b, c, e("toggleTime"), e("toggleTiming"), _a, Wb, d.dom, d, {
                    x1: b,
                    y1: c
                });
            },
            _render: function(a, b, c, d, e, f) {
                var g = this;
                if (e == N.RENDER) this._execRender(a.item, b, c, d); else {
                    setTimeout(function() {
                        var b = tb.find(a.item, true);
                        if (b == null) return;
                        g._execRender(b.item, Bb.left(b), Bb.top(b), d);
                    }, f);
                }
            },
            _execRender: function(a, b, c, d) {
                var e = g("get", ab);
                if (Z.has(a, J.IS_ACTIVE_WITH_CC)) {
                    var f = e("toggleTime");
                    var h = e("toggleTiming");
                } else {
                    var f = e("coordsChangeTime");
                    var h = e("coordsChangeTiming");
                }
                ab.getApi("coordsChanger")(a, b, c, f, h, d.dom, d.prefix, e);
            }
        });
        j = function() {};
        c(j, {
            schedule: function(a) {
                for (var b = 0; b < a.length; b++) Z.set(a[b], I.REND.SILENT_DATA, "y");
            },
            unschedule: function(a, b) {
                for (var c = 0; c < a.length; c++) {
                    Z.rm(a[c], I.REND.SILENT_DATA);
                    Bb.unmarkAsRendered(b[c]);
                }
            },
            isScheduled: function(a) {
                return Z.has(a, I.REND.SILENT_DATA);
            },
            _preUnschedule: function(a) {
                for (var b = 0; b < a.length; b++) Z.rm(a[b], I.REND.SILENT_DATA);
            },
            getScheduled: function(a) {
                var a = a || false;
                var b = db.collectByQuery("[" + I.REND.SILENT_DATA + "]");
                if (b.length == 0) return [];
                if (!a) return b;
                var c = {
                    left: Ya.offsetLeft($a.get()),
                    top: Ya.offsetTop($a.get())
                };
                var d = Ya.viewportDocumentCoords();
                var e = [];
                for (var f = 0; f < b.length; f++) {
                    var g = tb.find(b[f], true);
                    if (g == null) continue;
                    var h = {
                        x1: c.left + g.x1,
                        x2: c.left + g.x2,
                        y1: c.top + g.y1,
                        y2: c.top + g.y2
                    };
                    if (ub.isIntersectingAny([ d ], h)) e.push(b[f]);
                }
                return e;
            },
            exec: function(a, b, c) {
                if (typeof a != "undefined" && a != null && a) {
                    a = Za.toNative(a);
                    var d = [];
                    for (var e = 0; e < a.length; e++) {
                        if (this.isScheduled(a[e])) d.push(a[e]);
                    }
                    this._preUnschedule(d);
                    a = d;
                }
                var f = this;
                setTimeout(function() {
                    f._exec.call(f, a, b, c);
                }, I.REFLOW_FIX_DELAY);
            },
            _exec: function(a, b, c) {
                if (typeof a == "undefined" || a == null || !a) var d = this.getScheduled(); else var d = a;
                if (d.length == 0) return;
                this._preUnschedule(d);
                var e = [];
                var f = [];
                for (var g = 0; g < d.length; g++) {
                    var h = tb.find(d[g], true);
                    if (h != null) e.push(h);
                }
                e = wb.sortForReappend(e);
                for (var g = 0; g < e.length; g++) f.push(e[g].item);
                if (typeof b == "undefined") {
                    this._render.call(this, f, e);
                    return;
                }
                this._execByBatches(f, e, b, c);
            },
            _execByBatches: function(a, b, c, d) {
                if (typeof d == "undefined") var d = I.INSERT_BATCH_DELAY;
                var e = Ob.itemsToBatches(a, c);
                var f = Ob.itemsToBatches(b, c, true);
                for (var g = 0; g < e.length; g++) this._execBatch(e[g], f[g], g * d);
            },
            _execBatch: function(a, b, c) {
                var d = this;
                setTimeout(function() {
                    d._render.call(d, a, b);
                }, c);
            },
            _render: function(a, b) {
                this.unschedule(a, b);
                Ab.show(b);
            }
        });
        var Ua = function() {};
        c(Ua, {
            all: function() {
                Ya.startCachingTransaction();
                this._all();
                Ya.stopCachingTransaction();
            },
            fromFirstSortedCn: function(a) {
                Ya.startCachingTransaction();
                this._fromFirstSortedCn(a);
                Ya.stopCachingTransaction();
            },
            from: function(a) {
                this._from(a);
            },
            sync: function() {
                var a = sb.get();
                if (!Mb.isEmpty()) {
                    var b = Mb.stop();
                    var c = [];
                    for (var d = 0; d < b.queueData.length; d++) c.push(b.queueData[d].cn);
                    tb.syncParams(c);
                    for (var d = 0; d < b.queue.length; d++) a.push(b.queue[d].cn);
                }
            },
            _stop: function() {
                var a = [];
                if (!Mb.isEmpty()) {
                    var b = Mb.stop();
                    for (var c = 0; c < b.queue.length; c++) {
                        if (b.queue[c].cn.restrictCollect) continue;
                        a.push(b.queue[c].cn);
                    }
                }
                return a;
            },
            _all: function() {
                this.sync();
                var a = sb.get();
                if (a.length == 0) return;
                a = wb.sortForReappend(a);
                eb.unmarkFirstPrepended();
                this._start(Nb.getForRepositionAll(a));
            },
            _from: function(a) {
                var b = this._stop();
                eb.unmarkFirstPrepended();
                this._start(Nb.get(b, a));
            },
            _fromFirstSortedCn: function(a) {
                var b = this._stop();
                var c = sb.get();
                var d = [];
                for (var e = 0; e < a.length; e++) {
                    for (var f = 0; f < c.length; f++) {
                        if (eb.get(c[f].item) == eb.get(a[e])) {
                            d.push(c[f]);
                            continue;
                        }
                    }
                    for (var f = 0; f < b.length; f++) {
                        if (eb.get(b[f].item) == eb.get(a[e])) {
                            d.push(b[f]);
                            continue;
                        }
                    }
                }
                var g = wb.sortForReappend(d);
                eb.unmarkFirstPrepended();
                this._start(Nb.get(b, g[0]));
            },
            _start: function(a) {
                mb.recreateForFirst(a.firstCn.item, a.firstCn);
                Mb.init(a.items, a.cns);
                Mb.start();
            }
        });
        var Va = function() {};
        c(Va, {
            get: function(a, b) {
                var c = sb.get();
                var d = g("eq", ab);
                for (var e = 0; e < c.length; e++) {
                    if (c[e].restrictCollect) continue;
                    if (d("sortDispersion", false) && d("intersections", true)) {
                        if (c[e].itemGUID >= b.itemGUID) {
                            a.push(c[e]);
                            c.splice(e, 1);
                            e--;
                        }
                    } else if (d("intersections", false)) {
                        if (d("grid", "vertical")) var f = c[e].y2 >= b.y1; else var f = c[e].x2 >= b.x1;
                        if (f) {
                            a.push(c[e]);
                            c.splice(e, 1);
                            e--;
                        }
                    } else if (d("sortDispersion", true)) {
                        if (this._getSDCond(c[e], b)) {
                            a.push(c[e]);
                            c.splice(e, 1);
                            e--;
                        }
                    }
                }
                var h = wb.sortForReappend(a);
                var i = [];
                for (var e = 0; e < h.length; e++) i.push(h[e].item);
                return {
                    items: i,
                    cns: a,
                    firstCn: h[0]
                };
            },
            _getSDCond: function(a, b) {
                var c = g("eq", ab);
                if (c("grid", "vertical")) {
                    if (c("append", "default")) var d = a.y1 > b.y1 || a.y1 == b.y1 && a.x1 >= b.x1; else var d = a.y1 > b.y1 || a.y1 == b.y1 && a.x1 <= b.x2;
                } else {
                    if (c("append", "default")) var d = a.x1 > b.x1 || a.x1 == b.x1 && a.y1 >= b.y1; else var d = a.x1 > b.x1 || a.x1 == b.x1 && a.y1 <= b.y2;
                }
                return d;
            },
            getForRepositionAll: function(a) {
                var b = [];
                var c = [];
                var d = [];
                this._findCns(a, b, c, d);
                var e = this._findFirstCnToRps(a, c);
                return {
                    items: b,
                    cns: d,
                    firstCn: e
                };
            },
            _findCns: function(a, b, c, d) {
                for (var e = 0; e < a.length; e++) {
                    if (!a[e].restrictCollect) {
                        b.push(a[e].item);
                        d.push(a[e]);
                    } else c.push(a[e]);
                }
            },
            _findFirstCnToRps: function(a, b) {
                var c = null;
                if (b.length == 0) {
                    c = a[0];
                    a.splice(0, a.length);
                } else {
                    for (var d = 0; d < a.length; d++) {
                        var e = true;
                        for (var f = 0; f < b.length; f++) {
                            if (b[f].itemGUID == a[d].itemGUID) {
                                e = false;
                                break;
                            }
                        }
                        if (e) {
                            c = a[d];
                            break;
                        }
                    }
                    a.splice(0, a.length);
                    for (var d = 0; d < b.length; d++) a.push(b[d]);
                }
                return c;
            }
        });
        var Wa = function() {
            this._queue = null;
            this._nextBatchTimeout = null;
            this._queueData = null;
            this._repositionStart = {
                gridX2: 0,
                gridY2: 0,
                vpWidth: null,
                vpHeight: null
            };
        };
        c(Wa, {
            isEmpty: function() {
                return this._nextBatchTimeout == null;
            },
            init: function(a, b) {
                this._queue = [];
                this._queueData = [];
                for (var c = 0; c < b.length; c++) this._queue.push({
                    item: a[c],
                    cn: b[c]
                });
            },
            stop: function() {
                clearTimeout(this._nextBatchTimeout);
                this._nextBatchTimeout = null;
                return {
                    queue: this._queue,
                    queueData: this._queueData
                };
            },
            start: function() {
                this._repositionStart = {
                    gridX2: $a.x2(),
                    gridY2: $a.y2(),
                    vpWidth: Ya.viewportWidth(),
                    vpHeight: Ya.viewportHeight()
                };
                this._repositionNextBatch();
            },
            getQueued: function() {
                return this._queue;
            },
            _isSameRepositionProcess: function() {
                var a = true;
                if (ab.eq("grid", "vertical")) {
                    if (this._repositionStart.gridX2 != $a.x2()) a = false;
                    if (this._repositionStart.vpWidth != Ya.viewportWidth()) a = false;
                } else {
                    if (this._repositionStart.gridY2 != $a.y2()) a = false;
                    if (this._repositionStart.vpHeight != Ya.viewportHeight()) a = false;
                }
                return a;
            },
            _repositionNextBatch: function(a) {
                var b = ab.get("queueSize");
                if (b > this._queue.length) b = this._queue.length;
                Ya.startCachingTransaction();
                var c = a || false;
                if (c && !this._isSameRepositionProcess()) {
                    Ya.stopCachingTransaction();
                    return;
                }
                this._execNextBatchReposition(b);
                this._processQueue(b);
            },
            _execNextBatchReposition: function(a) {
                var b = [];
                for (var c = 0; c < a; c++) {
                    this._repositionItem(this._queue[c].item);
                    kb["rmIntFrom" + (ab.eq("grid", "vertical") ? "Bottom" : "Right")]();
                    b.push(eb.get(this._queue[c].item));
                }
                Ya.stopCachingTransaction();
                var d = tb.getByGUIDS(b);
                yb.emitEvents(d);
                Ab.renderRepositioned(d);
            },
            _processQueue: function(a) {
                this._queueData = this._queueData.concat(this._queue.splice(0, a));
                if (this._queue.length == 0) {
                    _a.emitInternal(R.REPOSITION_END_FOR_DRAG);
                    _a.emit(Q.REPOSITION_END);
                    this._nextBatchTimeout = null;
                    return;
                }
                this._scheduleNextBatchReposition();
            },
            _scheduleNextBatchReposition: function() {
                var a = this;
                this._nextBatchTimeout = setTimeout(function() {
                    a._repositionNextBatch.call(a, true);
                }, ab.get("queueDelay"));
            },
            _repositionItem: function(a) {
                if (ab.eq("append", "reversed")) {
                    Gb.position(a);
                } else {
                    Eb.position(a);
                }
            }
        });
        Z.init();
        $.init();
        var Xa = this;
        var Ya = new qa();
        var Za = new oa();
        var $a = new Ma();
        var _a = new va();
        var ab = new T();
        var bb = new ua();
        var cb = g("eq", ab);
        var db = new ma();
        var eb = new na();
        var fb = new k();
        var gb = new za();
        var hb = new xa();
        var ib = new l();
        var jb = new ea();
        var kb = new fa();
        var lb = new ga();
        var mb = new ha();
        var nb = new ia();
        var ob = new ja();
        var pb = new ka();
        var qb = new la();
        var rb = cb("grid", "vertical") ? new Ia() : new Ca();
        var sb = cb("grid", "vertical") ? new Ha() : new Ba();
        var tb = new _();
        var ub = new aa();
        var vb = new ba();
        var wb = new ca();
        var xb = new da();
        var yb = new pa();
        var zb = new wa();
        var Ab = new Ra();
        var Bb = new Sa();
        var Cb = new Ta();
        var Db = new j();
        var Eb = cb("grid", "vertical") ? new Ga() : new Aa();
        var Fb = cb("grid", "vertical") ? new Ja() : new Da();
        var Gb = cb("grid", "vertical") ? new Ka() : new Ea();
        var Hb = cb("grid", "vertical") ? new La() : new Fa();
        var Ib = new ta();
        var Jb = new ra();
        var Kb = new sa();
        var Lb = new Ua();
        var Mb = new Wa();
        var Nb = new Va();
        var Ob = new Pa();
        var Pb = new Na();
        var Qb = new Oa();
        var Rb = new Qa();
        var Sb = new S();
        var Tb = new U();
        var Ub = new h();
        var Vb = new V();
        var Wb = new W();
        var Xb = new B();
        var Yb = new A();
        var Zb = new D();
        var $b = new F();
        var _b = new C();
        return this;
    };
    return a;
});