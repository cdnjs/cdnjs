SharrrePlatform.register("twitterFollow", function (options) {
    defaultSettings = {  //http://twitter.com/about/resources/tweetbutton
        url: '',  //if you need to personalize url button
        urlCount: false,  //if you want to use personnalize button url on global counter
        count: true,
        display: 'horizontal',
        lang: 'en',
        popup: {
            width: 650,
            height: 360
        },
        user: "",
        size: 'default',
        showCount: 'false'
    };

    defaultSettings = $.extend(true, {}, defaultSettings, options);
    return {
        settings: defaultSettings,
        trackingAction: {site: 'twitter', action: 'follow'},
        url: function (test) {
            return '';
            // Needs an API token
//            return "https://api.twitter.com/1.1/users/show.json?screen_name=" + this.settings.user + "&include_entities=true&callback=?";
        },
        load: function (self) {
            var sett = this.settings;
            $(self.element).find('.buttons').append(
                '<div class="button twitterFollow"><a href="https://twitter.com/' + sett.user + '" class="twitter-follow-button"' +
                '" data-size="' + sett.size +
                '" data-show-count="' + sett.showCount +
                '" data-lang="' + sett.lang +
                '">Follow @' + sett.user + '</a></div>');
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
        },
        popup: function (opt) {
            window.open("https://twitter.com/intent/follow?screen_name=" + encodeURIComponent(this.settings.user), "",
                "toolbar=0, status=0, ,width=" + this.settings.popup.width + ", height=" + this.settings.popup.height);

        }
    }
});