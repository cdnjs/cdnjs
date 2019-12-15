SharrrePlatform.register("googlePlus", function (options) {
    defaultSettings = {  //http://www.google.com/webmasters/+1/button/
        url: '',  //if you need to personnalize button url
        urlCount: false,  //if you want to use personnalize button url on global counter
        size: 'medium',
        lang: 'en-US',
        annotation: '',
        count: true,
        popup: {
            width: 900,
            height: 500
        }
    };

    defaultSettings = $.extend(true, {}, defaultSettings, options);
    return {
        settings: defaultSettings,
        url: function (url) {
            return url + '?url={url}&type=googlePlus';
        },
        trackingAction: {site: 'Google', action: '+1'},
        load: function (self) {
            var sett = this.settings;
            //$(self.element).find('.buttons').append('<div class="button googleplus"><g:plusone size="'+self.options.buttons.googlePlus.size+'" href="'+self.options.url+'"></g:plusone></div>');
            $(self.element).find('.buttons').append('<div class="button googleplus"><div class="g-plusone" data-size="' +
            sett.size + '" data-href="' + (sett.url !== '' ? sett.url : self.options.url) +
            '" data-annotation="' + sett.annotation + '"></div></div>');
            window.___gcfg = {
                lang: sett.lang
            };
            var loading = 0;
            if ((typeof gapi === 'undefined' || typeof gapi.plusone === 'undefined') && loading == 0) {
                loading = 1;
                (function () {
                    var po = document.createElement('script');
                    po.type = 'text/javascript';
                    po.async = true;
                    po.src = 'https://apis.google.com/js/plusone.js';
                    var s = document.getElementsByTagName('script')[0];
                    s.parentNode.insertBefore(po, s);
                })();
            }
            else {
                gapi.plusone.go();
            }
        },
        tracking: function () {
        },
        popup: function (opt) {
            window.open("https://plus.google.com/share?hl=" + this.settings.lang +
                "&url=" + encodeURIComponent((this.settings.url !== '' ? this.settings.url : opt.url)),
                "", "toolbar=0, status=0, width=" + this.settings.popup.width + ", height=" + this.settings.popup.height);
        }
    }
});