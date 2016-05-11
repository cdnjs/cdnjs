/*! Lity - v1.6.6 - 2016-04-22
* http://sorgalla.com/lity/
* Copyright (c) 2016 Jan Sorgalla; Licensed MIT */
(function(window, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], function($) {
            return factory(window, $);
        });
    } else if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory(window, require('jquery'));
    } else {
        window.lity = factory(window, window.jQuery || window.Zepto);
    }
}(typeof window !== "undefined" ? window : this, function(window, $) {
    'use strict';

    var document = window.document;

    var _win = $(window);
    var _html = $('html');
    var _instanceCount = 0;

    var _imageRegexp = /(^data:image\/)|(\.(png|jpe?g|gif|svg|webp|bmp|ico|tiff?)(\?\S*)?$)/i;
    var _youtubeRegex = /(youtube(-nocookie)?\.com|youtu\.be)\/(watch\?v=|v\/|u\/|embed\/?)?([\w-]{11})(.*)?/i;
    var _vimeoRegex =  /(vimeo(pro)?.com)\/(?:[^\d]+)?(\d+)\??(.*)?$/;
    var _googlemapsRegex = /((maps|www)\.)?google\.([^\/\?]+)\/?((maps\/?)?\?)(.*)/i;

    var _defaultHandlers = {
        image: imageHandler,
        inline: inlineHandler,
        iframe: iframeHandler
    };

    var _defaultOptions = {
        esc: true,
        handler: null,
        template: '<div class="lity" tabindex="-1"><div class="lity-wrap" data-lity-close><div class="lity-loader">Loading...</div><div class="lity-container"><div class="lity-content"></div><button class="lity-close" type="button" title="Close (Esc)" data-lity-close>×</button></div></div></div>'
    };

    function globalToggle() {
        _html[_instanceCount > 0 ? 'addClass' : 'removeClass']('lity-active');
    }

    var transitionEndEvent = (function() {
        var el = document.createElement('div');

        var transEndEventNames = {
            WebkitTransition: 'webkitTransitionEnd',
            MozTransition: 'transitionend',
            OTransition: 'oTransitionEnd otransitionend',
            transition: 'transitionend'
        };

        for (var name in transEndEventNames) {
            if (el.style[name] !== undefined) {
                return transEndEventNames[name];
            }
        }

        return false;
    })();

    function transitionEnd(element) {
        var deferred = $.Deferred();

        if (!transitionEndEvent) {
            deferred.resolve();
        } else {
            element.one(transitionEndEvent, deferred.resolve);
            setTimeout(deferred.resolve, 500);
        }

        return deferred.promise();
    }

    function settings(currSettings, key, value) {
        if (arguments.length === 1) {
            return $.extend({}, currSettings);
        }

        if (typeof key === 'string') {
            if (typeof value === 'undefined') {
                return typeof currSettings[key] === 'undefined' ?
                    null :
                    currSettings[key];
            }
            currSettings[key] = value;
        } else {
            $.extend(currSettings, key);
        }

        return this;
    }

    function parseQueryParams(params){
        var pairs = decodeURI(params).split('&');
        var obj = {}, p;

        for (var i = 0, n = pairs.length; i < n; i++) {
            if (!pairs[i]) {
                continue;
            }

            p = pairs[i].split('=');
            obj[p[0]] = p[1];
        }

        return obj;
    }

    function appendQueryParams(url, params) {
        return url + (url.indexOf('?') > -1 ? '&' : '?') + $.param(params);
    }

    function error(msg) {
        return $('<span class="lity-error"/>').append(msg);
    }

    function imageHandler(target) {
        if (!_imageRegexp.test(target)) {
            return false;
        }

        var img = $('<img src="' + target + '">');
        var deferred = $.Deferred();
        var failed = function() {
            deferred.reject(error('Failed loading image'));
        };

        img
            .on('load', function() {
                if (this.naturalWidth === 0) {
                    return failed();
                }

                deferred.resolve(img);
            })
            .on('error', failed)
        ;

        return deferred.promise();
    }

    function inlineHandler(target) {
        var el;

        try {
            el = $(target);
        } catch (e) {
            return false;
        }

        if (!el.length) {
            return false;
        }

        var placeholder = $('<span style="display:none !important" class="lity-inline-placeholder"/>');

        return el
            .after(placeholder)
            .on('lity:ready', function(e, instance) {
                instance.one('lity:remove', function() {
                    placeholder
                        .before(el.addClass('lity-hide'))
                        .remove()
                    ;
                });
            })
        ;
    }

    function iframeHandler(target) {
        var matches, url = target;

        matches = _youtubeRegex.exec(target);

        if (matches) {
            url = appendQueryParams(
                'https://www.youtube' + (matches[2] || '') + '.com/embed/' + matches[4],
                $.extend(
                    {
                        autoplay: 1
                    },
                    parseQueryParams(matches[5] || '')
                )
            );
        }

        matches = _vimeoRegex.exec(target);

        if (matches) {
            url = appendQueryParams(
                'https://player.vimeo.com/video/' + matches[3],
                $.extend(
                    {
                        autoplay: 1
                    },
                    parseQueryParams(matches[4] || '')
                )
            );
        }

        matches = _googlemapsRegex.exec(target);

        if (matches) {
            url = appendQueryParams(
                'https://www.google.' + matches[3] + '/maps?' + matches[6],
                {
                    output: matches[6].indexOf('layer=c') > 0 ? 'svembed' : 'embed'
                }
            );
        }

        return '<div class="lity-iframe-container"><iframe frameborder="0" allowfullscreen src="' + url + '"></iframe></div>';
    }

    function lity(options) {
        var _options = {},
            _handlers = {},
            _instance,
            _content,
            _ready = $.Deferred().resolve();

        function keyup(e) {
            if (e.keyCode === 27) {
                close();
            }
        }

        function resize() {
            var height = document.documentElement.clientHeight ? document.documentElement.clientHeight : Math.round(_win.height());

            _content
                .css('max-height', Math.floor(height) + 'px')
                .trigger('lity:resize', [_instance])
            ;
        }

        function ready(el, content) {
            if (!_instance) {
                return;
            }

            _content = $(content);

            _win.on('resize', resize);
            resize();

            _instance
                .find('.lity-loader')
                .each(function() {
                    var el = $(this);
                    transitionEnd(el).always(function() {
                        el.remove();
                    });
                })
            ;

            _instance
                .removeClass('lity-loading')
                .find('.lity-content')
                .empty()
                .append(_content)
            ;

            _content
                .removeClass('lity-hide')
                .trigger('lity:ready', [_instance, el])
            ;

            _ready.resolve();
        }

        function init(handler, content, options, el) {
            _ready = $.Deferred();

            _instanceCount++;
            globalToggle();

            _instance = $(options.template)
                .addClass('lity-loading')
                .appendTo('body');

            if (!!options.esc) {
                _win.on('keyup', keyup);
            }

            setTimeout(function() {
                _instance
                    .addClass('lity-opened lity-' + handler)
                    .on('click', '[data-lity-close]', function(e) {
                        if ($(e.target).is('[data-lity-close]')) {
                            close();
                        }
                    })
                    .trigger('lity:open', [_instance, el])
                ;

                $.when(content).always($.proxy(ready, null, el));
            }, 0);
        }

        function open(target, options, el) {
            var handler, content, handlers = $.extend({}, _defaultHandlers, _handlers);

            options = $.extend(
                {},
                _defaultOptions,
                _options,
                options
            );

            if (options.handler && handlers[options.handler]) {
                content = handlers[options.handler](target, popup);
                handler = options.handler;
            } else {
                var lateHandlers = {};

                // Run inline and iframe handlers after all other handlers
                $.each(['inline', 'iframe'], function(i, name) {
                    if (handlers[name]) {
                        lateHandlers[name] = handlers[name];
                    }

                    delete handlers[name];
                });

                var call = function(name, callback) {
                    // Handler might be "removed" by setting callback to null
                    if (!callback) {
                        return true;
                    }

                    content = callback(target, popup);

                    if (!!content) {
                        handler = name;
                        return false;
                    }
                };

                $.each(handlers, call);

                if (!handler) {
                    $.each(lateHandlers, call);
                }
            }

            if (content) {
                $.when(close()).done($.proxy(init, null, handler, content, options, el));
            }

            return !!content;
        }

        function close() {
            if (!_instance) {
                return;
            }

            var deferred = $.Deferred();

            _ready.done(function() {
                _instanceCount--;
                globalToggle();

                _win
                    .off('resize', resize)
                    .off('keyup', keyup)
                ;

                _content.trigger('lity:close', [_instance]);

                _instance
                    .removeClass('lity-opened')
                    .addClass('lity-closed')
                ;

                var instance = _instance, content = _content;
                _instance = null;
                _content = null;

                transitionEnd(content.add(instance)).always(function() {
                    content.trigger('lity:remove', [instance]);
                    instance.remove();
                    deferred.resolve();
                });
            });

            return deferred.promise();
        }

        function popup(event) {
            // If not an event, act as alias of popup.open
            if (!event.preventDefault) {
                return popup.open(event);
            }

            var el = $(this);
            var target = el.data('lity-target') || el.attr('href') || el.attr('src');

            if (!target) {
                return;
            }

            var options = el.data('lity-options') || el.data('lity');

            if (open(target, options, el)) {
                el.blur();
                event.preventDefault();
            }
        }

        popup.handlers = $.proxy(settings, popup, _handlers);
        popup.options = $.proxy(settings, popup, _options);

        popup.open = function(target, options, el) {
            open(target, options, el);
            return popup;
        };

        popup.close = function() {
            close();
            return popup;
        };

        return popup.options(options);
    }

    lity.version = '1.6.6';
    lity.handlers = $.proxy(settings, lity, _defaultHandlers);
    lity.options = $.proxy(settings, lity, _defaultOptions);

    $(document).on('click', '[data-lity]', lity());

    return lity;
}));
