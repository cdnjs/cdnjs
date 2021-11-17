/*
jQWidgets v13.1.0 (2021-Nov)
Copyright (c) 2011-2021 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

/// <reference path="jqwidgets.d.ts" />

import '../jqwidgets/jqxcore.js';
import '../jqwidgets/jqxdraw.js';

import { Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
declare let JQXLite: any;

@Component({
    selector: 'jqxDraw',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxDrawComponent implements OnChanges
{
   @Input('renderEngine') attrRenderEngine: string;
   @Input('width') attrWidth: string | number;
   @Input('height') attrHeight: string | number;

   @Input('auto-create') autoCreate: boolean = true;

   properties: string[] = ['renderEngine'];
   host: any;
   elementRef: ElementRef;
   widgetObject:  jqwidgets.jqxDraw;

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
                     areEqual = this.arraysEqual(this[attrName], this.host.jqxDraw(this.properties[i]));
                  }
                  if (areEqual) {
                     return false;
                  }

                  this.host.jqxDraw(this.properties[i], this[attrName]);
                  continue;
               }

               if (this[attrName] !== this.host.jqxDraw(this.properties[i])) {
                  this.host.jqxDraw(this.properties[i], this[attrName]); 
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

      this.host.append('div');
      this.host.css({ width: this.attrWidth, height: this.attrHeight });
      this.__wireEvents__();
      this.widgetObject = jqwidgets.createInstance(this.host, 'jqxDraw', options);

   }

   createWidget(options?: any): void {
        this.createComponent(options);
   }

   __updateRect__() : void {
      if(this.host) this.host.css({ width: this.attrWidth, height: this.attrHeight });
   }

   setOptions(options: any) : void {
      this.host.jqxDraw('setOptions', options);
   }

   // jqxDrawComponent properties
   renderEngine(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxDraw('renderEngine', arg);
      } else {
          return this.host.jqxDraw('renderEngine');
      }
   }


   // jqxDrawComponent functions
   attr(element?: any, attributes?: any): void {
      this.host.jqxDraw('attr', element, attributes);
   }

   circle(cx?: number, cy?: number, r?: number, attributes?: any): any {
      return this.host.jqxDraw('circle', cx, cy, r, attributes);
   }

   clear(): void {
      this.host.jqxDraw('clear');
   }

   getAttr(element?: any, attributes?: any): string {
      return this.host.jqxDraw('getAttr', element, attributes);
   }

   getSize(): any {
      return this.host.jqxDraw('getSize');
   }

   line(x1?: number, y1?: number, x2?: number, y2?: number, attributes?: any): any {
      return this.host.jqxDraw('line', x1, y1, x2, y2, attributes);
   }

   measureText(text?: string, angle?: number, attributes?: any): any {
      return this.host.jqxDraw('measureText', text, angle, attributes);
   }

   on(element?: any, event?: string, func?: any): void {
      this.host.jqxDraw('on', element, event, func);
   }

   off(element?: any, event?: string, func?: any): void {
      this.host.jqxDraw('off', element, event, func);
   }

   path(path?: string, attributes?: any): any {
      return this.host.jqxDraw('path', path, attributes);
   }

   pieslice(cx?: number, xy?: number, innerRadius?: any, outerRadius?: any, fromAngle?: number, endAngle?: number, centerOffset?: number, attributes?: any): any {
      return this.host.jqxDraw('pieslice', cx, xy, innerRadius, outerRadius, fromAngle, endAngle, centerOffset, attributes);
   }

   refresh(): void {
      this.host.jqxDraw('refresh');
   }

   rect(x?: number, y?: number, width?: number | string, height?: number | string, attributes?: any): any {
      return this.host.jqxDraw('rect', x, y, width, height, attributes);
   }

   saveAsJPEG(image?: string, url?: string): void {
      this.host.jqxDraw('saveAsJPEG', image, url);
   }

   saveAsPNG(image?: string, url?: string): void {
      this.host.jqxDraw('saveAsPNG', image, url);
   }

   text(text?: string, x?: number, y?: number, width?: number | string, height?: number | string, angle?: number, attributes?: any, clip?: boolean, halign?: string, valign?: string, rotateAround?: string): any {
      return this.host.jqxDraw('text', text, x, y, width, height, angle, attributes, clip, halign, valign, rotateAround);
   }


   // jqxDrawComponent events


   __wireEvents__(): void {

   }

} //jqxDrawComponent


