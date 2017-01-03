// This is an override because in dev mode it is always loaded and in a compiled app is
// only loaded if Ext.app.Application is used.
//
Ext.define('Ext.overrides.app.Application', {
    override: 'Ext.app.Application'
});

/**
 * @method application
 * @member Ext
 * Loads Ext.app.Application class and starts it up with given configuration after the
 * page is ready.
 *
 * See `Ext.app.Application` for details.
 *
 * @param {Object/String} config Application config object or name of a class derived
 * from Ext.app.Application.
 */
Ext.application = function(config) {
    var createApp = function (App) {
            // This won't be called until App class has been created.
            Ext.onReady(function() {
                Ext.app.Application.instance = new App();
            });
        },
        paths = config.paths,
        ns;

    if (typeof config === "string") {
        Ext.require(config, function() {
            createApp(Ext.ClassManager.get(config));
        });
    }
    else {
        config = Ext.apply({
            extend: 'Ext.app.Application' // can be replaced by config!
        }, config);

        // We have to process `paths` before creating Application class,
        // or `requires` won't work.
        Ext.Loader.setPath(config.name, config.appFolder || 'app');

        if (paths) {
            for (ns in paths) {
                if (paths.hasOwnProperty(ns)) {
                    Ext.Loader.setPath(ns, paths[ns]);
                }
            }
        }

        config['paths processed'] = true;

        // Let Ext.define do the hard work but don't assign a class name.
        Ext.define(config.name + ".$application", config,
            function () {
                createApp(this);
            });
    }
};
