YUI.add('dd-constrain', function(Y) {


    /**
     * The Drag & Drop Utility allows you to create a draggable interface efficiently, buffering you from browser-level abnormalities and enabling you to focus on the interesting logic surrounding your particular implementation. This component enables you to create a variety of standard draggable objects with just a few lines of code and then, using its extensive API, add your own specific implementation logic.
     * @module dd
     * @submodule dd-constrain
     */
    /**
     * This class extends the dd-drag module to add the constraining methods to it. It supports constraining to a region, node or viewport. It also
     * supports tick based moves and XY axis constraints.
     * @class DragConstrained
     * @extends Drag
     * @constructor
     */

    var DRAG_NODE = 'dragNode',
        OFFSET_HEIGHT = 'offsetHeight',
        OFFSET_WIDTH = 'offsetWidth',
        proto = null,

    C = function() {
        C.superclass.constructor.apply(this, arguments);

    };
    
    C.NAME = 'dragConstrained';

    C.ATTRS = {
        /**
        * @attribute stickX
        * @description Stick the drag movement to the X-Axis. Default: false
        * @type Boolean
        */        
        stickX: {
            value: false
        },
        /**
        * @attribute stickY
        * @description Stick the drag movement to the Y-Axis
        * @type Boolean
        */        
        stickY: {
            value: false
        },
        /**
        * @attribute tickX
        * @description The X tick offset the drag node should snap to on each drag move. False for no ticks. Default: false
        * @type Number/false
        */        
        tickX: {
            value: false
        },
        /**
        * @attribute tickY
        * @description The Y tick offset the drag node should snap to on each drag move. False for no ticks. Default: false
        * @type Number/false
        */        
        tickY: {
            value: false
        },
        /**
        * @attribute tickXArray
        * @description An array of page coordinates to use as X ticks for drag movement.
        * @type Array
        */
        tickXArray: {
            value: false
        },
        /**
        * @attribute tickYArray
        * @description An array of page coordinates to use as Y ticks for drag movement.
        * @type Array
        */
        tickYArray: {
            value: false
        },
        /**
        * @attribute constrain2region
        * @description An Object Literal containing a valid region (top, right, bottom, left) of page positions to constrain the drag node to.
        * @type Object
        */
        constrain2region: {
            value: false,
            getter: function(r) {
                if (Y.Lang.isObject(r)) {
                    var o = {};
                    Y.mix(o, r);
                    return o;
                } else {
                    return false;
                }
            },
            setter: function (r) {
                if (Y.Lang.isObject(r)) {
                    if (Y.Lang.isNumber(r.top) && Y.Lang.isNumber(r.right) && Y.Lang.isNumber(r.left) && Y.Lang.isNumber(r.bottom)) {
                        var o = {};
                        Y.mix(o, r);
                        return o;
                    } else {
                        return false;
                    }
                } else if (r !== false) {
                    return false;
                }
                return r;
            }
        },
        /**
        * @attribute gutter
        * @description CSS style string for the gutter of a region (supports negative values): '5 0' (sets top and bottom to 5px, left and right to 0px), '1 2 3 4' (top 1px, right 2px, bottom 3px, left 4px)        
        * @type String
        */
        gutter: {
            value: '0',
            setter: function(gutter) {
                return Y.DD.DDM.cssSizestoObject(gutter);
            }
        },
        /**
        * @attribute constrain2node
        * @description Will attempt to constrain the drag node to the bounderies of this node.
        * @type Object
        */
        constrain2node: {
            value: false,
            setter: function(n) {
                if (!this.get('constrain2region')) {
                    var node = Y.Node.get(n);
                    if (node) {
                        return node;
                    }
                } else if (this.get('constrain2region') !== false) {
                }
                return false;
            }
        },
        /**
        * @attribute constrain2view
        * @description Will attempt to constrain the drag node to the bounderies of the viewport region.
        * @type Object
        */
        constrain2view: {
            value: false
        }
    };

    proto = {
        start: function() {
            C.superclass.start.apply(this, arguments);
            this._regionCache = null;
        },
        /**
        * @private
        * @property _regionCache
        * @description Store a cache of the region that we are constraining to
        * @type Object
        */
        _regionCache: null,
        /**
        * @private
        * @method _cacheRegion
        * @description Get's the region and caches it, called from window.resize and when the cache is null
        */
        _cacheRegion: function() {
            this._regionCache = this.get('constrain2node').get('region');
        },
        /**
        * @method getRegion
        * @description Get the active region: viewport, node, custom region
        * @param {Boolean} inc Include the node's height and width
        * @return {Object}
        */
        getRegion: function(inc) {
            var r = {}, oh = null, ow = null,
                g = this.get('gutter');

            if (this.get('constrain2node')) {
                if (!this._regionCache) {
                    Y.on('resize', this._cacheRegion, this, true, window);
                    this._cacheRegion();
                }
                r = Y.clone(this._regionCache);
            } else if (this.get('constrain2region')) {
                r = this.get('constrain2region');
            } else if (this.get('constrain2view')) {
                r = this.get('node').get('viewportRegion');
            } else {
                return false;
            }

            Y.each(g, function(i, n) {
                if ((n == 'right') || (n == 'bottom')) {
                    r[n] -= i;
                } else {
                    r[n] += i;
                }
            });
            if (inc) {
                oh = this.get(DRAG_NODE).get(OFFSET_HEIGHT);
                ow = this.get(DRAG_NODE).get(OFFSET_WIDTH);
                r.right = r.right - ow;
                r.bottom = r.bottom - oh;
            }
            return r;
        },
        /**
        * @private
        * @method _checkRegion
        * @description
        * @param {Array} _xy The XY to check if it's in the current region, if it isn't inside the region, it will reset the xy array to be inside the region.
        * @return {Array} The new XY that is inside the region
        */
        _checkRegion: function(_xy) {
            var oxy = _xy,
                r = this.getRegion(),
                oh = this.get(DRAG_NODE).get(OFFSET_HEIGHT),
                ow = this.get(DRAG_NODE).get(OFFSET_WIDTH);
            
                if (oxy[1] > (r.bottom - oh)) {
                    _xy[1] = (r.bottom - oh);
                }
                if (r.top > oxy[1]) {
                    _xy[1] = r.top;

                }
                if (oxy[0] > (r.right - ow)) {
                    _xy[0] = (r.right - ow);
                }
                if (r.left > oxy[0]) {
                    _xy[0] = r.left;
                }

            return _xy;
        },
        /**
        * @method inRegion
        * @description Checks if the XY passed or the dragNode is inside the active region.
        * @param {Array} xy Optional XY to check, if not supplied this.get('dragNode').getXY() is used.
        * @return {Boolean} True if the XY is inside the region, false otherwise.
        */
        inRegion: function(xy) {
            xy = xy || this.get(DRAG_NODE).getXY();

            var _xy = this._checkRegion([xy[0], xy[1]]),
                inside = false;
                if ((xy[0] === _xy[0]) && (xy[1] === _xy[1])) {
                    inside = true;
                }
            return inside;
        },
        /**
        * @private
        * @method _align
        * @description Override of Drag _align to account for region checking and tick checking
        * @param {Array} xy The XY to check for ticks and region
        * @return {Array} The modified XY coords.
        */
        _align: function(xy) {
            var _xy = C.superclass._align.apply(this, arguments),
                r = this.getRegion(true);

            if (this.get('stickX')) {
                _xy[1] = (this.startXY[1] - this.deltaXY[1]);
            }
            if (this.get('stickY')) {
                _xy[0] = (this.startXY[0] - this.deltaXY[0]);
            }


            if (r) {
                _xy = this._checkRegion(_xy);
            }
                
            _xy = this._checkTicks(_xy, r);
            return _xy;
        },
        /**
        * @private
        * @method _calcTicks
        * @description Helper method to calculate the tick offsets for a given position
        * @param {Number} pos The current X or Y position
        * @param {Number} start The start X or Y position
        * @param {Number} tick The X or Y tick increment
        * @param {Number} off1 The min offset that we can't pass (region)
        * @param {Number} off2 The max offset that we can't pass (region)
        * @return {Number} The new position based on the tick calculation
        */
        _calcTicks: function(pos, start, tick, off1, off2) {
            var ix = ((pos - start) / tick),
                min = Math.floor(ix),
                max = Math.ceil(ix);
                if ((min !== 0) || (max !== 0)) {
                    if ((ix >= min) && (ix <= max)) {
                        pos = (start + (tick * min));
                        if (off1 && off2) {
                            if (pos < off1) {
                                pos = (start + (tick * (min + 1)));
                            }
                            if (pos > off2) {
                                pos = (start + (tick * (min - 1)));
                            }
                        }
                    }
                }
                return pos;
        },
        /**
        * @private
        * @method _calcTickArray
        * @description This method is used with the tickXArray and tickYArray config options
        * @param {Number} pos The current X or Y position
        * @param {Number} ticks The array containing our custom tick positions.
        * @param {Number} off1 The min offset that we can't pass (region)
        * @param {Number} off2 The max offset that we can't pass (region)
        * @return The tick position
        */
        _calcTickArray: function(pos, ticks, off1, off2) {
            var i = 0, len = ticks.length, next = 0,
                diff1, diff2, ret;

            if (!ticks || (ticks.length === 0)) {
                return pos;
            } else if (ticks[0] >= pos) {
                return ticks[0];
            } else {
                for (i = 0; i < len; i++) {
                    next = (i + 1);
                    if (ticks[next] && ticks[next] >= pos) {
                        diff1 = pos - ticks[i];
                        diff2 = ticks[next] - pos;
                        ret = (diff2 > diff1) ? ticks[i] : ticks[next];
                        if (off1 && off2) {
                            if (ret > off2) {
                                if (ticks[i]) {
                                    ret = ticks[i];
                                } else {
                                    ret = ticks[len - 1];
                                }
                            }
                        }
                        return ret;
                    }
                    
                }
                return ticks[ticks.length - 1];
            }
        },
        /**
        * @private
        * @method _checkTicks
        * @description This method delegates the proper helper method for tick calculations
        * @param {Array} xy The XY coords for the Drag
        * @param {Object} r The optional region that we are bound to.
        * @return {Array} The calced XY coords
        */
        _checkTicks: function(xy, r) {
            var lx = (this.startXY[0] - this.deltaXY[0]),
                ly = (this.startXY[1] - this.deltaXY[1]),
                xt = this.get('tickX'),
                yt = this.get('tickY');
                if (xt && !this.get('tickXArray')) {
                    xy[0] = this._calcTicks(xy[0], lx, xt, r.left, r.right);
                }
                if (yt && !this.get('tickYArray')) {
                    xy[1] = this._calcTicks(xy[1], ly, yt, r.top, r.bottom);
                }
                if (this.get('tickXArray')) {
                    xy[0] = this._calcTickArray(xy[0], this.get('tickXArray'), r.left, r.right);
                }
                if (this.get('tickYArray')) {
                    xy[1] = this._calcTickArray(xy[1], this.get('tickYArray'), r.top, r.bottom);
                }

            return xy;
        }
    };
    //Extend DD.Drag
    Y.extend(C, Y.DD.Drag, proto);
    //Set this to DD.Drag for other extensions
    Y.DD.Drag = C;





}, '@VERSION@' ,{skinnable:false, requires:['dd-drag'], optional:['dd-proxy']});
