/*!
 * # Fomantic-UI 2.9.3 - Sidebar
 * https://github.com/fomantic/Fomantic-UI/
 *
 *
 * Released under the MIT license
 * https://opensource.org/licenses/MIT
 *
 */

(function ($, window, document) {
    'use strict';

    function isFunction(obj) {
        return typeof obj === 'function' && typeof obj.nodeType !== 'number';
    }

    window = window !== undefined && window.Math === Math
        ? window
        : globalThis;

    $.fn.sidebar = function (parameters) {
        var
            $allModules     = $(this),
            $window         = $(window),
            $document       = $(document),
            $body           = $('body'),
            $html           = $('html'),
            $head           = $('head'),

            time            = Date.now(),
            performance     = [],

            query           = arguments[0],
            methodInvoked   = typeof query === 'string',
            queryArguments  = [].slice.call(arguments, 1),
            contextCheck    = function (context, win) {
                var $context;
                if ([window, document].indexOf(context) >= 0) {
                    $context = $body;
                } else {
                    $context = $(win.document).find(context);
                    if ($context.length === 0) {
                        $context = win.frameElement ? contextCheck(context, win.parent) : $body;
                    }
                }

                return $context;
            },
            returnedValue;

        $allModules.each(function () {
            var
                settings        = $.isPlainObject(parameters)
                    ? $.extend(true, {}, $.fn.sidebar.settings, parameters)
                    : $.extend({}, $.fn.sidebar.settings),

                selector        = settings.selector,
                className       = settings.className,
                namespace       = settings.namespace,
                regExp          = settings.regExp,
                error           = settings.error,

                eventNamespace  = '.' + namespace,
                moduleNamespace = 'module-' + namespace,

                $module         = $(this),
                $context        = contextCheck(settings.context, window),
                isBody          = $context[0] === $body[0],

                $sidebars       = $module.children(selector.sidebar),
                $fixed          = $context.children(selector.fixed),
                $pusher         = $context.children(selector.pusher),
                $style,

                element         = this,
                instance        = $module.data(moduleNamespace),

                elementNamespace,
                id,
                currentScroll,
                initialBodyMargin = '',
                tempBodyMargin = '',
                hadScrollbar = false,

                module
            ;

            module = {

                initialize: function () {
                    module.debug('Initializing sidebar', parameters);

                    module.create.id();

                    // avoids locking rendering if initialized in onReady
                    if (settings.delaySetup) {
                        requestAnimationFrame(module.setup.layout);
                    } else {
                        module.setup.layout();
                    }

                    requestAnimationFrame(function () {
                        module.setup.cache();
                    });

                    module.instantiate();
                },

                instantiate: function () {
                    module.verbose('Storing instance of module', module);
                    instance = module;
                    $module
                        .data(moduleNamespace, module)
                    ;
                },

                create: {
                    id: function () {
                        id = (Math.random().toString(16) + '000000000').slice(2, 10);
                        elementNamespace = '.' + id;
                        module.verbose('Creating unique id for element', id);
                    },
                },

                destroy: function () {
                    module.verbose('Destroying previous module for', $module);
                    $module
                        .off(eventNamespace)
                        .removeData(moduleNamespace)
                    ;
                    // bound by uuid
                    $context.off(elementNamespace);
                    $window.off(elementNamespace);
                    $document.off(elementNamespace);
                },

                event: {
                    clickaway: function (event) {
                        if (settings.closable) {
                            var
                                clickedInPusher = $pusher.find(event.target).length > 0 || $pusher.is(event.target),
                                clickedContext  = $context.is(event.target)
                            ;
                            if (clickedInPusher) {
                                module.verbose('User clicked on dimmed page');
                                module.hide();
                            }
                            if (clickedContext) {
                                module.verbose('User clicked on dimmable context (scaled out page)');
                                module.hide();
                            }
                        }
                    },
                    touch: function (event) {
                        // event.stopPropagation();
                    },
                    containScroll: function (event) {
                        if (element.scrollTop <= 0) {
                            element.scrollTop = 1;
                        }
                        if ((element.scrollTop + element.offsetHeight) >= element.scrollHeight) {
                            element.scrollTop = element.scrollHeight - element.offsetHeight - 1;
                        }
                    },
                    scroll: function (event) {
                        if ($(event.target).closest(selector.sidebar).length === 0) {
                            event.preventDefault();
                        }
                    },
                },

                bind: {
                    clickaway: function () {
                        module.verbose('Adding clickaway events to context', $context);
                        $context
                            .on('click' + elementNamespace, module.event.clickaway)
                            .on('touchend' + elementNamespace, module.event.clickaway)
                        ;
                    },
                    scrollLock: function () {
                        if (settings.scrollLock) {
                            module.debug('Disabling page scroll');
                            hadScrollbar = module.has.scrollbar();
                            if (hadScrollbar) {
                                module.save.bodyMargin();
                                module.set.bodyMargin();
                            }
                            $context.addClass(className.locked);
                        }
                        module.verbose('Adding events to contain sidebar scroll');
                        $document
                            .on('touchmove' + elementNamespace, module.event.touch)
                        ;
                        $module
                            .on('scroll' + eventNamespace, module.event.containScroll)
                        ;
                    },
                },
                unbind: {
                    clickaway: function () {
                        module.verbose('Removing clickaway events from context', $context);
                        $context.off(elementNamespace);
                    },
                    scrollLock: function () {
                        module.verbose('Removing scroll lock from page');
                        if (hadScrollbar) {
                            module.restore.bodyMargin();
                        }
                        $context.removeClass(className.locked);
                        $document.off(elementNamespace);
                        $module.off('scroll' + eventNamespace);
                    },
                },

                add: {
                    inlineCSS: function () {
                        var
                            width     = module.cache.width || $module.outerWidth(),
                            height    = module.cache.height || $module.outerHeight(),
                            isRTL     = module.is.rtl(),
                            direction = module.get.direction(),
                            distance  = {
                                left: width,
                                right: -width,
                                top: height,
                                bottom: -height,
                            },
                            style
                        ;

                        if (isRTL) {
                            module.verbose('RTL detected, flipping widths');
                            distance.left = -width;
                            distance.right = width;
                        }

                        style = '<style>';

                        if (direction === 'left' || direction === 'right') {
                            module.debug('Adding CSS rules for animation distance', width);
                            style += ''
                                + ' .ui.visible.' + direction + '.sidebar ~ .fixed,'
                                + ' .ui.visible.' + direction + '.sidebar ~ .pusher {'
                                + '           transform: translate3d(' + distance[direction] + 'px, 0, 0);'
                                + ' }';
                        } else if (direction === 'top' || direction === 'bottom') {
                            style += ''
                                + ' .ui.visible.' + direction + '.sidebar ~ .fixed,'
                                + ' .ui.visible.' + direction + '.sidebar ~ .pusher {'
                                + '           transform: translate3d(0, ' + distance[direction] + 'px, 0);'
                                + ' }';
                        }

                        /* IE is only browser not to create context with transforms */
                        /* https://www.w3.org/Bugs/Public/show_bug.cgi?id=16328 */
                        if (module.is.ie()) {
                            if (direction === 'left' || direction === 'right') {
                                module.debug('Adding CSS rules for animation distance', width);
                                style += ''
                                    + ' body.pushable > .ui.visible.' + direction + '.sidebar ~ .pusher::after {'
                                    + '           transform: translate3d(' + distance[direction] + 'px, 0, 0);'
                                    + ' }';
                            } else if (direction === 'top' || direction === 'bottom') {
                                style += ''
                                    + ' body.pushable > .ui.visible.' + direction + '.sidebar ~ .pusher::after {'
                                    + '           transform: translate3d(0, ' + distance[direction] + 'px, 0);'
                                    + ' }';
                            }
                            /* opposite sides visible forces content overlay */
                            style += ''
                                + ' body.pushable > .ui.visible.left.sidebar ~ .ui.visible.right.sidebar ~ .pusher::after,'
                                + ' body.pushable > .ui.visible.right.sidebar ~ .ui.visible.left.sidebar ~ .pusher::after {'
                                + '           transform: translate3d(0, 0, 0);'
                                + ' }';
                        }
                        style += '</style>';
                        $style = $(style)
                            .appendTo($head)
                        ;
                        module.debug('Adding sizing css to head', $style);
                    },
                },

                refresh: function () {
                    module.verbose('Refreshing selector cache');
                    $context = contextCheck(settings.context, window);
                    module.refreshSidebars();
                    $pusher = $context.children(selector.pusher);
                    $fixed = $context.children(selector.fixed);
                    module.clear.cache();
                },

                refreshSidebars: function () {
                    module.verbose('Refreshing other sidebars');
                    $sidebars = $context.children(selector.sidebar);
                },

                repaint: function () {
                    module.verbose('Forcing repaint event');
                    element.style.display = 'none';
                    var ignored = element.offsetHeight;
                    element.scrollTop = element.scrollTop; // eslint-disable-line no-self-assign
                    element.style.display = '';
                },

                setup: {
                    cache: function () {
                        module.cache = {
                            width: $module.outerWidth(),
                            height: $module.outerHeight(),
                        };
                    },
                    layout: function () {
                        if ($context.children(selector.pusher).length === 0) {
                            module.debug('Adding wrapper element for sidebar');
                            module.error(error.pusher);
                            $pusher = $('<div class="pusher" />');
                            $context
                                .children()
                                .not(selector.omitted)
                                .not($sidebars)
                                .wrapAll($pusher)
                            ;
                            module.refresh();
                        }
                        if ($module.nextAll(selector.pusher).length === 0 || $module.nextAll(selector.pusher)[0] !== $pusher[0]) {
                            module.debug('Moved sidebar to correct parent element');
                            module.error(error.movedSidebar, element);
                            $module.detach().prependTo($context);
                            module.refresh();
                        }
                        module.clear.cache();
                        module.set.pushable();
                        module.set.direction();
                    },
                },

                attachEvents: function (selector, event) {
                    var
                        $toggle = $(selector)
                    ;
                    event = isFunction(module[event])
                        ? module[event]
                        : module.toggle;
                    if ($toggle.length > 0) {
                        module.debug('Attaching sidebar events to element', selector, event);
                        $toggle
                            .on('click' + eventNamespace, event)
                        ;
                    } else {
                        module.error(error.notFound, selector);
                    }
                },
                can: {
                    leftBodyScrollbar: function () {
                        if (module.cache.leftBodyScrollbar === undefined) {
                            module.cache.leftBodyScrollbar = module.is.rtl() && ((module.is.iframe && !module.is.firefox()) || module.is.safari() || module.is.edge() || module.is.ie());
                        }

                        return module.cache.leftBodyScrollbar;
                    },
                },
                save: {
                    bodyMargin: function () {
                        initialBodyMargin = $context.css((isBody ? 'margin-' : 'padding-') + (module.can.leftBodyScrollbar() ? 'left' : 'right'));
                        var
                            bodyMarginRightPixel = parseInt(initialBodyMargin.replace(/[^\d.]/g, ''), 10),
                            bodyScrollbarWidth = isBody ? window.innerWidth - document.documentElement.clientWidth : $context[0].offsetWidth - $context[0].clientWidth
                        ;
                        tempBodyMargin = bodyMarginRightPixel + bodyScrollbarWidth;
                    },
                },
                show: function (callback) {
                    callback = isFunction(callback)
                        ? callback
                        : function () {};
                    if (module.is.hidden()) {
                        if (settings.onShow.call(element) === false) {
                            module.verbose('Show callback returned false cancelling show');

                            return;
                        }
                        if (settings.overlay) {
                            module.error(error.overlay);
                            settings.transition = 'overlay';
                        }
                        module.refresh();
                        if (module.othersActive()) {
                            module.debug('Other sidebars currently visible');
                            if (settings.exclusive) {
                                // if not overlay queue animation after hide
                                if (settings.transition !== 'overlay') {
                                    module.hideOthers(module.show);

                                    return;
                                }

                                module.hideOthers();
                            } else {
                                settings.transition = 'overlay';
                            }
                        }
                        module.set.dimmerStyles();
                        module.pushPage(function () {
                            callback.call(element);
                            settings.onVisible.call(element);
                        });
                        settings.onChange.call(element);
                    } else {
                        module.debug('Sidebar is already visible');
                    }
                },

                hide: function (callback) {
                    callback = isFunction(callback)
                        ? callback
                        : function () {};
                    if ((module.is.visible() || module.is.animating()) && settings.onHide.call(element) !== false) {
                        module.debug('Hiding sidebar', callback);
                        module.refreshSidebars();
                        module.pullPage(function () {
                            callback.call(element);
                            settings.onHidden.call(element);
                        });
                        settings.onChange.call(element);
                    }
                },

                othersAnimating: function () {
                    return $sidebars.not($module).filter('.' + className.animating).length > 0;
                },
                othersVisible: function () {
                    return $sidebars.not($module).filter('.' + className.visible).length > 0;
                },
                othersActive: function () {
                    return module.othersVisible() || module.othersAnimating();
                },

                hideOthers: function (callback) {
                    var
                        $otherSidebars = $sidebars.not($module).filter('.' + className.visible),
                        sidebarCount   = $otherSidebars.length,
                        callbackCount  = 0
                    ;
                    callback = callback || function () {};
                    $otherSidebars
                        .sidebar('hide', function () {
                            callbackCount++;
                            if (callbackCount === sidebarCount) {
                                callback();
                            }
                        })
                    ;
                },

                toggle: function () {
                    module.verbose('Determining toggled direction');
                    if (module.is.hidden()) {
                        module.show();
                    } else {
                        module.hide();
                    }
                },

                pushPage: function (callback) {
                    var
                        transition = module.get.transition(),
                        $transition = transition === 'overlay' || module.othersActive()
                            ? $module
                            : $pusher,
                        animate,
                        dim,
                        transitionEnd
                    ;
                    callback = isFunction(callback)
                        ? callback
                        : function () {};
                    if (settings.returnScroll) {
                        currentScroll = (isBody ? $window : $context).scrollTop();
                    }
                    if (settings.transition === 'scale down') {
                        module.scrollToTop();
                    }
                    module.bind.scrollLock();
                    module.set.transition(transition);
                    module.repaint();
                    animate = function () {
                        module.bind.clickaway();
                        module.add.inlineCSS();
                        module.set.animating();
                        module.set.visible();
                    };
                    dim = function () {
                        module.set.dimmed();
                    };
                    transitionEnd = function (event) {
                        if (event.target === $transition[0]) {
                            $transition.off('transitionend' + elementNamespace, transitionEnd);
                            module.remove.animating();
                            callback.call(element);
                        }
                    };
                    $transition.off('transitionend' + elementNamespace);
                    $transition.on('transitionend' + elementNamespace, transitionEnd);
                    requestAnimationFrame(animate);
                    if (settings.dimPage && !module.othersVisible()) {
                        requestAnimationFrame(dim);
                    }
                },

                pullPage: function (callback) {
                    var
                        transition = module.get.transition(),
                        $transition = transition === 'overlay' || module.othersActive()
                            ? $module
                            : $pusher,
                        animate,
                        transitionEnd
                    ;
                    callback = isFunction(callback)
                        ? callback
                        : function () {};
                    module.verbose('Removing context push state', module.get.direction());

                    module.unbind.clickaway();
                    module.unbind.scrollLock();

                    animate = function () {
                        module.set.transition(transition);
                        module.set.animating();
                        if (settings.dimPage && !module.othersVisible()) {
                            module.set.closing();
                        }
                        module.remove.visible();
                    };
                    transitionEnd = function (event) {
                        if (event.target === $transition[0]) {
                            $transition.off('transitionend' + elementNamespace, transitionEnd);
                            module.remove.animating();
                            module.remove.closing();
                            module.remove.transition();
                            module.remove.inlineCSS();
                            if (transition === 'scale down' || settings.returnScroll) {
                                module.scrollBack();
                            }
                            if (settings.dimPage && !module.othersVisible()) {
                                $pusher.removeClass(className.dimmed);
                            }
                            callback.call(element);
                        }
                    };
                    $transition.off('transitionend' + elementNamespace);
                    $transition.on('transitionend' + elementNamespace, transitionEnd);
                    requestAnimationFrame(animate);
                },

                scrollToTop: function () {
                    module.verbose('Scrolling to top of page to avoid animation issues');
                    $module.scrollTop(0);
                    (isBody ? $window : $context)[0].scrollTo(0, 0);
                },

                scrollBack: function () {
                    module.verbose('Scrolling back to original page position');
                    (isBody ? $window : $context)[0].scrollTo(0, currentScroll);
                },

                clear: {
                    cache: function () {
                        module.verbose('Clearing cached dimensions');
                        module.cache = {};
                    },
                },

                set: {
                    bodyMargin: function () {
                        var position = module.can.leftBodyScrollbar() ? 'left' : 'right';
                        $context.css((isBody ? 'margin-' : 'padding-') + position, tempBodyMargin + 'px');
                        $context.find(selector.bodyFixed.replace('right', position)).each(function () {
                            var
                                el = $(this),
                                attribute = el.css('position') === 'fixed' ? 'padding-' + position : position
                            ;
                            el.css(attribute, 'calc(' + el.css(attribute) + ' + ' + tempBodyMargin + 'px)');
                        });
                    },
                    dimmerStyles: function () {
                        if (settings.blurring) {
                            $pusher.addClass(className.blurring);
                        } else {
                            $pusher.removeClass(className.blurring);
                        }
                    },

                    // container
                    pushed: function () {
                        $context.addClass(className.pushed);
                    },
                    pushable: function () {
                        $context.addClass(className.pushable);
                    },

                    // pusher
                    dimmed: function () {
                        $pusher.addClass(className.dimmed);
                    },

                    // sidebar
                    active: function () {
                        $module.addClass(className.active);
                    },
                    animating: function () {
                        $module.addClass(className.animating);
                    },
                    closing: function () {
                        $pusher.addClass(className.closing);
                    },
                    transition: function (transition) {
                        transition = transition || module.get.transition();
                        $module.addClass(transition);
                    },
                    direction: function (direction) {
                        direction = direction || module.get.direction();
                        $module.addClass(className[direction]);
                    },
                    visible: function () {
                        $module.addClass(className.visible);
                    },
                    overlay: function () {
                        $module.addClass(className.overlay);
                    },
                },
                remove: {

                    inlineCSS: function () {
                        module.debug('Removing inline css styles', $style);
                        if ($style && $style.length > 0) {
                            $style.remove();
                        }
                    },

                    // context
                    pushed: function () {
                        $context.removeClass(className.pushed);
                    },
                    pushable: function () {
                        $context.removeClass(className.pushable);
                    },

                    // sidebar
                    active: function () {
                        $module.removeClass(className.active);
                    },
                    animating: function () {
                        $module.removeClass(className.animating);
                    },
                    closing: function () {
                        $pusher.removeClass(className.closing);
                    },
                    transition: function (transition) {
                        transition = transition || module.get.transition();
                        $module.removeClass(transition);
                    },
                    direction: function (direction) {
                        direction = direction || module.get.direction();
                        $module.removeClass(className[direction]);
                    },
                    visible: function () {
                        $module.removeClass(className.visible);
                    },
                    overlay: function () {
                        $module.removeClass(className.overlay);
                    },
                },
                restore: {
                    bodyMargin: function () {
                        var position = module.can.leftBodyScrollbar() ? 'left' : 'right';
                        $context.css((isBody ? 'margin-' : 'padding-') + position, initialBodyMargin);
                        $context.find(selector.bodyFixed.replace('right', position)).each(function () {
                            var
                                el = $(this),
                                attribute = el.css('position') === 'fixed' ? 'padding-' + position : position
                            ;
                            el.css(attribute, '');
                        });
                    },
                },
                get: {
                    direction: function () {
                        if ($module.hasClass(className.top)) {
                            return className.top;
                        }
                        if ($module.hasClass(className.right)) {
                            return className.right;
                        }
                        if ($module.hasClass(className.bottom)) {
                            return className.bottom;
                        }

                        return className.left;
                    },
                    transition: function () {
                        var
                            direction = module.get.direction(),
                            transition
                        ;
                        transition = module.is.mobile()
                            ? (settings.mobileTransition === 'auto'
                                ? settings.defaultTransition.mobile[direction]
                                : settings.mobileTransition)
                            : (settings.transition === 'auto'
                                ? settings.defaultTransition.computer[direction]
                                : settings.transition);
                        module.verbose('Determined transition', transition);

                        return transition;
                    },
                },
                has: {
                    scrollbar: function () {
                        return isBody || $context.css('overflow-y') !== 'hidden';
                    },
                },
                is: {
                    safari: function () {
                        if (module.cache.isSafari === undefined) {
                            module.cache.isSafari = /constructor/i.test(window.HTMLElement) || !!window.ApplePaySession;
                        }

                        return module.cache.isSafari;
                    },
                    edge: function () {
                        if (module.cache.isEdge === undefined) {
                            module.cache.isEdge = !!window.setImmediate && !module.is.ie();
                        }

                        return module.cache.isEdge;
                    },
                    firefox: function () {
                        if (module.cache.isFirefox === undefined) {
                            module.cache.isFirefox = !!window.InstallTrigger;
                        }

                        return module.cache.isFirefox;
                    },
                    iframe: function () {
                        return !(self === top);
                    },
                    ie: function () {
                        if (module.cache.isIE === undefined) {
                            var
                                isIE11 = !window.ActiveXObject && 'ActiveXObject' in window,
                                isIE = 'ActiveXObject' in window
                            ;
                            module.cache.isIE = isIE11 || isIE;
                        }

                        return module.cache.isIE;
                    },

                    mobile: function () {
                        var
                            userAgent    = navigator.userAgent,
                            isMobile     = userAgent.match(regExp.mobile)
                        ;
                        if (isMobile) {
                            module.verbose('Browser was found to be mobile', userAgent);

                            return true;
                        }

                        module.verbose('Browser is not mobile, using regular transition', userAgent);

                        return false;
                    },
                    hidden: function () {
                        return !module.is.visible();
                    },
                    visible: function () {
                        return $module.hasClass(className.visible);
                    },
                    // alias
                    open: function () {
                        return module.is.visible();
                    },
                    closed: function () {
                        return module.is.hidden();
                    },
                    vertical: function () {
                        return $module.hasClass(className.top);
                    },
                    animating: function () {
                        return $context.hasClass(className.animating);
                    },
                    rtl: function () {
                        if (module.cache.isRTL === undefined) {
                            module.cache.isRTL = $module.attr('dir') === 'rtl' || $module.css('direction') === 'rtl' || $body.attr('dir') === 'rtl' || $body.css('direction') === 'rtl' || $context.attr('dir') === 'rtl' || $context.css('direction') === 'rtl';
                        }

                        return module.cache.isRTL;
                    },
                },

                setting: function (name, value) {
                    module.debug('Changing setting', name, value);
                    if ($.isPlainObject(name)) {
                        $.extend(true, settings, name);
                    } else if (value !== undefined) {
                        if ($.isPlainObject(settings[name])) {
                            $.extend(true, settings[name], value);
                        } else {
                            settings[name] = value;
                        }
                    } else {
                        return settings[name];
                    }
                },
                internal: function (name, value) {
                    if ($.isPlainObject(name)) {
                        $.extend(true, module, name);
                    } else if (value !== undefined) {
                        module[name] = value;
                    } else {
                        return module[name];
                    }
                },
                debug: function () {
                    if (!settings.silent && settings.debug) {
                        if (settings.performance) {
                            module.performance.log(arguments);
                        } else {
                            module.debug = Function.prototype.bind.call(console.info, console, settings.name + ':');
                            module.debug.apply(console, arguments);
                        }
                    }
                },
                verbose: function () {
                    if (!settings.silent && settings.verbose && settings.debug) {
                        if (settings.performance) {
                            module.performance.log(arguments);
                        } else {
                            module.verbose = Function.prototype.bind.call(console.info, console, settings.name + ':');
                            module.verbose.apply(console, arguments);
                        }
                    }
                },
                error: function () {
                    if (!settings.silent) {
                        module.error = Function.prototype.bind.call(console.error, console, settings.name + ':');
                        module.error.apply(console, arguments);
                    }
                },
                performance: {
                    log: function (message) {
                        var
                            currentTime,
                            executionTime,
                            previousTime
                        ;
                        if (settings.performance) {
                            currentTime = Date.now();
                            previousTime = time || currentTime;
                            executionTime = currentTime - previousTime;
                            time = currentTime;
                            performance.push({
                                Name: message[0],
                                Arguments: [].slice.call(message, 1) || '',
                                Element: element,
                                'Execution Time': executionTime,
                            });
                        }
                        clearTimeout(module.performance.timer);
                        module.performance.timer = setTimeout(function () { module.performance.display(); }, 500);
                    },
                    display: function () {
                        var
                            title = settings.name + ':',
                            totalTime = 0
                        ;
                        time = false;
                        clearTimeout(module.performance.timer);
                        $.each(performance, function (index, data) {
                            totalTime += data['Execution Time'];
                        });
                        title += ' ' + totalTime + 'ms';
                        if (performance.length > 0) {
                            console.groupCollapsed(title);
                            if (console.table) {
                                console.table(performance);
                            } else {
                                $.each(performance, function (index, data) {
                                    console.log(data.Name + ': ' + data['Execution Time'] + 'ms');
                                });
                            }
                            console.groupEnd();
                        }
                        performance = [];
                    },
                },
                invoke: function (query, passedArguments, context) {
                    var
                        object = instance,
                        maxDepth,
                        found,
                        response
                    ;
                    passedArguments = passedArguments || queryArguments;
                    context = context || element;
                    if (typeof query === 'string' && object !== undefined) {
                        query = query.split(/[ .]/);
                        maxDepth = query.length - 1;
                        $.each(query, function (depth, value) {
                            var camelCaseValue = depth !== maxDepth
                                ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1)
                                : query
                            ;
                            if ($.isPlainObject(object[camelCaseValue]) && (depth !== maxDepth)) {
                                object = object[camelCaseValue];
                            } else if (object[camelCaseValue] !== undefined) {
                                found = object[camelCaseValue];

                                return false;
                            } else if ($.isPlainObject(object[value]) && (depth !== maxDepth)) {
                                object = object[value];
                            } else if (object[value] !== undefined) {
                                found = object[value];

                                return false;
                            } else {
                                module.error(error.method, query);

                                return false;
                            }
                        });
                    }
                    if (isFunction(found)) {
                        response = found.apply(context, passedArguments);
                    } else if (found !== undefined) {
                        response = found;
                    }
                    if (Array.isArray(returnedValue)) {
                        returnedValue.push(response);
                    } else if (returnedValue !== undefined) {
                        returnedValue = [returnedValue, response];
                    } else if (response !== undefined) {
                        returnedValue = response;
                    }

                    return found;
                },
            };

            if (methodInvoked) {
                if (instance === undefined) {
                    module.initialize();
                }
                module.invoke(query);
            } else {
                if (instance !== undefined) {
                    module.invoke('destroy');
                }
                module.initialize();
            }
        });

        return returnedValue !== undefined
            ? returnedValue
            : this;
    };

    $.fn.sidebar.settings = {

        name: 'Sidebar',
        namespace: 'sidebar',

        silent: false,
        debug: false,
        verbose: false,
        performance: true,

        transition: 'auto',
        mobileTransition: 'auto',

        defaultTransition: {
            computer: {
                left: 'uncover',
                right: 'uncover',
                top: 'overlay',
                bottom: 'overlay',
            },
            mobile: {
                left: 'uncover',
                right: 'uncover',
                top: 'overlay',
                bottom: 'overlay',
            },
        },

        context: 'body',
        exclusive: false,
        closable: true,
        dimPage: true,
        scrollLock: false,
        returnScroll: false,
        delaySetup: false,

        onChange: function () {},
        onShow: function () {},
        onHide: function () {},

        onHidden: function () {},
        onVisible: function () {},

        className: {
            active: 'active',
            animating: 'animating',
            blurring: 'blurring',
            closing: 'closing',
            dimmed: 'dimmed',
            locked: 'locked',
            pushable: 'pushable',
            pushed: 'pushed',
            right: 'right',
            top: 'top',
            left: 'left',
            bottom: 'bottom',
            visible: 'visible',
        },

        selector: {
            bodyFixed: '> .ui.fixed.menu, > .ui.right.toast-container, > .ui.right.sidebar, > .ui.fixed.nag, > .ui.fixed.nag > .close',
            fixed: '.fixed',
            omitted: 'script, link, style, .ui.modal, .ui.dimmer, .ui.nag, .ui.fixed',
            pusher: '.pusher',
            sidebar: '.ui.sidebar',
        },

        regExp: {
            mobile: /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/g,
        },

        error: {
            method: 'The method you called is not defined.',
            pusher: 'Had to add pusher element. For optimal performance make sure body content is inside a pusher element',
            movedSidebar: 'Had to move sidebar. For optimal performance make sure sidebar and pusher are direct children of your body tag',
            overlay: 'The overlay setting is no longer supported, use animation: overlay',
            notFound: 'There were no elements that matched the specified selector',
        },

    };
})(jQuery, window, document);
