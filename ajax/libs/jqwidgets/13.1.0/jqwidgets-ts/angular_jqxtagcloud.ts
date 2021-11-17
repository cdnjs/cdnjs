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
import '../jqwidgets/jqxtagcloud.js';

import { Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
declare let JQXLite: any;

@Component({
    selector: 'jqxTagCloud',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxTagCloudComponent implements OnChanges
{
   @Input('alterTextCase') attrAlterTextCase: string;
   @Input('disabled') attrDisabled: boolean;
   @Input('displayLimit') attrDisplayLimit: number;
   @Input('displayMember') attrDisplayMember: string;
   @Input('displayValue') attrDisplayValue: boolean;
   @Input('fontSizeUnit') attrFontSizeUnit: string;
   @Input('maxColor') attrMaxColor: string;
   @Input('maxFontSize') attrMaxFontSize: number;
   @Input('maxValueToDisplay') attrMaxValueToDisplay: number;
   @Input('minColor') attrMinColor: string;
   @Input('minFontSize') attrMinFontSize: number;
   @Input('minValueToDisplay') attrMinValueToDisplay: number;
   @Input('rtl') attrRtl: boolean;
   @Input('sortBy') attrSortBy: string;
   @Input('sortOrder') attrSortOrder: string;
   @Input('source') attrSource: jqwidgets.TagCloudSource;
   @Input('tagRenderer') attrTagRenderer: (itemData: jqwidgets.TagCloudTagRenderer['itemData'], minValue: jqwidgets.TagCloudTagRenderer['minValue'], valueRange: jqwidgets.TagCloudTagRenderer['valueRange']) => any;
   @Input('takeTopWeightedItems') attrTakeTopWeightedItems: boolean;
   @Input('textColor') attrTextColor: string;
   @Input('urlBase') attrUrlBase: string;
   @Input('urlMember') attrUrlMember: string;
   @Input('valueMember') attrValueMember: string;
   @Input('width') attrWidth: string | number;
   @Input('height') attrHeight: string | number;

   @Input('auto-create') autoCreate: boolean = true;

   properties: string[] = ['alterTextCase','disabled','displayLimit','displayMember','displayValue','fontSizeUnit','height','maxColor','maxFontSize','maxValueToDisplay','minColor','minFontSize','minValueToDisplay','rtl','sortBy','sortOrder','source','tagRenderer','takeTopWeightedItems','textColor','urlBase','urlMember','valueMember','width'];
   host: any;
   elementRef: ElementRef;
   widgetObject:  jqwidgets.jqxTagCloud;

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
                     areEqual = this.arraysEqual(this[attrName], this.host.jqxTagCloud(this.properties[i]));
                  }
                  if (areEqual) {
                     return false;
                  }

                  this.host.jqxTagCloud(this.properties[i], this[attrName]);
                  continue;
               }

               if (this[attrName] !== this.host.jqxTagCloud(this.properties[i])) {
                  this.host.jqxTagCloud(this.properties[i], this[attrName]); 
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
      this.widgetObject = jqwidgets.createInstance(this.host, 'jqxTagCloud', options);

   }

   createWidget(options?: any): void {
        this.createComponent(options);
   }

   __updateRect__() : void {
      if(this.host) this.host.css({ width: this.attrWidth, height: this.attrHeight });
   }

   setOptions(options: any) : void {
      this.host.jqxTagCloud('setOptions', options);
   }

   // jqxTagCloudComponent properties
   alterTextCase(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxTagCloud('alterTextCase', arg);
      } else {
          return this.host.jqxTagCloud('alterTextCase');
      }
   }

   disabled(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxTagCloud('disabled', arg);
      } else {
          return this.host.jqxTagCloud('disabled');
      }
   }

   displayLimit(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxTagCloud('displayLimit', arg);
      } else {
          return this.host.jqxTagCloud('displayLimit');
      }
   }

   displayMember(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxTagCloud('displayMember', arg);
      } else {
          return this.host.jqxTagCloud('displayMember');
      }
   }

   displayValue(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxTagCloud('displayValue', arg);
      } else {
          return this.host.jqxTagCloud('displayValue');
      }
   }

   fontSizeUnit(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxTagCloud('fontSizeUnit', arg);
      } else {
          return this.host.jqxTagCloud('fontSizeUnit');
      }
   }

   height(arg?: number | string): number | string {
      if (arg !== undefined) {
          this.host.jqxTagCloud('height', arg);
      } else {
          return this.host.jqxTagCloud('height');
      }
   }

   maxColor(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxTagCloud('maxColor', arg);
      } else {
          return this.host.jqxTagCloud('maxColor');
      }
   }

   maxFontSize(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxTagCloud('maxFontSize', arg);
      } else {
          return this.host.jqxTagCloud('maxFontSize');
      }
   }

   maxValueToDisplay(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxTagCloud('maxValueToDisplay', arg);
      } else {
          return this.host.jqxTagCloud('maxValueToDisplay');
      }
   }

   minColor(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxTagCloud('minColor', arg);
      } else {
          return this.host.jqxTagCloud('minColor');
      }
   }

   minFontSize(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxTagCloud('minFontSize', arg);
      } else {
          return this.host.jqxTagCloud('minFontSize');
      }
   }

   minValueToDisplay(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxTagCloud('minValueToDisplay', arg);
      } else {
          return this.host.jqxTagCloud('minValueToDisplay');
      }
   }

   rtl(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxTagCloud('rtl', arg);
      } else {
          return this.host.jqxTagCloud('rtl');
      }
   }

   sortBy(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxTagCloud('sortBy', arg);
      } else {
          return this.host.jqxTagCloud('sortBy');
      }
   }

   sortOrder(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxTagCloud('sortOrder', arg);
      } else {
          return this.host.jqxTagCloud('sortOrder');
      }
   }

   source(arg?: jqwidgets.TagCloudSource): jqwidgets.TagCloudSource {
      if (arg !== undefined) {
          this.host.jqxTagCloud('source', arg);
      } else {
          return this.host.jqxTagCloud('source');
      }
   }

   tagRenderer(arg?: (itemData: jqwidgets.TagCloudTagRenderer['itemData'], minValue: jqwidgets.TagCloudTagRenderer['minValue'], valueRange: jqwidgets.TagCloudTagRenderer['valueRange']) => any): (itemData: jqwidgets.TagCloudTagRenderer['itemData'], minValue: jqwidgets.TagCloudTagRenderer['minValue'], valueRange: jqwidgets.TagCloudTagRenderer['valueRange']) => any {
      if (arg !== undefined) {
          this.host.jqxTagCloud('tagRenderer', arg);
      } else {
          return this.host.jqxTagCloud('tagRenderer');
      }
   }

   takeTopWeightedItems(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxTagCloud('takeTopWeightedItems', arg);
      } else {
          return this.host.jqxTagCloud('takeTopWeightedItems');
      }
   }

   textColor(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxTagCloud('textColor', arg);
      } else {
          return this.host.jqxTagCloud('textColor');
      }
   }

   urlBase(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxTagCloud('urlBase', arg);
      } else {
          return this.host.jqxTagCloud('urlBase');
      }
   }

   urlMember(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxTagCloud('urlMember', arg);
      } else {
          return this.host.jqxTagCloud('urlMember');
      }
   }

   valueMember(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxTagCloud('valueMember', arg);
      } else {
          return this.host.jqxTagCloud('valueMember');
      }
   }

   width(arg?: string | number): string | number {
      if (arg !== undefined) {
          this.host.jqxTagCloud('width', arg);
      } else {
          return this.host.jqxTagCloud('width');
      }
   }


   // jqxTagCloudComponent functions
   destroy(): void {
      this.host.jqxTagCloud('destroy');
   }

   findTagIndex(tag: string): number {
      return this.host.jqxTagCloud('findTagIndex', tag);
   }

   getHiddenTagsList(): Array<any> {
      return this.host.jqxTagCloud('getHiddenTagsList');
   }

   getRenderedTags(): Array<any> {
      return this.host.jqxTagCloud('getRenderedTags');
   }

   getTagsList(): Array<any> {
      return this.host.jqxTagCloud('getTagsList');
   }

   hideItem(index: number): void {
      this.host.jqxTagCloud('hideItem', index);
   }

   insertAt(index: number, item: any): void {
      this.host.jqxTagCloud('insertAt', index, item);
   }

   removeAt(index: number): void {
      this.host.jqxTagCloud('removeAt', index);
   }

   updateAt(index: number, item: any): void {
      this.host.jqxTagCloud('updateAt', index, item);
   }

   showItem(index: number): void {
      this.host.jqxTagCloud('showItem', index);
   }


   // jqxTagCloudComponent events
   @Output() onBindingComplete = new EventEmitter();
   @Output() onItemClick = new EventEmitter();

   __wireEvents__(): void {
      this.host.on('bindingComplete', (eventData: any) => { this.onBindingComplete.emit(eventData); });
      this.host.on('itemClick', (eventData: any) => { this.onItemClick.emit(eventData); });
   }

} //jqxTagCloudComponent


