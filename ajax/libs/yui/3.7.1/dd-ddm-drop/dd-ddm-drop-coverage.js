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
_yuitest_coverage["build/dd-ddm-drop/dd-ddm-drop.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/dd-ddm-drop/dd-ddm-drop.js",
    code: []
};
_yuitest_coverage["build/dd-ddm-drop/dd-ddm-drop.js"].code=["YUI.add('dd-ddm-drop', function (Y, NAME) {","","","    /**","     * Extends the dd-ddm Class to add support for the placement of Drop Target shims inside the viewport shim. It also handles all Drop Target related events and interactions.","     * @module dd","     * @submodule dd-ddm-drop","     * @for DDM","     * @namespace DD","     */","","    //TODO CSS class name for the bestMatch..","    Y.mix(Y.DD.DDM, {","        /**","        * @private","        * @property _noShim","        * @description This flag turns off the use of the mouseover/mouseout shim. It should not be used unless you know what you are doing.","        * @type {Boolean}","        */","        _noShim: false,","        /**","        * @private","        * @property _activeShims","        * @description Placeholder for all active shims on the page","        * @type {Array}","        */","        _activeShims: [],","        /**","        * @private","        * @method _hasActiveShim","        * @description This method checks the _activeShims Object to see if there is a shim active.","        * @return {Boolean}","        */","        _hasActiveShim: function() {","            if (this._noShim) {","                return true;","            }","            return this._activeShims.length;","        },","        /**","        * @private","        * @method _addActiveShim ","        * @description Adds a Drop Target to the list of active shims","        * @param {Object} d The Drop instance to add to the list.","        */","        _addActiveShim: function(d) {","            this._activeShims[this._activeShims.length] = d;","        },","        /**","        * @private","        * @method _removeActiveShim ","        * @description Removes a Drop Target to the list of active shims","        * @param {Object} d The Drop instance to remove from the list.","        */","        _removeActiveShim: function(d) {","            var s = [];","            Y.each(this._activeShims, function(v, k) {","                if (v._yuid !== d._yuid) {","                    s[s.length] = v;","                }","                ","            });","            this._activeShims = s;","        },","        /**","        * @method syncActiveShims","        * @description This method will sync the position of the shims on the Drop Targets that are currently active.","        * @param {Boolean} force Resize/sync all Targets.","        */","        syncActiveShims: function(force) {","            Y.later(0, this, function(force) {","                var drops = ((force) ? this.targets : this._lookup());","                Y.each(drops, function(v, k) {","                    v.sizeShim.call(v);","                }, this);","            }, force);","        },","        /**","        * @private","        * @property mode","        * @description The mode that the drag operations will run in 0 for Point, 1 for Intersect, 2 for Strict","        * @type Number","        */","        mode: 0,","        /**","        * @private","        * @property POINT","        * @description In point mode, a Drop is targeted by the cursor being over the Target","        * @type Number","        */","        POINT: 0,","        /**","        * @private","        * @property INTERSECT","        * @description In intersect mode, a Drop is targeted by \"part\" of the drag node being over the Target","        * @type Number","        */","        INTERSECT: 1,","        /**","        * @private","        * @property STRICT","        * @description In strict mode, a Drop is targeted by the \"entire\" drag node being over the Target","        * @type Number","        */","        STRICT: 2,","        /**","        * @property useHash","        * @description Should we only check targets that are in the viewport on drags (for performance), default: true","        * @type {Boolean}","        */","        useHash: true,","        /**","        * @property activeDrop","        * @description A reference to the active Drop Target","        * @type {Object}","        */","        activeDrop: null,","        /**","        * @property validDrops","        * @description An array of the valid Drop Targets for this interaction.","        * @type {Array}","        */","        //TODO Change array/object literals to be in sync..","        validDrops: [],","        /**","        * @property otherDrops","        * @description An object literal of Other Drop Targets that we encountered during this interaction (in the case of overlapping Drop Targets)","        * @type {Object}","        */","        otherDrops: {},","        /**","        * @property targets","        * @description All of the Targets","        * @type {Array}","        */","        targets: [],","        /**","        * @private ","        * @method _addValid","        * @description Add a Drop Target to the list of Valid Targets. This list get's regenerated on each new drag operation.","        * @param {Object} drop","        * @return {Self}","        * @chainable","        */","        _addValid: function(drop) {","            this.validDrops[this.validDrops.length] = drop;","            return this;","        },","        /**","        * @private ","        * @method _removeValid","        * @description Removes a Drop Target from the list of Valid Targets. This list get's regenerated on each new drag operation.","        * @param {Object} drop","        * @return {Self}","        * @chainable","        */","        _removeValid: function(drop) {","            var drops = [];","            Y.each(this.validDrops, function(v, k) {","                if (v !== drop) {","                    drops[drops.length] = v;","                }","            });","","            this.validDrops = drops;","            return this;","        },","        /**","        * @method isOverTarget","        * @description Check to see if the Drag element is over the target, method varies on current mode","        * @param {Object} drop The drop to check against","        * @return {Boolean}","        */","        isOverTarget: function(drop) {","            if (this.activeDrag && drop) {","                var xy = this.activeDrag.mouseXY, r, dMode = this.activeDrag.get('dragMode'),","                    aRegion, node = drop.shim;","                if (xy && this.activeDrag) {","                    aRegion = this.activeDrag.region;","                    if (dMode == this.STRICT) {","                        return this.activeDrag.get('dragNode').inRegion(drop.region, true, aRegion);","                    }","                    if (drop && drop.shim) {","                        if ((dMode == this.INTERSECT) && this._noShim) {","                            r = aRegion || this.activeDrag.get('node');","                            return drop.get('node').intersect(r, drop.region).inRegion;","                        }","","                        if (this._noShim) {","                            node = drop.get('node');","                        }","                        return node.intersect({","                            top: xy[1],","                            bottom: xy[1],","                            left: xy[0], ","                            right: xy[0]","                        }, drop.region).inRegion;","                    }","                }","            }","            return false;","        },","        /**","        * @method clearCache","        * @description Clears the cache data used for this interaction.","        */","        clearCache: function() {","            this.validDrops = [];","            this.otherDrops = {};","            this._activeShims = [];","        },","        /**","        * @private","        * @method _activateTargets","        * @description Clear the cache and activate the shims of all the targets","        */","        _activateTargets: function() {","            this._noShim = true;","            this.clearCache();","            Y.each(this.targets, function(v, k) {","                v._activateShim([]);","                if (v.get('noShim') == true) {","                    this._noShim = false;","                }","            }, this);","            this._handleTargetOver();","            ","        },","        /**","        * @method getBestMatch","        * @description This method will gather the area for all potential targets and see which has the hightest covered area and return it.","        * @param {Array} drops An Array of drops to scan for the best match.","        * @param {Boolean} all If present, it returns an Array. First item is best match, second is an Array of the other items in the original Array.","        * @return {Object or Array} ","        */","        getBestMatch: function(drops, all) {","            var biggest = null, area = 0, out;","            ","            Y.each(drops, function(v, k) {","                var inter = this.activeDrag.get('dragNode').intersect(v.get('node'));","                v.region.area = inter.area;","","                if (inter.inRegion) {","                    if (inter.area > area) {","                        area = inter.area;","                        biggest = v;","                    }","                }","            }, this);","            if (all) {","                out = [];","                //TODO Sort the others in numeric order by area covered..","                Y.each(drops, function(v, k) {","                    if (v !== biggest) {","                        out[out.length] = v;","                    }","                }, this);","                return [biggest, out];","            }","            return biggest;","        },","        /**","        * @private","        * @method _deactivateTargets","        * @description This method fires the drop:hit, drag:drophit, drag:dropmiss methods and deactivates the shims..","        */","        _deactivateTargets: function() {","            var other = [], tmp,","                activeDrag = this.activeDrag,","                activeDrop = this.activeDrop;","            ","            //TODO why is this check so hard??","            if (activeDrag && activeDrop && this.otherDrops[activeDrop]) {","                if (!activeDrag.get('dragMode')) {","                    //TODO otherDrops -- private..","                    other = this.otherDrops;","                    delete other[activeDrop];","                } else {","                    tmp = this.getBestMatch(this.otherDrops, true);","                    activeDrop = tmp[0];","                    other = tmp[1];","                }","                activeDrag.get('node').removeClass(this.CSS_PREFIX + '-drag-over');","                if (activeDrop) {","                    activeDrop.fire('drop:hit', { drag: activeDrag, drop: activeDrop, others: other });","                    activeDrag.fire('drag:drophit', { drag: activeDrag,  drop: activeDrop, others: other });","                }","            } else if (activeDrag && activeDrag.get('dragging')) {","                activeDrag.get('node').removeClass(this.CSS_PREFIX + '-drag-over');","                activeDrag.fire('drag:dropmiss', { pageX: activeDrag.lastXY[0], pageY: activeDrag.lastXY[1] });","            }","            ","            this.activeDrop = null;","","            Y.each(this.targets, function(v, k) {","                v._deactivateShim([]);","            }, this);","        },","        /**","        * @private","        * @method _dropMove","        * @description This method is called when the move method is called on the Drag Object.","        */","        _dropMove: function() {","            if (this._hasActiveShim()) {","                this._handleTargetOver();","            } else {","                Y.each(this.otherDrops, function(v, k) {","                    v._handleOut.apply(v, []);","                });","            }","        },","        /**","        * @private","        * @method _lookup","        * @description Filters the list of Drops down to those in the viewport.","        * @return {Array} The valid Drop Targets that are in the viewport.","        */","        _lookup: function() {","            if (!this.useHash || this._noShim) {","                return this.validDrops;","            }","            var drops = [];","            //Only scan drop shims that are in the Viewport","            Y.each(this.validDrops, function(v, k) {","                if (v.shim && v.shim.inViewportRegion(false, v.region)) {","                    drops[drops.length] = v;","                }","            });","            return drops;","                ","        },","        /**","        * @private","        * @method _handleTargetOver","        * @description This method execs _handleTargetOver on all valid Drop Targets","        */","        _handleTargetOver: function() {","            var drops = this._lookup();","            Y.each(drops, function(v, k) {","                v._handleTargetOver.call(v);","            }, this);","        },","        /**","        * @private","        * @method _regTarget","        * @description Add the passed in Target to the targets collection","        * @param {Object} t The Target to add to the targets collection","        */","        _regTarget: function(t) {","            this.targets[this.targets.length] = t;","        },","        /**","        * @private","        * @method _unregTarget","        * @description Remove the passed in Target from the targets collection","        * @param {Object} drop The Target to remove from the targets collection","        */","        _unregTarget: function(drop) {","            var targets = [], vdrops;","            Y.each(this.targets, function(v, k) {","                if (v != drop) {","                    targets[targets.length] = v;","                }","            }, this);","            this.targets = targets;","","            vdrops = [];","            Y.each(this.validDrops, function(v, k) {","                if (v !== drop) {","                    vdrops[vdrops.length] = v;","                }","            });","","            this.validDrops = vdrops;","        },","        /**","        * @method getDrop","        * @description Get a valid Drop instance back from a Node or a selector string, false otherwise","        * @param {String/Object} node The Node instance or Selector string to check for a valid Drop Object","        * @return {Object}","        */","        getDrop: function(node) {","            var drop = false,","                n = Y.one(node);","            if (n instanceof Y.Node) {","                Y.each(this.targets, function(v, k) {","                    if (n.compareTo(v.get('node'))) {","                        drop = v;","                    }","                });","            }","            return drop;","        }","    }, true);","","","","","}, '@VERSION@', {\"requires\": [\"dd-ddm\"]});"];
_yuitest_coverage["build/dd-ddm-drop/dd-ddm-drop.js"].lines = {"1":0,"13":0,"35":0,"36":0,"38":0,"47":0,"56":0,"57":0,"58":0,"59":0,"63":0,"71":0,"72":0,"73":0,"74":0,"146":0,"147":0,"158":0,"159":0,"160":0,"161":0,"165":0,"166":0,"175":0,"176":0,"178":0,"179":0,"180":0,"181":0,"183":0,"184":0,"185":0,"186":0,"189":0,"190":0,"192":0,"201":0,"208":0,"209":0,"210":0,"218":0,"219":0,"220":0,"221":0,"222":0,"223":0,"226":0,"237":0,"239":0,"240":0,"241":0,"243":0,"244":0,"245":0,"246":0,"250":0,"251":0,"253":0,"254":0,"255":0,"258":0,"260":0,"268":0,"273":0,"274":0,"276":0,"277":0,"279":0,"280":0,"281":0,"283":0,"284":0,"285":0,"286":0,"288":0,"289":0,"290":0,"293":0,"295":0,"296":0,"305":0,"306":0,"308":0,"309":0,"320":0,"321":0,"323":0,"325":0,"326":0,"327":0,"330":0,"339":0,"340":0,"341":0,"351":0,"360":0,"361":0,"362":0,"363":0,"366":0,"368":0,"369":0,"370":0,"371":0,"375":0,"384":0,"386":0,"387":0,"388":0,"389":0,"393":0};
_yuitest_coverage["build/dd-ddm-drop/dd-ddm-drop.js"].functions = {"_hasActiveShim:34":0,"_addActiveShim:46":0,"(anonymous 2):57":0,"_removeActiveShim:55":0,"(anonymous 4):73":0,"(anonymous 3):71":0,"syncActiveShims:70":0,"_addValid:145":0,"(anonymous 5):159":0,"_removeValid:157":0,"isOverTarget:174":0,"clearCache:207":0,"(anonymous 6):220":0,"_activateTargets:217":0,"(anonymous 7):239":0,"(anonymous 8):253":0,"getBestMatch:236":0,"(anonymous 9):295":0,"_deactivateTargets:267":0,"(anonymous 10):308":0,"_dropMove:304":0,"(anonymous 11):325":0,"_lookup:319":0,"(anonymous 12):340":0,"_handleTargetOver:338":0,"_regTarget:350":0,"(anonymous 13):361":0,"(anonymous 14):369":0,"_unregTarget:359":0,"(anonymous 15):387":0,"getDrop:383":0,"(anonymous 1):1":0};
_yuitest_coverage["build/dd-ddm-drop/dd-ddm-drop.js"].coveredLines = 111;
_yuitest_coverage["build/dd-ddm-drop/dd-ddm-drop.js"].coveredFunctions = 32;
_yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 1);
YUI.add('dd-ddm-drop', function (Y, NAME) {


    /**
     * Extends the dd-ddm Class to add support for the placement of Drop Target shims inside the viewport shim. It also handles all Drop Target related events and interactions.
     * @module dd
     * @submodule dd-ddm-drop
     * @for DDM
     * @namespace DD
     */

    //TODO CSS class name for the bestMatch..
    _yuitest_coverfunc("build/dd-ddm-drop/dd-ddm-drop.js", "(anonymous 1)", 1);
_yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 13);
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
            _yuitest_coverfunc("build/dd-ddm-drop/dd-ddm-drop.js", "_hasActiveShim", 34);
_yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 35);
if (this._noShim) {
                _yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 36);
