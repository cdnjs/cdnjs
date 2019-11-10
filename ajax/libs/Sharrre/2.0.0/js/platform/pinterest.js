SharrrePlatform.register("pinterest", function (options) {
    defaultSettings = { //http://pinterest.com/about/goodies/
        url: '',  //if you need to personalize url button
        media: '',
        description: '',
        layout: 'horizontal',
        popup: {
            width: 700,
            height: 300
        }
    };

    defaultSettings = $.extend(true, {}, defaultSettings, options);
    return {
        settings: defaultSettings,
        url: function (test) {
            return "https://api.pinterest.com/v1/urls/count.json?url={url}&callback=?";
        },
        trackingAction: {site: 'pinterest', action: 'pin'},
        load: function (self) {
            var sett = this.settings;
            $(self.element).find('.buttons').append('<div class="button pinterest"><a href="https://www.pinterest.com/pin/create/button/?url=' + (sett.url !== '' ? sett.url : self.options.url) + '&media=' + sett.media + '&description=' + sett.description + '" data-pin-do="buttonBookmark" count-layout="' + sett.layout + '">Pin It</a></div>');

            (function () {
                var li = document.createElement('script');
                li.type = 'text/javascript';
                li.async = true;
                li.src = 'https://assets.pinterest.com/js/pinit.js';
                li.setAttribute('data-pin-build', 'parsePinBtns');
                var s = document.getElementsByTagName('script')[0];
                s.parentNode.insertBefore(li, s);
            })();

            if (window.parsePinBtns) {
                window.parsePinBtns();
            }
            $(self.element).find('.pinterest').on('click', function () {
                self.openPopup('pinterest');
            });
        },
        tracking: function () {
        },
        popup: function (opt) {
            window.open('https://pinterest.com/pin/create/button/?url=' +
                encodeURIComponent((opt.buttons.pinterest.url !== '' ? opt.buttons.pinterest.url : opt.url)) +
                '&media=' + encodeURIComponent(opt.buttons.pinterest.media) +
                '&description=' + opt.buttons.pinterest.description, 'pinterest',
                'toolbar=no,width=' + this.settings.popup.width + ", height=" + this.settings.popup.height);
        }
    }
});