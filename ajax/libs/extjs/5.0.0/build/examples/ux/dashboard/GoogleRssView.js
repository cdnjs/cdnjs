/**
 * This view is created by the "google-rss" `Ext.dashboard.Dashboard` part.
 */
Ext.define('Ext.ux.dashboard.GoogleRssView', {
    extend: 'Ext.Component',

    requires: [
        'Ext.tip.ToolTip',
        'Ext.ux.google.Feeds'
    ],

    feedCls: Ext.baseCSSPrefix + 'dashboard-googlerss',
    previewCls: Ext.baseCSSPrefix + 'dashboard-googlerss-preview',

    closeDetailsCls: Ext.baseCSSPrefix + 'dashboard-googlerss-close',
    nextCls: Ext.baseCSSPrefix + 'dashboard-googlerss-next',
    prevCls: Ext.baseCSSPrefix + 'dashboard-googlerss-prev',

    /**
     * The RSS feed URL. Some example RSS Feeds:
     *
     *   * http://rss.slashdot.org/Slashdot/slashdot
     *   * http://sports.espn.go.com/espn/rss/news (ESPN Top News)
     *   * http://news.google.com/news?ned=us&topic=t&output=rss (Sci/Tech - Google News)
     *   * http://rss.news.yahoo.com/rss/software (Yahoo Software News)
     *   * http://feeds.feedburner.com/extblog (Sencha Blog)
     *   * http://sencha.com/forum/external.php?type=RSS2 (Sencha Forums)
     *   * http://feeds.feedburner.com/ajaxian (Ajaxian)
     *   * http://rss.cnn.com/rss/edition.rss (CNN Top Stories)
     */
    feedUrl: null,

    autoScroll: true,

    maxFeedEntries: 10,

    previewTips: false,

    mode: 'detail',

    //closeDetailsGlyph: '10008@',
    closeDetailsGlyph: '8657@',

    // black triangles
    prevGlyph: '9664@', nextGlyph: '9654@',

    // hollow triangles
    //prevGlyph: '9665@', nextGlyph: '9655@',

    // black pointing index
    //prevGlyph: '9754@', nextGlyph: '9755@',

    // white pointing index
    //prevGlyph: '9756@', nextGlyph: '9758@',

    // double arrows
    //prevGlyph: '8656@', nextGlyph: '8658@',

    // closed arrows
    //prevGlyph: '8678@', nextGlyph: '8680@',

    detailTpl:
        '<tpl for="entries[currentEntry]">' +
            '<div class="' + Ext.baseCSSPrefix + 'dashboard-googlerss-detail-header">' +
                '<div class="' + Ext.baseCSSPrefix + 'dashboard-googlerss-detail-nav">' +
                    '<tpl if="parent.hasPrev">' +
                        '<span class="' + Ext.baseCSSPrefix + 'dashboard-googlerss-prev ' +
                                Ext.baseCSSPrefix + 'dashboard-googlerss-glyph">'+
                            '{parent.prevGlyph}' +
                        '</span> '+
                    '</tpl>' +
                    ' {[parent.currentEntry+1]}/{parent.numEntries} ' +
                    '<span class="' + Ext.baseCSSPrefix + 'dashboard-googlerss-next ' +
                                Ext.baseCSSPrefix + 'dashboard-googlerss-glyph"' +
                        '<tpl if="!parent.hasNext">' +
                            ' style="visibility:hidden"'+
                        '</tpl>' +
                        '> {parent.nextGlyph}' +
                    '</span> '+
                    '<span class="' + Ext.baseCSSPrefix + 'dashboard-googlerss-close ' +
                                Ext.baseCSSPrefix + 'dashboard-googlerss-glyph"> ' +
                        '{parent.closeGlyph}' +
                    '</span> '+
                '</div>' +
                '<div class="' + Ext.baseCSSPrefix + 'dashboard-googlerss-title">'+
                    '<a href="{link}" target=_blank>{title}</a>'+
                '</div>'+
                '<div class="' + Ext.baseCSSPrefix + 'dashboard-googlerss-author">By {author} - {publishedDate:this.date}</div>' +
            '</div>' +
            '<div class="' + Ext.baseCSSPrefix + 'dashboard-googlerss-detail">' +
                '{content}' +
            '</div>' +
        '</tpl>',

    summaryTpl:
        '<tpl for="entries">' +
            '<div class="' + Ext.baseCSSPrefix + 'dashboard-googlerss">' +
                '<span class="' + Ext.baseCSSPrefix + 'dashboard-googlerss-title">'+
                    '<a href="{link}" target=_blank>{title}</a>'+
                '</span> '+
                '<img src="'+Ext.BLANK_IMAGE_URL+'" data-index="{#}" class="'+Ext.baseCSSPrefix+'dashboard-googlerss-preview"><br>' +
                '<span class="' + Ext.baseCSSPrefix + 'dashboard-googlerss-author">By {author} - {publishedDate:this.date}</span><br>' +
                '<span class="' + Ext.baseCSSPrefix + 'dashboard-googlerss-snippet">{contentSnippet}</span><br>' +
            '</div>' +
        '</tpl>',


    initComponent: function () {
        var me = this;

        me.feedMgr = new google.feeds.Feed(me.feedUrl);

        me.callParent();
    },

    afterRender: function () {
        var me = this;

        me.callParent();

        if (me.feedMgr) {
            me.refresh();
        }

        me.el.on({
            click: me.onClick,
            scope: me
        });

        if (me.previewTips) {
            me.tip = new Ext.tip.ToolTip({
                target: me.el,
                delegate: '.' + me.previewCls,
                maxWidth: 800,
                showDelay: 750,
                autoHide: false,
                autoScroll: true,
                anchor: 'top',
                listeners: {
                    beforeshow: 'onBeforeShowTip',
                    scope: me
                }
            });
        }
    },

    formatDate: function (date) {
        if (!date) {
            return '';
        }

        date = new Date(date);
        var now = new Date(),
            d = Ext.Date.clearTime(now, true),
            notime = Ext.Date.clearTime(date, true).getTime();

        if (notime === d.getTime()) {
            return 'Today ' + Ext.Date.format(date, 'g:i a');
        }

        d = Ext.Date.add(d, 'd', -6);
        if (d.getTime() <= notime) {
            return Ext.Date.format(date, 'D g:i a');
        }
        if (d.getYear() === now.getYear()) {
            return Ext.Date.format(date, 'D M d \\a\\t g:i a');
        }

        return Ext.Date.format(date, 'D M d, Y \\a\\t g:i a');
    },

    getTitle: function () {
        var data = this.data;
        return data && data.title;
    },

    onBeforeShowTip: function (tip) {
        if (this.mode !== 'summary') {
            return false;
        }

        var el = tip.triggerElement,
            index = parseInt(el.getAttribute('data-index'), 10);

        tip.maxHeight = Ext.Element.getViewportHeight() / 2;
        tip.update(this.data.entries[index - 1].content);
    },

    onClick: function (e) {
        var me = this,
            entry = me.data.currentEntry,
            target = Ext.fly(e.getTarget());

        if (target.hasCls(me.nextCls)) {
            me.setCurrentEntry(entry+1);
        } else if (target.hasCls(me.prevCls)) {
            me.setCurrentEntry(entry-1);
        } else if (target.hasCls(me.closeDetailsCls)) {
            me.setMode('summary');
        } else if (target.hasCls(me.previewCls)) {
            me.setMode('detail', parseInt(target.getAttribute('data-index'), 10));
        }
    },

    refresh: function () {
        var me = this;

        if (!me.feedMgr) {
            return;
        }

        me.fireEvent('beforeload', me);
        //setTimeout(function () {

        me.feedMgr.setNumEntries(me.maxFeedEntries);
        me.feedMgr.load(function (result) {
            me.setFeedData(result.feed);
            me.fireEvent('load', me);
        });
        //}, 2000);
    },

    setCurrentEntry: function (current) {
        this.setMode(this.mode, current);
    },

    setFeedData: function (feedData) {
        var me = this,
            entries = feedData.entries,
            count = entries && entries.length || 0,
            data = Ext.apply({
                numEntries: count,
                closeGlyph: me.wrapGlyph(me.closeDetailsGlyph),
                prevGlyph: me.wrapGlyph(me.prevGlyph),
                nextGlyph: me.wrapGlyph(me.nextGlyph),
                currentEntry: 0
            }, feedData);

        me.data = data;
        me.setMode(me.mode);
    },

    setMode: function (mode, currentEntry) {
        var me = this,
            data = me.data,
            current = (currentEntry === undefined) ? data.currentEntry : currentEntry;

        me.tpl = me.getTpl(mode + 'Tpl');
        me.tpl.date = me.formatDate;
        me.mode = mode;

        data.currentEntry = current;
        data.hasNext = current+1 < data.numEntries;
        data.hasPrev = current > 0;

        me.update(data);
        me.el.dom.scrollTop = 0;
    },

    wrapGlyph: function (glyph) {
        var glyphFontFamily = Ext._glyphFontFamily,
            glyphParts,
            html;

        if (typeof glyph === 'string') {
            glyphParts = glyph.split('@');
            glyph = glyphParts[0];
            glyphFontFamily = glyphParts[1];
        }

        html = '&#' + glyph + ';';
        if (glyphFontFamily) {
            html = '<span style="font-family:' + glyphFontFamily + '">' + html + '</span>';
        }

        return html;
    },

    // @private
    beforeDestroy: function () {
        Ext.destroy(this.tip);

        this.callParent();
    }
});
