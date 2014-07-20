/*
 * Shows how a Slider widget can be used with a ViewModel.
 */
Ext.define('KitchenSink.view.binding.SliderWidget', {
    extend: 'Ext.panel.Panel',
    
    requires: [
        'Ext.slider.Widget'
    ],
    xtype: 'binding-slider-form',
    
    //<example>
    exampleTitle: 'Slider and Form Fields',
    themes: {
        classic: {
            height: 150,
            labelWidth: 125
        },
        neptune: {
            height: 165,
            labelWidth: 125
        },
        'neptune-touch': {
            height: 220,
            labelWidth: 150
        }
    },
    //</example>
    
    width: 400,
    title: 'Color Components',
    bodyPadding: 10,

    viewModel: {
        data: {
            red: 255,
            green: 100,
            blue: 150
        }
    },

    layout: 'anchor',
    defaultType: 'fieldcontainer',
    defaults: {
        anchor: '0',
        labelWidth: 60,
        layout: {
            type: 'hbox',
            align: 'center'
        }
    },

    items: [{
        fieldLabel: 'Red',
        defaults: {
            maxValue: 255
        },
        items: [
            { xtype: 'numberfield', width: 100, bind: '{red}', margin: '0 10 0 0' },
            { xtype: 'sliderwidget', flex: 1, bind: '{red}' }
        ]
    },{
        fieldLabel: 'Green',
        defaults: {
            maxValue: 255
        },
        items: [
            { xtype: 'numberfield', width: 100, bind: '{green}', margin: '0 10 0 0' },
            { xtype: 'sliderwidget', flex: 1, bind: '{green}' }
        ]
    },{
        fieldLabel: 'Blue',
        defaults: {
            maxValue: 255
        },
        items: [
            { xtype: 'numberfield', width: 100, bind: '{blue}', margin: '0 10 0 0' },
            { xtype: 'sliderwidget', flex: 1, bind: '{blue}' }
        ]
    }, {
        xtype: 'component',
        height: 100,
        bind: {
            style: {
                backgroundColor: '#{red:hex(2)}{green:hex(2)}{blue:hex(2)}'
            }
        }
    }]
});
