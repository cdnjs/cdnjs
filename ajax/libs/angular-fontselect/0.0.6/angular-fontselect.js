/*!
 * angular-fontselect v0.0.6
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
  
  function _createKey(name) {
    return name.toLowerCase().replace(/[^a-z]+/g, '-');
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
      self._map = {};
      self._addDefaultFonts();
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
  
      if (!angular.isObject(self._map[provider])) {
        self._map[provider] = {};
      }
  
      var index = self._fonts[provider].push(fontObj)-1;
  
      self._map[provider][fontObj.key] = index;
    },
  
    getFontByKey: function(key, provider) {
      var self = this;
      try {
        return self._fonts[provider][self._map[provider][key]];
      } catch (e) {
        // TODO: ERROR
        return false;
      }
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
            key: _createKey(font.family),
            stack: '"' + font.family + '" sans-serif'
          }, PROVIDER_GOOGLE);
        });
      });
    },
  
    _addDefaultFonts: function() {
      var self = this;
  
      angular.forEach(DEFAULT_WEBSAFE_FONTS, function(font) {
        self.add(font);
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
  fontselectModule.directive('jdFontlist', ['jdFontselect.fonts', function(fontsService) {
    return {
      scope: {
        id: '=fsid',
        fonts: '=',
        current: '=',
        providerName: '@provider'
      },
      restrict: 'E',
      templateUrl: 'fontlist.html',
      replace: true,
      controller: ['$scope', '$filter', function($scope, $filter) {
        var _filteredFonts, _lastPageCount = 0;
  
        $scope.page = {
          size: 30,
          count: 0,
          current: 0
        };
  
        $scope.providerKey = _createKey($scope.providerName);
  
        /**
         * Set the current page
         *
         * @param {Number} currentPage
         * @return {void}
         */
        $scope.setCurrentPage = function(currentPage) {
          $scope.page.current = currentPage;
        };
  
        /**
         * Get an array with the length similar to the
         * amount of pages we have. (So we can use it in a repeater)
         *
         * Also update the current page and the current amount of pages.
         *
         * @return {Array}
         */
        $scope.getPages = function() {
          _updatePageCount();
          var pages = new Array($scope.page.count);
  
          _updateCurrentPage();
  
          /* Display the page buttons only if we have at least two pages. */
          if (pages.length <= 1) {
            return [];
          }
          return pages;
        };
  
        /**
         * Check if this list is active
         *
         * @return {Boolean}
         */
        $scope.isActive = function() {
          return $scope.current.provider === $scope.providerName;
        };
  
        /**
         * Activate or deactivate the this List.
         *
         * @return {void}
         */
        $scope.toggle = function() {
          if ($scope.isActive()) {
            $scope.current.provider = undefined;
          } else {
            $scope.current.provider = $scope.providerName;
          }
        };
  
        /**
         * Calculate the amount of pages we have.
         *
         * @return {void}
         */
        function _updatePageCount() {
          _lastPageCount = $scope.page.count;
  
          if (!angular.isArray($scope.fonts)) {
            return 0;
          }
  
          if (_updateFilteredFonts()) {
            $scope.page.count = Math.ceil(_filteredFonts.length / $scope.page.size);
          }
        }
  
        /**
         * Apply the current filters to our internal font object.
         *
         * @return {Boolean}
         */
        function _updateFilteredFonts() {
          if (!angular.isArray($scope.fonts)) {
            _filteredFonts = 0;
            return false;
          }
  
          _filteredFonts = $filter('filter')($scope.fonts, $scope.current.search);
          _filteredFonts = $filter('filter')(_filteredFonts, {category: $scope.current.category}, true);
  
          return true;
        }
  
        /**
         * Whenever the amount of pages is changing:
         * Make sure we're not staying on a page that does not exist.
         * And if we have a font selected, try to stay on the page of
         * that font.
         *
         * @return {void}
         */
        function _updateCurrentPage() {
          /* do nothing if the amount of pages hasn't change */
          if (_lastPageCount === $scope.page.count) {
            return;
          }
  
          /* try to get the complete current font object */
          var currentFont = fontsService.getFontByKey($scope.current.font, $scope.providerName);
          /* check if the current font is anywhere on our current pages */
          var index = _filteredFonts.indexOf(currentFont);
  
          /* If we have a font selected and it's inside the filter we use */
          if (currentFont && index >= 0) {
            /* go to this page */
            $scope.page.current = Math.ceil((index + 1) / $scope.page.size) - 1;
          } else {
            /* Just go to the last page if the current does not exist */
            if ($scope.page.current > $scope.page.count) {
              $scope.page.current = $scope.page.count-1;
            }
          }
        }
      }]
    };
  }]);

  // src/partials/all.js
  angular.module('jdFontselect').run(['$templateCache', function($templateCache) {
    'use strict';
  
    $templateCache.put('fontlist.html',
      "<div class=\"jd-fontselect-provider jd-fontselect-provider-{{providerKey}}\" ng-class=\"{active: isActive()}\"><h3 ng-click=toggle()>{{providerName}}</h3><div ng-if=isActive()><ul><li ng-repeat=\"font in fonts | filter:current.search | filter:{category: current.category}:true | startFrom: page.current * page.size | limitTo: page.size \"><input type=radio ng-model=current.font value={{font.key}} name=fs-{{id}}-font id=fs-{{id}}-font-{{font.key}}><label for=fs-{{id}}-font-{{font.key}} style=\"font-family: {{font.stack}}\">{{font.name}}</label></li></ul><button ng-repeat=\"i in getPages() track by $index\" ng-class=\"{active: page.current == $index}\" ng-click=setCurrentPage($index)>{{$index + 1}}</button></div></div>"
    );
  
  
    $templateCache.put('fontselect.html',
      "<div class=fs-main id=fontselect-{{id}}><button ng-click=toggle() class=jd-fontselect-toggle>Select Font</button><input type=hidden value={{current.font}}><div class=fs-window ng-show=active><input name=fs-{{id}}-search ng-model=current.search><div><button ng-repeat=\"category in categories\" ng-class=\"{active: category.key == current.category}\" ng-click=setCategoryFilter(category.key) ng-model=current.category>{{category.name}}</button></div><jd-fontlist fsid=id current=current fonts=fonts[provider] provider={{provider}} ng-repeat=\"provider in providers\"></div></div>"
    );
  
  }]);
})(angular);
