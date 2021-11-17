/*
jQWidgets v13.1.0 (2021-Nov)
Copyright (c) 2011-2021 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

/// <reference path="jqwidgets.d.ts" />

import '../jqwidgets/jqxcore.js';
import '../jqwidgets/jqxbuttons.js';
import '../jqwidgets/jqxcomplexinput.js';

import { Component, Input, Output, EventEmitter, ElementRef, forwardRef, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const noop = () => { };
declare let JQXLite: any;

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => jqxComplexInputComponent),
    multi: true
}

@Component({
    selector: 'jqxComplexInput',
    template: '<div style="display: inline-flex;"><input [(ngModel)]="ngValue"><div></div></div>',
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class jqxComplexInputComponent implements ControlValueAccessor, OnChanges 
{
   @Input('decimalNotation') attrDecimalNotation: string;
   @Input('disabled') attrDisabled: boolean;
   @Input('placeHolder') attrPlaceHolder: string;
   @Input('roundedCorners') attrRoundedCorners: boolean;
   @Input('rtl') attrRtl: boolean;
   @Input('spinButtons') attrSpinButtons: boolean;
   @Input('spinButtonsStep') attrSpinButtonsStep: number;
   @Input('template') attrTemplate: string;
   @Input('theme') attrTheme: string;
   @Input('value') attrValue: string;
   @Input('width') attrWidth: string | number;
   @Input('height') attrHeight: string | number;

   @Input('auto-create') autoCreate: boolean = true;

   properties: string[] = ['decimalNotation','disabled','height','placeHolder','roundedCorners','rtl','spinButtons','spinButtonsStep','template','theme','value','width'];
   host: any;
   elementRef: ElementRef;
   widgetObject:  jqwidgets.jqxComplexInput;

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
                     areEqual = this.arraysEqual(this[attrName], this.host.jqxComplexInput(this.properties[i]));
                  }
                  if (areEqual) {
                     return false;
                  }

                  this.host.jqxComplexInput(this.properties[i], this[attrName]);
                  continue;
               }

               if (this[attrName] !== this.host.jqxComplexInput(this.properties[i])) {
                  this.host.jqxComplexInput(this.properties[i], this[attrName]); 
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

      this.__wireEvents__();
      this.widgetObject = jqwidgets.createInstance(this.host, 'jqxComplexInput', options);

      setTimeout(_=> {
         let valueWithWS = 'JQXLite{options.value}';
         this.host.jqxComplexInput({ value: valueWithWS });
      });
   }

   createWidget(options?: any): void {
        this.createComponent(options);
   }

   __updateRect__() : void {
      if(this.host) this.host.css({ width: this.attrWidth, height: this.attrHeight });
   }

   get ngValue(): any {
       if (this.widgetObject) {
           const value = this.host.val();
           return value;
       }
       return '';
   }

   set ngValue(value: any) {
       if (this.widgetObject) {
           this.onChangeCallback(value);
       }
   }

   writeValue(value: any): void {
       if(this.widgetObject) {
           this.onChangeCallback(this.host.val());
           this.host.jqxComplexInput('val', value);
       }
       if (this.host && (value === null || value === undefined)) {
               this.host.jqxComplexInput('val', '');
       }
   }

   registerOnChange(fn: any): void {
       this.onChangeCallback = fn;
   }

   registerOnTouched(fn: any): void {
       this.onTouchedCallback = fn;
   }

   setOptions(options: any) : void {
      this.host.jqxComplexInput('setOptions', options);
   }

   // jqxComplexInputComponent properties
   decimalNotation(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxComplexInput('decimalNotation', arg);
      } else {
          return this.host.jqxComplexInput('decimalNotation');
      }
   }

   disabled(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxComplexInput('disabled', arg);
      } else {
          return this.host.jqxComplexInput('disabled');
      }
   }

   height(arg?: string | number): string | number {
      if (arg !== undefined) {
          this.host.jqxComplexInput('height', arg);
      } else {
          return this.host.jqxComplexInput('height');
      }
   }

   placeHolder(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxComplexInput('placeHolder', arg);
      } else {
          return this.host.jqxComplexInput('placeHolder');
      }
   }

   roundedCorners(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxComplexInput('roundedCorners', arg);
      } else {
          return this.host.jqxComplexInput('roundedCorners');
      }
   }

   rtl(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxComplexInput('rtl', arg);
      } else {
          return this.host.jqxComplexInput('rtl');
      }
   }

   spinButtons(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxComplexInput('spinButtons', arg);
      } else {
          return this.host.jqxComplexInput('spinButtons');
      }
   }

   spinButtonsStep(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxComplexInput('spinButtonsStep', arg);
      } else {
          return this.host.jqxComplexInput('spinButtonsStep');
      }
   }

   template(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxComplexInput('template', arg);
      } else {
          return this.host.jqxComplexInput('template');
      }
   }

   theme(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxComplexInput('theme', arg);
      } else {
          return this.host.jqxComplexInput('theme');
      }
   }

   value(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxComplexInput('value', arg);
      } else {
          return this.host.jqxComplexInput('value');
      }
   }

   width(arg?: string | number): string | number {
      if (arg !== undefined) {
          this.host.jqxComplexInput('width', arg);
      } else {
          return this.host.jqxComplexInput('width');
      }
   }


   // jqxComplexInputComponent functions
   destroy(): void {
      this.host.jqxComplexInput('destroy');
   }

   getDecimalNotation(part: string, decimalNotation: string): string {
      return this.host.jqxComplexInput('getDecimalNotation', part, decimalNotation);
   }

   getReal(complexnumber?: number): number {
      return this.host.jqxComplexInput('getReal', complexnumber);
   }

   getImaginary(complexnumber?: number): number {
      return this.host.jqxComplexInput('getImaginary', complexnumber);
   }

   render(): void {
      this.host.jqxComplexInput('render');
   }

   refresh(): void {
      this.host.jqxComplexInput('refresh');
   }

   val(value?: any): any {
      if (value !== undefined) {
         return this.host.jqxComplexInput('val', value);
      } else {
         return this.host.jqxComplexInput('val');
      }
   };


   // jqxComplexInputComponent events
   @Output() onChange = new EventEmitter();

   __wireEvents__(): void {
      this.host.on('change', (eventData: any) => { this.onChange.emit(eventData); if (eventData.args) this.onChangeCallback(eventData.args.value); });
   }

} //jqxComplexInputComponent


