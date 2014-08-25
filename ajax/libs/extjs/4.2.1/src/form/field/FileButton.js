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
 *
 */
Ext.define('Ext.form.field.FileButton', {
    extend: 'Ext.button.Button',
    alias: 'widget.filebutton',
    
    childEls: [
        'btnEl', 'btnWrap', 'btnInnerEl', 'btnIconEl', 'fileInputEl'
    ],
    
    inputCls: Ext.baseCSSPrefix + 'form-file-input',
    
    cls: Ext.baseCSSPrefix + 'form-file-btn',
    
    preventDefault: false,

    renderTpl: [
        '<span id="{id}-btnWrap" class="{baseCls}-wrap',
            '<tpl if="splitCls"> {splitCls}</tpl>',
            '{childElCls}" unselectable="on">',
            '<span id="{id}-btnEl" class="{baseCls}-button">',
                '<span id="{id}-btnInnerEl" class="{baseCls}-inner {innerCls}',
                    '{childElCls}" unselectable="on">',
                    '{text}',
                '</span>',
                '<span role="img" id="{id}-btnIconEl" class="{baseCls}-icon-el {iconCls}',
                    '{childElCls} {glyphCls}" unselectable="on" style="',
                    '<tpl if="iconUrl">background-image:url({iconUrl});</tpl>',
                    '<tpl if="glyph && glyphFontFamily">font-family:{glyphFontFamily};</tpl>">',
                    '<tpl if="glyph">&#{glyph};</tpl><tpl if="iconCls || iconUrl">&#160;</tpl>',
                '</span>',
            '</span>',
        '</span>',
        '<input id="{id}-fileInputEl" class="{childElCls} {inputCls}" type="file" size="1" name="{inputName}">'
    ],
    
    getTemplateArgs: function(){
        var args = this.callParent();
        args.inputCls = this.inputCls;
        args.inputName = this.inputName;
        return args;
    },
    
    afterRender: function(){
        var me = this;
        me.callParent(arguments);
        me.fileInputEl.on('change', me.fireChange, me);    
    },
    
    fireChange: function(e){
        this.fireEvent('change', this, e, this.fileInputEl.dom.value);
    },
    
    /**
     * @private
     * Creates the file input element. It is inserted into the trigger button component, made
     * invisible, and floated on top of the button's other content so that it will receive the
     * button's clicks.
     */
    createFileInput : function(isTemporary) {
        var me = this;
        me.fileInputEl = me.el.createChild({
            name: me.inputName,
            id: !isTemporary ? me.id + '-fileInputEl' : undefined,
            cls: me.inputCls,
            tag: 'input',
            type: 'file',
            size: 1
        });
        me.fileInputEl.on('change', me.fireChange, me);  
    },
    
    reset: function(remove){
        if (remove) {
            this.fileInputEl.remove();
        }
        this.createFileInput(!remove);
    },
    
    restoreInput: function(el){
        this.fileInputEl.remove();
        el = Ext.get(el);
        this.el.appendChild(el);
        this.fileInputEl = el;
    },
    
    onDisable: function(){
        this.callParent();
        this.fileInputEl.dom.disabled = true;
    },

    onEnable : function() {
        this.callParent();
        this.fileInputEl.dom.disabled = false;
    }
});
