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
_yuitest_coverage["build/calendar-base/calendar-base.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/calendar-base/calendar-base.js",
    code: []
};
_yuitest_coverage["build/calendar-base/calendar-base.js"].code=["YUI.add('calendar-base', function (Y, NAME) {","","/**"," * The CalendarBase submodule is a basic UI calendar view that displays"," * a range of dates in a two-dimensional month grid, with one or more"," * months visible at a single time. CalendarBase supports custom date"," * rendering, multiple calendar panes, and selection."," * @module calendar"," * @submodule calendar-base"," */","","var getCN                 = Y.ClassNameManager.getClassName,","    CALENDAR              = 'calendar',","    CAL_GRID              = getCN(CALENDAR, 'grid'),","    CAL_LEFT_GRID         = getCN(CALENDAR, 'left-grid'),","    CAL_RIGHT_GRID        = getCN(CALENDAR, 'right-grid'),","    CAL_BODY              = getCN(CALENDAR, 'body'),","    CAL_HD                = getCN(CALENDAR, 'header'),","    CAL_HD_LABEL          = getCN(CALENDAR, 'header-label'),","    CAL_WDAYROW           = getCN(CALENDAR, 'weekdayrow'),","    CAL_WDAY              = getCN(CALENDAR, 'weekday'),","    CAL_COL_HIDDEN        = getCN(CALENDAR, 'column-hidden'),","    CAL_DAY_SELECTED      = getCN(CALENDAR, 'day-selected'),","    SELECTION_DISABLED    = getCN(CALENDAR, 'selection-disabled'),","    CAL_ROW               = getCN(CALENDAR, 'row'),","    CAL_DAY               = getCN(CALENDAR, 'day'),","    CAL_PREVMONTH_DAY     = getCN(CALENDAR, 'prevmonth-day'),","    CAL_NEXTMONTH_DAY     = getCN(CALENDAR, 'nextmonth-day'),","    CAL_ANCHOR            = getCN(CALENDAR, 'anchor'),","    CAL_PANE              = getCN(CALENDAR, 'pane'),","    CAL_STATUS            = getCN(CALENDAR, 'status'),","    L           = Y.Lang,","    substitute  = L.sub,","    arrayEach   = Y.Array.each,","    objEach     = Y.Object.each,","    iOf         = Y.Array.indexOf,","    hasKey      = Y.Object.hasKey,","    setVal      = Y.Object.setValue,","    isEmpty     = Y.Object.isEmpty,","    ydate       = Y.DataType.Date;","","/** Create a calendar view to represent a single or multiple","    * month range of dates, rendered as a grid with date and","    * weekday labels.","    *","    * @class CalendarBase","    * @extends Widget","    * @param config {Object} Configuration object (see Configuration","    * attributes)","    * @constructor","    */","function CalendarBase() {","    CalendarBase.superclass.constructor.apply ( this, arguments );","}","","","","Y.CalendarBase = Y.extend( CalendarBase, Y.Widget, {","","    /**","     * A storage for various properties of individual month","     * panes.","     *","     * @property _paneProperties","     * @type Object","     * @private","     */","    _paneProperties : {},","","    /**","     * The number of month panes in the calendar, deduced","     * from the CONTENT_TEMPLATE's number of {calendar_grid}","     * tokens.","     *","     * @property _paneNumber","     * @type Number","     * @private","     */","    _paneNumber : 1,","","    /**","     * The unique id used to prefix various elements of this","     * calendar instance.","     *","     * @property _calendarId","     * @type String","     * @private","     */","    _calendarId : null,","","    /**","     * The hash map of selected dates, populated with","     * selectDates() and deselectDates() methods","     *","     * @property _selectedDates","     * @type Object","     * @private","     */","    _selectedDates : {},","","    /**","     * A private copy of the rules object, populated","     * by setting the customRenderer attribute.","     *","     * @property _rules","     * @type Object","     * @private","     */","    _rules : {},","","    /**","     * A private copy of the filterFunction, populated","     * by setting the customRenderer attribute.","     *","     * @property _filterFunction","     * @type Function","     * @private","     */","    _filterFunction : null,","","    /**","     * Storage for calendar cells modified by any custom","     * formatting. The storage is cleared, used to restore","     * cells to the original state, and repopulated accordingly","     * when the calendar is rerendered.","     *","     * @property _storedDateCells","     * @type Object","     * @private","     */","    _storedDateCells : {},","","    /**","     * Designated initializer","     * Initializes instance-level properties of","     * calendar.","     *","     * @method initializer","     */","    initializer : function () {","        this._paneProperties = {};","        this._calendarId = Y.guid('calendar');","        this._selectedDates = {};","        if (isEmpty(this._rules)) {","             this._rules = {};","        }","        this._storedDateCells = {};","    },","","    /**","     * renderUI implementation","     *","     * Creates a visual representation of the calendar based on existing parameters.","     * @method renderUI","     */","    renderUI : function () {","","        var contentBox = this.get('contentBox');","        contentBox.appendChild(this._initCalendarHTML(this.get('date')));","","        if (this.get('showPrevMonth')) {","                this._afterShowPrevMonthChange();","        }","        if (this.get('showNextMonth')) {","                this._afterShowNextMonthChange();","        }","","        this._renderCustomRules();","        this._renderSelectedDates();","","        this.get(\"boundingBox\").setAttribute(\"aria-labelledby\", this._calendarId + \"_header\");","","    },","","    /**","     * bindUI implementation","     *","     * Assigns listeners to relevant events that change the state","     * of the calendar.","     * @method bindUI","     */","    bindUI : function () {","        this.after('dateChange', this._afterDateChange);","        this.after('showPrevMonthChange', this._afterShowPrevMonthChange);","        this.after('showNextMonthChange', this._afterShowNextMonthChange);","        this.after('headerRendererChange', this._afterHeaderRendererChange);","        this.after('customRendererChange', this._afterCustomRendererChange);","        this.after('enabledDatesRuleChange', this._afterCustomRendererChange);","        this.after('disabledDatesRuleChange', this._afterCustomRendererChange);","        this.after('focusedChange', this._afterFocusedChange);","        this.after('selectionChange', this._renderSelectedDates);","        this._bindCalendarEvents();","    },","","","    /**","     * An internal utility method that generates a list of selected dates","     * from the hash storage.","     *","     * @method _getSelectedDatesList","     * @protected","     * @return {Array} The array of `Date`s that are currently selected.","     */","    _getSelectedDatesList : function () {","        var output = [];","","        objEach (this._selectedDates, function (year) {","            objEach (year, function (month) {","                objEach (month, function (day) {","                    output.push (day);","                }, this);","            }, this);","        }, this);","","        return output;","    },","","    /**","     * A utility method that returns all dates selected in a specific month.","     *","     * @method _getSelectedDatesInMonth","     * @param {Date} oDate corresponding to the month for which selected dates","     * are requested.","     * @protected","     * @return {Array} The array of `Date`s in a given month that are currently selected.","     */","    _getSelectedDatesInMonth : function (oDate) {","        var year = oDate.getFullYear(),","            month = oDate.getMonth();","","        if (hasKey(this._selectedDates, year) && hasKey(this._selectedDates[year], month)) {","            return Y.Object.values(this._selectedDates[year][month]);","        } else {","            return [];","        }","    },","","","    /**","     * An internal parsing method that receives a String list of numbers","     * and number ranges (of the form \"1,2,3,4-6,7-9,10,11\" etc.) and checks","     * whether a specific number is included in this list. Used for looking","     * up dates in the customRenderer rule set.","     *","     * @method _isNumInList","     * @param {Number} num The number to look for in a list.","     * @param {String} strList The list of numbers of the form \"1,2,3,4-6,7-8,9\", etc.","     * @private","     * @return {boolean} Returns true if the given number is in the given list.","     */","    _isNumInList : function (num, strList) {","        if (strList === \"all\") {","            return true;","        } else {","            var elements = strList.split(\",\"),","                i = elements.length,","                range;","","            while (i--) {","                range = elements[i].split(\"-\");","                if (range.length === 2 && num >= parseInt(range[0], 10) && num <= parseInt(range[1], 10)) {","                    return true;","                }","                else if (range.length === 1 && (parseInt(elements[i], 10) === num)) {","                    return true;","                }","            }","            return false;","        }","    },","","    /**","     * Given a specific date, returns an array of rules (from the customRenderer rule set)","     * that the given date matches.","     *","     * @method _getRulesForDate","     * @param {Date} oDate The date for which an array of rules is needed","     * @private","     * @return {Array} Returns an array of `String`s, each containg the name of","     * a rule that the given date matches.","     */","    _getRulesForDate : function (oDate) {","        var year = oDate.getFullYear(),","                month = oDate.getMonth(),","                date = oDate.getDate(),","                wday = oDate.getDay(),","                rules = this._rules,","                outputRules = [],","                years, months, dates, days;","","        for (years in rules) {","            if (this._isNumInList(year, years)) {","                if (L.isString(rules[years])) {","                        outputRules.push(rules[years]);","                }","                else {","                    for (months in rules[years]) {","                        if (this._isNumInList(month, months)) {","                            if (L.isString(rules[years][months])) {","                                    outputRules.push(rules[years][months]);","                            }","                            else {","                                for (dates in rules[years][months]) {","                                    if (this._isNumInList(date, dates)) {","                                        if (L.isString(rules[years][months][dates])) {","                                                outputRules.push(rules[years][months][dates]);","                                        }","                                        else {","                                            for (days in rules[years][months][dates]) {","                                                if (this._isNumInList(wday, days)) {","                                                    if (L.isString(rules[years][months][dates][days])) {","                                                        outputRules.push(rules[years][months][dates][days]);","                                                    }","                                                }","                                            }","                                        }","                                    }","                                }","                            }","                        }","                    }","                }","            }","        }","        return outputRules;","    },","","    /**","     * A utility method which, given a specific date and a name of the rule,","     * checks whether the date matches the given rule.","     *","     * @method _matchesRule","     * @param {Date} oDate The date to check","     * @param {String} rule The name of the rule that the date should match.","     * @private","     * @return {boolean} Returns true if the date matches the given rule.","     *","     */","    _matchesRule : function (oDate, rule) {","        return (iOf(this._getRulesForDate(oDate), rule) >= 0);","    },","","    /**","     * A utility method which checks whether a given date matches the `enabledDatesRule`","     * or does not match the `disabledDatesRule` and therefore whether it can be selected.","     * @method _canBeSelected","     * @param {Date} oDate The date to check","     * @private","     * @return {boolean} Returns true if the date can be selected; false otherwise.","     */","    _canBeSelected : function (oDate) {","","        var enabledDatesRule = this.get(\"enabledDatesRule\"),","            disabledDatesRule = this.get(\"disabledDatesRule\");","","        if (enabledDatesRule) {","            return this._matchesRule(oDate, enabledDatesRule);","        } else if (disabledDatesRule) {","            return !this._matchesRule(oDate, disabledDatesRule);","        } else {","            return true;","        }","    },","","    /**","     * Selects a given date or array of dates.","     * @method selectDates","     * @param {Date|Array} dates A `Date` or `Array` of `Date`s.","     * @return {CalendarBase} A reference to this object","     * @chainable","     */","    selectDates : function (dates) {","        if (ydate.isValidDate(dates)) {","            this._addDateToSelection(dates);","        }","        else if (L.isArray(dates)) {","            this._addDatesToSelection(dates);","        }","        return this;","    },","","    /**","     * Deselects a given date or array of dates, or deselects","     * all dates if no argument is specified.","     * @method deselectDates","     * @param {Date|Array} [dates] A `Date` or `Array` of `Date`s, or no","     * argument if all dates should be deselected.","     * @return {CalendarBase} A reference to this object","     * @chainable","     */","    deselectDates : function (dates) {","        if (!dates) {","            this._clearSelection();","        }","        else if (ydate.isValidDate(dates)) {","            this._removeDateFromSelection(dates);","        }","        else if (L.isArray(dates)) {","            this._removeDatesFromSelection(dates);","        }","        return this;","    },","","    /**","     * A utility method that adds a given date to selection..","     * @method _addDateToSelection","     * @param {Date} oDate The date to add to selection.","     * @param {Number} [index] An optional parameter that is used","     * to differentiate between individual date selections and multiple","     * date selections.","     * @private","     */","    _addDateToSelection : function (oDate, index) {","","        if (this._canBeSelected(oDate)) {","","            var year = oDate.getFullYear(),","                month = oDate.getMonth(),","                day = oDate.getDate();","","            if (hasKey(this._selectedDates, year)) {","                if (hasKey(this._selectedDates[year], month)) {","                    this._selectedDates[year][month][day] = oDate;","                } else {","                    this._selectedDates[year][month] = {};","                    this._selectedDates[year][month][day] = oDate;","                }","            } else {","                this._selectedDates[year] = {};","                this._selectedDates[year][month] = {};","                this._selectedDates[year][month][day] = oDate;","            }","","            this._selectedDates = setVal(this._selectedDates, [year, month, day], oDate);","","            if (!index) {","                this._fireSelectionChange();","            }","        }","    },","","    /**","     * A utility method that adds a given list of dates to selection.","     * @method _addDatesToSelection","     * @param {Array} datesArray The list of dates to add to selection.","     * @private","     */","    _addDatesToSelection : function (datesArray) {","        arrayEach(datesArray, this._addDateToSelection, this);","        this._fireSelectionChange();","    },","","    /**","     * A utility method that adds a given range of dates to selection.","     * @method _addDateRangeToSelection","     * @param {Date} startDate The first date of the given range.","     * @param {Date} endDate The last date of the given range.","     * @private","     */","    _addDateRangeToSelection : function (startDate, endDate) {","","        var timezoneDifference = (endDate.getTimezoneOffset() - startDate.getTimezoneOffset())*60000,","            startTime = startDate.getTime(),","            endTime   = endDate.getTime(),","            tempTime,","            time,","            addedDate;","","        if (startTime > endTime) {","            tempTime = startTime;","            startTime = endTime;","            endTime = tempTime + timezoneDifference;","        } else {","            endTime = endTime - timezoneDifference;","        }","","","        for (time = startTime; time <= endTime; time += 86400000) {","            addedDate = new Date(time);","            addedDate.setHours(12);","            this._addDateToSelection(addedDate, time);","        }","        this._fireSelectionChange();","    },","","    /**","     * A utility method that removes a given date from selection..","     * @method _removeDateFromSelection","     * @param {Date} oDate The date to remove from selection.","     * @param {Number} [index] An optional parameter that is used","     * to differentiate between individual date selections and multiple","     * date selections.","     * @private","     */","    _removeDateFromSelection : function (oDate, index) {","        var year = oDate.getFullYear(),","            month = oDate.getMonth(),","            day = oDate.getDate();","","        if (hasKey(this._selectedDates, year) &&","            hasKey(this._selectedDates[year], month) &&","            hasKey(this._selectedDates[year][month], day)","        ) {","            delete this._selectedDates[year][month][day];","            if (!index) {","                this._fireSelectionChange();","            }","        }","    },","","    /**","     * A utility method that removes a given list of dates from selection.","     * @method _removeDatesFromSelection","     * @param {Array} datesArray The list of dates to remove from selection.","     * @private","     */","    _removeDatesFromSelection : function (datesArray) {","        arrayEach(datesArray, this._removeDateFromSelection, this);","        this._fireSelectionChange();","    },","","    /**","     * A utility method that removes a given range of dates from selection.","     * @method _removeDateRangeFromSelection","     * @param {Date} startDate The first date of the given range.","     * @param {Date} endDate The last date of the given range.","     * @private","     */","    _removeDateRangeFromSelection : function (startDate, endDate) {","        var startTime = startDate.getTime(),","            endTime   = endDate.getTime(),","            time;","","        for (time = startTime; time <= endTime; time += 86400000) {","            this._removeDateFromSelection(new Date(time), time);","        }","","        this._fireSelectionChange();","    },","","    /**","     * A utility method that removes all dates from selection.","     * @method _clearSelection","     * @param {boolean} noevent A Boolean specifying whether a selectionChange","     * event should be fired. If true, the event is not fired.","     * @private","     */","    _clearSelection : function (noevent) {","        this._selectedDates = {};","        this.get(\"contentBox\").all(\".\" + CAL_DAY_SELECTED).removeClass(CAL_DAY_SELECTED).setAttribute(\"aria-selected\", false);","        if (!noevent) {","            this._fireSelectionChange();","        }","    },","","    /**","     * A utility method that fires a selectionChange event.","     * @method _fireSelectionChange","     * @private","     */","    _fireSelectionChange : function () {","","        /**","        * Fired when the set of selected dates changes. Contains a payload with","        * a `newSelection` property with an array of selected dates.","        *","        * @event selectionChange","        */","        this.fire(\"selectionChange\", {newSelection: this._getSelectedDatesList()});","    },","","    /**","     * A utility method that restores cells modified by custom formatting.","     * @method _restoreModifiedCells","     * @private","     */","    _restoreModifiedCells : function () {","        var contentbox = this.get(\"contentBox\"),","            id;","        for (id in this._storedDateCells) {","            contentbox.one(\"#\" + id).replace(this._storedDateCells[id]);","            delete this._storedDateCells[id];","        }","    },","","    /**","     * A rendering assist method that renders all cells modified by the customRenderer","     * rules, as well as the enabledDatesRule and disabledDatesRule.","     * @method _renderCustomRules","     * @private","     */","    _renderCustomRules : function () {","","        this.get(\"contentBox\").all(\".\" + CAL_DAY + \",.\" + CAL_NEXTMONTH_DAY).removeClass(SELECTION_DISABLED).setAttribute(\"aria-disabled\", false);","","        if (!isEmpty(this._rules)) {","            var paneNum,","                paneDate,","                dateArray;","","            for (paneNum = 0; paneNum < this._paneNumber; paneNum++) {","                paneDate = ydate.addMonths(this.get(\"date\"), paneNum);","                dateArray = ydate.listOfDatesInMonth(paneDate);","                arrayEach(dateArray, Y.bind(this._renderCustomRulesHelper, this));","            }","        }","    },","","    /**","    * A handler for a date selection event (either a click or a keyboard","    *   selection) that adds the appropriate CSS class to a specific DOM","    *   node corresponding to the date and sets its aria-selected","    *   attribute to true.","    *","    * @method _renderCustomRulesHelper","    * @private","    */","    _renderCustomRulesHelper: function (date) {","        var enRule = this.get(\"enabledDatesRule\"),","            disRule = this.get(\"disabledDatesRule\"),","            matchingRules,","            dateNode;","","        matchingRules = this._getRulesForDate(date);","        if (matchingRules.length > 0) {","            dateNode = this._dateToNode(date);","            if ((enRule && iOf(matchingRules, enRule) < 0) || (!enRule && disRule && iOf(matchingRules, disRule) >= 0)) {","                dateNode.addClass(SELECTION_DISABLED).setAttribute(\"aria-disabled\", true);","            }","","            if (L.isFunction(this._filterFunction)) {","                this._storedDateCells[dateNode.get(\"id\")] = dateNode.cloneNode(true);","                this._filterFunction (date, dateNode, matchingRules);","            }","        } else if (enRule) {","             dateNode = this._dateToNode(date);","             dateNode.addClass(SELECTION_DISABLED).setAttribute(\"aria-disabled\", true);","        }","    },","","    /**","     * A rendering assist method that renders all cells that are currently selected.","     * @method _renderSelectedDates","     * @private","     */","    _renderSelectedDates : function () {","        this.get(\"contentBox\").all(\".\" + CAL_DAY_SELECTED).removeClass(CAL_DAY_SELECTED).setAttribute(\"aria-selected\", false);","","        var paneNum,","            paneDate,","            dateArray;","","        for (paneNum = 0; paneNum < this._paneNumber; paneNum++) {","            paneDate = ydate.addMonths(this.get(\"date\"), paneNum);","            dateArray = this._getSelectedDatesInMonth(paneDate);","","            arrayEach(dateArray, Y.bind(this._renderSelectedDatesHelper, this));","        }","    },","","    /**","    * Takes in a date and determines whether that date has any rules","    *   matching it in the customRenderer; then calls the specified","    *   filterFunction if that's the case and/or disables the date","    *   if the rule is specified as a disabledDatesRule.","    *","    * @method _renderSelectedDatesHelper","    * @private","    */","    _renderSelectedDatesHelper: function (date) {","        this._dateToNode(date).addClass(CAL_DAY_SELECTED).setAttribute(\"aria-selected\", true);","    },","","    /**","     * A utility method that converts a date to the node wrapping the calendar cell","     * the date corresponds to..","     * @method _dateToNode","     * @param {Date} oDate The date to convert to Node","     * @protected","     * @return {Node} The node wrapping the DOM element of the cell the date","     * corresponds to.","     */","    _dateToNode : function (oDate) {","        var day = oDate.getDate(),","            col = 0,","            daymod = day%7,","            paneNum = (12 + oDate.getMonth() - this.get(\"date\").getMonth()) % 12,","            paneId = this._calendarId + \"_pane_\" + paneNum,","            cutoffCol = this._paneProperties[paneId].cutoffCol;","","        switch (daymod) {","            case (0):","                if (cutoffCol >= 6) {","                    col = 12;","                } else {","                    col = 5;","                }","                break;","            case (1):","                    col = 6;","                break;","            case (2):","                if (cutoffCol > 0) {","                    col = 7;","                } else {","                    col = 0;","                }","                break;","            case (3):","                if (cutoffCol > 1) {","                    col = 8;","                } else {","                    col = 1;","                }","                break;","            case (4):","                if (cutoffCol > 2) {","                    col = 9;","                } else {","                    col = 2;","                }","                break;","            case (5):","                if (cutoffCol > 3) {","                    col = 10;","                } else {","                    col = 3;","                }","                break;","            case (6):","                if (cutoffCol > 4) {","                    col = 11;","                } else {","                    col = 4;","                }","                break;","        }","        return(this.get(\"contentBox\").one(\"#\" + this._calendarId + \"_pane_\" + paneNum + \"_\" + col + \"_\" + day));","","    },","","    /**","     * A utility method that converts a node corresponding to the DOM element of","     * the cell for a particular date to that date.","     * @method _nodeToDate","     * @param {Node} oNode The Node wrapping the DOM element of a particular date cell.","     * @protected","     * @return {Date} The date corresponding to the DOM element that the given node wraps.","     */","    _nodeToDate : function (oNode) {","","        var idParts = oNode.get(\"id\").split(\"_\").reverse(),","            paneNum = parseInt(idParts[2], 10),","            day  = parseInt(idParts[0], 10),","            shiftedDate = ydate.addMonths(this.get(\"date\"), paneNum),","            year = shiftedDate.getFullYear(),","            month = shiftedDate.getMonth();","","        return new Date(year, month, day, 12, 0, 0, 0);","    },","","    /**","     * A placeholder method, called from bindUI, to bind the Calendar events.","     * @method _bindCalendarEvents","     * @protected","     */","    _bindCalendarEvents : function () {},","","    /**","     * A utility method that normalizes a given date by converting it to the 1st","     * day of the month the date is in, with the time set to noon.","     * @method _normalizeDate","     * @param {Date} oDate The date to normalize","     * @protected","     * @return {Date} The normalized date, set to the first of the month, with time","     * set to noon.","     */","    _normalizeDate : function (date) {","        if (date) {","            return new Date(date.getFullYear(), date.getMonth(), 1, 12, 0, 0, 0);","        } else {","            return null;","        }","    },","","","    /**","     * A render assist utility method that computes the cutoff column for the calendar","     * rendering mask.","     * @method _getCutoffColumn","     * @param {Date} date The date of the month grid to compute the cutoff column for.","     * @param {Number} firstday The first day of the week (modified by internationalized calendars)","     * @private","     * @return {Number} The number of the cutoff column.","     */","    _getCutoffColumn : function (date, firstday) {","        var distance = this._normalizeDate(date).getDay() - firstday,","            cutOffColumn = 6 - (distance + 7) % 7;","        return cutOffColumn;","    },","","    /**","     * A render assist method that turns on the view of the previous month's dates","     * in a given calendar pane.","     * @method _turnPrevMonthOn","     * @param {Node} pane The calendar pane that needs its previous month's dates view","     * modified.","     * @protected","     */","    _turnPrevMonthOn : function (pane) {","        var pane_id = pane.get(\"id\"),","            pane_date = this._paneProperties[pane_id].paneDate,","            daysInPrevMonth = ydate.daysInMonth(ydate.addMonths(pane_date, -1)),","            cell;","","        if (!this._paneProperties[pane_id].hasOwnProperty(\"daysInPrevMonth\")) {","            this._paneProperties[pane_id].daysInPrevMonth = 0;","        }","","        if (daysInPrevMonth !== this._paneProperties[pane_id].daysInPrevMonth) {","","            this._paneProperties[pane_id].daysInPrevMonth = daysInPrevMonth;","","            for (cell = 5; cell >= 0; cell--) {","                pane.one(\"#\" + pane_id + \"_\" + cell + \"_\" + (cell-5)).set('text', daysInPrevMonth--);","            }","        }","    },","","    /**","     * A render assist method that turns off the view of the previous month's dates","     * in a given calendar pane.","     * @method _turnPrevMonthOff","     * @param {Node} pane The calendar pane that needs its previous month's dates view","     * modified.","     * @protected","     */","    _turnPrevMonthOff : function (pane) {","        var pane_id = pane.get(\"id\"),","            cell;","","        this._paneProperties[pane_id].daysInPrevMonth = 0;","","        for (cell = 5; cell >= 0; cell--) {","            pane.one(\"#\" + pane_id + \"_\" + cell + \"_\" + (cell-5)).setContent(\"&nbsp;\");","        }","    },","","    /**","     * A render assist method that cleans up the last few cells in the month grid","     * when the number of days in the month changes.","     * @method _cleanUpNextMonthCells","     * @param {Node} pane The calendar pane that needs the last date cells cleaned up.","     * @private","     */","    _cleanUpNextMonthCells : function (pane) {","        var pane_id = pane.get(\"id\");","            pane.one(\"#\" + pane_id + \"_6_29\").removeClass(CAL_NEXTMONTH_DAY);","            pane.one(\"#\" + pane_id + \"_7_30\").removeClass(CAL_NEXTMONTH_DAY);","            pane.one(\"#\" + pane_id + \"_8_31\").removeClass(CAL_NEXTMONTH_DAY);","            pane.one(\"#\" + pane_id + \"_0_30\").removeClass(CAL_NEXTMONTH_DAY);","            pane.one(\"#\" + pane_id + \"_1_31\").removeClass(CAL_NEXTMONTH_DAY);","    },","","    /**","     * A render assist method that turns on the view of the next month's dates","     * in a given calendar pane.","     * @method _turnNextMonthOn","     * @param {Node} pane The calendar pane that needs its next month's dates view","     * modified.","     * @protected","     */","    _turnNextMonthOn : function (pane) {","        var dayCounter = 1,","            pane_id = pane.get(\"id\"),","            daysInMonth = this._paneProperties[pane_id].daysInMonth,","            cutoffCol = this._paneProperties[pane_id].cutoffCol,","            cell,","            startingCell;","","        for (cell = daysInMonth - 22; cell < cutoffCol + 7; cell++) {","            pane.one(\"#\" + pane_id + \"_\" + cell + \"_\" + (cell+23)).set(\"text\", dayCounter++).addClass(CAL_NEXTMONTH_DAY);","        }","","        startingCell = cutoffCol;","","        if (daysInMonth === 31 && (cutoffCol <= 1)) {","            startingCell = 2;","        } else if (daysInMonth === 30 && cutoffCol === 0) {","            startingCell = 1;","        }","","        for (cell = startingCell ; cell < cutoffCol + 7; cell++) {","            pane.one(\"#\" + pane_id + \"_\" + cell + \"_\" + (cell+30)).set(\"text\", dayCounter++).addClass(CAL_NEXTMONTH_DAY);","        }","    },","","    /**","     * A render assist method that turns off the view of the next month's dates","     * in a given calendar pane.","     * @method _turnNextMonthOff","     * @param {Node} pane The calendar pane that needs its next month's dates view","     * modified.","     * @protected","     */","    _turnNextMonthOff : function (pane) {","            var pane_id = pane.get(\"id\"),","                daysInMonth = this._paneProperties[pane_id].daysInMonth,","                cutoffCol = this._paneProperties[pane_id].cutoffCol,","                cell,","                startingCell;","","            for (cell = daysInMonth - 22; cell <= 12; cell++) {","                pane.one(\"#\" + pane_id + \"_\" + cell + \"_\" + (cell+23)).setContent(\"&nbsp;\").addClass(CAL_NEXTMONTH_DAY);","            }","","            startingCell = 0;","","            if (daysInMonth === 31 && (cutoffCol <= 1)) {","                startingCell = 2;","            } else if (daysInMonth === 30 && cutoffCol === 0) {","                startingCell = 1;","            }","","            for (cell = startingCell ; cell <= 12; cell++) {","                pane.one(\"#\" + pane_id + \"_\" + cell + \"_\" + (cell+30)).setContent(\"&nbsp;\").addClass(CAL_NEXTMONTH_DAY);","            }","    },","","    /**","     * The handler for the change in the showNextMonth attribute.","     * @method _afterShowNextMonthChange","     * @private","     */","    _afterShowNextMonthChange : function () {","","        var contentBox = this.get('contentBox'),","            lastPane = contentBox.one(\"#\" + this._calendarId + \"_pane_\" + (this._paneNumber - 1));","","        this._cleanUpNextMonthCells(lastPane);","","        if (this.get('showNextMonth')) {","            this._turnNextMonthOn(lastPane);","        } else {","            this._turnNextMonthOff(lastPane);","        }","","    },","","    /**","     * The handler for the change in the showPrevMonth attribute.","     * @method _afterShowPrevMonthChange","     * @private","     */","    _afterShowPrevMonthChange : function () {","        var contentBox = this.get('contentBox'),","            firstPane = contentBox.one(\"#\" + this._calendarId + \"_pane_\" + 0);","","        if (this.get('showPrevMonth')) {","            this._turnPrevMonthOn(firstPane);","        } else {","            this._turnPrevMonthOff(firstPane);","        }","","    },","","     /**","     * The handler for the change in the headerRenderer attribute.","     * @method _afterHeaderRendererChange","     * @private","     */","    _afterHeaderRendererChange : function () {","        var headerCell = this.get(\"contentBox\").one(\".\" + CAL_HD_LABEL);","        headerCell.setContent(this._updateCalendarHeader(this.get('date')));","    },","","     /**","     * The handler for the change in the customRenderer attribute.","     * @method _afterCustomRendererChange","     * @private","     */","    _afterCustomRendererChange : function () {","        this._restoreModifiedCells();","        this._renderCustomRules();","    },","","     /**","     * The handler for the change in the date attribute. Modifies the calendar","     * view by shifting the calendar grid mask and running custom rendering and","     * selection rendering as necessary.","     * @method _afterDateChange","     * @private","     */","    _afterDateChange : function () {","","        var contentBox = this.get('contentBox'),","            headerCell = contentBox.one(\".\" + CAL_HD).one(\".\" + CAL_HD_LABEL),","            calendarPanes = contentBox.all(\".\" + CAL_GRID),","            currentDate = this.get(\"date\"),","            counter = 0;","","        contentBox.setStyle(\"visibility\", \"hidden\");","        headerCell.setContent(this._updateCalendarHeader(currentDate));","","        this._restoreModifiedCells();","","        calendarPanes.each(function (curNode) {","            this._rerenderCalendarPane(ydate.addMonths(currentDate, counter++), curNode);","        }, this);","","        this._afterShowPrevMonthChange();","        this._afterShowNextMonthChange();","","        this._renderCustomRules();","        this._renderSelectedDates();","","        contentBox.setStyle(\"visibility\", \"visible\");","    },","","","     /**","     * A rendering assist method that initializes the HTML for a single","     * calendar pane.","     * @method _initCalendarPane","     * @param {Date} baseDate The date corresponding to the month of the given","     * calendar pane.","     * @param {String} pane_id The id of the pane, to be used as a prefix for","     * element ids in the given pane.","     * @private","     */","    _initCalendarPane : function (baseDate, pane_id) {","        // Get a list of short weekdays from the internationalization package, or else use default English ones.","        var weekdays = this.get('strings.very_short_weekdays') || [\"Su\", \"Mo\", \"Tu\", \"We\", \"Th\", \"Fr\", \"Sa\"],","            fullweekdays = this.get('strings.weekdays') || [\"Sunday\", \"Monday\", \"Tuesday\", \"Wednesday\", \"Thursday\", \"Friday\", \"Saturday\"],","            // Get the first day of the week from the internationalization package, or else use Sunday as default.","            firstday = this.get('strings.first_weekday') || 0,","            // Compute the cutoff column of the masked calendar table, based on the start date and the first day of week.","            cutoffCol = this._getCutoffColumn(baseDate, firstday),","            // Compute the number of days in the month based on starting date","            daysInMonth = ydate.daysInMonth(baseDate),","            // Initialize the array of individual row HTML strings","            row_array = ['','','','','',''],","            // Initialize the partial templates object","            partials = {},","","            day,","            row,","            column,","            date,","            id_date,","            calendar_day_class,","            column_visibility,","            output;","","            // Initialize the partial template for the weekday row cells.","            partials.weekday_row = '';","","        // Populate the partial template for the weekday row cells with weekday names","        for (day = firstday; day <= firstday + 6; day++) {","            partials.weekday_row +=","                substitute(CalendarBase.WEEKDAY_TEMPLATE, {","                    weekdayname: weekdays[day%7],","                    full_weekdayname: fullweekdays[day%7]","                });","        }","","        // Populate the partial template for the weekday row container with the weekday row cells","        partials.weekday_row_template = substitute(CalendarBase.WEEKDAY_ROW_TEMPLATE, partials);","","        // Populate the array of individual row HTML strings","        for (row = 0; row <= 5; row++) {","","            for (column = 0; column <= 12; column++) {","","                // Compute the value of the date that needs to populate the cell","                date = 7*row - 5 + column;","","                // Compose the value of the unique id of the current calendar cell","                id_date = pane_id + \"_\" + column + \"_\" + date;","","                // Set the calendar day class to one of three possible values","                calendar_day_class = CAL_DAY;","","                if (date < 1) {","                    calendar_day_class = CAL_PREVMONTH_DAY;","                } else if (date > daysInMonth) {","                    calendar_day_class = CAL_NEXTMONTH_DAY;","                }","","                // Cut off dates that fall before the first and after the last date of the month","                if (date < 1 || date > daysInMonth) {","                    date = \"&nbsp;\";","                }","","                // Decide on whether a column in the masked table is visible or not based on the value of the cutoff column.","                column_visibility = (column >= cutoffCol && column < (cutoffCol + 7)) ? '' : CAL_COL_HIDDEN;","","                // Substitute the values into the partial calendar day template and add it to the current row HTML string","                row_array[row] += substitute (CalendarBase.CALDAY_TEMPLATE, {","                    day_content: date,","                    calendar_col_class: \"calendar_col\" + column,","                    calendar_col_visibility_class: column_visibility,","                    calendar_day_class: calendar_day_class,","                    calendar_day_id: id_date","                });","            }","        }","","        // Instantiate the partial calendar pane body template","        partials.body_template = '';","","        // Populate the body template with the rows templates","        arrayEach (row_array, function (v) {","             partials.body_template += substitute(CalendarBase.CALDAY_ROW_TEMPLATE, {calday_row: v});","        });","","        // Populate the calendar grid id","        partials.calendar_pane_id = pane_id;","","        // Populate the calendar pane tabindex","        partials.calendar_pane_tabindex = this.get(\"tabIndex\");","        partials.pane_arialabel = ydate.format(baseDate, { format: \"%B %Y\" });","","","        // Generate final output by substituting class names.","        output = substitute(substitute (CalendarBase.CALENDAR_GRID_TEMPLATE, partials),","                                                        CalendarBase.CALENDAR_STRINGS);","","        // Store the initialized pane information","        this._paneProperties[pane_id] = {cutoffCol: cutoffCol, daysInMonth: daysInMonth, paneDate: baseDate};","","        return output;","    },","","     /**","     * A rendering assist method that rerenders a specified calendar pane, based","     * on a new Date.","     * @method _rerenderCalendarPane","     * @param {Date} newDate The date corresponding to the month of the given","     * calendar pane.","     * @param {Node} pane The node corresponding to the calendar pane to be rerenders.","     * @private","     */","    _rerenderCalendarPane : function (newDate, pane) {","","        // Get the first day of the week from the internationalization package, or else use Sunday as default.","        var firstday = this.get('strings.first_weekday') || 0,","            // Compute the cutoff column of the masked calendar table, based on the start date and the first day of week.","            cutoffCol = this._getCutoffColumn(newDate, firstday),","            // Compute the number of days in the month based on starting date","            daysInMonth = ydate.daysInMonth(newDate),","            // Get pane id for easier reference","            paneId = pane.get(\"id\"),","            column,","            currentColumn,","            curCell;","","        // Hide the pane before making DOM changes to speed them up","        pane.setStyle(\"visibility\", \"hidden\");","        pane.setAttribute(\"aria-label\", ydate.format(newDate, {format:\"%B %Y\"}));","","        // Go through all columns, and flip their visibility setting based on whether they are within the unmasked range.","        for (column = 0; column <= 12; column++) {","            currentColumn = pane.all(\".\" + \"calendar_col\" + column);","            currentColumn.removeClass(CAL_COL_HIDDEN);","","            if (column < cutoffCol || column >= (cutoffCol + 7)) {","                currentColumn.addClass(CAL_COL_HIDDEN);","            } else {","                // Clean up dates in visible columns to account for the correct number of days in a month","                switch(column) {","                    case 0:","                        curCell = pane.one(\"#\" + paneId + \"_0_30\");","                        if (daysInMonth >= 30) {","                            curCell.set(\"text\", \"30\");","                            curCell.removeClass(CAL_NEXTMONTH_DAY).addClass(CAL_DAY);","                        } else {","                            curCell.setContent(\"&nbsp;\");","                            curCell.addClass(CAL_NEXTMONTH_DAY).addClass(CAL_DAY);","                        }","                        break;","                    case 1:","                        curCell = pane.one(\"#\" + paneId + \"_1_31\");","                        if (daysInMonth >= 31) {","                            curCell.set(\"text\", \"31\");","                            curCell.removeClass(CAL_NEXTMONTH_DAY).addClass(CAL_DAY);","                        } else {","                            curCell.setContent(\"&nbsp;\");","                            curCell.removeClass(CAL_DAY).addClass(CAL_NEXTMONTH_DAY);","                        }","                        break;","                    case 6:","                        curCell = pane.one(\"#\" + paneId + \"_6_29\");","                        if (daysInMonth >= 29) {","                            curCell.set(\"text\", \"29\");","                            curCell.removeClass(CAL_NEXTMONTH_DAY).addClass(CAL_DAY);","                        } else {","                            curCell.setContent(\"&nbsp;\");","                            curCell.removeClass(CAL_DAY).addClass(CAL_NEXTMONTH_DAY);","                        }","                        break;","                    case 7:","                        curCell = pane.one(\"#\" + paneId + \"_7_30\");","                        if (daysInMonth >= 30) {","                            curCell.set(\"text\", \"30\");","                            curCell.removeClass(CAL_NEXTMONTH_DAY).addClass(CAL_DAY);","                        } else {","                            curCell.setContent(\"&nbsp;\");","                            curCell.removeClass(CAL_DAY).addClass(CAL_NEXTMONTH_DAY);","                        }","                        break;","                    case 8:","                        curCell = pane.one(\"#\" + paneId + \"_8_31\");","                        if (daysInMonth >= 31) {","                            curCell.set(\"text\", \"31\");","                            curCell.removeClass(CAL_NEXTMONTH_DAY).addClass(CAL_DAY);","                        } else {","                            curCell.setContent(\"&nbsp;\");","                            curCell.removeClass(CAL_DAY).addClass(CAL_NEXTMONTH_DAY);","                        }","                        break;","                }","            }","        }","","        // Update stored pane properties","        this._paneProperties[paneId].cutoffCol = cutoffCol;","        this._paneProperties[paneId].daysInMonth = daysInMonth;","        this._paneProperties[paneId].paneDate = newDate;","","        // Bring the pane visibility back after all DOM changes are done","        pane.setStyle(\"visibility\", \"visible\");","","    },","","     /**","     * A rendering assist method that updates the calendar header based","     * on a given date and potentially the provided headerRenderer.","     * @method _updateCalendarHeader","     * @param {Date} baseDate The date with which to update the calendar header.","     * @private","     */","    _updateCalendarHeader : function (baseDate) {","        var headerString = \"\",","            headerRenderer = this.get(\"headerRenderer\");","","        if (Y.Lang.isString(headerRenderer)) {","            headerString = ydate.format(baseDate, {format:headerRenderer});","        } else if (headerRenderer instanceof Function) {","            headerString = headerRenderer.call(this, baseDate);","        }","","        return headerString;","    },","","     /**","     * A rendering assist method that initializes the calendar header HTML","     * based on a given date and potentially the provided headerRenderer.","     * @method _updateCalendarHeader","     * @param {Date} baseDate The date with which to initialize the calendar header.","     * @private","     */","    _initCalendarHeader : function (baseDate) {","        return substitute(substitute(CalendarBase.HEADER_TEMPLATE, {","                calheader: this._updateCalendarHeader(baseDate),","                calendar_id: this._calendarId","            }), CalendarBase.CALENDAR_STRINGS );","    },","","     /**","     * A rendering assist method that initializes the calendar HTML","     * based on a given date.","     * @method _initCalendarHTML","     * @param {Date} baseDate The date with which to initialize the calendar.","     * @private","     */","    _initCalendarHTML : function (baseDate) {","        // Instantiate the partials holder","        var partials = {},","            // Counter for iterative template replacement.","            counter = 0,","            singlePane,","            output;","","        // Generate the template for the header","        partials.header_template =  this._initCalendarHeader(baseDate);","        partials.calendar_id = this._calendarId;","","        partials.body_template = substitute(substitute (CalendarBase.CONTENT_TEMPLATE, partials),","                                                                                 CalendarBase.CALENDAR_STRINGS);","","        // Instantiate the iterative template replacer function","        function paneReplacer () {","            singlePane = this._initCalendarPane(ydate.addMonths(baseDate, counter), partials.calendar_id + \"_pane_\" + counter);","            counter++;","            return singlePane;","        }","","        // Go through all occurrences of the calendar_grid_template token and replace it with an appropriate calendar grid.","        output = partials.body_template.replace(/\\{calendar_grid_template\\}/g, Y.bind(paneReplacer, this));","","        // Update the paneNumber count","        this._paneNumber = counter;","","        return output;","    }","}, {","","     /**","        * The CSS classnames for the calendar templates.","        * @property CALENDAR_STRINGS","        * @type Object","        * @readOnly","        * @protected","        * @static","        */","    CALENDAR_STRINGS: {","        calendar_grid_class       : CAL_GRID,","        calendar_body_class       : CAL_BODY,","        calendar_hd_class         : CAL_HD,","        calendar_hd_label_class   : CAL_HD_LABEL,","        calendar_weekdayrow_class : CAL_WDAYROW,","        calendar_weekday_class    : CAL_WDAY,","        calendar_row_class        : CAL_ROW,","        calendar_day_class        : CAL_DAY,","        calendar_dayanchor_class  : CAL_ANCHOR,","        calendar_pane_class       : CAL_PANE,","        calendar_right_grid_class : CAL_RIGHT_GRID,","        calendar_left_grid_class  : CAL_LEFT_GRID,","        calendar_status_class     : CAL_STATUS","    },","","    /*","","    ARIA_STATUS_TEMPLATE: '<div role=\"status\" aria-atomic=\"true\" class=\"{calendar_status_class}\"></div>',","","    AriaStatus : null,","","    updateStatus : function (statusString) {","","        if (!CalendarBase.AriaStatus) {","            CalendarBase.AriaStatus = create(","                                                         substitute (CalendarBase.ARIA_STATUS_TEMPLATE,","                                                                                 CalendarBase.CALENDAR_STRINGS));","            Y.one(\"body\").append(CalendarBase.AriaStatus);","        }","","            CalendarBase.AriaStatus.set(\"text\", statusString);","    },","","    */","","     /**","        * The main content template for calendar.","        * @property CONTENT_TEMPLATE","        * @type String","        * @protected","        * @static","        */","    CONTENT_TEMPLATE:  '<div class=\"yui3-g {calendar_pane_class}\" id=\"{calendar_id}\">' +","                        '{header_template}' +","                        '<div class=\"yui3-u-1\">' +","                        '{calendar_grid_template}' +","                        '</div>' +","                        '</div>',","","     /**","        * A single pane template for calendar (same as default CONTENT_TEMPLATE)","        * @property ONE_PANE_TEMPLATE","        * @type String","        * @protected","        * @readOnly","        * @static","        */","    ONE_PANE_TEMPLATE: '<div class=\"yui3-g {calendar_pane_class}\" id=\"{calendar_id}\">' +","                            '{header_template}' +","                            '<div class=\"yui3-u-1\">' +","                                '{calendar_grid_template}' +","                            '</div>' +","                        '</div>',","","     /**","        * A two pane template for calendar.","        * @property TWO_PANE_TEMPLATE","        * @type String","        * @protected","        * @readOnly","        * @static","        */","    TWO_PANE_TEMPLATE: '<div class=\"yui3-g {calendar_pane_class}\" id=\"{calendar_id}\">' +","                            '{header_template}' +","                            '<div class=\"yui3-u-1-2\">'+","                                '<div class = \"{calendar_left_grid_class}\">' +","                                    '{calendar_grid_template}' +","                                '</div>' +","                            '</div>' +","                            '<div class=\"yui3-u-1-2\">' +","                                '<div class = \"{calendar_right_grid_class}\">' +","                                    '{calendar_grid_template}' +","                                '</div>' +","                            '</div>' +","                        '</div>',","     /**","        * A three pane template for calendar.","        * @property THREE_PANE_TEMPLATE","        * @type String","        * @protected","        * @readOnly","        * @static","        */","    THREE_PANE_TEMPLATE: '<div class=\"yui3-g {calendar_pane_class}\" id=\"{calendar_id}\">' +","                            '{header_template}' +","                            '<div class=\"yui3-u-1-3\">' +","                                '<div class=\"{calendar_left_grid_class}\">' +","                                    '{calendar_grid_template}' +","                                '</div>' +","                            '</div>' +","                            '<div class=\"yui3-u-1-3\">' +","                                '{calendar_grid_template}' +","                            '</div>' +","                            '<div class=\"yui3-u-1-3\">' +","                                '<div class=\"{calendar_right_grid_class}\">' +","                                    '{calendar_grid_template}' +","                                '</div>' +","                            '</div>' +","                        '</div>',","     /**","        * A template for the calendar grid.","        * @property CALENDAR_GRID_TEMPLATE","        * @type String","        * @protected","        * @static","        */","    CALENDAR_GRID_TEMPLATE: '<table class=\"{calendar_grid_class}\" id=\"{calendar_pane_id}\" role=\"grid\" aria-readonly=\"true\" ' +","                                'aria-label=\"{pane_arialabel}\" tabindex=\"{calendar_pane_tabindex}\">' +","                                '<thead>' +","                                    '{weekday_row_template}' +","                                '</thead>' +","                                '<tbody>' +","                                    '{body_template}' +","                                '</tbody>' +","                            '</table>',","","     /**","        * A template for the calendar header.","        * @property HEADER_TEMPLATE","        * @type String","        * @protected","        * @static","        */","    HEADER_TEMPLATE: '<div class=\"yui3-g {calendar_hd_class}\">' +","                        '<div class=\"yui3-u {calendar_hd_label_class}\" id=\"{calendar_id}_header\" aria-role=\"heading\">' +","                            '{calheader}' +","                        '</div>' +","                    '</div>',","","     /**","        * A template for the row of weekday names.","        * @property WEEKDAY_ROW_TEMPLATE","        * @type String","        * @protected","        * @static","        */","    WEEKDAY_ROW_TEMPLATE: '<tr class=\"{calendar_weekdayrow_class}\" role=\"row\">' +","                            '{weekday_row}' +","                        '</tr>',","","     /**","        * A template for a single row of calendar days.","        * @property CALDAY_ROW_TEMPLATE","        * @type String","        * @protected","        * @static","        */","    CALDAY_ROW_TEMPLATE: '<tr class=\"{calendar_row_class}\" role=\"row\">' +","                            '{calday_row}' +","                        '</tr>',","","     /**","        * A template for a single cell with a weekday name.","        * @property CALDAY_ROW_TEMPLATE","        * @type String","        * @protected","        * @static","        */","    WEEKDAY_TEMPLATE: '<th class=\"{calendar_weekday_class}\" role=\"columnheader\" aria-label=\"{full_weekdayname}\">{weekdayname}</th>',","","     /**","        * A template for a single cell with a calendar day.","        * @property CALDAY_TEMPLATE","        * @type String","        * @protected","        * @static","        */","    CALDAY_TEMPLATE: '<td class=\"{calendar_col_class} {calendar_day_class} {calendar_col_visibility_class}\" id=\"{calendar_day_id}\" ' +","                        'role=\"gridcell\" tabindex=\"-1\">' +","                        '{day_content}' +","                    '</td>',","","     /**","        * The identity of the widget.","        *","        * @property NAME","        * @type String","        * @default 'calendarBase'","        * @readOnly","        * @protected","        * @static","        */","    NAME: 'calendarBase',","","     /**","        * Static property used to define the default attribute configuration of","        * the Widget.","        *","        * @property ATTRS","        * @type {Object}","        * @protected","        * @static","        */","    ATTRS: {","        tabIndex: {","            value: 1","        },","        /**","         * The date corresponding to the current calendar view. Always","         * normalized to the first of the month that contains the date","         * at assignment time. Used as the first date visible in the","         * calendar.","         *","         * @attribute date","         * @type Date","         * @default The first of the month containing today's date, as","         * set on the end user's system.","         */","        date: {","            value: new Date(),","            setter: function (val) {","                var newDate = this._normalizeDate(val);","                if (ydate.areEqual(newDate, this.get('date'))) {","                        return this.get('date');","                } else {","                        return newDate;","                }","            }","        },","","        /**","         * A setting specifying whether to shows days from the previous","         * month in the visible month's grid, if there are empty preceding","         * cells available.","         *","         * @attribute showPrevMonth","         * @type boolean","         * @default false","         */","        showPrevMonth: {","            value: false","        },","","        /**","         * A setting specifying whether to shows days from the next","         * month in the visible month's grid, if there are empty","         * cells available at the end.","         *","         * @attribute showNextMonth","         * @type boolean","         * @default false","         */","        showNextMonth: {","            value: false","        },","","        /**","         * Strings and properties derived from the internationalization packages","         * for the calendar.","         *","         * @attribute strings","         * @type Object","         * @protected","         */","        strings : {","            valueFn: function() { return Y.Intl.get(\"calendar-base\"); }","        },","","        /**","         * Custom header renderer for the calendar.","         *","         * @attribute headerRenderer","         * @type String | Function","         */","        headerRenderer: {","            value: \"%B %Y\"","        },","","        /**","         * The name of the rule which all enabled dates should match.","         * Either disabledDatesRule or enabledDatesRule should be specified,","         * or neither, but not both.","         *","         * @attribute enabledDatesRule","         * @type String","         * @default null","         */","        enabledDatesRule: {","            value: null","        },","","        /**","         * The name of the rule which all disabled dates should match.","         * Either disabledDatesRule or enabledDatesRule should be specified,","         * or neither, but not both.","         *","         * @attribute disabledDatesRule","         * @type String","         * @default null","         */","        disabledDatesRule: {","            value: null","        },","","        /**","         * A read-only attribute providing a list of currently selected dates.","         *","         * @attribute selectedDates","         * @readOnly","         * @type Array","         */","        selectedDates : {","            readOnly: true,","            getter: function () {","                return (this._getSelectedDatesList());","            }","        },","","        /**","         * An object of the form {rules:Object, filterFunction:Function},","         * providing  set of rules and a custom rendering function for","         * customizing specific calendar cells.","         *","         * @attribute customRenderer","         * @readOnly","         * @type Object","         * @default {}","         */","        customRenderer : {","            lazyAdd: false,","            value: {},","            setter: function (val) {","                this._rules = val.rules;","                this._filterFunction = val.filterFunction;","            }","        }","    }","","});","","","}, '@VERSION@', {","    \"requires\": [","        \"widget\",","        \"datatype-date\",","        \"datatype-date-math\",","        \"cssgrids\"","    ],","    \"lang\": [","        \"de\",","        \"en\",","        \"es\",","        \"es-AR\",","        \"fr\",","        \"it\",","        \"ja\",","        \"nb-NO\",","        \"nl\",","        \"pt-BR\",","        \"ru\",","        \"zh-HANT-TW\"","    ],","    \"skinnable\": true","});"];
_yuitest_coverage["build/calendar-base/calendar-base.js"].lines = {"1":0,"12":0,"52":0,"53":0,"58":0,"141":0,"142":0,"143":0,"144":0,"145":0,"147":0,"158":0,"159":0,"161":0,"162":0,"164":0,"165":0,"168":0,"169":0,"171":0,"183":0,"184":0,"185":0,"186":0,"187":0,"188":0,"189":0,"190":0,"191":0,"192":0,"205":0,"207":0,"208":0,"209":0,"210":0,"215":0,"228":0,"231":0,"232":0,"234":0,"252":0,"253":0,"255":0,"259":0,"260":0,"261":0,"262":0,"264":0,"265":0,"268":0,"283":0,"291":0,"292":0,"293":0,"294":0,"297":0,"298":0,"299":0,"300":0,"303":0,"304":0,"305":0,"306":0,"309":0,"310":0,"311":0,"312":0,"325":0,"340":0,"353":0,"356":0,"357":0,"358":0,"359":0,"361":0,"373":0,"374":0,"376":0,"377":0,"379":0,"392":0,"393":0,"395":0,"396":0,"398":0,"399":0,"401":0,"415":0,"417":0,"421":0,"422":0,"423":0,"425":0,"426":0,"429":0,"430":0,"431":0,"434":0,"436":0,"437":0,"449":0,"450":0,"462":0,"469":0,"470":0,"471":0,"472":0,"474":0,"478":0,"479":0,"480":0,"481":0,"483":0,"496":0,"500":0,"504":0,"505":0,"506":0,"518":0,"519":0,"530":0,"534":0,"535":0,"538":0,"549":0,"550":0,"551":0,"552":0,"569":0,"578":0,"580":0,"581":0,"582":0,"594":0,"596":0,"597":0,"601":0,"602":0,"603":0,"604":0,"619":0,"624":0,"625":0,"626":0,"627":0,"628":0,"631":0,"632":0,"633":0,"635":0,"636":0,"637":0,"647":0,"649":0,"653":0,"654":0,"655":0,"657":0,"671":0,"684":0,"691":0,"693":0,"694":0,"696":0,"698":0,"700":0,"701":0,"703":0,"704":0,"706":0,"708":0,"710":0,"711":0,"713":0,"715":0,"717":0,"718":0,"720":0,"722":0,"724":0,"725":0,"727":0,"729":0,"731":0,"732":0,"734":0,"736":0,"738":0,"752":0,"759":0,"779":0,"780":0,"782":0,"797":0,"799":0,"811":0,"816":0,"817":0,"820":0,"822":0,"824":0,"825":0,"839":0,"842":0,"844":0,"845":0,"857":0,"858":0,"859":0,"860":0,"861":0,"862":0,"874":0,"881":0,"882":0,"885":0,"887":0,"888":0,"889":0,"890":0,"893":0,"894":0,"907":0,"913":0,"914":0,"917":0,"919":0,"920":0,"921":0,"922":0,"925":0,"926":0,"937":0,"940":0,"942":0,"943":0,"945":0,"956":0,"959":0,"960":0,"962":0,"973":0,"974":0,"983":0,"984":0,"996":0,"1002":0,"1003":0,"1005":0,"1007":0,"1008":0,"1011":0,"1012":0,"1014":0,"1015":0,"1017":0,"1033":0,"1056":0,"1059":0,"1060":0,"1068":0,"1071":0,"1073":0,"1076":0,"1079":0,"1082":0,"1084":0,"1085":0,"1086":0,"1087":0,"1091":0,"1092":0,"1096":0,"1099":0,"1110":0,"1113":0,"1114":0,"1118":0,"1121":0,"1122":0,"1126":0,"1130":0,"1132":0,"1147":0,"1159":0,"1160":0,"1163":0,"1164":0,"1165":0,"1167":0,"1168":0,"1171":0,"1173":0,"1174":0,"1175":0,"1176":0,"1178":0,"1179":0,"1181":0,"1183":0,"1184":0,"1185":0,"1186":0,"1188":0,"1189":0,"1191":0,"1193":0,"1194":0,"1195":0,"1196":0,"1198":0,"1199":0,"1201":0,"1203":0,"1204":0,"1205":0,"1206":0,"1208":0,"1209":0,"1211":0,"1213":0,"1214":0,"1215":0,"1216":0,"1218":0,"1219":0,"1221":0,"1227":0,"1228":0,"1229":0,"1232":0,"1244":0,"1247":0,"1248":0,"1249":0,"1250":0,"1253":0,"1264":0,"1279":0,"1286":0,"1287":0,"1289":0,"1293":0,"1294":0,"1295":0,"1296":0,"1300":0,"1303":0,"1305":0,"1539":0,"1540":0,"1541":0,"1543":0,"1583":0,"1632":0,"1650":0,"1651":0};
_yuitest_coverage["build/calendar-base/calendar-base.js"].functions = {"CalendarBase:52":0,"initializer:140":0,"renderUI:156":0,"bindUI:182":0,"(anonymous 4):209":0,"(anonymous 3):208":0,"(anonymous 2):207":0,"_getSelectedDatesList:204":0,"_getSelectedDatesInMonth:227":0,"_isNumInList:251":0,"_getRulesForDate:282":0,"_matchesRule:339":0,"_canBeSelected:351":0,"selectDates:372":0,"deselectDates:391":0,"_addDateToSelection:413":0,"_addDatesToSelection:448":0,"_addDateRangeToSelection:460":0,"_removeDateFromSelection:495":0,"_removeDatesFromSelection:517":0,"_removeDateRangeFromSelection:529":0,"_clearSelection:548":0,"_fireSelectionChange:561":0,"_restoreModifiedCells:577":0,"_renderCustomRules:592":0,"_renderCustomRulesHelper:618":0,"_renderSelectedDates:646":0,"_renderSelectedDatesHelper:670":0,"_dateToNode:683":0,"_nodeToDate:750":0,"_normalizeDate:778":0,"_getCutoffColumn:796":0,"_turnPrevMonthOn:810":0,"_turnPrevMonthOff:838":0,"_cleanUpNextMonthCells:856":0,"_turnNextMonthOn:873":0,"_turnNextMonthOff:906":0,"_afterShowNextMonthChange:935":0,"_afterShowPrevMonthChange:955":0,"_afterHeaderRendererChange:972":0,"_afterCustomRendererChange:982":0,"(anonymous 5):1007":0,"_afterDateChange:994":0,"(anonymous 6):1113":0,"_initCalendarPane:1031":0,"_rerenderCalendarPane:1144":0,"_updateCalendarHeader:1243":0,"_initCalendarHeader:1263":0,"paneReplacer:1293":0,"_initCalendarHTML:1277":0,"setter:1538":0,"valueFn:1583":0,"getter:1631":0,"setter:1649":0,"(anonymous 1):1":0};
_yuitest_coverage["build/calendar-base/calendar-base.js"].coveredLines = 357;
_yuitest_coverage["build/calendar-base/calendar-base.js"].coveredFunctions = 55;
_yuitest_coverline("build/calendar-base/calendar-base.js", 1);
YUI.add('calendar-base', function (Y, NAME) {

/**
 * The CalendarBase submodule is a basic UI calendar view that displays
 * a range of dates in a two-dimensional month grid, with one or more
 * months visible at a single time. CalendarBase supports custom date
 * rendering, multiple calendar panes, and selection.
 * @module calendar
 * @submodule calendar-base
 */

_yuitest_coverfunc("build/calendar-base/calendar-base.js", "(anonymous 1)", 1);
_yuitest_coverline("build/calendar-base/calendar-base.js", 12);
var getCN                 = Y.ClassNameManager.getClassName,
    CALENDAR              = 'calendar',
    CAL_GRID              = getCN(CALENDAR, 'grid'),
    CAL_LEFT_GRID         = getCN(CALENDAR, 'left-grid'),
    CAL_RIGHT_GRID        = getCN(CALENDAR, 'right-grid'),
    CAL_BODY              = getCN(CALENDAR, 'body'),
    CAL_HD                = getCN(CALENDAR, 'header'),
    CAL_HD_LABEL          = getCN(CALENDAR, 'header-label'),
    CAL_WDAYROW           = getCN(CALENDAR, 'weekdayrow'),
    CAL_WDAY              = getCN(CALENDAR, 'weekday'),
    CAL_COL_HIDDEN        = getCN(CALENDAR, 'column-hidden'),
    CAL_DAY_SELECTED      = getCN(CALENDAR, 'day-selected'),
    SELECTION_DISABLED    = getCN(CALENDAR, 'selection-disabled'),
    CAL_ROW               = getCN(CALENDAR, 'row'),
    CAL_DAY               = getCN(CALENDAR, 'day'),
    CAL_PREVMONTH_DAY     = getCN(CALENDAR, 'prevmonth-day'),
    CAL_NEXTMONTH_DAY     = getCN(CALENDAR, 'nextmonth-day'),
    CAL_ANCHOR            = getCN(CALENDAR, 'anchor'),
    CAL_PANE              = getCN(CALENDAR, 'pane'),
    CAL_STATUS            = getCN(CALENDAR, 'status'),
    L           = Y.Lang,
    substitute  = L.sub,
    arrayEach   = Y.Array.each,
    objEach     = Y.Object.each,
    iOf         = Y.Array.indexOf,
    hasKey      = Y.Object.hasKey,
    setVal      = Y.Object.setValue,
    isEmpty     = Y.Object.isEmpty,
    ydate       = Y.DataType.Date;

/** Create a calendar view to represent a single or multiple
    * month range of dates, rendered as a grid with date and
    * weekday labels.
    *
    * @class CalendarBase
    * @extends Widget
    * @param config {Object} Configuration object (see Configuration
    * attributes)
    * @constructor
    */
_yuitest_coverline("build/calendar-base/calendar-base.js", 52);
function CalendarBase() {
    _yuitest_coverfunc("build/calendar-base/calendar-base.js", "CalendarBase", 52);
_yuitest_coverline("build/calendar-base/calendar-base.js", 53);
CalendarBase.superclass.constructor.apply ( this, arguments );
}



_yuitest_coverline("build/calendar-base/calendar-base.js", 58);
Y.CalendarBase = Y.extend( CalendarBase, Y.Widget, {

    /**
     * A storage for various properties of individual month
     * panes.
     *
     * @property _paneProperties
     * @type Object
     * @private
     */
    _paneProperties : {},

    /**
     * The number of month panes in the calendar, deduced
     * from the CONTENT_TEMPLATE's number of {calendar_grid}
     * tokens.
     *
     * @property _paneNumber
     * @type Number
     * @private
     */
    _paneNumber : 1,

    /**
     * The unique id used to prefix various elements of this
     * calendar instance.
     *
     * @property _calendarId
     * @type String
     * @private
     */
    _calendarId : null,

    /**
     * The hash map of selected dates, populated with
     * selectDates() and deselectDates() methods
     *
     * @property _selectedDates
     * @type Object
     * @private
     */
    _selectedDates : {},

    /**
     * A private copy of the rules object, populated
     * by setting the customRenderer attribute.
     *
     * @property _rules
     * @type Object
     * @private
     */
    _rules : {},

    /**
     * A private copy of the filterFunction, populated
     * by setting the customRenderer attribute.
     *
     * @property _filterFunction
     * @type Function
     * @private
     */
    _filterFunction : null,

    /**
     * Storage for calendar cells modified by any custom
     * formatting. The storage is cleared, used to restore
     * cells to the original state, and repopulated accordingly
     * when the calendar is rerendered.
     *
     * @property _storedDateCells
     * @type Object
     * @private
     */
    _storedDateCells : {},

    /**
     * Designated initializer
     * Initializes instance-level properties of
     * calendar.
     *
     * @method initializer
     */
    initializer : function () {
        _yuitest_coverfunc("build/calendar-base/calendar-base.js", "initializer", 140);
_yuitest_coverline("build/calendar-base/calendar-base.js", 141);
this._paneProperties = {};
        _yuitest_coverline("build/calendar-base/calendar-base.js", 142);
this._calendarId = Y.guid('calendar');
        _yuitest_coverline("build/calendar-base/calendar-base.js", 143);
this._selectedDates = {};
        _yuitest_coverline("build/calendar-base/calendar-base.js", 144);
if (isEmpty(this._rules)) {
             _yuitest_coverline("build/calendar-base/calendar-base.js", 145);
this._rules = {};
        }
        _yuitest_coverline("build/calendar-base/calendar-base.js", 147);
this._storedDateCells = {};
    },

    /**
     * renderUI implementation
     *
     * Creates a visual representation of the calendar based on existing parameters.
     * @method renderUI
     */
    renderUI : function () {

        _yuitest_coverfunc("build/calendar-base/calendar-base.js", "renderUI", 156);
_yuitest_coverline("build/calendar-base/calendar-base.js", 158);
var contentBox = this.get('contentBox');
        _yuitest_coverline("build/calendar-base/calendar-base.js", 159);
contentBox.appendChild(this._initCalendarHTML(this.get('date')));

        _yuitest_coverline("build/calendar-base/calendar-base.js", 161);
if (this.get('showPrevMonth')) {
                _yuitest_coverline("build/calendar-base/calendar-base.js", 162);
this._afterShowPrevMonthChange();
        }
        _yuitest_coverline("build/calendar-base/calendar-base.js", 164);
if (this.get('showNextMonth')) {
                _yuitest_coverline("build/calendar-base/calendar-base.js", 165);
this._afterShowNextMonthChange();
        }

        _yuitest_coverline("build/calendar-base/calendar-base.js", 168);
this._renderCustomRules();
        _yuitest_coverline("build/calendar-base/calendar-base.js", 169);
this._renderSelectedDates();

        _yuitest_coverline("build/calendar-base/calendar-base.js", 171);
this.get("boundingBox").setAttribute("aria-labelledby", this._calendarId + "_header");

    },

    /**
     * bindUI implementation
     *
     * Assigns listeners to relevant events that change the state
     * of the calendar.
     * @method bindUI
     */
    bindUI : function () {
        _yuitest_coverfunc("build/calendar-base/calendar-base.js", "bindUI", 182);
_yuitest_coverline("build/calendar-base/calendar-base.js", 183);
this.after('dateChange', this._afterDateChange);
        _yuitest_coverline("build/calendar-base/calendar-base.js", 184);
this.after('showPrevMonthChange', this._afterShowPrevMonthChange);
        _yuitest_coverline("build/calendar-base/calendar-base.js", 185);
this.after('showNextMonthChange', this._afterShowNextMonthChange);
        _yuitest_coverline("build/calendar-base/calendar-base.js", 186);
this.after('headerRendererChange', this._afterHeaderRendererChange);
        _yuitest_coverline("build/calendar-base/calendar-base.js", 187);
this.after('customRendererChange', this._afterCustomRendererChange);
        _yuitest_coverline("build/calendar-base/calendar-base.js", 188);
this.after('enabledDatesRuleChange', this._afterCustomRendererChange);
        _yuitest_coverline("build/calendar-base/calendar-base.js", 189);
this.after('disabledDatesRuleChange', this._afterCustomRendererChange);
        _yuitest_coverline("build/calendar-base/calendar-base.js", 190);
this.after('focusedChange', this._afterFocusedChange);
        _yuitest_coverline("build/calendar-base/calendar-base.js", 191);
this.after('selectionChange', this._renderSelectedDates);
        _yuitest_coverline("build/calendar-base/calendar-base.js", 192);
this._bindCalendarEvents();
    },


    /**
     * An internal utility method that generates a list of selected dates
     * from the hash storage.
     *
     * @method _getSelectedDatesList
     * @protected
     * @return {Array} The array of `Date`s that are currently selected.
     */
    _getSelectedDatesList : function () {
        _yuitest_coverfunc("build/calendar-base/calendar-base.js", "_getSelectedDatesList", 204);
_yuitest_coverline("build/calendar-base/calendar-base.js", 205);
var output = [];

        _yuitest_coverline("build/calendar-base/calendar-base.js", 207);
objEach (this._selectedDates, function (year) {
            _yuitest_coverfunc("build/calendar-base/calendar-base.js", "(anonymous 2)", 207);
_yuitest_coverline("build/calendar-base/calendar-base.js", 208);
objEach (year, function (month) {
                _yuitest_coverfunc("build/calendar-base/calendar-base.js", "(anonymous 3)", 208);
_yuitest_coverline("build/calendar-base/calendar-base.js", 209);
objEach (month, function (day) {
                    _yuitest_coverfunc("build/calendar-base/calendar-base.js", "(anonymous 4)", 209);
_yuitest_coverline("build/calendar-base/calendar-base.js", 210);
output.push (day);
                }, this);
            }, this);
        }, this);

        _yuitest_coverline("build/calendar-base/calendar-base.js", 215);
return output;
    },

    /**
     * A utility method that returns all dates selected in a specific month.
     *
     * @method _getSelectedDatesInMonth
     * @param {Date} oDate corresponding to the month for which selected dates
     * are requested.
     * @protected
     * @return {Array} The array of `Date`s in a given month that are currently selected.
     */
    _getSelectedDatesInMonth : function (oDate) {
        _yuitest_coverfunc("build/calendar-base/calendar-base.js", "_getSelectedDatesInMonth", 227);
_yuitest_coverline("build/calendar-base/calendar-base.js", 228);
var year = oDate.getFullYear(),
            month = oDate.getMonth();

        _yuitest_coverline("build/calendar-base/calendar-base.js", 231);
if (hasKey(this._selectedDates, year) && hasKey(this._selectedDates[year], month)) {
            _yuitest_coverline("build/calendar-base/calendar-base.js", 232);
return Y.Object.values(this._selectedDates[year][month]);
        } else {
            _yuitest_coverline("build/calendar-base/calendar-base.js", 234);
return [];
        }
    },


    /**
     * An internal parsing method that receives a String list of numbers
     * and number ranges (of the form "1,2,3,4-6,7-9,10,11" etc.) and checks
     * whether a specific number is included in this list. Used for looking
     * up dates in the customRenderer rule set.
     *
     * @method _isNumInList
     * @param {Number} num The number to look for in a list.
     * @param {String} strList The list of numbers of the form "1,2,3,4-6,7-8,9", etc.
     * @private
     * @return {boolean} Returns true if the given number is in the given list.
     */
    _isNumInList : function (num, strList) {
        _yuitest_coverfunc("build/calendar-base/calendar-base.js", "_isNumInList", 251);
_yuitest_coverline("build/calendar-base/calendar-base.js", 252);
if (strList === "all") {
            _yuitest_coverline("build/calendar-base/calendar-base.js", 253);
return true;
        } else {
            _yuitest_coverline("build/calendar-base/calendar-base.js", 255);
var elements = strList.split(","),
                i = elements.length,
                range;

            _yuitest_coverline("build/calendar-base/calendar-base.js", 259);
while (i--) {
                _yuitest_coverline("build/calendar-base/calendar-base.js", 260);
range = elements[i].split("-");
                _yuitest_coverline("build/calendar-base/calendar-base.js", 261);
if (range.length === 2 && num >= parseInt(range[0], 10) && num <= parseInt(range[1], 10)) {
                    _yuitest_coverline("build/calendar-base/calendar-base.js", 262);
return true;
                }
                else {_yuitest_coverline("build/calendar-base/calendar-base.js", 264);
if (range.length === 1 && (parseInt(elements[i], 10) === num)) {
                    _yuitest_coverline("build/calendar-base/calendar-base.js", 265);
return true;
                }}
            }
            _yuitest_coverline("build/calendar-base/calendar-base.js", 268);
return false;
        }
    },

    /**
     * Given a specific date, returns an array of rules (from the customRenderer rule set)
     * that the given date matches.
     *
     * @method _getRulesForDate
     * @param {Date} oDate The date for which an array of rules is needed
     * @private
     * @return {Array} Returns an array of `String`s, each containg the name of
     * a rule that the given date matches.
     */
    _getRulesForDate : function (oDate) {
        _yuitest_coverfunc("build/calendar-base/calendar-base.js", "_getRulesForDate", 282);
_yuitest_coverline("build/calendar-base/calendar-base.js", 283);
var year = oDate.getFullYear(),
                month = oDate.getMonth(),
                date = oDate.getDate(),
                wday = oDate.getDay(),
                rules = this._rules,
                outputRules = [],
                years, months, dates, days;

        _yuitest_coverline("build/calendar-base/calendar-base.js", 291);
for (years in rules) {
            _yuitest_coverline("build/calendar-base/calendar-base.js", 292);
if (this._isNumInList(year, years)) {
                _yuitest_coverline("build/calendar-base/calendar-base.js", 293);
if (L.isString(rules[years])) {
                        _yuitest_coverline("build/calendar-base/calendar-base.js", 294);
outputRules.push(rules[years]);
                }
                else {
                    _yuitest_coverline("build/calendar-base/calendar-base.js", 297);
for (months in rules[years]) {
                        _yuitest_coverline("build/calendar-base/calendar-base.js", 298);
if (this._isNumInList(month, months)) {
                            _yuitest_coverline("build/calendar-base/calendar-base.js", 299);
if (L.isString(rules[years][months])) {
                                    _yuitest_coverline("build/calendar-base/calendar-base.js", 300);
outputRules.push(rules[years][months]);
                            }
                            else {
                                _yuitest_coverline("build/calendar-base/calendar-base.js", 303);
for (dates in rules[years][months]) {
                                    _yuitest_coverline("build/calendar-base/calendar-base.js", 304);
if (this._isNumInList(date, dates)) {
                                        _yuitest_coverline("build/calendar-base/calendar-base.js", 305);
if (L.isString(rules[years][months][dates])) {
                                                _yuitest_coverline("build/calendar-base/calendar-base.js", 306);
outputRules.push(rules[years][months][dates]);
                                        }
                                        else {
                                            _yuitest_coverline("build/calendar-base/calendar-base.js", 309);
for (days in rules[years][months][dates]) {
                                                _yuitest_coverline("build/calendar-base/calendar-base.js", 310);
if (this._isNumInList(wday, days)) {
                                                    _yuitest_coverline("build/calendar-base/calendar-base.js", 311);
if (L.isString(rules[years][months][dates][days])) {
                                                        _yuitest_coverline("build/calendar-base/calendar-base.js", 312);
outputRules.push(rules[years][months][dates][days]);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        _yuitest_coverline("build/calendar-base/calendar-base.js", 325);
return outputRules;
    },

    /**
     * A utility method which, given a specific date and a name of the rule,
     * checks whether the date matches the given rule.
     *
     * @method _matchesRule
     * @param {Date} oDate The date to check
     * @param {String} rule The name of the rule that the date should match.
     * @private
     * @return {boolean} Returns true if the date matches the given rule.
     *
     */
    _matchesRule : function (oDate, rule) {
        _yuitest_coverfunc("build/calendar-base/calendar-base.js", "_matchesRule", 339);
_yuitest_coverline("build/calendar-base/calendar-base.js", 340);
return (iOf(this._getRulesForDate(oDate), rule) >= 0);
    },

    /**
     * A utility method which checks whether a given date matches the `enabledDatesRule`
     * or does not match the `disabledDatesRule` and therefore whether it can be selected.
     * @method _canBeSelected
     * @param {Date} oDate The date to check
     * @private
     * @return {boolean} Returns true if the date can be selected; false otherwise.
     */
    _canBeSelected : function (oDate) {

        _yuitest_coverfunc("build/calendar-base/calendar-base.js", "_canBeSelected", 351);
_yuitest_coverline("build/calendar-base/calendar-base.js", 353);
var enabledDatesRule = this.get("enabledDatesRule"),
            disabledDatesRule = this.get("disabledDatesRule");

        _yuitest_coverline("build/calendar-base/calendar-base.js", 356);
if (enabledDatesRule) {
            _yuitest_coverline("build/calendar-base/calendar-base.js", 357);
return this._matchesRule(oDate, enabledDatesRule);
        } else {_yuitest_coverline("build/calendar-base/calendar-base.js", 358);
if (disabledDatesRule) {
            _yuitest_coverline("build/calendar-base/calendar-base.js", 359);
return !this._matchesRule(oDate, disabledDatesRule);
        } else {
            _yuitest_coverline("build/calendar-base/calendar-base.js", 361);
return true;
        }}
    },

    /**
     * Selects a given date or array of dates.
     * @method selectDates
     * @param {Date|Array} dates A `Date` or `Array` of `Date`s.
     * @return {CalendarBase} A reference to this object
     * @chainable
     */
    selectDates : function (dates) {
        _yuitest_coverfunc("build/calendar-base/calendar-base.js", "selectDates", 372);
_yuitest_coverline("build/calendar-base/calendar-base.js", 373);
if (ydate.isValidDate(dates)) {
            _yuitest_coverline("build/calendar-base/calendar-base.js", 374);
this._addDateToSelection(dates);
        }
        else {_yuitest_coverline("build/calendar-base/calendar-base.js", 376);
if (L.isArray(dates)) {
            _yuitest_coverline("build/calendar-base/calendar-base.js", 377);
this._addDatesToSelection(dates);
        }}
        _yuitest_coverline("build/calendar-base/calendar-base.js", 379);
return this;
    },

    /**
     * Deselects a given date or array of dates, or deselects
     * all dates if no argument is specified.
     * @method deselectDates
     * @param {Date|Array} [dates] A `Date` or `Array` of `Date`s, or no
     * argument if all dates should be deselected.
     * @return {CalendarBase} A reference to this object
     * @chainable
     */
    deselectDates : function (dates) {
        _yuitest_coverfunc("build/calendar-base/calendar-base.js", "deselectDates", 391);
_yuitest_coverline("build/calendar-base/calendar-base.js", 392);
if (!dates) {
            _yuitest_coverline("build/calendar-base/calendar-base.js", 393);
this._clearSelection();
        }
        else {_yuitest_coverline("build/calendar-base/calendar-base.js", 395);
if (ydate.isValidDate(dates)) {
            _yuitest_coverline("build/calendar-base/calendar-base.js", 396);
this._removeDateFromSelection(dates);
        }
        else {_yuitest_coverline("build/calendar-base/calendar-base.js", 398);
if (L.isArray(dates)) {
            _yuitest_coverline("build/calendar-base/calendar-base.js", 399);
this._removeDatesFromSelection(dates);
        }}}
        _yuitest_coverline("build/calendar-base/calendar-base.js", 401);
return this;
    },

    /**
     * A utility method that adds a given date to selection..
     * @method _addDateToSelection
     * @param {Date} oDate The date to add to selection.
     * @param {Number} [index] An optional parameter that is used
     * to differentiate between individual date selections and multiple
     * date selections.
     * @private
     */
    _addDateToSelection : function (oDate, index) {

        _yuitest_coverfunc("build/calendar-base/calendar-base.js", "_addDateToSelection", 413);
_yuitest_coverline("build/calendar-base/calendar-base.js", 415);
if (this._canBeSelected(oDate)) {

            _yuitest_coverline("build/calendar-base/calendar-base.js", 417);
var year = oDate.getFullYear(),
                month = oDate.getMonth(),
                day = oDate.getDate();

            _yuitest_coverline("build/calendar-base/calendar-base.js", 421);
if (hasKey(this._selectedDates, year)) {
                _yuitest_coverline("build/calendar-base/calendar-base.js", 422);
if (hasKey(this._selectedDates[year], month)) {
                    _yuitest_coverline("build/calendar-base/calendar-base.js", 423);
this._selectedDates[year][month][day] = oDate;
                } else {
                    _yuitest_coverline("build/calendar-base/calendar-base.js", 425);
this._selectedDates[year][month] = {};
                    _yuitest_coverline("build/calendar-base/calendar-base.js", 426);
this._selectedDates[year][month][day] = oDate;
                }
            } else {
                _yuitest_coverline("build/calendar-base/calendar-base.js", 429);
this._selectedDates[year] = {};
                _yuitest_coverline("build/calendar-base/calendar-base.js", 430);
this._selectedDates[year][month] = {};
                _yuitest_coverline("build/calendar-base/calendar-base.js", 431);
this._selectedDates[year][month][day] = oDate;
            }

            _yuitest_coverline("build/calendar-base/calendar-base.js", 434);
this._selectedDates = setVal(this._selectedDates, [year, month, day], oDate);

            _yuitest_coverline("build/calendar-base/calendar-base.js", 436);
if (!index) {
                _yuitest_coverline("build/calendar-base/calendar-base.js", 437);
this._fireSelectionChange();
            }
        }
    },

    /**
     * A utility method that adds a given list of dates to selection.
     * @method _addDatesToSelection
     * @param {Array} datesArray The list of dates to add to selection.
     * @private
     */
    _addDatesToSelection : function (datesArray) {
        _yuitest_coverfunc("build/calendar-base/calendar-base.js", "_addDatesToSelection", 448);
_yuitest_coverline("build/calendar-base/calendar-base.js", 449);
arrayEach(datesArray, this._addDateToSelection, this);
        _yuitest_coverline("build/calendar-base/calendar-base.js", 450);
this._fireSelectionChange();
    },

    /**
     * A utility method that adds a given range of dates to selection.
     * @method _addDateRangeToSelection
     * @param {Date} startDate The first date of the given range.
     * @param {Date} endDate The last date of the given range.
     * @private
     */
    _addDateRangeToSelection : function (startDate, endDate) {

        _yuitest_coverfunc("build/calendar-base/calendar-base.js", "_addDateRangeToSelection", 460);
_yuitest_coverline("build/calendar-base/calendar-base.js", 462);
var timezoneDifference = (endDate.getTimezoneOffset() - startDate.getTimezoneOffset())*60000,
            startTime = startDate.getTime(),
            endTime   = endDate.getTime(),
            tempTime,
            time,
            addedDate;

        _yuitest_coverline("build/calendar-base/calendar-base.js", 469);
if (startTime > endTime) {
            _yuitest_coverline("build/calendar-base/calendar-base.js", 470);
tempTime = startTime;
            _yuitest_coverline("build/calendar-base/calendar-base.js", 471);
startTime = endTime;
            _yuitest_coverline("build/calendar-base/calendar-base.js", 472);
endTime = tempTime + timezoneDifference;
        } else {
            _yuitest_coverline("build/calendar-base/calendar-base.js", 474);
endTime = endTime - timezoneDifference;
        }


        _yuitest_coverline("build/calendar-base/calendar-base.js", 478);
for (time = startTime; time <= endTime; time += 86400000) {
            _yuitest_coverline("build/calendar-base/calendar-base.js", 479);
addedDate = new Date(time);
            _yuitest_coverline("build/calendar-base/calendar-base.js", 480);
addedDate.setHours(12);
            _yuitest_coverline("build/calendar-base/calendar-base.js", 481);
this._addDateToSelection(addedDate, time);
        }
        _yuitest_coverline("build/calendar-base/calendar-base.js", 483);
this._fireSelectionChange();
    },

    /**
     * A utility method that removes a given date from selection..
     * @method _removeDateFromSelection
     * @param {Date} oDate The date to remove from selection.
     * @param {Number} [index] An optional parameter that is used
     * to differentiate between individual date selections and multiple
     * date selections.
     * @private
     */
    _removeDateFromSelection : function (oDate, index) {
        _yuitest_coverfunc("build/calendar-base/calendar-base.js", "_removeDateFromSelection", 495);
_yuitest_coverline("build/calendar-base/calendar-base.js", 496);
var year = oDate.getFullYear(),
            month = oDate.getMonth(),
            day = oDate.getDate();

        _yuitest_coverline("build/calendar-base/calendar-base.js", 500);
if (hasKey(this._selectedDates, year) &&
            hasKey(this._selectedDates[year], month) &&
            hasKey(this._selectedDates[year][month], day)
        ) {
            _yuitest_coverline("build/calendar-base/calendar-base.js", 504);
delete this._selectedDates[year][month][day];
            _yuitest_coverline("build/calendar-base/calendar-base.js", 505);
if (!index) {
                _yuitest_coverline("build/calendar-base/calendar-base.js", 506);
this._fireSelectionChange();
            }
        }
    },

    /**
     * A utility method that removes a given list of dates from selection.
     * @method _removeDatesFromSelection
     * @param {Array} datesArray The list of dates to remove from selection.
     * @private
     */
    _removeDatesFromSelection : function (datesArray) {
        _yuitest_coverfunc("build/calendar-base/calendar-base.js", "_removeDatesFromSelection", 517);
_yuitest_coverline("build/calendar-base/calendar-base.js", 518);
arrayEach(datesArray, this._removeDateFromSelection, this);
        _yuitest_coverline("build/calendar-base/calendar-base.js", 519);
this._fireSelectionChange();
    },

    /**
     * A utility method that removes a given range of dates from selection.
     * @method _removeDateRangeFromSelection
     * @param {Date} startDate The first date of the given range.
     * @param {Date} endDate The last date of the given range.
     * @private
     */
    _removeDateRangeFromSelection : function (startDate, endDate) {
        _yuitest_coverfunc("build/calendar-base/calendar-base.js", "_removeDateRangeFromSelection", 529);
_yuitest_coverline("build/calendar-base/calendar-base.js", 530);
var startTime = startDate.getTime(),
            endTime   = endDate.getTime(),
            time;

        _yuitest_coverline("build/calendar-base/calendar-base.js", 534);
for (time = startTime; time <= endTime; time += 86400000) {
            _yuitest_coverline("build/calendar-base/calendar-base.js", 535);
this._removeDateFromSelection(new Date(time), time);
        }

        _yuitest_coverline("build/calendar-base/calendar-base.js", 538);
this._fireSelectionChange();
    },

    /**
     * A utility method that removes all dates from selection.
     * @method _clearSelection
     * @param {boolean} noevent A Boolean specifying whether a selectionChange
     * event should be fired. If true, the event is not fired.
     * @private
     */
    _clearSelection : function (noevent) {
        _yuitest_coverfunc("build/calendar-base/calendar-base.js", "_clearSelection", 548);
_yuitest_coverline("build/calendar-base/calendar-base.js", 549);
this._selectedDates = {};
        _yuitest_coverline("build/calendar-base/calendar-base.js", 550);
this.get("contentBox").all("." + CAL_DAY_SELECTED).removeClass(CAL_DAY_SELECTED).setAttribute("aria-selected", false);
        _yuitest_coverline("build/calendar-base/calendar-base.js", 551);
if (!noevent) {
            _yuitest_coverline("build/calendar-base/calendar-base.js", 552);
this._fireSelectionChange();
        }
    },

    /**
     * A utility method that fires a selectionChange event.
     * @method _fireSelectionChange
     * @private
     */
    _fireSelectionChange : function () {

        /**
        * Fired when the set of selected dates changes. Contains a payload with
        * a `newSelection` property with an array of selected dates.
        *
        * @event selectionChange
        */
        _yuitest_coverfunc("build/calendar-base/calendar-base.js", "_fireSelectionChange", 561);
_yuitest_coverline("build/calendar-base/calendar-base.js", 569);
this.fire("selectionChange", {newSelection: this._getSelectedDatesList()});
    },

    /**
     * A utility method that restores cells modified by custom formatting.
     * @method _restoreModifiedCells
     * @private
     */
    _restoreModifiedCells : function () {
        _yuitest_coverfunc("build/calendar-base/calendar-base.js", "_restoreModifiedCells", 577);
_yuitest_coverline("build/calendar-base/calendar-base.js", 578);
var contentbox = this.get("contentBox"),
            id;
        _yuitest_coverline("build/calendar-base/calendar-base.js", 580);
for (id in this._storedDateCells) {
            _yuitest_coverline("build/calendar-base/calendar-base.js", 581);
contentbox.one("#" + id).replace(this._storedDateCells[id]);
            _yuitest_coverline("build/calendar-base/calendar-base.js", 582);
delete this._storedDateCells[id];
        }
    },

    /**
     * A rendering assist method that renders all cells modified by the customRenderer
     * rules, as well as the enabledDatesRule and disabledDatesRule.
     * @method _renderCustomRules
     * @private
     */
    _renderCustomRules : function () {

        _yuitest_coverfunc("build/calendar-base/calendar-base.js", "_renderCustomRules", 592);
_yuitest_coverline("build/calendar-base/calendar-base.js", 594);
this.get("contentBox").all("." + CAL_DAY + ",." + CAL_NEXTMONTH_DAY).removeClass(SELECTION_DISABLED).setAttribute("aria-disabled", false);

        _yuitest_coverline("build/calendar-base/calendar-base.js", 596);
if (!isEmpty(this._rules)) {
            _yuitest_coverline("build/calendar-base/calendar-base.js", 597);
var paneNum,
                paneDate,
                dateArray;

            _yuitest_coverline("build/calendar-base/calendar-base.js", 601);
for (paneNum = 0; paneNum < this._paneNumber; paneNum++) {
                _yuitest_coverline("build/calendar-base/calendar-base.js", 602);
paneDate = ydate.addMonths(this.get("date"), paneNum);
                _yuitest_coverline("build/calendar-base/calendar-base.js", 603);
dateArray = ydate.listOfDatesInMonth(paneDate);
                _yuitest_coverline("build/calendar-base/calendar-base.js", 604);
arrayEach(dateArray, Y.bind(this._renderCustomRulesHelper, this));
            }
        }
    },

    /**
    * A handler for a date selection event (either a click or a keyboard
    *   selection) that adds the appropriate CSS class to a specific DOM
    *   node corresponding to the date and sets its aria-selected
    *   attribute to true.
    *
    * @method _renderCustomRulesHelper
    * @private
    */
    _renderCustomRulesHelper: function (date) {
        _yuitest_coverfunc("build/calendar-base/calendar-base.js", "_renderCustomRulesHelper", 618);
_yuitest_coverline("build/calendar-base/calendar-base.js", 619);
var enRule = this.get("enabledDatesRule"),
            disRule = this.get("disabledDatesRule"),
            matchingRules,
            dateNode;

        _yuitest_coverline("build/calendar-base/calendar-base.js", 624);
matchingRules = this._getRulesForDate(date);
        _yuitest_coverline("build/calendar-base/calendar-base.js", 625);
if (matchingRules.length > 0) {
            _yuitest_coverline("build/calendar-base/calendar-base.js", 626);
dateNode = this._dateToNode(date);
            _yuitest_coverline("build/calendar-base/calendar-base.js", 627);
if ((enRule && iOf(matchingRules, enRule) < 0) || (!enRule && disRule && iOf(matchingRules, disRule) >= 0)) {
                _yuitest_coverline("build/calendar-base/calendar-base.js", 628);
dateNode.addClass(SELECTION_DISABLED).setAttribute("aria-disabled", true);
            }

            _yuitest_coverline("build/calendar-base/calendar-base.js", 631);
if (L.isFunction(this._filterFunction)) {
                _yuitest_coverline("build/calendar-base/calendar-base.js", 632);
this._storedDateCells[dateNode.get("id")] = dateNode.cloneNode(true);
                _yuitest_coverline("build/calendar-base/calendar-base.js", 633);
this._filterFunction (date, dateNode, matchingRules);
            }
        } else {_yuitest_coverline("build/calendar-base/calendar-base.js", 635);
if (enRule) {
             _yuitest_coverline("build/calendar-base/calendar-base.js", 636);
dateNode = this._dateToNode(date);
             _yuitest_coverline("build/calendar-base/calendar-base.js", 637);
dateNode.addClass(SELECTION_DISABLED).setAttribute("aria-disabled", true);
        }}
    },

    /**
     * A rendering assist method that renders all cells that are currently selected.
     * @method _renderSelectedDates
     * @private
     */
    _renderSelectedDates : function () {
        _yuitest_coverfunc("build/calendar-base/calendar-base.js", "_renderSelectedDates", 646);
_yuitest_coverline("build/calendar-base/calendar-base.js", 647);
this.get("contentBox").all("." + CAL_DAY_SELECTED).removeClass(CAL_DAY_SELECTED).setAttribute("aria-selected", false);

        _yuitest_coverline("build/calendar-base/calendar-base.js", 649);
var paneNum,
            paneDate,
            dateArray;

        _yuitest_coverline("build/calendar-base/calendar-base.js", 653);
for (paneNum = 0; paneNum < this._paneNumber; paneNum++) {
            _yuitest_coverline("build/calendar-base/calendar-base.js", 654);
paneDate = ydate.addMonths(this.get("date"), paneNum);
            _yuitest_coverline("build/calendar-base/calendar-base.js", 655);
dateArray = this._getSelectedDatesInMonth(paneDate);

            _yuitest_coverline("build/calendar-base/calendar-base.js", 657);
arrayEach(dateArray, Y.bind(this._renderSelectedDatesHelper, this));
        }
    },

    /**
    * Takes in a date and determines whether that date has any rules
    *   matching it in the customRenderer; then calls the specified
    *   filterFunction if that's the case and/or disables the date
    *   if the rule is specified as a disabledDatesRule.
    *
    * @method _renderSelectedDatesHelper
    * @private
    */
    _renderSelectedDatesHelper: function (date) {
        _yuitest_coverfunc("build/calendar-base/calendar-base.js", "_renderSelectedDatesHelper", 670);
_yuitest_coverline("build/calendar-base/calendar-base.js", 671);
this._dateToNode(date).addClass(CAL_DAY_SELECTED).setAttribute("aria-selected", true);
    },

    /**
     * A utility method that converts a date to the node wrapping the calendar cell
     * the date corresponds to..
     * @method _dateToNode
     * @param {Date} oDate The date to convert to Node
     * @protected
     * @return {Node} The node wrapping the DOM element of the cell the date
     * corresponds to.
     */
    _dateToNode : function (oDate) {
        _yuitest_coverfunc("build/calendar-base/calendar-base.js", "_dateToNode", 683);
_yuitest_coverline("build/calendar-base/calendar-base.js", 684);
var day = oDate.getDate(),
            col = 0,
            daymod = day%7,
            paneNum = (12 + oDate.getMonth() - this.get("date").getMonth()) % 12,
            paneId = this._calendarId + "_pane_" + paneNum,
            cutoffCol = this._paneProperties[paneId].cutoffCol;

        _yuitest_coverline("build/calendar-base/calendar-base.js", 691);
switch (daymod) {
            case (0):
                _yuitest_coverline("build/calendar-base/calendar-base.js", 693);
if (cutoffCol >= 6) {
                    _yuitest_coverline("build/calendar-base/calendar-base.js", 694);
col = 12;
                } else {
                    _yuitest_coverline("build/calendar-base/calendar-base.js", 696);
col = 5;
                }
                _yuitest_coverline("build/calendar-base/calendar-base.js", 698);
break;
            case (1):
                    _yuitest_coverline("build/calendar-base/calendar-base.js", 700);
col = 6;
                _yuitest_coverline("build/calendar-base/calendar-base.js", 701);
break;
            case (2):
                _yuitest_coverline("build/calendar-base/calendar-base.js", 703);
if (cutoffCol > 0) {
                    _yuitest_coverline("build/calendar-base/calendar-base.js", 704);
col = 7;
                } else {
                    _yuitest_coverline("build/calendar-base/calendar-base.js", 706);
col = 0;
                }
                _yuitest_coverline("build/calendar-base/calendar-base.js", 708);
break;
            case (3):
                _yuitest_coverline("build/calendar-base/calendar-base.js", 710);
if (cutoffCol > 1) {
                    _yuitest_coverline("build/calendar-base/calendar-base.js", 711);
col = 8;
                } else {
                    _yuitest_coverline("build/calendar-base/calendar-base.js", 713);
col = 1;
                }
                _yuitest_coverline("build/calendar-base/calendar-base.js", 715);
break;
            case (4):
                _yuitest_coverline("build/calendar-base/calendar-base.js", 717);
if (cutoffCol > 2) {
                    _yuitest_coverline("build/calendar-base/calendar-base.js", 718);
col = 9;
                } else {
                    _yuitest_coverline("build/calendar-base/calendar-base.js", 720);
col = 2;
                }
                _yuitest_coverline("build/calendar-base/calendar-base.js", 722);
break;
            case (5):
                _yuitest_coverline("build/calendar-base/calendar-base.js", 724);
if (cutoffCol > 3) {
                    _yuitest_coverline("build/calendar-base/calendar-base.js", 725);
col = 10;
                } else {
                    _yuitest_coverline("build/calendar-base/calendar-base.js", 727);
col = 3;
                }
                _yuitest_coverline("build/calendar-base/calendar-base.js", 729);
break;
            case (6):
                _yuitest_coverline("build/calendar-base/calendar-base.js", 731);
if (cutoffCol > 4) {
                    _yuitest_coverline("build/calendar-base/calendar-base.js", 732);
col = 11;
                } else {
                    _yuitest_coverline("build/calendar-base/calendar-base.js", 734);
col = 4;
                }
                _yuitest_coverline("build/calendar-base/calendar-base.js", 736);
break;
        }
        _yuitest_coverline("build/calendar-base/calendar-base.js", 738);
return(this.get("contentBox").one("#" + this._calendarId + "_pane_" + paneNum + "_" + col + "_" + day));

    },

    /**
     * A utility method that converts a node corresponding to the DOM element of
     * the cell for a particular date to that date.
     * @method _nodeToDate
     * @param {Node} oNode The Node wrapping the DOM element of a particular date cell.
     * @protected
     * @return {Date} The date corresponding to the DOM element that the given node wraps.
     */
    _nodeToDate : function (oNode) {

        _yuitest_coverfunc("build/calendar-base/calendar-base.js", "_nodeToDate", 750);
_yuitest_coverline("build/calendar-base/calendar-base.js", 752);
var idParts = oNode.get("id").split("_").reverse(),
            paneNum = parseInt(idParts[2], 10),
            day  = parseInt(idParts[0], 10),
            shiftedDate = ydate.addMonths(this.get("date"), paneNum),
            year = shiftedDate.getFullYear(),
            month = shiftedDate.getMonth();

        _yuitest_coverline("build/calendar-base/calendar-base.js", 759);
return new Date(year, month, day, 12, 0, 0, 0);
    },

    /**
     * A placeholder method, called from bindUI, to bind the Calendar events.
     * @method _bindCalendarEvents
     * @protected
     */
    _bindCalendarEvents : function () {},

    /**
     * A utility method that normalizes a given date by converting it to the 1st
     * day of the month the date is in, with the time set to noon.
     * @method _normalizeDate
     * @param {Date} oDate The date to normalize
     * @protected
     * @return {Date} The normalized date, set to the first of the month, with time
     * set to noon.
     */
    _normalizeDate : function (date) {
        _yuitest_coverfunc("build/calendar-base/calendar-base.js", "_normalizeDate", 778);
_yuitest_coverline("build/calendar-base/calendar-base.js", 779);
if (date) {
            _yuitest_coverline("build/calendar-base/calendar-base.js", 780);
return new Date(date.getFullYear(), date.getMonth(), 1, 12, 0, 0, 0);
        } else {
            _yuitest_coverline("build/calendar-base/calendar-base.js", 782);
return null;
        }
    },


    /**
     * A render assist utility method that computes the cutoff column for the calendar
     * rendering mask.
     * @method _getCutoffColumn
     * @param {Date} date The date of the month grid to compute the cutoff column for.
     * @param {Number} firstday The first day of the week (modified by internationalized calendars)
     * @private
     * @return {Number} The number of the cutoff column.
     */
    _getCutoffColumn : function (date, firstday) {
        _yuitest_coverfunc("build/calendar-base/calendar-base.js", "_getCutoffColumn", 796);
_yuitest_coverline("build/calendar-base/calendar-base.js", 797);
var distance = this._normalizeDate(date).getDay() - firstday,
            cutOffColumn = 6 - (distance + 7) % 7;
        _yuitest_coverline("build/calendar-base/calendar-base.js", 799);
return cutOffColumn;
    },

    /**
     * A render assist method that turns on the view of the previous month's dates
     * in a given calendar pane.
     * @method _turnPrevMonthOn
     * @param {Node} pane The calendar pane that needs its previous month's dates view
     * modified.
     * @protected
     */
    _turnPrevMonthOn : function (pane) {
        _yuitest_coverfunc("build/calendar-base/calendar-base.js", "_turnPrevMonthOn", 810);
_yuitest_coverline("build/calendar-base/calendar-base.js", 811);
var pane_id = pane.get("id"),
            pane_date = this._paneProperties[pane_id].paneDate,
            daysInPrevMonth = ydate.daysInMonth(ydate.addMonths(pane_date, -1)),
            cell;

        _yuitest_coverline("build/calendar-base/calendar-base.js", 816);
if (!this._paneProperties[pane_id].hasOwnProperty("daysInPrevMonth")) {
            _yuitest_coverline("build/calendar-base/calendar-base.js", 817);
this._paneProperties[pane_id].daysInPrevMonth = 0;
        }

        _yuitest_coverline("build/calendar-base/calendar-base.js", 820);
if (daysInPrevMonth !== this._paneProperties[pane_id].daysInPrevMonth) {

            _yuitest_coverline("build/calendar-base/calendar-base.js", 822);
this._paneProperties[pane_id].daysInPrevMonth = daysInPrevMonth;

            _yuitest_coverline("build/calendar-base/calendar-base.js", 824);
for (cell = 5; cell >= 0; cell--) {
                _yuitest_coverline("build/calendar-base/calendar-base.js", 825);
pane.one("#" + pane_id + "_" + cell + "_" + (cell-5)).set('text', daysInPrevMonth--);
            }
        }
    },

    /**
     * A render assist method that turns off the view of the previous month's dates
     * in a given calendar pane.
     * @method _turnPrevMonthOff
     * @param {Node} pane The calendar pane that needs its previous month's dates view
     * modified.
     * @protected
     */
    _turnPrevMonthOff : function (pane) {
        _yuitest_coverfunc("build/calendar-base/calendar-base.js", "_turnPrevMonthOff", 838);
_yuitest_coverline("build/calendar-base/calendar-base.js", 839);
var pane_id = pane.get("id"),
            cell;

        _yuitest_coverline("build/calendar-base/calendar-base.js", 842);
this._paneProperties[pane_id].daysInPrevMonth = 0;

        _yuitest_coverline("build/calendar-base/calendar-base.js", 844);
for (cell = 5; cell >= 0; cell--) {
            _yuitest_coverline("build/calendar-base/calendar-base.js", 845);
pane.one("#" + pane_id + "_" + cell + "_" + (cell-5)).setContent("&nbsp;");
        }
    },

    /**
     * A render assist method that cleans up the last few cells in the month grid
     * when the number of days in the month changes.
     * @method _cleanUpNextMonthCells
     * @param {Node} pane The calendar pane that needs the last date cells cleaned up.
     * @private
     */
    _cleanUpNextMonthCells : function (pane) {
        _yuitest_coverfunc("build/calendar-base/calendar-base.js", "_cleanUpNextMonthCells", 856);
_yuitest_coverline("build/calendar-base/calendar-base.js", 857);
var pane_id = pane.get("id");
            _yuitest_coverline("build/calendar-base/calendar-base.js", 858);
pane.one("#" + pane_id + "_6_29").removeClass(CAL_NEXTMONTH_DAY);
            _yuitest_coverline("build/calendar-base/calendar-base.js", 859);
pane.one("#" + pane_id + "_7_30").removeClass(CAL_NEXTMONTH_DAY);
            _yuitest_coverline("build/calendar-base/calendar-base.js", 860);
pane.one("#" + pane_id + "_8_31").removeClass(CAL_NEXTMONTH_DAY);
            _yuitest_coverline("build/calendar-base/calendar-base.js", 861);
pane.one("#" + pane_id + "_0_30").removeClass(CAL_NEXTMONTH_DAY);
            _yuitest_coverline("build/calendar-base/calendar-base.js", 862);
pane.one("#" + pane_id + "_1_31").removeClass(CAL_NEXTMONTH_DAY);
    },

    /**
     * A render assist method that turns on the view of the next month's dates
     * in a given calendar pane.
     * @method _turnNextMonthOn
     * @param {Node} pane The calendar pane that needs its next month's dates view
     * modified.
     * @protected
     */
    _turnNextMonthOn : function (pane) {
        _yuitest_coverfunc("build/calendar-base/calendar-base.js", "_turnNextMonthOn", 873);
_yuitest_coverline("build/calendar-base/calendar-base.js", 874);
var dayCounter = 1,
            pane_id = pane.get("id"),
            daysInMonth = this._paneProperties[pane_id].daysInMonth,
            cutoffCol = this._paneProperties[pane_id].cutoffCol,
            cell,
            startingCell;

        _yuitest_coverline("build/calendar-base/calendar-base.js", 881);
for (cell = daysInMonth - 22; cell < cutoffCol + 7; cell++) {
            _yuitest_coverline("build/calendar-base/calendar-base.js", 882);
pane.one("#" + pane_id + "_" + cell + "_" + (cell+23)).set("text", dayCounter++).addClass(CAL_NEXTMONTH_DAY);
        }

        _yuitest_coverline("build/calendar-base/calendar-base.js", 885);
startingCell = cutoffCol;

        _yuitest_coverline("build/calendar-base/calendar-base.js", 887);
if (daysInMonth === 31 && (cutoffCol <= 1)) {
            _yuitest_coverline("build/calendar-base/calendar-base.js", 888);
startingCell = 2;
        } else {_yuitest_coverline("build/calendar-base/calendar-base.js", 889);
if (daysInMonth === 30 && cutoffCol === 0) {
            _yuitest_coverline("build/calendar-base/calendar-base.js", 890);
startingCell = 1;
        }}

        _yuitest_coverline("build/calendar-base/calendar-base.js", 893);
for (cell = startingCell ; cell < cutoffCol + 7; cell++) {
            _yuitest_coverline("build/calendar-base/calendar-base.js", 894);
pane.one("#" + pane_id + "_" + cell + "_" + (cell+30)).set("text", dayCounter++).addClass(CAL_NEXTMONTH_DAY);
        }
    },

    /**
     * A render assist method that turns off the view of the next month's dates
     * in a given calendar pane.
     * @method _turnNextMonthOff
     * @param {Node} pane The calendar pane that needs its next month's dates view
     * modified.
     * @protected
     */
    _turnNextMonthOff : function (pane) {
            _yuitest_coverfunc("build/calendar-base/calendar-base.js", "_turnNextMonthOff", 906);
_yuitest_coverline("build/calendar-base/calendar-base.js", 907);
var pane_id = pane.get("id"),
                daysInMonth = this._paneProperties[pane_id].daysInMonth,
                cutoffCol = this._paneProperties[pane_id].cutoffCol,
                cell,
                startingCell;

            _yuitest_coverline("build/calendar-base/calendar-base.js", 913);
for (cell = daysInMonth - 22; cell <= 12; cell++) {
                _yuitest_coverline("build/calendar-base/calendar-base.js", 914);
pane.one("#" + pane_id + "_" + cell + "_" + (cell+23)).setContent("&nbsp;").addClass(CAL_NEXTMONTH_DAY);
            }

            _yuitest_coverline("build/calendar-base/calendar-base.js", 917);
startingCell = 0;

            _yuitest_coverline("build/calendar-base/calendar-base.js", 919);
if (daysInMonth === 31 && (cutoffCol <= 1)) {
                _yuitest_coverline("build/calendar-base/calendar-base.js", 920);
startingCell = 2;
            } else {_yuitest_coverline("build/calendar-base/calendar-base.js", 921);
if (daysInMonth === 30 && cutoffCol === 0) {
                _yuitest_coverline("build/calendar-base/calendar-base.js", 922);
startingCell = 1;
            }}

            _yuitest_coverline("build/calendar-base/calendar-base.js", 925);
for (cell = startingCell ; cell <= 12; cell++) {
                _yuitest_coverline("build/calendar-base/calendar-base.js", 926);
pane.one("#" + pane_id + "_" + cell + "_" + (cell+30)).setContent("&nbsp;").addClass(CAL_NEXTMONTH_DAY);
            }
    },

    /**
     * The handler for the change in the showNextMonth attribute.
     * @method _afterShowNextMonthChange
     * @private
     */
    _afterShowNextMonthChange : function () {

        _yuitest_coverfunc("build/calendar-base/calendar-base.js", "_afterShowNextMonthChange", 935);
_yuitest_coverline("build/calendar-base/calendar-base.js", 937);
var contentBox = this.get('contentBox'),
            lastPane = contentBox.one("#" + this._calendarId + "_pane_" + (this._paneNumber - 1));

        _yuitest_coverline("build/calendar-base/calendar-base.js", 940);
this._cleanUpNextMonthCells(lastPane);

        _yuitest_coverline("build/calendar-base/calendar-base.js", 942);
if (this.get('showNextMonth')) {
            _yuitest_coverline("build/calendar-base/calendar-base.js", 943);
this._turnNextMonthOn(lastPane);
        } else {
            _yuitest_coverline("build/calendar-base/calendar-base.js", 945);
this._turnNextMonthOff(lastPane);
        }

    },

    /**
     * The handler for the change in the showPrevMonth attribute.
     * @method _afterShowPrevMonthChange
     * @private
     */
    _afterShowPrevMonthChange : function () {
        _yuitest_coverfunc("build/calendar-base/calendar-base.js", "_afterShowPrevMonthChange", 955);
_yuitest_coverline("build/calendar-base/calendar-base.js", 956);
var contentBox = this.get('contentBox'),
            firstPane = contentBox.one("#" + this._calendarId + "_pane_" + 0);

        _yuitest_coverline("build/calendar-base/calendar-base.js", 959);
if (this.get('showPrevMonth')) {
            _yuitest_coverline("build/calendar-base/calendar-base.js", 960);
this._turnPrevMonthOn(firstPane);
        } else {
            _yuitest_coverline("build/calendar-base/calendar-base.js", 962);
this._turnPrevMonthOff(firstPane);
        }

    },

     /**
     * The handler for the change in the headerRenderer attribute.
     * @method _afterHeaderRendererChange
     * @private
     */
    _afterHeaderRendererChange : function () {
        _yuitest_coverfunc("build/calendar-base/calendar-base.js", "_afterHeaderRendererChange", 972);
_yuitest_coverline("build/calendar-base/calendar-base.js", 973);
var headerCell = this.get("contentBox").one("." + CAL_HD_LABEL);
        _yuitest_coverline("build/calendar-base/calendar-base.js", 974);
headerCell.setContent(this._updateCalendarHeader(this.get('date')));
    },

     /**
     * The handler for the change in the customRenderer attribute.
     * @method _afterCustomRendererChange
     * @private
     */
    _afterCustomRendererChange : function () {
        _yuitest_coverfunc("build/calendar-base/calendar-base.js", "_afterCustomRendererChange", 982);
_yuitest_coverline("build/calendar-base/calendar-base.js", 983);
this._restoreModifiedCells();
        _yuitest_coverline("build/calendar-base/calendar-base.js", 984);
this._renderCustomRules();
    },

     /**
     * The handler for the change in the date attribute. Modifies the calendar
     * view by shifting the calendar grid mask and running custom rendering and
     * selection rendering as necessary.
     * @method _afterDateChange
     * @private
     */
    _afterDateChange : function () {

        _yuitest_coverfunc("build/calendar-base/calendar-base.js", "_afterDateChange", 994);
_yuitest_coverline("build/calendar-base/calendar-base.js", 996);
var contentBox = this.get('contentBox'),
            headerCell = contentBox.one("." + CAL_HD).one("." + CAL_HD_LABEL),
            calendarPanes = contentBox.all("." + CAL_GRID),
            currentDate = this.get("date"),
            counter = 0;

        _yuitest_coverline("build/calendar-base/calendar-base.js", 1002);
contentBox.setStyle("visibility", "hidden");
        _yuitest_coverline("build/calendar-base/calendar-base.js", 1003);
headerCell.setContent(this._updateCalendarHeader(currentDate));

        _yuitest_coverline("build/calendar-base/calendar-base.js", 1005);
this._restoreModifiedCells();

        _yuitest_coverline("build/calendar-base/calendar-base.js", 1007);
calendarPanes.each(function (curNode) {
            _yuitest_coverfunc("build/calendar-base/calendar-base.js", "(anonymous 5)", 1007);
_yuitest_coverline("build/calendar-base/calendar-base.js", 1008);
this._rerenderCalendarPane(ydate.addMonths(currentDate, counter++), curNode);
        }, this);

        _yuitest_coverline("build/calendar-base/calendar-base.js", 1011);
this._afterShowPrevMonthChange();
        _yuitest_coverline("build/calendar-base/calendar-base.js", 1012);
this._afterShowNextMonthChange();

        _yuitest_coverline("build/calendar-base/calendar-base.js", 1014);
this._renderCustomRules();
        _yuitest_coverline("build/calendar-base/calendar-base.js", 1015);
this._renderSelectedDates();

        _yuitest_coverline("build/calendar-base/calendar-base.js", 1017);
contentBox.setStyle("visibility", "visible");
    },


     /**
     * A rendering assist method that initializes the HTML for a single
     * calendar pane.
     * @method _initCalendarPane
     * @param {Date} baseDate The date corresponding to the month of the given
     * calendar pane.
     * @param {String} pane_id The id of the pane, to be used as a prefix for
     * element ids in the given pane.
     * @private
     */
    _initCalendarPane : function (baseDate, pane_id) {
        // Get a list of short weekdays from the internationalization package, or else use default English ones.
        _yuitest_coverfunc("build/calendar-base/calendar-base.js", "_initCalendarPane", 1031);
_yuitest_coverline("build/calendar-base/calendar-base.js", 1033);
var weekdays = this.get('strings.very_short_weekdays') || ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            fullweekdays = this.get('strings.weekdays') || ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            // Get the first day of the week from the internationalization package, or else use Sunday as default.
            firstday = this.get('strings.first_weekday') || 0,
            // Compute the cutoff column of the masked calendar table, based on the start date and the first day of week.
            cutoffCol = this._getCutoffColumn(baseDate, firstday),
            // Compute the number of days in the month based on starting date
            daysInMonth = ydate.daysInMonth(baseDate),
            // Initialize the array of individual row HTML strings
            row_array = ['','','','','',''],
            // Initialize the partial templates object
            partials = {},

            day,
            row,
            column,
            date,
            id_date,
            calendar_day_class,
            column_visibility,
            output;

            // Initialize the partial template for the weekday row cells.
            _yuitest_coverline("build/calendar-base/calendar-base.js", 1056);
partials.weekday_row = '';

        // Populate the partial template for the weekday row cells with weekday names
        _yuitest_coverline("build/calendar-base/calendar-base.js", 1059);
for (day = firstday; day <= firstday + 6; day++) {
            _yuitest_coverline("build/calendar-base/calendar-base.js", 1060);
partials.weekday_row +=
                substitute(CalendarBase.WEEKDAY_TEMPLATE, {
                    weekdayname: weekdays[day%7],
                    full_weekdayname: fullweekdays[day%7]
                });
        }

        // Populate the partial template for the weekday row container with the weekday row cells
        _yuitest_coverline("build/calendar-base/calendar-base.js", 1068);
partials.weekday_row_template = substitute(CalendarBase.WEEKDAY_ROW_TEMPLATE, partials);

        // Populate the array of individual row HTML strings
        _yuitest_coverline("build/calendar-base/calendar-base.js", 1071);
for (row = 0; row <= 5; row++) {

            _yuitest_coverline("build/calendar-base/calendar-base.js", 1073);
for (column = 0; column <= 12; column++) {

                // Compute the value of the date that needs to populate the cell
                _yuitest_coverline("build/calendar-base/calendar-base.js", 1076);
date = 7*row - 5 + column;

                // Compose the value of the unique id of the current calendar cell
                _yuitest_coverline("build/calendar-base/calendar-base.js", 1079);
id_date = pane_id + "_" + column + "_" + date;

                // Set the calendar day class to one of three possible values
                _yuitest_coverline("build/calendar-base/calendar-base.js", 1082);
calendar_day_class = CAL_DAY;

                _yuitest_coverline("build/calendar-base/calendar-base.js", 1084);
if (date < 1) {
                    _yuitest_coverline("build/calendar-base/calendar-base.js", 1085);
calendar_day_class = CAL_PREVMONTH_DAY;
                } else {_yuitest_coverline("build/calendar-base/calendar-base.js", 1086);
if (date > daysInMonth) {
                    _yuitest_coverline("build/calendar-base/calendar-base.js", 1087);
calendar_day_class = CAL_NEXTMONTH_DAY;
                }}

                // Cut off dates that fall before the first and after the last date of the month
                _yuitest_coverline("build/calendar-base/calendar-base.js", 1091);
if (date < 1 || date > daysInMonth) {
                    _yuitest_coverline("build/calendar-base/calendar-base.js", 1092);
date = "&nbsp;";
                }

                // Decide on whether a column in the masked table is visible or not based on the value of the cutoff column.
                _yuitest_coverline("build/calendar-base/calendar-base.js", 1096);
column_visibility = (column >= cutoffCol && column < (cutoffCol + 7)) ? '' : CAL_COL_HIDDEN;

                // Substitute the values into the partial calendar day template and add it to the current row HTML string
                _yuitest_coverline("build/calendar-base/calendar-base.js", 1099);
row_array[row] += substitute (CalendarBase.CALDAY_TEMPLATE, {
                    day_content: date,
                    calendar_col_class: "calendar_col" + column,
                    calendar_col_visibility_class: column_visibility,
                    calendar_day_class: calendar_day_class,
                    calendar_day_id: id_date
                });
            }
        }

        // Instantiate the partial calendar pane body template
        _yuitest_coverline("build/calendar-base/calendar-base.js", 1110);
partials.body_template = '';

        // Populate the body template with the rows templates
        _yuitest_coverline("build/calendar-base/calendar-base.js", 1113);
arrayEach (row_array, function (v) {
             _yuitest_coverfunc("build/calendar-base/calendar-base.js", "(anonymous 6)", 1113);
_yuitest_coverline("build/calendar-base/calendar-base.js", 1114);
partials.body_template += substitute(CalendarBase.CALDAY_ROW_TEMPLATE, {calday_row: v});
        });

        // Populate the calendar grid id
        _yuitest_coverline("build/calendar-base/calendar-base.js", 1118);
partials.calendar_pane_id = pane_id;

        // Populate the calendar pane tabindex
        _yuitest_coverline("build/calendar-base/calendar-base.js", 1121);
partials.calendar_pane_tabindex = this.get("tabIndex");
        _yuitest_coverline("build/calendar-base/calendar-base.js", 1122);
partials.pane_arialabel = ydate.format(baseDate, { format: "%B %Y" });


        // Generate final output by substituting class names.
        _yuitest_coverline("build/calendar-base/calendar-base.js", 1126);
output = substitute(substitute (CalendarBase.CALENDAR_GRID_TEMPLATE, partials),
                                                        CalendarBase.CALENDAR_STRINGS);

        // Store the initialized pane information
        _yuitest_coverline("build/calendar-base/calendar-base.js", 1130);
this._paneProperties[pane_id] = {cutoffCol: cutoffCol, daysInMonth: daysInMonth, paneDate: baseDate};

        _yuitest_coverline("build/calendar-base/calendar-base.js", 1132);
return output;
    },

     /**
     * A rendering assist method that rerenders a specified calendar pane, based
     * on a new Date.
     * @method _rerenderCalendarPane
     * @param {Date} newDate The date corresponding to the month of the given
     * calendar pane.
     * @param {Node} pane The node corresponding to the calendar pane to be rerenders.
     * @private
     */
    _rerenderCalendarPane : function (newDate, pane) {

        // Get the first day of the week from the internationalization package, or else use Sunday as default.
        _yuitest_coverfunc("build/calendar-base/calendar-base.js", "_rerenderCalendarPane", 1144);
_yuitest_coverline("build/calendar-base/calendar-base.js", 1147);
var firstday = this.get('strings.first_weekday') || 0,
            // Compute the cutoff column of the masked calendar table, based on the start date and the first day of week.
            cutoffCol = this._getCutoffColumn(newDate, firstday),
            // Compute the number of days in the month based on starting date
            daysInMonth = ydate.daysInMonth(newDate),
            // Get pane id for easier reference
            paneId = pane.get("id"),
            column,
            currentColumn,
            curCell;

        // Hide the pane before making DOM changes to speed them up
        _yuitest_coverline("build/calendar-base/calendar-base.js", 1159);
pane.setStyle("visibility", "hidden");
        _yuitest_coverline("build/calendar-base/calendar-base.js", 1160);
pane.setAttribute("aria-label", ydate.format(newDate, {format:"%B %Y"}));

        // Go through all columns, and flip their visibility setting based on whether they are within the unmasked range.
        _yuitest_coverline("build/calendar-base/calendar-base.js", 1163);
for (column = 0; column <= 12; column++) {
            _yuitest_coverline("build/calendar-base/calendar-base.js", 1164);
currentColumn = pane.all("." + "calendar_col" + column);
            _yuitest_coverline("build/calendar-base/calendar-base.js", 1165);
currentColumn.removeClass(CAL_COL_HIDDEN);

            _yuitest_coverline("build/calendar-base/calendar-base.js", 1167);
if (column < cutoffCol || column >= (cutoffCol + 7)) {
                _yuitest_coverline("build/calendar-base/calendar-base.js", 1168);
currentColumn.addClass(CAL_COL_HIDDEN);
            } else {
                // Clean up dates in visible columns to account for the correct number of days in a month
                _yuitest_coverline("build/calendar-base/calendar-base.js", 1171);
switch(column) {
                    case 0:
                        _yuitest_coverline("build/calendar-base/calendar-base.js", 1173);
curCell = pane.one("#" + paneId + "_0_30");
                        _yuitest_coverline("build/calendar-base/calendar-base.js", 1174);
if (daysInMonth >= 30) {
                            _yuitest_coverline("build/calendar-base/calendar-base.js", 1175);
curCell.set("text", "30");
                            _yuitest_coverline("build/calendar-base/calendar-base.js", 1176);
curCell.removeClass(CAL_NEXTMONTH_DAY).addClass(CAL_DAY);
                        } else {
                            _yuitest_coverline("build/calendar-base/calendar-base.js", 1178);
curCell.setContent("&nbsp;");
                            _yuitest_coverline("build/calendar-base/calendar-base.js", 1179);
curCell.addClass(CAL_NEXTMONTH_DAY).addClass(CAL_DAY);
                        }
                        _yuitest_coverline("build/calendar-base/calendar-base.js", 1181);
break;
                    case 1:
                        _yuitest_coverline("build/calendar-base/calendar-base.js", 1183);
curCell = pane.one("#" + paneId + "_1_31");
                        _yuitest_coverline("build/calendar-base/calendar-base.js", 1184);
if (daysInMonth >= 31) {
                            _yuitest_coverline("build/calendar-base/calendar-base.js", 1185);
curCell.set("text", "31");
                            _yuitest_coverline("build/calendar-base/calendar-base.js", 1186);
curCell.removeClass(CAL_NEXTMONTH_DAY).addClass(CAL_DAY);
                        } else {
                            _yuitest_coverline("build/calendar-base/calendar-base.js", 1188);
curCell.setContent("&nbsp;");
                            _yuitest_coverline("build/calendar-base/calendar-base.js", 1189);
curCell.removeClass(CAL_DAY).addClass(CAL_NEXTMONTH_DAY);
                        }
                        _yuitest_coverline("build/calendar-base/calendar-base.js", 1191);
break;
                    case 6:
                        _yuitest_coverline("build/calendar-base/calendar-base.js", 1193);
curCell = pane.one("#" + paneId + "_6_29");
                        _yuitest_coverline("build/calendar-base/calendar-base.js", 1194);
if (daysInMonth >= 29) {
                            _yuitest_coverline("build/calendar-base/calendar-base.js", 1195);
curCell.set("text", "29");
                            _yuitest_coverline("build/calendar-base/calendar-base.js", 1196);
curCell.removeClass(CAL_NEXTMONTH_DAY).addClass(CAL_DAY);
                        } else {
                            _yuitest_coverline("build/calendar-base/calendar-base.js", 1198);
curCell.setContent("&nbsp;");
                            _yuitest_coverline("build/calendar-base/calendar-base.js", 1199);
curCell.removeClass(CAL_DAY).addClass(CAL_NEXTMONTH_DAY);
                        }
                        _yuitest_coverline("build/calendar-base/calendar-base.js", 1201);
break;
                    case 7:
                        _yuitest_coverline("build/calendar-base/calendar-base.js", 1203);
curCell = pane.one("#" + paneId + "_7_30");
                        _yuitest_coverline("build/calendar-base/calendar-base.js", 1204);
if (daysInMonth >= 30) {
                            _yuitest_coverline("build/calendar-base/calendar-base.js", 1205);
curCell.set("text", "30");
                            _yuitest_coverline("build/calendar-base/calendar-base.js", 1206);
curCell.removeClass(CAL_NEXTMONTH_DAY).addClass(CAL_DAY);
                        } else {
                            _yuitest_coverline("build/calendar-base/calendar-base.js", 1208);
curCell.setContent("&nbsp;");
                            _yuitest_coverline("build/calendar-base/calendar-base.js", 1209);
curCell.removeClass(CAL_DAY).addClass(CAL_NEXTMONTH_DAY);
                        }
                        _yuitest_coverline("build/calendar-base/calendar-base.js", 1211);
break;
                    case 8:
                        _yuitest_coverline("build/calendar-base/calendar-base.js", 1213);
curCell = pane.one("#" + paneId + "_8_31");
                        _yuitest_coverline("build/calendar-base/calendar-base.js", 1214);
if (daysInMonth >= 31) {
                            _yuitest_coverline("build/calendar-base/calendar-base.js", 1215);
curCell.set("text", "31");
                            _yuitest_coverline("build/calendar-base/calendar-base.js", 1216);
curCell.removeClass(CAL_NEXTMONTH_DAY).addClass(CAL_DAY);
                        } else {
                            _yuitest_coverline("build/calendar-base/calendar-base.js", 1218);
curCell.setContent("&nbsp;");
                            _yuitest_coverline("build/calendar-base/calendar-base.js", 1219);
curCell.removeClass(CAL_DAY).addClass(CAL_NEXTMONTH_DAY);
                        }
                        _yuitest_coverline("build/calendar-base/calendar-base.js", 1221);
break;
                }
            }
        }

        // Update stored pane properties
        _yuitest_coverline("build/calendar-base/calendar-base.js", 1227);
this._paneProperties[paneId].cutoffCol = cutoffCol;
        _yuitest_coverline("build/calendar-base/calendar-base.js", 1228);
this._paneProperties[paneId].daysInMonth = daysInMonth;
        _yuitest_coverline("build/calendar-base/calendar-base.js", 1229);
this._paneProperties[paneId].paneDate = newDate;

        // Bring the pane visibility back after all DOM changes are done
        _yuitest_coverline("build/calendar-base/calendar-base.js", 1232);
pane.setStyle("visibility", "visible");

    },

     /**
     * A rendering assist method that updates the calendar header based
     * on a given date and potentially the provided headerRenderer.
     * @method _updateCalendarHeader
     * @param {Date} baseDate The date with which to update the calendar header.
     * @private
     */
    _updateCalendarHeader : function (baseDate) {
        _yuitest_coverfunc("build/calendar-base/calendar-base.js", "_updateCalendarHeader", 1243);
_yuitest_coverline("build/calendar-base/calendar-base.js", 1244);
var headerString = "",
            headerRenderer = this.get("headerRenderer");

        _yuitest_coverline("build/calendar-base/calendar-base.js", 1247);
if (Y.Lang.isString(headerRenderer)) {
            _yuitest_coverline("build/calendar-base/calendar-base.js", 1248);
headerString = ydate.format(baseDate, {format:headerRenderer});
        } else {_yuitest_coverline("build/calendar-base/calendar-base.js", 1249);
if (headerRenderer instanceof Function) {
            _yuitest_coverline("build/calendar-base/calendar-base.js", 1250);
headerString = headerRenderer.call(this, baseDate);
        }}

        _yuitest_coverline("build/calendar-base/calendar-base.js", 1253);
return headerString;
    },

     /**
     * A rendering assist method that initializes the calendar header HTML
     * based on a given date and potentially the provided headerRenderer.
     * @method _updateCalendarHeader
     * @param {Date} baseDate The date with which to initialize the calendar header.
     * @private
     */
    _initCalendarHeader : function (baseDate) {
        _yuitest_coverfunc("build/calendar-base/calendar-base.js", "_initCalendarHeader", 1263);
_yuitest_coverline("build/calendar-base/calendar-base.js", 1264);
return substitute(substitute(CalendarBase.HEADER_TEMPLATE, {
                calheader: this._updateCalendarHeader(baseDate),
                calendar_id: this._calendarId
            }), CalendarBase.CALENDAR_STRINGS );
    },

     /**
     * A rendering assist method that initializes the calendar HTML
     * based on a given date.
     * @method _initCalendarHTML
     * @param {Date} baseDate The date with which to initialize the calendar.
     * @private
     */
    _initCalendarHTML : function (baseDate) {
        // Instantiate the partials holder
        _yuitest_coverfunc("build/calendar-base/calendar-base.js", "_initCalendarHTML", 1277);
_yuitest_coverline("build/calendar-base/calendar-base.js", 1279);
var partials = {},
            // Counter for iterative template replacement.
            counter = 0,
            singlePane,
            output;

        // Generate the template for the header
        _yuitest_coverline("build/calendar-base/calendar-base.js", 1286);
partials.header_template =  this._initCalendarHeader(baseDate);
        _yuitest_coverline("build/calendar-base/calendar-base.js", 1287);
partials.calendar_id = this._calendarId;

        _yuitest_coverline("build/calendar-base/calendar-base.js", 1289);
partials.body_template = substitute(substitute (CalendarBase.CONTENT_TEMPLATE, partials),
                                                                                 CalendarBase.CALENDAR_STRINGS);

        // Instantiate the iterative template replacer function
        _yuitest_coverline("build/calendar-base/calendar-base.js", 1293);
function paneReplacer () {
            _yuitest_coverfunc("build/calendar-base/calendar-base.js", "paneReplacer", 1293);
_yuitest_coverline("build/calendar-base/calendar-base.js", 1294);
singlePane = this._initCalendarPane(ydate.addMonths(baseDate, counter), partials.calendar_id + "_pane_" + counter);
            _yuitest_coverline("build/calendar-base/calendar-base.js", 1295);
counter++;
            _yuitest_coverline("build/calendar-base/calendar-base.js", 1296);
return singlePane;
        }

        // Go through all occurrences of the calendar_grid_template token and replace it with an appropriate calendar grid.
        _yuitest_coverline("build/calendar-base/calendar-base.js", 1300);
output = partials.body_template.replace(/\{calendar_grid_template\}/g, Y.bind(paneReplacer, this));

        // Update the paneNumber count
        _yuitest_coverline("build/calendar-base/calendar-base.js", 1303);
this._paneNumber = counter;

        _yuitest_coverline("build/calendar-base/calendar-base.js", 1305);
return output;
    }
}, {

     /**
        * The CSS classnames for the calendar templates.
        * @property CALENDAR_STRINGS
        * @type Object
        * @readOnly
        * @protected
        * @static
        */
    CALENDAR_STRINGS: {
        calendar_grid_class       : CAL_GRID,
        calendar_body_class       : CAL_BODY,
        calendar_hd_class         : CAL_HD,
        calendar_hd_label_class   : CAL_HD_LABEL,
        calendar_weekdayrow_class : CAL_WDAYROW,
        calendar_weekday_class    : CAL_WDAY,
        calendar_row_class        : CAL_ROW,
        calendar_day_class        : CAL_DAY,
        calendar_dayanchor_class  : CAL_ANCHOR,
        calendar_pane_class       : CAL_PANE,
        calendar_right_grid_class : CAL_RIGHT_GRID,
        calendar_left_grid_class  : CAL_LEFT_GRID,
        calendar_status_class     : CAL_STATUS
    },

    /*

    ARIA_STATUS_TEMPLATE: '<div role="status" aria-atomic="true" class="{calendar_status_class}"></div>',

    AriaStatus : null,

    updateStatus : function (statusString) {

        if (!CalendarBase.AriaStatus) {
            CalendarBase.AriaStatus = create(
                                                         substitute (CalendarBase.ARIA_STATUS_TEMPLATE,
                                                                                 CalendarBase.CALENDAR_STRINGS));
            Y.one("body").append(CalendarBase.AriaStatus);
        }

            CalendarBase.AriaStatus.set("text", statusString);
    },

    */

     /**
        * The main content template for calendar.
        * @property CONTENT_TEMPLATE
        * @type String
        * @protected
        * @static
        */
    CONTENT_TEMPLATE:  '<div class="yui3-g {calendar_pane_class}" id="{calendar_id}">' +
                        '{header_template}' +
                        '<div class="yui3-u-1">' +
                        '{calendar_grid_template}' +
                        '</div>' +
                        '</div>',

     /**
        * A single pane template for calendar (same as default CONTENT_TEMPLATE)
        * @property ONE_PANE_TEMPLATE
        * @type String
        * @protected
        * @readOnly
        * @static
        */
    ONE_PANE_TEMPLATE: '<div class="yui3-g {calendar_pane_class}" id="{calendar_id}">' +
                            '{header_template}' +
                            '<div class="yui3-u-1">' +
                                '{calendar_grid_template}' +
                            '</div>' +
                        '</div>',

     /**
        * A two pane template for calendar.
        * @property TWO_PANE_TEMPLATE
        * @type String
        * @protected
        * @readOnly
        * @static
        */
    TWO_PANE_TEMPLATE: '<div class="yui3-g {calendar_pane_class}" id="{calendar_id}">' +
                            '{header_template}' +
                            '<div class="yui3-u-1-2">'+
                                '<div class = "{calendar_left_grid_class}">' +
                                    '{calendar_grid_template}' +
                                '</div>' +
                            '</div>' +
                            '<div class="yui3-u-1-2">' +
                                '<div class = "{calendar_right_grid_class}">' +
                                    '{calendar_grid_template}' +
                                '</div>' +
                            '</div>' +
                        '</div>',
     /**
        * A three pane template for calendar.
        * @property THREE_PANE_TEMPLATE
        * @type String
        * @protected
        * @readOnly
        * @static
        */
    THREE_PANE_TEMPLATE: '<div class="yui3-g {calendar_pane_class}" id="{calendar_id}">' +
                            '{header_template}' +
                            '<div class="yui3-u-1-3">' +
                                '<div class="{calendar_left_grid_class}">' +
                                    '{calendar_grid_template}' +
                                '</div>' +
                            '</div>' +
                            '<div class="yui3-u-1-3">' +
                                '{calendar_grid_template}' +
                            '</div>' +
                            '<div class="yui3-u-1-3">' +
                                '<div class="{calendar_right_grid_class}">' +
                                    '{calendar_grid_template}' +
                                '</div>' +
                            '</div>' +
                        '</div>',
     /**
        * A template for the calendar grid.
        * @property CALENDAR_GRID_TEMPLATE
        * @type String
        * @protected
        * @static
        */
    CALENDAR_GRID_TEMPLATE: '<table class="{calendar_grid_class}" id="{calendar_pane_id}" role="grid" aria-readonly="true" ' +
                                'aria-label="{pane_arialabel}" tabindex="{calendar_pane_tabindex}">' +
                                '<thead>' +
                                    '{weekday_row_template}' +
                                '</thead>' +
                                '<tbody>' +
                                    '{body_template}' +
                                '</tbody>' +
                            '</table>',

     /**
        * A template for the calendar header.
        * @property HEADER_TEMPLATE
        * @type String
        * @protected
        * @static
        */
    HEADER_TEMPLATE: '<div class="yui3-g {calendar_hd_class}">' +
                        '<div class="yui3-u {calendar_hd_label_class}" id="{calendar_id}_header" aria-role="heading">' +
                            '{calheader}' +
                        '</div>' +
                    '</div>',

     /**
        * A template for the row of weekday names.
        * @property WEEKDAY_ROW_TEMPLATE
        * @type String
        * @protected
        * @static
        */
    WEEKDAY_ROW_TEMPLATE: '<tr class="{calendar_weekdayrow_class}" role="row">' +
                            '{weekday_row}' +
                        '</tr>',

     /**
        * A template for a single row of calendar days.
        * @property CALDAY_ROW_TEMPLATE
        * @type String
        * @protected
        * @static
        */
    CALDAY_ROW_TEMPLATE: '<tr class="{calendar_row_class}" role="row">' +
                            '{calday_row}' +
                        '</tr>',

     /**
        * A template for a single cell with a weekday name.
        * @property CALDAY_ROW_TEMPLATE
        * @type String
        * @protected
        * @static
        */
    WEEKDAY_TEMPLATE: '<th class="{calendar_weekday_class}" role="columnheader" aria-label="{full_weekdayname}">{weekdayname}</th>',

     /**
        * A template for a single cell with a calendar day.
        * @property CALDAY_TEMPLATE
        * @type String
        * @protected
        * @static
        */
    CALDAY_TEMPLATE: '<td class="{calendar_col_class} {calendar_day_class} {calendar_col_visibility_class}" id="{calendar_day_id}" ' +
                        'role="gridcell" tabindex="-1">' +
                        '{day_content}' +
                    '</td>',

     /**
        * The identity of the widget.
        *
        * @property NAME
        * @type String
        * @default 'calendarBase'
        * @readOnly
        * @protected
        * @static
        */
    NAME: 'calendarBase',

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
        tabIndex: {
            value: 1
        },
        /**
         * The date corresponding to the current calendar view. Always
         * normalized to the first of the month that contains the date
         * at assignment time. Used as the first date visible in the
         * calendar.
         *
         * @attribute date
         * @type Date
         * @default The first of the month containing today's date, as
         * set on the end user's system.
         */
        date: {
            value: new Date(),
            setter: function (val) {
                _yuitest_coverfunc("build/calendar-base/calendar-base.js", "setter", 1538);
_yuitest_coverline("build/calendar-base/calendar-base.js", 1539);
var newDate = this._normalizeDate(val);
                _yuitest_coverline("build/calendar-base/calendar-base.js", 1540);
if (ydate.areEqual(newDate, this.get('date'))) {
                        _yuitest_coverline("build/calendar-base/calendar-base.js", 1541);
return this.get('date');
                } else {
                        _yuitest_coverline("build/calendar-base/calendar-base.js", 1543);
return newDate;
                }
            }
        },

        /**
         * A setting specifying whether to shows days from the previous
         * month in the visible month's grid, if there are empty preceding
         * cells available.
         *
         * @attribute showPrevMonth
         * @type boolean
         * @default false
         */
        showPrevMonth: {
            value: false
        },

        /**
         * A setting specifying whether to shows days from the next
         * month in the visible month's grid, if there are empty
         * cells available at the end.
         *
         * @attribute showNextMonth
         * @type boolean
         * @default false
         */
        showNextMonth: {
            value: false
        },

        /**
         * Strings and properties derived from the internationalization packages
         * for the calendar.
         *
         * @attribute strings
         * @type Object
         * @protected
         */
        strings : {
            valueFn: function() { _yuitest_coverfunc("build/calendar-base/calendar-base.js", "valueFn", 1583);
_yuitest_coverline("build/calendar-base/calendar-base.js", 1583);
return Y.Intl.get("calendar-base"); }
        },

        /**
         * Custom header renderer for the calendar.
         *
         * @attribute headerRenderer
         * @type String | Function
         */
        headerRenderer: {
            value: "%B %Y"
        },

        /**
         * The name of the rule which all enabled dates should match.
         * Either disabledDatesRule or enabledDatesRule should be specified,
         * or neither, but not both.
         *
         * @attribute enabledDatesRule
         * @type String
         * @default null
         */
        enabledDatesRule: {
            value: null
        },

        /**
         * The name of the rule which all disabled dates should match.
         * Either disabledDatesRule or enabledDatesRule should be specified,
         * or neither, but not both.
         *
         * @attribute disabledDatesRule
         * @type String
         * @default null
         */
        disabledDatesRule: {
            value: null
        },

        /**
         * A read-only attribute providing a list of currently selected dates.
         *
         * @attribute selectedDates
         * @readOnly
         * @type Array
         */
        selectedDates : {
            readOnly: true,
            getter: function () {
                _yuitest_coverfunc("build/calendar-base/calendar-base.js", "getter", 1631);
_yuitest_coverline("build/calendar-base/calendar-base.js", 1632);
return (this._getSelectedDatesList());
            }
        },

        /**
         * An object of the form {rules:Object, filterFunction:Function},
         * providing  set of rules and a custom rendering function for
         * customizing specific calendar cells.
         *
         * @attribute customRenderer
         * @readOnly
         * @type Object
         * @default {}
         */
        customRenderer : {
            lazyAdd: false,
            value: {},
            setter: function (val) {
                _yuitest_coverfunc("build/calendar-base/calendar-base.js", "setter", 1649);
_yuitest_coverline("build/calendar-base/calendar-base.js", 1650);
this._rules = val.rules;
                _yuitest_coverline("build/calendar-base/calendar-base.js", 1651);
this._filterFunction = val.filterFunction;
            }
        }
    }

});


}, '@VERSION@', {
    "requires": [
        "widget",
        "datatype-date",
        "datatype-date-math",
        "cssgrids"
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
