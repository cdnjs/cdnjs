/**
 * A special Ext.dom.Element used by Buttons.  Since buttons use `display:table` elements
 * for their layout, some special adjustments are needed when the width switches from
 * auto to fixed width and back.
 *
 * When the button has a width other than `auto`, and a right-aligned arrow, long button
 * text will cause the arrow to disappear off the right edge of the button if the btnWrap
 * element has table-layout:auto.  To prevent this, we need to set table-layout:fixed
 * on the btnWrap when the button has a width, however, when the button is shrinkwrap
 * width the btnWrap cannot have table-layout:fixed because its width:100% style will
 * cause the button to expand outward.
 *
 * Additionally, in shrinkWrap height mode, the button css sets a height on the btnEl
 * element, but if the height is being stretched, the btnEl's height will cause the contents
 * to be incorrectly vertically centered, so we dynamically set the btnEl's height to
 * "auto" in fixed-height mode.
 *
 * @private
 */
Ext.define('Ext.dom.ButtonElement', {
    extend: 'Ext.dom.Element',

    setSize: function(width, height, animate) {
        var me = this,
            component = me.component;

        me.callParent([width, height, animate]);

        component.btnWrap.setStyle(
            'table-layout',
            (!width || width === 'auto') ? '' : 'fixed'
        );

        component.btnEl.setStyle(
            'height',
            (!height || height === 'auto') ? '' : 'auto'
        );

        return me;
    },

    setStyle: function(prop, value) {
        var me = this,
            component = me.component,
            width, height;

        me.callParent([prop, value]);

        if (prop) {
            if (prop === 'width' || (typeof prop !== 'string' && 'width' in prop)) {
                width = value || prop.width;
                component.btnWrap.setStyle(
                    'table-layout',
                    (!width || width === 'auto') ? '' : 'fixed'
                );
            }

            if (prop === 'height' || (typeof prop !== 'string' && 'height' in prop)) {
                height = value || prop.height;

                component.btnEl.setStyle(
                    'height',
                    (!height || height === 'auto') ? '' : 'auto'
                );
            }
        }
        
        return me;
    },

    setHeight: function(height, animate) {
        this.callParent([height, animate]);

        this.component.btnEl.setStyle(
            'height',
            (!height || height === 'auto') ? '' : 'auto'
        );

        return this;
    },

    setWidth: function(width, animate) {
        this.callParent([width, animate]);

        this.component.btnWrap.setStyle(
            'table-layout',
            (!width || width === 'auto') ? '' : 'fixed'
        );

        return this;
    }
});