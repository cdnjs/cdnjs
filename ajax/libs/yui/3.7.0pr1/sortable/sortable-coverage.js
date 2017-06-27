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
_yuitest_coverage["build/sortable/sortable.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/sortable/sortable.js",
    code: []
};
_yuitest_coverage["build/sortable/sortable.js"].code=["YUI.add('sortable', function (Y, NAME) {","","","    /**","     * The class allows you to create a Drag & Drop reordered list.","     * @module sortable","     */     ","    /**","     * The class allows you to create a Drag & Drop reordered list.","     * @class Sortable","     * @extends Base","     * @constructor","     */","","","    var Sortable = function(o) {","        Sortable.superclass.constructor.apply(this, arguments);","    },","    CURRENT_NODE = 'currentNode',","    OPACITY_NODE = 'opacityNode',","    CONT = 'container',","    ID = 'id',","    ZINDEX = 'zIndex',","    OPACITY = 'opacity',","    PARENT_NODE = 'parentNode',","    NODES = 'nodes',","    NODE = 'node';","","","    Y.extend(Sortable, Y.Base, {","        /**","        * @property delegate","        * @type DD.Delegate","        * @description A reference to the DD.Delegate instance.","        */","        delegate: null,","        /**","        * @property drop","        * @type DD.Drop","        * @description A reference to the DD.Drop instance","        */","        drop: null,","        initializer: function() {","            var id = 'sortable-' + Y.guid(),","                delConfig = {","                    container: this.get(CONT),","                    nodes: this.get(NODES),","                    target: true,","                    invalid: this.get('invalid'),","                    dragConfig: {","                        groups: [ id ]","                    }","                }, del;","","            if (this.get('handles')) {","                delConfig.handles = this.get('handles');","            }","            del = new Y.DD.Delegate(delConfig);","","            this.set(ID, id);","","            del.dd.plug(Y.Plugin.DDProxy, {","                moveOnEnd: false,","                cloneNode: true","            });","","            this.drop =  new Y.DD.Drop({","                node: this.get(CONT),","                bubbleTarget: del,","                groups: del.dd.get('groups')","            });","            this.drop.on('drop:over', Y.bind(this._onDropOver, this));","            ","            del.on({","                'drag:start': Y.bind(this._onDragStart, this),","                'drag:end': Y.bind(this._onDragEnd, this),","                'drag:over': Y.bind(this._onDragOver, this),","                'drag:drag': Y.bind(this._onDrag, this)","            });","","            this.delegate = del;","            Sortable.reg(this);","        },","        _up: null,","        _y: null,","        _onDrag: function(e) {","            if (e.pageY < this._y) {","                this._up = true; ","            } else if (e.pageY > this._y) { ","                this._up = false; ","            } ","","            this._y = e.pageY;","        },","        /**","        * @private","        * @method _onDropOver","        * @param Event e The Event Object","        * @description Handles the DropOver event to append a drop node to an empty target","        */","        _onDropOver: function(e) {","            if (!e.drop.get(NODE).test(this.get(NODES))) {","                e.drop.get(NODE).append(e.drag.get(NODE));","            }","        },","        /**","        * @private","        * @method _onDragOver","        * @param Event e The Event Object","        * @description Handles the DragOver event that moves the object in the list or to another list.","        */","        _onDragOver: function(e) {","            if (!e.drop.get(NODE).test(this.get(NODES))) {","                return;","            }","            if (e.drag.get(NODE) == e.drop.get(NODE)) {","                return;","            }","            // is drop a child of drag?","            if (e.drag.get(NODE).contains(e.drop.get(NODE))) {","                return;","            }","            var same = false, dir, oldNode, newNode, dropsort, dropNode,","                moveType = this.get('moveType').toLowerCase();","","            if (e.drag.get(NODE).get(PARENT_NODE).contains(e.drop.get(NODE))) {","                same = true;","            }","            if (same && moveType == 'move') {","                moveType = 'insert';","            }","            switch (moveType) {","                case 'insert':","                    dir = ((this._up) ? 'before' : 'after');","                    dropNode = e.drop.get(NODE);","                    if (Y.Sortable._test(dropNode, this.get(CONT))) {","                        dropNode.append(e.drag.get(NODE));","                    } else {","                        dropNode.insert(e.drag.get(NODE), dir);","                    }","                    break;","                case 'swap':","                    Y.DD.DDM.swapNode(e.drag, e.drop);","                    break;","                case 'move':","                case 'copy':","                    dropsort = Y.Sortable.getSortable(e.drop.get(NODE).get(PARENT_NODE));","","                    if (!dropsort) {","                        return;","                    }","                    ","                    Y.DD.DDM.getDrop(e.drag.get(NODE)).addToGroup(dropsort.get(ID));","","                    //Same List","                    if (same) {","                        Y.DD.DDM.swapNode(e.drag, e.drop);","                    } else {","                        if (this.get('moveType') == 'copy') {","                            //New List","                            oldNode = e.drag.get(NODE);","                            newNode = oldNode.cloneNode(true);","","                            newNode.set(ID, '');","                            e.drag.set(NODE, newNode);","                            dropsort.delegate.createDrop(newNode, [dropsort.get(ID)]);","                            oldNode.setStyles({","                                top: '',","                                left: ''","                            });","                        }","                        e.drop.get(NODE).insert(e.drag.get(NODE), 'before');","                    }","                    break;","            }","","            this.fire(moveType, { same: same, drag: e.drag, drop: e.drop });","            this.fire('moved', { same: same, drag: e.drag, drop: e.drop });","        },","        /**","        * @private","        * @method _onDragStart","        * @param Event e The Event Object","        * @description Handles the DragStart event and initializes some settings.","        */","        _onDragStart: function(e) {","            var del = this.delegate,","                lastNode = del.get('lastNode');","            if (lastNode && lastNode.getDOMNode()) {","                lastNode.setStyle(ZINDEX, '');","            }","            del.get(this.get(OPACITY_NODE)).setStyle(OPACITY, this.get(OPACITY));","            del.get(CURRENT_NODE).setStyle(ZINDEX, '999');","        },","        /**","        * @private","        * @method _onDragEnd","        * @param Event e The Event Object","        * @description Handles the DragEnd event that cleans up the settings in the drag:start event.","        */","        _onDragEnd: function(e) {","            this.delegate.get(this.get(OPACITY_NODE)).setStyle(OPACITY, 1);","            this.delegate.get(CURRENT_NODE).setStyles({","                top: '',","                left: ''","            });","            this.sync();","        },","        /**","        * @method plug","        * @param Class cls The class to plug","        * @param Object config The class config","        * @description Passthrough to the DD.Delegate.ddplug method","        * @chainable","        */","        plug: function(cls, config) {","            //I don't like this.. Not at all, need to discuss with the team","            if (cls && cls.NAME.substring(0, 4).toLowerCase() === 'sort') {","                this.constructor.superclass.plug.call(this, cls, config);","            } else {","                this.delegate.dd.plug(cls, config);","            }","            return this;","        },","        /**","        * @method sync","        * @description Passthrough to the DD.Delegate syncTargets method.","        * @chainable","        */","        sync: function() {","            this.delegate.syncTargets();","            return this;","        },","        destructor: function() {","            this.drop.destroy();","            this.delegate.destroy();","            Sortable.unreg(this);","        },","        /**","        * @method join","        * @param Sortable sel The Sortable list to join with","        * @param String type The type of join to do: full, inner, outer, none. Default: full","        * @description Join this Sortable with another Sortable instance.","        * <ul>","        *   <li>full: Exchange nodes with both lists.</li>","        *   <li>inner: Items can go into this list from the joined list.</li>","        *   <li>outer: Items can go out of the joined list into this list.</li>","        *   <li>none: Removes the join.</li>","        * </ul>","        * @chainable","        */","        join: function(sel, type) {","            if (!(sel instanceof Y.Sortable)) {","                Y.error('Sortable: join needs a Sortable Instance');","                return this;","            }","            if (!type) {","                type = 'full';","            }","            type = type.toLowerCase();","            var method = '_join_' + type;","","            if (this[method]) {","                this[method](sel);","            }","            ","            return this;","        },","        /**","        * @private","        * @method _join_none","        * @param Sortable sel The Sortable to remove the join from","        * @description Removes the join with the passed Sortable.","        */","        _join_none: function(sel) {","            this.delegate.dd.removeFromGroup(sel.get(ID));","            sel.delegate.dd.removeFromGroup(this.get(ID));","        },","        /**","        * @private","        * @method _join_full","        * @param Sortable sel The Sortable list to join with","        * @description Joins both of the Sortables together.","        */","        _join_full: function(sel) {","            this.delegate.dd.addToGroup(sel.get(ID));","            sel.delegate.dd.addToGroup(this.get(ID));","        },","        /**","        * @private","        * @method _join_outer","        * @param Sortable sel The Sortable list to join with","        * @description Allows this Sortable to accept items from the passed Sortable.","        */","        _join_outer: function(sel) {","            this.delegate.dd.addToGroup(sel.get(ID));","        },","        /**","        * @private","        * @method _join_inner","        * @param Sortable sel The Sortable list to join with","        * @description Allows this Sortable to give items to the passed Sortable.","        */","        _join_inner: function(sel) {","            sel.delegate.dd.addToGroup(this.get(ID));","        },","        /**","        * A custom callback to allow a user to extract some sort of id or any other data from the node to use in the \"ordering list\" and then that data should be returned from the callback.","        * @method getOrdering","        * @param Function callback ","        * @return Array","        */","        getOrdering: function(callback) {","            var ordering = [];","","            if (!Y.Lang.isFunction(callback)) {","                callback = function (node) {","                    return node;","                };","            }","","            Y.one(this.get(CONT)).all(this.get(NODES)).each(function(node) {","                ordering.push(callback(node));","            });","            return ordering;","       }","    }, {","        NAME: 'sortable',","        ATTRS: {","            /**","            * @attribute handles","            * @description Drag handles to pass on to the internal DD.Delegate instance.","            * @type Array","            */    ","            handles: {","                value: false","            },","            /**","            * @attribute container","            * @description A selector query to get the container to listen for mousedown events on. All \"nodes\" should be a child of this container.","            * @type String","            */    ","            container: {","                value: 'body'","            },","            /**","            * @attribute nodes","            * @description A selector query to get the children of the \"container\" to make draggable elements from.","            * @type String","            */        ","            nodes: {","                value: '.dd-draggable'","            },","            /**","            * @attribute opacity","            * @description The opacity to change the proxy item to when dragging.","            * @type String","            */        ","            opacity: {","                value: '.75'","            },","            /**","            * @attribute opacityNode","            * @description The node to set opacity on when dragging (dragNode or currentNode). Default: currentNode.","            * @type String","            */        ","            opacityNode: {","                value: 'currentNode'","            },","            /**","            * @attribute id","            * @description The id of this Sortable, used to get a reference to this Sortable list from another list.","            * @type String","            */        ","            id: {","                value: null","            },","            /**","            * @attribute moveType","            * @description How should an item move to another list: insert, swap, move, copy. Default: insert","            * @type String","            */        ","            moveType: {","                value: 'insert'","            },","            /**","            * @attribute invalid","            * @description A selector string to test if a list item is invalid and not sortable","            * @type String","            */        ","            invalid: {","                value: ''","            }","        },","        /**","        * @static","        * @property _sortables","        * @private","        * @type Array","        * @description Hash map of all Sortables on the page.","        */","        _sortables: [],","        /**","        * @static","        * @method _test","        * @param {Node} node The node instance to test.","        * @param {String|Node} test The node instance or selector string to test against.","        * @description Test a Node or a selector for the container","        */","        _test: function(node, test) {","            var ret;","            if (test instanceof Y.Node) {","                ret = (test === node);","            } else {","                ret = node.test(test);","            }","            return ret;","        },","        /**","        * @static","        * @method getSortable","        * @param {String|Node} node The node instance or selector string to use to find a Sortable instance.","        * @description Get a Sortable instance back from a node reference or a selector string.","        */","        getSortable: function(node) {","            var s = null;","            node = Y.one(node);","            Y.each(Y.Sortable._sortables, function(v) {","                if (Y.Sortable._test(node, v.get(CONT))) {","                    s = v;","                }","            });","            return s;","        },","        /**","        * @static","        * @method reg","        * @param Sortable s A Sortable instance.","        * @description Register a Sortable instance with the singleton to allow lookups later.","        */","        reg: function(s) {","            Y.Sortable._sortables.push(s);","        },","        /**","        * @static","        * @method unreg","        * @param Sortable s A Sortable instance.","        * @description Unregister a Sortable instance with the singleton.","        */","        unreg: function(s) {","            Y.each(Y.Sortable._sortables, function(v, k) {","                if (v === s) {","                    Y.Sortable._sortables[k] = null;","                    delete Sortable._sortables[k];","                }","            });","        }","    });","","    Y.Sortable = Sortable;","","    /**","    * @event copy","    * @description A Sortable node was moved with a copy.","    * @param {Event.Facade} event An Event Facade object","    * @param {Boolean} event.same Moved to the same list.","    * @param {DD.Drag} event.drag The drag instance.","    * @param {DD.Drop} event.drop The drop instance.","    * @type {Event.Custom}","    */","    /**","    * @event move","    * @description A Sortable node was moved with a move.","    * @param {Event.Facade} event An Event Facade object with the following specific property added:","    * @param {Boolean} event.same Moved to the same list.","    * @param {DD.Drag} event.drag The drag instance.","    * @param {DD.Drop} event.drop The drop instance.","    * @type {Event.Custom}","    */","    /**","    * @event insert","    * @description A Sortable node was moved with an insert.","    * @param {Event.Facade} event An Event Facade object with the following specific property added:","    * @param {Boolean} event.same Moved to the same list.","    * @param {DD.Drag} event.drag The drag instance.","    * @param {DD.Drop} event.drop The drop instance.","    * @type {Event.Custom}","    */","    /**","    * @event swap","    * @description A Sortable node was moved with a swap.","    * @param {Event.Facade} event An Event Facade object with the following specific property added:","    * @param {Boolean} event.same Moved to the same list.","    * @param {DD.Drag} event.drag The drag instance.","    * @param {DD.Drop} event.drop The drop instance.","    * @type {Event.Custom}","    */","    /**","    * @event moved","    * @description A Sortable node was moved.","    * @param {Event.Facade} event An Event Facade object with the following specific property added:","    * @param {Boolean} event.same Moved to the same list.","    * @param {DD.Drag} event.drag The drag instance.","    * @param {DD.Drop} event.drop The drop instance.","    * @type {Event.Custom}","    */","","","","}, '@VERSION@', {\"requires\": [\"dd-delegate\", \"dd-drop-plugin\", \"dd-proxy\"]});"];
_yuitest_coverage["build/sortable/sortable.js"].lines = {"1":0,"16":0,"17":0,"30":0,"44":0,"55":0,"56":0,"58":0,"60":0,"62":0,"67":0,"72":0,"74":0,"81":0,"82":0,"87":0,"88":0,"89":0,"90":0,"93":0,"102":0,"103":0,"113":0,"114":0,"116":0,"117":0,"120":0,"121":0,"123":0,"126":0,"127":0,"129":0,"130":0,"132":0,"134":0,"135":0,"136":0,"137":0,"139":0,"141":0,"143":0,"144":0,"147":0,"149":0,"150":0,"153":0,"156":0,"157":0,"159":0,"161":0,"162":0,"164":0,"165":0,"166":0,"167":0,"172":0,"174":0,"177":0,"178":0,"187":0,"189":0,"190":0,"192":0,"193":0,"202":0,"203":0,"207":0,"218":0,"219":0,"221":0,"223":0,"231":0,"232":0,"235":0,"236":0,"237":0,"253":0,"254":0,"255":0,"257":0,"258":0,"260":0,"261":0,"263":0,"264":0,"267":0,"276":0,"277":0,"286":0,"287":0,"296":0,"305":0,"314":0,"316":0,"317":0,"318":0,"322":0,"323":0,"325":0,"411":0,"412":0,"413":0,"415":0,"417":0,"426":0,"427":0,"428":0,"429":0,"430":0,"433":0,"442":0,"451":0,"452":0,"453":0,"454":0,"460":0};
_yuitest_coverage["build/sortable/sortable.js"].functions = {"Sortable:16":0,"initializer:43":0,"_onDrag:86":0,"_onDropOver:101":0,"_onDragOver:112":0,"_onDragStart:186":0,"_onDragEnd:201":0,"plug:216":0,"sync:230":0,"destructor:234":0,"join:252":0,"_join_none:275":0,"_join_full:285":0,"_join_outer:295":0,"_join_inner:304":0,"callback:317":0,"(anonymous 2):322":0,"getOrdering:313":0,"_test:410":0,"(anonymous 3):428":0,"getSortable:425":0,"reg:441":0,"(anonymous 4):451":0,"unreg:450":0,"(anonymous 1):1":0};
_yuitest_coverage["build/sortable/sortable.js"].coveredLines = 116;
_yuitest_coverage["build/sortable/sortable.js"].coveredFunctions = 25;
_yuitest_coverline("build/sortable/sortable.js", 1);
YUI.add('sortable', function (Y, NAME) {


    /**
     * The class allows you to create a Drag & Drop reordered list.
     * @module sortable
     */     
    /**
     * The class allows you to create a Drag & Drop reordered list.
     * @class Sortable
     * @extends Base
     * @constructor
     */


    _yuitest_coverfunc("build/sortable/sortable.js", "(anonymous 1)", 1);
_yuitest_coverline("build/sortable/sortable.js", 16);
var Sortable = function(o) {
        _yuitest_coverfunc("build/sortable/sortable.js", "Sortable", 16);
_yuitest_coverline("build/sortable/sortable.js", 17);
Sortable.superclass.constructor.apply(this, arguments);
    },
    CURRENT_NODE = 'currentNode',
    OPACITY_NODE = 'opacityNode',
    CONT = 'container',
    ID = 'id',
    ZINDEX = 'zIndex',
    OPACITY = 'opacity',
    PARENT_NODE = 'parentNode',
    NODES = 'nodes',
    NODE = 'node';


    _yuitest_coverline("build/sortable/sortable.js", 30);
Y.extend(Sortable, Y.Base, {
        /**
        * @property delegate
        * @type DD.Delegate
        * @description A reference to the DD.Delegate instance.
        */
        delegate: null,
        /**
        * @property drop
        * @type DD.Drop
        * @description A reference to the DD.Drop instance
        */
        drop: null,
        initializer: function() {
            _yuitest_coverfunc("build/sortable/sortable.js", "initializer", 43);
_yuitest_coverline("build/sortable/sortable.js", 44);
var id = 'sortable-' + Y.guid(),
                delConfig = {
                    container: this.get(CONT),
                    nodes: this.get(NODES),
                    target: true,
                    invalid: this.get('invalid'),
                    dragConfig: {
                        groups: [ id ]
                    }
                }, del;

            _yuitest_coverline("build/sortable/sortable.js", 55);
if (this.get('handles')) {
                _yuitest_coverline("build/sortable/sortable.js", 56);
delConfig.handles = this.get('handles');
            }
            _yuitest_coverline("build/sortable/sortable.js", 58);
del = new Y.DD.Delegate(delConfig);

            _yuitest_coverline("build/sortable/sortable.js", 60);
this.set(ID, id);

            _yuitest_coverline("build/sortable/sortable.js", 62);
del.dd.plug(Y.Plugin.DDProxy, {
                moveOnEnd: false,
                cloneNode: true
            });

            _yuitest_coverline("build/sortable/sortable.js", 67);
this.drop =  new Y.DD.Drop({
                node: this.get(CONT),
                bubbleTarget: del,
                groups: del.dd.get('groups')
            });
            _yuitest_coverline("build/sortable/sortable.js", 72);
this.drop.on('drop:over', Y.bind(this._onDropOver, this));
            
            _yuitest_coverline("build/sortable/sortable.js", 74);
del.on({
                'drag:start': Y.bind(this._onDragStart, this),
                'drag:end': Y.bind(this._onDragEnd, this),
                'drag:over': Y.bind(this._onDragOver, this),
                'drag:drag': Y.bind(this._onDrag, this)
            });

            _yuitest_coverline("build/sortable/sortable.js", 81);
this.delegate = del;
            _yuitest_coverline("build/sortable/sortable.js", 82);
Sortable.reg(this);
        },
        _up: null,
        _y: null,
        _onDrag: function(e) {
            _yuitest_coverfunc("build/sortable/sortable.js", "_onDrag", 86);
_yuitest_coverline("build/sortable/sortable.js", 87);
if (e.pageY < this._y) {
                _yuitest_coverline("build/sortable/sortable.js", 88);
this._up = true; 
            } else {_yuitest_coverline("build/sortable/sortable.js", 89);
if (e.pageY > this._y) { 
                _yuitest_coverline("build/sortable/sortable.js", 90);
this._up = false; 
            }} 

            _yuitest_coverline("build/sortable/sortable.js", 93);
this._y = e.pageY;
        },
        /**
        * @private
        * @method _onDropOver
        * @param Event e The Event Object
        * @description Handles the DropOver event to append a drop node to an empty target
        */
        _onDropOver: function(e) {
            _yuitest_coverfunc("build/sortable/sortable.js", "_onDropOver", 101);
_yuitest_coverline("build/sortable/sortable.js", 102);
if (!e.drop.get(NODE).test(this.get(NODES))) {
                _yuitest_coverline("build/sortable/sortable.js", 103);
e.drop.get(NODE).append(e.drag.get(NODE));
            }
        },
        /**
        * @private
        * @method _onDragOver
        * @param Event e The Event Object
        * @description Handles the DragOver event that moves the object in the list or to another list.
        */
        _onDragOver: function(e) {
            _yuitest_coverfunc("build/sortable/sortable.js", "_onDragOver", 112);
_yuitest_coverline("build/sortable/sortable.js", 113);
if (!e.drop.get(NODE).test(this.get(NODES))) {
                _yuitest_coverline("build/sortable/sortable.js", 114);
return;
            }
            _yuitest_coverline("build/sortable/sortable.js", 116);
if (e.drag.get(NODE) == e.drop.get(NODE)) {
                _yuitest_coverline("build/sortable/sortable.js", 117);
return;
            }
            // is drop a child of drag?
            _yuitest_coverline("build/sortable/sortable.js", 120);
if (e.drag.get(NODE).contains(e.drop.get(NODE))) {
                _yuitest_coverline("build/sortable/sortable.js", 121);
return;
            }
            _yuitest_coverline("build/sortable/sortable.js", 123);
var same = false, dir, oldNode, newNode, dropsort, dropNode,
                moveType = this.get('moveType').toLowerCase();

            _yuitest_coverline("build/sortable/sortable.js", 126);
if (e.drag.get(NODE).get(PARENT_NODE).contains(e.drop.get(NODE))) {
                _yuitest_coverline("build/sortable/sortable.js", 127);
same = true;
            }
            _yuitest_coverline("build/sortable/sortable.js", 129);
if (same && moveType == 'move') {
                _yuitest_coverline("build/sortable/sortable.js", 130);
moveType = 'insert';
            }
            _yuitest_coverline("build/sortable/sortable.js", 132);
switch (moveType) {
                case 'insert':
                    _yuitest_coverline("build/sortable/sortable.js", 134);
dir = ((this._up) ? 'before' : 'after');
                    _yuitest_coverline("build/sortable/sortable.js", 135);
dropNode = e.drop.get(NODE);
                    _yuitest_coverline("build/sortable/sortable.js", 136);
if (Y.Sortable._test(dropNode, this.get(CONT))) {
                        _yuitest_coverline("build/sortable/sortable.js", 137);
dropNode.append(e.drag.get(NODE));
                    } else {
                        _yuitest_coverline("build/sortable/sortable.js", 139);
dropNode.insert(e.drag.get(NODE), dir);
                    }
                    _yuitest_coverline("build/sortable/sortable.js", 141);
break;
                case 'swap':
                    _yuitest_coverline("build/sortable/sortable.js", 143);
Y.DD.DDM.swapNode(e.drag, e.drop);
                    _yuitest_coverline("build/sortable/sortable.js", 144);
break;
                case 'move':
                case 'copy':
                    _yuitest_coverline("build/sortable/sortable.js", 147);
dropsort = Y.Sortable.getSortable(e.drop.get(NODE).get(PARENT_NODE));

                    _yuitest_coverline("build/sortable/sortable.js", 149);
if (!dropsort) {
                        _yuitest_coverline("build/sortable/sortable.js", 150);
return;
                    }
                    
                    _yuitest_coverline("build/sortable/sortable.js", 153);
Y.DD.DDM.getDrop(e.drag.get(NODE)).addToGroup(dropsort.get(ID));

                    //Same List
                    _yuitest_coverline("build/sortable/sortable.js", 156);
if (same) {
                        _yuitest_coverline("build/sortable/sortable.js", 157);
Y.DD.DDM.swapNode(e.drag, e.drop);
                    } else {
                        _yuitest_coverline("build/sortable/sortable.js", 159);
if (this.get('moveType') == 'copy') {
                            //New List
                            _yuitest_coverline("build/sortable/sortable.js", 161);
oldNode = e.drag.get(NODE);
                            _yuitest_coverline("build/sortable/sortable.js", 162);
newNode = oldNode.cloneNode(true);

                            _yuitest_coverline("build/sortable/sortable.js", 164);
newNode.set(ID, '');
                            _yuitest_coverline("build/sortable/sortable.js", 165);
e.drag.set(NODE, newNode);
                            _yuitest_coverline("build/sortable/sortable.js", 166);
dropsort.delegate.createDrop(newNode, [dropsort.get(ID)]);
                            _yuitest_coverline("build/sortable/sortable.js", 167);
oldNode.setStyles({
                                top: '',
                                left: ''
                            });
                        }
                        _yuitest_coverline("build/sortable/sortable.js", 172);
e.drop.get(NODE).insert(e.drag.get(NODE), 'before');
                    }
                    _yuitest_coverline("build/sortable/sortable.js", 174);
break;
            }

            _yuitest_coverline("build/sortable/sortable.js", 177);
this.fire(moveType, { same: same, drag: e.drag, drop: e.drop });
            _yuitest_coverline("build/sortable/sortable.js", 178);
this.fire('moved', { same: same, drag: e.drag, drop: e.drop });
        },
        /**
        * @private
        * @method _onDragStart
        * @param Event e The Event Object
        * @description Handles the DragStart event and initializes some settings.
        */
        _onDragStart: function(e) {
            _yuitest_coverfunc("build/sortable/sortable.js", "_onDragStart", 186);
_yuitest_coverline("build/sortable/sortable.js", 187);
var del = this.delegate,
                lastNode = del.get('lastNode');
            _yuitest_coverline("build/sortable/sortable.js", 189);
if (lastNode && lastNode.getDOMNode()) {
                _yuitest_coverline("build/sortable/sortable.js", 190);
lastNode.setStyle(ZINDEX, '');
            }
            _yuitest_coverline("build/sortable/sortable.js", 192);
del.get(this.get(OPACITY_NODE)).setStyle(OPACITY, this.get(OPACITY));
            _yuitest_coverline("build/sortable/sortable.js", 193);
del.get(CURRENT_NODE).setStyle(ZINDEX, '999');
        },
        /**
        * @private
        * @method _onDragEnd
        * @param Event e The Event Object
        * @description Handles the DragEnd event that cleans up the settings in the drag:start event.
        */
        _onDragEnd: function(e) {
            _yuitest_coverfunc("build/sortable/sortable.js", "_onDragEnd", 201);
_yuitest_coverline("build/sortable/sortable.js", 202);
this.delegate.get(this.get(OPACITY_NODE)).setStyle(OPACITY, 1);
            _yuitest_coverline("build/sortable/sortable.js", 203);
this.delegate.get(CURRENT_NODE).setStyles({
                top: '',
                left: ''
            });
            _yuitest_coverline("build/sortable/sortable.js", 207);
this.sync();
        },
        /**
        * @method plug
        * @param Class cls The class to plug
        * @param Object config The class config
        * @description Passthrough to the DD.Delegate.ddplug method
        * @chainable
        */
        plug: function(cls, config) {
            //I don't like this.. Not at all, need to discuss with the team
            _yuitest_coverfunc("build/sortable/sortable.js", "plug", 216);
_yuitest_coverline("build/sortable/sortable.js", 218);
if (cls && cls.NAME.substring(0, 4).toLowerCase() === 'sort') {
                _yuitest_coverline("build/sortable/sortable.js", 219);
this.constructor.superclass.plug.call(this, cls, config);
            } else {
                _yuitest_coverline("build/sortable/sortable.js", 221);
this.delegate.dd.plug(cls, config);
            }
            _yuitest_coverline("build/sortable/sortable.js", 223);
return this;
        },
        /**
        * @method sync
        * @description Passthrough to the DD.Delegate syncTargets method.
        * @chainable
        */
        sync: function() {
            _yuitest_coverfunc("build/sortable/sortable.js", "sync", 230);
_yuitest_coverline("build/sortable/sortable.js", 231);
this.delegate.syncTargets();
            _yuitest_coverline("build/sortable/sortable.js", 232);
return this;
        },
        destructor: function() {
            _yuitest_coverfunc("build/sortable/sortable.js", "destructor", 234);
_yuitest_coverline("build/sortable/sortable.js", 235);
this.drop.destroy();
            _yuitest_coverline("build/sortable/sortable.js", 236);
this.delegate.destroy();
            _yuitest_coverline("build/sortable/sortable.js", 237);
Sortable.unreg(this);
        },
        /**
        * @method join
        * @param Sortable sel The Sortable list to join with
        * @param String type The type of join to do: full, inner, outer, none. Default: full
        * @description Join this Sortable with another Sortable instance.
        * <ul>
        *   <li>full: Exchange nodes with both lists.</li>
        *   <li>inner: Items can go into this list from the joined list.</li>
        *   <li>outer: Items can go out of the joined list into this list.</li>
        *   <li>none: Removes the join.</li>
        * </ul>
        * @chainable
        */
        join: function(sel, type) {
            _yuitest_coverfunc("build/sortable/sortable.js", "join", 252);
_yuitest_coverline("build/sortable/sortable.js", 253);
if (!(sel instanceof Y.Sortable)) {
                _yuitest_coverline("build/sortable/sortable.js", 254);
Y.error('Sortable: join needs a Sortable Instance');
                _yuitest_coverline("build/sortable/sortable.js", 255);
return this;
            }
            _yuitest_coverline("build/sortable/sortable.js", 257);
if (!type) {
                _yuitest_coverline("build/sortable/sortable.js", 258);
type = 'full';
            }
            _yuitest_coverline("build/sortable/sortable.js", 260);
type = type.toLowerCase();
            _yuitest_coverline("build/sortable/sortable.js", 261);
var method = '_join_' + type;

            _yuitest_coverline("build/sortable/sortable.js", 263);
if (this[method]) {
                _yuitest_coverline("build/sortable/sortable.js", 264);
this[method](sel);
            }
            
            _yuitest_coverline("build/sortable/sortable.js", 267);
return this;
        },
        /**
        * @private
        * @method _join_none
        * @param Sortable sel The Sortable to remove the join from
        * @description Removes the join with the passed Sortable.
        */
        _join_none: function(sel) {
            _yuitest_coverfunc("build/sortable/sortable.js", "_join_none", 275);
_yuitest_coverline("build/sortable/sortable.js", 276);
this.delegate.dd.removeFromGroup(sel.get(ID));
            _yuitest_coverline("build/sortable/sortable.js", 277);
sel.delegate.dd.removeFromGroup(this.get(ID));
        },
        /**
        * @private
        * @method _join_full
        * @param Sortable sel The Sortable list to join with
        * @description Joins both of the Sortables together.
        */
        _join_full: function(sel) {
            _yuitest_coverfunc("build/sortable/sortable.js", "_join_full", 285);
_yuitest_coverline("build/sortable/sortable.js", 286);
this.delegate.dd.addToGroup(sel.get(ID));
            _yuitest_coverline("build/sortable/sortable.js", 287);
sel.delegate.dd.addToGroup(this.get(ID));
        },
        /**
        * @private
        * @method _join_outer
        * @param Sortable sel The Sortable list to join with
        * @description Allows this Sortable to accept items from the passed Sortable.
        */
        _join_outer: function(sel) {
            _yuitest_coverfunc("build/sortable/sortable.js", "_join_outer", 295);
_yuitest_coverline("build/sortable/sortable.js", 296);
this.delegate.dd.addToGroup(sel.get(ID));
        },
        /**
        * @private
        * @method _join_inner
        * @param Sortable sel The Sortable list to join with
        * @description Allows this Sortable to give items to the passed Sortable.
        */
        _join_inner: function(sel) {
            _yuitest_coverfunc("build/sortable/sortable.js", "_join_inner", 304);
_yuitest_coverline("build/sortable/sortable.js", 305);
sel.delegate.dd.addToGroup(this.get(ID));
        },
        /**
        * A custom callback to allow a user to extract some sort of id or any other data from the node to use in the "ordering list" and then that data should be returned from the callback.
        * @method getOrdering
        * @param Function callback 
        * @return Array
        */
        getOrdering: function(callback) {
            _yuitest_coverfunc("build/sortable/sortable.js", "getOrdering", 313);
_yuitest_coverline("build/sortable/sortable.js", 314);
var ordering = [];

            _yuitest_coverline("build/sortable/sortable.js", 316);
if (!Y.Lang.isFunction(callback)) {
                _yuitest_coverline("build/sortable/sortable.js", 317);
callback = function (node) {
                    _yuitest_coverfunc("build/sortable/sortable.js", "callback", 317);
_yuitest_coverline("build/sortable/sortable.js", 318);
return node;
                };
            }

            _yuitest_coverline("build/sortable/sortable.js", 322);
Y.one(this.get(CONT)).all(this.get(NODES)).each(function(node) {
                _yuitest_coverfunc("build/sortable/sortable.js", "(anonymous 2)", 322);
_yuitest_coverline("build/sortable/sortable.js", 323);
ordering.push(callback(node));
            });
            _yuitest_coverline("build/sortable/sortable.js", 325);
return ordering;
       }
    }, {
        NAME: 'sortable',
        ATTRS: {
            /**
            * @attribute handles
            * @description Drag handles to pass on to the internal DD.Delegate instance.
            * @type Array
            */    
            handles: {
                value: false
            },
            /**
            * @attribute container
            * @description A selector query to get the container to listen for mousedown events on. All "nodes" should be a child of this container.
            * @type String
            */    
            container: {
                value: 'body'
            },
            /**
            * @attribute nodes
            * @description A selector query to get the children of the "container" to make draggable elements from.
            * @type String
            */        
            nodes: {
                value: '.dd-draggable'
            },
            /**
            * @attribute opacity
            * @description The opacity to change the proxy item to when dragging.
            * @type String
            */        
            opacity: {
                value: '.75'
            },
            /**
            * @attribute opacityNode
            * @description The node to set opacity on when dragging (dragNode or currentNode). Default: currentNode.
            * @type String
            */        
            opacityNode: {
                value: 'currentNode'
            },
            /**
            * @attribute id
            * @description The id of this Sortable, used to get a reference to this Sortable list from another list.
            * @type String
            */        
            id: {
                value: null
            },
            /**
            * @attribute moveType
            * @description How should an item move to another list: insert, swap, move, copy. Default: insert
            * @type String
            */        
            moveType: {
                value: 'insert'
            },
            /**
            * @attribute invalid
            * @description A selector string to test if a list item is invalid and not sortable
            * @type String
            */        
            invalid: {
                value: ''
            }
        },
        /**
        * @static
        * @property _sortables
        * @private
        * @type Array
        * @description Hash map of all Sortables on the page.
        */
        _sortables: [],
        /**
        * @static
        * @method _test
        * @param {Node} node The node instance to test.
        * @param {String|Node} test The node instance or selector string to test against.
        * @description Test a Node or a selector for the container
        */
        _test: function(node, test) {
            _yuitest_coverfunc("build/sortable/sortable.js", "_test", 410);
_yuitest_coverline("build/sortable/sortable.js", 411);
var ret;
            _yuitest_coverline("build/sortable/sortable.js", 412);
if (test instanceof Y.Node) {
                _yuitest_coverline("build/sortable/sortable.js", 413);
ret = (test === node);
            } else {
                _yuitest_coverline("build/sortable/sortable.js", 415);
ret = node.test(test);
            }
            _yuitest_coverline("build/sortable/sortable.js", 417);
return ret;
        },
        /**
        * @static
        * @method getSortable
        * @param {String|Node} node The node instance or selector string to use to find a Sortable instance.
        * @description Get a Sortable instance back from a node reference or a selector string.
        */
        getSortable: function(node) {
            _yuitest_coverfunc("build/sortable/sortable.js", "getSortable", 425);
_yuitest_coverline("build/sortable/sortable.js", 426);
var s = null;
            _yuitest_coverline("build/sortable/sortable.js", 427);
node = Y.one(node);
            _yuitest_coverline("build/sortable/sortable.js", 428);
Y.each(Y.Sortable._sortables, function(v) {
                _yuitest_coverfunc("build/sortable/sortable.js", "(anonymous 3)", 428);
_yuitest_coverline("build/sortable/sortable.js", 429);
if (Y.Sortable._test(node, v.get(CONT))) {
                    _yuitest_coverline("build/sortable/sortable.js", 430);
s = v;
                }
            });
            _yuitest_coverline("build/sortable/sortable.js", 433);
return s;
        },
        /**
        * @static
        * @method reg
        * @param Sortable s A Sortable instance.
        * @description Register a Sortable instance with the singleton to allow lookups later.
        */
        reg: function(s) {
            _yuitest_coverfunc("build/sortable/sortable.js", "reg", 441);
_yuitest_coverline("build/sortable/sortable.js", 442);
Y.Sortable._sortables.push(s);
        },
        /**
        * @static
        * @method unreg
        * @param Sortable s A Sortable instance.
        * @description Unregister a Sortable instance with the singleton.
        */
        unreg: function(s) {
            _yuitest_coverfunc("build/sortable/sortable.js", "unreg", 450);
_yuitest_coverline("build/sortable/sortable.js", 451);
Y.each(Y.Sortable._sortables, function(v, k) {
                _yuitest_coverfunc("build/sortable/sortable.js", "(anonymous 4)", 451);
_yuitest_coverline("build/sortable/sortable.js", 452);
if (v === s) {
                    _yuitest_coverline("build/sortable/sortable.js", 453);
Y.Sortable._sortables[k] = null;
                    _yuitest_coverline("build/sortable/sortable.js", 454);
delete Sortable._sortables[k];
                }
            });
        }
    });

    _yuitest_coverline("build/sortable/sortable.js", 460);
Y.Sortable = Sortable;

    /**
    * @event copy
    * @description A Sortable node was moved with a copy.
    * @param {Event.Facade} event An Event Facade object
    * @param {Boolean} event.same Moved to the same list.
    * @param {DD.Drag} event.drag The drag instance.
    * @param {DD.Drop} event.drop The drop instance.
    * @type {Event.Custom}
    */
    /**
    * @event move
    * @description A Sortable node was moved with a move.
    * @param {Event.Facade} event An Event Facade object with the following specific property added:
    * @param {Boolean} event.same Moved to the same list.
    * @param {DD.Drag} event.drag The drag instance.
    * @param {DD.Drop} event.drop The drop instance.
    * @type {Event.Custom}
    */
    /**
    * @event insert
    * @description A Sortable node was moved with an insert.
    * @param {Event.Facade} event An Event Facade object with the following specific property added:
    * @param {Boolean} event.same Moved to the same list.
    * @param {DD.Drag} event.drag The drag instance.
    * @param {DD.Drop} event.drop The drop instance.
    * @type {Event.Custom}
    */
    /**
    * @event swap
    * @description A Sortable node was moved with a swap.
    * @param {Event.Facade} event An Event Facade object with the following specific property added:
    * @param {Boolean} event.same Moved to the same list.
    * @param {DD.Drag} event.drag The drag instance.
    * @param {DD.Drop} event.drop The drop instance.
    * @type {Event.Custom}
    */
    /**
    * @event moved
    * @description A Sortable node was moved.
    * @param {Event.Facade} event An Event Facade object with the following specific property added:
    * @param {Boolean} event.same Moved to the same list.
    * @param {DD.Drag} event.drag The drag instance.
    * @param {DD.Drop} event.drop The drop instance.
    * @type {Event.Custom}
    */



}, '@VERSION@', {"requires": ["dd-delegate", "dd-drop-plugin", "dd-proxy"]});
