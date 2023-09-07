/*!
 * # Fomantic-UI 2.9.3 - Flyout
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

    $.fn.flyout = function (parameters) {
        var
            $allModules     = $(this),
            $window         = $(window),
            $document       = $(document),
            $html           = $('html'),
            $head           = $('head'),
            $body           = $('body'),

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
            returnedValue
        ;

        $allModules.each(function () {
            var
                settings             = $.isPlainObject(parameters)
                    ? $.extend(true, {}, $.fn.flyout.settings, parameters)
                    : $.extend({}, $.fn.flyout.settings),

                selector             = settings.selector,
                className            = settings.className,
                namespace            = settings.namespace,
                fields               = settings.fields,
                regExp               = settings.regExp,
                error                = settings.error,

                eventNamespace       = '.' + namespace,
                moduleNamespace      = 'module-' + namespace,

                $module              = $(this),
                $context             = contextCheck(settings.context, window),
                $closeIcon           = $module.find(selector.close),
                $inputs,
                $focusedElement,

                $flyouts             = $module.children(selector.flyout),
                $pusher              = $context.children(selector.pusher),
                $style,

                isFlyoutComponent    = $module.hasClass('flyout'),

                element              = this,
                instance             = isFlyoutComponent ? $module.data(moduleNamespace) : undefined,

                ignoreRepeatedEvents = false,
                isBody               = $context[0] === $body[0],
                initialBodyMargin    = '',
                tempBodyMargin       = '',
                hadScrollbar         = false,
                windowRefocused      = false,

                elementNamespace,
                id,
                observer,
                observeAttributes = false,
                currentScroll,

                module
            ;

            module = {

                initialize: function () {
                    module.debug('Initializing flyout', parameters);

                    module.create.id();
                    if (!isFlyoutComponent) {
                        module.create.flyout();
                        if (!isFunction(settings.onHidden)) {
                            settings.onHidden = function () {
                                module.destroy();
                                $module.remove();
                            };
                        }
                        if (!settings.autoShow) {
                            settings.autoShow = true;
                        }
                    }
                    $module.addClass(settings.class);
                    if (settings.title !== '') {
                        $module.find(selector.header).html(module.helpers.escape(settings.title, settings.preserveHTML)).addClass(settings.classTitle);
                    }
                    if (settings.content !== '') {
                        $module.find(selector.content).html(module.helpers.escape(settings.content, settings.preserveHTML)).addClass(settings.classContent);
                    }
                    if (module.has.configActions()) {
                        var $actions = $module.find(selector.actions).addClass(settings.classActions);
                        if ($actions.length === 0) {
                            $actions = $('<div/>', { class: className.actions + ' ' + (settings.classActions || '') }).appendTo($module);
                        } else {
                            $actions.empty();
                        }
                        settings.actions.forEach(function (el) {
                            var
                                icon = el[fields.icon]
                                    ? '<i ' + (el[fields.text] ? 'aria-hidden="true"' : '') + ' class="' + module.helpers.deQuote(el[fields.icon]) + ' icon"></i>'
                                    : '',
                                text = module.helpers.escape(el[fields.text] || '', settings.preserveHTML),
                                cls = module.helpers.deQuote(el[fields.class] || ''),
                                click = el[fields.click] && isFunction(el[fields.click])
                                    ? el[fields.click]
                                    : function () {}
                            ;
                            $actions.append($('<button/>', {
                                html: icon + text,
                                'aria-label': (el[fields.text] || el[fields.icon] || '').replace(/<[^>]+(>|$)/g, ''),
                                class: className.button + ' ' + cls,
                                on: {
                                    click: function () {
                                        if (click.call(element, $module) === false) {
                                            return;
                                        }
                                        module.hide();
                                    },
                                },
                            }));
                        });
                    }

                    // avoids locking rendering if initialized in onReady
                    if (settings.delaySetup) {
                        requestAnimationFrame(module.setup.layout);
                    } else {
                        module.setup.layout();
                    }

                    requestAnimationFrame(function () {
                        module.setup.cache();
                    });

                    if (module.get.direction() === 'left' || module.get.direction() === 'right') {
                        module.setup.heights();
                        module.bind.resize();
                    }
                    module.bind.events();
                    module.observeChanges();
                    module.instantiate();

                    if (settings.autoShow) {
                        module.show();
                    }
                },

                instantiate: function () {
                    module.verbose('Storing instance of module', module);
                    instance = module;
                    $module
                        .data(moduleNamespace, instance)
                    ;
                },

                create: {
                    flyout: function () {
                        module.verbose('Programmaticaly create flyout', $context);
                        $module = $('<div/>', { class: className.flyout, role: 'dialog', 'aria-modal': settings.dimPage });
                        if (settings.closeIcon) {
                            $closeIcon = $('<i/>', {
                                class: className.close,
                                role: 'button',
                                tabindex: 0,
                                'aria-label': settings.text.close,
                            });
                            $module.append($closeIcon);
                        }
                        if (settings.title !== '') {
                            var titleId = '_' + module.get.id() + 'title';
                            $module.attr('aria-labelledby', titleId);
                            $('<div/>', { class: className.header, id: titleId }).appendTo($module);
                        }
                        if (settings.content !== '') {
                            var descId = '_' + module.get.id() + 'desc';
                            $module.attr('aria-describedby', descId);
                            $('<div/>', { class: className.content, id: descId }).appendTo($module);
                        }
                        if (module.has.configActions()) {
                            $('<div/>', { class: className.actions }).appendTo($module);
                        }
                        $module.prependTo($context);
                        element = $module[0];
                    },
                    id: function () {
                        id = (Math.random().toString(16) + '000000000').slice(2, 10);
                        elementNamespace = '.' + id;
                        module.verbose('Creating unique id for element', id);
                    },
                },

                destroy: function () {
                    if (observer) {
                        observer.disconnect();
                    }
                    module.verbose('Destroying previous module for', $module);
                    $module
                        .off(eventNamespace)
                        .removeData(moduleNamespace)
                    ;
                    $closeIcon.off(elementNamespace);
                    if ($inputs) {
                        $inputs.off(elementNamespace);
                    }
                    // bound by uuid
                    $context.off(elementNamespace);
                    $window.off(elementNamespace);
                    $document.off(elementNamespace);
                },

                event: {
                    keyboard: function (event) {
                        var
                            keyCode   = event.which
                        ;
                        if (keyCode === settings.keys.escape) {
                            if (settings.closable) {
                                module.debug('Escape key pressed hiding flyout');
                                module.hide();
                            } else {
                                module.debug('Escape key pressed, but closable is set to false');
                            }
                            event.preventDefault();
                        }
                    },
                    resize: function () {
                        module.setup.heights();
                    },
                    focus: function () {
                        windowRefocused = true;
                    },
                    click: function (event) {
                        if (windowRefocused && document.activeElement !== event.target && module.is.visible() && settings.autofocus && settings.dimPage && $(document.activeElement).closest(selector.flyout).length === 0) {
                            requestAnimationFrame(module.set.autofocus);
                        }
                        windowRefocused = false;
                    },
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
                    close: function (event) {
                        module.hide();
                    },
                    closeKeyUp: function (event) {
                        var
                            keyCode   = event.which
                        ;
                        if (keyCode === settings.keys.enter || keyCode === settings.keys.space) {
                            module.hide();
                        }
                    },
                    inputKeyDown: {
                        first: function (event) {
                            var
                                keyCode = event.which
                            ;
                            if (keyCode === settings.keys.tab && event.shiftKey) {
                                $inputs.last().trigger('focus');
                                event.preventDefault();
                            }
                        },
                        last: function (event) {
                            var
                                keyCode = event.which
                            ;
                            if (keyCode === settings.keys.tab && !event.shiftKey) {
                                $inputs.first().trigger('focus');
                                event.preventDefault();
                            }
                        },
                    },
                    approve: function (event) {
                        if (ignoreRepeatedEvents || settings.onApprove.call(module.element, $(this)) === false) {
                            module.verbose('Approve callback returned false cancelling close');

                            return;
                        }
                        ignoreRepeatedEvents = true;
                        module.hide(function () {
                            ignoreRepeatedEvents = false;
                        });
                    },
                    deny: function (event) {
                        if (ignoreRepeatedEvents || settings.onDeny.call(module.element, $(this)) === false) {
                            module.verbose('Deny callback returned false cancelling close');

                            return;
                        }
                        ignoreRepeatedEvents = true;
                        module.hide(function () {
                            ignoreRepeatedEvents = false;
                        });
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
                        if ($(event.target).closest(selector.flyout).length === 0) {
                            event.preventDefault();
                        }
                    },
                },

                bind: {
                    resize: function () {
                        module.verbose('Adding resize event to window', $window);
                        $window.on('resize' + elementNamespace, module.event.resize);
                    },
                    events: function () {
                        module.verbose('Attaching events');
                        $module
                            .on('click' + eventNamespace, selector.close, module.event.close)
                            .on('click' + eventNamespace, selector.approve, module.event.approve)
                            .on('click' + eventNamespace, selector.deny, module.event.deny)
                        ;
                        $closeIcon
                            .on('keyup' + elementNamespace, module.event.closeKeyUp)
                        ;
                        $window
                            .on('focus' + elementNamespace, module.event.focus)
                        ;
                        $context
                            .on('click' + elementNamespace, module.event.click)
                        ;
                    },
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
                        module.verbose('Adding events to contain flyout scroll');
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
                                + ' .ui.visible.' + direction + '.flyout ~ .fixed,'
                                + ' .ui.visible.' + direction + '.flyout ~ .pusher {'
                                + '           transform: translate3d(' + distance[direction] + 'px, 0, 0);'
                                + ' }';
                        } else if (direction === 'top' || direction === 'bottom') {
                            style += ''
                                + ' .ui.visible.' + direction + '.flyout ~ .fixed,'
                                + ' .ui.visible.' + direction + '.flyout ~ .pusher {'
                                + '           transform: translate3d(0, ' + distance[direction] + 'px, 0);'
                                + ' }';
                        }

                        /* IE is only browser not to create context with transforms */
                        /* https://www.w3.org/Bugs/Public/show_bug.cgi?id=16328 */
                        if (module.is.ie()) {
                            if (direction === 'left' || direction === 'right') {
                                module.debug('Adding CSS rules for animation distance', width);
                                style += ''
                                    + ' body.pushable > .ui.visible.' + direction + '.flyout ~ .pusher::after {'
                                    + '           transform: translate3d(' + distance[direction] + 'px, 0, 0);'
                                    + ' }';
                            } else if (direction === 'top' || direction === 'bottom') {
                                style += ''
                                    + ' body.pushable > .ui.visible.' + direction + '.flyout ~ .pusher::after {'
                                    + '           transform: translate3d(0, ' + distance[direction] + 'px, 0);'
                                    + ' }';
                            }
                            /* opposite sides visible forces content overlay */
                            style += ''
                                + ' body.pushable > .ui.visible.left.flyout ~ .ui.visible.right.flyout ~ .pusher::after,'
                                + ' body.pushable > .ui.visible.right.flyout ~ .ui.visible.left.flyout ~ .pusher::after {'
                                + '           transform: translate3d(0, 0, 0);'
                                + ' }';
                        }
                        style += '</style>';
                        $style = $(style)
                            .appendTo($head)
                        ;
                        module.debug('Adding sizing css to head', $style);
                    },
                    keyboardShortcuts: function () {
                        module.verbose('Adding keyboard shortcuts');
                        $document
                            .on('keydown' + eventNamespace, module.event.keyboard)
                        ;
                    },
                },
                observeChanges: function () {
                    if ('MutationObserver' in window) {
                        observer = new MutationObserver(function (mutations) {
                            var collectNodes = function (parent) {
                                    var nodes = [];
                                    for (var c = 0, cl = parent.length; c < cl; c++) {
                                        Array.prototype.push.apply(nodes, collectNodes(parent[c].childNodes));
                                        nodes.push(parent[c]);
                                    }

                                    return nodes;
                                },
                                shouldRefreshInputs = false,
                                ignoreAutofocus = true
                            ;
                            mutations.every(function (mutation) {
                                if (mutation.type === 'attributes') {
                                    if (observeAttributes && (mutation.attributeName === 'disabled' || $(mutation.target).find(':input').addBack(':input').filter(':visible').length > 0)) {
                                        shouldRefreshInputs = true;
                                    }
                                } else {
                                    // mutationobserver only provides the parent nodes
                                    // so let's collect all childs as well to find nested inputs
                                    var $addedInputs = $(collectNodes(mutation.addedNodes)).filter('a[href], [tabindex], :input:enabled').filter(':visible'),
                                        $removedInputs = $(collectNodes(mutation.removedNodes)).filter('a[href], [tabindex], :input');
                                    if ($addedInputs.length > 0 || $removedInputs.length > 0) {
                                        shouldRefreshInputs = true;
                                        if ($addedInputs.filter(':input').length > 0 || $removedInputs.filter(':input').length > 0) {
                                            ignoreAutofocus = false;
                                        }
                                    }
                                }

                                return !shouldRefreshInputs;
                            });

                            if (shouldRefreshInputs) {
                                module.refreshInputs(ignoreAutofocus);
                            }
                        });
                        observer.observe(element, {
                            attributeFilter: ['class', 'disabled'],
                            attributes: true,
                            childList: true,
                            subtree: true,
                        });
                        module.debug('Setting up mutation observer', observer);
                    }
                },
                refresh: function () {
                    module.verbose('Refreshing selector cache');
                    $context = contextCheck(settings.context, window);
                    module.refreshFlyouts();
                    $pusher = $context.children(selector.pusher);
                    module.clear.cache();
                },

                refreshFlyouts: function () {
                    module.verbose('Refreshing other flyouts');
                    $flyouts = $context.children(selector.flyout);
                },

                refreshInputs: function (ignoreAutofocus) {
                    if ($inputs) {
                        $inputs
                            .off('keydown' + elementNamespace)
                        ;
                    }
                    if (!settings.dimPage) {
                        return;
                    }
                    $inputs = $module.find('a[href], [tabindex], :input:enabled').filter(':visible').filter(function () {
                        return $(this).closest('.disabled').length === 0;
                    });
                    if ($inputs.filter(':input').length === 0) {
                        $inputs = $module.add($inputs);
                        $module.attr('tabindex', -1);
                    } else {
                        $module.removeAttr('tabindex');
                    }
                    $inputs.first()
                        .on('keydown' + elementNamespace, module.event.inputKeyDown.first)
                    ;
                    $inputs.last()
                        .on('keydown' + elementNamespace, module.event.inputKeyDown.last)
                    ;
                    if (!ignoreAutofocus && settings.autofocus && $inputs.filter(':focus').length === 0) {
                        module.set.autofocus();
                    }
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
                            module.debug('Adding wrapper element for flyout');
                            module.error(error.pusher);
                            $pusher = $('<div class="pusher" />');
                            $context
                                .children()
                                .not(selector.omitted)
                                .not($flyouts)
                                .wrapAll($pusher)
                            ;
                            module.refresh();
                        }
                        if ($module.nextAll(selector.pusher).length === 0 || $module.nextAll(selector.pusher)[0] !== $pusher[0]) {
                            module.debug('Moved flyout to correct parent element');
                            module.error(error.movedFlyout, element);
                            $module.detach().prependTo($context);
                            module.refresh();
                        }
                        if (module.is.mobile()) {
                            $module.addClass(className.fullscreen);
                        }
                        module.clear.cache();
                        module.set.pushable();
                        module.set.direction();
                    },
                    heights: function () {
                        module.debug('Setting up heights', $module);
                        var
                            $header = $module.children(selector.header),
                            $content = $module.children(selector.content),
                            $actions = $module.children(selector.actions),
                            newContentHeight = ($context.height() || 0) - ($header.outerHeight() || 0) - ($actions.outerHeight() || 0)
                        ;
                        if (newContentHeight > 0) {
                            $content.css('min-height', String(newContentHeight) + 'px');
                        }
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
                        module.debug('Attaching flyout events to element', selector, event);
                        $toggle
                            .on('click' + eventNamespace, event)
                        ;
                    } else {
                        module.error(error.notFound, selector);
                    }
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
                        module.refresh();
                        if (module.othersActive()) {
                            module.debug('Other flyouts currently visible');
                            if (settings.exclusive) {
                                module.hideOthers();
                            } else {
                                ignoreRepeatedEvents = false;
                            }
                        }
                        module.set.dimmerStyles();
                        module.set.observeAttributes(false);
                        module.pushPage(function () {
                            callback.call(element);
                            settings.onVisible.call(element);
                            if (settings.keyboardShortcuts) {
                                module.add.keyboardShortcuts();
                            }
                            module.save.focus();
                            module.refreshInputs();
                            requestAnimationFrame(module.set.observeAttributes);
                        });
                        settings.onChange.call(element);
                    } else {
                        module.debug('Flyout is already visible');
                    }
                },

                hide: function (callback) {
                    callback = isFunction(callback)
                        ? callback
                        : function () {};
                    if (settings.onHide.call(element, $(this)) === false) {
                        module.verbose('Hide callback returned false cancelling hide');
                        ignoreRepeatedEvents = false;

                        return false;
                    }
                    if (module.is.visible() || module.is.animating()) {
                        module.debug('Hiding flyout', callback);
                        module.refreshFlyouts();
                        module.set.observeAttributes(false);
                        module.pullPage(function () {
                            callback.call(element);
                            if (isFunction(settings.onHidden)) {
                                settings.onHidden.call(element);
                            }
                            module.restore.focus();
                        });
                        settings.onChange.call(element);
                    }
                },

                othersAnimating: function () {
                    return $flyouts.not($module).filter('.' + className.animating).length > 0;
                },
                othersVisible: function () {
                    return $flyouts.not($module).filter('.' + className.visible).length > 0;
                },
                othersActive: function () {
                    return module.othersVisible() || module.othersAnimating();
                },

                hideOthers: function (callback) {
                    var
                        $otherFlyouts = $flyouts.not($module).filter('.' + className.visible),
                        flyoutCount   = $otherFlyouts.length,
                        callbackCount  = 0
                    ;
                    callback = callback || function () {};
                    $otherFlyouts
                        .flyout('hide', function () {
                            callbackCount++;
                            if (callbackCount === flyoutCount) {
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
                        animate,
                        dim,
                        transitionEnd
                    ;
                    callback = isFunction(callback)
                        ? callback
                        : function () {};
                    module.set.overlay();
                    if (settings.returnScroll) {
                        currentScroll = (isBody ? $window : $context).scrollTop();
                    }
                    module.bind.scrollLock();
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
                        if (event.target === $module[0]) {
                            $module.off('transitionend' + elementNamespace, transitionEnd);
                            module.remove.animating();
                            callback.call(element);
                        }
                    };
                    $module.off('transitionend' + elementNamespace);
                    $module.on('transitionend' + elementNamespace, transitionEnd);
                    requestAnimationFrame(animate);
                    if (settings.dimPage && !module.othersVisible()) {
                        requestAnimationFrame(dim);
                    }
                },

                pullPage: function (callback) {
                    var
                        animate,
                        transitionEnd
                    ;
                    callback = isFunction(callback)
                        ? callback
                        : function () {};
                    module.verbose('Removing context push state', module.get.direction());

                    module.unbind.clickaway();
                    if (!module.othersActive()) {
                        module.unbind.scrollLock();
                        if (settings.keyboardShortcuts) {
                            module.remove.keyboardShortcuts();
                        }
                    }

                    animate = function () {
                        module.set.overlay();
                        module.set.animating();
                        if (settings.dimPage && !module.othersVisible()) {
                            module.set.closing();
                        }
                        module.remove.visible();
                    };
                    transitionEnd = function (event) {
                        if (event.target === $module[0]) {
                            $module.off('transitionend' + elementNamespace, transitionEnd);
                            module.remove.animating();
                            module.remove.closing();
                            module.remove.overlay();
                            module.remove.inlineCSS();
                            if (settings.returnScroll) {
                                module.scrollBack();
                            }
                            if (settings.dimPage && !module.othersVisible()) {
                                $pusher.removeClass(className.dimmed);
                            }
                            callback.call(element);
                        }
                    };
                    $module.off('transitionend' + elementNamespace);
                    $module.on('transitionend' + elementNamespace, transitionEnd);
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
                    observeAttributes: function (state) {
                        observeAttributes = state !== false;
                    },
                    autofocus: function () {
                        var
                            $autofocus = $inputs.filter('[autofocus]'),
                            $rawInputs = $inputs.filter(':input'),
                            $input     = ($autofocus.length > 0
                                ? $autofocus
                                : ($rawInputs.length > 0
                                    ? $rawInputs
                                    : $module)
                            ).first()
                        ;
                        $input.trigger('focus');
                    },
                    dimmerStyles: function () {
                        if (settings.blurring) {
                            $pusher.addClass(className.blurring);
                        } else {
                            $pusher.removeClass(className.blurring);
                        }
                    },
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

                    // flyout
                    active: function () {
                        $module.addClass(className.active);
                    },
                    animating: function () {
                        $module.addClass(className.animating);
                    },
                    closing: function () {
                        $pusher.addClass(className.closing);
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
                    keyboardShortcuts: function () {
                        module.verbose('Removing keyboard shortcuts');
                        $document
                            .off('keydown' + eventNamespace)
                        ;
                    },

                    // context
                    pushed: function () {
                        $context.removeClass(className.pushed);
                    },
                    pushable: function () {
                        $context.removeClass(className.pushable);
                    },

                    // flyout
                    active: function () {
                        $module.removeClass(className.active);
                    },
                    animating: function () {
                        $module.removeClass(className.animating);
                    },
                    closing: function () {
                        $pusher.removeClass(className.closing);
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
                    id: function () {
                        return id;
                    },
                    element: function () {
                        return $module;
                    },
                    settings: function () {
                        return settings;
                    },
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
                    focus: function () {
                        var
                            $activeElement = $(document.activeElement),
                            inCurrentFlyout = $activeElement.closest($module).length > 0
                        ;
                        if (!inCurrentFlyout) {
                            $focusedElement = $(document.activeElement).trigger('blur');
                        }
                    },
                    bodyMargin: function () {
                        initialBodyMargin = $context.css((isBody ? 'margin-' : 'padding-') + (module.can.leftBodyScrollbar() ? 'left' : 'right'));
                        var
                            bodyMarginRightPixel = parseInt(initialBodyMargin.replace(/[^\d.]/g, ''), 10),
                            bodyScrollbarWidth = isBody ? window.innerWidth - document.documentElement.clientWidth : $context[0].offsetWidth - $context[0].clientWidth
                        ;
                        tempBodyMargin = bodyMarginRightPixel + bodyScrollbarWidth;
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

                has: {
                    configActions: function () {
                        return Array.isArray(settings.actions) && settings.actions.length > 0;
                    },
                    scrollbar: function () {
                        return isBody || $context.css('overflow-y') !== 'hidden';
                    },
                },

                restore: {
                    focus: function () {
                        if ($focusedElement && $focusedElement.length > 0 && settings.restoreFocus) {
                            $focusedElement.trigger('focus');
                        }
                    },
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

                helpers: {
                    deQuote: function (string) {
                        return String(string).replace(/"/g, '');
                    },
                    escape: function (string, preserveHTML) {
                        if (preserveHTML) {
                            return string;
                        }
                        var
                            badChars     = /["'<>`]/g,
                            shouldEscape = /["&'<>`]/,
                            escape       = {
                                '<': '&lt;',
                                '>': '&gt;',
                                '"': '&quot;',
                                "'": '&#x27;',
                                '`': '&#x60;',
                            },
                            escapedChar  = function (chr) {
                                return escape[chr];
                            }
                        ;
                        if (shouldEscape.test(string)) {
                            string = string.replace(/&(?![\d#a-z]{1,12};)/gi, '&amp;');

                            return string.replace(badChars, escapedChar);
                        }

                        return string;
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
                    context = element || context;
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
                    if (isFunction(settings.templates[query])) {
                        settings.autoShow = true;
                        settings.className.flyout = settings.className.template;
                        settings = $.extend(true, {}, settings, settings.templates[query].apply(module, queryArguments));

                        // reassign shortcuts
                        className = settings.className;
                        namespace = settings.namespace;
                        fields = settings.fields;
                        error = settings.error;
                    }
                    module.initialize();
                }
                if (!isFunction(settings.templates[query])) {
                    module.invoke(query);
                }
            } else {
                if (instance !== undefined) {
                    instance.invoke('destroy');
                }
                module.initialize();
                returnedValue = $module;
            }
        });

        return returnedValue !== undefined
            ? returnedValue
            : this;
    };
    $.flyout = $.fn.flyout;

    $.fn.flyout.settings = {

        name: 'Flyout',
        namespace: 'flyout',

        silent: false,
        debug: false,
        verbose: false,
        performance: true,

        context: 'body',
        exclusive: false,
        closable: true,
        autofocus: true,
        restoreFocus: true,
        dimPage: true,
        scrollLock: false,
        returnScroll: false,
        delaySetup: false,
        autoShow: false,

        keyboardShortcuts: true,

        // dynamic content
        title: '',
        content: '',
        class: '',
        classTitle: '',
        classContent: '',
        classActions: '',
        closeIcon: false,
        actions: false,
        preserveHTML: true,

        fields: {
            class: 'class',
            text: 'text',
            icon: 'icon',
            click: 'click',
        },

        onChange: function () {},
        onShow: function () {},
        onHide: function () {
            return true;
        },

        onHidden: false,
        onVisible: function () {},

        onApprove: function () {},
        onDeny: function () {},

        keys: {
            space: 32,
            enter: 13,
            escape: 27,
            tab: 9,
        },

        className: {
            flyout: 'ui flyout',
            close: 'close icon',
            header: 'ui header',
            content: 'content',
            actions: 'actions',
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
            overlay: 'overlay',
            fullscreen: 'fullscreen',
            template: 'ui flyout',
            button: 'ui button',
            ok: 'positive',
            cancel: 'negative',
            prompt: 'ui fluid input',
        },

        selector: {
            bodyFixed: '> .ui.fixed.menu, > .ui.right.toast-container, > .ui.right.sidebar, > .ui.right.flyout, > .ui.fixed.nag, > .ui.fixed.nag > .close',
            fixed: '.fixed',
            omitted: 'script, link, style, .ui.modal, .ui.dimmer, .ui.nag, .ui.fixed',
            pusher: '.pusher',
            flyout: '.ui.flyout',
            header: '.ui.header',
            content: '.content',
            actions: '.actions',
            close: '.close',
            approve: '.actions .positive, .actions .approve, .actions .ok',
            deny: '.actions .negative, .actions .deny, .actions .cancel',
        },

        regExp: {
            mobile: /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/g,
        },

        error: {
            method: 'The method you called is not defined.',
            pusher: 'Had to add pusher element. For optimal performance make sure body content is inside a pusher element',
            movedFlyout: 'Had to move flyout. For optimal performance make sure flyout and pusher are direct children of your body tag',
            notFound: 'There were no elements that matched the specified selector',
        },

        text: {
            ok: 'Ok',
            cancel: 'Cancel',
            close: 'Close',
        },
    };

    $.fn.flyout.settings.templates = {
        getArguments: function (args) {
            var queryArguments = [].slice.call(args);
            if ($.isPlainObject(queryArguments[0])) {
                return $.extend({
                    handler: function () {},
                    content: '',
                    title: '',
                }, queryArguments[0]);
            }
            if (!isFunction(queryArguments[queryArguments.length - 1])) {
                queryArguments.push(function () {});
            }

            return {
                handler: queryArguments.pop(),
                content: queryArguments.pop() || '',
                title: queryArguments.pop() || '',
            };
        },
        alert: function () {
            var
                settings = this.get.settings(),
                args     = settings.templates.getArguments(arguments)
            ;

            return {
                title: args.title,
                content: args.content,
                actions: [{
                    text: settings.text.ok,
                    class: settings.className.ok,
                    click: args.handler,
                }],
            };
        },
        confirm: function () {
            var
                settings = this.get.settings(),
                args     = settings.templates.getArguments(arguments)
            ;

            return {
                title: args.title,
                content: args.content,
                actions: [{
                    text: settings.text.ok,
                    class: settings.className.ok,
                    click: function () {
                        args.handler(true);
                    },
                }, {
                    text: settings.text.cancel,
                    class: settings.className.cancel,
                    click: function () {
                        args.handler(false);
                    },
                }],
            };
        },
        prompt: function () {
            var
                $this    = this,
                settings = this.get.settings(),
                args     = settings.templates.getArguments(arguments),
                input    = $($.parseHTML(args.content)).filter('.ui.input')
            ;
            if (input.length === 0) {
                args.content += '<p><div class="' + settings.className.prompt + '"><input placeholder="' + this.helpers.deQuote(args.placeholder || '') + '" type="text" value="' + this.helpers.deQuote(args.defaultValue || '') + '"></div></p>';
            }

            return {
                title: args.title,
                content: args.content,
                actions: [{
                    text: settings.text.ok,
                    class: settings.className.ok,
                    click: function () {
                        var
                            settings = $this.get.settings(),
                            inputField = $this.get.element().find(settings.selector.prompt)[0]
                        ;
                        args.handler($(inputField).val());
                    },
                }, {
                    text: settings.text.cancel,
                    class: settings.className.cancel,
                    click: function () {
                        args.handler(null);
                    },
                }],
            };
        },
    };
})(jQuery, window, document);
