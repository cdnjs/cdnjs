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
_yuitest_coverage["build/scrollview-scrollbars/scrollview-scrollbars.js"].code=["YUI.add('scrollview-scrollbars', function (Y, NAME) {","","/**"," * Provides a plugin, which adds support for a scroll indicator to ScrollView instances"," *"," * @module scrollview"," * @submodule scrollview-scrollbars"," */","","var getClassName = Y.ClassNameManager.getClassName,","    _classNames,","","    Transition = Y.Transition,","    NATIVE_TRANSITIONS = Transition.useNative,    ","    SCROLLBAR = 'scrollbar',","    SCROLLVIEW = 'scrollview',","","    VERTICAL_NODE = \"verticalNode\",","    HORIZONTAL_NODE = \"horizontalNode\",","","    CHILD_CACHE = \"childCache\",","","    TOP = \"top\",","    LEFT = \"left\",","    WIDTH = \"width\",","    HEIGHT = \"height\",","    SCROLL_WIDTH = \"scrollWidth\",","    SCROLL_HEIGHT = \"scrollHeight\",","","    HORIZ_CACHE = \"_sbh\",","    VERT_CACHE = \"_sbv\",","","    TRANSITION_PROPERTY = Transition._VENDOR_PREFIX + \"TransitionProperty\",","    TRANSFORM = \"transform\",","","    TRANSLATE_X = \"translateX(\",","    TRANSLATE_Y = \"translateY(\",","","    SCALE_X = \"scaleX(\",","    SCALE_Y = \"scaleY(\",","    ","    SCROLL_X = \"scrollX\",","    SCROLL_Y = \"scrollY\",","","    PX = \"px\",","    CLOSE = \")\",","    PX_CLOSE = PX + CLOSE;","","/**"," * ScrollView plugin that adds scroll indicators to ScrollView instances"," *"," * @class ScrollViewScrollbars"," * @namespace Plugin"," * @extends Plugin.Base"," * @constructor"," */","function ScrollbarsPlugin() {","    ScrollbarsPlugin.superclass.constructor.apply(this, arguments);","}","","ScrollbarsPlugin.CLASS_NAMES = {","    showing: getClassName(SCROLLVIEW, SCROLLBAR, 'showing'),","    scrollbar: getClassName(SCROLLVIEW, SCROLLBAR),","    scrollbarV: getClassName(SCROLLVIEW, SCROLLBAR, 'vert'),","    scrollbarH: getClassName(SCROLLVIEW, SCROLLBAR, 'horiz'),","    scrollbarVB: getClassName(SCROLLVIEW, SCROLLBAR, 'vert', 'basic'),","    scrollbarHB: getClassName(SCROLLVIEW, SCROLLBAR, 'horiz', 'basic'),","    child: getClassName(SCROLLVIEW, 'child'),","    first: getClassName(SCROLLVIEW, 'first'),","    middle: getClassName(SCROLLVIEW, 'middle'),","    last: getClassName(SCROLLVIEW, 'last')","};","","_classNames = ScrollbarsPlugin.CLASS_NAMES;","","/**"," * The identity of the plugin"," *"," * @property NAME"," * @type String"," * @default 'pluginScrollViewScrollbars'"," * @static"," */","ScrollbarsPlugin.NAME = 'pluginScrollViewScrollbars';","    ","/**"," * The namespace on which the plugin will reside."," *"," * @property NS"," * @type String"," * @default 'scrollbars'"," * @static"," */","ScrollbarsPlugin.NS = 'scrollbars';","","/**"," * HTML template for the scrollbar"," *"," * @property SCROLLBAR_TEMPLATE"," * @type Object"," * @static"," */","ScrollbarsPlugin.SCROLLBAR_TEMPLATE = [","    '<div>',","    '<span class=\"' + _classNames.child + ' ' + _classNames.first + '\"></span>',","    '<span class=\"' + _classNames.child + ' ' + _classNames.middle + '\"></span>',","    '<span class=\"' + _classNames.child + ' ' + _classNames.last + '\"></span>',","    '</div>'","].join('');","","/**"," * The default attribute configuration for the plugin"," *"," * @property ATTRS"," * @type Object"," * @static"," */","ScrollbarsPlugin.ATTRS = {","    ","    /**","     * Vertical scrollbar node","     *","     * @attribute verticalNode","     * @type Y.Node","     */","    verticalNode: {","        setter: '_setNode',","        valueFn: '_defaultNode'","    },","","    /**","     * Horizontal scrollbar node","     *","     * @attribute horizontalNode","     * @type Y.Node","     */","    horizontalNode: {","        setter: '_setNode',","        valueFn: '_defaultNode'","    }","};","","Y.namespace(\"Plugin\").ScrollViewScrollbars = Y.extend(ScrollbarsPlugin, Y.Plugin.Base, {","","    /**","     * Designated initializer","     *","     * @method initializer","     */    ","    initializer: function() {","        this._host = this.get(\"host\");","","        this.afterHostEvent('scrollEnd', this._hostScrollEnd);","        this.afterHostMethod('scrollTo', this._update);","        this.afterHostMethod('_uiDimensionsChange', this._hostDimensionsChange);","    },","","    /**","     * Set up the DOM nodes for the scrollbars. This method is invoked whenever the","     * host's _uiDimensionsChange fires, giving us the opportunity to remove un-needed","     * scrollbars, as well as add one if necessary.","     *","     * @method _hostDimensionsChange","     * @protected","     */    ","    _hostDimensionsChange: function() {","        var host = this._host,","            axis = host._cAxis;","","        this._scrollHeight = host._bb.get('scrollHeight');","        this._scrollWidth = host._bb.get('scrollWidth');","","        if (axis && axis.y) {","            this._renderBar(this.get(VERTICAL_NODE), true, 'vert');","        }","","        if (axis && axis.x) {","            this._renderBar(this.get(HORIZONTAL_NODE), true, 'horiz');","        }","","        this._update();","","        Y.later(500, this, 'flash', true);","    },","","    /**","     * Handler for the scrollEnd event fired by the host. Default implementation flashes the scrollbar","     *","     * @method _hostScrollEnd","     * @param {Event.Facade} e The event facade.","     * @protected","     */","    _hostScrollEnd : function(e) {","        if (!this._host._flicking) {","            this.flash();","        }","    },","","    /**","     * Adds or removes a scrollbar node from the document.","     * ","     * @method _renderBar","     * @private","     * @param {Node} bar The scrollbar node","     * @param {boolean} add true, to add the node, false to remove it","     */","    _renderBar: function(bar, add) {","        var inDoc = bar.inDoc(),","            bb = this._host._bb,","            className = bar.getData(\"isHoriz\") ? _classNames.scrollbarHB : _classNames.scrollbarVB;","","        if (add && !inDoc) {","            bb.append(bar);","            bar.toggleClass(className, this._basic);","            this._setChildCache(bar);","        } else if(!add && inDoc) {","            bar.remove();","            this._clearChildCache(bar);","        }","    },","","    /**","     * Caches scrollbar child element information,","     * to optimize _update implementation ","     * ","     * @method _setChildCache","     * @private","     * @param {Node} node","     */","    _setChildCache : function(node) {","        var c = node.get(\"children\"),","            fc = c.item(0),","            mc = c.item(1),","            lc = c.item(2),","            size = node.getData(\"isHoriz\") ? \"offsetWidth\" : \"offsetHeight\";","","        node.setStyle(TRANSITION_PROPERTY, TRANSFORM);","        mc.setStyle(TRANSITION_PROPERTY, TRANSFORM);","        lc.setStyle(TRANSITION_PROPERTY, TRANSFORM);","","        node.setData(CHILD_CACHE, {","            fc : fc,","            lc : lc,","            mc : mc,","            fcSize : fc && fc.get(size),","            lcSize : lc && lc.get(size)","        });","    },","","    /**","     * Clears child cache","     * ","     * @method _clearChildCache","     * @private","     * @param {Node} node","     */","    _clearChildCache : function(node) {","        node.clearData(CHILD_CACHE);","    },","","    /**","     * Utility method, to move/resize either vertical or horizontal scrollbars","     *","     * @method _updateBar","     * @private","     *","     * @param {Node} scrollbar The scrollbar node.","     * @param {Number} current The current scroll position.","     * @param {Number} duration The transition duration.","     * @param {boolean} horiz true if horizontal, false if vertical.","     */","    _updateBar : function(scrollbar, current, duration, horiz) {","","        var host = this._host,","            basic = this._basic,","            cb = host._cb,","","            scrollbarSize = 0,","            scrollbarPos = 1,","","            childCache = scrollbar.getData(CHILD_CACHE),","            lastChild = childCache.lc,","            middleChild = childCache.mc,","            firstChildSize = childCache.fcSize,","            lastChildSize = childCache.lcSize,","            middleChildSize,","            lastChildPosition,","","            transition,","            translate,","            scale,","","            dim,","            dimOffset,","            dimCache,","            widgetSize,","            contentSize;","","        if (horiz) {","            dim = WIDTH;","            dimOffset = LEFT;","            dimCache = HORIZ_CACHE;","            widgetSize = host.get('width');","            contentSize = this._scrollWidth;","            translate = TRANSLATE_X;","            scale = SCALE_X;","            current = (current !== undefined) ? current : host.get(SCROLL_X);","        } else {","            dim = HEIGHT;","            dimOffset = TOP;","            dimCache = VERT_CACHE;","            widgetSize = host.get('height');","            contentSize = this._scrollHeight;","            translate = TRANSLATE_Y;","            scale = SCALE_Y;","            current = (current !== undefined) ? current : host.get(SCROLL_Y);","        }","","        scrollbarSize = Math.floor(widgetSize * (widgetSize/contentSize));","        scrollbarPos = Math.floor((current/(contentSize - widgetSize)) * (widgetSize - scrollbarSize));","        if (scrollbarSize > widgetSize) {","            scrollbarSize = 1;","        }","","        if (scrollbarPos > (widgetSize - scrollbarSize)) {","            scrollbarSize = scrollbarSize - (scrollbarPos - (widgetSize - scrollbarSize));","        } else if (scrollbarPos < 0) {","            scrollbarSize = scrollbarPos + scrollbarSize;","            scrollbarPos = 0;","        }","","        middleChildSize = (scrollbarSize - (firstChildSize + lastChildSize));","","        if (middleChildSize < 0) {","            middleChildSize = 0;","        }","","        if (middleChildSize === 0 && scrollbarPos !== 0) {","            scrollbarPos = widgetSize - (firstChildSize + lastChildSize) - 1;","        }","","        if (duration !== 0) {","            // Position Scrollbar","            transition = {","                duration : duration","            };","","            if (NATIVE_TRANSITIONS) {","                transition.transform = translate + scrollbarPos + PX_CLOSE;","            } else {","                transition[dimOffset] = scrollbarPos + PX;","            }","","            scrollbar.transition(transition);","","        } else {","            if (NATIVE_TRANSITIONS) {","                scrollbar.setStyle(TRANSFORM, translate + scrollbarPos + PX_CLOSE);","            } else {","                scrollbar.setStyle(dimOffset, scrollbarPos + PX);","            }","        }","","        // Resize Scrollbar Middle Child","        if (this[dimCache] !== middleChildSize) {","            this[dimCache] = middleChildSize;","","            if (middleChildSize > 0) {","","                if (duration !== 0) {","                    transition = {","                        duration : duration             ","                    };","","                    if(NATIVE_TRANSITIONS) {","                        transition.transform = scale + middleChildSize + CLOSE;","                    } else {","                        transition[dim] = middleChildSize + PX;","                    }","","                    middleChild.transition(transition);","                } else {","                    if (NATIVE_TRANSITIONS) {","                        middleChild.setStyle(TRANSFORM, scale + middleChildSize + CLOSE);","                    } else {","                        middleChild.setStyle(dim, middleChildSize + PX);","                    }","                }","    ","                // Position Last Child","                if (!horiz || !basic) {","","                    lastChildPosition = scrollbarSize - lastChildSize;","    ","                    if(duration !== 0) { ","                        transition = {","                            duration : duration","                        };","                ","                        if (NATIVE_TRANSITIONS) {","                            transition.transform = translate + lastChildPosition + PX_CLOSE; ","                        } else {","                            transition[dimOffset] = lastChildPosition; ","                        }","","                        lastChild.transition(transition);","                    } else {","                        if (NATIVE_TRANSITIONS) {","                            lastChild.setStyle(TRANSFORM, translate + lastChildPosition + PX_CLOSE); ","                        } else {","                            lastChild.setStyle(dimOffset, lastChildPosition + PX); ","                        }","                    }","                }","            }","        }","    },","","    /**","     * AOP method, invoked after the host's _uiScrollTo method, ","     * to position and resize the scroll bars","     *","     * @method _update","     * @param x {Number} The current scrollX value","     * @param y {Number} The current scrollY value","     * @param duration {Number} Number of ms of animation (optional) - used when snapping to bounds ","     * @param easing {String} Optional easing equation to use during the animation, if duration is set","     * @protected","     */","    _update: function(x, y, duration, easing) {","","        var vNode = this.get(VERTICAL_NODE),","            hNode = this.get(HORIZONTAL_NODE),","            host = this._host,","            axis = host._cAxis;","","        duration = (duration || 0)/1000;","","        if (!this._showing) {","            this.show();","        }","","        if (axis && axis.y && vNode) {","            this._updateBar(vNode, y, duration, false);","        }","","        if (axis && axis.x && hNode) {","            this._updateBar(hNode, x, duration, true);","        }","    },","","    /**","     * Show the scroll bar indicators","     *","     * @method show","     * @param animated {Boolean} Whether or not to animate the showing ","     */","    show: function(animated) {","        this._show(true, animated);","    },","","    /**","     * Hide the scroll bar indicators","     *","     * @method hide","     * @param animated {Boolean} Whether or not to animate the hiding","     */","    hide: function(animated) {","        this._show(false, animated);","    },","","    /**","     * Internal hide/show implementation utility method","     *","     * @method _show","     * @param {boolean} show Whether to show or hide the scrollbar ","     * @param {bolean} animated Whether or not to animate while showing/hide","     * @protected","     */","    _show : function(show, animated) {","","        var verticalNode = this.get(VERTICAL_NODE),","            horizontalNode = this.get(HORIZONTAL_NODE),","","            duration = (animated) ? 0.6 : 0,","            opacity = (show) ? 1 : 0,","","            transition;","","        this._showing = show;","","        if (this._flashTimer) {","            this._flashTimer.cancel();","        }","","        transition = {","            duration : duration,","            opacity : opacity","        };","","        if (verticalNode) {","            verticalNode.transition(transition);","        }","","        if (horizontalNode) {","            horizontalNode.transition(transition);","        }","    },","","    /**","     * Momentarily flash the scroll bars to indicate current scroll position","     *","     * @method flash","     */","    flash: function() {","        var host = this._host;","","        this.show(true);","        this._flashTimer = Y.later(800, this, 'hide', true);","    },","","    /**","     * Setter for the verticalNode and horizontalNode attributes","     *","     * @method _setNode","     * @param node {Node} The Y.Node instance for the scrollbar","     * @param name {String} The attribute name","     * @return {Node} The Y.Node instance for the scrollbar","     * ","     * @protected","     */","    _setNode: function(node, name) {","        var horiz = (name === HORIZONTAL_NODE);","            node = Y.one(node);","","        if (node) {","            node.addClass(_classNames.scrollbar);","            node.addClass( (horiz) ? _classNames.scrollbarH : _classNames.scrollbarV );","            node.setData(\"isHoriz\", horiz);","        }","","        return node;","    },","","    /**","     * Creates default node instances for scrollbars","     *","     * @method _defaultNode","     * @return {Node} The Y.Node instance for the scrollbar","     * ","     * @protected","     */","    _defaultNode: function() {","        return Y.Node.create(ScrollbarsPlugin.SCROLLBAR_TEMPLATE);","    },    ","","    _basic: Y.UA.ie && Y.UA.ie <= 8","","});","","","}, '@VERSION@', {\"requires\": [\"classnamemanager\", \"transition\", \"plugin\"], \"skinnable\": true});"];
_yuitest_coverage["build/scrollview-scrollbars/scrollview-scrollbars.js"].lines = {"1":0,"10":0,"57":0,"58":0,"61":0,"74":0,"84":0,"94":0,"103":0,"118":0,"143":0,"151":0,"153":0,"154":0,"155":0,"167":0,"170":0,"171":0,"173":0,"174":0,"177":0,"178":0,"181":0,"183":0,"194":0,"195":0,"208":0,"212":0,"213":0,"214":0,"215":0,"216":0,"217":0,"218":0,"231":0,"237":0,"238":0,"239":0,"241":0,"258":0,"274":0,"299":0,"300":0,"301":0,"302":0,"303":0,"304":0,"305":0,"306":0,"307":0,"309":0,"310":0,"311":0,"312":0,"313":0,"314":0,"315":0,"316":0,"319":0,"320":0,"321":0,"322":0,"325":0,"326":0,"327":0,"328":0,"329":0,"332":0,"334":0,"335":0,"338":0,"339":0,"342":0,"344":0,"348":0,"349":0,"351":0,"354":0,"357":0,"358":0,"360":0,"365":0,"366":0,"368":0,"370":0,"371":0,"375":0,"376":0,"378":0,"381":0,"383":0,"384":0,"386":0,"391":0,"393":0,"395":0,"396":0,"400":0,"401":0,"403":0,"406":0,"408":0,"409":0,"411":0,"432":0,"437":0,"439":0,"440":0,"443":0,"444":0,"447":0,"448":0,"459":0,"469":0,"482":0,"490":0,"492":0,"493":0,"496":0,"501":0,"502":0,"505":0,"506":0,"516":0,"518":0,"519":0,"533":0,"534":0,"536":0,"537":0,"538":0,"539":0,"542":0,"554":0};
_yuitest_coverage["build/scrollview-scrollbars/scrollview-scrollbars.js"].functions = {"ScrollbarsPlugin:57":0,"initializer:150":0,"_hostDimensionsChange:166":0,"_hostScrollEnd:193":0,"_renderBar:207":0,"_setChildCache:230":0,"_clearChildCache:257":0,"_updateBar:272":0,"_update:430":0,"show:458":0,"hide:468":0,"_show:480":0,"flash:515":0,"_setNode:532":0,"_defaultNode:553":0,"(anonymous 1):1":0};
_yuitest_coverage["build/scrollview-scrollbars/scrollview-scrollbars.js"].coveredLines = 134;
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
    SCROLL_WIDTH = "scrollWidth",
    SCROLL_HEIGHT = "scrollHeight",

    HORIZ_CACHE = "_sbh",
    VERT_CACHE = "_sbv",

    TRANSITION_PROPERTY = Transition._VENDOR_PREFIX + "TransitionProperty",
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
_yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 57);
function ScrollbarsPlugin() {
    _yuitest_coverfunc("build/scrollview-scrollbars/scrollview-scrollbars.js", "ScrollbarsPlugin", 57);
_yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 58);
ScrollbarsPlugin.superclass.constructor.apply(this, arguments);
}

_yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 61);
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

_yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 74);
_classNames = ScrollbarsPlugin.CLASS_NAMES;

/**
 * The identity of the plugin
 *
 * @property NAME
 * @type String
 * @default 'pluginScrollViewScrollbars'
 * @static
 */
_yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 84);
ScrollbarsPlugin.NAME = 'pluginScrollViewScrollbars';
    
/**
 * The namespace on which the plugin will reside.
 *
 * @property NS
 * @type String
 * @default 'scrollbars'
 * @static
 */
_yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 94);
ScrollbarsPlugin.NS = 'scrollbars';

/**
 * HTML template for the scrollbar
 *
 * @property SCROLLBAR_TEMPLATE
 * @type Object
 * @static
 */
_yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 103);
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
_yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 118);
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

_yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 143);
Y.namespace("Plugin").ScrollViewScrollbars = Y.extend(ScrollbarsPlugin, Y.Plugin.Base, {

    /**
     * Designated initializer
     *
     * @method initializer
     */    
    initializer: function() {
        _yuitest_coverfunc("build/scrollview-scrollbars/scrollview-scrollbars.js", "initializer", 150);
_yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 151);
this._host = this.get("host");

        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 153);
this.afterHostEvent('scrollEnd', this._hostScrollEnd);
        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 154);