return true;
            }
            _yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 38);
return this._activeShims.length;
        },
        /**
        * @private
        * @method _addActiveShim 
        * @description Adds a Drop Target to the list of active shims
        * @param {Object} d The Drop instance to add to the list.
        */
        _addActiveShim: function(d) {
            _yuitest_coverfunc("build/dd-ddm-drop/dd-ddm-drop.js", "_addActiveShim", 46);
_yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 47);
this._activeShims[this._activeShims.length] = d;
        },
        /**
        * @private
        * @method _removeActiveShim 
        * @description Removes a Drop Target to the list of active shims
        * @param {Object} d The Drop instance to remove from the list.
        */
        _removeActiveShim: function(d) {
            _yuitest_coverfunc("build/dd-ddm-drop/dd-ddm-drop.js", "_removeActiveShim", 55);
_yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 56);
var s = [];
            _yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 57);
Y.each(this._activeShims, function(v, k) {
                _yuitest_coverfunc("build/dd-ddm-drop/dd-ddm-drop.js", "(anonymous 2)", 57);
_yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 58);
if (v._yuid !== d._yuid) {
                    _yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 59);
s[s.length] = v;
                }
                
            });
            _yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 63);
this._activeShims = s;
        },
        /**
        * @method syncActiveShims
        * @description This method will sync the position of the shims on the Drop Targets that are currently active.
        * @param {Boolean} force Resize/sync all Targets.
        */
        syncActiveShims: function(force) {
            _yuitest_coverfunc("build/dd-ddm-drop/dd-ddm-drop.js", "syncActiveShims", 70);
_yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 71);
Y.later(0, this, function(force) {
                _yuitest_coverfunc("build/dd-ddm-drop/dd-ddm-drop.js", "(anonymous 3)", 71);
_yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 72);
var drops = ((force) ? this.targets : this._lookup());
                _yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 73);
