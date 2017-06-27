/**
 * @preserve
 * Sharer.js
 *
 * @file Tiny js lib to create a simple share component. No deps.
 * @version 0.2.9
 * @author Ellison Leao <ellisonleao@gmail.com>
 * @license MIT
 *
 */

(function (window, document) {
    'use strict';
    /**
     * @constructor
     */
    var Sharer = function(elem) {
        this.elem = elem;
    };

    Sharer.prototype = {
        /**
         *  @function getValue
         *  @description Helper to get the attribute of a DOM element
         *  @param {String} attr DOM element attribute
         *  @returns {String|Empty} returns the attr value or empty string
         */
        getValue: function(attr) {
            var val = this.elem.getAttribute('data-' + attr);
            return (val === undefined || val === null) ? '' : val;
        },

        /**
         * @event share
         * @description Main share event. Will pop a window or redirect to a link
         * based on the data-sharer attribute.
         */
        share: function() {
            var sharer = this.getValue('sharer'),
                that = this,
                shareUrl,
                params,
                sharers = {
                    facebook: function () {
                        shareUrl = 'https://www.facebook.com/sharer/sharer.php';
                        params = {u: that.getValue('url')};
                        that.urlSharer(shareUrl, params);
                    },
                    googleplus: function () {
                        shareUrl = 'https://plus.google.com/share';
                        params = {url: that.getValue('url')};
                        that.urlSharer(shareUrl, params);
                    },
                    linkedin: function () {
                        shareUrl = 'https://www.linkedin.com/shareArticle';
                        params = {
                            url: that.getValue('url'),
                            mini: true
                        };
                        that.urlSharer(shareUrl, params);
                    },
                    twitter: function () {
                        var via = that.getValue('via');

                        shareUrl = 'https://twitter.com/intent/tweet/';
                        params = {
                            text: that.getValue('title'),
                            url: that.getValue('url'),
                            hashtags: that.getValue('hashtags')
                        };

                        if (via) {
                            params.via = via;
                        }
                        that.urlSharer(shareUrl, params);
                    },
                    email: function () {
                        var subject = that.getValue('subject');
                        shareUrl = 'mailto:' + that.getValue('to');
                        params = {
                            subject: subject,
                            body: subject + '\n'+ that.getValue('title') + '\n' + that.getValue('url')
                        };
                        that.urlSharer(shareUrl, params, true);
                    },
                    whatsapp: function () {
                        shareUrl = 'whatsapp://send';
                        params = {
                            text: that.getValue('title') + ' ' + that.getValue('url')
                        };
                        that.urlSharer(shareUrl, params, true);
                    },
                    telegram: function () {
                        shareUrl = 'tg://msg_url';
                        params = {
                            text: that.getValue('title') + ' ' + that.getValue('url')
                        };
                        that.urlSharer(shareUrl, params, true);
                    },
                    viber: function () {
                        shareUrl = 'viber://forward';
                        params = {text: that.getValue('title') + ' ' + that.getValue('url')};
                        that.urlSharer(shareUrl, params, true);
                    },
                    line: function () {
                        var text = that.getValue('title') + ' ' + that.getValue('url');
                        shareUrl = 'http://line.me/R/msg/text/?' + encodeURIComponent(text);
                        that.urlSharer(shareUrl, {}, true);
                    },
                    pinterest: function () {
                        shareUrl = 'https://www.pinterest.com/pin/create/button/';
                        params = {url: that.getValue('url')};
                        that.urlSharer(shareUrl, params);
                    },
                    tumblr: function () {
                        shareUrl = 'http://tumblr.com/widgets/share/tool';
                        params = {
                            canonicalUrl: that.getValue('url'),
                            content: that.getValue('url'),
                            posttype: 'link',
                            title: that.getValue('title'),
                            caption: that.getValue('caption'),
                            tags: that.getValue('tags')
                        };
                        that.urlSharer(shareUrl, params);
                    },
                    hackernews: function () {
                        shareUrl = 'https://news.ycombinator.com/submitlink';
                        params = {
                            u: that.getValue('url'),
                            t: that.getValue('title')
                        };
                        that.urlSharer(shareUrl, params);
                    },
                    reddit: function () {
                        shareUrl = 'https://www.reddit.com/submit';
                        params = {'url': that.getValue('url')};
                        that.urlSharer(shareUrl, params);
                    },
                    vk: function () {
                        shareUrl = 'http://vk.com/share.php';
                        params = {
                            url: that.getValue('url'),
                            title: that.getValue('title'),
                            description: that.getValue('caption')
                        };
                        that.urlSharer(shareUrl, params);
                    },
                    xing: function() {
                        shareUrl = 'https://www.xing.com/app/user';
                        params = {
                            'op': 'share',
                            'url': that.getValue('url'),
                            'title': that.getValue('title')
                        };
                        that.urlSharer(shareUrl, params);
                    },
                    buffer: function() {
                        shareUrl = 'https://buffer.com/add';
                        params = {
                            url: that.getValue('url'),
                            title: that.getValue('title'),
                            via: that.getValue('twitter-username'),
                            picture: that.getValue('picture')
                        };
                        that.urlSharer(shareUrl, params);
                    },
                    instapaper: function() {
                        var text = that.getValue('title') + ' ' + that.getValue('url');
                        shareUrl = 'http://www.instapaper.com/text';
                        params = {
                            u: text
                        };
                        that.urlSharer(shareUrl, params, true);
                    },
                    pocket: function() {
                        shareUrl = 'https://getpocket.com/save';
                        params = {
                            url: that.getValue('url'),
                            title: that.getValue('title')
                        };
                        that.urlSharer(shareUrl, params);
                    },
                    digg: function() {
                        shareUrl = 'http://www.digg.com/submit';
                        params = {
                            url: that.getValue('url')
                        };
                        that.urlSharer(shareUrl, params);
                    },
                    stumbleupon: function() {
                        shareUrl = 'http://www.stumbleupon.com/submit';
                        params = {
                            url: that.getValue('url'),
                            title: that.getValue('title')
                        };
                        that.urlSharer(shareUrl, params);
                    },
                    flipboard: function() {
                        shareUrl = 'https://share.flipboard.com/bookmarklet/popout';
                        params = {
                            v: 2,
                            title: that.getValue('title'),
                            url: that.getValue('url'),
                            t: Date.now()
                        };
                        that.urlSharer(shareUrl, params);
                    },
                    default: function () {}
                };
            return (sharers[sharer] || sharers['default'])();
        },
        /**
         * @event urlSharer
         * @param {String} shareUrl
         * @param {Object} params
         * @param {Boolean} isLink - refers is the event will pop a new window or
         * just redirect to #shareUrl
         */
        urlSharer: function(shareUrl, params, isLink) {
            var p = typeof params === 'object' ? params : {},
                keys = Object.keys(p),
                i,
                str = keys.length > 0 ? '?' : '';
            for (i = 0; i < keys.length; i++) {
                if (str !== '?') {
                    str += '&';
                }
                str += keys[i] + '=' + encodeURIComponent(p[keys[i]]);
            }
            shareUrl += str;
            if (!isLink) {
                window.open(shareUrl, '', 'height=400,width=400,scrollbars=no');
            } else {
                window.location.href = shareUrl;
            }
        }
    };

    /**
     * Creates a click event on every DOM element which has the `sharer` class
     */
    window.addEventListener('load', function() {
        var elems = document.querySelectorAll('.sharer'),
            i,
            l = elems.length;

        function addShare(elem) {
            var target = elem.currentTarget || elem.srcElement;
            var sharer = new Sharer(target);
            sharer.share();
        }

        for (i = 0; i < l ; i++) {
            elems[i].addEventListener('click', addShare);
        }
    });
})(window, document);
