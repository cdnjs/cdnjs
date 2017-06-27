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
_yuitest_coverage["build/scrollview-paginator/scrollview-paginator.js"].code=["YUI.add('scrollview-paginator', function (Y, NAME) {","","/**"," * Provides a plugin that adds pagination support to ScrollView instances"," *"," * @module scrollview-paginator"," */","var getClassName = Y.ClassNameManager.getClassName,","    SCROLLVIEW = 'scrollview',","    CLASS_HIDDEN = getClassName(SCROLLVIEW, 'hidden'),","    CLASS_PAGED = getClassName(SCROLLVIEW, 'paged'),","    UI = (Y.ScrollView) ? Y.ScrollView.UI_SRC : 'ui',","    INDEX = 'index',","    SCROLL_X = 'scrollX',","    SCROLL_Y = 'scrollY',","    TOTAL = 'total',","    DISABLED = 'disabled',","    HOST = 'host',","    SELECTOR = 'selector',","    AXIS = 'axis',","    DIM_X = 'x',","    DIM_Y = 'y';","","/**"," * Scrollview plugin that adds support for paging"," *"," * @class ScrollViewPaginator"," * @namespace Plugin"," * @extends Plugin.Base"," * @constructor"," */","function PaginatorPlugin() {","    PaginatorPlugin.superclass.constructor.apply(this, arguments);","}","","Y.extend(PaginatorPlugin, Y.Plugin.Base, {","","    /**","     * Designated initializer","     *","     * @method initializer","     * @param {config} Configuration object for the plugin","     */","    initializer: function (config) {","        var paginator = this,","            host = paginator.get(HOST);","","        // Initialize & default","        paginator._pageDims = [];","        paginator._pageBuffer = 1;","        paginator._optimizeMemory = false;","","        // Cache some values","        paginator._host = host;","        paginator._bb = host._bb;","        paginator._cb = host._cb;","        paginator._cIndex = paginator.get(INDEX);","        paginator._cAxis = paginator.get(AXIS);","","        // Apply configs","        if (config._optimizeMemory) {","            paginator._optimizeMemory = config._optimizeMemory;","        }","","        if (config._pageBuffer) {","            paginator._pageBuffer = config._pageBuffer;","        }","","        // Attach event bindings","        paginator._bindAttrs();","    },","","    /**","     *","     *","     * @method _bindAttrs","     * @private","     */","    _bindAttrs: function () {","        var paginator = this;","","        // Event listeners","        paginator.after({","            'indexChange': paginator._afterIndexChange,","            'axisChange': paginator._afterAxisChange","        });","","        // Host method listeners","        paginator.beforeHostMethod('scrollTo', paginator._beforeHostScrollTo);","        paginator.beforeHostMethod('_mousewheel', paginator._beforeHostMousewheel);","        paginator.beforeHostMethod('_flick', paginator._beforeHostFlick);","        paginator.afterHostMethod('_onGestureMoveEnd', paginator._afterHostGestureMoveEnd);","        paginator.afterHostMethod('_uiDimensionsChange', paginator._afterHostUIDimensionsChange);","        paginator.afterHostMethod('syncUI', paginator._afterHostSyncUI);","        ","        // Host event listeners","        paginator.afterHostEvent('render', paginator._afterHostRender);","        paginator.afterHostEvent('scrollEnd', paginator._afterHostScrollEnded);","    },","","    /**","     * After host render","     *","     * @method _afterHostRender","     * @param e {Event.Facade} The event facade","     * @protected","     */","    _afterHostRender: function () {","        var paginator = this,","            bb = paginator._bb,","            host = paginator._host,","            index = paginator._cIndex,","            paginatorAxis = paginator._cAxis,","            pageNodes = paginator._getPageNodes(),","            size = pageNodes.size(),","            pageDim = paginator._pageDims[index];","","        if (paginatorAxis[DIM_Y]) {","            host._maxScrollX = pageDim.maxScrollX;","        }","        else if (paginatorAxis[DIM_X]) {","            host._maxScrollY = pageDim.maxScrollY;","        }","","        // Set the page count","        paginator.set(TOTAL, size);","","        // Jump to the index","        if (index !== 0) {","            paginator.scrollToIndex(index, 0);","        }","","        // Add the paginator class","        bb.addClass(CLASS_PAGED);","","        // Trigger the optimization process","        paginator._optimize();","    },","","    /**","     * After host syncUI","     *","     * @method _afterHostSyncUI","     * @param e {Event.Facade} The event facade","     * @protected","     */","    _afterHostSyncUI: function () {","        var paginator = this,","            host = paginator._host,","            pageNodes = paginator._getPageNodes(),","            size = pageNodes.size();","","        // Set the page count","        paginator.set(TOTAL, size);","","        // If paginator's 'axis' property is to be automatically determined, inherit host's property","        if (paginator._cAxis === undefined) {","            paginator._set(AXIS, host.get(AXIS));","        }","    },","","    /**","     * After host _uiDimensionsChange","     *","     * @method _afterHostUIDimensionsChange","     * @param e {Event.Facade} The event facade","     * @protected","     */","    _afterHostUIDimensionsChange: function () {","","        var paginator = this,","            host = paginator._host,","            dims = host._getScrollDims(),","            widgetWidth = dims.offsetWidth,","            widgetHeight = dims.offsetHeight,","            pageNodes = paginator._getPageNodes();","            ","        // Inefficient. Should not reinitialize every page every syncUI","        pageNodes.each(function (node, i) {","            var scrollWidth = node.get('scrollWidth'),","                scrollHeight = node.get('scrollHeight'),","                maxScrollX = Math.max(0, scrollWidth - widgetWidth), // Math.max to ensure we don't set it to a negative value","                maxScrollY = Math.max(0, scrollHeight - widgetHeight);","","            // Don't initialize any page _pageDims that already have been.","            if (!paginator._pageDims[i]) {","","                paginator._pageDims[i] = {","","                    // Current scrollX & scrollY positions (default to 0)","                    scrollX: 0,","                    scrollY: 0,","","                    // Maximum scrollable values","                    maxScrollX: maxScrollX,","                    maxScrollY: maxScrollY,","","                    // Height & width of the page","                    width: scrollWidth,","                    height: scrollHeight","                };","","            } else {","                paginator._pageDims[i].maxScrollX = maxScrollX;","                paginator._pageDims[i].maxScrollY = maxScrollY;","            }","","        });","    },","","    /**","     * Executed before host.scrollTo","     *","     * @method _beforeHostScrollTo","     * @param x {Number} The x-position to scroll to. (null for no movement)","     * @param y {Number} The y-position to scroll to. (null for no movement)","     * @param {Number} [duration] Duration, in ms, of the scroll animation (default is 0)","     * @param {String} [easing] An easing equation if duration is set","     * @param {String} [node] The node to move","     * @protected","     */","    _beforeHostScrollTo: function (x, y, duration, easing, node) {","        var paginator = this,","            host = paginator._host,","            gesture = host._gesture,","            index = paginator._cIndex,","            paginatorAxis = paginator._cAxis,","            pageNodes = paginator._getPageNodes(),","            gestureAxis;","","        if (gesture) {","            gestureAxis = gesture.axis;","","            // Null the opposite axis so it won't be modified by host.scrollTo","            if (gestureAxis === DIM_Y) {","                x = null;","            } else {","                y = null;","            }","","            // If they are scrolling against the specified axis, pull out the page's node to have its own offset","            if (paginatorAxis[gestureAxis] === false) {","                node = pageNodes.item(index);","            }","","        }","","        // Return the modified argument list","        return new Y.Do.AlterArgs(\"new args\", [x, y, duration, easing, node]);","    },","","    /**","     * Executed after host._gestureMoveEnd","     * Determines if the gesture should page prev or next (if at all)","     *","     * @method _afterHostGestureMoveEnd","     * @param e {Event.Facade} The event facade","     * @protected","     */","    _afterHostGestureMoveEnd: function () {","","        // This was a flick, so we don't need to do anything here","        if (this._host._gesture.flick) {","            return;","        }","","        var paginator = this,","            host = paginator._host,","            gesture = host._gesture,","            index = paginator._cIndex,","            paginatorAxis = paginator._cAxis,","            gestureAxis = gesture.axis,","            isHorizontal = (gestureAxis === DIM_X),","            delta = gesture[(isHorizontal ? 'deltaX' : 'deltaY')],","            isForward = (delta > 0),","            pageDims = paginator._pageDims[index],","            halfway = pageDims[(isHorizontal ? 'width' : 'height')] / 2,","            isHalfway = (Math.abs(delta) >= halfway),","            canScroll = paginatorAxis[gestureAxis],","            rtl = host.rtl;","","        if (canScroll) {","            if (isHalfway) { // TODO: This condition should probably be configurable","                // Fire next()/prev()","                paginator[(rtl === isForward ? 'prev' : 'next')]();","            }","            // Scrollback","            else {","                paginator.scrollToIndex(paginator.get(INDEX));","            }","        }","    },","","    /**","     * Executed before host._mousewheel","     * Prevents mousewheel events in some conditions","     *","     * @method _beforeHostMousewheel","     * @param e {Event.Facade} The event facade","     * @protected","     */","    _beforeHostMousewheel: function (e) {","        var paginator = this,","            host = paginator._host,","            bb = host._bb,","            isForward = (e.wheelDelta < 0),","            paginatorAxis = paginator._cAxis;","","        // Only if the mousewheel event occurred on a DOM node inside the BB","        if (bb.contains(e.target) && paginatorAxis[DIM_Y]) {","","            // Fire next()/prev()","            paginator[(isForward ? 'next' : 'prev')]();","","            // prevent browser default behavior on mousewheel","            e.preventDefault();","","            // Block host._mousewheel from running","            return new Y.Do.Prevent();","        }","    },","","    /**","     * Executed before host._flick","     * Prevents flick events in some conditions","     *","     * @method _beforeHostFlick","     * @param e {Event.Facade} The event facade","     * @protected","     */","    _beforeHostFlick: function (e) {","        ","        // If the widget is disabled","        if (this._host.get(DISABLED)) {","            return false;","        }","","        // The drag was out of bounds, so do nothing (which will cause a snapback)","        if (this._host._isOutOfBounds()){","            return new Y.Do.Prevent();","        }","        ","        var paginator = this,","            host = paginator._host,","            gesture = host._gesture,","            paginatorAxis = paginator.get(AXIS),","            flick = e.flick,","            velocity = flick.velocity,","            flickAxis = flick.axis || false,","            isForward = (velocity < 0),","            canScroll = paginatorAxis[flickAxis],","            rtl = host.rtl;","","        // Store the flick data in the this._host._gesture object so it knows this was a flick","        if (gesture) {","            gesture.flick = flick;","        }","","        // Can we scroll along this axis?","        if (canScroll) {","","            // Fire next()/prev()","            paginator[(rtl === isForward ? 'prev' : 'next')]();","","            // Prevent flicks on the paginated axis","            if (paginatorAxis[flickAxis]) {","                return new Y.Do.Prevent();","            }","        }","    },","","    /**","     * Executes after host's 'scrollEnd' event","     * Runs cleanup operations","     *","     * @method _afterHostScrollEnded","     * @param e {Event.Facade} The event facade","     * @protected","     */","    _afterHostScrollEnded: function () {","        var paginator = this,","            host = paginator._host,","            index = paginator._cIndex,","            scrollX = host.get(SCROLL_X),","            scrollY = host.get(SCROLL_Y),","            paginatorAxis = paginator._cAxis;","","        if (paginatorAxis[DIM_Y]) {","            paginator._pageDims[index].scrollX = scrollX;","        } else {","            paginator._pageDims[index].scrollY = scrollY;","        }","","        paginator._optimize();","    },","","    /**","     * index attr change handler","     *","     * @method _afterIndexChange","     * @param e {Event.Facade} The event facade","     * @protected","     */","    _afterIndexChange: function (e) {","        var paginator = this,","            host = paginator._host,","            index = e.newVal,","            pageDims = paginator._pageDims[index],","            hostAxis = host._cAxis,","            paginatorAxis = paginator._cAxis;","","        // Cache the new index value","        paginator._cIndex = index;","","        // For dual-axis instances, we need to hack some host properties to the","        // current page's max height/width and current stored offset","        if (hostAxis[DIM_X] && hostAxis[DIM_Y]) {","            if (paginatorAxis[DIM_Y]) {","                host._maxScrollX = pageDims.maxScrollX;","                host.set(SCROLL_X, pageDims.scrollX, { src: UI });","            }","            else if (paginatorAxis[DIM_X]) {","                host._maxScrollY = pageDims.maxScrollY;","                host.set(SCROLL_Y, pageDims.scrollY, { src: UI });","            }","        }","","        if (e.src !== UI) {","            paginator.scrollToIndex(index);","        }","    },","","    /**","     * Optimization: Hides the pages not near the viewport","     *","     * @method _optimize","     * @protected","     */","    _optimize: function () {","","        if (!this._optimizeMemory) {","            return false;","        }","","        var paginator = this,","            currentIndex = paginator._cIndex,","            pageNodes = paginator._getStage(currentIndex);","","        // Show the pages in/near the viewport & hide the rest","        paginator._showNodes(pageNodes.visible);","        paginator._hideNodes(pageNodes.hidden);","    },","","    /**","     * Optimization: Determines which nodes should be visible, and which should be hidden.","     *","     * @method _getStage","     * @param index {Number} The page index # intended to be in focus.","     * @return {object}","     * @protected","     */","    _getStage: function (index) {","        var paginator = this,","            pageBuffer = paginator._pageBuffer,","            pageCount = paginator.get(TOTAL),","            pageNodes = paginator._getPageNodes(),","            start = Math.max(0, index - pageBuffer),","            end = Math.min(pageCount, index + 1 + pageBuffer); // noninclusive","","        return {","            visible: pageNodes.splice(start, end - start),","            hidden: pageNodes","        };","    },","","    /**","     * A utility method to show node(s)","     *","     * @method _showNodes","     * @param nodeList {Object} The list of nodes to show","     * @protected","     */","    _showNodes: function (nodeList) {","        if (nodeList) {","            nodeList.removeClass(CLASS_HIDDEN).setStyle('visibility', '');","        }","    },","","    /**","     * A utility method to hide node(s)","     *","     * @method _hideNodes","     * @param nodeList {Object} The list of nodes to hide","     * @protected","     */","    _hideNodes: function (nodeList) {","        if (nodeList) {","            nodeList.addClass(CLASS_HIDDEN).setStyle('visibility', 'hidden');","        }","    },","","    /**","     * Gets a nodeList for the \"pages\"","     *","     * @method _getPageNodes","     * @protected","     * @return {nodeList}","     */","    _getPageNodes: function () {","        var paginator = this,","            host = paginator._host,","            cb = host._cb,","            pageSelector = paginator.get(SELECTOR),","            pageNodes = (pageSelector ? cb.all(pageSelector) : cb.get('children'));","","        return pageNodes;","    },","","    /**","     * Scroll to the next page, with animation","     *","     * @method next","     */","    next: function () {","        var paginator = this,","            index = paginator._cIndex,","            target = index + 1,","            total = paginator.get(TOTAL);","","        if (target >= total) {","            return;","        }","","        // Update the index","        paginator.set(INDEX, target);","    },","","    /**","     * Scroll to the previous page, with animation","     *","     * @method prev","     */","    prev: function () {","        var paginator = this,","            index = paginator._cIndex,","            target = index - 1;","","        if (target < 0) {","            return;","        }","","        // Update the index","        paginator.set(INDEX, target);","    },","    ","    /**","     * Deprecated for 3.7.0.","     * @method scrollTo","     * @deprecated","     */","    scrollTo: function () {","        return this.scrollToIndex.apply(this, arguments);","    },","","    /**","     * Scroll to a given page in the scrollview","     *","     * @method scrollToIndex","     * @since 3.7.0","     * @param index {Number} The index of the page to scroll to","     * @param {Number} [duration] The number of ms the animation should last","     * @param {String} [easing] The timing function to use in the animation","     */","    scrollToIndex: function (index, duration, easing) {","        var paginator = this,","            host = paginator._host,","            pageNode = paginator._getPageNodes().item(index),","            scrollAxis = (paginator._cAxis[DIM_X] ? SCROLL_X : SCROLL_Y),","            scrollOffset = pageNode.get(scrollAxis === SCROLL_X ? 'offsetLeft' : 'offsetTop');","","        duration = (duration !== undefined) ? duration : PaginatorPlugin.TRANSITION.duration;","        easing = (easing !== undefined) ? easing : PaginatorPlugin.TRANSITION.easing;","","        // Set the index ATTR to the specified index value","        paginator.set(INDEX, index, { src: UI });","","        // Makes sure the viewport nodes are visible","        paginator._showNodes(pageNode);","","        // Scroll to the offset","        host.set(scrollAxis, scrollOffset, {","            duration: duration,","            easing: easing","        });","    },","","    /**","     * Setter for 'axis' attribute","     *","     * @method _axisSetter","     * @param val {Mixed} A string ('x', 'y', 'xy') to specify which axis/axes to allow scrolling on","     * @param name {String} The attribute name","     * @return {Object} An object to specify scrollability on the x & y axes","     *","     * @protected","     */","    _axisSetter: function (val) {","","        // Turn a string into an axis object","        if (Y.Lang.isString(val)) {","            return {","                x: (val.match(/x/i) ? true : false),","                y: (val.match(/y/i) ? true : false)","            };","        }","    },"," ","","    /**","     * After listener for the axis attribute","     *","     * @method _afterAxisChange","     * @param e {Event.Facade} The event facade","     * @protected","     */","    _afterAxisChange: function (e) {","        this._cAxis = e.newVal;","    }","","    // End prototype properties","","}, {","    ","    // Static properties","","    /**","     * The identity of the plugin","     *","     * @property NAME","     * @type String","     * @default 'pluginScrollViewPaginator'","     * @readOnly","     * @protected","     * @static","     */","    NAME: 'pluginScrollViewPaginator',","","    /**","     * The namespace on which the plugin will reside","     *","     * @property NS","     * @type String","     * @default 'pages'","     * @static","     */","    NS: 'pages',","","    /**","     * The default attribute configuration for the plugin","     *","     * @property ATTRS","     * @type {Object}","     * @static","     */","    ATTRS: {","","        /**","         * Specifies ability to scroll on x, y, or x and y axis/axes.","         *  If unspecified, it inherits from the host instance.","         *","         * @attribute axis","         * @type String","         */","        axis: {","            setter: '_axisSetter',","            writeOnce: 'initOnly'","        },","","        /**","         * CSS selector for a page inside the scrollview. The scrollview","         * will snap to the closest page.","         *","         * @attribute selector","         * @type {String}","         * @default null","         */","        selector: {","            value: null","        },","","        /**","         * The active page number for a paged scrollview","         *","         * @attribute index","         * @type {Number}","         * @default 0","         */","        index: {","            value: 0","        },","","        /**","         * The total number of pages","         *","         * @attribute total","         * @type {Number}","         * @default 0","         */","        total: {","            value: 0","        }","    },","        ","    /**","     * The default snap to current duration and easing values used on scroll end.","     *","     * @property SNAP_TO_CURRENT","     * @static","     */","    TRANSITION: {","        duration: 300,","        easing: 'ease-out'","    }","","    // End static properties","","});","","Y.namespace('Plugin').ScrollViewPaginator = PaginatorPlugin;","","","}, '@VERSION@', {\"requires\": [\"plugin\", \"classnamemanager\"]});"];
_yuitest_coverage["build/scrollview-paginator/scrollview-paginator.js"].lines = {"1":0,"8":0,"32":0,"33":0,"36":0,"45":0,"49":0,"50":0,"51":0,"54":0,"55":0,"56":0,"57":0,"58":0,"61":0,"62":0,"65":0,"66":0,"70":0,"80":0,"83":0,"89":0,"90":0,"91":0,"92":0,"93":0,"94":0,"97":0,"98":0,"109":0,"118":0,"119":0,"121":0,"122":0,"126":0,"129":0,"130":0,"134":0,"137":0,"148":0,"154":0,"157":0,"158":0,"171":0,"179":0,"180":0,"186":0,"188":0,"204":0,"205":0,"223":0,"231":0,"232":0,"235":0,"236":0,"238":0,"242":0,"243":0,"249":0,"263":0,"264":0,"267":0,"282":0,"283":0,"285":0,"289":0,"303":0,"310":0,"313":0,"316":0,"319":0,"334":0,"335":0,"339":0,"340":0,"343":0,"355":0,"356":0,"360":0,"363":0,"366":0,"367":0,"381":0,"388":0,"389":0,"391":0,"394":0,"405":0,"413":0,"417":0,"418":0,"419":0,"420":0,"422":0,"423":0,"424":0,"428":0,"429":0,"441":0,"442":0,"445":0,"450":0,"451":0,"463":0,"470":0,"484":0,"485":0,"497":0,"498":0,"510":0,"516":0,"525":0,"530":0,"531":0,"535":0,"544":0,"548":0,"549":0,"553":0,"562":0,"575":0,"581":0,"582":0,"585":0,"588":0,"591":0,"610":0,"611":0,"627":0,"729":0};
_yuitest_coverage["build/scrollview-paginator/scrollview-paginator.js"].functions = {"PaginatorPlugin:32":0,"initializer:44":0,"_bindAttrs:79":0,"_afterHostRender:108":0,"_afterHostSyncUI:147":0,"(anonymous 2):179":0,"_afterHostUIDimensionsChange:169":0,"_beforeHostScrollTo:222":0,"_afterHostGestureMoveEnd:260":0,"_beforeHostMousewheel:302":0,"_beforeHostFlick:331":0,"_afterHostScrollEnded:380":0,"_afterIndexChange:404":0,"_optimize:439":0,"_getStage:462":0,"_showNodes:483":0,"_hideNodes:496":0,"_getPageNodes:509":0,"next:524":0,"prev:543":0,"scrollTo:561":0,"scrollToIndex:574":0,"_axisSetter:607":0,"_afterAxisChange:626":0,"(anonymous 1):1":0};
_yuitest_coverage["build/scrollview-paginator/scrollview-paginator.js"].coveredLines = 130;
_yuitest_coverage["build/scrollview-paginator/scrollview-paginator.js"].coveredFunctions = 25;
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
    DISABLED = 'disabled',
    HOST = 'host',
    SELECTOR = 'selector',
    AXIS = 'axis',
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
_yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 32);
function PaginatorPlugin() {
    _yuitest_coverfunc("build/scrollview-paginator/scrollview-paginator.js", "PaginatorPlugin", 32);
_yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 33);
PaginatorPlugin.superclass.constructor.apply(this, arguments);
}

_yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 36);
Y.extend(PaginatorPlugin, Y.Plugin.Base, {

    /**
     * Designated initializer
     *
     * @method initializer
     * @param {config} Configuration object for the plugin
     */
    initializer: function (config) {
        _yuitest_coverfunc("build/scrollview-paginator/scrollview-paginator.js", "initializer", 44);
_yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 45);
var paginator = this,
            host = paginator.get(HOST);

        // Initialize & default
        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 49);
paginator._pageDims = [];
        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 50);
paginator._pageBuffer = 1;
        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 51);
paginator._optimizeMemory = false;

        // Cache some values
        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 54);
paginator._host = host;
        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 55);
paginator._bb = host._bb;
        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 56);
paginator._cb = host._cb;
        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 57);
paginator._cIndex = paginator.get(INDEX);
        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 58);
paginator._cAxis = paginator.get(AXIS);

        // Apply configs
        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 61);
if (config._optimizeMemory) {
            _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 62);
paginator._optimizeMemory = config._optimizeMemory;
        }

        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 65);
if (config._pageBuffer) {
            _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 66);
paginator._pageBuffer = config._pageBuffer;
        }

        // Attach event bindings
        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 70);
paginator._bindAttrs();
    },

    /**
     *
     *
     * @method _bindAttrs
     * @private
     */
    _bindAttrs: function () {
        _yuitest_coverfunc("build/scrollview-paginator/scrollview-paginator.js", "_bindAttrs", 79);
_yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 80);
var paginator = this;

        // Event listeners
        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 83);
