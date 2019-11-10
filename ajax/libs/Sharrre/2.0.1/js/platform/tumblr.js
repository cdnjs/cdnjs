SharrrePlatform.register("tumblr", function (options) {
    defaultSettings = { //http://developers.facebook.com/docs/reference/plugins/like/
        url: '',  //if you need to personalize url button
        urlCount: false,  //if you want to use personnalize button url on global counter
        description: '',
        name: '',
        count: false,
        title: 'Share on Tumblr',
        color: 'blue',
        notes: 'none',
        popup: {
            width: 900,
            height: 500
        }
    };

    defaultSettings = $.extend(true, {}, defaultSettings, options);

    return {
        settings: defaultSettings,
        url: function (url) {
            // Need a key apparently
            return "";
        },
        trackingAction: {site: 'tumblr', action: 'share'},
        load: function (self) {
            var sett = this.settings;
            $(self.element).find('.buttons').append(
                '<div title="' + sett.title + '" class="button tumblr">' +
                '<a class="tumblr-share-button" ' +
                'data-color="' + sett.color + '" ' +
                'data-notes="' + sett.notes + '" ' +

                'data-href="' + (sett.url !== '' ? sett.url : self.options.url) + '" ' +
                ' href="https://www.tumblr.com/share' +
                '">' + sett.title + '</a></div>');
            var loading = 0;
            if (typeof Tumblr === 'undefined' && loading == 0) {
                loading = 1;
                (function () {
                    var tumblrScriptTag = document.createElement('script');
                    var s = document.getElementsByTagName('script')[0];
                    tumblrScriptTag.src = "https://secure.assets.tumblr.com/share-button.js";
                    s.parentNode.insertBefore(tumblrScriptTag, s);
                })();
            }
            else {
                Tumblr.activate_share_on_tumblr_buttons();
            }
        },
        tracking: function () {

        },
        popup: function (opt) {
            window.open("https://www.tumblr.com/share/link?canonicalUrl=" +
                encodeURIComponent((this.settings.url !== '' ? this.settings.url : opt.url)) + "&name="
                + encodeURIComponent(this.settings.name) +
                "&description=" + encodeURIComponent(this.settings.description),
                "", "toolbar=0, status=0, width=" + this.settings.popup.width + ", height=" + this.settings.popup.height);
        }
    }
});