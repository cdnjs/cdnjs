'use strict';

AccordionController.$inject = ['$scope', '$attrs', 'accordionConfig'];
DropdownToggleController.$inject = ['$scope', '$attrs', 'mediaQueries', '$element', '$position', '$timeout'];
dropdownToggle.$inject = ['$document', '$window', '$location'];
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

/*
 * angular-foundation-6
 * http://circlingthesun.github.io/angular-foundation-6/

 * Version: 0.10.3 - 2016-07-28
 * License: MIT
 * (c) 
 */

function AccordionController($scope, $attrs, accordionConfig) {
    'ngInject';

    var $ctrl = this;
    // This array keeps track of the accordion groups
    $ctrl.groups = [];

    // Ensure that all the groups in this accordion are closed, unless close-others explicitly says not to
    $ctrl.closeOthers = function (openGroup) {
        var closeOthers = angular.isDefined($attrs.closeOthers) ? $scope.$eval($attrs.closeOthers) : accordionConfig.closeOthers;
        if (closeOthers) {
            angular.forEach(this.groups, function (group) {
                if (group !== openGroup) {
                    group.isOpen = false;
                }
            });
        }
    };

    // This is called from the accordion-group directive to add itself to the accordion
    $ctrl.addGroup = function (groupScope) {
        var that = this;
        this.groups.push(groupScope);
    };

    // This is called from the accordion-group directive when to remove itself
    $ctrl.removeGroup = function (group) {
        var index = this.groups.indexOf(group);
        if (index !== -1) {
            this.groups.splice(index, 1);
        }
    };
}

angular.module('mm.foundation.accordion', []).constant('accordionConfig', {
    closeOthers: true
}).controller('AccordionController', AccordionController)

// The accordion directive simply sets up the directive controller
// and adds an accordion CSS class to itself element.
.directive('accordion', function () {
    'ngInject';

    return {
        restrict: 'EA',
        controller: AccordionController,
        controllerAs: '$ctrl',
        transclude: true,
        replace: false,
        templateUrl: 'template/accordion/accordion.html'
    };
})

// The accordion-group directive indicates a block of html that will expand and collapse in an accordion
.directive('accordionGroup', function () {
    'ngInject';

    return {
        require: { 'accordion': '^accordion' }, // We need this directive to be inside an accordion
        restrict: 'EA',
        transclude: true, // It transcludes the contents of the directive into the template
        replace: true, // The element containing the directive will be replaced with the template
        templateUrl: 'template/accordion/accordion-group.html',
        scope: {},
        controllerAs: "$ctrl",
        bindToController: {
            heading: '@'
        }, // Create an isolated scope and interpolate the heading attribute onto this scope
        controller: ['$scope', '$attrs', '$parse', function accordionGroupController($scope, $attrs, $parse) {
            'ngInject';

            var $ctrl = this;
            $ctrl.isOpen = false;

            $ctrl.setHTMLHeading = function (element) {
                $ctrl.HTMLHeading = element;
            };

            $ctrl.$onInit = function () {
                $ctrl.accordion.addGroup($ctrl);

                $scope.$on('$destroy', function (event) {
                    $ctrl.accordion.removeGroup($ctrl);
                });

                var getIsOpen;
                var setIsOpen;

                if ($attrs.isOpen) {
                    getIsOpen = $parse($attrs.isOpen);
                    setIsOpen = getIsOpen.assign;

                    $scope.$parent.$watch(getIsOpen, function (value) {
                        $ctrl.isOpen = !!value;
                    });
                }

                $scope.$watch(function () {
                    return $ctrl.isOpen;
                }, function (value) {
                    if (value) {
                        $ctrl.accordion.closeOthers($ctrl);
                    }
                    setIsOpen && setIsOpen($scope.$parent, value);
                });
            };
        }]
    };
})

// Use accordion-heading below an accordion-group to provide a heading containing HTML
// <accordion-group>
//   <accordion-heading>Heading containing HTML - <img src="..."></accordion-heading>
// </accordion-group>
.directive('accordionHeading', function () {
    'ngInject';

    return {
        restrict: 'EA',
        transclude: true, // Grab the contents to be used as the heading
        template: '', // In effect remove this element!
        replace: true,
        require: '^accordionGroup',
        link: function link(scope, element, attr, accordionGroupCtrl, transclude) {
            // Pass the heading to the accordion-group controller
            // so that it can be transcluded into the right place in the template
            // [The second parameter to transclude causes the elements to be cloned so that they work in ng-repeat]
            accordionGroupCtrl.setHTMLHeading(transclude(scope, function () {}));
        }
    };
})

// Use in the accordion-group template to indicate where you want the heading to be transcluded
// You must provide the property on the accordion-group controller that will hold the transcluded element
// <div class="accordion-group">
//   <div class="accordion-heading" ><a ... accordion-transclude="heading">...</a></div>
//   ...
// </div>
.directive('accordionTransclude', function () {
    'ngInject';

    return {
        require: '^accordionGroup',
        link: function link(scope, element, attr, accordionGroupController) {
            scope.$watch(function () {
                return accordionGroupController.HTMLHeading;
            }, function (heading) {
                if (heading) {
                    element.html('');
                    element.append(heading);
                }
            });
        }
    };
});

(function () {
    angular.module("mm.foundation.accordion").run(["$templateCache", function ($templateCache) {
        $templateCache.put("template/accordion/accordion-group.html", "<li class=\"accordion-item\" ng-class=\"{ \'is-active\': $ctrl.isOpen }\">\n  <a ng-click=\"$ctrl.isOpen = !$ctrl.isOpen\" class=\"accordion-title\" accordion-transclude>{{$ctrl.heading}}</a>\n  <div class=\"accordion-content\" ng-style=\"{display: $ctrl.isOpen ? \'block\' : \'none\'}\" ng-transclude></div>\n</li>\n");
        $templateCache.put("template/accordion/accordion.html", "<ul class=\"accordion\" ng-transclude></ul>\n");
    }]);
})();
angular.module("mm.foundation.alert", []).controller('AlertController', ['$scope', '$attrs', function ($scope, $attrs) {
    'ngInject';

    $scope.closeable = 'close' in $attrs && typeof $attrs.close !== "undefined";
}]).directive('alert', function () {
    'ngInject';

    return {
        restrict: 'EA',
        controller: 'AlertController',
        templateUrl: 'template/alert/alert.html',
        transclude: true,
        replace: true,
        scope: {
            type: '=',
            close: '&'
        }
    };
});

(function () {
    angular.module("mm.foundation.alert").run(["$templateCache", function ($templateCache) {
        $templateCache.put("template/alert/alert.html", "<div class=\"callout\" ng-class=\'(type || \"\")\'>\n  <span ng-transclude></span>\n  <button ng-click=\"close()\" ng-show=\"closeable\" class=\"close-button\" aria-label=\"Close alert\" type=\"button\">\n      <span aria-hidden=\"true\">&times;</span>\n  </button>\n</div>\n");
    }]);
})();
angular.module('mm.foundation.bindHtml', []).directive('bindHtmlUnsafe', function () {
    'ngInject';

    return function (scope, element, attr) {
        element.addClass('ng-binding').data('$binding', attr.bindHtmlUnsafe);
        scope.$watch(attr.bindHtmlUnsafe, function bindHtmlUnsafeWatchAction(value) {
            element.html(value || '');
        });
    };
});

angular.module('mm.foundation.buttons', []).constant('buttonConfig', {
    activeClass: 'hollow',
    toggleEvent: 'click'
}).controller('ButtonsController', ['buttonConfig', function (buttonConfig) {
    this.activeClass = buttonConfig.activeClass;
    this.toggleEvent = buttonConfig.toggleEvent;
}]).directive('btnRadio', function () {
    'ngInject';

    return {
        require: ['btnRadio', 'ngModel'],
        controller: 'ButtonsController',
        link: function link(scope, element, attrs, ctrls) {
            var buttonsCtrl = ctrls[0],
                ngModelCtrl = ctrls[1];

            //model -> UI
            ngModelCtrl.$render = function () {
                element.toggleClass(buttonsCtrl.activeClass, angular.equals(ngModelCtrl.$modelValue, scope.$eval(attrs.btnRadio)));
            };

            //ui->model
            element.bind(buttonsCtrl.toggleEvent, function () {
                if (!element.hasClass(buttonsCtrl.activeClass)) {
                    scope.$apply(function () {
                        ngModelCtrl.$setViewValue(scope.$eval(attrs.btnRadio));
                        ngModelCtrl.$render();
                    });
                }
            });
        }
    };
}).directive('btnCheckbox', function () {
    'ngInject';

    return {
        require: ['btnCheckbox', 'ngModel'],
        controller: 'ButtonsController',
        link: function link(scope, element, attrs, ctrls) {
            var buttonsCtrl = ctrls[0],
                ngModelCtrl = ctrls[1];

            function getTrueValue() {
                return getCheckboxValue(attrs.btnCheckboxTrue, true);
            }

            function getFalseValue() {
                return getCheckboxValue(attrs.btnCheckboxFalse, false);
            }

            function getCheckboxValue(attributeValue, defaultValue) {
                var val = scope.$eval(attributeValue);
                return angular.isDefined(val) ? val : defaultValue;
            }

            //model -> UI
            ngModelCtrl.$render = function () {
                element.toggleClass(buttonsCtrl.activeClass, angular.equals(ngModelCtrl.$modelValue, getTrueValue()));
            };

            //ui->model
            element.bind(buttonsCtrl.toggleEvent, function () {
                scope.$apply(function () {
                    ngModelCtrl.$setViewValue(element.hasClass(buttonsCtrl.activeClass) ? getFalseValue() : getTrueValue());
                    ngModelCtrl.$render();
                });
            });
        }
    };
});

