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
import '../jqwidgets/jqxcombobox.js';

import { Component, Input, Output, AfterViewInit, AfterViewChecked, EventEmitter, ElementRef, forwardRef, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const noop = () => { };
declare let JQXLite: any;

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => jqxComboBoxComponent),
    multi: true
}

@Component({
    selector: 'jqxComboBox',
    template: '<div><ng-content></ng-content></div>',
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class jqxComboBoxComponent implements ControlValueAccessor, OnChanges, AfterViewInit, AfterViewChecked 
{
   @Input('animationType') attrAnimationType: string;
   @Input('autoComplete') attrAutoComplete: boolean;
   @Input('autoOpen') attrAutoOpen: boolean;
   @Input('autoItemsHeight') attrAutoItemsHeight: boolean;
   @Input('autoDropDownHeight') attrAutoDropDownHeight: boolean;
   @Input('closeDelay') attrCloseDelay: number;
   @Input('checkboxes') attrCheckboxes: boolean;
   @Input('disabled') attrDisabled: boolean;
   @Input('displayMember') attrDisplayMember: string;
   @Input('dropDownHorizontalAlignment') attrDropDownHorizontalAlignment: string;
   @Input('dropDownVerticalAlignment') attrDropDownVerticalAlignment: string;
   @Input('dropDownHeight') attrDropDownHeight: number | string;
   @Input('dropDownWidth') attrDropDownWidth: number | string;
   @Input('enableHover') attrEnableHover: boolean;
   @Input('enableSelection') attrEnableSelection: boolean;
   @Input('enableBrowserBoundsDetection') attrEnableBrowserBoundsDetection: boolean;
   @Input('itemHeight') attrItemHeight: number;
   @Input('multiSelect') attrMultiSelect: boolean;
   @Input('minLength') attrMinLength: number;
   @Input('openDelay') attrOpenDelay: number;
   @Input('popupZIndex') attrPopupZIndex: number;
   @Input('placeHolder') attrPlaceHolder: string;
   @Input('remoteAutoComplete') attrRemoteAutoComplete: boolean;
   @Input('remoteAutoCompleteDelay') attrRemoteAutoCompleteDelay: number;
   @Input('renderer') attrRenderer: (index?: jqwidgets.ComboBoxRenderer['index'], label?: jqwidgets.ComboBoxRenderer['label'], value?: jqwidgets.ComboBoxRenderer['value']) => string;
   @Input('renderSelectedItem') attrRenderSelectedItem: (index?: jqwidgets.ComboBoxRenderSelectedItem['index'], item?: jqwidgets.ComboBoxRenderSelectedItem['item']) => string;
   @Input('rtl') attrRtl: boolean;
   @Input('selectedIndex') attrSelectedIndex: number;
   @Input('showArrow') attrShowArrow: boolean;
   @Input('showCloseButtons') attrShowCloseButtons: boolean;
   @Input('searchMode') attrSearchMode: string;
   @Input('search') attrSearch: (searchString?: jqwidgets.ComboBoxSearch['searchString']) => void;
   @Input('source') attrSource: any;
   @Input('scrollBarSize') attrScrollBarSize: number | string;
   @Input('template') attrTemplate: string;
   @Input('theme') attrTheme: string;
   @Input('validateSelection') attrValidateSelection: (itemValue?: jqwidgets.ComboBoxValidateSelection['itemValue']) => boolean;
   @Input('valueMember') attrValueMember: string;
   @Input('width') attrWidth: string | number;
   @Input('height') attrHeight: string | number;

   @Input('auto-create') autoCreate: boolean = true;

   properties: string[] = ['animationType','autoComplete','autoOpen','autoItemsHeight','autoDropDownHeight','closeDelay','checkboxes','disabled','displayMember','dropDownHorizontalAlignment','dropDownVerticalAlignment','dropDownHeight','dropDownWidth','enableHover','enableSelection','enableBrowserBoundsDetection','height','itemHeight','multiSelect','minLength','openDelay','popupZIndex','placeHolder','remoteAutoComplete','remoteAutoCompleteDelay','renderer','renderSelectedItem','rtl','selectedIndex','showArrow','showCloseButtons','searchMode','search','source','scrollBarSize','template','theme','validateSelection','valueMember','width'];
   host: any;
   elementRef: ElementRef;
   widgetObject:  jqwidgets.jqxComboBox;

   content: String;
   container: HTMLDivElement;
   private onTouchedCallback: () => void = noop;
   private onChangeCallback: (_: any) => void = noop;

   constructor(containerElement: ElementRef) {
      this.elementRef = containerElement;
   }

   ngOnInit() {
   }; 

    ngAfterViewInit() {
       let children = JQXLite(this.elementRef.nativeElement.children).find('li'); 
       let html = ''; 
       let options = {}; 

       if (children.length > 0) {
           this.container = document.createElement('div');
           html = this.elementRef.nativeElement.innerHTML;
           this.container.appendChild(this.elementRef.nativeElement.firstChild);
           this.elementRef.nativeElement.innerHTML = html;
           this.content = html;

           let result = JQXLite.jqx.parseSourceTag(this.container);
                options['source'] = result.items;      }

      if (this.autoCreate) {
         this.createComponent(options); 
      }
   }; 

 ngAfterViewChecked() {
    if (this.container) {
        if (this.content !== this.container.innerHTML) {
            this.content = this.container.innerHTML;
            let result = JQXLite.jqx.parseSourceTag(this.container);

            this.host.jqxComboBox({source: result.items});
        }
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
                     areEqual = this.arraysEqual(this[attrName], this.host.jqxComboBox(this.properties[i]));
                  }
                  if (areEqual) {
                     return false;
                  }

                  this.host.jqxComboBox(this.properties[i], this[attrName]);
                  continue;
               }

               if (this[attrName] !== this.host.jqxComboBox(this.properties[i])) {
                  this.host.jqxComboBox(this.properties[i], this[attrName]); 
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
      this.widgetObject = jqwidgets.createInstance(this.host, 'jqxComboBox', options);

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
        this.widgetObject.clearSelection();
           if ( value ) {
               this.widgetObject.selectItem(this.widgetObject.getItemByValue(value));
           }       }
       if (this.host && (value === null || value === undefined)) {
               this.host.jqxComboBox('val', '');
       }
   }

   registerOnChange(fn: any): void {
       this.onChangeCallback = fn;
   }

   registerOnTouched(fn: any): void {
       this.onTouchedCallback = fn;
   }

   setOptions(options: any) : void {
      this.host.jqxComboBox('setOptions', options);
   }

   // jqxComboBoxComponent properties
   animationType(arg?: string): string {

      if (this.autoCreate && !this.host) {
         this.createComponent(); 
      }

      if (arg !== undefined) {
          this.host.jqxComboBox('animationType', arg);
      } else {
          return this.host.jqxComboBox('animationType');
      }
   }

   autoComplete(arg?: boolean): boolean {

      if (this.autoCreate && !this.host) {
         this.createComponent(); 
      }

      if (arg !== undefined) {
          this.host.jqxComboBox('autoComplete', arg);
      } else {
          return this.host.jqxComboBox('autoComplete');
      }
   }

   autoOpen(arg?: boolean): boolean {

      if (this.autoCreate && !this.host) {
         this.createComponent(); 
      }

      if (arg !== undefined) {
          this.host.jqxComboBox('autoOpen', arg);
      } else {
          return this.host.jqxComboBox('autoOpen');
      }
   }

   autoItemsHeight(arg?: boolean): boolean {

      if (this.autoCreate && !this.host) {
         this.createComponent(); 
      }

      if (arg !== undefined) {
          this.host.jqxComboBox('autoItemsHeight', arg);
      } else {
          return this.host.jqxComboBox('autoItemsHeight');
      }
   }

   autoDropDownHeight(arg?: boolean): boolean {

      if (this.autoCreate && !this.host) {
         this.createComponent(); 
      }

      if (arg !== undefined) {
          this.host.jqxComboBox('autoDropDownHeight', arg);
      } else {
          return this.host.jqxComboBox('autoDropDownHeight');
      }
   }

   closeDelay(arg?: number): number {

      if (this.autoCreate && !this.host) {
         this.createComponent(); 
      }

      if (arg !== undefined) {
          this.host.jqxComboBox('closeDelay', arg);
      } else {
          return this.host.jqxComboBox('closeDelay');
      }
   }

   checkboxes(arg?: boolean): boolean {

      if (this.autoCreate && !this.host) {
         this.createComponent(); 
      }

      if (arg !== undefined) {
          this.host.jqxComboBox('checkboxes', arg);
      } else {
          return this.host.jqxComboBox('checkboxes');
      }
   }

   disabled(arg?: boolean): boolean {

      if (this.autoCreate && !this.host) {
         this.createComponent(); 
      }

      if (arg !== undefined) {
          this.host.jqxComboBox('disabled', arg);
      } else {
          return this.host.jqxComboBox('disabled');
      }
   }

   displayMember(arg?: string): string {

      if (this.autoCreate && !this.host) {
         this.createComponent(); 
      }

      if (arg !== undefined) {
          this.host.jqxComboBox('displayMember', arg);
      } else {
          return this.host.jqxComboBox('displayMember');
      }
   }

   dropDownHorizontalAlignment(arg?: string): string {

      if (this.autoCreate && !this.host) {
         this.createComponent(); 
      }

      if (arg !== undefined) {
          this.host.jqxComboBox('dropDownHorizontalAlignment', arg);
      } else {
          return this.host.jqxComboBox('dropDownHorizontalAlignment');
      }
   }

   dropDownVerticalAlignment(arg?: string): string {

      if (this.autoCreate && !this.host) {
         this.createComponent(); 
      }

      if (arg !== undefined) {
          this.host.jqxComboBox('dropDownVerticalAlignment', arg);
      } else {
          return this.host.jqxComboBox('dropDownVerticalAlignment');
      }
   }

   dropDownHeight(arg?: number | string): number | string {

      if (this.autoCreate && !this.host) {
         this.createComponent(); 
      }

      if (arg !== undefined) {
          this.host.jqxComboBox('dropDownHeight', arg);
      } else {
          return this.host.jqxComboBox('dropDownHeight');
      }
   }

   dropDownWidth(arg?: number | string): number | string {

      if (this.autoCreate && !this.host) {
         this.createComponent(); 
      }

      if (arg !== undefined) {
          this.host.jqxComboBox('dropDownWidth', arg);
      } else {
          return this.host.jqxComboBox('dropDownWidth');
      }
   }

   enableHover(arg?: boolean): boolean {

      if (this.autoCreate && !this.host) {
         this.createComponent(); 
      }

      if (arg !== undefined) {
          this.host.jqxComboBox('enableHover', arg);
      } else {
          return this.host.jqxComboBox('enableHover');
      }
   }

   enableSelection(arg?: boolean): boolean {

      if (this.autoCreate && !this.host) {
         this.createComponent(); 
      }

      if (arg !== undefined) {
          this.host.jqxComboBox('enableSelection', arg);
      } else {
          return this.host.jqxComboBox('enableSelection');
      }
   }

   enableBrowserBoundsDetection(arg?: boolean): boolean {

      if (this.autoCreate && !this.host) {
         this.createComponent(); 
      }

      if (arg !== undefined) {
          this.host.jqxComboBox('enableBrowserBoundsDetection', arg);
      } else {
          return this.host.jqxComboBox('enableBrowserBoundsDetection');
      }
   }

   height(arg?: string | number): string | number {

      if (this.autoCreate && !this.host) {
         this.createComponent(); 
      }

      if (arg !== undefined) {
          this.host.jqxComboBox('height', arg);
      } else {
          return this.host.jqxComboBox('height');
      }
   }

   itemHeight(arg?: number): number {

      if (this.autoCreate && !this.host) {
         this.createComponent(); 
      }

      if (arg !== undefined) {
          this.host.jqxComboBox('itemHeight', arg);
      } else {
          return this.host.jqxComboBox('itemHeight');
      }
   }

   multiSelect(arg?: boolean): boolean {

      if (this.autoCreate && !this.host) {
         this.createComponent(); 
      }

      if (arg !== undefined) {
          this.host.jqxComboBox('multiSelect', arg);
      } else {
          return this.host.jqxComboBox('multiSelect');
      }
   }

   minLength(arg?: number): number {

      if (this.autoCreate && !this.host) {
         this.createComponent(); 
      }

      if (arg !== undefined) {
          this.host.jqxComboBox('minLength', arg);
      } else {
          return this.host.jqxComboBox('minLength');
      }
   }

   openDelay(arg?: number): number {

      if (this.autoCreate && !this.host) {
         this.createComponent(); 
      }

      if (arg !== undefined) {
          this.host.jqxComboBox('openDelay', arg);
      } else {
          return this.host.jqxComboBox('openDelay');
      }
   }

   popupZIndex(arg?: number): number {

      if (this.autoCreate && !this.host) {
         this.createComponent(); 
      }

      if (arg !== undefined) {
          this.host.jqxComboBox('popupZIndex', arg);
      } else {
          return this.host.jqxComboBox('popupZIndex');
      }
   }

   placeHolder(arg?: string): string {

      if (this.autoCreate && !this.host) {
         this.createComponent(); 
      }

      if (arg !== undefined) {
          this.host.jqxComboBox('placeHolder', arg);
      } else {
          return this.host.jqxComboBox('placeHolder');
      }
   }

   remoteAutoComplete(arg?: boolean): boolean {

      if (this.autoCreate && !this.host) {
         this.createComponent(); 
      }

      if (arg !== undefined) {
          this.host.jqxComboBox('remoteAutoComplete', arg);
      } else {
          return this.host.jqxComboBox('remoteAutoComplete');
      }
   }

   remoteAutoCompleteDelay(arg?: number): number {

      if (this.autoCreate && !this.host) {
         this.createComponent(); 
      }

      if (arg !== undefined) {
          this.host.jqxComboBox('remoteAutoCompleteDelay', arg);
      } else {
          return this.host.jqxComboBox('remoteAutoCompleteDelay');
      }
   }

   renderer(arg?: (index?: jqwidgets.ComboBoxRenderer['index'], label?: jqwidgets.ComboBoxRenderer['label'], value?: jqwidgets.ComboBoxRenderer['value']) => string): (index?: jqwidgets.ComboBoxRenderer['index'], label?: jqwidgets.ComboBoxRenderer['label'], value?: jqwidgets.ComboBoxRenderer['value']) => string {

      if (this.autoCreate && !this.host) {
         this.createComponent(); 
      }

      if (arg !== undefined) {
          this.host.jqxComboBox('renderer', arg);
      } else {
          return this.host.jqxComboBox('renderer');
      }
   }

   renderSelectedItem(arg?: (index?: jqwidgets.ComboBoxRenderSelectedItem['index'], item?: jqwidgets.ComboBoxRenderSelectedItem['item']) => string): (index?: jqwidgets.ComboBoxRenderSelectedItem['index'], item?: jqwidgets.ComboBoxRenderSelectedItem['item']) => string {

      if (this.autoCreate && !this.host) {
         this.createComponent(); 
      }

      if (arg !== undefined) {
          this.host.jqxComboBox('renderSelectedItem', arg);
      } else {
          return this.host.jqxComboBox('renderSelectedItem');
      }
   }

   rtl(arg?: boolean): boolean {

      if (this.autoCreate && !this.host) {
         this.createComponent(); 
      }

      if (arg !== undefined) {
          this.host.jqxComboBox('rtl', arg);
      } else {
          return this.host.jqxComboBox('rtl');
      }
   }

   selectedIndex(arg?: number): number {

      if (this.autoCreate && !this.host) {
         this.createComponent(); 
      }

      if (arg !== undefined) {
          this.host.jqxComboBox('selectedIndex', arg);
      } else {
          return this.host.jqxComboBox('selectedIndex');
      }
   }

   showArrow(arg?: boolean): boolean {

      if (this.autoCreate && !this.host) {
         this.createComponent(); 
      }

      if (arg !== undefined) {
          this.host.jqxComboBox('showArrow', arg);
      } else {
          return this.host.jqxComboBox('showArrow');
      }
   }

   showCloseButtons(arg?: boolean): boolean {

      if (this.autoCreate && !this.host) {
         this.createComponent(); 
      }

      if (arg !== undefined) {
          this.host.jqxComboBox('showCloseButtons', arg);
      } else {
          return this.host.jqxComboBox('showCloseButtons');
      }
   }

   searchMode(arg?: string): string {

      if (this.autoCreate && !this.host) {
         this.createComponent(); 
      }

      if (arg !== undefined) {
          this.host.jqxComboBox('searchMode', arg);
      } else {
          return this.host.jqxComboBox('searchMode');
      }
   }

   search(arg?: (searchString?: jqwidgets.ComboBoxSearch['searchString']) => void): (searchString?: jqwidgets.ComboBoxSearch['searchString']) => void {

      if (this.autoCreate && !this.host) {
         this.createComponent(); 
      }

      if (arg !== undefined) {
          this.host.jqxComboBox('search', arg);
      } else {
          return this.host.jqxComboBox('search');
      }
   }

   source(arg?: any): any {

      if (this.autoCreate && !this.host) {
         this.createComponent(); 
      }

      if (arg !== undefined) {
          this.host.jqxComboBox('source', arg);
      } else {
          return this.host.jqxComboBox('source');
      }
   }

   scrollBarSize(arg?: number | string): number | string {

      if (this.autoCreate && !this.host) {
         this.createComponent(); 
      }

      if (arg !== undefined) {
          this.host.jqxComboBox('scrollBarSize', arg);
      } else {
          return this.host.jqxComboBox('scrollBarSize');
      }
   }

   template(arg?: string): string {

      if (this.autoCreate && !this.host) {
         this.createComponent(); 
      }

      if (arg !== undefined) {
          this.host.jqxComboBox('template', arg);
      } else {
          return this.host.jqxComboBox('template');
      }
   }

   theme(arg?: string): string {

      if (this.autoCreate && !this.host) {
         this.createComponent(); 
      }

      if (arg !== undefined) {
          this.host.jqxComboBox('theme', arg);
      } else {
          return this.host.jqxComboBox('theme');
      }
   }

   validateSelection(arg?: (itemValue?: jqwidgets.ComboBoxValidateSelection['itemValue']) => boolean): (itemValue?: jqwidgets.ComboBoxValidateSelection['itemValue']) => boolean {

      if (this.autoCreate && !this.host) {
         this.createComponent(); 
      }

      if (arg !== undefined) {
          this.host.jqxComboBox('validateSelection', arg);
      } else {
          return this.host.jqxComboBox('validateSelection');
      }
   }

   valueMember(arg?: string): string {

      if (this.autoCreate && !this.host) {
         this.createComponent(); 
      }

      if (arg !== undefined) {
          this.host.jqxComboBox('valueMember', arg);
      } else {
          return this.host.jqxComboBox('valueMember');
      }
   }

   width(arg?: string | number): string | number {

      if (this.autoCreate && !this.host) {
         this.createComponent(); 
      }

      if (arg !== undefined) {
          this.host.jqxComboBox('width', arg);
      } else {
          return this.host.jqxComboBox('width');
      }
   }


   // jqxComboBoxComponent functions
   addItem(item: any): boolean {

      if (this.autoCreate && !this.host) {
         this.createComponent(); 
      }

      return this.host.jqxComboBox('addItem', item);
   }

   clearSelection(): void {

      if (this.autoCreate && !this.host) {
         this.createComponent(); 
      }

      this.host.jqxComboBox('clearSelection');
   }

   clear(): void {

      if (this.autoCreate && !this.host) {
         this.createComponent(); 
      }

      this.host.jqxComboBox('clear');
   }

   close(): void {

      if (this.autoCreate && !this.host) {
         this.createComponent(); 
      }

      this.host.jqxComboBox('close');
   }

   checkIndex(index: number): void {

      if (this.autoCreate && !this.host) {
         this.createComponent(); 
      }

      this.host.jqxComboBox('checkIndex', index);
   }

   checkItem(item: any): void {

      if (this.autoCreate && !this.host) {
         this.createComponent(); 
      }

      this.host.jqxComboBox('checkItem', item);
   }

   checkAll(): void {

      if (this.autoCreate && !this.host) {
         this.createComponent(); 
      }

      this.host.jqxComboBox('checkAll');
   }

   destroy(): void {

      if (this.autoCreate && !this.host) {
         this.createComponent(); 
      }

      this.host.jqxComboBox('destroy');
   }

   disableItem(item: any): void {

      if (this.autoCreate && !this.host) {
         this.createComponent(); 
      }

      this.host.jqxComboBox('disableItem', item);
   }

   disableAt(index: number): void {

      if (this.autoCreate && !this.host) {
         this.createComponent(); 
      }

      this.host.jqxComboBox('disableAt', index);
   }

   enableItem(item: any): void {

      if (this.autoCreate && !this.host) {
         this.createComponent(); 
      }

      this.host.jqxComboBox('enableItem', item);
   }

   enableAt(index: number): void {

      if (this.autoCreate && !this.host) {
         this.createComponent(); 
      }

      this.host.jqxComboBox('enableAt', index);
   }

   ensureVisible(index: number): void {

      if (this.autoCreate && !this.host) {
         this.createComponent(); 
      }

      this.host.jqxComboBox('ensureVisible', index);
   }

   focus(): void {

      if (this.autoCreate && !this.host) {
         this.createComponent(); 
      }

      this.host.jqxComboBox('focus');
   }

   getItem(index: number): any {

      if (this.autoCreate && !this.host) {
         this.createComponent(); 
      }

      return this.host.jqxComboBox('getItem', index);
   }

   getItemByValue(value: string): any {

      if (this.autoCreate && !this.host) {
         this.createComponent(); 
      }

      return this.host.jqxComboBox('getItemByValue', value);
   }

   getVisibleItems(): Array<any> {

      if (this.autoCreate && !this.host) {
         this.createComponent(); 
      }

      return this.host.jqxComboBox('getVisibleItems');
   }

   getItems(): Array<any> {

      if (this.autoCreate && !this.host) {
         this.createComponent(); 
      }

      return this.host.jqxComboBox('getItems');
   }

   getCheckedItems(): Array<any> {

      if (this.autoCreate && !this.host) {
         this.createComponent(); 
      }

      return this.host.jqxComboBox('getCheckedItems');
   }

   getSelectedItem(): any {

      if (this.autoCreate && !this.host) {
         this.createComponent(); 
      }

      return this.host.jqxComboBox('getSelectedItem');
   }

   getSelectedItems(): Array<any> {

      if (this.autoCreate && !this.host) {
         this.createComponent(); 
      }

      return this.host.jqxComboBox('getSelectedItems');
   }

   getSelectedIndex(): number {

      if (this.autoCreate && !this.host) {
         this.createComponent(); 
      }

      return this.host.jqxComboBox('getSelectedIndex');
   }

   insertAt(item: any, index: number): boolean {

      if (this.autoCreate && !this.host) {
         this.createComponent(); 
      }

      return this.host.jqxComboBox('insertAt', item, index);
   }

   isOpened(): boolean {

      if (this.autoCreate && !this.host) {
         this.createComponent(); 
      }

      return this.host.jqxComboBox('isOpened');
   }

   indeterminateIndex(index: number): void {

      if (this.autoCreate && !this.host) {
         this.createComponent(); 
      }

      this.host.jqxComboBox('indeterminateIndex', index);
   }

   indeterminateItem(item: any): void {

      if (this.autoCreate && !this.host) {
         this.createComponent(); 
      }

      this.host.jqxComboBox('indeterminateItem', item);
   }

   loadFromSelect(selectTagId: string): void {

      if (this.autoCreate && !this.host) {
         this.createComponent(); 
      }

      this.host.jqxComboBox('loadFromSelect', selectTagId);
   }

   open(): void {

      if (this.autoCreate && !this.host) {
         this.createComponent(); 
      }

      this.host.jqxComboBox('open');
   }

   removeItem(item: any): boolean {

      if (this.autoCreate && !this.host) {
         this.createComponent(); 
      }

      return this.host.jqxComboBox('removeItem', item);
   }

   removeAt(index: number): boolean {

      if (this.autoCreate && !this.host) {
         this.createComponent(); 
      }

      return this.host.jqxComboBox('removeAt', index);
   }

   selectIndex(index: number): void {

      if (this.autoCreate && !this.host) {
         this.createComponent(); 
      }

      this.host.jqxComboBox('selectIndex', index);
   }

   selectItem(item: any): void {

      if (this.autoCreate && !this.host) {
         this.createComponent(); 
      }

      this.host.jqxComboBox('selectItem', item);
   }

   searchString(): string {

      if (this.autoCreate && !this.host) {
         this.createComponent(); 
      }

      return this.host.jqxComboBox('searchString');
   }

   updateItem(item: any, itemValue: string): void {

      if (this.autoCreate && !this.host) {
         this.createComponent(); 
      }

      this.host.jqxComboBox('updateItem', item, itemValue);
   }

   updateAt(item: any, index: any): void {

      if (this.autoCreate && !this.host) {
         this.createComponent(); 
      }

      this.host.jqxComboBox('updateAt', item, index);
   }

   unselectIndex(index: number): void {

      if (this.autoCreate && !this.host) {
         this.createComponent(); 
      }

      this.host.jqxComboBox('unselectIndex', index);
   }

   unselectItem(item: any): void {

      if (this.autoCreate && !this.host) {
         this.createComponent(); 
      }

      this.host.jqxComboBox('unselectItem', item);
   }

   uncheckIndex(index: number): void {

      if (this.autoCreate && !this.host) {
         this.createComponent(); 
      }

      this.host.jqxComboBox('uncheckIndex', index);
   }

   uncheckItem(item: any): void {

      if (this.autoCreate && !this.host) {
         this.createComponent(); 
      }

      this.host.jqxComboBox('uncheckItem', item);
   }

   uncheckAll(): void {

      if (this.autoCreate && !this.host) {
         this.createComponent(); 
      }

      this.host.jqxComboBox('uncheckAll');
   }

   val(value?: string): any {
      if (value !== undefined) {
         return this.host.jqxComboBox('val', value);
      } else {
         return this.host.jqxComboBox('val');
      }
   };


   // jqxComboBoxComponent events
   @Output() onBindingComplete = new EventEmitter();
   @Output() onCheckChange = new EventEmitter();
   @Output() onClose = new EventEmitter();
   @Output() onChange = new EventEmitter();
   @Output() onOpen = new EventEmitter();
   @Output() onSelect = new EventEmitter();
   @Output() onUnselect = new EventEmitter();

   __wireEvents__(): void {
      this.host.on('bindingComplete', (eventData: any) => { this.onBindingComplete.emit(eventData); });
      this.host.on('checkChange', (eventData: any) => { this.onCheckChange.emit(eventData); });
      this.host.on('close', (eventData: any) => { this.onClose.emit(eventData); });
      this.host.on('change', (eventData: any) => { this.onChange.emit(eventData); if(eventData.args) if(eventData.args.item !== null) this.onChangeCallback(eventData.args.item.value); });
      this.host.on('open', (eventData: any) => { this.onOpen.emit(eventData); });
      this.host.on('select', (eventData: any) => { this.onSelect.emit(eventData); });
      this.host.on('unselect', (eventData: any) => { this.onUnselect.emit(eventData); });
   }

} //jqxComboBoxComponent


