import { NgModule, Component, Input, Output, EventEmitter, forwardRef, ViewChild, ContentChildren, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { DomHandler, ConnectedOverlayScrollHandler } from 'primeng/dom';
import { SharedModule, PrimeTemplate, TranslationKeys } from 'primeng/api';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ZIndexUtils } from 'primeng/utils';
import * as i0 from "@angular/core";
import * as i1 from "primeng/api";
import * as i2 from "@angular/common";
import * as i3 from "primeng/button";
import * as i4 from "primeng/ripple";
export const CALENDAR_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Calendar),
    multi: true
};
export class Calendar {
    constructor(el, renderer, cd, zone, config, overlayService) {
        this.el = el;
        this.renderer = renderer;
        this.cd = cd;
        this.zone = zone;
        this.config = config;
        this.overlayService = overlayService;
        this.multipleSeparator = ',';
        this.rangeSeparator = '-';
        this.inline = false;
        this.showOtherMonths = true;
        this.icon = 'pi pi-calendar';
        this.shortYearCutoff = '+10';
        this.hourFormat = '24';
        this.stepHour = 1;
        this.stepMinute = 1;
        this.stepSecond = 1;
        this.showSeconds = false;
        this.showOnFocus = true;
        this.showWeek = false;
        this.dataType = 'date';
        this.selectionMode = 'single';
        this.todayButtonStyleClass = 'p-button-text';
        this.clearButtonStyleClass = 'p-button-text';
        this.autoZIndex = true;
        this.baseZIndex = 0;
        this.keepInvalid = false;
        this.hideOnDateTimeSelect = true;
        this.numberOfMonths = 1;
        this.view = 'date';
        this.timeSeparator = ":";
        this.focusTrap = true;
        this.firstDayOfWeek = 0;
        this.showTransitionOptions = '.12s cubic-bezier(0, 0, 0.2, 1)';
        this.hideTransitionOptions = '.1s linear';
        this.onFocus = new EventEmitter();
        this.onBlur = new EventEmitter();
        this.onClose = new EventEmitter();
        this.onSelect = new EventEmitter();
        this.onInput = new EventEmitter();
        this.onTodayClick = new EventEmitter();
        this.onClearClick = new EventEmitter();
        this.onMonthChange = new EventEmitter();
        this.onYearChange = new EventEmitter();
        this.onClickOutside = new EventEmitter();
        this.onShow = new EventEmitter();
        this.onModelChange = () => { };
        this.onModelTouched = () => { };
        this.inputFieldValue = null;
        this.navigationState = null;
        this.convertTo24Hour = function (hours, pm) {
            if (this.hourFormat == '12') {
                if (hours === 12) {
                    return (pm ? 12 : 0);
                }
                else {
                    return (pm ? hours + 12 : hours);
                }
            }
            return hours;
        };
    }
    set content(content) {
        this.contentViewChild = content;
        if (this.contentViewChild) {
            if (this.isMonthNavigate) {
                Promise.resolve(null).then(() => this.updateFocus());
                this.isMonthNavigate = false;
            }
            else {
                this.initFocusableCell();
            }
        }
    }
    ;
    get defaultDate() {
        return this._defaultDate;
    }
    ;
    set defaultDate(defaultDate) {
        this._defaultDate = defaultDate;
        if (this.initialized) {
            const date = defaultDate || new Date();
            this.currentMonth = date.getMonth();
            this.currentYear = date.getFullYear();
            this.initTime(date);
            this.createMonths(this.currentMonth, this.currentYear);
        }
    }
    get minDate() {
        return this._minDate;
    }
    set minDate(date) {
        this._minDate = date;
        if (this.currentMonth != undefined && this.currentMonth != null && this.currentYear) {
            this.createMonths(this.currentMonth, this.currentYear);
        }
    }
    get maxDate() {
        return this._maxDate;
    }
    set maxDate(date) {
        this._maxDate = date;
        if (this.currentMonth != undefined && this.currentMonth != null && this.currentYear) {
            this.createMonths(this.currentMonth, this.currentYear);
        }
    }
    get disabledDates() {
        return this._disabledDates;
    }
    set disabledDates(disabledDates) {
        this._disabledDates = disabledDates;
        if (this.currentMonth != undefined && this.currentMonth != null && this.currentYear) {
            this.createMonths(this.currentMonth, this.currentYear);
        }
    }
    get disabledDays() {
        return this._disabledDays;
    }
    set disabledDays(disabledDays) {
        this._disabledDays = disabledDays;
        if (this.currentMonth != undefined && this.currentMonth != null && this.currentYear) {
            this.createMonths(this.currentMonth, this.currentYear);
        }
    }
    get yearRange() {
        return this._yearRange;
    }
    set yearRange(yearRange) {
        this._yearRange = yearRange;
        if (yearRange) {
            const years = yearRange.split(':');
            const yearStart = parseInt(years[0]);
            const yearEnd = parseInt(years[1]);
            this.populateYearOptions(yearStart, yearEnd);
        }
    }
    get showTime() {
        return this._showTime;
    }
    set showTime(showTime) {
        this._showTime = showTime;
        if (this.currentHour === undefined) {
            this.initTime(this.value || new Date());
        }
        this.updateInputfield();
    }
    get locale() {
        return this._locale;
    }
    set locale(newLocale) {
        console.warn("Locale property has no effect, use new i18n API instead.");
    }
    ngOnInit() {
        const date = this.defaultDate || new Date();
        this.currentMonth = date.getMonth();
        this.currentYear = date.getFullYear();
        if (this.view === 'date') {
            this.createWeekDays();
            this.initTime(date);
            this.createMonths(this.currentMonth, this.currentYear);
            this.ticksTo1970 = (((1970 - 1) * 365 + Math.floor(1970 / 4) - Math.floor(1970 / 100) + Math.floor(1970 / 400)) * 24 * 60 * 60 * 10000000);
        }
        else if (this.view === 'month') {
            this.createMonthPickerValues();
        }
        this.translationSubscription = this.config.translationObserver.subscribe(() => {
            this.createWeekDays();
        });
        this.initialized = true;
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'date':
                    this.dateTemplate = item.template;
                    break;
                case 'disabledDate':
                    this.disabledDateTemplate = item.template;
                    break;
                case 'header':
                    this.headerTemplate = item.template;
                    break;
                case 'footer':
                    this.footerTemplate = item.template;
                    break;
                default:
                    this.dateTemplate = item.template;
                    break;
            }
        });
    }
    getTranslation(option) {
        return this.config.getTranslation(option);
    }
    populateYearOptions(start, end) {
        this.yearOptions = [];
        for (let i = start; i <= end; i++) {
            this.yearOptions.push(i);
        }
    }
    createWeekDays() {
        this.weekDays = [];
        let dayIndex = this.firstDayOfWeek;
        let dayLabels = this.getTranslation(TranslationKeys.DAY_NAMES_MIN);
        for (let i = 0; i < 7; i++) {
            this.weekDays.push(dayLabels[dayIndex]);
            dayIndex = (dayIndex == 6) ? 0 : ++dayIndex;
        }
    }
    createMonthPickerValues() {
        this.monthPickerValues = [];
        let monthLabels = this.getTranslation(TranslationKeys.MONTH_NAMES_SHORT);
        for (let i = 0; i <= 11; i++) {
            this.monthPickerValues.push(monthLabels[i]);
        }
    }
    createMonths(month, year) {
        this.months = this.months = [];
        for (let i = 0; i < this.numberOfMonths; i++) {
            let m = month + i;
            let y = year;
            if (m > 11) {
                m = m % 11 - 1;
                y = year + 1;
            }
            this.months.push(this.createMonth(m, y));
        }
    }
    getWeekNumber(date) {
        let checkDate = new Date(date.getTime());
        checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
        let time = checkDate.getTime();
        checkDate.setMonth(0);
        checkDate.setDate(1);
        return Math.floor(Math.round((time - checkDate.getTime()) / 86400000) / 7) + 1;
    }
    createMonth(month, year) {
        let dates = [];
        let firstDay = this.getFirstDayOfMonthIndex(month, year);
        let daysLength = this.getDaysCountInMonth(month, year);
        let prevMonthDaysLength = this.getDaysCountInPrevMonth(month, year);
        let dayNo = 1;
        let today = new Date();
        let weekNumbers = [];
        let monthRows = Math.ceil((daysLength + firstDay) / 7);
        for (let i = 0; i < monthRows; i++) {
            let week = [];
            if (i == 0) {
                for (let j = (prevMonthDaysLength - firstDay + 1); j <= prevMonthDaysLength; j++) {
                    let prev = this.getPreviousMonthAndYear(month, year);
                    week.push({ day: j, month: prev.month, year: prev.year, otherMonth: true,
                        today: this.isToday(today, j, prev.month, prev.year), selectable: this.isSelectable(j, prev.month, prev.year, true) });
                }
                let remainingDaysLength = 7 - week.length;
                for (let j = 0; j < remainingDaysLength; j++) {
                    week.push({ day: dayNo, month: month, year: year, today: this.isToday(today, dayNo, month, year),
                        selectable: this.isSelectable(dayNo, month, year, false) });
                    dayNo++;
                }
            }
            else {
                for (let j = 0; j < 7; j++) {
                    if (dayNo > daysLength) {
                        let next = this.getNextMonthAndYear(month, year);
                        week.push({ day: dayNo - daysLength, month: next.month, year: next.year, otherMonth: true,
                            today: this.isToday(today, dayNo - daysLength, next.month, next.year),
                            selectable: this.isSelectable((dayNo - daysLength), next.month, next.year, true) });
                    }
                    else {
                        week.push({ day: dayNo, month: month, year: year, today: this.isToday(today, dayNo, month, year),
                            selectable: this.isSelectable(dayNo, month, year, false) });
                    }
                    dayNo++;
                }
            }
            if (this.showWeek) {
                weekNumbers.push(this.getWeekNumber(new Date(week[0].year, week[0].month, week[0].day)));
            }
            dates.push(week);
        }
        return {
            month: month,
            year: year,
            dates: dates,
            weekNumbers: weekNumbers
        };
    }
    initTime(date) {
        this.pm = date.getHours() > 11;
        if (this.showTime) {
            this.currentMinute = date.getMinutes();
            this.currentSecond = date.getSeconds();
            this.setCurrentHourPM(date.getHours());
        }
        else if (this.timeOnly) {
            this.currentMinute = 0;
            this.currentHour = 0;
            this.currentSecond = 0;
        }
    }
    navBackward(event) {
        event.stopPropagation();
        if (this.disabled) {
            event.preventDefault();
            return;
        }
        this.isMonthNavigate = true;
        if (this.view === 'month') {
            this.decrementYear();
            setTimeout(() => {
                this.updateFocus();
            }, 1);
        }
        else {
            if (this.currentMonth === 0) {
                this.currentMonth = 11;
                this.decrementYear();
            }
            else {
                this.currentMonth--;
            }
            this.onMonthChange.emit({ month: this.currentMonth + 1, year: this.currentYear });
            this.createMonths(this.currentMonth, this.currentYear);
        }
    }
    navForward(event) {
        event.stopPropagation();
        if (this.disabled) {
            event.preventDefault();
            return;
        }
        this.isMonthNavigate = true;
        if (this.view === 'month') {
            this.incrementYear();
            setTimeout(() => {
                this.updateFocus();
            }, 1);
        }
        else {
            if (this.currentMonth === 11) {
                this.currentMonth = 0;
                this.incrementYear();
            }
            else {
                this.currentMonth++;
            }
            this.onMonthChange.emit({ month: this.currentMonth + 1, year: this.currentYear });
            this.createMonths(this.currentMonth, this.currentYear);
        }
    }
    decrementYear() {
        this.currentYear--;
        if (this.yearNavigator && this.currentYear < this.yearOptions[0]) {
            let difference = this.yearOptions[this.yearOptions.length - 1] - this.yearOptions[0];
            this.populateYearOptions(this.yearOptions[0] - difference, this.yearOptions[this.yearOptions.length - 1] - difference);
        }
    }
    incrementYear() {
        this.currentYear++;
        if (this.yearNavigator && this.currentYear > this.yearOptions[this.yearOptions.length - 1]) {
            let difference = this.yearOptions[this.yearOptions.length - 1] - this.yearOptions[0];
            this.populateYearOptions(this.yearOptions[0] + difference, this.yearOptions[this.yearOptions.length - 1] + difference);
        }
    }
    onDateSelect(event, dateMeta) {
        if (this.disabled || !dateMeta.selectable) {
            event.preventDefault();
            return;
        }
        if (this.isMultipleSelection() && this.isSelected(dateMeta)) {
            this.value = this.value.filter((date, i) => {
                return !this.isDateEquals(date, dateMeta);
            });
            if (this.value.length === 0) {
                this.value = null;
            }
            this.updateModel(this.value);
        }
        else {
            if (this.shouldSelectDate(dateMeta)) {
                this.selectDate(dateMeta);
            }
        }
        if (this.isSingleSelection() && this.hideOnDateTimeSelect) {
            setTimeout(() => {
                event.preventDefault();
                this.hideOverlay();
                if (this.mask) {
                    this.disableModality();
                }
                this.cd.markForCheck();
            }, 150);
        }
        this.updateInputfield();
        event.preventDefault();
    }
    shouldSelectDate(dateMeta) {
        if (this.isMultipleSelection())
            return this.maxDateCount != null ? this.maxDateCount > (this.value ? this.value.length : 0) : true;
        else
            return true;
    }
    onMonthSelect(event, index) {
        if (!DomHandler.hasClass(event.target, 'p-disabled')) {
            this.onDateSelect(event, { year: this.currentYear, month: index, day: 1, selectable: true });
        }
    }
    updateInputfield() {
        let formattedValue = '';
        if (this.value) {
            if (this.isSingleSelection()) {
                formattedValue = this.formatDateTime(this.value);
            }
            else if (this.isMultipleSelection()) {
                for (let i = 0; i < this.value.length; i++) {
                    let dateAsString = this.formatDateTime(this.value[i]);
                    formattedValue += dateAsString;
                    if (i !== (this.value.length - 1)) {
                        formattedValue += this.multipleSeparator + ' ';
                    }
                }
            }
            else if (this.isRangeSelection()) {
                if (this.value && this.value.length) {
                    let startDate = this.value[0];
                    let endDate = this.value[1];
                    formattedValue = this.formatDateTime(startDate);
                    if (endDate) {
                        formattedValue += ' ' + this.rangeSeparator + ' ' + this.formatDateTime(endDate);
                    }
                }
            }
        }
        this.inputFieldValue = formattedValue;
        this.updateFilledState();
        if (this.inputfieldViewChild && this.inputfieldViewChild.nativeElement) {
            this.inputfieldViewChild.nativeElement.value = this.inputFieldValue;
        }
    }
    formatDateTime(date) {
        let formattedValue = null;
        if (date) {
            if (this.timeOnly) {
                formattedValue = this.formatTime(date);
            }
            else {
                formattedValue = this.formatDate(date, this.getDateFormat());
                if (this.showTime) {
                    formattedValue += ' ' + this.formatTime(date);
                }
            }
        }
        return formattedValue;
    }
    setCurrentHourPM(hours) {
        if (this.hourFormat == '12') {
            this.pm = hours > 11;
            if (hours >= 12) {
                this.currentHour = (hours == 12) ? 12 : hours - 12;
            }
            else {
                this.currentHour = (hours == 0) ? 12 : hours;
            }
        }
        else {
            this.currentHour = hours;
        }
    }
    selectDate(dateMeta) {
        let date = new Date(dateMeta.year, dateMeta.month, dateMeta.day);
        if (this.showTime) {
            if (this.hourFormat == '12') {
                if (this.currentHour === 12)
                    date.setHours(this.pm ? 12 : 0);
                else
                    date.setHours(this.pm ? this.currentHour + 12 : this.currentHour);
            }
            else {
                date.setHours(this.currentHour);
            }
            date.setMinutes(this.currentMinute);
            date.setSeconds(this.currentSecond);
        }
        if (this.minDate && this.minDate > date) {
            date = this.minDate;
            this.setCurrentHourPM(date.getHours());
            this.currentMinute = date.getMinutes();
            this.currentSecond = date.getSeconds();
        }
        if (this.maxDate && this.maxDate < date) {
            date = this.maxDate;
            this.setCurrentHourPM(date.getHours());
            this.currentMinute = date.getMinutes();
            this.currentSecond = date.getSeconds();
        }
        if (this.isSingleSelection()) {
            this.updateModel(date);
        }
        else if (this.isMultipleSelection()) {
            this.updateModel(this.value ? [...this.value, date] : [date]);
        }
        else if (this.isRangeSelection()) {
            if (this.value && this.value.length) {
                let startDate = this.value[0];
                let endDate = this.value[1];
                if (!endDate && date.getTime() >= startDate.getTime()) {
                    endDate = date;
                }
                else {
                    startDate = date;
                    endDate = null;
                }
                this.updateModel([startDate, endDate]);
            }
            else {
                this.updateModel([date, null]);
            }
        }
        this.onSelect.emit(date);
    }
    updateModel(value) {
        this.value = value;
        if (this.dataType == 'date') {
            this.onModelChange(this.value);
        }
        else if (this.dataType == 'string') {
            if (this.isSingleSelection()) {
                this.onModelChange(this.formatDateTime(this.value));
            }
            else {
                let stringArrValue = null;
                if (this.value) {
                    stringArrValue = this.value.map(date => this.formatDateTime(date));
                }
                this.onModelChange(stringArrValue);
            }
        }
    }
    getFirstDayOfMonthIndex(month, year) {
        let day = new Date();
        day.setDate(1);
        day.setMonth(month);
        day.setFullYear(year);
        let dayIndex = day.getDay() + this.getSundayIndex();
        return dayIndex >= 7 ? dayIndex - 7 : dayIndex;
    }
    getDaysCountInMonth(month, year) {
        return 32 - this.daylightSavingAdjust(new Date(year, month, 32)).getDate();
    }
    getDaysCountInPrevMonth(month, year) {
        let prev = this.getPreviousMonthAndYear(month, year);
        return this.getDaysCountInMonth(prev.month, prev.year);
    }
    getPreviousMonthAndYear(month, year) {
        let m, y;
        if (month === 0) {
            m = 11;
            y = year - 1;
        }
        else {
            m = month - 1;
            y = year;
        }
        return { 'month': m, 'year': y };
    }
    getNextMonthAndYear(month, year) {
        let m, y;
        if (month === 11) {
            m = 0;
            y = year + 1;
        }
        else {
            m = month + 1;
            y = year;
        }
        return { 'month': m, 'year': y };
    }
    getSundayIndex() {
        return this.firstDayOfWeek > 0 ? 7 - this.firstDayOfWeek : 0;
    }
    isSelected(dateMeta) {
        if (this.value) {
            if (this.isSingleSelection()) {
                return this.isDateEquals(this.value, dateMeta);
            }
            else if (this.isMultipleSelection()) {
                let selected = false;
                for (let date of this.value) {
                    selected = this.isDateEquals(date, dateMeta);
                    if (selected) {
                        break;
                    }
                }
                return selected;
            }
            else if (this.isRangeSelection()) {
                if (this.value[1])
                    return this.isDateEquals(this.value[0], dateMeta) || this.isDateEquals(this.value[1], dateMeta) || this.isDateBetween(this.value[0], this.value[1], dateMeta);
                else
                    return this.isDateEquals(this.value[0], dateMeta);
            }
        }
        else {
            return false;
        }
    }
    isMonthSelected(month) {
        let day = this.value ? (Array.isArray(this.value) ? this.value[0].getDate() : this.value.getDate()) : 1;
        return this.isSelected({ year: this.currentYear, month: month, day: day, selectable: true });
    }
    isDateEquals(value, dateMeta) {
        if (value)
            return value.getDate() === dateMeta.day && value.getMonth() === dateMeta.month && value.getFullYear() === dateMeta.year;
        else
            return false;
    }
    isDateBetween(start, end, dateMeta) {
        let between = false;
        if (start && end) {
            let date = new Date(dateMeta.year, dateMeta.month, dateMeta.day);
            return start.getTime() <= date.getTime() && end.getTime() >= date.getTime();
        }
        return between;
    }
    isSingleSelection() {
        return this.selectionMode === 'single';
    }
    isRangeSelection() {
        return this.selectionMode === 'range';
    }
    isMultipleSelection() {
        return this.selectionMode === 'multiple';
    }
    isToday(today, day, month, year) {
        return today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
    }
    isSelectable(day, month, year, otherMonth) {
        let validMin = true;
        let validMax = true;
        let validDate = true;
        let validDay = true;
        if (otherMonth && !this.selectOtherMonths) {
            return false;
        }
        if (this.minDate) {
            if (this.minDate.getFullYear() > year) {
                validMin = false;
            }
            else if (this.minDate.getFullYear() === year) {
                if (this.minDate.getMonth() > month) {
                    validMin = false;
                }
                else if (this.minDate.getMonth() === month) {
                    if (this.minDate.getDate() > day) {
                        validMin = false;
                    }
                }
            }
        }
        if (this.maxDate) {
            if (this.maxDate.getFullYear() < year) {
                validMax = false;
            }
            else if (this.maxDate.getFullYear() === year) {
                if (this.maxDate.getMonth() < month) {
                    validMax = false;
                }
                else if (this.maxDate.getMonth() === month) {
                    if (this.maxDate.getDate() < day) {
                        validMax = false;
                    }
                }
            }
        }
        if (this.disabledDates) {
            validDate = !this.isDateDisabled(day, month, year);
        }
        if (this.disabledDays) {
            validDay = !this.isDayDisabled(day, month, year);
        }
        return validMin && validMax && validDate && validDay;
    }
    isDateDisabled(day, month, year) {
        if (this.disabledDates) {
            for (let disabledDate of this.disabledDates) {
                if (disabledDate.getFullYear() === year && disabledDate.getMonth() === month && disabledDate.getDate() === day) {
                    return true;
                }
            }
        }
        return false;
    }
    isDayDisabled(day, month, year) {
        if (this.disabledDays) {
            let weekday = new Date(year, month, day);
            let weekdayNumber = weekday.getDay();
            return this.disabledDays.indexOf(weekdayNumber) !== -1;
        }
        return false;
    }
    onInputFocus(event) {
        this.focus = true;
        if (this.showOnFocus) {
            this.showOverlay();
        }
        this.onFocus.emit(event);
    }
    onInputClick() {
        if (this.showOnFocus && !this.overlayVisible) {
            this.showOverlay();
        }
    }
    onInputBlur(event) {
        this.focus = false;
        this.onBlur.emit(event);
        if (!this.keepInvalid) {
            this.updateInputfield();
        }
        this.onModelTouched();
    }
    onButtonClick(event, inputfield) {
        if (!this.overlayVisible) {
            inputfield.focus();
            this.showOverlay();
        }
        else {
            this.hideOverlay();
        }
    }
    onOverlayClick(event) {
        this.overlayService.add({
            originalEvent: event,
            target: this.el.nativeElement
        });
    }
    onPrevButtonClick(event) {
        this.navigationState = { backward: true, button: true };
        this.navBackward(event);
    }
    onNextButtonClick(event) {
        this.navigationState = { backward: false, button: true };
        this.navForward(event);
    }
    onContainerButtonKeydown(event) {
        switch (event.which) {
            //tab
            case 9:
                if (!this.inline) {
                    this.trapFocus(event);
                }
                break;
            //escape
            case 27:
                this.overlayVisible = false;
                event.preventDefault();
                break;
            default:
                //Noop
                break;
        }
    }
    onInputKeydown(event) {
        this.isKeydown = true;
        if (event.keyCode === 40 && this.contentViewChild) {
            this.trapFocus(event);
        }
        else if (event.keyCode === 27) {
            if (this.overlayVisible) {
                this.overlayVisible = false;
                event.preventDefault();
            }
        }
        else if (event.keyCode === 13) {
            if (this.overlayVisible) {
                this.overlayVisible = false;
                event.preventDefault();
            }
        }
        else if (event.keyCode === 9 && this.contentViewChild) {
            DomHandler.getFocusableElements(this.contentViewChild.nativeElement).forEach(el => el.tabIndex = '-1');
            if (this.overlayVisible) {
                this.overlayVisible = false;
            }
        }
    }
    onDateCellKeydown(event, date, groupIndex) {
        const cellContent = event.currentTarget;
        const cell = cellContent.parentElement;
        switch (event.which) {
            //down arrow
            case 40: {
                cellContent.tabIndex = '-1';
                let cellIndex = DomHandler.index(cell);
                let nextRow = cell.parentElement.nextElementSibling;
                if (nextRow) {
                    let focusCell = nextRow.children[cellIndex].children[0];
                    if (DomHandler.hasClass(focusCell, 'p-disabled')) {
                        this.navigationState = { backward: false };
                        this.navForward(event);
                    }
                    else {
                        nextRow.children[cellIndex].children[0].tabIndex = '0';
                        nextRow.children[cellIndex].children[0].focus();
                    }
                }
                else {
                    this.navigationState = { backward: false };
                    this.navForward(event);
                }
                event.preventDefault();
                break;
            }
            //up arrow
            case 38: {
                cellContent.tabIndex = '-1';
                let cellIndex = DomHandler.index(cell);
                let prevRow = cell.parentElement.previousElementSibling;
                if (prevRow) {
                    let focusCell = prevRow.children[cellIndex].children[0];
                    if (DomHandler.hasClass(focusCell, 'p-disabled')) {
                        this.navigationState = { backward: true };
                        this.navBackward(event);
                    }
                    else {
                        focusCell.tabIndex = '0';
                        focusCell.focus();
                    }
                }
                else {
                    this.navigationState = { backward: true };
                    this.navBackward(event);
                }
                event.preventDefault();
                break;
            }
            //left arrow
            case 37: {
                cellContent.tabIndex = '-1';
                let prevCell = cell.previousElementSibling;
                if (prevCell) {
                    let focusCell = prevCell.children[0];
                    if (DomHandler.hasClass(focusCell, 'p-disabled') || DomHandler.hasClass(focusCell.parentElement, 'p-datepicker-weeknumber')) {
                        this.navigateToMonth(true, groupIndex);
                    }
                    else {
                        focusCell.tabIndex = '0';
                        focusCell.focus();
                    }
                }
                else {
                    this.navigateToMonth(true, groupIndex);
                }
                event.preventDefault();
                break;
            }
            //right arrow
            case 39: {
                cellContent.tabIndex = '-1';
                let nextCell = cell.nextElementSibling;
                if (nextCell) {
                    let focusCell = nextCell.children[0];
                    if (DomHandler.hasClass(focusCell, 'p-disabled')) {
                        this.navigateToMonth(false, groupIndex);
                    }
                    else {
                        focusCell.tabIndex = '0';
                        focusCell.focus();
                    }
                }
                else {
                    this.navigateToMonth(false, groupIndex);
                }
                event.preventDefault();
                break;
            }
            //enter
            case 13: {
                this.onDateSelect(event, date);
                event.preventDefault();
                break;
            }
            //escape
            case 27: {
                this.overlayVisible = false;
                event.preventDefault();
                break;
            }
            //tab
            case 9: {
                if (!this.inline) {
                    this.trapFocus(event);
                }
                break;
            }
            default:
                //no op
                break;
        }
    }
    onMonthCellKeydown(event, index) {
        const cell = event.currentTarget;
        switch (event.which) {
            //arrows
            case 38:
            case 40: {
                cell.tabIndex = '-1';
                var cells = cell.parentElement.children;
                var cellIndex = DomHandler.index(cell);
                let nextCell = cells[event.which === 40 ? cellIndex + 3 : cellIndex - 3];
                if (nextCell) {
                    nextCell.tabIndex = '0';
                    nextCell.focus();
                }
                event.preventDefault();
                break;
            }
            //left arrow
            case 37: {
                cell.tabIndex = '-1';
                let prevCell = cell.previousElementSibling;
                if (prevCell) {
                    prevCell.tabIndex = '0';
                    prevCell.focus();
                }
                event.preventDefault();
                break;
            }
            //right arrow
            case 39: {
                cell.tabIndex = '-1';
                let nextCell = cell.nextElementSibling;
                if (nextCell) {
                    nextCell.tabIndex = '0';
                    nextCell.focus();
                }
                event.preventDefault();
                break;
            }
            //enter
            case 13: {
                this.onMonthSelect(event, index);
                event.preventDefault();
                break;
            }
            //escape
            case 27: {
                this.overlayVisible = false;
                event.preventDefault();
                break;
            }
            //tab
            case 9: {
                if (!this.inline) {
                    this.trapFocus(event);
                }
                break;
            }
            default:
                //no op
                break;
        }
    }
    navigateToMonth(prev, groupIndex) {
        if (prev) {
            if (this.numberOfMonths === 1 || (groupIndex === 0)) {
                this.navigationState = { backward: true };
                this.navBackward(event);
            }
            else {
                let prevMonthContainer = this.contentViewChild.nativeElement.children[groupIndex - 1];
                let cells = DomHandler.find(prevMonthContainer, '.p-datepicker-calendar td span:not(.p-disabled):not(.p-ink)');
                let focusCell = cells[cells.length - 1];
                focusCell.tabIndex = '0';
                focusCell.focus();
            }
        }
        else {
            if (this.numberOfMonths === 1 || (groupIndex === this.numberOfMonths - 1)) {
                this.navigationState = { backward: false };
                this.navForward(event);
            }
            else {
                let nextMonthContainer = this.contentViewChild.nativeElement.children[groupIndex + 1];
                let focusCell = DomHandler.findSingle(nextMonthContainer, '.p-datepicker-calendar td span:not(.p-disabled):not(.p-ink)');
                focusCell.tabIndex = '0';
                focusCell.focus();
            }
        }
    }
    updateFocus() {
        let cell;
        if (this.navigationState) {
            if (this.navigationState.button) {
                this.initFocusableCell();
                if (this.navigationState.backward)
                    DomHandler.findSingle(this.contentViewChild.nativeElement, '.p-datepicker-prev').focus();
                else
                    DomHandler.findSingle(this.contentViewChild.nativeElement, '.p-datepicker-next').focus();
            }
            else {
                if (this.navigationState.backward) {
                    let cells = DomHandler.find(this.contentViewChild.nativeElement, '.p-datepicker-calendar td span:not(.p-disabled):not(.p-ink)');
                    cell = cells[cells.length - 1];
                }
                else {
                    cell = DomHandler.findSingle(this.contentViewChild.nativeElement, '.p-datepicker-calendar td span:not(.p-disabled):not(.p-ink)');
                }
                if (cell) {
                    cell.tabIndex = '0';
                    cell.focus();
                }
            }
            this.navigationState = null;
        }
        else {
            this.initFocusableCell();
        }
    }
    initFocusableCell() {
        let cell;
        if (this.view === 'month') {
            let cells = DomHandler.find(this.contentViewChild.nativeElement, '.p-monthpicker .p-monthpicker-month:not(.p-disabled)');
            let selectedCell = DomHandler.findSingle(this.contentViewChild.nativeElement, '.p-monthpicker .p-monthpicker-month.p-highlight');
            cells.forEach(cell => cell.tabIndex = -1);
            cell = selectedCell || cells[0];
            if (cells.length === 0) {
                let disabledCells = DomHandler.find(this.contentViewChild.nativeElement, '.p-monthpicker .p-monthpicker-month.p-disabled[tabindex = "0"]');
                disabledCells.forEach(cell => cell.tabIndex = -1);
            }
        }
        else {
            cell = DomHandler.findSingle(this.contentViewChild.nativeElement, 'span.p-highlight');
            if (!cell) {
                let todayCell = DomHandler.findSingle(this.contentViewChild.nativeElement, 'td.p-datepicker-today span:not(.p-disabled):not(.p-ink)');
                if (todayCell)
                    cell = todayCell;
                else
                    cell = DomHandler.findSingle(this.contentViewChild.nativeElement, '.p-datepicker-calendar td span:not(.p-disabled):not(.p-ink)');
            }
        }
        if (cell) {
            cell.tabIndex = '0';
        }
    }
    trapFocus(event) {
        let focusableElements = DomHandler.getFocusableElements(this.contentViewChild.nativeElement);
        if (focusableElements && focusableElements.length > 0) {
            if (!focusableElements[0].ownerDocument.activeElement) {
                focusableElements[0].focus();
            }
            else {
                let focusedIndex = focusableElements.indexOf(focusableElements[0].ownerDocument.activeElement);
                if (event.shiftKey) {
                    if (focusedIndex == -1 || focusedIndex === 0) {
                        if (this.focusTrap) {
                            focusableElements[focusableElements.length - 1].focus();
                        }
                        else {
                            if (focusedIndex === -1)
                                return this.hideOverlay();
                            else if (focusedIndex === 0)
                                return;
                        }
                    }
                    else {
                        focusableElements[focusedIndex - 1].focus();
                    }
                }
                else {
                    if (focusedIndex == -1 || focusedIndex === (focusableElements.length - 1)) {
                        if (!this.focusTrap && focusedIndex != -1)
                            return this.hideOverlay();
                        else
                            focusableElements[0].focus();
                    }
                    else {
                        focusableElements[focusedIndex + 1].focus();
                    }
                }
            }
        }
        event.preventDefault();
    }
    onMonthDropdownChange(m) {
        this.currentMonth = parseInt(m);
        this.onMonthChange.emit({ month: this.currentMonth + 1, year: this.currentYear });
        this.createMonths(this.currentMonth, this.currentYear);
    }
    onYearDropdownChange(y) {
        this.currentYear = parseInt(y);
        this.onYearChange.emit({ month: this.currentMonth + 1, year: this.currentYear });
        this.createMonths(this.currentMonth, this.currentYear);
    }
    validateTime(hour, minute, second, pm) {
        let value = this.value;
        const convertedHour = this.convertTo24Hour(hour, pm);
        if (this.isRangeSelection()) {
            value = this.value[1] || this.value[0];
        }
        if (this.isMultipleSelection()) {
            value = this.value[this.value.length - 1];
        }
        const valueDateString = value ? value.toDateString() : null;
        if (this.minDate && valueDateString && this.minDate.toDateString() === valueDateString) {
            if (this.minDate.getHours() > convertedHour) {
                return false;
            }
            if (this.minDate.getHours() === convertedHour) {
                if (this.minDate.getMinutes() > minute) {
                    return false;
                }
                if (this.minDate.getMinutes() === minute) {
                    if (this.minDate.getSeconds() > second) {
                        return false;
                    }
                }
            }
        }
        if (this.maxDate && valueDateString && this.maxDate.toDateString() === valueDateString) {
            if (this.maxDate.getHours() < convertedHour) {
                return false;
            }
            if (this.maxDate.getHours() === convertedHour) {
                if (this.maxDate.getMinutes() < minute) {
                    return false;
                }
                if (this.maxDate.getMinutes() === minute) {
                    if (this.maxDate.getSeconds() < second) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
    incrementHour(event) {
        const prevHour = this.currentHour;
        let newHour = this.currentHour + this.stepHour;
        let newPM = this.pm;
        if (this.hourFormat == '24')
            newHour = (newHour >= 24) ? (newHour - 24) : newHour;
        else if (this.hourFormat == '12') {
            // Before the AM/PM break, now after
            if (prevHour < 12 && newHour > 11) {
                newPM = !this.pm;
            }
            newHour = (newHour >= 13) ? (newHour - 12) : newHour;
        }
        if (this.validateTime(newHour, this.currentMinute, this.currentSecond, newPM)) {
            this.currentHour = newHour;
            this.pm = newPM;
        }
        event.preventDefault();
    }
    onTimePickerElementMouseDown(event, type, direction) {
        if (!this.disabled) {
            this.repeat(event, null, type, direction);
            event.preventDefault();
        }
    }
    onTimePickerElementMouseUp(event) {
        if (!this.disabled) {
            this.clearTimePickerTimer();
            this.updateTime();
        }
    }
    onTimePickerElementMouseLeave() {
        if (!this.disabled && this.timePickerTimer) {
            this.clearTimePickerTimer();
            this.updateTime();
        }
    }
    repeat(event, interval, type, direction) {
        let i = interval || 500;
        this.clearTimePickerTimer();
        this.timePickerTimer = setTimeout(() => {
            this.repeat(event, 100, type, direction);
            this.cd.markForCheck();
        }, i);
        switch (type) {
            case 0:
                if (direction === 1)
                    this.incrementHour(event);
                else
                    this.decrementHour(event);
                break;
            case 1:
                if (direction === 1)
                    this.incrementMinute(event);
                else
                    this.decrementMinute(event);
                break;
            case 2:
                if (direction === 1)
                    this.incrementSecond(event);
                else
                    this.decrementSecond(event);
                break;
        }
        this.updateInputfield();
    }
    clearTimePickerTimer() {
        if (this.timePickerTimer) {
            clearTimeout(this.timePickerTimer);
            this.timePickerTimer = null;
        }
    }
    decrementHour(event) {
        let newHour = this.currentHour - this.stepHour;
        let newPM = this.pm;
        if (this.hourFormat == '24')
            newHour = (newHour < 0) ? (24 + newHour) : newHour;
        else if (this.hourFormat == '12') {
            // If we were at noon/midnight, then switch
            if (this.currentHour === 12) {
                newPM = !this.pm;
            }
            newHour = (newHour <= 0) ? (12 + newHour) : newHour;
        }
        if (this.validateTime(newHour, this.currentMinute, this.currentSecond, newPM)) {
            this.currentHour = newHour;
            this.pm = newPM;
        }
        event.preventDefault();
    }
    incrementMinute(event) {
        let newMinute = this.currentMinute + this.stepMinute;
        newMinute = (newMinute > 59) ? newMinute - 60 : newMinute;
        if (this.validateTime(this.currentHour, newMinute, this.currentSecond, this.pm)) {
            this.currentMinute = newMinute;
        }
        event.preventDefault();
    }
    decrementMinute(event) {
        let newMinute = this.currentMinute - this.stepMinute;
        newMinute = (newMinute < 0) ? 60 + newMinute : newMinute;
        if (this.validateTime(this.currentHour, newMinute, this.currentSecond, this.pm)) {
            this.currentMinute = newMinute;
        }
        event.preventDefault();
    }
    incrementSecond(event) {
        let newSecond = this.currentSecond + this.stepSecond;
        newSecond = (newSecond > 59) ? newSecond - 60 : newSecond;
        if (this.validateTime(this.currentHour, this.currentMinute, newSecond, this.pm)) {
            this.currentSecond = newSecond;
        }
        event.preventDefault();
    }
    decrementSecond(event) {
        let newSecond = this.currentSecond - this.stepSecond;
        newSecond = (newSecond < 0) ? 60 + newSecond : newSecond;
        if (this.validateTime(this.currentHour, this.currentMinute, newSecond, this.pm)) {
            this.currentSecond = newSecond;
        }
        event.preventDefault();
    }
    updateTime() {
        let value = this.value;
        if (this.isRangeSelection()) {
            value = this.value[1] || this.value[0];
        }
        if (this.isMultipleSelection()) {
            value = this.value[this.value.length - 1];
        }
        value = value ? new Date(value.getTime()) : new Date();
        if (this.hourFormat == '12') {
            if (this.currentHour === 12)
                value.setHours(this.pm ? 12 : 0);
            else
                value.setHours(this.pm ? this.currentHour + 12 : this.currentHour);
        }
        else {
            value.setHours(this.currentHour);
        }
        value.setMinutes(this.currentMinute);
        value.setSeconds(this.currentSecond);
        if (this.isRangeSelection()) {
            if (this.value[1])
                value = [this.value[0], value];
            else
                value = [value, null];
        }
        if (this.isMultipleSelection()) {
            value = [...this.value.slice(0, -1), value];
        }
        this.updateModel(value);
        this.onSelect.emit(value);
        this.updateInputfield();
    }
    toggleAMPM(event) {
        const newPM = !this.pm;
        if (this.validateTime(this.currentHour, this.currentMinute, this.currentSecond, newPM)) {
            this.pm = newPM;
            this.updateTime();
        }
        event.preventDefault();
    }
    onUserInput(event) {
        // IE 11 Workaround for input placeholder : https://github.com/primefaces/primeng/issues/2026
        if (!this.isKeydown) {
            return;
        }
        this.isKeydown = false;
        let val = event.target.value;
        try {
            let value = this.parseValueFromString(val);
            if (this.isValidSelection(value)) {
                this.updateModel(value);
                this.updateUI();
            }
        }
        catch (err) {
            //invalid date
            this.updateModel(null);
        }
        this.filled = val != null && val.length;
        this.onInput.emit(event);
    }
    isValidSelection(value) {
        let isValid = true;
        if (this.isSingleSelection()) {
            if (!this.isSelectable(value.getDate(), value.getMonth(), value.getFullYear(), false)) {
                isValid = false;
            }
        }
        else if (value.every(v => this.isSelectable(v.getDate(), v.getMonth(), v.getFullYear(), false))) {
            if (this.isRangeSelection()) {
                isValid = value.length > 1 && value[1] > value[0] ? true : false;
            }
        }
        return isValid;
    }
    parseValueFromString(text) {
        if (!text || text.trim().length === 0) {
            return null;
        }
        let value;
        if (this.isSingleSelection()) {
            value = this.parseDateTime(text);
        }
        else if (this.isMultipleSelection()) {
            let tokens = text.split(this.multipleSeparator);
            value = [];
            for (let token of tokens) {
                value.push(this.parseDateTime(token.trim()));
            }
        }
        else if (this.isRangeSelection()) {
            let tokens = text.split(' ' + this.rangeSeparator + ' ');
            value = [];
            for (let i = 0; i < tokens.length; i++) {
                value[i] = this.parseDateTime(tokens[i].trim());
            }
        }
        return value;
    }
    parseDateTime(text) {
        let date;
        let parts = text.split(' ');
        if (this.timeOnly) {
            date = new Date();
            this.populateTime(date, parts[0], parts[1]);
        }
        else {
            const dateFormat = this.getDateFormat();
            if (this.showTime) {
                let ampm = this.hourFormat == '12' ? parts.pop() : null;
                let timeString = parts.pop();
                date = this.parseDate(parts.join(' '), dateFormat);
                this.populateTime(date, timeString, ampm);
            }
            else {
                date = this.parseDate(text, dateFormat);
            }
        }
        return date;
    }
    populateTime(value, timeString, ampm) {
        if (this.hourFormat == '12' && !ampm) {
            throw 'Invalid Time';
        }
        this.pm = (ampm === 'PM' || ampm === 'pm');
        let time = this.parseTime(timeString);
        value.setHours(time.hour);
        value.setMinutes(time.minute);
        value.setSeconds(time.second);
    }
    updateUI() {
        let val = this.value || this.defaultDate || new Date();
        if (Array.isArray(val)) {
            val = val[0];
        }
        this.currentMonth = val.getMonth();
        this.currentYear = val.getFullYear();
        this.createMonths(this.currentMonth, this.currentYear);
        if (this.showTime || this.timeOnly) {
            this.setCurrentHourPM(val.getHours());
            this.currentMinute = val.getMinutes();
            this.currentSecond = val.getSeconds();
        }
    }
    showOverlay() {
        if (!this.overlayVisible) {
            this.updateUI();
            this.overlayVisible = true;
        }
    }
    hideOverlay() {
        this.overlayVisible = false;
        this.clearTimePickerTimer();
        if (this.touchUI) {
            this.disableModality();
        }
        this.cd.markForCheck();
    }
    toggle() {
        if (!this.inline) {
            if (!this.overlayVisible) {
                this.showOverlay();
                this.inputfieldViewChild.nativeElement.focus();
            }
            else {
                this.hideOverlay();
            }
        }
    }
    onOverlayAnimationStart(event) {
        switch (event.toState) {
            case 'visible':
            case 'visibleTouchUI':
                if (!this.inline) {
                    this.overlay = event.element;
                    this.appendOverlay();
                    if (this.autoZIndex) {
                        if (this.touchUI)
                            ZIndexUtils.set('modal', this.overlay, this.baseZIndex || this.config.zIndex.modal);
                        else
                            ZIndexUtils.set('overlay', this.overlay, this.baseZIndex || this.config.zIndex.overlay);
                    }
                    this.alignOverlay();
                    this.onShow.emit(event);
                }
                break;
            case 'void':
                this.onOverlayHide();
                this.onClose.emit(event);
                break;
        }
    }
    onOverlayAnimationDone(event) {
        switch (event.toState) {
            case 'visible':
            case 'visibleTouchUI':
                if (!this.inline) {
                    this.bindDocumentClickListener();
                    this.bindDocumentResizeListener();
                    this.bindScrollListener();
                }
                break;
            case 'void':
                if (this.autoZIndex) {
                    ZIndexUtils.clear(event.element);
                }
                break;
        }
    }
    appendOverlay() {
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.overlay);
            else
                DomHandler.appendChild(this.overlay, this.appendTo);
        }
    }
    restoreOverlayAppend() {
        if (this.overlay && this.appendTo) {
            this.el.nativeElement.appendChild(this.overlay);
        }
    }
    alignOverlay() {
        if (this.touchUI) {
            this.enableModality(this.overlay);
        }
        else {
            if (this.appendTo)
                DomHandler.absolutePosition(this.overlay, this.inputfieldViewChild.nativeElement);
            else
                DomHandler.relativePosition(this.overlay, this.inputfieldViewChild.nativeElement);
        }
    }
    enableModality(element) {
        if (!this.mask) {
            this.mask = document.createElement('div');
            this.mask.style.zIndex = String(parseInt(element.style.zIndex) - 1);
            let maskStyleClass = 'p-component-overlay p-datepicker-mask p-datepicker-mask-scrollblocker';
            DomHandler.addMultipleClasses(this.mask, maskStyleClass);
            this.maskClickListener = this.renderer.listen(this.mask, 'click', (event) => {
                this.disableModality();
            });
            document.body.appendChild(this.mask);
            DomHandler.addClass(document.body, 'p-overflow-hidden');
        }
    }
    disableModality() {
        if (this.mask) {
            document.body.removeChild(this.mask);
            let bodyChildren = document.body.children;
            let hasBlockerMasks;
            for (let i = 0; i < bodyChildren.length; i++) {
                let bodyChild = bodyChildren[i];
                if (DomHandler.hasClass(bodyChild, 'p-datepicker-mask-scrollblocker')) {
                    hasBlockerMasks = true;
                    break;
                }
            }
            if (!hasBlockerMasks) {
                DomHandler.removeClass(document.body, 'p-overflow-hidden');
            }
            this.unbindMaskClickListener();
            this.mask = null;
        }
    }
    unbindMaskClickListener() {
        if (this.maskClickListener) {
            this.maskClickListener();
            this.maskClickListener = null;
        }
    }
    writeValue(value) {
        this.value = value;
        if (this.value && typeof this.value === 'string') {
            this.value = this.parseValueFromString(this.value);
        }
        this.updateInputfield();
        this.updateUI();
        this.cd.markForCheck();
    }
    registerOnChange(fn) {
        this.onModelChange = fn;
    }
    registerOnTouched(fn) {
        this.onModelTouched = fn;
    }
    setDisabledState(val) {
        this.disabled = val;
        this.cd.markForCheck();
    }
    getDateFormat() {
        return this.dateFormat || this.getTranslation('dateFormat');
    }
    // Ported from jquery-ui datepicker formatDate
    formatDate(date, format) {
        if (!date) {
            return '';
        }
        let iFormat;
        const lookAhead = (match) => {
            const matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) === match);
            if (matches) {
                iFormat++;
            }
            return matches;
        }, formatNumber = (match, value, len) => {
            let num = '' + value;
            if (lookAhead(match)) {
                while (num.length < len) {
                    num = '0' + num;
                }
            }
            return num;
        }, formatName = (match, value, shortNames, longNames) => {
            return (lookAhead(match) ? longNames[value] : shortNames[value]);
        };
        let output = '';
        let literal = false;
        if (date) {
            for (iFormat = 0; iFormat < format.length; iFormat++) {
                if (literal) {
                    if (format.charAt(iFormat) === '\'' && !lookAhead('\'')) {
                        literal = false;
                    }
                    else {
                        output += format.charAt(iFormat);
                    }
                }
                else {
                    switch (format.charAt(iFormat)) {
                        case 'd':
                            output += formatNumber('d', date.getDate(), 2);
                            break;
                        case 'D':
                            output += formatName('D', date.getDay(), this.getTranslation(TranslationKeys.DAY_NAMES_SHORT), this.getTranslation(TranslationKeys.DAY_NAMES));
                            break;
                        case 'o':
                            output += formatNumber('o', Math.round((new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() -
                                new Date(date.getFullYear(), 0, 0).getTime()) / 86400000), 3);
                            break;
                        case 'm':
                            output += formatNumber('m', date.getMonth() + 1, 2);
                            break;
                        case 'M':
                            output += formatName('M', date.getMonth(), this.getTranslation(TranslationKeys.MONTH_NAMES_SHORT), this.getTranslation(TranslationKeys.MONTH_NAMES));
                            break;
                        case 'y':
                            output += lookAhead('y') ? date.getFullYear() : (date.getFullYear() % 100 < 10 ? '0' : '') + (date.getFullYear() % 100);
                            break;
                        case '@':
                            output += date.getTime();
                            break;
                        case '!':
                            output += date.getTime() * 10000 + this.ticksTo1970;
                            break;
                        case '\'':
                            if (lookAhead('\'')) {
                                output += '\'';
                            }
                            else {
                                literal = true;
                            }
                            break;
                        default:
                            output += format.charAt(iFormat);
                    }
                }
            }
        }
        return output;
    }
    formatTime(date) {
        if (!date) {
            return '';
        }
        let output = '';
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        if (this.hourFormat == '12' && hours > 11 && hours != 12) {
            hours -= 12;
        }
        if (this.hourFormat == '12') {
            output += hours === 0 ? 12 : (hours < 10) ? '0' + hours : hours;
        }
        else {
            output += (hours < 10) ? '0' + hours : hours;
        }
        output += ':';
        output += (minutes < 10) ? '0' + minutes : minutes;
        if (this.showSeconds) {
            output += ':';
            output += (seconds < 10) ? '0' + seconds : seconds;
        }
        if (this.hourFormat == '12') {
            output += date.getHours() > 11 ? ' PM' : ' AM';
        }
        return output;
    }
    parseTime(value) {
        let tokens = value.split(':');
        let validTokenLength = this.showSeconds ? 3 : 2;
        if (tokens.length !== validTokenLength) {
            throw "Invalid time";
        }
        let h = parseInt(tokens[0]);
        let m = parseInt(tokens[1]);
        let s = this.showSeconds ? parseInt(tokens[2]) : null;
        if (isNaN(h) || isNaN(m) || h > 23 || m > 59 || (this.hourFormat == '12' && h > 12) || (this.showSeconds && (isNaN(s) || s > 59))) {
            throw "Invalid time";
        }
        else {
            if (this.hourFormat == '12') {
                if (h !== 12 && this.pm) {
                    h += 12;
                }
                else if (!this.pm && h === 12) {
                    h -= 12;
                }
            }
            return { hour: h, minute: m, second: s };
        }
    }
    // Ported from jquery-ui datepicker parseDate
    parseDate(value, format) {
        if (format == null || value == null) {
            throw "Invalid arguments";
        }
        value = (typeof value === "object" ? value.toString() : value + "");
        if (value === "") {
            return null;
        }
        let iFormat, dim, extra, iValue = 0, shortYearCutoff = (typeof this.shortYearCutoff !== "string" ? this.shortYearCutoff : new Date().getFullYear() % 100 + parseInt(this.shortYearCutoff, 10)), year = -1, month = -1, day = -1, doy = -1, literal = false, date, lookAhead = (match) => {
            let matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) === match);
            if (matches) {
                iFormat++;
            }
            return matches;
        }, getNumber = (match) => {
            let isDoubled = lookAhead(match), size = (match === "@" ? 14 : (match === "!" ? 20 :
                (match === "y" && isDoubled ? 4 : (match === "o" ? 3 : 2)))), minSize = (match === "y" ? size : 1), digits = new RegExp("^\\d{" + minSize + "," + size + "}"), num = value.substring(iValue).match(digits);
            if (!num) {
                throw "Missing number at position " + iValue;
            }
            iValue += num[0].length;
            return parseInt(num[0], 10);
        }, getName = (match, shortNames, longNames) => {
            let index = -1;
            let arr = lookAhead(match) ? longNames : shortNames;
            let names = [];
            for (let i = 0; i < arr.length; i++) {
                names.push([i, arr[i]]);
            }
            names.sort((a, b) => {
                return -(a[1].length - b[1].length);
            });
            for (let i = 0; i < names.length; i++) {
                let name = names[i][1];
                if (value.substr(iValue, name.length).toLowerCase() === name.toLowerCase()) {
                    index = names[i][0];
                    iValue += name.length;
                    break;
                }
            }
            if (index !== -1) {
                return index + 1;
            }
            else {
                throw "Unknown name at position " + iValue;
            }
        }, checkLiteral = () => {
            if (value.charAt(iValue) !== format.charAt(iFormat)) {
                throw "Unexpected literal at position " + iValue;
            }
            iValue++;
        };
        if (this.view === 'month') {
            day = 1;
        }
        for (iFormat = 0; iFormat < format.length; iFormat++) {
            if (literal) {
                if (format.charAt(iFormat) === "'" && !lookAhead("'")) {
                    literal = false;
                }
                else {
                    checkLiteral();
                }
            }
            else {
                switch (format.charAt(iFormat)) {
                    case "d":
                        day = getNumber("d");
                        break;
                    case "D":
                        getName("D", this.getTranslation(TranslationKeys.DAY_NAMES_SHORT), this.getTranslation(TranslationKeys.DAY_NAMES));
                        break;
                    case "o":
                        doy = getNumber("o");
                        break;
                    case "m":
                        month = getNumber("m");
                        break;
                    case "M":
                        month = getName("M", this.getTranslation(TranslationKeys.MONTH_NAMES_SHORT), this.getTranslation(TranslationKeys.MONTH_NAMES));
                        break;
                    case "y":
                        year = getNumber("y");
                        break;
                    case "@":
                        date = new Date(getNumber("@"));
                        year = date.getFullYear();
                        month = date.getMonth() + 1;
                        day = date.getDate();
                        break;
                    case "!":
                        date = new Date((getNumber("!") - this.ticksTo1970) / 10000);
                        year = date.getFullYear();
                        month = date.getMonth() + 1;
                        day = date.getDate();
                        break;
                    case "'":
                        if (lookAhead("'")) {
                            checkLiteral();
                        }
                        else {
                            literal = true;
                        }
                        break;
                    default:
                        checkLiteral();
                }
            }
        }
        if (iValue < value.length) {
            extra = value.substr(iValue);
            if (!/^\s+/.test(extra)) {
                throw "Extra/unparsed characters found in date: " + extra;
            }
        }
        if (year === -1) {
            year = new Date().getFullYear();
        }
        else if (year < 100) {
            year += new Date().getFullYear() - new Date().getFullYear() % 100 +
                (year <= shortYearCutoff ? 0 : -100);
        }
        if (doy > -1) {
            month = 1;
            day = doy;
            do {
                dim = this.getDaysCountInMonth(year, month - 1);
                if (day <= dim) {
                    break;
                }
                month++;
                day -= dim;
            } while (true);
        }
        date = this.daylightSavingAdjust(new Date(year, month - 1, day));
        if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
            throw "Invalid date"; // E.g. 31/02/00
        }
        return date;
    }
    daylightSavingAdjust(date) {
        if (!date) {
            return null;
        }
        date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
        return date;
    }
    updateFilledState() {
        this.filled = this.inputFieldValue && this.inputFieldValue != '';
    }
    onTodayButtonClick(event) {
        let date = new Date();
        let dateMeta = { day: date.getDate(), month: date.getMonth(), year: date.getFullYear(), otherMonth: date.getMonth() !== this.currentMonth || date.getFullYear() !== this.currentYear, today: true, selectable: true };
        this.onDateSelect(event, dateMeta);
        this.onTodayClick.emit(event);
    }
    onClearButtonClick(event) {
        this.updateModel(null);
        this.updateInputfield();
        this.hideOverlay();
        this.onClearClick.emit(event);
    }
    bindDocumentClickListener() {
        if (!this.documentClickListener) {
            this.zone.runOutsideAngular(() => {
                const documentTarget = this.el ? this.el.nativeElement.ownerDocument : 'document';
                this.documentClickListener = this.renderer.listen(documentTarget, 'click', (event) => {
                    if (this.isOutsideClicked(event) && this.overlayVisible) {
                        this.zone.run(() => {
                            this.hideOverlay();
                            this.onClickOutside.emit(event);
                            this.cd.markForCheck();
                        });
                    }
                });
            });
        }
    }
    unbindDocumentClickListener() {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    }
    bindDocumentResizeListener() {
        if (!this.documentResizeListener && !this.touchUI) {
            this.documentResizeListener = this.onWindowResize.bind(this);
            window.addEventListener('resize', this.documentResizeListener);
        }
    }
    unbindDocumentResizeListener() {
        if (this.documentResizeListener) {
            window.removeEventListener('resize', this.documentResizeListener);
            this.documentResizeListener = null;
        }
    }
    bindScrollListener() {
        if (!this.scrollHandler) {
            this.scrollHandler = new ConnectedOverlayScrollHandler(this.containerViewChild.nativeElement, () => {
                if (this.overlayVisible) {
                    this.hideOverlay();
                }
            });
        }
        this.scrollHandler.bindScrollListener();
    }
    unbindScrollListener() {
        if (this.scrollHandler) {
            this.scrollHandler.unbindScrollListener();
        }
    }
    isOutsideClicked(event) {
        return !(this.el.nativeElement.isSameNode(event.target) || this.isNavIconClicked(event) ||
            this.el.nativeElement.contains(event.target) || (this.overlay && this.overlay.contains(event.target)));
    }
    isNavIconClicked(event) {
        return (DomHandler.hasClass(event.target, 'p-datepicker-prev') || DomHandler.hasClass(event.target, 'p-datepicker-prev-icon')
            || DomHandler.hasClass(event.target, 'p-datepicker-next') || DomHandler.hasClass(event.target, 'p-datepicker-next-icon'));
    }
    onWindowResize() {
        if (this.overlayVisible && !DomHandler.isAndroid()) {
            this.hideOverlay();
        }
    }
    onOverlayHide() {
        this.unbindDocumentClickListener();
        this.unbindMaskClickListener();
        this.unbindDocumentResizeListener();
        this.unbindScrollListener();
        this.overlay = null;
        this.disableModality();
    }
    ngOnDestroy() {
        if (this.scrollHandler) {
            this.scrollHandler.destroy();
            this.scrollHandler = null;
        }
        if (this.translationSubscription) {
            this.translationSubscription.unsubscribe();
        }
        if (this.overlay && this.autoZIndex) {
            ZIndexUtils.clear(this.overlay);
        }
        this.clearTimePickerTimer();
        this.restoreOverlayAppend();
        this.onOverlayHide();
    }
}
Calendar.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: Calendar, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ChangeDetectorRef }, { token: i0.NgZone }, { token: i1.PrimeNGConfig }, { token: i1.OverlayService }], target: i0.ɵɵFactoryTarget.Component });
Calendar.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: Calendar, selector: "p-calendar", inputs: { style: "style", styleClass: "styleClass", inputStyle: "inputStyle", inputId: "inputId", name: "name", inputStyleClass: "inputStyleClass", placeholder: "placeholder", ariaLabelledBy: "ariaLabelledBy", disabled: "disabled", dateFormat: "dateFormat", multipleSeparator: "multipleSeparator", rangeSeparator: "rangeSeparator", inline: "inline", showOtherMonths: "showOtherMonths", selectOtherMonths: "selectOtherMonths", showIcon: "showIcon", icon: "icon", appendTo: "appendTo", readonlyInput: "readonlyInput", shortYearCutoff: "shortYearCutoff", monthNavigator: "monthNavigator", yearNavigator: "yearNavigator", hourFormat: "hourFormat", timeOnly: "timeOnly", stepHour: "stepHour", stepMinute: "stepMinute", stepSecond: "stepSecond", showSeconds: "showSeconds", required: "required", showOnFocus: "showOnFocus", showWeek: "showWeek", dataType: "dataType", selectionMode: "selectionMode", maxDateCount: "maxDateCount", showButtonBar: "showButtonBar", todayButtonStyleClass: "todayButtonStyleClass", clearButtonStyleClass: "clearButtonStyleClass", autoZIndex: "autoZIndex", baseZIndex: "baseZIndex", panelStyleClass: "panelStyleClass", panelStyle: "panelStyle", keepInvalid: "keepInvalid", hideOnDateTimeSelect: "hideOnDateTimeSelect", numberOfMonths: "numberOfMonths", view: "view", touchUI: "touchUI", timeSeparator: "timeSeparator", focusTrap: "focusTrap", firstDayOfWeek: "firstDayOfWeek", showTransitionOptions: "showTransitionOptions", hideTransitionOptions: "hideTransitionOptions", tabindex: "tabindex", defaultDate: "defaultDate", minDate: "minDate", maxDate: "maxDate", disabledDates: "disabledDates", disabledDays: "disabledDays", yearRange: "yearRange", showTime: "showTime", locale: "locale" }, outputs: { onFocus: "onFocus", onBlur: "onBlur", onClose: "onClose", onSelect: "onSelect", onInput: "onInput", onTodayClick: "onTodayClick", onClearClick: "onClearClick", onMonthChange: "onMonthChange", onYearChange: "onYearChange", onClickOutside: "onClickOutside", onShow: "onShow" }, host: { properties: { "class.p-inputwrapper-filled": "filled", "class.p-inputwrapper-focus": "focus" } }, providers: [CALENDAR_VALUE_ACCESSOR], queries: [{ propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "containerViewChild", first: true, predicate: ["container"], descendants: true }, { propertyName: "inputfieldViewChild", first: true, predicate: ["inputfield"], descendants: true }, { propertyName: "content", first: true, predicate: ["contentWrapper"], descendants: true }], ngImport: i0, template: `
        <span #container [ngClass]="{'p-calendar':true, 'p-calendar-w-btn': showIcon, 'p-calendar-timeonly': timeOnly, 'p-calendar-disabled':disabled, 'p-focus': focus}" [ngStyle]="style" [class]="styleClass">
            <ng-template [ngIf]="!inline">
                <input #inputfield type="text" [attr.id]="inputId" [attr.name]="name" [attr.required]="required" [attr.aria-required]="required" [value]="inputFieldValue" (focus)="onInputFocus($event)" (keydown)="onInputKeydown($event)" (click)="onInputClick()" (blur)="onInputBlur($event)"
                    [readonly]="readonlyInput" (input)="onUserInput($event)" [ngStyle]="inputStyle" [class]="inputStyleClass" [placeholder]="placeholder||''" [disabled]="disabled" [attr.tabindex]="tabindex" [attr.inputmode]="touchUI ? 'off' : null"
                    [ngClass]="'p-inputtext p-component'" autocomplete="off" [attr.aria-labelledby]="ariaLabelledBy"
                    ><button type="button" [icon]="icon" pButton pRipple *ngIf="showIcon" (click)="onButtonClick($event,inputfield)" class="p-datepicker-trigger"
                    [disabled]="disabled" tabindex="0"></button>
            </ng-template>
            <div #contentWrapper [class]="panelStyleClass" [ngStyle]="panelStyle" [ngClass]="{'p-datepicker p-component': true, 'p-datepicker-inline':inline,
                'p-disabled':disabled,'p-datepicker-timeonly':timeOnly,'p-datepicker-multiple-month': this.numberOfMonths > 1, 'p-datepicker-monthpicker': (view === 'month'), 'p-datepicker-touch-ui': touchUI}"
                [@overlayAnimation]="touchUI ? {value: 'visibleTouchUI', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}:
                                            {value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}"
                                            [@.disabled]="inline === true" (@overlayAnimation.start)="onOverlayAnimationStart($event)" (@overlayAnimation.done)="onOverlayAnimationDone($event)" (click)="onOverlayClick($event)" *ngIf="inline || overlayVisible">
                <ng-content select="p-header"></ng-content>
                <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
                <ng-container *ngIf="!timeOnly">
                    <div class="p-datepicker-group-container">
                        <div class="p-datepicker-group" *ngFor="let month of months; let i = index;">
                            <div class="p-datepicker-header">
                                <button (keydown)="onContainerButtonKeydown($event)" class="p-datepicker-prev p-link" (click)="onPrevButtonClick($event)" *ngIf="i === 0" type="button" pRipple>
                                    <span class="p-datepicker-prev-icon pi pi-chevron-left"></span>
                                </button>
                                <div class="p-datepicker-title">
                                    <span class="p-datepicker-month" *ngIf="!monthNavigator && (view !== 'month')">{{getTranslation('monthNames')[month.month]}}</span>
                                    <select tabindex="0" class="p-datepicker-month" *ngIf="monthNavigator && (view !== 'month') && numberOfMonths === 1" (change)="onMonthDropdownChange($event.target.value)">
                                        <option [value]="i" *ngFor="let monthName of getTranslation('monthNames');let i = index" [selected]="i === month.month">{{monthName}}</option>
                                    </select>
                                    <select tabindex="0" class="p-datepicker-year" *ngIf="yearNavigator && numberOfMonths === 1" (change)="onYearDropdownChange($event.target.value)">
                                        <option [value]="year" *ngFor="let year of yearOptions" [selected]="year === currentYear">{{year}}</option>
                                    </select>
                                    <span class="p-datepicker-year" *ngIf="!yearNavigator">{{view === 'month' ? currentYear : month.year}}</span>
                                </div>
                                <button (keydown)="onContainerButtonKeydown($event)" class="p-datepicker-next p-link" (click)="onNextButtonClick($event)" *ngIf="numberOfMonths === 1 ? true : (i === numberOfMonths -1)" type="button" pRipple>
                                    <span class="p-datepicker-next-icon pi pi-chevron-right"></span>
                                </button>
                            </div>
                            <div class="p-datepicker-calendar-container" *ngIf="view ==='date'">
                                <table class="p-datepicker-calendar">
                                    <thead>
                                        <tr>
                                            <th *ngIf="showWeek" class="p-datepicker-weekheader p-disabled">
                                                <span>{{getTranslation('weekHeader')}}</span>
                                            </th>
                                            <th scope="col" *ngFor="let weekDay of weekDays;let begin = first; let end = last">
                                                <span>{{weekDay}}</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr *ngFor="let week of month.dates; let j = index;">
                                            <td *ngIf="showWeek" class="p-datepicker-weeknumber">
                                                <span class="p-disabled">
                                                    {{month.weekNumbers[j]}}
                                                </span>
                                            </td>
                                            <td *ngFor="let date of week" [ngClass]="{'p-datepicker-other-month': date.otherMonth,'p-datepicker-today':date.today}">
                                                <ng-container *ngIf="date.otherMonth ? showOtherMonths : true">
                                                    <span [ngClass]="{'p-highlight':isSelected(date), 'p-disabled': !date.selectable}"
                                                        (click)="onDateSelect($event,date)" draggable="false" (keydown)="onDateCellKeydown($event,date,i)" pRipple>
                                                        <ng-container *ngIf="!dateTemplate">{{date.day}}</ng-container>
                                                        <ng-container *ngTemplateOutlet="dateTemplate; context: {$implicit: date}"></ng-container>
                                                    </span>
                                                </ng-container>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="p-monthpicker" *ngIf="view === 'month'">
                        <span *ngFor="let m of monthPickerValues; let i = index" (click)="onMonthSelect($event, i)" (keydown)="onMonthCellKeydown($event,i)" class="p-monthpicker-month" [ngClass]="{'p-highlight': isMonthSelected(i), 'p-disabled':!isSelectable(1, i, this.currentYear, false)}" pRipple>
                            {{m}}
                        </span>
                    </div>
                </ng-container>
                <div class="p-timepicker" *ngIf="showTime||timeOnly">
                    <div class="p-hour-picker">
                        <button class="p-link" type="button" (keydown)="onContainerButtonKeydown($event)" (keydown.enter)="incrementHour($event)" (mousedown)="onTimePickerElementMouseDown($event, 0, 1)" (mouseup)="onTimePickerElementMouseUp($event)" (mouseleave)="onTimePickerElementMouseLeave()" pRipple>
                            <span class="pi pi-chevron-up"></span>
                        </button>
                        <span><ng-container *ngIf="currentHour < 10">0</ng-container>{{currentHour}}</span>
                        <button class="p-link" type="button" (keydown)="onContainerButtonKeydown($event)" (keydown.enter)="decrementHour($event)" (mousedown)="onTimePickerElementMouseDown($event, 0, -1)" (mouseup)="onTimePickerElementMouseUp($event)" (mouseleave)="onTimePickerElementMouseLeave()" pRipple>
                            <span class="pi pi-chevron-down"></span>
                        </button>
                    </div>
                    <div class="p-separator">
                        <span>{{timeSeparator}}</span>
                    </div>
                    <div class="p-minute-picker">
                        <button class="p-link" type="button" (keydown)="onContainerButtonKeydown($event)" (keydown.enter)="incrementMinute($event)" (mousedown)="onTimePickerElementMouseDown($event, 1, 1)" (mouseup)="onTimePickerElementMouseUp($event)" (mouseleave)="onTimePickerElementMouseLeave()" pRipple>
                            <span class="pi pi-chevron-up"></span>
                        </button>
                        <span><ng-container *ngIf="currentMinute < 10">0</ng-container>{{currentMinute}}</span>
                        <button class="p-link" type="button" (keydown)="onContainerButtonKeydown($event)" (keydown.enter)="decrementMinute($event)" (mousedown)="onTimePickerElementMouseDown($event, 1, -1)" (mouseup)="onTimePickerElementMouseUp($event)" (mouseleave)="onTimePickerElementMouseLeave()" pRipple>
                            <span class="pi pi-chevron-down"></span>
                        </button>
                    </div>
                    <div class="p-separator" *ngIf="showSeconds">
                        <span>{{timeSeparator}}</span>
                    </div>
                    <div class="p-second-picker" *ngIf="showSeconds">
                        <button class="p-link" type="button" (keydown)="onContainerButtonKeydown($event)" (keydown.enter)="incrementSecond($event)" (mousedown)="onTimePickerElementMouseDown($event, 2, 1)" (mouseup)="onTimePickerElementMouseUp($event)" (mouseleave)="onTimePickerElementMouseLeave()" pRipple>
                            <span class="pi pi-chevron-up"></span>
                        </button>
                        <span><ng-container *ngIf="currentSecond < 10">0</ng-container>{{currentSecond}}</span>
                        <button class="p-link" type="button" (keydown)="onContainerButtonKeydown($event)" (keydown.enter)="decrementSecond($event)" (mousedown)="onTimePickerElementMouseDown($event, 2, -1)" (mouseup)="onTimePickerElementMouseUp($event)" (mouseleave)="onTimePickerElementMouseLeave()" pRipple>
                            <span class="pi pi-chevron-down"></span>
                        </button>
                    </div>
                    <div class="p-ampm-picker" *ngIf="hourFormat=='12'">
                        <button class="p-link" type="button" (keydown)="onContainerButtonKeydown($event)" (click)="toggleAMPM($event)" (keydown.enter)="toggleAMPM($event)" pRipple>
                            <span class="pi pi-chevron-up"></span>
                        </button>
                        <span>{{pm ? 'PM' : 'AM'}}</span>
                        <button class="p-link" type="button" (keydown)="onContainerButtonKeydown($event)" (click)="toggleAMPM($event)" (keydown.enter)="toggleAMPM($event)" pRipple>
                            <span class="pi pi-chevron-down"></span>
                        </button>
                    </div>
                </div>
                <div class="p-datepicker-buttonbar" *ngIf="showButtonBar">
                    <button type="button" [label]="getTranslation('today')" (keydown)="onContainerButtonKeydown($event)" (click)="onTodayButtonClick($event)" pButton pRipple [ngClass]="[todayButtonStyleClass]"></button>
                    <button type="button" [label]="getTranslation('clear')" (keydown)="onContainerButtonKeydown($event)" (click)="onClearButtonClick($event)" pButton pRipple [ngClass]="[clearButtonStyleClass]"></button>
                </div>
                <ng-content select="p-footer"></ng-content>
                <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
            </div>
        </span>
    `, isInline: true, styles: [".p-calendar{position:relative;display:inline-flex}.p-calendar .p-inputtext{flex:1 1 auto;width:1%}.p-calendar-w-btn .p-inputtext{border-top-right-radius:0;border-bottom-right-radius:0}.p-calendar-w-btn .p-datepicker-trigger{border-top-left-radius:0;border-bottom-left-radius:0}.p-fluid .p-calendar{display:flex}.p-fluid .p-calendar .p-inputtext{width:1%}.p-calendar .p-datepicker{min-width:100%}.p-datepicker{width:auto;position:absolute;top:0;left:0}.p-datepicker-inline{position:static}.p-datepicker-header{display:flex;align-items:center;justify-content:space-between}.p-datepicker-header .p-datepicker-title{margin:0 auto}.p-datepicker-next,.p-datepicker-prev{cursor:pointer;display:inline-flex;justify-content:center;align-items:center;overflow:hidden;position:relative}.p-datepicker-multiple-month .p-datepicker-group-container{display:flex}.p-datepicker table{width:100%;border-collapse:collapse}.p-datepicker td>span{display:flex;margin:0 auto}.p-datepicker td>span,.p-monthpicker-month{justify-content:center;align-items:center;cursor:pointer;overflow:hidden;position:relative}.p-monthpicker-month{width:33.3%;display:inline-flex}.p-datepicker-buttonbar{display:flex;justify-content:space-between;align-items:center}.p-timepicker,.p-timepicker button{display:flex;justify-content:center;align-items:center}.p-timepicker button{cursor:pointer;overflow:hidden;position:relative}.p-timepicker>div{display:flex;align-items:center;flex-direction:column}.p-calendar .p-datepicker-touch-ui,.p-datepicker-touch-ui{position:fixed;top:50%;left:50%;min-width:80vw;transform:translate(-50%,-50%)}"], directives: [{ type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.ButtonDirective, selector: "[pButton]", inputs: ["iconPos", "loadingIcon", "label", "icon", "loading"] }, { type: i4.Ripple, selector: "[pRipple]" }, { type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], animations: [
        trigger('overlayAnimation', [
            state('visibleTouchUI', style({
                transform: 'translate(-50%,-50%)',
                opacity: 1
            })),
            transition('void => visible', [
                style({ opacity: 0, transform: 'scaleY(0.8)' }),
                animate('{{showTransitionParams}}', style({ opacity: 1, transform: '*' }))
            ]),
            transition('visible => void', [
                animate('{{hideTransitionParams}}', style({ opacity: 0 }))
            ]),
            transition('void => visibleTouchUI', [
                style({ opacity: 0, transform: 'translate3d(-50%, -40%, 0) scale(0.9)' }),
                animate('{{showTransitionParams}}')
            ]),
            transition('visibleTouchUI => void', [
                animate(('{{hideTransitionParams}}'), style({
                    opacity: 0,
                    transform: 'translate3d(-50%, -40%, 0) scale(0.9)'
                }))
            ])
        ])
    ], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: Calendar, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-calendar',
                    template: `
        <span #container [ngClass]="{'p-calendar':true, 'p-calendar-w-btn': showIcon, 'p-calendar-timeonly': timeOnly, 'p-calendar-disabled':disabled, 'p-focus': focus}" [ngStyle]="style" [class]="styleClass">
            <ng-template [ngIf]="!inline">
                <input #inputfield type="text" [attr.id]="inputId" [attr.name]="name" [attr.required]="required" [attr.aria-required]="required" [value]="inputFieldValue" (focus)="onInputFocus($event)" (keydown)="onInputKeydown($event)" (click)="onInputClick()" (blur)="onInputBlur($event)"
                    [readonly]="readonlyInput" (input)="onUserInput($event)" [ngStyle]="inputStyle" [class]="inputStyleClass" [placeholder]="placeholder||''" [disabled]="disabled" [attr.tabindex]="tabindex" [attr.inputmode]="touchUI ? 'off' : null"
                    [ngClass]="'p-inputtext p-component'" autocomplete="off" [attr.aria-labelledby]="ariaLabelledBy"
                    ><button type="button" [icon]="icon" pButton pRipple *ngIf="showIcon" (click)="onButtonClick($event,inputfield)" class="p-datepicker-trigger"
                    [disabled]="disabled" tabindex="0"></button>
            </ng-template>
            <div #contentWrapper [class]="panelStyleClass" [ngStyle]="panelStyle" [ngClass]="{'p-datepicker p-component': true, 'p-datepicker-inline':inline,
                'p-disabled':disabled,'p-datepicker-timeonly':timeOnly,'p-datepicker-multiple-month': this.numberOfMonths > 1, 'p-datepicker-monthpicker': (view === 'month'), 'p-datepicker-touch-ui': touchUI}"
                [@overlayAnimation]="touchUI ? {value: 'visibleTouchUI', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}:
                                            {value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}"
                                            [@.disabled]="inline === true" (@overlayAnimation.start)="onOverlayAnimationStart($event)" (@overlayAnimation.done)="onOverlayAnimationDone($event)" (click)="onOverlayClick($event)" *ngIf="inline || overlayVisible">
                <ng-content select="p-header"></ng-content>
                <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
                <ng-container *ngIf="!timeOnly">
                    <div class="p-datepicker-group-container">
                        <div class="p-datepicker-group" *ngFor="let month of months; let i = index;">
                            <div class="p-datepicker-header">
                                <button (keydown)="onContainerButtonKeydown($event)" class="p-datepicker-prev p-link" (click)="onPrevButtonClick($event)" *ngIf="i === 0" type="button" pRipple>
                                    <span class="p-datepicker-prev-icon pi pi-chevron-left"></span>
                                </button>
                                <div class="p-datepicker-title">
                                    <span class="p-datepicker-month" *ngIf="!monthNavigator && (view !== 'month')">{{getTranslation('monthNames')[month.month]}}</span>
                                    <select tabindex="0" class="p-datepicker-month" *ngIf="monthNavigator && (view !== 'month') && numberOfMonths === 1" (change)="onMonthDropdownChange($event.target.value)">
                                        <option [value]="i" *ngFor="let monthName of getTranslation('monthNames');let i = index" [selected]="i === month.month">{{monthName}}</option>
                                    </select>
                                    <select tabindex="0" class="p-datepicker-year" *ngIf="yearNavigator && numberOfMonths === 1" (change)="onYearDropdownChange($event.target.value)">
                                        <option [value]="year" *ngFor="let year of yearOptions" [selected]="year === currentYear">{{year}}</option>
                                    </select>
                                    <span class="p-datepicker-year" *ngIf="!yearNavigator">{{view === 'month' ? currentYear : month.year}}</span>
                                </div>
                                <button (keydown)="onContainerButtonKeydown($event)" class="p-datepicker-next p-link" (click)="onNextButtonClick($event)" *ngIf="numberOfMonths === 1 ? true : (i === numberOfMonths -1)" type="button" pRipple>
                                    <span class="p-datepicker-next-icon pi pi-chevron-right"></span>
                                </button>
                            </div>
                            <div class="p-datepicker-calendar-container" *ngIf="view ==='date'">
                                <table class="p-datepicker-calendar">
                                    <thead>
                                        <tr>
                                            <th *ngIf="showWeek" class="p-datepicker-weekheader p-disabled">
                                                <span>{{getTranslation('weekHeader')}}</span>
                                            </th>
                                            <th scope="col" *ngFor="let weekDay of weekDays;let begin = first; let end = last">
                                                <span>{{weekDay}}</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr *ngFor="let week of month.dates; let j = index;">
                                            <td *ngIf="showWeek" class="p-datepicker-weeknumber">
                                                <span class="p-disabled">
                                                    {{month.weekNumbers[j]}}
                                                </span>
                                            </td>
                                            <td *ngFor="let date of week" [ngClass]="{'p-datepicker-other-month': date.otherMonth,'p-datepicker-today':date.today}">
                                                <ng-container *ngIf="date.otherMonth ? showOtherMonths : true">
                                                    <span [ngClass]="{'p-highlight':isSelected(date), 'p-disabled': !date.selectable}"
                                                        (click)="onDateSelect($event,date)" draggable="false" (keydown)="onDateCellKeydown($event,date,i)" pRipple>
                                                        <ng-container *ngIf="!dateTemplate">{{date.day}}</ng-container>
                                                        <ng-container *ngTemplateOutlet="dateTemplate; context: {$implicit: date}"></ng-container>
                                                    </span>
                                                </ng-container>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="p-monthpicker" *ngIf="view === 'month'">
                        <span *ngFor="let m of monthPickerValues; let i = index" (click)="onMonthSelect($event, i)" (keydown)="onMonthCellKeydown($event,i)" class="p-monthpicker-month" [ngClass]="{'p-highlight': isMonthSelected(i), 'p-disabled':!isSelectable(1, i, this.currentYear, false)}" pRipple>
                            {{m}}
                        </span>
                    </div>
                </ng-container>
                <div class="p-timepicker" *ngIf="showTime||timeOnly">
                    <div class="p-hour-picker">
                        <button class="p-link" type="button" (keydown)="onContainerButtonKeydown($event)" (keydown.enter)="incrementHour($event)" (mousedown)="onTimePickerElementMouseDown($event, 0, 1)" (mouseup)="onTimePickerElementMouseUp($event)" (mouseleave)="onTimePickerElementMouseLeave()" pRipple>
                            <span class="pi pi-chevron-up"></span>
                        </button>
                        <span><ng-container *ngIf="currentHour < 10">0</ng-container>{{currentHour}}</span>
                        <button class="p-link" type="button" (keydown)="onContainerButtonKeydown($event)" (keydown.enter)="decrementHour($event)" (mousedown)="onTimePickerElementMouseDown($event, 0, -1)" (mouseup)="onTimePickerElementMouseUp($event)" (mouseleave)="onTimePickerElementMouseLeave()" pRipple>
                            <span class="pi pi-chevron-down"></span>
                        </button>
                    </div>
                    <div class="p-separator">
                        <span>{{timeSeparator}}</span>
                    </div>
                    <div class="p-minute-picker">
                        <button class="p-link" type="button" (keydown)="onContainerButtonKeydown($event)" (keydown.enter)="incrementMinute($event)" (mousedown)="onTimePickerElementMouseDown($event, 1, 1)" (mouseup)="onTimePickerElementMouseUp($event)" (mouseleave)="onTimePickerElementMouseLeave()" pRipple>
                            <span class="pi pi-chevron-up"></span>
                        </button>
                        <span><ng-container *ngIf="currentMinute < 10">0</ng-container>{{currentMinute}}</span>
                        <button class="p-link" type="button" (keydown)="onContainerButtonKeydown($event)" (keydown.enter)="decrementMinute($event)" (mousedown)="onTimePickerElementMouseDown($event, 1, -1)" (mouseup)="onTimePickerElementMouseUp($event)" (mouseleave)="onTimePickerElementMouseLeave()" pRipple>
                            <span class="pi pi-chevron-down"></span>
                        </button>
                    </div>
                    <div class="p-separator" *ngIf="showSeconds">
                        <span>{{timeSeparator}}</span>
                    </div>
                    <div class="p-second-picker" *ngIf="showSeconds">
                        <button class="p-link" type="button" (keydown)="onContainerButtonKeydown($event)" (keydown.enter)="incrementSecond($event)" (mousedown)="onTimePickerElementMouseDown($event, 2, 1)" (mouseup)="onTimePickerElementMouseUp($event)" (mouseleave)="onTimePickerElementMouseLeave()" pRipple>
                            <span class="pi pi-chevron-up"></span>
                        </button>
                        <span><ng-container *ngIf="currentSecond < 10">0</ng-container>{{currentSecond}}</span>
                        <button class="p-link" type="button" (keydown)="onContainerButtonKeydown($event)" (keydown.enter)="decrementSecond($event)" (mousedown)="onTimePickerElementMouseDown($event, 2, -1)" (mouseup)="onTimePickerElementMouseUp($event)" (mouseleave)="onTimePickerElementMouseLeave()" pRipple>
                            <span class="pi pi-chevron-down"></span>
                        </button>
                    </div>
                    <div class="p-ampm-picker" *ngIf="hourFormat=='12'">
                        <button class="p-link" type="button" (keydown)="onContainerButtonKeydown($event)" (click)="toggleAMPM($event)" (keydown.enter)="toggleAMPM($event)" pRipple>
                            <span class="pi pi-chevron-up"></span>
                        </button>
                        <span>{{pm ? 'PM' : 'AM'}}</span>
                        <button class="p-link" type="button" (keydown)="onContainerButtonKeydown($event)" (click)="toggleAMPM($event)" (keydown.enter)="toggleAMPM($event)" pRipple>
                            <span class="pi pi-chevron-down"></span>
                        </button>
                    </div>
                </div>
                <div class="p-datepicker-buttonbar" *ngIf="showButtonBar">
                    <button type="button" [label]="getTranslation('today')" (keydown)="onContainerButtonKeydown($event)" (click)="onTodayButtonClick($event)" pButton pRipple [ngClass]="[todayButtonStyleClass]"></button>
                    <button type="button" [label]="getTranslation('clear')" (keydown)="onContainerButtonKeydown($event)" (click)="onClearButtonClick($event)" pButton pRipple [ngClass]="[clearButtonStyleClass]"></button>
                </div>
                <ng-content select="p-footer"></ng-content>
                <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
            </div>
        </span>
    `,
                    animations: [
                        trigger('overlayAnimation', [
                            state('visibleTouchUI', style({
                                transform: 'translate(-50%,-50%)',
                                opacity: 1
                            })),
                            transition('void => visible', [
                                style({ opacity: 0, transform: 'scaleY(0.8)' }),
                                animate('{{showTransitionParams}}', style({ opacity: 1, transform: '*' }))
                            ]),
                            transition('visible => void', [
                                animate('{{hideTransitionParams}}', style({ opacity: 0 }))
                            ]),
                            transition('void => visibleTouchUI', [
                                style({ opacity: 0, transform: 'translate3d(-50%, -40%, 0) scale(0.9)' }),
                                animate('{{showTransitionParams}}')
                            ]),
                            transition('visibleTouchUI => void', [
                                animate(('{{hideTransitionParams}}'), style({
                                    opacity: 0,
                                    transform: 'translate3d(-50%, -40%, 0) scale(0.9)'
                                }))
                            ])
                        ])
                    ],
                    host: {
                        '[class.p-inputwrapper-filled]': 'filled',
                        '[class.p-inputwrapper-focus]': 'focus'
                    },
                    providers: [CALENDAR_VALUE_ACCESSOR],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styleUrls: ['./calendar.css']
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ChangeDetectorRef }, { type: i0.NgZone }, { type: i1.PrimeNGConfig }, { type: i1.OverlayService }]; }, propDecorators: { style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], inputStyle: [{
                type: Input
            }], inputId: [{
                type: Input
            }], name: [{
                type: Input
            }], inputStyleClass: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], ariaLabelledBy: [{
                type: Input
            }], disabled: [{
                type: Input
            }], dateFormat: [{
                type: Input
            }], multipleSeparator: [{
                type: Input
            }], rangeSeparator: [{
                type: Input
            }], inline: [{
                type: Input
            }], showOtherMonths: [{
                type: Input
            }], selectOtherMonths: [{
                type: Input
            }], showIcon: [{
                type: Input
            }], icon: [{
                type: Input
            }], appendTo: [{
                type: Input
            }], readonlyInput: [{
                type: Input
            }], shortYearCutoff: [{
                type: Input
            }], monthNavigator: [{
                type: Input
            }], yearNavigator: [{
                type: Input
            }], hourFormat: [{
                type: Input
            }], timeOnly: [{
                type: Input
            }], stepHour: [{
                type: Input
            }], stepMinute: [{
                type: Input
            }], stepSecond: [{
                type: Input
            }], showSeconds: [{
                type: Input
            }], required: [{
                type: Input
            }], showOnFocus: [{
                type: Input
            }], showWeek: [{
                type: Input
            }], dataType: [{
                type: Input
            }], selectionMode: [{
                type: Input
            }], maxDateCount: [{
                type: Input
            }], showButtonBar: [{
                type: Input
            }], todayButtonStyleClass: [{
                type: Input
            }], clearButtonStyleClass: [{
                type: Input
            }], autoZIndex: [{
                type: Input
            }], baseZIndex: [{
                type: Input
            }], panelStyleClass: [{
                type: Input
            }], panelStyle: [{
                type: Input
            }], keepInvalid: [{
                type: Input
            }], hideOnDateTimeSelect: [{
                type: Input
            }], numberOfMonths: [{
                type: Input
            }], view: [{
                type: Input
            }], touchUI: [{
                type: Input
            }], timeSeparator: [{
                type: Input
            }], focusTrap: [{
                type: Input
            }], firstDayOfWeek: [{
                type: Input
            }], showTransitionOptions: [{
                type: Input
            }], hideTransitionOptions: [{
                type: Input
            }], onFocus: [{
                type: Output
            }], onBlur: [{
                type: Output
            }], onClose: [{
                type: Output
            }], onSelect: [{
                type: Output
            }], onInput: [{
                type: Output
            }], onTodayClick: [{
                type: Output
            }], onClearClick: [{
                type: Output
            }], onMonthChange: [{
                type: Output
            }], onYearChange: [{
                type: Output
            }], onClickOutside: [{
                type: Output
            }], onShow: [{
                type: Output
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }], tabindex: [{
                type: Input
            }], containerViewChild: [{
                type: ViewChild,
                args: ['container', { static: false }]
            }], inputfieldViewChild: [{
                type: ViewChild,
                args: ['inputfield', { static: false }]
            }], content: [{
                type: ViewChild,
                args: ['contentWrapper', { static: false }]
            }], defaultDate: [{
                type: Input
            }], minDate: [{
                type: Input
            }], maxDate: [{
                type: Input
            }], disabledDates: [{
                type: Input
            }], disabledDays: [{
                type: Input
            }], yearRange: [{
                type: Input
            }], showTime: [{
                type: Input
            }], locale: [{
                type: Input
            }] } });
