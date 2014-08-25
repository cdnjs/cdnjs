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
_yuitest_coverage["build/scrollview-scrollbars/scrollview-scrollbars.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/scrollview-scrollbars/scrollview-scrollbars.js",
    code: []
};
_yuitest_coverage["build/scrollview-scrollbars/scrollview-scrollbars.js"].code=["YUI.add('scrollview-scrollbars', function (Y, NAME) {","","/**"," * Provides a plugin, which adds support for a scroll indicator to ScrollView instances"," *"," * @module scrollview"," * @submodule scrollview-scrollbars"," */","","var getClassName = Y.ClassNameManager.getClassName,","    _classNames,","","    Transition = Y.Transition,","    NATIVE_TRANSITIONS = Transition.useNative,","    SCROLLBAR = 'scrollbar',","    SCROLLVIEW = 'scrollview',","","    VERTICAL_NODE = \"verticalNode\",","    HORIZONTAL_NODE = \"horizontalNode\",","","    CHILD_CACHE = \"childCache\",","","    TOP = \"top\",","    LEFT = \"left\",","    WIDTH = \"width\",","    HEIGHT = \"height\",","","    HORIZ_CACHE = \"_sbh\",","    VERT_CACHE = \"_sbv\",","","    TRANSITION_PROPERTY = Y.ScrollView._TRANSITION.PROPERTY,","    TRANSFORM = \"transform\",","","    TRANSLATE_X = \"translateX(\",","    TRANSLATE_Y = \"translateY(\",","","    SCALE_X = \"scaleX(\",","    SCALE_Y = \"scaleY(\",","    ","    SCROLL_X = \"scrollX\",","    SCROLL_Y = \"scrollY\",","","    PX = \"px\",","    CLOSE = \")\",","    PX_CLOSE = PX + CLOSE;","","/**"," * ScrollView plugin that adds scroll indicators to ScrollView instances"," *"," * @class ScrollViewScrollbars"," * @namespace Plugin"," * @extends Plugin.Base"," * @constructor"," */","function ScrollbarsPlugin() {","    ScrollbarsPlugin.superclass.constructor.apply(this, arguments);","}","","ScrollbarsPlugin.CLASS_NAMES = {","    showing: getClassName(SCROLLVIEW, SCROLLBAR, 'showing'),","    scrollbar: getClassName(SCROLLVIEW, SCROLLBAR),","    scrollbarV: getClassName(SCROLLVIEW, SCROLLBAR, 'vert'),","    scrollbarH: getClassName(SCROLLVIEW, SCROLLBAR, 'horiz'),","    scrollbarVB: getClassName(SCROLLVIEW, SCROLLBAR, 'vert', 'basic'),","    scrollbarHB: getClassName(SCROLLVIEW, SCROLLBAR, 'horiz', 'basic'),","    child: getClassName(SCROLLVIEW, 'child'),","    first: getClassName(SCROLLVIEW, 'first'),","    middle: getClassName(SCROLLVIEW, 'middle'),","    last: getClassName(SCROLLVIEW, 'last')","};","","_classNames = ScrollbarsPlugin.CLASS_NAMES;","","/**"," * The identity of the plugin"," *"," * @property NAME"," * @type String"," * @default 'pluginScrollViewScrollbars'"," * @static"," */","ScrollbarsPlugin.NAME = 'pluginScrollViewScrollbars';","    ","/**"," * The namespace on which the plugin will reside."," *"," * @property NS"," * @type String"," * @default 'scrollbars'"," * @static"," */","ScrollbarsPlugin.NS = 'scrollbars';","","/**"," * HTML template for the scrollbar"," *"," * @property SCROLLBAR_TEMPLATE"," * @type Object"," * @static"," */","ScrollbarsPlugin.SCROLLBAR_TEMPLATE = [","    '<div>',","    '<span class=\"' + _classNames.child + ' ' + _classNames.first + '\"></span>',","    '<span class=\"' + _classNames.child + ' ' + _classNames.middle + '\"></span>',","    '<span class=\"' + _classNames.child + ' ' + _classNames.last + '\"></span>',","    '</div>'","].join('');","","/**"," * The default attribute configuration for the plugin"," *"," * @property ATTRS"," * @type Object"," * @static"," */","ScrollbarsPlugin.ATTRS = {","    ","    /**","     * Vertical scrollbar node","     *","     * @attribute verticalNode","     * @type Y.Node","     */","    verticalNode: {","        setter: '_setNode',","        valueFn: '_defaultNode'","    },","","    /**","     * Horizontal scrollbar node","     *","     * @attribute horizontalNode","     * @type Y.Node","     */","    horizontalNode: {","        setter: '_setNode',","        valueFn: '_defaultNode'","    }","};","","Y.namespace(\"Plugin\").ScrollViewScrollbars = Y.extend(ScrollbarsPlugin, Y.Plugin.Base, {","","    /**","     * Designated initializer","     *","     * @method initializer","     */","    initializer: function() {","        this._host = this.get(\"host\");","","        this.afterHostEvent('scrollEnd', this._hostScrollEnd);","        this.afterHostMethod('scrollTo', this._update);","        this.afterHostMethod('_uiDimensionsChange', this._hostDimensionsChange);","    },","","    /**","     * Set up the DOM nodes for the scrollbars. This method is invoked whenever the","     * host's _uiDimensionsChange fires, giving us the opportunity to remove un-needed","     * scrollbars, as well as add one if necessary.","     *","     * @method _hostDimensionsChange","     * @protected","     */","    _hostDimensionsChange: function() {","        var host = this._host,","            axis = host._cAxis,","            scrollX = host.get(SCROLL_X),","            scrollY = host.get(SCROLL_Y);","","        this._dims = host._getScrollDims();","","        if (axis && axis.y) {","            this._renderBar(this.get(VERTICAL_NODE), true, 'vert');","        }","","        if (axis && axis.x) {","            this._renderBar(this.get(HORIZONTAL_NODE), true, 'horiz');","        }","","        this._update(scrollX, scrollY);","","        Y.later(500, this, 'flash', true);","    },","","    /**","     * Handler for the scrollEnd event fired by the host. Default implementation flashes the scrollbar","     *","     * @method _hostScrollEnd","     * @param {Event.Facade} e The event facade.","     * @protected","     */","    _hostScrollEnd : function() {","        var host = this._host,","            scrollX = host.get(SCROLL_X),","            scrollY = host.get(SCROLL_Y);","","        this.flash();","","        this._update(scrollX, scrollY);","    },","","    /**","     * Adds or removes a scrollbar node from the document.","     *","     * @method _renderBar","     * @private","     * @param {Node} bar The scrollbar node","     * @param {boolean} add true, to add the node, false to remove it","     */","    _renderBar: function(bar, add) {","        var inDoc = bar.inDoc(),","            bb = this._host._bb,","            className = bar.getData(\"isHoriz\") ? _classNames.scrollbarHB : _classNames.scrollbarVB;","","        if (add && !inDoc) {","            bb.append(bar);","            bar.toggleClass(className, this._basic);","            this._setChildCache(bar);","        } else if(!add && inDoc) {","            bar.remove();","            this._clearChildCache(bar);","        }","    },","","    /**","     * Caches scrollbar child element information,","     * to optimize _update implementation","     *","     * @method _setChildCache","     * @private","     * @param {Node} node","     */","    _setChildCache : function(node) {","        var c = node.get(\"children\"),","            fc = c.item(0),","            mc = c.item(1),","            lc = c.item(2),","            size = node.getData(\"isHoriz\") ? \"offsetWidth\" : \"offsetHeight\";","","        node.setStyle(TRANSITION_PROPERTY, TRANSFORM);","        mc.setStyle(TRANSITION_PROPERTY, TRANSFORM);","        lc.setStyle(TRANSITION_PROPERTY, TRANSFORM);","","        node.setData(CHILD_CACHE, {","            fc : fc,","            lc : lc,","            mc : mc,","            fcSize : fc && fc.get(size),","            lcSize : lc && lc.get(size)","        });","    },","","    /**","     * Clears child cache","     *","     * @method _clearChildCache","     * @private","     * @param {Node} node","     */","    _clearChildCache : function(node) {","        node.clearData(CHILD_CACHE);","    },","","    /**","     * Utility method, to move/resize either vertical or horizontal scrollbars","     *","     * @method _updateBar","     * @private","     *","     * @param {Node} scrollbar The scrollbar node.","     * @param {Number} current The current scroll position.","     * @param {Number} duration The transition duration.","     * @param {boolean} horiz true if horizontal, false if vertical.","     */","    _updateBar : function(scrollbar, current, duration, horiz) {","","        var host = this._host,","            basic = this._basic,","","            scrollbarSize = 0,","            scrollbarPos = 1,","","            childCache = scrollbar.getData(CHILD_CACHE),","            lastChild = childCache.lc,","            middleChild = childCache.mc,","            firstChildSize = childCache.fcSize,","            lastChildSize = childCache.lcSize,","            middleChildSize,","            lastChildPosition,","","            transition,","            translate,","            scale,","","            dim,","            dimOffset,","            dimCache,","            widgetSize,","            contentSize;","","        if (horiz) {","            dim = WIDTH;","            dimOffset = LEFT;","            dimCache = HORIZ_CACHE;","            widgetSize = this._dims.offsetWidth;","            contentSize = this._dims.scrollWidth;","            translate = TRANSLATE_X;","            scale = SCALE_X;","            current = (current !== undefined) ? current : host.get(SCROLL_X);","        } else {","            dim = HEIGHT;","            dimOffset = TOP;","            dimCache = VERT_CACHE;","            widgetSize = this._dims.offsetHeight;","            contentSize = this._dims.scrollHeight;","            translate = TRANSLATE_Y;","            scale = SCALE_Y;","            current = (current !== undefined) ? current : host.get(SCROLL_Y);","        }","","        scrollbarSize = Math.floor(widgetSize * (widgetSize/contentSize));","        scrollbarPos = Math.floor((current/(contentSize - widgetSize)) * (widgetSize - scrollbarSize));","        if (scrollbarSize > widgetSize) {","            scrollbarSize = 1;","        }","","        if (scrollbarPos > (widgetSize - scrollbarSize)) {","            scrollbarSize = scrollbarSize - (scrollbarPos - (widgetSize - scrollbarSize));","        } else if (scrollbarPos < 0) {","            scrollbarSize = scrollbarPos + scrollbarSize;","            scrollbarPos = 0;","        } else if (isNaN(scrollbarPos)) {","            scrollbarPos = 0;","        }","","        middleChildSize = (scrollbarSize - (firstChildSize + lastChildSize));","","        if (middleChildSize < 0) {","            middleChildSize = 0;","        }","","        if (middleChildSize === 0 && scrollbarPos !== 0) {","            scrollbarPos = widgetSize - (firstChildSize + lastChildSize) - 1;","        }","","        if (duration !== 0) {","            // Position Scrollbar","            transition = {","                duration : duration","            };","","            if (NATIVE_TRANSITIONS) {","                transition.transform = translate + scrollbarPos + PX_CLOSE;","            } else {","                transition[dimOffset] = scrollbarPos + PX;","            }","","            scrollbar.transition(transition);","","        } else {","            if (NATIVE_TRANSITIONS) {","                scrollbar.setStyle(TRANSFORM, translate + scrollbarPos + PX_CLOSE);","            } else {","                scrollbar.setStyle(dimOffset, scrollbarPos + PX);","            }","        }","","        // Resize Scrollbar Middle Child","        if (this[dimCache] !== middleChildSize) {","            this[dimCache] = middleChildSize;","","            if (middleChildSize > 0) {","","                if (duration !== 0) {","                    transition = {","                        duration : duration","                    };","","                    if(NATIVE_TRANSITIONS) {","                        transition.transform = scale + middleChildSize + CLOSE;","                    } else {","                        transition[dim] = middleChildSize + PX;","                    }","","                    middleChild.transition(transition);","                } else {","                    if (NATIVE_TRANSITIONS) {","                        middleChild.setStyle(TRANSFORM, scale + middleChildSize + CLOSE);","                    } else {","                        middleChild.setStyle(dim, middleChildSize + PX);","                    }","                }","    ","                // Position Last Child","                if (!horiz || !basic) {","","                    lastChildPosition = scrollbarSize - lastChildSize;","    ","                    if(duration !== 0) {","                        transition = {","                            duration : duration","                        };","                ","                        if (NATIVE_TRANSITIONS) {","                            transition.transform = translate + lastChildPosition + PX_CLOSE;","                        } else {","                            transition[dimOffset] = lastChildPosition;","                        }","","                        lastChild.transition(transition);","                    } else {","                        if (NATIVE_TRANSITIONS) {","                            lastChild.setStyle(TRANSFORM, translate + lastChildPosition + PX_CLOSE);","                        } else {","                            lastChild.setStyle(dimOffset, lastChildPosition + PX);","                        }","                    }","                }","            }","        }","    },","","    /**","     * AOP method, invoked after the host's _uiScrollTo method,","     *  to position and resize the scroll bars","     *","     * @method _update","     * @param x {Number} The current scrollX value","     * @param y {Number} The current scrollY value","     * @param duration {Number} Number of ms of animation (optional) - used when snapping to bounds","     * @param easing {String} Optional easing equation to use during the animation, if duration is set","     * @protected","     */","    _update: function(x, y, duration) {","        var vNode = this.get(VERTICAL_NODE),","            hNode = this.get(HORIZONTAL_NODE),","            host = this._host,","            axis = host._cAxis;","","        duration = (duration || 0)/1000;","","        if (!this._showing) {","            this.show();","        }","","        if (axis && axis.y && vNode && y !== null) {","            this._updateBar(vNode, y, duration, false);","        }","","        if (axis && axis.x && hNode && x !== null) {","            this._updateBar(hNode, x, duration, true);","        }","    },","","    /**","     * Show the scroll bar indicators","     *","     * @method show","     * @param animated {Boolean} Whether or not to animate the showing","     */","    show: function(animated) {","        this._show(true, animated);","    },","","    /**","     * Hide the scroll bar indicators","     *","     * @method hide","     * @param animated {Boolean} Whether or not to animate the hiding","     */","    hide: function(animated) {","        this._show(false, animated);","    },","","    /**","     * Internal hide/show implementation utility method","     *","     * @method _show","     * @param {boolean} show Whether to show or hide the scrollbar","     * @param {bolean} animated Whether or not to animate while showing/hide","     * @protected","     */","    _show : function(show, animated) {","","        var verticalNode = this.get(VERTICAL_NODE),","            horizontalNode = this.get(HORIZONTAL_NODE),","","            duration = (animated) ? 0.6 : 0,","            opacity = (show) ? 1 : 0,","","            transition;","","        this._showing = show;","","        if (this._flashTimer) {","            this._flashTimer.cancel();","        }","","        transition = {","            duration : duration,","            opacity : opacity","        };","","        if (verticalNode && verticalNode._node) {","            verticalNode.transition(transition);","        }","","        if (horizontalNode && horizontalNode._node) {","            horizontalNode.transition(transition);","        }","    },","","    /**","     * Momentarily flash the scroll bars to indicate current scroll position","     *","     * @method flash","     */","    flash: function() {","        this.show(true);","        this._flashTimer = Y.later(800, this, 'hide', true);","    },","","    /**","     * Setter for the verticalNode and horizontalNode attributes","     *","     * @method _setNode","     * @param node {Node} The Y.Node instance for the scrollbar","     * @param name {String} The attribute name","     * @return {Node} The Y.Node instance for the scrollbar","     *","     * @protected","     */","    _setNode: function(node, name) {","        var horiz = (name === HORIZONTAL_NODE);","            node = Y.one(node);","","        if (node) {","            node.addClass(_classNames.scrollbar);","            node.addClass( (horiz) ? _classNames.scrollbarH : _classNames.scrollbarV );","            node.setData(\"isHoriz\", horiz);","        }","","        return node;","    },","","    /**","     * Creates default node instances for scrollbars","     *","     * @method _defaultNode","     * @return {Node} The Y.Node instance for the scrollbar","     *","     * @protected","     */","    _defaultNode: function() {","        return Y.Node.create(ScrollbarsPlugin.SCROLLBAR_TEMPLATE);","    },","","    _basic: Y.UA.ie && Y.UA.ie <= 8","","});","","","}, '@VERSION@', {\"requires\": [\"classnamemanager\", \"transition\", \"plugin\"], \"skinnable\": true});"];
_yuitest_coverage["build/scrollview-scrollbars/scrollview-scrollbars.js"].lines = {"1":0,"10":0,"55":0,"56":0,"59":0,"72":0,"82":0,"92":0,"101":0,"116":0,"141":0,"149":0,"151":0,"152":0,"153":0,"165":0,"170":0,"172":0,"173":0,"176":0,"177":0,"180":0,"182":0,"193":0,"197":0,"199":0,"211":0,"215":0,"216":0,"217":0,"218":0,"219":0,"220":0,"221":0,"234":0,"240":0,"241":0,"242":0,"244":0,"261":0,"277":0,"301":0,"302":0,"303":0,"304":0,"305":0,"306":0,"307":0,"308":0,"309":0,"311":0,"312":0,"313":0,"314":0,"315":0,"316":0,"317":0,"318":0,"321":0,"322":0,"323":0,"324":0,"327":0,"328":0,"329":0,"330":0,"331":0,"332":0,"333":0,"336":0,"338":0,"339":0,"342":0,"343":0,"346":0,"348":0,"352":0,"353":0,"355":0,"358":0,"361":0,"362":0,"364":0,"369":0,"370":0,"372":0,"374":0,"375":0,"379":0,"380":0,"382":0,"385":0,"387":0,"388":0,"390":0,"395":0,"397":0,"399":0,"400":0,"404":0,"405":0,"407":0,"410":0,"412":0,"413":0,"415":0,"435":0,"440":0,"442":0,"443":0,"446":0,"447":0,"450":0,"451":0,"462":0,"472":0,"485":0,"493":0,"495":0,"496":0,"499":0,"504":0,"505":0,"508":0,"509":0,"519":0,"520":0,"534":0,"535":0,"537":0,"538":0,"539":0,"540":0,"543":0,"555":0};
_yuitest_coverage["build/scrollview-scrollbars/scrollview-scrollbars.js"].functions = {"ScrollbarsPlugin:55":0,"initializer:148":0,"_hostDimensionsChange:164":0,"_hostScrollEnd:192":0,"_renderBar:210":0,"_setChildCache:233":0,"_clearChildCache:260":0,"_updateBar:275":0,"_update:434":0,"show:461":0,"hide:471":0,"_show:483":0,"flash:518":0,"_setNode:533":0,"_defaultNode:554":0,"(anonymous 1):1":0};
_yuitest_coverage["build/scrollview-scrollbars/scrollview-scrollbars.js"].coveredLines = 135;
_yuitest_coverage["build/scrollview-scrollbars/scrollview-scrollbars.js"].coveredFunctions = 16;
_yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 1);
YUI.add('scrollview-scrollbars', function (Y, NAME) {

/**
 * Provides a plugin, which adds support for a scroll indicator to ScrollView instances
 *
 * @module scrollview
 * @submodule scrollview-scrollbars
 */

_yuitest_coverfunc("build/scrollview-scrollbars/scrollview-scrollbars.js", "(anonymous 1)", 1);
_yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 10);
var getClassName = Y.ClassNameManager.getClassName,
    _classNames,

    Transition = Y.Transition,
    NATIVE_TRANSITIONS = Transition.useNative,
    SCROLLBAR = 'scrollbar',
    SCROLLVIEW = 'scrollview',

    VERTICAL_NODE = "verticalNode",
    HORIZONTAL_NODE = "horizontalNode",

    CHILD_CACHE = "childCache",

    TOP = "top",
    LEFT = "left",
    WIDTH = "width",
    HEIGHT = "height",

    HORIZ_CACHE = "_sbh",
    VERT_CACHE = "_sbv",

    TRANSITION_PROPERTY = Y.ScrollView._TRANSITION.PROPERTY,
    TRANSFORM = "transform",

    TRANSLATE_X = "translateX(",
    TRANSLATE_Y = "translateY(",

    SCALE_X = "scaleX(",
    SCALE_Y = "scaleY(",
    
    SCROLL_X = "scrollX",
    SCROLL_Y = "scrollY",

    PX = "px",
    CLOSE = ")",
    PX_CLOSE = PX + CLOSE;

/**
 * ScrollView plugin that adds scroll indicators to ScrollView instances
 *
 * @class ScrollViewScrollbars
 * @namespace Plugin
 * @extends Plugin.Base
 * @constructor
 */
_yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 55);
function ScrollbarsPlugin() {
    _yuitest_coverfunc("build/scrollview-scrollbars/scrollview-scrollbars.js", "ScrollbarsPlugin", 55);
_yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 56);
ScrollbarsPlugin.superclass.constructor.apply(this, arguments);
}

_yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 59);
ScrollbarsPlugin.CLASS_NAMES = {
    showing: getClassName(SCROLLVIEW, SCROLLBAR, 'showing'),
    scrollbar: getClassName(SCROLLVIEW, SCROLLBAR),
    scrollbarV: getClassName(SCROLLVIEW, SCROLLBAR, 'vert'),
    scrollbarH: getClassName(SCROLLVIEW, SCROLLBAR, 'horiz'),
    scrollbarVB: getClassName(SCROLLVIEW, SCROLLBAR, 'vert', 'basic'),
    scrollbarHB: getClassName(SCROLLVIEW, SCROLLBAR, 'horiz', 'basic'),
    child: getClassName(SCROLLVIEW, 'child'),
    first: getClassName(SCROLLVIEW, 'first'),
    middle: getClassName(SCROLLVIEW, 'middle'),
    last: getClassName(SCROLLVIEW, 'last')
};

_yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 72);
_classNames = ScrollbarsPlugin.CLASS_NAMES;

/**
 * The identity of the plugin
 *
 * @property NAME
 * @type String
 * @default 'pluginScrollViewScrollbars'
 * @static
 */
_yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 82);
ScrollbarsPlugin.NAME = 'pluginScrollViewScrollbars';
    
/**
 * The namespace on which the plugin will reside.
 *
 * @property NS
 * @type String
 * @default 'scrollbars'
 * @static
 */
_yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 92);
ScrollbarsPlugin.NS = 'scrollbars';

/**
 * HTML template for the scrollbar
 *
 * @property SCROLLBAR_TEMPLATE
 * @type Object
 * @static
 */
_yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 101);
ScrollbarsPlugin.SCROLLBAR_TEMPLATE = [
    '<div>',
    '<span class="' + _classNames.child + ' ' + _classNames.first + '"></span>',
    '<span class="' + _classNames.child + ' ' + _classNames.middle + '"></span>',
    '<span class="' + _classNames.child + ' ' + _classNames.last + '"></span>',
    '</div>'
].join('');

/**
 * The default attribute configuration for the plugin
 *
 * @property ATTRS
 * @type Object
 * @static
 */
_yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 116);
ScrollbarsPlugin.ATTRS = {
    
    /**
     * Vertical scrollbar node
     *
     * @attribute verticalNode
     * @type Y.Node
     */
    verticalNode: {
        setter: '_setNode',
        valueFn: '_defaultNode'
    },

    /**
     * Horizontal scrollbar node
     *
     * @attribute horizontalNode
     * @type Y.Node
     */
    horizontalNode: {
        setter: '_setNode',
        valueFn: '_defaultNode'
    }
};

_yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 141);
Y.namespace("Plugin").ScrollViewScrollbars = Y.extend(ScrollbarsPlugin, Y.Plugin.Base, {

    /**
     * Designated initializer
     *
     * @method initializer
     */
    initializer: function() {
        _yuitest_coverfunc("build/scrollview-scrollbars/scrollview-scrollbars.js", "initializer", 148);
_yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 149);
this._host = this.get("host");

        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 151);
this.afterHostEvent('scrollEnd', this._hostScrollEnd);
        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 152);
