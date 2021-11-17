/*
jQWidgets v13.1.0 (2021-Nov)
Copyright (c) 2011-2021 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

/// <reference path="jqwidgets.d.ts" />

import '../jqwidgets/jqxcore.js';
import '../jqwidgets/jqxcheckbox.js';

import { Component, Input, Output, EventEmitter, ElementRef, forwardRef, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const noop = () => { };
declare let JQXLite: any;

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => jqxCheckBoxComponent),
    multi: true
}

@Component({
    selector: 'jqxCheckBox',
    template: '<div><ng-content></ng-content></div>',
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class jqxCheckBoxComponent implements ControlValueAccessor, OnChanges 
{
   @Input('animationShowDelay') attrAnimationShowDelay: number;
   @Input('animationHideDelay') attrAnimationHideDelay: number;
   @Input('boxSize') attrBoxSize: number | string;
   @Input('checked') attrChecked: boolean | null;
   @Input('disabled') attrDisabled: boolean;
   @Input('enableContainerClick') attrEnableContainerClick: boolean;
   @Input('groupName') attrGroupName: string;
   @Input('hasThreeStates') attrHasThreeStates: boolean;
   @Input('locked') attrLocked: boolean;
   @Input('rtl') attrRtl: boolean;
   @Input('theme') attrTheme: string;
   @Input('width') attrWidth: string | number;
   @Input('height') attrHeight: string | number;

   @Input('auto-create') autoCreate: boolean = true;

   properties: string[] = ['animationShowDelay','animationHideDelay','boxSize','checked','disabled','enableContainerClick','groupName','height','hasThreeStates','locked','rtl','theme','width'];
   host: any;
   elementRef: ElementRef;
   widgetObject:  jqwidgets.jqxCheckBox;

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
                     areEqual = this.arraysEqual(this[attrName], this.host.jqxCheckBox(this.properties[i]));
                  }
                  if (areEqual) {
                     return false;
                  }

                  this.host.jqxCheckBox(this.properties[i], this[attrName]);
                  continue;
               }

               if (this[attrName] !== this.host.jqxCheckBox(this.properties[i])) {
                  this.host.jqxCheckBox(this.properties[i], this[attrName]); 
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
      this.widgetObject = jqwidgets.createInstance(this.host, 'jqxCheckBox', options);

      options.checked !== undefined ? this.onChangeCallback(options.checked) : this.onChangeCallback(false);
   }

   createWidget(options?: any): void {
        this.createComponent(options);
   }

   __updateRect__() : void {
      if(this.host) this.host.css({ width: this.attrWidth, height: this.attrHeight });
   }

   writeValue(value: any): void {
       if(this.widgetObject) {
       }
       if (this.host && (value === null || value === undefined)) {
               this.host.jqxCheckBox('val', '');
       }
   }

   registerOnChange(fn: any): void {
       this.onChangeCallback = fn;
   }

   registerOnTouched(fn: any): void {
       this.onTouchedCallback = fn;
   }

   setOptions(options: any) : void {
      this.host.jqxCheckBox('setOptions', options);
   }

   // jqxCheckBoxComponent properties
   animationShowDelay(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxCheckBox('animationShowDelay', arg);
      } else {
          return this.host.jqxCheckBox('animationShowDelay');
      }
   }

   animationHideDelay(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxCheckBox('animationHideDelay', arg);
      } else {
          return this.host.jqxCheckBox('animationHideDelay');
      }
   }

   boxSize(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxCheckBox('boxSize', arg);
      } else {
          return this.host.jqxCheckBox('boxSize');
      }
   }

   checked(arg?: boolean | null): boolean | null {
      if (arg !== undefined) {
          this.host.jqxCheckBox('checked', arg);
      } else {
          return this.host.jqxCheckBox('checked');
      }
   }

   disabled(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxCheckBox('disabled', arg);
      } else {
          return this.host.jqxCheckBox('disabled');
      }
   }

   enableContainerClick(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxCheckBox('enableContainerClick', arg);
      } else {
          return this.host.jqxCheckBox('enableContainerClick');
      }
   }

   groupName(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxCheckBox('groupName', arg);
      } else {
          return this.host.jqxCheckBox('groupName');
      }
   }

   height(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxCheckBox('height', arg);
      } else {
          return this.host.jqxCheckBox('height');
      }
   }

   hasThreeStates(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxCheckBox('hasThreeStates', arg);
      } else {
          return this.host.jqxCheckBox('hasThreeStates');
      }
   }

   locked(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxCheckBox('locked', arg);
      } else {
          return this.host.jqxCheckBox('locked');
      }
   }

   rtl(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxCheckBox('rtl', arg);
      } else {
          return this.host.jqxCheckBox('rtl');
      }
   }

   theme(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxCheckBox('theme', arg);
      } else {
          return this.host.jqxCheckBox('theme');
      }
   }

   width(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxCheckBox('width', arg);
      } else {
          return this.host.jqxCheckBox('width');
      }
   }


   // jqxCheckBoxComponent functions
   check(): void {
      this.host.jqxCheckBox('check');
   }

   disable(): void {
      this.host.jqxCheckBox('disable');
   }

   destroy(): void {
      this.host.jqxCheckBox('destroy');
   }

   enable(): void {
      this.host.jqxCheckBox('enable');
   }

   focus(): void {
      this.host.jqxCheckBox('focus');
   }

   indeterminate(): void {
      this.host.jqxCheckBox('indeterminate');
   }

   render(): void {
      this.host.jqxCheckBox('render');
   }

   toggle(): void {
      this.host.jqxCheckBox('toggle');
   }

   uncheck(): void {
      this.host.jqxCheckBox('uncheck');
   }

   val(value?: boolean): any {
      if (value !== undefined) {
         return this.host.jqxCheckBox('val', value);
      } else {
         return this.host.jqxCheckBox('val');
      }
   };


   // jqxCheckBoxComponent events
   @Output() onChecked = new EventEmitter();
   @Output() onChange = new EventEmitter();
   @Output() onIndeterminate = new EventEmitter();
   @Output() onUnchecked = new EventEmitter();

   __wireEvents__(): void {
      this.host.on('checked', (eventData: any) => { this.onChecked.emit(eventData); });
      this.host.on('change', (eventData: any) => { this.onChange.emit(eventData); if (eventData.args) this.onChangeCallback(eventData.args.checked); });
      this.host.on('indeterminate', (eventData: any) => { this.onIndeterminate.emit(eventData); });
      this.host.on('unchecked', (eventData: any) => { this.onUnchecked.emit(eventData); });
   }

} //jqxCheckBoxComponent


