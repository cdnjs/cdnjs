/*
jQWidgets v13.1.0 (2021-Nov)
Copyright (c) 2011-2021 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

/// <reference path="jqwidgets.d.ts" />

import '../jqwidgets/jqxcore.js';
import '../jqwidgets/jqxtooltip.js';
import '../jqwidgets/jqxpasswordinput.js';

import { Component, Input, Output, EventEmitter, ElementRef, forwardRef, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const noop = () => { };
declare let JQXLite: any;

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => jqxPasswordInputComponent),
    multi: true
}

@Component({
    selector: 'jqxPasswordInput',
    template: '<input type="password" [(ngModel)]="ngValue">',
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class jqxPasswordInputComponent implements ControlValueAccessor, OnChanges 
{
   @Input('disabled') attrDisabled: boolean;
   @Input('localization') attrLocalization: jqwidgets.PasswordInputLocalization;
   @Input('maxLength') attrMaxLength: number | string;
   @Input('placeHolder') attrPlaceHolder: number | string;
   @Input('passwordStrength') attrPasswordStrength: (password:jqwidgets.PasswordInputPasswordStrength['password'], characters:jqwidgets.PasswordInputPasswordStrength['characters'], defaultStrength:jqwidgets.PasswordInputPasswordStrength['defaultStrength']) => string;
   @Input('rtl') attrRtl: boolean;
   @Input('strengthColors') attrStrengthColors: jqwidgets.PasswordInputStrengthColors;
   @Input('showStrength') attrShowStrength: boolean;
   @Input('showStrengthPosition') attrShowStrengthPosition: string;
   @Input('strengthTypeRenderer') attrStrengthTypeRenderer: (password:jqwidgets.PasswordInputStrengthTypeRenderer['password'], characters:jqwidgets.PasswordInputStrengthTypeRenderer['characters'], defaultStrength:jqwidgets.PasswordInputStrengthTypeRenderer['defaultStrength']) => string;
   @Input('showPasswordIcon') attrShowPasswordIcon: boolean;
   @Input('theme') attrTheme: string;
   @Input('width') attrWidth: string | number;
   @Input('height') attrHeight: string | number;

   @Input('auto-create') autoCreate: boolean = true;

   properties: string[] = ['disabled','height','localization','maxLength','placeHolder','passwordStrength','rtl','strengthColors','showStrength','showStrengthPosition','strengthTypeRenderer','showPasswordIcon','theme','width'];
   host: any;
   elementRef: ElementRef;
   widgetObject:  jqwidgets.jqxPasswordInput;

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
                     areEqual = this.arraysEqual(this[attrName], this.host.jqxPasswordInput(this.properties[i]));
                  }
                  if (areEqual) {
                     return false;
                  }

                  this.host.jqxPasswordInput(this.properties[i], this[attrName]);
                  continue;
               }

               if (this[attrName] !== this.host.jqxPasswordInput(this.properties[i])) {
                  this.host.jqxPasswordInput(this.properties[i], this[attrName]); 
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
      this.widgetObject = jqwidgets.createInstance(this.host, 'jqxPasswordInput', options);

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
           this.host.jqxPasswordInput('val', value);
       }
       if (this.host && (value === null || value === undefined)) {
               this.host.jqxPasswordInput('val', '');
       }
   }

   registerOnChange(fn: any): void {
       this.onChangeCallback = fn;
   }

   registerOnTouched(fn: any): void {
       this.onTouchedCallback = fn;
   }

   setOptions(options: any) : void {
      this.host.jqxPasswordInput('setOptions', options);
   }

   // jqxPasswordInputComponent properties
   disabled(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxPasswordInput('disabled', arg);
      } else {
          return this.host.jqxPasswordInput('disabled');
      }
   }

   height(arg?: string | number): string | number {
      if (arg !== undefined) {
          this.host.jqxPasswordInput('height', arg);
      } else {
          return this.host.jqxPasswordInput('height');
      }
   }

   localization(arg?: jqwidgets.PasswordInputLocalization): jqwidgets.PasswordInputLocalization {
      if (arg !== undefined) {
          this.host.jqxPasswordInput('localization', arg);
      } else {
          return this.host.jqxPasswordInput('localization');
      }
   }

   maxLength(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxPasswordInput('maxLength', arg);
      } else {
          return this.host.jqxPasswordInput('maxLength');
      }
   }

   placeHolder(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxPasswordInput('placeHolder', arg);
      } else {
          return this.host.jqxPasswordInput('placeHolder');
      }
   }

   passwordStrength(arg?: (password:jqwidgets.PasswordInputPasswordStrength['password'], characters:jqwidgets.PasswordInputPasswordStrength['characters'], defaultStrength:jqwidgets.PasswordInputPasswordStrength['defaultStrength']) => string): (password:jqwidgets.PasswordInputPasswordStrength['password'], characters:jqwidgets.PasswordInputPasswordStrength['characters'], defaultStrength:jqwidgets.PasswordInputPasswordStrength['defaultStrength']) => string {
      if (arg !== undefined) {
          this.host.jqxPasswordInput('passwordStrength', arg);
      } else {
          return this.host.jqxPasswordInput('passwordStrength');
      }
   }

   rtl(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxPasswordInput('rtl', arg);
      } else {
          return this.host.jqxPasswordInput('rtl');
      }
   }

   strengthColors(arg?: jqwidgets.PasswordInputStrengthColors): jqwidgets.PasswordInputStrengthColors {
      if (arg !== undefined) {
          this.host.jqxPasswordInput('strengthColors', arg);
      } else {
          return this.host.jqxPasswordInput('strengthColors');
      }
   }

   showStrength(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxPasswordInput('showStrength', arg);
      } else {
          return this.host.jqxPasswordInput('showStrength');
      }
   }

   showStrengthPosition(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxPasswordInput('showStrengthPosition', arg);
      } else {
          return this.host.jqxPasswordInput('showStrengthPosition');
      }
   }

   strengthTypeRenderer(arg?: (password:jqwidgets.PasswordInputStrengthTypeRenderer['password'], characters:jqwidgets.PasswordInputStrengthTypeRenderer['characters'], defaultStrength:jqwidgets.PasswordInputStrengthTypeRenderer['defaultStrength']) => string): (password:jqwidgets.PasswordInputStrengthTypeRenderer['password'], characters:jqwidgets.PasswordInputStrengthTypeRenderer['characters'], defaultStrength:jqwidgets.PasswordInputStrengthTypeRenderer['defaultStrength']) => string {
      if (arg !== undefined) {
          this.host.jqxPasswordInput('strengthTypeRenderer', arg);
      } else {
          return this.host.jqxPasswordInput('strengthTypeRenderer');
      }
   }

   showPasswordIcon(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxPasswordInput('showPasswordIcon', arg);
      } else {
          return this.host.jqxPasswordInput('showPasswordIcon');
      }
   }

   theme(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxPasswordInput('theme', arg);
      } else {
          return this.host.jqxPasswordInput('theme');
      }
   }

   width(arg?: string | number): string | number {
      if (arg !== undefined) {
          this.host.jqxPasswordInput('width', arg);
      } else {
          return this.host.jqxPasswordInput('width');
      }
   }


   // jqxPasswordInputComponent functions
   render(): void {
      this.host.jqxPasswordInput('render');
   }

   refresh(): void {
      this.host.jqxPasswordInput('refresh');
   }

   val(value?: string): any {
      if (value !== undefined) {
         return this.host.jqxPasswordInput('val', value);
      } else {
         return this.host.jqxPasswordInput('val');
      }
   };


   // jqxPasswordInputComponent events
   @Output() onChange = new EventEmitter();

   __wireEvents__(): void {
      this.host.on('change', (eventData: any) => { this.onChange.emit(eventData); });
   }

} //jqxPasswordInputComponent


