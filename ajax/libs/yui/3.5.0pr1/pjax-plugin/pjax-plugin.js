YUI.add('pjax-plugin', function(Y) {

/**
Node plugin that provides seamless, gracefully degrading pjax functionality.

@module pjax-plugin
**/

Y.Plugin.Pjax = Y.Base.create('pjaxPlugin', Y.Pjax, [Y.Plugin.Base], {
    // -- Lifecycle Methods ----------------------------------------------------
    initializer: function (config) {
        this.set('container', config.host);
    }
}, {
    NS: 'pjax'
});


}, '@VERSION@' ,{requires:['node-pluginhost', 'pjax', 'plugin']});
