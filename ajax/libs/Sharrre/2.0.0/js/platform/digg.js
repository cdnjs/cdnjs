/**
 * The api doesn't exists anymore, we need to remove this
 */
SharrrePlatform.register("digg", function (options) {
    defaultSettings = { //http://about.digg.com/downloads/button/smart
        url: '',  //if you need to personalize url button
        urlCount: false,  //if you want to use personnalize button url on global counter
        type: 'DiggCompact',
        count: true,
        popup: {
            width: 650,
            height: 360
        }
    };

    defaultSettings = $.extend(true, {}, defaultSettings, options);

    return {
        settings: defaultSettings,
        url: function (url) {
            return "http://services.digg.com/2.0/story.getInfo?links={url}&type=javascript&callback=?";
        },
        trackingAction: {site: 'digg', action: 'add'},
        load: function (self) {
            var sett = this.settings;
            $(self.element).find('.buttons').append('<div class="button digg"><a class="DiggThisButton ' + sett.type + '" rel="nofollow external" href="http://digg.com/submit?url=' + encodeURIComponent((sett.url !== '' ? sett.url : self.options.url)) + '"></a></div>');
            var loading = 0;
            if (typeof __DBW === 'undefined' && loading == 0) {
                loading = 1;
                (function () {
                    var s = document.createElement('SCRIPT'), s1 = document.getElementsByTagName('SCRIPT')[0];
                    s.type = 'text/javascript';
                    s.async = true;
                    s.src = 'http://widgets.digg.com/buttons.js';
                    s1.parentNode.insertBefore(s, s1);
                })();
            }
        },
        tracking: function () {
            //if somenone find a solution, mail me !
            /*$(this.element).find('.digg').on('click', function(){
             _gaq.push(['_trackSocial', 'digg', 'add']);
             });*/
        },
        popup: function (opt) {
            window.open("http://digg.com/tools/diggthis/submit?url=" +
            encodeURIComponent((opt.buttons.digg.url !== '' ? opt.buttons.digg.url : opt.url)) +
            "&title=" + opt.text + "&related=true&style=true", "", "toolbar=0, status=0, width=" + this.settings.popup.width + ", height=" + this.settings.popup.height);
        }
    }
});