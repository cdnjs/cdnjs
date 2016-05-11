/*
 * Angular Material Data Table
 * https://github.com/daniel-nagy/md-data-table
 * @license MIT
 * v0.9.14
 */
(function (window, angular, undefined) {
'use strict';

angular.module('md.table.templates', ['md-table-pagination.html', 'md-table-progress.html', 'arrow-up.svg', 'navigate-before.svg', 'navigate-first.svg', 'navigate-last.svg', 'navigate-next.svg']);

angular.module('md-table-pagination.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('md-table-pagination.html',
    '<span class="label" ng-if="$pagination.showPageSelect()">{{ $pagination.$label[\'page\'] }}</span>\n' +
    '\n' +
    '<md-select class="md-table-select" ng-if="$pagination.showPageSelect()" ng-model="$pagination.page" md-container-class="md-pagination-select" ng-change="$pagination.onPaginationChange()" aria-label="Page">\n' +
    '  <md-option ng-repeat="num in $pagination.range($pagination.pages()) track by $index" ng-value="$index + 1">{{$index + 1}}</md-option>\n' +
    '</md-select>\n' +
    '\n' +
    '<span class="label">{{ $pagination.$label[\'rowsPerPage\'] }}</span>\n' +
    '\n' +
    '<md-select class="md-table-select" ng-model="$pagination.limit" md-container-class="md-pagination-select" aria-label="Rows" placeholder="{{$pagination.options ? $pagination.options[0] : 5}}">\n' +
    '  <md-option ng-repeat="rows in $pagination.options ? $pagination.options : [5, 10, 15]" ng-value="rows">{{rows}}</md-option>\n' +
    '</md-select>\n' +
    '\n' +
    '<span class="label">{{$pagination.min() + 1}} - {{$pagination.max()}} {{ $pagination.$label[\'of\'] }} {{$pagination.total}}</span>\n' +
    '\n' +
    '<md-button class="md-icon-button" type="button" ng-if="$pagination.showBoundaryLinks()" ng-click="$pagination.first()" ng-disabled="!$pagination.hasPrevious()" aria-label="First">\n' +
    '  <md-icon md-svg-icon="navigate-first.svg"></md-icon>\n' +
    '</md-button>\n' +
    '<md-button class="md-icon-button" type="button" ng-click="$pagination.previous()" ng-disabled="!$pagination.hasPrevious()" aria-label="Previous">\n' +
    '  <md-icon md-svg-icon="navigate-before.svg"></md-icon>\n' +
    '</md-button>\n' +
    '<md-button class="md-icon-button" type="button" ng-click="$pagination.next()" ng-disabled="$pagination.disableNext()" aria-label="Next">\n' +
    '  <md-icon md-svg-icon="navigate-next.svg"></md-icon>\n' +
    '</md-button>\n' +
    '<md-button class="md-icon-button" type="button" ng-if="$pagination.showBoundaryLinks()" ng-click="$pagination.last()" ng-disabled="$pagination.disableNext()" aria-label="Last">\n' +
    '  <md-icon md-svg-icon="navigate-last.svg"></md-icon>\n' +
    '</md-button>');
}]);

angular.module('md-table-progress.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('md-table-progress.html',
    '<tr>\n' +
    '  <th colspan="{{columnCount()}}">\n' +
    '    <md-progress-linear ng-show="deferred()" md-mode="indeterminate"></md-progress-linear>\n' +
    '  </th>\n' +
    '</tr>');
}]);

angular.module('arrow-up.svg', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('arrow-up.svg',
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"/></svg>');
}]);

angular.module('navigate-before.svg', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('navigate-before.svg',
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>');
}]);

angular.module('navigate-first.svg', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('navigate-first.svg',
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7 6 v12 h2 v-12 h-2z M17.41 7.41L16 6l-6 6 6 6 1.41-1.41L12.83 12z"/></svg>');
}]);

angular.module('navigate-last.svg', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('navigate-last.svg',
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15 6 v12 h2 v-12 h-2z M8 6L6.59 7.41 11.17 12l-4.58 4.59L8 18l6-6z"/></svg>');
}]);

angular.module('navigate-next.svg', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('navigate-next.svg',
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>');
}]);


angular.module('md.data.table', ['md.table.templates']);

angular.module('md.data.table').directive('mdBody', mdBody);

function mdBody() {

  function compile(tElement) {
    tElement.addClass('md-body');
  }

  return {
    compile: compile,
    restrict: 'A'
  };
}

angular.module('md.data.table').directive('mdCell', mdCell);