Y.each(drops, function(v, k) {
                    _yuitest_coverfunc("build/dd-ddm-drop/dd-ddm-drop.js", "(anonymous 4)", 73);
_yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 74);
v.sizeShim.call(v);
                }, this);
            }, force);
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
            _yuitest_coverfunc("build/dd-ddm-drop/dd-ddm-drop.js", "_addValid", 145);
_yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 146);
this.validDrops[this.validDrops.length] = drop;
            _yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 147);
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
            _yuitest_coverfunc("build/dd-ddm-drop/dd-ddm-drop.js", "_removeValid", 157);
_yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 158);
var drops = [];
            _yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 159);
Y.each(this.validDrops, function(v, k) {
                _yuitest_coverfunc("build/dd-ddm-drop/dd-ddm-drop.js", "(anonymous 5)", 159);
_yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 160);
if (v !== drop) {
                    _yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 161);
drops[drops.length] = v;
                }
            });

            _yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 165);
this.validDrops = drops;
            _yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 166);
return this;
        },
        /**
        * @method isOverTarget
        * @description Check to see if the Drag element is over the target, method varies on current mode
        * @param {Object} drop The drop to check against
        * @return {Boolean}
        */
        isOverTarget: function(drop) {
            _yuitest_coverfunc("build/dd-ddm-drop/dd-ddm-drop.js", "isOverTarget", 174);
_yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 175);
if (this.activeDrag && drop) {
                _yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 176);
