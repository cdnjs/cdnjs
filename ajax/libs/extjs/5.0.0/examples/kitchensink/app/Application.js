Ext.define('KitchenSink.Application', {
    extend: 'Ext.app.Application',
    namespace: 'KitchenSink',

    requires: [
        'Ext.app.*',
        'Ext.state.CookieProvider',
        'Ext.window.MessageBox',
        'Ext.tip.QuickTipManager',
        'KitchenSink.*'
    ],

    controllers: [
        'Global'
    ],

    init: function() {
        if ('nocss3' in Ext.Object.fromQueryString(location.search)) {
            Ext.supports.CSS3BorderRadius = false;
            Ext.getBody().addCls('x-nbr x-nlg');
        }

        var me = this,
            map = Ext.Object.fromQueryString(location.search),
            charts = ('charts' in map) && !/0|false|no/i.test(map.charts);

        Ext.create('KitchenSink.store.Navigation', {
            storeId: 'navigation'
        });

        // Set the default route to start the application.
        me.setDefaultToken('all');

        Ext.setGlyphFontFamily('Pictos');
        Ext.tip.QuickTipManager.init();
        Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));
    }
});
