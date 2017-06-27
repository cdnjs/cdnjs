angular.module('md.data.table', ['md.table.templates']);

angular.module('md.data.table').directive('mdColumnHeader', mdColumnHeader);

function mdColumnHeader($compile, $interpolate, $timeout) {
  'use strict';
  
  function postLink(scope, element, attrs, ctrls) {
    var tableCtrl = ctrls[0];
    var headCtrl = ctrls[1];
    var template = angular.element('<div></div>');
    
    template.text($interpolate.startSymbol() + 'name' + $interpolate.endSymbol());
    
    if(attrs.unit) {
      template.text(template.text() + ' (' + $interpolate.startSymbol() + 'unit' + $interpolate.endSymbol() + ')');
    }
    
    if(angular.isDefined(attrs.trim)) {
      template.contents().wrap('<div></div>');
    }
    
    if(attrs.orderBy) {
      var sortIcon = angular.element('<md-icon></md-icon>');
      
      var isActive = function () {
        return headCtrl.order === scope.order || headCtrl.order === '-' + scope.order;
      };
      
      var setOrder = function () {
        
        if(isActive()) {
          scope.$apply(headCtrl.order = headCtrl.order === scope.order ? '-' + scope.order : scope.order);
        } else {
          scope.$apply(headCtrl.order = angular.isDefined(attrs.descendFirst) ? '-' + scope.order : scope.order);
        }
        
        if(headCtrl.pullTrigger) {
          $timeout(headCtrl.pullTrigger);
        }
      };
      
      scope.getDirection = function () {
        if(isActive()) {
          return headCtrl.order[0] === '-' ? 'down' : 'up';
        }
        return angular.isDefined(attrs.descendFirst) ? 'down' : 'up';
      };
      
      sortIcon.attr('md-svg-icon', 'templates.arrow.html');
      sortIcon.attr('ng-class', 'getDirection()');
      
      if(angular.isDefined(attrs.numeric)) {
        template.prepend(sortIcon);
      } else {
        template.append(sortIcon);
      }
      
      element.on('click', setOrder);
      
      scope.$watch(isActive, function (active) {
        if(active) { element.addClass('md-active'); } else { element.removeClass('md-active'); }
      });
    }
    
    element.append($compile(template)(scope));
    
    if(headCtrl.isSignificant(element.parent())) {
      tableCtrl.setColumn(attrs);
      
      if(attrs.ngRepeat) {
        if(scope.$parent.$last) {
          tableCtrl.isReady.head.resolve();
        }
      } else if(tableCtrl.isLastChild(element.parent().children(), element[0])) {
        tableCtrl.isReady.head.resolve();
      }
    }
  }

  return {
    link: postLink,
    require: ['^^mdDataTable', '^mdTableHead'],
    scope: {
      name: '@',
      order: '@orderBy',
      unit: '@'
    }
  };
}

mdColumnHeader.$inject = ['$compile', '$interpolate', '$timeout'];

angular.module('md.data.table').directive('mdDataTable', mdDataTable);

