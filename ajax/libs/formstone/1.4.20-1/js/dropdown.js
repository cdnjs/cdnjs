/*! formstone v1.4.20-1 [dropdown.js] 2021-01-29 | GPL-3.0 License | formstone.it */
/* global define */

(function(factory) {
    if (typeof define === "function" && define.amd) {
      define([
        "jquery",
        "./core",
        "./scrollbar",
        "./touch"
      ], factory);
    } else {
      factory(jQuery, Formstone);
    }
  }(function($, Formstone) {

    "use strict";

    /**
     * @method private
     * @name setup
     * @description Setup plugin.
     */

    function setup() {
      $Body = Formstone.$body;
    }

    /**
     * @method private
     * @name construct
     * @description Builds instance.
     * @param data [object] "Instance data"
     */

    function construct(data) {
      data.multiple = this.prop("multiple");
      data.disabled = this.prop("disabled") || this.is("[readonly]");
      data.lastIndex = false;

      data.native = data.mobile || data.native; // TODO: 'mobile' deprecated
      data.useNative = data.native || Formstone.isMobile;

      if (data.multiple) {
        data.links = false;
      } else if (data.external) {
        data.links = true;
      }

      // Grab true original index, only if selected attribute exits
      var $trueOriginal = this.find("[selected]").not(":disabled"),
        $originalOption = this.find(":selected").not(":disabled"),
        originalLabel = $originalOption.text(),
        originalIndex = this.find("option").index($originalOption);

      if (!data.multiple && data.label !== "" && !$trueOriginal.length) {
        $originalOption = this.prepend('<option value="" class="' + RawClasses.item_placeholder + '" selected>' + data.label + '</option>');
        originalLabel = data.label;
        originalIndex = 0;
      } else {
        data.label = "";
      }

      // Build options array
      var $allOptions = this.find("option, optgroup"),
        $options = $allOptions.filter("option"),
        $label = $('[for="' + this.attr("id") + '"]');

      // Swap tab index, no more interacting with the actual input!
      data.tabIndex = this[0].tabIndex;
      this[0].tabIndex = -1;

      if ($label.length) {
        $label[0].tabIndex = -1;
      }

      // Build wrapper
      var wrapperClasses = [
        RawClasses.base,
        data.theme,
        data.customClass
      ];

      if (data.useNative) {
        wrapperClasses.push(RawClasses.native);
      } else if (data.cover) {
        wrapperClasses.push(RawClasses.cover);
      }
      if (data.multiple) {
        wrapperClasses.push(RawClasses.multiple);
      }
      if (data.disabled) {
        wrapperClasses.push(RawClasses.disabled);
      }

      // Aria

      data.id = this.attr("id");

      if (data.id) {
        data.ariaId = data.id;
      } else {
        data.ariaId = data.rawGuid;
      }

      data.ariaId += '-dropdown';
      data.selectedAriaId = data.ariaId + "-selected";

      // Build html
      var wrapperHtml = "",
        innerHtml = "";

      wrapperHtml += '<div class="' + wrapperClasses.join(" ") + '"id="' + data.ariaId + '" tabindex="' + data.tabIndex + '" role="listbox"';
      if (data.multiple) {
        wrapperHtml += ' aria-label="multi select"';
      } else {
        wrapperHtml += ' aria-haspopup="true" aria-live="polite" aria-labelledby="' + data.selectedAriaId + '"';
      }
      wrapperHtml += '></div>';

      // Build inner
      if (!data.multiple) {
        innerHtml += '<button type="button" class="' + RawClasses.selected + '" id="' + data.selectedAriaId + '" tabindex="-1">';
        innerHtml += $('<span></span>').text(trimText(originalLabel, data.trim)).html();
        innerHtml += '</button>';
      }
      innerHtml += '<div class="' + RawClasses.options + '">';
      innerHtml += '</div>';

      // Modify DOM
      this.wrap(wrapperHtml)
        .after(innerHtml);

      // Store plugin data
      data.$dropdown = this.parent(Classes.base);
      data.$label = $label;
      data.$allOptions = $allOptions;
      data.$options = $options;
      data.$selected = data.$dropdown.find(Classes.selected);
      data.$wrapper = data.$dropdown.find(Classes.options);
      data.$placeholder = data.$dropdown.find(Classes.placeholder);
      data.index = -1;
      data.closed = true;
      data.focused = false;

      buildOptions(data);

      if (!data.multiple) {
        updateOption(originalIndex, data);
      }

      // Scrollbar support
      if ($.fn.fsScrollbar !== undefined) {
        data.$wrapper.fsScrollbar({
          theme: data.theme
        }).find(".fs-scrollbar-content").attr("tabindex", null);
      }

      // Bind events
      data.$dropdown.on(Events.click, data, onClick);
      data.$selected.on(Events.click, data, onClick);

      data.$dropdown.on(Events.click, Classes.item, data, onSelect)
        .on(Events.close, data, onClose);

      // Change events
      this.on(Events.change, data, onChange);

      // Focus/Blur events
      if (!data.useNative) {
        // Handle clicks to associated labels
        this.on(Events.focusIn, data, function(e) {
          e.data.$dropdown.trigger(Events.raw.focus);
        });

        data.$dropdown.on(Events.focusIn, data, onFocusIn)
          .on(Events.focusOut, data, onFocusOut);
      }
    }

    /**
     * @method private
     * @name destruct
     * @description Tears down instance.
     * @param data [object] "Instance data"
     */

    function destruct(data) {
      if (data.$dropdown.hasClass(RawClasses.open)) {
        data.$selected.trigger(Events.click);
      }

      // Scrollbar support
      if ($.fn.fsScrollbar !== undefined) {
        data.$wrapper.fsScrollbar("destroy");
      }

      data.$el[0].tabIndex = data.tabIndex;

      if (data.$label.length) {
        data.$label[0].tabIndex = data.tabIndex;
      }

      data.$dropdown.off(Events.namespace);
      data.$options.off(Events.namespace);

      data.$placeholder.remove();
      data.$selected.remove();
      data.$wrapper.remove();

      data.$el.off(Events.namespace)
        .show()
        .unwrap();
    }

    /**
     * @method
     * @name disable
     * @description Disables target instance or option.
     * @param option [string] <null> "Target option value"
     * @example $(".target").dropdown("disable", "1");
     */

    function disableDropdown(data, option) {
      if (typeof option !== "undefined") {
        var index = data.$items.index(data.$items.filter("[data-value=" + option + "]"));

        data.$items.eq(index).addClass(RawClasses.item_disabled);
        data.$options.eq(index).prop("disabled", true);
      } else {
        if (data.$dropdown.hasClass(RawClasses.open)) {
          data.$selected.trigger(Events.click);
        }

        data.$dropdown.addClass(RawClasses.disabled);
        data.$el.prop("disabled", true);

        data.disabled = true;
      }
    }

    /**
     * @method
     * @name enable
     * @description Enables target instance or option.
     * @param option [string] <null> "Target option value"
     * @example $(".target").dropdown("enable", "1");
     */

    function enableDropdown(data, option) {
      if (typeof option !== "undefined") {
        var index = data.$items.index(data.$items.filter("[data-value=" + option + "]"));
        data.$items.eq(index).removeClass(RawClasses.item_disabled);
        data.$options.eq(index).prop("disabled", false);
      } else {
        data.$dropdown.removeClass(RawClasses.disabled);
        data.$el.prop("disabled", false);

        data.disabled = false;
      }
    }

    /**
     * @method
     * @name update
     * @description Updates instance.
     * @example $(".target").dropdown("update");
     */

    function updateDropdown(data) {
      // Scrollbar support
      if ($.fn.fsScrollbar !== undefined) {
        data.$wrapper.fsScrollbar("destroy");
      }

      var index = data.index;

      data.$allOptions = data.$el.find("option, optgroup");
      data.$options = data.$allOptions.filter("option");
      data.index = -1;

      index = data.$options.index(data.$options.filter(":selected"));

      buildOptions(data);

      if (!data.multiple) {
        updateOption(index, data);
      }

      // Scrollbar support
      if ($.fn.fsScrollbar !== undefined) {
        data.$wrapper.fsScrollbar({
          theme: data.theme
        }).find(".fs-scrollbar-content").attr("tabindex", null);
      }
    }

    /**
     * @method private
     * @name buildOptions
     * @description Builds instance's option set.
     * @param data [object] "Instance data"
     */

    function buildOptions(data) {
      var html = '',
        j = 0;

      for (var i = 0, count = data.$allOptions.length; i < count; i++) {
        var $option = data.$allOptions.eq(i),
          classes = [];

        // Option group
        if ($option[0].tagName === "OPTGROUP") {
          classes.push(RawClasses.group);

          // Disabled groups
          if ($option.prop("disabled")) {
            classes.push(RawClasses.disabled);
          }

          html += '<span class="' + classes.join(" ") + '">' + $option.attr("label") + '</span>';
        } else {
          var opVal = $option.val(),
            opLabel = $option.data("label"),
            opType = (data.links) ? "a" : 'button type="button"';

          if (!$option.attr("value")) {
            $option.attr("value", opVal);
          }

          classes.push(RawClasses.item);

          if ($option.hasClass(RawClasses.item_placeholder)) {
            classes.push(RawClasses.item_placeholder);

            opType = "span";
          }
          if ($option.prop("selected")) {
            classes.push(RawClasses.item_selected);
          }
          if ($option.prop("disabled")) {
            classes.push(RawClasses.item_disabled);
          }

          html += '<' + opType + ' class="' + classes.join(" ") + '"';

          if (data.links) {
            if (opType === "span") {
              html += ' aria-hidden="true"';
            } else {
              html += ' href="' + opVal + '"';

              if (data.external) {
                html += ' target="_blank"';
              }
            }
          } else {
            html += ' data-value="' + opVal + '"';
          }

          //html += ' tabindex="-1">';
          html += ' role="option"';
          if ($option.prop("selected")) {
            html += ' "aria-selected"="true"';
          }
          html += '>';

          if (opLabel) {
            html += opLabel;
          } else {
            html += Functions.decodeEntities(trimText($option.text(), data.trim));
          }

          html += '</' + opType + '>';

          j++;
        }
      }

      data.$items = data.$wrapper.html($.parseHTML(html))
        .find(Classes.item);
    }

    /**
     * @method private
     * @name onClick
     * @description Handles click to selected item.
     * @param e [object] "Event data"
     */

    function onClick(e) {
      Functions.killEvent(e);

      var data = e.data;

      if (!data.disabled && !data.useNative) {
        // Delegate intent
        if (data.closed) {
          openOptions(data);
        } else {
          closeOptions(data);
        }
      }

      closeOthers(data);
    }

    function closeOthers(data) {
      $(Classes.base).not(data.$dropdown).trigger(Events.close, [data]);
    }

    /**
     * @method private
     * @name openOptions
     * @description Opens option set.
     * @param data [object] "Instance data"
     */

    /**
     * @method
     * @name open
     * @description Opens target instance.
     * @example $(".target").dropdown("open");
     */

    function openOptions(data) {
      // Make sure it's not already open
      if (data.closed) {
        var windowHeight = $Window.height(),
          optionsHeight = data.$wrapper.outerHeight(true),
          boundingRect = data.$dropdown[0].getBoundingClientRect();

        // Calculate bottom of document
        if (boundingRect.bottom + optionsHeight > windowHeight - data.bottomEdge) {
          data.$dropdown.addClass(RawClasses.bottom);
        }

        // Bind Events
        $Body.on(Events.click + data.dotGuid, ":not(" + Classes.options + ")", data, closeOptionsHelper);

        data.$dropdown.trigger(Events.focusIn);

        data.$dropdown.addClass(RawClasses.open);
        scrollOptions(data);

        data.closed = false;
      }
    }

    /**
     * @method private
     * @name closeOptions
     * @description Closes option set.
     * @param data [object] "Instance data"
     */

    /**
     * @method
     * @name close
     * @description Closes target instance.
     * @example $(".target").dropdown("close");
     */

    function closeOptions(data) {
      // Make sure it's actually open
      if (data && !data.closed) {
        $Body.off(Events.click + data.dotGuid);

        data.$dropdown.removeClass([RawClasses.open, RawClasses.bottom].join(" "));

        data.closed = true;
      }
    }

    /**
     * @method private
     * @name closeOptionsHelper
     * @description Determines if event target is outside instance before closing
     * @param e [object] "Event data"
     */

    function closeOptionsHelper(e) {
      Functions.killEvent(e);

      var data = e.data;

      if (data && $(e.currentTarget).parents(Classes.base).length === 0) {
        closeOptions(data);

        data.$dropdown.trigger(Events.focusOut);
      }
    }

    /**
     * @method private
     * @name onClose
     * @description Handles close event.
     * @param e [object] "Event data"
     */

    function onClose(e) {
      var data = e.data;

      if (data) {
        closeOptions(data);

        data.$dropdown.trigger(Events.focusOut);
      }
    }

    /**
     * @method private
     * @name onSelect
     * @description Handles option select.
     * @param e [object] "Event data"
     */

    function onSelect(e) {
      var $target = $(this),
        data = e.data;

      Functions.killEvent(e);

      if (!data.disabled) {
        var index = data.$items.index($target);

        data.focusIndex = index;

        if (data.$wrapper.is(":visible")) {
          updateOption(index, data, e.shiftKey, e.metaKey || e.ctrlKey);
          handleChange(data);
        }

        if (!data.multiple) {
          closeOptions(data);
        }

        data.$dropdown.trigger(Events.focus);
      }
    }

    /**
     * @method private
     * @name onChange
     * @description Handles external changes.
     * @param e [object] "Event data"
     */

    function onChange(e, internal) {
      var $target = $(this),
        data = e.data;

      if (!internal && !data.multiple) {
        var index = data.$options.index(data.$options.filter(":selected"));

        data.focusIndex = index;

        updateOption(index, data);
        handleChange(data, true);
      }
    }

    /**
     * @method private
     * @name onFocusIn
     * @description Handles instance focusIn.
     * @param e [object] "Event data"
     */

    function onFocusIn(e) {
      Functions.killEvent(e);

      var $target = $(e.currentTarget),
        data = e.data;

      if (!data.disabled && !data.multiple && !data.focused) {
        closeOthers(data);

        data.focused = true;
        data.focusIndex = data.index;
        data.input = '';

        data.$dropdown.addClass(RawClasses.focus)
          .on(Events.keyDown + data.dotGuid, data, onKeypress);
      }
    }

    /**
     * @method private
     * @name onFocusOut
     * @description Handles instance focusOut.
     * @param e [object] "Event data"
     */

    function onFocusOut(e) {
      Functions.killEvent(e);

      var $target = $(e.currentTarget),
        data = e.data;

      if (data.focused && data.closed) {
        data.focused = false;

        data.$dropdown.removeClass(RawClasses.focus)
          .off(Events.keyDown + data.dotGuid);

        if (!data.multiple) {
          // Clean up
          closeOptions(data);

          if (data.index !== data.focusIndex) {
            handleChange(data);

            data.focusIndex = data.index;
          }
        }
      }
    }

    /**
     * @method private
     * @name onKeypress
     * @description Handles instance keypress, once focused.
     * @param e [object] "Event data"
     */

    function onKeypress(e) {
      var data = e.data;

      data.keyTimer = Functions.startTimer(data.keyTimer, 1000, function() {
        data.input = '';
      });

      if (e.keyCode === 13) {
        if (!data.closed) {
          closeOptions(data);
          updateOption(data.index, data);
        }
        handleChange(data);
      } else if (e.keyCode !== 9 && (!e.metaKey && !e.altKey && !e.ctrlKey && !e.shiftKey)) {
        // Ignore modifiers & tabs
        Functions.killEvent(e);

        var total = data.$items.length - 1,
          index = (data.index < 0) ? 0 : data.index;

        // Firefox left/right support thanks to Kylemade
        if ($.inArray(e.keyCode, (Formstone.isFirefox) ? [38, 40, 37, 39] : [38, 40]) > -1) {
          // Increment / decrement using the arrow keys
          index = index + ((e.keyCode === 38 || (Formstone.isFirefox && e.keyCode === 37)) ? -1 : 1);

          if (index < 0) {
            index = 0;
          }
          if (index > total) {
            index = total;
          }
        } else {
          var input = String.fromCharCode(e.keyCode).toUpperCase(),
            check,
            i;

          // Store more than 1 input letter
          data.input += input;

          // Search for input from original index
          for (i = data.index + 1; i <= total; i++) {
            check = data.$options.eq(i).text().substr(0, data.input.length).toUpperCase();

            if (check === data.input) {
              index = i;
              break;
            }
          }

          // If not, start from the beginning
          if (index < 0 || index === data.index) {
            for (i = 0; i <= total; i++) {
              check = data.$options.eq(i).text().substr(0, data.input.length).toUpperCase();

              if (check === data.input) {
                index = i;
                break;
              }
            }
          }
        }

        // Update
        if (index >= 0) {
          updateOption(index, data);
          scrollOptions(data);
        }
      }
    }

    /**
     * @method private
     * @name updateOption
     * @description Updates instance based on new target index.
     * @param index [int] "Selected option index"
     * @param data [object] "instance data"
     */

    function updateOption(index, data, shiftKey, metaKey) {
      var $item = data.$items.eq(index),
        $option = data.$options.eq(index),
        isSelected = $item.hasClass(RawClasses.item_selected),
        isDisabled = $item.hasClass(RawClasses.item_disabled);

      // Check for disabled options
      if (!isDisabled) {
        if (data.multiple) {
          if (data.useNative) {
            if (isSelected) {
              $option.prop("selected", null)
                .attr("aria-selected", null);
              $item.removeClass(RawClasses.item_selected);
            } else {
              $option.prop("selected", true)
                .attr("aria-selected", true);
              $item.addClass(RawClasses.item_selected);
            }
          } else {
            if (shiftKey && data.lastIndex !== false) {
              var start = (data.lastIndex > index) ? index : data.lastIndex,
                end = ((data.lastIndex > index) ? data.lastIndex : index) + 1;

              data.$options.prop("selected", null)
                .attr("aria-selected", null);
              data.$items.filter(Classes.item_selected)
                .removeClass(RawClasses.item_selected);

              data.$options.slice(start, end).not("[disabled]").prop("selected", true);
              data.$items.slice(start, end).not(Classes.item_disabled).addClass(RawClasses.item_selected);
            } else if (metaKey || data.selectMultiple) {
              if (isSelected) {
                $option.prop("selected", null)
                  .attr("aria-selected", null);
                $item.removeClass(RawClasses.item_selected);
              } else {
                $option.prop("selected", true)
                  .attr("aria-selected", true);
                $item.addClass(RawClasses.item_selected);
              }

              data.lastIndex = index;
            } else {
              data.$options.prop("selected", null)
                .attr("aria-selected", null);
              data.$items.filter(Classes.item_selected)
                .removeClass(RawClasses.item_selected);

              $option.prop("selected", true)
                .attr("aria-selected", true);
              $item.addClass(RawClasses.item_selected);

              data.lastIndex = index;
            }
          }
        } else if (index > -1 && index < data.$items.length) {
          if (index !== data.index) {
            var label = $option.data("label") || $item.html();

            data.$selected.html(label)
              .removeClass(Classes.item_placeholder);

            data.$items.filter(Classes.item_selected)
              .removeClass(RawClasses.item_selected);

            data.$el[0].selectedIndex = index;

            $item.addClass(RawClasses.item_selected);
            data.index = index;
          }
        } else if (data.label !== "") {
          data.$selected.html(data.label);
        }
      }
    }

    /**
     * @method private
     * @name scrollOptions
     * @description Scrolls options wrapper to specific option.
     * @param data [object] "Instance data"
     */

    function scrollOptions(data) {
      var $selected = data.$items.eq(data.index),
        selectedOffset = (data.index >= 0 && !$selected.hasClass(RawClasses.item_placeholder)) ? $selected.position() : {
          left: 0,
          top: 0
        },
        buffer = (data.$wrapper.outerHeight() - $selected.outerHeight()) / 2;

      if ($.fn.fsScrollbar !== undefined) {
        data.$wrapper.fsScrollbar("resize")
          .fsScrollbar("scroll", (data.$wrapper.find(".fs-scrollbar-content").scrollTop() + selectedOffset.top));
      } else {
        data.$wrapper.scrollTop(data.$wrapper.scrollTop() + selectedOffset.top - buffer);
      }
    }

    /**
     * @method private
     * @name handleChange
     * @description Handles change events.
     * @param data [object] "Instance data"
     */

    function handleChange(data, external) {
      if (data.links) {
        launchLink(data);
      } else {
        if (!external) {
          data.$el.trigger(Events.raw.change, [true]);
        }
      }
    }

    /**
     * @method private
     * @name launchLink
     * @description Launches link.
     * @param data [object] "Instance data"
     */

    function launchLink(data) {
      var url = data.$el.val();

      if (data.external) {
        // Open link in a new tab/window
        Window.open(url);
      } else {
        // Open link in same tab/window
        Window.location.href = url;
      }
    }

    /**
     * @method private
     * @name trimText
     * @description Trims text, if specified length is greater then 0.
     * @param length [int] "Length to trim at"
     * @param text [string] "Text to trim"
     * @return [string] "Trimmed string"
     */

    function trimText(text, length) {
      if (length === 0) {
        return text;
      } else {
        if (text.length > length) {
          return text.substring(0, length) + "...";
        } else {
          return text;
        }
      }
    }

    /**
     * @method private
     * @name escapeText
     * @description Escapes text.
     * @param text [string] "Text to escape"
     */

    function escapeText(text) {
      return (typeof text === "string") ? text.replace(/([;&,\.\+\*\~':"\!\^#$%@\[\]\(\)=>\|])/g, '\\$1') : text;
    }

    /**
     * @plugin
     * @name Dropdown
     * @description A jQuery plugin for custom select elements.
     * @type widget
     * @main dropdown.js
     * @main dropdown.css
     * @dependency jQuery
     * @dependency core.js
     * @dependency scrollbar.js (optional)
     * @dependency touch.js (optional, for scrollbar)
     */

    var Plugin = Formstone.Plugin("dropdown", {
        widget: true,

        /**
         * @options
         * @param bottomEdge [int] <0> "Threshold for bottom position”
         * @param cover [boolean] <false> "Cover handle with option set"
         * @param customClass [string] <''> "Class applied to instance"
         * @param label [string] <''> "Label displayed before selection"
         * @param external [boolean] <false> "Open options as links in new window"
         * @param links [boolean] <false> "Open options as links in same window"
         * @param native [boolean] <false> "Use native browser options"
         * @param theme [string] <"fs-light"> "Theme class name"
         * @param trim [int] <0> "Trim options to specified length; 0 to disable”
         * @param selectMultiple [boolean] <false> "Select multiple items without push ctrl key”
         */
        defaults: {
          bottomEdge: 0,
          cover: false,
          customClass: "",
          label: "",
          external: false,
          links: false,
          mobile: false, // TODO: deprecated
          native: false,
          theme: "fs-light",
          trim: 0,
          selectMultiple: false
        },

        methods: {
          _construct: construct,
          _destruct: destruct,

          disable: disableDropdown,
          enable: enableDropdown,
          update: updateDropdown,
          open: openOptions,
          close: closeOptions
        },

        classes: [
          "cover",
          "bottom",
          "multiple",
          "mobile", // deprecated
          "native",

          "open",
          "disabled",
          "focus",

          "selected",
          "options",
          "group",
          "item",

          "item_disabled",
          "item_selected",
          "item_placeholder"
        ],

        events: {
          close: "close"
        }
      }),

      // Localize References

      Classes = Plugin.classes,
      RawClasses = Classes.raw,
      Events = Plugin.events,
      Functions = Plugin.functions,

      // Local

      Window = Formstone.window,
      $Window = Formstone.$window,
      Document = Formstone.document,
      $Body = null;

    // Setup

    Formstone.Ready(setup);

  })

);
