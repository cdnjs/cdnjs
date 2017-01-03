Ext.define('Ext.ux.dd.PanelFieldDragZone', {

    extend: 'Ext.dd.DragZone',

    constructor: function(cfg){
        cfg = cfg || {};
        if (cfg.ddGroup) {
            this.ddGroup = cfg.ddGroup;
        }
    },

//  Call the DRagZone's constructor. The Panel must have been rendered.
    init: function(panel) {
        // Panel is an HtmlElement
        if (panel.nodeType) {
            // Called via dragzone::init
            Ext.ux.dd.PanelFieldDragZone.superclass.init.apply(this, arguments);
        }
        // Panel is a Component - need the el
        else {
            // Called via plugin::init
            if (panel.rendered) {
                Ext.ux.dd.PanelFieldDragZone.superclass.constructor.call(this, panel.getEl());
            } else {
                panel.on('afterrender', this.init, this, {single: true});
            }
        }
    },

    scroll: false,

//  On mousedown, we ascertain whether it is on one of our draggable Fields.
//  If so, we collect data about the draggable object, and return a drag data
//  object which contains our own data, plus a "ddel" property which is a DOM
//  node which provides a "view" of the dragged data.
    getDragData: function(e) {
        var targetLabel = e.getTarget('label', null, true),
            oldMark,
            field,
            dragEl;

        if (targetLabel) {

            // Get the data we are dragging: the Field
            // create a ddel for the drag proxy to display
            field = Ext.getCmp(targetLabel.up('.' + Ext.form.Labelable.prototype.formItemCls).id);
            // Temporary prevent marking the field as invalid, since it causes changes
            // to the underlying dom element which can cause problems in IE
            oldMark = field.preventMark;
            field.preventMark = true;
            if (field.isValid()) {
                field.preventMark = oldMark;
                dragEl = document.createElement('div');
                dragEl.className = 'x-form-text';
                dragEl.appendChild(document.createTextNode(field.getRawValue()));
                Ext.fly(dragEl).setWidth(field.getEl().getWidth());
                return {
                    field: field,
                    ddel: dragEl
                };
            } else {
                e.stopEvent();
            }
            field.preventMark = oldMark;
        }
    },

//  The coordinates to slide the drag proxy back to on failed drop.
    getRepairXY: function() {
        return this.dragData.field.getEl().getXY();
    }
});