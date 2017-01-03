/**
 * @private
 */
Ext.define('Ext.layout.component.ProgressBar', {

    /* Begin Definitions */

    alias: ['layout.progressbar'],

    extend: 'Ext.layout.component.Auto',

    /* End Definitions */

    type: 'progressbar',

    beginLayout: function (ownerContext) {
        var me = this,
            i, textEls;

        me.callParent(arguments);

        if (!ownerContext.textEls) {
            textEls = me.owner.textEl; // an Ext.Element or CompositeList (raw DOM el's)

            if (textEls.isComposite) {
                ownerContext.textEls = [];
                textEls = textEls.elements;
                for (i = textEls.length; i--; ) {
                    ownerContext.textEls[i] = ownerContext.getEl(Ext.get(textEls[i]));
                }
            } else {
                ownerContext.textEls = [ ownerContext.getEl('textEl') ];
            }
        }
    },

    calculate: function(ownerContext) {
        var me = this,
            i, textEls, width;

        me.callParent(arguments);

        if (Ext.isNumber(width = ownerContext.getProp('width'))) {
            width -= ownerContext.getBorderInfo().width;
            textEls = ownerContext.textEls;

            for (i = textEls.length; i--; ) {
                textEls[i].setWidth(width);
            }
        } else {
            me.done = false;
        }
    }
});
