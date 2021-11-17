/*
jQWidgets v13.1.0 (2021-Nov)
Copyright (c) 2011-2021 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

/// <reference path="jqwidgets.d.ts" />

import '../jqwidgets/jqxcore.js';
import '../jqwidgets/jqxbuttons.js';
import '../jqwidgets/jqxscrollbar.js';
import '../jqwidgets/jqxlistbox.js';
import '../jqwidgets/jqxdropdownlist.js';
import '../jqwidgets/jqxcombobox.js';
import '../jqwidgets/jqxinput.js';
import '../jqwidgets/jqxtoolbar.js';

import { Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
declare let JQXLite: any;

@Component({
    selector: 'jqxToolbar',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxToolBarComponent implements OnChanges
{
   @Input('disabled') attrDisabled: boolean;
   @Input('initTools') attrInitTools: (type?: string, index?: number, tool?: any, menuToolIninitialization?: boolean) => void;
   @Input('minimizeWidth') attrMinimizeWidth: number;
   @Input('minWidth') attrMinWidth: number | string;
   @Input('maxWidth') attrMaxWidth: number | string;
   @Input('rtl') attrRtl: boolean;
   @Input('tools') attrTools: string;
   @Input('theme') attrTheme: string;
   @Input('width') attrWidth: string | number;
   @Input('height') attrHeight: string | number;

   @Input('auto-create') autoCreate: boolean = true;

   properties: string[] = ['disabled','height','initTools','minimizeWidth','minWidth','maxWidth','rtl','tools','theme','width'];
   host: any;
   elementRef: ElementRef;
   widgetObject:  jqwidgets.jqxToolBar;

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
                     areEqual = this.arraysEqual(this[attrName], this.host.jqxToolBar(this.properties[i]));
                  }
                  if (areEqual) {
                     return false;
                  }

                  this.host.jqxToolBar(this.properties[i], this[attrName]);
                  continue;
               }

               if (this[attrName] !== this.host.jqxToolBar(this.properties[i])) {
                  this.host.jqxToolBar(this.properties[i], this[attrName]); 
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
      this.widgetObject = jqwidgets.createInstance(this.host, 'jqxToolBar', options);

   }

   createWidget(options?: any): void {
        this.createComponent(options);
   }

   __updateRect__() : void {
      if(this.host) this.host.css({ width: this.attrWidth, height: this.attrHeight });
   }

   setOptions(options: any) : void {
      this.host.jqxToolBar('setOptions', options);
   }

   // jqxToolBarComponent properties
   disabled(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxToolBar('disabled', arg);
      } else {
          return this.host.jqxToolBar('disabled');
      }
   }

   height(arg?: string | number): string | number {
      if (arg !== undefined) {
          this.host.jqxToolBar('height', arg);
      } else {
          return this.host.jqxToolBar('height');
      }
   }

   initTools(arg?: (type?: string, index?: number, tool?: any, menuToolIninitialization?: boolean) => void): (type?: string, index?: number, tool?: any, menuToolIninitialization?: boolean) => void {
      if (arg !== undefined) {
          this.host.jqxToolBar('initTools', arg);
      } else {
          return this.host.jqxToolBar('initTools');
      }
   }

   minimizeWidth(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxToolBar('minimizeWidth', arg);
      } else {
          return this.host.jqxToolBar('minimizeWidth');
      }
   }

   minWidth(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxToolBar('minWidth', arg);
      } else {
          return this.host.jqxToolBar('minWidth');
      }
   }

   maxWidth(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxToolBar('maxWidth', arg);
      } else {
          return this.host.jqxToolBar('maxWidth');
      }
   }

   rtl(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxToolBar('rtl', arg);
      } else {
          return this.host.jqxToolBar('rtl');
      }
   }

   tools(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxToolBar('tools', arg);
      } else {
          return this.host.jqxToolBar('tools');
      }
   }

   theme(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxToolBar('theme', arg);
      } else {
          return this.host.jqxToolBar('theme');
      }
   }

   width(arg?: string | number): string | number {
      if (arg !== undefined) {
          this.host.jqxToolBar('width', arg);
      } else {
          return this.host.jqxToolBar('width');
      }
   }


   // jqxToolBarComponent functions
   addTool(type: string, position: string, separator: boolean, menuToolIninitialization: (type?: string, tool?: any, menuToolIninitialization?: boolean) => void): void {
      this.host.jqxToolBar('addTool', type, position, separator, menuToolIninitialization);
   }

   disableTool(index: number, disable: boolean): void {
      this.host.jqxToolBar('disableTool', index, disable);
   }

   destroy(): void {
      this.host.jqxToolBar('destroy');
   }

   destroyTool(index: number): void {
      this.host.jqxToolBar('destroyTool', index);
   }

   getTools(): Array<jqwidgets.ToolBarToolItem> {
      return this.host.jqxToolBar('getTools');
   }

   render(): void {
      this.host.jqxToolBar('render');
   }

   refresh(): void {
      this.host.jqxToolBar('refresh');
   }


   // jqxToolBarComponent events
   @Output() onClose = new EventEmitter();
   @Output() onOpen = new EventEmitter();

   __wireEvents__(): void {
      this.host.on('close', (eventData: any) => { this.onClose.emit(eventData); });
      this.host.on('open', (eventData: any) => { this.onOpen.emit(eventData); });
   }

} //jqxToolBarComponent


