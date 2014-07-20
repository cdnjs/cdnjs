/**
 * This example shows how to create menu buttons. Menu buttons have a dropdown arrow
 * and display a menu when clicked.  A standard button can be turned into a menu button
 * simply by adding the `menu` config.
 */
Ext.define('KitchenSink.view.button.MenuButtons', {
    extend: 'Ext.Container',
    xtype: 'menu-buttons',
    layout: 'vbox',
    //<example>
    themes: {
        classic: {
            width: 470,
            iconSmall: 'resources/images/icons/add16.gif',
            iconMedium: 'resources/images/icons/add24.gif',
            iconLarge: 'resources/images/icons/add.gif'
        },
        neptune: {
            width: 570,
            glyph: 72
        },
        'neptune-touch': {
            width: 670
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
                    xtype: 'button',
                    text: 'Small'
                }, {
                    xtype: 'button',
                    text: 'Medium',
                    scale: 'medium'
                }, {
                    xtype: 'button',
                    text: 'Large',
                    scale: 'large'
                }, {
                    xtype: 'component',
                    html: 'Icon Only'
                }, {
                    icon: this.themeInfo.iconSmall,
                    glyph: this.themeInfo.glyph,
                    xtype: 'button'
                }, {
                    xtype: 'button',
                    icon: this.themeInfo.iconMedium,
                    glyph: this.themeInfo.glyph,
                    scale: 'medium'
                }, {
                    xtype: 'button',
                    icon: this.themeInfo.iconLarge,
                    glyph: this.themeInfo.glyph,
                    scale: 'large'
                }, {
                    xtype: 'component',
                    html: 'Icon and Text (left)'
                }, {
                    xtype: 'button',
                    icon: this.themeInfo.iconSmall,
                    glyph: this.themeInfo.glyph,
                    text: 'Small'
                }, {
                    xtype: 'button',
                    icon: this.themeInfo.iconMedium,
                    glyph: this.themeInfo.glyph,
                    text: 'Medium',
                    scale: 'medium'
                }, {
                    xtype: 'button',
                    icon: this.themeInfo.iconLarge,
                    glyph: this.themeInfo.glyph,
                    text: 'Large',
                    scale: 'large'
                }, {
                    xtype: 'component',
                    html: 'Icon and Text (top)'
                }, {
                    xtype: 'button',
                    icon: this.themeInfo.iconSmall,
                    glyph: this.themeInfo.glyph,
                    text: 'Small',
                    iconAlign: 'top'
                }, {
                    xtype: 'button',
                    icon: this.themeInfo.iconMedium,
                    glyph: this.themeInfo.glyph,
                    text: 'Medium',
                    scale: 'medium',
                    iconAlign: 'top'
                }, {
                    xtype: 'button',
                    icon: this.themeInfo.iconLarge,
                    glyph: this.themeInfo.glyph,
                    text: 'Large',
                    scale: 'large',
                    iconAlign: 'top'
                }, {
                    xtype: 'component',
                    html: 'Icon and Text (right)'
                }, {
                    xtype: 'button',
                    icon: this.themeInfo.iconSmall,
                    glyph: this.themeInfo.glyph,
                    text: 'Small',
                    iconAlign: 'right'
                }, {
                    xtype: 'button',
                    icon: this.themeInfo.iconMedium,
                    glyph: this.themeInfo.glyph,
                    text: 'Medium',
                    scale: 'medium',
                    iconAlign: 'right'
                }, {
                    xtype: 'button',
                    icon: this.themeInfo.iconLarge,
                    glyph: this.themeInfo.glyph,
                    text: 'Large',
                    scale: 'large',
                    iconAlign: 'right'
                }, {
                    xtype: 'component',
                    html: 'Icon and Text (bottom)'
                }, {
                    xtype: 'button',
                    icon: this.themeInfo.iconSmall,
                    glyph: this.themeInfo.glyph,
                    text: 'Small',
                    iconAlign: 'bottom'
                }, {
                    xtype: 'button',
                    icon: this.themeInfo.iconMedium,
                    glyph: this.themeInfo.glyph,
                    text: 'Medium',
                    scale: 'medium',
                    iconAlign: 'bottom'
                }, {
                    xtype: 'button',
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
