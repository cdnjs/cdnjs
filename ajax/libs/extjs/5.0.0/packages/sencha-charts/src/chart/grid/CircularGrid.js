/**
 * @class Ext.chart.grid.CircularGrid
 * @extends Ext.draw.sprite.Circle
 * 
 * Circular Grid sprite. Used by Radar chart to render a series of concentric circles.
 */
Ext.define('Ext.chart.grid.CircularGrid', {
    extend: 'Ext.draw.sprite.Circle',
    alias: 'grid.circular',
    
    inheritableStatics: {
        def: {
            defaults: {
                r: 1,
                strokeStyle: '#DDD'
            }
        }
    }
});