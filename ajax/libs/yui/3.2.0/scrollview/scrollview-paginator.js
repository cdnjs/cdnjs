YUI.add('scrollview-paginator', function(Y) {

/**
 * Provides a plugin, which adds pagination support to ScrollView instances
 *
 * @module scrollview-paginator
 */
 
var BOUNCE_DECELERATION_CONST = 0.5,
    UI = Y.ScrollView.UI_SRC;

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
 * @property ScrollViewPaginator.NAME
 * @type String
 * @default 'paginatorPlugin'
 * @static
 */
PaginatorPlugin.NAME = 'pluginScrollViewPaginator';

/**
 * The namespace on which the plugin will reside
 *
 * @property ScrollViewPaginator.NS
 * @type String
 * @default 'pages'
 * @static
 */
PaginatorPlugin.NS = 'pages';

/**
 * The default attribute configuration for the plugin
 *
 * @property ScrollViewPaginator.ATTRS
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
        var host;

        host = this._host = this.get('host');
        
        this.afterHostMethod('_uiDimensionsChange', this._calculatePageOffsets);
        this.beforeHostMethod('_flickFrame', this._flickFrame);
        this.afterHostEvent('scrollEnd', this._scrollEnded);
        this.afterHostEvent('render', this._afterRender);
        this.after('indexChange', this._afterIndexChange);

        if(host.get('bounce') !== 0) {
            // Change bounce constant to increase friction
            this._originalHostBounce = host.get('bounce'); 
            host.set('bounce', BOUNCE_DECELERATION_CONST);
        }
    },

    /**
     * Destructor removes anything added by the plugin
     *
     * @method destructor
     */
    destructor: function() {
        var host = this._host;

        if(host.get('bounce') !== 0) {
            host.set('bounce', this._originalHostBounce);
        }
    },

    /**
     * Pre-calculate the min/max boundary points when the contentBox changes
     * 
     * @method _calculatePageOffsets
     * @protected
     */    
    _calculatePageOffsets: function() {
        var host = this._host,
            cb = host.get('contentBox'),
            pageSelector = this.get('selector'),
            pages,
            points = [];

        // Pre-calculate min/max values for each page
        pages = pageSelector ? cb.all(pageSelector) : cb.get('children');
        pages.each(function(node, i) {
            points.push(node.get('offsetLeft'));
        }, this);

        points.push(host._scrollWidth - host.get('width'));
        
        this._minPoints = points;

        this.set('total', pages.size());
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

            pageIndex = this.get('index'),
            pageCount = this.get('total');

        if (velocity) {

            if (inc && pageIndex < pageCount-1) {
                this.set('index', pageIndex+1);
            } else if (!inc && pageIndex > 0) {
                this.set('index', pageIndex-1);
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
             pageIndex = this.get('index'),
             pageCount = this.get('total');


         if(e.onGestureMoveEnd && !host._flicking) {
             if(host._scrolledHalfway) {
                 if(host._scrolledForward && pageIndex < pageCount-1) {
                     this.set('index', pageIndex+1);
                 } else if(pageIndex > 0) {
                     this.set('index', pageIndex-1);
                 } else {
                     this.snapToCurrent();
                 }
             } else {
                 this.snapToCurrent();
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
     * @param disableAnim {Boolean} If true, no animation is used
     */
    next: function(disableAnim) {
        var index = this.get('index');  
        if(index < this.get('total')-1) {
            this.set('index', index+1);
        }
    },
    
    /**
     * Scroll to the previous page in the scrollview, with animation
     *
     * @method prev
     * @param disableAnim {Boolean} If true, no animation is used
     */
    prev: function(disableAnim) {
        var index = this.get('index');
        if(index > 0) {
            this.set('index', index-1);
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
            x = host.get('scrollX');

        if(host._scrollsHorizontal) {
            x = this._minPoints[index];

            host.set('scrollX', x, {
                duration: duration,
                easing: easing
            });
        }
    },
    
    /**
     * Snaps the scrollview to the currently selected page
     *
     * @method snapToCurrent
     */
    snapToCurrent: function() {

        this._host._killTimer();


        this._host.set('scrollX', this._minPoints[this.get('index')], {
            duration: 300,
            easing: 'ease-out'
        });
    },
    
    _prevent: new Y.Do.Prevent()
    
});

Y.namespace('Plugin').ScrollViewPaginator = PaginatorPlugin;


}, '@VERSION@' ,{skinnable:true, requires:['plugin']});
