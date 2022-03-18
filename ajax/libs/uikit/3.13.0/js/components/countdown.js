/*! UIkit 3.13.0 | https://www.getuikit.com | (c) 2014 - 2022 YOOtheme | MIT License */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('uikit-util')) :
    typeof define === 'function' && define.amd ? define('uikitcountdown', ['uikit-util'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.UIkitCountdown = factory(global.UIkit.util));
})(this, (function (uikitUtil) { 'use strict';

    var Class = {
      connected() {
        !uikitUtil.hasClass(this.$el, this.$name) && uikitUtil.addClass(this.$el, this.$name);
      } };

    const units = ['days', 'hours', 'minutes', 'seconds'];

    var Component = {
      mixins: [Class],

      props: {
        date: String,
        clsWrapper: String },


      data: {
        date: '',
        clsWrapper: '.uk-countdown-%unit%' },


      connected() {
        this.date = Date.parse(this.$props.date);
        this.start();
      },

      disconnected() {
        this.stop();
      },

      events: [
      {
        name: 'visibilitychange',

        el() {
          return document;
        },

        handler() {
          if (document.hidden) {
            this.stop();
          } else {
            this.start();
          }
        } }],



      methods: {
        start() {
          this.stop();
          this.update();
          this.timer = setInterval(this.update, 1000);
        },

        stop() {
          clearInterval(this.timer);
        },

        update() {
          const timespan = getTimeSpan(this.date);

          if (!this.date || timespan.total <= 0) {
            this.stop();

            timespan.days = timespan.hours = timespan.minutes = timespan.seconds = 0;
          }

          for (const unit of units) {
            const el = uikitUtil.$(this.clsWrapper.replace('%unit%', unit), this.$el);

            if (!el) {
              continue;
            }

            let digits = String(Math.trunc(timespan[unit]));

            digits = digits.length < 2 ? "0" + digits : digits;

            if (el.textContent !== digits) {
              digits = digits.split('');

              if (digits.length !== el.children.length) {
                uikitUtil.html(el, digits.map(() => '<span></span>').join(''));
              }

              digits.forEach((digit, i) => el.children[i].textContent = digit);
            }
          }
        } } };



    function getTimeSpan(date) {
      const total = date - Date.now();

      return {
        total,
        seconds: total / 1000 % 60,
        minutes: total / 1000 / 60 % 60,
        hours: total / 1000 / 60 / 60 % 24,
        days: total / 1000 / 60 / 60 / 24 };

    }

    if (typeof window !== 'undefined' && window.UIkit) {
      window.UIkit.component('countdown', Component);
    }

    return Component;

}));
