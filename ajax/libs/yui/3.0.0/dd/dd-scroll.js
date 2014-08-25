YUI.add('dd-scroll', function(Y) {


    /**
     * The Drag & Drop Utility allows you to create a draggable interface efficiently, buffering you from browser-level abnormalities and enabling you to focus on the interesting logic surrounding your particular implementation. This component enables you to create a variety of standard draggable objects with just a few lines of code and then, using its extensive API, add your own specific implementation logic.
     * @module dd
     * @submodule dd-scroll
     */
    /**
     * This class is the base scroller class used to create the Plugin.DDNodeScroll and Plugin.DDWinScroll.
     * This class should not be called on it's own, it's designed to be a plugin.
     * @class Scroll
     * @extends Base
     * @namespace DD
     * @constructor
     */

    var S = function() {
        S.superclass.constructor.apply(this, arguments);

    },
    HOST = 'host',
    BUFFER = 'buffer',
    PARENT_SCROLL = 'parentScroll',
    WINDOW_SCROLL = 'windowScroll',
    SCROLL_TOP = 'scrollTop',
    SCROLL_LEFT = 'scrollLeft',
    OFFSET_WIDTH = 'offsetWidth',
    OFFSET_HEIGHT = 'offsetHeight';


    S.ATTRS = {
        /**
        * @attribute parentScroll
        * @description Internal config option to hold the node that we are scrolling. Should not be set by the developer.
        * @type Node
        */
        parentScroll: {
            value: false,
            setter: function(node) {
                if (node) {
                    return node;
                }
                return false;
            }
        },
        /**
        * @attribute buffer
        * @description The number of pixels from the edge of the screen to turn on scrolling. Default: 30
        * @type Number
        */
        buffer: {
            value: 30
        },
        /**
        * @attribute scrollDelay
        * @description The number of milliseconds delay to pass to the auto scroller. Default: 235
        * @type Number
        */
        scrollDelay: {
            value: 235
        },
        /**
        * @attribute host
        * @description The host we are plugged into.
        * @type Object
        */
        host: {
            value: null
        },
        /**
        * @attribute windowScroll
        * @description Turn on window scroll support, default: false
        * @type Boolean
        */
        windowScroll: {
            value: false
        },
        /**
        * @attribute vertical
        * @description Allow vertical scrolling, default: true.
        * @type Boolean
        */
        vertical: {
            value: true
        },
        /**
        * @attribute horizontal
        * @description Allow horizontal scrolling, default: true.
        * @type Boolean
        */
        horizontal: {
            value: true
        }
    };

    Y.extend(S, Y.Base, {
        /**
        * @private
        * @property _scrolling
        * @description Tells if we are actively scrolling or not.
        * @type Boolean
        */
        _scrolling: null,
        /**
        * @private
        * @property _vpRegionCache
        * @description Cache of the Viewport dims.
        * @type Object
        */
        _vpRegionCache: null,
        /**
        * @private
        * @property _dimCache
        * @description Cache of the dragNode dims.
        * @type Object
        */
        _dimCache: null,
        /**
        * @private
        * @property _scrollTimer
        * @description Holder for the Timer object returned from Y.later.
        * @type {Y.later}
        */
        _scrollTimer: null,
        /**
        * @private
        * @method _getVPRegion
        * @description Sets the _vpRegionCache property with an Object containing the dims from the viewport.
        */        
        _getVPRegion: function() {
            var r = {};
            //if (!this._vpRegionCache) {
                var n = this.get(PARENT_SCROLL),
                b = this.get(BUFFER),
                ws = this.get(WINDOW_SCROLL),
                xy = ((ws) ? [] : n.getXY()),
                w = ((ws) ? 'winWidth' : OFFSET_WIDTH),
                h = ((ws) ? 'winHeight' : OFFSET_HEIGHT),
                t = ((ws) ? n.get(SCROLL_TOP) : xy[1]),
                l = ((ws) ? n.get(SCROLL_LEFT) : xy[0]);

                r = {
                    top: t + b,
                    right: (n.get(w) + l) - b,
                    bottom: (n.get(h) + t) - b,
                    left: l + b
                };
                this._vpRegionCache = r;
            //} else {
            //    r = this._vpRegionCache;
            //}
            return r;
        },
        initializer: function() {
            var h = this.get(HOST);
            h.after('drag:start', Y.bind(this.start, this));
            h.after('drag:end', Y.bind(this.end, this));
            h.on('drag:align', Y.bind(this.align, this));

            //TODO - This doesn't work yet??
            Y.get(window).on('scroll', Y.bind(function() {
                this._vpRegionCache = null;
            }, this));
        },
        /**
        * @private
        * @method _checkWinScroll
        * @description Check to see if we need to fire the scroll timer. If scroll timer is running this will scroll the window.
        * @param {Boolean} move Should we move the window. From Y.later
        */        
        _checkWinScroll: function(move) {
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
            
            if (this.get('horizontal')) {
                if (left <= r.left) {
                    scroll = true;
                    nl = xy[0] - ((ws) ? b : 0);
                    sl = sLeft - b;
                }
                if (right >= r.right) {
                    scroll = true;
                    nl = xy[0] + ((ws) ? b : 0);
                    sl = sLeft + b;
                }
            }
            if (this.get('vertical')) {
                if (bottom >= r.bottom) {
                    scroll = true;
                    nt = xy[1] + ((ws) ? b : 0);
                    st = sTop + b;

                }
                if (top <= r.top) {
                    scroll = true;
                    nt = xy[1] - ((ws) ? b : 0);
                    st = sTop - b;
                }
            }

            if (st < 0) {
                st = 0;
                nt = xy[1];
            }

            if (sl < 0) {
                sl = 0;
                nl = xy[0];
            }

            if (nt < 0) {
                nt = xy[1];
            }
            if (nl < 0) {
                nl = xy[0];
            }
            if (move) {
                ho.actXY = [nl, nt];
                ho._moveNode({ node: win, top: st, left: sl});
                if (!st && !sl) {
                    this._cancelScroll();
                }
            } else {
                if (scroll) {
                    this._initScroll();
                } else {
                    this._cancelScroll();
                }
            }
        },
        /**
        * @private
        * @method _initScroll
        * @description Cancel a previous scroll timer and init a new one.
        */        
        _initScroll: function() {
            this._cancelScroll();
            this._scrollTimer = Y.Lang.later(this.get('scrollDelay'), this, this._checkWinScroll, [true], true);

        },
        /**
        * @private
        * @method _cancelScroll
        * @description Cancel a currently running scroll timer.
        */        
        _cancelScroll: function() {
            this._scrolling = false;
            if (this._scrollTimer) {
                this._scrollTimer.cancel();
                delete this._scrollTimer;
            }
        },
        /**
        * @method align
        * @description Called from the drag:align event to determine if we need to scroll.
        */        
        align: function(e) {
            if (this._scrolling) {
                this._cancelScroll();
                e.preventDefault();
            }
            if (!this._scrolling) {
                this._checkWinScroll();
            }
        },
        /**
        * @private
        * @method _setDimCache
        * @description Set the cache of the dragNode dims.
        */        
        _setDimCache: function() {
            var node = this.get(HOST).get('dragNode');
            this._dimCache = {
                h: node.get(OFFSET_HEIGHT),
                w: node.get(OFFSET_WIDTH)
            };
        },
        /**
        * @method start
        * @description Called from the drag:start event
        */
        start: function() {
            this._setDimCache();
        },
        /**
        * @method end
        * @description Called from the drag:end event
        */
        end: function(xy) {
            this._dimCache = null;
            this._cancelScroll();
        },
        /**
        * @method toString
        * @description General toString method for logging
        * @return String name for the object
        */
        toString: function() {
            return S.NAME + ' #' + this.get('node').get('id');
        }
    });

    Y.namespace('Plugin');

    
    /**
     * Extends the Scroll class to make the window scroll while dragging.
     * @class DDWindowScroll
     * @extends DD.Scroll
     * @namespace Plugin
     * @constructor
     */
    var WS = function() {
        WS.superclass.constructor.apply(this, arguments);
    };
    WS.ATTRS = Y.merge(S.ATTRS, {
        /**
        * @attribute windowScroll
        * @description Turn on window scroll support, default: true
        * @type Boolean
        */
        windowScroll: {
            value: true,
            setter: function(scroll) {
                if (scroll) {
                    this.set(PARENT_SCROLL, Y.get(window));
                }
                return scroll;
            }
        }
    });
    Y.extend(WS, S, {
        //Shouldn't have to do this..
        initializer: function() {
            this.set('windowScroll', this.get('windowScroll'));
        }
    });
    WS.NAME = WS.NS = 'winscroll';
    Y.Plugin.DDWinScroll = WS;
    

    /**
     * Extends the Scroll class to make a parent node scroll while dragging.
     * @class DDNodeScroll
     * @extends DD.Scroll
     * @namespace Plugin
     * @constructor
     */
    var NS = function() {
        NS.superclass.constructor.apply(this, arguments);

    };
    NS.ATTRS = Y.merge(S.ATTRS, {
        /**
        * @attribute node
        * @description The node we want to scroll. Used to set the internal parentScroll attribute.
        * @type Node
        */
        node: {
            value: false,
            setter: function(node) {
                var n = Y.get(node);
                if (!n) {
                    if (node !== false) {
                        Y.error('DDNodeScroll: Invalid Node Given: ' + node);
                    }
                } else {
                    n = n.item(0);
                    this.set(PARENT_SCROLL, n);
                }
                return n;
            }
        }
    });
    Y.extend(NS, S, {
        //Shouldn't have to do this..
        initializer: function() {
            this.set('node', this.get('node'));
        }
    });
    NS.NAME = NS.NS = 'nodescroll';
    Y.Plugin.DDNodeScroll = NS;

    Y.DD.Scroll = S;    



}, '@VERSION@' ,{skinnable:false, requires:['dd-drag'], optional:['dd-proxy']});
