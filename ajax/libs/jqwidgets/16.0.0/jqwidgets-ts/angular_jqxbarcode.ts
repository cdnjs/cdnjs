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
    selector: 'jqxBarcode',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxBarcodeComponent implements OnChanges
{
   @Input('backgroundColor') attrBackgroundColor: string;
   @Input('displayLabel') attrDisplayLabel: boolean;
   @Input('labelColor') attrLabelColor: string;
   @Input('labelFont') attrLabelFont: string;
   @Input('labelFontSize') attrLabelFontSize: number;
   @Input('labelMarginBottom') attrLabelMarginBottom: number;
   @Input('labelMarginTop') attrLabelMarginTop: number;
   @Input('labelPosition') attrLabelPosition: string;
   @Input('lineColor') attrLineColor: string;
   @Input('lineHeight') attrLineHeight: number;
   @Input('lineWidth') attrLineWidth: number;
   @Input('renderAs') attrRenderAs: string;
   @Input('type') attrType: string;
   @Input('value') attrValue: string;
   @Input('width') attrWidth: string | number;
   @Input('height') attrHeight: string | number;

   @Input('auto-create') autoCreate: boolean = true;

   properties: string[] = ['backgroundColor','displayLabel','labelColor','labelFont','labelFontSize','labelMarginBottom','labelMarginTop','labelPosition','lineColor','lineHeight','lineWidth','renderAs','type','value'];
   host: any;
   elementRef: ElementRef;
   widgetObject:  jqwidgets.jqxBarcode;

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
                     areEqual = this.arraysEqual(this[attrName], this.host.jqxBarcode(this.properties[i]));
                  }
                  if (areEqual) {
                     return false;
                  }

                  this.host.jqxBarcode(this.properties[i], this[attrName]);
                  continue;
               }

               if (this[attrName] !== this.host.jqxBarcode(this.properties[i])) {
                  this.host.jqxBarcode(this.properties[i], this[attrName]); 
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
      this.widgetObject = jqwidgets.createInstance(this.host, 'jqxBarcode', options);

   }

   createWidget(options?: any): void {
        this.createComponent(options);
   }

   __updateRect__() : void {
      if(this.host) this.host.css({ width: this.attrWidth, height: this.attrHeight });
   }

   setOptions(options: any) : void {
      this.host.jqxBarcode('setOptions', options);
   }

   // jqxBarcodeComponent properties
   backgroundColor(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxBarcode('backgroundColor', arg);
      } else {
          return this.host.jqxBarcode('backgroundColor');
      }
   }

   displayLabel(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxBarcode('displayLabel', arg);
      } else {
          return this.host.jqxBarcode('displayLabel');
      }
   }

   labelColor(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxBarcode('labelColor', arg);
      } else {
          return this.host.jqxBarcode('labelColor');
      }
   }

   labelFont(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxBarcode('labelFont', arg);
      } else {
          return this.host.jqxBarcode('labelFont');
      }
   }

   labelFontSize(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxBarcode('labelFontSize', arg);
      } else {
          return this.host.jqxBarcode('labelFontSize');
      }
   }

   labelMarginBottom(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxBarcode('labelMarginBottom', arg);
      } else {
          return this.host.jqxBarcode('labelMarginBottom');
      }
   }

   labelMarginTop(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxBarcode('labelMarginTop', arg);
      } else {
          return this.host.jqxBarcode('labelMarginTop');
      }
   }

   labelPosition(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxBarcode('labelPosition', arg);
      } else {
          return this.host.jqxBarcode('labelPosition');
      }
   }

   lineColor(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxBarcode('lineColor', arg);
      } else {
          return this.host.jqxBarcode('lineColor');
      }
   }

   lineHeight(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxBarcode('lineHeight', arg);
      } else {
          return this.host.jqxBarcode('lineHeight');
      }
   }

   lineWidth(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxBarcode('lineWidth', arg);
      } else {
          return this.host.jqxBarcode('lineWidth');
      }
   }

   renderAs(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxBarcode('renderAs', arg);
      } else {
          return this.host.jqxBarcode('renderAs');
      }
   }

   type(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxBarcode('type', arg);
      } else {
          return this.host.jqxBarcode('type');
      }
   }

   value(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxBarcode('value', arg);
      } else {
          return this.host.jqxBarcode('value');
      }
   }


   // jqxBarcodeComponent functions
   export(format: string, fileName?: string): undefined {
      return this.host.jqxBarcode('export', format, fileName);
   }

   getDataURL(format: string): string {
      return this.host.jqxBarcode('getDataURL', format);
   }

   getDataURLAsync(format: string): any {
      return this.host.jqxBarcode('getDataURLAsync', format);
   }

   isValid(): boolean {
      return this.host.jqxBarcode('isValid');
   }


   // jqxBarcodeComponent events
   @Output() onInvalid = new EventEmitter();

   __wireEvents__(): void {
      this.host.on('invalid', (eventData: any) => { this.onInvalid.emit(eventData); });
   }

} //jqxBarcodeComponent


