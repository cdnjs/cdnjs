// Desktop
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as a module.
        define('pnotify.desktop', ['jquery', 'pnotify'], factory);
    } else if (typeof exports === 'object' && typeof module !== 'undefined') {
        // CommonJS
        module.exports = factory(require('jquery'), require('./pnotify'));
    } else {
        // Browser globals
        factory(root.jQuery, root.PNotify);
    }
}(this, function($, PNotify){
    var permission;
    var notify = function(title, options){
        // Memoize based on feature detection.
        if ("Notification" in window) {
            notify = function (title, options) {
                return new Notification(title, options);
            };
        } else if ("mozNotification" in navigator) {
            notify = function (title, options) {
                // Gecko < 22
                return navigator.mozNotification
                    .createNotification(title, options.body, options.icon)
                    .show();
            };
        } else if ("webkitNotifications" in window) {
            notify = function (title, options) {
                return window.webkitNotifications.createNotification(
                    options.icon,
                    title,
                    options.body
                );
            };
        } else {
            notify = function (title, options) {
                return null;
            };
        }
        return notify(title, options);
    };


    PNotify.prototype.options.desktop = {
        // Display the notification as a desktop notification.
        desktop: false,
        // If desktop notifications are not supported or allowed, fall back to a regular notice.
        fallback: true,
        // The URL of the icon to display. If false, no icon will show. If null, a default icon will show.
        icon: null,
        // Using a tag lets you update an existing notice, or keep from duplicating notices between tabs.
        // If you leave tag null, one will be generated, facilitating the "update" function.
        // see: http://www.w3.org/TR/notifications/#tags-example
        tag: null
    };
    PNotify.prototype.modules.desktop = {
        tag: null,
        icon: null,
        genNotice: function(notice, options){
            if (options.icon === null) {
                this.icon = "http://sciactive.com/pnotify/includes/desktop/"+notice.options.type+".png";
            } else if (options.icon === false) {
                this.icon = null;
            } else {
                this.icon = options.icon;
            }
            if (this.tag === null || options.tag !== null) {
                this.tag = options.tag === null ? "PNotify-"+Math.round(Math.random() * 1000000) : options.tag;
            }
            notice.desktop = notify(notice.options.title, {
                icon: this.icon,
                body: options.text || notice.options.text,
                tag: this.tag
            });
            if (!("close" in notice.desktop) && ("cancel" in notice.desktop)) {
                notice.desktop.close = function(){
                    notice.desktop.cancel();
                };
            }
            notice.desktop.onclick = function(){
                notice.elem.trigger("click");
            };
            notice.desktop.onclose = function(){
                if (notice.state !== "closing" && notice.state !== "closed") {
                    notice.remove();
                }
            };
        },
        init: function(notice, options){
            if (!options.desktop)
                return;
            permission = PNotify.desktop.checkPermission();
            if (permission !== 0) {
                // Keep the notice from opening if fallback is false.
                if (!options.fallback) {
                    notice.options.auto_display = false;
                }
                return;
            }
            this.genNotice(notice, options);
        },
        update: function(notice, options, oldOpts){
            if ((permission !== 0 && options.fallback) || !options.desktop)
                return;
            this.genNotice(notice, options);
        },
        beforeOpen: function(notice, options){
            if ((permission !== 0 && options.fallback) || !options.desktop)
                return;
            notice.elem.css({'left': '-10000px'}).removeClass('ui-pnotify-in');
        },
        afterOpen: function(notice, options){
            if ((permission !== 0 && options.fallback) || !options.desktop)
                return;
            notice.elem.css({'left': '-10000px'}).removeClass('ui-pnotify-in');
            if ("show" in notice.desktop) {
                notice.desktop.show();
            }
        },
        beforeClose: function(notice, options){
            if ((permission !== 0 && options.fallback) || !options.desktop)
                return;
            notice.elem.css({'left': '-10000px'}).removeClass('ui-pnotify-in');
        },
        afterClose: function(notice, options){
            if ((permission !== 0 && options.fallback) || !options.desktop)
                return;
            notice.elem.css({'left': '-10000px'}).removeClass('ui-pnotify-in');
            if ("close" in notice.desktop) {
                notice.desktop.close();
            }
        }
    };
    PNotify.desktop = {
        permission: function(){
            if (typeof Notification !== "undefined" && "requestPermission" in Notification) {
                Notification.requestPermission();
            } else if ("webkitNotifications" in window) {
                window.webkitNotifications.requestPermission();
            }
        },
        checkPermission: function(){
            if (typeof Notification !== "undefined" && "permission" in Notification) {
                return (Notification.permission === "granted" ? 0 : 1);
            } else if ("webkitNotifications" in window) {
                return window.webkitNotifications.checkPermission() == 0 ? 0 : 1;
            } else {
                return 1;
            }
        }
    };
    permission = PNotify.desktop.checkPermission();
}));
