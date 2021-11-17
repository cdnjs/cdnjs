/*
jQWidgets v13.1.0 (2021-Nov)
Copyright (c) 2011-2021 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

/// <reference path="jqwidgets.d.ts" />

import '../jqwidgets/jqxcore.js';
import '../jqwidgets/jqxdraw.js';
import '../jqwidgets/jqxgauge.js';

import { Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
declare let JQXLite: any;

@Component({
    selector: 'jqxLinearGauge',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxLinearGaugeComponent implements OnChanges
{
   @Input('animationDuration') attrAnimationDuration: number;
   @Input('background') attrBackground: jqwidgets.LinearGaugeBackground;
   @Input('colorScheme') attrColorScheme: string;
   @Input('disabled') attrDisabled: boolean;
   @Input('easing') attrEasing: string;
   @Input('int64') attrInt64: boolean;
   @Input('labels') attrLabels: jqwidgets.LinearGaugeLabels | jqwidgets.LinearGaugeLabels[];
   @Input('min') attrMin: number;
   @Input('max') attrMax: number;
   @Input('orientation') attrOrientation: string;
   @Input('pointer') attrPointer: jqwidgets.LinearGaugePointer;
   @Input('rangesOffset') attrRangesOffset: number;
   @Input('rangeSize') attrRangeSize: number | string;
   @Input('ranges') attrRanges: Array<jqwidgets.LinearGaugeRanges>;
   @Input('showRanges') attrShowRanges: boolean;
   @Input('scaleStyle') attrScaleStyle: any;
   @Input('scaleLength') attrScaleLength: number | string;
   @Input('ticksOffset') attrTicksOffset: Array<number | string>;
   @Input('ticksPosition') attrTicksPosition: string;
   @Input('ticksMinor') attrTicksMinor: jqwidgets.LinearGaugeTicks;
   @Input('ticksMajor') attrTicksMajor: jqwidgets.LinearGaugeTicks;
   @Input('value') attrValue: number;
   @Input('width') attrWidth: string | number;
   @Input('height') attrHeight: string | number;

   @Input('auto-create') autoCreate: boolean = true;

   properties: string[] = ['animationDuration','background','colorScheme','disabled','easing','height','int64','labels','min','max','orientation','pointer','rangesOffset','rangeSize','ranges','showRanges','scaleStyle','scaleLength','ticksOffset','ticksPosition','ticksMinor','ticksMajor','value','width'];
   host: any;
   elementRef: ElementRef;
   widgetObject:  jqwidgets.jqxLinearGauge;

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
                     areEqual = this.arraysEqual(this[attrName], this.host.jqxLinearGauge(this.properties[i]));
                  }
                  if (areEqual) {
                     return false;
                  }

                  this.host.jqxLinearGauge(this.properties[i], this[attrName]);
                  continue;
               }

               if (this[attrName] !== this.host.jqxLinearGauge(this.properties[i])) {
                  this.host.jqxLinearGauge(this.properties[i], this[attrName]); 
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
      this.widgetObject = jqwidgets.createInstance(this.host, 'jqxLinearGauge', options);

   }

   createWidget(options?: any): void {
        this.createComponent(options);
   }

   __updateRect__() : void {
      if(this.host) this.host.css({ width: this.attrWidth, height: this.attrHeight });
   }

   setOptions(options: any) : void {
      this.host.jqxLinearGauge('setOptions', options);
   }

   // jqxLinearGaugeComponent properties
   animationDuration(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxLinearGauge('animationDuration', arg);
      } else {
          return this.host.jqxLinearGauge('animationDuration');
      }
   }

   background(arg?: jqwidgets.LinearGaugeBackground): jqwidgets.LinearGaugeBackground {
      if (arg !== undefined) {
          this.host.jqxLinearGauge('background', arg);
      } else {
          return this.host.jqxLinearGauge('background');
      }
   }

   colorScheme(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxLinearGauge('colorScheme', arg);
      } else {
          return this.host.jqxLinearGauge('colorScheme');
      }
   }

   disabled(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxLinearGauge('disabled', arg);
      } else {
          return this.host.jqxLinearGauge('disabled');
      }
   }

   easing(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxLinearGauge('easing', arg);
      } else {
          return this.host.jqxLinearGauge('easing');
      }
   }

   height(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxLinearGauge('height', arg);
      } else {
          return this.host.jqxLinearGauge('height');
      }
   }

   int64(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxLinearGauge('int64', arg);
      } else {
          return this.host.jqxLinearGauge('int64');
      }
   }

   labels(arg?: jqwidgets.LinearGaugeLabels | jqwidgets.LinearGaugeLabels[]): jqwidgets.LinearGaugeLabels | jqwidgets.LinearGaugeLabels[] {
      if (arg !== undefined) {
          this.host.jqxLinearGauge('labels', arg);
      } else {
          return this.host.jqxLinearGauge('labels');
      }
   }

   min(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxLinearGauge('min', arg);
      } else {
          return this.host.jqxLinearGauge('min');
      }
   }

   max(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxLinearGauge('max', arg);
      } else {
          return this.host.jqxLinearGauge('max');
      }
   }

   orientation(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxLinearGauge('orientation', arg);
      } else {
          return this.host.jqxLinearGauge('orientation');
      }
   }

   pointer(arg?: jqwidgets.LinearGaugePointer): jqwidgets.LinearGaugePointer {
      if (arg !== undefined) {
          this.host.jqxLinearGauge('pointer', arg);
      } else {
          return this.host.jqxLinearGauge('pointer');
      }
   }

   rangesOffset(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxLinearGauge('rangesOffset', arg);
      } else {
          return this.host.jqxLinearGauge('rangesOffset');
      }
   }

   rangeSize(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxLinearGauge('rangeSize', arg);
      } else {
          return this.host.jqxLinearGauge('rangeSize');
      }
   }

   ranges(arg?: Array<jqwidgets.LinearGaugeRanges>): Array<jqwidgets.LinearGaugeRanges> {
      if (arg !== undefined) {
          this.host.jqxLinearGauge('ranges', arg);
      } else {
          return this.host.jqxLinearGauge('ranges');
      }
   }

   showRanges(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxLinearGauge('showRanges', arg);
      } else {
          return this.host.jqxLinearGauge('showRanges');
      }
   }

   scaleStyle(arg?: any): any {
      if (arg !== undefined) {
          this.host.jqxLinearGauge('scaleStyle', arg);
      } else {
          return this.host.jqxLinearGauge('scaleStyle');
      }
   }

   scaleLength(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxLinearGauge('scaleLength', arg);
      } else {
          return this.host.jqxLinearGauge('scaleLength');
      }
   }

   ticksOffset(arg?: Array<number | string>): Array<number | string> {
      if (arg !== undefined) {
          this.host.jqxLinearGauge('ticksOffset', arg);
      } else {
          return this.host.jqxLinearGauge('ticksOffset');
      }
   }

   ticksPosition(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxLinearGauge('ticksPosition', arg);
      } else {
          return this.host.jqxLinearGauge('ticksPosition');
      }
   }

   ticksMinor(arg?: jqwidgets.LinearGaugeTicks): jqwidgets.LinearGaugeTicks {
      if (arg !== undefined) {
          this.host.jqxLinearGauge('ticksMinor', arg);
      } else {
          return this.host.jqxLinearGauge('ticksMinor');
      }
   }

   ticksMajor(arg?: jqwidgets.LinearGaugeTicks): jqwidgets.LinearGaugeTicks {
      if (arg !== undefined) {
          this.host.jqxLinearGauge('ticksMajor', arg);
      } else {
          return this.host.jqxLinearGauge('ticksMajor');
      }
   }

   value(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxLinearGauge('value', arg);
      } else {
          return this.host.jqxLinearGauge('value');
      }
   }

   width(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxLinearGauge('width', arg);
      } else {
          return this.host.jqxLinearGauge('width');
      }
   }


   // jqxLinearGaugeComponent functions
   disable(): void {
      this.host.jqxLinearGauge('disable');
   }

   enable(): void {
      this.host.jqxLinearGauge('enable');
   }

   val(value?: number | string): any {
      if (value !== undefined) {
         return this.host.jqxLinearGauge('val', value);
      } else {
         return this.host.jqxLinearGauge('val');
      }
   };


   // jqxLinearGaugeComponent events
   @Output() onValueChanging = new EventEmitter();
   @Output() onValueChanged = new EventEmitter();

   __wireEvents__(): void {
      this.host.on('valueChanging', (eventData: any) => { this.onValueChanging.emit(eventData); });
      this.host.on('valueChanged', (eventData: any) => { this.onValueChanged.emit(eventData); });
   }

} //jqxLinearGaugeComponent