paginator.after({
            'indexChange': paginator._afterIndexChange,
            'axisChange': paginator._afterAxisChange
        });

        // Host method listeners
        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 89);
paginator.beforeHostMethod('scrollTo', paginator._beforeHostScrollTo);
        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 90);
paginator.beforeHostMethod('_mousewheel', paginator._beforeHostMousewheel);
        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 91);
paginator.beforeHostMethod('_flick', paginator._beforeHostFlick);
        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 92);
paginator.afterHostMethod('_onGestureMoveEnd', paginator._afterHostGestureMoveEnd);
        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 93);
paginator.afterHostMethod('_uiDimensionsChange', paginator._afterHostUIDimensionsChange);
        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 94);
paginator.afterHostMethod('syncUI', paginator._afterHostSyncUI);
        
        // Host event listeners
        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 97);
paginator.afterHostEvent('render', paginator._afterHostRender);
        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 98);
paginator.afterHostEvent('scrollEnd', paginator._afterHostScrollEnded);
    },

    /**
     * After host render
     *
     * @method _afterHostRender
     * @param e {Event.Facade} The event facade
     * @protected
     */
    _afterHostRender: function () {
        _yuitest_coverfunc("build/scrollview-paginator/scrollview-paginator.js", "_afterHostRender", 108);
_yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 109);
var paginator = this,
            bb = paginator._bb,
            host = paginator._host,
            index = paginator._cIndex,
            paginatorAxis = paginator._cAxis,
            pageNodes = paginator._getPageNodes(),
            size = pageNodes.size(),
            pageDim = paginator._pageDims[index];

        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 118);