function mdCell() {
  
  function compile(tElement) {
    var select = tElement.find('md-select');
    
    if(select.length) {
      select.addClass('md-table-select').attr('md-container-class', 'md-table-select');
    }
    
    tElement.addClass('md-cell');
    
    return postLink;
  }
  
  // empty controller to be bind properties to in postLink function
  function Controller() {
    
  }
  
  function postLink(scope, element, attrs, ctrls) {
    var select = element.find('md-select');
    var cellCtrl = ctrls.shift();
    var tableCtrl = ctrls.shift();
    
    if(attrs.ngClick) {
      element.addClass('md-clickable');
    }
    
    if(select.length) {
      select.on('click', function (event) {
        event.stopPropagation();
      });
      
      element.addClass('md-clickable').on('click', function (event) {
        event.stopPropagation();
        select[0].click();
      });
    }
    
    cellCtrl.getTable = tableCtrl.getElement;
    
    function getColumn() {
      return tableCtrl.$$columns[getIndex()];
    }
    
    function getIndex() {
      return Array.prototype.indexOf.call(element.parent().children(), element[0]);
    }
    
    scope.$watch(getColumn, function (column) {
      if(!column) {
        return;
      }
      
      if(column.numeric) {
        element.addClass('md-numeric');
      } else {
        element.removeClass('md-numeric');
      }
    });
  }
  
  return {
    controller: Controller,
    compile: compile,
    require: ['mdCell', '^^mdTable'],
    restrict: 'A'
  };
}

angular.module('md.data.table').directive('mdColumn', mdColumn);

function mdColumn($compile) {
  
  function compile(tElement) {
    tElement.addClass('md-column');
    return postLink;
  }

  function postLink(scope, element, attrs, ctrls) {
    var headCtrl = ctrls.shift();
    var tableCtrl = ctrls.shift();
    
    function attachSortIcon() {
      var sortIcon = angular.element('<md-icon md-svg-icon="arrow-up.svg">');
      
      $compile(sortIcon.addClass('md-sort-icon').attr('ng-class', 'getDirection()'))(scope);
      
      if(element.hasClass('md-numeric')) {
        element.prepend(sortIcon);
      } else {
        element.append(sortIcon);
      }
    }
    
    function detachSortIcon() {
      Array.prototype.some.call(element.find('md-icon'), function (icon) {
        return icon.classList.contains('md-sort-icon') && element[0].removeChild(icon);
      });
    }
    
    function disableSorting() {
      detachSortIcon();
      element.removeClass('md-sort').off('click', setOrder);
    }
    
    function enableSorting() {
      attachSortIcon();
      element.addClass('md-sort').on('click', setOrder);
    }
    
    function getIndex() {
      return Array.prototype.indexOf.call(element.parent().children(), element[0]);
    }
    
    function isActive() {
      if(!scope.orderBy) {
        return false;
      }
      
      return headCtrl.order === scope.orderBy || headCtrl.order === '-' + scope.orderBy;
    }
    
    function isNumeric() {
      if(attrs.hasOwnProperty('mdNumeric') && attrs.mdNumeric === '') {
        return true;
      }
      
      return scope.numeric;
    }
    
    function setOrder() {
      scope.$applyAsync(function () {
        if(!isActive()) {
          headCtrl.order = scope.getDirection() === 'md-asc' ? scope.orderBy : '-' + scope.orderBy;
        } else {
          headCtrl.order = scope.getDirection() === 'md-asc' ? '-' + scope.orderBy : scope.orderBy;
        }
        
        if(angular.isFunction(headCtrl.onReorder)) {
          headCtrl.onReorder(headCtrl.order);
        }
      });
    }
    
    function updateColumn(index, column) {
      tableCtrl.$$columns[index] = column;
      
      if(column.numeric) {
        element.addClass('md-numeric');
      } else {
        element.removeClass('md-numeric');
      }
    }
    
    scope.getDirection = function () {
      if(!isActive()) {
        return attrs.hasOwnProperty('mdDesc') ? 'md-desc' : 'md-asc';
      }
      
      return headCtrl.order === '-' + scope.orderBy ? 'md-desc' : 'md-asc';
    };
    
    scope.$watch(isActive, function (active) {
      if(active) {
        element.addClass('md-active');
      } else {
        element.removeClass('md-active');
      }
    });
    
    scope.$watch(getIndex, function (index) {
      updateColumn(index, {'numeric': isNumeric()});
    });
    
    scope.$watch(isNumeric, function (numeric) {
      updateColumn(getIndex(), {'numeric': numeric});
    });
    
    scope.$watch('orderBy', function (orderBy) {
      if(orderBy) {
        enableSorting();
      } else {
        disableSorting();
      }
    });
  }

  return {
    compile: compile,
    require: ['^^mdHead', '^^mdTable'],
    restrict: 'A',
    scope: {
      numeric: '=?mdNumeric',
      orderBy: '@?mdOrderBy'
    }
  };
}

