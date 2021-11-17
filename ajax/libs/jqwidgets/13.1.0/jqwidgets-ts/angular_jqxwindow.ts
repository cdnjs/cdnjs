/*
jQWidgets v13.1.0 (2021-Nov)
Copyright (c) 2011-2021 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

/// <reference path="jqwidgets.d.ts" />

import '../jqwidgets/jqxcore.js';
import '../jqwidgets/jqxbuttons.js';
import '../jqwidgets/jqxwindow.js';

import { Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
declare let JQXLite: any;

@Component({
    selector: 'jqxWindow',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxWindowComponent implements OnChanges
{
   @Input('autoOpen') attrAutoOpen: boolean;
   @Input('animationType') attrAnimationType: string;
   @Input('collapsed') attrCollapsed: boolean;
   @Input('collapseAnimationDuration') attrCollapseAnimationDuration: number;
   @Input('content') attrContent: string;
   @Input('closeAnimationDuration') attrCloseAnimationDuration: number;
   @Input('closeButtonSize') attrCloseButtonSize: number;
   @Input('closeButtonAction') attrCloseButtonAction: string;
   @Input('cancelButton') attrCancelButton: any;
   @Input('dragArea') attrDragArea: jqwidgets.WindowDragArea;
   @Input('draggable') attrDraggable: boolean;
   @Input('disabled') attrDisabled: boolean;
   @Input('initContent') attrInitContent: () => void;
   @Input('isModal') attrIsModal: boolean;
   @Input('keyboardCloseKey') attrKeyboardCloseKey: number | string;
   @Input('keyboardNavigation') attrKeyboardNavigation: boolean;
   @Input('minHeight') attrMinHeight: string | number;
   @Input('maxHeight') attrMaxHeight: string | number;
   @Input('minWidth') attrMinWidth: number | string;
   @Input('maxWidth') attrMaxWidth: number | string;
   @Input('modalOpacity') attrModalOpacity: number | string;
   @Input('modalZIndex') attrModalZIndex: number;
   @Input('modalBackgroundZIndex') attrModalBackgroundZIndex: number;
   @Input('okButton') attrOkButton: any;
   @Input('position') attrPosition: string | any;
   @Input('rtl') attrRtl: boolean;
   @Input('resizable') attrResizable: boolean;
   @Input('showAnimationDuration') attrShowAnimationDuration: number;
   @Input('showCloseButton') attrShowCloseButton: boolean;
   @Input('showCollapseButton') attrShowCollapseButton: boolean;
   @Input('theme') attrTheme: string;
   @Input('title') attrTitle: string;
   @Input('zIndex') attrZIndex: number;
   @Input('width') attrWidth: string | number;
   @Input('height') attrHeight: string | number;

   @Input('auto-create') autoCreate: boolean = true;

   properties: string[] = ['autoOpen','animationType','collapsed','collapseAnimationDuration','content','closeAnimationDuration','closeButtonSize','closeButtonAction','cancelButton','dragArea','draggable','disabled','height','initContent','isModal','keyboardCloseKey','keyboardNavigation','minHeight','maxHeight','minWidth','maxWidth','modalOpacity','modalZIndex','modalBackgroundZIndex','okButton','position','rtl','resizable','showAnimationDuration','showCloseButton','showCollapseButton','theme','title','width','zIndex'];
   host: any;
   elementRef: ElementRef;
   widgetObject:  jqwidgets.jqxWindow;

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
                     areEqual = this.arraysEqual(this[attrName], this.host.jqxWindow(this.properties[i]));
                  }
                  if (areEqual) {
                     return false;
                  }

                  this.host.jqxWindow(this.properties[i], this[attrName]);
                  continue;
               }

               if (this[attrName] !== this.host.jqxWindow(this.properties[i])) {
                  this.host.jqxWindow(this.properties[i], this[attrName]); 
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
      this.widgetObject = jqwidgets.createInstance(this.host, 'jqxWindow', options);

   }

   createWidget(options?: any): void {
        this.createComponent(options);
   }

   __updateRect__() : void {
      if(this.host) this.host.css({ width: this.attrWidth, height: this.attrHeight });
   }

   setOptions(options: any) : void {
      this.host.jqxWindow('setOptions', options);
   }

   // jqxWindowComponent properties
   autoOpen(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxWindow('autoOpen', arg);
      } else {
          return this.host.jqxWindow('autoOpen');
      }
   }

   animationType(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxWindow('animationType', arg);
      } else {
          return this.host.jqxWindow('animationType');
      }
   }

   collapsed(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxWindow('collapsed', arg);
      } else {
          return this.host.jqxWindow('collapsed');
      }
   }

   collapseAnimationDuration(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxWindow('collapseAnimationDuration', arg);
      } else {
          return this.host.jqxWindow('collapseAnimationDuration');
      }
   }

   content(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxWindow('content', arg);
      } else {
          return this.host.jqxWindow('content');
      }
   }

   closeAnimationDuration(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxWindow('closeAnimationDuration', arg);
      } else {
          return this.host.jqxWindow('closeAnimationDuration');
      }
   }

   closeButtonSize(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxWindow('closeButtonSize', arg);
      } else {
          return this.host.jqxWindow('closeButtonSize');
      }
   }

   closeButtonAction(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxWindow('closeButtonAction', arg);
      } else {
          return this.host.jqxWindow('closeButtonAction');
      }
   }

   cancelButton(arg?: any): any {
      if (arg !== undefined) {
          this.host.jqxWindow('cancelButton', arg);
      } else {
          return this.host.jqxWindow('cancelButton');
      }
   }

   dragArea(arg?: jqwidgets.WindowDragArea): jqwidgets.WindowDragArea {
      if (arg !== undefined) {
          this.host.jqxWindow('dragArea', arg);
      } else {
          return this.host.jqxWindow('dragArea');
      }
   }

   draggable(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxWindow('draggable', arg);
      } else {
          return this.host.jqxWindow('draggable');
      }
   }

   disabled(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxWindow('disabled', arg);
      } else {
          return this.host.jqxWindow('disabled');
      }
   }

   height(arg?: string | number): string | number {
      if (arg !== undefined) {
          this.host.jqxWindow('height', arg);
      } else {
          return this.host.jqxWindow('height');
      }
   }

   initContent(arg?: () => void): () => void {
      if (arg !== undefined) {
          this.host.jqxWindow('initContent', arg);
      } else {
          return this.host.jqxWindow('initContent');
      }
   }

   isModal(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxWindow('isModal', arg);
      } else {
          return this.host.jqxWindow('isModal');
      }
   }

   keyboardCloseKey(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxWindow('keyboardCloseKey', arg);
      } else {
          return this.host.jqxWindow('keyboardCloseKey');
      }
   }

   keyboardNavigation(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxWindow('keyboardNavigation', arg);
      } else {
          return this.host.jqxWindow('keyboardNavigation');
      }
   }

   minHeight(arg?: string | number): string | number {
      if (arg !== undefined) {
          this.host.jqxWindow('minHeight', arg);
      } else {
          return this.host.jqxWindow('minHeight');
      }
   }

   maxHeight(arg?: string | number): string | number {
      if (arg !== undefined) {
          this.host.jqxWindow('maxHeight', arg);
      } else {
          return this.host.jqxWindow('maxHeight');
      }
   }

   minWidth(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxWindow('minWidth', arg);
      } else {
          return this.host.jqxWindow('minWidth');
      }
   }

   maxWidth(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxWindow('maxWidth', arg);
      } else {
          return this.host.jqxWindow('maxWidth');
      }
   }

   modalOpacity(arg?: undefined): undefined {
      if (arg !== undefined) {
          this.host.jqxWindow('modalOpacity', arg);
      } else {
          return this.host.jqxWindow('modalOpacity');
      }
   }

   modalZIndex(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxWindow('modalZIndex', arg);
      } else {
          return this.host.jqxWindow('modalZIndex');
      }
   }

   modalBackgroundZIndex(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxWindow('modalBackgroundZIndex', arg);
      } else {
          return this.host.jqxWindow('modalBackgroundZIndex');
      }
   }

   okButton(arg?: any): any {
      if (arg !== undefined) {
          this.host.jqxWindow('okButton', arg);
      } else {
          return this.host.jqxWindow('okButton');
      }
   }

   position(arg?: string | any): string | any {
      if (arg !== undefined) {
          this.host.jqxWindow('position', arg);
      } else {
          return this.host.jqxWindow('position');
      }
   }

   rtl(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxWindow('rtl', arg);
      } else {
          return this.host.jqxWindow('rtl');
      }
   }

   resizable(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxWindow('resizable', arg);
      } else {
          return this.host.jqxWindow('resizable');
      }
   }

   showAnimationDuration(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxWindow('showAnimationDuration', arg);
      } else {
          return this.host.jqxWindow('showAnimationDuration');
      }
   }

   showCloseButton(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxWindow('showCloseButton', arg);
      } else {
          return this.host.jqxWindow('showCloseButton');
      }
   }

   showCollapseButton(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxWindow('showCollapseButton', arg);
      } else {
          return this.host.jqxWindow('showCollapseButton');
      }
   }

   theme(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxWindow('theme', arg);
      } else {
          return this.host.jqxWindow('theme');
      }
   }

   title(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxWindow('title', arg);
      } else {
          return this.host.jqxWindow('title');
      }
   }

   width(arg?: string | number): string | number {
      if (arg !== undefined) {
          this.host.jqxWindow('width', arg);
      } else {
          return this.host.jqxWindow('width');
      }
   }

   zIndex(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxWindow('zIndex', arg);
      } else {
          return this.host.jqxWindow('zIndex');
      }
   }


   // jqxWindowComponent functions
   bringToFront(): void {
      this.host.jqxWindow('bringToFront');
   }

   close(): void {
      this.host.jqxWindow('close');
   }

   collapse(): void {
      this.host.jqxWindow('collapse');
   }

   closeAll(): void {
      this.host.jqxWindow('closeAll');
   }

   disable(): void {
      this.host.jqxWindow('disable');
   }

   destroy(): void {
      this.host.jqxWindow('destroy');
   }

   enable(): void {
      this.host.jqxWindow('enable');
   }

   expand(): void {
      this.host.jqxWindow('expand');
   }

   focus(): void {
      this.host.jqxWindow('focus');
   }

   isOpen(): boolean {
      return this.host.jqxWindow('isOpen');
   }

   move(top: number, left: number): void {
      this.host.jqxWindow('move', top, left);
   }

   open(): void {
      this.host.jqxWindow('open');
   }

   hide(): void {
      this.host.jqxWindow('hide');
   }

   resize(top: number, left: number): void {
      this.host.jqxWindow('resize', top, left);
   }

   setTitle(title: string): void {
      this.host.jqxWindow('setTitle', title);
   }

   setContent(content: string): void {
      this.host.jqxWindow('setContent', content);
   }


   // jqxWindowComponent events
   @Output() onClose = new EventEmitter();
   @Output() onCollapse = new EventEmitter();
   @Output() onExpand = new EventEmitter();
   @Output() onMoving = new EventEmitter();
   @Output() onMoved = new EventEmitter();
   @Output() onOpen = new EventEmitter();
   @Output() onResizing = new EventEmitter();
   @Output() onResized = new EventEmitter();

   __wireEvents__(): void {
      this.host.on('close', (eventData: any) => { this.onClose.emit(eventData); });
      this.host.on('collapse', (eventData: any) => { this.onCollapse.emit(eventData); });
      this.host.on('expand', (eventData: any) => { this.onExpand.emit(eventData); });
      this.host.on('moving', (eventData: any) => { this.onMoving.emit(eventData); });
      this.host.on('moved', (eventData: any) => { this.onMoved.emit(eventData); });
      this.host.on('open', (eventData: any) => { this.onOpen.emit(eventData); });
      this.host.on('resizing', (eventData: any) => { this.onResizing.emit(eventData); });
      this.host.on('resized', (eventData: any) => { this.onResized.emit(eventData); });
   }

} //jqxWindowComponent