function mdDataTable() {
  'use strict';
  
  function compile(tElement, tAttrs) {
    var head = tElement.find('thead');
    var foot = tElement.find('tfoot');
    
    // make sure the table has a head element
    if(!head.length) {
      head = tElement.find('tbody').eq(0);
      
      if(head.children().find('th').length) {
        head.replaceWith('<thead>' + head.html() + '</thead>');
      } else {
        throw new Error('mdDataTable', 'Expecting <thead></thead> element.');
      }
      
      head = tElement.find('thead');
    }
    
    var rows = tElement.find('tbody').find('tr');
    
    head.attr('md-table-head', '');
    rows.attr('md-table-row', '');
    rows.find('td').attr('md-table-cell', '');
    
    if(foot.length) {
      foot.attr('md-table-foot', '');
      
      if(tAttrs.mdRowSelect) {
        foot.find('tr').prepend('<td></td>');
      }
    }
    
    if(tAttrs.mdRowSelect && rows.attr('ng-repeat')) {
      rows.attr('md-select-row', '');
    }
    
    if(tAttrs.mdRowSelect && !rows.attr('ng-repeat')) {
      console.warn('Please use ngRepeat to enable row selection.');
    }
    
    if(head.attr('md-order') && !rows.attr('ng-repeat')) {
      console.warn('Column ordering without ngRepeat is not supported.');
    }
  }
  
  function Controller($attrs, $element, $q, $scope) {
    var self = this;
    
    self.columns = [];
    self.classes = [];
    self.isReady = {
      body: $q.defer(),
      head: $q.defer()
    };
    
    if($attrs.mdRowSelect) {
      self.columns.push({ isNumeric: false });
      
      if(!angular.isArray(self.selectedItems)) {
        self.selectedItems = [];
        // log warning for developer
        console.warn('md-row-select="' + $attrs.mdRowSelect + '" : ' +
        $attrs.mdRowSelect + ' is not defined as an array in your controller, ' +
        'i.e. ' + $attrs.mdRowSelect + ' = [], two-way data binding will fail.');
      }
    }
    
    if($attrs.mdProgress) {
      $scope.$watch('$mdDataTableCtrl.progress', function () {
        var deferred = self.defer();
        $q.when(self.progress)['finally'](deferred.resolve);
      });
    }
    
    // support theming
    ['md-primary', 'md-hue-1', 'md-hue-2', 'md-hue-3'].forEach(function(mdClass) {
      if($element.hasClass(mdClass)) {
        self.classes.push(mdClass);
      }
    });
    
    self.defer = function () {
      if(self.deferred) {
        self.deferred.reject('cancel');
      } else {
        if (self.showProgress) {
          self.showProgress();
        }
      }
      
      self.deferred = $q.defer();
      self.deferred.promise.then(self.resolve);
      
      return self.deferred;
    };
    
    self.resolve = function () {
      self.deferred = undefined;
      if (self.hideProgress) {
        self.hideProgress();
      }
    };
    
    self.isLastChild = function (siblings, child) {
      return Array.prototype.indexOf.call(siblings, child) === siblings.length - 1;
    };
    
    self.isReady.body.promise.then(function (ngRepeat) {
      if($attrs.mdRowSelect && ngRepeat) {
        self.listener = $scope.$parent.$watch(ngRepeat.items, function (newValue, oldeValue) {
          if(newValue !== oldeValue) {
            self.selectedItems.splice(0);
          }
        });
      }
    });
    
    self.setColumn = function (column) {
      self.columns.push({
        isNumeric: angular.isDefined(column.numeric),
        unit: column.unit
      });
    };
  }
  
  Controller.$inject = ['$attrs', '$element', '$q', '$scope'];
  
  return {
    bindToController: {
      progress: '=mdProgress',
      selectedItems: '=mdRowSelect'
    },
    compile: compile,
    controller: Controller,
    controllerAs: '$mdDataTableCtrl',
    restrict: 'A',
    scope: {}
  };
}


angular.module('md.data.table').directive('mdTableCell', mdTableCell);

function mdTableCell() {
  'use strict';
  
  function postLink(scope, element) {
    var select = element.find('md-select');
    
    if(select.length) {
      
      select.on('click', function (event) {
        event.stopPropagation();
      });
      
      element.addClass('clickable').on('click', function (event) {
        event.stopPropagation();
        select[0].click();
      });
    }
  }
  
  function compile(tElement) {
    tElement.find('md-select').attr('md-container-class', 'md-table-select');
    return postLink;
  }
  
  return {
    compile: compile
  };
}

angular.module('md.data.table').directive('mdTableFoot', mdTableFoot);

function mdTableFoot() {
  'use strict';

  function postLink(scope, element, attrs, tableCtrl) {
    var cells = element.find('td');
    
    tableCtrl.columns.forEach(function(column, index) {
      if(column.isNumeric) {
        cells.eq(index).addClass('numeric');
      }
    });
    
    if(cells.length < tableCtrl.columns.length) {
      element.find('tr').append('<td colspan="' + (tableCtrl.columns.length - cells.length) + '"></td>');
    }
  }
  
  return {
    require: '^mdDataTable',
    link: postLink
  };
}

angular.module('md.data.table').directive('mdTableHead', mdTableHead);

