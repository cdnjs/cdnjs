/**
 * ngHandsontable 0.7.0-beta2
 * 
 * Copyright 2012-2015 Marcin Warpechowski
 * Copyright 2015 Handsoncode sp. z o.o. <hello@handsontable.com>
 * Licensed under the MIT license.
 * https://github.com/handsontable/ngHandsontable
 * Date: Fri Sep 11 2015 09:12:32 GMT+0200 (CEST)
*/

if (document.all && !document.addEventListener) { // IE 8 and lower
  document.createElement('hot-table');
  document.createElement('hot-column');
  document.createElement('hot-autocomplete');
}
angular.module('ngHandsontable.services', []);
angular.module('ngHandsontable.directives', []);
angular.module('ngHandsontable', [
    'ngHandsontable.services',
    'ngHandsontable.directives'
  ]);


Handsontable.hooks.add('afterContextMenuShow', function() {
  Handsontable.eventManager.isHotTableEnv = false;
});

(function() {
  function autoCompleteFactory($parse) {
    return {
      parseAutoComplete: function(column, dataSet, propertyOnly) {
        column.source = function(query, process) {
          var row = this.instance.getSelected()[0];
          var source = [];
          var data = dataSet[row];

          if (!data) {
            return;
          }
          var options = column.optionList;

          if (!options.object) {
            return;
          }
          if (angular.isArray(options.object)) {
            source = options.object;
          } else {
            // Using $parse to evaluate the expression against the row object
            // allows us to support filters like the ngRepeat directive does.
            var paramObject = $parse(options.object)(data);

            if (angular.isArray(paramObject)) {
              if (propertyOnly) {
                for (var i = 0, length = paramObject.length; i < length; i++) {
                  var item = paramObject[i][options.property];

                  if (item !== null && item !== undefined) {
                    source.push(item);
                  }
                }
              } else {
                source = paramObject;
              }
            } else {
              source = paramObject;
            }
          }
          process(source);
        };
      }
    };
  }
  autoCompleteFactory.$inject = ['$parse'];

  angular.module('ngHandsontable.services').factory('autoCompleteFactory', autoCompleteFactory);
}());

(function() {

  function hotRegisterer() {
    var instances = {};

    return {
      getInstance: function(id) {
        return instances[id];
      },

      registerInstance: function(id, instance) {
        instances[id] = instance;
      },

      removeInstance: function(id) {
        instances[id] = void 0;
      }
    };
  }
  hotRegisterer.$inject = [];

  angular.module('ngHandsontable.services').factory('hotRegisterer', hotRegisterer);
}());

