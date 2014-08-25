/**
 * @module Ink.UI.DatePicker_1
 * @author inkdev AT sapo.pt
 * @version 1
 */
Ink.createModule('Ink.UI.DatePicker', '1', ['Ink.UI.Aux_1','Ink.Dom.Event_1','Ink.Dom.Css_1','Ink.Dom.Element_1','Ink.Dom.Selector_1','Ink.Util.Array_1','Ink.Util.Date_1', 'Ink.Dom.Browser_1'], function(Aux, Event, Css, Element, Selector, InkArray, InkDate ) {
    'use strict';    

    /**
     * @class Ink.UI.DatePicker
     * @constructor
     * @version 1
     *
     * @param {String|DOMElement} selector
     * @param {Object} [options] Options
     *      @param {String}   [options.instance]         unique id for the datepicker
     *      @param {String}   [options.format]           Date format string
     *      @param {String}   [options.cssClass]         CSS class to be applied to the datepicker
     *      @param {String}   [options.position]         position the datepicker. Accept right or bottom, default is right
     *      @param {Boolean}  [options.onFocus]          if the datepicker should open when the target element is focused
     *      @param {Function} [options.onYearSelected]   callback function to execute when the year is selected
     *      @param {Function} [options.onMonthSelected]  callback function to execute when the month is selected
     *      @param {Function} [options.validDayFn]       callback function to execute when 'rendering' the day (in the month view)
     *      @param {String}   [options.startDate]        Date to define init month. Must be in yyyy-mm-dd format
     *      @param {Function} [options.onSetDate]        callback to execute when set date
     *      @param {Boolean}  [options.displayInSelect]  whether to display the component in a select. defaults to false.
     *      @param {Boolean}  [options.showClose]        whether to display the close button or not. defaults to true.
     *      @param {Boolean}  [options.showClean]        whether to display the clean button or not. defaults to true.
     *      @param {String}   [options.yearRange]        enforce limits to year for the Date, ex: '1990:2020' (deprecated)
     *      @param {String}   [options.dateRange]        enforce limits to year, month and day for the Date, ex: '1990-08-25:2020-11'
     *      @param {Number}   [options.startWeekDay]     day to use as first column on the calendar view. Defaults to Monday (1)
     *      @param {String}   [options.closeText]        text to display on close button. defaults to 'Fechar'
     *      @param {String}   [options.cleanText]        text to display on clean button. defaults to 'Limpar'
     *      @param {String}   [options.prevLinkText]     text to display on the previous button. defaults to '«'
     *      @param {String}   [options.nextLinkText]     text to display on the previous button. defaults to '«'
     *      @param {String}   [options.ofText]           text to display between month and year. defaults to ' de '
     *      @param {Object}   [options.month]            Hash of month names. Defaults to portuguese month names. January is 1.
     *      @param {Object}   [options.wDay]             Hash of weekdays. Defaults to portuguese month names. Sunday is 0.
     *
     * @example
     *     <input type="text" id="dPicker" />
     *     <script>
     *         Ink.requireModules(['Ink.Dom.Selector_1','Ink.UI.DatePicker_1'],function( Selector, DatePicker ){
     *             var datePickerElement = Ink.s('#dPicker');
     *             var datePickerObj = new DatePicker( datePickerElement );
     *         });
     *     </script>
     */
    var DatePicker = function(selector, options) {

        if (selector) {
            this._dataField = Aux.elOrSelector(selector, '1st argument');
        }

        this._options = Ink.extendObj({
            instance:        'scdp_' + Math.round(99999*Math.random()),
            format:          'yyyy-mm-dd',
            cssClass:        'sapo_component_datepicker',
            position:        'right',
            onFocus:         true,
            onYearSelected:  undefined,
            onMonthSelected: undefined,
            validDayFn:      undefined,
            startDate:       false, // format yyyy-mm-dd
            onSetDate:       false,
            displayInSelect: false,
            showClose:       true,
            showClean:       true,
            yearRange:       false,
            dateRange:       false,
            startWeekDay:    1,
            closeText:       'Close',
            cleanText:       'Clear',
            prevLinkText:    '«',
            nextLinkText:    '»',
            ofText:          '&nbsp;de&nbsp;',
            month: {
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
            },
            wDay: {
                0:'Sunday',
                1:'Monday',
                2:'Tuesday',
                3:'Wednesday',
                4:'Thursday',
                5:'Friday',
                6:'Saturday'
            }
        }, Element.data(this._dataField) || {});

        this._options = Ink.extendObj(this._options, options || {});

        this._options.format = this._dateParsers[ this._options.format ] || this._options.format;

        this._hoverPicker = false;

        this._picker = null;
        if (this._options.pickerField) {
            this._picker = Aux.elOrSelector(this._options.pickerField, 'pickerField');
        }

        this._today = new Date();
        this._day   = this._today.getDate( );
        this._month = this._today.getMonth( );
        this._year  = this._today.getFullYear( );

        this._setMinMax( this._options.dateRange || this._options.yearRange );
        this._data = new Date( Date.UTC.apply( this , this._checkDateRange( this._year , this._month , this._day ) ) );

        if(this._options.startDate && typeof this._options.startDate === 'string' && /\d\d\d\d\-\d\d\-\d\d/.test(this._options.startDate)) {
            this.setDate( this._options.startDate );
        }

        this._init();

        this._render();

        if ( !this._options.startDate ){
            if( this._dataField && typeof this._dataField.value === 'string' && this._dataField.value){
                this.setDate( this._dataField.value );
            }
        }

        Aux.registerInstance(this, this._containerObject, 'datePicker');
    };

    DatePicker.prototype = {
        version: '0.1',

        /**
         * Initialization function. Called by the constructor and
         * receives the same parameters.
         *
         * @method _init
         * @private
         */
        _init: function(){
            Ink.extendObj(this._options,this._lang || {});
        },

        /**
         * Renders the DatePicker's markup
         *
         * @method _render
         * @private
         */
        _render: function() {
            /*jshint maxstatements:100, maxcomplexity:30 */
            this._containerObject = document.createElement('div');

            this._containerObject.id = this._options.instance;

            this._containerObject.className = 'sapo_component_datepicker';
            var dom = document.getElementsByTagName('body')[0];

            if(this._options.showClose || this._options.showClean){
                this._superTopBar = document.createElement("div");
                this._superTopBar.className = 'sapo_cal_top_options';
                if(this._options.showClean){
                    var clean = document.createElement('a');
                    clean.className = 'clean';
                    clean.innerHTML = this._options.cleanText;
                    this._superTopBar.appendChild(clean);
                }
                if(this._options.showClose){
                    var close = document.createElement('a');
                    close.className = 'close';
                    close.innerHTML = this._options.closeText;
                    this._superTopBar.appendChild(close);
                }
                this._containerObject.appendChild(this._superTopBar);
            }


            var calendarTop = document.createElement("div");
            calendarTop.className = 'sapo_cal_top';

            this._monthDescContainer = document.createElement("div");
            this._monthDescContainer.className = 'sapo_cal_month_desc';

            this._monthPrev = document.createElement('div');
            this._monthPrev.className = 'sapo_cal_prev';
            this._monthPrev.innerHTML ='<a href="#prev" class="change_month_prev">' + this._options.prevLinkText + '</a>';

            this._monthNext = document.createElement('div');
            this._monthNext.className = 'sapo_cal_next';
            this._monthNext.innerHTML ='<a href="#next" class="change_month_next">' + this._options.nextLinkText + '</a>';

            calendarTop.appendChild(this._monthPrev);
            calendarTop.appendChild(this._monthDescContainer);
            calendarTop.appendChild(this._monthNext);

            this._monthContainer = document.createElement("div");
            this._monthContainer.className = 'sapo_cal_month';

            this._containerObject.appendChild(calendarTop);
            this._containerObject.appendChild(this._monthContainer);

            this._monthSelector = document.createElement('ul');
            this._monthSelector.className = 'sapo_cal_month_selector';

            var ulSelector;
            var liMonth;
            for(var i=1; i<=12; i++){
                if ((i-1) % 4 === 0) {
                    ulSelector = document.createElement('ul');
                }
                liMonth = document.createElement('li');
                liMonth.innerHTML = '<a href="#" class="sapo_calmonth_' + ( (String(i).length === 2) ? i : "0" + i) + '">' + this._options.month[i].substring(0,3) + '</a>';
                ulSelector.appendChild(liMonth);
                if (i % 4 === 0) {
                    this._monthSelector.appendChild(ulSelector);
                }
            }

            this._containerObject.appendChild(this._monthSelector);

            this._yearSelector = document.createElement('ul');
            this._yearSelector.className = 'sapo_cal_year_selector';

            this._containerObject.appendChild(this._yearSelector);

            if(!this._options.onFocus || this._options.displayInSelect){
                if(!this._options.pickerField){
                    this._picker = document.createElement('a');
                    this._picker.href = '#open_cal';
                    this._picker.innerHTML = 'open';
                    this._picker.style.position = 'absolute';
                    this._picker.style.top = Element.elementTop(this._dataField);
                    this._picker.style.left = Element.elementLeft(this._dataField) + (Element.elementWidth(this._dataField) || 0) + 5 + 'px';
                    this._dataField.parentNode.appendChild(this._picker);
                    this._picker.className = 'sapo_cal_date_picker';
                } else {
                    this._picker = Aux.elOrSelector(this._options.pickerField, 'pickerField');
                }
            }

            if(this._options.displayInSelect){
                if (this._options.dayField && this._options.monthField && this._options.yearField || this._options.pickerField) {
                    this._options.dayField   = Aux.elOrSelector(this._options.dayField,   'dayField');
                    this._options.monthField = Aux.elOrSelector(this._options.monthField, 'monthField');
                    this._options.yearField  = Aux.elOrSelector(this._options.yearField,  'yearField');
                }
                else {
                    throw "To use display in select you *MUST* to set dayField, monthField, yearField and pickerField!";
                }
            }

            dom.insertBefore(this._containerObject, dom.childNodes[0]);
            // this._dataField.parentNode.appendChild(this._containerObject, dom.childNodes[0]);

            if (!this._picker) {
                Event.observe(this._dataField,'focus',Ink.bindEvent(function(){
                    this._containerObject = Element.clonePosition(this._containerObject, this._dataField);

                    if ( this._options.position === 'bottom' )
                    {
                        this._containerObject.style.top = Element.elementHeight(this._dataField) + Element.offsetTop(this._dataField) + 'px';
                        this._containerObject.style.left = Element.offset(this._dataField)[0] +'px';
                    }
                    else
                    {
                        this._containerObject.style.top = Element.offset(this._dataField)[1] +'px';
                        this._containerObject.style.left = Element.elementWidth(this._dataField) + Element.offset(this._dataField)[0] +'px';
                    }
                    //dom.appendChild(this._containerObject);
                    this._updateDate();
                    this._showMonth();
                    this._containerObject.style.display = 'block';
                },this));
            }
            else {
                Event.observe(this._picker,'click',Ink.bindEvent(function(e){
                    Event.stop(e);
                    this._containerObject = Element.clonePosition(this._containerObject,this._picker);
                    this._updateDate();
                    this._showMonth();
                    this._containerObject.style.display = 'block';
                },this));
            }

            if(!this._options.displayInSelect){
                Event.observe(this._dataField,'change', Ink.bindEvent(function() {
                        this._updateDate( );
                        this._showDefaultView( );
                        this.setDate( );
                        if ( !this._hoverPicker )
                        {
                            this._containerObject.style.display = 'none';
                        }
                    },this));
                Event.observe(this._dataField,'blur', Ink.bindEvent(function() {
                        if ( !this._hoverPicker )
                        {
                            this._containerObject.style.display = 'none';
                        }
                    },this));
            }
            else {
                Event.observe(this._options.dayField,'change', Ink.bindEvent(function(){
                        var yearSelected = this._options.yearField[this._options.yearField.selectedIndex].value;
                        if(yearSelected !== '' && yearSelected !== 0) {
                            this._updateDate();
                            this._showDefaultView();
                        }
                    },this));
               Event.observe(this._options.monthField,'change', Ink.bindEvent(function(){
                        var yearSelected = this._options.yearField[this._options.yearField.selectedIndex].value;
                        if(yearSelected !== '' && yearSelected !== 0){
                            this._updateDate();
                            this._showDefaultView();
                        }
                    },this));
                Event.observe(this._options.yearField,'change', Ink.bindEvent(function(){
                        this._updateDate();
                        this._showDefaultView();
                    },this));
            }

            Event.observe(document,'click',Ink.bindEvent(function(e){
                if (e.target === undefined) {   e.target = e.srcElement;    }
                if (!Element.descendantOf(this._containerObject, e.target) && e.target !== this._dataField) {
                    if (!this._picker) {
                        this._containerObject.style.display = 'none';
                    }
                    else if (e.target !== this._picker &&
                             (!this._options.displayInSelect ||
                              (e.target !== this._options.dayField && e.target !== this._options.monthField && e.target !== this._options.yearField) ) ) {
                        if (!this._options.dayField ||
                                (!Element.descendantOf(this._options.dayField,   e.target) &&
                                 !Element.descendantOf(this._options.monthField, e.target) &&
                                 !Element.descendantOf(this._options.yearField,  e.target)      ) ) {
                            this._containerObject.style.display = 'none';
                        }
                    }
                }
            },this));

            this._showMonth();

            this._monthChanger = document.createElement('a');
            this._monthChanger.href = '#monthchanger';
            this._monthChanger.className = 'sapo_cal_link_month';
            this._monthChanger.innerHTML = this._options.month[this._month + 1];

            this._deText = document.createElement('span');
            this._deText.innerHTML = this._options._deText;


            this._yearChanger = document.createElement('a');
            this._yearChanger.href = '#yearchanger';
            this._yearChanger.className = 'sapo_cal_link_year';
            this._yearChanger.innerHTML = this._year;
            this._monthDescContainer.innerHTML = '';
            this._monthDescContainer.appendChild(this._monthChanger);
            this._monthDescContainer.appendChild(this._deText);
            this._monthDescContainer.appendChild(this._yearChanger);

            Event.observe(this._containerObject,'mouseover',Ink.bindEvent(function(e)
            {
                Event.stop( e );
                this._hoverPicker = true;
            },this));

            Event.observe(this._containerObject,'mouseout',Ink.bindEvent(function(e)
            {
                Event.stop( e );
                this._hoverPicker = false;
            },this));

            Event.observe(this._containerObject,'click',Ink.bindEvent(function(e){
                    if(typeof(e.target) === 'undefined'){
                        e.target = e.srcElement;
                    }
                    var className = e.target.className;
                    var isInactive  = className.indexOf( 'sapo_cal_off' ) !== -1;

                    Event.stop(e);

                    if( className.indexOf('sapo_cal_') === 0 && !isInactive ){
                            var day = className.substr( 9 , 2 );
                            if( Number( day ) ) {
                                this.setDate( this._year + '-' + ( this._month + 1 ) + '-' + day );
                                this._containerObject.style.display = 'none';
                            } else if(className === 'sapo_cal_link_month'){
                                this._monthContainer.style.display = 'none';
                                this._yearSelector.style.display = 'none';
                                this._monthPrev.childNodes[0].className = 'action_inactive';
                                this._monthNext.childNodes[0].className = 'action_inactive';
                                this._setActiveMonth();
                                this._monthSelector.style.display = 'block';
                            } else if(className === 'sapo_cal_link_year'){
                                this._monthPrev.childNodes[0].className = 'action_inactive';
                                this._monthNext.childNodes[0].className = 'action_inactive';
                                this._monthSelector.style.display = 'none';
                                this._monthContainer.style.display = 'none';
                                this._showYearSelector();
                                this._yearSelector.style.display = 'block';
                            }
                    } else if( className.indexOf("sapo_calmonth_") === 0 && !isInactive ){
                            var month=className.substr(14,2);
                            if(Number(month)){
                                this._month = month - 1;
                                // if( typeof this._options.onMonthSelected === 'function' ){
                                //     this._options.onMonthSelected(this, {
                                //         'year': this._year,
                                //         'month' : this._month
                                //     });
                                // }
                                this._monthSelector.style.display = 'none';
                                this._monthPrev.childNodes[0].className = 'change_month_prev';
                                this._monthNext.childNodes[0].className = 'change_month_next';

                                if ( this._year < this._yearMin || this._year === this._yearMin && this._month <= this._monthMin ){
                                    this._monthPrev.childNodes[0].className = 'action_inactive';
                                }
                                else if( this._year > this._yearMax || this._year === this._yearMax && this._month >= this._monthMax ){
                                    this._monthNext.childNodes[0].className = 'action_inactive';
                                }

                                this._updateCal();
                                this._monthContainer.style.display = 'block';
                            }
                    } else if( className.indexOf("sapo_calyear_") === 0 && !isInactive ){
                            var year=className.substr(13,4);
                            if(Number(year)){
                                this._year = year;
                                if( typeof this._options.onYearSelected === 'function' ){
                                    this._options.onYearSelected(this, {
                                        'year': this._year
                                    });
                                }
                                this._monthPrev.childNodes[0].className = 'action_inactive';
                                this._monthNext.childNodes[0].className = 'action_inactive';
                                this._yearSelector.style.display='none';
                                this._setActiveMonth();
                                this._monthSelector.style.display='block';
                            }
                    } else if( className.indexOf('change_month_') === 0 && !isInactive ){
                            if(className === 'change_month_next'){
                                this._updateCal(1);
                            } else if(className === 'change_month_prev'){
                                this._updateCal(-1);
                            }
                    } else if( className.indexOf('change_year_') === 0 && !isInactive ){
                            if(className === 'change_year_next'){
                                this._showYearSelector(1);
                            } else if(className === 'change_year_prev'){
                                this._showYearSelector(-1);
                            }
                    } else if(className === 'clean'){
                        if(this._options.displayInSelect){
                            this._options.yearField.selectedIndex = 0;
                            this._options.monthField.selectedIndex = 0;
                            this._options.dayField.selectedIndex = 0;
                        } else {
                            this._dataField.value = '';
                        }
                    } else if(className === 'close'){
                        this._containerObject.style.display = 'none';
                    }

                    this._updateDescription();
                },this));

        },

        /**
         * Sets the range of dates allowed to be selected in the Date Picker
         *
         * @method _setMinMax
         * @param {String} dateRange Two dates separated by a ':'. Example: 2013-01-01:2013-12-12
         * @private
         */
        _setMinMax : function( dateRange )
        {
            var auxDate;
            if( dateRange )
            {
                var dates = dateRange.split( ':' );
                var pattern = /^(\d{4})((\-)(\d{1,2})((\-)(\d{1,2}))?)?$/;
                if ( dates[ 0 ] )
                {
                    if ( dates[ 0 ] === 'NOW' )
                    {
                        this._yearMin   = this._today.getFullYear( );
                        this._monthMin  = this._today.getMonth( ) + 1;
                        this._dayMin    = this._today.getDate( );
                    }
                    else if ( pattern.test( dates[ 0 ] ) )
                    {
                        auxDate = dates[ 0 ].split( '-' );

                        this._yearMin   = Math.floor( auxDate[ 0 ] );
                        this._monthMin  = Math.floor( auxDate[ 1 ] ) || 1;
                        this._dayMin    = Math.floor( auxDate[ 2 ] ) || 1;

                        if ( 1 < this._monthMin && this._monthMin > 12 )
                        {
                            this._monthMin = 1;
                            this._dayMin = 1;
                        }

                        if ( 1 < this._dayMin && this._dayMin > this._daysInMonth( this._yearMin , this._monthMin ) )
                        {
                            this._dayMin = 1;
                        }
                    }
                    else
                    {
                        this._yearMin   = Number.MIN_VALUE;
                        this._monthMin  = 1;
                        this._dayMin    = 1;
                    }
                }

                if ( dates[ 1 ] )
                {
                    if ( dates[ 1 ] === 'NOW' )
                    {
                        this._yearMax   = this._today.getFullYear( );
                        this._monthMax  = this._today.getMonth( ) + 1;
                        this._dayMax    = this._today.getDate( );
                    }
                    else if ( pattern.test( dates[ 1 ] ) )
                    {
                        auxDate = dates[ 1 ].split( '-' );

                        this._yearMax   = Math.floor( auxDate[ 0 ] );
                        this._monthMax  = Math.floor( auxDate[ 1 ] ) || 12;
                        this._dayMax    = Math.floor( auxDate[ 2 ] ) || this._daysInMonth( this._yearMax , this._monthMax );

                        if ( 1 < this._monthMax && this._monthMax > 12 )
                        {
                            this._monthMax = 12;
                            this._dayMax = 31;
                        }

                        var MDay = this._daysInMonth( this._yearMax , this._monthMax );
                        if ( 1 < this._dayMax && this._dayMax > MDay )
                        {
                            this._dayMax = MDay;
                        }
                    }
                    else
                    {
                        this._yearMax   = Number.MAX_VALUE;
                        this._monthMax  = 12;
                        this._dayMax   = 31;
                    }
                }

                if ( !( this._yearMax >= this._yearMin && (this._monthMax > this._monthMin || ( (this._monthMax === this._monthMin) && (this._dayMax >= this._dayMin) ) ) ) )
                {
                    this._yearMin   = Number.MIN_VALUE;
                    this._monthMin  = 1;
                    this._dayMin    = 1;

                    this._yearMax   = Number.MAX_VALUE;
                    this._monthMax  = 12;
                    this._dayMaXx   = 31;
                }
            }
            else
            {
                this._yearMin   = Number.MIN_VALUE;
                this._monthMin  = 1;
                this._dayMin    = 1;

                this._yearMax   = Number.MAX_VALUE;
                this._monthMax  = 12;
                this._dayMax   = 31;
            }
        },

        /**
         * Checks if a date is between the valid range.
         * Starts by checking if the date passed is valid. If not, will fallback to the 'today' date.
         * Then checks if the all params are inside of the date range specified. If not, it will fallback to the nearest valid date (either Min or Max).
         *
         * @method _checkDateRange
         * @param  {Number} year  Year with 4 digits (yyyy)
         * @param  {Number} month Month
         * @param  {Number} day   Day
         * @return {Array}       Array with the final processed date.
         * @private
         */
        _checkDateRange : function( year , month , day )
        {
            if ( !this._isValidDate( year , month + 1 , day ) )
            {
                year  = this._today.getFullYear( );
                month = this._today.getMonth( );
                day   = this._today.getDate( );
            }

            if ( year > this._yearMax )
            {
                year  = this._yearMax;
                month = this._monthMax - 1;
                day   = this._dayMax;
            }
            else if ( year < this._yearMin )
            {
                year  = this._yearMin;
                month = this._monthMin - 1;
                day   = this._dayMin;
            }

            if ( year === this._yearMax && month + 1 > this._monthMax )
            {
                month = this._monthMax - 1;
                day   = this._dayMax;
            }
            else if ( year === this._yearMin && month + 1 < this._monthMin )
            {
                month = this._monthMin - 1;
                day   = this._dayMin;
            }

            if ( year === this._yearMax && month + 1 === this._monthMax && day > this._dayMax ){ day = this._dayMax; }
            else if ( year === this._yearMin && month + 1 === this._monthMin && day < this._dayMin ){ day = this._dayMin; }
            else if ( day > this._daysInMonth( year , month + 1 ) ){ day = this._daysInMonth( year , month + 1 ); }

            return [ year , month , day ];
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

            if ( this._year < this._yearMin || this._year === this._yearMin && this._month + 1 <= this._monthMin ){
                this._monthPrev.childNodes[0].className = 'action_inactive';
            }
            else if( this._year > this._yearMax || this._year === this._yearMax && this._month + 1 >= this._monthMax ){
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
             if(!this._options.displayInSelect){
                 if(this._dataField.value !== ''){
                    if(this._isDate(this._options.format,this._dataField.value)){
                        dataParsed = this._getDataArrayParsed(this._dataField.value);
                        dataParsed = this._checkDateRange( dataParsed[ 0 ] , dataParsed[ 1 ] - 1 , dataParsed[ 2 ] );

                        this._year  = dataParsed[ 0 ];
                        this._month = dataParsed[ 1 ];
                        this._day   = dataParsed[ 2 ];
                    }else{
                        this._dataField.value = '';
                        this._year  = this._data.getFullYear( );
                        this._month = this._data.getMonth( );
                        this._day   = this._data.getDate( );
                    }
                    this._data.setFullYear( this._year , this._month , this._day );
                    this._dataField.value = this._writeDateInFormat( );
                }
            } else {
                dataParsed = [];
                if(this._isValidDate(
                    dataParsed[0] = this._options.yearField[this._options.yearField.selectedIndex].value,
                    dataParsed[1] = this._options.monthField[this._options.monthField.selectedIndex].value,
                    dataParsed[2] = this._options.dayField[this._options.dayField.selectedIndex].value
                )){
                    dataParsed = this._checkDateRange( dataParsed[ 0 ] , dataParsed[ 1 ] - 1 , dataParsed[ 2 ] );

                    this._year  = dataParsed[ 0 ];
                    this._month = dataParsed[ 1 ];
                    this._day   = dataParsed[ 2 ];
                } else {
                    dataParsed = this._checkDateRange( dataParsed[ 0 ] , dataParsed[ 1 ] - 1 , 1 );
                    if(this._isValidDate( dataParsed[ 0 ], dataParsed[ 1 ] + 1 ,dataParsed[ 2 ] )){
                        this._year  = dataParsed[ 0 ];
                        this._month = dataParsed[ 1 ];
                        this._day   = this._daysInMonth(dataParsed[0],dataParsed[1]);

                        this.setDate();
                    }
                }
            }
            this._updateDescription();
            this._showMonth();
        },

        /**
         * Updates the date description shown at the top of the datepicker
         *
         * @method  _updateDescription
         * @private
         */
        _updateDescription: function(){
            this._monthChanger.innerHTML = this._options.month[ this._month + 1 ];
            this._deText.innerHTML = this._options.ofText;
            this._yearChanger.innerHTML = this._year;
        },

        /**
         * Renders the year selector view of the datepicker
         *
         * @method _showYearSelector
         * @private
         */
        _showYearSelector: function(){
            if (arguments.length){
                var year = + this._year + arguments[0]*10;
                year=year-year%10;
                if ( year>this._yearMax || year+9<this._yearMin ){
                    return;
                }
                this._year = + this._year + arguments[0]*10;
            }

            var str = "<li>";
            var ano_base = this._year-(this._year%10);

            for (var i=0; i<=11; i++){
                if (i % 4 === 0){
                    str+='<ul>';
                }

                if (!i || i === 11){
                    if ( i && (ano_base+i-1)<=this._yearMax && (ano_base+i-1)>=this._yearMin ){
                        str+='<li><a href="#year_next" class="change_year_next">' + this._options.nextLinkText + '</a></li>';
                    } else if( (ano_base+i-1)<=this._yearMax && (ano_base+i-1)>=this._yearMin ){
                         str+='<li><a href="#year_prev" class="change_year_prev">' + this._options.prevLinkText + '</a></li>';
                    } else {
                        str +='<li>&nbsp;</li>';
                    }
                } else {
                    if ( (ano_base+i-1)<=this._yearMax && (ano_base+i-1)>=this._yearMin ){
                        str+='<li><a href="#" class="sapo_calyear_' + (ano_base+i-1)  + (((ano_base+i-1) === this._data.getFullYear()) ? ' sapo_cal_on' : '') + '">' + (ano_base+i-1) +'</a></li>';
                    } else {
                        str+='<li><a href="#" class="sapo_cal_off">' + (ano_base+i-1) +'</a></li>';

                    }
                }

                if ((i+1) % 4 === 0) {
                    str+='</ul>';
                }
            }

            str += "</li>";

            this._yearSelector.innerHTML = str;
        },

        /**
         * This function returns the given date in an array format
         *
         * @method _getDataArrayParsed
         * @param {String} dateStr A date on a string.
         * @private
         * @return {Array} The given date in an array format
         */
        _getDataArrayParsed: function(dateStr){
            var arrData = [];
            var data = InkDate.set( this._options.format , dateStr );
            if (data) {
                arrData = [ data.getFullYear( ) , data.getMonth( ) + 1 , data.getDate( ) ];
            }
            return arrData;
        },

        /**
         * Checks if a date is valid
         *
         * @method _isValidDate
         * @param {Number} year
         * @param {Number} month
         * @param {Number} day
         * @private
         * @return {Boolean} True if the date is valid, false otherwise
         */
        _isValidDate: function(year, month, day){
            var yearRegExp = /^\d{4}$/;
            var validOneOrTwo = /^\d{1,2}$/;
            return (
                yearRegExp.test(year)     &&
                validOneOrTwo.test(month) &&
                validOneOrTwo.test(day)   &&
                month >= 1  &&
                month <= 12 &&
                day   >= 1  &&
                day   <= this._daysInMonth(year,month)
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
                var data = InkDate.set( format , dateStr );
                if( data && this._isValidDate( data.getFullYear( ) , data.getMonth( ) + 1 , data.getDate( ) ) ){
                    return true;
                }
            } catch (ex) {}

            return false;
        },


        /**
         * This method returns the date written with the format specified on the options
         *
         * @method _writeDateInFormat
         * @private
         * @return {String} Returns the current date of the object in the specified format
         */
       _writeDateInFormat:function(){
            return InkDate.get( this._options.format , this._data );
        },

        /**
         * This method allows the user to set the DatePicker's date on run-time.
         *
         * @method setDate
         * @param {String} dateString A date string in yyyy-mm-dd format.
         * @public
         */
        setDate : function( dateString )
        {
            if ( typeof dateString === 'string' && /\d{4}-\d{1,2}-\d{1,2}/.test( dateString ) )
            {
                var auxDate = dateString.split( '-' );
                this._year  = auxDate[ 0 ];
                this._month = auxDate[ 1 ] - 1;
                this._day   = auxDate[ 2 ];
            }

            this._setDate( );
        },

        /**
         * Sets the chosen date on the target input field
         *
         * @method _setDate
         * @param {DOMElement} objClicked Clicked object inside the DatePicker's calendar.
         * @private
         */
        _setDate : function( objClicked ){
            if( typeof objClicked !== 'undefined' && objClicked.className && objClicked.className.indexOf('sapo_cal_') === 0 )
            {
                this._day = objClicked.className.substr( 9 , 2 );
            }
            this._data.setFullYear.apply( this._data , this._checkDateRange( this._year , this._month , this._day ) );

            if(!this._options.displayInSelect){
                this._dataField.value = this._writeDateInFormat();
            } else {
                this._options.dayField.value   = this._data.getDate();
                this._options.monthField.value = this._data.getMonth()+1;
                this._options.yearField.value  = this._data.getFullYear();
            }
            if(this._options.onSetDate) {
                this._options.onSetDate( this , { date : this._data } );
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
            this._updateMonth(inc);
            this._showMonth();
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
            var nDays = 31;

            switch (_m) {
                case 2:
                    nDays = ((_y % 400 === 0) || (_y % 4 === 0 && _y % 100 !== 0)) ? 29 : 28;
                    break;

                case 4:
                case 6:
                case 9:
                case 11:
                    nDays = 30;
                    break;
            }

            return nDays;
        },


        /**
         * Updates the calendar when a different month is chosen
         *
         * @method _updateMonth
         * @param {Number} incValue - indicates previous or next month
         * @private
         */
        _updateMonth: function(incValue){
            if(typeof incValue === 'undefined') {
                incValue = "0";
            }

            var mes = this._month + 1;
            var ano = this._year;
            switch(incValue){
                case -1:
                    if (mes===1){
                        if(ano === this._yearMin){ return; }
                        mes=12;
                        ano--;
                    }
                    else {
                        mes--;
                    }
                    this._year  = ano;
                    this._month = mes - 1;
                    break;
                case 1:
                    if(mes === 12){
                        if(ano === this._yearMax){ return; }
                        mes=1;
                        ano++;
                    }
                    else{
                        mes++;
                    }
                    this._year  = ano;
                    this._month = mes - 1;
                    break;
                default:

            }
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
         * @method _showMonth
         * @private
         */
        _showMonth: function(){
            /*jshint maxstatements:100, maxcomplexity:20 */
            var i, j;
            var mes = this._month + 1;
            var ano = this._year;
            var maxDay = this._daysInMonth(ano,mes);

            var wDayFirst = (new Date( ano , mes - 1 , 1 )).getDay();

            var startWeekDay = this._options.startWeekDay || 0;

            this._monthPrev.childNodes[0].className = 'change_month_prev';
            this._monthNext.childNodes[0].className = 'change_month_next';

            if ( ano < this._yearMin || ano === this._yearMin && mes <= this._monthMin ){
                this._monthPrev.childNodes[0].className = 'action_inactive';
            }
            else if( ano > this._yearMax || ano === this._yearMax && mes >= this._monthMax ){
                this._monthNext.childNodes[0].className = 'action_inactive';
            }

            if(startWeekDay && Number(startWeekDay)){
                if(startWeekDay > wDayFirst) {
                    wDayFirst = 7 + startWeekDay - wDayFirst;
                } else {
                    wDayFirst += startWeekDay;
                }
            }

            var html = '';

            html += '<ul class="sapo_cal_header">';

            for(i=0; i<7; i++){
                html+='<li>' + this._options.wDay[i + (((startWeekDay+i)>6) ? startWeekDay-7 : startWeekDay )].substring(0,1)  + '</li>';
            }
            html+='</ul>';

            var counter = 0;
            html+='<ul>';
            if(wDayFirst){
                for(j = startWeekDay; j < wDayFirst - startWeekDay; j++) {
                    if (!counter){
                        html+='<ul>';
                    }
                    html+='<li class="sapo_cal_empty">&nbsp;</li>';
                    counter++;
                }
            }

            for (i = 1; i <= maxDay; i++) {
                if (counter === 7){
                    counter=0;
                    html+='<ul>';
                }
                var idx = 'sapo_cal_' + ((String(i).length === 2) ? i : "0" + i);
                idx += ( ano === this._yearMin && mes === this._monthMin && i < this._dayMin ||
                    ano === this._yearMax && mes === this._monthMax && i > this._dayMax ||
                    ano === this._yearMin && mes < this._monthMin ||
                    ano === this._yearMax && mes > this._monthMax ||
                    ano < this._yearMin || ano > this._yearMax || ( this._options.validDayFn && !this._options.validDayFn.call( this, new Date( ano , mes - 1 , i) ) ) ) ? " sapo_cal_off" :
                    (this._data.getFullYear( ) === ano && this._data.getMonth( ) === mes - 1 && i === this._day) ? " sapo_cal_on" : "";
                html+='<li><a href="#" class="' + idx + '">' + i + '</a></li>';

                counter++;
                if(counter === 7){
                    html+='</ul>';
                }
            }
            if (counter !== 7){
                for(i = counter; i < 7; i++){
                    html+='<li class="sapo_cal_empty">&nbsp;</li>';
                }
                html+='</ul>';
            }
            html+='</ul>';


            this._monthContainer.innerHTML = html;

        },

        /**
         * This method sets the active month
         *
         * @method _setActiveMonth
         * @param {DOMElement} parent DOMElement where all the months are.
         * @private
         */
        _setActiveMonth: function(parent){
            if (typeof parent === 'undefined') {
                parent = this._monthSelector;
            }

            var length = parent.childNodes.length;

            if (parent.className && parent.className.match(/sapo_calmonth_/)) {
                var year = this._year;
                var month = parent.className.substr( 14 , 2 );

                if ( year === this._data.getFullYear( ) && month === this._data.getMonth( ) + 1 )
                {
                    Css.addClassName( parent , 'sapo_cal_on' );
                    Css.removeClassName( parent , 'sapo_cal_off' );
                }
                else
                {
                    Css.removeClassName( parent , 'sapo_cal_on' );
                    if ( year === this._yearMin && month < this._monthMin ||
                        year === this._yearMax && month > this._monthMax ||
                        year < this._yearMin ||
                        year > this._yearMax )
                    {
                        Css.addClassName( parent , 'sapo_cal_off' );
                    }
                    else
                    {
                        Css.removeClassName( parent , 'sapo_cal_off' );
                    }
                }
            }
            else if (length !== 0){
                for (var i = 0; i < length; i++) {
                    this._setActiveMonth(parent.childNodes[i]);
                }
            }
        },

        /**
         * Prototype's method to allow the 'i18n files' to change all objects' language at once.
         * @param  {Object} options Object with the texts' configuration.
         *     @param {String} closeText Text of the close anchor
         *     @param {String} cleanText Text of the clean text anchor
         *     @param {String} prevLinkText "Previous" link's text
         *     @param {String} nextLinkText "Next" link's text
         *     @param {String} ofText The text "of", present in 'May of 2013'
         *     @param {Object} month An object with keys from 1 to 12 that have the full months' names
         *     @param {Object} wDay An object with keys from 0 to 6 that have the full weekdays' names
         * @public
         */
        lang: function( options ){
            this._lang = options;
        },

        /**
         * This calls the rendering of the selected month.
         *
         * @method showMonth
         * @public
         */
        showMonth: function(){
            this._showMonth();
        },

        /**
         * Returns true if the calendar sceen is in 'select day' mode
         * 
         * @return {Boolean} True if the calendar sceen is in 'select day' mode
         * @public
         */
        isMonthRendered: function(){
            var header = Selector.select('.sapo_cal_header',this._containerObject)[0];

            return ( (Css.getStyle(header.parentNode,'display') !== 'none') && (Css.getStyle(header.parentNode.parentNode,'display') !== 'none') );
        }
    };

    return DatePicker;

});
