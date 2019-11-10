/*!
 * angularjs-color-picker v0.8.1
 * https://github.com/ruhley/angular-color-picker/
 *
 * Copyright 2015 ruhley
 *
 * 2016-01-11 08:39:01
 *
 */
if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports){
  module.exports = 'color.picker';
}

(function() {
    'use strict';

    angular.module('color.picker', []);
})();

(function() {
    'use strict';

    var colorPicker = function ($document) {
        return {
            restrict: 'E',
            require: ['^ngModel'],
            scope: {
                ngModel: '=',
                colorPickerAlpha: '=',
                colorPickerCase: '=',
                colorPickerFormat: '=',
                colorPickerPos: '=',
                colorPickerSwatch: '=',
                colorPickerSwatchOnly: '=',
                colorPickerSwatchPos: '=',
                colorPickerSwatchBootstrap: '=',
                colorPickerOnChange: '&',
            },
            templateUrl: 'template/color-picker/directive.html',
            link: function ($scope, element, attrs, control) {
                $scope.onChangeValue = null;

                $scope.init = function () {
                    // if no color provided
                    if ($scope.ngModel === undefined) {
                        $scope.hue = 0;
                        $scope.saturation = 0;
                        $scope.lightness = 100;
                    } else {
                        var color = tinycolor($scope.ngModel);

                        if (color.isValid()) {
                            var hsl = color.toHsv();
                            $scope.hue = hsl.h;
                            $scope.saturation = hsl.s * 100;
                            $scope.lightness = hsl.v * 100;
                            $scope.opacity = hsl.a * 100;
                        }
                    }

                    // set default config settings
                    $scope.initConfig();

                    // setup mouse events
                    $document.on('mousedown', $scope.onMouseDown);
                    $document.on('mouseup', $scope.onMouseUp);
                    $document.on('mousemove', $scope.onMouseMove);

                    $scope.find('.color-picker-grid').on('click', $scope.onColorClick);
                    $scope.find('.color-picker-hue').on('click', $scope.onHueClick);
                    $scope.find('.color-picker-opacity').on('click', $scope.onOpacityClick);
                };

                $scope.onMouseDown = function(event) {
                    // an element in this picker
                    if ($scope.find(event.target).length > 0) {
                        // mouse event on color grid
                        if (event.target.classList.contains('color-picker-grid-inner') || event.target.classList.contains('color-picker-picker') || event.target.parentNode.classList.contains('color-picker-picker')) {
                            $scope.colorDown(event);
                            $scope.$apply();
                        // mouse event on hue slider
                        } else if (event.target.classList.contains('color-picker-hue') || event.target.parentNode.classList.contains('color-picker-hue')) {
                            $scope.hueDown(event);
                            $scope.$apply();
                        // mouse event on opacity slider
                        } else if (event.target.classList.contains('color-picker-opacity') || event.target.parentNode.classList.contains('color-picker-opacity')) {
                            $scope.opacityDown(event);
                            $scope.$apply();
                        }
                    }
                };

                $scope.onMouseUp = function(event) {
                    // no current mouse events and not an element in the picker
                    if (!$scope.colorMouse && !$scope.hueMouse && !$scope.opacityMouse && $scope.find(event.target).length === 0) {
                        $scope.log('Color Picker: Document Click Event');
                        $scope.hide();
                        $scope.$apply();
                    // mouse event on color grid
                    } else if ($scope.colorMouse) {
                        $scope.colorUp(event);
                        $scope.$apply();
                        $scope.onChange(event);
                    // mouse event on hue slider
                    } else if ($scope.hueMouse) {
                        $scope.hueUp(event);
                        $scope.$apply();
                        $scope.onChange(event);
                    // mouse event on opacity slider
                    } else if ($scope.opacityMouse) {
                        $scope.opacityUp(event);
                        $scope.$apply();
                        $scope.onChange(event);
                    }
                };

                $scope.onMouseMove = function(event) {
                    // mouse event on color grid
                    if ($scope.colorMouse) {
                        $scope.colorChange(event);
                        $scope.$apply();
                    // mouse event on hue slider
                    } else if ($scope.hueMouse) {
                        $scope.hueChange(event);
                        $scope.$apply();
                    // mouse event on opacity slider
                    } else if ($scope.opacityMouse) {
                        $scope.opacityChange(event);
                        $scope.$apply();
                    }
                };

                $scope.onColorClick = function(event) {
                    $scope.colorChange(event);
                    $scope.$apply();
                    $scope.onChange(event);
                };

                $scope.onHueClick = function(event) {
                    $scope.hueChange(event);
                    $scope.$apply();
                    $scope.onChange(event);
                };

                $scope.onOpacityClick = function(event) {
                    $scope.opacityChange(event);
                    $scope.$apply();
                    $scope.onChange(event);
                };

                $scope.onChange = function(event) {
                    if ($scope.ngModel !== $scope.onChangeValue) {
                        $scope.onChangeValue = $scope.ngModel;
                        $scope.colorPickerOnChange({$event: event, color: $scope.ngModel});
                    }
                };


                $scope.initConfig = function() {
                    $scope.config = {};
                    $scope.config.alpha = $scope.colorPickerAlpha === undefined ? true : $scope.colorPickerAlpha;
                    $scope.config.case = $scope.colorPickerCase === undefined ? 'upper' : $scope.colorPickerCase;
                    $scope.config.format = $scope.colorPickerFormat === undefined ? 'hsl' : $scope.colorPickerFormat;
                    $scope.config.pos = $scope.colorPickerPos === undefined ? 'bottom left' : $scope.colorPickerPos;
                    $scope.config.swatch = $scope.colorPickerSwatch === undefined ? true : $scope.colorPickerSwatch;
                    $scope.config.swatchOnly = $scope.colorPickerSwatchOnly === undefined ? false : $scope.colorPickerSwatchOnly;
                    $scope.config.swatchPos = $scope.colorPickerSwatchPos === undefined ? 'left' : $scope.colorPickerSwatchPos;
                    $scope.config.swatchBootstrap = $scope.colorPickerSwatchBootstrap === undefined ? true : $scope.colorPickerSwatchBootstrap;
                    $scope.log('Color Picker: Config', $scope.config);
                };

                $scope.focus = function () {
                    $scope.log('Color Picker: Focus Event');
                    $scope.find('.color-picker-input')[0].focus();
                };

                $scope.show = function () {
                    $scope.log('Color Picker: Show Event');
                    $scope.visible = true;
                    $scope.hueMouse = false;
                    $scope.opacityMouse = false;
                    $scope.colorMouse = false;

                    // force the grid selection circle to redraw and fix its position
                    $scope.saturationUpdate();
                    $scope.lightnessUpdate();
                };

                $scope.hide = function () {
                    if ($scope.visible || element[0].querySelector('.color-picker-panel').offsetParent !== null) {
                        $scope.log('Color Picker: Hide Event');

                        $scope.visible = false;
                        $scope.$apply();
                    }
                };

                $scope.update = function () {
                    if ($scope.hue !== undefined && $scope.saturation !== undefined && $scope.lightness !== undefined) {
                        var color = tinycolor({h: $scope.hue, s: $scope.saturation / 100, v: $scope.lightness / 100}),
                            colorString;

                        if ($scope.config.alpha) {
                            color.setAlpha($scope.opacity / 100);
                        }

                        $scope.log('Color Picker: COLOR CHANGED TO ', color, $scope.hue, $scope.saturation, $scope.lightness, $scope.opacity);

                        $scope.swatchColor = color.toHslString();

                        switch ($scope.config.format) {
                            case 'rgb':
                                colorString = color.toRgbString();
                                break;

                            case 'hex':
                                colorString = color.toHexString();
                                if ($scope.config.case === 'lower') {
                                    colorString = colorString.toLowerCase();
                                } else {
                                    colorString = colorString.toUpperCase();
                                }
                                break;

                            case 'hex8':
                                colorString = color.toHex8String();
                                if ($scope.config.case === 'lower') {
                                    colorString = colorString.toLowerCase();
                                } else {
                                    colorString = colorString.toUpperCase();
                                }
                                break;

                            case 'hsv':
                                colorString = color.toHsvString();
                                break;

                            default:
                                colorString = color.toHslString();
                                break;
                        }

                        $scope.ngModel = colorString;
                    }
                };

                $scope.$watch('ngModel', function (newValue, oldValue) {
                    if (newValue !== undefined && newValue !== null && newValue !== oldValue && newValue.length > 4) {
                        $scope.log('Color Picker: MODEL - CHANGED', newValue);
                        var color = tinycolor(newValue);

                        if (color.isValid()) {
                            var hsl = color.toHsv();

                            $scope.hue = hsl.h;
                            $scope.saturation = hsl.s * 100;
                            $scope.lightness = hsl.v * 100;

                            if ($scope.config.alpha) {
                                $scope.opacity = hsl.a * 100;
                            }

                            $scope.isValid = true;
                        } else {
                            $scope.isValid = false;
                        }

                        control[0].$setValidity(attrs.name, $scope.isValid);

                        if (oldValue !== undefined && typeof control[0].$setDirty === 'function') {
                            control[0].$setDirty();
                        }
                    } else {
                        $scope.swatchColor = '';
                    }
                });

                $scope.$watch('colorPickerFormat', function (newValue, oldValue) {
                    if (newValue !== undefined && newValue !== oldValue) {
                        if (newValue === 'hex') {
                            $scope.colorPickerAlpha = false;
                        }

                        $scope.initConfig();
                        $scope.update();
                    }
                });

                $scope.$watchGroup(
                    ['colorPickerAlpha', 'colorPickerCase'],
                    function (newValue, oldValue) {
                        if (newValue !== undefined) {
                            $scope.initConfig();
                            $scope.update();
                        }
                    }
                );

                $scope.$watchGroup(
                    ['colorPickerSwatchPos', 'colorPickerSwatchBootstrap', 'colorPickerSwatchOnly', 'colorPickerSwatch', 'colorPickerPos'],
                    function (newValue, oldValue) {
                        if (newValue !== undefined) {
                            $scope.initConfig();
                        }
                    }
                );

                $scope.hueDown = function (event) {
                    event.stopPropagation();
                    event.preventDefault();

                    $scope.log('Color Picker: HUE - MOUSE DOWN');
                    $scope.hueMouse = true;
                };

                $scope.hueUp = function (event) {
                    event.stopPropagation();
                    event.preventDefault();

                    $scope.log('Color Picker: HUE - MOUSE UP');
                    $scope.hueMouse = false;
                };

                $scope.hueChange = function (event) {
                    event.stopPropagation();
                    event.preventDefault();

                    $scope.log('Color Picker: HUE - MOUSE CHANGE');
                    var el = $scope.find('.color-picker-hue');
                    $scope.hue = (1 - ((event.pageY - $scope.offset(el).top) / el.prop('offsetHeight'))) * 360;

                    if ($scope.hue > 360) {
                        $scope.hue = 360;
                    } else if ($scope.hue < 0) {
                        $scope.hue = 0;
                    }
                };

                $scope.hueUpdate = function() {
                    if ($scope.hue !== undefined) {
                        $scope.log('Color Picker: HUE - CHANGED');
                        $scope.huePos = (1 - ($scope.hue / 360)) * 100;
                        $scope.grid = tinycolor({h: $scope.hue, s: 100, v: 1}).toHslString();

                        if ($scope.huePos < 0) {
                            $scope.huePos = 0;
                        } else if ($scope.huePos > 100) {
                            $scope.huePos = 100;
                        }

                        $scope.update();
                    }
                };

                $scope.$watch('hue', function (newValue, oldValue) {
                    $scope.hueUpdate();
                });

                //---------------------------
                // OPACITY
                //---------------------------
                $scope.opacityDown = function (event) {
                    event.stopPropagation();
                    event.preventDefault();

                    $scope.log('Color Picker: OPACITY - MOUSE DOWN');
                    $scope.opacityMouse = true;
                };

                $scope.opacityUp = function (event) {
                    event.stopPropagation();
                    event.preventDefault();

                    $scope.log('Color Picker: OPACITY - MOUSE UP');
                    $scope.opacityMouse = false;
                };

                $scope.opacityChange = function (event) {
                    event.stopPropagation();
                    event.preventDefault();

                    $scope.log('Color Picker: OPACITY - MOUSE CHANGE');
                    var el = $scope.find('.color-picker-opacity');
                    $scope.opacity = (1 - ((event.pageY - $scope.offset(el).top) / el.prop('offsetHeight'))) * 100;

                    if ($scope.opacity > 100) {
                        $scope.opacity = 100;
                    } else if ($scope.opacity < 0) {
                        $scope.opacity = 0;
                    }
                };

                $scope.opacityUpdate = function() {
                    if ($scope.opacity !== undefined) {
                        $scope.log('Color Picker: OPACITY - CHANGED');
                        $scope.opacityPos = (1 - ($scope.opacity / 100)) * 100;

                        if ($scope.opacityPos < 0) {
                            $scope.opacityPos = 0;
                        } else if ($scope.opacityPos > 100) {
                            $scope.opacityPos = 100;
                        }

                        $scope.update();
                    }
                };

                $scope.$watch('opacity', function (newValue, oldValue) {
                    $scope.opacityUpdate();
                });

                //---------------------------
                // COLOR
                //---------------------------
                $scope.colorDown = function (event) {
                    event.stopPropagation();
                    event.preventDefault();

                    $scope.log('Color Picker: COLOR - MOUSE DOWN');
                    $scope.colorMouse = true;
                };

                $scope.colorUp = function (event) {
                    event.stopPropagation();
                    event.preventDefault();

                    $scope.log('Color Picker: COLOR - MOUSE UP');
                    $scope.colorMouse = false;
                };

                $scope.colorChange = function (event) {
                    event.stopPropagation();
                    event.preventDefault();

                    $scope.log('Color Picker: COLOR - MOUSE CHANGE');
                    var el = $scope.find('.color-picker-grid-inner');
                    var offset = $scope.offset(el);

                    $scope.saturation = ((event.pageX - offset.left) / el.prop('offsetWidth')) * 100;
                    $scope.lightness = (1 - ((event.pageY - offset.top) / el.prop('offsetHeight'))) * 100;

                    if ($scope.saturation > 100) {
                        $scope.saturation = 100;
                    } else if ($scope.saturation < 0) {
                        $scope.saturation = 0;
                    }

                    if ($scope.lightness > 100) {
                        $scope.lightness = 100;
                    } else if ($scope.lightness < 0) {
                        $scope.lightness = 0;
                    }
                };

                $scope.saturationUpdate = function(oldValue) {
                    if ($scope.saturation !== undefined && $scope.saturation !== oldValue) {
                        $scope.log('Color Picker: SATURATION - CHANGED');
                        $scope.saturationPos = ($scope.saturation / 100) * 100;

                        if ($scope.saturationPos < 0) {
                            $scope.saturationPos = 0;
                        } else if ($scope.saturationPos > 100) {
                            $scope.saturationPos = 100;
                        }

                        $scope.update();
                    }
                };

                $scope.$watch('saturation', function (newValue, oldValue) {
                    $scope.saturationUpdate(oldValue);
                });

                $scope.lightnessUpdate = function(oldValue) {
                    if ($scope.lightness !== undefined && $scope.lightness !== oldValue) {
                        $scope.log('Color Picker: LIGHTNESS - CHANGED');
                        $scope.lightnessPos = (1 - ($scope.lightness / 100)) * 100;

                        if ($scope.lightnessPos < 0) {
                            $scope.lightnessPos = 0;
                        } else if ($scope.lightnessPos > 100) {
                            $scope.lightnessPos = 100;
                        }

                        $scope.update();
                    }
                };

                $scope.$watch('lightness', function (newValue, oldValue) {
                    $scope.lightnessUpdate(oldValue);
                });


                //---------------------------
                // HELPER FUNCTIONS
                //---------------------------
                $scope.log = function () {
                    // console.log.apply(console, arguments);
                };

                // taken and modified from jQuery's find
                $scope.find = function (selector) {
                    var context = $scope.wrapper ? $scope.wrapper[0] : element[0],
                        results = [],
                        nodeType;


                    // Same basic safeguard as Sizzle
                    if (!selector) {
                        return results;
                    }

                    if (typeof selector === 'string') {
                        // Early return if context is not an element or document
                        if ((nodeType = context.nodeType) !== 1 && nodeType !== 9) {
                            return [];
                        }

                        results = context.querySelectorAll(selector);

                    } else {
                        if (context.contains(selector)) {
                            results.push(selector);
                        }
                    }

                    return angular.element(results);
                };

                // taken and modified from jQuery's offset
                $scope.offset = function (el) {
            		var docElem, win, rect, doc, elem = el[0];

            		if (!elem) {
            			return;
            		}

            		// Support: IE<=11+
            		// Running getBoundingClientRect on a
            		// disconnected node in IE throws an error
            		if (!elem.getClientRects().length) {
            			return {top: 0, left: 0};
            		}

            		rect = elem.getBoundingClientRect();

            		// Make sure element is not hidden (display: none)
            		if ( rect.width || rect.height ) {
            			doc = elem.ownerDocument;
            			win = doc !== null && doc === doc.window ? doc : doc.nodeType === 9 && doc.defaultView;
            			docElem = doc.documentElement;

                        // hack for small chrome screens not position the clicks properly when the page is scrolled
                        if (window.chrome && screen.width <= 768) {
                            return {
                				top: rect.top - docElem.clientTop,
                				left: rect.left - docElem.clientLeft
                			};
                        }

            			return {
            				top: rect.top + win.pageYOffset - docElem.clientTop,
            				left: rect.left + win.pageXOffset - docElem.clientLeft
            			};
            		}


            		return rect;
                };


                $scope.init();

                $scope.$on('$destroy', function() {
                    $document.off('mousedown', $scope.onMouseDown);
                    $document.off('mouseup', $scope.onMouseUp);
                    $document.off('mousemove', $scope.onMouseMove);
                });
            }
        };
    };

    colorPicker.$inject = ['$document'];

    angular.module('color.picker').directive('colorPicker', colorPicker);
})();

