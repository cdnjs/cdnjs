/*
jQWidgets v13.1.0 (2021-Nov)
Copyright (c) 2011-2021 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

/// <reference path="jqwidgets.d.ts" />

import '../jqwidgets/jqxcore.js';
import '../jqwidgets/jqxdraw.js';
import '../jqwidgets/jqxknob.js';

import { Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
declare let JQXLite: any;

@Component({
    selector: 'jqxKnob',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxKnobComponent implements OnChanges
{
   @Input('allowValueChangeOnClick') attrAllowValueChangeOnClick: boolean;
   @Input('allowValueChangeOnDrag') attrAllowValueChangeOnDrag: boolean;
   @Input('allowValueChangeOnMouseWheel') attrAllowValueChangeOnMouseWheel: boolean;
   @Input('changing') attrChanging: (oldValue: jqwidgets.KnobChanging['oldValue'] | jqwidgets.KnobChanging['oldValue'][], newValue: jqwidgets.KnobChanging['newValue'] | jqwidgets.KnobChanging['newValue'][]) => boolean;
   @Input('dragEndAngle') attrDragEndAngle: number;
   @Input('dragStartAngle') attrDragStartAngle: number;
   @Input('disabled') attrDisabled: boolean;
   @Input('dial') attrDial: jqwidgets.KnobDial;
   @Input('endAngle') attrEndAngle: number;
   @Input('labels') attrLabels: jqwidgets.KnobLabels;
   @Input('marks') attrMarks: jqwidgets.KnobMarks;
   @Input('min') attrMin: number;
   @Input('max') attrMax: number;
   @Input('progressBar') attrProgressBar: jqwidgets.KnobProgressBar;
   @Input('pointer') attrPointer: jqwidgets.KnobPointer | jqwidgets.KnobPointer[];
   @Input('pointerGrabAction') attrPointerGrabAction: string;
   @Input('rotation') attrRotation: string;
   @Input('startAngle') attrStartAngle: number;
   @Input('spinner') attrSpinner: jqwidgets.KnobSpinner;
   @Input('styles') attrStyles: jqwidgets.KnobStyle;
   @Input('step') attrStep: number | string;
   @Input('snapToStep') attrSnapToStep: boolean;
   @Input('value') attrValue: any;
   @Input('width') attrWidth: string | number;
   @Input('height') attrHeight: string | number;

   @Input('auto-create') autoCreate: boolean = true;

   properties: string[] = ['allowValueChangeOnClick','allowValueChangeOnDrag','allowValueChangeOnMouseWheel','changing','dragEndAngle','dragStartAngle','disabled','dial','endAngle','height','labels','marks','min','max','progressBar','pointer','pointerGrabAction','rotation','startAngle','spinner','styles','step','snapToStep','value','width'];
   host: any;
   elementRef: ElementRef;
   widgetObject:  jqwidgets.jqxKnob;

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
                     areEqual = this.arraysEqual(this[attrName], this.host.jqxKnob(this.properties[i]));
                  }
                  if (areEqual) {
                     return false;
                  }

                  this.host.jqxKnob(this.properties[i], this[attrName]);
                  continue;
               }

               if (this[attrName] !== this.host.jqxKnob(this.properties[i])) {
                  this.host.jqxKnob(this.properties[i], this[attrName]); 
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
      this.widgetObject = jqwidgets.createInstance(this.host, 'jqxKnob', options);

      this.__updateRect__();
   }

   createWidget(options?: any): void {
        this.createComponent(options);
   }

   __updateRect__() : void {
      if(this.host) this.host.css({ width: this.attrWidth, height: this.attrHeight });
   }

   setOptions(options: any) : void {
      this.host.jqxKnob('setOptions', options);
   }

   // jqxKnobComponent properties
   allowValueChangeOnClick(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxKnob('allowValueChangeOnClick', arg);
      } else {
          return this.host.jqxKnob('allowValueChangeOnClick');
      }
   }

   allowValueChangeOnDrag(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxKnob('allowValueChangeOnDrag', arg);
      } else {
          return this.host.jqxKnob('allowValueChangeOnDrag');
      }
   }

   allowValueChangeOnMouseWheel(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxKnob('allowValueChangeOnMouseWheel', arg);
      } else {
          return this.host.jqxKnob('allowValueChangeOnMouseWheel');
      }
   }

   changing(arg?: (oldValue: jqwidgets.KnobChanging['oldValue'] | jqwidgets.KnobChanging['oldValue'][], newValue: jqwidgets.KnobChanging['newValue'] | jqwidgets.KnobChanging['newValue'][]) => boolean): (oldValue: jqwidgets.KnobChanging['oldValue'] | jqwidgets.KnobChanging['oldValue'][], newValue: jqwidgets.KnobChanging['newValue'] | jqwidgets.KnobChanging['newValue'][]) => boolean {
      if (arg !== undefined) {
          this.host.jqxKnob('changing', arg);
      } else {
          return this.host.jqxKnob('changing');
      }
   }

   dragEndAngle(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxKnob('dragEndAngle', arg);
      } else {
          return this.host.jqxKnob('dragEndAngle');
      }
   }

   dragStartAngle(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxKnob('dragStartAngle', arg);
      } else {
          return this.host.jqxKnob('dragStartAngle');
      }
   }

   disabled(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxKnob('disabled', arg);
      } else {
          return this.host.jqxKnob('disabled');
      }
   }

   dial(arg?: jqwidgets.KnobDial): jqwidgets.KnobDial {
      if (arg !== undefined) {
          this.host.jqxKnob('dial', arg);
      } else {
          return this.host.jqxKnob('dial');
      }
   }

   endAngle(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxKnob('endAngle', arg);
      } else {
          return this.host.jqxKnob('endAngle');
      }
   }

   height(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxKnob('height', arg);
      } else {
          return this.host.jqxKnob('height');
      }
   }

   labels(arg?: jqwidgets.KnobLabels): jqwidgets.KnobLabels {
      if (arg !== undefined) {
          this.host.jqxKnob('labels', arg);
      } else {
          return this.host.jqxKnob('labels');
      }
   }

   marks(arg?: jqwidgets.KnobMarks): jqwidgets.KnobMarks {
      if (arg !== undefined) {
          this.host.jqxKnob('marks', arg);
      } else {
          return this.host.jqxKnob('marks');
      }
   }

   min(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxKnob('min', arg);
      } else {
          return this.host.jqxKnob('min');
      }
   }

   max(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxKnob('max', arg);
      } else {
          return this.host.jqxKnob('max');
      }
   }

   progressBar(arg?: jqwidgets.KnobProgressBar): jqwidgets.KnobProgressBar {
      if (arg !== undefined) {
          this.host.jqxKnob('progressBar', arg);
      } else {
          return this.host.jqxKnob('progressBar');
      }
   }

   pointer(arg?: jqwidgets.KnobPointer | jqwidgets.KnobPointer[]): jqwidgets.KnobPointer | jqwidgets.KnobPointer[] {
      if (arg !== undefined) {
          this.host.jqxKnob('pointer', arg);
      } else {
          return this.host.jqxKnob('pointer');
      }
   }

   pointerGrabAction(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxKnob('pointerGrabAction', arg);
      } else {
          return this.host.jqxKnob('pointerGrabAction');
      }
   }

   rotation(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxKnob('rotation', arg);
      } else {
          return this.host.jqxKnob('rotation');
      }
   }

   startAngle(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxKnob('startAngle', arg);
      } else {
          return this.host.jqxKnob('startAngle');
      }
   }

   spinner(arg?: jqwidgets.KnobSpinner): jqwidgets.KnobSpinner {
      if (arg !== undefined) {
          this.host.jqxKnob('spinner', arg);
      } else {
          return this.host.jqxKnob('spinner');
      }
   }

   styles(arg?: jqwidgets.KnobStyle): jqwidgets.KnobStyle {
      if (arg !== undefined) {
          this.host.jqxKnob('styles', arg);
      } else {
          return this.host.jqxKnob('styles');
      }
   }

   step(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxKnob('step', arg);
      } else {
          return this.host.jqxKnob('step');
      }
   }

   snapToStep(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxKnob('snapToStep', arg);
      } else {
          return this.host.jqxKnob('snapToStep');
      }
   }

   value(arg?: any): any {
      if (arg !== undefined) {
          this.host.jqxKnob('value', arg);
      } else {
          return this.host.jqxKnob('value');
      }
   }

   width(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxKnob('width', arg);
      } else {
          return this.host.jqxKnob('width');
      }
   }


   // jqxKnobComponent functions
   destroy(): void {
      this.host.jqxKnob('destroy');
   }

   val(value?: number | string): any {
      if (value !== undefined) {
         return this.host.jqxKnob('val', value);
      } else {
         return this.host.jqxKnob('val');
      }
   };


   // jqxKnobComponent events
   @Output() onChange = new EventEmitter();

   __wireEvents__(): void {
      this.host.on('change', (eventData: any) => { this.onChange.emit(eventData); });
   }

} //jqxKnobComponent


