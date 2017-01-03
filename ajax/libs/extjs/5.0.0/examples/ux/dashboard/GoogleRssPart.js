/**
 * This `part` implements a Google RSS Feed for use in a `Dashboard`.
 */
Ext.define('Ext.ux.dashboard.GoogleRssPart', {
    extend: 'Ext.dashboard.Part',

    alias: 'part.google-rss',

    requires: [
        'Ext.window.MessageBox',
        'Ext.ux.dashboard.GoogleRssView'
    ],

    viewTemplate: {
        layout: 'fit',
        items: {
            xclass: 'Ext.ux.dashboard.GoogleRssView',
            feedUrl: '{feedUrl}'
        }
    },

    type: 'google-rss',

    config: {
        suggestedFeed: 'http://rss.slashdot.org/Slashdot/slashdot'
    },

    formTitleAdd: 'Add RSS Feed',

    formTitleEdit: 'Edit RSS Feed',

    formLabel: 'RSS Feed URL',

    displayForm: function (instance, currentConfig, callback, scope) {
        var me = this,
            suggestion = currentConfig ? currentConfig.feedUrl : me.getSuggestedFeed(),
            title = instance ? me.formTitleEdit : me.formTitleAdd;

        Ext.Msg.prompt(title, me.formLabel, function (btn, text) {
            if (btn === 'ok') {
                callback.call(scope || me, { feedUrl: text });
            }
        }, me, false, suggestion);
    }
});
