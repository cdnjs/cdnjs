/**
 * This example shows how to create split buttons with the dropdown arrow on the bottom.
 * The position of the arrow can be controlled using the `arrowAlign` config.
 */
Ext.define('KitchenSink.view.button.SplitBottomButtons', {
    extend: 'Ext.Container',
    xtype: 'split-bottom-buttons',
    layout: 'vbox',
    //<example>
    themes: {
        classic: {
            width: 420,
            iconSmall: 'resources/images/icons/add16.gif',
            iconMedium: 'resources/images/icons/add24.gif',
            iconLarge: 'resources/images/icons/add.gif'
        },
        neptune: {
            width: 475,
            glyph: 72
        },
        'neptune-touch': {
            width: 585
        }
    },
    //</example>

    initComponent: function() {
        Ext.apply(this, {
            width: this.themeInfo.width,
            items: [{
                xtype: 'checkbox',
                boxLabel: 'disabled',
                margin: '0 0 0 10',
                listeners: {
                    change: this.toggleDisabled,
                    scope: this
                }
            }, {
                xtype: 'container',
                layout: {
                    type: 'table',
                    columns: 4,
                    tdAttrs: { style: 'padding: 5px 10px;' }
                },
                defaults: {
                    arrowAlign: 'bottom',
                    menu: [{
                        text:'Menu Item 1'
                    },{
                        text:'Menu Item 2'
                    },{
                        text:'Menu Item 3'
                    }]
                },
               
                items: [{
                    xtype: 'component',
                    html: 'Text Only'
                }, {
                    xtype: 'splitbutton',
                    text: 'Small'
                }, {
                    xtype: 'splitbutton',
                    text: 'Medium',
                    scale: 'medium'
                }, {
                    xtype: 'splitbutton',
                    text: 'Large',
                    scale: 'large'
                }, {
                    xtype: 'component',
                    html: 'Icon Only'
                }, {
                    icon: this.themeInfo.iconSmall,
                    glyph: this.themeInfo.glyph,
                    xtype: 'splitbutton'
                }, {
                    xtype: 'splitbutton',
                    icon: this.themeInfo.iconMedium,
                    glyph: this.themeInfo.glyph,
                    scale: 'medium'
                }, {
                    xtype: 'splitbutton',
                    icon: this.themeInfo.iconLarge,
                    glyph: this.themeInfo.glyph,
                    scale: 'large'
                }, {
                    xtype: 'component',
                    html: 'Icon and Text (left)'
                }, {
                    xtype: 'splitbutton',
                    icon: this.themeInfo.iconSmall,
                    glyph: this.themeInfo.glyph,
                    text: 'Small'
                }, {
                    xtype: 'splitbutton',
                    icon: this.themeInfo.iconMedium,
                    glyph: this.themeInfo.glyph,
                    text: 'Medium',
                    scale: 'medium'
                }, {
                    xtype: 'splitbutton',
                    icon: this.themeInfo.iconLarge,
                    glyph: this.themeInfo.glyph,
                    text: 'Large',
                    scale: 'large'
                }, {
                    xtype: 'component',
                    html: 'Icon and Text (top)'
                }, {
                    xtype: 'splitbutton',
                    icon: this.themeInfo.iconSmall,
                    glyph: this.themeInfo.glyph,
                    text: 'Small',
                    iconAlign: 'top'
                }, {
                    xtype: 'splitbutton',
                    icon: this.themeInfo.iconMedium,
                    glyph: this.themeInfo.glyph,
                    text: 'Medium',
                    scale: 'medium',
                    iconAlign: 'top'
                }, {
                    xtype: 'splitbutton',
                    icon: this.themeInfo.iconLarge,
                    glyph: this.themeInfo.glyph,
                    text: 'Large',
                    scale: 'large',
                    iconAlign: 'top'
                }, {
                    xtype: 'component',
                    html: 'Icon and Text (right)'
                }, {
                    xtype: 'splitbutton',
                    icon: this.themeInfo.iconSmall,
                    glyph: this.themeInfo.glyph,
                    text: 'Small',
                    iconAlign: 'right'
                }, {
                    xtype: 'splitbutton',
                    icon: this.themeInfo.iconMedium,
                    glyph: this.themeInfo.glyph,
                    text: 'Medium',
                    scale: 'medium',
                    iconAlign: 'right'
                }, {
                    xtype: 'splitbutton',
                    icon: this.themeInfo.iconLarge,
                    glyph: this.themeInfo.glyph,
                    text: 'Large',
                    scale: 'large',
                    iconAlign: 'right'
                }, {
                    xtype: 'component',
                    html: 'Icon and Text (bottom)'
                }, {
                    xtype: 'splitbutton',
                    icon: this.themeInfo.iconSmall,
                    glyph: this.themeInfo.glyph,
                    text: 'Small',
                    iconAlign: 'bottom'
                }, {
                    xtype: 'splitbutton',
                    icon: this.themeInfo.iconMedium,
                    glyph: this.themeInfo.glyph,
                    text: 'Medium',
                    scale: 'medium',
                    iconAlign: 'bottom'
                }, {
                    xtype: 'splitbutton',
                    icon: this.themeInfo.iconLarge,
                    glyph: this.themeInfo.glyph,
                    text: 'Large',
                    scale: 'large',
                    iconAlign: 'bottom'
                }]
            }]
        });
        this.callParent();
    },

    toggleDisabled: function(checkbox, newValue, oldValue) {
        var toggleFn = newValue ? 'disable' : 'enable';

        Ext.each(this.query('button'), function(item) {
            item[toggleFn]();
        });
    }

});
