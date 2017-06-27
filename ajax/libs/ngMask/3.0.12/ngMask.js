(function() {
  'use strict';
  angular.module('ngMask', []);
})();(function() {
  'use strict';
  angular.module('ngMask')
    .directive('mask', ['$log', '$timeout', 'MaskService', function($log, $timeout, MaskService) {
      return {
        restrict: 'A',
        require: 'ngModel',
        compile: function($element, $attrs) { 
         if (!$attrs.mask || !$attrs.ngModel) {
            $log.info('Mask and ng-model attributes are required!');
            return;
          }

          var maskService = MaskService.create();
          var timeout;
          var promise;

          function setSelectionRange(selectionStart){
            if (typeof selectionStart !== 'number') {
              return;
            }

            // using $timeout:
            // it should run after the DOM has been manipulated by Angular
            // and after the browser renders (which may cause flicker in some cases)
            $timeout.cancel(timeout);
            timeout = $timeout(function(){
              var selectionEnd = selectionStart + 1;
              var input = $element[0];

              if (input.setSelectionRange) {
                input.focus();
                input.setSelectionRange(selectionStart, selectionEnd);
              } else if (input.createTextRange) {
                var range = input.createTextRange();

                range.collapse(true);
                range.moveEnd('character', selectionEnd);
                range.moveStart('character', selectionStart);
                range.select();
              }
            });
          }

          return {
            pre: function($scope, $element, $attrs, controller) {
              promise = maskService.generateRegex({
                mask: $attrs.mask,
                // repeat mask expression n times
                repeat: ($attrs.repeat || $attrs.maskRepeat),
                // clean model value - without divisors
                clean: (($attrs.clean || $attrs.maskClean) === 'true'),
                // limit length based on mask length
                limit: (($attrs.limit || $attrs.maskLimit || 'true') === 'true'),
                // how to act with a wrong value
                restrict: ($attrs.restrict || $attrs.maskRestrict || 'select'), //select, reject, accept
                // set validity mask
                validate: (($attrs.validate || $attrs.maskValidate || 'true') === 'true'),
                // default model value
                model: $attrs.ngModel,
                // default input value
                value: $attrs.ngValue
              });
            },
            post: function($scope, $element, $attrs, controller) {
              promise.then(function() {
                // get initial options
                var timeout;
                var options = maskService.getOptions();

                function parseViewValue(value) {
                  // set default value equal 0
                  value = value || '';

                  // get view value object
                  var viewValue = maskService.getViewValue(value);

                  // get mask without question marks
                  var maskWithoutOptionals = options['maskWithoutOptionals'] || '';

                  // get view values capped
                  // used on view
                  var viewValueWithDivisors = viewValue.withDivisors(true);
                  // used on model
                  var viewValueWithoutDivisors = viewValue.withoutDivisors(true);

                  try {
                    // get current regex
                    var regex = maskService.getRegex(viewValueWithDivisors.length - 1);
                    var fullRegex = maskService.getRegex(maskWithoutOptionals.length - 1);

                    // current position is valid
                    var validCurrentPosition = regex.test(viewValueWithDivisors) || fullRegex.test(viewValueWithDivisors);

                    // difference means for select option
                    var diffValueAndViewValueLengthIsOne = (value.length - viewValueWithDivisors.length) === 1;
                    var diffMaskAndViewValueIsGreaterThanZero = (maskWithoutOptionals.length - viewValueWithDivisors.length) > 0;

                    if (options.restrict !== 'accept') {
                      if (options.restrict === 'select' && (!validCurrentPosition || diffValueAndViewValueLengthIsOne)) {
                        var lastCharInputed = value[(value.length-1)];
                        var lastCharGenerated = viewValueWithDivisors[(viewValueWithDivisors.length-1)];

                        if ((lastCharInputed !== lastCharGenerated) && diffMaskAndViewValueIsGreaterThanZero) {
                          viewValueWithDivisors = viewValueWithDivisors + lastCharInputed;
                        }

                        var wrongPosition = maskService.getFirstWrongPosition(viewValueWithDivisors);
                        if (angular.isDefined(wrongPosition)) {
                          setSelectionRange(wrongPosition);
                        }
                      } else if (options.restrict === 'reject' && !validCurrentPosition) {
                        viewValue = maskService.removeWrongPositions(viewValueWithDivisors);
                        viewValueWithDivisors = viewValue.withDivisors(true);
                        viewValueWithoutDivisors = viewValue.withoutDivisors(true);

                        // setSelectionRange(viewValueWithDivisors.length);
                      }
                    }

                    if (!options.limit) {
                      viewValueWithDivisors = viewValue.withDivisors(false);
                      viewValueWithoutDivisors = viewValue.withoutDivisors(false);
                    }

                    // Set validity
                    if (options.validate && controller.$dirty) {
                      if (fullRegex.test(viewValueWithDivisors) || controller.$isEmpty(controller.$modelValue)) {
                        controller.$setValidity('mask', true);
                      } else {
                        controller.$setValidity('mask', false);
                      }
                    }

                    // Update view and model values
                    if(value !== viewValueWithDivisors){
                      controller.$setViewValue(angular.copy(viewValueWithDivisors), 'input');
                      controller.$render();
                    }
                  } catch (e) {
                    $log.error('[mask - parseViewValue]');
                    throw e;
                  }

                  // Update model, can be different of view value
                  if (options.clean) {
                    return viewValueWithoutDivisors;
                  } else {
                    return viewValueWithDivisors;
                  }
                }

                controller.$parsers.push(parseViewValue);

                $element.on('click input paste keyup', function() {
                  timeout = $timeout(function() {
                    // Manual debounce to prevent multiple execution
                    $timeout.cancel(timeout);

                    parseViewValue($element.val());
                    $scope.$apply();
                  }, 100);
                });

                // Register the watch to observe remote loading or promised data
                // Deregister calling returned function
                var watcher = $scope.$watch($attrs.ngModel, function (newValue, oldValue) {
                  if (angular.isDefined(newValue)) {
                    parseViewValue(newValue);
                    watcher();
                  }
                });

                // $evalAsync from a directive
                // it should run after the DOM has been manipulated by Angular
                // but before the browser renders
                if(options.value) {
                  $scope.$evalAsync(function($scope) {
                    controller.$setViewValue(angular.copy(options.value), 'input');
                    controller.$render();
                  });
                }
              });
            }
          }
        }
      }
    }]);
})();(function() {
  'use strict';
  angular.module('ngMask')
    .factory('MaskService', ['$q', 'OptionalService', 'UtilService', function($q, OptionalService, UtilService) {
      function create() {
        var options;
        var maskWithoutOptionals;
        var maskWithoutOptionalsLength = 0;
        var maskWithoutOptionalsAndDivisorsLength = 0;
        var optionalIndexes = [];
        var optionalDivisors = {};
        var optionalDivisorsCombinations = [];
        var divisors = [];
        var divisorElements = {};
        var regex = [];
        var patterns = {
          '9': /[0-9]/,
          '8': /[0-8]/,
          '7': /[0-7]/,
          '6': /[0-6]/,
          '5': /[0-5]/,
          '4': /[0-4]/,
          '3': /[0-3]/,
          '2': /[0-2]/,
          '1': /[0-1]/,
          '0': /[0]/,
          '*': /./,
          'w': /\w/,
          'W': /\W/,
          'd': /\d/,
          'D': /\D/,
          's': /\s/,
          'S': /\S/,
          'b': /\b/,
          'A': /[A-Z]/,
          'a': /[a-z]/,
          'Z': /[A-ZÇÀÁÂÃÈÉÊẼÌÍÎĨÒÓÔÕÙÚÛŨ]/,
          'z': /[a-zçáàãâéèêẽíìĩîóòôõúùũüû]/,
          '@': /[a-zA-Z]/,
          '#': /[a-zA-ZçáàãâéèêẽíìĩîóòôõúùũüûÇÀÁÂÃÈÉÊẼÌÍÎĨÒÓÔÕÙÚÛŨ]/,
          '%': /[0-9a-zA-ZçáàãâéèêẽíìĩîóòôõúùũüûÇÀÁÂÃÈÉÊẼÌÍÎĨÒÓÔÕÙÚÛŨ]/
        };

        // REGEX

        function generateIntermetiateElementRegex(i, forceOptional) {
          var charRegex;
          try {
            var element = maskWithoutOptionals[i];
            var elementRegex = patterns[element];
            var hasOptional = isOptional(i);

            if (elementRegex) {
              charRegex = '(' + elementRegex.source + ')';
            } else { // is a divisor
              if (!isDivisor(i)) {
                divisors.push(i);
                divisorElements[i] = element;
              }

              charRegex = '(' + '\\' + element + ')';
            }
          } catch (e) {
            throw e;
          }

          if (hasOptional || forceOptional) {
            charRegex += '?';
          }

          return new RegExp(charRegex);
        }

        function generateIntermetiateRegex(i, forceOptional) {


          var elementRegex
          var elementOptionalRegex;
          try {
            var intermetiateElementRegex = generateIntermetiateElementRegex(i, forceOptional);
            elementRegex = intermetiateElementRegex;

            var hasOptional = isOptional(i);
            var currentRegex = intermetiateElementRegex.source;

            if (hasOptional && ((i+1) < maskWithoutOptionalsLength)) {
              var intermetiateRegex = generateIntermetiateRegex((i+1), true).elementOptionalRegex();
              currentRegex += intermetiateRegex.source;
            }

            elementOptionalRegex = new RegExp(currentRegex);
          } catch (e) {
            throw e;
          }
          return {
            elementRegex: function() {
              return elementRegex;
            },
            elementOptionalRegex: function() {
              // from element regex, gets the flow of regex until first not optional
              return elementOptionalRegex;
            }
          };
        }

        function generateRegex(opts) {
          var deferred = $q.defer();
          options = opts;

          try {
            var mask = opts['mask'];
            var repeat = opts['repeat'];

            if (repeat) {
              mask = Array((parseInt(repeat)+1)).join(mask);
            }

            optionalIndexes = OptionalService.getOptionals(mask).fromMaskWithoutOptionals();
            options['maskWithoutOptionals'] = maskWithoutOptionals = OptionalService.removeOptionals(mask);
            maskWithoutOptionalsLength = maskWithoutOptionals.length;

            var cumulativeRegex;
            for (var i=0; i<maskWithoutOptionalsLength; i++) {
              var charRegex = generateIntermetiateRegex(i);
              var elementRegex = charRegex.elementRegex();
              var elementOptionalRegex = charRegex.elementOptionalRegex();

              var newRegex = cumulativeRegex ? cumulativeRegex.source + elementOptionalRegex.source : elementOptionalRegex.source;
              newRegex = new RegExp(newRegex);
              cumulativeRegex = cumulativeRegex ? cumulativeRegex.source + elementRegex.source : elementRegex.source;
              cumulativeRegex = new RegExp(cumulativeRegex);

              regex.push(newRegex);
            }

            generateOptionalDivisors();
            maskWithoutOptionalsAndDivisorsLength = removeDivisors(maskWithoutOptionals).length;

            deferred.resolve({
              options: options,
              divisors: divisors,
              divisorElements: divisorElements,
              optionalIndexes: optionalIndexes,
              optionalDivisors: optionalDivisors,
              optionalDivisorsCombinations: optionalDivisorsCombinations
            });
          } catch (e) {
            deferred.reject(e);
            throw e;
          }

          return deferred.promise;
        }

        function getRegex(index) {
          var currentRegex;

          try {
            currentRegex = regex[index] ? regex[index].source : '';
          } catch (e) {
            throw e;
          }

          return (new RegExp('^' + currentRegex + '$'));
        }

        // DIVISOR

        function isOptional(currentPos) {
          return UtilService.inArray(currentPos, optionalIndexes);
        }

        function isDivisor(currentPos) {
          return UtilService.inArray(currentPos, divisors);
        }

        function generateOptionalDivisors() {
          function sortNumber(a,b) {
              return a - b;
          }

          var sortedDivisors = divisors.sort(sortNumber);
          var sortedOptionals = optionalIndexes.sort(sortNumber);
          for (var i = 0; i<sortedDivisors.length; i++) {
            var divisor = sortedDivisors[i];
            for (var j = 1; j<=sortedOptionals.length; j++) {
              var optional = sortedOptionals[(j-1)];
              if (optional >= divisor) {
                break;
              }

              if (optionalDivisors[divisor]) {
                optionalDivisors[divisor] = optionalDivisors[divisor].concat(divisor-j);
              } else {
                optionalDivisors[divisor] = [(divisor-j)];
              }

              // get the original divisor for alternative divisor
              divisorElements[(divisor-j)] = divisorElements[divisor];
            }
          }
        }

        function removeDivisors(value) {
          try {
            if (divisors.length > 0 && value) {
              var keys = Object.keys(divisorElements);
              var elments = [];

              for (var i = keys.length - 1; i >= 0; i--) {
                var divisor = divisorElements[keys[i]];
                if (divisor) {
                  elments.push(divisor);
                }
              }

              elments = UtilService.uniqueArray(elments);

              // remove if it is not pattern
              var regex = new RegExp(('[' + '\\' + elments.join('\\') + ']'), 'g');
              return value.replace(regex, '');
            } else {
              return value;
            }
          } catch (e) {
            throw e;
          }
        }

        function insertDivisors(array, combination) {
          function insert(array, output) {
            var out = output;
            for (var i=0; i<array.length; i++) {
              var divisor = array[i];
              if (divisor < out.length) {
                out.splice(divisor, 0, divisorElements[divisor]);
              }
            }
            return out;
          }

          var output = array;
          var divs = divisors.filter(function(it) {
            var optionalDivisorsKeys = Object.keys(optionalDivisors).map(function(it){
              return parseInt(it);
            });

            return !UtilService.inArray(it, combination) && !UtilService.inArray(it, optionalDivisorsKeys);
          });

          if (!angular.isArray(array) || !angular.isArray(combination)) {
            return output;
          }

          // insert not optional divisors
          output = insert(divs, output);

          // insert optional divisors
          output = insert(combination, output);

          return output;
        }

        function tryDivisorConfiguration(value) {
          var output = value.split('');
          var defaultDivisors = true;

          // has optional?
          if (optionalIndexes.length > 0) {
            var lazyArguments = [];
            var optionalDivisorsKeys = Object.keys(optionalDivisors);

            // get all optional divisors as array of arrays [[], [], []...]
            for (var i=0; i<optionalDivisorsKeys.length; i++) {
              var val = optionalDivisors[optionalDivisorsKeys[i]];
              lazyArguments.push(val);
            }

            // generate all possible configurations
            if (optionalDivisorsCombinations.length === 0) {
              UtilService.lazyProduct(lazyArguments, function() {
                // convert arguments to array
                optionalDivisorsCombinations.push(Array.prototype.slice.call(arguments));
              });
            }

            for (var i = optionalDivisorsCombinations.length - 1; i >= 0; i--) {
              var outputClone = angular.copy(output);
              outputClone = insertDivisors(outputClone, optionalDivisorsCombinations[i]);

              // try validation
              var viewValueWithDivisors = outputClone.join('');
              var regex = getRegex(maskWithoutOptionals.length - 1);

              if (regex.test(viewValueWithDivisors)) {
                defaultDivisors = false;
                output = outputClone;
                break;
              }
            }
          }

          if (defaultDivisors) {
            output = insertDivisors(output, divisors);
          }

          return output.join('');
        }

        // MASK

        function getOptions() {
          return options;
        }

        function getViewValue(value) {
          try {
            var outputWithoutDivisors = removeDivisors(value);
            var output = tryDivisorConfiguration(outputWithoutDivisors);

            return {
              withDivisors: function(capped) {
                if (capped) {
                  return output.substr(0, maskWithoutOptionalsLength);
                } else {
                  return output;
                }
              },
              withoutDivisors: function(capped) {
                if (capped) {
                  return outputWithoutDivisors.substr(0, maskWithoutOptionalsAndDivisorsLength);
                } else {
                  return outputWithoutDivisors;
                }
              }
            };
          } catch (e) {
            throw e;
          }
        }

        // SELECTOR

        function getWrongPositions(viewValueWithDivisors, onlyFirst) {
          var pos = [];

          if (!viewValueWithDivisors) {
            return 0;
          }

          for (var i=0; i<viewValueWithDivisors.length; i++){
            var pattern = getRegex(i);
            var value = viewValueWithDivisors.substr(0, (i+1));

            if(pattern && !pattern.test(value)){
              pos.push(i);

              if (onlyFirst) {
                break;
              }
            }
          }

          return pos;
        }

        function getFirstWrongPosition(viewValueWithDivisors) {
          return getWrongPositions(viewValueWithDivisors, true)[0];
        }

        function removeWrongPositions(viewValueWithDivisors) {
          var wrongPositions = getWrongPositions(viewValueWithDivisors, false);
          var newViewValue = viewValueWithDivisors;

          for (var i in wrongPositions) {
            var wrongPosition = wrongPositions[i];
            var viewValueArray = viewValueWithDivisors.split('');
            viewValueArray.splice(wrongPosition, 1);
            newViewValue = viewValueArray.join('');
          }

          return getViewValue(newViewValue);
        }

        return {
          getViewValue: getViewValue,
          generateRegex: generateRegex,
          getRegex: getRegex,
          getOptions: getOptions,
          removeDivisors: removeDivisors,
          getFirstWrongPosition: getFirstWrongPosition,
          removeWrongPositions: removeWrongPositions
        }
      }

      return {
        create: create
      }
    }]);
})();
(function() {
  'use strict';
  angular.module('ngMask')
    .factory('OptionalService', [function() {
      function getOptionalsIndexes(mask) {
        var indexes = [];

        try {
          var regexp = /\?/g;
          var match = [];

          while ((match = regexp.exec(mask)) != null) {
            // Save the optional char
            indexes.push((match.index - 1));
          }
        } catch (e) {
          throw e;
        }

        return {
          fromMask: function() {
            return indexes;
          },
          fromMaskWithoutOptionals: function() {
            return getOptionalsRelativeMaskWithoutOptionals(indexes);
          }
        };
      }

      function getOptionalsRelativeMaskWithoutOptionals(optionals) {
        var indexes = [];
        for (var i=0; i<optionals.length; i++) {
          indexes.push(optionals[i]-i);
        }
        return indexes;
      }

      function removeOptionals(mask) {
        var newMask;

        try {
          newMask = mask.replace(/\?/g, '');
        } catch (e) {
          throw e;
        }

        return newMask;
      }

      return {
        removeOptionals: removeOptionals,
        getOptionals: getOptionalsIndexes
      }
    }]);
})();(function() {
  'use strict';
  angular.module('ngMask')
    .factory('UtilService', [function() {

      // sets: an array of arrays
      // f: your callback function
      // context: [optional] the `this` to use for your callback
      // http://phrogz.net/lazy-cartesian-product
      function lazyProduct(sets, f, context){
        if (!context){
          context=this;
        }

        var p = [];
        var max = sets.length-1;
        var lens = [];

        for (var i=sets.length;i--;) {
          lens[i] = sets[i].length;
        }

        function dive(d){
          var a = sets[d];
          var len = lens[d];

          if (d === max) {
            for (var i=0;i<len;++i) {
              p[d] = a[i];
              f.apply(context, p);
            }
          } else {
            for (var i=0;i<len;++i) {
              p[d]=a[i];
              dive(d+1);
            }
          }

          p.pop();
        }

        dive(0);
      }

      function inArray(i, array) {
        var output;

        try {
          output = array.indexOf(i) > -1;
        } catch (e) {
          throw e;
        }

        return output;
      }

      function uniqueArray(array) {
        var u = {};
        var a = [];

        for (var i = 0, l = array.length; i < l; ++i) {
          if(u.hasOwnProperty(array[i])) {
            continue;
          }

          a.push(array[i]);
          u[array[i]] = 1;
        }

        return a;
      }

      return {
        lazyProduct: lazyProduct,
        inArray: inArray,
        uniqueArray: uniqueArray
      }
    }]);
})();