/**
 * @private
 */
Ext.define('Ext.tree.ViewDropZone', {
    extend: 'Ext.view.DropZone',

    /**
     * @cfg {Boolean} allowParentInserts
     * Allow inserting a dragged node between an expanded parent node and its first child that will become a
     * sibling of the parent when dropped.
     */
    allowParentInserts: false,
 
    /**
     * @cfg {Boolean} allowContainerDrops
     * True if drops on the tree container (outside of a specific tree node) are allowed.
     *
     * These are treated as appends to the root node.
     */
    allowContainerDrops: false,

    /**
     * @cfg {Boolean} appendOnly
     * True if the tree should only allow append drops (use for trees which are sorted).
     */
    appendOnly: false,

    /**
     * @cfg {Number} expandDelay
     * The delay in milliseconds to wait before expanding a target tree node while dragging a droppable node
     * over the target.
     */
    expandDelay : 500,

    indicatorCls: Ext.baseCSSPrefix + 'tree-ddindicator',

    // @private
    expandNode : function(node) {
        var view = this.view;
        this.expandProcId = false;
        if (!node.isLeaf() && !node.isExpanded()) {
            view.expand(node);
            this.expandProcId = false;
        }
    },

    // @private
    queueExpand : function(node) {
        this.expandProcId = Ext.Function.defer(this.expandNode, this.expandDelay, this, [node]);
    },

    // @private
    cancelExpand : function() {
        if (this.expandProcId) {
            clearTimeout(this.expandProcId);
            this.expandProcId = false;
        }
    },

    getPosition: function(e, node) {
        var view = this.view,
            record = view.getRecord(node),
            y = e.getY(),
            noAppend = record.isLeaf(),
            noBelow = false,
            region = Ext.fly(node).getRegion(),
            fragment;

        // If we are dragging on top of the root node of the tree, we always want to append.
        if (record.isRoot()) {
            return 'append';
        }

        // Return 'append' if the node we are dragging on top of is not a leaf else return false.
        if (this.appendOnly) {
            return noAppend ? false : 'append';
        }

        if (!this.allowParentInserts) {
            noBelow = record.hasChildNodes() && record.isExpanded();
        }

        fragment = (region.bottom - region.top) / (noAppend ? 2 : 3);
        if (y >= region.top && y < (region.top + fragment)) {
            return 'before';
        }
        else if (!noBelow && (noAppend || (y >= (region.bottom - fragment) && y <= region.bottom))) {
            return 'after';
        }
        else {
            return 'append';
        }
    },

    isValidDropPoint : function(node, position, dragZone, e, data) {
        if (!node || !data.item) {
            return false;
        }

        var view = this.view,
            targetNode = view.getRecord(node),
            draggedRecords = data.records,
            dataLength = draggedRecords.length,
            ln = draggedRecords.length,
            i, record;

        // No drop position, or dragged records: invalid drop point
        if (!(targetNode && position && dataLength)) {
            return false;
        }

        // If the targetNode is within the folder we are dragging
        for (i = 0; i < ln; i++) {
            record = draggedRecords[i];
            if (record.isNode && record.contains(targetNode)) {
                return false;
            }
        }
        
        // Respect the allowDrop field on Tree nodes
        if (position === 'append' && targetNode.get('allowDrop') === false) {
            return false;
        }
        else if (position !== 'append' && targetNode.parentNode.get('allowDrop') === false) {
            return false;
        }

        // If the target record is in the dragged dataset, then invalid drop
        if (Ext.Array.contains(draggedRecords, targetNode)) {
             return false;
        }
        return view.fireEvent('nodedragover', targetNode, position, data, e) !== false;
    },

    onNodeOver : function(node, dragZone, e, data) {
        var position = this.getPosition(e, node),
            returnCls = this.dropNotAllowed,
            view = this.view,
            targetNode = view.getRecord(node),
            indicator = this.getIndicator(),
            indicatorY = 0;

        // auto node expand check
        this.cancelExpand();
        if (position === 'append' && !this.expandProcId && !Ext.Array.contains(data.records, targetNode) && !targetNode.isLeaf() && !targetNode.isExpanded()) {
            this.queueExpand(targetNode);
        }
            
            
        if (this.isValidDropPoint(node, position, dragZone, e, data)) {
            this.valid = true;
            this.currentPosition = position;
            this.overRecord = targetNode;

            indicator.setWidth(Ext.fly(node).getWidth());
            indicatorY = Ext.fly(node).getY() - Ext.fly(view.el).getY() - 1;

            /*
             * In the code below we show the proxy again. The reason for doing this is showing the indicator will
             * call toFront, causing it to get a new z-index which can sometimes push the proxy behind it. We always 
             * want the proxy to be above, so calling show on the proxy will call toFront and bring it forward.
             */
            if (position === 'before') {
                returnCls = targetNode.isFirst() ? Ext.baseCSSPrefix + 'tree-drop-ok-above' : Ext.baseCSSPrefix + 'tree-drop-ok-between';
                indicator.showAt(0, indicatorY);
                dragZone.proxy.show();
            } else if (position === 'after') {
                returnCls = targetNode.isLast() ? Ext.baseCSSPrefix + 'tree-drop-ok-below' : Ext.baseCSSPrefix + 'tree-drop-ok-between';
                indicatorY += Ext.fly(node).getHeight();
                indicator.showAt(0, indicatorY);
                dragZone.proxy.show();
            } else {
                returnCls = Ext.baseCSSPrefix + 'tree-drop-ok-append';
                // @TODO: set a class on the parent folder node to be able to style it
                indicator.hide();
            }
        } else {
            this.valid = false;
        }

        this.currentCls = returnCls;
        return returnCls;
    },

    // The mouse is no longer over a tree node, so dropping is not valid
    onNodeOut : function(n, dd, e, data){
        this.valid = false;
        this.getIndicator().hide();
    },

    onContainerOver : function(dd, e, data) {
        return this.allowContainerDrops ? this.dropAllowed : e.getTarget('.' + this.indicatorCls) ? this.currentCls : this.dropNotAllowed;
    },

    // This will be called is allowContainerDrops is set.
    // The target node is the root
    onContainerDrop: function(dragZone, e, data) {
        if (this.allowContainerDrops) {
            this.valid = true;
            this.currentPosition = 'append';
            this.overRecord = this.view.store.getRoot();
            this.onNodeDrop(this.overRecord, dragZone, e, data);
        }
    },
    
    notifyOut: function() {
        this.callParent(arguments);
        this.cancelExpand();
    },

    handleNodeDrop : function(data, targetNode, position) {
        var me = this,
            targetView = me.view,
            parentNode = targetNode ? targetNode.parentNode : targetView.panel.getRootNode(),
            Model = targetView.store.getModel(),
            records, i, len, record,
            insertionMethod, argList,
            needTargetExpand,
            transferData;

        // If the copy flag is set, create a copy of the models
        if (data.copy) {
            records = data.records;
            data.records = [];
            for (i = 0, len = records.length; i < len; i++) {
                record = records[i];
                if (record.isNode) {
                    data.records.push(record.copy());
                } else {
                    // If it's not a node, make a node copy
                    data.records.push(new Model(Ext.apply({}, record.data)));
                }
            }
        }

        // Cancel any pending expand operation
        me.cancelExpand();

        // Grab a reference to the correct node insertion method.
        // Create an arg list array intended for the apply method of the
        // chosen node insertion method.
        // Ensure the target object for the method is referenced by 'targetNode'
        if (position === 'before') {
            insertionMethod = parentNode.insertBefore;
            argList = [null, targetNode];
            targetNode = parentNode;
        }
        else if (position === 'after') {
            if (targetNode.nextSibling) {
                insertionMethod = parentNode.insertBefore;
                argList = [null, targetNode.nextSibling];
            }
            else {
                insertionMethod = parentNode.appendChild;
                argList = [null];
            }
            targetNode = parentNode;
        }
        else {
            if (!(targetNode.isExpanded() || targetNode.isLoading())) {
                needTargetExpand = true;
            }
            insertionMethod = targetNode.appendChild;
            argList = [null];
        }
        
        // A function to transfer the data into the destination tree
        transferData = function() {
            var color,
                n;

            // Coalesce layouts caused by node removal, appending and sorting
            Ext.suspendLayouts();

            // Insert the records into the target node
            for (i = 0, len = data.records.length; i < len; i++) {
                record = data.records[i];
                if (!record.isNode) {
                    if (record.isModel) {
                        record = new Model(record.data, record.getId());
                    } else {
                        record = new Model(record);
                    }
                    data.records[i] = record;
                }
                argList[0] = record;
                insertionMethod.apply(targetNode, argList);
            }

            // If configured to sort on drop, do it according to the TreeStore's comparator
            if (me.sortOnDrop) {
                targetNode.sort(targetNode.getOwnerTree().store.getSorters().sortFn);
            }
            
            Ext.resumeLayouts(true);

            // Kick off highlights after everything's been inserted, so they are
            // more in sync without insertion/render overhead.
            // Element.highlight can handle highlighting table nodes.
            if (Ext.enableFx && me.dropHighlight) {
                color = me.dropHighlightColor;

                for (i = 0; i < len; i++) {
                    n = targetView.getNode(data.records[i]);
                    if (n) {
                        Ext.fly(n).highlight(color);
                    }
                }
            }
        };

        // If dropping right on an unexpanded node, transfer the data after it is expanded.
        if (needTargetExpand) {
            targetNode.expand(false, transferData);
        }
        // If the node is waiting for its children, we must transfer the data after the expansion.
        // The expand event does NOT signal UI expansion, it is the SIGNAL for UI expansion.
        // It's listened for by the NodeStore on the root node. Which means that listeners on the target
        // node get notified BEFORE UI expansion. So we need a delay.
        // TODO: Refactor NodeInterface.expand/collapse to notify its owning tree directly when it needs to expand/collapse.
        else if (targetNode.isLoading()) {
            targetNode.on({
                expand: transferData,
                delay: 1,
                single: true
            });
        }
        // Otherwise, call the data transfer function immediately
        else {
            transferData();
        }
    }    
});