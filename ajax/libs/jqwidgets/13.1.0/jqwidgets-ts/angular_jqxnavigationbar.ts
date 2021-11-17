/*
jQWidgets v13.1.0 (2021-Nov)
Copyright (c) 2011-2021 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

/// <reference path="jqwidgets.d.ts" />

import '../jqwidgets/jqxcore.js';
import '../jqwidgets/jqxnavigationbar.js';

import { Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
declare let JQXLite: any;

@Component({
    selector: 'jqxNavigationBar',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxNavigationBarComponent implements OnChanges
{
   @Input('animationType') attrAnimationType: string;
   @Input('arrowPosition') attrArrowPosition: string;
   @Input('collapseAnimationDuration') attrCollapseAnimationDuration: number;
   @Input('disabled') attrDisabled: boolean;
   @Input('expandAnimationDuration') attrExpandAnimationDuration: number;
   @Input('expandMode') attrExpandMode: string;
   @Input('expandedIndexes') attrExpandedIndexes: Array<number>;
   @Input('initContent') attrInitContent: (index:number) => void;
   @Input('rtl') attrRtl: boolean;
   @Input('showArrow') attrShowArrow: boolean;
   @Input('theme') attrTheme: string;
   @Input('toggleMode') attrToggleMode: string;
   @Input('width') attrWidth: string | number;
   @Input('height') attrHeight: string | number;

   @Input('auto-create') autoCreate: boolean = true;

   properties: string[] = ['animationType','arrowPosition','collapseAnimationDuration','disabled','expandAnimationDuration','expandMode','expandedIndexes','height','initContent','rtl','showArrow','theme','toggleMode','width'];
   host: any;
   elementRef: ElementRef;
   widgetObject:  jqwidgets.jqxNavigationBar;

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
                     areEqual = this.arraysEqual(this[attrName], this.host.jqxNavigationBar(this.properties[i]));
                  }
                  if (areEqual) {
                     return false;
                  }

                  this.host.jqxNavigationBar(this.properties[i], this[attrName]);
                  continue;
               }

               if (this[attrName] !== this.host.jqxNavigationBar(this.properties[i])) {
                  this.host.jqxNavigationBar(this.properties[i], this[attrName]); 
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
      this.widgetObject = jqwidgets.createInstance(this.host, 'jqxNavigationBar', options);

   }

   createWidget(options?: any): void {
        this.createComponent(options);
   }

   __updateRect__() : void {
      if(this.host) this.host.css({ width: this.attrWidth, height: this.attrHeight });
   }

   setOptions(options: any) : void {
      this.host.jqxNavigationBar('setOptions', options);
   }

   // jqxNavigationBarComponent properties
   animationType(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxNavigationBar('animationType', arg);
      } else {
          return this.host.jqxNavigationBar('animationType');
      }
   }

   arrowPosition(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxNavigationBar('arrowPosition', arg);
      } else {
          return this.host.jqxNavigationBar('arrowPosition');
      }
   }

   collapseAnimationDuration(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxNavigationBar('collapseAnimationDuration', arg);
      } else {
          return this.host.jqxNavigationBar('collapseAnimationDuration');
      }
   }

   disabled(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxNavigationBar('disabled', arg);
      } else {
          return this.host.jqxNavigationBar('disabled');
      }
   }

   expandAnimationDuration(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxNavigationBar('expandAnimationDuration', arg);
      } else {
          return this.host.jqxNavigationBar('expandAnimationDuration');
      }
   }

   expandMode(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxNavigationBar('expandMode', arg);
      } else {
          return this.host.jqxNavigationBar('expandMode');
      }
   }

   expandedIndexes(arg?: Array<number>): Array<number> {
      if (arg !== undefined) {
          this.host.jqxNavigationBar('expandedIndexes', arg);
      } else {
          return this.host.jqxNavigationBar('expandedIndexes');
      }
   }

   height(arg?: string | number): string | number {
      if (arg !== undefined) {
          this.host.jqxNavigationBar('height', arg);
      } else {
          return this.host.jqxNavigationBar('height');
      }
   }

   initContent(arg?: (index:number) => void): (index:number) => void {
      if (arg !== undefined) {
          this.host.jqxNavigationBar('initContent', arg);
      } else {
          return this.host.jqxNavigationBar('initContent');
      }
   }

   rtl(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxNavigationBar('rtl', arg);
      } else {
          return this.host.jqxNavigationBar('rtl');
      }
   }

   showArrow(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxNavigationBar('showArrow', arg);
      } else {
          return this.host.jqxNavigationBar('showArrow');
      }
   }

   theme(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxNavigationBar('theme', arg);
      } else {
          return this.host.jqxNavigationBar('theme');
      }
   }

   toggleMode(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxNavigationBar('toggleMode', arg);
      } else {
          return this.host.jqxNavigationBar('toggleMode');
      }
   }

   width(arg?: string | number): string | number {
      if (arg !== undefined) {
          this.host.jqxNavigationBar('width', arg);
      } else {
          return this.host.jqxNavigationBar('width');
      }
   }


   // jqxNavigationBarComponent functions
   add(header: number | string, content: number | string): void {
      this.host.jqxNavigationBar('add', header, content);
   }

   collapseAt(index: number | string): void {
      this.host.jqxNavigationBar('collapseAt', index);
   }

   disableAt(index: number | string): void {
      this.host.jqxNavigationBar('disableAt', index);
   }

   disable(): void {
      this.host.jqxNavigationBar('disable');
   }

   destroy(): void {
      this.host.jqxNavigationBar('destroy');
   }

   expandAt(index: number | string): void {
      this.host.jqxNavigationBar('expandAt', index);
   }

   enableAt(index: number | string): void {
      this.host.jqxNavigationBar('enableAt', index);
   }

   enable(): void {
      this.host.jqxNavigationBar('enable');
   }

   focus(): void {
      this.host.jqxNavigationBar('focus');
   }

   getHeaderContentAt(index: number | string): string {
      return this.host.jqxNavigationBar('getHeaderContentAt', index);
   }

   getContentAt(index: number | string): string {
      return this.host.jqxNavigationBar('getContentAt', index);
   }

   hideArrowAt(index: number | string): void {
      this.host.jqxNavigationBar('hideArrowAt', index);
   }

   invalidate(): void {
      this.host.jqxNavigationBar('invalidate');
   }

   insert(Index: number, header: number | string, content: number | string): void {
      this.host.jqxNavigationBar('insert', Index, header, content);
   }

   refresh(): void {
      this.host.jqxNavigationBar('refresh');
   }

   render(): void {
      this.host.jqxNavigationBar('render');
   }

   remove(index: number | string): void {
      this.host.jqxNavigationBar('remove', index);
   }

   setContentAt(index: number, item: number | string): void {
      this.host.jqxNavigationBar('setContentAt', index, item);
   }

   setHeaderContentAt(index: number, item: number | string): void {
      this.host.jqxNavigationBar('setHeaderContentAt', index, item);
   }

   showArrowAt(index: number | string): void {
      this.host.jqxNavigationBar('showArrowAt', index);
   }

   update(index: number, header: number | string, content: number | string): void {
      this.host.jqxNavigationBar('update', index, header, content);
   }

   val(value?: number | string): any {
      if (value !== undefined) {
         return this.host.jqxNavigationBar('val', value);
      } else {
         return this.host.jqxNavigationBar('val');
      }
   };


   // jqxNavigationBarComponent events
   @Output() onCollapsingItem = new EventEmitter();
   @Output() onCollapsedItem = new EventEmitter();
   @Output() onExpandingItem = new EventEmitter();
   @Output() onExpandedItem = new EventEmitter();

   __wireEvents__(): void {
      this.host.on('collapsingItem', (eventData: any) => { this.onCollapsingItem.emit(eventData); });
      this.host.on('collapsedItem', (eventData: any) => { this.onCollapsedItem.emit(eventData); });
      this.host.on('expandingItem', (eventData: any) => { this.onExpandingItem.emit(eventData); });
      this.host.on('expandedItem', (eventData: any) => { this.onExpandedItem.emit(eventData); });
   }

} //jqxNavigationBarComponent


