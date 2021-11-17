/*
jQWidgets v13.1.0 (2021-Nov)
Copyright (c) 2011-2021 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

/// <reference path="jqwidgets.d.ts" />

import '../jqwidgets/jqxcore.js';
import '../jqwidgets/jqxbuttons.js';
import '../jqwidgets/jqxnotification.js';

import { Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
declare let JQXLite: any;

@Component({
    selector: 'jqxNotification',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxNotificationComponent implements OnChanges
{
   @Input('appendContainer') attrAppendContainer: string;
   @Input('autoOpen') attrAutoOpen: boolean;
   @Input('animationOpenDelay') attrAnimationOpenDelay: number;
   @Input('animationCloseDelay') attrAnimationCloseDelay: number;
   @Input('autoClose') attrAutoClose: boolean;
   @Input('autoCloseDelay') attrAutoCloseDelay: number | string;
   @Input('blink') attrBlink: boolean;
   @Input('browserBoundsOffset') attrBrowserBoundsOffset: number;
   @Input('closeOnClick') attrCloseOnClick: boolean;
   @Input('disabled') attrDisabled: boolean;
   @Input('hoverOpacity') attrHoverOpacity: number;
   @Input('icon') attrIcon: jqwidgets.NotificationIcon;
   @Input('notificationOffset') attrNotificationOffset: number;
   @Input('opacity') attrOpacity: number;
   @Input('position') attrPosition: string;
   @Input('rtl') attrRtl: boolean;
   @Input('showCloseButton') attrShowCloseButton: boolean;
   @Input('template') attrTemplate: string;
   @Input('theme') attrTheme: string;
   @Input('width') attrWidth: string | number;
   @Input('height') attrHeight: string | number;

   @Input('auto-create') autoCreate: boolean = true;

   properties: string[] = ['appendContainer','autoOpen','animationOpenDelay','animationCloseDelay','autoClose','autoCloseDelay','blink','browserBoundsOffset','closeOnClick','disabled','height','hoverOpacity','icon','notificationOffset','opacity','position','rtl','showCloseButton','template','theme','width'];
   host: any;
   elementRef: ElementRef;
   widgetObject:  jqwidgets.jqxNotification;

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
                     areEqual = this.arraysEqual(this[attrName], this.host.jqxNotification(this.properties[i]));
                  }
                  if (areEqual) {
                     return false;
                  }

                  this.host.jqxNotification(this.properties[i], this[attrName]);
                  continue;
               }

               if (this[attrName] !== this.host.jqxNotification(this.properties[i])) {
                  this.host.jqxNotification(this.properties[i], this[attrName]); 
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
      this.widgetObject = jqwidgets.createInstance(this.host, 'jqxNotification', options);

   }

   createWidget(options?: any): void {
        this.createComponent(options);
   }

   __updateRect__() : void {
      if(this.host) this.host.css({ width: this.attrWidth, height: this.attrHeight });
   }

   setOptions(options: any) : void {
      this.host.jqxNotification('setOptions', options);
   }

   // jqxNotificationComponent properties
   appendContainer(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxNotification('appendContainer', arg);
      } else {
          return this.host.jqxNotification('appendContainer');
      }
   }

   autoOpen(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxNotification('autoOpen', arg);
      } else {
          return this.host.jqxNotification('autoOpen');
      }
   }

   animationOpenDelay(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxNotification('animationOpenDelay', arg);
      } else {
          return this.host.jqxNotification('animationOpenDelay');
      }
   }

   animationCloseDelay(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxNotification('animationCloseDelay', arg);
      } else {
          return this.host.jqxNotification('animationCloseDelay');
      }
   }

   autoClose(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxNotification('autoClose', arg);
      } else {
          return this.host.jqxNotification('autoClose');
      }
   }

   autoCloseDelay(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxNotification('autoCloseDelay', arg);
      } else {
          return this.host.jqxNotification('autoCloseDelay');
      }
   }

   blink(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxNotification('blink', arg);
      } else {
          return this.host.jqxNotification('blink');
      }
   }

   browserBoundsOffset(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxNotification('browserBoundsOffset', arg);
      } else {
          return this.host.jqxNotification('browserBoundsOffset');
      }
   }

   closeOnClick(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxNotification('closeOnClick', arg);
      } else {
          return this.host.jqxNotification('closeOnClick');
      }
   }

   disabled(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxNotification('disabled', arg);
      } else {
          return this.host.jqxNotification('disabled');
      }
   }

   height(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxNotification('height', arg);
      } else {
          return this.host.jqxNotification('height');
      }
   }

   hoverOpacity(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxNotification('hoverOpacity', arg);
      } else {
          return this.host.jqxNotification('hoverOpacity');
      }
   }

   icon(arg?: jqwidgets.NotificationIcon): jqwidgets.NotificationIcon {
      if (arg !== undefined) {
          this.host.jqxNotification('icon', arg);
      } else {
          return this.host.jqxNotification('icon');
      }
   }

   notificationOffset(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxNotification('notificationOffset', arg);
      } else {
          return this.host.jqxNotification('notificationOffset');
      }
   }

   opacity(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxNotification('opacity', arg);
      } else {
          return this.host.jqxNotification('opacity');
      }
   }

   position(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxNotification('position', arg);
      } else {
          return this.host.jqxNotification('position');
      }
   }

   rtl(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxNotification('rtl', arg);
      } else {
          return this.host.jqxNotification('rtl');
      }
   }

   showCloseButton(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxNotification('showCloseButton', arg);
      } else {
          return this.host.jqxNotification('showCloseButton');
      }
   }

   template(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxNotification('template', arg);
      } else {
          return this.host.jqxNotification('template');
      }
   }

   theme(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxNotification('theme', arg);
      } else {
          return this.host.jqxNotification('theme');
      }
   }

   width(arg?: string | number): string | number {
      if (arg !== undefined) {
          this.host.jqxNotification('width', arg);
      } else {
          return this.host.jqxNotification('width');
      }
   }


   // jqxNotificationComponent functions
   closeAll(): void {
      this.host.jqxNotification('closeAll');
   }

   closeLast(): void {
      this.host.jqxNotification('closeLast');
   }

   destroy(): void {
      this.host.jqxNotification('destroy');
   }

   open(): void {
      this.host.jqxNotification('open');
   }

   refresh(): void {
      this.host.jqxNotification('refresh');
   }

   render(): void {
      this.host.jqxNotification('render');
   }


   // jqxNotificationComponent events
   @Output() onClose = new EventEmitter();
   @Output() onClick = new EventEmitter();
   @Output() onOpen = new EventEmitter();

   __wireEvents__(): void {
      this.host.on('close', (eventData: any) => { this.onClose.emit(eventData); });
      this.host.on('click', (eventData: any) => { this.onClick.emit(eventData); });
      this.host.on('open', (eventData: any) => { this.onOpen.emit(eventData); });
   }

} //jqxNotificationComponent


