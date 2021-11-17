/*
jQWidgets v13.1.0 (2021-Nov)
Copyright (c) 2011-2021 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

/// <reference path="jqwidgets.d.ts" />

import '../jqwidgets/jqxcore.js';
import '../jqwidgets/jqxexpander.js';

import { Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
declare let JQXLite: any;

@Component({
    selector: 'jqxExpander',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxExpanderComponent implements OnChanges
{
   @Input('animationType') attrAnimationType: string;
   @Input('arrowPosition') attrArrowPosition: string;
   @Input('collapseAnimationDuration') attrCollapseAnimationDuration: number;
   @Input('disabled') attrDisabled: boolean;
   @Input('expanded') attrExpanded: boolean;
   @Input('expandAnimationDuration') attrExpandAnimationDuration: number;
   @Input('headerPosition') attrHeaderPosition: string;
   @Input('initContent') attrInitContent: () => void;
   @Input('rtl') attrRtl: boolean;
   @Input('showArrow') attrShowArrow: boolean;
   @Input('theme') attrTheme: string;
   @Input('toggleMode') attrToggleMode: string;
   @Input('width') attrWidth: string | number;
   @Input('height') attrHeight: string | number;

   @Input('auto-create') autoCreate: boolean = true;

   properties: string[] = ['animationType','arrowPosition','collapseAnimationDuration','disabled','expanded','expandAnimationDuration','height','headerPosition','initContent','rtl','showArrow','theme','toggleMode','width'];
   host: any;
   elementRef: ElementRef;
   widgetObject:  jqwidgets.jqxExpander;

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
                     areEqual = this.arraysEqual(this[attrName], this.host.jqxExpander(this.properties[i]));
                  }
                  if (areEqual) {
                     return false;
                  }

                  this.host.jqxExpander(this.properties[i], this[attrName]);
                  continue;
               }

               if (this[attrName] !== this.host.jqxExpander(this.properties[i])) {
                  this.host.jqxExpander(this.properties[i], this[attrName]); 
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
      this.widgetObject = jqwidgets.createInstance(this.host, 'jqxExpander', options);

   }

   createWidget(options?: any): void {
        this.createComponent(options);
   }

   __updateRect__() : void {
      if(this.host) this.host.css({ width: this.attrWidth, height: this.attrHeight });
   }

   setOptions(options: any) : void {
      this.host.jqxExpander('setOptions', options);
   }

   // jqxExpanderComponent properties
   animationType(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxExpander('animationType', arg);
      } else {
          return this.host.jqxExpander('animationType');
      }
   }

   arrowPosition(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxExpander('arrowPosition', arg);
      } else {
          return this.host.jqxExpander('arrowPosition');
      }
   }

   collapseAnimationDuration(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxExpander('collapseAnimationDuration', arg);
      } else {
          return this.host.jqxExpander('collapseAnimationDuration');
      }
   }

   disabled(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxExpander('disabled', arg);
      } else {
          return this.host.jqxExpander('disabled');
      }
   }

   expanded(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxExpander('expanded', arg);
      } else {
          return this.host.jqxExpander('expanded');
      }
   }

   expandAnimationDuration(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxExpander('expandAnimationDuration', arg);
      } else {
          return this.host.jqxExpander('expandAnimationDuration');
      }
   }

   height(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxExpander('height', arg);
      } else {
          return this.host.jqxExpander('height');
      }
   }

   headerPosition(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxExpander('headerPosition', arg);
      } else {
          return this.host.jqxExpander('headerPosition');
      }
   }

   initContent(arg?: () => void): () => void {
      if (arg !== undefined) {
          this.host.jqxExpander('initContent', arg);
      } else {
          return this.host.jqxExpander('initContent');
      }
   }

   rtl(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxExpander('rtl', arg);
      } else {
          return this.host.jqxExpander('rtl');
      }
   }

   showArrow(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxExpander('showArrow', arg);
      } else {
          return this.host.jqxExpander('showArrow');
      }
   }

   theme(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxExpander('theme', arg);
      } else {
          return this.host.jqxExpander('theme');
      }
   }

   toggleMode(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxExpander('toggleMode', arg);
      } else {
          return this.host.jqxExpander('toggleMode');
      }
   }

   width(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxExpander('width', arg);
      } else {
          return this.host.jqxExpander('width');
      }
   }


   // jqxExpanderComponent functions
   collapse(): void {
      this.host.jqxExpander('collapse');
   }

   disable(): void {
      this.host.jqxExpander('disable');
   }

   destroy(): void {
      this.host.jqxExpander('destroy');
   }

   enable(): void {
      this.host.jqxExpander('enable');
   }

   expand(): void {
      this.host.jqxExpander('expand');
   }

   focus(): void {
      this.host.jqxExpander('focus');
   }

   getContent(): string {
      return this.host.jqxExpander('getContent');
   }

   getHeaderContent(): string {
      return this.host.jqxExpander('getHeaderContent');
   }

   invalidate(): void {
      this.host.jqxExpander('invalidate');
   }

   refresh(): void {
      this.host.jqxExpander('refresh');
   }

   render(): void {
      this.host.jqxExpander('render');
   }

   setHeaderContent(headerContent: string): void {
      this.host.jqxExpander('setHeaderContent', headerContent);
   }

   setContent(content: string): void {
      this.host.jqxExpander('setContent', content);
   }


   // jqxExpanderComponent events
   @Output() onCollapsing = new EventEmitter();
   @Output() onCollapsed = new EventEmitter();
   @Output() onExpanding = new EventEmitter();
   @Output() onExpanded = new EventEmitter();

   __wireEvents__(): void {
      this.host.on('collapsing', (eventData: any) => { this.onCollapsing.emit(eventData); });
      this.host.on('collapsed', (eventData: any) => { this.onCollapsed.emit(eventData); });
      this.host.on('expanding', (eventData: any) => { this.onExpanding.emit(eventData); });
      this.host.on('expanded', (eventData: any) => { this.onExpanded.emit(eventData); });
   }

} //jqxExpanderComponent