this.afterHostMethod('scrollTo', this._update);
        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 155);
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
        _yuitest_coverfunc("build/scrollview-scrollbars/scrollview-scrollbars.js", "_hostDimensionsChange", 166);
_yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 167);
var host = this._host,
            axis = host._cAxis;

        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 170);
this._scrollHeight = host._bb.get('scrollHeight');
        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 171);
this._scrollWidth = host._bb.get('scrollWidth');

        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 173);
if (axis && axis.y) {
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 174);
this._renderBar(this.get(VERTICAL_NODE), true, 'vert');
        }

        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 177);
if (axis && axis.x) {
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 178);
this._renderBar(this.get(HORIZONTAL_NODE), true, 'horiz');
        }

        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 181);
this._update();

        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 183);
Y.later(500, this, 'flash', true);
    },

    /**
     * Handler for the scrollEnd event fired by the host. Default implementation flashes the scrollbar
     *
     * @method _hostScrollEnd
     * @param {Event.Facade} e The event facade.
     * @protected
     */
    _hostScrollEnd : function(e) {
        _yuitest_coverfunc("build/scrollview-scrollbars/scrollview-scrollbars.js", "_hostScrollEnd", 193);
_yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 194);
if (!this._host._flicking) {
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 195);
this.flash();
        }
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
        _yuitest_coverfunc("build/scrollview-scrollbars/scrollview-scrollbars.js", "_renderBar", 207);
_yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 208);
var inDoc = bar.inDoc(),
            bb = this._host._bb,
            className = bar.getData("isHoriz") ? _classNames.scrollbarHB : _classNames.scrollbarVB;

        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 212);
if (add && !inDoc) {
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 213);
bb.append(bar);
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 214);
bar.toggleClass(className, this._basic);
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 215);
this._setChildCache(bar);
        } else {_yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 216);
if(!add && inDoc) {
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 217);
bar.remove();
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 218);
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
        _yuitest_coverfunc("build/scrollview-scrollbars/scrollview-scrollbars.js", "_setChildCache", 230);
_yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 231);
var c = node.get("children"),
            fc = c.item(0),
            mc = c.item(1),
            lc = c.item(2),
            size = node.getData("isHoriz") ? "offsetWidth" : "offsetHeight";

        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 237);
node.setStyle(TRANSITION_PROPERTY, TRANSFORM);
        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 238);
mc.setStyle(TRANSITION_PROPERTY, TRANSFORM);
        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 239);
lc.setStyle(TRANSITION_PROPERTY, TRANSFORM);

        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 241);
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
        _yuitest_coverfunc("build/scrollview-scrollbars/scrollview-scrollbars.js", "_clearChildCache", 257);
_yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 258);
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

        _yuitest_coverfunc("build/scrollview-scrollbars/scrollview-scrollbars.js", "_updateBar", 272);
_yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 274);
var host = this._host,
            basic = this._basic,
            cb = host._cb,

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

        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 299);
if (horiz) {
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 300);
dim = WIDTH;
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 301);
dimOffset = LEFT;
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 302);
dimCache = HORIZ_CACHE;
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 303);
widgetSize = host.get('width');
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 304);
contentSize = this._scrollWidth;
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 305);
translate = TRANSLATE_X;
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 306);
scale = SCALE_X;
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 307);
current = (current !== undefined) ? current : host.get(SCROLL_X);
        } else {
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 309);
dim = HEIGHT;
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 310);
dimOffset = TOP;
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 311);
dimCache = VERT_CACHE;
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 312);
widgetSize = host.get('height');
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 313);
contentSize = this._scrollHeight;
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 314);
translate = TRANSLATE_Y;
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 315);
scale = SCALE_Y;
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 316);
current = (current !== undefined) ? current : host.get(SCROLL_Y);
        }

        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 319);
scrollbarSize = Math.floor(widgetSize * (widgetSize/contentSize));
        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 320);
scrollbarPos = Math.floor((current/(contentSize - widgetSize)) * (widgetSize - scrollbarSize));
        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 321);
if (scrollbarSize > widgetSize) {
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 322);
scrollbarSize = 1;
        }

        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 325);
