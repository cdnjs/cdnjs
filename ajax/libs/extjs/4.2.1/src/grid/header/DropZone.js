/*
This file is part of Ext JS 4.2

Copyright (c) 2011-2013 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as
published by the Free Software Foundation and appearing in the file LICENSE included in the
packaging of this file.

Please review the following information to ensure the GNU General Public License version 3.0
requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department
at http://www.sencha.com/contact.

Build date: 2013-05-16 14:36:50 (f9be68accb407158ba2b1be2c226a6ce1f649314)
*/
/**
 * @private
 */
Ext.define('Ext.grid.header.DropZone', {
    extend: 'Ext.dd.DropZone',
    colHeaderCls: Ext.baseCSSPrefix + 'column-header',
    proxyOffsets: [-4, -9],

    constructor: function(headerCt){
        this.headerCt = headerCt;
        this.ddGroup = this.getDDGroup();
        this.callParent([headerCt.el]);
    },

    getDDGroup: function() {
        return 'header-dd-zone-' + this.headerCt.up('[scrollerOwner]').id;
    },

    getTargetFromEvent : function(e){
        return e.getTarget('.' + this.colHeaderCls);
    },

    getTopIndicator: function() {
        if (!this.topIndicator) {
            this.self.prototype.topIndicator = Ext.DomHelper.append(Ext.getBody(), {
                cls: "col-move-top",
                html: "&#160;"
            }, true);
            this.self.prototype.indicatorXOffset = Math.floor((this.topIndicator.dom.offsetWidth + 1) / 2);
        }
        return this.topIndicator;
    },

    getBottomIndicator: function() {
        if (!this.bottomIndicator) {
            this.self.prototype.bottomIndicator = Ext.DomHelper.append(Ext.getBody(), {
                cls: "col-move-bottom",
                html: "&#160;"
            }, true);
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
            data.isLock = data.isUnlock = false;
            to = me.getLocation(e, node).header;
            
            // Dragging within the same container - always valid
            doPosition = (from.ownerCt === to.ownerCt);

            // If from different containers, and they are not sealed, then continue checking
            if (!doPosition && (!from.ownerCt.sealed && !to.ownerCt.sealed)) {

                doPosition = true;
                fromPanel = from.up('tablepanel');
                toPanel = to.up('tablepanel');

                // If it's a lock operation, check that it's allowable.
                data.isLock   = toPanel.isLocked && !fromPanel.isLocked;
                data.isUnlock = !toPanel.isLocked && fromPanel.isLocked;
                if ((data.isUnlock && from.lockable === false) || (data.isLock && !from.isLockable())) {
                    doPosition = false;
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
        if (this.valid) {
            var dragHeader   = data.header,
                dropLocation = data.dropLocation,
                targetHeader = dropLocation.header,
                fromCt       = dragHeader.ownerCt,
                localFromIdx = fromCt.items.indexOf(dragHeader), // Container.items is a MixedCollection
                toCt         = targetHeader.ownerCt,
                localToIdx   = toCt.items.indexOf(targetHeader),
                headerCt     = this.headerCt,
                columnManager= headerCt.columnManager,
                fromIdx      = columnManager.getHeaderIndex(dragHeader),
                toIdx        = columnManager.getHeaderIndex(targetHeader),
                colsToMove   = dragHeader.isGroupHeader ? dragHeader.query(':not([isGroupHeader])').length : 1,
                sameCt       = fromCt === toCt,
                scrollerOwner, savedWidth;

            // Drop position is to the right of the targetHeader, increment the toIdx correctly
            if (dropLocation.pos === 'after') {
                localToIdx++;
                toIdx += targetHeader.isGroupHeader ? targetHeader.query(':not([isGroupHeader])').length : 1;
            }

            // If we are dragging in between two HeaderContainers that have had the lockable
            // mixin injected we will lock/unlock headers in between sections, and then continue
            // with another execution of onNodeDrop to ensure the header is dropped into the correct group
            if (data.isLock) {
                scrollerOwner = fromCt.up('[scrollerOwner]');
                scrollerOwner.lock(dragHeader, localToIdx);
                data.isLock = false;

                // Now that the header has been transferred into the correct HeaderContainer, recurse, and continue the drop operation with the same dragData
                this.onNodeDrop(node, dragZone, e, data);
            } else if (data.isUnlock) {
                scrollerOwner = fromCt.up('[scrollerOwner]');
                scrollerOwner.unlock(dragHeader, localToIdx);
                data.isUnlock = false;

                // Now that the header has been transferred into the correct HeaderContainer, recurse, and continue the drop operation with the same dragData
                this.onNodeDrop(node, dragZone, e, data);
            }
            
            // This is a drop within the same HeaderContainer.
            else {
                this.invalidateDrop();
                // Cache the width here, we need to get it before we removed it from the DOM
                savedWidth = dragHeader.getWidth();
                
                // Dragging within the same container.
                if (sameCt) {
                    // A no-op. This can happen when cross lockable drag operations recurse (see above).
                    // If a drop was a lock/unlock, and the lock/unlock call placed the column in the
                    // desired position (lock places at end, unlock places at beginning) then we're done.
                    if (localToIdx === localFromIdx) {
                        // We still need to inform the rest of the components so that events can be fired.
                        headerCt.onHeaderMoved(dragHeader, colsToMove, fromIdx, toIdx);
                        return;
                    }
                    // If dragging rightwards, then after removal, the insertion index will be less.
                    if (localToIdx > localFromIdx) {
                        localToIdx -= 1;
                    }
                }

                // Suspend layouts while we sort all this out.
                Ext.suspendLayouts();

                if (sameCt) {
                    toCt.move(localFromIdx, localToIdx);
                } else {
                    fromCt.remove(dragHeader, false);
                    toCt.insert(localToIdx, dragHeader);
                }

                // Group headers acquire the aggregate width of their child headers
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

                // Refresh columns cache in case we remove an emptied group column
                headerCt.purgeCache();
                Ext.resumeLayouts(true);
                headerCt.onHeaderMoved(dragHeader, colsToMove, fromIdx, toIdx);

                // Ext.grid.header.Container will handle the removal of empty groups, don't handle it here
            }
        }
    }
});
