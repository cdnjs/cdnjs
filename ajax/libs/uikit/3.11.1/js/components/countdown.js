/*! UIkit 3.11.1 | https://www.getuikit.com | (c) 2014 - 2022 YOOtheme | MIT License */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('uikit-util')) :
    typeof define === 'function' && define.amd ? define('uikitcountdown', ['uikit-util'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.UIkitCountdown = factory(global.UIkit.util));
})(this, (function (uikitUtil) { 'use strict';

    var Class = {

        connected: function() {
            !uikitUtil.hasClass(this.$el, this.$name) && uikitUtil.addClass(this.$el, this.$name);
        }

    };

    var Component = {

        mixins: [Class],

        props: {
            date: String,
            clsWrapper: String
        },

        data: {
            date: '',
            clsWrapper: '.uk-countdown-%unit%'
        },

        computed: {

            date: function(ref) {
                var date = ref.date;

                return Date.parse(date);
            },

            days: function(ref, $el) {
                var clsWrapper = ref.clsWrapper;

                return uikitUtil.$(clsWrapper.replace('%unit%', 'days'), $el);
            },

            hours: function(ref, $el) {
                var clsWrapper = ref.clsWrapper;

                return uikitUtil.$(clsWrapper.replace('%unit%', 'hours'), $el);
            },

            minutes: function(ref, $el) {
                var clsWrapper = ref.clsWrapper;

                return uikitUtil.$(clsWrapper.replace('%unit%', 'minutes'), $el);
            },

            seconds: function(ref, $el) {
                var clsWrapper = ref.clsWrapper;

                return uikitUtil.$(clsWrapper.replace('%unit%', 'seconds'), $el);
            },

            units: function() {
                var this$1$1 = this;

                return ['days', 'hours', 'minutes', 'seconds'].filter(function (unit) { return this$1$1[unit]; });
            }

        },

        connected: function() {
            this.start();
        },

        disconnected: function() {
            var this$1$1 = this;

            this.stop();
            this.units.forEach(function (unit) { return uikitUtil.empty(this$1$1[unit]); });
        },

        events: [

            {

                name: 'visibilitychange',

                el: function() {
                    return document;
                },

                handler: function() {
                    if (document.hidden) {
                        this.stop();
                    } else {
                        this.start();
                    }
                }

            }

        ],

        update: {

            write: function() {
                var this$1$1 = this;


                var timespan = getTimeSpan(this.date);

                if (timespan.total <= 0) {

                    this.stop();

                    timespan.days
                        = timespan.hours
                        = timespan.minutes
                        = timespan.seconds
                        = 0;
                }

                this.units.forEach(function (unit) {

                    var digits = String(Math.floor(timespan[unit]));

                    digits = digits.length < 2 ? ("0" + digits) : digits;

                    var el = this$1$1[unit];
                    if (el.textContent !== digits) {
                        digits = digits.split('');

                        if (digits.length !== el.children.length) {
                            uikitUtil.html(el, digits.map(function () { return '<span></span>'; }).join(''));
                        }

                        digits.forEach(function (digit, i) { return el.children[i].textContent = digit; });
                    }

                });

            }

        },

        methods: {

            start: function() {

                this.stop();

                if (this.date && this.units.length) {
                    this.$update();
                    this.timer = setInterval(this.$update, 1000);
                }

            },

            stop: function() {

                if (this.timer) {
                    clearInterval(this.timer);
                    this.timer = null;
                }

            }

        }

    };

    function getTimeSpan(date) {

        var total = date - Date.now();

        return {
            total: total,
            seconds: total / 1000 % 60,
            minutes: total / 1000 / 60 % 60,
            hours: total / 1000 / 60 / 60 % 24,
            days: total / 1000 / 60 / 60 / 24
        };
    }

    if (typeof window !== 'undefined' && window.UIkit) {
        window.UIkit.component('countdown', Component);
    }

    return Component;

}));
