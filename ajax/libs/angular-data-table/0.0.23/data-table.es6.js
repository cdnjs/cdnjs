(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('angular')) :
  typeof define === 'function' && define.amd ? define(['angular'], factory) :
  global.DataTable = factory(angular);
}(this, function (angular) { 'use strict';

  /**
   * Array.prototype.find()
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
   */
  (function() {
    function polyfill(fnName) {
      if (!Array.prototype[fnName]) {
        Array.prototype[fnName] = function(predicate /*, thisArg */ ) {
          var i, len, test, thisArg = arguments[1];

          if (typeof predicate !== "function") {
            throw new TypeError();
          }

          test = !thisArg ? predicate : function() {
            return predicate.apply(thisArg, arguments);
          };

          for (i = 0, len = this.length; i < len; i++) {
            if (test(this[i], i, this) === true) {
              return fnName === "find" ? this[i] : i;
            }
          }

          if (fnName !== "find") {
            return -1;
          }
        };
      }
    }

    for (var i in {
        find: 1,
        findIndex: 1
      }) {
      polyfill(i);
    }
  }());


  /**
   * A helper for scrolling the body to a specific scroll position
   * when the footer pager is invoked.
   */
  var BodyHelper = function(){
    var _elm;
    return {
      create: function(elm){
        _elm = elm;
      },
      setYOffset: function(offsetY){
        _elm[0].scrollTop = offsetY;
      }
    }
  }();


  /**
   * Shim layer with setTimeout fallback
   * http://www.html5rocks.com/en/tutorials/speed/animations/
   */
  var requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            function( callback ){
              window.setTimeout(callback, 1000 / 60);
            };
  })();

  function BodyDirective($timeout){
    return {
      restrict: 'E',
      controller: 'BodyController',
      controllerAs: 'body',
      scope: {
        columns: '=',
        columnWidths: '=',
        rows: '=',
        options: '=',
        selected: '=?',
        expanded: '=?',
        onPage: '&',
        onTreeToggle: '&',
        onSelect: '&',
        onRowClick: '&'
      },
      template: `
        <div class="dt-body" ng-style="body.styles()">
          <div class="dt-body-scroller" ng-style="body.scrollerStyles()">
            <dt-group-row ng-repeat-start="r in body.tempRows track by $index"
                          ng-if="r.group"
                          ng-style="body.groupRowStyles(this, r)" 
                          on-group-toggle="body.onGroupToggle(this, group)"
                          expanded="body.getRowExpanded(this, r)"
                          tabindex="{{$index}}"
                          row="r">
            </dt-group-row>
            <dt-row ng-repeat-end
                    ng-if="!r.group"
                    row="body.getRowValue($index)"
                    tabindex="{{$index}}"
                    columns="columns"
                    column-widths="columnWidths"
                    ng-keydown="body.keyDown($event, $index, r)"
                    ng-click="body.rowClicked($event, $index, r)"
                    on-tree-toggle="body.onTreeToggle(this, row, cell)"
                    ng-class="body.rowClasses(this, r)"
                    options="options"
                    selected="body.isSelected(r)"
                    on-checkbox-change="body.onCheckboxChange($index, row)"
                    columns="body.columnsByPin"
                    has-children="body.getRowHasChildren(r)"
                    expanded="body.getRowExpanded(this, r)"
                    ng-style="body.rowStyles(this, r)">
            </dt-row>
          </div>
          <div ng-if="rows && !rows.length" 
               class="empty-row" 
               ng-bind="::options.emptyMessage">
         </div>
         <div ng-if="rows === undefined" 
               class="loading-row"
               ng-bind="::options.loadingMessage">
         </div>
        </div>`,
      replace:true,
      link: function($scope, $elm, $attrs, ctrl){
        var ticking = false,
            lastScrollY = 0,
            lastScrollX = 0,
            helper = BodyHelper.create($elm);

        function update(){
          $timeout(() => {
            $scope.options.internal.offsetY = lastScrollY;
            $scope.options.internal.offsetX = lastScrollX;
            ctrl.updatePage();
          });

          ticking = false;
        };

        function requestTick() {
          if(!ticking) {
            requestAnimFrame(update);
            ticking = true;
          }
        };

        $elm.on('scroll', function(ev) {
          lastScrollY = this.scrollTop;
          lastScrollX = this.scrollLeft;
          requestTick();
        });
      }
    };
  }


  /**
   * Calculates the Total Flex Grow width.
   * @param {array}
   */
  function GetTotalFlexGrow(columns){
    var totalFlexGrow = 0;

    for (let c of columns) {
      totalFlexGrow += c.flexGrow || 0;
    }

    return totalFlexGrow;
  }


  /**
   * Calculates the total width of all columns and their groups
   * @param {array} columns
   * @param {string} property width to get
   */
  function ColumnTotalWidth(columns, prop) {
    var totalWidth = 0;

    columns.forEach((c) => {
      var has = prop && c[prop];
      totalWidth = totalWidth + (has ? c[prop] : c.width);
    });

    return totalWidth;
  }


  /**
   * Distributes the flex widths to the columns
   * @param {array} columns
   * @param {int} flex width
   */
  function DistributeFlexWidth(columns, flexWidth) {
    if (flexWidth <= 0) {
      return {
        columns: columns,
        width: ColumnTotalWidth(columns),
      };
    }

    var remainingFlexGrow = GetTotalFlexGrow(columns),
        remainingFlexWidth = flexWidth,
        totalWidth = 0;

    for(var i=0, len=columns.length; i < len; i++) {
      var column = columns[i];

      if (!column.flexGrow) {
        totalWidth += column.width;
        return;
      }

      var columnFlexWidth = Math.floor(column.flexGrow / remainingFlexGrow * remainingFlexWidth),
          newColumnWidth = Math.floor(column.width + columnFlexWidth);

      if(column.minWidth && newColumnWidth < column.minWidth){
        newColumnWidth = column.minWidth;
      }

      if(column.maxWidth && newColumnWidth > column.maxWidth){
        newColumnWidth = column.maxWidth;
      }

      totalWidth += newColumnWidth;
      remainingFlexGrow -= column.flexGrow;
      remainingFlexWidth -= columnFlexWidth;

      column.width = newColumnWidth;
    }

    return {
      width: totalWidth
    };
  }


  /**
   * Returns the columns by pin.
   * @param {array} colsumns
   */
  function ColumnsByPin(cols){
    var ret = {
      left: [],
      center: [],
      right: []
    };

    for(var i=0, len=cols.length; i < len; i++) {
      var c = cols[i];
      if(c.frozenLeft){
        ret.left.push(c)
      } else if(c.frozenRight){
        ret.right.push(c);
      } else {
        ret.center.push(c);
      }
    }

    return ret;
  }


  /**
   * Adjusts the column widths.
   * Inspired by: https://github.com/facebook/fixed-data-table/blob/master/src/FixedDataTableWidthHelper.js
   * @param {array} all columns
   * @param {int} width
   */
  function AdjustColumnWidths(allColumns, expectedWidth){
    var columnsWidth = ColumnTotalWidth(allColumns),
        remainingFlexGrow = GetTotalFlexGrow(allColumns),
        remainingFlexWidth = Math.max(expectedWidth - columnsWidth, 0),
        colsByGroup = ColumnsByPin(allColumns);

    angular.forEach(colsByGroup, (cols) => {
      var columnGroupFlexGrow = GetTotalFlexGrow(cols),
          columnGroupFlexWidth = Math.floor(columnGroupFlexGrow / remainingFlexGrow * remainingFlexWidth),
          newColumnSettings = DistributeFlexWidth(cols, columnGroupFlexWidth);

      remainingFlexGrow -= columnGroupFlexGrow;
      remainingFlexWidth -= columnGroupFlexWidth;
    });
  }


  /**
   * Returns the widths of all group sets of a column
   * @param {object} groups 
   * @param {array} all 
   */
  function ColumnGroupWidths(groups, all){
    return {
      left: ColumnTotalWidth(groups.left),
      center: ColumnTotalWidth(groups.center),
      right: ColumnTotalWidth(groups.right),
      total: ColumnTotalWidth(all)
    };
  }


  /**
   * Forces the width of the columns to 
   * distribute equally but overflowing when nesc.
   *
   * Rules:
   *
   *  - If combined withs are less than the total width of the grid, 
   *    proporation the widths given the min / max / noraml widths to fill the width.
   *
   *  - If the combined widths, exceed the total width of the grid, 
   *    use the standard widths.
   *
   *  - If a column is resized, it should always use that width
   *
   *  - The proporational widths should never fall below min size if specified.
   *
   *  - If the grid starts off small but then becomes greater than the size ( + / - )
   *    the width should use the orginial width; not the newly proporatied widths.
   * 
   * @param {array} allColumns 
   * @param {int} expectedWidth
   */
  function ForceFillColumnWidths(allColumns, expectedWidth, startIdx){
    var colsByGroup = ColumnsByPin(allColumns),
        widthsByGroup = ColumnGroupWidths(colsByGroup, allColumns),
        availableWidth = expectedWidth - (widthsByGroup.left + widthsByGroup.right),
        centerColumns = allColumns.filter((c) => { return !c.frozenLeft && !c.frozenRight }),
        contentWidth = 0,
        columnsToResize = startIdx > -1 ? 
          allColumns.slice(startIdx, allColumns.length).filter((c) => { return !c.$$resized }) :
          allColumns.filter((c) => { return !c.$$resized });

    allColumns.forEach((c) => {
      if(c.$$resized){
        contentWidth = contentWidth + c.width;
      } else {
        contentWidth = contentWidth + (c.$$oldWidth || c.width);
      }
    });

    var remainingWidth = availableWidth - contentWidth,
        additionWidthPerColumn = Math.floor(remainingWidth / colsByGroup.center.length),
        exceedsWindow = contentWidth > widthsByGroup.center;

    columnsToResize.forEach((column) => {
      if(exceedsWindow){
        column.width = column.$$oldWidth || column.width;
      } else {
        if(!column.$$oldWidth){
          column.$$oldWidth = column.width;
        }

        var newSize = column.$$oldWidth + additionWidthPerColumn;
        if(column.minWith && newSize < column.minWidth){
          column.width = column.minWidth;
        } else if(column.maxWidth && newSize > column.maxWidth){
          column.width = column.maxWidth;
        } else {
          column.width = newSize;
        }
      }
    });
  }


  /**
   * Converts strings from something to camel case
   * http://stackoverflow.com/questions/10425287/convert-dash-separated-string-to-camelcase
   * @param  {string} str 
   * @return {string} camel case string
   */
  function CamelCase(str) {
    // Replace special characters with a space
    str = str.replace(/[^a-zA-Z0-9 ]/g, " ");
    // put a space before an uppercase letter
    str = str.replace(/([a-z](?=[A-Z]))/g, '$1 ');
    // Lower case first character and some other stuff
    str = str.replace(/([^a-zA-Z0-9 ])|^[0-9]+/g, '').trim().toLowerCase();
    // uppercase characters preceded by a space or number
    str = str.replace(/([ 0-9]+)([a-zA-Z])/g, function(a,b,c) {
        return b.trim()+c.toUpperCase();
    });
    return str;
  }


  /**
   * Creates a unique object id.
   */
  function ObjectId() {
    var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function () {
        return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();
  }


  /**
   * Default Column Options
   * @type {object}
   */
  var ColumnDefaults = Object.freeze({

    // pinned to the left
    frozenLeft: false,
    
    // pinned to the right
    frozenRight: false,

    // body cell css class name
    className: undefined,

    // header cell css class name
    heaerClassName: undefined,

    // The grow factor relative to other columns. Same as the flex-grow 
    // API from http://www.w3.org/TR/css3-flexbox/. Basically, 
    // take any available extra width and distribute it proportionally 
    // according to all columns' flexGrow values.
    flexGrow: 0,

    // Minimum width of the column.
    minWidth: undefined,

    //Maximum width of the column.
    maxWidth: undefined,

    // The width of the column, by default (in pixels).
    width: 150,

    // If yes then the column can be resized, otherwise it cannot.
    resizable: true,

    // Custom sort comparator
    // pass false if you want to server sort
    comparator: undefined, 

    // If yes then the column can be sorted.
    sortable: true,

    // Default sort asecending/descending for the column
    sort: undefined,

    // The cell renderer that returns content for table column header
    headerRenderer: undefined,

    // The cell renderer function(scope, elm) that returns React-renderable content for table cell.
    cellRenderer: undefined,

    // The getter function(value) that returns the cell data for the cellRenderer. 
    // If not provided, the cell data will be collected from row data instead. 
    cellDataGetter: undefined,

    // Adds +/- button and makes a secondary call to load nested data
    isTreeColumn: false,

    // Adds the checkbox selection to the column
    isCheckboxColumn: false,

    // Toggles the checkbox column in the header
    // for selecting all values given to the grid
    headerCheckbox: false

  });


  /**
   * Default Table Options
   * @type {object}
   */
  var TableDefaults = Object.freeze({

    // Enable vertical scrollbars
    scrollbarV: true,

    // Enable horz scrollbars
    // scrollbarH: true,

    // The row height, which is necessary 
    // to calculate the height for the lazy rendering.
    rowHeight: 30,

    // flex
    // force
    // standard
    columnMode: 'standard',

    // Loading message presented when the array is undefined
    loadingMessage: 'Loading...',

    // Message to show when array is presented
    // but contains no values
    emptyMessage: 'No data to display',

    // The minimum header height in pixels.
    // pass falsey for no header
    headerHeight: 30,

    // The minimum footer height in pixels.
    // pass falsey for no footer
    footerHeight: 0,

    paging: {
      // if external paging is turned on
      externalPaging: false, 

      // Page size
      size: undefined,

      // Total count
      count: 0,

      // Page offset
      offset: 0
    },

    // if users can select itmes
    selectable: false,

    // if users can select mutliple items
    multiSelect: false,

    // checkbox selection vs row click
    checkboxSelection: false,

    // if you can reorder columns
    reorderable: true,

    internal: {
      offsetX: 0,
      offsetY: 0,
      innerWidth: 0,
      bodyHeight: 300
    }

  });

  class DataTableController {

    /**
     * Creates an instance of the DataTable Controller
     * @param  {scope}
     * @param  {filter}
     */
    /*@ngInject*/
  	constructor($scope, $filter, $log, $transclude){
      angular.extend(this, {
        $scope: $scope,
        $filter: $filter,
        $log: $log
      });

      // set scope to the parent
      $scope.options.$outer = $scope.$parent;

      this.defaults($scope);
      $scope.$watch('options.columns', (newVal, oldVal) => {
        if(newVal.length > oldVal.length){
          this.transposeColumnDefaults(newVal);
        }

        if(newVal.length !== oldVal.length){
          this.adjustColumns();
        }

        this.calculateColumns();
      }, true);

      // Gets the column nodes to transposes to column objects
      // http://stackoverflow.com/questions/30845397/angular-expressive-directive-design/30847609#30847609
      $transclude((clone,scope) => {
        var cols = clone[0].getElementsByTagName('column');
        this.buildColumns($scope, cols);
        this.transposeColumnDefaults($scope.options.columns);
      });
  	}

    /**
     * Create columns from elements
     * @param  {array} columnElms 
     */
    buildColumns(scope, columnElms){
      if(columnElms && columnElms.length){
        var columns = [];

        angular.forEach(columnElms, (c) => {
          var column = {};

          angular.forEach(c.attributes, (attr) => {
            var attrName = CamelCase(attr.name);

            if(ColumnDefaults.hasOwnProperty(attrName)){
              var val = attr.value;

              if(!isNaN(attr.value)){
                val = parseInt(attr.value);
              }

              column[attrName] = val;
            }

            // cuz putting className vs class on 
            // a element feels weird
            if(attrName === 'class'){
              column.className = attr.value;
            }

            if(attrName === 'name'){
              column.name = attr.value;
            }
          });

          if(c.innerHTML !== ''){
            column.template = c.innerHTML;
          }

          columns.push(column);
        });

        scope.options.columns = columns;
      }
    }

    /**
     * Creates and extends default options for the grid control
     * @param  {scope}
     */
    defaults($scope){
      $scope.expanded = $scope.expanded || {};

      var options = angular.extend(angular.
        copy(TableDefaults), $scope.options);

      options.paging = angular.extend(angular.copy(TableDefaults.paging),
        $scope.options.paging);

      $scope.options = options;

      if($scope.options.selectable && $scope.options.multiSelect){
        $scope.selected = $scope.selected || [];
      }

      // default sort
      var watch = $scope.$watch('rows', (newVal) => {
        if(newVal){
          watch();
          this.onSort($scope);
        }
      });
    }

    /**
     * On init or when a column is added, we need to
     * make sure all the columns added have the correct
     * defaults applied.
     * @param  {Object} columns
     */
    transposeColumnDefaults(columns){
      for(var i=0, len = columns.length; i < len; i++) {
        var column = columns[i];
        column = angular.extend(angular.copy(ColumnDefaults), column);
        column.$id = ObjectId();

        if(column.name && !column.prop){
          column.prop = CamelCase(column.name);
        }

        columns[i] = column;
      }
    }

    /**
     * Calculate column groups and widths
     */
    calculateColumns(){
      var columns = this.$scope.options.columns;
      this.columnsByPin = ColumnsByPin(columns);
      this.columnWidths = ColumnGroupWidths(this.columnsByPin, columns);
    }

    /**
     * Returns the css classes for the data table.
     * @param  {scope}
     * @return {style object}
     */
    tableCss(scope){
      return {
        'fixed': scope.options.scrollbarV,
        'selectable': scope.options.selectable,
        'checkboxable': scope.options.checkboxSelection
      };
    }

    /**
     * Adjusts the column widths to handle greed/etc.
     * @param  {int} forceIdx 
     */
    adjustColumns(forceIdx){
      var width = this.$scope.options.internal.innerWidth - 
        this.$scope.options.internal.scrollBarWidth;
        
      if(this.$scope.options.columnMode === 'force'){
        ForceFillColumnWidths(this.$scope.options.columns, width, forceIdx);
      } else if(this.$scope.options.columnMode === 'flex') {
        AdjustColumnWidths(this.$scope.options.columns, width);
      }
    }

    /**
     * Calculates the page size given the height * row height.
     * @return {[type]}
     */
    calculatePageSize(){
      this.$scope.options.paging.size = Math.ceil(
        this.$scope.options.internal.bodyHeight / this.$scope.options.rowHeight) + 1;
    }

    /**
     * Sorts the values of the grid for client side sorting.
     * @param  {scope}
     */
    onSort(scope){
      if(!scope.rows) return;

      var sorts = scope.options.columns.filter((c) => {
        return c.sort;
      });

      if(sorts.length){
        if(this.$scope.onSort){
          this.$scope.onSort({ sorts: sorts });
        }

        var clientSorts = [];
        for(var i=0, len=sorts.length; i < len; i++) {
          var c = sorts[i];
          if(c.comparator !== false){
            var dir = c.sort === 'asc' ? '' : '-';
            clientSorts.push(dir + c.prop);
          }
        }

        if(clientSorts.length){
          // todo: more ideal to just resort vs splice and repush
          // but wasn't responding to this change ...
          var sortedValues = this.$filter('orderBy')(scope.rows, clientSorts);
          scope.rows.splice(0, scope.rows.length);
          scope.rows.push(...sortedValues);
        }
      }

      BodyHelper.setYOffset(0);
    }

    /**
     * Invoked when a tree is collasped/expanded
     * @param  {scope}
     * @param  {row model}
     * @param  {cell model}
     */
    onTreeToggle(scope, row, cell){
      scope.onTreeToggle({
        row: row,
        cell: cell
      });
    }

    /**
     * Invoked when the body triggers a page change.
     * @param  {scope}
     * @param  {offset}
     * @param  {size}
     */
    onBodyPage(scope, offset, size){
      scope.onPage({
        offset: offset,
        size: size
      });
    }

    /**
     * Invoked when the footer triggers a page change.
     * @param  {scope}
     * @param  {offset}
     * @param  {size}
     */
    onFooterPage(scope, offset, size){
      var pageBlockSize = scope.options.rowHeight * size,
          offsetY = pageBlockSize * offset;

      BodyHelper.setYOffset(offsetY);
    }

    /**
     * Invoked when the header checkbox directive has changed.
     * @param  {scope}
     */
    onHeaderCheckboxChange(scope){
      if(scope.rows){
        var matches = scope.selected.length === scope.rows.length;
        scope.selected.splice(0, scope.selected.length);

        if(!matches){
          scope.selected.push(...scope.rows);
        }
      }
    }

    /**
     * Returns if all the rows are selected
     * @param  {scope}  scope
     * @return {Boolean} if all selected
     */
    isAllRowsSelected(scope){
      if(!scope.rows) return false;
      return scope.selected.length === scope.rows.length;
    }

    /**
     * Occurs when a header directive triggered a resize event
     * @param  {object} scope
     * @param  {object} column
     * @param  {int} width
     */
    onResize(scope, column, width){
      var idx = scope.options.columns.indexOf(column);
      if(idx > -1){
        var column = scope.options.columns[idx];
        column.width = width;
        column.$$resized = true;

        this.adjustColumns(idx);
        this.calculateColumns();
      }
    }

    /**
     * Occurs when a row was selected
     * @param  {object} scope 
     * @param  {object} rows   
     */
    onSelect(scope, rows){
      scope.onSelect({
        rows: rows
      });
    }

    /**
     * Occurs when a row was click but may not be selected.
     * @param  {object} scope 
     * @param  {object} row   
     */
    onRowClick(scope, row){
      scope.onRowClick({
        row: row
      });
    }

  }

  function PagerDirective(){
    return {
      restrict: 'E',
      controller: 'PagerController',
      controllerAs: 'pager',
      scope: {
        page: '=',
        size: '=',
        count: '=',
        onPage: '&'
      },
      template: 
        `<div class="dt-pager">
          <ul class="pager">
            <li ng-class="{ disabled: !pager.canPrevious(this) }">
              <a href ng-click="pager.selectPage(this, 1)" class="icon-left"></a>
            </li>
            <li ng-repeat="pg in pager.pages track by $index" ng-class="{ active: pg.active }">
              <a href ng-click="pager.selectPage(this, pg.number)">{{pg.text}}</a>
            </li>
            <li ng-class="{ disabled: !pager.canNext(this) }">
              <a href ng-click="pager.selectPage(this, pager.totalPages)" class="icon-right"></a>
            </li>
          </ul>
        </div>`,
      replace: true
    };
  }

  class PagerController {

    /**
     * Creates an instance of the Pager Controller
     * @param  {object} $scope   
     */
    /*@ngInject*/
    constructor($scope){
      $scope.$watch('count', (newVal) => {
        this.calcTotalPages($scope.size, $scope.count);
        this.getPages($scope.page || 1);
      });

      $scope.$watch('page', (newVal) => {
        if (newVal !== 0 && newVal <= this.totalPages) {
          this.getPages(newVal);
        }
      });
      
      this.getPages($scope.page || 1);
    }

    /**
     * Calculates the total number of pages given the count.
     * @return {int} page count
     */
    calcTotalPages(size, count) {
      var count = size < 1 ? 1 : Math.ceil(count / size);
      this.totalPages = Math.max(count || 0, 1);
    }

    /**
     * Select a page
     * @param  {object} scope 
     * @param  {int} num   
     */
    selectPage(scope, num){
      if (num > 0 && num <= this.totalPages) {
        scope.page = num;
        scope.onPage({
          page: num
        });
      }
    }

    /**
     * Determines if the pager can go previous
     * @param  {scope} scope 
     * @return {boolean}
     */
    canPrevious(scope){
      return scope.page !== 1;
    }

    /**
     * Determines if the pager can go forward
     * @param  {object} scope 
     * @return {boolean}       
     */
    canNext(scope){
      return scope.page <= this.totalPages;
    }

    /**
     * Gets the page set given the current page
     * @param  {int} page 
     */
    getPages(page) {
      var pages = [],
          startPage = 1, 
          endPage = this.totalPages,
          maxSize = 5,
          isMaxSized = maxSize < this.totalPages;

      if (isMaxSized) {
        startPage = ((Math.ceil(page / maxSize) - 1) * maxSize) + 1;
        endPage = Math.min(startPage + maxSize - 1, this.totalPages);
      }

      for (var number = startPage; number <= endPage; number++) {
        pages.push({
          number: number,
          text: number,
          active: number === page
        });
      }

      if (isMaxSized) {
        if (startPage > 1) {
          pages.unshift({
            number: startPage - 1,
            text: '...'
          });
        }

        if (endPage < this.totalPages) {
          pages.push({
            number: endPage + 1,
            text: '...'
          });
        }
      }

      this.pages = pages;
    }

  }

  function FooterDirective(){
    return {
      restrict: 'E',
      controller: 'FooterController',
      controllerAs: 'footer',
      scope: {
        paging: '=',
        onPage: '&'
      },
      template:
        `<div class="dt-footer">
          <div class="page-count">{{paging.count}} total</div>
          <dt-pager page="page"
                 size="paging.size"
                 count="paging.count"
                 on-page="footer.onPage(this, page)"
                 ng-show="paging.count > 1">
           </dt-pager>
        </div>`,
      replace: true
    };
  }

  class FooterController {

    /**
     * Creates an instance of the Footer Controller
     * @param  {scope}
     * @return {[type]}
     */
    /*@ngInject*/
    constructor($scope){
      $scope.page = $scope.paging.offset + 1;
      $scope.$watch('paging.offset', (newVal) => {
        this.offsetChanged($scope, newVal)
      });
    }

    /**
     * The offset ( page ) changed externally, update the page
     * @param  {new offset}
     */
    offsetChanged(scope, newVal){
      scope.page = newVal + 1;
    }

    /**
     * The pager was invoked
     * @param  {scope}
     */
    onPage(scope, page){
      scope.paging.offset = page - 1;
      scope.onPage({
        offset: scope.paging.offset,
        size: scope.paging.size
      });
    }

  }

  function CellDirective($rootScope, $compile, $log){
    return {
      restrict: 'E',
      controller: 'CellController',
      controllerAs: 'cell',
      scope: {
        options: '=',
        value: '=',
        selected: '=',
        column: '=',
        row: '=',
        expanded: '=',
        hasChildren: '=',
        onTreeToggle: '&',
        onCheckboxChange: '&'
      },
      template: 
        `<div class="dt-cell" 
              data-title="{{::column.name}}" 
              ng-style="cell.styles(column)"
              ng-class="cell.cellClass(column)">
          <label ng-if="column.isCheckboxColumn" class="dt-checkbox">
            <input type="checkbox" 
                   ng-checked="selected"
                   ng-click="cell.onCheckboxChange($event, this)" />
          </label>
          <span ng-if="column.isTreeColumn && hasChildren"
                ng-class="cell.treeClass(this)"
                ng-click="cell.onTreeToggle($event, this)"></span>
          <span class="dt-cell-content"></span>
        </div>`,
      replace: true,
      compile: function() {
        return {
          pre: function($scope, $elm, $attrs, ctrl) {
            var content = angular.element($elm[0].querySelector('.dt-cell-content'));
            $scope.$outer = $scope.options.$outer;
            
            $scope.$watch('value', () => {
              content.empty();
              
              if($scope.column.template){
                var elm = angular.element(`<span>${$scope.column.template.trim()}</span>`);
                content.append($compile(elm)($scope));
              } else if($scope.column.cellRenderer){
                var elm = angular.element($scope.column.cellRenderer($scope, content));
                content.append($compile(elm)($scope));
              } else {
                content[0].innerHTML = ctrl.getValue($scope);
              }
            });
          }
        }
      }
    };
  }

  class CellController {

    /**
     * Calculates the styles for the Cell Directive
     * @param  {column}
     * @return {styles object}
     */
    styles(col){
      return {
        width: col.width  + 'px'
      };
    }

    /**
     * Calculates the css classes for the cell directive
     * @param  {column}
     * @return {class object}
     */
    cellClass(col){
      var style = {
        'dt-tree-col': col.isTreeColumn
      };

      if(col.className){
        style[col.className] = true;
      }

      return style;
    }

    /**
     * Calculates the tree class styles.
     * @param  {scope}
     * @return {css classes object}
     */
    treeClass(scope){
      return {
        'dt-tree-toggle': true,
        'icon-right': !scope.expanded,
        'icon-down': scope.expanded
      }
    }

    /**
     * Invoked when the tree toggle button was clicked.
     * @param  {event}
     * @param  {scope}
     */
    onTreeToggle(evt, scope){
      evt.stopPropagation();
      scope.expanded = !scope.expanded;
      scope.onTreeToggle({ 
        cell: {
          value: scope.value,
          column: scope.column,
          expanded: scope.expanded
        }
      });
    }

    /**
     * Invoked when the checkbox was changed
     * @param  {object} event 
     * @param  {object} scope 
     */
    onCheckboxChange(event, scope){
      event.stopPropagation();
      scope.onCheckboxChange();
    }

    /**
     * Returns the value in its fomatted form
     * @param  {object} scope 
     * @return {string} value
     */
    getValue(scope){
      var val = scope.column.cellDataGetter ? 
        scope.column.cellDataGetter(scope.value) : scope.value;

      if(val === undefined || val === null) val = '';

      return val;
    }

  }

  function GroupRowDirective(){
    return {
      restrict: 'E',
      controller: 'GroupRowController',
      controllerAs: 'group',
      scope: {
        row: '=',
        onGroupToggle: '&',
        expanded: '='
      },
      replace:true,
      template: `
        <div class="dt-group-row">
          <span ng-class="group.treeClass(this)"
                ng-click="group.onGroupToggle($event, this)">
          </span>
          <span class="dt-group-row-label">
            {{row.name}}
          </span>
        </div>`
    };
  }

  class GroupRowController {

    onGroupToggle(evt, scope){
      evt.stopPropagation();
      scope.onGroupToggle({
        group: scope.row
      });
    }

    treeClass(scope){
      return {
        'dt-tree-toggle': true,
        'icon-right': !scope.expanded,
        'icon-down': scope.expanded
      };
    }

  }

  function RowDirective(){
    return {
      restrict: 'E',
      controller: 'RowController',
      controllerAs: 'rowCtrl',
      scope: {
        row: '=',
        columns: '=',
        columnWidths: '=',
        expanded: '=',
        selected: '=',
        hasChildren: '=',
        options: '=',
        onCheckboxChange: '&',
        onTreeToggle: '&'
      },
      template: `
        <div class="dt-row">
          <div class="dt-row-left dt-row-block" 
               ng-if="columns['left'].length"
               ng-style="rowCtrl.stylesByGroup(this, 'left')">
            <dt-cell ng-repeat="column in columns['left'] track by column.$id"
                     on-tree-toggle="rowCtrl.onTreeToggle(this, cell)"
                     column="column"
                     options="options"
                     has-children="hasChildren"
                     on-checkbox-change="rowCtrl.onCheckboxChange(this)"
                     selected="selected"
                     expanded="expanded"
                     row="row"
                     value="rowCtrl.getValue(this, column)">
            </dt-cell>
          </div>
          <div class="dt-row-center dt-row-block" 
               ng-style="rowCtrl.stylesByGroup(this, 'center')">
            <dt-cell ng-repeat="column in columns['center'] track by column.$id"
                     on-tree-toggle="rowCtrl.onTreeToggle(this, cell)"
                     column="column"
                     options="options"
                     has-children="hasChildren"
                     expanded="expanded"
                     selected="selected"
                     row="row"
                     on-checkbox-change="rowCtrl.onCheckboxChange(this)"
                     value="rowCtrl.getValue(this, column)">
            </dt-cell>
          </div>
          <div class="dt-row-right dt-row-block" 
               ng-if="columns['right'].length"
               ng-style="rowCtrl.stylesByGroup(this, 'right')">
            <dt-cell ng-repeat="column in columns['right'] track by column.$id"
                     on-tree-toggle="rowCtrl.onTreeToggle(this, cell)"
                     column="column"
                     options="options"
                     has-children="hasChildren"
                     selected="selected"
                     on-checkbox-change="rowCtrl.onCheckboxChange(this)"
                     row="row"
                     expanded="expanded"
                     value="rowCtrl.getValue(this, column)">
            </dt-cell>
          </div>
        </div>`,
      replace:true
    };
  }


  /**
   * Returns a deep object given a string. zoo['animal.type']
   * @param {object} obj  
   * @param {string} path 
   */
  function DeepValueGetter(obj, path) {
    if(!obj || !path) return obj;

    var current = obj,
        split = path.split('.');

    if(split.length){
      for(var i=0, len=split.length; i < len; i++) {
        current = current[split[i]]; 
      }
    }
    
    return current;
  }

  class RowController {

    /**
     * Returns the value for a given column
     * @param  {scope}
     * @param  {col}
     * @return {value}
     */
    getValue(scope, col){
      return DeepValueGetter(scope.row, col.prop);
    }

    /**
     * Invoked when a cell triggers the tree toggle
     * @param  {scope}
     * @param  {cell}
     */
    onTreeToggle(scope, cell){
      scope.onTreeToggle({
        cell: cell,
        row: scope.row
      });
    }

    /**
     * Calculates the styles for a pin group
     * @param  {scope}
     * @param  {group}
     * @return {styles object}
     */
    stylesByGroup(scope, group){
      var styles = {
        width: scope.columnWidths[group] + 'px'
      };

      if(group === 'left'){
        styles.transform = `translate3d(${scope.options.internal.offsetX}px, 0, 0)`;
      } else if(group === 'right'){
        var offset = (scope.columnWidths.total - scope.options.internal.innerWidth) -
          scope.options.internal.offsetX;
        styles.transform = `translate3d(-${offset}px, 0, 0)`;
      }

      return styles;
    }

    /**
     * Invoked when the cell directive's checkbox changed state
     * @param  {scope}
     */
    onCheckboxChange(scope){
      scope.onCheckboxChange({
        row: scope.row
      });
    }

  }


  /**
   * Shortcut for key handlers
   * @type {Object}
   */
  var KEYS = {
    BACKSPACE:  8,
    TAB:        9,
    RETURN:    13,
    ALT:       18,
    ESC:       27,
    SPACE:     32,
    PAGE_UP:   33,
    PAGE_DOWN: 34,
    END:       35,
    HOME:      36,
    LEFT:      37,
    UP:        38,
    RIGHT:     39,
    DOWN:      40,
    DELETE:    46,
    COMMA:    188,
    PERIOD:   190,
    A:         65,
    Z:         90,
    ZERO:      48,
    NUMPAD_0:  96,
    NUMPAD_9: 105
  };

  class BodyController{

    /**
     * A tale body controller
     * @param  {$scope}
     * @param  {$timeout}
     * @param  {throttle}
     * @return {BodyController}
     */
    /*@ngInject*/
    constructor($scope, $timeout, throttle){
      angular.extend(this, {
        $scope: $scope,
        options: $scope.options,
        selected: $scope.selected
      });

      this.tempRows = [];

      this.treeColumn = $scope.options.columns.find((c) => {
        return c.isTreeColumn;
      });

      this.groupColumn = $scope.options.columns.find((c) => {
        return c.group;
      });

      if(this.options.scrollbarV){
        $scope.$watch('options.internal.offsetY', throttle(this.getRows.bind(this), 10));
      }

      $scope.$watchCollection('rows', (newVal, oldVal) => {
        if(newVal) {
          if(!this.options.paging.externalPaging){
            this.options.paging.count = newVal.length;
          }

          this.count = this.options.paging.count;

          if(this.treeColumn || this.groupColumn){
            this.buildRowsByGroup();
          }

          if(this.options.scrollbarV){
            this.getRows();
          } else {
            var rows = $scope.rows;
            if(this.treeColumn){
              rows = this.buildTree();
            } else if(this.groupColumn){
              rows = this.buildGroups();
            }
            this.tempRows.splice(0, this.tempRows.length);
            this.tempRows.push(...rows);
          }
        }
      });

      if(this.options.scrollbarV){
        $scope.$watch('options.internal.offsetY', this.updatePage.bind(this));

        $scope.$watch('options.paging.count', (count) => {
          this.count = count;
          this.updatePage();
        });
        
        $scope.$watch('options.paging.offset', (newVal) => {
          $scope.onPage({
            offset: newVal,
            size: this.options.paging.size
          });
        });
      }
    }

    /**
     * Gets the first and last indexes based on the offset, row height, page size, and overall count.
     * @return {object}
     */
    getFirstLastIndexes(){
      var firstRowIndex = Math.max(Math.floor((
            this.$scope.options.internal.offsetY || 0) / this.options.rowHeight, 0), 0),
          endIndex = Math.min(firstRowIndex + this.options.paging.size, this.count);

      return {
        first: firstRowIndex,
        last: endIndex
      };
    }

    /**
     * Updates the page's offset given the scroll position.
     * @param  {paging object}
     */
    updatePage(){
      var idxs = this.getFirstLastIndexes(),
          curPage = Math.ceil(idxs.first / this.options.paging.size);
      this.options.paging.offset = curPage;
    }

    /**
     * Matches groups to their respective parents by index.
     * 
     * Example:
     * 
     *  {
     *    "Acme" : [
     *      { name: "Acme Holdings", parent: "Acme" }
     *    ],
     *    "Acme Holdings": [
     *      { name: "Acme Ltd", parent: "Acme Holdings" }
     *    ]
     *  }
     * 
     */
    buildRowsByGroup(){
      this.index = {};
      this.rowsByGroup = {};

      var parentProp = this.treeColumn ? 
        this.treeColumn.relationProp : 
        this.groupColumn.prop;

      for(var i = 0, len = this.$scope.rows.length; i < len; i++) {
        var row = this.$scope.rows[i];
        // build groups
        var relVal = row[parentProp];
        if(relVal){
          if(this.rowsByGroup[relVal]){
            this.rowsByGroup[relVal].push(row);
          } else {
            this.rowsByGroup[relVal] = [ row ];
          }
        }

        // build indexes
        if(this.treeColumn){
          var prop = this.treeColumn.prop;
          this.index[row[prop]] = row;

          if (row[parentProp] === undefined){
            row.$$depth = 0;
          } else {
            var parent = this.index[row[parentProp]];
            row.$$depth = parent.$$depth + 1;
            if (parent.$$children){
              parent.$$children.push(row[prop]);
            } else {
              parent.$$children = [row[prop]];
            }
          }
        }
      }
    }

    /**
     * Rebuilds the groups based on what is expanded.
     * This function needs some optimization, todo for future release.
     * @return {Array} the temp array containing expanded rows
     */
    buildGroups(){
      var temp = [];

      angular.forEach(this.rowsByGroup, (v, k) => {
        temp.push({
          name: k,
          group: true
        });

        if(this.$scope.expanded[k]){
          temp.push(...v);
        }
      });

      return temp;
    }

    /**
     * Creates a tree of the existing expanded values
     * @return {array} the built tree
     */
    buildTree(){
      var count = 0, 
          temp = [];

      for(var i = 0, len = this.$scope.rows.length; i < len; i++) {
        var row = this.$scope.rows[i],
            relVal = row[this.treeColumn.relationProp],
            keyVal = row[this.treeColumn.prop],
            rows = this.rowsByGroup[keyVal],
            expanded = this.$scope.expanded[keyVal];

        if(!relVal){
          count++;
          temp.push(row);
        }

        if(rows && rows.length){
          if(expanded){
            temp.push(...rows);
            count = count + rows.length;
          }
        }

      }

      return temp;
    }

    /**
     * Creates the intermediate collection that is shown in the view.
     * @param  {boolean} refresh - bust the tree/group cache
     */
    getRows(refresh){    
      // only proceed when we have pre-aggregated the values
      if((this.treeColumn || this.groupColumn) && !this.rowsByGroup){
        return false;
      }

      var temp;

      if(this.treeColumn) {
        temp = this.treeTemp || [];
        // cache the tree build
        if((refresh || !this.treeTemp)){
          this.treeTemp = temp = this.buildTree();
          this.count = temp.length;

          // have to force reset, optimize this later
          this.tempRows.splice(0, this.tempRows.length);
        }
      } else if(this.groupColumn) {
        temp = this.groupsTemp || [];
        // cache the group build
        if((refresh || !this.groupsTemp)){
          this.groupsTemp = temp = this.buildGroups();
          this.count = temp.length;
        }
      } else {
        temp = this.$scope.rows;
      }

      var idx = 0,
          indexes = this.getFirstLastIndexes(),
          rowIndex = indexes.first;

      if(indexes.last === 0){
        this.tempRows.splice(0, this.tempRows.length);
      }

      while (rowIndex < indexes.last && rowIndex < this.count) {
        var row = temp[rowIndex];
        if(row){
          row.$$index = rowIndex;
          this.tempRows[idx] = row;
        }
        idx++ && rowIndex++;
      }
    }

    /**
     * Returns the styles for the table body directive.
     * @return {object}
     */
    styles(){
      var styles = {
        width: this.options.internal.innerWidth + 'px'
      };

      if(!this.options.scrollbarV){
        styles.overflowY = 'hidden';
      } else if(this.options.scrollbarH === false){
        styles.overflowX = 'hidden';
      }

      if(this.options.scrollbarV){
        styles.height = this.options.internal.bodyHeight + 'px';
      }

      return styles;
    }

    /**
     * Returns the styles for the row diretive.
     * @param  {scope}
     * @param  {row}
     * @return {styles object}
     */
    rowStyles(scope, row){
      var styles = {
        height: scope.options.rowHeight + 'px'
      };

      if(scope.options.scrollbarV){
        styles.transform = `translate3d(0, ${row.$$index * scope.options.rowHeight}px, 0)`;
      }

      return styles;
    }

    /**
     * Builds the styles for the row group directive
     * @param  {object} scope 
     * @param  {object} row   
     * @return {object} styles
     */
    groupRowStyles(scope, row){
      var styles = this.rowStyles(scope, row);
      styles.width = scope.columnWidths.total + 'px';
      return styles;
    }

    /**
     * Returns the css classes for the row directive.
     * @param  {scope}
     * @param  {row}
     * @return {css class object}
     */
    rowClasses(scope, row){
      var styles = {
        'selected': this.isSelected(row)
      };

      if(this.treeColumn){
        // if i am a child
        styles['dt-leaf'] = this.rowsByGroup[row[this.treeColumn.relationProp]];
        // if i have children
        styles['dt-has-leafs'] = this.rowsByGroup[row[this.treeColumn.prop]];
        // the depth
        styles['dt-depth-' + row.$$depth] = true;
      }

      return styles;
    }

    /**
     * Returns if the row is selected
     * @param  {row}
     * @return {Boolean}
     */
    isSelected(row){
      var selected = false;

      if(this.options.selectable){
        if(this.options.multiSelect){
          selected = this.selected.indexOf(row) > -1;
        } else {
          selected = this.selected === row;
        }
      }

      return selected;
    }

    /**
     * Handler for the keydown on a row
     * @param  {event}
     * @param  {index}
     * @param  {row}
     */
    keyDown(ev, index, row){
      ev.preventDefault();

      if (ev.keyCode === KEYS.DOWN) {
        var next = ev.target.nextElementSibling;
        if(next){
          next.focus();
        }
      } else if (ev.keyCode === KEYS.UP) {
        var prev = ev.target.previousElementSibling;
        if(prev){
          prev.focus();
        }
      } else if(ev.keyCode === KEYS.RETURN){
        this.selectRow(index, row);
      }
    }

    /**
     * Handler for the row click event
     * @param  {object} event
     * @param  {int} index
     * @param  {object} row
     */
    rowClicked(event, index, row){
      if(!this.options.checkboxSelection){
        event.preventDefault();
        this.selectRow(index, row);
      }

      this.$scope.onRowClick({ row: row });
    }

    /**
     * Selects a row and places in the selection collection
     * @param  {index}
     * @param  {row}
     */
    selectRow(index, row){
      if(this.options.selectable){
        if(this.options.multiSelect){
          var isCtrlKeyDown = event.ctrlKey || event.metaKey,
              isShiftKeyDown = event.shiftKey;

          if(isShiftKeyDown){
            this.selectRowsBetween(index, row);
          } else {
            var idx = this.selected.indexOf(row);
            if(idx > -1){
              this.selected.splice(idx, 1);
            } else {
              this.selected.push(row);
              this.$scope.onSelect({ rows: [ row ] });
            }
          }
          this.prevIndex = index;
        } else {
          this.selected = row;
          this.$scope.onSelect({ rows: [ row ] });
        }
      }
    }

    /**
     * Selectes the rows between a index.  Used for shift click selection.
     * @param  {index}
     */
    selectRowsBetween(index){
      var reverse = index < this.prevIndex, 
          selecteds = [];

      for(var i=0, len=this.tempRows.length; i < len; i++) {
        var row = this.tempRows[i],
            greater = i >= this.prevIndex && i <= index,
            lesser = i <= this.prevIndex && i >= index;

        if((reverse && lesser) || (!reverse && greater)){
          var idx = this.selected.indexOf(row);
          if(idx === -1){
            this.selected.push(row);
            selecteds.push(row);
          }
        }
      }

      this.$scope.onSelect({ rows: selecteds });
    }

    /**
     * Returns the virtual row height.
     * @return {[height]}
     */
    scrollerStyles(){
      return {
        height: this.count * this.options.rowHeight + 'px'
      }
    }

    /**
     * Returns the row model for the index in the view.
     * @param  {index}
     * @return {row model}
     */
    getRowValue(idx){
      return this.tempRows[idx];
    }

    /**
     * Calculates if a row is expanded or collasped for tree grids.
     * @param  {scope}
     * @param  {row}
     * @return {boolean}
     */
    getRowExpanded(scope, row){
      if(this.treeColumn) {
        return scope.expanded[row[this.treeColumn.prop]];
      } else if(this.groupColumn){
        return scope.expanded[row.name];
      }
    }

    /**
     * Calculates if the row has children
     * @param  {row}
     * @return {boolean}
     */
    getRowHasChildren(row){
      if(!this.treeColumn) return;
      var children = this.rowsByGroup[row[this.treeColumn.prop]];
      return children !== undefined || (children && !children.length);
    }

    /**
     * Tree toggle event from a cell
     * @param  {scope}
     * @param  {row model}
     * @param  {cell model}
     */
    onTreeToggle(scope, row, cell){
      var val  = row[this.treeColumn.prop];
      scope.expanded[val] = !scope.expanded[val];

      if(this.options.scrollbarV){
        this.getRows(true);
      } else {
        var values = this.buildTree();
        this.tempRows.splice(0, this.tempRows.length);
        this.tempRows.push(...values);
      }

      scope.onTreeToggle({
        row: row,
        cell: cell
      });
    }

    /**
     * Invoked when a row directive's checkbox was changed.
     * @param  {index}
     * @param  {row}
     */
    onCheckboxChange(index, row){
      this.selectRow(index, row);
    }

    /**
     * Invoked when the row group directive was expanded
     * @param  {object} scope 
     * @param  {object} row   
     */
    onGroupToggle(scope, row){
      scope.expanded[row.name] = !scope.expanded[row.name];

      if(this.options.scrollbarV){
        this.getRows(true);
      } else {
        var values = this.buildGroups();
        this.tempRows.splice(0, this.tempRows.length);
        this.tempRows.push(...values);
      }
    }
  }

  function HeaderCellDirective($compile){
    return {
      restrict: 'E',
      controller: 'HeaderCellController',
      controllerAs: 'hcell',
      scope: {
        column: '=',
        onCheckboxChange: '&',
        onSort: '&',
        onResize: '&',
        selected: '='
      },
      replace: true,
      template: 
        `<div ng-class="hcell.cellClass(this)"
              draggable="true"
              ng-style="hcell.styles(this)"
              title="{{::column.name}}">
          <div resizable="column.resizable" 
               on-resize="hcell.onResize(this, width, column)"
               min-width="column.minWidth"
               max-width="column.maxWidth">
            <label ng-if="column.isCheckboxColumn && column.headerCheckbox" class="dt-checkbox">
              <input type="checkbox" 
                     ng-checked="selected"
                     ng-click="hcell.onCheckboxChange(this)" />
            </label>
            <span class="dt-header-cell-label" 
                  ng-click="hcell.sort(this)">
            </span>
            <span ng-class="hcell.sortClass(this)"></span>
          </div>
        </div>`,
      compile: function() {
        return {
          pre: function($scope, $elm, $attrs, ctrl) {
            var label = $elm[0].querySelector('.dt-header-cell-label');

            if($scope.column.headerRenderer){
              var elm = angular.element($scope.column.headerRenderer($scope, $elm));
              angular.element(label).append($compile(elm)($scope)[0]);
            } else {
              var val = $scope.column.name;
              if(val === undefined || val === null) val = '';
              label.innerHTML = val;
            }
          }
        }
      }
    };
  }

  class HeaderCellController{

    /**
     * Calculates the styles for the header cell directive
     * @param  {scope}
     * @return {styles}
     */
    styles(scope){
      return {
        width: scope.column.width  + 'px',
        minWidth: scope.column.minWidth  + 'px',
        maxWidth: scope.column.maxWidth  + 'px',
        height: scope.column.height  + 'px'
      };
    }

    /**
     * Calculates the css classes for the header cell directive
     * @param  {scope}
     */
    cellClass(scope){
      var cls = {
        'sortable': scope.column.sortable,
        'dt-header-cell': true,
        'resizable': scope.column.resizable
      };

      if(scope.column.heaerClassName){
        cls[scope.column.heaerClassName] = true;
      }

      return cls;
    }

    /**
     * Toggles the sorting on the column
     * @param  {scope}
     */
    sort(scope){
      if(scope.column.sortable){
        if(!scope.column.sort){
          scope.column.sort = 'asc';
        } else if(scope.column.sort === 'asc'){
          scope.column.sort = 'desc';
        } else if(scope.column.sort === 'desc'){
          scope.column.sort = undefined;
        }

        scope.onSort({
          column: scope.column
        });
      }
    }

    /**
     * Toggles the css class for the sort button
     * @param  {scope}
     */
    sortClass(scope){
      return {
        'sort-btn': true,
        'sort-asc icon-down': scope.column.sort === 'asc',
        'sort-desc icon-up': scope.column.sort === 'desc'
      };
    }

    /**
     * Updates the column width on resize
     * @param  {width}
     * @param  {column}
     */
    onResize(scope, width, column){
      scope.onResize({
        column: column,
        width: width
      });
      //column.width = width;
    }

    /**
     * Invoked when the header cell directive checkbox was changed
     * @param  {object} scope angularjs scope
     */
    onCheckboxChange(scope){
      scope.onCheckboxChange();
    }

  }

  function HeaderDirective($timeout){

    return {
      restrict: 'E',
      controller: 'HeaderController',
      controllerAs: 'header',
      scope: {
        options: '=',
        columns: '=',
        columnWidths: '=',
        onSort: '&',
        onResize: '&',
        onCheckboxChange: '&'
      },
      template: `
        <div class="dt-header" ng-style="header.styles(this)">
          <div class="dt-header-inner" ng-style="header.innerStyles(this)">
            <div class="dt-row-left"
                 ng-style="header.stylesByGroup(this, 'left')"
                 ng-if="columns['left'].length"
                 sortable="options.reorderable"
                 on-sortable-sort="columnsResorted(event, childScope)">
              <dt-header-cell ng-repeat="column in columns['left'] track by column.$id" 
                              on-checkbox-change="header.onCheckboxChange(this)"
                              on-sort="header.onSort(this, column)"
                              on-resize="header.onResize(this, column, width)"
                              selected="header.isSelected(this)"
                              column="column">
              </dt-header-cell>
            </div>
            <div class="dt-row-center" 
                 sortable="options.reorderable"
                 ng-style="header.stylesByGroup(this, 'center')"
                 on-sortable-sort="columnsResorted(event, childScope)">
              <dt-header-cell ng-repeat="column in columns['center'] track by column.$id" 
                              on-checkbox-change="header.onCheckboxChange(this)"
                              on-sort="header.onSort(this, column)"
                              selected="header.isSelected(this)"
                              on-resize="header.onResize(this, column, width)"
                              column="column">
              </dt-header-cell>
            </div>
            <div class="dt-row-right"
                 ng-if="columns['right'].length"
                 sortable="options.reorderable"
                 ng-style="header.stylesByGroup(this, 'right')"
                 on-sortable-sort="columnsResorted(event, childScope)">
              <dt-header-cell ng-repeat="column in columns['right'] track by column.$id" 
                              on-checkbox-change="header.onCheckboxChange(this)"
                              on-sort="header.onSort(this, column)"
                              selected="header.isSelected(this)"
                              on-resize="header.onResize(this, column, width)"
                              column="column">
              </dt-header-cell>
            </div>
          </div>
        </div>`,
      replace:true,
      link: function($scope, $elm, $attrs, ctrl){

        $scope.columnsResorted = function(event, childScope){
          var col = childScope.column,
              parent = angular.element(event.currentTarget),
              newIdx = -1;

          angular.forEach(parent.children(), (c, i) => {
            if(childScope === angular.element(c).scope()){
              newIdx = i;
            }
          });

          $timeout(() => {
            angular.forEach($scope.columns, (group) => {
              var idx = group.indexOf(col);
              if(idx > -1){
                group.splice(idx, 1);
                group.splice(newIdx, 0, col);
              }
            });
            
          });
        }
      }
    };
  }

  class HeaderController {

    /**
     * Returns the styles for the header directive.
     * @param  {object} scope
     * @return {object} styles
     */
    styles(scope) {
      return {
        width: scope.options.internal.innerWidth + 'px',
        height: scope.options.headerHeight + 'px'
      }
    }

    /**
     * Returns the inner styles for the header directive
     * @param  {object} scope
     * @return {object} styles
     */
    innerStyles(scope){
      return {
        width: scope.columnWidths.total + 'px'
      };
    }

    /**
     * Invoked when a column sort direction has changed
     * @param  {object} scope
     * @param  {object} column
     */
    onSort(scope, column){
      scope.onSort({
        column: column
      });
    }

    /**
     * Returns the styles by group for the headers.
     * @param  {scope}
     * @param  {group}
     * @return {styles object}
     */
    stylesByGroup(scope, group){
      var styles = {
        width: scope.columnWidths[group] + 'px'
      };

      if(group === 'center'){
        styles['transform'] = `translate3d(-${scope.options.internal.offsetX}px, 0, 0)`
      } else if(group === 'right'){
        var offset = (scope.columnWidths.total - scope.options.internal.innerWidth);
        styles.transform = `translate3d(-${offset}px, 0, 0)`;
      }

      return styles;
    }

    /**
     * Invoked when the header cell directive's checkbox has changed.
     * @param  {scope}
     */
    onCheckboxChange(scope){
      scope.onCheckboxChange();
    }

    /**
     * Occurs when a header cell directive triggered a resize
     * @param  {object} scope  
     * @param  {object} column 
     * @param  {int} width  
     */
    onResize(scope, column, width){
      scope.onResize({
        column: column,
        width: width
      });
    }

  }


  /**
   * Throttle helper
   * @param  {function}
   * @param  {boolean}
   * @param  {object}
   */
  function throttle(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    options || (options = {});
    var later = function() {
      previous = options.leading === false ? 0 : new Date();
      timeout = null;
      result = func.apply(context, args);
    };
    return function() {
      var now = new Date();
      if (!previous && options.leading === false)
        previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  }


  /**
   * Debounce helper
   * @param  {function}
   * @param  {int}
   * @param  {boolean}
   */
  function debounce(func, wait, immediate) {
    var timeout, args, context, timestamp, result;
    return function() {
      context = this;
      args = arguments;
      timestamp = new Date();
      var later = function() {
        var last = new Date() - timestamp;
        if (last < wait) {
          timeout = setTimeout(later, wait - last);
        } else {
          timeout = null;
          if (!immediate)
            result = func.apply(context, args);
        }
      };
      var callNow = immediate && !timeout;
      if (!timeout) {
        timeout = setTimeout(later, wait);
      }
      if (callNow)
        result = func.apply(context, args);
      return result;
    };
  }


  /**
   * Sortable Directive
   * http://jsfiddle.net/RubaXa/zLq5J/3/
   * https://jsfiddle.net/hrohxze0/6/
   * @param {function}
   */
  function Sortable($timeout) {
    return {
      restrict: 'AC',
      scope: {
        isSortable: '=sortable',
        onSortableSort: '&'
      },
      link: function($scope, $element, $attrs){
        var rootEl = $element[0], dragEl, nextEl, dropEl;

        function isbefore(a, b) {
          if (a.parentNode == b.parentNode) {
            for (var cur = a; cur; cur = cur.previousSibling) {
              if (cur === b) { 
                return true;
              }
            }
          }
          return false;
        };

        function onDragEnter(e) {
          var target = e.target;
          if (isbefore(dragEl, target)) {
            target.parentNode.insertBefore(dragEl, target);
          } else if(target.nextSibling && target.hasAttribute('draggable')) {
            target.parentNode.insertBefore(dragEl, target.nextSibling);
          }
        };

        function onDragEnd(evt) {
          evt.preventDefault();

          dragEl.classList.remove('dt-clone');

          $element.off('dragend', onDragEnd);
          $element.off('dragenter', onDragEnter);

          if (nextEl !== dragEl.nextSibling) {
            $scope.onSortableSort({ 
              event: evt, 
              childScope: angular.element(dragEl).scope() 
            });
          }
        };

        function onDragStart(evt){
          if(!$scope.isSortable) return false;
          evt = evt.originalEvent || evt;

          dragEl = evt.target;
          nextEl = dragEl.nextSibling;
          dragEl.classList.add('dt-clone');

          evt.dataTransfer.effectAllowed = 'move';
          evt.dataTransfer.setData('Text', dragEl.textContent);

          $element.on('dragenter', onDragEnter);
          $element.on('dragend', onDragEnd);
        };

        $element.on('dragstart', onDragStart);

        $scope.$on('$destroy', () => {
          $element.off('dragstart', onDragStart);
        });
      }
    }
  }


  /**
   * Resizable directive
   * http://stackoverflow.com/questions/18368485/angular-js-resizable-div-directive
   * @param {object}
   * @param {function}
   * @param {function}
   */
  function Resizable($document, debounce, $timeout){
    return {
      restrict: 'AEC',
      scope:{
        isResizable: '=resizable',
        minWidth: '=',
        maxWidth: '=',
        onResize: '&'
      },
      link: function($scope, $element, $attrs){
        if($scope.isResizable){
          $element.addClass('resizable');
        }

        var handle = angular.element(`<span class="dt-resize-handle" title="Resize"></span>`),
            parent = $element.parent(),
            prevScreenX;

        handle.on('mousedown', function(event) {
          if(!$element[0].classList.contains('resizable')) {
            return false;
          }

          event.stopPropagation();
          event.preventDefault();

          $document.on('mousemove', mousemove);
          $document.on('mouseup', mouseup);
        });

        function mousemove(event) {
          event = event.originalEvent || event;
          
          var width = parent[0].scrollWidth,
              movementX = event.movementX || event.mozMovementX || (event.screenX - prevScreenX),
              newWidth = width + (movementX || 0);

          prevScreenX = event.screenX;

          if((!$scope.minWidth || newWidth >= $scope.minWidth) && (!$scope.maxWidth || newWidth <= $scope.maxWidth)){
            parent.css({
              width: newWidth + 'px'
            });
          }
        }

        function mouseup() {
          if($scope.onResize){
            $timeout(() => {
              $scope.onResize({ width: parent[0].scrollWidth });
            });
          }

          $document.unbind('mousemove', mousemove);
          $document.unbind('mouseup', mouseup);
        }

        $element.append(handle);
      }
    };
  }


  /**
   * Gets the width of the scrollbar.  Nesc for windows
   * http://stackoverflow.com/a/13382873/888165
   * @return {int} width
   */
  function ScrollbarWidth() {
    var outer = document.createElement("div");
    outer.style.visibility = "hidden";
    outer.style.width = "100px";
    outer.style.msOverflowStyle = "scrollbar";
    document.body.appendChild(outer);

    var widthNoScroll = outer.offsetWidth;
    outer.style.overflow = "scroll";

    var inner = document.createElement("div");
    inner.style.width = "100%";
    outer.appendChild(inner);

    var widthWithScroll = inner.offsetWidth;
    outer.parentNode.removeChild(outer);

    return widthNoScroll - widthWithScroll;
  }

  function DataTableDirective($window, $timeout, throttle){
    return {
      restrict: 'E',
      replace: true,
      transclude:'element',
      controller: 'DataTable',
      scope: {
        options: '=',
        rows: '=',
        selected: '=?',
        expanded: '=?',
        onSelect: '&',
        onSort: '&',
        onTreeToggle: '&',
        onPage: '&',
        onRowClick: '&'
      },
      controllerAs: 'dt',
      template: 
        `<div class="dt" ng-class="dt.tableCss(this)">
            <dt-header options="options"
                       on-checkbox-change="dt.onHeaderCheckboxChange(this)"
                       columns="dt.columnsByPin"
                       column-widths="dt.columnWidths"
                       ng-if="options.headerHeight"
                       on-resize="dt.onResize(this, column, width)"
                       selected="dt.isAllRowsSelected(this)"
                       on-sort="dt.onSort(this)">
            </dt-header>
            <dt-body rows="rows"
                     selected="selected"
                     expanded="expanded"
                     columns="dt.columnsByPin"
                     on-select="dt.onSelect(this, rows)"
                     on-row-click="dt.onRowClick(this, row)"
                     column-widths="dt.columnWidths"
                     options="options"
                     on-page="dt.onBodyPage(this, offset, size)"
                     on-tree-toggle="dt.onTreeToggle(this, row, cell)">
             </dt-body>
            <dt-footer ng-if="options.footerHeight"
                       ng-style="{ height: options.footerHeight + 'px' }"
                       on-page="dt.onFooterPage(this, offset, size)"
                       paging="options.paging">
             </dt-footer>
          </div>`,
      compile: function(tElem, tAttrs){
        return {
          pre: function($scope, $elm, $attrs, ctrl){
            $scope.options.internal.scrollBarWidth = ScrollbarWidth();

            function resize() {
              var rect = $elm[0].getBoundingClientRect();

              $scope.options.internal.innerWidth = Math.floor(rect.width);

              if ($scope.options.scrollbarV) {
                var height = rect.height;

                if ($scope.options.headerHeight) {
                  height = height - $scope.options.headerHeight;
                }

                if ($scope.options.footerHeight) {
                  height = height - $scope.options.footerHeight;
                }

                $scope.options.internal.bodyHeight = height;
              }

              ctrl.adjustColumns();
              ctrl.calculatePageSize();
            }

            $timeout(resize);
            $elm.addClass('dt-loaded');
            angular.element($window).bind('resize', throttle(() => {
              $timeout(resize);
            }));
          }
        }
      }
    };
  }
  ;

  var data_table = angular
    .module('data-table', [])

    .controller('DataTable', DataTableController)
    .directive('dt', DataTableDirective)

    .directive('resizable', Resizable)
    .directive('sortable', Sortable)
    .constant('debounce', debounce)
    .constant('throttle', throttle)

    .controller('HeaderController', HeaderController)
    .directive('dtHeader', HeaderDirective)

    .controller('HeaderCellController', HeaderCellController)
    .directive('dtHeaderCell', HeaderCellDirective)

    .controller('BodyController', BodyController)
    .directive('dtBody', BodyDirective)

    .controller('RowController', RowController)
    .directive('dtRow', RowDirective)

    .controller('GroupRowController', GroupRowController)
    .directive('dtGroupRow', GroupRowDirective)

    .controller('CellController', CellController)
    .directive('dtCell', CellDirective)

    .controller('FooterController', FooterController)
    .directive('dtFooter', FooterDirective)

    .controller('PagerController', PagerController)
    .directive('dtPager', PagerDirective)

  return data_table;

}));