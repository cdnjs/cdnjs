/*! formstone v1.4.20-1 [checkbox.js] 2021-01-29 | GPL-3.0 License | formstone.it */
/* global define */

(function(factory) {
    if (typeof define === "function" && define.amd) {
      define([
        "jquery",
        "./core"
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
      var $parent = this.closest("label"),
        $label = $parent.length ? $parent.eq(0) : $('label[for="' + this.attr("id") + '"]'),
        baseClass = [RawClasses.base, data.theme, data.customClass].join(" "),
        labelClass = [RawClasses.label, data.theme, data.customClass].join(" "),
        html = "";

      data.radio = (this.attr("type") === "radio");
      data.group = this.attr("name");

      html += '<div class="' + RawClasses.marker + '" aria-hidden="true">';
      html += '<div class="' + RawClasses.flag + '"></div>';

      if (data.toggle) {
        baseClass += " " + RawClasses.toggle;
        labelClass += " " + RawClasses.toggle;
        html += '<span class="' + [RawClasses.state, RawClasses.state_on].join(" ") + '">' + data.labels.on + '</span>';
        html += '<span class="' + [RawClasses.state, RawClasses.state_off].join(" ") + '">' + data.labels.off + '</span>';
      }

      if (data.radio) {
        baseClass += " " + RawClasses.radio;
        labelClass += " " + RawClasses.radio;
      }

      html += '</div>';

      // Modify DOM
      data.$placeholder = $('<span class="' + RawClasses.element_placeholder + '"></span>');
      this.before(data.$placeholder);

      data.labelParent = ($label.find(this).length);
      data.labelClass = labelClass;

      $label.addClass(labelClass);

      if (data.labelParent) {
        $label.wrap('<div class="' + baseClass + '"></div>')
          .before(html);
      } else {
        this.before('<div class=" ' + baseClass + '">' + html + '</div>');
      }

      // Store plugin data
      data.$checkbox = (data.labelParent) ? $label.parents(Classes.base) : this.prev(Classes.base);
      data.$marker = data.$checkbox.find(Classes.marker);
      data.$states = data.$checkbox.find(Classes.state);
      data.$label = $label;
      data.$classable = $().add(data.$checkbox).add(data.$label);

      // Check checked
      if (this.is(":checked")) {
        data.$classable.addClass(RawClasses.checked);
      }

      // Check disabled
      if (this.is(":disabled") /* || this.is("[readonly]") */ ) {
        data.$classable.addClass(RawClasses.disabled);
      }

      // Move original checkbox
      this.appendTo(data.$marker);

      // Bind click events
      this.on(Events.focus, data, onFocus)
        .on(Events.blur, data, onBlur)
        .on(Events.change, data, onChange)
        .on(Events.click, data, onClick)
        .on(Events.deselect, data, onDeselect);

      data.$checkbox.on(Events.click, data, onClick);
    }

    /**
     * @method private
     * @name destruct
     * @description Tears down instance.
     * @param data [object] "Instance data"
     */

    function destruct(data) {
      data.$checkbox.off(Events.namespace);
      // .fsTouch("destroy");

      data.$marker.remove();
      data.$states.remove();

      data.$label.removeClass(data.labelClass);

      if (data.labelParent) {
        data.$label.unwrap();
      } else {
        this.unwrap();
      }

      data.$placeholder.before(this);
      data.$placeholder.remove();

      this.off(Events.namespace);
    }

    /**
     * @method
     * @name enable
     * @description Enables target instance
     * @example $(".target").checkbox("enable");
     */

    function enable(data) {
      this.prop("disabled", false);
      data.$classable.removeClass(RawClasses.disabled);
    }

    /**
     * @method
     * @name disable
     * @description Disables target instance
     * @example $(".target").checkbox("disable");
     */

    function disable(data) {
      this.prop("disabled", true);
      data.$classable.addClass(RawClasses.disabled);
    }

    /**
     * @method
     * @name update
     * @description Updates target instance
     * @example $(".target").checkbox("update");
     */

    function update(data) {
      var disabled = data.$el.is(":disabled") /* || data.$el.is("[readonly]") */ ,
        checked = data.$el.is(":checked");

      if (!disabled) {
        if (checked) {
          onSelect({
            data: data
          });
        } else {
          onDeselect({
            data: data
          });
        }
      }
    }

    /**
     * @method private
     * @name onClick
     * @description Handles click
     */

    function onClick(e) {
      var data = e.data;

      if (!$(e.target).is(data.$el)) {
        e.preventDefault();

        data.$el.trigger("click");
      }
    }

    /**
     * @method private
     * @name onChange
     * @description Handles external changes
     * @param e [object] "Event data"
     */

    function onChange(e) {
      var data = e.data,
        disabled = data.$el.is(":disabled") /* || data.$el.is("[readonly]") */ ,
        checked = data.$el.is(":checked");

      if (!disabled) {
        if (data.radio) {
          // radio
          if (checked) {
            onSelect(e);
          }
        } else {
          // Checkbox change events fire after state has changed
          if (checked) {
            onSelect(e);
          } else {
            onDeselect(e);
          }
        }
      }
    }

    /*
     * @method private
     * @name onSelect
     * @description Changes input to "checked"
     * @param e [object] "Event data"
     */
    function onSelect(e) {
      if (e.data.radio) {
        $('input[name="' + e.data.group + '"]').not(e.data.$el).trigger("deselect");
      }

      e.data.$el.trigger(Events.focus);
      e.data.$classable.addClass(RawClasses.checked);
    }

    /**
     * @method private
     * @name onDeselect
     * @description Changes input to "checked"
     * @param e [object] "Event data"
     */
    function onDeselect(e) {
      e.data.$classable.removeClass(RawClasses.checked);
    }

    /**
     * @method private
     * @name onFocus
     * @description Handles instance focus
     * @param e [object] "Event data"
     */

    function onFocus(e) {
      e.data.$classable.addClass(RawClasses.focus);
    }

    /**
     * @method private
     * @name onBlur
     * @description Handles instance blur
     * @param e [object] "Event data"
     */

    function onBlur(e) {
      e.data.$classable.removeClass(RawClasses.focus);
    }

    /**
     * @plugin
     * @name Checkbox
     * @description A jQuery plugin for replacing checkboxes.
     * @type widget
     * @main checkbox.js
     * @main checkbox.css
     * @dependency jQuery
     * @dependency core.js
     * @__dependency touch.js
     */

    var Plugin = Formstone.Plugin("checkbox", {
        widget: true,

        /**
         * @options
         * @param customClass [string] <''> "Class applied to instance"
         * @param toggle [boolean] <false> "Render 'toggle' styles"
         * @param labels.on [string] <'ON'> "Label for 'On' position; 'toggle' only"
         * @param labels.off [string] <'OFF'> "Label for 'Off' position; 'toggle' only"
         * @param theme [string] <"fs-light"> "Theme class name"
         */

        defaults: {
          customClass: "",
          toggle: false,
          labels: {
            on: "ON",
            off: "OFF"
          },
          theme: "fs-light"
        },

        classes: [
          "element_placeholder",
          "label",
          "marker",
          "flag",
          "radio",
          "focus",
          "checked",
          "disabled",
          "toggle",
          "state",
          "state_on",
          "state_off"
        ],

        methods: {
          _construct: construct,
          _destruct: destruct,

          // Public Methods

          enable: enable,
          disable: disable,
          update: update
        },

        events: {
          deselect: "deselect"
        }
      }),

      // Localize References

      Classes = Plugin.classes,
      RawClasses = Classes.raw,
      Events = Plugin.events,
      Functions = Plugin.functions;

  })

);