mdColumn.$inject = ['$compile'];

angular.module('md.data.table')
  .decorator('$controller', controllerDecorator)
  .factory('$mdEditDialog', mdEditDialog);

/*
 * A decorator for ng.$controller to optionally bind properties to the
 * controller before invoking the constructor. Stolen from the ngMock.
 *
 * https://docs.angularjs.org/api/ngMock/service/$controller
 */
function controllerDecorator($delegate) {
  return function(expression, locals, later, ident) {
    if(later && typeof later === 'object') {
      var create = $delegate(expression, locals, true, ident);
      angular.extend(create.instance, later);
      return create();
    }
    return $delegate(expression, locals, later, ident);
  };
}

controllerDecorator.$inject = ['$delegate'];
  
function mdEditDialog($compile, $controller, $document, $mdUtil, $q, $rootScope, $templateCache, $templateRequest, $window) {
  /* jshint validthis: true */
  
  var ESCAPE = 27;
  
  var busy = false;
  var body = angular.element($document.prop('body'));
  
  /*
   * bindToController
   * controller
   * controllerAs
   * locals
   * resolve
   * scope
   * targetEvent
   * template
   * templateUrl
   */
  var defaultOptions = {
    clickOutsideToClose: true,
    disableScroll: true,
    escToClose: true,
    focusOnOpen: true
  };
  
  function build(template, options) {
    var scope = $rootScope.$new();
    var element = $compile(template)(scope);
    var backdrop = $mdUtil.createBackdrop(scope, 'md-edit-dialog-backdrop');
    var controller;
    
    if(options.controller) {
      controller = getController(options, scope, {$element: element, $scope: scope});
    } else {
      angular.extend(scope, options.scope);
    }
    
    if(options.disableScroll) {
      disableScroll(element);
    }
    
    body.prepend(backdrop).append(element.addClass('md-whiteframe-1dp'));
    
    positionDialog(element, options.target);
    
    if(options.focusOnOpen) {
      focusOnOpen(element);
    }
    
    if(options.clickOutsideToClose) {
      backdrop.on('click', function () {
        element.remove();
      });
    }
    
    if(options.escToClose) {
      escToClose(element);
    }
    
    element.on('$destroy', function () {
      busy = false;
      backdrop.remove();
    });
    
    return controller;
  }
  
  function disableScroll(element) {
    var restoreScroll = $mdUtil.disableScrollAround(element, body);
    
    element.on('$destroy', function () {
      restoreScroll();
    });
  }
  
  function getController(options, scope, inject) {
    if(!options.controller) {
      return;
    }
    
    if(options.resolve) {
      angular.extend(inject, options.resolve);
    }
    
    if(options.locals) {
      angular.extend(inject, options.locals);
    }
    
    if(options.controllerAs) {
      scope[options.controllerAs] = {};
      
      if(options.bindToController) {
        angular.extend(scope[options.controllerAs], options.scope);
      } else {
        angular.extend(scope, options.scope);
      }
    } else {
      angular.extend(scope, options.scope);
    }
    
    if(options.bindToController) {
      return $controller(options.controller, inject, scope[options.controllerAs]);
    } else {
      return $controller(options.controller, inject);
    }
  }
  
  function getTemplate(options) {
    return $q(function (resolve, reject) {
      var template = options.template;
      
      function illegalType(type) {
        reject('Unexpected template value. Expected a string; received a ' + type + '.');
      }
      
      if(template) {
        return angular.isString(template) ? resolve(template) : illegalType(typeof template);
      }
      
      if(options.templateUrl) {
        template = $templateCache.get(options.templateUrl);
        
        if(template) {
          return resolve(template);
        }
        
        var success = function (template) {
          return resolve(template);
        };
        
        var error = function () {
          return reject('Error retrieving template from URL.');
        };
        
        return $templateRequest(options.templateUrl).then(success, error);
      }
      
      reject('Template not provided.');
    });
  }
  
  function logError(error) {
    busy = false;
    console.error(error);
  }
  
  function escToClose(element) {
    var keyup = function (event) {
      if(event.keyCode === ESCAPE) {
        element.remove();
      }
    };
    
    body.on('keyup', keyup);
    
    element.on('$destroy', function () {
      body.off('keyup', keyup);
    });
  }

  function focusOnOpen(element) {
    $mdUtil.nextTick(function () {
      var autofocus = $mdUtil.findFocusTarget(element);
      
      if(autofocus) {
        autofocus.focus();
      }
    }, false);
  }

  function positionDialog(element, target) {
    var table = angular.element(target).controller('mdCell').getTable();
    
    var getHeight = function () {
      return element.prop('clientHeight');
    };
    
    var getSize = function () {
      return {
        width: getWidth(),
        height: getHeight()
      };
    };
    
    var getTableBounds = function () {
      var parent = table.parent();
      
      if(parent.prop('tagName') === 'MD-TABLE-CONTAINER') {
        return parent[0].getBoundingClientRect();
      } else {
        return table[0].getBoundingClientRect();
      }
    };
    
    var getWidth = function () {
      return element.prop('clientWidth');
    };
    
    var reposition = function () {
      var size = getSize();
      var cellBounds = target.getBoundingClientRect();
      var tableBounds = getTableBounds();
      
      if(size.width > tableBounds.right - cellBounds.left) {
        element.css('left', tableBounds.right - size.width + 'px');
      } else {
        element.css('left', cellBounds.left + 'px');
      }
      
      if(size.height > tableBounds.bottom - cellBounds.top) {
        element.css('top', tableBounds.bottom - size.height + 'px');
      } else {
        element.css('top', cellBounds.top + 1 + 'px');
      }
      
      element.css('minWidth', cellBounds.width + 'px');
    };
    
    var watchWidth = $rootScope.$watch(getWidth, reposition);
    var watchHeight = $rootScope.$watch(getHeight, reposition);
    
    $window.addEventListener('resize', reposition);
    
    element.on('$destroy', function () {
      watchWidth();
      watchHeight();
      
      $window.removeEventListener('resize', reposition);
    });
  }
  
  function preset(size, options) {
    
    function getAttrs() {
      var attrs = 'type="' + (options.type || 'text') + '"';
      
      for(var attr in options.validators) {
        attrs += ' ' + attr + '="' + options.validators[attr] + '"';
      }
      
      return attrs;
    }
    
    return {
      controller: ['$element', '$q', 'save', '$scope', function ($element, $q, save, $scope) {
        function update() {
          if($scope.editDialog.$invalid) {
            return $q.reject();
          }
          
          if(angular.isFunction(save)) {
            return $q.when(save($scope.editDialog.input));
          }
          
          return $q.resolve();
        }
        
        this.dismiss = function () {
          $element.remove();
        };
        
        this.getInput = function () {
          return $scope.editDialog.input;
        };
        
        $scope.dismiss = this.dismiss;
        
        $scope.submit = function () {
          update().then(function () {
            $scope.dismiss();
          });
        };
      }],
      locals: {
        save: options.save
      },
      scope: {
        cancel: options.cancel || 'Cancel',
        messages: options.messages,
        model: options.modelValue,
        ok: options.ok || 'Save',
        placeholder: options.placeholder,
        title: options.title,
        size: size
      },
      template:
        '<md-edit-dialog>' +
          '<div layout="column" class="md-content">' +
            '<div ng-if="size === \'large\'" class="md-title">{{title || \'Edit\'}}</div>' +
            '<form name="editDialog" layout="column" ng-submit="submit(model)">' +
              '<md-input-container md-no-float>' +
                '<input name="input" ng-model="model" md-autofocus placeholder="{{placeholder}} "' + getAttrs() + '>' +
                '<div ng-messages="editDialog.input.$error">' +
                  '<div ng-repeat="(key, message) in messages" ng-message="{{key}}">{{message}}</div>' +
                '</div>' +
              '</md-input-container>' +
            '</form>' +
          '</div>' +
          '<div ng-if="size === \'large\'" layout="row" layout-align="end" class="md-actions">' +
            '<md-button class="md-primary" ng-click="dismiss()">{{cancel}}</md-button>' +
            '<md-button class="md-primary" ng-click="submit()">{{ok}}</md-button>' +
          '</div>' +
        '</md-edit-dialog>'
    };
  }
  
  this.show = function (options) {
    if(busy) {
      return $q.reject();
    }
    
    busy = true;
    options = angular.extend({}, defaultOptions, options);
    
    if(!options.targetEvent) {
      return logError('options.targetEvent is required to align the dialog with the table cell.');
    }
    
    if(!options.targetEvent.currentTarget.classList.contains('md-cell')) {
      return logError('The event target must be a table cell.');
    }
    
    if(options.bindToController && !options.controllerAs) {
      return logError('You must define options.controllerAs when options.bindToController is true.');
    }
    
    options.target = options.targetEvent.currentTarget;
    
    var promise = getTemplate(options);
    var promises = [promise];
    
    for(var prop in options.resolve) {
      promise = options.resolve[prop];
      promises.push($q.when(angular.isFunction(promise) ? promise() : promise));
    }
    
    promise = $q.all(promises);
    
    promise['catch'](logError);
    
    return promise.then(function (results) {
      var template = results.shift();
      
      for(var prop in options.resolve) {
        options.resolve[prop] = results.shift();
      }
      
      return build(template, options);
    });
  };
  
  this.small = function (options) {
    return this.show(angular.extend({}, options, preset('small', options)));
  }.bind(this);
  
  this.large = function (options) {
    return this.show(angular.extend({}, options, preset('large', options)));
  }.bind(this);
  
  return this;
}

