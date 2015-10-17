YUI.add('dd-ddm-base', function(Y) {

    /**
     * Provides the base Drag Drop Manger required for making a Node draggable.
     * @module dd
     * @submodule dd-ddm-base
     */     
     /**
     * Provides the base Drag Drop Manger required for making a Node draggable.
     * @class DDM
     * @extends Base
     * @constructor
     */
    
    var DDMBase = function() {
        //debugger;
        DDMBase.superclass.constructor.apply(this, arguments);
    };

    DDMBase.NAME = 'dragDropMgr';

    DDMBase.ATTRS = {
        /**
        * @attribute clickPixelThresh
        * @description The number of pixels to move to start a drag operation, default is 3.
        * @type Number
        */
        clickPixelThresh: {
            value: 3
        },
        /**
        * @attribute clickTimeThresh
        * @description The number of milliseconds a mousedown has to pass to start a drag operation, default is 1000.
        * @type Number
        */        
        clickTimeThresh: {
            value: 1000
        },
        /**
        * @attribute dragMode
        * @description This attribute only works if the dd-drop module is active. It will set the dragMode (point, intersect, strict) of all future Drag instances. 
        * @type String
        */        
        dragMode: {
            value: 'point',
            set: function(mode) {
                this._setDragMode(mode);
            }           
        }

    };

    Y.extend(DDMBase, Y.Base, {
        /**
        * @private
        * @method _setDragMode
        * @description Handler for dragMode attribute setter.
        * @param String/Number The Number value or the String for the DragMode to default all future drag instances to.
        * @return Number The Mode to be set
        */
        _setDragMode: function(mode) {
            if (mode === null) {
                mode = Y.DD.DDM.get('dragMode');
            }
            switch (mode) {
                case 1:
                case 'intersect':
                    return 1;
                case 2:
                case 'strict':
                    return 2;
                case 0:
                case 'point':
                    return 0;
            }
            return 0;       
        },
        /**
        * @property CSS_PREFIX
        * @description The PREFIX to attach to all DD CSS class names
        * @type {String}
        */
        CSS_PREFIX: 'yui-dd',
        _activateTargets: function() {},        
        /**
        * @private
        * @property _drags
        * @description Holder for all registered drag elements.
        * @type {Array}
        */
        _drags: [],
        /**
        * @property activeDrag
        * @description A reference to the currently active draggable object.
        * @type {Drag}
        */
        activeDrag: false,
        /**
        * @private
        * @method _regDrag
        * @description Adds a reference to the drag object to the DDM._drags array, called in the constructor of Drag.
        * @param {Drag} d The Drag object
        */
        _regDrag: function(d) {
            this._drags[this._drags.length] = d;
        },
        /**
        * @private
        * @method _unregDrag
        * @description Remove this drag object from the DDM._drags array.
        * @param {Drag} d The drag object.
        */
        _unregDrag: function(d) {
            var tmp = [];
            Y.each(this._drags, function(n, i) {
                if (n !== d) {
                    tmp[tmp.length] = n;
                }
            });
            this._drags = tmp;
        },
        /**
        * @private
        * @method _init
        * @description DDM's init method
        */
        initializer: function() {
            Y.Node.get('document').on('mousemove', this._move, this, true);
            Y.Node.get('document').on('mouseup', this._end, this, true);
        },
        /**
        * @private
        * @method _start
        * @description Internal method used by Drag to signal the start of a drag operation
        * @param {Number} x The x position of the drag element
        * @param {Number} y The y position of the drag element
        * @param {Number} w The width of the drag element
        * @param {Number} h The height of the drag element
        */
        _start: function(x, y, w, h) {
            this._startDrag.apply(this, arguments);
        },
        /**
        * @private
        * @method _startDrag
        * @description Factory method to be overwritten by other DDM's
        * @param {Number} x The x position of the drag element
        * @param {Number} y The y position of the drag element
        * @param {Number} w The width of the drag element
        * @param {Number} h The height of the drag element
        */
        _startDrag: function() {},
        /**
        * @private
        * @method _endDrag
        * @description Factory method to be overwritten by other DDM's
        */
        _endDrag: function() {},
        _dropMove: function() {},
        /**
        * @private
        * @method _end
        * @description Internal method used by Drag to signal the end of a drag operation
        */
        _end: function() {
            //@TODO - Here we can get a (click - drag - click - release) interaction instead of a (mousedown - drag - mouseup - release) interaction
            //Add as a config option??
            if (this.activeDrag) {
                this._endDrag();
                this.activeDrag.end.call(this.activeDrag);
                this.activeDrag = null;
            }
        },
        /**
        * @method stopDrag
        * @description Method will forcefully stop a drag operation. For example calling this from inside an ESC keypress handler will stop this drag.
        * @return {Self}
        * @chainable
        */       
        stopDrag: function() {
            if (this.activeDrag) {
                this._end();
            }
            return this;
        },
        /**
        * @private
        * @method _move
        * @description Internal listener for the mousemove DOM event to pass to the Drag's move method.
        * @param {Event} ev The Dom mousemove Event
        */
        _move: function(ev) {
            if (this.activeDrag) {
                this.activeDrag._move.apply(this.activeDrag, arguments);
                this._dropMove();
            }
        },
        /**
        * @method setXY
        * @description A simple method to set the top and left position from offsets instead of page coordinates
        * @param {Object} node The node to set the position of 
        * @param {Array} xy The Array of left/top position to be set.
        */
        setXY: function(node, xy) {
            var t = parseInt(node.getStyle('top'), 10),
            l = parseInt(node.getStyle('left'), 10),
            pos = node.getStyle('position');

            if (pos === 'static') {
                node.setStyle('position', 'relative');
            }

            // in case of 'auto'
            if (isNaN(t)) { t = 0; }
            if (isNaN(l)) { l = 0; }
            
            node.setStyle('top', (xy[1] + t) + 'px');
            node.setStyle('left', (xy[0] + l) + 'px');
            
        },
        /**
        * //TODO Private, rename??...
        * @private
        * @method cssSizestoObject
        * @description Helper method to use to set the gutter from the attribute setter.
        * @param {String} gutter CSS style string for gutter: '5 0' (sets top and bottom to 5px, left and right to 0px), '1 2 3 4' (top 1px, right 2px, bottom 3px, left 4px)
        * @return {Object} The gutter Object Literal.
        */
        cssSizestoObject: function(gutter) {
            var x = gutter.split(' ');
                
            switch (x.length) {
                case 1: x[1] = x[2] = x[3] = x[0]; break;
                case 2: x[2] = x[0]; x[3] = x[1]; break;
                case 3: x[3] = x[1]; break;
            }

            return {
                top   : parseInt(x[0],10),
                right : parseInt(x[1],10),
                bottom: parseInt(x[2],10),
                left  : parseInt(x[3],10)
            };
        },
        /**
        * @method getDrag
        * @description Get a valid Drag instance back from a Node or a selector string, false otherwise
        * @param {String/Object} node The Node instance or Selector string to check for a valid Drag Object
        * @return {Object}
        */
        getDrag: function(node) {
            var drag = false,
                n = Y.Node.get(node);
            if (n instanceof Y.Node) {
                Y.each(this._drags, function(v, k) {
                    if (n.compareTo(v.get('node'))) {
                        drag = v;
                    }
                });
            }
            return drag;
        }
    });

    Y.namespace('DD');
    Y.DD.DDM = new DDMBase();



}, '@VERSION@' ,{requires:['node', 'base'], skinnable:false});
YUI.add('dd-ddm', function(Y) {

    /**
     * Extends the dd-ddm-base Class to add support for the viewport shim to allow a draggable node to drag to be dragged over an iframe or any other node that traps mousemove events.
     * It is also required to have Drop Targets enabled, as the viewport shim will contain the shims for the Drop Targets.
     * @module dd
     * @submodule dd-ddm
     * @for DDM
     */
    Y.mix(Y.DD.DDM, {
        /**
        * @private
        * @property _pg
        * @description The shim placed over the screen to track the mousemove event.
        * @type {Node}
        */
        _pg: null,
        /**
        * @private
        * @property _debugShim
        * @description Set this to true to set the shims opacity to .5 for debugging it, default: false.
        * @type {Boolean}
        */
        _debugShim: false,
        _activateTargets: function() {},
        _deactivateTargets: function() {},
        _startDrag: function() {
            if (this.activeDrag.get('useShim')) {
                this._pg_activate();
                this._activateTargets();
            }
        },
        _endDrag: function() {
            this._pg_deactivate();
            this._deactivateTargets();
        },
        /**
        * @private
        * @method _pg_deactivate
        * @description Deactivates the shim
        */
        _pg_deactivate: function() {
            this._pg.setStyle('display', 'none');
        },
        /**
        * @private
        * @method _pg_activate
        * @description Activates the shim
        */
        _pg_activate: function() {
            this._pg_size();
            this._pg.setStyles({
                top: 0,
                left: 0,
                display: 'block',
                opacity: ((this._debugShim) ? '.5' : '0')
            });
        },
        /**
        * @private
        * @method _pg_size
        * @description Sizes the shim on: activatation, window:scroll, window:resize
        */
        _pg_size: function() {
            if (this.activeDrag) {
                var b = Y.Node.get('body'),
                h = b.get('docHeight'),
                w = b.get('docWidth');
                this._pg.setStyles({
                    height: h + 'px',
                    width: w + 'px'
                });
            }
        },
        /**
        * @private
        * @method _createPG
        * @description Creates the shim and adds it's listeners to it.
        */
        _createPG: function() {
            //var pg = Y.Node.create(['div']),
            var pg = Y.Node.create('<div></div>'),
            bd = Y.Node.get('body');
            pg.setStyles({
                top: '0',
                left: '0',
                position: 'absolute',
                zIndex: '9999',
                overflow: 'hidden',
                //opacity: '0',
                backgroundColor: 'red',
                display: 'none',
                height: '5px',
                width: '5px'
            });
            if (bd.get('firstChild')) {
                bd.insertBefore(pg, bd.get('firstChild'));
            } else {
                bd.appendChild(pg);
            }
            this._pg = pg;
            this._pg.on('mouseup', this._end, this, true);
            this._pg.on('mousemove', this._move, this, true);
            
            
            Y.on('resize', this._pg_size, window, this, true);
            Y.on('scroll', this._pg_size, window, this, true);
        }   
    }, true);

    Y.DD.DDM._createPG();    



}, '@VERSION@' ,{requires:['dd-ddm-base'], skinnable:false});
YUI.add('dd-ddm-drop', function(Y) {

    /**
     * Extends the dd-ddm Class to add support for the placement of Drop Target shims inside the viewport shim. It also handles all Drop Target related events and interactions.
     * @module dd
     * @submodule dd-ddm-drop
     * @for DDM
     */

    //TODO CSS class name for the bestMatch..
    Y.mix(Y.DD.DDM, {
        /**
        * @private
        * @property _noShim
        * @description This flag turns off the use of the mouseover/mouseout shim. It should not be used unless you know what you are doing.
        * @type {Boolean}
        */
        _noShim: false,
        /**
        * @private
        * @property _activeShims
        * @description Placeholder for all active shims on the page
        * @type {Array}
        */
        _activeShims: [],
        /**
        * @private
        * @method _hasActiveShim
        * @description This method checks the _activeShims Object to see if there is a shim active.
        * @return {Boolean}
        */
        _hasActiveShim: function() {
            if (this._noShim) {
                return true;
            }
            return this._activeShims.length;
        },
        /**
        * @private
        * @method _addActiveShim 
        * @description Adds a Drop Target to the list of active shims
        * @param {Object} d The Drop instance to add to the list.
        */
        _addActiveShim: function(d) {
            this._activeShims[this._activeShims.length] = d;
        },
        /**
        * @private
        * @method _removeActiveShim 
        * @description Removes a Drop Target to the list of active shims
        * @param {Object} d The Drop instance to remove from the list.
        */
        _removeActiveShim: function(d) {
            var s = [];
            Y.each(this._activeShims, function(v, k) {
                if (v._yuid !== d._yuid) {
                    s[s.length] = v;
                }
                
            });
            this._activeShims = s;
        },
        /**
        * @method syncActiveShims
        * @description This method will sync the position of the shims on the Drop Targets that are currently active.
        * @param {Boolean} force Resize/sync all Targets.
        * @return {Array} drops The list of Drop Targets that was just synced.
        */
        syncActiveShims: function(force) {
            var drops = ((force) ? this.targets : this._lookup());
            Y.each(drops, function(v, k) {
                v.sizeShim.call(v);
            }, this);

            return drops;
        },
        /**
        * @private
        * @property mode
        * @description The mode that the drag operations will run in 0 for Point, 1 for Intersect, 2 for Strict
        * @type Number
        */
        mode: 0,
        /**
        * @private
        * @property POINT
        * @description In point mode, a Drop is targeted by the cursor being over the Target
        * @type Number
        */
        POINT: 0,
        /**
        * @private
        * @property INTERSECT
        * @description In intersect mode, a Drop is targeted by "part" of the drag node being over the Target
        * @type Number
        */
        INTERSECT: 1,
        /**
        * @private
        * @property STRICT
        * @description In strict mode, a Drop is targeted by the "entire" drag node being over the Target
        * @type Number
        */
        STRICT: 2,
        /**
        * @property useHash
        * @description Should we only check targets that are in the viewport on drags (for performance), default: true
        * @type {Boolean}
        */
        useHash: true,
        /**
        * @property activeDrop
        * @description A reference to the active Drop Target
        * @type {Object}
        */
        activeDrop: null,
        /**
        * @property validDrops
        * @description An array of the valid Drop Targets for this interaction.
        * @type {Array}
        */
        //TODO Change array/object literals to be in sync..
        validDrops: [],
        /**
        * @property otherDrops
        * @description An object literal of Other Drop Targets that we encountered during this interaction (in the case of overlapping Drop Targets)
        * @type {Object}
        */
        otherDrops: {},
        /**
        * @property targets
        * @description All of the Targets
        * @type {Array}
        */
        targets: [],
        /**
        * @private 
        * @method _addValid
        * @description Add a Drop Target to the list of Valid Targets. This list get's regenerated on each new drag operation.
        * @param {Object} drop
        * @return {Self}
        * @chainable
        */
        _addValid: function(drop) {
            this.validDrops[this.validDrops.length] = drop;
            return this;
        },
        /**
        * @private 
        * @method _removeValid
        * @description Removes a Drop Target from the list of Valid Targets. This list get's regenerated on each new drag operation.
        * @param {Object} drop
        * @return {Self}
        * @chainable
        */
        _removeValid: function(drop) {
            var drops = [];
            Y.each(this.validDrops, function(v, k) {
                if (v !== drop) {
                    drops[drops.length] = v
                }
            });

            this.validDrops = drops;
            return this;
        },
        /**
        * @method isOverTarget
        * @description Check to see if the Drag element is over the target, method varies on current mode
        * @param {Object} drop The drop to check against
        * @return {Boolean}
        */
        isOverTarget: function(drop) {
            //if (Y.Lang.isObject(this.activeDrag) && drop) { //TODO, check this check..
            if (this.activeDrag && drop) {
                var xy = this.activeDrag.mouseXY;
                if (xy) {
                    if (this.activeDrag.get('dragMode') == this.STRICT) {
                        return this.activeDrag.get('dragNode').inRegion(drop.region, true, this.activeDrag.region);
                    } else {
                        if (drop && drop.shim) {
                            return drop.shim.intersect({
                                top: xy[1],
                                bottom: xy[1],
                                left: xy[0], 
                                right: xy[0]
                            }, drop.region).inRegion;
                        } else {
                            return false;
                        }
                    }
                } else {
                    return false;
                }
            } else {
                return false;
            }
        },
        /**
        * @method clearCache
        * @description Clears the cache data used for this interaction.
        */
        clearCache: function() {
            this.validDrops = [];
            this.otherDrops = {};
            this._activeShims = [];
        },
        /**
        * @private
        * @method _activateTargets
        * @description Clear the cache and activate the shims of all the targets
        */
        _activateTargets: function() {
            this.clearCache();
            Y.each(this.targets, function(v, k) {
                v._activateShim.apply(v, []);
            }, this);
            this._handleTargetOver();
            
        },
        /**
        * @method getBestMatch
        * @description This method will gather the area for all potential targets and see which has the hightest covered area and return it.
        * @param {Array} drops An Array of drops to scan for the best match.
        * @param {Boolean} all If present, it returns an Array. First item is best match, second is an Array of the other items in the original Array.
        * @return {Object or Array} 
        */
        getBestMatch: function(drops, all) {
            var biggest = null, area = 0;

            Y.each(drops, function(v, k) {
                var inter = this.activeDrag.get('dragNode').intersect(v.get('node'));
                v.region.area = inter.area;

                if (inter.inRegion) {
                    if (inter.area > area) {
                        area = inter.area;
                        biggest = v;
                    }
                }
            }, this);
            if (all) {
                var out = [];
                //TODO Sort the others in numeric order by area covered..
                Y.each(drops, function(v, k) {
                    if (v !== biggest) {
                        out[out.length] = v;
                    }
                }, this);
                return [biggest, out];
            } else {
                return biggest;
            }
        },
        /**
        * @private
        * @method _deactivateTargets
        * @description This method fires the drop:hit, drag:drophit, drag:dropmiss methods and deactivates the shims..
        */
        _deactivateTargets: function() {
            var other = [],
                activeDrag = this.activeDrag,
                activeDrop = this.activeDrop;
            
            //TODO why is this check so hard??
            if (activeDrag && activeDrop && this.otherDrops[activeDrop]) {
                if (!activeDrag.get('dragMode')) {
                    //TODO otherDrops -- private..
                    other = this.otherDrops;
                    delete other[activeDrop];
                } else {
                    var tmp = this.getBestMatch(this.otherDrops, true);
                    activeDrop = tmp[0];
                    other = tmp[1];
                }
                activeDrag.get('node').removeClass(this.CSS_PREFIX + '-drag-over')
                if (activeDrop) {
                    activeDrop.fire('drop:hit', { drag: activeDrag, drop: activeDrop, others: other });
                    activeDrag.fire('drag:drophit', { drag: activeDrag,  drop: activeDrop, others: other });
                }
            } else if (activeDrag) {
                activeDrag.get('node').removeClass(this.CSS_PREFIX + '-drag-over')
                activeDrag.fire('drag:dropmiss', { pageX: activeDrag.lastXY[0], pageY: activeDrag.lastXY[1] });
            } else {
            }
            
            this.activeDrop = null;

            Y.each(this.targets, function(v, k) {
                v._deactivateShim.apply(v, []);
            }, this);
        },
        /**
        * @private
        * @method _dropMove
        * @description This method is called when the move method is called on the Drag Object.
        */
        _dropMove: function() {
            if (this._hasActiveShim()) {
                this._handleTargetOver();
            } else {
                Y.each(this.otherDrops, function(v, k) {
                    v._handleOut.apply(v, []);
                });
            }
        },
        /**
        * @private
        * @method _lookup
        * @description Filters the list of Drops down to those in the viewport.
        * @return {Array} The valid Drop Targets that are in the viewport.
        */
        _lookup: function() {
            if (!this.useHash) {
                return this.validDrops;
            }
            var drops = [];
            //Only scan drop shims that are in the Viewport
            Y.each(this.validDrops, function(v, k) {
                if (v.shim && v.shim.inViewportRegion(false, v.region)) {
                    drops[drops.length] = v;
                }
            });
            return drops;
                
        },
        /**
        * @private
        * @method _handleTargetOver
        * @description This method execs _handleTargetOver on all valid Drop Targets
        * @param {Boolean} force Force it to run the first time.
        */
        _handleTargetOver: function() {
            var drops = this._lookup();
            Y.each(drops, function(v, k) {
                v._handleTargetOver.call(v);
            }, this);
        },
        /**
        * @private
        * @method _regTarget
        * @description Add the passed in Target to the targets collection
        * @param {Object} t The Target to add to the targets collection
        */
        _regTarget: function(t) {
            this.targets[this.targets.length] = t;
        },
        /**
        * @private
        * @method _unregTarget
        * @description Remove the passed in Target from the targets collection
        * @param {Object} drop The Target to remove from the targets collection
        */
        _unregTarget: function(drop) {
            var targets = [];
            Y.each(this.targets, function(v, k) {
                if (v != drop) {
                    targets[targets.length] = v;
                }
            }, this);
            this.targets = targets;

            var vdrops = [];
            Y.each(this.validDrops, function(v, k) {
                if (v !== drop) {
                    vdrops[vdrops.length] = v
                }
            });

            this.validDrops = vdrops;
        },
        /**
        * @method getDrop
        * @description Get a valid Drop instance back from a Node or a selector string, false otherwise
        * @param {String/Object} node The Node instance or Selector string to check for a valid Drop Object
        * @return {Object}
        */
        getDrop: function(node) {
            var drop = false,
                n = Y.Node.get(node);
            if (n instanceof Y.Node) {
                Y.each(this.targets, function(v, k) {
                    if (n.compareTo(v.get('node'))) {
                        drop = v;
                    }
                });
            }
            return drop;
        }
    }, true);
    




}, '@VERSION@' ,{requires:['dd-ddm'], skinnable:false});
YUI.add('dd-drag', function(Y) {

    /**
     * The Drag & Drop Utility allows you to create a draggable interface efficiently, buffering you from browser-level abnormalities and enabling you to focus on the interesting logic surrounding your particular implementation. This component enables you to create a variety of standard draggable objects with just a few lines of code and then, using its extensive API, add your own specific implementation logic.
     * @module dd
     * @submodule dd-drag
     */     
    /**
     * This class provides the ability to drag a Node.
     * @class Drag
     * @extends Base
     * @constructor
     */

    var DDM = Y.DD.DDM,
        NODE = 'node',
        DRAG_NODE = 'dragNode',
        OFFSET_HEIGHT = 'offsetHeight',
        OFFSET_WIDTH = 'offsetWidth',        
        MOUSE_UP = 'mouseup',
        MOUSE_DOWN = 'mousedown',
        DRAG_START = 'dragstart',
        /**
        * @event drag:mouseDown
        * @description Handles the mousedown DOM event, checks to see if you have a valid handle then starts the drag timers.
        * @preventable _handleMouseDown
        * @param {Event} ev The mousedown event.
        * @bubbles DDM
        * @type Event.Custom
        */
        EV_MOUSE_DOWN = 'drag:mouseDown',
        /**
        * @event drag:afterMouseDown
        * @description Fires after the mousedown event has been cleared.
        * @param {Event} ev The mousedown event.
        * @bubbles DDM
        * @type Event.Custom
        */
        EV_AFTER_MOUSE_DOWN = 'drag:afterMouseDown',
        /**
        * @event drag:removeHandle
        * @description Fires after a handle is removed.
        * @bubbles DDM
        * @type Event.Custom
        */
        EV_REMOVE_HANDLE = 'drag:removeHandle',
        /**
        * @event drag:addHandle
        * @description Fires after a handle is added.
        * @bubbles DDM
        * @type Event.Custom
        */
        EV_ADD_HANDLE = 'drag:addHandle',
        /**
        * @event drag:removeInvalid
        * @description Fires after an invalid selector is removed.
        * @bubbles DDM
        * @type Event.Custom
        */
        EV_REMOVE_INVALID = 'drag:removeInvalid',
        /**
        * @event drag:addInvalid
        * @description Fires after an invalid selector is added.
        * @bubbles DDM
        * @type Event.Custom
        */
        EV_ADD_INVALID = 'drag:addInvalid',
        /**
        * @event drag:start
        * @description Fires at the start of a drag operation.
        * @bubbles DDM
        * @type Event.Custom
        */
        EV_START = 'drag:start',
        /**
        * @event drag:end
        * @description Fires at the end of a drag operation.
        * @bubbles DDM
        * @type Event.Custom
        */
        EV_END = 'drag:end',
        /**
        * @event drag:drag
        * @description Fires every mousemove during a drag operation.
        * @bubbles DDM
        * @type Event.Custom
        */
        EV_DRAG = 'drag:drag';


        /**
        * @event drag:over
        * @description Fires when this node is over a Drop Target. (Fired from dd-drop)
        * @bubbles DDM
        * @type Event.Custom
        */
        /**
        * @event drag:enter
        * @description Fires when this node enters a Drop Target. (Fired from dd-drop)
        * @bubbles DDM
        * @type Event.Custom
        */
        /**
        * @event drag:exit
        * @description Fires when this node exits a Drop Target. (Fired from dd-drop)
        * @bubbles DDM
        * @type Event.Custom
        */
        /**
        * @event drag:drophit
        * @description Fires when this node is dropped on a valid Drop Target. (Fired from dd-ddm-drop)
        * @bubbles DDM
        * @type Event.Custom
        */
        /**
        * @event drag:dropmiss
        * @description Fires when this node is dropped on an invalid Drop Target. (Fired from dd-ddm-drop)
        * @bubbles DDM
        * @type Event.Custom
        */
    
    var Drag = function() {
        Drag.superclass.constructor.apply(this, arguments);

        DDM._regDrag(this);
    };

    Drag.NAME = 'drag';

    Drag.ATTRS = {
        /**
        * @attribute node
        * @description Y.Node instanace to use as the element to initiate a drag operation
        * @type Node
        */
        node: {
            set: function(node) {
                var n = Y.get(node);
                if (!n) {
                    Y.fail('DD.Drag: Invalid Node Given: ' + node);
                } else {
                    n = n.item(0);
                }
                return n;
            }
        },
        /**
        * @attribute dragNode
        * @description Y.Node instanace to use as the draggable element, defaults to node
        * @type Node
        */
        dragNode: {
            set: function(node) {
                var n = Y.Node.get(node);
                if (!n) {
                    Y.fail('DD.Drag: Invalid dragNode Given: ' + node);
                }
                return n;
            }
        },
        /**
        * @attribute offsetNode
        * @description Offset the drag element by the difference in cursor position: default true
        * @type Boolean
        */
        offsetNode: {
            value: true
        },
        /**
        * @attribute clickPixelThresh
        * @description The number of pixels to move to start a drag operation, default is 3.
        * @type Number
        */
        clickPixelThresh: {
            value: DDM.get('clickPixelThresh')
        },
        /**
        * @attribute clickTimeThresh
        * @description The number of milliseconds a mousedown has to pass to start a drag operation, default is 1000.
        * @type Number
        */
        clickTimeThresh: {
            value: DDM.get('clickTimeThresh')
        },
        /**
        * @attribute lock
        * @description Set to lock this drag element so that it can't be dragged: default false.
        * @type Boolean
        */
        lock: {
            value: false,
            set: function(lock) {
                if (lock) {
                    this.get(NODE).addClass(DDM.CSS_PREFIX + '-locked');
                } else {
                    this.get(NODE).removeClass(DDM.CSS_PREFIX + '-locked');
                }
            }
        },
        /**
        * @attribute data
        * @description A payload holder to store arbitrary data about this drag object, can be used to store any value.
        * @type Mixed
        */
        data: {
            value: false
        },
        /**
        * @attribute move
        * @description If this is false, the drag element will not move with the cursor: default true. Can be used to "resize" the element.
        * @type Boolean
        */
        move: {
            value: true
        },
        /**
        * @attribute useShim
        * @description Use the protective shim on all drag operations: default true. Only works with dd-ddm, not dd-ddm-base.
        * @type Boolean
        */
        useShim: {
            value: true
        },
        /**
        * @attribute activeHandle
        * @description This config option is set by Drag to inform you of which handle fired the drag event (in the case that there are several handles): default false.
        * @type Node
        */
        activeHandle: {
            value: false
        },
        /**
        * @attribute primaryButtonOnly
        * @description By default a drag operation will only begin if the mousedown occurred with the primary mouse button. Setting this to false will allow for all mousedown events to trigger a drag.
        * @type Boolean
        */
        primaryButtonOnly: {
            value: true
        },
        /**
        * @attribute dragging
        * @description This attribute is not meant to be used by the implementor, it is meant to be used as an Event tracker so you can listen for it to change.
        * @type Boolean
        */
        dragging: {
            value: false
        },
        parent: {
            value: false
        },
        /**
        * @attribute target
        * @description This attribute only works if the dd-drop module has been loaded. It will make this node a drop target as well as draggable.
        * @type Boolean
        */
        target: {
            value: false,
            set: function(config) {
                this._handleTarget(config);
            }
        },
        /**
        * @attribute dragMode
        * @description This attribute only works if the dd-drop module is active. It will set the dragMode (point, intersect, strict) of this Drag instance.
        * @type String
        */
        dragMode: {
            value: null,
            set: function(mode) {
                return DDM._setDragMode(mode);
            }
        },
        /**
        * @attribute groups
        * @description Array of groups to add this drag into.
        * @type Array
        */
        groups: {
            value: ['default'],
            get: function() {
                if (!this._groups) {
                    this._groups = {};
                }
                var ret = [];
                Y.each(this._groups, function(v, k) {
                    ret[ret.length] = k;
                });
                return ret;
            },
            set: function(g) {
                this._groups = {};
                Y.each(g, function(v, k) {
                    this._groups[v] = true;
                }, this);
            }
        },
        /**
        * @attribute handles
        * @description Array of valid handles to add. Adding something here will set all handles, even if previously added with addHandle
        * @type Array
        */
        handles: {
            value: null,
            set: function(g) {
                if (g) {
                    this._handles = {};
                    Y.each(g, function(v, k) {
                        this._handles[v] = true;
                    }, this);
                } else {
                    this._handles = null;
                }
                return g;
            }
        },
        /**
        * @attribute bubbles
        * @description Controls the default bubble parent for this Drag instance. Default: Y.DD.DDM. Set to false to disable bubbling.
        * @type Object
        */
        bubbles: {
            writeOnce: true,
            value: Y.DD.DDM
        }
    };

    Y.extend(Drag, Y.Base, {
        /**
        * @method addToGroup
        * @description Add this Drag instance to a group, this should be used for on-the-fly group additions.
        * @param {String} g The group to add this Drag Instance to.
        * @return {Self}
        * @chainable
        */
        addToGroup: function(g) {
            this._groups[g] = true;
            DDM._activateTargets();
            return this;
        },
        /**
        * @method removeFromGroup
        * @description Remove this Drag instance from a group, this should be used for on-the-fly group removals.
        * @param {String} g The group to remove this Drag Instance from.
        * @return {Self}
        * @chainable
        */
        removeFromGroup: function(g) {
            delete this._groups[g];
            DDM._activateTargets();
            return this;
        },
        /**
        * @property target
        * @description This will be a reference to the Drop instance associated with this drag if the target: true config attribute is set..
        * @type {Object}
        */
        target: null,
        /**
        * @private
        * @method _handleTarget
        * @description Attribute handler for the target config attribute.
        * @param {Boolean/Object}
        * @return {Boolean/Object}
        */
        _handleTarget: function(config) {
            if (Y.DD.Drop) {
                if (config === false) {
                    if (this.target) {
                        DDM._unregTarget(this.target);
                        this.target = null;
                    }
                    return false;
                } else {
                    if (!Y.Lang.isObject(config)) {
                        config = {};
                    }
                    config.bubbles = this.get('bubbles');
                    config.node = this.get(NODE);
                    this.target = new Y.DD.Drop(config);
                }
            } else {
                return false;
            }
        },
        /**
        * @private
        * @property _groups
        * @description Storage Array for the groups this drag belongs to.
        * @type {Array}
        */
        _groups: null,
        /**
        * @private
        * @method _createEvents
        * @description This method creates all the events for this Event Target and publishes them so we get Event Bubbling.
        */
        _createEvents: function() {
            
            this.publish(EV_MOUSE_DOWN, {
                defaultFn: this._handleMouseDown,
                queuable: true,
                emitFacade: true,
                bubbles: true
            });
            
            var ev = [
                EV_AFTER_MOUSE_DOWN,
                EV_REMOVE_HANDLE,
                EV_ADD_HANDLE,
                EV_REMOVE_INVALID,
                EV_ADD_INVALID,
                EV_START,
                EV_END,
                EV_DRAG,
                'drag:drophit',
                'drag:dropmiss',
                'drag:over',
                'drag:enter',
                'drag:exit'
            ];
            
            Y.each(ev, function(v, k) {
                this.publish(v, {
                    type: v,
                    emitFacade: true,
                    bubbles: true,
                    preventable: false,
                    queuable: true
                });
            }, this);

            if (this.get('bubbles')) {
                this.addTarget(this.get('bubbles'));
            }
            
           
        },
        /**
        * @private
        * @property _ev_md
        * @description A private reference to the mousedown DOM event
        * @type {Event}
        */
        _ev_md: null,
        /**
        * @private
        * @property _startTime
        * @description The getTime of the mousedown event. Not used, just here in case someone wants/needs to use it.
        * @type Date
        */
        _startTime: null,
        /**
        * @private
        * @property _endTime
        * @description The getTime of the mouseup event. Not used, just here in case someone wants/needs to use it.
        * @type Date
        */
        _endTime: null,
        /**
        * @private
        * @property _handles
        * @description A private hash of the valid drag handles
        * @type {Object}
        */
        _handles: null,
        /**
        * @private
        * @property _invalids
        * @description A private hash of the invalid selector strings
        * @type {Object}
        */
        _invalids: null,
        /**
        * @private
        * @property _invalidsDefault
        * @description A private hash of the default invalid selector strings: {'textarea': true, 'input': true, 'a': true, 'button': true}
        * @type {Object}
        */
        _invalidsDefault: {'textarea': true, 'input': true, 'a': true, 'button': true},
        /**
        * @private
        * @property _dragThreshMet
        * @description Private flag to see if the drag threshhold was met
        * @type {Boolean}
        */
        _dragThreshMet: null,
        /**
        * @private
        * @property _fromTimeout
        * @description Flag to determine if the drag operation came from a timeout
        * @type {Boolean}
        */
        _fromTimeout: null,
        /**
        * @private
        * @property _clickTimeout
        * @description Holder for the setTimeout call
        * @type {Boolean}
        */
        _clickTimeout: null,
        /**
        * @property deltaXY
        * @description The offset of the mouse position to the element's position
        * @type {Array}
        */
        deltaXY: null,
        /**
        * @property startXY
        * @description The initial mouse position
        * @type {Array}
        */
        startXY: null,
        /**
        * @property nodeXY
        * @description The initial element position
        * @type {Array}
        */
        nodeXY: null,
        /**
        * @property lastXY
        * @description The position of the element as it's moving (for offset calculations)
        * @type {Array}
        */
        lastXY: null,
        realXY: null,
        /**
        * @property mouseXY
        * @description The XY coords of the mousemove
        * @type {Array}
        */
        mouseXY: null,
        /**
        * @property region
        * @description A region object associated with this drag, used for checking regions while dragging.
        * @type Object
        */
        region: null,       
        /**
        * @private
        * @method _handleMouseUp
        * @description Handler for the mouseup DOM event
        * @param {Event}
        */
        _handleMouseUp: function(ev) {
            this._fixIEMouseUp();
            if (DDM.activeDrag) {
                DDM._end();
            }
        },
        /** 
        * @private
        * @method _fixDragStart
        * @description The function we use as the ondragstart handler when we start a drag in Internet Explorer. This keeps IE from blowing up on images as drag handles.
        */
        _fixDragStart: function(e) {
            e.preventDefault();
        },
        /** 
        * @private
        * @method _ieSelectFix
        * @description The function we use as the onselectstart handler when we start a drag in Internet Explorer
        */
        _ieSelectFix: function() {
            return false;
        },
        /** 
        * @private
        * @property _ieSelectBack
        * @description We will hold a copy of the current "onselectstart" method on this property, and reset it after we are done using it.
        */
        _ieSelectBack: null,
        /**
        * @private
        * @method _fixIEMouseDown
        * @description This method copies the onselectstart listner on the document to the _ieSelectFix property
        */
        _fixIEMouseDown: function() {
            if (Y.UA.ie) {
                this._ieSelectBack = Y.config.doc.body.onselectstart;
                Y.config.doc.body.onselectstart = this._ieSelectFix;
            }           
        },
        /**
        * @private
        * @method _fixIEMouseUp
        * @description This method copies the _ieSelectFix property back to the onselectstart listner on the document.
        */
        _fixIEMouseUp: function() {
            if (Y.UA.ie) {
                Y.config.doc.body.onselectstart = this._ieSelectBack;
            }           
        },
        /**
        * @private
        * @method _handleMouseDownEvent
        * @description Handler for the mousedown DOM event
        * @param {Event}
        */
        _handleMouseDownEvent: function(ev) {
            this.fire(EV_MOUSE_DOWN, { ev: ev });
        },
        /**
        * @private
        * @method _handleMouseDown
        * @description Handler for the mousedown DOM event
        * @param {Event}
        */
        _handleMouseDown: function(e) {
            var ev = e.ev;
            this._dragThreshMet = false;
            this._ev_md = ev;
            
            if (this.get('primaryButtonOnly') && ev.button > 1) {
                return false;
            }
            if (this.validClick(ev)) {
                this._fixIEMouseDown();
                ev.halt();
                this._setStartPosition([ev.pageX, ev.pageY]);

                DDM.activeDrag = this;

                var self = this;
                this._clickTimeout = setTimeout(function() {
                    self._timeoutCheck.call(self);
                }, this.get('clickTimeThresh'));
            }
            this.fire(EV_AFTER_MOUSE_DOWN, { ev: ev });
        },
        /**
        * @method validClick
        * @description Method first checks to see if we have handles, if so it validates the click against the handle. Then if it finds a valid handle, it checks it against the invalid handles list. Returns true if a good handle was used, false otherwise.
        * @param {Event}
        * @return {Boolean}
        */
        validClick: function(ev) {
            var r = false,
            tar = ev.target,
            hTest = null;
            if (this._handles) {
                Y.each(this._handles, function(i, n) {
                    if (Y.Lang.isString(n)) {
                        //Am I this or am I inside this
                        if (tar.test(n + ', ' + n + ' *') && !hTest) {
                            hTest = n;
                            r = true;
                        }
                    }
                });
            } else {
                if (this.get(NODE).contains(tar) || this.get(NODE).compareTo(tar)) {
                    r = true;
                }
            }
            if (r) {
                if (this._invalids) {
                    Y.each(this._invalids, function(i, n) {
                        if (Y.Lang.isString(n)) {
                            //Am I this or am I inside this
                            if (tar.test(n + ', ' + n + ' *')) {
                                r = false;
                            }
                        }
                    });
                }
            }
            if (r) {
                if (hTest) {
                    var els = ev.currentTarget.queryAll(hTest),
                        set = false;
                    els.each(function(n, i) {
                        if ((n.contains(tar) || n.compareTo(tar)) && !set) {
                            set = true;
                            this.set('activeHandle', els.item(i));
                        }
                    }, this);
                } else {
                    this.set('activeHandle', this.get(NODE));
                }
            }
            return r;
        },
        /**
        * @private
        * @method _setStartPosition
        * @description Sets the current position of the Element and calculates the offset
        * @param {Array} xy The XY coords to set the position to.
        */
        _setStartPosition: function(xy) {
            this.startXY = xy;
            
            this.nodeXY = this.get(NODE).getXY();
            this.lastXY = this.nodeXY;
            this.realXY = this.nodeXY;

            if (this.get('offsetNode')) {
                this.deltaXY = [(this.startXY[0] - this.nodeXY[0]), (this.startXY[1] - this.nodeXY[1])];
            } else {
                this.deltaXY = [0, 0];
            }
        },
        /**
        * @private
        * @method _timeoutCheck
        * @description The method passed to setTimeout to determine if the clickTimeThreshold was met.
        */
        _timeoutCheck: function() {
            if (!this.get('lock')) {
                this._fromTimeout = true;
                this._dragThreshMet = true;
                this.start();
                this._moveNode([this._ev_md.pageX, this._ev_md.pageY], true);
            }
        },
        /**
        * @method removeHandle
        * @description Remove a Selector added by addHandle
        * @param {String} str The selector for the handle to be removed. 
        * @return {Self}
        * @chainable
        */
        removeHandle: function(str) {
            if (this._handles[str]) {
                delete this._handles[str];
                this.fire(EV_REMOVE_HANDLE, { handle: str });
            }
            return this;
        },
        /**
        * @method addHandle
        * @description Add a handle to a drag element. Drag only initiates when a mousedown happens on this element.
        * @param {String} str The selector to test for a valid handle. Must be a child of the element.
        * @return {Self}
        * @chainable
        */
        addHandle: function(str) {
            if (!this._handles) {
                this._handles = {};
            }
            if (Y.Lang.isString(str)) {
                this._handles[str] = true;
                this.fire(EV_ADD_HANDLE, { handle: str });
            }
            return this;
        },
        /**
        * @method removeInvalid
        * @description Remove an invalid handle added by addInvalid
        * @param {String} str The invalid handle to remove from the internal list.
        * @return {Self}
        * @chainable
        */
        removeInvalid: function(str) {
            if (this._invalids[str]) {
                this._invalids[str] = null;
                delete this._invalids[str];
                this.fire(EV_REMOVE_INVALID, { handle: str });
            }
            return this;
        },
        /**
        * @method addInvalid
        * @description Add a selector string to test the handle against. If the test passes the drag operation will not continue.
        * @param {String} str The selector to test against to determine if this is an invalid drag handle.
        * @return {Self}
        * @chainable
        */
        addInvalid: function(str) {
            if (Y.Lang.isString(str)) {
                this._invalids[str] = true;
                this.fire(EV_ADD_INVALID, { handle: str });
            } else {
            }
            return this;
        },
        /**
        * @private
        * @method initializer
        * @description Internal init handler
        */
        initializer: function() {
            //TODO give the node instance a copy of this object
            //Not supported in PR1 due to Y.Node.get calling a new under the hood.
            //this.get(NODE).dd = this;

            if (!this.get(NODE).get('id')) {
                var id = Y.stamp(this.get(NODE));
                this.get(NODE).set('id', id);
            }
            

            this._invalids = Y.clone(this._invalidsDefault, true);

            this._createEvents();
            
            if (!this.get(DRAG_NODE)) {
                this.set(DRAG_NODE, this.get(NODE));
            }
            this._prep();
            this._dragThreshMet = false;
        },
        /**
        * @private
        * @method _prep
        * @description Attach event listners and add classname
        */
        _prep: function() {
            var node = this.get(NODE);
            node.addClass(DDM.CSS_PREFIX + '-draggable');
            node.on(MOUSE_DOWN, this._handleMouseDownEvent, this, true);
            node.on(MOUSE_UP, this._handleMouseUp, this, true);
            node.on(DRAG_START, this._fixDragStart, this, true);
        },
        /**
        * @private
        * @method _unprep
        * @description Detach event listners and remove classname
        */
        _unprep: function() {
            var node = this.get(NODE);
            node.removeClass(DDM.CSS_PREFIX + '-draggable');
            node.detach(MOUSE_DOWN, this._handleMouseDownEvent, this, true);
            node.detach(MOUSE_UP, this._handleMouseUp, this, true);
            node.detach(DRAG_START, this._fixDragStart, this, true);
        },
        /**
        * @method start
        * @description Starts the drag operation
        * @return {Self}
        * @chainable
        */
        start: function() {
            if (!this.get('lock') && !this.get('dragging')) {
                this.set('dragging', true);
                DDM._start(this.deltaXY, [this.get(NODE).get(OFFSET_HEIGHT), this.get(NODE).get(OFFSET_WIDTH)]);
                this.get(NODE).addClass(DDM.CSS_PREFIX + '-dragging');
                this.fire(EV_START, { pageX: this.nodeXY[0], pageY: this.nodeXY[1] });
                this.get(DRAG_NODE).on(MOUSE_UP, this._handleMouseUp, this, true);
                var xy = this.nodeXY;

                this._startTime = (new Date()).getTime();
                
                this.region = {
                    '0': xy[0], 
                    '1': xy[1],
                    area: 0,
                    top: xy[1],
                    right: xy[0] + this.get(NODE).get(OFFSET_WIDTH),
                    bottom: xy[1] + this.get(NODE).get(OFFSET_HEIGHT),
                    left: xy[0]
                };
                
            }
            return this;
        },
        /**
        * @method end
        * @description Ends the drag operation
        * @return {Self}
        * @chainable
        */
        end: function() {
            this._endTime = (new Date()).getTime();
            clearTimeout(this._clickTimeout);
            this._dragThreshMet = false;
            this._fromTimeout = false;
            if (!this.get('lock') && this.get('dragging')) {
                this.fire(EV_END, { pageX: this.lastXY[0], pageY: this.lastXY[1] });
            }
            this.get(NODE).removeClass(DDM.CSS_PREFIX + '-dragging');
            this.set('dragging', false);
            this.deltaXY = [0, 0];
            this.get(DRAG_NODE).detach(MOUSE_UP, this._handleMouseUp, this, true);

            return this;
        },
        /**
        * @private
        * @method _align
        * @description Calculates the offsets and set's the XY that the element will move to.
        * @param {Array} xy The xy coords to align with.
        * @return Array
        * @type {Array}
        */
        _align: function(xy) {
            return [xy[0] - this.deltaXY[0], xy[1] - this.deltaXY[1]];
        },
        /**
        * @private
        * @method _moveNode
        * @description This method performs the actual element move.
        * @param {Array} eXY The XY to move the element to, usually comes from the mousemove DOM event.
        * @param {Boolean} noFire If true, the drag:drag event will not fire.
        */
        _moveNode: function(eXY, noFire) {
            var xy = this._align(eXY), diffXY = [], diffXY2 = [];

            //This will probably kill your machine ;)
            diffXY[0] = (xy[0] - this.lastXY[0]);
            diffXY[1] = (xy[1] - this.lastXY[1]);

            diffXY2[0] = (xy[0] - this.nodeXY[0]);
            diffXY2[1] = (xy[1] - this.nodeXY[1]);


            if (this.get('move')) {
                if (Y.UA.opera) {
                    this.get(DRAG_NODE).setXY(xy);
                } else {
                    DDM.setXY(this.get(DRAG_NODE), diffXY);
                }
                this.realXY = xy;
            }

            this.region = {
                '0': xy[0], 
                '1': xy[1],
                area: 0,
                top: xy[1],
                right: xy[0] + this.get(DRAG_NODE).get(OFFSET_WIDTH),
                bottom: xy[1] + this.get(DRAG_NODE).get(OFFSET_HEIGHT),
                left: xy[0]
            };

            var startXY = this.nodeXY;
            if (!noFire) {
                this.fire(EV_DRAG, {
                    pageX: xy[0],
                    pageY: xy[1],
                    info: {
                        start: startXY,
                        xy: xy,
                        delta: diffXY,
                        offset: diffXY2
                    } 
                });
            }
            
            this.lastXY = xy;
        },
        /**
        * @private
        * @method _move
        * @description Fired from DragDropMgr (DDM) on mousemove.
        * @param {Event} ev The mousemove DOM event
        */
        _move: function(ev) {
            if (this.get('lock')) {
                return false;
            } else {
                this.mouseXY = [ev.pageX, ev.pageY];
                if (!this._dragThreshMet) {
                    var diffX = Math.abs(this.startXY[0] - ev.pageX);
                    var diffY = Math.abs(this.startXY[1] - ev.pageY);
                    if (diffX > this.get('clickPixelThresh') || diffY > this.get('clickPixelThresh')) {
                        this._dragThreshMet = true;
                        this.start();
                        this._moveNode([ev.pageX, ev.pageY]);
                    }
                
                } else {
                    clearTimeout(this._clickTimeout);
                    this._moveNode([ev.pageX, ev.pageY]);
                }
            }
        },
        /**
        * @method stopDrag
        * @description Method will forcefully stop a drag operation. For example calling this from inside an ESC keypress handler will stop this drag.
        * @return {Self}
        * @chainable
        */
        stopDrag: function() {
            if (this.get('dragging')) {
                DDM._end();
            }
            return this;
        },
        /**
        * @private
        * @method destructor
        * @description Lifecycle destructor, unreg the drag from the DDM and remove listeners
        */
        destructor: function() {
            DDM._unregDrag(this);

            this._unprep();
            if (this.target) {
                this.target.destroy();
            }
        }
    });
    Y.namespace('DD');    
    Y.DD.Drag = Drag;



}, '@VERSION@' ,{requires:['dd-ddm-base'], skinnable:false});
YUI.add('dd-proxy', function(Y) {

    /**
     * The Drag & Drop Utility allows you to create a draggable interface efficiently, buffering you from browser-level abnormalities and enabling you to focus on the interesting logic surrounding your particular implementation. This component enables you to create a variety of standard draggable objects with just a few lines of code and then, using its extensive API, add your own specific implementation logic.
     * @module dd
     * @submodule dd-proxy
     */
    /**
     * This class extends dd-drag to allow for creating a proxy drag node, instead of dragging the original node.
     * @class Proxy
     * @extends Drag
     * @constructor
     */
    var DDM = Y.DD.DDM,
        NODE = 'node',
        DRAG_NODE = 'dragNode',
        PROXY = 'proxy';
     

    var Proxy = function() {
        Proxy.superclass.constructor.apply(this, arguments);

    };

    Proxy.NAME = 'dragProxy';

    Proxy.ATTRS = {
        /**
        * @attribute moveOnEnd
        * @description Move the original node at the end of the drag. Default: true
        * @type Boolean
        */
        moveOnEnd: {
            value: true
        },
        /**
        * @attribute resizeFrame
        * @description Make the Proxy node assume the size of the original node. Default: true
        * @type Boolean
        */
        resizeFrame: {
            value: true
        },
        /**
        * @attribute proxy
        * @description Make this Draggable instance a Proxy instance. Default: false
        * @type Boolean
        */
        proxy: {
            value: false
        },        
        /**
        * @attribute positionProxy
        * @description Make the Proxy node appear in the same place as the original node. Default: true
        * @type Boolean
        */
        positionProxy: {
            value: true
        },
        /**
        * @attribute borderStyle
        * @description The default border style for the border of the proxy. Default: 1px solid #808080
        * @type Boolean
        */
        borderStyle: {
            value: '1px solid #808080'
        }
    };

    var proto = {
        /**
        * @private
        * @method _createFrame
        * @description Create the proxy element if it doesn't already exist and set the DD.DDM._proxy value
        */
        _createFrame: function() {
            if (!DDM._proxy) {
                DDM._proxy = true;
                var p = Y.Node.create('<div></div>');

                p.setStyles({
                    position: 'absolute',
                    display: 'none',
                    zIndex: '999',
                    top: '-999px',
                    left: '-999px',
                    border: this.get('borderStyle')
                });

                var b = Y.Node.get('body');
                b.insertBefore(p, b.get('firstChild'));
                p.set('id', Y.stamp(p));
                p.addClass(DDM.CSS_PREFIX + '-proxy');
                DDM._proxy = p;
            }
        },
        /**
        * @private
        * @method _setFrame
        * @description If resizeProxy is set to true (default) it will resize the proxy element to match the size of the Drag Element.
        * If positionProxy is set to true (default) it will position the proxy element in the same location as the Drag Element.
        */
        _setFrame: function() {
            var n = this.get(NODE);
            if (this.get('resizeFrame')) {
                DDM._proxy.setStyles({
                    height: n.get('offsetHeight') + 'px',
                    width: n.get('offsetWidth') + 'px'
                });
            }
            this.get(DRAG_NODE).setStyles({
                visibility: 'hidden',
                display: 'block',
                border: this.get('borderStyle')
            });

            if (this.get('positionProxy')) {
                this.get(DRAG_NODE).setXY(this.nodeXY);
            }
            this.get(DRAG_NODE).setStyle('visibility', 'visible');
        },
        /**
        * @private
        * @method initializer
        * @description Lifecycle method
        */
        initializer: function() {
            if (this.get(PROXY)) {
                this._createFrame();
            }
        },
        /**
        * @method start
        * @description Starts the drag operation and sets the dragNode config option.
        */       
        start: function() {
            if (!this.get('lock')) {
                if (this.get(PROXY)) {
                    if (this.get(DRAG_NODE).compareTo(this.get(NODE))) {
                        this.set(DRAG_NODE, DDM._proxy);
                    }
                } else {
                    this.set(DRAG_NODE, this.get(NODE));
                }
            }
            Proxy.superclass.start.apply(this);
            if (this.get(PROXY)) {
                this._setFrame();
            }
        },
        /**
        * @method end
        * @description Ends the drag operation, if moveOnEnd is set it will position the Drag Element to the new location of the proxy.
        */        
        end: function() {
            if (this.get(PROXY) && this.get('dragging')) {
                if (this.get('moveOnEnd')) {
                    this.get(NODE).setXY(this.lastXY);
                }
                this.get(DRAG_NODE).setStyle('display', 'none');
            }
            Proxy.superclass.end.apply(this);
        }
    };
    //Extend DD.Drag
    Y.extend(Proxy, Y.DD.Drag, proto);
    //Set this new class as DD.Drag for other extensions
    Y.DD.Drag = Proxy;    



}, '@VERSION@' ,{requires:['dd-ddm', 'dd-drag'], skinnable:false});
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
        OFFSET_WIDTH = 'offsetWidth';


    var C = function() {
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
            get: function(r) {
                if (Y.Lang.isObject(r)) {
                    var o = {};
                    Y.mix(o, r);
                    return o;
                } else {
                    return false;
                }
            },
            set: function (r) {
                if (Y.Lang.isObject(r)) {
                    if (r.top && r.right && r.left && r.bottom) {
                        var o = {};
                        Y.mix(o, r);
                        return o;
                    } else {
                        return false;
                    }
                } else if (r !== false) {
                    return false;
                }
            }
        },
        /**
        * @attribute gutter
        * @description CSS style string for the gutter of a region (supports negative values): '5 0' (sets top and bottom to 5px, left and right to 0px), '1 2 3 4' (top 1px, right 2px, bottom 3px, left 4px)        
        * @type String
        */
        gutter: {
            value: '0',
            set: function(gutter) {
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
            set: function(n) {
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

    var proto = {
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
            var r = {};
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
            var g = this.get('gutter');
            Y.each(g, function(i, n) {
                if ((n == 'right') || (n == 'bottom')) {
                    r[n] -= i;
                } else {
                    r[n] += i;
                }
            });
            if (inc) {
                var oh = this.get(DRAG_NODE).get(OFFSET_HEIGHT),
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
            var i = 0, len = ticks.length, next = 0;

            if (!ticks || (ticks.length === 0)) {
                return pos;
            } else if (ticks[0] >= pos) {
                return ticks[0];
            } else {
                for (i = 0; i < len; i++) {
                    next = (i + 1);
                    if (ticks[next] && ticks[next] >= pos) {
                        var diff1 = pos - ticks[i],
                            diff2 = ticks[next] - pos;
                        var ret = (diff2 > diff1) ? ticks[i] : ticks[next];
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



}, '@VERSION@' ,{requires:['dd-drag', 'dd-proxy'], skinnable:false});
YUI.add('dd-plugin', function(Y) {

       /**
        * This is a simple Drag plugin that can be attached to a Node via the plug method.
        * @module dd-plugin
        * @submodule dd-plugin
        */
       /**
        * This is a simple Drag plugin that can be attached to a Node via the plug method.
        * @class DragPlugin
        * @extends Drag
        * @constructor
        * @namespace plugin
        */


        var Drag = function(config) {
            config.node = config.owner;
            Drag.superclass.constructor.apply(this, arguments);
        };
        
        /**
        * @property NAME
        * @description dd-plugin
        * @type {String}
        */
        Drag.NAME = "dd-plugin";
        /**
        * @property NS
        * @description The Drag instance will be placed on the Node instance under the dd namespace. It can be accessed via Node.dd;
        * @type {String}
        */
        Drag.NS = "dd";


        Y.extend(Drag, Y.DD.Drag);
        Y.namespace('plugin');
        Y.plugin.Drag = Drag;



}, '@VERSION@' ,{requires:['dd-drag'], skinnable:false, optional:['dd-constrain', 'dd-proxy']});
YUI.add('dd-drop', function(Y) {

    /**
     * The Drag & Drop Utility allows you to create a draggable interface efficiently, buffering you from browser-level abnormalities and enabling you to focus on the interesting logic surrounding your particular implementation. This component enables you to create a variety of standard draggable objects with just a few lines of code and then, using its extensive API, add your own specific implementation logic.
     * @module dd
     * @submodule dd-drop
     */     
    /**
     * This class provides the ability to create a Drop Target.
     * @class Drop
     * @extends Base
     * @constructor
     */

    var NODE = 'node',
        DDM = Y.DD.DDM,
        OFFSET_HEIGHT = 'offsetHeight',
        OFFSET_WIDTH = 'offsetWidth',
        /**
        * @event drop:over
        * @description Fires when a drag element is over this target.
        * @bubbles DDM
        * @type Event.Custom
        */
        EV_DROP_OVER = 'drop:over',
        /**
        * @event drop:enter
        * @description Fires when a drag element enters this target.
        * @bubbles DDM
        * @type Event.Custom
        */
        EV_DROP_ENTER = 'drop:enter',
        /**
        * @event drop:exit
        * @description Fires when a drag element exits this target.
        * @bubbles DDM
        * @type Event.Custom
        */
        EV_DROP_EXIT = 'drop:exit';

        /**
        * @event drop:hit
        * @description Fires when a draggable node is dropped on this Drop Target. (Fired from dd-ddm-drop)
        * @bubbles DDM
        * @type Event.Custom
        */
        

    var Drop = function() {
        Drop.superclass.constructor.apply(this, arguments);

        this._createShim();
        DDM._regTarget(this);
        /* TODO
        if (Dom.getStyle(this.el, 'position') == 'fixed') {
            Event.on(window, 'scroll', function() {
                this.activateShim();
            }, this, true);
        }
        */
    };

    Drop.NAME = 'drop';

    Drop.ATTRS = {
        /**
        * @attribute node
        * @description Y.Node instanace to use as the element to make a Drop Target
        * @type Node
        */        
        node: {
            set: function(node) {
                var n = Y.Node.get(node);
                if (!n) {
                    Y.fail('DD.Drop: Invalid Node Given: ' + node);
                }
                return n;               
            }
        },
        /**
        * @attribute groups
        * @description Array of groups to add this drop into.
        * @type Array
        */        
        groups: {
            value: ['default'],
            set: function(g) {
                this._groups = {};
                Y.each(g, function(v, k) {
                    this._groups[v] = true;
                }, this);
            }
        },   
        /**
        * @attribute padding
        * @description CSS style padding to make the Drop Target bigger than the node.
        * @type String
        */
        padding: {
            value: '0',
            set: function(p) {
                return DDM.cssSizestoObject(p);
            }
        },
        /**
        * @attribute lock
        * @description Set to lock this drop element.
        * @type Boolean
        */        
        lock: {
            value: false,
            set: function(lock) {
                if (lock) {
                    this.get(NODE).addClass(DDM.CSS_PREFIX + '-drop-locked');
                } else {
                    this.get(NODE).removeClass(DDM.CSS_PREFIX + '-drop-locked');
                }
            }
        },
        /**
        * @attribute bubbles
        * @description Controls the default bubble parent for this Drop instance. Default: Y.DD.DDM. Set to false to disable bubbling.
        * @type Object
        */
        bubbles: {
            writeOnce: true,
            value: Y.DD.DDM
        }

    };

    Y.extend(Drop, Y.Base, {
        /**
        * @private
        * @method _createEvents
        * @description This method creates all the events for this Event Target and publishes them so we get Event Bubbling.
        */
        _createEvents: function() {
            
            var ev = [
                EV_DROP_OVER,
                EV_DROP_ENTER,
                EV_DROP_EXIT,
                'drop:hit'
            ];

            Y.each(ev, function(v, k) {
                this.publish(v, {
                    type: v,
                    emitFacade: true,
                    preventable: false,
                    bubbles: true,
                    queuable: true
                });
            }, this);

            if (this.get('bubbles')) {
                this.addTarget(this.get('bubbles'));
            }
            
        },
        /**
        * @private
        * @property _valid
        * @description Flag for determining if the target is valid in this operation.
        * @type Boolean
        */
        _valid: null,
        /**
        * @private
        * @property _groups
        * @description The groups this target belongs to.
        * @type Array
        */
        _groups: null,
        /**
        * @property shim
        * @description Node reference to the targets shim
        * @type {Object}
        */
        shim: null,
        /**
        * @property region
        * @description A region object associated with this target, used for checking regions while dragging.
        * @type Object
        */
        region: null,
        /**
        * @property overTarget
        * @description This flag is tripped when a drag element is over this target.
        * @type Boolean
        */
        overTarget: null,
        /**
        * @method inGroup
        * @description Check if this target is in one of the supplied groups.
        * @param {Array} groups The groups to check against
        * @return Boolean
        */
        inGroup: function(groups) {
            this._valid = false;
            var ret = false;
            Y.each(groups, function(v, k) {
                if (this._groups[v]) {
                    ret = true;
                    this._valid = true;
                }
            }, this);
            return ret;
        },
        /**
        * @private
        * @method initializer
        * @description Private lifecycle method
        */
        initializer: function() {
            this._createEvents();
            var node = this.get(NODE);
            if (!node.get('id')) {
                var id = Y.stamp(node);
                node.set('id', id);
            }
            node.addClass(DDM.CSS_PREFIX + '-drop');
        },
        /**
        * @private
        * @method destructor
        * @description Lifecycle destructor, unreg the drag from the DDM and remove listeners
        */
        destructor: function() {
            DDM._unregTarget(this);
            if (this.shim) {
                this.shim.get('parentNode').removeChild(this.shim);
                this.shim = null;
            }
            this.get(NODE).removeClass(DDM.CSS_PREFIX + '-drop');
        },        
        /**
        * @private
        * @method _deactivateShim
        * @description Removes classes from the target, resets some flags and sets the shims deactive position [-999, -999]
        */
        _deactivateShim: function() {
            this.get(NODE).removeClass(DDM.CSS_PREFIX + '-drop-active-valid');
            this.get(NODE).removeClass(DDM.CSS_PREFIX + '-drop-active-invalid');
            this.get(NODE).removeClass(DDM.CSS_PREFIX + '-drop-over');
            this.shim.setStyles({
                top: '-999px',
                left: '-999px'
            });
            this.overTarget = false;
        },
        /**
        * @private
        * @method _activateShim
        * @description Activates the shim and adds some interaction CSS classes
        */
        _activateShim: function() {
            if (!DDM.activeDrag) {
                return false; //Nothing is dragging, no reason to activate.
            }
            if (this.get(NODE) === DDM.activeDrag.get(NODE)) {
                return false;
            }
            if (this.get('lock')) {
                return false;
            }
            var node = this.get(NODE);
            //TODO Visibility Check..
            //if (this.inGroup(DDM.activeDrag.get('groups')) && this.get(NODE).isVisible()) {
            if (this.inGroup(DDM.activeDrag.get('groups'))) {
                node.removeClass(DDM.CSS_PREFIX + '-drop-active-invalid');
                node.addClass(DDM.CSS_PREFIX + '-drop-active-valid');
                DDM._addValid(this);
                this.overTarget = false;
                this.sizeShim();
            } else {
                DDM._removeValid(this);
                node.removeClass(DDM.CSS_PREFIX + '-drop-active-valid');
                node.addClass(DDM.CSS_PREFIX + '-drop-active-invalid');
            }
        },
        /**
        * @method sizeShim
        * @description Positions and sizes the shim with the raw data from the node, this can be used to programatically adjust the Targets shim for Animation..
        */
        sizeShim: function() {
            if (!DDM.activeDrag) {
                return false; //Nothing is dragging, no reason to activate.
            }
            if (this.get(NODE) === DDM.activeDrag.get(NODE)) {
                return false;
            }
            if (this.get('lock')) {
                return false;
            }
            var node = this.get(NODE),
                nh = node.get(OFFSET_HEIGHT),
                nw = node.get(OFFSET_WIDTH),
                xy = node.getXY(),
                p = this.get('padding');


            //Apply padding
            nw = nw + p.left + p.right;
            nh = nh + p.top + p.bottom;
            xy[0] = xy[0] - p.left;
            xy[1] = xy[1] - p.top;
            

            if (DDM.activeDrag.get('dragMode') === DDM.INTERSECT) {
                //Intersect Mode, make the shim bigger
                var dd = DDM.activeDrag,
                    dH = dd.get(NODE).get(OFFSET_HEIGHT),
                    dW = dd.get(NODE).get(OFFSET_WIDTH);
                
                nh = (nh + dH);
                nw = (nw + dW);
                xy[0] = xy[0] - (dW - dd.deltaXY[0]);
                xy[1] = xy[1] - (dH - dd.deltaXY[1]);

            }
            
            //Set the style on the shim
            this.shim.setStyles({
                height: nh + 'px',
                width: nw + 'px',
                top: xy[1] + 'px',
                left: xy[0] + 'px'
            });
            
            //Create the region to be used by intersect when a drag node is over us.
            this.region = {
                '0': xy[0], 
                '1': xy[1],
                area: 0,
                top: xy[1],
                right: xy[0] + nw,
                bottom: xy[1] + nh,
                left: xy[0]
            };
        },
        /**
        * @private
        * @method _createShim
        * @description Creates the Target shim and adds it to the DDM's playground..
        */
        _createShim: function() {
            //var s = Y.Node.create(['div', { id: this.get(NODE).get('id') + '_shim' }]);
            var s = Y.Node.create('<div id="' + this.get(NODE).get('id') + '_shim"></div>');
            s.setStyles({
                height: this.get(NODE).get(OFFSET_HEIGHT) + 'px',
                width: this.get(NODE).get(OFFSET_WIDTH) + 'px',
                backgroundColor: 'yellow',
                opacity: '.5',
                zIndex: 999,
                overflow: 'hidden',
                top: '-900px',
                left: '-900px',
                position:  'absolute'
            });
            DDM._pg.appendChild(s);
            this.shim = s;

            s.on('mouseover', this._handleOverEvent, this, true);
            s.on('mouseout', this._handleOutEvent, this, true);
        },
        /**
        * @private
        * @method _handleOverTarget
        * @description This handles the over target call made from this object or from the DDM
        */
        _handleTargetOver: function() {
            if (DDM.isOverTarget(this)) {
                this.get(NODE).addClass(DDM.CSS_PREFIX + '-drop-over');
                DDM.activeDrop = this;
                DDM.otherDrops[this] = this;
                if (this.overTarget) {
                    DDM.activeDrag.fire('drag:over', { drop: this, drag: DDM.activeDrag });
                    this.fire(EV_DROP_OVER, { drop: this, drag: DDM.activeDrag });
                } else {
                    this.overTarget = true;
                    this.fire(EV_DROP_ENTER, { drop: this, drag: DDM.activeDrag });
                    DDM.activeDrag.fire('drag:enter', { drop: this, drag: DDM.activeDrag });
                    DDM.activeDrag.get(NODE).addClass(DDM.CSS_PREFIX + '-drag-over');
                    DDM._handleTargetOver();
                }
            } else {
                this._handleOut();
            }
            
        },
        /**
        * @private
        * @method _handleOverEvent
        * @description Handles the mouseover DOM event on the Target Shim
        */
        _handleOverEvent: function() {
            DDM._addActiveShim(this);
        },
        /**
        * @private
        * @method _handleOut
        * @description Handles the mouseout DOM event on the Target Shim
        */
        _handleOutEvent: function() {
            DDM._removeActiveShim(this);
        },
        /**
        * @private
        * @method _handleOut
        * @description Handles out of target calls/checks
        */
        _handleOut: function() {
            if (!DDM.isOverTarget(this)) {
                if (this.overTarget) {
                    this.overTarget = false;
                    DDM._removeActiveShim(this);
                    if (DDM.activeDrag) {
                        this.get(NODE).removeClass(DDM.CSS_PREFIX + '-drop-over');
                        DDM.activeDrag.get(NODE).removeClass(DDM.CSS_PREFIX + '-drag-over');
                        this.fire(EV_DROP_EXIT);
                        DDM.activeDrag.fire('drag:exit', { drop: this });
                        delete DDM.otherDrops[this];
                    }
                }
            }
        }
    });

    Y.DD.Drop = Drop;



}, '@VERSION@' ,{requires:['dd-ddm-drop', 'dd-drag'], skinnable:false});
YUI.add('dd-drop-plugin', function(Y) {

       /**
        * This is a simple Drop plugin that can be attached to a Node via the plug method.
        * @module dd-plugin
        * @submodule dd-drop-plugin
        */
       /**
        * This is a simple Drop plugin that can be attached to a Node via the plug method.
        * @class DropPlugin
        * @extends Drop
        * @constructor
        * @namespace plugin
        */


        var Drop = function(config) {
            config.node = config.owner;
            Drop.superclass.constructor.apply(this, arguments);
        };
        
        /**
        * @property NAME
        * @description dd-drop-plugin
        * @type {String}
        */
        Drop.NAME = "dd-drop-plugin";
        /**
        * @property NS
        * @description The Drop instance will be placed on the Node instance under the drop namespace. It can be accessed via Node.drop;
        * @type {String}
        */
        Drop.NS = "drop";


        Y.extend(Drop, Y.DD.Drop);
        Y.namespace('plugin');
        Y.plugin.Drop = Drop;



}, '@VERSION@' ,{requires:['dd-drop'], skinnable:false});


YUI.add('dd', function(Y){}, '@VERSION@' ,{use:['dd-ddm-base', 'dd-ddm', 'dd-ddm-drop', 'dd-drag', 'dd-proxy', 'dd-constrain', 'dd-plugin', 'dd-drop', 'dd-drop-plugin'], skinnable:false});

