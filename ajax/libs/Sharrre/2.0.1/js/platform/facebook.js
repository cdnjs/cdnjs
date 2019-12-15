SharrrePlatform.register("facebook", function (options) {
    defaultSettings = { //http://developers.facebook.com/docs/reference/plugins/like/
        url: '',  //if you need to personalize url button
        urlCount: false,  //if you want to use personnalize button url on global counter
        action: 'like',
        layout: 'button_count',
        count: true,
        width: '',
        send: 'false',
        faces: 'false',
        colorscheme: '',
        font: '',
        lang: 'en_US',
        share: '',
        appId: '',
        popup: {
            width: 900,
            height: 500
        }
    };

    defaultSettings = $.extend(true, {}, defaultSettings, options);

    return {
        settings: defaultSettings,
        url: function (url) {
            return "https://graph.facebook.com/fql?q=SELECT%20url,%20normalized_url,%20share_count,%20like_count,%20comment_count,%20total_count,commentsbox_count,%20comments_fbid,%20click_count%20FROM%20link_stat%20WHERE%20url=%27{url}%27&callback=?";
        },
        trackingAction: {site: 'facebook', action: 'like'},
        load: function (self) {
            var sett = this.settings;
            $(self.element).find('.buttons').append('<div class="button facebook"><div id="fb-root"></div>' +
            '<div class="fb-like" data-href="' + (sett.url !== '' ? sett.url : self.options.url) +
            '" data-send="' + sett.send +
            '" data-layout="' + sett.layout +
            '" data-width="' + sett.width +
            '" data-show-faces="' + sett.faces +
            '" data-action="' + sett.action +
            '" data-colorscheme="' + sett.colorscheme +
            '" data-font="' + sett.font +
            '" data-via="' + sett.via +
            '" data-share="' + sett.share +
            '"></div></div>');
            var loading = 0;
            if (typeof FB === 'undefined' && loading == 0) {
                loading = 1;
                (function (d, s, id) {
                    var js, fjs = d.getElementsByTagName(s)[0];
                    if (d.getElementById(id)) {
                        return;
                    }
                    js = d.createElement(s);
                    js.id = id;
                    js.src = 'https://connect.facebook.net/' + sett.lang + '/all.js#xfbml=1';
                    if (sett.appId) {
                        js.src += '&appId=' + sett.appId;
                    }
                    fjs.parentNode.insertBefore(js, fjs);
                }(document, 'script', 'facebook-jssdk'));
            }
            else {
                FB.XFBML.parse();
            }
        },
        tracking: function () {
            fb = window.setInterval(function () {
                if (typeof FB !== 'undefined') {
                    FB.Event.subscribe('edge.create', function (targetUrl) {
                        _gaq.push(['_trackSocial', 'facebook', 'like', targetUrl]);
                    });
                    FB.Event.subscribe('edge.remove', function (targetUrl) {
                        _gaq.push(['_trackSocial', 'facebook', 'unlike', targetUrl]);
                    });
                    FB.Event.subscribe('message.send', function (targetUrl) {
                        _gaq.push(['_trackSocial', 'facebook', 'send', targetUrl]);
                    });
                    //console.log('ok');
                    clearInterval(fb);
                }
            }, 1000);
        },
        popup: function (opt) {
            window.open("https://www.facebook.com/sharer/sharer.php?u=" +
            encodeURIComponent((this.settings.url !== '' ? this.settings.url : opt.url)) +
            "&t=" + opt.text + "", "", "toolbar=0, status=0, width=" + this.settings.popup.width + ", height=" + this.settings.popup.height);
        }
    }
});