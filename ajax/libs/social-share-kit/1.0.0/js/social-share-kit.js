/*!
 * Social Share Kit v1.0.0 (http://socialsharekit.com)
 * Copyright 2015 Social Share Kit / Kaspars Sprogis.
 * Licensed under Creative Commons Attribution-NonCommercial 3.0 license:
 * https://github.com/darklow/social-share-kit/blob/master/LICENSE
 * ---
 */
var SocialShareKit = (function () {
    var els, options, supportsShare;

    function init(opts) {
        options = opts || {};
        supportsShare = /(twitter|facebook|google-plus|pinterest|tumblr|vk|linkedin|email)/;
        ready(function () {
            els = $(options.selector || '.ssk');
            if (!els.length)
                return;

            each(els, function (el) {
                if (!elSupportsShare(el)) {
                    return;
                }
                removeEventListener(el, 'click', onClick);
                addEventListener(el, 'click', onClick);
            })
        });
    }

    function ready(fn) {
        if (document.readyState != 'loading') {
            fn();
        } else if (document.addEventListener) {
            document.addEventListener('DOMContentLoaded', fn);
        } else {
            document.attachEvent('onreadystatechange', function () {
                if (document.readyState != 'loading')
                    fn();
            });
        }
    }

    function $(selector) {
        return document.querySelectorAll(selector);
    }

    function each(elements, fn) {
        for (var i = 0; i < elements.length; i++)
            fn(elements[i], i);
    }

    function addEventListener(el, eventName, handler) {
        if (el.addEventListener) {
            el.addEventListener(eventName, handler);
        } else {
            el.attachEvent('on' + eventName, function () {
                handler.call(el);
            });
        }
    }

    function removeEventListener(el, eventName, handler) {
        if (el.removeEventListener)
            el.removeEventListener(eventName, handler);
        else
            el.detachEvent('on' + eventName, handler);
    }

    function elSupportsShare(el) {
        return el.className.match(supportsShare);
    }

    function onClick(e) {
        var target = preventDefault(e),
            match = elSupportsShare(target), url;
        if (!match)
            return;

        url = getUrl(match[0], target);
        if (!url)
            return;
        if (match[0] != 'email') {
            winOpen(url);
        } else {
            document.location = url;
        }
    }

    function preventDefault(e) {
        var evt = e || window.event; // IE8 compatibility
        if (evt.preventDefault) {
            evt.preventDefault();
        } else {
            evt.returnValue = false;
            evt.cancelBubble = true;
        }
        return evt.target || evt.srcElement;
    }

    function winOpen(url) {
        var width = 575, height = 400,
            left = (document.documentElement.clientWidth / 2 - width / 2),
            top = (document.documentElement.clientHeight - height) / 2,
            opts = 'status=1,resizable=yes' +
                ',width=' + width + ',height=' + height +
                ',top=' + top + ',left=' + left;
        win = window.open(url, '', opts);
        win.focus();
        return win;
    }

    function getUrl(network, el) {
        var url, dataOpts = getDataOpts(network, el),
            shareUrl = dataOpts['url'] || window.location.href,
            shareUrlEnc = encodeURIComponent(shareUrl),
            title = dataOpts['title'] || document.title,
            text = dataOpts['text'] || getMetaContent('description'),
            image = dataOpts['image'], via = dataOpts['via'];
        switch (network) {
            case 'facebook':
                url = 'https://www.facebook.com/share.php?u=' + shareUrlEnc;
                break;
            case 'twitter':
                url = 'https://twitter.com/share?url=' + shareUrlEnc +
                '&text=' + encodeURIComponent(title + ' - ' + text);
                via = via || getMetaContent('twitter:site');
                if (via)
                    url += '&via=' + via.replace('@', '');
                break;
            case 'google-plus':
                url = 'https://plus.google.com/share?url=' + shareUrlEnc;
                break;
            case 'pinterest':
                url = 'http://pinterest.com/pin/create/button/?url=' + shareUrlEnc +
                '&description=' + encodeURIComponent(text);
                image = image || getMetaContent('og:image');
                if (image)
                    url += '&media=' + encodeURIComponent(image);
                break;
            case 'tumblr':
                url = 'http://www.tumblr.com/share/link?url=' + shareUrlEnc +
                '&name=' + encodeURIComponent(title) +
                '&description=' + encodeURIComponent(text);
                break;
            case 'linkedin':
                url = 'http://www.linkedin.com/shareArticle?mini=true&url=' + shareUrlEnc +
                '&title=' + encodeURIComponent(title) +
                '&summary=' + encodeURIComponent(text);
                break;
            case 'vk':
                url = 'http://vkontakte.ru/share.php?url=' + shareUrlEnc;
                break;
            case 'email':
                url = 'mailto:?subject=' + title +
                '&body=' + encodeURIComponent(title + '\n' + shareUrl + '\n\n' + text + '\n');
                break;
        }
        return url;
    }

    function getMetaContent(tagName, attr) {
        var text, tag = $('meta[' + (attr ? attr : tagName.indexOf('og:') === 0 ? 'property' : 'name') + '="' + tagName + '"]');
        if (tag.length) {
            text = tag[0].getAttribute('content') || '';
        }
        return text || ''
    }

    function getDataOpts(network, el) {
        var validOpts = ['url', 'title', 'text', 'image'],
            opts = {}, optValue, optKey, dataKey, a, parent = el.parentNode;
        network == 'twitter' && validOpts.push('via');
        for (a in validOpts) {
            optKey = validOpts[a];
            dataKey = 'data-' + optKey;
            optValue = el.getAttribute(dataKey) || parent.getAttribute(dataKey) ||
            (options[network] && options[network][optKey] ? options[network][optKey] : options[optKey]);
            if (optValue) {
                opts[optKey] = optValue;
            }
        }
        return opts;
    }

    return {
        init: init
    };
})();

window.SocialShareKit = SocialShareKit;