if (paginatorAxis[DIM_Y]) {
            _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 119);
host._maxScrollX = pageDim.maxScrollX;
        }
        else {_yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 121);
if (paginatorAxis[DIM_X]) {
            _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 122);
host._maxScrollY = pageDim.maxScrollY;
        }}

        // Set the page count
        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 126);
paginator.set(TOTAL, size);

        // Jump to the index
        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 129);
if (index !== 0) {
            _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 130);
paginator.scrollToIndex(index, 0);
        }

        // Add the paginator class
        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 134);
bb.addClass(CLASS_PAGED);

        // Trigger the optimization process
        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 137);
paginator._optimize();
    },

    /**
     * After host syncUI
     *
     * @method _afterHostSyncUI
     * @param e {Event.Facade} The event facade
     * @protected
     */
    _afterHostSyncUI: function () {
        _yuitest_coverfunc("build/scrollview-paginator/scrollview-paginator.js", "_afterHostSyncUI", 147);
_yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 148);
var paginator = this,
            host = paginator._host,
            pageNodes = paginator._getPageNodes(),
            size = pageNodes.size();

        // Set the page count
        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 154);
paginator.set(TOTAL, size);

        // If paginator's 'axis' property is to be automatically determined, inherit host's property
        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 157);
if (paginator._cAxis === undefined) {
            _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 158);
