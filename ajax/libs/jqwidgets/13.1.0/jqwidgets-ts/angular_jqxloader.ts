/*
jQWidgets v13.1.0 (2021-Nov)
Copyright (c) 2011-2021 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

/// <reference path="jqwidgets.d.ts" />

import '../jqwidgets/jqxcore.js';
import '../jqwidgets/jqxloader.js';

import { Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
declare let JQXLite: any;

@Component({
    selector: 'jqxLoader',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxLoaderComponent implements OnChanges
{
   @Input('autoOpen') attrAutoOpen: boolean;
   @Input('html') attrHtml: string;
   @Input('isModal') attrIsModal: boolean;
   @Input('imagePosition') attrImagePosition: string;
   @Input('rtl') attrRtl: boolean;
   @Input('text') attrText: number | string;
   @Input('textPosition') attrTextPosition: string;
   @Input('theme') attrTheme: string;
   @Input('width') attrWidth: string | number;
   @Input('height') attrHeight: string | number;

   @Input('auto-create') autoCreate: boolean = true;

   properties: string[] = ['autoOpen','height','html','isModal','imagePosition','rtl','text','textPosition','theme','width'];
   host: any;
   elementRef: ElementRef;
   widgetObject:  jqwidgets.jqxLoader;

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
                     areEqual = this.arraysEqual(this[attrName], this.host.jqxLoader(this.properties[i]));
                  }
                  if (areEqual) {
                     return false;
                  }

                  this.host.jqxLoader(this.properties[i], this[attrName]);
                  continue;
               }

               if (this[attrName] !== this.host.jqxLoader(this.properties[i])) {
                  this.host.jqxLoader(this.properties[i], this[attrName]); 
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
      this.widgetObject = jqwidgets.createInstance(this.host, 'jqxLoader', options);

   }

   createWidget(options?: any): void {
        this.createComponent(options);
   }

   __updateRect__() : void {
      if(this.host) this.host.css({ width: this.attrWidth, height: this.attrHeight });
   }

   setOptions(options: any) : void {
      this.host.jqxLoader('setOptions', options);
   }

   // jqxLoaderComponent properties
   autoOpen(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxLoader('autoOpen', arg);
      } else {
          return this.host.jqxLoader('autoOpen');
      }
   }

   height(arg?: string | number): string | number {
      if (arg !== undefined) {
          this.host.jqxLoader('height', arg);
      } else {
          return this.host.jqxLoader('height');
      }
   }

   html(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxLoader('html', arg);
      } else {
          return this.host.jqxLoader('html');
      }
   }

   isModal(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxLoader('isModal', arg);
      } else {
          return this.host.jqxLoader('isModal');
      }
   }

   imagePosition(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxLoader('imagePosition', arg);
      } else {
          return this.host.jqxLoader('imagePosition');
      }
   }

   rtl(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxLoader('rtl', arg);
      } else {
          return this.host.jqxLoader('rtl');
      }
   }

   text(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxLoader('text', arg);
      } else {
          return this.host.jqxLoader('text');
      }
   }

   textPosition(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxLoader('textPosition', arg);
      } else {
          return this.host.jqxLoader('textPosition');
      }
   }

   theme(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxLoader('theme', arg);
      } else {
          return this.host.jqxLoader('theme');
      }
   }

   width(arg?: string | number): string | number {
      if (arg !== undefined) {
          this.host.jqxLoader('width', arg);
      } else {
          return this.host.jqxLoader('width');
      }
   }


   // jqxLoaderComponent functions
   close(): void {
      this.host.jqxLoader('close');
   }

   open(left?: number | string, top?: number | string): void {
      this.host.jqxLoader('open', left, top);
   }


   __wireEvents__(): void {

   }

} //jqxLoaderComponent


