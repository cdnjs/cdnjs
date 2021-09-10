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
Calendar.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: Calendar, selector: "p-calendar", inputs: { style: "style", styleClass: "styleClass", inputStyle: "inputStyle", inputId: "inputId", name: "name", inputStyleClass: "inputStyleClass", placeholder: "placeholder", ariaLabelledBy: "ariaLabelledBy", disabled: "disabled", dateFormat: "dateFormat", multipleSeparator: "multipleSeparator", rangeSeparator: "rangeSeparator", inline: "inline", showOtherMonths: "showOtherMonths", selectOtherMonths: "selectOtherMonths", showIcon: "showIcon", icon: "icon", appendTo: "appendTo", readonlyInput: "readonlyInput", shortYearCutoff: "shortYearCutoff", monthNavigator: "monthNavigator", yearNavigator: "yearNavigator", hourFormat: "hourFormat", timeOnly: "timeOnly", stepHour: "stepHour", stepMinute: "stepMinute", stepSecond: "stepSecond", showSeconds: "showSeconds", required: "required", showOnFocus: "showOnFocus", showWeek: "showWeek", dataType: "dataType", selectionMode: "selectionMode", maxDateCount: "maxDateCount", showButtonBar: "showButtonBar", todayButtonStyleClass: "todayButtonStyleClass", clearButtonStyleClass: "clearButtonStyleClass", autoZIndex: "autoZIndex", baseZIndex: "baseZIndex", panelStyleClass: "panelStyleClass", panelStyle: "panelStyle", keepInvalid: "keepInvalid", hideOnDateTimeSelect: "hideOnDateTimeSelect", numberOfMonths: "numberOfMonths", view: "view", touchUI: "touchUI", timeSeparator: "timeSeparator", focusTrap: "focusTrap", firstDayOfWeek: "firstDayOfWeek", showTransitionOptions: "showTransitionOptions", hideTransitionOptions: "hideTransitionOptions", tabindex: "tabindex", defaultDate: "defaultDate", minDate: "minDate", maxDate: "maxDate", disabledDates: "disabledDates", disabledDays: "disabledDays", yearRange: "yearRange", showTime: "showTime", locale: "locale" }, outputs: { onFocus: "onFocus", onBlur: "onBlur", onClose: "onClose", onSelect: "onSelect", onInput: "onInput", onTodayClick: "onTodayClick", onClearClick: "onClearClick", onMonthChange: "onMonthChange", onYearChange: "onYearChange", onClickOutside: "onClickOutside", onShow: "onShow" }, host: { properties: { "class.p-inputwrapper-filled": "filled", "class.p-inputwrapper-focus": "focus" }, classAttribute: "p-element p-inputwrapper" }, providers: [CALENDAR_VALUE_ACCESSOR], queries: [{ propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "containerViewChild", first: true, predicate: ["container"], descendants: true }, { propertyName: "inputfieldViewChild", first: true, predicate: ["inputfield"], descendants: true }, { propertyName: "content", first: true, predicate: ["contentWrapper"], descendants: true }], ngImport: i0, template: `
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
                        'class': 'p-element p-inputwrapper',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvY2FsZW5kYXIvY2FsZW5kYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQTZCLEtBQUssRUFBQyxNQUFNLEVBQUMsWUFBWSxFQUFDLFVBQVUsRUFDbkYsU0FBUyxFQUErQixlQUFlLEVBQWtCLHVCQUF1QixFQUFFLGlCQUFpQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2xKLE9BQU8sRUFBQyxPQUFPLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsT0FBTyxFQUFnQixNQUFNLHFCQUFxQixDQUFDO0FBQzFGLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzVDLE9BQU8sRUFBQyxVQUFVLEVBQUUsNkJBQTZCLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFDdEUsT0FBTyxFQUFDLFlBQVksRUFBQyxhQUFhLEVBQWUsZUFBZSxFQUFpQixNQUFNLGFBQWEsQ0FBQztBQUNyRyxPQUFPLEVBQUMsaUJBQWlCLEVBQXVCLE1BQU0sZ0JBQWdCLENBQUM7QUFFdkUsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7Ozs7O0FBRTFDLE1BQU0sQ0FBQyxNQUFNLHVCQUF1QixHQUFRO0lBQ3hDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUM7SUFDdkMsS0FBSyxFQUFFLElBQUk7Q0FDZCxDQUFDO0FBdUxGLE1BQU0sT0FBTyxRQUFRO0lBNFZqQixZQUFtQixFQUFjLEVBQVMsUUFBbUIsRUFBUyxFQUFxQixFQUFVLElB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QUFDLENBQUMsU0FBUyxDQUFDO1FBQ3pELElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUM3RSxJQUFJLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQztTQUNsQztRQUVELEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsZUFBZSxDQUFDLEtBQUs7UUFDakIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ3JELFNBQVMsR0FBRyxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1FBQzFELElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUM3RSxJQUFJLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQztTQUNsQztRQUVELEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsZUFBZSxDQUFDLEtBQUs7UUFDakIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ3JELFNBQVMsR0FBRyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1FBQ3pELElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUM3RSxJQUFJLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQztTQUNsQztR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LGFBQWE7Z0JBRXJCLFFBQVE7c0JBQWhCLEtBQUs7Z0JBRXFDLGtCQUFrQjtzQkFBNUQsU0FBUzt1QkFBQyxXQUFXLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO2dCQUVHLG1CQUFtQjtzQkFBOUQsU0FBUzt1QkFBQyxZQUFZLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO2dCQUVVLE9BQU87c0JBQTFELFNBQVM7dUJBQUMsZ0JBQWdCLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO2dCQThHakMsV0FBVztzQkFBdkIsS0FBSztnQkFrQk8sT0FBTztzQkFBbkIsS0FBSztnQkFZTyxPQUFPO3NCQUFuQixLQUFLO2dCQVlPLGFBQWE7c0JBQXpCLEtBQUs7Z0JBWU8sWUFBWTtzQkFBeEIsS0FBSztnQkFZTyxTQUFTO3NCQUFyQixLQUFLO2dCQWdCTyxRQUFRO3NCQUFwQixLQUFLO2dCQWtCRixNQUFNO3NCQURULEtBQUs7O0FBZ2lFVixNQUFNLE9BQU8sY0FBYzs7MkdBQWQsY0FBYzs0R0FBZCxjQUFjLGlCQXYzRWQsUUFBUSxhQW0zRVAsWUFBWSxFQUFDLFlBQVksRUFBQyxZQUFZLEVBQUMsWUFBWSxhQW4zRXBELFFBQVEsRUFvM0VFLFlBQVksRUFBQyxZQUFZOzRHQUduQyxjQUFjLFlBSmQsQ0FBQyxZQUFZLEVBQUMsWUFBWSxFQUFDLFlBQVksRUFBQyxZQUFZLENBQUMsRUFDM0MsWUFBWSxFQUFDLFlBQVk7MkZBR25DLGNBQWM7a0JBTDFCLFFBQVE7bUJBQUM7b0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFDLFlBQVksRUFBQyxZQUFZLEVBQUMsWUFBWSxDQUFDO29CQUM5RCxPQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUMsWUFBWSxFQUFDLFlBQVksQ0FBQztvQkFDN0MsWUFBWSxFQUFFLENBQUMsUUFBUSxDQUFDO2lCQUMzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGUsQ29tcG9uZW50LEVsZW1lbnRSZWYsT25EZXN0cm95LE9uSW5pdCxJbnB1dCxPdXRwdXQsRXZlbnRFbWl0dGVyLGZvcndhcmRSZWYsUmVuZGVyZXIyLFxuICAgICAgICBWaWV3Q2hpbGQsQ2hhbmdlRGV0ZWN0b3JSZWYsVGVtcGxhdGVSZWYsQ29udGVudENoaWxkcmVuLFF1ZXJ5TGlzdCxOZ1pvbmUsQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7dHJpZ2dlcixzdGF0ZSxzdHlsZSx0cmFuc2l0aW9uLGFuaW1hdGUsQW5pbWF0aW9uRXZlbnR9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0J1dHRvbk1vZHVsZX0gZnJvbSAncHJpbWVuZy9idXR0b24nO1xuaW1wb3J0IHtSaXBwbGVNb2R1bGV9IGZyb20gJ3ByaW1lbmcvcmlwcGxlJztcbmltcG9ydCB7RG9tSGFuZGxlciwgQ29ubmVjdGVkT3ZlcmxheVNjcm9sbEhhbmRsZXJ9IGZyb20gJ3ByaW1lbmcvZG9tJztcbmltcG9ydCB7U2hhcmVkTW9kdWxlLFByaW1lVGVtcGxhdGUsUHJpbWVOR0NvbmZpZyxUcmFuc2xhdGlvbktleXMsIE92ZXJsYXlTZXJ2aWNlfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQge05HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3Nvcn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtaSW5kZXhVdGlsc30gZnJvbSAncHJpbWVuZy91dGlscyc7XG5cbmV4cG9ydCBjb25zdCBDQUxFTkRBUl9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IENhbGVuZGFyKSxcbiAgICBtdWx0aTogdHJ1ZVxufTtcblxuZXhwb3J0IGludGVyZmFjZSBMb2NhbGVTZXR0aW5ncyB7XG4gICAgZmlyc3REYXlPZldlZWs/OiBudW1iZXI7XG4gICAgZGF5TmFtZXM/OiBzdHJpbmdbXTtcbiAgICBkYXlOYW1lc1Nob3J0Pzogc3RyaW5nW107XG4gICAgZGF5TmFtZXNNaW4/OiBzdHJpbmdbXTtcbiAgICBtb250aE5hbWVzPzogc3RyaW5nW107XG4gICAgbW9udGhOYW1lc1Nob3J0Pzogc3RyaW5nW107XG4gICAgdG9kYXk/OiBzdHJpbmc7XG4gICAgY2xlYXI/OiBzdHJpbmc7XG4gICAgZGF0ZUZvcm1hdD86IHN0cmluZztcbiAgICB3ZWVrSGVhZGVyPzogc3RyaW5nO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtY2FsZW5kYXInLFxuICAgIHRlbXBsYXRlOiAgYFxuICAgICAgICA8c3BhbiAjY29udGFpbmVyIFtuZ0NsYXNzXT1cInsncC1jYWxlbmRhcic6dHJ1ZSwgJ3AtY2FsZW5kYXItdy1idG4nOiBzaG93SWNvbiwgJ3AtY2FsZW5kYXItdGltZW9ubHknOiB0aW1lT25seSwgJ3AtY2FsZW5kYXItZGlzYWJsZWQnOmRpc2FibGVkLCAncC1mb2N1cyc6IGZvY3VzfVwiIFtuZ1N0eWxlXT1cInN0eWxlXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIj5cbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdJZl09XCIhaW5saW5lXCI+XG4gICAgICAgICAgICAgICAgPGlucHV0ICNpbnB1dGZpZWxkIHR5cGU9XCJ0ZXh0XCIgW2F0dHIuaWRdPVwiaW5wdXRJZFwiIFthdHRyLm5hbWVdPVwibmFtZVwiIFthdHRyLnJlcXVpcmVkXT1cInJlcXVpcmVkXCIgW2F0dHIuYXJpYS1yZXF1aXJlZF09XCJyZXF1aXJlZFwiIFt2YWx1ZV09XCJpbnB1dEZpZWxkVmFsdWVcIiAoZm9jdXMpPVwib25JbnB1dEZvY3VzKCRldmVudClcIiAoa2V5ZG93bik9XCJvbklucHV0S2V5ZG93bigkZXZlbnQpXCIgKGNsaWNrKT1cIm9uSW5wdXRDbGljaygpXCIgKGJsdXIpPVwib25JbnB1dEJsdXIoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgIFtyZWFkb25seV09XCJyZWFkb25seUlucHV0XCIgKGlucHV0KT1cIm9uVXNlcklucHV0KCRldmVudClcIiBbbmdTdHlsZV09XCJpbnB1dFN0eWxlXCIgW2NsYXNzXT1cImlucHV0U3R5bGVDbGFzc1wiIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlcnx8JydcIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIiBbYXR0ci50YWJpbmRleF09XCJ0YWJpbmRleFwiIFthdHRyLmlucHV0bW9kZV09XCJ0b3VjaFVJID8gJ29mZicgOiBudWxsXCJcbiAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwiJ3AtaW5wdXR0ZXh0IHAtY29tcG9uZW50J1wiIGF1dG9jb21wbGV0ZT1cIm9mZlwiIFthdHRyLmFyaWEtbGFiZWxsZWRieV09XCJhcmlhTGFiZWxsZWRCeVwiXG4gICAgICAgICAgICAgICAgICAgID48YnV0dG9uIHR5cGU9XCJidXR0b25cIiBbaWNvbl09XCJpY29uXCIgcEJ1dHRvbiBwUmlwcGxlICpuZ0lmPVwic2hvd0ljb25cIiAoY2xpY2spPVwib25CdXR0b25DbGljaygkZXZlbnQsaW5wdXRmaWVsZClcIiBjbGFzcz1cInAtZGF0ZXBpY2tlci10cmlnZ2VyXCJcbiAgICAgICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCIgdGFiaW5kZXg9XCIwXCI+PC9idXR0b24+XG4gICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgPGRpdiAjY29udGVudFdyYXBwZXIgW2NsYXNzXT1cInBhbmVsU3R5bGVDbGFzc1wiIFtuZ1N0eWxlXT1cInBhbmVsU3R5bGVcIiBbbmdDbGFzc109XCJ7J3AtZGF0ZXBpY2tlciBwLWNvbXBvbmVudCc6IHRydWUsICdwLWRhdGVwaWNrZXItaW5saW5lJzppbmxpbmUsXG4gICAgICAgICAgICAgICAgJ3AtZGlzYWJsZWQnOmRpc2FibGVkLCdwLWRhdGVwaWNrZXItdGltZW9ubHknOnRpbWVPbmx5LCdwLWRhdGVwaWNrZXItbXVsdGlwbGUtbW9udGgnOiB0aGlzLm51bWJlck9mTW9udGhzID4gMSwgJ3AtZGF0ZXBpY2tlci1tb250aHBpY2tlcic6ICh2aWV3ID09PSAnbW9udGgnKSwgJ3AtZGF0ZXBpY2tlci10b3VjaC11aSc6IHRvdWNoVUl9XCJcbiAgICAgICAgICAgICAgICBbQG92ZXJsYXlBbmltYXRpb25dPVwidG91Y2hVSSA/IHt2YWx1ZTogJ3Zpc2libGVUb3VjaFVJJywgcGFyYW1zOiB7c2hvd1RyYW5zaXRpb25QYXJhbXM6IHNob3dUcmFuc2l0aW9uT3B0aW9ucywgaGlkZVRyYW5zaXRpb25QYXJhbXM6IGhpZGVUcmFuc2l0aW9uT3B0aW9uc319OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dmFsdWU6ICd2aXNpYmxlJywgcGFyYW1zOiB7c2hvd1RyYW5zaXRpb25QYXJhbXM6IHNob3dUcmFuc2l0aW9uT3B0aW9ucywgaGlkZVRyYW5zaXRpb25QYXJhbXM6IGhpZGVUcmFuc2l0aW9uT3B0aW9uc319XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW0AuZGlzYWJsZWRdPVwiaW5saW5lID09PSB0cnVlXCIgKEBvdmVybGF5QW5pbWF0aW9uLnN0YXJ0KT1cIm9uT3ZlcmxheUFuaW1hdGlvblN0YXJ0KCRldmVudClcIiAoQG92ZXJsYXlBbmltYXRpb24uZG9uZSk9XCJvbk92ZXJsYXlBbmltYXRpb25Eb25lKCRldmVudClcIiAoY2xpY2spPVwib25PdmVybGF5Q2xpY2soJGV2ZW50KVwiICpuZ0lmPVwiaW5saW5lIHx8IG92ZXJsYXlWaXNpYmxlXCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwicC1oZWFkZXJcIj48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImhlYWRlclRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiF0aW1lT25seVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1kYXRlcGlja2VyLWdyb3VwLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtZGF0ZXBpY2tlci1ncm91cFwiICpuZ0Zvcj1cImxldCBtb250aCBvZiBtb250aHM7IGxldCBpID0gaW5kZXg7XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtZGF0ZXBpY2tlci1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiAoa2V5ZG93bik9XCJvbkNvbnRhaW5lckJ1dHRvbktleWRvd24oJGV2ZW50KVwiIGNsYXNzPVwicC1kYXRlcGlja2VyLXByZXYgcC1saW5rXCIgKGNsaWNrKT1cIm9uUHJldkJ1dHRvbkNsaWNrKCRldmVudClcIiAqbmdJZj1cImkgPT09IDBcIiB0eXBlPVwiYnV0dG9uXCIgcFJpcHBsZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC1kYXRlcGlja2VyLXByZXYtaWNvbiBwaSBwaS1jaGV2cm9uLWxlZnRcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1kYXRlcGlja2VyLXRpdGxlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtZGF0ZXBpY2tlci1tb250aFwiICpuZ0lmPVwiIW1vbnRoTmF2aWdhdG9yICYmICh2aWV3ICE9PSAnbW9udGgnKVwiPnt7Z2V0VHJhbnNsYXRpb24oJ21vbnRoTmFtZXMnKVttb250aC5tb250aF19fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzZWxlY3QgdGFiaW5kZXg9XCIwXCIgY2xhc3M9XCJwLWRhdGVwaWNrZXItbW9udGhcIiAqbmdJZj1cIm1vbnRoTmF2aWdhdG9yICYmICh2aWV3ICE9PSAnbW9udGgnKSAmJiBudW1iZXJPZk1vbnRocyA9PT0gMVwiIChjaGFuZ2UpPVwib25Nb250aERyb3Bkb3duQ2hhbmdlKCRldmVudC50YXJnZXQudmFsdWUpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiBbdmFsdWVdPVwiaVwiICpuZ0Zvcj1cImxldCBtb250aE5hbWUgb2YgZ2V0VHJhbnNsYXRpb24oJ21vbnRoTmFtZXMnKTtsZXQgaSA9IGluZGV4XCIgW3NlbGVjdGVkXT1cImkgPT09IG1vbnRoLm1vbnRoXCI+e3ttb250aE5hbWV9fTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c2VsZWN0IHRhYmluZGV4PVwiMFwiIGNsYXNzPVwicC1kYXRlcGlja2VyLXllYXJcIiAqbmdJZj1cInllYXJOYXZpZ2F0b3IgJiYgbnVtYmVyT2ZNb250aHMgPT09IDFcIiAoY2hhbmdlKT1cIm9uWWVhckRyb3Bkb3duQ2hhbmdlKCRldmVudC50YXJnZXQudmFsdWUpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiBbdmFsdWVdPVwieWVhclwiICpuZ0Zvcj1cImxldCB5ZWFyIG9mIHllYXJPcHRpb25zXCIgW3NlbGVjdGVkXT1cInllYXIgPT09IGN1cnJlbnRZZWFyXCI+e3t5ZWFyfX08L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLWRhdGVwaWNrZXIteWVhclwiICpuZ0lmPVwiIXllYXJOYXZpZ2F0b3JcIj57e3ZpZXcgPT09ICdtb250aCcgPyBjdXJyZW50WWVhciA6IG1vbnRoLnllYXJ9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gKGtleWRvd24pPVwib25Db250YWluZXJCdXR0b25LZXlkb3duKCRldmVudClcIiBjbGFzcz1cInAtZGF0ZXBpY2tlci1uZXh0IHAtbGlua1wiIChjbGljayk9XCJvbk5leHRCdXR0b25DbGljaygkZXZlbnQpXCIgKm5nSWY9XCJudW1iZXJPZk1vbnRocyA9PT0gMSA/IHRydWUgOiAoaSA9PT0gbnVtYmVyT2ZNb250aHMgLTEpXCIgdHlwZT1cImJ1dHRvblwiIHBSaXBwbGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtZGF0ZXBpY2tlci1uZXh0LWljb24gcGkgcGktY2hldnJvbi1yaWdodFwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtZGF0ZXBpY2tlci1jYWxlbmRhci1jb250YWluZXJcIiAqbmdJZj1cInZpZXcgPT09J2RhdGUnXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzcz1cInAtZGF0ZXBpY2tlci1jYWxlbmRhclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoICpuZ0lmPVwic2hvd1dlZWtcIiBjbGFzcz1cInAtZGF0ZXBpY2tlci13ZWVraGVhZGVyIHAtZGlzYWJsZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPnt7Z2V0VHJhbnNsYXRpb24oJ3dlZWtIZWFkZXInKX19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggc2NvcGU9XCJjb2xcIiAqbmdGb3I9XCJsZXQgd2Vla0RheSBvZiB3ZWVrRGF5cztsZXQgYmVnaW4gPSBmaXJzdDsgbGV0IGVuZCA9IGxhc3RcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPnt7d2Vla0RheX19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ciAqbmdGb3I9XCJsZXQgd2VlayBvZiBtb250aC5kYXRlczsgbGV0IGogPSBpbmRleDtcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkICpuZ0lmPVwic2hvd1dlZWtcIiBjbGFzcz1cInAtZGF0ZXBpY2tlci13ZWVrbnVtYmVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtZGlzYWJsZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7e21vbnRoLndlZWtOdW1iZXJzW2pdfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkICpuZ0Zvcj1cImxldCBkYXRlIG9mIHdlZWtcIiBbbmdDbGFzc109XCJ7J3AtZGF0ZXBpY2tlci1vdGhlci1tb250aCc6IGRhdGUub3RoZXJNb250aCwncC1kYXRlcGlja2VyLXRvZGF5JzpkYXRlLnRvZGF5fVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImRhdGUub3RoZXJNb250aCA/IHNob3dPdGhlck1vbnRocyA6IHRydWVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBbbmdDbGFzc109XCJ7J3AtaGlnaGxpZ2h0Jzppc1NlbGVjdGVkKGRhdGUpLCAncC1kaXNhYmxlZCc6ICFkYXRlLnNlbGVjdGFibGV9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIm9uRGF0ZVNlbGVjdCgkZXZlbnQsZGF0ZSlcIiBkcmFnZ2FibGU9XCJmYWxzZVwiIChrZXlkb3duKT1cIm9uRGF0ZUNlbGxLZXlkb3duKCRldmVudCxkYXRlLGkpXCIgcFJpcHBsZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFkYXRlVGVtcGxhdGVcIj57e2RhdGUuZGF5fX08L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImRhdGVUZW1wbGF0ZTsgY29udGV4dDogeyRpbXBsaWNpdDogZGF0ZX1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtbW9udGhwaWNrZXJcIiAqbmdJZj1cInZpZXcgPT09ICdtb250aCdcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0Zvcj1cImxldCBtIG9mIG1vbnRoUGlja2VyVmFsdWVzOyBsZXQgaSA9IGluZGV4XCIgKGNsaWNrKT1cIm9uTW9udGhTZWxlY3QoJGV2ZW50LCBpKVwiIChrZXlkb3duKT1cIm9uTW9udGhDZWxsS2V5ZG93bigkZXZlbnQsaSlcIiBjbGFzcz1cInAtbW9udGhwaWNrZXItbW9udGhcIiBbbmdDbGFzc109XCJ7J3AtaGlnaGxpZ2h0JzogaXNNb250aFNlbGVjdGVkKGkpLCAncC1kaXNhYmxlZCc6IWlzU2VsZWN0YWJsZSgxLCBpLCB0aGlzLmN1cnJlbnRZZWFyLCBmYWxzZSl9XCIgcFJpcHBsZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7e219fVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC10aW1lcGlja2VyXCIgKm5nSWY9XCJzaG93VGltZXx8dGltZU9ubHlcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtaG91ci1waWNrZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJwLWxpbmtcIiB0eXBlPVwiYnV0dG9uXCIgKGtleWRvd24pPVwib25Db250YWluZXJCdXR0b25LZXlkb3duKCRldmVudClcIiAoa2V5ZG93bi5lbnRlcik9XCJpbmNyZW1lbnRIb3VyKCRldmVudClcIiAobW91c2Vkb3duKT1cIm9uVGltZVBpY2tlckVsZW1lbnRNb3VzZURvd24oJGV2ZW50LCAwLCAxKVwiIChtb3VzZXVwKT1cIm9uVGltZVBpY2tlckVsZW1lbnRNb3VzZVVwKCRldmVudClcIiAobW91c2VsZWF2ZSk9XCJvblRpbWVQaWNrZXJFbGVtZW50TW91c2VMZWF2ZSgpXCIgcFJpcHBsZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInBpIHBpLWNoZXZyb24tdXBcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPjxuZy1jb250YWluZXIgKm5nSWY9XCJjdXJyZW50SG91ciA8IDEwXCI+MDwvbmctY29udGFpbmVyPnt7Y3VycmVudEhvdXJ9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJwLWxpbmtcIiB0eXBlPVwiYnV0dG9uXCIgKGtleWRvd24pPVwib25Db250YWluZXJCdXR0b25LZXlkb3duKCRldmVudClcIiAoa2V5ZG93bi5lbnRlcik9XCJkZWNyZW1lbnRIb3VyKCRldmVudClcIiAobW91c2Vkb3duKT1cIm9uVGltZVBpY2tlckVsZW1lbnRNb3VzZURvd24oJGV2ZW50LCAwLCAtMSlcIiAobW91c2V1cCk9XCJvblRpbWVQaWNrZXJFbGVtZW50TW91c2VVcCgkZXZlbnQpXCIgKG1vdXNlbGVhdmUpPVwib25UaW1lUGlja2VyRWxlbWVudE1vdXNlTGVhdmUoKVwiIHBSaXBwbGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwaSBwaS1jaGV2cm9uLWRvd25cIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLXNlcGFyYXRvclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e3t0aW1lU2VwYXJhdG9yfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1taW51dGUtcGlja2VyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwicC1saW5rXCIgdHlwZT1cImJ1dHRvblwiIChrZXlkb3duKT1cIm9uQ29udGFpbmVyQnV0dG9uS2V5ZG93bigkZXZlbnQpXCIgKGtleWRvd24uZW50ZXIpPVwiaW5jcmVtZW50TWludXRlKCRldmVudClcIiAobW91c2Vkb3duKT1cIm9uVGltZVBpY2tlckVsZW1lbnRNb3VzZURvd24oJGV2ZW50LCAxLCAxKVwiIChtb3VzZXVwKT1cIm9uVGltZVBpY2tlckVsZW1lbnRNb3VzZVVwKCRldmVudClcIiAobW91c2VsZWF2ZSk9XCJvblRpbWVQaWNrZXJFbGVtZW50TW91c2VMZWF2ZSgpXCIgcFJpcHBsZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInBpIHBpLWNoZXZyb24tdXBcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPjxuZy1jb250YWluZXIgKm5nSWY9XCJjdXJyZW50TWludXRlIDwgMTBcIj4wPC9uZy1jb250YWluZXI+e3tjdXJyZW50TWludXRlfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwicC1saW5rXCIgdHlwZT1cImJ1dHRvblwiIChrZXlkb3duKT1cIm9uQ29udGFpbmVyQnV0dG9uS2V5ZG93bigkZXZlbnQpXCIgKGtleWRvd24uZW50ZXIpPVwiZGVjcmVtZW50TWludXRlKCRldmVudClcIiAobW91c2Vkb3duKT1cIm9uVGltZVBpY2tlckVsZW1lbnRNb3VzZURvd24oJGV2ZW50LCAxLCAtMSlcIiAobW91c2V1cCk9XCJvblRpbWVQaWNrZXJFbGVtZW50TW91c2VVcCgkZXZlbnQpXCIgKG1vdXNlbGVhdmUpPVwib25UaW1lUGlja2VyRWxlbWVudE1vdXNlTGVhdmUoKVwiIHBSaXBwbGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwaSBwaS1jaGV2cm9uLWRvd25cIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLXNlcGFyYXRvclwiICpuZ0lmPVwic2hvd1NlY29uZHNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPnt7dGltZVNlcGFyYXRvcn19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtc2Vjb25kLXBpY2tlclwiICpuZ0lmPVwic2hvd1NlY29uZHNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJwLWxpbmtcIiB0eXBlPVwiYnV0dG9uXCIgKGtleWRvd24pPVwib25Db250YWluZXJCdXR0b25LZXlkb3duKCRldmVudClcIiAoa2V5ZG93bi5lbnRlcik9XCJpbmNyZW1lbnRTZWNvbmQoJGV2ZW50KVwiIChtb3VzZWRvd24pPVwib25UaW1lUGlja2VyRWxlbWVudE1vdXNlRG93bigkZXZlbnQsIDIsIDEpXCIgKG1vdXNldXApPVwib25UaW1lUGlja2VyRWxlbWVudE1vdXNlVXAoJGV2ZW50KVwiIChtb3VzZWxlYXZlKT1cIm9uVGltZVBpY2tlckVsZW1lbnRNb3VzZUxlYXZlKClcIiBwUmlwcGxlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicGkgcGktY2hldnJvbi11cFwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+PG5nLWNvbnRhaW5lciAqbmdJZj1cImN1cnJlbnRTZWNvbmQgPCAxMFwiPjA8L25nLWNvbnRhaW5lcj57e2N1cnJlbnRTZWNvbmR9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJwLWxpbmtcIiB0eXBlPVwiYnV0dG9uXCIgKGtleWRvd24pPVwib25Db250YWluZXJCdXR0b25LZXlkb3duKCRldmVudClcIiAoa2V5ZG93bi5lbnRlcik9XCJkZWNyZW1lbnRTZWNvbmQoJGV2ZW50KVwiIChtb3VzZWRvd24pPVwib25UaW1lUGlja2VyRWxlbWVudE1vdXNlRG93bigkZXZlbnQsIDIsIC0xKVwiIChtb3VzZXVwKT1cIm9uVGltZVBpY2tlckVsZW1lbnRNb3VzZVVwKCRldmVudClcIiAobW91c2VsZWF2ZSk9XCJvblRpbWVQaWNrZXJFbGVtZW50TW91c2VMZWF2ZSgpXCIgcFJpcHBsZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInBpIHBpLWNoZXZyb24tZG93blwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtYW1wbS1waWNrZXJcIiAqbmdJZj1cImhvdXJGb3JtYXQ9PScxMidcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJwLWxpbmtcIiB0eXBlPVwiYnV0dG9uXCIgKGtleWRvd24pPVwib25Db250YWluZXJCdXR0b25LZXlkb3duKCRldmVudClcIiAoY2xpY2spPVwidG9nZ2xlQU1QTSgkZXZlbnQpXCIgKGtleWRvd24uZW50ZXIpPVwidG9nZ2xlQU1QTSgkZXZlbnQpXCIgcFJpcHBsZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInBpIHBpLWNoZXZyb24tdXBcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPnt7cG0gPyAnUE0nIDogJ0FNJ319PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInAtbGlua1wiIHR5cGU9XCJidXR0b25cIiAoa2V5ZG93bik9XCJvbkNvbnRhaW5lckJ1dHRvbktleWRvd24oJGV2ZW50KVwiIChjbGljayk9XCJ0b2dnbGVBTVBNKCRldmVudClcIiAoa2V5ZG93bi5lbnRlcik9XCJ0b2dnbGVBTVBNKCRldmVudClcIiBwUmlwcGxlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicGkgcGktY2hldnJvbi1kb3duXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLWRhdGVwaWNrZXItYnV0dG9uYmFyXCIgKm5nSWY9XCJzaG93QnV0dG9uQmFyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIFtsYWJlbF09XCJnZXRUcmFuc2xhdGlvbigndG9kYXknKVwiIChrZXlkb3duKT1cIm9uQ29udGFpbmVyQnV0dG9uS2V5ZG93bigkZXZlbnQpXCIgKGNsaWNrKT1cIm9uVG9kYXlCdXR0b25DbGljaygkZXZlbnQpXCIgcEJ1dHRvbiBwUmlwcGxlIFtuZ0NsYXNzXT1cIlt0b2RheUJ1dHRvblN0eWxlQ2xhc3NdXCI+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIFtsYWJlbF09XCJnZXRUcmFuc2xhdGlvbignY2xlYXInKVwiIChrZXlkb3duKT1cIm9uQ29udGFpbmVyQnV0dG9uS2V5ZG93bigkZXZlbnQpXCIgKGNsaWNrKT1cIm9uQ2xlYXJCdXR0b25DbGljaygkZXZlbnQpXCIgcEJ1dHRvbiBwUmlwcGxlIFtuZ0NsYXNzXT1cIltjbGVhckJ1dHRvblN0eWxlQ2xhc3NdXCI+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwicC1mb290ZXJcIj48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImZvb3RlclRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9zcGFuPlxuICAgIGAsXG4gICAgYW5pbWF0aW9uczogW1xuICAgICAgICB0cmlnZ2VyKCdvdmVybGF5QW5pbWF0aW9uJywgW1xuICAgICAgICAgICAgc3RhdGUoJ3Zpc2libGVUb3VjaFVJJywgc3R5bGUoe1xuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZSgtNTAlLC01MCUpJyxcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAxXG4gICAgICAgICAgICB9KSksXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCd2b2lkID0+IHZpc2libGUnLCBbXG4gICAgICAgICAgICAgICAgc3R5bGUoe29wYWNpdHk6IDAsIHRyYW5zZm9ybTogJ3NjYWxlWSgwLjgpJ30pLFxuICAgICAgICAgICAgICAgIGFuaW1hdGUoJ3t7c2hvd1RyYW5zaXRpb25QYXJhbXN9fScsIHN0eWxlKHsgb3BhY2l0eTogMSwgdHJhbnNmb3JtOiAnKicgfSkpXG4gICAgICAgICAgICBdKSxcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJ3Zpc2libGUgPT4gdm9pZCcsIFtcbiAgICAgICAgICAgICAgICBhbmltYXRlKCd7e2hpZGVUcmFuc2l0aW9uUGFyYW1zfX0nLCBzdHlsZSh7IG9wYWNpdHk6IDAgfSkpXG4gICAgICAgICAgICBdKSxcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJ3ZvaWQgPT4gdmlzaWJsZVRvdWNoVUknLCBbXG4gICAgICAgICAgICAgICAgc3R5bGUoe29wYWNpdHk6IDAsIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZTNkKC01MCUsIC00MCUsIDApIHNjYWxlKDAuOSknfSksXG4gICAgICAgICAgICAgICAgYW5pbWF0ZSgne3tzaG93VHJhbnNpdGlvblBhcmFtc319JylcbiAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgdHJhbnNpdGlvbigndmlzaWJsZVRvdWNoVUkgPT4gdm9pZCcsIFtcbiAgICAgICAgICAgICAgICBhbmltYXRlKCgne3toaWRlVHJhbnNpdGlvblBhcmFtc319JyksXG4gICAgICAgICAgICAgICAgc3R5bGUoe1xuICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAwLFxuICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGUzZCgtNTAlLCAtNDAlLCAwKSBzY2FsZSgwLjkpJ1xuICAgICAgICAgICAgICAgIH0pKVxuICAgICAgICAgICAgXSlcbiAgICAgICAgXSlcbiAgICBdLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ2NsYXNzJzogJ3AtZWxlbWVudCBwLWlucHV0d3JhcHBlcicsXG4gICAgICAgICdbY2xhc3MucC1pbnB1dHdyYXBwZXItZmlsbGVkXSc6ICdmaWxsZWQnLFxuICAgICAgICAnW2NsYXNzLnAtaW5wdXR3cmFwcGVyLWZvY3VzXSc6ICdmb2N1cydcbiAgICB9LFxuICAgIHByb3ZpZGVyczogW0NBTEVOREFSX1ZBTFVFX0FDQ0VTU09SXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIHN0eWxlVXJsczogWycuL2NhbGVuZGFyLmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIENhbGVuZGFyIGltcGxlbWVudHMgT25Jbml0LE9uRGVzdHJveSxDb250cm9sVmFsdWVBY2Nlc3NvciB7XG5cbiAgICBASW5wdXQoKSBzdHlsZTogYW55O1xuXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgaW5wdXRTdHlsZTogYW55O1xuXG4gICAgQElucHV0KCkgaW5wdXRJZDogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgbmFtZTogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgaW5wdXRTdHlsZUNsYXNzOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBwbGFjZWhvbGRlcjogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgYXJpYUxhYmVsbGVkQnk6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGRpc2FibGVkOiBhbnk7XG5cbiAgICBASW5wdXQoKSBkYXRlRm9ybWF0OiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBtdWx0aXBsZVNlcGFyYXRvcjogc3RyaW5nID0gJywnO1xuXG4gICAgQElucHV0KCkgcmFuZ2VTZXBhcmF0b3I6IHN0cmluZyA9ICctJztcblxuICAgIEBJbnB1dCgpIGlubGluZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KCkgc2hvd090aGVyTW9udGhzOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpIHNlbGVjdE90aGVyTW9udGhzOiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgc2hvd0ljb246IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSBpY29uOiBzdHJpbmcgPSAncGkgcGktY2FsZW5kYXInO1xuXG4gICAgQElucHV0KCkgYXBwZW5kVG86IGFueTtcblxuICAgIEBJbnB1dCgpIHJlYWRvbmx5SW5wdXQ6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSBzaG9ydFllYXJDdXRvZmY6IGFueSA9ICcrMTAnO1xuXG4gICAgQElucHV0KCkgbW9udGhOYXZpZ2F0b3I6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSB5ZWFyTmF2aWdhdG9yOiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgaG91ckZvcm1hdDogc3RyaW5nID0gJzI0JztcblxuICAgIEBJbnB1dCgpIHRpbWVPbmx5OiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgc3RlcEhvdXI6IG51bWJlciA9IDE7XG5cbiAgICBASW5wdXQoKSBzdGVwTWludXRlOiBudW1iZXIgPSAxO1xuXG4gICAgQElucHV0KCkgc3RlcFNlY29uZDogbnVtYmVyID0gMTtcblxuICAgIEBJbnB1dCgpIHNob3dTZWNvbmRzOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKSByZXF1aXJlZDogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIHNob3dPbkZvY3VzOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpIHNob3dXZWVrOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKSBkYXRhVHlwZTogc3RyaW5nID0gJ2RhdGUnO1xuXG4gICAgQElucHV0KCkgc2VsZWN0aW9uTW9kZTogc3RyaW5nID0gJ3NpbmdsZSc7XG5cbiAgICBASW5wdXQoKSBtYXhEYXRlQ291bnQ6IG51bWJlcjtcblxuICAgIEBJbnB1dCgpIHNob3dCdXR0b25CYXI6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSB0b2RheUJ1dHRvblN0eWxlQ2xhc3M6IHN0cmluZyA9ICdwLWJ1dHRvbi10ZXh0JztcblxuICAgIEBJbnB1dCgpIGNsZWFyQnV0dG9uU3R5bGVDbGFzczogc3RyaW5nID0gJ3AtYnV0dG9uLXRleHQnO1xuXG4gICAgQElucHV0KCkgYXV0b1pJbmRleDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKSBiYXNlWkluZGV4OiBudW1iZXIgPSAwO1xuXG4gICAgQElucHV0KCkgcGFuZWxTdHlsZUNsYXNzOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBwYW5lbFN0eWxlOiBhbnk7XG5cbiAgICBASW5wdXQoKSBrZWVwSW52YWxpZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KCkgaGlkZU9uRGF0ZVRpbWVTZWxlY3Q6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkgbnVtYmVyT2ZNb250aHM6IG51bWJlciA9IDE7XG5cbiAgICBASW5wdXQoKSB2aWV3OiBzdHJpbmcgPSAnZGF0ZSc7XG5cbiAgICBASW5wdXQoKSB0b3VjaFVJOiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgdGltZVNlcGFyYXRvcjogc3RyaW5nID0gXCI6XCI7XG5cbiAgICBASW5wdXQoKSBmb2N1c1RyYXA6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkgZmlyc3REYXlPZldlZWs6IG51bWJlciA9IDA7XG5cbiAgICBASW5wdXQoKSBzaG93VHJhbnNpdGlvbk9wdGlvbnM6IHN0cmluZyA9ICcuMTJzIGN1YmljLWJlemllcigwLCAwLCAwLjIsIDEpJztcblxuICAgIEBJbnB1dCgpIGhpZGVUcmFuc2l0aW9uT3B0aW9uczogc3RyaW5nID0gJy4xcyBsaW5lYXInO1xuXG4gICAgQE91dHB1dCgpIG9uRm9jdXM6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIG9uQmx1cjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25DbG9zZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25TZWxlY3Q6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIG9uSW5wdXQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIG9uVG9kYXlDbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25DbGVhckNsaWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBvbk1vbnRoQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBvblllYXJDaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIG9uQ2xpY2tPdXRzaWRlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBvblNob3c6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihQcmltZVRlbXBsYXRlKSB0ZW1wbGF0ZXM6IFF1ZXJ5TGlzdDxhbnk+O1xuXG4gICAgQElucHV0KCkgdGFiaW5kZXg6IG51bWJlcjtcblxuICAgIEBWaWV3Q2hpbGQoJ2NvbnRhaW5lcicsIHsgc3RhdGljOiBmYWxzZSB9KSBjb250YWluZXJWaWV3Q2hpbGQ6IEVsZW1lbnRSZWY7XG5cbiAgICBAVmlld0NoaWxkKCdpbnB1dGZpZWxkJywgeyBzdGF0aWM6IGZhbHNlIH0pIGlucHV0ZmllbGRWaWV3Q2hpbGQ6IEVsZW1lbnRSZWY7XG5cbiAgICBAVmlld0NoaWxkKCdjb250ZW50V3JhcHBlcicsIHsgc3RhdGljOiBmYWxzZSB9KSBzZXQgY29udGVudCAoY29udGVudDogRWxlbWVudFJlZikge1xuICAgICAgICB0aGlzLmNvbnRlbnRWaWV3Q2hpbGQgPSBjb250ZW50O1xuXG4gICAgICAgIGlmICh0aGlzLmNvbnRlbnRWaWV3Q2hpbGQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzTW9udGhOYXZpZ2F0ZSkge1xuICAgICAgICAgICAgICAgIFByb21pc2UucmVzb2x2ZShudWxsKS50aGVuKCgpID0+IHRoaXMudXBkYXRlRm9jdXMoKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5pc01vbnRoTmF2aWdhdGUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5pdEZvY3VzYWJsZUNlbGwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjb250ZW50Vmlld0NoaWxkOiBFbGVtZW50UmVmO1xuXG4gICAgdmFsdWU6IGFueTtcblxuICAgIGRhdGVzOiBhbnlbXTtcblxuICAgIG1vbnRoczogYW55W107XG5cbiAgICBtb250aFBpY2tlclZhbHVlczogYW55W107XG5cbiAgICB3ZWVrRGF5czogc3RyaW5nW107XG5cbiAgICBjdXJyZW50TW9udGg6IG51bWJlcjtcblxuICAgIGN1cnJlbnRZZWFyOiBudW1iZXI7XG5cbiAgICBjdXJyZW50SG91cjogbnVtYmVyO1xuXG4gICAgY3VycmVudE1pbnV0ZTogbnVtYmVyO1xuXG4gICAgY3VycmVudFNlY29uZDogbnVtYmVyO1xuXG4gICAgcG06IGJvb2xlYW47XG5cbiAgICBtYXNrOiBIVE1MRGl2RWxlbWVudDtcblxuICAgIG1hc2tDbGlja0xpc3RlbmVyOiBGdW5jdGlvbjtcblxuICAgIG92ZXJsYXk6IEhUTUxEaXZFbGVtZW50O1xuXG4gICAgb3ZlcmxheVZpc2libGU6IGJvb2xlYW47XG5cbiAgICBvbk1vZGVsQ2hhbmdlOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuXG4gICAgb25Nb2RlbFRvdWNoZWQ6IEZ1bmN0aW9uID0gKCkgPT4ge307XG5cbiAgICBjYWxlbmRhckVsZW1lbnQ6IGFueTtcblxuICAgIHRpbWVQaWNrZXJUaW1lcjphbnk7XG5cbiAgICBkb2N1bWVudENsaWNrTGlzdGVuZXI6IGFueTtcblxuICAgIHRpY2tzVG8xOTcwOiBudW1iZXI7XG5cbiAgICB5ZWFyT3B0aW9uczogbnVtYmVyW107XG5cbiAgICBmb2N1czogYm9vbGVhbjtcblxuICAgIGlzS2V5ZG93bjogYm9vbGVhbjtcblxuICAgIGZpbGxlZDogYm9vbGVhbjtcblxuICAgIGlucHV0RmllbGRWYWx1ZTogc3RyaW5nID0gbnVsbDtcblxuICAgIF9taW5EYXRlOiBEYXRlO1xuXG4gICAgX21heERhdGU6IERhdGU7XG5cbiAgICBfc2hvd1RpbWU6IGJvb2xlYW47XG5cbiAgICBfeWVhclJhbmdlOiBzdHJpbmc7XG5cbiAgICBwcmV2ZW50RG9jdW1lbnRMaXN0ZW5lcjogYm9vbGVhbjtcblxuICAgIGRhdGVUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIGhlYWRlclRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgZm9vdGVyVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBkaXNhYmxlZERhdGVUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIF9kaXNhYmxlZERhdGVzOiBBcnJheTxEYXRlPjtcblxuICAgIF9kaXNhYmxlZERheXM6IEFycmF5PG51bWJlcj47XG5cbiAgICBzZWxlY3RFbGVtZW50OiBhbnk7XG5cbiAgICB0b2RheUVsZW1lbnQ6IGFueTtcblxuICAgIGZvY3VzRWxlbWVudDogYW55O1xuXG4gICAgc2Nyb2xsSGFuZGxlcjogYW55O1xuXG4gICAgZG9jdW1lbnRSZXNpemVMaXN0ZW5lcjogYW55O1xuXG4gICAgbmF2aWdhdGlvblN0YXRlOiBhbnkgPSBudWxsO1xuXG4gICAgaXNNb250aE5hdmlnYXRlOiBib29sZWFuO1xuXG4gICAgaW5pdGlhbGl6ZWQ6IGJvb2xlYW47XG5cbiAgICB0cmFuc2xhdGlvblN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgX2xvY2FsZTogTG9jYWxlU2V0dGluZ3M7XG5cbiAgICBASW5wdXQoKSBnZXQgZGVmYXVsdERhdGUoKTogRGF0ZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kZWZhdWx0RGF0ZTtcbiAgICB9O1xuXG4gICAgc2V0IGRlZmF1bHREYXRlKGRlZmF1bHREYXRlOiBEYXRlKSB7XG4gICAgICAgIHRoaXMuX2RlZmF1bHREYXRlID0gZGVmYXVsdERhdGU7XG5cbiAgICAgICAgaWYgKHRoaXMuaW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGUgPSBkZWZhdWx0RGF0ZXx8bmV3IERhdGUoKTtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudE1vbnRoID0gZGF0ZS5nZXRNb250aCgpO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50WWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgICAgIHRoaXMuaW5pdFRpbWUoZGF0ZSk7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZU1vbnRocyh0aGlzLmN1cnJlbnRNb250aCwgdGhpcy5jdXJyZW50WWVhcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfZGVmYXVsdERhdGU6IERhdGU7XG5cbiAgICBASW5wdXQoKSBnZXQgbWluRGF0ZSgpOiBEYXRlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21pbkRhdGU7XG4gICAgfVxuXG4gICAgc2V0IG1pbkRhdGUoZGF0ZTogRGF0ZSkge1xuICAgICAgICB0aGlzLl9taW5EYXRlID0gZGF0ZTtcblxuICAgICAgICBpZiAodGhpcy5jdXJyZW50TW9udGggIT0gdW5kZWZpbmVkICYmIHRoaXMuY3VycmVudE1vbnRoICE9IG51bGwgJiYgdGhpcy5jdXJyZW50WWVhcikge1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVNb250aHModGhpcy5jdXJyZW50TW9udGgsIHRoaXMuY3VycmVudFllYXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQElucHV0KCkgZ2V0IG1heERhdGUoKTogRGF0ZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXhEYXRlO1xuICAgIH1cblxuICAgIHNldCBtYXhEYXRlKGRhdGU6IERhdGUpIHtcbiAgICAgICAgdGhpcy5fbWF4RGF0ZSA9IGRhdGU7XG5cbiAgICAgICAgaWYgKHRoaXMuY3VycmVudE1vbnRoICE9IHVuZGVmaW5lZCAmJiB0aGlzLmN1cnJlbnRNb250aCAhPSBudWxsICAmJiB0aGlzLmN1cnJlbnRZZWFyKSB7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZU1vbnRocyh0aGlzLmN1cnJlbnRNb250aCwgdGhpcy5jdXJyZW50WWVhcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASW5wdXQoKSBnZXQgZGlzYWJsZWREYXRlcygpOiBEYXRlW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWREYXRlcztcbiAgICB9XG5cbiAgICBzZXQgZGlzYWJsZWREYXRlcyhkaXNhYmxlZERhdGVzOiBEYXRlW10pIHtcbiAgICAgICAgdGhpcy5fZGlzYWJsZWREYXRlcyA9IGRpc2FibGVkRGF0ZXM7XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRNb250aCAhPSB1bmRlZmluZWQgJiYgdGhpcy5jdXJyZW50TW9udGggIT0gbnVsbCAgJiYgdGhpcy5jdXJyZW50WWVhcikge1xuXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZU1vbnRocyh0aGlzLmN1cnJlbnRNb250aCwgdGhpcy5jdXJyZW50WWVhcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASW5wdXQoKSBnZXQgZGlzYWJsZWREYXlzKCk6IG51bWJlcltdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkRGF5cztcbiAgICB9XG5cbiAgICBzZXQgZGlzYWJsZWREYXlzKGRpc2FibGVkRGF5czogbnVtYmVyW10pIHtcbiAgICAgICAgdGhpcy5fZGlzYWJsZWREYXlzID0gZGlzYWJsZWREYXlzO1xuXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRNb250aCAhPSB1bmRlZmluZWQgJiYgdGhpcy5jdXJyZW50TW9udGggIT0gbnVsbCAgJiYgdGhpcy5jdXJyZW50WWVhcikge1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVNb250aHModGhpcy5jdXJyZW50TW9udGgsIHRoaXMuY3VycmVudFllYXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQElucHV0KCkgZ2V0IHllYXJSYW5nZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5feWVhclJhbmdlO1xuICAgIH1cblxuICAgIHNldCB5ZWFyUmFuZ2UoeWVhclJhbmdlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5feWVhclJhbmdlID0geWVhclJhbmdlO1xuXG4gICAgICAgIGlmICh5ZWFyUmFuZ2UpIHtcbiAgICAgICAgICAgIGNvbnN0IHllYXJzID0geWVhclJhbmdlLnNwbGl0KCc6Jyk7XG4gICAgICAgICAgICBjb25zdCB5ZWFyU3RhcnQgPSBwYXJzZUludCh5ZWFyc1swXSk7XG4gICAgICAgICAgICBjb25zdCB5ZWFyRW5kID0gcGFyc2VJbnQoeWVhcnNbMV0pO1xuXG4gICAgICAgICAgICB0aGlzLnBvcHVsYXRlWWVhck9wdGlvbnMoeWVhclN0YXJ0LCB5ZWFyRW5kKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBJbnB1dCgpIGdldCBzaG93VGltZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Nob3dUaW1lO1xuICAgIH1cblxuICAgIHNldCBzaG93VGltZShzaG93VGltZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9zaG93VGltZSA9IHNob3dUaW1lO1xuXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRIb3VyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdFRpbWUodGhpcy52YWx1ZXx8bmV3IERhdGUoKSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51cGRhdGVJbnB1dGZpZWxkKCk7XG4gICAgfVxuXG4gICAgZ2V0IGxvY2FsZSgpIHtcbiAgICAgICByZXR1cm4gdGhpcy5fbG9jYWxlO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IGxvY2FsZShuZXdMb2NhbGU6IExvY2FsZVNldHRpbmdzKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcIkxvY2FsZSBwcm9wZXJ0eSBoYXMgbm8gZWZmZWN0LCB1c2UgbmV3IGkxOG4gQVBJIGluc3RlYWQuXCIpO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZiwgcHVibGljIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHB1YmxpYyBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsIHByaXZhdGUgem9uZTogTmdab25lLCBwcml2YXRlIGNvbmZpZzogUHJpbWVOR0NvbmZpZywgcHVibGljIG92ZXJsYXlTZXJ2aWNlOiBPdmVybGF5U2VydmljZSkge31cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBjb25zdCBkYXRlID0gdGhpcy5kZWZhdWx0RGF0ZXx8bmV3IERhdGUoKTtcbiAgICAgICAgdGhpcy5jdXJyZW50TW9udGggPSBkYXRlLmdldE1vbnRoKCk7XG4gICAgICAgIHRoaXMuY3VycmVudFllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XG5cbiAgICAgICAgaWYgKHRoaXMudmlldyA9PT0gJ2RhdGUnKSB7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVdlZWtEYXlzKCk7XG4gICAgICAgICAgICB0aGlzLmluaXRUaW1lKGRhdGUpO1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVNb250aHModGhpcy5jdXJyZW50TW9udGgsIHRoaXMuY3VycmVudFllYXIpO1xuICAgICAgICAgICAgdGhpcy50aWNrc1RvMTk3MCA9ICgoKDE5NzAgLSAxKSAqIDM2NSArIE1hdGguZmxvb3IoMTk3MCAvIDQpIC0gTWF0aC5mbG9vcigxOTcwIC8gMTAwKSArIE1hdGguZmxvb3IoMTk3MCAvIDQwMCkpICogMjQgKiA2MCAqIDYwICogMTAwMDAwMDApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMudmlldyA9PT0gJ21vbnRoJykge1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVNb250aFBpY2tlclZhbHVlcygpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50cmFuc2xhdGlvblN1YnNjcmlwdGlvbiA9IHRoaXMuY29uZmlnLnRyYW5zbGF0aW9uT2JzZXJ2ZXIuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlV2Vla0RheXMoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgICAgICB0aGlzLnRlbXBsYXRlcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2ggKGl0ZW0uZ2V0VHlwZSgpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnZGF0ZSc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2Rpc2FibGVkRGF0ZSc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGlzYWJsZWREYXRlVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnaGVhZGVyJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZWFkZXJUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdmb290ZXInOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZvb3RlclRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0VHJhbnNsYXRpb24ob3B0aW9uOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLmdldFRyYW5zbGF0aW9uKG9wdGlvbik7XG4gICAgfVxuXG4gICAgcG9wdWxhdGVZZWFyT3B0aW9ucyhzdGFydCwgZW5kKSB7XG4gICAgICAgIHRoaXMueWVhck9wdGlvbnMgPSBbXTtcblxuICAgICAgICBmb3IgKGxldCBpID0gc3RhcnQ7IGkgPD0gZW5kOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMueWVhck9wdGlvbnMucHVzaChpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNyZWF0ZVdlZWtEYXlzKCkge1xuICAgICAgICB0aGlzLndlZWtEYXlzID0gW107XG4gICAgICAgIGxldCBkYXlJbmRleCA9IHRoaXMuZmlyc3REYXlPZldlZWs7XG4gICAgICAgIGxldCBkYXlMYWJlbHMgPSB0aGlzLmdldFRyYW5zbGF0aW9uKFRyYW5zbGF0aW9uS2V5cy5EQVlfTkFNRVNfTUlOKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA3OyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMud2Vla0RheXMucHVzaChkYXlMYWJlbHNbZGF5SW5kZXhdKTtcbiAgICAgICAgICAgIGRheUluZGV4ID0gKGRheUluZGV4ID09IDYpID8gMCA6ICsrZGF5SW5kZXg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjcmVhdGVNb250aFBpY2tlclZhbHVlcygpIHtcbiAgICAgICAgdGhpcy5tb250aFBpY2tlclZhbHVlcyA9IFtdO1xuICAgICAgICBsZXQgbW9udGhMYWJlbHMgPSB0aGlzLmdldFRyYW5zbGF0aW9uKFRyYW5zbGF0aW9uS2V5cy5NT05USF9OQU1FU19TSE9SVCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IDExOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMubW9udGhQaWNrZXJWYWx1ZXMucHVzaChtb250aExhYmVsc1tpXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjcmVhdGVNb250aHMobW9udGg6IG51bWJlciwgeWVhcjogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMubW9udGhzID0gdGhpcy5tb250aHMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAgOyBpIDwgdGhpcy5udW1iZXJPZk1vbnRoczsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgbSA9IG1vbnRoICsgaTtcbiAgICAgICAgICAgIGxldCB5ID0geWVhcjtcbiAgICAgICAgICAgIGlmIChtID4gMTEpIHtcbiAgICAgICAgICAgICAgICBtID0gbSAlIDExIC0gMTtcbiAgICAgICAgICAgICAgICB5ID0geWVhciArIDE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMubW9udGhzLnB1c2godGhpcy5jcmVhdGVNb250aChtLCB5KSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRXZWVrTnVtYmVyKGRhdGU6IERhdGUpIHtcbiAgICAgICAgbGV0IGNoZWNrRGF0ZSA9IG5ldyBEYXRlKGRhdGUuZ2V0VGltZSgpKTtcblx0XHRjaGVja0RhdGUuc2V0RGF0ZShjaGVja0RhdGUuZ2V0RGF0ZSgpICsgNCAtICggY2hlY2tEYXRlLmdldERheSgpIHx8IDcgKSk7XG5cdFx0bGV0IHRpbWUgPSBjaGVja0RhdGUuZ2V0VGltZSgpO1xuXHRcdGNoZWNrRGF0ZS5zZXRNb250aCggMCApO1xuXHRcdGNoZWNrRGF0ZS5zZXREYXRlKCAxICk7XG5cdFx0cmV0dXJuIE1hdGguZmxvb3IoIE1hdGgucm91bmQoKHRpbWUgLSBjaGVja0RhdGUuZ2V0VGltZSgpKSAvIDg2NDAwMDAwICkgLyA3ICkgKyAxO1xuICAgIH1cblxuICAgIGNyZWF0ZU1vbnRoKG1vbnRoOiBudW1iZXIsIHllYXI6IG51bWJlcikge1xuICAgICAgICBsZXQgZGF0ZXMgPSBbXTtcbiAgICAgICAgbGV0IGZpcnN0RGF5ID0gdGhpcy5nZXRGaXJzdERheU9mTW9udGhJbmRleChtb250aCwgeWVhcik7XG4gICAgICAgIGxldCBkYXlzTGVuZ3RoID0gdGhpcy5nZXREYXlzQ291bnRJbk1vbnRoKG1vbnRoLCB5ZWFyKTtcbiAgICAgICAgbGV0IHByZXZNb250aERheXNMZW5ndGggPSB0aGlzLmdldERheXNDb3VudEluUHJldk1vbnRoKG1vbnRoLCB5ZWFyKTtcbiAgICAgICAgbGV0IGRheU5vID0gMTtcbiAgICAgICAgbGV0IHRvZGF5ID0gbmV3IERhdGUoKTtcbiAgICAgICAgbGV0IHdlZWtOdW1iZXJzID0gW107XG4gICAgICAgIGxldCBtb250aFJvd3MgPSBNYXRoLmNlaWwoKGRheXNMZW5ndGggKyBmaXJzdERheSkgLyA3KTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1vbnRoUm93czsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgd2VlayA9IFtdO1xuXG4gICAgICAgICAgICBpZiAoaSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IChwcmV2TW9udGhEYXlzTGVuZ3RoIC0gZmlyc3REYXkgKyAxKTsgaiA8PSBwcmV2TW9udGhEYXlzTGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHByZXYgPSB0aGlzLmdldFByZXZpb3VzTW9udGhBbmRZZWFyKG1vbnRoLCB5ZWFyKTtcbiAgICAgICAgICAgICAgICAgICAgd2Vlay5wdXNoKHtkYXk6IGosIG1vbnRoOiBwcmV2Lm1vbnRoLCB5ZWFyOiBwcmV2LnllYXIsIG90aGVyTW9udGg6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9kYXk6IHRoaXMuaXNUb2RheSh0b2RheSwgaiwgcHJldi5tb250aCwgcHJldi55ZWFyKSwgc2VsZWN0YWJsZTogdGhpcy5pc1NlbGVjdGFibGUoaiwgcHJldi5tb250aCwgcHJldi55ZWFyLCB0cnVlKX0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxldCByZW1haW5pbmdEYXlzTGVuZ3RoID0gNyAtIHdlZWsubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgcmVtYWluaW5nRGF5c0xlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIHdlZWsucHVzaCh7ZGF5OiBkYXlObywgbW9udGg6IG1vbnRoLCB5ZWFyOiB5ZWFyLCB0b2RheTogdGhpcy5pc1RvZGF5KHRvZGF5LCBkYXlObywgbW9udGgsIHllYXIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGFibGU6IHRoaXMuaXNTZWxlY3RhYmxlKGRheU5vLCBtb250aCwgeWVhciwgZmFsc2UpfSk7XG4gICAgICAgICAgICAgICAgICAgIGRheU5vKys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCA3OyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRheU5vID4gZGF5c0xlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5leHQgPSB0aGlzLmdldE5leHRNb250aEFuZFllYXIobW9udGgsIHllYXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgd2Vlay5wdXNoKHtkYXk6IGRheU5vIC0gZGF5c0xlbmd0aCwgbW9udGg6IG5leHQubW9udGgsIHllYXI6IG5leHQueWVhciwgb3RoZXJNb250aDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvZGF5OiB0aGlzLmlzVG9kYXkodG9kYXksIGRheU5vIC0gZGF5c0xlbmd0aCwgbmV4dC5tb250aCwgbmV4dC55ZWFyKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGFibGU6IHRoaXMuaXNTZWxlY3RhYmxlKChkYXlObyAtIGRheXNMZW5ndGgpLCBuZXh0Lm1vbnRoLCBuZXh0LnllYXIsIHRydWUpfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3ZWVrLnB1c2goe2RheTogZGF5Tm8sIG1vbnRoOiBtb250aCwgeWVhcjogeWVhciwgdG9kYXk6IHRoaXMuaXNUb2RheSh0b2RheSwgZGF5Tm8sIG1vbnRoLCB5ZWFyKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RhYmxlOiB0aGlzLmlzU2VsZWN0YWJsZShkYXlObywgbW9udGgsIHllYXIsIGZhbHNlKX0pO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgZGF5Tm8rKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnNob3dXZWVrKSB7XG4gICAgICAgICAgICAgICAgd2Vla051bWJlcnMucHVzaCh0aGlzLmdldFdlZWtOdW1iZXIobmV3IERhdGUod2Vla1swXS55ZWFyLCB3ZWVrWzBdLm1vbnRoLCB3ZWVrWzBdLmRheSkpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZGF0ZXMucHVzaCh3ZWVrKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBtb250aDogbW9udGgsXG4gICAgICAgICAgICB5ZWFyOiB5ZWFyLFxuICAgICAgICAgICAgZGF0ZXM6IGRhdGVzLFxuICAgICAgICAgICAgd2Vla051bWJlcnM6IHdlZWtOdW1iZXJzXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgaW5pdFRpbWUoZGF0ZTogRGF0ZSkge1xuICAgICAgICB0aGlzLnBtID0gZGF0ZS5nZXRIb3VycygpID4gMTE7XG5cbiAgICAgICAgaWYgKHRoaXMuc2hvd1RpbWUpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudE1pbnV0ZSA9IGRhdGUuZ2V0TWludXRlcygpO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50U2Vjb25kID0gZGF0ZS5nZXRTZWNvbmRzKCk7XG4gICAgICAgICAgICB0aGlzLnNldEN1cnJlbnRIb3VyUE0oZGF0ZS5nZXRIb3VycygpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnRpbWVPbmx5KSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRNaW51dGUgPSAwO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50SG91ciA9IDA7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTZWNvbmQgPSAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmF2QmFja3dhcmQoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmlzTW9udGhOYXZpZ2F0ZSA9IHRydWU7XG5cbiAgICAgICAgaWYgKHRoaXMudmlldyA9PT0gJ21vbnRoJykge1xuICAgICAgICAgICAgdGhpcy5kZWNyZW1lbnRZZWFyKCk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlRm9jdXMoKTtcbiAgICAgICAgICAgIH0sMSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50TW9udGggPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRNb250aCA9IDExO1xuICAgICAgICAgICAgICAgIHRoaXMuZGVjcmVtZW50WWVhcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50TW9udGgtLTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5vbk1vbnRoQ2hhbmdlLmVtaXQoeyBtb250aDogdGhpcy5jdXJyZW50TW9udGggKyAxLCB5ZWFyOiB0aGlzLmN1cnJlbnRZZWFyIH0pO1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVNb250aHModGhpcy5jdXJyZW50TW9udGgsIHRoaXMuY3VycmVudFllYXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmF2Rm9yd2FyZChldmVudCkge1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaXNNb250aE5hdmlnYXRlID0gdHJ1ZTtcblxuICAgICAgICBpZiAodGhpcy52aWV3ID09PSAnbW9udGgnKSB7XG4gICAgICAgICAgICB0aGlzLmluY3JlbWVudFllYXIoKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCk9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVGb2N1cygpO1xuICAgICAgICAgICAgfSwxKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRNb250aCA9PT0gMTEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRNb250aCA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5pbmNyZW1lbnRZZWFyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRNb250aCsrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLm9uTW9udGhDaGFuZ2UuZW1pdCh7bW9udGg6IHRoaXMuY3VycmVudE1vbnRoICsgMSwgeWVhcjogdGhpcy5jdXJyZW50WWVhcn0pO1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVNb250aHModGhpcy5jdXJyZW50TW9udGgsIHRoaXMuY3VycmVudFllYXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGVjcmVtZW50WWVhcigpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50WWVhci0tO1xuXG4gICAgICAgIGlmICh0aGlzLnllYXJOYXZpZ2F0b3IgJiYgdGhpcy5jdXJyZW50WWVhciA8IHRoaXMueWVhck9wdGlvbnNbMF0pIHtcbiAgICAgICAgICAgIGxldCBkaWZmZXJlbmNlID0gdGhpcy55ZWFyT3B0aW9uc1t0aGlzLnllYXJPcHRpb25zLmxlbmd0aCAtIDFdIC0gdGhpcy55ZWFyT3B0aW9uc1swXTtcbiAgICAgICAgICAgIHRoaXMucG9wdWxhdGVZZWFyT3B0aW9ucyh0aGlzLnllYXJPcHRpb25zWzBdIC0gZGlmZmVyZW5jZSwgdGhpcy55ZWFyT3B0aW9uc1t0aGlzLnllYXJPcHRpb25zLmxlbmd0aCAtIDFdIC0gZGlmZmVyZW5jZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbmNyZW1lbnRZZWFyKCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRZZWFyKys7XG5cbiAgICAgICAgaWYgKHRoaXMueWVhck5hdmlnYXRvciAmJiB0aGlzLmN1cnJlbnRZZWFyID4gdGhpcy55ZWFyT3B0aW9uc1t0aGlzLnllYXJPcHRpb25zLmxlbmd0aCAtIDFdKSB7XG4gICAgICAgICAgICBsZXQgZGlmZmVyZW5jZSA9IHRoaXMueWVhck9wdGlvbnNbdGhpcy55ZWFyT3B0aW9ucy5sZW5ndGggLSAxXSAtIHRoaXMueWVhck9wdGlvbnNbMF07XG4gICAgICAgICAgICB0aGlzLnBvcHVsYXRlWWVhck9wdGlvbnModGhpcy55ZWFyT3B0aW9uc1swXSArIGRpZmZlcmVuY2UsIHRoaXMueWVhck9wdGlvbnNbdGhpcy55ZWFyT3B0aW9ucy5sZW5ndGggLSAxXSArIGRpZmZlcmVuY2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25EYXRlU2VsZWN0KGV2ZW50LCBkYXRlTWV0YSkge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCB8fCAhZGF0ZU1ldGEuc2VsZWN0YWJsZSkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmlzTXVsdGlwbGVTZWxlY3Rpb24oKSAmJiB0aGlzLmlzU2VsZWN0ZWQoZGF0ZU1ldGEpKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy52YWx1ZS5maWx0ZXIoKGRhdGUsIGkpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gIXRoaXMuaXNEYXRlRXF1YWxzKGRhdGUsIGRhdGVNZXRhKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKHRoaXMudmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU1vZGVsKHRoaXMudmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMuc2hvdWxkU2VsZWN0RGF0ZShkYXRlTWV0YSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdERhdGUoZGF0ZU1ldGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaXNTaW5nbGVTZWxlY3Rpb24oKSAmJiB0aGlzLmhpZGVPbkRhdGVUaW1lU2VsZWN0KSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZU92ZXJsYXkoKTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1hc2spIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXNhYmxlTW9kYWxpdHkoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgfSwgMTUwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudXBkYXRlSW5wdXRmaWVsZCgpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIHNob3VsZFNlbGVjdERhdGUoZGF0ZU1ldGEpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNNdWx0aXBsZVNlbGVjdGlvbigpKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubWF4RGF0ZUNvdW50ICE9IG51bGwgP8KgdGhpcy5tYXhEYXRlQ291bnQgPiAodGhpcy52YWx1ZSA/IHRoaXMudmFsdWUubGVuZ3RoIDogMCkgOiB0cnVlO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBvbk1vbnRoU2VsZWN0KGV2ZW50LCBpbmRleCkge1xuICAgICAgICBpZiAoIURvbUhhbmRsZXIuaGFzQ2xhc3MoZXZlbnQudGFyZ2V0LCAncC1kaXNhYmxlZCcpKSB7XG4gICAgICAgICAgICB0aGlzLm9uRGF0ZVNlbGVjdChldmVudCwge3llYXI6IHRoaXMuY3VycmVudFllYXIsIG1vbnRoOiBpbmRleCwgZGF5OiAxLCBzZWxlY3RhYmxlOiB0cnVlfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVJbnB1dGZpZWxkKCkge1xuICAgICAgICBsZXQgZm9ybWF0dGVkVmFsdWUgPSAnJztcblxuICAgICAgICBpZiAodGhpcy52YWx1ZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNTaW5nbGVTZWxlY3Rpb24oKSkge1xuICAgICAgICAgICAgICAgIGZvcm1hdHRlZFZhbHVlID0gdGhpcy5mb3JtYXREYXRlVGltZSh0aGlzLnZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuaXNNdWx0aXBsZVNlbGVjdGlvbigpKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnZhbHVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBkYXRlQXNTdHJpbmcgPSB0aGlzLmZvcm1hdERhdGVUaW1lKHRoaXMudmFsdWVbaV0pO1xuICAgICAgICAgICAgICAgICAgICBmb3JtYXR0ZWRWYWx1ZSArPSBkYXRlQXNTdHJpbmc7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpICE9PSAodGhpcy52YWx1ZS5sZW5ndGggLSAxKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0dGVkVmFsdWUgKz0gdGhpcy5tdWx0aXBsZVNlcGFyYXRvcisnICc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLmlzUmFuZ2VTZWxlY3Rpb24oKSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnZhbHVlICYmIHRoaXMudmFsdWUubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzdGFydERhdGUgPSB0aGlzLnZhbHVlWzBdO1xuICAgICAgICAgICAgICAgICAgICBsZXQgZW5kRGF0ZSA9IHRoaXMudmFsdWVbMV07XG5cbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0dGVkVmFsdWUgPSB0aGlzLmZvcm1hdERhdGVUaW1lKHN0YXJ0RGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbmREYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXR0ZWRWYWx1ZSArPSAnICcrdGhpcy5yYW5nZVNlcGFyYXRvciArJyAnICsgdGhpcy5mb3JtYXREYXRlVGltZShlbmREYXRlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaW5wdXRGaWVsZFZhbHVlID0gZm9ybWF0dGVkVmFsdWU7XG4gICAgICAgIHRoaXMudXBkYXRlRmlsbGVkU3RhdGUoKTtcbiAgICAgICAgaWYgKHRoaXMuaW5wdXRmaWVsZFZpZXdDaGlsZCAmJiB0aGlzLmlucHV0ZmllbGRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5pbnB1dGZpZWxkVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSB0aGlzLmlucHV0RmllbGRWYWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZvcm1hdERhdGVUaW1lKGRhdGUpIHtcbiAgICAgICAgbGV0IGZvcm1hdHRlZFZhbHVlID0gbnVsbDtcbiAgICAgICAgaWYgKGRhdGUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnRpbWVPbmx5KSB7XG4gICAgICAgICAgICAgICAgZm9ybWF0dGVkVmFsdWUgPSB0aGlzLmZvcm1hdFRpbWUoZGF0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBmb3JtYXR0ZWRWYWx1ZSA9IHRoaXMuZm9ybWF0RGF0ZShkYXRlLCB0aGlzLmdldERhdGVGb3JtYXQoKSk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2hvd1RpbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0dGVkVmFsdWUgKz0gJyAnICsgdGhpcy5mb3JtYXRUaW1lKGRhdGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmb3JtYXR0ZWRWYWx1ZTtcbiAgICB9XG5cbiAgICBzZXRDdXJyZW50SG91clBNKGhvdXJzOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHRoaXMuaG91ckZvcm1hdCA9PSAnMTInKSB7XG4gICAgICAgICAgICB0aGlzLnBtID0gaG91cnMgPiAxMTtcbiAgICAgICAgICAgIGlmIChob3VycyA+PSAxMikge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEhvdXIgPSAoaG91cnMgPT0gMTIpID8gMTIgOiBob3VycyAtIDEyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50SG91ciA9IChob3VycyA9PSAwKSA/IDEyIDogaG91cnM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRIb3VyID0gaG91cnM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZWxlY3REYXRlKGRhdGVNZXRhKSB7XG4gICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoZGF0ZU1ldGEueWVhciwgZGF0ZU1ldGEubW9udGgsIGRhdGVNZXRhLmRheSk7XG5cbiAgICAgICAgaWYgKHRoaXMuc2hvd1RpbWUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmhvdXJGb3JtYXQgPT0gJzEyJykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRIb3VyID09PSAxMilcbiAgICAgICAgICAgICAgICAgICAgZGF0ZS5zZXRIb3Vycyh0aGlzLnBtID8gMTIgOiAwKTtcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIGRhdGUuc2V0SG91cnModGhpcy5wbSA/IHRoaXMuY3VycmVudEhvdXIgKyAxMiA6IHRoaXMuY3VycmVudEhvdXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZGF0ZS5zZXRIb3Vycyh0aGlzLmN1cnJlbnRIb3VyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZGF0ZS5zZXRNaW51dGVzKHRoaXMuY3VycmVudE1pbnV0ZSk7XG4gICAgICAgICAgICBkYXRlLnNldFNlY29uZHModGhpcy5jdXJyZW50U2Vjb25kKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm1pbkRhdGUgJiYgdGhpcy5taW5EYXRlID4gZGF0ZSkge1xuICAgICAgICAgICAgZGF0ZSA9IHRoaXMubWluRGF0ZTtcbiAgICAgICAgICAgIHRoaXMuc2V0Q3VycmVudEhvdXJQTShkYXRlLmdldEhvdXJzKCkpO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50TWludXRlID0gZGF0ZS5nZXRNaW51dGVzKCk7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTZWNvbmQgPSBkYXRlLmdldFNlY29uZHMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm1heERhdGUgJiYgdGhpcy5tYXhEYXRlIDwgZGF0ZSkge1xuICAgICAgICAgICAgZGF0ZSA9IHRoaXMubWF4RGF0ZTtcbiAgICAgICAgICAgIHRoaXMuc2V0Q3VycmVudEhvdXJQTShkYXRlLmdldEhvdXJzKCkpO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50TWludXRlID0gZGF0ZS5nZXRNaW51dGVzKCk7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTZWNvbmQgPSBkYXRlLmdldFNlY29uZHMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmlzU2luZ2xlU2VsZWN0aW9uKCkpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTW9kZWwoZGF0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5pc011bHRpcGxlU2VsZWN0aW9uKCkpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTW9kZWwodGhpcy52YWx1ZSA/IFsuLi50aGlzLnZhbHVlLCBkYXRlXSA6IFtkYXRlXSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5pc1JhbmdlU2VsZWN0aW9uKCkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnZhbHVlICYmIHRoaXMudmFsdWUubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgbGV0IHN0YXJ0RGF0ZSA9IHRoaXMudmFsdWVbMF07XG4gICAgICAgICAgICAgICAgbGV0IGVuZERhdGUgPSB0aGlzLnZhbHVlWzFdO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFlbmREYXRlICYmIGRhdGUuZ2V0VGltZSgpID49IHN0YXJ0RGF0ZS5nZXRUaW1lKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgZW5kRGF0ZSA9IGRhdGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzdGFydERhdGUgPSBkYXRlO1xuICAgICAgICAgICAgICAgICAgICBlbmREYXRlID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZU1vZGVsKFtzdGFydERhdGUsIGVuZERhdGVdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlTW9kZWwoW2RhdGUsIG51bGxdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub25TZWxlY3QuZW1pdChkYXRlKTtcbiAgICB9XG5cbiAgICB1cGRhdGVNb2RlbCh2YWx1ZSkge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG5cbiAgICAgICAgaWYgKHRoaXMuZGF0YVR5cGUgPT0gJ2RhdGUnKSB7XG4gICAgICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy52YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5kYXRhVHlwZSA9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNTaW5nbGVTZWxlY3Rpb24oKSkge1xuICAgICAgICAgICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSh0aGlzLmZvcm1hdERhdGVUaW1lKHRoaXMudmFsdWUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCBzdHJpbmdBcnJWYWx1ZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RyaW5nQXJyVmFsdWUgPSB0aGlzLnZhbHVlLm1hcChkYXRlID0+IHRoaXMuZm9ybWF0RGF0ZVRpbWUoZGF0ZSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2Uoc3RyaW5nQXJyVmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0Rmlyc3REYXlPZk1vbnRoSW5kZXgobW9udGg6IG51bWJlciwgeWVhcjogbnVtYmVyKSB7XG4gICAgICAgIGxldCBkYXkgPSBuZXcgRGF0ZSgpO1xuICAgICAgICBkYXkuc2V0RGF0ZSgxKTtcbiAgICAgICAgZGF5LnNldE1vbnRoKG1vbnRoKTtcbiAgICAgICAgZGF5LnNldEZ1bGxZZWFyKHllYXIpO1xuXG4gICAgICAgIGxldCBkYXlJbmRleCA9IGRheS5nZXREYXkoKSArIHRoaXMuZ2V0U3VuZGF5SW5kZXgoKTtcbiAgICAgICAgcmV0dXJuIGRheUluZGV4ID49IDcgPyBkYXlJbmRleCAtIDcgOiBkYXlJbmRleDtcbiAgICB9XG5cbiAgICBnZXREYXlzQ291bnRJbk1vbnRoKG1vbnRoOiBudW1iZXIsIHllYXI6IG51bWJlcikge1xuICAgICAgICByZXR1cm4gMzIgLSB0aGlzLmRheWxpZ2h0U2F2aW5nQWRqdXN0KG5ldyBEYXRlKHllYXIsIG1vbnRoLCAzMikpLmdldERhdGUoKTtcbiAgICB9XG5cbiAgICBnZXREYXlzQ291bnRJblByZXZNb250aChtb250aDogbnVtYmVyLCB5ZWFyOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IHByZXYgPSB0aGlzLmdldFByZXZpb3VzTW9udGhBbmRZZWFyKG1vbnRoLCB5ZWFyKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGF5c0NvdW50SW5Nb250aChwcmV2Lm1vbnRoLCBwcmV2LnllYXIpO1xuICAgIH1cblxuICAgIGdldFByZXZpb3VzTW9udGhBbmRZZWFyKG1vbnRoOiBudW1iZXIsIHllYXI6IG51bWJlcikge1xuICAgICAgICBsZXQgbSwgeTtcblxuICAgICAgICBpZiAobW9udGggPT09IDApIHtcbiAgICAgICAgICAgIG0gPSAxMTtcbiAgICAgICAgICAgIHkgPSB5ZWFyIC0gMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG0gPSBtb250aCAtIDE7XG4gICAgICAgICAgICB5ID0geWVhcjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7J21vbnRoJzptLCd5ZWFyJzp5fTtcbiAgICB9XG5cbiAgICBnZXROZXh0TW9udGhBbmRZZWFyKG1vbnRoOiBudW1iZXIsIHllYXI6IG51bWJlcikge1xuICAgICAgICBsZXQgbSwgeTtcblxuICAgICAgICBpZiAobW9udGggPT09IDExKSB7XG4gICAgICAgICAgICBtID0gMDtcbiAgICAgICAgICAgIHkgPSB5ZWFyICsgMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG0gPSBtb250aCArIDE7XG4gICAgICAgICAgICB5ID0geWVhcjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7J21vbnRoJzptLCd5ZWFyJzp5fTtcbiAgICB9XG5cbiAgICBnZXRTdW5kYXlJbmRleCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmlyc3REYXlPZldlZWsgPiAwID8gNyAtIHRoaXMuZmlyc3REYXlPZldlZWsgOiAwO1xuICAgIH1cblxuICAgIGlzU2VsZWN0ZWQoZGF0ZU1ldGEpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMudmFsdWUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzU2luZ2xlU2VsZWN0aW9uKCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pc0RhdGVFcXVhbHModGhpcy52YWx1ZSwgZGF0ZU1ldGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5pc011bHRpcGxlU2VsZWN0aW9uKCkpIHtcbiAgICAgICAgICAgICAgICBsZXQgc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBkYXRlIG9mIHRoaXMudmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQgPSB0aGlzLmlzRGF0ZUVxdWFscyhkYXRlLCBkYXRlTWV0YSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gc2VsZWN0ZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLmlzUmFuZ2VTZWxlY3Rpb24oKSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnZhbHVlWzFdKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pc0RhdGVFcXVhbHModGhpcy52YWx1ZVswXSwgZGF0ZU1ldGEpIHx8IHRoaXMuaXNEYXRlRXF1YWxzKHRoaXMudmFsdWVbMV0sIGRhdGVNZXRhKSB8fCB0aGlzLmlzRGF0ZUJldHdlZW4odGhpcy52YWx1ZVswXSwgdGhpcy52YWx1ZVsxXSwgZGF0ZU1ldGEpO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNEYXRlRXF1YWxzKHRoaXMudmFsdWVbMF0sIGRhdGVNZXRhKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNNb250aFNlbGVjdGVkKG1vbnRoOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICAgICAgbGV0IGRheSA9IHRoaXMudmFsdWUgPyAoQXJyYXkuaXNBcnJheSh0aGlzLnZhbHVlKSA/IHRoaXMudmFsdWVbMF0uZ2V0RGF0ZSgpIDogdGhpcy52YWx1ZS5nZXREYXRlKCkpIDogMTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNTZWxlY3RlZCh7eWVhcjogdGhpcy5jdXJyZW50WWVhciwgbW9udGg6IG1vbnRoLCBkYXk6IGRheSwgc2VsZWN0YWJsZTogdHJ1ZX0pO1xuICAgIH1cblxuICAgIGlzRGF0ZUVxdWFscyh2YWx1ZSwgZGF0ZU1ldGEpIHtcbiAgICAgICAgaWYgKHZhbHVlKVxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlLmdldERhdGUoKSA9PT0gZGF0ZU1ldGEuZGF5ICYmIHZhbHVlLmdldE1vbnRoKCkgPT09IGRhdGVNZXRhLm1vbnRoICYmIHZhbHVlLmdldEZ1bGxZZWFyKCkgPT09IGRhdGVNZXRhLnllYXI7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpc0RhdGVCZXR3ZWVuKHN0YXJ0LCBlbmQsIGRhdGVNZXRhKSB7XG4gICAgICAgIGxldCBiZXR3ZWVuIDogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgICBpZiAoc3RhcnQgJiYgZW5kKSB7XG4gICAgICAgICAgICBsZXQgZGF0ZTogRGF0ZSA9IG5ldyBEYXRlKGRhdGVNZXRhLnllYXIsIGRhdGVNZXRhLm1vbnRoLCBkYXRlTWV0YS5kYXkpO1xuICAgICAgICAgICAgcmV0dXJuIHN0YXJ0LmdldFRpbWUoKSA8PSBkYXRlLmdldFRpbWUoKSAmJiBlbmQuZ2V0VGltZSgpID49IGRhdGUuZ2V0VGltZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGJldHdlZW47XG4gICAgfVxuXG4gICAgaXNTaW5nbGVTZWxlY3Rpb24oKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGlvbk1vZGUgPT09ICdzaW5nbGUnO1xuICAgIH1cblxuICAgIGlzUmFuZ2VTZWxlY3Rpb24oKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGlvbk1vZGUgPT09ICdyYW5nZSc7XG4gICAgfVxuXG4gICAgaXNNdWx0aXBsZVNlbGVjdGlvbigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0aW9uTW9kZSA9PT0gJ211bHRpcGxlJztcbiAgICB9XG5cbiAgICBpc1RvZGF5KHRvZGF5LCBkYXksIG1vbnRoLCB5ZWFyKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0b2RheS5nZXREYXRlKCkgPT09IGRheSAmJiB0b2RheS5nZXRNb250aCgpID09PSBtb250aCAmJiB0b2RheS5nZXRGdWxsWWVhcigpID09PSB5ZWFyO1xuICAgIH1cblxuICAgIGlzU2VsZWN0YWJsZShkYXksIG1vbnRoLCB5ZWFyLCBvdGhlck1vbnRoKTogYm9vbGVhbiB7XG4gICAgICAgIGxldCB2YWxpZE1pbiA9IHRydWU7XG4gICAgICAgIGxldCB2YWxpZE1heCA9IHRydWU7XG4gICAgICAgIGxldCB2YWxpZERhdGUgPSB0cnVlO1xuICAgICAgICBsZXQgdmFsaWREYXkgPSB0cnVlO1xuXG4gICAgICAgIGlmIChvdGhlck1vbnRoICYmICF0aGlzLnNlbGVjdE90aGVyTW9udGhzKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5taW5EYXRlKSB7XG4gICAgICAgICAgICAgaWYgKHRoaXMubWluRGF0ZS5nZXRGdWxsWWVhcigpID4geWVhcikge1xuICAgICAgICAgICAgICAgICB2YWxpZE1pbiA9IGZhbHNlO1xuICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLm1pbkRhdGUuZ2V0RnVsbFllYXIoKSA9PT0geWVhcikge1xuICAgICAgICAgICAgICAgICBpZiAodGhpcy5taW5EYXRlLmdldE1vbnRoKCkgPiBtb250aCkge1xuICAgICAgICAgICAgICAgICAgICAgdmFsaWRNaW4gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLm1pbkRhdGUuZ2V0TW9udGgoKSA9PT0gbW9udGgpIHtcbiAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm1pbkRhdGUuZ2V0RGF0ZSgpID4gZGF5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRNaW4gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm1heERhdGUpIHtcbiAgICAgICAgICAgICBpZiAodGhpcy5tYXhEYXRlLmdldEZ1bGxZZWFyKCkgPCB5ZWFyKSB7XG4gICAgICAgICAgICAgICAgIHZhbGlkTWF4ID0gZmFsc2U7XG4gICAgICAgICAgICAgfVxuICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMubWF4RGF0ZS5nZXRGdWxsWWVhcigpID09PSB5ZWFyKSB7XG4gICAgICAgICAgICAgICAgIGlmICh0aGlzLm1heERhdGUuZ2V0TW9udGgoKSA8IG1vbnRoKSB7XG4gICAgICAgICAgICAgICAgICAgICB2YWxpZE1heCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMubWF4RGF0ZS5nZXRNb250aCgpID09PSBtb250aCkge1xuICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubWF4RGF0ZS5nZXREYXRlKCkgPCBkYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZE1heCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWREYXRlcykge1xuICAgICAgICAgICB2YWxpZERhdGUgPSAhdGhpcy5pc0RhdGVEaXNhYmxlZChkYXksbW9udGgseWVhcik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZERheXMpIHtcbiAgICAgICAgICAgdmFsaWREYXkgPSAhdGhpcy5pc0RheURpc2FibGVkKGRheSxtb250aCx5ZWFyKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHZhbGlkTWluICYmIHZhbGlkTWF4ICYmIHZhbGlkRGF0ZSAmJiB2YWxpZERheTtcbiAgICB9XG5cbiAgICBpc0RhdGVEaXNhYmxlZChkYXk6bnVtYmVyLCBtb250aDpudW1iZXIsIHllYXI6bnVtYmVyKTpib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWREYXRlcykge1xuICAgICAgICAgICAgZm9yIChsZXQgZGlzYWJsZWREYXRlIG9mIHRoaXMuZGlzYWJsZWREYXRlcykge1xuICAgICAgICAgICAgICAgIGlmIChkaXNhYmxlZERhdGUuZ2V0RnVsbFllYXIoKSA9PT0geWVhciAmJiBkaXNhYmxlZERhdGUuZ2V0TW9udGgoKSA9PT0gbW9udGggJiYgZGlzYWJsZWREYXRlLmdldERhdGUoKSA9PT0gZGF5KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpc0RheURpc2FibGVkKGRheTpudW1iZXIsIG1vbnRoOm51bWJlciwgeWVhcjpudW1iZXIpOmJvb2xlYW4ge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZERheXMpIHtcbiAgICAgICAgICAgIGxldCB3ZWVrZGF5ID0gbmV3IERhdGUoeWVhciwgbW9udGgsIGRheSk7XG4gICAgICAgICAgICBsZXQgd2Vla2RheU51bWJlciA9IHdlZWtkYXkuZ2V0RGF5KCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kaXNhYmxlZERheXMuaW5kZXhPZih3ZWVrZGF5TnVtYmVyKSAhPT0gLTE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIG9uSW5wdXRGb2N1cyhldmVudDogRXZlbnQpIHtcbiAgICAgICAgdGhpcy5mb2N1cyA9IHRydWU7XG4gICAgICAgIGlmICh0aGlzLnNob3dPbkZvY3VzKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dPdmVybGF5KCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vbkZvY3VzLmVtaXQoZXZlbnQpO1xuICAgIH1cblxuICAgIG9uSW5wdXRDbGljaygpIHtcbiAgICAgICAgaWYgKHRoaXMuc2hvd09uRm9jdXMgJiYgIXRoaXMub3ZlcmxheVZpc2libGUpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd092ZXJsYXkoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uSW5wdXRCbHVyKGV2ZW50OiBFdmVudCkge1xuICAgICAgICB0aGlzLmZvY3VzID0gZmFsc2U7XG4gICAgICAgIHRoaXMub25CbHVyLmVtaXQoZXZlbnQpO1xuICAgICAgICBpZiAoIXRoaXMua2VlcEludmFsaWQpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSW5wdXRmaWVsZCgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub25Nb2RlbFRvdWNoZWQoKTtcbiAgICB9XG5cbiAgICBvbkJ1dHRvbkNsaWNrKGV2ZW50LCBpbnB1dGZpZWxkKSB7XG4gICAgICAgIGlmICghdGhpcy5vdmVybGF5VmlzaWJsZSkge1xuICAgICAgICAgICAgaW5wdXRmaWVsZC5mb2N1cygpO1xuICAgICAgICAgICAgdGhpcy5zaG93T3ZlcmxheSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5oaWRlT3ZlcmxheSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25PdmVybGF5Q2xpY2soZXZlbnQpIHtcbiAgICAgICAgdGhpcy5vdmVybGF5U2VydmljZS5hZGQoe1xuICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXG4gICAgICAgICAgICB0YXJnZXQ6IHRoaXMuZWwubmF0aXZlRWxlbWVudFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvblByZXZCdXR0b25DbGljayhldmVudCkge1xuICAgICAgICB0aGlzLm5hdmlnYXRpb25TdGF0ZSA9IHtiYWNrd2FyZDogdHJ1ZSwgYnV0dG9uOiB0cnVlfTtcbiAgICAgICAgdGhpcy5uYXZCYWNrd2FyZChldmVudCk7XG4gICAgfVxuXG4gICAgb25OZXh0QnV0dG9uQ2xpY2soZXZlbnQpIHtcbiAgICAgICAgdGhpcy5uYXZpZ2F0aW9uU3RhdGUgPSB7YmFja3dhcmQ6IGZhbHNlLCBidXR0b246IHRydWV9O1xuICAgICAgICB0aGlzLm5hdkZvcndhcmQoZXZlbnQpO1xuICAgIH1cblxuICAgIG9uQ29udGFpbmVyQnV0dG9uS2V5ZG93bihldmVudCkge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LndoaWNoKSB7XG4gICAgICAgICAgIC8vdGFiXG4gICAgICAgICAgIGNhc2UgOTpcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaW5saW5lKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJhcEZvY3VzKGV2ZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgIC8vZXNjYXBlXG4gICAgICAgICAgIGNhc2UgMjc6XG4gICAgICAgICAgICAgICB0aGlzLm92ZXJsYXlWaXNpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgLy9Ob29wXG4gICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICB9XG5cbiAgICBvbklucHV0S2V5ZG93bihldmVudCkge1xuICAgICAgICB0aGlzLmlzS2V5ZG93biA9IHRydWU7XG4gICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSA0MCAmJiB0aGlzLmNvbnRlbnRWaWV3Q2hpbGQpIHtcbiAgICAgICAgICAgIHRoaXMudHJhcEZvY3VzKGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChldmVudC5rZXlDb2RlID09PSAyNykge1xuICAgICAgICAgICAgaWYgKHRoaXMub3ZlcmxheVZpc2libGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm92ZXJsYXlWaXNpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChldmVudC5rZXlDb2RlID09PSAxMykge1xuICAgICAgICAgICAgaWYgKHRoaXMub3ZlcmxheVZpc2libGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm92ZXJsYXlWaXNpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChldmVudC5rZXlDb2RlID09PSA5ICYmIHRoaXMuY29udGVudFZpZXdDaGlsZCkge1xuICAgICAgICAgICAgRG9tSGFuZGxlci5nZXRGb2N1c2FibGVFbGVtZW50cyh0aGlzLmNvbnRlbnRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCkuZm9yRWFjaChlbCA9PiBlbC50YWJJbmRleCA9ICctMScpO1xuICAgICAgICAgICAgaWYgKHRoaXMub3ZlcmxheVZpc2libGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm92ZXJsYXlWaXNpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkRhdGVDZWxsS2V5ZG93bihldmVudCwgZGF0ZSwgZ3JvdXBJbmRleCkge1xuICAgICAgICBjb25zdCBjZWxsQ29udGVudCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XG4gICAgICAgIGNvbnN0IGNlbGwgPSBjZWxsQ29udGVudC5wYXJlbnRFbGVtZW50O1xuXG4gICAgICAgIHN3aXRjaCAoZXZlbnQud2hpY2gpIHtcbiAgICAgICAgICAgIC8vZG93biBhcnJvd1xuICAgICAgICAgICAgY2FzZSA0MDoge1xuICAgICAgICAgICAgICAgIGNlbGxDb250ZW50LnRhYkluZGV4ID0gJy0xJztcbiAgICAgICAgICAgICAgICBsZXQgY2VsbEluZGV4ID0gRG9tSGFuZGxlci5pbmRleChjZWxsKTtcbiAgICAgICAgICAgICAgICBsZXQgbmV4dFJvdyA9IGNlbGwucGFyZW50RWxlbWVudC5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgaWYgKG5leHRSb3cpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZvY3VzQ2VsbCA9IG5leHRSb3cuY2hpbGRyZW5bY2VsbEluZGV4XS5jaGlsZHJlblswXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKERvbUhhbmRsZXIuaGFzQ2xhc3MoZm9jdXNDZWxsLCAncC1kaXNhYmxlZCcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRpb25TdGF0ZSA9IHtiYWNrd2FyZDogZmFsc2V9O1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uYXZGb3J3YXJkKGV2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHRSb3cuY2hpbGRyZW5bY2VsbEluZGV4XS5jaGlsZHJlblswXS50YWJJbmRleCA9ICcwJztcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHRSb3cuY2hpbGRyZW5bY2VsbEluZGV4XS5jaGlsZHJlblswXS5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRpb25TdGF0ZSA9IHtiYWNrd2FyZDogZmFsc2V9O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5hdkZvcndhcmQoZXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL3VwIGFycm93XG4gICAgICAgICAgICBjYXNlIDM4OiB7XG4gICAgICAgICAgICAgICAgY2VsbENvbnRlbnQudGFiSW5kZXggPSAnLTEnO1xuICAgICAgICAgICAgICAgIGxldCBjZWxsSW5kZXggPSBEb21IYW5kbGVyLmluZGV4KGNlbGwpO1xuICAgICAgICAgICAgICAgIGxldCBwcmV2Um93ID0gY2VsbC5wYXJlbnRFbGVtZW50LnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgaWYgKHByZXZSb3cpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZvY3VzQ2VsbCA9IHByZXZSb3cuY2hpbGRyZW5bY2VsbEluZGV4XS5jaGlsZHJlblswXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKERvbUhhbmRsZXIuaGFzQ2xhc3MoZm9jdXNDZWxsLCAncC1kaXNhYmxlZCcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRpb25TdGF0ZSA9IHtiYWNrd2FyZDogdHJ1ZX07XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5hdkJhY2t3YXJkKGV2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvY3VzQ2VsbC50YWJJbmRleCA9ICcwJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvY3VzQ2VsbC5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRpb25TdGF0ZSA9IHtiYWNrd2FyZDogdHJ1ZX07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmF2QmFja3dhcmQoZXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL2xlZnQgYXJyb3dcbiAgICAgICAgICAgIGNhc2UgMzc6IHtcbiAgICAgICAgICAgICAgICBjZWxsQ29udGVudC50YWJJbmRleCA9ICctMSc7XG4gICAgICAgICAgICAgICAgbGV0IHByZXZDZWxsID0gY2VsbC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgICAgICAgIGlmIChwcmV2Q2VsbCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZm9jdXNDZWxsID0gcHJldkNlbGwuY2hpbGRyZW5bMF07XG4gICAgICAgICAgICAgICAgICAgIGlmIChEb21IYW5kbGVyLmhhc0NsYXNzKGZvY3VzQ2VsbCwgJ3AtZGlzYWJsZWQnKSB8fCBEb21IYW5kbGVyLmhhc0NsYXNzKGZvY3VzQ2VsbC5wYXJlbnRFbGVtZW50LCAncC1kYXRlcGlja2VyLXdlZWtudW1iZXInKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uYXZpZ2F0ZVRvTW9udGgodHJ1ZSwgZ3JvdXBJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb2N1c0NlbGwudGFiSW5kZXggPSAnMCc7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb2N1c0NlbGwuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uYXZpZ2F0ZVRvTW9udGgodHJ1ZSwgZ3JvdXBJbmRleCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vcmlnaHQgYXJyb3dcbiAgICAgICAgICAgIGNhc2UgMzk6IHtcbiAgICAgICAgICAgICAgICBjZWxsQ29udGVudC50YWJJbmRleCA9ICctMSc7XG4gICAgICAgICAgICAgICAgbGV0IG5leHRDZWxsID0gY2VsbC5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgaWYgKG5leHRDZWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBmb2N1c0NlbGwgPSBuZXh0Q2VsbC5jaGlsZHJlblswXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKERvbUhhbmRsZXIuaGFzQ2xhc3MoZm9jdXNDZWxsLCAncC1kaXNhYmxlZCcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRlVG9Nb250aChmYWxzZSwgZ3JvdXBJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb2N1c0NlbGwudGFiSW5kZXggPSAnMCc7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb2N1c0NlbGwuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uYXZpZ2F0ZVRvTW9udGgoZmFsc2UsIGdyb3VwSW5kZXgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL2VudGVyXG4gICAgICAgICAgICBjYXNlIDEzOiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkRhdGVTZWxlY3QoZXZlbnQsIGRhdGUpO1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vZXNjYXBlXG4gICAgICAgICAgICBjYXNlIDI3OiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vdmVybGF5VmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vdGFiXG4gICAgICAgICAgICBjYXNlIDk6IHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaW5saW5lKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJhcEZvY3VzKGV2ZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgLy9ubyBvcFxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbk1vbnRoQ2VsbEtleWRvd24oZXZlbnQsIGluZGV4KSB7XG4gICAgICAgIGNvbnN0IGNlbGwgPSBldmVudC5jdXJyZW50VGFyZ2V0O1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LndoaWNoKSB7XG4gICAgICAgICAgICAvL2Fycm93c1xuICAgICAgICAgICAgY2FzZSAzODpcbiAgICAgICAgICAgIGNhc2UgNDA6IHtcbiAgICAgICAgICAgICAgICBjZWxsLnRhYkluZGV4ID0gJy0xJztcbiAgICAgICAgICAgICAgICB2YXIgY2VsbHMgPSBjZWxsLnBhcmVudEVsZW1lbnQuY2hpbGRyZW47XG4gICAgICAgICAgICAgICAgdmFyIGNlbGxJbmRleCA9IERvbUhhbmRsZXIuaW5kZXgoY2VsbCk7XG4gICAgICAgICAgICAgICAgbGV0IG5leHRDZWxsID0gY2VsbHNbZXZlbnQud2hpY2ggPT09IDQwID8gY2VsbEluZGV4ICsgMyA6IGNlbGxJbmRleCAtM107XG4gICAgICAgICAgICAgICAgaWYgKG5leHRDZWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHRDZWxsLnRhYkluZGV4ID0gJzAnO1xuICAgICAgICAgICAgICAgICAgICBuZXh0Q2VsbC5mb2N1cygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL2xlZnQgYXJyb3dcbiAgICAgICAgICAgIGNhc2UgMzc6IHtcbiAgICAgICAgICAgICAgICBjZWxsLnRhYkluZGV4ID0gJy0xJztcbiAgICAgICAgICAgICAgICBsZXQgcHJldkNlbGwgPSBjZWxsLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgaWYgKHByZXZDZWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHByZXZDZWxsLnRhYkluZGV4ID0gJzAnO1xuICAgICAgICAgICAgICAgICAgICBwcmV2Q2VsbC5mb2N1cygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL3JpZ2h0IGFycm93XG4gICAgICAgICAgICBjYXNlIDM5OiB7XG4gICAgICAgICAgICAgICAgY2VsbC50YWJJbmRleCA9ICctMSc7XG4gICAgICAgICAgICAgICAgbGV0IG5leHRDZWxsID0gY2VsbC5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgaWYgKG5leHRDZWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHRDZWxsLnRhYkluZGV4ID0gJzAnO1xuICAgICAgICAgICAgICAgICAgICBuZXh0Q2VsbC5mb2N1cygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL2VudGVyXG4gICAgICAgICAgICBjYXNlIDEzOiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbk1vbnRoU2VsZWN0KGV2ZW50LCBpbmRleCk7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9lc2NhcGVcbiAgICAgICAgICAgIGNhc2UgMjc6IHtcbiAgICAgICAgICAgICAgICB0aGlzLm92ZXJsYXlWaXNpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy90YWJcbiAgICAgICAgICAgIGNhc2UgOToge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pbmxpbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFwRm9jdXMoZXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAvL25vIG9wXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5hdmlnYXRlVG9Nb250aChwcmV2LCBncm91cEluZGV4KSB7XG4gICAgICAgIGlmIChwcmV2KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5udW1iZXJPZk1vbnRocyA9PT0gMSB8fCAoZ3JvdXBJbmRleCA9PT0gMCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRpb25TdGF0ZSA9IHtiYWNrd2FyZDogdHJ1ZX07XG4gICAgICAgICAgICAgICAgdGhpcy5uYXZCYWNrd2FyZChldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgcHJldk1vbnRoQ29udGFpbmVyID0gdGhpcy5jb250ZW50Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bZ3JvdXBJbmRleCAtIDFdO1xuICAgICAgICAgICAgICAgIGxldCBjZWxscyA9IERvbUhhbmRsZXIuZmluZChwcmV2TW9udGhDb250YWluZXIsICcucC1kYXRlcGlja2VyLWNhbGVuZGFyIHRkIHNwYW46bm90KC5wLWRpc2FibGVkKTpub3QoLnAtaW5rKScpO1xuICAgICAgICAgICAgICAgIGxldCBmb2N1c0NlbGwgPSBjZWxsc1tjZWxscy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgICAgICBmb2N1c0NlbGwudGFiSW5kZXggPSAnMCc7XG4gICAgICAgICAgICAgICAgZm9jdXNDZWxsLmZvY3VzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5udW1iZXJPZk1vbnRocyA9PT0gMSB8fCAoZ3JvdXBJbmRleCA9PT0gdGhpcy5udW1iZXJPZk1vbnRocyAtIDEpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5uYXZpZ2F0aW9uU3RhdGUgPSB7YmFja3dhcmQ6IGZhbHNlfTtcbiAgICAgICAgICAgICAgICB0aGlzLm5hdkZvcndhcmQoZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IG5leHRNb250aENvbnRhaW5lciA9IHRoaXMuY29udGVudFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuW2dyb3VwSW5kZXggKyAxXTtcbiAgICAgICAgICAgICAgICBsZXQgZm9jdXNDZWxsID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKG5leHRNb250aENvbnRhaW5lciwgJy5wLWRhdGVwaWNrZXItY2FsZW5kYXIgdGQgc3Bhbjpub3QoLnAtZGlzYWJsZWQpOm5vdCgucC1pbmspJyk7XG4gICAgICAgICAgICAgICAgZm9jdXNDZWxsLnRhYkluZGV4ID0gJzAnO1xuICAgICAgICAgICAgICAgIGZvY3VzQ2VsbC5mb2N1cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlRm9jdXMoKSB7XG4gICAgICAgIGxldCBjZWxsO1xuICAgICAgICBpZiAodGhpcy5uYXZpZ2F0aW9uU3RhdGUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm5hdmlnYXRpb25TdGF0ZS5idXR0b24pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmluaXRGb2N1c2FibGVDZWxsKCk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5uYXZpZ2F0aW9uU3RhdGUuYmFja3dhcmQpXG4gICAgICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuZmluZFNpbmdsZSh0aGlzLmNvbnRlbnRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCwgJy5wLWRhdGVwaWNrZXItcHJldicpLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBEb21IYW5kbGVyLmZpbmRTaW5nbGUodGhpcy5jb250ZW50Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQsICcucC1kYXRlcGlja2VyLW5leHQnKS5mb2N1cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubmF2aWdhdGlvblN0YXRlLmJhY2t3YXJkKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjZWxscyA9IERvbUhhbmRsZXIuZmluZCh0aGlzLmNvbnRlbnRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCwgJy5wLWRhdGVwaWNrZXItY2FsZW5kYXIgdGQgc3Bhbjpub3QoLnAtZGlzYWJsZWQpOm5vdCgucC1pbmspJyk7XG4gICAgICAgICAgICAgICAgICAgIGNlbGwgPSBjZWxsc1tjZWxscy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNlbGwgPSBEb21IYW5kbGVyLmZpbmRTaW5nbGUodGhpcy5jb250ZW50Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQsICcucC1kYXRlcGlja2VyLWNhbGVuZGFyIHRkIHNwYW46bm90KC5wLWRpc2FibGVkKTpub3QoLnAtaW5rKScpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChjZWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNlbGwudGFiSW5kZXggPSAnMCc7XG4gICAgICAgICAgICAgICAgICAgIGNlbGwuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMubmF2aWdhdGlvblN0YXRlID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdEZvY3VzYWJsZUNlbGwoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGluaXRGb2N1c2FibGVDZWxsKCkge1xuICAgICAgICBsZXQgY2VsbDtcbiAgICAgICAgaWYgKHRoaXMudmlldyA9PT0gJ21vbnRoJykge1xuICAgICAgICAgICAgbGV0IGNlbGxzID0gRG9tSGFuZGxlci5maW5kKHRoaXMuY29udGVudFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LCAnLnAtbW9udGhwaWNrZXIgLnAtbW9udGhwaWNrZXItbW9udGg6bm90KC5wLWRpc2FibGVkKScpO1xuICAgICAgICAgICAgbGV0IHNlbGVjdGVkQ2VsbD0gRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMuY29udGVudFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LCAnLnAtbW9udGhwaWNrZXIgLnAtbW9udGhwaWNrZXItbW9udGgucC1oaWdobGlnaHQnKTtcbiAgICAgICAgICAgIGNlbGxzLmZvckVhY2goY2VsbCA9PiBjZWxsLnRhYkluZGV4ID0gLTEpO1xuICAgICAgICAgICAgY2VsbCA9IHNlbGVjdGVkQ2VsbCB8fCBjZWxsc1swXTtcblxuICAgICAgICAgICAgaWYgKGNlbGxzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGxldCBkaXNhYmxlZENlbGxzID0gRG9tSGFuZGxlci5maW5kKHRoaXMuY29udGVudFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LCAnLnAtbW9udGhwaWNrZXIgLnAtbW9udGhwaWNrZXItbW9udGgucC1kaXNhYmxlZFt0YWJpbmRleCA9IFwiMFwiXScpO1xuICAgICAgICAgICAgICAgIGRpc2FibGVkQ2VsbHMuZm9yRWFjaChjZWxsID0+IGNlbGwudGFiSW5kZXggPSAtMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjZWxsID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMuY29udGVudFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LCAnc3Bhbi5wLWhpZ2hsaWdodCcpO1xuICAgICAgICAgICAgaWYgKCFjZWxsKSB7XG4gICAgICAgICAgICAgICAgbGV0IHRvZGF5Q2VsbCA9IERvbUhhbmRsZXIuZmluZFNpbmdsZSh0aGlzLmNvbnRlbnRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCwgJ3RkLnAtZGF0ZXBpY2tlci10b2RheSBzcGFuOm5vdCgucC1kaXNhYmxlZCk6bm90KC5wLWluayknKTtcbiAgICAgICAgICAgICAgICBpZiAodG9kYXlDZWxsKVxuICAgICAgICAgICAgICAgICAgICBjZWxsID0gdG9kYXlDZWxsO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgY2VsbCA9IERvbUhhbmRsZXIuZmluZFNpbmdsZSh0aGlzLmNvbnRlbnRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCwgJy5wLWRhdGVwaWNrZXItY2FsZW5kYXIgdGQgc3Bhbjpub3QoLnAtZGlzYWJsZWQpOm5vdCgucC1pbmspJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2VsbCkge1xuICAgICAgICAgICAgY2VsbC50YWJJbmRleCA9ICcwJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRyYXBGb2N1cyhldmVudCkge1xuICAgICAgICBsZXQgZm9jdXNhYmxlRWxlbWVudHMgPSBEb21IYW5kbGVyLmdldEZvY3VzYWJsZUVsZW1lbnRzKHRoaXMuY29udGVudFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KTtcblxuICAgICAgICBpZiAoZm9jdXNhYmxlRWxlbWVudHMgJiYgZm9jdXNhYmxlRWxlbWVudHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgaWYgKCFmb2N1c2FibGVFbGVtZW50c1swXS5vd25lckRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBmb2N1c2FibGVFbGVtZW50c1swXS5mb2N1cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IGZvY3VzZWRJbmRleCA9IGZvY3VzYWJsZUVsZW1lbnRzLmluZGV4T2YoZm9jdXNhYmxlRWxlbWVudHNbMF0ub3duZXJEb2N1bWVudC5hY3RpdmVFbGVtZW50KTtcblxuICAgICAgICAgICAgICAgIGlmIChldmVudC5zaGlmdEtleSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZm9jdXNlZEluZGV4ID09IC0xIHx8IGZvY3VzZWRJbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZm9jdXNUcmFwKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb2N1c2FibGVFbGVtZW50c1tmb2N1c2FibGVFbGVtZW50cy5sZW5ndGggLSAxXS5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZvY3VzZWRJbmRleCA9PT0gLTEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmhpZGVPdmVybGF5KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoZm9jdXNlZEluZGV4ID09PSAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb2N1c2FibGVFbGVtZW50c1tmb2N1c2VkSW5kZXggLSAxXS5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZm9jdXNlZEluZGV4ID09IC0xIHx8IGZvY3VzZWRJbmRleCA9PT0gKGZvY3VzYWJsZUVsZW1lbnRzLmxlbmd0aCAtIDEpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZm9jdXNUcmFwICYmIGZvY3VzZWRJbmRleCAhPSAtMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5oaWRlT3ZlcmxheSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvY3VzYWJsZUVsZW1lbnRzWzBdLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb2N1c2FibGVFbGVtZW50c1tmb2N1c2VkSW5kZXggKyAxXS5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBvbk1vbnRoRHJvcGRvd25DaGFuZ2UobTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuY3VycmVudE1vbnRoID0gcGFyc2VJbnQobSk7XG4gICAgICAgIHRoaXMub25Nb250aENoYW5nZS5lbWl0KHsgbW9udGg6IHRoaXMuY3VycmVudE1vbnRoICsgMSwgeWVhcjogdGhpcy5jdXJyZW50WWVhciB9KTtcbiAgICAgICAgdGhpcy5jcmVhdGVNb250aHModGhpcy5jdXJyZW50TW9udGgsIHRoaXMuY3VycmVudFllYXIpO1xuICAgIH1cblxuICAgIG9uWWVhckRyb3Bkb3duQ2hhbmdlKHk6IHN0cmluZykge1xuICAgICAgICB0aGlzLmN1cnJlbnRZZWFyID0gcGFyc2VJbnQoeSk7XG4gICAgICAgIHRoaXMub25ZZWFyQ2hhbmdlLmVtaXQoeyBtb250aDogdGhpcy5jdXJyZW50TW9udGggKyAxLCB5ZWFyOiB0aGlzLmN1cnJlbnRZZWFyIH0pO1xuICAgICAgICB0aGlzLmNyZWF0ZU1vbnRocyh0aGlzLmN1cnJlbnRNb250aCwgdGhpcy5jdXJyZW50WWVhcik7XG4gICAgfVxuXG4gICAgY29udmVydFRvMjRIb3VyID0gZnVuY3Rpb24gKGhvdXJzOiBudW1iZXIsIHBtOiBib29sZWFuKSB7XG4gICAgICAgIGlmICh0aGlzLmhvdXJGb3JtYXQgPT0gJzEyJykge1xuICAgICAgICAgICAgaWYgKGhvdXJzID09PSAxMikge1xuICAgICAgICAgICAgICAgIHJldHVybiAocG0gPyAxMiA6IDApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKHBtID8gaG91cnMgKyAxMiA6IGhvdXJzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaG91cnM7XG4gICAgfVxuXG4gICAgdmFsaWRhdGVUaW1lKGhvdXI6IG51bWJlciwgbWludXRlOiBudW1iZXIsIHNlY29uZDogbnVtYmVyLCBwbTogYm9vbGVhbikge1xuICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLnZhbHVlO1xuICAgICAgICBjb25zdCBjb252ZXJ0ZWRIb3VyID0gdGhpcy5jb252ZXJ0VG8yNEhvdXIoaG91ciwgcG0pO1xuICAgICAgICBpZiAodGhpcy5pc1JhbmdlU2VsZWN0aW9uKCkpIHtcbiAgICAgICAgICAgIHZhbHVlID0gdGhpcy52YWx1ZVsxXSB8fCB0aGlzLnZhbHVlWzBdO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmlzTXVsdGlwbGVTZWxlY3Rpb24oKSkge1xuICAgICAgICAgICAgdmFsdWUgPSB0aGlzLnZhbHVlW3RoaXMudmFsdWUubGVuZ3RoIC0gMV07XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdmFsdWVEYXRlU3RyaW5nID0gdmFsdWUgPyB2YWx1ZS50b0RhdGVTdHJpbmcoKSA6IG51bGw7XG4gICAgICAgIGlmICh0aGlzLm1pbkRhdGUgJiYgdmFsdWVEYXRlU3RyaW5nICYmIHRoaXMubWluRGF0ZS50b0RhdGVTdHJpbmcoKSA9PT0gdmFsdWVEYXRlU3RyaW5nKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5taW5EYXRlLmdldEhvdXJzKCkgPiBjb252ZXJ0ZWRIb3VyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMubWluRGF0ZS5nZXRIb3VycygpID09PSBjb252ZXJ0ZWRIb3VyKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubWluRGF0ZS5nZXRNaW51dGVzKCkgPiBtaW51dGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5taW5EYXRlLmdldE1pbnV0ZXMoKSA9PT0gbWludXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm1pbkRhdGUuZ2V0U2Vjb25kcygpID4gc2Vjb25kKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgaWYgKHRoaXMubWF4RGF0ZSAmJiB2YWx1ZURhdGVTdHJpbmcgJiYgdGhpcy5tYXhEYXRlLnRvRGF0ZVN0cmluZygpID09PSB2YWx1ZURhdGVTdHJpbmcpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm1heERhdGUuZ2V0SG91cnMoKSA8IGNvbnZlcnRlZEhvdXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5tYXhEYXRlLmdldEhvdXJzKCkgPT09IGNvbnZlcnRlZEhvdXIpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tYXhEYXRlLmdldE1pbnV0ZXMoKSA8IG1pbnV0ZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1heERhdGUuZ2V0TWludXRlcygpID09PSBtaW51dGUpIHtcbiAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm1heERhdGUuZ2V0U2Vjb25kcygpIDwgc2Vjb25kKSB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cblxuICAgIGluY3JlbWVudEhvdXIoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgcHJldkhvdXIgPSB0aGlzLmN1cnJlbnRIb3VyO1xuICAgICAgICBsZXQgbmV3SG91ciA9IHRoaXMuY3VycmVudEhvdXIgKyB0aGlzLnN0ZXBIb3VyO1xuICAgICAgICBsZXQgbmV3UE0gPSB0aGlzLnBtO1xuXG4gICAgICAgIGlmICh0aGlzLmhvdXJGb3JtYXQgPT0gJzI0JylcbiAgICAgICAgICAgIG5ld0hvdXIgPSAobmV3SG91ciA+PSAyNCkgPyAobmV3SG91ciAtIDI0KSA6IG5ld0hvdXI7XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuaG91ckZvcm1hdCA9PSAnMTInKSB7XG4gICAgICAgICAgICAvLyBCZWZvcmUgdGhlIEFNL1BNIGJyZWFrLCBub3cgYWZ0ZXJcbiAgICAgICAgICAgIGlmIChwcmV2SG91ciA8IDEyICYmIG5ld0hvdXIgPiAxMSkge1xuICAgICAgICAgICAgICAgIG5ld1BNPSAhdGhpcy5wbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5ld0hvdXIgPSAobmV3SG91ciA+PSAxMykgPyAobmV3SG91ciAtIDEyKSA6IG5ld0hvdXI7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy52YWxpZGF0ZVRpbWUobmV3SG91ciwgdGhpcy5jdXJyZW50TWludXRlLCB0aGlzLmN1cnJlbnRTZWNvbmQsIG5ld1BNKSkge1xuICAgICAgICAgIHRoaXMuY3VycmVudEhvdXIgPSBuZXdIb3VyO1xuICAgICAgICAgIHRoaXMucG0gPSBuZXdQTTtcbiAgICAgICAgfVxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIG9uVGltZVBpY2tlckVsZW1lbnRNb3VzZURvd24oZXZlbnQ6IEV2ZW50LCB0eXBlOiBudW1iZXIsIGRpcmVjdGlvbjogbnVtYmVyKSB7XG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5yZXBlYXQoZXZlbnQsIG51bGwsIHR5cGUsIGRpcmVjdGlvbik7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25UaW1lUGlja2VyRWxlbWVudE1vdXNlVXAoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5jbGVhclRpbWVQaWNrZXJUaW1lcigpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVUaW1lKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblRpbWVQaWNrZXJFbGVtZW50TW91c2VMZWF2ZSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkICYmIHRoaXMudGltZVBpY2tlclRpbWVyKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyVGltZVBpY2tlclRpbWVyKCk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVRpbWUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlcGVhdChldmVudDogRXZlbnQsIGludGVydmFsOiBudW1iZXIsIHR5cGU6IG51bWJlciwgZGlyZWN0aW9uOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGkgPSBpbnRlcnZhbHx8NTAwO1xuXG4gICAgICAgIHRoaXMuY2xlYXJUaW1lUGlja2VyVGltZXIoKTtcbiAgICAgICAgdGhpcy50aW1lUGlja2VyVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVwZWF0KGV2ZW50LCAxMDAsIHR5cGUsIGRpcmVjdGlvbik7XG4gICAgICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9LCBpKTtcblxuICAgICAgICBzd2l0Y2godHlwZSkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIGlmIChkaXJlY3Rpb24gPT09IDEpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5jcmVtZW50SG91cihldmVudCk7XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlY3JlbWVudEhvdXIoZXZlbnQpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICBpZiAoZGlyZWN0aW9uID09PSAxKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmluY3JlbWVudE1pbnV0ZShldmVudCk7XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlY3JlbWVudE1pbnV0ZShldmVudCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIGlmIChkaXJlY3Rpb24gPT09IDEpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5jcmVtZW50U2Vjb25kKGV2ZW50KTtcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVjcmVtZW50U2Vjb25kKGV2ZW50KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy51cGRhdGVJbnB1dGZpZWxkKCk7XG4gICAgfVxuXG4gICAgY2xlYXJUaW1lUGlja2VyVGltZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnRpbWVQaWNrZXJUaW1lcikge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZVBpY2tlclRpbWVyKTtcbiAgICAgICAgICAgIHRoaXMudGltZVBpY2tlclRpbWVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlY3JlbWVudEhvdXIoZXZlbnQpIHtcbiAgICAgICAgbGV0IG5ld0hvdXIgPSB0aGlzLmN1cnJlbnRIb3VyIC0gdGhpcy5zdGVwSG91cjtcbiAgICAgICAgbGV0IG5ld1BNID0gdGhpcy5wbVxuXG4gICAgICAgIGlmICh0aGlzLmhvdXJGb3JtYXQgPT0gJzI0JylcbiAgICAgICAgICAgIG5ld0hvdXIgPSAobmV3SG91ciA8IDApID8gKDI0ICsgbmV3SG91cikgOiBuZXdIb3VyO1xuICAgICAgICBlbHNlIGlmICh0aGlzLmhvdXJGb3JtYXQgPT0gJzEyJykge1xuICAgICAgICAgICAgLy8gSWYgd2Ugd2VyZSBhdCBub29uL21pZG5pZ2h0LCB0aGVuIHN3aXRjaFxuICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudEhvdXIgPT09IDEyKSB7XG4gICAgICAgICAgICAgICAgbmV3UE0gPSAhdGhpcy5wbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5ld0hvdXIgPSAobmV3SG91ciA8PSAwKSA/ICgxMiArIG5ld0hvdXIpIDogbmV3SG91cjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnZhbGlkYXRlVGltZShuZXdIb3VyLCB0aGlzLmN1cnJlbnRNaW51dGUsIHRoaXMuY3VycmVudFNlY29uZCwgbmV3UE0pKSB7XG4gICAgICAgICAgdGhpcy5jdXJyZW50SG91ciA9IG5ld0hvdXI7XG4gICAgICAgICAgdGhpcy5wbSA9IG5ld1BNO1xuICAgICAgICB9XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBpbmNyZW1lbnRNaW51dGUoZXZlbnQpIHtcbiAgICAgICAgbGV0IG5ld01pbnV0ZSA9IHRoaXMuY3VycmVudE1pbnV0ZSArIHRoaXMuc3RlcE1pbnV0ZTtcbiAgICAgICAgbmV3TWludXRlID0gKG5ld01pbnV0ZSA+IDU5KSA/IG5ld01pbnV0ZSAtIDYwIDogbmV3TWludXRlO1xuICAgICAgICBpZiAodGhpcy52YWxpZGF0ZVRpbWUodGhpcy5jdXJyZW50SG91ciwgbmV3TWludXRlLCB0aGlzLmN1cnJlbnRTZWNvbmQsIHRoaXMucG0pKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRNaW51dGUgPSBuZXdNaW51dGU7XG4gICAgICAgIH1cblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIGRlY3JlbWVudE1pbnV0ZShldmVudCkge1xuICAgICAgICBsZXQgbmV3TWludXRlID0gdGhpcy5jdXJyZW50TWludXRlIC0gdGhpcy5zdGVwTWludXRlO1xuICAgICAgICBuZXdNaW51dGUgPSAobmV3TWludXRlIDwgMCkgPyA2MCArIG5ld01pbnV0ZSA6IG5ld01pbnV0ZTtcbiAgICAgICAgaWYgKHRoaXMudmFsaWRhdGVUaW1lKHRoaXMuY3VycmVudEhvdXIsIG5ld01pbnV0ZSwgdGhpcy5jdXJyZW50U2Vjb25kLCB0aGlzLnBtKSkge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50TWludXRlID0gbmV3TWludXRlO1xuICAgICAgICB9XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBpbmNyZW1lbnRTZWNvbmQoZXZlbnQpIHtcbiAgICAgICAgbGV0IG5ld1NlY29uZCA9IHRoaXMuY3VycmVudFNlY29uZCArIHRoaXMuc3RlcFNlY29uZDtcbiAgICAgICAgbmV3U2Vjb25kID0gKG5ld1NlY29uZCA+IDU5KSA/IG5ld1NlY29uZCAtIDYwIDogbmV3U2Vjb25kO1xuICAgICAgICBpZiAodGhpcy52YWxpZGF0ZVRpbWUodGhpcy5jdXJyZW50SG91ciwgdGhpcy5jdXJyZW50TWludXRlLCBuZXdTZWNvbmQsIHRoaXMucG0pKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTZWNvbmQgPSBuZXdTZWNvbmQ7XG4gICAgICAgIH1cblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIGRlY3JlbWVudFNlY29uZChldmVudCkge1xuICAgICAgICBsZXQgbmV3U2Vjb25kID0gdGhpcy5jdXJyZW50U2Vjb25kIC0gdGhpcy5zdGVwU2Vjb25kO1xuICAgICAgICBuZXdTZWNvbmQgPSAobmV3U2Vjb25kIDwgMCkgPyA2MCArIG5ld1NlY29uZCA6IG5ld1NlY29uZDtcbiAgICAgICAgaWYgKHRoaXMudmFsaWRhdGVUaW1lKHRoaXMuY3VycmVudEhvdXIsIHRoaXMuY3VycmVudE1pbnV0ZSwgbmV3U2Vjb25kLCB0aGlzLnBtKSkge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50U2Vjb25kID0gbmV3U2Vjb25kO1xuICAgICAgICB9XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICB1cGRhdGVUaW1lKCkge1xuICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLnZhbHVlO1xuICAgICAgICBpZiAodGhpcy5pc1JhbmdlU2VsZWN0aW9uKCkpIHtcbiAgICAgICAgICAgIHZhbHVlID0gdGhpcy52YWx1ZVsxXSB8fCB0aGlzLnZhbHVlWzBdO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmlzTXVsdGlwbGVTZWxlY3Rpb24oKSkge1xuICAgICAgICAgICAgdmFsdWUgPSB0aGlzLnZhbHVlW3RoaXMudmFsdWUubGVuZ3RoIC0gMV07XG4gICAgICAgIH1cbiAgICAgICAgdmFsdWUgPSB2YWx1ZSA/IG5ldyBEYXRlKHZhbHVlLmdldFRpbWUoKSkgOiBuZXcgRGF0ZSgpO1xuXG4gICAgICAgIGlmICh0aGlzLmhvdXJGb3JtYXQgPT0gJzEyJykge1xuICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudEhvdXIgPT09IDEyKVxuICAgICAgICAgICAgICAgIHZhbHVlLnNldEhvdXJzKHRoaXMucG0gPyAxMiA6IDApO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHZhbHVlLnNldEhvdXJzKHRoaXMucG0gPyB0aGlzLmN1cnJlbnRIb3VyICsgMTIgOiB0aGlzLmN1cnJlbnRIb3VyKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhbHVlLnNldEhvdXJzKHRoaXMuY3VycmVudEhvdXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFsdWUuc2V0TWludXRlcyh0aGlzLmN1cnJlbnRNaW51dGUpO1xuICAgICAgICB2YWx1ZS5zZXRTZWNvbmRzKHRoaXMuY3VycmVudFNlY29uZCk7XG4gICAgICAgIGlmICh0aGlzLmlzUmFuZ2VTZWxlY3Rpb24oKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMudmFsdWVbMV0pXG4gICAgICAgICAgICAgICAgdmFsdWUgPSBbdGhpcy52YWx1ZVswXSwgdmFsdWVdO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHZhbHVlID0gW3ZhbHVlLCBudWxsXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmlzTXVsdGlwbGVTZWxlY3Rpb24oKSl7XG4gICAgICAgICAgICB2YWx1ZSA9IFsuLi50aGlzLnZhbHVlLnNsaWNlKDAsIC0xKSwgdmFsdWVdO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy51cGRhdGVNb2RlbCh2YWx1ZSk7XG4gICAgICAgIHRoaXMub25TZWxlY3QuZW1pdCh2YWx1ZSk7XG4gICAgICAgIHRoaXMudXBkYXRlSW5wdXRmaWVsZCgpO1xuICAgIH1cblxuICAgIHRvZ2dsZUFNUE0oZXZlbnQpIHtcbiAgICAgICAgY29uc3QgbmV3UE0gPSAhdGhpcy5wbTtcbiAgICAgICAgaWYgKHRoaXMudmFsaWRhdGVUaW1lKHRoaXMuY3VycmVudEhvdXIsIHRoaXMuY3VycmVudE1pbnV0ZSwgdGhpcy5jdXJyZW50U2Vjb25kLCBuZXdQTSkpIHtcbiAgICAgICAgICB0aGlzLnBtID0gbmV3UE07XG4gICAgICAgICAgdGhpcy51cGRhdGVUaW1lKCk7XG4gICAgICAgIH1cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBvblVzZXJJbnB1dChldmVudCkge1xuICAgICAgICAvLyBJRSAxMSBXb3JrYXJvdW5kIGZvciBpbnB1dCBwbGFjZWhvbGRlciA6IGh0dHBzOi8vZ2l0aHViLmNvbS9wcmltZWZhY2VzL3ByaW1lbmcvaXNzdWVzLzIwMjZcbiAgICAgICAgaWYgKCF0aGlzLmlzS2V5ZG93bikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaXNLZXlkb3duID0gZmFsc2U7XG5cbiAgICAgICAgbGV0IHZhbCA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHRoaXMucGFyc2VWYWx1ZUZyb21TdHJpbmcodmFsKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzVmFsaWRTZWxlY3Rpb24odmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVNb2RlbCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVVSSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoKGVycikge1xuICAgICAgICAgICAgLy9pbnZhbGlkIGRhdGVcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTW9kZWwobnVsbCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmZpbGxlZCA9IHZhbCAhPSBudWxsICYmIHZhbC5sZW5ndGg7XG4gICAgICAgIHRoaXMub25JbnB1dC5lbWl0KGV2ZW50KTtcbiAgICB9XG5cbiAgICBpc1ZhbGlkU2VsZWN0aW9uKHZhbHVlKTogYm9vbGVhbiB7XG4gICAgICAgIGxldCBpc1ZhbGlkID0gdHJ1ZTtcbiAgICAgICAgaWYgKHRoaXMuaXNTaW5nbGVTZWxlY3Rpb24oKSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmlzU2VsZWN0YWJsZSh2YWx1ZS5nZXREYXRlKCksIHZhbHVlLmdldE1vbnRoKCksIHZhbHVlLmdldEZ1bGxZZWFyKCksIGZhbHNlKSkge1xuICAgICAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh2YWx1ZS5ldmVyeSh2ID0+IHRoaXMuaXNTZWxlY3RhYmxlKHYuZ2V0RGF0ZSgpLCB2LmdldE1vbnRoKCksIHYuZ2V0RnVsbFllYXIoKSwgZmFsc2UpKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNSYW5nZVNlbGVjdGlvbigpKSB7XG4gICAgICAgICAgICAgICAgaXNWYWxpZCA9IHZhbHVlLmxlbmd0aCA+IDEgJiYgdmFsdWVbMV0gPiB2YWx1ZVswXSA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaXNWYWxpZDtcbiAgICB9XG5cbiAgICBwYXJzZVZhbHVlRnJvbVN0cmluZyh0ZXh0OiBzdHJpbmcpOiBEYXRlIHwgRGF0ZVtde1xuICAgICAgICBpZiAoIXRleHQgfHwgdGV4dC50cmltKCkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB2YWx1ZTogYW55O1xuXG4gICAgICAgIGlmICh0aGlzLmlzU2luZ2xlU2VsZWN0aW9uKCkpIHtcbiAgICAgICAgICAgIHZhbHVlID0gdGhpcy5wYXJzZURhdGVUaW1lKHRleHQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuaXNNdWx0aXBsZVNlbGVjdGlvbigpKSB7XG4gICAgICAgICAgICBsZXQgdG9rZW5zID0gdGV4dC5zcGxpdCh0aGlzLm11bHRpcGxlU2VwYXJhdG9yKTtcbiAgICAgICAgICAgIHZhbHVlID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCB0b2tlbiBvZiB0b2tlbnMpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZS5wdXNoKHRoaXMucGFyc2VEYXRlVGltZSh0b2tlbi50cmltKCkpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmlzUmFuZ2VTZWxlY3Rpb24oKSkge1xuICAgICAgICAgICAgbGV0IHRva2VucyA9IHRleHQuc3BsaXQoJyAnK3RoaXMucmFuZ2VTZXBhcmF0b3IgKycgJyk7XG4gICAgICAgICAgICB2YWx1ZSA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b2tlbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YWx1ZVtpXSA9IHRoaXMucGFyc2VEYXRlVGltZSh0b2tlbnNbaV0udHJpbSgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICBwYXJzZURhdGVUaW1lKHRleHQpOiBEYXRlIHtcbiAgICAgICAgbGV0IGRhdGU6IERhdGU7XG4gICAgICAgIGxldCBwYXJ0czogc3RyaW5nW10gPSB0ZXh0LnNwbGl0KCcgJyk7XG5cbiAgICAgICAgaWYgKHRoaXMudGltZU9ubHkpIHtcbiAgICAgICAgICAgIGRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgdGhpcy5wb3B1bGF0ZVRpbWUoZGF0ZSwgcGFydHNbMF0sIHBhcnRzWzFdKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGVGb3JtYXQgPSB0aGlzLmdldERhdGVGb3JtYXQoKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnNob3dUaW1lKSB7XG4gICAgICAgICAgICAgICAgbGV0IGFtcG0gPSB0aGlzLmhvdXJGb3JtYXQgPT0gJzEyJyA/IHBhcnRzLnBvcCgpIDogbnVsbDtcbiAgICAgICAgICAgICAgICBsZXQgdGltZVN0cmluZyA9IHBhcnRzLnBvcCgpO1xuXG4gICAgICAgICAgICAgICAgZGF0ZSA9IHRoaXMucGFyc2VEYXRlKHBhcnRzLmpvaW4oJyAnKSwgZGF0ZUZvcm1hdCk7XG4gICAgICAgICAgICAgICAgdGhpcy5wb3B1bGF0ZVRpbWUoZGF0ZSwgdGltZVN0cmluZywgYW1wbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgZGF0ZSA9IHRoaXMucGFyc2VEYXRlKHRleHQsIGRhdGVGb3JtYXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRhdGU7XG4gICAgfVxuXG4gICAgcG9wdWxhdGVUaW1lKHZhbHVlLCB0aW1lU3RyaW5nLCBhbXBtKSB7XG4gICAgICAgIGlmICh0aGlzLmhvdXJGb3JtYXQgPT0gJzEyJyAmJiAhYW1wbSkge1xuICAgICAgICAgICAgdGhyb3cgJ0ludmFsaWQgVGltZSc7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnBtID0gKGFtcG0gPT09ICdQTScgfHwgYW1wbSA9PT0gJ3BtJyk7XG4gICAgICAgIGxldCB0aW1lID0gdGhpcy5wYXJzZVRpbWUodGltZVN0cmluZyk7XG4gICAgICAgIHZhbHVlLnNldEhvdXJzKHRpbWUuaG91cik7XG4gICAgICAgIHZhbHVlLnNldE1pbnV0ZXModGltZS5taW51dGUpO1xuICAgICAgICB2YWx1ZS5zZXRTZWNvbmRzKHRpbWUuc2Vjb25kKTtcbiAgICB9XG5cbiAgICB1cGRhdGVVSSgpIHtcbiAgICAgICAgbGV0IHZhbCA9IHRoaXMudmFsdWV8fHRoaXMuZGVmYXVsdERhdGV8fG5ldyBEYXRlKCk7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbCkpe1xuICAgICAgICAgICAgdmFsID0gdmFsWzBdO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jdXJyZW50TW9udGggPSB2YWwuZ2V0TW9udGgoKTtcbiAgICAgICAgdGhpcy5jdXJyZW50WWVhciA9IHZhbC5nZXRGdWxsWWVhcigpO1xuICAgICAgICB0aGlzLmNyZWF0ZU1vbnRocyh0aGlzLmN1cnJlbnRNb250aCwgdGhpcy5jdXJyZW50WWVhcik7XG5cbiAgICAgICAgaWYgKHRoaXMuc2hvd1RpbWV8fHRoaXMudGltZU9ubHkpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0Q3VycmVudEhvdXJQTSh2YWwuZ2V0SG91cnMoKSk7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRNaW51dGUgPSB2YWwuZ2V0TWludXRlcygpO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50U2Vjb25kID0gdmFsLmdldFNlY29uZHMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNob3dPdmVybGF5KCkge1xuICAgICAgICBpZiAoIXRoaXMub3ZlcmxheVZpc2libGUpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVUkoKTtcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheVZpc2libGUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGlkZU92ZXJsYXkoKSB7XG4gICAgICAgIHRoaXMub3ZlcmxheVZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jbGVhclRpbWVQaWNrZXJUaW1lcigpO1xuXG4gICAgICAgIGlmICh0aGlzLnRvdWNoVUkpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzYWJsZU1vZGFsaXR5KCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIHRvZ2dsZSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlubGluZSl7XG4gICAgICAgICAgICBpZiAoIXRoaXMub3ZlcmxheVZpc2libGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dPdmVybGF5KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5pbnB1dGZpZWxkVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZU92ZXJsYXkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uT3ZlcmxheUFuaW1hdGlvblN0YXJ0KGV2ZW50OiBBbmltYXRpb25FdmVudCkge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LnRvU3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ3Zpc2libGUnOlxuICAgICAgICAgICAgY2FzZSAndmlzaWJsZVRvdWNoVUknOlxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pbmxpbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vdmVybGF5ID0gZXZlbnQuZWxlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHBlbmRPdmVybGF5KCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmF1dG9aSW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnRvdWNoVUkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgWkluZGV4VXRpbHMuc2V0KCdtb2RhbCcsIHRoaXMub3ZlcmxheSwgdGhpcy5iYXNlWkluZGV4IHx8IHRoaXMuY29uZmlnLnpJbmRleC5tb2RhbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgWkluZGV4VXRpbHMuc2V0KCdvdmVybGF5JywgdGhpcy5vdmVybGF5LCB0aGlzLmJhc2VaSW5kZXggfHwgdGhpcy5jb25maWcuekluZGV4Lm92ZXJsYXkpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbGlnbk92ZXJsYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vblNob3cuZW1pdChldmVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ3ZvaWQnOlxuICAgICAgICAgICAgICAgIHRoaXMub25PdmVybGF5SGlkZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMub25DbG9zZS5lbWl0KGV2ZW50KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25PdmVybGF5QW5pbWF0aW9uRG9uZShldmVudDogQW5pbWF0aW9uRXZlbnQpIHtcbiAgICAgICAgc3dpdGNoIChldmVudC50b1N0YXRlKSB7XG4gICAgICAgICAgICBjYXNlICd2aXNpYmxlJzpcbiAgICAgICAgICAgIGNhc2UgJ3Zpc2libGVUb3VjaFVJJzpcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaW5saW5lKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmluZERvY3VtZW50Q2xpY2tMaXN0ZW5lcigpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJpbmREb2N1bWVudFJlc2l6ZUxpc3RlbmVyKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmluZFNjcm9sbExpc3RlbmVyKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ3ZvaWQnOlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmF1dG9aSW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgWkluZGV4VXRpbHMuY2xlYXIoZXZlbnQuZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFwcGVuZE92ZXJsYXkoKSB7XG4gICAgICAgIGlmICh0aGlzLmFwcGVuZFRvKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5hcHBlbmRUbyA9PT0gJ2JvZHknKVxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5vdmVybGF5KTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBEb21IYW5kbGVyLmFwcGVuZENoaWxkKHRoaXMub3ZlcmxheSwgdGhpcy5hcHBlbmRUbyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXN0b3JlT3ZlcmxheUFwcGVuZCgpIHtcbiAgICAgICAgaWYgKHRoaXMub3ZlcmxheSAmJiB0aGlzLmFwcGVuZFRvKSB7XG4gICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5vdmVybGF5KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFsaWduT3ZlcmxheSgpIHtcbiAgICAgICAgaWYgKHRoaXMudG91Y2hVSSkge1xuICAgICAgICAgICAgdGhpcy5lbmFibGVNb2RhbGl0eSh0aGlzLm92ZXJsYXkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMuYXBwZW5kVG8pXG4gICAgICAgICAgICAgICAgRG9tSGFuZGxlci5hYnNvbHV0ZVBvc2l0aW9uKHRoaXMub3ZlcmxheSwgdGhpcy5pbnB1dGZpZWxkVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIERvbUhhbmRsZXIucmVsYXRpdmVQb3NpdGlvbih0aGlzLm92ZXJsYXksIHRoaXMuaW5wdXRmaWVsZFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGVuYWJsZU1vZGFsaXR5KGVsZW1lbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLm1hc2spIHtcbiAgICAgICAgICAgIHRoaXMubWFzayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgdGhpcy5tYXNrLnN0eWxlLnpJbmRleCA9IFN0cmluZyhwYXJzZUludChlbGVtZW50LnN0eWxlLnpJbmRleCkgLSAxKTtcbiAgICAgICAgICAgIGxldCBtYXNrU3R5bGVDbGFzcyA9ICdwLWNvbXBvbmVudC1vdmVybGF5IHAtZGF0ZXBpY2tlci1tYXNrIHAtZGF0ZXBpY2tlci1tYXNrLXNjcm9sbGJsb2NrZXInO1xuICAgICAgICAgICAgRG9tSGFuZGxlci5hZGRNdWx0aXBsZUNsYXNzZXModGhpcy5tYXNrLCBtYXNrU3R5bGVDbGFzcyk7XG5cblx0XHRcdHRoaXMubWFza0NsaWNrTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbih0aGlzLm1hc2ssICdjbGljaycsIChldmVudDogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNhYmxlTW9kYWxpdHkoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLm1hc2spO1xuICAgICAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcyhkb2N1bWVudC5ib2R5LCAncC1vdmVyZmxvdy1oaWRkZW4nKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRpc2FibGVNb2RhbGl0eSgpIHtcbiAgICAgICAgaWYgKHRoaXMubWFzaykge1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh0aGlzLm1hc2spO1xuICAgICAgICAgICAgbGV0IGJvZHlDaGlsZHJlbiA9IGRvY3VtZW50LmJvZHkuY2hpbGRyZW47XG4gICAgICAgICAgICBsZXQgaGFzQmxvY2tlck1hc2tzOiBib29sZWFuO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBib2R5Q2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgYm9keUNoaWxkID0gYm9keUNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgICAgIGlmIChEb21IYW5kbGVyLmhhc0NsYXNzKGJvZHlDaGlsZCwgJ3AtZGF0ZXBpY2tlci1tYXNrLXNjcm9sbGJsb2NrZXInKSkge1xuICAgICAgICAgICAgICAgICAgICBoYXNCbG9ja2VyTWFza3MgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghaGFzQmxvY2tlck1hc2tzKSB7XG4gICAgICAgICAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyhkb2N1bWVudC5ib2R5LCAncC1vdmVyZmxvdy1oaWRkZW4nKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy51bmJpbmRNYXNrQ2xpY2tMaXN0ZW5lcigpO1xuXG4gICAgICAgICAgICB0aGlzLm1hc2sgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdW5iaW5kTWFza0NsaWNrTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLm1hc2tDbGlja0xpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLm1hc2tDbGlja0xpc3RlbmVyKCk7XG4gICAgICAgICAgICB0aGlzLm1hc2tDbGlja0xpc3RlbmVyID0gbnVsbDtcblx0XHR9XG4gICAgfVxuXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSA6IHZvaWQge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIGlmICh0aGlzLnZhbHVlICYmIHR5cGVvZiB0aGlzLnZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMucGFyc2VWYWx1ZUZyb21TdHJpbmcodGhpcy52YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnVwZGF0ZUlucHV0ZmllbGQoKTtcbiAgICAgICAgdGhpcy51cGRhdGVVSSgpO1xuICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkID0gZm47XG4gICAgfVxuXG4gICAgc2V0RGlzYWJsZWRTdGF0ZSh2YWw6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IHZhbDtcbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBnZXREYXRlRm9ybWF0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRlRm9ybWF0fHx0aGlzLmdldFRyYW5zbGF0aW9uKCdkYXRlRm9ybWF0Jyk7XG4gICAgfVxuXG4gICAgLy8gUG9ydGVkIGZyb20ganF1ZXJ5LXVpIGRhdGVwaWNrZXIgZm9ybWF0RGF0ZVxuICAgIGZvcm1hdERhdGUoZGF0ZSwgZm9ybWF0KSB7XG4gICAgICAgIGlmICghZGF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGlGb3JtYXQ7XG4gICAgICAgIGNvbnN0IGxvb2tBaGVhZCA9IChtYXRjaCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbWF0Y2hlcyA9IChpRm9ybWF0ICsgMSA8IGZvcm1hdC5sZW5ndGggJiYgZm9ybWF0LmNoYXJBdChpRm9ybWF0ICsgMSkgPT09IG1hdGNoKTtcbiAgICAgICAgICAgIGlmIChtYXRjaGVzKSB7XG4gICAgICAgICAgICAgICAgaUZvcm1hdCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG1hdGNoZXM7XG4gICAgICAgIH0sXG4gICAgICAgICAgICBmb3JtYXROdW1iZXIgPSAobWF0Y2gsIHZhbHVlLCBsZW4pID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgbnVtID0gJycgKyB2YWx1ZTtcbiAgICAgICAgICAgICAgICBpZiAobG9va0FoZWFkKG1hdGNoKSkge1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAobnVtLmxlbmd0aCA8IGxlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgbnVtID0gJzAnICsgbnVtO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBudW07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZm9ybWF0TmFtZSA9IChtYXRjaCwgdmFsdWUsIHNob3J0TmFtZXMsIGxvbmdOYW1lcykgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiAobG9va0FoZWFkKG1hdGNoKSA/IGxvbmdOYW1lc1t2YWx1ZV0gOiBzaG9ydE5hbWVzW3ZhbHVlXSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICBsZXQgb3V0cHV0ID0gJyc7XG4gICAgICAgIGxldCBsaXRlcmFsID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKGRhdGUpIHtcbiAgICAgICAgICAgIGZvciAoaUZvcm1hdCA9IDA7IGlGb3JtYXQgPCBmb3JtYXQubGVuZ3RoOyBpRm9ybWF0KyspIHtcbiAgICAgICAgICAgICAgICBpZiAobGl0ZXJhbCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZm9ybWF0LmNoYXJBdChpRm9ybWF0KSA9PT0gJ1xcJycgJiYgIWxvb2tBaGVhZCgnXFwnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpdGVyYWwgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dCArPSBmb3JtYXQuY2hhckF0KGlGb3JtYXQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChmb3JtYXQuY2hhckF0KGlGb3JtYXQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdkJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXQgKz0gZm9ybWF0TnVtYmVyKCdkJywgZGF0ZS5nZXREYXRlKCksIDIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnRCc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0ICs9IGZvcm1hdE5hbWUoJ0QnLCBkYXRlLmdldERheSgpLCB0aGlzLmdldFRyYW5zbGF0aW9uKFRyYW5zbGF0aW9uS2V5cy5EQVlfTkFNRVNfU0hPUlQpLCB0aGlzLmdldFRyYW5zbGF0aW9uKFRyYW5zbGF0aW9uS2V5cy5EQVlfTkFNRVMpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ28nOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dCArPSBmb3JtYXROdW1iZXIoJ28nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1hdGgucm91bmQoKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgRGF0ZShkYXRlLmdldEZ1bGxZZWFyKCksIGRhdGUuZ2V0TW9udGgoKSwgZGF0ZS5nZXREYXRlKCkpLmdldFRpbWUoKSAtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBEYXRlKGRhdGUuZ2V0RnVsbFllYXIoKSwgMCwgMCkuZ2V0VGltZSgpKSAvIDg2NDAwMDAwKSwgMyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdtJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXQgKz0gZm9ybWF0TnVtYmVyKCdtJywgZGF0ZS5nZXRNb250aCgpICsgMSwgMik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdNJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXQgKz0gZm9ybWF0TmFtZSgnTScsZGF0ZS5nZXRNb250aCgpLCB0aGlzLmdldFRyYW5zbGF0aW9uKFRyYW5zbGF0aW9uS2V5cy5NT05USF9OQU1FU19TSE9SVCksIHRoaXMuZ2V0VHJhbnNsYXRpb24oVHJhbnNsYXRpb25LZXlzLk1PTlRIX05BTUVTKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICd5JzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXQgKz0gbG9va0FoZWFkKCd5JykgPyBkYXRlLmdldEZ1bGxZZWFyKCkgOiAoZGF0ZS5nZXRGdWxsWWVhcigpICUgMTAwIDwgMTAgPyAnMCcgOiAnJykgKyAoZGF0ZS5nZXRGdWxsWWVhcigpICUgMTAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ0AnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dCArPSBkYXRlLmdldFRpbWUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJyEnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dCArPSBkYXRlLmdldFRpbWUoKSAqIDEwMDAwICsgdGhpcy50aWNrc1RvMTk3MDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ1xcJyc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxvb2tBaGVhZCgnXFwnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0ICs9ICdcXCcnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpdGVyYWwgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0ICs9IGZvcm1hdC5jaGFyQXQoaUZvcm1hdCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICB9XG5cbiAgICBmb3JtYXRUaW1lKGRhdGUpIHtcbiAgICAgICAgaWYgKCFkYXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgb3V0cHV0ID0gJyc7XG4gICAgICAgIGxldCBob3VycyA9IGRhdGUuZ2V0SG91cnMoKTtcbiAgICAgICAgbGV0IG1pbnV0ZXMgPSBkYXRlLmdldE1pbnV0ZXMoKTtcbiAgICAgICAgbGV0IHNlY29uZHMgPSBkYXRlLmdldFNlY29uZHMoKTtcblxuICAgICAgICBpZiAodGhpcy5ob3VyRm9ybWF0ID09ICcxMicgJiYgaG91cnMgPiAxMSAmJiBob3VycyAhPSAxMikge1xuICAgICAgICAgICAgaG91cnMtPTEyO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaG91ckZvcm1hdCA9PSAnMTInKSB7XG4gICAgICAgICAgICBvdXRwdXQgKz0gaG91cnMgPT09IDAgPyAxMiA6IChob3VycyA8IDEwKSA/ICcwJyArIGhvdXJzIDogaG91cnM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvdXRwdXQgKz0gKGhvdXJzIDwgMTApID8gJzAnICsgaG91cnMgOiBob3VycztcbiAgICAgICAgfVxuICAgICAgICBvdXRwdXQgKz0gJzonO1xuICAgICAgICBvdXRwdXQgKz0gKG1pbnV0ZXMgPCAxMCkgPyAnMCcgKyBtaW51dGVzIDogbWludXRlcztcblxuICAgICAgICBpZiAodGhpcy5zaG93U2Vjb25kcykge1xuICAgICAgICAgICAgb3V0cHV0ICs9ICc6JztcbiAgICAgICAgICAgIG91dHB1dCArPSAoc2Vjb25kcyA8IDEwKSA/ICcwJyArIHNlY29uZHMgOiBzZWNvbmRzO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaG91ckZvcm1hdCA9PSAnMTInKSB7XG4gICAgICAgICAgICBvdXRwdXQgKz0gZGF0ZS5nZXRIb3VycygpID4gMTEgPyAnIFBNJyA6ICcgQU0nO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICB9XG5cbiAgICBwYXJzZVRpbWUodmFsdWUpIHtcbiAgICAgICAgbGV0IHRva2Vuczogc3RyaW5nW10gPSB2YWx1ZS5zcGxpdCgnOicpO1xuICAgICAgICBsZXQgdmFsaWRUb2tlbkxlbmd0aCA9IHRoaXMuc2hvd1NlY29uZHMgPyAzIDogMjtcblxuICAgICAgICBpZiAodG9rZW5zLmxlbmd0aCAhPT0gdmFsaWRUb2tlbkxlbmd0aCkge1xuICAgICAgICAgICAgdGhyb3cgXCJJbnZhbGlkIHRpbWVcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBoID0gcGFyc2VJbnQodG9rZW5zWzBdKTtcbiAgICAgICAgbGV0IG0gPSBwYXJzZUludCh0b2tlbnNbMV0pO1xuICAgICAgICBsZXQgcyA9IHRoaXMuc2hvd1NlY29uZHMgPyBwYXJzZUludCh0b2tlbnNbMl0pIDogbnVsbDtcblxuICAgICAgICBpZiAoaXNOYU4oaCkgfHwgaXNOYU4obSkgfHwgaCA+IDIzIHx8IG0gPiA1OSB8fCAodGhpcy5ob3VyRm9ybWF0ID09ICcxMicgJiYgaCA+IDEyKSB8fCAodGhpcy5zaG93U2Vjb25kcyAmJiAoaXNOYU4ocykgfHwgcyA+IDU5KSkpIHtcbiAgICAgICAgICAgIHRocm93IFwiSW52YWxpZCB0aW1lXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5ob3VyRm9ybWF0ID09ICcxMicpIHtcbiAgICAgICAgICAgICAgICBpZiAoaCAhPT0gMTIgJiYgdGhpcy5wbSkge1xuICAgICAgICAgICAgICAgICAgICBoICs9IDEyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICghdGhpcy5wbSAmJiBoID09PSAxMikge1xuICAgICAgICAgICAgICAgICAgICBoIC09IDEyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHtob3VyOiBoLCBtaW51dGU6IG0sIHNlY29uZDogc307XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBQb3J0ZWQgZnJvbSBqcXVlcnktdWkgZGF0ZXBpY2tlciBwYXJzZURhdGVcbiAgICBwYXJzZURhdGUodmFsdWUsIGZvcm1hdCkge1xuICAgICAgICBpZiAoZm9ybWF0ID09IG51bGwgfHwgdmFsdWUgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgXCJJbnZhbGlkIGFyZ3VtZW50c1wiO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFsdWUgPSAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiID8gdmFsdWUudG9TdHJpbmcoKSA6IHZhbHVlICsgXCJcIik7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gXCJcIikge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaUZvcm1hdCwgZGltLCBleHRyYSxcbiAgICAgICAgaVZhbHVlID0gMCxcbiAgICAgICAgc2hvcnRZZWFyQ3V0b2ZmID0gKHR5cGVvZiB0aGlzLnNob3J0WWVhckN1dG9mZiAhPT0gXCJzdHJpbmdcIiA/IHRoaXMuc2hvcnRZZWFyQ3V0b2ZmIDogbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpICUgMTAwICsgcGFyc2VJbnQodGhpcy5zaG9ydFllYXJDdXRvZmYsIDEwKSksXG4gICAgICAgIHllYXIgPSAtMSxcbiAgICAgICAgbW9udGggPSAtMSxcbiAgICAgICAgZGF5ID0gLTEsXG4gICAgICAgIGRveSA9IC0xLFxuICAgICAgICBsaXRlcmFsID0gZmFsc2UsXG4gICAgICAgIGRhdGUsXG4gICAgICAgIGxvb2tBaGVhZCA9IChtYXRjaCkgPT4ge1xuICAgICAgICAgICAgbGV0IG1hdGNoZXMgPSAoaUZvcm1hdCArIDEgPCBmb3JtYXQubGVuZ3RoICYmIGZvcm1hdC5jaGFyQXQoaUZvcm1hdCArIDEpID09PSBtYXRjaCk7XG4gICAgICAgICAgICBpZiAobWF0Y2hlcykge1xuICAgICAgICAgICAgICAgIGlGb3JtYXQrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBtYXRjaGVzO1xuICAgICAgICB9LFxuICAgICAgICBnZXROdW1iZXIgPSAobWF0Y2gpID0+IHtcbiAgICAgICAgICAgIGxldCBpc0RvdWJsZWQgPSBsb29rQWhlYWQobWF0Y2gpLFxuICAgICAgICAgICAgICAgIHNpemUgPSAobWF0Y2ggPT09IFwiQFwiID8gMTQgOiAobWF0Y2ggPT09IFwiIVwiID8gMjAgOlxuICAgICAgICAgICAgICAgIChtYXRjaCA9PT0gXCJ5XCIgJiYgaXNEb3VibGVkID8gNCA6IChtYXRjaCA9PT0gXCJvXCIgPyAzIDogMikpKSksXG4gICAgICAgICAgICAgICAgbWluU2l6ZSA9IChtYXRjaCA9PT0gXCJ5XCIgPyBzaXplIDogMSksXG4gICAgICAgICAgICAgICAgZGlnaXRzID0gbmV3IFJlZ0V4cChcIl5cXFxcZHtcIiArIG1pblNpemUgKyBcIixcIiArIHNpemUgKyBcIn1cIiksXG4gICAgICAgICAgICAgICAgbnVtID0gdmFsdWUuc3Vic3RyaW5nKGlWYWx1ZSkubWF0Y2goZGlnaXRzKTtcbiAgICAgICAgICAgIGlmICghbnVtKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgXCJNaXNzaW5nIG51bWJlciBhdCBwb3NpdGlvbiBcIiArIGlWYWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlWYWx1ZSArPSBudW1bIDAgXS5sZW5ndGg7XG4gICAgICAgICAgICByZXR1cm4gcGFyc2VJbnQobnVtWyAwIF0sIDEwKTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0TmFtZSA9IChtYXRjaCwgc2hvcnROYW1lcywgbG9uZ05hbWVzKSA9PiB7XG4gICAgICAgICAgICBsZXQgaW5kZXggPSAtMTtcbiAgICAgICAgICAgIGxldCBhcnIgPSBsb29rQWhlYWQobWF0Y2gpID8gbG9uZ05hbWVzIDogc2hvcnROYW1lcztcbiAgICAgICAgICAgIGxldCBuYW1lcyA9IFtdO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIG5hbWVzLnB1c2goW2ksYXJyW2ldXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuYW1lcy5zb3J0KChhLGIpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gLShhWyAxIF0ubGVuZ3RoIC0gYlsgMSBdLmxlbmd0aCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBuYW1lID0gbmFtZXNbaV1bMV07XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlLnN1YnN0cihpVmFsdWUsIG5hbWUubGVuZ3RoKS50b0xvd2VyQ2FzZSgpID09PSBuYW1lLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSBuYW1lc1tpXVswXTtcbiAgICAgICAgICAgICAgICAgICAgaVZhbHVlICs9IG5hbWUubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaW5kZXggKyAxO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBcIlVua25vd24gbmFtZSBhdCBwb3NpdGlvbiBcIiArIGlWYWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY2hlY2tMaXRlcmFsID0gKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHZhbHVlLmNoYXJBdChpVmFsdWUpICE9PSBmb3JtYXQuY2hhckF0KGlGb3JtYXQpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgXCJVbmV4cGVjdGVkIGxpdGVyYWwgYXQgcG9zaXRpb24gXCIgKyBpVmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpVmFsdWUrKztcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAodGhpcy52aWV3ID09PSAnbW9udGgnKSB7XG4gICAgICAgICAgICBkYXkgPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChpRm9ybWF0ID0gMDsgaUZvcm1hdCA8IGZvcm1hdC5sZW5ndGg7IGlGb3JtYXQrKykge1xuICAgICAgICAgICAgaWYgKGxpdGVyYWwpIHtcbiAgICAgICAgICAgICAgICBpZiAoZm9ybWF0LmNoYXJBdChpRm9ybWF0KSA9PT0gXCInXCIgJiYgIWxvb2tBaGVhZChcIidcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgbGl0ZXJhbCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNoZWNrTGl0ZXJhbCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChmb3JtYXQuY2hhckF0KGlGb3JtYXQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJkXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXkgPSBnZXROdW1iZXIoXCJkXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJEXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBnZXROYW1lKFwiRFwiLCB0aGlzLmdldFRyYW5zbGF0aW9uKFRyYW5zbGF0aW9uS2V5cy5EQVlfTkFNRVNfU0hPUlQpLCB0aGlzLmdldFRyYW5zbGF0aW9uKFRyYW5zbGF0aW9uS2V5cy5EQVlfTkFNRVMpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwib1wiOlxuICAgICAgICAgICAgICAgICAgICAgICAgZG95ID0gZ2V0TnVtYmVyKFwib1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwibVwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgbW9udGggPSBnZXROdW1iZXIoXCJtXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJNXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBtb250aCA9IGdldE5hbWUoXCJNXCIsIHRoaXMuZ2V0VHJhbnNsYXRpb24oVHJhbnNsYXRpb25LZXlzLk1PTlRIX05BTUVTX1NIT1JUKSwgdGhpcy5nZXRUcmFuc2xhdGlvbihUcmFuc2xhdGlvbktleXMuTU9OVEhfTkFNRVMpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwieVwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgeWVhciA9IGdldE51bWJlcihcInlcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIkBcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGUgPSBuZXcgRGF0ZShnZXROdW1iZXIoXCJAXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb250aCA9IGRhdGUuZ2V0TW9udGgoKSArIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXkgPSBkYXRlLmdldERhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiIVwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKChnZXROdW1iZXIoXCIhXCIpIC0gdGhpcy50aWNrc1RvMTk3MCkgLyAxMDAwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9udGggPSBkYXRlLmdldE1vbnRoKCkgKyAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF5ID0gZGF0ZS5nZXREYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIidcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsb29rQWhlYWQoXCInXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tMaXRlcmFsKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpdGVyYWwgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja0xpdGVyYWwoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaVZhbHVlIDwgdmFsdWUubGVuZ3RoKSB7XG4gICAgICAgICAgICBleHRyYSA9IHZhbHVlLnN1YnN0cihpVmFsdWUpO1xuICAgICAgICAgICAgaWYgKCEvXlxccysvLnRlc3QoZXh0cmEpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgXCJFeHRyYS91bnBhcnNlZCBjaGFyYWN0ZXJzIGZvdW5kIGluIGRhdGU6IFwiICsgZXh0cmE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoeWVhciA9PT0gLTEpIHtcbiAgICAgICAgICAgIHllYXIgPSBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoeWVhciA8IDEwMCkge1xuICAgICAgICAgICAgeWVhciArPSBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCkgLSBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCkgJSAxMDAgK1xuICAgICAgICAgICAgICAgICh5ZWFyIDw9IHNob3J0WWVhckN1dG9mZiA/IDAgOiAtMTAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkb3kgPiAtMSkge1xuICAgICAgICAgICAgbW9udGggPSAxO1xuICAgICAgICAgICAgZGF5ID0gZG95O1xuICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgIGRpbSA9IHRoaXMuZ2V0RGF5c0NvdW50SW5Nb250aCh5ZWFyLCBtb250aCAtIDEpO1xuICAgICAgICAgICAgICAgIGlmIChkYXkgPD0gZGltKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBtb250aCsrO1xuICAgICAgICAgICAgICAgIGRheSAtPSBkaW07XG4gICAgICAgICAgICB9IHdoaWxlICh0cnVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRhdGUgPSB0aGlzLmRheWxpZ2h0U2F2aW5nQWRqdXN0KG5ldyBEYXRlKHllYXIsIG1vbnRoIC0gMSwgZGF5KSk7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGUuZ2V0RnVsbFllYXIoKSAhPT0geWVhciB8fCBkYXRlLmdldE1vbnRoKCkgKyAxICE9PSBtb250aCB8fCBkYXRlLmdldERhdGUoKSAhPT0gZGF5KSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IFwiSW52YWxpZCBkYXRlXCI7IC8vIEUuZy4gMzEvMDIvMDBcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRhdGU7XG4gICAgfVxuXG4gICAgZGF5bGlnaHRTYXZpbmdBZGp1c3QoZGF0ZSkge1xuICAgICAgICBpZiAoIWRhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgZGF0ZS5zZXRIb3VycyhkYXRlLmdldEhvdXJzKCkgPiAxMiA/IGRhdGUuZ2V0SG91cnMoKSArIDIgOiAwKTtcblxuICAgICAgICByZXR1cm4gZGF0ZTtcbiAgICB9XG5cbiAgICB1cGRhdGVGaWxsZWRTdGF0ZSgpIHtcbiAgICAgICAgdGhpcy5maWxsZWQgPSB0aGlzLmlucHV0RmllbGRWYWx1ZSAmJiB0aGlzLmlucHV0RmllbGRWYWx1ZSAhPSAnJztcbiAgICB9XG5cbiAgICBvblRvZGF5QnV0dG9uQ2xpY2soZXZlbnQpIHtcbiAgICAgICAgbGV0IGRhdGU6IERhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICBsZXQgZGF0ZU1ldGEgPSB7ZGF5OiBkYXRlLmdldERhdGUoKSwgbW9udGg6IGRhdGUuZ2V0TW9udGgoKSwgeWVhcjogZGF0ZS5nZXRGdWxsWWVhcigpLCBvdGhlck1vbnRoOiBkYXRlLmdldE1vbnRoKCkgIT09IHRoaXMuY3VycmVudE1vbnRoIHx8IGRhdGUuZ2V0RnVsbFllYXIoKSAhPT0gdGhpcy5jdXJyZW50WWVhciwgdG9kYXk6IHRydWUsIHNlbGVjdGFibGU6IHRydWV9O1xuXG4gICAgICAgIHRoaXMub25EYXRlU2VsZWN0KGV2ZW50LCBkYXRlTWV0YSk7XG4gICAgICAgIHRoaXMub25Ub2RheUNsaWNrLmVtaXQoZXZlbnQpO1xuICAgIH1cblxuICAgIG9uQ2xlYXJCdXR0b25DbGljayhldmVudCkge1xuICAgICAgICB0aGlzLnVwZGF0ZU1vZGVsKG51bGwpO1xuICAgICAgICB0aGlzLnVwZGF0ZUlucHV0ZmllbGQoKTtcbiAgICAgICAgdGhpcy5oaWRlT3ZlcmxheSgpO1xuICAgICAgICB0aGlzLm9uQ2xlYXJDbGljay5lbWl0KGV2ZW50KTtcbiAgICB9XG5cbiAgICBiaW5kRG9jdW1lbnRDbGlja0xpc3RlbmVyKCkge1xuICAgICAgICBpZiAoIXRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRvY3VtZW50VGFyZ2V0OiBhbnkgPSB0aGlzLmVsID8gdGhpcy5lbC5uYXRpdmVFbGVtZW50Lm93bmVyRG9jdW1lbnQgOiAnZG9jdW1lbnQnO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbihkb2N1bWVudFRhcmdldCwgJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzT3V0c2lkZUNsaWNrZWQoZXZlbnQpICYmIHRoaXMub3ZlcmxheVZpc2libGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZU92ZXJsYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uQ2xpY2tPdXRzaWRlLmVtaXQoZXZlbnQpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdW5iaW5kRG9jdW1lbnRDbGlja0xpc3RlbmVyKCkge1xuICAgICAgICBpZiAodGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyKCk7XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBiaW5kRG9jdW1lbnRSZXNpemVMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIgJiYgIXRoaXMudG91Y2hVSSkge1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudFJlc2l6ZUxpc3RlbmVyID0gdGhpcy5vbldpbmRvd1Jlc2l6ZS5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuZG9jdW1lbnRSZXNpemVMaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1bmJpbmREb2N1bWVudFJlc2l6ZUxpc3RlbmVyKCkge1xuICAgICAgICBpZiAodGhpcy5kb2N1bWVudFJlc2l6ZUxpc3RlbmVyKSB7XG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5kb2N1bWVudFJlc2l6ZUxpc3RlbmVyKTtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRSZXNpemVMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBiaW5kU2Nyb2xsTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICghdGhpcy5zY3JvbGxIYW5kbGVyKSB7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbEhhbmRsZXIgPSBuZXcgQ29ubmVjdGVkT3ZlcmxheVNjcm9sbEhhbmRsZXIodGhpcy5jb250YWluZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm92ZXJsYXlWaXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZU92ZXJsYXkoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2Nyb2xsSGFuZGxlci5iaW5kU2Nyb2xsTGlzdGVuZXIoKTtcbiAgICB9XG5cbiAgICB1bmJpbmRTY3JvbGxMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKHRoaXMuc2Nyb2xsSGFuZGxlcikge1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxIYW5kbGVyLnVuYmluZFNjcm9sbExpc3RlbmVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc091dHNpZGVDbGlja2VkKGV2ZW50OiBFdmVudCkge1xuICAgICAgICByZXR1cm4gISh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuaXNTYW1lTm9kZShldmVudC50YXJnZXQpIHx8IHRoaXMuaXNOYXZJY29uQ2xpY2tlZChldmVudCkgfHzCoFxuICAgICAgICAgICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5jb250YWlucyhldmVudC50YXJnZXQpIHx8ICh0aGlzLm92ZXJsYXkgJiYgdGhpcy5vdmVybGF5LmNvbnRhaW5zKDxOb2RlPiBldmVudC50YXJnZXQpKSk7XG4gICAgfVxuXG4gICAgaXNOYXZJY29uQ2xpY2tlZChldmVudDogRXZlbnQpIHtcbiAgICAgICAgcmV0dXJuIChEb21IYW5kbGVyLmhhc0NsYXNzKGV2ZW50LnRhcmdldCwgJ3AtZGF0ZXBpY2tlci1wcmV2JykgfHwgRG9tSGFuZGxlci5oYXNDbGFzcyhldmVudC50YXJnZXQsICdwLWRhdGVwaWNrZXItcHJldi1pY29uJylcbiAgICAgICAgICAgICAgICB8fCBEb21IYW5kbGVyLmhhc0NsYXNzKGV2ZW50LnRhcmdldCwgJ3AtZGF0ZXBpY2tlci1uZXh0JykgfHwgRG9tSGFuZGxlci5oYXNDbGFzcyhldmVudC50YXJnZXQsICdwLWRhdGVwaWNrZXItbmV4dC1pY29uJykpO1xuICAgIH1cblxuICAgIG9uV2luZG93UmVzaXplKCkge1xuICAgICAgICBpZiAodGhpcy5vdmVybGF5VmlzaWJsZSAmJiAhRG9tSGFuZGxlci5pc0FuZHJvaWQoKSkge1xuICAgICAgICAgICAgdGhpcy5oaWRlT3ZlcmxheSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25PdmVybGF5SGlkZSgpIHtcbiAgICAgICAgdGhpcy51bmJpbmREb2N1bWVudENsaWNrTGlzdGVuZXIoKTtcbiAgICAgICAgdGhpcy51bmJpbmRNYXNrQ2xpY2tMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLnVuYmluZERvY3VtZW50UmVzaXplTGlzdGVuZXIoKTtcbiAgICAgICAgdGhpcy51bmJpbmRTY3JvbGxMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLm92ZXJsYXkgPSBudWxsO1xuICAgICAgICB0aGlzLmRpc2FibGVNb2RhbGl0eSgpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy5zY3JvbGxIYW5kbGVyKSB7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbEhhbmRsZXIuZGVzdHJveSgpO1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxIYW5kbGVyID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnRyYW5zbGF0aW9uU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnRyYW5zbGF0aW9uU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5vdmVybGF5ICYmIHRoaXMuYXV0b1pJbmRleCkge1xuICAgICAgICAgICAgWkluZGV4VXRpbHMuY2xlYXIodGhpcy5vdmVybGF5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2xlYXJUaW1lUGlja2VyVGltZXIoKTtcbiAgICAgICAgdGhpcy5yZXN0b3JlT3ZlcmxheUFwcGVuZCgpO1xuICAgICAgICB0aGlzLm9uT3ZlcmxheUhpZGUoKTtcbiAgICB9XG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSxCdXR0b25Nb2R1bGUsU2hhcmVkTW9kdWxlLFJpcHBsZU1vZHVsZV0sXG4gICAgZXhwb3J0czogW0NhbGVuZGFyLEJ1dHRvbk1vZHVsZSxTaGFyZWRNb2R1bGVdLFxuICAgIGRlY2xhcmF0aW9uczogW0NhbGVuZGFyXVxufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhck1vZHVsZSB7IH1cbiJdfQ==