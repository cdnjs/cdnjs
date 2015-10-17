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
_yuitest_coverage["build/scrollview-paginator/scrollview-paginator.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/scrollview-paginator/scrollview-paginator.js",
    code: []
};
_yuitest_coverage["build/scrollview-paginator/scrollview-paginator.js"].code=["YUI.add('scrollview-paginator', function (Y, NAME) {","","/**"," * Provides a plugin that adds pagination support to ScrollView instances"," *"," * @module scrollview-paginator"," */","var getClassName = Y.ClassNameManager.getClassName,","    SCROLLVIEW = 'scrollview',","    CLASS_HIDDEN = getClassName(SCROLLVIEW, 'hidden'),","    CLASS_PAGED = getClassName(SCROLLVIEW, 'paged'),","    UI = (Y.ScrollView) ? Y.ScrollView.UI_SRC : 'ui',","    INDEX = 'index',","    SCROLL_X = 'scrollX',","    SCROLL_Y = 'scrollY',","    TOTAL = 'total',","    HOST = 'host',","    BOUNDING_BOX = 'boundingBox',","    CONTENT_BOX = 'contentBox',","    SELECTOR = 'selector',","    FLICK = 'flick',","    DRAG = 'drag',","    DIM_X = 'x',","    DIM_Y = 'y';","","/**"," * Scrollview plugin that adds support for paging"," *"," * @class ScrollViewPaginator"," * @namespace Plugin"," * @extends Plugin.Base"," * @constructor"," */","function PaginatorPlugin() {","    PaginatorPlugin.superclass.constructor.apply(this, arguments);","}","","Y.extend(PaginatorPlugin, Y.Plugin.Base, {","","    /**","     * Designated initializer","     *","     * @method initializer","     * @param {config} Configuration object for the plugin","     */","    initializer: function (config) {","        var paginator = this,","            host = paginator.get(HOST),","            bb = host._bb,","            cb = host._cb,","            axis = 'auto';","","        // Default it to an empty object","        config = config || {};","","        if (config.axis) {","            switch (config.axis.toLowerCase()) {","                case \"x\":","                    axis = {","                        x: true,","                        y: false","                    };","                    break;","                case \"y\":","                    axis = {","                        x: false,","                        y: true","                    };","                    break;","            }","        }","","        /**","         * Contains an object that specifies if the widget will on a X or Y axis","         *","         * @property axis","         * @type Object","         * @public","         * @default auto","         */","        paginator.axis = axis;","","        // Initialize & default","        paginator.optimizeMemory = config.optimizeMemory || false;","        paginator.padding = config.padding || 1;","        paginator.cards = [];","","        // Cache some values","        paginator._bb = bb;","        paginator._cb = cb;","        paginator._host = host;","        paginator._cIndex = config.index || 0;","        paginator._prevent = new Y.Do.Prevent();","","        // Event listeners","        paginator.after('indexChange', paginator._afterIndexChange);","","        // Method listeners","        paginator.beforeHostMethod('scrollTo', paginator._beforeHostScrollTo);","        paginator.beforeHostMethod('_mousewheel', paginator._beforeHostMousewheel);","        paginator.afterHostMethod('_onGestureMoveEnd', paginator._afterHostGestureMoveEnd);","        paginator.afterHostMethod('_uiDimensionsChange', paginator._afterHostUIDimensionsChange);","        paginator.afterHostEvent('render', paginator._afterHostRender);","        paginator.afterHostEvent('scrollEnd', paginator._afterHostScrollEnded);","        paginator.afterHostMethod('syncUI', paginator._afterHostSyncUI);","    },","","    /**","     * After host render","     *","     * @method _afterHostRender","     * @param {Event.Facade}","     * @protected","     */","    _afterHostRender: function (e) {","        var paginator = this,","            bb = paginator._bb,","            host = paginator._host,","            index = paginator._cIndex,","            paginatorAxis = paginator.axis,","            pageNodes = paginator._getPageNodes(),","            size = pageNodes.size(),","            maxScrollX = paginator.cards[index].maxScrollX,","            maxScrollY = paginator.cards[index].maxScrollY;","","        if (paginatorAxis[DIM_Y]) {","            host._maxScrollX = maxScrollX;","        }","        else if (paginatorAxis[DIM_X]) {","            host._maxScrollY = maxScrollY;","        }","","        // Set the page count","        paginator.set(TOTAL, size);","","        // Jump to the index","        if (index !== 0) {","            paginator.scrollToIndex(index, 0);","        }","","        // Add the paginator class","        bb.addClass(CLASS_PAGED);","","        // paginator._optimize();","    },","","    /**","     * After host syncUI","     *","     * @method _afterHostSyncUI","     * @param {Event.Facade}","     * @protected","     */","    _afterHostSyncUI: function (e) {","        var paginator = this,","            host = paginator._host,","            hostFlick = host.get(FLICK);","","        // If paginator's 'axis' property is to be automatically determined, inherit host's property","        if (paginator.axis === 'auto') {","            paginator.axis = host.axis;","        }","","        // Don't allow flicks on the paginated axis","        if (paginator.axis[DIM_X]) {","            hostFlick.axis = DIM_Y;","            host.set(FLICK, hostFlick);","        }","        else if (paginator.axis[DIM_Y]) {","            hostFlick.axis = DIM_X;","            host.set(FLICK, hostFlick);","        }","    },","","    /**","     * After host _uiDimensionsChange","     *","     * @method _afterHostUIDimensionsChange","     * @param {Event.Facade}","     * @protected","     */","    _afterHostUIDimensionsChange: function (e) {","","        var paginator = this,","            host = paginator._host,","            bb = paginator._bb,","            widgetWidth = bb.get('offsetWidth'),","            widgetHeight = bb.get('offsetHeight'),","            pageNodes = paginator._getPageNodes(),","            size = pageNodes.size();","","        // Inefficient. Should not reinitialize every card every syncUI","        pageNodes.each(function (node, i) {","            var scrollWidth = node.get('scrollWidth'),","                scrollHeight = node.get('scrollHeight'),","                maxScrollX = Math.max(0, scrollWidth - widgetWidth),","                maxScrollY = Math.max(0, scrollHeight - widgetHeight);","","            // Don't initialize any cards that already have been.","            if (!paginator.cards[i]) {","                paginator.cards[i] = {","                    maxScrollX: maxScrollX,","                    maxScrollY: maxScrollY,","                    node: node,","                    scrollX: 0,","                    scrollY: 0","                };","            } else {","                paginator.cards[i].maxScrollX = maxScrollX;","                paginator.cards[i].maxScrollY = maxScrollY;","            }","","        });","    },","","    /**","     * Executed before host.scrollTo","     *","     * @method _beforeHostScrollTo","     * @param x {Number} The x-position to scroll to. (null for no movement)","     * @param y {Number} The y-position to scroll to. (null for no movement)","     * @param {Number} [duration] Duration, in ms, of the scroll animation (default is 0)","     * @param {String} [easing] An easing equation if duration is set","     * @param {String} [node] The node to move","     * @protected","     */","    _beforeHostScrollTo: function (x, y, duration, easing, node) {","        var paginator = this,","            host = paginator._host,","            gesture = host._gesture,","            index = paginator._cIndex,","            paginatorAxis = paginator.axis,","            gestureAxis;","","        if (gesture) {","            gestureAxis = gesture.axis;","","            // Null the opposite axis so it won't be modified by host.scrollTo","            if (gestureAxis === DIM_Y) {","                x = null;","            } else {","                y = null;","            }","","            // If they are scrolling against the specified axis, pull out the card as the node to have its own offset","            if (paginatorAxis[gestureAxis] === false) {","                node = paginator.cards[index].node;","            }","        }","","        // Return the modified argument list","        return new Y.Do.AlterArgs(\"new args\", [x, y, duration, easing, node]);","    },","","    /**","     * Executed after host._gestureMoveEnd","     * Determines if the gesture should page prev or next (if at all)","     *","     * @method _afterHostGestureMoveEnd","     * @param {Event.Facade}","     * @protected","     */","    _afterHostGestureMoveEnd: function (e) {","        var paginator = this,","            host = paginator._host,","            gesture = host._gesture,","            paginatorAxis = paginator.axis,","            gestureAxis = gesture && gesture.axis;","","        if (paginatorAxis[gestureAxis]) {","            if (gesture[(gestureAxis === DIM_X ? 'deltaX' : 'deltaY')] > 0) {","                paginator[host.rtl ? 'prev' : 'next']();","            } else {","                paginator[host.rtl ? 'next' : 'prev']();","            }","        }","    },","","    /**","     * Executed before host._mousewheel","     * Prevents mousewheel events in some conditions","     *","     * @method _beforeHostMousewheel","     * @param {Event.Facade}","     * @protected","     */","    _beforeHostMousewheel: function (e) {","        var paginator = this,","            host = paginator._host,","            bb = host._bb,","            isForward = e.wheelDelta < 0, // down (negative) is forward. @TODO Should revisit.","            paginatorAxis = paginator.axis;","","        // Set the axis for this event.","        // @TODO: This is hacky, it's not a gesture. Find a better way","        host._gesture = {","            axis: DIM_Y","        };","","        // Only if the mousewheel event occurred on a DOM node inside the BB","        if (bb.contains(e.target) && paginatorAxis[DIM_Y]) {","","            if (isForward) {","                paginator.next();","            } else {","                paginator.prev();","            }","","            // prevent browser default behavior on mousewheel","            e.preventDefault();","","            // Block host._mousewheel from running","            return paginator._prevent;","        }","    },","","    /**","     * Executes after host's 'scrollEnd' event","     * Runs cleanup operations","     *","     * @method _afterHostScrollEnded","     * @param {Event.Facade}","     * @protected","     */","    _afterHostScrollEnded: function (e) {","        var paginator = this,","            host = this._host,","            index = paginator._cIndex,","            scrollX = host.get(SCROLL_X),","            scrollY = host.get(SCROLL_Y),","            paginatorAxis = paginator.axis;","","        if (paginatorAxis[DIM_Y]) {","            paginator.cards[index].scrollX = scrollX;","        } else {","            paginator.cards[index].scrollY = scrollY;","        }","","        paginator._optimize();","    },","","    /**","     * index attr change handler","     *","     * @method _afterIndexChange","     * @param {Event.Facade}","     * @protected","     */","    _afterIndexChange: function (e) {","        var paginator = this,","            host = this._host,","            index = e.newVal,","            maxScrollX = paginator.cards[index].maxScrollX,","            maxScrollY = paginator.cards[index].maxScrollY,","            gesture = host._gesture,","            gestureAxis = gesture && gesture.axis;","","        if (gestureAxis === DIM_Y) {","            host._maxScrollX = maxScrollX;","            host.set(SCROLL_X, paginator.cards[index].scrollX, { src: UI });","        } else if (gestureAxis === DIM_X) {","            host._maxScrollY = maxScrollY;","            host.set(SCROLL_Y, paginator.cards[index].scrollY, { src: UI });","        }","","        // Cache the new index value","        paginator._cIndex = index;","","        if (e.src !== UI) {","            paginator.scrollToIndex(index);","        }","    },","","    /**","     * Hides page nodes not near the viewport","     *","     * @method _optimize","     * @protected","     */","    _optimize: function () {","","        if (!this.optimizeMemory) {","            return false;","        }","","        var paginator = this,","            host = paginator._host,","            optimizeMemory = paginator.optimizeMemory,","            currentIndex = paginator._cIndex,","            pageNodes;","","        // Show the pages in/near the viewport & hide the rest","        pageNodes = paginator._getStage(currentIndex);","        paginator._showNodes(pageNodes.visible);","        paginator._hideNodes(pageNodes.hidden);","    },","","    /**","     * Determines which nodes should be visible, and which should be hidden.","     *","     * @method _getStage","     * @param index {Number} The page index # intended to be in focus.","     * @returns {object}","     * @protected","     */","    _getStage: function (index) {","        var padding = this.padding,","            pageNodes = this._getPageNodes(),","            pageCount = this.get(TOTAL),","            start = Math.max(0, index - padding),","            end = Math.min(pageCount, index + 1 + padding); // noninclusive","","        return {","            visible: pageNodes.splice(start, end - start),","            hidden: pageNodes","        };","    },","","    /**","     * A utility method to show node(s)","     *","     * @method _showNodes","     * @param nodeList {Object} The list of nodes to show","     * @protected","     */","    _showNodes: function (nodeList) {","        if (nodeList) {","            nodeList.removeClass(CLASS_HIDDEN).setStyle('visibility', '');","        }","    },","","    /**","     * A utility method to hide node(s)","     *","     * @method _hideNodes","     * @param nodeList {Object} The list of nodes to hide","     * @protected","     */","    _hideNodes: function (nodeList) {","        if (nodeList) {","            nodeList.addClass(CLASS_HIDDEN).setStyle('visibility', 'hidden');","        }","    },","","    /**","     * Gets a nodeList for the \"pages\"","     *","     * @method _getPageNodes","     * @protected","     * @returns {nodeList}","     */","    _getPageNodes: function () {","        var paginator = this,","            host = paginator._host,","            cb = host._cb,","            pageSelector = paginator.get(SELECTOR),","            pageNodes = pageSelector ? cb.all(pageSelector) : cb.get('children');","","        return pageNodes;","    },","","    /**","     * Scroll to the next page in the scrollview, with animation","     *","     * @method next","     */","    next: function () {","        var paginator = this,","            index = paginator._cIndex,","            target = index + 1,","            total = this.get(TOTAL);","","        if (target >= total) {","            return;","        }","","        // Update the index","        paginator.set(INDEX, target);","    },","","    /**","     * Scroll to the previous page in the scrollview, with animation","     *","     * @method prev","     */","    prev: function () {","        var paginator = this,","            index = paginator._cIndex,","            target = index - 1;","","        if (target < 0) {","            return;","        }","","        // Update the index","        paginator.set(INDEX, target);","    },","    ","    /** ","     * @deprecated","     */","    scrollTo: function () {","        return this.scrollToIndex.apply(this, arguments);","    },","","    /**","     * Scroll to a given page in the scrollview","     *","     * @method scrollToIndex","     * @param index {Number} The index of the page to scroll to","     * @param {Number} [duration] The number of ms the animation should last","     * @param {String} [easing] The timing function to use in the animation","     */","    scrollToIndex: function (index, duration, easing) {","","        var paginator = this,","            host = paginator._host,","            pageNode = paginator._getPageNodes().item(index),","            scrollAxis = (paginator.axis[DIM_X] ? SCROLL_X : SCROLL_Y),","            scrollOffset = pageNode.get(scrollAxis === SCROLL_X ? 'offsetLeft' : 'offsetTop');","","        duration = (duration !== undefined) ? duration : PaginatorPlugin.TRANSITION.duration;","        easing = (easing !== undefined) ? duration : PaginatorPlugin.TRANSITION.easing;","","        // Set the index ATTR to the specified index value","        paginator.set(INDEX, index);","","        // Makes sure the viewport nodes are visible","        paginator._showNodes(pageNode);","","        // Scroll to the offset","        host.set(scrollAxis, scrollOffset, {","            duration: duration,","            easing: easing","        });","    }","    ","    // End prototype properties","","}, {","    ","    // Static properties","","    /**","     * The identity of the plugin","     *","     * @property NAME","     * @type String","     * @default 'pluginScrollViewPaginator'","     * @readOnly","     * @protected","     * @static","     */","    NAME: 'pluginScrollViewPaginator',","","    /**","     * The namespace on which the plugin will reside","     *","     * @property NS","     * @type String","     * @default 'pages'","     * @static","     */","    NS: 'pages',","","    /**","     * The default attribute configuration for the plugin","     *","     * @property ATTRS","     * @type {Object}","     * @static","     */","    ATTRS: {","","        /**","         * CSS selector for a page inside the scrollview. The scrollview","         * will snap to the closest page.","         *","         * @attribute selector","         * @type {String}","         * @default null","         */","        selector: {","            value: null","        },","","        /**","         * The active page number for a paged scrollview","         *","         * @attribute index","         * @type {Number}","         * @default 0","         */","        index: {","            value: 0,","            validator: function (val) {","                // TODO: Remove this?","                // return val >= 0 && val < this.get(TOTAL);","                return true;","            }","        },","","        /**","         * The total number of pages","         *","         * @attribute total","         * @type {Number}","         * @default 0","         */","        total: {","            value: 0","        }","    },","        ","    /**","     * The default snap to current duration and easing values used on scroll end.","     *","     * @property SNAP_TO_CURRENT","     * @static","     */","    TRANSITION: {","        duration: 300,","        easing: 'ease-out'","    }","","    // End static properties","","});","","Y.namespace('Plugin').ScrollViewPaginator = PaginatorPlugin;","","}, '@VERSION@', {\"requires\": [\"plugin\", \"classnamemanager\"]});"];
_yuitest_coverage["build/scrollview-paginator/scrollview-paginator.js"].lines = {"1":0,"8":0,"34":0,"35":0,"38":0,"47":0,"54":0,"56":0,"57":0,"59":0,"63":0,"65":0,"69":0,"81":0,"84":0,"85":0,"86":0,"89":0,"90":0,"91":0,"92":0,"93":0,"96":0,"99":0,"100":0,"101":0,"102":0,"103":0,"104":0,"105":0,"116":0,"126":0,"127":0,"129":0,"130":0,"134":0,"137":0,"138":0,"142":0,"155":0,"160":0,"161":0,"165":0,"166":0,"167":0,"169":0,"170":0,"171":0,"184":0,"193":0,"194":0,"200":0,"201":0,"209":0,"210":0,"228":0,"235":0,"236":0,"239":0,"240":0,"242":0,"246":0,"247":0,"252":0,"264":0,"270":0,"271":0,"272":0,"274":0,"288":0,"296":0,"301":0,"303":0,"304":0,"306":0,"310":0,"313":0,"326":0,"333":0,"334":0,"336":0,"339":0,"350":0,"358":0,"359":0,"360":0,"361":0,"362":0,"363":0,"367":0,"369":0,"370":0,"382":0,"383":0,"386":0,"393":0,"394":0,"395":0,"407":0,"413":0,"427":0,"428":0,"440":0,"441":0,"453":0,"459":0,"468":0,"473":0,"474":0,"478":0,"487":0,"491":0,"492":0,"496":0,"503":0,"516":0,"522":0,"523":0,"526":0,"529":0,"532":0,"599":0,"630":0};
_yuitest_coverage["build/scrollview-paginator/scrollview-paginator.js"].functions = {"PaginatorPlugin:34":0,"initializer:46":0,"_afterHostRender:115":0,"_afterHostSyncUI:154":0,"(anonymous 2):193":0,"_afterHostUIDimensionsChange:182":0,"_beforeHostScrollTo:227":0,"_afterHostGestureMoveEnd:263":0,"_beforeHostMousewheel:287":0,"_afterHostScrollEnded:325":0,"_afterIndexChange:349":0,"_optimize:380":0,"_getStage:406":0,"_showNodes:426":0,"_hideNodes:439":0,"_getPageNodes:452":0,"next:467":0,"prev:486":0,"scrollTo:502":0,"scrollToIndex:514":0,"validator:596":0,"(anonymous 1):1":0};
_yuitest_coverage["build/scrollview-paginator/scrollview-paginator.js"].coveredLines = 123;
_yuitest_coverage["build/scrollview-paginator/scrollview-paginator.js"].coveredFunctions = 22;
_yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 1);
YUI.add('scrollview-paginator', function (Y, NAME) {

/**
 * Provides a plugin that adds pagination support to ScrollView instances
 *
 * @module scrollview-paginator
 */
_yuitest_coverfunc("build/scrollview-paginator/scrollview-paginator.js", "(anonymous 1)", 1);
_yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 8);
var getClassName = Y.ClassNameManager.getClassName,
    SCROLLVIEW = 'scrollview',
    CLASS_HIDDEN = getClassName(SCROLLVIEW, 'hidden'),
    CLASS_PAGED = getClassName(SCROLLVIEW, 'paged'),
    UI = (Y.ScrollView) ? Y.ScrollView.UI_SRC : 'ui',
    INDEX = 'index',
    SCROLL_X = 'scrollX',
    SCROLL_Y = 'scrollY',
    TOTAL = 'total',
    HOST = 'host',
    BOUNDING_BOX = 'boundingBox',
    CONTENT_BOX = 'contentBox',
    SELECTOR = 'selector',
    FLICK = 'flick',
    DRAG = 'drag',
    DIM_X = 'x',
    DIM_Y = 'y';

/**
 * Scrollview plugin that adds support for paging
 *
 * @class ScrollViewPaginator
 * @namespace Plugin
 * @extends Plugin.Base
 * @constructor
 */
_yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 34);
function PaginatorPlugin() {
    _yuitest_coverfunc("build/scrollview-paginator/scrollview-paginator.js", "PaginatorPlugin", 34);
_yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 35);
PaginatorPlugin.superclass.constructor.apply(this, arguments);
}

_yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 38);
Y.extend(PaginatorPlugin, Y.Plugin.Base, {

    /**
     * Designated initializer
     *
     * @method initializer
     * @param {config} Configuration object for the plugin
     */
    initializer: function (config) {
        _yuitest_coverfunc("build/scrollview-paginator/scrollview-paginator.js", "initializer", 46);
_yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 47);
var paginator = this,
            host = paginator.get(HOST),
            bb = host._bb,
            cb = host._cb,
            axis = 'auto';

        // Default it to an empty object
        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 54);
config = config || {};

        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 56);
if (config.axis) {
            _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 57);
switch (config.axis.toLowerCase()) {
                case "x":
                    _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 59);
axis = {
                        x: true,
                        y: false
                    };
                    _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 63);
break;
                case "y":
                    _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 65);
axis = {
                        x: false,
                        y: true
                    };
                    _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 69);
break;
            }
        }

        /**
         * Contains an object that specifies if the widget will on a X or Y axis
         *
         * @property axis
         * @type Object
         * @public
         * @default auto
         */
        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 81);
paginator.axis = axis;

        // Initialize & default
        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 84);
paginator.optimizeMemory = config.optimizeMemory || false;
        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 85);
paginator.padding = config.padding || 1;
        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 86);
paginator.cards = [];

        // Cache some values
        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 89);
