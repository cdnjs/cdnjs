YUI.add('scrollview-paginator', function(Y) {

/*jslint nomen:true sloppy:true white:true*/
/*global Y*/

/**
 * Provides a plugin, which adds pagination support to ScrollView instances
 *
 * @module scrollview-paginator
 */
var getClassName = Y.ClassNameManager.getClassName,
    SCROLLVIEW = 'scrollview',
    CLASS_HIDDEN = getClassName(SCROLLVIEW, 'hidden'),
    CLASS_PAGED = getClassName(SCROLLVIEW, 'paged'),
    UI = (Y.ScrollView) ? Y.ScrollView.UI_SRC : "ui",
    INDEX = "index",
    SCROLL_X = "scrollX",
    SCROLL_Y = "scrollY",
    TOTAL = "total",
    HOST = "host",
    BOUNDING_BOX = "boundingBox",
    CONTENT_BOX = "contentBox",
    SELECTOR = "selector",
    FLICK = "flick",
    DRAG = "drag";

/**
 * Scrollview plugin that adds support for paging
 *
 * @class ScrollViewPaginator
 * @namespace Plugin
 * @extends Plugin.Base 
 * @constructor
 */
function PaginatorPlugin() {
    PaginatorPlugin.superclass.constructor.apply(this, arguments);
}

/**
 * The identity of the plugin
 *
 * @property NAME
 * @type String
 * @default 'paginatorPlugin'
 * @static
 */
PaginatorPlugin.NAME = 'pluginScrollViewPaginator';

/**
 * The namespace on which the plugin will reside
 *
 * @property NS
 * @type String
 * @default 'pages'
 * @static
 */
PaginatorPlugin.NS = 'pages';

/**
 * The default attribute configuration for the plugin
 *
 * @property ATTRS
 * @type Object
 * @static
 */
PaginatorPlugin.ATTRS = {

    /**
     * CSS selector for a page inside the scrollview. The scrollview
     * will snap to the closest page.
     *
     * @attribute selector
     * @type {String}
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
        validator: function(val) {
            return val >= 0 && val < this.get(TOTAL);
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
};

Y.extend(PaginatorPlugin, Y.Plugin.Base, {
    
    optimizeMemory: false,
    padding: 1,
    _uiEnabled: true,
    _prevent: new Y.Do.Prevent(),
    
    /**
     * Designated initializer
     *
     * @method initializer
     */
    initializer: function (config) {
        var paginator = this,
            host = paginator.get(HOST),
            optimizeMemory = config.optimizeMemory || paginator.optimizeMemory,
            padding = config.padding || paginator.padding;
            
        paginator.padding = padding;
        paginator.optimizeMemory = optimizeMemory;
        paginator._host = host;
        paginator._hostOriginalFlick = host.get(FLICK);
        paginator._hostOriginalDrag = host.get(DRAG);
        
        paginator.beforeHostMethod('_mousewheel', paginator._mousewheel);
        paginator.beforeHostMethod('_flickFrame', paginator._flickFrame);
        paginator.beforeHostMethod('_onGestureMoveEnd', paginator._onGestureMoveEnd);
        paginator.afterHostMethod('_uiDimensionsChange', paginator._afterHostUIDimensionsChange);
        paginator.afterHostEvent('render', paginator._afterHostRender);
        paginator.afterHostEvent('scrollEnd', paginator._scrollEnded);
        paginator.after('indexChange', paginator._afterIndexChange);
    },
    
    /**
     * After host render handler
     *
     * @method _afterHostRender
     * @param {Event.Facade}
     * @protected
     */
    _afterHostRender: function (e) {
        var paginator = this,
            host = paginator._host,
            pageNodes = paginator._getPageNodes(),
            size = pageNodes.size(),
            bb = host.get(BOUNDING_BOX);
            
        bb.addClass(CLASS_PAGED);
        paginator.set(TOTAL, size);
        paginator._optimize();
    },
    
    /**
     * After host _uiDimensionsChange
     *
     * @method _afterHostUIDimensionsChange
     * @param {Event.Facade}
     * @protected
     */
    _afterHostUIDimensionsChange: function(e) {
        var paginator = this;
        paginator.set(TOTAL, paginator._getPageNodes().size());
    },
     
    /**
     * Over-rides the host _onGestureMoveEnd method
     * Executed on flicks at end of strip, or low velocity flicks that are not enough to advance the page.
     *
     * @method _onGestureMoveEnd
     * @protected
     */
    _onGestureMoveEnd: function (e) {
        var paginator = this,
            currentIndex = paginator.get(INDEX);
        
        paginator.scrollTo(currentIndex);
    },
    
    /**
     * Executed to respond to the flick event, by over-riding the default flickFrame animation. 
     * This is needed to determine if the next or prev page should be activated.
     *
     * @method _flickFrame
     * @protected
     */
    _flickFrame: function () {
        var paginator = this,
            host = paginator._host,
            velocity = host._currentVelocity,
            isForward = velocity < 0;
            
        if (velocity) {
            if (isForward) {
                paginator.next();
            }
            else {
                paginator.prev();
            }
        }

        return paginator._prevent;
    },
    
    /**
     * Executed to respond to the mousewheel event, by over-riding the default mousewheel method.
     *
     * @method _mousewheel
     * @param {Event.Facade}
     * @protected
     */
    _mousewheel: function (e) {
        var paginator = this,
            host = paginator._host,
            isForward = e.wheelDelta < 0, // down (negative) is forward.  @TODO Should revisit.
            cb = host.get(CONTENT_BOX);
        
        // Only if the mousewheel event occurred on a DOM node inside the CB
        if (cb.contains(e.target)){
            if (isForward) {
                paginator.next();
            }
            else {
                paginator.prev();
            }
            
            // prevent browser default behavior on mousewheel
            e.preventDefault();
            
            // Block host._mousewheel from running
            return paginator._prevent;
        }
    },

    /**
     * scrollEnd handler to run some cleanup operations
     *
     * @method _scrollEnded
     * @param {Event.Facade}
     * @protected
     */
     _scrollEnded: function (e) {
        var paginator = this,
            currentIndex = paginator.get(INDEX);
        
        paginator._optimize();
        this._uiEnable();
     },

    /**
     * index attr change handler
     *
     * @method _afterIndexChange
     * @param {Event.Facade}
     * @protected
     */
    _afterIndexChange: function (e) {
        var paginator = this,
            index = e.newVal;
        
        if(e.src !== UI) {
            paginator.scrollTo(index);
        }
    },
    
    /**
     * Improves performance by hiding page nodes not near the viewport
     *
     * @method _optimize
     * @protected
     */
    _optimize: function() {
        var paginator = this,
            host = paginator._host,
            optimizeMemory = paginator.optimizeMemory,
            isVert = host._scrollsVertical,
            currentIndex = paginator.get(INDEX),
            pageNodes;
        
        if (!optimizeMemory) {
            return false;
        }
        
        // Show the pages in/near the viewport & hide the rest
        pageNodes = paginator._getStage(currentIndex);
        paginator._showNodes(pageNodes.visible);
        paginator._hideNodes(pageNodes.hidden);
        
        paginator.scrollTo(currentIndex, 0);
    },
    
    /**
     * Determines which nodes should be visible, and which should be hidden.
     *
     * @method _getStage
     * @param index {Number} The page index # intended to be in focus.
     * @returns {object} 
     * @protected
     */
    _getStage : function (index) {
        var paginator = this,
            host = paginator._host,
            padding = paginator.padding,
            visibleCount = padding + 1 + padding, // Before viewport | viewport | after viewport
            pageNodes = paginator._getPageNodes(),
            pageCount = paginator.get(TOTAL),
            start, visible, hidden;
        
        // Somehow this works.  @TODO cleanup
        start = Math.max(index-padding, 0);
        if (start+visibleCount > pageCount) {
            start = start-(start+visibleCount-pageCount);
        }
        
        visible = pageNodes.splice(start, visibleCount);
        hidden = pageNodes; // everything leftover
        
        return {
            visible: visible,
            hidden: hidden
        };
    },
    
    /**
     * A utility method to show node(s)
     *
     * @method _showNodes
     * @param nodeList {nodeList}
     * @protected
     */
    _showNodes : function (nodeList) {
        var host = this._host,
            cb = host.get(CONTENT_BOX);
            
        if (nodeList) {
            nodeList.removeClass(CLASS_HIDDEN).setStyle('display', '');
        }
    },
    
    /**
     * A utility method to hide node(s)
     *
     * @method _hideNodes
     * @param nodeList {nodeList}
     * @protected
     */
    _hideNodes : function (nodeList) {
        var host = this._host;
        
        if (nodeList) {
            nodeList.addClass(CLASS_HIDDEN).setStyle('display', 'none');
        }
    },
    
    /**
     * Enable UI interaction with the widget
     *
     * @method _uiEnable
     * @protected
     */
    _uiEnable: function () {
        var paginator = this,
            host = paginator._host,
            disabled = !paginator._uiEnabled;
        
        if (disabled) {
            paginator._uiEnabled = true;
            host.set(FLICK, paginator._hostOriginalFlick);
            host.set(DRAG, paginator._hostOriginalDrag);   
        }
    },
    
    /**
     * Disable UI interaction with the widget
     *
     * @method _uiDisable
     * @protected
     */
    _uiDisable: function () {
        var paginator = this,
            host = paginator._host;
        
        paginator._uiEnabled = false;
        host.set(FLICK, false);
        host.set(DRAG, false);
    },
    
    /**
     * Gets a nodeList for the "pages"
     *
     * @method _getPageNodes
     * @protected
     * @returns {nodeList}
     */
    _getPageNodes: function() {
        var paginator = this,
            host = paginator._host,
            cb = host.get(CONTENT_BOX),
            pageSelector = paginator.get(SELECTOR),
            pageNodes = pageSelector ? cb.all(pageSelector) : cb.get("children");
        
        return pageNodes;
    },

    /**
     * Scroll to the next page in the scrollview, with animation
     *
     * @method next
     */
    next: function () {
        var paginator = this,
            index = paginator.get(INDEX),
            target = index + 1;
            
        if(paginator._uiEnabled) {
            paginator.set(INDEX, target);
        }
    },

    /**
     * Scroll to the previous page in the scrollview, with animation
     *
     * @method prev
     */
    prev: function () {
        var paginator = this,
            index = paginator.get(INDEX),
            target = index - 1;
            
        if(paginator._uiEnabled) {
            paginator.set(INDEX, target);
        }
    },
    
    /**
     * Scroll to a given page in the scrollview
     *
     * @method scrollTo
     * @param index {Number} The index of the page to scroll to
     * @param duration {Number} The number of ms the animation should last
     * @param easing {String} The timing function to use in the animation
     */
    scrollTo: function (index, duration, easing) {
        var paginator = this,
            host = paginator._host,
            isVert = host._scrollsVertical,
            scrollAxis = (isVert) ? SCROLL_Y : SCROLL_X,
            pageNodes = paginator._getPageNodes(),
            startPoint = isVert ? host._startClientY : host._startClientX,
            endPoint = isVert ? host._endClientY : host._endClientX,
            delta = startPoint - endPoint,
            duration = (duration !== undefined) ? duration : PaginatorPlugin.TRANSITION.duration,
            easing = (easing !== undefined) ? duration : PaginatorPlugin.TRANSITION.easing,
            scrollVal;
        
        // If the delta is 0 (a no-movement mouseclick)
        if (delta === 0) {
            return false;
        }
        
        // Disable the UI while animating
        if (duration > 0) {
            paginator._uiDisable();
        }
        
        // Make sure the target node is visible
        paginator._showNodes(pageNodes.item(index));
        
        // Determine where to scroll to
        scrollVal = pageNodes.item(index).get(isVert ? "offsetTop" : "offsetLeft");

        host.set(scrollAxis, scrollVal, {
            duration: duration,
            easing: easing
        });
    }
});

/**
 * The default snap to current duration and easing values used on scroll end. 
 * 
 * @property SNAP_TO_CURRENT
 * @static
 */
PaginatorPlugin.TRANSITION = {
    duration : 300,
    easing : 'ease-out'
};

Y.namespace('Plugin').ScrollViewPaginator = PaginatorPlugin;


}, '@VERSION@' ,{requires:['plugin']});
