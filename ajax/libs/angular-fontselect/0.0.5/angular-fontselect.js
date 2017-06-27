/*!
 * angular-fontselect v0.0.5
 * https://github.com/Jimdo/angular-fontselect
 *
 * A fontselect directive for AngularJS
 *
 * Copyright 2014, Jimdo, Hannes Diercks <hannes.diercks@jimdo.com>
 * Released under the MIT license
 */
(function(angular, undefined) {
  'use strict';

  // src/js/module.js
  var fontselectModule = angular.module('jdFontselect', []);

  // src/js/defaults.js
  /** @const */
  var PROVIDER_WEBSAFE = 'Websafe Fonts';
  
  /** @const */
  var PROVIDER_GOOGLE = 'Google Fonts';
  
  /** @const */
  var PROVIDERS = [
    PROVIDER_WEBSAFE,
    PROVIDER_GOOGLE
  ];
  
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
  
  fontselectModule.constant('jdFontselectConfig', {
    googleApiKey: false
  });

  // src/js/helpers.js
  function _bind(fn, me) {
    return function() {
      return fn.apply(me, arguments);
    };
  }

  // src/js/startFrom.filter.js
  /* From: http://tech.small-improvements.com/2013/09/10/angularjs-performance-with-large-lists/ */
  fontselectModule.filter('startFrom', function() {
    return function(input, start) {
      if (!angular.isArray(input)) {
        return input;
      }
  
      return input.slice(start);
    };
  });

  // src/js/fonts.service.js
  /** @const */
  var REQUIRED_FONT_OBJECT_KEYS = [
    'name',
    'key',
    'stack'
  ];
  
  function FontsService($http, config) {
    var self = this;
  
    self.config = config;
    self.$http = $http;
    self._init();
  
    return self;
  }
  
  FontsService.prototype = {
    _init: function() {
      var self = this;
      
      self._fonts = self._fonts || {};
      self._fonts[PROVIDER_WEBSAFE] = angular.copy(DEFAULT_WEBSAFE_FONTS);
      self._getGoogleFonts();
    },
  
    getAllFonts: function() {
      return this._fonts;
    },
  
    add: function(fontObj, provider) {
      var self = this;
  
      if (!angular.isString(provider)) {
        provider = PROVIDER_WEBSAFE;
      }
  
      if (!self.isValidFontObject(fontObj)) {
        throw 'Invalid font object.';
      }
  
      if (!angular.isArray(self._fonts[provider])) {
        self._fonts[provider] = [];
      }
  
      self._fonts[provider].push(fontObj);
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
    },
  
    getCategories: function() {
      return [
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
    },
  
    _createFontKey: function(name) {
      return name.toLowerCase().replace(/[^a-z]/g, '-');
    },
  
    _getGoogleFonts: function() {
      var self = this;
  
      if (!self.config.googleApiKey) {
        return;
      }
  
      self.$http({
        method: 'GET',
        url: 'https://www.googleapis.com/webfonts/v1/webfonts',
        params: {
          key: self.config.googleApiKey
        }
      }).success(function(response) {
        angular.forEach(response.items, function(font) {
          self.add({
            name: font.family,
            key: self._createFontKey(font.family),
            stack: '"' + font.family + '" sans-serif'
          }, PROVIDER_GOOGLE);
        });
      });
    }
  };
  
  fontselectModule.factory(
    'jdFontselect.fonts',
    ['$http', 'jdFontselectConfig', function($http, config) { return new FontsService($http, config); }]
  );

  // src/js/fontselect.controller.js
  var id = 1;
  
  var FontselectController = function($scope, fontsService) {
    var self = this;
  
    self.fontsService = fontsService;
    self.$scope = $scope;
    self.toScope();
    self.name = 'FontselectController';
    self._construct();
  };
  
  FontselectController.prototype = {
    _construct: function() {
      var self = this;
      var $scope = self.$scope;
  
      $scope.fonts = self.fontsService.getAllFonts();
      $scope.id = id++;
      $scope.providers = PROVIDERS;
      $scope.active = false;
      $scope.categories = self.fontsService.getCategories();
      $scope.current = {
        provider: PROVIDER_WEBSAFE,
        category: undefined,
        font: undefined,
        search: undefined
      };
  
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
      var current = this.$scope.current;
  
      if (current.category === category) {
        current.category = undefined;
      } else {
        current.category = category;
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

  // src/js/fontlist.directive.js
  fontselectModule.directive('jdFontlist', [function() {
    return {
      scope: {
        id: '&fsid',
        fonts: '=',
        current: '=',
        provider: '@'
      },
      restrict: 'E',
      templateUrl: 'fontlist.html',
      replace: true,
      controller: ['$scope', '$filter', function($scope, $filter) {
        $scope.page = {
          size: 30,
          current: 0
        };
        
        $scope.setCurrentPage = function(currentPage) {
          $scope.page.current = currentPage;
        };
        $scope.getPages = function() {
          var pages = new Array($scope.numberOfPages());
  
          /* Display the page buttons only if we have at least two pages. */
          if (pages.length <= 1) {
            return [];
          }
          return pages;
        };
  
        $scope.numberOfPages = function() {
          if (!angular.isArray($scope.fonts)) {
            return 0;
          }
  
          var filteredFonts = $filter('filter')($scope.fonts, $scope.current.search);
          filteredFonts = $filter('filter')($scope.fonts, {category: $scope.current.category}, true);
  
          return Math.ceil(filteredFonts.length / $scope.page.size);
        };
      }]
    };
  }]);

  // src/partials/all.js
  angular.module('jdFontselect').run(['$templateCache', function($templateCache) {
    'use strict';
  
    $templateCache.put('fontlist.html',
      "<div><h3>{{provider}}</h3><ul><li ng-repeat=\"font in fonts | filter:current.search | filter:{category: current.category}:true | startFrom: page.current * page.size | limitTo: page.size \"><input type=radio ng-model=current.font value={{font.key}} name=fs-{{id}}-font id=fs-{{id}}-font-{{font.key}}><label for=fs-{{id}}-font-{{font.key}} style=\"font-family: {{font.stack}}\">{{font.name}}</label></li></ul><button ng-repeat=\"i in getPages() track by $index\" ng-click=setCurrentPage($index)>{{$index + 1}}</button></div>"
    );
  
  
    $templateCache.put('fontselect.html',
      "<div class=fs-main id=fontselect-{{id}}><button ng-click=toggle()>Toggle</button><input type=hidden value={{current.font}}><div class=fs-window ng-show=active><input name=fs-{{id}}-search ng-model=current.search><div><button ng-repeat=\"category in categories\" ng-class=\"{active: category.key == current.category}\" ng-click=setCategoryFilter(category.key) ng-model=current.category>{{category.name}}</button></div><jd-fontlist fsid=id current=current fonts=fonts[provider] provider={{provider}} ng-repeat=\"provider in providers\"></div></div>"
    );
  
  }]);
})(angular);
