/*
jQWidgets v13.1.0 (2021-Nov)
Copyright (c) 2011-2021 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

/// <reference path="jqwidgets.d.ts" />

import '../jqwidgets/jqxcore.js';
import '../jqwidgets/jqxbuttons.js';
import '../jqwidgets/jqxtabs.js';

import { Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
declare let JQXLite: any;

@Component({
    selector: 'jqxTabs',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxTabsComponent implements OnChanges
{
   @Input('animationType') attrAnimationType: string;
   @Input('autoHeight') attrAutoHeight: boolean;
   @Input('closeButtonSize') attrCloseButtonSize: number;
   @Input('collapsible') attrCollapsible: boolean;
   @Input('contentTransitionDuration') attrContentTransitionDuration: number;
   @Input('disabled') attrDisabled: boolean;
   @Input('enabledHover') attrEnabledHover: boolean;
   @Input('enableScrollAnimation') attrEnableScrollAnimation: boolean;
   @Input('enableDropAnimation') attrEnableDropAnimation: boolean;
   @Input('initTabContent') attrInitTabContent: (tab?: number) => void;
   @Input('keyboardNavigation') attrKeyboardNavigation: boolean;
   @Input('next') attrNext: any;
   @Input('previous') attrPrevious: any;
   @Input('position') attrPosition: string;
   @Input('reorder') attrReorder: boolean;
   @Input('rtl') attrRtl: boolean;
   @Input('scrollAnimationDuration') attrScrollAnimationDuration: number;
   @Input('selectedItem') attrSelectedItem: number;
   @Input('selectionTracker') attrSelectionTracker: boolean;
   @Input('scrollable') attrScrollable: boolean;
   @Input('scrollPosition') attrScrollPosition: string;
   @Input('scrollStep') attrScrollStep: number;
   @Input('showCloseButtons') attrShowCloseButtons: boolean;
   @Input('toggleMode') attrToggleMode: string;
   @Input('theme') attrTheme: string;
   @Input('width') attrWidth: string | number;
   @Input('height') attrHeight: string | number;

   @Input('auto-create') autoCreate: boolean = true;

   properties: string[] = ['animationType','autoHeight','closeButtonSize','collapsible','contentTransitionDuration','disabled','enabledHover','enableScrollAnimation','enableDropAnimation','height','initTabContent','keyboardNavigation','next','previous','position','reorder','rtl','scrollAnimationDuration','selectedItem','selectionTracker','scrollable','scrollPosition','scrollStep','showCloseButtons','toggleMode','theme','width'];
   host: any;
   elementRef: ElementRef;
   widgetObject:  jqwidgets.jqxTabs;

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
                     areEqual = this.arraysEqual(this[attrName], this.host.jqxTabs(this.properties[i]));
                  }
                  if (areEqual) {
                     return false;
                  }

                  this.host.jqxTabs(this.properties[i], this[attrName]);
                  continue;
               }

               if (this[attrName] !== this.host.jqxTabs(this.properties[i])) {
                  this.host.jqxTabs(this.properties[i], this[attrName]); 
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
      this.widgetObject = jqwidgets.createInstance(this.host, 'jqxTabs', options);

   }

   createWidget(options?: any): void {
        this.createComponent(options);
   }

   __updateRect__() : void {
      if(this.host) this.host.css({ width: this.attrWidth, height: this.attrHeight });
   }

   setOptions(options: any) : void {
      this.host.jqxTabs('setOptions', options);
   }

   // jqxTabsComponent properties
   animationType(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxTabs('animationType', arg);
      } else {
          return this.host.jqxTabs('animationType');
      }
   }

   autoHeight(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxTabs('autoHeight', arg);
      } else {
          return this.host.jqxTabs('autoHeight');
      }
   }

   closeButtonSize(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxTabs('closeButtonSize', arg);
      } else {
          return this.host.jqxTabs('closeButtonSize');
      }
   }

   collapsible(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxTabs('collapsible', arg);
      } else {
          return this.host.jqxTabs('collapsible');
      }
   }

   contentTransitionDuration(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxTabs('contentTransitionDuration', arg);
      } else {
          return this.host.jqxTabs('contentTransitionDuration');
      }
   }

   disabled(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxTabs('disabled', arg);
      } else {
          return this.host.jqxTabs('disabled');
      }
   }

   enabledHover(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxTabs('enabledHover', arg);
      } else {
          return this.host.jqxTabs('enabledHover');
      }
   }

   enableScrollAnimation(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxTabs('enableScrollAnimation', arg);
      } else {
          return this.host.jqxTabs('enableScrollAnimation');
      }
   }

   enableDropAnimation(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxTabs('enableDropAnimation', arg);
      } else {
          return this.host.jqxTabs('enableDropAnimation');
      }
   }

   height(arg?: string | number): string | number {
      if (arg !== undefined) {
          this.host.jqxTabs('height', arg);
      } else {
          return this.host.jqxTabs('height');
      }
   }

   initTabContent(arg?: (tab?: number) => void): (tab?: number) => void {
      if (arg !== undefined) {
          this.host.jqxTabs('initTabContent', arg);
      } else {
          return this.host.jqxTabs('initTabContent');
      }
   }

   keyboardNavigation(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxTabs('keyboardNavigation', arg);
      } else {
          return this.host.jqxTabs('keyboardNavigation');
      }
   }

   next(arg?: any): any {
      if (arg !== undefined) {
          this.host.jqxTabs('next', arg);
      } else {
          return this.host.jqxTabs('next');
      }
   }

   previous(arg?: any): any {
      if (arg !== undefined) {
          this.host.jqxTabs('previous', arg);
      } else {
          return this.host.jqxTabs('previous');
      }
   }

   position(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxTabs('position', arg);
      } else {
          return this.host.jqxTabs('position');
      }
   }

   reorder(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxTabs('reorder', arg);
      } else {
          return this.host.jqxTabs('reorder');
      }
   }

   rtl(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxTabs('rtl', arg);
      } else {
          return this.host.jqxTabs('rtl');
      }
   }

   scrollAnimationDuration(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxTabs('scrollAnimationDuration', arg);
      } else {
          return this.host.jqxTabs('scrollAnimationDuration');
      }
   }

   selectedItem(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxTabs('selectedItem', arg);
      } else {
          return this.host.jqxTabs('selectedItem');
      }
   }

   selectionTracker(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxTabs('selectionTracker', arg);
      } else {
          return this.host.jqxTabs('selectionTracker');
      }
   }

   scrollable(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxTabs('scrollable', arg);
      } else {
          return this.host.jqxTabs('scrollable');
      }
   }

   scrollPosition(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxTabs('scrollPosition', arg);
      } else {
          return this.host.jqxTabs('scrollPosition');
      }
   }

   scrollStep(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxTabs('scrollStep', arg);
      } else {
          return this.host.jqxTabs('scrollStep');
      }
   }

   showCloseButtons(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxTabs('showCloseButtons', arg);
      } else {
          return this.host.jqxTabs('showCloseButtons');
      }
   }

   toggleMode(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxTabs('toggleMode', arg);
      } else {
          return this.host.jqxTabs('toggleMode');
      }
   }

   theme(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxTabs('theme', arg);
      } else {
          return this.host.jqxTabs('theme');
      }
   }

   width(arg?: string | number): string | number {
      if (arg !== undefined) {
          this.host.jqxTabs('width', arg);
      } else {
          return this.host.jqxTabs('width');
      }
   }


   // jqxTabsComponent functions
   addAt(index: number, title: string, content: string): void {
      this.host.jqxTabs('addAt', index, title, content);
   }

   addFirst(htmlElement1: any, htmlElement2: any): void {
      this.host.jqxTabs('addFirst', htmlElement1, htmlElement2);
   }

   addLast(htmlElement1: any, htmlElement2?: any): void {
      this.host.jqxTabs('addLast', htmlElement1, htmlElement2);
   }

   collapse(): void {
      this.host.jqxTabs('collapse');
   }

   disable(): void {
      this.host.jqxTabs('disable');
   }

   disableAt(index: number): void {
      this.host.jqxTabs('disableAt', index);
   }

   destroy(): void {
      this.host.jqxTabs('destroy');
   }

   ensureVisible(index: number): void {
      this.host.jqxTabs('ensureVisible', index);
   }

   enableAt(index: number): void {
      this.host.jqxTabs('enableAt', index);
   }

   expand(): void {
      this.host.jqxTabs('expand');
   }

   enable(): void {
      this.host.jqxTabs('enable');
   }

   focus(): void {
      this.host.jqxTabs('focus');
   }

   getTitleAt(index: number): string {
      return this.host.jqxTabs('getTitleAt', index);
   }

   getContentAt(index: number): any {
      return this.host.jqxTabs('getContentAt', index);
   }

   getDisabledTabsCount(): any {
      return this.host.jqxTabs('getDisabledTabsCount');
   }

   hideCloseButtonAt(index: number): void {
      this.host.jqxTabs('hideCloseButtonAt', index);
   }

   hideAllCloseButtons(): void {
      this.host.jqxTabs('hideAllCloseButtons');
   }

   length(): number {
      return this.host.jqxTabs('length');
   }

   removeAt(index: number): void {
      this.host.jqxTabs('removeAt', index);
   }

   removeFirst(): void {
      this.host.jqxTabs('removeFirst');
   }

   removeLast(): void {
      this.host.jqxTabs('removeLast');
   }

   select(index: number): void {
      this.host.jqxTabs('select', index);
   }

   setContentAt(index: number, htmlElement: string): void {
      this.host.jqxTabs('setContentAt', index, htmlElement);
   }

   setTitleAt(index: number, htmlElement: string): void {
      this.host.jqxTabs('setTitleAt', index, htmlElement);
   }

   showCloseButtonAt(index: number): void {
      this.host.jqxTabs('showCloseButtonAt', index);
   }

   showAllCloseButtons(): void {
      this.host.jqxTabs('showAllCloseButtons');
   }

   val(value?: string): any {
      if (value !== undefined) {
         return this.host.jqxTabs('val', value);
      } else {
         return this.host.jqxTabs('val');
      }
   };


   // jqxTabsComponent events
   @Output() onAdd = new EventEmitter();
   @Output() onCollapsed = new EventEmitter();
   @Output() onDragStart = new EventEmitter();
   @Output() onDragEnd = new EventEmitter();
   @Output() onExpanded = new EventEmitter();
   @Output() onRemoved = new EventEmitter();
   @Output() onSelecting = new EventEmitter();
   @Output() onSelected = new EventEmitter();
   @Output() onTabclick = new EventEmitter();
   @Output() onUnselecting = new EventEmitter();
   @Output() onUnselected = new EventEmitter();

   __wireEvents__(): void {
      this.host.on('add', (eventData: any) => { this.onAdd.emit(eventData); });
      this.host.on('collapsed', (eventData: any) => { this.onCollapsed.emit(eventData); });
      this.host.on('dragStart', (eventData: any) => { this.onDragStart.emit(eventData); });
      this.host.on('dragEnd', (eventData: any) => { this.onDragEnd.emit(eventData); });
      this.host.on('expanded', (eventData: any) => { this.onExpanded.emit(eventData); });
      this.host.on('removed', (eventData: any) => { this.onRemoved.emit(eventData); });
      this.host.on('selecting', (eventData: any) => { this.onSelecting.emit(eventData); });
      this.host.on('selected', (eventData: any) => { this.onSelected.emit(eventData); });
      this.host.on('tabclick', (eventData: any) => { this.onTabclick.emit(eventData); });
      this.host.on('unselecting', (eventData: any) => { this.onUnselecting.emit(eventData); });
      this.host.on('unselected', (eventData: any) => { this.onUnselected.emit(eventData); });
   }

} //jqxTabsComponent


