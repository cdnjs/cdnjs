SharrrePlatform.register("linkedin", function (options) {
    defaultSettings = {  //http://developer.linkedin.com/plugins/share-button
        url: '',  //if you need to personalize url button
        urlCount: false,  //if you want to use personnalize button url on global counter
        counter: '',
        count: true,
        popup: {
            width: 550,
            height: 550
        }
    };

    defaultSettings = $.extend(true, {}, defaultSettings, options);
    return {
        settings: defaultSettings,
        url: function (test) {
            return "https://www.linkedin.com/countserv/count/share?format=jsonp&url={url}&callback=?";
        },
        trackingAction: {site: 'linkedin', action: 'share'},
        load: function (self) {
            var sett = this.settings;
            $(self.element).find('.buttons').append('<div class="button linkedin"><script type="IN/share" data-url="' + (sett.url !== '' ? sett.url : self.options.url) + '" data-counter="' + sett.counter + '"></script></div>');
            var loading = 0;
            if (typeof window.IN === 'undefined' && loading == 0) {
                loading = 1;
                (function () {
                    var li = document.createElement('script');
                    li.type = 'text/javascript';
                    li.async = true;
                    li.src = 'https://platform.linkedin.com/in.js';
                    var s = document.getElementsByTagName('script')[0];
                    s.parentNode.insertBefore(li, s);
                })();
            }
            else if (typeof window.IN !== 'undefined' && window.IN.parse) {
                IN.parse(document);
            }
        },
        tracking: function () {
            function LinkedInShare() {
                _gaq.push(['_trackSocial', 'linkedin', 'share']);
            }
        },
        popup: function (opt) {
            window.open('https://www.linkedin.com/cws/share?url=' +
            encodeURIComponent((opt.buttons.linkedin.url !== '' ? opt.buttons.linkedin.url : opt.url)) +
            '&token=&isFramed=true', 'linkedin', 'toolbar=no, width=' + this.settings.popup.width + ", height=" + this.settings.popup.height);
        }
    }
});