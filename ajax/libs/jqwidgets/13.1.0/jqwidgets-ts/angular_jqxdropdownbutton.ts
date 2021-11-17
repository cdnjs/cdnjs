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

import { Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
declare let JQXLite: any;

@Component({
    selector: 'jqxDropDownButton',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxDropDownButtonComponent implements OnChanges
{
   @Input('animationType') attrAnimationType: string;
   @Input('arrowSize') attrArrowSize: number;
   @Input('autoOpen') attrAutoOpen: boolean;
   @Input('closeDelay') attrCloseDelay: number;
   @Input('disabled') attrDisabled: boolean;
   @Input('dropDownHorizontalAlignment') attrDropDownHorizontalAlignment: string;
   @Input('dropDownVerticalAlignment') attrDropDownVerticalAlignment: string;
   @Input('dropDownWidth') attrDropDownWidth: number | string;
   @Input('enableBrowserBoundsDetection') attrEnableBrowserBoundsDetection: boolean;
   @Input('initContent') attrInitContent: () => void;
   @Input('openDelay') attrOpenDelay: number;
   @Input('popupZIndex') attrPopupZIndex: number;
   @Input('rtl') attrRtl: boolean;
   @Input('template') attrTemplate: string;
   @Input('theme') attrTheme: string;
   @Input('width') attrWidth: string | number;
   @Input('height') attrHeight: string | number;

   @Input('auto-create') autoCreate: boolean = true;

   properties: string[] = ['animationType','arrowSize','autoOpen','closeDelay','disabled','dropDownHorizontalAlignment','dropDownVerticalAlignment','dropDownWidth','enableBrowserBoundsDetection','height','initContent','openDelay','popupZIndex','rtl','template','theme','width'];
   host: any;
   elementRef: ElementRef;
   widgetObject:  jqwidgets.jqxDropDownButton;

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
                     areEqual = this.arraysEqual(this[attrName], this.host.jqxDropDownButton(this.properties[i]));
                  }
                  if (areEqual) {
                     return false;
                  }

                  this.host.jqxDropDownButton(this.properties[i], this[attrName]);
                  continue;
               }

               if (this[attrName] !== this.host.jqxDropDownButton(this.properties[i])) {
                  this.host.jqxDropDownButton(this.properties[i], this[attrName]); 
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
      this.widgetObject = jqwidgets.createInstance(this.host, 'jqxDropDownButton', options);

   }

   createWidget(options?: any): void {
        this.createComponent(options);
   }

   __updateRect__() : void {
      if(this.host) this.host.css({ width: this.attrWidth, height: this.attrHeight });
   }

   setOptions(options: any) : void {
      this.host.jqxDropDownButton('setOptions', options);
   }

   // jqxDropDownButtonComponent properties
   animationType(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxDropDownButton('animationType', arg);
      } else {
          return this.host.jqxDropDownButton('animationType');
      }
   }

   arrowSize(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxDropDownButton('arrowSize', arg);
      } else {
          return this.host.jqxDropDownButton('arrowSize');
      }
   }

   autoOpen(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxDropDownButton('autoOpen', arg);
      } else {
          return this.host.jqxDropDownButton('autoOpen');
      }
   }

   closeDelay(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxDropDownButton('closeDelay', arg);
      } else {
          return this.host.jqxDropDownButton('closeDelay');
      }
   }

   disabled(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxDropDownButton('disabled', arg);
      } else {
          return this.host.jqxDropDownButton('disabled');
      }
   }

   dropDownHorizontalAlignment(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxDropDownButton('dropDownHorizontalAlignment', arg);
      } else {
          return this.host.jqxDropDownButton('dropDownHorizontalAlignment');
      }
   }

   dropDownVerticalAlignment(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxDropDownButton('dropDownVerticalAlignment', arg);
      } else {
          return this.host.jqxDropDownButton('dropDownVerticalAlignment');
      }
   }

   dropDownWidth(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxDropDownButton('dropDownWidth', arg);
      } else {
          return this.host.jqxDropDownButton('dropDownWidth');
      }
   }

   enableBrowserBoundsDetection(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxDropDownButton('enableBrowserBoundsDetection', arg);
      } else {
          return this.host.jqxDropDownButton('enableBrowserBoundsDetection');
      }
   }

   height(arg?: string | number): string | number {
      if (arg !== undefined) {
          this.host.jqxDropDownButton('height', arg);
      } else {
          return this.host.jqxDropDownButton('height');
      }
   }

   initContent(arg?: () => void): () => void {
      if (arg !== undefined) {
          this.host.jqxDropDownButton('initContent', arg);
      } else {
          return this.host.jqxDropDownButton('initContent');
      }
   }

   openDelay(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxDropDownButton('openDelay', arg);
      } else {
          return this.host.jqxDropDownButton('openDelay');
      }
   }

   popupZIndex(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxDropDownButton('popupZIndex', arg);
      } else {
          return this.host.jqxDropDownButton('popupZIndex');
      }
   }

   rtl(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxDropDownButton('rtl', arg);
      } else {
          return this.host.jqxDropDownButton('rtl');
      }
   }

   template(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxDropDownButton('template', arg);
      } else {
          return this.host.jqxDropDownButton('template');
      }
   }

   theme(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxDropDownButton('theme', arg);
      } else {
          return this.host.jqxDropDownButton('theme');
      }
   }

   width(arg?: string | number): string | number {
      if (arg !== undefined) {
          this.host.jqxDropDownButton('width', arg);
      } else {
          return this.host.jqxDropDownButton('width');
      }
   }


   // jqxDropDownButtonComponent functions
   close(): void {
      this.host.jqxDropDownButton('close');
   }

   destroy(): void {
      this.host.jqxDropDownButton('destroy');
   }

   focus(): void {
      this.host.jqxDropDownButton('focus');
   }

   getContent(): any {
      return this.host.jqxDropDownButton('getContent');
   }

   isOpened(): boolean {
      return this.host.jqxDropDownButton('isOpened');
   }

   open(): void {
      this.host.jqxDropDownButton('open');
   }

   setContent(content: string): void {
      this.host.jqxDropDownButton('setContent', content);
   }


   // jqxDropDownButtonComponent events
   @Output() onClose = new EventEmitter();
   @Output() onOpen = new EventEmitter();

   __wireEvents__(): void {
      this.host.on('close', (eventData: any) => { this.onClose.emit(eventData); });
      this.host.on('open', (eventData: any) => { this.onOpen.emit(eventData); });
   }

} //jqxDropDownButtonComponent


