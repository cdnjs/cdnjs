/*! UIkit 3.0.0-beta.42 | http://www.getuikit.com | (c) 2014 - 2017 YOOtheme | MIT License */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define('uikitnotification', factory) :
	(global.UIkitNotification = factory());
}(this, (function () { 'use strict';

function plugin(UIkit) {
    var obj;


    if (plugin.installed) {
        return;
    }

    var ref = UIkit.util;
    var append = ref.append;
    var apply = ref.apply;
    var closest = ref.closest;
    var css = ref.css;
    var pointerEnter = ref.pointerEnter;
    var pointerLeave = ref.pointerLeave;
    var remove = ref.remove;
    var toFloat = ref.toFloat;
    var Transition = ref.Transition;
    var trigger = ref.trigger;
    var containers = {};

    UIkit.component('notification', {

        functional: true,

        args: ['message', 'status'],

        defaults: {
            message: '',
            status: '',
            timeout: 5000,
            group: null,
            pos: 'top-center',
            clsClose: 'uk-notification-close',
            clsMsg: 'uk-notification-message'
        },

        created: function created() {

            if (!containers[this.pos]) {
                containers[this.pos] = append(UIkit.container, ("<div class=\"uk-notification uk-notification-" + (this.pos) + "\"></div>"));
            }

            var container = css(containers[this.pos], 'display', 'block');

            this.$mount(append(container,
                ("<div class=\"" + (this.clsMsg) + (this.status ? (" " + (this.clsMsg) + "-" + (this.status)) : '') + "\"> <a href=\"#\" class=\"" + (this.clsClose) + "\" data-uk-close></a> <div>" + (this.message) + "</div> </div>")
            ));

        },

        ready: function ready() {
            var this$1 = this;


            var marginBottom = toFloat(css(this.$el, 'marginBottom'));
            Transition.start(
                css(this.$el, {opacity: 0, marginTop: -this.$el.offsetHeight, marginBottom: 0}),
                {opacity: 1, marginTop: 0, marginBottom: marginBottom}
            ).then(function () {
                if (this$1.timeout) {
                    this$1.timer = setTimeout(this$1.close, this$1.timeout);
                }
            });

        },

        events: ( obj = {

            click: function click(e) {
                if (closest(e.target, 'a[href="#"]')) {
                    e.preventDefault();
                }
                this.close();
            }

        }, obj[pointerEnter] = function () {
                if (this.timer) {
                    clearTimeout(this.timer);
                }
            }, obj[pointerLeave] = function () {
                if (this.timeout) {
                    this.timer = setTimeout(this.close, this.timeout);
                }
            }, obj),

        methods: {

            close: function close(immediate) {
                var this$1 = this;


                var removeFn = function () {

                    trigger(this$1.$el, 'close', [this$1]);
                    remove(this$1.$el);

                    if (!containers[this$1.pos].children.length) {
                        css(containers[this$1.pos], 'display', 'none');
                    }

                };

                if (this.timer) {
                    clearTimeout(this.timer);
                }

                if (immediate) {
                    removeFn();
                } else {
                    Transition.start(this.$el, {
                        opacity: 0,
                        marginTop: -this.$el.offsetHeight,
                        marginBottom: 0
                    }).then(removeFn);
                }
            }

        }

    });

    UIkit.notification.closeAll = function (group, immediate) {
        apply(document.body, function (el) {
            var notification = UIkit.getComponent(el, 'notification');
            if (notification && (!group || group === notification.group)) {
                notification.close(immediate);
            }
        });
    };

}

if (!false && typeof window !== 'undefined' && window.UIkit) {
    window.UIkit.use(plugin);
}

return plugin;

})));
