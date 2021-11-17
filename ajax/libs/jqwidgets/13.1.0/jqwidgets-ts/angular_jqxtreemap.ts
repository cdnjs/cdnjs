/*
jQWidgets v13.1.0 (2021-Nov)
Copyright (c) 2011-2021 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

/// <reference path="jqwidgets.d.ts" />

import '../jqwidgets/jqxcore.js';
import '../jqwidgets/jqxdata.js';
import '../jqwidgets/jqxtreemap.js';
import '../jqwidgets/jqxtooltip.js';

import { Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
declare let JQXLite: any;

@Component({
    selector: 'jqxTreeMap',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxTreeMapComponent implements OnChanges
{
   @Input('baseColor') attrBaseColor: string;
   @Input('colorRanges') attrColorRanges: Array<jqwidgets.TreeMapColorRanges>;
   @Input('colorRange') attrColorRange: number;
   @Input('colorMode') attrColorMode: string;
   @Input('displayMember') attrDisplayMember: string;
   @Input('hoverEnabled') attrHoverEnabled: boolean;
   @Input('headerHeight') attrHeaderHeight: number;
   @Input('legendLabel') attrLegendLabel: string;
   @Input('legendPosition') attrLegendPosition: jqwidgets.TreeMapLegendPosition;
   @Input('legendScaleCallback') attrLegendScaleCallback: (v: jqwidgets.TreeMapLegendScaleCallback['v']) => string | number;
   @Input('renderCallbacks') attrRenderCallbacks: any;
   @Input('selectionEnabled') attrSelectionEnabled: boolean;
   @Input('showLegend') attrShowLegend: boolean;
   @Input('source') attrSource: any;
   @Input('theme') attrTheme: string;
   @Input('valueMember') attrValueMember: string;
   @Input('width') attrWidth: string | number;
   @Input('height') attrHeight: string | number;

   @Input('auto-create') autoCreate: boolean = true;

   properties: string[] = ['baseColor','colorRanges','colorRange','colorMode','displayMember','height','hoverEnabled','headerHeight','legendLabel','legendPosition','legendScaleCallback','renderCallbacks','selectionEnabled','showLegend','source','theme','valueMember','width'];
   host: any;
   elementRef: ElementRef;
   widgetObject:  jqwidgets.jqxTreeMap;

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
                     areEqual = this.arraysEqual(this[attrName], this.host.jqxTreeMap(this.properties[i]));
                  }
                  if (areEqual) {
                     return false;
                  }

                  this.host.jqxTreeMap(this.properties[i], this[attrName]);
                  continue;
               }

               if (this[attrName] !== this.host.jqxTreeMap(this.properties[i])) {
                  this.host.jqxTreeMap(this.properties[i], this[attrName]); 
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
      this.widgetObject = jqwidgets.createInstance(this.host, 'jqxTreeMap', options);

   }

   createWidget(options?: any): void {
        this.createComponent(options);
   }

   __updateRect__() : void {
      if(this.host) this.host.css({ width: this.attrWidth, height: this.attrHeight });
   }

   setOptions(options: any) : void {
      this.host.jqxTreeMap('setOptions', options);
   }

   // jqxTreeMapComponent properties
   baseColor(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxTreeMap('baseColor', arg);
      } else {
          return this.host.jqxTreeMap('baseColor');
      }
   }

   colorRanges(arg?: Array<jqwidgets.TreeMapColorRanges>): Array<jqwidgets.TreeMapColorRanges> {
      if (arg !== undefined) {
          this.host.jqxTreeMap('colorRanges', arg);
      } else {
          return this.host.jqxTreeMap('colorRanges');
      }
   }

   colorRange(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxTreeMap('colorRange', arg);
      } else {
          return this.host.jqxTreeMap('colorRange');
      }
   }

   colorMode(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxTreeMap('colorMode', arg);
      } else {
          return this.host.jqxTreeMap('colorMode');
      }
   }

   displayMember(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxTreeMap('displayMember', arg);
      } else {
          return this.host.jqxTreeMap('displayMember');
      }
   }

   height(arg?: string | number): string | number {
      if (arg !== undefined) {
          this.host.jqxTreeMap('height', arg);
      } else {
          return this.host.jqxTreeMap('height');
      }
   }

   hoverEnabled(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxTreeMap('hoverEnabled', arg);
      } else {
          return this.host.jqxTreeMap('hoverEnabled');
      }
   }

   headerHeight(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxTreeMap('headerHeight', arg);
      } else {
          return this.host.jqxTreeMap('headerHeight');
      }
   }

   legendLabel(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxTreeMap('legendLabel', arg);
      } else {
          return this.host.jqxTreeMap('legendLabel');
      }
   }

   legendPosition(arg?: jqwidgets.TreeMapLegendPosition): jqwidgets.TreeMapLegendPosition {
      if (arg !== undefined) {
          this.host.jqxTreeMap('legendPosition', arg);
      } else {
          return this.host.jqxTreeMap('legendPosition');
      }
   }

   legendScaleCallback(arg?: (v: jqwidgets.TreeMapLegendScaleCallback['v']) => string | number): (v: jqwidgets.TreeMapLegendScaleCallback['v']) => string | number {
      if (arg !== undefined) {
          this.host.jqxTreeMap('legendScaleCallback', arg);
      } else {
          return this.host.jqxTreeMap('legendScaleCallback');
      }
   }

   renderCallbacks(arg?: any): any {
      if (arg !== undefined) {
          this.host.jqxTreeMap('renderCallbacks', arg);
      } else {
          return this.host.jqxTreeMap('renderCallbacks');
      }
   }

   selectionEnabled(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxTreeMap('selectionEnabled', arg);
      } else {
          return this.host.jqxTreeMap('selectionEnabled');
      }
   }

   showLegend(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxTreeMap('showLegend', arg);
      } else {
          return this.host.jqxTreeMap('showLegend');
      }
   }

   source(arg?: any): any {
      if (arg !== undefined) {
          this.host.jqxTreeMap('source', arg);
      } else {
          return this.host.jqxTreeMap('source');
      }
   }

   theme(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxTreeMap('theme', arg);
      } else {
          return this.host.jqxTreeMap('theme');
      }
   }

   valueMember(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxTreeMap('valueMember', arg);
      } else {
          return this.host.jqxTreeMap('valueMember');
      }
   }

   width(arg?: string | number): string | number {
      if (arg !== undefined) {
          this.host.jqxTreeMap('width', arg);
      } else {
          return this.host.jqxTreeMap('width');
      }
   }


   // jqxTreeMapComponent functions
   destroy(): void {
      this.host.jqxTreeMap('destroy');
   }

   render(): void {
      this.host.jqxTreeMap('render');
   }


   // jqxTreeMapComponent events
   @Output() onBindingComplete = new EventEmitter();

   __wireEvents__(): void {
      this.host.on('bindingComplete', (eventData: any) => { this.onBindingComplete.emit(eventData); });
   }

} //jqxTreeMapComponent


