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
 * Layout class for {@link Ext.form.field.TextArea} fields. Handles sizing the textarea field.
 * @private
 */
Ext.define('Ext.layout.component.field.TextArea', {
    extend: 'Ext.layout.component.field.Text',
    alias: 'layout.textareafield',

    type: 'textareafield',
    
    canGrowWidth: false,
    
    naturalSizingProp: 'cols',
    
    beginLayout: function(ownerContext){
        this.callParent(arguments);
        ownerContext.target.inputEl.setStyle('height', '');
    },

    measureContentHeight: function (ownerContext) {
        var me = this,
            owner = me.owner,
            height = me.callParent(arguments),
            inputContext, inputEl, value, max, curWidth, calcHeight;

        if (owner.grow && !ownerContext.state.growHandled) {
            inputContext = ownerContext.inputContext;
            inputEl = owner.inputEl;
            curWidth = inputEl.getWidth(true); //subtract border/padding to get the available width for the text

            // Get and normalize the field value for measurement
            value = Ext.util.Format.htmlEncode(inputEl.dom.value) || '&#160;';
            value += owner.growAppend;
            
            // Translate newlines to <br> tags
            value = value.replace(/\n/g, '<br/>');

            // Find the height that contains the whole text value
            calcHeight = Ext.util.TextMetrics.measure(inputEl, value, curWidth).height +
                         inputContext.getBorderInfo().height + inputContext.getPaddingInfo().height;

            // Constrain
            calcHeight = Ext.Number.constrain(calcHeight, owner.growMin, owner.growMax);
            inputContext.setHeight(calcHeight);
            ownerContext.state.growHandled = true;
            
            // Now that we've set the inputContext, we need to recalculate the width
            inputContext.domBlock(me, 'height');
            height = NaN;
        }
        return height;
    }
});