var xy = this.activeDrag.mouseXY, r, dMode = this.activeDrag.get('dragMode'),
                    aRegion, node = drop.shim;
                _yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 178);
if (xy && this.activeDrag) {
                    _yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 179);
aRegion = this.activeDrag.region;
                    _yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 180);
if (dMode == this.STRICT) {
                        _yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 181);
return this.activeDrag.get('dragNode').inRegion(drop.region, true, aRegion);
                    }
                    _yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 183);
if (drop && drop.shim) {
                        _yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 184);
if ((dMode == this.INTERSECT) && this._noShim) {
                            _yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 185);
r = aRegion || this.activeDrag.get('node');
                            _yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 186);
return drop.get('node').intersect(r, drop.region).inRegion;
                        }

                        _yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 189);
if (this._noShim) {
                            _yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 190);
node = drop.get('node');
                        }
                        _yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 192);
return node.intersect({
                            top: xy[1],
                            bottom: xy[1],
                            left: xy[0], 
                            right: xy[0]
                        }, drop.region).inRegion;
                    }
                }
            }
            _yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 201);
return false;
        },
        /**
        * @method clearCache
        * @description Clears the cache data used for this interaction.
        */
        clearCache: function() {
            _yuitest_coverfunc("build/dd-ddm-drop/dd-ddm-drop.js", "clearCache", 207);
_yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 208);
this.validDrops = [];
            _yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 209);
