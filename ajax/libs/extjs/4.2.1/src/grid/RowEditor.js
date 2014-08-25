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
// Currently has the following issues:
// - Does not handle postEditValue
// - Fields without editors need to sync with their values in Store
// - starting to edit another record while already editing and dirty should probably prevent it
// - aggregating validation messages
// - tabIndex is not managed bc we leave elements in dom, and simply move via positioning
// - layout issues when changing sizes/width while hidden (layout bug)

/**
 * Internal utility class used to provide row editing functionality. For developers, they should use
 * the RowEditing plugin to use this functionality with a grid.
 *
 * @private
 */
Ext.define('Ext.grid.RowEditor', {
    extend: 'Ext.form.Panel',
    alias: 'widget.roweditor',
    requires: [
        'Ext.tip.ToolTip',
        'Ext.util.HashMap',
        'Ext.util.KeyNav',
        'Ext.grid.RowEditorButtons'
    ],

    //<locale>
    saveBtnText  : 'Update',
    //</locale>
    //<locale>
    cancelBtnText: 'Cancel',
    //</locale>
    //<locale>
    errorsText: 'Errors',
    //</locale>
    //<locale>
    dirtyText: 'You need to commit or cancel your changes',
    //</locale>

    lastScrollLeft: 0,
    lastScrollTop: 0,

    border: false,

    buttonUI: 'default',

    // Change the hideMode to offsets so that we get accurate measurements when
    // the roweditor is hidden for laying out things like a TriggerField.
    hideMode: 'offsets',

    initComponent: function() {
        var me = this,
            grid = me.editingPlugin.grid,
            Container = Ext.container.Container;

        me.cls = Ext.baseCSSPrefix + 'grid-editor ' + Ext.baseCSSPrefix + 'grid-row-editor';

        me.layout = {
            type: 'hbox',
            align: 'middle'
        };

        me.lockable = grid.lockable;

        // Create field containing structure for when editing a lockable grid.
        if (me.lockable) {
            me.items = [
                // Locked columns container shrinkwraps the fields
                me.lockedColumnContainer = new Container({
                    id: grid.id + '-locked-editor-cells',
                    layout: {
                        type: 'hbox',
                        align: 'middle'
                    },
                    // Locked grid has a border, we must be exactly the same width
                    margin: '0 1 0 0'
                }),

                // Normal columns container flexes the remaining RowEditor width
                me.normalColumnContainer = new Container({
                    flex: 1,
                    id: grid.id + '-normal-editor-cells',
                    layout: {
                        type: 'hbox',
                        align: 'middle'
                    }
                })
            ];
        } else {
            me.lockedColumnContainer = me.normalColumnContainer = me;
        }

        me.callParent(arguments);

        if (me.fields) {
            me.addFieldsForColumn(me.fields, true);
            me.insertColumnEditor(me.fields);
            delete me.fields;
        }

        me.mon(me.hierarchyEventSource, {
            scope: me,
            show: me.repositionIfVisible
        });
        me.getForm().trackResetOnLoad = true;
    },

    //
    // Grid listener added when this is rendered.
    // Keep our containing element sized correctly
    //
    onGridResize: function() {
        var me = this,
            clientWidth = me.getClientWidth(),
            grid = me.editingPlugin.grid,
            gridBody = grid.body,
            btns = me.getFloatingButtons();

        me.setLocalX(gridBody.getOffsetsTo(grid)[0] + gridBody.getBorderWidth('l') - grid.el.getBorderWidth('l'));
        
        me.setWidth(clientWidth);
        btns.setLocalX((clientWidth - btns.getWidth()) / 2);
    },

    onFieldRender: function(field){
        var me = this,
            column = field.column;

        if (column.isVisible()) {
            me.syncFieldWidth(column);
        } else if (!column.rendered) {
            // column is pending a layout, so we can't set the width until it does
            me.view.headerCt.on({
                afterlayout: Ext.Function.bind(me.syncFieldWidth, me, [column]),
                single: true
            });
        }
    },

    syncFieldWidth: function(column) {
        var field = column.getEditor(),
            width;
        field._marginWidth = (field._marginWidth || field.el.getMargin('lr'));
        width = column.getWidth() - field._marginWidth;
        field.setWidth(width);
        if (field.xtype === 'displayfield') {
            // displayfield must have the width set on the inputEl for ellipsis to work
            field.inputWidth = width;
        }
    },

    onFieldChange: function() {
        var me = this,
            form = me.getForm(),
            valid = form.isValid();
        if (me.errorSummary && me.isVisible()) {
            me[valid ? 'hideToolTip' : 'showToolTip']();
        }
        me.updateButton(valid);
        me.isValid = valid;
    },

    updateButton: function(valid){
        var buttons = this.floatingButtons; 
        if (buttons) {
            buttons.child('#update').setDisabled(!valid);
        } else {
            // set flag so we can disabled when created if needed
            this.updateButtonDisabled = !valid;
        }
    },

    afterRender: function() {
        var me = this,
            plugin = me.editingPlugin,
            grid = plugin.grid,
            view = grid.lockable ? grid.normalGrid.view : grid.view,
            field;

        me.callParent(arguments);

        // The scrollingViewEl is the TableView which scrolls
        me.scrollingView = view;
        me.scrollingViewEl = view.el;
        view.mon(me.scrollingViewEl, 'scroll', me.onViewScroll, me);

        // Prevent from bubbling click events to the grid view
        me.mon(me.el, {
            click: Ext.emptyFn,
            stopPropagation: true
        });

        // Ensure that the editor width always matches the total header width
        me.mon(grid, {
            resize: me.onGridResize,
            scope: me
        });

        me.el.swallowEvent([
            'keypress',
            'keydown'
        ]);

        me.fieldScroller = me.normalColumnContainer.layout.innerCt;
        me.fieldScroller.dom.style.overflow = 'hidden';
        me.fieldScroller.on({
            scroll: me.onFieldContainerScroll,
            scope: me
        });

        me.keyNav = new Ext.util.KeyNav(me.el, {
            enter: plugin.completeEdit,
            esc: plugin.onEscKey,
            scope: plugin
        });

        me.mon(plugin.view, {
            beforerefresh: me.onBeforeViewRefresh,
            refresh: me.onViewRefresh,
            itemremove: me.onViewItemRemove,
            scope: me
        });

        // Prevent trying to reposition while we set everything up
        me.preventReposition = true;
        Ext.Array.each(me.query('[isFormField]'), function(field) {
            if (field.column.isVisible()) {
                me.onColumnShow(field.column);
            }
        }, me);
        delete me.preventReposition;    
    },

    onBeforeViewRefresh: function(view) {
        var me = this,
            viewDom = view.el.dom;

        if (me.el.dom.parentNode === viewDom) {
            viewDom.removeChild(me.el.dom);
        }
    },

    onViewRefresh: function(view) {
        var me = this,
            context = me.context,
            row;

        // Recover our row node after a view refresh
        if (context && (row = view.getNode(context.record, true))) {
            context.row = row;
            me.reposition();
            if (me.tooltip && me.tooltip.isVisible()) {
                me.tooltip.setTarget(context.row);
            }
        } else {
            me.editingPlugin.cancelEdit();
        }
    },

    onViewItemRemove: function(record, index) {
        var context = this.context;
        if (context && record === context.record) {
            // if the record being edited was removed, cancel editing
            this.editingPlugin.cancelEdit();
        }
    },

    onViewScroll: function() {
        var me = this,
            viewEl = me.editingPlugin.view.el,
            scrollingViewEl = me.scrollingViewEl,
            scrollTop  = scrollingViewEl.dom.scrollTop,
            scrollLeft = scrollingViewEl.getScrollLeft(),
            scrollLeftChanged = scrollLeft !== me.lastScrollLeft,
            scrollTopChanged = scrollTop !== me.lastScrollTop,
            row;

        me.lastScrollTop  = scrollTop;
        me.lastScrollLeft = scrollLeft;
        if (me.isVisible()) {
            row = Ext.getDom(me.context.row.id);

            // Only reposition if the row is in the DOM (buffered rendering may mean the context row is not there)
            if (row && viewEl.contains(row)) {
                if (scrollTopChanged) {

                    // The row element in the context may be stale due to buffered rendering removing out-of-view rows, then re-inserting newly rendered ones
                    me.context.row = row;
                    me.reposition(null, true);
                    if ((me.tooltip && me.tooltip.isVisible()) || me.hiddenTip) {
                        me.repositionTip();
                    }

                    me.syncEditorClip();
                }
            }
            // If row is NOT in the DOM, ensure the editor is out of sight
            else {
                me.setLocalY(-400);
            }
        }

        // Keep fields' left/right scroll position synced with view's left/right scroll
        if (me.rendered && scrollLeftChanged) {
            me.syncFieldsHorizontalScroll();
        }
    },

    // Synchronize the horizontal scroll position of the fields with the state of the grid view
    syncFieldsHorizontalScroll: function() {
        // Set overflow style here because it is an embedded element and the "style" Component config does not target it.
        this.fieldScroller.setScrollLeft(this.lastScrollLeft);
    },

    // Synchronize the horizontal scroll position of the grid view with the fields.
    onFieldContainerScroll: function() {
        this.scrollingViewEl.setScrollLeft(this.fieldScroller.getScrollLeft());
    },

    onColumnResize: function(column, width) {
        var me = this;

        if (me.rendered) {
            // Need to ensure our lockable/normal horizontal scrollrange is set
            me.onGridResize();
            me.onViewScroll();
            if (!column.isGroupHeader) {
                me.syncFieldWidth(column);
                me.repositionIfVisible();
            }
        }
    },

    onColumnHide: function(column) {
        if (!column.isGroupHeader) {
            column.getEditor().hide();
            this.repositionIfVisible();
        }
    },

    onColumnShow: function(column) {
        var me = this;

        if (me.rendered && !column.isGroupHeader) {
            column.getEditor().show();
            me.syncFieldWidth(column);
            if (!me.preventReposition) {
                this.repositionIfVisible();
            }
        }
    },

    onColumnMove: function(column, fromIdx, toIdx) {
        var me = this,
            i, incr = 1, len, field, fieldIdx,
            fieldContainer = column.isLocked() ? me.lockedColumnContainer : me.normalColumnContainer;

        // If moving a group, move each leaf header
        if (column.isGroupHeader) {
            Ext.suspendLayouts();
            column = column.getGridColumns();

            if (toIdx > fromIdx) {
                toIdx--;
                incr = 0;
            }

            this.addFieldsForColumn(column);
            for (i = 0, len = column.length; i < len; i++, fromIdx += incr, toIdx += incr) {
                field = column[i].getEditor();
                fieldIdx = fieldContainer.items.indexOf(field);

                // If the field is not in the container (moved from the main headerCt, INTO a group header)
                // then insert it into the correct place
                if (fieldIdx === -1) {
                    fieldContainer.insert(toIdx, field);
                }

                // If the field has not already been processed by an onColumnAdd (move from a group header INTO the main headerCt), then move it
                else if (fieldIdx != toIdx) {
                    fieldContainer.move(fromIdx, toIdx);
                }
            }
            Ext.resumeLayouts(true);
        } else {
            if (toIdx > fromIdx) {
                toIdx--;
            }
            this.addFieldsForColumn(column);
            field = column.getEditor();
            fieldIdx = fieldContainer.items.indexOf(field);
            if (fieldIdx === -1) {
                fieldContainer.insert(toIdx, field);
            }
            else if (fieldIdx != toIdx) {
                fieldContainer.move(fromIdx, toIdx);
            }
        }
    },

    onColumnAdd: function(column) {

        // If a column header added, process its leaves
        if (column.isGroupHeader) {
            column = column.getGridColumns();
        }
        //this.preventReposition = true;
        this.addFieldsForColumn(column);
        this.insertColumnEditor(column);
        this.preventReposition = false;
    },

    insertColumnEditor: function(column) {
        var me = this,
            fieldContainer,
            len, i;

        if (Ext.isArray(column)) {
            for (i = 0, len = column.length; i < len; i++) {
                me.insertColumnEditor(column[i]);
            }
            return;
        }

        if (!column.getEditor) {
            return;
        }

        fieldContainer = column.isLocked() ? me.lockedColumnContainer : me.normalColumnContainer;
        
        // Insert the column's field into the editor panel.
        fieldContainer.insert(column.getVisibleIndex(), column.getEditor());
    },

    onColumnRemove: function(ct, column) {
        column = column.isGroupHeader ? column.getGridColumns() : column;
        this.removeColumnEditor(column);
    },

    removeColumnEditor: function(column) {
        var me = this,
            field,
            len, i;

        if (Ext.isArray(column)) {
            for (i = 0, len = column.length; i < len; i++) {
                me.removeColumnEditor(column[i]);
            }
            return;
        }

        if (column.hasEditor()) {
            field = column.getEditor();
            if (field && field.ownerCt) {
                field.ownerCt.remove(field, false);
            }
        }
    },

    onColumnReplace: function(map, fieldId, column, oldColumn) {
        this.onColumnRemove(oldColumn.ownerCt, oldColumn);
    },

    getFloatingButtons: function() {
        var me = this,
            btns = me.floatingButtons;

        if (!btns) {
            me.floatingButtons = btns = new Ext.grid.RowEditorButtons({
                rowEditor: me
            });
        }
        return btns;
    },

    repositionIfVisible: function(c) {
        var me = this,
            view = me.view;

        // If we're showing ourselves, jump out
        // If the component we're showing doesn't contain the view
        if (c && (c == me || !c.el.isAncestor(view.el))) {
            return;
        }

        if (me.isVisible() && view.isVisible(true)) {
            me.reposition();
        }
    },

    getRefOwner: function() {
        return this.editingPlugin.grid;
    },

    // Lie to the CQ system about our nesting structure.
    // Pretend all the fields are always immediate children.
    // Include the two buttons.
    getRefItems: function() {
        var me = this,
            result;

        if (me.lockable) {
            result = me.lockedColumnContainer.getRefItems();
            result.push.apply(result, me.normalColumnContainer.getRefItems());
        } else {
            result = me.callParent();
        }
        result.push.apply(result, me.getFloatingButtons().getRefItems());
        return result;
    },

    reposition: function(animateConfig, fromScrollHandler) {
        var me = this,
            context = me.context,
            row = context && Ext.get(context.row),
            yOffset = 0,
            rowTop,
            localY,
            deltaY,
            afterPosition;

        // Position this editor if the context row is rendered (buffered rendering may mean that it's not in the DOM at all)
        if (row && Ext.isElement(row.dom)) {

            deltaY = me.syncButtonPosition(me.getScrollDelta());

            if (!me.editingPlugin.grid.rowLines) { 
                // When the grid does not have rowLines we add a bottom border to the previous
                // row when the row is focused, but subtract the border width from the 
                // top padding to keep the row from changing size.  This adjusts the top offset
                // of the cell edtor to account for the added border.
                yOffset = -parseInt(row.first().getStyle('border-bottom-width'));
            }
            rowTop = me.calculateLocalRowTop(row);
            localY = me.calculateEditorTop(rowTop) + yOffset;

            // If not being called from scroll handler...
            // If the editor's top will end up above the fold
            // or the bottom will end up below the fold,
            // organize an afterPosition handler which will bring it into view and focus the correct input field
            if (!fromScrollHandler) {
                afterPosition = function() {
                    if (deltaY) {
                        me.scrollingViewEl.scrollBy(0, deltaY, true);
                    }
                    me.focusContextCell();
                }
            }

            me.syncEditorClip();

            // Get the y position of the row relative to its top-most static parent.
            // offsetTop will be relative to the table, and is incorrect
            // when mixed with certain grid features (e.g., grouping).
            if (animateConfig) {
                me.animate(Ext.applyIf({
                    to: {
                        top: localY
                    },
                    duration: animateConfig.duration || 125,
                    callback: afterPosition
                }, animateConfig));
            } else {
                me.setLocalY(localY);
                if (afterPosition) {
                    afterPosition();
                }
            }
        }
    },

    /**
     * @private
     * Returns the scroll delta required to scroll the context row into view in order to make
     * the whole of this editor visible.
     * @return {Number} the scroll delta. Zero if scrolling is not required.
     */
    getScrollDelta: function() {
        var me = this,
            scrollingViewDom = me.scrollingViewEl.dom,
            context = me.context,
            body = me.body,
            deltaY = 0;

        if (context) {
            deltaY = Ext.fly(context.row).getOffsetsTo(scrollingViewDom)[1] - body.getBorderPadding().beforeY;
            if (deltaY > 0) {
                deltaY = Math.max(deltaY + me.getHeight() + me.floatingButtons.getHeight() -
                    scrollingViewDom.clientHeight - body.getBorderWidth('b'), 0);
            }
        }
        return deltaY;
    },

    //
    // Calculates the top pixel position of the passed row within the view's scroll space.
    // So in a large, scrolled grid, this could be several thousand pixels.
    //
    calculateLocalRowTop: function(row) {
        var grid = this.editingPlugin.grid;
        return Ext.fly(row).getOffsetsTo(grid)[1] - grid.el.getBorderWidth('t') + this.lastScrollTop;
    },

    // Given the top pixel position of a row in the scroll space,
    // calculate the editor top position in the view's encapsulating element.
    // This will only ever be in the visible range of the view's element.
    calculateEditorTop: function(rowTop) {
        return rowTop - this.body.getBorderPadding().beforeY - this.lastScrollTop;
    },

    getClientWidth: function() {
        var me = this,
            grid = me.editingPlugin.grid,
            result;

        if (me.lockable) {
            result =
               grid.lockedGrid.getWidth() +
               grid.normalGrid.view.el.dom.clientWidth - 1;
        }
        else {
            result = grid.view.el.dom.clientWidth;
        }
        return result;
    },

    getEditor: function(fieldInfo) {
        var me = this;

        if (Ext.isNumber(fieldInfo)) {
            // Query only form fields. This just future-proofs us in case we add
            // other components to RowEditor later on.  Don't want to mess with
            // indices.
            return me.query('[isFormField]')[fieldInfo];
        } else if (fieldInfo.isHeader && !fieldInfo.isGroupHeader) {
            return fieldInfo.getEditor();
        }
    },

    addFieldsForColumn: function(column, initial) {
        var me = this,
            i,
            length, field;

        if (Ext.isArray(column)) {
            for (i = 0, length = column.length; i < length; i++) {
                me.addFieldsForColumn(column[i], initial);
            }
            return;
        }

        if (column.getEditor) {

            // Get a default display field if necessary
            field = column.getEditor(null, {
                xtype: 'displayfield',
                // Override Field's implementation so that the default display fields will not return values. This is done because
                // the display field will pick up column renderers from the grid.
                getModelData: function() {
                    return null;
                }
            });
            if (column.align === 'right') {
                field.fieldStyle = 'text-align:right';
            }

            if (column.xtype === 'actioncolumn') {
                field.fieldCls += ' ' + Ext.baseCSSPrefix + 'form-action-col-field'
            }

            if (me.isVisible() && me.context) {
                if (field.is('displayfield')) {
                    me.renderColumnData(field, me.context.record, column);
                } else {
                    field.suspendEvents();
                    field.setValue(me.context.record.get(column.dataIndex));
                    field.resumeEvents();
                }
            }
            if (column.hidden) {
                me.onColumnHide(column);
            } else if (column.rendered && !initial) {
                // Setting after initial render
                me.onColumnShow(column);
            }
        }
    },

    loadRecord: function(record) {
        var me     = this,
            form   = me.getForm(),
            fields = form.getFields(),
            items  = fields.items,
            length = items.length,
            i, displayFields,
            isValid;

        // temporarily suspend events on form fields before loading record to prevent the fields' change events from firing
        for (i = 0; i < length; i++) {
            items[i].suspendEvents();
        }

        form.loadRecord(record);

        for (i = 0; i < length; i++) {
            items[i].resumeEvents();
        }

        isValid = form.isValid();
        if (me.errorSummary) {
            if (isValid) {
                me.hideToolTip();
            } else {
                me.showToolTip();
            }
        }

        me.updateButton(isValid);

        // render display fields so they honor the column renderer/template
        displayFields = me.query('>displayfield');
        length = displayFields.length;

        for (i = 0; i < length; i++) {
            me.renderColumnData(displayFields[i], record);
        }
    },

    renderColumnData: function(field, record, activeColumn) {
        var me = this,
            grid = me.editingPlugin.grid,
            headerCt = grid.headerCt,
            view = me.scrollingView,
            store = view.dataSource,
            column = activeColumn || field.column,
            value = record.get(column.dataIndex),
            renderer = column.editRenderer || column.renderer,
            metaData,
            rowIdx,
            colIdx;

        // honor our column's renderer (TemplateHeader sets renderer for us!)
        if (renderer) {
            metaData = { tdCls: '', style: '' };
            rowIdx = store.indexOf(record);
            colIdx = headerCt.getHeaderIndex(column);

            value = renderer.call(
                column.scope || headerCt.ownerCt,
                value,
                metaData,
                record,
                rowIdx,
                colIdx,
                store,
                view
            );
        }

        field.setRawValue(value);
        field.resetOriginalValue();
    },

    beforeEdit: function() {
        var me = this,
            scrollDelta;

        if (me.isVisible() && me.errorSummary && !me.autoCancel && me.isDirty()) {

            // Scroll the visible RowEditor that is in error state back into view
            scrollDelta = me.getScrollDelta();
            if (scrollDelta) {
                me.scrollingViewEl.scrollBy(0, scrollDelta, true)
            }
            me.showToolTip();
            return false;
        }
    },

    /**
     * Start editing the specified grid at the specified position.
     * @param {Ext.data.Model} record The Store data record which backs the row to be edited.
     * @param {Ext.data.Model} columnHeader The Column object defining the column to be edited.
     */
    startEdit: function(record, columnHeader) {
        var me = this,
            editingPlugin = me.editingPlugin,
            grid = editingPlugin.grid,
            context = me.context = editingPlugin.context;

        if (!me.rendered) {
            me.width = me.getClientWidth();
            me.render(grid.el, grid.el.dom.firstChild);
            me.getFloatingButtons().render(me.el);
            // On first show we need to ensure that we have the scroll positions cached
            me.onViewScroll();
        } else {
            me.syncFieldsHorizontalScroll();
        }

        if (me.isVisible()) {
            me.reposition(true);
        } else {
            me.show();
        }

        // Make sure the container el is correctly sized.
        me.onGridResize();

        // make sure our row is selected before editing
        context.grid.getSelectionModel().select(record);

        // Reload the record data
        me.loadRecord(record);
    },

    // determines the amount by which the row editor will overflow, and flips the buttons
    // to the top of the editor if the required scroll amount is greater than the available
    // scroll space. Returns the scrollDelta required to scroll the editor into view after
    // adjusting the button position.
    syncButtonPosition: function(scrollDelta) {
        var me = this,
            floatingButtons = me.getFloatingButtons(),
            scrollingViewElDom = me.scrollingViewEl.dom,
            overflow = this.getScrollDelta() - (scrollingViewElDom.scrollHeight -
                scrollingViewElDom.scrollTop - scrollingViewElDom.clientHeight);

        if (overflow > 0) {
            if (!me._buttonsOnTop) {
                floatingButtons.setButtonPosition('top');
                me._buttonsOnTop = true;
            }
            scrollDelta = 0;
        } else if (me._buttonsOnTop) {
            floatingButtons.setButtonPosition('bottom');
            me._buttonsOnTop = false;
        }

        return scrollDelta;
    },

    // since the editor is rendered to the grid el, it must be clipped when scrolled
    // outside of the grid view area so that it does not overlap the scrollbar or docked items
    syncEditorClip: function() {
        var me = this,
            overflow = me.getScrollDelta(),
            btnHeight;

        if (overflow) {
            // The editor is overflowing outside of the view area, either above or below
            me.isOverflowing = true;
            btnHeight = me.floatingButtons.getHeight();

            if (overflow > 0) {
                // editor is overflowing the bottom of the view
                me.clipBottom(Math.max(me.getHeight() - overflow + btnHeight, -btnHeight));
            } else if (overflow < 0) {
                // editor is overflowing the top of the view
                overflow = Math.abs(overflow);
                me.clipTop(Math.max(overflow, 0));
            }
        } else if (me.isOverflowing) {
            me.clearClip();
            me.isOverflowing = false;
        }
    },

    // Focus the cell on start edit based upon the current context
    focusContextCell: function() {
        var field = this.getEditor(this.context.column);
        if (field && field.focus) {
            field.focus();
        }
    },

    cancelEdit: function() {
        var me     = this,
            form   = me.getForm(),
            fields = form.getFields(),
            items  = fields.items,
            length = items.length,
            i;

        me.hide();
        form.clearInvalid();

        // temporarily suspend events on form fields before reseting the form to prevent the fields' change events from firing
        for (i = 0; i < length; i++) {
            items[i].suspendEvents();
        }

        form.reset();

        for (i = 0; i < length; i++) {
            items[i].resumeEvents();
        }
    },

    completeEdit: function() {
        var me = this,
            form = me.getForm();

        if (!form.isValid()) {
            return false;
        }

        form.updateRecord(me.context.record);
        me.hide();
        return true;
    },

    onShow: function() {
        var me = this;

        me.callParent(arguments);
        me.reposition();
    },

    onHide: function() {
        var me = this;

        me.callParent(arguments);
        if (me.tooltip) {
            me.hideToolTip();
        }
        if (me.context) {
            me.context.view.focusRow(me.context.record);
            me.context = null;
        }
    },

    isDirty: function() {
        var me = this,
            form = me.getForm();
        return form.isDirty();
    },

    getToolTip: function() {
        return this.tooltip || (this.tooltip = new Ext.tip.ToolTip({
            cls: Ext.baseCSSPrefix + 'grid-row-editor-errors',
            title: this.errorsText,
            autoHide: false,
            closable: true,
            closeAction: 'disable',
            anchor: 'left',
            anchorToTarget: false
        }));
    },

    hideToolTip: function() {
        var me = this,
            tip = me.getToolTip();
        if (tip.rendered) {
            tip.disable();
        }
        me.hiddenTip = false;
    },

    showToolTip: function() {
        var me = this,
            tip = me.getToolTip();

        tip.showAt([0, 0]);
        tip.update(me.getErrors());
        me.repositionTip();
        tip.enable();
    },

    repositionTip: function() {
        var me = this,
            tip = me.getToolTip(),
            context = me.context,
            row = Ext.get(context.row),
            viewEl = me.scrollingViewEl,
            viewHeight = viewEl.dom.clientHeight,
            viewTop = me.lastScrollTop,
            viewBottom = viewTop + viewHeight,
            rowHeight = row.getHeight(),
            rowTop = row.getOffsetsTo(me.context.view.body)[1],
            rowBottom = rowTop + rowHeight;

        if (rowBottom > viewTop && rowTop < viewBottom) {
            tip.showAt(tip.getAlignToXY(viewEl, 'tl-tr', [15, row.getOffsetsTo(viewEl)[1]]));
            me.hiddenTip = false;
        } else {
            tip.hide();
            me.hiddenTip = true;
        }
    },

    getErrors: function() {
        var me        = this,
            errors    = [],
            fields    = me.query('>[isFormField]'),
            length    = fields.length,
            i;

        for (i = 0; i < length; i++) {
            errors = errors.concat(
                Ext.Array.map(fields[i].getErrors(), me.createErrorListItem)
            );
        }

        // Only complain about unsaved changes if all the fields are valid
        if (!errors.length && !me.autoCancel && me.isDirty()) {
            errors[0] = me.createErrorListItem(me.dirtyText);
        }

        return '<ul class="' + Ext.plainListCls + '">' + errors.join('') + '</ul>';
    },

    createErrorListItem: function(e) {
        return '<li class="' + Ext.baseCSSPrefix + 'grid-row-editor-errors-item">' + e + '</li>';
    },

    beforeDestroy: function(){
        Ext.destroy(this.floatingButtons, this.tooltip);
        this.callParent();    
    },

    clipBottom: function(value) {
        this.el.setStyle('clip', 'rect(-1000px auto ' + value + 'px auto)');
    },

    clipTop: function(value) {
        this.el.setStyle('clip', 'rect(' + value + 'px auto 1000px auto)');
    },

    clearClip: function(el) {
        this.el.setStyle(
            'clip',
            Ext.isIE8m || Ext.isIEQuirks ? 'rect(-1000px auto 1000px auto)' : 'auto'
        );
    }
});