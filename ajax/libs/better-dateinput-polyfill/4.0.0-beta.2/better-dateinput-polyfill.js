/**
 * better-dateinput-polyfill: input[type=date] polyfill
 * @version 4.0.0-beta.2 Sat, 17 Apr 2021 16:07:26 GMT
 * @link https://github.com/chemerisuk/better-dateinput-polyfill
 * @copyright 2021 Maksim Chemerisuk
 * @license MIT
*/
(function () {
    'use strict';

    var css_248z$1 = "@keyframes dateinput-polyfill{0%{opacity:.99};to{opacity:1};}input[type=date]{animation:dateinput-polyfill 1ms!important}dateinput-picker{background:#fff;box-shadow:0 8px 24px rgba(0,0,0,.2);height:360px;position:absolute;width:315px;z-index:2147483647}dateinput-picker[aria-hidden=true]{visibility:hidden}";

    var css_248z = "body{cursor:default;font-family:system-ui, -apple-system, Segoe UI, Roboto, Noto Sans, Ubuntu, Cantarell, Helvetica Neue,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif;margin:0}[aria-labelledby]{bottom:0;height:87.5vh;left:0;position:absolute;text-align:center;width:100%}[aria-labelledby][aria-hidden=true]{visibility:hidden}header{display:block;height:12.5vh;line-height:12.5vh;overflow:hidden;text-align:center}[role=button]{text-align:center;transition:transform 75ms ease-in;width:14.28571vw}[role=button][rel=prev]{float:left}[role=button][rel=prev]:active{transform:translateX(-2px)}[role=button][rel=next]{float:right}[role=button][rel=next]:active{transform:translateX(2px)}[role=button] svg{pointer-events:none;width:16px;height:100%}@media (hover:hover){[role=button]:hover{transform:scale(1.2)}}[aria-live=polite]{border:1px dotted transparent;color:#007bff;font-weight:700;margin:auto 0;overflow:hidden;text-align:center;text-overflow:ellipsis;white-space:nowrap}@media (hover:hover){[aria-live=polite]:hover{border-bottom-color:inherit}}table{border-spacing:0;table-layout:fixed}th{box-sizing:border-box;height:12.5vh;padding-bottom:8px;vertical-align:middle}td{border-radius:var(--border-radius);padding:0}td:not([aria-selected]){color:#ccc}td[aria-current=date]{font-weight:700}td[aria-disabled=true]{background-color:#ececec;border-radius:0;color:#ccc;cursor:not-allowed}#months,#years{box-sizing:border-box;float:left;height:100%;line-height:7.29167vh;list-style:none;margin:0;overflow-x:hidden;overflow-y:scroll;padding:0 4px;width:50%}@media (hover:hover){[data-date]:hover,[data-month]:hover,[data-year]:hover{background-color:#ececec}}[data-date][aria-selected=true],[data-month][aria-selected=true],[data-year][aria-selected=true]{background-color:#007bff;color:#fff}";

    var WINDOW = window;
    var DOCUMENT = document;
    var HTML = DOCUMENT.documentElement;
    var IE = ("ScriptEngineMajorVersion" in WINDOW);
    function $(element, selector) {
      return Array.prototype.slice.call(element.querySelectorAll(selector), 0);
    }
    function repeat(times, fn) {
      if (typeof fn === "string") {
        return Array(times + 1).join(fn);
      } else {
        return Array.apply(null, Array(times)).map(fn).join("");
      }
    }
    function svgIcon(path) {
      return "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"100%\" viewBox=\"0 0 16 16\"><path d=\"" + path + "\"/></svg>";
    }
    function injectStyles(cssText, head) {
      var style = DOCUMENT.createElement("style");
      style.type = "text/css";
      style.innerHTML = cssText;

      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    }

    var INTL_SUPPORTED = function () {
      try {
        new Date().toLocaleString("_");
      } catch (err) {
        return err instanceof RangeError;
      }

      return false;
    }();

    function parseLocaleDate(value) {
      var _split$map = (value || "?").split(/\D/).map(function (s) {
        return parseInt(s);
      }),
          year = _split$map[0],
          month = _split$map[1],
          date = _split$map[2]; // set hours to 12 because otherwise Safari doesn't return
      // correct result string for toLocaleString calls


      var dateValue = new Date(year, month - 1, date, 12, 0);
      return isNaN(dateValue.getTime()) ? null : dateValue;
    }
    function formatLocaleDate(date) {
      return [date.getFullYear(), ("0" + (date.getMonth() + 1)).slice(-2), ("0" + date.getDate()).slice(-2)].join("-");
    }
    function getFormatOptions(locale, formatString) {
      if (!INTL_SUPPORTED) return {};
      var dateTimeFormat;

      try {
        // We perform severals checks here:
        // 1) verify lang attribute is supported by browser
        // 2) verify format options are valid
        dateTimeFormat = new Intl.DateTimeFormat(locale, JSON.parse(formatString || "{}"));
      } catch (err) {
        console.warn("Fallback to default date format because of error:", err); // fallback to default date format options

        dateTimeFormat = new Intl.DateTimeFormat();
      }

      return dateTimeFormat.resolvedOptions();
    }
    function localeWeekday(value, options) {
      var date = new Date(1971, 1, value + (options.hour12 ? 0 : 1));
      /* istanbul ignore else */

      if (INTL_SUPPORTED) {
        return date.toLocaleString(options.locale, {
          weekday: "short"
        });
      } else {
        return date.toUTCString().split(",")[0].slice(0, 2);
      }
    }
    function localeMonth(value, options) {
      var date = new Date(25e8 * (value + 1));
      /* istanbul ignore else */

      if (INTL_SUPPORTED) {
        return date.toLocaleString(options.locale, {
          month: "short"
        });
      } else {
        return date.toUTCString().split(" ")[2];
      }
    }
    function localeDate(value, options) {
      if (INTL_SUPPORTED) {
        return value.toLocaleString(options.locale, options);
      } else {
        return value.toUTCString().split(" ").slice(0, 4).join(" ");
      }
    }
    function localeMonthYear(value, options) {
      if (INTL_SUPPORTED) {
        return value.toLocaleString(options.locale, {
          month: "long",
          year: "numeric"
        });
      } else {
        return value.toUTCString().split(" ").slice(2, 4).join(" ");
      }
    }

    var DatePickerImpl = /*#__PURE__*/function () {
      function DatePickerImpl(input, formatOptions) {
        this._input = input;
        this._formatOptions = formatOptions;

        this._initPicker();
      }

      var _proto = DatePickerImpl.prototype;

      _proto._initPicker = function _initPicker() {
        var _this = this;

        this._picker = DOCUMENT.createElement("dateinput-picker");

        this._picker.setAttribute("aria-hidden", true);

        this._input.parentNode.insertBefore(this._picker, this._input);

        var object = DOCUMENT.createElement("object");
        object.type = "text/html";
        object.width = "100%";
        object.height = "100%"; // non-IE: must be BEFORE the element added to the document

        if (!IE) {
          object.data = "about:blank";
        } // load content when <object> is ready


        object.onload = function (event) {
          _this._initContent(event.target.contentDocument); // this is a one time event handler


          delete object.onload;
        }; // add object element to the document


        this._picker.appendChild(object); // IE: must be AFTER the element added to the document


        if (IE) {
          object.data = "about:blank";
        }
      };

      _proto._initContent = function _initContent(pickerRoot) {
        var _this2 = this;

        var defaultYearDelta = 30;
        var now = new Date();

        var minDate = this._getLimitationDate("min");

        var maxDate = this._getLimitationDate("max");

        var startYear = minDate ? minDate.getFullYear() : now.getFullYear() - defaultYearDelta;
        var endYear = maxDate ? maxDate.getFullYear() : now.getFullYear() + defaultYearDelta; // append picker HTML to shadow dom

        pickerRoot.body.innerHTML = "<header><a role=\"button\" rel=\"prev\">" + svgIcon("M11.5 14.06L1 8L11.5 1.94z") + "</a> <time id=\"caption\" aria-live=\"polite\"></time> <a role=\"button\" rel=\"next\">" + svgIcon("M15 8L4.5 14.06L4.5 1.94z") + "</a></header><table role=\"grid\" aria-labelledby=\"#caption\"><thead id=\"weekdays\">" + repeat(7, function (_, i) {
          return "<th>" + localeWeekday(i, _this2._formatOptions) + "</th>";
        }) + "</thead><tbody id=\"days\">" + repeat(6, "<tr>" + repeat(7, "<td>") + "</tr>") + "</tbody></table><div aria-hidden=\"true\" aria-labelledby=\"#caption\"><ol id=\"months\">" + repeat(12, function (_, i) {
          return "<li data-month=\"" + i + "\">" + localeMonth(i, _this2._formatOptions);
        }) + "</ol><ol id=\"years\">" + repeat(endYear - startYear + 1, function (_, i) {
          return "<li data-year=\"" + (startYear + i) + "\">" + (startYear + i);
        }) + "</ol></div>";
        injectStyles(css_248z, pickerRoot.head);
        this._caption = $(pickerRoot, "[aria-live=polite]")[0];
        this._pickers = $(pickerRoot, "[aria-labelledby]");
        pickerRoot.addEventListener("mousedown", this._onMouseDown.bind(this));
        pickerRoot.addEventListener("contextmenu", function (event) {
          return event.preventDefault();
        });
        pickerRoot.addEventListener("dblclick", function (event) {
          return event.preventDefault();
        });
        this.show();
      };

      _proto._getLimitationDate = function _getLimitationDate(name) {
        if (this._input) {
          return parseLocaleDate(this._input.getAttribute(name));
        } else {
          return null;
        }
      };

      _proto._onMouseDown = function _onMouseDown(event) {
        var target = event.target; // disable default behavior so input doesn't loose focus

        event.preventDefault(); // skip right/middle mouse button clicks

        if (event.button) return;

        if (target === this._caption) {
          this._togglePickerMode();
        } else if (target.getAttribute("role") === "button") {
          this._clickButton(target);
        } else if (target.hasAttribute("data-date")) {
          this._clickDate(target);
        } else if (target.hasAttribute("data-month") || target.hasAttribute("data-year")) {
          this._clickMonthYear(target);
        }
      };

      _proto._clickButton = function _clickButton(target) {
        var captionDate = this.getCaptionDate();
        var sign = target.getAttribute("rel") === "prev" ? -1 : 1;
        var advancedMode = this.isAdvancedMode();

        if (advancedMode) {
          captionDate.setFullYear(captionDate.getFullYear() + sign);
        } else {
          captionDate.setMonth(captionDate.getMonth() + sign);
        }

        if (this.isValidValue(captionDate)) {
          this.render(captionDate);

          if (advancedMode) {
            this._input.valueAsDate = captionDate;
          }
        }
      };

      _proto._clickDate = function _clickDate(target) {
        if (target.getAttribute("aria-disabled") !== "true") {
          this._input.value = target.getAttribute("data-date");
          this.hide();
        }
      };

      _proto._clickMonthYear = function _clickMonthYear(target) {
        var month = parseInt(target.getAttribute("data-month"));
        var year = parseInt(target.getAttribute("data-year"));

        if (month >= 0 || year >= 0) {
          var captionDate = this.getCaptionDate();

          if (!isNaN(month)) {
            captionDate.setMonth(month);
          }

          if (!isNaN(year)) {
            captionDate.setFullYear(year);
          }

          if (this.isValidValue(captionDate)) {
            this._renderAdvancedPicker(captionDate, false);

            this._input.valueAsDate = captionDate;
          }
        }
      };

      _proto._togglePickerMode = function _togglePickerMode() {
        var _this3 = this;

        this._pickers.forEach(function (element, index) {
          var currentDate = _this3._input.valueAsDate || new Date();
          var hidden = element.getAttribute("aria-hidden") === "true";

          if (index === 0) {
            if (hidden) {
              _this3._renderCalendarPicker(currentDate);
            }
          } else {
            if (hidden) {
              _this3._renderAdvancedPicker(currentDate);
            }
          }

          element.setAttribute("aria-hidden", !hidden);
        });
      };

      _proto._renderCalendarPicker = function _renderCalendarPicker(captionDate) {
        var now = new Date();
        var currentDate = this._input.valueAsDate;

        var minDate = this._getLimitationDate("min");

        var maxDate = this._getLimitationDate("max");

        var iterDate = new Date(captionDate.getFullYear(), captionDate.getMonth()); // move to beginning of the first week in current month

        iterDate.setDate((this._formatOptions.hour12 ? 0 : iterDate.getDay() === 0 ? -6 : 1) - iterDate.getDay());
        $(this._pickers[0], "td").forEach(function (cell) {
          iterDate.setDate(iterDate.getDate() + 1);
          var iterDateStr = formatLocaleDate(iterDate);

          if (iterDate.getMonth() === captionDate.getMonth()) {
            if (currentDate && iterDateStr === formatLocaleDate(currentDate)) {
              cell.setAttribute("aria-selected", true);
            } else {
              cell.setAttribute("aria-selected", false);
            }
          } else {
            cell.removeAttribute("aria-selected");
          }

          if (iterDateStr === formatLocaleDate(now)) {
            cell.setAttribute("aria-current", "date");
          } else {
            cell.removeAttribute("aria-current");
          }

          if (minDate && iterDate < minDate || maxDate && iterDate > maxDate) {
            cell.setAttribute("aria-disabled", true);
          } else {
            cell.removeAttribute("aria-disabled");
          }

          cell.textContent = iterDate.getDate();
          cell.setAttribute("data-date", iterDateStr);
        }); // update visible caption value

        this.setCaptionDate(captionDate);
      };

      _proto._renderAdvancedPicker = function _renderAdvancedPicker(captionDate, syncScroll) {
        if (syncScroll === void 0) {
          syncScroll = true;
        }

        $(this._pickers[1], "[aria-selected]").forEach(function (selectedElement) {
          selectedElement.removeAttribute("aria-selected");
        });

        if (captionDate) {
          var monthItem = $(this._pickers[1], "[data-month=\"" + captionDate.getMonth() + "\"]")[0];
          var yearItem = $(this._pickers[1], "[data-year=\"" + captionDate.getFullYear() + "\"]")[0];
          monthItem.setAttribute("aria-selected", true);
          yearItem.setAttribute("aria-selected", true);

          if (syncScroll) {
            monthItem.parentNode.scrollTop = monthItem.offsetTop;
            yearItem.parentNode.scrollTop = yearItem.offsetTop;
          } // update visible caption value


          this.setCaptionDate(captionDate);
        }
      };

      _proto.isValidValue = function isValidValue(dateValue) {
        var minDate = this._getLimitationDate("min");

        var maxDate = this._getLimitationDate("max");

        return !(minDate && dateValue < minDate || maxDate && dateValue > maxDate);
      };

      _proto.isAdvancedMode = function isAdvancedMode() {
        return this._pickers[0].getAttribute("aria-hidden") === "true";
      };

      _proto.getCaptionDate = function getCaptionDate() {
        return new Date(this._caption.getAttribute("datetime"));
      };

      _proto.setCaptionDate = function setCaptionDate(captionDate) {
        this._caption.textContent = localeMonthYear(captionDate, this._formatOptions);

        this._caption.setAttribute("datetime", captionDate.toISOString());
      };

      _proto.isHidden = function isHidden() {
        return this._picker.getAttribute("aria-hidden") === "true";
      };

      _proto.show = function show() {
        if (this.isHidden()) {
          var startElement = this._input;

          var pickerOffset = this._picker.getBoundingClientRect();

          var inputOffset = startElement.getBoundingClientRect(); // set picker position depending on current visible area

          var marginTop = inputOffset.height;

          if (HTML.clientHeight < inputOffset.bottom + pickerOffset.height) {
            marginTop = -pickerOffset.height;
          }

          this._picker.style.marginTop = marginTop + "px";

          this._renderCalendarPicker(this._input.valueAsDate || new Date()); // display picker


          this._picker.removeAttribute("aria-hidden");
        }
      };

      _proto.hide = function hide() {
        this._picker.setAttribute("aria-hidden", true);

        this.reset();
      };

      _proto.reset = function reset() {
        this._pickers.forEach(function (element, index) {
          element.setAttribute("aria-hidden", !!index);
        });
      };

      _proto.render = function render(captionDate) {
        if (this.isAdvancedMode()) {
          this._renderAdvancedPicker(captionDate);
        } else {
          this._renderCalendarPicker(captionDate);
        }
      };

      return DatePickerImpl;
    }();

    var formatMeta = $(DOCUMENT, "meta[name=dateinput-polyfill-format]")[0];
    var DateInputPolyfill = /*#__PURE__*/function () {
      function DateInputPolyfill(input) {
        this._input = input;
        this._valueInput = this._createValueInput(input);
        this._formatOptions = this._createFormatOptions();

        this._input.addEventListener("focus", this._showPicker.bind(this));

        this._input.addEventListener("click", this._showPicker.bind(this));

        this._input.addEventListener("blur", this._hidePicker.bind(this));

        this._input.addEventListener("keydown", this._onKeydown.bind(this));

        this._initInput();
      }

      var _proto = DateInputPolyfill.prototype;

      _proto._initInput = function _initInput() {
        var valueDescriptor = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value"); // redefine value property for input

        Object.defineProperty(this._input, "value", {
          configurable: false,
          enumerable: true,
          get: this._getValue.bind(this),
          set: this._setValue.bind(this, valueDescriptor.set)
        }); // redefine valueAsDate property for input

        Object.defineProperty(this._input, "valueAsDate", {
          configurable: false,
          enumerable: true,
          get: this._getDate.bind(this),
          set: this._setDate.bind(this, valueDescriptor.set)
        }); // change input type to remove built-in picker

        this._input.type = "text"; // do not popup keyboard on mobile devices

        this._input.setAttribute("inputmode", "none"); // need to set readonly attribute as well to prevent
        // visible date modification with the cut feature


        this._input.readOnly = true; // update visible value in text input

        this._input.value = this._getValue(); // update default visible value to formatted date

        this._input.defaultValue = valueDescriptor.get.call(this._input);
      };

      _proto._getValue = function _getValue() {
        return this._valueInput.value;
      };

      _proto._setValue = function _setValue(setter, stringValue) {
        this._setDate(setter, parseLocaleDate(stringValue));
      };

      _proto._getDate = function _getDate() {
        return parseLocaleDate(this._getValue());
      };

      _proto._setDate = function _setDate(setter, dateValue) {
        setter.call(this._input, dateValue && localeDate(dateValue, this._formatOptions) || "");
        setter.call(this._valueInput, dateValue && formatLocaleDate(dateValue) || "");
      };

      _proto._createValueInput = function _createValueInput(input) {
        var valueInput = DOCUMENT.createElement("input");
        valueInput.style.display = "none";
        valueInput.setAttribute("hidden", "");
        valueInput.disabled = input.disabled;

        if (input.name) {
          valueInput.name = input.name;
          input.removeAttribute("name");
        }

        if (input.value) {
          valueInput.value = valueInput.defaultValue = input.value;
        }

        if (input.hasAttribute("form")) {
          valueInput.setAttribute("form", input.getAttribute("form"));
        }

        return input.parentNode.insertBefore(valueInput, input.nextSibling);
      };

      _proto._createFormatOptions = function _createFormatOptions() {
        var locale = this._input.lang || HTML.lang;

        var formatString = this._input.getAttribute("data-format");

        if (!formatString && formatMeta) {
          formatString = formatMeta.content;
        }

        return getFormatOptions(locale, formatString);
      };

      _proto._onKeydown = function _onKeydown(event) {
        var key = event.key;

        if (key === "Enter") {
          if (!this._pickerApi.isHidden()) {
            event.preventDefault();

            this._hidePicker();
          }
        } else if (key === " ") {
          // disable scroll change
          event.preventDefault();

          this._showPicker();
        } else if (key === "Backspace") {
          // prevent browser back navigation
          event.preventDefault();
          this._input.value = "";

          this._pickerApi.reset();

          this._pickerApi.render(new Date());
        } else {
          var offset = 0;

          if (key === "ArrowDown" || key === "Down") {
            offset = 7;
          } else if (key === "ArrowUp" || key === "Up") {
            offset = -7;
          } else if (key === "ArrowLeft" || key === "Left") {
            offset = -1;
          } else if (key === "ArrowRight" || key === "Right") {
            offset = 1;
          }

          if (!offset) return; // disable scroll change on arrows

          event.preventDefault();

          var captionDate = this._pickerApi.getCaptionDate();

          if (this._pickerApi.isAdvancedMode()) {
            if (Math.abs(offset) === 7) {
              captionDate.setMonth(captionDate.getMonth() + offset / 7);
            } else {
              captionDate.setFullYear(captionDate.getFullYear() + offset);
            }
          } else {
            captionDate.setDate(captionDate.getDate() + offset);
          }

          if (this._pickerApi.isValidValue(captionDate)) {
            this._input.valueAsDate = captionDate;

            this._pickerApi.render(captionDate);
          }
        }
      };

      _proto._showPicker = function _showPicker() {
        if (!this._pickerApi) {
          this._pickerApi = new DatePickerImpl(this._input, this._formatOptions);
        } else {
          this._pickerApi.show();
        }
      };

      _proto._hidePicker = function _hidePicker() {
        this._pickerApi.hide();
      };

      return DateInputPolyfill;
    }();

    var ANIMATION_NAME = "dateinput-polyfill";
    var PROPERTY_NAME = "__" + ANIMATION_NAME + "__";

    function isDateInputSupported() {
      // use a stronger type support detection that handles old WebKit browsers:
      // http://www.quirksmode.org/blog/archives/2015/03/better_modern_i.html
      var input = DOCUMENT.createElement("input");
      input.type = "date";
      input.value = "_";
      return input.value !== "_";
    }

    var mediaMeta = $(DOCUMENT, "meta[name=dateinput-polyfill-media]")[0];

    if (mediaMeta ? WINDOW.matchMedia(mediaMeta.content) : IE || !isDateInputSupported()) {
      // inject style rules with fake animation
      injectStyles(css_248z$1, DOCUMENT.head); // attach listener to catch all fake animation starts

      DOCUMENT.addEventListener("animationstart", function (event) {
        if (event.animationName === ANIMATION_NAME) {
          var input = event.target;

          if (!input[PROPERTY_NAME]) {
            input[PROPERTY_NAME] = new DateInputPolyfill(input);
          }
        }
      });
    }

}());