paginator._bb = bb;
        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 90);
paginator._cb = cb;
        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 91);
paginator._host = host;
        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 92);
paginator._cIndex = config.index || 0;
        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 93);
paginator._prevent = new Y.Do.Prevent();

        // Event listeners
        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 96);
paginator.after('indexChange', paginator._afterIndexChange);

        // Method listeners
        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 99);
paginator.beforeHostMethod('scrollTo', paginator._beforeHostScrollTo);
        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 100);
paginator.beforeHostMethod('_mousewheel', paginator._beforeHostMousewheel);
        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 101);
paginator.afterHostMethod('_onGestureMoveEnd', paginator._afterHostGestureMoveEnd);
        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 102);
paginator.afterHostMethod('_uiDimensionsChange', paginator._afterHostUIDimensionsChange);
        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 103);
paginator.afterHostEvent('render', paginator._afterHostRender);
        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 104);
paginator.afterHostEvent('scrollEnd', paginator._afterHostScrollEnded);
        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 105);
paginator.afterHostMethod('syncUI', paginator._afterHostSyncUI);
    },

    /**
     * After host render
     *
     * @method _afterHostRender
     * @param {Event.Facade}
     * @protected
     */
    _afterHostRender: function (e) {
        _yuitest_coverfunc("build/scrollview-paginator/scrollview-paginator.js", "_afterHostRender", 115);
_yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 116);
var paginator = this,
            bb = paginator._bb,
            host = paginator._host,
            index = paginator._cIndex,
            paginatorAxis = paginator.axis,
            pageNodes = paginator._getPageNodes(),
            size = pageNodes.size(),
            maxScrollX = paginator.cards[index].maxScrollX,
            maxScrollY = paginator.cards[index].maxScrollY;

        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 126);