angular.module('mm.foundation.dropdownMenu', []).directive('dropdownMenu', ['$compile', function ($compile) {
    'ngInject';

    return {
        bindToController: {
            disableHover: '=',
            disableClickOpen: '=',
            closingTime: '='
        },
        scope: {},
        restrict: 'A',
        controllerAs: 'vm',
        controller: ['$scope', '$element', function controller($scope, $element) {
            'ngInject';

            var vm = this;
        }]
    };
}]).directive('li', ['$timeout', function ($timeout) {
    'ngInject';

    return {
        require: '?^^dropdownMenu',
        restrict: 'E',
        link: function link($scope, $element, $attrs, dropdownMenu) {
            if (!dropdownMenu) {
                return;
            }

            var ulChild = null;
            var children = $element[0].children;
            var mouseLeaveTimeout;

            for (var i = 0; i < children.length; i++) {
                var child = angular.element(children[i]);
                if (child[0].nodeName === 'UL' && child.hasClass('menu')) {
                    ulChild = child;
                }
            }

            var topLevel = $element.parent()[0].hasAttribute('dropdown-menu');
            if (!topLevel) {
                $element.addClass('is-submenu-item');
            }

            if (ulChild) {
                ulChild.addClass('is-dropdown-submenu menu submenu vertical');
                $element.addClass('is-dropdown-submenu-parent opens-right');

                if (topLevel) {
                    ulChild.addClass('first-sub');
                }

                if (!dropdownMenu.disableHover) {
                    $element.on('mouseenter', function () {

                        $timeout.cancel(mouseLeaveTimeout);
                        $element.parent().children().children().removeClass('js-dropdown-active');
                        ulChild.addClass('js-dropdown-active');
                        $element.addClass('is-active');
                    });
                }

                $element.on('click', function () {
                    ulChild.addClass('js-dropdown-active');
                    $element.addClass('is-active');
                    // $element.attr('data-is-click', 'true');
                });

                $element.on('mouseleave', function () {
                    mouseLeaveTimeout = $timeout(function () {
                        ulChild.removeClass('js-dropdown-active');
                        $element.removeClass('is-active');
                    }, dropdownMenu.closingTime ? dropdownMenu.closingTime : 500);
                });
            }
        }
    };
}]);
function DropdownToggleController($scope, $attrs, mediaQueries, $element, $position, $timeout) {
    'ngInject';

    var $ctrl = this;
    var hoverTimeout;
    var $body = angular.element(document.querySelector('body'));

    function close(e) {
        $ctrl.active = false;
        $ctrl.css = {};

        if ($ctrl.closeOnClick) {
            $body.off('click', close);
        }

        $scope.$apply();
    }

    $ctrl.$onInit = function init() {
        if ($ctrl.closeOnClick) {
            $element.on('click', function (e) {
                return e.stopPropagation();
            });
        }
    };

    $ctrl.$onDestroy = function destroy() {
        if ($ctrl.closeOnClick) {
            $body.off('click', close);
        }
    };

    $ctrl.css = {};

    $ctrl.toggle = function () {
        $ctrl.active = !$ctrl.active;
        $ctrl.css = {};

        if (!$ctrl.active) {
            return;
        }

        positionPane(2);

        if ($ctrl.closeOnClick) {
            $body.on('click', close);
        }
    };

    $ctrl.mouseover = function () {
        $timeout.cancel(hoverTimeout);
        $ctrl.active = true;
        positionPane(1);
    };

    $ctrl.mouseleave = function () {
        $timeout.cancel(hoverTimeout);
        hoverTimeout = $timeout(function () {
            $scope.$apply(function () {
                $ctrl.active = false;
            });
        }, 250);
    };

    function positionPane(offset) {
        var dropdownTrigger = angular.element($element[0].querySelector('toggle *:first-child'));

        // var dropdownWidth = dropdown.prop('offsetWidth');
        var triggerPosition = $position.position(dropdownTrigger);

        $ctrl.css.top = triggerPosition.top + triggerPosition.height + offset + 'px';

        if ($ctrl.paneAlign === 'center') {
            $ctrl.css.left = triggerPosition.left + triggerPosition.width / 2 + 'px';
            $ctrl.css.transform = 'translateX(-50%)';
        } else if ($ctrl.paneAlign === 'right') {
            $ctrl.css.left = triggerPosition.left + triggerPosition.width + 'px';
            $ctrl.css.transform = 'translateX(-100%)';
        } else {
            $ctrl.css.left = triggerPosition.left + 'px';
        }
    }
}

function dropdownToggle($document, $window, $location) {
    'ngInject';

    return {
        scope: {},
        restrict: 'EA',
        bindToController: {
            closeOnClick: '=',
            paneAlign: '@',
            toggleOnHover: '='
        },
        transclude: {
            'toggle': 'toggle',
            'pane': 'pane'
        },
        templateUrl: 'template/dropdownToggle/dropdownToggle.html',
        controller: DropdownToggleController,
        controllerAs: '$ctrl'
    };
}

/*
 * dropdownToggle - Provides dropdown menu functionality
 * @restrict class or attribute
 * @example:

   <a dropdown-toggle="#dropdown-menu">My Dropdown Menu</a>
   <ul id="dropdown-menu" class="f-dropdown">
     <li ng-repeat="choice in dropChoices">
       <a ng-href="{{choice.href}}">{{choice.text}}</a>
     </li>
   </ul>
 */
angular.module('mm.foundation.dropdownToggle', ['mm.foundation.position', 'mm.foundation.mediaQueries']).directive('dropdownToggle', dropdownToggle);

(function () {
    angular.module("mm.foundation.dropdownToggle").run(["$templateCache", function ($templateCache) {
        $templateCache.put("template/dropdownToggle/dropdownToggle.html", "<span\n    ng-click=\"!$ctrl.toggleOnHover && $ctrl.toggle()\"\n    ng-mouseover=\"$ctrl.toggleOnHover && $ctrl.mouseover()\"\n    ng-mouseleave=\"$ctrl.toggleOnHover && $ctrl.mouseleave($event)\"\n    ng-transclude=\"toggle\">\n    Toggle Dropdown\n</span>\n<div\n    ng-transclude=\"pane\"\n    ng-style=\"$ctrl.css\"\n    ng-class=\"{\'is-open\': $ctrl.active}\"\n    ng-attr-aria-hidden=\"$ctrl.active\"\n    ng-mouseover=\"$ctrl.toggleOnHover && $ctrl.mouseover()\"\n    ng-mouseleave=\"$ctrl.toggleOnHover && $ctrl.mouseleave($event)\"\n    class=\"dropdown-pane{{$ctrl.paneAlign && \' dropdown-pane-\' + $ctrl.paneAlign}}\">\n  Just some junk that needs to be said. Or not. Your choice.\n</div>\n");
    }]);
})();
angular.module('mm.foundation.mediaQueries', []).factory('matchMedia', ['$document', '$window', function ($document, $window) {
    'ngInject';
    // MatchMedia for IE <= 9

    return $window.matchMedia || function (doc, undefined) {
        var bool = void 0;
        var docElem = doc.documentElement;
        var refNode = docElem.firstElementChild || docElem.firstChild;
        // fakeBody required for <FF4 when executed in <head>
        var fakeBody = doc.createElement('body');
        var div = doc.createElement('div');

        div.id = 'mq-test-1';
        div.style.cssText = 'position:absolute;top:-100em';
        fakeBody.style.background = 'none';
        fakeBody.appendChild(div);

        return function (q) {
            div.innerHTML = '&shy;<style media="' + q + '"> #mq-test-1 { width: 42px; }</style>';
            docElem.insertBefore(fakeBody, refNode);
            bool = div.offsetWidth === 42;
            docElem.removeChild(fakeBody);
            return {
                matches: bool,
                media: q
            };
        };
    }($document[0]);
}]).factory('mediaQueries', ['$document', 'matchMedia', function ($document, matchMedia) {
    'ngInject';

    // Thank you: https://github.com/sindresorhus/query-string

    function parseStyleToObject(str) {
        var styleObject = {};

        if (typeof str !== 'string') {
            return styleObject;
        }

        str = str.trim().slice(1, -1); // browsers re-quote string style values

        if (!str) {
            return styleObject;
        }

        styleObject = str.split('&').reduce(function (ret, param) {
            var parts = param.replace(/\+/g, ' ').split('=');
            var key = parts[0];
            var val = parts[1];
            key = decodeURIComponent(key);

            // missing `=` should be `null`:
            // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
            val = val === undefined ? null : decodeURIComponent(val);

            if (!ret.hasOwnProperty(key)) {
                ret[key] = val;
            } else if (Array.isArray(ret[key])) {
                ret[key].push(val);
            } else {
                ret[key] = [ret[key], val];
            }
            return ret;
        }, {});

        return styleObject;
    }

    var head = angular.element($document[0].querySelector('head'));
    head.append('<meta class="foundation-mq" />');
    var extractedStyles = getComputedStyle(head[0].querySelector('meta.foundation-mq')).fontFamily;
    var namedQueries = parseStyleToObject(extractedStyles);
    var queries = [];

    for (var key in namedQueries) {
        queries.push({
            name: key,
            value: 'only screen and (min-width: ' + namedQueries[key] + ')'
        });
    }

    // Gets the media query of a breakpoint.
    function get(size) {
        for (var i in this.queries) {
            var query = this.queries[i];
            if (size === query.name) return query.value;
        }

        return null;
    }

    function atLeast(size) {
        var query = get(size);

        if (query) {
            return window.matchMedia(query).matches;
        }
        return false;
    }

    // Gets the current breakpoint name by testing every breakpoint and returning the last one to match (the biggest one).
    function getCurrentSize() {
        var matched = void 0;

        for (var i = 0; i < queries.length; i++) {
            var query = queries[i];

            if (matchMedia(query.value).matches) {
                matched = query;
            }
        }

        if ((typeof matched === 'undefined' ? 'undefined' : _typeof(matched)) === 'object') {
            return matched.name;
        }
        return matched;
    }

    var iPhoneSniff = function iPhoneSniff() {
        return (/iP(ad|hone|od).*OS/.test(window.navigator.userAgent)
        );
    };
    var androidSniff = function androidSniff() {
        return (/Android/.test(window.navigator.userAgent)
        );
    };

    return {
        getCurrentSize: getCurrentSize,
        atLeast: atLeast,
        mobileSniff: function mobileSniff() {
            return iPhoneSniff() || androidSniff();
        }
    };
}]);