if (scrollbarPos > (widgetSize - scrollbarSize)) {
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 326);
scrollbarSize = scrollbarSize - (scrollbarPos - (widgetSize - scrollbarSize));
        } else {_yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 327);
if (scrollbarPos < 0) {
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 328);
scrollbarSize = scrollbarPos + scrollbarSize;
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 329);
scrollbarPos = 0;
        }}

        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 332);
middleChildSize = (scrollbarSize - (firstChildSize + lastChildSize));

        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 334);
if (middleChildSize < 0) {
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 335);
middleChildSize = 0;
        }

        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 338);
if (middleChildSize === 0 && scrollbarPos !== 0) {
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 339);
scrollbarPos = widgetSize - (firstChildSize + lastChildSize) - 1;
        }

        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 342);
if (duration !== 0) {
            // Position Scrollbar
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 344);
transition = {
                duration : duration
            };

            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 348);
if (NATIVE_TRANSITIONS) {
                _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 349);
transition.transform = translate + scrollbarPos + PX_CLOSE;
            } else {
                _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 351);
transition[dimOffset] = scrollbarPos + PX;
            }

            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 354);
scrollbar.transition(transition);

        } else {
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 357);
if (NATIVE_TRANSITIONS) {
                _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 358);
scrollbar.setStyle(TRANSFORM, translate + scrollbarPos + PX_CLOSE);
            } else {
                _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 360);
