SharrrePlatform.register("reddit", function (options) {
    defaultSettings = {  //http://twitter.com/about/resources/tweetbutton
        url: '',  //if you need to personalize url button
        urlCount: false,  //if you want to use personnalize button url on global counter
        count: false,

        popup: {
            width: 900,
            height: 550
        }
    };

    defaultSettings = $.extend(true, {}, defaultSettings, options);
    return {
        settings: defaultSettings,
        trackingAction: {site: 'reddit', action: 'share'},
        url: function (test) {
            // Can't find the correct way to get share count
            return "";
        },
        load: function (self) {
            var sett = this.settings;
            var itself = this;
            $(self.element).find('.buttons').append(
                '<div class="button reddit">' +
                '<a href="https://www.reddit.com/submit?url=' + (sett.url !== '' ? sett.url : self.options.url) + '">' +
                '<img src="https://www.redditstatic.com/spreddit7.gif" alt="submit to reddit" border="0" />' +
                '</a></div>');
            $(self.element).find('.reddit').on('click', function () {
                itself.popup(self.options);
            });
        },
        tracking: function () {
        },
        popup: function (opt) {
            window.open("https://www.reddit.com/submit?url="
                + encodeURIComponent((this.settings.url !== '' ? this.setting.url : opt.url))
                , "", "toolbar=0, status=0,width=" + this.settings.popup.width + ", height=" + this.settings.popup.height);
        }
    }
});