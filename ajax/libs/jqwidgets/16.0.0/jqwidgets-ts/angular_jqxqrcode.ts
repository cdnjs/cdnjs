/*
jQWidgets v16.0.0 (2023-Mar)
Copyright (c) 2011-2023 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

/// <reference path="jqwidgets.d.ts" />

import '../jqwidgets/jqxcore.js';

import { Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
declare let JQXLite: any;

@Component({
    selector: 'jqxQRcode',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxQRcodeComponent implements OnChanges
{
   @Input('backgroundColor') attrBackgroundColor: string;
   @Input('displayLabel') attrDisplayLabel: boolean;
   @Input('embedImage') attrEmbedImage: string;
   @Input('errorLevel') attrErrorLevel: string;
   @Input('imageHeight') attrImageHeight: number;
   @Input('imageWidth') attrImageWidth: number;
   @Input('labelColor') attrLabelColor: string;
   @Input('labelFont') attrLabelFont: string;
   @Input('labelFontSize') attrLabelFontSize: number;
   @Input('labelMarginBottom') attrLabelMarginBottom: number;
   @Input('labelMarginTop') attrLabelMarginTop: number;
   @Input('labelPosition') attrLabelPosition: string;
   @Input('lineColor') attrLineColor: string;
   @Input('squareWidth') attrSquareWidth: number;
   @Input('renderAs') attrRenderAs: string;
   @Input('value') attrValue: string;
   @Input('width') attrWidth: string | number;
   @Input('height') attrHeight: string | number;

   @Input('auto-create') autoCreate: boolean = true;

   properties: string[] = ['backgroundColor','displayLabel','embedImage','errorLevel','imageHeight','imageWidth','labelColor','labelFont','labelFontSize','labelMarginBottom','labelMarginTop','labelPosition','lineColor','squareWidth','renderAs','value'];
   host: any;
   elementRef: ElementRef;
   widgetObject:  jqwidgets.jqxQRcode;

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
                     areEqual = this.arraysEqual(this[attrName], this.host.jqxQRcode(this.properties[i]));
                  }
                  if (areEqual) {
                     return false;
                  }

                  this.host.jqxQRcode(this.properties[i], this[attrName]);
                  continue;
               }

               if (this[attrName] !== this.host.jqxQRcode(this.properties[i])) {
                  this.host.jqxQRcode(this.properties[i], this[attrName]); 
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
      this.widgetObject = jqwidgets.createInstance(this.host, 'jqxQRcode', options);

   }

   createWidget(options?: any): void {
        this.createComponent(options);
   }

   __updateRect__() : void {
      if(this.host) this.host.css({ width: this.attrWidth, height: this.attrHeight });
   }

   setOptions(options: any) : void {
      this.host.jqxQRcode('setOptions', options);
   }

   // jqxQRcodeComponent properties
   backgroundColor(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxQRcode('backgroundColor', arg);
      } else {
          return this.host.jqxQRcode('backgroundColor');
      }
   }

   displayLabel(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxQRcode('displayLabel', arg);
      } else {
          return this.host.jqxQRcode('displayLabel');
      }
   }

   embedImage(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxQRcode('embedImage', arg);
      } else {
          return this.host.jqxQRcode('embedImage');
      }
   }

   errorLevel(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxQRcode('errorLevel', arg);
      } else {
          return this.host.jqxQRcode('errorLevel');
      }
   }

   imageHeight(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxQRcode('imageHeight', arg);
      } else {
          return this.host.jqxQRcode('imageHeight');
      }
   }

   imageWidth(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxQRcode('imageWidth', arg);
      } else {
          return this.host.jqxQRcode('imageWidth');
      }
   }

   labelColor(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxQRcode('labelColor', arg);
      } else {
          return this.host.jqxQRcode('labelColor');
      }
   }

   labelFont(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxQRcode('labelFont', arg);
      } else {
          return this.host.jqxQRcode('labelFont');
      }
   }

   labelFontSize(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxQRcode('labelFontSize', arg);
      } else {
          return this.host.jqxQRcode('labelFontSize');
      }
   }

   labelMarginBottom(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxQRcode('labelMarginBottom', arg);
      } else {
          return this.host.jqxQRcode('labelMarginBottom');
      }
   }

   labelMarginTop(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxQRcode('labelMarginTop', arg);
      } else {
          return this.host.jqxQRcode('labelMarginTop');
      }
   }

   labelPosition(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxQRcode('labelPosition', arg);
      } else {
          return this.host.jqxQRcode('labelPosition');
      }
   }

   lineColor(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxQRcode('lineColor', arg);
      } else {
          return this.host.jqxQRcode('lineColor');
      }
   }

   squareWidth(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxQRcode('squareWidth', arg);
      } else {
          return this.host.jqxQRcode('squareWidth');
      }
   }

   renderAs(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxQRcode('renderAs', arg);
      } else {
          return this.host.jqxQRcode('renderAs');
      }
   }

   value(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxQRcode('value', arg);
      } else {
          return this.host.jqxQRcode('value');
      }
   }


   // jqxQRcodeComponent functions
   export(format: string, fileName?: string): undefined {
      return this.host.jqxQRcode('export', format, fileName);
   }

   getDataURL(format: string): string {
      return this.host.jqxQRcode('getDataURL', format);
   }

   getDataURLAsync(format: string): any {
      return this.host.jqxQRcode('getDataURLAsync', format);
   }

   isValid(): boolean {
      return this.host.jqxQRcode('isValid');
   }


   // jqxQRcodeComponent events
   @Output() onInvalid = new EventEmitter();

   __wireEvents__(): void {
      this.host.on('invalid', (eventData: any) => { this.onInvalid.emit(eventData); });
   }

} //jqxQRcodeComponent