angular.module('mm.foundation.modal', ['mm.foundation.mediaQueries'])

/**
 * A helper, internal data structure that acts as a map but also allows getting / removing
 * elements in the LIFO order
 */
.factory('$$stackedMap', function () {
    'ngInject';

    return {
        createNew: function createNew() {
            var stack = [];

            return {
                add: function add(key, value) {
                    stack.push({
                        key: key,
                        value: value
                    });
                },
                get: function get(key) {
                    for (var i = 0; i < stack.length; i++) {
                        if (key === stack[i].key) {
                            return stack[i];
                        }
                    }
                },
                keys: function keys() {
                    var keys = [];
                    for (var i = 0; i < stack.length; i++) {
                        keys.push(stack[i].key);
                    }
                    return keys;
                },
                top: function top() {
                    return stack[stack.length - 1];
                },
                remove: function remove(key) {
                    var idx = -1;
                    for (var i = 0; i < stack.length; i++) {
                        if (key === stack[i].key) {
                            idx = i;
                            break;
                        }
                    }
                    return stack.splice(idx, 1)[0];
                },
                removeTop: function removeTop() {
                    return stack.splice(stack.length - 1, 1)[0];
                },
                length: function length() {
                    return stack.length;
                }
            };
        }
    };
})

/**
 * A helper directive for the $modal service. It creates a backdrop element.
 */
.directive('modalBackdrop', ['$modalStack', function ($modalStack) {
    'ngInject';

    return {
        restrict: 'EA',
        replace: true,
        templateUrl: 'template/modal/backdrop.html',
        link: function link(scope) {
            scope.close = function (evt) {
                var modal = $modalStack.getTop();
                if (modal && modal.value.closeOnClick && modal.value.backdrop && modal.value.backdrop !== 'static' && evt.target === evt.currentTarget) {
                    evt.preventDefault();
                    evt.stopPropagation();
                    $modalStack.dismiss(modal.key, 'backdrop click');
                }
            };
        }
    };
}]).directive('modalWindow', ['$modalStack', function ($modalStack) {
    'ngInject';

    return {
        restrict: 'EA',
        scope: {
            index: '@'
        },
        replace: true,
        transclude: true,
        templateUrl: 'template/modal/window.html',
        link: function link(scope, element, attrs) {
            scope.windowClass = attrs.windowClass || '';
            scope.isTop = function () {
                var top = $modalStack.getTop();
                return top ? top.value.modalScope && top.value.modalScope === scope.$parent : true;
            };
        }
    };
}]).factory('$modalStack', ['$window', '$timeout', '$document', '$compile', '$rootScope', '$$stackedMap', '$animate', '$q', 'mediaQueries', function ($window, $timeout, $document, $compile, $rootScope, $$stackedMap, $animate, $q, mediaQueries) {
    'ngInject';

    var isMobile = mediaQueries.mobileSniff();
    var OPENED_MODAL_CLASS = 'is-reveal-open';
    var originalScrollPos = null; // For mobile scroll hack
    var backdropDomEl = void 0;
    var backdropScope = void 0;
    var openedWindows = $$stackedMap.createNew();
    var $modalStack = {};

    function backdropIndex() {
        var topBackdropIndex = -1;
        var opened = openedWindows.keys();
        for (var i = 0; i < opened.length; i++) {
            if (openedWindows.get(opened[i]).value.backdrop) {
                topBackdropIndex = i;
            }
        }
        return topBackdropIndex;
    }

    $rootScope.$watch(backdropIndex, function (newBackdropIndex) {
        if (backdropScope) {
            backdropScope.index = newBackdropIndex;
        }
    });

    function resizeHandler() {
        var opened = openedWindows.keys();
        var fixedPositiong = opened.length > 0;
        var body = $document.find('body').eq(0);

        for (var i = 0; i < opened.length; i++) {
            var modalPos = $modalStack.reposition(opened[i]);
            if (modalPos && modalPos.position !== 'fixed') {
                fixedPositiong = false;
            }
        }
    }

    function removeModalWindow(modalInstance) {
        var modalWindow = openedWindows.get(modalInstance).value;

        // clean up the stack
        openedWindows.remove(modalInstance);

        // Remove backdrop
        if (backdropDomEl && backdropIndex() === -1) {
            (function () {
                var backdropScopeRef = backdropScope;

                $animate.leave(backdropDomEl).then(function () {
                    if (backdropScopeRef) {
                        backdropScopeRef.$destroy();
                    }
                    backdropScopeRef = null;
                });
                backdropDomEl = null;
                backdropScope = null;
            })();
        }

        // Remove modal
        if (openedWindows.length() === 0) {
            var body = $document.find('body').eq(0);
            body.removeClass(OPENED_MODAL_CLASS);

            if (isMobile) {
                var html = $document.find('html').eq(0);
                html.removeClass(OPENED_MODAL_CLASS);
                if (originalScrollPos) {
                    body[0].scrollTop = originalScrollPos;
                    originalScrollPos = null;
                }
            }
            angular.element($window).unbind('resize', resizeHandler);
        }

        // remove window DOM element
        $animate.leave(modalWindow.modalDomEl).then(function () {
            modalWindow.modalScope.$destroy();
        });
    }

    function getModalCenter(modalInstance) {
        var options = modalInstance.options;

        if (options.backdrop) {
            return { left: 0, position: 'relative' };
        }

        var el = options.modalDomEl;
        var body = $document.find('body').eq(0);

        var windowWidth = body.clientWidth || $document[0].documentElement.clientWidth;
        var windowHeight = body.clientHeight || $document[0].documentElement.clientHeight;

        var width = el[0].offsetWidth;
        var height = el[0].offsetHeight;

        var left = parseInt((windowWidth - width) / 2, 10);

        var top = 0;
        if (height < windowHeight) {
            top = parseInt((windowHeight - height) / 4, 10);
        }

        var modalPos = options.modalPos = options.modalPos || {};

        modalPos.left = left;
        modalPos.position = 'fixed';

        return modalPos;
    }

    $document.bind('keydown', function (evt) {
        var modal = void 0;

        if (evt.which === 27) {
            modal = openedWindows.top();
            if (modal && modal.value.keyboard) {
                $rootScope.$apply(function () {
                    $modalStack.dismiss(modal.key);
                });
            }
        }
    });

    $modalStack.open = function (modalInstance, options) {
        modalInstance.options = {
            deferred: options.deferred,
            modalScope: options.scope,
            backdrop: options.backdrop,
            keyboard: options.keyboard,
            closeOnClick: options.closeOnClick
        };
        openedWindows.add(modalInstance, modalInstance.options);

        var currBackdropIndex = backdropIndex();

        if (currBackdropIndex >= 0 && !backdropDomEl) {
            backdropScope = $rootScope.$new(true);
            backdropScope.index = currBackdropIndex;
            backdropDomEl = $compile('<div modal-backdrop></div>')(backdropScope);
        }

        if (openedWindows.length() === 1) {
            angular.element($window).on('resize', resizeHandler);
        }

        var classes = [];
        if (options.windowClass) {
            classes.push(options.windowClass);
        }

        if (options.size) {
            classes.push(options.size);
        }

        if (!options.backdrop) {
            classes.push('without-overlay');
        }

        var modalDomEl = angular.element('<div modal-window></div>').attr({
            style: '\n                visibility: visible;\n                z-index: -1;\n                display: block;\n            ',
            'window-class': classes.join(' '),
            index: openedWindows.length() - 1
        });

        modalDomEl.html(options.content);
        $compile(modalDomEl)(options.scope);
        openedWindows.top().value.modalDomEl = modalDomEl;

        return $timeout(function () {
            // let the directives kick in
            options.scope.$apply();

            // Attach, measure, remove
            var body = $document.find('body').eq(0);
            body.prepend(modalDomEl);
            var modalPos = getModalCenter(modalInstance, true);
            modalDomEl.detach();

            modalDomEl.attr({
                style: '\n                    visibility: visible;\n                    left: ' + modalPos.left + 'px;\n                    display: block;\n                    position: ' + modalPos.position + ';\n                '
            });

            var promises = [];

            if (backdropDomEl) {
                promises.push($animate.enter(backdropDomEl, body, body[0].lastChild));
            }

            var modalParent = backdropDomEl || body;

            promises.push($animate.enter(modalDomEl, modalParent, modalParent[0].lastChild));

            if (isMobile) {
                originalScrollPos = $window.pageYOffset;
                var html = $document.find('html').eq(0);
                html.addClass(OPENED_MODAL_CLASS);
            }

            body.addClass(OPENED_MODAL_CLASS);

            // Only for no backdrop modals
            if (!options.backdrop) {
                options.scope.$watch(function () {
                    return Math.floor(modalDomEl[0].offsetHeight / 10);
                }, resizeHandler);
            }

            return $q.all(promises).then(function () {
                var focusedElem = modalDomEl[0].querySelector('[autofocus]') || modalDomEl[0];
                var y = modalParent[0].scrollTop;
                focusedElem.focus();
                modalParent[0].scrollTop = y;
            });
        });
    };

    $modalStack.reposition = function (modalInstance) {
        var modalWindow = openedWindows.get(modalInstance).value;
        if (modalWindow) {
            var modalDomEl = modalWindow.modalDomEl;
            var modalPos = getModalCenter(modalInstance);
            modalDomEl.css('left', modalPos.left + 'px');
            modalDomEl.css('position', modalPos.position);
            return modalPos;
        }
        return {};
    };

    $modalStack.close = function (modalInstance, result) {
        var modalWindow = openedWindows.get(modalInstance);
        if (modalWindow) {
            modalWindow.value.deferred.resolve(result);
            removeModalWindow(modalInstance);
        }
    };

    $modalStack.dismiss = function (modalInstance, reason) {
        var modalWindow = openedWindows.get(modalInstance);
        if (modalWindow) {
            modalWindow.value.deferred.reject(reason);
            removeModalWindow(modalInstance);
        }
    };

    $modalStack.dismissAll = function (reason) {
        var topModal = $modalStack.getTop();
        while (topModal) {
            $modalStack.dismiss(topModal.key, reason);
            topModal = $modalStack.getTop();
        }
    };

    $modalStack.getTop = function () {
        return openedWindows.top();
    };

    return $modalStack;
}]).provider('$modal', function () {
    'ngInject';

    var $modalProvider = {
        options: {
            backdrop: true, // can be also false or 'static'
            keyboard: true,
            closeOnClick: true
        },
        $get: ['$injector', '$rootScope', '$q', '$http', '$templateCache', '$controller', '$modalStack', function $get($injector, $rootScope, $q, $http, $templateCache, $controller, $modalStack) {
            'ngInject';

            var $modal = {};

            function getTemplatePromise(options) {
                if (options.template) {
                    return $q.resolve(options.template);
                }
                return $http.get(options.templateUrl, {
                    cache: $templateCache
                }).then(function (result) {
                    return result.data;
                });
            }

            function getResolvePromises(resolves) {
                var promisesArr = [];
                angular.forEach(resolves, function (value) {
                    if (angular.isFunction(value) || angular.isArray(value)) {
                        promisesArr.push($q.resolve($injector.invoke(value)));
                    }
                });
                return promisesArr;
            }

            $modal.open = function (modalOpts) {
                var modalResultDeferred = $q.defer();
                var modalOpenedDeferred = $q.defer();

                // prepare an instance of a modal to be injected into controllers and returned to a caller
                var modalInstance = {
                    result: modalResultDeferred.promise,
                    opened: modalOpenedDeferred.promise,
                    close: function close(result) {
                        $modalStack.close(modalInstance, result);
                    },
                    dismiss: function dismiss(reason) {
                        $modalStack.dismiss(modalInstance, reason);
                    },
                    reposition: function reposition() {
                        $modalStack.reposition(modalInstance);
                    }
                };

                // merge and clean up options
                var modalOptions = angular.extend({}, $modalProvider.options, modalOpts);
                modalOptions.resolve = modalOptions.resolve || {};

                // verify options
                if (!modalOptions.template && !modalOptions.templateUrl) {
                    throw new Error('One of template or templateUrl options is required.');
                }

                var templateAndResolvePromise = $q.all([getTemplatePromise(modalOptions)].concat(getResolvePromises(modalOptions.resolve)));

                var openedPromise = templateAndResolvePromise.then(function (tplAndVars) {
                    var modalScope = (modalOptions.scope || $rootScope).$new();
                    modalScope.$close = modalInstance.close;
                    modalScope.$dismiss = modalInstance.dismiss;

                    var ctrlInstance = void 0;
                    var ctrlLocals = {};
                    var resolveIter = 1;

                    // controllers
                    if (modalOptions.controller) {
                        ctrlLocals.$scope = modalScope;
                        ctrlLocals.$modalInstance = modalInstance;
                        angular.forEach(modalOptions.resolve, function (value, key) {
                            ctrlLocals[key] = tplAndVars[resolveIter++];
                        });

                        ctrlInstance = $controller(modalOptions.controller, ctrlLocals);
                        if (modalOptions.controllerAs) {
                            modalScope[modalOptions.controllerAs] = ctrlInstance;
                        }
                    }

                    return $modalStack.open(modalInstance, {
                        scope: modalScope,
                        deferred: modalResultDeferred,
                        content: tplAndVars[0],
                        backdrop: modalOptions.backdrop,
                        keyboard: modalOptions.keyboard,
                        windowClass: modalOptions.windowClass,
                        size: modalOptions.size,
                        closeOnClick: modalOptions.closeOnClick
                    });
                }, function (reason) {
                    modalResultDeferred.reject(reason);
                    return $q.reject(reason);
                });

                openedPromise.then(function () {
                    modalOpenedDeferred.resolve(true);
                }, function () {
                    modalOpenedDeferred.reject(false);
                });

                return modalInstance;
            };
            return $modal;
        }]
    };

    return $modalProvider;
});

