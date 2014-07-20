Ext.require('Ext.slider.*');

Ext.onReady(function(){

    Ext.create('Ext.slider.Single', {
        renderTo: 'basic-slider',
        width: 214,
        minValue: 0,
        hideLabel: true,
        useTips: false,
        maxValue: 100
    });

    Ext.create('Ext.slider.Single', {
        renderTo: 'increment-slider',
        hideLabel: true,
        useTips: false,
        width: 214,
        value:50,
        increment: 10,
        minValue: 0,
        maxValue: 100
    });

    // This Should allow values 65, 67, 69, 71, 73 and 75
    // The initial value of 66 should get normalized to 67
    // The max value of 74 will also be normalized to 75.
    Ext.create('Ext.slider.Single', {
        renderTo: 'increment-slider-minValue',
        hideLabel: true,
        width: 214,
        value: 66,
        increment: 2,
        minValue: 65,
        maxValue: 74
    });

    Ext.create('Ext.slider.Single', {
        renderTo: 'vertical-slider',
        hideLabel: true,
        useTips: false,
        height: 214,
        vertical: true,
        minValue: 0,
        maxValue: 100
    });

    Ext.create('Ext.slider.Single', {
        renderTo: 'tip-slider',
        hideLabel: true,
        width: 214,
        minValue: 0,
        maxValue: 100
    });

    Ext.create('Ext.slider.Single', {
        renderTo: 'custom-tip-slider',
        hideLabel: true,
        width: 214,
        increment: 10,
        minValue: 0,
        maxValue: 100,
        tipText: function(thumb){
            return Ext.String.format('<b>{0}% complete</b>', thumb.value);
        }
    });

    Ext.create('Ext.slider.Single', {
        renderTo: 'custom-slider',
        hideLabel: true,
        width: 214,
        increment: 10,
        minValue: 0,
        maxValue: 100
    });
    
    Ext.create('Ext.slider.Multi', {
        renderTo: 'multi-slider-horizontal',
        hideLabel: true,
        width: 214,
        minValue: 0,
        maxValue: 100,
        values: [10, 50, 90]
    });
    
    Ext.create('Ext.slider.Multi', {
        renderTo: 'multi-slider-vertical',
        hideLabel: true,
        vertical: true,
        height: 214,
        minValue: 0,
        maxValue: 100,
        values: [10, 50, 90]
    });
});
