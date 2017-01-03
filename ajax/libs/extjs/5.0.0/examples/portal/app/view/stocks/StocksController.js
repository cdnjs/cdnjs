Ext.define('Portal.view.main.StocksController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.stocks',

    renderPositiveNegative: function (val, format) {
        var out = Ext.util.Format.number(val, '0.00'),
            s = '<span';

        if (val > 0) {
            s += ' style="color:#73b51e;"';
        } else if (val < 0) {
            s += ' style="color:#cf4c35;"';
        }

        return s + '>' + out + '</span>';
    },

    renderChange: function (val) {
        return this.renderPositiveNegative(val, '0.00');
    },

    renderChangePercent: function (val) {
        return this.renderPositiveNegative(val, '0.00%');
    },

    updaterPositiveNegative: function (cell, value, format) {
        var innerSpan = Ext.fly(cell).down('span', true);

        innerSpan.style.color = value > 0 ? '#73b51e' : '#cf4c35';
        innerSpan.firstChild.data = Ext.util.Format.number(value, format);
    },

    updateChangePercent: function (cell, value) {
        this.updaterPositiveNegative(cell, value, '0.00%');
    }
});
