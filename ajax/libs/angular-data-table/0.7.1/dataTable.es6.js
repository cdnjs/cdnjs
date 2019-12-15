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

class PagerController {

  /**
   * Creates an instance of the Pager Controller
   * @param  {object} $scope   
   */
  /*@ngInject*/
  constructor($scope){
    $scope.$watch('pager.count', (newVal) => {
      this.calcTotalPages(this.size, this.count);
      this.getPages(this.page || 1);
    });

    $scope.$watch('pager.size', (newVal) => {
      this.calcTotalPages(this.size, this.count);
      this.getPages(this.page || 1);
    });

    $scope.$watch('pager.page', (newVal) => {
      if (newVal !== 0 && newVal <= this.totalPages) {
        this.getPages(newVal);
      }
    });
    
    this.getPages(this.page || 1);
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
   * @param  {int} num   
   */
  selectPage(num){
    if (num > 0 && num <= this.totalPages) {
      this.page = num;
      this.onPage({
        page: num
      });
    }
  }

  /**
   * Selects the previous pager
   */
  prevPage(){
    if (this.page > 1) {
      this.selectPage(--this.page);
    }
  }

  /**
   * Selects the next page
   */
  nextPage(){
    this.selectPage(++this.page);
  }

  /**
   * Determines if the pager can go previous
   * @return {boolean}
   */
  canPrevious(){
    return this.page > 1;
  }

  /**
   * Determines if the pager can go forward
   * @return {boolean}       
   */
  canNext(){
    return this.page < this.totalPages;
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

    /*
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
    */

    this.pages = pages;
  }

}

function PagerDirective(){
  return {
    restrict: 'E',
    controller: PagerController,
    controllerAs: 'pager',
    scope: true,
    bindToController: {
      page: '=',
      size: '=',
      count: '=',
      onPage: '&'
    },
    template:
      `<div class="dt-pager">
        <ul class="pager">
          <li ng-class="{ disabled: !pager.canPrevious() }">
            <a href ng-click="pager.selectPage(1)" class="icon-prev"></a>
          </li>
          <li ng-class="{ disabled: !pager.canPrevious() }">
            <a href ng-click="pager.prevPage()" class="icon-left"></a>
          </li>
          <li ng-repeat="pg in pager.pages track by $index" ng-class="{ active: pg.active }">
            <a href ng-click="pager.selectPage(pg.number)">{{pg.text}}</a>
          </li>
          <li ng-class="{ disabled: !pager.canNext() }">
            <a href ng-click="pager.nextPage()" class="icon-right"></a>
          </li>
          <li ng-class="{ disabled: !pager.canNext() }">
            <a href ng-click="pager.selectPage(pager.totalPages)" class="icon-skip"></a>
          </li>
        </ul>
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
    this.page = this.paging.offset + 1;
    $scope.$watch('footer.paging.offset', (newVal) => {
      this.offsetChanged(newVal)
    });
  }

  /**
   * The offset ( page ) changed externally, update the page
   * @param  {new offset}
   */
  offsetChanged(newVal){
    this.page = newVal + 1;
  }

  /**
   * The pager was invoked
   * @param  {scope}
   */
  onPaged(page){
    this.paging.offset = page - 1;
    this.onPage({
      offset: this.paging.offset,
      size: this.paging.size
    });
  }

}

function FooterDirective(){
  return {
    restrict: 'E',
    controller: FooterController,
    controllerAs: 'footer',
    scope: true,
    bindToController: {
      paging: '=',
      onPage: '&'
    },
    template:
      `<div class="dt-footer">
        <div class="page-count">{{footer.paging.count}} total</div>
        <dt-pager page="footer.page"
               size="footer.paging.size"
               count="footer.paging.count"
               on-page="footer.onPaged(page)"
               ng-show="footer.paging.count / footer.paging.size > 1">
         </dt-pager>
      </div>`,
    replace: true
  };
}

class CellController {

  /**
   * Calculates the styles for the Cell Directive
   * @return {styles object}
   */
  styles(){
    return {
      width: this.column.width  + 'px',
	  'min-width': this.column.width + 'px'
    };
  }

  /**
   * Calculates the css classes for the cell directive
   * @param  {column}
   * @return {class object}
   */
  cellClass(){
    var style = {
      'dt-tree-col': this.column.isTreeColumn
    };

    if(this.column.className){
      style[this.column.className] = true;
    }

    return style;
  }

  /**
   * Calculates the tree class styles.
   * @return {css classes object}
   */
  treeClass(){
    return {
      'dt-tree-toggle': true,
      'icon-right': !this.expanded,
      'icon-down': this.expanded
    }
  }

  /**
   * Invoked when the tree toggle button was clicked.
   * @param  {event}
   */
  onTreeToggled(evt){
    evt.stopPropagation();
    this.expanded = !this.expanded;
    this.onTreeToggle({
      cell: {
        value: this.value,
        column: this.column,
        expanded: this.expanded
      }
    });
  }

  /**
   * Invoked when the checkbox was changed
   * @param  {object} event
   */
  onCheckboxChanged(event){
    event.stopPropagation();
    this.onCheckboxChange({ $event: event });
  }

  /**
   * Returns the value in its fomatted form
   * @return {string} value
   */
  getValue(){
    var val = this.column.cellDataGetter ?
      this.column.cellDataGetter(this.value) : this.value;

    if(val === undefined || val === null) val = '';
    return val;
  }

}

function CellDirective($rootScope, $compile, $log, $timeout){
  return {
    restrict: 'E',
    controller: CellController,
    scope: true,
    controllerAs: 'cell',
    bindToController: {
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
            data-title="{{::cell.column.name}}"
            ng-style="cell.styles()"
            ng-class="cell.cellClass()">
        <label ng-if="cell.column.isCheckboxColumn" class="dt-checkbox">
          <input type="checkbox"
                 ng-checked="cell.selected"
                 ng-click="cell.onCheckboxChanged($event)" />
        </label>
        <span ng-if="cell.column.isTreeColumn && cell.hasChildren"
              ng-class="cell.treeClass()"
              ng-click="cell.onTreeToggled($event)"></span>
        <span class="dt-cell-content"></span>
      </div>`,
    replace: true,
    compile: function() {
      return {
        pre: function($scope, $elm, $attrs, ctrl) {
          var content = angular.element($elm[0].querySelector('.dt-cell-content')), cellScope;

          // extend the outer scope onto our new cell scope
          if(ctrl.column.template || ctrl.column.cellRenderer){
            createCellScope();
          }

          $scope.$watch('cell.row', () => {
            if(cellScope){
              cellScope.$destroy();

              createCellScope();

              cellScope.$cell = ctrl.value;
              cellScope.$row = ctrl.row;
              cellScope.$column = ctrl.column;
              cellScope.$$watchers = null;
            }

            if(ctrl.column.template){
              content.empty();
              var elm = angular.element(`<span>${ctrl.column.template.trim()}</span>`);
              content.append($compile(elm)(cellScope));
            } else if(ctrl.column.cellRenderer){
              content.empty();
              var elm = angular.element(ctrl.column.cellRenderer(cellScope, content));
              content.append($compile(elm)(cellScope));
            } else {
              content[0].innerHTML = ctrl.getValue();
            }
            
          }, true);

          function createCellScope(){
            cellScope = ctrl.options.$outer.$new(false);
            cellScope.getValue = ctrl.getValue;
          }
        }
      }
    }
  };
}

var cache = {},
    testStyle = document.createElement('div').style;


// Get Prefix
// http://davidwalsh.name/vendor-prefix
var prefix = (function () {
  var styles = window.getComputedStyle(document.documentElement, ''),
    pre = (Array.prototype.slice
      .call(styles)
      .join('')
      .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
    )[1],
    dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
  return {
    dom: dom,
    lowercase: pre,
    css: '-' + pre + '-',
    js: pre[0].toUpperCase() + pre.substr(1)
  };
})();


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
 * @param {string} property Name of a css property to check for.
 * @return {?string} property name supported in the browser, or null if not
 * supported.
 */
function GetVendorPrefixedName(property) {
  var name = CamelCase(property)
  if(!cache[name]){
    if(testStyle[prefix.css + property] !== undefined) {
      cache[name] = prefix.css + property;
    } else if(testStyle[property] !== undefined){
      cache[name] = property;
    }
  }
  return cache[name];
}


// browser detection and prefixing tools
var transform = GetVendorPrefixedName('transform'),
    backfaceVisibility = GetVendorPrefixedName('backfaceVisibility'),
    hasCSSTransforms = !!GetVendorPrefixedName('transform'),
    hasCSS3DTransforms = !!GetVendorPrefixedName('perspective'),
    ua = window.navigator.userAgent,
    isSafari = (/Safari\//).test(ua) && !(/Chrome\//).test(ua);

function TranslateXY(styles, x,y){
  if (hasCSSTransforms) {
    if (!isSafari && hasCSS3DTransforms) {
      styles[transform] = `translate3d(${x}px, ${y}px, 0)`;
      styles[backfaceVisibility] = 'hidden';
    } else {
      styles[CamelCase(transform)] = `translate(${x}px, ${y}px)`;
    }
  } else {
    styles.top = y + 'px';
    styles.left = x + 'px';
  }
}

class GroupRowController {

  onGroupToggled(evt){
    evt.stopPropagation();
    this.onGroupToggle({
      group: this.row
    });
  }

  treeClass(){
    return {
      'dt-tree-toggle': true,
      'icon-right': !this.expanded,
      'icon-down': this.expanded
    };
  }

}

function GroupRowDirective(){
  return {
    restrict: 'E',
    controller: GroupRowController,
    controllerAs: 'group',
    bindToController: {
      row: '=',
      onGroupToggle: '&',
      expanded: '=',
      options: '='
    },
    scope: true,
    replace:true,
    template: `
      <div class="dt-group-row">
        <span ng-class="group.treeClass()"
              ng-click="group.onGroupToggled($event)">
        </span>
        <span class="dt-group-row-label" ng-bind="group.row.name">
        </span>
      </div>`,
    link: function($scope, $elm, $attrs, ctrl){
      // inital render position
      TranslateXY($elm[0].style, 0, ctrl.row.$$index * ctrl.options.rowHeight);

      // register w/ the style translator
      ctrl.options.internal.styleTranslator.register($scope.$index, $elm);
    }
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
   * @param  {col}
   * @return {value}
   */
  getValue(col){
    if(!col.prop) return '';
    return DeepValueGetter(this.row, col.prop);
  }

  /**
   * Invoked when a cell triggers the tree toggle
   * @param  {cell}
   */
  onTreeToggled(cell){
    this.onTreeToggle({
      cell: cell,
      row: this.row
    });
  }

  /**
   * Calculates the styles for a pin group
   * @param  {group}
   * @return {styles object}
   */
  stylesByGroup( group){
    var styles = {
      width: this.columnWidths[group] + 'px'
    };

    if(group === 'left'){
      TranslateXY(styles, this.options.internal.offsetX, 0);
    } else if(group === 'right'){
      var offset = (((this.columnWidths.total - this.options.internal.innerWidth) -
        this.options.internal.offsetX) + this.options.internal.scrollBarWidth) * -1;
      TranslateXY(styles, offset, 0);
    }

    return styles;
  }

  /**
   * Invoked when the cell directive's checkbox changed state
   */
  onCheckboxChanged(ev){
    this.onCheckboxChange({
      $event: ev,
      row: this.row
    });
  }

}

function RowDirective(){
  return {
    restrict: 'E',
    controller: RowController,
    controllerAs: 'rowCtrl',
    scope: true,
    bindToController: {
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
    link: function($scope, $elm, $attrs, ctrl){
      if(ctrl.row){
        // inital render position
        TranslateXY($elm[0].style, 0, ctrl.row.$$index * ctrl.options.rowHeight);
      }

      // register w/ the style translator
      ctrl.options.internal.styleTranslator.register($scope.$index, $elm);
    },
    template: `
      <div class="dt-row">
        <div class="dt-row-left dt-row-block"
             ng-if="rowCtrl.columns['left'].length"
             ng-style="rowCtrl.stylesByGroup('left')">
          <dt-cell ng-repeat="column in rowCtrl.columns['left'] track by column.$id"
                   on-tree-toggle="rowCtrl.onTreeToggled(cell)"
                   column="column"
                   options="rowCtrl.options"
                   has-children="rowCtrl.hasChildren"
                   on-checkbox-change="rowCtrl.onCheckboxChanged($event)"
                   selected="rowCtrl.selected"
                   expanded="rowCtrl.expanded"
                   row="rowCtrl.row"
                   value="rowCtrl.getValue(column)">
          </dt-cell>
        </div>
        <div class="dt-row-center dt-row-block"
             ng-style="rowCtrl.stylesByGroup('center')">
          <dt-cell ng-repeat="column in rowCtrl.columns['center'] track by column.$id"
                   on-tree-toggle="rowCtrl.onTreeToggled(cell)"
                   column="column"
                   options="rowCtrl.options"
                   has-children="rowCtrl.hasChildren"
                   expanded="rowCtrl.expanded"
                   selected="rowCtrl.selected"
                   row="rowCtrl.row"
                   on-checkbox-change="rowCtrl.onCheckboxChanged($event)"
                   value="rowCtrl.getValue(column)">
          </dt-cell>
        </div>
        <div class="dt-row-right dt-row-block"
             ng-if="rowCtrl.columns['right'].length"
             ng-style="rowCtrl.stylesByGroup('right')">
          <dt-cell ng-repeat="column in rowCtrl.columns['right'] track by column.$id"
                   on-tree-toggle="rowCtrl.onTreeToggled(cell)"
                   column="column"
                   options="rowCtrl.options"
                   has-children="rowCtrl.hasChildren"
                   selected="rowCtrl.selected"
                   on-checkbox-change="rowCtrl.onCheckboxChanged($event)"
                   row="rowCtrl.row"
                   expanded="rowCtrl.expanded"
                   value="rowCtrl.getValue(column)">
          </dt-cell>
        </div>
      </div>`,
    replace:true
  };
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

class SelectionController {

  /*@ngInject*/
  constructor($scope){
    this.body = $scope.body;
    this.options = $scope.body.options;
    this.selected = $scope.body.selected;
  }

  /**
   * Handler for the keydown on a row
   * @param  {event}
   * @param  {index}
   * @param  {row}
   */
  keyDown(ev, index, row){
    if(KEYS[ev.keyCode]){
      ev.preventDefault();
    }

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
      // event.preventDefault();
      this.selectRow(event, index, row);
    }

    this.body.onRowClick({ row: row });
  }
  
  /**
   * Handler for the row double click event
   * @param  {object} event
   * @param  {int} index
   * @param  {object} row
   */
  rowDblClicked(event, index, row){
    if(!this.options.checkboxSelection){
      event.preventDefault();
      this.selectRow(event, index, row);
    }

    this.body.onRowDblClick({ row: row });
  }

  /**
   * Invoked when a row directive's checkbox was changed.
   * @param  {index}
   * @param  {row}
   */
  onCheckboxChange(event, index, row){
    this.selectRow(event, index, row);
  }

  /**
   * Selects a row and places in the selection collection
   * @param  {index}
   * @param  {row}
   */
  selectRow(event, index, row){
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
            if(this.options.multiSelectOnShift && this.selected.length === 1) {
              this.selected.splice(0, 1);
            }
            this.selected.push(row);
            this.body.onSelect({ rows: [ row ] });
          }
        }
        this.prevIndex = index;
      } else {
        this.selected = row;
        this.body.onSelect({ rows: [ row ] });
      }
    }
  }