function mdTableHead($mdTable, $q) {
  'use strict';

  function compile(tElement) {
    tElement.find('th').attr('md-column-header', '');
    
    // enable row selection
    if(tElement.parent().attr('md-row-select')) {
      var ngRepeat = tElement.parent().find('tbody').find('tr').attr('ng-repeat');
      
      if(ngRepeat) {
        tElement.find('tr').prepend(angular.element('<th md-select-all="' + $mdTable.parse(ngRepeat).items + '"></th>'));
      }
    }
    
    tElement.after('<thead md-table-progress></thead>');
    
    return postLink;
  }
  
  function Controller($element, $scope) {
    var rows = $element.find('tr');
    
    if(!$scope.sigRow || parseInt($scope.sigRow, 10) === isNaN() || $scope.sigRow < 0) {
      $scope.sigRow = rows.length - 1;
    }
    
    // when tables headers have multiple rows we need a significant row
    // to append the checkbox to and to controll the text alignment for
    // numeric columns
    this.isSignificant = function (row) {
      return row.prop('rowIndex') === $scope.sigRow;
    };
  }
  
  function postLink(scope, element, attrs, tableCtrl) {
    var controller = element.data('$mdTableHeadController');
    
    // table progress
    if(angular.isFunction(scope.trigger)) {
      controller.pullTrigger = function () {
        var deferred = tableCtrl.defer();
        $q.when(scope.trigger(controller.order))['finally'](deferred.resolve);
      };
    }
  }
  
  Controller.$inject = ['$element', '$scope'];
  
  return {
    bindToController: {
      order: '=mdOrder'
    },
    compile: compile,
    controller: Controller,
    controllerAs: '$mdDataTableHeadCtrl',
    require: '^mdDataTable',
    scope: {
      trigger: '=?mdTrigger',
      sigRow: '=?'
    }
  };
}

mdTableHead.$inject = ['$mdTable', '$q'];

angular.module('md.data.table').directive('mdDataTablePagination', mdDataTablePagination);

function mdDataTablePagination($q) {
  'use strict';

  function postLink(scope, element, attrs) {
    scope.paginationLabel = {
      text: 'Rows per page:',
      of: 'of'
    };
    
    if(angular.isObject(scope.label)) {
      angular.extend(scope.paginationLabel, scope.label);
    }
    
    // table progress
    if(angular.isFunction(scope.trigger)) {
      
      // the pagination directive is outside the table directive so we need
      // to locate the controller
      var findTable = function(element, callback) {
        while(element.localName !== 'md-data-table-container' && element.previousElementSibling) {
          element = element.previousElementSibling;
        }
        callback(angular.element(element.firstElementChild));
      };
      
      var setTrigger = function(table) {
        var tableCtrl = table.controller('mdDataTable');
        
        if(!tableCtrl) {
          return console.warn('Table Pagination: Could not locate your table directive, your ' + attrs.mdTrigger + ' function will not work.');
        }
        
        scope.pullTrigger = function () {
          var deferred = tableCtrl.defer();
          $q.when(scope.trigger(scope.page, scope.limit))['finally'](deferred.resolve);
        };
      };
      
      findTable(element.prop('previousElementSibling'), setTrigger);
    }
  }
  
  function Controller($scope, $timeout) {
    var min = 1;
    
    $scope.hasNext = function () {
      return (($scope.page * $scope.limit) < $scope.total);
    };
    
    $scope.hasPrevious = function () {
      return ($scope.page > 1);
    };
    
    $scope.next = function () {
      $scope.page++;
      
      if($scope.pullTrigger) {
        $timeout($scope.pullTrigger);
      }
      
      min = $scope.min();
    };
    
    $scope.last = function () {
      $scope.page = Math.ceil($scope.total / $scope.limit);
      
      if($scope.pullTrigger) {
        $timeout($scope.pullTrigger);
      }
      
      min = $scope.min();
    };
    
    $scope.min = function () {
      return ((($scope.page - 1) * $scope.limit) + 1);
    };
    
    $scope.max = function () {
      return $scope.hasNext() ? $scope.page * $scope.limit : $scope.total;
    };
    
    $scope.onSelect = function () {
      $scope.page = Math.floor(min / $scope.limit) + 1;
      
      if($scope.pullTrigger) {
        $timeout($scope.pullTrigger);
      }
      
      min = $scope.min();
      while((min > $scope.total) && $scope.hasPrevious()) {
        $scope.previous();
      }
    };
    
    $scope.previous = function () {
      $scope.page--;
      
      if($scope.pullTrigger) {
        $timeout($scope.pullTrigger);
      }
      
      min = $scope.min();
    };
    
    $scope.first = function () {
      $scope.page = 1;
      
      if($scope.pullTrigger) {
        $timeout($scope.pullTrigger);
      }
      
      min = $scope.min();
    };
  }
  
  Controller.$inject = ['$scope', '$timeout'];

  return {
    controller: Controller,
    scope: {
      label: '=mdLabel',
      limit: '=mdLimit',
      page: '=mdPage',
      rowSelect: '=mdRowSelect',
      total: '@mdTotal',
      trigger: '=mdTrigger'
    },
    templateUrl: 'templates.md-data-table-pagination.html',
    link: postLink
  };
}