mdEditDialog.$inject = ['$compile', '$controller', '$document', '$mdUtil', '$q', '$rootScope', '$templateCache', '$templateRequest', '$window'];


angular.module('md.data.table').directive('mdFoot', mdFoot);

function mdFoot() {

  function compile(tElement) {
    tElement.addClass('md-foot');
  }

  return {
    compile: compile,
    restrict: 'A'
  };
}

angular.module('md.data.table').directive('mdHead', mdHead);

function mdHead($compile) {

  function compile(tElement) {
    tElement.addClass('md-head');
    return postLink;
  }
  
  // empty controller to be bind scope properties to
  function Controller() {
    
  }
  
  function postLink(scope, element, attrs, tableCtrl) {
    
    function attachCheckbox() {
      var children = element.children();
      
      // append an empty cell to preceding rows
      for(var i = 0; i < children.length - 1; i++) {
        children.eq(i).prepend('<th class="md-column">');
      }
      
      children.eq(children.length - 1).prepend(createCheckBox());
    }
    
    function createCheckBox() {
      var checkbox = angular.element('<md-checkbox>');
      
      checkbox.attr('aria-label', 'Select All');
      checkbox.attr('ng-click', 'toggleAll()');
      checkbox.attr('ng-checked', 'allSelected()');
      checkbox.attr('ng-disabled', '!getSelectableRows().length');
      
      return angular.element('<th class="md-column md-checkbox-column">').append($compile(checkbox)(scope));
    }
    
    function enableRowSelection() {
      return tableCtrl.$$rowSelect;
    }
    
    function mdSelectCtrl(row) {
      return angular.element(row).controller('mdSelect');
    }
    
    function removeCheckbox() {
      var children = element.children();
      var child = children.eq(children.length - 1);
      
      Array.prototype.some.call(child.prop('cells'), function (cell) {
        return cell.classList.contains('md-checkbox-column') && child[0].removeChild(cell);
      });
    }
    
    scope.allSelected = function () {
      var rows = scope.getSelectableRows();
      
      return rows.length && rows.every(function (row) {
        return row.isSelected();
      });
    };
    
    scope.getSelectableRows = function () {
      return tableCtrl.getBodyRows().map(mdSelectCtrl).filter(function (ctrl) {
        return ctrl && !ctrl.disabled;
      });
    };
    
    scope.selectAll = function () {
      tableCtrl.getBodyRows().map(mdSelectCtrl).forEach(function (ctrl) {
        if(ctrl && !ctrl.isSelected()) {
          ctrl.select();
        }
      });
    };
    
    scope.toggleAll = function () {
      return scope.allSelected() ? scope.unSelectAll() : scope.selectAll();
    };
    
    scope.unSelectAll = function () {
      tableCtrl.getBodyRows().map(mdSelectCtrl).forEach(function (ctrl) {
        if(ctrl && ctrl.isSelected()) {
          ctrl.deselect();
        }
      });
    };
    
    scope.$watch(enableRowSelection, function (enable) {
      if(enable) {
        attachCheckbox();
      } else {
        removeCheckbox();
      }
    });
  }
  
  return {
    bindToController: true,
    compile: compile,
    controller: Controller,
    controllerAs: '$mdHead',
    require: '^^mdTable',
    restrict: 'A',
    scope: {
      order: '=?mdOrder',
      onReorder: '=?mdOnReorder'
    }
  };
}

