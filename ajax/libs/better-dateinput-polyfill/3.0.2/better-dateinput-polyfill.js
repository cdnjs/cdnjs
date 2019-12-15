/**
 * better-dateinput-polyfill: input[type=date] polyfill for better-dom
 * @version 3.0.2 Sat, 17 Nov 2018 10:13:37 GMT
 * @link https://github.com/chemerisuk/better-dateinput-polyfill
 * @copyright 2018 Maksim Chemerisuk
 * @license MIT
 */
(function (DOM, VK_SPACE, VK_TAB, VK_ENTER, VK_ESCAPE, VK_BACKSPACE, VK_DELETE, VK_CONTROL) {
  "use strict";
  /* globals html:false */

  var CLICK_EVENT_TYPE = "orientation" in window ? "touchend" : "mousedown";
  var IE = "ScriptEngineMajorVersion" in window;

  var INTL_SUPPORTED = function () {
    try {
      new Date().toLocaleString("i");
    } catch (err) {
      return err instanceof RangeError;
    }

    return false;
  }();

  var TYPE_SUPPORTED = function () {
    // use a stronger type support detection that handles old WebKit browsers:
    // http://www.quirksmode.org/blog/archives/2015/03/better_modern_i.html
    return DOM.create("<input type='date'>").value("_").value() !== "_";
  }();

  var HTML = DOM.get("documentElement"),
      ampm = function ampm(pos, neg) {
    return HTML.lang === "en-US" ? pos : neg;
  },
      formatDateValue = function formatDateValue(date) {
    return [date.getFullYear(), ("00" + (date.getMonth() + 1)).slice(-2), ("00" + date.getDate()).slice(-2)].join("-");
  },
      readDateRange = function readDateRange(el) {
    return ["min", "max"].map(function (x) {
      return new Date(el.get(x) || "");
    });
  };

  function repeat(times, fn) {
    if (typeof fn === "string") {
      return Array(times + 1).join(fn);
    } else {
      return Array.apply(null, Array(times)).map(fn).join("");
    }
  }

  function localeWeekday(index) {
    var date = new Date(Date.UTC(ampm(2001, 2002), 0, index));

    if (INTL_SUPPORTED) {
      try {
        return date.toLocaleDateString(HTML.lang, {
          weekday: "short"
        });
      } catch (err) {}
    }

    return date.toUTCString().split(",")[0].slice(0, 2).toLowerCase();
  }

  function localeMonth(index) {
    var date = new Date(Date.UTC(2010, index));

    if (INTL_SUPPORTED) {
      try {
        return date.toLocaleDateString(HTML.lang, {
          month: "short"
        });
      } catch (err) {}
    }

    return date.toUTCString().split(" ")[2];
  }

  function localeMonthYear(month, year) {
    var date = new Date(year, month);

    if (INTL_SUPPORTED) {
      try {
        return date.toLocaleDateString(HTML.lang, {
          month: "long",
          year: "numeric"
        });
      } catch (err) {}
    }

    return date.toUTCString().split(" ").slice(2, 4).join(" ");
  }

  var PICKER_BODY_HTML = "<style>body{font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;line-height:2.5rem;text-align:center;cursor:default;user-select:none;margin:0;overflow:hidden;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}a{width:3rem;height:2.5rem;position:absolute;text-decoration:none;color:inherit}b{display:block;cursor:pointer}table{width:100%;table-layout:fixed;border-spacing:0;border-collapse:collapse;text-align:center;line-height:2.5rem}td,th{padding:0}thead{background:#d3d3d3;font-size:smaller;font-weight:700}[aria-disabled=true],[aria-selected=false]{color:graytext}[aria-selected=true]{box-shadow:inset 0 0 0 1px graytext}[aria-disabled=true],[aria-selected=true],a:hover,td:hover{background-color:#f5f5f5}table+table{line-height:3.75rem;background:#fff;position:absolute;top:2.5em;left:0;opacity:1;transition:.1s ease-out}table+table[aria-hidden=true]{visibility:hidden!important;opacity:0}</style><a style=\"left:0\">&#x25C4;</a> <a style=\"right:0\">&#x25BA;</a> <b></b><table><thead>" + repeat(7, function (_, i) {
    return "<th>" + localeWeekday(i);
  }) + "</thead><tbody>" + repeat(7, "<tr>" + repeat(7, "<td>") + "</tr>") + "</tbody></table><table><tbody>" + repeat(3, function (_, i) {
    return "<tr>" + repeat(4, function (_, j) {
      return "<td>" + localeMonth(i * 4 + j);
    });
  }) + "</tbody></table>";
  DOM.extend("input[type=date]", {
    constructor: function constructor() {
      var _this = this;

      if (this._isNative()) return false;
      this._svgTextColor = this.css("color");
      this._svgTextFont = this.css("font");
      this._svgTextOffset = ["padding-left", "border-left-width", "text-indent"].map(function (p) {
        return parseFloat(_this.css(p));
      }).reduce(function (a, b) {
        return a + b;
      });
      var picker = DOM.create("<dateinput-picker tabindex='-1'>");
      picker.on("load", {
        capture: true
      }, ["target"], this._initPicker.bind(this, picker));
      picker.css("z-index", 1 + (this.css("z-index") | 0));
      this.before(picker.hide());
    },
    _isNative: function _isNative() {
      var polyfillType = this.get("data-polyfill"),
          deviceType = "orientation" in window ? "mobile" : "desktop";
      if (polyfillType === "none") return true;

      if (polyfillType && (polyfillType === deviceType || polyfillType === "all")) {
        // remove native browser implementation
        this.set("type", "text"); // force applying the polyfill

        return false;
      }

      return TYPE_SUPPORTED;
    },
    _initPicker: function _initPicker(picker, object) {
      var pickerRoot = DOM.constructor(object.get("contentDocument"));
      var pickerBody = pickerRoot.find("body");
      pickerBody.set(PICKER_BODY_HTML);
      var calendarCaption = pickerBody.find("b");
      var calenderDays = pickerBody.find("table");
      var calendarMonths = pickerBody.find("table+table");

      var invalidatePicker = this._invalidatePicker.bind(this, calendarMonths, calenderDays);

      var resetValue = this._syncValue.bind(this, picker, invalidatePicker, "defaultValue");

      var updateValue = this._syncValue.bind(this, picker, invalidatePicker, "value");

      var toggleState = this._togglePicker.bind(this, picker, invalidatePicker); // patch value property for the input element


      var valueDescriptor = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value");
      Object.defineProperty(this[0], "value", {
        configurable: false,
        enumerable: true,
        get: valueDescriptor.get,
        set: this._setValue.bind(this, valueDescriptor.set, updateValue)
      }); // sync picker visibility on focus/blur

      this.on("focus", this._focusPicker.bind(this, picker, toggleState));
      this.on("blur", this._blurPicker.bind(this, picker));
      this.on("change", updateValue);
      this.on("keydown", ["which"], this._keydownPicker.bind(this, picker, toggleState)); // form events do not trigger any state change

      this.closest("form").on("reset", resetValue); // picker invalidate handlers

      calenderDays.on("picker:invalidate", ["detail"], this._invalidateDays.bind(this, calenderDays));
      calendarMonths.on("picker:invalidate", ["detail"], this._invalidateMonths.bind(this, calendarMonths));
      pickerBody.on("picker:invalidate", ["detail"], this._invalidateCaption.bind(this, calendarCaption, picker)); // picker click handlers

      pickerBody.on(CLICK_EVENT_TYPE, "a", ["target"], this._clickPickerButton.bind(this, picker));
      pickerBody.on(CLICK_EVENT_TYPE, "td", ["target"], this._clickPickerDay.bind(this, picker, toggleState));
      calendarCaption.on(CLICK_EVENT_TYPE, toggleState); // prevent input from loosing the focus outline

      pickerBody.on(CLICK_EVENT_TYPE, function () {
        return false;
      });
      this.on(CLICK_EVENT_TYPE, this._focusPicker.bind(this, picker, toggleState));
      resetValue(); // present initial value
      // display calendar for autofocused elements

      if (DOM.get("activeElement") === this[0]) {
        picker.show();
      }
    },
    _setValue: function _setValue(setter, updateValue, value) {
      var valueParts = value.split("-").map(parseFloat);
      var dateValue = new Date(valueParts[0], valueParts[1] - 1, valueParts[2]);
      var range = readDateRange(this);

      if (dateValue < range[0]) {
        value = formatDateValue(range[0]);
      } else if (dateValue > range[1]) {
        value = formatDateValue(range[1]);
      } else if (isNaN(dateValue.getTime())) {
        value = "";
      }

      setter.call(this[0], value);
      updateValue();
    },
    _invalidatePicker: function _invalidatePicker(calendarMonths, calenderDays, expanded, dateValue) {
      if (!dateValue) {
        var valueParts = this.value().split("-").map(parseFloat);
        dateValue = new Date(valueParts[0], valueParts[1] - 1, valueParts[2]);
      }

      if (isNaN(dateValue.getTime())) {
        dateValue = new Date();
      }

      var target = expanded ? calendarMonths : calenderDays; // refresh current picker

      target.fire("picker:invalidate", dateValue);

      if (expanded) {
        calendarMonths.show();
      } else {
        calendarMonths.hide();
      }
    },
    _invalidateDays: function _invalidateDays(calenderDays, dateValue) {
      var month = dateValue.getMonth();
      var date = dateValue.getDate();
      var year = dateValue.getFullYear();
      var range = readDateRange(this);
      var iterDate = new Date(year, month, 1); // move to beginning of the first week in current month

      iterDate.setDate(1 - iterDate.getDay() - ampm(1, 0)); // update days picker

      calenderDays.findAll("td").forEach(function (day) {
        iterDate.setDate(iterDate.getDate() + 1);
        var mDiff = month - iterDate.getMonth(),
            selectedValue = null,
            disabledValue = null;
        if (year !== iterDate.getFullYear()) mDiff *= -1;

        if (iterDate < range[0] || iterDate > range[1]) {
          disabledValue = "true";
        } else if (mDiff > 0 || mDiff < 0) {
          selectedValue = "false";
        } else if (date === iterDate.getDate()) {
          selectedValue = "true";
        }

        day._ts = iterDate.getTime();
        day.set("aria-selected", selectedValue);
        day.set("aria-disabled", disabledValue);
        day.value(iterDate.getDate());
      });
    },
    _invalidateMonths: function _invalidateMonths(calendarMonths, dateValue) {
      var month = dateValue.getMonth();
      var year = dateValue.getFullYear();
      var range = readDateRange(this);
      var iterDate = new Date(year, month, 1);
      calendarMonths.findAll("td").forEach(function (day, index) {
        iterDate.setMonth(index);
        var mDiff = month - iterDate.getMonth(),
            selectedValue = null;

        if (iterDate < range[0] || iterDate > range[1]) {
          selectedValue = "false";
        } else if (!mDiff) {
          selectedValue = "true";
        }

        day._ts = iterDate.getTime();
        day.set("aria-selected", selectedValue);
      });
    },
    _invalidateCaption: function _invalidateCaption(calendarCaption, picker, dateValue) {
      var year = dateValue.getFullYear(); // update calendar caption

      if (picker.get("aria-expanded") === "true") {
        calendarCaption.value(year);
      } else {
        calendarCaption.value(localeMonthYear(dateValue.getMonth(), year));
      }
    },
    _syncValue: function _syncValue(picker, invalidatePicker, propName) {
      var valueParts = this.get(propName).split("-").map(parseFloat);
      var dateValue = new Date(valueParts[0], valueParts[1] - 1, valueParts[2]);
      var formattedValue = "";

      if (!isNaN(dateValue.getTime())) {
        try {
          formattedValue = dateValue.toLocaleDateString(HTML.lang, JSON.parse(this.get("data-format")));
        } catch (err) {
          formattedValue = dateValue.toLocaleDateString();
        }
      }

      var svgContent = "<svg xmlns=\"http://www.w3.org/2000/svg\"><text dominant-baseline=\"central\" x=\"" + this._svgTextOffset + "\" y=\"50%\" style=\"font:" + this._svgTextFont + "\">" + formattedValue + "</text></svg>"; // FIXME: fill="${this._svgTextColor}" does not work properly

      this.css("background-image", "url(data:image/svg+xml," + encodeURIComponent(svgContent) + ")"); // update picker state

      invalidatePicker(picker.get("aria-expanded") === "true", dateValue);
    },
    _clickPickerButton: function _clickPickerButton(picker, target) {
      var valueParts = this.value().split("-").map(parseFloat);
      var targetDate = new Date(valueParts[0], valueParts[1] - 1, valueParts[2]);
      if (isNaN(targetDate.getTime())) targetDate = new Date();
      var sign = target.next("a")[0] ? -1 : 1;

      if (picker.get("aria-expanded") === "true") {
        targetDate.setFullYear(targetDate.getFullYear() + sign);
      } else {
        targetDate.setMonth(targetDate.getMonth() + sign);
      }

      this.value(formatDateValue(targetDate)).fire("change");
    },
    _clickPickerDay: function _clickPickerDay(picker, toggleState, target) {
      var targetDate;

      if (picker.get("aria-expanded") === "true") {
        if (isNaN(target._ts)) {
          targetDate = new Date();
        } else {
          targetDate = new Date(target._ts);
        } // switch to date calendar mode


        toggleState(false);
      } else {
        if (!isNaN(target._ts)) {
          targetDate = new Date(target._ts);
          picker.hide();
        }
      }

      if (targetDate != null) {
        this.value(formatDateValue(targetDate)).fire("change");
      }
    },
    _togglePicker: function _togglePicker(picker, invalidatePicker, force) {
      if (typeof force !== "boolean") {
        force = picker.get("aria-expanded") !== "true";
      }

      picker.set("aria-expanded", force);
      invalidatePicker(force);
    },
    _keydownPicker: function _keydownPicker(picker, toggleState, which) {
      if (which === VK_ENTER && picker.get("aria-hidden") === "true") {
        // ENTER key should submit form if calendar is hidden
        return true;
      }

      if (which === VK_SPACE) {
        // SPACE key toggles calendar visibility
        if (!this.get("readonly")) {
          toggleState(false);

          if (picker.get("aria-hidden") === "true") {
            picker.show();
          } else {
            picker.hide();
          }
        }
      } else if (which === VK_ESCAPE || which === VK_TAB || which === VK_ENTER) {
        picker.hide(); // ESC, TAB or ENTER keys hide calendar
      } else if (which === VK_BACKSPACE || which === VK_DELETE) {
        this.value("").fire("change"); // BACKSPACE, DELETE clear value
      } else if (which === VK_CONTROL) {
        // CONTROL toggles calendar mode
        toggleState();
      } else {
        var valueParts = this.value().split("-").map(parseFloat);
        var delta,
            currentDate = new Date(valueParts[0], valueParts[1] - 1, valueParts[2]);
        if (isNaN(currentDate.getTime())) currentDate = new Date();

        if (which === 74 || which === 40) {
          delta = 7;
        } else if (which === 75 || which === 38) {
          delta = -7;
        } else if (which === 76 || which === 39) {
          delta = 1;
        } else if (which === 72 || which === 37) {
          delta = -1;
        }

        if (delta) {
          var expanded = picker.get("aria-expanded") === "true";

          if (expanded && (which === 40 || which === 38)) {
            currentDate.setMonth(currentDate.getMonth() + (delta > 0 ? 4 : -4));
          } else if (expanded && (which === 37 || which === 39)) {
            currentDate.setMonth(currentDate.getMonth() + (delta > 0 ? 1 : -1));
          } else {
            currentDate.setDate(currentDate.getDate() + delta);
          }

          this.value(formatDateValue(currentDate)).fire("change");
        }
      } // prevent default action except if it was TAB so
      // do not allow to change the value manually


      return which === VK_TAB;
    },
    _blurPicker: function _blurPicker(picker) {
      picker.hide();
    },
    _focusPicker: function _focusPicker(picker, toggleState) {
      if (this.get("readonly")) return false;
      var offset = this.offset();
      var pickerOffset = picker.offset();
      var marginTop = offset.height; // #3: move calendar to the top when passing cross browser window bounds

      if (HTML.clientHeight < offset.bottom + pickerOffset.height) {
        marginTop = -pickerOffset.height;
      } // always reset picker mode to the default


      toggleState(false); // always recalculate picker top position

      picker.css("margin-top", marginTop).show();
    }
  });
  DOM.extend("dateinput-picker", {
    constructor: function constructor() {
      var object = DOM.create("<object type='text/html' width='100%' height='100%'>"); // non-IE: must be BEFORE the element added to the document

      if (!IE) {
        object.set("data", "about:blank");
      } // add object element to the document


      this.append(object); // IE: must be AFTER the element added to the document

      if (IE) {
        object.set("data", "about:blank");
      }
    }
  });
})(window.DOM, 32, 9, 13, 27, 8, 46, 17);
DOM.importStyles("@media screen", "dateinput-picker{display:inline-block;vertical-align:bottom}dateinput-picker>object{width:21rem;max-height:calc(2.5rem*8);box-shadow:0 0 15px gray;background:white;position:absolute;opacity:1;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0);-webkit-transform-origin:0 0;transform-origin:0 0;transition:.1s ease-out}dateinput-picker[aria-hidden=true]>object{opacity:0;-webkit-transform:skew(-25deg) scaleX(.75);transform:skew(-25deg) scaleX(.75);visibility:hidden;height:0}dateinput-picker[aria-expanded=true]>object{max-height:calc(2.5rem + 2.5rem*1.5*3)}dateinput-picker+input{color:transparent!important;caret-color:transparent!important}dateinput-picker+input::selection{background:transparent}dateinput-picker+input::-moz-selection{background:transparent}");
