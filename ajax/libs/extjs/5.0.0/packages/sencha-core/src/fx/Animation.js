/**
 * @private
 * @author Jacky Nguyen <jacky@sencha.com>
 *
 * This class is a factory class that will create and return an animation class based on the {@link #type} configuration.
 */
Ext.define('Ext.fx.Animation', {

    requires: [
        'Ext.fx.animation.Slide',
        'Ext.fx.animation.SlideOut',
        'Ext.fx.animation.Fade',
        'Ext.fx.animation.FadeOut',
        'Ext.fx.animation.Flip',
        'Ext.fx.animation.Pop',
        'Ext.fx.animation.PopOut'
    ],

    /**
     * @cfg {String} type The type of animation to use. The possible values are:
     *
     *  - `fade` - {@link Ext.fx.animation.Fade}
     *  - `fadeOut` - {@link Ext.fx.animation.FadeOut}
     *  - `flip` - {@link Ext.fx.animation.Flip}
     *  - `pop` - {@link Ext.fx.animation.Pop}
     *  - `popOut` - {@link Ext.fx.animation.PopOut}
     *  - `slide` - {@link Ext.fx.animation.Slide}
     *  - `slideOut` - {@link Ext.fx.animation.SlideOut}
     */

    constructor: function(config) {
        var defaultClass = Ext.fx.animation.Abstract,
            type;

        if (typeof config == 'string') {
            type = config;
            config = {};
        }
        else if (config && config.type) {
            type = config.type;
        }

        if (type) {
            if (Ext.browser.is.AndroidStock2) {
                if (type == 'pop') {
                    type = 'fade';
                }
                if (type == 'popIn') {
                    type = 'fadeIn';
                }
                if (type == 'popOut') {
                    type = 'fadeOut';
                }
            }
            defaultClass = Ext.ClassManager.getByAlias('animation.' + type);

            //<debug error>
            if (!defaultClass) {
                Ext.Logger.error("Invalid animation type of: '" + type + "'");
            }
            //</debug>
        }

        return Ext.factory(config, defaultClass);
    }
});
