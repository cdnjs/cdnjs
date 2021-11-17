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
import '../jqwidgets/jqxrangeselector.js';

import { Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
declare let JQXLite: any;

@Component({
    selector: 'jqxRangeSelector',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxRangeSelectorComponent implements OnChanges
{
   @Input('disabled') attrDisabled: boolean;
   @Input('groupLabelsFormatFunction') attrGroupLabelsFormatFunction: (value: jqwidgets.RangeSelectorGroupLabelsFormatFunction['value'], date: jqwidgets.RangeSelectorGroupLabelsFormatFunction['date']) => string;
   @Input('labelsFormat') attrLabelsFormat: string;
   @Input('labelsFormatFunction') attrLabelsFormatFunction: (value: jqwidgets.RangeSelectorLabelsFormatFunction['value']) => string;
   @Input('labelsOnTicks') attrLabelsOnTicks: boolean;
   @Input('markersFormat') attrMarkersFormat: string;
   @Input('markersFormatFunction') attrMarkersFormatFunction: (value: jqwidgets.RangeSelectorMarkersFormatFunction['value'], position: jqwidgets.RangeSelectorMarkersFormatFunction['position']) => string;
   @Input('majorTicksInterval') attrMajorTicksInterval: any;
   @Input('minorTicksInterval') attrMinorTicksInterval: any;
   @Input('max') attrMax: any;
   @Input('min') attrMin: any;
   @Input('moveOnClick') attrMoveOnClick: boolean;
   @Input('padding') attrPadding: number | string;
   @Input('range') attrRange: jqwidgets.RangeSelectorRange;
   @Input('resizable') attrResizable: boolean;
   @Input('rtl') attrRtl: boolean;
   @Input('showGroupLabels') attrShowGroupLabels: boolean;
   @Input('showMinorTicks') attrShowMinorTicks: boolean;
   @Input('snapToTicks') attrSnapToTicks: boolean;
   @Input('showMajorLabels') attrShowMajorLabels: boolean;
   @Input('showMarkers') attrShowMarkers: boolean;
   @Input('theme') attrTheme: string;
   @Input('width') attrWidth: string | number;
   @Input('height') attrHeight: string | number;

   @Input('auto-create') autoCreate: boolean = true;

   properties: string[] = ['disabled','groupLabelsFormatFunction','height','labelsFormat','labelsFormatFunction','labelsOnTicks','markersFormat','markersFormatFunction','majorTicksInterval','minorTicksInterval','max','min','moveOnClick','padding','range','resizable','rtl','showGroupLabels','showMinorTicks','snapToTicks','showMajorLabels','showMarkers','theme','width'];
   host: any;
   elementRef: ElementRef;
   widgetObject:  jqwidgets.jqxRangeSelector;

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
                     areEqual = this.arraysEqual(this[attrName], this.host.jqxRangeSelector(this.properties[i]));
                  }
                  if (areEqual) {
                     return false;
                  }

                  this.host.jqxRangeSelector(this.properties[i], this[attrName]);
                  continue;
               }

               if (this[attrName] !== this.host.jqxRangeSelector(this.properties[i])) {
                  this.host.jqxRangeSelector(this.properties[i], this[attrName]); 
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
      this.widgetObject = jqwidgets.createInstance(this.host, 'jqxRangeSelector', options);

   }

   createWidget(options?: any): void {
        this.createComponent(options);
   }

   __updateRect__() : void {
      if(this.host) this.host.css({ width: this.attrWidth, height: this.attrHeight });
   }

   setOptions(options: any) : void {
      this.host.jqxRangeSelector('setOptions', options);
   }

   // jqxRangeSelectorComponent properties
   disabled(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxRangeSelector('disabled', arg);
      } else {
          return this.host.jqxRangeSelector('disabled');
      }
   }

   groupLabelsFormatFunction(arg?: (value: jqwidgets.RangeSelectorGroupLabelsFormatFunction['value'], date: jqwidgets.RangeSelectorGroupLabelsFormatFunction['date']) => string): (value: jqwidgets.RangeSelectorGroupLabelsFormatFunction['value'], date: jqwidgets.RangeSelectorGroupLabelsFormatFunction['date']) => string {
      if (arg !== undefined) {
          this.host.jqxRangeSelector('groupLabelsFormatFunction', arg);
      } else {
          return this.host.jqxRangeSelector('groupLabelsFormatFunction');
      }
   }

   height(arg?: string | number): string | number {
      if (arg !== undefined) {
          this.host.jqxRangeSelector('height', arg);
      } else {
          return this.host.jqxRangeSelector('height');
      }
   }

   labelsFormat(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxRangeSelector('labelsFormat', arg);
      } else {
          return this.host.jqxRangeSelector('labelsFormat');
      }
   }

   labelsFormatFunction(arg?: (value: jqwidgets.RangeSelectorLabelsFormatFunction['value']) => string): (value: jqwidgets.RangeSelectorLabelsFormatFunction['value']) => string {
      if (arg !== undefined) {
          this.host.jqxRangeSelector('labelsFormatFunction', arg);
      } else {
          return this.host.jqxRangeSelector('labelsFormatFunction');
      }
   }

   labelsOnTicks(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxRangeSelector('labelsOnTicks', arg);
      } else {
          return this.host.jqxRangeSelector('labelsOnTicks');
      }
   }

   markersFormat(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxRangeSelector('markersFormat', arg);
      } else {
          return this.host.jqxRangeSelector('markersFormat');
      }
   }

   markersFormatFunction(arg?: (value: jqwidgets.RangeSelectorMarkersFormatFunction['value'], position: jqwidgets.RangeSelectorMarkersFormatFunction['position']) => string): (value: jqwidgets.RangeSelectorMarkersFormatFunction['value'], position: jqwidgets.RangeSelectorMarkersFormatFunction['position']) => string {
      if (arg !== undefined) {
          this.host.jqxRangeSelector('markersFormatFunction', arg);
      } else {
          return this.host.jqxRangeSelector('markersFormatFunction');
      }
   }

   majorTicksInterval(arg?: any): any {
      if (arg !== undefined) {
          this.host.jqxRangeSelector('majorTicksInterval', arg);
      } else {
          return this.host.jqxRangeSelector('majorTicksInterval');
      }
   }

   minorTicksInterval(arg?: any): any {
      if (arg !== undefined) {
          this.host.jqxRangeSelector('minorTicksInterval', arg);
      } else {
          return this.host.jqxRangeSelector('minorTicksInterval');
      }
   }

   max(arg?: any): any {
      if (arg !== undefined) {
          this.host.jqxRangeSelector('max', arg);
      } else {
          return this.host.jqxRangeSelector('max');
      }
   }

   min(arg?: any): any {
      if (arg !== undefined) {
          this.host.jqxRangeSelector('min', arg);
      } else {
          return this.host.jqxRangeSelector('min');
      }
   }

   moveOnClick(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxRangeSelector('moveOnClick', arg);
      } else {
          return this.host.jqxRangeSelector('moveOnClick');
      }
   }

   padding(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxRangeSelector('padding', arg);
      } else {
          return this.host.jqxRangeSelector('padding');
      }
   }

   range(arg?: jqwidgets.RangeSelectorRange): jqwidgets.RangeSelectorRange {
      if (arg !== undefined) {
          this.host.jqxRangeSelector('range', arg);
      } else {
          return this.host.jqxRangeSelector('range');
      }
   }

   resizable(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxRangeSelector('resizable', arg);
      } else {
          return this.host.jqxRangeSelector('resizable');
      }
   }

   rtl(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxRangeSelector('rtl', arg);
      } else {
          return this.host.jqxRangeSelector('rtl');
      }
   }

   showGroupLabels(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxRangeSelector('showGroupLabels', arg);
      } else {
          return this.host.jqxRangeSelector('showGroupLabels');
      }
   }

   showMinorTicks(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxRangeSelector('showMinorTicks', arg);
      } else {
          return this.host.jqxRangeSelector('showMinorTicks');
      }
   }

   snapToTicks(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxRangeSelector('snapToTicks', arg);
      } else {
          return this.host.jqxRangeSelector('snapToTicks');
      }
   }

   showMajorLabels(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxRangeSelector('showMajorLabels', arg);
      } else {
          return this.host.jqxRangeSelector('showMajorLabels');
      }
   }

   showMarkers(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxRangeSelector('showMarkers', arg);
      } else {
          return this.host.jqxRangeSelector('showMarkers');
      }
   }

   theme(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxRangeSelector('theme', arg);
      } else {
          return this.host.jqxRangeSelector('theme');
      }
   }

   width(arg?: string | number): string | number {
      if (arg !== undefined) {
          this.host.jqxRangeSelector('width', arg);
      } else {
          return this.host.jqxRangeSelector('width');
      }
   }


   // jqxRangeSelectorComponent functions
   destroy(): void {
      this.host.jqxRangeSelector('destroy');
   }

   getRange(): jqwidgets.RangeSelectorGetRange {
      return this.host.jqxRangeSelector('getRange');
   }

   render(): void {
      this.host.jqxRangeSelector('render');
   }

   refresh(): void {
      this.host.jqxRangeSelector('refresh');
   }

   setRange(from: any, to: any): void {
      this.host.jqxRangeSelector('setRange', from, to);
   }


   // jqxRangeSelectorComponent events
   @Output() onChange = new EventEmitter();

   __wireEvents__(): void {
      this.host.on('change', (eventData: any) => { this.onChange.emit(eventData); });
   }

} //jqxRangeSelectorComponent


