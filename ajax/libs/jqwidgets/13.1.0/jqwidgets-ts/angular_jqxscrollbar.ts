/*
jQWidgets v13.1.0 (2021-Nov)
Copyright (c) 2011-2021 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

/// <reference path="jqwidgets.d.ts" />

import '../jqwidgets/jqxcore.js';
import '../jqwidgets/jqxbuttons.js';
import '../jqwidgets/jqxscrollbar.js';

import { Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
declare let JQXLite: any;

@Component({
    selector: 'jqxScrollBar',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxScrollBarComponent implements OnChanges
{
   @Input('disabled') attrDisabled: boolean;
   @Input('largestep') attrLargestep: number;
   @Input('min') attrMin: number;
   @Input('max') attrMax: number;
   @Input('rtl') attrRtl: boolean;
   @Input('step') attrStep: number;
   @Input('showButtons') attrShowButtons: boolean;
   @Input('thumbMinSize') attrThumbMinSize: number;
   @Input('theme') attrTheme: string;
   @Input('vertical') attrVertical: boolean;
   @Input('value') attrValue: number;
   @Input('width') attrWidth: string | number;
   @Input('height') attrHeight: string | number;

   @Input('auto-create') autoCreate: boolean = true;

   properties: string[] = ['disabled','height','largestep','min','max','rtl','step','showButtons','thumbMinSize','theme','vertical','value','width'];
   host: any;
   elementRef: ElementRef;
   widgetObject:  jqwidgets.jqxScrollBar;

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
                     areEqual = this.arraysEqual(this[attrName], this.host.jqxScrollBar(this.properties[i]));
                  }
                  if (areEqual) {
                     return false;
                  }

                  this.host.jqxScrollBar(this.properties[i], this[attrName]);
                  continue;
               }

               if (this[attrName] !== this.host.jqxScrollBar(this.properties[i])) {
                  this.host.jqxScrollBar(this.properties[i], this[attrName]); 
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
      this.widgetObject = jqwidgets.createInstance(this.host, 'jqxScrollBar', options);

   }

   createWidget(options?: any): void {
        this.createComponent(options);
   }

   __updateRect__() : void {
      if(this.host) this.host.css({ width: this.attrWidth, height: this.attrHeight });
   }

   setOptions(options: any) : void {
      this.host.jqxScrollBar('setOptions', options);
   }

   // jqxScrollBarComponent properties
   disabled(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxScrollBar('disabled', arg);
      } else {
          return this.host.jqxScrollBar('disabled');
      }
   }

   height(arg?: string | number): string | number {
      if (arg !== undefined) {
          this.host.jqxScrollBar('height', arg);
      } else {
          return this.host.jqxScrollBar('height');
      }
   }

   largestep(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxScrollBar('largestep', arg);
      } else {
          return this.host.jqxScrollBar('largestep');
      }
   }

   min(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxScrollBar('min', arg);
      } else {
          return this.host.jqxScrollBar('min');
      }
   }

   max(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxScrollBar('max', arg);
      } else {
          return this.host.jqxScrollBar('max');
      }
   }

   rtl(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxScrollBar('rtl', arg);
      } else {
          return this.host.jqxScrollBar('rtl');
      }
   }

   step(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxScrollBar('step', arg);
      } else {
          return this.host.jqxScrollBar('step');
      }
   }

   showButtons(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxScrollBar('showButtons', arg);
      } else {
          return this.host.jqxScrollBar('showButtons');
      }
   }

   thumbMinSize(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxScrollBar('thumbMinSize', arg);
      } else {
          return this.host.jqxScrollBar('thumbMinSize');
      }
   }

   theme(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxScrollBar('theme', arg);
      } else {
          return this.host.jqxScrollBar('theme');
      }
   }

   vertical(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxScrollBar('vertical', arg);
      } else {
          return this.host.jqxScrollBar('vertical');
      }
   }

   value(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxScrollBar('value', arg);
      } else {
          return this.host.jqxScrollBar('value');
      }
   }

   width(arg?: string | number): string | number {
      if (arg !== undefined) {
          this.host.jqxScrollBar('width', arg);
      } else {
          return this.host.jqxScrollBar('width');
      }
   }


   // jqxScrollBarComponent functions
   destroy(): void {
      this.host.jqxScrollBar('destroy');
   }

   isScrolling(): boolean {
      return this.host.jqxScrollBar('isScrolling');
   }

   setPosition(index: number): void {
      this.host.jqxScrollBar('setPosition', index);
   }


   // jqxScrollBarComponent events
   @Output() onValueChanged = new EventEmitter();

   __wireEvents__(): void {
      this.host.on('valueChanged', (eventData: any) => { this.onValueChanged.emit(eventData); });
   }

} //jqxScrollBarComponent


