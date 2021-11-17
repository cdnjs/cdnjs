/*
jQWidgets v13.1.0 (2021-Nov)
Copyright (c) 2011-2021 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

/// <reference path="jqwidgets.d.ts" />

import '../jqwidgets/jqxcore.js';
import '../jqwidgets/jqxheatmap.js';

import { Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
declare let JQXLite: any;

@Component({
    selector: 'jqxHeatMap',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxHeatMapComponent implements OnChanges
{
   @Input('xAxis') attrXAxis: jqwidgets.HeatMapXAxis;
   @Input('yAxis') attrYAxis: jqwidgets.HeatMapYAxis;
   @Input('paletteSettings') attrPaletteSettings: jqwidgets.HeatMapPaletteSettings;
   @Input('legendSettings') attrLegendSettings: jqwidgets.HeatMapLegendSettings;
   @Input('source') attrSource: any[];
   @Input('title') attrTitle: string;
   @Input('tooltipRender') attrTooltipRender: (args: jqwidgets.HeatMapTooltipRender) => void;
   @Input('width') attrWidth: string | number;
   @Input('height') attrHeight: string | number;

   @Input('auto-create') autoCreate: boolean = true;

   properties: string[] = ['xAxis','yAxis','paletteSettings','legendSettings','source','title','width','tooltipRender'];
   host: any;
   elementRef: ElementRef;
   widgetObject:  jqwidgets.jqxHeatMap;

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
                     areEqual = this.arraysEqual(this[attrName], this.host.jqxHeatMap(this.properties[i]));
                  }
                  if (areEqual) {
                     return false;
                  }

                  this.host.jqxHeatMap(this.properties[i], this[attrName]);
                  continue;
               }

               if (this[attrName] !== this.host.jqxHeatMap(this.properties[i])) {
                  this.host.jqxHeatMap(this.properties[i], this[attrName]); 
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
      this.widgetObject = jqwidgets.createInstance(this.host, 'jqxHeatMap', options);

   }

   createWidget(options?: any): void {
        this.createComponent(options);
   }

   __updateRect__() : void {
      if(this.host) this.host.css({ width: this.attrWidth, height: this.attrHeight });
   }

   setOptions(options: any) : void {
      this.host.jqxHeatMap('setOptions', options);
   }

   // jqxHeatMapComponent properties
   xAxis(arg?: jqwidgets.HeatMapXAxis): jqwidgets.HeatMapXAxis {
      if (arg !== undefined) {
          this.host.jqxHeatMap('xAxis', arg);
      } else {
          return this.host.jqxHeatMap('xAxis');
      }
   }

   yAxis(arg?: jqwidgets.HeatMapYAxis): jqwidgets.HeatMapYAxis {
      if (arg !== undefined) {
          this.host.jqxHeatMap('yAxis', arg);
      } else {
          return this.host.jqxHeatMap('yAxis');
      }
   }

   paletteSettings(arg?: jqwidgets.HeatMapPaletteSettings): jqwidgets.HeatMapPaletteSettings {
      if (arg !== undefined) {
          this.host.jqxHeatMap('paletteSettings', arg);
      } else {
          return this.host.jqxHeatMap('paletteSettings');
      }
   }

   legendSettings(arg?: jqwidgets.HeatMapLegendSettings): jqwidgets.HeatMapLegendSettings {
      if (arg !== undefined) {
          this.host.jqxHeatMap('legendSettings', arg);
      } else {
          return this.host.jqxHeatMap('legendSettings');
      }
   }

   source(arg?: any[]): any[] {
      if (arg !== undefined) {
          this.host.jqxHeatMap('source', arg);
      } else {
          return this.host.jqxHeatMap('source');
      }
   }

   title(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxHeatMap('title', arg);
      } else {
          return this.host.jqxHeatMap('title');
      }
   }

   width(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxHeatMap('width', arg);
      } else {
          return this.host.jqxHeatMap('width');
      }
   }

   tooltipRender(arg?: (args: jqwidgets.HeatMapTooltipRender) => void): (args: jqwidgets.HeatMapTooltipRender) => void {
      if (arg !== undefined) {
          this.host.jqxHeatMap('tooltipRender', arg);
      } else {
          return this.host.jqxHeatMap('tooltipRender');
      }
   }


   // jqxHeatMapComponent functions
   destroy(): void {
      this.host.jqxHeatMap('destroy');
   }

   setLegendPosition(position?: string): void {
      this.host.jqxHeatMap('setLegendPosition', position);
   }

   setOpposedXAxisPosition(opposedPosition: boolean): void {
      this.host.jqxHeatMap('setOpposedXAxisPosition', opposedPosition);
   }

   setOpposedYAxisPosition(opposedPosition: boolean): void {
      this.host.jqxHeatMap('setOpposedYAxisPosition', opposedPosition);
   }

   reverseXAxisPosition(isInversed: boolean): void {
      this.host.jqxHeatMap('reverseXAxisPosition', isInversed);
   }

   reverseYAxisPosition(isInversed: boolean): void {
      this.host.jqxHeatMap('reverseYAxisPosition', isInversed);
   }

   setPaletteType(type: string): void {
      this.host.jqxHeatMap('setPaletteType', type);
   }


   // jqxHeatMapComponent events


   __wireEvents__(): void {

   }

} //jqxHeatMapComponent


