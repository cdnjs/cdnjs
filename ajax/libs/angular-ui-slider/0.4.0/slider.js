/*
 jQuery UI Slider plugin wrapper
*/
angular.module('ui.slider', []).value('uiSliderConfig',{}).directive('uiSlider', ['uiSliderConfig', '$timeout', function(uiSliderConfig, $timeout) {
    uiSliderConfig = uiSliderConfig || {};
    return {
        require: 'ngModel',
        compile: function() {
            var preLink = function (scope, elm, attrs, ngModel) {

                function parseNumber(n, decimals) {
                    return (decimals) ? parseFloat(n) : parseInt(n, 10);
                }

                var directiveOptions = angular.copy(scope.$eval(attrs.uiSlider));
                var options = angular.extend(directiveOptions || {}, uiSliderConfig);
                // Object holding range values
                var prevRangeValues = {
                    min: null,
                    max: null
                };

                // convenience properties
                var properties = ['min', 'max', 'step', 'lowerBound', 'upperBound'];
                var useDecimals = (!angular.isUndefined(attrs.useDecimals)) ? true : false;
                var updateOn = (angular.isDefined(options['updateOn'])) ? options['updateOn'] : 'slide'

                var init = function() {
                    // When ngModel is assigned an array of values then range is expected to be true.
                    // Warn user and change range to true else an error occurs when trying to drag handle
                    if (angular.isArray(ngModel.$viewValue) && options.range !== true) {
                        console.warn('Change your range option of ui-slider. When assigning ngModel an array of values then the range option should be set to true.');
                        options.range = true;
                    }

                    // Ensure the convenience properties are passed as options if they're defined
                    // This avoids init ordering issues where the slider's initial state (eg handle
                    // position) is calculated using widget defaults
                    // Note the properties take precedence over any duplicates in options
                    angular.forEach(properties, function(property) {
                        if (angular.isDefined(attrs[property])) {
                            options[property] = parseNumber(attrs[property], useDecimals);
                        }
                    });

                    elm.slider(options);
                    init = angular.noop;
                };

                // Find out if decimals are to be used for slider
                angular.forEach(properties, function(property) {
                    // support {{}} and watch for updates
                    attrs.$observe(property, function(newVal) {
                        if (!!newVal) {
                            init();
                            options[property] = parseNumber(newVal, useDecimals);
                            elm.slider('option', property, parseNumber(newVal, useDecimals));
                            ngModel.$render();
                        }
                    });
                });
                attrs.$observe('disabled', function(newVal) {
                    init();
                    elm.slider('option', 'disabled', !!newVal);
                });

                // Watch ui-slider (byVal) for changes and update
                scope.$watch(attrs.uiSlider, function(newVal) {
                    init();
                    if(newVal !== undefined) {
                      elm.slider('option', newVal);
                    }
                }, true);

                // Late-bind to prevent compiler clobbering
                $timeout(init, 0, true);

                // Update model value from slider
                elm.bind(updateOn, function(event, ui) {
                    var valuesChanged;

                    if (ui.values) {
                        var boundedValues = ui.values.slice();

                        if (options.lowerBound && boundedValues[0] < options.lowerBound) {
                            boundedValues[0] = Math.max(boundedValues[0], options.lowerBound);
                        }
                        if (options.upperBound && boundedValues[1] > options.upperBound) {
                            boundedValues[1] = Math.min(boundedValues[1], options.upperBound);
                        }

                        if (boundedValues[0] !== ui.values[0] || boundedValues[1] !== ui.values[1]) {
                            valuesChanged = true;
                            ui.values = boundedValues;
                        }
                    } else {
                        var boundedValue = ui.value;

                        if (options.lowerBound && boundedValue < options.lowerBound) {
                            boundedValue = Math.max(boundedValue, options.lowerBound);
                        }
                        if (options.upperBound && boundedValue > options.upperBound) {
                            boundedValue = Math.min(boundedValue, options.upperBound);
                        }

                        if (boundedValue !== ui.value) {
                            valuesChanged = true;
                            ui.value = boundedValue;
                        }
                    }


                    ngModel.$setViewValue(ui.values || ui.value);
                    $(ui.handle).find('.ui-slider-tip').text(ui.value);
                    scope.$apply();

                    if (valuesChanged) {
                        setTimeout(function() {
                            elm.slider('value', ui.values || ui.value);
                        }, 0);

                        return false;
                    }
                });

                // Update slider from model value
                ngModel.$render = function() {
                    init();
                    var method = options.range === true ? 'values' : 'value';

                    if (options.range !== true && isNaN(ngModel.$viewValue) && !(ngModel.$viewValue instanceof Array)) {
                        ngModel.$viewValue = 0;
                    }
                    else if (options.range && !angular.isDefined(ngModel.$viewValue)) {
                            ngModel.$viewValue = [0,0];
                    }

                    // Do some sanity check of range values
                    if (options.range === true) {
                        // previously, the model was a string b/c it was in a text input, need to convert to a array.
                        // make sure input exists, comma exists once, and it is a string.
                        if (ngModel.$viewValue && angular.isString(ngModel.$viewValue) && (ngModel.$viewValue.match(/,/g) || []).length === 1) {
                            // transform string model into array.
                            var valueArr = ngModel.$viewValue.split(',');
                            ngModel.$viewValue = [Number(valueArr[0]), Number(valueArr[1])];
                        }
                        // Check outer bounds for min and max values
                        if (angular.isDefined(options.min) && options.min > ngModel.$viewValue[0]) {
                            ngModel.$viewValue[0] = options.min;
                        }
                        if (angular.isDefined(options.max) && options.max < ngModel.$viewValue[1]) {
                            ngModel.$viewValue[1] = options.max;
                        }

                        // Check min and max range values
                        if (ngModel.$viewValue[0] > ngModel.$viewValue[1]) {
                            // Min value should be less to equal to max value
                            if (prevRangeValues.min >= ngModel.$viewValue[1]) {
                                ngModel.$viewValue[1] = prevRangeValues.min;
                            }
                            // Max value should be less to equal to min value
                            if (prevRangeValues.max <= ngModel.$viewValue[0]) {
                                ngModel.$viewValue[0] = prevRangeValues.max;
                            }
                        }

                        // Store values for later user
                        prevRangeValues.min = ngModel.$viewValue[0];
                        prevRangeValues.max = ngModel.$viewValue[1];

                    }
                    elm.slider(method, ngModel.$viewValue);
                };

                scope.$watch(attrs.ngModel, function() {
                    if (options.range === true) {
                        ngModel.$render();

                        $(elm).find('.ui-slider-tip').each(function(i, tipElm) {
                            $(tipElm).text(ngModel.$viewValue[i]);
                        });
                    } else {
                        $(elm).find('.ui-slider-tip').text(ngModel.$viewValue);
                    }
                }, true);

                function destroy() {
                    if (elm.hasClass('ui-slider')) {
                        elm.slider('destroy');
                    }
                }

                scope.$on("$destroy", destroy);
                elm.one('$destroy', destroy);
            };

            var postLink = function (scope, element, attrs, ngModel) {
                // Add tick marks if 'tick' and 'step' attributes have been setted on element.
                // Support horizontal slider bar so far. 'tick' and 'step' attributes are required.
                var options = angular.extend({}, scope.$eval(attrs.uiSlider));
                var properties = ['min', 'max', 'step', 'tick', 'tip'];
                angular.forEach(properties, function(property) {
                    if (angular.isDefined(attrs[property])) {
                        options[property] = attrs[property];
                    }
                });
                if (angular.isDefined(options['tick']) && angular.isDefined(options['step'])) {
                    var total = parseInt( (parseInt(options['max']) - parseInt(options['min'])) /parseInt(options['step']));
                    for (var i = total; i >= 0; i--) {
                        var left = ((i / total) * 100) + '%';
                        $("<div/>").addClass("ui-slider-tick").appendTo(element).css({left: left});
                    };
                }
                if(angular.isDefined(options['tip'])) {
                    $timeout(function(){
                        var handles = element.find('.ui-slider-handle');
                        if(handles && handles.length>1 && ngModel.$viewValue && angular.isArray(ngModel.$viewValue)){
                            $(handles[0]).append('<div class="ui-slider-tip">'+ngModel.$viewValue[0]+'</div>');
                            $(handles[1]).append('<div class="ui-slider-tip">'+ngModel.$viewValue[1]+'</div>');
                        }else{
                            element.find('.ui-slider-handle').append('<div class="ui-slider-tip">'+ngModel.$viewValue+'</div>');
                        }
                    },10);
                }
            }

            return {
                pre: preLink,
                post: postLink
            };
        }
    };
}]);
