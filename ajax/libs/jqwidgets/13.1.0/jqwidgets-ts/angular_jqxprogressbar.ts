/*
jQWidgets v13.1.0 (2021-Nov)
Copyright (c) 2011-2021 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

/// <reference path="jqwidgets.d.ts" />

import '../jqwidgets/jqxcore.js';
import '../jqwidgets/jqxprogressbar.js';

import { Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
declare let JQXLite: any;

@Component({
    selector: 'jqxProgressBar',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxProgressBarComponent implements OnChanges
{
   @Input('animationDuration') attrAnimationDuration: number;
   @Input('colorRanges') attrColorRanges: Array<jqwidgets.ProgressBarColorRanges>;
   @Input('disabled') attrDisabled: boolean;
   @Input('layout') attrLayout: string;
   @Input('max') attrMax: string  | number;
   @Input('min') attrMin: number | string;
   @Input('orientation') attrOrientation: string;
   @Input('rtl') attrRtl: boolean;
   @Input('renderText') attrRenderText: (text?: jqwidgets.ProgressBarRenderText['text'], value?: jqwidgets.ProgressBarRenderText['value']) => string;
   @Input('showText') attrShowText: boolean;
   @Input('template') attrTemplate: string;
   @Input('theme') attrTheme: string;
   @Input('value') attrValue: string | number;
   @Input('width') attrWidth: string | number;
   @Input('height') attrHeight: string | number;

   @Input('auto-create') autoCreate: boolean = true;

   properties: string[] = ['animationDuration','colorRanges','disabled','height','layout','max','min','orientation','rtl','renderText','showText','template','theme','value','width'];
   host: any;
   elementRef: ElementRef;
   widgetObject:  jqwidgets.jqxProgressBar;

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
                     areEqual = this.arraysEqual(this[attrName], this.host.jqxProgressBar(this.properties[i]));
                  }
                  if (areEqual) {
                     return false;
                  }

                  this.host.jqxProgressBar(this.properties[i], this[attrName]);
                  continue;
               }

               if (this[attrName] !== this.host.jqxProgressBar(this.properties[i])) {
                  this.host.jqxProgressBar(this.properties[i], this[attrName]); 
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
      this.widgetObject = jqwidgets.createInstance(this.host, 'jqxProgressBar', options);

   }

   createWidget(options?: any): void {
        this.createComponent(options);
   }

   __updateRect__() : void {
      if(this.host) this.host.css({ width: this.attrWidth, height: this.attrHeight });
   }

   setOptions(options: any) : void {
      this.host.jqxProgressBar('setOptions', options);
   }

   // jqxProgressBarComponent properties
   animationDuration(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxProgressBar('animationDuration', arg);
      } else {
          return this.host.jqxProgressBar('animationDuration');
      }
   }

   colorRanges(arg?: Array<jqwidgets.ProgressBarColorRanges>): Array<jqwidgets.ProgressBarColorRanges> {
      if (arg !== undefined) {
          this.host.jqxProgressBar('colorRanges', arg);
      } else {
          return this.host.jqxProgressBar('colorRanges');
      }
   }

   disabled(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxProgressBar('disabled', arg);
      } else {
          return this.host.jqxProgressBar('disabled');
      }
   }

   height(arg?: string  | number): string  | number {
      if (arg !== undefined) {
          this.host.jqxProgressBar('height', arg);
      } else {
          return this.host.jqxProgressBar('height');
      }
   }

   layout(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxProgressBar('layout', arg);
      } else {
          return this.host.jqxProgressBar('layout');
      }
   }

   max(arg?: string  | number): string  | number {
      if (arg !== undefined) {
          this.host.jqxProgressBar('max', arg);
      } else {
          return this.host.jqxProgressBar('max');
      }
   }

   min(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxProgressBar('min', arg);
      } else {
          return this.host.jqxProgressBar('min');
      }
   }

   orientation(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxProgressBar('orientation', arg);
      } else {
          return this.host.jqxProgressBar('orientation');
      }
   }

   rtl(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxProgressBar('rtl', arg);
      } else {
          return this.host.jqxProgressBar('rtl');
      }
   }

   renderText(arg?: (text?: jqwidgets.ProgressBarRenderText['text'], value?: jqwidgets.ProgressBarRenderText['value']) => string): (text?: jqwidgets.ProgressBarRenderText['text'], value?: jqwidgets.ProgressBarRenderText['value']) => string {
      if (arg !== undefined) {
          this.host.jqxProgressBar('renderText', arg);
      } else {
          return this.host.jqxProgressBar('renderText');
      }
   }

   showText(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxProgressBar('showText', arg);
      } else {
          return this.host.jqxProgressBar('showText');
      }
   }

   template(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxProgressBar('template', arg);
      } else {
          return this.host.jqxProgressBar('template');
      }
   }

   theme(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxProgressBar('theme', arg);
      } else {
          return this.host.jqxProgressBar('theme');
      }
   }

   value(arg?: string | number): string | number {
      if (arg !== undefined) {
          this.host.jqxProgressBar('value', arg);
      } else {
          return this.host.jqxProgressBar('value');
      }
   }

   width(arg?: string | number): string | number {
      if (arg !== undefined) {
          this.host.jqxProgressBar('width', arg);
      } else {
          return this.host.jqxProgressBar('width');
      }
   }


   // jqxProgressBarComponent functions
   actualValue(value: number | string): void {
      this.host.jqxProgressBar('actualValue', value);
   }

   destroy(): void {
      this.host.jqxProgressBar('destroy');
   }

   val(value?: number | string): any {
      if (value !== undefined) {
         return this.host.jqxProgressBar('val', value);
      } else {
         return this.host.jqxProgressBar('val');
      }
   };


   // jqxProgressBarComponent events
   @Output() onComplete = new EventEmitter();
   @Output() onInvalidValue = new EventEmitter();
   @Output() onValueChanged = new EventEmitter();

   __wireEvents__(): void {
      this.host.on('complete', (eventData: any) => { this.onComplete.emit(eventData); });
      this.host.on('invalidValue', (eventData: any) => { this.onInvalidValue.emit(eventData); });
      this.host.on('valueChanged', (eventData: any) => { this.onValueChanged.emit(eventData); });
   }

} //jqxProgressBarComponent


