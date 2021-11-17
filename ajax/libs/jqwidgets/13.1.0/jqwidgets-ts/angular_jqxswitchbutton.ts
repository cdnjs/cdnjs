/*
jQWidgets v13.1.0 (2021-Nov)
Copyright (c) 2011-2021 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

/// <reference path="jqwidgets.d.ts" />

import '../jqwidgets/jqxcore.js';
import '../jqwidgets/jqxswitchbutton.js';

import { Component, Input, Output, EventEmitter, ElementRef, forwardRef, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const noop = () => { };
declare let JQXLite: any;

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => jqxSwitchButtonComponent),
    multi: true
}

@Component({
    selector: 'jqxSwitchButton',
    template: '<div><ng-content></ng-content></div>',
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class jqxSwitchButtonComponent implements ControlValueAccessor, OnChanges 
{
   @Input('checked') attrChecked: boolean;
   @Input('disabled') attrDisabled: boolean;
   @Input('orientation') attrOrientation: string;
   @Input('onLabel') attrOnLabel: string;
   @Input('offLabel') attrOffLabel: string;
   @Input('thumbSize') attrThumbSize: string;
   @Input('rtl') attrRtl: boolean;
   @Input('width') attrWidth: string | number;
   @Input('height') attrHeight: string | number;

   @Input('auto-create') autoCreate: boolean = true;

   properties: string[] = ['checked','disabled','height','orientation','onLabel','offLabel','thumbSize','rtl','width'];
   host: any;
   elementRef: ElementRef;
   widgetObject:  jqwidgets.jqxSwitchButton;

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
                     areEqual = this.arraysEqual(this[attrName], this.host.jqxSwitchButton(this.properties[i]));
                  }
                  if (areEqual) {
                     return false;
                  }

                  this.host.jqxSwitchButton(this.properties[i], this[attrName]);
                  continue;
               }

               if (this[attrName] !== this.host.jqxSwitchButton(this.properties[i])) {
                  this.host.jqxSwitchButton(this.properties[i], this[attrName]); 
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
      this.widgetObject = jqwidgets.createInstance(this.host, 'jqxSwitchButton', options);

   }

   createWidget(options?: any): void {
        this.createComponent(options);
   }

   __updateRect__() : void {
      if(this.host) this.host.css({ width: this.attrWidth, height: this.attrHeight });
   }

   writeValue(value: any): void {
       if(this.widgetObject) {
           this.onChangeCallback(this.host.val());
       }
       if (this.host && (value === null || value === undefined)) {
               this.host.jqxSwitchButton('val', '');
       }
   }

   registerOnChange(fn: any): void {
       this.onChangeCallback = fn;
   }

   registerOnTouched(fn: any): void {
       this.onTouchedCallback = fn;
   }

   setOptions(options: any) : void {
      this.host.jqxSwitchButton('setOptions', options);
   }

   // jqxSwitchButtonComponent properties
   checked(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxSwitchButton('checked', arg);
      } else {
          return this.host.jqxSwitchButton('checked');
      }
   }

   disabled(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxSwitchButton('disabled', arg);
      } else {
          return this.host.jqxSwitchButton('disabled');
      }
   }

   height(arg?: string | number): string | number {
      if (arg !== undefined) {
          this.host.jqxSwitchButton('height', arg);
      } else {
          return this.host.jqxSwitchButton('height');
      }
   }

   orientation(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxSwitchButton('orientation', arg);
      } else {
          return this.host.jqxSwitchButton('orientation');
      }
   }

   onLabel(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxSwitchButton('onLabel', arg);
      } else {
          return this.host.jqxSwitchButton('onLabel');
      }
   }

   offLabel(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxSwitchButton('offLabel', arg);
      } else {
          return this.host.jqxSwitchButton('offLabel');
      }
   }

   thumbSize(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxSwitchButton('thumbSize', arg);
      } else {
          return this.host.jqxSwitchButton('thumbSize');
      }
   }

   rtl(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxSwitchButton('rtl', arg);
      } else {
          return this.host.jqxSwitchButton('rtl');
      }
   }

   width(arg?: string | number): string | number {
      if (arg !== undefined) {
          this.host.jqxSwitchButton('width', arg);
      } else {
          return this.host.jqxSwitchButton('width');
      }
   }


   // jqxSwitchButtonComponent functions
   check(): void {
      this.host.jqxSwitchButton('check');
   }

   disable(): void {
      this.host.jqxSwitchButton('disable');
   }

   enable(): void {
      this.host.jqxSwitchButton('enable');
   }

   toggle(): void {
      this.host.jqxSwitchButton('toggle');
   }

   uncheck(): void {
      this.host.jqxSwitchButton('uncheck');
   }

   val(value?: boolean): any {
      if (value !== undefined) {
         return this.host.jqxSwitchButton('val', value);
      } else {
         return this.host.jqxSwitchButton('val');
      }
   };


   // jqxSwitchButtonComponent events
   @Output() onChecked = new EventEmitter();
   @Output() onChange = new EventEmitter();
   @Output() onUnchecked = new EventEmitter();

   __wireEvents__(): void {
      this.host.on('checked', (eventData: any) => { this.onChecked.emit(eventData); });
      this.host.on('change', (eventData: any) => { this.onChange.emit(eventData); this.onChangeCallback(this.host.val()); });
      this.host.on('unchecked', (eventData: any) => { this.onUnchecked.emit(eventData); });
   }

} //jqxSwitchButtonComponent


