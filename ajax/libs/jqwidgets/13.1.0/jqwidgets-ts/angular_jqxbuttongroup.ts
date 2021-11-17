/*
jQWidgets v13.1.0 (2021-Nov)
Copyright (c) 2011-2021 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

/// <reference path="jqwidgets.d.ts" />

import '../jqwidgets/jqxcore.js';
import '../jqwidgets/jqxbuttons.js';
import '../jqwidgets/jqxbuttongroup.js';

import { Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
declare let JQXLite: any;

@Component({
    selector: 'jqxButtonGroup',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxButtonGroupComponent implements OnChanges
{
   @Input('disabled') attrDisabled: boolean;
   @Input('enableHover') attrEnableHover: boolean;
   @Input('mode') attrMode: string;
   @Input('rtl') attrRtl: boolean;
   @Input('template') attrTemplate: string;
   @Input('theme') attrTheme: string;
   @Input('width') attrWidth: string | number;
   @Input('height') attrHeight: string | number;

   @Input('auto-create') autoCreate: boolean = true;

   properties: string[] = ['disabled','enableHover','mode','rtl','template','theme'];
   host: any;
   elementRef: ElementRef;
   widgetObject:  jqwidgets.jqxButtonGroup;

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
                     areEqual = this.arraysEqual(this[attrName], this.host.jqxButtonGroup(this.properties[i]));
                  }
                  if (areEqual) {
                     return false;
                  }

                  this.host.jqxButtonGroup(this.properties[i], this[attrName]);
                  continue;
               }

               if (this[attrName] !== this.host.jqxButtonGroup(this.properties[i])) {
                  this.host.jqxButtonGroup(this.properties[i], this[attrName]); 
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

      this.host[0].style.marginLeft = '1px';
      this.__wireEvents__();
      this.widgetObject = jqwidgets.createInstance(this.host, 'jqxButtonGroup', options);

   }

   createWidget(options?: any): void {
        this.createComponent(options);
   }

   __updateRect__() : void {
      if(this.host) this.host.css({ width: this.attrWidth, height: this.attrHeight });
   }

   setOptions(options: any) : void {
      this.host.jqxButtonGroup('setOptions', options);
   }

   // jqxButtonGroupComponent properties
   disabled(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxButtonGroup('disabled', arg);
      } else {
          return this.host.jqxButtonGroup('disabled');
      }
   }

   enableHover(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxButtonGroup('enableHover', arg);
      } else {
          return this.host.jqxButtonGroup('enableHover');
      }
   }

   mode(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxButtonGroup('mode', arg);
      } else {
          return this.host.jqxButtonGroup('mode');
      }
   }

   rtl(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxButtonGroup('rtl', arg);
      } else {
          return this.host.jqxButtonGroup('rtl');
      }
   }

   template(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxButtonGroup('template', arg);
      } else {
          return this.host.jqxButtonGroup('template');
      }
   }

   theme(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxButtonGroup('theme', arg);
      } else {
          return this.host.jqxButtonGroup('theme');
      }
   }


   // jqxButtonGroupComponent functions
   disableAt(index: number): void {
      this.host.jqxButtonGroup('disableAt', index);
   }

   disable(): void {
      this.host.jqxButtonGroup('disable');
   }

   destroy(): void {
      this.host.jqxButtonGroup('destroy');
   }

   enable(): void {
      this.host.jqxButtonGroup('enable');
   }

   enableAt(index: number): void {
      this.host.jqxButtonGroup('enableAt', index);
   }

   getSelection(): any {
      return this.host.jqxButtonGroup('getSelection');
   }

   render(): void {
      this.host.jqxButtonGroup('render');
   }

   setSelection(index: number): void {
      this.host.jqxButtonGroup('setSelection', index);
   }


   // jqxButtonGroupComponent events
   @Output() onButtonclick = new EventEmitter();
   @Output() onSelected = new EventEmitter();
   @Output() onUnselected = new EventEmitter();

   __wireEvents__(): void {
      this.host.on('buttonclick', (eventData: any) => { this.onButtonclick.emit(eventData); });
      this.host.on('selected', (eventData: any) => { this.onSelected.emit(eventData); });
      this.host.on('unselected', (eventData: any) => { this.onUnselected.emit(eventData); });
   }

} //jqxButtonGroupComponent