if (paginatorAxis[DIM_Y]) {
            _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 127);
host._maxScrollX = maxScrollX;
        }
        else {_yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 129);
if (paginatorAxis[DIM_X]) {
            _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 130);
host._maxScrollY = maxScrollY;
        }}

        // Set the page count
        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 134);
paginator.set(TOTAL, size);

        // Jump to the index
        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 137);
if (index !== 0) {
            _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 138);
paginator.scrollToIndex(index, 0);
        }

        // Add the paginator class
        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 142);
bb.addClass(CLASS_PAGED);

        // paginator._optimize();
    },

    /**
     * After host syncUI
     *
     * @method _afterHostSyncUI
     * @param {Event.Facade}
     * @protected
     */
    _afterHostSyncUI: function (e) {
        _yuitest_coverfunc("build/scrollview-paginator/scrollview-paginator.js", "_afterHostSyncUI", 154);
_yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 155);
var paginator = this,
            host = paginator._host,
            hostFlick = host.get(FLICK);

        // If paginator's 'axis' property is to be automatically determined, inherit host's property
        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 160);
if (paginator.axis === 'auto') {
            _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 161);
paginator.axis = host.axis;
        }

        // Don't allow flicks on the paginated axis
        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 165);
if (paginator.axis[DIM_X]) {
            _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 166);
