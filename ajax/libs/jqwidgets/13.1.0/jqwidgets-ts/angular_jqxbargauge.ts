/*
jQWidgets v13.1.0 (2021-Nov)
Copyright (c) 2011-2021 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

/// <reference path="jqwidgets.d.ts" />

import '../jqwidgets/jqxcore.js';
import '../jqwidgets/jqxdraw.js';
import '../jqwidgets/jqxbargauge.js';

import { Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
declare let JQXLite: any;

@Component({
    selector: 'jqxBarGauge',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxBarGaugeComponent implements OnChanges
{
   @Input('animationDuration') attrAnimationDuration: number;
   @Input('backgroundColor') attrBackgroundColor: string;
   @Input('barSpacing') attrBarSpacing: number;
   @Input('baseValue') attrBaseValue: number;
   @Input('colorScheme') attrColorScheme: string;
   @Input('customColorScheme') attrCustomColorScheme: jqwidgets.BarGaugeCustomColorScheme;
   @Input('disabled') attrDisabled: boolean;
   @Input('endAngle') attrEndAngle: number;
   @Input('formatFunction') attrFormatFunction: (value: number, index?: number, color?: string) => string;
   @Input('labels') attrLabels: jqwidgets.BarGaugeLabels;
   @Input('max') attrMax: number | string;
   @Input('min') attrMin: number;
   @Input('relativeInnerRadius') attrRelativeInnerRadius: number | string;
   @Input('rendered') attrRendered: () => void;
   @Input('startAngle') attrStartAngle: number;
   @Input('title') attrTitle: jqwidgets.BarGaugeTitle;
   @Input('tooltip') attrTooltip: jqwidgets.BarGaugeTooltip;
   @Input('useGradient') attrUseGradient: boolean;
   @Input('values') attrValues: Array<number>;
   @Input('width') attrWidth: string | number;
   @Input('height') attrHeight: string | number;

   @Input('auto-create') autoCreate: boolean = true;

   properties: string[] = ['animationDuration','backgroundColor','barSpacing','baseValue','colorScheme','customColorScheme','disabled','endAngle','formatFunction','height','labels','max','min','relativeInnerRadius','rendered','startAngle','title','tooltip','useGradient','values','width'];
   host: any;
   elementRef: ElementRef;
   widgetObject:  jqwidgets.jqxBarGauge;

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
                     areEqual = this.arraysEqual(this[attrName], this.host.jqxBarGauge(this.properties[i]));
                  }
                  if (areEqual) {
                     return false;
                  }

                  this.host.jqxBarGauge(this.properties[i], this[attrName]);
                  continue;
               }

               if (this[attrName] !== this.host.jqxBarGauge(this.properties[i])) {
                  this.host.jqxBarGauge(this.properties[i], this[attrName]); 
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

      if (typeof options.width === 'string' && options.width.indexOf('%') !== -1) {
         options.width = parseInt(options.width, 10) / 100 * this.host.parent().parent().parent().width();
      }
      if (typeof options.height === 'string' && options.height.indexOf('%') !== -1) {
         options.height = parseInt(options.height, 10) / 100 * this.host.parent().parent().parent().height();
      }
      this.__wireEvents__();
      this.widgetObject = jqwidgets.createInstance(this.host, 'jqxBarGauge', options);

   }

   createWidget(options?: any): void {
        this.createComponent(options);
   }

   __updateRect__() : void {
      if(this.host) this.host.css({ width: this.attrWidth, height: this.attrHeight });
   }

   setOptions(options: any) : void {
      this.host.jqxBarGauge('setOptions', options);
   }

   // jqxBarGaugeComponent properties
   animationDuration(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxBarGauge('animationDuration', arg);
      } else {
          return this.host.jqxBarGauge('animationDuration');
      }
   }

   backgroundColor(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxBarGauge('backgroundColor', arg);
      } else {
          return this.host.jqxBarGauge('backgroundColor');
      }
   }

   barSpacing(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxBarGauge('barSpacing', arg);
      } else {
          return this.host.jqxBarGauge('barSpacing');
      }
   }

   baseValue(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxBarGauge('baseValue', arg);
      } else {
          return this.host.jqxBarGauge('baseValue');
      }
   }

   colorScheme(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxBarGauge('colorScheme', arg);
      } else {
          return this.host.jqxBarGauge('colorScheme');
      }
   }

   customColorScheme(arg?: jqwidgets.BarGaugeCustomColorScheme): jqwidgets.BarGaugeCustomColorScheme {
      if (arg !== undefined) {
          this.host.jqxBarGauge('customColorScheme', arg);
      } else {
          return this.host.jqxBarGauge('customColorScheme');
      }
   }

   disabled(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxBarGauge('disabled', arg);
      } else {
          return this.host.jqxBarGauge('disabled');
      }
   }

   endAngle(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxBarGauge('endAngle', arg);
      } else {
          return this.host.jqxBarGauge('endAngle');
      }
   }

   formatFunction(arg?: (value: number, index?: number, color?: string) => string): (value: number, index?: number, color?: string) => string {
      if (arg !== undefined) {
          this.host.jqxBarGauge('formatFunction', arg);
      } else {
          return this.host.jqxBarGauge('formatFunction');
      }
   }

   height(arg?: string | number): string | number {
      if (arg !== undefined) {
          this.host.jqxBarGauge('height', arg);
      } else {
          return this.host.jqxBarGauge('height');
      }
   }

   labels(arg?: jqwidgets.BarGaugeLabels): jqwidgets.BarGaugeLabels {
      if (arg !== undefined) {
          this.host.jqxBarGauge('labels', arg);
      } else {
          return this.host.jqxBarGauge('labels');
      }
   }

   max(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxBarGauge('max', arg);
      } else {
          return this.host.jqxBarGauge('max');
      }
   }

   min(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxBarGauge('min', arg);
      } else {
          return this.host.jqxBarGauge('min');
      }
   }

   relativeInnerRadius(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxBarGauge('relativeInnerRadius', arg);
      } else {
          return this.host.jqxBarGauge('relativeInnerRadius');
      }
   }

   rendered(arg?: () => void): () => void {
      if (arg !== undefined) {
          this.host.jqxBarGauge('rendered', arg);
      } else {
          return this.host.jqxBarGauge('rendered');
      }
   }

   startAngle(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxBarGauge('startAngle', arg);
      } else {
          return this.host.jqxBarGauge('startAngle');
      }
   }

   title(arg?: jqwidgets.BarGaugeTitle): jqwidgets.BarGaugeTitle {
      if (arg !== undefined) {
          this.host.jqxBarGauge('title', arg);
      } else {
          return this.host.jqxBarGauge('title');
      }
   }

   tooltip(arg?: jqwidgets.BarGaugeTooltip): jqwidgets.BarGaugeTooltip {
      if (arg !== undefined) {
          this.host.jqxBarGauge('tooltip', arg);
      } else {
          return this.host.jqxBarGauge('tooltip');
      }
   }

   useGradient(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxBarGauge('useGradient', arg);
      } else {
          return this.host.jqxBarGauge('useGradient');
      }
   }

   values(arg?: Array<number>): Array<number> {
      if (arg !== undefined) {
          this.host.jqxBarGauge('values', arg);
      } else {
          return this.host.jqxBarGauge('values');
      }
   }

   width(arg?: string | number): string | number {
      if (arg !== undefined) {
          this.host.jqxBarGauge('width', arg);
      } else {
          return this.host.jqxBarGauge('width');
      }
   }


   // jqxBarGaugeComponent functions
   refresh(): void {
      this.host.jqxBarGauge('refresh');
   }

   render(): void {
      this.host.jqxBarGauge('render');
   }

   val(value?: Array<number>): any {
      if (value !== undefined) {
         return this.host.jqxBarGauge('val', value);
      } else {
         return this.host.jqxBarGauge('val');
      }
   };


   // jqxBarGaugeComponent events
   @Output() onDrawEnd = new EventEmitter();
   @Output() onDrawStart = new EventEmitter();
   @Output() onInitialized = new EventEmitter();
   @Output() onTooltipClose = new EventEmitter();
   @Output() onTooltipOpen = new EventEmitter();
   @Output() onValueChanged = new EventEmitter();

   __wireEvents__(): void {
      this.host.on('drawEnd', (eventData: any) => { this.onDrawEnd.emit(eventData); });
      this.host.on('drawStart', (eventData: any) => { this.onDrawStart.emit(eventData); });
      this.host.on('initialized', (eventData: any) => { this.onInitialized.emit(eventData); });
      this.host.on('tooltipClose', (eventData: any) => { this.onTooltipClose.emit(eventData); });
      this.host.on('tooltipOpen', (eventData: any) => { this.onTooltipOpen.emit(eventData); });
      this.host.on('valueChanged', (eventData: any) => { this.onValueChanged.emit(eventData); });
   }

} //jqxBarGaugeComponent


