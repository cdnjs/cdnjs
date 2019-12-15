SharrrePlatform.register("stumbleupon", function (options) {
        defaultSettings = {
            url: '',  //if you need to personalize url button
            urlCount: false,  //if you want to use personnalize button url on global counter
            size: 'medium', //medium or tall,
            count: true,
            popup: {
                width: 550,
                height: 550
            }
        };

        defaultSettings = $.extend(true, {}, defaultSettings, options);
        return {
            settings: defaultSettings,
            url: function (url) {
                //"http://www.stumbleupon.com/services/1.01/badge.getinfo?url={url}&format=jsonp&callback=?"
                return url + '?url={url}&type=stumbleupon';
            },
            trackingAction: {site: 'stumbleupon', action: 'add'},
            load: function (self) {
                var sett = this.settings;
                $(self.element).find('.buttons').append('<div class="button stumbleupon"><su:badge layout="' + sett.layout + '" location="' + (sett.url !== '' ? sett.url : self.options.url) + '"></su:badge></div>');
                var loading = 0;
                if (typeof STMBLPN === 'undefined' && loading == 0) {
                    loading = 1;
                    (function () {
                        var li = document.createElement('script');
                        li.type = 'text/javascript';
                        li.async = true;
                        li.src = 'https://platform.stumbleupon.com/1/widgets.js';
                        var s = document.getElementsByTagName('script')[0];
                        s.parentNode.insertBefore(li, s);
                    })();
                    s = window.setTimeout(function () {
                        if (typeof STMBLPN !== 'undefined') {
                            STMBLPN.processWidgets();
                            clearInterval(s);
                        }
                    }, 500);
                }
                else {
                    STMBLPN.wasProcessLoaded = false;
                    STMBLPN.processWidgets();
                }
            },
            tracking: function () {
            },
            popup: function (opt) {
                window.open('https://www.stumbleupon.com/badge/?url=' +
                    encodeURIComponent((opt.buttons.stumbleupon.url !== '' ? opt.buttons.stumbleupon.url : opt.url)),
                    'stumbleupon', 'toolbar=no, width=' + this.settings.popup.width + ", height=" + this.settings.popup.height);
            }
        };
    }
);