mdDataTablePagination.$inject = ['$q'];

angular.module('md.data.table').directive('mdTableProgress', mdTableProgress);

function mdTableProgress() {
  'use strict';
  
  function postLink(scope, element, attrs, tableCtrl) {
    
    scope.getColumnCount = function () {
      return tableCtrl.columns.length;
    };
    
    tableCtrl.hideProgress = function () {
      scope.showProgress = false;
    };
    
    tableCtrl.showProgress = function () {
      scope.showProgress = true;
    };
  }
  
  return {
    link: postLink,
    require: '^mdDataTable',
    replace: true,
    templateUrl: 'templates.md-data-table-progress.html'
  };
}


angular.module('md.data.table').directive('mdTableRow', mdTableRow);

function mdTableRow($mdTable, $timeout) {
  'use strict';

  function postLink(scope, element, attrs, tableCtrl) {
    
    if(angular.isDefined(attrs.mdSelectRow)) {
      scope.mdClasses = tableCtrl.classes;
      
      scope.isDisabled = function() {
        return scope.$eval(attrs.mdDisableSelect);
      };
      
      scope.isSelected = function (item) {
        return tableCtrl.selectedItems.indexOf(item) !== -1;
      };
      
      scope.toggleRow = function (item, event) {
        event.stopPropagation();
        
        if(scope.isDisabled()) {
          return;
        }
        
        if(scope.isSelected(item)) {
          tableCtrl.selectedItems.splice(tableCtrl.selectedItems.indexOf(item), 1);
        } else {
          tableCtrl.selectedItems.push(item);
        }
      };
    }
    
    if(attrs.ngRepeat) {
      if(scope.$last) {
        tableCtrl.isReady.body.resolve($mdTable.parse(attrs.ngRepeat));
      }
    } else if(tableCtrl.isLastChild(element.parent().children(), element[0])) {
      tableCtrl.isReady.body.resolve();
    }
    
    tableCtrl.isReady.head.promise.then(function () {
      tableCtrl.columns.forEach(function (column, index) {
        if(column.isNumeric) {
          var cell = element.children().eq(index);
          
          cell.addClass('numeric');
          
          if(angular.isDefined(cell.attr('show-unit'))) {
            $timeout(function () {
              cell.text(cell.text() + tableCtrl.columns[index].unit);
            });
          }
        }
      });
    });
  }
  
  return {
    link: postLink,
    require: '^^mdDataTable'
  };
}

mdTableRow.$inject = ['$mdTable', '$timeout'];

angular.module('md.data.table').factory('$mdTable', mdTableService);

