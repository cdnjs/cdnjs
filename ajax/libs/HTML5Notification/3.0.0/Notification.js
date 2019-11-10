/*! HTML5 Notification - v3.0.0 - 2016-09-19

Copyright 2016 Tsvetan Tsvetkov

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

/** @namespace window */
/** @namespace window.webkitNotifications */
/** @namespace window.external */
(function() {
    /*
     Safari native methods required for Notifications do NOT run in strict mode.
     */
    //'use strict';
    // local variables
    var PERMISSION_DEFAULT = "default";
    // The user decision is unknown; in this case the application will act as if permission was denied.
    var PERMISSION_GRANTED = "granted";
    // The user has explicitly granted permission for the current origin to display system notifications.
    var PERMISSION_DENIED = "denied";
    // The user has explicitly denied permission for the current origin to display system notifications.
    var PERMISSION_NOTSUPPORTED = "notsupported";
    // The Notification API is not supported on current environment
    // map for the old permission values
    var PERMISSIONS = [ PERMISSION_GRANTED, PERMISSION_DEFAULT, PERMISSION_DENIED, PERMISSION_NOTSUPPORTED ];
    var DIRESCTIONS = [ "auto", "ltr", "rtl" ];
    /*
        IE does not support Notifications in the same meaning as other modern browsers.
        On the other side, IE9+(except MS Edge) implement flashing pinned site taskbar buttons.
        Each time new IE Notification is create, previous flashing and icon overlay is cleared.
        So, we need to keep track of the notification that calls close method.
     */
    var IENotificationIndex = -1;
    var IECloseNotificationEvents = [ "click", "scroll", "focus" ];
    var getIco = function(icon) {
        var lastIndex = icon.lastIndexOf(".");
        return (lastIndex !== -1 ? icon.substr(0, lastIndex) : icon) + ".ico";
    };
    /*
     * Internal Notificaiton constructor. Keeps the original Notification
     * constructor if any or use empty function constructor for browsers
     * that do not support Notifications
     */
    var _Notification = window.Notification || /* Opera Mobile/Android Browser */
    window.webkitNotifications && WebKitNotification || /* IE9+ pinned site */
    "external" in window && "msIsSiteMode" in window.external && window.external.msIsSiteMode() !== undefined && IENotification || /* Notifications Not supported. Return dummy constructor */
    DummyNotification;
    /**
     * @constructor DummyNotification
     */
    function DummyNotification() {
        var dummyElement = document.createElement("div");
        this.addEventListener = function(eventName, callback) {
            dummyElement.addEventListener(eventName, callback.bind(this));
        };
        this.removeEventListener = function(eventName, callback) {
            dummyElement.removeEventListener(eventName, callback.bind(this));
        };
        this.dispatchEvent = function(eventName) {
            if (typeof eventName !== "string") {
                return;
            }
            try {
                dummyElement.dispatchEvent(new Event(eventName));
            } catch (e) {
                var event = document.createEvent("Event");
                event.initEvent(eventName, false, true);
                dummyElement.dispatchEvent(event);
            }
        };
    }
    Object.defineProperty(DummyNotification, "permission", {
        enumerable: true,
        get: function() {
            return PERMISSION_NOTSUPPORTED;
        }
    });
    Object.defineProperty(DummyNotification, "requestPermission", {
        enumerable: true,
        writable: true,
        value: function(callback) {
            callback(this.permission);
        }
    });
    /**
     * @constructor IENotification
     */
    function IENotification(title, options) {
        DummyNotification.call(this);
        var notificationIndex = IENotificationIndex;
        Object.defineProperties(this, {
            close: {
                value: function(event) {
                    if (notificationIndex === IENotificationIndex) {
                        window.external.msSiteModeClearIconOverlay();
                        // Remove close events
                        IECloseNotificationEvents.forEach(function(event) {
                            window.removeEventListener(event, this.close);
                        }.bind(this));
                        this.dispatchEvent("click");
                        this.dispatchEvent("close");
                        notificationIndex = null;
                    }
                }.bind(this)
            }
        });
        // Clear any previous icon overlay
        this.close();
        // Set icon
        if (this.icon) {
            window.external.msSiteModeSetIconOverlay(getIco(this.icon), this.description || this.title);
        }
        // Blink icon
        window.external.msSiteModeActivate();
        // Trigger show event
        this.dispatchEvent("show");
        // Attach close event to window
        IECloseNotificationEvents.forEach(function(event) {
            window.addEventListener(event, this.close);
        }.bind(this));
        // Increment notification index
        notificationIndex = ++IENotificationIndex;
    }
    Object.defineProperty(IENotification, "permission", {
        enumerable: true,
        get: function() {
            var isTabPinned = window.external.msIsSiteMode();
            return isTabPinned ? PERMISSION_GRANTED : PERMISSION_DENIED;
        }
    });
    Object.defineProperty(IENotification, "requestPermission", {
        enumerable: true,
        writable: true,
        value: function(callback) {
            return new Promise(function(resolve, reject) {
                if (this.permission === PERMISSION_DENIED) {
                    alert(this.PERMISSION_REQUEST_MESSAGE);
                }
                resolve(this.permission);
            }.bind(this));
        }
    });
    Object.defineProperty(IENotification, "PERMISSION_REQUEST_MESSAGE", {
        writable: true,
        value: "IE supports notifications in pinned mode only. Pin this page on your taskbar to receive notifications."
    });
    /**
     * @constructor WebKitNotification
     */
    function WebKitNotification() {}
    Object.defineProperty(WebKitNotification, "permission", {
        enumerable: true,
        get: function() {
            return PERMISSIONS[window.webkitNotifications.checkPermission()];
        }
    });
    Object.defineProperty(WebKitNotification, "requestPermission", {
        enumerable: true,
        writable: true,
        value: function(callback) {
            return new Promise(function(resolve, reject) {
                window.webkitNotifications.requestPermission(function(permission) {
                    resolve(permission);
                });
            });
        }
    });
    /*
        [Safari] Safari6 do not support Notification.permission.
        Instead, it support Notification.permissionLevel()
     */
    if (!_Notification.permission) {
        Object.defineProperty(_Notification, "permission", {
            enumerable: true,
            get: function() {
                return _Notification.permissionLevel && _Notification.permissionLevel();
            }
        });
    }
    /**
     * @constructor Notification
     */
    function Notification(title, options) {
        var dir;
        var notification;
        if (!arguments.length) {
            throw TypeError('Failed to construct "Notification": 1 argument required, but only 0 present.');
        }
        /*
            Chrome display notifications when title is empty screen, but
            Safari do NOT.

            Set title to non-display characted in order to display notifications
            in Safari as well when title is empty.
         */
        if (title === "") {
            title = "\b";
        }
        if (arguments.length > 1 && "object" !== typeof options) {
            throw TypeError('Failed to construct "Notification": parameter 2 ("options") is not an object.');
        }
        dir = Object(options).dir;
        if (dir !== undefined && DIRESCTIONS.indexOf(dir) === -1) {
            throw TypeError('Failed to construct "Notification": The provided value "' + dir + '" is not a valid enum value of type NotificationDirection.');
        }
        options = Object(options);
        notification = new _Notification(title, options);
        /* TODO: actions property */
        /* TODO: badge property */
        if (!notification.body) {
            Object.defineProperty(notification, "body", {
                value: String(options.body || "")
            });
        }
        if (!notification.data) {
            Object.defineProperty(notification, "data", {
                value: options.data || null
            });
        }
        if (!notification.dir) {
            Object.defineProperty(notification, "dir", {
                value: dir || DIRESCTIONS[0]
            });
        }
        if (!notification.icon) {
            Object.defineProperty(notification, "icon", {
                value: String(options.icon || "")
            });
        }
        if (!notification.lang) {
            Object.defineProperty(notification, "lang", {
                value: String(options.lang || "")
            });
        }
        /* TODO: noscreen property */
        /* TODO: renotify property */
        if (!notification.requireInteraction) {
            Object.defineProperty(notification, "requireInteraction", {
                value: Boolean(options.requireInteraction)
            });
        }
        /* TODO: sound property */
        if (!notification.silent) {
            Object.defineProperty(notification, "silent", {
                value: Boolean(options.silent)
            });
        }
        if (!notification.tag) {
            Object.defineProperty(notification, "tag", {
                value: String(options.tag || "")
            });
        }
        if (!notification.title) {
            Object.defineProperty(notification, "title", {
                value: String(title)
            });
        }
        if (!notification.timestamp) {
            Object.defineProperty(notification, "timestamp", {
                value: new Date().getTime()
            });
        }
        /* TODO: vibrate property */
        return notification;
    }
    Object.defineProperty(Notification, "permission", {
        enumerable: true,
        get: function() {
            return _Notification.permission;
        }
    });
    /*
        Notification.requestPermission should return a Promise(by spec).
        Keep the original method and replace it with a custom one that
        checks if the call of Notification.requestPermission returns a promise
        and if not, then return a custom object that simulates the Promise object.

        Specification:
        Notification.requestPermission().then(callback);

        Old Spec:
        Notification.requestPermission(callback);
     */
    Object.defineProperty(Notification, "requestPermission", {
        enumerable: true,
        value: function() {
            return new Promise(function(resolve, reject) {
                var promise = _Notification.requestPermission(function(permission) {
                    resolve(permission);
                });
                if (!(promise instanceof Promise)) {
                    return;
                }
                resolve(promise);
            });
        }
    });
    window.Notification = Notification;
})();