(function () {
    angular.module("mm.foundation.modal").run(["$templateCache", function ($templateCache) {
        $templateCache.put("template/modal/backdrop.html", "<div ng-animate-children=\"true\" class=\"reveal-overlay ng-animate\" ng-click=\"close($event)\" style=\"display: block;\"></div>\n");
        $templateCache.put("template/modal/window.html", "<div ng-show=\"isTop()\" tabindex=\"-1\" class=\"reveal {{ windowClass }}\" style=\"display: block; visibility: visible;\">\n  <div ng-transclude></div>\n</div>\n");
    }]);
})();
angular.module('mm.foundation.offcanvas', []).directive('offCanvasWrapper', ['$window', function ($window) {
    'ngInject';

    return {
        scope: {},
        bindToController: { disableAutoClose: '=' },
        controllerAs: 'vm',
        restrict: 'C',
        controller: ['$scope', '$element', function controller($scope, $element) {
            'ngInject';

            var $ctrl = this;

            var left = angular.element($element[0].querySelector('.position-left'));
            var right = angular.element($element[0].querySelector('.position-right'));
            var inner = angular.element($element[0].querySelector('.off-canvas-wrapper-inner'));
            // var overlay = angular.element(); js-off-canvas-exit
            var exitOverlay = angular.element('<div class="js-off-canvas-exit"></div>');
            inner.append(exitOverlay);

            exitOverlay.on('click', function () {
                $ctrl.hide();
            });

            $ctrl.leftToggle = function () {
                inner && inner.toggleClass('is-off-canvas-open');
                inner && inner.toggleClass('is-open-left');
                left && left.toggleClass('is-open');
                exitOverlay.addClass('is-visible');
                // is-visible
            };

            $ctrl.rightToggle = function () {
                inner && inner.toggleClass('is-off-canvas-open');
                inner && inner.toggleClass('is-open-right');
                right && right.toggleClass('is-open');
                exitOverlay.addClass('is-visible');
            };

            $ctrl.hide = function () {
                inner && inner.removeClass('is-open-left');
                inner && inner.removeClass('is-open-right');
                left && left.removeClass('is-open');
                right && right.removeClass('is-open');
                inner && inner.removeClass('is-off-canvas-open');
                exitOverlay.removeClass('is-visible');
            };

            var win = angular.element($window);

            win.bind('resize.body', $ctrl.hide);

            $scope.$on('$destroy', function () {
                win.unbind('resize.body', $ctrl.hide);
            });
        }]
    };
}]).directive('leftOffCanvasToggle', function () {
    'ngInject';

    return {
        require: '^^offCanvasWrapper',
        restrict: 'C',
        link: function link($scope, element, attrs, offCanvasWrapper) {
            element.on('click', function () {
                offCanvasWrapper.leftToggle();
            });
        }
    };
}).directive('rightOffCanvasToggle', function () {
    'ngInject';

    return {
        require: '^^offCanvasWrapper',
        restrict: 'C',
        link: function link($scope, element, attrs, offCanvasWrapper) {
            element.on('click', function () {
                offCanvasWrapper.rightToggle();
            });
        }
    };
}).directive('offCanvas', function () {
    'ngInject';

    return {
        require: { 'offCanvasWrapper': '^^offCanvasWrapper' },
        restrict: 'C',
        bindToController: {},
        scope: {},
        controllerAs: 'vm',
        controller: function controller() {}
    };
}).directive('li', function () {
    'ngInject';

    return {
        require: '?^^offCanvas',
        restrict: 'E',
        link: function link($scope, element, attrs, offCanvas) {
            if (!offCanvas || offCanvas.offCanvasWrapper.disableAutoClose) {
                return;
            }
            element.on('click', function () {
                offCanvas.offCanvasWrapper.hide();
            });
        }
    };
});

