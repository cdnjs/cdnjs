(function (root, factory) {

    'use strict';

    if (typeof define === 'function' && define.amd) {
        // AMD environment
        define('notify', [], function () {
            return factory(root, document);
        });
    } else if (typeof exports === 'object') {
        // CommonJS environment
        module.exports = factory(root, document);
    } else {
        // Browser environment
        root.Notify = factory(root, document);
    }

}(window, function (w, d) {

    'use strict';

    function Notify(title, options) {

        if (typeof title !== 'string') {
            throw new Error('Notify(): first arg (title) must be a string.');
        }

        this.title = title;

        this.options = {
            icon: '',
            body: '',
            tag: '',
            notifyShow: null,
            notifyClose: null,
            notifyClick: null,
            notifyError: null,
            permissionGranted: null,
            permissionDenied: null,
            timeout: null
        };

        this.permission = null;

        if (!Notify.isSupported()) {
            return;
        }

        //User defined options for notification content
        if (typeof options === 'object') {

            for (var i in options) {
                if (options.hasOwnProperty(i)) {
                    this.options[i] = options[i];
                }
            }

            //callback when notification is displayed
            if (typeof this.options.notifyShow === 'function') {
                this.onShowCallback = this.options.notifyShow;
            }

            //callback when notification is closed
            if (typeof this.options.notifyClose === 'function') {
                this.onCloseCallback = this.options.notifyClose;
            }

            //callback when notification is clicked
            if (typeof this.options.notifyClick === 'function') {
                this.onClickCallback = this.options.notifyClick;
            }

            //callback when notification throws error
            if (typeof this.options.notifyError === 'function') {
                this.onErrorCallback = this.options.notifyError;
            }
        }
    }

    // return true if the browser supports HTML5 Notification
    Notify.isSupported = function () {
        if ('Notification' in w) {
            return true;
        }
        return false;
    };

    // returns true if the permission is not granted
    Notify.needsPermission = function () {
        if (Notify.isSupported() && Notification.permission === 'granted') {
            return false;
        }
        return true;
    };

    // asks the user for permission to display notifications.  Then calls the callback functions is supplied.
    Notify.requestPermission = function (onPermissionGrantedCallback, onPermissionDeniedCallback) {
        if (Notify.isSupported()) {
            w.Notification.requestPermission(function (perm) {
                switch (perm) {
                    case 'granted':
                        if (typeof onPermissionGrantedCallback === 'function') {
                            onPermissionGrantedCallback();
                        }
                        break;
                    case 'denied':
                        if (typeof onPermissionDeniedCallback === 'function') {
                            onPermissionDeniedCallback();
                        }
                        break;
                }
            });
        }
    };


    Notify.prototype.show = function () {
        var that = this;

        if (!Notify.isSupported()) {
            return;
        }

        this.myNotify = new Notification(this.title, {
            'body': this.options.body,
            'tag' : this.options.tag,
            'icon' : this.options.icon
        });

        if (this.options.timeout && !isNaN(this.options.timeout)) {
            setTimeout(this.close.bind(this), this.options.timeout * 1000);
        }

        this.myNotify.addEventListener('show', this, false);
        this.myNotify.addEventListener('error', this, false);
        this.myNotify.addEventListener('close', this, false);
        this.myNotify.addEventListener('click', this, false);
    };

    Notify.prototype.onShowNotification = function (e) {
        if (this.onShowCallback) {
            this.onShowCallback(e);
        }
    };

    Notify.prototype.onCloseNotification = function () {
        if (this.onCloseCallback) {
            this.onCloseCallback();
        }
        this.destroy();
    };

    Notify.prototype.onClickNotification = function () {
        if (this.onClickCallback) {
            this.onClickCallback();
        }
    };

    Notify.prototype.onErrorNotification = function () {
        if (this.onErrorCallback) {
            this.onErrorCallback();
        }
        this.destroy();
    };

    Notify.prototype.destroy = function () {
        this.myNotify.removeEventListener('show', this, false);
        this.myNotify.removeEventListener('error', this, false);
        this.myNotify.removeEventListener('close', this, false);
        this.myNotify.removeEventListener('click', this, false);
    };

    Notify.prototype.close = function () {
        this.myNotify.close();
    };

    Notify.prototype.handleEvent = function (e) {
        switch (e.type) {
        case 'show':
            this.onShowNotification(e);
            break;
        case 'close':
            this.onCloseNotification(e);
            break;
        case 'click':
            this.onClickNotification(e);
            break;
        case 'error':
            this.onErrorNotification(e);
            break;
        }
    };

    return Notify;

}));
