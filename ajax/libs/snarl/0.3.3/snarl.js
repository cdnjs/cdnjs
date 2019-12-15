/*!
 * Snarl - Web Notifications based on Growl
 * @version v0.3.3
 * @link https://hoxxep.github.io/snarl
 *
 * Copyright 2014-2015 Liam Gray <hoxxep@gmail.com>
 * Released under the MIT license
 * @license https://github.com/hoxxep/Snarl/blob/master/LICENSE 
 */

;(function (window, document) {
    'use strict';

    //TODO: add success, error, warning, and custom icons?
    //TODO: merge addNotification and reopenNotification
    // into a single openNotification(id, options) class?
    // eg. if no notification exists for id then create a new
    //     one and return new id otherwise reopen existing?

    //FUTURE: optional sidebar with past/missed notifications

    var Snarl = Snarl || {};

    /** 
     * Public object
     */
    Snarl = {
        count: 0,
        notifications: {},
        defaultOptions: {
            title: '',
            text: '',
            icon: '',
            timeout: 5000,
            action: null,
            dismissable: true
        },

        setDefaultOptions: function(options) {
            Snarl.defaultOptions = mergeOptions(Snarl.defaultOptions, options);
        },
        
        setNotificationHTML: function(html_string) {
            // turn string into HTML element
            var temp = document.createElement('div');
            temp.innerHTML = html_string;
            var notificationHTML = temp.firstChild;
            temp.removeChild(notificationHTML);
            
            notificationHtmlTemplate = notificationHTML;
        },
        
        addNotification: function(options) {
            Snarl.count += 1;
            var id = makeID();

            addNotificationHTML(id);
            Snarl.editNotification(id, options);

            return id;
        },

        editNotification: function(id, options) {
            if (Snarl.notifications[id].removeTimer !== null) {
                clearTimeout(Snarl.notifications[id].removeTimer);
                Snarl.notifications[id].removeTimer = null;
            }

            addNotificationHTML(id);

            options = options || {};

            // use default options for merging
            if (Snarl.notifications[id].options === undefined) {
                Snarl.notifications[id].options = Snarl.defaultOptions;
            }
            options = mergeOptions(Snarl.notifications[id].options, options);

            var element = Snarl.notifications[id].element;

            //** Title
            var title = element.getElementsByClassName('snarl-title')[0];
            if (options.title) {
                title.textContent = options.title;
                removeClass(element, 'snarl-no-title');
            } else {
                title.textContent = '';
                addClass(element, 'snarl-no-title');
            }

            //** Text
            var text = element.getElementsByClassName('snarl-text')[0];
            if (options.text) {
                text.textContent = options.text;
                removeClass(element, 'snarl-no-text');
            } else {
                text.textContent = '';
                addClass(element, 'snarl-no-text');
            }
            
            //** Icon
            var icon = element.getElementsByClassName('snarl-icon')[0];
            if (options.icon) {
                icon.innerHTML = options.icon;
                removeClass(element, 'snarl-no-icon');
            } else {
                icon.innerHTML = '';
                addClass(element, 'snarl-no-icon');
            }

            //** Timeout
            if (options.timer !== null) {
                clearTimeout(Snarl.notifications[id].timer);
            }
            var timer = null;
            if (options.timeout !== null) {
                timer = setTimeout(function() {
                    Snarl.removeNotification(id);
                }, options.timeout);
            }
            Snarl.notifications[id].timer = timer;

            //** Click Action/Callback
            Snarl.notifications[id].action = options.action;

            //** Dismissable
            if (options.dismissable) {
                removeClass(element, 'not-dismissable');
            } else {
                addClass(element, 'not-dismissable');
            }

            // Animate: and yes, it needs to be in a setTimeout for the CSS3 animation to work.
            setTimeout(function() {
                addClass(element, 'snarl-in');
                element.removeAttribute('style'); //clear reminants of the remove animation
            }, 0);
            
            // no hover if touch device
            if (isTouchDevice()) {
                addClass(element, 'no-hover');
            }

            Snarl.notifications[id].options = options;
        },

        reOpenNotification: function(id) {
            Snarl.editNotification(id);
        },

        removeNotification: function(id) {
            if (!Snarl.isDismissed(id)) {
                var notification = Snarl.notifications[id].element;

                // animation [& collapse margin]
                removeClass(notification, 'snarl-in');
                if (document.body.clientWidth > 480) {
                    notification.style.marginBottom = (-notification.offsetHeight) + 'px';
                } else {
                    notification.style.marginTop = (-notification.offsetHeight) + 'px';
                }

                Snarl.notifications[id].removeTimer = setTimeout(function() {
                    notification.parentElement.removeChild(notification);
                }, 500);

                clearTimeout(Snarl.notifications[id].timer);
                return true;
            } else {
                return false;  //failed to remove
            }
        },

        isDismissed: function(id) {
            if (Snarl.exists(id)) {
                return Snarl.notifications[id].element.parentElement === null;
            } else {
                return true;
            }
        },

        exists: function(id) {
            return Snarl.notifications[id] !== undefined;
        },

        setTitle: function(id, title) {
            Snarl.editNotification(id, {title: title});
        },

        setText: function(id, text) {
            Snarl.editNotification(id, {text: text});
        },
        
        setIcon: function(id, icon) {
            Snarl.editNotification(id, {icon: icon});
        },

        setTimeout: function(id, timeout) {
            Snarl.editNotification(id, {timeout: timeout});
        }
    };


    /**
     * Generate random ID string and check it's not already
     * been used
     */
    function makeID() {
        var id = '';
        var possible = 'abcdefghijklmnopqrstuvwxyz0123456789';

        do {
            id = '';
            for(var i=0; i<5; i++) {
                id += possible.charAt(
                    Math.floor(Math.random() * possible.length)
                );
            }
        } while (Snarl.exists(id));

        return id;
    }


    /**
     * Handle all click events in notifications
     */
    function clickNotification(event) {
        var notification = event.target ? event.target : event.toElement;
        
        if (notification.getAttribute('id') === 'snarl-wrapper') {
            return;
        }

        var close = false;
        while (!hasClass(notification, 'snarl-notification')) {
            if (hasClass(notification, 'snarl-close')) {
                close = true;
            }
            notification = notification.parentElement;
        }

        var id = notification.getAttribute('id');
        id = /snarl-notification-([a-zA-Z0-9]+)/.exec(id)[1];

        if (close && Snarl.notifications[id].options.dismissable) {
            Snarl.removeNotification(id);
        } else {
            var action = Snarl.notifications[id].action;
            if (action === undefined || action === null) {
                return;
            } else if (typeof action === "string") {
                //TODO: allow relative urls too?
                window.location = action;
            } else if (typeof action === "function") {
                action(id);
            } else {
                console.log('Snarl Error: Invalid click action:');
                console.log(action);
            }
        }
    }


    /**
     * Injects base notification html to document if it's
     * not been added yet.
     */
    var notificationHtmlTemplate = null;
    function addNotificationHTML(id) {
        if (Snarl.notifications[id] === undefined) {
            Snarl.notifications[id] = {};
        }
        
        // Generate new HTML into cache
        if (Snarl.notifications[id].element === null || Snarl.notifications[id].element === undefined) {
            var notificationWrapper = notificationHtmlTemplate.cloneNode(true);
            
            addClass(notificationWrapper,'snarl-notification');
            notificationWrapper.setAttribute('id', 'snarl-notification-' + id);
            Snarl.notifications[id].element = notificationWrapper;
        }
        
        // Insert HTML
        if (Snarl.notifications[id].element.parentElement === null) {
            var wrapper = document.getElementById('snarl-wrapper');
            if (document.body.clientWidth > 480) {
                wrapper.appendChild(Snarl.notifications[id].element);
            } else {
                wrapper.insertBefore(Snarl.notifications[id].element, wrapper.firstChild);
            }
        }
    }


    /**
     * Overwrites default's values with options's and adds
     * options's if non-existent in default
     */
    function mergeOptions(defaults, options) {
        var merged = {}, attrname;
        for (attrname in defaults) {merged[attrname] = defaults[attrname];}
        for (attrname in options) {merged[attrname] = options[attrname];}
        return merged;
    }


    /**
     * Class manipulation functions
     */
    function addClass(element, className) {
        if (!hasClass(element, className)) {
            element.className += ' ' + className;
        }
    }

    function hasClass(element, className) {
        var classPattern = new RegExp('(?:^|\\s)' + className + '(?!\\S)', 'g');
        return (element.className.match(classPattern) !== null);
    }

    function removeClass(element, className) {
        var classPattern = new RegExp('(?:^|\\s)' + className + '(?!\\S)', 'g');
        element.className = element.className.replace(classPattern, '');
    }
    
    /**
     * Check whether the dismiss button needs to be permanently visible
     * http://stackoverflow.com/questions/4817029/whats-the-best-way-to-detect-a-touch-screen-device-using-javascript
     */
    function isTouchDevice() {
        return ('ontouchstart' in window || 'onmsgesturechange' in window);
    }


    /*
     * Initialisation
     */
    function snarlInitialize() {
        var snarlWrapper = document.createElement('div');
        snarlWrapper.setAttribute('id', 'snarl-wrapper');
        snarlWrapper.addEventListener('click', clickNotification);
        document.body.appendChild(snarlWrapper);
        
        Snarl.setNotificationHTML('<div class="snarl-notification waves-effect"><div class="snarl-icon"></div><h3 class="snarl-title"></h3><p class="snarl-text"></p><div class="snarl-close waves-effect"><svg class="snarl-close-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve" height="100px" width="100px"><g><path d="M49.5,5c-24.9,0-45,20.1-45,45s20.1,45,45,45s45-20.1,45-45S74.4,5,49.5,5z M71.3,65.2c0.3,0.3,0.5,0.7,0.5,1.1   s-0.2,0.8-0.5,1.1L67,71.8c-0.3,0.3-0.7,0.5-1.1,0.5s-0.8-0.2-1.1-0.5L49.5,56.6L34.4,71.8c-0.3,0.3-0.7,0.5-1.1,0.5   c-0.4,0-0.8-0.2-1.1-0.5l-4.3-4.4c-0.3-0.3-0.5-0.7-0.5-1.1c0-0.4,0.2-0.8,0.5-1.1L43,49.9L27.8,34.9c-0.6-0.6-0.6-1.6,0-2.3   l4.3-4.4c0.3-0.3,0.7-0.5,1.1-0.5c0.4,0,0.8,0.2,1.1,0.5l15.2,15l15.2-15c0.3-0.3,0.7-0.5,1.1-0.5s0.8,0.2,1.1,0.5l4.3,4.4   c0.6,0.6,0.6,1.6,0,2.3L56.1,49.9L71.3,65.2z"/></g></svg></div></div>');
    }

    (function () {
        if (document.readyState === 'complete' || document.readyState === 'interactive' && document.body) {
            snarlInitialize();
        } else {
            if (document.addEventListener) {
                document.addEventListener('DOMContentLoaded', function factorial() {
                    document.removeEventListener('DOMContentLoaded', null, false);
                    snarlInitialize();
                }, false);
            } else if (document.attachEvent) {
                document.attachEvent('onreadystatechange', function () {
                    if (document.readyState === 'complete') {
                        document.detachEvent('onreadystatechange', null);
                        snarlInitialize();
                    }
                });
            }
        }
    })();

    window.Snarl = Snarl;
})(window, document);