angular.module('mm.foundation.pagination', []).controller('PaginationController', ['$scope', '$attrs', '$parse', '$interpolate', function ($scope, $attrs, $parse, $interpolate) {
    var self = this,
        setNumPages = $attrs.numPages ? $parse($attrs.numPages).assign : angular.noop;

    this.init = function (defaultItemsPerPage) {
        if ($attrs.itemsPerPage) {
            $scope.$parent.$watch($parse($attrs.itemsPerPage), function (value) {
                self.itemsPerPage = parseInt(value, 10);
                $scope.totalPages = self.calculateTotalPages();
            });
        } else {
            this.itemsPerPage = defaultItemsPerPage;
        }
    };

    this.noPrevious = function () {
        return this.page === 1;
    };
    this.noNext = function () {
        return this.page === $scope.totalPages;
    };

    this.isActive = function (page) {
        return this.page === page;
    };

    this.calculateTotalPages = function () {
        var totalPages = this.itemsPerPage < 1 ? 1 : Math.ceil($scope.totalItems / this.itemsPerPage);
        return Math.max(totalPages || 0, 1);
    };

    this.getAttributeValue = function (attribute, defaultValue, interpolate) {
        return angular.isDefined(attribute) ? interpolate ? $interpolate(attribute)($scope.$parent) : $scope.$parent.$eval(attribute) : defaultValue;
    };

    this.render = function () {
        this.page = parseInt($scope.page, 10) || 1;
        if (this.page > 0 && this.page <= $scope.totalPages) {
            $scope.pages = this.getPages(this.page, $scope.totalPages);
        }
    };

    $scope.selectPage = function (page) {
        if (!self.isActive(page) && page > 0 && page <= $scope.totalPages) {
            $scope.page = page;
            $scope.onSelectPage({
                page: page
            });
        }
    };

    $scope.$watch('page', function () {
        self.render();
    });

    $scope.$watch('totalItems', function () {
        $scope.totalPages = self.calculateTotalPages();
    });

    $scope.$watch('totalPages', function (value) {
        setNumPages($scope.$parent, value); // Readonly variable

        if (self.page > value) {
            $scope.selectPage(value);
        } else {
            self.render();
        }
    });
}]).constant('paginationConfig', {
    itemsPerPage: 10,
    boundaryLinks: false,
    directionLinks: true,
    firstText: 'First',
    previousText: 'Previous',
    nextText: 'Next',
    lastText: 'Last',
    rotate: true
}).directive('pagination', ['$parse', 'paginationConfig', function ($parse, paginationConfig) {
    'ngInject';

    return {
        restrict: 'EA',
        scope: {
            page: '=',
            totalItems: '=',
            onSelectPage: ' &'
        },
        controller: 'PaginationController',
        templateUrl: 'template/pagination/pagination.html',
        replace: true,
        link: function link(scope, element, attrs, paginationCtrl) {

            // Setup configuration parameters
            var maxSize,
                boundaryLinks = paginationCtrl.getAttributeValue(attrs.boundaryLinks, paginationConfig.boundaryLinks),
                directionLinks = paginationCtrl.getAttributeValue(attrs.directionLinks, paginationConfig.directionLinks),
                firstText = paginationCtrl.getAttributeValue(attrs.firstText, paginationConfig.firstText, true),
                previousText = paginationCtrl.getAttributeValue(attrs.previousText, paginationConfig.previousText, true),
                nextText = paginationCtrl.getAttributeValue(attrs.nextText, paginationConfig.nextText, true),
                lastText = paginationCtrl.getAttributeValue(attrs.lastText, paginationConfig.lastText, true),
                rotate = paginationCtrl.getAttributeValue(attrs.rotate, paginationConfig.rotate);

            paginationCtrl.init(paginationConfig.itemsPerPage);

            if (attrs.maxSize) {
                scope.$parent.$watch($parse(attrs.maxSize), function (value) {
                    maxSize = parseInt(value, 10);
                    paginationCtrl.render();
                });
            }

            // Create page object used in template
            function makePage(number, text, isActive, isDisabled) {
                return {
                    number: number,
                    text: text,
                    active: isActive,
                    disabled: isDisabled
                };
            }

            paginationCtrl.getPages = function (currentPage, totalPages) {
                var pages = [];

                // Default page limits
                var startPage = 1,
                    endPage = totalPages;
                var isMaxSized = angular.isDefined(maxSize) && maxSize < totalPages;

                // recompute if maxSize
                if (isMaxSized) {
                    if (rotate) {
                        // Current page is displayed in the middle of the visible ones
                        startPage = Math.max(currentPage - Math.floor(maxSize / 2), 1);
                        endPage = startPage + maxSize - 1;

                        // Adjust if limit is exceeded
                        if (endPage > totalPages) {
                            endPage = totalPages;
                            startPage = endPage - maxSize + 1;
                        }
                    } else {
                        // Visible pages are paginated with maxSize
                        startPage = (Math.ceil(currentPage / maxSize) - 1) * maxSize + 1;

                        // Adjust last page if limit is exceeded
                        endPage = Math.min(startPage + maxSize - 1, totalPages);
                    }
                }

                // Add page number links
                for (var number = startPage; number <= endPage; number++) {
                    var page = makePage(number, number, paginationCtrl.isActive(number), false);
                    pages.push(page);
                }

                // Add links to move between page sets
                if (isMaxSized && !rotate) {
                    if (startPage > 1) {
                        var previousPageSet = makePage(startPage - 1, '...', false, false);
                        pages.unshift(previousPageSet);
                    }

                    if (endPage < totalPages) {
                        var nextPageSet = makePage(endPage + 1, '...', false, false);
                        pages.push(nextPageSet);
                    }
                }

                // Add previous & next links
                if (directionLinks) {
                    var previousPage = makePage(currentPage - 1, previousText, false, paginationCtrl.noPrevious());
                    pages.unshift(previousPage);

                    var nextPage = makePage(currentPage + 1, nextText, false, paginationCtrl.noNext());
                    pages.push(nextPage);
                }

                // Add first & last links
                if (boundaryLinks) {
                    var firstPage = makePage(1, firstText, false, paginationCtrl.noPrevious());
                    pages.unshift(firstPage);

                    var lastPage = makePage(totalPages, lastText, false, paginationCtrl.noNext());
                    pages.push(lastPage);
                }

                return pages;
            };
        }
    };
}]).constant('pagerConfig', {
    itemsPerPage: 10,
    previousText: '« Previous',
    nextText: 'Next »',
    align: true
}).directive('pager', ['pagerConfig', function (pagerConfig) {
    'ngInject';

    return {
        restrict: 'EA',
        scope: {
            page: '=',
            totalItems: '=',
            onSelectPage: ' &'
        },
        controller: 'PaginationController',
        templateUrl: 'template/pagination/pager.html',
        replace: true,
        link: function link(scope, element, attrs, paginationCtrl) {

            // Setup configuration parameters
            var previousText = paginationCtrl.getAttributeValue(attrs.previousText, pagerConfig.previousText, true),
                nextText = paginationCtrl.getAttributeValue(attrs.nextText, pagerConfig.nextText, true),
                align = paginationCtrl.getAttributeValue(attrs.align, pagerConfig.align);

            paginationCtrl.init(pagerConfig.itemsPerPage);

            // Create page object used in template
            function makePage(number, text, isDisabled, isPrevious, isNext) {
                return {
                    number: number,
                    text: text,
                    disabled: isDisabled,
                    previous: align && isPrevious,
                    next: align && isNext
                };
            }

            paginationCtrl.getPages = function (currentPage) {
                return [makePage(currentPage - 1, previousText, paginationCtrl.noPrevious(), true, false), makePage(currentPage + 1, nextText, paginationCtrl.noNext(), false, true)];
            };
        }
    };
}]);

(function () {
    angular.module("mm.foundation.pagination").run(["$templateCache", function ($templateCache) {
        $templateCache.put("template/pagination/pager.html", "<ul class=\"pagination\">\n  <li ng-repeat=\"page in pages\" class=\"arrow\" ng-class=\"{unavailable: page.disabled, left: page.previous, right: page.next}\"><a ng-click=\"selectPage(page.number)\">{{page.text}}</a></li>\n</ul>\n");
        $templateCache.put("template/pagination/pagination.html", "<ul class=\"pagination\" role=\"navigation\" aria-label=\"Pagination\">\n  <li ng-repeat=\"page in pages\"\n    ng-class=\"{\n        \'pagination-previous\': $first,\n        \'pagination-next\': $last,\n        current: page.active,\n        unavailable: page.disabled\n        }\">\n    <a ng-if=\"!page.active\" ng-click=\"selectPage(page.number)\">{{page.text}}</a>\n    <span ng-if=\"page.active\">{{page.text}}</span>\n  </li>\n</ul>\n");
    }]);
})();
angular.module('mm.foundation.position', [])

/**
 * A set of utility methods that can be use to retrieve position of DOM elements.
 * It is meant to be used where we need to absolute-position DOM elements in
 * relation to other, existing elements (this is the case for tooltips, popovers,
 * typeahead suggestions etc.).
 */
.factory('$position', ['$document', '$window', function ($document, $window) {
    'ngInject';

    function getStyle(el, cssprop) {
        if (el.currentStyle) {
            //IE
            return el.currentStyle[cssprop];
        } else if ($window.getComputedStyle) {
            return $window.getComputedStyle(el)[cssprop];
        }
        // finally try and get inline style
        return el.style[cssprop];
    }

    /**
     * Checks if a given element is statically positioned
     * @param element - raw DOM element
     */
    function isStaticPositioned(element) {
        return (getStyle(element, "position") || 'static') === 'static';
    }

    /**
     * returns the closest, non-statically positioned parentOffset of a given element
     * @param element
     */
    var parentOffsetEl = function parentOffsetEl(element) {
        var docDomEl = $document[0];
        var offsetParent = element.offsetParent || docDomEl;
        while (offsetParent && offsetParent !== docDomEl && isStaticPositioned(offsetParent)) {
            offsetParent = offsetParent.offsetParent;
        }
        return offsetParent || docDomEl;
    };

    return {
        /**
         * Provides read-only equivalent of jQuery's position function:
         * http://api.jquery.com/position/
         */
        position: function position(element) {
            var elBCR = this.offset(element);
            var offsetParentBCR = {
                top: 0,
                left: 0
            };
            var offsetParentEl = parentOffsetEl(element[0]);
            if (offsetParentEl != $document[0]) {
                offsetParentBCR = this.offset(angular.element(offsetParentEl));
                offsetParentBCR.top += offsetParentEl.clientTop - offsetParentEl.scrollTop;
                offsetParentBCR.left += offsetParentEl.clientLeft - offsetParentEl.scrollLeft;
            }

            var boundingClientRect = element[0].getBoundingClientRect();
            return {
                width: boundingClientRect.width || element.prop('offsetWidth'),
                height: boundingClientRect.height || element.prop('offsetHeight'),
                top: elBCR.top - offsetParentBCR.top,
                left: elBCR.left - offsetParentBCR.left
            };
        },

        /**
         * Provides read-only equivalent of jQuery's offset function:
         * http://api.jquery.com/offset/
         */
        offset: function offset(element) {
            var boundingClientRect = element[0].getBoundingClientRect();
            return {
                width: boundingClientRect.width || element.prop('offsetWidth'),
                height: boundingClientRect.height || element.prop('offsetHeight'),
                top: boundingClientRect.top + ($window.pageYOffset || $document[0].body.scrollTop || $document[0].documentElement.scrollTop),
                left: boundingClientRect.left + ($window.pageXOffset || $document[0].body.scrollLeft || $document[0].documentElement.scrollLeft)
            };
        }
    };
}]);

