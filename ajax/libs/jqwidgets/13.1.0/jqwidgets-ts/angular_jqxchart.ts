/*
jQWidgets v13.1.0 (2021-Nov)
Copyright (c) 2011-2021 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

/// <reference path="jqwidgets.d.ts" />

import '../jqwidgets/jqxcore.js';
import '../jqwidgets/jqxdata.js';
import '../jqwidgets/jqxdata.export.js';
import '../jqwidgets/jqxdraw.js';
import '../jqwidgets/jqxchart.core.js';
import '../jqwidgets/jqxchart.api.js';
import '../jqwidgets/jqxchart.annotations.js';
import '../jqwidgets/jqxchart.rangeselector.js';
import '../jqwidgets/jqxchart.waterfall.js';

import { Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
declare let JQXLite: any;

@Component({
    selector: 'jqxChart',
    template: '<div><ng-content></ng-content></div>'
})

export class jqxChartComponent implements OnChanges
{
   @Input('title') attrTitle: string;
   @Input('description') attrDescription: string;
   @Input('source') attrSource: any;
   @Input('showBorderLine') attrShowBorderLine: boolean;
   @Input('borderLineColor') attrBorderLineColor: string;
   @Input('borderLineWidth') attrBorderLineWidth: number;
   @Input('backgroundColor') attrBackgroundColor: string;
   @Input('backgroundImage') attrBackgroundImage: string;
   @Input('showLegend') attrShowLegend: boolean;
   @Input('legendLayout') attrLegendLayout: jqwidgets.ChartLegendLayout;
   @Input('padding') attrPadding: jqwidgets.ChartPadding;
   @Input('titlePadding') attrTitlePadding: jqwidgets.ChartPadding;
   @Input('colorScheme') attrColorScheme: string;
   @Input('greyScale') attrGreyScale: boolean;
   @Input('showToolTips') attrShowToolTips: boolean;
   @Input('toolTipShowDelay') attrToolTipShowDelay: number;
   @Input('toolTipHideDelay') attrToolTipHideDelay: number;
   @Input('toolTipMoveDuration') attrToolTipMoveDuration: number;
   @Input('drawBefore') attrDrawBefore: (renderer?: jqwidgets.ChartDrawBefore['renderer'], rect?: jqwidgets.ChartDrawBefore['rect']) => void;
   @Input('draw') attrDraw: (renderer?: jqwidgets.ChartDraw['renderer'], rect?: jqwidgets.ChartDraw['rect']) => void;
   @Input('rtl') attrRtl: boolean;
   @Input('enableCrosshairs') attrEnableCrosshairs: boolean;
   @Input('crosshairsColor') attrCrosshairsColor: string;
   @Input('crosshairsDashStyle') attrCrosshairsDashStyle: string;
   @Input('crosshairsLineWidth') attrCrosshairsLineWidth: number;
   @Input('columnSeriesOverlap') attrColumnSeriesOverlap: boolean;
   @Input('enabled') attrEnabled: boolean;
   @Input('enableAnimations') attrEnableAnimations: boolean;
   @Input('animationDuration') attrAnimationDuration: number;
   @Input('enableAxisTextAnimation') attrEnableAxisTextAnimation: boolean;
   @Input('renderEngine') attrRenderEngine: string;
   @Input('xAxis') attrXAxis: jqwidgets.ChartXAxis;
   @Input('valueAxis') attrValueAxis: jqwidgets.ChartValueAxis;
   @Input('categoryAxis') attrCategoryAxis: any;
   @Input('seriesGroups') attrSeriesGroups: Array<jqwidgets.ChartSeriesGroup>;
   @Input('width') attrWidth: string | number;
   @Input('height') attrHeight: string | number;

   @Input('auto-create') autoCreate: boolean = true;

   properties: string[] = ['title','description','source','showBorderLine','borderLineColor','borderLineWidth','backgroundColor','backgroundImage','showLegend','legendLayout','padding','titlePadding','colorScheme','greyScale','showToolTips','toolTipShowDelay','toolTipHideDelay','toolTipMoveDuration','drawBefore','draw','rtl','enableCrosshairs','crosshairsColor','crosshairsDashStyle','crosshairsLineWidth','columnSeriesOverlap','enabled','enableAnimations','animationDuration','enableAxisTextAnimation','renderEngine','xAxis','valueAxis','categoryAxis','seriesGroups'];
   host: any;
   elementRef: ElementRef;
   widgetObject:  jqwidgets.jqxChart;

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
         if (changes.hasOwnProperty('attrWidth') || changes.hasOwnProperty('attrHeight')) {
            this.__updateRect__();
         }
         for (let i = 0; i < this.properties.length; i++) {
            let attrName = 'attr' + this.properties[i].substring(0, 1).toUpperCase() + this.properties[i].substring(1);
            let areEqual: boolean = false;

            if (this[attrName] !== undefined) {
               if (typeof this[attrName] === 'object') {
                  if (this[attrName] instanceof Array) {
                     areEqual = this.arraysEqual(this[attrName], this.host.jqxChart(this.properties[i]));
                  }
                  if (areEqual) {
                     return false;
                  }

                  this.host.jqxChart(this.properties[i], this[attrName]);
                  continue;
               }

               if (this[attrName] !== this.host.jqxChart(this.properties[i])) {
                  this.host.jqxChart(this.properties[i], this[attrName]); 
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
      this.widgetObject = jqwidgets.createInstance(this.host, 'jqxChart', options);

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
      this.host.jqxChart('setOptions', options);
   }

   // jqxChartComponent properties
   title(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxChart('title', arg);
      } else {
          return this.host.jqxChart('title');
      }
   }

   description(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxChart('description', arg);
      } else {
          return this.host.jqxChart('description');
      }
   }

   source(arg?: any): any {
      if (arg !== undefined) {
          this.host.jqxChart('source', arg);
      } else {
          return this.host.jqxChart('source');
      }
   }

   showBorderLine(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxChart('showBorderLine', arg);
      } else {
          return this.host.jqxChart('showBorderLine');
      }
   }

   borderLineColor(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxChart('borderLineColor', arg);
      } else {
          return this.host.jqxChart('borderLineColor');
      }
   }

   borderLineWidth(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxChart('borderLineWidth', arg);
      } else {
          return this.host.jqxChart('borderLineWidth');
      }
   }

   backgroundColor(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxChart('backgroundColor', arg);
      } else {
          return this.host.jqxChart('backgroundColor');
      }
   }

   backgroundImage(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxChart('backgroundImage', arg);
      } else {
          return this.host.jqxChart('backgroundImage');
      }
   }

   showLegend(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxChart('showLegend', arg);
      } else {
          return this.host.jqxChart('showLegend');
      }
   }

   legendLayout(arg?: jqwidgets.ChartLegendLayout): jqwidgets.ChartLegendLayout {
      if (arg !== undefined) {
          this.host.jqxChart('legendLayout', arg);
      } else {
          return this.host.jqxChart('legendLayout');
      }
   }

   padding(arg?: jqwidgets.ChartPadding): jqwidgets.ChartPadding {
      if (arg !== undefined) {
          this.host.jqxChart('padding', arg);
      } else {
          return this.host.jqxChart('padding');
      }
   }

   titlePadding(arg?: jqwidgets.ChartPadding): jqwidgets.ChartPadding {
      if (arg !== undefined) {
          this.host.jqxChart('titlePadding', arg);
      } else {
          return this.host.jqxChart('titlePadding');
      }
   }

   colorScheme(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxChart('colorScheme', arg);
      } else {
          return this.host.jqxChart('colorScheme');
      }
   }

   greyScale(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxChart('greyScale', arg);
      } else {
          return this.host.jqxChart('greyScale');
      }
   }

   showToolTips(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxChart('showToolTips', arg);
      } else {
          return this.host.jqxChart('showToolTips');
      }
   }

   toolTipShowDelay(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxChart('toolTipShowDelay', arg);
      } else {
          return this.host.jqxChart('toolTipShowDelay');
      }
   }

   toolTipHideDelay(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxChart('toolTipHideDelay', arg);
      } else {
          return this.host.jqxChart('toolTipHideDelay');
      }
   }

   toolTipMoveDuration(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxChart('toolTipMoveDuration', arg);
      } else {
          return this.host.jqxChart('toolTipMoveDuration');
      }
   }

   drawBefore(arg?: (renderer?: jqwidgets.ChartDrawBefore['renderer'], rect?: jqwidgets.ChartDrawBefore['rect']) => void): (renderer?: jqwidgets.ChartDrawBefore['renderer'], rect?: jqwidgets.ChartDrawBefore['rect']) => void {
      if (arg !== undefined) {
          this.host.jqxChart('drawBefore', arg);
      } else {
          return this.host.jqxChart('drawBefore');
      }
   }

   draw(arg?: (renderer?: jqwidgets.ChartDraw['renderer'], rect?: jqwidgets.ChartDraw['rect']) => void): (renderer?: jqwidgets.ChartDraw['renderer'], rect?: jqwidgets.ChartDraw['rect']) => void {
      if (arg !== undefined) {
          this.host.jqxChart('draw', arg);
      } else {
          return this.host.jqxChart('draw');
      }
   }

   rtl(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxChart('rtl', arg);
      } else {
          return this.host.jqxChart('rtl');
      }
   }

   enableCrosshairs(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxChart('enableCrosshairs', arg);
      } else {
          return this.host.jqxChart('enableCrosshairs');
      }
   }

   crosshairsColor(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxChart('crosshairsColor', arg);
      } else {
          return this.host.jqxChart('crosshairsColor');
      }
   }

   crosshairsDashStyle(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxChart('crosshairsDashStyle', arg);
      } else {
          return this.host.jqxChart('crosshairsDashStyle');
      }
   }

   crosshairsLineWidth(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxChart('crosshairsLineWidth', arg);
      } else {
          return this.host.jqxChart('crosshairsLineWidth');
      }
   }

   columnSeriesOverlap(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxChart('columnSeriesOverlap', arg);
      } else {
          return this.host.jqxChart('columnSeriesOverlap');
      }
   }

   enabled(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxChart('enabled', arg);
      } else {
          return this.host.jqxChart('enabled');
      }
   }

   enableAnimations(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxChart('enableAnimations', arg);
      } else {
          return this.host.jqxChart('enableAnimations');
      }
   }

   animationDuration(arg?: number): number {
      if (arg !== undefined) {
          this.host.jqxChart('animationDuration', arg);
      } else {
          return this.host.jqxChart('animationDuration');
      }
   }

   enableAxisTextAnimation(arg?: boolean): boolean {
      if (arg !== undefined) {
          this.host.jqxChart('enableAxisTextAnimation', arg);
      } else {
          return this.host.jqxChart('enableAxisTextAnimation');
      }
   }

   renderEngine(arg?: string): string {
      if (arg !== undefined) {
          this.host.jqxChart('renderEngine', arg);
      } else {
          return this.host.jqxChart('renderEngine');
      }
   }

   xAxis(arg?: jqwidgets.ChartXAxis): jqwidgets.ChartXAxis {
      if (arg !== undefined) {
          this.host.jqxChart('xAxis', arg);
      } else {
          return this.host.jqxChart('xAxis');
      }
   }

   valueAxis(arg?: jqwidgets.ChartValueAxis): jqwidgets.ChartValueAxis {
      if (arg !== undefined) {
          this.host.jqxChart('valueAxis', arg);
      } else {
          return this.host.jqxChart('valueAxis');
      }
   }

   categoryAxis(arg?: any): any {
      if (arg !== undefined) {
          this.host.jqxChart('categoryAxis', arg);
      } else {
          return this.host.jqxChart('categoryAxis');
      }
   }

   seriesGroups(arg?: Array<jqwidgets.ChartSeriesGroup>): Array<jqwidgets.ChartSeriesGroup> {
      if (arg !== undefined) {
          this.host.jqxChart('seriesGroups', arg);
      } else {
          return this.host.jqxChart('seriesGroups');
      }
   }


   // jqxChartComponent functions
   getInstance(): any {
      return this.host.jqxChart('getInstance');
   }

   refresh(): void {
      this.host.jqxChart('refresh');
   }

   update(): void {
      this.host.jqxChart('update');
   }

   destroy(): void {
      this.host.jqxChart('destroy');
   }

   addColorScheme(schemeName: string, colors: Array<string>): void {
      this.host.jqxChart('addColorScheme', schemeName, colors);
   }

   removeColorScheme(schemeName: string): void {
      this.host.jqxChart('removeColorScheme', schemeName);
   }

   getItemsCount(groupIndex: number, serieIndex: number): number {
      return this.host.jqxChart('getItemsCount', groupIndex, serieIndex);
   }

   getItemCoord(groupIndex: number, serieIndex: number, itemIndex: number): any {
      return this.host.jqxChart('getItemCoord', groupIndex, serieIndex, itemIndex);
   }

   getXAxisRect(groupIndex: number): jqwidgets.ChartRect {
      return this.host.jqxChart('getXAxisRect', groupIndex);
   }

   getXAxisLabels(groupIndex: number): Array<any> {
      return this.host.jqxChart('getXAxisLabels', groupIndex);
   }

   getValueAxisRect(groupIndex: number): jqwidgets.ChartRect {
      return this.host.jqxChart('getValueAxisRect', groupIndex);
   }

   getValueAxisLabels(groupIndex: number): Array<any> {
      return this.host.jqxChart('getValueAxisLabels', groupIndex);
   }

   getColorScheme(colorScheme: string): Array<string> {
      return this.host.jqxChart('getColorScheme', colorScheme);
   }

   hideSerie(groupIndex: number, serieIndex: number, itemIndex: number): void {
      this.host.jqxChart('hideSerie', groupIndex, serieIndex, itemIndex);
   }

   showSerie(groupIndex: number, serieIndex: number, itemIndex: number): void {
      this.host.jqxChart('showSerie', groupIndex, serieIndex, itemIndex);
   }

   hideToolTip(hideDelay: number): void {
      this.host.jqxChart('hideToolTip', hideDelay);
   }

   showToolTip(groupIndex: number, serieIndex: number, itemIndex: number, showDelay: number, hideDelay: number): void {
      this.host.jqxChart('showToolTip', groupIndex, serieIndex, itemIndex, showDelay, hideDelay);
   }

   saveAsJPEG(fileName: string, exportServerUrl: string): void {
      this.host.jqxChart('saveAsJPEG', fileName, exportServerUrl);
   }

   saveAsPNG(fileName: string, exportServerUrl: string): void {
      this.host.jqxChart('saveAsPNG', fileName, exportServerUrl);
   }

   saveAsPDF(fileName: string, exportServerUrl: string): void {
      this.host.jqxChart('saveAsPDF', fileName, exportServerUrl);
   }

   getXAxisValue(offset: number, groupIndex: number): any {
      return this.host.jqxChart('getXAxisValue', offset, groupIndex);
   }

   getValueAxisValue(offset: number, groupIndex: number): any {
      return this.host.jqxChart('getValueAxisValue', offset, groupIndex);
   }


   // jqxChartComponent events
   @Output() onToggle = new EventEmitter();
   @Output() onClick = new EventEmitter();
   @Output() onRefreshBegin = new EventEmitter();
   @Output() onRefreshEnd = new EventEmitter();
   @Output() onRangeSelectionChanging = new EventEmitter();
   @Output() onRangeSelectionChanged = new EventEmitter();

   __wireEvents__(): void {
      this.host.on('toggle', (eventData: any) => { this.onToggle.emit(eventData); });
      this.host.on('click', (eventData: any) => { this.onClick.emit(eventData); });
      this.host.on('refreshBegin', (eventData: any) => { this.onRefreshBegin.emit(eventData); });
      this.host.on('refreshEnd', (eventData: any) => { this.onRefreshEnd.emit(eventData); });
      this.host.on('rangeSelectionChanging', (eventData: any) => { this.onRangeSelectionChanging.emit(eventData); });
      this.host.on('rangeSelectionChanged', (eventData: any) => { this.onRangeSelectionChanged.emit(eventData); });
   }

} //jqxChartComponent


