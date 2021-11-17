/*
jQWidgets v13.1.0 (2021-Nov)
Copyright (c) 2011-2021 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

/// <reference path="jqwidgets.d.ts" />

import '../jqwidgets/jqxcore.js';
import '../jqwidgets/jqxpopover.js';

import { Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
declare let JQXLite: any;

@Component({
    selector: 'jqxPopover',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxPopoverComponent implements OnChanges
{
   @Input('arrowOffsetValue') attrArrowOffsetValue: number;
   @Input('animationOpenDelay') attrAnimationOpenDelay: number | string;
   @Input('animationCloseDelay') attrAnimationCloseDelay: number | string;
   @Input('autoClose') attrAutoClose: boolean;
   @Input('animationType') attrAnimationType: string;
   @Input('initContent') attrInitContent: () => void;
   @Input('isModal') attrIsModal: boolean;
   @Input('offset') attrOffset: any;
   @Input('position') attrPosition: string;
   @Input('rtl') attrRtl: boolean;
   @Input('selector') attrSelector: string;
   @Input('showArrow') attrShowArrow: boolean;
   @Input('showCloseButton') attrShowCloseButton: boolean;
   @Input('title') attrTitle: string | number;
   @Input('theme') attrTheme: string;
   @Input('width') attrWidth: string | number;
   @Input('height') attrHeight: string | number;

   @Input('auto-create') autoCreate: boolean = true;

   properties: string[] = ['arrowOffsetValue','animationOpenDelay','animationCloseDelay','autoClose','animationType','height','initContent','isModal','offset','position','rtl','selector','showArrow','showCloseButton','width','title','theme'];
   host: any;
   elementRef: ElementRef;
   widgetObject:  jqwidgets.jqxPopover;

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
                     areEqual = this.arraysEqual(this[attrName], this.host.jqxPopover(this.properties[i]));
                  }
                  if (areEqual) {
                     return false;
                  }

                  this.host.jqxPopover(this.properties[i], this[attrName]);
                  continue;
               }

               if (this[attrName] !== this.host.jqxPopover(this.properties[i])) {
                  this.host.jqxPopover(this.properties[i], this[attrName]); 
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

      this.widgetObject = jqwidgets.createInstance(this.host, 'jqxPopover', options);
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
      this.host.jqxPopover('setOptions', options);
   }

   // jqxPopoverComponent properties
   arrowOffsetValue(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxPopover('arrowOffsetValue', arg);
      } else {
          return this.host.jqxPopover('arrowOffsetValue');
      }
   }

   animationOpenDelay(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxPopover('animationOpenDelay', arg);
      } else {
          return this.host.jqxPopover('animationOpenDelay');
      }
   }

   animationCloseDelay(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxPopover('animationCloseDelay', arg);
      } else {
          return this.host.jqxPopover('animationCloseDelay');
      }
   }

   autoClose(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxPopover('autoClose', arg);
      } else {
          return this.host.jqxPopover('autoClose');
      }
   }

   animationType(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxPopover('animationType', arg);
      } else {
          return this.host.jqxPopover('animationType');
      }
   }

   height(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxPopover('height', arg);
      } else {
          return this.host.jqxPopover('height');
      }
   }

   initContent(arg?: () => void): () => void {
      if (arg !== undefined) {
          this.host.jqxPopover('initContent', arg);
      } else {
          return this.host.jqxPopover('initContent');
      }
   }

   isModal(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxPopover('isModal', arg);
      } else {
          return this.host.jqxPopover('isModal');
      }
   }

   offset(arg?: any): any {
      if (arg !== undefined) {
          this.host.jqxPopover('offset', arg);
      } else {
          return this.host.jqxPopover('offset');
      }
   }

   position(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxPopover('position', arg);
      } else {
          return this.host.jqxPopover('position');
      }
   }

   rtl(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxPopover('rtl', arg);
      } else {
          return this.host.jqxPopover('rtl');
      }
   }

   selector(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxPopover('selector', arg);
      } else {
          return this.host.jqxPopover('selector');
      }
   }

   showArrow(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxPopover('showArrow', arg);
      } else {
          return this.host.jqxPopover('showArrow');
      }
   }

   showCloseButton(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxPopover('showCloseButton', arg);
      } else {
          return this.host.jqxPopover('showCloseButton');
      }
   }

   width(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxPopover('width', arg);
      } else {
          return this.host.jqxPopover('width');
      }
   }

   title(arg?: string | number): string | number {
      if (arg !== undefined) {
          this.host.jqxPopover('title', arg);
      } else {
          return this.host.jqxPopover('title');
      }
   }

   theme(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxPopover('theme', arg);
      } else {
          return this.host.jqxPopover('theme');
      }
   }


   // jqxPopoverComponent functions
   close(): void {
      this.host.jqxPopover('close');
   }

   destroy(): void {
      this.host.jqxPopover('destroy');
   }

   open(): void {
      this.host.jqxPopover('open');
   }


   // jqxPopoverComponent events
   @Output() onClose = new EventEmitter();
   @Output() onOpen = new EventEmitter();

   __wireEvents__(): void {
      setTimeout(() => {
      this.host.on('close', (eventData: any) => { this.onClose.emit(eventData); });
      this.host.on('open', (eventData: any) => { this.onOpen.emit(eventData); });
      });
   }

} //jqxPopoverComponent