this.afterHostMethod('scrollTo', this._update);
        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 153);
this.afterHostMethod('_uiDimensionsChange', this._hostDimensionsChange);
    },

    /**
     * Set up the DOM nodes for the scrollbars. This method is invoked whenever the
     * host's _uiDimensionsChange fires, giving us the opportunity to remove un-needed
     * scrollbars, as well as add one if necessary.
     *
     * @method _hostDimensionsChange
     * @protected
     */
    _hostDimensionsChange: function() {
        _yuitest_coverfunc("build/scrollview-scrollbars/scrollview-scrollbars.js", "_hostDimensionsChange", 164);
_yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 165);
var host = this._host,
            axis = host._cAxis,
            scrollX = host.get(SCROLL_X),
            scrollY = host.get(SCROLL_Y);

        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 170);
this._dims = host._getScrollDims();

        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 172);
if (axis && axis.y) {
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 173);
this._renderBar(this.get(VERTICAL_NODE), true, 'vert');
        }

        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 176);
if (axis && axis.x) {
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 177);
this._renderBar(this.get(HORIZONTAL_NODE), true, 'horiz');
        }

        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 180);
this._update(scrollX, scrollY);

        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 182);
Y.later(500, this, 'flash', true);
    },

    /**
     * Handler for the scrollEnd event fired by the host. Default implementation flashes the scrollbar
     *
     * @method _hostScrollEnd
     * @param {Event.Facade} e The event facade.
     * @protected
     */
    _hostScrollEnd : function() {
        _yuitest_coverfunc("build/scrollview-scrollbars/scrollview-scrollbars.js", "_hostScrollEnd", 192);
_yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 193);
var host = this._host,
            scrollX = host.get(SCROLL_X),
            scrollY = host.get(SCROLL_Y);

        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 197);
