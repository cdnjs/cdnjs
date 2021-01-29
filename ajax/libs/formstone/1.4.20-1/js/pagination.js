/*! formstone v1.4.20-1 [pagination.js] 2021-01-29 | GPL-3.0 License | formstone.it */
/* global define */

(function(factory) {
    if (typeof define === "function" && define.amd) {
      define([
        "jquery",
        "./core",
        "./mediaquery"
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
      data.mq = "(max-width:" + (data.maxWidth === Infinity ? "100000px" : data.maxWidth) + ")";

      var html = "";
      html += '<button type="button" class="' + [RawClasses.control, RawClasses.control_previous].join(" ") + '">' + data.labels.previous + '</button>';
      html += '<button type="button" class="' + [RawClasses.control, RawClasses.control_next].join(" ") + '">' + data.labels.next + '</button>';
      html += '<div class="' + RawClasses.position + '" aria-hidden="true">';
      html += '<span class="' + RawClasses.current + '">0</span>';
      html += ' ' + data.labels.count + ' ';
      html += '<span class="' + RawClasses.total + '">0</span>';
      html += '<select class="' + RawClasses.select + '" title="' + data.labels.select + '" tabindex="-1" aria-hidden="true"></select>';
      html += '</div>';

      data.thisClasses = [RawClasses.base, data.theme, data.customClass];

      data.labels.pagination = data.labels.pagination.replace('{guid}', data.numGuid);

      this.addClass(data.thisClasses.join(" "))
        .wrapInner('<div class="' + RawClasses.pages + '" aria-label="' + data.labels.pagination + '"></div>')
        .prepend(html);

      data.$controls = this.find(Classes.control);
      data.$pages = this.find(Classes.pages);
      data.$items = data.$pages.children().addClass(RawClasses.page);
      data.$position = this.find(Classes.position);
      data.$select = this.find(Classes.select);
      data.index = -1;

      data.total = data.$items.length - 1;

      var index = data.$items.index(data.$items.filter("[data-" + Plugin.namespace + "-active]"));
      if (index < 0) {
        index = data.$items.index(data.$items.filter(Classes.active)); // reverse compat.
      }

      data.$items.eq(0)
        .addClass(RawClasses.first)
        .after('<span class="' + RawClasses.ellipsis + '">&hellip;</span>')
        .end()
        .eq(data.total)
        .addClass(RawClasses.last)
        .before('<span class="' + RawClasses.ellipsis + '">&hellip;</span>');

      data.$ellipsis = data.$pages.find(Classes.ellipsis);

      buildMobilePages(data);

      this.on(Events.click, Classes.page, data, onPageClick)
        .on(Events.click, Classes.control, data, onControlClick)
        // .on(Events.click, Classes.position, data, onPositionClick)
        .on(Events.change, Classes.select, data, onPageSelect);

      $.fsMediaquery("bind", data.rawGuid, data.mq, {
        enter: function() {
          data.$el.addClass(RawClasses.mobile);
        },
        leave: function() {
          data.$el.removeClass(RawClasses.mobile);
        }
      });

      updatePage(data, index);
    }

    /**
     * @method private
     * @name destruct
     * @description Tears down instance.
     * @param data [object] "Instance data"
     */

    function destruct(data) {
      $.fsMediaquery("unbind", data.rawGuid);

      data.$controls.remove();
      data.$ellipsis.remove();
      data.$select.remove();
      data.$position.remove();
      data.$items.removeClass([RawClasses.page, RawClasses.active, RawClasses.visible, RawClasses.first, RawClasses.last].join(" "))
        .unwrap();

      this.removeClass(data.thisClasses.join(" "))
        .off(Events.namespace);
    }

    /**
     * @method
     * @name jump
     * @description Jump instance of plugin to specific page
     * @example $(".target").pagination("jump", 1);
     */

    function jump(data, index) {
      data.$items.eq(index).trigger(Events.raw.click);
    }

    /**
     * @method private
     * @name onControlClick
     * @description Traverses pages
     * @param e [object] "Event data"
     */

    function onControlClick(e) {
      Functions.killEvent(e);

      var data = e.data,
        index = data.index + ($(e.currentTarget).hasClass(RawClasses.control_previous) ? -1 : 1);

      if (index >= 0) {
        data.$items.eq(index).trigger(Events.raw.click);
      }
    }

    /**
     * @method private
     * @name onPageSelect
     * @description Jumps to a page
     * @param e [object] "Event data"
     */

    function onPageSelect(e) {
      Functions.killEvent(e);

      var data = e.data,
        $target = $(e.currentTarget),
        index = parseInt($target.val(), 10);

      data.$items.eq(index).trigger(Events.raw.click);
    }

    /**
     * @method private
     * @name onPageClick
     * @description Jumps to a page
     * @param e [object] "Event data"
     */

    function onPageClick(e) {
      var data = e.data,
        $target = $(e.currentTarget),
        index = data.$items.index($target);

      if (data.ajax) {
        Functions.killEvent(e);
      } else {
        $target[0].click();
      }

      updatePage(data, index);
    }

    /**
     * @method private
     * @name onPositionClick
     * @description Opens mobile select
     * @param e [object] "Event data"
     */

    function onPositionClick(e) {
      Functions.killEvent(e);

      var data = e.data;

      if (Formstone.isMobile && !Formstone.isFirefoxMobile) {
        // Only open select on non-firefox mobile
        var el = data.$select[0];
        if (window.document.createEvent) { // All
          var evt = window.document.createEvent("MouseEvents");
          evt.initMouseEvent("mousedown", false, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
          el.dispatchEvent(evt);
        } else if (el.fireEvent) { // IE
          el.fireEvent("onmousedown");
        }
      }
    }

    /**
     * @method private
     * @name updatePage
     * @description Updates pagination state
     * @param data [object] "Instance data"
     * @param index [int] "New page index"
     */

    function updatePage(data, index) {
      if (index < 0) {
        index = 0;
      }
      if (index > data.total) {
        index = data.total;
      }

      if (index !== data.index) {
        data.index = index;

        var start = data.index - data.visible,
          end = data.index + (data.visible + 1);

        if (start < 0) {
          start = 0;
        }
        if (end > data.total) {
          end = data.total;
        }

        data.$items.removeClass(RawClasses.visible)
          .removeClass(RawClasses.hidden)
          .filter(Classes.active)
          .removeClass(RawClasses.active)
          .end()
          .eq(data.index)
          .addClass(RawClasses.active)
          .end()
          .slice(start, end)
          .addClass(RawClasses.visible);

        data.$items.not(Classes.visible).addClass(RawClasses.hidden);

        data.$position.find(Classes.current)
          .text(data.index + 1)
          .end()
          .find(Classes.total)
          .text(data.total + 1);

        data.$select.val(data.index);

        // controls
        data.$controls.removeClass(RawClasses.visible);

        if (index > 0) {
          data.$controls.filter(Classes.control_previous).addClass(RawClasses.visible);
        }
        if (index < data.total) {
          data.$controls.filter(Classes.control_next).addClass(RawClasses.visible);
        }

        // elipsis
        data.$ellipsis.removeClass(RawClasses.visible);
        if (index > data.visible + 1) {
          data.$ellipsis.eq(0).addClass(RawClasses.visible);
        }
        if (index < data.total - data.visible - 1) {
          data.$ellipsis.eq(1).addClass(RawClasses.visible);
        }

        // Update
        data.$el.trigger(Events.update, [data.index]);
      }
    }

    /**
     * @method private
     * @name buildMobilePages
     * @description Builds options for mobile select
     * @param data [object] "Instance data"
     */

    function buildMobilePages(data) {
      var html = '';

      for (var i = 0; i <= data.total; i++) {
        html += '<option value="' + i + '"';
        if (i === data.index) {
          html += 'selected="selected"';
        }
        html += '>Page ' + (i + 1) + '</option>';
      }

      data.$select.html(html);
    }

    /**
     * @plugin
     * @name Pagination
     * @description A jQuery plugin for simple pagination.
     * @type widget
     * @main pagination.js
     * @main pagination.css
     * @dependency jQuery
     * @dependency core.js
     * @dependency mediaquery.js
     */

    var Plugin = Formstone.Plugin("pagination", {
        widget: true,

        /**
         * @options
         * @param ajax [boolean] <false> "Flag to disable default click actions"
         * @param customClass [string] <''> "Class applied to instance"
         * @param labels.close [string] <'Close'> "Close button text"
         * @param labels.count [string] <'of'> "Pagination count separator text"
         * @param labels.next [string] <'Next'> "Pagination control text"
         * @param labels.previous [string] <'Previous'> "Pagination control text"
         * @param labels.select [string] <'Select Page'> "Pagination select title"
         * @param labels.pagination [string] <'Pagination {guid}'> "Pagination aria label; {guid} replaced with instance GUID"
         * @param maxWidth [string] <'980px'> "Width at which to auto-disable plugin"
         * @param theme [string] <"fs-light"> "Theme class name"
         * @param visible [int] <2> "Visible pages before and after current page"
         */

        defaults: {
          ajax: false,
          customClass: "",
          labels: {
            count: "of",
            next: "Next",
            previous: "Previous",
            select: "Select Page",
            pagination: "Pagination {guid}"
          },
          maxWidth: "740px",
          theme: "fs-light",
          visible: 2
        },

        classes: [
          "pages",
          "page",

          "active",
          "first",
          "last",
          "ellipsis",
          "visible",
          "hidden",

          "control",
          "control_previous",
          "control_next",

          "position",
          "select",

          "mobile",

          "current",
          "total"
        ],

        /**
         * @events
         * @event update.pagination "Page updated"
         */

        events: {
          update: "update"
        },

        methods: {
          _construct: construct,
          _destruct: destruct
        }
      }),

      // Localize References

      Classes = Plugin.classes,
      RawClasses = Classes.raw,
      Events = Plugin.events,
      Functions = Plugin.functions;

  })

);
