/**
 * This mixin allows users to easily require external scripts in their classes. This load
 * process delays application launch (`Ext.onReady`) until all such scripts are loaded
 * ensuring that your class will have access to its required scripts from the start.
 *
 * For example:
 *
 *      Ext.define('Feed', {
 *          mixins: 'Ext.mixin.Mashup',
 *
 *          requiredScripts: [
 *              'http://www.foo.com/code/bar.js'
 *          ],
 *
 *          // The code in "bar.js" will be available at application launch
 *      });
 *
 * @since 5.0.0
 */
Ext.define('Ext.mixin.Mashup', function (Mashup) { return {
    extend: 'Ext.Mixin',

    mixinConfig: {
        id: 'mashup',

        extended: function (baseClass, derivedClass) {
            Mashup.process(derivedClass);
        }
    },

    statics: {
        process: function (targetClass) {
            var body = targetClass.prototype,
                requiredScripts = body.requiredScripts,
                hooks = targetClass._classHooks,
                onCreated = hooks.onCreated;

            if (requiredScripts) {
                delete body.requiredScripts;

                hooks.onCreated = function () {
                    var me = this,
                        args = Ext.Array.slice(arguments);

                    Ext.Loader.loadScripts({
                        url: requiredScripts,
                        cache: true, // no cache busting
                        onLoad: function () {
                            hooks.onCreated = onCreated;
                            hooks.onCreated.call(me, args);
                        }
                    });
                };
            }
        }
    },

    onClassMixedIn: function (targetClass) {
        Mashup.process(targetClass);
    }
}});
