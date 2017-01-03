/**
 * @class Ext.chart.series.sprite.CandleStick
 * @extends Ext.chart.series.sprite.Aggregative
 * 
 * CandleStick series sprite.
 */
Ext.define('Ext.chart.series.sprite.CandleStick', {
    alias: 'sprite.candlestickSeries',
    extend: 'Ext.chart.series.sprite.Aggregative',
    inheritableStatics: {
        def: {
            processors: {
                raiseStyle: function (n, o) {
                    return Ext.merge({}, o || {}, n);
                },
                dropStyle: function (n, o) {
                    return Ext.merge({}, o || {}, n);
                },

                /**
                 * @cfg {Number} [barWidth=15] The bar width of the candles.
                 */
                barWidth: 'number',

                /**
                 * @cfg {Number} [padding=3] The amount of padding between candles.
                 */
                padding: 'number',

                /**
                 * @cfg {String} [ohlcType='candlestick'] Determines whether candlestick or ohlc is used.
                 */
                ohlcType: 'enums(candlestick,ohlc)'
            },
            defaults: {
                raiseStyle: {
                    strokeStyle: 'green',
                    fillStyle: 'green'
                },
                dropStyle: {
                    strokeStyle: 'red',
                    fillStyle: 'red'
                },
                planar: false,
                barWidth: 15,
                padding: 3,
                lineJoin: 'miter',
                miterLimit: 5,
                ohlcType: 'candlestick'
            },

            dirtyTriggers: {
                raiseStyle: 'raiseStyle',
                dropStyle: 'dropStyle'
            },

            updaters: {
                raiseStyle: function () {
                    this.raiseTemplate && this.raiseTemplate.setAttributes(this.attr.raiseStyle);
                },
                dropStyle: function () {
                    this.dropTemplate && this.dropTemplate.setAttributes(this.attr.dropStyle);
                }
            }
        }
    },

    candlestick: function (ctx, open, high, low, close, mid, halfWidth) {
        var minOC = Math.min(open, close),
            maxOC = Math.max(open, close);
        ctx.moveTo(mid, low);
        ctx.lineTo(mid, maxOC);

        ctx.moveTo(mid + halfWidth, maxOC);
        ctx.lineTo(mid + halfWidth, minOC);
        ctx.lineTo(mid - halfWidth, minOC);
        ctx.lineTo(mid - halfWidth, maxOC);
        ctx.closePath();

        ctx.moveTo(mid, high);
        ctx.lineTo(mid, minOC);
    },

    ohlc: function (ctx, open, high, low, close, mid, halfWidth) {
        ctx.moveTo(mid, high);
        ctx.lineTo(mid, low);
        ctx.moveTo(mid, open);
        ctx.lineTo(mid - halfWidth, open);
        ctx.moveTo(mid, close);
        ctx.lineTo(mid + halfWidth, close);
    },

    constructor: function () {
        this.callParent(arguments);
        this.raiseTemplate = new Ext.draw.sprite.Rect({parent: this});
        this.dropTemplate = new Ext.draw.sprite.Rect({parent: this});
    },

    getGapWidth: function () {
        var attr = this.attr,
            barWidth = attr.barWidth,
            padding = attr.padding;
        return barWidth + padding;
    },

    renderAggregates: function (aggregates, start, end, surface, ctx) {
        var me = this,
            attr = this.attr,
            dataX = attr.dataX,
            matrix = attr.matrix,
            xx = matrix.getXX(),
            yy = matrix.getYY(),
            dx = matrix.getDX(),
            dy = matrix.getDY(),
            barWidth = attr.barWidth / xx,
            template,
            ohlcType = attr.ohlcType,
            halfWidth = Math.round(barWidth * 0.5 * xx),
            opens = aggregates.open,
            closes = aggregates.close,
            maxYs = aggregates.maxY,
            minYs = aggregates.minY,
            startIdxs = aggregates.startIdx,
            open, high, low, close, mid,
            i,
            pixelAdjust = attr.lineWidth * surface.devicePixelRatio / 2;

        pixelAdjust -= Math.floor(pixelAdjust);
        ctx.save();
        template = this.raiseTemplate;
        template.useAttributes(ctx);
        ctx.beginPath();
        for (i = start; i < end; i++) {
            if (opens[i] <= closes[i]) {
                open = Math.round(opens[i] * yy + dy) + pixelAdjust;
                high = Math.round(maxYs[i] * yy + dy) + pixelAdjust;
                low = Math.round(minYs[i] * yy + dy) + pixelAdjust;
                close = Math.round(closes[i] * yy + dy) + pixelAdjust;
                mid = Math.round(dataX[startIdxs[i]] * xx + dx) + pixelAdjust;
                me[ohlcType](ctx, open, high, low, close, mid, halfWidth);
            }
        }
        ctx.fillStroke(template.attr);
        ctx.restore();

        ctx.save();
        template = this.dropTemplate;
        template.useAttributes(ctx);
        ctx.beginPath();
        for (i = start; i < end; i++) {
            if (opens[i] > closes[i]) {
                open = Math.round(opens[i] * yy + dy) + pixelAdjust;
                high = Math.round(maxYs[i] * yy + dy) + pixelAdjust;
                low = Math.round(minYs[i] * yy + dy) + pixelAdjust;
                close = Math.round(closes[i] * yy + dy) + pixelAdjust;
                mid = Math.round(dataX[startIdxs[i]] * xx + dx) + pixelAdjust;
                me[ohlcType](ctx, open, high, low, close, mid, halfWidth);
            }
        }
        ctx.fillStroke(template.attr);
        ctx.restore();
    }
});