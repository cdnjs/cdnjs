/*
jQWidgets v13.1.0 (2021-Nov)
Copyright (c) 2011-2021 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

/// <reference path="jqwidgets.d.ts" />

import '../jqwidgets/jqxcore.js';
import '../jqwidgets/jqxbuttons.js';
import '../jqwidgets/jqxsortable.js';

import { Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
declare let JQXLite: any;

@Component({
    selector: 'jqxSortable',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxSortableComponent implements OnChanges
{
   @Input('appendTo') attrAppendTo: string;
   @Input('axis') attrAxis: number | string;
   @Input('cancel') attrCancel: string;
   @Input('connectWith') attrConnectWith: string | boolean;
   @Input('containment') attrContainment: string | boolean;
   @Input('cursor') attrCursor: string;
   @Input('cursorAt') attrCursorAt: jqwidgets.SortableCursorAt;
   @Input('delay') attrDelay: number;
   @Input('disabled') attrDisabled: boolean;
   @Input('distance') attrDistance: number;
   @Input('dropOnEmpty') attrDropOnEmpty: boolean;
   @Input('forceHelperSize') attrForceHelperSize: boolean;
   @Input('forcePlaceholderSize') attrForcePlaceholderSize: boolean;
   @Input('grid') attrGrid: Array<number>;
   @Input('handle') attrHandle: string | boolean;
   @Input('helper') attrHelper: (originalEvent?: any, content?: any) => void | 'original' | 'clone';
   @Input('items') attrItems: string;
   @Input('opacity') attrOpacity: number | boolean;
   @Input('placeholderShow') attrPlaceholderShow: string | boolean;
   @Input('revert') attrRevert: number | boolean;
   @Input('scroll') attrScroll: boolean;
   @Input('scrollSensitivity') attrScrollSensitivity: number;
   @Input('scrollSpeed') attrScrollSpeed: number;
   @Input('tolerance') attrTolerance: string;
   @Input('zIndex') attrZIndex: number;
   @Input('width') attrWidth: string | number;
   @Input('height') attrHeight: string | number;

   @Input('auto-create') autoCreate: boolean = true;

   properties: string[] = ['appendTo','axis','cancel','connectWith','containment','cursor','cursorAt','delay','disabled','distance','dropOnEmpty','forceHelperSize','forcePlaceholderSize','grid','handle','helper','items','opacity','placeholderShow','revert','scroll','scrollSensitivity','scrollSpeed','tolerance','zIndex'];
   host: any;
   elementRef: ElementRef;
   widgetObject:  jqwidgets.jqxSortable;

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
                     areEqual = this.arraysEqual(this[attrName], this.host.jqxSortable(this.properties[i]));
                  }
                  if (areEqual) {
                     return false;
                  }

                  this.host.jqxSortable(this.properties[i], this[attrName]);
                  continue;
               }

               if (this[attrName] !== this.host.jqxSortable(this.properties[i])) {
                  this.host.jqxSortable(this.properties[i], this[attrName]); 
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
      this.widgetObject = jqwidgets.createInstance(this.host, 'jqxSortable', options);

   }

   createWidget(options?: any): void {
        this.createComponent(options);
   }

   __updateRect__() : void {
      if(this.host) this.host.css({ width: this.attrWidth, height: this.attrHeight });
   }

   setOptions(options: any) : void {
      this.host.jqxSortable('setOptions', options);
   }

   // jqxSortableComponent properties
   appendTo(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxSortable('appendTo', arg);
      } else {
          return this.host.jqxSortable('appendTo');
      }
   }

   axis(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxSortable('axis', arg);
      } else {
          return this.host.jqxSortable('axis');
      }
   }

   cancel(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxSortable('cancel', arg);
      } else {
          return this.host.jqxSortable('cancel');
      }
   }

   connectWith(arg?: string | boolean): string | boolean {
      if (arg !== undefined) {
          this.host.jqxSortable('connectWith', arg);
      } else {
          return this.host.jqxSortable('connectWith');
      }
   }

   containment(arg?: string | boolean): string | boolean {
      if (arg !== undefined) {
          this.host.jqxSortable('containment', arg);
      } else {
          return this.host.jqxSortable('containment');
      }
   }

   cursor(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxSortable('cursor', arg);
      } else {
          return this.host.jqxSortable('cursor');
      }
   }

   cursorAt(arg?: jqwidgets.SortableCursorAt): jqwidgets.SortableCursorAt {
      if (arg !== undefined) {
          this.host.jqxSortable('cursorAt', arg);
      } else {
          return this.host.jqxSortable('cursorAt');
      }
   }

   delay(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxSortable('delay', arg);
      } else {
          return this.host.jqxSortable('delay');
      }
   }

   disabled(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxSortable('disabled', arg);
      } else {
          return this.host.jqxSortable('disabled');
      }
   }

   distance(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxSortable('distance', arg);
      } else {
          return this.host.jqxSortable('distance');
      }
   }

   dropOnEmpty(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxSortable('dropOnEmpty', arg);
      } else {
          return this.host.jqxSortable('dropOnEmpty');
      }
   }

   forceHelperSize(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxSortable('forceHelperSize', arg);
      } else {
          return this.host.jqxSortable('forceHelperSize');
      }
   }

   forcePlaceholderSize(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxSortable('forcePlaceholderSize', arg);
      } else {
          return this.host.jqxSortable('forcePlaceholderSize');
      }
   }

   grid(arg?: Array<number>): Array<number> {
      if (arg !== undefined) {
          this.host.jqxSortable('grid', arg);
      } else {
          return this.host.jqxSortable('grid');
      }
   }

   handle(arg?: string | boolean): string | boolean {
      if (arg !== undefined) {
          this.host.jqxSortable('handle', arg);
      } else {
          return this.host.jqxSortable('handle');
      }
   }

   helper(arg?: (originalEvent?: any, content?: any) => void | 'original' | 'clone'): (originalEvent?: any, content?: any) => void | 'original' | 'clone' {
      if (arg !== undefined) {
          this.host.jqxSortable('helper', arg);
      } else {
          return this.host.jqxSortable('helper');
      }
   }

   items(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxSortable('items', arg);
      } else {
          return this.host.jqxSortable('items');
      }
   }

   opacity(arg?: number | boolean): number | boolean {
      if (arg !== undefined) {
          this.host.jqxSortable('opacity', arg);
      } else {
          return this.host.jqxSortable('opacity');
      }
   }

   placeholderShow(arg?: string | boolean): string | boolean {
      if (arg !== undefined) {
          this.host.jqxSortable('placeholderShow', arg);
      } else {
          return this.host.jqxSortable('placeholderShow');
      }
   }

   revert(arg?: number | boolean): number | boolean {
      if (arg !== undefined) {
          this.host.jqxSortable('revert', arg);
      } else {
          return this.host.jqxSortable('revert');
      }
   }

   scroll(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxSortable('scroll', arg);
      } else {
          return this.host.jqxSortable('scroll');
      }
   }

   scrollSensitivity(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxSortable('scrollSensitivity', arg);
      } else {
          return this.host.jqxSortable('scrollSensitivity');
      }
   }

   scrollSpeed(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxSortable('scrollSpeed', arg);
      } else {
          return this.host.jqxSortable('scrollSpeed');
      }
   }

   tolerance(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxSortable('tolerance', arg);
      } else {
          return this.host.jqxSortable('tolerance');
      }
   }

   zIndex(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxSortable('zIndex', arg);
      } else {
          return this.host.jqxSortable('zIndex');
      }
   }


   // jqxSortableComponent functions
   cancelMethod(): void {
      this.host.jqxSortable('cancelMethod');
   }

   destroy(): void {
      this.host.jqxSortable('destroy');
   }

   disable(): void {
      this.host.jqxSortable('disable');
   }

   enable(): void {
      this.host.jqxSortable('enable');
   }

   refresh(): void {
      this.host.jqxSortable('refresh');
   }

   refreshPositions(): void {
      this.host.jqxSortable('refreshPositions');
   }

   serialize(object: undefined): string {
      return this.host.jqxSortable('serialize', object);
   }

   toArray(): Array<any> {
      return this.host.jqxSortable('toArray');
   }


   // jqxSortableComponent events
   @Output() onActivate = new EventEmitter();
   @Output() onBeforeStop = new EventEmitter();
   @Output() onChange = new EventEmitter();
   @Output() onDeactivate = new EventEmitter();
   @Output() onOut = new EventEmitter();
   @Output() onOver = new EventEmitter();
   @Output() onReceive = new EventEmitter();
   @Output() onRemove = new EventEmitter();
   @Output() onSort = new EventEmitter();
   @Output() onStart = new EventEmitter();
   @Output() onStop = new EventEmitter();
   @Output() onUpdate = new EventEmitter();

   __wireEvents__(): void {
      this.host.on('activate', (eventData: any) => { this.onActivate.emit(eventData); });
      this.host.on('beforeStop', (eventData: any) => { this.onBeforeStop.emit(eventData); });
      this.host.on('change', (eventData: any) => { this.onChange.emit(eventData); });
      this.host.on('deactivate', (eventData: any) => { this.onDeactivate.emit(eventData); });
      this.host.on('out', (eventData: any) => { this.onOut.emit(eventData); });
      this.host.on('over', (eventData: any) => { this.onOver.emit(eventData); });
      this.host.on('receive', (eventData: any) => { this.onReceive.emit(eventData); });
      this.host.on('remove', (eventData: any) => { this.onRemove.emit(eventData); });
      this.host.on('sort', (eventData: any) => { this.onSort.emit(eventData); });
      this.host.on('start', (eventData: any) => { this.onStart.emit(eventData); });
      this.host.on('stop', (eventData: any) => { this.onStop.emit(eventData); });
      this.host.on('update', (eventData: any) => { this.onUpdate.emit(eventData); });
   }

} //jqxSortableComponent