scrollbar.setStyle(dimOffset, scrollbarPos + PX);
            }
        }

        // Resize Scrollbar Middle Child
        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 365);
if (this[dimCache] !== middleChildSize) {
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 366);
this[dimCache] = middleChildSize;

            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 368);
if (middleChildSize > 0) {

                _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 370);
if (duration !== 0) {
                    _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 371);
transition = {
                        duration : duration             
                    };

                    _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 375);
if(NATIVE_TRANSITIONS) {
                        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 376);
transition.transform = scale + middleChildSize + CLOSE;
                    } else {
                        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 378);
transition[dim] = middleChildSize + PX;
                    }

                    _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 381);
middleChild.transition(transition);
                } else {
                    _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 383);
if (NATIVE_TRANSITIONS) {
                        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 384);
middleChild.setStyle(TRANSFORM, scale + middleChildSize + CLOSE);
                    } else {
                        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 386);
middleChild.setStyle(dim, middleChildSize + PX);
                    }
                }
    
                // Position Last Child
                _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 391);
if (!horiz || !basic) {

                    _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 393);
lastChildPosition = scrollbarSize - lastChildSize;
    
                    _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 395);
if(duration !== 0) { 
                        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 396);
transition = {
                            duration : duration
                        };
                
                        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 400);
if (NATIVE_TRANSITIONS) {
                            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 401);
transition.transform = translate + lastChildPosition + PX_CLOSE; 
                        } else {
                            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 403);
transition[dimOffset] = lastChildPosition; 
                        }

                        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 406);
lastChild.transition(transition);
                    } else {
                        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 408);
