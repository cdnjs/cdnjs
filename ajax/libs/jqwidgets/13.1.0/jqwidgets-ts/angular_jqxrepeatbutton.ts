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
    selector: 'jqxRepeatButton',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxRepeatButtonComponent implements OnChanges
{
   @Input('delay') attrDelay: number;
   @Input('disabled') attrDisabled: boolean;
   @Input('imgSrc') attrImgSrc: string;
   @Input('imgWidth') attrImgWidth: number | string;
   @Input('imgHeight') attrImgHeight: number | string;
   @Input('imgPosition') attrImgPosition: string;
   @Input('roundedCorners') attrRoundedCorners: string;
   @Input('rtl') attrRtl: boolean;
   @Input('textPosition') attrTextPosition: string;
   @Input('textImageRelation') attrTextImageRelation: string;
   @Input('theme') attrTheme: string;
   @Input('template') attrTemplate: string;
   @Input('toggled') attrToggled: boolean;
   @Input('value') attrValue: string;
   @Input('width') attrWidth: string | number;
   @Input('height') attrHeight: string | number;

   @Input('auto-create') autoCreate: boolean = true;

   properties: string[] = ['delay','disabled','height','imgSrc','imgWidth','imgHeight','imgPosition','roundedCorners','rtl','textPosition','textImageRelation','theme','template','toggled','width','value'];
   host: any;
   elementRef: ElementRef;
   widgetObject:  jqwidgets.jqxRepeatButton;

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
                     areEqual = this.arraysEqual(this[attrName], this.host.jqxRepeatButton(this.properties[i]));
                  }
                  if (areEqual) {
                     return false;
                  }

                  this.host.jqxRepeatButton(this.properties[i], this[attrName]);
                  continue;
               }

               if (this[attrName] !== this.host.jqxRepeatButton(this.properties[i])) {
                  this.host.jqxRepeatButton(this.properties[i], this[attrName]); 
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
      this.widgetObject = jqwidgets.createInstance(this.host, 'jqxRepeatButton', options);

   }

   createWidget(options?: any): void {
        this.createComponent(options);
   }

   __updateRect__() : void {
      if(this.host) this.host.css({ width: this.attrWidth, height: this.attrHeight });
   }

   setOptions(options: any) : void {
      this.host.jqxRepeatButton('setOptions', options);
   }

   // jqxRepeatButtonComponent properties
   delay(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxRepeatButton('delay', arg);
      } else {
          return this.host.jqxRepeatButton('delay');
      }
   }

   disabled(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxRepeatButton('disabled', arg);
      } else {
          return this.host.jqxRepeatButton('disabled');
      }
   }

   height(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxRepeatButton('height', arg);
      } else {
          return this.host.jqxRepeatButton('height');
      }
   }

   imgSrc(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxRepeatButton('imgSrc', arg);
      } else {
          return this.host.jqxRepeatButton('imgSrc');
      }
   }

   imgWidth(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxRepeatButton('imgWidth', arg);
      } else {
          return this.host.jqxRepeatButton('imgWidth');
      }
   }

   imgHeight(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxRepeatButton('imgHeight', arg);
      } else {
          return this.host.jqxRepeatButton('imgHeight');
      }
   }

   imgPosition(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxRepeatButton('imgPosition', arg);
      } else {
          return this.host.jqxRepeatButton('imgPosition');
      }
   }

   roundedCorners(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxRepeatButton('roundedCorners', arg);
      } else {
          return this.host.jqxRepeatButton('roundedCorners');
      }
   }

   rtl(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxRepeatButton('rtl', arg);
      } else {
          return this.host.jqxRepeatButton('rtl');
      }
   }

   textPosition(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxRepeatButton('textPosition', arg);
      } else {
          return this.host.jqxRepeatButton('textPosition');
      }
   }

   textImageRelation(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxRepeatButton('textImageRelation', arg);
      } else {
          return this.host.jqxRepeatButton('textImageRelation');
      }
   }

   theme(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxRepeatButton('theme', arg);
      } else {
          return this.host.jqxRepeatButton('theme');
      }
   }

   template(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxRepeatButton('template', arg);
      } else {
          return this.host.jqxRepeatButton('template');
      }
   }

   toggled(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxRepeatButton('toggled', arg);
      } else {
          return this.host.jqxRepeatButton('toggled');
      }
   }

   width(arg?: string | number): string | number {
      if (arg !== undefined) {
          this.host.jqxRepeatButton('width', arg);
      } else {
          return this.host.jqxRepeatButton('width');
      }
   }

   value(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxRepeatButton('value', arg);
      } else {
          return this.host.jqxRepeatButton('value');
      }
   }


   // jqxRepeatButtonComponent functions
   destroy(): void {
      this.host.jqxRepeatButton('destroy');
   }

   focus(): void {
      this.host.jqxRepeatButton('focus');
   }

   render(): void {
      this.host.jqxRepeatButton('render');
   }

   val(value?: string): any {
      if (value !== undefined) {
         return this.host.jqxRepeatButton('val', value);
      } else {
         return this.host.jqxRepeatButton('val');
      }
   };


   // jqxRepeatButtonComponent events
   @Output() onClick = new EventEmitter();

   __wireEvents__(): void {
      this.host.on('click', (eventData: any) => { this.onClick.emit(eventData); });
   }

} //jqxRepeatButtonComponent


