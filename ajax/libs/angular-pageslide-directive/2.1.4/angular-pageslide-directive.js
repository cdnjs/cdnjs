
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['angular'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require('angular'));
    } else {
        factory(root.angular);
    }
}(this, function (angular) {

    angular
        .module('pageslide-directive', [])
        .directive('pageslide', ['$document', '$timeout', function ($document, $timeout) {
            var defaults = {};


            return {
                restrict: 'EA',
                transclude: false,
                scope: {
                    psOpen: '=?',
                    psAutoClose: '@',
                    psSide: '@',
                    psSpeed: '@',
                    psClass: '@',
                    psSize: '@',
                    psZindex: '@',
                    psPush: '@',
                    psContainer: '@',
                    psKeyListener: '@',
                    psBodyClass: '@',
                    psClickOutside: '@',
                    onopen: '&?',
                    onclose: '&?'
                },
                link: function (scope, el, attrs) {

                    var param = {};

                    param.side = scope.psSide || 'right';
                    param.speed = scope.psSpeed || '0.5';
                    param.size = scope.psSize || '300px';
                    param.zindex = scope.psZindex || 1000;
                    param.className = scope.psClass || 'ng-pageslide';
                    param.push = scope.psPush === 'true';
                    param.container = scope.psContainer || false;
                    param.keyListener = scope.psKeyListener === 'true';
                    param.bodyClass = scope.psBodyClass || false;
                    param.clickOutside = scope.psClickOutside !== 'false';
                    param.autoClose = scope.psAutoClose || false;

                    param.push = param.push && !param.container;

                    el.addClass(param.className);

                    /* DOM manipulation */

                    var content, slider, body, isOpen = false;

                    if (param.container) {
                        body = document.getElementById(param.container);
                    } else {
                        body = document.body;
                    }

                    function onBodyClick(e) {
                        var target = e.touches && e.touches[0] || e.target;
                        if(
                            isOpen &&
                            body.contains(target) &&
                            !slider.contains(target)
                        ) {
                            isOpen = false;
                            scope.psOpen = false;
                            scope.$apply();
                        }

                        if(scope.psOpen) {
                            isOpen = true;
                        }
                    }

                    function setBodyClass(value){
                        if (param.bodyClass) {
                            var bodyClass = param.className + '-body';
                            var bodyClassRe = new RegExp(bodyClass + '-closed|' + bodyClass + '-open');
                            body.className = body.className.replace(bodyClassRe, '');
                            var newBodyClassName = bodyClass + '-' + value;
                            if (body.className[body.className.length -1] !== ' ') {
                                body.className += ' ' + newBodyClassName;
                            } else {
                                body.className += newBodyClassName;
                            }
                        }
                    }

                    setBodyClass('closed');

                    slider = el[0];

                    if (slider.tagName.toLowerCase() !== 'div' &&
                        slider.tagName.toLowerCase() !== 'pageslide') {
                        throw new Error('Pageslide can only be applied to <div> or <pageslide> elements');
                    }

                    if (slider.children.length === 0) {
                        throw new Error('You need to have content inside the <pageslide>');
                    }

                    content = angular.element(slider.children);

                    body.appendChild(slider);

                    slider.style.zIndex = param.zindex;
                    slider.style.position = 'fixed';
                    slider.style.transitionDuration = param.speed + 's';
                    slider.style.webkitTransitionDuration = param.speed + 's';
                    slider.style.height = param.size;
                    slider.style.transitionProperty = 'top, bottom, left, right';

                    if (param.push) {
                        body.style.position = 'absolute';
                        body.style.transitionDuration = param.speed + 's';
                        body.style.webkitTransitionDuration = param.speed + 's';
                        body.style.transitionProperty = 'top, bottom, left, right';
                    }

                    if (param.container) {
                        slider.style.position = 'absolute';
                        body.style.position = 'relative';
                        body.style.overflow = 'hidden';
                    }

                    function onTransitionEnd() {
                        if (scope.psOpen) {
                            if (typeof scope.onopen === 'function') {
                                scope.onopen()();
                            }
                        } else {
                            if (typeof scope.onclose === 'function') {
                                scope.onclose()();
                            }
                        }
                    }

                    slider.addEventListener('transitionend', onTransitionEnd);

                    initSlider();

                    function initSlider() {
                        switch (param.side) {
                            case 'right':
                                slider.style.width = param.size;
                                slider.style.height = '100%';
                                slider.style.top = '0px';
                                slider.style.bottom = '0px';
                                slider.style.right = '0px';
                                break;
                            case 'left':
                                slider.style.width = param.size;
                                slider.style.height = '100%';
                                slider.style.top = '0px';
                                slider.style.bottom = '0px';
                                slider.style.left = '0px';
                                break;
                            case 'top':
                                slider.style.height = param.size;
                                slider.style.width = '100%';
                                slider.style.left = '0px';
                                slider.style.top = '0px';
                                slider.style.right = '0px';
                                break;
                            case 'bottom':
                                slider.style.height = param.size;
                                slider.style.width = '100%';
                                slider.style.bottom = '0px';
                                slider.style.left = '0px';
                                slider.style.right = '0px';
                                break;
                        }
                    }

                    function psClose(slider, param) {
                        switch (param.side) {
                            case 'right':
                                slider.style.right = "-" + param.size;
                                if (param.push) {
                                    body.style.right = '0px';
                                    body.style.left = '0px';
                                }
                                break;
                            case 'left':
                                slider.style.left = "-" + param.size;
                                if (param.push) {
                                    body.style.left = '0px';
                                    body.style.right = '0px';
                                }
                                break;
                            case 'top':
                                slider.style.top = "-" + param.size;
                                if (param.push) {
                                    body.style.top = '0px';
                                    body.style.bottom = '0px';
                                }
                                break;
                            case 'bottom':
                                slider.style.bottom = "-" + param.size;
                                if (param.push) {
                                    body.style.bottom = '0px';
                                    body.style.top = '0px';
                                }
                                break;
                        }

                        if (param.keyListener) {
                            $document.off('keydown', handleKeyDown);
                        }

                        if (param.clickOutside) {
                            $document.off('touchend click', onBodyClick);
                        }
                        isOpen = false;
                        setBodyClass('closed');
                        scope.psOpen = false;
                    }

                    function psOpen(slider, param) {
                        switch (param.side) {
                            case 'right':
                                slider.style.right = "0px";
                                if (param.push) {
                                    body.style.right = param.size;
                                    body.style.left = '-' + param.size;
                                }
                                break;
                            case 'left':
                                slider.style.left = "0px";
                                if (param.push) {
                                    body.style.left = param.size;
                                    body.style.right = '-' + param.size;
                                }
                                break;
                            case 'top':
                                slider.style.top = "0px";
                                if (param.push) {
                                    body.style.top = param.size;
                                    body.style.bottom = '-' + param.size;
                                }
                                break;
                            case 'bottom':
                                slider.style.bottom = "0px";
                                if (param.push) {
                                    body.style.bottom = param.size;
                                    body.style.top = '-' + param.size;
                                }
                                break;
                        }

                        scope.psOpen = true;

                        if (param.keyListener) {
                            $document.on('keydown', handleKeyDown);
                        }

                        if (param.clickOutside) {
                            $document.on('touchend click', onBodyClick);
                        }
                        setBodyClass('open');
                    }

                    function handleKeyDown(e) {
                        var ESC_KEY = 27;
                        var key = e.keyCode || e.which;

                        if (key === ESC_KEY) {
                            psClose(slider, param);

                            // FIXME check with tests
                            // http://stackoverflow.com/questions/12729122/angularjs-prevent-error-digest-already-in-progress-when-calling-scope-apply

                            $timeout(function () {
                                scope.$apply();
                            });
                        }
                    }


                    // Watchers

                    scope.$watch('psOpen', function(value) {
                        if (!!value) {
                            psOpen(slider, param);
                        } else {
                            psClose(slider, param);
                        }
                    });

                    scope.$watch('psSize', function(newValue, oldValue) {
                        if (oldValue !== newValue) {
                            param.size = newValue;
                            initSlider();
                        }
                    });


                    // Events

                    scope.$on('$destroy', function () {
                        if (slider.parentNode === body) {
                            if (param.clickOutside) {
                                $document.off('touchend click', onBodyClick);
                            }
                            body.removeChild(slider);
                        }

                        slider.removeEventListener('transitionend', onTransitionEnd);
                    });

                    if (param.autoClose) {
                        scope.$on('$locationChangeStart', function() {
                            psClose(slider, param);
                        });
                        scope.$on('$stateChangeStart', function() {
                            psClose(slider, param);
                        });
                    }

                }
            };
        }]);
}));
