/*! UIkit 3.16.15 | https://www.getuikit.com | (c) 2014 - 2023 YOOtheme | MIT License */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('uikit-util')) :
    typeof define === 'function' && define.amd ? define('uikitcountdown', ['uikit-util'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.UIkitCountdown = factory(global.UIkit.util));
})(this, (function (uikitUtil) { 'use strict';

    var Class = {
      connected() {
        uikitUtil.addClass(this.$el, this.$options.id);
      }
    };

    const units = ["days", "hours", "minutes", "seconds"];
    var Component = {
      mixins: [Class],
      props: {
        date: String,
        clsWrapper: String,
        role: String
      },
      data: {
        date: "",
        clsWrapper: ".uk-countdown-%unit%",
        role: "timer"
      },
      connected() {
        uikitUtil.attr(this.$el, "role", this.role);
        this.date = uikitUtil.toFloat(Date.parse(this.$props.date));
        this.end = false;
        this.start();
      },
      disconnected() {
        this.stop();
      },
      events: {
        name: "visibilitychange",
        el() {
          return document;
        },
        handler() {
          if (document.hidden) {
            this.stop();
          } else {
            this.start();
          }
        }
      },
      methods: {
        start() {
          this.stop();
          this.update();
          if (!this.timer) {
            uikitUtil.trigger(this.$el, "countdownstart");
            this.timer = setInterval(this.update, 1e3);
          }
        },
        stop() {
          if (this.timer) {
            clearInterval(this.timer);
            uikitUtil.trigger(this.$el, "countdownstop");
            this.timer = null;
          }
        },
        update() {
          const timespan = getTimeSpan(this.date);
          if (!timespan.total) {
            this.stop();
            if (!this.end) {
              uikitUtil.trigger(this.$el, "countdownend");
              this.end = true;
            }
          }
          for (const unit of units) {
            const el = uikitUtil.$(this.clsWrapper.replace("%unit%", unit), this.$el);
            if (!el) {
              continue;
            }
            let digits = String(Math.trunc(timespan[unit]));
            digits = digits.length < 2 ? `0${digits}` : digits;
            if (el.textContent !== digits) {
              digits = digits.split("");
              if (digits.length !== el.children.length) {
                uikitUtil.html(el, digits.map(() => "<span></span>").join(""));
              }
              digits.forEach((digit, i) => el.children[i].textContent = digit);
            }
          }
        }
      }
    };
    function getTimeSpan(date) {
      const total = Math.max(0, date - Date.now()) / 1e3;
      return {
        total,
        seconds: total % 60,
        minutes: total / 60 % 60,
        hours: total / 60 / 60 % 24,
        days: total / 60 / 60 / 24
      };
    }

    if (typeof window !== "undefined" && window.UIkit) {
      window.UIkit.component("countdown", Component);
    }

    return Component;

}));
