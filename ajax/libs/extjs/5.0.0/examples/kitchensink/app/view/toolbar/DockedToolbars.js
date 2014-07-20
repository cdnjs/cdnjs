/**
 * Demonstrates a the docking of toolbars in each dimension on a panel.
 */
Ext.define('KitchenSink.view.toolbar.DockedToolbars', {
    extend: 'Ext.container.Container',
    xtype: 'docked-toolbars',
    id: 'docked-toolbars',
    
    //<example>
    exampleTitle: 'Docked Toolbars',
    themes: {
        classic: {
            listCls: 'list',
            closeCls: 'close',
            pasteCls: 'paste',
            editCls: 'edit'
        },
        neptune: {
            listGlyph: 61,
            closeGlyph: 88,
            pasteGlyph: 70,
            editGlyph: 47
        }
    },
    //</example>
    layout: {
        type: 'table',
        columns: 2,
        tdAttrs: { style: 'padding: 10px;' }
    },

    defaults: {
        xtype: 'panel',
        height: 220,
        width: 220,
        bodyPadding: 10
    },
    width: 480,

    initComponent: function() {
        this.items = [
            {
                title: 'Top',
                xtype: 'panel',
                dockedItems: [{
                    dock: 'top',
                    xtype: 'toolbar',
                    items: [{
                        iconCls: this.themeInfo.listCls,
                        glyph: this.themeInfo.listGlyph,
                        xtype: 'button'
                    }, '-', {
                        iconCls: this.themeInfo.closeCls,
                        glyph: this.themeInfo.closeGlyph,
                        xtype: 'button'
                    }, {
                        iconCls: this.themeInfo.pasteCls,
                        glyph: this.themeInfo.pasteGlyph,
                        xtype: 'button'
                    }, '-', {
                        iconCls: this.themeInfo.editCls,
                        glyph: this.themeInfo.editGlyph,
                        xtype: 'button'
                    }]
                }],
                html: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            },
            {
                title: 'Right',
                xtype: 'panel',
                dockedItems: [{
                    dock: 'right',
                    xtype: 'toolbar',
                    items: [{
                        iconCls: this.themeInfo.listCls,
                        glyph: this.themeInfo.listGlyph,
                        xtype: 'button'
                    }, '-', {
                        iconCls: this.themeInfo.closeCls,
                        glyph: this.themeInfo.closeGlyph,
                        xtype: 'button'
                    }, {
                        iconCls: this.themeInfo.pasteCls,
                        glyph: this.themeInfo.pasteGlyph,
                        xtype: 'button'
                    }, '-', {
                        iconCls: this.themeInfo.editCls,
                        glyph: this.themeInfo.editGlyph,
                        xtype: 'button'
                    }]
                }],
                html: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            },
            {
                title: 'Left',
                xtype: 'panel',
                dockedItems: [{
                    dock: 'left',
                    xtype: 'toolbar',
                    items: [{
                        iconCls: this.themeInfo.listCls,
                        glyph: this.themeInfo.listGlyph,
                        xtype: 'button'
                    }, '-', {
                        iconCls: this.themeInfo.closeCls,
                        glyph: this.themeInfo.closeGlyph,
                        xtype: 'button'
                    }, {
                        iconCls: this.themeInfo.pasteCls,
                        glyph: this.themeInfo.pasteGlyph,
                        xtype: 'button'
                    }, '-', {
                        iconCls: this.themeInfo.editCls,
                        glyph: this.themeInfo.editGlyph,
                        xtype: 'button'
                    }]
                }],
                html: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            },
            {
                title: 'Bottom',
                xtype: 'panel',
                dockedItems: [{
                    dock: 'bottom',
                    xtype: 'toolbar',
                    items: [{
                        iconCls: this.themeInfo.listCls,
                        glyph: this.themeInfo.listGlyph,
                        xtype: 'button'
                    }, '-', {
                        iconCls: this.themeInfo.closeCls,
                        glyph: this.themeInfo.closeGlyph,
                        xtype: 'button'
                    }, {
                        iconCls: this.themeInfo.pasteCls,
                        glyph: this.themeInfo.pasteGlyph,
                        xtype: 'button'
                    }, '-', {
                        iconCls: this.themeInfo.editCls,
                        glyph: this.themeInfo.editGlyph,
                        xtype: 'button'
                    }]
                }],
                html: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            }
        ];

        this.callParent();
    }
});