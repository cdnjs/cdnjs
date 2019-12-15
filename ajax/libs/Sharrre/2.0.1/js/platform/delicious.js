SharrrePlatform.register("delicious", function (options) {
    defaultSettings = {  //http://www.stumbleupon.com/badges/
        url: '',  //if you need to personalize url button
        urlCount: false,  //if you want to use personnalize button url on global counter
        layout: '1',
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
            // Doesn't respond on https
            return 'http://feeds.delicious.com/v2/json/urlinfo/data?url={url}&callback=?';
        },
        trackingAction: {site: 'delicious', action: 'add'},
        load: function (self) {
            if (self.options.buttons.delicious.size == 'tall') {//tall
                var css = 'width:50px;',
                    cssCount = 'height:35px;width:50px;font-size:15px;line-height:35px;',
                    cssShare = 'height:18px;line-height:18px;margin-top:3px;';
            }
            else {//medium
                var css = 'width:93px;',
                    cssCount = 'float:right;padding:0 3px;height:20px;width:26px;line-height:20px;',
                    cssShare = 'float:left;height:20px;line-height:20px;';
            }
            var count = self.shorterTotal(self.options.count.delicious);
            if (typeof count === "undefined") {
                count = 0;
            }
            $(self.element).find('.buttons').append(
                '<div class="button delicious"><div style="' + css + 'font:12px Arial,Helvetica,sans-serif;cursor:pointer;color:#666666;display:inline-block;float:none;height:20px;line-height:normal;margin:0;padding:0;text-indent:0;vertical-align:baseline;">' +
                '<div style="' + cssCount + 'background-color:#fff;margin-bottom:5px;overflow:hidden;text-align:center;border:1px solid #ccc;border-radius:3px;">' + count + '</div>' +
                '<div style="' + cssShare + 'display:block;padding:0;text-align:center;text-decoration:none;width:50px;background-color:#7EACEE;border:1px solid #40679C;border-radius:3px;color:#fff;">' +
                '<img src="https://www.delicious.com/static/img/delicious.small.gif" height="10" width="10" alt="Delicious" /> Add</div></div></div>');

            $(self.element).find('.delicious').on('click', function () {
                self.openPopup('delicious');
            });
        },
        tracking: function () {
        },
        popup: function (opt) {
            window.open('https://www.delicious.com/save?v=5&noui&jump=close&url=' +
            encodeURIComponent((this.settings.url !== '' ? this.settings.url : opt.url)) +
            '&title=' + opt.text, 'delicious', 'toolbar=no,width=' + this.settings.popup.width + ", height=" + this.settings.popup.height);
        }
    }
});