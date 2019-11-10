/*! Lity - v0.1.1 - 2015-02-25
* http://sorgalla.com/lity/
* Copyright (c) 2015 Jan Sorgalla; Licensed MIT */
(function(window, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'imagesloaded'], function($, imagesLoaded) {
            return factory(window, $, imagesLoaded);
        });
    } else if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory(window, require('jquery'), require('imagesloaded'));
    } else {
        window.lity = factory(window, window.jQuery || window.Zepto, window.imagesLoaded);
    }
}(window, function(window, $, imagesLoaded) {
    'use strict';

    var document = window.document;

    var _win = $(window);

    var _imageRegexp = /\.(png|jpg|jpeg|gif|tiff|bmp)(\?\S*)?$/i;
    var _iframeRegexp = /^([a-z]+:)?\/\//i;
    var _youtubeIdRegex = /v=([^&]+)/;
    var _vimeoIdRegex = /\/([^\?&]+)$/;

    var _defaultHandlers = {
        image: imageHandler,
        iframe: iframeHandler,
        inline: inlineHandler
    };

    var _defaultOptions = {
    };

    var transitionEndEvent = (function() {
        var el = document.createElement('div');

        var transEndEventNames = {
            WebkitTransition : 'webkitTransitionEnd',
            MozTransition : 'transitionend',
            OTransition : 'oTransitionEnd otransitionend',
            transition : 'transitionend'
        };

        for (var name in transEndEventNames) {
            if (el.style[name] !== undefined) {
                return transEndEventNames[name];
            }
        }

        return false;
    })();

    function transitionEnd(element, callback) {
        if (!transitionEndEvent) {
            callback();
        } else {
            var cb = function() {
                    callback();
                    callback = function(){};
                }
            ;

            element.one(transitionEndEvent, cb);
            setTimeout(cb, 500);
        }
    }

    var _html = '<div class="lity lity-loading" tabindex="-1">\
                    <div class="lity-wrap" data-lity-close>\
                        <div class="lity-loader">Loading...</div>\
                        <div class="lity-container">\
                            <div class="lity-content"></div>\
                            <button class="lity-close" type="button" title="Close (Esc)" data-lity-close>×</button>\
                         </div>\
                     </div>\
                 </div>\
                ';

    function settings(settings, key, value) {
        if (arguments.length === 1) {
            return $.extend({}, settings);
        }

        if (typeof key === 'string') {
            if (typeof value === 'undefined') {
                return typeof settings[key] === 'undefined' ?
                    null :
                    settings[key];
            }
            settings[key] = value;
        } else {
            $.extend(settings, key);
        }

        return this;
    }

    function protocol() {
        return 'file:' === window.location.protocol ? 'http:' : '';
    }

    function imageHandler(target, instance) {
        if (!_imageRegexp.test(target)) {
            return false;
        }

        var img = $('<img src="' + target + '">');
        var deferred = $.Deferred();

        instance
            .on('lity:resize', function(e, height) {
                img.css('max-height', Math.floor(height) + 'px');
            });

        imagesLoaded(img.get(0), function() {
            deferred.resolve(img);
        });

        return deferred.promise();
    }

    function iframeHandler(target) {
        if (!_iframeRegexp.test(target)) {
            return false;
        }

        var id;

        if (target.indexOf('youtube.') > -1 && target.indexOf('/embed') < 0) {
            id = _youtubeIdRegex.exec(target)[1];
            target = protocol() + '//www.youtube.com/embed/' + id + '?autoplay=1';
        }

        if (target.indexOf('vimeo.') > -1 && target.indexOf('player.vimeo.') < 0) {
            id = _vimeoIdRegex.exec(target.split('//')[1])[1];
            target = protocol() + '//player.vimeo.com/video/' + id + '?autoplay=1';
        }

        if (target.indexOf('//maps.google.') > -1 && target.indexOf('output=embed') < 0) {
            target += '&output=embed';
        }

        return '<div class="lity-iframe-container">\
                    <iframe frameborder="0" allowfullscreen src="'+target+'"></iframe>\
                </div>';
    }

    function inlineHandler(target) {
        try {
            return $(target).clone();
        } catch (e) {
            return false;
        }
    }

    function create(options) {
        var _options = $.extend({}, _defaultOptions),
            _handlers = $.extend({}, _defaultHandlers),
            _instance;

        function ready(content) {
            _instance && _instance
                .find('.lity-loader')
                .each(function() {
                    var el = $(this);
                    transitionEnd(el, function() {
                        el.remove();
                    });
                })
                .end()
                .removeClass('lity-loading')
                .find('.lity-content')
                .empty()
                .append($(content).removeClass('lity-hide'))
                .trigger('lity:ready', [content, popup])
            ;
        }

        function resize() {
            if (!_instance) {
                return;
            }

            var height = document.documentElement.clientHeight ? document.documentElement.clientHeight : Math.round(_win.height());

            _instance.trigger('lity:resize', [height]);
        }

        function init(instance, handler, content) {
            _instance = instance.appendTo('body');

            setTimeout(function() {
                _instance
                    .addClass('lity-opened lity-' + handler)
                    .on('click', '[data-lity-close]', function(e) {
                        $(e.target).is('[data-lity-close]') && close();
                    })
                    .trigger('lity:open', [popup])
                ;

                _win.on('resize', resize);
                resize();

                $.when(content).done(ready);
            }, 0);
        }

        function open(target) {
            var instance = $(_html), handler, content;

            if (_options.handler && _handlers[_options.handler]) {
                content = _handlers[_options.handler](target, instance, popup);
                handler = _options.handler;
            } else {
                var handlers = $.extend({}, _handlers), lateHandlers = {};

                // Run iframe and inline handlers after all other handlers
                $.each(['iframe', 'inline'], function(i, name) {
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

                    content = callback(target, instance, popup);

                    if (!!content) {
                        handler = name;
                        return false;
                    }
                };

                $.each(handlers, call);
                !handler && $.each(lateHandlers, call);
            }

            if (content) {
                $.when(close()).done(function() {
                    init(instance, handler, content);
                });
            }

            return !!content;
        }

        function close() {
            if (!_instance) {
                return;
            }

            _win.off('resize', resize);

            _instance
                .trigger('lity:close', [popup])
                .removeClass('lity-opened')
                .addClass('lity-closed')
            ;

            var instance = _instance;
            _instance = null;

            var deferred = $.Deferred(),
                done = function() {
                    instance.remove();
                    deferred.resolve();
                };

            transitionEnd(instance, done);

            return deferred.promise();
        }

        function popup(eventOrTarget) {
            var target, isEvent = eventOrTarget && !!eventOrTarget.preventDefault;

            if (!isEvent) {
                target = eventOrTarget;
            }

            if (!target) {
                var el = $(this);
                target = el.attr('data-lity-target') || el.attr('href') || el.attr('src');
                popup.options(el.data('lity-options') || el.data('lity') || {});
            }

            if (!target) {
                return;
            }

            if (open(target)) {
                if (isEvent) {
                    eventOrTarget.preventDefault();
                }
            }
        }

        popup.handlers = settings.bind(popup, _handlers);
        popup.options = settings.bind(popup, _options);

        popup.close = function() {
            close();
            return popup;
        };

        return popup.options(options);
    }

    var lity = function(options) {
        return create(options);
    };

    lity.version = '0.0.1';
    lity.handlers = settings.bind(lity, _defaultHandlers);
    lity.options = settings.bind(lity, _defaultOptions);

    $(document).on('click', '[data-lity]', create());

    return lity;
}));
