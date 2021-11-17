/*
jQWidgets v13.1.0 (2021-Nov)
Copyright (c) 2011-2021 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

/// <reference path="jqwidgets.d.ts" />

import '../jqwidgets/jqxcore.js';
import '../jqwidgets/jqxbuttons.js';
import '../jqwidgets/jqxdropdownbutton.js';
import '../jqwidgets/jqxradiobutton.js';
import '../jqwidgets/jqxcolorpicker.js';

import { Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
declare let JQXLite: any;

@Component({
    selector: 'jqxColorPicker',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxColorPickerComponent implements OnChanges
{
   @Input('color') attrColor: string;
   @Input('colorMode') attrColorMode: string;
   @Input('disabled') attrDisabled: boolean;
   @Input('showTransparent') attrShowTransparent: boolean;
   @Input('width') attrWidth: string | number;
   @Input('height') attrHeight: string | number;

   @Input('auto-create') autoCreate: boolean = true;

   properties: string[] = ['color','colorMode','disabled','height','showTransparent','width'];
   host: any;
   elementRef: ElementRef;
   widgetObject:  jqwidgets.jqxColorPicker;

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
                     areEqual = this.arraysEqual(this[attrName], this.host.jqxColorPicker(this.properties[i]));
                  }
                  if (areEqual) {
                     return false;
                  }

                  this.host.jqxColorPicker(this.properties[i], this[attrName]);
                  continue;
               }

               if (this[attrName] !== this.host.jqxColorPicker(this.properties[i])) {
                  this.host.jqxColorPicker(this.properties[i], this[attrName]); 
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
      this.widgetObject = jqwidgets.createInstance(this.host, 'jqxColorPicker', options);

   }

   createWidget(options?: any): void {
        this.createComponent(options);
   }

   __updateRect__() : void {
      if(this.host) this.host.css({ width: this.attrWidth, height: this.attrHeight });
   }

   setOptions(options: any) : void {
      this.host.jqxColorPicker('setOptions', options);
   }

   // jqxColorPickerComponent properties
   color(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxColorPicker('color', arg);
      } else {
          return this.host.jqxColorPicker('color');
      }
   }

   colorMode(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxColorPicker('colorMode', arg);
      } else {
          return this.host.jqxColorPicker('colorMode');
      }
   }

   disabled(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxColorPicker('disabled', arg);
      } else {
          return this.host.jqxColorPicker('disabled');
      }
   }

   height(arg?: string | number): string | number {
      if (arg !== undefined) {
          this.host.jqxColorPicker('height', arg);
      } else {
          return this.host.jqxColorPicker('height');
      }
   }

   showTransparent(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxColorPicker('showTransparent', arg);
      } else {
          return this.host.jqxColorPicker('showTransparent');
      }
   }

   width(arg?: string | number): string | number {
      if (arg !== undefined) {
          this.host.jqxColorPicker('width', arg);
      } else {
          return this.host.jqxColorPicker('width');
      }
   }


   // jqxColorPickerComponent functions
   getColor(): any {
      return this.host.jqxColorPicker('getColor');
   }

   setColor(color: undefined): void {
      this.host.jqxColorPicker('setColor', color);
   }


   // jqxColorPickerComponent events
   @Output() onColorchange = new EventEmitter();

   __wireEvents__(): void {
      this.host.on('colorchange', (eventData: any) => { this.onColorchange.emit(eventData); });
   }

} //jqxColorPickerComponent


