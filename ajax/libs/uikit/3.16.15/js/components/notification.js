/*! UIkit 3.16.15 | https://www.getuikit.com | (c) 2014 - 2023 YOOtheme | MIT License */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('uikit-util')) :
    typeof define === 'function' && define.amd ? define('uikitnotification', ['uikit-util'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.UIkitNotification = factory(global.UIkit.util));
})(this, (function (uikitUtil) { 'use strict';

    var Container = {
      props: {
        container: Boolean
      },
      data: {
        container: true
      },
      computed: {
        container({ container }) {
          return container === true && this.$container || container && uikitUtil.$(container);
        }
      }
    };

    var Component = {
      mixins: [Container],
      functional: true,
      args: ["message", "status"],
      data: {
        message: "",
        status: "",
        timeout: 5e3,
        group: null,
        pos: "top-center",
        clsContainer: "uk-notification",
        clsClose: "uk-notification-close",
        clsMsg: "uk-notification-message"
      },
      install,
      computed: {
        marginProp({ pos }) {
          return `margin${uikitUtil.startsWith(pos, "top") ? "Top" : "Bottom"}`;
        },
        startProps() {
          return { opacity: 0, [this.marginProp]: -this.$el.offsetHeight };
        }
      },
      created() {
        const container = uikitUtil.$(`.${this.clsContainer}-${this.pos}`, this.container) || uikitUtil.append(
          this.container,
          `<div class="${this.clsContainer} ${this.clsContainer}-${this.pos}" style="display: block"></div>`
        );
        this.$mount(
          uikitUtil.append(
            container,
            `<div class="${this.clsMsg}${this.status ? ` ${this.clsMsg}-${this.status}` : ""}" role="alert"> <a href class="${this.clsClose}" data-uk-close></a> <div>${this.message}</div> </div>`
          )
        );
      },
      async connected() {
        const margin = uikitUtil.toFloat(uikitUtil.css(this.$el, this.marginProp));
        await uikitUtil.Transition.start(uikitUtil.css(this.$el, this.startProps), {
          opacity: 1,
          [this.marginProp]: margin
        });
        if (this.timeout) {
          this.timer = setTimeout(this.close, this.timeout);
        }
      },
      events: {
        click(e) {
          if (uikitUtil.closest(e.target, 'a[href="#"],a[href=""]')) {
            e.preventDefault();
          }
          this.close();
        },
        [uikitUtil.pointerEnter]() {
          if (this.timer) {
            clearTimeout(this.timer);
          }
        },
        [uikitUtil.pointerLeave]() {
          if (this.timeout) {
            this.timer = setTimeout(this.close, this.timeout);
          }
        }
      },
      methods: {
        async close(immediate) {
          const removeFn = (el) => {
            const container = uikitUtil.parent(el);
            uikitUtil.trigger(el, "close", [this]);
            uikitUtil.remove(el);
            if (!(container == null ? void 0 : container.hasChildNodes())) {
              uikitUtil.remove(container);
            }
          };
          if (this.timer) {
            clearTimeout(this.timer);
          }
          if (!immediate) {
            await uikitUtil.Transition.start(this.$el, this.startProps);
          }
          removeFn(this.$el);
        }
      }
    };
    function install(UIkit) {
      UIkit.notification.closeAll = function(group, immediate) {
        uikitUtil.apply(document.body, (el) => {
          const notification = UIkit.getComponent(el, "notification");
          if (notification && (!group || group === notification.group)) {
            notification.close(immediate);
          }
        });
      };
    }

    if (typeof window !== "undefined" && window.UIkit) {
      window.UIkit.component("notification", Component);
    }

    return Component;

}));
