/*!
 * ui-grid - v4.8.3 - 2019-10-21
 * Copyright (c) 2019 ; License: MIT 
 */

(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @name ui.grid.validate
   * @description
   *
   * # ui.grid.validate
   *
   * <div class="alert alert-warning" role="alert"><strong>Alpha</strong> This feature is in development. There will almost certainly be breaking api changes, or there are major outstanding bugs.</div>
   *
   * This module provides the ability to validate cells upon change.
   *
   * Design information:
   * -------------------
   *
   * Validation is not based on angularjs validation, since it would work only when editing the field.
   *
   * Instead it adds custom properties to any field considered as invalid.
   *
   * <br/>
   * <br/>
   *
   * <div doc-module-components="ui.grid.expandable"></div>
   */
  var module = angular.module('ui.grid.validate', ['ui.grid']);

  /**
   *  @ngdoc service
   *  @name ui.grid.validate.service:uiGridValidateService
   *
   *  @description Services for validation features
   */
  module.service('uiGridValidateService', ['$sce', '$q', '$http', 'i18nService', 'uiGridConstants', function ($sce, $q, $http, i18nService, uiGridConstants) {

    var service = {

      /**
       *  @ngdoc object
       *  @name validatorFactories
       *  @propertyOf ui.grid.validate.service:uiGridValidateService
       *  @description object containing all the factories used to validate data.<br/>
       *  These factories will be in the form <br/>
       *  ```
       *  {
       *    validatorFactory: function(argument) {
       *                        return function(newValue, oldValue, rowEntity, colDef) {
       *                          return true || false || promise
       *                        }
       *                      },
       *    messageFunction: function(argument) {
       *                       return string
       *                     }
       *  }
       *  ```
       *
       * Promises should return true or false as result according to the result of validation.
       */
      validatorFactories: {},

      /**
       * @ngdoc service
       * @name setExternalFactoryFunction
       * @methodOf ui.grid.validate.service:uiGridValidateService
       * @description Adds a way to retrieve validators from an external service
       * <p>Validators from this external service have a higher priority than default
       * ones
       * @param {function} externalFactoryFunction a function that accepts name and argument to pass to a
       * validator factory and that returns an object with the same properties as
       * you can see in {@link ui.grid.validate.service:uiGridValidateService#properties_validatorFactories validatorFactories}
       */
      setExternalFactoryFunction: function(externalFactoryFunction) {
        service.externalFactoryFunction = externalFactoryFunction;
      },

      /**
       * @ngdoc service
       * @name clearExternalFactory
       * @methodOf ui.grid.validate.service:uiGridValidateService
       * @description Removes any link to external factory from this service
       */
      clearExternalFactory: function() {
        delete service.externalFactoryFunction;
      },

      /**
       * @ngdoc service
       * @name getValidatorFromExternalFactory
       * @methodOf ui.grid.validate.service:uiGridValidateService
       * @description Retrieves a validator by executing a validatorFactory
       * stored in an external service.
       * @param {string} name the name of the validator to retrieve
       * @param {object} argument an argument to pass to the validator factory
       */
      getValidatorFromExternalFactory: function(name, argument) {
        return service.externalFactoryFunction(name, argument).validatorFactory(argument);
      },

      /**
       * @ngdoc service
       * @name getMessageFromExternalFactory
       * @methodOf ui.grid.validate.service:uiGridValidateService
       * @description Retrieves a message stored in an external service.
       * @param {string} name the name of the validator
       * @param {object} argument an argument to pass to the message function
       */
      getMessageFromExternalFactory: function(name, argument) {
        return service.externalFactoryFunction(name, argument).messageFunction(argument);
      },

      /**
       * @ngdoc service
       * @name setValidator
       * @methodOf ui.grid.validate.service:uiGridValidateService
       * @description  Adds a new validator to the service
       * @param {string} name the name of the validator, must be unique
       * @param {function} validatorFactory a factory that return a validatorFunction
       * @param {function} messageFunction a function that return the error message
       */
      setValidator: function(name, validatorFactory, messageFunction) {
        service.validatorFactories[name] = {
          validatorFactory: validatorFactory,
          messageFunction: messageFunction
        };
      },

      /**
       * @ngdoc service
       * @name getValidator
       * @methodOf ui.grid.validate.service:uiGridValidateService
       * @description Returns a validator registered to the service
       * or retrieved from the external factory
       * @param {string} name the name of the validator to retrieve
       * @param {object} argument an argument to pass to the validator factory
       * @returns {object} the validator function
       */
      getValidator: function(name, argument) {
        if (service.externalFactoryFunction) {
          var validator = service.getValidatorFromExternalFactory(name, argument);
          if (validator) {
            return validator;
          }
        }
        if (!service.validatorFactories[name]) {
          throw ("Invalid validator name: " + name);
        }
        return service.validatorFactories[name].validatorFactory(argument);
      },

      /**
       * @ngdoc service
       * @name getMessage
       * @methodOf ui.grid.validate.service:uiGridValidateService
       * @description Returns the error message related to the validator
       * @param {string} name the name of the validator
       * @param {object} argument an argument to pass to the message function
       * @returns {string} the error message related to the validator
       */
      getMessage: function(name, argument) {
        if (service.externalFactoryFunction) {
          var message = service.getMessageFromExternalFactory(name, argument);
          if (message) {
            return message;
          }
        }
        return service.validatorFactories[name].messageFunction(argument);
      },

      /**
       * @ngdoc service
       * @name isInvalid
       * @methodOf ui.grid.validate.service:uiGridValidateService
       * @description Returns true if the cell (identified by rowEntity, colDef) is invalid
       * @param {object} rowEntity the row entity of the cell
       * @param {object} colDef the colDef of the cell
       * @returns {boolean} true if the cell is invalid
       */
      isInvalid: function (rowEntity, colDef) {
        return rowEntity['$$invalid'+colDef.name];
      },

      /**
       * @ngdoc service
       * @name setInvalid
       * @methodOf ui.grid.validate.service:uiGridValidateService
       * @description Makes the cell invalid by adding the proper field to the entity
       * @param {object} rowEntity the row entity of the cell
       * @param {object} colDef the colDef of the cell
       */
      setInvalid: function (rowEntity, colDef) {
        rowEntity['$$invalid'+colDef.name] = true;
      },

      /**
       * @ngdoc service
       * @name setValid
       * @methodOf ui.grid.validate.service:uiGridValidateService
       * @description Makes the cell valid by removing the proper error field from the entity
       * @param {object} rowEntity the row entity of the cell
       * @param {object} colDef the colDef of the cell
       */
      setValid: function (rowEntity, colDef) {
        delete rowEntity['$$invalid'+colDef.name];
      },

      /**
       * @ngdoc service
       * @name setError
       * @methodOf ui.grid.validate.service:uiGridValidateService
       * @description Adds the proper error to the entity errors field
       * @param {object} rowEntity the row entity of the cell
       * @param {object} colDef the colDef of the cell
       * @param {string} validatorName the name of the validator that is failing
       */
      setError: function(rowEntity, colDef, validatorName) {
        if (!rowEntity['$$errors'+colDef.name]) {
          rowEntity['$$errors'+colDef.name] = {};
        }
        rowEntity['$$errors'+colDef.name][validatorName] = true;
      },

      /**
       * @ngdoc service
       * @name clearError
       * @methodOf ui.grid.validate.service:uiGridValidateService
       * @description Removes the proper error from the entity errors field
       * @param {object} rowEntity the row entity of the cell
       * @param {object} colDef the colDef of the cell
       * @param {string} validatorName the name of the validator that is failing
       */
      clearError: function(rowEntity, colDef, validatorName) {
        if (!rowEntity['$$errors'+colDef.name]) {
          return;
        }
        if (validatorName in rowEntity['$$errors'+colDef.name]) {
            delete rowEntity['$$errors'+colDef.name][validatorName];
        }
      },

      /**
       * @ngdoc function
       * @name getErrorMessages
       * @methodOf ui.grid.validate.service:uiGridValidateService
       * @description returns an array of i18n-ed error messages.
       * @param {object} rowEntity gridOptions.data[] array instance whose errors we are looking for
       * @param {object} colDef the column whose errors we are looking for
       * @returns {array} An array of strings containing all the error messages for the cell
       */
      getErrorMessages: function(rowEntity, colDef) {
        var errors = [];

        if (!rowEntity['$$errors'+colDef.name] || Object.keys(rowEntity['$$errors'+colDef.name]).length === 0) {
          return errors;
        }

        Object.keys(rowEntity['$$errors'+colDef.name]).sort().forEach(function(validatorName) {
          errors.push(service.getMessage(validatorName, colDef.validators[validatorName]));
        });

        return errors;
      },

      /**
       * @ngdoc function
       * @name getFormattedErrors
       * @methodOf  ui.grid.validate.service:uiGridValidateService
       * @description returns the error i18n-ed and formatted in html to be shown inside the page.
       * @param {object} rowEntity gridOptions.data[] array instance whose errors we are looking for
       * @param {object} colDef the column whose errors we are looking for
       * @returns {object} An object that can be used in a template (like a cellTemplate) to display the
       * message inside the page (i.e. inside a div)
       */
      getFormattedErrors: function(rowEntity, colDef) {
        var msgString = "",
          errors = service.getErrorMessages(rowEntity, colDef);

        if (!errors.length) {
          return;
        }

        errors.forEach(function(errorMsg) {
          msgString += errorMsg + "<br/>";
        });

        return $sce.trustAsHtml('<p><b>' + i18nService.getSafeText('validate.error') + '</b></p>' + msgString );
      },

      /**
       * @ngdoc function
       * @name getTitleFormattedErrors
       * @methodOf ui.grid.validate.service:uiGridValidateService
       * @description returns the error i18n-ed and formatted in javaScript to be shown inside an html
       * title attribute.
       * @param {object} rowEntity gridOptions.data[] array instance whose errors we are looking for
       * @param {object} colDef the column whose errors we are looking for
       * @returns {object} An object that can be used in a template (like a cellTemplate) to display the
       * message inside an html title attribute
       */
      getTitleFormattedErrors: function(rowEntity, colDef) {
        var newLine = "\n",
          msgString = "",
          errors = service.getErrorMessages(rowEntity, colDef);

        if (!errors.length) {
          return;
        }

        errors.forEach(function(errorMsg) {
          msgString += errorMsg + newLine;
        });

        return $sce.trustAsHtml(i18nService.getSafeText('validate.error') + newLine + msgString);
      },

      /**
       * @ngdoc function
       * @name getTitleFormattedErrors
       * @methodOf ui.grid.validate.service:uiGridValidateService
       * @description Executes all validators on a cell (identified by row entity and column definition) and sets or clears errors
       * @param {object} rowEntity the row entity of the cell we want to run the validators on
       * @param {object} colDef the column definition of the cell we want to run the validators on
       * @param {object} newValue the value the user just entered
       * @param {object} oldValue the value the field had before
       */
      runValidators: function(rowEntity, colDef, newValue, oldValue, grid) {
        if (newValue === oldValue) {
          // If the value has not changed we perform no validation
          return;
        }

        if (typeof(colDef.name) === 'undefined' || !colDef.name) {
          throw new Error('colDef.name is required to perform validation');
        }

        service.setValid(rowEntity, colDef);

        var validateClosureFactory = function(rowEntity, colDef, validatorName) {
          return function(value) {
            if (!value) {
              service.setInvalid(rowEntity, colDef);
              service.setError(rowEntity, colDef, validatorName);
              if (grid) {
                grid.api.validate.raise.validationFailed(rowEntity, colDef, newValue, oldValue);
              }
            }
          };
        };

        var promises = [];

        for (var validatorName in colDef.validators) {
          service.clearError(rowEntity, colDef, validatorName);
          var validatorFunction = service.getValidator(validatorName, colDef.validators[validatorName]);

          // We pass the arguments as oldValue, newValue so they are in the same order
          // as ng-model validators (modelValue, viewValue)
          var promise = $q.when(validatorFunction(oldValue, newValue, rowEntity, colDef))
            .then(validateClosureFactory(rowEntity, colDef, validatorName));

          promises.push(promise);
        }

        return $q.all(promises);
      },

      /**
       * @ngdoc function
       * @name createDefaultValidators
       * @methodOf ui.grid.validate.service:uiGridValidateService
       * @description adds the basic validators to the list of service validators
       */
      createDefaultValidators: function() {
        service.setValidator('minLength', function (argument) {
          return function (oldValue, newValue) {
            if (newValue === undefined || newValue === null || newValue === '') {
              return true;
            }
            return newValue.length >= argument;
          };
        }, function(argument) {
          return i18nService.getSafeText('validate.minLength').replace('THRESHOLD', argument);
        });

        service.setValidator('maxLength', function (argument) {
          return function (oldValue, newValue) {
            if (newValue === undefined || newValue === null || newValue === '') {
              return true;
            }
            return newValue.length <= argument;
          };
        }, function(threshold) {
          return i18nService.getSafeText('validate.maxLength').replace('THRESHOLD', threshold);
        });

        service.setValidator('required', function (argument) {
          return function (oldValue, newValue) {
            if (argument) {
              return !(newValue === undefined || newValue === null || newValue === '');
            }
            return true;
          };
        }, function() {
          return i18nService.getSafeText('validate.required');
        });
      },

      initializeGrid: function (scope, grid) {
        grid.validate = {

          isInvalid: service.isInvalid,

          getErrorMessages: service.getErrorMessages,

          getFormattedErrors: service.getFormattedErrors,

          getTitleFormattedErrors: service.getTitleFormattedErrors,

          runValidators: service.runValidators
        };

        /**
         *  @ngdoc object
         *  @name ui.grid.validate.api:PublicApi
         *
         *  @description Public Api for validation feature
         */
        var publicApi = {
          events: {
            validate: {
              /**
               * @ngdoc event
               * @name validationFailed
               * @eventOf ui.grid.validate.api:PublicApi
               * @description raised when one or more failure happened during validation
               * <pre>
               *      gridApi.validate.on.validationFailed(scope, function(rowEntity, colDef, newValue, oldValue){...})
               * </pre>
               * @param {object} rowEntity the options.data element whose validation failed
               * @param {object} colDef the column whose validation failed
               * @param {object} newValue new value
               * @param {object} oldValue old value
               */
              validationFailed: function (rowEntity, colDef, newValue, oldValue) {
              }
            }
          },
          methods: {
            validate: {
              /**
               * @ngdoc function
               * @name isInvalid
               * @methodOf ui.grid.validate.api:PublicApi
               * @description checks if a cell (identified by rowEntity, colDef) is invalid
               * @param {object} rowEntity gridOptions.data[] array instance we want to check
               * @param {object} colDef the column whose errors we want to check
               * @returns {boolean} true if the cell value is not valid
               */
              isInvalid: function(rowEntity, colDef) {
                return grid.validate.isInvalid(rowEntity, colDef);
              },
              /**
               * @ngdoc function
               * @name getErrorMessages
               * @methodOf ui.grid.validate.api:PublicApi
               * @description returns an array of i18n-ed error messages.
               * @param {object} rowEntity gridOptions.data[] array instance whose errors we are looking for
               * @param {object} colDef the column whose errors we are looking for
               * @returns {array} An array of strings containing all the error messages for the cell
               */
              getErrorMessages: function (rowEntity, colDef) {
                return grid.validate.getErrorMessages(rowEntity, colDef);
              },
              /**
               * @ngdoc function
               * @name getFormattedErrors
               * @methodOf ui.grid.validate.api:PublicApi
               * @description returns the error i18n-ed and formatted in html to be shown inside the page.
               * @param {object} rowEntity gridOptions.data[] array instance whose errors we are looking for
               * @param {object} colDef the column whose errors we are looking for
               * @returns {object} An object that can be used in a template (like a cellTemplate) to display the
               * message inside the page (i.e. inside a div)
               */
              getFormattedErrors: function (rowEntity, colDef) {
                return grid.validate.getFormattedErrors(rowEntity, colDef);
              },
              /**
               * @ngdoc function
               * @name getTitleFormattedErrors
               * @methodOf ui.grid.validate.api:PublicApi
               * @description returns the error i18n-ed and formatted in javaScript to be shown inside an html
               * title attribute.
               * @param {object} rowEntity gridOptions.data[] array instance whose errors we are looking for
               * @param {object} colDef the column whose errors we are looking for
               * @returns {object} An object that can be used in a template (like a cellTemplate) to display the
               * message inside an html title attribute
               */
              getTitleFormattedErrors: function (rowEntity, colDef) {
                return grid.validate.getTitleFormattedErrors(rowEntity, colDef);
              }
            }
          }
        };

        grid.api.registerEventsFromObject(publicApi.events);
        grid.api.registerMethodsFromObject(publicApi.methods);

        if (grid.edit) {
          grid.api.edit.on.afterCellEdit(scope, function(rowEntity, colDef, newValue, oldValue) {
            grid.validate.runValidators(rowEntity, colDef, newValue, oldValue, grid);
          });
        }

        service.createDefaultValidators();
      }
    };

    return service;
  }]);

  /**
   *  @ngdoc directive
   *  @name ui.grid.validate.directive:uiGridValidate
   *  @element div
   *  @restrict A
   *  @description Adds validating features to the ui-grid directive.
   *  @example
   <example module="app">
   <file name="app.js">
   var app = angular.module('app', ['ui.grid', 'ui.grid.edit', 'ui.grid.validate']);

   app.controller('MainCtrl', ['$scope', function ($scope) {
      $scope.data = [
        { name: 'Bob', title: 'CEO' },
            { name: 'Frank', title: 'Lowly Developer' }
      ];

      $scope.columnDefs = [
        {name: 'name', enableCellEdit: true, validators: {minLength: 3, maxLength: 9}, cellTemplate: 'ui-grid/cellTitleValidator'},
        {name: 'title', enableCellEdit: true, validators: {required: true}, cellTemplate: 'ui-grid/cellTitleValidator'}
      ];
    }]);
   </file>
   <file name="index.html">
   <div ng-controller="MainCtrl">
   <div ui-grid="{ data: data, columnDefs: columnDefs }" ui-grid-edit ui-grid-validate></div>
   </div>
   </file>
   </example>
   */

  module.directive('uiGridValidate', ['gridUtil', 'uiGridValidateService', function (gridUtil, uiGridValidateService) {
    return {
      priority: 0,
      replace: true,
      require: '^uiGrid',
      scope: false,
      compile: function () {
        return {
          pre: function ($scope, $elm, $attrs, uiGridCtrl) {
            uiGridValidateService.initializeGrid($scope, uiGridCtrl.grid);
          },
          post: function ($scope, $elm, $attrs, uiGridCtrl) {
          }
        };
      }
    };
  }]);
})();

angular.module('ui.grid.validate').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('ui-grid/cellTitleValidator',
    "<div class=\"ui-grid-cell-contents\" ng-class=\"{invalid:grid.validate.isInvalid(row.entity,col.colDef)}\" title=\"{{grid.validate.getTitleFormattedErrors(row.entity,col.colDef)}}\">{{COL_FIELD CUSTOM_FILTERS}}</div>"
  );


  $templateCache.put('ui-grid/cellTooltipValidator',
    "<div class=\"ui-grid-cell-contents\" ng-class=\"{invalid:grid.validate.isInvalid(row.entity,col.colDef)}\" tooltip-html-unsafe=\"{{grid.validate.getFormattedErrors(row.entity,col.colDef)}}\" tooltip-enable=\"grid.validate.isInvalid(row.entity,col.colDef)\" tooltip-append-to-body=\"true\" tooltip-placement=\"top\" title=\"TOOLTIP\">{{COL_FIELD CUSTOM_FILTERS}}</div>"
  );

}]);
