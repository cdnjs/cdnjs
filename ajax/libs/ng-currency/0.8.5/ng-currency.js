/*
 * ng-currency
 * http://alaguirre.com/

 * Version: 0.8.5 - 2015-05-11
 * License: MIT
 */

angular.module('ng-currency', [])
    .directive('ngCurrency', ['$filter', '$locale', function ($filter, $locale) {
        return {
            require: 'ngModel',
            scope: {
                min: '=min',
                max: '=max',
                currencySymbol: '@',
                ngRequired: '=ngRequired',
                fraction: '=fraction'
            },
            link: function (scope, element, attrs, ngModel) {
                if (attrs.ngCurrency === 'false') return;

                function decimalRex(dChar) {
                    return RegExp("\\d|\\-|\\" + dChar, 'g');
                }

                function clearRex(dChar) {
                    return RegExp("\\-{0,1}((\\" + dChar + ")|([0-9]{1,}\\" + dChar + "?))&?[0-9]{0,2}", 'g');
                }

                function clearValue(value) {
                    value = String(value);
                    var dSeparator = $locale.NUMBER_FORMATS.DECIMAL_SEP;
                    var cleared = null;

                    if(RegExp("^-[\\s]*$", 'g').test(value)) {
                        value = "-0";
                    }

                    if(decimalRex(dSeparator).test(value))
                    {
                        cleared = value.match(decimalRex(dSeparator))
                            .join("").match(clearRex(dSeparator));
                        cleared = cleared ? cleared[0].replace(dSeparator, ".") : null;
                    }

                    return cleared;
                }

                function currencySymbol() {
                    if (angular.isDefined(scope.currencySymbol)) {
                        return scope.currencySymbol;
                    } else {
                        return $locale.NUMBER_FORMATS.CURRENCY_SYM;
                    }
                }

                function reformatViewValue(){
                    var formatters = ngModel.$formatters,
                        idx = formatters.length;

                    var viewValue = ngModel.$modelValue;
                    while (idx--) {
                      viewValue = formatters[idx](viewValue);
                    }

                    ngModel.$setViewValue(viewValue);
                    ngModel.$render();
                }

                ngModel.$parsers.push(function (viewValue) {
                    var cVal = clearValue(viewValue);
                    return parseFloat(cVal);
                });

                element.on("blur", function () {
                    ngModel.$commitViewValue();
                    reformatViewValue();
                });

                ngModel.$formatters.unshift(function (value) {
                    return $filter('currency')(value, currencySymbol(), scope.fraction);
                });

                ngModel.$validators.min = function(cVal) {
                    if (!scope.ngRequired && isNaN(cVal)) {
                        return true;
                    }
                    if(scope.min) {
                        return cVal >= parseFloat(scope.min);
                    }
                    return true;
                };

                ngModel.$validators.max = function(cVal) {
                    if (!scope.ngRequired && isNaN(cVal)) {
                        return true;
                    }
                    if(scope.max) {
                        return cVal <= parseFloat(scope.max);
                    }
                    return true;
                };

                ngModel.$validators.fraction = function(cVal) {
                    if (!!cVal && isNaN(cVal)) {
                        return false;
                    }

                    return true;
                };
            }
        }
    }]);
