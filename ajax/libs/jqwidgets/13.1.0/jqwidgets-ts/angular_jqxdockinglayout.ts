/*
jQWidgets v13.1.0 (2021-Nov)
Copyright (c) 2011-2021 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

/// <reference path="jqwidgets.d.ts" />

import '../jqwidgets/jqxcore.js';
import '../jqwidgets/jqxbuttons.js';
import '../jqwidgets/jqxwindow.js';
import '../jqwidgets/jqxribbon.js';
import '../jqwidgets/jqxlayout.js';
import '../jqwidgets/jqxmenu.js';
import '../jqwidgets/jqxscrollbar.js';
import '../jqwidgets/jqxdockinglayout.js';

import { Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
declare let JQXLite: any;

@Component({
    selector: 'jqxDockingLayout',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxDockingLayoutComponent implements OnChanges
{
   @Input('contextMenu') attrContextMenu: boolean;
   @Input('layout') attrLayout: Array<jqwidgets.DockingLayoutLayout>;
   @Input('minGroupHeight') attrMinGroupHeight: number | string;
   @Input('minGroupWidth') attrMinGroupWidth: number | string;
   @Input('resizable') attrResizable: boolean;
   @Input('rtl') attrRtl: boolean;
   @Input('theme') attrTheme: string;
   @Input('width') attrWidth: string | number;
   @Input('height') attrHeight: string | number;

   @Input('auto-create') autoCreate: boolean = true;

   properties: string[] = ['contextMenu','height','layout','minGroupHeight','minGroupWidth','resizable','rtl','theme','width'];
   host: any;
   elementRef: ElementRef;
   widgetObject:  jqwidgets.jqxDockingLayout;

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
                     areEqual = this.arraysEqual(this[attrName], this.host.jqxDockingLayout(this.properties[i]));
                  }
                  if (areEqual) {
                     return false;
                  }

                  this.host.jqxDockingLayout(this.properties[i], this[attrName]);
                  continue;
               }

               if (this[attrName] !== this.host.jqxDockingLayout(this.properties[i])) {
                  this.host.jqxDockingLayout(this.properties[i], this[attrName]); 
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
      this.widgetObject = jqwidgets.createInstance(this.host, 'jqxDockingLayout', options);

   }

   createWidget(options?: any): void {
        this.createComponent(options);
   }

   __updateRect__() : void {
      if(this.host) this.host.css({ width: this.attrWidth, height: this.attrHeight });
   }

   setOptions(options: any) : void {
      this.host.jqxDockingLayout('setOptions', options);
   }

   // jqxDockingLayoutComponent properties
   contextMenu(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxDockingLayout('contextMenu', arg);
      } else {
          return this.host.jqxDockingLayout('contextMenu');
      }
   }

   height(arg?: string | number): string | number {
      if (arg !== undefined) {
          this.host.jqxDockingLayout('height', arg);
      } else {
          return this.host.jqxDockingLayout('height');
      }
   }

   layout(arg?: Array<jqwidgets.DockingLayoutLayout>): Array<jqwidgets.DockingLayoutLayout> {
      if (arg !== undefined) {
          this.host.jqxDockingLayout('layout', arg);
      } else {
          return this.host.jqxDockingLayout('layout');
      }
   }

   minGroupHeight(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxDockingLayout('minGroupHeight', arg);
      } else {
          return this.host.jqxDockingLayout('minGroupHeight');
      }
   }

   minGroupWidth(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxDockingLayout('minGroupWidth', arg);
      } else {
          return this.host.jqxDockingLayout('minGroupWidth');
      }
   }

   resizable(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxDockingLayout('resizable', arg);
      } else {
          return this.host.jqxDockingLayout('resizable');
      }
   }

   rtl(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxDockingLayout('rtl', arg);
      } else {
          return this.host.jqxDockingLayout('rtl');
      }
   }

   theme(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxDockingLayout('theme', arg);
      } else {
          return this.host.jqxDockingLayout('theme');
      }
   }

   width(arg?: string | number): string | number {
      if (arg !== undefined) {
          this.host.jqxDockingLayout('width', arg);
      } else {
          return this.host.jqxDockingLayout('width');
      }
   }


   // jqxDockingLayoutComponent functions
   addFloatGroup(width: number | string, height: number | string, position: jqwidgets.DockingLayoutLayoutPosition, panelType: string, title: string, content: string, initContent: any): void {
      this.host.jqxDockingLayout('addFloatGroup', width, height, position, panelType, title, content, initContent);
   }

   destroy(): void {
      this.host.jqxDockingLayout('destroy');
   }

   loadLayout(layout: any): void {
      this.host.jqxDockingLayout('loadLayout', layout);
   }

   refresh(): void {
      this.host.jqxDockingLayout('refresh');
   }

   render(): void {
      this.host.jqxDockingLayout('render');
   }

   saveLayout(): any {
      return this.host.jqxDockingLayout('saveLayout');
   }


   // jqxDockingLayoutComponent events
   @Output() onDock = new EventEmitter();
   @Output() onFloatGroupClosed = new EventEmitter();
   @Output() onFloat = new EventEmitter();
   @Output() onPin = new EventEmitter();
   @Output() onResize = new EventEmitter();
   @Output() onUnpin = new EventEmitter();

   __wireEvents__(): void {
      this.host.on('dock', (eventData: any) => { this.onDock.emit(eventData); });
      this.host.on('floatGroupClosed', (eventData: any) => { this.onFloatGroupClosed.emit(eventData); });
      this.host.on('float', (eventData: any) => { this.onFloat.emit(eventData); });
      this.host.on('pin', (eventData: any) => { this.onPin.emit(eventData); });
      this.host.on('resize', (eventData: any) => { this.onResize.emit(eventData); });
      this.host.on('unpin', (eventData: any) => { this.onUnpin.emit(eventData); });
   }

} //jqxDockingLayoutComponent


