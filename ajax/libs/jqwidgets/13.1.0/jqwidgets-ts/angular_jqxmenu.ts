/*
jQWidgets v13.1.0 (2021-Nov)
Copyright (c) 2011-2021 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

/// <reference path="jqwidgets.d.ts" />

import '../jqwidgets/jqxcore.js';
import '../jqwidgets/jqxdata.js';
import '../jqwidgets/jqxmenu.js';

import { Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
declare let JQXLite: any;

@Component({
    selector: 'jqxMenu',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxMenuComponent implements OnChanges
{
   @Input('animationShowDuration') attrAnimationShowDuration: number;
   @Input('animationHideDuration') attrAnimationHideDuration: number;
   @Input('animationHideDelay') attrAnimationHideDelay: number;
   @Input('animationShowDelay') attrAnimationShowDelay: number;
   @Input('autoCloseInterval') attrAutoCloseInterval: number;
   @Input('autoSizeMainItems') attrAutoSizeMainItems: boolean;
   @Input('autoCloseOnClick') attrAutoCloseOnClick: boolean;
   @Input('autoOpenPopup') attrAutoOpenPopup: boolean;
   @Input('autoOpen') attrAutoOpen: boolean;
   @Input('autoCloseOnMouseLeave') attrAutoCloseOnMouseLeave: boolean;
   @Input('clickToOpen') attrClickToOpen: boolean;
   @Input('disabled') attrDisabled: boolean;
   @Input('enableHover') attrEnableHover: boolean;
   @Input('easing') attrEasing: string;
   @Input('keyboardNavigation') attrKeyboardNavigation: boolean;
   @Input('minimizeWidth') attrMinimizeWidth: number | string;
   @Input('mode') attrMode: string;
   @Input('popupZIndex') attrPopupZIndex: number | string;
   @Input('rtl') attrRtl: boolean;
   @Input('showTopLevelArrows') attrShowTopLevelArrows: boolean;
   @Input('source') attrSource: any;
   @Input('theme') attrTheme: string;
   @Input('width') attrWidth: string | number;
   @Input('height') attrHeight: string | number;

   @Input('auto-create') autoCreate: boolean = true;

   properties: string[] = ['animationShowDuration','animationHideDuration','animationHideDelay','animationShowDelay','autoCloseInterval','autoSizeMainItems','autoCloseOnClick','autoOpenPopup','autoOpen','autoCloseOnMouseLeave','clickToOpen','disabled','enableHover','easing','height','keyboardNavigation','minimizeWidth','mode','popupZIndex','rtl','showTopLevelArrows','source','theme','width'];
   host: any;
   elementRef: ElementRef;
   widgetObject:  jqwidgets.jqxMenu;

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
                     areEqual = this.arraysEqual(this[attrName], this.host.jqxMenu(this.properties[i]));
                  }
                  if (areEqual) {
                     return false;
                  }

                  this.host.jqxMenu(this.properties[i], this[attrName]);
                  continue;
               }

               if (this[attrName] !== this.host.jqxMenu(this.properties[i])) {
                  this.host.jqxMenu(this.properties[i], this[attrName]); 
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
      this.widgetObject = jqwidgets.createInstance(this.host, 'jqxMenu', options);

   }

   createWidget(options?: any): void {
        this.createComponent(options);
   }

   __updateRect__() : void {
      if(this.host) this.host.css({ width: this.attrWidth, height: this.attrHeight });
   }

   setOptions(options: any) : void {
      this.host.jqxMenu('setOptions', options);
   }

   // jqxMenuComponent properties
   animationShowDuration(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxMenu('animationShowDuration', arg);
      } else {
          return this.host.jqxMenu('animationShowDuration');
      }
   }

   animationHideDuration(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxMenu('animationHideDuration', arg);
      } else {
          return this.host.jqxMenu('animationHideDuration');
      }
   }

   animationHideDelay(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxMenu('animationHideDelay', arg);
      } else {
          return this.host.jqxMenu('animationHideDelay');
      }
   }

   animationShowDelay(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxMenu('animationShowDelay', arg);
      } else {
          return this.host.jqxMenu('animationShowDelay');
      }
   }

   autoCloseInterval(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxMenu('autoCloseInterval', arg);
      } else {
          return this.host.jqxMenu('autoCloseInterval');
      }
   }

   autoSizeMainItems(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxMenu('autoSizeMainItems', arg);
      } else {
          return this.host.jqxMenu('autoSizeMainItems');
      }
   }

   autoCloseOnClick(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxMenu('autoCloseOnClick', arg);
      } else {
          return this.host.jqxMenu('autoCloseOnClick');
      }
   }

   autoOpenPopup(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxMenu('autoOpenPopup', arg);
      } else {
          return this.host.jqxMenu('autoOpenPopup');
      }
   }

   autoOpen(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxMenu('autoOpen', arg);
      } else {
          return this.host.jqxMenu('autoOpen');
      }
   }

   autoCloseOnMouseLeave(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxMenu('autoCloseOnMouseLeave', arg);
      } else {
          return this.host.jqxMenu('autoCloseOnMouseLeave');
      }
   }

   clickToOpen(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxMenu('clickToOpen', arg);
      } else {
          return this.host.jqxMenu('clickToOpen');
      }
   }

   disabled(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxMenu('disabled', arg);
      } else {
          return this.host.jqxMenu('disabled');
      }
   }

   enableHover(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxMenu('enableHover', arg);
      } else {
          return this.host.jqxMenu('enableHover');
      }
   }

   easing(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxMenu('easing', arg);
      } else {
          return this.host.jqxMenu('easing');
      }
   }

   height(arg?: string | number): string | number {
      if (arg !== undefined) {
          this.host.jqxMenu('height', arg);
      } else {
          return this.host.jqxMenu('height');
      }
   }

   keyboardNavigation(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxMenu('keyboardNavigation', arg);
      } else {
          return this.host.jqxMenu('keyboardNavigation');
      }
   }

   minimizeWidth(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxMenu('minimizeWidth', arg);
      } else {
          return this.host.jqxMenu('minimizeWidth');
      }
   }

   mode(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxMenu('mode', arg);
      } else {
          return this.host.jqxMenu('mode');
      }
   }

   popupZIndex(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxMenu('popupZIndex', arg);
      } else {
          return this.host.jqxMenu('popupZIndex');
      }
   }

   rtl(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxMenu('rtl', arg);
      } else {
          return this.host.jqxMenu('rtl');
      }
   }

   showTopLevelArrows(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxMenu('showTopLevelArrows', arg);
      } else {
          return this.host.jqxMenu('showTopLevelArrows');
      }
   }

   source(arg?: any): any {
      if (arg !== undefined) {
          this.host.jqxMenu('source', arg);
      } else {
          return this.host.jqxMenu('source');
      }
   }

   theme(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxMenu('theme', arg);
      } else {
          return this.host.jqxMenu('theme');
      }
   }

   width(arg?: string | number): string | number {
      if (arg !== undefined) {
          this.host.jqxMenu('width', arg);
      } else {
          return this.host.jqxMenu('width');
      }
   }


   // jqxMenuComponent functions
   closeItem(itemID: number | string): void {
      this.host.jqxMenu('closeItem', itemID);
   }

   close(): void {
      this.host.jqxMenu('close');
   }

   disable(itemID: number | string, value: boolean): void {
      this.host.jqxMenu('disable', itemID, value);
   }

   destroy(): void {
      this.host.jqxMenu('destroy');
   }

   focus(): void {
      this.host.jqxMenu('focus');
   }

   minimize(): void {
      this.host.jqxMenu('minimize');
   }

   open(left: number, top: number): void {
      this.host.jqxMenu('open', left, top);
   }

   openItem(itemID: number | string): void {
      this.host.jqxMenu('openItem', itemID);
   }

   restore(): void {
      this.host.jqxMenu('restore');
   }

   setItemOpenDirection(item: number | string, horizontaldirection: string, verticaldirection: string): void {
      this.host.jqxMenu('setItemOpenDirection', item, horizontaldirection, verticaldirection);
   }


   // jqxMenuComponent events
   @Output() onClosed = new EventEmitter();
   @Output() onItemclick = new EventEmitter();
   @Output() onShown = new EventEmitter();

   __wireEvents__(): void {
      this.host.on('closed', (eventData: any) => { this.onClosed.emit(eventData); });
      this.host.on('itemclick', (eventData: any) => { this.onItemclick.emit(eventData); });
      this.host.on('shown', (eventData: any) => { this.onShown.emit(eventData); });
   }

} //jqxMenuComponent