paginator._set(AXIS, host.get(AXIS));
        }
    },

    /**
     * After host _uiDimensionsChange
     *
     * @method _afterHostUIDimensionsChange
     * @param e {Event.Facade} The event facade
     * @protected
     */
    _afterHostUIDimensionsChange: function () {

        _yuitest_coverfunc("build/scrollview-paginator/scrollview-paginator.js", "_afterHostUIDimensionsChange", 169);
_yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 171);
var paginator = this,
            host = paginator._host,
            dims = host._getScrollDims(),
            widgetWidth = dims.offsetWidth,
            widgetHeight = dims.offsetHeight,
            pageNodes = paginator._getPageNodes();
            
        // Inefficient. Should not reinitialize every page every syncUI
        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 179);
pageNodes.each(function (node, i) {
            _yuitest_coverfunc("build/scrollview-paginator/scrollview-paginator.js", "(anonymous 2)", 179);
_yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 180);
var scrollWidth = node.get('scrollWidth'),
                scrollHeight = node.get('scrollHeight'),
                maxScrollX = Math.max(0, scrollWidth - widgetWidth), // Math.max to ensure we don't set it to a negative value
                maxScrollY = Math.max(0, scrollHeight - widgetHeight);

            // Don't initialize any page _pageDims that already have been.
            _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 186);
