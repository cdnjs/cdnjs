/*
jQWidgets v13.1.0 (2021-Nov)
Copyright (c) 2011-2021 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

/// <reference path="jqwidgets.d.ts" />

import '../jqwidgets/jqxcore.js';
import '../jqwidgets/jqxmaskedinput.js';

import { Component, Input, Output, EventEmitter, ElementRef, forwardRef, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const noop = () => { };
declare let JQXLite: any;

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => jqxMaskedInputComponent),
    multi: true
}

@Component({
    selector: 'jqxMaskedInput',
    template: '<input>',
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class jqxMaskedInputComponent implements ControlValueAccessor, OnChanges 
{
   @Input('disabled') attrDisabled: boolean;
   @Input('mask') attrMask: string;
   @Input('promptChar') attrPromptChar: number | string;
   @Input('readOnly') attrReadOnly: boolean;
   @Input('rtl') attrRtl: boolean;
   @Input('theme') attrTheme: string;
   @Input('textAlign') attrTextAlign: string;
   @Input('value') attrValue: number | string;
   @Input('width') attrWidth: string | number;
   @Input('height') attrHeight: string | number;

   @Input('auto-create') autoCreate: boolean = true;

   properties: string[] = ['disabled','height','mask','promptChar','readOnly','rtl','theme','textAlign','value','width'];
   host: any;
   elementRef: ElementRef;
   widgetObject:  jqwidgets.jqxMaskedInput;

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
                     areEqual = this.arraysEqual(this[attrName], this.host.jqxMaskedInput(this.properties[i]));
                  }
                  if (areEqual) {
                     return false;
                  }

                  this.host.jqxMaskedInput(this.properties[i], this[attrName]);
                  continue;
               }

               if (this[attrName] !== this.host.jqxMaskedInput(this.properties[i])) {
                  this.host.jqxMaskedInput(this.properties[i], this[attrName]); 
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
      this.widgetObject = jqwidgets.createInstance(this.host, 'jqxMaskedInput', options);

   }

   createWidget(options?: any): void {
        this.createComponent(options);
   }

   __updateRect__() : void {
      if(this.host) this.host.css({ width: this.attrWidth, height: this.attrHeight });
   }

   writeValue(value: any): void {
       if(this.widgetObject) {
           this.host.jqxMaskedInput('val', value);
       }
       if (this.host && (value === null || value === undefined)) {
               this.host.jqxMaskedInput('val', '');
       }
   }

   registerOnChange(fn: any): void {
       this.onChangeCallback = fn;
   }

   registerOnTouched(fn: any): void {
       this.onTouchedCallback = fn;
   }

   setOptions(options: any) : void {
      this.host.jqxMaskedInput('setOptions', options);
   }

   // jqxMaskedInputComponent properties
   disabled(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxMaskedInput('disabled', arg);
      } else {
          return this.host.jqxMaskedInput('disabled');
      }
   }

   height(arg?: string | number): string | number {
      if (arg !== undefined) {
          this.host.jqxMaskedInput('height', arg);
      } else {
          return this.host.jqxMaskedInput('height');
      }
   }

   mask(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxMaskedInput('mask', arg);
      } else {
          return this.host.jqxMaskedInput('mask');
      }
   }

   promptChar(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxMaskedInput('promptChar', arg);
      } else {
          return this.host.jqxMaskedInput('promptChar');
      }
   }

   readOnly(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxMaskedInput('readOnly', arg);
      } else {
          return this.host.jqxMaskedInput('readOnly');
      }
   }

   rtl(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxMaskedInput('rtl', arg);
      } else {
          return this.host.jqxMaskedInput('rtl');
      }
   }

   theme(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxMaskedInput('theme', arg);
      } else {
          return this.host.jqxMaskedInput('theme');
      }
   }

   textAlign(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxMaskedInput('textAlign', arg);
      } else {
          return this.host.jqxMaskedInput('textAlign');
      }
   }

   value(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxMaskedInput('value', arg);
      } else {
          return this.host.jqxMaskedInput('value');
      }
   }

   width(arg?: string | number): string | number {
      if (arg !== undefined) {
          this.host.jqxMaskedInput('width', arg);
      } else {
          return this.host.jqxMaskedInput('width');
      }
   }


   // jqxMaskedInputComponent functions
   clear(): void {
      this.host.jqxMaskedInput('clear');
   }

   destroy(): void {
      this.host.jqxMaskedInput('destroy');
   }

   focus(): void {
      this.host.jqxMaskedInput('focus');
   }

   val(value?: number | string): any {
      if (value !== undefined) {
         return this.host.jqxMaskedInput('val', value);
      } else {
         return this.host.jqxMaskedInput('val');
      }
   };


   // jqxMaskedInputComponent events
   @Output() onChange = new EventEmitter();
   @Output() onValueChanged = new EventEmitter();

   __wireEvents__(): void {
      this.host.parent().on('change', (eventData: any) => { this.onChange.emit(eventData); this.onChangeCallback(this.host.val()); });
      this.host.parent().on('valueChanged', (eventData: any) => { this.onValueChanged.emit(eventData); this.onChangeCallback(this.host.val()); });
   }

} //jqxMaskedInputComponent


