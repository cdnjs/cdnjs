/**
 * @private
 */
Ext.define('Ext.grid.header.DropZone', {
    extend: 'Ext.dd.DropZone',
    colHeaderCls: Ext.baseCSSPrefix + 'column-header',
    proxyOffsets: [-4, -9],

    constructor: function(headerCt) {
        var me = this;
        
        me.headerCt = headerCt;
        me.ddGroup = me.getDDGroup();
        me.autoGroup = true;
        me.callParent([headerCt.el]);
    },

    destroy: function () {
        this.callParent();
        Ext.destroy(this.topIndicator, this.bottomIndicator);
    },

    getDDGroup: function() {
        return 'header-dd-zone-' + this.headerCt.up('[scrollerOwner]').id;
    },

    getTargetFromEvent : function(e){
        return e.getTarget('.' + this.colHeaderCls);
    },

    getTopIndicator: function() {
        if (!this.topIndicator) {
            this.topIndicator = Ext.getBody().createChild({
                role: 'presentation',
                cls: Ext.baseCSSPrefix + "col-move-top",
                //<debug>
                // tell the spec runner to ignore this element when checking if the dom is clean
                "data-sticky": true,
                //</debug>
                html: "&#160;"
            });
            this.indicatorXOffset = Math.floor((this.topIndicator.dom.offsetWidth + 1) / 2);
        }
        return this.topIndicator;
    },

    getBottomIndicator: function() {
        if (!this.bottomIndicator) {
            this.bottomIndicator = Ext.getBody().createChild({
                role: 'presentation',
                cls: Ext.baseCSSPrefix + "col-move-bottom",
                //<debug>
                // tell the spec runner to ignore this element when checking if the dom is clean
                "data-sticky": true,
                //</debug>
                html: "&#160;"
            });
        }
        return this.bottomIndicator;
    },

    getLocation: function(e, t) {
        var x      = e.getXY()[0],
            region = Ext.fly(t).getRegion(),
            pos;

        if ((region.right - x) <= (region.right - region.left) / 2) {
            pos = "after";
        } else {
            pos = "before";
        }
        return {
            pos: pos,
            header: Ext.getCmp(t.id),
            node: t
        };
    },

    positionIndicator: function(data, node, e){
        var me = this,
            dragHeader   = data.header,
            dropLocation = me.getLocation(e, node),
            targetHeader = dropLocation.header,
            pos          = dropLocation.pos,
            nextHd,
            prevHd,
            topIndicator, bottomIndicator, topAnchor, bottomAnchor,
            topXY, bottomXY, headerCtEl, minX, maxX,
            allDropZones, ln, i, dropZone;

        // Avoid expensive CQ lookups and DOM calculations if dropPosition has not changed
        if (targetHeader === me.lastTargetHeader && pos === me.lastDropPos) {
            return;
        }
        nextHd       = dragHeader.nextSibling('gridcolumn:not([hidden])');
        prevHd       = dragHeader.previousSibling('gridcolumn:not([hidden])');
        me.lastTargetHeader = targetHeader;
        me.lastDropPos = pos;

        // Cannot drag to before non-draggable start column
        if (!targetHeader.draggable && pos === 'before' && targetHeader.getIndex() === 0) {
            return false;
        }

        data.dropLocation = dropLocation;

        if ((dragHeader !== targetHeader) &&
            ((pos === "before" && nextHd !== targetHeader) ||
            (pos === "after" && prevHd !== targetHeader)) &&
            !targetHeader.isDescendantOf(dragHeader)) {

            // As we move in between different DropZones that are in the same
            // group (such as the case when in a locked grid), invalidateDrop
            // on the other dropZones.
            allDropZones = Ext.dd.DragDropManager.getRelated(me);
            ln = allDropZones.length;
            i  = 0;

            for (; i < ln; i++) {
                dropZone = allDropZones[i];
                if (dropZone !== me && dropZone.invalidateDrop) {
                    dropZone.invalidateDrop();
                }
            }

            me.valid = true;
            topIndicator = me.getTopIndicator();
            bottomIndicator = me.getBottomIndicator();
            if (pos === 'before') {
                topAnchor = 'bc-tl';
                bottomAnchor = 'tc-bl';
            } else {
                topAnchor = 'bc-tr';
                bottomAnchor = 'tc-br';
            }
            
            // Calculate arrow positions. Offset them to align exactly with column border line
            topXY = topIndicator.getAlignToXY(targetHeader.el, topAnchor);
            bottomXY = bottomIndicator.getAlignToXY(targetHeader.el, bottomAnchor);

            // constrain the indicators to the viewable section
            headerCtEl = me.headerCt.el;
            minX = headerCtEl.getX() - me.indicatorXOffset;
            maxX = headerCtEl.getX() + headerCtEl.getWidth();

            topXY[0] = Ext.Number.constrain(topXY[0], minX, maxX);
            bottomXY[0] = Ext.Number.constrain(bottomXY[0], minX, maxX);

            // position and show indicators
            topIndicator.setXY(topXY);
            bottomIndicator.setXY(bottomXY);
            topIndicator.show();
            bottomIndicator.show();

        // invalidate drop operation and hide indicators
        } else {
            me.invalidateDrop();
        }
    },

    invalidateDrop: function() {
        this.valid = false;
        this.hideIndicators();
    },

    onNodeOver: function(node, dragZone, e, data) {
        var me = this,
            from = data.header,
            doPosition,
            to,
            fromPanel,
            toPanel;

        if (data.header.el.dom === node) {
            doPosition = false;
        } else {
            data.isLock = data.isUnlock = data.crossPanel = false;
            to = me.getLocation(e, node).header;

            // Dragging within the same container - always valid
            doPosition = (from.ownerCt === to.ownerCt);

            // If from different containers, and they are not sealed, then continue checking
            if (!doPosition && (!from.ownerCt.sealed && !to.ownerCt.sealed)) {

                doPosition = true;
                fromPanel = from.up('tablepanel');
                toPanel = to.up('tablepanel');
                if (fromPanel !== toPanel) {
                    data.crossPanel = true;

                    // If it's a lock operation, check that it's allowable.
                    data.isLock   = toPanel.isLocked && !fromPanel.isLocked;
                    data.isUnlock = !toPanel.isLocked && fromPanel.isLocked;
                    if ((data.isUnlock && from.lockable === false) || (data.isLock && !from.isLockable())) {
                        doPosition = false;
                    }
                }
            }
        }

        if (doPosition) {
            me.positionIndicator(data, node, e);
        } else {
            me.valid = false;
        }
        return me.valid ? me.dropAllowed : me.dropNotAllowed;
    },

    hideIndicators: function() {
        var me = this;
        
        me.getTopIndicator().hide();
        me.getBottomIndicator().hide();
        me.lastTargetHeader = me.lastDropPos = null;
    },

    onNodeOut: function() {
        this.hideIndicators();
    },

    onNodeDrop: function(node, dragZone, e, data) {
        // Note that dropLocation.pos refers to before or after the target node NOT before or after the fromCt!
        if (this.valid) {
            var dragHeader     = data.header,
                dropLocation   = data.dropLocation,
                targetHeader   = dropLocation.header,
                fromCt         = dragHeader.ownerCt,
                toCt           = targetHeader.ownerCt,
                sameCt         = fromCt === toCt,
                // Use the items collection here, the indices we want are for moving the actual items in the container.
                // The HeaderContainer translates this to visible columns for informing the view and firing events.
                localFromIdx   = fromCt.items.indexOf(data.header),
                localToIdx     = toCt.items.indexOf(targetHeader),
                headerCt       = this.headerCt,
                // Use the full column manager here, the indices we want are for moving the actual items in the container.
                // The HeaderContainer translates this to visible columns for informing the view and firing events.
                columns        = headerCt.visibleColumnManager,
                visibleFromIdx = columns.getHeaderIndex(dragHeader),
                // Group headers need to lookup the column index in the items collection NOT the leaf-only full column manager!
                visibleToIdx   = targetHeader.isGroupHeader ? toCt.items.indexOf(targetHeader) : columns.getHeaderIndex(targetHeader),
                colsToMove     = dragHeader.isGroupHeader ? dragHeader.query(':not([hidden]):not([isGroupHeader])').length : 1,
                // We really only need to know the direction for when dragging the last header of a group out of its grouping.
                // `true` === dragged to the right, `false` === dragged to the left.
                // Also, the direction is considered `true` (to the right) if the header is dropped directly adjacent to the group
                // in the 'after' position.
                direction      = targetHeader.isGroupHeader ? (dropLocation.pos === 'after') : columns.getHeaderIndex(targetHeader) > columns.getHeaderIndex(dragHeader),
                scrollerOwner, savedWidth;

            // Drop position is to the right of the targetHeader, increment the toIdx correctly. This is important
            // to allow the drop after the last header, for instance, else it would not be possible.
            if (dropLocation.pos === 'after') {
                localToIdx++;

                // Always increment the visibleToIdx index as this is used to swap the columns. Since the column swap uses
                // the inserBefore dom method, it must be incremented so it's one more than the slot for the new column.
                visibleToIdx += targetHeader.isGroupHeader ? targetHeader.query(':not([hidden]):not([isGroupHeader])').length : 1;
            }

            // If we are dragging in between two HeaderContainers that have had the lockable
            // mixin injected we will lock/unlock headers in between sections, and then continue
            // with another execution of onNodeDrop to ensure the header is dropped into the correct group
            if (data.isLock) {
                scrollerOwner = fromCt.up('[scrollerOwner]');
                scrollerOwner.lock(dragHeader, localToIdx, toCt);
            } else if (data.isUnlock) {
                scrollerOwner = fromCt.up('[scrollerOwner]');
                scrollerOwner.unlock(dragHeader, localToIdx, toCt);
            }

            // This is a drop within the same HeaderContainer.
            else {
                this.invalidateDrop();
                // Cache the width here, we need to get it before we removed it from the DOM
                savedWidth = dragHeader.getWidth();

                // Dragging within the same container.
                if (sameCt) {
                    // If dragging rightwards, then after removal, the insertion index will be less.
                    if (localToIdx > localFromIdx) {
                        localToIdx -= 1;
                    }
                    // A no-op. This can happen when cross lockable drag operations recurse (see above).
                    // If a drop was a lock/unlock, and the lock/unlock call placed the column in the
                    // desired position (lock places at end, unlock places at beginning) then we're done.
                    if (localToIdx === localFromIdx) {
                        // We still need to inform the rest of the components so that events can be fired.
                        headerCt.onHeaderMoved(dragHeader, colsToMove, visibleFromIdx, visibleToIdx);
                        return;
                    }
                }

                // Suspend layouts while we sort all this out.
                Ext.suspendLayouts();

                if (sameCt) {
                    toCt.move(localFromIdx, localToIdx);
                } else {
                    // Do a sanity!
                    //
                    // After the offsets are calculated, the visibleToIdx and the localToIdx indices should not be equal
                    // for when the header is dragged to the right. This can happen, however, when the header that is moved
                    // is the last in a grouped header and it's moved directly to the right of the group in which it's
                    // contained (the drap position doesn't matter, either 'before' or 'after'). Therefore, we must decrement
                    // the localToIdx index otherwise the header will be +1 offset from its data column.
                    if (direction && (visibleToIdx === localToIdx)) {
                        localToIdx -= 1;
                    }

                    // When removing and then adding, the owning gridpanel will be informed of column mutation twice
                    // Both remove and add handling inform the owning grid.
                    // The isDDMoveInGrid flag will prevent the remove operation from doing this.
                    // See Ext.grid.header.Container#onRemove
                    fromCt.isDDMoveInGrid = toCt.isDDMoveInGrid = !data.crossPanel;
                    fromCt.remove(dragHeader, false);
                    toCt.insert(localToIdx, dragHeader);
                    fromCt.isDDMoveInGrid = toCt.isDDMoveInGrid = false;
                }

                // Group headers skrinkwrap their child headers.
                // Therefore a child header may not flex; it must contribute a fixed width.
                // But we restore the flex value when moving back into the main header container
                if (toCt.isGroupHeader) {
                    // Adjust the width of the "to" group header only if we dragged in from somewhere else.
                    if (!sameCt) {
                        dragHeader.savedFlex = dragHeader.flex;
                        delete dragHeader.flex;
                        dragHeader.width = savedWidth;
                    }
                } else {
                    if (dragHeader.savedFlex) {
                        dragHeader.flex = dragHeader.savedFlex;
                        delete dragHeader.width;
                    }
                }

                Ext.resumeLayouts(true);

                // If moving within the same container, the container's onMove method will have ensured that the top level
                // headerCt's onHeaderMoved.
                if (!sameCt) {
                    headerCt.onHeaderMoved(dragHeader, colsToMove, visibleFromIdx, visibleToIdx);
                }

                // Ext.grid.header.Container will handle the removal of empty groups, don't handle it here
            }
        }
    }
});
