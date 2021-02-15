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
import { NgModule, Component, ElementRef, Input, forwardRef, Output, EventEmitter, ViewChild, ChangeDetectionStrategy, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
import { InputTextModule } from 'primeng/inputtext';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
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
    onKeyDown(e) {
        if (this.readonly) {
            return;
        }
        let k = e.which || e.keyCode, pos, begin, end;
        let iPhone = /iphone/i.test(DomHandler.getUserAgent());
        this.oldVal = this.inputViewChild.nativeElement.value;
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
InputMask.decorators = [
    { type: Component, args: [{
                selector: 'p-inputMask',
                template: `<input #input pInputText class="p-inputmask" [attr.id]="inputId" [attr.type]="type" [attr.name]="name" [ngStyle]="style" [ngClass]="styleClass" [attr.placeholder]="placeholder" [attr.title]="title"
        [attr.size]="size" [attr.autocomplete]="autocomplete" [attr.maxlength]="maxlength" [attr.tabindex]="tabindex" [attr.aria-label]="ariaLabel" [attr.aria-required]="ariaRequired" [disabled]="disabled" [readonly]="readonly" [attr.required]="required"
        (focus)="onInputFocus($event)" (blur)="onInputBlur($event)" (keydown)="onKeyDown($event)" (keypress)="onKeyPress($event)" [attr.autofocus]="autoFocus"
        (input)="onInputChange($event)" (paste)="handleInputChange($event)">`,
                host: {
                    '[class.p-inputwrapper-filled]': 'filled',
                    '[class.p-inputwrapper-focus]': 'focused'
                },
                providers: [INPUTMASK_VALUE_ACCESSOR],
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None
            },] }
];
InputMask.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef }
];
InputMask.propDecorators = {
    type: [{ type: Input }],
    slotChar: [{ type: Input }],
    autoClear: [{ type: Input }],
    style: [{ type: Input }],
    inputId: [{ type: Input }],
    styleClass: [{ type: Input }],
    placeholder: [{ type: Input }],
    size: [{ type: Input }],
    maxlength: [{ type: Input }],
    tabindex: [{ type: Input }],
    title: [{ type: Input }],
    ariaLabel: [{ type: Input }],
    ariaRequired: [{ type: Input }],
    disabled: [{ type: Input }],
    readonly: [{ type: Input }],
    unmask: [{ type: Input }],
    name: [{ type: Input }],
    required: [{ type: Input }],
    characterPattern: [{ type: Input }],
    autoFocus: [{ type: Input }],
    autocomplete: [{ type: Input }],
    inputViewChild: [{ type: ViewChild, args: ['input', { static: true },] }],
    onComplete: [{ type: Output }],
    onFocus: [{ type: Output }],
    onBlur: [{ type: Output }],
    onInput: [{ type: Output }],
    mask: [{ type: Input }]
};
export class InputMaskModule {
}
InputMaskModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, InputTextModule],
                exports: [InputMask],
                declarations: [InputMask]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXRtYXNrLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uL3NyYy9hcHAvY29tcG9uZW50cy9pbnB1dG1hc2svIiwic291cmNlcyI6WyJpbnB1dG1hc2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBMEJFO0FBQ0YsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFrQixLQUFLLEVBQUMsVUFBVSxFQUFDLE1BQU0sRUFBQyxZQUFZLEVBQUMsU0FBUyxFQUFDLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLGlCQUFpQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzFMLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUNsRCxPQUFPLEVBQUMsaUJBQWlCLEVBQXVCLE1BQU0sZ0JBQWdCLENBQUM7QUFFdkUsTUFBTSxDQUFDLE1BQU0sd0JBQXdCLEdBQVE7SUFDM0MsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQztJQUN4QyxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUFnQkYsTUFBTSxPQUFPLFNBQVM7SUE0RmxCLFlBQW1CLEVBQWMsRUFBVSxFQUFxQjtRQUE3QyxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQVUsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUExRnZELFNBQUksR0FBVyxNQUFNLENBQUM7UUFFdEIsYUFBUSxHQUFXLEdBQUcsQ0FBQztRQUV2QixjQUFTLEdBQVksSUFBSSxDQUFDO1FBZ0MxQixxQkFBZ0IsR0FBVyxVQUFVLENBQUM7UUFRckMsZUFBVSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRW5ELFlBQU8sR0FBc0IsSUFB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QUFNO3FCQUVOLE1BQU07c0JBRU4sTUFBTTttQkFpRE4sS0FBSzs7QUFxZlYsTUFBTSxPQUFPLGVBQWU7OztZQUwzQixRQUFRLFNBQUM7Z0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFDLGVBQWUsQ0FBQztnQkFDdkMsT0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDO2dCQUNwQixZQUFZLEVBQUUsQ0FBQyxTQUFTLENBQUM7YUFDNUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICAgIFBvcnQgb2YgalF1ZXJ5IE1hc2tlZElucHV0IGJ5IERpZ2l0YWxCdXNoIGFzIGEgTmF0aXZlIEFuZ3VsYXIyIENvbXBvbmVudCBpbiBUeXBlc2NyaXB0IHdpdGhvdXQgalF1ZXJ5XG4gICAgaHR0cHM6Ly9naXRodWIuY29tL2RpZ2l0YWxCdXNoL2pxdWVyeS5tYXNrZWRpbnB1dC9cblxuICAgIENvcHlyaWdodCAoYykgMjAwNy0yMDE0IEpvc2ggQnVzaCAoZGlnaXRhbGJ1c2guY29tKVxuXG4gICAgUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb25cbiAgICBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvblxuICAgIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dFxuICAgIHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLFxuICAgIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gICAgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlXG4gICAgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmdcbiAgICBjb25kaXRpb25zOlxuXG4gICAgVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmVcbiAgICBpbmNsdWRlZCBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuICAgIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsXG4gICAgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTXG4gICAgT0YgTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkRcbiAgICBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVFxuICAgIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLFxuICAgIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lOR1xuICAgIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1JcbiAgICBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG4qL1xuaW1wb3J0IHtOZ01vZHVsZSxDb21wb25lbnQsRWxlbWVudFJlZixPbkluaXQsT25EZXN0cm95LElucHV0LGZvcndhcmRSZWYsT3V0cHV0LEV2ZW50RW1pdHRlcixWaWV3Q2hpbGQsQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFZpZXdFbmNhcHN1bGF0aW9uLCBDaGFuZ2VEZXRlY3RvclJlZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7RG9tSGFuZGxlcn0gZnJvbSAncHJpbWVuZy9kb20nO1xuaW1wb3J0IHtJbnB1dFRleHRNb2R1bGV9IGZyb20gJ3ByaW1lbmcvaW5wdXR0ZXh0JztcbmltcG9ydCB7TkdfVkFMVUVfQUNDRVNTT1IsIENvbnRyb2xWYWx1ZUFjY2Vzc29yfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmV4cG9ydCBjb25zdCBJTlBVVE1BU0tfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IElucHV0TWFzayksXG4gIG11bHRpOiB0cnVlXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtaW5wdXRNYXNrJyxcbiAgICB0ZW1wbGF0ZTogYDxpbnB1dCAjaW5wdXQgcElucHV0VGV4dCBjbGFzcz1cInAtaW5wdXRtYXNrXCIgW2F0dHIuaWRdPVwiaW5wdXRJZFwiIFthdHRyLnR5cGVdPVwidHlwZVwiIFthdHRyLm5hbWVdPVwibmFtZVwiIFtuZ1N0eWxlXT1cInN0eWxlXCIgW25nQ2xhc3NdPVwic3R5bGVDbGFzc1wiIFthdHRyLnBsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCIgW2F0dHIudGl0bGVdPVwidGl0bGVcIlxuICAgICAgICBbYXR0ci5zaXplXT1cInNpemVcIiBbYXR0ci5hdXRvY29tcGxldGVdPVwiYXV0b2NvbXBsZXRlXCIgW2F0dHIubWF4bGVuZ3RoXT1cIm1heGxlbmd0aFwiIFthdHRyLnRhYmluZGV4XT1cInRhYmluZGV4XCIgW2F0dHIuYXJpYS1sYWJlbF09XCJhcmlhTGFiZWxcIiBbYXR0ci5hcmlhLXJlcXVpcmVkXT1cImFyaWFSZXF1aXJlZFwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiIFtyZWFkb25seV09XCJyZWFkb25seVwiIFthdHRyLnJlcXVpcmVkXT1cInJlcXVpcmVkXCJcbiAgICAgICAgKGZvY3VzKT1cIm9uSW5wdXRGb2N1cygkZXZlbnQpXCIgKGJsdXIpPVwib25JbnB1dEJsdXIoJGV2ZW50KVwiIChrZXlkb3duKT1cIm9uS2V5RG93bigkZXZlbnQpXCIgKGtleXByZXNzKT1cIm9uS2V5UHJlc3MoJGV2ZW50KVwiIFthdHRyLmF1dG9mb2N1c109XCJhdXRvRm9jdXNcIlxuICAgICAgICAoaW5wdXQpPVwib25JbnB1dENoYW5nZSgkZXZlbnQpXCIgKHBhc3RlKT1cImhhbmRsZUlucHV0Q2hhbmdlKCRldmVudClcIj5gLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1tjbGFzcy5wLWlucHV0d3JhcHBlci1maWxsZWRdJzogJ2ZpbGxlZCcsXG4gICAgICAgICdbY2xhc3MucC1pbnB1dHdyYXBwZXItZm9jdXNdJzogJ2ZvY3VzZWQnXG4gICAgfSxcbiAgICBwcm92aWRlcnM6IFtJTlBVVE1BU0tfVkFMVUVfQUNDRVNTT1JdLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgSW5wdXRNYXNrIGltcGxlbWVudHMgT25Jbml0LE9uRGVzdHJveSxDb250cm9sVmFsdWVBY2Nlc3NvciB7XG5cbiAgICBASW5wdXQoKSB0eXBlOiBzdHJpbmcgPSAndGV4dCc7XG5cbiAgICBASW5wdXQoKSBzbG90Q2hhcjogc3RyaW5nID0gJ18nO1xuXG4gICAgQElucHV0KCkgYXV0b0NsZWFyOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XG5cbiAgICBASW5wdXQoKSBpbnB1dElkOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBwbGFjZWhvbGRlcjogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgc2l6ZTogbnVtYmVyO1xuXG4gICAgQElucHV0KCkgbWF4bGVuZ3RoOiBudW1iZXI7XG5cbiAgICBASW5wdXQoKSB0YWJpbmRleDogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgdGl0bGU6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGFyaWFMYWJlbDogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgYXJpYVJlcXVpcmVkOiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSByZWFkb25seTogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIHVubWFzazogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIG5hbWU6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIHJlcXVpcmVkOiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgY2hhcmFjdGVyUGF0dGVybjogc3RyaW5nID0gJ1tBLVphLXpdJztcblxuICAgIEBJbnB1dCgpIGF1dG9Gb2N1czogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIGF1dG9jb21wbGV0ZTogc3RyaW5nO1xuXG4gICAgQFZpZXdDaGlsZCgnaW5wdXQnLCB7IHN0YXRpYzogdHJ1ZSB9KSBpbnB1dFZpZXdDaGlsZDogRWxlbWVudFJlZjtcblxuICAgIEBPdXRwdXQoKSBvbkNvbXBsZXRlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBvbkZvY3VzOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBvbkJsdXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIG9uSW5wdXQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgdmFsdWU6IGFueTtcblxuICAgIF9tYXNrOiBzdHJpbmc7XG5cbiAgICBvbk1vZGVsQ2hhbmdlOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuXG4gICAgb25Nb2RlbFRvdWNoZWQ6IEZ1bmN0aW9uID0gKCkgPT4ge307XG5cbiAgICBpbnB1dDogSFRNTElucHV0RWxlbWVudDtcblxuICAgIGZpbGxlZDogYm9vbGVhbjtcblxuICAgIGRlZnM6IGFueTtcblxuICAgIHRlc3RzOiBhbnlbXTtcblxuICAgIHBhcnRpYWxQb3NpdGlvbjogYW55O1xuXG4gICAgZmlyc3ROb25NYXNrUG9zOiBudW1iZXI7XG5cbiAgICBsYXN0UmVxdWlyZWROb25NYXNrUG9zOiBhbnk7XG5cbiAgICBsZW46IG51bWJlcjtcblxuICAgIG9sZFZhbDogc3RyaW5nO1xuXG4gICAgYnVmZmVyOiBhbnk7XG5cbiAgICBkZWZhdWx0QnVmZmVyOiBzdHJpbmc7XG5cbiAgICBmb2N1c1RleHQ6IHN0cmluZztcblxuICAgIGNhcmV0VGltZW91dElkOiBhbnk7XG5cbiAgICBhbmRyb2lkQ2hyb21lOiBib29sZWFuO1xuXG4gICAgZm9jdXNlZDogYm9vbGVhbjtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZiwgcHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgbGV0IHVhID0gRG9tSGFuZGxlci5nZXRVc2VyQWdlbnQoKTtcbiAgICAgICAgdGhpcy5hbmRyb2lkQ2hyb21lID0gL2Nocm9tZS9pLnRlc3QodWEpICYmIC9hbmRyb2lkL2kudGVzdCh1YSk7XG5cbiAgICAgICAgdGhpcy5pbml0TWFzaygpO1xuICAgIH1cblxuICAgIEBJbnB1dCgpIGdldCBtYXNrKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXNrO1xuICAgIH1cblxuICAgIHNldCBtYXNrKHZhbDpzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fbWFzayA9IHZhbDtcblxuICAgICAgICB0aGlzLmluaXRNYXNrKCk7XG4gICAgICAgIHRoaXMud3JpdGVWYWx1ZSgnJyk7XG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSh0aGlzLnZhbHVlKTtcbiAgICB9XG5cbiAgICBpbml0TWFzaygpIHtcbiAgICAgICAgdGhpcy50ZXN0cyA9IFtdO1xuICAgICAgICB0aGlzLnBhcnRpYWxQb3NpdGlvbiA9IHRoaXMubWFzay5sZW5ndGg7XG4gICAgICAgIHRoaXMubGVuID0gdGhpcy5tYXNrLmxlbmd0aDtcbiAgICAgICAgdGhpcy5maXJzdE5vbk1hc2tQb3MgPSBudWxsO1xuICAgICAgICB0aGlzLmRlZnMgPSB7XG4gICAgICAgICAgICAnOSc6ICdbMC05XScsXG4gICAgICAgICAgICAnYSc6IHRoaXMuY2hhcmFjdGVyUGF0dGVybixcbiAgICAgICAgICAgICcqJzogYCR7dGhpcy5jaGFyYWN0ZXJQYXR0ZXJufXxbMC05XWBcbiAgICAgICAgfTtcblxuICAgICAgICBsZXQgbWFza1Rva2VucyA9IHRoaXMubWFzay5zcGxpdCgnJyk7XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBtYXNrVG9rZW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgYyA9IG1hc2tUb2tlbnNbaV07XG4gICAgICAgICAgICBpZiAoYyA9PSAnPycpIHtcblx0XHRcdFx0dGhpcy5sZW4tLTtcblx0XHRcdFx0dGhpcy5wYXJ0aWFsUG9zaXRpb24gPSBpO1xuXHRcdFx0fVxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5kZWZzW2NdKSB7XG5cdFx0XHRcdHRoaXMudGVzdHMucHVzaChuZXcgUmVnRXhwKHRoaXMuZGVmc1tjXSkpO1xuXHRcdFx0XHRpZiAodGhpcy5maXJzdE5vbk1hc2tQb3MgPT09IG51bGwpIHtcblx0ICAgICAgICAgICAgICAgIHRoaXMuZmlyc3ROb25NYXNrUG9zID0gdGhpcy50ZXN0cy5sZW5ndGggLSAxO1xuXHRcdFx0XHR9XG4gICAgICAgICAgICAgICAgaWYgKGkgPCB0aGlzLnBhcnRpYWxQb3NpdGlvbil7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGFzdFJlcXVpcmVkTm9uTWFza1BvcyA9IHRoaXMudGVzdHMubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgICAgICB9XG5cdFx0XHR9XG4gICAgICAgICAgICBlbHNlIHtcblx0XHRcdFx0dGhpcy50ZXN0cy5wdXNoKG51bGwpO1xuXHRcdFx0fVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5idWZmZXIgPSBbXTtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IG1hc2tUb2tlbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBjID0gbWFza1Rva2Vuc1tpXTtcbiAgICAgICAgICAgIGlmIChjICE9ICc/Jykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRlZnNbY10pXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnVmZmVyLnB1c2godGhpcy5nZXRQbGFjZWhvbGRlcihpKSk7XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1ZmZlci5wdXNoKGMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGVmYXVsdEJ1ZmZlciA9IHRoaXMuYnVmZmVyLmpvaW4oJycpO1xuICAgIH1cblxuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSkgOiB2b2lkIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuXG4gICAgICAgIGlmICh0aGlzLmlucHV0Vmlld0NoaWxkICYmIHRoaXMuaW5wdXRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCkge1xuICAgICAgICAgICAgaWYgKHRoaXMudmFsdWUgPT0gdW5kZWZpbmVkIHx8IHRoaXMudmFsdWUgPT0gbnVsbClcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSAnJztcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSB0aGlzLnZhbHVlO1xuXG4gICAgICAgICAgICB0aGlzLmNoZWNrVmFsKCk7XG4gICAgICAgICAgICB0aGlzLmZvY3VzVGV4dCA9IHRoaXMuaW5wdXRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC52YWx1ZTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlRmlsbGVkU3RhdGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkID0gZm47XG4gICAgfVxuXG4gICAgc2V0RGlzYWJsZWRTdGF0ZSh2YWw6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IHZhbDtcbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBjYXJldChmaXJzdD86IG51bWJlciwgbGFzdD86IG51bWJlcikge1xuICAgICAgICBsZXQgcmFuZ2UsIGJlZ2luLCBlbmQ7XG5cbiAgICAgICAgaWYgKCF0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQub2Zmc2V0UGFyZW50fHx0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQgIT09IHRoaXMuaW5wdXRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5vd25lckRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgZmlyc3QgPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIGJlZ2luID0gZmlyc3Q7XG4gICAgICAgICAgICBlbmQgPSAodHlwZW9mIGxhc3QgPT09ICdudW1iZXInKSA/IGxhc3QgOiBiZWdpbjtcbiAgICAgICAgICAgIGlmICh0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2UoYmVnaW4sIGVuZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnRbJ2NyZWF0ZVRleHRSYW5nZSddKSB7XG4gICAgICAgICAgICAgICAgcmFuZ2UgPSB0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnRbJ2NyZWF0ZVRleHRSYW5nZSddKCk7XG4gICAgICAgICAgICAgICAgcmFuZ2UuY29sbGFwc2UodHJ1ZSk7XG4gICAgICAgICAgICAgICAgcmFuZ2UubW92ZUVuZCgnY2hhcmFjdGVyJywgZW5kKTtcbiAgICAgICAgICAgICAgICByYW5nZS5tb3ZlU3RhcnQoJ2NoYXJhY3RlcicsIGJlZ2luKTtcbiAgICAgICAgICAgICAgICByYW5nZS5zZWxlY3QoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2UpIHtcbiAgICBcdFx0XHRiZWdpbiA9IHRoaXMuaW5wdXRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydDtcbiAgICBcdFx0XHRlbmQgPSB0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uRW5kO1xuICAgIFx0XHR9XG4gICAgICAgICAgICBlbHNlIGlmIChkb2N1bWVudFsnc2VsZWN0aW9uJ10gJiYgZG9jdW1lbnRbJ3NlbGVjdGlvbiddLmNyZWF0ZVJhbmdlKSB7XG4gICAgXHRcdFx0cmFuZ2UgPSBkb2N1bWVudFsnc2VsZWN0aW9uJ10uY3JlYXRlUmFuZ2UoKTtcbiAgICBcdFx0XHRiZWdpbiA9IDAgLSByYW5nZS5kdXBsaWNhdGUoKS5tb3ZlU3RhcnQoJ2NoYXJhY3RlcicsIC0xMDAwMDApO1xuICAgIFx0XHRcdGVuZCA9IGJlZ2luICsgcmFuZ2UudGV4dC5sZW5ndGg7XG4gICAgXHRcdH1cblxuICAgIFx0XHRyZXR1cm4ge2JlZ2luOiBiZWdpbiwgZW5kOiBlbmR9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNDb21wbGV0ZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIGxldCBjb21wbGV0ZWQ6IGJvb2xlYW47XG4gICAgICAgIGZvciAobGV0IGkgPSB0aGlzLmZpcnN0Tm9uTWFza1BvczsgaSA8PSB0aGlzLmxhc3RSZXF1aXJlZE5vbk1hc2tQb3M7IGkrKykge1xuICAgICAgICAgICAgaWYgKHRoaXMudGVzdHNbaV0gJiYgdGhpcy5idWZmZXJbaV0gPT09IHRoaXMuZ2V0UGxhY2Vob2xkZXIoaSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBnZXRQbGFjZWhvbGRlcihpOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKGkgPCB0aGlzLnNsb3RDaGFyLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2xvdENoYXIuY2hhckF0KGkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnNsb3RDaGFyLmNoYXJBdCgwKTtcbiAgICB9XG5cbiAgICBzZWVrTmV4dChwb3MpIHtcbiAgICAgICAgd2hpbGUgKCsrcG9zIDwgdGhpcy5sZW4gJiYgIXRoaXMudGVzdHNbcG9zXSk7XG4gICAgICAgIHJldHVybiBwb3M7XG4gICAgfVxuXG4gICAgc2Vla1ByZXYocG9zKSB7XG4gICAgICAgIHdoaWxlICgtLXBvcyA+PSAwICYmICF0aGlzLnRlc3RzW3Bvc10pO1xuICAgICAgICByZXR1cm4gcG9zO1xuICAgIH1cblxuICAgIHNoaWZ0TChiZWdpbjpudW1iZXIsZW5kOm51bWJlcikge1xuICAgICAgICBsZXQgaSwgajtcblxuICAgICAgICBpZiAoYmVnaW48MCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChpID0gYmVnaW4sIGogPSB0aGlzLnNlZWtOZXh0KGVuZCk7IGkgPCB0aGlzLmxlbjsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodGhpcy50ZXN0c1tpXSkge1xuICAgICAgICAgICAgICAgIGlmIChqIDwgdGhpcy5sZW4gJiYgdGhpcy50ZXN0c1tpXS50ZXN0KHRoaXMuYnVmZmVyW2pdKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1ZmZlcltpXSA9IHRoaXMuYnVmZmVyW2pdO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1ZmZlcltqXSA9IHRoaXMuZ2V0UGxhY2Vob2xkZXIoaik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaiA9IHRoaXMuc2Vla05leHQoaik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy53cml0ZUJ1ZmZlcigpO1xuICAgICAgICB0aGlzLmNhcmV0KE1hdGgubWF4KHRoaXMuZmlyc3ROb25NYXNrUG9zLCBiZWdpbikpO1xuICAgIH1cblxuICAgIHNoaWZ0Uihwb3MpIHtcbiAgICAgICAgbGV0IGksIGMsIGosIHQ7XG5cbiAgICAgICAgZm9yIChpID0gcG9zLCBjID0gdGhpcy5nZXRQbGFjZWhvbGRlcihwb3MpOyBpIDwgdGhpcy5sZW47IGkrKykge1xuICAgICAgICAgICAgaWYgKHRoaXMudGVzdHNbaV0pIHtcbiAgICAgICAgICAgICAgICBqID0gdGhpcy5zZWVrTmV4dChpKTtcbiAgICAgICAgICAgICAgICB0ID0gdGhpcy5idWZmZXJbaV07XG4gICAgICAgICAgICAgICAgdGhpcy5idWZmZXJbaV0gPSBjO1xuICAgICAgICAgICAgICAgIGlmIChqIDwgdGhpcy5sZW4gJiYgdGhpcy50ZXN0c1tqXS50ZXN0KHQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGMgPSB0O1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUFuZHJvaWRJbnB1dChlKSB7XG4gICAgICAgIHZhciBjdXJWYWwgPSB0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQudmFsdWU7XG4gICAgICAgIHZhciBwb3MgPSB0aGlzLmNhcmV0KCk7XG4gICAgICAgIGlmICh0aGlzLm9sZFZhbCAmJiB0aGlzLm9sZFZhbC5sZW5ndGggJiYgdGhpcy5vbGRWYWwubGVuZ3RoID4gY3VyVmFsLmxlbmd0aCApIHtcbiAgICAgICAgICAgIC8vIGEgZGVsZXRpb24gb3IgYmFja3NwYWNlIGhhcHBlbmVkXG4gICAgICAgICAgICB0aGlzLmNoZWNrVmFsKHRydWUpO1xuICAgICAgICAgICAgd2hpbGUgKHBvcy5iZWdpbiA+IDAgJiYgIXRoaXMudGVzdHNbcG9zLmJlZ2luLTFdKVxuICAgICAgICAgICAgICAgICAgcG9zLmJlZ2luLS07XG4gICAgICAgICAgICBpZiAocG9zLmJlZ2luID09PSAwKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgd2hpbGUgKHBvcy5iZWdpbiA8IHRoaXMuZmlyc3ROb25NYXNrUG9zICYmICF0aGlzLnRlc3RzW3Bvcy5iZWdpbl0pXG4gICAgICAgICAgICAgICAgICBwb3MuYmVnaW4rKztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYXJldChwb3MuYmVnaW4sIHBvcy5iZWdpbik7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVNb2RlbChlKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0NvbXBsZXRlZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25Db21wbGV0ZS5lbWl0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNoZWNrVmFsKHRydWUpO1xuICAgICAgICAgICAgd2hpbGUgKHBvcy5iZWdpbiA8IHRoaXMubGVuICYmICF0aGlzLnRlc3RzW3Bvcy5iZWdpbl0pXG4gICAgICAgICAgICAgICAgcG9zLmJlZ2luKys7XG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY2FyZXQocG9zLmJlZ2luLCBwb3MuYmVnaW4pO1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlTW9kZWwoZSk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNDb21wbGV0ZWQoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uQ29tcGxldGUuZW1pdCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25JbnB1dEJsdXIoZSkge1xuICAgICAgICB0aGlzLmZvY3VzZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5vbk1vZGVsVG91Y2hlZCgpO1xuICAgICAgICB0aGlzLmNoZWNrVmFsKCk7XG4gICAgICAgIHRoaXMudXBkYXRlRmlsbGVkU3RhdGUoKTtcbiAgICAgICAgdGhpcy5vbkJsdXIuZW1pdChlKTtcblxuICAgICAgICBpZiAodGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnZhbHVlICE9IHRoaXMuZm9jdXNUZXh0IHx8IHRoaXMuaW5wdXRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC52YWx1ZSAhPSB0aGlzLnZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU1vZGVsKGUpO1xuICAgICAgICAgICAgbGV0IGV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0hUTUxFdmVudHMnKTtcbiAgICAgICAgICAgIGV2ZW50LmluaXRFdmVudCgnY2hhbmdlJywgdHJ1ZSwgZmFsc2UpO1xuICAgICAgICAgICAgdGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25LZXlEb3duKGUpIHtcbiAgICAgICAgaWYgKHRoaXMucmVhZG9ubHkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBrID0gZS53aGljaHx8ZS5rZXlDb2RlLFxuICAgICAgICAgICAgcG9zLFxuICAgICAgICAgICAgYmVnaW4sXG4gICAgICAgICAgICBlbmQ7XG4gICAgICAgIGxldCBpUGhvbmUgPSAvaXBob25lL2kudGVzdChEb21IYW5kbGVyLmdldFVzZXJBZ2VudCgpKTtcbiAgICAgICAgdGhpcy5vbGRWYWwgPSB0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQudmFsdWU7XG5cbiAgICAgICAgLy9iYWNrc3BhY2UsIGRlbGV0ZSwgYW5kIGVzY2FwZSBnZXQgc3BlY2lhbCB0cmVhdG1lbnRcbiAgICAgICAgaWYgKGsgPT09IDggfHwgayA9PT0gNDYgfHwgKGlQaG9uZSAmJiBrID09PSAxMjcpKSB7XG4gICAgICAgICAgICBwb3MgPSB0aGlzLmNhcmV0KCk7XG4gICAgICAgICAgICBiZWdpbiA9IHBvcy5iZWdpbjtcbiAgICAgICAgICAgIGVuZCA9IHBvcy5lbmQ7XG5cbiAgICAgICAgICAgIGlmIChlbmQgLSBiZWdpbiA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGJlZ2luPWshPT00Nj90aGlzLnNlZWtQcmV2KGJlZ2luKTooZW5kPXRoaXMuc2Vla05leHQoYmVnaW4tMSkpO1xuICAgICAgICAgICAgICAgIGVuZD1rPT09NDY/dGhpcy5zZWVrTmV4dChlbmQpOmVuZDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5jbGVhckJ1ZmZlcihiZWdpbiwgZW5kKTtcblx0XHRcdHRoaXMuc2hpZnRMKGJlZ2luLCBlbmQgLSAxKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTW9kZWwoZSk7XG4gICAgICAgICAgICB0aGlzLm9uSW5wdXQuZW1pdChlKTtcblxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCBrID09PSAxMyApIHsgLy8gZW50ZXJcbiAgICAgICAgICAgIHRoaXMub25JbnB1dEJsdXIoZSk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU1vZGVsKGUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGsgPT09IDI3KSB7IC8vIGVzY2FwZVxuICAgICAgICAgICAgdGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnZhbHVlID0gdGhpcy5mb2N1c1RleHQ7XG4gICAgICAgICAgICB0aGlzLmNhcmV0KDAsIHRoaXMuY2hlY2tWYWwoKSk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU1vZGVsKGUpO1xuXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbktleVByZXNzKGUpIHtcbiAgICAgICAgaWYgKHRoaXMucmVhZG9ubHkpe1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGsgPSBlLndoaWNoIHx8IGUua2V5Q29kZSxcbiAgICAgICAgICAgIHBvcyA9IHRoaXMuY2FyZXQoKSxcbiAgICAgICAgICAgIHAsXG4gICAgICAgICAgICBjLFxuICAgICAgICAgICAgbmV4dCxcbiAgICAgICAgICAgIGNvbXBsZXRlZDtcblxuICAgICAgICBpZiAoZS5jdHJsS2V5IHx8IGUuYWx0S2V5IHx8IGUubWV0YUtleSB8fCBrIDwgMzIgIHx8IChrID4gMzQgJiYgayA8IDQxKSkgey8vSWdub3JlXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSBpZiAoIGsgJiYgayAhPT0gMTMgKSB7XG4gICAgICAgICAgICBpZiAocG9zLmVuZCAtIHBvcy5iZWdpbiAhPT0gMCl7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhckJ1ZmZlcihwb3MuYmVnaW4sIHBvcy5lbmQpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2hpZnRMKHBvcy5iZWdpbiwgcG9zLmVuZC0xKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcCA9IHRoaXMuc2Vla05leHQocG9zLmJlZ2luIC0gMSk7XG4gICAgICAgICAgICBpZiAocCA8IHRoaXMubGVuKSB7XG4gICAgICAgICAgICAgICAgYyA9IFN0cmluZy5mcm9tQ2hhckNvZGUoayk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudGVzdHNbcF0udGVzdChjKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNoaWZ0UihwKTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1ZmZlcltwXSA9IGM7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMud3JpdGVCdWZmZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgbmV4dCA9IHRoaXMuc2Vla05leHQocCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKC9hbmRyb2lkL2kudGVzdChEb21IYW5kbGVyLmdldFVzZXJBZ2VudCgpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9QYXRoIGZvciBDU1AgVmlvbGF0aW9uIG9uIEZpcmVGb3ggT1MgMS4xXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcHJveHkgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYXJldChuZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQocHJveHksMCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhcmV0KG5leHQpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBvcy5iZWdpbiA8PSB0aGlzLmxhc3RSZXF1aXJlZE5vbk1hc2tQb3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlZCA9IHRoaXMuaXNDb21wbGV0ZWQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25JbnB1dC5lbWl0KGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudXBkYXRlTW9kZWwoZSk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVGaWxsZWRTdGF0ZSgpO1xuXG4gICAgICAgIGlmIChjb21wbGV0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMub25Db21wbGV0ZS5lbWl0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGVhckJ1ZmZlcihzdGFydCwgZW5kKSB7XG4gICAgICAgIGxldCBpO1xuICAgICAgICBmb3IgKGkgPSBzdGFydDsgaSA8IGVuZCAmJiBpIDwgdGhpcy5sZW47IGkrKykge1xuICAgICAgICAgICAgaWYgKHRoaXMudGVzdHNbaV0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJ1ZmZlcltpXSA9IHRoaXMuZ2V0UGxhY2Vob2xkZXIoaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB3cml0ZUJ1ZmZlcigpIHtcbiAgICAgICAgdGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnZhbHVlID0gdGhpcy5idWZmZXIuam9pbignJyk7XG4gICAgfVxuXG4gICAgY2hlY2tWYWwoYWxsb3c/OiBib29sZWFuKSB7XG4gICAgICAgIC8vdHJ5IHRvIHBsYWNlIGNoYXJhY3RlcnMgd2hlcmUgdGhleSBiZWxvbmdcbiAgICAgICAgbGV0IHRlc3QgPSB0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQudmFsdWUsXG4gICAgICAgICAgICBsYXN0TWF0Y2ggPSAtMSxcbiAgICAgICAgICAgIGksXG4gICAgICAgICAgICBjLFxuICAgICAgICAgICAgcG9zO1xuXG4gICAgICAgIGZvciAoaSA9IDAsIHBvcyA9IDA7IGkgPCB0aGlzLmxlbjsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodGhpcy50ZXN0c1tpXSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYnVmZmVyW2ldID0gdGhpcy5nZXRQbGFjZWhvbGRlcihpKTtcbiAgICAgICAgICAgICAgICB3aGlsZSAocG9zKysgPCB0ZXN0Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBjID0gdGVzdC5jaGFyQXQocG9zIC0gMSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnRlc3RzW2ldLnRlc3QoYykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYnVmZmVyW2ldID0gYztcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RNYXRjaCA9IGk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocG9zID4gdGVzdC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhckJ1ZmZlcihpICsgMSwgdGhpcy5sZW4pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmJ1ZmZlcltpXSA9PT0gdGVzdC5jaGFyQXQocG9zKSkge1xuICAgICAgICAgICAgICAgICAgICBwb3MrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCBpIDwgdGhpcy5wYXJ0aWFsUG9zaXRpb24pe1xuICAgICAgICAgICAgICAgICAgICBsYXN0TWF0Y2ggPSBpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoYWxsb3cpIHtcbiAgICAgICAgICAgIHRoaXMud3JpdGVCdWZmZXIoKTtcbiAgICAgICAgfSBlbHNlIGlmIChsYXN0TWF0Y2ggKyAxIDwgdGhpcy5wYXJ0aWFsUG9zaXRpb24pIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmF1dG9DbGVhciB8fCB0aGlzLmJ1ZmZlci5qb2luKCcnKSA9PT0gdGhpcy5kZWZhdWx0QnVmZmVyKSB7XG4gICAgICAgICAgICAgICAgLy8gSW52YWxpZCB2YWx1ZS4gUmVtb3ZlIGl0IGFuZCByZXBsYWNlIGl0IHdpdGggdGhlXG4gICAgICAgICAgICAgICAgLy8gbWFzaywgd2hpY2ggaXMgdGhlIGRlZmF1bHQgYmVoYXZpb3IuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaW5wdXRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC52YWx1ZSkgdGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnZhbHVlID0gJyc7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhckJ1ZmZlcigwLCB0aGlzLmxlbik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIEludmFsaWQgdmFsdWUsIGJ1dCB3ZSBvcHQgdG8gc2hvdyB0aGUgdmFsdWUgdG8gdGhlXG4gICAgICAgICAgICAgICAgLy8gdXNlciBhbmQgYWxsb3cgdGhlbSB0byBjb3JyZWN0IHRoZWlyIG1pc3Rha2UuXG4gICAgICAgICAgICAgICAgdGhpcy53cml0ZUJ1ZmZlcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy53cml0ZUJ1ZmZlcigpO1xuICAgICAgICAgICAgdGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnZhbHVlID0gdGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnZhbHVlLnN1YnN0cmluZygwLCBsYXN0TWF0Y2ggKyAxKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKHRoaXMucGFydGlhbFBvc2l0aW9uID8gaSA6IHRoaXMuZmlyc3ROb25NYXNrUG9zKTtcbiAgICB9XG5cbiAgICBvbklucHV0Rm9jdXMoZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMucmVhZG9ubHkpe1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5mb2N1c2VkID0gdHJ1ZTtcblxuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5jYXJldFRpbWVvdXRJZCk7XG4gICAgICAgIGxldCBwb3M7XG5cbiAgICAgICAgdGhpcy5mb2N1c1RleHQgPSB0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQudmFsdWU7XG5cbiAgICAgICAgcG9zID0gdGhpcy5jaGVja1ZhbCgpO1xuXG4gICAgICAgIHRoaXMuY2FyZXRUaW1lb3V0SWQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQgIT09IHRoaXMuaW5wdXRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5vd25lckRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpe1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMud3JpdGVCdWZmZXIoKTtcbiAgICAgICAgICAgIGlmIChwb3MgPT0gdGhpcy5tYXNrLnJlcGxhY2UoXCI/XCIsXCJcIikubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYXJldCgwLCBwb3MpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhcmV0KHBvcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDEwKTtcblxuICAgICAgICB0aGlzLm9uRm9jdXMuZW1pdChldmVudCk7XG4gICAgfVxuXG4gICAgb25JbnB1dENoYW5nZShldmVudCkge1xuICAgICAgICBpZiAodGhpcy5hbmRyb2lkQ2hyb21lKVxuICAgICAgICAgICAgdGhpcy5oYW5kbGVBbmRyb2lkSW5wdXQoZXZlbnQpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLmhhbmRsZUlucHV0Q2hhbmdlKGV2ZW50KTtcblxuICAgICAgICB0aGlzLm9uSW5wdXQuZW1pdChldmVudCk7XG4gICAgfVxuXG4gICAgaGFuZGxlSW5wdXRDaGFuZ2UoZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMucmVhZG9ubHkpe1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB2YXIgcG9zID0gdGhpcy5jaGVja1ZhbCh0cnVlKTtcbiAgICAgICAgICAgIHRoaXMuY2FyZXQocG9zKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTW9kZWwoZXZlbnQpO1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNDb21wbGV0ZWQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMub25Db21wbGV0ZS5lbWl0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDApO1xuICAgIH1cblxuICAgIGdldFVubWFza2VkVmFsdWUoKSB7XG4gICAgICAgIGxldCB1bm1hc2tlZEJ1ZmZlciA9IFtdO1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5idWZmZXIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBjID0gdGhpcy5idWZmZXJbaV07XG4gICAgICAgICAgICBpZiAodGhpcy50ZXN0c1tpXSAmJiBjICE9IHRoaXMuZ2V0UGxhY2Vob2xkZXIoaSkpIHtcbiAgICAgICAgICAgICAgICB1bm1hc2tlZEJ1ZmZlci5wdXNoKGMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHVubWFza2VkQnVmZmVyLmpvaW4oJycpO1xuICAgIH1cblxuICAgIHVwZGF0ZU1vZGVsKGUpIHtcbiAgICAgICAgY29uc3QgdXBkYXRlZFZhbHVlID0gdGhpcy51bm1hc2sgPyB0aGlzLmdldFVubWFza2VkVmFsdWUoKSA6IGUudGFyZ2V0LnZhbHVlO1xuICAgICAgICBpZiAodXBkYXRlZFZhbHVlICE9PSBudWxsIHx8IHVwZGF0ZWRWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdXBkYXRlZFZhbHVlO1xuICAgICAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlKHRoaXMudmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlRmlsbGVkU3RhdGUoKSB7XG4gICAgICAgIHRoaXMuZmlsbGVkID0gdGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50ICYmIHRoaXMuaW5wdXRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC52YWx1ZSAhPSAnJztcbiAgICB9XG5cbiAgICBmb2N1cygpIHtcbiAgICAgICAgdGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG5cbiAgICB9XG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSxJbnB1dFRleHRNb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtJbnB1dE1hc2tdLFxuICAgIGRlY2xhcmF0aW9uczogW0lucHV0TWFza11cbn0pXG5leHBvcnQgY2xhc3MgSW5wdXRNYXNrTW9kdWxlIHsgfVxuIl19