  /**
   * Selects the rows between a index.  Used for shift click selection.
   * @param  {index}
   */
  selectRowsBetween(index){
    var reverse = index < this.prevIndex,
        selecteds = [];

    for(var i=0, len=this.body.rows.length; i < len; i++) {
      var row = this.body.rows[i],
          greater = i >= this.prevIndex && i <= index,
          lesser = i <= this.prevIndex && i >= index;

      var range = {};
      if ( reverse ) {
        range = {
          start: index,
          end: ( this.prevIndex - index )
        }
      } else {
        range = {
          start: this.prevIndex,
          end: index + 1
        }
      }

      if((reverse && lesser) || (!reverse && greater)){
        var idx = this.selected.indexOf(row);
        // if reverse shift selection (unselect) and the
        // row is already selected, remove it from selected
        if ( reverse && idx > -1 ) {
          this.selected.splice(idx, 1);
          continue;
        }
        // if in the positive range to be added to `selected`, and
        // not already in the selected array, add it
        if( i >= range.start && i < range.end ){
          if ( idx === -1 ) {
            this.selected.push(row);
            selecteds.push(row);
          }
        }
      }
    }

    this.body.onSelect({ rows: selecteds });
  }
}

function SelectionDirective(){
  return {
    controller: SelectionController,
    restrict: 'A',
    require:'^dtBody',
    controllerAs: 'selCtrl'
  };
}


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


