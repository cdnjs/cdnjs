import { NgModule, Component, ChangeDetectionStrategy, Input, ViewChild, EventEmitter, Output, forwardRef, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "primeng/inputtext";
import * as i3 from "primeng/button";
export const INPUTNUMBER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputNumber),
    multi: true
};
export class InputNumber {
    constructor(el, cd) {
        this.el = el;
        this.cd = cd;
        this.showButtons = false;
        this.format = true;
        this.buttonLayout = "stacked";
        this.incrementButtonIcon = 'pi pi-angle-up';
        this.decrementButtonIcon = 'pi pi-angle-down';
        this.readonly = false;
        this.step = 1;
        this.allowEmpty = true;
        this.mode = "decimal";
        this.useGrouping = true;
        this.onInput = new EventEmitter();
        this.onFocus = new EventEmitter();
        this.onBlur = new EventEmitter();
        this.onKeyDown = new EventEmitter();
        this.onModelChange = () => { };
        this.onModelTouched = () => { };
        this.groupChar = '';
        this.prefixChar = '';
        this.suffixChar = '';
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(disabled) {
        if (disabled)
            this.focused = false;
        this._disabled = disabled;
        if (this.timer)
            this.clearTimer();
    }
    ngOnChanges(simpleChange) {
        const props = ['locale', 'localeMatcher', 'mode', 'currency', 'currencyDisplay', 'useGrouping', 'minFractionDigits', 'maxFractionDigits', 'prefix', 'suffix'];
        if (props.some(p => !!simpleChange[p])) {
            this.updateConstructParser();
        }
    }
    ngOnInit() {
        this.constructParser();
        this.initialized = true;
    }
    getOptions() {
        return {
            localeMatcher: this.localeMatcher,
            style: this.mode,
            currency: this.currency,
            currencyDisplay: this.currencyDisplay,
            useGrouping: this.useGrouping,
            minimumFractionDigits: this.minFractionDigits,
            maximumFractionDigits: this.maxFractionDigits
        };
    }
    constructParser() {
        this.numberFormat = new Intl.NumberFormat(this.locale, this.getOptions());
        const numerals = [...new Intl.NumberFormat(this.locale, { useGrouping: false }).format(9876543210)].reverse();
        const index = new Map(numerals.map((d, i) => [d, i]));
        this._numeral = new RegExp(`[${numerals.join('')}]`, 'g');
        this._group = this.getGroupingExpression();
        this._minusSign = this.getMinusSignExpression();
        this._currency = this.getCurrencyExpression();
        this._decimal = this.getDecimalExpression();
        this._suffix = this.getSuffixExpression();
        this._prefix = this.getPrefixExpression();
        this._index = d => index.get(d);
    }
    updateConstructParser() {
        if (this.initialized) {
            this.constructParser();
        }
    }
    escapeRegExp(text) {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    }
    getDecimalExpression() {
        const formatter = new Intl.NumberFormat(this.locale, Object.assign(Object.assign({}, this.getOptions()), { useGrouping: false }));
        return new RegExp(`[${formatter.format(1.1).replace(this._currency, '').trim().replace(this._numeral, '')}]`, 'g');
    }
    getGroupingExpression() {
        const formatter = new Intl.NumberFormat(this.locale, { useGrouping: true });
        this.groupChar = formatter.format(1000000).trim().replace(this._numeral, '').charAt(0);
        return new RegExp(`[${this.groupChar}]`, 'g');
    }
    getMinusSignExpression() {
        const formatter = new Intl.NumberFormat(this.locale, { useGrouping: false });
        return new RegExp(`[${formatter.format(-1).trim().replace(this._numeral, '')}]`, 'g');
    }
    getCurrencyExpression() {
        if (this.currency) {
            const formatter = new Intl.NumberFormat(this.locale, { style: 'currency', currency: this.currency, currencyDisplay: this.currencyDisplay,
                minimumFractionDigits: 0, maximumFractionDigits: 0 });
            return new RegExp(`[${formatter.format(1).replace(/\s/g, '').replace(this._numeral, '').replace(this._group, '')}]`, 'g');
        }
        return new RegExp(`[]`, 'g');
    }
    getPrefixExpression() {
        if (this.prefix) {
            this.prefixChar = this.prefix;
        }
        else {
            const formatter = new Intl.NumberFormat(this.locale, { style: this.mode, currency: this.currency, currencyDisplay: this.currencyDisplay });
            this.prefixChar = formatter.format(1).split('1')[0];
        }
        return new RegExp(`${this.escapeRegExp(this.prefixChar || '')}`, 'g');
    }
    getSuffixExpression() {
        if (this.suffix) {
            this.suffixChar = this.suffix;
        }
        else {
            const formatter = new Intl.NumberFormat(this.locale, { style: this.mode, currency: this.currency, currencyDisplay: this.currencyDisplay,
                minimumFractionDigits: 0, maximumFractionDigits: 0 });
            this.suffixChar = formatter.format(1).split('1')[1];
        }
        return new RegExp(`${this.escapeRegExp(this.suffixChar || '')}`, 'g');
    }
    formatValue(value) {
        if (value != null) {
            if (value === '-') { // Minus sign
                return value;
            }
            if (this.format) {
                let formatter = new Intl.NumberFormat(this.locale, this.getOptions());
                let formattedValue = formatter.format(value);
                if (this.prefix) {
                    formattedValue = this.prefix + formattedValue;
                }
                if (this.suffix) {
                    formattedValue = formattedValue + this.suffix;
                }
                return formattedValue;
            }
            return value.toString();
        }
        return '';
    }
    parseValue(text) {
        let filteredText = text
            .replace(this._suffix, '')
            .replace(this._prefix, '')
            .trim()
            .replace(/\s/g, '')
            .replace(this._currency, '')
            .replace(this._group, '')
            .replace(this._minusSign, '-')
            .replace(this._decimal, '.')
            .replace(this._numeral, this._index);
        if (filteredText) {
            if (filteredText === '-') // Minus sign
                return filteredText;
            let parsedValue = +filteredText;
            return isNaN(parsedValue) ? null : parsedValue;
        }
        return null;
    }
    repeat(event, interval, dir) {
        if (this.readonly) {
            return;
        }
        let i = interval || 500;
        this.clearTimer();
        this.timer = setTimeout(() => {
            this.repeat(event, 40, dir);
        }, i);
        this.spin(event, dir);
    }
    spin(event, dir) {
        let step = this.step * dir;
        let currentValue = this.parseValue(this.input.nativeElement.value) || 0;
        let newValue = this.validateValue(currentValue + step);
        if (this.maxlength && this.maxlength < this.formatValue(newValue).length) {
            return;
        }
        this.updateInput(newValue, null, 'spin', null);
        this.updateModel(event, newValue);
        this.handleOnInput(event, currentValue, newValue);
    }
    onUpButtonMouseDown(event) {
        this.input.nativeElement.focus();
        this.repeat(event, null, 1);
        event.preventDefault();
    }
    onUpButtonMouseUp() {
        this.clearTimer();
    }
    onUpButtonMouseLeave() {
        this.clearTimer();
    }
    onUpButtonKeyDown(event) {
        if (event.keyCode === 32 || event.keyCode === 13) {
            this.repeat(event, null, 1);
        }
    }
    onUpButtonKeyUp() {
        this.clearTimer();
    }
    onDownButtonMouseDown(event) {
        this.input.nativeElement.focus();
        this.repeat(event, null, -1);
        event.preventDefault();
    }
    onDownButtonMouseUp() {
        this.clearTimer();
    }
    onDownButtonMouseLeave() {
        this.clearTimer();
    }
    onDownButtonKeyUp() {
        this.clearTimer();
    }
    onDownButtonKeyDown(event) {
        if (event.keyCode === 32 || event.keyCode === 13) {
            this.repeat(event, null, -1);
        }
    }
    onUserInput(event) {
        if (this.isSpecialChar) {
            event.target.value = this.lastValue;
        }
        this.isSpecialChar = false;
    }
    onInputKeyDown(event) {
        this.lastValue = event.target.value;
        if (event.shiftKey || event.altKey) {
            this.isSpecialChar = true;
            return;
        }
        let selectionStart = event.target.selectionStart;
        let selectionEnd = event.target.selectionEnd;
        let inputValue = event.target.value;
        let newValueStr = null;
        if (event.altKey) {
            event.preventDefault();
        }
        switch (event.which) {
            //up
            case 38:
                this.spin(event, 1);
                event.preventDefault();
                break;
            //down
            case 40:
                this.spin(event, -1);
                event.preventDefault();
                break;
            //left
            case 37:
                if (!this.isNumeralChar(inputValue.charAt(selectionStart - 1))) {
                    event.preventDefault();
                }
                break;
            //right
            case 39:
                if (!this.isNumeralChar(inputValue.charAt(selectionStart))) {
                    event.preventDefault();
                }
                break;
            //enter
            case 13:
                newValueStr = this.validateValue(this.parseValue(this.input.nativeElement.value));
                this.input.nativeElement.value = this.formatValue(newValueStr);
                this.input.nativeElement.setAttribute('aria-valuenow', newValueStr);
                this.updateModel(event, newValueStr);
                break;
            //backspace
            case 8: {
                event.preventDefault();
                if (selectionStart === selectionEnd) {
                    const deleteChar = inputValue.charAt(selectionStart - 1);
                    const { decimalCharIndex, decimalCharIndexWithoutPrefix } = this.getDecimalCharIndexes(inputValue);
                    if (this.isNumeralChar(deleteChar)) {
                        const decimalLength = this.getDecimalLength(inputValue);
                        if (this._group.test(deleteChar)) {
                            this._group.lastIndex = 0;
                            newValueStr = inputValue.slice(0, selectionStart - 2) + inputValue.slice(selectionStart - 1);
                        }
                        else if (this._decimal.test(deleteChar)) {
                            this._decimal.lastIndex = 0;
                            if (decimalLength) {
                                this.input.nativeElement.setSelectionRange(selectionStart - 1, selectionStart - 1);
                            }
                            else {
                                newValueStr = inputValue.slice(0, selectionStart - 1) + inputValue.slice(selectionStart);
                            }
                        }
                        else if (decimalCharIndex > 0 && selectionStart > decimalCharIndex) {
                            const insertedText = this.isDecimalMode() && (this.minFractionDigits || 0) < decimalLength ? '' : '0';
                            newValueStr = inputValue.slice(0, selectionStart - 1) + insertedText + inputValue.slice(selectionStart);
                        }
                        else if (decimalCharIndexWithoutPrefix === 1) {
                            newValueStr = inputValue.slice(0, selectionStart - 1) + '0' + inputValue.slice(selectionStart);
                            newValueStr = this.parseValue(newValueStr) > 0 ? newValueStr : '';
                        }
                        else {
                            newValueStr = inputValue.slice(0, selectionStart - 1) + inputValue.slice(selectionStart);
                        }
                    }
                    this.updateValue(event, newValueStr, null, 'delete-single');
                }
                else {
                    newValueStr = this.deleteRange(inputValue, selectionStart, selectionEnd);
                    this.updateValue(event, newValueStr, null, 'delete-range');
                }
                break;
            }
            // del
            case 46:
                event.preventDefault();
                if (selectionStart === selectionEnd) {
                    const deleteChar = inputValue.charAt(selectionStart);
                    const { decimalCharIndex, decimalCharIndexWithoutPrefix } = this.getDecimalCharIndexes(inputValue);
                    if (this.isNumeralChar(deleteChar)) {
                        const decimalLength = this.getDecimalLength(inputValue);
                        if (this._group.test(deleteChar)) {
                            this._group.lastIndex = 0;
                            newValueStr = inputValue.slice(0, selectionStart) + inputValue.slice(selectionStart + 2);
                        }
                        else if (this._decimal.test(deleteChar)) {
                            this._decimal.lastIndex = 0;
                            if (decimalLength) {
                                this.input.nativeElement.setSelectionRange(selectionStart + 1, selectionStart + 1);
                            }
                            else {
                                newValueStr = inputValue.slice(0, selectionStart) + inputValue.slice(selectionStart + 1);
                            }
                        }
                        else if (decimalCharIndex > 0 && selectionStart > decimalCharIndex) {
                            const insertedText = this.isDecimalMode() && (this.minFractionDigits || 0) < decimalLength ? '' : '0';
                            newValueStr = inputValue.slice(0, selectionStart) + insertedText + inputValue.slice(selectionStart + 1);
                        }
                        else if (decimalCharIndexWithoutPrefix === 1) {
                            newValueStr = inputValue.slice(0, selectionStart) + '0' + inputValue.slice(selectionStart + 1);
                            newValueStr = this.parseValue(newValueStr) > 0 ? newValueStr : '';
                        }
                        else {
                            newValueStr = inputValue.slice(0, selectionStart) + inputValue.slice(selectionStart + 1);
                        }
                    }
                    this.updateValue(event, newValueStr, null, 'delete-back-single');
                }
                else {
                    newValueStr = this.deleteRange(inputValue, selectionStart, selectionEnd);
                    this.updateValue(event, newValueStr, null, 'delete-range');
                }
                break;
            default:
                break;
        }
        this.onKeyDown.emit(event);
    }
    onInputKeyPress(event) {
        event.preventDefault();
        let code = event.which || event.keyCode;
        let char = String.fromCharCode(code);
        const isDecimalSign = this.isDecimalSign(char);
        const isMinusSign = this.isMinusSign(char);
        if ((48 <= code && code <= 57) || isMinusSign || isDecimalSign) {
            this.insert(event, char, { isDecimalSign, isMinusSign });
        }
    }
    onPaste(event) {
        if (!this.disabled) {
            event.preventDefault();
            let data = (event.clipboardData || window['clipboardData']).getData('Text');
            if (data) {
                let filteredData = this.parseValue(data);
                if (filteredData != null) {
                    this.insert(event, filteredData.toString());
                }
            }
        }
    }
    allowMinusSign() {
        return this.min == null || this.min < 0;
    }
    isMinusSign(char) {
        if (this._minusSign.test(char) || char === '-') {
            this._minusSign.lastIndex = 0;
            return true;
        }
        return false;
    }
    isDecimalSign(char) {
        if (this._decimal.test(char)) {
            this._decimal.lastIndex = 0;
            return true;
        }
        return false;
    }
    isDecimalMode() {
        return this.mode === 'decimal';
    }
    getDecimalCharIndexes(val) {
        let decimalCharIndex = val.search(this._decimal);
        this._decimal.lastIndex = 0;
        const filteredVal = val.replace(this._prefix, '').trim().replace(/\s/g, '').replace(this._currency, '');
        const decimalCharIndexWithoutPrefix = filteredVal.search(this._decimal);
        this._decimal.lastIndex = 0;
        return { decimalCharIndex, decimalCharIndexWithoutPrefix };
    }
    getCharIndexes(val) {
        const decimalCharIndex = val.search(this._decimal);
        this._decimal.lastIndex = 0;
        const minusCharIndex = val.search(this._minusSign);
        this._minusSign.lastIndex = 0;
        const suffixCharIndex = val.search(this._suffix);
        this._suffix.lastIndex = 0;
        const currencyCharIndex = val.search(this._currency);
        this._currency.lastIndex = 0;
        return { decimalCharIndex, minusCharIndex, suffixCharIndex, currencyCharIndex };
    }
    insert(event, text, sign = { isDecimalSign: false, isMinusSign: false }) {
        const minusCharIndexOnText = text.search(this._minusSign);
        this._minusSign.lastIndex = 0;
        if (!this.allowMinusSign() && minusCharIndexOnText !== -1) {
            return;
        }
        let selectionStart = this.input.nativeElement.selectionStart;
        let selectionEnd = this.input.nativeElement.selectionEnd;
        let inputValue = this.input.nativeElement.value.trim();
        const { decimalCharIndex, minusCharIndex, suffixCharIndex, currencyCharIndex } = this.getCharIndexes(inputValue);
        let newValueStr;
        if (sign.isMinusSign) {
            if (selectionStart === 0) {
                newValueStr = inputValue;
                if (minusCharIndex === -1 || selectionEnd !== 0) {
                    newValueStr = this.insertText(inputValue, text, 0, selectionEnd);
                }
                this.updateValue(event, newValueStr, text, 'insert');
            }
        }
        else if (sign.isDecimalSign) {
            if (decimalCharIndex > 0 && selectionStart === decimalCharIndex) {
                this.updateValue(event, inputValue, text, 'insert');
            }
            else if (decimalCharIndex > selectionStart && decimalCharIndex < selectionEnd) {
                newValueStr = this.insertText(inputValue, text, selectionStart, selectionEnd);
                this.updateValue(event, newValueStr, text, 'insert');
            }
            else if (decimalCharIndex === -1 && this.maxFractionDigits) {
                newValueStr = this.insertText(inputValue, text, selectionStart, selectionEnd);
                this.updateValue(event, newValueStr, text, 'insert');
            }
        }
        else {
            const maxFractionDigits = this.numberFormat.resolvedOptions().maximumFractionDigits;
            const operation = selectionStart !== selectionEnd ? 'range-insert' : 'insert';
            if (decimalCharIndex > 0 && selectionStart > decimalCharIndex) {
                if ((selectionStart + text.length - (decimalCharIndex + 1)) <= maxFractionDigits) {
                    const charIndex = currencyCharIndex >= selectionStart ? currencyCharIndex - 1 : (suffixCharIndex >= selectionStart ? suffixCharIndex : inputValue.length);
                    newValueStr = inputValue.slice(0, selectionStart) + text + inputValue.slice(selectionStart + text.length, charIndex) + inputValue.slice(charIndex);
                    this.updateValue(event, newValueStr, text, operation);
                }
            }
            else {
                newValueStr = this.insertText(inputValue, text, selectionStart, selectionEnd);
                this.updateValue(event, newValueStr, text, operation);
            }
        }
    }
    insertText(value, text, start, end) {
        let textSplit = text === '.' ? text : text.split('.');
        if (textSplit.length === 2) {
            const decimalCharIndex = value.slice(start, end).search(this._decimal);
            this._decimal.lastIndex = 0;
            return (decimalCharIndex > 0) ? value.slice(0, start) + this.formatValue(text) + value.slice(end) : (value || this.formatValue(text));
        }
        else if ((end - start) === value.length) {
            return this.formatValue(text);
        }
        else if (start === 0) {
            return text + value.slice(end);
        }
        else if (end === value.length) {
            return value.slice(0, start) + text;
        }
        else {
            return value.slice(0, start) + text + value.slice(end);
        }
    }
    deleteRange(value, start, end) {
        let newValueStr;
        if ((end - start) === value.length)
            newValueStr = '';
        else if (start === 0)
            newValueStr = value.slice(end);
        else if (end === value.length)
            newValueStr = value.slice(0, start);
        else
            newValueStr = value.slice(0, start) + value.slice(end);
        return newValueStr;
    }
    initCursor() {
        let selectionStart = this.input.nativeElement.selectionStart;
        let inputValue = this.input.nativeElement.value;
        let valueLength = inputValue.length;
        let index = null;
        // remove prefix
        let prefixLength = (this.prefixChar || '').length;
        inputValue = inputValue.replace(this._prefix, '');
        selectionStart = selectionStart - prefixLength;
        let char = inputValue.charAt(selectionStart);
        if (this.isNumeralChar(char)) {
            return selectionStart + prefixLength;
        }
        //left
        let i = selectionStart - 1;
        while (i >= 0) {
            char = inputValue.charAt(i);
            if (this.isNumeralChar(char)) {
                index = i + prefixLength;
                break;
            }
            else {
                i--;
            }
        }
        if (index !== null) {
            this.input.nativeElement.setSelectionRange(index + 1, index + 1);
        }
        else {
            i = selectionStart;
            while (i < valueLength) {
                char = inputValue.charAt(i);
                if (this.isNumeralChar(char)) {
                    index = i + prefixLength;
                    break;
                }
                else {
                    i++;
                }
            }
            if (index !== null) {
                this.input.nativeElement.setSelectionRange(index, index);
            }
        }
        return index || 0;
    }
    onInputClick() {
        this.initCursor();
    }
    isNumeralChar(char) {
        if (char.length === 1 && (this._numeral.test(char) || this._decimal.test(char) || this._group.test(char) || this._minusSign.test(char))) {
            this.resetRegex();
            return true;
        }
        return false;
    }
    resetRegex() {
        this._numeral.lastIndex = 0;
        this._decimal.lastIndex = 0;
        this._group.lastIndex = 0;
        this._minusSign.lastIndex = 0;
    }
    updateValue(event, valueStr, insertedValueStr, operation) {
        let currentValue = this.input.nativeElement.value;
        let newValue = null;
        if (valueStr != null) {
            newValue = this.parseValue(valueStr);
            newValue = !newValue && !this.allowEmpty ? 0 : newValue;
            this.updateInput(newValue, insertedValueStr, operation, valueStr);
            this.handleOnInput(event, currentValue, newValue);
        }
    }
    handleOnInput(event, currentValue, newValue) {
        if (this.isValueChanged(currentValue, newValue)) {
            this.onInput.emit({ originalEvent: event, value: newValue });
        }
    }
    isValueChanged(currentValue, newValue) {
        if (newValue === null && currentValue !== null) {
            return true;
        }
        if (newValue != null) {
            let parsedCurrentValue = (typeof currentValue === 'string') ? this.parseValue(currentValue) : currentValue;
            return newValue !== parsedCurrentValue;
        }
        return false;
    }
    validateValue(value) {
        if (value === '-' || value == null) {
            return null;
        }
        if (this.min != null && value < this.min) {
            return this.min;
        }
        if (this.max != null && value > this.max) {
            return this.max;
        }
        return value;
    }
    updateInput(value, insertedValueStr, operation, valueStr) {
        insertedValueStr = insertedValueStr || '';
        let inputValue = this.input.nativeElement.value;
        let newValue = this.formatValue(value);
        let currentLength = inputValue.length;
        if (newValue !== valueStr) {
            newValue = this.concatValues(newValue, valueStr);
        }
        if (currentLength === 0) {
            this.input.nativeElement.value = newValue;
            this.input.nativeElement.setSelectionRange(0, 0);
            const index = this.initCursor();
            const selectionEnd = index + insertedValueStr.length;
            this.input.nativeElement.setSelectionRange(selectionEnd, selectionEnd);
        }
        else {
            let selectionStart = this.input.nativeElement.selectionStart;
            let selectionEnd = this.input.nativeElement.selectionEnd;
            if (this.maxlength && this.maxlength < newValue.length) {
                return;
            }
            this.input.nativeElement.value = newValue;
            let newLength = newValue.length;
            if (operation === 'range-insert') {
                const startValue = this.parseValue((inputValue || '').slice(0, selectionStart));
                const startValueStr = startValue !== null ? startValue.toString() : '';
                const startExpr = startValueStr.split('').join(`(${this.groupChar})?`);
                const sRegex = new RegExp(startExpr, 'g');
                sRegex.test(newValue);
                const tExpr = insertedValueStr.split('').join(`(${this.groupChar})?`);
                const tRegex = new RegExp(tExpr, 'g');
                tRegex.test(newValue.slice(sRegex.lastIndex));
                selectionEnd = sRegex.lastIndex + tRegex.lastIndex;
                this.input.nativeElement.setSelectionRange(selectionEnd, selectionEnd);
            }
            else if (newLength === currentLength) {
                if (operation === 'insert' || operation === 'delete-back-single')
                    this.input.nativeElement.setSelectionRange(selectionEnd + 1, selectionEnd + 1);
                else if (operation === 'delete-single')
                    this.input.nativeElement.setSelectionRange(selectionEnd - 1, selectionEnd - 1);
                else if (operation === 'delete-range' || operation === 'spin')
                    this.input.nativeElement.setSelectionRange(selectionEnd, selectionEnd);
            }
            else if (operation === 'delete-back-single') {
                let prevChar = inputValue.charAt(selectionEnd - 1);
                let nextChar = inputValue.charAt(selectionEnd);
                let diff = currentLength - newLength;
                let isGroupChar = this._group.test(nextChar);
                if (isGroupChar && diff === 1) {
                    selectionEnd += 1;
                }
                else if (!isGroupChar && this.isNumeralChar(prevChar)) {
                    selectionEnd += (-1 * diff) + 1;
                }
                this._group.lastIndex = 0;
                this.input.nativeElement.setSelectionRange(selectionEnd, selectionEnd);
            }
            else if (inputValue === '-' && operation === 'insert') {
                this.input.nativeElement.setSelectionRange(0, 0);
                const index = this.initCursor();
                const selectionEnd = index + insertedValueStr.length + 1;
                this.input.nativeElement.setSelectionRange(selectionEnd, selectionEnd);
            }
            else {
                selectionEnd = selectionEnd + (newLength - currentLength);
                this.input.nativeElement.setSelectionRange(selectionEnd, selectionEnd);
            }
        }
        this.input.nativeElement.setAttribute('aria-valuenow', value);
    }
    concatValues(val1, val2) {
        if (val1 && val2) {
            let decimalCharIndex = val2.search(this._decimal);
            this._decimal.lastIndex = 0;
            return decimalCharIndex !== -1 ? (val1.split(this._decimal)[0] + val2.slice(decimalCharIndex)) : val1;
        }
        return val1;
    }
    getDecimalLength(value) {
        if (value) {
            const valueSplit = value.split(this._decimal);
            if (valueSplit.length === 2) {
                return valueSplit[1].replace(this._suffix, '')
                    .trim()
                    .replace(/\s/g, '')
                    .replace(this._currency, '').length;
            }
        }
        return 0;
    }
    onInputFocus(event) {
        this.focused = true;
        this.onFocus.emit(event);
    }
    onInputBlur(event) {
        this.focused = false;
        let newValue = this.validateValue(this.parseValue(this.input.nativeElement.value));
        this.input.nativeElement.value = this.formatValue(newValue);
        this.input.nativeElement.setAttribute('aria-valuenow', newValue);
        this.updateModel(event, newValue);
        this.onBlur.emit(event);
    }
    formattedValue() {
        const val = !this.value && !this.allowEmpty ? 0 : this.value;
        return this.formatValue(val);
    }
    updateModel(event, value) {
        if (this.value !== value) {
            this.value = value;
            this.onModelChange(value);
        }
        this.onModelTouched();
    }
    writeValue(value) {
        this.value = value;
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
    get filled() {
        return (this.value != null && this.value.toString().length > 0);
    }
    clearTimer() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }
    getFormatter() {
        return this.numberFormat;
    }
}
InputNumber.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: InputNumber, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
InputNumber.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: InputNumber, selector: "p-inputNumber", inputs: { showButtons: "showButtons", format: "format", buttonLayout: "buttonLayout", inputId: "inputId", styleClass: "styleClass", style: "style", placeholder: "placeholder", size: "size", maxlength: "maxlength", tabindex: "tabindex", title: "title", ariaLabel: "ariaLabel", ariaRequired: "ariaRequired", name: "name", required: "required", autocomplete: "autocomplete", min: "min", max: "max", incrementButtonClass: "incrementButtonClass", decrementButtonClass: "decrementButtonClass", incrementButtonIcon: "incrementButtonIcon", decrementButtonIcon: "decrementButtonIcon", readonly: "readonly", step: "step", allowEmpty: "allowEmpty", locale: "locale", localeMatcher: "localeMatcher", mode: "mode", currency: "currency", currencyDisplay: "currencyDisplay", useGrouping: "useGrouping", minFractionDigits: "minFractionDigits", maxFractionDigits: "maxFractionDigits", prefix: "prefix", suffix: "suffix", inputStyle: "inputStyle", inputStyleClass: "inputStyleClass", disabled: "disabled" }, outputs: { onInput: "onInput", onFocus: "onFocus", onBlur: "onBlur", onKeyDown: "onKeyDown" }, host: { properties: { "class.p-inputwrapper-filled": "filled", "class.p-inputwrapper-focus": "focused" }, classAttribute: "p-element p-inputwrapper" }, providers: [INPUTNUMBER_VALUE_ACCESSOR], viewQueries: [{ propertyName: "input", first: true, predicate: ["input"], descendants: true }], usesOnChanges: true, ngImport: i0, template: `
        <span [ngClass]="{'p-inputnumber p-component': true,'p-inputnumber-buttons-stacked': this.showButtons && this.buttonLayout === 'stacked',
                'p-inputnumber-buttons-horizontal': this.showButtons && this.buttonLayout === 'horizontal', 'p-inputnumber-buttons-vertical': this.showButtons && this.buttonLayout === 'vertical'}"
                [ngStyle]="style" [class]="styleClass">
            <input #input [ngClass]="'p-inputnumber-input'" [ngStyle]="inputStyle" [class]="inputStyleClass" pInputText [value]="formattedValue()" [attr.placeholder]="placeholder" [attr.title]="title" [attr.id]="inputId"
                [attr.size]="size" [attr.name]="name" [attr.autocomplete]="autocomplete" [attr.maxlength]="maxlength" [attr.tabindex]="tabindex" [attr.aria-label]="ariaLabel"
                [attr.aria-required]="ariaRequired" [disabled]="disabled" [attr.required]="required" [attr.aria-valuemin]="min" [attr.aria-valuemax]="max" [readonly]="readonly" inputmode="decimal"
                (input)="onUserInput($event)" (keydown)="onInputKeyDown($event)" (keypress)="onInputKeyPress($event)" (paste)="onPaste($event)" (click)="onInputClick()"
                (focus)="onInputFocus($event)" (blur)="onInputBlur($event)">
            <span class="p-inputnumber-button-group" *ngIf="showButtons && buttonLayout === 'stacked'">
                <button type="button" pButton [ngClass]="{'p-inputnumber-button p-inputnumber-button-up': true}" [class]="incrementButtonClass" [icon]="incrementButtonIcon" [disabled]="disabled"
                    (mousedown)="this.onUpButtonMouseDown($event)" (mouseup)="onUpButtonMouseUp()" (mouseleave)="onUpButtonMouseLeave()" (keydown)="onUpButtonKeyDown($event)" (keyup)="onUpButtonKeyUp()"></button>
                <button type="button" pButton [ngClass]="{'p-inputnumber-button p-inputnumber-button-down': true}" [class]="decrementButtonClass" [icon]="decrementButtonIcon" [disabled]="disabled"
                    (mousedown)="this.onDownButtonMouseDown($event)" (mouseup)="onDownButtonMouseUp()" (mouseleave)="onDownButtonMouseLeave()" (keydown)="onDownButtonKeyDown($event)" (keyup)="onDownButtonKeyUp()"></button>
            </span>
            <button type="button" pButton [ngClass]="{'p-inputnumber-button p-inputnumber-button-up': true}" [class]="incrementButtonClass" [icon]="incrementButtonIcon" *ngIf="showButtons && buttonLayout !== 'stacked'" [disabled]="disabled"
                (mousedown)="this.onUpButtonMouseDown($event)" (mouseup)="onUpButtonMouseUp()" (mouseleave)="onUpButtonMouseLeave()" (keydown)="onUpButtonKeyDown($event)" (keyup)="onUpButtonKeyUp()"></button>
            <button type="button" pButton [ngClass]="{'p-inputnumber-button p-inputnumber-button-down': true}" [class]="decrementButtonClass" [icon]="decrementButtonIcon" *ngIf="showButtons && buttonLayout !== 'stacked'" [disabled]="disabled"
                (mousedown)="this.onDownButtonMouseDown($event)" (mouseup)="onDownButtonMouseUp()" (mouseleave)="onDownButtonMouseLeave()" (keydown)="onDownButtonKeyDown($event)" (keyup)="onDownButtonKeyUp()"></button>
        </span>
    `, isInline: true, styles: [".p-inputnumber,p-inputnumber{display:inline-flex}.p-inputnumber-button{display:flex;align-items:center;justify-content:center;flex:0 0 auto}.p-inputnumber-buttons-horizontal .p-button.p-inputnumber-button .p-button-label,.p-inputnumber-buttons-stacked .p-button.p-inputnumber-button .p-button-label{display:none}.p-inputnumber-buttons-stacked .p-button.p-inputnumber-button-up{border-top-left-radius:0;border-bottom-left-radius:0;border-bottom-right-radius:0;padding:0}.p-inputnumber-buttons-stacked .p-inputnumber-input{border-top-right-radius:0;border-bottom-right-radius:0}.p-inputnumber-buttons-stacked .p-button.p-inputnumber-button-down{border-top-left-radius:0;border-top-right-radius:0;border-bottom-left-radius:0;padding:0}.p-inputnumber-buttons-stacked .p-inputnumber-button-group{display:flex;flex-direction:column}.p-inputnumber-buttons-stacked .p-inputnumber-button-group .p-button.p-inputnumber-button{flex:1 1 auto}.p-inputnumber-buttons-horizontal .p-button.p-inputnumber-button-up{order:3;border-top-left-radius:0;border-bottom-left-radius:0}.p-inputnumber-buttons-horizontal .p-inputnumber-input{order:2;border-radius:0}.p-inputnumber-buttons-horizontal .p-button.p-inputnumber-button-down{order:1;border-top-right-radius:0;border-bottom-right-radius:0}.p-inputnumber-buttons-vertical{flex-direction:column}.p-inputnumber-buttons-vertical .p-button.p-inputnumber-button-up{order:1;border-bottom-left-radius:0;border-bottom-right-radius:0;width:100%}.p-inputnumber-buttons-vertical .p-inputnumber-input{order:2;border-radius:0;text-align:center}.p-inputnumber-buttons-vertical .p-button.p-inputnumber-button-down{order:3;border-top-left-radius:0;border-top-right-radius:0;width:100%}.p-inputnumber-input{flex:1 1 auto}.p-fluid .p-inputnumber,.p-fluid p-inputnumber{width:100%}.p-fluid .p-inputnumber .p-inputnumber-input{width:1%}.p-fluid .p-inputnumber-buttons-vertical .p-inputnumber-input{width:100%}"], directives: [{ type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i2.InputText, selector: "[pInputText]" }, { type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.ButtonDirective, selector: "[pButton]", inputs: ["iconPos", "loadingIcon", "label", "icon", "loading"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: InputNumber, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-inputNumber',
                    template: `
        <span [ngClass]="{'p-inputnumber p-component': true,'p-inputnumber-buttons-stacked': this.showButtons && this.buttonLayout === 'stacked',
                'p-inputnumber-buttons-horizontal': this.showButtons && this.buttonLayout === 'horizontal', 'p-inputnumber-buttons-vertical': this.showButtons && this.buttonLayout === 'vertical'}"
                [ngStyle]="style" [class]="styleClass">
            <input #input [ngClass]="'p-inputnumber-input'" [ngStyle]="inputStyle" [class]="inputStyleClass" pInputText [value]="formattedValue()" [attr.placeholder]="placeholder" [attr.title]="title" [attr.id]="inputId"
                [attr.size]="size" [attr.name]="name" [attr.autocomplete]="autocomplete" [attr.maxlength]="maxlength" [attr.tabindex]="tabindex" [attr.aria-label]="ariaLabel"
                [attr.aria-required]="ariaRequired" [disabled]="disabled" [attr.required]="required" [attr.aria-valuemin]="min" [attr.aria-valuemax]="max" [readonly]="readonly" inputmode="decimal"
                (input)="onUserInput($event)" (keydown)="onInputKeyDown($event)" (keypress)="onInputKeyPress($event)" (paste)="onPaste($event)" (click)="onInputClick()"
                (focus)="onInputFocus($event)" (blur)="onInputBlur($event)">
            <span class="p-inputnumber-button-group" *ngIf="showButtons && buttonLayout === 'stacked'">
                <button type="button" pButton [ngClass]="{'p-inputnumber-button p-inputnumber-button-up': true}" [class]="incrementButtonClass" [icon]="incrementButtonIcon" [disabled]="disabled"
                    (mousedown)="this.onUpButtonMouseDown($event)" (mouseup)="onUpButtonMouseUp()" (mouseleave)="onUpButtonMouseLeave()" (keydown)="onUpButtonKeyDown($event)" (keyup)="onUpButtonKeyUp()"></button>
                <button type="button" pButton [ngClass]="{'p-inputnumber-button p-inputnumber-button-down': true}" [class]="decrementButtonClass" [icon]="decrementButtonIcon" [disabled]="disabled"
                    (mousedown)="this.onDownButtonMouseDown($event)" (mouseup)="onDownButtonMouseUp()" (mouseleave)="onDownButtonMouseLeave()" (keydown)="onDownButtonKeyDown($event)" (keyup)="onDownButtonKeyUp()"></button>
            </span>
            <button type="button" pButton [ngClass]="{'p-inputnumber-button p-inputnumber-button-up': true}" [class]="incrementButtonClass" [icon]="incrementButtonIcon" *ngIf="showButtons && buttonLayout !== 'stacked'" [disabled]="disabled"
                (mousedown)="this.onUpButtonMouseDown($event)" (mouseup)="onUpButtonMouseUp()" (mouseleave)="onUpButtonMouseLeave()" (keydown)="onUpButtonKeyDown($event)" (keyup)="onUpButtonKeyUp()"></button>
            <button type="button" pButton [ngClass]="{'p-inputnumber-button p-inputnumber-button-down': true}" [class]="decrementButtonClass" [icon]="decrementButtonIcon" *ngIf="showButtons && buttonLayout !== 'stacked'" [disabled]="disabled"
                (mousedown)="this.onDownButtonMouseDown($event)" (mouseup)="onDownButtonMouseUp()" (mouseleave)="onDownButtonMouseLeave()" (keydown)="onDownButtonKeyDown($event)" (keyup)="onDownButtonKeyUp()"></button>
        </span>
    `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [INPUTNUMBER_VALUE_ACCESSOR],
                    encapsulation: ViewEncapsulation.None,
                    styleUrls: ['./inputnumber.css'],
                    host: {
                        'class': 'p-element p-inputwrapper',
                        '[class.p-inputwrapper-filled]': 'filled',
                        '[class.p-inputwrapper-focus]': 'focused'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { showButtons: [{
                type: Input
            }], format: [{
                type: Input
            }], buttonLayout: [{
                type: Input
            }], inputId: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], style: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], size: [{
                type: Input
            }], maxlength: [{
                type: Input
            }], tabindex: [{
                type: Input
            }], title: [{
                type: Input
            }], ariaLabel: [{
                type: Input
            }], ariaRequired: [{
                type: Input
            }], name: [{
                type: Input
            }], required: [{
                type: Input
            }], autocomplete: [{
                type: Input
            }], min: [{
                type: Input
            }], max: [{
                type: Input
            }], incrementButtonClass: [{
                type: Input
            }], decrementButtonClass: [{
                type: Input
            }], incrementButtonIcon: [{
                type: Input
            }], decrementButtonIcon: [{
                type: Input
            }], readonly: [{
                type: Input
            }], step: [{
                type: Input
            }], allowEmpty: [{
                type: Input
            }], locale: [{
                type: Input
            }], localeMatcher: [{
                type: Input
            }], mode: [{
                type: Input
            }], currency: [{
                type: Input
            }], currencyDisplay: [{
                type: Input
            }], useGrouping: [{
                type: Input
            }], minFractionDigits: [{
                type: Input
            }], maxFractionDigits: [{
                type: Input
            }], prefix: [{
                type: Input
            }], suffix: [{
                type: Input
            }], inputStyle: [{
                type: Input
            }], inputStyleClass: [{
                type: Input
            }], input: [{
                type: ViewChild,
                args: ['input']
            }], onInput: [{
                type: Output
            }], onFocus: [{
                type: Output
            }], onBlur: [{
                type: Output
            }], onKeyDown: [{
                type: Output
            }], disabled: [{
                type: Input
            }] } });
export class InputNumberModule {
}
InputNumberModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: InputNumberModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
InputNumberModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: InputNumberModule, declarations: [InputNumber], imports: [CommonModule, InputTextModule, ButtonModule], exports: [InputNumber] });
InputNumberModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: InputNumberModule, imports: [[CommonModule, InputTextModule, ButtonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: InputNumberModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, InputTextModule, ButtonModule],
                    exports: [InputNumber],
                    declarations: [InputNumber]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXRudW1iZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvaW5wdXRudW1iZXIvaW5wdXRudW1iZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsdUJBQXVCLEVBQUUsS0FBSyxFQUFjLFNBQVMsRUFBVSxZQUFZLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxpQkFBaUIsRUFBbUMsTUFBTSxlQUFlLENBQUM7QUFDdE0sT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUMsT0FBTyxFQUFFLGlCQUFpQixFQUF3QixNQUFNLGdCQUFnQixDQUFDOzs7OztBQUV6RSxNQUFNLENBQUMsTUFBTSwwQkFBMEIsR0FBUTtJQUMzQyxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDO0lBQzFDLEtBQUssRUFBRSxJQUFJO0NBQ2QsQ0FBQztBQWtDRixNQUFNLE9BQU8sV0FBVztJQThJcEIsWUFBbUIsRUFBYyxFQUFVLEVBQXFCO1FBQTdDLE9BQUUsR0FBRixFQUFFLENBQVk7UUFBVSxPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQTVJdkQsZ0JBQVcsR0FBWSxLQUFLLENBQUM7UUFFN0IsV0FBTSxHQUFZLElBQUksQ0FBQztRQUV2QixpQkFBWSxHQUFXLFNBQVMsQ0FBQztRQW9DakMsd0JBQW1CLEdBQVcsZ0JBQWdCLENBQUM7UUFFL0Msd0JBQW1CLEdBQVcsa0JBQWtCLENBQUM7UUFFakQsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUUxQixTQUFJLEdBQVcsQ0FBQyxDQUFDO1FBRWpCLGVBQVUsR0FBWSxJ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O2dCQUVHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBRUcsZUFBZTtzQkFBdkIsS0FBSztnQkFFRyxXQUFXO3NCQUFuQixLQUFLO2dCQUVHLGlCQUFpQjtzQkFBekIsS0FBSztnQkFFRyxpQkFBaUI7c0JBQXpCLEtBQUs7Z0JBRUcsTUFBTTtzQkFBZCxLQUFLO2dCQUVHLE1BQU07c0JBQWQsS0FBSztnQkFFRyxVQUFVO3NCQUFsQixLQUFLO2dCQUVHLGVBQWU7c0JBQXZCLEtBQUs7Z0JBRWMsS0FBSztzQkFBeEIsU0FBUzt1QkFBQyxPQUFPO2dCQUVSLE9BQU87c0JBQWhCLE1BQU07Z0JBRUcsT0FBTztzQkFBaEIsTUFBTTtnQkFFRyxNQUFNO3NCQUFmLE1BQU07Z0JBRUcsU0FBUztzQkFBbEIsTUFBTTtnQkE0Q00sUUFBUTtzQkFBcEIsS0FBSzs7QUFnMkJWLE1BQU0sT0FBTyxpQkFBaUI7OzhHQUFqQixpQkFBaUI7K0dBQWpCLGlCQUFpQixpQkFoK0JqQixXQUFXLGFBNDlCVixZQUFZLEVBQUMsZUFBZSxFQUFFLFlBQVksYUE1OUIzQyxXQUFXOytHQWcrQlgsaUJBQWlCLFlBSmpCLENBQUMsWUFBWSxFQUFDLGVBQWUsRUFBRSxZQUFZLENBQUM7MkZBSTVDLGlCQUFpQjtrQkFMN0IsUUFBUTttQkFBQztvQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUMsZUFBZSxFQUFFLFlBQVksQ0FBQztvQkFDckQsT0FBTyxFQUFFLENBQUMsV0FBVyxDQUFDO29CQUN0QixZQUFZLEVBQUUsQ0FBQyxXQUFXLENBQUM7aUJBQzlCIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQge05nTW9kdWxlLENvbXBvbmVudCxDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgSW5wdXQsIEVsZW1lbnRSZWYsIFZpZXdDaGlsZCwgT25Jbml0LCBFdmVudEVtaXR0ZXIsIE91dHB1dCwgZm9yd2FyZFJlZiwgVmlld0VuY2Fwc3VsYXRpb24sIENoYW5nZURldGVjdG9yUmVmLCBTaW1wbGVDaGFuZ2VzfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtJbnB1dFRleHRNb2R1bGV9IGZyb20gJ3ByaW1lbmcvaW5wdXR0ZXh0JztcbmltcG9ydCB7IEJ1dHRvbk1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvYnV0dG9uJztcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3NvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuZXhwb3J0IGNvbnN0IElOUFVUTlVNQkVSX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gSW5wdXROdW1iZXIpLFxuICAgIG11bHRpOiB0cnVlXG59O1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLWlucHV0TnVtYmVyJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8c3BhbiBbbmdDbGFzc109XCJ7J3AtaW5wdXRudW1iZXIgcC1jb21wb25lbnQnOiB0cnVlLCdwLWlucHV0bnVtYmVyLWJ1dHRvbnMtc3RhY2tlZCc6IHRoaXMuc2hvd0J1dHRvbnMgJiYgdGhpcy5idXR0b25MYXlvdXQgPT09ICdzdGFja2VkJyxcbiAgICAgICAgICAgICAgICAncC1pbnB1dG51bWJlci1idXR0b25zLWhvcml6b250YWwnOiB0aGlzLnNob3dCdXR0b25zICYmIHRoaXMuYnV0dG9uTGF5b3V0ID09PSAnaG9yaXpvbnRhbCcsICdwLWlucHV0bnVtYmVyLWJ1dHRvbnMtdmVydGljYWwnOiB0aGlzLnNob3dCdXR0b25zICYmIHRoaXMuYnV0dG9uTGF5b3V0ID09PSAndmVydGljYWwnfVwiXG4gICAgICAgICAgICAgICAgW25nU3R5bGVdPVwic3R5bGVcIiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiPlxuICAgICAgICAgICAgPGlucHV0ICNpbnB1dCBbbmdDbGFzc109XCIncC1pbnB1dG51bWJlci1pbnB1dCdcIiBbbmdTdHlsZV09XCJpbnB1dFN0eWxlXCIgW2NsYXNzXT1cImlucHV0U3R5bGVDbGFzc1wiIHBJbnB1dFRleHQgW3ZhbHVlXT1cImZvcm1hdHRlZFZhbHVlKClcIiBbYXR0ci5wbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiIFthdHRyLnRpdGxlXT1cInRpdGxlXCIgW2F0dHIuaWRdPVwiaW5wdXRJZFwiXG4gICAgICAgICAgICAgICAgW2F0dHIuc2l6ZV09XCJzaXplXCIgW2F0dHIubmFtZV09XCJuYW1lXCIgW2F0dHIuYXV0b2NvbXBsZXRlXT1cImF1dG9jb21wbGV0ZVwiIFthdHRyLm1heGxlbmd0aF09XCJtYXhsZW5ndGhcIiBbYXR0ci50YWJpbmRleF09XCJ0YWJpbmRleFwiIFthdHRyLmFyaWEtbGFiZWxdPVwiYXJpYUxhYmVsXCJcbiAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLXJlcXVpcmVkXT1cImFyaWFSZXF1aXJlZFwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiIFthdHRyLnJlcXVpcmVkXT1cInJlcXVpcmVkXCIgW2F0dHIuYXJpYS12YWx1ZW1pbl09XCJtaW5cIiBbYXR0ci5hcmlhLXZhbHVlbWF4XT1cIm1heFwiIFtyZWFkb25seV09XCJyZWFkb25seVwiIGlucHV0bW9kZT1cImRlY2ltYWxcIlxuICAgICAgICAgICAgICAgIChpbnB1dCk9XCJvblVzZXJJbnB1dCgkZXZlbnQpXCIgKGtleWRvd24pPVwib25JbnB1dEtleURvd24oJGV2ZW50KVwiIChrZXlwcmVzcyk9XCJvbklucHV0S2V5UHJlc3MoJGV2ZW50KVwiIChwYXN0ZSk9XCJvblBhc3RlKCRldmVudClcIiAoY2xpY2spPVwib25JbnB1dENsaWNrKClcIlxuICAgICAgICAgICAgICAgIChmb2N1cyk9XCJvbklucHV0Rm9jdXMoJGV2ZW50KVwiIChibHVyKT1cIm9uSW5wdXRCbHVyKCRldmVudClcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC1pbnB1dG51bWJlci1idXR0b24tZ3JvdXBcIiAqbmdJZj1cInNob3dCdXR0b25zICYmIGJ1dHRvbkxheW91dCA9PT0gJ3N0YWNrZWQnXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgcEJ1dHRvbiBbbmdDbGFzc109XCJ7J3AtaW5wdXRudW1iZXItYnV0dG9uIHAtaW5wdXRudW1iZXItYnV0dG9uLXVwJzogdHJ1ZX1cIiBbY2xhc3NdPVwiaW5jcmVtZW50QnV0dG9uQ2xhc3NcIiBbaWNvbl09XCJpbmNyZW1lbnRCdXR0b25JY29uXCIgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgICAgICAgICAgICAgICAgKG1vdXNlZG93bik9XCJ0aGlzLm9uVXBCdXR0b25Nb3VzZURvd24oJGV2ZW50KVwiIChtb3VzZXVwKT1cIm9uVXBCdXR0b25Nb3VzZVVwKClcIiAobW91c2VsZWF2ZSk9XCJvblVwQnV0dG9uTW91c2VMZWF2ZSgpXCIgKGtleWRvd24pPVwib25VcEJ1dHRvbktleURvd24oJGV2ZW50KVwiIChrZXl1cCk9XCJvblVwQnV0dG9uS2V5VXAoKVwiPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIHBCdXR0b24gW25nQ2xhc3NdPVwieydwLWlucHV0bnVtYmVyLWJ1dHRvbiBwLWlucHV0bnVtYmVyLWJ1dHRvbi1kb3duJzogdHJ1ZX1cIiBbY2xhc3NdPVwiZGVjcmVtZW50QnV0dG9uQ2xhc3NcIiBbaWNvbl09XCJkZWNyZW1lbnRCdXR0b25JY29uXCIgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgICAgICAgICAgICAgICAgKG1vdXNlZG93bik9XCJ0aGlzLm9uRG93bkJ1dHRvbk1vdXNlRG93bigkZXZlbnQpXCIgKG1vdXNldXApPVwib25Eb3duQnV0dG9uTW91c2VVcCgpXCIgKG1vdXNlbGVhdmUpPVwib25Eb3duQnV0dG9uTW91c2VMZWF2ZSgpXCIgKGtleWRvd24pPVwib25Eb3duQnV0dG9uS2V5RG93bigkZXZlbnQpXCIgKGtleXVwKT1cIm9uRG93bkJ1dHRvbktleVVwKClcIj48L2J1dHRvbj5cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIHBCdXR0b24gW25nQ2xhc3NdPVwieydwLWlucHV0bnVtYmVyLWJ1dHRvbiBwLWlucHV0bnVtYmVyLWJ1dHRvbi11cCc6IHRydWV9XCIgW2NsYXNzXT1cImluY3JlbWVudEJ1dHRvbkNsYXNzXCIgW2ljb25dPVwiaW5jcmVtZW50QnV0dG9uSWNvblwiICpuZ0lmPVwic2hvd0J1dHRvbnMgJiYgYnV0dG9uTGF5b3V0ICE9PSAnc3RhY2tlZCdcIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgICAgICAgICAgIChtb3VzZWRvd24pPVwidGhpcy5vblVwQnV0dG9uTW91c2VEb3duKCRldmVudClcIiAobW91c2V1cCk9XCJvblVwQnV0dG9uTW91c2VVcCgpXCIgKG1vdXNlbGVhdmUpPVwib25VcEJ1dHRvbk1vdXNlTGVhdmUoKVwiIChrZXlkb3duKT1cIm9uVXBCdXR0b25LZXlEb3duKCRldmVudClcIiAoa2V5dXApPVwib25VcEJ1dHRvbktleVVwKClcIj48L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIHBCdXR0b24gW25nQ2xhc3NdPVwieydwLWlucHV0bnVtYmVyLWJ1dHRvbiBwLWlucHV0bnVtYmVyLWJ1dHRvbi1kb3duJzogdHJ1ZX1cIiBbY2xhc3NdPVwiZGVjcmVtZW50QnV0dG9uQ2xhc3NcIiBbaWNvbl09XCJkZWNyZW1lbnRCdXR0b25JY29uXCIgKm5nSWY9XCJzaG93QnV0dG9ucyAmJiBidXR0b25MYXlvdXQgIT09ICdzdGFja2VkJ1wiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgICAgICAgICAgKG1vdXNlZG93bik9XCJ0aGlzLm9uRG93bkJ1dHRvbk1vdXNlRG93bigkZXZlbnQpXCIgKG1vdXNldXApPVwib25Eb3duQnV0dG9uTW91c2VVcCgpXCIgKG1vdXNlbGVhdmUpPVwib25Eb3duQnV0dG9uTW91c2VMZWF2ZSgpXCIgKGtleWRvd24pPVwib25Eb3duQnV0dG9uS2V5RG93bigkZXZlbnQpXCIgKGtleXVwKT1cIm9uRG93bkJ1dHRvbktleVVwKClcIj48L2J1dHRvbj5cbiAgICAgICAgPC9zcGFuPlxuICAgIGAsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgcHJvdmlkZXJzOiBbSU5QVVROVU1CRVJfVkFMVUVfQUNDRVNTT1JdLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgc3R5bGVVcmxzOiBbJy4vaW5wdXRudW1iZXIuY3NzJ10sXG4gICAgaG9zdDoge1xuICAgICAgICAnY2xhc3MnOiAncC1lbGVtZW50IHAtaW5wdXR3cmFwcGVyJyxcbiAgICAgICAgJ1tjbGFzcy5wLWlucHV0d3JhcHBlci1maWxsZWRdJzogJ2ZpbGxlZCcsXG4gICAgICAgICdbY2xhc3MucC1pbnB1dHdyYXBwZXItZm9jdXNdJzogJ2ZvY3VzZWQnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBJbnB1dE51bWJlciBpbXBsZW1lbnRzIE9uSW5pdCxDb250cm9sVmFsdWVBY2Nlc3NvciB7XG5cbiAgICBASW5wdXQoKSBzaG93QnV0dG9uczogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KCkgZm9ybWF0OiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpIGJ1dHRvbkxheW91dDogc3RyaW5nID0gXCJzdGFja2VkXCI7XG5cbiAgICBASW5wdXQoKSBpbnB1dElkOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBzdHlsZTogYW55O1xuXG4gICAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIHNpemU6IG51bWJlcjtcblxuICAgIEBJbnB1dCgpIG1heGxlbmd0aDogbnVtYmVyO1xuXG4gICAgQElucHV0KCkgdGFiaW5kZXg6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIHRpdGxlOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBhcmlhTGFiZWw6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGFyaWFSZXF1aXJlZDogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIG5hbWU6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIHJlcXVpcmVkOiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgYXV0b2NvbXBsZXRlOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBtaW46IG51bWJlcjtcblxuICAgIEBJbnB1dCgpIG1heDogbnVtYmVyO1xuXG4gICAgQElucHV0KCkgaW5jcmVtZW50QnV0dG9uQ2xhc3M6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGRlY3JlbWVudEJ1dHRvbkNsYXNzOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBpbmNyZW1lbnRCdXR0b25JY29uOiBzdHJpbmcgPSAncGkgcGktYW5nbGUtdXAnO1xuXG4gICAgQElucHV0KCkgZGVjcmVtZW50QnV0dG9uSWNvbjogc3RyaW5nID0gJ3BpIHBpLWFuZ2xlLWRvd24nO1xuXG4gICAgQElucHV0KCkgcmVhZG9ubHk6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpIHN0ZXA6IG51bWJlciA9IDE7XG5cbiAgICBASW5wdXQoKSBhbGxvd0VtcHR5OiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpIGxvY2FsZTogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgbG9jYWxlTWF0Y2hlcjogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgbW9kZTogc3RyaW5nID0gXCJkZWNpbWFsXCI7XG5cbiAgICBASW5wdXQoKSBjdXJyZW5jeTogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgY3VycmVuY3lEaXNwbGF5OiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSB1c2VHcm91cGluZzogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKSBtaW5GcmFjdGlvbkRpZ2l0czogbnVtYmVyO1xuXG4gICAgQElucHV0KCkgbWF4RnJhY3Rpb25EaWdpdHM6IG51bWJlcjtcblxuICAgIEBJbnB1dCgpIHByZWZpeDogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgc3VmZml4OiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBpbnB1dFN0eWxlOiBhbnk7XG5cbiAgICBASW5wdXQoKSBpbnB1dFN0eWxlQ2xhc3M6IHN0cmluZztcblxuICAgIEBWaWV3Q2hpbGQoJ2lucHV0JykgaW5wdXQ6IEVsZW1lbnRSZWY7XG5cbiAgICBAT3V0cHV0KCkgb25JbnB1dDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25Gb2N1czogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25CbHVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBvbktleURvd246IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgdmFsdWU6IG51bWJlcjtcblxuICAgIG9uTW9kZWxDaGFuZ2U6IEZ1bmN0aW9uID0gKCkgPT4ge307XG5cbiAgICBvbk1vZGVsVG91Y2hlZDogRnVuY3Rpb24gPSAoKSA9PiB7fTtcblxuICAgIGZvY3VzZWQ6IGJvb2xlYW47XG5cbiAgICBpbml0aWFsaXplZDogYm9vbGVhbjtcblxuICAgIGdyb3VwQ2hhcjogc3RyaW5nID0gJyc7XG5cbiAgICBwcmVmaXhDaGFyOiBzdHJpbmcgPSAnJztcblxuICAgIHN1ZmZpeENoYXI6IHN0cmluZyA9ICcnO1xuXG4gICAgaXNTcGVjaWFsQ2hhcjogYm9vbGVhbjtcblxuICAgIHRpbWVyOiBhbnk7XG5cbiAgICBsYXN0VmFsdWU6IHN0cmluZztcblxuICAgIF9udW1lcmFsOiBhbnk7XG5cbiAgICBudW1iZXJGb3JtYXQ6IGFueTtcblxuICAgIF9kZWNpbWFsOiBhbnk7XG5cbiAgICBfZ3JvdXA6IGFueTtcblxuICAgIF9taW51c1NpZ246IGFueTtcblxuICAgIF9jdXJyZW5jeTogYW55O1xuXG4gICAgX3ByZWZpeDogYW55O1xuXG4gICAgX3N1ZmZpeDogYW55O1xuXG4gICAgX2luZGV4OiBhbnk7XG5cbiAgICBfZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcbiAgICB9XG5cbiAgICBzZXQgZGlzYWJsZWQoZGlzYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKGRpc2FibGVkKVxuICAgICAgICAgICAgdGhpcy5mb2N1c2VkID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5fZGlzYWJsZWQgPSBkaXNhYmxlZDtcblxuICAgICAgICBpZiAodGhpcy50aW1lcilcbiAgICAgICAgICAgIHRoaXMuY2xlYXJUaW1lcigpO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZiwgcHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYpIHsgfVxuXG4gICAgbmdPbkNoYW5nZXMoc2ltcGxlQ2hhbmdlOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIGNvbnN0IHByb3BzID0gWydsb2NhbGUnLCAnbG9jYWxlTWF0Y2hlcicsICdtb2RlJywgJ2N1cnJlbmN5JywgJ2N1cnJlbmN5RGlzcGxheScsICd1c2VHcm91cGluZycsICdtaW5GcmFjdGlvbkRpZ2l0cycsICdtYXhGcmFjdGlvbkRpZ2l0cycsICdwcmVmaXgnLCAnc3VmZml4J107XG4gICAgICAgIGlmIChwcm9wcy5zb21lKHAgPT4gISFzaW1wbGVDaGFuZ2VbcF0pKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNvbnN0cnVjdFBhcnNlcigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuY29uc3RydWN0UGFyc2VyKCk7XG5cbiAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XG4gICAgfVxuXG4gICAgZ2V0T3B0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGxvY2FsZU1hdGNoZXI6IHRoaXMubG9jYWxlTWF0Y2hlcixcbiAgICAgICAgICAgIHN0eWxlOiB0aGlzLm1vZGUsXG4gICAgICAgICAgICBjdXJyZW5jeTogdGhpcy5jdXJyZW5jeSxcbiAgICAgICAgICAgIGN1cnJlbmN5RGlzcGxheTogdGhpcy5jdXJyZW5jeURpc3BsYXksXG4gICAgICAgICAgICB1c2VHcm91cGluZzogdGhpcy51c2VHcm91cGluZyxcbiAgICAgICAgICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogdGhpcy5taW5GcmFjdGlvbkRpZ2l0cyxcbiAgICAgICAgICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogdGhpcy5tYXhGcmFjdGlvbkRpZ2l0c1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGNvbnN0cnVjdFBhcnNlcigpIHtcbiAgICAgICAgdGhpcy5udW1iZXJGb3JtYXQgPSBuZXcgSW50bC5OdW1iZXJGb3JtYXQodGhpcy5sb2NhbGUsIHRoaXMuZ2V0T3B0aW9ucygpKTtcbiAgICAgICAgY29uc3QgbnVtZXJhbHMgPSBbLi4ubmV3IEludGwuTnVtYmVyRm9ybWF0KHRoaXMubG9jYWxlLCB7dXNlR3JvdXBpbmc6IGZhbHNlfSkuZm9ybWF0KDk4NzY1NDMyMTApXS5yZXZlcnNlKCk7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gbmV3IE1hcChudW1lcmFscy5tYXAoKGQsIGkpID0+IFtkLCBpXSkpO1xuICAgICAgICB0aGlzLl9udW1lcmFsID0gbmV3IFJlZ0V4cChgWyR7bnVtZXJhbHMuam9pbignJyl9XWAsICdnJyk7XG4gICAgICAgIHRoaXMuX2dyb3VwID0gdGhpcy5nZXRHcm91cGluZ0V4cHJlc3Npb24oKTtcbiAgICAgICAgdGhpcy5fbWludXNTaWduID0gdGhpcy5nZXRNaW51c1NpZ25FeHByZXNzaW9uKCk7XG4gICAgICAgIHRoaXMuX2N1cnJlbmN5ID0gdGhpcy5nZXRDdXJyZW5jeUV4cHJlc3Npb24oKTtcbiAgICAgICAgdGhpcy5fZGVjaW1hbCA9IHRoaXMuZ2V0RGVjaW1hbEV4cHJlc3Npb24oKTtcbiAgICAgICAgdGhpcy5fc3VmZml4ID0gdGhpcy5nZXRTdWZmaXhFeHByZXNzaW9uKCk7XG4gICAgICAgIHRoaXMuX3ByZWZpeCA9IHRoaXMuZ2V0UHJlZml4RXhwcmVzc2lvbigpO1xuICAgICAgICB0aGlzLl9pbmRleCA9IGQgPT4gaW5kZXguZ2V0KGQpO1xuICAgIH1cblxuICAgIHVwZGF0ZUNvbnN0cnVjdFBhcnNlcigpIHtcbiAgICAgICAgaWYgKHRoaXMuaW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuY29uc3RydWN0UGFyc2VyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBlc2NhcGVSZWdFeHAodGV4dCkge1xuICAgICAgICByZXR1cm4gdGV4dC5yZXBsYWNlKC9bLVtcXF17fSgpKis/LixcXFxcXiR8I1xcc10vZywgJ1xcXFwkJicpO1xuICAgIH1cblxuICAgIGdldERlY2ltYWxFeHByZXNzaW9uKCkge1xuICAgICAgICBjb25zdCBmb3JtYXR0ZXIgPSBuZXcgSW50bC5OdW1iZXJGb3JtYXQodGhpcy5sb2NhbGUsIHsuLi50aGlzLmdldE9wdGlvbnMoKSwgdXNlR3JvdXBpbmc6IGZhbHNlfSk7XG4gICAgICAgIHJldHVybiBuZXcgUmVnRXhwKGBbJHtmb3JtYXR0ZXIuZm9ybWF0KDEuMSkucmVwbGFjZSh0aGlzLl9jdXJyZW5jeSwgJycpLnRyaW0oKS5yZXBsYWNlKHRoaXMuX251bWVyYWwsICcnKX1dYCwgJ2cnKTtcbiAgICB9XG5cbiAgICBnZXRHcm91cGluZ0V4cHJlc3Npb24oKSB7XG4gICAgICAgIGNvbnN0IGZvcm1hdHRlciA9IG5ldyBJbnRsLk51bWJlckZvcm1hdCh0aGlzLmxvY2FsZSwge3VzZUdyb3VwaW5nOiB0cnVlfSk7XG4gICAgICAgIHRoaXMuZ3JvdXBDaGFyID0gZm9ybWF0dGVyLmZvcm1hdCgxMDAwMDAwKS50cmltKCkucmVwbGFjZSh0aGlzLl9udW1lcmFsLCAnJykuY2hhckF0KDApO1xuICAgICAgICByZXR1cm4gbmV3IFJlZ0V4cChgWyR7dGhpcy5ncm91cENoYXJ9XWAsICdnJyk7XG4gICAgfVxuXG4gICAgZ2V0TWludXNTaWduRXhwcmVzc2lvbigpIHtcbiAgICAgICAgY29uc3QgZm9ybWF0dGVyID0gbmV3IEludGwuTnVtYmVyRm9ybWF0KHRoaXMubG9jYWxlLCB7dXNlR3JvdXBpbmc6IGZhbHNlfSk7XG4gICAgICAgIHJldHVybiBuZXcgUmVnRXhwKGBbJHtmb3JtYXR0ZXIuZm9ybWF0KC0xKS50cmltKCkucmVwbGFjZSh0aGlzLl9udW1lcmFsLCAnJyl9XWAsICdnJyk7XG4gICAgfVxuXG4gICAgZ2V0Q3VycmVuY3lFeHByZXNzaW9uKCkge1xuICAgICAgICBpZiAodGhpcy5jdXJyZW5jeSkge1xuICAgICAgICAgICAgY29uc3QgZm9ybWF0dGVyID0gbmV3IEludGwuTnVtYmVyRm9ybWF0KHRoaXMubG9jYWxlLCB7c3R5bGU6ICdjdXJyZW5jeScsIGN1cnJlbmN5OiB0aGlzLmN1cnJlbmN5LCBjdXJyZW5jeURpc3BsYXk6IHRoaXMuY3VycmVuY3lEaXNwbGF5LFxuICAgICAgICAgICAgICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMCwgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiAwfSk7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFJlZ0V4cChgWyR7Zm9ybWF0dGVyLmZvcm1hdCgxKS5yZXBsYWNlKC9cXHMvZywgJycpLnJlcGxhY2UodGhpcy5fbnVtZXJhbCwgJycpLnJlcGxhY2UodGhpcy5fZ3JvdXAsICcnKX1dYCwgJ2cnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXcgUmVnRXhwKGBbXWAsJ2cnKTtcbiAgICB9XG5cbiAgICBnZXRQcmVmaXhFeHByZXNzaW9uKCkge1xuICAgICAgICBpZiAodGhpcy5wcmVmaXgpIHtcbiAgICAgICAgICAgIHRoaXMucHJlZml4Q2hhciA9IHRoaXMucHJlZml4O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgZm9ybWF0dGVyID0gbmV3IEludGwuTnVtYmVyRm9ybWF0KHRoaXMubG9jYWxlLCB7c3R5bGU6IHRoaXMubW9kZSwgY3VycmVuY3k6IHRoaXMuY3VycmVuY3ksIGN1cnJlbmN5RGlzcGxheTogdGhpcy5jdXJyZW5jeURpc3BsYXl9KTtcbiAgICAgICAgICAgIHRoaXMucHJlZml4Q2hhciA9IGZvcm1hdHRlci5mb3JtYXQoMSkuc3BsaXQoJzEnKVswXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXcgUmVnRXhwKGAke3RoaXMuZXNjYXBlUmVnRXhwKHRoaXMucHJlZml4Q2hhcnx8JycpfWAsICdnJyk7XG4gICAgfVxuXG4gICAgZ2V0U3VmZml4RXhwcmVzc2lvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuc3VmZml4KSB7XG4gICAgICAgICAgICB0aGlzLnN1ZmZpeENoYXIgPSB0aGlzLnN1ZmZpeDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGZvcm1hdHRlciA9IG5ldyBJbnRsLk51bWJlckZvcm1hdCh0aGlzLmxvY2FsZSwge3N0eWxlOiB0aGlzLm1vZGUsIGN1cnJlbmN5OiB0aGlzLmN1cnJlbmN5LCBjdXJyZW5jeURpc3BsYXk6IHRoaXMuY3VycmVuY3lEaXNwbGF5LFxuICAgICAgICAgICAgICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMCwgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiAwfSk7XG4gICAgICAgICAgICB0aGlzLnN1ZmZpeENoYXIgPSBmb3JtYXR0ZXIuZm9ybWF0KDEpLnNwbGl0KCcxJylbMV07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3IFJlZ0V4cChgJHt0aGlzLmVzY2FwZVJlZ0V4cCh0aGlzLnN1ZmZpeENoYXJ8fCcnKX1gLCAnZycpO1xuICAgIH1cblxuICAgIGZvcm1hdFZhbHVlKHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSAhPSBudWxsKSB7XG4gICAgICAgICAgICBpZiAodmFsdWUgPT09ICctJykgeyAvLyBNaW51cyBzaWduXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5mb3JtYXQpIHtcbiAgICAgICAgICAgICAgICBsZXQgZm9ybWF0dGVyID0gbmV3IEludGwuTnVtYmVyRm9ybWF0KHRoaXMubG9jYWxlLCB0aGlzLmdldE9wdGlvbnMoKSk7XG4gICAgICAgICAgICAgICAgbGV0IGZvcm1hdHRlZFZhbHVlID0gZm9ybWF0dGVyLmZvcm1hdCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucHJlZml4KSB7XG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdHRlZFZhbHVlID0gdGhpcy5wcmVmaXggKyBmb3JtYXR0ZWRWYWx1ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdWZmaXgpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0dGVkVmFsdWUgPSBmb3JtYXR0ZWRWYWx1ZSArIHRoaXMuc3VmZml4O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBmb3JtYXR0ZWRWYWx1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgcGFyc2VWYWx1ZSh0ZXh0KSB7XG4gICAgICAgIGxldCBmaWx0ZXJlZFRleHQgPSB0ZXh0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UodGhpcy5fc3VmZml4LCAnJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSh0aGlzLl9wcmVmaXgsICcnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50cmltKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFxzL2csICcnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKHRoaXMuX2N1cnJlbmN5LCAnJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSh0aGlzLl9ncm91cCwgJycpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UodGhpcy5fbWludXNTaWduLCAnLScpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UodGhpcy5fZGVjaW1hbCwgJy4nKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKHRoaXMuX251bWVyYWwsIHRoaXMuX2luZGV4KTtcblxuICAgICAgICBpZiAoZmlsdGVyZWRUZXh0KSB7XG4gICAgICAgICAgICBpZiAoZmlsdGVyZWRUZXh0ID09PSAnLScpIC8vIE1pbnVzIHNpZ25cbiAgICAgICAgICAgICAgICByZXR1cm4gZmlsdGVyZWRUZXh0O1xuXG4gICAgICAgICAgICBsZXQgcGFyc2VkVmFsdWUgPSArZmlsdGVyZWRUZXh0O1xuICAgICAgICAgICAgcmV0dXJuIGlzTmFOKHBhcnNlZFZhbHVlKSA/IG51bGwgOiBwYXJzZWRWYWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJlcGVhdChldmVudCwgaW50ZXJ2YWwsIGRpcikge1xuICAgICAgICBpZiAodGhpcy5yZWFkb25seSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGkgPSBpbnRlcnZhbCB8fCA1MDA7XG5cbiAgICAgICAgdGhpcy5jbGVhclRpbWVyKCk7XG4gICAgICAgIHRoaXMudGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVwZWF0KGV2ZW50LCA0MCwgZGlyKTtcbiAgICAgICAgfSwgaSk7XG5cbiAgICAgICAgdGhpcy5zcGluKGV2ZW50LCBkaXIpO1xuICAgIH1cblxuICAgIHNwaW4oZXZlbnQsIGRpcikge1xuICAgICAgICBsZXQgc3RlcCA9IHRoaXMuc3RlcCAqIGRpcjtcbiAgICAgICAgbGV0IGN1cnJlbnRWYWx1ZSA9IHRoaXMucGFyc2VWYWx1ZSh0aGlzLmlucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWUpIHx8IDA7XG4gICAgICAgIGxldCBuZXdWYWx1ZSA9IHRoaXMudmFsaWRhdGVWYWx1ZShjdXJyZW50VmFsdWUgKyBzdGVwKTtcbiAgICAgICAgaWYgKHRoaXMubWF4bGVuZ3RoICYmIHRoaXMubWF4bGVuZ3RoIDwgdGhpcy5mb3JtYXRWYWx1ZShuZXdWYWx1ZSkubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnVwZGF0ZUlucHV0KG5ld1ZhbHVlLCBudWxsLCAnc3BpbicsIG51bGwpO1xuICAgICAgICB0aGlzLnVwZGF0ZU1vZGVsKGV2ZW50LCBuZXdWYWx1ZSk7XG5cbiAgICAgICAgdGhpcy5oYW5kbGVPbklucHV0KGV2ZW50LCBjdXJyZW50VmFsdWUsIG5ld1ZhbHVlKTtcbiAgICB9XG5cbiAgICBvblVwQnV0dG9uTW91c2VEb3duKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuaW5wdXQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICB0aGlzLnJlcGVhdChldmVudCwgbnVsbCwgMSk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgb25VcEJ1dHRvbk1vdXNlVXAoKSB7XG4gICAgICAgIHRoaXMuY2xlYXJUaW1lcigpO1xuICAgIH1cblxuICAgIG9uVXBCdXR0b25Nb3VzZUxlYXZlKCkge1xuICAgICAgICB0aGlzLmNsZWFyVGltZXIoKTtcbiAgICB9XG5cbiAgICBvblVwQnV0dG9uS2V5RG93bihldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzIgfHwgZXZlbnQua2V5Q29kZSA9PT0gMTMpIHtcbiAgICAgICAgICAgIHRoaXMucmVwZWF0KGV2ZW50LCBudWxsLCAxKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uVXBCdXR0b25LZXlVcCgpIHtcbiAgICAgICAgdGhpcy5jbGVhclRpbWVyKCk7XG4gICAgfVxuXG4gICAgb25Eb3duQnV0dG9uTW91c2VEb3duKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuaW5wdXQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICB0aGlzLnJlcGVhdChldmVudCwgbnVsbCwgLTEpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIG9uRG93bkJ1dHRvbk1vdXNlVXAoKSB7XG4gICAgICAgIHRoaXMuY2xlYXJUaW1lcigpO1xuICAgIH1cblxuICAgIG9uRG93bkJ1dHRvbk1vdXNlTGVhdmUoKSB7XG4gICAgICAgIHRoaXMuY2xlYXJUaW1lcigpO1xuICAgIH1cblxuICAgIG9uRG93bkJ1dHRvbktleVVwKCkge1xuICAgICAgICB0aGlzLmNsZWFyVGltZXIoKTtcbiAgICB9XG5cbiAgICBvbkRvd25CdXR0b25LZXlEb3duKGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSAzMiB8fCBldmVudC5rZXlDb2RlID09PSAxMykge1xuICAgICAgICAgICAgdGhpcy5yZXBlYXQoZXZlbnQsIG51bGwsIC0xKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uVXNlcklucHV0KGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmlzU3BlY2lhbENoYXIpIHtcbiAgICAgICAgICAgIGV2ZW50LnRhcmdldC52YWx1ZSA9IHRoaXMubGFzdFZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaXNTcGVjaWFsQ2hhciA9IGZhbHNlO1xuICAgIH1cblxuICAgIG9uSW5wdXRLZXlEb3duKGV2ZW50KSB7XG4gICAgICAgIHRoaXMubGFzdFZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgICAgICBpZiAoZXZlbnQuc2hpZnRLZXkgfHwgZXZlbnQuYWx0S2V5KSB7XG4gICAgICAgICAgICB0aGlzLmlzU3BlY2lhbENoYXIgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHNlbGVjdGlvblN0YXJ0ID0gZXZlbnQudGFyZ2V0LnNlbGVjdGlvblN0YXJ0O1xuICAgICAgICBsZXQgc2VsZWN0aW9uRW5kID0gZXZlbnQudGFyZ2V0LnNlbGVjdGlvbkVuZDtcbiAgICAgICAgbGV0IGlucHV0VmFsdWUgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgICAgIGxldCBuZXdWYWx1ZVN0ciA9IG51bGw7XG5cbiAgICAgICAgaWYgKGV2ZW50LmFsdEtleSkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXRjaCAoZXZlbnQud2hpY2gpIHtcbiAgICAgICAgICAgIC8vdXBcbiAgICAgICAgICAgIGNhc2UgMzg6XG4gICAgICAgICAgICAgICAgdGhpcy5zcGluKGV2ZW50LCAxKTtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIC8vZG93blxuICAgICAgICAgICAgY2FzZSA0MDpcbiAgICAgICAgICAgICAgICB0aGlzLnNwaW4oZXZlbnQsIC0xKTtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIC8vbGVmdFxuICAgICAgICAgICAgY2FzZSAzNzpcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNOdW1lcmFsQ2hhcihpbnB1dFZhbHVlLmNoYXJBdChzZWxlY3Rpb25TdGFydCAtIDEpKSkge1xuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAvL3JpZ2h0XG4gICAgICAgICAgICBjYXNlIDM5OlxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc051bWVyYWxDaGFyKGlucHV0VmFsdWUuY2hhckF0KHNlbGVjdGlvblN0YXJ0KSkpIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgLy9lbnRlclxuICAgICAgICAgICAgY2FzZSAxMzpcbiAgICAgICAgICAgICAgICBuZXdWYWx1ZVN0ciA9IHRoaXMudmFsaWRhdGVWYWx1ZSh0aGlzLnBhcnNlVmFsdWUodGhpcy5pbnB1dC5uYXRpdmVFbGVtZW50LnZhbHVlKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5pbnB1dC5uYXRpdmVFbGVtZW50LnZhbHVlID0gdGhpcy5mb3JtYXRWYWx1ZShuZXdWYWx1ZVN0cik7XG4gICAgICAgICAgICAgICAgdGhpcy5pbnB1dC5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS12YWx1ZW5vdycsIG5ld1ZhbHVlU3RyKTtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZU1vZGVsKGV2ZW50LCBuZXdWYWx1ZVN0cik7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgLy9iYWNrc3BhY2VcbiAgICAgICAgICAgIGNhc2UgODoge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0aW9uU3RhcnQgPT09IHNlbGVjdGlvbkVuZCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkZWxldGVDaGFyID0gaW5wdXRWYWx1ZS5jaGFyQXQoc2VsZWN0aW9uU3RhcnQgLSAxKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBkZWNpbWFsQ2hhckluZGV4LCBkZWNpbWFsQ2hhckluZGV4V2l0aG91dFByZWZpeCB9ID0gdGhpcy5nZXREZWNpbWFsQ2hhckluZGV4ZXMoaW5wdXRWYWx1ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNOdW1lcmFsQ2hhcihkZWxldGVDaGFyKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGVjaW1hbExlbmd0aCA9IHRoaXMuZ2V0RGVjaW1hbExlbmd0aChpbnB1dFZhbHVlKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2dyb3VwLnRlc3QoZGVsZXRlQ2hhcikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9ncm91cC5sYXN0SW5kZXggPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1ZhbHVlU3RyID0gaW5wdXRWYWx1ZS5zbGljZSgwLCBzZWxlY3Rpb25TdGFydCAtIDIpICsgaW5wdXRWYWx1ZS5zbGljZShzZWxlY3Rpb25TdGFydCAtIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5fZGVjaW1hbC50ZXN0KGRlbGV0ZUNoYXIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGVjaW1hbC5sYXN0SW5kZXggPSAwO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlY2ltYWxMZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnB1dC5uYXRpdmVFbGVtZW50LnNldFNlbGVjdGlvblJhbmdlKHNlbGVjdGlvblN0YXJ0IC0gMSwgc2VsZWN0aW9uU3RhcnQgLSAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1ZhbHVlU3RyID0gaW5wdXRWYWx1ZS5zbGljZSgwLCBzZWxlY3Rpb25TdGFydCAtIDEpICsgaW5wdXRWYWx1ZS5zbGljZShzZWxlY3Rpb25TdGFydCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoZGVjaW1hbENoYXJJbmRleCA+IDAgJiYgc2VsZWN0aW9uU3RhcnQgPiBkZWNpbWFsQ2hhckluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5zZXJ0ZWRUZXh0ID0gdGhpcy5pc0RlY2ltYWxNb2RlKCkgJiYgKHRoaXMubWluRnJhY3Rpb25EaWdpdHMgfHwgMCkgPCBkZWNpbWFsTGVuZ3RoID8gJycgOiAnMCc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3VmFsdWVTdHIgPSBpbnB1dFZhbHVlLnNsaWNlKDAsIHNlbGVjdGlvblN0YXJ0IC0gMSkgKyBpbnNlcnRlZFRleHQgKyBpbnB1dFZhbHVlLnNsaWNlKHNlbGVjdGlvblN0YXJ0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGRlY2ltYWxDaGFySW5kZXhXaXRob3V0UHJlZml4ID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3VmFsdWVTdHIgPSBpbnB1dFZhbHVlLnNsaWNlKDAsIHNlbGVjdGlvblN0YXJ0IC0gMSkgKyAnMCcgKyBpbnB1dFZhbHVlLnNsaWNlKHNlbGVjdGlvblN0YXJ0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdWYWx1ZVN0ciA9IHRoaXMucGFyc2VWYWx1ZShuZXdWYWx1ZVN0cikgPiAwID8gbmV3VmFsdWVTdHIgOiAnJztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1ZhbHVlU3RyID0gaW5wdXRWYWx1ZS5zbGljZSgwLCBzZWxlY3Rpb25TdGFydCAtIDEpICsgaW5wdXRWYWx1ZS5zbGljZShzZWxlY3Rpb25TdGFydCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVZhbHVlKGV2ZW50LCBuZXdWYWx1ZVN0ciwgbnVsbCwgJ2RlbGV0ZS1zaW5nbGUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld1ZhbHVlU3RyID0gdGhpcy5kZWxldGVSYW5nZShpbnB1dFZhbHVlLCBzZWxlY3Rpb25TdGFydCwgc2VsZWN0aW9uRW5kKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVWYWx1ZShldmVudCwgbmV3VmFsdWVTdHIsIG51bGwsICdkZWxldGUtcmFuZ2UnKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gZGVsXG4gICAgICAgICAgICBjYXNlIDQ2OlxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0aW9uU3RhcnQgPT09IHNlbGVjdGlvbkVuZCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkZWxldGVDaGFyID0gaW5wdXRWYWx1ZS5jaGFyQXQoc2VsZWN0aW9uU3RhcnQpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB7IGRlY2ltYWxDaGFySW5kZXgsIGRlY2ltYWxDaGFySW5kZXhXaXRob3V0UHJlZml4IH0gPSB0aGlzLmdldERlY2ltYWxDaGFySW5kZXhlcyhpbnB1dFZhbHVlKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc051bWVyYWxDaGFyKGRlbGV0ZUNoYXIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkZWNpbWFsTGVuZ3RoID0gdGhpcy5nZXREZWNpbWFsTGVuZ3RoKGlucHV0VmFsdWUpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fZ3JvdXAudGVzdChkZWxldGVDaGFyKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2dyb3VwLmxhc3RJbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3VmFsdWVTdHIgPSBpbnB1dFZhbHVlLnNsaWNlKDAsIHNlbGVjdGlvblN0YXJ0KSArIGlucHV0VmFsdWUuc2xpY2Uoc2VsZWN0aW9uU3RhcnQgKyAyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuX2RlY2ltYWwudGVzdChkZWxldGVDaGFyKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2RlY2ltYWwubGFzdEluZGV4ID0gMDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkZWNpbWFsTGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5wdXQubmF0aXZlRWxlbWVudC5zZXRTZWxlY3Rpb25SYW5nZShzZWxlY3Rpb25TdGFydCArIDEsIHNlbGVjdGlvblN0YXJ0ICsgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdWYWx1ZVN0ciA9IGlucHV0VmFsdWUuc2xpY2UoMCwgc2VsZWN0aW9uU3RhcnQpICsgaW5wdXRWYWx1ZS5zbGljZShzZWxlY3Rpb25TdGFydCArIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGRlY2ltYWxDaGFySW5kZXggPiAwICYmIHNlbGVjdGlvblN0YXJ0ID4gZGVjaW1hbENoYXJJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGluc2VydGVkVGV4dCA9IHRoaXMuaXNEZWNpbWFsTW9kZSgpICYmICh0aGlzLm1pbkZyYWN0aW9uRGlnaXRzIHx8IDApIDwgZGVjaW1hbExlbmd0aCA/ICcnIDogJzAnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1ZhbHVlU3RyID0gaW5wdXRWYWx1ZS5zbGljZSgwLCBzZWxlY3Rpb25TdGFydCkgKyBpbnNlcnRlZFRleHQgKyBpbnB1dFZhbHVlLnNsaWNlKHNlbGVjdGlvblN0YXJ0ICsgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChkZWNpbWFsQ2hhckluZGV4V2l0aG91dFByZWZpeCA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1ZhbHVlU3RyID0gaW5wdXRWYWx1ZS5zbGljZSgwLCBzZWxlY3Rpb25TdGFydCkgKyAnMCcgKyBpbnB1dFZhbHVlLnNsaWNlKHNlbGVjdGlvblN0YXJ0ICsgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3VmFsdWVTdHIgPSB0aGlzLnBhcnNlVmFsdWUobmV3VmFsdWVTdHIpID4gMCA/IG5ld1ZhbHVlU3RyIDogJyc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdWYWx1ZVN0ciA9IGlucHV0VmFsdWUuc2xpY2UoMCwgc2VsZWN0aW9uU3RhcnQpICsgaW5wdXRWYWx1ZS5zbGljZShzZWxlY3Rpb25TdGFydCArIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVWYWx1ZShldmVudCwgbmV3VmFsdWVTdHIsIG51bGwsICdkZWxldGUtYmFjay1zaW5nbGUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld1ZhbHVlU3RyID0gdGhpcy5kZWxldGVSYW5nZShpbnB1dFZhbHVlLCBzZWxlY3Rpb25TdGFydCwgc2VsZWN0aW9uRW5kKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVWYWx1ZShldmVudCwgbmV3VmFsdWVTdHIsIG51bGwsICdkZWxldGUtcmFuZ2UnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vbktleURvd24uZW1pdChldmVudCk7XG4gICAgfVxuXG4gICAgb25JbnB1dEtleVByZXNzKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGxldCBjb2RlID0gZXZlbnQud2hpY2ggfHwgZXZlbnQua2V5Q29kZTtcbiAgICAgICAgbGV0IGNoYXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGUpO1xuICAgICAgICBjb25zdCBpc0RlY2ltYWxTaWduID0gdGhpcy5pc0RlY2ltYWxTaWduKGNoYXIpO1xuICAgICAgICBjb25zdCBpc01pbnVzU2lnbiA9IHRoaXMuaXNNaW51c1NpZ24oY2hhcik7XG5cbiAgICAgICAgaWYgKCg0OCA8PSBjb2RlICYmIGNvZGUgPD0gNTcpIHx8IGlzTWludXNTaWduIHx8IGlzRGVjaW1hbFNpZ24pIHtcbiAgICAgICAgICAgIHRoaXMuaW5zZXJ0KGV2ZW50LCBjaGFyLCB7IGlzRGVjaW1hbFNpZ24sIGlzTWludXNTaWduIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25QYXN0ZShldmVudCkge1xuICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IChldmVudC5jbGlwYm9hcmREYXRhIHx8IHdpbmRvd1snY2xpcGJvYXJkRGF0YSddKS5nZXREYXRhKCdUZXh0Jyk7XG4gICAgICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgICAgIGxldCBmaWx0ZXJlZERhdGEgPSB0aGlzLnBhcnNlVmFsdWUoZGF0YSk7XG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlcmVkRGF0YSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5zZXJ0KGV2ZW50LCBmaWx0ZXJlZERhdGEudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWxsb3dNaW51c1NpZ24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1pbiA9PSBudWxsIHx8IHRoaXMubWluIDwgMDtcbiAgICB9XG5cbiAgICBpc01pbnVzU2lnbihjaGFyKSB7XG4gICAgICAgIGlmICh0aGlzLl9taW51c1NpZ24udGVzdChjaGFyKSB8fCBjaGFyID09PSAnLScpIHtcbiAgICAgICAgICAgIHRoaXMuX21pbnVzU2lnbi5sYXN0SW5kZXggPSAwO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaXNEZWNpbWFsU2lnbihjaGFyKSB7XG4gICAgICAgIGlmICh0aGlzLl9kZWNpbWFsLnRlc3QoY2hhcikpIHtcbiAgICAgICAgICAgIHRoaXMuX2RlY2ltYWwubGFzdEluZGV4ID0gMDtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlzRGVjaW1hbE1vZGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vZGUgPT09ICdkZWNpbWFsJztcbiAgICB9XG5cbiAgICBnZXREZWNpbWFsQ2hhckluZGV4ZXModmFsKSB7XG4gICAgICAgIGxldCBkZWNpbWFsQ2hhckluZGV4ID0gdmFsLnNlYXJjaCh0aGlzLl9kZWNpbWFsKTtcbiAgICAgICAgdGhpcy5fZGVjaW1hbC5sYXN0SW5kZXggPSAwO1xuXG4gICAgICAgIGNvbnN0IGZpbHRlcmVkVmFsID0gdmFsLnJlcGxhY2UodGhpcy5fcHJlZml4LCAnJykudHJpbSgpLnJlcGxhY2UoL1xccy9nLCAnJykucmVwbGFjZSh0aGlzLl9jdXJyZW5jeSwgJycpO1xuICAgICAgICBjb25zdCBkZWNpbWFsQ2hhckluZGV4V2l0aG91dFByZWZpeCA9IGZpbHRlcmVkVmFsLnNlYXJjaCh0aGlzLl9kZWNpbWFsKTtcbiAgICAgICAgdGhpcy5fZGVjaW1hbC5sYXN0SW5kZXggPSAwO1xuXG4gICAgICAgIHJldHVybiB7IGRlY2ltYWxDaGFySW5kZXgsIGRlY2ltYWxDaGFySW5kZXhXaXRob3V0UHJlZml4IH07XG4gICAgfVxuXG4gICAgZ2V0Q2hhckluZGV4ZXModmFsKSB7XG4gICAgICAgIGNvbnN0IGRlY2ltYWxDaGFySW5kZXggPSB2YWwuc2VhcmNoKHRoaXMuX2RlY2ltYWwpO1xuICAgICAgICB0aGlzLl9kZWNpbWFsLmxhc3RJbmRleCA9IDA7XG4gICAgICAgIGNvbnN0IG1pbnVzQ2hhckluZGV4ID0gdmFsLnNlYXJjaCh0aGlzLl9taW51c1NpZ24pO1xuICAgICAgICB0aGlzLl9taW51c1NpZ24ubGFzdEluZGV4ID0gMDtcbiAgICAgICAgY29uc3Qgc3VmZml4Q2hhckluZGV4ID0gdmFsLnNlYXJjaCh0aGlzLl9zdWZmaXgpO1xuICAgICAgICB0aGlzLl9zdWZmaXgubGFzdEluZGV4ID0gMDtcbiAgICAgICAgY29uc3QgY3VycmVuY3lDaGFySW5kZXggPSB2YWwuc2VhcmNoKHRoaXMuX2N1cnJlbmN5KTtcbiAgICAgICAgdGhpcy5fY3VycmVuY3kubGFzdEluZGV4ID0gMDtcblxuICAgICAgICByZXR1cm4geyBkZWNpbWFsQ2hhckluZGV4LCBtaW51c0NoYXJJbmRleCwgc3VmZml4Q2hhckluZGV4LCBjdXJyZW5jeUNoYXJJbmRleCB9O1xuICAgIH1cblxuICAgIGluc2VydChldmVudCwgdGV4dCwgc2lnbiA9IHsgaXNEZWNpbWFsU2lnbjogZmFsc2UsIGlzTWludXNTaWduOiBmYWxzZSB9KSB7XG4gICAgICAgIGNvbnN0IG1pbnVzQ2hhckluZGV4T25UZXh0ID0gdGV4dC5zZWFyY2godGhpcy5fbWludXNTaWduKTtcbiAgICAgICAgdGhpcy5fbWludXNTaWduLmxhc3RJbmRleCA9IDA7XG4gICAgICAgIGlmICghdGhpcy5hbGxvd01pbnVzU2lnbigpICYmIG1pbnVzQ2hhckluZGV4T25UZXh0ICE9PSAtMSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHNlbGVjdGlvblN0YXJ0ID0gdGhpcy5pbnB1dC5uYXRpdmVFbGVtZW50LnNlbGVjdGlvblN0YXJ0O1xuICAgICAgICBsZXQgc2VsZWN0aW9uRW5kID0gdGhpcy5pbnB1dC5uYXRpdmVFbGVtZW50LnNlbGVjdGlvbkVuZDtcbiAgICAgICAgbGV0IGlucHV0VmFsdWUgPSB0aGlzLmlucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWUudHJpbSgpO1xuICAgICAgICBjb25zdCB7IGRlY2ltYWxDaGFySW5kZXgsIG1pbnVzQ2hhckluZGV4LCBzdWZmaXhDaGFySW5kZXgsIGN1cnJlbmN5Q2hhckluZGV4IH0gPSB0aGlzLmdldENoYXJJbmRleGVzKGlucHV0VmFsdWUpO1xuICAgICAgICBsZXQgbmV3VmFsdWVTdHI7XG5cbiAgICAgICAgaWYgKHNpZ24uaXNNaW51c1NpZ24pIHtcbiAgICAgICAgICAgIGlmIChzZWxlY3Rpb25TdGFydCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIG5ld1ZhbHVlU3RyID0gaW5wdXRWYWx1ZTtcbiAgICAgICAgICAgICAgICBpZiAobWludXNDaGFySW5kZXggPT09IC0xIHx8IHNlbGVjdGlvbkVuZCAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBuZXdWYWx1ZVN0ciA9IHRoaXMuaW5zZXJ0VGV4dChpbnB1dFZhbHVlLCB0ZXh0LCAwLCBzZWxlY3Rpb25FbmQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVmFsdWUoZXZlbnQsIG5ld1ZhbHVlU3RyLCB0ZXh0LCAnaW5zZXJ0Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoc2lnbi5pc0RlY2ltYWxTaWduKSB7XG4gICAgICAgICAgICBpZiAoZGVjaW1hbENoYXJJbmRleCA+IDAgJiYgc2VsZWN0aW9uU3RhcnQgPT09IGRlY2ltYWxDaGFySW5kZXgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVZhbHVlKGV2ZW50LCBpbnB1dFZhbHVlLCB0ZXh0LCAnaW5zZXJ0Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChkZWNpbWFsQ2hhckluZGV4ID4gc2VsZWN0aW9uU3RhcnQgJiYgZGVjaW1hbENoYXJJbmRleCA8IHNlbGVjdGlvbkVuZCkge1xuICAgICAgICAgICAgICAgIG5ld1ZhbHVlU3RyID0gdGhpcy5pbnNlcnRUZXh0KGlucHV0VmFsdWUsIHRleHQsIHNlbGVjdGlvblN0YXJ0LCBzZWxlY3Rpb25FbmQpO1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVmFsdWUoZXZlbnQsIG5ld1ZhbHVlU3RyLCB0ZXh0LCAnaW5zZXJ0Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChkZWNpbWFsQ2hhckluZGV4ID09PSAtMSAmJiB0aGlzLm1heEZyYWN0aW9uRGlnaXRzKSB7XG4gICAgICAgICAgICAgICAgbmV3VmFsdWVTdHIgPSB0aGlzLmluc2VydFRleHQoaW5wdXRWYWx1ZSwgdGV4dCwgc2VsZWN0aW9uU3RhcnQsIHNlbGVjdGlvbkVuZCk7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVWYWx1ZShldmVudCwgbmV3VmFsdWVTdHIsIHRleHQsICdpbnNlcnQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IG1heEZyYWN0aW9uRGlnaXRzID0gdGhpcy5udW1iZXJGb3JtYXQucmVzb2x2ZWRPcHRpb25zKCkubWF4aW11bUZyYWN0aW9uRGlnaXRzO1xuICAgICAgICAgICAgY29uc3Qgb3BlcmF0aW9uID0gc2VsZWN0aW9uU3RhcnQgIT09IHNlbGVjdGlvbkVuZCA/ICdyYW5nZS1pbnNlcnQnIDogJ2luc2VydCc7XG5cbiAgICAgICAgICAgIGlmIChkZWNpbWFsQ2hhckluZGV4ID4gMCAmJiBzZWxlY3Rpb25TdGFydCA+IGRlY2ltYWxDaGFySW5kZXgpIHtcbiAgICAgICAgICAgICAgICBpZiAoKHNlbGVjdGlvblN0YXJ0ICsgdGV4dC5sZW5ndGggLSAoZGVjaW1hbENoYXJJbmRleCArIDEpKSA8PSBtYXhGcmFjdGlvbkRpZ2l0cykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjaGFySW5kZXggPSBjdXJyZW5jeUNoYXJJbmRleCA+PSBzZWxlY3Rpb25TdGFydCA/IGN1cnJlbmN5Q2hhckluZGV4IC0gMSA6IChzdWZmaXhDaGFySW5kZXggPj0gc2VsZWN0aW9uU3RhcnQgPyBzdWZmaXhDaGFySW5kZXggOiBpbnB1dFZhbHVlLmxlbmd0aCk7XG5cbiAgICAgICAgICAgICAgICAgICAgbmV3VmFsdWVTdHIgPSBpbnB1dFZhbHVlLnNsaWNlKDAsIHNlbGVjdGlvblN0YXJ0KSArIHRleHQgKyBpbnB1dFZhbHVlLnNsaWNlKHNlbGVjdGlvblN0YXJ0ICsgdGV4dC5sZW5ndGgsIGNoYXJJbmRleCkgKyBpbnB1dFZhbHVlLnNsaWNlKGNoYXJJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVmFsdWUoZXZlbnQsIG5ld1ZhbHVlU3RyLCB0ZXh0LCBvcGVyYXRpb24pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIG5ld1ZhbHVlU3RyID0gdGhpcy5pbnNlcnRUZXh0KGlucHV0VmFsdWUsIHRleHQsIHNlbGVjdGlvblN0YXJ0LCBzZWxlY3Rpb25FbmQpO1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVmFsdWUoZXZlbnQsIG5ld1ZhbHVlU3RyLCB0ZXh0LCBvcGVyYXRpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5zZXJ0VGV4dCh2YWx1ZSwgdGV4dCwgc3RhcnQsIGVuZCkge1xuICAgICAgICBsZXQgdGV4dFNwbGl0ID0gdGV4dCA9PT0gJy4nID8gdGV4dCA6IHRleHQuc3BsaXQoJy4nKTtcblxuICAgICAgICBpZiAodGV4dFNwbGl0Lmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgY29uc3QgZGVjaW1hbENoYXJJbmRleCA9IHZhbHVlLnNsaWNlKHN0YXJ0LCBlbmQpLnNlYXJjaCh0aGlzLl9kZWNpbWFsKTtcbiAgICAgICAgICAgIHRoaXMuX2RlY2ltYWwubGFzdEluZGV4ID0gMDtcbiAgICAgICAgICAgIHJldHVybiAoZGVjaW1hbENoYXJJbmRleCA+IDApID8gdmFsdWUuc2xpY2UoMCwgc3RhcnQpICsgdGhpcy5mb3JtYXRWYWx1ZSh0ZXh0KSArIHZhbHVlLnNsaWNlKGVuZCkgOiAodmFsdWUgfHwgdGhpcy5mb3JtYXRWYWx1ZSh0ZXh0KSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoKGVuZCAtIHN0YXJ0KSA9PT0gdmFsdWUubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5mb3JtYXRWYWx1ZSh0ZXh0KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChzdGFydCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHRleHQgKyB2YWx1ZS5zbGljZShlbmQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGVuZCA9PT0gdmFsdWUubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWUuc2xpY2UoMCwgc3RhcnQpICsgdGV4dDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS5zbGljZSgwLCBzdGFydCkgKyB0ZXh0ICsgdmFsdWUuc2xpY2UoZW5kKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlbGV0ZVJhbmdlKHZhbHVlLCBzdGFydCwgZW5kKSB7XG4gICAgICAgIGxldCBuZXdWYWx1ZVN0cjtcblxuICAgICAgICBpZiAoKGVuZCAtIHN0YXJ0KSA9PT0gdmFsdWUubGVuZ3RoKVxuICAgICAgICAgICAgbmV3VmFsdWVTdHIgPSAnJztcbiAgICAgICAgZWxzZSBpZiAoc3RhcnQgPT09IDApXG4gICAgICAgICAgICBuZXdWYWx1ZVN0ciA9IHZhbHVlLnNsaWNlKGVuZCk7XG4gICAgICAgIGVsc2UgaWYgKGVuZCA9PT0gdmFsdWUubGVuZ3RoKVxuICAgICAgICAgICAgbmV3VmFsdWVTdHIgPSB2YWx1ZS5zbGljZSgwLCBzdGFydCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIG5ld1ZhbHVlU3RyID0gdmFsdWUuc2xpY2UoMCwgc3RhcnQpICsgdmFsdWUuc2xpY2UoZW5kKTtcblxuICAgICAgICByZXR1cm4gbmV3VmFsdWVTdHI7XG4gICAgfVxuXG4gICAgaW5pdEN1cnNvcigpIHtcbiAgICAgICAgbGV0IHNlbGVjdGlvblN0YXJ0ID0gdGhpcy5pbnB1dC5uYXRpdmVFbGVtZW50LnNlbGVjdGlvblN0YXJ0O1xuICAgICAgICBsZXQgaW5wdXRWYWx1ZSA9IHRoaXMuaW5wdXQubmF0aXZlRWxlbWVudC52YWx1ZTtcbiAgICAgICAgbGV0IHZhbHVlTGVuZ3RoID0gaW5wdXRWYWx1ZS5sZW5ndGg7XG4gICAgICAgIGxldCBpbmRleCA9IG51bGw7XG5cbiAgICAgICAgLy8gcmVtb3ZlIHByZWZpeFxuICAgICAgICBsZXQgcHJlZml4TGVuZ3RoID0gKHRoaXMucHJlZml4Q2hhciB8fCAnJykubGVuZ3RoO1xuICAgICAgICBpbnB1dFZhbHVlID0gaW5wdXRWYWx1ZS5yZXBsYWNlKHRoaXMuX3ByZWZpeCwgJycpO1xuICAgICAgICBzZWxlY3Rpb25TdGFydCA9IHNlbGVjdGlvblN0YXJ0IC0gcHJlZml4TGVuZ3RoO1xuXG4gICAgICAgIGxldCBjaGFyID0gaW5wdXRWYWx1ZS5jaGFyQXQoc2VsZWN0aW9uU3RhcnQpO1xuICAgICAgICBpZiAodGhpcy5pc051bWVyYWxDaGFyKGNoYXIpKSB7XG4gICAgICAgICAgICByZXR1cm4gc2VsZWN0aW9uU3RhcnQgKyBwcmVmaXhMZW5ndGg7XG4gICAgICAgIH1cblxuICAgICAgICAvL2xlZnRcbiAgICAgICAgbGV0IGkgPSBzZWxlY3Rpb25TdGFydCAtIDE7XG4gICAgICAgIHdoaWxlIChpID49IDApIHtcbiAgICAgICAgICAgIGNoYXIgPSBpbnB1dFZhbHVlLmNoYXJBdChpKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzTnVtZXJhbENoYXIoY2hhcikpIHtcbiAgICAgICAgICAgICAgICBpbmRleCA9IGkgKyBwcmVmaXhMZW5ndGg7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpLS07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaW5kZXggIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuaW5wdXQubmF0aXZlRWxlbWVudC5zZXRTZWxlY3Rpb25SYW5nZShpbmRleCArIDEsIGluZGV4ICsgMSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpID0gc2VsZWN0aW9uU3RhcnQ7XG4gICAgICAgICAgICB3aGlsZSAoaSA8IHZhbHVlTGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgY2hhciA9IGlucHV0VmFsdWUuY2hhckF0KGkpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzTnVtZXJhbENoYXIoY2hhcikpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSBpICsgcHJlZml4TGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpbmRleCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5wdXQubmF0aXZlRWxlbWVudC5zZXRTZWxlY3Rpb25SYW5nZShpbmRleCwgaW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGluZGV4IHx8IDA7XG4gICAgfVxuXG4gICAgb25JbnB1dENsaWNrKCkge1xuICAgICAgICB0aGlzLmluaXRDdXJzb3IoKTtcbiAgICB9XG5cbiAgICBpc051bWVyYWxDaGFyKGNoYXIpIHtcbiAgICAgICAgaWYgKGNoYXIubGVuZ3RoID09PSAxICYmICh0aGlzLl9udW1lcmFsLnRlc3QoY2hhcikgfHwgdGhpcy5fZGVjaW1hbC50ZXN0KGNoYXIpIHx8IHRoaXMuX2dyb3VwLnRlc3QoY2hhcikgfHwgdGhpcy5fbWludXNTaWduLnRlc3QoY2hhcikpKSB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0UmVnZXgoKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJlc2V0UmVnZXgoKSB7XG4gICAgICAgIHRoaXMuX251bWVyYWwubGFzdEluZGV4ID0gIDA7XG4gICAgICAgIHRoaXMuX2RlY2ltYWwubGFzdEluZGV4ID0gIDA7XG4gICAgICAgIHRoaXMuX2dyb3VwLmxhc3RJbmRleCA9ICAwO1xuICAgICAgICB0aGlzLl9taW51c1NpZ24ubGFzdEluZGV4ID0gIDA7XG4gICAgfVxuXG4gICAgdXBkYXRlVmFsdWUoZXZlbnQsIHZhbHVlU3RyLCBpbnNlcnRlZFZhbHVlU3RyLCBvcGVyYXRpb24pIHtcbiAgICAgICAgbGV0IGN1cnJlbnRWYWx1ZSA9IHRoaXMuaW5wdXQubmF0aXZlRWxlbWVudC52YWx1ZTtcbiAgICAgICAgbGV0IG5ld1ZhbHVlID0gbnVsbDtcblxuICAgICAgICBpZiAodmFsdWVTdHIgIT0gbnVsbCkge1xuICAgICAgICAgICAgbmV3VmFsdWUgPSB0aGlzLnBhcnNlVmFsdWUodmFsdWVTdHIpO1xuICAgICAgICAgICAgbmV3VmFsdWUgPSAhbmV3VmFsdWUgJiYgIXRoaXMuYWxsb3dFbXB0eSA/IDAgOiBuZXdWYWx1ZTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSW5wdXQobmV3VmFsdWUsIGluc2VydGVkVmFsdWVTdHIsIG9wZXJhdGlvbiwgdmFsdWVTdHIpO1xuXG4gICAgICAgICAgICB0aGlzLmhhbmRsZU9uSW5wdXQoZXZlbnQsIGN1cnJlbnRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlT25JbnB1dChldmVudCwgY3VycmVudFZhbHVlLCBuZXdWYWx1ZSkge1xuICAgICAgICBpZiAodGhpcy5pc1ZhbHVlQ2hhbmdlZChjdXJyZW50VmFsdWUsIG5ld1ZhbHVlKSkge1xuICAgICAgICAgICAgdGhpcy5vbklucHV0LmVtaXQoeyBvcmlnaW5hbEV2ZW50OiBldmVudCwgdmFsdWU6IG5ld1ZhbHVlIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNWYWx1ZUNoYW5nZWQoY3VycmVudFZhbHVlLCBuZXdWYWx1ZSkge1xuICAgICAgICBpZiAobmV3VmFsdWUgPT09IG51bGwgJiYgY3VycmVudFZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuZXdWYWx1ZSAhPSBudWxsKSB7XG4gICAgICAgICAgICBsZXQgcGFyc2VkQ3VycmVudFZhbHVlID0gKHR5cGVvZiBjdXJyZW50VmFsdWUgPT09ICdzdHJpbmcnKSA/IHRoaXMucGFyc2VWYWx1ZShjdXJyZW50VmFsdWUpIDogY3VycmVudFZhbHVlO1xuICAgICAgICAgICAgcmV0dXJuIG5ld1ZhbHVlICE9PSBwYXJzZWRDdXJyZW50VmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFsaWRhdGVWYWx1ZSh2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUgPT09ICctJyB8fCB2YWx1ZSA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm1pbiAhPSBudWxsICYmIHZhbHVlIDwgdGhpcy5taW4pIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1pbjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm1heCAhPSBudWxsICYmIHZhbHVlID4gdGhpcy5tYXgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1heDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICB1cGRhdGVJbnB1dCh2YWx1ZSwgaW5zZXJ0ZWRWYWx1ZVN0ciwgb3BlcmF0aW9uLCB2YWx1ZVN0cikge1xuICAgICAgICBpbnNlcnRlZFZhbHVlU3RyID0gaW5zZXJ0ZWRWYWx1ZVN0ciB8fCAnJztcblxuICAgICAgICBsZXQgaW5wdXRWYWx1ZSA9IHRoaXMuaW5wdXQubmF0aXZlRWxlbWVudC52YWx1ZTtcbiAgICAgICAgbGV0IG5ld1ZhbHVlID0gdGhpcy5mb3JtYXRWYWx1ZSh2YWx1ZSk7XG4gICAgICAgIGxldCBjdXJyZW50TGVuZ3RoID0gaW5wdXRWYWx1ZS5sZW5ndGg7XG5cbiAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSB2YWx1ZVN0cikge1xuICAgICAgICAgICAgbmV3VmFsdWUgPSB0aGlzLmNvbmNhdFZhbHVlcyhuZXdWYWx1ZSwgdmFsdWVTdHIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGN1cnJlbnRMZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuaW5wdXQubmF0aXZlRWxlbWVudC52YWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgICAgICAgdGhpcy5pbnB1dC5uYXRpdmVFbGVtZW50LnNldFNlbGVjdGlvblJhbmdlKDAsIDApO1xuICAgICAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmluaXRDdXJzb3IoKTtcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGlvbkVuZCA9IGluZGV4ICsgaW5zZXJ0ZWRWYWx1ZVN0ci5sZW5ndGg7XG4gICAgICAgICAgICB0aGlzLmlucHV0Lm5hdGl2ZUVsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2Uoc2VsZWN0aW9uRW5kLCBzZWxlY3Rpb25FbmQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbGV0IHNlbGVjdGlvblN0YXJ0ID0gdGhpcy5pbnB1dC5uYXRpdmVFbGVtZW50LnNlbGVjdGlvblN0YXJ0O1xuICAgICAgICAgICAgbGV0IHNlbGVjdGlvbkVuZCA9IHRoaXMuaW5wdXQubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25FbmQ7XG4gICAgICAgICAgICBpZiAodGhpcy5tYXhsZW5ndGggJiYgdGhpcy5tYXhsZW5ndGggPCBuZXdWYWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuaW5wdXQubmF0aXZlRWxlbWVudC52YWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgICAgICAgbGV0IG5ld0xlbmd0aCA9IG5ld1ZhbHVlLmxlbmd0aDtcblxuICAgICAgICAgICAgaWYgKG9wZXJhdGlvbiA9PT0gJ3JhbmdlLWluc2VydCcpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzdGFydFZhbHVlID0gdGhpcy5wYXJzZVZhbHVlKChpbnB1dFZhbHVlIHx8ICcnKS5zbGljZSgwLCBzZWxlY3Rpb25TdGFydCkpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHN0YXJ0VmFsdWVTdHIgPSBzdGFydFZhbHVlICE9PSBudWxsID8gc3RhcnRWYWx1ZS50b1N0cmluZygpIDogJyc7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhcnRFeHByID0gc3RhcnRWYWx1ZVN0ci5zcGxpdCgnJykuam9pbihgKCR7dGhpcy5ncm91cENoYXJ9KT9gKTtcbiAgICAgICAgICAgICAgICBjb25zdCBzUmVnZXggPSBuZXcgUmVnRXhwKHN0YXJ0RXhwciwgJ2cnKTtcbiAgICAgICAgICAgICAgICBzUmVnZXgudGVzdChuZXdWYWx1ZSk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCB0RXhwciA9IGluc2VydGVkVmFsdWVTdHIuc3BsaXQoJycpLmpvaW4oYCgke3RoaXMuZ3JvdXBDaGFyfSk/YCk7XG4gICAgICAgICAgICAgICAgY29uc3QgdFJlZ2V4ID0gbmV3IFJlZ0V4cCh0RXhwciwgJ2cnKTtcbiAgICAgICAgICAgICAgICB0UmVnZXgudGVzdChuZXdWYWx1ZS5zbGljZShzUmVnZXgubGFzdEluZGV4KSk7XG5cbiAgICAgICAgICAgICAgICBzZWxlY3Rpb25FbmQgPSBzUmVnZXgubGFzdEluZGV4ICsgdFJlZ2V4Lmxhc3RJbmRleDtcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0Lm5hdGl2ZUVsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2Uoc2VsZWN0aW9uRW5kLCBzZWxlY3Rpb25FbmQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAobmV3TGVuZ3RoID09PSBjdXJyZW50TGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9wZXJhdGlvbiA9PT0gJ2luc2VydCcgfHwgb3BlcmF0aW9uID09PSAnZGVsZXRlLWJhY2stc2luZ2xlJylcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnB1dC5uYXRpdmVFbGVtZW50LnNldFNlbGVjdGlvblJhbmdlKHNlbGVjdGlvbkVuZCArIDEsIHNlbGVjdGlvbkVuZCArIDEpO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKG9wZXJhdGlvbiA9PT0gJ2RlbGV0ZS1zaW5nbGUnKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlucHV0Lm5hdGl2ZUVsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2Uoc2VsZWN0aW9uRW5kIC0gMSwgc2VsZWN0aW9uRW5kIC0gMSk7XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAob3BlcmF0aW9uID09PSAnZGVsZXRlLXJhbmdlJyB8fCBvcGVyYXRpb24gPT09ICdzcGluJylcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnB1dC5uYXRpdmVFbGVtZW50LnNldFNlbGVjdGlvblJhbmdlKHNlbGVjdGlvbkVuZCwgc2VsZWN0aW9uRW5kKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG9wZXJhdGlvbiA9PT0gJ2RlbGV0ZS1iYWNrLXNpbmdsZScpIHtcbiAgICAgICAgICAgICAgICBsZXQgcHJldkNoYXIgPSBpbnB1dFZhbHVlLmNoYXJBdChzZWxlY3Rpb25FbmQgLSAxKTtcbiAgICAgICAgICAgICAgICBsZXQgbmV4dENoYXIgPSBpbnB1dFZhbHVlLmNoYXJBdChzZWxlY3Rpb25FbmQpO1xuICAgICAgICAgICAgICAgIGxldCBkaWZmID0gY3VycmVudExlbmd0aCAtIG5ld0xlbmd0aDtcbiAgICAgICAgICAgICAgICBsZXQgaXNHcm91cENoYXIgPSB0aGlzLl9ncm91cC50ZXN0KG5leHRDaGFyKTtcblxuICAgICAgICAgICAgICAgIGlmIChpc0dyb3VwQ2hhciAmJiBkaWZmID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbkVuZCArPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICghaXNHcm91cENoYXIgJiYgdGhpcy5pc051bWVyYWxDaGFyKHByZXZDaGFyKSkge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb25FbmQgKz0gKC0xICogZGlmZikgKyAxO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuX2dyb3VwLmxhc3RJbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5pbnB1dC5uYXRpdmVFbGVtZW50LnNldFNlbGVjdGlvblJhbmdlKHNlbGVjdGlvbkVuZCwgc2VsZWN0aW9uRW5kKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGlucHV0VmFsdWUgPT09ICctJyAmJiBvcGVyYXRpb24gPT09ICdpbnNlcnQnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbnB1dC5uYXRpdmVFbGVtZW50LnNldFNlbGVjdGlvblJhbmdlKDAsIDApO1xuICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5pbml0Q3Vyc29yKCk7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0aW9uRW5kID0gaW5kZXggKyBpbnNlcnRlZFZhbHVlU3RyLmxlbmd0aCArIDE7XG4gICAgICAgICAgICAgICAgdGhpcy5pbnB1dC5uYXRpdmVFbGVtZW50LnNldFNlbGVjdGlvblJhbmdlKHNlbGVjdGlvbkVuZCwgc2VsZWN0aW9uRW5kKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlbGVjdGlvbkVuZCA9IHNlbGVjdGlvbkVuZCArIChuZXdMZW5ndGggLSBjdXJyZW50TGVuZ3RoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0Lm5hdGl2ZUVsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2Uoc2VsZWN0aW9uRW5kLCBzZWxlY3Rpb25FbmQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pbnB1dC5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS12YWx1ZW5vdycsIHZhbHVlKTtcbiAgICB9XG5cbiAgICBjb25jYXRWYWx1ZXModmFsMSwgdmFsMikge1xuICAgICAgICBpZiAodmFsMSAmJiB2YWwyKSB7XG4gICAgICAgICAgICBsZXQgZGVjaW1hbENoYXJJbmRleCA9IHZhbDIuc2VhcmNoKHRoaXMuX2RlY2ltYWwpO1xuICAgICAgICAgICAgdGhpcy5fZGVjaW1hbC5sYXN0SW5kZXggPSAwO1xuXG4gICAgICAgICAgICByZXR1cm4gZGVjaW1hbENoYXJJbmRleCAhPT0gLTEgPyAodmFsMS5zcGxpdCh0aGlzLl9kZWNpbWFsKVswXSArIHZhbDIuc2xpY2UoZGVjaW1hbENoYXJJbmRleCkpIDogdmFsMTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB2YWwxO1xuICAgIH1cblxuICAgIGdldERlY2ltYWxMZW5ndGgodmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZVNwbGl0ID0gdmFsdWUuc3BsaXQodGhpcy5fZGVjaW1hbCk7XG5cbiAgICAgICAgICAgIGlmICh2YWx1ZVNwbGl0Lmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZVNwbGl0WzFdLnJlcGxhY2UodGhpcy5fc3VmZml4LCAnJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudHJpbSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xccy9nLCAnJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSh0aGlzLl9jdXJyZW5jeSwgJycpLmxlbmd0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIG9uSW5wdXRGb2N1cyhldmVudCkge1xuICAgICAgICB0aGlzLmZvY3VzZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLm9uRm9jdXMuZW1pdChldmVudCk7XG4gICAgfVxuXG4gICAgb25JbnB1dEJsdXIoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5mb2N1c2VkID0gZmFsc2U7XG5cbiAgICAgICAgbGV0IG5ld1ZhbHVlID0gdGhpcy52YWxpZGF0ZVZhbHVlKHRoaXMucGFyc2VWYWx1ZSh0aGlzLmlucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWUpKTtcbiAgICAgICAgdGhpcy5pbnB1dC5uYXRpdmVFbGVtZW50LnZhbHVlID0gdGhpcy5mb3JtYXRWYWx1ZShuZXdWYWx1ZSk7XG4gICAgICAgIHRoaXMuaW5wdXQubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtdmFsdWVub3cnLCBuZXdWYWx1ZSk7XG4gICAgICAgIHRoaXMudXBkYXRlTW9kZWwoZXZlbnQsIG5ld1ZhbHVlKTtcblxuICAgICAgICB0aGlzLm9uQmx1ci5lbWl0KGV2ZW50KTtcbiAgICB9XG5cbiAgICBmb3JtYXR0ZWRWYWx1ZSgpIHtcbiAgICAgICAgY29uc3QgdmFsID0gIXRoaXMudmFsdWUgJiYgIXRoaXMuYWxsb3dFbXB0eSA/IDAgOiB0aGlzLnZhbHVlO1xuICAgICAgICByZXR1cm4gdGhpcy5mb3JtYXRWYWx1ZSh2YWwpO1xuICAgIH1cblxuICAgIHVwZGF0ZU1vZGVsKGV2ZW50LCB2YWx1ZSkge1xuICAgICAgICBpZiAodGhpcy52YWx1ZSAhPT0gdmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSh2YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkKCk7XG4gICAgfVxuXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSA6IHZvaWQge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlID0gZm47XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25Nb2RlbFRvdWNoZWQgPSBmbjtcbiAgICB9XG5cbiAgICBzZXREaXNhYmxlZFN0YXRlKHZhbDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLmRpc2FibGVkID0gdmFsO1xuICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIGdldCBmaWxsZWQoKSB7XG4gICAgICAgIHJldHVybiAodGhpcy52YWx1ZSAhPSBudWxsICYmIHRoaXMudmFsdWUudG9TdHJpbmcoKS5sZW5ndGggPiAwKVxuICAgIH1cblxuICAgIGNsZWFyVGltZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnRpbWVyKSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMudGltZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0Rm9ybWF0dGVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5udW1iZXJGb3JtYXQ7XG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsSW5wdXRUZXh0TW9kdWxlLCBCdXR0b25Nb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtJbnB1dE51bWJlcl0sXG4gICAgZGVjbGFyYXRpb25zOiBbSW5wdXROdW1iZXJdXG59KVxuZXhwb3J0IGNsYXNzIElucHV0TnVtYmVyTW9kdWxlIHsgfVxuIl19