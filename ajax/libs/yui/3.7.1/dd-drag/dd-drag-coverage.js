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
_yuitest_coverage["build/dd-drag/dd-drag.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/dd-drag/dd-drag.js",
    code: []
};
_yuitest_coverage["build/dd-drag/dd-drag.js"].code=["YUI.add('dd-drag', function (Y, NAME) {","","","    /**","     * Provides the ability to drag a Node.","     * @module dd","     * @submodule dd-drag","     */     ","    /**","     * Provides the ability to drag a Node.","     * @class Drag","     * @extends Base","     * @constructor","     * @namespace DD","     */","","    var DDM = Y.DD.DDM,","        NODE = 'node',","        DRAGGING = 'dragging',","        DRAG_NODE = 'dragNode',","        OFFSET_HEIGHT = 'offsetHeight',","        OFFSET_WIDTH = 'offsetWidth',        ","        /**","        * @event drag:mouseup","        * @description Handles the mouseup DOM event, does nothing internally just fires.","        * @bubbles DDM","        * @type {CustomEvent}","        */","        /**","        * @event drag:mouseDown","        * @description Handles the mousedown DOM event, checks to see if you have a valid handle then starts the drag timers.","        * @preventable _defMouseDownFn","        * @param {EventFacade} event An Event Facade object with the following specific property added:","        * <dl><dt>ev</dt><dd>The original mousedown event.</dd></dl>","        * @bubbles DDM","        * @type {CustomEvent}","        */","        EV_MOUSE_DOWN = 'drag:mouseDown',","        /**","        * @event drag:afterMouseDown","        * @description Fires after the mousedown event has been cleared.","        * @param {EventFacade} event An Event Facade object with the following specific property added:","        * <dl><dt>ev</dt><dd>The original mousedown event.</dd></dl>","        * @bubbles DDM","        * @type {CustomEvent}","        */","        EV_AFTER_MOUSE_DOWN = 'drag:afterMouseDown',","        /**","        * @event drag:removeHandle","        * @description Fires after a handle is removed.","        * @param {EventFacade} event An Event Facade object with the following specific property added:","        * <dl><dt>handle</dt><dd>The handle that was removed.</dd></dl>","        * @bubbles DDM","        * @type {CustomEvent}","        */","        EV_REMOVE_HANDLE = 'drag:removeHandle',","        /**","        * @event drag:addHandle","        * @description Fires after a handle is added.","        * @param {EventFacade} event An Event Facade object with the following specific property added:","        * <dl><dt>handle</dt><dd>The handle that was added.</dd></dl>","        * @bubbles DDM","        * @type {CustomEvent}","        */","        EV_ADD_HANDLE = 'drag:addHandle',","        /**","        * @event drag:removeInvalid","        * @description Fires after an invalid selector is removed.","        * @param {EventFacade} event An Event Facade object with the following specific property added:","        * <dl><dt>handle</dt><dd>The handle that was removed.</dd></dl>","        * @bubbles DDM","        * @type {CustomEvent}","        */","        EV_REMOVE_INVALID = 'drag:removeInvalid',","        /**","        * @event drag:addInvalid","        * @description Fires after an invalid selector is added.","        * @param {EventFacade} event An Event Facade object with the following specific property added:","        * <dl><dt>handle</dt><dd>The handle that was added.</dd></dl>","        * @bubbles DDM","        * @type {CustomEvent}","        */","        EV_ADD_INVALID = 'drag:addInvalid',","        /**","        * @event drag:start","        * @description Fires at the start of a drag operation.","        * @param {EventFacade} event An Event Facade object with the following specific property added:","        * <dl>","        * <dt>pageX</dt><dd>The original node position X.</dd>","        * <dt>pageY</dt><dd>The original node position Y.</dd>","        * <dt>startTime</dt><dd>The startTime of the event. getTime on the current Date object.</dd>","        * </dl>","        * @bubbles DDM","        * @type {CustomEvent}","        */","        EV_START = 'drag:start',","        /**","        * @event drag:end","        * @description Fires at the end of a drag operation.","        * @param {EventFacade} event An Event Facade object with the following specific property added:","        * <dl>","        * <dt>pageX</dt><dd>The current node position X.</dd>","        * <dt>pageY</dt><dd>The current node position Y.</dd>","        * <dt>startTime</dt><dd>The startTime of the event, from the start event.</dd>","        * <dt>endTime</dt><dd>The endTime of the event. getTime on the current Date object.</dd>","        * </dl>","        * @bubbles DDM","        * @type {CustomEvent}","        */","        EV_END = 'drag:end',","        /**","        * @event drag:drag","        * @description Fires every mousemove during a drag operation.","        * @param {EventFacade} event An Event Facade object with the following specific property added:","        * <dl>","        * <dt>pageX</dt><dd>The current node position X.</dd>","        * <dt>pageY</dt><dd>The current node position Y.</dd>","        * <dt>scroll</dt><dd>Should a scroll action occur.</dd>","        * <dt>info</dt><dd>Object hash containing calculated XY arrays: start, xy, delta, offset</dd>","        * </dl>","        * @bubbles DDM","        * @type {CustomEvent}","        */","        EV_DRAG = 'drag:drag',","        /**","        * @event drag:align","        * @preventable _defAlignFn","        * @description Fires when this node is aligned.","        * @param {EventFacade} event An Event Facade object with the following specific property added:","        * <dl>","        * <dt>pageX</dt><dd>The current node position X.</dd>","        * <dt>pageY</dt><dd>The current node position Y.</dd>","        * </dl>","        * @bubbles DDM","        * @type {CustomEvent}","        */","        EV_ALIGN = 'drag:align',","        /**","        * @event drag:over","        * @description Fires when this node is over a Drop Target. (Fired from dd-drop)","        * @param {EventFacade} event An Event Facade object with the following specific property added:","        * <dl>","        * <dt>drop</dt><dd>The drop object at the time of the event.</dd>","        * <dt>drag</dt><dd>The drag object at the time of the event.</dd>","        * </dl>","        * @bubbles DDM","        * @type {CustomEvent}","        */","        /**","        * @event drag:enter","        * @description Fires when this node enters a Drop Target. (Fired from dd-drop)","        * @param {EventFacade} event An Event Facade object with the following specific property added:","        * <dl>","        * <dt>drop</dt><dd>The drop object at the time of the event.</dd>","        * <dt>drag</dt><dd>The drag object at the time of the event.</dd>","        * </dl>","        * @bubbles DDM","        * @type {CustomEvent}","        */","        /**","        * @event drag:exit","        * @description Fires when this node exits a Drop Target. (Fired from dd-drop)","        * @param {EventFacade} event An Event Facade object with the following specific property added:","        * <dl>","        * <dt>drop</dt><dd>The drop object at the time of the event.</dd>","        * </dl>","        * @bubbles DDM","        * @type {CustomEvent}","        */","        /**","        * @event drag:drophit","        * @description Fires when this node is dropped on a valid Drop Target. (Fired from dd-ddm-drop)","        * @param {EventFacade} event An Event Facade object with the following specific property added:","        * <dl>","        * <dt>drop</dt><dd>The best guess on what was dropped on.</dd>","        * <dt>drag</dt><dd>The drag object at the time of the event.</dd>","        * <dt>others</dt><dd>An array of all the other drop targets that was dropped on.</dd>","        * </dl>","        * @bubbles DDM","        * @type {CustomEvent}","        */","        /**","        * @event drag:dropmiss","        * @description Fires when this node is dropped on an invalid Drop Target. (Fired from dd-ddm-drop)","        * @param {EventFacade} event An Event Facade object with the following specific property added:","        * <dl>","        * <dt>pageX</dt><dd>The current node position X.</dd>","        * <dt>pageY</dt><dd>The current node position Y.</dd>","        * </dl>","        * @bubbles DDM","        * @type {CustomEvent}","        */","    ","    Drag = function(o) {","        this._lazyAddAttrs = false;","        Drag.superclass.constructor.apply(this, arguments);","","        var valid = DDM._regDrag(this);","        if (!valid) {","            Y.error('Failed to register node, already in use: ' + o.node);","        }","    };","","    Drag.NAME = 'drag';","    ","    /**","    * This property defaults to \"mousedown\", but when drag-gestures is loaded, it is changed to \"gesturemovestart\"","    * @static","    * @property START_EVENT","    */","    Drag.START_EVENT = 'mousedown';","","    Drag.ATTRS = {","        /**","        * @attribute node","        * @description Y.Node instance to use as the element to initiate a drag operation","        * @type Node","        */","        node: {","            setter: function(node) {","                if (this._canDrag(node)) {","                    return node;","                }","                var n = Y.one(node);","                if (!n) {","                    Y.error('DD.Drag: Invalid Node Given: ' + node);","                }","                return n;","            }","        },","        /**","        * @attribute dragNode","        * @description Y.Node instance to use as the draggable element, defaults to node","        * @type Node","        */","        dragNode: {","            setter: function(node) {","                if (this._canDrag(node)) {","                    return node;","                }","                var n = Y.one(node);","                if (!n) {","                    Y.error('DD.Drag: Invalid dragNode Given: ' + node);","                }","                return n;","            }","        },","        /**","        * @attribute offsetNode","        * @description Offset the drag element by the difference in cursor position: default true","        * @type Boolean","        */","        offsetNode: {","            value: true","        },","        /**","        * @attribute startCentered","        * @description Center the dragNode to the mouse position on drag:start: default false","        * @type Boolean","        */","        startCentered: {","            value: false","        },","        /**","        * @attribute clickPixelThresh","        * @description The number of pixels to move to start a drag operation, default is 3.","        * @type Number","        */","        clickPixelThresh: {","            value: DDM.get('clickPixelThresh')","        },","        /**","        * @attribute clickTimeThresh","        * @description The number of milliseconds a mousedown has to pass to start a drag operation, default is 1000.","        * @type Number","        */","        clickTimeThresh: {","            value: DDM.get('clickTimeThresh')","        },","        /**","        * @attribute lock","        * @description Set to lock this drag element so that it can't be dragged: default false.","        * @type Boolean","        */","        lock: {","            value: false,","            setter: function(lock) {","                if (lock) {","                    this.get(NODE).addClass(DDM.CSS_PREFIX + '-locked');","                } else {","                    this.get(NODE).removeClass(DDM.CSS_PREFIX + '-locked');","                }","                return lock;","            }","        },","        /**","        * @attribute data","        * @description A payload holder to store arbitrary data about this drag object, can be used to store any value.","        * @type Mixed","        */","        data: {","            value: false","        },","        /**","        * @attribute move","        * @description If this is false, the drag element will not move with the cursor: default true. Can be used to \"resize\" the element.","        * @type Boolean","        */","        move: {","            value: true","        },","        /**","        * @attribute useShim","        * @description Use the protective shim on all drag operations: default true. Only works with dd-ddm, not dd-ddm-base.","        * @type Boolean","        */","        useShim: {","            value: true","        },","        /**","        * @attribute activeHandle","        * @description This config option is set by Drag to inform you of which handle fired the drag event (in the case that there are several handles): default false.","        * @type Node","        */","        activeHandle: {","            value: false","        },","        /**","        * @attribute primaryButtonOnly","        * @description By default a drag operation will only begin if the mousedown occurred with the primary mouse button. Setting this to false will allow for all mousedown events to trigger a drag.","        * @type Boolean","        */","        primaryButtonOnly: {","            value: true","        },","        /**","        * @attribute dragging","        * @description This attribute is not meant to be used by the implementor, it is meant to be used as an Event tracker so you can listen for it to change.","        * @type Boolean","        */","        dragging: {","            value: false","        },","        parent: {","            value: false","        },","        /**","        * @attribute target","        * @description This attribute only works if the dd-drop module has been loaded. It will make this node a drop target as well as draggable.","        * @type Boolean","        */","        target: {","            value: false,","            setter: function(config) {","                this._handleTarget(config);","                return config;","            }","        },","        /**","        * @attribute dragMode","        * @description This attribute only works if the dd-drop module is active. It will set the dragMode (point, intersect, strict) of this Drag instance.","        * @type String","        */","        dragMode: {","            value: null,","            setter: function(mode) {","                return DDM._setDragMode(mode);","            }","        },","        /**","        * @attribute groups","        * @description Array of groups to add this drag into.","        * @type Array","        */","        groups: {","            value: ['default'],","            getter: function() {","                if (!this._groups) {","                    this._groups = {};","                }","                var ret = [];","                Y.each(this._groups, function(v, k) {","                    ret[ret.length] = k;","                });","                return ret;","            },","            setter: function(g) {","                this._groups = {};","                Y.each(g, function(v, k) {","                    this._groups[v] = true;","                }, this);","                return g;","            }","        },","        /**","        * @attribute handles","        * @description Array of valid handles to add. Adding something here will set all handles, even if previously added with addHandle","        * @type Array","        */","        handles: {","            value: null,","            setter: function(g) {","                if (g) {","                    this._handles = {};","                    Y.each(g, function(v, k) {","                        var key = v;","                        if (v instanceof Y.Node || v instanceof Y.NodeList) {","                            key = v._yuid;","                        }","                        this._handles[key] = v;","                    }, this);","                } else {","                    this._handles = null;","                }","                return g;","            }","        },","        /**","        * @deprecated","        * @attribute bubbles","        * @description Controls the default bubble parent for this Drag instance. Default: Y.DD.DDM. Set to false to disable bubbling. Use bubbleTargets in config","        * @type Object","        */","        bubbles: {","            setter: function(t) {","                this.addTarget(t);","                return t;","            }","        },","        /**","        * @attribute haltDown","        * @description Should the mousedown event be halted. Default: true","        * @type Boolean","        */","        haltDown: {","            value: true","        }","    };","","    Y.extend(Drag, Y.Base, {","        /**","        * Checks the object for the methods needed to drag the object around. ","        * Normally this would be a node instance, but in the case of Graphics, it","        * may be an SVG node or something similar.","        * @method _canDrag","        * @private","        * @param {Object} n The object to check","        * @return {Boolean} True or false if the Object contains the methods needed to Drag","        */","        _canDrag: function(n) {","            if (n && n.setXY && n.getXY && n.test && n.contains) {","                return true;","            }","            return false;","        },","        /**","        * @private","        * @property _bubbleTargets","        * @description The default bubbleTarget for this object. Default: Y.DD.DDM","        */","        _bubbleTargets: Y.DD.DDM,","        /**","        * @method addToGroup","        * @description Add this Drag instance to a group, this should be used for on-the-fly group additions.","        * @param {String} g The group to add this Drag Instance to.","        * @return {Self}","        * @chainable","        */","        addToGroup: function(g) {","            this._groups[g] = true;","            DDM._activateTargets();","            return this;","        },","        /**","        * @method removeFromGroup","        * @description Remove this Drag instance from a group, this should be used for on-the-fly group removals.","        * @param {String} g The group to remove this Drag Instance from.","        * @return {Self}","        * @chainable","        */","        removeFromGroup: function(g) {","            delete this._groups[g];","            DDM._activateTargets();","            return this;","        },","        /**","        * @property target","        * @description This will be a reference to the Drop instance associated with this drag if the target: true config attribute is set..","        * @type {Object}","        */","        target: null,","        /**","        * @private","        * @method _handleTarget","        * @description Attribute handler for the target config attribute.","        * @param {Boolean/Object} config The Config","        */","        _handleTarget: function(config) {","            if (Y.DD.Drop) {","                if (config === false) {","                    if (this.target) {","                        DDM._unregTarget(this.target);","                        this.target = null;","                    }","                } else {","                    if (!Y.Lang.isObject(config)) {","                        config = {};","                    }","                    config.bubbleTargets = config.bubbleTargets || Y.Object.values(this._yuievt.targets);","                    config.node = this.get(NODE);","                    config.groups = config.groups || this.get('groups');","                    this.target = new Y.DD.Drop(config);","                }","            }","        },","        /**","        * @private","        * @property _groups","        * @description Storage Array for the groups this drag belongs to.","        * @type {Array}","        */","        _groups: null,","        /**","        * @private","        * @method _createEvents","        * @description This method creates all the events for this Event Target and publishes them so we get Event Bubbling.","        */","        _createEvents: function() {","            ","            this.publish(EV_MOUSE_DOWN, {","                defaultFn: this._defMouseDownFn,","                queuable: false,","                emitFacade: true,","                bubbles: true,","                prefix: 'drag'","            });","            ","            this.publish(EV_ALIGN, {","                defaultFn: this._defAlignFn,","                queuable: false,","                emitFacade: true,","                bubbles: true,","                prefix: 'drag'","            });","            ","            this.publish(EV_DRAG, {","                defaultFn: this._defDragFn,","                queuable: false,","                emitFacade: true,","                bubbles: true,","                prefix: 'drag'","            });","            ","            this.publish(EV_END, {","                defaultFn: this._defEndFn,","                preventedFn: this._prevEndFn,","                queuable: false,","                emitFacade: true,","                bubbles: true,","                prefix: 'drag'","            });","            ","            var ev = [","                EV_AFTER_MOUSE_DOWN,","                EV_REMOVE_HANDLE,","                EV_ADD_HANDLE,","                EV_REMOVE_INVALID,","                EV_ADD_INVALID,","                EV_START,","                'drag:drophit',","                'drag:dropmiss',","                'drag:over',","                'drag:enter',","                'drag:exit'","            ];","            ","            Y.each(ev, function(v, k) {","                this.publish(v, {","                    type: v,","                    emitFacade: true,","                    bubbles: true,","                    preventable: false,","                    queuable: false,","                    prefix: 'drag'","                });","            }, this);","        },","        /**","        * @private","        * @property _ev_md","        * @description A private reference to the mousedown DOM event","        * @type {EventFacade}","        */","        _ev_md: null,","        /**","        * @private","        * @property _startTime","        * @description The getTime of the mousedown event. Not used, just here in case someone wants/needs to use it.","        * @type Date","        */","        _startTime: null,","        /**","        * @private","        * @property _endTime","        * @description The getTime of the mouseup event. Not used, just here in case someone wants/needs to use it.","        * @type Date","        */","        _endTime: null,","        /**","        * @private","        * @property _handles","        * @description A private hash of the valid drag handles","        * @type {Object}","        */","        _handles: null,","        /**","        * @private","        * @property _invalids","        * @description A private hash of the invalid selector strings","        * @type {Object}","        */","        _invalids: null,","        /**","        * @private","        * @property _invalidsDefault","        * @description A private hash of the default invalid selector strings: {'textarea': true, 'input': true, 'a': true, 'button': true, 'select': true}","        * @type {Object}","        */","        _invalidsDefault: {'textarea': true, 'input': true, 'a': true, 'button': true, 'select': true },","        /**","        * @private","        * @property _dragThreshMet","        * @description Private flag to see if the drag threshhold was met","        * @type {Boolean}","        */","        _dragThreshMet: null,","        /**","        * @private","        * @property _fromTimeout","        * @description Flag to determine if the drag operation came from a timeout","        * @type {Boolean}","        */","        _fromTimeout: null,","        /**","        * @private","        * @property _clickTimeout","        * @description Holder for the setTimeout call","        * @type {Boolean}","        */","        _clickTimeout: null,","        /**","        * @property deltaXY","        * @description The offset of the mouse position to the element's position","        * @type {Array}","        */","        deltaXY: null,","        /**","        * @property startXY","        * @description The initial mouse position","        * @type {Array}","        */","        startXY: null,","        /**","        * @property nodeXY","        * @description The initial element position","        * @type {Array}","        */","        nodeXY: null,","        /**","        * @property lastXY","        * @description The position of the element as it's moving (for offset calculations)","        * @type {Array}","        */","        lastXY: null,","        /**","        * @property actXY","        * @description The xy that the node will be set to. Changing this will alter the position as it's dragged.","        * @type {Array}","        */","        actXY: null,","        /**","        * @property realXY","        * @description The real xy position of the node.","        * @type {Array}","        */","        realXY: null,","        /**","        * @property mouseXY","        * @description The XY coords of the mousemove","        * @type {Array}","        */","        mouseXY: null,","        /**","        * @property region","        * @description A region object associated with this drag, used for checking regions while dragging.","        * @type Object","        */","        region: null,       ","        /**","        * @private","        * @method _handleMouseUp","        * @description Handler for the mouseup DOM event","        * @param {EventFacade} ev The Event","        */","        _handleMouseUp: function(ev) {","            this.fire('drag:mouseup');","            this._fixIEMouseUp();","            if (DDM.activeDrag) {","                DDM._end();","            }","        },","        /** ","        * @private","        * @method _fixDragStart","        * @description The function we use as the ondragstart handler when we start a drag in Internet Explorer. This keeps IE from blowing up on images as drag handles.","        * @param {Event} e The Event","        */","        _fixDragStart: function(e) {","            if (this.validClick(e)) {","                e.preventDefault();","            }","        },","        /** ","        * @private","        * @method _ieSelectFix","        * @description The function we use as the onselectstart handler when we start a drag in Internet Explorer","        */","        _ieSelectFix: function() {","            return false;","        },","        /** ","        * @private","        * @property _ieSelectBack","        * @description We will hold a copy of the current \"onselectstart\" method on this property, and reset it after we are done using it.","        */","        _ieSelectBack: null,","        /**","        * @private","        * @method _fixIEMouseDown","        * @description This method copies the onselectstart listner on the document to the _ieSelectFix property","        */","        _fixIEMouseDown: function(e) {","            if (Y.UA.ie) {","                this._ieSelectBack = Y.config.doc.body.onselectstart;","                Y.config.doc.body.onselectstart = this._ieSelectFix;","            }           ","        },","        /**","        * @private","        * @method _fixIEMouseUp","        * @description This method copies the _ieSelectFix property back to the onselectstart listner on the document.","        */","        _fixIEMouseUp: function() {","            if (Y.UA.ie) {","                Y.config.doc.body.onselectstart = this._ieSelectBack;","            }           ","        },","        /**","        * @private","        * @method _handleMouseDownEvent","        * @description Handler for the mousedown DOM event","        * @param {EventFacade} ev  The Event","        */","        _handleMouseDownEvent: function(ev) {","            this.fire(EV_MOUSE_DOWN, { ev: ev });","        },","        /**","        * @private","        * @method _defMouseDownFn","        * @description Handler for the mousedown DOM event","        * @param {EventFacade} e  The Event","        */","        _defMouseDownFn: function(e) {","            var ev = e.ev;","","            this._dragThreshMet = false;","            this._ev_md = ev;","            ","            if (this.get('primaryButtonOnly') && ev.button > 1) {","                return false;","            }","            if (this.validClick(ev)) {","                this._fixIEMouseDown(ev);","                if (this.get('haltDown')) {","                    ev.halt();","                } else {","                    ev.preventDefault();","                }","                ","                this._setStartPosition([ev.pageX, ev.pageY]);","","                DDM.activeDrag = this;","                ","                this._clickTimeout = Y.later(this.get('clickTimeThresh'), this, this._timeoutCheck);","            }","            this.fire(EV_AFTER_MOUSE_DOWN, { ev: ev });","        },","        /**","        * @method validClick","        * @description Method first checks to see if we have handles, if so it validates the click against the handle. Then if it finds a valid handle, it checks it against the invalid handles list. Returns true if a good handle was used, false otherwise.","        * @param {EventFacade} ev  The Event","        * @return {Boolean}","        */","        validClick: function(ev) {","            var r = false, n = false,","            tar = ev.target,","            hTest = null,","            els = null,","            nlist = null,","            set = false;","            if (this._handles) {","                Y.each(this._handles, function(i, n) {","                    if (i instanceof Y.Node || i instanceof Y.NodeList) {","                        if (!r) {","                            nlist = i;","                            if (nlist instanceof Y.Node) {","                                nlist = new Y.NodeList(i._node);","                            }","                            nlist.each(function(nl) {","                                if (nl.contains(tar)) {","                                    r = true;","                                }","                            });","                        }","                    } else if (Y.Lang.isString(n)) {","                        //Am I this or am I inside this","                        if (tar.test(n + ', ' + n + ' *') && !hTest) {","                            hTest = n;","                            r = true;","                        }","                    }","                });","            } else {","                n = this.get(NODE);","                if (n.contains(tar) || n.compareTo(tar)) {","                    r = true;","                }","            }","            if (r) {","                if (this._invalids) {","                    Y.each(this._invalids, function(i, n) {","                        if (Y.Lang.isString(n)) {","                            //Am I this or am I inside this","                            if (tar.test(n + ', ' + n + ' *')) {","                                r = false;","                            }","                        }","                    });","                }","            }","            if (r) {","                if (hTest) {","                    els = ev.currentTarget.all(hTest);","                    set = false;","                    els.each(function(n, i) {","                        if ((n.contains(tar) || n.compareTo(tar)) && !set) {","                            set = true;","                            this.set('activeHandle', n);","                        }","                    }, this);","                } else {","                    this.set('activeHandle', this.get(NODE));","                }","            }","            return r;","        },","        /**","        * @private","        * @method _setStartPosition","        * @description Sets the current position of the Element and calculates the offset","        * @param {Array} xy The XY coords to set the position to.","        */","        _setStartPosition: function(xy) {","            this.startXY = xy;","            ","            this.nodeXY = this.lastXY = this.realXY = this.get(NODE).getXY();","            ","            if (this.get('offsetNode')) {","                this.deltaXY = [(this.startXY[0] - this.nodeXY[0]), (this.startXY[1] - this.nodeXY[1])];","            } else {","                this.deltaXY = [0, 0];","            }","        },","        /**","        * @private","        * @method _timeoutCheck","        * @description The method passed to setTimeout to determine if the clickTimeThreshold was met.","        */","        _timeoutCheck: function() {","            if (!this.get('lock') && !this._dragThreshMet && this._ev_md) {","                this._fromTimeout = this._dragThreshMet = true;","                this.start();","                this._alignNode([this._ev_md.pageX, this._ev_md.pageY], true);","            }","        },","        /**","        * @method removeHandle","        * @description Remove a Selector added by addHandle","        * @param {String} str The selector for the handle to be removed. ","        * @return {Self}","        * @chainable","        */","        removeHandle: function(str) {","            var key = str;","            if (str instanceof Y.Node || str instanceof Y.NodeList) {","                key = str._yuid;","            }","            if (this._handles[key]) {","                delete this._handles[key];","                this.fire(EV_REMOVE_HANDLE, { handle: str });","            }","            return this;","        },","        /**","        * @method addHandle","        * @description Add a handle to a drag element. Drag only initiates when a mousedown happens on this element.","        * @param {String} str The selector to test for a valid handle. Must be a child of the element.","        * @return {Self}","        * @chainable","        */","        addHandle: function(str) {","            if (!this._handles) {","                this._handles = {};","            }","            var key = str;","            if (str instanceof Y.Node || str instanceof Y.NodeList) {","                key = str._yuid;","            }","            this._handles[key] = str;","            this.fire(EV_ADD_HANDLE, { handle: str });","            return this;","        },","        /**","        * @method removeInvalid","        * @description Remove an invalid handle added by addInvalid","        * @param {String} str The invalid handle to remove from the internal list.","        * @return {Self}","        * @chainable","        */","        removeInvalid: function(str) {","            if (this._invalids[str]) {","                this._invalids[str] = null;","                delete this._invalids[str];","                this.fire(EV_REMOVE_INVALID, { handle: str });","            }","            return this;","        },","        /**","        * @method addInvalid","        * @description Add a selector string to test the handle against. If the test passes the drag operation will not continue.","        * @param {String} str The selector to test against to determine if this is an invalid drag handle.","        * @return {Self}","        * @chainable","        */","        addInvalid: function(str) {","            if (Y.Lang.isString(str)) {","                this._invalids[str] = true;","                this.fire(EV_ADD_INVALID, { handle: str });","            }","            return this;","        },","        /**","        * @private","        * @method initializer","        * @description Internal init handler","        */","        initializer: function(cfg) {","","            this.get(NODE).dd = this;","","            if (!this.get(NODE).get('id')) {","                var id = Y.stamp(this.get(NODE));","                this.get(NODE).set('id', id);","            }","","            this.actXY = [];","            ","            this._invalids = Y.clone(this._invalidsDefault, true);","","            this._createEvents();","            ","            if (!this.get(DRAG_NODE)) {","                this.set(DRAG_NODE, this.get(NODE));","            }","","            //Fix for #2528096","            //Don't prep the DD instance until all plugins are loaded.","            this.on('initializedChange', Y.bind(this._prep, this));","","            //Shouldn't have to do this..","            this.set('groups', this.get('groups'));","        },","        /**","        * @private","        * @method _prep","        * @description Attach event listners and add classname","        */","        _prep: function() {","            this._dragThreshMet = false;","            var node = this.get(NODE);","            node.addClass(DDM.CSS_PREFIX + '-draggable');","            node.on(Drag.START_EVENT, Y.bind(this._handleMouseDownEvent, this));","            node.on('mouseup', Y.bind(this._handleMouseUp, this));","            node.on('dragstart', Y.bind(this._fixDragStart, this));","        },","        /**","        * @private","        * @method _unprep","        * @description Detach event listeners and remove classname","        */","        _unprep: function() {","            var node = this.get(NODE);","            node.removeClass(DDM.CSS_PREFIX + '-draggable');","            node.detachAll('mouseup');","            node.detachAll('dragstart');","            node.detachAll(Drag.START_EVENT);","            this.mouseXY = [];","            this.deltaXY = [0,0];","            this.startXY = [];","            this.nodeXY = [];","            this.lastXY = [];","            this.actXY = [];","            this.realXY = [];","        },","        /**","        * @method start","        * @description Starts the drag operation","        * @return {Self}","        * @chainable","        */","        start: function() {","            if (!this.get('lock') && !this.get(DRAGGING)) {","                var node = this.get(NODE), ow, oh, xy;","                this._startTime = (new Date()).getTime();","","                DDM._start();","                node.addClass(DDM.CSS_PREFIX + '-dragging');","                this.fire(EV_START, {","                    pageX: this.nodeXY[0],","                    pageY: this.nodeXY[1],","                    startTime: this._startTime","                });","                node = this.get(DRAG_NODE);","                xy = this.nodeXY;","                ","                ow = node.get(OFFSET_WIDTH);","                oh = node.get(OFFSET_HEIGHT);","                ","                if (this.get('startCentered')) {","                    this._setStartPosition([xy[0] + (ow / 2), xy[1] + (oh / 2)]);","                }","                ","                ","                this.region = {","                    '0': xy[0], ","                    '1': xy[1],","                    area: 0,","                    top: xy[1],","                    right: xy[0] + ow,","                    bottom: xy[1] + oh,","                    left: xy[0]","                };","                this.set(DRAGGING, true);","            }","            return this;","        },","        /**","        * @method end","        * @description Ends the drag operation","        * @return {Self}","        * @chainable","        */","        end: function() {","            this._endTime = (new Date()).getTime();","            if (this._clickTimeout) {","                this._clickTimeout.cancel();","            }","            this._dragThreshMet = this._fromTimeout = false;","","            if (!this.get('lock') && this.get(DRAGGING)) {","                this.fire(EV_END, {","                    pageX: this.lastXY[0],","                    pageY: this.lastXY[1],","                    startTime: this._startTime,","                    endTime: this._endTime","                });","            }","            this.get(NODE).removeClass(DDM.CSS_PREFIX + '-dragging');","            this.set(DRAGGING, false);","            this.deltaXY = [0, 0];","","            return this;","        },","        /**","        * @private","        * @method _defEndFn","        * @description Handler for fixing the selection in IE","        */","        _defEndFn: function(e) {","            this._fixIEMouseUp();","            this._ev_md = null;","        },","        /**","        * @private","        * @method _prevEndFn","        * @description Handler for preventing the drag:end event. It will reset the node back to it's start position","        */","        _prevEndFn: function(e) {","            this._fixIEMouseUp();","            //Bug #1852577","            this.get(DRAG_NODE).setXY(this.nodeXY);","            this._ev_md = null;","            this.region = null;","        },","        /**","        * @private","        * @method _align","        * @description Calculates the offsets and set's the XY that the element will move to.","        * @param {Array} xy The xy coords to align with.","        */","        _align: function(xy) {","            this.fire(EV_ALIGN, {pageX: xy[0], pageY: xy[1] });","        },","        /**","        * @private","        * @method _defAlignFn","        * @description Calculates the offsets and set's the XY that the element will move to.","        * @param {EventFacade} e The drag:align event.","        */","        _defAlignFn: function(e) {","            this.actXY = [e.pageX - this.deltaXY[0], e.pageY - this.deltaXY[1]];","        },","        /**","        * @private","        * @method _alignNode","        * @description This method performs the alignment before the element move.","        * @param {Array} eXY The XY to move the element to, usually comes from the mousemove DOM event.","        */","        _alignNode: function(eXY, scroll) {","            this._align(eXY);","            if (!scroll) {","                this._moveNode();","            }","        },","        /**","        * @private","        * @method _moveNode","        * @description This method performs the actual element move.","        */","        _moveNode: function(scroll) {","            //if (!this.get(DRAGGING)) {","            //    return;","            //}","            var diffXY = [], diffXY2 = [], startXY = this.nodeXY, xy = this.actXY;","","            diffXY[0] = (xy[0] - this.lastXY[0]);","            diffXY[1] = (xy[1] - this.lastXY[1]);","","            diffXY2[0] = (xy[0] - this.nodeXY[0]);","            diffXY2[1] = (xy[1] - this.nodeXY[1]);","","","            this.region = {","                '0': xy[0], ","                '1': xy[1],","                area: 0,","                top: xy[1],","                right: xy[0] + this.get(DRAG_NODE).get(OFFSET_WIDTH),","                bottom: xy[1] + this.get(DRAG_NODE).get(OFFSET_HEIGHT),","                left: xy[0]","            };","","            this.fire(EV_DRAG, {","                pageX: xy[0],","                pageY: xy[1],","                scroll: scroll,","                info: {","                    start: startXY,","                    xy: xy,","                    delta: diffXY,","                    offset: diffXY2","                } ","            });","            ","            this.lastXY = xy;","        },","        /**","        * @private","        * @method _defDragFn","        * @description Default function for drag:drag. Fired from _moveNode.","        * @param {EventFacade} ev The drag:drag event","        */","        _defDragFn: function(e) {","            if (this.get('move')) {","                if (e.scroll && e.scroll.node) {","                    e.scroll.node.set('scrollTop', e.scroll.top);","                    e.scroll.node.set('scrollLeft', e.scroll.left);","                }","                this.get(DRAG_NODE).setXY([e.pageX, e.pageY]);","                this.realXY = [e.pageX, e.pageY];","            }","        },","        /**","        * @private","        * @method _move","        * @description Fired from DragDropMgr (DDM) on mousemove.","        * @param {EventFacade} ev The mousemove DOM event","        */","        _move: function(ev) {","            if (this.get('lock')) {","                return false;","            }","","            this.mouseXY = [ev.pageX, ev.pageY];","            if (!this._dragThreshMet) {","                var diffX = Math.abs(this.startXY[0] - ev.pageX),","                diffY = Math.abs(this.startXY[1] - ev.pageY);","                if (diffX > this.get('clickPixelThresh') || diffY > this.get('clickPixelThresh')) {","                    this._dragThreshMet = true;","                    this.start();","                    this._alignNode([ev.pageX, ev.pageY]);","                }","            } else {","                if (this._clickTimeout) {","                    this._clickTimeout.cancel();","                }","                this._alignNode([ev.pageX, ev.pageY]);","            }","        },","        /**","        * @method stopDrag","        * @description Method will forcefully stop a drag operation. For example calling this from inside an ESC keypress handler will stop this drag.","        * @return {Self}","        * @chainable","        */","        stopDrag: function() {","            if (this.get(DRAGGING)) {","                DDM._end();","            }","            return this;","        },","        /**","        * @private","        * @method destructor","        * @description Lifecycle destructor, unreg the drag from the DDM and remove listeners","        */","        destructor: function() {","            this._unprep();","            if (this.target) {","                this.target.destroy();","            }","            DDM._unregDrag(this);","        }","    });","    Y.namespace('DD');    ","    Y.DD.Drag = Drag;","","","","","}, '@VERSION@', {\"requires\": [\"dd-ddm-base\"]});"];
_yuitest_coverage["build/dd-drag/dd-drag.js"].lines = {"1":0,"17":0,"195":0,"196":0,"198":0,"199":0,"200":0,"204":0,"211":0,"213":0,"221":0,"222":0,"224":0,"225":0,"226":0,"228":0,"238":0,"239":0,"241":0,"242":0,"243":0,"245":0,"288":0,"289":0,"291":0,"293":0,"355":0,"356":0,"367":0,"378":0,"379":0,"381":0,"382":0,"383":0,"385":0,"388":0,"389":0,"390":0,"392":0,"403":0,"404":0,"405":0,"406":0,"407":0,"408":0,"410":0,"413":0,"415":0,"426":0,"427":0,"440":0,"451":0,"452":0,"454":0,"470":0,"471":0,"472":0,"482":0,"483":0,"484":0,"499":0,"500":0,"501":0,"502":0,"503":0,"506":0,"507":0,"509":0,"510":0,"511":0,"512":0,"530":0,"538":0,"546":0,"554":0,"563":0,"577":0,"578":0,"706":0,"707":0,"708":0,"709":0,"719":0,"720":0,"729":0,"743":0,"744":0,"745":0,"754":0,"755":0,"765":0,"774":0,"776":0,"777":0,"779":0,"780":0,"782":0,"783":0,"784":0,"785":0,"787":0,"790":0,"792":0,"794":0,"796":0,"805":0,"811":0,"812":0,"813":0,"814":0,"815":0,"816":0,"817":0,"819":0,"820":0,"821":0,"825":0,"827":0,"828":0,"829":0,"834":0,"835":0,"836":0,"839":0,"840":0,"841":0,"842":0,"844":0,"845":0,"851":0,"852":0,"853":0,"854":0,"855":0,"856":0,"857":0,"858":0,"862":0,"865":0,"874":0,"876":0,"878":0,"879":0,"881":0,"890":0,"891":0,"892":0,"893":0,"904":0,"905":0,"906":0,"908":0,"909":0,"910":0,"912":0,"922":0,"923":0,"925":0,"926":0,"927":0,"929":0,"930":0,"931":0,"941":0,"942":0,"943":0,"944":0,"946":0,"956":0,"957":0,"958":0,"960":0,"969":0,"971":0,"972":0,"973":0,"976":0,"978":0,"980":0,"982":0,"983":0,"988":0,"991":0,"999":0,"1000":0,"1001":0,"1002":0,"1003":0,"1004":0,"1012":0,"1013":0,"1014":0,"1015":0,"1016":0,"1017":0,"1018":0,"1019":0,"1020":0,"1021":0,"1022":0,"1023":0,"1032":0,"1033":0,"1034":0,"1036":0,"1037":0,"1038":0,"1043":0,"1044":0,"1046":0,"1047":0,"1049":0,"1050":0,"1054":0,"1063":0,"1065":0,"1074":0,"1075":0,"1076":0,"1078":0,"1080":0,"1081":0,"1088":0,"1089":0,"1090":0,"1092":0,"1100":0,"1101":0,"1109":0,"1111":0,"1112":0,"1113":0,"1122":0,"1131":0,"1140":0,"1141":0,"1142":0,"1154":0,"1156":0,"1157":0,"1159":0,"1160":0,"1163":0,"1173":0,"1185":0,"1194":0,"1195":0,"1196":0,"1197":0,"1199":0,"1200":0,"1210":0,"1211":0,"1214":0,"1215":0,"1216":0,"1218":0,"1219":0,"1220":0,"1221":0,"1224":0,"1225":0,"1227":0,"1237":0,"1238":0,"1240":0,"1248":0,"1249":0,"1250":0,"1252":0,"1255":0,"1256":0};
_yuitest_coverage["build/dd-drag/dd-drag.js"].functions = {"Drag:194":0,"setter:220":0,"setter:237":0,"setter:287":0,"setter:354":0,"setter:366":0,"(anonymous 2):382":0,"getter:377":0,"(anonymous 3):389":0,"setter:387":0,"(anonymous 4):405":0,"setter:402":0,"setter:425":0,"_canDrag:450":0,"addToGroup:469":0,"removeFromGroup:481":0,"_handleTarget:498":0,"(anonymous 5):577":0,"_createEvents:528":0,"_handleMouseUp:705":0,"_fixDragStart:718":0,"_ieSelectFix:728":0,"_fixIEMouseDown:742":0,"_fixIEMouseUp:753":0,"_handleMouseDownEvent:764":0,"_defMouseDownFn:773":0,"(anonymous 7):819":0,"(anonymous 6):812":0,"(anonymous 8):841":0,"(anonymous 9):855":0,"validClick:804":0,"_setStartPosition:873":0,"_timeoutCheck:889":0,"removeHandle:903":0,"addHandle:921":0,"removeInvalid:940":0,"addInvalid:955":0,"initializer:967":0,"_prep:998":0,"_unprep:1011":0,"start:1031":0,"end:1073":0,"_defEndFn:1099":0,"_prevEndFn:1108":0,"_align:1121":0,"_defAlignFn:1130":0,"_alignNode:1139":0,"_moveNode:1150":0,"_defDragFn:1193":0,"_move:1209":0,"stopDrag:1236":0,"destructor:1247":0,"(anonymous 1):1":0};
_yuitest_coverage["build/dd-drag/dd-drag.js"].coveredLines = 272;
_yuitest_coverage["build/dd-drag/dd-drag.js"].coveredFunctions = 53;
_yuitest_coverline("build/dd-drag/dd-drag.js", 1);
YUI.add('dd-drag', function (Y, NAME) {


    /**
     * Provides the ability to drag a Node.
     * @module dd
     * @submodule dd-drag
     */     
    /**
     * Provides the ability to drag a Node.
     * @class Drag
     * @extends Base
     * @constructor
     * @namespace DD
     */

    _yuitest_coverfunc("build/dd-drag/dd-drag.js", "(anonymous 1)", 1);
_yuitest_coverline("build/dd-drag/dd-drag.js", 17);
var DDM = Y.DD.DDM,
        NODE = 'node',
        DRAGGING = 'dragging',
        DRAG_NODE = 'dragNode',
        OFFSET_HEIGHT = 'offsetHeight',
        OFFSET_WIDTH = 'offsetWidth',        
        /**
        * @event drag:mouseup
        * @description Handles the mouseup DOM event, does nothing internally just fires.
        * @bubbles DDM
        * @type {CustomEvent}
        */
        /**
        * @event drag:mouseDown
        * @description Handles the mousedown DOM event, checks to see if you have a valid handle then starts the drag timers.
        * @preventable _defMouseDownFn
        * @param {EventFacade} event An Event Facade object with the following specific property added:
        * <dl><dt>ev</dt><dd>The original mousedown event.</dd></dl>
        * @bubbles DDM
        * @type {CustomEvent}
        */
        EV_MOUSE_DOWN = 'drag:mouseDown',
        /**
        * @event drag:afterMouseDown
        * @description Fires after the mousedown event has been cleared.
        * @param {EventFacade} event An Event Facade object with the following specific property added:
        * <dl><dt>ev</dt><dd>The original mousedown event.</dd></dl>
        * @bubbles DDM
        * @type {CustomEvent}
        */
        EV_AFTER_MOUSE_DOWN = 'drag:afterMouseDown',
        /**
        * @event drag:removeHandle
        * @description Fires after a handle is removed.
        * @param {EventFacade} event An Event Facade object with the following specific property added:
        * <dl><dt>handle</dt><dd>The handle that was removed.</dd></dl>
        * @bubbles DDM
        * @type {CustomEvent}
        */
        EV_REMOVE_HANDLE = 'drag:removeHandle',
        /**
        * @event drag:addHandle
        * @description Fires after a handle is added.
        * @param {EventFacade} event An Event Facade object with the following specific property added:
        * <dl><dt>handle</dt><dd>The handle that was added.</dd></dl>
        * @bubbles DDM
        * @type {CustomEvent}
        */
        EV_ADD_HANDLE = 'drag:addHandle',
        /**
        * @event drag:removeInvalid
        * @description Fires after an invalid selector is removed.
        * @param {EventFacade} event An Event Facade object with the following specific property added:
        * <dl><dt>handle</dt><dd>The handle that was removed.</dd></dl>
        * @bubbles DDM
        * @type {CustomEvent}
        */
        EV_REMOVE_INVALID = 'drag:removeInvalid',
        /**
        * @event drag:addInvalid
        * @description Fires after an invalid selector is added.
        * @param {EventFacade} event An Event Facade object with the following specific property added:
        * <dl><dt>handle</dt><dd>The handle that was added.</dd></dl>
        * @bubbles DDM
        * @type {CustomEvent}
        */
        EV_ADD_INVALID = 'drag:addInvalid',
        /**
        * @event drag:start
        * @description Fires at the start of a drag operation.
        * @param {EventFacade} event An Event Facade object with the following specific property added:
        * <dl>
        * <dt>pageX</dt><dd>The original node position X.</dd>
        * <dt>pageY</dt><dd>The original node position Y.</dd>
        * <dt>startTime</dt><dd>The startTime of the event. getTime on the current Date object.</dd>
        * </dl>
        * @bubbles DDM
        * @type {CustomEvent}
        */
        EV_START = 'drag:start',
        /**
        * @event drag:end
        * @description Fires at the end of a drag operation.
        * @param {EventFacade} event An Event Facade object with the following specific property added:
        * <dl>
        * <dt>pageX</dt><dd>The current node position X.</dd>
        * <dt>pageY</dt><dd>The current node position Y.</dd>
        * <dt>startTime</dt><dd>The startTime of the event, from the start event.</dd>
        * <dt>endTime</dt><dd>The endTime of the event. getTime on the current Date object.</dd>
        * </dl>
        * @bubbles DDM
        * @type {CustomEvent}
        */
        EV_END = 'drag:end',
        /**
        * @event drag:drag
        * @description Fires every mousemove during a drag operation.
        * @param {EventFacade} event An Event Facade object with the following specific property added:
        * <dl>
        * <dt>pageX</dt><dd>The current node position X.</dd>
        * <dt>pageY</dt><dd>The current node position Y.</dd>
        * <dt>scroll</dt><dd>Should a scroll action occur.</dd>
        * <dt>info</dt><dd>Object hash containing calculated XY arrays: start, xy, delta, offset</dd>
        * </dl>
        * @bubbles DDM
        * @type {CustomEvent}
        */
        EV_DRAG = 'drag:drag',
        /**
        * @event drag:align
        * @preventable _defAlignFn
        * @description Fires when this node is aligned.
        * @param {EventFacade} event An Event Facade object with the following specific property added:
        * <dl>
        * <dt>pageX</dt><dd>The current node position X.</dd>
        * <dt>pageY</dt><dd>The current node position Y.</dd>
        * </dl>
        * @bubbles DDM
        * @type {CustomEvent}
        */
        EV_ALIGN = 'drag:align',
        /**
        * @event drag:over
        * @description Fires when this node is over a Drop Target. (Fired from dd-drop)
        * @param {EventFacade} event An Event Facade object with the following specific property added:
        * <dl>
        * <dt>drop</dt><dd>The drop object at the time of the event.</dd>
        * <dt>drag</dt><dd>The drag object at the time of the event.</dd>
        * </dl>
        * @bubbles DDM
        * @type {CustomEvent}
        */
        /**
        * @event drag:enter
        * @description Fires when this node enters a Drop Target. (Fired from dd-drop)
        * @param {EventFacade} event An Event Facade object with the following specific property added:
        * <dl>
        * <dt>drop</dt><dd>The drop object at the time of the event.</dd>
        * <dt>drag</dt><dd>The drag object at the time of the event.</dd>
        * </dl>
        * @bubbles DDM
        * @type {CustomEvent}
        */
        /**
        * @event drag:exit
        * @description Fires when this node exits a Drop Target. (Fired from dd-drop)
        * @param {EventFacade} event An Event Facade object with the following specific property added:
        * <dl>
        * <dt>drop</dt><dd>The drop object at the time of the event.</dd>
        * </dl>
        * @bubbles DDM
        * @type {CustomEvent}
        */
        /**
        * @event drag:drophit
        * @description Fires when this node is dropped on a valid Drop Target. (Fired from dd-ddm-drop)
        * @param {EventFacade} event An Event Facade object with the following specific property added:
        * <dl>
        * <dt>drop</dt><dd>The best guess on what was dropped on.</dd>
        * <dt>drag</dt><dd>The drag object at the time of the event.</dd>
        * <dt>others</dt><dd>An array of all the other drop targets that was dropped on.</dd>
        * </dl>
        * @bubbles DDM
        * @type {CustomEvent}
        */
        /**
        * @event drag:dropmiss
        * @description Fires when this node is dropped on an invalid Drop Target. (Fired from dd-ddm-drop)
        * @param {EventFacade} event An Event Facade object with the following specific property added:
        * <dl>
        * <dt>pageX</dt><dd>The current node position X.</dd>
        * <dt>pageY</dt><dd>The current node position Y.</dd>
        * </dl>
        * @bubbles DDM
        * @type {CustomEvent}
        */
    
    Drag = function(o) {
        _yuitest_coverfunc("build/dd-drag/dd-drag.js", "Drag", 194);
_yuitest_coverline("build/dd-drag/dd-drag.js", 195);
this._lazyAddAttrs = false;
        _yuitest_coverline("build/dd-drag/dd-drag.js", 196);
Drag.superclass.constructor.apply(this, arguments);

        _yuitest_coverline("build/dd-drag/dd-drag.js", 198);
var valid = DDM._regDrag(this);
        _yuitest_coverline("build/dd-drag/dd-drag.js", 199);
if (!valid) {
            _yuitest_coverline("build/dd-drag/dd-drag.js", 200);
Y.error('Failed to register node, already in use: ' + o.node);
        }
    };

    _yuitest_coverline("build/dd-drag/dd-drag.js", 204);
Drag.NAME = 'drag';
    
    /**
    * This property defaults to "mousedown", but when drag-gestures is loaded, it is changed to "gesturemovestart"
    * @static
    * @property START_EVENT
    */
    _yuitest_coverline("build/dd-drag/dd-drag.js", 211);
Drag.START_EVENT = 'mousedown';

    _yuitest_coverline("build/dd-drag/dd-drag.js", 213);
Drag.ATTRS = {
        /**
        * @attribute node
        * @description Y.Node instance to use as the element to initiate a drag operation
        * @type Node
        */
        node: {
            setter: function(node) {
                _yuitest_coverfunc("build/dd-drag/dd-drag.js", "setter", 220);
_yuitest_coverline("build/dd-drag/dd-drag.js", 221);
if (this._canDrag(node)) {
                    _yuitest_coverline("build/dd-drag/dd-drag.js", 222);
return node;
                }
                _yuitest_coverline("build/dd-drag/dd-drag.js", 224);
var n = Y.one(node);
                _yuitest_coverline("build/dd-drag/dd-drag.js", 225);
if (!n) {
                    _yuitest_coverline("build/dd-drag/dd-drag.js", 226);
Y.error('DD.Drag: Invalid Node Given: ' + node);
                }
                _yuitest_coverline("build/dd-drag/dd-drag.js", 228);
return n;
            }
        },
        /**
        * @attribute dragNode
        * @description Y.Node instance to use as the draggable element, defaults to node
        * @type Node
        */
        dragNode: {
            setter: function(node) {
                _yuitest_coverfunc("build/dd-drag/dd-drag.js", "setter", 237);
_yuitest_coverline("build/dd-drag/dd-drag.js", 238);
if (this._canDrag(node)) {
                    _yuitest_coverline("build/dd-drag/dd-drag.js", 239);
return node;
                }
                _yuitest_coverline("build/dd-drag/dd-drag.js", 241);
var n = Y.one(node);
                _yuitest_coverline("build/dd-drag/dd-drag.js", 242);
if (!n) {
                    _yuitest_coverline("build/dd-drag/dd-drag.js", 243);
Y.error('DD.Drag: Invalid dragNode Given: ' + node);
                }
                _yuitest_coverline("build/dd-drag/dd-drag.js", 245);
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
        * @attribute startCentered
        * @description Center the dragNode to the mouse position on drag:start: default false
        * @type Boolean
        */
        startCentered: {
            value: false
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
            setter: function(lock) {
                _yuitest_coverfunc("build/dd-drag/dd-drag.js", "setter", 287);
_yuitest_coverline("build/dd-drag/dd-drag.js", 288);
if (lock) {
                    _yuitest_coverline("build/dd-drag/dd-drag.js", 289);
this.get(NODE).addClass(DDM.CSS_PREFIX + '-locked');
                } else {
                    _yuitest_coverline("build/dd-drag/dd-drag.js", 291);
this.get(NODE).removeClass(DDM.CSS_PREFIX + '-locked');
                }
                _yuitest_coverline("build/dd-drag/dd-drag.js", 293);
return lock;
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
            setter: function(config) {
                _yuitest_coverfunc("build/dd-drag/dd-drag.js", "setter", 354);
_yuitest_coverline("build/dd-drag/dd-drag.js", 355);
this._handleTarget(config);
                _yuitest_coverline("build/dd-drag/dd-drag.js", 356);
return config;
            }
        },
        /**
        * @attribute dragMode
        * @description This attribute only works if the dd-drop module is active. It will set the dragMode (point, intersect, strict) of this Drag instance.
        * @type String
        */
        dragMode: {
            value: null,
            setter: function(mode) {
                _yuitest_coverfunc("build/dd-drag/dd-drag.js", "setter", 366);
_yuitest_coverline("build/dd-drag/dd-drag.js", 367);
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
            getter: function() {
                _yuitest_coverfunc("build/dd-drag/dd-drag.js", "getter", 377);
_yuitest_coverline("build/dd-drag/dd-drag.js", 378);
if (!this._groups) {
                    _yuitest_coverline("build/dd-drag/dd-drag.js", 379);
this._groups = {};
                }
                _yuitest_coverline("build/dd-drag/dd-drag.js", 381);
var ret = [];
                _yuitest_coverline("build/dd-drag/dd-drag.js", 382);
Y.each(this._groups, function(v, k) {
                    _yuitest_coverfunc("build/dd-drag/dd-drag.js", "(anonymous 2)", 382);
_yuitest_coverline("build/dd-drag/dd-drag.js", 383);
ret[ret.length] = k;
                });
                _yuitest_coverline("build/dd-drag/dd-drag.js", 385);
return ret;
            },
            setter: function(g) {
                _yuitest_coverfunc("build/dd-drag/dd-drag.js", "setter", 387);
_yuitest_coverline("build/dd-drag/dd-drag.js", 388);
this._groups = {};
                _yuitest_coverline("build/dd-drag/dd-drag.js", 389);
Y.each(g, function(v, k) {
                    _yuitest_coverfunc("build/dd-drag/dd-drag.js", "(anonymous 3)", 389);
_yuitest_coverline("build/dd-drag/dd-drag.js", 390);
this._groups[v] = true;
                }, this);
                _yuitest_coverline("build/dd-drag/dd-drag.js", 392);
return g;
            }
        },
        /**
        * @attribute handles
        * @description Array of valid handles to add. Adding something here will set all handles, even if previously added with addHandle
        * @type Array
        */
        handles: {
            value: null,
            setter: function(g) {
                _yuitest_coverfunc("build/dd-drag/dd-drag.js", "setter", 402);
_yuitest_coverline("build/dd-drag/dd-drag.js", 403);
if (g) {
                    _yuitest_coverline("build/dd-drag/dd-drag.js", 404);
this._handles = {};
                    _yuitest_coverline("build/dd-drag/dd-drag.js", 405);
Y.each(g, function(v, k) {
                        _yuitest_coverfunc("build/dd-drag/dd-drag.js", "(anonymous 4)", 405);
_yuitest_coverline("build/dd-drag/dd-drag.js", 406);
var key = v;
                        _yuitest_coverline("build/dd-drag/dd-drag.js", 407);
if (v instanceof Y.Node || v instanceof Y.NodeList) {
                            _yuitest_coverline("build/dd-drag/dd-drag.js", 408);
key = v._yuid;
                        }
                        _yuitest_coverline("build/dd-drag/dd-drag.js", 410);
this._handles[key] = v;
                    }, this);
                } else {
                    _yuitest_coverline("build/dd-drag/dd-drag.js", 413);
this._handles = null;
                }
                _yuitest_coverline("build/dd-drag/dd-drag.js", 415);
return g;
            }
        },
        /**
        * @deprecated
        * @attribute bubbles
        * @description Controls the default bubble parent for this Drag instance. Default: Y.DD.DDM. Set to false to disable bubbling. Use bubbleTargets in config
        * @type Object
        */
        bubbles: {
            setter: function(t) {
                _yuitest_coverfunc("build/dd-drag/dd-drag.js", "setter", 425);
_yuitest_coverline("build/dd-drag/dd-drag.js", 426);
this.addTarget(t);
                _yuitest_coverline("build/dd-drag/dd-drag.js", 427);
return t;
            }
        },
        /**
        * @attribute haltDown
        * @description Should the mousedown event be halted. Default: true
        * @type Boolean
        */
        haltDown: {
            value: true
        }
    };

    _yuitest_coverline("build/dd-drag/dd-drag.js", 440);
Y.extend(Drag, Y.Base, {
        /**
        * Checks the object for the methods needed to drag the object around. 
        * Normally this would be a node instance, but in the case of Graphics, it
        * may be an SVG node or something similar.
        * @method _canDrag
        * @private
        * @param {Object} n The object to check
        * @return {Boolean} True or false if the Object contains the methods needed to Drag
        */
        _canDrag: function(n) {
            _yuitest_coverfunc("build/dd-drag/dd-drag.js", "_canDrag", 450);
_yuitest_coverline("build/dd-drag/dd-drag.js", 451);
if (n && n.setXY && n.getXY && n.test && n.contains) {
                _yuitest_coverline("build/dd-drag/dd-drag.js", 452);
return true;
            }
            _yuitest_coverline("build/dd-drag/dd-drag.js", 454);
return false;
        },
        /**
        * @private
        * @property _bubbleTargets
        * @description The default bubbleTarget for this object. Default: Y.DD.DDM
        */
        _bubbleTargets: Y.DD.DDM,
        /**
        * @method addToGroup
        * @description Add this Drag instance to a group, this should be used for on-the-fly group additions.
        * @param {String} g The group to add this Drag Instance to.
        * @return {Self}
        * @chainable
        */
        addToGroup: function(g) {
            _yuitest_coverfunc("build/dd-drag/dd-drag.js", "addToGroup", 469);
_yuitest_coverline("build/dd-drag/dd-drag.js", 470);
this._groups[g] = true;
            _yuitest_coverline("build/dd-drag/dd-drag.js", 471);
DDM._activateTargets();
            _yuitest_coverline("build/dd-drag/dd-drag.js", 472);
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
            _yuitest_coverfunc("build/dd-drag/dd-drag.js", "removeFromGroup", 481);
_yuitest_coverline("build/dd-drag/dd-drag.js", 482);
delete this._groups[g];
            _yuitest_coverline("build/dd-drag/dd-drag.js", 483);
DDM._activateTargets();
            _yuitest_coverline("build/dd-drag/dd-drag.js", 484);
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
        * @param {Boolean/Object} config The Config
        */
        _handleTarget: function(config) {
            _yuitest_coverfunc("build/dd-drag/dd-drag.js", "_handleTarget", 498);
_yuitest_coverline("build/dd-drag/dd-drag.js", 499);
if (Y.DD.Drop) {
                _yuitest_coverline("build/dd-drag/dd-drag.js", 500);
if (config === false) {
                    _yuitest_coverline("build/dd-drag/dd-drag.js", 501);
if (this.target) {
                        _yuitest_coverline("build/dd-drag/dd-drag.js", 502);
DDM._unregTarget(this.target);
                        _yuitest_coverline("build/dd-drag/dd-drag.js", 503);
this.target = null;
                    }
                } else {
                    _yuitest_coverline("build/dd-drag/dd-drag.js", 506);
if (!Y.Lang.isObject(config)) {
                        _yuitest_coverline("build/dd-drag/dd-drag.js", 507);
config = {};
                    }
                    _yuitest_coverline("build/dd-drag/dd-drag.js", 509);
config.bubbleTargets = config.bubbleTargets || Y.Object.values(this._yuievt.targets);
                    _yuitest_coverline("build/dd-drag/dd-drag.js", 510);
config.node = this.get(NODE);
                    _yuitest_coverline("build/dd-drag/dd-drag.js", 511);
config.groups = config.groups || this.get('groups');
                    _yuitest_coverline("build/dd-drag/dd-drag.js", 512);
this.target = new Y.DD.Drop(config);
                }
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
            
            _yuitest_coverfunc("build/dd-drag/dd-drag.js", "_createEvents", 528);
_yuitest_coverline("build/dd-drag/dd-drag.js", 530);
this.publish(EV_MOUSE_DOWN, {
                defaultFn: this._defMouseDownFn,
                queuable: false,
                emitFacade: true,
                bubbles: true,
                prefix: 'drag'
            });
            
            _yuitest_coverline("build/dd-drag/dd-drag.js", 538);
this.publish(EV_ALIGN, {
                defaultFn: this._defAlignFn,
                queuable: false,
                emitFacade: true,
                bubbles: true,
                prefix: 'drag'
            });
            
            _yuitest_coverline("build/dd-drag/dd-drag.js", 546);
this.publish(EV_DRAG, {
                defaultFn: this._defDragFn,
                queuable: false,
                emitFacade: true,
                bubbles: true,
                prefix: 'drag'
            });
            
            _yuitest_coverline("build/dd-drag/dd-drag.js", 554);
this.publish(EV_END, {
                defaultFn: this._defEndFn,
                preventedFn: this._prevEndFn,
                queuable: false,
                emitFacade: true,
                bubbles: true,
                prefix: 'drag'
            });
            
            _yuitest_coverline("build/dd-drag/dd-drag.js", 563);
var ev = [
                EV_AFTER_MOUSE_DOWN,
                EV_REMOVE_HANDLE,
                EV_ADD_HANDLE,
                EV_REMOVE_INVALID,
                EV_ADD_INVALID,
                EV_START,
                'drag:drophit',
                'drag:dropmiss',
                'drag:over',
                'drag:enter',
                'drag:exit'
            ];
            
            _yuitest_coverline("build/dd-drag/dd-drag.js", 577);
Y.each(ev, function(v, k) {
                _yuitest_coverfunc("build/dd-drag/dd-drag.js", "(anonymous 5)", 577);
_yuitest_coverline("build/dd-drag/dd-drag.js", 578);
this.publish(v, {
                    type: v,
                    emitFacade: true,
                    bubbles: true,
                    preventable: false,
                    queuable: false,
                    prefix: 'drag'
                });
            }, this);
        },
        /**
        * @private
        * @property _ev_md
        * @description A private reference to the mousedown DOM event
        * @type {EventFacade}
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
        * @description A private hash of the default invalid selector strings: {'textarea': true, 'input': true, 'a': true, 'button': true, 'select': true}
        * @type {Object}
        */
        _invalidsDefault: {'textarea': true, 'input': true, 'a': true, 'button': true, 'select': true },
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
        /**
        * @property actXY
        * @description The xy that the node will be set to. Changing this will alter the position as it's dragged.
        * @type {Array}
        */
        actXY: null,
        /**
        * @property realXY
        * @description The real xy position of the node.
        * @type {Array}
        */
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
        * @param {EventFacade} ev The Event
        */
        _handleMouseUp: function(ev) {
            _yuitest_coverfunc("build/dd-drag/dd-drag.js", "_handleMouseUp", 705);
_yuitest_coverline("build/dd-drag/dd-drag.js", 706);
this.fire('drag:mouseup');
            _yuitest_coverline("build/dd-drag/dd-drag.js", 707);
this._fixIEMouseUp();
            _yuitest_coverline("build/dd-drag/dd-drag.js", 708);
if (DDM.activeDrag) {
                _yuitest_coverline("build/dd-drag/dd-drag.js", 709);
DDM._end();
            }
        },
        /** 
        * @private
        * @method _fixDragStart
        * @description The function we use as the ondragstart handler when we start a drag in Internet Explorer. This keeps IE from blowing up on images as drag handles.
        * @param {Event} e The Event
        */
        _fixDragStart: function(e) {
            _yuitest_coverfunc("build/dd-drag/dd-drag.js", "_fixDragStart", 718);
_yuitest_coverline("build/dd-drag/dd-drag.js", 719);
if (this.validClick(e)) {
                _yuitest_coverline("build/dd-drag/dd-drag.js", 720);
e.preventDefault();
            }
        },
        /** 
        * @private
        * @method _ieSelectFix
        * @description The function we use as the onselectstart handler when we start a drag in Internet Explorer
        */
        _ieSelectFix: function() {
            _yuitest_coverfunc("build/dd-drag/dd-drag.js", "_ieSelectFix", 728);
_yuitest_coverline("build/dd-drag/dd-drag.js", 729);
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
        _fixIEMouseDown: function(e) {
            _yuitest_coverfunc("build/dd-drag/dd-drag.js", "_fixIEMouseDown", 742);
_yuitest_coverline("build/dd-drag/dd-drag.js", 743);
if (Y.UA.ie) {
                _yuitest_coverline("build/dd-drag/dd-drag.js", 744);
this._ieSelectBack = Y.config.doc.body.onselectstart;
                _yuitest_coverline("build/dd-drag/dd-drag.js", 745);
Y.config.doc.body.onselectstart = this._ieSelectFix;
            }           
        },
        /**
        * @private
        * @method _fixIEMouseUp
        * @description This method copies the _ieSelectFix property back to the onselectstart listner on the document.
        */
        _fixIEMouseUp: function() {
            _yuitest_coverfunc("build/dd-drag/dd-drag.js", "_fixIEMouseUp", 753);
_yuitest_coverline("build/dd-drag/dd-drag.js", 754);
if (Y.UA.ie) {
                _yuitest_coverline("build/dd-drag/dd-drag.js", 755);
Y.config.doc.body.onselectstart = this._ieSelectBack;
            }           
        },
        /**
        * @private
        * @method _handleMouseDownEvent
        * @description Handler for the mousedown DOM event
        * @param {EventFacade} ev  The Event
        */
        _handleMouseDownEvent: function(ev) {
            _yuitest_coverfunc("build/dd-drag/dd-drag.js", "_handleMouseDownEvent", 764);
_yuitest_coverline("build/dd-drag/dd-drag.js", 765);
this.fire(EV_MOUSE_DOWN, { ev: ev });
        },
        /**
        * @private
        * @method _defMouseDownFn
        * @description Handler for the mousedown DOM event
        * @param {EventFacade} e  The Event
        */
        _defMouseDownFn: function(e) {
            _yuitest_coverfunc("build/dd-drag/dd-drag.js", "_defMouseDownFn", 773);
_yuitest_coverline("build/dd-drag/dd-drag.js", 774);
var ev = e.ev;

            _yuitest_coverline("build/dd-drag/dd-drag.js", 776);
this._dragThreshMet = false;
            _yuitest_coverline("build/dd-drag/dd-drag.js", 777);
this._ev_md = ev;
            
            _yuitest_coverline("build/dd-drag/dd-drag.js", 779);
if (this.get('primaryButtonOnly') && ev.button > 1) {
                _yuitest_coverline("build/dd-drag/dd-drag.js", 780);
return false;
            }
            _yuitest_coverline("build/dd-drag/dd-drag.js", 782);
if (this.validClick(ev)) {
                _yuitest_coverline("build/dd-drag/dd-drag.js", 783);
this._fixIEMouseDown(ev);
                _yuitest_coverline("build/dd-drag/dd-drag.js", 784);
if (this.get('haltDown')) {
                    _yuitest_coverline("build/dd-drag/dd-drag.js", 785);
ev.halt();
                } else {
                    _yuitest_coverline("build/dd-drag/dd-drag.js", 787);
ev.preventDefault();
                }
                
                _yuitest_coverline("build/dd-drag/dd-drag.js", 790);
this._setStartPosition([ev.pageX, ev.pageY]);

                _yuitest_coverline("build/dd-drag/dd-drag.js", 792);
DDM.activeDrag = this;
                
                _yuitest_coverline("build/dd-drag/dd-drag.js", 794);
this._clickTimeout = Y.later(this.get('clickTimeThresh'), this, this._timeoutCheck);
            }
            _yuitest_coverline("build/dd-drag/dd-drag.js", 796);
this.fire(EV_AFTER_MOUSE_DOWN, { ev: ev });
        },
        /**
        * @method validClick
        * @description Method first checks to see if we have handles, if so it validates the click against the handle. Then if it finds a valid handle, it checks it against the invalid handles list. Returns true if a good handle was used, false otherwise.
        * @param {EventFacade} ev  The Event
        * @return {Boolean}
        */
        validClick: function(ev) {
            _yuitest_coverfunc("build/dd-drag/dd-drag.js", "validClick", 804);
_yuitest_coverline("build/dd-drag/dd-drag.js", 805);
var r = false, n = false,
            tar = ev.target,
            hTest = null,
            els = null,
            nlist = null,
            set = false;
            _yuitest_coverline("build/dd-drag/dd-drag.js", 811);
if (this._handles) {
                _yuitest_coverline("build/dd-drag/dd-drag.js", 812);
Y.each(this._handles, function(i, n) {
                    _yuitest_coverfunc("build/dd-drag/dd-drag.js", "(anonymous 6)", 812);
_yuitest_coverline("build/dd-drag/dd-drag.js", 813);
if (i instanceof Y.Node || i instanceof Y.NodeList) {
                        _yuitest_coverline("build/dd-drag/dd-drag.js", 814);
if (!r) {
                            _yuitest_coverline("build/dd-drag/dd-drag.js", 815);
nlist = i;
                            _yuitest_coverline("build/dd-drag/dd-drag.js", 816);
if (nlist instanceof Y.Node) {
                                _yuitest_coverline("build/dd-drag/dd-drag.js", 817);
nlist = new Y.NodeList(i._node);
                            }
                            _yuitest_coverline("build/dd-drag/dd-drag.js", 819);
nlist.each(function(nl) {
                                _yuitest_coverfunc("build/dd-drag/dd-drag.js", "(anonymous 7)", 819);
_yuitest_coverline("build/dd-drag/dd-drag.js", 820);
if (nl.contains(tar)) {
                                    _yuitest_coverline("build/dd-drag/dd-drag.js", 821);
r = true;
                                }
                            });
                        }
                    } else {_yuitest_coverline("build/dd-drag/dd-drag.js", 825);
if (Y.Lang.isString(n)) {
                        //Am I this or am I inside this
                        _yuitest_coverline("build/dd-drag/dd-drag.js", 827);
if (tar.test(n + ', ' + n + ' *') && !hTest) {
                            _yuitest_coverline("build/dd-drag/dd-drag.js", 828);
hTest = n;
                            _yuitest_coverline("build/dd-drag/dd-drag.js", 829);
r = true;
                        }
                    }}
                });
            } else {
                _yuitest_coverline("build/dd-drag/dd-drag.js", 834);
n = this.get(NODE);
                _yuitest_coverline("build/dd-drag/dd-drag.js", 835);
if (n.contains(tar) || n.compareTo(tar)) {
                    _yuitest_coverline("build/dd-drag/dd-drag.js", 836);
r = true;
                }
            }
            _yuitest_coverline("build/dd-drag/dd-drag.js", 839);
if (r) {
                _yuitest_coverline("build/dd-drag/dd-drag.js", 840);
if (this._invalids) {
                    _yuitest_coverline("build/dd-drag/dd-drag.js", 841);
Y.each(this._invalids, function(i, n) {
                        _yuitest_coverfunc("build/dd-drag/dd-drag.js", "(anonymous 8)", 841);
_yuitest_coverline("build/dd-drag/dd-drag.js", 842);
if (Y.Lang.isString(n)) {
                            //Am I this or am I inside this
                            _yuitest_coverline("build/dd-drag/dd-drag.js", 844);
if (tar.test(n + ', ' + n + ' *')) {
                                _yuitest_coverline("build/dd-drag/dd-drag.js", 845);
r = false;
                            }
                        }
                    });
                }
            }
            _yuitest_coverline("build/dd-drag/dd-drag.js", 851);
if (r) {
                _yuitest_coverline("build/dd-drag/dd-drag.js", 852);
if (hTest) {
                    _yuitest_coverline("build/dd-drag/dd-drag.js", 853);
els = ev.currentTarget.all(hTest);
                    _yuitest_coverline("build/dd-drag/dd-drag.js", 854);
set = false;
                    _yuitest_coverline("build/dd-drag/dd-drag.js", 855);
els.each(function(n, i) {
                        _yuitest_coverfunc("build/dd-drag/dd-drag.js", "(anonymous 9)", 855);
_yuitest_coverline("build/dd-drag/dd-drag.js", 856);
if ((n.contains(tar) || n.compareTo(tar)) && !set) {
                            _yuitest_coverline("build/dd-drag/dd-drag.js", 857);
set = true;
                            _yuitest_coverline("build/dd-drag/dd-drag.js", 858);
this.set('activeHandle', n);
                        }
                    }, this);
                } else {
                    _yuitest_coverline("build/dd-drag/dd-drag.js", 862);
this.set('activeHandle', this.get(NODE));
                }
            }
            _yuitest_coverline("build/dd-drag/dd-drag.js", 865);
return r;
        },
        /**
        * @private
        * @method _setStartPosition
        * @description Sets the current position of the Element and calculates the offset
        * @param {Array} xy The XY coords to set the position to.
        */
        _setStartPosition: function(xy) {
            _yuitest_coverfunc("build/dd-drag/dd-drag.js", "_setStartPosition", 873);
_yuitest_coverline("build/dd-drag/dd-drag.js", 874);
this.startXY = xy;
            
            _yuitest_coverline("build/dd-drag/dd-drag.js", 876);
this.nodeXY = this.lastXY = this.realXY = this.get(NODE).getXY();
            
            _yuitest_coverline("build/dd-drag/dd-drag.js", 878);
if (this.get('offsetNode')) {
                _yuitest_coverline("build/dd-drag/dd-drag.js", 879);
this.deltaXY = [(this.startXY[0] - this.nodeXY[0]), (this.startXY[1] - this.nodeXY[1])];
            } else {
                _yuitest_coverline("build/dd-drag/dd-drag.js", 881);
this.deltaXY = [0, 0];
            }
        },
        /**
        * @private
        * @method _timeoutCheck
        * @description The method passed to setTimeout to determine if the clickTimeThreshold was met.
        */
        _timeoutCheck: function() {
            _yuitest_coverfunc("build/dd-drag/dd-drag.js", "_timeoutCheck", 889);
_yuitest_coverline("build/dd-drag/dd-drag.js", 890);
if (!this.get('lock') && !this._dragThreshMet && this._ev_md) {
                _yuitest_coverline("build/dd-drag/dd-drag.js", 891);
this._fromTimeout = this._dragThreshMet = true;
                _yuitest_coverline("build/dd-drag/dd-drag.js", 892);
this.start();
                _yuitest_coverline("build/dd-drag/dd-drag.js", 893);
this._alignNode([this._ev_md.pageX, this._ev_md.pageY], true);
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
            _yuitest_coverfunc("build/dd-drag/dd-drag.js", "removeHandle", 903);
_yuitest_coverline("build/dd-drag/dd-drag.js", 904);
var key = str;
            _yuitest_coverline("build/dd-drag/dd-drag.js", 905);
if (str instanceof Y.Node || str instanceof Y.NodeList) {
                _yuitest_coverline("build/dd-drag/dd-drag.js", 906);
key = str._yuid;
            }
            _yuitest_coverline("build/dd-drag/dd-drag.js", 908);
if (this._handles[key]) {
                _yuitest_coverline("build/dd-drag/dd-drag.js", 909);
delete this._handles[key];
                _yuitest_coverline("build/dd-drag/dd-drag.js", 910);
this.fire(EV_REMOVE_HANDLE, { handle: str });
            }
            _yuitest_coverline("build/dd-drag/dd-drag.js", 912);
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
            _yuitest_coverfunc("build/dd-drag/dd-drag.js", "addHandle", 921);
_yuitest_coverline("build/dd-drag/dd-drag.js", 922);
if (!this._handles) {
                _yuitest_coverline("build/dd-drag/dd-drag.js", 923);
this._handles = {};
            }
            _yuitest_coverline("build/dd-drag/dd-drag.js", 925);
var key = str;
            _yuitest_coverline("build/dd-drag/dd-drag.js", 926);
if (str instanceof Y.Node || str instanceof Y.NodeList) {
                _yuitest_coverline("build/dd-drag/dd-drag.js", 927);
key = str._yuid;
            }
            _yuitest_coverline("build/dd-drag/dd-drag.js", 929);
this._handles[key] = str;
            _yuitest_coverline("build/dd-drag/dd-drag.js", 930);
this.fire(EV_ADD_HANDLE, { handle: str });
            _yuitest_coverline("build/dd-drag/dd-drag.js", 931);
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
            _yuitest_coverfunc("build/dd-drag/dd-drag.js", "removeInvalid", 940);
_yuitest_coverline("build/dd-drag/dd-drag.js", 941);
if (this._invalids[str]) {
                _yuitest_coverline("build/dd-drag/dd-drag.js", 942);
this._invalids[str] = null;
                _yuitest_coverline("build/dd-drag/dd-drag.js", 943);
delete this._invalids[str];
                _yuitest_coverline("build/dd-drag/dd-drag.js", 944);
this.fire(EV_REMOVE_INVALID, { handle: str });
            }
            _yuitest_coverline("build/dd-drag/dd-drag.js", 946);
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
            _yuitest_coverfunc("build/dd-drag/dd-drag.js", "addInvalid", 955);
_yuitest_coverline("build/dd-drag/dd-drag.js", 956);
if (Y.Lang.isString(str)) {
                _yuitest_coverline("build/dd-drag/dd-drag.js", 957);
this._invalids[str] = true;
                _yuitest_coverline("build/dd-drag/dd-drag.js", 958);
this.fire(EV_ADD_INVALID, { handle: str });
            }
            _yuitest_coverline("build/dd-drag/dd-drag.js", 960);
return this;
        },
        /**
        * @private
        * @method initializer
        * @description Internal init handler
        */
        initializer: function(cfg) {

            _yuitest_coverfunc("build/dd-drag/dd-drag.js", "initializer", 967);
_yuitest_coverline("build/dd-drag/dd-drag.js", 969);
this.get(NODE).dd = this;

            _yuitest_coverline("build/dd-drag/dd-drag.js", 971);
if (!this.get(NODE).get('id')) {
                _yuitest_coverline("build/dd-drag/dd-drag.js", 972);
var id = Y.stamp(this.get(NODE));
                _yuitest_coverline("build/dd-drag/dd-drag.js", 973);
this.get(NODE).set('id', id);
            }

            _yuitest_coverline("build/dd-drag/dd-drag.js", 976);
this.actXY = [];
            
            _yuitest_coverline("build/dd-drag/dd-drag.js", 978);
this._invalids = Y.clone(this._invalidsDefault, true);

            _yuitest_coverline("build/dd-drag/dd-drag.js", 980);
this._createEvents();
            
            _yuitest_coverline("build/dd-drag/dd-drag.js", 982);
if (!this.get(DRAG_NODE)) {
                _yuitest_coverline("build/dd-drag/dd-drag.js", 983);
this.set(DRAG_NODE, this.get(NODE));
            }

            //Fix for #2528096
            //Don't prep the DD instance until all plugins are loaded.
            _yuitest_coverline("build/dd-drag/dd-drag.js", 988);
this.on('initializedChange', Y.bind(this._prep, this));

            //Shouldn't have to do this..
            _yuitest_coverline("build/dd-drag/dd-drag.js", 991);
this.set('groups', this.get('groups'));
        },
        /**
        * @private
        * @method _prep
        * @description Attach event listners and add classname
        */
        _prep: function() {
            _yuitest_coverfunc("build/dd-drag/dd-drag.js", "_prep", 998);
_yuitest_coverline("build/dd-drag/dd-drag.js", 999);
this._dragThreshMet = false;
            _yuitest_coverline("build/dd-drag/dd-drag.js", 1000);
var node = this.get(NODE);
            _yuitest_coverline("build/dd-drag/dd-drag.js", 1001);
node.addClass(DDM.CSS_PREFIX + '-draggable');
            _yuitest_coverline("build/dd-drag/dd-drag.js", 1002);
node.on(Drag.START_EVENT, Y.bind(this._handleMouseDownEvent, this));
            _yuitest_coverline("build/dd-drag/dd-drag.js", 1003);
node.on('mouseup', Y.bind(this._handleMouseUp, this));
            _yuitest_coverline("build/dd-drag/dd-drag.js", 1004);
node.on('dragstart', Y.bind(this._fixDragStart, this));
        },
        /**
        * @private
        * @method _unprep
        * @description Detach event listeners and remove classname
        */
        _unprep: function() {
            _yuitest_coverfunc("build/dd-drag/dd-drag.js", "_unprep", 1011);
_yuitest_coverline("build/dd-drag/dd-drag.js", 1012);
var node = this.get(NODE);
            _yuitest_coverline("build/dd-drag/dd-drag.js", 1013);
node.removeClass(DDM.CSS_PREFIX + '-draggable');
            _yuitest_coverline("build/dd-drag/dd-drag.js", 1014);
node.detachAll('mouseup');
            _yuitest_coverline("build/dd-drag/dd-drag.js", 1015);
node.detachAll('dragstart');
            _yuitest_coverline("build/dd-drag/dd-drag.js", 1016);
node.detachAll(Drag.START_EVENT);
            _yuitest_coverline("build/dd-drag/dd-drag.js", 1017);
this.mouseXY = [];
            _yuitest_coverline("build/dd-drag/dd-drag.js", 1018);
this.deltaXY = [0,0];
            _yuitest_coverline("build/dd-drag/dd-drag.js", 1019);
this.startXY = [];
            _yuitest_coverline("build/dd-drag/dd-drag.js", 1020);
this.nodeXY = [];
            _yuitest_coverline("build/dd-drag/dd-drag.js", 1021);
this.lastXY = [];
            _yuitest_coverline("build/dd-drag/dd-drag.js", 1022);
this.actXY = [];
            _yuitest_coverline("build/dd-drag/dd-drag.js", 1023);
this.realXY = [];
        },
        /**
        * @method start
        * @description Starts the drag operation
        * @return {Self}
        * @chainable
        */
        start: function() {
            _yuitest_coverfunc("build/dd-drag/dd-drag.js", "start", 1031);
_yuitest_coverline("build/dd-drag/dd-drag.js", 1032);
if (!this.get('lock') && !this.get(DRAGGING)) {
                _yuitest_coverline("build/dd-drag/dd-drag.js", 1033);
var node = this.get(NODE), ow, oh, xy;
                _yuitest_coverline("build/dd-drag/dd-drag.js", 1034);
this._startTime = (new Date()).getTime();

                _yuitest_coverline("build/dd-drag/dd-drag.js", 1036);
DDM._start();
                _yuitest_coverline("build/dd-drag/dd-drag.js", 1037);
node.addClass(DDM.CSS_PREFIX + '-dragging');
                _yuitest_coverline("build/dd-drag/dd-drag.js", 1038);
this.fire(EV_START, {
                    pageX: this.nodeXY[0],
                    pageY: this.nodeXY[1],
                    startTime: this._startTime
                });
                _yuitest_coverline("build/dd-drag/dd-drag.js", 1043);
node = this.get(DRAG_NODE);
                _yuitest_coverline("build/dd-drag/dd-drag.js", 1044);
xy = this.nodeXY;
                
                _yuitest_coverline("build/dd-drag/dd-drag.js", 1046);
ow = node.get(OFFSET_WIDTH);
                _yuitest_coverline("build/dd-drag/dd-drag.js", 1047);
oh = node.get(OFFSET_HEIGHT);
                
                _yuitest_coverline("build/dd-drag/dd-drag.js", 1049);
if (this.get('startCentered')) {
                    _yuitest_coverline("build/dd-drag/dd-drag.js", 1050);
this._setStartPosition([xy[0] + (ow / 2), xy[1] + (oh / 2)]);
                }
                
                
                _yuitest_coverline("build/dd-drag/dd-drag.js", 1054);
this.region = {
                    '0': xy[0], 
                    '1': xy[1],
                    area: 0,
                    top: xy[1],
                    right: xy[0] + ow,
                    bottom: xy[1] + oh,
                    left: xy[0]
                };
                _yuitest_coverline("build/dd-drag/dd-drag.js", 1063);
this.set(DRAGGING, true);
            }
            _yuitest_coverline("build/dd-drag/dd-drag.js", 1065);
return this;
        },
        /**
        * @method end
        * @description Ends the drag operation
        * @return {Self}
        * @chainable
        */
        end: function() {
            _yuitest_coverfunc("build/dd-drag/dd-drag.js", "end", 1073);
_yuitest_coverline("build/dd-drag/dd-drag.js", 1074);
this._endTime = (new Date()).getTime();
            _yuitest_coverline("build/dd-drag/dd-drag.js", 1075);
if (this._clickTimeout) {
                _yuitest_coverline("build/dd-drag/dd-drag.js", 1076);
this._clickTimeout.cancel();
            }
            _yuitest_coverline("build/dd-drag/dd-drag.js", 1078);
this._dragThreshMet = this._fromTimeout = false;

            _yuitest_coverline("build/dd-drag/dd-drag.js", 1080);
if (!this.get('lock') && this.get(DRAGGING)) {
                _yuitest_coverline("build/dd-drag/dd-drag.js", 1081);
this.fire(EV_END, {
                    pageX: this.lastXY[0],
                    pageY: this.lastXY[1],
                    startTime: this._startTime,
                    endTime: this._endTime
                });
            }
            _yuitest_coverline("build/dd-drag/dd-drag.js", 1088);
this.get(NODE).removeClass(DDM.CSS_PREFIX + '-dragging');
            _yuitest_coverline("build/dd-drag/dd-drag.js", 1089);
this.set(DRAGGING, false);
            _yuitest_coverline("build/dd-drag/dd-drag.js", 1090);
this.deltaXY = [0, 0];

            _yuitest_coverline("build/dd-drag/dd-drag.js", 1092);
return this;
        },
        /**
        * @private
        * @method _defEndFn
        * @description Handler for fixing the selection in IE
        */
        _defEndFn: function(e) {
            _yuitest_coverfunc("build/dd-drag/dd-drag.js", "_defEndFn", 1099);
_yuitest_coverline("build/dd-drag/dd-drag.js", 1100);
this._fixIEMouseUp();
            _yuitest_coverline("build/dd-drag/dd-drag.js", 1101);
this._ev_md = null;
        },
        /**
        * @private
        * @method _prevEndFn
        * @description Handler for preventing the drag:end event. It will reset the node back to it's start position
        */
        _prevEndFn: function(e) {
            _yuitest_coverfunc("build/dd-drag/dd-drag.js", "_prevEndFn", 1108);
_yuitest_coverline("build/dd-drag/dd-drag.js", 1109);
this._fixIEMouseUp();
            //Bug #1852577
            _yuitest_coverline("build/dd-drag/dd-drag.js", 1111);
this.get(DRAG_NODE).setXY(this.nodeXY);
            _yuitest_coverline("build/dd-drag/dd-drag.js", 1112);
this._ev_md = null;
            _yuitest_coverline("build/dd-drag/dd-drag.js", 1113);
this.region = null;
        },
        /**
        * @private
        * @method _align
        * @description Calculates the offsets and set's the XY that the element will move to.
        * @param {Array} xy The xy coords to align with.
        */
        _align: function(xy) {
            _yuitest_coverfunc("build/dd-drag/dd-drag.js", "_align", 1121);
_yuitest_coverline("build/dd-drag/dd-drag.js", 1122);
this.fire(EV_ALIGN, {pageX: xy[0], pageY: xy[1] });
        },
        /**
        * @private
        * @method _defAlignFn
        * @description Calculates the offsets and set's the XY that the element will move to.
        * @param {EventFacade} e The drag:align event.
        */
        _defAlignFn: function(e) {
            _yuitest_coverfunc("build/dd-drag/dd-drag.js", "_defAlignFn", 1130);
_yuitest_coverline("build/dd-drag/dd-drag.js", 1131);
this.actXY = [e.pageX - this.deltaXY[0], e.pageY - this.deltaXY[1]];
        },
        /**
        * @private
        * @method _alignNode
        * @description This method performs the alignment before the element move.
        * @param {Array} eXY The XY to move the element to, usually comes from the mousemove DOM event.
        */
        _alignNode: function(eXY, scroll) {
            _yuitest_coverfunc("build/dd-drag/dd-drag.js", "_alignNode", 1139);
_yuitest_coverline("build/dd-drag/dd-drag.js", 1140);
this._align(eXY);
            _yuitest_coverline("build/dd-drag/dd-drag.js", 1141);
if (!scroll) {
                _yuitest_coverline("build/dd-drag/dd-drag.js", 1142);
this._moveNode();
            }
        },
        /**
        * @private
        * @method _moveNode
        * @description This method performs the actual element move.
        */
        _moveNode: function(scroll) {
            //if (!this.get(DRAGGING)) {
            //    return;
            //}
            _yuitest_coverfunc("build/dd-drag/dd-drag.js", "_moveNode", 1150);
_yuitest_coverline("build/dd-drag/dd-drag.js", 1154);
var diffXY = [], diffXY2 = [], startXY = this.nodeXY, xy = this.actXY;

            _yuitest_coverline("build/dd-drag/dd-drag.js", 1156);
diffXY[0] = (xy[0] - this.lastXY[0]);
            _yuitest_coverline("build/dd-drag/dd-drag.js", 1157);
diffXY[1] = (xy[1] - this.lastXY[1]);

            _yuitest_coverline("build/dd-drag/dd-drag.js", 1159);
diffXY2[0] = (xy[0] - this.nodeXY[0]);
            _yuitest_coverline("build/dd-drag/dd-drag.js", 1160);
diffXY2[1] = (xy[1] - this.nodeXY[1]);


            _yuitest_coverline("build/dd-drag/dd-drag.js", 1163);
this.region = {
                '0': xy[0], 
                '1': xy[1],
                area: 0,
                top: xy[1],
                right: xy[0] + this.get(DRAG_NODE).get(OFFSET_WIDTH),
                bottom: xy[1] + this.get(DRAG_NODE).get(OFFSET_HEIGHT),
                left: xy[0]
            };

            _yuitest_coverline("build/dd-drag/dd-drag.js", 1173);
this.fire(EV_DRAG, {
                pageX: xy[0],
                pageY: xy[1],
                scroll: scroll,
                info: {
                    start: startXY,
                    xy: xy,
                    delta: diffXY,
                    offset: diffXY2
                } 
            });
            
            _yuitest_coverline("build/dd-drag/dd-drag.js", 1185);
this.lastXY = xy;
        },
        /**
        * @private
        * @method _defDragFn
        * @description Default function for drag:drag. Fired from _moveNode.
        * @param {EventFacade} ev The drag:drag event
        */
        _defDragFn: function(e) {
            _yuitest_coverfunc("build/dd-drag/dd-drag.js", "_defDragFn", 1193);
_yuitest_coverline("build/dd-drag/dd-drag.js", 1194);
if (this.get('move')) {
                _yuitest_coverline("build/dd-drag/dd-drag.js", 1195);
if (e.scroll && e.scroll.node) {
                    _yuitest_coverline("build/dd-drag/dd-drag.js", 1196);
e.scroll.node.set('scrollTop', e.scroll.top);
                    _yuitest_coverline("build/dd-drag/dd-drag.js", 1197);
e.scroll.node.set('scrollLeft', e.scroll.left);
                }
                _yuitest_coverline("build/dd-drag/dd-drag.js", 1199);
this.get(DRAG_NODE).setXY([e.pageX, e.pageY]);
                _yuitest_coverline("build/dd-drag/dd-drag.js", 1200);
this.realXY = [e.pageX, e.pageY];
            }
        },
        /**
        * @private
        * @method _move
        * @description Fired from DragDropMgr (DDM) on mousemove.
        * @param {EventFacade} ev The mousemove DOM event
        */
        _move: function(ev) {
            _yuitest_coverfunc("build/dd-drag/dd-drag.js", "_move", 1209);
_yuitest_coverline("build/dd-drag/dd-drag.js", 1210);
if (this.get('lock')) {
                _yuitest_coverline("build/dd-drag/dd-drag.js", 1211);
return false;
            }

            _yuitest_coverline("build/dd-drag/dd-drag.js", 1214);
this.mouseXY = [ev.pageX, ev.pageY];
            _yuitest_coverline("build/dd-drag/dd-drag.js", 1215);
if (!this._dragThreshMet) {
                _yuitest_coverline("build/dd-drag/dd-drag.js", 1216);
var diffX = Math.abs(this.startXY[0] - ev.pageX),
                diffY = Math.abs(this.startXY[1] - ev.pageY);
                _yuitest_coverline("build/dd-drag/dd-drag.js", 1218);
if (diffX > this.get('clickPixelThresh') || diffY > this.get('clickPixelThresh')) {
                    _yuitest_coverline("build/dd-drag/dd-drag.js", 1219);
this._dragThreshMet = true;
                    _yuitest_coverline("build/dd-drag/dd-drag.js", 1220);
this.start();
                    _yuitest_coverline("build/dd-drag/dd-drag.js", 1221);
this._alignNode([ev.pageX, ev.pageY]);
                }
            } else {
                _yuitest_coverline("build/dd-drag/dd-drag.js", 1224);
if (this._clickTimeout) {
                    _yuitest_coverline("build/dd-drag/dd-drag.js", 1225);
this._clickTimeout.cancel();
                }
                _yuitest_coverline("build/dd-drag/dd-drag.js", 1227);
this._alignNode([ev.pageX, ev.pageY]);
            }
        },
        /**
        * @method stopDrag
        * @description Method will forcefully stop a drag operation. For example calling this from inside an ESC keypress handler will stop this drag.
        * @return {Self}
        * @chainable
        */
        stopDrag: function() {
            _yuitest_coverfunc("build/dd-drag/dd-drag.js", "stopDrag", 1236);
_yuitest_coverline("build/dd-drag/dd-drag.js", 1237);
if (this.get(DRAGGING)) {
                _yuitest_coverline("build/dd-drag/dd-drag.js", 1238);
DDM._end();
            }
            _yuitest_coverline("build/dd-drag/dd-drag.js", 1240);
return this;
        },
        /**
        * @private
        * @method destructor
        * @description Lifecycle destructor, unreg the drag from the DDM and remove listeners
        */
        destructor: function() {
            _yuitest_coverfunc("build/dd-drag/dd-drag.js", "destructor", 1247);
_yuitest_coverline("build/dd-drag/dd-drag.js", 1248);
this._unprep();
            _yuitest_coverline("build/dd-drag/dd-drag.js", 1249);
if (this.target) {
                _yuitest_coverline("build/dd-drag/dd-drag.js", 1250);
this.target.destroy();
            }
            _yuitest_coverline("build/dd-drag/dd-drag.js", 1252);
DDM._unregDrag(this);
        }
    });
    _yuitest_coverline("build/dd-drag/dd-drag.js", 1255);
Y.namespace('DD');    
    _yuitest_coverline("build/dd-drag/dd-drag.js", 1256);
Y.DD.Drag = Drag;




}, '@VERSION@', {"requires": ["dd-ddm-base"]});