(function() {

  function hyphenate(string) {
    return string.replace(/[A-Z]/g, function(match) {
      return ('-' + match.charAt(0).toLowerCase());
    });
  }

  function camelCase(string) {
    return string.replace(/-\D/g, function(match){
      return match.charAt(1).toUpperCase();
    });
  }

  function ucFirst(string) {
    return string.substr(0, 1).toUpperCase() + string.substr(1, string.length - 1);
  }

  function settingFactory(hotRegisterer) {
    return {
      containerClassName: 'handsontable-container',

      /**
       * Append handsontable container div and initialize handsontable instance inside element.
       *
       * @param {qLite} element
       * @param {Object} htSettings
       */
      initializeHandsontable: function(element, htSettings) {
        var container = document.createElement('div'),
          hot;

        container.className = this.containerClassName;
        element[0].appendChild(container);
        hot = new Handsontable(container, htSettings);

        if (htSettings.hotId) {
          hotRegisterer.registerInstance(htSettings.hotId, hot);
        }

        return hot;
      },

      /**
       * Set new settings to handsontable instance.
       *
       * @param {Handsontable} instance
       * @param {Object} settings
       */
      updateHandsontableSettings: function(instance, settings) {
        if (instance) {
          instance.updateSettings(settings);
        }
      },

      /**
       * Render handsontable instance inside element.
       *
       * @param {Handsontable} instance
       */
      renderHandsontable: function(instance) {
        if (instance) {
          instance.render();
        }
      },

      /**
       * Merge original handsontable settings with setting defined in scope.
       *
       * @param {Object} settings
       * @param {Object} scope
       * @returns {Object}
       */
      mergeSettingsFromScope: function(settings, scope) {
        var
          scopeOptions = angular.extend({}, scope),
          htOptions, i, length;

        settings = settings || {};
        angular.extend(scopeOptions, scope.settings || {});
        htOptions = this.getAvailableSettings();

        for (i = 0, length = htOptions.length; i < length; i++) {
          if (typeof scopeOptions[htOptions[i]] !== 'undefined') {
            settings[htOptions[i]] = scopeOptions[htOptions[i]];
          }
        }

        return settings;
      },

      /**
       * Merge original handsontable hooks with hooks defined in scope.
       *
       * @param {Object} settings
       * @param {Object} scope
       * @returns {Object}
       */
      mergeHooksFromScope: function(settings, scope) {
        var
          scopeOptions = angular.extend({}, scope),
          htHooks, i, length, attribute;

        settings = settings || {};
        angular.extend(scopeOptions, scope.settings || {});
        htHooks = this.getAvailableHooks();

        for (i = 0, length = htHooks.length; i < length; i++) {
          attribute = 'on' + ucFirst(htHooks[i]);

          if (typeof scopeOptions[htHooks[i]] === 'function' || typeof scopeOptions[attribute] === 'function') {
            settings[htHooks[i]] = scopeOptions[htHooks[i]] || scopeOptions[attribute];
          }
        }

        return settings;
      },

      /**
       * Trim scope definition according to attrs object from directive.
       *
       * @param {Object} scopeDefinition
       * @param {Object} attrs
       * @returns {Object}
       */
      trimScopeDefinitionAccordingToAttrs: function(scopeDefinition, attrs) {
        for (var i in scopeDefinition) {
          if (scopeDefinition.hasOwnProperty(i) && attrs[i] === void 0 &&
              attrs[scopeDefinition[i].substr(1, scopeDefinition[i].length)] === void 0) {
            delete scopeDefinition[i];
          }
        }

        return scopeDefinition;
      },

      /**
       * Get isolate scope definition for main handsontable directive.
       *
       * @return {Object}
       */
      getTableScopeDefinition: function() {
        var scopeDefinition = {};

        this.applyAvailableSettingsScopeDef(scopeDefinition);
        this.applyAvailableHooksScopeDef(scopeDefinition);

        scopeDefinition.datarows = '=';
        scopeDefinition.dataschema = '=';
        scopeDefinition.observeDomVisibility = '=';
        scopeDefinition.settings = '=';

        return scopeDefinition;
      },

      /**
       * Get isolate scope definition for column directive.
       *
       * @return {Object}
       */
      getColumnScopeDefinition: function() {
        var scopeDefinition = {};

        this.applyAvailableSettingsScopeDef(scopeDefinition);
        scopeDefinition.data = '@';

        return scopeDefinition;
      },

      /**
       * Apply all available handsontable settings into object which represents scope definition.
       *
       * @param {Object} [scopeDefinition]
       * @returns {Object}
       */
      applyAvailableSettingsScopeDef: function(scopeDefinition) {
        var options, i, length;

        options = this.getAvailableSettings();

        for (i = 0, length = options.length; i < length; i++) {
          scopeDefinition[options[i]] = '=';
        }

        return scopeDefinition;
      },

      /**
       * Apply all available handsontable hooks into object which represents scope definition.
       *
       * @param {Object} [scopeDefinition]
       * @returns {Object}
       */
      applyAvailableHooksScopeDef: function(scopeDefinition) {
        var options, i, length;

        options = this.getAvailableHooks();

        for (i = 0, length = options.length; i < length; i++) {
          scopeDefinition[options[i]] = '=on' + ucFirst(options[i]);
        }

        return scopeDefinition;
      },

      /**
       * Get all available settings from handsontable, returns settings by default in camelCase mode.
       *
       * @param {Boolean} [hyphenateStyle=undefined] If `true` then returns options in hyphenate mode (eq. row-header)
       * @returns {Array}
       */
      getAvailableSettings: function(hyphenateStyle) {
        var settings = Object.keys(Handsontable.DefaultSettings.prototype);

        if (settings.indexOf('contextMenuCopyPaste') === -1) {
          settings.push('contextMenuCopyPaste');
        }
        if (hyphenateStyle) {
          settings = settings.map(hyphenate);
        }

        return settings;
      },

      /**
       * Get all available hooks from handsontable, returns hooks by default in camelCase mode.
       *
       * @param {Boolean} [hyphenateStyle=undefined] If `true` then returns hooks in hyphenate mode (eq. on-after-init)
       * @returns {Array}
       */
      getAvailableHooks: function(hyphenateStyle) {
        var settings = Handsontable.hooks.getRegistered();

        if (hyphenateStyle) {
          settings = settings.map(function(hook) {
            return 'on-' + hyphenate(hook);
          });
        }

        return settings;
      }
    };
  }
  settingFactory.$inject = ['hotRegisterer'];

  angular.module('ngHandsontable.services').factory('settingFactory', settingFactory);
}());