export class CalendarModule {
}
CalendarModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: CalendarModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CalendarModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: CalendarModule, declarations: [Calendar], imports: [CommonModule, ButtonModule, SharedModule, RippleModule], exports: [Calendar, ButtonModule, SharedModule] });
CalendarModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: CalendarModule, imports: [[CommonModule, ButtonModule, SharedModule, RippleModule], ButtonModule, SharedModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: CalendarModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, ButtonModule, SharedModule, RippleModule],
                    exports: [Calendar, ButtonModule, SharedModule],
                    declarations: [Calendar]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvY2FsZW5kYXIvY2FsZW5kYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQTZCLEtBQUssRUFBQyxNQUFNLEVBQUMsWUFBWSxFQUFDLFVBQVUsRUFDbkYsU0FBUyxFQUErQixlQUFlLEVBQWtCLHVCQUF1QixFQUFFLGlCQUFpQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2xKLE9BQU8sRUFBQyxPQUFPLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsT0FBTyxFQUFnQixNQUFNLHFCQUFxQixDQUFDO0FBQzFGLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzVDLE9BQU8sRUFBQyxVQUFVLEVBQUUsNkJBQTZCLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFDdEUsT0FBTyxFQUFDLFlBQVksRUFBQyxhQUFhLEVBQWUsZUFBZSxFQUFpQixNQUFNLGFBQWEsQ0FBQztBQUNyRyxPQUFPLEVBQUMsaUJBQWlCLEVBQXVCLE1BQU0sZ0JBQWdCLENBQUM7QUFFdkUsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7Ozs7O0FBRTFDLE1BQU0sQ0FBQyxNQUFNLHVCQUF1QixHQUFRO0lBQ3hDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUM7SUFDdkMsS0FBSyxFQUFFLElBQUk7Q0FDZCxDQUFDO0FBc0xGLE1BQU0sT0FBTyxRQUFRO0lBNFZqQixZQUFtQixFQUFjLEVBQVMsUUFBbUIsRUFBUyxFQUFxQixFQUFVLElB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QUFDLENBQUMsU0FBUyxDQUFDO1FBQ3pELElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUM3RSxJQUFJLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQztTQUNsQztRQUVELEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsZUFBZSxDQUFDLEtBQUs7UUFDakIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ3JELFNBQVMsR0FBRyxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1FBQzFELElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUM3RSxJQUFJLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQztTQUNsQztRQUVELEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsZUFBZSxDQUFDLEtBQUs7UUFDakIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ3JELFNBQVMsR0FBRyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1FBQ3pELElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUM3RSxJQUFJLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQztTQUNsQztR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LEtBQUs7Z0JBRXFDLGtCQUFrQjtzQkFBNUQsU0FBUzt1QkFBQyxXQUFXLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO2dCQUVHLG1CQUFtQjtzQkFBOUQsU0FBUzt1QkFBQyxZQUFZLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO2dCQUVVLE9BQU87c0JBQTFELFNBQVM7dUJBQUMsZ0JBQWdCLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO2dCQThHakMsV0FBVztzQkFBdkIsS0FBSztnQkFrQk8sT0FBTztzQkFBbkIsS0FBSztnQkFZTyxPQUFPO3NCQUFuQixLQUFLO2dCQVlPLGFBQWE7c0JBQXpCLEtBQUs7Z0JBWU8sWUFBWTtzQkFBeEIsS0FBSztnQkFZTyxTQUFTO3NCQUFyQixLQUFLO2dCQWdCTyxRQUFRO3NCQUFwQixLQUFLO2dCQWtCRixNQUFNO3NCQURULEtBQUs7O0FBZ2lFVixNQUFNLE9BQU8sY0FBYzs7MkdBQWQsY0FBYzs0R0FBZCxjQUFjLGlCQXYzRWQsUUFBUSxhQW0zRVAsWUFBWSxFQUFDLFlBQVksRUFBQyxZQUFZLEVBQUMsWUFBWSxhQW4zRXBELFFBQVEsRUFvM0VFLFlBQVksRUFBQyxZQUFZOzRHQUduQyxjQUFjLFlBSmQsQ0FBQyxZQUFZLEVBQUMsWUFBWSxFQUFDLFlBQVksRUFBQyxZQUFZLENBQUMsRUFDM0MsWUFBWSxFQUFDLFlBQVk7MkZBR25DLGNBQWM7a0JBTDFCLFFBQVE7bUJBQUM7b0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFDLFlBQVksRUFBQyxZQUFZLEVBQUMsWUFBWSxDQUFDO29CQUM5RCxPQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUMsWUFBWSxFQUFDLFlBQVksQ0FBQztvQkFDN0MsWUFBWSxFQUFFLENBQUMsUUFBUSxDQUFDO2lCQUMzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGUsQ29tcG9uZW50LEVsZW1lbnRSZWYsT25EZXN0cm95LE9uSW5pdCxJbnB1dCxPdXRwdXQsRXZlbnRFbWl0dGVyLGZvcndhcmRSZWYsUmVuZGVyZXIyLFxuICAgICAgICBWaWV3Q2hpbGQsQ2hhbmdlRGV0ZWN0b3JSZWYsVGVtcGxhdGVSZWYsQ29udGVudENoaWxkcmVuLFF1ZXJ5TGlzdCxOZ1pvbmUsQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7dHJpZ2dlcixzdGF0ZSxzdHlsZSx0cmFuc2l0aW9uLGFuaW1hdGUsQW5pbWF0aW9uRXZlbnR9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0J1dHRvbk1vZHVsZX0gZnJvbSAncHJpbWVuZy9idXR0b24nO1xuaW1wb3J0IHtSaXBwbGVNb2R1bGV9IGZyb20gJ3ByaW1lbmcvcmlwcGxlJztcbmltcG9ydCB7RG9tSGFuZGxlciwgQ29ubmVjdGVkT3ZlcmxheVNjcm9sbEhhbmRsZXJ9IGZyb20gJ3ByaW1lbmcvZG9tJztcbmltcG9ydCB7U2hhcmVkTW9kdWxlLFByaW1lVGVtcGxhdGUsUHJpbWVOR0NvbmZpZyxUcmFuc2xhdGlvbktleXMsIE92ZXJsYXlTZXJ2aWNlfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQge05HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3Nvcn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtaSW5kZXhVdGlsc30gZnJvbSAncHJpbWVuZy91dGlscyc7XG5cbmV4cG9ydCBjb25zdCBDQUxFTkRBUl9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IENhbGVuZGFyKSxcbiAgICBtdWx0aTogdHJ1ZVxufTtcblxuZXhwb3J0IGludGVyZmFjZSBMb2NhbGVTZXR0aW5ncyB7XG4gICAgZmlyc3REYXlPZldlZWs/OiBudW1iZXI7XG4gICAgZGF5TmFtZXM/OiBzdHJpbmdbXTtcbiAgICBkYXlOYW1lc1Nob3J0Pzogc3RyaW5nW107XG4gICAgZGF5TmFtZXNNaW4/OiBzdHJpbmdbXTtcbiAgICBtb250aE5hbWVzPzogc3RyaW5nW107XG4gICAgbW9udGhOYW1lc1Nob3J0Pzogc3RyaW5nW107XG4gICAgdG9kYXk/OiBzdHJpbmc7XG4gICAgY2xlYXI/OiBzdHJpbmc7XG4gICAgZGF0ZUZvcm1hdD86IHN0cmluZztcbiAgICB3ZWVrSGVhZGVyPzogc3RyaW5nO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtY2FsZW5kYXInLFxuICAgIHRlbXBsYXRlOiAgYFxuICAgICAgICA8c3BhbiAjY29udGFpbmVyIFtuZ0NsYXNzXT1cInsncC1jYWxlbmRhcic6dHJ1ZSwgJ3AtY2FsZW5kYXItdy1idG4nOiBzaG93SWNvbiwgJ3AtY2FsZW5kYXItdGltZW9ubHknOiB0aW1lT25seSwgJ3AtY2FsZW5kYXItZGlzYWJsZWQnOmRpc2FibGVkLCAncC1mb2N1cyc6IGZvY3VzfVwiIFtuZ1N0eWxlXT1cInN0eWxlXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIj5cbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdJZl09XCIhaW5saW5lXCI+XG4gICAgICAgICAgICAgICAgPGlucHV0ICNpbnB1dGZpZWxkIHR5cGU9XCJ0ZXh0XCIgW2F0dHIuaWRdPVwiaW5wdXRJZFwiIFthdHRyLm5hbWVdPVwibmFtZVwiIFthdHRyLnJlcXVpcmVkXT1cInJlcXVpcmVkXCIgW2F0dHIuYXJpYS1yZXF1aXJlZF09XCJyZXF1aXJlZFwiIFt2YWx1ZV09XCJpbnB1dEZpZWxkVmFsdWVcIiAoZm9jdXMpPVwib25JbnB1dEZvY3VzKCRldmVudClcIiAoa2V5ZG93bik9XCJvbklucHV0S2V5ZG93bigkZXZlbnQpXCIgKGNsaWNrKT1cIm9uSW5wdXRDbGljaygpXCIgKGJsdXIpPVwib25JbnB1dEJsdXIoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgIFtyZWFkb25seV09XCJyZWFkb25seUlucHV0XCIgKGlucHV0KT1cIm9uVXNlcklucHV0KCRldmVudClcIiBbbmdTdHlsZV09XCJpbnB1dFN0eWxlXCIgW2NsYXNzXT1cImlucHV0U3R5bGVDbGFzc1wiIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlcnx8JydcIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIiBbYXR0ci50YWJpbmRleF09XCJ0YWJpbmRleFwiIFthdHRyLmlucHV0bW9kZV09XCJ0b3VjaFVJID8gJ29mZicgOiBudWxsXCJcbiAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwiJ3AtaW5wdXR0ZXh0IHAtY29tcG9uZW50J1wiIGF1dG9jb21wbGV0ZT1cIm9mZlwiIFthdHRyLmFyaWEtbGFiZWxsZWRieV09XCJhcmlhTGFiZWxsZWRCeVwiXG4gICAgICAgICAgICAgICAgICAgID48YnV0dG9uIHR5cGU9XCJidXR0b25cIiBbaWNvbl09XCJpY29uXCIgcEJ1dHRvbiBwUmlwcGxlICpuZ0lmPVwic2hvd0ljb25cIiAoY2xpY2spPVwib25CdXR0b25DbGljaygkZXZlbnQsaW5wdXRmaWVsZClcIiBjbGFzcz1cInAtZGF0ZXBpY2tlci10cmlnZ2VyXCJcbiAgICAgICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCIgdGFiaW5kZXg9XCIwXCI+PC9idXR0b24+XG4gICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgPGRpdiAjY29udGVudFdyYXBwZXIgW2NsYXNzXT1cInBhbmVsU3R5bGVDbGFzc1wiIFtuZ1N0eWxlXT1cInBhbmVsU3R5bGVcIiBbbmdDbGFzc109XCJ7J3AtZGF0ZXBpY2tlciBwLWNvbXBvbmVudCc6IHRydWUsICdwLWRhdGVwaWNrZXItaW5saW5lJzppbmxpbmUsXG4gICAgICAgICAgICAgICAgJ3AtZGlzYWJsZWQnOmRpc2FibGVkLCdwLWRhdGVwaWNrZXItdGltZW9ubHknOnRpbWVPbmx5LCdwLWRhdGVwaWNrZXItbXVsdGlwbGUtbW9udGgnOiB0aGlzLm51bWJlck9mTW9udGhzID4gMSwgJ3AtZGF0ZXBpY2tlci1tb250aHBpY2tlcic6ICh2aWV3ID09PSAnbW9udGgnKSwgJ3AtZGF0ZXBpY2tlci10b3VjaC11aSc6IHRvdWNoVUl9XCJcbiAgICAgICAgICAgICAgICBbQG92ZXJsYXlBbmltYXRpb25dPVwidG91Y2hVSSA/IHt2YWx1ZTogJ3Zpc2libGVUb3VjaFVJJywgcGFyYW1zOiB7c2hvd1RyYW5zaXRpb25QYXJhbXM6IHNob3dUcmFuc2l0aW9uT3B0aW9ucywgaGlkZVRyYW5zaXRpb25QYXJhbXM6IGhpZGVUcmFuc2l0aW9uT3B0aW9uc319OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dmFsdWU6ICd2aXNpYmxlJywgcGFyYW1zOiB7c2hvd1RyYW5zaXRpb25QYXJhbXM6IHNob3dUcmFuc2l0aW9uT3B0aW9ucywgaGlkZVRyYW5zaXRpb25QYXJhbXM6IGhpZGVUcmFuc2l0aW9uT3B0aW9uc319XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW0AuZGlzYWJsZWRdPVwiaW5saW5lID09PSB0cnVlXCIgKEBvdmVybGF5QW5pbWF0aW9uLnN0YXJ0KT1cIm9uT3ZlcmxheUFuaW1hdGlvblN0YXJ0KCRldmVudClcIiAoQG92ZXJsYXlBbmltYXRpb24uZG9uZSk9XCJvbk92ZXJsYXlBbmltYXRpb25Eb25lKCRldmVudClcIiAoY2xpY2spPVwib25PdmVybGF5Q2xpY2soJGV2ZW50KVwiICpuZ0lmPVwiaW5saW5lIHx8IG92ZXJsYXlWaXNpYmxlXCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwicC1oZWFkZXJcIj48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImhlYWRlclRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiF0aW1lT25seVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1kYXRlcGlja2VyLWdyb3VwLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtZGF0ZXBpY2tlci1ncm91cFwiICpuZ0Zvcj1cImxldCBtb250aCBvZiBtb250aHM7IGxldCBpID0gaW5kZXg7XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtZGF0ZXBpY2tlci1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiAoa2V5ZG93bik9XCJvbkNvbnRhaW5lckJ1dHRvbktleWRvd24oJGV2ZW50KVwiIGNsYXNzPVwicC1kYXRlcGlja2VyLXByZXYgcC1saW5rXCIgKGNsaWNrKT1cIm9uUHJldkJ1dHRvbkNsaWNrKCRldmVudClcIiAqbmdJZj1cImkgPT09IDBcIiB0eXBlPVwiYnV0dG9uXCIgcFJpcHBsZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC1kYXRlcGlja2VyLXByZXYtaWNvbiBwaSBwaS1jaGV2cm9uLWxlZnRcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1kYXRlcGlja2VyLXRpdGxlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtZGF0ZXBpY2tlci1tb250aFwiICpuZ0lmPVwiIW1vbnRoTmF2aWdhdG9yICYmICh2aWV3ICE9PSAnbW9udGgnKVwiPnt7Z2V0VHJhbnNsYXRpb24oJ21vbnRoTmFtZXMnKVttb250aC5tb250aF19fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzZWxlY3QgdGFiaW5kZXg9XCIwXCIgY2xhc3M9XCJwLWRhdGVwaWNrZXItbW9udGhcIiAqbmdJZj1cIm1vbnRoTmF2aWdhdG9yICYmICh2aWV3ICE9PSAnbW9udGgnKSAmJiBudW1iZXJPZk1vbnRocyA9PT0gMVwiIChjaGFuZ2UpPVwib25Nb250aERyb3Bkb3duQ2hhbmdlKCRldmVudC50YXJnZXQudmFsdWUpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiBbdmFsdWVdPVwiaVwiICpuZ0Zvcj1cImxldCBtb250aE5hbWUgb2YgZ2V0VHJhbnNsYXRpb24oJ21vbnRoTmFtZXMnKTtsZXQgaSA9IGluZGV4XCIgW3NlbGVjdGVkXT1cImkgPT09IG1vbnRoLm1vbnRoXCI+e3ttb250aE5hbWV9fTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c2VsZWN0IHRhYmluZGV4PVwiMFwiIGNsYXNzPVwicC1kYXRlcGlja2VyLXllYXJcIiAqbmdJZj1cInllYXJOYXZpZ2F0b3IgJiYgbnVtYmVyT2ZNb250aHMgPT09IDFcIiAoY2hhbmdlKT1cIm9uWWVhckRyb3Bkb3duQ2hhbmdlKCRldmVudC50YXJnZXQudmFsdWUpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiBbdmFsdWVdPVwieWVhclwiICpuZ0Zvcj1cImxldCB5ZWFyIG9mIHllYXJPcHRpb25zXCIgW3NlbGVjdGVkXT1cInllYXIgPT09IGN1cnJlbnRZZWFyXCI+e3t5ZWFyfX08L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLWRhdGVwaWNrZXIteWVhclwiICpuZ0lmPVwiIXllYXJOYXZpZ2F0b3JcIj57e3ZpZXcgPT09ICdtb250aCcgPyBjdXJyZW50WWVhciA6IG1vbnRoLnllYXJ9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gKGtleWRvd24pPVwib25Db250YWluZXJCdXR0b25LZXlkb3duKCRldmVudClcIiBjbGFzcz1cInAtZGF0ZXBpY2tlci1uZXh0IHAtbGlua1wiIChjbGljayk9XCJvbk5leHRCdXR0b25DbGljaygkZXZlbnQpXCIgKm5nSWY9XCJudW1iZXJPZk1vbnRocyA9PT0gMSA/IHRydWUgOiAoaSA9PT0gbnVtYmVyT2ZNb250aHMgLTEpXCIgdHlwZT1cImJ1dHRvblwiIHBSaXBwbGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtZGF0ZXBpY2tlci1uZXh0LWljb24gcGkgcGktY2hldnJvbi1yaWdodFwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtZGF0ZXBpY2tlci1jYWxlbmRhci1jb250YWluZXJcIiAqbmdJZj1cInZpZXcgPT09J2RhdGUnXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzcz1cInAtZGF0ZXBpY2tlci1jYWxlbmRhclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoICpuZ0lmPVwic2hvd1dlZWtcIiBjbGFzcz1cInAtZGF0ZXBpY2tlci13ZWVraGVhZGVyIHAtZGlzYWJsZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPnt7Z2V0VHJhbnNsYXRpb24oJ3dlZWtIZWFkZXInKX19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggc2NvcGU9XCJjb2xcIiAqbmdGb3I9XCJsZXQgd2Vla0RheSBvZiB3ZWVrRGF5cztsZXQgYmVnaW4gPSBmaXJzdDsgbGV0IGVuZCA9IGxhc3RcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPnt7d2Vla0RheX19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ciAqbmdGb3I9XCJsZXQgd2VlayBvZiBtb250aC5kYXRlczsgbGV0IGogPSBpbmRleDtcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkICpuZ0lmPVwic2hvd1dlZWtcIiBjbGFzcz1cInAtZGF0ZXBpY2tlci13ZWVrbnVtYmVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtZGlzYWJsZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7e21vbnRoLndlZWtOdW1iZXJzW2pdfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkICpuZ0Zvcj1cImxldCBkYXRlIG9mIHdlZWtcIiBbbmdDbGFzc109XCJ7J3AtZGF0ZXBpY2tlci1vdGhlci1tb250aCc6IGRhdGUub3RoZXJNb250aCwncC1kYXRlcGlja2VyLXRvZGF5JzpkYXRlLnRvZGF5fVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImRhdGUub3RoZXJNb250aCA/IHNob3dPdGhlck1vbnRocyA6IHRydWVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBbbmdDbGFzc109XCJ7J3AtaGlnaGxpZ2h0Jzppc1NlbGVjdGVkKGRhdGUpLCAncC1kaXNhYmxlZCc6ICFkYXRlLnNlbGVjdGFibGV9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIm9uRGF0ZVNlbGVjdCgkZXZlbnQsZGF0ZSlcIiBkcmFnZ2FibGU9XCJmYWxzZVwiIChrZXlkb3duKT1cIm9uRGF0ZUNlbGxLZXlkb3duKCRldmVudCxkYXRlLGkpXCIgcFJpcHBsZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFkYXRlVGVtcGxhdGVcIj57e2RhdGUuZGF5fX08L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImRhdGVUZW1wbGF0ZTsgY29udGV4dDogeyRpbXBsaWNpdDogZGF0ZX1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtbW9udGhwaWNrZXJcIiAqbmdJZj1cInZpZXcgPT09ICdtb250aCdcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0Zvcj1cImxldCBtIG9mIG1vbnRoUGlja2VyVmFsdWVzOyBsZXQgaSA9IGluZGV4XCIgKGNsaWNrKT1cIm9uTW9udGhTZWxlY3QoJGV2ZW50LCBpKVwiIChrZXlkb3duKT1cIm9uTW9udGhDZWxsS2V5ZG93bigkZXZlbnQsaSlcIiBjbGFzcz1cInAtbW9udGhwaWNrZXItbW9udGhcIiBbbmdDbGFzc109XCJ7J3AtaGlnaGxpZ2h0JzogaXNNb250aFNlbGVjdGVkKGkpLCAncC1kaXNhYmxlZCc6IWlzU2VsZWN0YWJsZSgxLCBpLCB0aGlzLmN1cnJlbnRZZWFyLCBmYWxzZSl9XCIgcFJpcHBsZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7e219fVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC10aW1lcGlja2VyXCIgKm5nSWY9XCJzaG93VGltZXx8dGltZU9ubHlcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtaG91ci1waWNrZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJwLWxpbmtcIiB0eXBlPVwiYnV0dG9uXCIgKGtleWRvd24pPVwib25Db250YWluZXJCdXR0b25LZXlkb3duKCRldmVudClcIiAoa2V5ZG93bi5lbnRlcik9XCJpbmNyZW1lbnRIb3VyKCRldmVudClcIiAobW91c2Vkb3duKT1cIm9uVGltZVBpY2tlckVsZW1lbnRNb3VzZURvd24oJGV2ZW50LCAwLCAxKVwiIChtb3VzZXVwKT1cIm9uVGltZVBpY2tlckVsZW1lbnRNb3VzZVVwKCRldmVudClcIiAobW91c2VsZWF2ZSk9XCJvblRpbWVQaWNrZXJFbGVtZW50TW91c2VMZWF2ZSgpXCIgcFJpcHBsZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInBpIHBpLWNoZXZyb24tdXBcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPjxuZy1jb250YWluZXIgKm5nSWY9XCJjdXJyZW50SG91ciA8IDEwXCI+MDwvbmctY29udGFpbmVyPnt7Y3VycmVudEhvdXJ9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJwLWxpbmtcIiB0eXBlPVwiYnV0dG9uXCIgKGtleWRvd24pPVwib25Db250YWluZXJCdXR0b25LZXlkb3duKCRldmVudClcIiAoa2V5ZG93bi5lbnRlcik9XCJkZWNyZW1lbnRIb3VyKCRldmVudClcIiAobW91c2Vkb3duKT1cIm9uVGltZVBpY2tlckVsZW1lbnRNb3VzZURvd24oJGV2ZW50LCAwLCAtMSlcIiAobW91c2V1cCk9XCJvblRpbWVQaWNrZXJFbGVtZW50TW91c2VVcCgkZXZlbnQpXCIgKG1vdXNlbGVhdmUpPVwib25UaW1lUGlja2VyRWxlbWVudE1vdXNlTGVhdmUoKVwiIHBSaXBwbGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwaSBwaS1jaGV2cm9uLWRvd25cIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLXNlcGFyYXRvclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e3t0aW1lU2VwYXJhdG9yfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1taW51dGUtcGlja2VyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwicC1saW5rXCIgdHlwZT1cImJ1dHRvblwiIChrZXlkb3duKT1cIm9uQ29udGFpbmVyQnV0dG9uS2V5ZG93bigkZXZlbnQpXCIgKGtleWRvd24uZW50ZXIpPVwiaW5jcmVtZW50TWludXRlKCRldmVudClcIiAobW91c2Vkb3duKT1cIm9uVGltZVBpY2tlckVsZW1lbnRNb3VzZURvd24oJGV2ZW50LCAxLCAxKVwiIChtb3VzZXVwKT1cIm9uVGltZVBpY2tlckVsZW1lbnRNb3VzZVVwKCRldmVudClcIiAobW91c2VsZWF2ZSk9XCJvblRpbWVQaWNrZXJFbGVtZW50TW91c2VMZWF2ZSgpXCIgcFJpcHBsZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInBpIHBpLWNoZXZyb24tdXBcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPjxuZy1jb250YWluZXIgKm5nSWY9XCJjdXJyZW50TWludXRlIDwgMTBcIj4wPC9uZy1jb250YWluZXI+e3tjdXJyZW50TWludXRlfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwicC1saW5rXCIgdHlwZT1cImJ1dHRvblwiIChrZXlkb3duKT1cIm9uQ29udGFpbmVyQnV0dG9uS2V5ZG93bigkZXZlbnQpXCIgKGtleWRvd24uZW50ZXIpPVwiZGVjcmVtZW50TWludXRlKCRldmVudClcIiAobW91c2Vkb3duKT1cIm9uVGltZVBpY2tlckVsZW1lbnRNb3VzZURvd24oJGV2ZW50LCAxLCAtMSlcIiAobW91c2V1cCk9XCJvblRpbWVQaWNrZXJFbGVtZW50TW91c2VVcCgkZXZlbnQpXCIgKG1vdXNlbGVhdmUpPVwib25UaW1lUGlja2VyRWxlbWVudE1vdXNlTGVhdmUoKVwiIHBSaXBwbGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwaSBwaS1jaGV2cm9uLWRvd25cIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLXNlcGFyYXRvclwiICpuZ0lmPVwic2hvd1NlY29uZHNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPnt7dGltZVNlcGFyYXRvcn19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtc2Vjb25kLXBpY2tlclwiICpuZ0lmPVwic2hvd1NlY29uZHNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJwLWxpbmtcIiB0eXBlPVwiYnV0dG9uXCIgKGtleWRvd24pPVwib25Db250YWluZXJCdXR0b25LZXlkb3duKCRldmVudClcIiAoa2V5ZG93bi5lbnRlcik9XCJpbmNyZW1lbnRTZWNvbmQoJGV2ZW50KVwiIChtb3VzZWRvd24pPVwib25UaW1lUGlja2VyRWxlbWVudE1vdXNlRG93bigkZXZlbnQsIDIsIDEpXCIgKG1vdXNldXApPVwib25UaW1lUGlja2VyRWxlbWVudE1vdXNlVXAoJGV2ZW50KVwiIChtb3VzZWxlYXZlKT1cIm9uVGltZVBpY2tlckVsZW1lbnRNb3VzZUxlYXZlKClcIiBwUmlwcGxlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicGkgcGktY2hldnJvbi11cFwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+PG5nLWNvbnRhaW5lciAqbmdJZj1cImN1cnJlbnRTZWNvbmQgPCAxMFwiPjA8L25nLWNvbnRhaW5lcj57e2N1cnJlbnRTZWNvbmR9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJwLWxpbmtcIiB0eXBlPVwiYnV0dG9uXCIgKGtleWRvd24pPVwib25Db250YWluZXJCdXR0b25LZXlkb3duKCRldmVudClcIiAoa2V5ZG93bi5lbnRlcik9XCJkZWNyZW1lbnRTZWNvbmQoJGV2ZW50KVwiIChtb3VzZWRvd24pPVwib25UaW1lUGlja2VyRWxlbWVudE1vdXNlRG93bigkZXZlbnQsIDIsIC0xKVwiIChtb3VzZXVwKT1cIm9uVGltZVBpY2tlckVsZW1lbnRNb3VzZVVwKCRldmVudClcIiAobW91c2VsZWF2ZSk9XCJvblRpbWVQaWNrZXJFbGVtZW50TW91c2VMZWF2ZSgpXCIgcFJpcHBsZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInBpIHBpLWNoZXZyb24tZG93blwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtYW1wbS1waWNrZXJcIiAqbmdJZj1cImhvdXJGb3JtYXQ9PScxMidcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJwLWxpbmtcIiB0eXBlPVwiYnV0dG9uXCIgKGtleWRvd24pPVwib25Db250YWluZXJCdXR0b25LZXlkb3duKCRldmVudClcIiAoY2xpY2spPVwidG9nZ2xlQU1QTSgkZXZlbnQpXCIgKGtleWRvd24uZW50ZXIpPVwidG9nZ2xlQU1QTSgkZXZlbnQpXCIgcFJpcHBsZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInBpIHBpLWNoZXZyb24tdXBcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPnt7cG0gPyAnUE0nIDogJ0FNJ319PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInAtbGlua1wiIHR5cGU9XCJidXR0b25cIiAoa2V5ZG93bik9XCJvbkNvbnRhaW5lckJ1dHRvbktleWRvd24oJGV2ZW50KVwiIChjbGljayk9XCJ0b2dnbGVBTVBNKCRldmVudClcIiAoa2V5ZG93bi5lbnRlcik9XCJ0b2dnbGVBTVBNKCRldmVudClcIiBwUmlwcGxlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicGkgcGktY2hldnJvbi1kb3duXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLWRhdGVwaWNrZXItYnV0dG9uYmFyXCIgKm5nSWY9XCJzaG93QnV0dG9uQmFyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIFtsYWJlbF09XCJnZXRUcmFuc2xhdGlvbigndG9kYXknKVwiIChrZXlkb3duKT1cIm9uQ29udGFpbmVyQnV0dG9uS2V5ZG93bigkZXZlbnQpXCIgKGNsaWNrKT1cIm9uVG9kYXlCdXR0b25DbGljaygkZXZlbnQpXCIgcEJ1dHRvbiBwUmlwcGxlIFtuZ0NsYXNzXT1cIlt0b2RheUJ1dHRvblN0eWxlQ2xhc3NdXCI+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIFtsYWJlbF09XCJnZXRUcmFuc2xhdGlvbignY2xlYXInKVwiIChrZXlkb3duKT1cIm9uQ29udGFpbmVyQnV0dG9uS2V5ZG93bigkZXZlbnQpXCIgKGNsaWNrKT1cIm9uQ2xlYXJCdXR0b25DbGljaygkZXZlbnQpXCIgcEJ1dHRvbiBwUmlwcGxlIFtuZ0NsYXNzXT1cIltjbGVhckJ1dHRvblN0eWxlQ2xhc3NdXCI+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwicC1mb290ZXJcIj48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImZvb3RlclRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9zcGFuPlxuICAgIGAsXG4gICAgYW5pbWF0aW9uczogW1xuICAgICAgICB0cmlnZ2VyKCdvdmVybGF5QW5pbWF0aW9uJywgW1xuICAgICAgICAgICAgc3RhdGUoJ3Zpc2libGVUb3VjaFVJJywgc3R5bGUoe1xuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZSgtNTAlLC01MCUpJyxcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAxXG4gICAgICAgICAgICB9KSksXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCd2b2lkID0+IHZpc2libGUnLCBbXG4gICAgICAgICAgICAgICAgc3R5bGUoe29wYWNpdHk6IDAsIHRyYW5zZm9ybTogJ3NjYWxlWSgwLjgpJ30pLFxuICAgICAgICAgICAgICAgIGFuaW1hdGUoJ3t7c2hvd1RyYW5zaXRpb25QYXJhbXN9fScsIHN0eWxlKHsgb3BhY2l0eTogMSwgdHJhbnNmb3JtOiAnKicgfSkpXG4gICAgICAgICAgICBdKSxcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJ3Zpc2libGUgPT4gdm9pZCcsIFtcbiAgICAgICAgICAgICAgICBhbmltYXRlKCd7e2hpZGVUcmFuc2l0aW9uUGFyYW1zfX0nLCBzdHlsZSh7IG9wYWNpdHk6IDAgfSkpXG4gICAgICAgICAgICBdKSxcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJ3ZvaWQgPT4gdmlzaWJsZVRvdWNoVUknLCBbXG4gICAgICAgICAgICAgICAgc3R5bGUoe29wYWNpdHk6IDAsIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZTNkKC01MCUsIC00MCUsIDApIHNjYWxlKDAuOSknfSksXG4gICAgICAgICAgICAgICAgYW5pbWF0ZSgne3tzaG93VHJhbnNpdGlvblBhcmFtc319JylcbiAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgdHJhbnNpdGlvbigndmlzaWJsZVRvdWNoVUkgPT4gdm9pZCcsIFtcbiAgICAgICAgICAgICAgICBhbmltYXRlKCgne3toaWRlVHJhbnNpdGlvblBhcmFtc319JyksXG4gICAgICAgICAgICAgICAgc3R5bGUoe1xuICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAwLFxuICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGUzZCgtNTAlLCAtNDAlLCAwKSBzY2FsZSgwLjkpJ1xuICAgICAgICAgICAgICAgIH0pKVxuICAgICAgICAgICAgXSlcbiAgICAgICAgXSlcbiAgICBdLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1tjbGFzcy5wLWlucHV0d3JhcHBlci1maWxsZWRdJzogJ2ZpbGxlZCcsXG4gICAgICAgICdbY2xhc3MucC1pbnB1dHdyYXBwZXItZm9jdXNdJzogJ2ZvY3VzJ1xuICAgIH0sXG4gICAgcHJvdmlkZXJzOiBbQ0FMRU5EQVJfVkFMVUVfQUNDRVNTT1JdLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgc3R5bGVVcmxzOiBbJy4vY2FsZW5kYXIuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXIgaW1wbGVtZW50cyBPbkluaXQsT25EZXN0cm95LENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcblxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XG5cbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBpbnB1dFN0eWxlOiBhbnk7XG5cbiAgICBASW5wdXQoKSBpbnB1dElkOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBuYW1lOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBpbnB1dFN0eWxlQ2xhc3M6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBhcmlhTGFiZWxsZWRCeTogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgZGlzYWJsZWQ6IGFueTtcblxuICAgIEBJbnB1dCgpIGRhdGVGb3JtYXQ6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIG11bHRpcGxlU2VwYXJhdG9yOiBzdHJpbmcgPSAnLCc7XG5cbiAgICBASW5wdXQoKSByYW5nZVNlcGFyYXRvcjogc3RyaW5nID0gJy0nO1xuXG4gICAgQElucHV0KCkgaW5saW5lOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKSBzaG93T3RoZXJNb250aHM6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkgc2VsZWN0T3RoZXJNb250aHM6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSBzaG93SWNvbjogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIGljb246IHN0cmluZyA9ICdwaSBwaS1jYWxlbmRhcic7XG5cbiAgICBASW5wdXQoKSBhcHBlbmRUbzogYW55O1xuXG4gICAgQElucHV0KCkgcmVhZG9ubHlJbnB1dDogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIHNob3J0WWVhckN1dG9mZjogYW55ID0gJysxMCc7XG5cbiAgICBASW5wdXQoKSBtb250aE5hdmlnYXRvcjogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIHllYXJOYXZpZ2F0b3I6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSBob3VyRm9ybWF0OiBzdHJpbmcgPSAnMjQnO1xuXG4gICAgQElucHV0KCkgdGltZU9ubHk6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSBzdGVwSG91cjogbnVtYmVyID0gMTtcblxuICAgIEBJbnB1dCgpIHN0ZXBNaW51dGU6IG51bWJlciA9IDE7XG5cbiAgICBASW5wdXQoKSBzdGVwU2Vjb25kOiBudW1iZXIgPSAxO1xuXG4gICAgQElucHV0KCkgc2hvd1NlY29uZHM6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpIHJlcXVpcmVkOiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgc2hvd09uRm9jdXM6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkgc2hvd1dlZWs6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpIGRhdGFUeXBlOiBzdHJpbmcgPSAnZGF0ZSc7XG5cbiAgICBASW5wdXQoKSBzZWxlY3Rpb25Nb2RlOiBzdHJpbmcgPSAnc2luZ2xlJztcblxuICAgIEBJbnB1dCgpIG1heERhdGVDb3VudDogbnVtYmVyO1xuXG4gICAgQElucHV0KCkgc2hvd0J1dHRvbkJhcjogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIHRvZGF5QnV0dG9uU3R5bGVDbGFzczogc3RyaW5nID0gJ3AtYnV0dG9uLXRleHQnO1xuXG4gICAgQElucHV0KCkgY2xlYXJCdXR0b25TdHlsZUNsYXNzOiBzdHJpbmcgPSAncC1idXR0b24tdGV4dCc7XG5cbiAgICBASW5wdXQoKSBhdXRvWkluZGV4OiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpIGJhc2VaSW5kZXg6IG51bWJlciA9IDA7XG5cbiAgICBASW5wdXQoKSBwYW5lbFN0eWxlQ2xhc3M6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIHBhbmVsU3R5bGU6IGFueTtcblxuICAgIEBJbnB1dCgpIGtlZXBJbnZhbGlkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKSBoaWRlT25EYXRlVGltZVNlbGVjdDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKSBudW1iZXJPZk1vbnRoczogbnVtYmVyID0gMTtcblxuICAgIEBJbnB1dCgpIHZpZXc6IHN0cmluZyA9ICdkYXRlJztcblxuICAgIEBJbnB1dCgpIHRvdWNoVUk6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSB0aW1lU2VwYXJhdG9yOiBzdHJpbmcgPSBcIjpcIjtcblxuICAgIEBJbnB1dCgpIGZvY3VzVHJhcDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKSBmaXJzdERheU9mV2VlazogbnVtYmVyID0gMDtcblxuICAgIEBJbnB1dCgpIHNob3dUcmFuc2l0aW9uT3B0aW9uczogc3RyaW5nID0gJy4xMnMgY3ViaWMtYmV6aWVyKDAsIDAsIDAuMiwgMSknO1xuXG4gICAgQElucHV0KCkgaGlkZVRyYW5zaXRpb25PcHRpb25zOiBzdHJpbmcgPSAnLjFzIGxpbmVhcic7XG5cbiAgICBAT3V0cHV0KCkgb25Gb2N1czogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25CbHVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBvbkNsb3NlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBvblNlbGVjdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25JbnB1dDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25Ub2RheUNsaWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBvbkNsZWFyQ2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIG9uTW9udGhDaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIG9uWWVhckNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25DbGlja091dHNpZGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIG9uU2hvdzogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAQ29udGVudENoaWxkcmVuKFByaW1lVGVtcGxhdGUpIHRlbXBsYXRlczogUXVlcnlMaXN0PGFueT47XG5cbiAgICBASW5wdXQoKSB0YWJpbmRleDogbnVtYmVyO1xuXG4gICAgQFZpZXdDaGlsZCgnY29udGFpbmVyJywgeyBzdGF0aWM6IGZhbHNlIH0pIGNvbnRhaW5lclZpZXdDaGlsZDogRWxlbWVudFJlZjtcblxuICAgIEBWaWV3Q2hpbGQoJ2lucHV0ZmllbGQnLCB7IHN0YXRpYzogZmFsc2UgfSkgaW5wdXRmaWVsZFZpZXdDaGlsZDogRWxlbWVudFJlZjtcblxuICAgIEBWaWV3Q2hpbGQoJ2NvbnRlbnRXcmFwcGVyJywgeyBzdGF0aWM6IGZhbHNlIH0pIHNldCBjb250ZW50IChjb250ZW50OiBFbGVtZW50UmVmKSB7XG4gICAgICAgIHRoaXMuY29udGVudFZpZXdDaGlsZCA9IGNvbnRlbnQ7XG5cbiAgICAgICAgaWYgKHRoaXMuY29udGVudFZpZXdDaGlsZCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNNb250aE5hdmlnYXRlKSB7XG4gICAgICAgICAgICAgICAgUHJvbWlzZS5yZXNvbHZlKG51bGwpLnRoZW4oKCkgPT4gdGhpcy51cGRhdGVGb2N1cygpKTtcbiAgICAgICAgICAgICAgICB0aGlzLmlzTW9udGhOYXZpZ2F0ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbml0Rm9jdXNhYmxlQ2VsbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIGNvbnRlbnRWaWV3Q2hpbGQ6IEVsZW1lbnRSZWY7XG5cbiAgICB2YWx1ZTogYW55O1xuXG4gICAgZGF0ZXM6IGFueVtdO1xuXG4gICAgbW9udGhzOiBhbnlbXTtcblxuICAgIG1vbnRoUGlja2VyVmFsdWVzOiBhbnlbXTtcblxuICAgIHdlZWtEYXlzOiBzdHJpbmdbXTtcblxuICAgIGN1cnJlbnRNb250aDogbnVtYmVyO1xuXG4gICAgY3VycmVudFllYXI6IG51bWJlcjtcblxuICAgIGN1cnJlbnRIb3VyOiBudW1iZXI7XG5cbiAgICBjdXJyZW50TWludXRlOiBudW1iZXI7XG5cbiAgICBjdXJyZW50U2Vjb25kOiBudW1iZXI7XG5cbiAgICBwbTogYm9vbGVhbjtcblxuICAgIG1hc2s6IEhUTUxEaXZFbGVtZW50O1xuXG4gICAgbWFza0NsaWNrTGlzdGVuZXI6IEZ1bmN0aW9uO1xuXG4gICAgb3ZlcmxheTogSFRNTERpdkVsZW1lbnQ7XG5cbiAgICBvdmVybGF5VmlzaWJsZTogYm9vbGVhbjtcblxuICAgIG9uTW9kZWxDaGFuZ2U6IEZ1bmN0aW9uID0gKCkgPT4ge307XG5cbiAgICBvbk1vZGVsVG91Y2hlZDogRnVuY3Rpb24gPSAoKSA9PiB7fTtcblxuICAgIGNhbGVuZGFyRWxlbWVudDogYW55O1xuXG4gICAgdGltZVBpY2tlclRpbWVyOmFueTtcblxuICAgIGRvY3VtZW50Q2xpY2tMaXN0ZW5lcjogYW55O1xuXG4gICAgdGlja3NUbzE5NzA6IG51bWJlcjtcblxuICAgIHllYXJPcHRpb25zOiBudW1iZXJbXTtcblxuICAgIGZvY3VzOiBib29sZWFuO1xuXG4gICAgaXNLZXlkb3duOiBib29sZWFuO1xuXG4gICAgZmlsbGVkOiBib29sZWFuO1xuXG4gICAgaW5wdXRGaWVsZFZhbHVlOiBzdHJpbmcgPSBudWxsO1xuXG4gICAgX21pbkRhdGU6IERhdGU7XG5cbiAgICBfbWF4RGF0ZTogRGF0ZTtcblxuICAgIF9zaG93VGltZTogYm9vbGVhbjtcblxuICAgIF95ZWFyUmFuZ2U6IHN0cmluZztcblxuICAgIHByZXZlbnREb2N1bWVudExpc3RlbmVyOiBib29sZWFuO1xuXG4gICAgZGF0ZVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgaGVhZGVyVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBmb290ZXJUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIGRpc2FibGVkRGF0ZVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgX2Rpc2FibGVkRGF0ZXM6IEFycmF5PERhdGU+O1xuXG4gICAgX2Rpc2FibGVkRGF5czogQXJyYXk8bnVtYmVyPjtcblxuICAgIHNlbGVjdEVsZW1lbnQ6IGFueTtcblxuICAgIHRvZGF5RWxlbWVudDogYW55O1xuXG4gICAgZm9jdXNFbGVtZW50OiBhbnk7XG5cbiAgICBzY3JvbGxIYW5kbGVyOiBhbnk7XG5cbiAgICBkb2N1bWVudFJlc2l6ZUxpc3RlbmVyOiBhbnk7XG5cbiAgICBuYXZpZ2F0aW9uU3RhdGU6IGFueSA9IG51bGw7XG5cbiAgICBpc01vbnRoTmF2aWdhdGU6IGJvb2xlYW47XG5cbiAgICBpbml0aWFsaXplZDogYm9vbGVhbjtcblxuICAgIHRyYW5zbGF0aW9uU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBfbG9jYWxlOiBMb2NhbGVTZXR0aW5ncztcblxuICAgIEBJbnB1dCgpIGdldCBkZWZhdWx0RGF0ZSgpOiBEYXRlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RlZmF1bHREYXRlO1xuICAgIH07XG5cbiAgICBzZXQgZGVmYXVsdERhdGUoZGVmYXVsdERhdGU6IERhdGUpIHtcbiAgICAgICAgdGhpcy5fZGVmYXVsdERhdGUgPSBkZWZhdWx0RGF0ZTtcblxuICAgICAgICBpZiAodGhpcy5pbml0aWFsaXplZCkge1xuICAgICAgICAgICAgY29uc3QgZGF0ZSA9IGRlZmF1bHREYXRlfHxuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50TW9udGggPSBkYXRlLmdldE1vbnRoKCk7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRZZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xuICAgICAgICAgICAgdGhpcy5pbml0VGltZShkYXRlKTtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlTW9udGhzKHRoaXMuY3VycmVudE1vbnRoLCB0aGlzLmN1cnJlbnRZZWFyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9kZWZhdWx0RGF0ZTogRGF0ZTtcblxuICAgIEBJbnB1dCgpIGdldCBtaW5EYXRlKCk6IERhdGUge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWluRGF0ZTtcbiAgICB9XG5cbiAgICBzZXQgbWluRGF0ZShkYXRlOiBEYXRlKSB7XG4gICAgICAgIHRoaXMuX21pbkRhdGUgPSBkYXRlO1xuXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRNb250aCAhPSB1bmRlZmluZWQgJiYgdGhpcy5jdXJyZW50TW9udGggIT0gbnVsbCAmJiB0aGlzLmN1cnJlbnRZZWFyKSB7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZU1vbnRocyh0aGlzLmN1cnJlbnRNb250aCwgdGhpcy5jdXJyZW50WWVhcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASW5wdXQoKSBnZXQgbWF4RGF0ZSgpOiBEYXRlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21heERhdGU7XG4gICAgfVxuXG4gICAgc2V0IG1heERhdGUoZGF0ZTogRGF0ZSkge1xuICAgICAgICB0aGlzLl9tYXhEYXRlID0gZGF0ZTtcblxuICAgICAgICBpZiAodGhpcy5jdXJyZW50TW9udGggIT0gdW5kZWZpbmVkICYmIHRoaXMuY3VycmVudE1vbnRoICE9IG51bGwgICYmIHRoaXMuY3VycmVudFllYXIpIHtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlTW9udGhzKHRoaXMuY3VycmVudE1vbnRoLCB0aGlzLmN1cnJlbnRZZWFyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBJbnB1dCgpIGdldCBkaXNhYmxlZERhdGVzKCk6IERhdGVbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZERhdGVzO1xuICAgIH1cblxuICAgIHNldCBkaXNhYmxlZERhdGVzKGRpc2FibGVkRGF0ZXM6IERhdGVbXSkge1xuICAgICAgICB0aGlzLl9kaXNhYmxlZERhdGVzID0gZGlzYWJsZWREYXRlcztcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudE1vbnRoICE9IHVuZGVmaW5lZCAmJiB0aGlzLmN1cnJlbnRNb250aCAhPSBudWxsICAmJiB0aGlzLmN1cnJlbnRZZWFyKSB7XG5cbiAgICAgICAgICAgIHRoaXMuY3JlYXRlTW9udGhzKHRoaXMuY3VycmVudE1vbnRoLCB0aGlzLmN1cnJlbnRZZWFyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBJbnB1dCgpIGdldCBkaXNhYmxlZERheXMoKTogbnVtYmVyW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWREYXlzO1xuICAgIH1cblxuICAgIHNldCBkaXNhYmxlZERheXMoZGlzYWJsZWREYXlzOiBudW1iZXJbXSkge1xuICAgICAgICB0aGlzLl9kaXNhYmxlZERheXMgPSBkaXNhYmxlZERheXM7XG5cbiAgICAgICAgaWYgKHRoaXMuY3VycmVudE1vbnRoICE9IHVuZGVmaW5lZCAmJiB0aGlzLmN1cnJlbnRNb250aCAhPSBudWxsICAmJiB0aGlzLmN1cnJlbnRZZWFyKSB7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZU1vbnRocyh0aGlzLmN1cnJlbnRNb250aCwgdGhpcy5jdXJyZW50WWVhcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASW5wdXQoKSBnZXQgeWVhclJhbmdlKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl95ZWFyUmFuZ2U7XG4gICAgfVxuXG4gICAgc2V0IHllYXJSYW5nZSh5ZWFyUmFuZ2U6IHN0cmluZykge1xuICAgICAgICB0aGlzLl95ZWFyUmFuZ2UgPSB5ZWFyUmFuZ2U7XG5cbiAgICAgICAgaWYgKHllYXJSYW5nZSkge1xuICAgICAgICAgICAgY29uc3QgeWVhcnMgPSB5ZWFyUmFuZ2Uuc3BsaXQoJzonKTtcbiAgICAgICAgICAgIGNvbnN0IHllYXJTdGFydCA9IHBhcnNlSW50KHllYXJzWzBdKTtcbiAgICAgICAgICAgIGNvbnN0IHllYXJFbmQgPSBwYXJzZUludCh5ZWFyc1sxXSk7XG5cbiAgICAgICAgICAgIHRoaXMucG9wdWxhdGVZZWFyT3B0aW9ucyh5ZWFyU3RhcnQsIHllYXJFbmQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQElucHV0KCkgZ2V0IHNob3dUaW1lKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2hvd1RpbWU7XG4gICAgfVxuXG4gICAgc2V0IHNob3dUaW1lKHNob3dUaW1lOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX3Nob3dUaW1lID0gc2hvd1RpbWU7XG5cbiAgICAgICAgaWYgKHRoaXMuY3VycmVudEhvdXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5pbml0VGltZSh0aGlzLnZhbHVlfHxuZXcgRGF0ZSgpKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnVwZGF0ZUlucHV0ZmllbGQoKTtcbiAgICB9XG5cbiAgICBnZXQgbG9jYWxlKCkge1xuICAgICAgIHJldHVybiB0aGlzLl9sb2NhbGU7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBzZXQgbG9jYWxlKG5ld0xvY2FsZTogTG9jYWxlU2V0dGluZ3MpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFwiTG9jYWxlIHByb3BlcnR5IGhhcyBubyBlZmZlY3QsIHVzZSBuZXcgaTE4biBBUEkgaW5zdGVhZC5cIik7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVsOiBFbGVtZW50UmVmLCBwdWJsaWMgcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHVibGljIGNkOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHJpdmF0ZSB6b25lOiBOZ1pvbmUsIHByaXZhdGUgY29uZmlnOiBQcmltZU5HQ29uZmlnLCBwdWJsaWMgb3ZlcmxheVNlcnZpY2U6IE92ZXJsYXlTZXJ2aWNlKSB7fVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGNvbnN0IGRhdGUgPSB0aGlzLmRlZmF1bHREYXRlfHxuZXcgRGF0ZSgpO1xuICAgICAgICB0aGlzLmN1cnJlbnRNb250aCA9IGRhdGUuZ2V0TW9udGgoKTtcbiAgICAgICAgdGhpcy5jdXJyZW50WWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcblxuICAgICAgICBpZiAodGhpcy52aWV3ID09PSAnZGF0ZScpIHtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlV2Vla0RheXMoKTtcbiAgICAgICAgICAgIHRoaXMuaW5pdFRpbWUoZGF0ZSk7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZU1vbnRocyh0aGlzLmN1cnJlbnRNb250aCwgdGhpcy5jdXJyZW50WWVhcik7XG4gICAgICAgICAgICB0aGlzLnRpY2tzVG8xOTcwID0gKCgoMTk3MCAtIDEpICogMzY1ICsgTWF0aC5mbG9vcigxOTcwIC8gNCkgLSBNYXRoLmZsb29yKDE5NzAgLyAxMDApICsgTWF0aC5mbG9vcigxOTcwIC8gNDAwKSkgKiAyNCAqIDYwICogNjAgKiAxMDAwMDAwMCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy52aWV3ID09PSAnbW9udGgnKSB7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZU1vbnRoUGlja2VyVmFsdWVzKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRyYW5zbGF0aW9uU3Vic2NyaXB0aW9uID0gdGhpcy5jb25maWcudHJhbnNsYXRpb25PYnNlcnZlci5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVXZWVrRGF5cygpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGVzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAoaXRlbS5nZXRUeXBlKCkpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdkYXRlJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnZGlzYWJsZWREYXRlJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXNhYmxlZERhdGVUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdoZWFkZXInOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlYWRlclRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2Zvb3Rlcic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZm9vdGVyVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRUcmFuc2xhdGlvbihvcHRpb246IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuZ2V0VHJhbnNsYXRpb24ob3B0aW9uKTtcbiAgICB9XG5cbiAgICBwb3B1bGF0ZVllYXJPcHRpb25zKHN0YXJ0LCBlbmQpIHtcbiAgICAgICAgdGhpcy55ZWFyT3B0aW9ucyA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSBzdGFydDsgaSA8PSBlbmQ7IGkrKykge1xuICAgICAgICAgICAgdGhpcy55ZWFyT3B0aW9ucy5wdXNoKGkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY3JlYXRlV2Vla0RheXMoKSB7XG4gICAgICAgIHRoaXMud2Vla0RheXMgPSBbXTtcbiAgICAgICAgbGV0IGRheUluZGV4ID0gdGhpcy5maXJzdERheU9mV2VlaztcbiAgICAgICAgbGV0IGRheUxhYmVscyA9IHRoaXMuZ2V0VHJhbnNsYXRpb24oVHJhbnNsYXRpb25LZXlzLkRBWV9OQU1FU19NSU4pO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDc7IGkrKykge1xuICAgICAgICAgICAgdGhpcy53ZWVrRGF5cy5wdXNoKGRheUxhYmVsc1tkYXlJbmRleF0pO1xuICAgICAgICAgICAgZGF5SW5kZXggPSAoZGF5SW5kZXggPT0gNikgPyAwIDogKytkYXlJbmRleDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNyZWF0ZU1vbnRoUGlja2VyVmFsdWVzKCkge1xuICAgICAgICB0aGlzLm1vbnRoUGlja2VyVmFsdWVzID0gW107XG4gICAgICAgIGxldCBtb250aExhYmVscyA9IHRoaXMuZ2V0VHJhbnNsYXRpb24oVHJhbnNsYXRpb25LZXlzLk1PTlRIX05BTUVTX1NIT1JUKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gMTE7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5tb250aFBpY2tlclZhbHVlcy5wdXNoKG1vbnRoTGFiZWxzW2ldKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNyZWF0ZU1vbnRocyhtb250aDogbnVtYmVyLCB5ZWFyOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5tb250aHMgPSB0aGlzLm1vbnRocyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMCA7IGkgPCB0aGlzLm51bWJlck9mTW9udGhzOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBtID0gbW9udGggKyBpO1xuICAgICAgICAgICAgbGV0IHkgPSB5ZWFyO1xuICAgICAgICAgICAgaWYgKG0gPiAxMSkge1xuICAgICAgICAgICAgICAgIG0gPSBtICUgMTEgLSAxO1xuICAgICAgICAgICAgICAgIHkgPSB5ZWFyICsgMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5tb250aHMucHVzaCh0aGlzLmNyZWF0ZU1vbnRoKG0sIHkpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFdlZWtOdW1iZXIoZGF0ZTogRGF0ZSkge1xuICAgICAgICBsZXQgY2hlY2tEYXRlID0gbmV3IERhdGUoZGF0ZS5nZXRUaW1lKCkpO1xuXHRcdGNoZWNrRGF0ZS5zZXREYXRlKGNoZWNrRGF0ZS5nZXREYXRlKCkgKyA0IC0gKCBjaGVja0RhdGUuZ2V0RGF5KCkgfHwgNyApKTtcblx0XHRsZXQgdGltZSA9IGNoZWNrRGF0ZS5nZXRUaW1lKCk7XG5cdFx0Y2hlY2tEYXRlLnNldE1vbnRoKCAwICk7XG5cdFx0Y2hlY2tEYXRlLnNldERhdGUoIDEgKTtcblx0XHRyZXR1cm4gTWF0aC5mbG9vciggTWF0aC5yb3VuZCgodGltZSAtIGNoZWNrRGF0ZS5nZXRUaW1lKCkpIC8gODY0MDAwMDAgKSAvIDcgKSArIDE7XG4gICAgfVxuXG4gICAgY3JlYXRlTW9udGgobW9udGg6IG51bWJlciwgeWVhcjogbnVtYmVyKSB7XG4gICAgICAgIGxldCBkYXRlcyA9IFtdO1xuICAgICAgICBsZXQgZmlyc3REYXkgPSB0aGlzLmdldEZpcnN0RGF5T2ZNb250aEluZGV4KG1vbnRoLCB5ZWFyKTtcbiAgICAgICAgbGV0IGRheXNMZW5ndGggPSB0aGlzLmdldERheXNDb3VudEluTW9udGgobW9udGgsIHllYXIpO1xuICAgICAgICBsZXQgcHJldk1vbnRoRGF5c0xlbmd0aCA9IHRoaXMuZ2V0RGF5c0NvdW50SW5QcmV2TW9udGgobW9udGgsIHllYXIpO1xuICAgICAgICBsZXQgZGF5Tm8gPSAxO1xuICAgICAgICBsZXQgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuICAgICAgICBsZXQgd2Vla051bWJlcnMgPSBbXTtcbiAgICAgICAgbGV0IG1vbnRoUm93cyA9IE1hdGguY2VpbCgoZGF5c0xlbmd0aCArIGZpcnN0RGF5KSAvIDcpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbW9udGhSb3dzOyBpKyspIHtcbiAgICAgICAgICAgIGxldCB3ZWVrID0gW107XG5cbiAgICAgICAgICAgIGlmIChpID09IDApIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gKHByZXZNb250aERheXNMZW5ndGggLSBmaXJzdERheSArIDEpOyBqIDw9IHByZXZNb250aERheXNMZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcHJldiA9IHRoaXMuZ2V0UHJldmlvdXNNb250aEFuZFllYXIobW9udGgsIHllYXIpO1xuICAgICAgICAgICAgICAgICAgICB3ZWVrLnB1c2goe2RheTogaiwgbW9udGg6IHByZXYubW9udGgsIHllYXI6IHByZXYueWVhciwgb3RoZXJNb250aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2RheTogdGhpcy5pc1RvZGF5KHRvZGF5LCBqLCBwcmV2Lm1vbnRoLCBwcmV2LnllYXIpLCBzZWxlY3RhYmxlOiB0aGlzLmlzU2VsZWN0YWJsZShqLCBwcmV2Lm1vbnRoLCBwcmV2LnllYXIsIHRydWUpfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IHJlbWFpbmluZ0RheXNMZW5ndGggPSA3IC0gd2Vlay5sZW5ndGg7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCByZW1haW5pbmdEYXlzTGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgd2Vlay5wdXNoKHtkYXk6IGRheU5vLCBtb250aDogbW9udGgsIHllYXI6IHllYXIsIHRvZGF5OiB0aGlzLmlzVG9kYXkodG9kYXksIGRheU5vLCBtb250aCwgeWVhciksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0YWJsZTogdGhpcy5pc1NlbGVjdGFibGUoZGF5Tm8sIG1vbnRoLCB5ZWFyLCBmYWxzZSl9KTtcbiAgICAgICAgICAgICAgICAgICAgZGF5Tm8rKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDc7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGF5Tm8gPiBkYXlzTGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV4dCA9IHRoaXMuZ2V0TmV4dE1vbnRoQW5kWWVhcihtb250aCwgeWVhcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB3ZWVrLnB1c2goe2RheTogZGF5Tm8gLSBkYXlzTGVuZ3RoLCBtb250aDogbmV4dC5tb250aCwgeWVhcjogbmV4dC55ZWFyLCBvdGhlck1vbnRoOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9kYXk6IHRoaXMuaXNUb2RheSh0b2RheSwgZGF5Tm8gLSBkYXlzTGVuZ3RoLCBuZXh0Lm1vbnRoLCBuZXh0LnllYXIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0YWJsZTogdGhpcy5pc1NlbGVjdGFibGUoKGRheU5vIC0gZGF5c0xlbmd0aCksIG5leHQubW9udGgsIG5leHQueWVhciwgdHJ1ZSl9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlZWsucHVzaCh7ZGF5OiBkYXlObywgbW9udGg6IG1vbnRoLCB5ZWFyOiB5ZWFyLCB0b2RheTogdGhpcy5pc1RvZGF5KHRvZGF5LCBkYXlObywgbW9udGgsIHllYXIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGFibGU6IHRoaXMuaXNTZWxlY3RhYmxlKGRheU5vLCBtb250aCwgeWVhciwgZmFsc2UpfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBkYXlObysrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuc2hvd1dlZWspIHtcbiAgICAgICAgICAgICAgICB3ZWVrTnVtYmVycy5wdXNoKHRoaXMuZ2V0V2Vla051bWJlcihuZXcgRGF0ZSh3ZWVrWzBdLnllYXIsIHdlZWtbMF0ubW9udGgsIHdlZWtbMF0uZGF5KSkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkYXRlcy5wdXNoKHdlZWspO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG1vbnRoOiBtb250aCxcbiAgICAgICAgICAgIHllYXI6IHllYXIsXG4gICAgICAgICAgICBkYXRlczogZGF0ZXMsXG4gICAgICAgICAgICB3ZWVrTnVtYmVyczogd2Vla051bWJlcnNcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBpbml0VGltZShkYXRlOiBEYXRlKSB7XG4gICAgICAgIHRoaXMucG0gPSBkYXRlLmdldEhvdXJzKCkgPiAxMTtcblxuICAgICAgICBpZiAodGhpcy5zaG93VGltZSkge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50TWludXRlID0gZGF0ZS5nZXRNaW51dGVzKCk7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTZWNvbmQgPSBkYXRlLmdldFNlY29uZHMoKTtcbiAgICAgICAgICAgIHRoaXMuc2V0Q3VycmVudEhvdXJQTShkYXRlLmdldEhvdXJzKCkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMudGltZU9ubHkpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudE1pbnV0ZSA9IDA7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRIb3VyID0gMDtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFNlY29uZCA9IDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuYXZCYWNrd2FyZChldmVudCkge1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaXNNb250aE5hdmlnYXRlID0gdHJ1ZTtcblxuICAgICAgICBpZiAodGhpcy52aWV3ID09PSAnbW9udGgnKSB7XG4gICAgICAgICAgICB0aGlzLmRlY3JlbWVudFllYXIoKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCk9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVGb2N1cygpO1xuICAgICAgICAgICAgfSwxKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRNb250aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudE1vbnRoID0gMTE7XG4gICAgICAgICAgICAgICAgdGhpcy5kZWNyZW1lbnRZZWFyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRNb250aC0tO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLm9uTW9udGhDaGFuZ2UuZW1pdCh7IG1vbnRoOiB0aGlzLmN1cnJlbnRNb250aCArIDEsIHllYXI6IHRoaXMuY3VycmVudFllYXIgfSk7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZU1vbnRocyh0aGlzLmN1cnJlbnRNb250aCwgdGhpcy5jdXJyZW50WWVhcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuYXZGb3J3YXJkKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pc01vbnRoTmF2aWdhdGUgPSB0cnVlO1xuXG4gICAgICAgIGlmICh0aGlzLnZpZXcgPT09ICdtb250aCcpIHtcbiAgICAgICAgICAgIHRoaXMuaW5jcmVtZW50WWVhcigpO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKT0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUZvY3VzKCk7XG4gICAgICAgICAgICB9LDEpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudE1vbnRoID09PSAxMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudE1vbnRoID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLmluY3JlbWVudFllYXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudE1vbnRoKys7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMub25Nb250aENoYW5nZS5lbWl0KHttb250aDogdGhpcy5jdXJyZW50TW9udGggKyAxLCB5ZWFyOiB0aGlzLmN1cnJlbnRZZWFyfSk7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZU1vbnRocyh0aGlzLmN1cnJlbnRNb250aCwgdGhpcy5jdXJyZW50WWVhcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkZWNyZW1lbnRZZWFyKCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRZZWFyLS07XG5cbiAgICAgICAgaWYgKHRoaXMueWVhck5hdmlnYXRvciAmJiB0aGlzLmN1cnJlbnRZZWFyIDwgdGhpcy55ZWFyT3B0aW9uc1swXSkge1xuICAgICAgICAgICAgbGV0IGRpZmZlcmVuY2UgPSB0aGlzLnllYXJPcHRpb25zW3RoaXMueWVhck9wdGlvbnMubGVuZ3RoIC0gMV0gLSB0aGlzLnllYXJPcHRpb25zWzBdO1xuICAgICAgICAgICAgdGhpcy5wb3B1bGF0ZVllYXJPcHRpb25zKHRoaXMueWVhck9wdGlvbnNbMF0gLSBkaWZmZXJlbmNlLCB0aGlzLnllYXJPcHRpb25zW3RoaXMueWVhck9wdGlvbnMubGVuZ3RoIC0gMV0gLSBkaWZmZXJlbmNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGluY3JlbWVudFllYXIoKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFllYXIrKztcblxuICAgICAgICBpZiAodGhpcy55ZWFyTmF2aWdhdG9yICYmIHRoaXMuY3VycmVudFllYXIgPiB0aGlzLnllYXJPcHRpb25zW3RoaXMueWVhck9wdGlvbnMubGVuZ3RoIC0gMV0pIHtcbiAgICAgICAgICAgIGxldCBkaWZmZXJlbmNlID0gdGhpcy55ZWFyT3B0aW9uc1t0aGlzLnllYXJPcHRpb25zLmxlbmd0aCAtIDFdIC0gdGhpcy55ZWFyT3B0aW9uc1swXTtcbiAgICAgICAgICAgIHRoaXMucG9wdWxhdGVZZWFyT3B0aW9ucyh0aGlzLnllYXJPcHRpb25zWzBdICsgZGlmZmVyZW5jZSwgdGhpcy55ZWFyT3B0aW9uc1t0aGlzLnllYXJPcHRpb25zLmxlbmd0aCAtIDFdICsgZGlmZmVyZW5jZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkRhdGVTZWxlY3QoZXZlbnQsIGRhdGVNZXRhKSB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkIHx8ICFkYXRlTWV0YS5zZWxlY3RhYmxlKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaXNNdWx0aXBsZVNlbGVjdGlvbigpICYmIHRoaXMuaXNTZWxlY3RlZChkYXRlTWV0YSkpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLnZhbHVlLmZpbHRlcigoZGF0ZSwgaSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiAhdGhpcy5pc0RhdGVFcXVhbHMoZGF0ZSwgZGF0ZU1ldGEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAodGhpcy52YWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMudXBkYXRlTW9kZWwodGhpcy52YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zaG91bGRTZWxlY3REYXRlKGRhdGVNZXRhKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0RGF0ZShkYXRlTWV0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5pc1NpbmdsZVNlbGVjdGlvbigpICYmIHRoaXMuaGlkZU9uRGF0ZVRpbWVTZWxlY3QpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlT3ZlcmxheSgpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubWFzaykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpc2FibGVNb2RhbGl0eSgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICB9LCAxNTApO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy51cGRhdGVJbnB1dGZpZWxkKCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgc2hvdWxkU2VsZWN0RGF0ZShkYXRlTWV0YSkge1xuICAgICAgICBpZiAodGhpcy5pc011bHRpcGxlU2VsZWN0aW9uKCkpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tYXhEYXRlQ291bnQgIT0gbnVsbCA/wqB0aGlzLm1heERhdGVDb3VudCA+ICh0aGlzLnZhbHVlID8gdGhpcy52YWx1ZS5sZW5ndGggOiAwKSA6IHRydWU7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIG9uTW9udGhTZWxlY3QoZXZlbnQsIGluZGV4KSB7XG4gICAgICAgIGlmICghRG9tSGFuZGxlci5oYXNDbGFzcyhldmVudC50YXJnZXQsICdwLWRpc2FibGVkJykpIHtcbiAgICAgICAgICAgIHRoaXMub25EYXRlU2VsZWN0KGV2ZW50LCB7eWVhcjogdGhpcy5jdXJyZW50WWVhciwgbW9udGg6IGluZGV4LCBkYXk6IDEsIHNlbGVjdGFibGU6IHRydWV9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZUlucHV0ZmllbGQoKSB7XG4gICAgICAgIGxldCBmb3JtYXR0ZWRWYWx1ZSA9ICcnO1xuXG4gICAgICAgIGlmICh0aGlzLnZhbHVlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc1NpbmdsZVNlbGVjdGlvbigpKSB7XG4gICAgICAgICAgICAgICAgZm9ybWF0dGVkVmFsdWUgPSB0aGlzLmZvcm1hdERhdGVUaW1lKHRoaXMudmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5pc011bHRpcGxlU2VsZWN0aW9uKCkpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudmFsdWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGVBc1N0cmluZyA9IHRoaXMuZm9ybWF0RGF0ZVRpbWUodGhpcy52YWx1ZVtpXSk7XG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdHRlZFZhbHVlICs9IGRhdGVBc1N0cmluZztcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgIT09ICh0aGlzLnZhbHVlLmxlbmd0aCAtIDEpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXR0ZWRWYWx1ZSArPSB0aGlzLm11bHRpcGxlU2VwYXJhdG9yKycgJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuaXNSYW5nZVNlbGVjdGlvbigpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudmFsdWUgJiYgdGhpcy52YWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN0YXJ0RGF0ZSA9IHRoaXMudmFsdWVbMF07XG4gICAgICAgICAgICAgICAgICAgIGxldCBlbmREYXRlID0gdGhpcy52YWx1ZVsxXTtcblxuICAgICAgICAgICAgICAgICAgICBmb3JtYXR0ZWRWYWx1ZSA9IHRoaXMuZm9ybWF0RGF0ZVRpbWUoc3RhcnREYXRlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVuZERhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdHRlZFZhbHVlICs9ICcgJyt0aGlzLnJhbmdlU2VwYXJhdG9yICsnICcgKyB0aGlzLmZvcm1hdERhdGVUaW1lKGVuZERhdGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pbnB1dEZpZWxkVmFsdWUgPSBmb3JtYXR0ZWRWYWx1ZTtcbiAgICAgICAgdGhpcy51cGRhdGVGaWxsZWRTdGF0ZSgpO1xuICAgICAgICBpZiAodGhpcy5pbnB1dGZpZWxkVmlld0NoaWxkICYmIHRoaXMuaW5wdXRmaWVsZFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLmlucHV0ZmllbGRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC52YWx1ZSA9IHRoaXMuaW5wdXRGaWVsZFZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZm9ybWF0RGF0ZVRpbWUoZGF0ZSkge1xuICAgICAgICBsZXQgZm9ybWF0dGVkVmFsdWUgPSBudWxsO1xuICAgICAgICBpZiAoZGF0ZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMudGltZU9ubHkpIHtcbiAgICAgICAgICAgICAgICBmb3JtYXR0ZWRWYWx1ZSA9IHRoaXMuZm9ybWF0VGltZShkYXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGZvcm1hdHRlZFZhbHVlID0gdGhpcy5mb3JtYXREYXRlKGRhdGUsIHRoaXMuZ2V0RGF0ZUZvcm1hdCgpKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zaG93VGltZSkge1xuICAgICAgICAgICAgICAgICAgICBmb3JtYXR0ZWRWYWx1ZSArPSAnICcgKyB0aGlzLmZvcm1hdFRpbWUoZGF0ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZvcm1hdHRlZFZhbHVlO1xuICAgIH1cblxuICAgIHNldEN1cnJlbnRIb3VyUE0oaG91cnM6IG51bWJlcikge1xuICAgICAgICBpZiAodGhpcy5ob3VyRm9ybWF0ID09ICcxMicpIHtcbiAgICAgICAgICAgIHRoaXMucG0gPSBob3VycyA+IDExO1xuICAgICAgICAgICAgaWYgKGhvdXJzID49IDEyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50SG91ciA9IChob3VycyA9PSAxMikgPyAxMiA6IGhvdXJzIC0gMTI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRIb3VyID0gKGhvdXJzID09IDApID8gMTIgOiBob3VycztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEhvdXIgPSBob3VycztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNlbGVjdERhdGUoZGF0ZU1ldGEpIHtcbiAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZShkYXRlTWV0YS55ZWFyLCBkYXRlTWV0YS5tb250aCwgZGF0ZU1ldGEuZGF5KTtcblxuICAgICAgICBpZiAodGhpcy5zaG93VGltZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaG91ckZvcm1hdCA9PSAnMTInKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudEhvdXIgPT09IDEyKVxuICAgICAgICAgICAgICAgICAgICBkYXRlLnNldEhvdXJzKHRoaXMucG0gPyAxMiA6IDApO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgZGF0ZS5zZXRIb3Vycyh0aGlzLnBtID8gdGhpcy5jdXJyZW50SG91ciArIDEyIDogdGhpcy5jdXJyZW50SG91cik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBkYXRlLnNldEhvdXJzKHRoaXMuY3VycmVudEhvdXIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkYXRlLnNldE1pbnV0ZXModGhpcy5jdXJyZW50TWludXRlKTtcbiAgICAgICAgICAgIGRhdGUuc2V0U2Vjb25kcyh0aGlzLmN1cnJlbnRTZWNvbmQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubWluRGF0ZSAmJiB0aGlzLm1pbkRhdGUgPiBkYXRlKSB7XG4gICAgICAgICAgICBkYXRlID0gdGhpcy5taW5EYXRlO1xuICAgICAgICAgICAgdGhpcy5zZXRDdXJyZW50SG91clBNKGRhdGUuZ2V0SG91cnMoKSk7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRNaW51dGUgPSBkYXRlLmdldE1pbnV0ZXMoKTtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFNlY29uZCA9IGRhdGUuZ2V0U2Vjb25kcygpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubWF4RGF0ZSAmJiB0aGlzLm1heERhdGUgPCBkYXRlKSB7XG4gICAgICAgICAgICBkYXRlID0gdGhpcy5tYXhEYXRlO1xuICAgICAgICAgICAgdGhpcy5zZXRDdXJyZW50SG91clBNKGRhdGUuZ2V0SG91cnMoKSk7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRNaW51dGUgPSBkYXRlLmdldE1pbnV0ZXMoKTtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFNlY29uZCA9IGRhdGUuZ2V0U2Vjb25kcygpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaXNTaW5nbGVTZWxlY3Rpb24oKSkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVNb2RlbChkYXRlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmlzTXVsdGlwbGVTZWxlY3Rpb24oKSkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVNb2RlbCh0aGlzLnZhbHVlID8gWy4uLnRoaXMudmFsdWUsIGRhdGVdIDogW2RhdGVdKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmlzUmFuZ2VTZWxlY3Rpb24oKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMudmFsdWUgJiYgdGhpcy52YWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBsZXQgc3RhcnREYXRlID0gdGhpcy52YWx1ZVswXTtcbiAgICAgICAgICAgICAgICBsZXQgZW5kRGF0ZSA9IHRoaXMudmFsdWVbMV07XG5cbiAgICAgICAgICAgICAgICBpZiAoIWVuZERhdGUgJiYgZGF0ZS5nZXRUaW1lKCkgPj0gc3RhcnREYXRlLmdldFRpbWUoKSkge1xuICAgICAgICAgICAgICAgICAgICBlbmREYXRlID0gZGF0ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0RGF0ZSA9IGRhdGU7XG4gICAgICAgICAgICAgICAgICAgIGVuZERhdGUgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlTW9kZWwoW3N0YXJ0RGF0ZSwgZW5kRGF0ZV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVNb2RlbChbZGF0ZSwgbnVsbF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vblNlbGVjdC5lbWl0KGRhdGUpO1xuICAgIH1cblxuICAgIHVwZGF0ZU1vZGVsKHZhbHVlKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcblxuICAgICAgICBpZiAodGhpcy5kYXRhVHlwZSA9PSAnZGF0ZScpIHtcbiAgICAgICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSh0aGlzLnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmRhdGFUeXBlID09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc1NpbmdsZVNlbGVjdGlvbigpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlKHRoaXMuZm9ybWF0RGF0ZVRpbWUodGhpcy52YWx1ZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IHN0cmluZ0FyclZhbHVlID0gbnVsbDtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy52YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBzdHJpbmdBcnJWYWx1ZSA9IHRoaXMudmFsdWUubWFwKGRhdGUgPT4gdGhpcy5mb3JtYXREYXRlVGltZShkYXRlKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMub25Nb2RlbENoYW5nZShzdHJpbmdBcnJWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRGaXJzdERheU9mTW9udGhJbmRleChtb250aDogbnVtYmVyLCB5ZWFyOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGRheSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIGRheS5zZXREYXRlKDEpO1xuICAgICAgICBkYXkuc2V0TW9udGgobW9udGgpO1xuICAgICAgICBkYXkuc2V0RnVsbFllYXIoeWVhcik7XG5cbiAgICAgICAgbGV0IGRheUluZGV4ID0gZGF5LmdldERheSgpICsgdGhpcy5nZXRTdW5kYXlJbmRleCgpO1xuICAgICAgICByZXR1cm4gZGF5SW5kZXggPj0gNyA/IGRheUluZGV4IC0gNyA6IGRheUluZGV4O1xuICAgIH1cblxuICAgIGdldERheXNDb3VudEluTW9udGgobW9udGg6IG51bWJlciwgeWVhcjogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiAzMiAtIHRoaXMuZGF5bGlnaHRTYXZpbmdBZGp1c3QobmV3IERhdGUoeWVhciwgbW9udGgsIDMyKSkuZ2V0RGF0ZSgpO1xuICAgIH1cblxuICAgIGdldERheXNDb3VudEluUHJldk1vbnRoKG1vbnRoOiBudW1iZXIsIHllYXI6IG51bWJlcikge1xuICAgICAgICBsZXQgcHJldiA9IHRoaXMuZ2V0UHJldmlvdXNNb250aEFuZFllYXIobW9udGgsIHllYXIpO1xuICAgICAgICByZXR1cm4gdGhpcy5nZXREYXlzQ291bnRJbk1vbnRoKHByZXYubW9udGgsIHByZXYueWVhcik7XG4gICAgfVxuXG4gICAgZ2V0UHJldmlvdXNNb250aEFuZFllYXIobW9udGg6IG51bWJlciwgeWVhcjogbnVtYmVyKSB7XG4gICAgICAgIGxldCBtLCB5O1xuXG4gICAgICAgIGlmIChtb250aCA9PT0gMCkge1xuICAgICAgICAgICAgbSA9IDExO1xuICAgICAgICAgICAgeSA9IHllYXIgLSAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbSA9IG1vbnRoIC0gMTtcbiAgICAgICAgICAgIHkgPSB5ZWFyO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHsnbW9udGgnOm0sJ3llYXInOnl9O1xuICAgIH1cblxuICAgIGdldE5leHRNb250aEFuZFllYXIobW9udGg6IG51bWJlciwgeWVhcjogbnVtYmVyKSB7XG4gICAgICAgIGxldCBtLCB5O1xuXG4gICAgICAgIGlmIChtb250aCA9PT0gMTEpIHtcbiAgICAgICAgICAgIG0gPSAwO1xuICAgICAgICAgICAgeSA9IHllYXIgKyAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbSA9IG1vbnRoICsgMTtcbiAgICAgICAgICAgIHkgPSB5ZWFyO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHsnbW9udGgnOm0sJ3llYXInOnl9O1xuICAgIH1cblxuICAgIGdldFN1bmRheUluZGV4KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5maXJzdERheU9mV2VlayA+IDAgPyA3IC0gdGhpcy5maXJzdERheU9mV2VlayA6IDA7XG4gICAgfVxuXG4gICAgaXNTZWxlY3RlZChkYXRlTWV0YSk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodGhpcy52YWx1ZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNTaW5nbGVTZWxlY3Rpb24oKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmlzRGF0ZUVxdWFscyh0aGlzLnZhbHVlLCBkYXRlTWV0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLmlzTXVsdGlwbGVTZWxlY3Rpb24oKSkge1xuICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGRhdGUgb2YgdGhpcy52YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZCA9IHRoaXMuaXNEYXRlRXF1YWxzKGRhdGUsIGRhdGVNZXRhKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBzZWxlY3RlZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuaXNSYW5nZVNlbGVjdGlvbigpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudmFsdWVbMV0pXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmlzRGF0ZUVxdWFscyh0aGlzLnZhbHVlWzBdLCBkYXRlTWV0YSkgfHwgdGhpcy5pc0RhdGVFcXVhbHModGhpcy52YWx1ZVsxXSwgZGF0ZU1ldGEpIHx8IHRoaXMuaXNEYXRlQmV0d2Vlbih0aGlzLnZhbHVlWzBdLCB0aGlzLnZhbHVlWzFdLCBkYXRlTWV0YSk7XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pc0RhdGVFcXVhbHModGhpcy52YWx1ZVswXSwgZGF0ZU1ldGEpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc01vbnRoU2VsZWN0ZWQobW9udGg6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgZGF5ID0gdGhpcy52YWx1ZSA/IChBcnJheS5pc0FycmF5KHRoaXMudmFsdWUpID8gdGhpcy52YWx1ZVswXS5nZXREYXRlKCkgOiB0aGlzLnZhbHVlLmdldERhdGUoKSkgOiAxO1xuICAgICAgICByZXR1cm4gdGhpcy5pc1NlbGVjdGVkKHt5ZWFyOiB0aGlzLmN1cnJlbnRZZWFyLCBtb250aDogbW9udGgsIGRheTogZGF5LCBzZWxlY3RhYmxlOiB0cnVlfSk7XG4gICAgfVxuXG4gICAgaXNEYXRlRXF1YWxzKHZhbHVlLCBkYXRlTWV0YSkge1xuICAgICAgICBpZiAodmFsdWUpXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUuZ2V0RGF0ZSgpID09PSBkYXRlTWV0YS5kYXkgJiYgdmFsdWUuZ2V0TW9udGgoKSA9PT0gZGF0ZU1ldGEubW9udGggJiYgdmFsdWUuZ2V0RnVsbFllYXIoKSA9PT0gZGF0ZU1ldGEueWVhcjtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlzRGF0ZUJldHdlZW4oc3RhcnQsIGVuZCwgZGF0ZU1ldGEpIHtcbiAgICAgICAgbGV0IGJldHdlZW4gOiBib29sZWFuID0gZmFsc2U7XG4gICAgICAgIGlmIChzdGFydCAmJiBlbmQpIHtcbiAgICAgICAgICAgIGxldCBkYXRlOiBEYXRlID0gbmV3IERhdGUoZGF0ZU1ldGEueWVhciwgZGF0ZU1ldGEubW9udGgsIGRhdGVNZXRhLmRheSk7XG4gICAgICAgICAgICByZXR1cm4gc3RhcnQuZ2V0VGltZSgpIDw9IGRhdGUuZ2V0VGltZSgpICYmIGVuZC5nZXRUaW1lKCkgPj0gZGF0ZS5nZXRUaW1lKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYmV0d2VlbjtcbiAgICB9XG5cbiAgICBpc1NpbmdsZVNlbGVjdGlvbigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0aW9uTW9kZSA9PT0gJ3NpbmdsZSc7XG4gICAgfVxuXG4gICAgaXNSYW5nZVNlbGVjdGlvbigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0aW9uTW9kZSA9PT0gJ3JhbmdlJztcbiAgICB9XG5cbiAgICBpc011bHRpcGxlU2VsZWN0aW9uKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3Rpb25Nb2RlID09PSAnbXVsdGlwbGUnO1xuICAgIH1cblxuICAgIGlzVG9kYXkodG9kYXksIGRheSwgbW9udGgsIHllYXIpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRvZGF5LmdldERhdGUoKSA9PT0gZGF5ICYmIHRvZGF5LmdldE1vbnRoKCkgPT09IG1vbnRoICYmIHRvZGF5LmdldEZ1bGxZZWFyKCkgPT09IHllYXI7XG4gICAgfVxuXG4gICAgaXNTZWxlY3RhYmxlKGRheSwgbW9udGgsIHllYXIsIG90aGVyTW9udGgpOiBib29sZWFuIHtcbiAgICAgICAgbGV0IHZhbGlkTWluID0gdHJ1ZTtcbiAgICAgICAgbGV0IHZhbGlkTWF4ID0gdHJ1ZTtcbiAgICAgICAgbGV0IHZhbGlkRGF0ZSA9IHRydWU7XG4gICAgICAgIGxldCB2YWxpZERheSA9IHRydWU7XG5cbiAgICAgICAgaWYgKG90aGVyTW9udGggJiYgIXRoaXMuc2VsZWN0T3RoZXJNb250aHMpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm1pbkRhdGUpIHtcbiAgICAgICAgICAgICBpZiAodGhpcy5taW5EYXRlLmdldEZ1bGxZZWFyKCkgPiB5ZWFyKSB7XG4gICAgICAgICAgICAgICAgIHZhbGlkTWluID0gZmFsc2U7XG4gICAgICAgICAgICAgfVxuICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMubWluRGF0ZS5nZXRGdWxsWWVhcigpID09PSB5ZWFyKSB7XG4gICAgICAgICAgICAgICAgIGlmICh0aGlzLm1pbkRhdGUuZ2V0TW9udGgoKSA+IG1vbnRoKSB7XG4gICAgICAgICAgICAgICAgICAgICB2YWxpZE1pbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMubWluRGF0ZS5nZXRNb250aCgpID09PSBtb250aCkge1xuICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubWluRGF0ZS5nZXREYXRlKCkgPiBkYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZE1pbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubWF4RGF0ZSkge1xuICAgICAgICAgICAgIGlmICh0aGlzLm1heERhdGUuZ2V0RnVsbFllYXIoKSA8IHllYXIpIHtcbiAgICAgICAgICAgICAgICAgdmFsaWRNYXggPSBmYWxzZTtcbiAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5tYXhEYXRlLmdldEZ1bGxZZWFyKCkgPT09IHllYXIpIHtcbiAgICAgICAgICAgICAgICAgaWYgKHRoaXMubWF4RGF0ZS5nZXRNb250aCgpIDwgbW9udGgpIHtcbiAgICAgICAgICAgICAgICAgICAgIHZhbGlkTWF4ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5tYXhEYXRlLmdldE1vbnRoKCkgPT09IG1vbnRoKSB7XG4gICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5tYXhEYXRlLmdldERhdGUoKSA8IGRheSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkTWF4ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZERhdGVzKSB7XG4gICAgICAgICAgIHZhbGlkRGF0ZSA9ICF0aGlzLmlzRGF0ZURpc2FibGVkKGRheSxtb250aCx5ZWFyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkRGF5cykge1xuICAgICAgICAgICB2YWxpZERheSA9ICF0aGlzLmlzRGF5RGlzYWJsZWQoZGF5LG1vbnRoLHllYXIpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdmFsaWRNaW4gJiYgdmFsaWRNYXggJiYgdmFsaWREYXRlICYmIHZhbGlkRGF5O1xuICAgIH1cblxuICAgIGlzRGF0ZURpc2FibGVkKGRheTpudW1iZXIsIG1vbnRoOm51bWJlciwgeWVhcjpudW1iZXIpOmJvb2xlYW4ge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZERhdGVzKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBkaXNhYmxlZERhdGUgb2YgdGhpcy5kaXNhYmxlZERhdGVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRpc2FibGVkRGF0ZS5nZXRGdWxsWWVhcigpID09PSB5ZWFyICYmIGRpc2FibGVkRGF0ZS5nZXRNb250aCgpID09PSBtb250aCAmJiBkaXNhYmxlZERhdGUuZ2V0RGF0ZSgpID09PSBkYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlzRGF5RGlzYWJsZWQoZGF5Om51bWJlciwgbW9udGg6bnVtYmVyLCB5ZWFyOm51bWJlcik6Ym9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkRGF5cykge1xuICAgICAgICAgICAgbGV0IHdlZWtkYXkgPSBuZXcgRGF0ZSh5ZWFyLCBtb250aCwgZGF5KTtcbiAgICAgICAgICAgIGxldCB3ZWVrZGF5TnVtYmVyID0gd2Vla2RheS5nZXREYXkoKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRpc2FibGVkRGF5cy5pbmRleE9mKHdlZWtkYXlOdW1iZXIpICE9PSAtMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgb25JbnB1dEZvY3VzKGV2ZW50OiBFdmVudCkge1xuICAgICAgICB0aGlzLmZvY3VzID0gdHJ1ZTtcbiAgICAgICAgaWYgKHRoaXMuc2hvd09uRm9jdXMpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd092ZXJsYXkoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9uRm9jdXMuZW1pdChldmVudCk7XG4gICAgfVxuXG4gICAgb25JbnB1dENsaWNrKCkge1xuICAgICAgICBpZiAodGhpcy5zaG93T25Gb2N1cyAmJiAhdGhpcy5vdmVybGF5VmlzaWJsZSkge1xuICAgICAgICAgICAgdGhpcy5zaG93T3ZlcmxheSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25JbnB1dEJsdXIoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIHRoaXMuZm9jdXMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5vbkJsdXIuZW1pdChldmVudCk7XG4gICAgICAgIGlmICghdGhpcy5rZWVwSW52YWxpZCkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVJbnB1dGZpZWxkKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vbk1vZGVsVG91Y2hlZCgpO1xuICAgIH1cblxuICAgIG9uQnV0dG9uQ2xpY2soZXZlbnQsIGlucHV0ZmllbGQpIHtcbiAgICAgICAgaWYgKCF0aGlzLm92ZXJsYXlWaXNpYmxlKSB7XG4gICAgICAgICAgICBpbnB1dGZpZWxkLmZvY3VzKCk7XG4gICAgICAgICAgICB0aGlzLnNob3dPdmVybGF5KCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmhpZGVPdmVybGF5KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbk92ZXJsYXlDbGljayhldmVudCkge1xuICAgICAgICB0aGlzLm92ZXJsYXlTZXJ2aWNlLmFkZCh7XG4gICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcbiAgICAgICAgICAgIHRhcmdldDogdGhpcy5lbC5uYXRpdmVFbGVtZW50XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uUHJldkJ1dHRvbkNsaWNrKGV2ZW50KSB7XG4gICAgICAgIHRoaXMubmF2aWdhdGlvblN0YXRlID0ge2JhY2t3YXJkOiB0cnVlLCBidXR0b246IHRydWV9O1xuICAgICAgICB0aGlzLm5hdkJhY2t3YXJkKGV2ZW50KTtcbiAgICB9XG5cbiAgICBvbk5leHRCdXR0b25DbGljayhldmVudCkge1xuICAgICAgICB0aGlzLm5hdmlnYXRpb25TdGF0ZSA9IHtiYWNrd2FyZDogZmFsc2UsIGJ1dHRvbjogdHJ1ZX07XG4gICAgICAgIHRoaXMubmF2Rm9yd2FyZChldmVudCk7XG4gICAgfVxuXG4gICAgb25Db250YWluZXJCdXR0b25LZXlkb3duKGV2ZW50KSB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQud2hpY2gpIHtcbiAgICAgICAgICAgLy90YWJcbiAgICAgICAgICAgY2FzZSA5OlxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pbmxpbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFwRm9jdXMoZXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgLy9lc2NhcGVcbiAgICAgICAgICAgY2FzZSAyNzpcbiAgICAgICAgICAgICAgIHRoaXMub3ZlcmxheVZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAvL05vb3BcbiAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgIH1cblxuICAgIG9uSW5wdXRLZXlkb3duKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuaXNLZXlkb3duID0gdHJ1ZTtcbiAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDQwICYmIHRoaXMuY29udGVudFZpZXdDaGlsZCkge1xuICAgICAgICAgICAgdGhpcy50cmFwRm9jdXMoZXZlbnQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGV2ZW50LmtleUNvZGUgPT09IDI3KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5vdmVybGF5VmlzaWJsZSkge1xuICAgICAgICAgICAgICAgIHRoaXMub3ZlcmxheVZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGV2ZW50LmtleUNvZGUgPT09IDEzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5vdmVybGF5VmlzaWJsZSkge1xuICAgICAgICAgICAgICAgIHRoaXMub3ZlcmxheVZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGV2ZW50LmtleUNvZGUgPT09IDkgJiYgdGhpcy5jb250ZW50Vmlld0NoaWxkKSB7XG4gICAgICAgICAgICBEb21IYW5kbGVyLmdldEZvY3VzYWJsZUVsZW1lbnRzKHRoaXMuY29udGVudFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KS5mb3JFYWNoKGVsID0+IGVsLnRhYkluZGV4ID0gJy0xJyk7XG4gICAgICAgICAgICBpZiAodGhpcy5vdmVybGF5VmlzaWJsZSkge1xuICAgICAgICAgICAgICAgIHRoaXMub3ZlcmxheVZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uRGF0ZUNlbGxLZXlkb3duKGV2ZW50LCBkYXRlLCBncm91cEluZGV4KSB7XG4gICAgICAgIGNvbnN0IGNlbGxDb250ZW50ID0gZXZlbnQuY3VycmVudFRhcmdldDtcbiAgICAgICAgY29uc3QgY2VsbCA9IGNlbGxDb250ZW50LnBhcmVudEVsZW1lbnQ7XG5cbiAgICAgICAgc3dpdGNoIChldmVudC53aGljaCkge1xuICAgICAgICAgICAgLy9kb3duIGFycm93XG4gICAgICAgICAgICBjYXNlIDQwOiB7XG4gICAgICAgICAgICAgICAgY2VsbENvbnRlbnQudGFiSW5kZXggPSAnLTEnO1xuICAgICAgICAgICAgICAgIGxldCBjZWxsSW5kZXggPSBEb21IYW5kbGVyLmluZGV4KGNlbGwpO1xuICAgICAgICAgICAgICAgIGxldCBuZXh0Um93ID0gY2VsbC5wYXJlbnRFbGVtZW50Lm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgICAgICAgICBpZiAobmV4dFJvdykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZm9jdXNDZWxsID0gbmV4dFJvdy5jaGlsZHJlbltjZWxsSW5kZXhdLmNoaWxkcmVuWzBdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoRG9tSGFuZGxlci5oYXNDbGFzcyhmb2N1c0NlbGwsICdwLWRpc2FibGVkJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmF2aWdhdGlvblN0YXRlID0ge2JhY2t3YXJkOiBmYWxzZX07XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5hdkZvcndhcmQoZXZlbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dFJvdy5jaGlsZHJlbltjZWxsSW5kZXhdLmNoaWxkcmVuWzBdLnRhYkluZGV4ID0gJzAnO1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dFJvdy5jaGlsZHJlbltjZWxsSW5kZXhdLmNoaWxkcmVuWzBdLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmF2aWdhdGlvblN0YXRlID0ge2JhY2t3YXJkOiBmYWxzZX07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmF2Rm9yd2FyZChldmVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vdXAgYXJyb3dcbiAgICAgICAgICAgIGNhc2UgMzg6IHtcbiAgICAgICAgICAgICAgICBjZWxsQ29udGVudC50YWJJbmRleCA9ICctMSc7XG4gICAgICAgICAgICAgICAgbGV0IGNlbGxJbmRleCA9IERvbUhhbmRsZXIuaW5kZXgoY2VsbCk7XG4gICAgICAgICAgICAgICAgbGV0IHByZXZSb3cgPSBjZWxsLnBhcmVudEVsZW1lbnQucHJldmlvdXNFbGVtZW50U2libGluZztcbiAgICAgICAgICAgICAgICBpZiAocHJldlJvdykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZm9jdXNDZWxsID0gcHJldlJvdy5jaGlsZHJlbltjZWxsSW5kZXhdLmNoaWxkcmVuWzBdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoRG9tSGFuZGxlci5oYXNDbGFzcyhmb2N1c0NlbGwsICdwLWRpc2FibGVkJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmF2aWdhdGlvblN0YXRlID0ge2JhY2t3YXJkOiB0cnVlfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmF2QmFja3dhcmQoZXZlbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9jdXNDZWxsLnRhYkluZGV4ID0gJzAnO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9jdXNDZWxsLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmF2aWdhdGlvblN0YXRlID0ge2JhY2t3YXJkOiB0cnVlfTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uYXZCYWNrd2FyZChldmVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vbGVmdCBhcnJvd1xuICAgICAgICAgICAgY2FzZSAzNzoge1xuICAgICAgICAgICAgICAgIGNlbGxDb250ZW50LnRhYkluZGV4ID0gJy0xJztcbiAgICAgICAgICAgICAgICBsZXQgcHJldkNlbGwgPSBjZWxsLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgaWYgKHByZXZDZWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBmb2N1c0NlbGwgPSBwcmV2Q2VsbC5jaGlsZHJlblswXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKERvbUhhbmRsZXIuaGFzQ2xhc3MoZm9jdXNDZWxsLCAncC1kaXNhYmxlZCcpIHx8IERvbUhhbmRsZXIuaGFzQ2xhc3MoZm9jdXNDZWxsLnBhcmVudEVsZW1lbnQsICdwLWRhdGVwaWNrZXItd2Vla251bWJlcicpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRlVG9Nb250aCh0cnVlLCBncm91cEluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvY3VzQ2VsbC50YWJJbmRleCA9ICcwJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvY3VzQ2VsbC5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRlVG9Nb250aCh0cnVlLCBncm91cEluZGV4KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9yaWdodCBhcnJvd1xuICAgICAgICAgICAgY2FzZSAzOToge1xuICAgICAgICAgICAgICAgIGNlbGxDb250ZW50LnRhYkluZGV4ID0gJy0xJztcbiAgICAgICAgICAgICAgICBsZXQgbmV4dENlbGwgPSBjZWxsLm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgICAgICAgICBpZiAobmV4dENlbGwpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZvY3VzQ2VsbCA9IG5leHRDZWxsLmNoaWxkcmVuWzBdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoRG9tSGFuZGxlci5oYXNDbGFzcyhmb2N1c0NlbGwsICdwLWRpc2FibGVkJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmF2aWdhdGVUb01vbnRoKGZhbHNlLCBncm91cEluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvY3VzQ2VsbC50YWJJbmRleCA9ICcwJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvY3VzQ2VsbC5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRlVG9Nb250aChmYWxzZSwgZ3JvdXBJbmRleCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vZW50ZXJcbiAgICAgICAgICAgIGNhc2UgMTM6IHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uRGF0ZVNlbGVjdChldmVudCwgZGF0ZSk7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9lc2NhcGVcbiAgICAgICAgICAgIGNhc2UgMjc6IHtcbiAgICAgICAgICAgICAgICB0aGlzLm92ZXJsYXlWaXNpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy90YWJcbiAgICAgICAgICAgIGNhc2UgOToge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pbmxpbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFwRm9jdXMoZXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAvL25vIG9wXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uTW9udGhDZWxsS2V5ZG93bihldmVudCwgaW5kZXgpIHtcbiAgICAgICAgY29uc3QgY2VsbCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQud2hpY2gpIHtcbiAgICAgICAgICAgIC8vYXJyb3dzXG4gICAgICAgICAgICBjYXNlIDM4OlxuICAgICAgICAgICAgY2FzZSA0MDoge1xuICAgICAgICAgICAgICAgIGNlbGwudGFiSW5kZXggPSAnLTEnO1xuICAgICAgICAgICAgICAgIHZhciBjZWxscyA9IGNlbGwucGFyZW50RWxlbWVudC5jaGlsZHJlbjtcbiAgICAgICAgICAgICAgICB2YXIgY2VsbEluZGV4ID0gRG9tSGFuZGxlci5pbmRleChjZWxsKTtcbiAgICAgICAgICAgICAgICBsZXQgbmV4dENlbGwgPSBjZWxsc1tldmVudC53aGljaCA9PT0gNDAgPyBjZWxsSW5kZXggKyAzIDogY2VsbEluZGV4IC0zXTtcbiAgICAgICAgICAgICAgICBpZiAobmV4dENlbGwpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dENlbGwudGFiSW5kZXggPSAnMCc7XG4gICAgICAgICAgICAgICAgICAgIG5leHRDZWxsLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vbGVmdCBhcnJvd1xuICAgICAgICAgICAgY2FzZSAzNzoge1xuICAgICAgICAgICAgICAgIGNlbGwudGFiSW5kZXggPSAnLTEnO1xuICAgICAgICAgICAgICAgIGxldCBwcmV2Q2VsbCA9IGNlbGwucHJldmlvdXNFbGVtZW50U2libGluZztcbiAgICAgICAgICAgICAgICBpZiAocHJldkNlbGwpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJldkNlbGwudGFiSW5kZXggPSAnMCc7XG4gICAgICAgICAgICAgICAgICAgIHByZXZDZWxsLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vcmlnaHQgYXJyb3dcbiAgICAgICAgICAgIGNhc2UgMzk6IHtcbiAgICAgICAgICAgICAgICBjZWxsLnRhYkluZGV4ID0gJy0xJztcbiAgICAgICAgICAgICAgICBsZXQgbmV4dENlbGwgPSBjZWxsLm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgICAgICAgICBpZiAobmV4dENlbGwpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dENlbGwudGFiSW5kZXggPSAnMCc7XG4gICAgICAgICAgICAgICAgICAgIG5leHRDZWxsLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vZW50ZXJcbiAgICAgICAgICAgIGNhc2UgMTM6IHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uTW9udGhTZWxlY3QoZXZlbnQsIGluZGV4KTtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL2VzY2FwZVxuICAgICAgICAgICAgY2FzZSAyNzoge1xuICAgICAgICAgICAgICAgIHRoaXMub3ZlcmxheVZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL3RhYlxuICAgICAgICAgICAgY2FzZSA5OiB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlubGluZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyYXBGb2N1cyhldmVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIC8vbm8gb3BcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmF2aWdhdGVUb01vbnRoKHByZXYsIGdyb3VwSW5kZXgpIHtcbiAgICAgICAgaWYgKHByZXYpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm51bWJlck9mTW9udGhzID09PSAxIHx8IChncm91cEluZGV4ID09PSAwKSkge1xuICAgICAgICAgICAgICAgIHRoaXMubmF2aWdhdGlvblN0YXRlID0ge2JhY2t3YXJkOiB0cnVlfTtcbiAgICAgICAgICAgICAgICB0aGlzLm5hdkJhY2t3YXJkKGV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCBwcmV2TW9udGhDb250YWluZXIgPSB0aGlzLmNvbnRlbnRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5jaGlsZHJlbltncm91cEluZGV4IC0gMV07XG4gICAgICAgICAgICAgICAgbGV0IGNlbGxzID0gRG9tSGFuZGxlci5maW5kKHByZXZNb250aENvbnRhaW5lciwgJy5wLWRhdGVwaWNrZXItY2FsZW5kYXIgdGQgc3Bhbjpub3QoLnAtZGlzYWJsZWQpOm5vdCgucC1pbmspJyk7XG4gICAgICAgICAgICAgICAgbGV0IGZvY3VzQ2VsbCA9IGNlbGxzW2NlbGxzLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgICAgIGZvY3VzQ2VsbC50YWJJbmRleCA9ICcwJztcbiAgICAgICAgICAgICAgICBmb2N1c0NlbGwuZm9jdXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm51bWJlck9mTW9udGhzID09PSAxIHx8IChncm91cEluZGV4ID09PSB0aGlzLm51bWJlck9mTW9udGhzIC0gMSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRpb25TdGF0ZSA9IHtiYWNrd2FyZDogZmFsc2V9O1xuICAgICAgICAgICAgICAgIHRoaXMubmF2Rm9yd2FyZChldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgbmV4dE1vbnRoQ29udGFpbmVyID0gdGhpcy5jb250ZW50Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bZ3JvdXBJbmRleCArIDFdO1xuICAgICAgICAgICAgICAgIGxldCBmb2N1c0NlbGwgPSBEb21IYW5kbGVyLmZpbmRTaW5nbGUobmV4dE1vbnRoQ29udGFpbmVyLCAnLnAtZGF0ZXBpY2tlci1jYWxlbmRhciB0ZCBzcGFuOm5vdCgucC1kaXNhYmxlZCk6bm90KC5wLWluayknKTtcbiAgICAgICAgICAgICAgICBmb2N1c0NlbGwudGFiSW5kZXggPSAnMCc7XG4gICAgICAgICAgICAgICAgZm9jdXNDZWxsLmZvY3VzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVGb2N1cygpIHtcbiAgICAgICAgbGV0IGNlbGw7XG4gICAgICAgIGlmICh0aGlzLm5hdmlnYXRpb25TdGF0ZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMubmF2aWdhdGlvblN0YXRlLmJ1dHRvbikge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5pdEZvY3VzYWJsZUNlbGwoKTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm5hdmlnYXRpb25TdGF0ZS5iYWNrd2FyZClcbiAgICAgICAgICAgICAgICAgICAgRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMuY29udGVudFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LCAnLnAtZGF0ZXBpY2tlci1wcmV2JykuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuZmluZFNpbmdsZSh0aGlzLmNvbnRlbnRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCwgJy5wLWRhdGVwaWNrZXItbmV4dCcpLmZvY3VzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5uYXZpZ2F0aW9uU3RhdGUuYmFja3dhcmQpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNlbGxzID0gRG9tSGFuZGxlci5maW5kKHRoaXMuY29udGVudFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LCAnLnAtZGF0ZXBpY2tlci1jYWxlbmRhciB0ZCBzcGFuOm5vdCgucC1kaXNhYmxlZCk6bm90KC5wLWluayknKTtcbiAgICAgICAgICAgICAgICAgICAgY2VsbCA9IGNlbGxzW2NlbGxzLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY2VsbCA9IERvbUhhbmRsZXIuZmluZFNpbmdsZSh0aGlzLmNvbnRlbnRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCwgJy5wLWRhdGVwaWNrZXItY2FsZW5kYXIgdGQgc3Bhbjpub3QoLnAtZGlzYWJsZWQpOm5vdCgucC1pbmspJyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGNlbGwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2VsbC50YWJJbmRleCA9ICcwJztcbiAgICAgICAgICAgICAgICAgICAgY2VsbC5mb2N1cygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5uYXZpZ2F0aW9uU3RhdGUgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5pbml0Rm9jdXNhYmxlQ2VsbCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5pdEZvY3VzYWJsZUNlbGwoKSB7XG4gICAgICAgIGxldCBjZWxsO1xuICAgICAgICBpZiAodGhpcy52aWV3ID09PSAnbW9udGgnKSB7XG4gICAgICAgICAgICBsZXQgY2VsbHMgPSBEb21IYW5kbGVyLmZpbmQodGhpcy5jb250ZW50Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQsICcucC1tb250aHBpY2tlciAucC1tb250aHBpY2tlci1tb250aDpub3QoLnAtZGlzYWJsZWQpJyk7XG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWRDZWxsPSBEb21IYW5kbGVyLmZpbmRTaW5nbGUodGhpcy5jb250ZW50Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQsICcucC1tb250aHBpY2tlciAucC1tb250aHBpY2tlci1tb250aC5wLWhpZ2hsaWdodCcpO1xuICAgICAgICAgICAgY2VsbHMuZm9yRWFjaChjZWxsID0+IGNlbGwudGFiSW5kZXggPSAtMSk7XG4gICAgICAgICAgICBjZWxsID0gc2VsZWN0ZWRDZWxsIHx8IGNlbGxzWzBdO1xuXG4gICAgICAgICAgICBpZiAoY2VsbHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgbGV0IGRpc2FibGVkQ2VsbHMgPSBEb21IYW5kbGVyLmZpbmQodGhpcy5jb250ZW50Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQsICcucC1tb250aHBpY2tlciAucC1tb250aHBpY2tlci1tb250aC5wLWRpc2FibGVkW3RhYmluZGV4ID0gXCIwXCJdJyk7XG4gICAgICAgICAgICAgICAgZGlzYWJsZWRDZWxscy5mb3JFYWNoKGNlbGwgPT4gY2VsbC50YWJJbmRleCA9IC0xKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNlbGwgPSBEb21IYW5kbGVyLmZpbmRTaW5nbGUodGhpcy5jb250ZW50Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQsICdzcGFuLnAtaGlnaGxpZ2h0Jyk7XG4gICAgICAgICAgICBpZiAoIWNlbGwpIHtcbiAgICAgICAgICAgICAgICBsZXQgdG9kYXlDZWxsID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMuY29udGVudFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LCAndGQucC1kYXRlcGlja2VyLXRvZGF5IHNwYW46bm90KC5wLWRpc2FibGVkKTpub3QoLnAtaW5rKScpO1xuICAgICAgICAgICAgICAgIGlmICh0b2RheUNlbGwpXG4gICAgICAgICAgICAgICAgICAgIGNlbGwgPSB0b2RheUNlbGw7XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBjZWxsID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMuY29udGVudFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LCAnLnAtZGF0ZXBpY2tlci1jYWxlbmRhciB0ZCBzcGFuOm5vdCgucC1kaXNhYmxlZCk6bm90KC5wLWluayknKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjZWxsKSB7XG4gICAgICAgICAgICBjZWxsLnRhYkluZGV4ID0gJzAnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdHJhcEZvY3VzKGV2ZW50KSB7XG4gICAgICAgIGxldCBmb2N1c2FibGVFbGVtZW50cyA9IERvbUhhbmRsZXIuZ2V0Rm9jdXNhYmxlRWxlbWVudHModGhpcy5jb250ZW50Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQpO1xuXG4gICAgICAgIGlmIChmb2N1c2FibGVFbGVtZW50cyAmJiBmb2N1c2FibGVFbGVtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBpZiAoIWZvY3VzYWJsZUVsZW1lbnRzWzBdLm93bmVyRG9jdW1lbnQuYWN0aXZlRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIGZvY3VzYWJsZUVsZW1lbnRzWzBdLmZvY3VzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgZm9jdXNlZEluZGV4ID0gZm9jdXNhYmxlRWxlbWVudHMuaW5kZXhPZihmb2N1c2FibGVFbGVtZW50c1swXS5vd25lckRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LnNoaWZ0S2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmb2N1c2VkSW5kZXggPT0gLTEgfHwgZm9jdXNlZEluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5mb2N1c1RyYXApe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvY3VzYWJsZUVsZW1lbnRzW2ZvY3VzYWJsZUVsZW1lbnRzLmxlbmd0aCAtIDFdLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZm9jdXNlZEluZGV4ID09PSAtMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGlkZU92ZXJsYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChmb2N1c2VkSW5kZXggPT09IDApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvY3VzYWJsZUVsZW1lbnRzW2ZvY3VzZWRJbmRleCAtIDFdLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmb2N1c2VkSW5kZXggPT0gLTEgfHwgZm9jdXNlZEluZGV4ID09PSAoZm9jdXNhYmxlRWxlbWVudHMubGVuZ3RoIC0gMSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5mb2N1c1RyYXAgJiYgZm9jdXNlZEluZGV4ICE9IC0xKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmhpZGVPdmVybGF5KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9jdXNhYmxlRWxlbWVudHNbMF0uZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvY3VzYWJsZUVsZW1lbnRzW2ZvY3VzZWRJbmRleCArIDFdLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIG9uTW9udGhEcm9wZG93bkNoYW5nZShtOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50TW9udGggPSBwYXJzZUludChtKTtcbiAgICAgICAgdGhpcy5vbk1vbnRoQ2hhbmdlLmVtaXQoeyBtb250aDogdGhpcy5jdXJyZW50TW9udGggKyAxLCB5ZWFyOiB0aGlzLmN1cnJlbnRZZWFyIH0pO1xuICAgICAgICB0aGlzLmNyZWF0ZU1vbnRocyh0aGlzLmN1cnJlbnRNb250aCwgdGhpcy5jdXJyZW50WWVhcik7XG4gICAgfVxuXG4gICAgb25ZZWFyRHJvcGRvd25DaGFuZ2UoeTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFllYXIgPSBwYXJzZUludCh5KTtcbiAgICAgICAgdGhpcy5vblllYXJDaGFuZ2UuZW1pdCh7IG1vbnRoOiB0aGlzLmN1cnJlbnRNb250aCArIDEsIHllYXI6IHRoaXMuY3VycmVudFllYXIgfSk7XG4gICAgICAgIHRoaXMuY3JlYXRlTW9udGhzKHRoaXMuY3VycmVudE1vbnRoLCB0aGlzLmN1cnJlbnRZZWFyKTtcbiAgICB9XG5cbiAgICBjb252ZXJ0VG8yNEhvdXIgPSBmdW5jdGlvbiAoaG91cnM6IG51bWJlciwgcG06IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKHRoaXMuaG91ckZvcm1hdCA9PSAnMTInKSB7XG4gICAgICAgICAgICBpZiAoaG91cnMgPT09IDEyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChwbSA/IDEyIDogMCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiAocG0gPyBob3VycyArIDEyIDogaG91cnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBob3VycztcbiAgICB9XG5cbiAgICB2YWxpZGF0ZVRpbWUoaG91cjogbnVtYmVyLCBtaW51dGU6IG51bWJlciwgc2Vjb25kOiBudW1iZXIsIHBtOiBib29sZWFuKSB7XG4gICAgICAgIGxldCB2YWx1ZSA9IHRoaXMudmFsdWU7XG4gICAgICAgIGNvbnN0IGNvbnZlcnRlZEhvdXIgPSB0aGlzLmNvbnZlcnRUbzI0SG91cihob3VyLCBwbSk7XG4gICAgICAgIGlmICh0aGlzLmlzUmFuZ2VTZWxlY3Rpb24oKSkge1xuICAgICAgICAgICAgdmFsdWUgPSB0aGlzLnZhbHVlWzFdIHx8IHRoaXMudmFsdWVbMF07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaXNNdWx0aXBsZVNlbGVjdGlvbigpKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IHRoaXMudmFsdWVbdGhpcy52YWx1ZS5sZW5ndGggLSAxXTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB2YWx1ZURhdGVTdHJpbmcgPSB2YWx1ZSA/IHZhbHVlLnRvRGF0ZVN0cmluZygpIDogbnVsbDtcbiAgICAgICAgaWYgKHRoaXMubWluRGF0ZSAmJiB2YWx1ZURhdGVTdHJpbmcgJiYgdGhpcy5taW5EYXRlLnRvRGF0ZVN0cmluZygpID09PSB2YWx1ZURhdGVTdHJpbmcpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm1pbkRhdGUuZ2V0SG91cnMoKSA+IGNvbnZlcnRlZEhvdXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5taW5EYXRlLmdldEhvdXJzKCkgPT09IGNvbnZlcnRlZEhvdXIpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5taW5EYXRlLmdldE1pbnV0ZXMoKSA+IG1pbnV0ZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1pbkRhdGUuZ2V0TWludXRlcygpID09PSBtaW51dGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubWluRGF0ZS5nZXRTZWNvbmRzKCkgPiBzZWNvbmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5tYXhEYXRlICYmIHZhbHVlRGF0ZVN0cmluZyAmJiB0aGlzLm1heERhdGUudG9EYXRlU3RyaW5nKCkgPT09IHZhbHVlRGF0ZVN0cmluZykge1xuICAgICAgICAgICAgaWYgKHRoaXMubWF4RGF0ZS5nZXRIb3VycygpIDwgY29udmVydGVkSG91cikge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLm1heERhdGUuZ2V0SG91cnMoKSA9PT0gY29udmVydGVkSG91cikge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1heERhdGUuZ2V0TWludXRlcygpIDwgbWludXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubWF4RGF0ZS5nZXRNaW51dGVzKCkgPT09IG1pbnV0ZSkge1xuICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubWF4RGF0ZS5nZXRTZWNvbmRzKCkgPCBzZWNvbmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuXG4gICAgaW5jcmVtZW50SG91cihldmVudCkge1xuICAgICAgICBjb25zdCBwcmV2SG91ciA9IHRoaXMuY3VycmVudEhvdXI7XG4gICAgICAgIGxldCBuZXdIb3VyID0gdGhpcy5jdXJyZW50SG91ciArIHRoaXMuc3RlcEhvdXI7XG4gICAgICAgIGxldCBuZXdQTSA9IHRoaXMucG07XG5cbiAgICAgICAgaWYgKHRoaXMuaG91ckZvcm1hdCA9PSAnMjQnKVxuICAgICAgICAgICAgbmV3SG91ciA9IChuZXdIb3VyID49IDI0KSA/IChuZXdIb3VyIC0gMjQpIDogbmV3SG91cjtcbiAgICAgICAgZWxzZSBpZiAodGhpcy5ob3VyRm9ybWF0ID09ICcxMicpIHtcbiAgICAgICAgICAgIC8vIEJlZm9yZSB0aGUgQU0vUE0gYnJlYWssIG5vdyBhZnRlclxuICAgICAgICAgICAgaWYgKHByZXZIb3VyIDwgMTIgJiYgbmV3SG91ciA+IDExKSB7XG4gICAgICAgICAgICAgICAgbmV3UE09ICF0aGlzLnBtO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbmV3SG91ciA9IChuZXdIb3VyID49IDEzKSA/IChuZXdIb3VyIC0gMTIpIDogbmV3SG91cjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnZhbGlkYXRlVGltZShuZXdIb3VyLCB0aGlzLmN1cnJlbnRNaW51dGUsIHRoaXMuY3VycmVudFNlY29uZCwgbmV3UE0pKSB7XG4gICAgICAgICAgdGhpcy5jdXJyZW50SG91ciA9IG5ld0hvdXI7XG4gICAgICAgICAgdGhpcy5wbSA9IG5ld1BNO1xuICAgICAgICB9XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgb25UaW1lUGlja2VyRWxlbWVudE1vdXNlRG93bihldmVudDogRXZlbnQsIHR5cGU6IG51bWJlciwgZGlyZWN0aW9uOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLnJlcGVhdChldmVudCwgbnVsbCwgdHlwZSwgZGlyZWN0aW9uKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblRpbWVQaWNrZXJFbGVtZW50TW91c2VVcChldmVudDogRXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyVGltZVBpY2tlclRpbWVyKCk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVRpbWUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uVGltZVBpY2tlckVsZW1lbnRNb3VzZUxlYXZlKCkge1xuICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZWQgJiYgdGhpcy50aW1lUGlja2VyVGltZXIpIHtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJUaW1lUGlja2VyVGltZXIoKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVGltZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVwZWF0KGV2ZW50OiBFdmVudCwgaW50ZXJ2YWw6IG51bWJlciwgdHlwZTogbnVtYmVyLCBkaXJlY3Rpb246IG51bWJlcikge1xuICAgICAgICBsZXQgaSA9IGludGVydmFsfHw1MDA7XG5cbiAgICAgICAgdGhpcy5jbGVhclRpbWVQaWNrZXJUaW1lcigpO1xuICAgICAgICB0aGlzLnRpbWVQaWNrZXJUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZXBlYXQoZXZlbnQsIDEwMCwgdHlwZSwgZGlyZWN0aW9uKTtcbiAgICAgICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH0sIGkpO1xuXG4gICAgICAgIHN3aXRjaCh0eXBlKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gMSlcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmNyZW1lbnRIb3VyKGV2ZW50KTtcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVjcmVtZW50SG91cihldmVudCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIGlmIChkaXJlY3Rpb24gPT09IDEpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5jcmVtZW50TWludXRlKGV2ZW50KTtcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVjcmVtZW50TWludXRlKGV2ZW50KTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gMSlcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmNyZW1lbnRTZWNvbmQoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWNyZW1lbnRTZWNvbmQoZXZlbnQpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnVwZGF0ZUlucHV0ZmllbGQoKTtcbiAgICB9XG5cbiAgICBjbGVhclRpbWVQaWNrZXJUaW1lcigpIHtcbiAgICAgICAgaWYgKHRoaXMudGltZVBpY2tlclRpbWVyKSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lUGlja2VyVGltZXIpO1xuICAgICAgICAgICAgdGhpcy50aW1lUGlja2VyVGltZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGVjcmVtZW50SG91cihldmVudCkge1xuICAgICAgICBsZXQgbmV3SG91ciA9IHRoaXMuY3VycmVudEhvdXIgLSB0aGlzLnN0ZXBIb3VyO1xuICAgICAgICBsZXQgbmV3UE0gPSB0aGlzLnBtXG5cbiAgICAgICAgaWYgKHRoaXMuaG91ckZvcm1hdCA9PSAnMjQnKVxuICAgICAgICAgICAgbmV3SG91ciA9IChuZXdIb3VyIDwgMCkgPyAoMjQgKyBuZXdIb3VyKSA6IG5ld0hvdXI7XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuaG91ckZvcm1hdCA9PSAnMTInKSB7XG4gICAgICAgICAgICAvLyBJZiB3ZSB3ZXJlIGF0IG5vb24vbWlkbmlnaHQsIHRoZW4gc3dpdGNoXG4gICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50SG91ciA9PT0gMTIpIHtcbiAgICAgICAgICAgICAgICBuZXdQTSA9ICF0aGlzLnBtO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbmV3SG91ciA9IChuZXdIb3VyIDw9IDApID8gKDEyICsgbmV3SG91cikgOiBuZXdIb3VyO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMudmFsaWRhdGVUaW1lKG5ld0hvdXIsIHRoaXMuY3VycmVudE1pbnV0ZSwgdGhpcy5jdXJyZW50U2Vjb25kLCBuZXdQTSkpIHtcbiAgICAgICAgICB0aGlzLmN1cnJlbnRIb3VyID0gbmV3SG91cjtcbiAgICAgICAgICB0aGlzLnBtID0gbmV3UE07XG4gICAgICAgIH1cblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIGluY3JlbWVudE1pbnV0ZShldmVudCkge1xuICAgICAgICBsZXQgbmV3TWludXRlID0gdGhpcy5jdXJyZW50TWludXRlICsgdGhpcy5zdGVwTWludXRlO1xuICAgICAgICBuZXdNaW51dGUgPSAobmV3TWludXRlID4gNTkpID8gbmV3TWludXRlIC0gNjAgOiBuZXdNaW51dGU7XG4gICAgICAgIGlmICh0aGlzLnZhbGlkYXRlVGltZSh0aGlzLmN1cnJlbnRIb3VyLCBuZXdNaW51dGUsIHRoaXMuY3VycmVudFNlY29uZCwgdGhpcy5wbSkpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudE1pbnV0ZSA9IG5ld01pbnV0ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgZGVjcmVtZW50TWludXRlKGV2ZW50KSB7XG4gICAgICAgIGxldCBuZXdNaW51dGUgPSB0aGlzLmN1cnJlbnRNaW51dGUgLSB0aGlzLnN0ZXBNaW51dGU7XG4gICAgICAgIG5ld01pbnV0ZSA9IChuZXdNaW51dGUgPCAwKSA/IDYwICsgbmV3TWludXRlIDogbmV3TWludXRlO1xuICAgICAgICBpZiAodGhpcy52YWxpZGF0ZVRpbWUodGhpcy5jdXJyZW50SG91ciwgbmV3TWludXRlLCB0aGlzLmN1cnJlbnRTZWNvbmQsIHRoaXMucG0pKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRNaW51dGUgPSBuZXdNaW51dGU7XG4gICAgICAgIH1cblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIGluY3JlbWVudFNlY29uZChldmVudCkge1xuICAgICAgICBsZXQgbmV3U2Vjb25kID0gdGhpcy5jdXJyZW50U2Vjb25kICsgdGhpcy5zdGVwU2Vjb25kO1xuICAgICAgICBuZXdTZWNvbmQgPSAobmV3U2Vjb25kID4gNTkpID8gbmV3U2Vjb25kIC0gNjAgOiBuZXdTZWNvbmQ7XG4gICAgICAgIGlmICh0aGlzLnZhbGlkYXRlVGltZSh0aGlzLmN1cnJlbnRIb3VyLCB0aGlzLmN1cnJlbnRNaW51dGUsIG5ld1NlY29uZCwgdGhpcy5wbSkpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFNlY29uZCA9IG5ld1NlY29uZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgZGVjcmVtZW50U2Vjb25kKGV2ZW50KSB7XG4gICAgICAgIGxldCBuZXdTZWNvbmQgPSB0aGlzLmN1cnJlbnRTZWNvbmQgLSB0aGlzLnN0ZXBTZWNvbmQ7XG4gICAgICAgIG5ld1NlY29uZCA9IChuZXdTZWNvbmQgPCAwKSA/IDYwICsgbmV3U2Vjb25kIDogbmV3U2Vjb25kO1xuICAgICAgICBpZiAodGhpcy52YWxpZGF0ZVRpbWUodGhpcy5jdXJyZW50SG91ciwgdGhpcy5jdXJyZW50TWludXRlLCBuZXdTZWNvbmQsIHRoaXMucG0pKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTZWNvbmQgPSBuZXdTZWNvbmQ7XG4gICAgICAgIH1cblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIHVwZGF0ZVRpbWUoKSB7XG4gICAgICAgIGxldCB2YWx1ZSA9IHRoaXMudmFsdWU7XG4gICAgICAgIGlmICh0aGlzLmlzUmFuZ2VTZWxlY3Rpb24oKSkge1xuICAgICAgICAgICAgdmFsdWUgPSB0aGlzLnZhbHVlWzFdIHx8IHRoaXMudmFsdWVbMF07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaXNNdWx0aXBsZVNlbGVjdGlvbigpKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IHRoaXMudmFsdWVbdGhpcy52YWx1ZS5sZW5ndGggLSAxXTtcbiAgICAgICAgfVxuICAgICAgICB2YWx1ZSA9IHZhbHVlID8gbmV3IERhdGUodmFsdWUuZ2V0VGltZSgpKSA6IG5ldyBEYXRlKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuaG91ckZvcm1hdCA9PSAnMTInKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50SG91ciA9PT0gMTIpXG4gICAgICAgICAgICAgICAgdmFsdWUuc2V0SG91cnModGhpcy5wbSA/IDEyIDogMCk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgdmFsdWUuc2V0SG91cnModGhpcy5wbSA/IHRoaXMuY3VycmVudEhvdXIgKyAxMiA6IHRoaXMuY3VycmVudEhvdXIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFsdWUuc2V0SG91cnModGhpcy5jdXJyZW50SG91cik7XG4gICAgICAgIH1cblxuICAgICAgICB2YWx1ZS5zZXRNaW51dGVzKHRoaXMuY3VycmVudE1pbnV0ZSk7XG4gICAgICAgIHZhbHVlLnNldFNlY29uZHModGhpcy5jdXJyZW50U2Vjb25kKTtcbiAgICAgICAgaWYgKHRoaXMuaXNSYW5nZVNlbGVjdGlvbigpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy52YWx1ZVsxXSlcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IFt0aGlzLnZhbHVlWzBdLCB2YWx1ZV07XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgdmFsdWUgPSBbdmFsdWUsIG51bGxdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaXNNdWx0aXBsZVNlbGVjdGlvbigpKXtcbiAgICAgICAgICAgIHZhbHVlID0gWy4uLnRoaXMudmFsdWUuc2xpY2UoMCwgLTEpLCB2YWx1ZV07XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnVwZGF0ZU1vZGVsKHZhbHVlKTtcbiAgICAgICAgdGhpcy5vblNlbGVjdC5lbWl0KHZhbHVlKTtcbiAgICAgICAgdGhpcy51cGRhdGVJbnB1dGZpZWxkKCk7XG4gICAgfVxuXG4gICAgdG9nZ2xlQU1QTShldmVudCkge1xuICAgICAgICBjb25zdCBuZXdQTSA9ICF0aGlzLnBtO1xuICAgICAgICBpZiAodGhpcy52YWxpZGF0ZVRpbWUodGhpcy5jdXJyZW50SG91ciwgdGhpcy5jdXJyZW50TWludXRlLCB0aGlzLmN1cnJlbnRTZWNvbmQsIG5ld1BNKSkge1xuICAgICAgICAgIHRoaXMucG0gPSBuZXdQTTtcbiAgICAgICAgICB0aGlzLnVwZGF0ZVRpbWUoKTtcbiAgICAgICAgfVxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIG9uVXNlcklucHV0KGV2ZW50KSB7XG4gICAgICAgIC8vIElFIDExIFdvcmthcm91bmQgZm9yIGlucHV0IHBsYWNlaG9sZGVyIDogaHR0cHM6Ly9naXRodWIuY29tL3ByaW1lZmFjZXMvcHJpbWVuZy9pc3N1ZXMvMjAyNlxuICAgICAgICBpZiAoIXRoaXMuaXNLZXlkb3duKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pc0tleWRvd24gPSBmYWxzZTtcblxuICAgICAgICBsZXQgdmFsID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IHZhbHVlID0gdGhpcy5wYXJzZVZhbHVlRnJvbVN0cmluZyh2YWwpO1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNWYWxpZFNlbGVjdGlvbih2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZU1vZGVsKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVVJKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2goZXJyKSB7XG4gICAgICAgICAgICAvL2ludmFsaWQgZGF0ZVxuICAgICAgICAgICAgdGhpcy51cGRhdGVNb2RlbChudWxsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZmlsbGVkID0gdmFsICE9IG51bGwgJiYgdmFsLmxlbmd0aDtcbiAgICAgICAgdGhpcy5vbklucHV0LmVtaXQoZXZlbnQpO1xuICAgIH1cblxuICAgIGlzVmFsaWRTZWxlY3Rpb24odmFsdWUpOiBib29sZWFuIHtcbiAgICAgICAgbGV0IGlzVmFsaWQgPSB0cnVlO1xuICAgICAgICBpZiAodGhpcy5pc1NpbmdsZVNlbGVjdGlvbigpKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNTZWxlY3RhYmxlKHZhbHVlLmdldERhdGUoKSwgdmFsdWUuZ2V0TW9udGgoKSwgdmFsdWUuZ2V0RnVsbFllYXIoKSwgZmFsc2UpKSB7XG4gICAgICAgICAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHZhbHVlLmV2ZXJ5KHYgPT4gdGhpcy5pc1NlbGVjdGFibGUodi5nZXREYXRlKCksIHYuZ2V0TW9udGgoKSwgdi5nZXRGdWxsWWVhcigpLCBmYWxzZSkpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc1JhbmdlU2VsZWN0aW9uKCkpIHtcbiAgICAgICAgICAgICAgICBpc1ZhbGlkID0gdmFsdWUubGVuZ3RoID4gMSAmJiB2YWx1ZVsxXSA+IHZhbHVlWzBdID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpc1ZhbGlkO1xuICAgIH1cblxuICAgIHBhcnNlVmFsdWVGcm9tU3RyaW5nKHRleHQ6IHN0cmluZyk6IERhdGUgfCBEYXRlW117XG4gICAgICAgIGlmICghdGV4dCB8fCB0ZXh0LnRyaW0oKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHZhbHVlOiBhbnk7XG5cbiAgICAgICAgaWYgKHRoaXMuaXNTaW5nbGVTZWxlY3Rpb24oKSkge1xuICAgICAgICAgICAgdmFsdWUgPSB0aGlzLnBhcnNlRGF0ZVRpbWUodGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5pc011bHRpcGxlU2VsZWN0aW9uKCkpIHtcbiAgICAgICAgICAgIGxldCB0b2tlbnMgPSB0ZXh0LnNwbGl0KHRoaXMubXVsdGlwbGVTZXBhcmF0b3IpO1xuICAgICAgICAgICAgdmFsdWUgPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IHRva2VuIG9mIHRva2Vucykge1xuICAgICAgICAgICAgICAgIHZhbHVlLnB1c2godGhpcy5wYXJzZURhdGVUaW1lKHRva2VuLnRyaW0oKSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuaXNSYW5nZVNlbGVjdGlvbigpKSB7XG4gICAgICAgICAgICBsZXQgdG9rZW5zID0gdGV4dC5zcGxpdCgnICcrdGhpcy5yYW5nZVNlcGFyYXRvciArJyAnKTtcbiAgICAgICAgICAgIHZhbHVlID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhbHVlW2ldID0gdGhpcy5wYXJzZURhdGVUaW1lKHRva2Vuc1tpXS50cmltKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIHBhcnNlRGF0ZVRpbWUodGV4dCk6IERhdGUge1xuICAgICAgICBsZXQgZGF0ZTogRGF0ZTtcbiAgICAgICAgbGV0IHBhcnRzOiBzdHJpbmdbXSA9IHRleHQuc3BsaXQoJyAnKTtcblxuICAgICAgICBpZiAodGhpcy50aW1lT25seSkge1xuICAgICAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICB0aGlzLnBvcHVsYXRlVGltZShkYXRlLCBwYXJ0c1swXSwgcGFydHNbMV0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgZGF0ZUZvcm1hdCA9IHRoaXMuZ2V0RGF0ZUZvcm1hdCgpO1xuICAgICAgICAgICAgaWYgKHRoaXMuc2hvd1RpbWUpIHtcbiAgICAgICAgICAgICAgICBsZXQgYW1wbSA9IHRoaXMuaG91ckZvcm1hdCA9PSAnMTInID8gcGFydHMucG9wKCkgOiBudWxsO1xuICAgICAgICAgICAgICAgIGxldCB0aW1lU3RyaW5nID0gcGFydHMucG9wKCk7XG5cbiAgICAgICAgICAgICAgICBkYXRlID0gdGhpcy5wYXJzZURhdGUocGFydHMuam9pbignICcpLCBkYXRlRm9ybWF0KTtcbiAgICAgICAgICAgICAgICB0aGlzLnBvcHVsYXRlVGltZShkYXRlLCB0aW1lU3RyaW5nLCBhbXBtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICBkYXRlID0gdGhpcy5wYXJzZURhdGUodGV4dCwgZGF0ZUZvcm1hdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGF0ZTtcbiAgICB9XG5cbiAgICBwb3B1bGF0ZVRpbWUodmFsdWUsIHRpbWVTdHJpbmcsIGFtcG0pIHtcbiAgICAgICAgaWYgKHRoaXMuaG91ckZvcm1hdCA9PSAnMTInICYmICFhbXBtKSB7XG4gICAgICAgICAgICB0aHJvdyAnSW52YWxpZCBUaW1lJztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucG0gPSAoYW1wbSA9PT0gJ1BNJyB8fCBhbXBtID09PSAncG0nKTtcbiAgICAgICAgbGV0IHRpbWUgPSB0aGlzLnBhcnNlVGltZSh0aW1lU3RyaW5nKTtcbiAgICAgICAgdmFsdWUuc2V0SG91cnModGltZS5ob3VyKTtcbiAgICAgICAgdmFsdWUuc2V0TWludXRlcyh0aW1lLm1pbnV0ZSk7XG4gICAgICAgIHZhbHVlLnNldFNlY29uZHModGltZS5zZWNvbmQpO1xuICAgIH1cblxuICAgIHVwZGF0ZVVJKCkge1xuICAgICAgICBsZXQgdmFsID0gdGhpcy52YWx1ZXx8dGhpcy5kZWZhdWx0RGF0ZXx8bmV3IERhdGUoKTtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsKSl7XG4gICAgICAgICAgICB2YWwgPSB2YWxbMF07XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmN1cnJlbnRNb250aCA9IHZhbC5nZXRNb250aCgpO1xuICAgICAgICB0aGlzLmN1cnJlbnRZZWFyID0gdmFsLmdldEZ1bGxZZWFyKCk7XG4gICAgICAgIHRoaXMuY3JlYXRlTW9udGhzKHRoaXMuY3VycmVudE1vbnRoLCB0aGlzLmN1cnJlbnRZZWFyKTtcblxuICAgICAgICBpZiAodGhpcy5zaG93VGltZXx8dGhpcy50aW1lT25seSkge1xuICAgICAgICAgICAgdGhpcy5zZXRDdXJyZW50SG91clBNKHZhbC5nZXRIb3VycygpKTtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudE1pbnV0ZSA9IHZhbC5nZXRNaW51dGVzKCk7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTZWNvbmQgPSB2YWwuZ2V0U2Vjb25kcygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2hvd092ZXJsYXkoKSB7XG4gICAgICAgIGlmICghdGhpcy5vdmVybGF5VmlzaWJsZSkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVVSSgpO1xuICAgICAgICAgICAgdGhpcy5vdmVybGF5VmlzaWJsZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoaWRlT3ZlcmxheSgpIHtcbiAgICAgICAgdGhpcy5vdmVybGF5VmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNsZWFyVGltZVBpY2tlclRpbWVyKCk7XG5cbiAgICAgICAgaWYgKHRoaXMudG91Y2hVSSkge1xuICAgICAgICAgICAgdGhpcy5kaXNhYmxlTW9kYWxpdHkoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgdG9nZ2xlKCkge1xuICAgICAgICBpZiAoIXRoaXMuaW5saW5lKXtcbiAgICAgICAgICAgIGlmICghdGhpcy5vdmVybGF5VmlzaWJsZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd092ZXJsYXkoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0ZmllbGRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlT3ZlcmxheSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25PdmVybGF5QW5pbWF0aW9uU3RhcnQoZXZlbnQ6IEFuaW1hdGlvbkV2ZW50KSB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQudG9TdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSAndmlzaWJsZSc6XG4gICAgICAgICAgICBjYXNlICd2aXNpYmxlVG91Y2hVSSc6XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlubGluZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm92ZXJsYXkgPSBldmVudC5lbGVtZW50O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcGVuZE92ZXJsYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYXV0b1pJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudG91Y2hVSSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBaSW5kZXhVdGlscy5zZXQoJ21vZGFsJywgdGhpcy5vdmVybGF5LCB0aGlzLmJhc2VaSW5kZXggfHwgdGhpcy5jb25maWcuekluZGV4Lm1vZGFsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBaSW5kZXhVdGlscy5zZXQoJ292ZXJsYXknLCB0aGlzLm92ZXJsYXksIHRoaXMuYmFzZVpJbmRleCB8fCB0aGlzLmNvbmZpZy56SW5kZXgub3ZlcmxheSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFsaWduT3ZlcmxheSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uU2hvdy5lbWl0KGV2ZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAndm9pZCc6XG4gICAgICAgICAgICAgICAgdGhpcy5vbk92ZXJsYXlIaWRlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkNsb3NlLmVtaXQoZXZlbnQpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbk92ZXJsYXlBbmltYXRpb25Eb25lKGV2ZW50OiBBbmltYXRpb25FdmVudCkge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LnRvU3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ3Zpc2libGUnOlxuICAgICAgICAgICAgY2FzZSAndmlzaWJsZVRvdWNoVUknOlxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pbmxpbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iaW5kRG9jdW1lbnRDbGlja0xpc3RlbmVyKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmluZERvY3VtZW50UmVzaXplTGlzdGVuZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iaW5kU2Nyb2xsTGlzdGVuZXIoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAndm9pZCc6XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYXV0b1pJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICBaSW5kZXhVdGlscy5jbGVhcihldmVudC5lbGVtZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXBwZW5kT3ZlcmxheSgpIHtcbiAgICAgICAgaWYgKHRoaXMuYXBwZW5kVG8pIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmFwcGVuZFRvID09PSAnYm9keScpXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLm92ZXJsYXkpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuYXBwZW5kQ2hpbGQodGhpcy5vdmVybGF5LCB0aGlzLmFwcGVuZFRvKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlc3RvcmVPdmVybGF5QXBwZW5kKCkge1xuICAgICAgICBpZiAodGhpcy5vdmVybGF5ICYmIHRoaXMuYXBwZW5kVG8pIHtcbiAgICAgICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLm92ZXJsYXkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWxpZ25PdmVybGF5KCkge1xuICAgICAgICBpZiAodGhpcy50b3VjaFVJKSB7XG4gICAgICAgICAgICB0aGlzLmVuYWJsZU1vZGFsaXR5KHRoaXMub3ZlcmxheSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5hcHBlbmRUbylcbiAgICAgICAgICAgICAgICBEb21IYW5kbGVyLmFic29sdXRlUG9zaXRpb24odGhpcy5vdmVybGF5LCB0aGlzLmlucHV0ZmllbGRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgRG9tSGFuZGxlci5yZWxhdGl2ZVBvc2l0aW9uKHRoaXMub3ZlcmxheSwgdGhpcy5pbnB1dGZpZWxkVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZW5hYmxlTW9kYWxpdHkoZWxlbWVudCkge1xuICAgICAgICBpZiAoIXRoaXMubWFzaykge1xuICAgICAgICAgICAgdGhpcy5tYXNrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICB0aGlzLm1hc2suc3R5bGUuekluZGV4ID0gU3RyaW5nKHBhcnNlSW50KGVsZW1lbnQuc3R5bGUuekluZGV4KSAtIDEpO1xuICAgICAgICAgICAgbGV0IG1hc2tTdHlsZUNsYXNzID0gJ3AtY29tcG9uZW50LW92ZXJsYXkgcC1kYXRlcGlja2VyLW1hc2sgcC1kYXRlcGlja2VyLW1hc2stc2Nyb2xsYmxvY2tlcic7XG4gICAgICAgICAgICBEb21IYW5kbGVyLmFkZE11bHRpcGxlQ2xhc3Nlcyh0aGlzLm1hc2ssIG1hc2tTdHlsZUNsYXNzKTtcblxuXHRcdFx0dGhpcy5tYXNrQ2xpY2tMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKHRoaXMubWFzaywgJ2NsaWNrJywgKGV2ZW50OiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc2FibGVNb2RhbGl0eSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMubWFzayk7XG4gICAgICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKGRvY3VtZW50LmJvZHksICdwLW92ZXJmbG93LWhpZGRlbicpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGlzYWJsZU1vZGFsaXR5KCkge1xuICAgICAgICBpZiAodGhpcy5tYXNrKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHRoaXMubWFzayk7XG4gICAgICAgICAgICBsZXQgYm9keUNoaWxkcmVuID0gZG9jdW1lbnQuYm9keS5jaGlsZHJlbjtcbiAgICAgICAgICAgIGxldCBoYXNCbG9ja2VyTWFza3M6IGJvb2xlYW47XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJvZHlDaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBib2R5Q2hpbGQgPSBib2R5Q2hpbGRyZW5baV07XG4gICAgICAgICAgICAgICAgaWYgKERvbUhhbmRsZXIuaGFzQ2xhc3MoYm9keUNoaWxkLCAncC1kYXRlcGlja2VyLW1hc2stc2Nyb2xsYmxvY2tlcicpKSB7XG4gICAgICAgICAgICAgICAgICAgIGhhc0Jsb2NrZXJNYXNrcyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFoYXNCbG9ja2VyTWFza3MpIHtcbiAgICAgICAgICAgICAgICBEb21IYW5kbGVyLnJlbW92ZUNsYXNzKGRvY3VtZW50LmJvZHksICdwLW92ZXJmbG93LWhpZGRlbicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnVuYmluZE1hc2tDbGlja0xpc3RlbmVyKCk7XG5cbiAgICAgICAgICAgIHRoaXMubWFzayA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1bmJpbmRNYXNrQ2xpY2tMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKHRoaXMubWFza0NsaWNrTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMubWFza0NsaWNrTGlzdGVuZXIoKTtcbiAgICAgICAgICAgIHRoaXMubWFza0NsaWNrTGlzdGVuZXIgPSBudWxsO1xuXHRcdH1cbiAgICB9XG5cbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIDogdm9pZCB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgaWYgKHRoaXMudmFsdWUgJiYgdHlwZW9mIHRoaXMudmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5wYXJzZVZhbHVlRnJvbVN0cmluZyh0aGlzLnZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudXBkYXRlSW5wdXRmaWVsZCgpO1xuICAgICAgICB0aGlzLnVwZGF0ZVVJKCk7XG4gICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlID0gZm47XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25Nb2RlbFRvdWNoZWQgPSBmbjtcbiAgICB9XG5cbiAgICBzZXREaXNhYmxlZFN0YXRlKHZhbDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLmRpc2FibGVkID0gdmFsO1xuICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIGdldERhdGVGb3JtYXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVGb3JtYXR8fHRoaXMuZ2V0VHJhbnNsYXRpb24oJ2RhdGVGb3JtYXQnKTtcbiAgICB9XG5cbiAgICAvLyBQb3J0ZWQgZnJvbSBqcXVlcnktdWkgZGF0ZXBpY2tlciBmb3JtYXREYXRlXG4gICAgZm9ybWF0RGF0ZShkYXRlLCBmb3JtYXQpIHtcbiAgICAgICAgaWYgKCFkYXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaUZvcm1hdDtcbiAgICAgICAgY29uc3QgbG9va0FoZWFkID0gKG1hdGNoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBtYXRjaGVzID0gKGlGb3JtYXQgKyAxIDwgZm9ybWF0Lmxlbmd0aCAmJiBmb3JtYXQuY2hhckF0KGlGb3JtYXQgKyAxKSA9PT0gbWF0Y2gpO1xuICAgICAgICAgICAgaWYgKG1hdGNoZXMpIHtcbiAgICAgICAgICAgICAgICBpRm9ybWF0Kys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbWF0Y2hlcztcbiAgICAgICAgfSxcbiAgICAgICAgICAgIGZvcm1hdE51bWJlciA9IChtYXRjaCwgdmFsdWUsIGxlbikgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBudW0gPSAnJyArIHZhbHVlO1xuICAgICAgICAgICAgICAgIGlmIChsb29rQWhlYWQobWF0Y2gpKSB7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChudW0ubGVuZ3RoIDwgbGVuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBudW0gPSAnMCcgKyBudW07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmb3JtYXROYW1lID0gKG1hdGNoLCB2YWx1ZSwgc2hvcnROYW1lcywgbG9uZ05hbWVzKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChsb29rQWhlYWQobWF0Y2gpID8gbG9uZ05hbWVzW3ZhbHVlXSA6IHNob3J0TmFtZXNbdmFsdWVdKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIGxldCBvdXRwdXQgPSAnJztcbiAgICAgICAgbGV0IGxpdGVyYWwgPSBmYWxzZTtcblxuICAgICAgICBpZiAoZGF0ZSkge1xuICAgICAgICAgICAgZm9yIChpRm9ybWF0ID0gMDsgaUZvcm1hdCA8IGZvcm1hdC5sZW5ndGg7IGlGb3JtYXQrKykge1xuICAgICAgICAgICAgICAgIGlmIChsaXRlcmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmb3JtYXQuY2hhckF0KGlGb3JtYXQpID09PSAnXFwnJyAmJiAhbG9va0FoZWFkKCdcXCcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGl0ZXJhbCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0ICs9IGZvcm1hdC5jaGFyQXQoaUZvcm1hdCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGZvcm1hdC5jaGFyQXQoaUZvcm1hdCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2QnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dCArPSBmb3JtYXROdW1iZXIoJ2QnLCBkYXRlLmdldERhdGUoKSwgMik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdEJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXQgKz0gZm9ybWF0TmFtZSgnRCcsIGRhdGUuZ2V0RGF5KCksIHRoaXMuZ2V0VHJhbnNsYXRpb24oVHJhbnNsYXRpb25LZXlzLkRBWV9OQU1FU19TSE9SVCksIHRoaXMuZ2V0VHJhbnNsYXRpb24oVHJhbnNsYXRpb25LZXlzLkRBWV9OQU1FUykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnbyc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0ICs9IGZvcm1hdE51bWJlcignbycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5yb3VuZCgoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBEYXRlKGRhdGUuZ2V0RnVsbFllYXIoKSwgZGF0ZS5nZXRNb250aCgpLCBkYXRlLmdldERhdGUoKSkuZ2V0VGltZSgpIC1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IERhdGUoZGF0ZS5nZXRGdWxsWWVhcigpLCAwLCAwKS5nZXRUaW1lKCkpIC8gODY0MDAwMDApLCAzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ20nOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dCArPSBmb3JtYXROdW1iZXIoJ20nLCBkYXRlLmdldE1vbnRoKCkgKyAxLCAyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ00nOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dCArPSBmb3JtYXROYW1lKCdNJyxkYXRlLmdldE1vbnRoKCksIHRoaXMuZ2V0VHJhbnNsYXRpb24oVHJhbnNsYXRpb25LZXlzLk1PTlRIX05BTUVTX1NIT1JUKSwgdGhpcy5nZXRUcmFuc2xhdGlvbihUcmFuc2xhdGlvbktleXMuTU9OVEhfTkFNRVMpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3knOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dCArPSBsb29rQWhlYWQoJ3knKSA/IGRhdGUuZ2V0RnVsbFllYXIoKSA6IChkYXRlLmdldEZ1bGxZZWFyKCkgJSAxMDAgPCAxMCA/ICcwJyA6ICcnKSArIChkYXRlLmdldEZ1bGxZZWFyKCkgJSAxMDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnQCc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0ICs9IGRhdGUuZ2V0VGltZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnISc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0ICs9IGRhdGUuZ2V0VGltZSgpICogMTAwMDAgKyB0aGlzLnRpY2tzVG8xOTcwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnXFwnJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobG9va0FoZWFkKCdcXCcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXQgKz0gJ1xcJyc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGl0ZXJhbCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXQgKz0gZm9ybWF0LmNoYXJBdChpRm9ybWF0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3V0cHV0O1xuICAgIH1cblxuICAgIGZvcm1hdFRpbWUoZGF0ZSkge1xuICAgICAgICBpZiAoIWRhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBvdXRwdXQgPSAnJztcbiAgICAgICAgbGV0IGhvdXJzID0gZGF0ZS5nZXRIb3VycygpO1xuICAgICAgICBsZXQgbWludXRlcyA9IGRhdGUuZ2V0TWludXRlcygpO1xuICAgICAgICBsZXQgc2Vjb25kcyA9IGRhdGUuZ2V0U2Vjb25kcygpO1xuXG4gICAgICAgIGlmICh0aGlzLmhvdXJGb3JtYXQgPT0gJzEyJyAmJiBob3VycyA+IDExICYmIGhvdXJzICE9IDEyKSB7XG4gICAgICAgICAgICBob3Vycy09MTI7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5ob3VyRm9ybWF0ID09ICcxMicpIHtcbiAgICAgICAgICAgIG91dHB1dCArPSBob3VycyA9PT0gMCA/IDEyIDogKGhvdXJzIDwgMTApID8gJzAnICsgaG91cnMgOiBob3VycztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG91dHB1dCArPSAoaG91cnMgPCAxMCkgPyAnMCcgKyBob3VycyA6IGhvdXJzO1xuICAgICAgICB9XG4gICAgICAgIG91dHB1dCArPSAnOic7XG4gICAgICAgIG91dHB1dCArPSAobWludXRlcyA8IDEwKSA/ICcwJyArIG1pbnV0ZXMgOiBtaW51dGVzO1xuXG4gICAgICAgIGlmICh0aGlzLnNob3dTZWNvbmRzKSB7XG4gICAgICAgICAgICBvdXRwdXQgKz0gJzonO1xuICAgICAgICAgICAgb3V0cHV0ICs9IChzZWNvbmRzIDwgMTApID8gJzAnICsgc2Vjb25kcyA6IHNlY29uZHM7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5ob3VyRm9ybWF0ID09ICcxMicpIHtcbiAgICAgICAgICAgIG91dHB1dCArPSBkYXRlLmdldEhvdXJzKCkgPiAxMSA/ICcgUE0nIDogJyBBTSc7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb3V0cHV0O1xuICAgIH1cblxuICAgIHBhcnNlVGltZSh2YWx1ZSkge1xuICAgICAgICBsZXQgdG9rZW5zOiBzdHJpbmdbXSA9IHZhbHVlLnNwbGl0KCc6Jyk7XG4gICAgICAgIGxldCB2YWxpZFRva2VuTGVuZ3RoID0gdGhpcy5zaG93U2Vjb25kcyA/IDMgOiAyO1xuXG4gICAgICAgIGlmICh0b2tlbnMubGVuZ3RoICE9PSB2YWxpZFRva2VuTGVuZ3RoKSB7XG4gICAgICAgICAgICB0aHJvdyBcIkludmFsaWQgdGltZVwiO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGggPSBwYXJzZUludCh0b2tlbnNbMF0pO1xuICAgICAgICBsZXQgbSA9IHBhcnNlSW50KHRva2Vuc1sxXSk7XG4gICAgICAgIGxldCBzID0gdGhpcy5zaG93U2Vjb25kcyA/IHBhcnNlSW50KHRva2Vuc1syXSkgOiBudWxsO1xuXG4gICAgICAgIGlmIChpc05hTihoKSB8fCBpc05hTihtKSB8fCBoID4gMjMgfHwgbSA+IDU5IHx8ICh0aGlzLmhvdXJGb3JtYXQgPT0gJzEyJyAmJiBoID4gMTIpIHx8ICh0aGlzLnNob3dTZWNvbmRzICYmIChpc05hTihzKSB8fCBzID4gNTkpKSkge1xuICAgICAgICAgICAgdGhyb3cgXCJJbnZhbGlkIHRpbWVcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmhvdXJGb3JtYXQgPT0gJzEyJykge1xuICAgICAgICAgICAgICAgIGlmIChoICE9PSAxMiAmJiB0aGlzLnBtKSB7XG4gICAgICAgICAgICAgICAgICAgIGggKz0gMTI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKCF0aGlzLnBtICYmIGggPT09IDEyKSB7XG4gICAgICAgICAgICAgICAgICAgIGggLT0gMTI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4ge2hvdXI6IGgsIG1pbnV0ZTogbSwgc2Vjb25kOiBzfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFBvcnRlZCBmcm9tIGpxdWVyeS11aSBkYXRlcGlja2VyIHBhcnNlRGF0ZVxuICAgIHBhcnNlRGF0ZSh2YWx1ZSwgZm9ybWF0KSB7XG4gICAgICAgIGlmIChmb3JtYXQgPT0gbnVsbCB8fCB2YWx1ZSA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBcIkludmFsaWQgYXJndW1lbnRzXCI7XG4gICAgICAgIH1cblxuICAgICAgICB2YWx1ZSA9ICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgPyB2YWx1ZS50b1N0cmluZygpIDogdmFsdWUgKyBcIlwiKTtcbiAgICAgICAgaWYgKHZhbHVlID09PSBcIlwiKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBpRm9ybWF0LCBkaW0sIGV4dHJhLFxuICAgICAgICBpVmFsdWUgPSAwLFxuICAgICAgICBzaG9ydFllYXJDdXRvZmYgPSAodHlwZW9mIHRoaXMuc2hvcnRZZWFyQ3V0b2ZmICE9PSBcInN0cmluZ1wiID8gdGhpcy5zaG9ydFllYXJDdXRvZmYgOiBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCkgJSAxMDAgKyBwYXJzZUludCh0aGlzLnNob3J0WWVhckN1dG9mZiwgMTApKSxcbiAgICAgICAgeWVhciA9IC0xLFxuICAgICAgICBtb250aCA9IC0xLFxuICAgICAgICBkYXkgPSAtMSxcbiAgICAgICAgZG95ID0gLTEsXG4gICAgICAgIGxpdGVyYWwgPSBmYWxzZSxcbiAgICAgICAgZGF0ZSxcbiAgICAgICAgbG9va0FoZWFkID0gKG1hdGNoKSA9PiB7XG4gICAgICAgICAgICBsZXQgbWF0Y2hlcyA9IChpRm9ybWF0ICsgMSA8IGZvcm1hdC5sZW5ndGggJiYgZm9ybWF0LmNoYXJBdChpRm9ybWF0ICsgMSkgPT09IG1hdGNoKTtcbiAgICAgICAgICAgIGlmIChtYXRjaGVzKSB7XG4gICAgICAgICAgICAgICAgaUZvcm1hdCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG1hdGNoZXM7XG4gICAgICAgIH0sXG4gICAgICAgIGdldE51bWJlciA9IChtYXRjaCkgPT4ge1xuICAgICAgICAgICAgbGV0IGlzRG91YmxlZCA9IGxvb2tBaGVhZChtYXRjaCksXG4gICAgICAgICAgICAgICAgc2l6ZSA9IChtYXRjaCA9PT0gXCJAXCIgPyAxNCA6IChtYXRjaCA9PT0gXCIhXCIgPyAyMCA6XG4gICAgICAgICAgICAgICAgKG1hdGNoID09PSBcInlcIiAmJiBpc0RvdWJsZWQgPyA0IDogKG1hdGNoID09PSBcIm9cIiA/IDMgOiAyKSkpKSxcbiAgICAgICAgICAgICAgICBtaW5TaXplID0gKG1hdGNoID09PSBcInlcIiA/IHNpemUgOiAxKSxcbiAgICAgICAgICAgICAgICBkaWdpdHMgPSBuZXcgUmVnRXhwKFwiXlxcXFxke1wiICsgbWluU2l6ZSArIFwiLFwiICsgc2l6ZSArIFwifVwiKSxcbiAgICAgICAgICAgICAgICBudW0gPSB2YWx1ZS5zdWJzdHJpbmcoaVZhbHVlKS5tYXRjaChkaWdpdHMpO1xuICAgICAgICAgICAgaWYgKCFudW0pIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBcIk1pc3NpbmcgbnVtYmVyIGF0IHBvc2l0aW9uIFwiICsgaVZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaVZhbHVlICs9IG51bVsgMCBdLmxlbmd0aDtcbiAgICAgICAgICAgIHJldHVybiBwYXJzZUludChudW1bIDAgXSwgMTApO1xuICAgICAgICB9LFxuICAgICAgICBnZXROYW1lID0gKG1hdGNoLCBzaG9ydE5hbWVzLCBsb25nTmFtZXMpID0+IHtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IC0xO1xuICAgICAgICAgICAgbGV0IGFyciA9IGxvb2tBaGVhZChtYXRjaCkgPyBsb25nTmFtZXMgOiBzaG9ydE5hbWVzO1xuICAgICAgICAgICAgbGV0IG5hbWVzID0gW107XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbmFtZXMucHVzaChbaSxhcnJbaV1dKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5hbWVzLnNvcnQoKGEsYikgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiAtKGFbIDEgXS5sZW5ndGggLSBiWyAxIF0ubGVuZ3RoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5hbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IG5hbWUgPSBuYW1lc1tpXVsxXTtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUuc3Vic3RyKGlWYWx1ZSwgbmFtZS5sZW5ndGgpLnRvTG93ZXJDYXNlKCkgPT09IG5hbWUudG9Mb3dlckNhc2UoKSkge1xuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IG5hbWVzW2ldWzBdO1xuICAgICAgICAgICAgICAgICAgICBpVmFsdWUgKz0gbmFtZS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpbmRleCArIDE7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93IFwiVW5rbm93biBuYW1lIGF0IHBvc2l0aW9uIFwiICsgaVZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBjaGVja0xpdGVyYWwgPSAoKSA9PiB7XG4gICAgICAgICAgICBpZiAodmFsdWUuY2hhckF0KGlWYWx1ZSkgIT09IGZvcm1hdC5jaGFyQXQoaUZvcm1hdCkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBcIlVuZXhwZWN0ZWQgbGl0ZXJhbCBhdCBwb3NpdGlvbiBcIiArIGlWYWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlWYWx1ZSsrO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmICh0aGlzLnZpZXcgPT09ICdtb250aCcpIHtcbiAgICAgICAgICAgIGRheSA9IDE7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGlGb3JtYXQgPSAwOyBpRm9ybWF0IDwgZm9ybWF0Lmxlbmd0aDsgaUZvcm1hdCsrKSB7XG4gICAgICAgICAgICBpZiAobGl0ZXJhbCkge1xuICAgICAgICAgICAgICAgIGlmIChmb3JtYXQuY2hhckF0KGlGb3JtYXQpID09PSBcIidcIiAmJiAhbG9va0FoZWFkKFwiJ1wiKSkge1xuICAgICAgICAgICAgICAgICAgICBsaXRlcmFsID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tMaXRlcmFsKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGZvcm1hdC5jaGFyQXQoaUZvcm1hdCkpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImRcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGRheSA9IGdldE51bWJlcihcImRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIkRcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldE5hbWUoXCJEXCIsIHRoaXMuZ2V0VHJhbnNsYXRpb24oVHJhbnNsYXRpb25LZXlzLkRBWV9OQU1FU19TSE9SVCksIHRoaXMuZ2V0VHJhbnNsYXRpb24oVHJhbnNsYXRpb25LZXlzLkRBWV9OQU1FUykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJvXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBkb3kgPSBnZXROdW1iZXIoXCJvXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJtXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBtb250aCA9IGdldE51bWJlcihcIm1cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIk1cIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vbnRoID0gZ2V0TmFtZShcIk1cIiwgdGhpcy5nZXRUcmFuc2xhdGlvbihUcmFuc2xhdGlvbktleXMuTU9OVEhfTkFNRVNfU0hPUlQpLCB0aGlzLmdldFRyYW5zbGF0aW9uKFRyYW5zbGF0aW9uS2V5cy5NT05USF9OQU1FUykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ5XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICB5ZWFyID0gZ2V0TnVtYmVyKFwieVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiQFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKGdldE51bWJlcihcIkBcIikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vbnRoID0gZGF0ZS5nZXRNb250aCgpICsgMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRheSA9IGRhdGUuZ2V0RGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCIhXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRlID0gbmV3IERhdGUoKGdldE51bWJlcihcIiFcIikgLSB0aGlzLnRpY2tzVG8xOTcwKSAvIDEwMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb250aCA9IGRhdGUuZ2V0TW9udGgoKSArIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXkgPSBkYXRlLmdldERhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiJ1wiOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxvb2tBaGVhZChcIidcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja0xpdGVyYWwoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGl0ZXJhbCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrTGl0ZXJhbCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpVmFsdWUgPCB2YWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGV4dHJhID0gdmFsdWUuc3Vic3RyKGlWYWx1ZSk7XG4gICAgICAgICAgICBpZiAoIS9eXFxzKy8udGVzdChleHRyYSkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBcIkV4dHJhL3VucGFyc2VkIGNoYXJhY3RlcnMgZm91bmQgaW4gZGF0ZTogXCIgKyBleHRyYTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh5ZWFyID09PSAtMSkge1xuICAgICAgICAgICAgeWVhciA9IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgfSBlbHNlIGlmICh5ZWFyIDwgMTAwKSB7XG4gICAgICAgICAgICB5ZWFyICs9IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKSAtIG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKSAlIDEwMCArXG4gICAgICAgICAgICAgICAgKHllYXIgPD0gc2hvcnRZZWFyQ3V0b2ZmID8gMCA6IC0xMDApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRveSA+IC0xKSB7XG4gICAgICAgICAgICBtb250aCA9IDE7XG4gICAgICAgICAgICBkYXkgPSBkb3k7XG4gICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgICAgZGltID0gdGhpcy5nZXREYXlzQ291bnRJbk1vbnRoKHllYXIsIG1vbnRoIC0gMSk7XG4gICAgICAgICAgICAgICAgaWYgKGRheSA8PSBkaW0pIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG1vbnRoKys7XG4gICAgICAgICAgICAgICAgZGF5IC09IGRpbTtcbiAgICAgICAgICAgIH0gd2hpbGUgKHRydWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgZGF0ZSA9IHRoaXMuZGF5bGlnaHRTYXZpbmdBZGp1c3QobmV3IERhdGUoeWVhciwgbW9udGggLSAxLCBkYXkpKTtcbiAgICAgICAgICAgICAgICBpZiAoZGF0ZS5nZXRGdWxsWWVhcigpICE9PSB5ZWFyIHx8IGRhdGUuZ2V0TW9udGgoKSArIDEgIT09IG1vbnRoIHx8IGRhdGUuZ2V0RGF0ZSgpICE9PSBkYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgXCJJbnZhbGlkIGRhdGVcIjsgLy8gRS5nLiAzMS8wMi8wMFxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGF0ZTtcbiAgICB9XG5cbiAgICBkYXlsaWdodFNhdmluZ0FkanVzdChkYXRlKSB7XG4gICAgICAgIGlmICghZGF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBkYXRlLnNldEhvdXJzKGRhdGUuZ2V0SG91cnMoKSA+IDEyID8gZGF0ZS5nZXRIb3VycygpICsgMiA6IDApO1xuXG4gICAgICAgIHJldHVybiBkYXRlO1xuICAgIH1cblxuICAgIHVwZGF0ZUZpbGxlZFN0YXRlKCkge1xuICAgICAgICB0aGlzLmZpbGxlZCA9IHRoaXMuaW5wdXRGaWVsZFZhbHVlICYmIHRoaXMuaW5wdXRGaWVsZFZhbHVlICE9ICcnO1xuICAgIH1cblxuICAgIG9uVG9kYXlCdXR0b25DbGljayhldmVudCkge1xuICAgICAgICBsZXQgZGF0ZTogRGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIGxldCBkYXRlTWV0YSA9IHtkYXk6IGRhdGUuZ2V0RGF0ZSgpLCBtb250aDogZGF0ZS5nZXRNb250aCgpLCB5ZWFyOiBkYXRlLmdldEZ1bGxZZWFyKCksIG90aGVyTW9udGg6IGRhdGUuZ2V0TW9udGgoKSAhPT0gdGhpcy5jdXJyZW50TW9udGggfHwgZGF0ZS5nZXRGdWxsWWVhcigpICE9PSB0aGlzLmN1cnJlbnRZZWFyLCB0b2RheTogdHJ1ZSwgc2VsZWN0YWJsZTogdHJ1ZX07XG5cbiAgICAgICAgdGhpcy5vbkRhdGVTZWxlY3QoZXZlbnQsIGRhdGVNZXRhKTtcbiAgICAgICAgdGhpcy5vblRvZGF5Q2xpY2suZW1pdChldmVudCk7XG4gICAgfVxuXG4gICAgb25DbGVhckJ1dHRvbkNsaWNrKGV2ZW50KSB7XG4gICAgICAgIHRoaXMudXBkYXRlTW9kZWwobnVsbCk7XG4gICAgICAgIHRoaXMudXBkYXRlSW5wdXRmaWVsZCgpO1xuICAgICAgICB0aGlzLmhpZGVPdmVybGF5KCk7XG4gICAgICAgIHRoaXMub25DbGVhckNsaWNrLmVtaXQoZXZlbnQpO1xuICAgIH1cblxuICAgIGJpbmREb2N1bWVudENsaWNrTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICghdGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZG9jdW1lbnRUYXJnZXQ6IGFueSA9IHRoaXMuZWwgPyB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQub3duZXJEb2N1bWVudCA6ICdkb2N1bWVudCc7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKGRvY3VtZW50VGFyZ2V0LCAnY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNPdXRzaWRlQ2xpY2tlZChldmVudCkgJiYgdGhpcy5vdmVybGF5VmlzaWJsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlT3ZlcmxheSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25DbGlja091dHNpZGUuZW1pdChldmVudCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1bmJpbmREb2N1bWVudENsaWNrTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIoKTtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJpbmREb2N1bWVudFJlc2l6ZUxpc3RlbmVyKCkge1xuICAgICAgICBpZiAoIXRoaXMuZG9jdW1lbnRSZXNpemVMaXN0ZW5lciAmJiAhdGhpcy50b3VjaFVJKSB7XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIgPSB0aGlzLm9uV2luZG93UmVzaXplLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5kb2N1bWVudFJlc2l6ZUxpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVuYmluZERvY3VtZW50UmVzaXplTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIpO1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudFJlc2l6ZUxpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJpbmRTY3JvbGxMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKCF0aGlzLnNjcm9sbEhhbmRsZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsSGFuZGxlciA9IG5ldyBDb25uZWN0ZWRPdmVybGF5U2Nyb2xsSGFuZGxlcih0aGlzLmNvbnRhaW5lclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub3ZlcmxheVZpc2libGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlT3ZlcmxheSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zY3JvbGxIYW5kbGVyLmJpbmRTY3JvbGxMaXN0ZW5lcigpO1xuICAgIH1cblxuICAgIHVuYmluZFNjcm9sbExpc3RlbmVyKCkge1xuICAgICAgICBpZiAodGhpcy5zY3JvbGxIYW5kbGVyKSB7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbEhhbmRsZXIudW5iaW5kU2Nyb2xsTGlzdGVuZXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzT3V0c2lkZUNsaWNrZWQoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIHJldHVybiAhKHRoaXMuZWwubmF0aXZlRWxlbWVudC5pc1NhbWVOb2RlKGV2ZW50LnRhcmdldCkgfHwgdGhpcy5pc05hdkljb25DbGlja2VkKGV2ZW50KSB8fMKgXG4gICAgICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkgfHwgKHRoaXMub3ZlcmxheSAmJiB0aGlzLm92ZXJsYXkuY29udGFpbnMoPE5vZGU+IGV2ZW50LnRhcmdldCkpKTtcbiAgICB9XG5cbiAgICBpc05hdkljb25DbGlja2VkKGV2ZW50OiBFdmVudCkge1xuICAgICAgICByZXR1cm4gKERvbUhhbmRsZXIuaGFzQ2xhc3MoZXZlbnQudGFyZ2V0LCAncC1kYXRlcGlja2VyLXByZXYnKSB8fCBEb21IYW5kbGVyLmhhc0NsYXNzKGV2ZW50LnRhcmdldCwgJ3AtZGF0ZXBpY2tlci1wcmV2LWljb24nKVxuICAgICAgICAgICAgICAgIHx8IERvbUhhbmRsZXIuaGFzQ2xhc3MoZXZlbnQudGFyZ2V0LCAncC1kYXRlcGlja2VyLW5leHQnKSB8fCBEb21IYW5kbGVyLmhhc0NsYXNzKGV2ZW50LnRhcmdldCwgJ3AtZGF0ZXBpY2tlci1uZXh0LWljb24nKSk7XG4gICAgfVxuXG4gICAgb25XaW5kb3dSZXNpemUoKSB7XG4gICAgICAgIGlmICh0aGlzLm92ZXJsYXlWaXNpYmxlICYmICFEb21IYW5kbGVyLmlzQW5kcm9pZCgpKSB7XG4gICAgICAgICAgICB0aGlzLmhpZGVPdmVybGF5KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbk92ZXJsYXlIaWRlKCkge1xuICAgICAgICB0aGlzLnVuYmluZERvY3VtZW50Q2xpY2tMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLnVuYmluZE1hc2tDbGlja0xpc3RlbmVyKCk7XG4gICAgICAgIHRoaXMudW5iaW5kRG9jdW1lbnRSZXNpemVMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLnVuYmluZFNjcm9sbExpc3RlbmVyKCk7XG4gICAgICAgIHRoaXMub3ZlcmxheSA9IG51bGw7XG4gICAgICAgIHRoaXMuZGlzYWJsZU1vZGFsaXR5KCk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLnNjcm9sbEhhbmRsZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsSGFuZGxlci5kZXN0cm95KCk7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbEhhbmRsZXIgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMudHJhbnNsYXRpb25TdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMudHJhbnNsYXRpb25TdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm92ZXJsYXkgJiYgdGhpcy5hdXRvWkluZGV4KSB7XG4gICAgICAgICAgICBaSW5kZXhVdGlscy5jbGVhcih0aGlzLm92ZXJsYXkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jbGVhclRpbWVQaWNrZXJUaW1lcigpO1xuICAgICAgICB0aGlzLnJlc3RvcmVPdmVybGF5QXBwZW5kKCk7XG4gICAgICAgIHRoaXMub25PdmVybGF5SGlkZSgpO1xuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLEJ1dHRvbk1vZHVsZSxTaGFyZWRNb2R1bGUsUmlwcGxlTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbQ2FsZW5kYXIsQnV0dG9uTW9kdWxlLFNoYXJlZE1vZHVsZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbQ2FsZW5kYXJdXG59KVxuZXhwb3J0IGNsYXNzIENhbGVuZGFyTW9kdWxlIHsgfVxuIl19