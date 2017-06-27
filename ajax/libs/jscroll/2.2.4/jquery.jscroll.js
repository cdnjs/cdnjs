/*!
 * jScroll - jQuery Plugin for Infinite Scrolling / Auto-Paging - v2.2.4
 * http://jscroll.com/
 *
 * Copyright 2011-2013, Philip Klauzinski
 * http://klauzinski.com/
 * Dual licensed under the MIT and GPL Version 2 licenses.
 * http://jscroll.com/#license
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
 *
 * @author Philip Klauzinski
 * @requires jQuery v1.4.3+
 */
(function($) {

    // Define the jscroll namespace and default settings
    $.jscroll = {
        defaults: {
            debug: false,
            autoTrigger: true,
            autoTriggerUntil: false,
            loadingHtml: '<small>Loading...</small>',
            padding: 0,
            nextSelector: 'a:last',
            contentSelector: '',
            pagingSelector: '',
            callback: false
        }
    };

    // Constructor
    var jScroll = function($e, options) {

        // Private vars
        var _data = $e.data('jscroll'),
            _userOptions = (typeof options === 'function') ? { callback: options } : options,
            _options = $.extend({}, $.jscroll.defaults, _userOptions, _data || {}),
            _isWindow = ($e.css('overflow-y') === 'visible'),
            _$next = $e.find(_options.nextSelector).first(),
            _$window = $(window),
            _$body = $('body'),
            _$scroll = _isWindow ? _$window : $e,
            _nextHref = $.trim(_$next.attr('href') + ' ' + _options.contentSelector);

        // Initialization
        $e.data('jscroll', $.extend({}, _data, {initialized: true, waiting: false, nextHref: _nextHref}));
        _wrapInnerContent();
        _preloadImage();
        _setBindings();

        // Private methods

        // Check if a loading image is defined and preload
        function _preloadImage() {
            var src = $(_options.loadingHtml).filter('img').attr('src');
            if (src) {
                var image = new Image();
                image.src = src;
            }
        }

        // Wrapper inner content, if it isn't already
        function _wrapInnerContent() {
            if (!$e.find('.jscroll-inner').length) {
                $e.contents().wrapAll('<div class="jscroll-inner" />');
            }
        }

        // Find the next link's parent, or add one, and hide it
        function _nextWrap($next) {
            if (_options.pagingSelector) {
                var $parent = $next.closest(_options.pagingSelector).hide();
            } else {
                var $parent = $next.parent().not('.jscroll-inner,.jscroll-added').addClass('jscroll-next-parent').hide();
                if (!$parent.length) {
                    $next.wrap('<div class="jscroll-next-parent" />').parent().hide();
                }
            }
        }

        // Remove the jscroll behavior and data from an element
        function _destroy() {
            return _$scroll.unbind('.jscroll')
                .removeData('jscroll')
                .find('.jscroll-inner').children().unwrap()
                .filter('.jscroll-added').children().unwrap();
        }

        // Observe the scroll event for when to trigger the next load
        function _observe() {
            _wrapInnerContent();
            var $inner = $e.find('div.jscroll-inner').first(),
                data = $e.data('jscroll'),
                borderTopWidth = parseInt($e.css('borderTopWidth')),
                borderTopWidthInt = isNaN(borderTopWidth) ? 0 : borderTopWidth,
                iContainerTop = parseInt($e.css('paddingTop')) + borderTopWidthInt,
                iTopHeight = _isWindow ? _$scroll.scrollTop() : $e.offset().top,
                innerTop = $inner.length ? $inner.offset().top : 0,
                iTotalHeight = Math.ceil(iTopHeight - innerTop + _$scroll.height() + iContainerTop);

            if (!data.waiting && iTotalHeight + _options.padding >= $inner.outerHeight()) {
                //data.nextHref = $.trim(data.nextHref + ' ' + _options.contentSelector);
                _debug('info', 'jScroll:', $inner.outerHeight() - iTotalHeight, 'from bottom. Loading next request...');
                return _load();
            }
        }

        // Check if the href for the next set of content has been set
        function _checkNextHref(data) {
            data = data || $e.data('jscroll');
            if (!data || !data.nextHref) {
                _debug('warn', 'jScroll: nextSelector not found - destroying');
                _destroy();
                return false;
            } else {
                _setBindings();
                return true;
            }
        }

        function _setBindings() {
            var $next = $e.find(_options.nextSelector).first();
            if (_options.autoTrigger && (_options.autoTriggerUntil === false || _options.autoTriggerUntil > 0)) {
                _nextWrap($next);
                if (_$body.height() <= _$window.height()) {
                    _observe();
                }
                _$scroll.unbind('.jscroll').bind('scroll.jscroll', function() {
                    return _observe();
                });
                if (_options.autoTriggerUntil > 0) {
                    _options.autoTriggerUntil--;
                }
            } else {
                _$scroll.unbind('.jscroll');
                $next.bind('click.jscroll', function() {
                    _nextWrap($next);
                    _load();
                    return false;
                });
            }
        }

        // Load the next set of content, if available
        function _load() {
            var $inner = $e.find('div.jscroll-inner').first(),
                data = $e.data('jscroll');

            data.waiting = true;
            $inner.append('<div class="jscroll-added" />')
                .children('.jscroll-added').last()
                .html('<div class="jscroll-loading">' + _options.loadingHtml + '</div>');

            return $e.animate({scrollTop: $inner.outerHeight()}, 0, function() {
                $inner.find('div.jscroll-added').last().load(data.nextHref, function(r, status, xhr) {
                    if (status === 'error') {
                        return _destroy();
                    }
                    var $next = $(this).find(_options.nextSelector).first();
                    data.waiting = false;
                    data.nextHref = $next.attr('href') ? $.trim($next.attr('href') + ' ' + _options.contentSelector) : false;
                    $('.jscroll-next-parent', $e).remove(); // Remove the previous next link now that we have a new one
                    _checkNextHref();
                    if (_options.callback) {
                        _options.callback.call(this);
                    }
                    _debug('dir', data);
                });
            });
        }

        // Safe console debug - http://klauzinski.com/javascript/safe-firebug-console-in-javascript
        function _debug(m) {
            if (_options.debug && typeof console === 'object' && (typeof m === 'object' || typeof console[m] === 'function')) {
                if (typeof m === 'object') {
                    var args = [];
                    for (var sMethod in m) {
                        if (typeof console[sMethod] === 'function') {
                            args = (m[sMethod].length) ? m[sMethod] : [m[sMethod]];
                            console[sMethod].apply(console, args);
                        } else {
                            console.log.apply(console, args);
                        }
                    }
                } else {
                    console[m].apply(console, Array.prototype.slice.call(arguments, 1));
                }
            }
        }

        // Expose API methods via the jQuery.jscroll namespace, e.g. $('sel').jscroll.method()
        $.extend($e.jscroll, {
            destroy: _destroy
        });
        return $e;
    };

    // Define the jscroll plugin method and loop
    $.fn.jscroll = function(m) {
        return this.each(function() {
            var $this = $(this),
                data = $this.data('jscroll');
            // Instantiate jScroll on this element if it hasn't been already
            if (data && data.initialized) return;
            var jscroll = new jScroll($this, m);
        });
    };
})(jQuery);