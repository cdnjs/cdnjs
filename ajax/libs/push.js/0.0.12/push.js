/**
 * Push
 * =======
 * A compact, cross-browser solution for the JavaScript Notifications API
 *
 * Credits
 * -------
 * Tsvetan Tsvetkov (ttsvetko)
 * Alex Gibson (alexgibson)
 *
 * License
 * -------
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2015-2017 Tyler Nickerson
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * @preserve
 */

(function (global, factory) {

    'use strict';

    /* Use AMD */
    if (typeof define === 'function' && define.amd) {
        define(function () {
            return new (factory(global, global.document))();
        });
    }
    /* Use CommonJS */
    else if (typeof module !== 'undefined' && module.exports) {
        module.exports = new (factory(global, global.document))();
    }
    /* Use Browser */
    else {
        global.Push = new (factory(global, global.document))();
    }

})(typeof window !== 'undefined' ? window : this, function (w, d) {

    var Push = function () {

        /**********************
            Local Variables
        /**********************/

        var
        self = this,
        isUndefined   = function (obj) { return obj === undefined; },
        isString   = function (obj) { return String(obj) === obj },
        isFunction = function (obj) { return obj && {}.toString.call(obj) === '[object Function]'; },

        /* ID to use for new notifications */
        currentId = 0,

        /* Message to show if there is no suport to Push Notifications */
        incompatibilityErrorMessage = 'PushError: push.js is incompatible with browser.',

        /* Whether Push has permission to notify */
        hasPermission = false,

        /* Map of open notifications */
        notifications = {},

        /* Testing variable for the last service worker path used */
        lastWorkerPath = null,

        /**********************
            Helper Functions
        /**********************/

        /**
         * Closes a notification
         * @param {Notification} notification
         * @return {Boolean} boolean denoting whether the operation was successful
         */
        closeNotification = function (id) {
            var errored = false,
                notification = notifications[id];

            if (typeof notification !== 'undefined') {
                /* Safari 6+, Chrome 23+ */
                if (notification.close) {
                    notification.close();
                /* Legacy webkit browsers */
                } else if (notification.cancel) {
                    notification.cancel();
                /* IE9+ */
                } else if (w.external && w.external.msIsSiteMode) {
                    w.external.msSiteModeClearIconOverlay();
                } else {
                    errored = true;
                    throw new Error('Unable to close notification: unknown interface');
                }

                if (!errored) {
                    return removeNotification(id);
                }
            }

            return false;
        },

        /**
         * Adds a notification to the global dictionary of notifications
         * @param {Notification} notification
         * @return {Integer} Dictionary key of the notification
         */
        addNotification = function (notification) {
            var id = currentId;
            notifications[id] = notification;
            currentId++;
            return id;
        },

        /**
         * Removes a notification with the given ID
         * @param  {Integer} id - Dictionary key/ID of the notification to remove
         * @return {Boolean} boolean denoting success
         */
        removeNotification = function (id) {
            var dict = {},
                success = false,
                key;

            for (key in notifications) {
                if (notifications.hasOwnProperty(key)) {
                    if (key != id) {
                        dict[key] = notifications[key];
                    } else {
                        // We're successful if we omit the given ID from the new array
                        success = true;
                    }
                }
            }
            // Overwrite the current notifications dictionary with the filtered one
            notifications = dict;
            return success;
        },

        prepareNotification = function (id, options) {
            var wrapper;

            /* Wrapper used to get/close notification later on */
            wrapper = {
                get: function () {
                    return notifications[id];
                },

                close: function () {
                    closeNotification(id);
                }
            };

            /* Autoclose timeout */
            if (options.timeout) {
                setTimeout(function () {
                    wrapper.close();
                }, options.timeout);
            }

            return wrapper;
        },

        /**
         * Callback function for the 'create' method
         * @return {void}
         */
        createCallback = function (title, options, resolve) {
            var notification,
                onClose;

            /* Set empty settings if none are specified */
            options = options || {};

            /* Set the last service worker path for testing */
            self.lastWorkerPath = options.serviceWorker || 'serviceWorker.js';

            /* onClose event handler */
            onClose = function (id) {
                /* A bit redundant, but covers the cases when close() isn't explicitly called */
                removeNotification(id);
                if (isFunction(options.onClose)) {
                    options.onClose.call(this, notification);
                }
            };

            /* Safari 6+, Firefox 22+, Chrome 22+, Opera 25+ */
            if (w.Notification) {
                try {
                    notification =  new w.Notification(
                        title,
                        {
                            icon: (isString(options.icon) || isUndefined(options.icon)) ? options.icon : options.icon.x32,
                            body: options.body,
                            tag: options.tag,
                            requireInteraction: options.requireInteraction
                        }
                    );
                } catch (e) {
                    if (w.navigator) {
                        /* Register ServiceWorker using lastWorkerPath */
                        w.navigator.serviceWorker.register(self.lastWorkerPath);
                        w.navigator.serviceWorker.ready.then(function(registration) {
                            var localData = {
                                id: currentId,
                                link: options.link,
                                origin: document.location.href,
                                onClick: (isFunction(options.onClick)) ? options.onClick.toString() : '',
                                onClose: (isFunction(options.onClose)) ? options.onClose.toString() : ''
                            };

                            if (typeof options.data !== 'undefined' && options.data !== null)
                                localData = Object.assign(localData, options.data);

                            /* Show the notification */
                            registration.showNotification(
                                title,
                                {
                                    icon: options.icon,
                                    body: options.body,
                                    vibrate: options.vibrate,
                                    tag: options.tag,
                                    data: localData,
                                    requireInteraction: options.requireInteraction
                                }
                            ).then(function() {
                                var id;

                                /* Find the most recent notification and add it to the global array */
                                registration.getNotifications().then(function(notifications) {
                                    id = addNotification(notifications[notifications.length - 1]);

                                    /* Send an empty message so the ServiceWorker knows who the client is */
                                    registration.active.postMessage('');

                                    /* Listen for close requests from the ServiceWorker */
                                    navigator.serviceWorker.addEventListener('message', function (event) {
                                        var data = JSON.parse(event.data);

                                        if (data.action === 'close' && Number.isInteger(data.id))
                                            removeNotification(data.id);
                                    });

                                    resolve(prepareNotification(id, options));
                                });
                            });
                        });
                    }
                }

            /* Legacy webkit browsers */
            } else if (w.webkitNotifications) {

                notification = w.webkitNotifications.createNotification(
                    options.icon,
                    title,
                    options.body
                );

                notification.show();

            /* Firefox Mobile */
            } else if (navigator.mozNotification) {

                notification = navigator.mozNotification.createNotification(
                    title,
                    options.body,
                    options.icon
                );

                notification.show();

            /* IE9+ */
            } else if (w.external && w.external.msIsSiteMode()) {

                //Clear any previous notifications
                w.external.msSiteModeClearIconOverlay();
                w.external.msSiteModeSetIconOverlay(
                    ((isString(options.icon) || isUndefined(options.icon))
                    ? options.icon
                    : options.icon.x16), title
                );
                w.external.msSiteModeActivate();

                notification = {};
            } else {
                throw new Error('Unable to create notification: unknown interface');
            }

            if (typeof(notification) !== 'undefined') {
                var id = addNotification(notification),
                    wrapper = prepareNotification(id, options);

                /* Notification callbacks */
                if (isFunction(options.onShow))
                    notification.addEventListener('show', options.onShow);

                if (isFunction(options.onError))
                    notification.addEventListener('error', options.onError);

                if (isFunction(options.onClick))
                    notification.addEventListener('click', options.onClick);

                notification.addEventListener('close', function() {
                    onClose(id);
                });

                notification.addEventListener('cancel', function() {
                    onClose(id);
                });

                /* Return the wrapper so the user can call close() */
                resolve(wrapper);
            }

            resolve({}); // By default, pass an empty wrapper
        },

        /**
         * Permission types
         * @enum {String}
         */
        Permission = {
            DEFAULT: 'default',
            GRANTED: 'granted',
            DENIED: 'denied'
        },

        Permissions = [Permission.GRANTED, Permission.DEFAULT, Permission.DENIED];

        /* Allow enums to be accessible from Push object */
        self.Permission = Permission;

        /*****************
            Permissions
        /*****************/

        /**
         * Requests permission for desktop notifications
         * @param {Function} callback - Function to execute once permission is granted
         * @return {void}
         */
        self.Permission.request = function (onGranted, onDenied) {
            var existing = self.Permission.get();

            /* Return if Push not supported */
            if (!self.isSupported) {
                throw new Error(incompatibilityErrorMessage);
            }

            /* Default callback */
            callback = function (result) {

                switch (result) {

                    case self.Permission.GRANTED:
                        hasPermission = true;
                        if (onGranted) onGranted();
                        break;

                    case self.Permission.DENIED:
                        hasPermission = false;
                        if (onDenied) onDenied();
                        break;

                }

            };

            /* Permissions already set */
            if (existing !== self.Permission.DEFAULT) {
                callback(existing);
            }
            /* Safari 6+, Chrome 23+ */
            else if (w.Notification && w.Notification.requestPermission) {
                Notification.requestPermission(callback);
            }
            /* Legacy webkit browsers */
            else if (w.webkitNotifications && w.webkitNotifications.checkPermission) {
                w.webkitNotifications.requestPermission(callback);
            } else {
                throw new Error(incompatibilityErrorMessage);
            }
        };

        /**
         * Returns whether Push has been granted permission to run
         * @return {Boolean}
         */
        self.Permission.has = function () {
            return hasPermission;
        };

        /**
         * Gets the permission level
         * @return {Permission} The permission level
         */
        self.Permission.get = function () {

            var permission;

            /* Return if Push not supported */
            if (!self.isSupported) { throw new Error(incompatibilityErrorMessage); }

            /* Safari 6+, Chrome 23+ */
            if (w.Notification && w.Notification.permissionLevel) {
                permission = w.Notification.permissionLevel;

            /* Legacy webkit browsers */
            } else if (w.webkitNotifications && w.webkitNotifications.checkPermission) {
                permission = Permissions[w.webkitNotifications.checkPermission()];

            /* Firefox 23+ */
            } else if (w.Notification && w.Notification.permission) {
                permission = w.Notification.permission;

            /* Firefox Mobile */
            } else if (navigator.mozNotification) {
                permission = Permission.GRANTED;

            /* IE9+ */
            } else if (w.external && w.external.msIsSiteMode() !== undefined) {
                permission = w.external.msIsSiteMode() ? Permission.GRANTED : Permission.DEFAULT;
            } else {
                throw new Error(incompatibilityErrorMessage);
            }

            return permission;

        };

        /*********************
            Other Functions
        /*********************/

        /**
         * Detects whether the user's browser supports notifications
         * @return {Boolean}
         */
        self.isSupported = (function () {

             var isSupported = false;

             try {

                 isSupported =

                     /* Safari, Chrome */
                     !!(w.Notification ||

                     /* Chrome & ff-html5notifications plugin */
                     w.webkitNotifications ||

                     /* Firefox Mobile */
                     navigator.mozNotification ||

                     /* IE9+ */
                     (w.external && w.external.msIsSiteMode() !== undefined));

             } catch (e) {}

             return isSupported;

         })();

         /**
          * Creates and displays a new notification
          * @param {Array} options
          * @return {Promise}
          */
        self.create = function (title, options) {
            var promiseCallback;

            /* Fail if the browser is not supported */
            if (!self.isSupported) {
                throw new Error(incompatibilityErrorMessage);
            }

            /* Fail if no or an invalid title is provided */
            if (!isString(title)) {
                throw new Error('PushError: Title of notification must be a string');
            }

            /* Request permission if it isn't granted */
            if (!self.Permission.has()) {
                promiseCallback = function(resolve, reject) {
                    self.Permission.request(function() {
                        try {
                            createCallback(title, options, resolve);
                        } catch (e) {
                            reject(e);
                        }
                    }, function() {
                        reject("Permission request declined");
                    });
                };
            } else {
                promiseCallback = function(resolve, reject) {
                    try {
                        createCallback(title, options, resolve);
                    } catch (e) {
                        reject(e);
                    }
                };
            }

            return new Promise(promiseCallback);
        };

        /**
         * Returns the notification count
         * @return {Integer} The notification count
         */
        self.count = function () {
            var count = 0,
                key;

            for (key in notifications)
                count++;

            return count;
        },

        /**
         * Internal function that returns the path of the last service worker used
         * For testing purposes only
         * @return {String} The service worker path
         */
        self.__lastWorkerPath = function () {
            return self.lastWorkerPath;
        },

        /**
         * Closes a notification with the given tag
         * @param {String} tag - Tag of the notification to close
         * @return {Boolean} boolean denoting success
         */
        self.close = function (tag) {
            var key;
            for (key in notifications) {
                notification = notifications[key];
                /* Run only if the tags match */
                if (notification.tag === tag) {
                    /* Call the notification's close() method */
                    return closeNotification(key);
                }
            }
        };

        /**
         * Clears all notifications
         * @return {void}
         */
        self.clear = function () {
            var success = true;

            for (key in notifications)
                success = success && closeNotification(key);

            return success;
        };
    };

    return Push;

});
