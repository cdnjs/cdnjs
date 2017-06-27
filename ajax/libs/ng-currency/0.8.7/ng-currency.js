/*
 * ng-currency
 * http://alaguirre.com/

 * Version: 0.8.7 - 2015-06-11
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
                
                var fract = (typeof scope.fraction !== 'undefined')?scope.fraction:2;

                function decimalRex(dChar) {
                    return RegExp("\\d|\\-|\\" + dChar, 'g');
                }

                function clearRex(dChar) {
                    return RegExp("\\-{0,1}((\\" + dChar + ")|([0-9]{1,}\\" + dChar + "?))&?[0-9]{0," + fract + "}", 'g');
                }

                function clearValue(value) {
                    value = String(value);
                    var dSeparator = $locale.NUMBER_FORMATS.DECIMAL_SEP;
                    var cleared = null;

                    // Replace negative pattern to minus sign (-)
                    var neg_dummy = $filter('currency')("-1", currencySymbol(), scope.fraction);
                    var neg_idx = neg_dummy.indexOf("1");
                    var neg_str = neg_dummy.substring(0,neg_idx);
                    value = value.replace(neg_str, "-");

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

                    var viewValue = ngModel.$$rawModelValue;
                    while (idx--) {
                      viewValue = formatters[idx](viewValue);
                    }

                    ngModel.$setViewValue(viewValue);
                    ngModel.$render();
                }

                ngModel.$parsers.push(function (viewValue) {
                    var cVal = clearValue(viewValue);
                    //return parseFloat(cVal);
                    // Check for fast digitation (-. or .)
                    if(cVal == "." || cVal == "-.")
                    {
                        cVal = ".0";
                    }
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
                    if(typeof scope.min  !== 'undefined') {
                        return cVal >= parseFloat(scope.min);
                    }
                    return true;
                };

                ngModel.$validators.max = function(cVal) {
                    if (!scope.ngRequired && isNaN(cVal)) {
                        return true;
                    }
                    if(typeof scope.max  !== 'undefined') {
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
