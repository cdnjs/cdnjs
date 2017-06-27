/**
 * better-dateinput-polyfill: input[type=date] polyfill for better-dom
 * @version 1.5.1 Thu, 22 Jan 2015 21:00:52 GMT
 * @link https://github.com/chemerisuk/better-dateinput-polyfill
 * @copyright 2014 Maksim Chemerisuk
 * @license MIT
 */
(function(DOM, BASE_CLASS, VK_SPACE, VK_TAB, VK_ENTER, VK_ESCAPE, VK_BACKSPACE, VK_DELETE, DateUtils) {
    "use strict";

    var __ = DOM.__,
        ampm = function(pos, neg)  {return DOM.get("lang") === "en-US" ? pos : neg},
        formatISODate = function(value)  {return value.toISOString().split("T")[0]},
        PICKER_TEMPLATE = DOM.create("div.{0}>p.{0}-header>a[{1}]*2+span[{2} {1}].{0}-caption^table[{2}].{0}-days>thead>(tr>th[{1}]*7)^(tbody.{0}-body*2>tr*6>td*7)", [(("" + BASE_CLASS) + "-calendar"), "unselectable=on", "aria-hidden=true"]),
        LABEL_TEMPLATE = DOM.create("span[aria-hidden=true].{0}-value", [BASE_CLASS]),
        readDateRange = function(el)  {return ["min", "max"].map(function(x)  {return new Date(el.get(x) || "")})},
        pad = function(num, maxlen)  {return ((maxlen === 2 ? "0" : "00") + num).slice(-maxlen)};

    // Feature detect browsers that already support date inputs
    var hasNativeSupport = DOM.create("input[type=date]")[0].type === "date";

    // need to skip mobile/tablet browsers
    DOM.extend("input[type=date]", !( window.orientation || hasNativeSupport ), {
        constructor: function() {var this$0 = this;
            var calendar = PICKER_TEMPLATE.clone(true),
                label = LABEL_TEMPLATE.clone(true),
                color = this.css("color");

            this
                // hide original input text
                // IE8 doesn't suport color:transparent - use background-color instead
                .css("color", document.addEventListener ? "transparent" : this.css("background-color"))
                // handle arrow keys, esc etc.
                .on("keydown", ["which", "shiftKey"], this._keydownCalendar.bind(this, calendar))
                // sync picker visibility on focus/blur
                .on(["focus", "click"], this._focusCalendar.bind(this, calendar))
                .on("blur", this._blurCalendar.bind(this, calendar))
                .on("change", this._formatValue.bind(this, label))
                .before(calendar.hide(), label);

            label
                .on("click", function()  { this$0.fire("focus") })
                // copy input CSS to adjust visible text position
                .css(this.css(["width", "font", "padding-left", "padding-right", "text-align", "border-width", "box-sizing"]));

            var calenderDays = calendar.findAll((("." + BASE_CLASS) + "-calendar-body")),
                calendarCaption = calendar.find((("." + BASE_CLASS) + "-calendar-caption")),
                changeValue = this._changeValue.bind(this, calendarCaption, calenderDays, calendar);

            calenderDays[1].hide().remove();

            this.closest("form").on("reset", this._resetForm.bind(this));
            this.watch("value", changeValue);
            // trigger watchers to build the calendar
            changeValue(this.value());

            calendar.on("mousedown", ["target"], this._clickCalendar.bind(this, calendar));
            // FIXME: get rid of DOM.requestFrame which is required to get right offset
            DOM.requestFrame(function()  {
                var offset = this$0.offset();
                var labelOffset = label.offset();

                label.css({
                    "color": color,
                    "line-height": offset.height + "px",
                    "margin-left": offset.left - labelOffset.left,
                    "margin-top": offset.top - labelOffset.top
                });

                calendar
                    .css({
                        "margin-left": offset.left - labelOffset.left,
                        "margin-top": offset.bottom - labelOffset.top,
                        "z-index": 1 + (this$0.css("z-index") | 0)
                    });

                // FIXME
                // move calendar to the top when passing cross browser window bounds
                // if (DOM.get("clientHeight") < offset.bottom + calOffset.height) {
                //     calendar.css("margin-top", calOffset.top - offset.bottom - calOffset.height);
                // }

                // display calendar for autofocused elements
                if (this$0.matches(":focus")) this$0.fire("focus");
            });
        },
        _changeValue: function(caption, calenderDays, calendar, value, prevValue) {
            var year, month, date, iterDate;

            value = new Date(value);

            if (!value.getTime()) {
                value = new Date();
            }

            month = value.getUTCMonth();
            date = value.getUTCDate();
            year = value.getUTCFullYear();
            // update calendar caption
            caption.set(__(DateUtils.MONTHS[month]).toHTMLString() + " " + year);
            // update calendar content
            iterDate = new Date(Date.UTC(year, month, 0));
            // move to beginning of current month week
            iterDate.setUTCDate(iterDate.getUTCDate() - iterDate.getUTCDay() - ampm(1, 0));

            prevValue = new Date(prevValue);

            var delta = value.getUTCMonth() - prevValue.getUTCMonth() + 100 * (value.getUTCFullYear() - prevValue.getUTCFullYear());
            var currenDays = calenderDays[calendar.contains(calenderDays[0]) ? 0 : 1];
            var targetDays = delta ? calenderDays[calenderDays[0] === currenDays ? 1 : 0] : currenDays;
            var range = readDateRange(this);

            // update days
            targetDays.findAll("td").forEach(function(day)  {
                iterDate.setUTCDate(iterDate.getUTCDate() + 1);

                var mDiff = month - iterDate.getUTCMonth(),
                    className = (("" + BASE_CLASS) + "-calendar-");

                if (year !== iterDate.getUTCFullYear()) mDiff *= -1;

                if (iterDate < range[0] || iterDate > range[1]) {
                    className += "out";
                } else if (mDiff > 0) {
                    className += "past";
                } else if (mDiff < 0) {
                    className += "future";
                } else if (date === iterDate.getUTCDate()) {
                    className += "today";
                } else {
                    className = "";
                }

                day.set({
                    _ts: iterDate.getTime(),
                    className: className,
                    textContent: iterDate.getUTCDate()
                });
            });

            if (delta) {
                currenDays[delta > 0 ? "after" : "before"](targetDays);
                currenDays.hide(function()  { currenDays.remove() });
                targetDays.show();
            }

            // trigger event manually to notify about changes
            this.fire("change");
        },
        _formatValue: function(label) {
            var value = new Date(this.get()),
                formattedValue = "";

            if (value.getTime()) {
                var formatString = this.get("data-format");
                // use "E, dd MMM yyyy" as default value
                if (!formatString) formatString = "E, dd MMM yyyy";

                var day = value.getUTCDay();
                var date = value.getUTCDate();
                var month = value.getUTCMonth();
                var year = value.getUTCFullYear();

                formatString = formatString
                        .replace(/'([^']+)'/g, "->$1<-")
                        .replace(/\w+/g, "{$&}")
                        .replace(/->{(.*?)}<-/g, function(_, group)  {return group.replace(/}|{/g, "")});

                formattedValue = DOM.format(formatString, {
                    E: __(DateUtils.DAYS[day].slice(0, 2)).toHTMLString(),
                    EE: __(DateUtils.DAYS[day]).toHTMLString(),
                    d: date,
                    dd: pad(date, 2),
                    D: DateUtils.getDayInYear(value),
                    DD: pad(DateUtils.getDayInYear(value), 3),
                    w: DateUtils.getWeekInYear(value),
                    ww: pad(DateUtils.getWeekInYear(value), 2),
                    W: DateUtils.getWeekInMonth(value),
                    M: month + 1,
                    MM: pad(month + 1, 2),
                    MMM: __(DateUtils.MONTHS[month].substr(0, 3) + ".").toHTMLString(),
                    MMMM: __(DateUtils.MONTHS[month]).toHTMLString(),
                    y: year % 100,
                    yy: pad(year % 100, 2),
                    yyyy: year,
                    u: day || 7,
                    F: DateUtils.getWeekCountInMonth(value)
                });
            }

            // display formatted date value instead of real one
            label.value(formattedValue);
        },
        _clickCalendar: function(calendar, target) {
            var targetDate;

            if (target.matches("a")) {
                targetDate = new Date(this.get());

                if (!targetDate.getTime()) targetDate = new Date();

                targetDate.setUTCMonth(targetDate.getUTCMonth() + (target.next("a")[0] ? -1 : 1));
            } else if (target.matches("td")) {
                targetDate = target.get("_ts");

                if (targetDate) {
                    targetDate = new Date(targetDate);
                    calendar.hide();
                }
            }

            if (targetDate != null) {
                var range = readDateRange(this);

                if (targetDate < range[0]) {
                    targetDate = range[0];
                } else if (targetDate > range[1]) {
                    targetDate = range[1];
                }

                this.value(formatISODate(targetDate));
            }
            // prevent input from loosing focus
            return false;
        },
        _keydownCalendar: function(calendar, which, shiftKey) {
            var delta, currentDate;

            // ENTER key should submit form if calendar is hidden
            if (calendar.matches(":hidden") && which === VK_ENTER) return true;

            if (which === VK_SPACE) {
                calendar.toggle(); // SPACE key toggles calendar visibility
            } else if (which === VK_ESCAPE || which === VK_TAB || which === VK_ENTER) {
                calendar.hide(); // ESC, TAB or ENTER keys hide calendar
            } else if (which === VK_BACKSPACE || which === VK_DELETE) {
                this.empty(); // BACKSPACE, DELETE clear value
            } else {
                currentDate = new Date(this.get());

                if (!currentDate.getTime()) currentDate = new Date();

                if (which === 74 || which === 40) { delta = 7; }
                else if (which === 75 || which === 38) { delta = -7; }
                else if (which === 76 || which === 39) { delta = 1; }
                else if (which === 72 || which === 37) { delta = -1; }

                if (delta) {
                    if (shiftKey && (which === 40 || which === 38)) {
                        currentDate.setUTCFullYear(currentDate.getUTCFullYear() + (delta > 0 ? 1 : -1));
                    } else if (shiftKey && (which === 37 || which === 39)) {
                        currentDate.setUTCMonth(currentDate.getUTCMonth() + (delta > 0 ? 1 : -1));
                    } else {
                        currentDate.setUTCDate(currentDate.getUTCDate() + delta);
                    }

                    var range = readDateRange(this);

                    if (!(currentDate < range[0] || currentDate > range[1])) {
                        this.value(formatISODate(currentDate));
                    }
                }
            }
            // prevent default action except if it was TAB so
            // do not allow to change the value manually
            return which === VK_TAB;
        },
        _blurCalendar: function(calendar) {
            calendar.hide();
        },
        _focusCalendar: function(calendar) {var this$0 = this;
            // update calendar weekday captions
            calendar.findAll("th").forEach(function(el, index)  {
                el.l10n(DateUtils.DAYS[ampm(index, ++index % 7)].slice(0, 2));
            });

            calendar.show();

            // use the trick below to reset text selection on focus
            setTimeout(function()  {
                var node = this$0[0];

                if ("selectionStart" in node) {
                    node.selectionStart = 0;
                    node.selectionEnd = 0;
                } else {
                    var inputRange = node.createTextRange();

                    inputRange.moveStart("character", 0);
                    inputRange.collapse();
                    inputRange.moveEnd("character", 0);
                    inputRange.select();
                }
            }, 0);
        },
        _resetForm: function() {
            this.value(this.get("defaultValue"));
        }
    });

    // compact moths in english don't have the dot suffix
    DOM.importStrings("en", DateUtils.MONTHS.reduce(function(memo, month)  {
        var shortMonth = month.slice(0, 3);

        memo[shortMonth + "."] = shortMonth;

        return memo;
    }, {}));
}(window.DOM, "btr-dateinput", 32, 9, 13, 27, 8, 46, {
    DAYS: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
    MONTHS: "January February March April May June July August September October November December".split(" "),
    getWeekInYear: function(d) {
        d = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
        // set to nearest thursday: current date + 4 - current day number
        // make sunday's day number 7
        d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
        var yearStart = Date.UTC(d.getUTCFullYear(), 0, 1);
        // calculate full weeks to nearest thursday
        return Math.ceil((1 + (d - yearStart) / 86400000) / 7);
    },
    getWeekInMonth: function(d) {
        var firstWeekday = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1)).getUTCDay();
        var offsetDate = d.getUTCDate() + firstWeekday - 1;
        return 1 + Math.floor(offsetDate / 7);
    },
    getWeekCountInMonth: function(d) {
        return Math.ceil(d.getUTCDate() / 7);
    },
    getDayInYear: function(d) {
        var beginOfYear = Date.UTC(d.getUTCFullYear(), 0, 1);
        var millisBetween = d.getTime() - beginOfYear;
        return Math.floor(1 + millisBetween / 86400000);
    }
}));