angular.module('mm.foundation.progressbar', []).constant('progressConfig', {
    animate: true,
    max: 100
}).controller('ProgressController', ['$scope', '$attrs', 'progressConfig', '$animate', function ($scope, $attrs, progressConfig, $animate) {
    'ngInject';

    var self = this,
        bars = [],
        max = angular.isDefined($attrs.max) ? $scope.$parent.$eval($attrs.max) : progressConfig.max,
        animate = angular.isDefined($attrs.animate) ? $scope.$parent.$eval($attrs.animate) : progressConfig.animate;

    this.addBar = function (bar, element) {
        var oldValue = 0,
            index = bar.$parent.$index;
        if (angular.isDefined(index) && bars[index]) {
            oldValue = bars[index].value;
        }
        bars.push(bar);

        this.update(element, bar.value, oldValue);

        bar.$watch('value', function (value, oldValue) {
            if (value !== oldValue) {
                self.update(element, value, oldValue);
            }
        });

        bar.$on('$destroy', function () {
            self.removeBar(bar);
        });
    };

    // Update bar element width
    this.update = function (element, newValue, oldValue) {
        var percent = this.getPercentage(newValue);

        if (animate) {
            element.css('width', this.getPercentage(oldValue) + '%');
            $animate.animate(element, {
                'width': this.getPercentage(oldValue) + '%'
            }, {
                width: percent + '%'
            });
            // $transition(element, {
            //     width: percent + '%'
            // });
        } else {
                element.css({
                    'transition': 'none',
                    'width': percent + '%'
                });
            }
    };

    this.removeBar = function (bar) {
        bars.splice(bars.indexOf(bar), 1);
    };

    this.getPercentage = function (value) {
        return Math.round(100 * value / max);
    };
}]).directive('progress', function () {
    'ngInject';

    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        controller: 'ProgressController',
        require: 'progress',
        scope: {},
        template: '<div class="progress" ng-transclude></div>'
        //templateUrl: 'template/progressbar/progress.html' // Works in AngularJS 1.2
    };
}).directive('bar', function () {
    'ngInject';

    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        require: '^progress',
        scope: {
            value: '=',
            type: '@'
        },
        templateUrl: 'template/progressbar/bar.html',
        link: function link(scope, element, attrs, progressCtrl) {
            progressCtrl.addBar(scope, element);
        }
    };
}).directive('progressbar', function () {
    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        controller: 'ProgressController',
        scope: {
            value: '=',
            type: '@'
        },
        templateUrl: 'template/progressbar/progressbar.html',
        link: function link(scope, element, attrs, progressCtrl) {
            progressCtrl.addBar(scope, angular.element(element.children()[0]));
        }
    };
});

(function () {
    angular.module("mm.foundation.progressbar").run(["$templateCache", function ($templateCache) {
        $templateCache.put("template/progressbar/bar.html", "<span class=\"meter\" ng-transclude></span>\n");
        $templateCache.put("template/progressbar/progress.html", "<div class=\"progress\" ng-class=\"type\" ng-transclude></div>\n");
        $templateCache.put("template/progressbar/progressbar.html", "<div class=\"progress\" role=\"progressbar\" ng-class=\"type\">\n  <span class=\"progress-meter\"><p class=\"progress-meter-text\" ng-transclude></p></span>\n</div>\n");
    }]);
})();
angular.module('mm.foundation.rating', []).constant('ratingConfig', {
    max: 5,
    stateOn: null,
    stateOff: null
}).controller('RatingController', ['$scope', '$attrs', '$parse', 'ratingConfig', function ($scope, $attrs, $parse, ratingConfig) {

    this.maxRange = angular.isDefined($attrs.max) ? $scope.$parent.$eval($attrs.max) : ratingConfig.max;
    this.stateOn = angular.isDefined($attrs.stateOn) ? $scope.$parent.$eval($attrs.stateOn) : ratingConfig.stateOn;
    this.stateOff = angular.isDefined($attrs.stateOff) ? $scope.$parent.$eval($attrs.stateOff) : ratingConfig.stateOff;

    this.createRateObjects = function (states) {
        var defaultOptions = {
            stateOn: this.stateOn,
            stateOff: this.stateOff
        };

        for (var i = 0, n = states.length; i < n; i++) {
            states[i] = angular.extend({ index: i }, defaultOptions, states[i]);
        }
        return states;
    };

    // Get objects used in template
    $scope.range = angular.isDefined($attrs.ratingStates) ? this.createRateObjects(angular.copy($scope.$parent.$eval($attrs.ratingStates))) : this.createRateObjects(new Array(this.maxRange));

    $scope.rate = function (value) {
        if ($scope.value !== value && !$scope.readonly) {
            $scope.value = value;
        }
    };

    $scope.enter = function (value) {
        if (!$scope.readonly) {
            $scope.val = value;
        }
        $scope.onHover({ value: value });
    };

    $scope.reset = function () {
        $scope.val = angular.copy($scope.value);
        $scope.onLeave();
    };

    $scope.$watch('value', function (value) {
        $scope.val = value;
    });

    $scope.readonly = false;
    if ($attrs.readonly) {
        $scope.$parent.$watch($parse($attrs.readonly), function (value) {
            $scope.readonly = !!value;
        });
    }
}]).directive('rating', function () {
    return {
        restrict: 'EA',
        scope: {
            value: '=',
            onHover: '&',
            onLeave: '&'
        },
        controller: 'RatingController',
        templateUrl: 'template/rating/rating.html',
        replace: true
    };
});

(function () {
    angular.module("mm.foundation.rating").run(["$templateCache", function ($templateCache) {
        $templateCache.put("template/rating/rating.html", "<span ng-mouseleave=\"reset()\">\n  <i ng-repeat=\"r in range\" ng-mouseenter=\"enter($index + 1)\" ng-click=\"rate($index + 1)\" class=\"fa\"\n    ng-class=\"$index < val && (r.stateOn || \'fa-star\') || (r.stateOff || \'fa-star-o\')\"></i>\n</span>\n");
    }]);
})();
/**
 * @ngdoc overview
 * @name mm.foundation.tabs
 *
 * @description
 * AngularJS version of the tabs directive.
 */

angular.module('mm.foundation.tabs', []).controller('TabsetController', ['$scope', function TabsetCtrl($scope) {
    'ngInject';

    var ctrl = this;
    var tabs = ctrl.tabs = $scope.tabs = [];

    if (angular.isUndefined($scope.openOnLoad)) {
        $scope.openOnLoad = true;
    }

    ctrl.select = function (tab) {
        angular.forEach(tabs, function (tab) {
            tab.active = false;
        });
        tab.active = true;
    };

    ctrl.addTab = function addTab(tab) {
        tabs.push(tab);
        if ($scope.openOnLoad && (tabs.length === 1 || tab.active)) {
            ctrl.select(tab);
        }
    };

    ctrl.removeTab = function removeTab(tab) {
        var index = tabs.indexOf(tab);
        //Select a new tab if the tab to be removed is selected
        if (tab.active && tabs.length > 1) {
            //If this is the last tab, select the previous tab. else, the next tab.
            var newActiveIndex = index == tabs.length - 1 ? index - 1 : index + 1;
            ctrl.select(tabs[newActiveIndex]);
        }
        tabs.splice(index, 1);
    };
}])

/**
 * @ngdoc directive
 * @name mm.foundation.tabs.directive:tabset
 * @restrict EA
 *
 * @description
 * Tabset is the outer container for the tabs directive
 *
 * @param {boolean=} vertical Whether or not to use vertical styling for the tabs.
 * @param {boolean=} justified Whether or not to use justified styling for the tabs.
 *
 * @example
<example module="mm.foundation">
  <file name="index.html">
    <tabset>
      <tab heading="Tab 1"><b>First</b> Content!</tab>
      <tab heading="Tab 2"><i>Second</i> Content!</tab>
    </tabset>
    <hr />
    <tabset vertical="true">
      <tab heading="Vertical Tab 1"><b>First</b> Vertical Content!</tab>
      <tab heading="Vertical Tab 2"><i>Second</i> Vertical Content!</tab>
    </tabset>
    <tabset justified="true">
      <tab heading="Justified Tab 1"><b>First</b> Justified Content!</tab>
      <tab heading="Justified Tab 2"><i>Second</i> Justified Content!</tab>
    </tabset>
  </file>
</example>
 */
.directive('tabset', function () {
    'ngInject';

    return {
        restrict: 'EA',
        transclude: true,
        replace: true,
        scope: {
            openOnLoad: '=?'
        },
        controller: 'TabsetController',
        templateUrl: 'template/tabs/tabset.html',
        link: function link(scope, element, attrs) {
            scope.vertical = angular.isDefined(attrs.vertical) ? scope.$parent.$eval(attrs.vertical) : false;
            scope.justified = angular.isDefined(attrs.justified) ? scope.$parent.$eval(attrs.justified) : false;
            scope.type = angular.isDefined(attrs.type) ? scope.$parent.$eval(attrs.type) : 'tabs';
        }
    };
})