this.flash();

        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 199);
this._update(scrollX, scrollY);
    },

    /**
     * Adds or removes a scrollbar node from the document.
     *
     * @method _renderBar
     * @private
     * @param {Node} bar The scrollbar node
     * @param {boolean} add true, to add the node, false to remove it
     */
    _renderBar: function(bar, add) {
        _yuitest_coverfunc("build/scrollview-scrollbars/scrollview-scrollbars.js", "_renderBar", 210);
_yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 211);
var inDoc = bar.inDoc(),
            bb = this._host._bb,
            className = bar.getData("isHoriz") ? _classNames.scrollbarHB : _classNames.scrollbarVB;

        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 215);
if (add && !inDoc) {
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 216);
bb.append(bar);
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 217);
bar.toggleClass(className, this._basic);
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 218);
this._setChildCache(bar);
        } else {_yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 219);
if(!add && inDoc) {
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 220);
bar.remove();
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 221);
this._clearChildCache(bar);
        }}
    },

    /**
     * Caches scrollbar child element information,
     * to optimize _update implementation
     *
     * @method _setChildCache
     * @private
     * @param {Node} node
     */
    _setChildCache : function(node) {
        _yuitest_coverfunc("build/scrollview-scrollbars/scrollview-scrollbars.js", "_setChildCache", 233);
_yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 234);
var c = node.get("children"),
            fc = c.item(0),
            mc = c.item(1),
            lc = c.item(2),
            size = node.getData("isHoriz") ? "offsetWidth" : "offsetHeight";

        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 240);
