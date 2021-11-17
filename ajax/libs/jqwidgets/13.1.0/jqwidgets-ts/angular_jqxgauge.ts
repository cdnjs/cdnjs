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
    selector: 'jqxGauge',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxGaugeComponent implements OnChanges
{
   @Input('animationDuration') attrAnimationDuration: string | number;
   @Input('border') attrBorder: jqwidgets.GaugeBorder;
   @Input('caption') attrCaption: jqwidgets.GaugeCaption;
   @Input('cap') attrCap: jqwidgets.GaugeCap;
   @Input('colorScheme') attrColorScheme: string;
   @Input('disabled') attrDisabled: boolean;
   @Input('easing') attrEasing: string;
   @Input('endAngle') attrEndAngle: number | string;
   @Input('int64') attrInt64: boolean;
   @Input('labels') attrLabels: jqwidgets.GaugeLabels;
   @Input('min') attrMin: number;
   @Input('max') attrMax: number | string;
   @Input('pointer') attrPointer: jqwidgets.GaugePointer;
   @Input('radius') attrRadius: number | string;
   @Input('ranges') attrRanges: Array<jqwidgets.GaugeRanges>;
   @Input('startAngle') attrStartAngle: number | string;
   @Input('showRanges') attrShowRanges: boolean;
   @Input('styles') attrStyles: jqwidgets.GaugeStyle;
   @Input('ticksMajor') attrTicksMajor: jqwidgets.GaugeTicks;
   @Input('ticksMinor') attrTicksMinor: jqwidgets.GaugeTicks;
   @Input('ticksDistance') attrTicksDistance: string;
   @Input('value') attrValue: number;
   @Input('width') attrWidth: string | number;
   @Input('height') attrHeight: string | number;

   @Input('auto-create') autoCreate: boolean = true;

   properties: string[] = ['animationDuration','border','caption','cap','colorScheme','disabled','easing','endAngle','height','int64','labels','min','max','pointer','radius','ranges','startAngle','showRanges','styles','ticksMajor','ticksMinor','ticksDistance','value','width'];
   host: any;
   elementRef: ElementRef;
   widgetObject:  jqwidgets.jqxGauge;

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
                     areEqual = this.arraysEqual(this[attrName], this.host.jqxGauge(this.properties[i]));
                  }
                  if (areEqual) {
                     return false;
                  }

                  this.host.jqxGauge(this.properties[i], this[attrName]);
                  continue;
               }

               if (this[attrName] !== this.host.jqxGauge(this.properties[i])) {
                  this.host.jqxGauge(this.properties[i], this[attrName]); 
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
      this.widgetObject = jqwidgets.createInstance(this.host, 'jqxGauge', options);

   }

   createWidget(options?: any): void {
        this.createComponent(options);
   }

   __updateRect__() : void {
      if(this.host) this.host.css({ width: this.attrWidth, height: this.attrHeight });
   }

   setOptions(options: any) : void {
      this.host.jqxGauge('setOptions', options);
   }

   // jqxGaugeComponent properties
   animationDuration(arg?: string | number): string | number {
      if (arg !== undefined) {
          this.host.jqxGauge('animationDuration', arg);
      } else {
          return this.host.jqxGauge('animationDuration');
      }
   }

   border(arg?: jqwidgets.GaugeBorder): jqwidgets.GaugeBorder {
      if (arg !== undefined) {
          this.host.jqxGauge('border', arg);
      } else {
          return this.host.jqxGauge('border');
      }
   }

   caption(arg?: jqwidgets.GaugeCaption): jqwidgets.GaugeCaption {
      if (arg !== undefined) {
          this.host.jqxGauge('caption', arg);
      } else {
          return this.host.jqxGauge('caption');
      }
   }

   cap(arg?: jqwidgets.GaugeCap): jqwidgets.GaugeCap {
      if (arg !== undefined) {
          this.host.jqxGauge('cap', arg);
      } else {
          return this.host.jqxGauge('cap');
      }
   }

   colorScheme(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxGauge('colorScheme', arg);
      } else {
          return this.host.jqxGauge('colorScheme');
      }
   }

   disabled(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxGauge('disabled', arg);
      } else {
          return this.host.jqxGauge('disabled');
      }
   }

   easing(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxGauge('easing', arg);
      } else {
          return this.host.jqxGauge('easing');
      }
   }

   endAngle(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxGauge('endAngle', arg);
      } else {
          return this.host.jqxGauge('endAngle');
      }
   }

   height(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxGauge('height', arg);
      } else {
          return this.host.jqxGauge('height');
      }
   }

   int64(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxGauge('int64', arg);
      } else {
          return this.host.jqxGauge('int64');
      }
   }

   labels(arg?: jqwidgets.GaugeLabels): jqwidgets.GaugeLabels {
      if (arg !== undefined) {
          this.host.jqxGauge('labels', arg);
      } else {
          return this.host.jqxGauge('labels');
      }
   }

   min(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxGauge('min', arg);
      } else {
          return this.host.jqxGauge('min');
      }
   }

   max(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxGauge('max', arg);
      } else {
          return this.host.jqxGauge('max');
      }
   }

   pointer(arg?: jqwidgets.GaugePointer): jqwidgets.GaugePointer {
      if (arg !== undefined) {
          this.host.jqxGauge('pointer', arg);
      } else {
          return this.host.jqxGauge('pointer');
      }
   }

   radius(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxGauge('radius', arg);
      } else {
          return this.host.jqxGauge('radius');
      }
   }

   ranges(arg?: Array<jqwidgets.GaugeRanges>): Array<jqwidgets.GaugeRanges> {
      if (arg !== undefined) {
          this.host.jqxGauge('ranges', arg);
      } else {
          return this.host.jqxGauge('ranges');
      }
   }

   startAngle(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxGauge('startAngle', arg);
      } else {
          return this.host.jqxGauge('startAngle');
      }
   }

   showRanges(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxGauge('showRanges', arg);
      } else {
          return this.host.jqxGauge('showRanges');
      }
   }

   styles(arg?: jqwidgets.GaugeStyle): jqwidgets.GaugeStyle {
      if (arg !== undefined) {
          this.host.jqxGauge('styles', arg);
      } else {
          return this.host.jqxGauge('styles');
      }
   }

   ticksMajor(arg?: jqwidgets.GaugeTicks): jqwidgets.GaugeTicks {
      if (arg !== undefined) {
          this.host.jqxGauge('ticksMajor', arg);
      } else {
          return this.host.jqxGauge('ticksMajor');
      }
   }

   ticksMinor(arg?: jqwidgets.GaugeTicks): jqwidgets.GaugeTicks {
      if (arg !== undefined) {
          this.host.jqxGauge('ticksMinor', arg);
      } else {
          return this.host.jqxGauge('ticksMinor');
      }
   }

   ticksDistance(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxGauge('ticksDistance', arg);
      } else {
          return this.host.jqxGauge('ticksDistance');
      }
   }

   value(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxGauge('value', arg);
      } else {
          return this.host.jqxGauge('value');
      }
   }

   width(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxGauge('width', arg);
      } else {
          return this.host.jqxGauge('width');
      }
   }


   // jqxGaugeComponent functions
   disable(): void {
      this.host.jqxGauge('disable');
   }

   enable(): void {
      this.host.jqxGauge('enable');
   }

   val(value?: number): any {
      if (value !== undefined) {
         return this.host.jqxGauge('val', value);
      } else {
         return this.host.jqxGauge('val');
      }
   };


   // jqxGaugeComponent events
   @Output() onValueChanging = new EventEmitter();
   @Output() onValueChanged = new EventEmitter();

   __wireEvents__(): void {
      this.host.on('valueChanging', (eventData: any) => { this.onValueChanging.emit(eventData); });
      this.host.on('valueChanged', (eventData: any) => { this.onValueChanged.emit(eventData); });
   }

} //jqxGaugeComponent