/**
 * @ngdoc directive
 * @name mm.foundation.tabs.directive:tab
 * @restrict EA
 *
 * @param {string=} heading The visible heading, or title, of the tab. Set HTML headings with {@link mm.foundation.tabs.directive:tabHeading tabHeading}.
 * @param {string=} select An expression to evaluate when the tab is selected.
 * @param {boolean=} active A binding, telling whether or not this tab is selected.
 * @param {boolean=} disabled A binding, telling whether or not this tab is disabled.
 *
 * @description
 * Creates a tab with a heading and content. Must be placed within a {@link mm.foundation.tabs.directive:tabset tabset}.
 *
 * @example
<example module="mm.foundation">
  <file name="index.html">
    <div ng-controller="TabsDemoCtrl">
      <button class="button small" ng-click="items[0].active = true">
        Select item 1, using active binding
      </button>
      <button class="button small" ng-click="items[1].disabled = !items[1].disabled">
        Enable/disable item 2, using disabled binding
      </button>
      <br />
      <tabset>
        <tab heading="Tab 1">First Tab</tab>
        <tab select="alertMe()">
          <tab-heading><i class="fa fa-bell"></i> Alert me!</tab-heading>
          Second Tab, with alert callback and html heading!
        </tab>
        <tab ng-repeat="item in items"
          heading="{{item.title}}"
          disabled="item.disabled"
          active="item.active">
          {{item.content}}
        </tab>
      </tabset>
    </div>
  </file>
  <file name="script.js">
    function TabsDemoCtrl($scope) {
      $scope.items = [
        { title:"Dynamic Title 1", content:"Dynamic Item 0" },
        { title:"Dynamic Title 2", content:"Dynamic Item 1", disabled: true }
      ];

      $scope.alertMe = function() {
        setTimeout(function() {
          alert("You've selected the alert tab!");
        });
      };
    };
  </file>
</example>
 */

/**
 * @ngdoc directive
 * @name mm.foundation.tabs.directive:tabHeading
 * @restrict EA
 *
 * @description
 * Creates an HTML heading for a {@link mm.foundation.tabs.directive:tab tab}. Must be placed as a child of a tab element.
 *
 * @example
<example module="mm.foundation">
  <file name="index.html">
    <tabset>
      <tab>
        <tab-heading><b>HTML</b> in my titles?!</tab-heading>
        And some content, too!
      </tab>
      <tab>
        <tab-heading><i class="fa fa-heart"></i> Icon heading?!?</tab-heading>
        That's right.
      </tab>
    </tabset>
  </file>
</example>
 */
.directive('tab', ['$parse', function ($parse) {
    'ngInject';

    return {
        require: '^tabset',
        restrict: 'EA',
        replace: true,
        templateUrl: 'template/tabs/tab.html',
        transclude: true,
        scope: {
            heading: '@',
            onSelect: '&select', //This callback is called in contentHeadingTransclude
            //once it inserts the tab's content into the dom
            onDeselect: '&deselect'
        },
        controller: function controller() {
            //Empty controller so other directives can require being 'under' a tab
        },
        compile: function compile(elm, attrs, transclude) {
            return function postLink(scope, elm, attrs, tabsetCtrl) {
                var getActive, setActive;
                if (attrs.active) {
                    getActive = $parse(attrs.active);
                    setActive = getActive.assign;
                    scope.$parent.$watch(getActive, function updateActive(value, oldVal) {
                        // Avoid re-initializing scope.active as it is already initialized
                        // below. (watcher is called async during init with value ===
                        // oldVal)
                        if (value !== oldVal) {
                            scope.active = !!value;
                        }
                    });
                    scope.active = getActive(scope.$parent);
                } else {
                    setActive = getActive = angular.noop;
                }

                scope.$watch('active', function (active) {
                    if (!angular.isFunction(setActive)) {
                        return;
                    }
                    // Note this watcher also initializes and assigns scope.active to the
                    // attrs.active expression.
                    setActive(scope.$parent, active);
                    if (active) {
                        tabsetCtrl.select(scope);
                        scope.onSelect();
                    } else {
                        scope.onDeselect();
                    }
                });

                scope.disabled = false;
                if (attrs.disabled) {
                    scope.$parent.$watch($parse(attrs.disabled), function (value) {
                        scope.disabled = !!value;
                    });
                }

                scope.select = function () {
                    if (!scope.disabled) {
                        scope.active = true;
                    }
                };

                tabsetCtrl.addTab(scope);
                scope.$on('$destroy', function () {
                    tabsetCtrl.removeTab(scope);
                });

                //We need to transclude later, once the content container is ready.
                //when this link happens, we're inside a tab heading.
                scope.$transcludeFn = transclude;
            };
        }
    };
}]).directive('tabHeadingTransclude', function () {
    'ngInject';

    return {
        restrict: 'A',
        require: '^tab',
        link: function link(scope, elm, attrs, tabCtrl) {
            scope.$watch('headingElement', function updateHeadingElement(heading) {
                if (heading) {
                    elm.html('');
                    elm.append(heading);
                }
            });
        }
    };
}).directive('tabContentTransclude', function () {
    'ngInject';

    return {
        restrict: 'A',
        require: '^tabset',
        link: function link(scope, elm, attrs) {
            var tab = scope.$eval(attrs.tabContentTransclude);

            //Now our tab is ready to be transcluded: both the tab heading area
            //and the tab content area are loaded.  Transclude 'em both.
            tab.$transcludeFn(tab.$parent, function (contents) {
                angular.forEach(contents, function (node) {
                    if (isTabHeading(node)) {
                        //Let tabHeadingTransclude know.
                        tab.headingElement = node;
                    } else {
                        elm.append(node);
                    }
                });
            });
        }
    };

    function isTabHeading(node) {
        return node.tagName && (node.hasAttribute('tab-heading') || node.hasAttribute('data-tab-heading') || node.tagName.toLowerCase() === 'tab-heading' || node.tagName.toLowerCase() === 'data-tab-heading');
    }
});

(function () {
    angular.module("mm.foundation.tabs").run(["$templateCache", function ($templateCache) {
        $templateCache.put("template/tabs/tab.html", "<li class=\"tabs-title\" ng-class=\"{\'is-active\': active}\">\n  <a ng-click=\"select()\" ng-attr-aria-selected=\"{{active}}\" tab-heading-transclude>{{heading}}</a>\n</li>\n");
        $templateCache.put("template/tabs/tabset.html", "<div class=\"tabbable\">\n  <ul class=\"tabs\" ng-class=\"{\'vertical\': vertical}\" ng-transclude></ul>\n  <div class=\"tabs-content\" ng-class=\"{\'vertical\': vertical}\">\n    <div class=\"tabs-panel\"\n      ng-repeat=\"tab in tabs\"\n      ng-class=\"{\'is-active\': tab.active}\">\n      <div tab-content-transclude=\"tab\"></div>\n    </div>\n  </div>\n</div>\n");
    }]);
})();
/**
 * The following features are still outstanding: animation as a
 * function, placement as a function, inside, support for more triggers than
 * just mouse enter/leave, html tooltips, and selector delegation.
 */
angular.module('mm.foundation.tooltip', ['mm.foundation.position', 'mm.foundation.bindHtml'])

/**
 * The $tooltip service creates tooltip- and popover-like directives as well as
 * houses global options for them.
 */
