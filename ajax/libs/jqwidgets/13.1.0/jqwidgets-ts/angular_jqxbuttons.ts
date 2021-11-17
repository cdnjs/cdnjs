/*
jQWidgets v13.1.0 (2021-Nov)
Copyright (c) 2011-2021 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

/// <reference path="jqwidgets.d.ts" />

import '../jqwidgets/jqxcore.js';
import '../jqwidgets/jqxbuttons.js';

import { Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
declare let JQXLite: any;

@Component({
    selector: 'jqxButton',
    template: '<button><ng-content></ng-content></button>'
})

export class jqxButtonComponent implements OnChanges
{
   @Input('disabled') attrDisabled: boolean;
   @Input('imgSrc') attrImgSrc: string;
   @Input('imgWidth') attrImgWidth: number | string;
   @Input('imgHeight') attrImgHeight: number | string;
   @Input('imgPosition') attrImgPosition: string;
   @Input('roundedCorners') attrRoundedCorners: string;
   @Input('rtl') attrRtl: boolean;
   @Input('enableDefault') attrEnableDefault: boolean;
   @Input('cursor') attrCursor: boolean;
   @Input('textPosition') attrTextPosition: string;
   @Input('textImageRelation') attrTextImageRelation: string;
   @Input('theme') attrTheme: string;
   @Input('template') attrTemplate: string;
   @Input('value') attrValue: string;
   @Input('width') attrWidth: string | number;
   @Input('height') attrHeight: string | number;

   @Input('auto-create') autoCreate: boolean = true;

   properties: string[] = ['disabled','height','imgSrc','imgWidth','imgHeight','imgPosition','roundedCorners','rtl','enableDefault','cursor','textPosition','textImageRelation','theme','template','width','value'];
   host: any;
   elementRef: ElementRef;
   widgetObject:  jqwidgets.jqxButton;

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
                     areEqual = this.arraysEqual(this[attrName], this.host.jqxButton(this.properties[i]));
                  }
                  if (areEqual) {
                     return false;
                  }

                  this.host.jqxButton(this.properties[i], this[attrName]);
                  continue;
               }

               if (this[attrName] !== this.host.jqxButton(this.properties[i])) {
                  this.host.jqxButton(this.properties[i], this[attrName]); 
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

      this.widgetObject = jqwidgets.createInstance(this.host, 'jqxButton', options);
      this.host = this.widgetObject['host'];
      this.__wireEvents__();

   }

   createWidget(options?: any): void {
        this.createComponent(options);
   }

   __updateRect__() : void {
      if(this.host) this.host.css({ width: this.attrWidth, height: this.attrHeight });
   }

   setOptions(options: any) : void {
      this.host.jqxButton('setOptions', options);
   }

   // jqxButtonComponent properties
   disabled(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxButton('disabled', arg);
      } else {
          return this.host.jqxButton('disabled');
      }
   }

   height(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxButton('height', arg);
      } else {
          return this.host.jqxButton('height');
      }
   }

   imgSrc(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxButton('imgSrc', arg);
      } else {
          return this.host.jqxButton('imgSrc');
      }
   }

   imgWidth(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxButton('imgWidth', arg);
      } else {
          return this.host.jqxButton('imgWidth');
      }
   }

   imgHeight(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxButton('imgHeight', arg);
      } else {
          return this.host.jqxButton('imgHeight');
      }
   }

   imgPosition(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxButton('imgPosition', arg);
      } else {
          return this.host.jqxButton('imgPosition');
      }
   }

   roundedCorners(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxButton('roundedCorners', arg);
      } else {
          return this.host.jqxButton('roundedCorners');
      }
   }

   rtl(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxButton('rtl', arg);
      } else {
          return this.host.jqxButton('rtl');
      }
   }

   enableDefault(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxButton('enableDefault', arg);
      } else {
          return this.host.jqxButton('enableDefault');
      }
   }

   cursor(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxButton('cursor', arg);
      } else {
          return this.host.jqxButton('cursor');
      }
   }

   textPosition(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxButton('textPosition', arg);
      } else {
          return this.host.jqxButton('textPosition');
      }
   }

   textImageRelation(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxButton('textImageRelation', arg);
      } else {
          return this.host.jqxButton('textImageRelation');
      }
   }

   theme(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxButton('theme', arg);
      } else {
          return this.host.jqxButton('theme');
      }
   }

   template(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxButton('template', arg);
      } else {
          return this.host.jqxButton('template');
      }
   }

   width(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxButton('width', arg);
      } else {
          return this.host.jqxButton('width');
      }
   }

   value(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxButton('value', arg);
      } else {
          return this.host.jqxButton('value');
      }
   }


   // jqxButtonComponent functions
   destroy(): void {
      this.host.jqxButton('destroy');
   }

   focus(): void {
      this.host.jqxButton('focus');
   }

   render(): void {
      this.host.jqxButton('render');
   }

   val(value?: string): any {
      if (value !== undefined) {
         return this.host.jqxButton('val', value);
      } else {
         return this.host.jqxButton('val');
      }
   };


   // jqxButtonComponent events
   @Output() onClick = new EventEmitter();

   __wireEvents__(): void {
      this.host.on('click', (eventData: any) => { this.onClick.emit(eventData); });
   }

} //jqxButtonComponent


