/**
 * @fileOverview Webkit Notification API jQuery Wrapper
 *
 * @see http://www.chromium.org/developers/design-documents/desktop-notifications/api-specification
 * @see http://www.html5rocks.com/en/tutorials/notifications/quick/
 *
 * @author azproduction
 * @licence MIT (c) azproduction 2011
 */
jQuery.notification = (function ($, window) {

/**
 * @see http://www.w3.org/TR/notifications/
 *
 * @type {Function}
 */
var W3CNotification = (function () {
    // Safari 6+ Firefox 22+
    if (window.Notification && window.Notification.permissionLevel || window.Notification.permission) return window.Notification;

    var webkitNotifications = window.webkitNotifications;

    // Non Webkit browsers
    if (!webkitNotifications) return (function () {
        var mockWebkitNotifications = {};
        mockWebkitNotifications.permission = "unsupported";
        mockWebkitNotifications.permissionLevel = function () {
            return "unsupported";
        };
        mockWebkitNotifications.requestPermission = $.noop;

        return mockWebkitNotifications;
    }());

    // 1 undefined
    // 2 forbidden
    // 0 allowed
    var notificationPermission = ["granted", "default", "denied"];

    // Older WebKit browsers
    var Notification = function (title, options) {
        options = options || {};
        if (!title) {
            return;
        }
        var instance = webkitNotifications.createNotification(options.iconUrl || "", title, options.body || "");

        instance.titleDir = options.titleDir || "auto";
        instance.body = options.body || "";
        instance.bodyDir = options.bodyDir || "auto";
        instance.tag = options.tag || "";
        instance.replaceId = options.tag || "";
        instance.iconUrl = options.iconUrl || "";

        instance.onclick = options.onclick || $.noop;
        instance.onshow = options.onshow || $.noop;
        instance.onerror = options.onerror || $.noop;
        instance.onclose = options.onclose || $.noop;
        instance.close = function () {
            instance.cancel();
        };

        if (Notification.permissionLevel() === "granted") {
            instance.show();
        }

        return instance;
    };

    Notification.permissionLevel = function () {
        return Notification.permission = notificationPermission[webkitNotifications.checkPermission()];
    };

    Notification.permissionLevel();

    Notification.requestPermission = function (callback) {

        if (Notification.permissionLevel() !== "default") {
            callback();
            return;
        }


        $(document).one('click', function () {
            if (webkitNotifications.requestPermission.length) {
                webkitNotifications.requestPermission(function () {
                    Notification.permissionLevel();
                    callback();
                });
                return;
            }

            // In old chrome webkitNotifications.requestPermission is without callback LOL
            webkitNotifications.requestPermission();
            var checkPermissionInterval = window.setInterval(function () {
                var permissionLevel = Notification.permissionLevel();

                if (permissionLevel !== "default") {
                    window.clearInterval(checkPermissionInterval);
                    callback();
                }
            }, 200);
        });
    };

    return Notification;
}());

/**
 * Notification
 *
 * @constructor
 *
 * @param {Object}   options                  if url passed -> HTML page mode else icon & title & content mode
 * @param {String}   [options.iconUrl]
 * @param {String}   [options.title]
 * @param {String}   [options.body]
 * @param {String}   [options.tag]            acts as window.name in window.open
 * @param {Function} [options.onclick]
 * @param {Function} [options.onclose]
 * @param {Function} [options.onshow]
 * @param {Function} [options.onerror]
 * @param {Boolean}  [options.autoclose=true] close block on click? close button is to small so its enable by default
 * @param {Number}   [options.timeout=Infinity] notification auto-close timeout
 *
 * @example
 *
 *      var message = $.notification(options);
 *      // messge will displayed as soon as user permit notifications
 *
 * @return {Deferred}
 */
var exports = function (options) {
    var dfd = $.Deferred();

    // Wired Safari 6 hack...
    if (!W3CNotification.prototype) {
        dfd.reject('unsupported');
        return dfd.promise();
    }

    if (typeof options === "string") {
        options = {
            title: options
        };
    }
    options = options || {};
    options.autoclose = typeof options.autoclose === "undefined" ? true : options.autoclose;
    options.timeout = options.timeout || Infinity;

    // fix older iconUrl
    var icon = options.iconUrl || options.icon;
    if (icon) {
        options.icon = icon;
    }

    W3CNotification.requestPermission(function () {
        if ((W3CNotification.permission || W3CNotification.permissionLevel()) !== "granted") {
            dfd.reject(W3CNotification.permissionLevel());
            return;
        }

        var instance = new W3CNotification(options.title, options);

        if (isFinite(options.timeout)) {
            instance.addEventListener('show', function () {
                setTimeout(function () {
                    instance.close();
                }, options.timeout);
            }, false);
        }

        if (options.autoclose) {
            instance.addEventListener('click', function () {
                instance.close();
            }, false)
        }

        dfd.resolve(instance);
    });

    return dfd.promise();
};

exports.permission = W3CNotification.permission;
exports.permissionLevel = W3CNotification.permissionLevel || function () {
    return W3CNotification.permission;
};
exports.requestPermission = W3CNotification.requestPermission;

return exports;

}(jQuery, window));