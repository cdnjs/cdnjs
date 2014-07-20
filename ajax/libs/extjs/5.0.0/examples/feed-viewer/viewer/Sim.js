Ext.define('FeedSimlet', {
    extend: 'Ext.ux.ajax.Simlet',

    alias: 'simlet.feed',

    cleanupRe: /[%=&]/g,

    doRedirect: function (ctx) {
        var p = ctx.params,
            name = 'feed=' + encodeURIComponent(p.feed) +
                   '&page=' + p.page + '&start=' + p.start + '&limit=' + p.limit;

        // data/feed_http_3A_2F_2Ffeeds.feedburner.com_2Fajaxian_page_1_start_0_limit_25.xml
        name = 'data/' + name.replace(this.cleanupRe, '_') + '.xml';
        //console.log('name: ' + name);

        return this.redirect(name);
    }
});

function initAjaxSim () {
    Ext.ux.ajax.SimManager.init({
        delay: 300
    }).register({
        'feed-proxy.php': {
            stype: 'feed'  // use FeedSimlet (stype is like xtype for components)
        }
    });
}
