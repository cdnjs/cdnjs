/*
jQWidgets v13.1.0 (2021-Nov)
Copyright (c) 2011-2021 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

/// <reference path="jqwidgets.d.ts" />

import '../jqwidgets/jqxcore.js';
import '../jqwidgets/jqxdata.js';
import '../jqwidgets/jqxtooltip.js';
import '../jqwidgets/jqxbulletchart.js';

import { Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
declare let JQXLite: any;

@Component({
    selector: 'jqxBulletChart',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxBulletChartComponent implements OnChanges
{
   @Input('animationDuration') attrAnimationDuration: number;
   @Input('barSize') attrBarSize: number | string;
   @Input('description') attrDescription: string;
   @Input('disabled') attrDisabled: boolean;
   @Input('labelsFormat') attrLabelsFormat: string;
   @Input('labelsFormatFunction') attrLabelsFormatFunction: (value?: jqwidgets.BulletChartLabelsFormatFunction['value'], position?: jqwidgets.BulletChartLabelsFormatFunction['position']) => any;
   @Input('orientation') attrOrientation: string;
   @Input('pointer') attrPointer: jqwidgets.BulletChartPointer;
   @Input('rtl') attrRtl: boolean;
   @Input('ranges') attrRanges: Array<jqwidgets.BulletChartRanges>;
   @Input('showTooltip') attrShowTooltip: boolean;
   @Input('target') attrTarget: jqwidgets.BulletChartPointer;
   @Input('ticks') attrTicks: jqwidgets.BulletChartTicks;
   @Input('title') attrTitle: string;
   @Input('tooltipFormatFunction') attrTooltipFormatFunction: (pointerValue?: jqwidgets.BulletChartTooltipFormatFunction['pointerValue'], targetValue?: jqwidgets.BulletChartTooltipFormatFunction['targetValue']) => string;
   @Input('width') attrWidth: string | number;
   @Input('height') attrHeight: string | number;

   @Input('auto-create') autoCreate: boolean = true;

   properties: string[] = ['animationDuration','barSize','description','disabled','height','labelsFormat','labelsFormatFunction','orientation','pointer','rtl','ranges','showTooltip','target','ticks','title','tooltipFormatFunction','width'];
   host: any;
   elementRef: ElementRef;
   widgetObject:  jqwidgets.jqxBulletChart;

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
                     areEqual = this.arraysEqual(this[attrName], this.host.jqxBulletChart(this.properties[i]));
                  }
                  if (areEqual) {
                     return false;
                  }

                  this.host.jqxBulletChart(this.properties[i], this[attrName]);
                  continue;
               }

               if (this[attrName] !== this.host.jqxBulletChart(this.properties[i])) {
                  this.host.jqxBulletChart(this.properties[i], this[attrName]); 
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
      this.widgetObject = jqwidgets.createInstance(this.host, 'jqxBulletChart', options);

   }

   createWidget(options?: any): void {
        this.createComponent(options);
   }

   __updateRect__() : void {
      if(this.host) this.host.css({ width: this.attrWidth, height: this.attrHeight });
   }

   setOptions(options: any) : void {
      this.host.jqxBulletChart('setOptions', options);
   }

   // jqxBulletChartComponent properties
   animationDuration(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxBulletChart('animationDuration', arg);
      } else {
          return this.host.jqxBulletChart('animationDuration');
      }
   }

   barSize(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxBulletChart('barSize', arg);
      } else {
          return this.host.jqxBulletChart('barSize');
      }
   }

   description(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxBulletChart('description', arg);
      } else {
          return this.host.jqxBulletChart('description');
      }
   }

   disabled(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxBulletChart('disabled', arg);
      } else {
          return this.host.jqxBulletChart('disabled');
      }
   }

   height(arg?: string | number): string | number {
      if (arg !== undefined) {
          this.host.jqxBulletChart('height', arg);
      } else {
          return this.host.jqxBulletChart('height');
      }
   }

   labelsFormat(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxBulletChart('labelsFormat', arg);
      } else {
          return this.host.jqxBulletChart('labelsFormat');
      }
   }

   labelsFormatFunction(arg?: (value?: jqwidgets.BulletChartLabelsFormatFunction['value'], position?: jqwidgets.BulletChartLabelsFormatFunction['position']) => any): (value?: jqwidgets.BulletChartLabelsFormatFunction['value'], position?: jqwidgets.BulletChartLabelsFormatFunction['position']) => any {
      if (arg !== undefined) {
          this.host.jqxBulletChart('labelsFormatFunction', arg);
      } else {
          return this.host.jqxBulletChart('labelsFormatFunction');
      }
   }

   orientation(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxBulletChart('orientation', arg);
      } else {
          return this.host.jqxBulletChart('orientation');
      }
   }

   pointer(arg?: jqwidgets.BulletChartPointer): jqwidgets.BulletChartPointer {
      if (arg !== undefined) {
          this.host.jqxBulletChart('pointer', arg);
      } else {
          return this.host.jqxBulletChart('pointer');
      }
   }

   rtl(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxBulletChart('rtl', arg);
      } else {
          return this.host.jqxBulletChart('rtl');
      }
   }

   ranges(arg?: Array<jqwidgets.BulletChartRanges>): Array<jqwidgets.BulletChartRanges> {
      if (arg !== undefined) {
          this.host.jqxBulletChart('ranges', arg);
      } else {
          return this.host.jqxBulletChart('ranges');
      }
   }

   showTooltip(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxBulletChart('showTooltip', arg);
      } else {
          return this.host.jqxBulletChart('showTooltip');
      }
   }

   target(arg?: jqwidgets.BulletChartPointer): jqwidgets.BulletChartPointer {
      if (arg !== undefined) {
          this.host.jqxBulletChart('target', arg);
      } else {
          return this.host.jqxBulletChart('target');
      }
   }

   ticks(arg?: jqwidgets.BulletChartTicks): jqwidgets.BulletChartTicks {
      if (arg !== undefined) {
          this.host.jqxBulletChart('ticks', arg);
      } else {
          return this.host.jqxBulletChart('ticks');
      }
   }

   title(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxBulletChart('title', arg);
      } else {
          return this.host.jqxBulletChart('title');
      }
   }

   tooltipFormatFunction(arg?: (pointerValue?: jqwidgets.BulletChartTooltipFormatFunction['pointerValue'], targetValue?: jqwidgets.BulletChartTooltipFormatFunction['targetValue']) => string): (pointerValue?: jqwidgets.BulletChartTooltipFormatFunction['pointerValue'], targetValue?: jqwidgets.BulletChartTooltipFormatFunction['targetValue']) => string {
      if (arg !== undefined) {
          this.host.jqxBulletChart('tooltipFormatFunction', arg);
      } else {
          return this.host.jqxBulletChart('tooltipFormatFunction');
      }
   }

   width(arg?: string | number): string | number {
      if (arg !== undefined) {
          this.host.jqxBulletChart('width', arg);
      } else {
          return this.host.jqxBulletChart('width');
      }
   }


   // jqxBulletChartComponent functions
   destroy(): void {
      this.host.jqxBulletChart('destroy');
   }

   render(): void {
      this.host.jqxBulletChart('render');
   }

   refresh(): void {
      this.host.jqxBulletChart('refresh');
   }

   val(value?: number): any {
      if (value !== undefined) {
         return this.host.jqxBulletChart('val', value);
      } else {
         return this.host.jqxBulletChart('val');
      }
   };


   // jqxBulletChartComponent events
   @Output() onChange = new EventEmitter();

   __wireEvents__(): void {
      this.host.on('change', (eventData: any) => { this.onChange.emit(eventData); });
   }

} //jqxBulletChartComponent


