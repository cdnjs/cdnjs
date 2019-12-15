/**
 * better-dateinput-polyfill: input[type=date] polyfill for better-dom
 * @version 3.0.0-rc.2 Thu, 14 Jun 2018 09:33:29 GMT
 * @link https://github.com/chemerisuk/better-dateinput-polyfill
 * @copyright 2018 Maksim Chemerisuk
 * @license MIT
 */
(function (DOM, VK_SPACE, VK_TAB, VK_ENTER, VK_ESCAPE, VK_BACKSPACE, VK_DELETE, VK_CONTROL) {
  "use strict";
  /* globals html:false */

  var HTML = DOM.get("documentElement"),
      ampm = function ampm(pos, neg) {
    return HTML.lang === "en-US" ? pos : neg;
  },
      formatISODate = function formatISODate(value) {
    return value.toISOString().split("T")[0];
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

    try {
      return date.toLocaleDateString(HTML.lang, {
        weekday: "short"
      });
    } catch (err) {
      return date.toUTCString().split(",")[0].slice(0, 2).toLowerCase();
    }
  }

  function localeMonth(index) {
    var date = new Date(Date.UTC(2010, index));

    try {
      return date.toLocaleDateString(HTML.lang, {
        month: "short"
      });
    } catch (err) {
      return date.toUTCString().split(" ")[2];
    }
  }

  function localeMonthYear(month, year) {
    var date = new Date(year, month);

    try {
      return date.toLocaleDateString(HTML.lang, {
        month: "long",
        year: "numeric"
      });
    } catch (err) {
      return date.toUTCString().split(" ").slice(2, 4).join(" ");
    }
  }

  var SVG_TEMPLATE = DOM.create('<svg xmlns="http://www.w3.org/2000/svg"><text dominant-baseline="central" y="50%"></text></svg>');
  var PICKER_TEMPLATE = DOM.create('<div tabindex="-1" class="btr-dateinput-picker"><object data="about:blank" type="text/html" width="100%" height="100%"></object></div>');
  var PICKER_BODY_HTML = "<style>body{font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;line-height:2.5rem;text-align:center;cursor:default;user-select:none;margin:0;overflow:hidden;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}a{width:3rem;height:2.5rem;position:absolute;text-decoration:none;color:inherit}b{display:block;cursor:pointer}table{width:100%;table-layout:fixed;border-spacing:0;border-collapse:collapse;text-align:center;line-height:2.5rem}td,th{padding:0}thead{background:#d3d3d3;font-size:smaller;font-weight:700}[aria-disabled=true],[aria-selected=false]{color:graytext}[aria-selected=true]{box-shadow:inset 0 0 0 1px graytext}[aria-disabled=true],[aria-selected=true],a:hover,td:hover{background-color:#f5f5f5}table+table{line-height:3.75rem;background:#fff;position:absolute;top:2.5em;left:0;opacity:1;transition:.1s ease-out}table+table[aria-hidden=true]{visibility:hidden;opacity:0}</style><a style=\"left:0\">&#x25C4;</a> <a style=\"right:0\">&#x25BA;</a> <b></b><table><thead>" + repeat(7, function (_, i) {
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
      var svg = SVG_TEMPLATE.clone(true);
      var offset = ["padding-left", "border-left-width", "text-indent"].map(function (p) {
        return parseFloat(_this.css(p));
      }).reduce(function (a, b) {
        return a + b;
      });
      svg.find("text").css("fill", this.css("color")).css("font", this.css("font")) // property x is a read-only SVGAnimatedLengthList object
      // therefore use attribute instead
      [0].setAttribute("x", offset);
      var picker = PICKER_TEMPLATE.clone(true);
      var object = picker.get("firstChild");
      object.onload = this._initPicker.bind(this, svg, object, picker);
      picker.css("z-index", 1 + (this.css("z-index") | 0));
      this.before(picker.hide());
    },
    _isNative: function _isNative() {
      var polyfillType = this.get("data-polyfill"),
          deviceType = "orientation" in window ? "mobile" : "desktop";
      if (polyfillType === "none") return true;

      if (!polyfillType || polyfillType !== deviceType && polyfillType !== "all") {
        // use a stronger type support detection that handles old WebKit browsers:
        // http://www.quirksmode.org/blog/archives/2015/03/better_modern_i.html
        if (this[0].type === "date") return true; // persist current value to restore it later

        this.set("defaultValue", this.value()); // if browser allows invalid value then it doesn't support the feature

        return this.value("_").value() !== "_";
      } else {
        // remove native control
        this.set("type", "text"); // force applying the polyfill

        return false;
      }
    },
    _initPicker: function _initPicker(svg, object, picker) {
      var _this2 = this;

      var pickerRoot = DOM.constructor(object.contentDocument);
      var pickerBody = pickerRoot.find("body");
      pickerBody.set(PICKER_BODY_HTML);
      var calendarCaption = pickerBody.find("b");
      var calenderDays = pickerBody.find("table");
      var calendarMonths = pickerBody.find("table+table");

      var invalidatePicker = this._invalidatePicker.bind(this, calendarMonths, calenderDays);

      var resetValue = this._syncValue.bind(this, svg, picker, invalidatePicker, "defaultValue");

      var updateValue = this._syncValue.bind(this, svg, picker, invalidatePicker, "value"); // patch value property on the original input


      var valueDescriptor = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value");
      Object.defineProperty(this[0], "value", {
        configurable: false,
        enumerable: true,
        get: valueDescriptor.get,
        set: function set(value) {
          if (typeof value === "string") {
            var dateValue = new Date(value);
            var range = readDateRange(_this2);

            if (dateValue < range[0]) {
              value = formatISODate(range[0]);
            } else if (dateValue > range[1]) {
              value = formatISODate(range[1]);
            } else if (isNaN(dateValue.getTime())) {
              value = "";
            }

            valueDescriptor.set.call(_this2[0], value);
            updateValue();
          }
        }
      }); // define expanded property for the picker element

      Object.defineProperty(picker[0], "expanded", {
        configurable: false,
        enumerable: true,
        get: function get() {
          return picker.get("aria-expanded") === "true";
        },
        set: function set(expanded) {
          if (typeof expanded === "boolean") {
            picker.set("aria-expanded", expanded);

            if (expanded) {
              calendarMonths.show();
            } else {
              calendarMonths.hide();
            }

            invalidatePicker(expanded);
          }
        }
      }); // sync picker visibility on focus/blur

      this.on("focus", this._focusPicker.bind(this, picker));
      this.on("blur", this._blurPicker.bind(this, picker));
      this.on("change", updateValue);
      this.on("keydown", ["which"], this._keydownPicker.bind(this, picker)); // form events do not trigger any state change

      this.closest("form").on("reset", resetValue); // picker invalidate handlers

      calenderDays.on("picker:invalidate", ["detail"], this._invalidateDays.bind(this, calenderDays));
      calendarMonths.on("picker:invalidate", ["detail"], this._invalidateMonths.bind(this, calendarMonths));
      pickerBody.on("picker:invalidate", ["detail"], this._invalidateCaption.bind(this, calendarCaption, picker));
      var clickEventName = "orientation" in window ? "touchend" : "mousedown"; // picker click handlers

      pickerBody.on(clickEventName, "a", ["target"], this._clickPickerButton.bind(this, picker));
      pickerBody.on(clickEventName, "td", ["target"], this._clickPickerDay.bind(this, picker));
      calendarCaption.on(clickEventName, this._clickPickerCaption.bind(this, picker)); // prevent input from loosing the focus outline

      pickerBody.on(clickEventName, function () {
        return false;
      });
      this.on(clickEventName, this._focusPicker.bind(this, picker));
      resetValue(); // present initial value
      // display calendar for autofocused elements

      if (DOM.get("activeElement") === this[0]) {
        picker.show();
      }
    },
    _invalidatePicker: function _invalidatePicker(calendarMonths, calenderDays, expanded, dateValue) {
      if (!dateValue) {
        dateValue = new Date(this.value());
      }

      if (isNaN(dateValue.getTime())) {
        dateValue = new Date();
      }

      var target = expanded ? calendarMonths : calenderDays; // refresh current picker

      target.fire("picker:invalidate", dateValue);
    },
    _invalidateDays: function _invalidateDays(calenderDays, dateValue) {
      var month = dateValue.getUTCMonth();
      var date = dateValue.getUTCDate();
      var year = dateValue.getUTCFullYear();
      var range = readDateRange(this);
      var iterDate = new Date(Date.UTC(year, month, 0)); // move to beginning of the first week in current month

      iterDate.setUTCDate(iterDate.getUTCDate() - iterDate.getUTCDay() - ampm(1, 0)); // update days picker

      calenderDays.findAll("td").forEach(function (day) {
        iterDate.setUTCDate(iterDate.getUTCDate() + 1);
        var mDiff = month - iterDate.getUTCMonth(),
            selectedValue = null,
            disabledValue = null;
        if (year !== iterDate.getUTCFullYear()) mDiff *= -1;

        if (iterDate < range[0] || iterDate > range[1]) {
          disabledValue = "true";
        } else if (mDiff > 0 || mDiff < 0) {
          selectedValue = "false";
        } else if (date === iterDate.getUTCDate()) {
          selectedValue = "true";
        }

        day._ts = iterDate.getTime();
        day.set("aria-selected", selectedValue);
        day.set("aria-disabled", disabledValue);
        day.value(iterDate.getUTCDate());
      });
    },
    _invalidateMonths: function _invalidateMonths(calendarMonths, dateValue) {
      var month = dateValue.getUTCMonth();
      var year = dateValue.getUTCFullYear();
      var range = readDateRange(this);
      var iterDate = new Date(Date.UTC(year, month, 1));
      calendarMonths.findAll("td").forEach(function (day, index) {
        iterDate.setUTCMonth(index);
        var mDiff = month - iterDate.getUTCMonth(),
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
      var year = dateValue.getUTCFullYear(); // update calendar caption

      if (picker.get("expanded")) {
        calendarCaption.value(year);
      } else {
        var month = dateValue.getUTCMonth();
        calendarCaption.value(localeMonthYear(month, year));
      }
    },
    _syncValue: function _syncValue(svg, picker, invalidatePicker, propName) {
      var dateValue = new Date(this.get(propName));
      var formattedValue = "";

      if (!isNaN(dateValue.getTime())) {
        try {
          formattedValue = dateValue.toLocaleDateString(HTML.lang, JSON.parse(this.get("data-format")));
        } catch (err) {
          formattedValue = dateValue.toLocaleDateString(HTML.lang);
        }
      } // modify internal element state


      svg.find("text").value(formattedValue); // update displayed text

      this.css("background-image", "url('data:image/svg+xml;utf8," + svg.get("outerHTML") + "')"); // update picker state

      invalidatePicker(picker.get("expanded"), dateValue);
    },
    _clickPickerButton: function _clickPickerButton(picker, target) {
      var targetDate = new Date(this.value());
      if (isNaN(targetDate.getTime())) targetDate = new Date();
      var sign = target.next("a")[0] ? -1 : 1;

      if (picker.get("expanded")) {
        targetDate.setUTCFullYear(targetDate.getUTCFullYear() + sign);
      } else {
        targetDate.setUTCMonth(targetDate.getUTCMonth() + sign);
      }

      this.value(formatISODate(targetDate)).fire("change");
    },
    _clickPickerDay: function _clickPickerDay(picker, target) {
      var targetDate;

      if (picker.get("expanded")) {
        if (isNaN(target._ts)) {
          targetDate = new Date();
        } else {
          targetDate = new Date(target._ts);
        } // switch to date calendar mode


        picker.set("expanded", false);
      } else {
        if (!isNaN(target._ts)) {
          targetDate = new Date(target._ts);
          picker.hide();
        }
      }

      if (targetDate != null) {
        this.value(formatISODate(targetDate)).fire("change");
      }
    },
    _clickPickerCaption: function _clickPickerCaption(picker) {
      picker.set("expanded", !picker.get("expanded"));
    },
    _keydownPicker: function _keydownPicker(picker, which) {
      if (which === VK_ENTER && picker.get("aria-hidden") === "true") {
        // ENTER key should submit form if calendar is hidden
        return true;
      }

      if (which === VK_SPACE) {
        // SPACE key toggles calendar visibility
        if (!this.get("readonly")) {
          picker.set("expanded", false);

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
        picker.set("expanded", !picker.get("expanded"));
      } else {
        var delta,
            currentDate = new Date(this.value());
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
          var expanded = picker.get("expanded");

          if (expanded && (which === 40 || which === 38)) {
            currentDate.setUTCMonth(currentDate.getUTCMonth() + (delta > 0 ? 4 : -4));
          } else if (expanded && (which === 37 || which === 39)) {
            currentDate.setUTCMonth(currentDate.getUTCMonth() + (delta > 0 ? 1 : -1));
          } else {
            currentDate.setUTCDate(currentDate.getUTCDate() + delta);
          }

          this.value(formatISODate(currentDate)).fire("change");
        }
      } // prevent default action except if it was TAB so
      // do not allow to change the value manually


      return which === VK_TAB;
    },
    _blurPicker: function _blurPicker(picker) {
      picker.hide();
    },
    _focusPicker: function _focusPicker(picker) {
      if (this.get("readonly")) return false;
      var offset = this.offset();
      var pickerOffset = picker.offset();
      var marginTop = offset.height; // #3: move calendar to the top when passing cross browser window bounds

      if (HTML.clientHeight < offset.bottom + pickerOffset.height) {
        marginTop = -pickerOffset.height;
      }

      picker // always reset picker mode to the default
      .set("expanded", false) // always recalculate picker top position
      .css("margin-top", marginTop) // show picker
      .show();
    }
  });
})(window.DOM, 32, 9, 13, 27, 8, 46, 17);
DOM.importStyles("@media screen", ".btr-dateinput-picker{display:inline-block;vertical-align:bottom}.btr-dateinput-picker>object{width:21rem;max-height:calc(2.5rem*8);box-shadow:0 0 15px gray;background:white;position:absolute;opacity:1;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0);-webkit-transform-origin:0 0;transform-origin:0 0;transition:.1s ease-out}.btr-dateinput-picker[aria-hidden=true]>object{opacity:0;-webkit-transform:skew(-25deg) scaleX(.75);transform:skew(-25deg) scaleX(.75);visibility:hidden;height:0}.btr-dateinput-picker[aria-expanded=true]>object{max-height:calc(2.5rem + 2.5rem*1.5*3)}.btr-dateinput-picker+input{color:transparent!important}.btr-dateinput-picker+input::selection{background:transparent}.btr-dateinput-picker+input::-moz-selection{background:transparent}");