/**
 * This translates the dom position based on the model row index.
 * This only exists because Angular's binding process is too slow.
 */
class StyleTranslator{

  constructor(height){
    this.height = height;
    this.map = new Map();
  }

  /**
   * Update the rows
   * @param  {Array} rows
   */
  update(rows){
    let n = 0;
    while (n <= this.map.size) {
      let dom = this.map.get(n);
      let model = rows[n];
      if(dom && model){
        TranslateXY(dom[0].style, 0, model.$$index * this.height);
      }
      n++;
    }
  }

  /**
   * Register the row
   * @param  {int} idx
   * @param  {dom} dom
   */
  register(idx, dom){
    this.map.set(idx, dom);
  }

}

function ScrollerDirective($timeout, $rootScope){
  return {
    restrict: 'E',
    require:'^dtBody',
    transclude: true,
    replace: true,
    template: `<div ng-style="scrollerStyles()" ng-transclude></div>`,
    link: function($scope, $elm, $attrs, ctrl){
      var ticking = false,
          lastScrollY = 0,
          lastScrollX = 0,
          parent = $elm.parent();

      ctrl.options.internal.styleTranslator =
        new StyleTranslator(ctrl.options.rowHeight);

      ctrl.options.internal.setYOffset = function(offsetY){
        parent[0].scrollTop = offsetY;
      };

      function update(){
        ctrl.options.internal.offsetY = lastScrollY;
        ctrl.options.internal.offsetX = lastScrollX;
        ctrl.updatePage();

        if(ctrl.options.scrollbarV){
          ctrl.getRows();
        }

        // https://github.com/Swimlane/angular-data-table/pull/74
        ctrl.options.$outer.$digest();

        ticking = false;
      };

      function requestTick() {
        if(!ticking) {
          requestAnimFrame(update);
          ticking = true;
        }
      };

      parent.on('scroll', function(ev) {
        lastScrollY = this.scrollTop;
        lastScrollX = this.scrollLeft;
        requestTick();
      });

      $scope.$on('$destroy', () => {
        parent.off('scroll');
      });

      $scope.scrollerStyles = function(){
        if(ctrl.options.scrollbarV){
          return {
            height: ctrl.count * ctrl.options.rowHeight + 'px'
          }
        }
      };

    }
  };
}

class BodyController{

  /**
   * A tale body controller
   * @param  {$scope}
   * @param  {$timeout}
   * @return {BodyController}
   */
  /*@ngInject*/
  constructor($scope, $timeout){
    this.$scope = $scope;
    this.tempRows = [];

    this.treeColumn = this.options.columns.find((c) => {
      return c.isTreeColumn;
    });

    this.groupColumn = this.options.columns.find((c) => {
      return c.group;
    });

    $scope.$watchCollection('body.rows', this.rowsUpdated.bind(this));

    if(this.options.scrollbarV || (!this.options.scrollbarV && this.options.paging.externalPaging)){
      var sized = false;
      $scope.$watch('body.options.paging.size', (newVal, oldVal) => {
        if(!sized || newVal > oldVal){
          this.getRows();
          sized = true;
        }
      });

      $scope.$watch('body.options.paging.count', (count) => {
        this.count = count;
        this.updatePage();
      });

      $scope.$watch('body.options.paging.offset', (newVal) => {
        if(this.options.paging.size){
          this.onPage({
            offset: newVal,
            size: this.options.paging.size
          });
        }
      });
    }
  }

  rowsUpdated(newVal, oldVal){
    if(newVal) {
      if(!this.options.paging.externalPaging){
        this.options.paging.count = newVal.length;
      }

      this.count = this.options.paging.count;

      if(this.treeColumn || this.groupColumn){
        this.buildRowsByGroup();
      }

      if(this.options.scrollbarV){
        let refresh = newVal && oldVal && (newVal.length === oldVal.length
          || newVal.length < oldVal.length);

        this.getRows(refresh);
      } else {
        let rows = this.rows;

        if(this.treeColumn){
          rows = this.buildTree();
        } else if(this.groupColumn){
          rows = this.buildGroups();
        }

        if(this.options.paging.externalPaging){
          let idxs = this.getFirstLastIndexes(),
              idx = idxs.first;

          this.tempRows.splice(0, this.tempRows.length);
          while(idx < idxs.last){
            this.tempRows.push(rows[idx++])
          }
        } else {
          this.tempRows.splice(0, this.tempRows.length);
          this.tempRows.push(...rows);
        }
      }
    }
  }

