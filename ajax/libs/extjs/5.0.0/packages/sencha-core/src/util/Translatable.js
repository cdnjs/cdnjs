/**
 * The utility class to abstract different implementations to have the best performance when applying 2D translation
 * on any DOM element.
 *
 * @private
 */
Ext.define('Ext.util.Translatable', {
    requires: [
        'Ext.util.translatable.CssTransform',
        'Ext.util.translatable.ScrollPosition',
        'Ext.util.translatable.ScrollParent',
        'Ext.util.translatable.CssPosition'
    ],

    constructor: function(config) {
        var namespace = Ext.util.translatable;

        switch (Ext.browser.getPreferredTranslationMethod(config)) {
        case 'scrollposition':
            return new namespace.ScrollPosition(config);
        case 'scrollparent':
            return new namespace.ScrollParent(config);
        case 'csstransform':
            return new namespace.CssTransform(config);
        case 'cssposition':
            return new namespace.CssPosition(config);
        }
    }
});