this.otherDrops = {};
            _yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 210);
this._activeShims = [];
        },
        /**
        * @private
        * @method _activateTargets
        * @description Clear the cache and activate the shims of all the targets
        */
        _activateTargets: function() {
            _yuitest_coverfunc("build/dd-ddm-drop/dd-ddm-drop.js", "_activateTargets", 217);
_yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 218);
this._noShim = true;
            _yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 219);
this.clearCache();
            _yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 220);
Y.each(this.targets, function(v, k) {
                _yuitest_coverfunc("build/dd-ddm-drop/dd-ddm-drop.js", "(anonymous 6)", 220);
_yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 221);
v._activateShim([]);
                _yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 222);
if (v.get('noShim') == true) {
                    _yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 223);
this._noShim = false;
                }
            }, this);
            _yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 226);
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
            _yuitest_coverfunc("build/dd-ddm-drop/dd-ddm-drop.js", "getBestMatch", 236);
_yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 237);
var biggest = null, area = 0, out;
            
            _yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 239);
Y.each(drops, function(v, k) {
                _yuitest_coverfunc("build/dd-ddm-drop/dd-ddm-drop.js", "(anonymous 7)", 239);
_yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 240);
var inter = this.activeDrag.get('dragNode').intersect(v.get('node'));
                _yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 241);