node.setStyle(TRANSITION_PROPERTY, TRANSFORM);
        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 241);
mc.setStyle(TRANSITION_PROPERTY, TRANSFORM);
        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 242);
lc.setStyle(TRANSITION_PROPERTY, TRANSFORM);

        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 244);
node.setData(CHILD_CACHE, {
            fc : fc,
            lc : lc,
            mc : mc,
            fcSize : fc && fc.get(size),
            lcSize : lc && lc.get(size)
        });
    },

    /**
     * Clears child cache
     *
     * @method _clearChildCache
     * @private
     * @param {Node} node
     */
    _clearChildCache : function(node) {
        _yuitest_coverfunc("build/scrollview-scrollbars/scrollview-scrollbars.js", "_clearChildCache", 260);
_yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 261);
node.clearData(CHILD_CACHE);
    },

    /**
     * Utility method, to move/resize either vertical or horizontal scrollbars
     *
     * @method _updateBar
     * @private
     *
     * @param {Node} scrollbar The scrollbar node.
     * @param {Number} current The current scroll position.
     * @param {Number} duration The transition duration.
     * @param {boolean} horiz true if horizontal, false if vertical.
     */
    _updateBar : function(scrollbar, current, duration, horiz) {

        _yuitest_coverfunc("build/scrollview-scrollbars/scrollview-scrollbars.js", "_updateBar", 275);
_yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 277);
var host = this._host,
            basic = this._basic,

            scrollbarSize = 0,
            scrollbarPos = 1,

            childCache = scrollbar.getData(CHILD_CACHE),
            lastChild = childCache.lc,
            middleChild = childCache.mc,
            firstChildSize = childCache.fcSize,
            lastChildSize = childCache.lcSize,
            middleChildSize,
            lastChildPosition,

            transition,
            translate,
            scale,

            dim,
            dimOffset,
            dimCache,
            widgetSize,
            contentSize;

        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 301);
