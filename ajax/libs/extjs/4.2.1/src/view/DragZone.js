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
Ext.define('Ext.view.DragZone', {
    extend: 'Ext.dd.DragZone',
    containerScroll: false,

    constructor: function(config) {
        var me = this,
            view,
            ownerCt,
            el;

        Ext.apply(me, config);

        // Create a ddGroup unless one has been configured.
        // User configuration of ddGroups allows users to specify which
        // DD instances can interact with each other. Using one
        // based on the id of the View would isolate it and mean it can only
        // interact with a DropZone on the same View also using a generated ID.
        if (!me.ddGroup) {
            me.ddGroup = 'view-dd-zone-' + me.view.id;
        }

        // Ext.dd.DragDrop instances are keyed by the ID of their encapsulating element.
        // So a View's DragZone cannot use the View's main element because the DropZone must use that
        // because the DropZone may need to scroll on hover at a scrolling boundary, and it is the View's
        // main element which handles scrolling.
        // We use the View's parent element to drag from. Ideally, we would use the internal structure, but that
        // is transient; DataView's recreate the internal structure dynamically as data changes.
        // TODO: Ext 5.0 DragDrop must allow multiple DD objects to share the same element.
        view = me.view;
        ownerCt = view.ownerCt;
        // We don't just grab the parent el, since the parent el may be
        // some el injected by the layout
        if (ownerCt) {
            el = ownerCt.getTargetEl().dom;
        } else {
            el = view.el.dom.parentNode;
        }
        me.callParent([el]);

        me.ddel = Ext.get(document.createElement('div'));
        me.ddel.addCls(Ext.baseCSSPrefix + 'grid-dd-wrap');
    },

    init: function(id, sGroup, config) {
        this.initTarget(id, sGroup, config);
        this.view.mon(this.view, {
            itemmousedown: this.onItemMouseDown,
            scope: this
        });
    },

    onValidDrop: function(target, e, id) {
        this.callParent();
        // focus the view that the node was dropped onto so that keynav will be enabled.
        target.el.focus();
    },

    onItemMouseDown: function(view, record, item, index, e) {
        if (!this.isPreventDrag(e, record, item, index)) {
            // Since handleMouseDown prevents the default behavior of the event, which
            // is to focus the view, we focus the view now.  This ensures that the view
            // remains focused if the drag is cancelled, or if no drag occurs.
            if (view.focusRow) {
                view.focusRow(record);
            }
            this.handleMouseDown(e);
        }
    },

    // private template method
    isPreventDrag: function(e) {
        return false;
    },

    getDragData: function(e) {
        var view = this.view,
            item = e.getTarget(view.getItemSelector());

        if (item) {
            return {
                copy: view.copy || (view.allowCopy && e.ctrlKey),
                event: new Ext.EventObjectImpl(e),
                view: view,
                ddel: this.ddel,
                item: item,
                records: view.getSelectionModel().getSelection(),
                fromPosition: Ext.fly(item).getXY()
            };
        }
    },

    onInitDrag: function(x, y) {
        var me = this,
            data = me.dragData,
            view = data.view,
            selectionModel = view.getSelectionModel(),
            record = view.getRecord(data.item);

        // Update the selection to match what would have been selected if the user had
        // done a full click on the target node rather than starting a drag from it
        if (!selectionModel.isSelected(record)) {
            selectionModel.select(record, true);
        }
        data.records = selectionModel.getSelection();

        me.ddel.update(me.getDragText());
        me.proxy.update(me.ddel.dom);
        me.onStartDrag(x, y);
        return true;
    },

    getDragText: function() {
        var count = this.dragData.records.length;
        return Ext.String.format(this.dragText, count, count == 1 ? '' : 's');
    },

    getRepairXY : function(e, data){
        return data ? data.fromPosition : false;
    }
});