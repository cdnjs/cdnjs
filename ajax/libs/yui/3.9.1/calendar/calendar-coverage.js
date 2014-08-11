if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["build/calendar/calendar.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/calendar/calendar.js",
    code: []
};
_yuitest_coverage["build/calendar/calendar.js"].code=["YUI.add('calendar', function (Y, NAME) {","","/**"," * The Calendar component is a UI widget that allows users"," * to view dates in a two-dimensional month grid, as well as"," * to select one or more dates, or ranges of dates. Calendar"," * is generated dynamically and relies on the developer to"," * provide for a progressive enhancement alternative."," *"," *"," * @module calendar"," */","","var getCN             = Y.ClassNameManager.getClassName,","    CALENDAR          = 'calendar',","    KEY_DOWN          = 40,","    KEY_UP            = 38,","    KEY_LEFT          = 37,","    KEY_RIGHT         = 39,","    KEY_ENTER         = 13,","    KEY_SPACE         = 32,","    CAL_DAY_SELECTED  = getCN(CALENDAR, 'day-selected'),","    CAL_DAY_HILITED   = getCN(CALENDAR, 'day-highlighted'),","    CAL_DAY           = getCN(CALENDAR, 'day'),","    CAL_PREVMONTH_DAY = getCN(CALENDAR, 'prevmonth-day'),","    CAL_NEXTMONTH_DAY = getCN(CALENDAR, 'nextmonth-day'),","    CAL_GRID          = getCN(CALENDAR, 'grid'),","    ydate             = Y.DataType.Date,","    CAL_PANE          = getCN(CALENDAR, 'pane'),","    os                = Y.UA.os;","","/** Create a calendar view to represent a single or multiple","    * month range of dates, rendered as a grid with date and","    * weekday labels.","    *","    * @class Calendar","    * @extends CalendarBase","    * @param config {Object} Configuration object (see Configuration attributes)","    * @constructor","    */","function Calendar() {","    Calendar.superclass.constructor.apply ( this, arguments );","}","","Y.Calendar = Y.extend(Calendar, Y.CalendarBase, {","","    _keyEvents: [],","","    _highlightedDateNode: null,","","    /**","     * A property tracking the last selected date on the calendar, for the","     * purposes of multiple selection.","     *","     * @property _lastSelectedDate","     * @type Date","     * @default null","     * @private","     */","    _lastSelectedDate: null,","","    /**","     * Designated initializer. Activates the navigation plugin for the calendar.","     *","     * @method initializer","     */","    initializer : function () {","        this.plug(Y.Plugin.CalendarNavigator);","","        this._keyEvents = [];","        this._highlightedDateNode = null;","        this._lastSelectedDate = null;","    },","","    /**","     * Overrides the _bindCalendarEvents placeholder in CalendarBase","     * and binds calendar events during bindUI stage.","     * @method _bindCalendarEvents","     * @protected","     */","    _bindCalendarEvents : function () {","        var contentBox = this.get('contentBox'),","            pane       = contentBox.one(\".\" + CAL_PANE);","","        pane.on(\"selectstart\", this._preventSelectionStart);","        pane.delegate(\"click\", this._clickCalendar, \".\" + CAL_DAY + \", .\" + CAL_PREVMONTH_DAY + \", .\" + CAL_NEXTMONTH_DAY, this);","        pane.delegate(\"keydown\", this._keydownCalendar, \".\" + CAL_GRID, this);","        pane.delegate(\"focus\", this._focusCalendarGrid, \".\" + CAL_GRID, this);","        pane.delegate(\"focus\", this._focusCalendarCell, \".\" + CAL_DAY, this);","        pane.delegate(\"blur\", this._blurCalendarGrid, \".\" + CAL_GRID + \",.\" + CAL_DAY, this);","    },","","    /**","     * Prevents text selection if it is started within the calendar pane","     * @method _preventSelectionStart","     * @param event {Event} The selectstart event","     * @protected","     */","    _preventSelectionStart : function (event) {","        event.preventDefault();","    },","","    /**","     * Highlights a specific date node with keyboard highlight class","     * @method _highlightDateNode","     * @param oDate {Date} Date corresponding the node to be highlighted","     * @protected","     */","    _highlightDateNode : function (oDate) {","        this._unhighlightCurrentDateNode();","        var newNode = this._dateToNode(oDate);","        newNode.focus();","        newNode.addClass(CAL_DAY_HILITED);","    },","","    /**","     * Unhighlights a specific date node currently highlighted with keyboard highlight class","     * @method _unhighlightCurrentDateNode","     * @protected","     */","    _unhighlightCurrentDateNode : function () {","        var allHilitedNodes = this.get(\"contentBox\").all(\".\" + CAL_DAY_HILITED);","        if (allHilitedNodes) {","            allHilitedNodes.removeClass(CAL_DAY_HILITED);","        }","    },","","    /**","     * Returns the grid number for a specific calendar grid (for multi-grid templates)","     * @method _getGridNumber","     * @param gridNode {Node} Node corresponding to a specific grid","     * @protected","     */","    _getGridNumber : function (gridNode) {","        var idParts = gridNode.get(\"id\").split(\"_\").reverse();","","        return parseInt(idParts[0], 10);","    },","","    /**","     * Handler for loss of focus of calendar grid","     * @method _blurCalendarGrid","     * @protected","     */","    _blurCalendarGrid : function () {","        this._unhighlightCurrentDateNode();","    },","","","    /**","     * Handler for gain of focus of calendar cell","     * @method _focusCalendarCell","     * @protected","     */","    _focusCalendarCell : function (ev) {","        this._highlightedDateNode = ev.target;","        ev.stopPropagation();","    },","","    /**","     * Handler for gain of focus of calendar grid","     * @method _focusCalendarGrid","     * @protected","     */","    _focusCalendarGrid : function () {","        this._unhighlightCurrentDateNode();","        this._highlightedDateNode = null;","    },","","    /**","     * Handler for keyboard press on a calendar grid","     * @method _keydownCalendar","     * @protected","     */","    _keydownCalendar : function (ev) {","        var gridNum = this._getGridNumber(ev.target),","            curDate = !this._highlightedDateNode ? null : this._nodeToDate(this._highlightedDateNode),","            keyCode = ev.keyCode,","            dayNum = 0,","            dir = '',","            selMode,","            newDate,","            startDate,","            endDate,","            lastPaneDate;","","        switch(keyCode) {","            case KEY_DOWN:","                dayNum = 7;","                dir = 's';","                break;","            case KEY_UP:","                dayNum = -7;","                dir = 'n';","                break;","            case KEY_LEFT:","                dayNum = -1;","                dir = 'w';","                break;","            case KEY_RIGHT:","                dayNum = 1;","                dir = 'e';","                break;","            case KEY_SPACE: case KEY_ENTER:","                ev.preventDefault();","                if (this._highlightedDateNode) {","                    selMode = this.get(\"selectionMode\");","                    if (selMode === \"single\" && !this._highlightedDateNode.hasClass(CAL_DAY_SELECTED)) {","                            this._clearSelection(true);","                            this._addDateToSelection(curDate);","                    } else if (selMode === \"multiple\" || selMode === \"multiple-sticky\") {","                        if (this._highlightedDateNode.hasClass(CAL_DAY_SELECTED)) {","                            this._removeDateFromSelection(curDate);","                        } else {","                            this._addDateToSelection(curDate);","                        }","                    }","                }","                break;","        }","","","        if (keyCode === KEY_DOWN || keyCode === KEY_UP || keyCode === KEY_LEFT || keyCode === KEY_RIGHT) {","","            if (!curDate) {","                curDate = ydate.addMonths(this.get(\"date\"), gridNum);","                dayNum = 0;","            }","","            ev.preventDefault();","","            newDate = ydate.addDays(curDate, dayNum);","            startDate = this.get(\"date\");","            endDate = ydate.addMonths(this.get(\"date\"), this._paneNumber - 1);","            lastPaneDate = new Date(endDate);","            endDate.setDate(ydate.daysInMonth(endDate));","","            if (ydate.isInRange(newDate, startDate, endDate)) {","/*","                var paneShift = (newDate.getMonth() - curDate.getMonth()) % 10;","","                if (paneShift != 0) {","                    var newGridNum = gridNum + paneShift,","                            contentBox = this.get('contentBox'),","                            newPane = contentBox.one(\"#\" + this._calendarId + \"_pane_\" + newGridNum);","                            newPane.focus();","                }","*/","                this._highlightDateNode(newDate);","            } else if (ydate.isGreater(startDate, newDate)) {","                if (!ydate.isGreaterOrEqual(this.get(\"minimumDate\"), startDate)) {","                    this.set(\"date\", ydate.addMonths(startDate, -1));","                    this._highlightDateNode(newDate);","                }","            } else if (ydate.isGreater(newDate, endDate)) {","                if (!ydate.isGreaterOrEqual(lastPaneDate, this.get(\"maximumDate\"))) {","                    this.set(\"date\", ydate.addMonths(startDate, 1));","                    this._highlightDateNode(newDate);","                }","            }","        }","    },","","    /**","     * Handles the calendar clicks based on selection mode.","     * @method _clickCalendar","     * @param {Event} ev A click event","     * @private","     */","    _clickCalendar : function (ev) {","        var clickedCell = ev.currentTarget,","            clickedCellIsDay = clickedCell.hasClass(CAL_DAY) &&","                                !clickedCell.hasClass(CAL_PREVMONTH_DAY) &&","                                !clickedCell.hasClass(CAL_NEXTMONTH_DAY),","","        clickedCellIsSelected = clickedCell.hasClass(CAL_DAY_SELECTED),","        selectedDate;","","        switch (this.get(\"selectionMode\")) {","            case(\"single\"):","                if (clickedCellIsDay) {","                    if (!clickedCellIsSelected) {","                        this._clearSelection(true);","                        this._addDateToSelection(this._nodeToDate(clickedCell));","                    }","                }","                break;","            case(\"multiple-sticky\"):","                if (clickedCellIsDay) {","                    if (clickedCellIsSelected) {","                        this._removeDateFromSelection(this._nodeToDate(clickedCell));","                    } else {","                        this._addDateToSelection(this._nodeToDate(clickedCell));","                    }","                }","                break;","            case(\"multiple\"):","                if (clickedCellIsDay) {","                    if (!ev.metaKey && !ev.ctrlKey && !ev.shiftKey) {","                        this._clearSelection(true);","                        this._lastSelectedDate = this._nodeToDate(clickedCell);","                        this._addDateToSelection(this._lastSelectedDate);","                    } else if (((os === 'macintosh' && ev.metaKey) || (os !== 'macintosh' && ev.ctrlKey)) && !ev.shiftKey) {","                        if (clickedCellIsSelected) {","                            this._removeDateFromSelection(this._nodeToDate(clickedCell));","                            this._lastSelectedDate = null;","                        } else {","                            this._lastSelectedDate = this._nodeToDate(clickedCell);","                            this._addDateToSelection(this._lastSelectedDate);","                        }","                    } else if (((os === 'macintosh' && ev.metaKey) || (os !== 'macintosh' && ev.ctrlKey)) && ev.shiftKey) {","                        if (this._lastSelectedDate) {","                            selectedDate = this._nodeToDate(clickedCell);","                            this._addDateRangeToSelection(selectedDate, this._lastSelectedDate);","                            this._lastSelectedDate = selectedDate;","                        } else {","                            this._lastSelectedDate = this._nodeToDate(clickedCell);","                            this._addDateToSelection(this._lastSelectedDate);","                        }","                    } else if (ev.shiftKey) {","                        if (this._lastSelectedDate) {","                            selectedDate = this._nodeToDate(clickedCell);","                            this._clearSelection(true);","                            this._addDateRangeToSelection(selectedDate, this._lastSelectedDate);","                            this._lastSelectedDate = selectedDate;","                        } else {","                            this._clearSelection(true);","                            this._lastSelectedDate = this._nodeToDate(clickedCell);","                            this._addDateToSelection(this._lastSelectedDate);","                        }","                    }","                }","                break;","        }","","        if (clickedCellIsDay) {","            /**","            * Fired when a specific date cell in the calendar is clicked. The event carries a","            * payload which includes a `cell` property corresponding to the node of the actual","            * date cell, and a `date` property, with the `Date` that was clicked.","            *","            * @event dateClick","            */","            this.fire(\"dateClick\", {cell: clickedCell, date: this._nodeToDate(clickedCell)});","        } else if (clickedCell.hasClass(CAL_PREVMONTH_DAY)) {","            /**","            * Fired when any of the previous month's days displayed before the calendar grid","            * are clicked.","            *","            * @event prevMonthClick","            */","            this.fire(\"prevMonthClick\");","        } else if (clickedCell.hasClass(CAL_NEXTMONTH_DAY)) {","            /**","            * Fired when any of the next month's days displayed after the calendar grid","            * are clicked.","            *","            * @event nextMonthClick","            */","            this.fire(\"nextMonthClick\");","        }","    },","","    /**","     * Subtracts one month from the current calendar view.","     * @method subtractMonth","     * @return {Calendar} A reference to this object","     * @chainable","     */","    subtractMonth : function (e) {","        this.set(\"date\", ydate.addMonths(this.get(\"date\"), -1));","        if (e) {","            e.halt();","        }","        return this;","    },","","    /**","     * Subtracts one year from the current calendar view.","     * @method subtractYear","     * @return {Calendar} A reference to this object","     * @chainable","     */","    subtractYear : function (e) {","        this.set(\"date\", ydate.addYears(this.get(\"date\"), -1));","        if (e) {","            e.halt();","        }","        return this;","    },","","    /**","     * Adds one month to the current calendar view.","     * @method addMonth","     * @return {Calendar} A reference to this object","     * @chainable","     */","    addMonth : function (e) {","        this.set(\"date\", ydate.addMonths(this.get(\"date\"), 1));","        if (e) {","            e.halt();","        }","        return this;","    },","","    /**","     * Adds one year to the current calendar view.","     * @method addYear","     * @return {Calendar} A reference to this object","     * @chainable","     */","    addYear : function (e) {","        this.set(\"date\", ydate.addYears(this.get(\"date\"), 1));","        if (e) {","            e.halt();","        }","        return this;","    }","}, {","    /**","    * The identity of the widget.","    *","    * @property NAME","    * @type String","    * @default 'calendar'","    * @readOnly","    * @protected","    * @static","    */","    NAME: \"calendar\",","","    /**","    * Static property used to define the default attribute configuration of","    * the Widget.","    *","    * @property ATTRS","    * @type {Object}","    * @protected","    * @static","    */","    ATTRS: {","","        /**","         * A setting specifying the type of selection the calendar allows.","         * Possible values include:","         * <ul>","         *   <li>`single` - One date at a time</li>","         *   <li>`multiple-sticky` - Multiple dates, selected one at a time (the dates \"stick\"). This option","         *   is appropriate for mobile devices, where function keys from the keyboard are not available.</li>","         *   <li>`multiple` - Multiple dates, selected with Ctrl/Meta keys for additional single","         *   dates, and Shift key for date ranges.</li>","         *","         * @attribute selectionMode","         * @type String","         * @default single","         */","        selectionMode: {","            value: \"single\"","        },","","        /**","         * The date corresponding to the current calendar view. Always","         * normalized to the first of the month that contains the date","         * at assignment time. Used as the first date visible in the","         * calendar.","         *","         * @attribute date","         * @type Date","         * @default Today's date as set on the user's computer.","         */","        date: {","            value: new Date(),","            lazyAdd: false,","            setter: function (val) {","","                var newDate = this._normalizeDate(val),","                    newTopDate = ydate.addMonths(newDate, this._paneNumber - 1),","                    minDate = this.get(\"minimumDate\"),","                    maxDate = this.get(\"maximumDate\"),","                    actualMaxDate;","","                if ((!minDate || ydate.isGreaterOrEqual(newDate, minDate)) &&","                        (!maxDate || ydate.isGreaterOrEqual(maxDate, newTopDate))","                ) {","                    return newDate;","                } else if (minDate && ydate.isGreater(minDate, newDate)) {","                    return minDate;","                } else if (maxDate && ydate.isGreater(newTopDate, maxDate)) {","                    actualMaxDate = ydate.addMonths(maxDate, -1*(this._paneNumber - 1));","                    return actualMaxDate;","                }","            }","        },","","        /**","         * The minimum date that can be displayed by the calendar. The calendar will not","         * allow dates earlier than this one to be set, and will reset any earlier date to","         * this date. Should be `null` if no minimum date is needed.","         *","         * @attribute minimumDate","         * @type Date","         * @default null","         */","        minimumDate: {","            value: null,","            setter: function (val) {","                if (val) {","                    var curDate = this.get('date'),","                        newMinDate = this._normalizeDate(val);","                    if (curDate && !ydate.isGreaterOrEqual(curDate, newMinDate)) {","                        this.set('date', newMinDate);","                    }","                    return newMinDate;","                } else {","                    return this._normalizeDate(val);","                }","            }","        },","","        /**","         * The maximum date that can be displayed by the calendar. The calendar will not","         * allow dates later than this one to be set, and will reset any later date to","         * this date. Should be `null` if no maximum date is needed.","         *","         * @attribute maximumDate","         * @type Date","         * @default null","         */","        maximumDate: {","            value: null,","            setter: function (val) {","                if (val) {","                    var curDate = this.get('date'),","                        newMaxDate = this._normalizeDate(val);","                    if (curDate && !ydate.isGreaterOrEqual(val, ydate.addMonths(curDate, this._paneNumber - 1))) {","                        this.set('date', ydate.addMonths(newMaxDate, -1*(this._paneNumber -1)));","                    }","                    return newMaxDate;","                } else {","                    return val;","                }","            }","        }","    }","});","","}, '@VERSION@', {","    \"requires\": [","        \"calendar-base\",","        \"calendarnavigator\"","    ],","    \"lang\": [","        \"de\",","        \"en\",","        \"es\",","        \"es-AR\",","        \"fr\",","        \"it\",","        \"ja\",","        \"nb-NO\",","        \"nl\",","        \"pt-BR\",","        \"ru\",","        \"zh-HANT-TW\"","    ],","    \"skinnable\": true","});"];
_yuitest_coverage["build/calendar/calendar.js"].lines = {"1":0,"14":0,"41":0,"42":0,"45":0,"68":0,"70":0,"71":0,"72":0,"82":0,"85":0,"86":0,"87":0,"88":0,"89":0,"90":0,"100":0,"110":0,"111":0,"112":0,"113":0,"122":0,"123":0,"124":0,"135":0,"137":0,"146":0,"156":0,"157":0,"166":0,"167":0,"176":0,"187":0,"189":0,"190":0,"191":0,"193":0,"194":0,"195":0,"197":0,"198":0,"199":0,"201":0,"202":0,"203":0,"205":0,"206":0,"207":0,"208":0,"209":0,"210":0,"211":0,"212":0,"213":0,"215":0,"219":0,"223":0,"225":0,"226":0,"227":0,"230":0,"232":0,"233":0,"234":0,"235":0,"236":0,"238":0,"249":0,"250":0,"251":0,"252":0,"253":0,"255":0,"256":0,"257":0,"258":0,"271":0,"279":0,"281":0,"282":0,"283":0,"284":0,"287":0,"289":0,"290":0,"291":0,"293":0,"296":0,"298":0,"299":0,"300":0,"301":0,"302":0,"303":0,"304":0,"305":0,"306":0,"308":0,"309":0,"311":0,"312":0,"313":0,"314":0,"315":0,"317":0,"318":0,"320":0,"321":0,"322":0,"323":0,"324":0,"325":0,"327":0,"328":0,"329":0,"333":0,"336":0,"344":0,"345":0,"352":0,"353":0,"360":0,"371":0,"372":0,"373":0,"375":0,"385":0,"386":0,"387":0,"389":0,"399":0,"400":0,"401":0,"403":0,"413":0,"414":0,"415":0,"417":0,"476":0,"482":0,"485":0,"486":0,"487":0,"488":0,"489":0,"490":0,"507":0,"508":0,"510":0,"511":0,"513":0,"515":0,"532":0,"533":0,"535":0,"536":0,"538":0,"540":0};
_yuitest_coverage["build/calendar/calendar.js"].functions = {"Calendar:41":0,"initializer:67":0,"_bindCalendarEvents:81":0,"_preventSelectionStart:99":0,"_highlightDateNode:109":0,"_unhighlightCurrentDateNode:121":0,"_getGridNumber:134":0,"_blurCalendarGrid:145":0,"_focusCalendarCell:155":0,"_focusCalendarGrid:165":0,"_keydownCalendar:175":0,"_clickCalendar:270":0,"subtractMonth:370":0,"subtractYear:384":0,"addMonth:398":0,"addYear:412":0,"setter:474":0,"setter:506":0,"setter:531":0,"(anonymous 1):1":0};
_yuitest_coverage["build/calendar/calendar.js"].coveredLines = 158;
_yuitest_coverage["build/calendar/calendar.js"].coveredFunctions = 20;
_yuitest_coverline("build/calendar/calendar.js", 1);
YUI.add('calendar', function (Y, NAME) {

/**
 * The Calendar component is a UI widget that allows users
 * to view dates in a two-dimensional month grid, as well as
 * to select one or more dates, or ranges of dates. Calendar
 * is generated dynamically and relies on the developer to
 * provide for a progressive enhancement alternative.
 *
 *
 * @module calendar
 */

_yuitest_coverfunc("build/calendar/calendar.js", "(anonymous 1)", 1);
_yuitest_coverline("build/calendar/calendar.js", 14);
var getCN             = Y.ClassNameManager.getClassName,
    CALENDAR          = 'calendar',
    KEY_DOWN          = 40,
    KEY_UP            = 38,
    KEY_LEFT          = 37,
    KEY_RIGHT         = 39,
    KEY_ENTER         = 13,
    KEY_SPACE         = 32,
    CAL_DAY_SELECTED  = getCN(CALENDAR, 'day-selected'),
    CAL_DAY_HILITED   = getCN(CALENDAR, 'day-highlighted'),
    CAL_DAY           = getCN(CALENDAR, 'day'),
    CAL_PREVMONTH_DAY = getCN(CALENDAR, 'prevmonth-day'),
    CAL_NEXTMONTH_DAY = getCN(CALENDAR, 'nextmonth-day'),
    CAL_GRID          = getCN(CALENDAR, 'grid'),
    ydate             = Y.DataType.Date,
    CAL_PANE          = getCN(CALENDAR, 'pane'),
    os                = Y.UA.os;

/** Create a calendar view to represent a single or multiple
    * month range of dates, rendered as a grid with date and
    * weekday labels.
    *
    * @class Calendar
    * @extends CalendarBase
    * @param config {Object} Configuration object (see Configuration attributes)
    * @constructor
    */
_yuitest_coverline("build/calendar/calendar.js", 41);
function Calendar() {
    _yuitest_coverfunc("build/calendar/calendar.js", "Calendar", 41);
_yuitest_coverline("build/calendar/calendar.js", 42);
Calendar.superclass.constructor.apply ( this, arguments );
}

_yuitest_coverline("build/calendar/calendar.js", 45);
Y.Calendar = Y.extend(Calendar, Y.CalendarBase, {

    _keyEvents: [],

    _highlightedDateNode: null,

    /**
     * A property tracking the last selected date on the calendar, for the
     * purposes of multiple selection.
     *
     * @property _lastSelectedDate
     * @type Date
     * @default null
     * @private
     */
    _lastSelectedDate: null,

    /**
     * Designated initializer. Activates the navigation plugin for the calendar.
     *
     * @method initializer
     */
    initializer : function () {
        _yuitest_coverfunc("build/calendar/calendar.js", "initializer", 67);
_yuitest_coverline("build/calendar/calendar.js", 68);
this.plug(Y.Plugin.CalendarNavigator);

        _yuitest_coverline("build/calendar/calendar.js", 70);
this._keyEvents = [];
        _yuitest_coverline("build/calendar/calendar.js", 71);
this._highlightedDateNode = null;
        _yuitest_coverline("build/calendar/calendar.js", 72);
this._lastSelectedDate = null;
    },

    /**
     * Overrides the _bindCalendarEvents placeholder in CalendarBase
     * and binds calendar events during bindUI stage.
     * @method _bindCalendarEvents
     * @protected
     */
    _bindCalendarEvents : function () {
        _yuitest_coverfunc("build/calendar/calendar.js", "_bindCalendarEvents", 81);
_yuitest_coverline("build/calendar/calendar.js", 82);
var contentBox = this.get('contentBox'),
            pane       = contentBox.one("." + CAL_PANE);

        _yuitest_coverline("build/calendar/calendar.js", 85);
pane.on("selectstart", this._preventSelectionStart);
        _yuitest_coverline("build/calendar/calendar.js", 86);
pane.delegate("click", this._clickCalendar, "." + CAL_DAY + ", ." + CAL_PREVMONTH_DAY + ", ." + CAL_NEXTMONTH_DAY, this);
        _yuitest_coverline("build/calendar/calendar.js", 87);
pane.delegate("keydown", this._keydownCalendar, "." + CAL_GRID, this);
        _yuitest_coverline("build/calendar/calendar.js", 88);
pane.delegate("focus", this._focusCalendarGrid, "." + CAL_GRID, this);
        _yuitest_coverline("build/calendar/calendar.js", 89);
pane.delegate("focus", this._focusCalendarCell, "." + CAL_DAY, this);
        _yuitest_coverline("build/calendar/calendar.js", 90);
pane.delegate("blur", this._blurCalendarGrid, "." + CAL_GRID + ",." + CAL_DAY, this);
    },

    /**
     * Prevents text selection if it is started within the calendar pane
     * @method _preventSelectionStart
     * @param event {Event} The selectstart event
     * @protected
     */
    _preventSelectionStart : function (event) {
        _yuitest_coverfunc("build/calendar/calendar.js", "_preventSelectionStart", 99);
_yuitest_coverline("build/calendar/calendar.js", 100);
event.preventDefault();
    },

    /**
     * Highlights a specific date node with keyboard highlight class
     * @method _highlightDateNode
     * @param oDate {Date} Date corresponding the node to be highlighted
     * @protected
     */
    _highlightDateNode : function (oDate) {
        _yuitest_coverfunc("build/calendar/calendar.js", "_highlightDateNode", 109);
_yuitest_coverline("build/calendar/calendar.js", 110);
this._unhighlightCurrentDateNode();
        _yuitest_coverline("build/calendar/calendar.js", 111);
var newNode = this._dateToNode(oDate);
        _yuitest_coverline("build/calendar/calendar.js", 112);
newNode.focus();
        _yuitest_coverline("build/calendar/calendar.js", 113);
newNode.addClass(CAL_DAY_HILITED);
    },

    /**
     * Unhighlights a specific date node currently highlighted with keyboard highlight class
     * @method _unhighlightCurrentDateNode
     * @protected
     */
    _unhighlightCurrentDateNode : function () {
        _yuitest_coverfunc("build/calendar/calendar.js", "_unhighlightCurrentDateNode", 121);
_yuitest_coverline("build/calendar/calendar.js", 122);
var allHilitedNodes = this.get("contentBox").all("." + CAL_DAY_HILITED);
        _yuitest_coverline("build/calendar/calendar.js", 123);
if (allHilitedNodes) {
            _yuitest_coverline("build/calendar/calendar.js", 124);
allHilitedNodes.removeClass(CAL_DAY_HILITED);
        }
    },

    /**
     * Returns the grid number for a specific calendar grid (for multi-grid templates)
     * @method _getGridNumber
     * @param gridNode {Node} Node corresponding to a specific grid
     * @protected
     */
    _getGridNumber : function (gridNode) {
        _yuitest_coverfunc("build/calendar/calendar.js", "_getGridNumber", 134);
_yuitest_coverline("build/calendar/calendar.js", 135);
var idParts = gridNode.get("id").split("_").reverse();

        _yuitest_coverline("build/calendar/calendar.js", 137);
return parseInt(idParts[0], 10);
    },

    /**
     * Handler for loss of focus of calendar grid
     * @method _blurCalendarGrid
     * @protected
     */
    _blurCalendarGrid : function () {
        _yuitest_coverfunc("build/calendar/calendar.js", "_blurCalendarGrid", 145);
_yuitest_coverline("build/calendar/calendar.js", 146);
this._unhighlightCurrentDateNode();
    },


    /**
     * Handler for gain of focus of calendar cell
     * @method _focusCalendarCell
     * @protected
     */
    _focusCalendarCell : function (ev) {
        _yuitest_coverfunc("build/calendar/calendar.js", "_focusCalendarCell", 155);
_yuitest_coverline("build/calendar/calendar.js", 156);
this._highlightedDateNode = ev.target;
        _yuitest_coverline("build/calendar/calendar.js", 157);
ev.stopPropagation();
    },

    /**
     * Handler for gain of focus of calendar grid
     * @method _focusCalendarGrid
     * @protected
     */
    _focusCalendarGrid : function () {
        _yuitest_coverfunc("build/calendar/calendar.js", "_focusCalendarGrid", 165);
_yuitest_coverline("build/calendar/calendar.js", 166);
this._unhighlightCurrentDateNode();
        _yuitest_coverline("build/calendar/calendar.js", 167);
this._highlightedDateNode = null;
    },

    /**
     * Handler for keyboard press on a calendar grid
     * @method _keydownCalendar
     * @protected
     */
    _keydownCalendar : function (ev) {
        _yuitest_coverfunc("build/calendar/calendar.js", "_keydownCalendar", 175);
_yuitest_coverline("build/calendar/calendar.js", 176);
var gridNum = this._getGridNumber(ev.target),
            curDate = !this._highlightedDateNode ? null : this._nodeToDate(this._highlightedDateNode),
            keyCode = ev.keyCode,
            dayNum = 0,
            dir = '',
            selMode,
            newDate,
            startDate,
            endDate,
            lastPaneDate;

        _yuitest_coverline("build/calendar/calendar.js", 187);
switch(keyCode) {
            case KEY_DOWN:
                _yuitest_coverline("build/calendar/calendar.js", 189);
dayNum = 7;
                _yuitest_coverline("build/calendar/calendar.js", 190);
dir = 's';
                _yuitest_coverline("build/calendar/calendar.js", 191);
break;
            case KEY_UP:
                _yuitest_coverline("build/calendar/calendar.js", 193);
dayNum = -7;
                _yuitest_coverline("build/calendar/calendar.js", 194);
dir = 'n';
                _yuitest_coverline("build/calendar/calendar.js", 195);
break;
            case KEY_LEFT:
                _yuitest_coverline("build/calendar/calendar.js", 197);
dayNum = -1;
                _yuitest_coverline("build/calendar/calendar.js", 198);
dir = 'w';
                _yuitest_coverline("build/calendar/calendar.js", 199);
break;
            case KEY_RIGHT:
                _yuitest_coverline("build/calendar/calendar.js", 201);
dayNum = 1;
                _yuitest_coverline("build/calendar/calendar.js", 202);
dir = 'e';
                _yuitest_coverline("build/calendar/calendar.js", 203);
break;
            case KEY_SPACE: case KEY_ENTER:
                _yuitest_coverline("build/calendar/calendar.js", 205);
ev.preventDefault();
                _yuitest_coverline("build/calendar/calendar.js", 206);
if (this._highlightedDateNode) {
                    _yuitest_coverline("build/calendar/calendar.js", 207);
selMode = this.get("selectionMode");
                    _yuitest_coverline("build/calendar/calendar.js", 208);
if (selMode === "single" && !this._highlightedDateNode.hasClass(CAL_DAY_SELECTED)) {
                            _yuitest_coverline("build/calendar/calendar.js", 209);
this._clearSelection(true);
                            _yuitest_coverline("build/calendar/calendar.js", 210);
this._addDateToSelection(curDate);
                    } else {_yuitest_coverline("build/calendar/calendar.js", 211);
if (selMode === "multiple" || selMode === "multiple-sticky") {
                        _yuitest_coverline("build/calendar/calendar.js", 212);
if (this._highlightedDateNode.hasClass(CAL_DAY_SELECTED)) {
                            _yuitest_coverline("build/calendar/calendar.js", 213);
this._removeDateFromSelection(curDate);
                        } else {
                            _yuitest_coverline("build/calendar/calendar.js", 215);
this._addDateToSelection(curDate);
                        }
                    }}
                }
                _yuitest_coverline("build/calendar/calendar.js", 219);
break;
        }


        _yuitest_coverline("build/calendar/calendar.js", 223);
if (keyCode === KEY_DOWN || keyCode === KEY_UP || keyCode === KEY_LEFT || keyCode === KEY_RIGHT) {

            _yuitest_coverline("build/calendar/calendar.js", 225);
if (!curDate) {
                _yuitest_coverline("build/calendar/calendar.js", 226);
curDate = ydate.addMonths(this.get("date"), gridNum);
                _yuitest_coverline("build/calendar/calendar.js", 227);
dayNum = 0;
            }

            _yuitest_coverline("build/calendar/calendar.js", 230);
ev.preventDefault();

            _yuitest_coverline("build/calendar/calendar.js", 232);
newDate = ydate.addDays(curDate, dayNum);
            _yuitest_coverline("build/calendar/calendar.js", 233);
startDate = this.get("date");
            _yuitest_coverline("build/calendar/calendar.js", 234);
endDate = ydate.addMonths(this.get("date"), this._paneNumber - 1);
            _yuitest_coverline("build/calendar/calendar.js", 235);
lastPaneDate = new Date(endDate);
            _yuitest_coverline("build/calendar/calendar.js", 236);
endDate.setDate(ydate.daysInMonth(endDate));

            _yuitest_coverline("build/calendar/calendar.js", 238);
if (ydate.isInRange(newDate, startDate, endDate)) {
/*
                var paneShift = (newDate.getMonth() - curDate.getMonth()) % 10;

                if (paneShift != 0) {
                    var newGridNum = gridNum + paneShift,
                            contentBox = this.get('contentBox'),
                            newPane = contentBox.one("#" + this._calendarId + "_pane_" + newGridNum);
                            newPane.focus();
                }
*/
                _yuitest_coverline("build/calendar/calendar.js", 249);
this._highlightDateNode(newDate);
            } else {_yuitest_coverline("build/calendar/calendar.js", 250);
if (ydate.isGreater(startDate, newDate)) {
                _yuitest_coverline("build/calendar/calendar.js", 251);
if (!ydate.isGreaterOrEqual(this.get("minimumDate"), startDate)) {
                    _yuitest_coverline("build/calendar/calendar.js", 252);
this.set("date", ydate.addMonths(startDate, -1));
                    _yuitest_coverline("build/calendar/calendar.js", 253);
this._highlightDateNode(newDate);
                }
            } else {_yuitest_coverline("build/calendar/calendar.js", 255);
if (ydate.isGreater(newDate, endDate)) {
                _yuitest_coverline("build/calendar/calendar.js", 256);
if (!ydate.isGreaterOrEqual(lastPaneDate, this.get("maximumDate"))) {
                    _yuitest_coverline("build/calendar/calendar.js", 257);
this.set("date", ydate.addMonths(startDate, 1));
                    _yuitest_coverline("build/calendar/calendar.js", 258);
this._highlightDateNode(newDate);
                }
            }}}
        }
    },

    /**
     * Handles the calendar clicks based on selection mode.
     * @method _clickCalendar
     * @param {Event} ev A click event
     * @private
     */
    _clickCalendar : function (ev) {
        _yuitest_coverfunc("build/calendar/calendar.js", "_clickCalendar", 270);
_yuitest_coverline("build/calendar/calendar.js", 271);
var clickedCell = ev.currentTarget,
            clickedCellIsDay = clickedCell.hasClass(CAL_DAY) &&
                                !clickedCell.hasClass(CAL_PREVMONTH_DAY) &&
                                !clickedCell.hasClass(CAL_NEXTMONTH_DAY),

        clickedCellIsSelected = clickedCell.hasClass(CAL_DAY_SELECTED),
        selectedDate;

        _yuitest_coverline("build/calendar/calendar.js", 279);
switch (this.get("selectionMode")) {
            case("single"):
                _yuitest_coverline("build/calendar/calendar.js", 281);
if (clickedCellIsDay) {
                    _yuitest_coverline("build/calendar/calendar.js", 282);
if (!clickedCellIsSelected) {
                        _yuitest_coverline("build/calendar/calendar.js", 283);
this._clearSelection(true);
                        _yuitest_coverline("build/calendar/calendar.js", 284);
this._addDateToSelection(this._nodeToDate(clickedCell));
                    }
                }
                _yuitest_coverline("build/calendar/calendar.js", 287);
break;
            case("multiple-sticky"):
                _yuitest_coverline("build/calendar/calendar.js", 289);
if (clickedCellIsDay) {
                    _yuitest_coverline("build/calendar/calendar.js", 290);
if (clickedCellIsSelected) {
                        _yuitest_coverline("build/calendar/calendar.js", 291);
this._removeDateFromSelection(this._nodeToDate(clickedCell));
                    } else {
                        _yuitest_coverline("build/calendar/calendar.js", 293);
this._addDateToSelection(this._nodeToDate(clickedCell));
                    }
                }
                _yuitest_coverline("build/calendar/calendar.js", 296);
break;
            case("multiple"):
                _yuitest_coverline("build/calendar/calendar.js", 298);
if (clickedCellIsDay) {
                    _yuitest_coverline("build/calendar/calendar.js", 299);
if (!ev.metaKey && !ev.ctrlKey && !ev.shiftKey) {
                        _yuitest_coverline("build/calendar/calendar.js", 300);
this._clearSelection(true);
                        _yuitest_coverline("build/calendar/calendar.js", 301);
this._lastSelectedDate = this._nodeToDate(clickedCell);
                        _yuitest_coverline("build/calendar/calendar.js", 302);
this._addDateToSelection(this._lastSelectedDate);
                    } else {_yuitest_coverline("build/calendar/calendar.js", 303);
if (((os === 'macintosh' && ev.metaKey) || (os !== 'macintosh' && ev.ctrlKey)) && !ev.shiftKey) {
                        _yuitest_coverline("build/calendar/calendar.js", 304);
if (clickedCellIsSelected) {
                            _yuitest_coverline("build/calendar/calendar.js", 305);
this._removeDateFromSelection(this._nodeToDate(clickedCell));
                            _yuitest_coverline("build/calendar/calendar.js", 306);
this._lastSelectedDate = null;
                        } else {
                            _yuitest_coverline("build/calendar/calendar.js", 308);
this._lastSelectedDate = this._nodeToDate(clickedCell);
                            _yuitest_coverline("build/calendar/calendar.js", 309);
this._addDateToSelection(this._lastSelectedDate);
                        }
                    } else {_yuitest_coverline("build/calendar/calendar.js", 311);
if (((os === 'macintosh' && ev.metaKey) || (os !== 'macintosh' && ev.ctrlKey)) && ev.shiftKey) {
                        _yuitest_coverline("build/calendar/calendar.js", 312);
if (this._lastSelectedDate) {
                            _yuitest_coverline("build/calendar/calendar.js", 313);
selectedDate = this._nodeToDate(clickedCell);
                            _yuitest_coverline("build/calendar/calendar.js", 314);
this._addDateRangeToSelection(selectedDate, this._lastSelectedDate);
                            _yuitest_coverline("build/calendar/calendar.js", 315);
this._lastSelectedDate = selectedDate;
                        } else {
                            _yuitest_coverline("build/calendar/calendar.js", 317);
this._lastSelectedDate = this._nodeToDate(clickedCell);
                            _yuitest_coverline("build/calendar/calendar.js", 318);
this._addDateToSelection(this._lastSelectedDate);
                        }
                    } else {_yuitest_coverline("build/calendar/calendar.js", 320);
if (ev.shiftKey) {
                        _yuitest_coverline("build/calendar/calendar.js", 321);
if (this._lastSelectedDate) {
                            _yuitest_coverline("build/calendar/calendar.js", 322);
selectedDate = this._nodeToDate(clickedCell);
                            _yuitest_coverline("build/calendar/calendar.js", 323);
this._clearSelection(true);
                            _yuitest_coverline("build/calendar/calendar.js", 324);
this._addDateRangeToSelection(selectedDate, this._lastSelectedDate);
                            _yuitest_coverline("build/calendar/calendar.js", 325);
this._lastSelectedDate = selectedDate;
                        } else {
                            _yuitest_coverline("build/calendar/calendar.js", 327);
this._clearSelection(true);
                            _yuitest_coverline("build/calendar/calendar.js", 328);
this._lastSelectedDate = this._nodeToDate(clickedCell);
                            _yuitest_coverline("build/calendar/calendar.js", 329);
this._addDateToSelection(this._lastSelectedDate);
                        }
                    }}}}
                }
                _yuitest_coverline("build/calendar/calendar.js", 333);
break;
        }

        _yuitest_coverline("build/calendar/calendar.js", 336);
if (clickedCellIsDay) {
            /**
            * Fired when a specific date cell in the calendar is clicked. The event carries a
            * payload which includes a `cell` property corresponding to the node of the actual
            * date cell, and a `date` property, with the `Date` that was clicked.
            *
            * @event dateClick
            */
            _yuitest_coverline("build/calendar/calendar.js", 344);
this.fire("dateClick", {cell: clickedCell, date: this._nodeToDate(clickedCell)});
        } else {_yuitest_coverline("build/calendar/calendar.js", 345);
if (clickedCell.hasClass(CAL_PREVMONTH_DAY)) {
            /**
            * Fired when any of the previous month's days displayed before the calendar grid
            * are clicked.
            *
            * @event prevMonthClick
            */
            _yuitest_coverline("build/calendar/calendar.js", 352);
this.fire("prevMonthClick");
        } else {_yuitest_coverline("build/calendar/calendar.js", 353);
if (clickedCell.hasClass(CAL_NEXTMONTH_DAY)) {
            /**
            * Fired when any of the next month's days displayed after the calendar grid
            * are clicked.
            *
            * @event nextMonthClick
            */
            _yuitest_coverline("build/calendar/calendar.js", 360);
this.fire("nextMonthClick");
        }}}
    },

    /**
     * Subtracts one month from the current calendar view.
     * @method subtractMonth
     * @return {Calendar} A reference to this object
     * @chainable
     */
    subtractMonth : function (e) {
        _yuitest_coverfunc("build/calendar/calendar.js", "subtractMonth", 370);
_yuitest_coverline("build/calendar/calendar.js", 371);
this.set("date", ydate.addMonths(this.get("date"), -1));
        _yuitest_coverline("build/calendar/calendar.js", 372);
if (e) {
            _yuitest_coverline("build/calendar/calendar.js", 373);
e.halt();
        }
        _yuitest_coverline("build/calendar/calendar.js", 375);
return this;
    },

    /**
     * Subtracts one year from the current calendar view.
     * @method subtractYear
     * @return {Calendar} A reference to this object
     * @chainable
     */
    subtractYear : function (e) {
        _yuitest_coverfunc("build/calendar/calendar.js", "subtractYear", 384);
_yuitest_coverline("build/calendar/calendar.js", 385);
this.set("date", ydate.addYears(this.get("date"), -1));
        _yuitest_coverline("build/calendar/calendar.js", 386);
if (e) {
            _yuitest_coverline("build/calendar/calendar.js", 387);
e.halt();
        }
        _yuitest_coverline("build/calendar/calendar.js", 389);
return this;
    },

    /**
     * Adds one month to the current calendar view.
     * @method addMonth
     * @return {Calendar} A reference to this object
     * @chainable
     */
    addMonth : function (e) {
        _yuitest_coverfunc("build/calendar/calendar.js", "addMonth", 398);
_yuitest_coverline("build/calendar/calendar.js", 399);
this.set("date", ydate.addMonths(this.get("date"), 1));
        _yuitest_coverline("build/calendar/calendar.js", 400);
if (e) {
            _yuitest_coverline("build/calendar/calendar.js", 401);
e.halt();
        }
        _yuitest_coverline("build/calendar/calendar.js", 403);
return this;
    },

    /**
     * Adds one year to the current calendar view.
     * @method addYear
     * @return {Calendar} A reference to this object
     * @chainable
     */
    addYear : function (e) {
        _yuitest_coverfunc("build/calendar/calendar.js", "addYear", 412);
_yuitest_coverline("build/calendar/calendar.js", 413);
this.set("date", ydate.addYears(this.get("date"), 1));
        _yuitest_coverline("build/calendar/calendar.js", 414);
if (e) {
            _yuitest_coverline("build/calendar/calendar.js", 415);
e.halt();
        }
        _yuitest_coverline("build/calendar/calendar.js", 417);
return this;
    }
}, {
    /**
    * The identity of the widget.
    *
    * @property NAME
    * @type String
    * @default 'calendar'
    * @readOnly
    * @protected
    * @static
    */
    NAME: "calendar",

    /**
    * Static property used to define the default attribute configuration of
    * the Widget.
    *
    * @property ATTRS
    * @type {Object}
    * @protected
    * @static
    */
    ATTRS: {

        /**
         * A setting specifying the type of selection the calendar allows.
         * Possible values include:
         * <ul>
         *   <li>`single` - One date at a time</li>
         *   <li>`multiple-sticky` - Multiple dates, selected one at a time (the dates "stick"). This option
         *   is appropriate for mobile devices, where function keys from the keyboard are not available.</li>
         *   <li>`multiple` - Multiple dates, selected with Ctrl/Meta keys for additional single
         *   dates, and Shift key for date ranges.</li>
         *
         * @attribute selectionMode
         * @type String
         * @default single
         */
        selectionMode: {
            value: "single"
        },

        /**
         * The date corresponding to the current calendar view. Always
         * normalized to the first of the month that contains the date
         * at assignment time. Used as the first date visible in the
         * calendar.
         *
         * @attribute date
         * @type Date
         * @default Today's date as set on the user's computer.
         */
        date: {
            value: new Date(),
            lazyAdd: false,
            setter: function (val) {

                _yuitest_coverfunc("build/calendar/calendar.js", "setter", 474);
_yuitest_coverline("build/calendar/calendar.js", 476);
var newDate = this._normalizeDate(val),
                    newTopDate = ydate.addMonths(newDate, this._paneNumber - 1),
                    minDate = this.get("minimumDate"),
                    maxDate = this.get("maximumDate"),
                    actualMaxDate;

                _yuitest_coverline("build/calendar/calendar.js", 482);
if ((!minDate || ydate.isGreaterOrEqual(newDate, minDate)) &&
                        (!maxDate || ydate.isGreaterOrEqual(maxDate, newTopDate))
                ) {
                    _yuitest_coverline("build/calendar/calendar.js", 485);
return newDate;
                } else {_yuitest_coverline("build/calendar/calendar.js", 486);
if (minDate && ydate.isGreater(minDate, newDate)) {
                    _yuitest_coverline("build/calendar/calendar.js", 487);
return minDate;
                } else {_yuitest_coverline("build/calendar/calendar.js", 488);
if (maxDate && ydate.isGreater(newTopDate, maxDate)) {
                    _yuitest_coverline("build/calendar/calendar.js", 489);
actualMaxDate = ydate.addMonths(maxDate, -1*(this._paneNumber - 1));
                    _yuitest_coverline("build/calendar/calendar.js", 490);
return actualMaxDate;
                }}}
            }
        },

        /**
         * The minimum date that can be displayed by the calendar. The calendar will not
         * allow dates earlier than this one to be set, and will reset any earlier date to
         * this date. Should be `null` if no minimum date is needed.
         *
         * @attribute minimumDate
         * @type Date
         * @default null
         */
        minimumDate: {
            value: null,
            setter: function (val) {
                _yuitest_coverfunc("build/calendar/calendar.js", "setter", 506);
_yuitest_coverline("build/calendar/calendar.js", 507);
if (val) {
                    _yuitest_coverline("build/calendar/calendar.js", 508);
var curDate = this.get('date'),
                        newMinDate = this._normalizeDate(val);
                    _yuitest_coverline("build/calendar/calendar.js", 510);
if (curDate && !ydate.isGreaterOrEqual(curDate, newMinDate)) {
                        _yuitest_coverline("build/calendar/calendar.js", 511);
this.set('date', newMinDate);
                    }
                    _yuitest_coverline("build/calendar/calendar.js", 513);
return newMinDate;
                } else {
                    _yuitest_coverline("build/calendar/calendar.js", 515);
return this._normalizeDate(val);
                }
            }
        },

        /**
         * The maximum date that can be displayed by the calendar. The calendar will not
         * allow dates later than this one to be set, and will reset any later date to
         * this date. Should be `null` if no maximum date is needed.
         *
         * @attribute maximumDate
         * @type Date
         * @default null
         */
        maximumDate: {
            value: null,
            setter: function (val) {
                _yuitest_coverfunc("build/calendar/calendar.js", "setter", 531);
_yuitest_coverline("build/calendar/calendar.js", 532);
if (val) {
                    _yuitest_coverline("build/calendar/calendar.js", 533);
var curDate = this.get('date'),
                        newMaxDate = this._normalizeDate(val);
                    _yuitest_coverline("build/calendar/calendar.js", 535);
if (curDate && !ydate.isGreaterOrEqual(val, ydate.addMonths(curDate, this._paneNumber - 1))) {
                        _yuitest_coverline("build/calendar/calendar.js", 536);
this.set('date', ydate.addMonths(newMaxDate, -1*(this._paneNumber -1)));
                    }
                    _yuitest_coverline("build/calendar/calendar.js", 538);
return newMaxDate;
                } else {
                    _yuitest_coverline("build/calendar/calendar.js", 540);
return val;
                }
            }
        }
    }
});

}, '@VERSION@', {
    "requires": [
        "calendar-base",
        "calendarnavigator"
    ],
    "lang": [
        "de",
        "en",
        "es",
        "es-AR",
        "fr",
        "it",
        "ja",
        "nb-NO",
        "nl",
        "pt-BR",
        "ru",
        "zh-HANT-TW"
    ],
    "skinnable": true
});
