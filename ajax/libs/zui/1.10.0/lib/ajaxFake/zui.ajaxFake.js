/*!
 * ZUI: Ajax 响应模拟工具 - v1.10.0 - 2021-11-04
 * http://openzui.com
 * GitHub: https://github.com/easysoft/zui.git 
 * Copyright (c) 2021 cnezsoft.com; Licensed MIT
 */

/* ========================================================================
 * ZUI: AjaxFake.js
 * http://openzui.com
 * ========================================================================
 * Copyright (c) 2017-2019 cnezsoft.com; Licensed MIT
 * ======================================================================== */


(function($) {
    'use strict';

    var routers = [];
    var ajax = $.ajax;

    var getMatchRouter = function(url) {
        for(var i = (routers.length - 1); i >= 0; --i) {
            var router = routers[i];
            if (router.urlMatch instanceof RegExp) {
                if (router.urlMatch.test(url)) {
                    return $.extend(true, {url: url}, router);
                }
            } else if (typeof router.urlMatch === 'function') {
                if (router.urlMatch(url)) {
                    return $.extend(true, {url: url}, router);
                }
            } else if (url.indexOf(router.urlMatch) === 0) {
                return $.extend(true, {url: url}, router);
            }
        }
    };

    var ajaxFake = function(options) {
        var url = options.url;
        var router = getMatchRouter(url);
        if (router) {
            var onSuccess = function(data, textStatus) {
                if (router.aborted) {
                    return;
                }
                var dataType = options.dataType;
                if (dataType === 'json') {
                    if (typeof data === 'string') {
                        data = $.parseJSON(data);
                    }
                } else {
                    if (typeof data !== 'string') {
                        data = JSON.stringify(data);
                    }
                }
                if (options.success) {
                    options.success(data, textStatus);
                }
                if (router.doneCallback) {
                    router.doneCallback(data, textStatus);
                }
                if (options.complete) {
                    options.complete(null, textStatus);
                }
                if (router.alwaysCallback) {
                    router.alwaysCallback(data, textStatus);
                }
            };
            var onError = function(textStatus, errorThrown) {
                if (router.aborted) {
                    return;
                }
                if (options.error) {
                    options.error(null, textStatus, errorThrown);
                }
                if (router.failCallback) {
                    router.failCallback(textStatus, errorThrown);
                }
                if (options.complete) {
                    options.complete(null, textStatus);
                }
                if (router.alwaysCallback) {
                    router.alwaysCallback(textStatus, errorThrown);
                }
            };
            if (options.beforeSend) {
                options.beforeSend(null, options);
            }
            var processRouter = function() {
                if (router.aborted) {
                    return;
                }
                var result = typeof router.route === 'function' ? router.route.call(router, options, onSuccess, onError) : router.route;
                if (result !== true) {
                    if (result === false) {
                        onError(500);
                    } else {
                        onSuccess(result, 200);
                    }
                }
                console.groupCollapsed('%cFakeAjax %c' + url + '%c ' + (result === false ? 'Error' : 'Success'), 'color: lightblue', 'text-decoration: underline', (result === false) ? 'color: red' : 'color: green');
                console.log('response', result);
                console.log('ajax options', options);
                console.groupEnd();
                return result;
            }
            setTimeout(processRouter, router.delay || 0);
            return router;
        }
        return ajax.apply(null, arguments);
    };

    var fakeServer = function(urlMatch, route, options) {
        if (!$.ajax_origin) {
            $.ajax_origin = ajax;
            $.ajax = ajaxFake;
        }
        var router = {
            done: function(doneCallback) {
                this.doneCallback = doneCallback;
                return this;
            },
            fail: function(failCallback) {
                this.failCallback = failCallback;
                return this;
            },
            always: function(alwaysCallback) {
                this.alwaysCallback = alwaysCallback;
                return this;
            },
            abort: function() {
                this.aborted = true;
            }
        };
        if ($.isPlainObject(urlMatch)) {
            $.extend(router, urlMatch);
        } else {
            router.urlMatch = urlMatch;
            router.route = route;
            if ($.isPlainObject(options)) {
                $.extend(router, options);
            } else if (typeof options === 'number') {
                router.delay = options;
            }
        }
        routers.push(router);
    };

    $.fakeServer = fakeServer;
}(jQuery));
