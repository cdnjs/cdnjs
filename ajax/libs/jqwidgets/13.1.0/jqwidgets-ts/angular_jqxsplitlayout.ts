/*
jQWidgets v13.1.0 (2021-Nov)
Copyright (c) 2011-2021 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

/// <reference path="jqwidgets.d.ts" />

import '../jqwidgets/jqxcore.js';
import '../jqwidgets/jqxsplitlayout.js';

import { Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
declare let JQXLite: any;

@Component({
    selector: 'jqxSplitLayout',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxSplitLayoutComponent implements OnChanges
{
   @Input('disabled') attrDisabled: boolean;
   @Input('dataSource') attrDataSource: any;
   @Input('ready') attrReady: any;
   @Input('width') attrWidth: string | number;
   @Input('height') attrHeight: string | number;

   @Input('auto-create') autoCreate: boolean = true;

   properties: string[] = ['disabled','dataSource','ready','height','width'];
   host: any;
   elementRef: ElementRef;
   widgetObject:  jqwidgets.jqxSplitLayout;

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
                     areEqual = this.arraysEqual(this[attrName], this.host.jqxSplitLayout(this.properties[i]));
                  }
                  if (areEqual) {
                     return false;
                  }

                  this.host.jqxSplitLayout(this.properties[i], this[attrName]);
                  continue;
               }

               if (this[attrName] !== this.host.jqxSplitLayout(this.properties[i])) {
                  this.host.jqxSplitLayout(this.properties[i], this[attrName]); 
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
      this.widgetObject = jqwidgets.createInstance(this.host, 'jqxSplitLayout', options);

   }

   createWidget(options?: any): void {
        this.createComponent(options);
   }

   __updateRect__() : void {
      if(this.host) this.host.css({ width: this.attrWidth, height: this.attrHeight });
   }

   setOptions(options: any) : void {
      this.host.jqxSplitLayout('setOptions', options);
   }

   // jqxSplitLayoutComponent properties
   disabled(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxSplitLayout('disabled', arg);
      } else {
          return this.host.jqxSplitLayout('disabled');
      }
   }

   dataSource(arg?: any): any {
      if (arg !== undefined) {
          this.host.jqxSplitLayout('dataSource', arg);
      } else {
          return this.host.jqxSplitLayout('dataSource');
      }
   }

   ready(arg?: any): any {
      if (arg !== undefined) {
          this.host.jqxSplitLayout('ready', arg);
      } else {
          return this.host.jqxSplitLayout('ready');
      }
   }

   height(arg?: string | number): string | number {
      if (arg !== undefined) {
          this.host.jqxSplitLayout('height', arg);
      } else {
          return this.host.jqxSplitLayout('height');
      }
   }

   width(arg?: string | number): string | number {
      if (arg !== undefined) {
          this.host.jqxSplitLayout('width', arg);
      } else {
          return this.host.jqxSplitLayout('width');
      }
   }


   // jqxSplitLayoutComponent functions
   refresh(): void {
      this.host.jqxSplitLayout('refresh');
   }


   // jqxSplitLayoutComponent events
   @Output() onResize = new EventEmitter();
   @Output() onStateChange = new EventEmitter();

   __wireEvents__(): void {
      this.host.on('resize', (eventData: any) => { this.onResize.emit(eventData); });
      this.host.on('stateChange', (eventData: any) => { this.onStateChange.emit(eventData); });
   }

} //jqxSplitLayoutComponent