hostFlick.axis = DIM_Y;
            _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 167);
host.set(FLICK, hostFlick);
        }
        else {_yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 169);
if (paginator.axis[DIM_Y]) {
            _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 170);
hostFlick.axis = DIM_X;
            _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 171);
host.set(FLICK, hostFlick);
        }}
    },

    /**
     * After host _uiDimensionsChange
     *
     * @method _afterHostUIDimensionsChange
     * @param {Event.Facade}
     * @protected
     */
    _afterHostUIDimensionsChange: function (e) {

        _yuitest_coverfunc("build/scrollview-paginator/scrollview-paginator.js", "_afterHostUIDimensionsChange", 182);
_yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 184);
var paginator = this,
            host = paginator._host,
            bb = paginator._bb,
            widgetWidth = bb.get('offsetWidth'),
            widgetHeight = bb.get('offsetHeight'),
            pageNodes = paginator._getPageNodes(),
            size = pageNodes.size();

        // Inefficient. Should not reinitialize every card every syncUI
        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 193);
pageNodes.each(function (node, i) {
            _yuitest_coverfunc("build/scrollview-paginator/scrollview-paginator.js", "(anonymous 2)", 193);
_yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 194);
var scrollWidth = node.get('scrollWidth'),
                scrollHeight = node.get('scrollHeight'),
                maxScrollX = Math.max(0, scrollWidth - widgetWidth),
                maxScrollY = Math.max(0, scrollHeight - widgetHeight);

            // Don't initialize any cards that already have been.
            _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 200);
