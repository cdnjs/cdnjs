/*
jQWidgets v13.1.0 (2021-Nov)
Copyright (c) 2011-2021 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

/// <reference path="jqwidgets.d.ts" />

import '../jqwidgets/jqxcore.js';
import '../jqwidgets/jqxdragdrop.js';

import { Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
declare let JQXLite: any;

@Component({
    selector: 'jqxDragDrop',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxDragDropComponent implements OnChanges
{
   @Input('appendTo') attrAppendTo: string;
   @Input('disabled') attrDisabled: boolean;
   @Input('distance') attrDistance: number;
   @Input('data') attrData: any;
   @Input('dropAction') attrDropAction: string;
   @Input('dropTarget') attrDropTarget: any;
   @Input('dragZIndex') attrDragZIndex: number;
   @Input('feedback') attrFeedback: string;
   @Input('initFeedback') attrInitFeedback: (feedback?:any) => void;
   @Input('opacity') attrOpacity: number;
   @Input('onDragEnd') attrOnDragEnd: () => void;
   @Input('onDrag') attrOnDrag: (data?: jqwidgets.DragDropOnDrag['data'], position?: jqwidgets.DragDropOnDrag['position']) => void;
   @Input('onDragStart') attrOnDragStart: (position?: jqwidgets.DragDropOnDragStart['position']) => void;
   @Input('onTargetDrop') attrOnTargetDrop: (data?: jqwidgets.DragDropOnTargetDrop['data']) => void;
   @Input('onDropTargetEnter') attrOnDropTargetEnter: () => void;
   @Input('onDropTargetLeave') attrOnDropTargetLeave: (data?: jqwidgets.DragDropOnDropTargetLeave['data']) => void;
   @Input('restricter') attrRestricter: string | object;
   @Input('revert') attrRevert: boolean;
   @Input('revertDuration') attrRevertDuration: number;
   @Input('tolerance') attrTolerance: string;
   @Input('width') attrWidth: string | number;
   @Input('height') attrHeight: string | number;

   @Input('auto-create') autoCreate: boolean = true;

   properties: string[] = ['appendTo','disabled','distance','data','dropAction','dropTarget','dragZIndex','feedback','initFeedback','opacity','onDragEnd','onDrag','onDragStart','onTargetDrop','onDropTargetEnter','onDropTargetLeave','restricter','revert','revertDuration','tolerance'];
   host: any;
   elementRef: ElementRef;
   widgetObject:  jqwidgets.jqxDragDrop;

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
                     areEqual = this.arraysEqual(this[attrName], this.host.jqxDragDrop(this.properties[i]));
                  }
                  if (areEqual) {
                     return false;
                  }

                  this.host.jqxDragDrop(this.properties[i], this[attrName]);
                  continue;
               }

               if (this[attrName] !== this.host.jqxDragDrop(this.properties[i])) {
                  this.host.jqxDragDrop(this.properties[i], this[attrName]); 
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
      this.widgetObject = jqwidgets.createInstance(this.host, 'jqxDragDrop', options);

   }

   createWidget(options?: any): void {
        this.createComponent(options);
   }

   __updateRect__() : void {
      if(this.host) this.host.css({ width: this.attrWidth, height: this.attrHeight });
   }

   setOptions(options: any) : void {
      this.host.jqxDragDrop('setOptions', options);
   }

   // jqxDragDropComponent properties
   appendTo(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxDragDrop('appendTo', arg);
      } else {
          return this.host.jqxDragDrop('appendTo');
      }
   }

   disabled(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxDragDrop('disabled', arg);
      } else {
          return this.host.jqxDragDrop('disabled');
      }
   }

   distance(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxDragDrop('distance', arg);
      } else {
          return this.host.jqxDragDrop('distance');
      }
   }

   data(arg?: any): any {
      if (arg !== undefined) {
          this.host.jqxDragDrop('data', arg);
      } else {
          return this.host.jqxDragDrop('data');
      }
   }

   dropAction(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxDragDrop('dropAction', arg);
      } else {
          return this.host.jqxDragDrop('dropAction');
      }
   }

   dropTarget(arg?: any): any {
      if (arg !== undefined) {
          this.host.jqxDragDrop('dropTarget', arg);
      } else {
          return this.host.jqxDragDrop('dropTarget');
      }
   }

   dragZIndex(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxDragDrop('dragZIndex', arg);
      } else {
          return this.host.jqxDragDrop('dragZIndex');
      }
   }

   feedback(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxDragDrop('feedback', arg);
      } else {
          return this.host.jqxDragDrop('feedback');
      }
   }

   initFeedback(arg?: (feedback?:any) => void): (feedback?:any) => void {
      if (arg !== undefined) {
          this.host.jqxDragDrop('initFeedback', arg);
      } else {
          return this.host.jqxDragDrop('initFeedback');
      }
   }

   opacity(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxDragDrop('opacity', arg);
      } else {
          return this.host.jqxDragDrop('opacity');
      }
   }

   onDragEnd(arg?: () => void): () => void {
      if (arg !== undefined) {
          this.host.jqxDragDrop('onDragEnd', arg);
      } else {
          return this.host.jqxDragDrop('onDragEnd');
      }
   }

   onDrag(arg?: (data?: jqwidgets.DragDropOnDrag['data'], position?: jqwidgets.DragDropOnDrag['position']) => void): (data?: jqwidgets.DragDropOnDrag['data'], position?: jqwidgets.DragDropOnDrag['position']) => void {
      if (arg !== undefined) {
          this.host.jqxDragDrop('onDrag', arg);
      } else {
          return this.host.jqxDragDrop('onDrag');
      }
   }

   onDragStart(arg?: (position?: jqwidgets.DragDropOnDragStart['position']) => void): (position?: jqwidgets.DragDropOnDragStart['position']) => void {
      if (arg !== undefined) {
          this.host.jqxDragDrop('onDragStart', arg);
      } else {
          return this.host.jqxDragDrop('onDragStart');
      }
   }

   onTargetDrop(arg?: (data?: jqwidgets.DragDropOnTargetDrop['data']) => void): (data?: jqwidgets.DragDropOnTargetDrop['data']) => void {
      if (arg !== undefined) {
          this.host.jqxDragDrop('onTargetDrop', arg);
      } else {
          return this.host.jqxDragDrop('onTargetDrop');
      }
   }

   onDropTargetEnter(arg?: () => void): () => void {
      if (arg !== undefined) {
          this.host.jqxDragDrop('onDropTargetEnter', arg);
      } else {
          return this.host.jqxDragDrop('onDropTargetEnter');
      }
   }

   onDropTargetLeave(arg?: (data?: jqwidgets.DragDropOnDropTargetLeave['data']) => void): (data?: jqwidgets.DragDropOnDropTargetLeave['data']) => void {
      if (arg !== undefined) {
          this.host.jqxDragDrop('onDropTargetLeave', arg);
      } else {
          return this.host.jqxDragDrop('onDropTargetLeave');
      }
   }

   restricter(arg?: string | object): string | object {
      if (arg !== undefined) {
          this.host.jqxDragDrop('restricter', arg);
      } else {
          return this.host.jqxDragDrop('restricter');
      }
   }

   revert(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxDragDrop('revert', arg);
      } else {
          return this.host.jqxDragDrop('revert');
      }
   }

   revertDuration(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxDragDrop('revertDuration', arg);
      } else {
          return this.host.jqxDragDrop('revertDuration');
      }
   }

   tolerance(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxDragDrop('tolerance', arg);
      } else {
          return this.host.jqxDragDrop('tolerance');
      }
   }


   // jqxDragDropComponent functions


   // jqxDragDropComponent events
   @Output() ondragstart = new EventEmitter();
   @Output() ondragend = new EventEmitter();
   @Output() ondragging = new EventEmitter();
   @Output() ondroptargetenter = new EventEmitter();
   @Output() ondroptargetleave = new EventEmitter();

   __wireEvents__(): void {
      this.host.on('dragStart', (eventData: any) => { this.ondragstart.emit(eventData); });
      this.host.on('dragEnd', (eventData: any) => { this.ondragend.emit(eventData); });
      this.host.on('dragging', (eventData: any) => { this.ondragging.emit(eventData); });
      this.host.on('dropTargetEnter', (eventData: any) => { this.ondroptargetenter.emit(eventData); });
      this.host.on('dropTargetLeave', (eventData: any) => { this.ondroptargetleave.emit(eventData); });
   }

} //jqxDragDropComponent


