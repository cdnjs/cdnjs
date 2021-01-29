/*! formstone v1.4.20-1 [tabs.js] 2021-01-29 | GPL-3.0 License | formstone.it */
/* global define */

(function(factory) {
    if (typeof define === "function" && define.amd) {
      define([
        "jquery",
        "./core",
        "./mediaquery",
        "./swap"
      ], factory);
    } else {
      factory(jQuery, Formstone);
    }
  }(function($, Formstone) {

    "use strict";

    /**
     * @method private
     * @name construct
     * @description Builds instance.
     * @param data [object] "Instance data"
     */

    function construct(data) {
      data.mq = "(max-width:" + (data.mobileMaxWidth === Infinity ? "100000px" : data.mobileMaxWidth) + ")";

      data.content = this.attr("href");
      data.group = this.data(Namespace + "-group");

      data.elementClasses = [RawClasses.tab, data.rawGuid, data.theme, data.customClass];
      data.mobileTabClasses = [RawClasses.tab, RawClasses.tab_mobile, data.rawGuid, data.theme, data.customClass];
      data.contentClasses = [RawClasses.content, data.rawGuid, data.theme, data.customClass];

      // DOM

      data.$mobileTab = $('<button type="button" class="' + data.mobileTabClasses.join(" ") + '" aria-hidden="true">' + this.html() + '</button>');
      data.$content = $(data.content).addClass(data.contentClasses.join(" "));

      data.$content.before(data.$mobileTab)
        .attr("role", "tabpanel");

      this.attr("role", "tab");

      // Aria

      data.id = this.attr("id");

      if (data.id) {
        data.ariaId = data.id;
      } else {
        data.ariaId = data.rawGuid;
        this.attr("id", data.ariaId);
      }

      data.contentId = data.$content.attr("id");
      data.contentGuid = data.rawGuid + "_content";

      if (data.contentId) {
        data.ariacontentId = data.contentId;
      } else {
        data.ariaContentId = data.contentGuid;
        data.$content.attr("id", data.ariaContentId);
      }

      // Check for hash

      var hash = Formstone.window.location.hash,
        hashActive = false,
        hashGroup = false;

      if (hash.length) {
        hashActive = (this.filter("[href*='" + hash + "']").length > 0);
        hashGroup = data.group && ($('[data-' + Namespace + '-group="' + data.group + '"]').filter("[href*='" + hash + "']").length > 0);
      }

      if (hashActive) {
        // If this matches hash
        this.attr("data-swap-active", "true");
      } else if (hashGroup) {
        // If item in group matches hash
        this.removeAttr("data-swap-active")
          .removeData("data-swap-active");
      } else if (this.attr("data-tabs-active") === "true") {
        // If this has active attribute
        this.attr("data-swap-active", "true");
      }

      this.attr("data-swap-target", data.content)
        .attr("data-swap-group", data.group)
        .addClass(data.elementClasses.join(" "))
        .on("activate.swap" + data.dotGuid, data, onActivate)
        .on("deactivate.swap" + data.dotGuid, data, onDeactivate)
        .on("enable.swap" + data.dotGuid, data, onEnable)
        .on("disable.swap" + data.dotGuid, data, onDisable);
    }

    /**
     * @method private
     * @name postConstruct
     * @description Run post build.
     * @param data [object] "Instance data"
     */

    function postConstruct(data) {
      this.fsSwap({
        maxWidth: data.maxWidth,
        classes: {
          target: data.dotGuid,
          enabled: Classes.enabled,
          active: Classes.active,
          raw: {
            target: data.rawGuid,
            enabled: RawClasses.enabled,
            active: RawClasses.active
          }
        },
        collapse: false
      });

      data.$mobileTab.on("click" + data.dotGuid, data, onMobileActivate);

      // Media Query support
      $.fsMediaquery("bind", data.rawGuid, data.mq, {
        enter: function() {
          mobileEnable.call(data.$el, data);
        },
        leave: function() {
          mobileDisable.call(data.$el, data);
        }
      });
    }

    /**
     * @method private
     * @name destruct
     * @description Tears down instance.
     * @param data [object] "Instance data"
     */

    function destruct(data) {
      $.fsMediaquery("unbind", data.rawGuid);

      data.$mobileTab.off(Events.namespace)
        .remove();

      data.elementClasses.push(RawClasses.mobile);
      data.contentClasses.push(RawClasses.mobile);

      data.$content.removeAttr("aria-labelledby")
        .removeAttr("aria-hidden")
        .removeAttr("role")
        .removeClass(data.contentClasses.join(" "));

      if (data.$content.attr("id") === data.contentGuid) {
        data.$content.removeAttr("id");
      }

      this.removeAttr("aria-controls")
        .removeAttr("aria-selected")
        .removeAttr("data-swap-active")
        .removeData("data-swap-active")
        .removeAttr("data-swap-target")
        .removeData("data-swap-target")
        .removeAttr("data-swap-group")
        .removeData("data-swap-group")
        .removeAttr("role")
        .removeClass(data.elementClasses.join(" "))
        .off(Events.namespace)
        .fsSwap("destroy");

      if (this.attr("id") === data.rawGuid) {
        this.removeAttr("id");
      }
    }

    /**
     * @method
     * @name activate
     * @description Activates instance.
     * @example $(".target").tabs("activate");
     */

    function activate(data) {
      this.fsSwap("activate");
    }

    /**
     * @method
     * @name enable
     * @description Enables instance.
     * @example $(".target").tabs("enable");
     */

    function enable(data) {
      this.fsSwap("enable");
    }

    /**
     * @method
     * @name disable
     * @description Disables instance.
     * @example $(".target").tabs("disable");
     */

    function disable(data) {
      this.fsSwap("disable");
    }

    /**
     * @method private
     * @name onActivate
     * @description Handles tab open event.
     * @param e [object] "Event data"
     */

    function onActivate(e) {
      if (!e.originalEvent) { // thanks IE :/
        var data = e.data,
          index = 0;

        data.$el.attr("aria-selected", true)
          .trigger(Events.update, [index]);
        data.$mobileTab.addClass(RawClasses.active);
        data.$content.attr("aria-hidden", false)
          .addClass(RawClasses.active);
      }
    }

    /**
     * @method private
     * @name onDeactivate
     * @description Handles tab close event.
     * @param e [object] "Event data"
     */

    function onDeactivate(e) {
      if (!e.originalEvent) { // thanks IE :/
        var data = e.data;

        data.$el.attr("aria-selected", false);
        data.$mobileTab.removeClass(RawClasses.active);
        data.$content.attr("aria-hidden", true)
          .removeClass(RawClasses.active);
      }
    }

    /**
     * @method private
     * @name onEnable
     * @description Handles tab enable event.
     * @param e [object] "Event data"
     */

    function onEnable(e) {
      var data = e.data;

      data.$el.attr("aria-controls", data.ariaContentId);
      data.$mobileTab.addClass(RawClasses.enabled);
      data.$content.attr("aria-labelledby", data.ariaId)
        .addClass(RawClasses.enabled);
    }

    /**
     * @method private
     * @name onDisable
     * @description Handles tab disable event.
     * @param e [object] "Event data"
     */

    function onDisable(e) {
      var data = e.data;

      data.$el.removeAttr("aria-controls")
        .removeAttr("aria-selected");
      data.$mobileTab.removeClass(RawClasses.enabled);
      data.$content.removeAttr("aria-labelledby")
        .removeAttr("aria-hidden")
        .removeClass(RawClasses.enabled);
    }

    /**
     * @method private
     * @name onMobileActivate
     * @description Activates instance.
     * @param e [object] "Event data"
     */

    function onMobileActivate(e) {
      e.data.$el.fsSwap("activate");
    }

    /**
     * @method private
     * @name mobileEnable
     * @description Handles mobile enable event.
     * @param data [object] "Instance data"
     */

    function mobileEnable(data) {
      data.$el.addClass(RawClasses.mobile);
      data.$mobileTab.addClass(RawClasses.mobile);
      data.$content.addClass(RawClasses.mobile);
    }

    /**
     * @method private
     * @name mobileDisable
     * @description Handles mobile disable event.
     * @param data [object] "Instance data"
     */

    function mobileDisable(data) {
      data.$el.removeClass(RawClasses.mobile);
      data.$mobileTab.removeClass(RawClasses.mobile);
      data.$content.removeClass(RawClasses.mobile);
    }

    /**
     * @plugin
     * @name Tabs
     * @description A jQuery plugin for simple tabs.
     * @type widget
     * @main tabs.js
     * @main tabs.css
     * @dependency jQuery
     * @dependency core.js
     * @dependency mediaquery.js
     * @dependency swap.js
     */

    var Plugin = Formstone.Plugin("tabs", {
        widget: true,

        /**
         * @options
         * @param customClass [string] <''> "Class applied to instance"
         * @param maxWidth [string] <Infinity> "Width at which to auto-disable plugin"
         * @param mobileMaxWidth [string] <'740px'> "Width at which to auto-disable mobile styles"
         * @param theme [string] <"fs-light"> "Theme class name"
         */

        defaults: {
          customClass: "",
          maxWidth: Infinity,
          mobileMaxWidth: "740px",
          theme: "fs-light"
        },

        classes: [
          "tab",
          "tab_mobile",
          "mobile",
          "content",
          "enabled",
          "active"
        ],

        /**
         * @events
         * @event update.tabs "Tab activated"
         */

        events: {
          update: "update"
        },

        methods: {
          _construct: construct,
          _postConstruct: postConstruct,
          _destruct: destruct,

          // Public Methods

          activate: activate,
          enable: enable,
          disable: disable
        }
      }),

      // Localize References

      Namespace = Plugin.namespace,
      Classes = Plugin.classes,
      RawClasses = Classes.raw,
      Events = Plugin.events,
      Functions = Plugin.functions;

  })

);
