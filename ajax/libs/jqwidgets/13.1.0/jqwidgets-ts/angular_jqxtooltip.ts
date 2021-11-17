/*
jQWidgets v13.1.0 (2021-Nov)
Copyright (c) 2011-2021 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

/// <reference path="jqwidgets.d.ts" />

import '../jqwidgets/jqxcore.js';
import '../jqwidgets/jqxtooltip.js';

import { Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
declare let JQXLite: any;

@Component({
    selector: 'jqxTooltip',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxTooltipComponent implements OnChanges
{
   @Input('absolutePositionX') attrAbsolutePositionX: number;
   @Input('absolutePositionY') attrAbsolutePositionY: number;
   @Input('autoHide') attrAutoHide: boolean;
   @Input('autoHideDelay') attrAutoHideDelay: number;
   @Input('animationShowDelay') attrAnimationShowDelay: number | string;
   @Input('animationHideDelay') attrAnimationHideDelay: number | string;
   @Input('content') attrContent: string;
   @Input('closeOnClick') attrCloseOnClick: boolean;
   @Input('disabled') attrDisabled: boolean;
   @Input('enableBrowserBoundsDetection') attrEnableBrowserBoundsDetection: boolean;
   @Input('left') attrLeft: number;
   @Input('name') attrName: string;
   @Input('opacity') attrOpacity: number;
   @Input('position') attrPosition: string;
   @Input('rtl') attrRtl: boolean;
   @Input('showDelay') attrShowDelay: number;
   @Input('showArrow') attrShowArrow: boolean;
   @Input('top') attrTop: number | string;
   @Input('trigger') attrTrigger: string;
   @Input('theme') attrTheme: string;
   @Input('width') attrWidth: string | number;
   @Input('height') attrHeight: string | number;

   @Input('auto-create') autoCreate: boolean = true;

   properties: string[] = ['absolutePositionX','absolutePositionY','autoHide','autoHideDelay','animationShowDelay','animationHideDelay','content','closeOnClick','disabled','enableBrowserBoundsDetection','height','left','name','opacity','position','rtl','showDelay','showArrow','top','trigger','theme','width'];
   host: any;
   elementRef: ElementRef;
   widgetObject:  jqwidgets.jqxTooltip;

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
                     areEqual = this.arraysEqual(this[attrName], this.host.jqxTooltip(this.properties[i]));
                  }
                  if (areEqual) {
                     return false;
                  }

                  this.host.jqxTooltip(this.properties[i], this[attrName]);
                  continue;
               }

               if (this[attrName] !== this.host.jqxTooltip(this.properties[i])) {
                  this.host.jqxTooltip(this.properties[i], this[attrName]); 
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
      this.widgetObject = jqwidgets.createInstance(this.host, 'jqxTooltip', options);

   }

   createWidget(options?: any): void {
        this.createComponent(options);
   }

   __updateRect__() : void {
      if(this.host) this.host.css({ width: this.attrWidth, height: this.attrHeight });
   }

   setOptions(options: any) : void {
      this.host.jqxTooltip('setOptions', options);
   }

   // jqxTooltipComponent properties
   absolutePositionX(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxTooltip('absolutePositionX', arg);
      } else {
          return this.host.jqxTooltip('absolutePositionX');
      }
   }

   absolutePositionY(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxTooltip('absolutePositionY', arg);
      } else {
          return this.host.jqxTooltip('absolutePositionY');
      }
   }

   autoHide(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxTooltip('autoHide', arg);
      } else {
          return this.host.jqxTooltip('autoHide');
      }
   }

   autoHideDelay(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxTooltip('autoHideDelay', arg);
      } else {
          return this.host.jqxTooltip('autoHideDelay');
      }
   }

   animationShowDelay(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxTooltip('animationShowDelay', arg);
      } else {
          return this.host.jqxTooltip('animationShowDelay');
      }
   }

   animationHideDelay(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxTooltip('animationHideDelay', arg);
      } else {
          return this.host.jqxTooltip('animationHideDelay');
      }
   }

   content(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxTooltip('content', arg);
      } else {
          return this.host.jqxTooltip('content');
      }
   }

   closeOnClick(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxTooltip('closeOnClick', arg);
      } else {
          return this.host.jqxTooltip('closeOnClick');
      }
   }

   disabled(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxTooltip('disabled', arg);
      } else {
          return this.host.jqxTooltip('disabled');
      }
   }

   enableBrowserBoundsDetection(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxTooltip('enableBrowserBoundsDetection', arg);
      } else {
          return this.host.jqxTooltip('enableBrowserBoundsDetection');
      }
   }

   height(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxTooltip('height', arg);
      } else {
          return this.host.jqxTooltip('height');
      }
   }

   left(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxTooltip('left', arg);
      } else {
          return this.host.jqxTooltip('left');
      }
   }

   name(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxTooltip('name', arg);
      } else {
          return this.host.jqxTooltip('name');
      }
   }

   opacity(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxTooltip('opacity', arg);
      } else {
          return this.host.jqxTooltip('opacity');
      }
   }

   position(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxTooltip('position', arg);
      } else {
          return this.host.jqxTooltip('position');
      }
   }

   rtl(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxTooltip('rtl', arg);
      } else {
          return this.host.jqxTooltip('rtl');
      }
   }

   showDelay(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxTooltip('showDelay', arg);
      } else {
          return this.host.jqxTooltip('showDelay');
      }
   }

   showArrow(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxTooltip('showArrow', arg);
      } else {
          return this.host.jqxTooltip('showArrow');
      }
   }

   top(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxTooltip('top', arg);
      } else {
          return this.host.jqxTooltip('top');
      }
   }

   trigger(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxTooltip('trigger', arg);
      } else {
          return this.host.jqxTooltip('trigger');
      }
   }

   theme(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxTooltip('theme', arg);
      } else {
          return this.host.jqxTooltip('theme');
      }
   }

   width(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxTooltip('width', arg);
      } else {
          return this.host.jqxTooltip('width');
      }
   }


   // jqxTooltipComponent functions
   close(index?: number): void {
      this.host.jqxTooltip('close', index);
   }

   destroy(): void {
      this.host.jqxTooltip('destroy');
   }

   open(left?: number, top?: number): void {
      this.host.jqxTooltip('open', left, top);
   }

   refresh(): void {
      this.host.jqxTooltip('refresh');
   }


   // jqxTooltipComponent events
   @Output() onClose = new EventEmitter();
   @Output() onClosing = new EventEmitter();
   @Output() onOpen = new EventEmitter();
   @Output() onOpening = new EventEmitter();

   __wireEvents__(): void {
      this.host.on('close', (eventData: any) => { this.onClose.emit(eventData); });
      this.host.on('closing', (eventData: any) => { this.onClosing.emit(eventData); });
      this.host.on('open', (eventData: any) => { this.onOpen.emit(eventData); });
      this.host.on('opening', (eventData: any) => { this.onOpening.emit(eventData); });
   }

} //jqxTooltipComponent


