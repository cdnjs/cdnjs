/** 
 * This class is used as a set of methods that are applied to the prototype of a
 * Model to decorate it with a Node API. This means that models used in conjunction with a tree
 * will have all of the tree related methods available on the model. In general this class will
 * not be used directly by the developer. This class also creates extra fields on the model if
 * they do not exist, to help maintain the tree state and UI. These fields are documented as
 * config options.
 */
Ext.define('Ext.data.NodeInterface', {
    requires: [
        'Ext.data.field.Boolean',
        'Ext.data.field.Integer',
        'Ext.data.field.String',
        'Ext.data.writer.Json',
        'Ext.mixin.Observable'
    ],

    /**
     * @cfg {String} parentId
     * ID of parent node.
     */

    /**
     * @cfg {Number} index
     * The position of the node inside its parent. When parent has 4 children and the node is third amongst them,
     * index will be 2.
     */

    /**
     * @cfg {Number} depth
     * The number of parents this node has. A root node has depth 0, a child of it depth 1, and so on...
     */

    /**
     * @cfg {Boolean} [expanded=false]
     * True if the node is expanded.
     */

    /**
     * @cfg {Boolean} [expandable=false]
     * Set to true to allow for expanding/collapsing of this node.
     */

    /**
     * @cfg {Boolean} [checked=null]
     * Set to true or false to show a checkbox alongside this node.
     */

    /**
     * @cfg {Boolean} [leaf=false]
     * Set to true to indicate that this child can have no children. The expand icon/arrow will then not be
     * rendered for this node.
     */

    /**
     * @cfg {String} cls
     * CSS class to apply for this node.
     */

    /**
     * @cfg {String} iconCls
     * CSS class to apply for this node's icon.
     *
     * There are no default icon classes that come with Ext JS.
     */

    /**
     * @cfg {String} icon
     * URL for this node's icon.
     *
     * There are no default icons that come with Ext JS.
     */

    /**
     * @cfg {Boolean} root
     * True if this is the root node.
     */

    /**
     * @cfg {Boolean} isLast
     * True if this is the last node.
     */

    /**
     * @cfg {Boolean} isFirst
     * True if this is the first node.
     */

    /**
     * @cfg {Boolean} [allowDrop=true]
     * Set to false to deny dropping on this node.
     */

    /**
     * @cfg {Boolean} [allowDrag=true]
     * Set to false to deny dragging of this node.
     */

    /**
     * @cfg {Boolean} [loaded=false]
     * True if the node has finished loading.
     */

    /**
     * @cfg {Boolean} [loading=false]
     * True if the node is currently loading.
     */

    /**
     * @cfg {String} href
     * An URL for a link that's created when this config is specified.
     */

    /**
     * @cfg {String} hrefTarget
     * Target for link. Only applicable when {@link #href} also specified.
     */

    /**
     * @cfg {String} qtip
     * Tooltip text to show on this node.
     */

    /**
     * @cfg {String} qtitle
     * Tooltip title.
     */

    /**
     * @cfg {Number} qshowDelay
     * Tooltip showDelay.
     */

    /**
     * @cfg {String} text
     * The text to show on node label.
     */

    /**
     * @cfg {Ext.data.NodeInterface[]} children
     * Array of child nodes.
     */


    /**
     * @property {Ext.data.NodeInterface} nextSibling
     * A reference to this node's next sibling node. `null` if this node does not have a next sibling.
     */

    /**
     * @property {Ext.data.NodeInterface} previousSibling
     * A reference to this node's previous sibling node. `null` if this node does not have a previous sibling.
     */

    /**
     * @property {Ext.data.NodeInterface} parentNode
     * A reference to this node's parent node. `null` if this node is the root node.
     */

    /**
     * @property {Ext.data.NodeInterface} lastChild
     * A reference to this node's last child node. `null` if this node has no children.
     */

    /**
     * @property {Ext.data.NodeInterface} firstChild
     * A reference to this node's first child node. `null` if this node has no children.
     */

    /**
     * @property {Ext.data.NodeInterface[]} childNodes
     * An array of this nodes children.  Array will be empty if this node has no chidren.
     */

    statics: {
        /**
         * This method allows you to decorate a Model's class to implement the NodeInterface.
         * This adds a set of methods, new events, new properties and new fields on every Record.
         * @param {Ext.Class/Ext.data.Model} model The Model class or an instance of the Model class you want to
         * decorate the prototype of.
         * @static
         */
        decorate: function (modelClass) {
            var model = Ext.data.schema.Schema.lookupEntity(modelClass),
                proto = model.prototype,
                idName, idField, idType;
            
            if (!model.prototype.isObservable) {
                model.mixin(Ext.mixin.Observable.prototype.mixinId, Ext.mixin.Observable);
            }
            if (proto.isNode) { // if (already decorated)
                return;
            }

            idName  = proto.idProperty;
            idField = model.getField(idName);
            idType  = idField.type;

            model.override(this.getPrototypeBody());
            model.addFields([
                { name : 'parentId',   type : idType,    defaultValue : null,  allowNull : idField.allowNull            },
                { name : 'index',      type : 'int',     defaultValue : -1,    persist : false          , convert: null },
                { name : 'depth',      type : 'int',     defaultValue : 0,     persist : false          , convert: null },
                { name : 'expanded',   type : 'bool',    defaultValue : false, persist : false          , convert: null },
                { name : 'expandable', type : 'bool',    defaultValue : true,  persist : false          , convert: null },
                { name : 'checked',    type : 'auto',    defaultValue : null,  persist : false          , convert: null },
                { name : 'leaf',       type : 'bool',    defaultValue : false                            },
                { name : 'cls',        type : 'string',  defaultValue : '',    persist : false          , convert: null },
                { name : 'iconCls',    type : 'string',  defaultValue : '',    persist : false          , convert: null },
                { name : 'icon',       type : 'string',  defaultValue : '',    persist : false          , convert: null },
                { name : 'root',       type : 'boolean', defaultValue : false, persist : false          , convert: null },
                { name : 'isLast',     type : 'boolean', defaultValue : false, persist : false          , convert: null },
                { name : 'isFirst',    type : 'boolean', defaultValue : false, persist : false          , convert: null },
                { name : 'allowDrop',  type : 'boolean', defaultValue : true,  persist : false          , convert: null },
                { name : 'allowDrag',  type : 'boolean', defaultValue : true,  persist : false          , convert: null },
                { name : 'loaded',     type : 'boolean', defaultValue : false, persist : false          , convert: null },
                { name : 'loading',    type : 'boolean', defaultValue : false, persist : false          , convert: null },
                { name : 'href',       type : 'string',  defaultValue : '',    persist : false          , convert: null },
                { name : 'hrefTarget', type : 'string',  defaultValue : '',    persist : false          , convert: null },
                { name : 'qtip',       type : 'string',  defaultValue : '',    persist : false          , convert: null },
                { name : 'qtitle',     type : 'string',  defaultValue : '',    persist : false          , convert: null },
                { name : 'qshowDelay', type : 'int',     defaultValue : 0,     persist : false          , convert: null },
                { name : 'children',   type : 'auto',    defaultValue : null,  persist : false          , convert: null },
                { name : 'visible',    type : 'boolean', defaultValue : true,  persist : false },
                { name : 'text',       type : 'string',                        persist : false }
            ]);
        },

        getPrototypeBody: function() {
            var bubbledEvents = {
                idchanged     : true,
                append        : true,
                remove        : true,
                move          : true,
                insert        : true,
                beforeappend  : true,
                beforeremove  : true,
                beforemove    : true,
                beforeinsert  : true,
                expand        : true,
                collapse      : true,
                beforeexpand  : true,
                beforecollapse: true,
                sort          : true
            };
            return {
                /**
                 * @property {Boolean} isNode
                 * `true` in this class to identify an object as an instantiated Node, or subclass thereof.
                 */
                isNode: true,
                
                constructor: function() {
                    var me = this;

                    me.mixins.observable.constructor.call(me);
                    me.callParent(arguments);
                    me.firstChild = me.lastChild = me.parentNode = me.previousSibling = me.nextSibling = null;
                    me.childNodes = [];

                    // These events are fired on this node, and programatically bubble up the parentNode axis, ending up 
                    // walking off the top and firing on the owning Ext.data.TreeStore
                    /**
                     * @event append
                     * Fires when a new child node is appended
                     * @param {Ext.data.NodeInterface} this This node
                     * @param {Ext.data.NodeInterface} node The newly appended node
                     * @param {Number} index The index of the newly appended node
                     */
                    /**
                     * @event remove
                     * Fires when a child node is removed
                     * @param {Ext.data.NodeInterface} this This node
                     * @param {Ext.data.NodeInterface} node The removed node
                     * @param {Boolean} isMove `true` if the child node is being removed so it can be moved to another position in the tree.
                     * (a side effect of calling {@link Ext.data.NodeInterface#appendChild appendChild} or
                     * {@link Ext.data.NodeInterface#insertBefore insertBefore} with a node that already has a parentNode)
                     */
                    /**
                     * @event move
                     * Fires when this node is moved to a new location in the tree
                     * @param {Ext.data.NodeInterface} this This node
                     * @param {Ext.data.NodeInterface} oldParent The old parent of this node
                     * @param {Ext.data.NodeInterface} newParent The new parent of this node
                     * @param {Number} index The index it was moved to
                     */
                    /**
                     * @event insert
                     * Fires when a new child node is inserted.
                     * @param {Ext.data.NodeInterface} this This node
                     * @param {Ext.data.NodeInterface} node The child node inserted
                     * @param {Ext.data.NodeInterface} refNode The child node the node was inserted before
                     */
                    /**
                     * @event beforeappend
                     * Fires before a new child is appended, return false to cancel the append.
                     * @param {Ext.data.NodeInterface} this This node
                     * @param {Ext.data.NodeInterface} node The child node to be appended
                     */
                    /**
                     * @event beforeremove
                     * Fires before a child is removed, return false to cancel the remove.
                     * @param {Ext.data.NodeInterface} this This node
                     * @param {Ext.data.NodeInterface} node The child node to be removed
                     * @param {Boolean} isMove `true` if the child node is being removed so it can be moved to another position in the tree.
                     * (a side effect of calling {@link Ext.data.NodeInterface#appendChild appendChild} or
                     * {@link Ext.data.NodeInterface#insertBefore insertBefore} with a node that already has a parentNode)
                     */
                    /**
                     * @event beforemove
                     * Fires before this node is moved to a new location in the tree. Return false to cancel the move.
                     * @param {Ext.data.NodeInterface} this This node
                     * @param {Ext.data.NodeInterface} oldParent The parent of this node
                     * @param {Ext.data.NodeInterface} newParent The new parent this node is moving to
                     * @param {Number} index The index it is being moved to
                     */
                    /**
                     * @event beforeinsert
                     * Fires before a new child is inserted, return false to cancel the insert.
                     * @param {Ext.data.NodeInterface} this This node
                     * @param {Ext.data.NodeInterface} node The child node to be inserted
                     * @param {Ext.data.NodeInterface} refNode The child node the node is being inserted before
                     */
                    /**
                     * @event expand
                     * Fires when this node is expanded.
                     * @param {Ext.data.NodeInterface} this The expanding node
                     */
                    /**
                     * @event collapse
                     * Fires when this node is collapsed.
                     * @param {Ext.data.NodeInterface} this The collapsing node
                     */
                    /**
                     * @event beforeexpand
                     * Fires before this node is expanded.
                     * @param {Ext.data.NodeInterface} this The expanding node
                     */
                    /**
                     * @event beforecollapse
                     * Fires before this node is collapsed.
                     * @param {Ext.data.NodeInterface} this The collapsing node
                     */
                    /**
                     * @event sort
                     * Fires when this node's childNodes are sorted.
                     * @param {Ext.data.NodeInterface} this This node.
                     * @param {Ext.data.NodeInterface[]} childNodes The childNodes of this node.
                     */
                    return me;
                },

                /**
                 * Ensures that the passed object is an instance of a Record with the NodeInterface applied
                 * @return {Ext.data.NodeInterface}
                 */
                createNode: function (node) {
                    var me = this,
                        childType = me.childType,
                        store,
                        storeReader,
                        nodeProxy,
                        nodeReader,
                        reader,
                        typeProperty,
                        T = me.self;

                    // Passed node's internal data object
                    if (!node.isModel) {
                        // Check this node type's childType configuration
                        if (childType) {
                            T = me.schema.getEntity(childType);
                        }
                        // See if the reader has a typeProperty and use it if possible
                        else {
                            store = me.getTreeStore();
                            storeReader = store && store.getProxy().getReader();
                            nodeProxy = me.getProxy();
                            nodeReader = nodeProxy ? nodeProxy.getReader() : null;

                            // If the node's reader was configured with a special typeProperty (property name which defines the child type name) use that.
                            reader = !storeReader || (nodeReader && nodeReader.initialConfig.typeProperty) ? nodeReader : storeReader;

                            if (reader) {
                                typeProperty = reader.typeProperty;
                                if (typeProperty) {
                                    T = me.schema.getEntity(node[typeProperty]);
                                }
                            }
                        }

                        node = new T(node);
                    }

                    // The node may already decorated, but may not have been
                    // so when the model constructor was called. If not,
                    // setup defaults here
                    if (!node.childNodes) {
                        node.firstChild = node.lastChild = node.parentNode =
                                node.previousSibling = node.nextSibling = null;
                        node.childNodes = [];
                    }

                    return node;
                },

                /**
                 * Returns true if this node is a leaf
                 * @return {Boolean}
                 */
                isLeaf : function() {
                    return this.get('leaf') === true;
                },

                /**
                 * Sets the first child of this node
                 * @private
                 * @param {Ext.data.NodeInterface} node
                 */
                setFirstChild : function(node) {
                    this.firstChild = node;
                },

                /**
                 * Sets the last child of this node
                 * @private
                 * @param {Ext.data.NodeInterface} node
                 */
                setLastChild : function(node) {
                    this.lastChild = node;
                },

                /**
                 * Updates general data of this node like isFirst, isLast, depth. This
                 * method is internally called after a node is moved. This shouldn't
                 * have to be called by the developer unless they are creating custom
                 * Tree plugins.
                 * @param {Boolean} commit
                 * @param {Object} info The info to update. May contain any of the following
                 *  @param {Object} info.isFirst
                 *  @param {Object} info.isLast
                 *  @param {Object} info.index
                 *  @param {Object} info.depth
                 *  @param {Object} info.parentId
                 */
                updateInfo: function(commit, info) {
                    var me = this,
                        oldDepth = me.data.depth,
                        childInfo = {},
                        children = me.childNodes,
                        childCount = children.length,
                        i,
                        phantom = me.phantom,
                        dataObject = me.data,
                        fields = me.fields,
                        modified = me.modified || (me.modified = {}),
                        propName, newValue,
                        field, currentValue, key,
                        newParentId = info.parentId,
                        settingIndexInNewParent,
                        persistentField;

                    if (!info) {
                        Ext.Error.raise('NodeInterface expects update info to be passed');
                    }

                    // Set the passed field values into the data object.
                    // We do NOT need the expense of Model.set. We just need to ensure
                    // that the dirty flag is set.
                    for (propName in info) {
                        field = fields[me.fieldOrdinals[propName]];
                        newValue = info[propName];
                        persistentField = field && field.persist;

                        currentValue = dataObject[propName];

                        // If we are setting the index value, and the developer has changed it to be persistent, and the
                        // new parent node is different to the starting one, it must be dirty.
                        // The index may be the same value, but it's in a different parent.
                        // This is so that a Writer can write the correct persistent fields which must include
                        // the index to insert at if the parentId has changed.
                        settingIndexInNewParent = persistentField && (propName === 'index') && (currentValue !== -1) && (newParentId && newParentId !== modified.parentId);

                        // If new value is the same (unless we are setting the index in a new parent node), then skip the change.
                        if (!settingIndexInNewParent && me.isEqual(currentValue, newValue)) {
                            continue;
                        }
                        dataObject[propName] = newValue;

                        // Only flag dirty when persistent fields are modified
                        if (persistentField) {

                            // Already modified, just check if we've reverted it back to start value (unless we are setting the index in a new parent node)
                            if (!settingIndexInNewParent && modified.hasOwnProperty(propName)) {

                                // If we have reverted to start value, possibly clear dirty flag
                                if (me.isEqual(modified[propName], newValue)) {
                                    // The original value in me.modified equals the new value, so
                                    // the field is no longer modified:
                                    delete modified[propName];

                                    // We might have removed the last modified field, so check to
                                    // see if there are any modified fields remaining and correct
                                    // me.dirty:
                                    me.dirty = false;
                                    for (key in modified) {
                                        if (modified.hasOwnProperty(key)){
                                            me.dirty = true;
                                            break;
                                        }
                                    }
                                }
                            }

                            // Not already modified, set dirty flag
                            else {
                                me.dirty = true;
                                modified[propName] = currentValue;
                            }
                        }
                    }
                    if (commit) {
                        me.commit();
                        me.phantom = phantom;
                    }

                    // The only way child data can be influenced is if this node has changed level in this update.
                    if (me.data.depth !== oldDepth) {
                        childInfo = {
                            depth: me.data.depth + 1
                        };
                        for (i = 0; i < childCount; i++) {
                            children[i].updateInfo(commit, childInfo);
                        }
                    }
                },

                /**
                 * Returns true if this node is the last child of its parent
                 * @return {Boolean}
                 */
                isLast : function() {
                   return this.get('isLast');
                },

                /**
                 * Returns true if this node is the first child of its parent
                 * @return {Boolean}
                 */
                isFirst : function() {
                   return this.get('isFirst');
                },

                /**
                 * Returns true if this node has one or more child nodes, else false.
                 * @return {Boolean}
                 */
                hasChildNodes : function() {
                    return !this.isLeaf() && this.childNodes.length > 0;
                },

                /**
                 * Returns true if this node has one or more child nodes, or if the <tt>expandable</tt>
                 * node attribute is explicitly specified as true, otherwise returns false.
                 * @return {Boolean}
                 */
                isExpandable : function() {
                    var me = this;

                    if (me.get('expandable')) {
                        return !(me.isLeaf() || (me.isLoaded() && !me.phantom && !me.hasChildNodes()));
                    }
                    return false;
                },
                
                triggerUIUpdate: function() {
                    // This isn't ideal, however none of the underlying fields have changed
                    // but we still need to update the UI
                    this.callJoined('afterEdit', []); 
                },

                /**
                 * Inserts node(s) as the last child node of this node.
                 *
                 * If the node was previously a child node of another parent node, it will be removed from that node first.
                 *
                 * @param {Ext.data.NodeInterface/Ext.data.NodeInterface[]/Object} node The node or Array of nodes to append
                 * @param {Boolean} [suppressEvents=false] True to suppress firering of events.
                 * @param {Boolean} [commit=false]
                 * @return {Ext.data.NodeInterface} The appended node if single append, or null if an array was passed
                 */
                appendChild: function(node, suppressEvents, commit) {
                    var me = this,
                        i, ln,
                        index,
                        oldParent,
                        previousSibling,
                        childInfo = {
                            isLast: true,
                            parentId: me.getId(),
                            depth: (me.data.depth||0) + 1
                        },
                        result;

                    // Coalesce all layouts caused by node append
                    Ext.suspendLayouts();

                    // if passed an array do them one by one
                    if (Ext.isArray(node)) {
                        ln = node.length;
                        result = new Array(ln);
                        // Suspend view updating and data syncing during update
                        me.callJoined('beginFill');
                        for (i = 0; i < ln; i++) {
                            result[i] = me.appendChild(node[i], suppressEvents, commit);
                        }
                        // Resume view updating and data syncing after appending all new children.
                        // This will fire the add event to any views (if its the top level append)
                        me.callJoined('endFill', [result]);
                    } else {
                        // Make sure it is a record
                        node = me.createNode(node);

                        if (suppressEvents !== true && me.fireEventArgs("beforeappend", [me, node]) === false) {
                            return false;
                        }

                        index = me.childNodes.length;
                        oldParent = node.parentNode;

                        // it's a move, make sure we move it cleanly
                        if (oldParent) {
                            if (suppressEvents !== true && node.fireEventArgs("beforemove", [node, oldParent, me, index]) === false) {
                                return false;
                            }
                            oldParent.removeChild(node, false, false, oldParent.getTreeStore() === me.getTreeStore());
                        }

                        index = me.childNodes.length;
                        if (index === 0) {
                            me.setFirstChild(node);
                        }

                        me.childNodes[index] = node;
                        node.parentNode = me;
                        node.nextSibling = null;

                        me.setLastChild(node);

                        previousSibling = me.childNodes[index - 1];
                        if (previousSibling) {
                            node.previousSibling = previousSibling;
                            previousSibling.nextSibling = node;
                            previousSibling.updateInfo(commit, {
                                isLast: false
                            });
                            previousSibling.triggerUIUpdate();
                        } else {
                            node.previousSibling = null;
                        }

                        // Update the new child's info passing in info we already know
                        childInfo.isFirst = index === 0;
                        childInfo.index = index;
                        node.updateInfo(commit, childInfo);

                        // We stop being a leaf as soon as a node is appended
                        if (me.isLeaf()) {
                            me.set('leaf', false);
                        }

                        // As soon as we append a child to this node, we are loaded
                        if (!me.isLoaded()) {
                            me.set('loaded', true);
                        } else if (me.childNodes.length === 1) {
                            me.triggerUIUpdate();
                        }

                        // Ensure connectors are correct by updating the UI on all intervening nodes (descendants) between last sibling and new node.
                        if (index && me.childNodes[index - 1].isExpanded()) {
                            me.childNodes[index - 1].cascadeBy(me.triggerUIUpdate);
                        }

                        if(!node.isLeaf() && node.phantom) {
                            node.set('loaded', true);
                        }

                        // This node MUST fire its events first, so that if the TreeStore's
                        // onNodeAppend loads and appends local children, the events are still in order;
                        // This node appended this child first, before the descendant cascade.
                        if (suppressEvents !== true) {
                            me.fireEventArgs("append", [me, node, index]);

                            if (oldParent) {
                                node.fireEventArgs("move", [node, oldParent, me, index]);
                            }
                        }

                        // Inform the TreeStore so that the node can be inserted
                        // and registered.
                        me.callJoined('onNodeAppend', [node, index]);

                        result = node;
                    }

                    // Flush layouts caused by updating of the UI
                    Ext.resumeLayouts(true);

                    return result;
                },

                /**
                * Returns the tree this node is in.
                * @return {Ext.tree.Panel} The tree panel which owns this node.
                */
                getOwnerTree: function() {
                    var store = this.getTreeStore();
                    if (store) {
                        return store.ownerTree;
                    }
                },

                /**
                 * Returns the {@link Ext.data.TreeStore} which owns this node.
                 * @return {Ext.data.TreeStore} The TreeStore which owns this node.
                 * 
                 */
                getTreeStore: function() {
                    return this.store;
                },

                /**
                 * Removes a child node from this node.
                 * @param {Ext.data.NodeInterface} node The node to remove
                 * @param {Boolean} [erase=false] True to erase the record using the
                 * configured proxy.
                 * @return {Ext.data.NodeInterface} The removed node
                 */
                removeChild: function(node, erase, suppressEvents, isMove) {
                    var me = this,
                        index = me.indexOf(node),
                        i, childCount,
                        previousSibling;

                    if (index === -1 || (suppressEvents !== true && me.fireEventArgs("beforeremove", [me, node, !!isMove]) === false)) {
                        return false;
                    }

                    // Coalesce all layouts caused by node removal
                    Ext.suspendLayouts();

                    // remove it from childNodes collection
                    Ext.Array.erase(me.childNodes, index, 1);

                    // update child refs
                    if (me.firstChild === node) {
                        me.setFirstChild(node.nextSibling);
                    }
                    if (me.lastChild === node) {
                        me.setLastChild(node.previousSibling);
                    }

                    // Update previous sibling to point to its new next.
                    previousSibling = node.previousSibling;
                    if (previousSibling) {
                        node.previousSibling.nextSibling = node.nextSibling;
                    }
                    
                    // Update the next sibling to point to its new previous
                    if (node.nextSibling) {
                        node.nextSibling.previousSibling = node.previousSibling;

                        // And if it's the new first child, let it know
                        if (index === 0) {
                            node.nextSibling.updateInfo(false, {
                                isFirst: true
                            });
                        }

                        // Update subsequent siblings' index values
                        for (i = index, childCount = me.childNodes.length; i < childCount; i++) {
                            me.childNodes[i].updateInfo(false, {
                                index: i
                            });
                        }
                    }

                    // If the removed node had no next sibling, but had a previous,
                    // update the previous sibling so it knows it's the last
                    else if (previousSibling) {
                        previousSibling.updateInfo(false, {
                            isLast: true
                        });

                        // We're removing the last child.
                        // Ensure connectors are correct by updating the UI on all intervening nodes (descendants) between previous sibling and new node.
                        if (previousSibling.isExpanded()) {
                            previousSibling.cascadeBy(me.triggerUIUpdate);
                        }
                        // No intervening descendant nodes, just update the previous sibling
                        else {
                            previousSibling.triggerUIUpdate();
                        }
                    }

                    // If this node suddenly doesnt have childnodes anymore, update myself
                    if (!me.childNodes.length) {
                        me.triggerUIUpdate();
                    }

                    // Flush layouts caused by updating the UI
                    Ext.resumeLayouts(true);

                    if (suppressEvents !== true) {

                        // Inform the TreeStore so that descendant nodes can be removed.
                        me.callJoined('beforeNodeRemove', [[node], !!isMove]);

                        node.previousSibling = node.nextSibling = node.parentNode = null;

                        me.fireEventArgs('remove', [me, node, !!isMove]);

                        // Inform the TreeStore so that the node unregistered and unjoined.
                        me.callJoined('onNodeRemove', [[node], !!isMove]);
                    }

                    // Update removed node's pointers *after* firing event so that listsners
                    // can tell where the removal took place
                    if (erase) {
                        node.erase(true);
                    } else {
                        node.clear();
                    }

                    return node;
                },

                /**
                 * Creates a copy (clone) of this Node.
                 * @param {String} [id] A new id, defaults to this Node's id.
                 * @param {Boolean} [deep=false] True to recursively copy all child Nodes into the new Node.
                 * False to copy without child Nodes.
                 * @return {Ext.data.NodeInterface} A copy of this Node.
                 */
                copy: function(newId, deep) {
                    var me = this,
                        result = me.callParent(arguments),
                        len = me.childNodes ? me.childNodes.length : 0,
                        i;

                    // Move child nodes across to the copy if required
                    if (deep) {
                        for (i = 0; i < len; i++) {
                            result.appendChild(me.childNodes[i].copy(undefined, true));
                        }
                    }
                    return result;
                },

                /**
                 * Clears the node.
                 * @private
                 * @param {Boolean} [erase=false] True to erase the node using the configured
                 * proxy.
                 */
                clear : function(erase) {
                    var me = this;

                    // clear any references from the node
                    me.parentNode = me.previousSibling = me.nextSibling = null;
                    if (erase) {
                        me.firstChild = me.lastChild = null;
                    }
                },

                /**
                 * Destroys the node.
                 */
                erase: function(silent) {
                    /*
                     * Silent is to be used in a number of cases
                     * 1) When setRoot is called.
                     * 2) When destroy on the tree is called
                     * 3) For destroying child nodes on a node
                     */
                    var me      = this,
                        options = me.destroyOptions,
                        nodes   = me.childNodes,
                        nLen    = nodes.length,
                        n;

                    if (silent === true) {
                        me.clear(true);

                        for (n = 0; n < nLen; n++) {
                            nodes[n].erase(true);
                        }

                        me.childNodes = null;
                        delete me.destroyOptions;
                        me.callParent([options]);
                    } else {
                        me.destroyOptions = silent;
                        // overridden method will be called, since remove will end up calling erase(true);
                        me.remove(true);
                    }
                },

                /**
                 * Inserts the first node before the second node in this nodes childNodes collection.
                 * @param {Ext.data.NodeInterface/Ext.data.NodeInterface[]/Object} node The node to insert
                 * @param {Ext.data.NodeInterface} refNode The node to insert before (if null the node is appended)
                 * @return {Ext.data.NodeInterface} The inserted node
                 */
                insertBefore : function(node, refNode, suppressEvents) {
                    var me = this,
                        index     = me.indexOf(refNode),
                        oldParent = node.parentNode,
                        refIndex  = index,
                        childCount, previousSibling, i;

                    if (!refNode) { // like standard Dom, refNode can be null for append
                        return me.appendChild(node);
                    }

                    // nothing to do
                    if (node === refNode) {
                        return false;
                    }

                    // Make sure it is a record with the NodeInterface
                    node = me.createNode(node);

                    if (suppressEvents !== true && me.fireEventArgs("beforeinsert", [me, node, refNode]) === false) {
                        return false;
                    }

                    // when moving internally, indexes will change after remove
                    if (oldParent === me && me.indexOf(node) < index) {
                        refIndex--;
                    }

                    // it's a move, make sure we move it cleanly
                    if (oldParent) {
                        if (suppressEvents !== true && node.fireEventArgs("beforemove", [node, oldParent, me, index, refNode]) === false) {
                            return false;
                        }
                        oldParent.removeChild(node, false, false, oldParent.getTreeStore() === me.getTreeStore());
                    }

                    if (refIndex === 0) {
                        me.setFirstChild(node);
                    }

                    Ext.Array.splice(me.childNodes, refIndex, 0, node);
                    node.parentNode = me;

                    node.nextSibling = refNode;
                    refNode.previousSibling = node;

                    previousSibling = me.childNodes[refIndex - 1];
                    if (previousSibling) {
                        node.previousSibling = previousSibling;
                        previousSibling.nextSibling = node;
                    } else {
                        node.previousSibling = null;
                    }

                    // Integrate the new node into its new position.
                    node.updateInfo(false, {
                        parentId: me.getId(),
                        index: refIndex,
                        isFirst: refIndex === 0,
                        isLast: false,
                        depth: (me.data.depth||0) + 1
                    });

                    // Update the index for all following siblings.
                    for (i = refIndex + 1, childCount = me.childNodes.length; i < childCount; i++) {
                        me.childNodes[i].updateInfo(false, {
                            index: i
                        });
                    }

                    if (!me.isLoaded()) {
                        me.set('loaded', true);
                    }
                    // If this node didnt have any childnodes before, update myself
                    else if (me.childNodes.length === 1) {
                        me.triggerUIUpdate();
                    }

                    if(!node.isLeaf() && node.phantom) {
                        node.set('loaded', true);
                    }

                    // This node MUST fire its events first, so that if the TreeStore's
                    // onNodeInsert loads and appends local children, the events are still in order;
                    // This node appended this child first, before the descendant cascade.
                    if (suppressEvents !== true) {
                        me.fireEventArgs("insert", [me, node, refNode]);

                        if (oldParent) {
                            node.fireEventArgs("move", [node, oldParent, me, refIndex, refNode]);
                        }
                    }

                    // Inform the TreeStore so that the node can be registered and added
                    me.callJoined('onNodeInsert', [node, refIndex]);

                    return node;
                },

                /**
                 * Inserts a node into this node.
                 * @param {Number} index The zero-based index to insert the node at
                 * @param {Ext.data.NodeInterface} node The node to insert
                 * @return {Ext.data.NodeInterface} The node you just inserted
                 */
                insertChild: function(index, node) {
                    var sibling = this.childNodes[index];
                    if (sibling) {
                        return this.insertBefore(node, sibling);
                    }
                    else {
                        return this.appendChild(node);
                    }
                },

                /**
                 * @private
                 * Used by {@link Ext.tree.Column#initTemplateRendererData} to determine whether a node is the last *visible*
                 * sibling.
                 * 
                 */
                isLastVisible: function() {
                    var me = this,
                        result = me.data.isLast,
                        next = me.nextSibling;

                    // If it is not the true last and the store is filtered
                    // we need to see if any following siblings are visible.
                    // If any are, return false.
                    if (!result && me.getTreeStore().isFiltered()) {
                        while (next) {
                            if (next.data.visible) {
                                return false;
                            }
                            next = next.nextSibling;
                        }
                        return true;
                    }
                    return result;
                },

                /**
                 * Removes this node from its parent
                 * @param {Boolean} [erase=false] True to erase the node using the configured
                 * proxy.
                 * @return {Ext.data.NodeInterface} this
                 */
                remove : function(erase, suppressEvents) {
                    var me = this,
                        parentNode = me.parentNode;

                    if (parentNode) {
                        parentNode.removeChild(me, erase, suppressEvents);
                    } else if (erase) {
                        // If we don't have a parent, just erase it
                        me.erase(true);
                    }
                    return me;
                },

                /**
                 * Removes all child nodes from this node.
                 * @param {Boolean} [erase=false] True to erase the node using the configured
                 * proxy.
                 * @return {Ext.data.NodeInterface} this
                 * @return {Ext.data.NodeInterface} this
                 */
                removeAll : function(erase, suppressEvents, fromParent) {
                    // This method duplicates logic from removeChild for the sake of
                    // speed since we can make a number of assumptions because we're
                    // getting rid of everything
                    var me = this,
                        childNodes = me.childNodes,
                        i = 0,
                        len = childNodes.length,
                        node;

                    // Avoid all this if nothing to remove
                    if (!len) {
                        return;
                    }

                    // Inform the TreeStore so that descendant nodes can be removed.
                    me.callJoined('beforeNodeRemove', [childNodes, false]);

                    for (; i < len; ++i) {
                        node = childNodes[i];

                        node.previousSibling = node.nextSibling = node.parentNode = null;

                        me.fireEventArgs('remove', [me, node, false]);

                        if (erase) {
                            node.erase(true);
                        }
                        // Otherwise.... apparently, removeAll is always recursive.
                        else {
                            node.removeAll(false, suppressEvents, true);
                        }
                    }

                    // Inform the TreeStore so that the node unregistered and unjoined.
                    me.callJoined('onNodeRemove', [childNodes, false]);

                    me.firstChild = me.lastChild = null;

                    me.childNodes.length = 0;
                    if (!fromParent) {
                        me.triggerUIUpdate();
                    }
                    
                    return me;
                },

                /**
                 * Returns the child node at the specified index.
                 * @param {Number} index
                 * @return {Ext.data.NodeInterface}
                 */
                getChildAt : function(index) {
                    return this.childNodes[index];
                },

                /**
                 * Replaces one child node in this node with another.
                 * @param {Ext.data.NodeInterface} newChild The replacement node
                 * @param {Ext.data.NodeInterface} oldChild The node to replace
                 * @return {Ext.data.NodeInterface} The replaced node
                 */
                replaceChild : function(newChild, oldChild, suppressEvents) {
                    var s = oldChild ? oldChild.nextSibling : null;

                    this.removeChild(oldChild, false, suppressEvents);
                    this.insertBefore(newChild, s, suppressEvents);
                    return oldChild;
                },

                /**
                 * Returns the index of a child node
                 * @param {Ext.data.NodeInterface} node
                 * @return {Number} The index of the node or -1 if it was not found
                 */
                indexOf : function(child) {
                    return Ext.Array.indexOf(this.childNodes, child);
                },
                
                /**
                 * Returns the index of a child node that matches the id
                 * @param {String} id The id of the node to find
                 * @return {Number} The index of the node or -1 if it was not found
                 */
                indexOfId: function(id) {
                    var childNodes = this.childNodes,
                        len = childNodes.length,
                        i = 0;
                        
                    for (; i < len; ++i) {
                        if (childNodes[i].getId() === id) {
                            return i;
                        }    
                    }
                    return -1;
                },

                /**
                 * Gets the hierarchical path from the root of the current node.
                 * @param {String} [field] The field to construct the path from. Defaults to the model idProperty.
                 * @param {String} [separator="/"] A separator to use.
                 * @return {String} The node path
                 */
                getPath: function(field, separator) {
                    field = field || this.idProperty;
                    separator = separator || '/';

                    var path = [this.get(field)],
                        parent = this.parentNode;

                    while (parent) {
                        path.unshift(parent.get(field));
                        parent = parent.parentNode;
                    }
                    return separator + path.join(separator);
                },

                /**
                 * Returns depth of this node (the root node has a depth of 0)
                 * @return {Number}
                 */
                getDepth : function() {
                    return this.get('depth');
                },

                /**
                 * Bubbles up the tree from this node, calling the specified function with each node. The arguments to the function
                 * will be the args provided or the current node. If the function returns false at any point,
                 * the bubble is stopped.
                 * @param {Function} fn The function to call
                 * @param {Object} [scope] The scope (this reference) in which the function is executed. Defaults to the current Node.
                 * @param {Array} [args] The args to call the function with. Defaults to passing the current Node.
                 */
                bubble : function(fn, scope, args) {
                    var p = this;
                    while (p) {
                        if (fn.apply(scope || p, args || [p]) === false) {
                            break;
                        }
                        p = p.parentNode;
                    }
                },

                //<deprecated since=0.99>
                cascade: function() {
                    if (Ext.isDefined(Ext.global.console)) {
                        Ext.global.console.warn('Ext.data.Node: cascade has been deprecated. Please use cascadeBy instead.');
                    }
                    return this.cascadeBy.apply(this, arguments);
                },
                //</deprecated>

                /**
                 * Cascades down the tree from this node, calling the specified functions with each node. The arguments to the function
                 * will be the args provided or the current node. If the `before` function returns false at any point,
                 * the cascade is stopped on that branch.
                 *
                 * Note that the 3 argument form passing `fn, scope, args` is still supported. The `fn` function is as before, called
                 * *before* cascading down into child nodes. If it returns `false`, the child nodes are not traversed.
                 *
                 * @param {Object} spec An object containing before and after functions, scope and an argument list.
                 * @param {Function} [spec.before] A function to call on a node *before* cascading down into child nodes.
                 * If it returns `false`, the child nodes are not traversed.
                 * @param {Function} [spec.after] A function to call on a node *after* cascading down into child nodes.
                 * @param {Object} [spec.scope] The scope (this reference) in which the functions are executed. Defaults to the current Node.
                 * @param {Array} [spec.args] The args to call the function with. Defaults to passing the current Node.
                 */
                cascadeBy : function(before, scope, args, after) {
                    var me = this;

                    if (arguments.length === 1 && !Ext.isFunction(before)) {
                        after = before.after;
                        scope = before.scope;
                        args = before.args;
                        before = before.before;
                    }
                    if (!before || before.apply(scope || me, args || [me]) !== false) {
                        var childNodes = me.childNodes,
                            length     = childNodes.length,
                            i;

                        for (i = 0; i < length; i++) {
                            childNodes[i].cascadeBy.call(childNodes[i], before, scope, args, after);
                        }

                        if (after) {
                            after.apply(scope || me, args || [me]);
                        }
                    }
                },

                /**
                 * Interates the child nodes of this node, calling the specified function with each node. The arguments to the function
                 * will be the args provided or the current node. If the function returns false at any point,
                 * the iteration stops.
                 * @param {Function} fn The function to call
                 * @param {Object} [scope] The scope (this reference) in which the function is executed. Defaults to the current Node in iteration.
                 * @param {Array} [args] The args to call the function with. Defaults to passing the current Node.
                 */
                eachChild : function(fn, scope, args) {
                    var childNodes = this.childNodes,
                        length     = childNodes.length,
                        i;

                    for (i = 0; i < length; i++) {
                        if (fn.apply(scope || this, args || [childNodes[i]]) === false) {
                            break;
                        }
                    }
                },

                /**
                 * Finds the first child that has the attribute with the specified value.
                 * @param {String} attribute The attribute name
                 * @param {Object} value The value to search for
                 * @param {Boolean} [deep=false] True to search through nodes deeper than the immediate children
                 * @return {Ext.data.NodeInterface} The found child or null if none was found
                 */
                findChild : function(attribute, value, deep) {
                    return this.findChildBy(function() {
                        return this.get(attribute) == value;
                    }, null, deep);
                },

                /**
                 * Finds the first child by a custom function. The child matches if the function passed returns true.
                 * @param {Function} fn A function which must return true if the passed Node is the required Node.
                 * @param {Object} [scope] The scope (this reference) in which the function is executed. Defaults to the Node being tested.
                 * @param {Boolean} [deep=false] True to search through nodes deeper than the immediate children
                 * @return {Ext.data.NodeInterface} The found child or null if none was found
                 */
                findChildBy : function(fn, scope, deep) {
                    var cs = this.childNodes,
                        len = cs.length,
                        i = 0, n, res;

                    for (; i < len; i++) {
                        n = cs[i];
                        if (fn.call(scope || n, n) === true) {
                            return n;
                        }
                        else if (deep) {
                            res = n.findChildBy(fn, scope, deep);
                            if (res !== null) {
                                return res;
                            }
                        }
                    }

                    return null;
                },

                /**
                 * Returns true if this node is an ancestor (at any point) of the passed node.
                 * @param {Ext.data.NodeInterface} node
                 * @return {Boolean}
                 */
                contains : function(node) {
                    return node.isAncestor(this);
                },

                /**
                 * Returns true if the passed node is an ancestor (at any point) of this node.
                 * @param {Ext.data.NodeInterface} node
                 * @return {Boolean}
                 */
                isAncestor : function(node) {
                    var p = this.parentNode;
                    while (p) {
                        if (p === node) {
                            return true;
                        }
                        p = p.parentNode;
                    }
                    return false;
                },

                /**
                 * Sorts this nodes children using the supplied sort function.
                 * @param {Function} [sortFn] A function which, when passed two Nodes, returns -1, 0 or 1 depending upon required sort order.
                 *
                 * It omitted, the node is sorted according to the existing sorters in the owning {@link Ext.data.TreeStore TreeStore}.
                 * @param {Boolean} [recursive=false] True to apply this sort recursively
                 * @param {Boolean} [suppressEvent=false] True to not fire a sort event.
                 */
                sort: function(sortFn, recursive, suppressEvent) {
                    var me = this,
                        childNodes  = me.childNodes,
                        ln = childNodes.length,
                        i, n, info = {
                            isFirst: true
                        };

                    if (ln > 0) {
                        if (!sortFn) {
                            sortFn = me.getTreeStore().getSortFn();
                        }
                        Ext.Array.sort(childNodes, sortFn);
                        me.setFirstChild(childNodes[0]);
                        me.setLastChild(childNodes[ln - 1]);

                        for (i = 0; i < ln; i++) {
                            n = childNodes[i];
                            n.previousSibling = childNodes[i-1];
                            n.nextSibling = childNodes[i+1];
                            
                            // Update the index and first/last status of children
                            info.isLast = (i === ln - 1);
                            info.index = i;
                            n.updateInfo(false, info);
                            info.isFirst = false;

                            if (recursive && !n.isLeaf()) {
                                n.sort(sortFn, true, true);
                            }
                        }

                        // The suppressEvent flag is basically used to indicate a recursive sort
                        if (suppressEvent !== true) {
                            me.fireEventArgs('sort', [me, childNodes]);

                            // Inform the TreeStore that this node is sorted
                            me.callJoined('onNodeSort', [childNodes]);
                        }
                    }
                },

                /**
                 * Returns `true` if this node is expanded.
                 * @return {Boolean}
                 */
                isExpanded: function() {
                    return this.get('expanded');
                },

                /**
                 * Returns true if this node is loaded
                 * @return {Boolean}
                 */
                isLoaded: function() {
                    return this.get('loaded');
                },

                /**
                 * Returns true if this node is loading
                 * @return {Boolean}
                 */
                isLoading: function() {
                    return this.get('loading');
                },

                /**
                 * Returns true if this node is the root node
                 * @return {Boolean}
                 */
                isRoot: function() {
                    return !this.parentNode;
                },

                /**
                 * Returns true if this node is visible. Note that visibility refers to
                 * the structure of the tree, the {@link Ext.tree.Panel#rootVisible}
                 * configuration is not taken into account here. If this method is called
                 * on the root node, it will always be visible.
                 * @return {Boolean}
                 */
                isVisible: function() {
                    var parent = this.parentNode;
                    while (parent) {
                        if (!parent.isExpanded()) {
                            return false;
                        }
                        parent = parent.parentNode;
                    }
                    return true;
                },

                /**
                 * Expand this node.
                 * @param {Boolean} [recursive=false] True to recursively expand all the children
                 * @param {Function} [callback] The function to execute once the expand completes
                 * @param {Object} [scope] The scope to run the callback in
                 */
                expand: function(recursive, callback, scope) {
                    var me = this;

                    // all paths must call the callback (eventually) or things like
                    // selectPath fail

                    // First we start by checking if this node is a parent
                    if (!me.isLeaf()) {
                        // If it's loading, wait until it loads before proceeding
                        if (me.isLoading()) {
                            me.on('expand', function() {
                                me.expand(recursive, callback, scope);
                            }, me, {single: true});
                        } else {
                            // Now we check if this record is already expanding or expanded
                            if (!me.isExpanded()) {

                                if (me.fireEventArgs('beforeexpand', [me]) !== false) {

                                    // Inform the TreeStore that we intend to expand, and that it should call onChildNodesAvailable
                                    // when the child nodes are available
                                    me.callJoined('onBeforeNodeExpand', [me.onChildNodesAvailable, me, [recursive, callback, scope]]);
                                }

                            } else if (recursive) {
                                // If it is is already expanded but we want to recursively expand then call expandChildren
                                me.expandChildren(true, callback, scope);
                            } else {
                                Ext.callback(callback, scope || me, [me.childNodes]);
                            }
                        }
                    } else {
                        // If it's not then we fire the callback right away
                        Ext.callback(callback, scope || me); // leaf = no childNodes
                    }
                },

                /**
                 * @private
                 * Called as a callback from the beforeexpand listener fired by {@link #method-expand} when the child nodes have been loaded and appended.
                 */
                onChildNodesAvailable: function(records, recursive, callback, scope) {
                    var me = this;

                    // Bracket expansion with layout suspension.
                    // In optimum case, when recursive, child node data are loaded and expansion is synchronous within the suspension.
                    Ext.suspendLayouts();

                    // Not structural. The TreeView's onUpdate listener just updates the [+] icon to [-] in response.
                    me.set('expanded', true);

                    // TreeStore's onNodeExpand inserts the child nodes below the parent
                    me.callJoined('onNodeExpand', [records, false]);

                    me.fireEventArgs('expand', [me, records]);

                    // Call the expandChildren method if recursive was set to true
                    if (recursive) {
                        me.expandChildren(true, callback, scope);
                    } else {
                        Ext.callback(callback, scope || me, [me.childNodes]);
                    }

                    Ext.resumeLayouts(true);
                },

                /**
                 * Expand all the children of this node.
                 * @param {Boolean} [recursive=false] True to recursively expand all the children
                 * @param {Function} [callback] The function to execute once all the children are expanded
                 * @param {Object} [scope] The scope to run the callback in
                 */
                expandChildren: function(recursive, callback, scope, /* private */ singleExpand) {
                    var me = this,
                        origCallback, i, allNodes, expandNodes, ln, node;

                    // Ext 4.2.0 broke the API for this method by adding a singleExpand argument
                    // at index 1. As of 4.2.3 The method signature has been reverted back
                    // to its original pre-4.2.0 state, however, we must check to see if
                    // the 4.2.0 version is being used for compatibility reasons.
                    if (Ext.isBoolean(callback)) {
                        origCallback = callback;
                        callback = scope;
                        scope = singleExpand;
                        singleExpand = origCallback;
                    }

                    if (singleExpand === undefined) {
                        singleExpand = me.getTreeStore().singleExpand;
                    }
                    allNodes = me.childNodes;
                    expandNodes = [];
                    ln = singleExpand ? Math.min(allNodes.length, 1) : allNodes.length;

                    for (i = 0; i < ln; ++i) {
                        node = allNodes[i];
                        if (!node.isLeaf()) {
                            expandNodes[expandNodes.length] = node;
                        }
                    }
                    ln = expandNodes.length;

                    for (i = 0; i < ln; ++i) {
                        expandNodes[i].expand(recursive);
                    }

                    if (callback) {
                        Ext.callback(callback, scope || me, [me.childNodes]);
                    }
                },

                /**
                 * Collapse this node.
                 * @param {Boolean} [recursive=false] True to recursively collapse all the children
                 * @param {Function} [callback] The function to execute once the collapse completes
                 * @param {Object} [scope] The scope to run the callback in
                 */
                collapse: function(recursive, callback, scope) {
                    var me = this,
                        expanded = me.isExpanded(),
                        len = me.childNodes.length,
                        i, collapseChildren;

                    // If this is a parent and
                    //      already collapsed but the recursive flag is passed to target child nodes
                    //   or
                    //      the collapse is not vetoed by a listener
                    if (!me.isLeaf() && ((!expanded && recursive) || me.fireEventArgs('beforecollapse', [me]) !== false)) {
                        // Bracket collapsing with layout suspension.
                        // Collapsing is synchronous within the suspension.
                        Ext.suspendLayouts();

                        // Inform listeners of a collapse event if we are still expanded.
                        if (me.isExpanded()) {
                            
                            // Set up the callback to set non-leaf descendants to collapsed if necessary.
                            // If recursive, we just need to set all non-leaf descendants to collapsed state.
                            // We *DO NOT* call collapse on them. That would attempt to remove their descendants
                            // from the UI, and that is done: THIS node is collapsed - ALL descendants are removed from the UI.
                            // Descendant non-leaves just silently change state.
                            if (recursive) {
                                collapseChildren = function() {
                                    for (i = 0; i < len; i++) {
                                        me.childNodes[i].setCollapsed(true);
                                    }
                                };
                                if (callback) {
                                    callback = Ext.Function.createSequence(collapseChildren, Ext.Function.bind(callback, scope, [me.childNodes]));
                                } else {
                                    callback = collapseChildren;
                                }
                            } else if (callback) {
                                callback = Ext.Function.bind(callback, scope, [me.childNodes]);
                            }

                            // Not structural. The TreeView's onUpdate listener just updates the [+] icon to [-] in response.
                            me.set('expanded', false);

                            // Call the TreeStore's onNodeCollapse which removes all descendant nodes to achieve UI collapse
                            // and passes callback on in its beforecollapse event which is poked into the animWrap for
                            // final calling in the animation callback.
                            me.callJoined('onNodeCollapse', [me.childNodes, callback, scope]);

                            me.fireEventArgs('collapse', [me, me.childNodes]);

                            // So that it's not called at the end
                            callback = null;
                        }

                        // If recursive, we just need to set all non-leaf descendants to collapsed state.
                        // We *DO NOT* call collapse on them. That would attempt to remove their descendants
                        // from the UI, and that is done: THIS node is collapsed - ALL descendants are removed from the UI.
                        // Descendant non-leaves just silently change state.
                        else if (recursive) {
                            for (i = 0; i < len; i++) {
                                me.childNodes[i].setCollapsed(true);
                            }
                        }

                        Ext.resumeLayouts(true);
                    }

                    // Call the passed callback
                    Ext.callback(callback, scope || me, [me.childNodes]);
                },

                /**
                 * @private Sets the node into the collapsed state without affecting the UI.
                 * 
                 * This is called when a node is collapsed with the recursive flag. All the descendant
                 * nodes will have been removed from the store, but descendant non-leaf nodes still
                 * need to be set to the collapsed state without affecting the UI.
                 */
                setCollapsed: function(recursive) {
                    var me = this,
                        len = me.childNodes.length,
                        i;

                    // Only if we are not a leaf node and the collapse was not vetoed by a listener.
                    if (!me.isLeaf() && me.fireEventArgs('beforecollapse', [me]) !== false) {

                        // Update the state directly.
                        me.data.expanded = false;

                        // Listened for by NodeStore.onNodeCollapse, but will do nothing except pass on the
                        // documented events because the records have already been removed from the store when
                        // the ancestor node was collapsed.
                        me.fireEventArgs('collapse', [me, me.childNodes]);

                        if (recursive) {
                            for (i = 0; i < len; i++) {
                                me.childNodes[i].setCollapsed(true);
                            }
                        }
                    }
                },

                /**
                 * Collapse all the children of this node.
                 * @param {Function} [recursive=false] True to recursively collapse all the children
                 * @param {Function} [callback] The function to execute once all the children are collapsed
                 * @param {Object} [scope] The scope to run the callback in
                 */
                collapseChildren: function(recursive, callback, scope) {
                    var me = this,
                        i,
                        allNodes = me.childNodes,
                        ln = allNodes.length,
                        collapseNodes = [],
                        node;

                    // Only bother with loaded, expanded, non-leaf nodes
                    for (i = 0; i < ln; ++i) {
                        node = allNodes[i];
                        if (!node.isLeaf() && node.isLoaded() && node.isExpanded()) {
                            collapseNodes.push(node);
                        }
                    }
                    ln = collapseNodes.length;

                    if (ln) {
                        // Collapse the collapsible children.
                        // Pass our callback to the last one.
                        for (i = 0; i < ln; ++i) {
                            node = collapseNodes[i];
                            if (i === ln - 1) {
                                node.collapse(recursive, callback, scope);
                            } else {
                                node.collapse(recursive);
                            }
                        }
                    } else {
                        // Nothing to collapse, so fire the callback
                        Ext.callback(callback, scope);
                    }
                },

                /**
                * Fires the specified event with the passed parameters (minus the event name, plus the `options` object passed
                * to {@link Ext.mixin.Observable#addListener addListener}).
                *
                * An event may be set to bubble up an Observable parent hierarchy (See {@link Ext.Component#getBubbleTarget}) by
                * calling {@link Ext.mixin.Observable#enableBubble enableBubble}.
                *
                * @param {String} eventName The name of the event to fire.
                * @param {Object...} args Variable number of parameters are passed to handlers.
                * @return {Boolean} returns false if any of the handlers return false otherwise it returns true.
                */
                fireEvent: function(eventName) {
                    return this.fireEventArgs(eventName, Ext.Array.slice(arguments, 1));
                },

                // Node events always bubble, but events which bubble are always created, so bubble in a loop and
                // only fire when there are listeners at each level.
                // bubbled events always fire because they cannot tell if there is a listener at each level.
                fireEventArgs: function(eventName, args) {
                    // Use the model prototype directly. If we have a BaseModel and then a SubModel,
                    // if we access the superclass fireEventArgs it will just refer to the same method
                    // and we end up in an infinite loop.
                    var fireEventArgs = Ext.mixin.Observable.prototype.fireEventArgs,
                        result, eventSource;

                    // The event bubbles (all native NodeInterface events do)...
                    if (bubbledEvents[eventName]) {
                        for (eventSource = this; result !== false && eventSource; eventSource = eventSource.parentNode) {
                            if (eventSource.hasListeners && eventSource.hasListeners[eventName]) {
                                result = fireEventArgs.call(eventSource, eventName, args);
                            }
                        }
                        return result;
                    }
                    // Event does not bubble - call superclass fireEventArgs method
                    else {
                        return fireEventArgs.apply(this, arguments);
                    }
                },

                /**
                 * Creates an object representation of this node including its children.
                 */
                serialize: function() {
                    var result = Ext.data.writer.Json.prototype.getRecordData(this),
                        childNodes = this.childNodes,
                        len = childNodes.length,
                        children, i;

                    if (len > 0) {
                        children = [];
                        for (i = 0; i < len; i++) {
                            children.push(childNodes[i].serialize());
                        }
                        result.children = children;
                    }
                    return result;
                }
            };
        }
    }
});
