angular.module('bsTagsInput', [])
/**
 * @ngdoc directive
 * @name bsTagsInput
 * @restrict A
 *
 * @description
 * Sets up an input field for tag inputs, using the bootstrap-tagsinput jQuery plugin.
 *
 * @element INPUT or SELECT
 * @param {Object} options passed to the bootstrap-tagsinput plugin at initialization.
 *
 * @example
    <doc:example>
      <doc:source>
        <script>
          function Ctrl($scope) {
            $scope.tags = ['Amsterdam', 'Washington'];
            $scope.tagsTypeahead = {
              local: ['Sydney', 'Beijing', 'Cairo']
            }
          }
        </script>
        <form ng-controller="Ctrl">
          <input type="text" ng-model="tags" bs-tags-input bs-tags-typeahead="tagsTypeahead">
          <pre>{{tags}}</pre>
        </form>
      </doc:source>
    </doc:example>
 */
.directive('bsTagsInput', function() {
  // reference to underscorejs/lodash difference method
  var difference;
  if (typeof(_) !== 'undefined') {
    difference = _.difference;
  } else {
    // fallback to a naive implementation
    difference = function(array, other) {
      var results = [];
      angular.forEach(array, function(value) {
        if (other.indexOf(value) === -1) {
          results.push(value);
        }
      });
      return results;
    };
  }

  return {
    require: 'ngModel',
    controller: function() {
    },
    link: function(scope, element, attrs, ngModelCtrl) {
      // initialize tagsinput
      var options = scope.$eval(attrs.bsTagsInput) || {};
      element.tagsinput(options);

      // handle changes from the underlying model
      ngModelCtrl.$render = function() {
        var oldVal = element.tagsinput('items'),
            newVal = ngModelCtrl.$viewValue;
        difference(oldVal, newVal).forEach(function(item) {
          element.tagsinput('remove', item, true);
        });
        difference(newVal, oldVal).forEach(function(item) {
          element.tagsinput('add', item, true);
        });
      };

      // handle changes from the UI
      element.on('change', function() {
        var items = element.tagsinput('items');
        ngModelCtrl.$setViewValue(items);
      });

      // handle cleanup
      scope.$on('$destroy', function() {
        element.tagsinput('destroy');
      });
    }
  };
})
/**
 * @ngdoc directive
 * @name bsTagsTypeahead
 * @restrict A
 *
 * @description
 * Using typeahead.js, adds autocompletion support to a bsTagsInput field.
 *
 * @element INPUT or SELECT
 * @param {Object} options passed to the typeahead.js plugin.
 */
.directive('bsTagsTypeahead', function() {
  return {
    require: 'bsTagsInput',
    link: function(scope, element, attrs, bsTagsInputCtrl) {
      // setup typeahead on the 'input' element
      var options = scope.$eval(attrs.bsTagsTypeahead) || {};
      element.tagsinput('input')
          .typeahead(options)
          .bind('typeahead:selected', function(obj, datum) {
        element.tagsinput('add', datum.value);
        element.tagsinput('input').typeahead('setQuery', '');
      });
    }
  }
});
