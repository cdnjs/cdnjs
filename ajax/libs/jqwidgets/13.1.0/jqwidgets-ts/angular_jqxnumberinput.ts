/*
jQWidgets v13.1.0 (2021-Nov)
Copyright (c) 2011-2021 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

/// <reference path="jqwidgets.d.ts" />

import '../jqwidgets/jqxcore.js';
import '../jqwidgets/jqxbuttons.js';
import '../jqwidgets/jqxnumberinput.js';

import { Component, Input, Output, EventEmitter, ElementRef, forwardRef, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const noop = () => { };
declare let JQXLite: any;

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => jqxNumberInputComponent),
    multi: true
}

@Component({
    selector: 'jqxNumberInput',
    template: '<input>',
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class jqxNumberInputComponent implements ControlValueAccessor, OnChanges 
{
   @Input('allowNull') attrAllowNull: boolean;
   @Input('decimal') attrDecimal: number | string;
   @Input('disabled') attrDisabled: boolean;
   @Input('decimalDigits') attrDecimalDigits: number | string;
   @Input('decimalSeparator') attrDecimalSeparator: number | string;
   @Input('digits') attrDigits: number | string;
   @Input('groupSeparator') attrGroupSeparator: string;
   @Input('groupSize') attrGroupSize: number | string;
   @Input('inputMode') attrInputMode: string;
   @Input('min') attrMin: number | string;
   @Input('max') attrMax: number | string;
   @Input('negativeSymbol') attrNegativeSymbol: string;
   @Input('placeHolder') attrPlaceHolder: number | string;
   @Input('promptChar') attrPromptChar: string;
   @Input('rtl') attrRtl: boolean;
   @Input('readOnly') attrReadOnly: boolean;
   @Input('spinMode') attrSpinMode: string;
   @Input('spinButtons') attrSpinButtons: boolean;
   @Input('spinButtonsWidth') attrSpinButtonsWidth: number;
   @Input('spinButtonsStep') attrSpinButtonsStep: number | string;
   @Input('symbol') attrSymbol: string;
   @Input('symbolPosition') attrSymbolPosition: string;
   @Input('textAlign') attrTextAlign: string;
   @Input('template') attrTemplate: string;
   @Input('theme') attrTheme: string;
   @Input('value') attrValue: number | string;
   @Input('width') attrWidth: string | number;
   @Input('height') attrHeight: string | number;

   @Input('auto-create') autoCreate: boolean = true;

   properties: string[] = ['allowNull','decimal','disabled','decimalDigits','decimalSeparator','digits','groupSeparator','groupSize','height','inputMode','min','max','negativeSymbol','placeHolder','promptChar','rtl','readOnly','spinMode','spinButtons','spinButtonsWidth','spinButtonsStep','symbol','symbolPosition','textAlign','template','theme','value','width'];
   host: any;
   elementRef: ElementRef;
   widgetObject:  jqwidgets.jqxNumberInput;

   private onTouchedCallback: () => void = noop;
   private onChangeCallback: (_: any) => void = noop;

   constructor(containerElement: ElementRef) {
      this.elementRef = containerElement;
   }

   ngOnInit() {
      if (this.autoCreate) {
         this.createComponent(); 
      }
   }; 

   ngOnChanges(changes: SimpleChanges) {
      if (this.host) {
         for (let i = 0; i < this.properties.length; i++) {
            let attrName = 'attr' + this.properties[i].substring(0, 1).toUpperCase() + this.properties[i].substring(1);
            let areEqual: boolean = false;

            if (this[attrName] !== undefined) {
               if (typeof this[attrName] === 'object') {
                  if (this[attrName] instanceof Array) {
                     areEqual = this.arraysEqual(this[attrName], this.host.jqxNumberInput(this.properties[i]));
                  }
                  if (areEqual) {
                     return false;
                  }

                  this.host.jqxNumberInput(this.properties[i], this[attrName]);
                  continue;
               }

               if (this[attrName] !== this.host.jqxNumberInput(this.properties[i])) {
                  this.host.jqxNumberInput(this.properties[i], this[attrName]); 
               }
            }
         }
      }
   }

   arraysEqual(attrValue: any, hostValue: any): boolean {
      if ((attrValue && !hostValue) || (!attrValue && hostValue)) {
         return false;
      }
      if (attrValue.length != hostValue.length) {
         return false;
      }
      for (let i = 0; i < attrValue.length; i++) {
         if (attrValue[i] !== hostValue[i]) {
            return false;
         }
      }
      return true;
   }

   manageAttributes(): any {
      let options = {};
      for (let i = 0; i < this.properties.length; i++) {
         let attrName = 'attr' + this.properties[i].substring(0, 1).toUpperCase() + this.properties[i].substring(1);
         if (this[attrName] !== undefined) {
            options[this.properties[i]] = this[attrName];
         }
      }
      return options;
   }

   moveClasses(parentEl: HTMLElement, childEl: HTMLElement): void {
      let classes: any = parentEl.classList;
      if (classes.length > 0) {
        childEl.classList.add(...classes);
      }
      parentEl.className = '';
   }

   moveStyles(parentEl: HTMLElement, childEl: HTMLElement): void {
      let style = parentEl.style.cssText;
      childEl.style.cssText = style
      parentEl.style.cssText = '';
   }

   createComponent(options?: any): void {
      if (this.host) {
         return;
      }
      if (options) {
         JQXLite.extend(options, this.manageAttributes());
      }
      else {
        options = this.manageAttributes();
      }
      this.host = JQXLite(this.elementRef.nativeElement.firstChild);

      this.moveClasses(this.elementRef.nativeElement, this.host[0]);
      this.moveStyles(this.elementRef.nativeElement, this.host[0]);

      this.widgetObject = jqwidgets.createInstance(this.host, 'jqxNumberInput', options);
      this.host = this.widgetObject['host'];
      this.__wireEvents__();

   }

   createWidget(options?: any): void {
        this.createComponent(options);
   }

   __updateRect__() : void {
      if(this.host) this.host.css({ width: this.attrWidth, height: this.attrHeight });
   }

   writeValue(value: any): void {
       if(this.widgetObject) {
           this.host.jqxNumberInput('val', value);
       }
       if (this.host && (value === null || value === undefined)) {
               this.host.jqxNumberInput('val', '');
       }
   }

   registerOnChange(fn: any): void {
       this.onChangeCallback = fn;
   }

   registerOnTouched(fn: any): void {
       this.onTouchedCallback = fn;
   }

   setOptions(options: any) : void {
      this.host.jqxNumberInput('setOptions', options);
   }

   // jqxNumberInputComponent properties
   allowNull(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxNumberInput('allowNull', arg);
      } else {
          return this.host.jqxNumberInput('allowNull');
      }
   }

   decimal(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxNumberInput('decimal', arg);
      } else {
          return this.host.jqxNumberInput('decimal');
      }
   }

   disabled(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxNumberInput('disabled', arg);
      } else {
          return this.host.jqxNumberInput('disabled');
      }
   }

   decimalDigits(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxNumberInput('decimalDigits', arg);
      } else {
          return this.host.jqxNumberInput('decimalDigits');
      }
   }

   decimalSeparator(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxNumberInput('decimalSeparator', arg);
      } else {
          return this.host.jqxNumberInput('decimalSeparator');
      }
   }

   digits(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxNumberInput('digits', arg);
      } else {
          return this.host.jqxNumberInput('digits');
      }
   }

   groupSeparator(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxNumberInput('groupSeparator', arg);
      } else {
          return this.host.jqxNumberInput('groupSeparator');
      }
   }

   groupSize(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxNumberInput('groupSize', arg);
      } else {
          return this.host.jqxNumberInput('groupSize');
      }
   }

   height(arg?: string | number): string | number {
      if (arg !== undefined) {
          this.host.jqxNumberInput('height', arg);
      } else {
          return this.host.jqxNumberInput('height');
      }
   }

   inputMode(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxNumberInput('inputMode', arg);
      } else {
          return this.host.jqxNumberInput('inputMode');
      }
   }

   min(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxNumberInput('min', arg);
      } else {
          return this.host.jqxNumberInput('min');
      }
   }

   max(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxNumberInput('max', arg);
      } else {
          return this.host.jqxNumberInput('max');
      }
   }

   negativeSymbol(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxNumberInput('negativeSymbol', arg);
      } else {
          return this.host.jqxNumberInput('negativeSymbol');
      }
   }

   placeHolder(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxNumberInput('placeHolder', arg);
      } else {
          return this.host.jqxNumberInput('placeHolder');
      }
   }

   promptChar(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxNumberInput('promptChar', arg);
      } else {
          return this.host.jqxNumberInput('promptChar');
      }
   }

   rtl(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxNumberInput('rtl', arg);
      } else {
          return this.host.jqxNumberInput('rtl');
      }
   }

   readOnly(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxNumberInput('readOnly', arg);
      } else {
          return this.host.jqxNumberInput('readOnly');
      }
   }

   spinMode(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxNumberInput('spinMode', arg);
      } else {
          return this.host.jqxNumberInput('spinMode');
      }
   }

   spinButtons(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxNumberInput('spinButtons', arg);
      } else {
          return this.host.jqxNumberInput('spinButtons');
      }
   }

   spinButtonsWidth(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxNumberInput('spinButtonsWidth', arg);
      } else {
          return this.host.jqxNumberInput('spinButtonsWidth');
      }
   }

   spinButtonsStep(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxNumberInput('spinButtonsStep', arg);
      } else {
          return this.host.jqxNumberInput('spinButtonsStep');
      }
   }

   symbol(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxNumberInput('symbol', arg);
      } else {
          return this.host.jqxNumberInput('symbol');
      }
   }

   symbolPosition(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxNumberInput('symbolPosition', arg);
      } else {
          return this.host.jqxNumberInput('symbolPosition');
      }
   }

   textAlign(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxNumberInput('textAlign', arg);
      } else {
          return this.host.jqxNumberInput('textAlign');
      }
   }

   template(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxNumberInput('template', arg);
      } else {
          return this.host.jqxNumberInput('template');
      }
   }

   theme(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxNumberInput('theme', arg);
      } else {
          return this.host.jqxNumberInput('theme');
      }
   }

   value(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxNumberInput('value', arg);
      } else {
          return this.host.jqxNumberInput('value');
      }
   }

   width(arg?: string | number): string | number {
      if (arg !== undefined) {
          this.host.jqxNumberInput('width', arg);
      } else {
          return this.host.jqxNumberInput('width');
      }
   }


   // jqxNumberInputComponent functions
   clear(): void {
      this.host.jqxNumberInput('clear');
   }

   destroy(): void {
      this.host.jqxNumberInput('destroy');
   }

   focus(): void {
      this.host.jqxNumberInput('focus');
   }

   getDecimal(): number {
      return this.host.jqxNumberInput('getDecimal');
   }

   setDecimal(index: number | string): void {
      this.host.jqxNumberInput('setDecimal', index);
   }

   val(value?: number | string): any {
      if (value !== undefined) {
         return this.host.jqxNumberInput('val', value);
      } else {
         return this.host.jqxNumberInput('val');
      }
   };


   // jqxNumberInputComponent events
   @Output() onChange = new EventEmitter();
   @Output() onTextchanged = new EventEmitter();
   @Output() onValueChanged = new EventEmitter();

   __wireEvents__(): void {
      this.host.on('change', (eventData: any) => { this.onChange.emit(eventData); if (eventData.args) this.onChangeCallback(eventData.args.value); });
      this.host.on('textchanged', (eventData: any) => { this.onTextchanged.emit(eventData); if (eventData.args) this.onChangeCallback(eventData.args.value); });
      this.host.on('valueChanged', (eventData: any) => { this.onValueChanged.emit(eventData); if (eventData.args) this.onChangeCallback(eventData.args.value); });
   }

} //jqxNumberInputComponent