v.region.area = inter.area;

                _yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 243);
if (inter.inRegion) {
                    _yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 244);
if (inter.area > area) {
                        _yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 245);
area = inter.area;
                        _yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 246);
biggest = v;
                    }
                }
            }, this);
            _yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 250);
if (all) {
                _yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 251);
out = [];
                //TODO Sort the others in numeric order by area covered..
                _yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 253);
Y.each(drops, function(v, k) {
                    _yuitest_coverfunc("build/dd-ddm-drop/dd-ddm-drop.js", "(anonymous 8)", 253);
_yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 254);
if (v !== biggest) {
                        _yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 255);
out[out.length] = v;
                    }
                }, this);
                _yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 258);
return [biggest, out];
            }
            _yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 260);
return biggest;
        },
        /**
        * @private
        * @method _deactivateTargets
        * @description This method fires the drop:hit, drag:drophit, drag:dropmiss methods and deactivates the shims..
        */
        _deactivateTargets: function() {
            _yuitest_coverfunc("build/dd-ddm-drop/dd-ddm-drop.js", "_deactivateTargets", 267);
_yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 268);
var other = [], tmp,
                activeDrag = this.activeDrag,
                activeDrop = this.activeDrop;
            
            //TODO why is this check so hard??
            _yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 273);
if (activeDrag && activeDrop && this.otherDrops[activeDrop]) {
                _yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 274);
if (!activeDrag.get('dragMode')) {
                    //TODO otherDrops -- private..
                    _yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 276);
other = this.otherDrops;
                    _yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 277);
delete other[activeDrop];
                } else {
                    _yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 279);
tmp = this.getBestMatch(this.otherDrops, true);
                    _yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 280);
activeDrop = tmp[0];
                    _yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 281);
other = tmp[1];
                }
                _yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 283);
activeDrag.get('node').removeClass(this.CSS_PREFIX + '-drag-over');
                _yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 284);
if (activeDrop) {
                    _yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 285);
activeDrop.fire('drop:hit', { drag: activeDrag, drop: activeDrop, others: other });
                    _yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 286);
activeDrag.fire('drag:drophit', { drag: activeDrag,  drop: activeDrop, others: other });
                }
            } else {_yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 288);
if (activeDrag && activeDrag.get('dragging')) {
                _yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 289);
activeDrag.get('node').removeClass(this.CSS_PREFIX + '-drag-over');
                _yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 290);
activeDrag.fire('drag:dropmiss', { pageX: activeDrag.lastXY[0], pageY: activeDrag.lastXY[1] });
            }}
            
            _yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 293);
this.activeDrop = null;

            _yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 295);
Y.each(this.targets, function(v, k) {
                _yuitest_coverfunc("build/dd-ddm-drop/dd-ddm-drop.js", "(anonymous 9)", 295);
_yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 296);
v._deactivateShim([]);
            }, this);
        },
        /**
        * @private
        * @method _dropMove
        * @description This method is called when the move method is called on the Drag Object.
        */
        _dropMove: function() {
            _yuitest_coverfunc("build/dd-ddm-drop/dd-ddm-drop.js", "_dropMove", 304);
_yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 305);
if (this._hasActiveShim()) {
                _yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 306);