if (horiz) {
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 302);
dim = WIDTH;
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 303);
dimOffset = LEFT;
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 304);
dimCache = HORIZ_CACHE;
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 305);
widgetSize = this._dims.offsetWidth;
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 306);
contentSize = this._dims.scrollWidth;
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 307);
translate = TRANSLATE_X;
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 308);
scale = SCALE_X;
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 309);
current = (current !== undefined) ? current : host.get(SCROLL_X);
        } else {
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 311);
dim = HEIGHT;
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 312);
dimOffset = TOP;
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 313);
dimCache = VERT_CACHE;
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 314);
widgetSize = this._dims.offsetHeight;
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 315);
contentSize = this._dims.scrollHeight;
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 316);
translate = TRANSLATE_Y;
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 317);
scale = SCALE_Y;
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 318);
current = (current !== undefined) ? current : host.get(SCROLL_Y);
        }

        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 321);
scrollbarSize = Math.floor(widgetSize * (widgetSize/contentSize));
        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 322);
scrollbarPos = Math.floor((current/(contentSize - widgetSize)) * (widgetSize - scrollbarSize));
        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 323);
if (scrollbarSize > widgetSize) {
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 324);
scrollbarSize = 1;
        }

        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 327);
if (scrollbarPos > (widgetSize - scrollbarSize)) {
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 328);
scrollbarSize = scrollbarSize - (scrollbarPos - (widgetSize - scrollbarSize));
        } else {_yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 329);
if (scrollbarPos < 0) {
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 330);
scrollbarSize = scrollbarPos + scrollbarSize;
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 331);
scrollbarPos = 0;
        } else {_yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 332);
if (isNaN(scrollbarPos)) {
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 333);
scrollbarPos = 0;
        }}}

        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 336);
middleChildSize = (scrollbarSize - (firstChildSize + lastChildSize));

        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 338);
if (middleChildSize < 0) {
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 339);
middleChildSize = 0;
        }

        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 342);
if (middleChildSize === 0 && scrollbarPos !== 0) {
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 343);
scrollbarPos = widgetSize - (firstChildSize + lastChildSize) - 1;
        }

        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 346);
if (duration !== 0) {
            // Position Scrollbar
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 348);
transition = {
                duration : duration
            };

            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 352);
if (NATIVE_TRANSITIONS) {
                _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 353);
transition.transform = translate + scrollbarPos + PX_CLOSE;
            } else {
                _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 355);
transition[dimOffset] = scrollbarPos + PX;
            }

            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 358);
scrollbar.transition(transition);

        } else {
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 361);
if (NATIVE_TRANSITIONS) {
                _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 362);
scrollbar.setStyle(TRANSFORM, translate + scrollbarPos + PX_CLOSE);
            } else {
                _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 364);
scrollbar.setStyle(dimOffset, scrollbarPos + PX);
            }
        }

        // Resize Scrollbar Middle Child
        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 369);
if (this[dimCache] !== middleChildSize) {
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 370);
this[dimCache] = middleChildSize;

            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 372);
if (middleChildSize > 0) {

                _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 374);
if (duration !== 0) {
                    _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 375);
transition = {
                        duration : duration
                    };

                    _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 379);
if(NATIVE_TRANSITIONS) {
                        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 380);
transition.transform = scale + middleChildSize + CLOSE;
                    } else {
                        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 382);
transition[dim] = middleChildSize + PX;
                    }

                    _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 385);
middleChild.transition(transition);
                } else {
                    _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 387);
if (NATIVE_TRANSITIONS) {
                        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 388);
middleChild.setStyle(TRANSFORM, scale + middleChildSize + CLOSE);
                    } else {
                        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 390);
middleChild.setStyle(dim, middleChildSize + PX);
                    }
                }
    
                // Position Last Child
                _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 395);
if (!horiz || !basic) {

                    _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 397);
lastChildPosition = scrollbarSize - lastChildSize;
    
                    _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 399);
if(duration !== 0) {
                        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 400);
transition = {
                            duration : duration
                        };
                
                        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 404);
if (NATIVE_TRANSITIONS) {
                            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 405);
transition.transform = translate + lastChildPosition + PX_CLOSE;
                        } else {
                            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 407);
transition[dimOffset] = lastChildPosition;
                        }

                        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 410);
lastChild.transition(transition);
                    } else {
                        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 412);
if (NATIVE_TRANSITIONS) {
                            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 413);
lastChild.setStyle(TRANSFORM, translate + lastChildPosition + PX_CLOSE);
                        } else {
                            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 415);