if (!paginator.cards[i]) {
                _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 201);
paginator.cards[i] = {
                    maxScrollX: maxScrollX,
                    maxScrollY: maxScrollY,
                    node: node,
                    scrollX: 0,
                    scrollY: 0
                };
            } else {
                _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 209);
paginator.cards[i].maxScrollX = maxScrollX;
                _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 210);
paginator.cards[i].maxScrollY = maxScrollY;
            }

        });
    },

    /**
     * Executed before host.scrollTo
     *
     * @method _beforeHostScrollTo
     * @param x {Number} The x-position to scroll to. (null for no movement)
     * @param y {Number} The y-position to scroll to. (null for no movement)
     * @param {Number} [duration] Duration, in ms, of the scroll animation (default is 0)
     * @param {String} [easing] An easing equation if duration is set
     * @param {String} [node] The node to move
     * @protected
     */
    _beforeHostScrollTo: function (x, y, duration, easing, node) {
        _yuitest_coverfunc("build/scrollview-paginator/scrollview-paginator.js", "_beforeHostScrollTo", 227);
_yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 228);
var paginator = this,
            host = paginator._host,
            gesture = host._gesture,
            index = paginator._cIndex,
            paginatorAxis = paginator.axis,
            gestureAxis;

        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 235);
if (gesture) {
            _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 236);
gestureAxis = gesture.axis;

            // Null the opposite axis so it won't be modified by host.scrollTo
            _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 239);
if (gestureAxis === DIM_Y) {
                _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 240);
x = null;
            } else {
                _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 242);
y = null;
            }

            // If they are scrolling against the specified axis, pull out the card as the node to have its own offset
            _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 246);
if (paginatorAxis[gestureAxis] === false) {
                _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 247);
node = paginator.cards[index].node;
            }
        }

        // Return the modified argument list
        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 252);
return new Y.Do.AlterArgs("new args", [x, y, duration, easing, node]);
    },

    /**
     * Executed after host._gestureMoveEnd
     * Determines if the gesture should page prev or next (if at all)
     *
     * @method _afterHostGestureMoveEnd
     * @param {Event.Facade}
     * @protected
     */
    _afterHostGestureMoveEnd: function (e) {
        _yuitest_coverfunc("build/scrollview-paginator/scrollview-paginator.js", "_afterHostGestureMoveEnd", 263);
_yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 264);
var paginator = this,
            host = paginator._host,
            gesture = host._gesture,
            paginatorAxis = paginator.axis,
            gestureAxis = gesture && gesture.axis;

        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 270);
if (paginatorAxis[gestureAxis]) {
            _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 271);
if (gesture[(gestureAxis === DIM_X ? 'deltaX' : 'deltaY')] > 0) {
                _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 272);
paginator[host.rtl ? 'prev' : 'next']();
            } else {
                _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 274);
paginator[host.rtl ? 'next' : 'prev']();
            }
        }
    },

    /**
     * Executed before host._mousewheel
     * Prevents mousewheel events in some conditions
     *
     * @method _beforeHostMousewheel
     * @param {Event.Facade}
     * @protected
     */
    _beforeHostMousewheel: function (e) {
        _yuitest_coverfunc("build/scrollview-paginator/scrollview-paginator.js", "_beforeHostMousewheel", 287);
_yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 288);
var paginator = this,
            host = paginator._host,
            bb = host._bb,
            isForward = e.wheelDelta < 0, // down (negative) is forward. @TODO Should revisit.
            paginatorAxis = paginator.axis;

        // Set the axis for this event.
        // @TODO: This is hacky, it's not a gesture. Find a better way
        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 296);