mdHead.$inject = ['$compile'];

angular.module('md.data.table').directive('mdRow', mdRow);

function mdRow() {

  function compile(tElement) {
    tElement.addClass('md-row');
    return postLink;
  }
  
  function postLink(scope, element, attrs, tableCtrl) {
    function enableRowSelection() {
      return tableCtrl.$$rowSelect;
    }
    
    function isBodyRow() {
      return tableCtrl.getBodyRows().indexOf(element[0]) !== -1;
    }
    
    function isChild(node) {
      return node.parent()[0] === element[0];
    }
    
    if(isBodyRow()) {
      var cell = angular.element('<td class="md-cell">');
      
      scope.$watch(enableRowSelection, function (enable) {
        if(enable && !attrs.mdSelect) {
          if(!isChild(cell)) {
            element.prepend(cell);
          }
          return;
        }
        
        if(isChild(cell)) {
          cell.remove();
        }
      });
    }
  }

  return {
    compile: compile,
    require: '^^mdTable',
    restrict: 'A'
  };
}

angular.module('md.data.table').directive('mdSelect', mdSelect);

function mdSelect($compile) {
  
  // empty controller to bind scope properties to
  function Controller() {
    
  }
  
  function postLink(scope, element, attrs, ctrls) {
    var self = ctrls.shift();
    var tableCtrl = ctrls.shift();
    
    if(tableCtrl.$$rowSelect && self.id && tableCtrl.$$hash.has(self.id)) {
      var index = tableCtrl.selected.indexOf(tableCtrl.$$hash.get(self.id));
      
      // if the item is no longer selected remove it
      if(index === -1) {
        tableCtrl.$$hash.purge(self.id);
      }
      
      // if the item is not a reference to the current model update the reference
      else if(!tableCtrl.$$hash.equals(self.id, self.model)) {
        tableCtrl.$$hash.update(self.id, self.model);
        tableCtrl.selected.splice(index, 1, self.model);
      }
    }
    
    self.isSelected = function () {
      if(!tableCtrl.$$rowSelect) {
        return false;
      }
      
      if(self.id) {
        return tableCtrl.$$hash.has(self.id);
      }
      
      return tableCtrl.selected.indexOf(self.model) !== -1;
    };
    
    self.select = function () {
      if(self.disabled) {
        return;
      }
      
      tableCtrl.selected.push(self.model);
      
      if(angular.isFunction(self.onSelect)) {
        self.onSelect(self.model);
      }
    };
    
    self.deselect = function () {
      if(self.disabled) {
        return;
      }
      
      tableCtrl.selected.splice(tableCtrl.selected.indexOf(self.model), 1);
      
      if(angular.isFunction(self.onDeselect)) {
        self.onDeselect(self.model);
      }
    };
    
    self.toggle = function (event) {
      if(event && event.stopPropagation) {
        event.stopPropagation();
      }
      
      return self.isSelected() ? self.deselect() : self.select();
    };
    
    function autoSelect() {
      if(attrs.hasOwnProperty('mdAutoSelect') && attrs.mdAutoSelect === '') {
        return true;
      }
      
      return self.autoSelect;
    }
    
    function createCheckbox() {
      var checkbox = angular.element('<md-checkbox>');
      
      checkbox.attr('aria-label', 'Select Row');
      checkbox.attr('ng-click', '$mdSelect.toggle($event)');
      checkbox.attr('ng-checked', '$mdSelect.isSelected()');
      checkbox.attr('ng-disabled', '$mdSelect.disabled');
      
      return angular.element('<td class="md-cell md-checkbox-cell">').append($compile(checkbox)(scope));
    }
    
    function disableSelection() {
      Array.prototype.some.call(element.children(), function (child) {
        return child.classList.contains('md-checkbox-cell') && element[0].removeChild(child);
      });
      
      if(autoSelect()) {
        element.off('click', toggle);
      }
    }
    
    function enableSelection() {
      element.prepend(createCheckbox());
      
      if(autoSelect()) {
        element.on('click', toggle);
      }
    }
    
    function enableRowSelection() {
      return tableCtrl.$$rowSelect;
    }
    
    function onSelectChange(selected) {
      if(!self.id) {
        return;
      }
      
      if(tableCtrl.$$hash.has(self.id)) {
        // check if the item has been deselected
        if(selected.indexOf(tableCtrl.$$hash.get(self.id)) === -1) {
          tableCtrl.$$hash.purge(self.id);
        }
        
        return;
      }
      
      // check if the item has been selected
      if(selected.indexOf(self.model) !== -1) {
        tableCtrl.$$hash.update(self.id, self.model);
      }
    }
    
    function toggle(event) {
      scope.$applyAsync(function () {
        self.toggle(event);
      });
    }
    
    scope.$watch(enableRowSelection, function (enable) {
      if(enable) {
        enableSelection();
      } else {
        disableSelection();
      }
    });
    
    scope.$watch(autoSelect, function (newValue, oldValue) {
      if(newValue === oldValue) {
        return;
      }
      
      if(tableCtrl.$$rowSelect && newValue) {
        element.on('click', toggle);
      } else {
        element.off('click', toggle);
      }
    });
    
    scope.$watch(self.isSelected, function (isSelected) {
      return isSelected ? element.addClass('md-selected') : element.removeClass('md-selected');
    });
    
    tableCtrl.registerModelChangeListener(onSelectChange);
    
    element.on('$destroy', function () {
      tableCtrl.removeModelChangeListener(onSelectChange);
    });
  }
  
  return {
    bindToController: true,
    controller: Controller,
    controllerAs: '$mdSelect',
    link: postLink,
    require: ['mdSelect', '^^mdTable'],
    restrict: 'A',
    scope: {
      id: '@mdSelectId',
      model: '=mdSelect',
      disabled: '=ngDisabled',
      onSelect: '=?mdOnSelect',
      onDeselect: '=?mdOnDeselect',
      autoSelect: '=mdAutoSelect'
    }
  };
}

