/*
jQWidgets v18.0.0 (2023-Nov)
Copyright (c) 2011-2023 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

/// <reference path="jqwidgets.d.ts" />

import '../jqwidgets/jqxcore.js';
import '../jqwidgets/jqxgantt.api.js';
import '../jqwidgets/jqxgantt.js';

import { Component, Input, Output, AfterViewInit, AfterViewChecked, EventEmitter, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
declare let JQXLite: any;

@Component({
    selector: 'jqxGantt',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxGanttComponent implements OnChanges
{
   @Input('adjustToNonworkingTime') attrAdjustToNonworkingTime: boolean;
   @Input('autoSchedule') attrAutoSchedule: boolean;
   @Input('autoScheduleStrictMode') attrAutoScheduleStrictMode: boolean;
   @Input('autoScrollStep') attrAutoScrollStep: number;
   @Input('columnMenu') attrColumnMenu: boolean;
   @Input('columnMinWidth') attrColumnMinWidth: string | number;
   @Input('columnResize') attrColumnResize: boolean;
   @Input('columnResizeFeedback') attrColumnResizeFeedback: boolean;
   @Input('currentTime') attrCurrentTime: string | Date;
   @Input('currentTimeIndicator') attrCurrentTimeIndicator: boolean;
   @Input('currentTimeIndicatorInterval') attrCurrentTimeIndicatorInterval: number;
   @Input('dataExportFileName') attrDataExportFileName: string;
   @Input('source') attrSource: any;
   @Input('dayFormat') attrDayFormat: string;
   @Input('dateEnd') attrDateEnd: string | Date;
   @Input('dateStart') attrDateStart: string | Date;
   @Input('dateMarkers') attrDateMarkers: {label?: string, date: Date | string, className?: string }[];
   @Input('disabled') attrDisabled: boolean;
   @Input('disableAutoScroll') attrDisableAutoScroll: boolean;
   @Input('disableTaskDrag') attrDisableTaskDrag: boolean;
   @Input('disableTaskProgressChange') attrDisableTaskProgressChange: boolean;
   @Input('disableTaskResize') attrDisableTaskResize: boolean;
   @Input('disableSelection') attrDisableSelection: boolean;
   @Input('disableSegmentDrag') attrDisableSegmentDrag: boolean;
   @Input('disableSegmentResize') attrDisableSegmentResize: boolean;
   @Input('disableWindowEditor') attrDisableWindowEditor: boolean;
   @Input('durationUnit') attrDurationUnit: string;
   @Input('filterRow') attrFilterRow: boolean;
   @Input('firstDayOfWeek') attrFirstDayOfWeek: number;
   @Input('groupByResources') attrGroupByResources: boolean;
   @Input('headerTemplate') attrHeaderTemplate: any;
   @Input('hideDateMarkers') attrHideDateMarkers: boolean;
   @Input('hideTimelineHeader') attrHideTimelineHeader: boolean;
   @Input('hideTimelineHeaderDetails') attrHideTimelineHeaderDetails: boolean;
   @Input('hideTimelineSecondHeaderDetails') attrHideTimelineSecondHeaderDetails: boolean;
   @Input('hideResourcePanel') attrHideResourcePanel: boolean;
   @Input('horizontalScrollBarVisibility') attrHorizontalScrollBarVisibility: string;
   @Input('hourFormat') attrHourFormat: string;
   @Input('infiniteTimeline') attrInfiniteTimeline: boolean;
   @Input('infiniteTimelineStep') attrInfiniteTimelineStep: number;
   @Input('inverted') attrInverted: boolean;
   @Input('keyboardNavigation') attrKeyboardNavigation: boolean;
   @Input('max') attrMax: string | Date;
   @Input('min') attrMin: string | Date;
   @Input('monthFormat') attrMonthFormat: string;
   @Input('monthScale') attrMonthScale: string;
   @Input('nonworkingDays') attrNonworkingDays: number[];
   @Input('nonworkingHours') attrNonworkingHours: number[] | number[][];
   @Input('onTaskRender') attrOnTaskRender: any;
   @Input('popupWindowCustomizationFunction') attrPopupWindowCustomizationFunction: any;
   @Input('popupWindowTabs') attrPopupWindowTabs: string[];
   @Input('progressLabelFormatFunction') attrProgressLabelFormatFunction: any;
   @Input('quarterFormat') attrQuarterFormat: string;
   @Input('resources') attrResources: {label: string, capacity: number, value: string, workload: number, progress: number, id: string,  class: string }[];
   @Input('resourceColumns') attrResourceColumns: {label: string, value: string}[];
   @Input('resourceFiltering') attrResourceFiltering: boolean;
   @Input('resourceGroupFormatFunction') attrResourceGroupFormatFunction: any;
   @Input('resourcePanelHeaderTemplate') attrResourcePanelHeaderTemplate: any;
   @Input('resourcePanelMin') attrResourcePanelMin: number | string;
   @Input('resourcePanelSize') attrResourcePanelSize: number | string;
   @Input('resourcePanelRefreshRate') attrResourcePanelRefreshRate: number;
   @Input('resourceTimelineFormatFunction') attrResourceTimelineFormatFunction: any;
   @Input('resourceTimelineMode') attrResourceTimelineMode: string;
   @Input('resourceTimelineView') attrResourceTimelineView: string;
   @Input('rightToLeft') attrRightToLeft: boolean;
   @Input('selectedTaskIds') attrSelectedTaskIds: number[] | string[];
   @Input('selectedResourceIds') attrSelectedResourceIds: number[] | string[];
   @Input('shadeUntilCurrentTime') attrShadeUntilCurrentTime: boolean;
   @Input('showSelectionColumn') attrShowSelectionColumn: boolean;
   @Input('showBaseline') attrShowBaseline: boolean;
   @Input('showProgressLabel') attrShowProgressLabel: boolean;
   @Input('snapToNearest') attrSnapToNearest: boolean;
   @Input('sortFunction') attrSortFunction: { (dataSource: any, sortColumns: string[], directions: string[], defaultCompareFunctions: { (firstRecord: any, secondRecord: any): number }[]): void };
   @Input('sortMode') attrSortMode: string;
   @Input('tasks') attrTasks: {label: string, dateStart: string | Date, dateEnd: string | Date, expanded?: boolean, progress?: number, type?: string}[];
   @Input('taskColumns') attrTaskColumns: {label: string, value: string}[];
   @Input('taskFiltering') attrTaskFiltering: boolean;
   @Input('taskPanelMin') attrTaskPanelMin: string | number;
   @Input('taskPanelSize') attrTaskPanelSize: string | number;
   @Input('timelineMin') attrTimelineMin: string | number;
   @Input('treeMin') attrTreeMin: string | number;
   @Input('treeSize') attrTreeSize: string | number;
   @Input('timelineHeaderFormatFunction') attrTimelineHeaderFormatFunction: any;
   @Input('tooltip') attrTooltip: object;
   @Input('verticalScrollBarVisibility') attrVerticalScrollBarVisibility: string;
   @Input('view') attrView: string;
   @Input('yearFormat') attrYearFormat: string;
   @Input('weekFormat') attrWeekFormat: string;
   @Input('theme') attrTheme: string;
   @Input('width') attrWidth: string | number;
   @Input('height') attrHeight: string | number;

   @Input('auto-create') autoCreate: boolean = true;

   properties: string[] = ['adjustToNonworkingTime','autoSchedule','autoScheduleStrictMode','autoScrollStep','columnMenu','columnMinWidth','columnResize','columnResizeFeedback','currentTime','currentTimeIndicator','currentTimeIndicatorInterval','dataExportFileName','source','dayFormat','dateEnd','dateStart','dateMarkers','disabled','disableAutoScroll','disableTaskDrag','disableTaskProgressChange','disableTaskResize','disableSelection','disableSegmentDrag','disableSegmentResize','disableWindowEditor','durationUnit','filterRow','firstDayOfWeek','groupByResources','headerTemplate','hideDateMarkers','hideTimelineHeader','hideTimelineHeaderDetails','hideTimelineSecondHeaderDetails','hideResourcePanel','horizontalScrollBarVisibility','hourFormat','infiniteTimeline','infiniteTimelineStep','inverted','keyboardNavigation','max','min','monthFormat','monthScale','nonworkingDays','nonworkingHours','onTaskRender','popupWindowCustomizationFunction','popupWindowTabs','progressLabelFormatFunction','quarterFormat','resources','resourceColumns','resourceFiltering','resourceGroupFormatFunction','resourcePanelHeaderTemplate','resourcePanelMin','resourcePanelSize','resourcePanelRefreshRate','resourceTimelineFormatFunction','resourceTimelineMode','resourceTimelineView','rightToLeft','selectedTaskIds','selectedResourceIds','shadeUntilCurrentTime','showSelectionColumn','showBaseline','showProgressLabel','snapToNearest','sortFunction','sortMode','tasks','taskColumns','taskFiltering','taskPanelMin','taskPanelSize','timelineMin','treeMin','treeSize','timelineHeaderFormatFunction','tooltip','verticalScrollBarVisibility','view','yearFormat','weekFormat','theme'];
   host: any;
   elementRef: ElementRef;
   widgetObject:  jqwidgets.jqxGantt;

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

    ngAfterViewInit() {
       window['JQX'].Render(); 

   }; 

   ngOnChanges(changes: SimpleChanges) {
      if (this.host) {
         for (let i = 0; i < this.properties.length; i++) {
            let attrName = 'attr' + this.properties[i].substring(0, 1).toUpperCase() + this.properties[i].substring(1);
            let areEqual: boolean = false;

            if (this[attrName] !== undefined) {
               if (typeof this[attrName] === 'object') {
                  if (this[attrName] instanceof Array) {
                     areEqual = this.arraysEqual(this[attrName], this.host.jqxGantt(this.properties[i]));
                  }
                  if (areEqual) {
                     return false;
                  }

                  this.host.jqxGantt(this.properties[i], this[attrName]);
                  continue;
               }

               if (this[attrName] !== this.host.jqxGantt(this.properties[i])) {
                  this.host.jqxGantt(this.properties[i], this[attrName]); 
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
      this.widgetObject = jqwidgets.createInstance(this.host, 'jqxGantt', options);

      this.__updateRect__();
   }

   createWidget(options?: any): void {
        this.createComponent(options);
   }

   __updateRect__() : void {
      if(this.host) this.host.css({ width: this.attrWidth, height: this.attrHeight });
   }

   setOptions(options: any) : void {
      this.host.jqxGantt('setOptions', options);
   }

   // jqxGanttComponent properties
   adjustToNonworkingTime(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxGantt('adjustToNonworkingTime', arg);
      } else {
          return this.host.jqxGantt('adjustToNonworkingTime');
      }
   }

   autoSchedule(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxGantt('autoSchedule', arg);
      } else {
          return this.host.jqxGantt('autoSchedule');
      }
   }

   autoScheduleStrictMode(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxGantt('autoScheduleStrictMode', arg);
      } else {
          return this.host.jqxGantt('autoScheduleStrictMode');
      }
   }

   autoScrollStep(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxGantt('autoScrollStep', arg);
      } else {
          return this.host.jqxGantt('autoScrollStep');
      }
   }

   columnMenu(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxGantt('columnMenu', arg);
      } else {
          return this.host.jqxGantt('columnMenu');
      }
   }

   columnMinWidth(arg?: undefined): undefined {
      if (arg !== undefined) {
          this.host.jqxGantt('columnMinWidth', arg);
      } else {
          return this.host.jqxGantt('columnMinWidth');
      }
   }

   columnResize(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxGantt('columnResize', arg);
      } else {
          return this.host.jqxGantt('columnResize');
      }
   }

   columnResizeFeedback(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxGantt('columnResizeFeedback', arg);
      } else {
          return this.host.jqxGantt('columnResizeFeedback');
      }
   }

   currentTime(arg?: undefined): undefined {
      if (arg !== undefined) {
          this.host.jqxGantt('currentTime', arg);
      } else {
          return this.host.jqxGantt('currentTime');
      }
   }

   currentTimeIndicator(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxGantt('currentTimeIndicator', arg);
      } else {
          return this.host.jqxGantt('currentTimeIndicator');
      }
   }

   currentTimeIndicatorInterval(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxGantt('currentTimeIndicatorInterval', arg);
      } else {
          return this.host.jqxGantt('currentTimeIndicatorInterval');
      }
   }

   dataExportFileName(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxGantt('dataExportFileName', arg);
      } else {
          return this.host.jqxGantt('dataExportFileName');
      }
   }

   source(arg?: undefined): undefined {
      if (arg !== undefined) {
          this.host.jqxGantt('source', arg);
      } else {
          return this.host.jqxGantt('source');
      }
   }

   dayFormat(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxGantt('dayFormat', arg);
      } else {
          return this.host.jqxGantt('dayFormat');
      }
   }

   dateEnd(arg?: undefined): undefined {
      if (arg !== undefined) {
          this.host.jqxGantt('dateEnd', arg);
      } else {
          return this.host.jqxGantt('dateEnd');
      }
   }

   dateStart(arg?: undefined): undefined {
      if (arg !== undefined) {
          this.host.jqxGantt('dateStart', arg);
      } else {
          return this.host.jqxGantt('dateStart');
      }
   }

   dateMarkers(arg?: undefined): undefined {
      if (arg !== undefined) {
          this.host.jqxGantt('dateMarkers', arg);
      } else {
          return this.host.jqxGantt('dateMarkers');
      }
   }

   disabled(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxGantt('disabled', arg);
      } else {
          return this.host.jqxGantt('disabled');
      }
   }

   disableAutoScroll(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxGantt('disableAutoScroll', arg);
      } else {
          return this.host.jqxGantt('disableAutoScroll');
      }
   }

   disableTaskDrag(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxGantt('disableTaskDrag', arg);
      } else {
          return this.host.jqxGantt('disableTaskDrag');
      }
   }

   disableTaskProgressChange(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxGantt('disableTaskProgressChange', arg);
      } else {
          return this.host.jqxGantt('disableTaskProgressChange');
      }
   }

   disableTaskResize(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxGantt('disableTaskResize', arg);
      } else {
          return this.host.jqxGantt('disableTaskResize');
      }
   }

   disableSelection(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxGantt('disableSelection', arg);
      } else {
          return this.host.jqxGantt('disableSelection');
      }
   }

   disableSegmentDrag(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxGantt('disableSegmentDrag', arg);
      } else {
          return this.host.jqxGantt('disableSegmentDrag');
      }
   }

   disableSegmentResize(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxGantt('disableSegmentResize', arg);
      } else {
          return this.host.jqxGantt('disableSegmentResize');
      }
   }

   disableWindowEditor(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxGantt('disableWindowEditor', arg);
      } else {
          return this.host.jqxGantt('disableWindowEditor');
      }
   }

   durationUnit(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxGantt('durationUnit', arg);
      } else {
          return this.host.jqxGantt('durationUnit');
      }
   }

   filterRow(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxGantt('filterRow', arg);
      } else {
          return this.host.jqxGantt('filterRow');
      }
   }

   firstDayOfWeek(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxGantt('firstDayOfWeek', arg);
      } else {
          return this.host.jqxGantt('firstDayOfWeek');
      }
   }

   groupByResources(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxGantt('groupByResources', arg);
      } else {
          return this.host.jqxGantt('groupByResources');
      }
   }

   headerTemplate(arg?: undefined): undefined {
      if (arg !== undefined) {
          this.host.jqxGantt('headerTemplate', arg);
      } else {
          return this.host.jqxGantt('headerTemplate');
      }
   }

   hideDateMarkers(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxGantt('hideDateMarkers', arg);
      } else {
          return this.host.jqxGantt('hideDateMarkers');
      }
   }

   hideTimelineHeader(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxGantt('hideTimelineHeader', arg);
      } else {
          return this.host.jqxGantt('hideTimelineHeader');
      }
   }

   hideTimelineHeaderDetails(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxGantt('hideTimelineHeaderDetails', arg);
      } else {
          return this.host.jqxGantt('hideTimelineHeaderDetails');
      }
   }

   hideTimelineSecondHeaderDetails(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxGantt('hideTimelineSecondHeaderDetails', arg);
      } else {
          return this.host.jqxGantt('hideTimelineSecondHeaderDetails');
      }
   }

   hideResourcePanel(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxGantt('hideResourcePanel', arg);
      } else {
          return this.host.jqxGantt('hideResourcePanel');
      }
   }

   horizontalScrollBarVisibility(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxGantt('horizontalScrollBarVisibility', arg);
      } else {
          return this.host.jqxGantt('horizontalScrollBarVisibility');
      }
   }

   hourFormat(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxGantt('hourFormat', arg);
      } else {
          return this.host.jqxGantt('hourFormat');
      }
   }

   infiniteTimeline(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxGantt('infiniteTimeline', arg);
      } else {
          return this.host.jqxGantt('infiniteTimeline');
      }
   }

   infiniteTimelineStep(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxGantt('infiniteTimelineStep', arg);
      } else {
          return this.host.jqxGantt('infiniteTimelineStep');
      }
   }

   inverted(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxGantt('inverted', arg);
      } else {
          return this.host.jqxGantt('inverted');
      }
   }

   keyboardNavigation(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxGantt('keyboardNavigation', arg);
      } else {
          return this.host.jqxGantt('keyboardNavigation');
      }
   }

   max(arg?: undefined): undefined {
      if (arg !== undefined) {
          this.host.jqxGantt('max', arg);
      } else {
          return this.host.jqxGantt('max');
      }
   }

   min(arg?: undefined): undefined {
      if (arg !== undefined) {
          this.host.jqxGantt('min', arg);
      } else {
          return this.host.jqxGantt('min');
      }
   }

   monthFormat(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxGantt('monthFormat', arg);
      } else {
          return this.host.jqxGantt('monthFormat');
      }
   }

   monthScale(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxGantt('monthScale', arg);
      } else {
          return this.host.jqxGantt('monthScale');
      }
   }

   nonworkingDays(arg?: undefined): undefined {
      if (arg !== undefined) {
          this.host.jqxGantt('nonworkingDays', arg);
      } else {
          return this.host.jqxGantt('nonworkingDays');
      }
   }

   nonworkingHours(arg?: undefined): undefined {
      if (arg !== undefined) {
          this.host.jqxGantt('nonworkingHours', arg);
      } else {
          return this.host.jqxGantt('nonworkingHours');
      }
   }

   onTaskRender(arg?: undefined): undefined {
      if (arg !== undefined) {
          this.host.jqxGantt('onTaskRender', arg);
      } else {
          return this.host.jqxGantt('onTaskRender');
      }
   }

   popupWindowCustomizationFunction(arg?: undefined): undefined {
      if (arg !== undefined) {
          this.host.jqxGantt('popupWindowCustomizationFunction', arg);
      } else {
          return this.host.jqxGantt('popupWindowCustomizationFunction');
      }
   }

   popupWindowTabs(arg?: undefined): undefined {
      if (arg !== undefined) {
          this.host.jqxGantt('popupWindowTabs', arg);
      } else {
          return this.host.jqxGantt('popupWindowTabs');
      }
   }

   progressLabelFormatFunction(arg?: undefined): undefined {
      if (arg !== undefined) {
          this.host.jqxGantt('progressLabelFormatFunction', arg);
      } else {
          return this.host.jqxGantt('progressLabelFormatFunction');
      }
   }

   quarterFormat(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxGantt('quarterFormat', arg);
      } else {
          return this.host.jqxGantt('quarterFormat');
      }
   }

   resources(arg?: undefined): undefined {
      if (arg !== undefined) {
          this.host.jqxGantt('resources', arg);
      } else {
          return this.host.jqxGantt('resources');
      }
   }

   resourceColumns(arg?: undefined): undefined {
      if (arg !== undefined) {
          this.host.jqxGantt('resourceColumns', arg);
      } else {
          return this.host.jqxGantt('resourceColumns');
      }
   }

   resourceFiltering(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxGantt('resourceFiltering', arg);
      } else {
          return this.host.jqxGantt('resourceFiltering');
      }
   }

   resourceGroupFormatFunction(arg?: undefined): undefined {
      if (arg !== undefined) {
          this.host.jqxGantt('resourceGroupFormatFunction', arg);
      } else {
          return this.host.jqxGantt('resourceGroupFormatFunction');
      }
   }

   resourcePanelHeaderTemplate(arg?: undefined): undefined {
      if (arg !== undefined) {
          this.host.jqxGantt('resourcePanelHeaderTemplate', arg);
      } else {
          return this.host.jqxGantt('resourcePanelHeaderTemplate');
      }
   }

   resourcePanelMin(arg?: undefined): undefined {
      if (arg !== undefined) {
          this.host.jqxGantt('resourcePanelMin', arg);
      } else {
          return this.host.jqxGantt('resourcePanelMin');
      }
   }

   resourcePanelSize(arg?: undefined): undefined {
      if (arg !== undefined) {
          this.host.jqxGantt('resourcePanelSize', arg);
      } else {
          return this.host.jqxGantt('resourcePanelSize');
      }
   }

   resourcePanelRefreshRate(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxGantt('resourcePanelRefreshRate', arg);
      } else {
          return this.host.jqxGantt('resourcePanelRefreshRate');
      }
   }

   resourceTimelineFormatFunction(arg?: undefined): undefined {
      if (arg !== undefined) {
          this.host.jqxGantt('resourceTimelineFormatFunction', arg);
      } else {
          return this.host.jqxGantt('resourceTimelineFormatFunction');
      }
   }

   resourceTimelineMode(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxGantt('resourceTimelineMode', arg);
      } else {
          return this.host.jqxGantt('resourceTimelineMode');
      }
   }

   resourceTimelineView(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxGantt('resourceTimelineView', arg);
      } else {
          return this.host.jqxGantt('resourceTimelineView');
      }
   }

   rightToLeft(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxGantt('rightToLeft', arg);
      } else {
          return this.host.jqxGantt('rightToLeft');
      }
   }

   selectedTaskIds(arg?: undefined): undefined {
      if (arg !== undefined) {
          this.host.jqxGantt('selectedTaskIds', arg);
      } else {
          return this.host.jqxGantt('selectedTaskIds');
      }
   }

   selectedResourceIds(arg?: undefined): undefined {
      if (arg !== undefined) {
          this.host.jqxGantt('selectedResourceIds', arg);
      } else {
          return this.host.jqxGantt('selectedResourceIds');
      }
   }

   shadeUntilCurrentTime(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxGantt('shadeUntilCurrentTime', arg);
      } else {
          return this.host.jqxGantt('shadeUntilCurrentTime');
      }
   }

   showSelectionColumn(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxGantt('showSelectionColumn', arg);
      } else {
          return this.host.jqxGantt('showSelectionColumn');
      }
   }

   showBaseline(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxGantt('showBaseline', arg);
      } else {
          return this.host.jqxGantt('showBaseline');
      }
   }

   showProgressLabel(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxGantt('showProgressLabel', arg);
      } else {
          return this.host.jqxGantt('showProgressLabel');
      }
   }

   snapToNearest(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxGantt('snapToNearest', arg);
      } else {
          return this.host.jqxGantt('snapToNearest');
      }
   }

   sortFunction(arg?: undefined): undefined {
      if (arg !== undefined) {
          this.host.jqxGantt('sortFunction', arg);
      } else {
          return this.host.jqxGantt('sortFunction');
      }
   }

   sortMode(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxGantt('sortMode', arg);
      } else {
          return this.host.jqxGantt('sortMode');
      }
   }

   tasks(arg?: undefined): undefined {
      if (arg !== undefined) {
          this.host.jqxGantt('tasks', arg);
      } else {
          return this.host.jqxGantt('tasks');
      }
   }

   taskColumns(arg?: undefined): undefined {
      if (arg !== undefined) {
          this.host.jqxGantt('taskColumns', arg);
      } else {
          return this.host.jqxGantt('taskColumns');
      }
   }

   taskFiltering(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxGantt('taskFiltering', arg);
      } else {
          return this.host.jqxGantt('taskFiltering');
      }
   }

   taskPanelMin(arg?: undefined): undefined {
      if (arg !== undefined) {
          this.host.jqxGantt('taskPanelMin', arg);
      } else {
          return this.host.jqxGantt('taskPanelMin');
      }
   }

   taskPanelSize(arg?: undefined): undefined {
      if (arg !== undefined) {
          this.host.jqxGantt('taskPanelSize', arg);
      } else {
          return this.host.jqxGantt('taskPanelSize');
      }
   }

   timelineMin(arg?: undefined): undefined {
      if (arg !== undefined) {
          this.host.jqxGantt('timelineMin', arg);
      } else {
          return this.host.jqxGantt('timelineMin');
      }
   }

   treeMin(arg?: undefined): undefined {
      if (arg !== undefined) {
          this.host.jqxGantt('treeMin', arg);
      } else {
          return this.host.jqxGantt('treeMin');
      }
   }

   treeSize(arg?: undefined): undefined {
      if (arg !== undefined) {
          this.host.jqxGantt('treeSize', arg);
      } else {
          return this.host.jqxGantt('treeSize');
      }
   }

   timelineHeaderFormatFunction(arg?: undefined): undefined {
      if (arg !== undefined) {
          this.host.jqxGantt('timelineHeaderFormatFunction', arg);
      } else {
          return this.host.jqxGantt('timelineHeaderFormatFunction');
      }
   }

   tooltip(arg?: any): any {
      if (arg !== undefined) {
          this.host.jqxGantt('tooltip', arg);
      } else {
          return this.host.jqxGantt('tooltip');
      }
   }

   verticalScrollBarVisibility(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxGantt('verticalScrollBarVisibility', arg);
      } else {
          return this.host.jqxGantt('verticalScrollBarVisibility');
      }
   }

   view(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxGantt('view', arg);
      } else {
          return this.host.jqxGantt('view');
      }
   }

   yearFormat(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxGantt('yearFormat', arg);
      } else {
          return this.host.jqxGantt('yearFormat');
      }
   }

   weekFormat(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxGantt('weekFormat', arg);
      } else {
          return this.host.jqxGantt('weekFormat');
      }
   }

   theme(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxGantt('theme', arg);
      } else {
          return this.host.jqxGantt('theme');
      }
   }


   // jqxGanttComponent functions
   addFilter(columns: undefined, filterGroup: any): undefined {
      return this.host.jqxGantt('addFilter', columns, filterGroup);
   }

   clearFilters(): undefined {
      return this.host.jqxGantt('clearFilters');
   }

   clearSort(): undefined {
      return this.host.jqxGantt('clearSort');
   }

   clearSelection(): undefined {
      return this.host.jqxGantt('clearSelection');
   }

   clearState(): undefined {
      return this.host.jqxGantt('clearState');
   }

   clearTasks(): undefined {
      return this.host.jqxGantt('clearTasks');
   }

   clearResources(): undefined {
      return this.host.jqxGantt('clearResources');
   }

   createConnection(startTaskIndex: undefined, taskEndIndex?: undefined, connectionType?: number, lag?: number): undefined {
      return this.host.jqxGantt('createConnection', startTaskIndex, taskEndIndex, connectionType, lag);
   }

   collapse(id: undefined): undefined {
      return this.host.jqxGantt('collapse', id);
   }

   beginUpdate(): undefined {
      return this.host.jqxGantt('beginUpdate');
   }

   endUpdate(): undefined {
      return this.host.jqxGantt('endUpdate');
   }

   ensureVisible(taskId: undefined): undefined {
      return this.host.jqxGantt('ensureVisible', taskId);
   }

   expand(id: undefined): undefined {
      return this.host.jqxGantt('expand', id);
   }

   exportData(dataFormat: string, callback?: undefined): undefined {
      return this.host.jqxGantt('exportData', dataFormat, callback);
   }

   getConnections(): undefined {
      return this.host.jqxGantt('getConnections');
   }

   getConnectionDetails(connectionId: string): undefined {
      return this.host.jqxGantt('getConnectionDetails', connectionId);
   }

   getState(): undefined {
      return this.host.jqxGantt('getState');
   }

   getItemPath(item: any): string {
      return this.host.jqxGantt('getItemPath', item);
   }

   getTask(itemId: undefined): any {
      return this.host.jqxGantt('getTask', itemId);
   }

   getTasks(): undefined {
      return this.host.jqxGantt('getTasks');
   }

   getTaskIndex(task: any): number {
      return this.host.jqxGantt('getTaskIndex', task);
   }

   getTaskConnections(taskId: undefined): undefined {
      return this.host.jqxGantt('getTaskConnections', taskId);
   }

   getTaskProject(task: any): undefined {
      return this.host.jqxGantt('getTaskProject', task);
   }

   getResource(itemId: undefined): any {
      return this.host.jqxGantt('getResource', itemId);
   }

   getResources(): undefined {
      return this.host.jqxGantt('getResources');
   }

   getResourceIndex(resource: any): number {
      return this.host.jqxGantt('getResourceIndex', resource);
   }

   getResourceTasks(resource: undefined): undefined {
      return this.host.jqxGantt('getResourceTasks', resource);
   }

   getSelectedIds(): undefined {
      return this.host.jqxGantt('getSelectedIds');
   }

   getSelectedTasks(): undefined {
      return this.host.jqxGantt('getSelectedTasks');
   }

   getSelectedResources(): undefined {
      return this.host.jqxGantt('getSelectedResources');
   }

   getWorkingHours(): undefined {
      return this.host.jqxGantt('getWorkingHours');
   }

   hideTooltip(): undefined {
      return this.host.jqxGantt('hideTooltip');
   }

   isWorkingDay(date: undefined): undefined {
      return this.host.jqxGantt('isWorkingDay', date);
   }

   loadState(state?: undefined): undefined {
      return this.host.jqxGantt('loadState', state);
   }

   removeAllConnections(): undefined {
      return this.host.jqxGantt('removeAllConnections');
   }

   removeConnection(startTaskIndex: undefined, taskEndIndex?: number, connectionType?: number): any {
      return this.host.jqxGantt('removeConnection', startTaskIndex, taskEndIndex, connectionType);
   }

   removeTaskConnection(taskStart: undefined, taskEnd?: undefined): undefined {
      return this.host.jqxGantt('removeTaskConnection', taskStart, taskEnd);
   }

   showTooltip(target: undefined, content?: string): undefined {
      return this.host.jqxGantt('showTooltip', target, content);
   }

   saveState(state?: undefined): undefined {
      return this.host.jqxGantt('saveState', state);
   }

   insertTask(taskObject: any, project?: undefined, index?: number): undefined {
      return this.host.jqxGantt('insertTask', taskObject, project, index);
   }

   updateTask(taskId: undefined, taskObject: any): undefined {
      return this.host.jqxGantt('updateTask', taskId, taskObject);
   }

   removeTask(taskId: undefined): undefined {
      return this.host.jqxGantt('removeTask', taskId);
   }

   insertResource(resourceId: undefined, resourceObject?: any): undefined {
      return this.host.jqxGantt('insertResource', resourceId, resourceObject);
   }

   updateResource(resourceId: undefined, taskObject: any): undefined {
      return this.host.jqxGantt('updateResource', resourceId, taskObject);
   }

   removeResource(resourceId: undefined): undefined {
      return this.host.jqxGantt('removeResource', resourceId);
   }

   openWindow(taskId: undefined): undefined {
      return this.host.jqxGantt('openWindow', taskId);
   }

   closeWindow(): undefined {
      return this.host.jqxGantt('closeWindow');
   }

   print(): undefined {
      return this.host.jqxGantt('print');
   }

   setWorkTime(settings: undefined): undefined {
      return this.host.jqxGantt('setWorkTime', settings);
   }

   selectTask(id: undefined): undefined {
      return this.host.jqxGantt('selectTask', id);
   }

   selectResource(id: undefined): undefined {
      return this.host.jqxGantt('selectResource', id);
   }

   unselectTask(id: undefined): undefined {
      return this.host.jqxGantt('unselectTask', id);
   }

   unselectResource(id: undefined): undefined {
      return this.host.jqxGantt('unselectResource', id);
   }

   unsetWorkTime(settings: undefined): undefined {
      return this.host.jqxGantt('unsetWorkTime', settings);
   }

   sort(columns: undefined): undefined {
      return this.host.jqxGantt('sort', columns);
   }


   // jqxGanttComponent events
   @Output() onBeginUpdate = new EventEmitter();
   @Output() onEndUpdate = new EventEmitter();
   @Output() onConnectionStart = new EventEmitter();
   @Output() onConnectionEnd = new EventEmitter();
   @Output() onChange = new EventEmitter();
   @Output() onColumnResize = new EventEmitter();
   @Output() onClosing = new EventEmitter();
   @Output() onClose = new EventEmitter();
   @Output() onCollapse = new EventEmitter();
   @Output() onDragStart = new EventEmitter();
   @Output() onDragEnd = new EventEmitter();
   @Output() onExpand = new EventEmitter();
   @Output() onFilter = new EventEmitter();
   @Output() onItemClick = new EventEmitter();
   @Output() onItemInsert = new EventEmitter();
   @Output() onItemRemove = new EventEmitter();
   @Output() onItemUpdate = new EventEmitter();
   @Output() onOpening = new EventEmitter();
   @Output() onOpen = new EventEmitter();
   @Output() onProgressChangeStart = new EventEmitter();
   @Output() onProgressChangeEnd = new EventEmitter();
   @Output() onResizeStart = new EventEmitter();
   @Output() onResizeEnd = new EventEmitter();
   @Output() onSort = new EventEmitter();
   @Output() onScrollBottomReached = new EventEmitter();
   @Output() onScrollTopReached = new EventEmitter();
   @Output() onScrollLeftReached = new EventEmitter();
   @Output() onScrollRightReached = new EventEmitter();

   __wireEvents__(): void {
      this.host.on('beginUpdate', (eventData: any) => { this.onBeginUpdate.emit(eventData); });
      this.host.on('endUpdate', (eventData: any) => { this.onEndUpdate.emit(eventData); });
      this.host.on('connectionStart', (eventData: any) => { this.onConnectionStart.emit(eventData); });
      this.host.on('connectionEnd', (eventData: any) => { this.onConnectionEnd.emit(eventData); });
      this.host.on('change', (eventData: any) => { this.onChange.emit(eventData); });
      this.host.on('columnResize', (eventData: any) => { this.onColumnResize.emit(eventData); });
      this.host.on('closing', (eventData: any) => { this.onClosing.emit(eventData); });
      this.host.on('close', (eventData: any) => { this.onClose.emit(eventData); });
      this.host.on('collapse', (eventData: any) => { this.onCollapse.emit(eventData); });
      this.host.on('dragStart', (eventData: any) => { this.onDragStart.emit(eventData); });
      this.host.on('dragEnd', (eventData: any) => { this.onDragEnd.emit(eventData); });
      this.host.on('expand', (eventData: any) => { this.onExpand.emit(eventData); });
      this.host.on('filter', (eventData: any) => { this.onFilter.emit(eventData); });
      this.host.on('itemClick', (eventData: any) => { this.onItemClick.emit(eventData); });
      this.host.on('itemInsert', (eventData: any) => { this.onItemInsert.emit(eventData); });
      this.host.on('itemRemove', (eventData: any) => { this.onItemRemove.emit(eventData); });
      this.host.on('itemUpdate', (eventData: any) => { this.onItemUpdate.emit(eventData); });
      this.host.on('opening', (eventData: any) => { this.onOpening.emit(eventData); });
      this.host.on('open', (eventData: any) => { this.onOpen.emit(eventData); });
      this.host.on('progressChangeStart', (eventData: any) => { this.onProgressChangeStart.emit(eventData); });
      this.host.on('progressChangeEnd', (eventData: any) => { this.onProgressChangeEnd.emit(eventData); });
      this.host.on('resizeStart', (eventData: any) => { this.onResizeStart.emit(eventData); });
      this.host.on('resizeEnd', (eventData: any) => { this.onResizeEnd.emit(eventData); });
      this.host.on('sort', (eventData: any) => { this.onSort.emit(eventData); });
      this.host.on('scrollBottomReached', (eventData: any) => { this.onScrollBottomReached.emit(eventData); });
      this.host.on('scrollTopReached', (eventData: any) => { this.onScrollTopReached.emit(eventData); });
      this.host.on('scrollLeftReached', (eventData: any) => { this.onScrollLeftReached.emit(eventData); });
      this.host.on('scrollRightReached', (eventData: any) => { this.onScrollRightReached.emit(eventData); });
   }

} //jqxGanttComponent


