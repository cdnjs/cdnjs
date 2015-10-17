YUI.add('scrollview-paginator', function(Y) {

/**
 * Provides a plugin, which adds pagination support to ScrollView instances
 *
 * @module scrollview-paginator
 */

var UI = (Y.ScrollView) ? Y.ScrollView.UI_SRC : "ui",
    INDEX = "index",
    SCROLL_X = "scrollX",
    SCROLL_Y = "scrollY",
    TOTAL = "total",
    BOUNDING_BOX = "boundingBox",
    CONTENT_BOX = "contentBox";

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
};

Y.extend(PaginatorPlugin, Y.Plugin.Base, {

    /**
     * Designated initializer
     *
     * @method initializer
     */
    initializer: function() {
        var host,
            paginator = this; // kweight

        host = paginator._host = paginator.get('host');

        paginator.beforeHostMethod('_flickFrame', paginator._flickFrame);
        paginator.afterHostMethod('_uiDimensionsChange', paginator._calcOffsets);
        paginator.afterHostEvent('scrollEnd', paginator._scrollEnded);
        paginator.afterHostEvent('render', paginator._afterRender);

        paginator.after('indexChange', paginator._afterIndexChange);
    },

    /**
     * Calculate the page boundary offsets
     * 
     * @method _calcOffsets
     * @protected
     */
    _calcOffsets : function() {
        var host = this._host,
            cb = host.get(CONTENT_BOX),
            bb = host.get(BOUNDING_BOX),
            vert = host._scrollsVertical,
            size = (vert) ? host._scrollHeight : host._scrollWidth,
            pageSelector = this.get("selector"),
            pages,
            offsets;

        // Pre-calculate min/max values for each page
        pages = pageSelector ? cb.all(pageSelector) : cb.get("children");

        this.set(TOTAL, pages.size());

        this._pgOff = offsets = pages.get((vert) ? "offsetTop" : "offsetLeft");
    },

    /**
     * Executed to respond to the flick event, by over-riding the default flickFrame animation. 
     * This is needed to determine if the next or prev page should be activated.
     *
     * @method _flickFrame
     * @protected
     */
    _flickFrame: function() {
        var host = this._host,
            velocity = host._currentVelocity,

            inc = velocity < 0,

            pageIndex = this.get(INDEX),
            pageCount = this.get(TOTAL);

        if (velocity) {

            if (inc && pageIndex < pageCount-1) {
                this.set(INDEX, pageIndex+1);
            } else if (!inc && pageIndex > 0) {
                this.set(INDEX, pageIndex-1);
            }
        }

        return this._prevent;
    },

    /**
     * After host render handler
     *
     * @method _afterRender
     * @protected
     */
    _afterRender: function(e) {
        var host = this._host;
        host.get("boundingBox").addClass(host.getClassName("paged"));
    },

    /**
     * scrollEnd handler detects if a page needs to change
     *
     * @method _scrollEnded
     * @param {Event.Facade}
     * @protected
     */
     _scrollEnded: function(e) {
         var host = this._host,
             pageIndex = this.get(INDEX),
             pageCount = this.get(TOTAL),
             trans = PaginatorPlugin.SNAP_TO_CURRENT;


         if(e.onGestureMoveEnd && !host._flicking) {
             if(host._scrolledHalfway) {
                 if(host._scrolledForward && pageIndex < pageCount-1) {
                     this.set(INDEX, pageIndex+1);
                 } else if (pageIndex > 0) {
                     this.set(INDEX, pageIndex-1);
                 } else {
                     this.snapToCurrent(trans.duration, trans.easing);
                 }
             } else {
                 this.snapToCurrent(trans.duration, trans.easing);
             }
         }

         host._flicking = false;
     },

    /**
     * index attr change handler
     *
     * @method _afterIndexChange
     * @protected
     */
    _afterIndexChange: function(e) {
        if(e.src !== UI) {
            this._uiIndex(e.newVal);
        }
    },
    
    /**
     * Update the UI based on the current page index
     *
     * @method _uiIndex
     * @protected
     */
    _uiIndex: function(index) {
        this.scrollTo(index, 350, 'ease-out');
    },

    /**
     * Scroll to the next page in the scrollview, with animation
     *
     * @method next
     */
    next: function() {
        var index = this.get(INDEX);  
        if(index < this.get(TOTAL)-1) {
            this.set(INDEX, index+1);
        }
    },
    
    /**
     * Scroll to the previous page in the scrollview, with animation
     *
     * @method prev
     */
    prev: function() {
        var index = this.get(INDEX);
        if(index > 0) {
            this.set(INDEX, index-1);
        }
    },
    
    /**
     * Scroll to a given page in the scrollview, with animation.
     *
     * @method scrollTo
     * @param index {Number} The index of the page to scroll to
     * @param duration {Number} The number of ms the animation should last
     * @param easing {String} The timing function to use in the animation
     */
    scrollTo: function(index, duration, easing) {
        var host = this._host,
            vert = host._scrollsVertical,
            scrollAxis = (vert) ? SCROLL_Y : SCROLL_X, 
            scrollVal = this._pgOff[index];

        host.set(scrollAxis, scrollVal, {
            duration: duration,
            easing: easing
        });
    },
    
    /**
     * Snaps the scrollview to the currently selected page
     *
     * @method snapToCurrent
     * @param duration {Number} The number of ms the animation should last
     * @param easing {String} The timing function to use in the animation
     */
    snapToCurrent: function(duration, easing) {
        var host = this._host,
            vert = host._scrollsVertical;

        host._killTimer();

        host.set((vert) ? SCROLL_Y : SCROLL_X, this._pgOff[this.get(INDEX)], {
            duration: duration,
            easing: easing
        });
    },

    _prevent: new Y.Do.Prevent()

});

/**
 * The default snap to current duration and easing values used on scroll end. 
 * 
 * @property SNAP_TO_CURRENT
 * @static
 */
PaginatorPlugin.SNAP_TO_CURRENT = {
    duration : 300,
    easing : 'ease-out'
};

Y.namespace('Plugin').ScrollViewPaginator = PaginatorPlugin;


}, '@VERSION@' ,{requires:['plugin']});
