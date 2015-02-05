/*
 * Fuel UX Scheduler
 * https://github.com/ExactTarget/fuelux
 *
 * Copyright (c) 2012 ExactTarget
 * Licensed under the MIT license.
 */

define(['require','jquery','fuelux/combobox','fuelux/datepicker','fuelux/radio','fuelux/select','fuelux/spinner'],function(require) {
    var $ = require('jquery');
    var old = $.fn.scheduler;

    require('fuelux/combobox');
    require('fuelux/datepicker');
    require('fuelux/radio');
    require('fuelux/select');
    require('fuelux/spinner');

    // SCHEDULER CONSTRUCTOR AND PROTOTYPE

    var Scheduler = function (element, options) {
        var self = this;

        this.$element = $(element);
        this.options = $.extend({}, $.fn.scheduler.defaults, options);

        // cache elements
        this.$startDate = this.$element.find('.scheduler-start .datepicker');
        this.$startTime = this.$element.find('.scheduler-start .combobox');

        this.$timeZone = this.$element.find('.scheduler-timezone .select');

        this.$repeatIntervalPanel = this.$element.find('.repeat-interval-panel');
        this.$repeatIntervalSelect = this.$element.find('.repeat-interval .select');
        this.$repeatIntervalSpinner = this.$element.find('.repeat-interval-panel .spinner');
        this.$repeatIntervalTxt = this.$element.find('.repeat-interval-text');

        this.$end = this.$element.find('.scheduler-end');
        this.$endAfter = this.$end.find('.spinner');
        this.$endSelect= this.$end.find('.select');
        this.$endDate = this.$end.find('.datepicker');

        // panels
        this.$recurrencePanels = this.$element.find('.recurrence-panel');

        // bind events
        this.$element.find('.scheduler-weekly .btn-group .btn').on('click', function(e, data){ self.changed(e, data, true); });
        this.$element.find('.combobox').on('changed', $.proxy(this.changed, this));
        this.$element.find('.datepicker').on('changed', $.proxy(this.changed, this));
        this.$element.find('.select').on('changed', $.proxy(this.changed, this));
        this.$element.find('.spinner').on('changed', $.proxy(this.changed, this));
        this.$element.find('.scheduler-monthly label.radio, .scheduler-yearly label.radio').on('mouseup', $.proxy(this.changed, this));

        this.$repeatIntervalSelect.on('changed', $.proxy(this.repeatIntervalSelectChanged, this));
        this.$endSelect.on('changed', $.proxy(this.endSelectChanged, this));

        //initialize sub-controls
        this.$startDate.datepicker();
        this.$startTime.combobox();
        if(this.$startTime.find('input').val()===''){
            this.$startTime.combobox('selectByIndex', 0);
        }
        this.$repeatIntervalSpinner.spinner();
        this.$endAfter.spinner();
        this.$endDate.datepicker();
    };

    Scheduler.prototype = {
        constructor: Scheduler,

        changed: function(e, data, propagate){
            if(!propagate){
                e.stopPropagation();
            }
            this.$element.trigger('changed', {
                data: (data!==undefined) ? data : $(e.currentTarget).data(),
                originalEvent: e,
                value: this.getValue()
            });
        },

        disable: function(){
            this.toggleState('disable');
        },

        enable: function(){
            this.toggleState('enable');
        },

        // called when the end range changes
        // (Never, After, On date)
        endSelectChanged: function(e, data) {
            var selectedItem, val;

            if(!data){
                selectedItem = this.$endSelect.select('selectedItem');
                val = selectedItem.value;
            }else{
                val = data.value;
            }

            // hide all panels
            this.$endAfter.hide();
            this.$endDate.hide();

            if(val==='after'){
                this.$endAfter.show();
            }else if(val==='date'){
                this.$endDate.show();
            }
        },

        getValue: function(){
            // FREQ = frequency (hourly, daily, monthly...)
            // BYDAY = when picking days (MO,TU,WE,etc)
            // BYMONTH = when picking months (Jan,Feb,March) - note the values should be 1,2,3...
            // BYMONTHDAY = when picking days of the month (1,2,3...)
            // BYSETPOS = when picking First,Second,Third,Fourth,Last (1,2,3,4,-1)

            var interval = this.$repeatIntervalSpinner.spinner('value');
            var pattern = '';
            var repeat = this.$repeatIntervalSelect.select('selectedItem').value;
            var startTime = this.$startTime.combobox('selectedItem').text.toLowerCase();
            var timeZone = this.$timeZone.select('selectedItem');
            var getFormattedDate = function(dateObj, dash){
                var fdate = '';
                var item;

                fdate += dateObj.getFullYear();
                fdate += dash;
                item = dateObj.getMonth() + 1;  //because 0 indexing makes sense when dealing with months /sarcasm
                fdate += (item<10) ? '0' + item : item;
                fdate += dash;
                item = dateObj.getDate();
                fdate += (item<10) ? '0' + item : item;

                return fdate;
            };
            var day, days, hasAm, hasPm, month, pos, startDateTime, type;

            startDateTime = '' + getFormattedDate(this.$startDate.datepicker('getDate'), '-');

            startDateTime += 'T';
            hasAm = (startTime.search('am')>=0);
            hasPm = (startTime.search('pm')>=0);
            startTime = $.trim(startTime.replace(/am/g, '').replace(/pm/g, '')).split(':');
            startTime[0] = parseInt(startTime[0], 10);
            startTime[1] = parseInt(startTime[1], 10);
            if(hasAm && startTime[0]>11){
                startTime[0] = 0;
            }else if(hasPm && startTime[0]<12){
                startTime[0] += 12;
            }
            startDateTime += (startTime[0]<10) ? '0' + startTime[0] : startTime[0];
            startDateTime += ':';
            startDateTime += (startTime[1]<10) ? '0' + startTime[1] : startTime[1];

            startDateTime += (timeZone.offset==='+00:00') ? 'Z' : timeZone.offset;

            if(repeat === 'none') {
                pattern = 'FREQ=DAILY;INTERVAL=1;COUNT=1;';
            }
            else if(repeat === 'hourly') {
                pattern = 'FREQ=HOURLY;';
                pattern += 'INTERVAL=' + interval + ';';
            }
            else if(repeat === 'daily') {
                pattern += 'FREQ=DAILY;';
                pattern += 'INTERVAL=' + interval + ';';
            }
            else if(repeat === 'weekdays') {
                pattern += 'FREQ=DAILY;';
                pattern += 'BYDAY=MO,TU,WE,TH,FR;';
                pattern += 'INTERVAL=1;';
            }
            else if(repeat === 'weekly') {
                days = [];
                this.$element.find('.scheduler-weekly .btn-group button.active').each(function() {
                    days.push($(this).data().value);
                });

                pattern += 'FREQ=WEEKLY;';
                pattern += 'BYDAY=' + days.join(',') + ';';
                pattern += 'INTERVAL=' + interval + ';';
            }
            else if(repeat === 'monthly') {
                pattern += 'FREQ=MONTHLY;';
                pattern += 'INTERVAL=' + interval + ';';

                type = parseInt(this.$element.find('input[name=scheduler-month]:checked').val(), 10);
                if(type === 1) {
                    day = parseInt(this.$element.find('.scheduler-monthly-date .select').select('selectedItem').text, 10);
                    pattern += 'BYMONTHDAY=' + day + ';';
                }
                else if(type === 2) {
                    days = this.$element.find('.month-days').select('selectedItem').value;
                    pos = this.$element.find('.month-day-pos').select('selectedItem').value;

                    pattern += 'BYDAY=' + days + ';';
                    pattern += 'BYSETPOS=' + pos + ';';
                }
            }
            else if(repeat === 'yearly') {
                pattern += 'FREQ=YEARLY;';

                type = parseInt(this.$element.find('input[name=scheduler-year]:checked').val(), 10);
                if(type === 1) {
                    month = this.$element.find('.scheduler-yearly-date .year-month').select('selectedItem').value;
                    day = this.$element.find('.year-month-day').select('selectedItem').text;

                    pattern += 'BYMONTH=' + month + ';';
                    pattern += 'BYMONTHDAY=' + day + ';';
                }
                else if(type === 2) {
                    days = this.$element.find('.year-month-days').select('selectedItem').value;
                    pos = this.$element.find('.year-month-day-pos').select('selectedItem').value;
                    month = this.$element.find('.scheduler-yearly-day .year-month').select('selectedItem').value;

                    pattern += 'BYDAY=' + days + ';';
                    pattern += 'BYSETPOS=' + pos + ';';
                    pattern += 'BYMONTH=' + month + ';';
                }
            }

            var end = this.$endSelect.select('selectedItem').value;
            var duration = '';

            // if both UNTIL and COUNT are not specified, the recurrence will repeat forever
            // http://tools.ietf.org/html/rfc2445#section-4.3.10
            if(repeat !=='none'){
                if(end === 'after') {
                    duration = 'COUNT=' + this.$endAfter.spinner('value') + ';';
                }
                else if(end === 'date') {
                    duration = 'UNTIL=' + getFormattedDate(this.$endDate.datepicker('getDate'), '') + ';';
                }
            }

            pattern += duration;

            var data = {
                startDateTime: startDateTime,
                timeZone: {
                    name: timeZone.name,
                    offset: timeZone.offset
                },
                recurrencePattern: pattern
            };

            return data;
        },

        // called when the repeat interval changes
        // (None, Hourly, Daily, Weekdays, Weekly, Monthly, Yearly
        repeatIntervalSelectChanged: function(e, data) {
            var selectedItem, val, txt;

            if(!data){
                selectedItem = this.$repeatIntervalSelect.select('selectedItem');
                val = selectedItem.value;
                txt = selectedItem.text;
            }else{
                val = data.value;
                txt = data.text;
            }

            // set the text
            this.$repeatIntervalTxt.text(txt);

            switch(val.toLowerCase()) {
                case 'hourly':
                case 'daily':
                case 'weekly':
                case 'monthly':
                    this.$repeatIntervalPanel.show();
                    break;
                default:
                    this.$repeatIntervalPanel.hide();
                    break;
            }

            // hide all panels
            this.$recurrencePanels.hide();

            // show panel for current selection
            this.$element.find('.scheduler-' + val).show();

            // the end selection should only be shown when
            // the repeat interval is not "None (run once)"
            if(val === 'none') {
                this.$end.hide();
            }
            else {
                this.$end.show();
            }
        },

        setValue: function(options){
            var hours, i, item, l, minutes, period, recur, temp;

            if(options.startDateTime){
                temp = options.startDateTime.split('T');
                this.$startDate.datepicker('setDate', temp[0]);

                if(temp[1]){
                    temp[1] = temp[1].split(':');
                    hours = parseInt(temp[1][0], 10);
                    minutes = (temp[1][1]) ? parseInt(temp[1][1].split('+')[0].split('-')[0].split('Z')[0], 10) : 0;
                    period = (hours<12) ? 'AM' : 'PM';

                    if(hours===0){
                        hours = 12;
                    }else if(hours>12){
                        hours -= 12;
                    }
                    minutes = (minutes<10) ? '0' + minutes : minutes;

                    temp = hours + ':' + minutes + ' ' + period;
                    this.$startTime.find('input').val(temp);
                    this.$startTime.combobox('selectByText', temp);
                }
            }

            item = 'li[data';
            if(options.timeZone){
                if(typeof(options.timeZone)==='string'){
                    item += '-name="' + options.timeZone;
                }else{
                    if(options.timeZone.name){
                        item += '-name="' + options.timeZone.name;
                    }else{
                        item += '-offset="' + options.timeZone.offset;
                    }
                }
                item += '"]';
                this.$timeZone.select('selectBySelector', item);
            }else if(options.startDateTime){
                temp = options.startDateTime.split('T')[1];
                if(temp){
                    if(temp.search(/\+/)>-1){
                        temp = '+' + $.trim(temp.split('+')[1]);
                    }else if(temp.search(/\-/)>-1){
                        temp = '-' + $.trim(temp.split('-')[1]);
                    }else{
                        temp = '+00:00';
                    }
                }else{
                    temp = '+00:00';
                }
                item += '-offset="' + temp + '"]';
                this.$timeZone.select('selectBySelector', item);
            }

            if(options.recurrencePattern){
                recur = {};
                temp = options.recurrencePattern.toUpperCase().split(';');
                for(i=0, l=temp.length; i<l; i++){
                    if(temp[i]!==''){
                        item = temp[i].split('=');
                        recur[item[0]] = item[1];
                    }
                }

                if(recur.FREQ==='DAILY'){
                    if(recur.BYDAY==='MO,TU,WE,TH,FR'){
                        item = 'weekdays';
                    }else{
                        if(recur.INTERVAL==='1' && recur.COUNT==='1'){
                            item = 'none';
                        }else{
                            item = 'daily';
                        }
                    }
                }else if(recur.FREQ==='HOURLY'){
                    item = 'hourly';
                }else if(recur.FREQ==='WEEKLY'){
                    if(recur.BYDAY){
                        item = this.$element.find('.scheduler-weekly .btn-group');
                        item.find('button').removeClass('active');
                        temp = recur.BYDAY.split(',');
                        for(i=0,l=temp.length; i<l; i++){
                            item.find('button[data-value="' + temp[i] + '"]').addClass('active');
                        }
                    }
                    item = 'weekly';
                }else if(recur.FREQ==='MONTHLY'){
                    this.$element.find('.scheduler-monthly input').removeClass('checked');
                    if(recur.BYMONTHDAY){
                        temp = this.$element.find('.scheduler-monthly-date');
                        temp.find('input').addClass('checked');
                        temp.find('.select').select('selectByValue', recur.BYMONTHDAY);
                    }else if(recur.BYDAY){
                        temp = this.$element.find('.scheduler-monthly-day');
                        temp.find('input').addClass('checked');
                        if(recur.BYSETPOS){
                            temp.find('.month-day-pos').select('selectByValue', recur.BYSETPOS);
                        }
                        temp.find('.month-days').select('selectByValue', recur.BYDAY);
                    }
                    item = 'monthly';
                }else if(recur.FREQ==='YEARLY'){
                    this.$element.find('.scheduler-yearly input').removeClass('checked');
                    if(recur.BYMONTHDAY){
                        temp = this.$element.find('.scheduler-yearly-date');
                        temp.find('input').addClass('checked');
                        if(recur.BYMONTH){
                            temp.find('.year-month').select('selectByValue', recur.BYMONTH);
                        }
                        temp.find('.year-month-day').select('selectByValue', recur.BYMONTHDAY);
                    }else if(recur.BYSETPOS){
                        temp = this.$element.find('.scheduler-yearly-day');
                        temp.find('input').addClass('checked');
                        temp.find('.year-month-day-pos').select('selectByValue', recur.BYSETPOS);
                        if(recur.BYDAY){
                            temp.find('.year-month-days').select('selectByValue', recur.BYDAY);
                        }
                        if(recur.BYMONTH){
                            temp.find('.year-month').select('selectByValue', recur.BYMONTH);
                        }
                    }
                    item = 'yearly';
                }else{
                    item = 'none';
                }

                if(recur.COUNT){
                    this.$endAfter.spinner('value', parseInt(recur.COUNT, 10));
                    this.$endSelect.select('selectByValue', 'after');
                }else if(recur.UNTIL){
                    temp = recur.UNTIL;
                    if(temp.length===8){
                        temp = temp.split('');
                        temp.splice(4, 0, '-');
                        temp.splice(7, 0, '-');
                        temp = temp.join('');
                    }
                    this.$endDate.datepicker('setDate', temp);
                    this.$endSelect.select('selectByValue', 'date');
                }
                this.endSelectChanged();

                if(recur.INTERVAL){
                    this.$repeatIntervalSpinner.spinner('value', parseInt(recur.INTERVAL, 10));
                }
                this.$repeatIntervalSelect.select('selectByValue', item);
                this.repeatIntervalSelectChanged();
            }
        },

        toggleState: function(action){
            this.$element.find('.combobox').combobox(action);
            this.$element.find('.datepicker').datepicker(action);
            this.$element.find('.select').select(action);
            this.$element.find('.spinner').spinner(action);
            this.$element.find('.radio').radio(action);

            if(action==='disable'){
                action = 'addClass';
            }else{
                action = 'removeClass';
            }
            this.$element.find('.scheduler-weekly .btn-group')[action]('disabled');
        },

        value: function(options) {
            if(options){
                return this.setValue(options);
            }else{
                return this.getValue();
            }
        }
    };


    // SCHEDULER PLUGIN DEFINITION

    $.fn.scheduler = function (option) {
        var args = Array.prototype.slice.call( arguments, 1 );
        var methodReturn;

        var $set = this.each(function () {
            var $this = $(this);
            var data = $this.data('scheduler');
            var options = typeof option === 'object' && option;

            if (!data) $this.data('scheduler', (data = new Scheduler(this, options)));
            if( typeof option === 'string' ) methodReturn = data[ option ].apply( data, args );
        });

        return ( methodReturn === undefined ) ? $set : methodReturn;
    };

    $.fn.scheduler.defaults = {};

    $.fn.scheduler.Constructor = Scheduler;

    $.fn.scheduler.noConflict = function () {
        $.fn.scheduler = old;
        return this;
    };

    // SCHEDULER DATA-API

    $(function () {
        $('body').on('mousedown.scheduler.data-api', '.scheduler', function () {
            var $this = $(this);
            if ($this.data('scheduler')) return;
            $this.scheduler($this.data());
        });
    });

});
