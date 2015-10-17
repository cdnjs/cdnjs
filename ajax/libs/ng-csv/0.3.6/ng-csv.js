(function(window, document) {

// Create all modules and define dependencies to make sure they exist
// and are loaded in the correct order to satisfy dependency injection
// before all nested files are concatenated by Grunt

// Config
angular.module('ngCsv.config', []).
  value('ngCsv.config', {
      debug: true
  }).
  config(['$compileProvider', function($compileProvider){
    if (angular.isDefined($compileProvider.urlSanitizationWhitelist)) {
      $compileProvider.urlSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|data):/);
    } else {
      $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|data):/);
    }
  }]);

// Modules
angular.module('ngCsv.directives', ['ngCsv.services']);
angular.module('ngCsv.services', []);
angular.module('ngCsv',
    [
        'ngCsv.config',
        'ngCsv.services',
        'ngCsv.directives',
        'ngSanitize'
    ]);

// Common.js package manager support (e.g. ComponentJS, WebPack)
if (typeof module !== 'undefined' && typeof exports !== 'undefined' && module.exports === exports) {
  module.exports = 'ngCsv';
}
/**
 * Created by asafdav on 15/05/14.
 */
angular.module('ngCsv.services').
  service('CSV', ['$q', function ($q) {

    var EOL = '\r\n';
    var BOM = "\ufeff";

    var specialChars = {
      '\\t': '\t',
      '\\b': '\b',
      '\\v': '\v',
      '\\f': '\f',
      '\\r': '\r'
    };

    /**
     * Stringify one field
     * @param data
     * @param options
     * @returns {*}
     */
    this.stringifyField = function (data, options) {
      if (options.decimalSep === 'locale' && this.isFloat(data)) {
        return data.toLocaleString();
      }

      if (options.decimalSep !== '.' && this.isFloat(data)) {
        return data.toString().replace('.', options.decimalSep);
      }

      if (typeof data === 'string') {
        data = data.replace(/"/g, '""'); // Escape double qoutes

        if (options.quoteStrings || data.indexOf(',') > -1 || data.indexOf('\n') > -1 || data.indexOf('\r') > -1) {
            data = options.txtDelim + data + options.txtDelim;
        }

        return data;
      }

      if (typeof data === 'boolean') {
        return data ? 'TRUE' : 'FALSE';
      }

      return data;
    };

    /**
     * Helper function to check if input is float
     * @param input
     * @returns {boolean}
     */
    this.isFloat = function (input) {
      return +input === input && (!isFinite(input) || Boolean(input % 1));
    };

    /**
     * Creates a csv from a data array
     * @param data
     * @param options
     *  * header - Provide the first row (optional)
     *  * fieldSep - Field separator, default: ',',
     *  * addByteOrderMarker - Add Byte order mark, default(false)
     * @param callback
     */
    this.stringify = function (data, options) {
      var def = $q.defer();

      var that = this;
      var csv = "";
      var csvContent = "";

      var dataPromise = $q.when(data).then(function (responseData) {
        //responseData = angular.copy(responseData);//moved to row creation
        // Check if there's a provided header array
        if (angular.isDefined(options.header) && options.header) {
          var encodingArray, headerString;

          encodingArray = [];
          angular.forEach(options.header, function (title, key) {
            this.push(that.stringifyField(title, options));
          }, encodingArray);

          headerString = encodingArray.join(options.fieldSep ? options.fieldSep : ",");
          csvContent += headerString + EOL;
        }

        var arrData = [];

        if (angular.isArray(responseData)) {
          arrData = responseData;
        }
        else if (angular.isFunction(responseData)) {
          arrData = responseData();
        }

        // Check if using keys as labels
        if (angular.isDefined(options.label) && options.label && typeof options.label === 'boolean') {
            var labelArray, labelString;

            labelArray = [];
            angular.forEach(arrData[0], function(value, label) {
                this.push(that.stringifyField(label, options));
            }, labelArray);
            labelString = labelArray.join(options.fieldSep ? options.fieldSep : ",");
            csvContent += labelString + EOL;
        }

        angular.forEach(arrData, function (oldRow, index) {
          var row = angular.copy(arrData[index]);
          var dataString, infoArray;

          infoArray = [];

          var iterator = !!options.columnOrder ? options.columnOrder : row;
          angular.forEach(iterator, function (field, key) {
            var val = !!options.columnOrder ? row[field] : field;
            this.push(that.stringifyField(val, options));
          }, infoArray);

          dataString = infoArray.join(options.fieldSep ? options.fieldSep : ",");
          csvContent += index < arrData.length ? dataString + EOL : dataString;
        });

        // Add BOM if needed
        if (options.addByteOrderMarker) {
          csv += BOM;
        }

        // Append the content and resolve.
        csv += csvContent;
        def.resolve(csv);
      });

      if (typeof dataPromise['catch'] === 'function') {
        dataPromise['catch'](function (err) {
          def.reject(err);
        });
      }

      return def.promise;
    };

    /**
     * Helper function to check if input is really a special character
     * @param input
     * @returns {boolean}
     */
    this.isSpecialChar = function(input){
      return specialChars[input] !== undefined;
    };

    /**
     * Helper function to get what the special character was supposed to be
     * since Angular escapes the first backslash
     * @param input
     * @returns {special character string}
     */
    this.getSpecialChar = function (input) {
      return specialChars[input];
    };


  }]);
/**
 * ng-csv module
 * Export Javascript's arrays to csv files from the browser
 *
 * Author: asafdav - https://github.com/asafdav
 */
angular.module('ngCsv.directives').
  directive('ngCsv', ['$parse', '$q', 'CSV', '$document', '$timeout', function ($parse, $q, CSV, $document, $timeout) {
    return {
      restrict: 'AC',
      scope: {
        data: '&ngCsv',
        filename: '@filename',
        header: '&csvHeader',
        columnOrder: '&csvColumnOrder',
        txtDelim: '@textDelimiter',
        decimalSep: '@decimalSeparator',
        quoteStrings: '@quoteStrings',
        fieldSep: '@fieldSeparator',
        lazyLoad: '@lazyLoad',
        addByteOrderMarker: "@addBom",
        ngClick: '&',
        charset: '@charset',
        label: '&csvLabel'
      },
      controller: [
        '$scope',
        '$element',
        '$attrs',
        '$transclude',
        function ($scope, $element, $attrs, $transclude) {
          $scope.csv = '';

          if (!angular.isDefined($scope.lazyLoad) || $scope.lazyLoad != "true") {
            if (angular.isArray($scope.data)) {
              $scope.$watch("data", function (newValue) {
                $scope.buildCSV();
              }, true);
            }
          }

          $scope.getFilename = function () {
            return $scope.filename || 'download.csv';
          };

          function getBuildCsvOptions() {
            var options = {
              txtDelim: $scope.txtDelim ? $scope.txtDelim : '"',
              decimalSep: $scope.decimalSep ? $scope.decimalSep : '.',
              quoteStrings: $scope.quoteStrings,
              addByteOrderMarker: $scope.addByteOrderMarker
            };
            if (angular.isDefined($attrs.csvHeader)) options.header = $scope.$eval($scope.header);
            if (angular.isDefined($attrs.csvColumnOrder)) options.columnOrder = $scope.$eval($scope.columnOrder);
            if (angular.isDefined($attrs.csvLabel)) options.label = $scope.$eval($scope.label);

            options.fieldSep = $scope.fieldSep ? $scope.fieldSep : ",";

            // Replaces any badly formatted special character string with correct special character
            options.fieldSep = CSV.isSpecialChar(options.fieldSep) ? CSV.getSpecialChar(options.fieldSep) : options.fieldSep;

            return options;
          }

          /**
           * Creates the CSV and updates the scope
           * @returns {*}
           */
          $scope.buildCSV = function () {
            var deferred = $q.defer();

            $element.addClass($attrs.ngCsvLoadingClass || 'ng-csv-loading');

            CSV.stringify($scope.data(), getBuildCsvOptions()).then(function (csv) {
              $scope.csv = csv;
              $element.removeClass($attrs.ngCsvLoadingClass || 'ng-csv-loading');
              deferred.resolve(csv);
            });
            $scope.$apply(); // Old angular support

            return deferred.promise;
          };
        }
      ],
      link: function (scope, element, attrs) {
        function doClick() {
          var charset = scope.charset || "utf-8";
          var blob = new Blob([scope.csv], {
            type: "text/csv;charset="+ charset + ";"
          });

          if (window.navigator.msSaveOrOpenBlob) {
            navigator.msSaveBlob(blob, scope.getFilename());
          } else {

            var downloadContainer = angular.element('<div data-tap-disabled="true"><a></a></div>');
            var downloadLink = angular.element(downloadContainer.children()[0]);
            downloadLink.attr('href', window.URL.createObjectURL(blob));
            downloadLink.attr('download', scope.getFilename());
            downloadLink.attr('target', '_blank');

            $document.find('body').append(downloadContainer);
            $timeout(function () {
              downloadLink[0].click();
              downloadLink.remove();
            }, null);
          }
        }

        element.bind('click', function (e) {
          scope.buildCSV().then(function (csv) {
            doClick();
          });
          scope.$apply();
        });
      }
    };
  }]);
})(window, document);