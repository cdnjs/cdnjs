/*!
 * ui-grid - v4.8.3 - 2019-10-21
 * Copyright (c) 2019 ; License: MIT 
 */

/* global ExcelBuilder */
/* global console */

(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @name ui.grid.exporter
   * @description
   *
   * # ui.grid.exporter
   *
   * <div class="alert alert-success" role="alert"><strong>Stable</strong> This feature is stable. There should no longer be breaking api changes without a deprecation warning.</div>
   *
   * This module provides the ability to export data from the grid.
   *
   * Data can be exported in a range of formats, and all data, visible
   * data, or selected rows can be exported, with all columns or visible
   * columns.
   *
   * No UI is provided, the caller should provide their own UI/buttons
   * as appropriate, or enable the gridMenu
   *
   * <br/>
   * <br/>
   *
   * <div doc-module-components="ui.grid.exporter"></div>
   */

  var module = angular.module('ui.grid.exporter', ['ui.grid']);

  /**
   *  @ngdoc object
   *  @name ui.grid.exporter.constant:uiGridExporterConstants
   *
   *  @description constants available in exporter module
   */
  /**
   * @ngdoc property
   * @propertyOf ui.grid.exporter.constant:uiGridExporterConstants
   * @name ALL
   * @description export all data, including data not visible.  Can
   * be set for either rowTypes or colTypes
   */
  /**
   * @ngdoc property
   * @propertyOf ui.grid.exporter.constant:uiGridExporterConstants
   * @name VISIBLE
   * @description export only visible data, including data not visible.  Can
   * be set for either rowTypes or colTypes
   */
  /**
   * @ngdoc property
   * @propertyOf ui.grid.exporter.constant:uiGridExporterConstants
   * @name SELECTED
   * @description export all data, including data not visible.  Can
   * be set only for rowTypes, selection of only some columns is
   * not supported
   */
  module.constant('uiGridExporterConstants', {
    featureName: 'exporter',
    rowHeaderColName: 'treeBaseRowHeaderCol',
    selectionRowHeaderColName: 'selectionRowHeaderCol',
    ALL: 'all',
    VISIBLE: 'visible',
    SELECTED: 'selected',
    CSV_CONTENT: 'CSV_CONTENT',
    BUTTON_LABEL: 'BUTTON_LABEL',
    FILE_NAME: 'FILE_NAME'
  });

  /**
   *  @ngdoc service
   *  @name ui.grid.exporter.service:uiGridExporterService
   *
   *  @description Services for exporter feature
   */
  module.service('uiGridExporterService', ['$filter', '$q', 'uiGridExporterConstants', 'gridUtil', '$compile', '$interval', 'i18nService',
    function ($filter, $q, uiGridExporterConstants, gridUtil, $compile, $interval, i18nService) {
      var service = {

        delay: 100,

        initializeGrid: function (grid) {

          // add feature namespace and any properties to grid for needed state
          grid.exporter = {};
          this.defaultGridOptions(grid.options);

          /**
           *  @ngdoc object
           *  @name ui.grid.exporter.api:PublicApi
           *
           *  @description Public Api for exporter feature
           */
          var publicApi = {
            events: {
              exporter: {
              }
            },
            methods: {
              exporter: {
                /**
                 * @ngdoc function
                 * @name csvExport
                 * @methodOf  ui.grid.exporter.api:PublicApi
                 * @description Exports rows from the grid in csv format,
                 * the data exported is selected based on the provided options
                 * @param {string} rowTypes which rows to export, valid values are
                 * uiGridExporterConstants.ALL, uiGridExporterConstants.VISIBLE,
                 * uiGridExporterConstants.SELECTED
                 * @param {string} colTypes which columns to export, valid values are
                 * uiGridExporterConstants.ALL, uiGridExporterConstants.VISIBLE
                 */
                csvExport: function (rowTypes, colTypes) {
                  service.csvExport(grid, rowTypes, colTypes);
                },
                /**
                 * @ngdoc function
                 * @name pdfExport
                 * @methodOf  ui.grid.exporter.api:PublicApi
                 * @description Exports rows from the grid in pdf format,
                 * the data exported is selected based on the provided options
                 * Note that this function has a dependency on pdfMake, all
                 * going well this has been installed for you.
                 * The resulting pdf opens in a new browser window.
                 * @param {string} rowTypes which rows to export, valid values are
                 * uiGridExporterConstants.ALL, uiGridExporterConstants.VISIBLE,
                 * uiGridExporterConstants.SELECTED
                 * @param {string} colTypes which columns to export, valid values are
                 * uiGridExporterConstants.ALL, uiGridExporterConstants.VISIBLE
                 */
                pdfExport: function (rowTypes, colTypes) {
                  service.pdfExport(grid, rowTypes, colTypes);
                },
                /**
                 * @ngdoc function
                 * @name excelExport
                 * @methodOf  ui.grid.exporter.api:PublicApi
                 * @description Exports rows from the grid in excel format,
                 * the data exported is selected based on the provided options
                 * @param {string} rowTypes which rows to export, valid values are
                 * uiGridExporterConstants.ALL, uiGridExporterConstants.VISIBLE,
                 * uiGridExporterConstants.SELECTED
                 * @param {string} colTypes which columns to export, valid values are
                 * uiGridExporterConstants.ALL, uiGridExporterConstants.VISIBLE
                 */
                excelExport: function (rowTypes, colTypes) {
                  service.excelExport(grid, rowTypes, colTypes);
                }
              }
            }
          };

          grid.api.registerEventsFromObject(publicApi.events);

          grid.api.registerMethodsFromObject(publicApi.methods);

          if (grid.api.core.addToGridMenu) {
            service.addToMenu( grid );
          } else {
            // order of registration is not guaranteed, register in a little while
            $interval( function() {
              if (grid.api.core.addToGridMenu) {
                service.addToMenu( grid );
              }
            }, this.delay, 1);
          }

        },

        defaultGridOptions: function (gridOptions) {
          // default option to true unless it was explicitly set to false
          /**
           * @ngdoc object
           * @name ui.grid.exporter.api:GridOptions
           *
           * @description GridOptions for exporter feature, these are available to be
           * set using the ui-grid {@link ui.grid.class:GridOptions gridOptions}
           */
          /**
           * @ngdoc object
           * @name ui.grid.exporter.api:ColumnDef
           * @description ColumnDef settings for exporter
           */
          /**
           * @ngdoc object
           * @name exporterSuppressMenu
           * @propertyOf  ui.grid.exporter.api:GridOptions
           * @description Don't show the export menu button, implying the user
           * will roll their own UI for calling the exporter
           * <br/>Defaults to false
           */
          gridOptions.exporterSuppressMenu = gridOptions.exporterSuppressMenu === true;
          /**
           * @ngdoc object
           * @name exporterMenuLabel
           * @propertyOf  ui.grid.exporter.api:GridOptions
           * @description The text to show on the exporter menu button
           * link
           * <br/>Defaults to 'Export'
           */
          gridOptions.exporterMenuLabel = gridOptions.exporterMenuLabel ? gridOptions.exporterMenuLabel : 'Export';
          /**
           * @ngdoc object
           * @name exporterSuppressColumns
           * @propertyOf  ui.grid.exporter.api:GridOptions
           * @description Columns that should not be exported.  The selectionRowHeader is already automatically
           * suppressed, but if you had a button column or some other "system" column that shouldn't be shown in the
           * output then add it in this list.  You should provide an array of column names.
           * <br/>Defaults to: []
           * <pre>
           *   gridOptions.exporterSuppressColumns = [ 'buttons' ];
           * </pre>
           */
          gridOptions.exporterSuppressColumns = gridOptions.exporterSuppressColumns ? gridOptions.exporterSuppressColumns : [];
          /**
           * @ngdoc object
           * @name exporterCsvColumnSeparator
           * @propertyOf  ui.grid.exporter.api:GridOptions
           * @description The character to use as column separator
           * link
           * <br/>Defaults to ','
           */
          gridOptions.exporterCsvColumnSeparator = gridOptions.exporterCsvColumnSeparator ? gridOptions.exporterCsvColumnSeparator : ',';
          /**
           * @ngdoc object
           * @name exporterCsvFilename
           * @propertyOf  ui.grid.exporter.api:GridOptions
           * @description The default filename to use when saving the downloaded csv.
           * This will only work in some browsers.
           * <br/>Defaults to 'download.csv'
           */
          gridOptions.exporterCsvFilename = gridOptions.exporterCsvFilename ? gridOptions.exporterCsvFilename : 'download.csv';
          /**
           * @ngdoc object
           * @name exporterPdfFilename
           * @propertyOf  ui.grid.exporter.api:GridOptions
           * @description The default filename to use when saving the downloaded pdf, only used in IE (other browsers open pdfs in a new window)
           * <br/>Defaults to 'download.pdf'
           */
          gridOptions.exporterPdfFilename = gridOptions.exporterPdfFilename ? gridOptions.exporterPdfFilename : 'download.pdf';
          /**
           * @ngdoc object
           * @name exporterExcelFilename
           * @propertyOf  ui.grid.exporter.api:GridOptions
           * @description The default filename to use when saving the downloaded excel, only used in IE (other browsers open excels in a new window)
           * <br/>Defaults to 'download.xlsx'
           */
          gridOptions.exporterExcelFilename = gridOptions.exporterExcelFilename ? gridOptions.exporterExcelFilename : 'download.xlsx';

          /**
           * @ngdoc object
           * @name exporterExcelSheetName
           * @propertyOf  ui.grid.exporter.api:GridOptions
           * @description The default sheetname to use when saving the downloaded to excel
           * <br/>Defaults to 'Sheet1'
           */
          gridOptions.exporterExcelSheetName = gridOptions.exporterExcelSheetName ? gridOptions.exporterExcelSheetName : 'Sheet1';

          /**
           * @ngdoc object
           * @name exporterOlderExcelCompatibility
           * @propertyOf  ui.grid.exporter.api:GridOptions
           * @description Some versions of excel don't like the utf-16 BOM on the front, and it comes
           * through as ï»¿ in the first column header.  Setting this option to false will suppress this, at the
           * expense of proper utf-16 handling in applications that do recognise the BOM
           * <br/>Defaults to false
           */
          gridOptions.exporterOlderExcelCompatibility = gridOptions.exporterOlderExcelCompatibility === true;
          /**
           * @ngdoc object
           * @name exporterIsExcelCompatible
           * @propertyOf  ui.grid.exporter.api:GridOptions
           * @description Separator header, used to set a custom column separator in a csv file, only works on MS Excel.
           * Used it on other programs will make csv content display unproperly. Setting this option to false won't add this header.
           * <br/>Defaults to false
           */
          gridOptions.exporterIsExcelCompatible = gridOptions.exporterIsExcelCompatible === true;
          /**
           * @ngdoc object
           * @name exporterMenuItemOrder
           * @propertyOf  ui.grid.exporter.api:GridOptions
           * @description An option to determine the starting point for the menu items created by the exporter
           * <br/>Defaults to 200
           */
          gridOptions.exporterMenuItemOrder = gridOptions.exporterMenuItemOrder ? gridOptions.exporterMenuItemOrder : 200;
          /**
           * @ngdoc object
           * @name exporterPdfDefaultStyle
           * @propertyOf  ui.grid.exporter.api:GridOptions
           * @description The default style in pdfMake format
           * <br/>Defaults to:
           * <pre>
           *   {
           *     fontSize: 11
           *   }
           * </pre>
           */
          gridOptions.exporterPdfDefaultStyle = gridOptions.exporterPdfDefaultStyle ? gridOptions.exporterPdfDefaultStyle : { fontSize: 11 };
          /**
           * @ngdoc object
           * @name exporterPdfTableStyle
           * @propertyOf  ui.grid.exporter.api:GridOptions
           * @description The table style in pdfMake format
           * <br/>Defaults to:
           * <pre>
           *   {
           *     margin: [0, 5, 0, 15]
           *   }
           * </pre>
           */
          gridOptions.exporterPdfTableStyle = gridOptions.exporterPdfTableStyle ? gridOptions.exporterPdfTableStyle : { margin: [0, 5, 0, 15] };
          /**
           * @ngdoc object
           * @name exporterPdfTableHeaderStyle
           * @propertyOf  ui.grid.exporter.api:GridOptions
           * @description The tableHeader style in pdfMake format
           * <br/>Defaults to:
           * <pre>
           *   {
           *     bold: true,
           *     fontSize: 12,
           *     color: 'black'
           *   }
           * </pre>
           */
          gridOptions.exporterPdfTableHeaderStyle = gridOptions.exporterPdfTableHeaderStyle ? gridOptions.exporterPdfTableHeaderStyle : { bold: true, fontSize: 12, color: 'black' };
          /**
           * @ngdoc object
           * @name exporterPdfHeader
           * @propertyOf  ui.grid.exporter.api:GridOptions
           * @description The header section for pdf exports.  Can be
           * simple text:
           * <pre>
           *   gridOptions.exporterPdfHeader = 'My Header';
           * </pre>
           * Can be a more complex object in pdfMake format:
           * <pre>
           *   gridOptions.exporterPdfHeader = {
           *     columns: [
           *       'Left part',
           *       { text: 'Right part', alignment: 'right' }
           *     ]
           *   };
           * </pre>
           * Or can be a function, allowing page numbers and the like
           * <pre>
           *   gridOptions.exporterPdfHeader: function(currentPage, pageCount) { return currentPage.toString() + ' of ' + pageCount; };
           * </pre>
           */
          gridOptions.exporterPdfHeader = gridOptions.exporterPdfHeader ? gridOptions.exporterPdfHeader : null;
          /**
           * @ngdoc object
           * @name exporterPdfFooter
           * @propertyOf  ui.grid.exporter.api:GridOptions
           * @description The header section for pdf exports.  Can be
           * simple text:
           * <pre>
           *   gridOptions.exporterPdfFooter = 'My Footer';
           * </pre>
           * Can be a more complex object in pdfMake format:
           * <pre>
           *   gridOptions.exporterPdfFooter = {
           *     columns: [
           *       'Left part',
           *       { text: 'Right part', alignment: 'right' }
           *     ]
           *   };
           * </pre>
           * Or can be a function, allowing page numbers and the like
           * <pre>
           *   gridOptions.exporterPdfFooter: function(currentPage, pageCount) { return currentPage.toString() + ' of ' + pageCount; };
           * </pre>
           */
          gridOptions.exporterPdfFooter = gridOptions.exporterPdfFooter ? gridOptions.exporterPdfFooter : null;
          /**
           * @ngdoc object
           * @name exporterPdfOrientation
           * @propertyOf  ui.grid.exporter.api:GridOptions
           * @description The orientation, should be a valid pdfMake value,
           * 'landscape' or 'portrait'
           * <br/>Defaults to landscape
           */
          gridOptions.exporterPdfOrientation = gridOptions.exporterPdfOrientation ? gridOptions.exporterPdfOrientation : 'landscape';
          /**
           * @ngdoc object
           * @name exporterPdfPageSize
           * @propertyOf  ui.grid.exporter.api:GridOptions
           * @description The orientation, should be a valid pdfMake
           * paper size, usually 'A4' or 'LETTER'
           * {@link https://github.com/bpampuch/pdfmake/blob/master/src/standardPageSizes.js pdfMake page sizes}
           * <br/>Defaults to A4
           */
          gridOptions.exporterPdfPageSize = gridOptions.exporterPdfPageSize ? gridOptions.exporterPdfPageSize : 'A4';
          /**
           * @ngdoc object
           * @name exporterPdfMaxGridWidth
           * @propertyOf  ui.grid.exporter.api:GridOptions
           * @description The maxium grid width - the current grid width
           * will be scaled to match this, with any fixed width columns
           * being adjusted accordingly.
           * <br/>Defaults to 720 (for A4 landscape), use 670 for LETTER
           */
          gridOptions.exporterPdfMaxGridWidth = gridOptions.exporterPdfMaxGridWidth ? gridOptions.exporterPdfMaxGridWidth : 720;
          /**
           * @ngdoc object
           * @name exporterPdfTableLayout
           * @propertyOf  ui.grid.exporter.api:GridOptions
           * @description A tableLayout in pdfMake format,
           * controls gridlines and the like.  We use the default
           * layout usually.
           * <br/>Defaults to null, which means no layout
           */

          /**
           * @ngdoc object
           * @name exporterMenuAllData
           * @propertyOf ui.grid.exporter.api:GridOptions
           * @description Add export all data as cvs/pdf menu items to the ui-grid grid menu, if it's present.  Defaults to true.
           */
          gridOptions.exporterMenuAllData = gridOptions.exporterMenuAllData !== undefined ? gridOptions.exporterMenuAllData : true;

          /**
           * @ngdoc object
           * @name exporterMenuVisibleData
           * @propertyOf ui.grid.exporter.api:GridOptions
           * @description Add export visible data as cvs/pdf menu items to the ui-grid grid menu, if it's present.  Defaults to true.
           */
          gridOptions.exporterMenuVisibleData = gridOptions.exporterMenuVisibleData !== undefined ? gridOptions.exporterMenuVisibleData : true;

          /**
           * @ngdoc object
           * @name exporterMenuSelectedData
           * @propertyOf ui.grid.exporter.api:GridOptions
           * @description Add export selected data as cvs/pdf menu items to the ui-grid grid menu, if it's present.  Defaults to true.
           */
          gridOptions.exporterMenuSelectedData = gridOptions.exporterMenuSelectedData !== undefined ? gridOptions.exporterMenuSelectedData : true;

          /**
           * @ngdoc object
           * @name exporterMenuCsv
           * @propertyOf ui.grid.exporter.api:GridOptions
           * @description Add csv export menu items to the ui-grid grid menu, if it's present.  Defaults to true.
           */
          gridOptions.exporterMenuCsv = gridOptions.exporterMenuCsv !== undefined ? gridOptions.exporterMenuCsv : true;

          /**
           * @ngdoc object
           * @name exporterMenuPdf
           * @propertyOf  ui.grid.exporter.api:GridOptions
           * @description Add pdf export menu items to the ui-grid grid menu, if it's present.  Defaults to true.
           */
          gridOptions.exporterMenuPdf = gridOptions.exporterMenuPdf !== undefined ? gridOptions.exporterMenuPdf : true;

          /**
           * @ngdoc object
           * @name exporterMenuExcel
           * @propertyOf  ui.grid.exporter.api:GridOptions
           * @description Add excel export menu items to the ui-grid grid menu, if it's present.  Defaults to true.
           */
          gridOptions.exporterMenuExcel = gridOptions.exporterMenuExcel !== undefined ? gridOptions.exporterMenuExcel : true;

          /**
           * @ngdoc object
           * @name exporterPdfCustomFormatter
           * @propertyOf  ui.grid.exporter.api:GridOptions
           * @description A custom callback routine that changes the pdf document, adding any
           * custom styling or content that is supported by pdfMake.  Takes in the complete docDefinition, and
           * must return an updated docDefinition ready for pdfMake.
           * @example
           * In this example we add a style to the style array, so that we can use it in our
           * footer definition.
           * <pre>
           *   gridOptions.exporterPdfCustomFormatter = function ( docDefinition ) {
           *     docDefinition.styles.footerStyle = { bold: true, fontSize: 10 };
           *     return docDefinition;
           *   }
           *
           *   gridOptions.exporterPdfFooter = { text: 'My footer', style: 'footerStyle' }
           * </pre>
           */
          gridOptions.exporterPdfCustomFormatter = ( gridOptions.exporterPdfCustomFormatter && typeof( gridOptions.exporterPdfCustomFormatter ) === 'function' ) ? gridOptions.exporterPdfCustomFormatter : function ( docDef ) { return docDef; };

          /**
           * @ngdoc object
           * @name exporterHeaderFilterUseName
           * @propertyOf  ui.grid.exporter.api:GridOptions
           * @description Defaults to false, which leads to `displayName` being passed into the headerFilter.
           * If set to true, then will pass `name` instead.
           *
           *
           * @example
           * <pre>
           *   gridOptions.exporterHeaderFilterUseName = true;
           * </pre>
           */
          gridOptions.exporterHeaderFilterUseName = gridOptions.exporterHeaderFilterUseName === true;

          /**
           * @ngdoc object
           * @name exporterHeaderFilter
           * @propertyOf  ui.grid.exporter.api:GridOptions
           * @description A function to apply to the header displayNames before exporting.  Useful for internationalisation,
           * for example if you were using angular-translate you'd set this to `$translate.instant`.  Note that this
           * call must be synchronous, it cannot be a call that returns a promise.
           *
           * Behaviour can be changed to pass in `name` instead of `displayName` through use of `exporterHeaderFilterUseName: true`.
           *
           * @example
           * <pre>
           *   gridOptions.exporterHeaderFilter = function( displayName ) { return 'col: ' + name; };
           * </pre>
           * OR
           * <pre>
           *   gridOptions.exporterHeaderFilter = $translate.instant;
           * </pre>
           */

          /**
           * @ngdoc function
           * @name exporterFieldCallback
           * @propertyOf  ui.grid.exporter.api:GridOptions
           * @description A function to call for each field before exporting it.  Allows
           * massaging of raw data into a display format, for example if you have applied
           * filters to convert codes into decodes, or you require
           * a specific date format in the exported content.
           *
           * The method is called once for each field exported, and provides the grid, the
           * gridCol and the GridRow for you to use as context in massaging the data.
           *
           * @param {Grid} grid provides the grid in case you have need of it
           * @param {GridRow} row the row from which the data comes
           * @param {GridColumn} col the column from which the data comes
           * @param {object} value the value for your massaging
           * @returns {object} you must return the massaged value ready for exporting
           *
           * @example
           * <pre>
           *   gridOptions.exporterFieldCallback = function ( grid, row, col, value ) {
           *     if ( col.name === 'status' ) {
           *       value = decodeStatus( value );
           *     }
           *     return value;
           *   }
           * </pre>
           */
          gridOptions.exporterFieldCallback = gridOptions.exporterFieldCallback ? gridOptions.exporterFieldCallback : defaultExporterFieldCallback;

          /**
           * @ngdoc function
           * @name exporterFieldFormatCallback
           * @propertyOf  ui.grid.exporter.api:GridOptions
           * @description A function to call for each field before exporting it.  Allows
           * general object to be return to modify the format of a cell in the case of
           * excel exports
           *
           * The method is called once for each field exported, and provides the grid, the
           * gridCol and the GridRow for you to use as context in massaging the data.
           *
           * @param {Grid} grid provides the grid in case you have need of it
           * @param {GridRow} row the row from which the data comes
           * @param {GridColumn} col the column from which the data comes
           * @param {object} value the value for your massaging
           * @returns {object} you must return the massaged value ready for exporting
           *
           * @example
           * <pre>
           *   gridOptions.exporterFieldCallback = function ( grid, row, col, value ) {
           *     if ( col.name === 'status' ) {
           *       value = decodeStatus( value );
           *     }
           *     return value;
           *   }
           * </pre>
           */
          gridOptions.exporterFieldFormatCallback = gridOptions.exporterFieldFormatCallback ? gridOptions.exporterFieldFormatCallback : function( grid, row, col, value ) { return null; };

          /**
           * @ngdoc function
           * @name exporterExcelCustomFormatters
           * @propertyOf  ui.grid.exporter.api:GridOptions
           * @description A function to call to setup formatters and store on docDefinition.
           *
           * The method is called at the start and can setup all the formatters to export to excel
           *
           * @param {Grid} grid provides the grid in case you have need of it
           * @param {Workbook} row the row from which the data comes
           * @param {docDefinition} The docDefinition that will have styles as a object to store formatters
           * @returns {docDefinition} Updated docDefinition with formatter styles
           *
           * @example
           * <pre>
           *   gridOptions.exporterExcelCustomFormatters = function(grid, workbook, docDefinition) {
           *     const formatters = {};
           *     const stylesheet = workbook.getStyleSheet();
           *     const headerFormatDefn = {
           *       'font': { 'size': 11, 'fontName': 'Calibri', 'bold': true },
           *       'alignment': { 'wrapText': false }
           *     };
           *
           *     formatters['header'] = headerFormatter;
           *     Object.assign(docDefinition.styles , formatters);
           *     grid.docDefinition = docDefinition;
           *     return docDefinition;
           *   }
           * </pre>
           */
          gridOptions.exporterExcelCustomFormatters = gridOptions.exporterExcelCustomFormatters ? gridOptions.exporterExcelCustomFormatters : function( grid, workbook, docDefinition ) { return docDefinition; };

          /**
           * @ngdoc function
           * @name exporterExcelHeader
           * @propertyOf  ui.grid.exporter.api:GridOptions
           * @description A function to write formatted header data to sheet.
           *
           * The method is called to provide custom header building for Excel. This data comes before the grid header
           *
           * @param {grid} grid provides the grid in case you have need of it
           * @param {Workbook} row the row from which the data comes
           * @param {Sheet} the sheet to insert data
           * @param {docDefinition} The docDefinition that will have styles as a object to store formatters
           * @returns {docDefinition} Updated docDefinition with formatter styles
           *
           * @example
           * <pre>
           *   gridOptions.exporterExcelCustomFormatters = function (grid, workbook, sheet, docDefinition) {
           *      const headerFormatter = docDefinition.styles['header'];
           *      let cols = [];
           *      // push data in A1 cell with metadata formatter
           *      cols.push({ value: 'Summary Report', metadata: {style: headerFormatter.id} });
           *      sheet.data.push(cols);
           *   }
           * </pre>
           */
          gridOptions.exporterExcelHeader = gridOptions.exporterExcelHeader ? gridOptions.exporterExcelHeader : function( grid, workbook, sheet, docDefinition ) { return null; };


          /**
           * @ngdoc object
           * @name exporterColumnScaleFactor
           * @propertyOf  ui.grid.exporter.api:GridOptions
           * @description A scaling factor to divide the drawnwidth of a column to convert to target excel column
           * format size
           * @example
           * In this example we add a number to divide the drawnwidth of a column to get the excel width.
           * <br/>Defaults to 3.5
           */
          gridOptions.exporterColumnScaleFactor = gridOptions.exporterColumnScaleFactor ? gridOptions.exporterColumnScaleFactor : 3.5;

          /**
           * @ngdoc object
           * @name exporterFieldApplyFilters
           * @propertyOf  ui.grid.exporter.api:GridOptions
           * @description Defaults to false, which leads to filters being evaluated on export           *
           *
           * @example
           * <pre>
           *   gridOptions.exporterFieldApplyFilters = true;
           * </pre>
           */
          gridOptions.exporterFieldApplyFilters = gridOptions.exporterFieldApplyFilters === true;

          /**
           * @ngdoc function
           * @name exporterAllDataFn
           * @propertyOf  ui.grid.exporter.api:GridOptions
           * @description This promise is needed when exporting all rows,
           * and the data need to be provided by server side. Default is null.
           * @returns {Promise} a promise to load all data from server
           *
           * @example
           * <pre>
           *   gridOptions.exporterAllDataFn = function () {
           *     return $http.get('/data/100.json')
           *   }
           * </pre>
           */
          gridOptions.exporterAllDataFn = gridOptions.exporterAllDataFn ? gridOptions.exporterAllDataFn : null;

          /**
           * @ngdoc function
           * @name exporterAllDataPromise
           * @propertyOf  ui.grid.exporter.api:GridOptions
           * @description DEPRECATED - exporterAllDataFn used to be
           * called this, but it wasn't a promise, it was a function that returned
           * a promise.  Deprecated, but supported for backward compatibility, use
           * exporterAllDataFn instead.
           * @returns {Promise} a promise to load all data from server
           *
           * @example
           * <pre>
           *   gridOptions.exporterAllDataFn = function () {
           *     return $http.get('/data/100.json')
           *   }
           * </pre>
           */
          if ( gridOptions.exporterAllDataFn === null && gridOptions.exporterAllDataPromise ) {
            gridOptions.exporterAllDataFn = gridOptions.exporterAllDataPromise;
          }
        },


        /**
         * @ngdoc function
         * @name addToMenu
         * @methodOf  ui.grid.exporter.service:uiGridExporterService
         * @description Adds export items to the grid menu,
         * allowing the user to select export options
         * @param {Grid} grid the grid from which data should be exported
         */
        addToMenu: function ( grid ) {
          grid.api.core.addToGridMenu( grid, [
            {
              title: i18nService.getSafeText('gridMenu.exporterAllAsCsv'),
              action: function () {
                grid.api.exporter.csvExport( uiGridExporterConstants.ALL, uiGridExporterConstants.ALL );
              },
              shown: function() {
                return grid.options.exporterMenuCsv && grid.options.exporterMenuAllData;
              },
              order: grid.options.exporterMenuItemOrder
            },
            {
              title: i18nService.getSafeText('gridMenu.exporterVisibleAsCsv'),
              action: function () {
                grid.api.exporter.csvExport( uiGridExporterConstants.VISIBLE, uiGridExporterConstants.VISIBLE );
              },
              shown: function() {
                return grid.options.exporterMenuCsv && grid.options.exporterMenuVisibleData;
              },
              order: grid.options.exporterMenuItemOrder + 1
            },
            {
              title: i18nService.getSafeText('gridMenu.exporterSelectedAsCsv'),
              action: function () {
                grid.api.exporter.csvExport( uiGridExporterConstants.SELECTED, uiGridExporterConstants.VISIBLE );
              },
              shown: function() {
                return grid.options.exporterMenuCsv && grid.options.exporterMenuSelectedData &&
                       ( grid.api.selection && grid.api.selection.getSelectedRows().length > 0 );
              },
              order: grid.options.exporterMenuItemOrder + 2
            },
            {
              title: i18nService.getSafeText('gridMenu.exporterAllAsPdf'),
              action: function () {
                grid.api.exporter.pdfExport( uiGridExporterConstants.ALL, uiGridExporterConstants.ALL );
              },
              shown: function() {
                return grid.options.exporterMenuPdf && grid.options.exporterMenuAllData;
              },
              order: grid.options.exporterMenuItemOrder + 3
            },
            {
              title: i18nService.getSafeText('gridMenu.exporterVisibleAsPdf'),
              action: function () {
                grid.api.exporter.pdfExport( uiGridExporterConstants.VISIBLE, uiGridExporterConstants.VISIBLE );
              },
              shown: function() {
                return grid.options.exporterMenuPdf && grid.options.exporterMenuVisibleData;
              },
              order: grid.options.exporterMenuItemOrder + 4
            },
            {
              title: i18nService.getSafeText('gridMenu.exporterSelectedAsPdf'),
              action: function () {
                grid.api.exporter.pdfExport( uiGridExporterConstants.SELECTED, uiGridExporterConstants.VISIBLE );
              },
              shown: function() {
                return grid.options.exporterMenuPdf && grid.options.exporterMenuSelectedData &&
                       ( grid.api.selection && grid.api.selection.getSelectedRows().length > 0 );
              },
              order: grid.options.exporterMenuItemOrder + 5
            },
            {
              title: i18nService.getSafeText('gridMenu.exporterAllAsExcel'),
              action: function () {
                grid.api.exporter.excelExport( uiGridExporterConstants.ALL, uiGridExporterConstants.ALL );
              },
              shown: function() {
                return grid.options.exporterMenuExcel && grid.options.exporterMenuAllData;
              },
              order: grid.options.exporterMenuItemOrder + 6
            },
            {
              title: i18nService.getSafeText('gridMenu.exporterVisibleAsExcel'),
              action: function () {
                grid.api.exporter.excelExport( uiGridExporterConstants.VISIBLE, uiGridExporterConstants.VISIBLE );
              },
              shown: function() {
                return grid.options.exporterMenuExcel && grid.options.exporterMenuVisibleData;
              },
              order: grid.options.exporterMenuItemOrder + 7
            },
            {
              title: i18nService.getSafeText('gridMenu.exporterSelectedAsExcel'),
              action: function () {
                grid.api.exporter.excelExport( uiGridExporterConstants.SELECTED, uiGridExporterConstants.VISIBLE );
              },
              shown: function() {
                return grid.options.exporterMenuExcel && grid.options.exporterMenuSelectedData &&
                  ( grid.api.selection && grid.api.selection.getSelectedRows().length > 0 );
              },
              order: grid.options.exporterMenuItemOrder + 8
            }
          ]);
        },


        /**
         * @ngdoc function
         * @name csvExport
         * @methodOf  ui.grid.exporter.service:uiGridExporterService
         * @description Exports rows from the grid in csv format,
         * the data exported is selected based on the provided options
         * @param {Grid} grid the grid from which data should be exported
         * @param {string} rowTypes which rows to export, valid values are
         * uiGridExporterConstants.ALL, uiGridExporterConstants.VISIBLE,
         * uiGridExporterConstants.SELECTED
         * @param {string} colTypes which columns to export, valid values are
         * uiGridExporterConstants.ALL, uiGridExporterConstants.VISIBLE,
         * uiGridExporterConstants.SELECTED
         */
        csvExport: function (grid, rowTypes, colTypes) {
          var self = this;
          this.loadAllDataIfNeeded(grid, rowTypes, colTypes).then(function() {
            var exportColumnHeaders = grid.options.showHeader ? self.getColumnHeaders(grid, colTypes) : [];
            var exportData = self.getData(grid, rowTypes, colTypes);
            var csvContent = self.formatAsCsv(exportColumnHeaders, exportData, grid.options.exporterCsvColumnSeparator);

            self.downloadFile (grid.options.exporterCsvFilename, csvContent, grid.options.exporterCsvColumnSeparator, grid.options.exporterOlderExcelCompatibility, grid.options.exporterIsExcelCompatible);
          });
        },

        /**
         * @ngdoc function
         * @name loadAllDataIfNeeded
         * @methodOf  ui.grid.exporter.service:uiGridExporterService
         * @description When using server side pagination, use exporterAllDataFn to
         * load all data before continuing processing.
         * When using client side pagination, return a resolved promise so processing
         * continues immediately
         * @param {Grid} grid the grid from which data should be exported
         * @param {string} rowTypes which rows to export, valid values are
         * uiGridExporterConstants.ALL, uiGridExporterConstants.VISIBLE,
         * uiGridExporterConstants.SELECTED
         * @param {string} colTypes which columns to export, valid values are
         * uiGridExporterConstants.ALL, uiGridExporterConstants.VISIBLE,
         * uiGridExporterConstants.SELECTED
         */
        loadAllDataIfNeeded: function (grid, rowTypes, colTypes) {
          if ( rowTypes === uiGridExporterConstants.ALL && grid.rows.length !== grid.options.totalItems && grid.options.exporterAllDataFn) {
            return grid.options.exporterAllDataFn()
              .then(function(allData) {
                grid.modifyRows(allData);
              });
          } else {
            var deferred = $q.defer();
            deferred.resolve();
            return deferred.promise;
          }
        },

        /**
         * @ngdoc property
         * @propertyOf ui.grid.exporter.api:ColumnDef
         * @name exporterSuppressExport
         * @description Suppresses export for this column.  Used by selection and expandable.
         */

        /**
         * @ngdoc function
         * @name getColumnHeaders
         * @methodOf  ui.grid.exporter.service:uiGridExporterService
         * @description Gets the column headers from the grid to use
         * as a title row for the exported file, all headers have
         * headerCellFilters applied as appropriate.
         *
         * Column headers are an array of objects, each object has
         * name, displayName, width and align attributes.  Only name is
         * used for csv, all attributes are used for pdf.
         *
         * @param {Grid} grid the grid from which data should be exported
         * @param {string} colTypes which columns to export, valid values are
         * uiGridExporterConstants.ALL, uiGridExporterConstants.VISIBLE,
         * uiGridExporterConstants.SELECTED
         */
        getColumnHeaders: function (grid, colTypes) {
          var headers = [],
            columns;

          if ( colTypes === uiGridExporterConstants.ALL ) {
            columns = grid.columns;
          } else {
            var leftColumns = grid.renderContainers.left ? grid.renderContainers.left.visibleColumnCache.filter( function( column ) { return column.visible; } ) : [],
              bodyColumns = grid.renderContainers.body ? grid.renderContainers.body.visibleColumnCache.filter( function( column ) { return column.visible; } ) : [],
              rightColumns = grid.renderContainers.right ? grid.renderContainers.right.visibleColumnCache.filter( function( column ) { return column.visible; } ) : [];

            columns = leftColumns.concat(bodyColumns, rightColumns);
          }

          columns.forEach( function( gridCol ) {
            // $$hashKey check since when grouping and sorting pragmatically this ends up in export. Filtering it out
            if ( gridCol.colDef.exporterSuppressExport !== true  && gridCol.field !== '$$hashKey' &&
                 grid.options.exporterSuppressColumns.indexOf( gridCol.name ) === -1 ) {
              var headerEntry = {
                name: gridCol.field,
                displayName: getDisplayName(grid, gridCol),
                width: gridCol.drawnWidth ? gridCol.drawnWidth : gridCol.width,
                align: gridCol.colDef.align ? gridCol.colDef.align : (gridCol.colDef.type === 'number' ? 'right' : 'left')
              };

              headers.push(headerEntry);
            }
          });

          return headers;
        },

        /**
         * @ngdoc property
         * @propertyOf ui.grid.exporter.api:ColumnDef
         * @name exporterPdfAlign
         * @description the alignment you'd like for this specific column when
         * exported into a pdf.  Can be 'left', 'right', 'center' or any other
         * valid pdfMake alignment option.
         */

        /**
         * @ngdoc object
         * @name ui.grid.exporter.api:GridRow
         * @description GridRow settings for exporter
         */

        /**
         * @ngdoc object
         * @name exporterEnableExporting
         * @propertyOf  ui.grid.exporter.api:GridRow
         * @description If set to false, then don't export this row, notwithstanding visible or
         * other settings
         * <br/>Defaults to true
         */

        /**
         * @ngdoc function
         * @name getRowsFromNode
         * @methodOf  ui.grid.exporter.service:uiGridExporterService
         * @description Gets rows from a node. If the node is grouped it will
         * recurse down into the children to get to the raw data element
         * which is a row without children (a leaf).
         * @param {Node} aNode the tree node on the grid
         * @returns {Array} an array of leaf nodes
         */
        getRowsFromNode: function(aNode) {
          var rows = [];
          for (var i = 0; i<aNode.children.length; i++) {
            if (aNode.children[i].children && aNode.children[i].children.length === 0) {
              rows.push(aNode.children[i]);
            } else {
              var nodeRows = this.getRowsFromNode(aNode.children[i]);
              rows = rows.concat(nodeRows);
            }
          }
          return rows;
        },

        /**
         * @ngdoc function
         * @name getDataSorted
         * @methodOf  ui.grid.exporter.service:uiGridExporterService
         * @description Gets rows from a node. If the node is grouped it will
         * recurse down into the children to get to the raw data element
         * which is a row without children (a leaf). If the grid is not
         * grouped this will return just the raw rows
         * @param {Grid} grid the grid from which data should be exported
         * @returns {Array} an array of leaf nodes
         */
        getDataSorted: function (grid) {
          if (!grid.treeBase || grid.treeBase.numberLevels === 0) {
            return grid.rows;
          }
          var rows = [];

          for (var i = 0; i< grid.treeBase.tree.length; i++) {
            var nodeRows = this.getRowsFromNode(grid.treeBase.tree[i]);

            for (var j = 0; j<nodeRows.length; j++) {
              rows.push(nodeRows[j].row);
            }
          }
          return rows;
        },

        /**
         * @ngdoc function
         * @name getData
         * @methodOf  ui.grid.exporter.service:uiGridExporterService
         * @description Gets data from the grid based on the provided options,
         * all cells have cellFilters applied as appropriate.  Any rows marked
         * `exporterEnableExporting: false` will not be exported
         * @param {Grid} grid the grid from which data should be exported
         * @param {string} rowTypes which rows to export, valid values are
         * uiGridExporterConstants.ALL, uiGridExporterConstants.VISIBLE,
         * uiGridExporterConstants.SELECTED
         * @param {string} colTypes which columns to export, valid values are
         * uiGridExporterConstants.ALL, uiGridExporterConstants.VISIBLE,
         * uiGridExporterConstants.SELECTED
         * @param {boolean} applyCellFilters whether or not to get the display value or the raw value of the data
         */
        getData: function (grid, rowTypes, colTypes, applyCellFilters) {
          var data = [],
            rows,
            columns;

          switch ( rowTypes ) {
            case uiGridExporterConstants.ALL:
              rows = this.getDataSorted(grid, rowTypes, colTypes, applyCellFilters);
              break;
            case uiGridExporterConstants.VISIBLE:
              rows = grid.getVisibleRows();
              break;
            case uiGridExporterConstants.SELECTED:
              if ( grid.api.selection ) {
                rows = grid.api.selection.getSelectedGridRows();
              } else {
                gridUtil.logError('selection feature must be enabled to allow selected rows to be exported');
              }
              break;
          }

          if ( colTypes === uiGridExporterConstants.ALL ) {
            columns = grid.columns;
          } else {
            var leftColumns = grid.renderContainers.left ? grid.renderContainers.left.visibleColumnCache.filter( function( column ) { return column.visible; } ) : [];
            var bodyColumns = grid.renderContainers.body ? grid.renderContainers.body.visibleColumnCache.filter( function( column ) { return column.visible; } ) : [];
            var rightColumns = grid.renderContainers.right ? grid.renderContainers.right.visibleColumnCache.filter( function( column ) { return column.visible; } ) : [];

            columns = leftColumns.concat(bodyColumns, rightColumns);
          }

          rows.forEach(function( row ) {
            if (row.exporterEnableExporting !== false) {
              var extractedRow = [];

              columns.forEach( function( gridCol ) {
                // $$hashKey check since when grouping and sorting programmatically this ends up in export. Filtering it out
                if ( (gridCol.visible || colTypes === uiGridExporterConstants.ALL ) &&
                     gridCol.colDef.exporterSuppressExport !== true && gridCol.field !== '$$hashKey' &&
                     grid.options.exporterSuppressColumns.indexOf( gridCol.name ) === -1 ) {
                  var cellValue = applyCellFilters ? grid.getCellDisplayValue( row, gridCol ) : grid.getCellValue( row, gridCol ),
                    extractedField = { value: grid.options.exporterFieldCallback( grid, row, gridCol, cellValue ) },
                    extension = grid.options.exporterFieldFormatCallback( grid, row, gridCol, cellValue );

                  if (extension) {
                    Object.assign(extractedField, extension);
                  }
                  if ( gridCol.colDef.exporterPdfAlign ) {
                    extractedField.alignment = gridCol.colDef.exporterPdfAlign;
                  }
                  extractedRow.push(extractedField);
                }
              });

              data.push(extractedRow);
            }
          });

          return data;
        },


        /**
         * @ngdoc function
         * @name formatAsCsv
         * @methodOf  ui.grid.exporter.service:uiGridExporterService
         * @description Formats the column headers and data as a CSV,
         * and sends that data to the user
         * @param {array} exportColumnHeaders an array of column headers,
         * where each header is an object with name, width and maybe alignment
         * @param {array} exportData an array of rows, where each row is
         * an array of column data
         * @param {string} separator a string that represents the separator to be used in the csv file
         * @returns {string} csv the formatted csv as a string
         */
        formatAsCsv: function (exportColumnHeaders, exportData, separator) {
          var self = this,
            bareHeaders = exportColumnHeaders.map(function(header) { return { value: header.displayName };}),
            csv = bareHeaders.length > 0 ? (self.formatRowAsCsv(this, separator)(bareHeaders) + '\n') : '';

          csv += exportData.map(this.formatRowAsCsv(this, separator)).join('\n');

          return csv;
        },

        /**
         * @ngdoc function
         * @name formatRowAsCsv
         * @methodOf  ui.grid.exporter.service:uiGridExporterService
         * @description Renders a single field as a csv field, including
         * quotes around the value
         * @param {exporterService} exporter pass in exporter
         * @param {string} separator the string to be used to join the row data
         * @returns {function} A function that returns a csv-ified version of the row
         */
        formatRowAsCsv: function (exporter, separator) {
          return function (row) {
            return row.map(exporter.formatFieldAsCsv).join(separator);
          };
        },

        /**
         * @ngdoc function
         * @name formatFieldAsCsv
         * @methodOf  ui.grid.exporter.service:uiGridExporterService
         * @description Renders a single field as a csv field, including
         * quotes around the value
         * @param {field} field the field to be turned into a csv string,
         * may be of any type
         * @returns {string} a csv-ified version of the field
         */
        formatFieldAsCsv: function (field) {
          if (field.value == null) { // we want to catch anything null-ish, hence just == not ===
            return '';
          }
          if (typeof(field.value) === 'number') {
            return field.value;
          }
          if (typeof(field.value) === 'boolean') {
            return (field.value ? 'TRUE' : 'FALSE') ;
          }
          if (typeof(field.value) === 'string') {
            return '"' + field.value.replace(/"/g,'""') + '"';
          }
          if (typeof(field.value) === 'object' && !(field.value instanceof Date)) {
            return '"' + JSON.stringify(field.value).replace(/"/g,'""') + '"';
          }
          // if field type is date, numberStr
          return JSON.stringify(field.value);
        },

        /**
         * @ngdoc function
         * @name isIE
         * @methodOf ui.grid.exporter.service:uiGridExporterService
         * @description Checks whether current browser is IE and returns it's version if it is
        */
        isIE: function () {
          var match = navigator.userAgent.search(/(?:Edge|MSIE|Trident\/.*; rv:)/);
          var isIE = false;

          if (match !== -1) {
            isIE = true;
          }

          return isIE;
        },


        /**
         * @ngdoc function
         * @name downloadFile
         * @methodOf ui.grid.exporter.service:uiGridExporterService
         * @description Triggers download of a csv file.  Logic provided
         * by @cssensei (from his colleagues at https://github.com/ifeelgoods) in issue #2391
         * @param {string} fileName the filename we'd like our file to be
         * given
         * @param {string} csvContent the csv content that we'd like to
         * download as a file
         * @param {string} columnSeparator The separator to be used by the columns
         * @param {boolean} exporterOlderExcelCompatibility whether or not we put a utf-16 BOM on the from (\uFEFF)
          * @param {boolean} exporterIsExcelCompatible whether or not we add separator header ('sep=X')
         */
        downloadFile: function (fileName, csvContent, columnSeparator, exporterOlderExcelCompatibility, exporterIsExcelCompatible) {
          var D = document,
            a = D.createElement('a'),
            strMimeType = 'application/octet-stream;charset=utf-8',
            rawFile,
            ieVersion = this.isIE();

          if (exporterIsExcelCompatible) {
              csvContent = 'sep=' + columnSeparator + '\r\n' + csvContent;
          }

          // IE10+
          if (navigator.msSaveBlob) {
            return navigator.msSaveOrOpenBlob(
              new Blob(
                [exporterOlderExcelCompatibility ? "\uFEFF" : '', csvContent],
                { type: strMimeType } ),
              fileName
            );
          }

          if (ieVersion) {
            var frame = D.createElement('iframe');

            document.body.appendChild(frame);

            frame.contentWindow.document.open('text/html', 'replace');
            frame.contentWindow.document.write(csvContent);
            frame.contentWindow.document.close();
            frame.contentWindow.focus();
            frame.contentWindow.document.execCommand('SaveAs', true, fileName);

            document.body.removeChild(frame);
            return true;
          }

          // html5 A[download]
          if ('download' in a) {
            var blob = new Blob(
              [exporterOlderExcelCompatibility ? "\uFEFF" : '', csvContent],
              { type: strMimeType }
            );
            rawFile = URL.createObjectURL(blob);
            a.setAttribute('download', fileName);
          } else {
            rawFile = 'data: ' + strMimeType + ',' + encodeURIComponent(csvContent);
            a.setAttribute('target', '_blank');
          }

          a.href = rawFile;
          a.setAttribute('style', 'display:none;');
          D.body.appendChild(a);
          setTimeout(function() {
            if (a.click) {
              a.click();
              // Workaround for Safari 5
            } else if (document.createEvent) {
              var eventObj = document.createEvent('MouseEvents');
              eventObj.initEvent('click', true, true);
              a.dispatchEvent(eventObj);
            }
            D.body.removeChild(a);

          }, this.delay);
        },

        /**
         * @ngdoc function
         * @name pdfExport
         * @methodOf  ui.grid.exporter.service:uiGridExporterService
         * @description Exports rows from the grid in pdf format,
         * the data exported is selected based on the provided options.
         * Note that this function has a dependency on pdfMake, which must
         * be installed.  The resulting pdf opens in a new
         * browser window.
         * @param {Grid} grid the grid from which data should be exported
         * @param {string} rowTypes which rows to export, valid values are
         * uiGridExporterConstants.ALL, uiGridExporterConstants.VISIBLE,
         * uiGridExporterConstants.SELECTED
         * @param {string} colTypes which columns to export, valid values are
         * uiGridExporterConstants.ALL, uiGridExporterConstants.VISIBLE,
         * uiGridExporterConstants.SELECTED
         */
        pdfExport: function (grid, rowTypes, colTypes) {
          var self = this;

          this.loadAllDataIfNeeded(grid, rowTypes, colTypes).then(function () {
            var exportColumnHeaders = self.getColumnHeaders(grid, colTypes),
              exportData = self.getData(grid, rowTypes, colTypes),
              docDefinition = self.prepareAsPdf(grid, exportColumnHeaders, exportData);

            if (self.isIE() || navigator.appVersion.indexOf('Edge') !== -1) {
              self.downloadPDF(grid.options.exporterPdfFilename, docDefinition);
            } else {
              pdfMake.createPdf(docDefinition).open();
            }
          });
        },


        /**
         * @ngdoc function
         * @name downloadPdf
         * @methodOf  ui.grid.exporter.service:uiGridExporterService
         * @description Generates and retrieves the pdf as a blob, then downloads
         * it as a file.  Only used in IE, in all other browsers we use the native
         * pdfMake.open function to just open the PDF
         * @param {string} fileName the filename to give to the pdf, can be set
         * through exporterPdfFilename
         * @param {object} docDefinition a pdf docDefinition that we can generate
         * and get a blob from
         */
        downloadPDF: function (fileName, docDefinition) {
          var D = document,
            a = D.createElement('a'),
            ieVersion;

          ieVersion = this.isIE(); // This is now a boolean value
          var doc = pdfMake.createPdf(docDefinition);
          var blob;

          doc.getBuffer( function (buffer) {
            blob = new Blob([buffer]);

            // IE10+
            if (navigator.msSaveBlob) {
              return navigator.msSaveBlob(
                blob, fileName
              );
            }

            // Previously:  && ieVersion < 10
            // ieVersion now returns a boolean for the
            // sake of sanity. We just check `msSaveBlob` first.
            if (ieVersion) {
              var frame = D.createElement('iframe');
              document.body.appendChild(frame);

              frame.contentWindow.document.open('text/html', 'replace');
              frame.contentWindow.document.write(blob);
              frame.contentWindow.document.close();
              frame.contentWindow.focus();
              frame.contentWindow.document.execCommand('SaveAs', true, fileName);

              document.body.removeChild(frame);
              return true;
            }
          });
        },


        /**
         * @ngdoc function
         * @name renderAsPdf
         * @methodOf  ui.grid.exporter.service:uiGridExporterService
         * @description Renders the data into a pdf, and opens that pdf.
         *
         * @param {Grid} grid the grid from which data should be exported
         * @param {array} exportColumnHeaders an array of column headers,
         * where each header is an object with name, width and maybe alignment
         * @param {array} exportData an array of rows, where each row is
         * an array of column data
         * @returns {object} a pdfMake format document definition, ready
         * for generation
         */
        prepareAsPdf: function(grid, exportColumnHeaders, exportData) {
          var headerWidths = this.calculatePdfHeaderWidths( grid, exportColumnHeaders );

          var headerColumns = exportColumnHeaders.map( function( header ) {
            return { text: header.displayName, style: 'tableHeader' };
          });

          var stringData = exportData.map(this.formatRowAsPdf(this));

          var allData = [headerColumns].concat(stringData);

          var docDefinition = {
            pageOrientation: grid.options.exporterPdfOrientation,
            pageSize: grid.options.exporterPdfPageSize,
            content: [{
              style: 'tableStyle',
              table: {
                headerRows: 1,
                widths: headerWidths,
                body: allData
              }
            }],
            styles: {
              tableStyle: grid.options.exporterPdfTableStyle,
              tableHeader: grid.options.exporterPdfTableHeaderStyle
            },
            defaultStyle: grid.options.exporterPdfDefaultStyle
          };

          if ( grid.options.exporterPdfLayout ) {
            docDefinition.layout = grid.options.exporterPdfLayout;
          }

          if ( grid.options.exporterPdfHeader ) {
            docDefinition.header = grid.options.exporterPdfHeader;
          }

          if ( grid.options.exporterPdfFooter ) {
            docDefinition.footer = grid.options.exporterPdfFooter;
          }

          if ( grid.options.exporterPdfCustomFormatter ) {
            docDefinition = grid.options.exporterPdfCustomFormatter( docDefinition );
          }
          return docDefinition;

        },


        /**
         * @ngdoc function
         * @name calculatePdfHeaderWidths
         * @methodOf  ui.grid.exporter.service:uiGridExporterService
         * @description Determines the column widths base on the
         * widths we got from the grid.  If the column is drawn
         * then we have a drawnWidth.  If the column is not visible
         * then we have '*', 'x%' or a width.  When columns are
         * not visible they don't contribute to the overall gridWidth,
         * so we need to adjust to allow for extra columns
         *
         * Our basic heuristic is to take the current gridWidth, plus
         * numeric columns and call this the base gridwidth.
         *
         * To that we add 100 for any '*' column, and x% of the base gridWidth
         * for any column that is a %
         *
         * @param {Grid} grid the grid from which data should be exported
         * @param {array} exportHeaders array of header information
         * @returns {object} an array of header widths
         */
        calculatePdfHeaderWidths: function ( grid, exportHeaders ) {
          var baseGridWidth = 0;

          exportHeaders.forEach(function(value) {
            if (typeof(value.width) === 'number') {
              baseGridWidth += value.width;
            }
          });

          var extraColumns = 0;

          exportHeaders.forEach(function(value) {
            if (value.width === '*') {
              extraColumns += 100;
            }
            if (typeof(value.width) === 'string' && value.width.match(/(\d)*%/)) {
              var percent = parseInt(value.width.match(/(\d)*%/)[0]);

              value.width = baseGridWidth * percent / 100;
              extraColumns += value.width;
            }
          });

          var gridWidth = baseGridWidth + extraColumns;

          return exportHeaders.map(function( header ) {
            return header.width === '*' ? header.width : header.width * grid.options.exporterPdfMaxGridWidth / gridWidth;
          });
        },

        /**
         * @ngdoc function
         * @name formatRowAsPdf
         * @methodOf  ui.grid.exporter.service:uiGridExporterService
         * @description Renders a row in a format consumable by PDF,
         * mainly meaning casting everything to a string
         * @param {exporterService} exporter pass in exporter
         * @param {array} row the row to be turned into a csv string
         * @returns {string} a csv-ified version of the row
         */
        formatRowAsPdf: function ( exporter ) {
          return function( row ) {
            return row.map(exporter.formatFieldAsPdfString);
          };
        },


        /**
         * @ngdoc function
         * @name formatFieldAsCsv
         * @methodOf  ui.grid.exporter.service:uiGridExporterService
         * @description Renders a single field as a pdf-able field, which
         * is different from a csv field only in that strings don't have quotes
         * around them
         * @param {field} field the field to be turned into a pdf string,
         * may be of any type
         * @returns {string} a string-ified version of the field
         */
        formatFieldAsPdfString: function (field) {
          var returnVal;

          if (field.value == null) { // we want to catch anything null-ish, hence just == not ===
            returnVal = '';
          } else if (typeof(field.value) === 'number') {
            returnVal = field.value.toString();
          } else if (typeof(field.value) === 'boolean') {
            returnVal = (field.value ? 'TRUE' : 'FALSE') ;
          } else if (typeof(field.value) === 'string') {
            returnVal = field.value.replace(/"/g,'""');
          } else if (field.value instanceof Date) {
            returnVal = JSON.stringify(field.value).replace(/^"/,'').replace(/"$/,'');
          } else if (typeof(field.value) === 'object') {
            returnVal = field.value;
          } else {
            returnVal = JSON.stringify(field.value).replace(/^"/,'').replace(/"$/,'');
          }

          if (field.alignment && typeof(field.alignment) === 'string' ) {
            returnVal = { text: returnVal, alignment: field.alignment };
          }

          return returnVal;
        },

        /**
         * @ngdoc function
         * @name formatAsExcel
         * @methodOf  ui.grid.exporter.service:uiGridExporterService
         * @description Formats the column headers and data as a excel,
         * and sends that data to the user
         * @param {array} exportColumnHeaders an array of column headers,
         * where each header is an object with name, width and maybe alignment
         * @param {array} exportData an array of rows, where each row is
         * an array of column data
         * @param {string} separator a string that represents the separator to be used in the csv file
         * @returns {string} csv the formatted excel as a string
         */
        formatAsExcel: function (exportColumnHeaders, exportData, workbook, sheet, docDefinition) {
          var bareHeaders = exportColumnHeaders.map(function(header) {return { value: header.displayName };});

          var sheetData = [];
          var headerData = [];
          for (var i = 0; i < bareHeaders.length; i++) {
            // TODO - probably need callback to determine header value and header styling
            var exportStyle = 'header';
            switch (exportColumnHeaders[i].align) {
              case 'center':
                exportStyle = 'headerCenter';
                break;
              case 'right':
                exportStyle = 'headerRight';
                break;
            }
            var metadata = (docDefinition.styles && docDefinition.styles[exportStyle]) ? {style: docDefinition.styles[exportStyle].id} : null;
            headerData.push({value: bareHeaders[i].value, metadata: metadata});
          }
          sheetData.push(headerData);

          var result = exportData.map(this.formatRowAsExcel(this, workbook, sheet));
          for (var j = 0; j<result.length; j++) {
            sheetData.push(result[j]);
          }
          return sheetData;
        },

        /**
         * @ngdoc function
         * @name formatRowAsExcel
         * @methodOf  ui.grid.exporter.service:uiGridExporterService
         * @description Renders a single field as a csv field, including
         * quotes around the value
         * @param {exporterService} exporter pass in exporter
         * @param {array} row the row to be turned into a excel string
         * @returns {array} array of cell objects (i.e. {value: x, metadata: y})
         */
        formatRowAsExcel: function (exporter, workbook, sheet) {
          return function (row) {
            var values = [];
            for (var i = 0; i<row.length; i++) {
              var value = exporter.formatFieldAsExcel(row[i], workbook, sheet);
              values.push({value: value, metadata: row[i].metadata});
            }
            return values;
          };
        },

        /**
         * @ngdoc function
         * @name formatFieldAsExcel
         * @methodOf  ui.grid.exporter.service:uiGridExporterService
         * @description Renders a single field as a excel-ified field
         * @param {field} field the field to be excel-ified,
         * may be of any type
         * @returns {string} a excel-ified version of the field
         */
        formatFieldAsExcel: function (field, workbook, sheet, formatters) {
          if (field.value == null) { // we want to catch anything null-ish, hence just == not ===
            return '';
          }
          if ((typeof(field.value) === 'number') || (typeof(field.value) === 'string')) {
            return field.value;
          }
          if (typeof(field.value) === 'boolean') {
            return (field.value ? 'TRUE' : 'FALSE') ;
          }

          return JSON.stringify(field.value);
        },

        prepareAsExcel: function(grid, workbook, sheet) {
          var docDefinition = {
            styles: {

            }
          };

          if ( grid.options.exporterExcelCustomFormatters ) {
            docDefinition = grid.options.exporterExcelCustomFormatters( grid, workbook, docDefinition );
          }
          if ( grid.options.exporterExcelHeader ) {
            if (angular.isFunction( grid.options.exporterExcelHeader )) {
              grid.options.exporterExcelHeader(grid, workbook, sheet, docDefinition);
            } else {
              var headerText = grid.options.exporterExcelHeader.text;
              var style = grid.options.exporterExcelHeader.style;
              sheet.data.push([{value: headerText, metadata: {style: docDefinition.styles[style].id}}]);
            }
          }

          return docDefinition;
        },

        excelExport: function (grid, rowTypes, colTypes) {
          var self = this;
          this.loadAllDataIfNeeded(grid, rowTypes, colTypes).then(function() {
            var exportColumnHeaders = grid.options.showHeader ? self.getColumnHeaders(grid, colTypes) : [];

            var workbook = new ExcelBuilder.Workbook();
            var aName = grid.options.exporterExcelSheetName ? grid.options.exporterExcelSheetName : 'Sheet1';
            var sheet = new ExcelBuilder.Worksheet({name: aName});
            workbook.addWorksheet(sheet);
            var docDefinition = self.prepareAsExcel(grid, workbook, sheet);

            // The standard column width in Microsoft Excel 2000 is 8.43 characters based on fixed-width Courier font
            // Width of 10 in excel is 75 pixels
            var colWidths = [];
            var startDataIndex = grid.treeBase ? grid.treeBase.numberLevels : (grid.enableRowSelection ? 1 : 0);
            for (var i = startDataIndex; i < grid.columns.length; i++) {
              if (grid.columns[i].field !== uiGridExporterConstants.rowHeaderColName &&
                grid.columns[i].field !== uiGridExporterConstants.selectionRowHeaderColName) {

                colWidths.push({width: (grid.columns[i].drawnWidth / grid.options.exporterColumnScaleFactor)});
              }
            }
            sheet.setColumns(colWidths);

            var exportData = self.getData(grid, rowTypes, colTypes, grid.options.exporterFieldApplyFilters);

            var excelContent = self.formatAsExcel(exportColumnHeaders, exportData, workbook, sheet, docDefinition);
            sheet.setData(sheet.data.concat(excelContent));

            ExcelBuilder.Builder.createFile(workbook, {type: 'blob'}).then(function(result) {
              self.downloadFile (grid.options.exporterExcelFilename, result, grid.options.exporterCsvColumnSeparator,
                grid.options.exporterOlderExcelCompatibility);
            });
          });
        }
      };

      function getDisplayName(grid, gridCol) {
        if (grid.options.exporterHeaderFilter) {
          return grid.options.exporterHeaderFilterUseName ?
            grid.options.exporterHeaderFilter(gridCol.name) :
            grid.options.exporterHeaderFilter(gridCol.displayName);
        }

        return gridCol.headerCellFilter ?
          $filter(gridCol.headerCellFilter)(gridCol.displayName) :
          gridCol.displayName;
      }

      function defaultExporterFieldCallback(grid, row, col, value) {
        // fix to handle cases with 'number : 1' or 'date:MM-dd-YYYY', etc.. We needed to split the string
        if (col.cellFilter) {
					var args, filter, arg1, arg2;
					// remove space, single/double to mantein retro-compatibility
					args = col.cellFilter.replace(/[\'\"\s]/g, "").split(':');
					filter = args[0] ? args[0] : null;
					arg1 = args[1] ? args[1] : null;
					arg2 = args[2] ? args[2] : null;
          return $filter(filter)(value, arg1, arg2);
        } else {
          return value;
        }
      }

      return service;
    }
  ]);

  /**
   *  @ngdoc directive
   *  @name ui.grid.exporter.directive:uiGridExporter
   *  @element div
   *  @restrict A
   *
   *  @description Adds exporter features to grid
   *
   *  @example
   <example module="app">
   <file name="app.js">
   var app = angular.module('app', ['ui.grid', 'ui.grid.exporter']);

   app.controller('MainCtrl', ['$scope', function ($scope) {
      $scope.data = [
        { name: 'Bob', title: 'CEO' },
            { name: 'Frank', title: 'Lowly Developer' }
      ];

      $scope.gridOptions = {
        enableGridMenu: true,
        exporterMenuCsv: false,
        columnDefs: [
          {name: 'name', enableCellEdit: true},
          {name: 'title', enableCellEdit: true}
        ],
        data: $scope.data
      };
    }]);
   </file>
   <file name="index.html">
   <div ng-controller="MainCtrl">
   <div ui-grid="gridOptions" ui-grid-exporter></div>
   </div>
   </file>
   </example>
   */
  module.directive('uiGridExporter', ['uiGridExporterConstants', 'uiGridExporterService', 'gridUtil', '$compile',
    function (uiGridExporterConstants, uiGridExporterService, gridUtil, $compile) {
      return {
        replace: true,
        priority: 0,
        require: '^uiGrid',
        scope: false,
        link: function ($scope, $elm, $attrs, uiGridCtrl) {
          uiGridExporterService.initializeGrid(uiGridCtrl.grid);
          uiGridCtrl.grid.exporter.$scope = $scope;
        }
      };
    }
  ]);
})();

angular.module('ui.grid.exporter').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('ui-grid/csvLink',
    "<span class=\"ui-grid-exporter-csv-link-span\"><a href=\"data:text/csv;charset=UTF-8,CSV_CONTENT\" download=\"FILE_NAME\">LINK_LABEL</a></span>"
  );

}]);
