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
_yuitest_coverage["build/dd-constrain/dd-constrain.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/dd-constrain/dd-constrain.js",
    code: []
};
_yuitest_coverage["build/dd-constrain/dd-constrain.js"].code=["YUI.add('dd-constrain', function (Y, NAME) {","","","    /**","     * The Drag & Drop Utility allows you to create a draggable interface efficiently, buffering you from browser-level abnormalities and enabling you to focus on the interesting logic surrounding your particular implementation. This component enables you to create a variety of standard draggable objects with just a few lines of code and then, using its extensive API, add your own specific implementation logic.","     * @module dd","     * @main dd","     * @submodule dd-constrain","     */","    /**","     * Plugin for the dd-drag module to add the constraining methods to it. It supports constraining to a node or viewport. It supports tick based moves and XY axis constraints.","     * @class DDConstrained","     * @extends Base","     * @constructor","     * @namespace Plugin","     */","","    var DRAG_NODE = 'dragNode',","        OFFSET_HEIGHT = 'offsetHeight',","        OFFSET_WIDTH = 'offsetWidth',","        HOST = 'host',","        TICK_X_ARRAY = 'tickXArray',","        TICK_Y_ARRAY = 'tickYArray',","        DDM = Y.DD.DDM,","        TOP = 'top',","        RIGHT = 'right',","        BOTTOM = 'bottom',","        LEFT = 'left',","        VIEW = 'view',","        proto = null,","","        /**","        * @event drag:tickAlignX","        * @description Fires when this node is aligned with the tickX value.","        * @param {EventFacade} event An Event Facade object","        * @type {CustomEvent}","        */","        EV_TICK_ALIGN_X = 'drag:tickAlignX',","","        /**","        * @event drag:tickAlignY","        * @description Fires when this node is aligned with the tickY value.","        * @param {EventFacade} event An Event Facade object","        * @type {CustomEvent}","        */","        EV_TICK_ALIGN_Y = 'drag:tickAlignY',","","        C = function(config) {","            this._lazyAddAttrs = false;","            C.superclass.constructor.apply(this, arguments);","        };","","    C.NAME = 'ddConstrained';","    /**","    * @property NS","    * @default con","    * @readonly","    * @protected","    * @static","    * @description The Constrained instance will be placed on the Drag instance under the con namespace.","    * @type {String}","*/","    C.NS = 'con';","","    C.ATTRS = {","        host: {","        },","        /**","        * @attribute stickX","        * @description Stick the drag movement to the X-Axis. Default: false","        * @type Boolean","        */","        stickX: {","            value: false","        },","        /**","        * @attribute stickY","        * @description Stick the drag movement to the Y-Axis","        * @type Boolean","        */","        stickY: {","            value: false","        },","        /**","        * @attribute tickX","        * @description The X tick offset the drag node should snap to on each drag move. False for no ticks. Default: false","        * @type Number/false","        */","        tickX: {","            value: false","        },","        /**","        * @attribute tickY","        * @description The Y tick offset the drag node should snap to on each drag move. False for no ticks. Default: false","        * @type Number/false","        */","        tickY: {","            value: false","        },","        /**","        * @attribute tickXArray","        * @description An array of page coordinates to use as X ticks for drag movement.","        * @type Array","        */","        tickXArray: {","            value: false","        },","        /**","        * @attribute tickYArray","        * @description An array of page coordinates to use as Y ticks for drag movement.","        * @type Array","        */","        tickYArray: {","            value: false","        },","        /**","        * @attribute gutter","        * @description CSS style string for the gutter of a region (supports negative values): '5 0' (sets top and bottom to 5px, left and right to 0px), '1 2 3 4' (top 1px, right 2px, bottom 3px, left 4px)","        * @type String","        */","        gutter: {","            value: '0',","            setter: function(gutter) {","                return Y.DD.DDM.cssSizestoObject(gutter);","            }","        },","        /**","        * @attribute constrain","        * @description Will attempt to constrain the drag node to the boundaries. Arguments:<br>","        * 'view': Contrain to Viewport<br>","        * '#selector_string': Constrain to this node<br>","        * '{Region Object}': An Object Literal containing a valid region (top, right, bottom, left) of page positions","        * @type {String/Object/Node}","        */","        constrain: {","            value: VIEW,","            setter: function(con) {","                var node = Y.one(con);","                if (node) {","                    con = node;","                }","                return con;","            }","        },","        /**","        * @deprecated","        * @attribute constrain2region","        * @description An Object Literal containing a valid region (top, right, bottom, left) of page positions to constrain the drag node to.","        * @type Object","        */","        constrain2region: {","            setter: function(r) {","                return this.set('constrain', r);","            }","        },","        /**","        * @deprecated","        * @attribute constrain2node","        * @description Will attempt to constrain the drag node to the boundaries of this node.","        * @type Object","        */","        constrain2node: {","            setter: function(n) {","                return this.set('constrain', Y.one(n));","            }","        },","        /**","        * @deprecated","        * @attribute constrain2view","        * @description Will attempt to constrain the drag node to the boundaries of the viewport region.","        * @type Object","        */","        constrain2view: {","            setter: function(n) {","                return this.set('constrain', VIEW);","            }","        },","        /**","        * @attribute cacheRegion","        * @description Should the region be cached for performace. Default: true","        * @type Boolean","        */","        cacheRegion: {","            value: true","        }","    };","","    proto = {","        _lastTickXFired: null,","        _lastTickYFired: null,","","        initializer: function() {","            this._createEvents();","","            this._eventHandles = [","                this.get(HOST).on('drag:end', Y.bind(this._handleEnd, this)),","                this.get(HOST).on('drag:start', Y.bind(this._handleStart, this)),","                this.get(HOST).after('drag:align', Y.bind(this.align, this)),","                this.get(HOST).after('drag:drag', Y.bind(this.drag, this))","            ];","        },","        destructor: function() {","            Y.each(","                this._eventHandles,","                function(handle, index) {","                    handle.detach();","                }","            );","","            this._eventHandles.length = 0;","        },","        /**","        * @private","        * @method _createEvents","        * @description This method creates all the events for this Event Target and publishes them so we get Event Bubbling.","        */","        _createEvents: function() {","            var ev = [","                EV_TICK_ALIGN_X,","                EV_TICK_ALIGN_Y","            ];","","            Y.each(ev, function(v, k) {","                this.publish(v, {","                    type: v,","                    emitFacade: true,","                    bubbles: true,","                    queuable: false,","                    prefix: 'drag'","                });","            }, this);","        },","        /**","        * @private","        * @method _handleEnd","        * @description Fires on drag:end","        */","        _handleEnd: function() {","            this._lastTickYFired = null;","            this._lastTickXFired = null;","        },","        /**","        * @private","        * @method _handleStart","        * @description Fires on drag:start and clears the _regionCache","        */","        _handleStart: function() {","            this.resetCache();","        },","        /**","        * @private","        * @property _regionCache","        * @description Store a cache of the region that we are constraining to","        * @type Object","        */","        _regionCache: null,","        /**","        * @private","        * @method _cacheRegion","        * @description Get's the region and caches it, called from window.resize and when the cache is null","        */","        _cacheRegion: function() {","            this._regionCache = this.get('constrain').get('region');","        },","        /**","        * @method resetCache","        * @description Reset the internal region cache.","        */","        resetCache: function() {","            this._regionCache = null;","        },","        /**","        * @private","        * @method _getConstraint","        * @description Standardizes the 'constraint' attribute","        */","        _getConstraint: function() {","            var con = this.get('constrain'),","                g = this.get('gutter'),","                region;","","            if (con) {","                if (con instanceof Y.Node) {","                    if (!this._regionCache) {","                        this._eventHandles.push(Y.on('resize', Y.bind(this._cacheRegion, this), Y.config.win));","                        this._cacheRegion();","                    }","                    region = Y.clone(this._regionCache);","                    if (!this.get('cacheRegion')) {","                        this.resetCache();","                    }","                } else if (Y.Lang.isObject(con)) {","                    region = Y.clone(con);","                }","            }","            if (!con || !region) {","                con = VIEW;","            }","            if (con === VIEW) {","                region = this.get(HOST).get(DRAG_NODE).get('viewportRegion');","            }","","            Y.each(g, function(i, n) {","                if ((n == RIGHT) || (n == BOTTOM)) {","                    region[n] -= i;","                } else {","                    region[n] += i;","                }","            });","            return region;","        },","","        /**","        * @method getRegion","        * @description Get the active region: viewport, node, custom region","        * @param {Boolean} inc Include the node's height and width","        * @return {Object} The active region.","        */","        getRegion: function(inc) {","            var r = {}, oh = null, ow = null,","                host = this.get(HOST);","","            r = this._getConstraint();","","            if (inc) {","                oh = host.get(DRAG_NODE).get(OFFSET_HEIGHT);","                ow = host.get(DRAG_NODE).get(OFFSET_WIDTH);","                r[RIGHT] = r[RIGHT] - ow;","                r[BOTTOM] = r[BOTTOM] - oh;","            }","            return r;","        },","        /**","        * @private","        * @method _checkRegion","        * @description Check if xy is inside a given region, if not change to it be inside.","        * @param {Array} _xy The XY to check if it's in the current region, if it isn't inside the region, it will reset the xy array to be inside the region.","        * @return {Array} The new XY that is inside the region","        */","        _checkRegion: function(_xy) {","            var oxy = _xy,","                r = this.getRegion(),","                host = this.get(HOST),","                oh = host.get(DRAG_NODE).get(OFFSET_HEIGHT),","                ow = host.get(DRAG_NODE).get(OFFSET_WIDTH);","","                if (oxy[1] > (r[BOTTOM] - oh)) {","                    _xy[1] = (r[BOTTOM] - oh);","                }","                if (r[TOP] > oxy[1]) {","                    _xy[1] = r[TOP];","","                }","                if (oxy[0] > (r[RIGHT] - ow)) {","                    _xy[0] = (r[RIGHT] - ow);","                }","                if (r[LEFT] > oxy[0]) {","                    _xy[0] = r[LEFT];","                }","","            return _xy;","        },","        /**","        * @method inRegion","        * @description Checks if the XY passed or the dragNode is inside the active region.","        * @param {Array} xy Optional XY to check, if not supplied this.get('dragNode').getXY() is used.","        * @return {Boolean} True if the XY is inside the region, false otherwise.","        */","        inRegion: function(xy) {","            xy = xy || this.get(HOST).get(DRAG_NODE).getXY();","","            var _xy = this._checkRegion([xy[0], xy[1]]),","                inside = false;","                if ((xy[0] === _xy[0]) && (xy[1] === _xy[1])) {","                    inside = true;","                }","            return inside;","        },","        /**","        * @method align","        * @description Modifies the Drag.actXY method from the after drag:align event. This is where the constraining happens.","        */","        align: function() {","            var host = this.get(HOST),","                _xy = [host.actXY[0], host.actXY[1]],","                r = this.getRegion(true);","","            if (this.get('stickX')) {","                _xy[1] = (host.startXY[1] - host.deltaXY[1]);","            }","            if (this.get('stickY')) {","                _xy[0] = (host.startXY[0] - host.deltaXY[0]);","            }","","            if (r) {","                _xy = this._checkRegion(_xy);","            }","","            _xy = this._checkTicks(_xy, r);","","            host.actXY = _xy;","        },","        /**","        * @method drag","        * @description Fires after drag:drag. Handle the tickX and tickX align events.","        */","        drag: function(event) {","            var host = this.get(HOST),","                xt = this.get('tickX'),","                yt = this.get('tickY'),","                _xy = [host.actXY[0], host.actXY[1]];","","            if ((Y.Lang.isNumber(xt) || this.get(TICK_X_ARRAY)) && (this._lastTickXFired !== _xy[0])) {","                this._tickAlignX();","                this._lastTickXFired = _xy[0];","            }","","            if ((Y.Lang.isNumber(yt) || this.get(TICK_Y_ARRAY)) && (this._lastTickYFired !== _xy[1])) {","                this._tickAlignY();","                this._lastTickYFired = _xy[1];","            }","        },","        /**","        * @private","        * @method _checkTicks","        * @description This method delegates the proper helper method for tick calculations","        * @param {Array} xy The XY coords for the Drag","        * @param {Object} r The optional region that we are bound to.","        * @return {Array} The calced XY coords","        */","        _checkTicks: function(xy, r) {","            var host = this.get(HOST),","                lx = (host.startXY[0] - host.deltaXY[0]),","                ly = (host.startXY[1] - host.deltaXY[1]),","                xt = this.get('tickX'),","                yt = this.get('tickY');","                if (xt && !this.get(TICK_X_ARRAY)) {","                    xy[0] = DDM._calcTicks(xy[0], lx, xt, r[LEFT], r[RIGHT]);","                }","                if (yt && !this.get(TICK_Y_ARRAY)) {","                    xy[1] = DDM._calcTicks(xy[1], ly, yt, r[TOP], r[BOTTOM]);","                }","                if (this.get(TICK_X_ARRAY)) {","                    xy[0] = DDM._calcTickArray(xy[0], this.get(TICK_X_ARRAY), r[LEFT], r[RIGHT]);","                }","                if (this.get(TICK_Y_ARRAY)) {","                    xy[1] = DDM._calcTickArray(xy[1], this.get(TICK_Y_ARRAY), r[TOP], r[BOTTOM]);","                }","","            return xy;","        },","        /**","        * @private","        * @method _tickAlignX","        * @description Fires when the actXY[0] reach a new value respecting the tickX gap.","        */","        _tickAlignX: function() {","            this.fire(EV_TICK_ALIGN_X);","        },","        /**","        * @private","        * @method _tickAlignY","        * @description Fires when the actXY[1] reach a new value respecting the tickY gap.","        */","        _tickAlignY: function() {","            this.fire(EV_TICK_ALIGN_Y);","        }","    };","","    Y.namespace('Plugin');","    Y.extend(C, Y.Base, proto);","    Y.Plugin.DDConstrained = C;","","    Y.mix(DDM, {","        /**","        * @for DDM","        * @namespace DD","        * @private","        * @method _calcTicks","        * @description Helper method to calculate the tick offsets for a given position","        * @param {Number} pos The current X or Y position","        * @param {Number} start The start X or Y position","        * @param {Number} tick The X or Y tick increment","        * @param {Number} off1 The min offset that we can't pass (region)","        * @param {Number} off2 The max offset that we can't pass (region)","        * @return {Number} The new position based on the tick calculation","        */","        _calcTicks: function(pos, start, tick, off1, off2) {","            var ix = ((pos - start) / tick),","                min = Math.floor(ix),","                max = Math.ceil(ix);","                if ((min !== 0) || (max !== 0)) {","                    if ((ix >= min) && (ix <= max)) {","                        pos = (start + (tick * min));","                        if (off1 && off2) {","                            if (pos < off1) {","                                pos = (start + (tick * (min + 1)));","                            }","                            if (pos > off2) {","                                pos = (start + (tick * (min - 1)));","                            }","                        }","                    }","                }","                return pos;","        },","        /**","        * @for DDM","        * @namespace DD","        * @private","        * @method _calcTickArray","        * @description This method is used with the tickXArray and tickYArray config options","        * @param {Number} pos The current X or Y position","        * @param {Number} ticks The array containing our custom tick positions.","        * @param {Number} off1 The min offset that we can't pass (region)","        * @param {Number} off2 The max offset that we can't pass (region)","        * @return The tick position","        */","        _calcTickArray: function(pos, ticks, off1, off2) {","            var i = 0, len = ticks.length, next = 0,","                diff1, diff2, ret;","","            if (!ticks || (ticks.length === 0)) {","                return pos;","            }","            if (ticks[0] >= pos) {","                return ticks[0];","            }","","            for (i = 0; i < len; i++) {","                next = (i + 1);","                if (ticks[next] && ticks[next] >= pos) {","                    diff1 = pos - ticks[i];","                    diff2 = ticks[next] - pos;","                    ret = (diff2 > diff1) ? ticks[i] : ticks[next];","                    if (off1 && off2) {","                        if (ret > off2) {","                            if (ticks[i]) {","                                ret = ticks[i];","                            } else {","                                ret = ticks[len - 1];","                            }","                        }","                    }","                    return ret;","                }","","            }","            return ticks[ticks.length - 1];","        }","    });","","","","}, '@VERSION@', {\"requires\": [\"dd-drag\"]});"];
_yuitest_coverage["build/dd-constrain/dd-constrain.js"].lines = {"1":0,"18":0,"49":0,"50":0,"53":0,"63":0,"65":0,"124":0,"138":0,"139":0,"140":0,"142":0,"153":0,"164":0,"175":0,"188":0,"193":0,"195":0,"203":0,"206":0,"210":0,"218":0,"223":0,"224":0,"239":0,"240":0,"248":0,"263":0,"270":0,"278":0,"282":0,"283":0,"284":0,"285":0,"286":0,"288":0,"289":0,"290":0,"292":0,"293":0,"296":0,"297":0,"299":0,"300":0,"303":0,"304":0,"305":0,"307":0,"310":0,"320":0,"323":0,"325":0,"326":0,"327":0,"328":0,"329":0,"331":0,"341":0,"347":0,"348":0,"350":0,"351":0,"354":0,"355":0,"357":0,"358":0,"361":0,"370":0,"372":0,"374":0,"375":0,"377":0,"384":0,"388":0,"389":0,"391":0,"392":0,"395":0,"396":0,"399":0,"401":0,"408":0,"413":0,"414":0,"415":0,"418":0,"419":0,"420":0,"432":0,"437":0,"438":0,"440":0,"441":0,"443":0,"444":0,"446":0,"447":0,"450":0,"458":0,"466":0,"470":0,"471":0,"472":0,"474":0,"489":0,"492":0,"493":0,"494":0,"495":0,"496":0,"497":0,"499":0,"500":0,"505":0,"520":0,"523":0,"524":0,"526":0,"527":0,"530":0,"531":0,"532":0,"533":0,"534":0,"535":0,"536":0,"537":0,"538":0,"539":0,"541":0,"545":0,"549":0};
_yuitest_coverage["build/dd-constrain/dd-constrain.js"].functions = {"C:48":0,"setter:123":0,"setter:137":0,"setter:152":0,"setter:163":0,"setter:174":0,"initializer:192":0,"(anonymous 2):205":0,"destructor:202":0,"(anonymous 3):223":0,"_createEvents:217":0,"_handleEnd:238":0,"_handleStart:247":0,"_cacheRegion:262":0,"resetCache:269":0,"(anonymous 4):303":0,"_getConstraint:277":0,"getRegion:319":0,"_checkRegion:340":0,"inRegion:369":0,"align:383":0,"drag:407":0,"_checkTicks:431":0,"_tickAlignX:457":0,"_tickAlignY:465":0,"_calcTicks:488":0,"_calcTickArray:519":0,"(anonymous 1):1":0};
_yuitest_coverage["build/dd-constrain/dd-constrain.js"].coveredLines = 132;
_yuitest_coverage["build/dd-constrain/dd-constrain.js"].coveredFunctions = 28;
_yuitest_coverline("build/dd-constrain/dd-constrain.js", 1);
YUI.add('dd-constrain', function (Y, NAME) {


    /**
     * The Drag & Drop Utility allows you to create a draggable interface efficiently, buffering you from browser-level abnormalities and enabling you to focus on the interesting logic surrounding your particular implementation. This component enables you to create a variety of standard draggable objects with just a few lines of code and then, using its extensive API, add your own specific implementation logic.
     * @module dd
     * @main dd
     * @submodule dd-constrain
     */
    /**
     * Plugin for the dd-drag module to add the constraining methods to it. It supports constraining to a node or viewport. It supports tick based moves and XY axis constraints.
     * @class DDConstrained
     * @extends Base
     * @constructor
     * @namespace Plugin
     */

    _yuitest_coverfunc("build/dd-constrain/dd-constrain.js", "(anonymous 1)", 1);
_yuitest_coverline("build/dd-constrain/dd-constrain.js", 18);
var DRAG_NODE = 'dragNode',
        OFFSET_HEIGHT = 'offsetHeight',
        OFFSET_WIDTH = 'offsetWidth',
        HOST = 'host',
        TICK_X_ARRAY = 'tickXArray',
        TICK_Y_ARRAY = 'tickYArray',
        DDM = Y.DD.DDM,
        TOP = 'top',
        RIGHT = 'right',
        BOTTOM = 'bottom',
        LEFT = 'left',
        VIEW = 'view',
        proto = null,

        /**
        * @event drag:tickAlignX
        * @description Fires when this node is aligned with the tickX value.
        * @param {EventFacade} event An Event Facade object
        * @type {CustomEvent}
        */
        EV_TICK_ALIGN_X = 'drag:tickAlignX',

        /**
        * @event drag:tickAlignY
        * @description Fires when this node is aligned with the tickY value.
        * @param {EventFacade} event An Event Facade object
        * @type {CustomEvent}
        */
        EV_TICK_ALIGN_Y = 'drag:tickAlignY',

        C = function(config) {
            _yuitest_coverfunc("build/dd-constrain/dd-constrain.js", "C", 48);
_yuitest_coverline("build/dd-constrain/dd-constrain.js", 49);
this._lazyAddAttrs = false;
            _yuitest_coverline("build/dd-constrain/dd-constrain.js", 50);
C.superclass.constructor.apply(this, arguments);
        };

    _yuitest_coverline("build/dd-constrain/dd-constrain.js", 53);
C.NAME = 'ddConstrained';
    /**
    * @property NS
    * @default con
    * @readonly
    * @protected
    * @static
    * @description The Constrained instance will be placed on the Drag instance under the con namespace.
    * @type {String}
*/
    _yuitest_coverline("build/dd-constrain/dd-constrain.js", 63);
C.NS = 'con';

    _yuitest_coverline("build/dd-constrain/dd-constrain.js", 65);
C.ATTRS = {
        host: {
        },
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
        * @attribute gutter
        * @description CSS style string for the gutter of a region (supports negative values): '5 0' (sets top and bottom to 5px, left and right to 0px), '1 2 3 4' (top 1px, right 2px, bottom 3px, left 4px)
        * @type String
        */
        gutter: {
            value: '0',
            setter: function(gutter) {
                _yuitest_coverfunc("build/dd-constrain/dd-constrain.js", "setter", 123);
_yuitest_coverline("build/dd-constrain/dd-constrain.js", 124);
return Y.DD.DDM.cssSizestoObject(gutter);
            }
        },
        /**
        * @attribute constrain
        * @description Will attempt to constrain the drag node to the boundaries. Arguments:<br>
        * 'view': Contrain to Viewport<br>
        * '#selector_string': Constrain to this node<br>
        * '{Region Object}': An Object Literal containing a valid region (top, right, bottom, left) of page positions
        * @type {String/Object/Node}
        */
        constrain: {
            value: VIEW,
            setter: function(con) {
                _yuitest_coverfunc("build/dd-constrain/dd-constrain.js", "setter", 137);
_yuitest_coverline("build/dd-constrain/dd-constrain.js", 138);
var node = Y.one(con);
                _yuitest_coverline("build/dd-constrain/dd-constrain.js", 139);
if (node) {
                    _yuitest_coverline("build/dd-constrain/dd-constrain.js", 140);
con = node;
                }
                _yuitest_coverline("build/dd-constrain/dd-constrain.js", 142);
return con;
            }
        },
        /**
        * @deprecated
        * @attribute constrain2region
        * @description An Object Literal containing a valid region (top, right, bottom, left) of page positions to constrain the drag node to.
        * @type Object
        */
        constrain2region: {
            setter: function(r) {
                _yuitest_coverfunc("build/dd-constrain/dd-constrain.js", "setter", 152);
_yuitest_coverline("build/dd-constrain/dd-constrain.js", 153);
return this.set('constrain', r);
            }
        },
        /**
        * @deprecated
        * @attribute constrain2node
        * @description Will attempt to constrain the drag node to the boundaries of this node.
        * @type Object
        */
        constrain2node: {
            setter: function(n) {
                _yuitest_coverfunc("build/dd-constrain/dd-constrain.js", "setter", 163);
_yuitest_coverline("build/dd-constrain/dd-constrain.js", 164);
return this.set('constrain', Y.one(n));
            }
        },
        /**
        * @deprecated
        * @attribute constrain2view
        * @description Will attempt to constrain the drag node to the boundaries of the viewport region.
        * @type Object
        */
        constrain2view: {
            setter: function(n) {
                _yuitest_coverfunc("build/dd-constrain/dd-constrain.js", "setter", 174);
_yuitest_coverline("build/dd-constrain/dd-constrain.js", 175);
return this.set('constrain', VIEW);
            }
        },
        /**
        * @attribute cacheRegion
        * @description Should the region be cached for performace. Default: true
        * @type Boolean
        */
        cacheRegion: {
            value: true
        }
    };

    _yuitest_coverline("build/dd-constrain/dd-constrain.js", 188);
proto = {
        _lastTickXFired: null,
        _lastTickYFired: null,

        initializer: function() {
            _yuitest_coverfunc("build/dd-constrain/dd-constrain.js", "initializer", 192);
_yuitest_coverline("build/dd-constrain/dd-constrain.js", 193);
this._createEvents();

            _yuitest_coverline("build/dd-constrain/dd-constrain.js", 195);
this._eventHandles = [
                this.get(HOST).on('drag:end', Y.bind(this._handleEnd, this)),
                this.get(HOST).on('drag:start', Y.bind(this._handleStart, this)),
                this.get(HOST).after('drag:align', Y.bind(this.align, this)),
                this.get(HOST).after('drag:drag', Y.bind(this.drag, this))
            ];
        },
        destructor: function() {
            _yuitest_coverfunc("build/dd-constrain/dd-constrain.js", "destructor", 202);
_yuitest_coverline("build/dd-constrain/dd-constrain.js", 203);
Y.each(
                this._eventHandles,
                function(handle, index) {
                    _yuitest_coverfunc("build/dd-constrain/dd-constrain.js", "(anonymous 2)", 205);
_yuitest_coverline("build/dd-constrain/dd-constrain.js", 206);
handle.detach();
                }
            );

            _yuitest_coverline("build/dd-constrain/dd-constrain.js", 210);
this._eventHandles.length = 0;
        },
        /**
        * @private
        * @method _createEvents
        * @description This method creates all the events for this Event Target and publishes them so we get Event Bubbling.
        */
        _createEvents: function() {
            _yuitest_coverfunc("build/dd-constrain/dd-constrain.js", "_createEvents", 217);
_yuitest_coverline("build/dd-constrain/dd-constrain.js", 218);
var ev = [
                EV_TICK_ALIGN_X,
                EV_TICK_ALIGN_Y
            ];

            _yuitest_coverline("build/dd-constrain/dd-constrain.js", 223);
Y.each(ev, function(v, k) {
                _yuitest_coverfunc("build/dd-constrain/dd-constrain.js", "(anonymous 3)", 223);
_yuitest_coverline("build/dd-constrain/dd-constrain.js", 224);
this.publish(v, {
                    type: v,
                    emitFacade: true,
                    bubbles: true,
                    queuable: false,
                    prefix: 'drag'
                });
            }, this);
        },
        /**
        * @private
        * @method _handleEnd
        * @description Fires on drag:end
        */
        _handleEnd: function() {
            _yuitest_coverfunc("build/dd-constrain/dd-constrain.js", "_handleEnd", 238);
_yuitest_coverline("build/dd-constrain/dd-constrain.js", 239);
this._lastTickYFired = null;
            _yuitest_coverline("build/dd-constrain/dd-constrain.js", 240);
this._lastTickXFired = null;
        },
        /**
        * @private
        * @method _handleStart
        * @description Fires on drag:start and clears the _regionCache
        */
        _handleStart: function() {
            _yuitest_coverfunc("build/dd-constrain/dd-constrain.js", "_handleStart", 247);
_yuitest_coverline("build/dd-constrain/dd-constrain.js", 248);
this.resetCache();
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
            _yuitest_coverfunc("build/dd-constrain/dd-constrain.js", "_cacheRegion", 262);
_yuitest_coverline("build/dd-constrain/dd-constrain.js", 263);
this._regionCache = this.get('constrain').get('region');
        },
        /**
        * @method resetCache
        * @description Reset the internal region cache.
        */
        resetCache: function() {
            _yuitest_coverfunc("build/dd-constrain/dd-constrain.js", "resetCache", 269);
_yuitest_coverline("build/dd-constrain/dd-constrain.js", 270);
this._regionCache = null;
        },
        /**
        * @private
        * @method _getConstraint
        * @description Standardizes the 'constraint' attribute
        */
        _getConstraint: function() {
            _yuitest_coverfunc("build/dd-constrain/dd-constrain.js", "_getConstraint", 277);
_yuitest_coverline("build/dd-constrain/dd-constrain.js", 278);
var con = this.get('constrain'),
                g = this.get('gutter'),
                region;

            _yuitest_coverline("build/dd-constrain/dd-constrain.js", 282);
if (con) {
                _yuitest_coverline("build/dd-constrain/dd-constrain.js", 283);
if (con instanceof Y.Node) {
                    _yuitest_coverline("build/dd-constrain/dd-constrain.js", 284);
if (!this._regionCache) {
                        _yuitest_coverline("build/dd-constrain/dd-constrain.js", 285);
this._eventHandles.push(Y.on('resize', Y.bind(this._cacheRegion, this), Y.config.win));
                        _yuitest_coverline("build/dd-constrain/dd-constrain.js", 286);
this._cacheRegion();
                    }
                    _yuitest_coverline("build/dd-constrain/dd-constrain.js", 288);
region = Y.clone(this._regionCache);
                    _yuitest_coverline("build/dd-constrain/dd-constrain.js", 289);
if (!this.get('cacheRegion')) {
                        _yuitest_coverline("build/dd-constrain/dd-constrain.js", 290);
this.resetCache();
                    }
                } else {_yuitest_coverline("build/dd-constrain/dd-constrain.js", 292);
if (Y.Lang.isObject(con)) {
                    _yuitest_coverline("build/dd-constrain/dd-constrain.js", 293);
region = Y.clone(con);
                }}
            }
            _yuitest_coverline("build/dd-constrain/dd-constrain.js", 296);
if (!con || !region) {
                _yuitest_coverline("build/dd-constrain/dd-constrain.js", 297);
con = VIEW;
            }
            _yuitest_coverline("build/dd-constrain/dd-constrain.js", 299);
if (con === VIEW) {
                _yuitest_coverline("build/dd-constrain/dd-constrain.js", 300);
region = this.get(HOST).get(DRAG_NODE).get('viewportRegion');
            }

            _yuitest_coverline("build/dd-constrain/dd-constrain.js", 303);
Y.each(g, function(i, n) {
                _yuitest_coverfunc("build/dd-constrain/dd-constrain.js", "(anonymous 4)", 303);
_yuitest_coverline("build/dd-constrain/dd-constrain.js", 304);
if ((n == RIGHT) || (n == BOTTOM)) {
                    _yuitest_coverline("build/dd-constrain/dd-constrain.js", 305);
region[n] -= i;
                } else {
                    _yuitest_coverline("build/dd-constrain/dd-constrain.js", 307);
region[n] += i;
                }
            });
            _yuitest_coverline("build/dd-constrain/dd-constrain.js", 310);
return region;
        },

        /**
        * @method getRegion
        * @description Get the active region: viewport, node, custom region
        * @param {Boolean} inc Include the node's height and width
        * @return {Object} The active region.
        */
        getRegion: function(inc) {
            _yuitest_coverfunc("build/dd-constrain/dd-constrain.js", "getRegion", 319);
_yuitest_coverline("build/dd-constrain/dd-constrain.js", 320);
var r = {}, oh = null, ow = null,
                host = this.get(HOST);

            _yuitest_coverline("build/dd-constrain/dd-constrain.js", 323);
r = this._getConstraint();

            _yuitest_coverline("build/dd-constrain/dd-constrain.js", 325);
if (inc) {
                _yuitest_coverline("build/dd-constrain/dd-constrain.js", 326);
oh = host.get(DRAG_NODE).get(OFFSET_HEIGHT);
                _yuitest_coverline("build/dd-constrain/dd-constrain.js", 327);
ow = host.get(DRAG_NODE).get(OFFSET_WIDTH);
                _yuitest_coverline("build/dd-constrain/dd-constrain.js", 328);
r[RIGHT] = r[RIGHT] - ow;
                _yuitest_coverline("build/dd-constrain/dd-constrain.js", 329);
r[BOTTOM] = r[BOTTOM] - oh;
            }
            _yuitest_coverline("build/dd-constrain/dd-constrain.js", 331);
return r;
        },
        /**
        * @private
        * @method _checkRegion
        * @description Check if xy is inside a given region, if not change to it be inside.
        * @param {Array} _xy The XY to check if it's in the current region, if it isn't inside the region, it will reset the xy array to be inside the region.
        * @return {Array} The new XY that is inside the region
        */
        _checkRegion: function(_xy) {
            _yuitest_coverfunc("build/dd-constrain/dd-constrain.js", "_checkRegion", 340);
_yuitest_coverline("build/dd-constrain/dd-constrain.js", 341);
var oxy = _xy,
                r = this.getRegion(),
                host = this.get(HOST),
                oh = host.get(DRAG_NODE).get(OFFSET_HEIGHT),
                ow = host.get(DRAG_NODE).get(OFFSET_WIDTH);

                _yuitest_coverline("build/dd-constrain/dd-constrain.js", 347);
if (oxy[1] > (r[BOTTOM] - oh)) {
                    _yuitest_coverline("build/dd-constrain/dd-constrain.js", 348);
_xy[1] = (r[BOTTOM] - oh);
                }
                _yuitest_coverline("build/dd-constrain/dd-constrain.js", 350);
if (r[TOP] > oxy[1]) {
                    _yuitest_coverline("build/dd-constrain/dd-constrain.js", 351);
_xy[1] = r[TOP];

                }
                _yuitest_coverline("build/dd-constrain/dd-constrain.js", 354);
if (oxy[0] > (r[RIGHT] - ow)) {
                    _yuitest_coverline("build/dd-constrain/dd-constrain.js", 355);
_xy[0] = (r[RIGHT] - ow);
                }
                _yuitest_coverline("build/dd-constrain/dd-constrain.js", 357);
if (r[LEFT] > oxy[0]) {
                    _yuitest_coverline("build/dd-constrain/dd-constrain.js", 358);
_xy[0] = r[LEFT];
                }

            _yuitest_coverline("build/dd-constrain/dd-constrain.js", 361);
return _xy;
        },
        /**
        * @method inRegion
        * @description Checks if the XY passed or the dragNode is inside the active region.
        * @param {Array} xy Optional XY to check, if not supplied this.get('dragNode').getXY() is used.
        * @return {Boolean} True if the XY is inside the region, false otherwise.
        */
        inRegion: function(xy) {
            _yuitest_coverfunc("build/dd-constrain/dd-constrain.js", "inRegion", 369);
_yuitest_coverline("build/dd-constrain/dd-constrain.js", 370);
xy = xy || this.get(HOST).get(DRAG_NODE).getXY();

            _yuitest_coverline("build/dd-constrain/dd-constrain.js", 372);
var _xy = this._checkRegion([xy[0], xy[1]]),
                inside = false;
                _yuitest_coverline("build/dd-constrain/dd-constrain.js", 374);
if ((xy[0] === _xy[0]) && (xy[1] === _xy[1])) {
                    _yuitest_coverline("build/dd-constrain/dd-constrain.js", 375);
inside = true;
                }
            _yuitest_coverline("build/dd-constrain/dd-constrain.js", 377);
return inside;
        },
        /**
        * @method align
        * @description Modifies the Drag.actXY method from the after drag:align event. This is where the constraining happens.
        */
        align: function() {
            _yuitest_coverfunc("build/dd-constrain/dd-constrain.js", "align", 383);
_yuitest_coverline("build/dd-constrain/dd-constrain.js", 384);
var host = this.get(HOST),
                _xy = [host.actXY[0], host.actXY[1]],
                r = this.getRegion(true);

            _yuitest_coverline("build/dd-constrain/dd-constrain.js", 388);
if (this.get('stickX')) {
                _yuitest_coverline("build/dd-constrain/dd-constrain.js", 389);
_xy[1] = (host.startXY[1] - host.deltaXY[1]);
            }
            _yuitest_coverline("build/dd-constrain/dd-constrain.js", 391);
if (this.get('stickY')) {
                _yuitest_coverline("build/dd-constrain/dd-constrain.js", 392);
_xy[0] = (host.startXY[0] - host.deltaXY[0]);
            }

            _yuitest_coverline("build/dd-constrain/dd-constrain.js", 395);
if (r) {
                _yuitest_coverline("build/dd-constrain/dd-constrain.js", 396);
_xy = this._checkRegion(_xy);
            }

            _yuitest_coverline("build/dd-constrain/dd-constrain.js", 399);
_xy = this._checkTicks(_xy, r);

            _yuitest_coverline("build/dd-constrain/dd-constrain.js", 401);
host.actXY = _xy;
        },
        /**
        * @method drag
        * @description Fires after drag:drag. Handle the tickX and tickX align events.
        */
        drag: function(event) {
            _yuitest_coverfunc("build/dd-constrain/dd-constrain.js", "drag", 407);
_yuitest_coverline("build/dd-constrain/dd-constrain.js", 408);
var host = this.get(HOST),
                xt = this.get('tickX'),
                yt = this.get('tickY'),
                _xy = [host.actXY[0], host.actXY[1]];

            _yuitest_coverline("build/dd-constrain/dd-constrain.js", 413);
if ((Y.Lang.isNumber(xt) || this.get(TICK_X_ARRAY)) && (this._lastTickXFired !== _xy[0])) {
                _yuitest_coverline("build/dd-constrain/dd-constrain.js", 414);
this._tickAlignX();
                _yuitest_coverline("build/dd-constrain/dd-constrain.js", 415);
this._lastTickXFired = _xy[0];
            }

            _yuitest_coverline("build/dd-constrain/dd-constrain.js", 418);
if ((Y.Lang.isNumber(yt) || this.get(TICK_Y_ARRAY)) && (this._lastTickYFired !== _xy[1])) {
                _yuitest_coverline("build/dd-constrain/dd-constrain.js", 419);
this._tickAlignY();
                _yuitest_coverline("build/dd-constrain/dd-constrain.js", 420);
this._lastTickYFired = _xy[1];
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
            _yuitest_coverfunc("build/dd-constrain/dd-constrain.js", "_checkTicks", 431);
_yuitest_coverline("build/dd-constrain/dd-constrain.js", 432);
var host = this.get(HOST),
                lx = (host.startXY[0] - host.deltaXY[0]),
                ly = (host.startXY[1] - host.deltaXY[1]),
                xt = this.get('tickX'),
                yt = this.get('tickY');
                _yuitest_coverline("build/dd-constrain/dd-constrain.js", 437);
if (xt && !this.get(TICK_X_ARRAY)) {
                    _yuitest_coverline("build/dd-constrain/dd-constrain.js", 438);
xy[0] = DDM._calcTicks(xy[0], lx, xt, r[LEFT], r[RIGHT]);
                }
                _yuitest_coverline("build/dd-constrain/dd-constrain.js", 440);
if (yt && !this.get(TICK_Y_ARRAY)) {
                    _yuitest_coverline("build/dd-constrain/dd-constrain.js", 441);
xy[1] = DDM._calcTicks(xy[1], ly, yt, r[TOP], r[BOTTOM]);
                }
                _yuitest_coverline("build/dd-constrain/dd-constrain.js", 443);
if (this.get(TICK_X_ARRAY)) {
                    _yuitest_coverline("build/dd-constrain/dd-constrain.js", 444);
xy[0] = DDM._calcTickArray(xy[0], this.get(TICK_X_ARRAY), r[LEFT], r[RIGHT]);
                }
                _yuitest_coverline("build/dd-constrain/dd-constrain.js", 446);
if (this.get(TICK_Y_ARRAY)) {
                    _yuitest_coverline("build/dd-constrain/dd-constrain.js", 447);
xy[1] = DDM._calcTickArray(xy[1], this.get(TICK_Y_ARRAY), r[TOP], r[BOTTOM]);
                }

            _yuitest_coverline("build/dd-constrain/dd-constrain.js", 450);
return xy;
        },
        /**
        * @private
        * @method _tickAlignX
        * @description Fires when the actXY[0] reach a new value respecting the tickX gap.
        */
        _tickAlignX: function() {
            _yuitest_coverfunc("build/dd-constrain/dd-constrain.js", "_tickAlignX", 457);
_yuitest_coverline("build/dd-constrain/dd-constrain.js", 458);
this.fire(EV_TICK_ALIGN_X);
        },
        /**
        * @private
        * @method _tickAlignY
        * @description Fires when the actXY[1] reach a new value respecting the tickY gap.
        */
        _tickAlignY: function() {
            _yuitest_coverfunc("build/dd-constrain/dd-constrain.js", "_tickAlignY", 465);
_yuitest_coverline("build/dd-constrain/dd-constrain.js", 466);
this.fire(EV_TICK_ALIGN_Y);
        }
    };

    _yuitest_coverline("build/dd-constrain/dd-constrain.js", 470);
Y.namespace('Plugin');
    _yuitest_coverline("build/dd-constrain/dd-constrain.js", 471);
Y.extend(C, Y.Base, proto);
    _yuitest_coverline("build/dd-constrain/dd-constrain.js", 472);
Y.Plugin.DDConstrained = C;

    _yuitest_coverline("build/dd-constrain/dd-constrain.js", 474);
Y.mix(DDM, {
        /**
        * @for DDM
        * @namespace DD
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
            _yuitest_coverfunc("build/dd-constrain/dd-constrain.js", "_calcTicks", 488);
_yuitest_coverline("build/dd-constrain/dd-constrain.js", 489);
var ix = ((pos - start) / tick),
                min = Math.floor(ix),
                max = Math.ceil(ix);
                _yuitest_coverline("build/dd-constrain/dd-constrain.js", 492);
if ((min !== 0) || (max !== 0)) {
                    _yuitest_coverline("build/dd-constrain/dd-constrain.js", 493);
if ((ix >= min) && (ix <= max)) {
                        _yuitest_coverline("build/dd-constrain/dd-constrain.js", 494);
pos = (start + (tick * min));
                        _yuitest_coverline("build/dd-constrain/dd-constrain.js", 495);
if (off1 && off2) {
                            _yuitest_coverline("build/dd-constrain/dd-constrain.js", 496);
if (pos < off1) {
                                _yuitest_coverline("build/dd-constrain/dd-constrain.js", 497);
pos = (start + (tick * (min + 1)));
                            }
                            _yuitest_coverline("build/dd-constrain/dd-constrain.js", 499);
if (pos > off2) {
                                _yuitest_coverline("build/dd-constrain/dd-constrain.js", 500);
pos = (start + (tick * (min - 1)));
                            }
                        }
                    }
                }
                _yuitest_coverline("build/dd-constrain/dd-constrain.js", 505);
return pos;
        },
        /**
        * @for DDM
        * @namespace DD
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
            _yuitest_coverfunc("build/dd-constrain/dd-constrain.js", "_calcTickArray", 519);
_yuitest_coverline("build/dd-constrain/dd-constrain.js", 520);
var i = 0, len = ticks.length, next = 0,
                diff1, diff2, ret;

            _yuitest_coverline("build/dd-constrain/dd-constrain.js", 523);
if (!ticks || (ticks.length === 0)) {
                _yuitest_coverline("build/dd-constrain/dd-constrain.js", 524);
return pos;
            }
            _yuitest_coverline("build/dd-constrain/dd-constrain.js", 526);
if (ticks[0] >= pos) {
                _yuitest_coverline("build/dd-constrain/dd-constrain.js", 527);
return ticks[0];
            }

            _yuitest_coverline("build/dd-constrain/dd-constrain.js", 530);
for (i = 0; i < len; i++) {
                _yuitest_coverline("build/dd-constrain/dd-constrain.js", 531);
next = (i + 1);
                _yuitest_coverline("build/dd-constrain/dd-constrain.js", 532);
if (ticks[next] && ticks[next] >= pos) {
                    _yuitest_coverline("build/dd-constrain/dd-constrain.js", 533);
diff1 = pos - ticks[i];
                    _yuitest_coverline("build/dd-constrain/dd-constrain.js", 534);
diff2 = ticks[next] - pos;
                    _yuitest_coverline("build/dd-constrain/dd-constrain.js", 535);
ret = (diff2 > diff1) ? ticks[i] : ticks[next];
                    _yuitest_coverline("build/dd-constrain/dd-constrain.js", 536);
if (off1 && off2) {
                        _yuitest_coverline("build/dd-constrain/dd-constrain.js", 537);
if (ret > off2) {
                            _yuitest_coverline("build/dd-constrain/dd-constrain.js", 538);
if (ticks[i]) {
                                _yuitest_coverline("build/dd-constrain/dd-constrain.js", 539);
ret = ticks[i];
                            } else {
                                _yuitest_coverline("build/dd-constrain/dd-constrain.js", 541);
ret = ticks[len - 1];
                            }
                        }
                    }
                    _yuitest_coverline("build/dd-constrain/dd-constrain.js", 545);
return ret;
                }

            }
            _yuitest_coverline("build/dd-constrain/dd-constrain.js", 549);
return ticks[ticks.length - 1];
        }
    });



}, '@VERSION@', {"requires": ["dd-drag"]});
