/**
 * @class Ext.draw.sprite.Sector
 * @extends Ext.draw.sprite.Path
 * 
 * A sprite representing a pie slice.
 */
Ext.define('Ext.draw.sprite.Sector', {
    extend: 'Ext.draw.sprite.Path',
    alias: 'sprite.sector',
    type: 'sector',
    inheritableStatics: {
        def: {
            processors: {
                /**
                 * @cfg {Number} [centerX=0] The center coordinate of the sprite on the x-axis.
                 */
                centerX: 'number',

                /**
                 * @cfg {Number} [centerY=0] The center coordinate of the sprite on the y-axis.
                 */
                centerY: 'number',

                /**
                 * @cfg {Number} [startAngle=0] The starting angle of the sprite.
                 */
                startAngle: 'number',

                /**
                 * @cfg {Number} [endAngle=0] The ending angle of the sprite.
                 */
                endAngle: 'number',

                /**
                 * @cfg {Number} [startRho=0] The starting point of the radius of the sprite.
                 */
                startRho: 'number',

                /**
                 * @cfg {Number} [endRho=150] The ending point of the radius of the sprite.
                 */
                endRho: 'number',

                /**
                 * @cfg {Number} [margin=0] The margin of the sprite from the center of pie.
                 */
                margin: 'number'
            },
            aliases: {
                rho: 'endRho'
            },
            dirtyTriggers: {
                centerX: 'path,bbox',
                centerY: 'path,bbox',
                startAngle: 'path,bbox',
                endAngle: 'path,bbox',
                startRho: 'path,bbox',
                endRho: 'path,bbox',
                margin: 'path,bbox'
            },
            defaults: {
                centerX: 0,
                centerY: 0,
                startAngle: 0,
                endAngle: 0,
                startRho: 0,
                endRho: 150,
                margin: 0,
                path: 'M 0,0'
            }
        }
    },

    updatePath: function (path, attr) {
        var startAngle = Math.min(attr.startAngle, attr.endAngle),
            endAngle = Math.max(attr.startAngle, attr.endAngle),
            midAngle = (startAngle + endAngle) * 0.5,
            margin = attr.margin,
            centerX = attr.centerX,
            centerY = attr.centerY,
            startRho = Math.min(attr.startRho, attr.endRho),
            endRho = Math.max(attr.startRho, attr.endRho);

        if (margin) {
            centerX += margin * Math.cos(midAngle);
            centerY += margin * Math.sin(midAngle);
        }
        path.moveTo(centerX + startRho * Math.cos(startAngle), centerY + startRho * Math.sin(startAngle));
        path.lineTo(centerX + endRho * Math.cos(startAngle), centerY + endRho * Math.sin(startAngle));
        path.arc(centerX, centerY, endRho, startAngle, endAngle, false);
        path.lineTo(centerX + startRho * Math.cos(endAngle), centerY + startRho * Math.sin(endAngle));
        path.arc(centerX, centerY, startRho, endAngle, startAngle, true);
    }
});