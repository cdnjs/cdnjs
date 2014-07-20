/**
 * @class Ext.draw.gradient.GradientDefinition
 *
 * A global map of all gradient configs.
 */
Ext.define('Ext.draw.gradient.GradientDefinition', {
    singleton: true,

    urlStringRe: /^url\(#([\w\-]+)\)$/,
    gradients: {},

    add: function (gradients) {
        var store = this.gradients,
            i, n, gradient;
        for (i = 0, n = gradients.length; i < n; i++) {
            gradient = gradients[i];
            if (Ext.isString(gradient.id)) {
                store[gradient.id] = gradient;
            }
        }
    },

    get: function (str) {
        var store = this.gradients,
            match = str.match(this.urlStringRe),
            gradient;
        if (match && match[1] && (gradient = store[match[1]])) {
            return gradient || str;
        }
        return str;
    }
});