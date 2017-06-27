/**
 * Checklist-model
 * AngularJS directive for list of checkboxes
 */

angular.module('checklist-model', [])
.directive('checklistModel', ['$parse', '$compile', function($parse, $compile) {
  // contains
  function contains(arr, item) {
    if (angular.isArray(arr)) {
      for (var i = 0; i < arr.length; i++) {
        if (angular.equals(arr[i], item)) {
          return true;
        }
      }
    }
    return false;
  }

  // add
  function add(arr, item) {
    arr = angular.isArray(arr) ? arr : [];
    for (var i = 0; i < arr.length; i++) {
      if (angular.equals(arr[i], item)) {
        return;
      }
    }    
    arr.push(item);
  }  

  // remove
  function remove(arr, item) {
    if (angular.isArray(arr)) {
      for (var i = 0; i < arr.length; i++) {
        if (angular.equals(arr[i], item)) {
          arr.splice(i, 1);
          return;
        }
      }
    }
  }  

  return {
    restrict: 'A',
    scope: true,
    link: function(scope, elem, attrs) {
      if (elem[0].tagName !== 'INPUT' || !elem.attr('type', 'checkbox')) {
        throw 'checklist-model should be applied to `input[type="checkbox"]`.';
      }

      if (!attrs.checklistValue) {
        throw 'You should provide  `checklist-value`.';
      }

      // link to original model. Initially assigned in $watch
      var model;// = modelGet(scope);
      var value = $parse(attrs.checklistValue)(scope.$parent);

      // local var storing individual checkbox model
      // scope.checked - will be set in $watch

      // exclude recursion
      elem.removeAttr('checklist-model');
      elem.attr('ng-model', 'checked');
      $compile(elem)(scope);

      // watch UI checked change
      scope.$watch('checked', function(newValue, oldValue) {
        if (newValue === oldValue) { 
          return;
        } if (newValue === true) {
          add(model, value);
        } else if (newValue === false) {
          remove(model, value);
        }
      });

      // watch model change
      scope.$parent.$watch(attrs.checklistModel, function(newArr, oldArr) {
        // need this line to keep link with original model
        model = newArr;
        scope.checked = contains(newArr, value);
      }, true);
    }
  };
}]);