angular.module('color.picker').run(['$templateCache', function($templateCache) {
    $templateCache.put('template/color-picker/directive.html',
        '<div class="color-picker-wrapper" ng-class="{\'color-picker-swatch-only\': config.swatchOnly}">\n' +
        '   <div ng-class="{\'input-group\': config.swatchBootstrap && config.swatch}">\n' +
        '       <span ng-if="config.swatchPos === \'left\'" ng-attr-style="background-color: {{swatchColor}};" class="color-picker-swatch" ng-click="focus()" ng-show="config.swatch" ng-class="{\'color-picker-swatch-left\': config.swatchPos !== \'right\', \'color-picker-swatch-right\': config.swatchPos === \'right\', \'input-group-addon\': config.swatchBootstrap}"></span>\n' +
        '       <input class="color-picker-input form-control" type="text" ng-model="ngModel" ng-change="onChange($event)" size="7" ng-focus="show()" ng-class="{\'color-picker-input-swatch\': config.swatch && !config.swatchOnly && config.swatchPos === \'left\'}">\n' +
        '       <span ng-if="config.swatchPos === \'right\'" ng-attr-style="background-color: {{swatchColor}};" class="color-picker-swatch" ng-click="focus()" ng-show="config.swatch" ng-class="{\'color-picker-swatch-left\': config.swatchPos !== \'right\', \'color-picker-swatch-right\': config.swatchPos === \'right\', \'input-group-addon\': config.swatchBootstrap}"></span>\n' +
        '   </div>\n' +
        '   <div class="color-picker-panel" ng-show="visible" ng-class="{\n' +
        '       \'color-picker-panel-top color-picker-panel-right\': config.pos === \'top right\',\n' +
        '       \'color-picker-panel-top color-picker-panel-left\': config.pos === \'top left\',\n' +
        '       \'color-picker-panel-bottom color-picker-panel-right\': config.pos === \'bottom right\',\n' +
        '       \'color-picker-panel-bottom color-picker-panel-left\': config.pos === \'bottom left\',\n' +
        '   }">\n' +
        '       <div class="color-picker-hue color-picker-sprite">\n' +
        '           <div class="color-picker-slider" ng-attr-style="top: {{huePos}}%;"></div>\n' +
        '       </div>\n' +
        '       <div class="color-picker-opacity color-picker-sprite" ng-show="config.alpha">\n' +
        '           <div class="color-picker-slider" ng-attr-style="top: {{opacityPos}}%;"></div>\n' +
        '           </div>\n' +
        '       <div class="color-picker-grid color-picker-sprite" ng-attr-style="background-color: {{grid}};">\n' +
        '           <div class="color-picker-grid-inner"></div>\n' +
        '           <div class="color-picker-picker" ng-attr-style="top: {{lightnessPos}}%; left: {{saturationPos}}%;">\n' +
        '               <div></div>\n' +
        '           </div>\n' +
        '       </div>\n' +
        '   </div>\n' +
        '</div>'
    );

}]);
