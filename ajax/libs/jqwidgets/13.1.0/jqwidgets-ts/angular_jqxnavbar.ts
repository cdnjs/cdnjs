/*
jQWidgets v13.1.0 (2021-Nov)
Copyright (c) 2011-2021 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

/// <reference path="jqwidgets.d.ts" />

import '../jqwidgets/jqxcore.js';
import '../jqwidgets/jqxnavbar.js';

import { Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
declare let JQXLite: any;

@Component({
    selector: 'jqxNavBar',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxNavBarComponent implements OnChanges
{
   @Input('columns') attrColumns: Array<string>;
   @Input('disabled') attrDisabled: boolean;
   @Input('minimized') attrMinimized: boolean;
   @Input('minimizeButtonPosition') attrMinimizeButtonPosition: string;
   @Input('minimizedHeight') attrMinimizedHeight: number | string;
   @Input('minimizedTitle') attrMinimizedTitle: number | string;
   @Input('orientation') attrOrientation: string;
   @Input('popupAnimationDelay') attrPopupAnimationDelay: number;
   @Input('rtl') attrRtl: boolean;
   @Input('selection') attrSelection: boolean;
   @Input('selectedItem') attrSelectedItem: number | string;
   @Input('theme') attrTheme: string;
   @Input('width') attrWidth: string | number;
   @Input('height') attrHeight: string | number;

   @Input('auto-create') autoCreate: boolean = true;

   properties: string[] = ['columns','disabled','height','minimized','minimizeButtonPosition','minimizedHeight','minimizedTitle','orientation','popupAnimationDelay','rtl','selection','selectedItem','theme','width'];
   host: any;
   elementRef: ElementRef;
   widgetObject:  jqwidgets.jqxNavBar;

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
                     areEqual = this.arraysEqual(this[attrName], this.host.jqxNavBar(this.properties[i]));
                  }
                  if (areEqual) {
                     return false;
                  }

                  this.host.jqxNavBar(this.properties[i], this[attrName]);
                  continue;
               }

               if (this[attrName] !== this.host.jqxNavBar(this.properties[i])) {
                  this.host.jqxNavBar(this.properties[i], this[attrName]); 
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
      this.widgetObject = jqwidgets.createInstance(this.host, 'jqxNavBar', options);

   }

   createWidget(options?: any): void {
        this.createComponent(options);
   }

   __updateRect__() : void {
      if(this.host) this.host.css({ width: this.attrWidth, height: this.attrHeight });
   }

   setOptions(options: any) : void {
      this.host.jqxNavBar('setOptions', options);
   }

   // jqxNavBarComponent properties
   columns(arg?: Array<string>): Array<string> {
      if (arg !== undefined) {
          this.host.jqxNavBar('columns', arg);
      } else {
          return this.host.jqxNavBar('columns');
      }
   }

   disabled(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxNavBar('disabled', arg);
      } else {
          return this.host.jqxNavBar('disabled');
      }
   }

   height(arg?: string | number): string | number {
      if (arg !== undefined) {
          this.host.jqxNavBar('height', arg);
      } else {
          return this.host.jqxNavBar('height');
      }
   }

   minimized(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxNavBar('minimized', arg);
      } else {
          return this.host.jqxNavBar('minimized');
      }
   }

   minimizeButtonPosition(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxNavBar('minimizeButtonPosition', arg);
      } else {
          return this.host.jqxNavBar('minimizeButtonPosition');
      }
   }

   minimizedHeight(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxNavBar('minimizedHeight', arg);
      } else {
          return this.host.jqxNavBar('minimizedHeight');
      }
   }

   minimizedTitle(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxNavBar('minimizedTitle', arg);
      } else {
          return this.host.jqxNavBar('minimizedTitle');
      }
   }

   orientation(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxNavBar('orientation', arg);
      } else {
          return this.host.jqxNavBar('orientation');
      }
   }

   popupAnimationDelay(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxNavBar('popupAnimationDelay', arg);
      } else {
          return this.host.jqxNavBar('popupAnimationDelay');
      }
   }

   rtl(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxNavBar('rtl', arg);
      } else {
          return this.host.jqxNavBar('rtl');
      }
   }

   selection(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxNavBar('selection', arg);
      } else {
          return this.host.jqxNavBar('selection');
      }
   }

   selectedItem(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxNavBar('selectedItem', arg);
      } else {
          return this.host.jqxNavBar('selectedItem');
      }
   }

   theme(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxNavBar('theme', arg);
      } else {
          return this.host.jqxNavBar('theme');
      }
   }

   width(arg?: string | number): string | number {
      if (arg !== undefined) {
          this.host.jqxNavBar('width', arg);
      } else {
          return this.host.jqxNavBar('width');
      }
   }


   // jqxNavBarComponent functions
   close(): void {
      this.host.jqxNavBar('close');
   }

   destroy(): void {
      this.host.jqxNavBar('destroy');
   }

   getSelectedIndex(): number {
      return this.host.jqxNavBar('getSelectedIndex');
   }

   open(): void {
      this.host.jqxNavBar('open');
   }

   selectAt(index: number | string): void {
      this.host.jqxNavBar('selectAt', index);
   }


   // jqxNavBarComponent events
   @Output() onChange = new EventEmitter();

   __wireEvents__(): void {
      this.host.on('change', (eventData: any) => { this.onChange.emit(eventData); });
   }

} //jqxNavBarComponent


