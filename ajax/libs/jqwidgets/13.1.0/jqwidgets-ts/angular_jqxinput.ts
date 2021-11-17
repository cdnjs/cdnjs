/*
jQWidgets v13.1.0 (2021-Nov)
Copyright (c) 2011-2021 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

/// <reference path="jqwidgets.d.ts" />

import '../jqwidgets/jqxcore.js';
import '../jqwidgets/jqxdata.js';
import '../jqwidgets/jqxinput.js';

import { Component, Input, Output, EventEmitter, ElementRef, forwardRef, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const noop = () => { };
declare let JQXLite: any;

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => jqxInputComponent),
    multi: true
}

@Component({
    selector: 'jqxInput',
    template: '<input type="text" [(ngModel)]="ngValue">',
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class jqxInputComponent implements ControlValueAccessor, OnChanges 
{
   @Input('disabled') attrDisabled: boolean;
   @Input('dropDownWidth') attrDropDownWidth: number | string;
   @Input('displayMember') attrDisplayMember: string;
   @Input('items') attrItems: number;
   @Input('minLength') attrMinLength: number;
   @Input('maxLength') attrMaxLength: number;
   @Input('opened') attrOpened: boolean;
   @Input('placeHolder') attrPlaceHolder: string;
   @Input('popupZIndex') attrPopupZIndex: number;
   @Input('query') attrQuery: string;
   @Input('renderer') attrRenderer: (itemValue?: string, inputValue?: string) => string;
   @Input('rtl') attrRtl: boolean;
   @Input('searchMode') attrSearchMode: string;
   @Input('source') attrSource: any;
   @Input('theme') attrTheme: string;
   @Input('valueMember') attrValueMember: string;
   @Input('value') attrValue: number | string;
   @Input('width') attrWidth: string | number;
   @Input('height') attrHeight: string | number;

   @Input('auto-create') autoCreate: boolean = true;

   properties: string[] = ['disabled','dropDownWidth','displayMember','height','items','minLength','maxLength','opened','placeHolder','popupZIndex','query','renderer','rtl','searchMode','source','theme','valueMember','width','value'];
   host: any;
   elementRef: ElementRef;
   widgetObject:  jqwidgets.jqxInput;

   initialLoad: boolean = true;

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
                     areEqual = this.arraysEqual(this[attrName], this.host.jqxInput(this.properties[i]));
                  }
                  if (areEqual) {
                     return false;
                  }

                  this.host.jqxInput(this.properties[i], this[attrName]);
                  continue;
               }

               if (this[attrName] !== this.host.jqxInput(this.properties[i])) {
                  this.host.jqxInput(this.properties[i], this[attrName]); 
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
      this.widgetObject = jqwidgets.createInstance(this.host, 'jqxInput', options);

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
           if(typeof value === 'object')
               return '';
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
       if(this.widgetObject && value) {
           if(this.initialLoad){
               setTimeout(_ => this.host.jqxInput('val', value));
               this.initialLoad = false;
           }
           this.host.jqxInput('val', value);
       }
       if (this.host && (value === null || value === undefined)) {
               this.host.jqxInput('val', '');
       }
   }

   registerOnChange(fn: any): void {
       this.onChangeCallback = fn;
   }

   registerOnTouched(fn: any): void {
       this.onTouchedCallback = fn;
   }

   setOptions(options: any) : void {
      this.host.jqxInput('setOptions', options);
   }

   // jqxInputComponent properties
   disabled(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxInput('disabled', arg);
      } else {
          return this.host.jqxInput('disabled');
      }
   }

   dropDownWidth(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxInput('dropDownWidth', arg);
      } else {
          return this.host.jqxInput('dropDownWidth');
      }
   }

   displayMember(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxInput('displayMember', arg);
      } else {
          return this.host.jqxInput('displayMember');
      }
   }

   height(arg?: string | number): string | number {
      if (arg !== undefined) {
          this.host.jqxInput('height', arg);
      } else {
          return this.host.jqxInput('height');
      }
   }

   items(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxInput('items', arg);
      } else {
          return this.host.jqxInput('items');
      }
   }

   minLength(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxInput('minLength', arg);
      } else {
          return this.host.jqxInput('minLength');
      }
   }

   maxLength(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxInput('maxLength', arg);
      } else {
          return this.host.jqxInput('maxLength');
      }
   }

   opened(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxInput('opened', arg);
      } else {
          return this.host.jqxInput('opened');
      }
   }

   placeHolder(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxInput('placeHolder', arg);
      } else {
          return this.host.jqxInput('placeHolder');
      }
   }

   popupZIndex(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxInput('popupZIndex', arg);
      } else {
          return this.host.jqxInput('popupZIndex');
      }
   }

   query(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxInput('query', arg);
      } else {
          return this.host.jqxInput('query');
      }
   }

   renderer(arg?: (itemValue?: string, inputValue?: string) => string): (itemValue?: string, inputValue?: string) => string {
      if (arg !== undefined) {
          this.host.jqxInput('renderer', arg);
      } else {
          return this.host.jqxInput('renderer');
      }
   }

   rtl(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxInput('rtl', arg);
      } else {
          return this.host.jqxInput('rtl');
      }
   }

   searchMode(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxInput('searchMode', arg);
      } else {
          return this.host.jqxInput('searchMode');
      }
   }

   source(arg?: any): any {
      if (arg !== undefined) {
          this.host.jqxInput('source', arg);
      } else {
          return this.host.jqxInput('source');
      }
   }

   theme(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxInput('theme', arg);
      } else {
          return this.host.jqxInput('theme');
      }
   }

   valueMember(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxInput('valueMember', arg);
      } else {
          return this.host.jqxInput('valueMember');
      }
   }

   width(arg?: string | number): string | number {
      if (arg !== undefined) {
          this.host.jqxInput('width', arg);
      } else {
          return this.host.jqxInput('width');
      }
   }

   value(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxInput('value', arg);
      } else {
          return this.host.jqxInput('value');
      }
   }


   // jqxInputComponent functions
   destroy(): void {
      this.host.jqxInput('destroy');
   }

   focus(): void {
      this.host.jqxInput('focus');
   }

   selectAll(): void {
      this.host.jqxInput('selectAll');
   }

   val(value?: number | string): any {
      if (value !== undefined) {
         return this.host.jqxInput('val', value);
      } else {
         return this.host.jqxInput('val');
      }
   };


   // jqxInputComponent events
   @Output() onChange = new EventEmitter();
   @Output() onClose = new EventEmitter();
   @Output() onOpen = new EventEmitter();
   @Output() onSelect = new EventEmitter();

   __wireEvents__(): void {
      this.host.on('change', (eventData: any) => { this.onChange.emit(eventData); });
      this.host.on('close', (eventData: any) => { this.onClose.emit(eventData); });
      this.host.on('open', (eventData: any) => { this.onOpen.emit(eventData); });
      this.host.on('select', (eventData: any) => { this.onSelect.emit(eventData); if (eventData.args) this.onChangeCallback(eventData.args.value); });
   }

} //jqxInputComponent