.provider('$tooltip', function () {
    'ngInject';
    // The default options tooltip and popover.

    var defaultOptions = {
        placement: 'top',
        popupDelay: 0
    };

    // Default hide triggers for each show trigger
    var triggerMap = {
        'mouseover': 'mouseout',
        'click': 'click',
        'focus': 'blur'
    };

    // The options specified to the provider globally.
    var globalOptions = {};

    /**
     * `options({})` allows global configuration of all tooltips in the
     * application.
     *
     *   var app = angular.module( 'App', ['mm.foundation.tooltip'], function( $tooltipProvider ) {
     *     // place tooltips left instead of top by default
     *     $tooltipProvider.options( { placement: 'left' } );
     *   });
     */
    this.options = function (value) {
        angular.extend(globalOptions, value);
    };

    /**
     * This allows you to extend the set of trigger mappings available. E.g.:
     *
     *   $tooltipProvider.setTriggers( 'openTrigger': 'closeTrigger' );
     */
    this.setTriggers = function setTriggers(triggers) {
        angular.extend(triggerMap, triggers);
    };

    /**
     * This is a helper function for translating camel-case to snake-case.
     */
    function snake_case(name) {
        var regexp = /[A-Z]/g;
        var separator = '-';
        return name.replace(regexp, function (letter, pos) {
            return (pos ? separator : '') + letter.toLowerCase();
        });
    }

    /**
     * Returns the actual instance of the $tooltip service.
     * TODO support multiple triggers
     */
    this.$get = ['$window', '$compile', '$timeout', '$parse', '$document', '$position', '$interpolate', '$animate', function ($window, $compile, $timeout, $parse, $document, $position, $interpolate, $animate) {
        'ngInject';

        return function $tooltip(type, prefix, defaultTriggerShow) {
            var options = angular.extend({}, defaultOptions, globalOptions);

            /**
             * Returns an object of show and hide triggers.
             *
             * If a trigger is supplied,
             * it is used to show the tooltip; otherwise, it will use the `trigger`
             * option passed to the `$tooltipProvider.options` method; else it will
             * default to the trigger supplied to this directive factory.
             *
             * The hide trigger is based on the show trigger. If the `trigger` option
             * was passed to the `$tooltipProvider.options` method, it will use the
             * mapped trigger from `triggerMap` or the passed trigger if the map is
             * undefined; otherwise, it uses the `triggerMap` value of the show
             * trigger; else it will just use the show trigger.
             */
            function getTriggers(trigger) {
                var show = trigger || options.trigger || defaultTriggerShow;
                var hide = triggerMap[show] || show;
                return {
                    show: show,
                    hide: hide
                };
            }

            var directiveName = snake_case(type);

            var startSym = $interpolate.startSymbol();
            var endSym = $interpolate.endSymbol();
            var template = '<div ' + directiveName + '-popup ' + 'title="' + startSym + 'tt_title' + endSym + '" ' + 'content="' + startSym + 'tt_content' + endSym + '" ' + 'placement="' + startSym + 'tt_placement' + endSym + '" ' + 'is-open="tt_isOpen"' + '>' + '</div>';

            return {
                restrict: 'EA',
                scope: true,
                compile: function compile(tElem) {
                    var tooltipLinker = $compile(template);

                    return function link(scope, element, attrs) {
                        var tooltip;
                        var transitionTimeout;
                        var popupTimeout;
                        var appendToBody = angular.isDefined(options.appendToBody) ? options.appendToBody : false;
                        var triggers = getTriggers(undefined);
                        var hasRegisteredTriggers = false;
                        var hasEnableExp = angular.isDefined(attrs[prefix + 'Enable']);

                        var positionTooltip = function positionTooltip() {
                            var position;
                            var ttWidth;
                            var ttHeight;
                            var ttPosition;
                            // Get the position of the directive element.
                            position = appendToBody ? $position.offset(element) : $position.position(element);

                            // Get the height and width of the tooltip so we can center it.
                            ttWidth = tooltip.prop('offsetWidth');
                            ttHeight = tooltip.prop('offsetHeight');

                            // Calculate the tooltip's top and left coordinates to center it with
                            // this directive.
                            switch (scope.tt_placement) {
                                case 'right':
                                    ttPosition = {
                                        top: position.top + position.height / 2 - ttHeight / 2,
                                        left: position.left + position.width + 10
                                    };
                                    break;
                                case 'bottom':
                                    ttPosition = {
                                        top: position.top + position.height + 10,
                                        left: position.left - ttWidth / 2 + position.width / 2
                                    };
                                    break;
                                case 'left':
                                    ttPosition = {
                                        top: position.top + position.height / 2 - ttHeight / 2,
                                        left: position.left - ttWidth - 10
                                    };
                                    break;
                                default:
                                    ttPosition = {
                                        top: position.top - ttHeight - 10,
                                        left: position.left - ttWidth / 2 + position.width / 2
                                    };
                                    break;
                            }

                            ttPosition.top += 'px';
                            ttPosition.left += 'px';

                            // Now set the calculated positioning.
                            tooltip.css(ttPosition);
                        };

                        // By default, the tooltip is not open.
                        // TODO add ability to start tooltip opened
                        scope.tt_isOpen = false;

                        function toggleTooltipBind() {
                            if (!scope.tt_isOpen) {
                                showTooltipBind();
                            } else {
                                hideTooltipBind();
                            }
                        }

                        // Show the tooltip with delay if specified, otherwise show it immediately
                        function showTooltipBind() {
                            if (hasEnableExp && !scope.$eval(attrs[prefix + 'Enable'])) {
                                return;
                            }
                            if (scope.tt_popupDelay) {
                                popupTimeout = $timeout(show, scope.tt_popupDelay, false);
                                popupTimeout.then(function (reposition) {
                                    reposition();
                                });
                            } else {
                                show()();
                            }
                        }

                        function hideTooltipBind() {
                            scope.$apply(function () {
                                hide();
                            });
                        }

                        // Show the tooltip popup element.
                        function show() {

                            // Don't show empty tooltips.
                            if (!scope.tt_content) {
                                return angular.noop;
                            }

                            createTooltip();

                            // If there is a pending remove transition, we must cancel it, lest the
                            // tooltip be mysteriously removed.
                            if (transitionTimeout) {
                                $timeout.cancel(transitionTimeout);
                            }

                            // Set the initial positioning.
                            tooltip.css({
                                top: 0,
                                left: 0
                            });

                            // Now we add it to the DOM because need some info about it. But it's not
                            // visible yet anyway.
                            if (appendToBody) {
                                // $document.find('body').append(tooltip);
                                // $document.find('body')
                                $animate.enter(tooltip, $document.find('body'));
                            } else {
                                $animate.enter(tooltip, element.parent(), element);
                                // element.after(tooltip);
                            }

                            positionTooltip();

                            // And show the tooltip.
                            scope.tt_isOpen = true;
                            scope.$digest(); // digest required as $apply is not called

                            // Return positioning function as promise callback for correct
                            // positioning after draw.
                            return positionTooltip;
                        }

                        // Hide the tooltip popup element.
                        function hide() {
                            // First things first: we don't show it anymore.
                            scope.tt_isOpen = false;

                            //if tooltip is going to be shown after delay, we must cancel this
                            $timeout.cancel(popupTimeout);
                            removeTooltip();
                        }

                        function createTooltip() {
                            // There can only be one tooltip element per directive shown at once.
                            if (tooltip) {
                                removeTooltip();
                            }
                            tooltip = tooltipLinker(scope, function () {});

                            // Get contents rendered into the tooltip
                            scope.$digest();
                        }

                        function removeTooltip() {
                            if (tooltip) {
                                $animate.leave(tooltip);
                                // tooltip.remove();
                                tooltip = null;
                            }
                        }

                        /**
                         * Observe the relevant attributes.
                         */
                        attrs.$observe(type, function (val) {
                            scope.tt_content = val;

                            if (!val && scope.tt_isOpen) {
                                hide();
                            }
                        });

                        attrs.$observe(prefix + 'Title', function (val) {
                            scope.tt_title = val;
                        });

                        attrs[prefix + 'Placement'] = attrs[prefix + 'Placement'] || null;

                        attrs.$observe(prefix + 'Placement', function (val) {
                            scope.tt_placement = angular.isDefined(val) && val ? val : options.placement;
                        });

                        attrs[prefix + 'PopupDelay'] = attrs[prefix + 'PopupDelay'] || null;

                        attrs.$observe(prefix + 'PopupDelay', function (val) {
                            var delay = parseInt(val, 10);
                            scope.tt_popupDelay = !isNaN(delay) ? delay : options.popupDelay;
                        });

                        var unregisterTriggers = function unregisterTriggers() {
                            if (hasRegisteredTriggers) {
                                if (angular.isFunction(triggers.show)) {
                                    unregisterTriggerFunction();
                                } else {
                                    element.unbind(triggers.show, showTooltipBind);
                                    element.unbind(triggers.hide, hideTooltipBind);
                                }
                            }
                        };

                        var unregisterTriggerFunction = function unregisterTriggerFunction() {};

                        attrs[prefix + 'Trigger'] = attrs[prefix + 'Trigger'] || null;

                        attrs.$observe(prefix + 'Trigger', function (val) {
                            unregisterTriggers();
                            unregisterTriggerFunction();

                            triggers = getTriggers(val);

                            if (angular.isFunction(triggers.show)) {
                                unregisterTriggerFunction = scope.$watch(function () {
                                    return triggers.show(scope, element, attrs);
                                }, function (val) {
                                    return val ? $timeout(show) : $timeout(hide);
                                });
                            } else {
                                if (triggers.show === triggers.hide) {
                                    element.bind(triggers.show, toggleTooltipBind);
                                } else {
                                    element.bind(triggers.show, showTooltipBind);
                                    element.bind(triggers.hide, hideTooltipBind);
                                }
                            }

                            hasRegisteredTriggers = true;
                        });

                        attrs.$observe(prefix + 'AppendToBody', function (val) {
                            appendToBody = angular.isDefined(val) ? $parse(val)(scope) : appendToBody;
                        });

                        // if a tooltip is attached to <body> we need to remove it on
                        // location change as its parent scope will probably not be destroyed
                        // by the change.
                        if (appendToBody) {
                            scope.$on('$locationChangeSuccess', function closeTooltipOnLocationChangeSuccess() {
                                if (scope.tt_isOpen) {
                                    hide();
                                }
                            });
                        }

                        // Make sure tooltip is destroyed and removed.
                        scope.$on('$destroy', function onDestroyTooltip() {
                            $timeout.cancel(transitionTimeout);
                            $timeout.cancel(popupTimeout);
                            unregisterTriggers();
                            unregisterTriggerFunction();
                            removeTooltip();
                        });
                    };
                }
            };
        };
    }];
}).directive('tooltipPopup', function () {
    'ngInject';

    return {
        restrict: 'EA',
        replace: true,
        scope: {
            content: '@',
            placement: '@',
            isOpen: '&'
        },
        templateUrl: 'template/tooltip/tooltip-popup.html'
    };
}).directive('tooltip', ['$tooltip', function ($tooltip) {
    'ngInject';

    return $tooltip('tooltip', 'tooltip', 'mouseover');
}]).directive('tooltipHtmlUnsafePopup', function () {
    return {
        restrict: 'EA',
        replace: true,
        scope: {
            content: '@',
            placement: '@',
            isOpen: '&'
        },
        templateUrl: 'template/tooltip/tooltip-html-unsafe-popup.html'
    };
}).directive('tooltipHtmlUnsafe', ['$tooltip', function ($tooltip) {
    'ngInject';

    return $tooltip('tooltipHtmlUnsafe', 'tooltip', 'mouseover');
}]);

(function () {
    angular.module("mm.foundation.tooltip").run(["$templateCache", function ($templateCache) {
        $templateCache.put("template/tooltip/tooltip-html-unsafe-popup.html", "<div class=\"tooltip {{placement}}\" style=\"width: auto;\">\n  <span bind-html-unsafe=\"content\"></span>\n</div>\n");
        $templateCache.put("template/tooltip/tooltip-popup.html", "<div class=\"tooltip {{placement}}\" style=\"width: auto;\">\n  <span ng-bind=\"content\"></span>\n</div>\n");
    }]);
})();
angular.module("mm.foundation", ["mm.foundation.accordion", "mm.foundation.alert", "mm.foundation.bindHtml", "mm.foundation.buttons", "mm.foundation.dropdownMenu", "mm.foundation.dropdownToggle", "mm.foundation.mediaQueries", "mm.foundation.modal", "mm.foundation.offcanvas", "mm.foundation.pagination", "mm.foundation.position", "mm.foundation.progressbar", "mm.foundation.rating", "mm.foundation.tabs", "mm.foundation.tooltip"]);