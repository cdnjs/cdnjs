import { NgModule, Component, ElementRef, Input, Output, EventEmitter, forwardRef, Renderer2, ViewChild, ChangeDetectorRef, ContentChildren, NgZone, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { DomHandler, ConnectedOverlayScrollHandler } from 'primeng/dom';
import { SharedModule, PrimeTemplate, PrimeNGConfig, TranslationKeys } from 'primeng/api';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export const CALENDAR_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Calendar),
    multi: true
};
export class Calendar {
    constructor(el, renderer, cd, zone, config) {
        this.el = el;
        this.renderer = renderer;
        this.cd = cd;
        this.zone = zone;
        this.config = config;
        this.dateFormat = 'mm/dd/yy';
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
        if (this.overlay && this.autoZIndex) {
            this.overlay.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
        }
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
    onTimePickerElementMouseOut(event) {
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
                        this.overlay.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
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
        return this.dateFormat;
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
        this.clearTimePickerTimer();
        this.restoreOverlayAppend();
        this.onOverlayHide();
    }
}
Calendar.decorators = [
    { type: Component, args: [{
                selector: 'p-calendar',
                template: `
        <span #container [ngClass]="{'p-calendar':true, 'p-calendar-w-btn': showIcon, 'p-calendar-timeonly': timeOnly, 'p-focus': focus}" [ngStyle]="style" [class]="styleClass">
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
                                            [@.disabled]="inline === true" (@overlayAnimation.start)="onOverlayAnimationStart($event)" (@overlayAnimation.done)="onOverlayAnimationDone($event)" *ngIf="inline || overlayVisible">
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
                                                <span>
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
                        <button class="p-link" type="button" (keydown)="onContainerButtonKeydown($event)" (keydown.enter)="incrementHour($event)" (mousedown)="onTimePickerElementMouseDown($event, 0, 1)" (mouseup)="onTimePickerElementMouseUp($event)" (mouseout)="onTimePickerElementMouseOut($event)" pRipple>
                            <span class="pi pi-chevron-up"></span>
                        </button>
                        <span><ng-container *ngIf="currentHour < 10">0</ng-container>{{currentHour}}</span>
                        <button class="p-link" type="button" (keydown)="onContainerButtonKeydown($event)" (keydown.enter)="decrementHour($event)" (mousedown)="onTimePickerElementMouseDown($event, 0, -1)" (mouseup)="onTimePickerElementMouseUp($event)" (mouseout)="onTimePickerElementMouseOut($event)" pRipple>
                            <span class="pi pi-chevron-down"></span>
                        </button>
                    </div>
                    <div class="p-separator">
                        <span>{{timeSeparator}}</span>
                    </div>
                    <div class="p-minute-picker">
                        <button class="p-link" type="button" (keydown)="onContainerButtonKeydown($event)" (keydown.enter)="incrementMinute($event)" (mousedown)="onTimePickerElementMouseDown($event, 1, 1)" (mouseup)="onTimePickerElementMouseUp($event)" (mouseout)="onTimePickerElementMouseOut($event)" pRipple>
                            <span class="pi pi-chevron-up"></span>
                        </button>
                        <span><ng-container *ngIf="currentMinute < 10">0</ng-container>{{currentMinute}}</span>
                        <button class="p-link" type="button" (keydown)="onContainerButtonKeydown($event)" (keydown.enter)="decrementMinute($event)" (mousedown)="onTimePickerElementMouseDown($event, 1, -1)" (mouseup)="onTimePickerElementMouseUp($event)" (mouseout)="onTimePickerElementMouseOut($event)" pRipple>
                            <span class="pi pi-chevron-down"></span>
                        </button>
                    </div>
                    <div class="p-separator" *ngIf="showSeconds">
                        <span>{{timeSeparator}}</span>
                    </div>
                    <div class="p-second-picker" *ngIf="showSeconds">
                        <button class="p-link" type="button" (keydown)="onContainerButtonKeydown($event)" (keydown.enter)="incrementSecond($event)" (mousedown)="onTimePickerElementMouseDown($event, 2, 1)" (mouseup)="onTimePickerElementMouseUp($event)" (mouseout)="onTimePickerElementMouseOut($event)" pRipple>
                            <span class="pi pi-chevron-up"></span>
                        </button>
                        <span><ng-container *ngIf="currentSecond < 10">0</ng-container>{{currentSecond}}</span>
                        <button class="p-link" type="button" (keydown)="onContainerButtonKeydown($event)" (keydown.enter)="decrementSecond($event)" (mousedown)="onTimePickerElementMouseDown($event, 2, -1)" (mouseup)="onTimePickerElementMouseUp($event)" (mouseout)="onTimePickerElementMouseOut($event)" pRipple>
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
                styles: [".p-calendar{display:inline-flex;position:relative}.p-calendar .p-inputtext{flex:1 1 auto;width:1%}.p-calendar-w-btn .p-inputtext{border-bottom-right-radius:0;border-top-right-radius:0}.p-calendar-w-btn .p-datepicker-trigger{border-bottom-left-radius:0;border-top-left-radius:0}.p-fluid .p-calendar{display:flex}.p-fluid .p-calendar .p-inputtext{width:1%}.p-calendar .p-datepicker{min-width:100%}.p-datepicker{position:absolute;width:auto}.p-datepicker-inline{display:inline-flex;position:static}.p-datepicker-header{align-items:center;display:flex;justify-content:space-between}.p-datepicker-header .p-datepicker-title{margin:0 auto}.p-datepicker-next,.p-datepicker-prev{align-items:center;cursor:pointer;display:inline-flex;justify-content:center;overflow:hidden;position:relative}.p-datepicker-multiple-month .p-datepicker-group-container{display:flex}.p-datepicker table{border-collapse:collapse;width:100%}.p-datepicker td>span{display:flex;margin:0 auto}.p-datepicker td>span,.p-monthpicker-month{align-items:center;cursor:pointer;justify-content:center;overflow:hidden;position:relative}.p-monthpicker-month{display:inline-flex;width:33.3%}.p-datepicker-buttonbar{align-items:center;display:flex;justify-content:space-between}.p-timepicker,.p-timepicker button{align-items:center;display:flex;justify-content:center}.p-timepicker button{cursor:pointer;overflow:hidden;position:relative}.p-timepicker>div{align-items:center;display:flex;flex-direction:column}.p-calendar .p-datepicker-touch-ui,.p-datepicker-touch-ui{left:50%;min-width:80vw;position:fixed;top:50%;transform:translate(-50%,-50%)}"]
            },] }
];
Calendar.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: ChangeDetectorRef },
    { type: NgZone },
    { type: PrimeNGConfig }
];
Calendar.propDecorators = {
    style: [{ type: Input }],
    styleClass: [{ type: Input }],
    inputStyle: [{ type: Input }],
    inputId: [{ type: Input }],
    name: [{ type: Input }],
    inputStyleClass: [{ type: Input }],
    placeholder: [{ type: Input }],
    ariaLabelledBy: [{ type: Input }],
    disabled: [{ type: Input }],
    dateFormat: [{ type: Input }],
    multipleSeparator: [{ type: Input }],
    rangeSeparator: [{ type: Input }],
    inline: [{ type: Input }],
    showOtherMonths: [{ type: Input }],
    selectOtherMonths: [{ type: Input }],
    showIcon: [{ type: Input }],
    icon: [{ type: Input }],
    appendTo: [{ type: Input }],
    readonlyInput: [{ type: Input }],
    shortYearCutoff: [{ type: Input }],
    monthNavigator: [{ type: Input }],
    yearNavigator: [{ type: Input }],
    hourFormat: [{ type: Input }],
    timeOnly: [{ type: Input }],
    stepHour: [{ type: Input }],
    stepMinute: [{ type: Input }],
    stepSecond: [{ type: Input }],
    showSeconds: [{ type: Input }],
    required: [{ type: Input }],
    showOnFocus: [{ type: Input }],
    showWeek: [{ type: Input }],
    dataType: [{ type: Input }],
    selectionMode: [{ type: Input }],
    maxDateCount: [{ type: Input }],
    showButtonBar: [{ type: Input }],
    todayButtonStyleClass: [{ type: Input }],
    clearButtonStyleClass: [{ type: Input }],
    autoZIndex: [{ type: Input }],
    baseZIndex: [{ type: Input }],
    panelStyleClass: [{ type: Input }],
    panelStyle: [{ type: Input }],
    keepInvalid: [{ type: Input }],
    hideOnDateTimeSelect: [{ type: Input }],
    numberOfMonths: [{ type: Input }],
    view: [{ type: Input }],
    touchUI: [{ type: Input }],
    timeSeparator: [{ type: Input }],
    focusTrap: [{ type: Input }],
    firstDayOfWeek: [{ type: Input }],
    showTransitionOptions: [{ type: Input }],
    hideTransitionOptions: [{ type: Input }],
    onFocus: [{ type: Output }],
    onBlur: [{ type: Output }],
    onClose: [{ type: Output }],
    onSelect: [{ type: Output }],
    onInput: [{ type: Output }],
    onTodayClick: [{ type: Output }],
    onClearClick: [{ type: Output }],
    onMonthChange: [{ type: Output }],
    onYearChange: [{ type: Output }],
    onClickOutside: [{ type: Output }],
    onShow: [{ type: Output }],
    templates: [{ type: ContentChildren, args: [PrimeTemplate,] }],
    tabindex: [{ type: Input }],
    containerViewChild: [{ type: ViewChild, args: ['container', { static: false },] }],
    inputfieldViewChild: [{ type: ViewChild, args: ['inputfield', { static: false },] }],
    content: [{ type: ViewChild, args: ['contentWrapper', { static: false },] }],
    defaultDate: [{ type: Input }],
    minDate: [{ type: Input }],
    maxDate: [{ type: Input }],
    disabledDates: [{ type: Input }],
    disabledDays: [{ type: Input }],
    yearRange: [{ type: Input }],
    showTime: [{ type: Input }],
    locale: [{ type: Input }]
};
export class CalendarModule {
}
CalendarModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, ButtonModule, SharedModule, RippleModule],
                exports: [Calendar, ButtonModule, SharedModule],
                declarations: [Calendar]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vc3JjL2FwcC9jb21wb25lbnRzL2NhbGVuZGFyLyIsInNvdXJjZXMiOlsiY2FsZW5kYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFrQixLQUFLLEVBQUMsTUFBTSxFQUFDLFlBQVksRUFBQyxVQUFVLEVBQUMsU0FBUyxFQUM3RixTQUFTLEVBQUMsaUJBQWlCLEVBQWEsZUFBZSxFQUFXLE1BQU0sRUFBQyx1QkFBdUIsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNsSixPQUFPLEVBQUMsT0FBTyxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsVUFBVSxFQUFDLE9BQU8sRUFBZ0IsTUFBTSxxQkFBcUIsQ0FBQztBQUMxRixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzVDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1QyxPQUFPLEVBQUMsVUFBVSxFQUFFLDZCQUE2QixFQUFDLE1BQU0sYUFBYSxDQUFDO0FBQ3RFLE9BQU8sRUFBQyxZQUFZLEVBQUMsYUFBYSxFQUFDLGFBQWEsRUFBQyxlQUFlLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFDckYsT0FBTyxFQUFDLGlCQUFpQixFQUF1QixNQUFNLGdCQUFnQixDQUFDO0FBRXZFLE1BQU0sQ0FBQyxNQUFNLHVCQUF1QixHQUFRO0lBQ3hDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUM7SUFDdkMsS0FBSyxFQUFFLElBQUk7Q0FDZCxDQUFDO0FBc0xGLE1BQU0sT0FBTyxRQUFRO0lBMlZqQixZQUFtQixFQUFjLEVBQVMsUUFBbUIsRUFBUyxFQUFxQixFQUFV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QUVMLEtBQUs7NEJBRUwsS0FBSzsyQkFFTCxLQUFLOzRCQUVMLEtBQUs7b0NBRUwsS0FBSztvQ0FFTCxLQUFLO3lCQUVMLEtBQUs7eUJBRUwsS0FBSzs4QkFFTCxLQUFLO3lCQUVMLEtBQUs7MEJBRUwsS0FBSzttQ0FFTCxLQUFLOzZCQUVMLEtBQUs7bUJBRUwsS0FBSztzQkFFTCxLQUFLOzRCQUVMLEtBQUs7d0JBRUwsS0FBSzs2QkFFTCxLQUFLO29DQUVMLEtBQUs7b0NBRUwsS0FBSztzQkFFTCxNQUFNO3FCQUVOLE1BQU07c0JBRU4sTUFBTTt1QkFFTixNQUFNO3NCQUVOLE1BQU07MkJBRU4sTUFBTTsyQkFFTixNQUFNOzRCQUVOLE1BQU07MkJBRU4sTUFBTTs2QkFFTixNQUFNO3FCQUVOLE1BQU07d0JBRU4sZUFBZSxTQUFDLGFBQWE7dUJBRTdCLEtBQUs7aUNBRUwsU0FBUyxTQUFDLFdBQVcsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7a0NBRXhDLFNBQVMsU0FBQyxZQUFZLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO3NCQUV6QyxTQUFTLFNBQUMsZ0JBQWdCLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFOzBCQTRHN0MsS0FBSztzQkFtQkwsS0FBSztzQkFZTCxLQUFLOzRCQVlMLEtBQUs7MkJBWUwsS0FBSzt3QkFZTCxLQUFLO3VCQWdCTCxLQUFLO3FCQWlCTCxLQUFLOztBQXNnRVYsTUFBTSxPQUFPLGNBQWM7OztZQUwxQixRQUFRLFNBQUM7Z0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFDLFlBQVksRUFBQyxZQUFZLEVBQUMsWUFBWSxDQUFDO2dCQUM5RCxPQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUMsWUFBWSxFQUFDLFlBQVksQ0FBQztnQkFDN0MsWUFBWSxFQUFFLENBQUMsUUFBUSxDQUFDO2FBQzNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZSxDb21wb25lbnQsRWxlbWVudFJlZixPbkRlc3Ryb3ksT25Jbml0LElucHV0LE91dHB1dCxFdmVudEVtaXR0ZXIsZm9yd2FyZFJlZixSZW5kZXJlcjIsXG4gICAgICAgIFZpZXdDaGlsZCxDaGFuZ2VEZXRlY3RvclJlZixUZW1wbGF0ZVJlZixDb250ZW50Q2hpbGRyZW4sUXVlcnlMaXN0LE5nWm9uZSxDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHt0cmlnZ2VyLHN0YXRlLHN0eWxlLHRyYW5zaXRpb24sYW5pbWF0ZSxBbmltYXRpb25FdmVudH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7QnV0dG9uTW9kdWxlfSBmcm9tICdwcmltZW5nL2J1dHRvbic7XG5pbXBvcnQge1JpcHBsZU1vZHVsZX0gZnJvbSAncHJpbWVuZy9yaXBwbGUnO1xuaW1wb3J0IHtEb21IYW5kbGVyLCBDb25uZWN0ZWRPdmVybGF5U2Nyb2xsSGFuZGxlcn0gZnJvbSAncHJpbWVuZy9kb20nO1xuaW1wb3J0IHtTaGFyZWRNb2R1bGUsUHJpbWVUZW1wbGF0ZSxQcmltZU5HQ29uZmlnLFRyYW5zbGF0aW9uS2V5c30gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHtOR19WQUxVRV9BQ0NFU1NPUiwgQ29udHJvbFZhbHVlQWNjZXNzb3J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuZXhwb3J0IGNvbnN0IENBTEVOREFSX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQ2FsZW5kYXIpLFxuICAgIG11bHRpOiB0cnVlXG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIExvY2FsZVNldHRpbmdzIHtcbiAgICBmaXJzdERheU9mV2Vlaz86IG51bWJlcjtcbiAgICBkYXlOYW1lcz86IHN0cmluZ1tdO1xuICAgIGRheU5hbWVzU2hvcnQ/OiBzdHJpbmdbXTtcbiAgICBkYXlOYW1lc01pbj86IHN0cmluZ1tdO1xuICAgIG1vbnRoTmFtZXM/OiBzdHJpbmdbXTtcbiAgICBtb250aE5hbWVzU2hvcnQ/OiBzdHJpbmdbXTtcbiAgICB0b2RheT86IHN0cmluZztcbiAgICBjbGVhcj86IHN0cmluZztcbiAgICBkYXRlRm9ybWF0Pzogc3RyaW5nO1xuICAgIHdlZWtIZWFkZXI/OiBzdHJpbmc7XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1jYWxlbmRhcicsXG4gICAgdGVtcGxhdGU6ICBgXG4gICAgICAgIDxzcGFuICNjb250YWluZXIgW25nQ2xhc3NdPVwieydwLWNhbGVuZGFyJzp0cnVlLCAncC1jYWxlbmRhci13LWJ0bic6IHNob3dJY29uLCAncC1jYWxlbmRhci10aW1lb25seSc6IHRpbWVPbmx5LCAncC1mb2N1cyc6IGZvY3VzfVwiIFtuZ1N0eWxlXT1cInN0eWxlXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIj5cbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdJZl09XCIhaW5saW5lXCI+XG4gICAgICAgICAgICAgICAgPGlucHV0ICNpbnB1dGZpZWxkIHR5cGU9XCJ0ZXh0XCIgW2F0dHIuaWRdPVwiaW5wdXRJZFwiIFthdHRyLm5hbWVdPVwibmFtZVwiIFthdHRyLnJlcXVpcmVkXT1cInJlcXVpcmVkXCIgW2F0dHIuYXJpYS1yZXF1aXJlZF09XCJyZXF1aXJlZFwiIFt2YWx1ZV09XCJpbnB1dEZpZWxkVmFsdWVcIiAoZm9jdXMpPVwib25JbnB1dEZvY3VzKCRldmVudClcIiAoa2V5ZG93bik9XCJvbklucHV0S2V5ZG93bigkZXZlbnQpXCIgKGNsaWNrKT1cIm9uSW5wdXRDbGljaygpXCIgKGJsdXIpPVwib25JbnB1dEJsdXIoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgIFtyZWFkb25seV09XCJyZWFkb25seUlucHV0XCIgKGlucHV0KT1cIm9uVXNlcklucHV0KCRldmVudClcIiBbbmdTdHlsZV09XCJpbnB1dFN0eWxlXCIgW2NsYXNzXT1cImlucHV0U3R5bGVDbGFzc1wiIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlcnx8JydcIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIiBbYXR0ci50YWJpbmRleF09XCJ0YWJpbmRleFwiIFthdHRyLmlucHV0bW9kZV09XCJ0b3VjaFVJID8gJ29mZicgOiBudWxsXCJcbiAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwiJ3AtaW5wdXR0ZXh0IHAtY29tcG9uZW50J1wiIGF1dG9jb21wbGV0ZT1cIm9mZlwiIFthdHRyLmFyaWEtbGFiZWxsZWRieV09XCJhcmlhTGFiZWxsZWRCeVwiXG4gICAgICAgICAgICAgICAgICAgID48YnV0dG9uIHR5cGU9XCJidXR0b25cIiBbaWNvbl09XCJpY29uXCIgcEJ1dHRvbiBwUmlwcGxlICpuZ0lmPVwic2hvd0ljb25cIiAoY2xpY2spPVwib25CdXR0b25DbGljaygkZXZlbnQsaW5wdXRmaWVsZClcIiBjbGFzcz1cInAtZGF0ZXBpY2tlci10cmlnZ2VyXCJcbiAgICAgICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCIgdGFiaW5kZXg9XCIwXCI+PC9idXR0b24+XG4gICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgPGRpdiAjY29udGVudFdyYXBwZXIgW2NsYXNzXT1cInBhbmVsU3R5bGVDbGFzc1wiIFtuZ1N0eWxlXT1cInBhbmVsU3R5bGVcIiBbbmdDbGFzc109XCJ7J3AtZGF0ZXBpY2tlciBwLWNvbXBvbmVudCc6IHRydWUsICdwLWRhdGVwaWNrZXItaW5saW5lJzppbmxpbmUsXG4gICAgICAgICAgICAgICAgJ3AtZGlzYWJsZWQnOmRpc2FibGVkLCdwLWRhdGVwaWNrZXItdGltZW9ubHknOnRpbWVPbmx5LCdwLWRhdGVwaWNrZXItbXVsdGlwbGUtbW9udGgnOiB0aGlzLm51bWJlck9mTW9udGhzID4gMSwgJ3AtZGF0ZXBpY2tlci1tb250aHBpY2tlcic6ICh2aWV3ID09PSAnbW9udGgnKSwgJ3AtZGF0ZXBpY2tlci10b3VjaC11aSc6IHRvdWNoVUl9XCJcbiAgICAgICAgICAgICAgICBbQG92ZXJsYXlBbmltYXRpb25dPVwidG91Y2hVSSA/IHt2YWx1ZTogJ3Zpc2libGVUb3VjaFVJJywgcGFyYW1zOiB7c2hvd1RyYW5zaXRpb25QYXJhbXM6IHNob3dUcmFuc2l0aW9uT3B0aW9ucywgaGlkZVRyYW5zaXRpb25QYXJhbXM6IGhpZGVUcmFuc2l0aW9uT3B0aW9uc319OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dmFsdWU6ICd2aXNpYmxlJywgcGFyYW1zOiB7c2hvd1RyYW5zaXRpb25QYXJhbXM6IHNob3dUcmFuc2l0aW9uT3B0aW9ucywgaGlkZVRyYW5zaXRpb25QYXJhbXM6IGhpZGVUcmFuc2l0aW9uT3B0aW9uc319XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW0AuZGlzYWJsZWRdPVwiaW5saW5lID09PSB0cnVlXCIgKEBvdmVybGF5QW5pbWF0aW9uLnN0YXJ0KT1cIm9uT3ZlcmxheUFuaW1hdGlvblN0YXJ0KCRldmVudClcIiAoQG92ZXJsYXlBbmltYXRpb24uZG9uZSk9XCJvbk92ZXJsYXlBbmltYXRpb25Eb25lKCRldmVudClcIiAqbmdJZj1cImlubGluZSB8fCBvdmVybGF5VmlzaWJsZVwiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cInAtaGVhZGVyXCI+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJoZWFkZXJUZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhdGltZU9ubHlcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtZGF0ZXBpY2tlci1ncm91cC1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLWRhdGVwaWNrZXItZ3JvdXBcIiAqbmdGb3I9XCJsZXQgbW9udGggb2YgbW9udGhzOyBsZXQgaSA9IGluZGV4O1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLWRhdGVwaWNrZXItaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gKGtleWRvd24pPVwib25Db250YWluZXJCdXR0b25LZXlkb3duKCRldmVudClcIiBjbGFzcz1cInAtZGF0ZXBpY2tlci1wcmV2IHAtbGlua1wiIChjbGljayk9XCJvblByZXZCdXR0b25DbGljaygkZXZlbnQpXCIgKm5nSWY9XCJpID09PSAwXCIgdHlwZT1cImJ1dHRvblwiIHBSaXBwbGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtZGF0ZXBpY2tlci1wcmV2LWljb24gcGkgcGktY2hldnJvbi1sZWZ0XCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtZGF0ZXBpY2tlci10aXRsZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLWRhdGVwaWNrZXItbW9udGhcIiAqbmdJZj1cIiFtb250aE5hdmlnYXRvciAmJiAodmlldyAhPT0gJ21vbnRoJylcIj57e2dldFRyYW5zbGF0aW9uKCdtb250aE5hbWVzJylbbW9udGgubW9udGhdfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c2VsZWN0IHRhYmluZGV4PVwiMFwiIGNsYXNzPVwicC1kYXRlcGlja2VyLW1vbnRoXCIgKm5nSWY9XCJtb250aE5hdmlnYXRvciAmJiAodmlldyAhPT0gJ21vbnRoJykgJiYgbnVtYmVyT2ZNb250aHMgPT09IDFcIiAoY2hhbmdlKT1cIm9uTW9udGhEcm9wZG93bkNoYW5nZSgkZXZlbnQudGFyZ2V0LnZhbHVlKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gW3ZhbHVlXT1cImlcIiAqbmdGb3I9XCJsZXQgbW9udGhOYW1lIG9mIGdldFRyYW5zbGF0aW9uKCdtb250aE5hbWVzJyk7bGV0IGkgPSBpbmRleFwiIFtzZWxlY3RlZF09XCJpID09PSBtb250aC5tb250aFwiPnt7bW9udGhOYW1lfX08L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCB0YWJpbmRleD1cIjBcIiBjbGFzcz1cInAtZGF0ZXBpY2tlci15ZWFyXCIgKm5nSWY9XCJ5ZWFyTmF2aWdhdG9yICYmIG51bWJlck9mTW9udGhzID09PSAxXCIgKGNoYW5nZSk9XCJvblllYXJEcm9wZG93bkNoYW5nZSgkZXZlbnQudGFyZ2V0LnZhbHVlKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gW3ZhbHVlXT1cInllYXJcIiAqbmdGb3I9XCJsZXQgeWVhciBvZiB5ZWFyT3B0aW9uc1wiIFtzZWxlY3RlZF09XCJ5ZWFyID09PSBjdXJyZW50WWVhclwiPnt7eWVhcn19PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC1kYXRlcGlja2VyLXllYXJcIiAqbmdJZj1cIiF5ZWFyTmF2aWdhdG9yXCI+e3t2aWV3ID09PSAnbW9udGgnID8gY3VycmVudFllYXIgOiBtb250aC55ZWFyfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIChrZXlkb3duKT1cIm9uQ29udGFpbmVyQnV0dG9uS2V5ZG93bigkZXZlbnQpXCIgY2xhc3M9XCJwLWRhdGVwaWNrZXItbmV4dCBwLWxpbmtcIiAoY2xpY2spPVwib25OZXh0QnV0dG9uQ2xpY2soJGV2ZW50KVwiICpuZ0lmPVwibnVtYmVyT2ZNb250aHMgPT09IDEgPyB0cnVlIDogKGkgPT09IG51bWJlck9mTW9udGhzIC0xKVwiIHR5cGU9XCJidXR0b25cIiBwUmlwcGxlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLWRhdGVwaWNrZXItbmV4dC1pY29uIHBpIHBpLWNoZXZyb24tcmlnaHRcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLWRhdGVwaWNrZXItY2FsZW5kYXItY29udGFpbmVyXCIgKm5nSWY9XCJ2aWV3ID09PSdkYXRlJ1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGFibGUgY2xhc3M9XCJwLWRhdGVwaWNrZXItY2FsZW5kYXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCAqbmdJZj1cInNob3dXZWVrXCIgY2xhc3M9XCJwLWRhdGVwaWNrZXItd2Vla2hlYWRlciBwLWRpc2FibGVkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57e2dldFRyYW5zbGF0aW9uKCd3ZWVrSGVhZGVyJyl9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIHNjb3BlPVwiY29sXCIgKm5nRm9yPVwibGV0IHdlZWtEYXkgb2Ygd2Vla0RheXM7bGV0IGJlZ2luID0gZmlyc3Q7IGxldCBlbmQgPSBsYXN0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57e3dlZWtEYXl9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHIgKm5nRm9yPVwibGV0IHdlZWsgb2YgbW9udGguZGF0ZXM7IGxldCBqID0gaW5kZXg7XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCAqbmdJZj1cInNob3dXZWVrXCIgY2xhc3M9XCJwLWRhdGVwaWNrZXItd2Vla251bWJlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3ttb250aC53ZWVrTnVtYmVyc1tqXX19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCAqbmdGb3I9XCJsZXQgZGF0ZSBvZiB3ZWVrXCIgW25nQ2xhc3NdPVwieydwLWRhdGVwaWNrZXItb3RoZXItbW9udGgnOiBkYXRlLm90aGVyTW9udGgsJ3AtZGF0ZXBpY2tlci10b2RheSc6ZGF0ZS50b2RheX1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJkYXRlLm90aGVyTW9udGggPyBzaG93T3RoZXJNb250aHMgOiB0cnVlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gW25nQ2xhc3NdPVwieydwLWhpZ2hsaWdodCc6aXNTZWxlY3RlZChkYXRlKSwgJ3AtZGlzYWJsZWQnOiAhZGF0ZS5zZWxlY3RhYmxlfVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJvbkRhdGVTZWxlY3QoJGV2ZW50LGRhdGUpXCIgZHJhZ2dhYmxlPVwiZmFsc2VcIiAoa2V5ZG93bik9XCJvbkRhdGVDZWxsS2V5ZG93bigkZXZlbnQsZGF0ZSxpKVwiIHBSaXBwbGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhZGF0ZVRlbXBsYXRlXCI+e3tkYXRlLmRheX19PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJkYXRlVGVtcGxhdGU7IGNvbnRleHQ6IHskaW1wbGljaXQ6IGRhdGV9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLW1vbnRocGlja2VyXCIgKm5nSWY9XCJ2aWV3ID09PSAnbW9udGgnXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdGb3I9XCJsZXQgbSBvZiBtb250aFBpY2tlclZhbHVlczsgbGV0IGkgPSBpbmRleFwiIChjbGljayk9XCJvbk1vbnRoU2VsZWN0KCRldmVudCwgaSlcIiAoa2V5ZG93bik9XCJvbk1vbnRoQ2VsbEtleWRvd24oJGV2ZW50LGkpXCIgY2xhc3M9XCJwLW1vbnRocGlja2VyLW1vbnRoXCIgW25nQ2xhc3NdPVwieydwLWhpZ2hsaWdodCc6IGlzTW9udGhTZWxlY3RlZChpKSwgJ3AtZGlzYWJsZWQnOiFpc1NlbGVjdGFibGUoMSwgaSwgdGhpcy5jdXJyZW50WWVhciwgZmFsc2UpfVwiIHBSaXBwbGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3ttfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtdGltZXBpY2tlclwiICpuZ0lmPVwic2hvd1RpbWV8fHRpbWVPbmx5XCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLWhvdXItcGlja2VyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwicC1saW5rXCIgdHlwZT1cImJ1dHRvblwiIChrZXlkb3duKT1cIm9uQ29udGFpbmVyQnV0dG9uS2V5ZG93bigkZXZlbnQpXCIgKGtleWRvd24uZW50ZXIpPVwiaW5jcmVtZW50SG91cigkZXZlbnQpXCIgKG1vdXNlZG93bik9XCJvblRpbWVQaWNrZXJFbGVtZW50TW91c2VEb3duKCRldmVudCwgMCwgMSlcIiAobW91c2V1cCk9XCJvblRpbWVQaWNrZXJFbGVtZW50TW91c2VVcCgkZXZlbnQpXCIgKG1vdXNlb3V0KT1cIm9uVGltZVBpY2tlckVsZW1lbnRNb3VzZU91dCgkZXZlbnQpXCIgcFJpcHBsZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInBpIHBpLWNoZXZyb24tdXBcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPjxuZy1jb250YWluZXIgKm5nSWY9XCJjdXJyZW50SG91ciA8IDEwXCI+MDwvbmctY29udGFpbmVyPnt7Y3VycmVudEhvdXJ9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJwLWxpbmtcIiB0eXBlPVwiYnV0dG9uXCIgKGtleWRvd24pPVwib25Db250YWluZXJCdXR0b25LZXlkb3duKCRldmVudClcIiAoa2V5ZG93bi5lbnRlcik9XCJkZWNyZW1lbnRIb3VyKCRldmVudClcIiAobW91c2Vkb3duKT1cIm9uVGltZVBpY2tlckVsZW1lbnRNb3VzZURvd24oJGV2ZW50LCAwLCAtMSlcIiAobW91c2V1cCk9XCJvblRpbWVQaWNrZXJFbGVtZW50TW91c2VVcCgkZXZlbnQpXCIgKG1vdXNlb3V0KT1cIm9uVGltZVBpY2tlckVsZW1lbnRNb3VzZU91dCgkZXZlbnQpXCIgcFJpcHBsZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInBpIHBpLWNoZXZyb24tZG93blwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtc2VwYXJhdG9yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57e3RpbWVTZXBhcmF0b3J9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLW1pbnV0ZS1waWNrZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJwLWxpbmtcIiB0eXBlPVwiYnV0dG9uXCIgKGtleWRvd24pPVwib25Db250YWluZXJCdXR0b25LZXlkb3duKCRldmVudClcIiAoa2V5ZG93bi5lbnRlcik9XCJpbmNyZW1lbnRNaW51dGUoJGV2ZW50KVwiIChtb3VzZWRvd24pPVwib25UaW1lUGlja2VyRWxlbWVudE1vdXNlRG93bigkZXZlbnQsIDEsIDEpXCIgKG1vdXNldXApPVwib25UaW1lUGlja2VyRWxlbWVudE1vdXNlVXAoJGV2ZW50KVwiIChtb3VzZW91dCk9XCJvblRpbWVQaWNrZXJFbGVtZW50TW91c2VPdXQoJGV2ZW50KVwiIHBSaXBwbGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwaSBwaS1jaGV2cm9uLXVwXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj48bmctY29udGFpbmVyICpuZ0lmPVwiY3VycmVudE1pbnV0ZSA8IDEwXCI+MDwvbmctY29udGFpbmVyPnt7Y3VycmVudE1pbnV0ZX19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInAtbGlua1wiIHR5cGU9XCJidXR0b25cIiAoa2V5ZG93bik9XCJvbkNvbnRhaW5lckJ1dHRvbktleWRvd24oJGV2ZW50KVwiIChrZXlkb3duLmVudGVyKT1cImRlY3JlbWVudE1pbnV0ZSgkZXZlbnQpXCIgKG1vdXNlZG93bik9XCJvblRpbWVQaWNrZXJFbGVtZW50TW91c2VEb3duKCRldmVudCwgMSwgLTEpXCIgKG1vdXNldXApPVwib25UaW1lUGlja2VyRWxlbWVudE1vdXNlVXAoJGV2ZW50KVwiIChtb3VzZW91dCk9XCJvblRpbWVQaWNrZXJFbGVtZW50TW91c2VPdXQoJGV2ZW50KVwiIHBSaXBwbGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwaSBwaS1jaGV2cm9uLWRvd25cIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLXNlcGFyYXRvclwiICpuZ0lmPVwic2hvd1NlY29uZHNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPnt7dGltZVNlcGFyYXRvcn19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtc2Vjb25kLXBpY2tlclwiICpuZ0lmPVwic2hvd1NlY29uZHNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJwLWxpbmtcIiB0eXBlPVwiYnV0dG9uXCIgKGtleWRvd24pPVwib25Db250YWluZXJCdXR0b25LZXlkb3duKCRldmVudClcIiAoa2V5ZG93bi5lbnRlcik9XCJpbmNyZW1lbnRTZWNvbmQoJGV2ZW50KVwiIChtb3VzZWRvd24pPVwib25UaW1lUGlja2VyRWxlbWVudE1vdXNlRG93bigkZXZlbnQsIDIsIDEpXCIgKG1vdXNldXApPVwib25UaW1lUGlja2VyRWxlbWVudE1vdXNlVXAoJGV2ZW50KVwiIChtb3VzZW91dCk9XCJvblRpbWVQaWNrZXJFbGVtZW50TW91c2VPdXQoJGV2ZW50KVwiIHBSaXBwbGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwaSBwaS1jaGV2cm9uLXVwXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj48bmctY29udGFpbmVyICpuZ0lmPVwiY3VycmVudFNlY29uZCA8IDEwXCI+MDwvbmctY29udGFpbmVyPnt7Y3VycmVudFNlY29uZH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInAtbGlua1wiIHR5cGU9XCJidXR0b25cIiAoa2V5ZG93bik9XCJvbkNvbnRhaW5lckJ1dHRvbktleWRvd24oJGV2ZW50KVwiIChrZXlkb3duLmVudGVyKT1cImRlY3JlbWVudFNlY29uZCgkZXZlbnQpXCIgKG1vdXNlZG93bik9XCJvblRpbWVQaWNrZXJFbGVtZW50TW91c2VEb3duKCRldmVudCwgMiwgLTEpXCIgKG1vdXNldXApPVwib25UaW1lUGlja2VyRWxlbWVudE1vdXNlVXAoJGV2ZW50KVwiIChtb3VzZW91dCk9XCJvblRpbWVQaWNrZXJFbGVtZW50TW91c2VPdXQoJGV2ZW50KVwiIHBSaXBwbGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwaSBwaS1jaGV2cm9uLWRvd25cIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLWFtcG0tcGlja2VyXCIgKm5nSWY9XCJob3VyRm9ybWF0PT0nMTInXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwicC1saW5rXCIgdHlwZT1cImJ1dHRvblwiIChrZXlkb3duKT1cIm9uQ29udGFpbmVyQnV0dG9uS2V5ZG93bigkZXZlbnQpXCIgKGNsaWNrKT1cInRvZ2dsZUFNUE0oJGV2ZW50KVwiIChrZXlkb3duLmVudGVyKT1cInRvZ2dsZUFNUE0oJGV2ZW50KVwiIHBSaXBwbGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwaSBwaS1jaGV2cm9uLXVwXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57e3BtID8gJ1BNJyA6ICdBTSd9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJwLWxpbmtcIiB0eXBlPVwiYnV0dG9uXCIgKGtleWRvd24pPVwib25Db250YWluZXJCdXR0b25LZXlkb3duKCRldmVudClcIiAoY2xpY2spPVwidG9nZ2xlQU1QTSgkZXZlbnQpXCIgKGtleWRvd24uZW50ZXIpPVwidG9nZ2xlQU1QTSgkZXZlbnQpXCIgcFJpcHBsZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInBpIHBpLWNoZXZyb24tZG93blwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1kYXRlcGlja2VyLWJ1dHRvbmJhclwiICpuZ0lmPVwic2hvd0J1dHRvbkJhclwiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBbbGFiZWxdPVwiZ2V0VHJhbnNsYXRpb24oJ3RvZGF5JylcIiAoa2V5ZG93bik9XCJvbkNvbnRhaW5lckJ1dHRvbktleWRvd24oJGV2ZW50KVwiIChjbGljayk9XCJvblRvZGF5QnV0dG9uQ2xpY2soJGV2ZW50KVwiIHBCdXR0b24gcFJpcHBsZSBbbmdDbGFzc109XCJbdG9kYXlCdXR0b25TdHlsZUNsYXNzXVwiPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBbbGFiZWxdPVwiZ2V0VHJhbnNsYXRpb24oJ2NsZWFyJylcIiAoa2V5ZG93bik9XCJvbkNvbnRhaW5lckJ1dHRvbktleWRvd24oJGV2ZW50KVwiIChjbGljayk9XCJvbkNsZWFyQnV0dG9uQ2xpY2soJGV2ZW50KVwiIHBCdXR0b24gcFJpcHBsZSBbbmdDbGFzc109XCJbY2xlYXJCdXR0b25TdHlsZUNsYXNzXVwiPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cInAtZm9vdGVyXCI+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJmb290ZXJUZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvc3Bhbj5cbiAgICBgLFxuICAgIGFuaW1hdGlvbnM6IFtcbiAgICAgICAgdHJpZ2dlcignb3ZlcmxheUFuaW1hdGlvbicsIFtcbiAgICAgICAgICAgIHN0YXRlKCd2aXNpYmxlVG91Y2hVSScsIHN0eWxlKHtcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGUoLTUwJSwtNTAlKScsXG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMVxuICAgICAgICAgICAgfSkpLFxuICAgICAgICAgICAgdHJhbnNpdGlvbigndm9pZCA9PiB2aXNpYmxlJywgW1xuICAgICAgICAgICAgICAgIHN0eWxlKHtvcGFjaXR5OiAwLCB0cmFuc2Zvcm06ICdzY2FsZVkoMC44KSd9KSxcbiAgICAgICAgICAgICAgICBhbmltYXRlKCd7e3Nob3dUcmFuc2l0aW9uUGFyYW1zfX0nLCBzdHlsZSh7IG9wYWNpdHk6IDEsIHRyYW5zZm9ybTogJyonIH0pKVxuICAgICAgICAgICAgXSksXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCd2aXNpYmxlID0+IHZvaWQnLCBbXG4gICAgICAgICAgICAgICAgYW5pbWF0ZSgne3toaWRlVHJhbnNpdGlvblBhcmFtc319Jywgc3R5bGUoeyBvcGFjaXR5OiAwIH0pKVxuICAgICAgICAgICAgXSksXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCd2b2lkID0+IHZpc2libGVUb3VjaFVJJywgW1xuICAgICAgICAgICAgICAgIHN0eWxlKHtvcGFjaXR5OiAwLCB0cmFuc2Zvcm06ICd0cmFuc2xhdGUzZCgtNTAlLCAtNDAlLCAwKSBzY2FsZSgwLjkpJ30pLFxuICAgICAgICAgICAgICAgIGFuaW1hdGUoJ3t7c2hvd1RyYW5zaXRpb25QYXJhbXN9fScpXG4gICAgICAgICAgICBdKSxcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJ3Zpc2libGVUb3VjaFVJID0+IHZvaWQnLCBbXG4gICAgICAgICAgICAgICAgYW5pbWF0ZSgoJ3t7aGlkZVRyYW5zaXRpb25QYXJhbXN9fScpLFxuICAgICAgICAgICAgICAgIHN0eWxlKHtcbiAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMCxcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlM2QoLTUwJSwgLTQwJSwgMCkgc2NhbGUoMC45KSdcbiAgICAgICAgICAgICAgICB9KSlcbiAgICAgICAgICAgIF0pXG4gICAgICAgIF0pXG4gICAgXSxcbiAgICBob3N0OiB7XG4gICAgICAgICdbY2xhc3MucC1pbnB1dHdyYXBwZXItZmlsbGVkXSc6ICdmaWxsZWQnLFxuICAgICAgICAnW2NsYXNzLnAtaW5wdXR3cmFwcGVyLWZvY3VzXSc6ICdmb2N1cydcbiAgICB9LFxuICAgIHByb3ZpZGVyczogW0NBTEVOREFSX1ZBTFVFX0FDQ0VTU09SXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIHN0eWxlVXJsczogWycuL2NhbGVuZGFyLmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIENhbGVuZGFyIGltcGxlbWVudHMgT25Jbml0LE9uRGVzdHJveSxDb250cm9sVmFsdWVBY2Nlc3NvciB7XG5cbiAgICBASW5wdXQoKSBzdHlsZTogYW55O1xuXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgaW5wdXRTdHlsZTogYW55O1xuXG4gICAgQElucHV0KCkgaW5wdXRJZDogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgbmFtZTogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgaW5wdXRTdHlsZUNsYXNzOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBwbGFjZWhvbGRlcjogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgYXJpYUxhYmVsbGVkQnk6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGRpc2FibGVkOiBhbnk7XG5cbiAgICBASW5wdXQoKSBkYXRlRm9ybWF0OiBzdHJpbmcgPSAnbW0vZGQveXknO1xuXG4gICAgQElucHV0KCkgbXVsdGlwbGVTZXBhcmF0b3I6IHN0cmluZyA9ICcsJztcblxuICAgIEBJbnB1dCgpIHJhbmdlU2VwYXJhdG9yOiBzdHJpbmcgPSAnLSc7XG5cbiAgICBASW5wdXQoKSBpbmxpbmU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpIHNob3dPdGhlck1vbnRoczogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKSBzZWxlY3RPdGhlck1vbnRoczogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIHNob3dJY29uOiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgaWNvbjogc3RyaW5nID0gJ3BpIHBpLWNhbGVuZGFyJztcblxuICAgIEBJbnB1dCgpIGFwcGVuZFRvOiBhbnk7XG5cbiAgICBASW5wdXQoKSByZWFkb25seUlucHV0OiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgc2hvcnRZZWFyQ3V0b2ZmOiBhbnkgPSAnKzEwJztcblxuICAgIEBJbnB1dCgpIG1vbnRoTmF2aWdhdG9yOiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgeWVhck5hdmlnYXRvcjogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIGhvdXJGb3JtYXQ6IHN0cmluZyA9ICcyNCc7XG5cbiAgICBASW5wdXQoKSB0aW1lT25seTogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIHN0ZXBIb3VyOiBudW1iZXIgPSAxO1xuXG4gICAgQElucHV0KCkgc3RlcE1pbnV0ZTogbnVtYmVyID0gMTtcblxuICAgIEBJbnB1dCgpIHN0ZXBTZWNvbmQ6IG51bWJlciA9IDE7XG5cbiAgICBASW5wdXQoKSBzaG93U2Vjb25kczogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KCkgcmVxdWlyZWQ6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSBzaG93T25Gb2N1czogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKSBzaG93V2VlazogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KCkgZGF0YVR5cGU6IHN0cmluZyA9ICdkYXRlJztcblxuICAgIEBJbnB1dCgpIHNlbGVjdGlvbk1vZGU6IHN0cmluZyA9ICdzaW5nbGUnO1xuXG4gICAgQElucHV0KCkgbWF4RGF0ZUNvdW50OiBudW1iZXI7XG5cbiAgICBASW5wdXQoKSBzaG93QnV0dG9uQmFyOiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgdG9kYXlCdXR0b25TdHlsZUNsYXNzOiBzdHJpbmcgPSAncC1idXR0b24tdGV4dCc7XG5cbiAgICBASW5wdXQoKSBjbGVhckJ1dHRvblN0eWxlQ2xhc3M6IHN0cmluZyA9ICdwLWJ1dHRvbi10ZXh0JztcblxuICAgIEBJbnB1dCgpIGF1dG9aSW5kZXg6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkgYmFzZVpJbmRleDogbnVtYmVyID0gMDtcblxuICAgIEBJbnB1dCgpIHBhbmVsU3R5bGVDbGFzczogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgcGFuZWxTdHlsZTogYW55O1xuXG4gICAgQElucHV0KCkga2VlcEludmFsaWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpIGhpZGVPbkRhdGVUaW1lU2VsZWN0OiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpIG51bWJlck9mTW9udGhzOiBudW1iZXIgPSAxO1xuXG4gICAgQElucHV0KCkgdmlldzogc3RyaW5nID0gJ2RhdGUnO1xuXG4gICAgQElucHV0KCkgdG91Y2hVSTogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIHRpbWVTZXBhcmF0b3I6IHN0cmluZyA9IFwiOlwiO1xuXG4gICAgQElucHV0KCkgZm9jdXNUcmFwOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpIGZpcnN0RGF5T2ZXZWVrOiBudW1iZXIgPSAwO1xuXG4gICAgQElucHV0KCkgc2hvd1RyYW5zaXRpb25PcHRpb25zOiBzdHJpbmcgPSAnLjEycyBjdWJpYy1iZXppZXIoMCwgMCwgMC4yLCAxKSc7XG5cbiAgICBASW5wdXQoKSBoaWRlVHJhbnNpdGlvbk9wdGlvbnM6IHN0cmluZyA9ICcuMXMgbGluZWFyJztcblxuICAgIEBPdXRwdXQoKSBvbkZvY3VzOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBvbkJsdXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIG9uQ2xvc2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIG9uU2VsZWN0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBvbklucHV0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBvblRvZGF5Q2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIG9uQ2xlYXJDbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25Nb250aENoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25ZZWFyQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBvbkNsaWNrT3V0c2lkZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25TaG93OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBDb250ZW50Q2hpbGRyZW4oUHJpbWVUZW1wbGF0ZSkgdGVtcGxhdGVzOiBRdWVyeUxpc3Q8YW55PjtcblxuICAgIEBJbnB1dCgpIHRhYmluZGV4OiBudW1iZXI7XG5cbiAgICBAVmlld0NoaWxkKCdjb250YWluZXInLCB7IHN0YXRpYzogZmFsc2UgfSkgY29udGFpbmVyVmlld0NoaWxkOiBFbGVtZW50UmVmO1xuXG4gICAgQFZpZXdDaGlsZCgnaW5wdXRmaWVsZCcsIHsgc3RhdGljOiBmYWxzZSB9KSBpbnB1dGZpZWxkVmlld0NoaWxkOiBFbGVtZW50UmVmO1xuXG4gICAgQFZpZXdDaGlsZCgnY29udGVudFdyYXBwZXInLCB7IHN0YXRpYzogZmFsc2UgfSkgc2V0IGNvbnRlbnQgKGNvbnRlbnQ6IEVsZW1lbnRSZWYpIHtcbiAgICAgICAgdGhpcy5jb250ZW50Vmlld0NoaWxkID0gY29udGVudDtcblxuICAgICAgICBpZiAodGhpcy5jb250ZW50Vmlld0NoaWxkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc01vbnRoTmF2aWdhdGUpIHtcbiAgICAgICAgICAgICAgICBQcm9taXNlLnJlc29sdmUobnVsbCkudGhlbigoKSA9PiB0aGlzLnVwZGF0ZUZvY3VzKCkpO1xuICAgICAgICAgICAgICAgIHRoaXMuaXNNb250aE5hdmlnYXRlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmluaXRGb2N1c2FibGVDZWxsKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY29udGVudFZpZXdDaGlsZDogRWxlbWVudFJlZjtcblxuICAgIHZhbHVlOiBhbnk7XG5cbiAgICBkYXRlczogYW55W107XG5cbiAgICBtb250aHM6IGFueVtdO1xuXG4gICAgbW9udGhQaWNrZXJWYWx1ZXM6IGFueVtdO1xuXG4gICAgd2Vla0RheXM6IHN0cmluZ1tdO1xuXG4gICAgY3VycmVudE1vbnRoOiBudW1iZXI7XG5cbiAgICBjdXJyZW50WWVhcjogbnVtYmVyO1xuXG4gICAgY3VycmVudEhvdXI6IG51bWJlcjtcblxuICAgIGN1cnJlbnRNaW51dGU6IG51bWJlcjtcblxuICAgIGN1cnJlbnRTZWNvbmQ6IG51bWJlcjtcblxuICAgIHBtOiBib29sZWFuO1xuXG4gICAgbWFzazogSFRNTERpdkVsZW1lbnQ7XG5cbiAgICBtYXNrQ2xpY2tMaXN0ZW5lcjogRnVuY3Rpb247XG5cbiAgICBvdmVybGF5OiBIVE1MRGl2RWxlbWVudDtcblxuICAgIG92ZXJsYXlWaXNpYmxlOiBib29sZWFuO1xuXG4gICAgb25Nb2RlbENoYW5nZTogRnVuY3Rpb24gPSAoKSA9PiB7fTtcblxuICAgIG9uTW9kZWxUb3VjaGVkOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuXG4gICAgY2FsZW5kYXJFbGVtZW50OiBhbnk7XG5cbiAgICB0aW1lUGlja2VyVGltZXI6YW55O1xuXG4gICAgZG9jdW1lbnRDbGlja0xpc3RlbmVyOiBhbnk7XG5cbiAgICB0aWNrc1RvMTk3MDogbnVtYmVyO1xuXG4gICAgeWVhck9wdGlvbnM6IG51bWJlcltdO1xuXG4gICAgZm9jdXM6IGJvb2xlYW47XG5cbiAgICBpc0tleWRvd246IGJvb2xlYW47XG5cbiAgICBmaWxsZWQ6IGJvb2xlYW47XG5cbiAgICBpbnB1dEZpZWxkVmFsdWU6IHN0cmluZyA9IG51bGw7XG5cbiAgICBfbWluRGF0ZTogRGF0ZTtcblxuICAgIF9tYXhEYXRlOiBEYXRlO1xuXG4gICAgX3Nob3dUaW1lOiBib29sZWFuO1xuXG4gICAgX3llYXJSYW5nZTogc3RyaW5nO1xuXG4gICAgcHJldmVudERvY3VtZW50TGlzdGVuZXI6IGJvb2xlYW47XG5cbiAgICBkYXRlVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBoZWFkZXJUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIGZvb3RlclRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgZGlzYWJsZWREYXRlVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBfZGlzYWJsZWREYXRlczogQXJyYXk8RGF0ZT47XG5cbiAgICBfZGlzYWJsZWREYXlzOiBBcnJheTxudW1iZXI+O1xuXG4gICAgc2VsZWN0RWxlbWVudDogYW55O1xuXG4gICAgdG9kYXlFbGVtZW50OiBhbnk7XG5cbiAgICBmb2N1c0VsZW1lbnQ6IGFueTtcblxuICAgIHNjcm9sbEhhbmRsZXI6IGFueTtcblxuICAgIGRvY3VtZW50UmVzaXplTGlzdGVuZXI6IGFueTtcblxuICAgIG5hdmlnYXRpb25TdGF0ZTogYW55ID0gbnVsbDtcblxuICAgIGlzTW9udGhOYXZpZ2F0ZTogYm9vbGVhbjtcblxuICAgIGluaXRpYWxpemVkOiBib29sZWFuO1xuXG4gICAgX2xvY2FsZTogTG9jYWxlU2V0dGluZ3M7XG5cbiAgICBASW5wdXQoKSBnZXQgZGVmYXVsdERhdGUoKTogRGF0ZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kZWZhdWx0RGF0ZTtcbiAgICB9O1xuXG4gICAgc2V0IGRlZmF1bHREYXRlKGRlZmF1bHREYXRlOiBEYXRlKSB7XG4gICAgICAgIHRoaXMuX2RlZmF1bHREYXRlID0gZGVmYXVsdERhdGU7XG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy5pbml0aWFsaXplZCkge1xuICAgICAgICAgICAgY29uc3QgZGF0ZSA9IGRlZmF1bHREYXRlfHxuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50TW9udGggPSBkYXRlLmdldE1vbnRoKCk7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRZZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xuICAgICAgICAgICAgdGhpcy5pbml0VGltZShkYXRlKTtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlTW9udGhzKHRoaXMuY3VycmVudE1vbnRoLCB0aGlzLmN1cnJlbnRZZWFyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9kZWZhdWx0RGF0ZTogRGF0ZTtcblxuXG4gICAgQElucHV0KCkgZ2V0IG1pbkRhdGUoKTogRGF0ZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9taW5EYXRlO1xuICAgIH1cblxuICAgIHNldCBtaW5EYXRlKGRhdGU6IERhdGUpIHtcbiAgICAgICAgdGhpcy5fbWluRGF0ZSA9IGRhdGU7XG5cbiAgICAgICAgaWYgKHRoaXMuY3VycmVudE1vbnRoICE9IHVuZGVmaW5lZCAmJiB0aGlzLmN1cnJlbnRNb250aCAhPSBudWxsICYmIHRoaXMuY3VycmVudFllYXIpIHtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlTW9udGhzKHRoaXMuY3VycmVudE1vbnRoLCB0aGlzLmN1cnJlbnRZZWFyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBJbnB1dCgpIGdldCBtYXhEYXRlKCk6IERhdGUge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWF4RGF0ZTtcbiAgICB9XG5cbiAgICBzZXQgbWF4RGF0ZShkYXRlOiBEYXRlKSB7XG4gICAgICAgIHRoaXMuX21heERhdGUgPSBkYXRlO1xuXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRNb250aCAhPSB1bmRlZmluZWQgJiYgdGhpcy5jdXJyZW50TW9udGggIT0gbnVsbCAgJiYgdGhpcy5jdXJyZW50WWVhcikge1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVNb250aHModGhpcy5jdXJyZW50TW9udGgsIHRoaXMuY3VycmVudFllYXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQElucHV0KCkgZ2V0IGRpc2FibGVkRGF0ZXMoKTogRGF0ZVtdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkRGF0ZXM7XG4gICAgfVxuXG4gICAgc2V0IGRpc2FibGVkRGF0ZXMoZGlzYWJsZWREYXRlczogRGF0ZVtdKSB7XG4gICAgICAgIHRoaXMuX2Rpc2FibGVkRGF0ZXMgPSBkaXNhYmxlZERhdGVzO1xuICAgICAgICBpZiAodGhpcy5jdXJyZW50TW9udGggIT0gdW5kZWZpbmVkICYmIHRoaXMuY3VycmVudE1vbnRoICE9IG51bGwgICYmIHRoaXMuY3VycmVudFllYXIpIHtcblxuICAgICAgICAgICAgdGhpcy5jcmVhdGVNb250aHModGhpcy5jdXJyZW50TW9udGgsIHRoaXMuY3VycmVudFllYXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQElucHV0KCkgZ2V0IGRpc2FibGVkRGF5cygpOiBudW1iZXJbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZERheXM7XG4gICAgfVxuXG4gICAgc2V0IGRpc2FibGVkRGF5cyhkaXNhYmxlZERheXM6IG51bWJlcltdKSB7XG4gICAgICAgIHRoaXMuX2Rpc2FibGVkRGF5cyA9IGRpc2FibGVkRGF5cztcblxuICAgICAgICBpZiAodGhpcy5jdXJyZW50TW9udGggIT0gdW5kZWZpbmVkICYmIHRoaXMuY3VycmVudE1vbnRoICE9IG51bGwgICYmIHRoaXMuY3VycmVudFllYXIpIHtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlTW9udGhzKHRoaXMuY3VycmVudE1vbnRoLCB0aGlzLmN1cnJlbnRZZWFyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBJbnB1dCgpIGdldCB5ZWFyUmFuZ2UoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3llYXJSYW5nZTtcbiAgICB9XG5cbiAgICBzZXQgeWVhclJhbmdlKHllYXJSYW5nZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX3llYXJSYW5nZSA9IHllYXJSYW5nZTtcblxuICAgICAgICBpZiAoeWVhclJhbmdlKSB7XG4gICAgICAgICAgICBjb25zdCB5ZWFycyA9IHllYXJSYW5nZS5zcGxpdCgnOicpO1xuICAgICAgICAgICAgY29uc3QgeWVhclN0YXJ0ID0gcGFyc2VJbnQoeWVhcnNbMF0pO1xuICAgICAgICAgICAgY29uc3QgeWVhckVuZCA9IHBhcnNlSW50KHllYXJzWzFdKTtcblxuICAgICAgICAgICAgdGhpcy5wb3B1bGF0ZVllYXJPcHRpb25zKHllYXJTdGFydCwgeWVhckVuZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASW5wdXQoKSBnZXQgc2hvd1RpbWUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaG93VGltZTtcbiAgICB9XG5cbiAgICBzZXQgc2hvd1RpbWUoc2hvd1RpbWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fc2hvd1RpbWUgPSBzaG93VGltZTtcblxuICAgICAgICBpZiAodGhpcy5jdXJyZW50SG91ciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmluaXRUaW1lKHRoaXMudmFsdWV8fG5ldyBEYXRlKCkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudXBkYXRlSW5wdXRmaWVsZCgpO1xuICAgIH1cblxuICAgIGdldCBsb2NhbGUoKSB7XG4gICAgICAgcmV0dXJuIHRoaXMuX2xvY2FsZTtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCBsb2NhbGUobmV3TG9jYWxlOiBMb2NhbGVTZXR0aW5ncykge1xuICAgICAgICBjb25zb2xlLndhcm4oXCJMb2NhbGUgcHJvcGVydHkgaGFzIG5vIGVmZmVjdCwgdXNlIG5ldyBpMThuIEFQSSBpbnN0ZWFkLlwiKTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWw6IEVsZW1lbnRSZWYsIHB1YmxpYyByZW5kZXJlcjogUmVuZGVyZXIyLCBwdWJsaWMgY2Q6IENoYW5nZURldGVjdG9yUmVmLCBwcml2YXRlIHpvbmU6IE5nWm9uZSwgcHJpdmF0ZSBjb25maWc6IFByaW1lTkdDb25maWcpIHt9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgY29uc3QgZGF0ZSA9IHRoaXMuZGVmYXVsdERhdGV8fG5ldyBEYXRlKCk7XG4gICAgICAgIHRoaXMuY3VycmVudE1vbnRoID0gZGF0ZS5nZXRNb250aCgpO1xuICAgICAgICB0aGlzLmN1cnJlbnRZZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xuXG4gICAgICAgIGlmICh0aGlzLnZpZXcgPT09ICdkYXRlJykge1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVXZWVrRGF5cygpO1xuICAgICAgICAgICAgdGhpcy5pbml0VGltZShkYXRlKTtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlTW9udGhzKHRoaXMuY3VycmVudE1vbnRoLCB0aGlzLmN1cnJlbnRZZWFyKTtcbiAgICAgICAgICAgIHRoaXMudGlja3NUbzE5NzAgPSAoKCgxOTcwIC0gMSkgKiAzNjUgKyBNYXRoLmZsb29yKDE5NzAgLyA0KSAtIE1hdGguZmxvb3IoMTk3MCAvIDEwMCkgKyBNYXRoLmZsb29yKDE5NzAgLyA0MDApKSAqIDI0ICogNjAgKiA2MCAqIDEwMDAwMDAwKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnZpZXcgPT09ICdtb250aCcpIHtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlTW9udGhQaWNrZXJWYWx1ZXMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoIChpdGVtLmdldFR5cGUoKSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGVUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdkaXNhYmxlZERhdGUnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpc2FibGVkRGF0ZVRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2hlYWRlcic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVhZGVyVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnZm9vdGVyJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mb290ZXJUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGVUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldFRyYW5zbGF0aW9uKG9wdGlvbjogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5nZXRUcmFuc2xhdGlvbihvcHRpb24pO1xuICAgIH1cblxuICAgIHBvcHVsYXRlWWVhck9wdGlvbnMoc3RhcnQsIGVuZCkge1xuICAgICAgICB0aGlzLnllYXJPcHRpb25zID0gW107XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IHN0YXJ0OyBpIDw9IGVuZDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLnllYXJPcHRpb25zLnB1c2goaSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjcmVhdGVXZWVrRGF5cygpIHtcbiAgICAgICAgdGhpcy53ZWVrRGF5cyA9IFtdO1xuICAgICAgICBsZXQgZGF5SW5kZXggPSB0aGlzLmZpcnN0RGF5T2ZXZWVrO1xuICAgICAgICBsZXQgZGF5TGFiZWxzID0gdGhpcy5nZXRUcmFuc2xhdGlvbihUcmFuc2xhdGlvbktleXMuREFZX05BTUVTX01JTik7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNzsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLndlZWtEYXlzLnB1c2goZGF5TGFiZWxzW2RheUluZGV4XSk7XG4gICAgICAgICAgICBkYXlJbmRleCA9IChkYXlJbmRleCA9PSA2KSA/IDAgOiArK2RheUluZGV4O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY3JlYXRlTW9udGhQaWNrZXJWYWx1ZXMoKSB7XG4gICAgICAgIHRoaXMubW9udGhQaWNrZXJWYWx1ZXMgPSBbXTtcbiAgICAgICAgbGV0IG1vbnRoTGFiZWxzID0gdGhpcy5nZXRUcmFuc2xhdGlvbihUcmFuc2xhdGlvbktleXMuTU9OVEhfTkFNRVNfU0hPUlQpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSAxMTsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLm1vbnRoUGlja2VyVmFsdWVzLnB1c2gobW9udGhMYWJlbHNbaV0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY3JlYXRlTW9udGhzKG1vbnRoOiBudW1iZXIsIHllYXI6IG51bWJlcikge1xuICAgICAgICB0aGlzLm1vbnRocyA9IHRoaXMubW9udGhzID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwIDsgaSA8IHRoaXMubnVtYmVyT2ZNb250aHM7IGkrKykge1xuICAgICAgICAgICAgbGV0IG0gPSBtb250aCArIGk7XG4gICAgICAgICAgICBsZXQgeSA9IHllYXI7XG4gICAgICAgICAgICBpZiAobSA+IDExKSB7XG4gICAgICAgICAgICAgICAgbSA9IG0gJSAxMSAtIDE7XG4gICAgICAgICAgICAgICAgeSA9IHllYXIgKyAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLm1vbnRocy5wdXNoKHRoaXMuY3JlYXRlTW9udGgobSwgeSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0V2Vla051bWJlcihkYXRlOiBEYXRlKSB7XG4gICAgICAgIGxldCBjaGVja0RhdGUgPSBuZXcgRGF0ZShkYXRlLmdldFRpbWUoKSk7XG5cdFx0Y2hlY2tEYXRlLnNldERhdGUoY2hlY2tEYXRlLmdldERhdGUoKSArIDQgLSAoIGNoZWNrRGF0ZS5nZXREYXkoKSB8fCA3ICkpO1xuXHRcdGxldCB0aW1lID0gY2hlY2tEYXRlLmdldFRpbWUoKTtcblx0XHRjaGVja0RhdGUuc2V0TW9udGgoIDAgKTtcblx0XHRjaGVja0RhdGUuc2V0RGF0ZSggMSApO1xuXHRcdHJldHVybiBNYXRoLmZsb29yKCBNYXRoLnJvdW5kKCh0aW1lIC0gY2hlY2tEYXRlLmdldFRpbWUoKSkgLyA4NjQwMDAwMCApIC8gNyApICsgMTtcbiAgICB9XG5cbiAgICBjcmVhdGVNb250aChtb250aDogbnVtYmVyLCB5ZWFyOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGRhdGVzID0gW107XG4gICAgICAgIGxldCBmaXJzdERheSA9IHRoaXMuZ2V0Rmlyc3REYXlPZk1vbnRoSW5kZXgobW9udGgsIHllYXIpO1xuICAgICAgICBsZXQgZGF5c0xlbmd0aCA9IHRoaXMuZ2V0RGF5c0NvdW50SW5Nb250aChtb250aCwgeWVhcik7XG4gICAgICAgIGxldCBwcmV2TW9udGhEYXlzTGVuZ3RoID0gdGhpcy5nZXREYXlzQ291bnRJblByZXZNb250aChtb250aCwgeWVhcik7XG4gICAgICAgIGxldCBkYXlObyA9IDE7XG4gICAgICAgIGxldCB0b2RheSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIGxldCB3ZWVrTnVtYmVycyA9IFtdO1xuICAgICAgICBsZXQgbW9udGhSb3dzID0gTWF0aC5jZWlsKChkYXlzTGVuZ3RoICsgZmlyc3REYXkpIC8gNyk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtb250aFJvd3M7IGkrKykge1xuICAgICAgICAgICAgbGV0IHdlZWsgPSBbXTtcblxuICAgICAgICAgICAgaWYgKGkgPT0gMCkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAocHJldk1vbnRoRGF5c0xlbmd0aCAtIGZpcnN0RGF5ICsgMSk7IGogPD0gcHJldk1vbnRoRGF5c0xlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwcmV2ID0gdGhpcy5nZXRQcmV2aW91c01vbnRoQW5kWWVhcihtb250aCwgeWVhcik7XG4gICAgICAgICAgICAgICAgICAgIHdlZWsucHVzaCh7ZGF5OiBqLCBtb250aDogcHJldi5tb250aCwgeWVhcjogcHJldi55ZWFyLCBvdGhlck1vbnRoOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvZGF5OiB0aGlzLmlzVG9kYXkodG9kYXksIGosIHByZXYubW9udGgsIHByZXYueWVhciksIHNlbGVjdGFibGU6IHRoaXMuaXNTZWxlY3RhYmxlKGosIHByZXYubW9udGgsIHByZXYueWVhciwgdHJ1ZSl9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsZXQgcmVtYWluaW5nRGF5c0xlbmd0aCA9IDcgLSB3ZWVrLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHJlbWFpbmluZ0RheXNMZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICB3ZWVrLnB1c2goe2RheTogZGF5Tm8sIG1vbnRoOiBtb250aCwgeWVhcjogeWVhciwgdG9kYXk6IHRoaXMuaXNUb2RheSh0b2RheSwgZGF5Tm8sIG1vbnRoLCB5ZWFyKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RhYmxlOiB0aGlzLmlzU2VsZWN0YWJsZShkYXlObywgbW9udGgsIHllYXIsIGZhbHNlKX0pO1xuICAgICAgICAgICAgICAgICAgICBkYXlObysrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgNzsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXlObyA+IGRheXNMZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuZXh0ID0gdGhpcy5nZXROZXh0TW9udGhBbmRZZWFyKG1vbnRoLCB5ZWFyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlZWsucHVzaCh7ZGF5OiBkYXlObyAtIGRheXNMZW5ndGgsIG1vbnRoOiBuZXh0Lm1vbnRoLCB5ZWFyOiBuZXh0LnllYXIsIG90aGVyTW9udGg6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2RheTogdGhpcy5pc1RvZGF5KHRvZGF5LCBkYXlObyAtIGRheXNMZW5ndGgsIG5leHQubW9udGgsIG5leHQueWVhciksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RhYmxlOiB0aGlzLmlzU2VsZWN0YWJsZSgoZGF5Tm8gLSBkYXlzTGVuZ3RoKSwgbmV4dC5tb250aCwgbmV4dC55ZWFyLCB0cnVlKX0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2Vlay5wdXNoKHtkYXk6IGRheU5vLCBtb250aDogbW9udGgsIHllYXI6IHllYXIsIHRvZGF5OiB0aGlzLmlzVG9kYXkodG9kYXksIGRheU5vLCBtb250aCwgeWVhciksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0YWJsZTogdGhpcy5pc1NlbGVjdGFibGUoZGF5Tm8sIG1vbnRoLCB5ZWFyLCBmYWxzZSl9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGRheU5vKys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5zaG93V2Vlaykge1xuICAgICAgICAgICAgICAgIHdlZWtOdW1iZXJzLnB1c2godGhpcy5nZXRXZWVrTnVtYmVyKG5ldyBEYXRlKHdlZWtbMF0ueWVhciwgd2Vla1swXS5tb250aCwgd2Vla1swXS5kYXkpKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRhdGVzLnB1c2god2Vlayk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbW9udGg6IG1vbnRoLFxuICAgICAgICAgICAgeWVhcjogeWVhcixcbiAgICAgICAgICAgIGRhdGVzOiBkYXRlcyxcbiAgICAgICAgICAgIHdlZWtOdW1iZXJzOiB3ZWVrTnVtYmVyc1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGluaXRUaW1lKGRhdGU6IERhdGUpIHtcbiAgICAgICAgdGhpcy5wbSA9IGRhdGUuZ2V0SG91cnMoKSA+IDExO1xuXG4gICAgICAgIGlmICh0aGlzLnNob3dUaW1lKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRNaW51dGUgPSBkYXRlLmdldE1pbnV0ZXMoKTtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFNlY29uZCA9IGRhdGUuZ2V0U2Vjb25kcygpO1xuICAgICAgICAgICAgdGhpcy5zZXRDdXJyZW50SG91clBNKGRhdGUuZ2V0SG91cnMoKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy50aW1lT25seSkge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50TWludXRlID0gMDtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEhvdXIgPSAwO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50U2Vjb25kID0gMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5hdkJhY2t3YXJkKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pc01vbnRoTmF2aWdhdGUgPSB0cnVlO1xuXG4gICAgICAgIGlmICh0aGlzLnZpZXcgPT09ICdtb250aCcpIHtcbiAgICAgICAgICAgIHRoaXMuZGVjcmVtZW50WWVhcigpO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKT0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUZvY3VzKCk7XG4gICAgICAgICAgICB9LDEpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudE1vbnRoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50TW9udGggPSAxMTtcbiAgICAgICAgICAgICAgICB0aGlzLmRlY3JlbWVudFllYXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudE1vbnRoLS07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMub25Nb250aENoYW5nZS5lbWl0KHsgbW9udGg6IHRoaXMuY3VycmVudE1vbnRoICsgMSwgeWVhcjogdGhpcy5jdXJyZW50WWVhciB9KTtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlTW9udGhzKHRoaXMuY3VycmVudE1vbnRoLCB0aGlzLmN1cnJlbnRZZWFyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5hdkZvcndhcmQoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmlzTW9udGhOYXZpZ2F0ZSA9IHRydWU7XG5cbiAgICAgICAgaWYgKHRoaXMudmlldyA9PT0gJ21vbnRoJykge1xuICAgICAgICAgICAgdGhpcy5pbmNyZW1lbnRZZWFyKCk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlRm9jdXMoKTtcbiAgICAgICAgICAgIH0sMSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50TW9udGggPT09IDExKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50TW9udGggPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMuaW5jcmVtZW50WWVhcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50TW9udGgrKztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5vbk1vbnRoQ2hhbmdlLmVtaXQoe21vbnRoOiB0aGlzLmN1cnJlbnRNb250aCArIDEsIHllYXI6IHRoaXMuY3VycmVudFllYXJ9KTtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlTW9udGhzKHRoaXMuY3VycmVudE1vbnRoLCB0aGlzLmN1cnJlbnRZZWFyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlY3JlbWVudFllYXIoKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFllYXItLTtcblxuICAgICAgICBpZiAodGhpcy55ZWFyTmF2aWdhdG9yICYmIHRoaXMuY3VycmVudFllYXIgPCB0aGlzLnllYXJPcHRpb25zWzBdKSB7XG4gICAgICAgICAgICBsZXQgZGlmZmVyZW5jZSA9IHRoaXMueWVhck9wdGlvbnNbdGhpcy55ZWFyT3B0aW9ucy5sZW5ndGggLSAxXSAtIHRoaXMueWVhck9wdGlvbnNbMF07XG4gICAgICAgICAgICB0aGlzLnBvcHVsYXRlWWVhck9wdGlvbnModGhpcy55ZWFyT3B0aW9uc1swXSAtIGRpZmZlcmVuY2UsIHRoaXMueWVhck9wdGlvbnNbdGhpcy55ZWFyT3B0aW9ucy5sZW5ndGggLSAxXSAtIGRpZmZlcmVuY2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5jcmVtZW50WWVhcigpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50WWVhcisrO1xuXG4gICAgICAgIGlmICh0aGlzLnllYXJOYXZpZ2F0b3IgJiYgdGhpcy5jdXJyZW50WWVhciA+IHRoaXMueWVhck9wdGlvbnNbdGhpcy55ZWFyT3B0aW9ucy5sZW5ndGggLSAxXSkge1xuICAgICAgICAgICAgbGV0IGRpZmZlcmVuY2UgPSB0aGlzLnllYXJPcHRpb25zW3RoaXMueWVhck9wdGlvbnMubGVuZ3RoIC0gMV0gLSB0aGlzLnllYXJPcHRpb25zWzBdO1xuICAgICAgICAgICAgdGhpcy5wb3B1bGF0ZVllYXJPcHRpb25zKHRoaXMueWVhck9wdGlvbnNbMF0gKyBkaWZmZXJlbmNlLCB0aGlzLnllYXJPcHRpb25zW3RoaXMueWVhck9wdGlvbnMubGVuZ3RoIC0gMV0gKyBkaWZmZXJlbmNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uRGF0ZVNlbGVjdChldmVudCwgZGF0ZU1ldGEpIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQgfHwgIWRhdGVNZXRhLnNlbGVjdGFibGUpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5pc011bHRpcGxlU2VsZWN0aW9uKCkgJiYgdGhpcy5pc1NlbGVjdGVkKGRhdGVNZXRhKSkge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMudmFsdWUuZmlsdGVyKChkYXRlLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICF0aGlzLmlzRGF0ZUVxdWFscyhkYXRlLCBkYXRlTWV0YSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICh0aGlzLnZhbHVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy51cGRhdGVNb2RlbCh0aGlzLnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnNob3VsZFNlbGVjdERhdGUoZGF0ZU1ldGEpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3REYXRlKGRhdGVNZXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmlzU2luZ2xlU2VsZWN0aW9uKCkgJiYgdGhpcy5oaWRlT25EYXRlVGltZVNlbGVjdCkge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGVPdmVybGF5KCk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tYXNrKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGlzYWJsZU1vZGFsaXR5KCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgIH0sIDE1MCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnVwZGF0ZUlucHV0ZmllbGQoKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBzaG91bGRTZWxlY3REYXRlKGRhdGVNZXRhKSB7XG4gICAgICAgIGlmICh0aGlzLmlzTXVsdGlwbGVTZWxlY3Rpb24oKSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1heERhdGVDb3VudCAhPSBudWxsID/CoHRoaXMubWF4RGF0ZUNvdW50ID4gKHRoaXMudmFsdWUgPyB0aGlzLnZhbHVlLmxlbmd0aCA6IDApIDogdHJ1ZTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgb25Nb250aFNlbGVjdChldmVudCwgaW5kZXgpIHtcbiAgICAgICAgaWYgKCFEb21IYW5kbGVyLmhhc0NsYXNzKGV2ZW50LnRhcmdldCwgJ3AtZGlzYWJsZWQnKSkge1xuICAgICAgICAgICAgdGhpcy5vbkRhdGVTZWxlY3QoZXZlbnQsIHt5ZWFyOiB0aGlzLmN1cnJlbnRZZWFyLCBtb250aDogaW5kZXgsIGRheTogMSwgc2VsZWN0YWJsZTogdHJ1ZX0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlSW5wdXRmaWVsZCgpIHtcbiAgICAgICAgbGV0IGZvcm1hdHRlZFZhbHVlID0gJyc7XG5cbiAgICAgICAgaWYgKHRoaXMudmFsdWUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzU2luZ2xlU2VsZWN0aW9uKCkpIHtcbiAgICAgICAgICAgICAgICBmb3JtYXR0ZWRWYWx1ZSA9IHRoaXMuZm9ybWF0RGF0ZVRpbWUodGhpcy52YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLmlzTXVsdGlwbGVTZWxlY3Rpb24oKSkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy52YWx1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0ZUFzU3RyaW5nID0gdGhpcy5mb3JtYXREYXRlVGltZSh0aGlzLnZhbHVlW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0dGVkVmFsdWUgKz0gZGF0ZUFzU3RyaW5nO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaSAhPT0gKHRoaXMudmFsdWUubGVuZ3RoIC0gMSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdHRlZFZhbHVlICs9IHRoaXMubXVsdGlwbGVTZXBhcmF0b3IrJyAnO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5pc1JhbmdlU2VsZWN0aW9uKCkpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy52YWx1ZSAmJiB0aGlzLnZhbHVlLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgc3RhcnREYXRlID0gdGhpcy52YWx1ZVswXTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGVuZERhdGUgPSB0aGlzLnZhbHVlWzFdO1xuXG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdHRlZFZhbHVlID0gdGhpcy5mb3JtYXREYXRlVGltZShzdGFydERhdGUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZW5kRGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0dGVkVmFsdWUgKz0gJyAnK3RoaXMucmFuZ2VTZXBhcmF0b3IgKycgJyArIHRoaXMuZm9ybWF0RGF0ZVRpbWUoZW5kRGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmlucHV0RmllbGRWYWx1ZSA9IGZvcm1hdHRlZFZhbHVlO1xuICAgICAgICB0aGlzLnVwZGF0ZUZpbGxlZFN0YXRlKCk7XG4gICAgICAgIGlmICh0aGlzLmlucHV0ZmllbGRWaWV3Q2hpbGQgJiYgdGhpcy5pbnB1dGZpZWxkVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuaW5wdXRmaWVsZFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnZhbHVlID0gdGhpcy5pbnB1dEZpZWxkVmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmb3JtYXREYXRlVGltZShkYXRlKSB7XG4gICAgICAgIGxldCBmb3JtYXR0ZWRWYWx1ZSA9IG51bGw7XG4gICAgICAgIGlmIChkYXRlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy50aW1lT25seSkge1xuICAgICAgICAgICAgICAgIGZvcm1hdHRlZFZhbHVlID0gdGhpcy5mb3JtYXRUaW1lKGRhdGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZm9ybWF0dGVkVmFsdWUgPSB0aGlzLmZvcm1hdERhdGUoZGF0ZSwgdGhpcy5nZXREYXRlRm9ybWF0KCkpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNob3dUaW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdHRlZFZhbHVlICs9ICcgJyArIHRoaXMuZm9ybWF0VGltZShkYXRlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZm9ybWF0dGVkVmFsdWU7XG4gICAgfVxuXG4gICAgc2V0Q3VycmVudEhvdXJQTShob3VyczogbnVtYmVyKSB7XG4gICAgICAgIGlmICh0aGlzLmhvdXJGb3JtYXQgPT0gJzEyJykge1xuICAgICAgICAgICAgdGhpcy5wbSA9IGhvdXJzID4gMTE7XG4gICAgICAgICAgICBpZiAoaG91cnMgPj0gMTIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRIb3VyID0gKGhvdXJzID09IDEyKSA/IDEyIDogaG91cnMgLSAxMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEhvdXIgPSAoaG91cnMgPT0gMCkgPyAxMiA6IGhvdXJzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50SG91ciA9IGhvdXJzO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2VsZWN0RGF0ZShkYXRlTWV0YSkge1xuICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKGRhdGVNZXRhLnllYXIsIGRhdGVNZXRhLm1vbnRoLCBkYXRlTWV0YS5kYXkpO1xuXG4gICAgICAgIGlmICh0aGlzLnNob3dUaW1lKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5ob3VyRm9ybWF0ID09ICcxMicpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50SG91ciA9PT0gMTIpXG4gICAgICAgICAgICAgICAgICAgIGRhdGUuc2V0SG91cnModGhpcy5wbSA/IDEyIDogMCk7XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBkYXRlLnNldEhvdXJzKHRoaXMucG0gPyB0aGlzLmN1cnJlbnRIb3VyICsgMTIgOiB0aGlzLmN1cnJlbnRIb3VyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGRhdGUuc2V0SG91cnModGhpcy5jdXJyZW50SG91cik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRhdGUuc2V0TWludXRlcyh0aGlzLmN1cnJlbnRNaW51dGUpO1xuICAgICAgICAgICAgZGF0ZS5zZXRTZWNvbmRzKHRoaXMuY3VycmVudFNlY29uZCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5taW5EYXRlICYmIHRoaXMubWluRGF0ZSA+IGRhdGUpIHtcbiAgICAgICAgICAgIGRhdGUgPSB0aGlzLm1pbkRhdGU7XG4gICAgICAgICAgICB0aGlzLnNldEN1cnJlbnRIb3VyUE0oZGF0ZS5nZXRIb3VycygpKTtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudE1pbnV0ZSA9IGRhdGUuZ2V0TWludXRlcygpO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50U2Vjb25kID0gZGF0ZS5nZXRTZWNvbmRzKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5tYXhEYXRlICYmIHRoaXMubWF4RGF0ZSA8IGRhdGUpIHtcbiAgICAgICAgICAgIGRhdGUgPSB0aGlzLm1heERhdGU7XG4gICAgICAgICAgICB0aGlzLnNldEN1cnJlbnRIb3VyUE0oZGF0ZS5nZXRIb3VycygpKTtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudE1pbnV0ZSA9IGRhdGUuZ2V0TWludXRlcygpO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50U2Vjb25kID0gZGF0ZS5nZXRTZWNvbmRzKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5pc1NpbmdsZVNlbGVjdGlvbigpKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU1vZGVsKGRhdGUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuaXNNdWx0aXBsZVNlbGVjdGlvbigpKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU1vZGVsKHRoaXMudmFsdWUgPyBbLi4udGhpcy52YWx1ZSwgZGF0ZV0gOiBbZGF0ZV0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuaXNSYW5nZVNlbGVjdGlvbigpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy52YWx1ZSAmJiB0aGlzLnZhbHVlLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGxldCBzdGFydERhdGUgPSB0aGlzLnZhbHVlWzBdO1xuICAgICAgICAgICAgICAgIGxldCBlbmREYXRlID0gdGhpcy52YWx1ZVsxXTtcblxuICAgICAgICAgICAgICAgIGlmICghZW5kRGF0ZSAmJiBkYXRlLmdldFRpbWUoKSA+PSBzdGFydERhdGUuZ2V0VGltZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGVuZERhdGUgPSBkYXRlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhcnREYXRlID0gZGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgZW5kRGF0ZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVNb2RlbChbc3RhcnREYXRlLCBlbmREYXRlXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZU1vZGVsKFtkYXRlLCBudWxsXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9uU2VsZWN0LmVtaXQoZGF0ZSk7XG4gICAgfVxuXG4gICAgdXBkYXRlTW9kZWwodmFsdWUpIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuXG4gICAgICAgIGlmICh0aGlzLmRhdGFUeXBlID09ICdkYXRlJykge1xuICAgICAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlKHRoaXMudmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuZGF0YVR5cGUgPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzU2luZ2xlU2VsZWN0aW9uKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy5mb3JtYXREYXRlVGltZSh0aGlzLnZhbHVlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgc3RyaW5nQXJyVmFsdWUgPSBudWxsO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0cmluZ0FyclZhbHVlID0gdGhpcy52YWx1ZS5tYXAoZGF0ZSA9PiB0aGlzLmZvcm1hdERhdGVUaW1lKGRhdGUpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlKHN0cmluZ0FyclZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldEZpcnN0RGF5T2ZNb250aEluZGV4KG1vbnRoOiBudW1iZXIsIHllYXI6IG51bWJlcikge1xuICAgICAgICBsZXQgZGF5ID0gbmV3IERhdGUoKTtcbiAgICAgICAgZGF5LnNldERhdGUoMSk7XG4gICAgICAgIGRheS5zZXRNb250aChtb250aCk7XG4gICAgICAgIGRheS5zZXRGdWxsWWVhcih5ZWFyKTtcblxuICAgICAgICBsZXQgZGF5SW5kZXggPSBkYXkuZ2V0RGF5KCkgKyB0aGlzLmdldFN1bmRheUluZGV4KCk7XG4gICAgICAgIHJldHVybiBkYXlJbmRleCA+PSA3ID8gZGF5SW5kZXggLSA3IDogZGF5SW5kZXg7XG4gICAgfVxuXG4gICAgZ2V0RGF5c0NvdW50SW5Nb250aChtb250aDogbnVtYmVyLCB5ZWFyOiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIDMyIC0gdGhpcy5kYXlsaWdodFNhdmluZ0FkanVzdChuZXcgRGF0ZSh5ZWFyLCBtb250aCwgMzIpKS5nZXREYXRlKCk7XG4gICAgfVxuXG4gICAgZ2V0RGF5c0NvdW50SW5QcmV2TW9udGgobW9udGg6IG51bWJlciwgeWVhcjogbnVtYmVyKSB7XG4gICAgICAgIGxldCBwcmV2ID0gdGhpcy5nZXRQcmV2aW91c01vbnRoQW5kWWVhcihtb250aCwgeWVhcik7XG4gICAgICAgIHJldHVybiB0aGlzLmdldERheXNDb3VudEluTW9udGgocHJldi5tb250aCwgcHJldi55ZWFyKTtcbiAgICB9XG5cbiAgICBnZXRQcmV2aW91c01vbnRoQW5kWWVhcihtb250aDogbnVtYmVyLCB5ZWFyOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IG0sIHk7XG5cbiAgICAgICAgaWYgKG1vbnRoID09PSAwKSB7XG4gICAgICAgICAgICBtID0gMTE7XG4gICAgICAgICAgICB5ID0geWVhciAtIDE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBtID0gbW9udGggLSAxO1xuICAgICAgICAgICAgeSA9IHllYXI7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4geydtb250aCc6bSwneWVhcic6eX07XG4gICAgfVxuXG4gICAgZ2V0TmV4dE1vbnRoQW5kWWVhcihtb250aDogbnVtYmVyLCB5ZWFyOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IG0sIHk7XG5cbiAgICAgICAgaWYgKG1vbnRoID09PSAxMSkge1xuICAgICAgICAgICAgbSA9IDA7XG4gICAgICAgICAgICB5ID0geWVhciArIDE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBtID0gbW9udGggKyAxO1xuICAgICAgICAgICAgeSA9IHllYXI7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4geydtb250aCc6bSwneWVhcic6eX07XG4gICAgfVxuXG4gICAgZ2V0U3VuZGF5SW5kZXgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZpcnN0RGF5T2ZXZWVrID4gMCA/IDcgLSB0aGlzLmZpcnN0RGF5T2ZXZWVrIDogMDtcbiAgICB9XG5cbiAgICBpc1NlbGVjdGVkKGRhdGVNZXRhKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLnZhbHVlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc1NpbmdsZVNlbGVjdGlvbigpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNEYXRlRXF1YWxzKHRoaXMudmFsdWUsIGRhdGVNZXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuaXNNdWx0aXBsZVNlbGVjdGlvbigpKSB7XG4gICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgZGF0ZSBvZiB0aGlzLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkID0gdGhpcy5pc0RhdGVFcXVhbHMoZGF0ZSwgZGF0ZU1ldGEpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlbGVjdGVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5pc1JhbmdlU2VsZWN0aW9uKCkpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy52YWx1ZVsxXSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNEYXRlRXF1YWxzKHRoaXMudmFsdWVbMF0sIGRhdGVNZXRhKSB8fCB0aGlzLmlzRGF0ZUVxdWFscyh0aGlzLnZhbHVlWzFdLCBkYXRlTWV0YSkgfHwgdGhpcy5pc0RhdGVCZXR3ZWVuKHRoaXMudmFsdWVbMF0sIHRoaXMudmFsdWVbMV0sIGRhdGVNZXRhKTtcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmlzRGF0ZUVxdWFscyh0aGlzLnZhbHVlWzBdLCBkYXRlTWV0YSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzTW9udGhTZWxlY3RlZChtb250aDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgICAgIGxldCBkYXkgPSB0aGlzLnZhbHVlID8gKEFycmF5LmlzQXJyYXkodGhpcy52YWx1ZSkgPyB0aGlzLnZhbHVlWzBdLmdldERhdGUoKSA6IHRoaXMudmFsdWUuZ2V0RGF0ZSgpKSA6IDE7XG4gICAgICAgIHJldHVybiB0aGlzLmlzU2VsZWN0ZWQoe3llYXI6IHRoaXMuY3VycmVudFllYXIsIG1vbnRoOiBtb250aCwgZGF5OiBkYXksIHNlbGVjdGFibGU6IHRydWV9KTtcbiAgICB9XG5cbiAgICBpc0RhdGVFcXVhbHModmFsdWUsIGRhdGVNZXRhKSB7XG4gICAgICAgIGlmICh2YWx1ZSlcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS5nZXREYXRlKCkgPT09IGRhdGVNZXRhLmRheSAmJiB2YWx1ZS5nZXRNb250aCgpID09PSBkYXRlTWV0YS5tb250aCAmJiB2YWx1ZS5nZXRGdWxsWWVhcigpID09PSBkYXRlTWV0YS55ZWFyO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaXNEYXRlQmV0d2VlbihzdGFydCwgZW5kLCBkYXRlTWV0YSkge1xuICAgICAgICBsZXQgYmV0d2VlbiA6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAgICAgaWYgKHN0YXJ0ICYmIGVuZCkge1xuICAgICAgICAgICAgbGV0IGRhdGU6IERhdGUgPSBuZXcgRGF0ZShkYXRlTWV0YS55ZWFyLCBkYXRlTWV0YS5tb250aCwgZGF0ZU1ldGEuZGF5KTtcbiAgICAgICAgICAgIHJldHVybiBzdGFydC5nZXRUaW1lKCkgPD0gZGF0ZS5nZXRUaW1lKCkgJiYgZW5kLmdldFRpbWUoKSA+PSBkYXRlLmdldFRpbWUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBiZXR3ZWVuO1xuICAgIH1cblxuICAgIGlzU2luZ2xlU2VsZWN0aW9uKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3Rpb25Nb2RlID09PSAnc2luZ2xlJztcbiAgICB9XG5cbiAgICBpc1JhbmdlU2VsZWN0aW9uKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3Rpb25Nb2RlID09PSAncmFuZ2UnO1xuICAgIH1cblxuICAgIGlzTXVsdGlwbGVTZWxlY3Rpb24oKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGlvbk1vZGUgPT09ICdtdWx0aXBsZSc7XG4gICAgfVxuXG4gICAgaXNUb2RheSh0b2RheSwgZGF5LCBtb250aCwgeWVhcik6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdG9kYXkuZ2V0RGF0ZSgpID09PSBkYXkgJiYgdG9kYXkuZ2V0TW9udGgoKSA9PT0gbW9udGggJiYgdG9kYXkuZ2V0RnVsbFllYXIoKSA9PT0geWVhcjtcbiAgICB9XG5cbiAgICBpc1NlbGVjdGFibGUoZGF5LCBtb250aCwgeWVhciwgb3RoZXJNb250aCk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgdmFsaWRNaW4gPSB0cnVlO1xuICAgICAgICBsZXQgdmFsaWRNYXggPSB0cnVlO1xuICAgICAgICBsZXQgdmFsaWREYXRlID0gdHJ1ZTtcbiAgICAgICAgbGV0IHZhbGlkRGF5ID0gdHJ1ZTtcblxuICAgICAgICBpZiAob3RoZXJNb250aCAmJiAhdGhpcy5zZWxlY3RPdGhlck1vbnRocykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubWluRGF0ZSkge1xuICAgICAgICAgICAgIGlmICh0aGlzLm1pbkRhdGUuZ2V0RnVsbFllYXIoKSA+IHllYXIpIHtcbiAgICAgICAgICAgICAgICAgdmFsaWRNaW4gPSBmYWxzZTtcbiAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5taW5EYXRlLmdldEZ1bGxZZWFyKCkgPT09IHllYXIpIHtcbiAgICAgICAgICAgICAgICAgaWYgKHRoaXMubWluRGF0ZS5nZXRNb250aCgpID4gbW9udGgpIHtcbiAgICAgICAgICAgICAgICAgICAgIHZhbGlkTWluID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5taW5EYXRlLmdldE1vbnRoKCkgPT09IG1vbnRoKSB7XG4gICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5taW5EYXRlLmdldERhdGUoKSA+IGRheSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkTWluID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5tYXhEYXRlKSB7XG4gICAgICAgICAgICAgaWYgKHRoaXMubWF4RGF0ZS5nZXRGdWxsWWVhcigpIDwgeWVhcikge1xuICAgICAgICAgICAgICAgICB2YWxpZE1heCA9IGZhbHNlO1xuICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLm1heERhdGUuZ2V0RnVsbFllYXIoKSA9PT0geWVhcikge1xuICAgICAgICAgICAgICAgICBpZiAodGhpcy5tYXhEYXRlLmdldE1vbnRoKCkgPCBtb250aCkge1xuICAgICAgICAgICAgICAgICAgICAgdmFsaWRNYXggPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLm1heERhdGUuZ2V0TW9udGgoKSA9PT0gbW9udGgpIHtcbiAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm1heERhdGUuZ2V0RGF0ZSgpIDwgZGF5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRNYXggPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkRGF0ZXMpIHtcbiAgICAgICAgICAgdmFsaWREYXRlID0gIXRoaXMuaXNEYXRlRGlzYWJsZWQoZGF5LG1vbnRoLHllYXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWREYXlzKSB7XG4gICAgICAgICAgIHZhbGlkRGF5ID0gIXRoaXMuaXNEYXlEaXNhYmxlZChkYXksbW9udGgseWVhcilcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB2YWxpZE1pbiAmJiB2YWxpZE1heCAmJiB2YWxpZERhdGUgJiYgdmFsaWREYXk7XG4gICAgfVxuXG4gICAgaXNEYXRlRGlzYWJsZWQoZGF5Om51bWJlciwgbW9udGg6bnVtYmVyLCB5ZWFyOm51bWJlcik6Ym9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkRGF0ZXMpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGRpc2FibGVkRGF0ZSBvZiB0aGlzLmRpc2FibGVkRGF0ZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGlzYWJsZWREYXRlLmdldEZ1bGxZZWFyKCkgPT09IHllYXIgJiYgZGlzYWJsZWREYXRlLmdldE1vbnRoKCkgPT09IG1vbnRoICYmIGRpc2FibGVkRGF0ZS5nZXREYXRlKCkgPT09IGRheSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaXNEYXlEaXNhYmxlZChkYXk6bnVtYmVyLCBtb250aDpudW1iZXIsIHllYXI6bnVtYmVyKTpib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWREYXlzKSB7XG4gICAgICAgICAgICBsZXQgd2Vla2RheSA9IG5ldyBEYXRlKHllYXIsIG1vbnRoLCBkYXkpO1xuICAgICAgICAgICAgbGV0IHdlZWtkYXlOdW1iZXIgPSB3ZWVrZGF5LmdldERheSgpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlzYWJsZWREYXlzLmluZGV4T2Yod2Vla2RheU51bWJlcikgIT09IC0xO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBvbklucHV0Rm9jdXMoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIHRoaXMuZm9jdXMgPSB0cnVlO1xuICAgICAgICBpZiAodGhpcy5zaG93T25Gb2N1cykge1xuICAgICAgICAgICAgdGhpcy5zaG93T3ZlcmxheSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub25Gb2N1cy5lbWl0KGV2ZW50KTtcbiAgICB9XG5cbiAgICBvbklucHV0Q2xpY2soKSB7XG4gICAgICAgIGlmICh0aGlzLm92ZXJsYXkgJiYgdGhpcy5hdXRvWkluZGV4KSB7XG4gICAgICAgICAgICB0aGlzLm92ZXJsYXkuc3R5bGUuekluZGV4ID0gU3RyaW5nKHRoaXMuYmFzZVpJbmRleCArICgrK0RvbUhhbmRsZXIuemluZGV4KSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5zaG93T25Gb2N1cyAmJiAhdGhpcy5vdmVybGF5VmlzaWJsZSkge1xuICAgICAgICAgICAgdGhpcy5zaG93T3ZlcmxheSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25JbnB1dEJsdXIoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIHRoaXMuZm9jdXMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5vbkJsdXIuZW1pdChldmVudCk7XG4gICAgICAgIGlmICghdGhpcy5rZWVwSW52YWxpZCkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVJbnB1dGZpZWxkKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vbk1vZGVsVG91Y2hlZCgpO1xuICAgIH1cblxuICAgIG9uQnV0dG9uQ2xpY2soZXZlbnQsIGlucHV0ZmllbGQpIHtcbiAgICAgICAgaWYgKCF0aGlzLm92ZXJsYXlWaXNpYmxlKSB7XG4gICAgICAgICAgICBpbnB1dGZpZWxkLmZvY3VzKCk7XG4gICAgICAgICAgICB0aGlzLnNob3dPdmVybGF5KCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmhpZGVPdmVybGF5KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblByZXZCdXR0b25DbGljayhldmVudCkge1xuICAgICAgICB0aGlzLm5hdmlnYXRpb25TdGF0ZSA9IHtiYWNrd2FyZDogdHJ1ZSwgYnV0dG9uOiB0cnVlfTtcbiAgICAgICAgdGhpcy5uYXZCYWNrd2FyZChldmVudCk7XG4gICAgfVxuXG4gICAgb25OZXh0QnV0dG9uQ2xpY2soZXZlbnQpIHtcbiAgICAgICAgdGhpcy5uYXZpZ2F0aW9uU3RhdGUgPSB7YmFja3dhcmQ6IGZhbHNlLCBidXR0b246IHRydWV9O1xuICAgICAgICB0aGlzLm5hdkZvcndhcmQoZXZlbnQpO1xuICAgIH1cblxuICAgIG9uQ29udGFpbmVyQnV0dG9uS2V5ZG93bihldmVudCkge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LndoaWNoKSB7XG4gICAgICAgICAgIC8vdGFiXG4gICAgICAgICAgIGNhc2UgOTpcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaW5saW5lKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJhcEZvY3VzKGV2ZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgIC8vZXNjYXBlXG4gICAgICAgICAgIGNhc2UgMjc6XG4gICAgICAgICAgICAgICB0aGlzLm92ZXJsYXlWaXNpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgLy9Ob29wXG4gICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICB9XG5cbiAgICBvbklucHV0S2V5ZG93bihldmVudCkge1xuICAgICAgICB0aGlzLmlzS2V5ZG93biA9IHRydWU7XG4gICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSA0MCAmJiB0aGlzLmNvbnRlbnRWaWV3Q2hpbGQpIHtcbiAgICAgICAgICAgIHRoaXMudHJhcEZvY3VzKGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChldmVudC5rZXlDb2RlID09PSAyNykge1xuICAgICAgICAgICAgaWYgKHRoaXMub3ZlcmxheVZpc2libGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm92ZXJsYXlWaXNpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChldmVudC5rZXlDb2RlID09PSAxMykge1xuICAgICAgICAgICAgaWYgKHRoaXMub3ZlcmxheVZpc2libGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm92ZXJsYXlWaXNpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChldmVudC5rZXlDb2RlID09PSA5ICYmIHRoaXMuY29udGVudFZpZXdDaGlsZCkge1xuICAgICAgICAgICAgRG9tSGFuZGxlci5nZXRGb2N1c2FibGVFbGVtZW50cyh0aGlzLmNvbnRlbnRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCkuZm9yRWFjaChlbCA9PiBlbC50YWJJbmRleCA9ICctMScpO1xuICAgICAgICAgICAgaWYgKHRoaXMub3ZlcmxheVZpc2libGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm92ZXJsYXlWaXNpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkRhdGVDZWxsS2V5ZG93bihldmVudCwgZGF0ZSwgZ3JvdXBJbmRleCkge1xuICAgICAgICBjb25zdCBjZWxsQ29udGVudCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XG4gICAgICAgIGNvbnN0IGNlbGwgPSBjZWxsQ29udGVudC5wYXJlbnRFbGVtZW50O1xuXG4gICAgICAgIHN3aXRjaCAoZXZlbnQud2hpY2gpIHtcbiAgICAgICAgICAgIC8vZG93biBhcnJvd1xuICAgICAgICAgICAgY2FzZSA0MDoge1xuICAgICAgICAgICAgICAgIGNlbGxDb250ZW50LnRhYkluZGV4ID0gJy0xJztcbiAgICAgICAgICAgICAgICBsZXQgY2VsbEluZGV4ID0gRG9tSGFuZGxlci5pbmRleChjZWxsKTtcbiAgICAgICAgICAgICAgICBsZXQgbmV4dFJvdyA9IGNlbGwucGFyZW50RWxlbWVudC5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgaWYgKG5leHRSb3cpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZvY3VzQ2VsbCA9IG5leHRSb3cuY2hpbGRyZW5bY2VsbEluZGV4XS5jaGlsZHJlblswXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKERvbUhhbmRsZXIuaGFzQ2xhc3MoZm9jdXNDZWxsLCAncC1kaXNhYmxlZCcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRpb25TdGF0ZSA9IHtiYWNrd2FyZDogZmFsc2V9O1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uYXZGb3J3YXJkKGV2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHRSb3cuY2hpbGRyZW5bY2VsbEluZGV4XS5jaGlsZHJlblswXS50YWJJbmRleCA9ICcwJztcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHRSb3cuY2hpbGRyZW5bY2VsbEluZGV4XS5jaGlsZHJlblswXS5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRpb25TdGF0ZSA9IHtiYWNrd2FyZDogZmFsc2V9O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5hdkZvcndhcmQoZXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL3VwIGFycm93XG4gICAgICAgICAgICBjYXNlIDM4OiB7XG4gICAgICAgICAgICAgICAgY2VsbENvbnRlbnQudGFiSW5kZXggPSAnLTEnO1xuICAgICAgICAgICAgICAgIGxldCBjZWxsSW5kZXggPSBEb21IYW5kbGVyLmluZGV4KGNlbGwpO1xuICAgICAgICAgICAgICAgIGxldCBwcmV2Um93ID0gY2VsbC5wYXJlbnRFbGVtZW50LnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgaWYgKHByZXZSb3cpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZvY3VzQ2VsbCA9IHByZXZSb3cuY2hpbGRyZW5bY2VsbEluZGV4XS5jaGlsZHJlblswXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKERvbUhhbmRsZXIuaGFzQ2xhc3MoZm9jdXNDZWxsLCAncC1kaXNhYmxlZCcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRpb25TdGF0ZSA9IHtiYWNrd2FyZDogdHJ1ZX07XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5hdkJhY2t3YXJkKGV2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvY3VzQ2VsbC50YWJJbmRleCA9ICcwJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvY3VzQ2VsbC5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRpb25TdGF0ZSA9IHtiYWNrd2FyZDogdHJ1ZX07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmF2QmFja3dhcmQoZXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL2xlZnQgYXJyb3dcbiAgICAgICAgICAgIGNhc2UgMzc6IHtcbiAgICAgICAgICAgICAgICBjZWxsQ29udGVudC50YWJJbmRleCA9ICctMSc7XG4gICAgICAgICAgICAgICAgbGV0IHByZXZDZWxsID0gY2VsbC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgICAgICAgIGlmIChwcmV2Q2VsbCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZm9jdXNDZWxsID0gcHJldkNlbGwuY2hpbGRyZW5bMF07XG4gICAgICAgICAgICAgICAgICAgIGlmIChEb21IYW5kbGVyLmhhc0NsYXNzKGZvY3VzQ2VsbCwgJ3AtZGlzYWJsZWQnKSB8fCBEb21IYW5kbGVyLmhhc0NsYXNzKGZvY3VzQ2VsbC5wYXJlbnRFbGVtZW50LCAncC1kYXRlcGlja2VyLXdlZWtudW1iZXInKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uYXZpZ2F0ZVRvTW9udGgodHJ1ZSwgZ3JvdXBJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb2N1c0NlbGwudGFiSW5kZXggPSAnMCc7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb2N1c0NlbGwuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uYXZpZ2F0ZVRvTW9udGgodHJ1ZSwgZ3JvdXBJbmRleCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vcmlnaHQgYXJyb3dcbiAgICAgICAgICAgIGNhc2UgMzk6IHtcbiAgICAgICAgICAgICAgICBjZWxsQ29udGVudC50YWJJbmRleCA9ICctMSc7XG4gICAgICAgICAgICAgICAgbGV0IG5leHRDZWxsID0gY2VsbC5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgaWYgKG5leHRDZWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBmb2N1c0NlbGwgPSBuZXh0Q2VsbC5jaGlsZHJlblswXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKERvbUhhbmRsZXIuaGFzQ2xhc3MoZm9jdXNDZWxsLCAncC1kaXNhYmxlZCcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRlVG9Nb250aChmYWxzZSwgZ3JvdXBJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb2N1c0NlbGwudGFiSW5kZXggPSAnMCc7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb2N1c0NlbGwuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uYXZpZ2F0ZVRvTW9udGgoZmFsc2UsIGdyb3VwSW5kZXgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL2VudGVyXG4gICAgICAgICAgICBjYXNlIDEzOiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkRhdGVTZWxlY3QoZXZlbnQsIGRhdGUpO1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vZXNjYXBlXG4gICAgICAgICAgICBjYXNlIDI3OiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vdmVybGF5VmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vdGFiXG4gICAgICAgICAgICBjYXNlIDk6IHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaW5saW5lKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJhcEZvY3VzKGV2ZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgLy9ubyBvcFxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbk1vbnRoQ2VsbEtleWRvd24oZXZlbnQsIGluZGV4KSB7XG4gICAgICAgIGNvbnN0IGNlbGwgPSBldmVudC5jdXJyZW50VGFyZ2V0O1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LndoaWNoKSB7XG4gICAgICAgICAgICAvL2Fycm93c1xuICAgICAgICAgICAgY2FzZSAzODpcbiAgICAgICAgICAgIGNhc2UgNDA6IHtcbiAgICAgICAgICAgICAgICBjZWxsLnRhYkluZGV4ID0gJy0xJztcbiAgICAgICAgICAgICAgICB2YXIgY2VsbHMgPSBjZWxsLnBhcmVudEVsZW1lbnQuY2hpbGRyZW47XG4gICAgICAgICAgICAgICAgdmFyIGNlbGxJbmRleCA9IERvbUhhbmRsZXIuaW5kZXgoY2VsbCk7XG4gICAgICAgICAgICAgICAgbGV0IG5leHRDZWxsID0gY2VsbHNbZXZlbnQud2hpY2ggPT09IDQwID8gY2VsbEluZGV4ICsgMyA6IGNlbGxJbmRleCAtM107XG4gICAgICAgICAgICAgICAgaWYgKG5leHRDZWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHRDZWxsLnRhYkluZGV4ID0gJzAnO1xuICAgICAgICAgICAgICAgICAgICBuZXh0Q2VsbC5mb2N1cygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL2xlZnQgYXJyb3dcbiAgICAgICAgICAgIGNhc2UgMzc6IHtcbiAgICAgICAgICAgICAgICBjZWxsLnRhYkluZGV4ID0gJy0xJztcbiAgICAgICAgICAgICAgICBsZXQgcHJldkNlbGwgPSBjZWxsLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgaWYgKHByZXZDZWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHByZXZDZWxsLnRhYkluZGV4ID0gJzAnO1xuICAgICAgICAgICAgICAgICAgICBwcmV2Q2VsbC5mb2N1cygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL3JpZ2h0IGFycm93XG4gICAgICAgICAgICBjYXNlIDM5OiB7XG4gICAgICAgICAgICAgICAgY2VsbC50YWJJbmRleCA9ICctMSc7XG4gICAgICAgICAgICAgICAgbGV0IG5leHRDZWxsID0gY2VsbC5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgaWYgKG5leHRDZWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHRDZWxsLnRhYkluZGV4ID0gJzAnO1xuICAgICAgICAgICAgICAgICAgICBuZXh0Q2VsbC5mb2N1cygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL2VudGVyXG4gICAgICAgICAgICBjYXNlIDEzOiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbk1vbnRoU2VsZWN0KGV2ZW50LCBpbmRleCk7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9lc2NhcGVcbiAgICAgICAgICAgIGNhc2UgMjc6IHtcbiAgICAgICAgICAgICAgICB0aGlzLm92ZXJsYXlWaXNpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy90YWJcbiAgICAgICAgICAgIGNhc2UgOToge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pbmxpbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFwRm9jdXMoZXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAvL25vIG9wXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5hdmlnYXRlVG9Nb250aChwcmV2LCBncm91cEluZGV4KSB7XG4gICAgICAgIGlmIChwcmV2KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5udW1iZXJPZk1vbnRocyA9PT0gMSB8fCAoZ3JvdXBJbmRleCA9PT0gMCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRpb25TdGF0ZSA9IHtiYWNrd2FyZDogdHJ1ZX07XG4gICAgICAgICAgICAgICAgdGhpcy5uYXZCYWNrd2FyZChldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgcHJldk1vbnRoQ29udGFpbmVyID0gdGhpcy5jb250ZW50Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bZ3JvdXBJbmRleCAtIDFdO1xuICAgICAgICAgICAgICAgIGxldCBjZWxscyA9IERvbUhhbmRsZXIuZmluZChwcmV2TW9udGhDb250YWluZXIsICcucC1kYXRlcGlja2VyLWNhbGVuZGFyIHRkIHNwYW46bm90KC5wLWRpc2FibGVkKTpub3QoLnAtaW5rKScpO1xuICAgICAgICAgICAgICAgIGxldCBmb2N1c0NlbGwgPSBjZWxsc1tjZWxscy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgICAgICBmb2N1c0NlbGwudGFiSW5kZXggPSAnMCc7XG4gICAgICAgICAgICAgICAgZm9jdXNDZWxsLmZvY3VzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5udW1iZXJPZk1vbnRocyA9PT0gMSB8fCAoZ3JvdXBJbmRleCA9PT0gdGhpcy5udW1iZXJPZk1vbnRocyAtIDEpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5uYXZpZ2F0aW9uU3RhdGUgPSB7YmFja3dhcmQ6IGZhbHNlfTtcbiAgICAgICAgICAgICAgICB0aGlzLm5hdkZvcndhcmQoZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IG5leHRNb250aENvbnRhaW5lciA9IHRoaXMuY29udGVudFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuW2dyb3VwSW5kZXggKyAxXTtcbiAgICAgICAgICAgICAgICBsZXQgZm9jdXNDZWxsID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKG5leHRNb250aENvbnRhaW5lciwgJy5wLWRhdGVwaWNrZXItY2FsZW5kYXIgdGQgc3Bhbjpub3QoLnAtZGlzYWJsZWQpOm5vdCgucC1pbmspJyk7XG4gICAgICAgICAgICAgICAgZm9jdXNDZWxsLnRhYkluZGV4ID0gJzAnO1xuICAgICAgICAgICAgICAgIGZvY3VzQ2VsbC5mb2N1cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlRm9jdXMoKSB7XG4gICAgICAgIGxldCBjZWxsO1xuICAgICAgICBpZiAodGhpcy5uYXZpZ2F0aW9uU3RhdGUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm5hdmlnYXRpb25TdGF0ZS5idXR0b24pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmluaXRGb2N1c2FibGVDZWxsKCk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5uYXZpZ2F0aW9uU3RhdGUuYmFja3dhcmQpXG4gICAgICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuZmluZFNpbmdsZSh0aGlzLmNvbnRlbnRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCwgJy5wLWRhdGVwaWNrZXItcHJldicpLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBEb21IYW5kbGVyLmZpbmRTaW5nbGUodGhpcy5jb250ZW50Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQsICcucC1kYXRlcGlja2VyLW5leHQnKS5mb2N1cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubmF2aWdhdGlvblN0YXRlLmJhY2t3YXJkKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjZWxscyA9IERvbUhhbmRsZXIuZmluZCh0aGlzLmNvbnRlbnRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCwgJy5wLWRhdGVwaWNrZXItY2FsZW5kYXIgdGQgc3Bhbjpub3QoLnAtZGlzYWJsZWQpOm5vdCgucC1pbmspJyk7XG4gICAgICAgICAgICAgICAgICAgIGNlbGwgPSBjZWxsc1tjZWxscy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNlbGwgPSBEb21IYW5kbGVyLmZpbmRTaW5nbGUodGhpcy5jb250ZW50Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQsICcucC1kYXRlcGlja2VyLWNhbGVuZGFyIHRkIHNwYW46bm90KC5wLWRpc2FibGVkKTpub3QoLnAtaW5rKScpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChjZWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNlbGwudGFiSW5kZXggPSAnMCc7XG4gICAgICAgICAgICAgICAgICAgIGNlbGwuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMubmF2aWdhdGlvblN0YXRlID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdEZvY3VzYWJsZUNlbGwoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGluaXRGb2N1c2FibGVDZWxsKCkge1xuICAgICAgICBsZXQgY2VsbDtcbiAgICAgICAgaWYgKHRoaXMudmlldyA9PT0gJ21vbnRoJykge1xuICAgICAgICAgICAgbGV0IGNlbGxzID0gRG9tSGFuZGxlci5maW5kKHRoaXMuY29udGVudFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LCAnLnAtbW9udGhwaWNrZXIgLnAtbW9udGhwaWNrZXItbW9udGg6bm90KC5wLWRpc2FibGVkKScpO1xuICAgICAgICAgICAgbGV0IHNlbGVjdGVkQ2VsbD0gRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMuY29udGVudFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LCAnLnAtbW9udGhwaWNrZXIgLnAtbW9udGhwaWNrZXItbW9udGgucC1oaWdobGlnaHQnKTtcbiAgICAgICAgICAgIGNlbGxzLmZvckVhY2goY2VsbCA9PiBjZWxsLnRhYkluZGV4ID0gLTEpO1xuICAgICAgICAgICAgY2VsbCA9IHNlbGVjdGVkQ2VsbCB8fCBjZWxsc1swXTtcblxuICAgICAgICAgICAgaWYgKGNlbGxzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGxldCBkaXNhYmxlZENlbGxzID0gRG9tSGFuZGxlci5maW5kKHRoaXMuY29udGVudFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LCAnLnAtbW9udGhwaWNrZXIgLnAtbW9udGhwaWNrZXItbW9udGgucC1kaXNhYmxlZFt0YWJpbmRleCA9IFwiMFwiXScpO1xuICAgICAgICAgICAgICAgIGRpc2FibGVkQ2VsbHMuZm9yRWFjaChjZWxsID0+IGNlbGwudGFiSW5kZXggPSAtMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjZWxsID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMuY29udGVudFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LCAnc3Bhbi5wLWhpZ2hsaWdodCcpO1xuICAgICAgICAgICAgaWYgKCFjZWxsKSB7XG4gICAgICAgICAgICAgICAgbGV0IHRvZGF5Q2VsbCA9IERvbUhhbmRsZXIuZmluZFNpbmdsZSh0aGlzLmNvbnRlbnRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCwgJ3RkLnAtZGF0ZXBpY2tlci10b2RheSBzcGFuOm5vdCgucC1kaXNhYmxlZCk6bm90KC5wLWluayknKTtcbiAgICAgICAgICAgICAgICBpZiAodG9kYXlDZWxsKVxuICAgICAgICAgICAgICAgICAgICBjZWxsID0gdG9kYXlDZWxsO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgY2VsbCA9IERvbUhhbmRsZXIuZmluZFNpbmdsZSh0aGlzLmNvbnRlbnRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCwgJy5wLWRhdGVwaWNrZXItY2FsZW5kYXIgdGQgc3Bhbjpub3QoLnAtZGlzYWJsZWQpOm5vdCgucC1pbmspJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2VsbCkge1xuICAgICAgICAgICAgY2VsbC50YWJJbmRleCA9ICcwJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRyYXBGb2N1cyhldmVudCkge1xuICAgICAgICBsZXQgZm9jdXNhYmxlRWxlbWVudHMgPSBEb21IYW5kbGVyLmdldEZvY3VzYWJsZUVsZW1lbnRzKHRoaXMuY29udGVudFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KTtcblxuICAgICAgICBpZiAoZm9jdXNhYmxlRWxlbWVudHMgJiYgZm9jdXNhYmxlRWxlbWVudHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgaWYgKCFmb2N1c2FibGVFbGVtZW50c1swXS5vd25lckRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBmb2N1c2FibGVFbGVtZW50c1swXS5mb2N1cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IGZvY3VzZWRJbmRleCA9IGZvY3VzYWJsZUVsZW1lbnRzLmluZGV4T2YoZm9jdXNhYmxlRWxlbWVudHNbMF0ub3duZXJEb2N1bWVudC5hY3RpdmVFbGVtZW50KTtcblxuICAgICAgICAgICAgICAgIGlmIChldmVudC5zaGlmdEtleSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZm9jdXNlZEluZGV4ID09IC0xIHx8IGZvY3VzZWRJbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZm9jdXNUcmFwKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb2N1c2FibGVFbGVtZW50c1tmb2N1c2FibGVFbGVtZW50cy5sZW5ndGggLSAxXS5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZvY3VzZWRJbmRleCA9PT0gLTEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmhpZGVPdmVybGF5KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoZm9jdXNlZEluZGV4ID09PSAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb2N1c2FibGVFbGVtZW50c1tmb2N1c2VkSW5kZXggLSAxXS5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZm9jdXNlZEluZGV4ID09IC0xIHx8IGZvY3VzZWRJbmRleCA9PT0gKGZvY3VzYWJsZUVsZW1lbnRzLmxlbmd0aCAtIDEpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZm9jdXNUcmFwICYmIGZvY3VzZWRJbmRleCAhPSAtMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5oaWRlT3ZlcmxheSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvY3VzYWJsZUVsZW1lbnRzWzBdLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb2N1c2FibGVFbGVtZW50c1tmb2N1c2VkSW5kZXggKyAxXS5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBvbk1vbnRoRHJvcGRvd25DaGFuZ2UobTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuY3VycmVudE1vbnRoID0gcGFyc2VJbnQobSk7XG4gICAgICAgIHRoaXMub25Nb250aENoYW5nZS5lbWl0KHsgbW9udGg6IHRoaXMuY3VycmVudE1vbnRoICsgMSwgeWVhcjogdGhpcy5jdXJyZW50WWVhciB9KTtcbiAgICAgICAgdGhpcy5jcmVhdGVNb250aHModGhpcy5jdXJyZW50TW9udGgsIHRoaXMuY3VycmVudFllYXIpO1xuICAgIH1cblxuICAgIG9uWWVhckRyb3Bkb3duQ2hhbmdlKHk6IHN0cmluZykge1xuICAgICAgICB0aGlzLmN1cnJlbnRZZWFyID0gcGFyc2VJbnQoeSk7XG4gICAgICAgIHRoaXMub25ZZWFyQ2hhbmdlLmVtaXQoeyBtb250aDogdGhpcy5jdXJyZW50TW9udGggKyAxLCB5ZWFyOiB0aGlzLmN1cnJlbnRZZWFyIH0pO1xuICAgICAgICB0aGlzLmNyZWF0ZU1vbnRocyh0aGlzLmN1cnJlbnRNb250aCwgdGhpcy5jdXJyZW50WWVhcik7XG4gICAgfVxuXG4gICAgY29udmVydFRvMjRIb3VyID0gZnVuY3Rpb24gKGhvdXJzOiBudW1iZXIsIHBtOiBib29sZWFuKSB7XG4gICAgICAgIGlmICh0aGlzLmhvdXJGb3JtYXQgPT0gJzEyJykge1xuICAgICAgICAgICAgaWYgKGhvdXJzID09PSAxMikge1xuICAgICAgICAgICAgICAgIHJldHVybiAocG0gPyAxMiA6IDApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKHBtID8gaG91cnMgKyAxMiA6IGhvdXJzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaG91cnM7XG4gICAgfVxuXG4gICAgdmFsaWRhdGVUaW1lKGhvdXI6IG51bWJlciwgbWludXRlOiBudW1iZXIsIHNlY29uZDogbnVtYmVyLCBwbTogYm9vbGVhbikge1xuICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLnZhbHVlO1xuICAgICAgICBjb25zdCBjb252ZXJ0ZWRIb3VyID0gdGhpcy5jb252ZXJ0VG8yNEhvdXIoaG91ciwgcG0pO1xuICAgICAgICBpZiAodGhpcy5pc1JhbmdlU2VsZWN0aW9uKCkpIHtcbiAgICAgICAgICAgIHZhbHVlID0gdGhpcy52YWx1ZVsxXSB8fCB0aGlzLnZhbHVlWzBdO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmlzTXVsdGlwbGVTZWxlY3Rpb24oKSkge1xuICAgICAgICAgICAgdmFsdWUgPSB0aGlzLnZhbHVlW3RoaXMudmFsdWUubGVuZ3RoIC0gMV07XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdmFsdWVEYXRlU3RyaW5nID0gdmFsdWUgPyB2YWx1ZS50b0RhdGVTdHJpbmcoKSA6IG51bGw7XG4gICAgICAgIGlmICh0aGlzLm1pbkRhdGUgJiYgdmFsdWVEYXRlU3RyaW5nICYmIHRoaXMubWluRGF0ZS50b0RhdGVTdHJpbmcoKSA9PT0gdmFsdWVEYXRlU3RyaW5nKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5taW5EYXRlLmdldEhvdXJzKCkgPiBjb252ZXJ0ZWRIb3VyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMubWluRGF0ZS5nZXRIb3VycygpID09PSBjb252ZXJ0ZWRIb3VyKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubWluRGF0ZS5nZXRNaW51dGVzKCkgPiBtaW51dGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5taW5EYXRlLmdldE1pbnV0ZXMoKSA9PT0gbWludXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm1pbkRhdGUuZ2V0U2Vjb25kcygpID4gc2Vjb25kKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgaWYgKHRoaXMubWF4RGF0ZSAmJiB2YWx1ZURhdGVTdHJpbmcgJiYgdGhpcy5tYXhEYXRlLnRvRGF0ZVN0cmluZygpID09PSB2YWx1ZURhdGVTdHJpbmcpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm1heERhdGUuZ2V0SG91cnMoKSA8IGNvbnZlcnRlZEhvdXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5tYXhEYXRlLmdldEhvdXJzKCkgPT09IGNvbnZlcnRlZEhvdXIpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tYXhEYXRlLmdldE1pbnV0ZXMoKSA8IG1pbnV0ZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1heERhdGUuZ2V0TWludXRlcygpID09PSBtaW51dGUpIHtcbiAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm1heERhdGUuZ2V0U2Vjb25kcygpIDwgc2Vjb25kKSB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cblxuICAgIGluY3JlbWVudEhvdXIoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgcHJldkhvdXIgPSB0aGlzLmN1cnJlbnRIb3VyO1xuICAgICAgICBsZXQgbmV3SG91ciA9IHRoaXMuY3VycmVudEhvdXIgKyB0aGlzLnN0ZXBIb3VyO1xuICAgICAgICBsZXQgbmV3UE0gPSB0aGlzLnBtO1xuXG4gICAgICAgIGlmICh0aGlzLmhvdXJGb3JtYXQgPT0gJzI0JylcbiAgICAgICAgICAgIG5ld0hvdXIgPSAobmV3SG91ciA+PSAyNCkgPyAobmV3SG91ciAtIDI0KSA6IG5ld0hvdXI7XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuaG91ckZvcm1hdCA9PSAnMTInKSB7XG4gICAgICAgICAgICAvLyBCZWZvcmUgdGhlIEFNL1BNIGJyZWFrLCBub3cgYWZ0ZXJcbiAgICAgICAgICAgIGlmIChwcmV2SG91ciA8IDEyICYmIG5ld0hvdXIgPiAxMSkge1xuICAgICAgICAgICAgICAgIG5ld1BNPSAhdGhpcy5wbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5ld0hvdXIgPSAobmV3SG91ciA+PSAxMykgPyAobmV3SG91ciAtIDEyKSA6IG5ld0hvdXI7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy52YWxpZGF0ZVRpbWUobmV3SG91ciwgdGhpcy5jdXJyZW50TWludXRlLCB0aGlzLmN1cnJlbnRTZWNvbmQsIG5ld1BNKSkge1xuICAgICAgICAgIHRoaXMuY3VycmVudEhvdXIgPSBuZXdIb3VyO1xuICAgICAgICAgIHRoaXMucG0gPSBuZXdQTTtcbiAgICAgICAgfVxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIG9uVGltZVBpY2tlckVsZW1lbnRNb3VzZURvd24oZXZlbnQ6IEV2ZW50LCB0eXBlOiBudW1iZXIsIGRpcmVjdGlvbjogbnVtYmVyKSB7XG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5yZXBlYXQoZXZlbnQsIG51bGwsIHR5cGUsIGRpcmVjdGlvbik7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25UaW1lUGlja2VyRWxlbWVudE1vdXNlVXAoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5jbGVhclRpbWVQaWNrZXJUaW1lcigpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVUaW1lKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblRpbWVQaWNrZXJFbGVtZW50TW91c2VPdXQoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlZCAmJiB0aGlzLnRpbWVQaWNrZXJUaW1lcikge1xuICAgICAgICAgICAgdGhpcy5jbGVhclRpbWVQaWNrZXJUaW1lcigpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVUaW1lKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXBlYXQoZXZlbnQ6IEV2ZW50LCBpbnRlcnZhbDogbnVtYmVyLCB0eXBlOiBudW1iZXIsIGRpcmVjdGlvbjogbnVtYmVyKSB7XG4gICAgICAgIGxldCBpID0gaW50ZXJ2YWx8fDUwMDtcblxuICAgICAgICB0aGlzLmNsZWFyVGltZVBpY2tlclRpbWVyKCk7XG4gICAgICAgIHRoaXMudGltZVBpY2tlclRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlcGVhdChldmVudCwgMTAwLCB0eXBlLCBkaXJlY3Rpb24pO1xuICAgICAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfSwgaSk7XG5cbiAgICAgICAgc3dpdGNoKHR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICBpZiAoZGlyZWN0aW9uID09PSAxKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmluY3JlbWVudEhvdXIoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWNyZW1lbnRIb3VyKGV2ZW50KTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gMSlcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmNyZW1lbnRNaW51dGUoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWNyZW1lbnRNaW51dGUoZXZlbnQpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICBpZiAoZGlyZWN0aW9uID09PSAxKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmluY3JlbWVudFNlY29uZChldmVudCk7XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlY3JlbWVudFNlY29uZChldmVudCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudXBkYXRlSW5wdXRmaWVsZCgpO1xuICAgIH1cblxuICAgIGNsZWFyVGltZVBpY2tlclRpbWVyKCkge1xuICAgICAgICBpZiAodGhpcy50aW1lUGlja2VyVGltZXIpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVQaWNrZXJUaW1lcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkZWNyZW1lbnRIb3VyKGV2ZW50KSB7XG4gICAgICAgIGxldCBuZXdIb3VyID0gdGhpcy5jdXJyZW50SG91ciAtIHRoaXMuc3RlcEhvdXI7XG4gICAgICAgIGxldCBuZXdQTSA9IHRoaXMucG1cblxuICAgICAgICBpZiAodGhpcy5ob3VyRm9ybWF0ID09ICcyNCcpXG4gICAgICAgICAgICBuZXdIb3VyID0gKG5ld0hvdXIgPCAwKSA/ICgyNCArIG5ld0hvdXIpIDogbmV3SG91cjtcbiAgICAgICAgZWxzZSBpZiAodGhpcy5ob3VyRm9ybWF0ID09ICcxMicpIHtcbiAgICAgICAgICAgIC8vIElmIHdlIHdlcmUgYXQgbm9vbi9taWRuaWdodCwgdGhlbiBzd2l0Y2hcbiAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRIb3VyID09PSAxMikge1xuICAgICAgICAgICAgICAgIG5ld1BNID0gIXRoaXMucG07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuZXdIb3VyID0gKG5ld0hvdXIgPD0gMCkgPyAoMTIgKyBuZXdIb3VyKSA6IG5ld0hvdXI7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy52YWxpZGF0ZVRpbWUobmV3SG91ciwgdGhpcy5jdXJyZW50TWludXRlLCB0aGlzLmN1cnJlbnRTZWNvbmQsIG5ld1BNKSkge1xuICAgICAgICAgIHRoaXMuY3VycmVudEhvdXIgPSBuZXdIb3VyO1xuICAgICAgICAgIHRoaXMucG0gPSBuZXdQTTtcbiAgICAgICAgfVxuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgaW5jcmVtZW50TWludXRlKGV2ZW50KSB7XG4gICAgICAgIGxldCBuZXdNaW51dGUgPSB0aGlzLmN1cnJlbnRNaW51dGUgKyB0aGlzLnN0ZXBNaW51dGU7XG4gICAgICAgIG5ld01pbnV0ZSA9IChuZXdNaW51dGUgPiA1OSkgPyBuZXdNaW51dGUgLSA2MCA6IG5ld01pbnV0ZTtcbiAgICAgICAgaWYgKHRoaXMudmFsaWRhdGVUaW1lKHRoaXMuY3VycmVudEhvdXIsIG5ld01pbnV0ZSwgdGhpcy5jdXJyZW50U2Vjb25kLCB0aGlzLnBtKSkge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50TWludXRlID0gbmV3TWludXRlO1xuICAgICAgICB9XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBkZWNyZW1lbnRNaW51dGUoZXZlbnQpIHtcbiAgICAgICAgbGV0IG5ld01pbnV0ZSA9IHRoaXMuY3VycmVudE1pbnV0ZSAtIHRoaXMuc3RlcE1pbnV0ZTtcbiAgICAgICAgbmV3TWludXRlID0gKG5ld01pbnV0ZSA8IDApID8gNjAgKyBuZXdNaW51dGUgOiBuZXdNaW51dGU7XG4gICAgICAgIGlmICh0aGlzLnZhbGlkYXRlVGltZSh0aGlzLmN1cnJlbnRIb3VyLCBuZXdNaW51dGUsIHRoaXMuY3VycmVudFNlY29uZCwgdGhpcy5wbSkpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudE1pbnV0ZSA9IG5ld01pbnV0ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgaW5jcmVtZW50U2Vjb25kKGV2ZW50KSB7XG4gICAgICAgIGxldCBuZXdTZWNvbmQgPSB0aGlzLmN1cnJlbnRTZWNvbmQgKyB0aGlzLnN0ZXBTZWNvbmQ7XG4gICAgICAgIG5ld1NlY29uZCA9IChuZXdTZWNvbmQgPiA1OSkgPyBuZXdTZWNvbmQgLSA2MCA6IG5ld1NlY29uZDtcbiAgICAgICAgaWYgKHRoaXMudmFsaWRhdGVUaW1lKHRoaXMuY3VycmVudEhvdXIsIHRoaXMuY3VycmVudE1pbnV0ZSwgbmV3U2Vjb25kLCB0aGlzLnBtKSkge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50U2Vjb25kID0gbmV3U2Vjb25kO1xuICAgICAgICB9XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBkZWNyZW1lbnRTZWNvbmQoZXZlbnQpIHtcbiAgICAgICAgbGV0IG5ld1NlY29uZCA9IHRoaXMuY3VycmVudFNlY29uZCAtIHRoaXMuc3RlcFNlY29uZDtcbiAgICAgICAgbmV3U2Vjb25kID0gKG5ld1NlY29uZCA8IDApID8gNjAgKyBuZXdTZWNvbmQgOiBuZXdTZWNvbmQ7XG4gICAgICAgIGlmICh0aGlzLnZhbGlkYXRlVGltZSh0aGlzLmN1cnJlbnRIb3VyLCB0aGlzLmN1cnJlbnRNaW51dGUsIG5ld1NlY29uZCwgdGhpcy5wbSkpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFNlY29uZCA9IG5ld1NlY29uZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgdXBkYXRlVGltZSgpIHtcbiAgICAgICAgbGV0IHZhbHVlID0gdGhpcy52YWx1ZTtcbiAgICAgICAgaWYgKHRoaXMuaXNSYW5nZVNlbGVjdGlvbigpKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IHRoaXMudmFsdWVbMV0gfHwgdGhpcy52YWx1ZVswXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5pc011bHRpcGxlU2VsZWN0aW9uKCkpIHtcbiAgICAgICAgICAgIHZhbHVlID0gdGhpcy52YWx1ZVt0aGlzLnZhbHVlLmxlbmd0aCAtIDFdO1xuICAgICAgICB9XG4gICAgICAgIHZhbHVlID0gdmFsdWUgPyBuZXcgRGF0ZSh2YWx1ZS5nZXRUaW1lKCkpIDogbmV3IERhdGUoKTtcblxuICAgICAgICBpZiAodGhpcy5ob3VyRm9ybWF0ID09ICcxMicpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRIb3VyID09PSAxMilcbiAgICAgICAgICAgICAgICB2YWx1ZS5zZXRIb3Vycyh0aGlzLnBtID8gMTIgOiAwKTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICB2YWx1ZS5zZXRIb3Vycyh0aGlzLnBtID8gdGhpcy5jdXJyZW50SG91ciArIDEyIDogdGhpcy5jdXJyZW50SG91cik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YWx1ZS5zZXRIb3Vycyh0aGlzLmN1cnJlbnRIb3VyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhbHVlLnNldE1pbnV0ZXModGhpcy5jdXJyZW50TWludXRlKTtcbiAgICAgICAgdmFsdWUuc2V0U2Vjb25kcyh0aGlzLmN1cnJlbnRTZWNvbmQpO1xuICAgICAgICBpZiAodGhpcy5pc1JhbmdlU2VsZWN0aW9uKCkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnZhbHVlWzFdKVxuICAgICAgICAgICAgICAgIHZhbHVlID0gW3RoaXMudmFsdWVbMF0sIHZhbHVlXTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IFt2YWx1ZSwgbnVsbF07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5pc011bHRpcGxlU2VsZWN0aW9uKCkpe1xuICAgICAgICAgICAgdmFsdWUgPSBbLi4udGhpcy52YWx1ZS5zbGljZSgwLCAtMSksIHZhbHVlXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudXBkYXRlTW9kZWwodmFsdWUpO1xuICAgICAgICB0aGlzLm9uU2VsZWN0LmVtaXQodmFsdWUpO1xuICAgICAgICB0aGlzLnVwZGF0ZUlucHV0ZmllbGQoKTtcbiAgICB9XG5cbiAgICB0b2dnbGVBTVBNKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IG5ld1BNID0gIXRoaXMucG07XG4gICAgICAgIGlmICh0aGlzLnZhbGlkYXRlVGltZSh0aGlzLmN1cnJlbnRIb3VyLCB0aGlzLmN1cnJlbnRNaW51dGUsIHRoaXMuY3VycmVudFNlY29uZCwgbmV3UE0pKSB7XG4gICAgICAgICAgdGhpcy5wbSA9IG5ld1BNO1xuICAgICAgICAgIHRoaXMudXBkYXRlVGltZSgpO1xuICAgICAgICB9XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgb25Vc2VySW5wdXQoZXZlbnQpIHtcbiAgICAgICAgLy8gSUUgMTEgV29ya2Fyb3VuZCBmb3IgaW5wdXQgcGxhY2Vob2xkZXIgOiBodHRwczovL2dpdGh1Yi5jb20vcHJpbWVmYWNlcy9wcmltZW5nL2lzc3Vlcy8yMDI2XG4gICAgICAgIGlmICghdGhpcy5pc0tleWRvd24pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmlzS2V5ZG93biA9IGZhbHNlO1xuXG4gICAgICAgIGxldCB2YWwgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLnBhcnNlVmFsdWVGcm9tU3RyaW5nKHZhbCk7XG4gICAgICAgICAgICBpZiAodGhpcy5pc1ZhbGlkU2VsZWN0aW9uKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlTW9kZWwodmFsdWUpO1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVUkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaChlcnIpIHtcbiAgICAgICAgICAgIC8vaW52YWxpZCBkYXRlXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU1vZGVsKG51bGwpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5maWxsZWQgPSB2YWwgIT0gbnVsbCAmJiB2YWwubGVuZ3RoO1xuICAgICAgICB0aGlzLm9uSW5wdXQuZW1pdChldmVudCk7XG4gICAgfVxuXG4gICAgaXNWYWxpZFNlbGVjdGlvbih2YWx1ZSk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgaXNWYWxpZCA9IHRydWU7XG4gICAgICAgIGlmICh0aGlzLmlzU2luZ2xlU2VsZWN0aW9uKCkpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5pc1NlbGVjdGFibGUodmFsdWUuZ2V0RGF0ZSgpLCB2YWx1ZS5nZXRNb250aCgpLCB2YWx1ZS5nZXRGdWxsWWVhcigpLCBmYWxzZSkpIHtcbiAgICAgICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodmFsdWUuZXZlcnkodiA9PiB0aGlzLmlzU2VsZWN0YWJsZSh2LmdldERhdGUoKSwgdi5nZXRNb250aCgpLCB2LmdldEZ1bGxZZWFyKCksIGZhbHNlKSkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzUmFuZ2VTZWxlY3Rpb24oKSkge1xuICAgICAgICAgICAgICAgIGlzVmFsaWQgPSB2YWx1ZS5sZW5ndGggPiAxICYmIHZhbHVlWzFdID4gdmFsdWVbMF0gPyB0cnVlIDogZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGlzVmFsaWQ7XG4gICAgfVxuXG4gICAgcGFyc2VWYWx1ZUZyb21TdHJpbmcodGV4dDogc3RyaW5nKTogRGF0ZSB8IERhdGVbXXtcbiAgICAgICAgaWYgKCF0ZXh0IHx8IHRleHQudHJpbSgpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgdmFsdWU6IGFueTtcblxuICAgICAgICBpZiAodGhpcy5pc1NpbmdsZVNlbGVjdGlvbigpKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IHRoaXMucGFyc2VEYXRlVGltZSh0ZXh0KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmlzTXVsdGlwbGVTZWxlY3Rpb24oKSkge1xuICAgICAgICAgICAgbGV0IHRva2VucyA9IHRleHQuc3BsaXQodGhpcy5tdWx0aXBsZVNlcGFyYXRvcik7XG4gICAgICAgICAgICB2YWx1ZSA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgdG9rZW4gb2YgdG9rZW5zKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUucHVzaCh0aGlzLnBhcnNlRGF0ZVRpbWUodG9rZW4udHJpbSgpKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5pc1JhbmdlU2VsZWN0aW9uKCkpIHtcbiAgICAgICAgICAgIGxldCB0b2tlbnMgPSB0ZXh0LnNwbGl0KCcgJyt0aGlzLnJhbmdlU2VwYXJhdG9yICsnICcpO1xuICAgICAgICAgICAgdmFsdWUgPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdG9rZW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFsdWVbaV0gPSB0aGlzLnBhcnNlRGF0ZVRpbWUodG9rZW5zW2ldLnRyaW0oKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgcGFyc2VEYXRlVGltZSh0ZXh0KTogRGF0ZSB7XG4gICAgICAgIGxldCBkYXRlOiBEYXRlO1xuICAgICAgICBsZXQgcGFydHM6IHN0cmluZ1tdID0gdGV4dC5zcGxpdCgnICcpO1xuXG4gICAgICAgIGlmICh0aGlzLnRpbWVPbmx5KSB7XG4gICAgICAgICAgICBkYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgIHRoaXMucG9wdWxhdGVUaW1lKGRhdGUsIHBhcnRzWzBdLCBwYXJ0c1sxXSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBkYXRlRm9ybWF0ID0gdGhpcy5nZXREYXRlRm9ybWF0KCk7XG4gICAgICAgICAgICBpZiAodGhpcy5zaG93VGltZSkge1xuICAgICAgICAgICAgICAgIGxldCBhbXBtID0gdGhpcy5ob3VyRm9ybWF0ID09ICcxMicgPyBwYXJ0cy5wb3AoKSA6IG51bGw7XG4gICAgICAgICAgICAgICAgbGV0IHRpbWVTdHJpbmcgPSBwYXJ0cy5wb3AoKTtcblxuICAgICAgICAgICAgICAgIGRhdGUgPSB0aGlzLnBhcnNlRGF0ZShwYXJ0cy5qb2luKCcgJyksIGRhdGVGb3JtYXQpO1xuICAgICAgICAgICAgICAgIHRoaXMucG9wdWxhdGVUaW1lKGRhdGUsIHRpbWVTdHJpbmcsIGFtcG0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgIGRhdGUgPSB0aGlzLnBhcnNlRGF0ZSh0ZXh0LCBkYXRlRm9ybWF0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkYXRlO1xuICAgIH1cblxuICAgIHBvcHVsYXRlVGltZSh2YWx1ZSwgdGltZVN0cmluZywgYW1wbSkge1xuICAgICAgICBpZiAodGhpcy5ob3VyRm9ybWF0ID09ICcxMicgJiYgIWFtcG0pIHtcbiAgICAgICAgICAgIHRocm93ICdJbnZhbGlkIFRpbWUnO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wbSA9IChhbXBtID09PSAnUE0nIHx8IGFtcG0gPT09ICdwbScpO1xuICAgICAgICBsZXQgdGltZSA9IHRoaXMucGFyc2VUaW1lKHRpbWVTdHJpbmcpO1xuICAgICAgICB2YWx1ZS5zZXRIb3Vycyh0aW1lLmhvdXIpO1xuICAgICAgICB2YWx1ZS5zZXRNaW51dGVzKHRpbWUubWludXRlKTtcbiAgICAgICAgdmFsdWUuc2V0U2Vjb25kcyh0aW1lLnNlY29uZCk7XG4gICAgfVxuXG4gICAgdXBkYXRlVUkoKSB7XG4gICAgICAgIGxldCB2YWwgPSB0aGlzLnZhbHVlfHx0aGlzLmRlZmF1bHREYXRlfHxuZXcgRGF0ZSgpO1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWwpKXtcbiAgICAgICAgICAgIHZhbCA9IHZhbFswXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY3VycmVudE1vbnRoID0gdmFsLmdldE1vbnRoKCk7XG4gICAgICAgIHRoaXMuY3VycmVudFllYXIgPSB2YWwuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgdGhpcy5jcmVhdGVNb250aHModGhpcy5jdXJyZW50TW9udGgsIHRoaXMuY3VycmVudFllYXIpO1xuXG4gICAgICAgIGlmICh0aGlzLnNob3dUaW1lfHx0aGlzLnRpbWVPbmx5KSB7XG4gICAgICAgICAgICB0aGlzLnNldEN1cnJlbnRIb3VyUE0odmFsLmdldEhvdXJzKCkpO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50TWludXRlID0gdmFsLmdldE1pbnV0ZXMoKTtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFNlY29uZCA9IHZhbC5nZXRTZWNvbmRzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG93T3ZlcmxheSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLm92ZXJsYXlWaXNpYmxlKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVVJKCk7XG4gICAgICAgICAgICB0aGlzLm92ZXJsYXlWaXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhpZGVPdmVybGF5KCkge1xuICAgICAgICB0aGlzLm92ZXJsYXlWaXNpYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY2xlYXJUaW1lUGlja2VyVGltZXIoKTtcblxuICAgICAgICBpZiAodGhpcy50b3VjaFVJKSB7XG4gICAgICAgICAgICB0aGlzLmRpc2FibGVNb2RhbGl0eSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICB0b2dnbGUoKSB7XG4gICAgICAgIGlmICghdGhpcy5pbmxpbmUpe1xuICAgICAgICAgICAgaWYgKCF0aGlzLm92ZXJsYXlWaXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93T3ZlcmxheSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuaW5wdXRmaWVsZFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGVPdmVybGF5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbk92ZXJsYXlBbmltYXRpb25TdGFydChldmVudDogQW5pbWF0aW9uRXZlbnQpIHtcbiAgICAgICAgc3dpdGNoIChldmVudC50b1N0YXRlKSB7XG4gICAgICAgICAgICBjYXNlICd2aXNpYmxlJzpcbiAgICAgICAgICAgIGNhc2UgJ3Zpc2libGVUb3VjaFVJJzpcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaW5saW5lKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3ZlcmxheSA9IGV2ZW50LmVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwZW5kT3ZlcmxheSgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hdXRvWkluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm92ZXJsYXkuc3R5bGUuekluZGV4ID0gU3RyaW5nKHRoaXMuYmFzZVpJbmRleCArICgrK0RvbUhhbmRsZXIuemluZGV4KSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbGlnbk92ZXJsYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vblNob3cuZW1pdChldmVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ3ZvaWQnOlxuICAgICAgICAgICAgICAgIHRoaXMub25PdmVybGF5SGlkZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMub25DbG9zZS5lbWl0KGV2ZW50KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25PdmVybGF5QW5pbWF0aW9uRG9uZShldmVudDogQW5pbWF0aW9uRXZlbnQpIHtcbiAgICAgICAgc3dpdGNoIChldmVudC50b1N0YXRlKSB7XG4gICAgICAgICAgICBjYXNlICd2aXNpYmxlJzpcbiAgICAgICAgICAgIGNhc2UgJ3Zpc2libGVUb3VjaFVJJzpcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaW5saW5lKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmluZERvY3VtZW50Q2xpY2tMaXN0ZW5lcigpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJpbmREb2N1bWVudFJlc2l6ZUxpc3RlbmVyKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmluZFNjcm9sbExpc3RlbmVyKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhcHBlbmRPdmVybGF5KCkge1xuICAgICAgICBpZiAodGhpcy5hcHBlbmRUbykge1xuICAgICAgICAgICAgaWYgKHRoaXMuYXBwZW5kVG8gPT09ICdib2R5JylcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMub3ZlcmxheSk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgRG9tSGFuZGxlci5hcHBlbmRDaGlsZCh0aGlzLm92ZXJsYXksIHRoaXMuYXBwZW5kVG8pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVzdG9yZU92ZXJsYXlBcHBlbmQoKSB7XG4gICAgICAgIGlmICh0aGlzLm92ZXJsYXkgJiYgdGhpcy5hcHBlbmRUbykge1xuICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMub3ZlcmxheSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhbGlnbk92ZXJsYXkoKSB7XG4gICAgICAgIGlmICh0aGlzLnRvdWNoVUkpIHtcbiAgICAgICAgICAgIHRoaXMuZW5hYmxlTW9kYWxpdHkodGhpcy5vdmVybGF5KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmFwcGVuZFRvKVxuICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuYWJzb2x1dGVQb3NpdGlvbih0aGlzLm92ZXJsYXksIHRoaXMuaW5wdXRmaWVsZFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBEb21IYW5kbGVyLnJlbGF0aXZlUG9zaXRpb24odGhpcy5vdmVybGF5LCB0aGlzLmlucHV0ZmllbGRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBlbmFibGVNb2RhbGl0eShlbGVtZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5tYXNrKSB7XG4gICAgICAgICAgICB0aGlzLm1hc2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRoaXMubWFzay5zdHlsZS56SW5kZXggPSBTdHJpbmcocGFyc2VJbnQoZWxlbWVudC5zdHlsZS56SW5kZXgpIC0gMSk7XG4gICAgICAgICAgICBsZXQgbWFza1N0eWxlQ2xhc3MgPSAncC1jb21wb25lbnQtb3ZlcmxheSBwLWRhdGVwaWNrZXItbWFzayBwLWRhdGVwaWNrZXItbWFzay1zY3JvbGxibG9ja2VyJztcbiAgICAgICAgICAgIERvbUhhbmRsZXIuYWRkTXVsdGlwbGVDbGFzc2VzKHRoaXMubWFzaywgbWFza1N0eWxlQ2xhc3MpO1xuXG5cdFx0XHR0aGlzLm1hc2tDbGlja0xpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4odGhpcy5tYXNrLCAnY2xpY2snLCAoZXZlbnQ6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzYWJsZU1vZGFsaXR5KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5tYXNrKTtcbiAgICAgICAgICAgIERvbUhhbmRsZXIuYWRkQ2xhc3MoZG9jdW1lbnQuYm9keSwgJ3Atb3ZlcmZsb3ctaGlkZGVuJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkaXNhYmxlTW9kYWxpdHkoKSB7XG4gICAgICAgIGlmICh0aGlzLm1hc2spIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQodGhpcy5tYXNrKTtcbiAgICAgICAgICAgIGxldCBib2R5Q2hpbGRyZW4gPSBkb2N1bWVudC5ib2R5LmNoaWxkcmVuO1xuICAgICAgICAgICAgbGV0IGhhc0Jsb2NrZXJNYXNrczogYm9vbGVhbjtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYm9keUNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IGJvZHlDaGlsZCA9IGJvZHlDaGlsZHJlbltpXTtcbiAgICAgICAgICAgICAgICBpZiAoRG9tSGFuZGxlci5oYXNDbGFzcyhib2R5Q2hpbGQsICdwLWRhdGVwaWNrZXItbWFzay1zY3JvbGxibG9ja2VyJykpIHtcbiAgICAgICAgICAgICAgICAgICAgaGFzQmxvY2tlck1hc2tzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIWhhc0Jsb2NrZXJNYXNrcykge1xuICAgICAgICAgICAgICAgIERvbUhhbmRsZXIucmVtb3ZlQ2xhc3MoZG9jdW1lbnQuYm9keSwgJ3Atb3ZlcmZsb3ctaGlkZGVuJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMudW5iaW5kTWFza0NsaWNrTGlzdGVuZXIoKTtcblxuICAgICAgICAgICAgdGhpcy5tYXNrID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVuYmluZE1hc2tDbGlja0xpc3RlbmVyKCkge1xuICAgICAgICBpZiAodGhpcy5tYXNrQ2xpY2tMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5tYXNrQ2xpY2tMaXN0ZW5lcigpO1xuICAgICAgICAgICAgdGhpcy5tYXNrQ2xpY2tMaXN0ZW5lciA9IG51bGw7XG5cdFx0fVxuICAgIH1cblxuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSkgOiB2b2lkIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICBpZiAodGhpcy52YWx1ZSAmJiB0eXBlb2YgdGhpcy52YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLnBhcnNlVmFsdWVGcm9tU3RyaW5nKHRoaXMudmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy51cGRhdGVJbnB1dGZpZWxkKCk7XG4gICAgICAgIHRoaXMudXBkYXRlVUkoKTtcbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UgPSBmbjtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbk1vZGVsVG91Y2hlZCA9IGZuO1xuICAgIH1cblxuICAgIHNldERpc2FibGVkU3RhdGUodmFsOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSB2YWw7XG4gICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgZ2V0RGF0ZUZvcm1hdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZUZvcm1hdDtcbiAgICB9XG5cbiAgICAvLyBQb3J0ZWQgZnJvbSBqcXVlcnktdWkgZGF0ZXBpY2tlciBmb3JtYXREYXRlXG4gICAgZm9ybWF0RGF0ZShkYXRlLCBmb3JtYXQpIHtcbiAgICAgICAgaWYgKCFkYXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaUZvcm1hdDtcbiAgICAgICAgY29uc3QgbG9va0FoZWFkID0gKG1hdGNoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBtYXRjaGVzID0gKGlGb3JtYXQgKyAxIDwgZm9ybWF0Lmxlbmd0aCAmJiBmb3JtYXQuY2hhckF0KGlGb3JtYXQgKyAxKSA9PT0gbWF0Y2gpO1xuICAgICAgICAgICAgaWYgKG1hdGNoZXMpIHtcbiAgICAgICAgICAgICAgICBpRm9ybWF0Kys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbWF0Y2hlcztcbiAgICAgICAgfSxcbiAgICAgICAgICAgIGZvcm1hdE51bWJlciA9IChtYXRjaCwgdmFsdWUsIGxlbikgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBudW0gPSAnJyArIHZhbHVlO1xuICAgICAgICAgICAgICAgIGlmIChsb29rQWhlYWQobWF0Y2gpKSB7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChudW0ubGVuZ3RoIDwgbGVuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBudW0gPSAnMCcgKyBudW07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmb3JtYXROYW1lID0gKG1hdGNoLCB2YWx1ZSwgc2hvcnROYW1lcywgbG9uZ05hbWVzKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChsb29rQWhlYWQobWF0Y2gpID8gbG9uZ05hbWVzW3ZhbHVlXSA6IHNob3J0TmFtZXNbdmFsdWVdKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIGxldCBvdXRwdXQgPSAnJztcbiAgICAgICAgbGV0IGxpdGVyYWwgPSBmYWxzZTtcblxuICAgICAgICBpZiAoZGF0ZSkge1xuICAgICAgICAgICAgZm9yIChpRm9ybWF0ID0gMDsgaUZvcm1hdCA8IGZvcm1hdC5sZW5ndGg7IGlGb3JtYXQrKykge1xuICAgICAgICAgICAgICAgIGlmIChsaXRlcmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmb3JtYXQuY2hhckF0KGlGb3JtYXQpID09PSAnXFwnJyAmJiAhbG9va0FoZWFkKCdcXCcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGl0ZXJhbCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0ICs9IGZvcm1hdC5jaGFyQXQoaUZvcm1hdCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGZvcm1hdC5jaGFyQXQoaUZvcm1hdCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2QnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dCArPSBmb3JtYXROdW1iZXIoJ2QnLCBkYXRlLmdldERhdGUoKSwgMik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdEJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXQgKz0gZm9ybWF0TmFtZSgnRCcsIGRhdGUuZ2V0RGF5KCksIHRoaXMuZ2V0VHJhbnNsYXRpb24oVHJhbnNsYXRpb25LZXlzLkRBWV9OQU1FU19TSE9SVCksIHRoaXMuZ2V0VHJhbnNsYXRpb24oVHJhbnNsYXRpb25LZXlzLkRBWV9OQU1FUykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnbyc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0ICs9IGZvcm1hdE51bWJlcignbycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5yb3VuZCgoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBEYXRlKGRhdGUuZ2V0RnVsbFllYXIoKSwgZGF0ZS5nZXRNb250aCgpLCBkYXRlLmdldERhdGUoKSkuZ2V0VGltZSgpIC1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IERhdGUoZGF0ZS5nZXRGdWxsWWVhcigpLCAwLCAwKS5nZXRUaW1lKCkpIC8gODY0MDAwMDApLCAzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ20nOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dCArPSBmb3JtYXROdW1iZXIoJ20nLCBkYXRlLmdldE1vbnRoKCkgKyAxLCAyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ00nOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dCArPSBmb3JtYXROYW1lKCdNJyxkYXRlLmdldE1vbnRoKCksIHRoaXMuZ2V0VHJhbnNsYXRpb24oVHJhbnNsYXRpb25LZXlzLk1PTlRIX05BTUVTX1NIT1JUKSwgdGhpcy5nZXRUcmFuc2xhdGlvbihUcmFuc2xhdGlvbktleXMuTU9OVEhfTkFNRVMpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3knOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dCArPSBsb29rQWhlYWQoJ3knKSA/IGRhdGUuZ2V0RnVsbFllYXIoKSA6IChkYXRlLmdldEZ1bGxZZWFyKCkgJSAxMDAgPCAxMCA/ICcwJyA6ICcnKSArIChkYXRlLmdldEZ1bGxZZWFyKCkgJSAxMDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnQCc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0ICs9IGRhdGUuZ2V0VGltZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnISc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0ICs9IGRhdGUuZ2V0VGltZSgpICogMTAwMDAgKyB0aGlzLnRpY2tzVG8xOTcwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnXFwnJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobG9va0FoZWFkKCdcXCcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXQgKz0gJ1xcJyc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGl0ZXJhbCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXQgKz0gZm9ybWF0LmNoYXJBdChpRm9ybWF0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3V0cHV0O1xuICAgIH1cblxuICAgIGZvcm1hdFRpbWUoZGF0ZSkge1xuICAgICAgICBpZiAoIWRhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBvdXRwdXQgPSAnJztcbiAgICAgICAgbGV0IGhvdXJzID0gZGF0ZS5nZXRIb3VycygpO1xuICAgICAgICBsZXQgbWludXRlcyA9IGRhdGUuZ2V0TWludXRlcygpO1xuICAgICAgICBsZXQgc2Vjb25kcyA9IGRhdGUuZ2V0U2Vjb25kcygpO1xuXG4gICAgICAgIGlmICh0aGlzLmhvdXJGb3JtYXQgPT0gJzEyJyAmJiBob3VycyA+IDExICYmIGhvdXJzICE9IDEyKSB7XG4gICAgICAgICAgICBob3Vycy09MTI7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5ob3VyRm9ybWF0ID09ICcxMicpIHtcbiAgICAgICAgICAgIG91dHB1dCArPSBob3VycyA9PT0gMCA/IDEyIDogKGhvdXJzIDwgMTApID8gJzAnICsgaG91cnMgOiBob3VycztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG91dHB1dCArPSAoaG91cnMgPCAxMCkgPyAnMCcgKyBob3VycyA6IGhvdXJzO1xuICAgICAgICB9XG4gICAgICAgIG91dHB1dCArPSAnOic7XG4gICAgICAgIG91dHB1dCArPSAobWludXRlcyA8IDEwKSA/ICcwJyArIG1pbnV0ZXMgOiBtaW51dGVzO1xuXG4gICAgICAgIGlmICh0aGlzLnNob3dTZWNvbmRzKSB7XG4gICAgICAgICAgICBvdXRwdXQgKz0gJzonO1xuICAgICAgICAgICAgb3V0cHV0ICs9IChzZWNvbmRzIDwgMTApID8gJzAnICsgc2Vjb25kcyA6IHNlY29uZHM7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5ob3VyRm9ybWF0ID09ICcxMicpIHtcbiAgICAgICAgICAgIG91dHB1dCArPSBkYXRlLmdldEhvdXJzKCkgPiAxMSA/ICcgUE0nIDogJyBBTSc7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb3V0cHV0O1xuICAgIH1cblxuICAgIHBhcnNlVGltZSh2YWx1ZSkge1xuICAgICAgICBsZXQgdG9rZW5zOiBzdHJpbmdbXSA9IHZhbHVlLnNwbGl0KCc6Jyk7XG4gICAgICAgIGxldCB2YWxpZFRva2VuTGVuZ3RoID0gdGhpcy5zaG93U2Vjb25kcyA/IDMgOiAyO1xuXG4gICAgICAgIGlmICh0b2tlbnMubGVuZ3RoICE9PSB2YWxpZFRva2VuTGVuZ3RoKSB7XG4gICAgICAgICAgICB0aHJvdyBcIkludmFsaWQgdGltZVwiO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGggPSBwYXJzZUludCh0b2tlbnNbMF0pO1xuICAgICAgICBsZXQgbSA9IHBhcnNlSW50KHRva2Vuc1sxXSk7XG4gICAgICAgIGxldCBzID0gdGhpcy5zaG93U2Vjb25kcyA/IHBhcnNlSW50KHRva2Vuc1syXSkgOiBudWxsO1xuXG4gICAgICAgIGlmIChpc05hTihoKSB8fCBpc05hTihtKSB8fCBoID4gMjMgfHwgbSA+IDU5IHx8ICh0aGlzLmhvdXJGb3JtYXQgPT0gJzEyJyAmJiBoID4gMTIpIHx8ICh0aGlzLnNob3dTZWNvbmRzICYmIChpc05hTihzKSB8fCBzID4gNTkpKSkge1xuICAgICAgICAgICAgdGhyb3cgXCJJbnZhbGlkIHRpbWVcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmhvdXJGb3JtYXQgPT0gJzEyJykge1xuICAgICAgICAgICAgICAgIGlmIChoICE9PSAxMiAmJiB0aGlzLnBtKSB7XG4gICAgICAgICAgICAgICAgICAgIGggKz0gMTI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKCF0aGlzLnBtICYmIGggPT09IDEyKSB7XG4gICAgICAgICAgICAgICAgICAgIGggLT0gMTI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4ge2hvdXI6IGgsIG1pbnV0ZTogbSwgc2Vjb25kOiBzfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFBvcnRlZCBmcm9tIGpxdWVyeS11aSBkYXRlcGlja2VyIHBhcnNlRGF0ZVxuICAgIHBhcnNlRGF0ZSh2YWx1ZSwgZm9ybWF0KSB7XG4gICAgICAgIGlmIChmb3JtYXQgPT0gbnVsbCB8fCB2YWx1ZSA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBcIkludmFsaWQgYXJndW1lbnRzXCI7XG4gICAgICAgIH1cblxuICAgICAgICB2YWx1ZSA9ICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgPyB2YWx1ZS50b1N0cmluZygpIDogdmFsdWUgKyBcIlwiKTtcbiAgICAgICAgaWYgKHZhbHVlID09PSBcIlwiKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBpRm9ybWF0LCBkaW0sIGV4dHJhLFxuICAgICAgICBpVmFsdWUgPSAwLFxuICAgICAgICBzaG9ydFllYXJDdXRvZmYgPSAodHlwZW9mIHRoaXMuc2hvcnRZZWFyQ3V0b2ZmICE9PSBcInN0cmluZ1wiID8gdGhpcy5zaG9ydFllYXJDdXRvZmYgOiBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCkgJSAxMDAgKyBwYXJzZUludCh0aGlzLnNob3J0WWVhckN1dG9mZiwgMTApKSxcbiAgICAgICAgeWVhciA9IC0xLFxuICAgICAgICBtb250aCA9IC0xLFxuICAgICAgICBkYXkgPSAtMSxcbiAgICAgICAgZG95ID0gLTEsXG4gICAgICAgIGxpdGVyYWwgPSBmYWxzZSxcbiAgICAgICAgZGF0ZSxcbiAgICAgICAgbG9va0FoZWFkID0gKG1hdGNoKSA9PiB7XG4gICAgICAgICAgICBsZXQgbWF0Y2hlcyA9IChpRm9ybWF0ICsgMSA8IGZvcm1hdC5sZW5ndGggJiYgZm9ybWF0LmNoYXJBdChpRm9ybWF0ICsgMSkgPT09IG1hdGNoKTtcbiAgICAgICAgICAgIGlmIChtYXRjaGVzKSB7XG4gICAgICAgICAgICAgICAgaUZvcm1hdCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG1hdGNoZXM7XG4gICAgICAgIH0sXG4gICAgICAgIGdldE51bWJlciA9IChtYXRjaCkgPT4ge1xuICAgICAgICAgICAgbGV0IGlzRG91YmxlZCA9IGxvb2tBaGVhZChtYXRjaCksXG4gICAgICAgICAgICAgICAgc2l6ZSA9IChtYXRjaCA9PT0gXCJAXCIgPyAxNCA6IChtYXRjaCA9PT0gXCIhXCIgPyAyMCA6XG4gICAgICAgICAgICAgICAgKG1hdGNoID09PSBcInlcIiAmJiBpc0RvdWJsZWQgPyA0IDogKG1hdGNoID09PSBcIm9cIiA/IDMgOiAyKSkpKSxcbiAgICAgICAgICAgICAgICBtaW5TaXplID0gKG1hdGNoID09PSBcInlcIiA/IHNpemUgOiAxKSxcbiAgICAgICAgICAgICAgICBkaWdpdHMgPSBuZXcgUmVnRXhwKFwiXlxcXFxke1wiICsgbWluU2l6ZSArIFwiLFwiICsgc2l6ZSArIFwifVwiKSxcbiAgICAgICAgICAgICAgICBudW0gPSB2YWx1ZS5zdWJzdHJpbmcoaVZhbHVlKS5tYXRjaChkaWdpdHMpO1xuICAgICAgICAgICAgaWYgKCFudW0pIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBcIk1pc3NpbmcgbnVtYmVyIGF0IHBvc2l0aW9uIFwiICsgaVZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaVZhbHVlICs9IG51bVsgMCBdLmxlbmd0aDtcbiAgICAgICAgICAgIHJldHVybiBwYXJzZUludChudW1bIDAgXSwgMTApO1xuICAgICAgICB9LFxuICAgICAgICBnZXROYW1lID0gKG1hdGNoLCBzaG9ydE5hbWVzLCBsb25nTmFtZXMpID0+IHtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IC0xO1xuICAgICAgICAgICAgbGV0IGFyciA9IGxvb2tBaGVhZChtYXRjaCkgPyBsb25nTmFtZXMgOiBzaG9ydE5hbWVzO1xuICAgICAgICAgICAgbGV0IG5hbWVzID0gW107XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbmFtZXMucHVzaChbaSxhcnJbaV1dKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5hbWVzLnNvcnQoKGEsYikgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiAtKGFbIDEgXS5sZW5ndGggLSBiWyAxIF0ubGVuZ3RoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5hbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IG5hbWUgPSBuYW1lc1tpXVsxXTtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUuc3Vic3RyKGlWYWx1ZSwgbmFtZS5sZW5ndGgpLnRvTG93ZXJDYXNlKCkgPT09IG5hbWUudG9Mb3dlckNhc2UoKSkge1xuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IG5hbWVzW2ldWzBdO1xuICAgICAgICAgICAgICAgICAgICBpVmFsdWUgKz0gbmFtZS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpbmRleCArIDE7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93IFwiVW5rbm93biBuYW1lIGF0IHBvc2l0aW9uIFwiICsgaVZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBjaGVja0xpdGVyYWwgPSAoKSA9PiB7XG4gICAgICAgICAgICBpZiAodmFsdWUuY2hhckF0KGlWYWx1ZSkgIT09IGZvcm1hdC5jaGFyQXQoaUZvcm1hdCkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBcIlVuZXhwZWN0ZWQgbGl0ZXJhbCBhdCBwb3NpdGlvbiBcIiArIGlWYWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlWYWx1ZSsrO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmICh0aGlzLnZpZXcgPT09ICdtb250aCcpIHtcbiAgICAgICAgICAgIGRheSA9IDE7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGlGb3JtYXQgPSAwOyBpRm9ybWF0IDwgZm9ybWF0Lmxlbmd0aDsgaUZvcm1hdCsrKSB7XG4gICAgICAgICAgICBpZiAobGl0ZXJhbCkge1xuICAgICAgICAgICAgICAgIGlmIChmb3JtYXQuY2hhckF0KGlGb3JtYXQpID09PSBcIidcIiAmJiAhbG9va0FoZWFkKFwiJ1wiKSkge1xuICAgICAgICAgICAgICAgICAgICBsaXRlcmFsID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tMaXRlcmFsKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGZvcm1hdC5jaGFyQXQoaUZvcm1hdCkpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImRcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGRheSA9IGdldE51bWJlcihcImRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIkRcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldE5hbWUoXCJEXCIsIHRoaXMuZ2V0VHJhbnNsYXRpb24oVHJhbnNsYXRpb25LZXlzLkRBWV9OQU1FU19TSE9SVCksIHRoaXMuZ2V0VHJhbnNsYXRpb24oVHJhbnNsYXRpb25LZXlzLkRBWV9OQU1FUykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJvXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBkb3kgPSBnZXROdW1iZXIoXCJvXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJtXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBtb250aCA9IGdldE51bWJlcihcIm1cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIk1cIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vbnRoID0gZ2V0TmFtZShcIk1cIiwgdGhpcy5nZXRUcmFuc2xhdGlvbihUcmFuc2xhdGlvbktleXMuTU9OVEhfTkFNRVNfU0hPUlQpLCB0aGlzLmdldFRyYW5zbGF0aW9uKFRyYW5zbGF0aW9uS2V5cy5NT05USF9OQU1FUykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ5XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICB5ZWFyID0gZ2V0TnVtYmVyKFwieVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiQFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKGdldE51bWJlcihcIkBcIikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vbnRoID0gZGF0ZS5nZXRNb250aCgpICsgMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRheSA9IGRhdGUuZ2V0RGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCIhXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRlID0gbmV3IERhdGUoKGdldE51bWJlcihcIiFcIikgLSB0aGlzLnRpY2tzVG8xOTcwKSAvIDEwMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb250aCA9IGRhdGUuZ2V0TW9udGgoKSArIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXkgPSBkYXRlLmdldERhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiJ1wiOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxvb2tBaGVhZChcIidcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja0xpdGVyYWwoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGl0ZXJhbCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrTGl0ZXJhbCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpVmFsdWUgPCB2YWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGV4dHJhID0gdmFsdWUuc3Vic3RyKGlWYWx1ZSk7XG4gICAgICAgICAgICBpZiAoIS9eXFxzKy8udGVzdChleHRyYSkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBcIkV4dHJhL3VucGFyc2VkIGNoYXJhY3RlcnMgZm91bmQgaW4gZGF0ZTogXCIgKyBleHRyYTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh5ZWFyID09PSAtMSkge1xuICAgICAgICAgICAgeWVhciA9IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgfSBlbHNlIGlmICh5ZWFyIDwgMTAwKSB7XG4gICAgICAgICAgICB5ZWFyICs9IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKSAtIG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKSAlIDEwMCArXG4gICAgICAgICAgICAgICAgKHllYXIgPD0gc2hvcnRZZWFyQ3V0b2ZmID8gMCA6IC0xMDApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRveSA+IC0xKSB7XG4gICAgICAgICAgICBtb250aCA9IDE7XG4gICAgICAgICAgICBkYXkgPSBkb3k7XG4gICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgICAgZGltID0gdGhpcy5nZXREYXlzQ291bnRJbk1vbnRoKHllYXIsIG1vbnRoIC0gMSk7XG4gICAgICAgICAgICAgICAgaWYgKGRheSA8PSBkaW0pIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG1vbnRoKys7XG4gICAgICAgICAgICAgICAgZGF5IC09IGRpbTtcbiAgICAgICAgICAgIH0gd2hpbGUgKHRydWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgZGF0ZSA9IHRoaXMuZGF5bGlnaHRTYXZpbmdBZGp1c3QobmV3IERhdGUoeWVhciwgbW9udGggLSAxLCBkYXkpKTtcbiAgICAgICAgICAgICAgICBpZiAoZGF0ZS5nZXRGdWxsWWVhcigpICE9PSB5ZWFyIHx8IGRhdGUuZ2V0TW9udGgoKSArIDEgIT09IG1vbnRoIHx8IGRhdGUuZ2V0RGF0ZSgpICE9PSBkYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgXCJJbnZhbGlkIGRhdGVcIjsgLy8gRS5nLiAzMS8wMi8wMFxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGF0ZTtcbiAgICB9XG5cbiAgICBkYXlsaWdodFNhdmluZ0FkanVzdChkYXRlKSB7XG4gICAgICAgIGlmICghZGF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBkYXRlLnNldEhvdXJzKGRhdGUuZ2V0SG91cnMoKSA+IDEyID8gZGF0ZS5nZXRIb3VycygpICsgMiA6IDApO1xuXG4gICAgICAgIHJldHVybiBkYXRlO1xuICAgIH1cblxuICAgIHVwZGF0ZUZpbGxlZFN0YXRlKCkge1xuICAgICAgICB0aGlzLmZpbGxlZCA9IHRoaXMuaW5wdXRGaWVsZFZhbHVlICYmIHRoaXMuaW5wdXRGaWVsZFZhbHVlICE9ICcnO1xuICAgIH1cblxuICAgIG9uVG9kYXlCdXR0b25DbGljayhldmVudCkge1xuICAgICAgICBsZXQgZGF0ZTogRGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIGxldCBkYXRlTWV0YSA9IHtkYXk6IGRhdGUuZ2V0RGF0ZSgpLCBtb250aDogZGF0ZS5nZXRNb250aCgpLCB5ZWFyOiBkYXRlLmdldEZ1bGxZZWFyKCksIG90aGVyTW9udGg6IGRhdGUuZ2V0TW9udGgoKSAhPT0gdGhpcy5jdXJyZW50TW9udGggfHwgZGF0ZS5nZXRGdWxsWWVhcigpICE9PSB0aGlzLmN1cnJlbnRZZWFyLCB0b2RheTogdHJ1ZSwgc2VsZWN0YWJsZTogdHJ1ZX07XG5cbiAgICAgICAgdGhpcy5vbkRhdGVTZWxlY3QoZXZlbnQsIGRhdGVNZXRhKTtcbiAgICAgICAgdGhpcy5vblRvZGF5Q2xpY2suZW1pdChldmVudCk7XG4gICAgfVxuXG4gICAgb25DbGVhckJ1dHRvbkNsaWNrKGV2ZW50KSB7XG4gICAgICAgIHRoaXMudXBkYXRlTW9kZWwobnVsbCk7XG4gICAgICAgIHRoaXMudXBkYXRlSW5wdXRmaWVsZCgpO1xuICAgICAgICB0aGlzLmhpZGVPdmVybGF5KCk7XG4gICAgICAgIHRoaXMub25DbGVhckNsaWNrLmVtaXQoZXZlbnQpO1xuICAgIH1cblxuICAgIGJpbmREb2N1bWVudENsaWNrTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICghdGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZG9jdW1lbnRUYXJnZXQ6IGFueSA9IHRoaXMuZWwgPyB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQub3duZXJEb2N1bWVudCA6ICdkb2N1bWVudCc7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKGRvY3VtZW50VGFyZ2V0LCAnY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNPdXRzaWRlQ2xpY2tlZChldmVudCkgJiYgdGhpcy5vdmVybGF5VmlzaWJsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlT3ZlcmxheSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25DbGlja091dHNpZGUuZW1pdChldmVudCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1bmJpbmREb2N1bWVudENsaWNrTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIoKTtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJpbmREb2N1bWVudFJlc2l6ZUxpc3RlbmVyKCkge1xuICAgICAgICBpZiAoIXRoaXMuZG9jdW1lbnRSZXNpemVMaXN0ZW5lciAmJiAhdGhpcy50b3VjaFVJKSB7XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIgPSB0aGlzLm9uV2luZG93UmVzaXplLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5kb2N1bWVudFJlc2l6ZUxpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVuYmluZERvY3VtZW50UmVzaXplTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIpO1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudFJlc2l6ZUxpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJpbmRTY3JvbGxMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKCF0aGlzLnNjcm9sbEhhbmRsZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsSGFuZGxlciA9IG5ldyBDb25uZWN0ZWRPdmVybGF5U2Nyb2xsSGFuZGxlcih0aGlzLmNvbnRhaW5lclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub3ZlcmxheVZpc2libGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlT3ZlcmxheSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zY3JvbGxIYW5kbGVyLmJpbmRTY3JvbGxMaXN0ZW5lcigpO1xuICAgIH1cblxuICAgIHVuYmluZFNjcm9sbExpc3RlbmVyKCkge1xuICAgICAgICBpZiAodGhpcy5zY3JvbGxIYW5kbGVyKSB7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbEhhbmRsZXIudW5iaW5kU2Nyb2xsTGlzdGVuZXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzT3V0c2lkZUNsaWNrZWQoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIHJldHVybiAhKHRoaXMuZWwubmF0aXZlRWxlbWVudC5pc1NhbWVOb2RlKGV2ZW50LnRhcmdldCkgfHwgdGhpcy5pc05hdkljb25DbGlja2VkKGV2ZW50KSB8fMKgXG4gICAgICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkgfHwgKHRoaXMub3ZlcmxheSAmJiB0aGlzLm92ZXJsYXkuY29udGFpbnMoPE5vZGU+IGV2ZW50LnRhcmdldCkpKTtcbiAgICB9XG5cbiAgICBpc05hdkljb25DbGlja2VkKGV2ZW50OiBFdmVudCkge1xuICAgICAgICByZXR1cm4gKERvbUhhbmRsZXIuaGFzQ2xhc3MoZXZlbnQudGFyZ2V0LCAncC1kYXRlcGlja2VyLXByZXYnKSB8fCBEb21IYW5kbGVyLmhhc0NsYXNzKGV2ZW50LnRhcmdldCwgJ3AtZGF0ZXBpY2tlci1wcmV2LWljb24nKVxuICAgICAgICAgICAgICAgIHx8IERvbUhhbmRsZXIuaGFzQ2xhc3MoZXZlbnQudGFyZ2V0LCAncC1kYXRlcGlja2VyLW5leHQnKSB8fCBEb21IYW5kbGVyLmhhc0NsYXNzKGV2ZW50LnRhcmdldCwgJ3AtZGF0ZXBpY2tlci1uZXh0LWljb24nKSk7XG4gICAgfVxuXG4gICAgb25XaW5kb3dSZXNpemUoKSB7XG4gICAgICAgIGlmICh0aGlzLm92ZXJsYXlWaXNpYmxlICYmICFEb21IYW5kbGVyLmlzQW5kcm9pZCgpKSB7XG4gICAgICAgICAgICB0aGlzLmhpZGVPdmVybGF5KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbk92ZXJsYXlIaWRlKCkge1xuICAgICAgICB0aGlzLnVuYmluZERvY3VtZW50Q2xpY2tMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLnVuYmluZE1hc2tDbGlja0xpc3RlbmVyKCk7XG4gICAgICAgIHRoaXMudW5iaW5kRG9jdW1lbnRSZXNpemVMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLnVuYmluZFNjcm9sbExpc3RlbmVyKCk7XG4gICAgICAgIHRoaXMub3ZlcmxheSA9IG51bGw7XG4gICAgICAgIHRoaXMuZGlzYWJsZU1vZGFsaXR5KCk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLnNjcm9sbEhhbmRsZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsSGFuZGxlci5kZXN0cm95KCk7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbEhhbmRsZXIgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jbGVhclRpbWVQaWNrZXJUaW1lcigpO1xuICAgICAgICB0aGlzLnJlc3RvcmVPdmVybGF5QXBwZW5kKCk7XG4gICAgICAgIHRoaXMub25PdmVybGF5SGlkZSgpO1xuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLEJ1dHRvbk1vZHVsZSxTaGFyZWRNb2R1bGUsUmlwcGxlTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbQ2FsZW5kYXIsQnV0dG9uTW9kdWxlLFNoYXJlZE1vZHVsZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbQ2FsZW5kYXJdXG59KVxuZXhwb3J0IGNsYXNzIENhbGVuZGFyTW9kdWxlIHsgfVxuIl19