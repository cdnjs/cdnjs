/*!
 * # Fomantic-UI 2.9.2 - Nag
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

    $.fn.nag = function (parameters) {
        var
            $allModules    = $(this),
            moduleSelector = $allModules.selector || '',

            time           = Date.now(),
            performance    = [],

            query          = arguments[0],
            methodInvoked  = typeof query === 'string',
            queryArguments = [].slice.call(arguments, 1),
            returnedValue
        ;
        $allModules.each(function () {
            var
                settings          = $.isPlainObject(parameters)
                    ? $.extend(true, {}, $.fn.nag.settings, parameters)
                    : $.extend({}, $.fn.nag.settings),

                selector        = settings.selector,
                error           = settings.error,
                namespace       = settings.namespace,

                eventNamespace  = '.' + namespace,
                moduleNamespace = namespace + '-module',

                $module         = $(this),

                $context        = settings.context
                    ? ([window, document].indexOf(settings.context) < 0 ? $(document).find(settings.context) : $(settings.context))
                    : $('body'),

                element         = this,
                instance        = $module.data(moduleNamespace),
                storage,
                module
            ;
            module = {

                initialize: function () {
                    module.verbose('Initializing element');
                    if (typeof settings.value !== 'string') {
                        settings.value = JSON.stringify(settings.value);
                    }
                    storage = module.get.storage();
                    $module
                        .on('click' + eventNamespace, selector.close, module.dismiss)
                        .data(moduleNamespace, module)
                    ;

                    if (settings.detachable && $module.parent()[0] !== $context[0]) {
                        $module
                            .detach()
                            .prependTo($context)
                        ;
                    }

                    if (settings.displayTime > 0) {
                        setTimeout(module.hide, settings.displayTime);
                    }
                    module.show();
                },

                destroy: function () {
                    module.verbose('Destroying instance');
                    $module
                        .removeData(moduleNamespace)
                        .off(eventNamespace)
                    ;
                },

                show: function () {
                    if (module.should.show() && !$module.is(':visible')) {
                        if (settings.onShow.call(element) === false) {
                            module.debug('onShow callback returned false, cancelling nag animation');

                            return false;
                        }
                        module.debug('Showing nag', settings.animation.show);
                        if (settings.animation.show === 'fade') {
                            $module
                                .fadeIn(settings.duration, settings.easing, settings.onVisible)
                            ;
                        } else {
                            $module
                                .slideDown(settings.duration, settings.easing, settings.onVisible)
                            ;
                        }
                    }
                },

                hide: function () {
                    if (settings.onHide.call(element) === false) {
                        module.debug('onHide callback returned false, cancelling nag animation');

                        return false;
                    }
                    module.debug('Hiding nag', settings.animation.hide);
                    if (settings.animation.hide === 'fade') {
                        $module
                            .fadeOut(settings.duration, settings.easing, settings.onHidden)
                        ;
                    } else {
                        $module
                            .slideUp(settings.duration, settings.easing, settings.onHidden)
                        ;
                    }
                },

                dismiss: function (event) {
                    if (module.hide() !== false && settings.storageMethod) {
                        module.debug('Dismissing nag', settings.storageMethod, settings.key, settings.value, settings.expires);
                        module.storage.set(settings.key, settings.value);
                    }
                    event.stopImmediatePropagation();
                    event.preventDefault();
                },

                should: {
                    show: function () {
                        if (settings.persist) {
                            module.debug('Persistent nag is set, can show nag');

                            return true;
                        }
                        if (module.storage.get(settings.key) != settings.value.toString()) {
                            module.debug('Stored value is not set, can show nag', module.storage.get(settings.key));

                            return true;
                        }
                        module.debug('Stored value is set, cannot show nag', module.storage.get(settings.key));

                        return false;
                    },
                },

                get: {
                    expirationDate: function (expires) {
                        if (typeof expires === 'number') {
                            expires = new Date(Date.now() + expires * 864e5);
                        }
                        if (expires instanceof Date && expires.getTime()) {
                            return expires.toUTCString();
                        }

                        module.error(error.expiresFormat);
                    },
                    storage: function () {
                        if (settings.storageMethod === 'localstorage' && window.localStorage !== undefined) {
                            module.debug('Using local storage');

                            return window.localStorage;
                        }
                        if (settings.storageMethod === 'sessionstorage' && window.sessionStorage !== undefined) {
                            module.debug('Using session storage');

                            return window.sessionStorage;
                        }
                        if ('cookie' in document) {
                            module.debug('Using cookie');

                            return {
                                setItem: function (key, value, options) {
                                    // RFC6265 compliant encoding
                                    key = encodeURIComponent(key)
                                        .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
                                        .replace(/[()]/g, escape)
                                    ;
                                    value = encodeURIComponent(value)
                                        .replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[B-D])/g, decodeURIComponent)
                                    ;

                                    var cookieOptions = '';
                                    for (var option in options) {
                                        if (Object.prototype.hasOwnProperty.call(options, option)) {
                                            cookieOptions += '; ' + option;
                                            if (typeof options[option] === 'string') {
                                                cookieOptions += '=' + options[option].split(';')[0];
                                            }
                                        }
                                    }
                                    document.cookie = key + '=' + value + cookieOptions;
                                },
                                getItem: function (key) {
                                    var cookies = document.cookie.split('; ');
                                    for (var i = 0, il = cookies.length; i < il; i++) {
                                        var
                                            parts    = cookies[i].split('='),
                                            foundKey = parts[0].replace(/(%[\da-f]{2})+/gi, decodeURIComponent)
                                        ;
                                        if (key === foundKey) {
                                            return parts[1] || '';
                                        }
                                    }
                                },
                                removeItem: function (key, options) {
                                    storage.setItem(key, '', options);
                                },
                            };
                        }

                        module.error(error.noStorage);
                    },
                    storageOptions: function () {
                        var
                            options = {}
                        ;
                        if (settings.expires) {
                            options.expires = module.get.expirationDate(settings.expires);
                        }
                        if (settings.domain) {
                            options.domain = settings.domain;
                        }
                        if (settings.path) {
                            options.path = settings.path;
                        }
                        if (settings.secure) {
                            options.secure = settings.secure;
                        }
                        if (settings.samesite) {
                            options.samesite = settings.samesite;
                        }

                        return options;
                    },
                },

                clear: function () {
                    module.storage.remove(settings.key);
                },

                storage: {
                    set: function (key, value) {
                        var
                            options = module.get.storageOptions()
                        ;
                        if (storage === window.localStorage && options.expires) {
                            module.debug('Storing expiration value in localStorage', key, options.expires);
                            storage.setItem(key + settings.expirationKey, options.expires);
                        }
                        module.debug('Value stored', key, value);
                        try {
                            storage.setItem(key, value, options);
                        } catch (e) {
                            module.error(error.setItem, e);
                        }
                    },
                    get: function (key) {
                        var
                            storedValue
                        ;
                        storedValue = storage.getItem(key);
                        if (storage === window.localStorage) {
                            var expiration = storage.getItem(key + settings.expirationKey);
                            if (expiration !== null && expiration !== undefined && new Date(expiration) < new Date()) {
                                module.debug('Value in localStorage has expired. Deleting key', key);
                                module.storage.remove(key);
                                storedValue = null;
                            }
                        }
                        if (storedValue === 'undefined' || storedValue === 'null' || storedValue === undefined || storedValue === null) {
                            storedValue = undefined;
                        }

                        return storedValue;
                    },
                    remove: function (key) {
                        var
                            options = module.get.storageOptions()
                        ;
                        options.expires = module.get.expirationDate(-1);
                        if (storage === window.localStorage) {
                            storage.removeItem(key + settings.expirationKey);
                        }
                        storage.removeItem(key, options);
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
                        module.performance.timer = setTimeout(module.performance.display, 500);
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
                        if (moduleSelector) {
                            title += ' \'' + moduleSelector + '\'';
                        }
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
                    instance.invoke('destroy');
                }
                module.initialize();
            }
        });

        return returnedValue !== undefined
            ? returnedValue
            : this;
    };

    $.fn.nag.settings = {

        name: 'Nag',

        silent: false,
        debug: false,
        verbose: false,
        performance: true,

        namespace: 'Nag',

        // allows cookie to be overridden
        persist: false,

        // set to zero to require manually dismissal, otherwise hides on its own
        displayTime: 0,

        animation: {
            show: 'slide',
            hide: 'slide',
        },

        context: false,
        detachable: false,

        expires: 30,

        // cookie storage only options
        domain: false,
        path: '/',
        secure: false,
        samesite: false,

        // type of storage to use
        storageMethod: 'cookie',

        // value to store in dismissed localstorage/cookie
        key: 'nag',
        value: 'dismiss',

        // Key suffix to support expiration in localstorage
        expirationKey: 'ExpirationDate',

        error: {
            noStorage: 'Unsupported storage method',
            method: 'The method you called is not defined.',
            setItem: 'Unexpected error while setting value',
            expiresFormat: '"expires" must be a number of days or a Date Object',
        },

        className: {
            bottom: 'bottom',
            fixed: 'fixed',
        },

        selector: {
            close: '> .close.icon',
        },

        duration: 500,
        easing: 'easeOutQuad',

        // callback before show animation, return false to prevent show
        onShow: function () {},

        // called after show animation
        onVisible: function () {},

        // callback before hide animation, return false to prevent hide
        onHide: function () {},

        // callback after hide animation
        onHidden: function () {},

    };

    // Adds easing
    $.extend($.easing, {
        easeOutQuad: function (x) {
            return 1 - (1 - x) * (1 - x);
        },
    });
})(jQuery, window, document);
