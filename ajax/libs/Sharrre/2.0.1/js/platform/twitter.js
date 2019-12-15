SharrrePlatform.register("twitter", function (options) {
    defaultSettings = {  //http://twitter.com/about/resources/tweetbutton
        url: '',  //if you need to personalize url button
        urlCount: false,  //if you want to use personnalize button url on global counter
        count: false,
        hashtags: '',
        via: '',
        related: '',
        lang: 'en',
        popup: {
            width: 650,
            height: 360
        }
    };

    defaultSettings = $.extend(true, {}, defaultSettings, options);
    return {
        settings: defaultSettings,
        trackingAction: {site: 'twitter', action: 'tweet'},
        url: function (test) {
            return "https://opensharecount.com/count.json?url={url}";
        },
        load: function (self) {
            var sett = this.settings;
            $(self.element).find('.buttons').append(
                '<div class="button twitter"><a href="https://twitter.com/share" class="twitter-share-button" data-url="'
                + (sett.url !== '' ? sett.url : self.options.url) +
                '" data-count="' + sett.count + '" data-text="' + self.options.text +
                '" data-via="' + sett.via + '" data-hashtags="' + sett.hashtags +
                '" data-related="' + sett.related + '" data-lang="' + sett.lang + '">Tweet</a></div>');
            var loading = 0;
            if (typeof twttr === 'undefined' && loading == 0) {
                loading = 1;
                (function () {
                    var twitterScriptTag = document.createElement('script');
                    twitterScriptTag.type = 'text/javascript';
                    twitterScriptTag.async = true;
                    twitterScriptTag.src = 'https://platform.twitter.com/widgets.js';
                    var s = document.getElementsByTagName('script')[0];
                    s.parentNode.insertBefore(twitterScriptTag, s);
                })();
            }
            else {
                $.ajax({url: 'https://platform.twitter.com/widgets.js', dataType: 'script', cache: true}); //http://stackoverflow.com/q/6536108
            }
        },
        tracking: function () {
            tw = window.setInterval(function () {
                if (typeof twttr !== 'undefined') {
                    twttr.events.bind('tweet', function (event) {
                        if (event) {
                            _gaq.push(['_trackSocial', 'twitter', 'tweet']);
                        }
                    });
                    clearInterval(tw);
                }
            }, 1000);
        },
        popup: function (opt) {
            window.open("https://twitter.com/intent/tweet?text=" + encodeURIComponent(opt.text) + "&url="
            + encodeURIComponent((this.settings.url !== '' ? this.setting.url : opt.url))
            + (this.settings.via !== '' ? '&via=' + this.settings.via : ''), "", "toolbar=0, status=0,width=" + this.settings.popup.width + ", height=" + this.settings.popup.height);
        }
    }
});