this._handleTargetOver();
            } else {
                _yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 308);
Y.each(this.otherDrops, function(v, k) {
                    _yuitest_coverfunc("build/dd-ddm-drop/dd-ddm-drop.js", "(anonymous 10)", 308);
_yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 309);
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
            _yuitest_coverfunc("build/dd-ddm-drop/dd-ddm-drop.js", "_lookup", 319);
_yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 320);
if (!this.useHash || this._noShim) {
                _yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 321);
return this.validDrops;
            }
            _yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 323);
var drops = [];
            //Only scan drop shims that are in the Viewport
            _yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 325);
Y.each(this.validDrops, function(v, k) {
                _yuitest_coverfunc("build/dd-ddm-drop/dd-ddm-drop.js", "(anonymous 11)", 325);
_yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 326);
if (v.shim && v.shim.inViewportRegion(false, v.region)) {
                    _yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 327);
drops[drops.length] = v;
                }
            });
            _yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 330);
return drops;
                
        },
        /**
        * @private
        * @method _handleTargetOver
        * @description This method execs _handleTargetOver on all valid Drop Targets
        */
        _handleTargetOver: function() {
            _yuitest_coverfunc("build/dd-ddm-drop/dd-ddm-drop.js", "_handleTargetOver", 338);
_yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 339);
var drops = this._lookup();
            _yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 340);
Y.each(drops, function(v, k) {
                _yuitest_coverfunc("build/dd-ddm-drop/dd-ddm-drop.js", "(anonymous 12)", 340);
_yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 341);
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
            _yuitest_coverfunc("build/dd-ddm-drop/dd-ddm-drop.js", "_regTarget", 350);
_yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 351);
this.targets[this.targets.length] = t;
        },
        /**
        * @private
        * @method _unregTarget
        * @description Remove the passed in Target from the targets collection
        * @param {Object} drop The Target to remove from the targets collection
        */
        _unregTarget: function(drop) {
            _yuitest_coverfunc("build/dd-ddm-drop/dd-ddm-drop.js", "_unregTarget", 359);
_yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 360);
var targets = [], vdrops;
            _yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 361);
Y.each(this.targets, function(v, k) {
                _yuitest_coverfunc("build/dd-ddm-drop/dd-ddm-drop.js", "(anonymous 13)", 361);
_yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 362);
if (v != drop) {
                    _yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 363);
targets[targets.length] = v;
                }
            }, this);
            _yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 366);
this.targets = targets;

            _yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 368);
vdrops = [];
            _yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 369);
Y.each(this.validDrops, function(v, k) {
                _yuitest_coverfunc("build/dd-ddm-drop/dd-ddm-drop.js", "(anonymous 14)", 369);
_yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 370);
if (v !== drop) {
                    _yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 371);
vdrops[vdrops.length] = v;
                }
            });

            _yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 375);
this.validDrops = vdrops;
        },
        /**
        * @method getDrop
        * @description Get a valid Drop instance back from a Node or a selector string, false otherwise
        * @param {String/Object} node The Node instance or Selector string to check for a valid Drop Object
        * @return {Object}
        */
        getDrop: function(node) {
            _yuitest_coverfunc("build/dd-ddm-drop/dd-ddm-drop.js", "getDrop", 383);
_yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 384);
var drop = false,
                n = Y.one(node);
            _yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 386);
if (n instanceof Y.Node) {
                _yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 387);
Y.each(this.targets, function(v, k) {
                    _yuitest_coverfunc("build/dd-ddm-drop/dd-ddm-drop.js", "(anonymous 15)", 387);
_yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 388);
if (n.compareTo(v.get('node'))) {
                        _yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 389);
drop = v;
                    }
                });
            }
            _yuitest_coverline("build/dd-ddm-drop/dd-ddm-drop.js", 393);
return drop;
        }
    }, true);




}, '@VERSION@', {"requires": ["dd-ddm"]});