if (!paginator._pageDims[i]) {

                _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 188);
paginator._pageDims[i] = {

                    // Current scrollX & scrollY positions (default to 0)
                    scrollX: 0,
                    scrollY: 0,

                    // Maximum scrollable values
                    maxScrollX: maxScrollX,
                    maxScrollY: maxScrollY,

                    // Height & width of the page
                    width: scrollWidth,
                    height: scrollHeight
                };

            } else {
                _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 204);
paginator._pageDims[i].maxScrollX = maxScrollX;
                _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 205);
paginator._pageDims[i].maxScrollY = maxScrollY;
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
        _yuitest_coverfunc("build/scrollview-paginator/scrollview-paginator.js", "_beforeHostScrollTo", 222);
_yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 223);
var paginator = this,
            host = paginator._host,
            gesture = host._gesture,
            index = paginator._cIndex,
            paginatorAxis = paginator._cAxis,
            pageNodes = paginator._getPageNodes(),
            gestureAxis;

        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 231);
if (gesture) {
            _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 232);
gestureAxis = gesture.axis;

            // Null the opposite axis so it won't be modified by host.scrollTo
            _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 235);
if (gestureAxis === DIM_Y) {
                _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 236);
x = null;
            } else {
                _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 238);
y = null;
            }

            // If they are scrolling against the specified axis, pull out the page's node to have its own offset
            _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 242);
if (paginatorAxis[gestureAxis] === false) {
                _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 243);
node = pageNodes.item(index);
            }

        }

        // Return the modified argument list
        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 249);
return new Y.Do.AlterArgs("new args", [x, y, duration, easing, node]);
    },

    /**
     * Executed after host._gestureMoveEnd
     * Determines if the gesture should page prev or next (if at all)
     *
     * @method _afterHostGestureMoveEnd
     * @param e {Event.Facade} The event facade
     * @protected
     */
    _afterHostGestureMoveEnd: function () {

        // This was a flick, so we don't need to do anything here
        _yuitest_coverfunc("build/scrollview-paginator/scrollview-paginator.js", "_afterHostGestureMoveEnd", 260);
_yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 263);
if (this._host._gesture.flick) {
            _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 264);
return;
        }

        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 267);
var paginator = this,
            host = paginator._host,
            gesture = host._gesture,
            index = paginator._cIndex,
            paginatorAxis = paginator._cAxis,
            gestureAxis = gesture.axis,
            isHorizontal = (gestureAxis === DIM_X),
            delta = gesture[(isHorizontal ? 'deltaX' : 'deltaY')],
            isForward = (delta > 0),
            pageDims = paginator._pageDims[index],
            halfway = pageDims[(isHorizontal ? 'width' : 'height')] / 2,
            isHalfway = (Math.abs(delta) >= halfway),
            canScroll = paginatorAxis[gestureAxis],
            rtl = host.rtl;

        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 282);
if (canScroll) {
            _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 283);
if (isHalfway) { // TODO: This condition should probably be configurable
                // Fire next()/prev()
                _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 285);
paginator[(rtl === isForward ? 'prev' : 'next')]();
            }
            // Scrollback
            else {
                _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 289);
paginator.scrollToIndex(paginator.get(INDEX));
            }
        }
    },

    /**
     * Executed before host._mousewheel
     * Prevents mousewheel events in some conditions
     *
     * @method _beforeHostMousewheel
     * @param e {Event.Facade} The event facade
     * @protected
     */
    _beforeHostMousewheel: function (e) {
        _yuitest_coverfunc("build/scrollview-paginator/scrollview-paginator.js", "_beforeHostMousewheel", 302);
_yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 303);
var paginator = this,
            host = paginator._host,
            bb = host._bb,
            isForward = (e.wheelDelta < 0),
            paginatorAxis = paginator._cAxis;

        // Only if the mousewheel event occurred on a DOM node inside the BB
        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 310);
