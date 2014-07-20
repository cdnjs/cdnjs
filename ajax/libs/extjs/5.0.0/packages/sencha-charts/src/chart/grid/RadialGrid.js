/**
 * @class Ext.chart.grid.RadialGrid
 * @extends Ext.draw.sprite.Path
 * 
 * Radial Grid sprite. Used by Radar chart to render a series of radial lines.
 * Represents the scale of the radar chart on the yField.
 */
Ext.define('Ext.chart.grid.RadialGrid', {
    extend: 'Ext.draw.sprite.Path',
    alias: 'grid.radial',

    inheritableStatics: {
        def: {
            processors: {
                startRadius: 'number',
                endRadius: 'number'
            },

            defaults: {
                startRadius: 0,
                endRadius: 1,
                scalingCenterX: 0,
                scalingCenterY: 0,
                strokeStyle: '#DDD'
            },

            dirtyTriggers: {
                startRadius: 'path,bbox',
                endRadius: 'path,bbox'
            }
        }
    },

    render: function () {
        this.callParent(arguments);
    },

    updatePath: function (path, attr) {
        var startRadius = attr.startRadius,
            endRadius = attr.endRadius;
        path.moveTo(startRadius, 0);
        path.lineTo(endRadius, 0);
    }
});