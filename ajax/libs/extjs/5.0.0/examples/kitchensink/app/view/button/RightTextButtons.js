/**
 * This example shows how to align button text to the right. By default, buttons are sized
 * to the width of the text inside them, but this behavior can be overridden by giving the
 * button a fixed width. In such a case the alignment of the text can be controlled using
 * the `textAlign` config.
 */
Ext.define('KitchenSink.view.button.RightTextButtons', {
    extend: 'Ext.Container',
    xtype: 'right-text-buttons',
    layout: 'vbox',
    //<example>
    themes: {
        classic: {
            iconSmall: 'resources/images/icons/add16.gif',
            iconMedium: 'resources/images/icons/add24.gif',
            iconLarge: 'resources/images/icons/add.gif'
        },
        neptune: {
            glyph: 72
        }
    },
    //</example>

    initComponent: function() {
        Ext.apply(this, {
            width: 680,
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
                    width: 150,
                    textAlign: 'right'
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
