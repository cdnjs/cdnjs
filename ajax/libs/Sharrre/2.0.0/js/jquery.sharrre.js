/*!
 *  Sharrre.com - Make your sharing widget!
 *  Version: 2.0.0
 *  Author: Julien Hany
 *  License: MIT http://en.wikipedia.org/wiki/MIT_License or GPLv2 http://en.wikipedia.org/wiki/GNU_General_Public_License
 */

(function ($, window, document, undefined) {

    /* Defaults*/
    var pluginName = 'sharrre',
        defaults = {
            className: 'sharrre',
            share: {},
            shareTotal: 0,
            template: '',
            title: '',
            url: document.location.href,
            text: document.title,
            urlCurl: 'sharrre.php',  //PHP script for google plus...
            count: {}, //counter by social network
            total: 0,  //total of sharing
            shorterTotal: true, //show total by k or M when number is to big
            enableHover: true, //disable if you want to personalize hover event with callback
            enableCounter: true, //disable if you just want use buttons
            enableTracking: false, //tracking with google analitycs
            defaultUrl: "javascript:void(0);",
            popup: { // Set the popup width and height
                width: 900,
                height: 500
            },
            hover: function () {
            }, //personalize hover event with this callback function
            hide: function () {
            }, //personalize hide event with this callback function
            click: function () {
            }, //personalize click event with this callback function
            render: function () {
            }
        };

    /* Plugin constructor*/
    function Plugin(element, options) {
        this.element = element;
        this.options = $.extend(true, {}, defaults, options);
        this.options.share = options.share; //simple solution to allow order of buttons
        this._defaults = defaults;
        this._name = pluginName;
        this.platforms = {};
        this.init();
    };

    /* Initialization method
     ================================================== */
    Plugin.prototype.init = function () {
        var self = this;

        // Load enabled platforms
        $.each(self.options.share, function (name, val) {
            if (val === true) {
                self.platforms[name] = SharrrePlatform.get(name, self.options.buttons[name]);
            }
        });

        $(this.element).addClass(this.options.className); //add class

        //HTML5 Custom data
        if (typeof $(this.element).data('title') !== 'undefined') {
            this.options.title = $(this.element).attr('data-title');
        }
        if (typeof $(this.element).data('url') !== 'undefined') {
            this.options.url = $(this.element).data('url');
        }
        if (typeof $(this.element).data('text') !== 'undefined') {
            this.options.text = $(this.element).data('text');
        }

        //how many social website have been selected
        $.each(this.options.share, function (name, val) {
            if (val === true) {
                self.options.shareTotal++;
            }
        });

        if (self.options.enableCounter === true) {  //if for some reason you don't need counter
            //get count of social share that have been selected
            $.each(this.options.share, function (name, val) {
                if (val === true) {
                    //self.getSocialJson(name);
                    try {
                        self.getSocialJson(name);
                    } catch (e) {
                    }
                }
            });
        } else if (self.options.template !== '') {
            self.renderer();
            self.options.count[name] = 0;
            self.rendererPerso();
        }

        if (self.options.template !== '') {  //for personalized button (with template)
            this.options.render(this, this.options);
        }
        else { // if you want to use official button like example 3 or 5
            this.loadButtons();
        }

        //add hover event
        $(this.element).on('mouseenter', function () {
            //load social button if enable and 1 time
            if ($(this).find('.buttons').length === 0 && self.options.enableHover === true) {
                self.loadButtons();
            }
            self.options.hover(self, self.options);
        }).on('mouseleave', function () {
            self.options.hide(self, self.options);
        });

        //click event
        $(this.element).click(function (e) {
            e.preventDefault();
            self.options.click(self, self.options);
            return false;
        });
    };

    /* loadButtons methode
     ================================================== */
    Plugin.prototype.loadButtons = function () {
        var self = this;
        $(this.element).append('<div class="buttons"></div>');
        $.each(self.options.share, function (name, val) {

            if (val == true) {
                self.platforms[name].load(self);
                if (self.options.enableTracking === true) { //add tracking
                    self.platforms[name].tracking();
                }
            }
        });
    };

    /* getSocialJson methode
     ================================================== */
    Plugin.prototype.getSocialJson = function (name) {
        var self = this,
            count = 0,
            settings = self.platforms[name].settings,
            buttonUrl = self.platforms[name].url(this.options.urlCurl),
            replaceUrl = encodeURIComponent(this.options.url);
        if (settings.url.length) {
            buttonUrl = settings.url;
        }
        if (settings.urlCount === true && buttonUrl !== '') {
            replaceUrl = buttonUrl;
        }
        if (settings.count === false) {
            buttonUrl = '';
        }
        url = buttonUrl.replace('{url}', replaceUrl);
        if (url != '') {  //urlCurl = '' if you don't want to used PHP script but used social button
            $.getJSON(url, function (json) {
                if (typeof json.count !== "undefined") {  //GooglePlus, Stumbleupon, Twitter, Pinterest and Digg
                    var temp = json.count + '';
                    temp = temp.replace('\u00c2\u00a0', '');  //remove google plus special chars
                    count += parseInt(temp, 10);
                }
                //get the FB total count (shares, likes and more)
                else if (json.data && json.data.length > 0 && typeof json.data[0].total_count !== "undefined") { //Facebook total count
                    count += parseInt(json.data[0].total_count, 10);
                }
                else if (typeof json[0] !== "undefined") {  //Delicious
                    count += parseInt(json[0].total_posts, 10);
                }
                else if (typeof json[0] !== "undefined") {  //Stumbleupon
                }
                self.options.count[name] = count;
                self.options.total += count;
                self.renderer();
                self.rendererPerso();
            })
                .error(function () {
                    self.options.count[name] = 0;
                    self.rendererPerso();
                });
        }
        else {
            self.renderer();
            self.options.count[name] = 0;
            self.rendererPerso();
        }
    };

    /* launch render methode
     ================================================== */
    Plugin.prototype.rendererPerso = function () {
        //check if this is the last social website to launch render
        var shareCount = 0;
        for (e in this.options.count) {
            shareCount++;
        }
        if (shareCount === this.options.shareTotal) {
            this.options.render(this, this.options);
        }
    };

    /* render methode
     ================================================== */
    Plugin.prototype.renderer = function () {
        var total = this.options.total,
            template = this.options.template;
        if (this.options.shorterTotal === true) {  //format number like 1.2k or 5M
            total = this.shorterTotal(total);
        }

        if (template !== '') {  //if there is a template
            template = template.replace('{total}', total);
            $(this.element).html(template);
        }
        else { //template by defaults
            $(this.element).html(
                '<div class="box"><a class="count" href="' + this.options.defaultUrl + '">' + total + '</a>' +
                (this.options.title !== '' ? '<a class="share" href="' + this.options.defaultUrl + '">' + this.options.title + '</a>' : '') +
                '</div>'
            );
        }
    };

    /* format total numbers like 1.2k or 5M
     ================================================== */
    Plugin.prototype.shorterTotal = function (num) {
        if (num >= 1e6) {
            num = (num / 1e6).toFixed(2) + "M"
        } else if (num >= 1e3) {
            num = (num / 1e3).toFixed(1) + "k"
        }
        return num;
    };

    /* Methode for open popup
     ================================================== */
    Plugin.prototype.openPopup = function (site) {
        this.platforms[site].popup(this.options);  //open
        if (this.options.enableTracking === true) { //tracking!
            infos = this.platforms[site].trackingAction;
            _gaq.push(['_trackSocial', infos.site, infos.action]);
        }
    };

    /* Methode for add +1 to a counter
     ================================================== */
    Plugin.prototype.simulateClick = function () {
        var html = $(this.element).html();
        $(this.element).html(html.replace(this.options.total, this.options.total + 1));
    };

    /* Methode for add +1 to a counter
     ================================================== */
    Plugin.prototype.update = function (url, text) {
        if (url !== '') {
            this.options.url = url;
        }
        if (text !== '') {
            this.options.text = text;
        }
    };

    /* A really lightweight plugin wrapper around the constructor, preventing against multiple instantiations
     ================================================== */
    $.fn[pluginName] = function (options) {
        var args = arguments;
        if (options === undefined || typeof options === 'object') {
            return this.each(function () {
                if (!$(this).data('plugin_' + pluginName)) {
                    $(this).data('plugin_' + pluginName, new Plugin(this, options));
                }
            });
        } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
            return this.each(function () {
                var instance = $(this).data('plugin_' + pluginName);
                if (instance instanceof Plugin && typeof instance[options] === 'function') {
                    instance[options].apply(instance, Array.prototype.slice.call(args, 1));
                }
            });
        }
    };
})(window.jQuery || window.Zepto, window, document);