(function() {
  /**
   * Angular Handsontable directive for autocomplete settings
   */
  function hotAutocomplete() {
    return {
      restrict: 'EA',
      scope: true,
      require: '^hotColumn',
      link: function (scope, element, attrs, controllerInstance) {
        var options = attrs.datarows;

        controllerInstance.setColumnOptionList(options);
      }
    };
  }
  hotAutocomplete.$inject = [];

  angular.module('ngHandsontable.directives').directive('hotAutocomplete', hotAutocomplete);
}());

(function() {
  /**
   * Angular Handsontable directive for single column settings
   */
  function hotColumn(settingFactory) {
    return {
      restrict: 'EA',
      require: '^hotTable',
      scope: {},
      controller: ['$scope', function ($scope) {
        this.setColumnOptionList = function(options) {
          if (!$scope.column) {
            $scope.column = {};
          }
          var optionList = {};
          var match = options.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)\s*$/);

          if (match) {
            optionList.property = match[1];
            optionList.object = match[2];
          } else {
            optionList.object = options.split(',');
          }
          $scope.column['optionList'] = optionList;
        };
      }],
      compile: function(tElement, tAttrs) {
        var _this = this;

        this.scope = settingFactory.trimScopeDefinitionAccordingToAttrs(settingFactory.getColumnScopeDefinition(), tAttrs);
        //this.$$isolateBindings = {};

        angular.forEach(Object.keys(this.scope), function(key) {
          _this.$$isolateBindings[key] = {
            attrName: key,
            collection: false,
            mode: key === 'data' ? '@' : '=',
            optional: false
          };
        });

        return function (scope, element, attrs, controllerInstance) {
          var column = {};

          // Turn all attributes without value as `true` by default
          angular.forEach(Object.keys(attrs), function(key) {
            if (key.charAt(0) !== '$' && attrs[key] === '') {
              column[key] = true;
            }
          });
          settingFactory.mergeSettingsFromScope(column, scope);

          if (!scope.column) {
            scope.column = {};
          }
          angular.extend(scope.column, column);
          controllerInstance.setColumnSetting(scope.column);

          scope.$on('$destroy', function() {
            controllerInstance.removeColumnSetting(scope.column);
          });
        };
      }
    };
  }
  hotColumn.$inject = ['settingFactory'];

  angular.module('ngHandsontable.directives').directive('hotColumn', hotColumn);
}());

