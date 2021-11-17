/*
jQWidgets v13.1.0 (2021-Nov)
Copyright (c) 2011-2021 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

/// <reference path="jqwidgets.d.ts" />

import '../jqwidgets/jqxcore.js';
import '../jqwidgets/jqxdraw.js';
import '../jqwidgets/jqxtimepicker.js';

import { Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
declare let JQXLite: any;

@Component({
    selector: 'jqxTimePicker',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxTimePickerComponent implements OnChanges
{
   @Input('autoSwitchToMinutes') attrAutoSwitchToMinutes: boolean;
   @Input('disabled') attrDisabled: boolean;
   @Input('footer') attrFooter: boolean;
   @Input('footerTemplate') attrFooterTemplate: string;
   @Input('format') attrFormat: string;
   @Input('minuteInterval') attrMinuteInterval: number;
   @Input('name') attrName: string;
   @Input('readonly') attrReadonly: boolean;
   @Input('selection') attrSelection: string;
   @Input('theme') attrTheme: string;
   @Input('unfocusable') attrUnfocusable: boolean;
   @Input('value') attrValue: any;
   @Input('view') attrView: string;
   @Input('width') attrWidth: string | number;
   @Input('height') attrHeight: string | number;

   @Input('auto-create') autoCreate: boolean = true;

   properties: string[] = ['autoSwitchToMinutes','disabled','footer','footerTemplate','format','height','minuteInterval','name','readonly','selection','theme','unfocusable','value','view','width'];
   host: any;
   elementRef: ElementRef;
   widgetObject:  jqwidgets.jqxTimePicker;

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
                     areEqual = this.arraysEqual(this[attrName], this.host.jqxTimePicker(this.properties[i]));
                  }
                  if (areEqual) {
                     return false;
                  }

                  this.host.jqxTimePicker(this.properties[i], this[attrName]);
                  continue;
               }

               if (this[attrName] !== this.host.jqxTimePicker(this.properties[i])) {
                  this.host.jqxTimePicker(this.properties[i], this[attrName]); 
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
      this.widgetObject = jqwidgets.createInstance(this.host, 'jqxTimePicker', options);

   }

   createWidget(options?: any): void {
        this.createComponent(options);
   }

   __updateRect__() : void {
      if(this.host) this.host.css({ width: this.attrWidth, height: this.attrHeight });
   }

   setOptions(options: any) : void {
      this.host.jqxTimePicker('setOptions', options);
   }

   // jqxTimePickerComponent properties
   autoSwitchToMinutes(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxTimePicker('autoSwitchToMinutes', arg);
      } else {
          return this.host.jqxTimePicker('autoSwitchToMinutes');
      }
   }

   disabled(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxTimePicker('disabled', arg);
      } else {
          return this.host.jqxTimePicker('disabled');
      }
   }

   footer(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxTimePicker('footer', arg);
      } else {
          return this.host.jqxTimePicker('footer');
      }
   }

   footerTemplate(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxTimePicker('footerTemplate', arg);
      } else {
          return this.host.jqxTimePicker('footerTemplate');
      }
   }

   format(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxTimePicker('format', arg);
      } else {
          return this.host.jqxTimePicker('format');
      }
   }

   height(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxTimePicker('height', arg);
      } else {
          return this.host.jqxTimePicker('height');
      }
   }

   minuteInterval(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxTimePicker('minuteInterval', arg);
      } else {
          return this.host.jqxTimePicker('minuteInterval');
      }
   }

   name(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxTimePicker('name', arg);
      } else {
          return this.host.jqxTimePicker('name');
      }
   }

   readonly(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxTimePicker('readonly', arg);
      } else {
          return this.host.jqxTimePicker('readonly');
      }
   }

   selection(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxTimePicker('selection', arg);
      } else {
          return this.host.jqxTimePicker('selection');
      }
   }

   theme(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxTimePicker('theme', arg);
      } else {
          return this.host.jqxTimePicker('theme');
      }
   }

   unfocusable(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxTimePicker('unfocusable', arg);
      } else {
          return this.host.jqxTimePicker('unfocusable');
      }
   }

   value(arg?: any): any {
      if (arg !== undefined) {
          this.host.jqxTimePicker('value', arg);
      } else {
          return this.host.jqxTimePicker('value');
      }
   }

   view(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxTimePicker('view', arg);
      } else {
          return this.host.jqxTimePicker('view');
      }
   }

   width(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxTimePicker('width', arg);
      } else {
          return this.host.jqxTimePicker('width');
      }
   }


   // jqxTimePickerComponent functions
   setHours(hours: number): void {
      this.host.jqxTimePicker('setHours', hours);
   }

   setMinutes(minutes: number): void {
      this.host.jqxTimePicker('setMinutes', minutes);
   }


   // jqxTimePickerComponent events
   @Output() onChange = new EventEmitter();

   __wireEvents__(): void {
      this.host.on('change', (eventData: any) => { this.onChange.emit(eventData); });
   }

} //jqxTimePickerComponent


