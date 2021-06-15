/*
    Port of jQuery MaskedInput by DigitalBush as a Native Angular2 Component in Typescript without jQuery
    https://github.com/digitalBush/jquery.maskedinput/

    Copyright (c) 2007-2014 Josh Bush (digitalbush.com)

    Permission is hereby granted, free of charge, to any person
    obtaining a copy of this software and associated documentation
    files (the "Software"), to deal in the Software without
    restriction, including without limitation the rights to use,
    copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the
    Software is furnished to do so, subject to the following
    conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
    OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
    HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
    WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
    FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
    OTHER DEALINGS IN THE SOFTWARE.
*/
import { NgModule, Component, Input, forwardRef, Output, EventEmitter, ViewChild, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
import { InputTextModule } from 'primeng/inputtext';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "primeng/inputtext";
import * as i2 from "@angular/common";
export const INPUTMASK_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputMask),
    multi: true
};
export class InputMask {
    constructor(el, cd) {
        this.el = el;
        this.cd = cd;
        this.type = 'text';
        this.slotChar = '_';
        this.autoClear = true;
        this.characterPattern = '[A-Za-z]';
        this.onComplete = new EventEmitter();
        this.onFocus = new EventEmitter();
        this.onBlur = new EventEmitter();
        this.onInput = new EventEmitter();
        this.onKeydown = new EventEmitter();
        this.onModelChange = () => { };
        this.onModelTouched = () => { };
    }
    ngOnInit() {
        let ua = DomHandler.getUserAgent();
        this.androidChrome = /chrome/i.test(ua) && /android/i.test(ua);
        this.initMask();
    }
    get mask() {
        return this._mask;
    }
    set mask(val) {
        this._mask = val;
        this.initMask();
        this.writeValue('');
        this.onModelChange(this.value);
    }
    initMask() {
        this.tests = [];
        this.partialPosition = this.mask.length;
        this.len = this.mask.length;
        this.firstNonMaskPos = null;
        this.defs = {
            '9': '[0-9]',
            'a': this.characterPattern,
            '*': `${this.characterPattern}|[0-9]`
        };
        let maskTokens = this.mask.split('');
        for (let i = 0; i < maskTokens.length; i++) {
            let c = maskTokens[i];
            if (c == '?') {
                this.len--;
                this.partialPosition = i;
            }
            else if (this.defs[c]) {
                this.tests.push(new RegExp(this.defs[c]));
                if (this.firstNonMaskPos === null) {
                    this.firstNonMaskPos = this.tests.length - 1;
                }
                if (i < this.partialPosition) {
                    this.lastRequiredNonMaskPos = this.tests.length - 1;
                }
            }
            else {
                this.tests.push(null);
            }
        }
        this.buffer = [];
        for (let i = 0; i < maskTokens.length; i++) {
            let c = maskTokens[i];
            if (c != '?') {
                if (this.defs[c])
                    this.buffer.push(this.getPlaceholder(i));
                else
                    this.buffer.push(c);
            }
        }
        this.defaultBuffer = this.buffer.join('');
    }
    writeValue(value) {
        this.value = value;
        if (this.inputViewChild && this.inputViewChild.nativeElement) {
            if (this.value == undefined || this.value == null)
                this.inputViewChild.nativeElement.value = '';
            else
                this.inputViewChild.nativeElement.value = this.value;
            this.checkVal();
            this.focusText = this.inputViewChild.nativeElement.value;
            this.updateFilledState();
        }
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
    caret(first, last) {
        let range, begin, end;
        if (!this.inputViewChild.nativeElement.offsetParent || this.inputViewChild.nativeElement !== this.inputViewChild.nativeElement.ownerDocument.activeElement) {
            return;
        }
        if (typeof first == 'number') {
            begin = first;
            end = (typeof last === 'number') ? last : begin;
            if (this.inputViewChild.nativeElement.setSelectionRange) {
                this.inputViewChild.nativeElement.setSelectionRange(begin, end);
            }
            else if (this.inputViewChild.nativeElement['createTextRange']) {
                range = this.inputViewChild.nativeElement['createTextRange']();
                range.collapse(true);
                range.moveEnd('character', end);
                range.moveStart('character', begin);
                range.select();
            }
        }
        else {
            if (this.inputViewChild.nativeElement.setSelectionRange) {
                begin = this.inputViewChild.nativeElement.selectionStart;
                end = this.inputViewChild.nativeElement.selectionEnd;
            }
            else if (document['selection'] && document['selection'].createRange) {
                range = document['selection'].createRange();
                begin = 0 - range.duplicate().moveStart('character', -100000);
                end = begin + range.text.length;
            }
            return { begin: begin, end: end };
        }
    }
    isCompleted() {
        let completed;
        for (let i = this.firstNonMaskPos; i <= this.lastRequiredNonMaskPos; i++) {
            if (this.tests[i] && this.buffer[i] === this.getPlaceholder(i)) {
                return false;
            }
        }
        return true;
    }
    getPlaceholder(i) {
        if (i < this.slotChar.length) {
            return this.slotChar.charAt(i);
        }
        return this.slotChar.charAt(0);
    }
    seekNext(pos) {
        while (++pos < this.len && !this.tests[pos])
            ;
        return pos;
    }
    seekPrev(pos) {
        while (--pos >= 0 && !this.tests[pos])
            ;
        return pos;
    }
    shiftL(begin, end) {
        let i, j;
        if (begin < 0) {
            return;
        }
        for (i = begin, j = this.seekNext(end); i < this.len; i++) {
            if (this.tests[i]) {
                if (j < this.len && this.tests[i].test(this.buffer[j])) {
                    this.buffer[i] = this.buffer[j];
                    this.buffer[j] = this.getPlaceholder(j);
                }
                else {
                    break;
                }
                j = this.seekNext(j);
            }
        }
        this.writeBuffer();
        this.caret(Math.max(this.firstNonMaskPos, begin));
    }
    shiftR(pos) {
        let i, c, j, t;
        for (i = pos, c = this.getPlaceholder(pos); i < this.len; i++) {
            if (this.tests[i]) {
                j = this.seekNext(i);
                t = this.buffer[i];
                this.buffer[i] = c;
                if (j < this.len && this.tests[j].test(t)) {
                    c = t;
                }
                else {
                    break;
                }
            }
        }
    }
    handleAndroidInput(e) {
        var curVal = this.inputViewChild.nativeElement.value;
        var pos = this.caret();
        if (this.oldVal && this.oldVal.length && this.oldVal.length > curVal.length) {
            // a deletion or backspace happened
            this.checkVal(true);
            while (pos.begin > 0 && !this.tests[pos.begin - 1])
                pos.begin--;
            if (pos.begin === 0) {
                while (pos.begin < this.firstNonMaskPos && !this.tests[pos.begin])
                    pos.begin++;
            }
            setTimeout(() => {
                this.caret(pos.begin, pos.begin);
                this.updateModel(e);
                if (this.isCompleted()) {
                    this.onComplete.emit();
                }
            }, 0);
        }
        else {
            this.checkVal(true);
            while (pos.begin < this.len && !this.tests[pos.begin])
                pos.begin++;
            setTimeout(() => {
                this.caret(pos.begin, pos.begin);
                this.updateModel(e);
                if (this.isCompleted()) {
                    this.onComplete.emit();
                }
            }, 0);
        }
    }
    onInputBlur(e) {
        this.focused = false;
        this.onModelTouched();
        this.checkVal();
        this.updateFilledState();
        this.onBlur.emit(e);
        if (this.inputViewChild.nativeElement.value != this.focusText || this.inputViewChild.nativeElement.value != this.value) {
            this.updateModel(e);
            let event = document.createEvent('HTMLEvents');
            event.initEvent('change', true, false);
            this.inputViewChild.nativeElement.dispatchEvent(event);
        }
    }
    onInputKeydown(e) {
        if (this.readonly) {
            return;
        }
        let k = e.which || e.keyCode, pos, begin, end;
        let iPhone = /iphone/i.test(DomHandler.getUserAgent());
        this.oldVal = this.inputViewChild.nativeElement.value;
        this.onKeydown.emit(e);
        //backspace, delete, and escape get special treatment
        if (k === 8 || k === 46 || (iPhone && k === 127)) {
            pos = this.caret();
            begin = pos.begin;
            end = pos.end;
            if (end - begin === 0) {
                begin = k !== 46 ? this.seekPrev(begin) : (end = this.seekNext(begin - 1));
                end = k === 46 ? this.seekNext(end) : end;
            }
            this.clearBuffer(begin, end);
            this.shiftL(begin, end - 1);
            this.updateModel(e);
            this.onInput.emit(e);
            e.preventDefault();
        }
        else if (k === 13) { // enter
            this.onInputBlur(e);
            this.updateModel(e);
        }
        else if (k === 27) { // escape
            this.inputViewChild.nativeElement.value = this.focusText;
            this.caret(0, this.checkVal());
            this.updateModel(e);
            e.preventDefault();
        }
    }
    onKeyPress(e) {
        if (this.readonly) {
            return;
        }
        var k = e.which || e.keyCode, pos = this.caret(), p, c, next, completed;
        if (e.ctrlKey || e.altKey || e.metaKey || k < 32 || (k > 34 && k < 41)) { //Ignore
            return;
        }
        else if (k && k !== 13) {
            if (pos.end - pos.begin !== 0) {
                this.clearBuffer(pos.begin, pos.end);
                this.shiftL(pos.begin, pos.end - 1);
            }
            p = this.seekNext(pos.begin - 1);
            if (p < this.len) {
                c = String.fromCharCode(k);
                if (this.tests[p].test(c)) {
                    this.shiftR(p);
                    this.buffer[p] = c;
                    this.writeBuffer();
                    next = this.seekNext(p);
                    if (/android/i.test(DomHandler.getUserAgent())) {
                        //Path for CSP Violation on FireFox OS 1.1
                        let proxy = () => {
                            this.caret(next);
                        };
                        setTimeout(proxy, 0);
                    }
                    else {
                        this.caret(next);
                    }
                    if (pos.begin <= this.lastRequiredNonMaskPos) {
                        completed = this.isCompleted();
                    }
                    this.onInput.emit(e);
                }
            }
            e.preventDefault();
        }
        this.updateModel(e);
        this.updateFilledState();
        if (completed) {
            this.onComplete.emit();
        }
    }
    clearBuffer(start, end) {
        let i;
        for (i = start; i < end && i < this.len; i++) {
            if (this.tests[i]) {
                this.buffer[i] = this.getPlaceholder(i);
            }
        }
    }
    writeBuffer() {
        this.inputViewChild.nativeElement.value = this.buffer.join('');
    }
    checkVal(allow) {
        //try to place characters where they belong
        let test = this.inputViewChild.nativeElement.value, lastMatch = -1, i, c, pos;
        for (i = 0, pos = 0; i < this.len; i++) {
            if (this.tests[i]) {
                this.buffer[i] = this.getPlaceholder(i);
                while (pos++ < test.length) {
                    c = test.charAt(pos - 1);
                    if (this.tests[i].test(c)) {
                        this.buffer[i] = c;
                        lastMatch = i;
                        break;
                    }
                }
                if (pos > test.length) {
                    this.clearBuffer(i + 1, this.len);
                    break;
                }
            }
            else {
                if (this.buffer[i] === test.charAt(pos)) {
                    pos++;
                }
                if (i < this.partialPosition) {
                    lastMatch = i;
                }
            }
        }
        if (allow) {
            this.writeBuffer();
        }
        else if (lastMatch + 1 < this.partialPosition) {
            if (this.autoClear || this.buffer.join('') === this.defaultBuffer) {
                // Invalid value. Remove it and replace it with the
                // mask, which is the default behavior.
                if (this.inputViewChild.nativeElement.value)
                    this.inputViewChild.nativeElement.value = '';
                this.clearBuffer(0, this.len);
            }
            else {
                // Invalid value, but we opt to show the value to the
                // user and allow them to correct their mistake.
                this.writeBuffer();
            }
        }
        else {
            this.writeBuffer();
            this.inputViewChild.nativeElement.value = this.inputViewChild.nativeElement.value.substring(0, lastMatch + 1);
        }
        return (this.partialPosition ? i : this.firstNonMaskPos);
    }
    onInputFocus(event) {
        if (this.readonly) {
            return;
        }
        this.focused = true;
        clearTimeout(this.caretTimeoutId);
        let pos;
        this.focusText = this.inputViewChild.nativeElement.value;
        pos = this.checkVal();
        this.caretTimeoutId = setTimeout(() => {
            if (this.inputViewChild.nativeElement !== this.inputViewChild.nativeElement.ownerDocument.activeElement) {
                return;
            }
            this.writeBuffer();
            if (pos == this.mask.replace("?", "").length) {
                this.caret(0, pos);
            }
            else {
                this.caret(pos);
            }
        }, 10);
        this.onFocus.emit(event);
    }
    onInputChange(event) {
        if (this.androidChrome)
            this.handleAndroidInput(event);
        else
            this.handleInputChange(event);
        this.onInput.emit(event);
    }
    handleInputChange(event) {
        if (this.readonly) {
            return;
        }
        setTimeout(() => {
            var pos = this.checkVal(true);
            this.caret(pos);
            this.updateModel(event);
            if (this.isCompleted()) {
                this.onComplete.emit();
            }
        }, 0);
    }
    getUnmaskedValue() {
        let unmaskedBuffer = [];
        for (let i = 0; i < this.buffer.length; i++) {
            let c = this.buffer[i];
            if (this.tests[i] && c != this.getPlaceholder(i)) {
                unmaskedBuffer.push(c);
            }
        }
        return unmaskedBuffer.join('');
    }
    updateModel(e) {
        const updatedValue = this.unmask ? this.getUnmaskedValue() : e.target.value;
        if (updatedValue !== null || updatedValue !== undefined) {
            this.value = updatedValue;
            this.onModelChange(this.value);
        }
    }
    updateFilledState() {
        this.filled = this.inputViewChild.nativeElement && this.inputViewChild.nativeElement.value != '';
    }
    focus() {
        this.inputViewChild.nativeElement.focus();
    }
    ngOnDestroy() {
    }
}
InputMask.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: InputMask, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
InputMask.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: InputMask, selector: "p-inputMask", inputs: { type: "type", slotChar: "slotChar", autoClear: "autoClear", style: "style", inputId: "inputId", styleClass: "styleClass", placeholder: "placeholder", size: "size", maxlength: "maxlength", tabindex: "tabindex", title: "title", ariaLabel: "ariaLabel", ariaRequired: "ariaRequired", disabled: "disabled", readonly: "readonly", unmask: "unmask", name: "name", required: "required", characterPattern: "characterPattern", autoFocus: "autoFocus", autocomplete: "autocomplete", mask: "mask" }, outputs: { onComplete: "onComplete", onFocus: "onFocus", onBlur: "onBlur", onInput: "onInput", onKeydown: "onKeydown" }, host: { properties: { "class.p-inputwrapper-filled": "filled", "class.p-inputwrapper-focus": "focused" } }, providers: [INPUTMASK_VALUE_ACCESSOR], viewQueries: [{ propertyName: "inputViewChild", first: true, predicate: ["input"], descendants: true, static: true }], ngImport: i0, template: `<input #input pInputText class="p-inputmask" [attr.id]="inputId" [attr.type]="type" [attr.name]="name" [ngStyle]="style" [ngClass]="styleClass" [attr.placeholder]="placeholder" [attr.title]="title"
        [attr.size]="size" [attr.autocomplete]="autocomplete" [attr.maxlength]="maxlength" [attr.tabindex]="tabindex" [attr.aria-label]="ariaLabel" [attr.aria-required]="ariaRequired" [disabled]="disabled" [readonly]="readonly" [attr.required]="required"
        (focus)="onInputFocus($event)" (blur)="onInputBlur($event)" (keydown)="onInputKeydown($event)" (keypress)="onKeyPress($event)" [attr.autofocus]="autoFocus"
        (input)="onInputChange($event)" (paste)="handleInputChange($event)">`, isInline: true, directives: [{ type: i1.InputText, selector: "[pInputText]" }, { type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: InputMask, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-inputMask',
                    template: `<input #input pInputText class="p-inputmask" [attr.id]="inputId" [attr.type]="type" [attr.name]="name" [ngStyle]="style" [ngClass]="styleClass" [attr.placeholder]="placeholder" [attr.title]="title"
        [attr.size]="size" [attr.autocomplete]="autocomplete" [attr.maxlength]="maxlength" [attr.tabindex]="tabindex" [attr.aria-label]="ariaLabel" [attr.aria-required]="ariaRequired" [disabled]="disabled" [readonly]="readonly" [attr.required]="required"
        (focus)="onInputFocus($event)" (blur)="onInputBlur($event)" (keydown)="onInputKeydown($event)" (keypress)="onKeyPress($event)" [attr.autofocus]="autoFocus"
        (input)="onInputChange($event)" (paste)="handleInputChange($event)">`,
                    host: {
                        '[class.p-inputwrapper-filled]': 'filled',
                        '[class.p-inputwrapper-focus]': 'focused'
                    },
                    providers: [INPUTMASK_VALUE_ACCESSOR],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { type: [{
                type: Input
            }], slotChar: [{
                type: Input
            }], autoClear: [{
                type: Input
            }], style: [{
                type: Input
            }], inputId: [{
                type: Input
            }], styleClass: [{
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
            }], disabled: [{
                type: Input
            }], readonly: [{
                type: Input
            }], unmask: [{
                type: Input
            }], name: [{
                type: Input
            }], required: [{
                type: Input
            }], characterPattern: [{
                type: Input
            }], autoFocus: [{
                type: Input
            }], autocomplete: [{
                type: Input
            }], inputViewChild: [{
                type: ViewChild,
                args: ['input', { static: true }]
            }], onComplete: [{
                type: Output
            }], onFocus: [{
                type: Output
            }], onBlur: [{
                type: Output
            }], onInput: [{
                type: Output
            }], onKeydown: [{
                type: Output
            }], mask: [{
                type: Input
            }] } });
export class InputMaskModule {
}
InputMaskModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: InputMaskModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
InputMaskModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: InputMaskModule, declarations: [InputMask], imports: [CommonModule, InputTextModule], exports: [InputMask] });
InputMaskModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: InputMaskModule, imports: [[CommonModule, InputTextModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: InputMaskModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, InputTextModule],
                    exports: [InputMask],
                    declarations: [InputMask]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXRtYXNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9jb21wb25lbnRzL2lucHV0bWFzay9pbnB1dG1hc2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBMEJFO0FBQ0YsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQTZCLEtBQUssRUFBQyxVQUFVLEVBQUMsTUFBTSxFQUFDLFlBQVksRUFBQyxTQUFTLEVBQUMsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQW9CLE1BQU0sZUFBZSxDQUFDO0FBQzFMLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUNsRCxPQUFPLEVBQUMsaUJBQWlCLEVBQXVCLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFFdkUsTUFBTSxDQUFDLE1BQU0sd0JBQXdCLEdBQVE7SUFDM0MsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQztJQUN4QyxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUFnQkYsTUFBTSxPQUFPLFNBQVM7SUE4RmxCLFlBQW1CLEVBQWMsRUFBVSxFQUFxQjtRQUE3QyxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQVUsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUE1RnZELFNBQUksR0FBVyxNQUFNLENBQUM7UUFFdEIsYUFBUSxHQUFXLEdBQUcsQ0FBQztRQUV2QixjQUFTLEdBQVksSUFBSSxDQUFDO1FBZ0MxQixxQkFBZ0IsR0FBVyxVQUFVLENBQUM7UUFRckMsZUFBVSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRW5ELFlBQU8sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztR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LFNBQVM7c0JBQWpCLEtBQUs7Z0JBRUcsUUFBUTtzQkFBaEIsS0FBSztnQkFFRyxLQUFLO3NCQUFiLEtBQUs7Z0JBRUcsU0FBUztzQkFBakIsS0FBSztnQkFFRyxZQUFZO3NCQUFwQixLQUFLO2dCQUVHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBRUcsUUFBUTtzQkFBaEIsS0FBSztnQkFFRyxNQUFNO3NCQUFkLEtBQUs7Z0JBRUcsSUFBSTtzQkFBWixLQUFLO2dCQUVHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBRUcsZ0JBQWdCO3NCQUF4QixLQUFLO2dCQUVHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBRUcsWUFBWTtzQkFBcEIsS0FBSztnQkFFZ0MsY0FBYztzQkFBbkQsU0FBUzt1QkFBQyxPQUFPLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO2dCQUUxQixVQUFVO3NCQUFuQixNQUFNO2dCQUVHLE9BQU87c0JBQWhCLE1BQU07Z0JBRUcsTUFBTTtzQkFBZixNQUFNO2dCQUVHLE9BQU87c0JBQWhCLE1BQU07Z0JBRUcsU0FBUztzQkFBbEIsTUFBTTtnQkFpRE0sSUFBSTtzQkFBaEIsS0FBSzs7QUF1ZlYsTUFBTSxPQUFPLGVBQWU7OzRHQUFmLGVBQWU7NkdBQWYsZUFBZSxpQkE5bEJmLFNBQVMsYUEwbEJSLFlBQVksRUFBQyxlQUFlLGFBMWxCN0IsU0FBUzs2R0E4bEJULGVBQWUsWUFKZixDQUFDLFlBQVksRUFBQyxlQUFlLENBQUM7MkZBSTlCLGVBQWU7a0JBTDNCLFFBQVE7bUJBQUM7b0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFDLGVBQWUsQ0FBQztvQkFDdkMsT0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDO29CQUNwQixZQUFZLEVBQUUsQ0FBQyxTQUFTLENBQUM7aUJBQzVCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAgICBQb3J0IG9mIGpRdWVyeSBNYXNrZWRJbnB1dCBieSBEaWdpdGFsQnVzaCBhcyBhIE5hdGl2ZSBBbmd1bGFyMiBDb21wb25lbnQgaW4gVHlwZXNjcmlwdCB3aXRob3V0IGpRdWVyeVxuICAgIGh0dHBzOi8vZ2l0aHViLmNvbS9kaWdpdGFsQnVzaC9qcXVlcnkubWFza2VkaW5wdXQvXG5cbiAgICBDb3B5cmlnaHQgKGMpIDIwMDctMjAxNCBKb3NoIEJ1c2ggKGRpZ2l0YWxidXNoLmNvbSlcblxuICAgIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uXG4gICAgb2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb25cbiAgICBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXRcbiAgICByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSxcbiAgICBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICAgIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZVxuICAgIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nXG4gICAgY29uZGl0aW9uczpcblxuICAgIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlXG4gICAgaW5jbHVkZWQgaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cbiAgICBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELFxuICAgIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFU1xuICAgIE9GIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EXG4gICAgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFRcbiAgICBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSxcbiAgICBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkdcbiAgICBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SXG4gICAgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuKi9cbmltcG9ydCB7TmdNb2R1bGUsQ29tcG9uZW50LEVsZW1lbnRSZWYsT25Jbml0LE9uRGVzdHJveSxJbnB1dCxmb3J3YXJkUmVmLE91dHB1dCxFdmVudEVtaXR0ZXIsVmlld0NoaWxkLENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBWaWV3RW5jYXBzdWxhdGlvbiwgQ2hhbmdlRGV0ZWN0b3JSZWZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0RvbUhhbmRsZXJ9IGZyb20gJ3ByaW1lbmcvZG9tJztcbmltcG9ydCB7SW5wdXRUZXh0TW9kdWxlfSBmcm9tICdwcmltZW5nL2lucHV0dGV4dCc7XG5pbXBvcnQge05HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3Nvcn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5leHBvcnQgY29uc3QgSU5QVVRNQVNLX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBJbnB1dE1hc2spLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLWlucHV0TWFzaycsXG4gICAgdGVtcGxhdGU6IGA8aW5wdXQgI2lucHV0IHBJbnB1dFRleHQgY2xhc3M9XCJwLWlucHV0bWFza1wiIFthdHRyLmlkXT1cImlucHV0SWRcIiBbYXR0ci50eXBlXT1cInR5cGVcIiBbYXR0ci5uYW1lXT1cIm5hbWVcIiBbbmdTdHlsZV09XCJzdHlsZVwiIFtuZ0NsYXNzXT1cInN0eWxlQ2xhc3NcIiBbYXR0ci5wbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiIFthdHRyLnRpdGxlXT1cInRpdGxlXCJcbiAgICAgICAgW2F0dHIuc2l6ZV09XCJzaXplXCIgW2F0dHIuYXV0b2NvbXBsZXRlXT1cImF1dG9jb21wbGV0ZVwiIFthdHRyLm1heGxlbmd0aF09XCJtYXhsZW5ndGhcIiBbYXR0ci50YWJpbmRleF09XCJ0YWJpbmRleFwiIFthdHRyLmFyaWEtbGFiZWxdPVwiYXJpYUxhYmVsXCIgW2F0dHIuYXJpYS1yZXF1aXJlZF09XCJhcmlhUmVxdWlyZWRcIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIiBbcmVhZG9ubHldPVwicmVhZG9ubHlcIiBbYXR0ci5yZXF1aXJlZF09XCJyZXF1aXJlZFwiXG4gICAgICAgIChmb2N1cyk9XCJvbklucHV0Rm9jdXMoJGV2ZW50KVwiIChibHVyKT1cIm9uSW5wdXRCbHVyKCRldmVudClcIiAoa2V5ZG93bik9XCJvbklucHV0S2V5ZG93bigkZXZlbnQpXCIgKGtleXByZXNzKT1cIm9uS2V5UHJlc3MoJGV2ZW50KVwiIFthdHRyLmF1dG9mb2N1c109XCJhdXRvRm9jdXNcIlxuICAgICAgICAoaW5wdXQpPVwib25JbnB1dENoYW5nZSgkZXZlbnQpXCIgKHBhc3RlKT1cImhhbmRsZUlucHV0Q2hhbmdlKCRldmVudClcIj5gLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1tjbGFzcy5wLWlucHV0d3JhcHBlci1maWxsZWRdJzogJ2ZpbGxlZCcsXG4gICAgICAgICdbY2xhc3MucC1pbnB1dHdyYXBwZXItZm9jdXNdJzogJ2ZvY3VzZWQnXG4gICAgfSxcbiAgICBwcm92aWRlcnM6IFtJTlBVVE1BU0tfVkFMVUVfQUNDRVNTT1JdLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgSW5wdXRNYXNrIGltcGxlbWVudHMgT25Jbml0LE9uRGVzdHJveSxDb250cm9sVmFsdWVBY2Nlc3NvciB7XG5cbiAgICBASW5wdXQoKSB0eXBlOiBzdHJpbmcgPSAndGV4dCc7XG5cbiAgICBASW5wdXQoKSBzbG90Q2hhcjogc3RyaW5nID0gJ18nO1xuXG4gICAgQElucHV0KCkgYXV0b0NsZWFyOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XG5cbiAgICBASW5wdXQoKSBpbnB1dElkOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBwbGFjZWhvbGRlcjogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgc2l6ZTogbnVtYmVyO1xuXG4gICAgQElucHV0KCkgbWF4bGVuZ3RoOiBudW1iZXI7XG5cbiAgICBASW5wdXQoKSB0YWJpbmRleDogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgdGl0bGU6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGFyaWFMYWJlbDogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgYXJpYVJlcXVpcmVkOiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSByZWFkb25seTogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIHVubWFzazogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIG5hbWU6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIHJlcXVpcmVkOiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgY2hhcmFjdGVyUGF0dGVybjogc3RyaW5nID0gJ1tBLVphLXpdJztcblxuICAgIEBJbnB1dCgpIGF1dG9Gb2N1czogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIGF1dG9jb21wbGV0ZTogc3RyaW5nO1xuXG4gICAgQFZpZXdDaGlsZCgnaW5wdXQnLCB7IHN0YXRpYzogdHJ1ZSB9KSBpbnB1dFZpZXdDaGlsZDogRWxlbWVudFJlZjtcblxuICAgIEBPdXRwdXQoKSBvbkNvbXBsZXRlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBvbkZvY3VzOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBvbkJsdXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIG9uSW5wdXQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIFxuICAgIEBPdXRwdXQoKSBvbktleWRvd246IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgdmFsdWU6IGFueTtcblxuICAgIF9tYXNrOiBzdHJpbmc7XG5cbiAgICBvbk1vZGVsQ2hhbmdlOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuXG4gICAgb25Nb2RlbFRvdWNoZWQ6IEZ1bmN0aW9uID0gKCkgPT4ge307XG5cbiAgICBpbnB1dDogSFRNTElucHV0RWxlbWVudDtcblxuICAgIGZpbGxlZDogYm9vbGVhbjtcblxuICAgIGRlZnM6IGFueTtcblxuICAgIHRlc3RzOiBhbnlbXTtcblxuICAgIHBhcnRpYWxQb3NpdGlvbjogYW55O1xuXG4gICAgZmlyc3ROb25NYXNrUG9zOiBudW1iZXI7XG5cbiAgICBsYXN0UmVxdWlyZWROb25NYXNrUG9zOiBhbnk7XG5cbiAgICBsZW46IG51bWJlcjtcblxuICAgIG9sZFZhbDogc3RyaW5nO1xuXG4gICAgYnVmZmVyOiBhbnk7XG5cbiAgICBkZWZhdWx0QnVmZmVyOiBzdHJpbmc7XG5cbiAgICBmb2N1c1RleHQ6IHN0cmluZztcblxuICAgIGNhcmV0VGltZW91dElkOiBhbnk7XG5cbiAgICBhbmRyb2lkQ2hyb21lOiBib29sZWFuO1xuXG4gICAgZm9jdXNlZDogYm9vbGVhbjtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZiwgcHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgbGV0IHVhID0gRG9tSGFuZGxlci5nZXRVc2VyQWdlbnQoKTtcbiAgICAgICAgdGhpcy5hbmRyb2lkQ2hyb21lID0gL2Nocm9tZS9pLnRlc3QodWEpICYmIC9hbmRyb2lkL2kudGVzdCh1YSk7XG5cbiAgICAgICAgdGhpcy5pbml0TWFzaygpO1xuICAgIH1cblxuICAgIEBJbnB1dCgpIGdldCBtYXNrKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXNrO1xuICAgIH1cblxuICAgIHNldCBtYXNrKHZhbDpzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fbWFzayA9IHZhbDtcblxuICAgICAgICB0aGlzLmluaXRNYXNrKCk7XG4gICAgICAgIHRoaXMud3JpdGVWYWx1ZSgnJyk7XG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSh0aGlzLnZhbHVlKTtcbiAgICB9XG5cbiAgICBpbml0TWFzaygpIHtcbiAgICAgICAgdGhpcy50ZXN0cyA9IFtdO1xuICAgICAgICB0aGlzLnBhcnRpYWxQb3NpdGlvbiA9IHRoaXMubWFzay5sZW5ndGg7XG4gICAgICAgIHRoaXMubGVuID0gdGhpcy5tYXNrLmxlbmd0aDtcbiAgICAgICAgdGhpcy5maXJzdE5vbk1hc2tQb3MgPSBudWxsO1xuICAgICAgICB0aGlzLmRlZnMgPSB7XG4gICAgICAgICAgICAnOSc6ICdbMC05XScsXG4gICAgICAgICAgICAnYSc6IHRoaXMuY2hhcmFjdGVyUGF0dGVybixcbiAgICAgICAgICAgICcqJzogYCR7dGhpcy5jaGFyYWN0ZXJQYXR0ZXJufXxbMC05XWBcbiAgICAgICAgfTtcblxuICAgICAgICBsZXQgbWFza1Rva2VucyA9IHRoaXMubWFzay5zcGxpdCgnJyk7XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBtYXNrVG9rZW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgYyA9IG1hc2tUb2tlbnNbaV07XG4gICAgICAgICAgICBpZiAoYyA9PSAnPycpIHtcblx0XHRcdFx0dGhpcy5sZW4tLTtcblx0XHRcdFx0dGhpcy5wYXJ0aWFsUG9zaXRpb24gPSBpO1xuXHRcdFx0fVxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5kZWZzW2NdKSB7XG5cdFx0XHRcdHRoaXMudGVzdHMucHVzaChuZXcgUmVnRXhwKHRoaXMuZGVmc1tjXSkpO1xuXHRcdFx0XHRpZiAodGhpcy5maXJzdE5vbk1hc2tQb3MgPT09IG51bGwpIHtcblx0ICAgICAgICAgICAgICAgIHRoaXMuZmlyc3ROb25NYXNrUG9zID0gdGhpcy50ZXN0cy5sZW5ndGggLSAxO1xuXHRcdFx0XHR9XG4gICAgICAgICAgICAgICAgaWYgKGkgPCB0aGlzLnBhcnRpYWxQb3NpdGlvbil7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGFzdFJlcXVpcmVkTm9uTWFza1BvcyA9IHRoaXMudGVzdHMubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgICAgICB9XG5cdFx0XHR9XG4gICAgICAgICAgICBlbHNlIHtcblx0XHRcdFx0dGhpcy50ZXN0cy5wdXNoKG51bGwpO1xuXHRcdFx0fVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5idWZmZXIgPSBbXTtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IG1hc2tUb2tlbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBjID0gbWFza1Rva2Vuc1tpXTtcbiAgICAgICAgICAgIGlmIChjICE9ICc/Jykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRlZnNbY10pXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnVmZmVyLnB1c2godGhpcy5nZXRQbGFjZWhvbGRlcihpKSk7XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1ZmZlci5wdXNoKGMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGVmYXVsdEJ1ZmZlciA9IHRoaXMuYnVmZmVyLmpvaW4oJycpO1xuICAgIH1cblxuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSkgOiB2b2lkIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuXG4gICAgICAgIGlmICh0aGlzLmlucHV0Vmlld0NoaWxkICYmIHRoaXMuaW5wdXRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCkge1xuICAgICAgICAgICAgaWYgKHRoaXMudmFsdWUgPT0gdW5kZWZpbmVkIHx8IHRoaXMudmFsdWUgPT0gbnVsbClcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSAnJztcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSB0aGlzLnZhbHVlO1xuXG4gICAgICAgICAgICB0aGlzLmNoZWNrVmFsKCk7XG4gICAgICAgICAgICB0aGlzLmZvY3VzVGV4dCA9IHRoaXMuaW5wdXRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC52YWx1ZTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlRmlsbGVkU3RhdGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkID0gZm47XG4gICAgfVxuXG4gICAgc2V0RGlzYWJsZWRTdGF0ZSh2YWw6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IHZhbDtcbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBjYXJldChmaXJzdD86IG51bWJlciwgbGFzdD86IG51bWJlcikge1xuICAgICAgICBsZXQgcmFuZ2UsIGJlZ2luLCBlbmQ7XG5cbiAgICAgICAgaWYgKCF0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQub2Zmc2V0UGFyZW50fHx0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQgIT09IHRoaXMuaW5wdXRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5vd25lckRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgZmlyc3QgPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIGJlZ2luID0gZmlyc3Q7XG4gICAgICAgICAgICBlbmQgPSAodHlwZW9mIGxhc3QgPT09ICdudW1iZXInKSA/IGxhc3QgOiBiZWdpbjtcbiAgICAgICAgICAgIGlmICh0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2UoYmVnaW4sIGVuZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnRbJ2NyZWF0ZVRleHRSYW5nZSddKSB7XG4gICAgICAgICAgICAgICAgcmFuZ2UgPSB0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnRbJ2NyZWF0ZVRleHRSYW5nZSddKCk7XG4gICAgICAgICAgICAgICAgcmFuZ2UuY29sbGFwc2UodHJ1ZSk7XG4gICAgICAgICAgICAgICAgcmFuZ2UubW92ZUVuZCgnY2hhcmFjdGVyJywgZW5kKTtcbiAgICAgICAgICAgICAgICByYW5nZS5tb3ZlU3RhcnQoJ2NoYXJhY3RlcicsIGJlZ2luKTtcbiAgICAgICAgICAgICAgICByYW5nZS5zZWxlY3QoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2UpIHtcbiAgICBcdFx0XHRiZWdpbiA9IHRoaXMuaW5wdXRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydDtcbiAgICBcdFx0XHRlbmQgPSB0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uRW5kO1xuICAgIFx0XHR9XG4gICAgICAgICAgICBlbHNlIGlmIChkb2N1bWVudFsnc2VsZWN0aW9uJ10gJiYgZG9jdW1lbnRbJ3NlbGVjdGlvbiddLmNyZWF0ZVJhbmdlKSB7XG4gICAgXHRcdFx0cmFuZ2UgPSBkb2N1bWVudFsnc2VsZWN0aW9uJ10uY3JlYXRlUmFuZ2UoKTtcbiAgICBcdFx0XHRiZWdpbiA9IDAgLSByYW5nZS5kdXBsaWNhdGUoKS5tb3ZlU3RhcnQoJ2NoYXJhY3RlcicsIC0xMDAwMDApO1xuICAgIFx0XHRcdGVuZCA9IGJlZ2luICsgcmFuZ2UudGV4dC5sZW5ndGg7XG4gICAgXHRcdH1cblxuICAgIFx0XHRyZXR1cm4ge2JlZ2luOiBiZWdpbiwgZW5kOiBlbmR9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNDb21wbGV0ZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIGxldCBjb21wbGV0ZWQ6IGJvb2xlYW47XG4gICAgICAgIGZvciAobGV0IGkgPSB0aGlzLmZpcnN0Tm9uTWFza1BvczsgaSA8PSB0aGlzLmxhc3RSZXF1aXJlZE5vbk1hc2tQb3M7IGkrKykge1xuICAgICAgICAgICAgaWYgKHRoaXMudGVzdHNbaV0gJiYgdGhpcy5idWZmZXJbaV0gPT09IHRoaXMuZ2V0UGxhY2Vob2xkZXIoaSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBnZXRQbGFjZWhvbGRlcihpOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKGkgPCB0aGlzLnNsb3RDaGFyLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2xvdENoYXIuY2hhckF0KGkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnNsb3RDaGFyLmNoYXJBdCgwKTtcbiAgICB9XG5cbiAgICBzZWVrTmV4dChwb3MpIHtcbiAgICAgICAgd2hpbGUgKCsrcG9zIDwgdGhpcy5sZW4gJiYgIXRoaXMudGVzdHNbcG9zXSk7XG4gICAgICAgIHJldHVybiBwb3M7XG4gICAgfVxuXG4gICAgc2Vla1ByZXYocG9zKSB7XG4gICAgICAgIHdoaWxlICgtLXBvcyA+PSAwICYmICF0aGlzLnRlc3RzW3Bvc10pO1xuICAgICAgICByZXR1cm4gcG9zO1xuICAgIH1cblxuICAgIHNoaWZ0TChiZWdpbjpudW1iZXIsZW5kOm51bWJlcikge1xuICAgICAgICBsZXQgaSwgajtcblxuICAgICAgICBpZiAoYmVnaW48MCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChpID0gYmVnaW4sIGogPSB0aGlzLnNlZWtOZXh0KGVuZCk7IGkgPCB0aGlzLmxlbjsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodGhpcy50ZXN0c1tpXSkge1xuICAgICAgICAgICAgICAgIGlmIChqIDwgdGhpcy5sZW4gJiYgdGhpcy50ZXN0c1tpXS50ZXN0KHRoaXMuYnVmZmVyW2pdKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1ZmZlcltpXSA9IHRoaXMuYnVmZmVyW2pdO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1ZmZlcltqXSA9IHRoaXMuZ2V0UGxhY2Vob2xkZXIoaik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaiA9IHRoaXMuc2Vla05leHQoaik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy53cml0ZUJ1ZmZlcigpO1xuICAgICAgICB0aGlzLmNhcmV0KE1hdGgubWF4KHRoaXMuZmlyc3ROb25NYXNrUG9zLCBiZWdpbikpO1xuICAgIH1cblxuICAgIHNoaWZ0Uihwb3MpIHtcbiAgICAgICAgbGV0IGksIGMsIGosIHQ7XG5cbiAgICAgICAgZm9yIChpID0gcG9zLCBjID0gdGhpcy5nZXRQbGFjZWhvbGRlcihwb3MpOyBpIDwgdGhpcy5sZW47IGkrKykge1xuICAgICAgICAgICAgaWYgKHRoaXMudGVzdHNbaV0pIHtcbiAgICAgICAgICAgICAgICBqID0gdGhpcy5zZWVrTmV4dChpKTtcbiAgICAgICAgICAgICAgICB0ID0gdGhpcy5idWZmZXJbaV07XG4gICAgICAgICAgICAgICAgdGhpcy5idWZmZXJbaV0gPSBjO1xuICAgICAgICAgICAgICAgIGlmIChqIDwgdGhpcy5sZW4gJiYgdGhpcy50ZXN0c1tqXS50ZXN0KHQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGMgPSB0O1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUFuZHJvaWRJbnB1dChlKSB7XG4gICAgICAgIHZhciBjdXJWYWwgPSB0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQudmFsdWU7XG4gICAgICAgIHZhciBwb3MgPSB0aGlzLmNhcmV0KCk7XG4gICAgICAgIGlmICh0aGlzLm9sZFZhbCAmJiB0aGlzLm9sZFZhbC5sZW5ndGggJiYgdGhpcy5vbGRWYWwubGVuZ3RoID4gY3VyVmFsLmxlbmd0aCApIHtcbiAgICAgICAgICAgIC8vIGEgZGVsZXRpb24gb3IgYmFja3NwYWNlIGhhcHBlbmVkXG4gICAgICAgICAgICB0aGlzLmNoZWNrVmFsKHRydWUpO1xuICAgICAgICAgICAgd2hpbGUgKHBvcy5iZWdpbiA+IDAgJiYgIXRoaXMudGVzdHNbcG9zLmJlZ2luLTFdKVxuICAgICAgICAgICAgICAgICAgcG9zLmJlZ2luLS07XG4gICAgICAgICAgICBpZiAocG9zLmJlZ2luID09PSAwKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgd2hpbGUgKHBvcy5iZWdpbiA8IHRoaXMuZmlyc3ROb25NYXNrUG9zICYmICF0aGlzLnRlc3RzW3Bvcy5iZWdpbl0pXG4gICAgICAgICAgICAgICAgICBwb3MuYmVnaW4rKztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYXJldChwb3MuYmVnaW4sIHBvcy5iZWdpbik7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVNb2RlbChlKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0NvbXBsZXRlZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25Db21wbGV0ZS5lbWl0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNoZWNrVmFsKHRydWUpO1xuICAgICAgICAgICAgd2hpbGUgKHBvcy5iZWdpbiA8IHRoaXMubGVuICYmICF0aGlzLnRlc3RzW3Bvcy5iZWdpbl0pXG4gICAgICAgICAgICAgICAgcG9zLmJlZ2luKys7XG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY2FyZXQocG9zLmJlZ2luLCBwb3MuYmVnaW4pO1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlTW9kZWwoZSk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNDb21wbGV0ZWQoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uQ29tcGxldGUuZW1pdCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25JbnB1dEJsdXIoZSkge1xuICAgICAgICB0aGlzLmZvY3VzZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5vbk1vZGVsVG91Y2hlZCgpO1xuICAgICAgICB0aGlzLmNoZWNrVmFsKCk7XG4gICAgICAgIHRoaXMudXBkYXRlRmlsbGVkU3RhdGUoKTtcbiAgICAgICAgdGhpcy5vbkJsdXIuZW1pdChlKTtcblxuICAgICAgICBpZiAodGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnZhbHVlICE9IHRoaXMuZm9jdXNUZXh0IHx8IHRoaXMuaW5wdXRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC52YWx1ZSAhPSB0aGlzLnZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU1vZGVsKGUpO1xuICAgICAgICAgICAgbGV0IGV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0hUTUxFdmVudHMnKTtcbiAgICAgICAgICAgIGV2ZW50LmluaXRFdmVudCgnY2hhbmdlJywgdHJ1ZSwgZmFsc2UpO1xuICAgICAgICAgICAgdGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25JbnB1dEtleWRvd24oZSkge1xuICAgICAgICBpZiAodGhpcy5yZWFkb25seSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGsgPSBlLndoaWNofHxlLmtleUNvZGUsXG4gICAgICAgICAgICBwb3MsXG4gICAgICAgICAgICBiZWdpbixcbiAgICAgICAgICAgIGVuZDtcbiAgICAgICAgbGV0IGlQaG9uZSA9IC9pcGhvbmUvaS50ZXN0KERvbUhhbmRsZXIuZ2V0VXNlckFnZW50KCkpO1xuICAgICAgICB0aGlzLm9sZFZhbCA9IHRoaXMuaW5wdXRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC52YWx1ZTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMub25LZXlkb3duLmVtaXQoZSk7XG5cbiAgICAgICAgLy9iYWNrc3BhY2UsIGRlbGV0ZSwgYW5kIGVzY2FwZSBnZXQgc3BlY2lhbCB0cmVhdG1lbnRcbiAgICAgICAgaWYgKGsgPT09IDggfHwgayA9PT0gNDYgfHwgKGlQaG9uZSAmJiBrID09PSAxMjcpKSB7XG4gICAgICAgICAgICBwb3MgPSB0aGlzLmNhcmV0KCk7XG4gICAgICAgICAgICBiZWdpbiA9IHBvcy5iZWdpbjtcbiAgICAgICAgICAgIGVuZCA9IHBvcy5lbmQ7XG5cbiAgICAgICAgICAgIGlmIChlbmQgLSBiZWdpbiA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGJlZ2luPWshPT00Nj90aGlzLnNlZWtQcmV2KGJlZ2luKTooZW5kPXRoaXMuc2Vla05leHQoYmVnaW4tMSkpO1xuICAgICAgICAgICAgICAgIGVuZD1rPT09NDY/dGhpcy5zZWVrTmV4dChlbmQpOmVuZDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5jbGVhckJ1ZmZlcihiZWdpbiwgZW5kKTtcblx0XHRcdHRoaXMuc2hpZnRMKGJlZ2luLCBlbmQgLSAxKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTW9kZWwoZSk7XG4gICAgICAgICAgICB0aGlzLm9uSW5wdXQuZW1pdChlKTtcblxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCBrID09PSAxMyApIHsgLy8gZW50ZXJcbiAgICAgICAgICAgIHRoaXMub25JbnB1dEJsdXIoZSk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU1vZGVsKGUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGsgPT09IDI3KSB7IC8vIGVzY2FwZVxuICAgICAgICAgICAgdGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnZhbHVlID0gdGhpcy5mb2N1c1RleHQ7XG4gICAgICAgICAgICB0aGlzLmNhcmV0KDAsIHRoaXMuY2hlY2tWYWwoKSk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU1vZGVsKGUpO1xuXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbktleVByZXNzKGUpIHtcbiAgICAgICAgaWYgKHRoaXMucmVhZG9ubHkpe1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGsgPSBlLndoaWNoIHx8IGUua2V5Q29kZSxcbiAgICAgICAgICAgIHBvcyA9IHRoaXMuY2FyZXQoKSxcbiAgICAgICAgICAgIHAsXG4gICAgICAgICAgICBjLFxuICAgICAgICAgICAgbmV4dCxcbiAgICAgICAgICAgIGNvbXBsZXRlZDtcblxuICAgICAgICBpZiAoZS5jdHJsS2V5IHx8IGUuYWx0S2V5IHx8IGUubWV0YUtleSB8fCBrIDwgMzIgIHx8IChrID4gMzQgJiYgayA8IDQxKSkgey8vSWdub3JlXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSBpZiAoIGsgJiYgayAhPT0gMTMgKSB7XG4gICAgICAgICAgICBpZiAocG9zLmVuZCAtIHBvcy5iZWdpbiAhPT0gMCl7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhckJ1ZmZlcihwb3MuYmVnaW4sIHBvcy5lbmQpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2hpZnRMKHBvcy5iZWdpbiwgcG9zLmVuZC0xKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcCA9IHRoaXMuc2Vla05leHQocG9zLmJlZ2luIC0gMSk7XG4gICAgICAgICAgICBpZiAocCA8IHRoaXMubGVuKSB7XG4gICAgICAgICAgICAgICAgYyA9IFN0cmluZy5mcm9tQ2hhckNvZGUoayk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudGVzdHNbcF0udGVzdChjKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNoaWZ0UihwKTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1ZmZlcltwXSA9IGM7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMud3JpdGVCdWZmZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgbmV4dCA9IHRoaXMuc2Vla05leHQocCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKC9hbmRyb2lkL2kudGVzdChEb21IYW5kbGVyLmdldFVzZXJBZ2VudCgpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9QYXRoIGZvciBDU1AgVmlvbGF0aW9uIG9uIEZpcmVGb3ggT1MgMS4xXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcHJveHkgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYXJldChuZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQocHJveHksMCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhcmV0KG5leHQpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBvcy5iZWdpbiA8PSB0aGlzLmxhc3RSZXF1aXJlZE5vbk1hc2tQb3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlZCA9IHRoaXMuaXNDb21wbGV0ZWQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25JbnB1dC5lbWl0KGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudXBkYXRlTW9kZWwoZSk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVGaWxsZWRTdGF0ZSgpO1xuXG4gICAgICAgIGlmIChjb21wbGV0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMub25Db21wbGV0ZS5lbWl0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGVhckJ1ZmZlcihzdGFydCwgZW5kKSB7XG4gICAgICAgIGxldCBpO1xuICAgICAgICBmb3IgKGkgPSBzdGFydDsgaSA8IGVuZCAmJiBpIDwgdGhpcy5sZW47IGkrKykge1xuICAgICAgICAgICAgaWYgKHRoaXMudGVzdHNbaV0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJ1ZmZlcltpXSA9IHRoaXMuZ2V0UGxhY2Vob2xkZXIoaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB3cml0ZUJ1ZmZlcigpIHtcbiAgICAgICAgdGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnZhbHVlID0gdGhpcy5idWZmZXIuam9pbignJyk7XG4gICAgfVxuXG4gICAgY2hlY2tWYWwoYWxsb3c/OiBib29sZWFuKSB7XG4gICAgICAgIC8vdHJ5IHRvIHBsYWNlIGNoYXJhY3RlcnMgd2hlcmUgdGhleSBiZWxvbmdcbiAgICAgICAgbGV0IHRlc3QgPSB0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQudmFsdWUsXG4gICAgICAgICAgICBsYXN0TWF0Y2ggPSAtMSxcbiAgICAgICAgICAgIGksXG4gICAgICAgICAgICBjLFxuICAgICAgICAgICAgcG9zO1xuXG4gICAgICAgIGZvciAoaSA9IDAsIHBvcyA9IDA7IGkgPCB0aGlzLmxlbjsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodGhpcy50ZXN0c1tpXSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYnVmZmVyW2ldID0gdGhpcy5nZXRQbGFjZWhvbGRlcihpKTtcbiAgICAgICAgICAgICAgICB3aGlsZSAocG9zKysgPCB0ZXN0Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBjID0gdGVzdC5jaGFyQXQocG9zIC0gMSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnRlc3RzW2ldLnRlc3QoYykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYnVmZmVyW2ldID0gYztcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RNYXRjaCA9IGk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocG9zID4gdGVzdC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhckJ1ZmZlcihpICsgMSwgdGhpcy5sZW4pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmJ1ZmZlcltpXSA9PT0gdGVzdC5jaGFyQXQocG9zKSkge1xuICAgICAgICAgICAgICAgICAgICBwb3MrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCBpIDwgdGhpcy5wYXJ0aWFsUG9zaXRpb24pe1xuICAgICAgICAgICAgICAgICAgICBsYXN0TWF0Y2ggPSBpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoYWxsb3cpIHtcbiAgICAgICAgICAgIHRoaXMud3JpdGVCdWZmZXIoKTtcbiAgICAgICAgfSBlbHNlIGlmIChsYXN0TWF0Y2ggKyAxIDwgdGhpcy5wYXJ0aWFsUG9zaXRpb24pIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmF1dG9DbGVhciB8fCB0aGlzLmJ1ZmZlci5qb2luKCcnKSA9PT0gdGhpcy5kZWZhdWx0QnVmZmVyKSB7XG4gICAgICAgICAgICAgICAgLy8gSW52YWxpZCB2YWx1ZS4gUmVtb3ZlIGl0IGFuZCByZXBsYWNlIGl0IHdpdGggdGhlXG4gICAgICAgICAgICAgICAgLy8gbWFzaywgd2hpY2ggaXMgdGhlIGRlZmF1bHQgYmVoYXZpb3IuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaW5wdXRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC52YWx1ZSkgdGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnZhbHVlID0gJyc7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhckJ1ZmZlcigwLCB0aGlzLmxlbik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIEludmFsaWQgdmFsdWUsIGJ1dCB3ZSBvcHQgdG8gc2hvdyB0aGUgdmFsdWUgdG8gdGhlXG4gICAgICAgICAgICAgICAgLy8gdXNlciBhbmQgYWxsb3cgdGhlbSB0byBjb3JyZWN0IHRoZWlyIG1pc3Rha2UuXG4gICAgICAgICAgICAgICAgdGhpcy53cml0ZUJ1ZmZlcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy53cml0ZUJ1ZmZlcigpO1xuICAgICAgICAgICAgdGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnZhbHVlID0gdGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnZhbHVlLnN1YnN0cmluZygwLCBsYXN0TWF0Y2ggKyAxKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKHRoaXMucGFydGlhbFBvc2l0aW9uID8gaSA6IHRoaXMuZmlyc3ROb25NYXNrUG9zKTtcbiAgICB9XG5cbiAgICBvbklucHV0Rm9jdXMoZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMucmVhZG9ubHkpe1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5mb2N1c2VkID0gdHJ1ZTtcblxuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5jYXJldFRpbWVvdXRJZCk7XG4gICAgICAgIGxldCBwb3M7XG5cbiAgICAgICAgdGhpcy5mb2N1c1RleHQgPSB0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQudmFsdWU7XG5cbiAgICAgICAgcG9zID0gdGhpcy5jaGVja1ZhbCgpO1xuXG4gICAgICAgIHRoaXMuY2FyZXRUaW1lb3V0SWQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQgIT09IHRoaXMuaW5wdXRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5vd25lckRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpe1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMud3JpdGVCdWZmZXIoKTtcbiAgICAgICAgICAgIGlmIChwb3MgPT0gdGhpcy5tYXNrLnJlcGxhY2UoXCI/XCIsXCJcIikubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYXJldCgwLCBwb3MpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhcmV0KHBvcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDEwKTtcblxuICAgICAgICB0aGlzLm9uRm9jdXMuZW1pdChldmVudCk7XG4gICAgfVxuXG4gICAgb25JbnB1dENoYW5nZShldmVudCkge1xuICAgICAgICBpZiAodGhpcy5hbmRyb2lkQ2hyb21lKVxuICAgICAgICAgICAgdGhpcy5oYW5kbGVBbmRyb2lkSW5wdXQoZXZlbnQpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLmhhbmRsZUlucHV0Q2hhbmdlKGV2ZW50KTtcblxuICAgICAgICB0aGlzLm9uSW5wdXQuZW1pdChldmVudCk7XG4gICAgfVxuXG4gICAgaGFuZGxlSW5wdXRDaGFuZ2UoZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMucmVhZG9ubHkpe1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB2YXIgcG9zID0gdGhpcy5jaGVja1ZhbCh0cnVlKTtcbiAgICAgICAgICAgIHRoaXMuY2FyZXQocG9zKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTW9kZWwoZXZlbnQpO1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNDb21wbGV0ZWQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMub25Db21wbGV0ZS5lbWl0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDApO1xuICAgIH1cblxuICAgIGdldFVubWFza2VkVmFsdWUoKSB7XG4gICAgICAgIGxldCB1bm1hc2tlZEJ1ZmZlciA9IFtdO1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5idWZmZXIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBjID0gdGhpcy5idWZmZXJbaV07XG4gICAgICAgICAgICBpZiAodGhpcy50ZXN0c1tpXSAmJiBjICE9IHRoaXMuZ2V0UGxhY2Vob2xkZXIoaSkpIHtcbiAgICAgICAgICAgICAgICB1bm1hc2tlZEJ1ZmZlci5wdXNoKGMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHVubWFza2VkQnVmZmVyLmpvaW4oJycpO1xuICAgIH1cblxuICAgIHVwZGF0ZU1vZGVsKGUpIHtcbiAgICAgICAgY29uc3QgdXBkYXRlZFZhbHVlID0gdGhpcy51bm1hc2sgPyB0aGlzLmdldFVubWFza2VkVmFsdWUoKSA6IGUudGFyZ2V0LnZhbHVlO1xuICAgICAgICBpZiAodXBkYXRlZFZhbHVlICE9PSBudWxsIHx8IHVwZGF0ZWRWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdXBkYXRlZFZhbHVlO1xuICAgICAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlKHRoaXMudmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlRmlsbGVkU3RhdGUoKSB7XG4gICAgICAgIHRoaXMuZmlsbGVkID0gdGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50ICYmIHRoaXMuaW5wdXRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC52YWx1ZSAhPSAnJztcbiAgICB9XG5cbiAgICBmb2N1cygpIHtcbiAgICAgICAgdGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG5cbiAgICB9XG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSxJbnB1dFRleHRNb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtJbnB1dE1hc2tdLFxuICAgIGRlY2xhcmF0aW9uczogW0lucHV0TWFza11cbn0pXG5leHBvcnQgY2xhc3MgSW5wdXRNYXNrTW9kdWxlIHsgfVxuIl19