/*
jQWidgets v13.1.0 (2021-Nov)
Copyright (c) 2011-2021 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

/// <reference path="jqwidgets.d.ts" />

import '../jqwidgets/jqxcore.js';
import '../jqwidgets/globalization/globalize.js';
import '../jqwidgets/jqxbuttons.js';
import '../jqwidgets/jqxtooltip.js';
import '../jqwidgets/jqxdatetimeinput.js';
import '../jqwidgets/jqxcalendar.js';

import { Component, Input, Output, EventEmitter, ElementRef, forwardRef, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const noop = () => { };
declare let JQXLite: any;

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => jqxDateTimeInputComponent),
    multi: true
}

@Component({
    selector: 'jqxDateTimeInput',
    template: '<input [(ngModel)]="ngValue">',
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class jqxDateTimeInputComponent implements ControlValueAccessor, OnChanges 
{
   @Input('animationType') attrAnimationType: string;
   @Input('allowNullDate') attrAllowNullDate: boolean;
   @Input('allowKeyboardDelete') attrAllowKeyboardDelete: boolean;
   @Input('clearString') attrClearString: string;
   @Input('culture') attrCulture: string;
   @Input('closeDelay') attrCloseDelay: number;
   @Input('closeCalendarAfterSelection') attrCloseCalendarAfterSelection: boolean;
   @Input('dropDownHorizontalAlignment') attrDropDownHorizontalAlignment: string;
   @Input('dropDownVerticalAlignment') attrDropDownVerticalAlignment: string;
   @Input('disabled') attrDisabled: boolean;
   @Input('enableBrowserBoundsDetection') attrEnableBrowserBoundsDetection: boolean;
   @Input('enableAbsoluteSelection') attrEnableAbsoluteSelection: boolean;
   @Input('editMode') attrEditMode: string;
   @Input('firstDayOfWeek') attrFirstDayOfWeek: number;
   @Input('formatString') attrFormatString: string;
   @Input('min') attrMin: Date;
   @Input('max') attrMax: Date;
   @Input('openDelay') attrOpenDelay: number;
   @Input('placeHolder') attrPlaceHolder: string;
   @Input('popupZIndex') attrPopupZIndex: number;
   @Input('rtl') attrRtl: boolean;
   @Input('readonly') attrReadonly: boolean;
   @Input('showFooter') attrShowFooter: boolean;
   @Input('selectionMode') attrSelectionMode: string;
   @Input('showWeekNumbers') attrShowWeekNumbers: boolean;
   @Input('showTimeButton') attrShowTimeButton: boolean;
   @Input('showCalendarButton') attrShowCalendarButton: boolean;
   @Input('showDeleteButton') attrShowDeleteButton: boolean;
   @Input('theme') attrTheme: string;
   @Input('template') attrTemplate: string;
   @Input('textAlign') attrTextAlign: string;
   @Input('todayString') attrTodayString: string;
   @Input('value') attrValue: Date | null;
   @Input('yearCutoff') attrYearCutoff: number;
   @Input('width') attrWidth: string | number;
   @Input('height') attrHeight: string | number;

   @Input('auto-create') autoCreate: boolean = true;

   properties: string[] = ['animationType','allowNullDate','allowKeyboardDelete','clearString','culture','closeDelay','closeCalendarAfterSelection','dropDownHorizontalAlignment','dropDownVerticalAlignment','disabled','enableBrowserBoundsDetection','enableAbsoluteSelection','editMode','firstDayOfWeek','formatString','height','min','max','openDelay','placeHolder','popupZIndex','rtl','readonly','showFooter','selectionMode','showWeekNumbers','showTimeButton','showCalendarButton','showDeleteButton','theme','template','textAlign','todayString','value','width','yearCutoff'];
   host: any;
   elementRef: ElementRef;
   widgetObject:  jqwidgets.jqxDateTimeInput;

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
                     areEqual = this.arraysEqual(this[attrName], this.host.jqxDateTimeInput(this.properties[i]));
                  }
                  if (areEqual) {
                     return false;
                  }

                  this.host.jqxDateTimeInput(this.properties[i], this[attrName]);
                  continue;
               }

               if (this[attrName] !== this.host.jqxDateTimeInput(this.properties[i])) {
                  this.host.jqxDateTimeInput(this.properties[i], this[attrName]); 
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

      this.widgetObject = jqwidgets.createInstance(this.host, 'jqxDateTimeInput', options);
      this.host = this.widgetObject['host'];
      this.__wireEvents__();

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
           this.host.jqxDateTimeInput('val', value);
       }
       if (this.host && (value === null || value === undefined)) {
               this.host.jqxDateTimeInput('val', '');
       }
   }

   registerOnChange(fn: any): void {
       this.onChangeCallback = fn;
   }

   registerOnTouched(fn: any): void {
       this.onTouchedCallback = fn;
   }

   setOptions(options: any) : void {
      this.host.jqxDateTimeInput('setOptions', options);
   }

   // jqxDateTimeInputComponent properties
   animationType(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxDateTimeInput('animationType', arg);
      } else {
          return this.host.jqxDateTimeInput('animationType');
      }
   }

   allowNullDate(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxDateTimeInput('allowNullDate', arg);
      } else {
          return this.host.jqxDateTimeInput('allowNullDate');
      }
   }

   allowKeyboardDelete(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxDateTimeInput('allowKeyboardDelete', arg);
      } else {
          return this.host.jqxDateTimeInput('allowKeyboardDelete');
      }
   }

   clearString(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxDateTimeInput('clearString', arg);
      } else {
          return this.host.jqxDateTimeInput('clearString');
      }
   }

   culture(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxDateTimeInput('culture', arg);
      } else {
          return this.host.jqxDateTimeInput('culture');
      }
   }

   closeDelay(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxDateTimeInput('closeDelay', arg);
      } else {
          return this.host.jqxDateTimeInput('closeDelay');
      }
   }

   closeCalendarAfterSelection(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxDateTimeInput('closeCalendarAfterSelection', arg);
      } else {
          return this.host.jqxDateTimeInput('closeCalendarAfterSelection');
      }
   }

   dropDownHorizontalAlignment(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxDateTimeInput('dropDownHorizontalAlignment', arg);
      } else {
          return this.host.jqxDateTimeInput('dropDownHorizontalAlignment');
      }
   }

   dropDownVerticalAlignment(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxDateTimeInput('dropDownVerticalAlignment', arg);
      } else {
          return this.host.jqxDateTimeInput('dropDownVerticalAlignment');
      }
   }

   disabled(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxDateTimeInput('disabled', arg);
      } else {
          return this.host.jqxDateTimeInput('disabled');
      }
   }

   enableBrowserBoundsDetection(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxDateTimeInput('enableBrowserBoundsDetection', arg);
      } else {
          return this.host.jqxDateTimeInput('enableBrowserBoundsDetection');
      }
   }

   enableAbsoluteSelection(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxDateTimeInput('enableAbsoluteSelection', arg);
      } else {
          return this.host.jqxDateTimeInput('enableAbsoluteSelection');
      }
   }

   editMode(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxDateTimeInput('editMode', arg);
      } else {
          return this.host.jqxDateTimeInput('editMode');
      }
   }

   firstDayOfWeek(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxDateTimeInput('firstDayOfWeek', arg);
      } else {
          return this.host.jqxDateTimeInput('firstDayOfWeek');
      }
   }

   formatString(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxDateTimeInput('formatString', arg);
      } else {
          return this.host.jqxDateTimeInput('formatString');
      }
   }

   height(arg?: string | number): string | number {
      if (arg !== undefined) {
          this.host.jqxDateTimeInput('height', arg);
      } else {
          return this.host.jqxDateTimeInput('height');
      }
   }

   min(arg?: Date): Date {
      if (arg !== undefined) {
          this.host.jqxDateTimeInput('min', arg);
      } else {
          return this.host.jqxDateTimeInput('min');
      }
   }

   max(arg?: Date): Date {
      if (arg !== undefined) {
          this.host.jqxDateTimeInput('max', arg);
      } else {
          return this.host.jqxDateTimeInput('max');
      }
   }

   openDelay(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxDateTimeInput('openDelay', arg);
      } else {
          return this.host.jqxDateTimeInput('openDelay');
      }
   }

   placeHolder(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxDateTimeInput('placeHolder', arg);
      } else {
          return this.host.jqxDateTimeInput('placeHolder');
      }
   }

   popupZIndex(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxDateTimeInput('popupZIndex', arg);
      } else {
          return this.host.jqxDateTimeInput('popupZIndex');
      }
   }

   rtl(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxDateTimeInput('rtl', arg);
      } else {
          return this.host.jqxDateTimeInput('rtl');
      }
   }

   readonly(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxDateTimeInput('readonly', arg);
      } else {
          return this.host.jqxDateTimeInput('readonly');
      }
   }

   showFooter(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxDateTimeInput('showFooter', arg);
      } else {
          return this.host.jqxDateTimeInput('showFooter');
      }
   }

   selectionMode(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxDateTimeInput('selectionMode', arg);
      } else {
          return this.host.jqxDateTimeInput('selectionMode');
      }
   }

   showWeekNumbers(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxDateTimeInput('showWeekNumbers', arg);
      } else {
          return this.host.jqxDateTimeInput('showWeekNumbers');
      }
   }

   showTimeButton(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxDateTimeInput('showTimeButton', arg);
      } else {
          return this.host.jqxDateTimeInput('showTimeButton');
      }
   }

   showCalendarButton(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxDateTimeInput('showCalendarButton', arg);
      } else {
          return this.host.jqxDateTimeInput('showCalendarButton');
      }
   }

   showDeleteButton(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxDateTimeInput('showDeleteButton', arg);
      } else {
          return this.host.jqxDateTimeInput('showDeleteButton');
      }
   }

   theme(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxDateTimeInput('theme', arg);
      } else {
          return this.host.jqxDateTimeInput('theme');
      }
   }

   template(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxDateTimeInput('template', arg);
      } else {
          return this.host.jqxDateTimeInput('template');
      }
   }

   textAlign(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxDateTimeInput('textAlign', arg);
      } else {
          return this.host.jqxDateTimeInput('textAlign');
      }
   }

   todayString(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxDateTimeInput('todayString', arg);
      } else {
          return this.host.jqxDateTimeInput('todayString');
      }
   }

   value(arg?: Date): Date {
      if (arg !== undefined) {
          this.host.jqxDateTimeInput('value', arg);
      } else {
          return this.host.jqxDateTimeInput('value');
      }
   }

   width(arg?: string | number): string | number {
      if (arg !== undefined) {
          this.host.jqxDateTimeInput('width', arg);
      } else {
          return this.host.jqxDateTimeInput('width');
      }
   }

   yearCutoff(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxDateTimeInput('yearCutoff', arg);
      } else {
          return this.host.jqxDateTimeInput('yearCutoff');
      }
   }


   // jqxDateTimeInputComponent functions
   close(): void {
      this.host.jqxDateTimeInput('close');
   }

   destroy(): void {
      this.host.jqxDateTimeInput('destroy');
   }

   focus(): void {
      this.host.jqxDateTimeInput('focus');
   }

   getRange(): any {
      return this.host.jqxDateTimeInput('getRange');
   }

   getText(): string {
      return this.host.jqxDateTimeInput('getText');
   }

   getDate(): any {
      return this.host.jqxDateTimeInput('getDate');
   }

   getMaxDate(): any {
      return this.host.jqxDateTimeInput('getMaxDate');
   }

   getMinDate(): any {
      return this.host.jqxDateTimeInput('getMinDate');
   }

   open(): void {
      this.host.jqxDateTimeInput('open');
   }

   setRange(date: any, date2: any): void {
      this.host.jqxDateTimeInput('setRange', date, date2);
   }

   setMinDate(date: any): void {
      this.host.jqxDateTimeInput('setMinDate', date);
   }

   setMaxDate(date: any): void {
      this.host.jqxDateTimeInput('setMaxDate', date);
   }

   setDate(date: any): void {
      this.host.jqxDateTimeInput('setDate', date);
   }

   val(value?: any, value2?: any): any {
      if (value !== undefined) {
         return this.host.jqxDateTimeInput('val', value, value2);
      } else {
         return this.host.jqxDateTimeInput('val');
      }
   };


   // jqxDateTimeInputComponent events
   @Output() onChange = new EventEmitter();
   @Output() onClose = new EventEmitter();
   @Output() onOpen = new EventEmitter();
   @Output() onTextchanged = new EventEmitter();
   @Output() onValueChanged = new EventEmitter();

   __wireEvents__(): void {
      this.host.on('change', (eventData: any) => { this.onChange.emit(eventData); this.onChangeCallback(this.host.val()); });
      this.host.on('close', (eventData: any) => { this.onClose.emit(eventData); });
      this.host.on('open', (eventData: any) => { this.onOpen.emit(eventData); });
      this.host.on('textchanged', (eventData: any) => { this.onTextchanged.emit(eventData); });
      this.host.on('valueChanged', (eventData: any) => { this.onValueChanged.emit(eventData); this.onChangeCallback(this.host.val()); });
      this.host.on('keyup', () => { this.onChangeCallback(this.host.val()); });
   }

} //jqxDateTimeInputComponent