host._gesture = {
            axis: DIM_Y
        };

        // Only if the mousewheel event occurred on a DOM node inside the BB
        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 301);
if (bb.contains(e.target) && paginatorAxis[DIM_Y]) {

            _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 303);
if (isForward) {
                _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 304);
paginator.next();
            } else {
                _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 306);
paginator.prev();
            }

            // prevent browser default behavior on mousewheel
            _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 310);
e.preventDefault();

            // Block host._mousewheel from running
            _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 313);
return paginator._prevent;
        }
    },

    /**
     * Executes after host's 'scrollEnd' event
     * Runs cleanup operations
     *
     * @method _afterHostScrollEnded
     * @param {Event.Facade}
     * @protected
     */
    _afterHostScrollEnded: function (e) {
        _yuitest_coverfunc("build/scrollview-paginator/scrollview-paginator.js", "_afterHostScrollEnded", 325);
_yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 326);
var paginator = this,
            host = this._host,
            index = paginator._cIndex,
            scrollX = host.get(SCROLL_X),
            scrollY = host.get(SCROLL_Y),
            paginatorAxis = paginator.axis;

        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 333);
if (paginatorAxis[DIM_Y]) {
            _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 334);
paginator.cards[index].scrollX = scrollX;
        } else {
            _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 336);
paginator.cards[index].scrollY = scrollY;
        }

        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 339);
paginator._optimize();
    },

    /**
     * index attr change handler
     *
     * @method _afterIndexChange
     * @param {Event.Facade}
     * @protected
     */
    _afterIndexChange: function (e) {
        _yuitest_coverfunc("build/scrollview-paginator/scrollview-paginator.js", "_afterIndexChange", 349);
_yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 350);
var paginator = this,
            host = this._host,
            index = e.newVal,
            maxScrollX = paginator.cards[index].maxScrollX,
            maxScrollY = paginator.cards[index].maxScrollY,
            gesture = host._gesture,
            gestureAxis = gesture && gesture.axis;

        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 358);
if (gestureAxis === DIM_Y) {
            _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 359);
host._maxScrollX = maxScrollX;
            _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 360);
host.set(SCROLL_X, paginator.cards[index].scrollX, { src: UI });
        } else {_yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 361);
if (gestureAxis === DIM_X) {
            _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 362);
host._maxScrollY = maxScrollY;
            _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 363);
host.set(SCROLL_Y, paginator.cards[index].scrollY, { src: UI });
        }}

        // Cache the new index value
        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 367);
paginator._cIndex = index;

        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 369);
if (e.src !== UI) {
            _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 370);
paginator.scrollToIndex(index);
        }
    },

    /**
     * Hides page nodes not near the viewport
     *
     * @method _optimize
     * @protected
     */
    _optimize: function () {

        _yuitest_coverfunc("build/scrollview-paginator/scrollview-paginator.js", "_optimize", 380);
_yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 382);
if (!this.optimizeMemory) {
            _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 383);
return false;
        }

        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 386);
var paginator = this,
            host = paginator._host,
            optimizeMemory = paginator.optimizeMemory,
            currentIndex = paginator._cIndex,
            pageNodes;

        // Show the pages in/near the viewport & hide the rest
        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 393);
pageNodes = paginator._getStage(currentIndex);
        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 394);
paginator._showNodes(pageNodes.visible);
        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 395);
paginator._hideNodes(pageNodes.hidden);
    },

    /**
     * Determines which nodes should be visible, and which should be hidden.
     *
     * @method _getStage
     * @param index {Number} The page index # intended to be in focus.
     * @returns {object}
     * @protected
     */
    _getStage: function (index) {
        _yuitest_coverfunc("build/scrollview-paginator/scrollview-paginator.js", "_getStage", 406);
_yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 407);
var padding = this.padding,
            pageNodes = this._getPageNodes(),
            pageCount = this.get(TOTAL),
            start = Math.max(0, index - padding),
            end = Math.min(pageCount, index + 1 + padding); // noninclusive

        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 413);
return {
            visible: pageNodes.splice(start, end - start),
            hidden: pageNodes
        };
    },

    /**
     * A utility method to show node(s)
     *
     * @method _showNodes
     * @param nodeList {Object} The list of nodes to show
     * @protected
     */
    _showNodes: function (nodeList) {
        _yuitest_coverfunc("build/scrollview-paginator/scrollview-paginator.js", "_showNodes", 426);
_yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 427);
if (nodeList) {
            _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 428);
nodeList.removeClass(CLASS_HIDDEN).setStyle('visibility', '');
        }
    },

    /**
     * A utility method to hide node(s)
     *
     * @method _hideNodes
     * @param nodeList {Object} The list of nodes to hide
     * @protected
     */
    _hideNodes: function (nodeList) {
        _yuitest_coverfunc("build/scrollview-paginator/scrollview-paginator.js", "_hideNodes", 439);
_yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 440);
if (nodeList) {
            _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 441);
