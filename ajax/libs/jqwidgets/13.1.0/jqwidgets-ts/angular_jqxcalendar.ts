/*
jQWidgets v13.1.0 (2021-Nov)
Copyright (c) 2011-2021 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

/// <reference path="jqwidgets.d.ts" />

import '../jqwidgets/jqxcore.js';
import '../jqwidgets/jqxbuttons.js';
import '../jqwidgets/jqxtooltip.js';
import '../jqwidgets/globalization/globalize.js';
import '../jqwidgets/jqxdatetimeinput.js';
import '../jqwidgets/jqxcalendar.js';

import { Component, Input, Output, EventEmitter, ElementRef, forwardRef, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const noop = () => { };
declare let JQXLite: any;

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => jqxCalendarComponent),
    multi: true
}

@Component({
    selector: 'jqxCalendar',
    template: '<div><ng-content></ng-content></div>',
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class jqxCalendarComponent implements ControlValueAccessor, OnChanges 
{
   @Input('backText') attrBackText: string;
   @Input('columnHeaderHeight') attrColumnHeaderHeight: number;
   @Input('clearString') attrClearString: string;
   @Input('culture') attrCulture: string;
   @Input('dayNameFormat') attrDayNameFormat: string;
   @Input('disabled') attrDisabled: boolean;
   @Input('enableWeekend') attrEnableWeekend: boolean;
   @Input('enableViews') attrEnableViews: boolean;
   @Input('enableOtherMonthDays') attrEnableOtherMonthDays: boolean;
   @Input('enableFastNavigation') attrEnableFastNavigation: boolean;
   @Input('enableHover') attrEnableHover: boolean;
   @Input('enableAutoNavigation') attrEnableAutoNavigation: boolean;
   @Input('enableTooltips') attrEnableTooltips: boolean;
   @Input('forwardText') attrForwardText: string;
   @Input('firstDayOfWeek') attrFirstDayOfWeek: number;
   @Input('min') attrMin: any;
   @Input('max') attrMax: any;
   @Input('navigationDelay') attrNavigationDelay: number;
   @Input('rowHeaderWidth') attrRowHeaderWidth: number | string;
   @Input('readOnly') attrReadOnly: boolean;
   @Input('restrictedDates') attrRestrictedDates: Array<Date>;
   @Input('rtl') attrRtl: boolean;
   @Input('stepMonths') attrStepMonths: number;
   @Input('showWeekNumbers') attrShowWeekNumbers: boolean;
   @Input('showDayNames') attrShowDayNames: boolean;
   @Input('showOtherMonthDays') attrShowOtherMonthDays: boolean;
   @Input('showFooter') attrShowFooter: boolean;
   @Input('selectionMode') attrSelectionMode: string;
   @Input('specialDates') attrSpecialDates: Array<any>;
   @Input('theme') attrTheme: string;
   @Input('titleHeight') attrTitleHeight: number;
   @Input('titleFormat') attrTitleFormat: string;
   @Input('todayString') attrTodayString: string;
   @Input('value') attrValue: Date;
   @Input('width') attrWidth: string | number;
   @Input('height') attrHeight: string | number;

   @Input('auto-create') autoCreate: boolean = true;

   properties: string[] = ['backText','columnHeaderHeight','clearString','culture','dayNameFormat','disabled','enableWeekend','enableViews','enableOtherMonthDays','enableFastNavigation','enableHover','enableAutoNavigation','enableTooltips','forwardText','firstDayOfWeek','height','min','max','navigationDelay','rowHeaderWidth','readOnly','restrictedDates','rtl','stepMonths','showWeekNumbers','showDayNames','showOtherMonthDays','showFooter','selectionMode','specialDates','theme','titleHeight','titleFormat','todayString','value','width'];
   host: any;
   elementRef: ElementRef;
   widgetObject:  jqwidgets.jqxCalendar;

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
                     areEqual = this.arraysEqual(this[attrName], this.host.jqxCalendar(this.properties[i]));
                  }
                  if (areEqual) {
                     return false;
                  }

                  this.host.jqxCalendar(this.properties[i], this[attrName]);
                  continue;
               }

               if (this[attrName] !== this.host.jqxCalendar(this.properties[i])) {
                  this.host.jqxCalendar(this.properties[i], this[attrName]); 
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
      this.widgetObject = jqwidgets.createInstance(this.host, 'jqxCalendar', options);

   }

   createWidget(options?: any): void {
        this.createComponent(options);
   }

   __updateRect__() : void {
      if(this.host) this.host.css({ width: this.attrWidth, height: this.attrHeight });
   }

   writeValue(value: any): void {
       if(this.widgetObject) {
           this.onChangeCallback(this.host.val());
       }
       if (this.host && (value === null || value === undefined)) {
               this.host.jqxCalendar('val', '');
       }
   }

   registerOnChange(fn: any): void {
       this.onChangeCallback = fn;
   }

   registerOnTouched(fn: any): void {
       this.onTouchedCallback = fn;
   }

   setOptions(options: any) : void {
      this.host.jqxCalendar('setOptions', options);
   }

   // jqxCalendarComponent properties
   backText(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxCalendar('backText', arg);
      } else {
          return this.host.jqxCalendar('backText');
      }
   }

   columnHeaderHeight(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxCalendar('columnHeaderHeight', arg);
      } else {
          return this.host.jqxCalendar('columnHeaderHeight');
      }
   }

   clearString(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxCalendar('clearString', arg);
      } else {
          return this.host.jqxCalendar('clearString');
      }
   }

   culture(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxCalendar('culture', arg);
      } else {
          return this.host.jqxCalendar('culture');
      }
   }

   dayNameFormat(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxCalendar('dayNameFormat', arg);
      } else {
          return this.host.jqxCalendar('dayNameFormat');
      }
   }

   disabled(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxCalendar('disabled', arg);
      } else {
          return this.host.jqxCalendar('disabled');
      }
   }

   enableWeekend(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxCalendar('enableWeekend', arg);
      } else {
          return this.host.jqxCalendar('enableWeekend');
      }
   }

   enableViews(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxCalendar('enableViews', arg);
      } else {
          return this.host.jqxCalendar('enableViews');
      }
   }

   enableOtherMonthDays(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxCalendar('enableOtherMonthDays', arg);
      } else {
          return this.host.jqxCalendar('enableOtherMonthDays');
      }
   }

   enableFastNavigation(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxCalendar('enableFastNavigation', arg);
      } else {
          return this.host.jqxCalendar('enableFastNavigation');
      }
   }

   enableHover(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxCalendar('enableHover', arg);
      } else {
          return this.host.jqxCalendar('enableHover');
      }
   }

   enableAutoNavigation(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxCalendar('enableAutoNavigation', arg);
      } else {
          return this.host.jqxCalendar('enableAutoNavigation');
      }
   }

   enableTooltips(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxCalendar('enableTooltips', arg);
      } else {
          return this.host.jqxCalendar('enableTooltips');
      }
   }

   forwardText(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxCalendar('forwardText', arg);
      } else {
          return this.host.jqxCalendar('forwardText');
      }
   }

   firstDayOfWeek(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxCalendar('firstDayOfWeek', arg);
      } else {
          return this.host.jqxCalendar('firstDayOfWeek');
      }
   }

   height(arg?: string | number): string | number {
      if (arg !== undefined) {
          this.host.jqxCalendar('height', arg);
      } else {
          return this.host.jqxCalendar('height');
      }
   }

   min(arg?: any): any {
      if (arg !== undefined) {
          this.host.jqxCalendar('min', arg);
      } else {
          return this.host.jqxCalendar('min');
      }
   }

   max(arg?: any): any {
      if (arg !== undefined) {
          this.host.jqxCalendar('max', arg);
      } else {
          return this.host.jqxCalendar('max');
      }
   }

   navigationDelay(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxCalendar('navigationDelay', arg);
      } else {
          return this.host.jqxCalendar('navigationDelay');
      }
   }

   rowHeaderWidth(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxCalendar('rowHeaderWidth', arg);
      } else {
          return this.host.jqxCalendar('rowHeaderWidth');
      }
   }

   readOnly(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxCalendar('readOnly', arg);
      } else {
          return this.host.jqxCalendar('readOnly');
      }
   }

   restrictedDates(arg?: Date): Date {
      if (arg !== undefined) {
          this.host.jqxCalendar('restrictedDates', arg);
      } else {
          return this.host.jqxCalendar('restrictedDates');
      }
   }

   rtl(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxCalendar('rtl', arg);
      } else {
          return this.host.jqxCalendar('rtl');
      }
   }

   stepMonths(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxCalendar('stepMonths', arg);
      } else {
          return this.host.jqxCalendar('stepMonths');
      }
   }

   showWeekNumbers(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxCalendar('showWeekNumbers', arg);
      } else {
          return this.host.jqxCalendar('showWeekNumbers');
      }
   }

   showDayNames(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxCalendar('showDayNames', arg);
      } else {
          return this.host.jqxCalendar('showDayNames');
      }
   }

   showOtherMonthDays(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxCalendar('showOtherMonthDays', arg);
      } else {
          return this.host.jqxCalendar('showOtherMonthDays');
      }
   }

   showFooter(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxCalendar('showFooter', arg);
      } else {
          return this.host.jqxCalendar('showFooter');
      }
   }

   selectionMode(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxCalendar('selectionMode', arg);
      } else {
          return this.host.jqxCalendar('selectionMode');
      }
   }

   specialDates(arg?: Array<any>): Array<any> {
      if (arg !== undefined) {
          this.host.jqxCalendar('specialDates', arg);
      } else {
          return this.host.jqxCalendar('specialDates');
      }
   }

   theme(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxCalendar('theme', arg);
      } else {
          return this.host.jqxCalendar('theme');
      }
   }

   titleHeight(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxCalendar('titleHeight', arg);
      } else {
          return this.host.jqxCalendar('titleHeight');
      }
   }

   titleFormat(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxCalendar('titleFormat', arg);
      } else {
          return this.host.jqxCalendar('titleFormat');
      }
   }

   todayString(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxCalendar('todayString', arg);
      } else {
          return this.host.jqxCalendar('todayString');
      }
   }

   value(arg?: Date): Date {
      if (arg !== undefined) {
          this.host.jqxCalendar('value', arg);
      } else {
          return this.host.jqxCalendar('value');
      }
   }

   width(arg?: string | number): string | number {
      if (arg !== undefined) {
          this.host.jqxCalendar('width', arg);
      } else {
          return this.host.jqxCalendar('width');
      }
   }


   // jqxCalendarComponent functions
   clear(): void {
      this.host.jqxCalendar('clear');
   }

   destroy(): void {
      this.host.jqxCalendar('destroy');
   }

   focus(): void {
      this.host.jqxCalendar('focus');
   }

   addSpecialDate(date: any, specialDateClass: any, text: any): void {
      this.host.jqxCalendar('addSpecialDate', date, specialDateClass, text);
   }

   getMinDate(): any {
      return this.host.jqxCalendar('getMinDate');
   }

   getMaxDate(): any {
      return this.host.jqxCalendar('getMaxDate');
   }

   getDate(): any {
      return this.host.jqxCalendar('getDate');
   }

   getRange(): any {
      return this.host.jqxCalendar('getRange');
   }

   navigateForward(months: number): void {
      this.host.jqxCalendar('navigateForward', months);
   }

   navigateBackward(months: number): void {
      this.host.jqxCalendar('navigateBackward', months);
   }

   render(): void {
      this.host.jqxCalendar('render');
   }

   refresh(): void {
      this.host.jqxCalendar('refresh');
   }

   setMinDate(date: any): void {
      this.host.jqxCalendar('setMinDate', date);
   }

   setMaxDate(date: any): void {
      this.host.jqxCalendar('setMaxDate', date);
   }

   setDate(date: any): void {
      this.host.jqxCalendar('setDate', date);
   }

   setRange(date: any, date2: any): void {
      this.host.jqxCalendar('setRange', date, date2);
   }

   today(): void {
      this.host.jqxCalendar('today');
   }

   val(value?: Date, value2?: Date): any {
      if (value !== undefined) {
         return this.host.jqxCalendar('val', value, value2);
      } else {
         return this.host.jqxCalendar('val');
      }
   };


   // jqxCalendarComponent events
   @Output() onBackButtonClick = new EventEmitter();
   @Output() onChange = new EventEmitter();
   @Output() onNextButtonClick = new EventEmitter();
   @Output() onViewChange = new EventEmitter();

   __wireEvents__(): void {
      this.host.on('backButtonClick', (eventData: any) => { this.onBackButtonClick.emit(eventData); });
      this.host.on('change', (eventData: any) => { this.onChange.emit(eventData); this.onChangeCallback(this.host.val()); });
      this.host.on('nextButtonClick', (eventData: any) => { this.onNextButtonClick.emit(eventData); });
      this.host.on('viewChange', (eventData: any) => { this.onViewChange.emit(eventData); });
   }

} //jqxCalendarComponent


