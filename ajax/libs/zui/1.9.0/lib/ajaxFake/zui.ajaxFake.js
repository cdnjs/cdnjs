/*!
 * ZUI: Ajax 响应模拟工具 - v1.9.0 - 2019-03-04
 * http://zui.sexy
 * GitHub: https://github.com/easysoft/zui.git 
 * Copyright (c) 2019 cnezsoft.com; Licensed MIT
 */

/* ========================================================================
 * ZUI: AjaxFake.js
 * http://zui.sexy
 * ========================================================================
 * Copyright (c) 2017-2018 cnezsoft.com; Licensed MIT
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
                    return router;
                }
            } else if (typeof router.urlMatch === 'function') {
                if (router.urlMatch(url)) {
                    return router;
                }
            } else if (url.indexOf(router.urlMatch) === 0) {
                return router;
            }
        }
    };

    var ajaxFake = function(options) {
        var url = options.url;
        var router = getMatchRouter(url);
        if (router) {
            var onSuccess = function(data, textStatus) {
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
                if (options.complete) {
                    options.complete(null, textStatus);
                }
            };
            var onError = function(textStatus, errorThrown) {
                if (options.error) {
                    options.error(null, textStatus, errorThrown);
                }
                if (options.complete) {
                    options.complete(null, textStatus);
                }
            };
            if (options.beforeSend) {
                options.beforeSend(null, options);
            }
            var processRouter = function() {
                var result = $.isFunction(router.route) ? router.route(options, onSuccess, onError) : router.route;
                if (result !== true) {
                    if (result === false) {
                        onError();
                    } else {
                        onSuccess(result);
                    }
                }
                console.groupCollapsed('FakeAjax: ' + url + ' %c' + (result === false ? 'Error' : 'Success'), (result === false) ? 'color: red' : 'color: green');
                console.log('response', result);
                console.log('ajax options', options);
                console.groupEnd();
                return result;
            }
            if (router.delay) {
                setTimeout(processRouter, router.delay);
            } else {
                processRouter();
            }
            return router;
        }
        return ajax.apply(null, arguments);
    };

    var fakeServer = function(urlMatch, route, options) {
        if (!$.ajax_origin) {
            $.ajax_origin = ajax;
            $.ajax = ajaxFake;
        }
        var router = {};
        if ($.isPlainObject(urlMatch)) {
            $.extend(router, urlMatch);
        } else {
            router.urlMatch = urlMatch;
            router.route = route;
            if ($.isPlainObject(options)) {
                $.extend(router, options);
            }
        }
        routers.push(router);
    };

    $.fakeServer = fakeServer;
}(jQuery));