function mdTableService() {
  'use strict';
  
  var cache = {};
  
  function Repeat(ngRepeat) {
    this._tokens = ngRepeat.split(' ');
    this._iterator = 0;
    
    this.item = this.current();
    while(this.hasNext() && this.getNext() !== 'in') {
      this.item += this.current();
    }
    
    this.items = this.getNext();
    while(this.hasNext() && ['|', 'track'].indexOf(this.getNext()) === -1) {
      this.items += this.current();
    }
  }
  
  Repeat.prototype.current = function () {
    return this._tokens[this._iterator];
  };
  
  Repeat.prototype.getNext = function() {
    return this._tokens[++this._iterator];
  };
  
  Repeat.prototype.getValue = function() {
    return this._tokens.join(' ');
  };
  
  Repeat.prototype.hasNext = function () {
    return this._iterator < this._tokens.length - 1;
  };
  
  function parse(ngRepeat) {
    if(!cache.hasOwnProperty(ngRepeat)) {
      return (cache[ngRepeat] = new Repeat(ngRepeat));
    }
    
    return cache[ngRepeat];
  }
  
  return {
    parse: parse
  };
  
}

angular.module('md.data.table').directive('mdSelectAll', mdSelectAll);

function mdSelectAll() {
  'use strict';
  
  function template(tElement) {
    var checkbox = angular.element('<md-checkbox></md-checkbox>');
    
    checkbox.attr('aria-label', 'Select All');
    checkbox.attr('ng-click', 'toggleAll()');
    checkbox.attr('ng-class', 'mdClasses');
    checkbox.attr('ng-checked', 'allSelected()');
    checkbox.attr('ng-disabled', '!getCount()');
    
    tElement.append(checkbox);
  }
  
  function postLink(scope, element, attrs, tableCtrl) {
    var count = 0;
    
    var getSelectableItems = function() {
      return scope.items.filter(function (item) {
        return !tableCtrl.isDisabled(item);
      });
    };
    
    tableCtrl.isReady.body.promise.then(function () {
      scope.mdClasses = tableCtrl.classes;
      
      scope.getCount = function() {
        return (count = scope.items.reduce(function(sum, item) {
          return tableCtrl.isDisabled(item) ? sum : ++sum;
        }, 0));
      };
      
      scope.allSelected = function () {
        return count && count === tableCtrl.selectedItems.length;
      };
      
      scope.toggleAll = function () {
        var selectableItems = getSelectableItems(scope.items);
        
        if(selectableItems.length === tableCtrl.selectedItems.length) {
          tableCtrl.selectedItems.splice(0);
        } else {
          tableCtrl.selectedItems = selectableItems;
        }
      };
    });
  }
  
  return {
    link: postLink,
    require: '^^mdDataTable',
    scope: {
      items: '=mdSelectAll'
    },
    template: template
  };
}


angular.module('md.data.table').directive('mdSelectRow', mdSelectRow);

function mdSelectRow($mdTable) {
  'use strict';
  
  function template(tElement, tAttrs) {
    var ngRepeat = $mdTable.parse(tAttrs.ngRepeat);
    var checkbox = angular.element('<md-checkbox></md-checkbox>');
    
    checkbox.attr('aria-label', 'Select Row');
    checkbox.attr('ng-click', 'toggleRow(' + ngRepeat.item + ', $event)');
    checkbox.attr('ng-class', 'mdClasses');
    checkbox.attr('ng-checked', 'isSelected(' + ngRepeat.item + ')');
    
    if(tAttrs.mdDisableSelect) {
      checkbox.attr('ng-disabled', 'isDisabled()');
    }
    
    tElement.prepend(angular.element('<td></td>').append(checkbox));
    
    if(angular.isDefined(tAttrs.mdAutoSelect)) {
      tAttrs.$set('ngClick', 'toggleRow(' + ngRepeat.item + ', $event)');
    }
    
    tAttrs.$set('ngClass', '{\'md-selected\': isSelected(' + ngRepeat.item + ')}');
  }
  
  function postLink(scope, element, attrs, tableCtrl) {
    var model = {};
    var ngRepeat = $mdTable.parse(attrs.ngRepeat);
    
    if(!angular.isFunction(scope.isDisabled)) {
      scope.isDisabled = function () { return false; };
    }
    
    tableCtrl.isDisabled = function (item) {
      model[ngRepeat.item] = item;
      return scope.isDisabled(model);
    };
  }
  
  return {
    link: postLink,
    priority: 1001,
    require: '^^mdDataTable',
    scope: {
      isDisabled: '&?mdDisableSelect'
    },
    template: template
  };
}

