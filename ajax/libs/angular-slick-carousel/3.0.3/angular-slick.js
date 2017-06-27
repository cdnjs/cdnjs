/*!
 * angular-slick-carousel
 * DevMark <hc.devmark@gmail.com>,Karan Batra-Daitch <karanganesha04@gmail.com>
 * https://github.com/devmark/angular-slick-carousel
 * Version: 3.0.2 - 2015-07-28T10:11:27.057Z
 * License: MIT
 */


'use strict';


angular
    .module('slickCarousel', [])
    //global config
    .constant('slickCarouselConfig', {
        autoplay: true,
        dots: true,
        autoplaySpeed: 3000,
        lazyLoad: 'ondemand',
        method: {},
        event: {}
    })
    .directive('slick', [
        '$timeout', 'slickCarouselConfig', '$compile', function ($timeout, slickCarouselConfig, $compile) {
            var slickOptionList, slickMethodList, slickEventList;
            slickOptionList = ['accessibility', 'adaptiveHeight', 'autoplay', 'autoplaySpeed', 'asNavFor', 'appendArrows', 'prevArrow', 'nextArrow', 'centerMode', 'centerPadding', 'cssEase', 'customPaging', 'dots', 'draggable', 'fade', 'focusOnSelect', 'edgeFriction', 'infinite', 'initialSlide', 'lazyLoad', 'mobileFirst', 'pauseOnHover', 'pauseOnDotsHover', 'respondTo', 'rows', 'slide', 'slidesPerRow', 'slidesToShow', 'slidesToScroll', 'speed', 'swipe', 'swipeToSlide', 'touchMove', 'touchThreshold', 'useCSS', 'variableWidth', 'vertical', 'verticalSwiping', 'rtl'];
            slickMethodList = ['slickGoTo', 'slickNext', 'slickPrev', 'slickPause', 'slickPlay', 'slickAdd', 'slickRemove', 'slickFilter', 'slickUnfilter', 'unslick'];
            slickEventList = ['afterChange', 'beforeChange', 'breakpoint', 'destroy', 'edge', 'init', 'reInit', 'setPosition', 'swipe'];

            return {
                scope: {
                    settings: '=',
                    data: '='
                },
                restrict: 'AE',
                link: function (scope, element, attr) {
                    var options, initOptions, destroy, init, destroyAndInit;

                    initOptions = function () {
                        options = angular.extend(angular.copy(slickCarouselConfig), scope.settings);
                        angular.forEach(attr, function (value, key) {
                            if (slickOptionList.indexOf(key) !== -1) {
                                options[key] = scope.$eval(value);
                            }
                        });
                    };

                    destroy = function () {
                        //remove current slides
                        var slickness = element.slick('getSlick');
                        for (var i = 0; i < slickness.slideCount; i++) {
                            element.slick('slickRemove', i);
                        }
                        slickness = element.slick('unslick');
                        return slickness;
                    };

                    init = function () {
                        return $timeout(function () {
                            initOptions();
                            var slickness;

                            if (angular.element(element).hasClass('slick-initialized')) {
                                slickness = element.slick('getSlick');
                            } else {
                                slickness = element.slick(options);
                            }

                            scope.internalControl = options.method || {};

                            // Method
                            slickMethodList.forEach(function (value) {
                                scope.internalControl[value] = function () {
                                    var args;
                                    args = Array.prototype.slice.call(arguments);
                                    args.unshift(value);
                                    slickness.slick.apply(element, args);
                                };
                            });

                            // Event
                            slickness.on('afterChange', function (event, slick, currentSlide, nextSlide) {
                                if (typeof options.event.afterChange !== 'undefined') {
                                    options.event.afterChange(event, slick, currentSlide, nextSlide);
                                }
                            });

                            if (typeof options.event.beforeChange !== 'undefined') {
                                slickness.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
                                    options.event.beforeChange(event, slick, currentSlide, nextSlide);
                                });
                            }
                            if (typeof options.event.breakpoint !== 'undefined') {
                                slickness.on('breakpoint', function (event, slick, breakpoint) {
                                    options.event.breakpoint(event, slick, breakpoint);
                                });
                            }
                            if (typeof options.event.destroy !== 'undefined') {
                                slickness.on('destroy', function (event, slick) {
                                    options.event.destroy(event, slick);
                                });
                            }
                            if (typeof options.event.edge !== 'undefined') {
                                slickness.on('edge', function (event, slick, direction) {
                                    options.event.edge(event, slick, direction);
                                });
                            }

                            slickness.on('init', function (event, slick) {
                                if (typeof options.event.init !== 'undefined') {
                                    options.event.init(event, slick);
                                }
                            });

                            if (typeof options.event.reInit !== 'undefined') {
                                slickness.on('reInit', function (event, slick) {
                                    options.event.reInit(event, slick);
                                });
                            }
                            if (typeof options.event.setPosition !== 'undefined') {
                                slickness.on('setPosition', function (event, slick) {
                                    options.event.setPosition(event, slick);
                                });
                            }
                            if (typeof options.event.swipe !== 'undefined') {
                                slickness.on('swipe', function (event, slick, direction) {
                                    options.event.swipe(event, slick, direction);
                                });
                            }
                        });
                    };

                    destroyAndInit = function () {
                        if (angular.element(element).hasClass('slick-initialized')) {
                            destroy();
                        }

                        return $timeout(function () {
                            return init();
                        }, 1);
                    };

                    scope.$watch('settings', function (newVal, oldVal) {
                        if (newVal !== null) {
                            return destroyAndInit();
                        }
                    }, true);

                    return scope.$watch('data', function (newVal, oldVal) {
                        if (newVal.length > oldVal.length && !angular.equals(newVal, oldVal)) {
                            destroyAndInit();
                        }
                    }, true);

                }
            };
        }
    ]);