(function() {
  /**
   * Main Angular Handsontable directive
   */
  function hotTable(settingFactory, autoCompleteFactory, $rootScope) {
    return {
      restrict: 'EA',
      scope: {},
      // for ng-repeat
      priority: -400,
      controller: ['$scope', function($scope) {
        this.setColumnSetting = function(column) {
          if (!$scope.htSettings) {
            $scope.htSettings = {};
          }
          if (!$scope.htSettings.columns) {
            $scope.htSettings.columns = [];
          }
          $scope.htSettings.columns.push(column);
          settingFactory.updateHandsontableSettings($scope.hotInstance, $scope.htSettings);
        };
        this.removeColumnSetting = function(column) {
          if ($scope.htSettings.columns.indexOf(column) > -1) {
            $scope.htSettings.columns.splice($scope.htSettings.columns.indexOf(column), 1);
            settingFactory.updateHandsontableSettings($scope.hotInstance, $scope.htSettings);
          }
        };
      }],
      compile: function(tElement, tAttrs) {
        var _this = this,
          bindingsKeys;

        this.scope = settingFactory.trimScopeDefinitionAccordingToAttrs(settingFactory.getTableScopeDefinition(), tAttrs);
        bindingsKeys = Object.keys(this.scope);

        angular.forEach(bindingsKeys, function(key) {
          var mode = _this.scope[key].charAt(0);
          _this.$$isolateBindings[key] = {
            attrName: _this.scope[key].length > 1 ? _this.scope[key].substr(1, _this.scope[key].length) : key,
            collection: false,
            mode: mode,
            optional: false
          };
        });

        return function(scope, element, attrs) {
          if (!scope.htSettings) {
            scope.htSettings = {};
          }
          // Turn all attributes without value as `true` by default
          angular.forEach(Object.keys(attrs), function(key) {
            if (key.charAt(0) !== '$' && attrs[key] === '') {
              scope.htSettings[key] = true;
            }
          });

          settingFactory.mergeSettingsFromScope(scope.htSettings, scope);
          settingFactory.mergeHooksFromScope(scope.htSettings, scope);
          scope.htSettings.data = scope.datarows;
          scope.htSettings.dataSchema = scope.dataschema;
          scope.htSettings.hotId = attrs.hotId;
          scope.htSettings.observeDOMVisibility = scope.observeDomVisibility;

          if (scope.htSettings.columns) {
            for (var i = 0, length = scope.htSettings.columns.length; i < length; i++) {
              if (scope.htSettings.columns[i].type !== 'autocomplete') {
                continue;
              }
              if (typeof scope.htSettings.columns[i].optionList === 'string') {
                var optionList = {};
                var match = scope.htSettings.columns[i].optionList.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)\s*$/);

                if (match) {
                  optionList.property = match[1];
                  optionList.object = match[2];
                } else {
                  optionList.object = optionList;
                }
                scope.htSettings.columns[i].optionList = optionList;
              }
              autoCompleteFactory.parseAutoComplete(scope.htSettings.columns[i], scope.datarows, true);
            }
          }
          var origAfterChange = scope.htSettings.afterChange;

          scope.htSettings.afterChange = function() {
            if (origAfterChange) {
              origAfterChange.apply(this, arguments);
            }
            if (!$rootScope.$$phase) {
              scope.$apply();
            }
          };
          scope.hotInstance = settingFactory.initializeHandsontable(element, scope.htSettings);

          // TODO: Add watch properties descriptor + needs perf test. Watch full equality vs toJson
          angular.forEach(bindingsKeys, function(key) {
            scope.$watch(key, function(newValue, oldValue) {
              if (newValue === void 0 || newValue === oldValue) {
                return;
              }
              if (key === 'datarows') {
                // If reference to data rows is not changed then only re-render table
                if (scope.hotInstance.getSettings().data === newValue) {
                  settingFactory.renderHandsontable(scope.hotInstance);
                } else {
                  scope.hotInstance.loadData(newValue);
                }
              } else {
                scope.htSettings[key] = newValue;
                settingFactory.updateHandsontableSettings(scope.hotInstance, scope.htSettings);
              }
            }, ['datarows', 'columns', 'rowHeights', 'colWidths', 'rowHeaders', 'colHeaders'].indexOf(key) >= 0);
          });

          /**
           * Check if data length has been changed
           */
          scope.$watchCollection('datarows', function(newValue, oldValue) {
            if (oldValue && oldValue.length === scope.htSettings.minSpareRows && newValue.length !== scope.htSettings.minSpareRows) {
              scope.htSettings.data = scope.datarows;
              settingFactory.updateHandsontableSettings(scope.hotInstance, scope.htSettings);
            }
          });
        };
      }
    };
  }
  hotTable.$inject = ['settingFactory', 'autoCompleteFactory', '$rootScope'];

  angular.module('ngHandsontable.directives').directive('hotTable', hotTable);
}());
