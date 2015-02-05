YUI.add('scrollview-paginator', function(Y) {

/**
 * Provides a plugin, which adds pagination support to ScrollView instances
 *
 * @module scrollview-paginator
 */

var UI = (Y.ScrollView) ? Y.ScrollView.UI_SRC : "ui",
    INDEX = "index",
    PREVINDEX = "prevIndex",
    SCROLL_X = "scrollX",
    SCROLL_Y = "scrollY",
    TOTAL = "total",
    BOUNDING_BOX = "boundingBox",
    CONTENT_BOX = "contentBox",
    MAX_PAGE_COUNT = 3; // @TODO: Make configurable?

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
     * The active page number for a paged scrollview
     *
     * @attribute index
     * @type {Number}
     * @default 0
     */
    prevIndex: {
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
    
    optimizeMemory: false,
    _pageOffsets: null,
    _pageNodes: null,
    
    /**
     * Designated initializer
     *
     * @method initializer
     */
    initializer: function(config) { 
        var paginator = this,
            optimizeMemory = config.optimizeMemory || optimizeMemory;
        
        paginator._host = paginator.get('host');
        paginator.beforeHostMethod('_flickFrame', paginator._flickFrame);
        paginator.afterHostMethod('_uiDimensionsChange', paginator._calcOffsets);
        paginator.afterHostEvent('scrollEnd', paginator._scrollEnded);
        paginator.afterHostEvent('render', paginator._afterRender);
        paginator.after('indexChange', paginator._afterIndexChange);
        paginator.optimizeMemory = optimizeMemory;
        paginator._pageNodes = new Y.NodeList();
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
             optimizeMemory = this.optimizeMemory,
             currentIndex = this.get(INDEX),
             pages,
             offsets,
             node;
         
         pages = pageSelector ? cb.all(pageSelector) : cb.get("children");
         this._pageNodes = pages;
         
         //Set the total # of pages
         this.set(TOTAL, pages.size());

         // Determine the offsets
         this._pageOffsets = pages.get((vert) ? "offsetTop" : "offsetLeft");

         if (optimizeMemory) {
             
             this.set(PREVINDEX, currentIndex);

             // Reduce the scroll width to the size of (3) pages (or whatever MAX_PAGE_COUNT is)
             host._maxScrollX = this._pageOffsets[MAX_PAGE_COUNT-1];

             // Empty the content-box. @TODO: leave {MAX_PAGE_COUNT} items in?
             cb.empty(true);

             // Now, fill it with the first set of items
             for (var i=0; i < MAX_PAGE_COUNT; i++) {
                 node = pages.item(currentIndex + i);
                 cb.append(node);
             }
         }
     },
    /**
     * Return the offset value where scrollview should scroll to.
     * Neccesary because index # doesn't nessecarily map up to location in the DOM because of this._manageDOM()
     *
     * @method _getTargetOffset
     * @param index {Number}
     * @returns {Number}
     * @protected
     */

    _getTargetOffset: function(index) {
        var previous = this.get(PREVINDEX),
            current = this.get(INDEX),
            total = this.get(TOTAL),
            forward = (previous < current) ? true : false,
            pageOffsets = this._pageOffsets,
            optimizeMemory = this.optimizeMemory,
            offset, currentPageLocation;
        
        // @todo: Clean this up.  Probably do current (currentOffset - previousoffset) instead of assuming they're all the same width
        if (optimizeMemory) {
            if (forward) {
                if (index > 1) {
                    currentPageLocation = 2;
                }
                else {
                    currentPageLocation = 1;
                }
            }
            else {
                if (current == (total-2)) {
                    currentPageLocation = 1;
                }
                else {
                    currentPageLocation = 0;
                }
            }   
        }
        else {
            currentPageLocation = index;
        }
        
        offset = pageOffsets[currentPageLocation]
        return offset;
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
                this.next();
            } else if (!inc && pageIndex > 0) {
                this.prev();
            }
        }

        return this._prevent;
    },
    
    /**
     * After host render handler
     *
     * @method _afterRender
     * @param {Event.Facade}
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
             trans = PaginatorPlugin.SNAP_TO_CURRENT,
             optimizeMemory = this.optimizeMemory;
             
         if(e.onGestureMoveEnd && !host._flicking) {
             if(host._scrolledHalfway) {
                 if(host._scrolledForward && pageIndex < pageCount-1) {
                     this.next();
                 } else if (pageIndex > 0) {
                     this.prev();
                 } else {
                     this.snapToCurrent(trans.duration, trans.easing);
                 }
             } else {
                 this.snapToCurrent(trans.duration, trans.easing);
             }
         }
         
         if (!e.onGestureMoveEnd){
             if (optimizeMemory) {
              this._manageDOM();
             }
             
            this.set(PREVINDEX, pageIndex);
         }
     },
     
     /**
      * Manages adding & removing slides from the DOM, to improve performance & memory usage
      *
      * @since 3.5.0
      * @method _manageDOM
      * @protected
      */
     _manageDOM: function(){
         var newSlide, addSlideMethod, nodeToRemove, 
             host = this._host,
             cb = host.get(CONTENT_BOX),
             currentIndex = this.get(INDEX),
             previousIndex = this.get(PREVINDEX),
             total = this.get(TOTAL),
             isForward = (previousIndex < currentIndex) ? true : false,
             cbChildren = cb.get('children'),
             pageNodes = this._pageNodes,
             targetOffset;
            
         if (pageNodes && pageNodes.size() > 0) {
              if (isForward) {
                  newSlide = pageNodes.item(currentIndex+1);
                  addSlideMethod = cb.append;
              }
              else {
                  newSlide = pageNodes.item(currentIndex-1);
                  addSlideMethod = cb.prepend;
              }

              // Append/Prepend the new item to the DOM
              if (cbChildren.indexOf(newSlide) === -1) {
                  addSlideMethod.call(cb, newSlide);
              }

             // Since we modified the DOM, get an updated reference
             cbChildren = cb.get('children');
         }
         
         // Are we over the max number of items allowed?
         if (cbChildren.size() > MAX_PAGE_COUNT) {
             nodeToRemove = (isForward) ? cb.one('li:first-of-type') : cb.one('li:last-of-type');
             nodeToRemove.remove();
             targetOffset = (currentIndex == total ? 2 : 1);
             host.set('scrollX', this._pageOffsets[targetOffset]); // Center
         }
     },

    /**
     * index attr change handler
     *
     * @method _afterIndexChange
     * @param {Event.Facade}
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
     * @param index {Number}
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
            scrollVal = this._getTargetOffset(index);

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
        
        host.set((vert) ? SCROLL_Y : SCROLL_X, this._getTargetOffset(this.get(INDEX)), {
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
