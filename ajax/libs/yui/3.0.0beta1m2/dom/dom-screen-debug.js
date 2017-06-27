YUI.add('dom-screen', function(Y) {


/**
 * Adds position and region management functionality to DOM.
 * @module dom
 * @submodule dom-screen
 * @for DOM
 */

var OFFSET_TOP = 'offsetTop',

    DOCUMENT_ELEMENT = 'documentElement',
    COMPAT_MODE = 'compatMode',
    OFFSET_LEFT = 'offsetLeft',
    OFFSET_PARENT = 'offsetParent',
    POSITION = 'position',
    FIXED = 'fixed',
    RELATIVE = 'relative',
    LEFT = 'left',
    TOP = 'top',
    SCROLL_LEFT = 'scrollLeft',
    SCROLL_TOP = 'scrollTop',
    _BACK_COMPAT = 'BackCompat',
    MEDIUM = 'medium',
    HEIGHT = 'height',
    WIDTH = 'width',
    BORDER_LEFT_WIDTH = 'borderLeftWidth',
    BORDER_TOP_WIDTH = 'borderTopWidth',
    GET_BOUNDING_CLIENT_RECT = 'getBoundingClientRect',
    GET_COMPUTED_STYLE = 'getComputedStyle',

    // TODO: how about thead/tbody/tfoot/tr?
    // TODO: does caption matter?
    RE_TABLE = /^t(?:able|d|h)$/i;

Y.mix(Y.DOM, {
    /**
     * Returns the inner height of the viewport (exludes scrollbar). 
     * @method winHeight

     */
    winHeight: function(node) {
        var h = Y.DOM._getWinSize(node)[HEIGHT];
        Y.log('winHeight returning ' + h, 'info', 'DOM');
        return h;
    },

    /**
     * Returns the inner width of the viewport (exludes scrollbar). 
     * @method winWidth

     */
    winWidth: function(node) {
        var w = Y.DOM._getWinSize(node)[WIDTH];
        Y.log('winWidth returning ' + w, 'info', 'DOM');
        return w;
    },

    /**
     * Document height 
     * @method docHeight

     */
    docHeight:  function(node) {
        var h = Y.DOM._getDocSize(node)[HEIGHT];
        Y.log('docHeight returning ' + h, 'info', 'DOM');
        return Math.max(h, Y.DOM._getWinSize(node)[HEIGHT]);
    },

    /**
     * Document width 
     * @method docWidth
     */
    docWidth:  function(node) {
        var w = Y.DOM._getDocSize(node)[WIDTH];
        Y.log('docWidth returning ' + w, 'info', 'DOM');
        return Math.max(w, Y.DOM._getWinSize(node)[WIDTH]);
    },

    /**
     * Amount page has been scroll vertically 
     * @method docScrollX
     */
    docScrollX: function(node) {
        var doc = Y.DOM._getDoc(node);
        return Math.max(doc[DOCUMENT_ELEMENT][SCROLL_LEFT], doc.body[SCROLL_LEFT]);
    },

    /**
     * Amount page has been scroll horizontally 
     * @method docScrollY
     */
    docScrollY:  function(node) {
        var doc = Y.DOM._getDoc(node);
        return Math.max(doc[DOCUMENT_ELEMENT][SCROLL_TOP], doc.body[SCROLL_TOP]);
    },

    /**
     * Gets the current position of an element based on page coordinates. 
     * Element must be part of the DOM tree to have page coordinates
     * (display:none or elements not appended return false).
     * @method getXY
     * @param element The target element
     * @return {Array} The XY position of the element

     TODO: test inDocument/display
     */
    getXY: function() {
        if (document[DOCUMENT_ELEMENT][GET_BOUNDING_CLIENT_RECT]) {
            return function(node) {
                if (!node) {
                    return false;
                }
                var scrollLeft = Y.DOM.docScrollX(node),
                    scrollTop = Y.DOM.docScrollY(node),
                    box = node[GET_BOUNDING_CLIENT_RECT](),
                    doc = Y.DOM._getDoc(node),
                    //Round the numbers so we get sane data back
                    xy = [Math.floor(box[LEFT]), Math.floor(box[TOP])];

                    if (Y.UA.ie) {
                        var off1 = 2, off2 = 2,
                        mode = doc[COMPAT_MODE],
                        bLeft = Y.DOM[GET_COMPUTED_STYLE](doc[DOCUMENT_ELEMENT], BORDER_LEFT_WIDTH),
                        bTop = Y.DOM[GET_COMPUTED_STYLE](doc[DOCUMENT_ELEMENT], BORDER_TOP_WIDTH);

                        if (Y.UA.ie === 6) {
                            if (mode !== _BACK_COMPAT) {
                                off1 = 0;
                                off2 = 0;
                            }
                        }
                        
                        if ((mode == _BACK_COMPAT)) {
                            if (bLeft !== MEDIUM) {
                                off1 = parseInt(bLeft, 10);
                            }
                            if (bTop !== MEDIUM) {
                                off2 = parseInt(bTop, 10);
                            }
                        }
                        
                        xy[0] -= off1;
                        xy[1] -= off2;

                    }

                if ((scrollTop || scrollLeft)) {
                    xy[0] += scrollLeft;
                    xy[1] += scrollTop;
                }

                // gecko may return sub-pixel (non-int) values
                xy[0] = Math.floor(xy[0]);
                xy[1] = Math.floor(xy[1]);

                return xy;                   
            };
        } else {
            return function(node) { // manually calculate by crawling up offsetParents
                //Calculate the Top and Left border sizes (assumes pixels)
                var xy = [node[OFFSET_LEFT], node[OFFSET_TOP]],
                    parentNode = node,
                    // TODO: refactor with !! or just falsey
                    bCheck = ((Y.UA.gecko || Y.UA.webkit > 519) ? true : false);

                // TODO: worth refactoring for TOP/LEFT only?
                while ((parentNode = parentNode[OFFSET_PARENT])) {
                    xy[0] += parentNode[OFFSET_LEFT];
                    xy[1] += parentNode[OFFSET_TOP];
                    if (bCheck) {
                        xy = Y.DOM._calcBorders(parentNode, xy);
                    }
                }

                // account for any scrolled ancestors
                if (Y.DOM.getStyle(node, POSITION) != FIXED) {
                    parentNode = node;
                    var scrollTop, scrollLeft;

                    while ((parentNode = parentNode.parentNode)) {
                        scrollTop = parentNode[SCROLL_TOP];
                        scrollLeft = parentNode[SCROLL_LEFT];

                        //Firefox does something funky with borders when overflow is not visible.
                        if (Y.UA.gecko && (Y.DOM.getStyle(parentNode, 'overflow') !== 'visible')) {
                                xy = Y.DOM._calcBorders(parentNode, xy);
                        }
                        

                        if (scrollTop || scrollLeft) {
                            xy[0] -= scrollLeft;
                            xy[1] -= scrollTop;
                        }
                    }
                    xy[0] += Y.DOM.docScrollX(node);
                    xy[1] += Y.DOM.docScrollY(node);

                } else {
                    //Fix FIXED position -- add scrollbars
                    if (Y.UA.opera) {
                        xy[0] -= Y.DOM.docScrollX(node);
                        xy[1] -= Y.DOM.docScrollY(node);
                    } else if (Y.UA.webkit || Y.UA.gecko) {
                        xy[0] += Y.DOM.docScrollX(node);
                        xy[1] += Y.DOM.docScrollY(node);
                    }
                }
                //Round the numbers so we get sane data back
                xy[0] = Math.floor(xy[0]);
                xy[1] = Math.floor(xy[1]);

                return xy;                
            };
        }
    }(),// NOTE: Executing for loadtime branching

    /**
     * Gets the current X position of an element based on page coordinates. 
     * Element must be part of the DOM tree to have page coordinates
     * (display:none or elements not appended return false).
     * @method getX
     * @param element The target element
     * @return {Int} The X position of the element
     */

    getX: function(node) {
        return Y.DOM.getXY(node)[0];
    },

    /**
     * Gets the current Y position of an element based on page coordinates. 
     * Element must be part of the DOM tree to have page coordinates
     * (display:none or elements not appended return false).
     * @method getY
     * @param element The target element
     * @return {Int} The Y position of the element
     */

    getY: function(node) {
        return Y.DOM.getXY(node)[1];
    },

    /**
     * Set the position of an html element in page coordinates.
     * The element must be part of the DOM tree to have page coordinates (display:none or elements not appended return false).
     * @method setXY
     * @param element The target element
     * @param {Array} xy Contains X & Y values for new position (coordinates are page-based)
     * @param {Boolean} noRetry By default we try and set the position a second time if the first fails
     */
    setXY: function(node, xy, noRetry) {
        var pos = Y.DOM.getStyle(node, POSITION),
            setStyle = Y.DOM.setStyle,

            delta = [ // assuming pixels; if not we will have to retry
                parseInt( Y.DOM[GET_COMPUTED_STYLE](node, LEFT), 10 ),
                parseInt( Y.DOM[GET_COMPUTED_STYLE](node, TOP), 10 )
            ];
    
        if (pos == 'static') { // default to relative
            pos = RELATIVE;
            setStyle(node, POSITION, pos);
        }

        var currentXY = Y.DOM.getXY(node);

        if (currentXY === false) { // has to be part of doc to have xy
            Y.log('xy failed: node not available', 'error', 'Node');
            return false; 
        }
        
        if ( isNaN(delta[0]) ) {// in case of 'auto'
            delta[0] = (pos == RELATIVE) ? 0 : node[OFFSET_LEFT];
        } 
        if ( isNaN(delta[1]) ) { // in case of 'auto'
            delta[1] = (pos == RELATIVE) ? 0 : node[OFFSET_TOP];
        } 

        if (xy[0] !== null) {
            setStyle(node, LEFT, xy[0] - currentXY[0] + delta[0] + 'px');
        }

        if (xy[1] !== null) {
            setStyle(node, TOP, xy[1] - currentXY[1] + delta[1] + 'px');
        }
      
        if (!noRetry) {
            var newXY = Y.DOM.getXY(node);

            // if retry is true, try one more time if we miss 
           if ( (xy[0] !== null && newXY[0] != xy[0]) || 
                (xy[1] !== null && newXY[1] != xy[1]) ) {
               Y.DOM.setXY(node, xy, true);
           }
        }        

        Y.log('setXY setting position to ' + xy, 'info', 'Node');
    },

    /**
     * Set the X position of an html element in page coordinates, regardless of how the element is positioned.
     * The element(s) must be part of the DOM tree to have page coordinates (display:none or elements not appended return false).
     * @method setX
     * @param element The target element
     * @param {Int} x The X values for new position (coordinates are page-based)
     */
    setX: function(node, x) {
        return Y.DOM.setXY(node, [x, null]);
    },

    /**
     * Set the Y position of an html element in page coordinates, regardless of how the element is positioned.
     * The element(s) must be part of the DOM tree to have page coordinates (display:none or elements not appended return false).
     * @method setY
     * @param element The target element
     * @param {Int} y The Y values for new position (coordinates are page-based)
     */
    setY: function(node, y) {
        return Y.DOM.setXY(node, [null, y]);
    },

    _calcBorders: function(node, xy2) {
        var t = parseInt(Y.DOM[GET_COMPUTED_STYLE](node, BORDER_TOP_WIDTH), 10) || 0,
            l = parseInt(Y.DOM[GET_COMPUTED_STYLE](node, BORDER_LEFT_WIDTH), 10) || 0;
        if (Y.UA.gecko) {
            if (RE_TABLE.test(node.tagName)) {
                t = 0;
                l = 0;
            }
        }
        xy2[0] += l;
        xy2[1] += t;
        return xy2;
    },

    _getWinSize: function(node) {
        var doc = Y.DOM._getDoc(),
            win = doc.defaultView || doc.parentWindow,
            mode = doc[COMPAT_MODE],
            h = win.innerHeight,
            w = win.innerWidth,
            root = doc[DOCUMENT_ELEMENT];

        if ( mode && !Y.UA.opera ) { // IE, Gecko
            if (mode != 'CSS1Compat') { // Quirks
                root = doc.body; 
            }
            h = root.clientHeight;
            w = root.clientWidth;
        }
        return { height: h, width: w }; 
    },

    _getDocSize: function(node) {
        var doc = Y.DOM._getDoc(),
            root = doc[DOCUMENT_ELEMENT];

        if (doc[COMPAT_MODE] != 'CSS1Compat') {
            root = doc.body;
        }

        return { height: root.scrollHeight, width: root.scrollWidth };
    }
});
/**
 * Adds position and region management functionality to DOM.
 * @module dom
 * @submodule dom-screen
 * @for DOM
 */

var OFFSET_WIDTH = 'offsetWidth',
    OFFSET_HEIGHT = 'offsetHeight',
    TOP = 'top',
    RIGHT = 'right',
    BOTTOM = 'bottom',
    LEFT = 'left',
    TAG_NAME = 'tagName';

var getOffsets = function(r1, r2) {
    var t = Math.max(r1[TOP], r2[TOP]),
        r = Math.min(r1[RIGHT], r2[RIGHT]),
        b = Math.min(r1[BOTTOM], r2[BOTTOM]),
        l = Math.max(r1[LEFT], r2[LEFT]),
        ret = {};
    
    ret[TOP] = t;
    ret[RIGHT] = r;
    ret[BOTTOM] = b;
    ret[LEFT] = l;
    return ret;
};

var DOM = DOM || Y.DOM;
Y.mix(DOM, {
    /**
     * Returns an Object literal containing the following about this element: (top, right, bottom, left)
     * @method region
     * @param {HTMLElement} element The DOM element. 
     @return {Object} Object literal containing the following about this element: (top, right, bottom, left)
     */
    region: function(node) {
        var x = DOM.getXY(node),
            ret = false;
        
        if (x) {
            ret = {
                '0': x[0],
                '1': x[1],
                top: x[1],
                right: x[0] + node[OFFSET_WIDTH],
                bottom: x[1] + node[OFFSET_HEIGHT],
                left: x[0],
                height: node[OFFSET_HEIGHT],
                width: node[OFFSET_WIDTH]
            };
        }

        return ret;
    },

    /**
     * Find the intersect information for the passes nodes.
     * @method intersect
     * @param {HTMLElement} element The first element 
     * @param {HTMLElement | Object} element2 The element or region to check the interect with
     * @param {Object} altRegion An object literal containing the region for the first element if we already have the data (for performance i.e. DragDrop)
     @return {Object} Object literal containing the following intersection data: (top, right, bottom, left, area, yoff, xoff, inRegion)
     */
    intersect: function(node, node2, altRegion) {
        var r = altRegion || DOM.region(node), region = {};

        var n = node2;
        if (n[TAG_NAME]) {
            region = DOM.region(n);
        } else if (Y.Lang.isObject(node2)) {
            region = node2;
        } else {
            return false;
        }
        
        var off = getOffsets(region, r);
        return {
            top: off[TOP],
            right: off[RIGHT],
            bottom: off[BOTTOM],
            left: off[LEFT],
            area: ((off[BOTTOM] - off[TOP]) * (off[RIGHT] - off[LEFT])),
            yoff: ((off[BOTTOM] - off[TOP])),
            xoff: (off[RIGHT] - off[LEFT]),
            inRegion: DOM.inRegion(node, node2, false, altRegion)
        };
        
    },
    /**
     * Check if any part of this node is in the passed region
     * @method inRegion
     * @param {Object} node2 The node to get the region from or an Object literal of the region
     * $param {Boolean} all Should all of the node be inside the region
     * @param {Object} altRegion An object literal containing the region for this node if we already have the data (for performance i.e. DragDrop)
     * @return {Boolean} True if in region, false if not.
     */
    inRegion: function(node, node2, all, altRegion) {
        var region = {},
            r = altRegion || DOM.region(node);

        var n = node2;
        if (n[TAG_NAME]) {
            region = DOM.region(n);
        } else if (Y.Lang.isObject(node2)) {
            region = node2;
        } else {
            return false;
        }
            
        if (all) {
            return (
                r[LEFT]   >= region[LEFT]   &&
                r[RIGHT]  <= region[RIGHT]  && 
                r[TOP]    >= region[TOP]    && 
                r[BOTTOM] <= region[BOTTOM]  );
        } else {
            var off = getOffsets(region, r);
            if (off[BOTTOM] >= off[TOP] && off[RIGHT] >= off[LEFT]) {
                return true;
            } else {
                return false;
            }
            
        }
    },

    /**
     * Check if any part of this element is in the viewport
     * @method inViewportRegion
     * @param {HTMLElement} element The DOM element. 
     * @param {Boolean} all Should all of the node be inside the region
     * @param {Object} altRegion An object literal containing the region for this node if we already have the data (for performance i.e. DragDrop)
     * @return {Boolean} True if in region, false if not.
     */
    inViewportRegion: function(node, all, altRegion) {
        return DOM.inRegion(node, DOM.viewportRegion(node), all, altRegion);
            
    },

    /**
     * Returns an Object literal containing the following about the visible region of viewport: (top, right, bottom, left)
     * @method viewportRegion
     @return {Object} Object literal containing the following about the visible region of the viewport: (top, right, bottom, left)
     */
    viewportRegion: function(node) {
        node = node || Y.config.doc.documentElement;
        var r = {};
        r[TOP] = DOM.docScrollY(node);
        r[RIGHT] = DOM.winWidth(node) + DOM.docScrollX(node);
        r[BOTTOM] = (DOM.docScrollY(node) + DOM.winHeight(node));
        r[LEFT] = DOM.docScrollX(node);

        return r;
    }
});


}, '@VERSION@' ,{requires:['dom-base', 'dom-style'], skinnable:false});