lastChild.setStyle(dimOffset, lastChildPosition + PX);
                        }
                    }
                }
            }
        }
    },

    /**
     * AOP method, invoked after the host's _uiScrollTo method,
     *  to position and resize the scroll bars
     *
     * @method _update
     * @param x {Number} The current scrollX value
     * @param y {Number} The current scrollY value
     * @param duration {Number} Number of ms of animation (optional) - used when snapping to bounds
     * @param easing {String} Optional easing equation to use during the animation, if duration is set
     * @protected
     */
    _update: function(x, y, duration) {
        _yuitest_coverfunc("build/scrollview-scrollbars/scrollview-scrollbars.js", "_update", 434);
_yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 435);
var vNode = this.get(VERTICAL_NODE),
            hNode = this.get(HORIZONTAL_NODE),
            host = this._host,
            axis = host._cAxis;

        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 440);
duration = (duration || 0)/1000;

        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 442);
if (!this._showing) {
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 443);
this.show();
        }

        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 446);
if (axis && axis.y && vNode && y !== null) {
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 447);
this._updateBar(vNode, y, duration, false);
        }

        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 450);
if (axis && axis.x && hNode && x !== null) {
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 451);
this._updateBar(hNode, x, duration, true);
        }
    },

    /**
     * Show the scroll bar indicators
     *
     * @method show
     * @param animated {Boolean} Whether or not to animate the showing
     */
    show: function(animated) {
        _yuitest_coverfunc("build/scrollview-scrollbars/scrollview-scrollbars.js", "show", 461);
_yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 462);
this._show(true, animated);
    },

    /**
     * Hide the scroll bar indicators
     *
     * @method hide
     * @param animated {Boolean} Whether or not to animate the hiding
     */
    hide: function(animated) {
        _yuitest_coverfunc("build/scrollview-scrollbars/scrollview-scrollbars.js", "hide", 471);
_yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 472);
this._show(false, animated);
    },

    /**
     * Internal hide/show implementation utility method
     *
     * @method _show
     * @param {boolean} show Whether to show or hide the scrollbar
     * @param {bolean} animated Whether or not to animate while showing/hide
     * @protected
     */
    _show : function(show, animated) {

        _yuitest_coverfunc("build/scrollview-scrollbars/scrollview-scrollbars.js", "_show", 483);
_yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 485);
var verticalNode = this.get(VERTICAL_NODE),
            horizontalNode = this.get(HORIZONTAL_NODE),

            duration = (animated) ? 0.6 : 0,
            opacity = (show) ? 1 : 0,

            transition;

        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 493);
this._showing = show;

        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 495);
if (this._flashTimer) {
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 496);
this._flashTimer.cancel();
        }

        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 499);
transition = {
            duration : duration,
            opacity : opacity
        };

        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 504);
if (verticalNode && verticalNode._node) {
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 505);
verticalNode.transition(transition);
        }

        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 508);
if (horizontalNode && horizontalNode._node) {
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 509);
horizontalNode.transition(transition);
        }
    },

    /**
     * Momentarily flash the scroll bars to indicate current scroll position
     *
     * @method flash
     */
    flash: function() {
        _yuitest_coverfunc("build/scrollview-scrollbars/scrollview-scrollbars.js", "flash", 518);
_yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 519);
this.show(true);
        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 520);
this._flashTimer = Y.later(800, this, 'hide', true);
    },

    /**
     * Setter for the verticalNode and horizontalNode attributes
     *
     * @method _setNode
     * @param node {Node} The Y.Node instance for the scrollbar
     * @param name {String} The attribute name
     * @return {Node} The Y.Node instance for the scrollbar
     *
     * @protected
     */
    _setNode: function(node, name) {
        _yuitest_coverfunc("build/scrollview-scrollbars/scrollview-scrollbars.js", "_setNode", 533);
_yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 534);
var horiz = (name === HORIZONTAL_NODE);
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 535);
node = Y.one(node);

        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 537);
if (node) {
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 538);
node.addClass(_classNames.scrollbar);
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 539);
node.addClass( (horiz) ? _classNames.scrollbarH : _classNames.scrollbarV );
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 540);
node.setData("isHoriz", horiz);
        }

        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 543);
return node;
    },

    /**
     * Creates default node instances for scrollbars
     *
     * @method _defaultNode
     * @return {Node} The Y.Node instance for the scrollbar
     *
     * @protected
     */
    _defaultNode: function() {
        _yuitest_coverfunc("build/scrollview-scrollbars/scrollview-scrollbars.js", "_defaultNode", 554);
_yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 555);
return Y.Node.create(ScrollbarsPlugin.SCROLLBAR_TEMPLATE);
    },

    _basic: Y.UA.ie && Y.UA.ie <= 8

});


}, '@VERSION@', {"requires": ["classnamemanager", "transition", "plugin"], "skinnable": true});
