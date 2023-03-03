/*
jQWidgets v16.0.0 (2023-Mar)
Copyright (c) 2011-2023 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

/// <reference path="jqwidgets.d.ts" />

import '../jqwidgets/jqxcore.js';
import '../jqwidgets/jqxcheckbox.js';
import '../jqwidgets/jqxcheckboxgroup.js';

import { Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
declare let JQXLite: any;

@Component({
    selector: 'jqxCheckBoxGroup',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxCheckBoxGroupComponent implements OnChanges
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
   widgetObject:  jqwidgets.jqxCheckBoxGroup;

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
                     areEqual = this.arraysEqual(this[attrName], this.host.jqxCheckBoxGroup(this.properties[i]));
                  }
                  if (areEqual) {
                     return false;
                  }

                  this.host.jqxCheckBoxGroup(this.properties[i], this[attrName]);
                  continue;
               }

               if (this[attrName] !== this.host.jqxCheckBoxGroup(this.properties[i])) {
                  this.host.jqxCheckBoxGroup(this.properties[i], this[attrName]); 
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
      this.widgetObject = jqwidgets.createInstance(this.host, 'jqxCheckBoxGroup', options);

   }

   createWidget(options?: any): void {
        this.createComponent(options);
   }

   __updateRect__() : void {
      if(this.host) this.host.css({ width: this.attrWidth, height: this.attrHeight });
   }

   setOptions(options: any) : void {
      this.host.jqxCheckBoxGroup('setOptions', options);
   }

   // jqxCheckBoxGroupComponent properties
   change(arg?: (item?: any) => void): (item?: any) => void {
      if (arg !== undefined) {
          this.host.jqxCheckBoxGroup('change', arg);
      } else {
          return this.host.jqxCheckBoxGroup('change');
      }
   }

   disabled(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxCheckBoxGroup('disabled', arg);
      } else {
          return this.host.jqxCheckBoxGroup('disabled');
      }
   }

   items(arg?: undefined): undefined {
      if (arg !== undefined) {
          this.host.jqxCheckBoxGroup('items', arg);
      } else {
          return this.host.jqxCheckBoxGroup('items');
      }
   }

   value(arg?: undefined): undefined {
      if (arg !== undefined) {
          this.host.jqxCheckBoxGroup('value', arg);
      } else {
          return this.host.jqxCheckBoxGroup('value');
      }
   }

   layout(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxCheckBoxGroup('layout', arg);
      } else {
          return this.host.jqxCheckBoxGroup('layout');
      }
   }

   labelPosition(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxCheckBoxGroup('labelPosition', arg);
      } else {
          return this.host.jqxCheckBoxGroup('labelPosition');
      }
   }

   rtl(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxCheckBoxGroup('rtl', arg);
      } else {
          return this.host.jqxCheckBoxGroup('rtl');
      }
   }

   theme(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxCheckBoxGroup('theme', arg);
      } else {
          return this.host.jqxCheckBoxGroup('theme');
      }
   }


   // jqxCheckBoxGroupComponent functions
   getValue(): undefined {
      return this.host.jqxCheckBoxGroup('getValue');
   }

   getValueAt(index: number): string {
      return this.host.jqxCheckBoxGroup('getValueAt', index);
   }

   enableAt(index: number): void {
      this.host.jqxCheckBoxGroup('enableAt', index);
   }

   disableAt(index: number): void {
      this.host.jqxCheckBoxGroup('disableAt', index);
   }

   checkAt(index: number): void {
      this.host.jqxCheckBoxGroup('checkAt', index);
   }

   uncheckAt(index: number): void {
      this.host.jqxCheckBoxGroup('uncheckAt', index);
   }

   uncheckAll(): void {
      this.host.jqxCheckBoxGroup('uncheckAll');
   }

   checkAll(): void {
      this.host.jqxCheckBoxGroup('checkAll');
   }

   checkValue(value: string): void {
      this.host.jqxCheckBoxGroup('checkValue', value);
   }

   uncheckValue(value: string): void {
      this.host.jqxCheckBoxGroup('uncheckValue', value);
   }

   disable(): void {
      this.host.jqxCheckBoxGroup('disable');
   }

   destroy(): void {
      this.host.jqxCheckBoxGroup('destroy');
   }

   enable(): void {
      this.host.jqxCheckBoxGroup('enable');
   }

   render(): void {
      this.host.jqxCheckBoxGroup('render');
   }

   val(value?: undefined): any {
      if (value !== undefined) {
         return this.host.jqxCheckBoxGroup('val', value);
      } else {
         return this.host.jqxCheckBoxGroup('val');
      }
   };


   // jqxCheckBoxGroupComponent events


   __wireEvents__(): void {

   }

} //jqxCheckBoxGroupComponent


