/*
jQWidgets v16.0.0 (2023-Mar)
Copyright (c) 2011-2023 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

/// <reference path="jqwidgets.d.ts" />

import '../jqwidgets/jqxcore.js';
import '../jqwidgets/jqxradiobutton.js';
import '../jqwidgets/jqxradiobuttongroup.js';

import { Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
declare let JQXLite: any;

@Component({
    selector: 'jqxRadioButtonGroup',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxRadioButtonGroupComponent implements OnChanges
{
   @Input('change') attrChange: (item?: any) => void;
   @Input('disabled') attrDisabled: boolean;
   @Input('items') attrItems: [];
   @Input('value') attrValue: [];
   @Input('layout') attrLayout: string;
   @Input('labelPosition') attrLabelPosition: string;
   @Input('rtl') attrRtl: boolean;
   @Input('theme') attrTheme: string;
   @Input('width') attrWidth: string | number;
   @Input('height') attrHeight: string | number;

   @Input('auto-create') autoCreate: boolean = true;

   properties: string[] = ['change','disabled','items','value','layout','labelPosition','rtl','theme'];
   host: any;
   elementRef: ElementRef;
   widgetObject:  jqwidgets.jqxRadioButtonGroup;

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
                     areEqual = this.arraysEqual(this[attrName], this.host.jqxRadioButtonGroup(this.properties[i]));
                  }
                  if (areEqual) {
                     return false;
                  }

                  this.host.jqxRadioButtonGroup(this.properties[i], this[attrName]);
                  continue;
               }

               if (this[attrName] !== this.host.jqxRadioButtonGroup(this.properties[i])) {
                  this.host.jqxRadioButtonGroup(this.properties[i], this[attrName]); 
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
      this.widgetObject = jqwidgets.createInstance(this.host, 'jqxRadioButtonGroup', options);

   }

   createWidget(options?: any): void {
        this.createComponent(options);
   }

   __updateRect__() : void {
      if(this.host) this.host.css({ width: this.attrWidth, height: this.attrHeight });
   }

   setOptions(options: any) : void {
      this.host.jqxRadioButtonGroup('setOptions', options);
   }

   // jqxRadioButtonGroupComponent properties
   change(arg?: (item?: any) => void): (item?: any) => void {
      if (arg !== undefined) {
          this.host.jqxRadioButtonGroup('change', arg);
      } else {
          return this.host.jqxRadioButtonGroup('change');
      }
   }

   disabled(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxRadioButtonGroup('disabled', arg);
      } else {
          return this.host.jqxRadioButtonGroup('disabled');
      }
   }

   items(arg?: undefined): undefined {
      if (arg !== undefined) {
          this.host.jqxRadioButtonGroup('items', arg);
      } else {
          return this.host.jqxRadioButtonGroup('items');
      }
   }

   value(arg?: undefined): undefined {
      if (arg !== undefined) {
          this.host.jqxRadioButtonGroup('value', arg);
      } else {
          return this.host.jqxRadioButtonGroup('value');
      }
   }

   layout(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxRadioButtonGroup('layout', arg);
      } else {
          return this.host.jqxRadioButtonGroup('layout');
      }
   }

   labelPosition(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxRadioButtonGroup('labelPosition', arg);
      } else {
          return this.host.jqxRadioButtonGroup('labelPosition');
      }
   }

   rtl(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxRadioButtonGroup('rtl', arg);
      } else {
          return this.host.jqxRadioButtonGroup('rtl');
      }
   }

   theme(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxRadioButtonGroup('theme', arg);
      } else {
          return this.host.jqxRadioButtonGroup('theme');
      }
   }


   // jqxRadioButtonGroupComponent functions
   getValue(): undefined {
      return this.host.jqxRadioButtonGroup('getValue');
   }

   getValueAt(index: number): string {
      return this.host.jqxRadioButtonGroup('getValueAt', index);
   }

   enableAt(index: number): void {
      this.host.jqxRadioButtonGroup('enableAt', index);
   }

   disableAt(index: number): void {
      this.host.jqxRadioButtonGroup('disableAt', index);
   }

   checkAt(index: number): void {
      this.host.jqxRadioButtonGroup('checkAt', index);
   }

   uncheckAt(index: number): void {
      this.host.jqxRadioButtonGroup('uncheckAt', index);
   }

   uncheckAll(): void {
      this.host.jqxRadioButtonGroup('uncheckAll');
   }

   checkValue(value: string): void {
      this.host.jqxRadioButtonGroup('checkValue', value);
   }

   uncheckValue(value: string): void {
      this.host.jqxRadioButtonGroup('uncheckValue', value);
   }

   disable(): void {
      this.host.jqxRadioButtonGroup('disable');
   }

   destroy(): void {
      this.host.jqxRadioButtonGroup('destroy');
   }

   enable(): void {
      this.host.jqxRadioButtonGroup('enable');
   }

   render(): void {
      this.host.jqxRadioButtonGroup('render');
   }

   val(value?: undefined): any {
      if (value !== undefined) {
         return this.host.jqxRadioButtonGroup('val', value);
      } else {
         return this.host.jqxRadioButtonGroup('val');
      }
   };


   // jqxRadioButtonGroupComponent events


   __wireEvents__(): void {

   }

} //jqxRadioButtonGroupComponent