  /**
   * Gets the first and last indexes based on the offset, row height, page size, and overall count.
   */
  getFirstLastIndexes(){
    var firstRowIndex, endIndex;

    if(this.options.scrollbarV){
      firstRowIndex = Math.max(Math.floor((
          this.options.internal.offsetY || 0) / this.options.rowHeight, 0), 0);
      endIndex = Math.min(firstRowIndex + this.options.paging.size, this.count);
    } else {
      if(this.options.paging.externalPaging){
        firstRowIndex = Math.max(this.options.paging.offset * this.options.paging.size, 0);
        endIndex = Math.min(firstRowIndex + this.options.paging.size, this.count);
      } else {
        endIndex = this.count;
      }
    }

    return {
      first: firstRowIndex,
      last: endIndex
    };
  }

  /**
   * Updates the page's offset given the scroll position.
   */
  updatePage(){
    let curPage = this.options.paging.offset,
        idxs = this.getFirstLastIndexes();

    if (this.options.internal.oldScrollPosition === undefined){
      this.options.internal.oldScrollPosition = 0;
    }

    let oldScrollPosition = this.options.internal.oldScrollPosition,
        newPage = idxs.first / this.options.paging.size;

    this.options.internal.oldScrollPosition = newPage;

    if (newPage < oldScrollPosition) {
      // scrolling up
      newPage = Math.floor(newPage);
    } else if (newPage > oldScrollPosition){
      // scrolling down
      newPage = Math.ceil(newPage);
    } else {
      // equal, just stay on the current page
      newPage = curPage;
    }

    if(!isNaN(newPage)){
      this.options.paging.offset = newPage;
    }
  }

  /**
   * Recursively calculate row depth for unsorted backend data
   * @param row
   * @param depth
   * @return {Integer}
  */
  calculateDepth(row, depth=0){
    var parentProp = this.treeColumn ? this.treeColumn.relationProp : this.groupColumn.prop;
    var prop = this.treeColumn.prop;
    if (!row[parentProp]){
      return depth;
    }
    if (row.$$depth) {
      return row.$$depth + depth;
    }
    /* Get data from cache, if exists*/
    var cachedParent = this.index[row[parentProp]];
    if (cachedParent) {
      depth += 1;
      return this.calculateDepth(cachedParent, depth);
    }
    for (var i=0, len = this.rows.length; i < len;  i++){
      var parent = this.rows[i];
      if (parent[prop] == row[parentProp]){
        depth+=1;
        return this.calculateDepth(parent, depth);
      }
    }
    return depth;
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

    for(var i = 0, len = this.rows.length; i < len; i++) {
      var row = this.rows[i];
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
          if (parent === undefined){
            for (var j=0; j < len; j++){
              if (this.rows[j][prop] == relVal){
                parent = this.rows[j];
                break;
              }
            }
          }
          if (parent.$$depth === undefined) {
            parent.$$depth = this.calculateDepth(parent);
          }
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

      if(this.expanded[k]){
        temp.push(...v);
      }
    });

    return temp;
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
   * Creates a tree of the existing expanded values
   * @return {array} the built tree
   */
  buildTree(){
    var temp = [],
        self = this;

    function addChildren(fromArray, toArray, level) {
      fromArray.forEach(function (row) {
        var relVal = row[self.treeColumn.relationProp],
            key = row[self.treeColumn.prop],
            groupRows = self.rowsByGroup[key],
            expanded = self.expanded[key];

        if (level > 0 || !relVal) {
          toArray.push(row);
          if (groupRows && groupRows.length > 0 && expanded) {
            addChildren(groupRows, toArray, level + 1);
          }
        }

      });
    }

    addChildren(this.rows, temp, 0);

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
      temp = this.rows;
       if(refresh === true){
        this.tempRows.splice(0, this.tempRows.length);
      }
    }

    var idx = 0,
        indexes = this.getFirstLastIndexes(),
        rowIndex = indexes.first;

    // slice out the old rows so we don't have duplicates
    this.tempRows.splice(0, indexes.last - indexes.first);

    while (rowIndex < indexes.last && rowIndex < this.count) {
      var row = temp[rowIndex];
      if(row){
        row.$$index = rowIndex;
        this.tempRows[idx] = row;
      }
      idx++;
      rowIndex++;
    }

    this.options.internal.styleTranslator.update(this.tempRows);

    return this.tempRows;
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
   * @param  {row}
   * @return {styles object}
   */
  rowStyles(row){
    let styles = {};

    if(this.options.rowHeight === 'auto'){
      styles.height = this.options.rowHeight + 'px';
    }

    return styles;
  }

  /**
   * Builds the styles for the row group directive
   * @param  {object} row
   * @return {object} styles
   */
  groupRowStyles(row){
    var styles = this.rowStyles(row);
    styles.width = this.columnWidths.total + 'px';
    return styles;
  }