DOM.importStyles("@media screen", ".btr-dateinput-value{position:absolute;display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;border-style:none solid;border-color:transparent;pointer-events:none}.btr-dateinput-calendar{position:absolute;visibility:hidden;cursor:default;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;color:#FFF;border-bottom:1px solid #CCC;overflow:hidden;border-radius:3px;-webkit-box-shadow:0 .25em .5em rgba(0,0,0,.2);box-shadow:0 .25em .5em rgba(0,0,0,.2);font-family:Helvetica Neue,Helvetica,Arial,sans-serif;text-align:center;opacity:1;-webkit-transform:scale(1,1) translate3d(0,0,0);transform:scale(1,1) translate3d(0,0,0);-webkit-transform-origin:50% 0;-ms-transform-origin:50% 0;transform-origin:50% 0;-webkit-transition:.1s ease-out;transition:.1s ease-out;width:15em;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.btr-dateinput-calendar[aria-hidden=true]{opacity:0;-webkit-transform:scale(.75,.75) translate3d(0,0,0);transform:scale(.75,.75) translate3d(0,0,0)}.btr-dateinput-calendar-header{position:relative;margin:0;height:2.5em;line-height:2.5em;font-weight:700;white-space:nowrap;background:#2da4d6;text-shadow:0 1px 0 #555;border-bottom:1px solid #207fb1}.btr-dateinput-calendar-header>a{width:2.5em;height:2.5em;position:absolute;left:0;top:0;color:inherit}.btr-dateinput-calendar-header>a:before{content:'\\25C4'}.btr-dateinput-calendar-header>a::before{font-size:.85em}.btr-dateinput-calendar-header>a+a{left:auto;right:0}.btr-dateinput-calendar-header>a+a:before{content:'\\25BA'}.btr-dateinput-calendar-days{width:100%;table-layout:fixed;border-spacing:0;border-collapse:collapse;color:#555;background:#FFF;border-radius:3px;border:1px solid #CCC;border-bottom:0}.btr-dateinput-calendar-days>thead{border-top:1px solid #EEE;border-bottom:1px solid #CCC;font-size:.75em;background:#DDD;font-weight:700;text-shadow:0 1px 0 #f3f3f3}.btr-dateinput-calendar-body{-webkit-transform:translateX(0);-ms-transform:translateX(0);transform:translateX(0);-webkit-transition:-webkit-transform .1s linear;transition:transform .1s linear}.btr-dateinput-calendar-body[aria-hidden=true]{-webkit-transform:translateX(-100%);-ms-transform:translateX(-100%);transform:translateX(-100%)}.btr-dateinput-calendar-body+.btr-dateinput-calendar-body{position:absolute;bottom:0}.btr-dateinput-calendar-body+.btr-dateinput-calendar-body[aria-hidden=true]{-webkit-transform:translateX(100%);-ms-transform:translateX(100%);transform:translateX(100%)}.btr-dateinput-calendar-days td,.btr-dateinput-calendar-days th{width:2em;height:2em;line-height:2;padding:0;text-align:center}.btr-dateinput-calendar-past,.btr-dateinput-calendar-future{color:#DDD}.btr-dateinput-calendar-out{color:#CCC;text-shadow:0 1px 0 #FFF}.btr-dateinput-calendar-today{color:#FFF;background-color:#2da4d6;text-shadow:0 1px 0 #555;font-weight:700}.btr-dateinput-calendar-out,.btr-dateinput-calendar-days td:hover{background-color:#f3f3f3;background-color:rgba(0,0,0,.05)}.btr-dateinput-calendar-header>a:hover,td.btr-dateinput-calendar-today:hover{background-color:#207fb1;text-decoration:none}.btr-dateinput-value+input::-moz-placeholder{color:initial}");
