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
import '../jqwidgets/jqxribbon.js';

import { Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
declare let JQXLite: any;

@Component({
    selector: 'jqxRibbon',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxRibbonComponent implements OnChanges
{
   @Input('animationType') attrAnimationType: string;
   @Input('animationDelay') attrAnimationDelay: number | string;
   @Input('disabled') attrDisabled: boolean;
   @Input('initContent') attrInitContent: (index: any) => void;
   @Input('mode') attrMode: string;
   @Input('popupCloseMode') attrPopupCloseMode: string;
   @Input('position') attrPosition: string;
   @Input('reorder') attrReorder: boolean;
   @Input('rtl') attrRtl: boolean;
   @Input('selectedIndex') attrSelectedIndex: number;
   @Input('selectionMode') attrSelectionMode: string;
   @Input('scrollPosition') attrScrollPosition: string;
   @Input('scrollStep') attrScrollStep: number;
   @Input('scrollDelay') attrScrollDelay: number;
   @Input('theme') attrTheme: string;
   @Input('width') attrWidth: string | number;
   @Input('height') attrHeight: string | number;

   @Input('auto-create') autoCreate: boolean = true;

   properties: string[] = ['animationType','animationDelay','disabled','height','initContent','mode','popupCloseMode','position','reorder','rtl','selectedIndex','selectionMode','scrollPosition','scrollStep','scrollDelay','theme','width'];
   host: any;
   elementRef: ElementRef;
   widgetObject:  jqwidgets.jqxRibbon;

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
                     areEqual = this.arraysEqual(this[attrName], this.host.jqxRibbon(this.properties[i]));
                  }
                  if (areEqual) {
                     return false;
                  }

                  this.host.jqxRibbon(this.properties[i], this[attrName]);
                  continue;
               }

               if (this[attrName] !== this.host.jqxRibbon(this.properties[i])) {
                  this.host.jqxRibbon(this.properties[i], this[attrName]); 
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
      this.widgetObject = jqwidgets.createInstance(this.host, 'jqxRibbon', options);

   }

   createWidget(options?: any): void {
        this.createComponent(options);
   }

   __updateRect__() : void {
      if(this.host) this.host.css({ width: this.attrWidth, height: this.attrHeight });
   }

   setOptions(options: any) : void {
      this.host.jqxRibbon('setOptions', options);
   }

   // jqxRibbonComponent properties
   animationType(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxRibbon('animationType', arg);
      } else {
          return this.host.jqxRibbon('animationType');
      }
   }

   animationDelay(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxRibbon('animationDelay', arg);
      } else {
          return this.host.jqxRibbon('animationDelay');
      }
   }

   disabled(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxRibbon('disabled', arg);
      } else {
          return this.host.jqxRibbon('disabled');
      }
   }

   height(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxRibbon('height', arg);
      } else {
          return this.host.jqxRibbon('height');
      }
   }

   initContent(arg?: (index: any) => void): (index: any) => void {
      if (arg !== undefined) {
          this.host.jqxRibbon('initContent', arg);
      } else {
          return this.host.jqxRibbon('initContent');
      }
   }

   mode(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxRibbon('mode', arg);
      } else {
          return this.host.jqxRibbon('mode');
      }
   }

   popupCloseMode(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxRibbon('popupCloseMode', arg);
      } else {
          return this.host.jqxRibbon('popupCloseMode');
      }
   }

   position(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxRibbon('position', arg);
      } else {
          return this.host.jqxRibbon('position');
      }
   }

   reorder(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxRibbon('reorder', arg);
      } else {
          return this.host.jqxRibbon('reorder');
      }
   }

   rtl(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxRibbon('rtl', arg);
      } else {
          return this.host.jqxRibbon('rtl');
      }
   }

   selectedIndex(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxRibbon('selectedIndex', arg);
      } else {
          return this.host.jqxRibbon('selectedIndex');
      }
   }

   selectionMode(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxRibbon('selectionMode', arg);
      } else {
          return this.host.jqxRibbon('selectionMode');
      }
   }

   scrollPosition(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxRibbon('scrollPosition', arg);
      } else {
          return this.host.jqxRibbon('scrollPosition');
      }
   }

   scrollStep(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxRibbon('scrollStep', arg);
      } else {
          return this.host.jqxRibbon('scrollStep');
      }
   }

   scrollDelay(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxRibbon('scrollDelay', arg);
      } else {
          return this.host.jqxRibbon('scrollDelay');
      }
   }

   theme(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxRibbon('theme', arg);
      } else {
          return this.host.jqxRibbon('theme');
      }
   }

   width(arg?: string | number): string | number {
      if (arg !== undefined) {
          this.host.jqxRibbon('width', arg);
      } else {
          return this.host.jqxRibbon('width');
      }
   }


   // jqxRibbonComponent functions
   addAt(index: number, item: jqwidgets.RibbonItem): void {
      this.host.jqxRibbon('addAt', index, item);
   }

   clearSelection(): void {
      this.host.jqxRibbon('clearSelection');
   }

   disableAt(index: number): void {
      this.host.jqxRibbon('disableAt', index);
   }

   destroy(): void {
      this.host.jqxRibbon('destroy');
   }

   enableAt(index: number): void {
      this.host.jqxRibbon('enableAt', index);
   }

   hideAt(index: number): void {
      this.host.jqxRibbon('hideAt', index);
   }

   removeAt(index: number): void {
      this.host.jqxRibbon('removeAt', index);
   }

   render(): void {
      this.host.jqxRibbon('render');
   }

   refresh(): void {
      this.host.jqxRibbon('refresh');
   }

   selectAt(index: number): void {
      this.host.jqxRibbon('selectAt', index);
   }

   showAt(index: number): void {
      this.host.jqxRibbon('showAt', index);
   }

   setPopupLayout(index: number, layout: any, width: number | string, height: number | string): void {
      this.host.jqxRibbon('setPopupLayout', index, layout, width, height);
   }

   updateAt(index: number, item: jqwidgets.RibbonItem): void {
      this.host.jqxRibbon('updateAt', index, item);
   }

   val(value?: string): any {
      if (value !== undefined) {
         return this.host.jqxRibbon('val', value);
      } else {
         return this.host.jqxRibbon('val');
      }
   };


   // jqxRibbonComponent events
   @Output() onChange = new EventEmitter();
   @Output() onReorder = new EventEmitter();
   @Output() onSelect = new EventEmitter();
   @Output() onUnselect = new EventEmitter();

   __wireEvents__(): void {
      this.host.on('change', (eventData: any) => { this.onChange.emit(eventData); });
      this.host.on('reorder', (eventData: any) => { this.onReorder.emit(eventData); });
      this.host.on('select', (eventData: any) => { this.onSelect.emit(eventData); });
      this.host.on('unselect', (eventData: any) => { this.onUnselect.emit(eventData); });
   }

} //jqxRibbonComponent