  /**
   * Returns the css classes for the row directive.
   * @param  {row}
   * @return {css class object}
   */
  rowClasses(row){
    var styles = {
      'selected': this.isSelected(row),
      'dt-row-even': row && row.$$index%2 === 0,
      'dt-row-odd': row && row.$$index%2 !== 0
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
   * Returns the row model for the index in the view.
   * @param  {index}
   * @return {row model}
   */
  getRowValue(idx){
    return this.tempRows[idx];
  }

  /**
   * Calculates if a row is expanded or collasped for tree grids.
   * @param  {row}
   * @return {boolean}
   */
  getRowExpanded(row){
    if(this.treeColumn) {
      return this.expanded[row[this.treeColumn.prop]];
    } else if(this.groupColumn){
      return this.expanded[row.name];
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
   * @param  {row model}
   * @param  {cell model}
   */
  onTreeToggled(row, cell){
    var val  = row[this.treeColumn.prop];
    this.expanded[val] = !this.expanded[val];

    if(this.options.scrollbarV){
      this.getRows(true);
    } else {
      var values = this.buildTree();
      this.tempRows.splice(0, this.tempRows.length);
      this.tempRows.push(...values);
    }

    this.onTreeToggle({
      row: row,
      cell: cell
    });
  }

  /**
   * Invoked when the row group directive was expanded
   * @param  {object} row
   */
  onGroupToggle(row){
    this.expanded[row.name] = !this.expanded[row.name];

    if(this.options.scrollbarV){
      this.getRows(true);
    } else {
      var values = this.buildGroups();
      this.tempRows.splice(0, this.tempRows.length);
      this.tempRows.push(...values);
    }
  }
}

function BodyDirective($timeout){
  return {
    restrict: 'E',
    controller: BodyController,
    controllerAs: 'body',
    bindToController: {
      columns: '=',
      columnWidths: '=',
      rows: '=',
      options: '=',
      selected: '=?',
      expanded: '=?',
      onPage: '&',
      onTreeToggle: '&',
      onSelect: '&',
      onRowClick: '&',
      onRowDblClick: '&'
    },
    scope: true,
    template: `
      <div 
        class="progress-linear" 
        role="progressbar" 
        ng-show="body.options.paging.loadingIndicator">
        <div class="container">
          <div class="bar"></div>
        </div>
      </div>
      <div class="dt-body" ng-style="body.styles()" dt-seletion>
        <dt-scroller class="dt-body-scroller">
          <dt-group-row ng-repeat-start="r in body.tempRows track by $index"
                        ng-if="r.group"
                        ng-style="body.groupRowStyles(r)" 
                        options="body.options"
                        on-group-toggle="body.onGroupToggle(group)"
                        expanded="body.getRowExpanded(r)"
                        tabindex="{{$index}}"
                        row="r">
          </dt-group-row>
          <dt-row ng-repeat-end
                  ng-if="!r.group"
                  row="body.getRowValue($index)"
                  tabindex="{{$index}}"
                  columns="body.columns"
                  column-widths="body.columnWidths"
                  ng-keydown="selCtrl.keyDown($event, $index, r)"
                  ng-click="selCtrl.rowClicked($event, r.$$index, r)"
                  ng-dblclick="selCtrl.rowDblClicked($event, r.$$index, r)"
                  on-tree-toggle="body.onTreeToggled(row, cell)"
                  ng-class="body.rowClasses(r)"
                  options="body.options"
                  selected="body.isSelected(r)"
                  on-checkbox-change="selCtrl.onCheckboxChange($event, $index, row)"
                  columns="body.columnsByPin"
                  has-children="body.getRowHasChildren(r)"
                  expanded="body.getRowExpanded(r)"
                  ng-style="body.rowStyles(r)">
          </dt-row>
        </dt-scroller>
        <div ng-if="body.rows && !body.rows.length" 
             class="empty-row" 
             ng-bind="::body.options.emptyMessage">
       </div>
       <div ng-if="body.rows === undefined" 
             class="loading-row"
             ng-bind="::body.options.loadingMessage">
        </div>
      </div>`
  };
}

function NextSortDirection(sortType, currentSort) {
  if (sortType === 'single') {
    if(currentSort === 'asc'){
      return 'desc';
    } else {
      return 'asc';
    }
  } else {
    if(!currentSort){
      return 'asc';
    } else if(currentSort === 'asc'){
      return 'desc';
    } else if(currentSort === 'desc'){
      return undefined;
    }
  }
}

class HeaderCellController{
  /**
   * Calculates the styles for the header cell directive
   * @return {styles}
   */
  styles(){
    return {
      width: this.column.width  + 'px',
      minWidth: this.column.minWidth  + 'px',
      maxWidth: this.column.maxWidth  + 'px',
      height: this.column.height  + 'px'
    };
  }

  /**
   * Calculates the css classes for the header cell directive
   */
  cellClass(){
    var cls = {
      'sortable': this.column.sortable,
      'resizable': this.column.resizable
    };

    if(this.column.headerClassName){
      cls[this.column.headerClassName] = true;
    }

    return cls;
  }

  /**
   * Toggles the sorting on the column
   */
  onSorted(){
    if(this.column.sortable){
      this.column.sort = NextSortDirection(this.sortType, this.column.sort);

      if (this.column.sort === undefined){
        this.column.sortPriority = undefined;
      }

      this.onSort({
        column: this.column
      });
    }
  }

  /**
   * Toggles the css class for the sort button
   */
  sortClass(){
    return {
      'sort-btn': true,
      'sort-asc icon-down': this.column.sort === 'asc',
      'sort-desc icon-up': this.column.sort === 'desc'
    };
  }

  /**
   * Updates the column width on resize
   * @param  {width}
   * @param  {column}
   */
  onResized(width, column){
    this.onResize({
      column: column,
      width: width
    });
  }

  /**
   * Invoked when the header cell directive checkbox was changed
   */
  onCheckboxChange(){
    this.onCheckboxChanged();
  }

}

function HeaderCellDirective($compile){
  return {
    restrict: 'E',
    controller: HeaderCellController,
    controllerAs: 'hcell',
    scope: true,
    bindToController: {
      options: '=',
      column: '=',
      onCheckboxChange: '&',
      onSort: '&',
      sortType: '=',
      onResize: '&',
      selected: '='
    },
    replace: true,
    template:
      `<div ng-class="hcell.cellClass()"
            class="dt-header-cell"
            draggable="true"
            data-id="{{column.$id}}"
            ng-style="hcell.styles()"
            title="{{::hcell.column.name}}">
        <div resizable="hcell.column.resizable"
             on-resize="hcell.onResized(width, hcell.column)"
             min-width="hcell.column.minWidth"
             max-width="hcell.column.maxWidth">
          <label ng-if="hcell.column.isCheckboxColumn && hcell.column.headerCheckbox" class="dt-checkbox">
            <input type="checkbox"
                   ng-checked="hcell.selected"
                   ng-click="hcell.onCheckboxChange()" />
          </label>
          <span class="dt-header-cell-label"
                ng-click="hcell.onSorted()">
          </span>
          <span ng-class="hcell.sortClass()"></span>
        </div>
      </div>`,
    compile: function() {
      return {
        pre: function($scope, $elm, $attrs, ctrl) {
          let label = $elm[0].querySelector('.dt-header-cell-label'), cellScope;

          if(ctrl.column.headerTemplate || ctrl.column.headerRenderer){
            cellScope = ctrl.options.$outer.$new(false);

            // copy some props
            cellScope.$header = ctrl.column.name;
            cellScope.$index = $scope.$index;
          }

          if(ctrl.column.headerTemplate){
            let elm = angular.element(`<span>${ctrl.column.headerTemplate.trim()}</span>`);
            angular.element(label).append($compile(elm)(cellScope));
          } else if(ctrl.column.headerRenderer){
            let elm = angular.element(ctrl.column.headerRenderer($elm));
            angular.element(label).append($compile(elm)(cellScope)[0]);
          } else {
            let val = ctrl.column.name;
            if(val === undefined || val === null) val = '';
            label.textContent = val;
          }
        }
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
  styles() {
    return {
      width: this.options.internal.innerWidth + 'px',
      height: this.options.headerHeight + 'px'
    }
  }

  /**
   * Returns the inner styles for the header directive
   * @param  {object} scope
   * @return {object} styles
   */
  innerStyles(){
    return {
      width: this.columnWidths.total + 'px'
    };
  }

  /**
   * Invoked when a column sort direction has changed
   * @param  {object} scope
   * @param  {object} column
   */
  onSorted(sortedColumn){
    if (this.options.sortType === 'single') {
      // if sort type is single, then only one column can be sorted at once,
      // so we set the sort to undefined for the other columns
      function unsortColumn(column) {
        if (column !== sortedColumn) {
          column.sort = undefined;
        }
      }

      this.columns.left.forEach(unsortColumn);
      this.columns.center.forEach(unsortColumn);
      this.columns.right.forEach(unsortColumn);
    }

    this.onSort({
      column: sortedColumn
    });
  }

  /**
   * Returns the styles by group for the headers.
   * @param  {scope}
   * @param  {group}
   * @return {styles object}
   */
  stylesByGroup(group){
    var styles = {
      width: this.columnWidths[group] + 'px'
    };

    if(group === 'center'){
      TranslateXY(styles, this.options.internal.offsetX * -1, 0);
    } else if(group === 'right'){
      var offset = (this.columnWidths.total - this.options.internal.innerWidth) *-1;
      TranslateXY(styles, offset, 0);
    }

    return styles;
  }

  /**
   * Invoked when the header cell directive's checkbox has changed.
   * @param  {scope}
   */
  onCheckboxChanged(){
    this.onCheckboxChange();
  }

  /**
   * Occurs when a header cell directive triggered a resize
   * @param  {object} scope
   * @param  {object} column
   * @param  {int} width
   */
  onResized(column, width){
    this.onResize({
      column: column,
      width: width
    });
  }

}

function HeaderDirective($timeout){
  return {
    restrict: 'E',
    controller: HeaderController,
    controllerAs: 'header',
    scope: true,
    bindToController: {
      options: '=',
      columns: '=',
      columnWidths: '=',
      onSort: '&',
      onResize: '&',
      onCheckboxChange: '&'
    },
    template: `
      <div class="dt-header" ng-style="header.styles()">

        <div class="dt-header-inner" ng-style="header.innerStyles()">
          <div class="dt-row-left"
               ng-style="header.stylesByGroup('left')"
               ng-if="header.columns['left'].length"
               sortable="header.options.reorderable"
               on-sortable-sort="columnsResorted(event, columnId)">
            <dt-header-cell
              ng-repeat="column in header.columns['left'] track by column.$id"
              on-checkbox-change="header.onCheckboxChanged()"
              on-sort="header.onSorted(column)"
              options="header.options"
              sort-type="header.options.sortType"
              on-resize="header.onResized(column, width)"
              selected="header.isSelected()"
              column="column">
            </dt-header-cell>
          </div>
          <div class="dt-row-center"
               sortable="header.options.reorderable"
               ng-style="header.stylesByGroup('center')"
               on-sortable-sort="columnsResorted(event, columnId)">
            <dt-header-cell
              ng-repeat="column in header.columns['center'] track by column.$id"
              on-checkbox-change="header.onCheckboxChanged()"
              on-sort="header.onSorted(column)"
              sort-type="header.options.sortType"
              selected="header.isSelected()"
              on-resize="header.onResized(column, width)"
              options="header.options"
              column="column">
            </dt-header-cell>
          </div>
          <div class="dt-row-right"
               ng-if="header.columns['right'].length"
               sortable="header.options.reorderable"
               ng-style="header.stylesByGroup('right')"
               on-sortable-sort="columnsResorted(event, columnId)">
            <dt-header-cell
              ng-repeat="column in header.columns['right'] track by column.$id"
              on-checkbox-change="header.onCheckboxChanged()"
              on-sort="header.onSorted(column)"
              sort-type="header.options.sortType"
              selected="header.isSelected()"
              on-resize="header.onResized(column, width)"
              options="header.options"
              column="column">
            </dt-header-cell>
          </div>
        </div>
      </div>`,
    replace:true,
    link: function($scope, $elm, $attrs, ctrl){

      $scope.columnsResorted = function(event, columnId){
        var col = findColumnById(columnId),
            parent = angular.element(event.currentTarget),
            newIdx = -1;

        angular.forEach(parent.children(), (c, i) => {
          if (columnId === angular.element(c).attr('data-id')) {
            newIdx = i;
          }
        });

        $timeout(() => {
          angular.forEach(ctrl.columns, (group) => {
            var idx = group.indexOf(col);
            if(idx > -1){

              // this is tricky because we want to update the index
              // in the orig columns array instead of the grouped one
              var curColAtIdx = group[newIdx],
                  siblingIdx = ctrl.options.columns.indexOf(curColAtIdx),
                  curIdx = ctrl.options.columns.indexOf(col);

              ctrl.options.columns.splice(curIdx, 1);
              ctrl.options.columns.splice(siblingIdx, 0, col);

              return false;
            }
          });

        });
      }

      var findColumnById = function(columnId){
        var columns = ctrl.columns.left.concat(ctrl.columns.center).concat(ctrl.columns.right)
        return columns.find(function(c){
          return c.$id === columnId;
        })
      }
    }
  };
}


/**
 * Sortable Directive
 * http://jsfiddle.net/RubaXa/zLq5J/3/
 * https://jsfiddle.net/hrohxze0/6/
 * @param {function}
 */
function SortableDirective($timeout) {
  return {
    restrict: 'A',
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
          target.parentNode.insertBefore(dragEl, target.nextSibling.nextSibling);
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
            columnId: angular.element(dragEl).attr('data-id')
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
function ResizableDirective($document, $timeout){
  return {
    restrict: 'A',
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

        var width = parent[0].clientWidth,
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
        if ($scope.onResize) {
          $timeout(function () {
            let width = parent[0].clientWidth;
            if (width < $scope.minWidth){
              width = $scope.minWidth;
            }
            $scope.onResize({ width: width });
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

let DataTableService = {

  // id: [ column defs ]
  columns: {},
  dTables: {},

  saveColumns(id, columnElms) {
    if (columnElms && columnElms.length) {
      let columnsArray = [].slice.call(columnElms);
      this.dTables[id] = columnsArray;
    }
  },

  /**
   * Create columns from elements
   * @param  {array} columnElms
   */
  buildColumns(scope, parse) {
    //FIXME: Too many nested for loops.  O(n3)

    // Iterate through each dTable
    angular.forEach(this.dTables, (columnElms, id) => {
      this.columns[id] = [];

      // Iterate through each column
      angular.forEach(columnElms, (c) => {
        let column = {};

        var visible = true;
        // Iterate through each attribute
        angular.forEach(c.attributes, (attr) => {
          let attrName = CamelCase(attr.name);

          // cuz putting className vs class on
          // a element feels weird
          switch (attrName) {
            case 'class':
              column.className = attr.value;
              break;
            case 'name':
            case 'prop':
              column[attrName] = attr.value;
              break;
            case 'headerRenderer':
            case 'cellRenderer':
            case 'cellDataGetter':
              column[attrName] = parse(attr.value);
              break;
            case 'visible':
              visible = parse(attr.value)(scope);
              break;
            default:
              column[attrName] = parse(attr.value)(scope);
              break;
          }
        });

        let header = c.getElementsByTagName('column-header');
        if(header.length){
          column.headerTemplate = header[0].innerHTML;
          c.removeChild(header[0])
        }

        if (c.innerHTML !== '') {
          column.template = c.innerHTML;
        }

        if (visible)
          this.columns[id].push(column);
      });
    });

    this.dTables = {};
  }
};


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
 * Resizes columns based on the flexGrow property, while respecting manually set widths
 * @param {array} colsByGroup
 * @param {int} maxWidth
 * @param {int} totalFlexGrow
 */
function ScaleColumns(colsByGroup, maxWidth, totalFlexGrow) {
  // calculate total width and flexgrow points for coulumns that can be resized
  angular.forEach(colsByGroup, (cols) => {
    cols.forEach((column) => {
      if (!column.canAutoResize){
        maxWidth -= column.width;
        totalFlexGrow -= column.flexGrow;
      } else {
        column.width = 0;
      }
    });
  });

  var hasMinWidth = {}
  var remainingWidth = maxWidth;

  // resize columns until no width is left to be distributed
  do {
    let widthPerFlexPoint = remainingWidth / totalFlexGrow;
    remainingWidth = 0;
    angular.forEach(colsByGroup, (cols) => {
      cols.forEach((column, i) => {
        // if the column can be resize and it hasn't reached its minimum width yet
        if (column.canAutoResize && !hasMinWidth[i]){
          let newWidth = column.width  + column.flexGrow * widthPerFlexPoint;
          if (column.minWidth !== undefined && newWidth < column.minWidth){
            remainingWidth += newWidth - column.minWidth;
            column.width = column.minWidth;
            hasMinWidth[i] = true;
          } else {
            column.width = newWidth;
          }
        }
      });
    });
  } while (remainingWidth !== 0);

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
 * Calculates the Total Flex Grow
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
 * Adjusts the column widths.
 * Inspired by: https://github.com/facebook/fixed-data-table/blob/master/src/FixedDataTableWidthHelper.js
 * @param {array} all columns
 * @param {int} width
 */
function AdjustColumnWidths(allColumns, expectedWidth){
  var columnsWidth = ColumnTotalWidth(allColumns),
      totalFlexGrow = GetTotalFlexGrow(allColumns),
      colsByGroup = ColumnsByPin(allColumns);

  if (columnsWidth !== expectedWidth){
    ScaleColumns(colsByGroup, expectedWidth, totalFlexGrow);
  }
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
  var contentWidth = 0,
      columnsToResize = startIdx > -1 ?
        allColumns.slice(startIdx, allColumns.length).filter((c) => { return c.canAutoResize }) :
        allColumns.filter((c) => { return c.canAutoResize });

  allColumns.forEach((c) => {
    if(!c.canAutoResize){
      contentWidth += c.width;
    } else {
      contentWidth += (c.$$oldWidth || c.width);
    }
  });

  var remainingWidth = expectedWidth - contentWidth,
      additionWidthPerColumn = remainingWidth / columnsToResize.length,
      exceedsWindow = contentWidth > expectedWidth;

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
 * Default Column Options
 * @type {object}
 */
const ColumnDefaults = {

  // pinned to the left
  frozenLeft: false,

  // pinned to the right
  frozenRight: false,

  // body cell css class name
  className: undefined,

  // header cell css class name
  headerClassName: undefined,

  // The grow factor relative to other columns. Same as the flex-grow
  // API from http://www.w3.org/TR/css3-flexbox/. Basically,
  // take any available extra width and distribute it proportionally
  // according to all columns' flexGrow values.
  flexGrow: 0,

  // Minimum width of the column.
  minWidth: 100,

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

  // If you want to sort a column by a special property
  // See an example in demos/sort.html
  sortBy: undefined,

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
  headerCheckbox: false,

  // Whether the column can automatically resize to fill space in the table.
  canAutoResize: true

};


/**
 * Default Table Options
 * @type {object}
 */
const TableDefaults = {

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
    offset: 0,

    // Loading indicator
    loadingIndicator: false
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

};

class DataTableController {

  /**
   * Creates an instance of the DataTable Controller
   * @param  {scope}
   * @param  {filter}
   */
  /*@ngInject*/
  constructor($scope, $filter, $log, $transclude){
    Object.assign(this, {
      $scope: $scope,
      $filter: $filter,
      $log: $log
    });

    this.defaults();

    // set scope to the parent
    this.options.$outer = $scope.$parent;

    $scope.$watch('dt.options.columns', (newVal, oldVal) => {
      this.transposeColumnDefaults();

      if(newVal.length !== oldVal.length){
        this.adjustColumns();
      }

      this.calculateColumns();
    }, true);

    // default sort
    var watch = $scope.$watch('dt.rows', (newVal) => {
      if(newVal){
        watch();
        this.onSorted();
      }
    });
  }

  /**
   * Creates and extends default options for the grid control
   */
  defaults(){
    this.expanded = this.expanded || {};

    this.options = angular.extend(angular.
      copy(TableDefaults), this.options);

    angular.forEach(TableDefaults.paging, (v,k) => {
      if(!this.options.paging[k]){
        this.options.paging[k] = v;
      }
    });

    if(this.options.selectable && this.options.multiSelect){
      this.selected = this.selected || [];
    }
  }

  /**
   * On init or when a column is added, we need to
   * make sure all the columns added have the correct
   * defaults applied.
   */
  transposeColumnDefaults(){
    for(var i=0, len = this.options.columns.length; i < len; i++) {
      var column = this.options.columns[i];
      column.$id = ObjectId();

      angular.forEach(ColumnDefaults, (v,k) => {
        if(!column.hasOwnProperty(k)){
          column[k] = v;
        }
      });

      if(column.name && !column.prop){
        column.prop = CamelCase(column.name);
      }

      this.options.columns[i] = column;
    }
  }

  /**
   * Calculate column groups and widths
   */
  calculateColumns(){
    var columns = this.options.columns;
    this.columnsByPin = ColumnsByPin(columns);
    this.columnWidths = ColumnGroupWidths(this.columnsByPin, columns);
  }

  /**
   * Returns the css classes for the data table.
   * @return {style object}
   */
  tableCss(){
    return {
      'fixed': this.options.scrollbarV,
      'selectable': this.options.selectable,
      'checkboxable': this.options.checkboxSelection
    };
  }

  /**
   * Adjusts the column widths to handle greed/etc.
   * @param  {int} forceIdx
   */
  adjustColumns(forceIdx){
    var width = this.options.internal.innerWidth - this.options.internal.scrollBarWidth;

    if(this.options.columnMode === 'force'){
      ForceFillColumnWidths(this.options.columns, width, forceIdx);
    } else if(this.options.columnMode === 'flex') {
      AdjustColumnWidths(this.options.columns, width);
    }
  }

  /**
   * Calculates the page size given the height * row height.
   * @return {[type]}
   */
  calculatePageSize(){
    this.options.paging.size = Math.ceil(
      this.options.internal.bodyHeight / this.options.rowHeight) + 1;
  }

  /**
   * Sorts the values of the grid for client side sorting.
   */
  onSorted(){
    if(!this.rows) return;

    // return all sorted column, in the same order in which they were sorted
    var sorts = this.options.columns
      .filter((c) => {
        return c.sort;
      })
      .sort((a, b) => {
        // sort the columns with lower sortPriority order first
        if (a.sortPriority && b.sortPriority){
          if (a.sortPriority > b.sortPriority) return 1;
          if (a.sortPriority < b.sortPriority) return -1;
        } else if (a.sortPriority){
          return -1;
        } else if (b.sortPriority){
          return 1;
        }

        return 0;
      })
      .map((c, i) => {
        // update sortPriority
        c.sortPriority = i + 1;
        return c;
      });

    if(sorts.length){
      this.onSort({sorts: sorts});

      if (this.options.onSort){
        this.options.onSort(sorts);
      }

      var clientSorts = [];
      for(var i=0, len=sorts.length; i < len; i++) {
        var c = sorts[i];
        if(c.comparator !== false){
          var dir = c.sort === 'asc' ? '' : '-';
          if (c.sortBy !== undefined) {
            clientSorts.push(dir + c.sortBy);
          } else {
            clientSorts.push(dir + c.prop);
          }
        }
      }

      if(clientSorts.length){
        // todo: more ideal to just resort vs splice and repush
        // but wasn't responding to this change ...
        var sortedValues = this.$filter('orderBy')(this.rows, clientSorts);
        this.rows.splice(0, this.rows.length);
        this.rows.push(...sortedValues);
      }
    }

    this.options.internal.setYOffset(0);
  }

  /**
   * Invoked when a tree is collasped/expanded
   * @param  {row model}
   * @param  {cell model}
   */
  onTreeToggled(row, cell){
    this.onTreeToggle({
      row: row,
      cell: cell
    });
  }

  /**
   * Invoked when the body triggers a page change.
   * @param  {offset}
   * @param  {size}
   */
  onBodyPage(offset, size){
    this.onPage({
      offset: offset,
      size: size
    });
  }

  /**
   * Invoked when the footer triggers a page change.
   * @param  {offset}
   * @param  {size}
   */
  onFooterPage(offset, size){
    var pageBlockSize = this.options.rowHeight * size,
        offsetY = pageBlockSize * offset;

    this.options.internal.setYOffset(offsetY);
  }

  /**
   * Invoked when the header checkbox directive has changed.
   */
  onHeaderCheckboxChange(){
    if(this.rows){
      var matches = this.selected.length === this.rows.length;
      this.selected.splice(0, this.selected.length);

      if(!matches){
        this.selected.push(...this.rows);
      }
    }
  }

  /**
   * Returns if all the rows are selected
   * @return {Boolean} if all selected
   */
  isAllRowsSelected(){
    if(this.rows) return false;
    return this.selected.length === this.rows.length;
  }

  /**
   * Occurs when a header directive triggered a resize event
   * @param  {object} column
   * @param  {int} width
   */
  onResized(column, width){
    var idx =this.options.columns.indexOf(column);
    if(idx > -1){
      var column = this.options.columns[idx];
      column.width = width;
      column.canAutoResize = false;

      this.adjustColumns(idx);
      this.calculateColumns();
    }

    if (this.onColumnResize){
      this.onColumnResize({
        column: column,
        width: width
      });
    }
  }

  /**
   * Occurs when a row was selected
   * @param  {object} rows
   */
  onSelected(rows){
    this.onSelect({
      rows: rows
    });
  }

  /**
   * Occurs when a row was click but may not be selected.
   * @param  {object} row
   */
  onRowClicked(row){
    this.onRowClick({
      row: row
    });
  }

  /**
   * Occurs when a row was double click but may not be selected.
   * @param  {object} row
   */
  onRowDblClicked(row){
    this.onRowDblClick({
      row: row
    });
  }

}

function DataTableDirective($window, $timeout, $parse){
  return {
    restrict: 'E',
    replace: true,
    controller: DataTableController,
    scope: true,
    bindToController: {
      options: '=',
      rows: '=',
      selected: '=?',
      expanded: '=?',
      onSelect: '&',
      onSort: '&',
      onTreeToggle: '&',
      onPage: '&',
      onRowClick: '&',
      onRowDblClick: '&',
      onColumnResize: '&'
    },
    controllerAs: 'dt',
    template: function(element){
      // Gets the column nodes to transposes to column objects
      // http://stackoverflow.com/questions/30845397/angular-expressive-directive-design/30847609#30847609
      var columns = element[0].getElementsByTagName('column'),
          id = ObjectId();
      DataTableService.saveColumns(id, columns);

      return `<div class="dt" ng-class="dt.tableCss()" data-column-id="${id}">
          <dt-header options="dt.options"
                     on-checkbox-change="dt.onHeaderCheckboxChange()"
                     columns="dt.columnsByPin"
                     column-widths="dt.columnWidths"
                     ng-if="dt.options.headerHeight"
                     on-resize="dt.onResized(column, width)"
                     selected="dt.isAllRowsSelected()"
                     on-sort="dt.onSorted()">
          </dt-header>
          <dt-body rows="dt.rows"
                   selected="dt.selected"
                   expanded="dt.expanded"
                   columns="dt.columnsByPin"
                   on-select="dt.onSelected(rows)"
                   on-row-click="dt.onRowClicked(row)"
                   on-row-dbl-click="dt.onRowDblClicked(row)"
                   column-widths="dt.columnWidths"
                   options="dt.options"
                   on-page="dt.onBodyPage(offset, size)"
                   on-tree-toggle="dt.onTreeToggled(row, cell)">
           </dt-body>
          <dt-footer ng-if="dt.options.footerHeight"
                     ng-style="{ height: dt.options.footerHeight + 'px' }"
                     on-page="dt.onFooterPage(offset, size)"
                     paging="dt.options.paging">
           </dt-footer>
        </div>`
    },
    compile: function(tElem, tAttrs){
      return {
        pre: function($scope, $elm, $attrs, ctrl){
          DataTableService.buildColumns($scope, $parse);

          // Check and see if we had expressive columns
          // and if so, lets use those
          var id = $elm.attr('data-column-id'),
              columns = DataTableService.columns[id];
          if (columns) {
            ctrl.options.columns = columns;
          }

          ctrl.transposeColumnDefaults();
          ctrl.options.internal.scrollBarWidth = ScrollbarWidth();

          /**
           * Invoked on init of control or when the window is resized;
           */
          function resize() {
            var rect = $elm[0].getBoundingClientRect();

            ctrl.options.internal.innerWidth = Math.floor(rect.width);

            if (ctrl.options.scrollbarV) {
              var height = rect.height;

              if (ctrl.options.headerHeight) {
                height = height - ctrl.options.headerHeight;
              }

              if (ctrl.options.footerHeight) {
                height = height - ctrl.options.footerHeight;
              }

              ctrl.options.internal.bodyHeight = height;
              ctrl.calculatePageSize();
            }

            ctrl.adjustColumns();
          };

          angular.element($window).on('resize', throttle(() => {
            $timeout(resize);
          }));

          // When an item is hidden for example
          // in a tab with display none, the height
          // is not calculated correrctly.  We need to watch
          // the visible attribute and resize if this occurs
          var checkVisibility = function() {
          var bounds = $elm[0].getBoundingClientRect(),
              visible = bounds.width && bounds.height;
            if (visible) resize();
            else $timeout(checkVisibility, 100);
          };
          checkVisibility();

          // add a loaded class to avoid flickering
          $elm.addClass('dt-loaded');

          // prevent memory leaks
          $scope.$on('$destroy', () => {
            angular.element($window).off('resize');
          });
        }
      };
    }
  };
}

var dataTable = angular
  .module('data-table', [])
  .directive('dtable', DataTableDirective)
  .directive('resizable', ResizableDirective)
  .directive('sortable', SortableDirective)
  .directive('dtHeader', HeaderDirective)
  .directive('dtHeaderCell', HeaderCellDirective)
  .directive('dtBody', BodyDirective)
  .directive('dtScroller', ScrollerDirective)
  .directive('dtSeletion', SelectionDirective)
  .directive('dtRow', RowDirective)
  .directive('dtGroupRow', GroupRowDirective)
  .directive('dtCell', CellDirective)
  .directive('dtFooter', FooterDirective)
  .directive('dtPager', PagerDirective);

export default dataTable;