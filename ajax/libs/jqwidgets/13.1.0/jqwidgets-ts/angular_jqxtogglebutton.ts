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
    selector: 'jqxToggleButton',
    template: '<button><ng-content></ng-content></button>'
})

export class jqxToggleButtonComponent implements OnChanges
{
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

   properties: string[] = ['disabled','height','imgSrc','imgWidth','imgHeight','imgPosition','roundedCorners','rtl','textPosition','textImageRelation','theme','template','toggled','width','value'];
   host: any;
   elementRef: ElementRef;
   widgetObject:  jqwidgets.jqxToggleButton;

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
                     areEqual = this.arraysEqual(this[attrName], this.host.jqxToggleButton(this.properties[i]));
                  }
                  if (areEqual) {
                     return false;
                  }

                  this.host.jqxToggleButton(this.properties[i], this[attrName]);
                  continue;
               }

               if (this[attrName] !== this.host.jqxToggleButton(this.properties[i])) {
                  this.host.jqxToggleButton(this.properties[i], this[attrName]); 
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
      this.widgetObject = jqwidgets.createInstance(this.host, 'jqxToggleButton', options);

   }

   createWidget(options?: any): void {
        this.createComponent(options);
   }

   __updateRect__() : void {
      if(this.host) this.host.css({ width: this.attrWidth, height: this.attrHeight });
   }

   setOptions(options: any) : void {
      this.host.jqxToggleButton('setOptions', options);
   }

   // jqxToggleButtonComponent properties
   disabled(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxToggleButton('disabled', arg);
      } else {
          return this.host.jqxToggleButton('disabled');
      }
   }

   height(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxToggleButton('height', arg);
      } else {
          return this.host.jqxToggleButton('height');
      }
   }

   imgSrc(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxToggleButton('imgSrc', arg);
      } else {
          return this.host.jqxToggleButton('imgSrc');
      }
   }

   imgWidth(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxToggleButton('imgWidth', arg);
      } else {
          return this.host.jqxToggleButton('imgWidth');
      }
   }

   imgHeight(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxToggleButton('imgHeight', arg);
      } else {
          return this.host.jqxToggleButton('imgHeight');
      }
   }

   imgPosition(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxToggleButton('imgPosition', arg);
      } else {
          return this.host.jqxToggleButton('imgPosition');
      }
   }

   roundedCorners(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxToggleButton('roundedCorners', arg);
      } else {
          return this.host.jqxToggleButton('roundedCorners');
      }
   }

   rtl(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxToggleButton('rtl', arg);
      } else {
          return this.host.jqxToggleButton('rtl');
      }
   }

   textPosition(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxToggleButton('textPosition', arg);
      } else {
          return this.host.jqxToggleButton('textPosition');
      }
   }

   textImageRelation(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxToggleButton('textImageRelation', arg);
      } else {
          return this.host.jqxToggleButton('textImageRelation');
      }
   }

   theme(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxToggleButton('theme', arg);
      } else {
          return this.host.jqxToggleButton('theme');
      }
   }

   template(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxToggleButton('template', arg);
      } else {
          return this.host.jqxToggleButton('template');
      }
   }

   toggled(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxToggleButton('toggled', arg);
      } else {
          return this.host.jqxToggleButton('toggled');
      }
   }

   width(arg?: string | number): string | number {
      if (arg !== undefined) {
          this.host.jqxToggleButton('width', arg);
      } else {
          return this.host.jqxToggleButton('width');
      }
   }

   value(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxToggleButton('value', arg);
      } else {
          return this.host.jqxToggleButton('value');
      }
   }


   // jqxToggleButtonComponent functions
   check(): void {
      this.host.jqxToggleButton('check');
   }

   destroy(): void {
      this.host.jqxToggleButton('destroy');
   }

   focus(): void {
      this.host.jqxToggleButton('focus');
   }

   render(): void {
      this.host.jqxToggleButton('render');
   }

   toggle(): void {
      this.host.jqxToggleButton('toggle');
   }

   unCheck(): void {
      this.host.jqxToggleButton('unCheck');
   }

   val(value?: string): any {
      if (value !== undefined) {
         return this.host.jqxToggleButton('val', value);
      } else {
         return this.host.jqxToggleButton('val');
      }
   };


   // jqxToggleButtonComponent events
   @Output() onClick = new EventEmitter();

   __wireEvents__(): void {
      this.host.on('click', (eventData: any) => { this.onClick.emit(eventData); });
   }

} //jqxToggleButtonComponent


