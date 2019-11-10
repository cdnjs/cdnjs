/**
 * Sharer.js
 *
 * @file Tiny js lib to create a simple share component. No deps.
 * @version 0.2.3
 * @author Ellison Leao <ellisonleao@gmail.com>
 *
 */

;(function (window, document) {
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
            var val = this.elem.getAttribute(attr);
            return (val === undefined || val === null) ? '' : val;
        },

        /**
         * @event share
         * @description Main share event. Will pop a window or redirect to a link
         * based on the data-sharer attribute.
         */
        share: function() {
            var sharer = this.elem.getAttribute('data-sharer'),
                shareUrl,
                params;
            switch (sharer) {
                case 'facebook':
                    shareUrl = 'https://www.facebook.com/sharer/sharer.php',
                    params = {
                        u: this.getValue('data-url')
                     };
                    this.urlSharer(shareUrl, params);
                    break;
                case 'googleplus':
                    shareUrl = 'https://plus.google.com/share',
                    params = {
                        url: this.getValue('data-url')
                     };
                    this.urlSharer(shareUrl, params);
                    break;
                case 'linkedin':
                    shareUrl = 'https://www.linkedin.com/shareArticle',
                    params = {
                        url: this.getValue('data-url'),
                        mini: true
                    };
                    this.urlSharer(shareUrl, params);
                    break;
                case 'twitter':
                    shareUrl = 'https://twitter.com/intent/tweet/',
                    params = {
                        text: this.getValue('data-title'),
                        url: this.getValue('data-url')
                    };
                    this.urlSharer(shareUrl, params);
                    break;
                case 'email':
                    var to = this.getValue('data-to'),
                        subject = this.getValue('data-subject'),
                        body = subject + '\n'+ this.getValue('data-title') + '\n' + this.getValue('data-url');
                        params = to + '?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
                    window.location.href = "mailto:" + params;

                    break;
                case 'whatsapp':
                    shareUrl = 'whatsapp://send',
                    params = {
                        text: this.getValue('data-title') + ' ' + this.getValue('data-url')
                    };
                    this.urlSharer(shareUrl, params, true);
                    break;
                case 'telegram':
                    shareUrl = 'tg://msg_url',
                    params = {
                        text: this.getValue('data-title') + ' ' + this.getValue('data-url')
                    };
                    this.urlSharer(shareUrl, params, true);
                    break;
                case 'viber':
                    shareUrl = 'viber://forward',
                    params = {
                        text: this.getValue('data-title') + ' ' + this.getValue('data-url')
                    };
                    this.urlSharer(shareUrl, params, true);
                    break;
                case 'pinterest':
                    shareUrl = 'https://www.pinterest.com/pin/create/button/',
                    params = {
                        url: this.getValue('data-url')
                     };
                    this.urlSharer(shareUrl, params);
                    break;
                case 'tumblr':
                    shareUrl = 'http://tumblr.com/widgets/share/tool',
                    params = {
                        canonicalUrl: this.getValue('data-url'),
                        content: this.getValue('data-url'),
                        posttype: 'link',
                        title: this.getValue('data-title'),
                        caption: this.getValue('data-caption'),
                        tags: this.getValue('data-tags')
                    };
                    this.urlSharer(shareUrl, params);
                    break;
                case 'hackernews':
                    shareUrl = 'https://news.ycombinator.com/submitlink',
                    params = {
                        u: this.getValue('data-url'),
                        t: this.getValue('data-title')
                    };
                    this.urlSharer(shareUrl, params);
                    break;
                case 'reddit':
                    shareUrl = 'https://www.reddit.com/submit',
                    params = {
                        'url': this.getValue('data-url')
                    };
                    this.urlSharer(shareUrl, params);
                    break;
                case 'vk':
                    shareUrl = 'http://vk.com/share.php',
                    params = {
                        url: this.getValue('data-url'),
                        title: this.getValue('data-title'),
                        description: this.getValue('data-caption')
                    };
                    this.urlSharer(shareUrl, params);
                    break;
                default:
                    break;
            }
        },
        /**
         * @event urlSharer
         * @param {String} shareUrl
         * @param {Object} params
         * @param {Boolean} isLink - refers is the event will pop a new window or
         * just redirect to #shareUrl
         */
        urlSharer: function(shareUrl, params, isLink) {
            var params = typeof params === 'object' ? params : {},
                keys = Object.keys(params),
                i,
                str = '?';
            for (i = 0; i < keys.length; i++) {
                if (str !== '?') {
                    str += '&';
                }
                str += keys[i] + '=' + encodeURIComponent(params[keys[i]]);
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

        for (i = 0; i < l ; i++) {
            elems[i].addEventListener('click', function(){
                var sharer = new Sharer(this);
                sharer.share();
            });
        }
    });
})(window, document);
