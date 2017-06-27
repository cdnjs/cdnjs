/*
 * ng-currency
 * http://alaguirre.com/

 * Version: 0.7.10 - 2014-11-26
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
                ngRequired: '=ngRequired'
            },
            link: function (scope, element, attrs, ngModel) {

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
                    else
                    {
                        cleaned = null;
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

                ngModel.$parsers.push(function (viewValue) {
                    cVal = clearValue(viewValue);
                    return parseFloat(cVal);
                });

                element.on("blur", function () {
                    element.val($filter('currency')(ngModel.$modelValue, currencySymbol()));
                });

                ngModel.$formatters.unshift(function (value) {
                    return $filter('currency')(value, currencySymbol());
                });

                scope.$watch(function () {
                    return ngModel.$modelValue
                }, function (newValue, oldValue) {
                    runValidations(newValue);
                })

                function runValidations(cVal) {
                    if (!scope.ngRequired && isNaN(cVal)) {
                        return
                    }
                    if (scope.min) {
                        var min = parseFloat(scope.min)
                        ngModel.$setValidity('min', cVal >= min)
                    }
                    if (scope.max) {
                        var max = parseFloat(scope.max)
                        ngModel.$setValidity('max', cVal <= max)
                    }
                }
            }
        }
    }]);
