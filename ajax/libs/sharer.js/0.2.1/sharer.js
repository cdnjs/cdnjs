/*
 * sharer.js
 *
 * Tiny js lib to create a simple share component. No deps.
 * Version: 0.2.1
 * Author: Ellison Leao
 *
 */

;(function (window, document) {
    'use strict';
    var Sharer = function(elem) {
        this.elem = elem;
    };

    Sharer.prototype = {
        getValue: function(attr) {
            var val = this.elem.getAttribute(attr);
            return (val === undefined || val === null) ? '' : val;
        },

        share: function() {
            var sharer = this.elem.getAttribute('data-sharer');
            switch (sharer) {
                case 'facebook':
                    var shareUrl = 'http://www.facebook.com/sharer/sharer.php',
                        params = {
                            u: this.getValue('data-url')
                         };
                    this.urlSharer(shareUrl, params);
                    break;
                case 'googleplus':
                    var shareUrl = 'https://plus.google.com/share',
                        params = {
                            url: this.getValue('data-url')
                         };
                    this.urlSharer(shareUrl, params);
                    break;
                case 'linkedin':
                    var shareUrl = 'https://www.linkedin.com/shareArticle',
                        params = {
                            url: this.getValue('data-url'),
                            mini: true
                        }
                    this.urlSharer(shareUrl, params);
                    break;
                case 'twitter':
                    var shareUrl = 'https://twitter.com/intent/tweet/',
                        params = {
                            text: this.getValue('data-title'),
                            url: this.getValue('data-url')
                        };
                    this.urlSharer(shareUrl, params);
                    break;
                case 'email':
                    this.email();
                    break;
                case 'whatsapp':
                    var shareUrl = 'whatsapp://send',
                        title = this.getValue('data-title'),
                        params = {
                            text: title + ' ' + this.getValue('data-url')
                         };
                    this.urlSharer(shareUrl, params, true);
                    break;
                case 'telegram':
                    var shareUrl = 'tg://msg_url',
                        title = this.getValue('data-title'),
                        params = {
                            text: title + ' ' + this.getValue('data-url')
                         };
                    this.urlSharer(shareUrl, params, true);
                    break;
                case 'viber':
                    var shareUrl = 'viber://forward',
                        title = this.getValue('data-title'),
                        params = {
                            text: title + ' ' + this.getValue('data-url')
                         };
                    this.urlSharer(shareUrl, params, true);
                    break;
                default:
                    break;
            }
        },

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
        },

        email: function() {
            var to = this.getValue('data-to'),
                subject = this.getValue('data-subject'),
                body = subject + '\n'+ this.getValue('data-title') + '\n' + this.getValue('data-url'),
                params = to + '?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
            window.location.href = "mailto:" + params;
        }
    }

    window.addEventListener('load', function() {
        var elems = document.querySelectorAll('.sharer'),
            i,
            l = elems.length;

        for (i = 0; i < l ; i++) {
            elems[i].addEventListener('click', function(){
                var sharer = new Sharer(this);
                sharer.share();
            }, false);
        }
    });
})(window, document);
