/**
 * Demonstrates a simple toolbar. Some of the buttons have menus attached.
 */
Ext.define('KitchenSink.view.toolbar.BasicToolbar', {
    extend: 'Ext.panel.Panel',
    xtype: 'basic-toolbar',
    id: 'basic-toolbar',
    //<example>
    exampleTitle: 'Basic Toolbar',
    themes: {
        classic: {
            width: 380,
            pasteIconCls: 'paste',
            cutIconCls: 'cut',
            copyIconCls: 'copy',
            formatIconCls: 'format',
            listIconCls: 'list'
        },
        neptune: {
            width: 500,
            pasteGlyph: 70,
            cutGlyph: 67,
            copyGlyph: 102,
            formatGlyph: 76,
            listGlyph: 61
        },
        'neptune-touch': {
            width: 620
        }
    },
    //</example>

    height: 400,

    html: KitchenSink.DummyText.longText,
    bodyPadding: 20,

    initComponent: function() {
        this.width = this.themeInfo.width;

        this.tbar = [{
            xtype:'splitbutton',
            text:'Menu Button',
            iconCls: this.themeInfo.listIconCls,
            glyph: this.themeInfo.listGlyph,
            menu:[{
                text:'Menu Button 1'
            }]
        }, '-', {
            xtype:'splitbutton',
            text:'Cut',
            iconCls: this.themeInfo.cutIconCls,
            glyph: this.themeInfo.cutGlyph,
            menu: [{
                text:'Cut Menu Item'
            }]
        }, {
            iconCls: this.themeInfo.copyIconCls,
            glyph: this.themeInfo.copyGlyph,
            text:'Copy'
        }, {
            text:'Paste',
            iconCls: this.themeInfo.pasteIconCls,
            glyph: this.themeInfo.pasteGlyph,
            menu:[{
                text:'Paste Menu Item'
            }]
        }, '-', {
            iconCls: this.themeInfo.formatIconCls,
            glyph: this.themeInfo.formatGlyph,
            text:'Format'
        }]
        this.callParent();
    }
});