if (NATIVE_TRANSITIONS) {
                            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 409);
lastChild.setStyle(TRANSFORM, translate + lastChildPosition + PX_CLOSE); 
                        } else {
                            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 411);
lastChild.setStyle(dimOffset, lastChildPosition + PX); 
                        }
                    }
                }
            }
        }
    },

    /**
     * AOP method, invoked after the host's _uiScrollTo method, 
     * to position and resize the scroll bars
     *
     * @method _update
     * @param x {Number} The current scrollX value
     * @param y {Number} The current scrollY value
     * @param duration {Number} Number of ms of animation (optional) - used when snapping to bounds 
     * @param easing {String} Optional easing equation to use during the animation, if duration is set
     * @protected
     */
    _update: function(x, y, duration, easing) {

        _yuitest_coverfunc("build/scrollview-scrollbars/scrollview-scrollbars.js", "_update", 430);
_yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 432);
var vNode = this.get(VERTICAL_NODE),
            hNode = this.get(HORIZONTAL_NODE),
            host = this._host,
            axis = host._cAxis;

        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 437);
duration = (duration || 0)/1000;

        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 439);
if (!this._showing) {
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 440);
this.show();
        }

        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 443);
if (axis && axis.y && vNode) {
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 444);
this._updateBar(vNode, y, duration, false);
        }

        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 447);
if (axis && axis.x && hNode) {
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 448);
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
        _yuitest_coverfunc("build/scrollview-scrollbars/scrollview-scrollbars.js", "show", 458);
_yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 459);
this._show(true, animated);
    },

    /**
     * Hide the scroll bar indicators
     *
     * @method hide
     * @param animated {Boolean} Whether or not to animate the hiding
     */
    hide: function(animated) {
        _yuitest_coverfunc("build/scrollview-scrollbars/scrollview-scrollbars.js", "hide", 468);
_yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 469);
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

        _yuitest_coverfunc("build/scrollview-scrollbars/scrollview-scrollbars.js", "_show", 480);
_yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 482);
var verticalNode = this.get(VERTICAL_NODE),
            horizontalNode = this.get(HORIZONTAL_NODE),

            duration = (animated) ? 0.6 : 0,
            opacity = (show) ? 1 : 0,

            transition;

        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 490);
this._showing = show;

        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 492);
if (this._flashTimer) {
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 493);
this._flashTimer.cancel();
        }

        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 496);
transition = {
            duration : duration,
            opacity : opacity
        };

        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 501);
if (verticalNode) {
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 502);
verticalNode.transition(transition);
        }

        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 505);
if (horizontalNode) {
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 506);
horizontalNode.transition(transition);
        }
    },

    /**
     * Momentarily flash the scroll bars to indicate current scroll position
     *
     * @method flash
     */
    flash: function() {
        _yuitest_coverfunc("build/scrollview-scrollbars/scrollview-scrollbars.js", "flash", 515);
_yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 516);
var host = this._host;

        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 518);
this.show(true);
        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 519);
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
        _yuitest_coverfunc("build/scrollview-scrollbars/scrollview-scrollbars.js", "_setNode", 532);
_yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 533);
var horiz = (name === HORIZONTAL_NODE);
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 534);
node = Y.one(node);

        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 536);
if (node) {
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 537);
node.addClass(_classNames.scrollbar);
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 538);
node.addClass( (horiz) ? _classNames.scrollbarH : _classNames.scrollbarV );
            _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 539);
node.setData("isHoriz", horiz);
        }

        _yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 542);
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
        _yuitest_coverfunc("build/scrollview-scrollbars/scrollview-scrollbars.js", "_defaultNode", 553);
_yuitest_coverline("build/scrollview-scrollbars/scrollview-scrollbars.js", 554);
return Y.Node.create(ScrollbarsPlugin.SCROLLBAR_TEMPLATE);
    },    

    _basic: Y.UA.ie && Y.UA.ie <= 8

});


}, '@VERSION@', {"requires": ["classnamemanager", "transition", "plugin"], "skinnable": true});
