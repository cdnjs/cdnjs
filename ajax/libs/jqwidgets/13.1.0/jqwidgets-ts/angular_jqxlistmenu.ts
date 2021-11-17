/*
jQWidgets v13.1.0 (2021-Nov)
Copyright (c) 2011-2021 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

/// <reference path="jqwidgets.d.ts" />

import '../jqwidgets/jqxcore.js';
import '../jqwidgets/jqxdata.js';
import '../jqwidgets/jqxbuttons.js';
import '../jqwidgets/jqxscrollbar.js';
import '../jqwidgets/jqxlistmenu.js';

import { Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
declare let JQXLite: any;

@Component({
    selector: 'jqxListMenu',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxListMenuComponent implements OnChanges
{
   @Input('alwaysShowNavigationArrows') attrAlwaysShowNavigationArrows: boolean;
   @Input('animationType') attrAnimationType: string;
   @Input('animationDuration') attrAnimationDuration: number | string;
   @Input('autoSeparators') attrAutoSeparators: boolean;
   @Input('backLabel') attrBackLabel: number | string;
   @Input('disabled') attrDisabled: boolean;
   @Input('enableScrolling') attrEnableScrolling: boolean;
   @Input('filterCallback') attrFilterCallback: (text:jqwidgets.ListMenuFilterCallback['text'], searchValue:jqwidgets.ListMenuFilterCallback['searchValue']) => boolean;
   @Input('headerAnimationDuration') attrHeaderAnimationDuration: number | string;
   @Input('placeHolder') attrPlaceHolder: number | string;
   @Input('readOnly') attrReadOnly: boolean;
   @Input('rtl') attrRtl: boolean;
   @Input('roundedCorners') attrRoundedCorners: boolean;
   @Input('showNavigationArrows') attrShowNavigationArrows: boolean;
   @Input('showFilter') attrShowFilter: boolean;
   @Input('showHeader') attrShowHeader: boolean;
   @Input('showBackButton') attrShowBackButton: boolean;
   @Input('theme') attrTheme: string;
   @Input('width') attrWidth: string | number;
   @Input('height') attrHeight: string | number;

   @Input('auto-create') autoCreate: boolean = true;

   properties: string[] = ['alwaysShowNavigationArrows','animationType','animationDuration','autoSeparators','backLabel','disabled','enableScrolling','filterCallback','height','headerAnimationDuration','placeHolder','readOnly','rtl','roundedCorners','showNavigationArrows','showFilter','showHeader','showBackButton','theme','width'];
   host: any;
   elementRef: ElementRef;
   widgetObject:  jqwidgets.jqxListMenu;

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
                     areEqual = this.arraysEqual(this[attrName], this.host.jqxListMenu(this.properties[i]));
                  }
                  if (areEqual) {
                     return false;
                  }

                  this.host.jqxListMenu(this.properties[i], this[attrName]);
                  continue;
               }

               if (this[attrName] !== this.host.jqxListMenu(this.properties[i])) {
                  this.host.jqxListMenu(this.properties[i], this[attrName]); 
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
      this.widgetObject = jqwidgets.createInstance(this.host, 'jqxListMenu', options);

   }

   createWidget(options?: any): void {
        this.createComponent(options);
   }

   __updateRect__() : void {
      if(this.host) this.host.css({ width: this.attrWidth, height: this.attrHeight });
   }

   setOptions(options: any) : void {
      this.host.jqxListMenu('setOptions', options);
   }

   // jqxListMenuComponent properties
   alwaysShowNavigationArrows(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxListMenu('alwaysShowNavigationArrows', arg);
      } else {
          return this.host.jqxListMenu('alwaysShowNavigationArrows');
      }
   }

   animationType(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxListMenu('animationType', arg);
      } else {
          return this.host.jqxListMenu('animationType');
      }
   }

   animationDuration(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxListMenu('animationDuration', arg);
      } else {
          return this.host.jqxListMenu('animationDuration');
      }
   }

   autoSeparators(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxListMenu('autoSeparators', arg);
      } else {
          return this.host.jqxListMenu('autoSeparators');
      }
   }

   backLabel(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxListMenu('backLabel', arg);
      } else {
          return this.host.jqxListMenu('backLabel');
      }
   }

   disabled(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxListMenu('disabled', arg);
      } else {
          return this.host.jqxListMenu('disabled');
      }
   }

   enableScrolling(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxListMenu('enableScrolling', arg);
      } else {
          return this.host.jqxListMenu('enableScrolling');
      }
   }

   filterCallback(arg?: (text:jqwidgets.ListMenuFilterCallback['text'], searchValue:jqwidgets.ListMenuFilterCallback['searchValue']) => boolean): (text:jqwidgets.ListMenuFilterCallback['text'], searchValue:jqwidgets.ListMenuFilterCallback['searchValue']) => boolean {
      if (arg !== undefined) {
          this.host.jqxListMenu('filterCallback', arg);
      } else {
          return this.host.jqxListMenu('filterCallback');
      }
   }

   height(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxListMenu('height', arg);
      } else {
          return this.host.jqxListMenu('height');
      }
   }

   headerAnimationDuration(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxListMenu('headerAnimationDuration', arg);
      } else {
          return this.host.jqxListMenu('headerAnimationDuration');
      }
   }

   placeHolder(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxListMenu('placeHolder', arg);
      } else {
          return this.host.jqxListMenu('placeHolder');
      }
   }

   readOnly(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxListMenu('readOnly', arg);
      } else {
          return this.host.jqxListMenu('readOnly');
      }
   }

   rtl(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxListMenu('rtl', arg);
      } else {
          return this.host.jqxListMenu('rtl');
      }
   }

   roundedCorners(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxListMenu('roundedCorners', arg);
      } else {
          return this.host.jqxListMenu('roundedCorners');
      }
   }

   showNavigationArrows(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxListMenu('showNavigationArrows', arg);
      } else {
          return this.host.jqxListMenu('showNavigationArrows');
      }
   }

   showFilter(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxListMenu('showFilter', arg);
      } else {
          return this.host.jqxListMenu('showFilter');
      }
   }

   showHeader(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxListMenu('showHeader', arg);
      } else {
          return this.host.jqxListMenu('showHeader');
      }
   }

   showBackButton(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxListMenu('showBackButton', arg);
      } else {
          return this.host.jqxListMenu('showBackButton');
      }
   }

   theme(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxListMenu('theme', arg);
      } else {
          return this.host.jqxListMenu('theme');
      }
   }

   width(arg?: string | number): string | number {
      if (arg !== undefined) {
          this.host.jqxListMenu('width', arg);
      } else {
          return this.host.jqxListMenu('width');
      }
   }


   // jqxListMenuComponent functions
   back(): void {
      this.host.jqxListMenu('back');
   }

   changePage(Item: any): void {
      this.host.jqxListMenu('changePage', Item);
   }

   destroy(): void {
      this.host.jqxListMenu('destroy');
   }


   __wireEvents__(): void {

   }

} //jqxListMenuComponent


