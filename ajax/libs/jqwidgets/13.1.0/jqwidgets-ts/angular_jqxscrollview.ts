/*
jQWidgets v13.1.0 (2021-Nov)
Copyright (c) 2011-2021 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

/// <reference path="jqwidgets.d.ts" />

import '../jqwidgets/jqxcore.js';
import '../jqwidgets/jqxbuttons.js';
import '../jqwidgets/jqxscrollview.js';

import { Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
declare let JQXLite: any;

@Component({
    selector: 'jqxScrollView',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxScrollViewComponent implements OnChanges
{
   @Input('animationDuration') attrAnimationDuration: number;
   @Input('bounceEnabled') attrBounceEnabled: boolean;
   @Input('buttonsOffset') attrButtonsOffset: Array<number>;
   @Input('currentPage') attrCurrentPage: number;
   @Input('disabled') attrDisabled: boolean;
   @Input('moveThreshold') attrMoveThreshold: number;
   @Input('showButtons') attrShowButtons: boolean;
   @Input('slideShow') attrSlideShow: boolean;
   @Input('slideDuration') attrSlideDuration: number;
   @Input('theme') attrTheme: string;
   @Input('width') attrWidth: string | number;
   @Input('height') attrHeight: string | number;

   @Input('auto-create') autoCreate: boolean = true;

   properties: string[] = ['animationDuration','bounceEnabled','buttonsOffset','currentPage','disabled','height','moveThreshold','showButtons','slideShow','slideDuration','theme','width'];
   host: any;
   elementRef: ElementRef;
   widgetObject:  jqwidgets.jqxScrollView;

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
                     areEqual = this.arraysEqual(this[attrName], this.host.jqxScrollView(this.properties[i]));
                  }
                  if (areEqual) {
                     return false;
                  }

                  this.host.jqxScrollView(this.properties[i], this[attrName]);
                  continue;
               }

               if (this[attrName] !== this.host.jqxScrollView(this.properties[i])) {
                  this.host.jqxScrollView(this.properties[i], this[attrName]); 
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
      this.widgetObject = jqwidgets.createInstance(this.host, 'jqxScrollView', options);

   }

   createWidget(options?: any): void {
        this.createComponent(options);
   }

   __updateRect__() : void {
      if(this.host) this.host.css({ width: this.attrWidth, height: this.attrHeight });
   }

   setOptions(options: any) : void {
      this.host.jqxScrollView('setOptions', options);
   }

   // jqxScrollViewComponent properties
   animationDuration(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxScrollView('animationDuration', arg);
      } else {
          return this.host.jqxScrollView('animationDuration');
      }
   }

   bounceEnabled(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxScrollView('bounceEnabled', arg);
      } else {
          return this.host.jqxScrollView('bounceEnabled');
      }
   }

   buttonsOffset(arg?: Array<number>): Array<number> {
      if (arg !== undefined) {
          this.host.jqxScrollView('buttonsOffset', arg);
      } else {
          return this.host.jqxScrollView('buttonsOffset');
      }
   }

   currentPage(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxScrollView('currentPage', arg);
      } else {
          return this.host.jqxScrollView('currentPage');
      }
   }

   disabled(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxScrollView('disabled', arg);
      } else {
          return this.host.jqxScrollView('disabled');
      }
   }

   height(arg?: string | number): string | number {
      if (arg !== undefined) {
          this.host.jqxScrollView('height', arg);
      } else {
          return this.host.jqxScrollView('height');
      }
   }

   moveThreshold(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxScrollView('moveThreshold', arg);
      } else {
          return this.host.jqxScrollView('moveThreshold');
      }
   }

   showButtons(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxScrollView('showButtons', arg);
      } else {
          return this.host.jqxScrollView('showButtons');
      }
   }

   slideShow(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxScrollView('slideShow', arg);
      } else {
          return this.host.jqxScrollView('slideShow');
      }
   }

   slideDuration(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxScrollView('slideDuration', arg);
      } else {
          return this.host.jqxScrollView('slideDuration');
      }
   }

   theme(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxScrollView('theme', arg);
      } else {
          return this.host.jqxScrollView('theme');
      }
   }

   width(arg?: string | number): string | number {
      if (arg !== undefined) {
          this.host.jqxScrollView('width', arg);
      } else {
          return this.host.jqxScrollView('width');
      }
   }


   // jqxScrollViewComponent functions
   back(): void {
      this.host.jqxScrollView('back');
   }

   changePage(index: number): void {
      this.host.jqxScrollView('changePage', index);
   }

   forward(): void {
      this.host.jqxScrollView('forward');
   }

   refresh(): void {
      this.host.jqxScrollView('refresh');
   }


   // jqxScrollViewComponent events
   @Output() onPageChanged = new EventEmitter();

   __wireEvents__(): void {
      this.host.on('pageChanged', (eventData: any) => { this.onPageChanged.emit(eventData); });
   }

} //jqxScrollViewComponent


