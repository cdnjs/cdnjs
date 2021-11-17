/*
jQWidgets v13.1.0 (2021-Nov)
Copyright (c) 2011-2021 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

/// <reference path="jqwidgets.d.ts" />

import '../jqwidgets/jqxcore.js';
import '../jqwidgets/jqxdata.js';
import '../jqwidgets/jqxbuttons.js';
import '../jqwidgets/jqxscrollbar.js';
import '../jqwidgets/jqxlistbox.js';
import '../jqwidgets/jqxdropdownlist.js';
import '../jqwidgets/jqxdropdownbutton.js';
import '../jqwidgets/jqxwindow.js';
import '../jqwidgets/jqxeditor.js';
import '../jqwidgets/jqxcheckbox.js';
import '../jqwidgets/jqxtooltip.js';
import '../jqwidgets/jqxcolorpicker.js';

import { Component, Input, Output, EventEmitter, ElementRef, forwardRef, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const noop = () => { };
declare let JQXLite: any;

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => jqxEditorComponent),
    multi: true
}

@Component({
    selector: 'jqxEditor',
    template: '<div><ng-content></ng-content></div>',
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class jqxEditorComponent implements ControlValueAccessor, OnChanges 
{
   @Input('createCommand') attrCreateCommand: (name:jqwidgets.EditorCreateCommand['name']) => void;
   @Input('disabled') attrDisabled: boolean;
   @Input('editable') attrEditable: boolean;
   @Input('lineBreak') attrLineBreak: string;
   @Input('localization') attrLocalization: jqwidgets.EditorLocalization;
   @Input('pasteMode') attrPasteMode: string;
   @Input('rtl') attrRtl: boolean;
   @Input('stylesheets') attrStylesheets: Array<any>;
   @Input('theme') attrTheme: string;
   @Input('toolbarPosition') attrToolbarPosition: string;
   @Input('tools') attrTools: string;
   @Input('width') attrWidth: string | number;
   @Input('height') attrHeight: string | number;

   @Input('auto-create') autoCreate: boolean = true;

   properties: string[] = ['createCommand','disabled','editable','height','lineBreak','localization','pasteMode','rtl','stylesheets','theme','toolbarPosition','tools','width'];
   host: any;
   elementRef: ElementRef;
   widgetObject:  jqwidgets.jqxEditor;

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
                     areEqual = this.arraysEqual(this[attrName], this.host.jqxEditor(this.properties[i]));
                  }
                  if (areEqual) {
                     return false;
                  }

                  this.host.jqxEditor(this.properties[i], this[attrName]);
                  continue;
               }

               if (this[attrName] !== this.host.jqxEditor(this.properties[i])) {
                  this.host.jqxEditor(this.properties[i], this[attrName]); 
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

      this.widgetObject = jqwidgets.createInstance(this.host, 'jqxEditor', options);
      this.host = this.widgetObject['host'];
      this.__wireEvents__();

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
               this.host.jqxEditor('val', '');
       }
   }

   registerOnChange(fn: any): void {
       this.onChangeCallback = fn;
   }

   registerOnTouched(fn: any): void {
       this.onTouchedCallback = fn;
   }

   setOptions(options: any) : void {
      this.host.jqxEditor('setOptions', options);
   }

   // jqxEditorComponent properties
   createCommand(arg?: (name:jqwidgets.EditorCreateCommand['name']) => void): (name:jqwidgets.EditorCreateCommand['name']) => void {
      if (arg !== undefined) {
          this.host.jqxEditor('createCommand', arg);
      } else {
          return this.host.jqxEditor('createCommand');
      }
   }

   disabled(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxEditor('disabled', arg);
      } else {
          return this.host.jqxEditor('disabled');
      }
   }

   editable(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxEditor('editable', arg);
      } else {
          return this.host.jqxEditor('editable');
      }
   }

   height(arg?: string  | number): string  | number {
      if (arg !== undefined) {
          this.host.jqxEditor('height', arg);
      } else {
          return this.host.jqxEditor('height');
      }
   }

   lineBreak(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxEditor('lineBreak', arg);
      } else {
          return this.host.jqxEditor('lineBreak');
      }
   }

   localization(arg?: jqwidgets.EditorLocalization): jqwidgets.EditorLocalization {
      if (arg !== undefined) {
          this.host.jqxEditor('localization', arg);
      } else {
          return this.host.jqxEditor('localization');
      }
   }

   pasteMode(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxEditor('pasteMode', arg);
      } else {
          return this.host.jqxEditor('pasteMode');
      }
   }

   rtl(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxEditor('rtl', arg);
      } else {
          return this.host.jqxEditor('rtl');
      }
   }

   stylesheets(arg?: Array<any>): Array<any> {
      if (arg !== undefined) {
          this.host.jqxEditor('stylesheets', arg);
      } else {
          return this.host.jqxEditor('stylesheets');
      }
   }

   theme(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxEditor('theme', arg);
      } else {
          return this.host.jqxEditor('theme');
      }
   }

   toolbarPosition(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxEditor('toolbarPosition', arg);
      } else {
          return this.host.jqxEditor('toolbarPosition');
      }
   }

   tools(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxEditor('tools', arg);
      } else {
          return this.host.jqxEditor('tools');
      }
   }

   width(arg?: string | number): string | number {
      if (arg !== undefined) {
          this.host.jqxEditor('width', arg);
      } else {
          return this.host.jqxEditor('width');
      }
   }


   // jqxEditorComponent functions
   destroy(): void {
      this.host.jqxEditor('destroy');
   }

   focus(): void {
      this.host.jqxEditor('focus');
   }

   print(): void {
      this.host.jqxEditor('print');
   }

   setMode(mode: boolean): void {
      this.host.jqxEditor('setMode', mode);
   }

   val(value?: string): any {
      if (value !== undefined) {
         return this.host.jqxEditor('val', value);
      } else {
         return this.host.jqxEditor('val');
      }
   };


   // jqxEditorComponent events
   @Output() onChange = new EventEmitter();

   __wireEvents__(): void {
      this.host.on('change', (eventData: any) => { this.onChange.emit(eventData); this.onChangeCallback(this.host.val()); });
   }

} //jqxEditorComponent


