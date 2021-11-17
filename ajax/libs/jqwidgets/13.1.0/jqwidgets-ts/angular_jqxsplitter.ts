/*
jQWidgets v13.1.0 (2021-Nov)
Copyright (c) 2011-2021 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

/// <reference path="jqwidgets.d.ts" />

import '../jqwidgets/jqxcore.js';
import '../jqwidgets/jqxbuttons.js';
import '../jqwidgets/jqxsplitter.js';

import { Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
declare let JQXLite: any;

@Component({
    selector: 'jqxSplitter',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxSplitterComponent implements OnChanges
{
   @Input('disabled') attrDisabled: boolean;
   @Input('orientation') attrOrientation: string;
   @Input('panels') attrPanels: Array<jqwidgets.SplitterPanel>;
   @Input('resizable') attrResizable: boolean;
   @Input('splitBarSize') attrSplitBarSize: number;
   @Input('showSplitBar') attrShowSplitBar: boolean;
   @Input('theme') attrTheme: string;
   @Input('width') attrWidth: string | number;
   @Input('height') attrHeight: string | number;

   @Input('auto-create') autoCreate: boolean = true;

   properties: string[] = ['disabled','height','orientation','panels','resizable','splitBarSize','showSplitBar','theme','width'];
   host: any;
   elementRef: ElementRef;
   widgetObject:  jqwidgets.jqxSplitter;

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
                     areEqual = this.arraysEqual(this[attrName], this.host.jqxSplitter(this.properties[i]));
                  }
                  if (areEqual) {
                     return false;
                  }

                  this.host.jqxSplitter(this.properties[i], this[attrName]);
                  continue;
               }

               if (this[attrName] !== this.host.jqxSplitter(this.properties[i])) {
                  this.host.jqxSplitter(this.properties[i], this[attrName]); 
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
      this.widgetObject = jqwidgets.createInstance(this.host, 'jqxSplitter', options);

   }

   createWidget(options?: any): void {
        this.createComponent(options);
   }

   __updateRect__() : void {
      if(this.host) this.host.css({ width: this.attrWidth, height: this.attrHeight });
   }

   setOptions(options: any) : void {
      this.host.jqxSplitter('setOptions', options);
   }

   // jqxSplitterComponent properties
   disabled(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxSplitter('disabled', arg);
      } else {
          return this.host.jqxSplitter('disabled');
      }
   }

   height(arg?: string | number): string | number {
      if (arg !== undefined) {
          this.host.jqxSplitter('height', arg);
      } else {
          return this.host.jqxSplitter('height');
      }
   }

   orientation(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxSplitter('orientation', arg);
      } else {
          return this.host.jqxSplitter('orientation');
      }
   }

   panels(arg?: Array<jqwidgets.SplitterPanel>): Array<jqwidgets.SplitterPanel> {
      if (arg !== undefined) {
          this.host.jqxSplitter('panels', arg);
      } else {
          return this.host.jqxSplitter('panels');
      }
   }

   resizable(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxSplitter('resizable', arg);
      } else {
          return this.host.jqxSplitter('resizable');
      }
   }

   splitBarSize(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxSplitter('splitBarSize', arg);
      } else {
          return this.host.jqxSplitter('splitBarSize');
      }
   }

   showSplitBar(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxSplitter('showSplitBar', arg);
      } else {
          return this.host.jqxSplitter('showSplitBar');
      }
   }

   theme(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxSplitter('theme', arg);
      } else {
          return this.host.jqxSplitter('theme');
      }
   }

   width(arg?: string | number): string | number {
      if (arg !== undefined) {
          this.host.jqxSplitter('width', arg);
      } else {
          return this.host.jqxSplitter('width');
      }
   }


   // jqxSplitterComponent functions
   collapse(): void {
      this.host.jqxSplitter('collapse');
   }

   destroy(): void {
      this.host.jqxSplitter('destroy');
   }

   disable(): void {
      this.host.jqxSplitter('disable');
   }

   enable(): void {
      this.host.jqxSplitter('enable');
   }

   expand(): void {
      this.host.jqxSplitter('expand');
   }

   render(): void {
      this.host.jqxSplitter('render');
   }

   refresh(): void {
      this.host.jqxSplitter('refresh');
   }


   // jqxSplitterComponent events
   @Output() onCollapsed = new EventEmitter();
   @Output() onExpanded = new EventEmitter();
   @Output() onResize = new EventEmitter();
   @Output() onResizeStart = new EventEmitter();

   __wireEvents__(): void {
      this.host.on('collapsed', (eventData: any) => { this.onCollapsed.emit(eventData); });
      this.host.on('expanded', (eventData: any) => { this.onExpanded.emit(eventData); });
      this.host.on('resize', (eventData: any) => { this.onResize.emit(eventData); });
      this.host.on('resizeStart', (eventData: any) => { this.onResizeStart.emit(eventData); });
   }

} //jqxSplitterComponent


