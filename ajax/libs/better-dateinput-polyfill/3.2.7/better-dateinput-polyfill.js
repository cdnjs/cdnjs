/**
 * better-dateinput-polyfill: input[type=date] polyfill for better-dom
 * @version 3.2.7 Fri, 31 May 2019 21:09:24 GMT
 * @link https://github.com/chemerisuk/better-dateinput-polyfill
 * @copyright 2019 Maksim Chemerisuk
 * @license MIT
 */
(function () {
  "use strict";

  /* globals html:false */
  var MAIN_CSS = "dateinput-picker{display:inline-block;vertical-align:bottom}dateinput-picker>object{position:absolute;z-index:1000;width:21rem;height:20rem;max-height:20rem;box-shadow:0 8px 24px #888;background:#fff;opacity:1;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0);-webkit-transform-origin:0 0;transform-origin:0 0;transition:.1s ease-out}dateinput-picker[aria-hidden=true]>object{opacity:0;-webkit-transform:skew(-25deg) scaleX(.75);transform:skew(-25deg) scaleX(.75);visibility:hidden;height:0}dateinput-picker[aria-expanded=true]>object{height:13.75rem;max-height:13.75rem}dateinput-picker+input{color:transparent!important;caret-color:transparent!important}dateinput-picker+input::selection{background:none}dateinput-picker+input::-moz-selection{background:none}";
  var HTML = DOM.find("html");
  var DEFAULT_LANGUAGE = HTML.get("lang") || void 0;
  var DEVICE_TYPE = "orientation" in window ? "mobile" : "desktop";

  var TYPE_SUPPORTED = function () {
    // use a stronger type support detection that handles old WebKit browsers:
    // http://www.quirksmode.org/blog/archives/2015/03/better_modern_i.html
    return DOM.create("<input type='date'>").value("_").value() !== "_";
  }();

  function formatLocalDate(date) {
    return [date.getFullYear(), ("0" + (date.getMonth() + 1)).slice(-2), ("0" + date.getDate()).slice(-2)].join("-");
  }

  function parseLocalDate(value) {
    // datetime value parsed with local timezone
    var dateValue = new Date((value || "?") + "T00:00");
    return isNaN(dateValue.getTime()) ? null : dateValue;
  }

  var globalFormatters = DOM.findAll("meta[name^='data-format:']").reduce(function (globalFormatters, meta) {
    var key = meta.get("name").split(":")[1].trim();
    var formatOptions = JSON.parse(meta.get("content"));

    if (key) {
      try {
        globalFormatters[key] = new window.Intl.DateTimeFormat(DEFAULT_LANGUAGE, formatOptions);
      } catch (err) {}
    }

    return globalFormatters;
  }, {});
  DOM.extend("input[type=date]", {
    constructor: function constructor() {
      if (this._isPolyfillEnabled()) return false;
      var svgTextOptions = this.css(["color", "font-size", "font-family", "font-style", "line-height", "padding-left", "border-left-width", "text-indent"]);
      svgTextOptions.dx = ["padding-left", "border-left-width", "text-indent"].map(function (p) {
        return parseFloat(svgTextOptions[p]);
      }).reduce(function (a, b) {
        return a + b;
      });
      svgTextOptions.css = ["font-family", "font-style", "line-height", "font-size"].map(function (p) {
        return p + ":" + svgTextOptions[p];
      }).join(";").replace(/"/g, ""); // FIXME: fix issue in html helper and drop replace below

      this._backgroundTemplate = ("<svg xmlns=\"http://www.w3.org/2000/svg\"><text x=\"" + svgTextOptions.dx + "\" y=\"50%\" dy=\".35em\" fill=\"" + svgTextOptions.color + "\"></text></svg>").replace("></", " style=\"" + svgTextOptions.css + "\"></");
      var picker = DOM.create("<dateinput-picker tabindex='-1'>"); // store reference to the input

      picker._parentInput = this; // add <dateinput-picker> to the document

      this.before(picker.hide()); // store reference to the picker

      this._picker = picker;

      var resetDisplayedText = this._syncDisplayedText.bind(this, "defaultValue");

      var updateDisplayedText = this._syncDisplayedText.bind(this, "value"); // patch value property for the input element


      var valueDescriptor = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value");
      Object.defineProperty(this[0], "value", {
        configurable: false,
        enumerable: true,
        get: valueDescriptor.get,
        set: this._setValue.bind(this, valueDescriptor.set, updateDisplayedText)
      });
      Object.defineProperty(this[0], "valueAsDate", {
        configurable: false,
        enumerable: true,
        get: this._getValueAsDate.bind(this),
        set: this._setValueAsDate.bind(this)
      }); // sync picker visibility on focus/blur

      this.on("change", updateDisplayedText);
      this.on("focus", this._focusInput.bind(this));
      this.on("blur", this._blurInput.bind(this));
      this.on("keydown", ["which"], this._keydownInput.bind(this));
      this.on("click", this._focusInput.bind(this)); // form events do not trigger any state change

      this.closest("form").on("reset", resetDisplayedText);
      resetDisplayedText(); // present initial value
    },
    _isPolyfillEnabled: function _isPolyfillEnabled() {
      var polyfillType = this.get("data-polyfill");
      if (polyfillType === "none") return true;

      if (polyfillType && (polyfillType === DEVICE_TYPE || polyfillType === "all")) {
        // remove native browser implementation
        this.set("type", "text"); // force applying the polyfill

        return false;
      }

      return TYPE_SUPPORTED;
    },
    _setValue: function _setValue(setter, updateDisplayedText, value) {
      var dateValue = parseLocalDate(value);

      if (!dateValue) {
        value = "";
      } else {
        var min = new Date((this.get("min") || "?") + "T00:00");
        var max = new Date((this.get("max") || "?") + "T00:00");

        if (dateValue < min) {
          value = formatLocalDate(min);
        } else if (dateValue > max) {
          value = formatLocalDate(max);
        }
      }

      setter.call(this[0], value);
      updateDisplayedText();
    },
    _getValueAsDate: function _getValueAsDate() {
      return parseLocalDate(this.value());
    },
    _setValueAsDate: function _setValueAsDate(dateValue) {
      if (dateValue instanceof Date && !isNaN(dateValue.getTime())) {
        this.value(formatLocalDate(dateValue));
      }
    },
    _syncDisplayedText: function _syncDisplayedText(propName) {
      var displayText = this.get(propName);
      var dateValue = parseLocalDate(displayText);

      if (dateValue) {
        var formatOptions = this.get("data-format");
        var formatter = globalFormatters[formatOptions];

        try {
          // set hours to '12' to fix Safari bug in Date#toLocaleString
          var presentedDate = new Date(dateValue.getFullYear(), dateValue.getMonth(), dateValue.getDate(), 12);

          if (formatter) {
            displayText = formatter.format(presentedDate);
          } else {
            displayText = presentedDate.toLocaleDateString(DEFAULT_LANGUAGE, formatOptions ? JSON.parse(formatOptions) : {});
          }
        } catch (err) {}
      }

      this.css("background-image", "url('data:image/svg+xml," + encodeURIComponent(this._backgroundTemplate.replace("></", ">" + displayText + "</")) + "')");
    },
    _keydownInput: function _keydownInput(which) {
      if (which === 13 && this._picker.get("aria-hidden") === "true") {
        // ENTER key should submit form if calendar is hidden
        return true;
      }

      if (which === 32) {
        // SPACE key toggles calendar visibility
        if (!this.get("readonly")) {
          this._picker.toggleState(false);

          this._picker.invalidateState();

          if (this._picker.get("aria-hidden") === "true") {
            this._picker.show();
          } else {
            this._picker.hide();
          }
        }
      } else if (which === 27 || which === 9 || which === 13) {
        this._picker.hide(); // ESC, TAB or ENTER keys hide calendar

      } else if (which === 8 || which === 46) {
        this.empty().fire("change"); // BACKSPACE, DELETE clear value
      } else if (which === 17) {
        // CONTROL toggles calendar mode
        this._picker.toggleState();

        this._picker.invalidateState();
      } else {
        var delta;

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
          var currentDate = this.get("valueAsDate") || new Date();
          var expanded = this._picker.get("aria-expanded") === "true";

          if (expanded && (which === 40 || which === 38)) {
            currentDate.setMonth(currentDate.getMonth() + (delta > 0 ? 4 : -4));
          } else if (expanded && (which === 37 || which === 39)) {
            currentDate.setMonth(currentDate.getMonth() + (delta > 0 ? 1 : -1));
          } else {
            currentDate.setDate(currentDate.getDate() + delta);
          }

          this.value(formatLocalDate(currentDate)).fire("change");
        }
      } // prevent default action except if it was TAB so
      // do not allow to change the value manually


      return which === 9;
    },
    _blurInput: function _blurInput() {
      this._picker.hide();
    },
    _focusInput: function _focusInput() {
      if (this.get("readonly")) return false;
      var offset = this.offset();

      var pickerOffset = this._picker.offset();

      var marginTop = offset.height; // #3: move calendar to the top when passing cross browser window bounds

      if (HTML.get("clientHeight") < offset.bottom + pickerOffset.height) {
        marginTop = -pickerOffset.height;
      } // always reset picker mode to the default


      this._picker.toggleState(false);

      this._picker.invalidateState(); // always recalculate picker top position


      this._picker.css("margin-top", marginTop).show();
    }
  });
  DOM.importStyles(MAIN_CSS);
})();
(function () {
  "use strict";

  /* globals html:false */
  var PICKER_CSS = "body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif;line-height:2.5rem;text-align:center;cursor:default;-webkit-user-select:none;-ms-user-select:none;user-select:none;margin:0;overflow:hidden}a{position:absolute;width:3rem;height:2.5rem}a[rel=prev]{left:0}a[rel=next]{right:0}b{display:block;cursor:pointer}table{width:100%;table-layout:fixed;border-spacing:0;border-collapse:collapse;text-align:center;line-height:2.5rem}table+table{line-height:3.75rem;background:#fff;position:absolute;top:2.5rem;left:0;opacity:1;transition:.1s ease-out}table+table[aria-hidden=true]{visibility:hidden!important;opacity:0}td,th{padding:0}thead{background:#ddd;font-size:smaller;font-weight:700}[aria-selected=false],[aria-disabled=true]{color:#888}[aria-selected=true]{box-shadow:inset 0 0 0 1px #888}a:hover,td:hover,[aria-disabled=true],[aria-selected=true]{background-color:#f5f5f5}";
  var HTML = DOM.find("html");
  var DEFAULT_LANGUAGE = HTML.get("lang") || void 0;
  var CLICK_EVENT_TYPE = "orientation" in window ? "touchend" : "mousedown";

  var INTL_SUPPORTED = function () {
    try {
      new Date().toLocaleString("_");
    } catch (err) {
      return err instanceof RangeError;
    }

    return false;
  }();

  function repeat(times, fn) {
    if (typeof fn === "string") {
      return Array(times + 1).join(fn);
    } else {
      return Array.apply(null, Array(times)).map(fn).join("");
    }
  }

  function ampm(pos, neg) {
    return DEFAULT_LANGUAGE === "en-US" ? pos : neg;
  }

  function localeWeekday(index) {
    var date = new Date();
    date.setDate(date.getDate() - date.getDay() + index + ampm(0, 1));
    /* istanbul ignore else */

    if (INTL_SUPPORTED) {
      try {
        return date.toLocaleDateString(DEFAULT_LANGUAGE, {
          weekday: "short"
        });
      } catch (err) {}
    }

    return date.toUTCString().split(",")[0].slice(0, 2);
  }

  function localeMonth(index) {
    var date = new Date(null, index);
    /* istanbul ignore else */

    if (INTL_SUPPORTED) {
      try {
        return date.toLocaleDateString(DEFAULT_LANGUAGE, {
          month: "short"
        });
      } catch (err) {}
    }

    return date.toUTCString().split(" ")[2];
  }

  function localeMonthYear(dateValue) {
    // set hours to '12' to fix Safari bug in Date#toLocaleString
    var date = new Date(dateValue.getFullYear(), dateValue.getMonth(), 12);
    /* istanbul ignore else */

    if (INTL_SUPPORTED) {
      try {
        return date.toLocaleDateString(DEFAULT_LANGUAGE, {
          month: "long",
          year: "numeric"
        });
      } catch (err) {}
    }

    return date.toUTCString().split(" ").slice(2, 4).join(" ");
  }

  var PICKER_BODY_HTML = "<a rel=\"prev\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"100%\" viewBox=\"0 0 16 16\"><path d=\"M11.5 14.06L1 8L11.5 1.94z\"/></svg></a><a rel=\"next\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"100%\" viewBox=\"0 0 16 16\"><path d=\"M15 8L4.5 14.06L4.5 1.94z\"/></svg></a><b></b><table><thead>" + repeat(7, function (_, i) {
    return "<th>" + localeWeekday(i);
  }) + "</thead><tbody>" + repeat(7, "<tr>" + repeat(7, "<td>") + "</tr>") + "</tbody></table><table><tbody>" + repeat(3, function (_, i) {
    return "<tr>" + repeat(4, function (_, j) {
      return "<td>" + localeMonth(i * 4 + j);
    });
  }) + "</tbody></table>";
  DOM.extend("dateinput-picker", {
    constructor: function constructor() {
      var IE = "ScriptEngineMajorVersion" in window;
      var object = DOM.create("<object type='text/html' width='100%' height='100%'>"); // non-IE: must be BEFORE the element added to the document

      if (!IE) {
        object.set("data", "about:blank");
      } // load content when <object> is ready


      this.on("load", {
        capture: true,
        once: true
      }, ["target"], this._loadContent.bind(this)); // add object element to the document

      this.append(object); // IE: must be AFTER the element added to the document

      if (IE) {
        object.set("data", "about:blank");
      }
    },
    _loadContent: function _loadContent(object) {
      var pickerRoot = DOM.constructor(object.get("contentDocument"));
      var pickerBody = pickerRoot.find("body"); // initialize picker content

      pickerRoot.importStyles(PICKER_CSS);
      pickerBody.set(PICKER_BODY_HTML); // internal references

      this._calendarDays = pickerBody.find("table");
      this._calendarMonths = pickerBody.find("table+table");
      this._calendarCaption = pickerBody.find("b"); // picker invalidate handlers

      this._calendarDays.on("picker:invalidate", ["detail"], this._invalidateDays.bind(this));

      this._calendarMonths.on("picker:invalidate", ["detail"], this._invalidateMonths.bind(this));

      pickerBody.on("picker:invalidate", ["detail"], this._invalidateCaption.bind(this)); // picker click handlers

      pickerBody.on(CLICK_EVENT_TYPE, "a", ["currentTarget"], this._clickPickerButton.bind(this));
      pickerBody.on(CLICK_EVENT_TYPE, "td", ["target"], this._clickPickerDay.bind(this));

      this._calendarCaption.on(CLICK_EVENT_TYPE, this._clickCaption.bind(this)); // prevent input from loosing the focus outline


      pickerBody.on(CLICK_EVENT_TYPE, function () {
        return false;
      });

      this._parentInput.on("change", this.invalidateState.bind(this)); // display calendar for autofocused elements


      if (DOM.get("activeElement") === this._parentInput[0]) {
        this.show();
      }
    },
    _invalidateDays: function _invalidateDays(dateValue) {
      var month = dateValue.getMonth();
      var date = dateValue.getDate();
      var year = dateValue.getFullYear();
      var min = new Date((this._parentInput.get("min") || "?") + "T00:00");
      var max = new Date((this._parentInput.get("max") || "?") + "T00:00");
      var iterDate = new Date(year, month, 1); // move to beginning of the first week in current month

      iterDate.setDate(1 - iterDate.getDay() - ampm(1, iterDate.getDay() === 0 ? 7 : 0)); // update days picker

      this._calendarDays.findAll("td").forEach(function (day) {
        iterDate.setDate(iterDate.getDate() + 1);
        var mDiff = month - iterDate.getMonth(),
            selectedValue = null,
            disabledValue = null;
        if (year !== iterDate.getFullYear()) mDiff *= -1;

        if (iterDate < min || iterDate > max) {
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
    _invalidateMonths: function _invalidateMonths(dateValue) {
      var month = dateValue.getMonth();
      var year = dateValue.getFullYear();
      var min = new Date((this._parentInput.get("min") || "?") + "T00:00");
      var max = new Date((this._parentInput.get("max") || "?") + "T00:00");
      var iterDate = new Date(year, month, 1);

      this._calendarMonths.findAll("td").forEach(function (day, index) {
        iterDate.setMonth(index);
        var mDiff = month - iterDate.getMonth(),
            selectedValue = null;

        if (iterDate < min || iterDate > max) {
          selectedValue = "false";
        } else if (!mDiff) {
          selectedValue = "true";
        }

        day._ts = iterDate.getTime();
        day.set("aria-selected", selectedValue);
      });
    },
    _invalidateCaption: function _invalidateCaption(dateValue) {
      var captionText = dateValue.getFullYear();

      if (this.get("aria-expanded") !== "true") {
        captionText = localeMonthYear(dateValue);
      } // update calendar caption


      this._calendarCaption.value(captionText);
    },
    _clickCaption: function _clickCaption() {
      this.toggleState();
      this.invalidateState();
    },
    _clickPickerButton: function _clickPickerButton(btn) {
      var sign = btn.get("rel") === "next" ? 1 : -1;
      var targetDate = this._parentInput.get("valueAsDate") || new Date();

      if (this.get("aria-expanded") === "true") {
        targetDate.setFullYear(targetDate.getFullYear() + sign);
      } else {
        targetDate.setMonth(targetDate.getMonth() + sign);
      }

      this._parentInput.set("valueAsDate", targetDate).fire("change");
    },
    _clickPickerDay: function _clickPickerDay(target) {
      var targetDate;

      if (this.get("aria-expanded") === "true") {
        if (isNaN(target._ts)) {
          targetDate = new Date();
        } else {
          targetDate = new Date(target._ts);
        } // switch to date calendar mode


        this.toggleState(false);
      } else {
        if (!isNaN(target._ts)) {
          targetDate = new Date(target._ts);
          this.hide();
        }
      }

      if (targetDate != null) {
        this._parentInput.set("valueAsDate", targetDate).fire("change");
      }
    },
    toggleState: function toggleState(expanded) {
      if (typeof expanded !== "boolean") {
        expanded = this.get("aria-expanded") !== "true";
      }

      this.set("aria-expanded", expanded);
    },
    invalidateState: function invalidateState() {
      var expanded = this.get("aria-expanded") === "true";
      var target = expanded ? this._calendarMonths : this._calendarDays;
      var dateValue = this._parentInput.get("valueAsDate") || new Date(); // refresh current picker

      target.fire("picker:invalidate", dateValue);

      if (expanded) {
        this._calendarMonths.show();
      } else {
        this._calendarMonths.hide();
      }
    }
  });
})();