mdSelect.$inject = ['$compile'];

angular.module('md.data.table').directive('mdTable', mdTable);

function Hash() {
  var keys = {};
    
  this.equals = function (key, item) {
    return keys[key] === item;
  };

  this.get = function (key) {
    return keys[key];
  };
  
  this.has = function (key) {
    return keys.hasOwnProperty(key);
  };

  this.purge = function (key) {
    delete keys[key];
  };
  
  this.update = function (key, item) {
    keys[key] = item;
  };
}

function mdTable() {
  
  function compile(tElement, tAttrs) {
    tElement.addClass('md-table');
    
    if(tAttrs.hasOwnProperty('mdProgress')) {
      var body = tElement.find('tbody')[0];
      var progress = angular.element('<thead class="md-table-progress">');
      
      if(body) {
        tElement[0].insertBefore(progress[0], body);
      }
    }
  }
  
  function Controller($attrs, $element, $q, $scope) {
    var self = this;
    var queue = [];
    var watchListener;
    var modelChangeListeners = [];
    
    self.$$hash = new Hash();
    self.$$columns = {};
    
    function enableRowSelection() {
      self.$$rowSelect = true;
      
      watchListener = $scope.$watchCollection('$mdTable.selected', function (selected) {
        modelChangeListeners.forEach(function (listener) {
          listener(selected);
        });
      });
      
      $element.addClass('md-row-select');
    }
    
    function disableRowSelection() {
      self.$$rowSelect = false;
      
      if(angular.isFunction(watchListener)) {
        watchListener();
      }
      
      $element.removeClass('md-row-select');
    }
    
    function resolvePromises() {
      if(!queue.length) {
        return $scope.$applyAsync();
      }
      
      queue[0]['finally'](function () {
        queue.shift();
        resolvePromises();
      });
    }
    
    function rowSelect() {
      if($attrs.hasOwnProperty('mdRowSelect') && $attrs.mdRowSelect === '') {
        return true;
      }
      
      return self.rowSelect;
    }
    
    function validateModel() {
      if(!self.selected) {
        return console.error('Row selection: ngModel is not defined.');
      }
      
      if(!angular.isArray(self.selected)) {
        return console.error('Row selection: Expected an array. Recived ' + typeof self.selected + '.');
      }
      
      return true;
    }
    
    self.columnCount = function () {
      return self.getRows($element[0]).reduce(function (count, row) {
        return row.cells.length > count ? row.cells.length : count;
      }, 0);
    };
    
    self.getRows = function (element) {
      return Array.prototype.filter.call(element.rows, function (row) {
        return !row.classList.contains('ng-leave');
      });
    };
    
    self.getBodyRows = function () {
      return Array.prototype.reduce.call($element.prop('tBodies'), function (result, tbody) {
        return result.concat(self.getRows(tbody));
      }, []);
    };
    
    self.getElement = function () {
      return $element;
    };
    
    self.getHeaderRows = function () {
      return self.getRows($element.prop('tHead'));
    };
    
    self.waitingOnPromise = function () {
      return !!queue.length;
    };
    
    self.queuePromise = function (promise) {
      if(!promise) {
        return;
      }
      
      if(queue.push(angular.isArray(promise) ? $q.all(promise) : $q.when(promise)) === 1) {
        resolvePromises();
      }
    };
    
    self.registerModelChangeListener = function (listener) {
      modelChangeListeners.push(listener);
    };
    
    self.removeModelChangeListener = function (listener) {
      var index = modelChangeListeners.indexOf(listener);
      
      if(index !== -1) {
        modelChangeListeners.splice(index, 1);
      }
    };
    
    if($attrs.hasOwnProperty('mdProgress')) {
      $scope.$watch('$mdTable.progress', self.queuePromise);
    }
    
    $scope.$watch(rowSelect, function (enable) {
      if(enable && !!validateModel()) {
        enableRowSelection();
      } else {
        disableRowSelection();
      }
    });
  }
  
  Controller.$inject = ['$attrs', '$element', '$q', '$scope'];
  
  return {
    bindToController: true,
    compile: compile,
    controller: Controller,
    controllerAs: '$mdTable',
    restrict: 'A',
    scope: {
      progress: '=?mdProgress',
      selected: '=ngModel',
      rowSelect: '=mdRowSelect'
    }
  };
}

