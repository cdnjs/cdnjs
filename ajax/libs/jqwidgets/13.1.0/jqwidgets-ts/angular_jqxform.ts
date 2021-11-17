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
import '../jqwidgets/jqxpasswordinput.js';
import '../jqwidgets/jqxnumberinput.js';
import '../jqwidgets/jqxradiobutton.js';
import '../jqwidgets/jqxcheckbox.js';
import '../jqwidgets/jqxbuttons.js';
import '../jqwidgets/jqxscrollbar.js';
import '../jqwidgets/jqxlistbox.js';
import '../jqwidgets/jqxdropdownlist.js';
import '../jqwidgets/jqxcombobox.js';
import '../jqwidgets/jqxmaskedinput.js';
import '../jqwidgets/globalization/globalize.js'
import '../jqwidgets/jqxcalendar.js';
import '../jqwidgets/jqxdatetimeinput.js';
import '../jqwidgets/jqxform.js';

import { Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
declare let JQXLite: any;

@Component({
    selector: 'jqxForm',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxFormComponent implements OnChanges
{
   @Input('padding') attrPadding: jqwidgets.FormPadding;
   @Input('backgroundColor') attrBackgroundColor: string;
   @Input('borderColor') attrBorderColor: string;
   @Input('value') attrValue: any;
   @Input('template') attrTemplate: Array<jqwidgets.FormTemplateItem>;
   @Input('width') attrWidth: string | number;
   @Input('height') attrHeight: string | number;

   @Input('auto-create') autoCreate: boolean = true;

   properties: string[] = ['padding','backgroundColor','borderColor','value','template'];
   host: any;
   elementRef: ElementRef;
   widgetObject:  jqwidgets.jqxForm;

   constructor(containerElement: ElementRef) {
      this.elementRef = containerElement;
      JQXLite(window).resize(() => {
          this.__updateRect__();
      });
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
                     areEqual = this.arraysEqual(this[attrName], this.host.jqxForm(this.properties[i]));
                  }
                  if (areEqual) {
                     return false;
                  }

                  this.host.jqxForm(this.properties[i], this[attrName]);
                  continue;
               }

               if (this[attrName] !== this.host.jqxForm(this.properties[i])) {
                  this.host.jqxForm(this.properties[i], this[attrName]); 
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
      this.widgetObject = jqwidgets.createInstance(this.host, 'jqxForm', options);

      this.__updateRect__();
   }

   createWidget(options?: any): void {
        this.createComponent(options);
   }

   __updateRect__() : void {
      if(this.host) this.host.css({ width: this.attrWidth, height: this.attrHeight });
      this.refresh();
   }

   setOptions(options: any) : void {
      this.host.jqxForm('setOptions', options);
   }

   // jqxFormComponent properties
   padding(arg?: jqwidgets.FormPadding): jqwidgets.FormPadding {
      if (arg !== undefined) {
          this.host.jqxForm('padding', arg);
      } else {
          return this.host.jqxForm('padding');
      }
   }

   backgroundColor(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxForm('backgroundColor', arg);
      } else {
          return this.host.jqxForm('backgroundColor');
      }
   }

   borderColor(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxForm('borderColor', arg);
      } else {
          return this.host.jqxForm('borderColor');
      }
   }

   value(arg?: any): any {
      if (arg !== undefined) {
          this.host.jqxForm('value', arg);
      } else {
          return this.host.jqxForm('value');
      }
   }

   template(arg?: Array<jqwidgets.FormTemplateItem>): Array<jqwidgets.FormTemplateItem> {
      if (arg !== undefined) {
          this.host.jqxForm('template', arg);
      } else {
          return this.host.jqxForm('template');
      }
   }


   // jqxFormComponent functions
   getInstance(): any {
      return this.host.jqxForm('getInstance');
   }

   refresh(): void {
      this.host.jqxForm('refresh');
   }

   destroy(): void {
      this.host.jqxForm('destroy');
   }

   hideComponent(name: string): void {
      this.host.jqxForm('hideComponent', name);
   }

   showComponent(name: string): void {
      this.host.jqxForm('showComponent', name);
   }

   val(value?: any): any {
      if (value !== undefined) {
         return this.host.jqxForm('val', value);
      } else {
         return this.host.jqxForm('val');
      }
   };

   submit(action?: string, target?: string, method?: string): void {
      this.host.jqxForm('submit', action, target, method);
   }

   getComponentByName(name?: string): any {
      return this.host.jqxForm('getComponentByName', name);
   }


   // jqxFormComponent events
   @Output() onFormDataChange = new EventEmitter();
   @Output() onButtonClick = new EventEmitter();

   __wireEvents__(): void {
      this.host.on('formDataChange', (eventData: any) => { this.onFormDataChange.emit(eventData); });
      this.host.on('buttonClick', (eventData: any) => { this.onButtonClick.emit(eventData); });
   }

} //jqxFormComponent


