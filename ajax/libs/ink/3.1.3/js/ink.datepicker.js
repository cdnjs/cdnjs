/**
 * Date selector
 * @module Ink.UI.DatePicker_1
 * @version 1
 */

Ink.createModule('Ink.UI.DatePicker', '1', ['Ink.UI.Common_1','Ink.Dom.Event_1','Ink.Dom.Css_1','Ink.Dom.Element_1','Ink.Dom.Selector_1','Ink.Util.Array_1','Ink.Util.Date_1', 'Ink.Dom.Browser_1'], function(Common, Event, Css, InkElement, Selector, InkArray, InkDate ) {
    'use strict';

    // Clamp a number into a min/max limit
    function clamp(n, min, max) {
        if (n > max) { n = max; }
        if (n < min) { n = min; }

        return n;
    }

    function dateishFromYMDString(YMD) {
        var split = YMD.split('-');
        return dateishFromYMD(+split[0], +split[1] - 1, +split[2]);
    }

    function dateishFromYMD(year, month, day) {
        return {_year: year, _month: month, _day: day};
    }

    function dateishFromDate(date) {
        return {_year: date.getFullYear(), _month: date.getMonth(), _day: date.getDate()};
    }

    /**
     * @class Ink.UI.DatePicker
     * @constructor
     * @version 1
     *
     * @param {String|Element}      selector                    Datepicker element
     * @param {Object}              [options]                   Options
     * @param {Boolean}             [options.autoOpen]          Flag to automatically open the datepicker.
     * @param {String}              [options.cleanText]         Text for the clean button. Defaults to 'Clear'.
     * @param {String}              [options.closeText]         Text for the close button. Defaults to 'Close'.
     * @param {String}              [options.cssClass]          CSS class to be applied on the datepicker
     * @param {String|Element}      [options.pickerField]       (if not using in an input[type="text"]) Element which displays the DatePicker when clicked. Defaults to an "open" link.
     * @param {String}              [options.dateRange]         Enforce limits to year, month and day for the Date, ex: '1990-08-25:2020-11'
     * @param {Boolean}             [options.displayInSelect]   Flag to display the component in a select element.
     * @param {String|Element}      [options.dayField]          (if using options.displayInSelect) `select` field with days.
     * @param {String|Element}      [options.monthField]        (if using options.displayInSelect) `select` field with months.
     * @param {String|Element}      [options.yearField]         (if using options.displayInSelect) `select` field with years.
     * @param {String}              [options.format]            Date format string
     * @param {Object}              [options.month]             Hash of month names. Defaults to english month names. January is 1.
     * @param {String}              [options.nextLinkText]      Text for the previous button. Defaults to '«'.
     * @param {String}              [options.ofText]            Text to show between month and year. Defaults to ' of '.
     * @param {Boolean}             [options.onFocus]           If the datepicker should open when the target element is focused. Defaults to true.
     * @param {Function}            [options.onMonthSelected]   Callback to execute when the month is selected.
     * @param {Function}            [options.onSetDate]         Callback to execute when the date is set.
     * @param {Function}            [options.onYearSelected]    Callback to execute when the year is selected.
     * @param {String}              [options.position]          Position for the datepicker. Either 'right' or 'bottom'. Defaults to 'right'.
     * @param {String}              [options.prevLinkText]      Text for the previous button. Defaults to '«'.
     * @param {Boolean}             [options.showClean]         If the clean button should be visible. Defaults to true.
     * @param {Boolean}             [options.showClose]         If the close button should be visible. Defaults to true.
     * @param {Boolean}             [options.shy]               If the datepicker should hide automatically when the user clicks outside. Defaults to true.
     * @param {String}              [options.startDate]         Date to define initial month. Must be in yyyy-mm-dd format.
     * @param {Number}              [options.startWeekDay]      First day of the week. Sunday is zero. Defaults to 1 (Monday).
     * @param {Function}            [options.validYearFn]       Callback to execute when 'rendering' the month (in the month view)
     * @param {Function}            [options.validMonthFn]      Callback to execute when 'rendering' the month (in the month view)
     * @param {Function}            [options.validDayFn]        Callback to execute when 'rendering' the day (in the month view)
     * @param {Function}            [options.nextValidDateFn]   Function to calculate the next valid date, given the current. Useful when there's invalid dates or time frames.
     * @param {Function}            [options.prevValidDateFn]   Function to calculate the previous valid date, given the current. Useful when there's invalid dates or time frames.
     * @param {Object}              [options.wDay]              Hash of week day names. Sunday is 0. Defaults to { 0:'Sunday', 1:'Monday', etc...
     * @param {String}              [options.yearRange]         Enforce limits to year for the Date, ex: '1990:2020' (deprecated)
     *
     * @sample Ink_UI_DatePicker_1.html
     */
    function DatePicker() {
        Common.BaseUIComponent.apply(this, arguments);
    }

    DatePicker._name = 'DatePicker_1';

    DatePicker._optionDefinition = {
        autoOpen:        ['Boolean', false],
        cleanText:       ['String', 'Clear'],
        closeText:       ['String', 'Close'],
        pickerField:     ['Element', null],
        containerElement:['Element', null],
        cssClass:        ['String', 'ink-calendar bottom'],
        dateRange:       ['String', null],
        
        // use this in a <select>
        displayInSelect: ['Boolean', false],
        dayField:        ['Element', null],
        monthField:      ['Element', null],
        yearField:       ['Element', null],

        format:          ['String', 'yyyy-mm-dd'],
        nextLinkText:    ['String', '»'],
        ofText:          ['String', ' of '],
        onFocus:         ['Boolean', true],
        onMonthSelected: ['Function', null],
        onSetDate:       ['Function', null],
        onYearSelected:  ['Function', null],
        position:        ['String', 'right'],
        prevLinkText:    ['String', '«'],
        showClean:       ['Boolean', true],
        showClose:       ['Boolean', true],
        shy:             ['Boolean', true],
        startDate:       ['String', null], // format yyyy-mm-dd,
        startWeekDay:    ['Number', 1],

        // Validation
        validDayFn:      ['Function', null],
        validMonthFn:    ['Function', null],
        validYearFn:     ['Function', null],
        nextValidDateFn: ['Function', null],
        prevValidDateFn: ['Function', null],
        yearRange:       ['String', null],

        // Text
        month: ['Object', {
             1:'January',
             2:'February',
             3:'March',
             4:'April',
             5:'May',
             6:'June',
             7:'July',
             8:'August',
             9:'September',
            10:'October',
            11:'November',
            12:'December'
        }],
        wDay: ['Object', {
            0:'Sunday',
            1:'Monday',
            2:'Tuesday',
            3:'Wednesday',
            4:'Thursday',
            5:'Friday',
            6:'Saturday'
        }]
    };

    DatePicker.prototype = {
        /**
         * Initialization function. Called by the constructor and receives the same parameters.
         *
         * @method _init
         * @private
         */
        _init: function(){
            this._options.format = this._dateParsers[ this._options.format ] || this._options.format;

            this._hoverPicker = false;

            this._picker = this._options.pickerField || null;

            this._setMinMax( this._options.dateRange || this._options.yearRange );

            if(this._options.startDate) {
                this.setDate( this._options.startDate );
            } else if (this._element && this._element.value) {
                this.setDate( this._element.value );
            } else {
                this.setDate(new Date());
            }

            if (this._options.startWeekDay < 0 || this._options.startWeekDay > 6) {
                Ink.warn('Ink.UI.DatePicker_1: option "startWeekDay" must be between 0 (sunday) and 6 (saturday)');
                this._options.startWeekDay = clamp(this._options.startWeekDay, 0, 6);
            }

            Ink.extendObj(this._options,this._lang || {});

            this._render();
            this._listenToContainerObjectEvents();
        },

        _validate: function () {
            if(this._options.displayInSelect &&
                    !(this._options.dayField && this._options.monthField && this._options.yearField)){
                throw new Error(
                    'Ink.UI.DatePicker: displayInSelect option enabled.'+
                    'Please specify dayField, monthField and yearField selectors.');
            }
        },

        /**
         * Renders the DatePicker's markup.
         *
         * @method _render
         * @private
         */
        _render: function() {
            this._containerObject = document.createElement('div');

            this._containerObject.className = this._options.cssClass + ' ink-datepicker-calendar hide-all';

            this._renderSuperTopBar();

            var calendarTop = document.createElement("div");
            calendarTop.className = 'ink-calendar-top';

            this._monthDescContainer = document.createElement("div");
            this._monthDescContainer.className = 'ink-calendar-month_desc';

            this._monthPrev = document.createElement('div');
            this._monthPrev.className = 'ink-calendar-prev';
            this._monthPrev.appendChild(InkElement.create('a', {
                href: '#prev',
                className: 'change_month_prev',
                setHTML: this._options.prevLinkText
            }));

            this._monthNext = document.createElement('div');
            this._monthNext.className = 'ink-calendar-next';
            this._monthNext.appendChild(InkElement.create('a', {
                href: '#next',
                className: 'change_month_next',
                setHTML: this._options.nextLinkText
            }));

            calendarTop.appendChild(this._monthPrev);
            calendarTop.appendChild(this._monthDescContainer);
            calendarTop.appendChild(this._monthNext);

            this._monthContainer = document.createElement("div");
            this._monthContainer.className = 'ink-calendar-month';

            this._containerObject.appendChild(calendarTop);
            this._containerObject.appendChild(this._monthContainer);

            this._monthSelector = this._renderMonthSelector();
            this._containerObject.appendChild(this._monthSelector);

            this._yearSelector = document.createElement('ul');
            this._yearSelector.className = 'ink-calendar-year-selector';

            this._containerObject.appendChild(this._yearSelector);

            if(!this._options.onFocus || this._options.displayInSelect){
                if(!this._options.pickerField){
                    this._picker = InkElement.create('a', {
                        href: '#open_cal',
                        setHTML: 'open',
                        insertBottom: this._element.parentNode,
                        className: 'ink-datepicker-picker-field'
                    });
                } else {
                    this._picker = Common.elOrSelector(this._options.pickerField, 'pickerField');
                }
            }

            this._appendDatePickerToDom();

            this._renderMonth();

            this._monthChanger = InkElement.create('a', {
                href: '#monthchanger',
                className: 'ink-calendar-link-month',
                setTextContent: this._options.month[this._month + 1]
            });

            this._ofText = InkElement.create('span', {
                className: 'ink-calendar-of-text',
                setHTML: this._options.ofText
            });

            this._yearChanger = InkElement.create('a', {
                href: '#yearchanger',
                className: 'ink-calendar-link-year',
                setTextContent: this._year
            });

            this._monthDescContainer.appendChild(this._monthChanger);
            this._monthDescContainer.appendChild(this._ofText);
            this._monthDescContainer.appendChild(this._yearChanger);

            if (!this._options.inline) {
                this._addOpenCloseEvents();
            } else {
                this.show();
            }
            this._addDateChangeHandlersToInputs();
        },

        _addDateChangeHandlersToInputs: function () {
            var fields = this._element;
            if (this._options.displayInSelect) {
                fields = [
                    this._options.dayField,
                    this._options.monthField,
                    this._options.yearField];
            }
            Event.observeMulti(fields ,'change', Ink.bindEvent(function(){
                this._updateDate( );
                this._showDefaultView( );
                this.setDate( );
                if ( !this._inline && !this._hoverPicker ) {
                    this._hide(true);
                }
            },this));
        },

        /**
         * Shows the calendar.
         *
         * @method show
         * @return {void}
         * @public
         **/
        show: function () {
            this._updateDate();
            this._renderMonth();
            Css.removeClassName(this._containerObject, 'hide-all');
        },

        _addOpenCloseEvents: function () {
            var opener = this._picker || this._element;

            Event.observe(opener, 'click', Ink.bindEvent(function(e){
                Event.stop(e);
                this.show();
            },this));

            if (this._options.autoOpen) {
                this.show();
            }

            if(!this._options.displayInSelect){
                Event.observe(opener, 'blur', Ink.bindEvent(function() {
                    if ( !this._hoverPicker ) {
                        this._hide(true);
                    }
                },this));
            }

            if (this._options.shy) {
                // Close the picker when clicking elsewhere.
                Event.observe(document,'click',Ink.bindEvent(function(e){
                    var target = Event.element(e);

                    // "elsewhere" is outside any of these elements:
                    var cannotBe = [
                        this._options.dayField,
                        this._options.monthField,
                        this._options.yearField,
                        this._picker,
                        this._element
                    ];

                    for (var i = 0, len = cannotBe.length; i < len; i++) {
                        if (cannotBe[i] && InkElement.descendantOf(cannotBe[i], target)) {
                            return;
                        }
                    }

                    this._hide(true);
                },this));
            }
        },

        /**
         * Creates the markup of the view with months.
         *
         * @method _renderMonthSelector
         * @private
         */
        _renderMonthSelector: function () {
            var selector = document.createElement('ul');
            selector.className = 'ink-calendar-month-selector';

            var ulSelector = document.createElement('ul');
            for(var mon=1; mon<=12; mon++){
                ulSelector.appendChild(this._renderMonthButton(mon));

                if (mon % 4 === 0) {
                    selector.appendChild(ulSelector);
                    ulSelector = document.createElement('ul');
                }
            }
            return selector;
        },

        /**
         * Renders a single month button.
         */
        _renderMonthButton: function (mon) {
            var liMonth = document.createElement('li');
            liMonth.appendChild(InkElement.create('a', {
                'data-cal-month': mon,
                setTextContent: this._options.month[mon].substring(0, 3)
            }));
            return liMonth;
        },

        _appendDatePickerToDom: function () {
            if(this._options.containerElement) {
                var appendTarget =
                    Common.elOrSelector(this._options.containerElement);
                appendTarget.appendChild(this._containerObject);
            }

            var parentIsControl = Selector.matchesSelector(
                this._element.parentNode,
                '.ink-form .control-group .control');

            if (parentIsControl) {
                this._wrapper = this._element.parentNode;
                this._wrapperIsControl = true;
            } else {
                this._wrapper = InkElement.create('div', { className: 'ink-datepicker-wrapper' });
                InkElement.wrap(this._element, this._wrapper);
            }

            InkElement.insertAfter(this._containerObject, this._element);
        },

        /**
         * Render the topmost bar with the "close" and "clear" buttons.
         */
        _renderSuperTopBar: function () {
            if((!this._options.showClose) || (!this._options.showClean)){ return; }

            this._superTopBar = document.createElement("div");
            this._superTopBar.className = 'ink-calendar-top-options';
            if(this._options.showClean){
                this._superTopBar.appendChild(InkElement.create('a', {
                    className: 'clean',
                    setHTML: this._options.cleanText
                }));
            }
            if(this._options.showClose){
                this._superTopBar.appendChild(InkElement.create('a', {
                    className: 'close',
                    setHTML: this._options.closeText
                }));
            }
            this._containerObject.appendChild(this._superTopBar);
        },

        _listenToContainerObjectEvents: function () {
            Event.observe(this._containerObject, 'mouseover' ,Ink.bindEvent(function(e){
                Event.stop( e );
                this._hoverPicker = true;
            },this));

            Event.observe(this._containerObject, 'mouseout', Ink.bindEvent(function(e){
                Event.stop( e );
                this._hoverPicker = false;
            },this));

            Event.observe(this._containerObject, 'click', Ink.bindEvent(this._onClick, this));
        },

        _onClick: function(e){
            var elem = Event.element(e);

            if (Css.hasClassName(elem, 'ink-calendar-off')) {
                Event.stopDefault(e);
                return null;
            }

            Event.stop(e);

            // Relative changers
            this._onRelativeChangerClick(elem);

            // Absolute changers
            this._onAbsoluteChangerClick(elem);

            // Mode changers
            if (Css.hasClassName(elem, 'ink-calendar-link-month')) {
                this._showMonthSelector();
            } else if (Css.hasClassName(elem, 'ink-calendar-link-year')) {
                this._showYearSelector();
            } else if(Css.hasClassName(elem, 'clean')){
                this._clean();
            } else if(Css.hasClassName(elem, 'close')){
                this._hide(false);
            }

            this._updateDescription();
        },

        /**
         * Handles click events on a changer (« ») for next/prev year/month
         * @method _onChangerClick
         * @private
         **/
        _onRelativeChangerClick: function (elem) {
            var changeYear = {
                change_year_next: 1,
                change_year_prev: -1
            };
            var changeMonth = {
                change_month_next: 1,
                change_month_prev: -1
            };

            if( elem.className in changeMonth ) {
                this._updateCal(changeMonth[elem.className]);
            } else if( elem.className in changeYear ) {
                this._showYearSelector(changeYear[elem.className]);
            }
        },

        /**
         * Handles click events on an atom-changer (day button, month button, year button)
         *
         * @method _onAbsoluteChangerClick
         * @private
         */
        _onAbsoluteChangerClick: function (elem) {
            var elemData = InkElement.data(elem);

            if( Number(elemData.calDay) ){
                this.setDate(new Date(this._year, this._month, elemData.calDay));
                this._hide();
            } else if( Number(elemData.calMonth) ) {
                this._month = Number(elemData.calMonth) - 1;
                this._showDefaultView();
                this._updateCal();
            } else if( Number(elemData.calYear) ){
                this._changeYear(Number(elemData.calYear));
            }
        },

        _changeYear: function (year) {
            year = +year;
            if(!isNaN(year)){
                this._year = year;
                if( typeof this._options.onYearSelected === 'function' ){
                    this._options.onYearSelected(this, {
                        'year': this._year
                    });
                }
                this._showMonthSelector();
            }
        },

        _clean: function () {
            if(this._options.displayInSelect){
                this._options.yearField.selectedIndex = 0;
                this._options.monthField.selectedIndex = 0;
                this._options.dayField.selectedIndex = 0;
            } else {
                this._element.value = '';
            }
        },

        /**
         * Hides the DatePicker.
         * If the component is shy (options.shy), behaves differently.
         *
         * @method _hide
         * @param {Boolean}    [blur]   If false, forces hiding even if the component is shy.
         */
        _hide: function(blur) {
            blur = blur === undefined ? true : blur;
            if (blur === false || (blur && this._options.shy)) {
                Css.addClassName(this._containerObject, 'hide-all');
            }
        },

        /**
         * Sets the range of dates allowed to be selected in the Date Picker
         *
         * @method _setMinMax
         * @param {String} dateRange Two dates separated by a ':'. Example: 2013-01-01:2013-12-12
         * @private
         */
        _setMinMax: function( dateRange ) {
            var self = this;

            var noMinLimit = {
                _year: -Number.MAX_VALUE,
                _month: 0,
                _day: 1
            };

            var noMaxLimit = {
                _year: Number.MAX_VALUE,
                _month: 11,
                _day: 31
            };

            function noLimits() {
                self._min = noMinLimit;
                self._max = noMaxLimit;
            }

            if (!dateRange) { return noLimits(); }

            var dates = dateRange.split( ':' );
            var rDate = /^(\d{4})((\-)(\d{1,2})((\-)(\d{1,2}))?)?$/;

            InkArray.each([
                        {name: '_min', date: dates[0], noLim: noMinLimit},
                        {name: '_max', date: dates[1], noLim: noMaxLimit}
                    ], Ink.bind(function (data) {

                var lim = data.noLim;

                if ( data.date.toUpperCase() === 'NOW' ) {
                    var now = new Date();
                    lim = dateishFromDate(now);
                } else if (data.date.toUpperCase() === 'EVER') {
                    lim = data.noLim;
                } else if ( rDate.test( data.date ) ) {
                    lim = dateishFromYMDString(data.date);

                    lim._month = clamp(lim._month, 0, 11);
                    lim._day = clamp(lim._day, 1, this._daysInMonth( lim._year, lim._month + 1 ));
                }

                this[data.name] = lim;
            }, this));

            // Should be equal, or min should be smaller
            var valid = this._dateCmp(this._max, this._min) !== -1;

            if (!valid) {
                noLimits();
            }
        },

        /**
         * Checks if a date is between the valid range.
         * Starts by checking if the date passed is valid. If not, will fallback to the 'today' date.
         * Then checks if the all params are inside of the date range specified. If not, it will fallback to the nearest valid date (either Min or Max).
         *
         * @method _fitDateToRange
         * @param  {Number} year  Year with 4 digits (yyyy)
         * @param  {Number} month Month
         * @param  {Number} day   Day
         * @return {Array}       Array with the final processed date.
         * @private
         */
        _fitDateToRange: function( date ) {
            if ( !this._isValidDate( date ) ) {
                date = dateishFromDate(new Date());
            }

            if (this._dateCmp(date, this._min) === -1) {
                return Ink.extendObj({}, this._min);
            } else if (this._dateCmp(date, this._max) === 1) {
                return Ink.extendObj({}, this._max);
            }

            return Ink.extendObj({}, date);  // date is okay already, just copy it.
        },

        /**
         * Checks whether a date is within the valid date range
         * @method _dateWithinRange
         * @param year
         * @param month
         * @param day
         * @return {Boolean}
         * @private
         */
        _dateWithinRange: function (date) {
            if (!arguments.length) {
                date = this;
            }

            return  (!this._dateAboveMax(date) &&
                    (!this._dateBelowMin(date)));
        },

        _dateAboveMax: function (date) {
            return this._dateCmp(date, this._max) === 1;
        },

        _dateBelowMin: function (date) {
            return this._dateCmp(date, this._min) === -1;
        },

        _dateCmp: function (self, oth) {
            return this._dateCmpUntil(self, oth, '_day');
        },

        /**
         * _dateCmp with varied precision. You can compare down to the day field, or, just to the month.
         * // the following two dates are considered equal because we asked
         * // _dateCmpUntil to just check up to the years.
         *
         * _dateCmpUntil({_year: 2000, _month: 10}, {_year: 2000, _month: 11}, '_year') === 0
         */
        _dateCmpUntil: function (self, oth, depth) {
            var props = ['_year', '_month', '_day'];
            var i = -1;

            do {
                i++;
                if      (self[props[i]] > oth[props[i]]) { return 1; }
                else if (self[props[i]] < oth[props[i]]) { return -1; }
            } while (props[i] !== depth &&
                    self[props[i + 1]] !== undefined && oth[props[i + 1]] !== undefined);

            return 0;
        },

        /**
         * Sets the markup in the default view mode (showing the days).
         * Also disables the previous and next buttons in case they don't meet the range requirements.
         *
         * @method _showDefaultView
         * @private
         */
        _showDefaultView: function(){
            this._yearSelector.style.display = 'none';
            this._monthSelector.style.display = 'none';
            this._monthPrev.childNodes[0].className = 'change_month_prev';
            this._monthNext.childNodes[0].className = 'change_month_next';

            if ( !this._getPrevMonth() ) {
                this._monthPrev.childNodes[0].className = 'action_inactive';
            }

            if ( !this._getNextMonth() ) {
                this._monthNext.childNodes[0].className = 'action_inactive';
            }

            this._monthContainer.style.display = 'block';
        },

        /**
         * Updates the date shown on the datepicker
         *
         * @method _updateDate
         * @private
         */
        _updateDate: function(){
            var dataParsed;
            if(!this._options.displayInSelect && this._element.value){
                dataParsed = this._parseDate(this._element.value);
            } else if (this._options.displayInSelect) {
                dataParsed = {
                    _year: this._options.yearField[this._options.yearField.selectedIndex].value,
                    _month: this._options.monthField[this._options.monthField.selectedIndex].value - 1,
                    _day: this._options.dayField[this._options.dayField.selectedIndex].value
                };
            }

            if (dataParsed) {
                dataParsed = this._fitDateToRange(dataParsed);
                this._year = dataParsed._year;
                this._month = dataParsed._month;
                this._day = dataParsed._day;
            }
            this._setDate();
            this._updateDescription();
            this._renderMonth();
        },

        /**
         * Updates the date description shown at the top of the datepicker
         *
         * EG "12 de November"
         *
         * @method  _updateDescription
         * @private
         */
        _updateDescription: function(){
            InkElement.setTextContent(this._monthChanger, this._options.month[this._month + 1]);
            InkElement.setTextContent(this._ofText, this._options.ofText);
            InkElement.setTextContent(this._yearChanger, this._year);
        },

        /**
         * Renders the year selector view of the datepicker
         *
         * @method _showYearSelector
         * @private
         */
        _showYearSelector: function(inc){
            this._incrementViewingYear(inc);

            var firstYear = this._year - (this._year % 10);
            var thisYear = firstYear - 1;

            InkElement.setHTML(this._yearSelector, '');
            var yearUl = InkElement.create('ul');
            this._yearSelector.appendChild(yearUl);

            if (thisYear > this._min._year) {
                var prevYearLi = InkElement.create('li');

                prevYearLi.appendChild(InkElement.create('a', {
                    href: '#year_prev',
                    className: 'change_year_prev',
                    setHTML: this._options.prevLinkText
                }));

                yearUl.appendChild(prevYearLi);
            } else {
                yearUl.appendChild(InkElement.create('li', { setHTML: '&nbsp;' }));
            }

            for (var i=1; i < 11; i++){
                if (i % 4 === 0){
                    yearUl = InkElement.create('ul');
                    this._yearSelector.appendChild(yearUl);
                }

                thisYear = firstYear + i - 1;

                yearUl.appendChild(this._getYearButton(thisYear));
            }

            if (thisYear < this._max._year) {
                var nextYearLi = InkElement.create('li');

                nextYearLi.appendChild(InkElement.create('a', {
                    href: '#year_next',
                    className: 'change_year_next',
                    setHTML: this._options.nextLinkText
                }));

                yearUl.appendChild(nextYearLi);
            } else {
                yearUl.appendChild(InkElement.create('li', { setHTML: '&nbsp;' }));
            }

            this._monthPrev.childNodes[0].className = 'action_inactive';
            this._monthNext.childNodes[0].className = 'action_inactive';
            this._monthSelector.style.display = 'none';
            this._monthContainer.style.display = 'none';
            this._yearSelector.style.display = 'block';
        },

        /**
         * For the year selector.
         *
         * Update this._year, to find the next decade or use nextValidDateFn to find it.
         */
        _incrementViewingYear: function (inc) {
            if (!inc) { return; }

            var year = +this._year + inc*10;
            year = year - year % 10;
            if ( year > this._max._year || year + 9 < this._min._year){
                return;
            }
            this._year = +this._year + inc*10;
        },

        _getYearButton: function (thisYear) {
            var className = '';

            if (!this._acceptableYear({ _year: thisYear })) {
                className = 'ink-calendar-off';
            } else if (thisYear === this._year) {
                className = 'ink-calendar-on';
            }

            var li = InkElement.create('li');

            li.appendChild(InkElement.create('a', {
                href: '#',
                'data-cal-year': thisYear,
                className: className,
                setTextContent: thisYear
            }));

            return li;
        },

        /**
         * Show the month selector (happens when you click a year, or the "month" link.
         * @method _showMonthSelector
         * @private
         */
        _showMonthSelector: function () {
            this._yearSelector.style.display = 'none';
            this._monthContainer.style.display = 'none';
            this._monthPrev.childNodes[0].className = 'action_inactive';
            this._monthNext.childNodes[0].className = 'action_inactive';
            this._addMonthClassNames();
            this._monthSelector.style.display = 'block';
        },

        /**
         * This function returns the given date in the dateish format
         *
         * @method _parseDate
         * @param {String} dateStr A date on a string.
         * @private
         */
        _parseDate: function(dateStr){
            var date = InkDate.set( this._options.format , dateStr );
            if (date) {
                return dateishFromDate(date);
            }
            return null;
        },

        /**
         * Checks if a date is valid
         *
         * @method _isValidDate
         * @param {Dateish} date
         * @private
         * @return {Boolean} True if the date is valid, false otherwise
         */
        _isValidDate: function(date){
            var yearRegExp = /^\d{4}$/;
            var validOneOrTwo = /^\d{1,2}$/;
            return (
                yearRegExp.test(date._year)     &&
                validOneOrTwo.test(date._month) &&
                validOneOrTwo.test(date._day)   &&
                +date._month + 1 >= 1  &&
                +date._month + 1 <= 12 &&
                +date._day       >= 1  &&
                +date._day       <= this._daysInMonth(date._year, date._month + 1)
            );
        },

        /**
         * Checks if a given date is an valid format.
         *
         * @method _isDate
         * @param {String} format A date format.
         * @param {String} dateStr A date on a string.
         * @private
         * @return {Boolean} True if the given date is valid according to the given format
         */
        _isDate: function(format, dateStr){
            try {
                if (typeof format === 'undefined'){
                    return false;
                }
                var date = InkDate.set( format , dateStr );
                if( date && this._isValidDate( dateishFromDate(date) )) {
                    return true;
                }
            } catch (ex) {}

            return false;
        },

        _acceptableDay: function (date) {
            return this._acceptableDateComponent(date, 'validDayFn');
        },

        _acceptableMonth: function (date) {
            return this._acceptableDateComponent(date, 'validMonthFn');
        },

        _acceptableYear: function (date) {
            return this._acceptableDateComponent(date, 'validYearFn');
        },

        /** DRY base for the above 2 functions */
        _acceptableDateComponent: function (date, userCb) {
            if (this._options[userCb]) {
                return this._callUserCallbackBool(this._options[userCb], date);
            } else {
                return this._dateWithinRange(date);
            }
        },

        /**
         * This method returns the date written with the format specified on the options
         *
         * @method _writeDateInFormat
         * @private
         * @return {String} Returns the current date of the object in the specified format
         */
        _writeDateInFormat:function(){
            return InkDate.get( this._options.format , this.getDate());
        },

        /**
         * This method allows the user to set the DatePicker's date on run-time.
         *
         * @method setDate
         * @param {Date|String} dateString A Date object, or date string in yyyy-mm-dd format.
         * @return {void}
         * @public
         */
        setDate: function( dateString ) {
            if (dateString && typeof dateString.getDate === 'function') {
                dateString = [ dateString.getFullYear(),
                    dateString.getMonth() + 1, dateString.getDate() ].join('-');
            }

            if ( /\d{4}-\d{1,2}-\d{1,2}/.test( dateString ) ) {
                var auxDate = dateString.split( '-' );
                this._year  = +auxDate[ 0 ];
                this._month = +auxDate[ 1 ] - 1;
                this._day   = +auxDate[ 2 ];
            }

            this._setDate( );
        },

        /**
         * Gets the currently selected date as a JavaScript date.
         *
         * @method getDate
         * @return {void}
         * @public
         */
        getDate: function () {
            if (!this._day) {
                throw 'Ink.UI.DatePicker: Still picking a date. Cannot getDate now!';
            }
            return new Date(this._year, this._month, this._day);
        },

        /**
         * Sets the chosen date on the target input field
         *
         * @method _setDate
         * @param {Element} objClicked Clicked object inside the DatePicker's calendar.
         * @private
         */
        _setDate : function( objClicked ) {
            if (objClicked) {
                var data = InkElement.data(objClicked);
                this._day = (+data.calDay) || this._day;
            }

            var dt = this._fitDateToRange(this);

            this._year = dt._year;
            this._month = dt._month;
            this._day = dt._day;

            if(!this._options.displayInSelect){
                this._element.value = this._writeDateInFormat();
            } else {
                this._options.dayField.value   = this._day;
                this._options.monthField.value = this._month + 1;
                this._options.yearField.value  = this._year;
            }

            if(this._options.onSetDate) {
                this._options.onSetDate( this , { date : this.getDate() } );
            }
        },

        /**
         * Makes the necessary work to update the calendar
         * when choosing a different month
         *
         * @method _updateCal
         * @param {Number} inc Indicates previous or next month
         * @private
         */
        _updateCal: function(inc){
            if( typeof this._options.onMonthSelected === 'function' ){
                this._options.onMonthSelected(this, {
                    'year': this._year,
                    'month' : this._month
                });
            }
            if (inc && this._updateMonth(inc) === null) {
                return;
            }
            this._renderMonth();
        },

        /**
         * Function that returns the number of days on a given month on a given year
         *
         * @method _daysInMonth
         * @param {Number} _y - year
         * @param {Number} _m - month
         * @private
         * @return {Number} The number of days on a given month on a given year
         */
        _daysInMonth: function(_y,_m){
            var exceptions = {
                2: ((_y % 400 === 0) || (_y % 4 === 0 && _y % 100 !== 0)) ? 29 : 28,
                4: 30,
                6: 30,
                9: 30,
                11: 30
            };

            return exceptions[_m] || 31;
        },


        /**
         * Updates the calendar when a different month is chosen
         *
         * @method _updateMonth
         * @param {Number} incValue - indicates previous or next month
         * @private
         */
        _updateMonth: function(incValue){
            var date;
            if (incValue > 0) {
                date = this._getNextMonth();
            } else if (incValue < 0) {
                date = this._getPrevMonth();
            }
            if (!date) { return null; }
            this._year = date._year;
            this._month = date._month;
            this._day = date._day;
        },

        /**
         * Get the next month we can show.
         */
        _getNextMonth: function (date) {
            return this._tryLeap( date, 'Month', 'next', function (d) {
                    d._month += 1;
                    if (d._month > 11) {
                        d._month = 0;
                        d._year += 1;
                    }
                    return d;
                });
        },

        /**
         * Get the previous month we can show.
         */
        _getPrevMonth: function (date) {
            return this._tryLeap( date, 'Month', 'prev', function (d) {
                    d._month -= 1;
                    if (d._month < 0) {
                        d._month = 11;
                        d._year -= 1;
                    }
                    return d;
                });
        },

        /**
         * Get the next year we can show.
         */
        _getPrevYear: function (date) {
            return this._tryLeap( date, 'Year', 'prev', function (d) {
                    d._year -= 1;
                    return d;
                });
        },

        /**
         * Get the next year we can show.
         */
        _getNextYear: function (date) {
            return this._tryLeap( date, 'Year', 'next', function (d) {
                    d._year += 1;
                    return d;
                });
        },

        /**
         * DRY base for a function which tries to get the next or previous valid year or month.
         *
         * It checks if we can go forward by using _dateCmp with atomic
         * precision (this means, {_year} for leaping years, and
         * {_year, month} for leaping months), then it tries to get the
         * result from the user-supplied callback (nextDateFn or prevDateFn),
         * and when this is not present, advance the date forward using the
         * `advancer` callback.
         */
        _tryLeap: function (date, atomName, directionName, advancer) {
            date = date || { _year: this._year, _month: this._month, _day: this._day };

            var maxOrMin = directionName === 'prev' ? '_min' : '_max';
            var boundary = this[maxOrMin];

            // Check if we're by the boundary of min/max year/month
            if (this._dateCmpUntil(date, boundary, atomName) === 0) {
                return null;  // We're already at the boundary. Bail.
            }

            var leapUserCb = this._options[directionName + 'ValidDateFn'];
            if (leapUserCb) {
                return this._callUserCallbackDate(leapUserCb, date);
            } else {
                date = advancer(date);
            }

            var daysInThisMonth = this._daysInMonth(date._year, date._month + 1);
            if (date._day > daysInThisMonth) {
                date._day = daysInThisMonth;
            }

            date = this._fitDateToRange(date);

            return this['_acceptable' + atomName](date) ? date : null;
        },

        _getNextDecade: function (date) {
            date = date || { _year: this._year, _month: this._month, _day: this._day };
            var decade = this._getCurrentDecade(date);
            if (decade + 10 > this._max._year) { return null; }
            return decade + 10;
        },

        _getPrevDecade: function (date) {
            date = date || { _year: this._year, _month: this._month, _day: this._day };
            var decade = this._getCurrentDecade(date);
            if (decade - 10 < this._min._year) { return null; }
            return decade - 10;
        },

        /** Returns the decade given a date or year*/
        _getCurrentDecade: function (year) {
            year = year ? (year._year || year) : this._year;
            return Math.floor(year / 10) * 10;  // Round to first place
        },

        _callUserCallbackBase: function (cb, date) {
            return cb.call(this, date._year, date._month + 1, date._day);
        },

        _callUserCallbackBool: function (cb, date) {
            return !!this._callUserCallbackBase(cb, date);
        },

        _callUserCallbackDate: function (cb, date) {
            var ret = this._callUserCallbackBase(cb, date);
            return ret ? dateishFromDate(ret) : null;
        },

        /**
         * Key-value object that (for a given key) points to the correct parsing format for the DatePicker
         * @property _dateParsers
         * @type {Object}
         * @readOnly
         */
        _dateParsers: {
            'yyyy-mm-dd' : 'Y-m-d' ,
            'yyyy/mm/dd' : 'Y/m/d' ,
            'yy-mm-dd'   : 'y-m-d' ,
            'yy/mm/dd'   : 'y/m/d' ,
            'dd-mm-yyyy' : 'd-m-Y' ,
            'dd/mm/yyyy' : 'd/m/Y' ,
            'dd-mm-yy'   : 'd-m-y' ,
            'dd/mm/yy'   : 'd/m/y' ,
            'mm/dd/yyyy' : 'm/d/Y' ,
            'mm-dd-yyyy' : 'm-d-Y'
        },

        /**
         * Renders the current month
         *
         * @method _renderMonth
         * @private
         */
        _renderMonth: function(){
            var month = this._month;
            var year = this._year;

            this._showDefaultView();

            InkElement.setHTML(this._monthContainer, '');

            this._monthContainer.appendChild(
                    this._getMonthCalendarHeader(this._options.startWeekDay));

            this._monthContainer.appendChild(
                    this._getDayButtons(year, month));
        },

        /**
         * Figure out where the first day of a month lies
         * in the first row of the calendar.
         *
         *      having options.startWeekDay === 0
         *
         *      Su Mo Tu We Th Fr Sa  
         *                         1  <- The "1" is in the 7th day. return 6.
         *       2  3  4  5  6  7  8  
         *       9 10 11 12 13 14 15  
         *      16 17 18 19 20 21 22  
         *      23 24 25 26 27 28 29  
         *      30 31
         *
         * This obviously changes according to the user option "startWeekDay"
         **/
        _getFirstDayIndex: function (year, month) {
            var wDayFirst = (new Date( year , month , 1 )).getDay();  // Sunday=0
            var startWeekDay = this._options.startWeekDay || 0;  // Sunday=0

            var result = wDayFirst - startWeekDay;

            result %= 7;

            if (result < 0) {
                result += 7;
            }

            return result;
        },

        _getDayButtons: function (year, month) {
            var daysInMonth = this._daysInMonth(year, month + 1);

            var ret = document.createDocumentFragment();

            var ul = InkElement.create('ul');
            ret.appendChild(ul);

            var firstDayIndex = this._getFirstDayIndex(year, month);

            // Add padding if the first day of the month is not monday.
            for (var i = 0; i < firstDayIndex; i ++) {
                ul.appendChild(InkElement.create('li', {
                    className: 'ink-calendar-empty',
                    setHTML: '&nbsp;'
                }));
            }

            for (var day = 1; day <= daysInMonth; day++) {
                if ((day - 1 + firstDayIndex) % 7 === 0){ // new week, new UL
                    ul = InkElement.create('ul');
                    ret.appendChild(ul);
                }

                ul.appendChild(this._getDayButton(year, month, day));
            }
            return ret;
        },

        /**
         * Get the HTML markup for a single day in month view, given year, month, day.
         *
         * @method _getDayButtonHtml
         * @private
         */
        _getDayButton: function (year, month, day) {
            var attrs = {};
            var date = dateishFromYMD(year, month, day);

            if (!this._acceptableDay(date)) {
                attrs.className = 'ink-calendar-off';
            } else {
                attrs['data-cal-day'] = day;

                if (this._day && this._dateCmp(date, this) === 0) {
                    attrs.className = 'ink-calendar-on';
                }
            }

            attrs.setTextContent = day;

            var dayButton = InkElement.create('li');
            dayButton.appendChild(InkElement.create('a', attrs));
            return dayButton;
        },

        /** Write the top bar of the calendar (M T W T F S S) */
        _getMonthCalendarHeader: function (startWeekDay) {
            var header = InkElement.create('ul', {
                className: 'ink-calendar-header'
            });

            var wDay;
            for(var i=0; i<7; i++){
                wDay = (startWeekDay + i) % 7;
                header.appendChild(InkElement.create('li', {
                    setTextContent: this._options.wDay[wDay].substring(0, 1)
                }));
            }

            return header;
        },

        /**
         * This method adds class names to month buttons, to visually distinguish.
         *
         * @method _addMonthClassNames
         * @param {Element} parent Element where all the months are.
         * @private
         */
        _addMonthClassNames: function(parent){
            InkArray.forEach(
                (parent || this._monthSelector).getElementsByTagName('a'),
                Ink.bindMethod(this, '_addMonthButtonClassNames'));
        },

        /**
         * Add the ink-calendar-on className if the given button is the current month,
         * otherwise add the ink-calendar-off className if the given button refers to
         * an unacceptable month (given dateRange and validMonthFn)
         */
        _addMonthButtonClassNames: function (btn) {
            var data = InkElement.data(btn);
            if (!data.calMonth) { throw 'not a calendar month button!'; }

            var month = +data.calMonth - 1;

            if ( month === this._month ) {
                Css.addClassName( btn, 'ink-calendar-on' );  // This month
                Css.removeClassName( btn, 'ink-calendar-off' );
            } else {
                Css.removeClassName( btn, 'ink-calendar-on' );  // Not this month

                var toDisable = !this._acceptableMonth({_year: this._year, _month: month});
                Css.addRemoveClassName( btn, 'ink-calendar-off', toDisable);
            }
        },

        /*
         * // TODO implement this
         * Prototype's method to allow the 'i18n files' to change all objects' language at once.
         * @param {Object} options                  Object with the texts' configuration.
         * @param {String} options.closeText        Text of the close anchor
         * @param {String} options.cleanText        Text of the clean text anchor
         * @param {String} options.prevLinkText     "Previous" link's text
         * @param {String} options.nextLinkText     "Next" link's text
         * @param {String} options.ofText           The text "of", present in 'May of 2013'
         * @param {Object} options.month            An object with keys from 1 to 12 for the full months' names
         * @param {Object} options.wDay             An object with keys from 0 to 6 for the full weekdays' names
         * @public
         */
        lang: function( options ){
            this._lang = options;
        },

        /**
         * This calls the rendering of the selected month. (Deprecated: use show() instead)
         *
         */
        showMonth: function(){
            this._renderMonth();
        },

        /**
         * Checks if the calendar screen is in 'select day' mode
         * 
         * @method isMonthRendered
         * @return {Boolean} True if the calendar screen is in 'select day' mode
         * @public
         */
        isMonthRendered: function(){
            var header = Selector.select('.ink-calendar-header', this._containerObject)[0];

            return ((Css.getStyle(header.parentNode,'display') !== 'none') &&
                    (Css.getStyle(header.parentNode.parentNode,'display') !== 'none') );
        },

        /**
         * Destroys this datepicker, removing it from the page.
         *
         * @method destroy
         * @return {void}
         * @public
         **/
        destroy: function () {
            InkElement.unwrap(this._element);
            InkElement.remove(this._wrapper);
            InkElement.remove(this._containerObject);
            Common.unregisterInstance.call(this);
        }
    };

    Common.createUIComponent(DatePicker);

    return DatePicker;
});