if (bb.contains(e.target) && paginatorAxis[DIM_Y]) {

            // Fire next()/prev()
            _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 313);
paginator[(isForward ? 'next' : 'prev')]();

            // prevent browser default behavior on mousewheel
            _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 316);
e.preventDefault();

            // Block host._mousewheel from running
            _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 319);
return new Y.Do.Prevent();
        }
    },

    /**
     * Executed before host._flick
     * Prevents flick events in some conditions
     *
     * @method _beforeHostFlick
     * @param e {Event.Facade} The event facade
     * @protected
     */
    _beforeHostFlick: function (e) {
        
        // If the widget is disabled
        _yuitest_coverfunc("build/scrollview-paginator/scrollview-paginator.js", "_beforeHostFlick", 331);
_yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 334);
if (this._host.get(DISABLED)) {
            _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 335);
return false;
        }

        // The drag was out of bounds, so do nothing (which will cause a snapback)
        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 339);
if (this._host._isOutOfBounds()){
            _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 340);
return new Y.Do.Prevent();
        }
        
        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 343);
var paginator = this,
            host = paginator._host,
            gesture = host._gesture,
            paginatorAxis = paginator.get(AXIS),
            flick = e.flick,
            velocity = flick.velocity,
            flickAxis = flick.axis || false,
            isForward = (velocity < 0),
            canScroll = paginatorAxis[flickAxis],
            rtl = host.rtl;

        // Store the flick data in the this._host._gesture object so it knows this was a flick
        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 355);
if (gesture) {
            _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 356);
gesture.flick = flick;
        }

        // Can we scroll along this axis?
        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 360);
if (canScroll) {

            // Fire next()/prev()
            _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 363);
paginator[(rtl === isForward ? 'prev' : 'next')]();

            // Prevent flicks on the paginated axis
            _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 366);
if (paginatorAxis[flickAxis]) {
                _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 367);
return new Y.Do.Prevent();
            }
        }
    },

    /**
     * Executes after host's 'scrollEnd' event
     * Runs cleanup operations
     *
     * @method _afterHostScrollEnded
     * @param e {Event.Facade} The event facade
     * @protected
     */
    _afterHostScrollEnded: function () {
        _yuitest_coverfunc("build/scrollview-paginator/scrollview-paginator.js", "_afterHostScrollEnded", 380);
_yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 381);
var paginator = this,
            host = paginator._host,
            index = paginator._cIndex,
            scrollX = host.get(SCROLL_X),
            scrollY = host.get(SCROLL_Y),
            paginatorAxis = paginator._cAxis;

        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 388);
if (paginatorAxis[DIM_Y]) {
            _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 389);
paginator._pageDims[index].scrollX = scrollX;
        } else {
            _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 391);
paginator._pageDims[index].scrollY = scrollY;
        }

        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 394);
paginator._optimize();
    },

    /**
     * index attr change handler
     *
     * @method _afterIndexChange
     * @param e {Event.Facade} The event facade
     * @protected
     */
    _afterIndexChange: function (e) {
        _yuitest_coverfunc("build/scrollview-paginator/scrollview-paginator.js", "_afterIndexChange", 404);
_yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 405);
var paginator = this,
            host = paginator._host,
            index = e.newVal,
            pageDims = paginator._pageDims[index],
            hostAxis = host._cAxis,
            paginatorAxis = paginator._cAxis;

        // Cache the new index value
        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 413);
paginator._cIndex = index;

        // For dual-axis instances, we need to hack some host properties to the
        // current page's max height/width and current stored offset
        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 417);
if (hostAxis[DIM_X] && hostAxis[DIM_Y]) {
            _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 418);
if (paginatorAxis[DIM_Y]) {
                _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 419);
host._maxScrollX = pageDims.maxScrollX;
                _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 420);
host.set(SCROLL_X, pageDims.scrollX, { src: UI });
            }
            else {_yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 422);
if (paginatorAxis[DIM_X]) {
                _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 423);
host._maxScrollY = pageDims.maxScrollY;
                _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 424);
host.set(SCROLL_Y, pageDims.scrollY, { src: UI });
            }}
        }

        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 428);
if (e.src !== UI) {
            _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 429);
paginator.scrollToIndex(index);
        }
    },

    /**
     * Optimization: Hides the pages not near the viewport
     *
     * @method _optimize
     * @protected
     */
    _optimize: function () {

        _yuitest_coverfunc("build/scrollview-paginator/scrollview-paginator.js", "_optimize", 439);
_yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 441);
if (!this._optimizeMemory) {
            _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 442);
return false;
        }

        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 445);
var paginator = this,
            currentIndex = paginator._cIndex,
            pageNodes = paginator._getStage(currentIndex);

        // Show the pages in/near the viewport & hide the rest
        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 450);
paginator._showNodes(pageNodes.visible);
        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 451);
paginator._hideNodes(pageNodes.hidden);
    },

    /**
     * Optimization: Determines which nodes should be visible, and which should be hidden.
     *
     * @method _getStage
     * @param index {Number} The page index # intended to be in focus.
     * @return {object}
     * @protected
     */
    _getStage: function (index) {
        _yuitest_coverfunc("build/scrollview-paginator/scrollview-paginator.js", "_getStage", 462);
_yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 463);
var paginator = this,
            pageBuffer = paginator._pageBuffer,
            pageCount = paginator.get(TOTAL),
            pageNodes = paginator._getPageNodes(),
            start = Math.max(0, index - pageBuffer),
            end = Math.min(pageCount, index + 1 + pageBuffer); // noninclusive

        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 470);
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
        _yuitest_coverfunc("build/scrollview-paginator/scrollview-paginator.js", "_showNodes", 483);
_yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 484);
if (nodeList) {
            _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 485);
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
        _yuitest_coverfunc("build/scrollview-paginator/scrollview-paginator.js", "_hideNodes", 496);
_yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 497);
if (nodeList) {
            _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 498);
nodeList.addClass(CLASS_HIDDEN).setStyle('visibility', 'hidden');
        }
    },

    /**
     * Gets a nodeList for the "pages"
     *
     * @method _getPageNodes
     * @protected
     * @return {nodeList}
     */
    _getPageNodes: function () {
        _yuitest_coverfunc("build/scrollview-paginator/scrollview-paginator.js", "_getPageNodes", 509);
_yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 510);
var paginator = this,
            host = paginator._host,
            cb = host._cb,
            pageSelector = paginator.get(SELECTOR),
            pageNodes = (pageSelector ? cb.all(pageSelector) : cb.get('children'));

        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 516);
return pageNodes;
    },

    /**
     * Scroll to the next page, with animation
     *
     * @method next
     */
    next: function () {
        _yuitest_coverfunc("build/scrollview-paginator/scrollview-paginator.js", "next", 524);
_yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 525);
var paginator = this,
            index = paginator._cIndex,
            target = index + 1,
            total = paginator.get(TOTAL);

        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 530);
if (target >= total) {
            _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 531);
return;
        }

        // Update the index
        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 535);
paginator.set(INDEX, target);
    },

    /**
     * Scroll to the previous page, with animation
     *
     * @method prev
     */
    prev: function () {
        _yuitest_coverfunc("build/scrollview-paginator/scrollview-paginator.js", "prev", 543);
_yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 544);
var paginator = this,
            index = paginator._cIndex,
            target = index - 1;

        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 548);
if (target < 0) {
            _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 549);
return;
        }

        // Update the index
        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 553);
paginator.set(INDEX, target);
    },
    
    /**
     * Deprecated for 3.7.0.
     * @method scrollTo
     * @deprecated
     */
    scrollTo: function () {
        _yuitest_coverfunc("build/scrollview-paginator/scrollview-paginator.js", "scrollTo", 561);
_yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 562);
return this.scrollToIndex.apply(this, arguments);
    },

    /**
     * Scroll to a given page in the scrollview
     *
     * @method scrollToIndex
     * @since 3.7.0
     * @param index {Number} The index of the page to scroll to
     * @param {Number} [duration] The number of ms the animation should last
     * @param {String} [easing] The timing function to use in the animation
     */
    scrollToIndex: function (index, duration, easing) {
        _yuitest_coverfunc("build/scrollview-paginator/scrollview-paginator.js", "scrollToIndex", 574);
_yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 575);
var paginator = this,
            host = paginator._host,
            pageNode = paginator._getPageNodes().item(index),
            scrollAxis = (paginator._cAxis[DIM_X] ? SCROLL_X : SCROLL_Y),
            scrollOffset = pageNode.get(scrollAxis === SCROLL_X ? 'offsetLeft' : 'offsetTop');

        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 581);
duration = (duration !== undefined) ? duration : PaginatorPlugin.TRANSITION.duration;
        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 582);
easing = (easing !== undefined) ? easing : PaginatorPlugin.TRANSITION.easing;

        // Set the index ATTR to the specified index value
        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 585);
paginator.set(INDEX, index, { src: UI });

        // Makes sure the viewport nodes are visible
        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 588);
paginator._showNodes(pageNode);

        // Scroll to the offset
        _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 591);
host.set(scrollAxis, scrollOffset, {
            duration: duration,
            easing: easing
        });
    },

    /**
     * Setter for 'axis' attribute
     *
     * @method _axisSetter
     * @param val {Mixed} A string ('x', 'y', 'xy') to specify which axis/axes to allow scrolling on
     * @param name {String} The attribute name
     * @return {Object} An object to specify scrollability on the x & y axes
     *
     * @protected
     */
    _axisSetter: function (val) {

        // Turn a string into an axis object
        _yuitest_coverfunc("build/scrollview-paginator/scrollview-paginator.js", "_axisSetter", 607);
_yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 610);
if (Y.Lang.isString(val)) {
            _yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 611);
return {
                x: (val.match(/x/i) ? true : false),
                y: (val.match(/y/i) ? true : false)
            };
        }
    },
 

    /**
     * After listener for the axis attribute
     *
     * @method _afterAxisChange
     * @param e {Event.Facade} The event facade
     * @protected
     */
    _afterAxisChange: function (e) {
        _yuitest_coverfunc("build/scrollview-paginator/scrollview-paginator.js", "_afterAxisChange", 626);
_yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 627);
this._cAxis = e.newVal;
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
         * Specifies ability to scroll on x, y, or x and y axis/axes.
         *  If unspecified, it inherits from the host instance.
         *
         * @attribute axis
         * @type String
         */
        axis: {
            setter: '_axisSetter',
            writeOnce: 'initOnly'
        },

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
            value: 0
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

_yuitest_coverline("build/scrollview-paginator/scrollview-paginator.js", 729);
Y.namespace('Plugin').ScrollViewPaginator = PaginatorPlugin;


}, '@VERSION@', {"requires": ["plugin", "classnamemanager"]});
