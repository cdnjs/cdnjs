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

    errorCls: Ext.baseCSSPrefix + 'grid-row-editor-errors-item',
    buttonUI: 'default',

    // Change the hideMode to offsets so that we get accurate measurements when
    // the roweditor is hidden for laying out things like a TriggerField.
    hideMode: 'offsets',

    initComponent: function() {
        var me = this,
            grid = me.editingPlugin.grid,
            Container = Ext.container.Container,
            form;

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

        me.mon(Ext.GlobalEvents, {
            scope: me,
            show: me.repositionIfVisible
        });
        
        form = me.getForm();
        form.trackResetOnLoad = true;
        form.on('validitychange', me.onValidityChange, me);
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
    
    syncAllFieldWidths: function() {
        var me = this;
        // In a locked grid, a RowEditor uses 2 inner containers, so need to use CQ to retrieve
        // configured editors which were stamped with the isEditorComponent property in Editing.createColumnField
        Ext.Array.each(me.query('[isEditorComponent]'), function(editorComponent) {
            if (editorComponent.column.isVisible()) {
                me.onColumnShow(editorComponent.column);
            }
        }, me);    
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

    onValidityChange: function(form, valid) {
        var me = this;
            
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
            view = grid.lockable ? grid.normalGrid.view : grid.view;

        me.callParent(arguments);

        // The scrollingViewEl is the TableView which scrolls
        me.scrollingView = view;
        me.scrollingViewEl = view.el;
        view.on('scroll', me.onViewScroll, me);

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
        
        me.initKeyNav();

        me.mon(plugin.view, {
            beforerefresh: me.onBeforeViewRefresh,
            refresh: me.onViewRefresh,
            itemremove: me.onViewItemRemove,
            scope: me
        });

        // Prevent trying to reposition while we set everything up
        me.preventReposition = true;
        me.syncAllFieldWidths();
        delete me.preventReposition;    
    },

    initKeyNav: function() {
        var me = this,
            plugin = me.editingPlugin;

        me.keyNav = new Ext.util.KeyNav(me.el, {
            enter: plugin.completeEdit,
            esc: plugin.onEscKey,
            scope: plugin
        });
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
        if (context && (row = view.getRow(context.record))) {
            context.row = row;
            me.reposition();
            if (me.tooltip && me.tooltip.isVisible()) {
                me.tooltip.setTarget(context.row);
            }
        } else {
            me.editingPlugin.cancelEdit();
        }
    },

    onViewItemRemove: function(record, index, item, view) {

        // If the itemremove is due to refreshing, ignore it.
        // If the row for the current context record has gone after the
        // refresh, editing will be canceled there. See onViewRefresh above.
        if (!view.refreshing) {
            var context = this.context;
            if (context && record === context.record) {
                // if the record being edited was removed, cancel editing
                this.editingPlugin.cancelEdit();
            }
        }
    },

    onViewScroll: function() {
        var me = this,
            viewEl = me.editingPlugin.view.el,
            scrollingView = me.scrollingView,
            scrollTop  = scrollingView.getScrollY(),
            scrollLeft = scrollingView.getScrollX(),
            scrollLeftChanged = scrollLeft !== me.lastScrollLeft,
            scrollTopChanged = scrollTop !== me.lastScrollTop,
            row;

        me.lastScrollTop  = scrollTop;
        me.lastScrollLeft = scrollLeft;
        if (me.isVisible()) {
            row = Ext.getDom(me.context.row);

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
        this.scrollingView.setScrollX(this.getFieldScrollerScrollX());
    },

    getFieldScrollerScrollX: function() {
        return this.fieldScroller.getScrollLeft();
    },

    onColumnResize: function(column, width) {
        var me = this;

        if (me.rendered && !me.editingPlugin.reconfiguring) {
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
        if (!this.editingPlugin.reconfiguring && !column.isGroupHeader) {
            column.getEditor().hide();
            this.repositionIfVisible();
        }
    },

    onColumnShow: function(column) {
        var me = this;

        if (me.rendered && !me.editingPlugin.reconfiguring && !column.isGroupHeader && column.getEditor) {
            column.getEditor().show();
            me.syncFieldWidth(column);
            if (!me.preventReposition) {
                this.repositionIfVisible();
            }
        }
    },

    onColumnMove: function(column, fromIdx, toIdx) {
        var me = this,
            locked = column.isLocked(),
            fieldContainer = locked ? me.lockedColumnContainer : me.normalColumnContainer,
            columns, i, len, after, offset;

        // If moving a group, move each leaf header
        if (column.isGroupHeader) {
            Ext.suspendLayouts();
            after = toIdx > fromIdx;
            offset = after ? 1 : 0;
            columns = column.getGridColumns();
            for (i = 0, len = columns.length; i < len; ++i) {    
                column = columns[i];
                toIdx = column.getIndex();
                if (after) {
                    ++offset;
                }
                me.setColumnEditor(column, toIdx + offset, fieldContainer);
            }
            Ext.resumeLayouts(true);
        } else {
            me.setColumnEditor(column, column.getIndex(), fieldContainer);
        }
    },

    setColumnEditor: function(column, idx, fieldContainer) {
        this.addFieldsForColumn(column);
        fieldContainer.insert(idx, column.getEditor());
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
        fieldContainer.insert(column.getIndex(), column.getEditor());
        me.needsSyncFieldWidths = true;
    },

    destroyColumnEditor: function(column) {
        var me = this,
            field,
            len, i;

        if (Ext.isArray(column)) {
            for (i = 0, len = column.length; i < len; i++) {
                me.removeColumnEditor(column[i]);
            }
            return;
        }

        if (column.hasEditor() && (field = column.getEditor())) {
            field.destroy();
        }
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
        if (c && (c === me || !c.el.isAncestor(view.el))) {
            return;
        }

        if (me.isVisible() && view.isVisible(true)) {
            me.reposition();
        }
    },

    // Because we implement getRefOwner to return the grid, this makes this a descendant of the grid and the layout system
    // does not queue an independent layout for this while it's a descendant of a component which itself is pending a layout.
    // This is floating and not a descendant of anything.
    isDescendantOf: function() {
        return false;
    },

    getRefOwner: function() {
        return this.editingPlugin.grid;
    },

    getRefItems: function(deep) {
        var me = this,
            result;

        if (me.lockable) {
            // refItems must include ALL children. Must include the two containers
            // because we don't know what is being searched for.
            result = [me.lockedColumnContainer];
            result.push.apply(result, me.lockedColumnContainer.getRefItems(deep));
            result.push(me.normalColumnContainer);
            result.push.apply(result, me.normalColumnContainer.getRefItems(deep));
        } else {
            result = me.callParent(arguments);
        }
        result.push.apply(result, me.getFloatingButtons().getRefItems(deep));
        return result;
    },

    reposition: function(animateConfig, fromScrollHandler) {
        var me = this,
            context = me.context,
            row = context && context.row,
            yOffset = 0,
            rowTop,
            localY,
            deltaY,
            afterPosition;

        // Position this editor if the context row is rendered (buffered rendering may mean that it's not in the DOM at all)
        if (row && Ext.isElement(row)) {

            deltaY = me.syncButtonPosition(me.getScrollDelta());

            if (!me.editingPlugin.grid.rowLines) { 
                // When the grid does not have rowLines we add a bottom border to the previous
                // row when the row is focused, but subtract the border width from the 
                // top padding to keep the row from changing size.  This adjusts the top offset
                // of the cell edtor to account for the added border.
                yOffset = -parseInt(Ext.fly(row).first().getStyle('border-bottom-width'), 10);
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
                };
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
            // In a locked grid, a RowEditor uses 2 inner containers, so need to use CQ to retrieve
            // configured editors which were stamped with the isEditorComponent property in Editing.createColumnField
            return me.query('[isEditorComponent]')[fieldInfo];
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
            field = column.getEditor(null, me.getDefaultFieldCfg());

            if (column.align === 'right') {
                field.fieldStyle = 'text-align:right';
            }

            if (column.xtype === 'actioncolumn') {
                field.fieldCls += ' ' + Ext.baseCSSPrefix + 'form-action-col-field';
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
    
    getDefaultFieldCfg: function() {
        return {
            xtype: 'displayfield',
            // Override Field's implementation so that the default display fields will not return values. This is done because
            // the display field will pick up column renderers from the grid.
            getModelData: function() {
                return null;
            }
        };
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

        // Because we suspend the events, none of the field events will get propagated to
        // the form, so the valid state won't be correct.
        if (form.hasInvalidField() === form.wasValid) {
            delete form.wasValid;
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
            colIdx,
            scope = column.usingDefaultRenderer && !column.scope ? column : column.scope;

        // honor our column's renderer (TemplateHeader sets renderer for us!)
        if (renderer) {
            metaData = { tdCls: '', style: '' };
            rowIdx = store.indexOf(record);
            colIdx = headerCt.getHeaderIndex(column);

            value = renderer.call(
                scope || headerCt.ownerCt,
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
                me.scrollingViewEl.scrollBy(0, scrollDelta, true);
            }
            me.showToolTip();
            return false;
        }
    },

    /**
     * Start editing the specified grid at the specified position.
     * @param {Ext.data.Model} record The Store data record which backs the row to be edited.
     * @param {Ext.data.Model} columnHeader The Column object defining the column to be focused
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
        
        // Select the record before showing the editor, since
        // selecting will steal focus
        context.grid.getSelectionModel().select(record);

        if (me.isVisible()) {
            me.reposition(true);
        } else {
            me.show();
        }

        // Make sure the container el is correctly sized.
        me.onGridResize();

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
            scrollingView = me.scrollingView,
            scrollingViewElDom = scrollingView.el.dom,
            overflow = me.getScrollDelta() - (scrollingViewElDom.scrollHeight -
                scrollingView.getScrollY() - me.scrollingViewEl.dom.clientHeight);

        if (overflow > 0) {
            if (!me._buttonsOnTop) {
                floatingButtons.setButtonPosition('top');
                me._buttonsOnTop = true;
            }
            scrollDelta = 0;
        } else if (me._buttonsOnTop !== false) {
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
        var column = this.context.column,
            field;
        
        if (!column.isDestroyed) {   
            field = this.getEditor(column);
            if (field && field.focus) {
                field.focus();
            }
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
        if (me.needsSyncFieldWidths) {
            me.suspendLayouts();
            me.syncAllFieldWidths();
            me.resumeLayouts(true);
        }
        delete me.needsSyncFieldWidths;

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
        return '<li class="' + this.errorCls + '">' + e + '</li>';
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
            Ext.isIE8 ? 'rect(-1000px auto 1000px auto)' : 'auto'
        );
    }
});
