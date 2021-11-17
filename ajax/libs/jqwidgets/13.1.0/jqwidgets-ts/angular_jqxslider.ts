/*
jQWidgets v13.1.0 (2021-Nov)
Copyright (c) 2011-2021 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

/// <reference path="jqwidgets.d.ts" />

import '../jqwidgets/jqxcore.js';
import '../jqwidgets/jqxbuttons.js';
import '../jqwidgets/jqxslider.js';

import { Component, Input, Output, EventEmitter, ElementRef, forwardRef, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const noop = () => { };
declare let JQXLite: any;

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => jqxSliderComponent),
    multi: true
}

@Component({
    selector: 'jqxSlider',
    template: '<div><ng-content></ng-content></div>',
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class jqxSliderComponent implements ControlValueAccessor, OnChanges 
{
   @Input('buttonsPosition') attrButtonsPosition: string;
   @Input('disabled') attrDisabled: boolean;
   @Input('layout') attrLayout: string;
   @Input('mode') attrMode: string;
   @Input('minorTicksFrequency') attrMinorTicksFrequency: number;
   @Input('minorTickSize') attrMinorTickSize: number;
   @Input('max') attrMax: number;
   @Input('min') attrMin: number;
   @Input('orientation') attrOrientation: string;
   @Input('rangeSlider') attrRangeSlider: boolean;
   @Input('rtl') attrRtl: boolean;
   @Input('step') attrStep: number;
   @Input('showTicks') attrShowTicks: boolean;
   @Input('showMinorTicks') attrShowMinorTicks: boolean;
   @Input('showTickLabels') attrShowTickLabels: boolean;
   @Input('showButtons') attrShowButtons: boolean;
   @Input('showRange') attrShowRange: boolean;
   @Input('template') attrTemplate: string;
   @Input('theme') attrTheme: string;
   @Input('ticksPosition') attrTicksPosition: string;
   @Input('ticksFrequency') attrTicksFrequency: number;
   @Input('tickSize') attrTickSize: number;
   @Input('tickLabelFormatFunction') attrTickLabelFormatFunction: (value: jqwidgets.SliderTickLabelFormatFunction['value']) => string;
   @Input('tooltip') attrTooltip: boolean;
   @Input('tooltipHideDelay') attrTooltipHideDelay: number;
   @Input('tooltipPosition') attrTooltipPosition: string;
   @Input('tooltipFormatFunction') attrTooltipFormatFunction: (value: jqwidgets.SliderTooltipFormatFunction['value']) => any;
   @Input('value') attrValue: any;
   @Input('values') attrValues: Array<number>;
   @Input('width') attrWidth: string | number;
   @Input('height') attrHeight: string | number;

   @Input('auto-create') autoCreate: boolean = true;

   properties: string[] = ['buttonsPosition','disabled','height','layout','mode','minorTicksFrequency','minorTickSize','max','min','orientation','rangeSlider','rtl','step','showTicks','showMinorTicks','showTickLabels','showButtons','showRange','template','theme','ticksPosition','ticksFrequency','tickSize','tickLabelFormatFunction','tooltip','tooltipHideDelay','tooltipPosition','tooltipFormatFunction','value','values','width'];
   host: any;
   elementRef: ElementRef;
   widgetObject:  jqwidgets.jqxSlider;

   private onTouchedCallback: () => void = noop;
   private onChangeCallback: (_: any) => void = noop;

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
                     areEqual = this.arraysEqual(this[attrName], this.host.jqxSlider(this.properties[i]));
                  }
                  if (areEqual) {
                     return false;
                  }

                  this.host.jqxSlider(this.properties[i], this[attrName]);
                  continue;
               }

               if (this[attrName] !== this.host.jqxSlider(this.properties[i])) {
                  this.host.jqxSlider(this.properties[i], this[attrName]); 
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
      this.widgetObject = jqwidgets.createInstance(this.host, 'jqxSlider', options);

   }

   createWidget(options?: any): void {
        this.createComponent(options);
   }

   __updateRect__() : void {
      if(this.host) this.host.css({ width: this.attrWidth, height: this.attrHeight });
   }

   get ngValue(): any {
       if (this.widgetObject) {
           const value = this.host.val();
           return value;
       }
       return '';
   }

   set ngValue(value: any) {
       if (this.widgetObject) {
           this.onChangeCallback(value);
       }
   }

   writeValue(value: any): void {
       if(this.widgetObject) {
           this.onChangeCallback(this.host.val());
       }
       if (this.host && (value === null || value === undefined)) {
               this.host.jqxSlider('val', '');
       }
   }

   registerOnChange(fn: any): void {
       this.onChangeCallback = fn;
   }

   registerOnTouched(fn: any): void {
       this.onTouchedCallback = fn;
   }

   setOptions(options: any) : void {
      this.host.jqxSlider('setOptions', options);
   }

   // jqxSliderComponent properties
   buttonsPosition(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxSlider('buttonsPosition', arg);
      } else {
          return this.host.jqxSlider('buttonsPosition');
      }
   }

   disabled(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxSlider('disabled', arg);
      } else {
          return this.host.jqxSlider('disabled');
      }
   }

   height(arg?: string | number): string | number {
      if (arg !== undefined) {
          this.host.jqxSlider('height', arg);
      } else {
          return this.host.jqxSlider('height');
      }
   }

   layout(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxSlider('layout', arg);
      } else {
          return this.host.jqxSlider('layout');
      }
   }

   mode(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxSlider('mode', arg);
      } else {
          return this.host.jqxSlider('mode');
      }
   }

   minorTicksFrequency(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxSlider('minorTicksFrequency', arg);
      } else {
          return this.host.jqxSlider('minorTicksFrequency');
      }
   }

   minorTickSize(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxSlider('minorTickSize', arg);
      } else {
          return this.host.jqxSlider('minorTickSize');
      }
   }

   max(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxSlider('max', arg);
      } else {
          return this.host.jqxSlider('max');
      }
   }

   min(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxSlider('min', arg);
      } else {
          return this.host.jqxSlider('min');
      }
   }

   orientation(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxSlider('orientation', arg);
      } else {
          return this.host.jqxSlider('orientation');
      }
   }

   rangeSlider(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxSlider('rangeSlider', arg);
      } else {
          return this.host.jqxSlider('rangeSlider');
      }
   }

   rtl(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxSlider('rtl', arg);
      } else {
          return this.host.jqxSlider('rtl');
      }
   }

   step(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxSlider('step', arg);
      } else {
          return this.host.jqxSlider('step');
      }
   }

   showTicks(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxSlider('showTicks', arg);
      } else {
          return this.host.jqxSlider('showTicks');
      }
   }

   showMinorTicks(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxSlider('showMinorTicks', arg);
      } else {
          return this.host.jqxSlider('showMinorTicks');
      }
   }

   showTickLabels(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxSlider('showTickLabels', arg);
      } else {
          return this.host.jqxSlider('showTickLabels');
      }
   }

   showButtons(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxSlider('showButtons', arg);
      } else {
          return this.host.jqxSlider('showButtons');
      }
   }

   showRange(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxSlider('showRange', arg);
      } else {
          return this.host.jqxSlider('showRange');
      }
   }

   template(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxSlider('template', arg);
      } else {
          return this.host.jqxSlider('template');
      }
   }

   theme(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxSlider('theme', arg);
      } else {
          return this.host.jqxSlider('theme');
      }
   }

   ticksPosition(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxSlider('ticksPosition', arg);
      } else {
          return this.host.jqxSlider('ticksPosition');
      }
   }

   ticksFrequency(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxSlider('ticksFrequency', arg);
      } else {
          return this.host.jqxSlider('ticksFrequency');
      }
   }

   tickSize(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxSlider('tickSize', arg);
      } else {
          return this.host.jqxSlider('tickSize');
      }
   }

   tickLabelFormatFunction(arg?: (value: jqwidgets.SliderTickLabelFormatFunction['value']) => string): (value: jqwidgets.SliderTickLabelFormatFunction['value']) => string {
      if (arg !== undefined) {
          this.host.jqxSlider('tickLabelFormatFunction', arg);
      } else {
          return this.host.jqxSlider('tickLabelFormatFunction');
      }
   }

   tooltip(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxSlider('tooltip', arg);
      } else {
          return this.host.jqxSlider('tooltip');
      }
   }

   tooltipHideDelay(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxSlider('tooltipHideDelay', arg);
      } else {
          return this.host.jqxSlider('tooltipHideDelay');
      }
   }

   tooltipPosition(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxSlider('tooltipPosition', arg);
      } else {
          return this.host.jqxSlider('tooltipPosition');
      }
   }

   tooltipFormatFunction(arg?: (value: jqwidgets.SliderTooltipFormatFunction['value']) => any): (value: jqwidgets.SliderTooltipFormatFunction['value']) => any {
      if (arg !== undefined) {
          this.host.jqxSlider('tooltipFormatFunction', arg);
      } else {
          return this.host.jqxSlider('tooltipFormatFunction');
      }
   }

   value(arg?: any): any {
      if (arg !== undefined) {
          this.host.jqxSlider('value', arg);
      } else {
          return this.host.jqxSlider('value');
      }
   }

   values(arg?: Array<number>): Array<number> {
      if (arg !== undefined) {
          this.host.jqxSlider('values', arg);
      } else {
          return this.host.jqxSlider('values');
      }
   }

   width(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxSlider('width', arg);
      } else {
          return this.host.jqxSlider('width');
      }
   }


   // jqxSliderComponent functions
   destroy(): void {
      this.host.jqxSlider('destroy');
   }

   decrementValue(): void {
      this.host.jqxSlider('decrementValue');
   }

   disable(): void {
      this.host.jqxSlider('disable');
   }

   enable(): void {
      this.host.jqxSlider('enable');
   }

   focus(): void {
      this.host.jqxSlider('focus');
   }

   getValue(): number {
      return this.host.jqxSlider('getValue');
   }

   incrementValue(): void {
      this.host.jqxSlider('incrementValue');
   }

   setValue(index: number | number[]): void {
      this.host.jqxSlider('setValue', index);
   }

   val(value?: string): any {
      if (value !== undefined) {
         return this.host.jqxSlider('val', value);
      } else {
         return this.host.jqxSlider('val');
      }
   };


   // jqxSliderComponent events
   @Output() onChange = new EventEmitter();
   @Output() onSlide = new EventEmitter();
   @Output() onSlideStart = new EventEmitter();
   @Output() onSlideEnd = new EventEmitter();

   __wireEvents__(): void {
      this.host.on('change', (eventData: any) => { this.onChange.emit(eventData); this.onChangeCallback(this.host.val()); });
      this.host.on('slide', (eventData: any) => { this.onSlide.emit(eventData); });
      this.host.on('slideStart', (eventData: any) => { this.onSlideStart.emit(eventData); });
      this.host.on('slideEnd', (eventData: any) => { this.onSlideEnd.emit(eventData); });
   }

} //jqxSliderComponent


