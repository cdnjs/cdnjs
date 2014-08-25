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
 * Plugin to add header resizing functionality to a HeaderContainer.
 * Always resizing header to the left of the splitter you are resizing.
 */
Ext.define('Ext.grid.plugin.HeaderResizer', {
    extend: 'Ext.AbstractPlugin',
    requires: ['Ext.dd.DragTracker', 'Ext.util.Region'],
    alias: 'plugin.gridheaderresizer',

    disabled: false,

    config: {
        /**
         * @cfg {Boolean} dynamic
         * True to resize on the fly rather than using a proxy marker.
         * @accessor
         */
        dynamic: false
    },

    colHeaderCls: Ext.baseCSSPrefix + 'column-header',

    minColWidth: 40,
    maxColWidth: 1000,
    wResizeCursor: 'col-resize',
    eResizeCursor: 'col-resize',
    // not using w and e resize bc we are only ever resizing one
    // column
    //wResizeCursor: Ext.isWebKit ? 'w-resize' : 'col-resize',
    //eResizeCursor: Ext.isWebKit ? 'e-resize' : 'col-resize',

    init: function(headerCt) {
        this.headerCt = headerCt;
        headerCt.on('render', this.afterHeaderRender, this, {single: true});
    },

    /**
     * @private
     * AbstractComponent calls destroy on all its plugins at destroy time.
     */
    destroy: function() {
        if (this.tracker) {
            this.tracker.destroy();
        }
    },

    afterHeaderRender: function() {
        var headerCt = this.headerCt,
            el = headerCt.el;

        headerCt.mon(el, 'mousemove', this.onHeaderCtMouseMove, this);

        this.tracker = new Ext.dd.DragTracker({
            disabled: this.disabled,
            onBeforeStart: Ext.Function.bind(this.onBeforeStart, this),
            onStart: Ext.Function.bind(this.onStart, this),
            onDrag: Ext.Function.bind(this.onDrag, this),
            onEnd: Ext.Function.bind(this.onEnd, this),
            tolerance: 3,
            autoStart: 300,
            el: el
        });
    },

    // As we mouse over individual headers, change the cursor to indicate
    // that resizing is available, and cache the resize target header for use
    // if/when they mousedown.
    onHeaderCtMouseMove: function(e, t) {
        var me = this,
            prevSiblings,
            headerEl, overHeader, resizeHeader, resizeHeaderOwnerGrid, ownerGrid;

        if (me.headerCt.dragging) {
            if (me.activeHd) {
                me.activeHd.el.dom.style.cursor = '';
                delete me.activeHd;
            }
        } else {
            headerEl = e.getTarget('.' + me.colHeaderCls, 3, true);

            if (headerEl){
                overHeader = Ext.getCmp(headerEl.id);

                // On left edge, go back to the previous non-hidden header.
                if (overHeader.isOnLeftEdge(e)) {
                    resizeHeader = overHeader.previousNode('gridcolumn:not([hidden]):not([isGroupHeader])')
                    // There may not *be* a previous non-hidden header.
                    if (resizeHeader) {

                        ownerGrid = me.headerCt.up('tablepanel');
                        resizeHeaderOwnerGrid = resizeHeader.up('tablepanel');

                        // Need to check that previousNode didn't go outside the current grid/tree
                        // But in the case of a Grid which contains a locked and normal grid, allow previousNode to jump
                        // from the first column of the normalGrid to the last column of the lockedGrid
                        if (!((resizeHeaderOwnerGrid === ownerGrid) || ((ownerGrid.ownerCt.isXType('tablepanel')) && ownerGrid.ownerCt.view.lockedGrid === resizeHeaderOwnerGrid))) {
                            resizeHeader = null;
                        }
                    }
                }
                // Else, if on the right edge, we're resizing the column we are over
                else if (overHeader.isOnRightEdge(e)) {
                    resizeHeader = overHeader;
                }
                // Between the edges: we are not resizing
                else {
                    resizeHeader = null;
                }

                // We *are* resizing
                if (resizeHeader) {
                    // If we're attempting to resize a group header, that cannot be resized,
                    // so find its last visible leaf header; Group headers are sized
                    // by the size of their child headers.
                    if (resizeHeader.isGroupHeader) {
                        prevSiblings = resizeHeader.getGridColumns();
                        resizeHeader = prevSiblings[prevSiblings.length - 1];
                    }

                    // Check if the header is resizable. Continue checking the old "fixed" property, bug also
                    // check whether the resizable property is set to false.
                    if (resizeHeader && !(resizeHeader.fixed || (resizeHeader.resizable === false) || me.disabled)) {
                        me.activeHd = resizeHeader;
                        overHeader.el.dom.style.cursor = me.eResizeCursor;
                        if (overHeader.triggerEl) {
                            overHeader.triggerEl.dom.style.cursor = me.eResizeCursor;
                        }
                    }
                // reset
                } else {
                    overHeader.el.dom.style.cursor = '';
                    if (overHeader.triggerEl) {
                        overHeader.triggerEl.dom.style.cursor = '';
                    }
                    me.activeHd = null;
                }
            }
        }
    },

    // only start when there is an activeHd
    onBeforeStart : function(e) {
        // cache the activeHd because it will be cleared.
        this.dragHd = this.activeHd;

        if (!!this.dragHd && !this.headerCt.dragging) {
            this.tracker.constrainTo = this.getConstrainRegion();
            return true;
        } else {
            this.headerCt.dragging = false;
            return false;
        }
    },

    // get the region to constrain to, takes into account max and min col widths
    getConstrainRegion: function() {
        var me       = this,
            dragHdEl = me.dragHd.el,
            rightAdjust = 0,
            nextHd,
            lockedGrid;

        // If forceFit, then right constraint is based upon not being able to force the next header
        // beyond the minColWidth. If there is no next header, then the header may not be expanded.
        if (me.headerCt.forceFit) {
            nextHd = me.dragHd.nextNode('gridcolumn:not([hidden]):not([isGroupHeader])');
            if (nextHd) {
                if (!me.headerInSameGrid(nextHd)) {
                    nextHd = null;
                }
                rightAdjust = nextHd.getWidth() - me.minColWidth;
            }
        }

        // If resize header is in a locked grid, the maxWidth has to be 30px within the available locking grid's width
        else if ((lockedGrid = me.dragHd.up('tablepanel')).isLocked) {
            rightAdjust = me.dragHd.up('[scrollerOwner]').getWidth() - lockedGrid.getWidth() - 30;
        }

        // Else ue our default max width
        else {
            rightAdjust = me.maxColWidth - dragHdEl.getWidth();
        }

        return me.adjustConstrainRegion(
            dragHdEl.getRegion(),
            0,
            rightAdjust,
            0,
            me.minColWidth
        );
    },

    // initialize the left and right hand side markers around
    // the header that we are resizing
    onStart: function(e){
        var me       = this,
            dragHd   = me.dragHd,
            width    = dragHd.el.getWidth(),
            headerCt = dragHd.getOwnerHeaderCt(),
            x, y, gridSection, markerOwner, lhsMarker, rhsMarker, markerHeight;

        me.headerCt.dragging = true;
        me.origWidth = width;

        // setup marker proxies
        if (!me.dynamic) {
            gridSection  = markerOwner = headerCt.up('tablepanel');
            if (gridSection.ownerLockable) {
                markerOwner = gridSection.ownerLockable;
            }
            x            = me.getLeftMarkerX(markerOwner);
            lhsMarker    = markerOwner.getLhsMarker();
            rhsMarker    = markerOwner.getRhsMarker();
            markerHeight = gridSection.body.getHeight() + headerCt.getHeight();
            y            = headerCt.getOffsetsTo(markerOwner)[1];

            lhsMarker.setLocalY(y);
            rhsMarker.setLocalY(y);
            lhsMarker.setHeight(markerHeight);
            rhsMarker.setHeight(markerHeight);
            me.setMarkerX(lhsMarker, x);
            me.setMarkerX(rhsMarker, x + width);
        }
    },

    // synchronize the rhsMarker with the mouse movement
    onDrag: function(e){
        var me = this,
            markerOwner;
            
        if (me.dynamic) {
            me.doResize();
        } else {
            markerOwner = this.headerCt.up('tablepanel');
            if (markerOwner.ownerLockable) {
                markerOwner = markerOwner.ownerLockable;
            }
            this.setMarkerX(this.getMovingMarker(markerOwner), this.calculateDragX(markerOwner));
        }
    },
    
    getMovingMarker: function(markerOwner){
        return markerOwner.getRhsMarker();
    },

    onEnd: function(e) {
        this.headerCt.dragging = false;
        if (this.dragHd) {
            if (!this.dynamic) {
                var markerOwner = this.headerCt.up('tablepanel');

                // hide markers
                if (markerOwner.ownerLockable) {
                    markerOwner = markerOwner.ownerLockable;
                }
                this.setMarkerX(markerOwner.getLhsMarker(), -9999);
                this.setMarkerX(markerOwner.getRhsMarker(), -9999);
            }
            this.doResize();
        }
    },

    doResize: function() {
        var me = this,
            dragHd = me.dragHd,
            nextHd,
            offset;
            
        if (dragHd) {
            offset = me.tracker.getOffset('point');

            // resize the dragHd
            if (dragHd.flex) {
                delete dragHd.flex;
            }

            Ext.suspendLayouts();

            // Set the new column width.
            me.adjustColumnWidth(offset[0]);
 
            // In the case of forceFit, change the following Header width.
            // Constraining so that neither neighbour can be sized to below minWidth is handled in getConstrainRegion
            if (me.headerCt.forceFit) {
                nextHd = dragHd.nextNode('gridcolumn:not([hidden]):not([isGroupHeader])');
                if (nextHd && !me.headerInSameGrid(nextHd)) {
                    nextHd = null;
                }
                if (nextHd) {
                    delete nextHd.flex;
                    nextHd.setWidth(nextHd.getWidth() - offset[0]);
                }
            }

            // Apply the two width changes by laying out the owning HeaderContainer
            Ext.resumeLayouts(true);
        }
    },
    
    // nextNode can traverse out of this grid, possibly to others on the page, so limit it here
    headerInSameGrid: function(header) {
        var grid = this.dragHd.up('tablepanel');
        
        return !!header.up(grid);
    },

    disable: function() {
        this.disabled = true;
        if (this.tracker) {
            this.tracker.disable();
        }
    },

    enable: function() {
        this.disabled = false;
        if (this.tracker) {
            this.tracker.enable();
        }
    },

    calculateDragX: function(markerOwner) {
        return this.tracker.getXY('point')[0] - markerOwner.getX() - markerOwner.el.getBorderWidth('l');
    },

    getLeftMarkerX: function(markerOwner) {
        return this.dragHd.getX() - markerOwner.getX() - markerOwner.el.getBorderWidth('l') - 1;
    },

    setMarkerX: function(marker, x) {
        marker.setLocalX(x);
    },

    adjustConstrainRegion: function(region, t, r, b, l) {
        return region.adjust(t, r, b, l);
    },

    adjustColumnWidth: function(offsetX) {
        this.dragHd.setWidth(this.origWidth + offsetX);
    }
});