nodeList.addClass(CLASS_HIDDEN).setStyle('visibility', 'hidden');
        }
    },

    /**
     * Gets a nodeList for the "pages"
     *
     * @method _getPageNodes
     * @protected
     * @returns {nodeList}
     */
    _getPageNodes: function () {
        _yuitest_coverfunc("build/scrollview-paginator/scrollview-paginator.js", "_getPageNodes", 452);
_yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 453);
var paginator = this,
            host = paginator._host,
            cb = host._cb,
            pageSelector = paginator.get(SELECTOR),
            pageNodes = pageSelector ? cb.all(pageSelector) : cb.get('children');

        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 459);
return pageNodes;
    },

    /**
     * Scroll to the next page in the scrollview, with animation
     *
     * @method next
     */
    next: function () {
        _yuitest_coverfunc("build/scrollview-paginator/scrollview-paginator.js", "next", 467);
_yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 468);
var paginator = this,
            index = paginator._cIndex,
            target = index + 1,
            total = this.get(TOTAL);

        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 473);
if (target >= total) {
            _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 474);
return;
        }

        // Update the index
        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 478);
paginator.set(INDEX, target);
    },

    /**
     * Scroll to the previous page in the scrollview, with animation
     *
     * @method prev
     */
    prev: function () {
        _yuitest_coverfunc("build/scrollview-paginator/scrollview-paginator.js", "prev", 486);
_yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 487);
var paginator = this,
            index = paginator._cIndex,
            target = index - 1;

        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 491);
if (target < 0) {
            _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 492);
return;
        }

        // Update the index
        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 496);
paginator.set(INDEX, target);
    },
    
    /** 
     * @deprecated
     */
    scrollTo: function () {
        _yuitest_coverfunc("build/scrollview-paginator/scrollview-paginator.js", "scrollTo", 502);
_yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 503);
return this.scrollToIndex.apply(this, arguments);
    },

    /**
     * Scroll to a given page in the scrollview
     *
     * @method scrollToIndex
     * @param index {Number} The index of the page to scroll to
     * @param {Number} [duration] The number of ms the animation should last
     * @param {String} [easing] The timing function to use in the animation
     */
    scrollToIndex: function (index, duration, easing) {

        _yuitest_coverfunc("build/scrollview-paginator/scrollview-paginator.js", "scrollToIndex", 514);
_yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 516);
var paginator = this,
            host = paginator._host,
            pageNode = paginator._getPageNodes().item(index),
            scrollAxis = (paginator.axis[DIM_X] ? SCROLL_X : SCROLL_Y),
            scrollOffset = pageNode.get(scrollAxis === SCROLL_X ? 'offsetLeft' : 'offsetTop');

        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 522);
duration = (duration !== undefined) ? duration : PaginatorPlugin.TRANSITION.duration;
        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 523);
easing = (easing !== undefined) ? duration : PaginatorPlugin.TRANSITION.easing;

        // Set the index ATTR to the specified index value
        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 526);
paginator.set(INDEX, index);

        // Makes sure the viewport nodes are visible
        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 529);
paginator._showNodes(pageNode);

        // Scroll to the offset
        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 532);
host.set(scrollAxis, scrollOffset, {
            duration: duration,
            easing: easing
        });
    }
    
    // End prototype properties

}, {
    
    // Static properties

    /**
     * The identity of the plugin
     *
     * @property NAME
     * @type String
     * @default 'pluginScrollViewPaginator'
     * @readOnly
     * @protected
     * @static
     */
    NAME: 'pluginScrollViewPaginator',

    /**
     * The namespace on which the plugin will reside
     *
     * @property NS
     * @type String
     * @default 'pages'
     * @static
     */
    NS: 'pages',

    /**
     * The default attribute configuration for the plugin
     *
     * @property ATTRS
     * @type {Object}
     * @static
     */
    ATTRS: {

        /**
         * CSS selector for a page inside the scrollview. The scrollview
         * will snap to the closest page.
         *
         * @attribute selector
         * @type {String}
         * @default null
         */
        selector: {
            value: null
        },

        /**
         * The active page number for a paged scrollview
         *
         * @attribute index
         * @type {Number}
         * @default 0
         */
        index: {
            value: 0,
            validator: function (val) {
                // TODO: Remove this?
                // return val >= 0 && val < this.get(TOTAL);
                _yuitest_coverfunc("build/scrollview-paginator/scrollview-paginator.js", "validator", 596);
_yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 599);
return true;
            }
        },

        /**
         * The total number of pages
         *
         * @attribute total
         * @type {Number}
         * @default 0
         */
        total: {
            value: 0
        }
    },
        
    /**
     * The default snap to current duration and easing values used on scroll end.
     *
     * @property SNAP_TO_CURRENT
     * @static
     */
    TRANSITION: {
        duration: 300,
        easing: 'ease-out'
    }

    // End static properties

});

_yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 630);
Y.namespace('Plugin').ScrollViewPaginator = PaginatorPlugin;

}, '@VERSION@', {"requires": ["plugin", "classnamemanager"]});
