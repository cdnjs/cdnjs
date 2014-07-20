Ext.define('ChartsKitchenSink.view.charts.draw.RotateText', {
    extend: 'Ext.panel.Panel',
    xtype: 'rotatetext-draw',
    title: 'Rotate Text',
    
    requires: [
        'Ext.slider.Single',
        'Ext.draw.Text'
    ],
    
    // <example>
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    
    exampleDescription: [
        'This example showcases using the Ext.draw.Text components to create text sprites that can be rotated to any angle.'
    ],
    // </example>
    
    height: 400,
    defaultType: 'text',
    defaults: {
        flex: 1,
        viewBox: true,
        padding: 40,
        listeners: {
            resize: 'onSpriteResize',
            scope: 'this'
        },
        textStyle: {
            fill: '#000',
            'font-size': '18px',
            'font-family': 'Arial'
        },
        onSpriteResize: function(text, width, height) {
            var sprite, bbox;

            sprite = text.surface.items.getAt(0);
            bbox   = sprite.getBBox();

            sprite.setAttributes({
                translate: {
                    x: (width - bbox.width) / 2 - bbox.x,
                    y: (height - bbox.height) / 2 - bbox.y
                }
            }, true);
        }
    },
    
    tbar: {
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        
        items: [{
            xtype: 'slider',
        
            minValue: 0,
            maxValue: 360,
            value: 315,
        
            listeners: {
                change: function(slider, value) {
                    var sprite = slider.up('panel').down('#snappy');
                    
                    sprite.setAngle(value);
                }
            }
        }]
    },
    
    items: [{
        degrees: 45,
        text: 'With Ext JS Drawing'
    }, {
        degrees: 90,
        text: 'Creating a rotated Text component'
    }, {
        itemId: 'snappy',
        degrees: 315,
        viewBox: false,
        autoSize: false,
        padding: 0,
        text: 'Is a snap!'
    }]

});
