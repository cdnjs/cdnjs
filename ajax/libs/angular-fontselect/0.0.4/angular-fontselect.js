/*!
 * angular-fontselect v0.0.4
 * https://github.com/Jimdo/angular-fontselect
 *
 * A fontselect directive for AngularJS
 *
 * Copyright 2014, Jimdo, Hannes Diercks <hannes.diercks@jimdo.com>
 * Released under the MIT license
 */
(function(angular, undefined) {
  'use strict';

  // src/js/defaults.js
  /** @const */
  var CATEGORY_WEBSAFE = 'websafe';
  
  /** @const */
  var DEFAULT_WEBSAFE_FONTS = [
    {
      name: 'Arial',
      key: 'arial',
      category: 'sansserif',
      stack: 'Arial, "Helvetica Neue", Helvetica, sans-serif'
    },
    {
      name: 'Courier New',
      key: 'couriernew',
      category: 'other',
      stack: '"Courier New", Courier, "Lucida Sans Typewriter", "Lucida Typewriter", monospace'
    },
    {
      name: 'Verdana',
      key: 'verdana',
      category: 'sansserif',
      stack: 'Verdana, Geneva, sans-serif'
    },
    {
      name: 'Times New Roman',
      key: 'timesnewroman',
      category: 'serif',
      stack: 'TimesNewRoman, "Times New Roman", Times, Baskerville, Georgia, serif'
    },
    {
      name: 'Brush Script',
      key: 'brushscript',
      category: 'handwriting',
      stack: '"Brush Script MT", cursive'
    }
  ];

  // src/js/helpers.js
  function _bind(fn, me) {
    return function() {
      return fn.apply(me, arguments);
    };
  }

  // src/js/module.js
  var fontselectModule = angular.module('jdFontselect', []);

  // src/js/fonts.service.js
  /** @const */
  var REQUIRED_FONT_OBJECT_KEYS = [
    'name',
    'key',
    'stack'
  ];
  
  function FontsService($scope) {
    var self = this;
  
    self.$scope = $scope;
    self._init();
  
    return self;
  }
  
  FontsService.prototype = {
    _init: function() {
      var self = this;
      
      self._fonts = self._fonts || {};
      self._fonts[CATEGORY_WEBSAFE] = angular.copy(DEFAULT_WEBSAFE_FONTS);
    },
  
    getAll: function() {
      return this._fonts;
    },
  
    add: function(fontObj, category) {
      var self = this;
  
      if (angular.isString(category)) {
        category = CATEGORY_WEBSAFE;
      }
  
      if (!self.isValidFontObject(fontObj)) {
        throw 'Invalid font object.';
      }
  
      self._fonts[CATEGORY_WEBSAFE].push(fontObj);
    },
  
    isValidFontObject: function(fontObj) {
      if (!angular.isObject(fontObj)) {
        return false;
      }
  
      var valid = true;
  
      angular.forEach(REQUIRED_FONT_OBJECT_KEYS, function(key) {
        if (angular.isUndefined(fontObj[key])) {
          valid = false;
        }
      });
  
      return valid;
    }
  };
  
  fontselectModule.factory(
    'jdFontselect.fonts',
    ['$rootScope', function($rootScope) { return new FontsService($rootScope); }]
  );

  // src/js/fontselect.controller.js
  var id = 1;
  
  var FontselectController = function($scope, fonts) {
    var self = this;
  
    self.fonts = fonts;
    $scope.fonts = fonts.getAll();
    $scope.id = id++;
    self.$scope = $scope;
    self.toScope();
    self.name = 'FontselectController';
    self._construct();
  };
  
  FontselectController.prototype = {
    _construct: function() {
      var self = this;
      var $scope = self.$scope;
  
      $scope.categories = [
        {
          name: 'Serif',
          key: 'serif'
        },
        {
          name: 'Sans-serif',
          key: 'sansserif'
        },
        {
          name: 'Handwriting',
          key: 'handwriting'
        },
        {
          name: 'Other',
          key: 'other'
        }
      ];
      $scope.data = {
        currentFont: undefined,
        category: undefined
      };
      $scope.active = false;
      $scope.setCategoryFilter = _bind(self.setCategoryFilter, self);
      $scope.toggle = _bind(self.toggle, self);
    },
    /* Workaround to be able to get the instance from $scope in tests. */
    toScope: function() {},
    
    toggle: function() {
      var $scope = this.$scope;
  
      $scope.active = !$scope.active;
    },
  
    setCategoryFilter: function(category) {
      var data = this.$scope.data;
  
      if (data.category === category) {
        data.category = undefined;
      } else {
        data.category = category;
      }
    },
  
    _resetIDs: function() {
      id = 1;
    }
  };
  
  FontselectController.$inject = ['$scope', 'jdFontselect.fonts'];

  // src/js/fontselect.directive.js
  fontselectModule.directive('jdFontselect', [function() {
    return {
      scope: {},
      restrict: 'E',
      templateUrl: 'fontselect.html',
      replace: true,
      controller: FontselectController
    };
  }]);

  // src/partials/all.js
  angular.module('jdFontselect').run(['$templateCache', function($templateCache) {
    'use strict';
  
    $templateCache.put('fontselect.html',
      "<div class=fs-main id=fontselect-{{id}}><button ng-click=toggle()>Toggle</button><input type=hidden value={{data.currentFont}}><div class=fs-window ng-show=active><input name=fs-{{id}}-search ng-model=search><div><button ng-repeat=\"category in categories\" ng-class=\"{active: category.key == data.category}\" ng-click=setCategoryFilter(category.key) ng-model=data.category>{{category.name}}</button></div><ul><li ng-repeat=\"font in fonts.websafe | filter:search | filter:{category: data.category}:true \"><input type=radio ng-model=data.currentFont value={{font.key}} id=fs-{{id}}-font-{{font.key}}><label for=fs-{{id}}-font-{{font.key}} style=\"font-family: {{font.stack}}\">{{font.name}}</label></li></ul></div></div>"
    );
  
  }]);
})(angular);
