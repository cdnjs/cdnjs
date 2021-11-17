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
import '../jqwidgets/jqxmenu.js';
import '../jqwidgets/jqxwindow.js';
import '../jqwidgets/jqxdragdrop.js';
import '../jqwidgets/jqxcheckbox.js';
import '../jqwidgets/jqxinput.js';
import '../jqwidgets/jqxlistbox.js';
import '../jqwidgets/jqxdropdownlist.js';
import '../jqwidgets/jqxpivot.js';
import '../jqwidgets/jqxpivotgrid.js';
import '../jqwidgets/jqxpivotdesigner.js';

import { Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
declare let JQXLite: any;

@Component({
    selector: 'jqxPivotGrid',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxPivotGridComponent implements OnChanges
{
   @Input('source') attrSource: any;
   @Input('localization') attrLocalization: any;
   @Input('scrollBarsEnabled') attrScrollBarsEnabled: boolean;
   @Input('selectionEnabled') attrSelectionEnabled: boolean;
   @Input('multipleSelectionEnabled') attrMultipleSelectionEnabled: boolean;
   @Input('treeStyleRows') attrTreeStyleRows: boolean;
   @Input('autoResize') attrAutoResize: boolean;
   @Input('itemsRenderer') attrItemsRenderer: (pivotItem: jqwidgets.PivotGridItemsRenderer['pivotItem']) => string;
   @Input('cellsRenderer') attrCellsRenderer: (pivotCell: jqwidgets.PivotGridCellsRenderer['pivotCell']) => string;
   @Input('width') attrWidth: string | number;
   @Input('height') attrHeight: string | number;

   @Input('auto-create') autoCreate: boolean = true;

   properties: string[] = ['source','localization','scrollBarsEnabled','selectionEnabled','multipleSelectionEnabled','treeStyleRows','autoResize','itemsRenderer','cellsRenderer'];
   host: any;
   elementRef: ElementRef;
   widgetObject:  jqwidgets.jqxPivotGrid;

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
                     areEqual = this.arraysEqual(this[attrName], this.host.jqxPivotGrid(this.properties[i]));
                  }
                  if (areEqual) {
                     return false;
                  }

                  this.host.jqxPivotGrid(this.properties[i], this[attrName]);
                  continue;
               }

               if (this[attrName] !== this.host.jqxPivotGrid(this.properties[i])) {
                  this.host.jqxPivotGrid(this.properties[i], this[attrName]); 
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
      this.widgetObject = jqwidgets.createInstance(this.host, 'jqxPivotGrid', options);

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
      this.host.jqxPivotGrid('setOptions', options);
   }

   // jqxPivotGridComponent properties
   source(arg?: any): any {
      if (arg !== undefined) {
          this.host.jqxPivotGrid('source', arg);
      } else {
          return this.host.jqxPivotGrid('source');
      }
   }

   localization(arg?: any): any {
      if (arg !== undefined) {
          this.host.jqxPivotGrid('localization', arg);
      } else {
          return this.host.jqxPivotGrid('localization');
      }
   }

   scrollBarsEnabled(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxPivotGrid('scrollBarsEnabled', arg);
      } else {
          return this.host.jqxPivotGrid('scrollBarsEnabled');
      }
   }

   selectionEnabled(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxPivotGrid('selectionEnabled', arg);
      } else {
          return this.host.jqxPivotGrid('selectionEnabled');
      }
   }

   multipleSelectionEnabled(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxPivotGrid('multipleSelectionEnabled', arg);
      } else {
          return this.host.jqxPivotGrid('multipleSelectionEnabled');
      }
   }

   treeStyleRows(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxPivotGrid('treeStyleRows', arg);
      } else {
          return this.host.jqxPivotGrid('treeStyleRows');
      }
   }

   autoResize(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxPivotGrid('autoResize', arg);
      } else {
          return this.host.jqxPivotGrid('autoResize');
      }
   }

   itemsRenderer(arg?: (pivotItem: jqwidgets.PivotGridItemsRenderer['pivotItem']) => string): (pivotItem: jqwidgets.PivotGridItemsRenderer['pivotItem']) => string {
      if (arg !== undefined) {
          this.host.jqxPivotGrid('itemsRenderer', arg);
      } else {
          return this.host.jqxPivotGrid('itemsRenderer');
      }
   }

   cellsRenderer(arg?: (pivotCell: jqwidgets.PivotGridCellsRenderer['pivotCell']) => string): (pivotCell: jqwidgets.PivotGridCellsRenderer['pivotCell']) => string {
      if (arg !== undefined) {
          this.host.jqxPivotGrid('cellsRenderer', arg);
      } else {
          return this.host.jqxPivotGrid('cellsRenderer');
      }
   }


   // jqxPivotGridComponent functions
   getInstance(): any {
      return this.host.jqxPivotGrid('getInstance');
   }

   refresh(): void {
      this.host.jqxPivotGrid('refresh');
   }

   getPivotRows(): jqwidgets.PivotGridRows {
      return this.host.jqxPivotGrid('getPivotRows');
   }

   getPivotColumns(): jqwidgets.PivotGridColumns {
      return this.host.jqxPivotGrid('getPivotColumns');
   }

   getPivotCells(): jqwidgets.PivotGridCells {
      return this.host.jqxPivotGrid('getPivotCells');
   }


   // jqxPivotGridComponent events
   @Output() onPivotitemexpanding = new EventEmitter();
   @Output() onPivotitemexpanded = new EventEmitter();
   @Output() onPivotitemcollapsing = new EventEmitter();
   @Output() onPivotitemcollapsed = new EventEmitter();
   @Output() onSortchanging = new EventEmitter();
   @Output() onSortchanged = new EventEmitter();
   @Output() onSortremoving = new EventEmitter();
   @Output() onSortremoved = new EventEmitter();
   @Output() onPivotitemselectionchanged = new EventEmitter();
   @Output() onPivotcellmousedown = new EventEmitter();
   @Output() onPivotcellmouseup = new EventEmitter();
   @Output() onPivotcellclick = new EventEmitter();
   @Output() onPivotcelldblclick = new EventEmitter();
   @Output() onPivotitemmousedown = new EventEmitter();
   @Output() onPivotitemmouseup = new EventEmitter();
   @Output() onPivotitemclick = new EventEmitter();
   @Output() onPivotitemdblclick = new EventEmitter();

   __wireEvents__(): void {
      this.host.on('pivotitemexpanding', (eventData: any) => { this.onPivotitemexpanding.emit(eventData); });
      this.host.on('pivotitemexpanded', (eventData: any) => { this.onPivotitemexpanded.emit(eventData); });
      this.host.on('pivotitemcollapsing', (eventData: any) => { this.onPivotitemcollapsing.emit(eventData); });
      this.host.on('pivotitemcollapsed', (eventData: any) => { this.onPivotitemcollapsed.emit(eventData); });
      this.host.on('sortchanging', (eventData: any) => { this.onSortchanging.emit(eventData); });
      this.host.on('sortchanged', (eventData: any) => { this.onSortchanged.emit(eventData); });
      this.host.on('sortremoving', (eventData: any) => { this.onSortremoving.emit(eventData); });
      this.host.on('sortremoved', (eventData: any) => { this.onSortremoved.emit(eventData); });
      this.host.on('pivotitemselectionchanged', (eventData: any) => { this.onPivotitemselectionchanged.emit(eventData); });
      this.host.on('pivotcellmousedown', (eventData: any) => { this.onPivotcellmousedown.emit(eventData); });
      this.host.on('pivotcellmouseup', (eventData: any) => { this.onPivotcellmouseup.emit(eventData); });
      this.host.on('pivotcellclick', (eventData: any) => { this.onPivotcellclick.emit(eventData); });
      this.host.on('pivotcelldblclick', (eventData: any) => { this.onPivotcelldblclick.emit(eventData); });
      this.host.on('pivotitemmousedown', (eventData: any) => { this.onPivotitemmousedown.emit(eventData); });
      this.host.on('pivotitemmouseup', (eventData: any) => { this.onPivotitemmouseup.emit(eventData); });
      this.host.on('pivotitemclick', (eventData: any) => { this.onPivotitemclick.emit(eventData); });
      this.host.on('pivotitemdblclick', (eventData: any) => { this.onPivotitemdblclick.emit(eventData); });
   }

} //jqxPivotGridComponent