angular.module('md.data.table').directive('mdTablePagination', mdTablePagination);

function mdTablePagination() {
  
  function compile(tElement) {
    tElement.addClass('md-table-pagination');
  }
  
  function Controller($attrs, $scope) {
    var self = this;
    
    self.$label = angular.extend({
      page: 'Page:',
      rowsPerPage: 'Rows per page:',
      of: 'of'
    }, $scope.$eval(self.label) || {});
    
    function isPositive(number) {
      return number > 0;
    }
    
    function isZero(number) {
      return number === 0 || number === '0';
    }
    
    self.disableNext = function () {
      return isZero(self.limit) || !self.hasNext();
    };
    
    self.first = function () {
      self.page = 1;
      self.onPaginationChange();
    };
    
    self.hasNext = function () {
      return self.page * self.limit < self.total;
    };
    
    self.hasPrevious = function () {
      return self.page > 1;
    };
    
    self.last = function () {
      self.page = self.pages();
      self.onPaginationChange();
    };
    
    self.max = function () {
      return self.hasNext() ? self.page * self.limit : self.total;
    };
    
    self.min = function () {
      return self.page * self.limit - self.limit;
    };
    
    self.next = function () {
      self.page++;
      self.onPaginationChange();
    };
    
    self.onPaginationChange = function () {
      if(angular.isFunction(self.onPaginate)) {
        self.onPaginate(self.page, self.limit);
      }
    };
    
    self.pages = function () {
      return Math.ceil(self.total / (isZero(self.limit) ? 1 : self.limit));
    };
    
    self.previous = function () {
      self.page--;
      self.onPaginationChange();
    };
    
    self.range = function (total) {
      return new Array(isFinite(total) && isPositive(total) ? total : 1);
    };
    
    self.showBoundaryLinks = function () {
      if($attrs.hasOwnProperty('mdBoundaryLinks') && $attrs.mdBoundaryLinks === '') {
        return true;
      }
      
      return self.boundaryLinks;
    };
    
    self.showPageSelect = function () {
      if($attrs.hasOwnProperty('mdPageSelect') && $attrs.mdPageSelect === '') {
        return true;
      }
      
      return self.pageSelect;
    };
    
    $scope.$watch('$pagination.limit', function (newValue, oldValue) {
      if(newValue === oldValue) {
        return;
      }
      
      // find closest page from previous min
      self.page = Math.floor(((self.page * oldValue - oldValue) + newValue) / (isZero(newValue) ? 1 : newValue));
      self.onPaginationChange();
    });
  }
  
  Controller.$inject = ['$attrs', '$scope'];
  
  return {
    bindToController: {
      boundaryLinks: '=?mdBoundaryLinks',
      label: '@?mdLabel',
      limit: '=mdLimit',
      page: '=mdPage',
      pageSelect: '=?mdPageSelect',
      onPaginate: '=?mdOnPaginate',
      options: '=mdOptions',
      total: '@mdTotal'
    },
    compile: compile,
    controller: Controller,
    controllerAs: '$pagination',
    restrict: 'E',
    scope: {},
    templateUrl: 'md-table-pagination.html'
  };
}

angular.module('md.data.table').directive('mdTableProgress', mdTableProgress);

function mdTableProgress() {

  function postLink(scope, element, attrs, tableCtrl) {
    scope.columnCount = tableCtrl.columnCount;
    scope.deferred = tableCtrl.waitingOnPromise;
  }

  return {
    link: postLink,
    require: '^^mdTable',
    restrict: 'C',
    scope: {},
    templateUrl: 'md-table-progress.html'
  };
}

})(window, angular);