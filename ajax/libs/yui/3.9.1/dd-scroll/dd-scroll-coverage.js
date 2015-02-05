if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["build/dd-scroll/dd-scroll.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/dd-scroll/dd-scroll.js",
    code: []
};
_yuitest_coverage["build/dd-scroll/dd-scroll.js"].code=["YUI.add('dd-scroll', function (Y, NAME) {","","","    /**","     * Base scroller class used to create the Plugin.DDNodeScroll and Plugin.DDWinScroll.","     * This class should not be called on it's own, it's designed to be a plugin.","     * @module dd","     * @submodule dd-scroll","     */","    /**","     * Base scroller class used to create the Plugin.DDNodeScroll and Plugin.DDWinScroll.","     * This class should not be called on it's own, it's designed to be a plugin.","     * @class Scroll","     * @extends Base","     * @namespace DD","     * @constructor","     */","","    var S = function() {","        S.superclass.constructor.apply(this, arguments);","","    },","    WS, NS,","    HOST = 'host',","    BUFFER = 'buffer',","    PARENT_SCROLL = 'parentScroll',","    WINDOW_SCROLL = 'windowScroll',","    SCROLL_TOP = 'scrollTop',","    SCROLL_LEFT = 'scrollLeft',","    OFFSET_WIDTH = 'offsetWidth',","    OFFSET_HEIGHT = 'offsetHeight';","","","    S.ATTRS = {","        /**","        * Internal config option to hold the node that we are scrolling. Should not be set by the developer.","        * @attribute parentScroll","        * @type Node","        */","        parentScroll: {","            value: false,","            setter: function(node) {","                if (node) {","                    return node;","                }","                return false;","            }","        },","        /**","        * The number of pixels from the edge of the screen to turn on scrolling. Default: 30","        * @attribute buffer","        * @type Number","        */","        buffer: {","            value: 30,","            validator: Y.Lang.isNumber","        },","        /**","        * The number of milliseconds delay to pass to the auto scroller. Default: 235","        * @attribute scrollDelay","        * @type Number","        */","        scrollDelay: {","            value: 235,","            validator: Y.Lang.isNumber","        },","        /**","        * The host we are plugged into.","        * @attribute host","        * @type Object","        */","        host: {","            value: null","        },","        /**","        * Turn on window scroll support, default: false","        * @attribute windowScroll","        * @type Boolean","        */","        windowScroll: {","            value: false,","            validator: Y.Lang.isBoolean","        },","        /**","        * Allow vertical scrolling, default: true.","        * @attribute vertical","        * @type Boolean","        */","        vertical: {","            value: true,","            validator: Y.Lang.isBoolean","        },","        /**","        * Allow horizontal scrolling, default: true.","        * @attribute horizontal","        * @type Boolean","        */","        horizontal: {","            value: true,","            validator: Y.Lang.isBoolean","        }","    };","","    Y.extend(S, Y.Base, {","        /**","        * Tells if we are actively scrolling or not.","        * @private","        * @property _scrolling","        * @type Boolean","        */","        _scrolling: null,","        /**","        * Cache of the Viewport dims.","        * @private","        * @property _vpRegionCache","        * @type Object","        */","        _vpRegionCache: null,","        /**","        * Cache of the dragNode dims.","        * @private","        * @property _dimCache","        * @type Object","        */","        _dimCache: null,","        /**","        * Holder for the Timer object returned from Y.later.","        * @private","        * @property _scrollTimer","        * @type {Y.later}","        */","        _scrollTimer: null,","        /**","        * Sets the _vpRegionCache property with an Object containing the dims from the viewport.","        * @private","        * @method _getVPRegion","        */","        _getVPRegion: function() {","            var r = {},","                n = this.get(PARENT_SCROLL),","            b = this.get(BUFFER),","            ws = this.get(WINDOW_SCROLL),","            xy = ((ws) ? [] : n.getXY()),","            w = ((ws) ? 'winWidth' : OFFSET_WIDTH),","            h = ((ws) ? 'winHeight' : OFFSET_HEIGHT),","            t = ((ws) ? n.get(SCROLL_TOP) : xy[1]),","            l = ((ws) ? n.get(SCROLL_LEFT) : xy[0]);","","            r = {","                top: t + b,","                right: (n.get(w) + l) - b,","                bottom: (n.get(h) + t) - b,","                left: l + b","            };","            this._vpRegionCache = r;","            return r;","        },","        initializer: function() {","            var h = this.get(HOST);","            h.after('drag:start', Y.bind(this.start, this));","            h.after('drag:end', Y.bind(this.end, this));","            h.on('drag:align', Y.bind(this.align, this));","","            //TODO - This doesn't work yet??","            Y.one('win').on('scroll', Y.bind(function() {","                this._vpRegionCache = null;","            }, this));","        },","        /**","        * Check to see if we need to fire the scroll timer. If scroll timer is running this will scroll the window.","        * @private","        * @method _checkWinScroll","        * @param {Boolean} move Should we move the window. From Y.later","        */","        _checkWinScroll: function(move) {","            var r = this._getVPRegion(),","                ho = this.get(HOST),","                ws = this.get(WINDOW_SCROLL),","                xy = ho.lastXY,","                scroll = false,","                b = this.get(BUFFER),","                win = this.get(PARENT_SCROLL),","                sTop = win.get(SCROLL_TOP),","                sLeft = win.get(SCROLL_LEFT),","                w = this._dimCache.w,","                h = this._dimCache.h,","                bottom = xy[1] + h,","                top = xy[1],","                right = xy[0] + w,","                left = xy[0],","                nt = top,","                nl = left,","                st = sTop,","                sl = sLeft;","","            if (this.get('horizontal')) {","                if (left <= r.left) {","                    scroll = true;","                    nl = xy[0] - ((ws) ? b : 0);","                    sl = sLeft - b;","                }","                if (right >= r.right) {","                    scroll = true;","                    nl = xy[0] + ((ws) ? b : 0);","                    sl = sLeft + b;","                }","            }","            if (this.get('vertical')) {","                if (bottom >= r.bottom) {","                    scroll = true;","                    nt = xy[1] + ((ws) ? b : 0);","                    st = sTop + b;","","                }","                if (top <= r.top) {","                    scroll = true;","                    nt = xy[1] - ((ws) ? b : 0);","                    st = sTop - b;","                }","            }","","            if (st < 0) {","                st = 0;","                nt = xy[1];","            }","","            if (sl < 0) {","                sl = 0;","                nl = xy[0];","            }","","            if (nt < 0) {","                nt = xy[1];","            }","            if (nl < 0) {","                nl = xy[0];","            }","            if (move) {","                ho.actXY = [nl, nt];","                ho._alignNode([nl, nt], true); //We are srolling..","                xy = ho.actXY;","                ho.actXY = [nl, nt];","                ho._moveNode({ node: win, top: st, left: sl});","                if (!st && !sl) {","                    this._cancelScroll();","                }","            } else {","                if (scroll) {","                    this._initScroll();","                } else {","                    this._cancelScroll();","                }","            }","        },","        /**","        * Cancel a previous scroll timer and init a new one.","        * @private","        * @method _initScroll","        */","        _initScroll: function() {","            this._cancelScroll();","            this._scrollTimer = Y.Lang.later(this.get('scrollDelay'), this, this._checkWinScroll, [true], true);","","        },","        /**","        * Cancel a currently running scroll timer.","        * @private","        * @method _cancelScroll","        */","        _cancelScroll: function() {","            this._scrolling = false;","            if (this._scrollTimer) {","                this._scrollTimer.cancel();","                delete this._scrollTimer;","            }","        },","        /**","        * Called from the drag:align event to determine if we need to scroll.","        * @method align","        */","        align: function(e) {","            if (this._scrolling) {","                this._cancelScroll();","                e.preventDefault();","            }","            if (!this._scrolling) {","                this._checkWinScroll();","            }","        },","        /**","        * Set the cache of the dragNode dims.","        * @private","        * @method _setDimCache","        */","        _setDimCache: function() {","            var node = this.get(HOST).get('dragNode');","            this._dimCache = {","                h: node.get(OFFSET_HEIGHT),","                w: node.get(OFFSET_WIDTH)","            };","        },","        /**","        * Called from the drag:start event","        * @method start","        */","        start: function() {","            this._setDimCache();","        },","        /**","        * Called from the drag:end event","        * @method end","        */","        end: function() {","            this._dimCache = null;","            this._cancelScroll();","        }","    });","","    Y.namespace('Plugin');","","","    /**","     * Extends the Scroll class to make the window scroll while dragging.","     * @class DDWindowScroll","     * @extends Scroll","     * @namespace Plugin","     * @constructor","     */","    WS = function() {","        WS.superclass.constructor.apply(this, arguments);","    };","    WS.ATTRS = Y.merge(S.ATTRS, {","        /**","        * Turn on window scroll support, default: true","        * @attribute windowScroll","        * @type Boolean","        */","        windowScroll: {","            value: true,","            setter: function(scroll) {","                if (scroll) {","                    this.set(PARENT_SCROLL, Y.one('win'));","                }","                return scroll;","            }","        }","    });","    Y.extend(WS, S, {","        //Shouldn't have to do this..","        initializer: function() {","            this.set('windowScroll', this.get('windowScroll'));","        }","    });","    /**","    * The Scroll instance will be placed on the Drag instance under the winscroll namespace.","    * @property NS","    * @default winscroll","    * @readonly","    * @protected","    * @static","    * @type {String}","    */","    WS.NAME = WS.NS = 'winscroll';","    Y.Plugin.DDWinScroll = WS;","","","    /**","     * Extends the Scroll class to make a parent node scroll while dragging.","     * @class DDNodeScroll","     * @extends Scroll","     * @namespace Plugin","     * @constructor","     */","    NS = function() {","        NS.superclass.constructor.apply(this, arguments);","","    };","    NS.ATTRS = Y.merge(S.ATTRS, {","        /**","        * The node we want to scroll. Used to set the internal parentScroll attribute.","        * @attribute node","        * @type Node","        */","        node: {","            value: false,","            setter: function(node) {","                var n = Y.one(node);","                if (!n) {","                    if (node !== false) {","                        Y.error('DDNodeScroll: Invalid Node Given: ' + node);","                    }","                } else {","                    this.set(PARENT_SCROLL, n);","                }","                return n;","            }","        }","    });","    Y.extend(NS, S, {","        //Shouldn't have to do this..","        initializer: function() {","            this.set('node', this.get('node'));","        }","    });","    /**","    * The NodeScroll instance will be placed on the Drag instance under the nodescroll namespace.","    * @property NS","    * @default nodescroll","    * @readonly","    * @protected","    * @static","    * @type {String}","    */","    NS.NAME = NS.NS = 'nodescroll';","    Y.Plugin.DDNodeScroll = NS;","","    Y.DD.Scroll = S;","","","","","}, '@VERSION@', {\"requires\": [\"dd-drag\"]});"];
_yuitest_coverage["build/dd-scroll/dd-scroll.js"].lines = {"1":0,"19":0,"20":0,"34":0,"43":0,"44":0,"46":0,"104":0,"139":0,"149":0,"155":0,"156":0,"159":0,"160":0,"161":0,"162":0,"165":0,"166":0,"176":0,"196":0,"197":0,"198":0,"199":0,"200":0,"202":0,"203":0,"204":0,"205":0,"208":0,"209":0,"210":0,"211":0,"212":0,"215":0,"216":0,"217":0,"218":0,"222":0,"223":0,"224":0,"227":0,"228":0,"229":0,"232":0,"233":0,"235":0,"236":0,"238":0,"239":0,"240":0,"241":0,"242":0,"243":0,"244":0,"245":0,"248":0,"249":0,"251":0,"261":0,"262":0,"271":0,"272":0,"273":0,"274":0,"282":0,"283":0,"284":0,"286":0,"287":0,"296":0,"297":0,"307":0,"314":0,"315":0,"319":0,"329":0,"330":0,"332":0,"341":0,"342":0,"344":0,"348":0,"351":0,"363":0,"364":0,"374":0,"375":0,"378":0,"387":0,"388":0,"389":0,"390":0,"393":0,"395":0,"399":0,"402":0,"414":0,"415":0,"417":0};
_yuitest_coverage["build/dd-scroll/dd-scroll.js"].functions = {"S:19":0,"setter:42":0,"_getVPRegion:138":0,"(anonymous 2):165":0,"initializer:158":0,"_checkWinScroll:175":0,"_initScroll:260":0,"_cancelScroll:270":0,"align:281":0,"_setDimCache:295":0,"start:306":0,"end:313":0,"WS:329":0,"setter:340":0,"initializer:350":0,"NS:374":0,"setter:386":0,"initializer:401":0,"(anonymous 1):1":0};
_yuitest_coverage["build/dd-scroll/dd-scroll.js"].coveredLines = 99;
_yuitest_coverage["build/dd-scroll/dd-scroll.js"].coveredFunctions = 19;
_yuitest_coverline("build/dd-scroll/dd-scroll.js", 1);
YUI.add('dd-scroll', function (Y, NAME) {


    /**
     * Base scroller class used to create the Plugin.DDNodeScroll and Plugin.DDWinScroll.
     * This class should not be called on it's own, it's designed to be a plugin.
     * @module dd
     * @submodule dd-scroll
     */
    /**
     * Base scroller class used to create the Plugin.DDNodeScroll and Plugin.DDWinScroll.
     * This class should not be called on it's own, it's designed to be a plugin.
     * @class Scroll
     * @extends Base
     * @namespace DD
     * @constructor
     */

    _yuitest_coverfunc("build/dd-scroll/dd-scroll.js", "(anonymous 1)", 1);
_yuitest_coverline("build/dd-scroll/dd-scroll.js", 19);
var S = function() {
        _yuitest_coverfunc("build/dd-scroll/dd-scroll.js", "S", 19);
_yuitest_coverline("build/dd-scroll/dd-scroll.js", 20);
S.superclass.constructor.apply(this, arguments);

    },
    WS, NS,
    HOST = 'host',
    BUFFER = 'buffer',
    PARENT_SCROLL = 'parentScroll',
    WINDOW_SCROLL = 'windowScroll',
    SCROLL_TOP = 'scrollTop',
    SCROLL_LEFT = 'scrollLeft',
    OFFSET_WIDTH = 'offsetWidth',
    OFFSET_HEIGHT = 'offsetHeight';


    _yuitest_coverline("build/dd-scroll/dd-scroll.js", 34);
S.ATTRS = {
        /**
        * Internal config option to hold the node that we are scrolling. Should not be set by the developer.
        * @attribute parentScroll
        * @type Node
        */
        parentScroll: {
            value: false,
            setter: function(node) {
                _yuitest_coverfunc("build/dd-scroll/dd-scroll.js", "setter", 42);
_yuitest_coverline("build/dd-scroll/dd-scroll.js", 43);
if (node) {
                    _yuitest_coverline("build/dd-scroll/dd-scroll.js", 44);
return node;
                }
                _yuitest_coverline("build/dd-scroll/dd-scroll.js", 46);
return false;
            }
        },
        /**
        * The number of pixels from the edge of the screen to turn on scrolling. Default: 30
        * @attribute buffer
        * @type Number
        */
        buffer: {
            value: 30,
            validator: Y.Lang.isNumber
        },
        /**
        * The number of milliseconds delay to pass to the auto scroller. Default: 235
        * @attribute scrollDelay
        * @type Number
        */
        scrollDelay: {
            value: 235,
            validator: Y.Lang.isNumber
        },
        /**
        * The host we are plugged into.
        * @attribute host
        * @type Object
        */
        host: {
            value: null
        },
        /**
        * Turn on window scroll support, default: false
        * @attribute windowScroll
        * @type Boolean
        */
        windowScroll: {
            value: false,
            validator: Y.Lang.isBoolean
        },
        /**
        * Allow vertical scrolling, default: true.
        * @attribute vertical
        * @type Boolean
        */
        vertical: {
            value: true,
            validator: Y.Lang.isBoolean
        },
        /**
        * Allow horizontal scrolling, default: true.
        * @attribute horizontal
        * @type Boolean
        */
        horizontal: {
            value: true,
            validator: Y.Lang.isBoolean
        }
    };

    _yuitest_coverline("build/dd-scroll/dd-scroll.js", 104);
Y.extend(S, Y.Base, {
        /**
        * Tells if we are actively scrolling or not.
        * @private
        * @property _scrolling
        * @type Boolean
        */
        _scrolling: null,
        /**
        * Cache of the Viewport dims.
        * @private
        * @property _vpRegionCache
        * @type Object
        */
        _vpRegionCache: null,
        /**
        * Cache of the dragNode dims.
        * @private
        * @property _dimCache
        * @type Object
        */
        _dimCache: null,
        /**
        * Holder for the Timer object returned from Y.later.
        * @private
        * @property _scrollTimer
        * @type {Y.later}
        */
        _scrollTimer: null,
        /**
        * Sets the _vpRegionCache property with an Object containing the dims from the viewport.
        * @private
        * @method _getVPRegion
        */
        _getVPRegion: function() {
            _yuitest_coverfunc("build/dd-scroll/dd-scroll.js", "_getVPRegion", 138);
_yuitest_coverline("build/dd-scroll/dd-scroll.js", 139);
var r = {},
                n = this.get(PARENT_SCROLL),
            b = this.get(BUFFER),
            ws = this.get(WINDOW_SCROLL),
            xy = ((ws) ? [] : n.getXY()),
            w = ((ws) ? 'winWidth' : OFFSET_WIDTH),
            h = ((ws) ? 'winHeight' : OFFSET_HEIGHT),
            t = ((ws) ? n.get(SCROLL_TOP) : xy[1]),
            l = ((ws) ? n.get(SCROLL_LEFT) : xy[0]);

            _yuitest_coverline("build/dd-scroll/dd-scroll.js", 149);
r = {
                top: t + b,
                right: (n.get(w) + l) - b,
                bottom: (n.get(h) + t) - b,
                left: l + b
            };
            _yuitest_coverline("build/dd-scroll/dd-scroll.js", 155);
this._vpRegionCache = r;
            _yuitest_coverline("build/dd-scroll/dd-scroll.js", 156);
return r;
        },
        initializer: function() {
            _yuitest_coverfunc("build/dd-scroll/dd-scroll.js", "initializer", 158);
_yuitest_coverline("build/dd-scroll/dd-scroll.js", 159);
var h = this.get(HOST);
            _yuitest_coverline("build/dd-scroll/dd-scroll.js", 160);
h.after('drag:start', Y.bind(this.start, this));
            _yuitest_coverline("build/dd-scroll/dd-scroll.js", 161);
h.after('drag:end', Y.bind(this.end, this));
            _yuitest_coverline("build/dd-scroll/dd-scroll.js", 162);
h.on('drag:align', Y.bind(this.align, this));

            //TODO - This doesn't work yet??
            _yuitest_coverline("build/dd-scroll/dd-scroll.js", 165);
Y.one('win').on('scroll', Y.bind(function() {
                _yuitest_coverfunc("build/dd-scroll/dd-scroll.js", "(anonymous 2)", 165);
_yuitest_coverline("build/dd-scroll/dd-scroll.js", 166);
this._vpRegionCache = null;
            }, this));
        },
        /**
        * Check to see if we need to fire the scroll timer. If scroll timer is running this will scroll the window.
        * @private
        * @method _checkWinScroll
        * @param {Boolean} move Should we move the window. From Y.later
        */
        _checkWinScroll: function(move) {
            _yuitest_coverfunc("build/dd-scroll/dd-scroll.js", "_checkWinScroll", 175);
_yuitest_coverline("build/dd-scroll/dd-scroll.js", 176);
var r = this._getVPRegion(),
                ho = this.get(HOST),
                ws = this.get(WINDOW_SCROLL),
                xy = ho.lastXY,
                scroll = false,
                b = this.get(BUFFER),
                win = this.get(PARENT_SCROLL),
                sTop = win.get(SCROLL_TOP),
                sLeft = win.get(SCROLL_LEFT),
                w = this._dimCache.w,
                h = this._dimCache.h,
                bottom = xy[1] + h,
                top = xy[1],
                right = xy[0] + w,
                left = xy[0],
                nt = top,
                nl = left,
                st = sTop,
                sl = sLeft;

            _yuitest_coverline("build/dd-scroll/dd-scroll.js", 196);
if (this.get('horizontal')) {
                _yuitest_coverline("build/dd-scroll/dd-scroll.js", 197);
if (left <= r.left) {
                    _yuitest_coverline("build/dd-scroll/dd-scroll.js", 198);
scroll = true;
                    _yuitest_coverline("build/dd-scroll/dd-scroll.js", 199);
nl = xy[0] - ((ws) ? b : 0);
                    _yuitest_coverline("build/dd-scroll/dd-scroll.js", 200);
sl = sLeft - b;
                }
                _yuitest_coverline("build/dd-scroll/dd-scroll.js", 202);
if (right >= r.right) {
                    _yuitest_coverline("build/dd-scroll/dd-scroll.js", 203);
scroll = true;
                    _yuitest_coverline("build/dd-scroll/dd-scroll.js", 204);
nl = xy[0] + ((ws) ? b : 0);
                    _yuitest_coverline("build/dd-scroll/dd-scroll.js", 205);
sl = sLeft + b;
                }
            }
            _yuitest_coverline("build/dd-scroll/dd-scroll.js", 208);
if (this.get('vertical')) {
                _yuitest_coverline("build/dd-scroll/dd-scroll.js", 209);
if (bottom >= r.bottom) {
                    _yuitest_coverline("build/dd-scroll/dd-scroll.js", 210);
scroll = true;
                    _yuitest_coverline("build/dd-scroll/dd-scroll.js", 211);
nt = xy[1] + ((ws) ? b : 0);
                    _yuitest_coverline("build/dd-scroll/dd-scroll.js", 212);
st = sTop + b;

                }
                _yuitest_coverline("build/dd-scroll/dd-scroll.js", 215);
if (top <= r.top) {
                    _yuitest_coverline("build/dd-scroll/dd-scroll.js", 216);
scroll = true;
                    _yuitest_coverline("build/dd-scroll/dd-scroll.js", 217);
nt = xy[1] - ((ws) ? b : 0);
                    _yuitest_coverline("build/dd-scroll/dd-scroll.js", 218);
st = sTop - b;
                }
            }

            _yuitest_coverline("build/dd-scroll/dd-scroll.js", 222);
if (st < 0) {
                _yuitest_coverline("build/dd-scroll/dd-scroll.js", 223);
st = 0;
                _yuitest_coverline("build/dd-scroll/dd-scroll.js", 224);
nt = xy[1];
            }

            _yuitest_coverline("build/dd-scroll/dd-scroll.js", 227);
if (sl < 0) {
                _yuitest_coverline("build/dd-scroll/dd-scroll.js", 228);
sl = 0;
                _yuitest_coverline("build/dd-scroll/dd-scroll.js", 229);
nl = xy[0];
            }

            _yuitest_coverline("build/dd-scroll/dd-scroll.js", 232);
if (nt < 0) {
                _yuitest_coverline("build/dd-scroll/dd-scroll.js", 233);
nt = xy[1];
            }
            _yuitest_coverline("build/dd-scroll/dd-scroll.js", 235);
if (nl < 0) {
                _yuitest_coverline("build/dd-scroll/dd-scroll.js", 236);
nl = xy[0];
            }
            _yuitest_coverline("build/dd-scroll/dd-scroll.js", 238);
if (move) {
                _yuitest_coverline("build/dd-scroll/dd-scroll.js", 239);
ho.actXY = [nl, nt];
                _yuitest_coverline("build/dd-scroll/dd-scroll.js", 240);
ho._alignNode([nl, nt], true); //We are srolling..
                _yuitest_coverline("build/dd-scroll/dd-scroll.js", 241);
xy = ho.actXY;
                _yuitest_coverline("build/dd-scroll/dd-scroll.js", 242);
ho.actXY = [nl, nt];
                _yuitest_coverline("build/dd-scroll/dd-scroll.js", 243);
ho._moveNode({ node: win, top: st, left: sl});
                _yuitest_coverline("build/dd-scroll/dd-scroll.js", 244);
if (!st && !sl) {
                    _yuitest_coverline("build/dd-scroll/dd-scroll.js", 245);
this._cancelScroll();
                }
            } else {
                _yuitest_coverline("build/dd-scroll/dd-scroll.js", 248);
if (scroll) {
                    _yuitest_coverline("build/dd-scroll/dd-scroll.js", 249);
this._initScroll();
                } else {
                    _yuitest_coverline("build/dd-scroll/dd-scroll.js", 251);
this._cancelScroll();
                }
            }
        },
        /**
        * Cancel a previous scroll timer and init a new one.
        * @private
        * @method _initScroll
        */
        _initScroll: function() {
            _yuitest_coverfunc("build/dd-scroll/dd-scroll.js", "_initScroll", 260);
_yuitest_coverline("build/dd-scroll/dd-scroll.js", 261);
this._cancelScroll();
            _yuitest_coverline("build/dd-scroll/dd-scroll.js", 262);
this._scrollTimer = Y.Lang.later(this.get('scrollDelay'), this, this._checkWinScroll, [true], true);

        },
        /**
        * Cancel a currently running scroll timer.
        * @private
        * @method _cancelScroll
        */
        _cancelScroll: function() {
            _yuitest_coverfunc("build/dd-scroll/dd-scroll.js", "_cancelScroll", 270);
_yuitest_coverline("build/dd-scroll/dd-scroll.js", 271);
this._scrolling = false;
            _yuitest_coverline("build/dd-scroll/dd-scroll.js", 272);
if (this._scrollTimer) {
                _yuitest_coverline("build/dd-scroll/dd-scroll.js", 273);
this._scrollTimer.cancel();
                _yuitest_coverline("build/dd-scroll/dd-scroll.js", 274);
delete this._scrollTimer;
            }
        },
        /**
        * Called from the drag:align event to determine if we need to scroll.
        * @method align
        */
        align: function(e) {
            _yuitest_coverfunc("build/dd-scroll/dd-scroll.js", "align", 281);
_yuitest_coverline("build/dd-scroll/dd-scroll.js", 282);
if (this._scrolling) {
                _yuitest_coverline("build/dd-scroll/dd-scroll.js", 283);
this._cancelScroll();
                _yuitest_coverline("build/dd-scroll/dd-scroll.js", 284);
e.preventDefault();
            }
            _yuitest_coverline("build/dd-scroll/dd-scroll.js", 286);
if (!this._scrolling) {
                _yuitest_coverline("build/dd-scroll/dd-scroll.js", 287);
this._checkWinScroll();
            }
        },
        /**
        * Set the cache of the dragNode dims.
        * @private
        * @method _setDimCache
        */
        _setDimCache: function() {
            _yuitest_coverfunc("build/dd-scroll/dd-scroll.js", "_setDimCache", 295);
_yuitest_coverline("build/dd-scroll/dd-scroll.js", 296);
var node = this.get(HOST).get('dragNode');
            _yuitest_coverline("build/dd-scroll/dd-scroll.js", 297);
this._dimCache = {
                h: node.get(OFFSET_HEIGHT),
                w: node.get(OFFSET_WIDTH)
            };
        },
        /**
        * Called from the drag:start event
        * @method start
        */
        start: function() {
            _yuitest_coverfunc("build/dd-scroll/dd-scroll.js", "start", 306);
_yuitest_coverline("build/dd-scroll/dd-scroll.js", 307);
this._setDimCache();
        },
        /**
        * Called from the drag:end event
        * @method end
        */
        end: function() {
            _yuitest_coverfunc("build/dd-scroll/dd-scroll.js", "end", 313);
_yuitest_coverline("build/dd-scroll/dd-scroll.js", 314);
this._dimCache = null;
            _yuitest_coverline("build/dd-scroll/dd-scroll.js", 315);
this._cancelScroll();
        }
    });

    _yuitest_coverline("build/dd-scroll/dd-scroll.js", 319);
Y.namespace('Plugin');


    /**
     * Extends the Scroll class to make the window scroll while dragging.
     * @class DDWindowScroll
     * @extends Scroll
     * @namespace Plugin
     * @constructor
     */
    _yuitest_coverline("build/dd-scroll/dd-scroll.js", 329);
WS = function() {
        _yuitest_coverfunc("build/dd-scroll/dd-scroll.js", "WS", 329);
_yuitest_coverline("build/dd-scroll/dd-scroll.js", 330);
WS.superclass.constructor.apply(this, arguments);
    };
    _yuitest_coverline("build/dd-scroll/dd-scroll.js", 332);
WS.ATTRS = Y.merge(S.ATTRS, {
        /**
        * Turn on window scroll support, default: true
        * @attribute windowScroll
        * @type Boolean
        */
        windowScroll: {
            value: true,
            setter: function(scroll) {
                _yuitest_coverfunc("build/dd-scroll/dd-scroll.js", "setter", 340);
_yuitest_coverline("build/dd-scroll/dd-scroll.js", 341);
if (scroll) {
                    _yuitest_coverline("build/dd-scroll/dd-scroll.js", 342);
this.set(PARENT_SCROLL, Y.one('win'));
                }
                _yuitest_coverline("build/dd-scroll/dd-scroll.js", 344);
return scroll;
            }
        }
    });
    _yuitest_coverline("build/dd-scroll/dd-scroll.js", 348);
Y.extend(WS, S, {
        //Shouldn't have to do this..
        initializer: function() {
            _yuitest_coverfunc("build/dd-scroll/dd-scroll.js", "initializer", 350);
_yuitest_coverline("build/dd-scroll/dd-scroll.js", 351);
this.set('windowScroll', this.get('windowScroll'));
        }
    });
    /**
    * The Scroll instance will be placed on the Drag instance under the winscroll namespace.
    * @property NS
    * @default winscroll
    * @readonly
    * @protected
    * @static
    * @type {String}
    */
    _yuitest_coverline("build/dd-scroll/dd-scroll.js", 363);
WS.NAME = WS.NS = 'winscroll';
    _yuitest_coverline("build/dd-scroll/dd-scroll.js", 364);
Y.Plugin.DDWinScroll = WS;


    /**
     * Extends the Scroll class to make a parent node scroll while dragging.
     * @class DDNodeScroll
     * @extends Scroll
     * @namespace Plugin
     * @constructor
     */
    _yuitest_coverline("build/dd-scroll/dd-scroll.js", 374);
NS = function() {
        _yuitest_coverfunc("build/dd-scroll/dd-scroll.js", "NS", 374);
_yuitest_coverline("build/dd-scroll/dd-scroll.js", 375);
NS.superclass.constructor.apply(this, arguments);

    };
    _yuitest_coverline("build/dd-scroll/dd-scroll.js", 378);
NS.ATTRS = Y.merge(S.ATTRS, {
        /**
        * The node we want to scroll. Used to set the internal parentScroll attribute.
        * @attribute node
        * @type Node
        */
        node: {
            value: false,
            setter: function(node) {
                _yuitest_coverfunc("build/dd-scroll/dd-scroll.js", "setter", 386);
_yuitest_coverline("build/dd-scroll/dd-scroll.js", 387);
var n = Y.one(node);
                _yuitest_coverline("build/dd-scroll/dd-scroll.js", 388);
if (!n) {
                    _yuitest_coverline("build/dd-scroll/dd-scroll.js", 389);
if (node !== false) {
                        _yuitest_coverline("build/dd-scroll/dd-scroll.js", 390);
Y.error('DDNodeScroll: Invalid Node Given: ' + node);
                    }
                } else {
                    _yuitest_coverline("build/dd-scroll/dd-scroll.js", 393);
this.set(PARENT_SCROLL, n);
                }
                _yuitest_coverline("build/dd-scroll/dd-scroll.js", 395);
return n;
            }
        }
    });
    _yuitest_coverline("build/dd-scroll/dd-scroll.js", 399);
Y.extend(NS, S, {
        //Shouldn't have to do this..
        initializer: function() {
            _yuitest_coverfunc("build/dd-scroll/dd-scroll.js", "initializer", 401);
_yuitest_coverline("build/dd-scroll/dd-scroll.js", 402);
this.set('node', this.get('node'));
        }
    });
    /**
    * The NodeScroll instance will be placed on the Drag instance under the nodescroll namespace.
    * @property NS
    * @default nodescroll
    * @readonly
    * @protected
    * @static
    * @type {String}
    */
    _yuitest_coverline("build/dd-scroll/dd-scroll.js", 414);
NS.NAME = NS.NS = 'nodescroll';
    _yuitest_coverline("build/dd-scroll/dd-scroll.js", 415);
Y.Plugin.DDNodeScroll = NS;

    _yuitest_coverline("build/dd-scroll/dd-scroll.js", 417);
Y.DD.Scroll = S;




}, '@VERSION@', {"requires": ["dd-drag"]});
