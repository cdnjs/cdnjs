YUI.add('sortable', function(Y) {


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


    var Sortable = function(o) {
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


    Y.extend(Sortable, Y.Base, {
        /**
        * @property delegate
        * @type DD.Delegate
        * @description A reference to the DD.Delegate instance.
        */
        delegate: null,
        initializer: function() {
            var id = 'sortable-' + Y.guid(), c,
                delConfig = {
                    container: this.get(CONT),
                    nodes: this.get(NODES),
                    target: true,
                    invalid: this.get('invalid'),
                    dragConfig: {
                        groups: [ id ]
                    }
                }, del;

            if (this.get('handles')) {
                delConfig.handles = this.get('handles');
            }
            del = new Y.DD.Delegate(delConfig);

            this.set(ID, id);

            del.dd.plug(Y.Plugin.DDProxy, {
                moveOnEnd: false,
                cloneNode: true
            });

            c = new Y.DD.Drop({
                node: this.get(CONT),
                bubbleTarget: del,
                groups: del.dd.get('groups')
            }).on('drop:over', Y.bind(this._onDropOver, this));
            
            del.on({
                'drag:start': Y.bind(this._onDragStart, this),
                'drag:end': Y.bind(this._onDragEnd, this),
                'drag:over': Y.bind(this._onDragOver, this),
                'drag:drag': Y.bind(this._onDrag, this)
            });

            this.delegate = del;
            Sortable.reg(this);
        },
        _up: null,
        _y: null,
        _onDrag: function(e) {
            if (e.pageY < this._y) {
                this._up = true; 
            } else if (e.pageY > this._y) { 
                this._up = false; 
            } 

            this._y = e.pageY;
        },
        /**
        * @private
        * @method _onDropOver
        * @param Event e The Event Object
        * @description Handles the DropOver event to append a drop node to an empty target
        */
        _onDropOver: function(e) {
            if (!e.drop.get(NODE).test(this.get(NODES))) {
                var nodes = e.drop.get(NODE).all(this.get(NODES));
                if (nodes.size() === 0) {
                    e.drop.get(NODE).append(e.drag.get(NODE));
                }
            }
        },
        /**
        * @private
        * @method _onDragOver
        * @param Event e The Event Object
        * @description Handles the DragOver event that moves the object in the list or to another list.
        */
        _onDragOver: function(e) {
            if (!e.drop.get(NODE).test(this.get(NODES))) {
                return;
            }
            if (e.drag.get(NODE) == e.drop.get(NODE)) {
                return;
            }

            switch (this.get('moveType').toLowerCase()) {
                case 'insert':
                    var dir = ((this._up) ? 'before' : 'after');
                    e.drop.get(NODE).insert(e.drag.get(NODE), dir);
                    break;
                case 'swap':
                    Y.DD.DDM.swapNode(e.drag, e.drop);
                    break;
                case 'move':
                case 'copy':
                    var dropsort = Y.Sortable.getSortable(e.drop.get(NODE).get(PARENT_NODE)),
                        oldNode, newNode;

                    if (!dropsort) {
                        return;
                    }
                    
                    Y.DD.DDM.getDrop(e.drag.get(NODE)).addToGroup(dropsort.get(ID));

                    //Same List
                    if (e.drag.get(NODE).get(PARENT_NODE).contains(e.drop.get(NODE))) {
                        Y.DD.DDM.swapNode(e.drag, e.drop);
                    } else {
                        if (this.get('moveType') == 'copy') {
                            //New List
                            oldNode = e.drag.get(NODE);
                            newNode = oldNode.cloneNode(true);

                            newNode.set(ID, '');
                            e.drag.set(NODE, newNode);
                            dropsort.delegate.createDrop(newNode, [dropsort.get(ID)]);
                            oldNode.setStyles({
                                top: '',
                                left: ''
                            });
                        }
                        e.drop.get(NODE).insert(e.drag.get(NODE), 'before');
                    }
                    break;
            }
        },
        /**
        * @private
        * @method _onDragStart
        * @param Event e The Event Object
        * @description Handles the DragStart event and initializes some settings.
        */
        _onDragStart: function(e) {
            this.delegate.get('lastNode').setStyle(ZINDEX, '');
            this.delegate.get(this.get(OPACITY_NODE)).setStyle(OPACITY, this.get(OPACITY));
            this.delegate.get(CURRENT_NODE).setStyle(ZINDEX, '999');
        },
        /**
        * @private
        * @method _onDragEnd
        * @param Event e The Event Object
        * @description Handles the DragEnd event that cleans up the settings in the drag:start event.
        */
        _onDragEnd: function(e) {
            this.delegate.get(this.get(OPACITY_NODE)).setStyle(OPACITY, 1);
            this.delegate.get(CURRENT_NODE).setStyles({
                top: '',
                left: ''
            });
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
            this.delegate.dd.plug(cls, config);
            return this;
        },
        /**
        * @method plug
        * @description Passthrough to the DD.Delegate syncTargets method.
        * @chainable
        */
        sync: function() {
            this.delegate.syncTargets();
            return this;
        },
        destructor: function() {
            this.delegate.destroy();
            Sortable.unreg(this);
        },
        /**
        * @method join
        * @param Sortable sel The sortable list to join with
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
            if (!(sel instanceof Y.Sortable)) {
                Y.error('Sortable: join needs a Sortable Instance');
                return this;
            }
            if (!type) {
                type = 'full';
            }
            type = type.toLowerCase();
            var method = '_join_' + type;

            if (this[method]) {
                this[method](sel);
            }
            
            return this;
        },
        /**
        * @private
        * @method _join_none
        * @param Sortable sel The Sortable to remove the join from
        * @description Removes the join with the passed Sortable.
        */
        _join_none: function(sel) {
            this.delegate.dd.removeFromGroup(sel.get(ID));
            sel.delegate.dd.removeFromGroup(this.get(ID));
        },
        /**
        * @private
        * @method _join_full
        * @param Sortable sel The sortable list to join with
        * @description Joins both of the Sortables together.
        */
        _join_full: function(sel) {
            this.delegate.dd.addToGroup(sel.get(ID));
            sel.delegate.dd.addToGroup(this.get(ID));
        },
        /**
        * @private
        * @method _join_outer
        * @param Sortable sel The sortable list to join with
        * @description Allows this Sortable to accept items from the passed Sortable.
        */
        _join_outer: function(sel) {
            this.delegate.dd.addToGroup(sel.get(ID));
        },
        /**
        * @private
        * @method _join_inner
        * @param Sortable sel The sortable list to join with
        * @description Allows this Sortable to give items to the passed Sortable.
        */
        _join_inner: function(sel) {
            sel.delegate.dd.addToGroup(this.get(ID));
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
            * @description The ocpacity to test the proxy item to when dragging.
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
            * @description The id of this sortable, used to get a reference to this sortable list from another list.
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
        * @method getSortable
        * @param {String|Node} node The node instance or selector string to use to find a Sortable instance.
        * @description Get a sortable instance back from a node reference or a selector string.
        */
        getSortable: function(node) {
            var s = null;
            node = Y.one(node);
            Y.each(Sortable._sortables, function(v) {
                if (node.test(v.get(CONT))) {
                    s = v;
                }
            });
            return s;
        },
        /**
        * @static
        * @method reg
        * @param Sortable s A Sortable instance.
        * @description Register a Sortable instance with the singleton to allow lookups later.
        */
        reg: function(s) {
            Sortable._sortables.push(s);
        },
        /**
        * @static
        * @method unreg
        * @param Sortable s A Sortable instance.
        * @description Unregister a Sortable instance with the singleton.
        */
        unreg: function(s) {
            Y.each(Sortable._sortables, function(v, k) {
                if (v === s) {
                    Sortable._sortables[k] = null;
                    delete Sortable._sortables[k];
                }
            });
        }
    });

    Y.Sortable = Sortable;



}, '@VERSION@' ,{requires:['dd-delegate', 'dd-drop-plugin', 'dd-proxy']});