mdSelectRow.$inject = ['$mdTable'];


angular.module('md.table.templates', ['templates.arrow.html', 'templates.navigate-before.html', 'templates.navigate-first.html', 'templates.navigate-last.html', 'templates.navigate-next.html', 'templates.md-data-table-pagination.html', 'templates.md-data-table-progress.html']);

angular.module('templates.arrow.html', []).run(['$templateCache', function($templateCache) {
  'use strict';
  $templateCache.put('templates.arrow.html',
    '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M3,9 L4.06,10.06 L8.25,5.87 L8.25,15 L9.75,15 L9.75,5.87 L13.94,10.06 L15,9 L9,3 L3,9 L3,9 Z"/></svg>');
}]);

angular.module('templates.navigate-before.html', []).run(['$templateCache', function($templateCache) {
  'use strict';
  $templateCache.put('templates.navigate-before.html',
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>\n' +
    '');
}]);

angular.module('templates.navigate-first.html', []).run(['$templateCache', function($templateCache) {
  'use strict';
  $templateCache.put('templates.navigate-first.html',
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7 6 v12 h2 v-12 h-2z M17.41 7.41L16 6l-6 6 6 6 1.41-1.41L12.83 12z"/></svg>\n' +
    '');
}]);

angular.module('templates.navigate-last.html', []).run(['$templateCache', function($templateCache) {
  'use strict';
  $templateCache.put('templates.navigate-last.html',
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15 6 v12 h2 v-12 h-2z M8 6L6.59 7.41 11.17 12l-4.58 4.59L8 18l6-6z"/></svg>\n' +
    '');
}]);

angular.module('templates.navigate-next.html', []).run(['$templateCache', function($templateCache) {
  'use strict';
  $templateCache.put('templates.navigate-next.html',
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>\n' +
    '');
}]);

angular.module('templates.md-data-table-pagination.html', []).run(['$templateCache', function($templateCache) {
  'use strict';
  $templateCache.put('templates.md-data-table-pagination.html',
    '<div>\n' +
    '  <span class="label">{{paginationLabel.text}}</span>\n' +
    '  <md-select ng-model="limit" md-container-class="md-pagination-select" ng-change="onSelect()" aria-label="Row Count" placeholder="{{rowSelect ? rowSelect[0] : 5}}">\n' +
    '    <md-option ng-repeat="rows in rowSelect ? rowSelect : [5, 10, 15]" ng-value="rows">{{rows}}</md-option>\n' +
    '  </md-select>\n' +
    '  <span>{{min()}} - {{max()}} {{paginationLabel.of}} {{total}}</span>\n' +
    '</div>\n' +
    '<div>\n' +
    '  <md-button ng-click="first()" ng-disabled="!hasPrevious()" aria-label="First">\n' +
    '    <md-icon md-svg-icon="templates.navigate-first.html"></md-icon>\n' +
    '  </md-button>\n' +
    '  <md-button ng-click="previous()" ng-disabled="!hasPrevious()" aria-label="Previous">\n' +
    '    <md-icon md-svg-icon="templates.navigate-before.html"></md-icon>\n' +
    '  </md-button>\n' +
    '  <md-button ng-click="next()" ng-disabled="!hasNext()" aria-label="Next">\n' +
    '    <md-icon md-svg-icon="templates.navigate-next.html"></md-icon>\n' +
    '  </md-button>\n' +
    '  <md-button ng-click="last()" ng-disabled="!hasNext()" aria-label="Last">\n' +
    '    <md-icon md-svg-icon="templates.navigate-last.html"></md-icon>\n' +
    '  </md-button>\n' +
    '</div>\n' +
    '');
}]);

angular.module('templates.md-data-table-progress.html', []).run(['$templateCache', function($templateCache) {
  'use strict';
  $templateCache.put('templates.md-data-table-progress.html',
    '<thead ng-if="showProgress">\n' +
    '  <tr>\n' +
    '    <th colspan="{{getColumnCount()}}">\n' +
    '      <md-progress-linear md-mode="indeterminate"></md-progress-linear>\n' +
    '    </th>\n' +
    '  </tr>\n' +
    '</thead>');
}]);
