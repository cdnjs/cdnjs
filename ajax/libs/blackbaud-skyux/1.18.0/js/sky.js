/*global angular */

(function () {
    'use strict';

    angular.module('sky.accordion', ['sky.accordion.uibaccordiongroup']);
})();
/*global angular */

(function () {
    'use strict';

    angular.module('sky.alert', ['sky.alert.component']);
}());
/*global angular */

(function () {
    'use strict';

    angular.module('sky.avatar', ['sky.avatar.config', 'sky.avatar.component']);
}());

/*global angular */

(function () {
    'use strict';

    angular.module(
        'sky.card',
        [
            'sky.card.directive'
        ]
    );
}());

/*global angular */

(function () {
    'use strict';

    angular.module('sky.carousel', ['sky.carousel.component', 'sky.carousel.item.component']);
}());

/*global angular */

(function () {
    'use strict';

    angular.module(
        'sky.checklist',
        [
            'sky.checklist.directive',
            'sky.checklist.column.directive',
            'sky.checklist.columns.directive',
            'sky.checklist.model.directive'
        ]
    );
}());

/*global angular */

(function () {
    'use strict';

    angular.module('sky.chevron', ['sky.chevron.component']);
}());

/*global angular */

(function () {
    'use strict';

    angular.module(
        'sky.contextmenu',
        [
            'sky.contextmenu.directive',
            'sky.contextmenu.button.directive',
            'sky.contextmenu.item.directive',
            'sky.submenu'
        ]
    );
}());

/* global angular */

(function () {
    'use strict';

    angular.module('sky.submenu', ['sky.submenu.directive']);
}());

/*global angular */

(function () {
    'use strict';

    angular.module('sky.datepicker', ['sky.datepicker.directive']);
}());

/*global angular */

(function () {
    'use strict';

    angular.module('sky.definitionlist', ['sky.definitionlist.component', 'sky.definitionlistcontent.component']);
}());
/*global angular */

(function () {
    'use strict';

    angular.module('sky.error', ['sky.error.directive', 'sky.errormodal.service']);
}());

/*global angular */

(function () {
    'use strict';

    angular.module('sky.filter', 
        [
            'sky.filter.modal.footer.component',
            'sky.filter.button.component',
            'sky.filter.summary.component',
            'sky.filter.summary.item.component'
        ]);
})();

/*global angular */
(function () {
    'use strict';

    angular.module('sky.infinitescroll', ['sky.infinitescroll.component']);
})();
/*global angular */

(function () {
    'use strict';

    angular.module('sky.keyinfo', ['sky.keyinfo.component']);
}());
/*global angular */

(function () {
    'use strict';

    angular.module('sky.listbuilder', 
        [
            'sky.listbuilder.component', 
            'sky.listbuilder.toolbar.component', 
            'sky.listbuilder.footer.component',
            'sky.listbuilder.content.component',
            'sky.listbuilder.content.custom.component',
            'sky.listbuilder.content.custom.item.directive',
            'sky.listbuilder.card.component',
            'sky.listbuilder.cards.component',
            'sky.listbuilder.grid.component',
            'sky.listbuilder.switcher.component',
            'sky.listbuilder.repeater.component',
            'sky.listbuilder.repeater.item.directive'
            
        ]);
}());
/*jshint browser: true */
/*global angular */

(function () {
    'use strict';

    angular.module(
        'sky.modal',
        [
            'sky.modal.directive',
            'sky.modal.body.directive',
            'sky.modal.header.directive',
            'sky.modal.footer.directive',
            'sky.modal.footer.button.directive',
            'sky.modal.footer.button.primary.directive',
            'sky.modal.footer.button.cancel.directive',
            'sky.modal.factory'
        ]
    );
}());

/*global angular */

(function () {
    'use strict';

    angular.module('sky.pagesummary', []);
}());

/*global angular */

(function () {
    'use strict';

    angular.module('sky.phonefield', ['sky.phonefield.directive']);
}());

/*global angular */

(function () {
    'use strict';

    angular.module('sky.reorder', ['sky.reorder.component']);
}());

/*global angular */

(function () {
    'use strict';

    angular.module('sky.reordertable', ['sky.reordertable.component']);
}());

/*global angular */

(function () {
    'use strict';

    angular.module('sky.repeater', ['sky.repeater.component', 'sky.repeater.item.directive']);
}());

/*global angular */

(function () {
    'use strict';

    angular.module('sky.search', 
        [
            'sky.search.input.component',
            'sky.search.container.directive'
        ]);
})();
/*global angular */

(function () {
    'use strict';

    angular.module('sky.sectionedform', ['sky.sectionedform.component']);
}());

/*global angular */

(function () {
    'use strict';

    angular.module(
        'sky.selectfield',
        [
            'sky.selectfield.directive',
            'sky.selectfieldpicker.directive',
            'sky.selectfield.item.animation'
        ]
    );

})();

/*global angular */

(function () {
    'use strict';

    angular.module(
        'sky.sort',
        [
            'sky.sort.component',
            'sky.sort.item.component'
        ]
    );

})();
/*global angular */

(function () {
    'use strict';

    angular.module('sky.summary.actionbar', 
        [
            'sky.summary.actionbar.component',
            'sky.summary.actionbar.primary.component',
            'sky.summary.actionbar.secondary.component',
            'sky.summary.actionbar.secondary.actions.component',
            'sky.summary.actionbar.cancel.component'
        ]);
})();
/*jslint browser: true */
/*global angular */

(function () {
    'use strict';

    angular.module('sky.wait', ['sky.wait.directive', 'sky.wait.factory']);
}());
/* global angular */
/* 
    From https://github.com/angular-ui/bootstrap/blob/1.2.5/src/accordion/accordion.js
    so that we can have graceful deprecation of accordion group element directive
*/
(function () {
    'use strict';
    function uibAccoridonGroup($log) {
        return {
            require: '^uibAccordion',         // We need this directive to be inside an accordion
            transclude: true,              // It transcludes the contents of the directive into the template
            replace: true,
            restrict: 'E',
            templateUrl: function (element, attrs) {
                return attrs.templateUrl || 'sky/templates/accordion/uib.accordiongroup.directive.html';
            },
            scope: {
                heading: '@',               // Interpolate the heading attribute onto this scope
                panelClass: '@?',           // Ditto with panelClass
                isOpen: '=?',
                isDisabled: '=?'
            },
            controller: function () {
                this.setHeading = function (element) {
                    this.heading = element;
                };
            },
            link: function (scope, element, attrs, accordionCtrl) {
                var id;

                $log.warn('uibAccordionGroup should not be used as an element directive, instead use as an attribute directive');

                accordionCtrl.addGroup(scope);

                scope.openClass = attrs.openClass || 'panel-open';
                scope.panelClass = attrs.panelClass || 'panel-default';
                scope.$watch('isOpen', function (value) {
                    element.toggleClass(scope.openClass, !!value);
                    if (value) {
                        accordionCtrl.closeOthers(scope);
                    }
                });

                scope.toggleOpen = function ($event) {
                    if (!scope.isDisabled) {
                        if (!$event || $event.which === 32) {
                            scope.isOpen = !scope.isOpen;
                        }
                    }
                };

                id = 'accordiongroup-' + scope.$id + '-' + Math.floor(Math.random() * 10000);
                scope.headingId = id + '-tab';
                scope.panelId = id + '-panel';
            }
        };
    }

    uibAccoridonGroup.$inject = ['$log'];

    angular.module('sky.accordion.uibaccordiongroup', [
            'ui.bootstrap.accordion'
            ])
        .directive('uibAccordionGroup', uibAccoridonGroup);
})();

/*global angular */

(function () {
    'use strict';

    function bbActionBar() {
        return {
            controller: angular.noop,
            controllerAs: 'bbActionBar',
            bindToController: true,
            scope: {},
            transclude: true,
            restrict: 'E',
            templateUrl: 'sky/templates/actionbar/actionbar.html'
        };
    }

    function bbActionBarItemGroup(bbResources, bbMediaBreakpoints) {
        return {
            transclude: true,
            controller: function () {
                var vm = this;

                function onInit() {
                    if (vm.title === null || angular.isUndefined(vm.title)) {
                        vm.title = bbResources.action_bar_actions;
                    }
                }

                vm.$onInit = onInit;

            },
            controllerAs: 'bbActionBarItemGroup',
            bindToController: {
                title: '=?bbActionBarItemGroupTitle'
            },
            restrict: 'E',
            require: 'bbActionBarItemGroup',
            scope: {},
            link: function ($scope, el, attr, vm) {
                function mediaBreakpointHandler(breakpoints) {
                    if (breakpoints.xs) {
                        el.find('.bb-action-bar-buttons > ng-transclude').appendTo(el.find('.bb-action-bar-dropdown > .dropdown > ul'));
                    } else {
                        el.find('.bb-action-bar-dropdown .dropdown > ul > ng-transclude').appendTo(el.find('.bb-action-bar-buttons'));
                    }
                }

                bbMediaBreakpoints.register(mediaBreakpointHandler);

                $scope.$on('$destroy', function () {
                    bbMediaBreakpoints.unregister(mediaBreakpointHandler);
                });

                vm.toggleId = 'bb-action-bar-item-group-' + $scope.$id;
            },
            templateUrl: 'sky/templates/actionbar/actionbaritemgroup.html'
        };
    }

    bbActionBarItemGroup.$inject = ['bbResources', 'bbMediaBreakpoints'];

    function bbActionBarItem(bbMediaBreakpoints) {
        return {
            replace: true,
            controller: angular.noop,
            controllerAs: 'bbActionBarItem',
            bindToController: {
                bbActionBarItemLabel: '@'
            },
            scope: {},
            require: '?^bbActionBarItemGroup',
            transclude: true,
            restrict: 'E',
            link: function ($scope, el, attrs, groupCtrl) {

                function mediaBreakpointHandler(breakpoints) {
                    if (breakpoints.xs) {
                        if (!el.parent().is('li')) {
                            el.wrap('<li role="menuitem"></li>');
                        }

                    } else {
                        if (el.parent().is('li')) {
                            el.unwrap();
                        }
                    }
                }

                if (groupCtrl !== null) {
                    bbMediaBreakpoints.register(mediaBreakpointHandler);

                    $scope.$on('$destroy', function () {
                        bbMediaBreakpoints.unregister(mediaBreakpointHandler);
                        //get rid of wrapper on destroy
                        if (el.parent().is('li')) {
                            el.unwrap();
                        }
                    });
                }
            },
            templateUrl: 'sky/templates/actionbar/actionbaritem.html'
        };
    }

    bbActionBarItem.$inject = ['bbMediaBreakpoints'];

    angular.module('sky.actionbar', ['sky.resources', 'sky.mediabreakpoints', 'ui.bootstrap.dropdown'])
        .directive('bbActionBar', bbActionBar)
        .directive('bbActionBarItemGroup', bbActionBarItemGroup)
        .directive('bbActionBarItem', bbActionBarItem);
}());

/*global angular */

(function () {
    'use strict';

    function Controller() {
        var vm = this;
        vm.close = function () {
            vm.bbAlertClosed = true;
        };
    }   
    
    angular.module('sky.alert.component', ['sky.resources'])
        .component('bbAlert', {
            bindings: {
                bbAlertType: '@',
                bbAlertCloseable: '@',
                bbAlertClosed: '=?'
            },
            templateUrl: 'sky/templates/alert/alert.html',
            transclude: true,
            controller: Controller
        });
}());

/*jslint browser: true, plusplus: true */
/*global angular, jQuery */

(function ($) {
    'use strict';

    function getBaseSettings(bbAutoNumericConfig, configType) {
        var baseSettings,
            configSettings;

        baseSettings = angular.extend(
            {},
            $.fn.autoNumeric.defaults,
            bbAutoNumericConfig.number
        );

        if (configType) {
            configSettings = angular.isObject(configType) ? configType : bbAutoNumericConfig[configType];

            /* istanbul ignore else */
            /* sanity check */
            if (configSettings) {
                angular.extend(baseSettings, configSettings);
            }
        }

        return baseSettings;
    }

    angular.module('sky.autonumeric', ['sky.resources', 'sky.window'])
        .constant('bbAutonumericConfig', {
            number: {
                aSep: ',',
                dGroup: 3,
                aDec: '.',
                pSign: 'p',
                mDec: 2
            },
            money: {
                aSign: '$'
            },
            percent: {
                aSign: '%',
                pSign: 's',
                mDec: 0
            }
        })
        .directive('bbAutonumeric', ['$timeout', 'bbAutonumericConfig', 'bbWindow', '$document', function ($timeout, bbAutoNumericConfig, bbWindow, $document) {
            return {
                require: 'ngModel',
                restrict: 'A',
                link: function ($scope, el, attrs, ngModel) {
                    var customSettings = {},
                        isIosUserAgent = bbWindow.isIosUserAgent();

                    function applySettings() {
                        el.autoNumeric('update', angular.extend({}, getBaseSettings(bbAutoNumericConfig, attrs.bbAutonumeric), customSettings));
                    }

                    function applyCssSettings(el) {
                        if (attrs.bbAutonumeric) {
                            el.addClass('bb-autonumeric-' + attrs.bbAutonumeric);
                        }
                    }

                    function autonumericChange() {
                        return $scope.$apply(function () {

                            var value = parseFloat(el.autoNumeric('get'));

                            if (isNaN(value)) {
                                value = null;
                            }
                            return ngModel.$setViewValue(value);
                        });
                    }

                    if (attrs.bbAutonumericSettings) {
                        $scope.$watch(attrs.bbAutonumericSettings, function (newValue) {
                            customSettings = newValue || {};
                            applySettings();
                        }, true);
                    }

                    el.autoNumeric(getBaseSettings(bbAutoNumericConfig, attrs.bbAutonumeric));
                    applyCssSettings(el);

                    // If a valid number, update the autoNumeric value.
                    // Also handles the model being updated, but being in correct (usually a paste).
                    // In that case, updates the model to what the autoNumeric plugin's value.
                    $scope.$watch(attrs.ngModel, function (newValue, oldValue) {
                        var getValue,
                            selectionStart;
                        if (newValue !== undefined && newValue !== null && !isNaN(newValue)) {

                            if (parseFloat(newValue) !== parseFloat(oldValue)) {

                                selectionStart = el[0].selectionStart;
                            }

                            el.autoNumeric('set', newValue);
                            getValue = el.autoNumeric('get');
                            if (parseFloat(getValue) !== parseFloat(newValue)) {
                                $timeout(autonumericChange);
                            } else if (el[0] && angular.isFunction(el[0].setSelectionRange) && angular.isDefined(selectionStart)) {
                                $timeout(function () {
                                    if ($document[0] && $document[0].activeElement === el[0]) {
                                        el[0].setSelectionRange(selectionStart, selectionStart);
                                    }
                                });
                            }
                        } else if (newValue === null) {
                            el.val(null);

                        }
                    });

                    el.on('keydown', function (event) {
                        if (event.which === 13) {
                            autonumericChange();
                        }
                    });

                    el.on('change paste onpaste', function () {
                        autonumericChange();

                    });

                    // When focusing in textbox, select all.  This is to workaround not having placeholder text for autonumeric.
                    /* istanbul ignore next */
                    /* The test for this code isn't passing on IE 10 on BrowserStack in automated mode.
                        This isn't mission-critical so I'm just ignoring it for now.
                    */
                    el.on('focusin.bbAutonumeric', function () {
                        $timeout(function () {
                            // Check to ensure the field still has focus once the $timeout callback is executed.
                            // https://github.com/blackbaud/skyux/issues/64
                            if (el.is(':focus')) {
                                if (!isIosUserAgent) {
                                    el.select();
                                } else {
                                    //use setSelectionRange instead of select because select in a timeout does not work with iOS
                                    el[0].setSelectionRange(0, 9999);
                                }
                            }
                        });
                    });

                }
            };
        }])
        .filter('bbAutonumeric', ['bbAutonumericConfig', 'bbResources', function (bbAutonumericConfig, bbResources) {
            return function (input, configType, abbreviate) {
                var aSign,
                    dividend,
                    mDec,
                    formatted,
                    settings,
                    suffix,
                    tempEl;

                if (input === null || angular.isUndefined(input)) {
                    return '';
                }

                if (isNaN(input)) {
                    return input;
                }


                tempEl = $('<span></span>');

                settings = getBaseSettings(bbAutonumericConfig, configType);

                if (abbreviate) {
                    if (settings.pSign === 's') {
                        // The suffix needs to go between the number and the currency symbol, so the currency
                        // symbol has to be left off and appended after the number is formatted.
                        aSign = settings.aSign;
                        settings.aSign = '';
                    }

                    input = Math.round(input);

                    if (input >= 1000000000) {
                        dividend = 100000000;
                        suffix = bbResources.autonumeric_abbr_billions;
                    } else if (input >= 1000000) {
                        dividend = 100000;
                        suffix = bbResources.autonumeric_abbr_millions;
                    } else if (input >= 10000) {
                        dividend = 100;
                        suffix = bbResources.autonumeric_abbr_thousands;
                    }

                    if (suffix) {
                        input = Math.floor(input / dividend) / 10;
                        mDec = Math.floor(input) === input ? 0 : 1;
                    } else {
                        mDec = 0;
                    }

                    settings.mDec = mDec;
                }

                tempEl.autoNumeric(settings);
                tempEl.autoNumeric('set', input);

                formatted = tempEl.text();

                if (suffix) {
                    formatted += suffix;
                }

                if (abbreviate && settings.pSign === 's' && aSign) {
                    formatted += aSign;
                }

                return formatted;
            };
        }]);
}(jQuery));

/*global angular, jQuery */

(function ($) {
    'use strict';

    function Controller($filter, $templateCache, $window, bbAvatarConfig, bbErrorModal, bbFormat, bbPalette, bbResources, $element, $scope) {
        var vm = this, blobUrl, templateLoaded;

        function setImageUrl(url) {
            $element.find('.bb-avatar-image').css('background-image', 'url(' + url + ')');
        }

        function getInitial(name) {
            return name.charAt(0).toUpperCase();
        }

        function getInitials(name) {
            var initials,
                nameSplit;

            if (name) {
                nameSplit = name.split(' ');
                initials = getInitial(nameSplit[0]);

                /* istanbul ignore else */ 
                /* this is tested through a visual regression test */
                if (nameSplit.length > 1) {
                    initials += getInitial(nameSplit[nameSplit.length - 1]);
                }
            }

            return initials;
        }

        function getPlaceholderColor(name) {
            var colorIndex,
                colors = bbPalette.getColorSequence(6),
                seed;

            if (name) {
                // Generate a unique-ish color based on the record name.  This is deterministic
                // so that a given name will always generate the same color.
                seed = name.charCodeAt(0) + name.charCodeAt(name.length - 1) + name.length;
                colorIndex = Math.abs(seed % colors.length);
            } else {
                colorIndex = 0;
            }

            return colors[colorIndex];
        }
        function drawPlaceolderImage() {
            var canvas,
                context,
                devicePixelRatio,
                fontSize = "46px",
                initials,
                name,
                size = 100;

            name = vm.bbAvatarName;
            initials = getInitials(name);

            canvas = $element.find('.bb-avatar-initials')[0];
            context = canvas.getContext('2d');

            devicePixelRatio = $window.devicePixelRatio;

            /* istanbul ignore else */
            if (devicePixelRatio) {
                $(canvas)
                    .attr('width', size * devicePixelRatio)
                    .attr('height', size * devicePixelRatio);

                context.scale(devicePixelRatio, devicePixelRatio);
            }

            context.fillStyle = getPlaceholderColor(name);
            context.fillRect(0, 0, canvas.width, canvas.height);

            if (initials) {
                context.font = fontSize + ' Arial';
                context.textAlign = 'center';
                context.fillStyle = '#FFF';
                context.fillText(initials, size * 0.5, size * (2 / 3));
            }
        }

        function revokeBlobUrl() {
            if (blobUrl) {
                $window.URL.revokeObjectURL(blobUrl);
                blobUrl = null;
            }
        }

        function loadPhoto() {
            var src,
                url;

            revokeBlobUrl();

            if (templateLoaded) {
                src = vm.bbAvatarSrc;

                if (src) {
                    if (src instanceof $window.File) {
                        url = $window.URL.createObjectURL(src);

                        // Keep the last blob URL around so we can revoke it later.
                        // https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL
                        blobUrl = url;
                    } else {
                        url = src;
                    }

                    setImageUrl(url);
                } else {
                    drawPlaceolderImage();
                }
            }
        }
        function handleInvalidFileDrop(rejectedFile) {
        
            var errorDescription,
            errorTitle,
            maxFileSizeFormatted;

            if (rejectedFile.type.toUpperCase().indexOf('IMAGE/') !== 0) {
                errorDescription = bbResources.avatar_error_not_image_description;
                errorTitle = bbResources.avatar_error_not_image_title;
            } else {
                maxFileSizeFormatted = $filter('bbFileSize')(bbAvatarConfig.maxFileSize);

                errorDescription = bbFormat.formatText(bbResources.avatar_error_too_large_description, maxFileSizeFormatted);
                errorTitle = bbResources.avatar_error_too_large_title;
            }

            bbErrorModal.open({
                errorDescription: errorDescription,
                errorTitle: errorTitle
            });
        }

        vm.onTemplateLoad = function () {
            templateLoaded = true;
        };

        vm.photoDrop = function (files, rejectedFiles) {
            if (angular.isArray(rejectedFiles) && rejectedFiles.length > 0) {
                handleInvalidFileDrop(rejectedFiles[0]);
            } else {
                vm.bbAvatarChange({
                    file: files[0]
                });
            }
        };

        vm.showInitials = function () {
            return !!(vm.bbAvatarName && !vm.bbAvatarSrc);
        };

        if ($element.attr('bb-avatar-change')) {
            vm.canChange = true;
        }

        $scope.$watch(function () {
            return templateLoaded;
        }, loadPhoto);

        $scope.$watch(function () {
            return vm.bbAvatarSrc;
        }, loadPhoto);

        $scope.$watch(function () {
            return vm.bbAvatarName;
        }, loadPhoto);

        $scope.$on('$destroy', function () {
            revokeBlobUrl();
        });

        vm.maxFileSize = bbAvatarConfig.maxFileSize;
    
    }
    
    Controller.$inject = ['$filter', '$templateCache', '$window', 'bbAvatarConfig', 'bbErrorModal', 'bbFormat', 'bbPalette', 'bbResources', '$element', '$scope'];

    function template($element, $templateCache, bbAvatarConfig) {
        var dropEl;

        $element.html($templateCache.get('sky/templates/avatar/avatar.component.html'));

        dropEl = $element.find('.bb-avatar-file-drop');

        dropEl.attr('bb-file-drop-max-size', bbAvatarConfig.maxFileSize);
    }
    
    template.$inject = ['$element', '$templateCache', 'bbAvatarConfig'];
    
    angular.module('sky.avatar.component', ['sky.avatar.config', 'sky.error', 'sky.format', 'sky.palette', 'sky.resources'])
        .component('bbAvatar', {
            bindings: {
                bbAvatarSrc: '=',
                bbAvatarName: '=',
                bbAvatarChange: '&'
            }, 
            controller: Controller,
            template: template
        });
    
}(jQuery));

/*global angular */

(function () {
    'use strict';

    var bbAvatarConfig = {
        maxFileSize: 500000
    };

    angular.module('sky.avatar.config', [])
        .constant('bbAvatarConfig', bbAvatarConfig);
}());

/*global angular */

(function () {
    'use strict';

    var components = [{
            name: 'Title',
            cls: 'title'
        }, {
            name: 'Content',
            cls: 'content'
        }, {
            name: 'Actions',
            cls: 'actions'
        }],
        cardModule = angular.module('sky.card.directive', ['sky.check']),
        nextId = 0;

    function makeCardComponent(component) {
        var controllerName,
            name = component.name;

        function Controller($scope) {
            var vm = this;

            $scope.$on('$destroy', function () {
                vm.onDestroy();
                vm = null;
            });
        }

        Controller.$inject = ['$scope'];

        function componentFn() {
            function link(scope, el, attrs, ctrls) {
                var vm = ctrls[0],
                    bbCard = ctrls[1];

                vm.el = el;

                bbCard['set' + name](vm);
            }

            return {
                restrict: 'E',
                require: ['bbCard' + name, '^bbCard'],
                controller: controllerName,
                controllerAs: 'bbCard' + name,
                bindToController: true,
                link: link,
                scope: {}
            };
        }

        controllerName = 'BBCard' + name + 'Controller';

        cardModule
            .controller(controllerName, Controller)
            .directive('bbCard' + name, componentFn);
    }

    function getCtrlPropName(component) {
        var name = component.name;

        return name.charAt(0).toLowerCase() + name.substr(1) + 'Ctrl';
    }

    function BBCardController($timeout, $scope) {
        var vm = this;

        function addComponentSetter(component) {
            var name = component.name;

            vm['set' + name] = function (ctrl) {
                var propName = getCtrlPropName(component);

                vm[propName] = ctrl;

                ctrl.onDestroy = function () {
                    vm[propName] = null;
                };
            };
        }

        function cardIsSelectable() {
            return vm.bbCardSelectable === 'true';
        }

        function cardSelectionToggled(isSelected) {
            $timeout(function () {
                if (angular.isFunction(vm.bbCardSelectionToggled)) {
                    vm.bbCardSelectionToggled({isSelected: isSelected});
                }
            });
            
        }

        vm.cardSelectionToggled = cardSelectionToggled;

        vm.cardIsSelectable = cardIsSelectable;

        components.forEach(addComponentSetter);

        vm.getClass = function () {
            var cls = [];

            switch (vm.bbCardSize) {
            case 'small':
                cls.push('bb-card-small');
                break;
            }

            if (vm.bbCardSelectable) {
                cls.push('bb-card-selectable');

                if (vm.bbCardSelected) {
                    cls.push('bb-card-selected');
                }
            }

            return cls;
        };

        nextId++;
        vm.cardCheckId = 'bb-card-check-' + nextId;

        $scope.$emit('bbCardInitialized', {
            cardCtrl: vm
        });
    }

    BBCardController.$inject = ['$timeout', '$scope'];

    function bbCard() {
        function link(scope, el, attrs, ctrls) {
            var vm = ctrls[0];
            function watchForComponent(component) {
                scope.$watch(function () {
                    return vm[getCtrlPropName(component)];
                }, function (newValue) {
                    if (newValue) {
                        el.find('.bb-card-' + component.cls)
                            .empty()
                            .append(newValue.el);
                    }
                });
            }

            components.forEach(watchForComponent);
        }

        return {
            bindToController: {
                bbCardSelectable: '@?',
                bbCardSelected: '=?',
                bbCardSelectionToggled: '&?',
                bbCardSize: '@?'
            },
            require: ['bbCard'],
            controller: 'BBCardController',
            controllerAs: 'bbCard',
            link: link,
            restrict: 'E',
            scope: {},
            templateUrl: 'sky/templates/card/card.directive.html',
            transclude: true
        };
    }

    cardModule
        .controller('BBCardController', BBCardController)
        .directive('bbCard', bbCard);

    components.forEach(makeCardComponent);
}());

/*global angular */

(function () {
    'use strict';

    var MAX_DOTS = 10;

    function Controller($scope, $element, bbFormat, bbResources) {
        var currentItemIndex,
            currentItem,
            vm = this;

        function getItemEls() {
            return $element[0].querySelectorAll('.bb-carousel-item');
        }

        function allowIndex(itemIndex) {
            return itemIndex >= 0 && itemIndex < getItemEls().length; 
        }

        function createDots() {
            var i,
                itemCount = getItemEls().length,
                nextDot;

            vm.dots = [];
            if (itemCount <= MAX_DOTS) {
                for (i = 0; i < itemCount; i++) {
                    vm.dots.push(i);
                }
            } else {
                for (i = 0; i < MAX_DOTS; i++) {
                    nextDot = Math.floor((i * itemCount / (MAX_DOTS)));
                    vm.dots.push(nextDot);
                }
            }
        }

        function createTransformCss(offset) {
            if (offset) {
                return 'translate3d(' + offset + '%, 0, 0) scale(0.9)';    
            }

            return 'none';
        }

        function getElIndex(item) {
            var i,
                itemEls = getItemEls(),
                n;

            for (i = 0, n = itemEls.length; i < n; i++) {
                if (item.elIsItem(itemEls[i])) {
                    return i;
                }
            }
        }

        function getElItem(index) {
            var el,
                i,
                items = vm.items,
                itemEls = getItemEls(),
                n;
            /* istanbul ignore else */
            /* sanity check */
            if (index < itemEls.length) {
                el = itemEls[index];

                for (i = 0, n = items.length; i < n; i++) {
                    if (items[i].elIsItem(el)) {
                        return items[i];
                    }
                }
            }
        }

        currentItemIndex = 0;

        vm.items = [];

        vm.addItem = function (item) {
            vm.items.push(item);

            if ((angular.isUndefined(vm.bbCarouselSelectedIndex) && vm.items.length === 1) || vm.bbCarouselSelectedIndex === (vm.items.length - 1)) {
                vm.setSelectedItem(vm.bbCarouselSelectedIndex || 0, true);
            }
            
        };

        vm.removeItem = function (item) {
            var elIndex,
                i,
                items = vm.items,
                index,
                n;

            //Remove the item from the item array;
            for (i = 0, n = items.length; i < n; i++) {
                if (items[i] === item) {
                    index = i;
                    break;
                }
            }       

            items.splice(index, 1);

            //Update selected element index.
            if (currentItemIndex >= (items.length)) {
                //If the selected index is out of bounds after removal, select the last element
                vm.setSelectedItem(items.length - 1, true);
            } else {
                //If the current selected item is still in the array but at a different index, update the current selected index.  This would happen
                //if an item before the current selected item is removed.  In that case, the indexes would have shifted.
                elIndex = getElIndex(currentItem);
                if (elIndex >= 0 && elIndex !== currentItemIndex) {
                    vm.setSelectedItem(elIndex, true);
                }
            }
        };

        vm.setSelectedItem = function (item, skipChange) {
            var i,
                itemEl,
                itemEls,
                n,
                offset;

            if (typeof item !== 'number') {
                item = getElIndex(item);
            }

            /*istanbul ignore if */
            if (!allowIndex(item)) {
                return;
            }

            offset = item * -100;

            itemEls = getItemEls();

            /*istanbul ignore else */
            if (itemEls) {
                for (i = 0, n = itemEls.length; i < n; i++) {
                    itemEl = itemEls[i];
                    itemEl.style.transform = createTransformCss(offset);

                    offset += 100;
                }
            }

            currentItemIndex = item;
            currentItem = getElItem(item);

            vm.allowPrevious = currentItemIndex > 0;
            vm.allowNext = currentItemIndex < itemEls.length - 1;

            if (!skipChange && angular.isFunction(vm.bbCarouselSelectedIndexChange)) {
                vm.bbCarouselSelectedIndexChange({
                    index: currentItemIndex
                });
            }
        };

        vm.nextCard = function () {
            vm.setSelectedItem(currentItemIndex + 1);
        };

        vm.previousCard = function () {
            vm.setSelectedItem(currentItemIndex - 1);
        };

        vm.dotIsSelected = function (dot) {
            var dotIndex,
                dots = vm.dots,
                itemIndex = currentItemIndex;

            if (dot === itemIndex) {
                return true;
            }

            dotIndex = dots.indexOf(dot);

            if (dotIndex === dots.length - 1) {
                if (currentItemIndex > dots[dotIndex]) {
                    return true;
                }
            } else if (itemIndex > dots[dotIndex] && itemIndex < dots[dotIndex + 1]) {
                return true;
            }

            return false;
        };

        vm.getDotLabel = function (dot) {
            return bbFormat.formatText(bbResources.carousel_dot_label, dot + 1);
        };

        $scope.$watchCollection(function () {
            return vm.items;
        }, function () {
            createDots();
            vm.setSelectedItem(currentItemIndex, true);
        });

        function onChanges(changesObj) {
            /* istanbul ignore else */
            /* sanity check */
            if (changesObj.bbCarouselSelectedIndex && angular.isDefined(changesObj.bbCarouselSelectedIndex.currentValue)) {
                vm.setSelectedItem(changesObj.bbCarouselSelectedIndex.currentValue || 0, true);
            }
        }

        vm.$onChanges = onChanges;

    }

    Controller.$inject = ['$scope', '$element', 'bbFormat', 'bbResources'];

    angular.module('sky.carousel.component', ['ngTouch', 'sky.format', 'sky.resources'])
        .component('bbCarousel', {
            bindings: {
                bbCarouselSelectedIndex: '<?',
                bbCarouselSelectedIndexChange: '&?',
                bbCarouselStyle: '@'
            },
            templateUrl: 'sky/templates/carousel/carousel.component.html',
            transclude: true,
            controller: Controller
        });
}());

/*global angular */

(function () {
    'use strict';

    function Controller($element, $scope) {
        var vm = this;

        vm.elIsItem = function (el) {
            return $element[0].contains(el);
        };

        vm.itemClick = function () {
            vm.carouselCtrl.setSelectedItem(vm);
        };

        vm.$onInit = function () {
            vm.carouselCtrl.addItem(vm);
        };

        vm.$onDestroy = function () {
            $element.find('.bb-carousel-item').removeClass('bb-carousel-item');
            vm.carouselCtrl.removeItem(vm);
        };

        // There's no "ng-focusin" equivalent so we have to attach the handler
        // here instead.
        $element.on('focusin', function () {
            // Select this item when it or any of its child elements receive focus.
            // Otherwise if the user is tabbing through focusable elements inside
            // the item the browser will scroll the carousel container itself
            // and throw off the positioning of the selected item.
            vm.carouselCtrl.setSelectedItem(vm);
            $scope.$apply();
        });
    }

    Controller.$inject = ['$element', '$scope'];

    angular.module('sky.carousel.item.component', [])
        .component('bbCarouselItem', {
            bindings: {},
            require: {
                carouselCtrl: '^bbCarousel'
            },
            templateUrl: 'sky/templates/carousel/carousel.item.component.html',
            transclude: true,
            controller: Controller
        });
}());

/*jshint browser: true */
/*global angular */

(function () {
    'use strict';
    angular.module('sky.check', [])
        .directive('bbCheck', ['$templateCache', '$compile', function ($templateCache, $compile) {
            function createEl(name, scope) {
                var templateHtml;
                
                templateHtml = $templateCache.get('sky/templates/check/' + name + '.html');
                if (scope) {
                    templateHtml = $compile(templateHtml)(scope);
                }
                return angular.element(templateHtml);
            }

            return {
                link: function (scope, el, attr) {
                    var labelEl = el.parent('label'),
                        styledEl;

                    if (labelEl.length < 1) {
                        el.wrap(createEl('wrapper'));
                    } else {
                        labelEl.addClass('bb-check-wrapper');

                        /*  wrap non-whitespace label text to set
                            vertical-align middle properly */ 
                        labelEl.contents()
                        .filter(function () {
                            return this.nodeType === 3 && /\S/.test(this.textContent);
                        })
                        .wrap(createEl('labeltext'));
                    }
                    
                    
                    styledEl = createEl(('styled' + attr.type), scope);


                    el.after(styledEl);
                }
            };
        }]);
}());

/*global angular */

(function () {
    'use strict';

    var SEARCH_PROPS = ['title', 'description'];

    function BBChecklistController($scope, bbChecklistUtility, bbResources) {
        var vm = this;

        function itemMatchesCategory(item, category) {
            return !category || item.category === category;
        }

        function itemInSubset(item, subsetSelected) {
            if (!vm.bbChecklistSubsetLabel || angular.isUndefined(item[vm.bbChecklistSubsetProperty]) || item[vm.bbChecklistSubsetProperty] === false) {
                return true;
            }

            if (vm.subsetExclude) {
                return item[vm.bbChecklistSubsetProperty] !== subsetSelected;
            } else {
                return item[vm.bbChecklistSubsetProperty] === subsetSelected;
            }

        }

        function itemIsSelected(item) {
            return bbChecklistUtility.contains(vm.bbChecklistSelectedItems, item);
        }


        function itemMatchesFilter(item, category, searchTextUpper) {
            var i,
                p,
                len,
                val;


            if (itemMatchesCategory(item, category)) {
                if (itemInSubset(item, vm.subsetSelected)) {
                    if (!searchTextUpper) {
                        return true;
                    }

                    for (i = 0, len = SEARCH_PROPS.length; i < len; i++) {
                        p = SEARCH_PROPS[i];
                        if (item.hasOwnProperty(p)) {
                            val = item[p];

                            if (angular.isString(val) && val.toUpperCase().indexOf(searchTextUpper) >= 0) {
                                return true;
                            }
                        }
                    }
                }
            }

            return false;
        }

        function invokeFilterLocal() {
            var filteredItems,
                i,
                item,
                items = vm.bbChecklistItems,
                n,
                searchTextUpper = (vm.searchText || '').toUpperCase(),
                selectedCategory = vm.selectedCategory;

            if (!searchTextUpper && !selectedCategory && !vm.bbChecklistSubsetLabel && !vm.onlyShowSelected) {
                filteredItems = items.slice(0);
            } else {
                filteredItems = [];

                for (i = 0, n = items.length; i < n; i++) {
                    item = items[i];

                    if (itemMatchesFilter(item, selectedCategory, searchTextUpper)) {
                        filteredItems.push(item);
                    }
                }
            }

            vm.filteredItems = filteredItems;
        }
        

        function invokeFilter() {
            /* When the show only selected items checkbox is checked,
               then no other filters should be applied */
            if (vm.onlyShowSelected) {
                /*istanbul ignore next */
                /* sanity check */
                vm.filteredItems = vm.bbChecklistSelectedItems || [];
            } else if (vm.filterLocal) {
                invokeFilterLocal();
            } else if (vm.bbChecklistFilterCallback) {
                vm.bbChecklistFilterCallback({
                    searchText: vm.searchText,
                    category: vm.selectedCategory,
                    subsetSelected: vm.subsetSelected
                });
            }
        }

        function eachFilteredItem(callback) {
            var filteredItemsCopy = angular.copy(vm.filteredItems);
            filteredItemsCopy.forEach(callback);
        }

        function selectItem(item) {
            bbChecklistUtility.add(vm.bbChecklistSelectedItems, item);
        }

        function unselectItem(item) {
            bbChecklistUtility.remove(vm.bbChecklistSelectedItems, item);
        }

        vm.selectAll = function () {
            eachFilteredItem(selectItem);
        };

        vm.clear = function () {
            eachFilteredItem(unselectItem);
        };

        vm.rowClicked = function (item) {
            if (!itemIsSelected(item)) {
                selectItem(item);
            } else {
                unselectItem(item);
            }
        };

        vm.isSingleSelect = function () {
            return vm.bbChecklistSelectStyle === 'single';
        };

        vm.getChecklistCls = function () {
            return {
                'bb-checklist-single': vm.isSingleSelect()
            };
        };

        vm.getRowCls = function (item) {
            return {
                'bb-checklist-row-selected': itemIsSelected(item)
            };
        };

        vm.singleSelectRowClick = function (item) {
            vm.bbChecklistSelectedItems = [item];

            $scope.$emit('bbPickerSelected', {
                selectedItems: vm.bbChecklistSelectedItems
            });
        };

        /*  Ensure that clicking input does not also cause the
            row click function to be called */
        vm.inputClicked = function ($event) {
            $event.stopPropagation();
        };

        vm.setColumns = function (columns) {
            vm.columns = columns;
        };

        function onInit() {
            vm.bbChecklistSelectedItems = vm.bbChecklistSelectedItems || [];
            vm.itemIsSelected = itemIsSelected;

            $scope.$watch(function () {
                return vm.bbChecklistItems;
            }, function () {
                vm.filteredItems = vm.bbChecklistItems;
                vm.highlightRefresh = new Date().getTime();
            });

            $scope.$watch(function () {
                return vm.searchText;
            }, function (newValue, oldValue) {
                if (newValue !== oldValue) {
                    invokeFilter();
                }
            });

            if (angular.isDefined(vm.bbChecklistCategories)) {
                vm.allCategories = 'bbChecklistAllCategories';
                vm.selectedOption = vm.allCategories;
                if (angular.isUndefined(vm.bbChecklistAllCategoriesLabel)) {
                    vm.bbChecklistAllCategoriesLabel = bbResources.grid_column_picker_all_categories;
                }
                $scope.$watch(function () {
                    return vm.selectedOption;
                }, function (newValue, oldValue) {
                    if (newValue === vm.allCategories) {
                        vm.selectedCategory = null;
                    } else {
                        vm.selectedCategory = newValue;
                    }
                    if (newValue !== oldValue) {
                        invokeFilter();
                    }
                });
            }

            if (angular.isDefined(vm.bbChecklistSubsetLabel)) {
                $scope.$watch(function () {
                    return vm.subsetSelected;
                }, function () {
                    invokeFilter();
                });
            }

            $scope.$watch(function () {
                return vm.onlyShowSelected;
            }, function () {
                invokeFilter();
            });


            $scope.$emit('bbPickerReady', {
                setSelectedItems: function (selectedItems) {
                    vm.bbChecklistSelectedItems = selectedItems;
                }
            });
        }

        vm.$onInit = onInit;
    }

    BBChecklistController.$inject = ['$scope', 'bbChecklistUtility', 'bbResources'];

    angular.module('sky.checklist.controller', ['sky.checklist.utility', 'sky.resources'])
        .controller('BBChecklistController', BBChecklistController);
}());

/*jslint browser: true */
/*global angular */

(function () {
    'use strict';

    function bbChecklist($timeout) {
        return {
            replace: true,
            restrict: 'E',
            transclude: true,
            templateUrl: 'sky/templates/checklist/checklist.directive.html',
            bindToController: {
                bbChecklistItems: '=',
                bbChecklistSelectedItems: '=?',
                bbChecklistFilterCallback: '=?',
                bbChecklistIncludeSearch: '=?',
                bbChecklistSearchDebounce: '=?',
                bbChecklistSearchPlaceholder: '@',
                bbChecklistNoItemsMessage: '@',
                bbChecklistAutomationField: '=?',
                bbChecklistCategories: '=?',
                bbChecklistMode: '@?',
                bbChecklistSelectStyle: '@?',
                bbChecklistIsLoading: '=?',
                bbChecklistSubsetLabel: '=?',
                bbChecklistSubsetProperty: '@?',
                bbChecklistAllCategoriesLabel: '<?'
            },
            controller: 'BBChecklistController',
            controllerAs: 'bbChecklist',
            scope: {},
            link: function (scope, el, attrs, vm) {
                vm.filterLocal = angular.isDefined(attrs.bbChecklistFilterLocal);
                vm.subsetExclude = angular.isDefined(attrs.bbChecklistSubsetExclude);
                vm.focusSearch = attrs.bbChecklistFocusSearch;
                if (angular.isDefined(attrs.bbChecklistFocusSearch)) {
                    $timeout(function () {
                        el.find('.bb-checklist-search-box').focus();
                    }, 500);
                }
                vm.onlySelectedAvailable = angular.isDefined(attrs.bbChecklistOnlySelected);
            }
        };
    }

    bbChecklist.$inject = ['$timeout'];

    angular.module(
        'sky.checklist.directive',
        [
            'sky.check',
            'sky.checklist.controller',
            'sky.resources',
            'sky.wait'
        ]
    )
        .directive('bbChecklist', bbChecklist);
}());

/*global angular */

(function () {
    'use strict';

    function bbChecklistColumn() {
        return {
            require: ['bbChecklistColumn', '^bbChecklistColumns'],
            restrict: 'E',
            bindToController: {
                bbChecklistColumnCaption: "=",
                bbChecklistColumnField: "=",
                bbChecklistColumnClass: "=",
                bbChecklistColumnWidth: "=",
                bbChecklistColumnAutomationId: "="
            },
            controller: function () {},
            controllerAs: 'bbChecklistColumn',
            scope: {},
            link: function ($scope, element, attrs, ctrls) {
                var bbChecklistColumns = ctrls[1],
                    column,
                    vm = ctrls[0];

                column = {
                    caption: vm.bbChecklistColumnCaption,
                    field: vm.bbChecklistColumnField,
                    'class': vm.bbChecklistColumnClass,
                    width: vm.bbChecklistColumnWidth,
                    automationId: vm.bbChecklistColumnAutomationId
                };

                bbChecklistColumns.addColumn(column);
            }
        };
    }

    angular.module('sky.checklist.column.directive', ['sky.checklist.columns.directive'])
        .directive('bbChecklistColumn', bbChecklistColumn);
}());

/*global angular */

(function () {
    'use strict';

    function BBChecklistColumnsController() {
        var vm = this;

        vm.columns = [];

        vm.addColumn = function (column) {
            vm.columns.push(column);
        };
    }

    angular.module('sky.checklist.columns.controller', [])
        .controller('BBChecklistColumnsController', BBChecklistColumnsController);
}());

/*global angular */

(function () {
    'use strict';

    function bbChecklistColumns() {
        function link($scope, element, attrs, ctrls) {
            var bbChecklist = ctrls[1],
                vm = ctrls[0];

            bbChecklist.setColumns(vm.columns);
        }

        return {
            require: ['bbChecklistColumns', '^bbChecklist'],
            restrict: 'E',
            scope: {},
            bindToController: {},
            controller: 'BBChecklistColumnsController',
            controllerAs: 'bbChecklistColumns',
            link: link
        };
    }

    angular.module('sky.checklist.columns.directive', ['sky.checklist.columns.controller'])
        .directive('bbChecklistColumns', bbChecklistColumns);
}());

/*global angular */

(function () {
    'use strict';

    function checklistModel($compile, $parse, bbChecklistUtility) {
        // http://stackoverflow.com/a/19228302/1458162
        function postLinkFn(scope, elem, attrs) {
            var getter,
                setter,
                value;

            // compile with `ng-model` pointing to `checked`
            $compile(elem)(scope);

            // getter / setter for original model
            getter = $parse(attrs.checklistModel);
            setter = getter.assign;

            // value added to list
            value = $parse(attrs.checklistValue)(scope.$parent);

            // watch UI checked change
            scope.$watch('checked', function (newValue, oldValue) {
                var current;

                if (newValue === oldValue) {
                    return;
                }

                current = getter(scope.$parent);

                if (newValue === true) {
                    setter(scope.$parent, bbChecklistUtility.add(current, value));
                } else {
                    setter(scope.$parent, bbChecklistUtility.remove(current, value));
                }
            });

            // watch original model change
            scope.$parent.$watch(attrs.checklistModel, function (newArr) {
                scope.checked = bbChecklistUtility.contains(newArr, value);
            }, true);
        }

        return {
            restrict: 'A',
            priority: 1000,
            terminal: true,
            scope: true,
            compile: function (tElement, tAttrs) {
                if (tElement[0].tagName !== 'INPUT' || !tElement.attr('type', 'checkbox')) {
                    throw 'checklist-model should be applied to `input[type="checkbox"]`.';
                }

                if (!tAttrs.checklistValue) {
                    throw 'You should provide `checklist-value`.';
                }

                // exclude recursion
                tElement.removeAttr('checklist-model');

                // local scope var storing individual checkbox model
                tElement.attr('ng-model', 'checked');

                return postLinkFn;
            }
        };
    }

    checklistModel.$inject = ['$compile', '$parse', 'bbChecklistUtility'];

    angular.module('sky.checklist.model.directive', ['sky.checklist.utility'])
        .directive('checklistModel', checklistModel);
}());

/*global angular */

(function () {
    'use strict';

    angular.module('sky.checklist.utility', [])
        .factory('bbChecklistUtility', function () {
            return {

                contains: function (arr, item) {
                    var i;

                    if (angular.isArray(arr)) {
                        for (i = 0; i < arr.length; i += 1) {
                            if (angular.equals(arr[i], item)) {
                                return true;
                            }
                        }
                    }
                    return false;
                },

                // add
                add: function (arr, item, isSingleSelect) {
                    var i;

                    arr = !isSingleSelect && angular.isArray(arr) ? arr : [];
                    for (i = 0; i < arr.length; i += 1) {
                        if (angular.equals(arr[i], item)) {
                            return arr;
                        }
                    }
                    arr.push(item);
                    return arr;
                },

                // remove
                remove: function (arr, item) {
                    var i;

                    if (angular.isArray(arr)) {
                        for (i = 0; i < arr.length; i += 1) {
                            if (angular.equals(arr[i], item)) {
                                arr.splice(i, 1);
                                break;
                            }
                        }
                    }
                    return arr;
                }

            };
        });
}());

/*global angular */

(function () {
    'use strict';

    angular.module('sky.chevron.component', ['sky.chevron.controller'])
        .component('bbChevron', {
            bindings: {
                bbChevronDirection: '=?'
            },
            controller: 'BBChevronController',
            templateUrl: 'sky/templates/chevron/chevron.component.html'
        });
}());
/*global angular */

(function () {
    'use strict';

    function BBChevronController(bbResources) {
        var vm = this;

        function getDirection() {
            return vm.bbChevronDirection || 'up';
        }

        vm.getCls = function () {
            return 'bb-chevron-flip-' + getDirection();
        };

        vm.getLabel = function () {
            return bbResources['chevron_' + (getDirection() === 'up' ? 'collapse' : 'expand')];
        };

        vm.click = function ($event) {
            $event.stopPropagation();

            vm.bbChevronDirection = (getDirection() === 'up' ? 'down' : 'up');
        };
    }

    BBChevronController.$inject = ['bbResources'];

    angular.module('sky.chevron.controller', ['sky.resources'])
        .controller('BBChevronController', BBChevronController);
}());

/*global angular */

(function () {
    'use strict';

    function BBContextMenuButtonController(bbResources) {
        var vm = this;

        vm.getAriaLabel = function () {
            var ariaLabel;

            if (vm.bbContextMenu) {
                ariaLabel = vm.bbContextMenu.getAriaLabel();
            }

            if (!ariaLabel) {
                ariaLabel = vm.bbContextMenuButtonLabel || bbResources.context_menu_default_label;
            }

            return ariaLabel;
        };
    }

    BBContextMenuButtonController.$inject = ['bbResources'];

    angular.module('sky.contextmenu.button.controller', ['sky.resources'])
        .controller('BBContextMenuButtonController', BBContextMenuButtonController);
}());

/*global angular */

(function () {
    'use strict';

    function buttonTemplate(elem, attrs) {
        var templateEl = angular.element('<button type="button" class="btn bb-btn-secondary bb-context-menu-btn" aria-label="{{bbContextMenuButton.getAriaLabel()}}">' +
                                            '<i class="fa fa-ellipsis-h"></i>' +
                                            '</button>');

        if (angular.isDefined(attrs.bbContextMenuButtonDropdownToggle)) {
            templateEl.attr('uib-dropdown-toggle', 'true');
        }

        return templateEl;
    }

    function bbContextMenuButton() {
        function link(scope, el, attrs, ctrls) {
            var bbContextMenu = ctrls[1],
                vm = ctrls[0];

            vm.bbContextMenu = bbContextMenu;
        }
        
        return {
            bindToController: {
                bbContextMenuButtonLabel: '@'
            },
            controller: 'BBContextMenuButtonController',
            controllerAs: 'bbContextMenuButton',
            link: link,
            restrict: 'E',
            require: ['bbContextMenuButton', '?^bbContextMenu'],
            scope: {},
            template: buttonTemplate
        };
    }

    angular.module(
        'sky.contextmenu.button.directive',
        [
            'sky.contextmenu.button.controller',
            'sky.resources'
        ]
    )
        .directive('bbContextMenuButton', bbContextMenuButton);
}());

/* global angular */

(function () {
    'use strict';

    function BBContextMenuController() {
        var vm = this;

        vm.contextButtonStopPropagation = function ($event) {
            $event.stopPropagation();
        };

        vm.getAriaLabel = function () {
            return vm.bbContextMenuLabel;
        };
    }

    angular.module('sky.contextmenu.controller', [])
        .controller('BBContextMenuController', BBContextMenuController);
}());

/* global angular */

(function () {
    'use strict';

    function bbContextMenu() {
        return {
            bindToController: {
                bbContextMenuLabel: '@'
            },
            controller: 'BBContextMenuController',
            controllerAs: 'bbContextMenu',
            restrict: 'E',
            scope: {},
            transclude: true,
            templateUrl: 'sky/templates/contextmenu/contextmenu.html'
        };
    }

    angular.module('sky.contextmenu.directive', ['ui.bootstrap.dropdown', 'ui.bootstrap.accordion', 'sky.contextmenu.controller'])
        .directive('bbContextMenu', bbContextMenu);
}());

/*global angular */

(function () {
    'use strict';

    function bbContextMenuItem() {
        return {
            bindToController: {
                clickItem: '&bbContextMenuAction'
            },
            controller: angular.noop,
            controllerAs: 'bbContextMenuItem',
            restrict: 'E',
            transclude: true,
            scope: {},
            templateUrl: 'sky/templates/contextmenu/menuitem.html'
        };
    }

    angular.module('sky.contextmenu.item.directive', [])
        .directive('bbContextMenuItem', bbContextMenuItem);
}());

/*global angular */

(function () {
    'use strict';

    function bbContextMenuToggleAccordion() {
        return function ($event, vm) {
            $event.preventDefault();
            $event.stopPropagation();
            vm.accordionOpen = !vm.accordionOpen;
        };
    }

    angular.module('sky.contextmenu.toggleaccordion.factory', [])
        .factory('bbContextMenuToggleAccordion', bbContextMenuToggleAccordion);

}());

/* global angular */

(function () {
    'use strict';

    function bbSubmenu(bbContextMenuToggleAccordion) {
        return {
            bindToController: {
                heading: '=?bbSubmenuHeading'
            },
            controller: angular.noop,
            controllerAs: 'bbSubmenu',
            restrict: 'E',
            scope: {},
            link: function (scope, el, attrs, vm) {
                vm.accordionOpen = false;
                vm.staticHeader = false;

                if (angular.isDefined(attrs.bbSubmenuHeading)) {
                    vm.staticHeader = true;
                }
                vm.toggleAccordion = function ($event) {
                    bbContextMenuToggleAccordion($event, vm);
                };
            },
            transclude: true,
            templateUrl: 'sky/templates/contextmenu/submenu.html'
        };
    }

    bbSubmenu.$inject = ['bbContextMenuToggleAccordion'];

    angular.module(
        'sky.submenu.directive',
        [
            'sky.submenu.heading.directive',
            'sky.contextmenu.toggleaccordion.factory',
            'ui.bootstrap.dropdown',
            'ui.bootstrap.accordion'
        ]
    )
        .directive('bbSubmenu', bbSubmenu);
}());

/* global angular */

(function () {
    'use strict';

    function bbSubmenuHeading() {
        return {
            bindToController: true,
            controller: angular.noop,
            controllerAs: 'bbSubmenuHeading',
            restrict: 'E',
            require: ['bbSubmenuHeading', '^bbSubmenu'],
            scope: true,
            link: function ($scope, el, attrs, ctrls) {
                var submenuCtrl = ctrls[1],
                    vm = ctrls[0];

                vm.submenuCtrl = submenuCtrl;

                vm.toggleAccordion = function ($event) {
                    submenuCtrl.toggleAccordion($event);
                };
            },
            transclude: true,
            templateUrl: 'sky/templates/contextmenu/submenuheading.html'
        };
    }

    angular.module('sky.submenu.heading.directive', [])
        .directive('bbSubmenuHeading', bbSubmenuHeading);
}());

/*global angular, jQuery */

(function ($) {
    'use strict';

    var DEFAULT_PROP = '__DEFAULT__',
        REQUEST_TYPE_DATA = 0,
        REQUEST_TYPE_RESOURCES = 1,
        REQUEST_TYPE_TEXT = 2;

    function fillUrls(option, props, urls) {
        var item,
            p,
            url;

        /*istanbul ignore else */
        /* sanity check */
        if (option) {
            if (angular.isString(option) || option.BB_DATA_POST) {
                url = option;

                option = {};
                option[DEFAULT_PROP] = url;
            }

            for (p in option) {
                /*istanbul ignore else */
                if (option.hasOwnProperty(p)) {
                    item = option[p];
                    url = item;

                    props.push(p);
                    urls.push(url);
                }
            }
        }
    }

    function loadManager(options) {
        // A service endpoint for tracking loading items.

        var item,
            loadingItems = [],
            nonblockingForAdditionalItems = false,
            result,
            scope,
            waitingForFirstItem = false;

        function cancelWaiting() {
            options.waitForFirstItem = false;
            options.nonblockWaitForAdditionalItems = false;

            if (nonblockingForAdditionalItems) {
                nonblockingForAdditionalItems = false;
                scope.$emit("bbEndWait", { nonblocking: true });
            }

            if (waitingForFirstItem) {
                waitingForFirstItem = false;
                scope.$emit("bbEndWait");
            }
        }

        function startNonblockingForAdditionalItems() {
            nonblockingForAdditionalItems = true;
            scope.$emit("bbBeginWait", { nonblocking: true });
        }

        function markCompleted(item) {
            var i = loadingItems.indexOf(item);

            if (i !== -1) {
                loadingItems.splice(i, 1);
                if (loadingItems.length === 0) {
                    result.isLoading = false;

                    if (nonblockingForAdditionalItems) {
                        nonblockingForAdditionalItems = false;
                        scope.$emit("bbEndWait", { nonblocking: true });
                    }
                }
            }

            if (!result.isFirstItemLoaded) {
                result.isFirstItemLoaded = true;
                if (waitingForFirstItem) {
                    waitingForFirstItem = false;
                    scope.$emit("bbEndWait");
                }
            }

            if (result.isLoading && options.nonblockWaitForAdditionalItems && !nonblockingForAdditionalItems) {
                startNonblockingForAdditionalItems();
            }
        }

        function registerItem(item) {
            if (!result.isLoading) {
                if (result.isFirstItemLoaded && options.nonblockWaitForAdditionalItems) {
                    startNonblockingForAdditionalItems();
                }
            }
            loadingItems.push(item);
            result.isLoading = true;
        }

        // Initialize values
        scope = options.scope;

        if (options.load) {
            item = {
                name: options.name,
                load: options.load
            };
        }

        result = {
            isFirstItemLoaded: false,
            isLoading: false,
            loadingItems: loadingItems,
            cancelWaiting: cancelWaiting
        };

        if (options.waitForFirstItem) {
            waitingForFirstItem = true;
            scope.$emit("bbBeginWait");
        }

        // Start loading any item that is handed directly to the loader.
        if (item) {
            // Add the current item to the list.
            registerItem(item);

            // Start loading the item.
            result.loaded = item.load().finally(function () {
                markCompleted(item);
                scope.$parent.$emit("bbData.loadManager.markCompleted", item);
            });

            scope.$parent.$emit("bbData.loadManager.registerItem", item);
        }

        if (options.isAggregate) {
            // Listen to items being registered by child loadManagers.
            scope.$on("bbData.loadManager.registerItem", function (e, item) {
                e.stopPropagation();
                registerItem(item);
            });

            // Listen to items being marked completed by child loadManagers.
            scope.$on("bbData.loadManager.markCompleted", function (e, item) {
                e.stopPropagation();
                markCompleted(item);
            });
        }

        return result;
    }

    function bbData($http, $q, $templateCache, bbDataConfig, $window) {
        function ajaxUrl(url, requestType) {
            var filter,
                parts;

            requestType = requestType || 0;

            if ($window.define && $window.define.amd && $window.require) {
                parts = url.split('?');

                // Grab the portion before the query string and get the fully-qualified URL.
                url = parts.shift();
                url = $window.require.toUrl(url);

                // If there was anything after the first question mark, put it back.
                url += '?' + parts.join('');
            }

            switch (requestType) {
            case REQUEST_TYPE_DATA:
                filter = bbDataConfig.dataUrlFilter;
                break;
            case REQUEST_TYPE_RESOURCES:
                filter = bbDataConfig.resourceUrlFilter;
                break;
            case REQUEST_TYPE_TEXT:
                filter = bbDataConfig.textUrlFilter;
                break;
            }

            if (angular.isFunction(filter)) {
                url = filter(url);
            }

            return url;
        }

        function createAjaxPromise(item, isPost, requestType, timeoutPromise) {
            var data,
                httpOptions,
                isGet,
                textContent,
                type,
                url;

            requestType = requestType || 0;

            if (item.BB_DATA_POST || isPost) {
                data = item.data;
                type = item.type || 'post';
                url = item.url;
            } else {
                type = 'get';
                url = item;
                isGet = true;
            }

            if (isGet && requestType === REQUEST_TYPE_TEXT) {
                // Check the Angular template cache using the raw URL first in case the text content is compiled into
                // the module bundle.
                textContent = $templateCache.get(url);

                if (textContent) {
                    return $q(function (resolve) {
                        resolve({
                            data: textContent
                        });
                    });
                }
            }

            url = ajaxUrl(url, requestType);

            httpOptions = {
                method: type,
                url: url,
                cache: requestType !== 0,
                data: data ? JSON.stringify(data) : null,
                dataType: requestType !== 0 ? 'text' : 'json',
                withCredentials: requestType === 0,
                timeout: timeoutPromise
            };

            if (data instanceof $window.FormData) {
                // Angular sets the Content-Type to application/json by default, but when posting FormData
                // it should clear out the Content-Type and let the browser determine it.
                // https://uncorkedstudios.com/blog/multipartformdata-file-upload-with-angularjs
                angular.extend(httpOptions, {
                    transformRequest: angular.identity,
                    headers: {
                        'Content-Type': undefined
                    }
                });
            }

            return $http(httpOptions);
        }

        function addPromises(items, urls, requestType, timeoutPromise) {
            var i,
                n,
                url;

            if (urls) {
                for (i = 0, n = urls.length; i < n; i++) {
                    url = urls[i];
                    items.push(createAjaxPromise(url, null, requestType, timeoutPromise));
                }
            }
        }

        function nextId() {
            nextId.index = nextId.index || 0;
            nextId.index++;
            return nextId.index;
        }

        function trackHTTPTimeoutForPromise(fn) {
            var id = nextId(),
                promise,
                httpTimeout = $q.defer();

            trackHTTPTimeoutForPromise[id] = httpTimeout;

            promise = fn(httpTimeout.promise);
            promise._id = id;

            function clearPromiseId() {
                delete trackHTTPTimeoutForPromise[id];
            }

            promise.then(clearPromiseId, clearPromiseId);

            return promise;
        }

        function loadData(options) {
            return trackHTTPTimeoutForPromise(function (timeoutPromise) {
                return $q(function (resolve, reject) {
                    var dataOption,
                        dataProps,
                        dataUrls,
                        resourcesOption,
                        resourcesProps,
                        resourcesUrls,
                        promises = [],
                        textOption,
                        textProps,
                        textUrls;

                    function success(args) {
                        var argIndex = 0,
                            result = {
                                httpResults: {}
                            };

                        function addResult(name, props) {
                            var resultData,
                                httpResult,
                                i,
                                n,
                                p,
                                resultItem,
                                resultItemHttpResults;

                            if (props) {
                                for (i = 0, n = props.length; i < n; i++) {
                                    p = props[i];
                                    httpResult = args[argIndex];
                                    resultData = httpResult.data;

                                    if (p === DEFAULT_PROP) {
                                        resultItem = resultData;
                                        resultItemHttpResults = httpResult;
                                    } else {
                                        resultItem = resultItem || {};
                                        resultItem[p] = resultData;

                                        resultItemHttpResults = resultItemHttpResults || {};
                                        resultItemHttpResults[p] = httpResult;
                                    }

                                    argIndex++;
                                }
                            }

                            if (angular.isDefined(resultItem)) {
                                result[name] = resultItem;
                            }

                            if (angular.isDefined(resultItemHttpResults)) {
                                result.httpResults[name] = resultItemHttpResults;
                            }
                        }

                        addResult('data', dataProps, true);
                        addResult('resources', resourcesProps);
                        addResult('text', textProps);

                        resolve(result);
                    }

                    function failure() {
                        /*jshint validthis: true */
                        reject.apply(this, arguments);
                    }

                    dataOption = options.data;
                    resourcesOption = options.resources;
                    textOption = options.text;

                    if (dataOption) {
                        dataProps = [];
                        dataUrls = [];
                        fillUrls(dataOption, dataProps, dataUrls);
                    }

                    if (resourcesOption) {
                        resourcesProps = [];
                        resourcesUrls = [];
                        fillUrls(resourcesOption, resourcesProps, resourcesUrls);
                    }

                    if (textOption) {
                        textProps = [];
                        textUrls = [];
                        fillUrls(textOption, textProps, textUrls);
                    }

                    addPromises(promises, dataUrls, REQUEST_TYPE_DATA, timeoutPromise);
                    addPromises(promises, resourcesUrls, REQUEST_TYPE_RESOURCES, timeoutPromise);
                    addPromises(promises, textUrls, REQUEST_TYPE_TEXT, timeoutPromise);

                    $q.all(promises)
                        .then(success)
                        .catch(failure);
                });
            });
        }

        return {
            cancel: function (promise) {
                if (promise && promise._id && trackHTTPTimeoutForPromise[promise._id]) {
                    trackHTTPTimeoutForPromise[promise._id].resolve();
                }
            },
            load: function (options) {
                if (options.loadManager) {
                    options.loadManager.load = function () {
                        return loadData(options);
                    };

                    return loadManager(options.loadManager).loaded;
                }

                return loadData(options);
            },
            loadManager: loadManager,
            query: function (url, params) {
                return url + '?' + $.param(params);
            },
            post: function (url, data) {
                return {
                    url: url,
                    data: data,
                    BB_DATA_POST: true
                };
            },
            save: function (options) {
                return trackHTTPTimeoutForPromise(function (timeoutPromise) {
                    return createAjaxPromise(options, true, null, timeoutPromise);
                });
            }
        };
    }

    bbData.$inject = ['$http', '$q', '$templateCache', 'bbDataConfig', '$window'];

    angular.module('sky.data', [])
        .constant('bbDataConfig', {})
        .factory('bbData', bbData);
}(jQuery));

/*global angular */
(function () {
    'use strict';

    var bbDatepickerConfig = {
        currentCultureDateFormatString: 'MM/dd/yyyy',
        showWeeks: false,
        startingDay: 0,
        minDate: '',
        maxDate: '',
        bbAltInputFormats: []
    };

    angular.module('sky.datepicker.config', [])
        .constant('bbDatepickerConfig', bbDatepickerConfig);
}());

/* global angular */

(function () {
    'use strict';

    function bbDatepickerCustomValidate($filter, bbDatepickerParser) {
        return {
            restrict: 'A',
            require: ['ngModel', '^bbDatepicker'],
            link: function ($scope, el, attr, controllers) {
                var ngModel = controllers[0],
                    format = attr.uibDatepickerPopup,
                    uibPopupScope,
                    oldDateSelection;

                if (attr.bbDatepickerCustomValidate && attr.bbDatepickerCustomValidate === 'true') {
                    ngModel.$parsers = [];
                    ngModel.$validators.date = function () {
                        return true;
                    };

                    uibPopupScope = el.isolateScope();

                    /*  When using custom validation, removing the validators
                        and parsers means that changing the date in the calendar
                        does not kick off the custom validation, so we must
                        trigger it manually */
                    oldDateSelection = uibPopupScope.dateSelection;
                    uibPopupScope.dateSelection = function (newDate) {
                        oldDateSelection(newDate);
                        el.trigger('change');
                    };

                } else {
                    ngModel.$parsers.unshift(function (viewValue) {
                        var newDate = ngModel.$viewValue,
                            date = null;

                        date = bbDatepickerParser.runParsers(newDate, format);

                        if (angular.isDate(date)) {
                            el.val($filter('date')(date, format));
                        }

                        return date ? date : viewValue;
                    });
                }
                controllers[1].getInputNgModel = function () {
                    return ngModel;
                };
            }
        };
    }

    bbDatepickerCustomValidate.$inject = ['$filter', 'bbDatepickerParser'];

    angular.module('sky.datepicker.customvalidate', ['sky.datepicker.parser'])
        .directive('bbDatepickerCustomValidate', bbDatepickerCustomValidate);
}());

/*jshint browser: true */
/*global angular */

(function () {
    'use strict';

    function BBDatepickerController() {
        var vm = this;

        function open($event) {
            $event.preventDefault();
            $event.stopPropagation();

            vm.pickerOpened = !vm.pickerOpened;
        }

        vm.open = open;

    }


    function bbDatepicker(bbResources, bbDatepickerConfig, bbDatepickerParser, $timeout, $q, $log) {

        function link($scope, el, attr, ctrls) {
            var parsedDate,
                inputEl,
                skipValidation = false,
                dateChangeInternal = false,
                ngModel = ctrls[0],
                vm = ctrls[1];


            function setDatepickerInput(newValue) {
                /*  uib-datepicker does not allow setting model directly
                    to anything but a JavaScript Date. However, we can clear
                    the current model and set the input manually to get the
                    correct value to display */
                vm.pickerDate = null;
                $timeout(function () {
                    inputEl.val(newValue);
                });
            }

            function setDate() {
                var inputNgModel;
                if (angular.isDate(vm.date)) {
                    vm.pickerDate = angular.copy(vm.date);
                } else if (!vm.hasCustomValidation) {
                    parsedDate = bbDatepickerParser.runModelParsers(vm.date, vm.format);
                    if (angular.isDate(parsedDate)) {
                        vm.date = angular.copy(parsedDate);
                        vm.pickerDate = angular.copy(parsedDate);
                    } else {
                        setDatepickerInput(vm.date);

                        inputNgModel = vm.getInputNgModel();
                        if (inputNgModel && !inputNgModel.$validators.date(vm.date)) {
                            inputNgModel.invalidFormatMessage = bbResources.date_field_invalid_date_message;
                            inputNgModel.$setValidity('dateFormat', false);
                        }
                    }
                } else {
                    setDatepickerInput(vm.date);
                }
            }

            function hasMinMaxError() {
                var inputNgModel = vm.getInputNgModel();

                return inputNgModel && inputNgModel.$error && (inputNgModel.$error.minDate || inputNgModel.$error.maxDate);
            }

            function dateFormatValidator(modelValue) {
                var customFormattingResult,
                    deferred,
                    inputNgModel;

                function resolveValidation() {
                    var inputNgModel = vm.getInputNgModel();
                    /* istanbul ignore else */
                    /* sanity check */
                    if (inputNgModel) {
                        deferred[inputNgModel.invalidFormatMessage ? 'reject' : 'resolve']();
                        inputNgModel.$setValidity('dateFormat', !inputNgModel.invalidFormatMessage || inputNgModel.invalidFormatMessage === '');
                    } else {
                        deferred.resolve();
                    }
                }

                function setInvalidFormatMessage(errorMessage) {
                    var inputNgModel = vm.getInputNgModel();
                    /* istanbul ignore else */
                    /* sanity check */
                    if (inputNgModel) {
                        inputNgModel.invalidFormatMessage = errorMessage;
                    }
                }

                function handleCustomFormattingValidation(result) {
                    result = result || {};

                    setInvalidFormatMessage(result.formattingErrorMessage);
                    resolveValidation();

                    if (angular.isDefined(result.formattedValue) && result.formattedValue !== vm.date) {
                        skipValidation = true;
                        dateChangeInternal = true;
                        vm.date = angular.copy(result.formattedValue);

                        /* istanbul ignore else */
                        /* sanity check */
                        if (inputEl) {
                            inputEl.val(vm.date);
                        }
                        if (angular.isDate(result.formattedValue)) {
                            vm.pickerDate = angular.copy(result.formattedValue);
                        }
                    }
                }

                deferred = $q.defer();

                if (skipValidation || angular.isDate(modelValue) || modelValue === '' || hasMinMaxError() || (!vm.required && modelValue === null)) {
                    setInvalidFormatMessage(null);
                    resolveValidation();
                } else if (vm.hasCustomValidation && angular.isString(modelValue)) {
                    customFormattingResult = vm.bbDatepickerCustomValidation.formatValue(modelValue);
                    if (customFormattingResult.then) {
                        customFormattingResult.then(handleCustomFormattingValidation);
                    } else {
                        handleCustomFormattingValidation(customFormattingResult);
                        return deferred.promise;
                    }
                } else {
                    inputNgModel = vm.getInputNgModel();
                    /* istanbul ignore else */
                    /* sanity check */
                    if (inputNgModel && inputNgModel.$error && inputNgModel.$error.date) {
                        setInvalidFormatMessage(bbResources.date_field_invalid_date_message);
                    }
                    resolveValidation();
                }

                skipValidation = false;
                return deferred.promise;
            }

            function setAppendToBody(appendToBodyAttr) {
                if (angular.isDefined(appendToBodyAttr) || angular.isDefined(appendToBodyAttr)) {
                    vm.appendToBody = (appendToBodyAttr === 'true');
                }
            }
            
            function initializeDatepickerOptions() {
                ngModel.$options = ngModel.$options.createChild({ allowInvalid: true });
                vm.pickerDate = '';
                vm.pickerOpened = false;

                vm.pickerOptions = {
                    showWeeks: bbDatepickerConfig.showWeeks,
                    startingDay: bbDatepickerConfig.startingDay,
                    maxDate: vm.bbMaxDate,
                    minDate: vm.bbMinDate
                };

                vm.hasCustomValidation = false;
                vm.inputName = attr.bbDatepickerName;

                if (angular.isUndefined(vm.format)) {
                    vm.format = bbDatepickerConfig.currentCultureDateFormatString;
                }

                if (vm.maxDate) {
                    $log.warn('bbDatepicker max-date attribute is deprecated, use bb-datepicker-max instead');
                    vm.bbMaxDate = vm.maxDate;
                }

                if (vm.minDate) {
                    $log.warn('bbDatepicker min-date attribute is deprecated, use bb-datepicker-min instead');
                    vm.bbMinDate = vm.minDate;
                }

                if (vm.placeholderText) {
                    $log.warn('bbDatepicker placeholder attribute is deprecated, use bb-datepicker-placeholder instead');
                    vm.bbPlaceholder = vm.placeholderText;
                }


                if (vm.bbPlaceholder === null || angular.isUndefined(vm.bbPlaceholder)) {
                    vm.bbPlaceholder = vm.format.toLowerCase();
                }

                vm.appendToBody = false;

                if (angular.isDefined(attr.datepickerAppendToBody)) {
                    $log.warn('bbDatepicker datepicker-append-to-body attribute is deprecated, use bb-datepicker-append-to-body instead');
                    setAppendToBody(attr.datepickerAppendToBody);
                } else {
                    setAppendToBody(attr.bbDatepickerAppendToBody);
                }

                vm.showButtonBar = false;

                if (angular.isDefined(attr.showButtonBar)) {
                    $log.warn('bbDatepicker show-button-bar attribute is deprecated, use bb-datepicker-show-button-bar instead');
                    vm.showButtonBar = attr.showButtonBar;
                } else if (angular.isDefined(attr.bbDatepickerShowButtonBar)) {
                    vm.showButtonBar = attr.bbDatepickerShowButtonBar;
                }

                vm.closeOnSelection = true;

                if (angular.isDefined(attr.closeOnDateSelection)) {
                    $log.warn('bbDatepicker close-on-date-selection attribute is deprecated, use bb-datepicker-close-on-date-selection instead');
                    vm.closeOnSelection = attr.closeOnDateSelection;
                } else if (angular.isDefined(attr.bbDatepickerCloseOnDateSelection)) {
                    vm.closeOnSelection = attr.bbDatepickerCloseOnDateSelection;
                }

                if (angular.isDefined(vm.customValidation)) {
                    $log.warn('bbDatepicker bb-custom-validation attribute is deprecated, use bb-datepicker-custom-validation instead');
                    vm.bbDatepickerCustomValidation = vm.customValidation;
                }

                vm.altInputFormats = angular.copy(bbDatepickerConfig.bbAltInputFormats);

                if (angular.isArray(vm.bbAltInputFormats)) {
                    $log.warn('bbDatepicker bb-alt-input-formats attribute is deprecated, use bb-datepicker-alt-input-formats instead');
                    angular.extend(vm.altInputFormats, vm.bbAltInputFormats);
                } else if (angular.isArray(vm.bbDatepickerAltInputFormats)) {
                    angular.extend(vm.altInputFormats, vm.bbDatepickerAltInputFormats);
                }

                if (vm.altInputFormats.length < 1) {
                    vm.altInputFormats = bbDatepickerParser.getAltInputFormats(vm.format);
                }

                if (!vm.bbMaxDate && bbDatepickerConfig.maxDate) {
                    vm.bbMaxDate = angular.copy(bbDatepickerConfig.maxDate);
                    vm.pickerOptions.maxDate = vm.bbMaxDate;
                    vm.maxDate = vm.bbMaxDate;
                }

                if (!vm.bbMinDate && bbDatepickerConfig.minDate) {
                    vm.bbMinDate = angular.copy(bbDatepickerConfig.minDate);
                    vm.pickerOptions.minDate = vm.bbMinDate;
                    vm.minDate = vm.bbMinDate;
                }

                vm.resources = bbResources;

                if (angular.isDefined(vm.bbDateOptions)) {
                    angular.extend(vm.pickerOptions, vm.bbDateOptions);

                }

                if (angular.isDefined(vm.bbDatepickerCustomValidation)) {
                    if (angular.isFunction(vm.bbDatepickerCustomValidation.formatValue)) {
                        vm.hasCustomValidation = true;
                    }
                }

                vm.required = angular.isDefined(attr.required);
            }

            vm.loaded = false;
            initializeDatepickerOptions();

            $timeout(function () {
                inputEl = el.find('input');
                setDate();

                ngModel.$asyncValidators.dateFormat = dateFormatValidator;
                ngModel.$validate();

                $scope.$watch(
                    function () {
                        return vm.date;
                    },
                    function (newValue, oldValue) {
                        if (newValue !== oldValue && !dateChangeInternal) {
                            setDate();
                        } else if (dateChangeInternal) {
                            dateChangeInternal = false;
                        }
                    }
                );

                function checkMomentDate(date) {
                    var result;


                    if (!vm.hasCustomValidation) {
                        result = bbDatepickerParser.parseMoment(date, vm.format);
                    }
                    
                    return result;
                }

                function inputChanged() {
                    var inputNgModel = vm.getInputNgModel(),
                        momentDate;
                    /*istanbul ignore else */
                    /* sanity check */
                    if ((angular.isUndefined(vm.pickerDate) || !angular.isDate(vm.pickerDate)) && angular.isDefined(inputEl.val()) && inputEl.val() !== '') {
                        momentDate = checkMomentDate(vm.pickerDate);
                        if (angular.isDate(momentDate)) {
                            vm.date = momentDate;
                        } else if (vm.date !== inputEl.val()) {
                            dateChangeInternal = true;
                            vm.date = inputEl.val();
                        }
                    } else if (vm.required && inputEl.val() === '') {
                        if (vm.date !== '') {
                            dateChangeInternal = true;
                            vm.date = '';
                        }

                        inputNgModel.invalidFormatMessage = null;
                        inputNgModel.$setValidity('dateFormat', true);

                    } else if (vm.date !== vm.pickerDate) {
                        dateChangeInternal = true;
                        vm.date = angular.copy(vm.pickerDate);
                    }
                }

                function enterPress($event) {
                    if ($event.keyCode === 13) {
                        inputChanged();
                    }
                }

                vm.enterPress = enterPress;

                /*  Need to handle input change instead of model change
                    because ngModelOptions updateOn blur does not work
                    correctly with the uib-datepicker */
                inputEl.on('change blur', function () {
                    $timeout(function () {
                        inputChanged();
                    });
                });

                $scope.$watch(
                    function () {
                        return vm.pickerDate;
                    },
                    function () {
                        if (vm.date !== vm.pickerDate) {
                            if (angular.isDate(vm.pickerDate)) {
                                dateChangeInternal = true;
                                vm.date = angular.copy(vm.pickerDate);
                            }
                        }
                    }
                );

                $scope.$watch(function () {
                    return ngModel.$error && ngModel.$error.required;
                }, function (newValue) {
                    var inputNgModel;
                    if (vm.required) {
                        inputNgModel = vm.getInputNgModel();
                        inputNgModel.$setValidity('required', !newValue);
                    }
                });

            });

            function runValidators() {
                var inputNgModel = vm.getInputNgModel();
                /*istanbul ignore else */
                /* sanity check */
                if (inputNgModel) {
                    inputNgModel.$validate();
                }
            }

            $scope.$watch(
                function () {
                    if (angular.isDefined(attr.maxDate)) {
                        vm.bbMaxDate = vm.maxDate;
                    }
                    return vm.bbMaxDate;
                },
                function (newValue) {
                    runValidators();
                    vm.pickerOptions.maxDate = newValue;
                }
            );

            $scope.$watch(
                function () {
                    if (angular.isDefined(attr.minDate)) {
                        vm.bbMinDate = vm.minDate;
                    }
                    return vm.bbMinDate;
                },
                function (newValue) {
                    runValidators();
                    vm.pickerOptions.minDate = newValue;
                }
            );

            vm.loaded = true;
        }

        return {
            replace: true,
            restrict: 'E',
            controller: BBDatepickerController,
            controllerAs: 'bbDatepicker',
            bindToController: {
                date: '=ngModel',
                bbDateOptions: '=?',
                bbDatepickerCustomValidation: '=?bbDatepickerCustomValidation',
                format: '=?bbDateFormat',
                bbMaxDate: '=?bbDatepickerMax',
                bbMinDate: '=?bbDatepickerMin',
                bbPlaceholder: '=?bbDatepickerPlaceholder',
                bbDatepickerAltInputFormats: '=?',
                bbDatepickerSkipButtonWhileTabbing: '<?',

                bbAltInputFormats: '=?', //deprecated
                maxDate: '=?maxDate', //deprecated
                minDate: '=?minDate', //deprecated
                placeholderText: '=?placeholder', //deprecated
                customValidation: '=?bbCustomValidation' //deprecated
            },
            require: ['ngModel', 'bbDatepicker'],
            scope: {},
            templateUrl: 'sky/templates/datepicker/datepicker.directive.html',
            link: link

        };
    }

    bbDatepicker.$inject = ['bbResources', 'bbDatepickerConfig', 'bbDatepickerParser', '$timeout', '$q', '$log'];


    angular.module('sky.datepicker.directive',
        [
            'sky.resources',
            'sky.moment',
            'ui.bootstrap.datepicker',
            'sky.datepicker.customvalidate',
            'sky.datepicker.maxdate',
            'sky.datepicker.mindate',
            'sky.datepicker.parser',
            'sky.datepicker.config'
        ])
        .directive('bbDatepicker', bbDatepicker);

}());

/* global angular */
(function () {
    'use strict';

    function bbDatepickerMaxDate() {
        return {
            restrict: 'A',
            require: ['ngModel', '^bbDatepicker'],
            link: function ($scope, element, attrs, ctrls) {
                var ngModel = ctrls[0],
                    bbDatepicker = ctrls[1];
                ngModel.$validators.maxDate = function (modelValue) {
                    return !bbDatepicker.bbMaxDate || !modelValue || !angular.isDate(modelValue) || !angular.isDate(bbDatepicker.bbMaxDate) || modelValue <= bbDatepicker.bbMaxDate;
                };
            }
        };
    }

    angular.module('sky.datepicker.maxdate', [])
        .directive('bbDatepickerMaxDate', bbDatepickerMaxDate);
}());

/* global angular */
(function () {
    'use strict';

    function bbDatepickerMinDate() {
        return {
            restrict: 'A',
            require: ['ngModel', '^bbDatepicker'],
            link: function ($scope, element, attrs, ctrls) {
                var ngModel = ctrls[0],
                    bbDatepicker = ctrls[1];

                ngModel.$validators.minDate = function (modelValue) {
                    return !bbDatepicker.bbMinDate || !modelValue || !angular.isDate(modelValue) || !angular.isDate(bbDatepicker.bbMinDate) || modelValue >= bbDatepicker.bbMinDate;
                };
            }
        };
    }


    angular.module('sky.datepicker.mindate', [])
        .directive('bbDatepickerMinDate', bbDatepickerMinDate);
}());

/* global angular */
(function () {
    'use strict';

    function bbDatepickerParser(bbMoment) {
        function parseUTCString(value) {
            var date = null,
                timeOffsetPart,
                momentDate;

            if (value.indexOf('T') !== -1) {

                timeOffsetPart = value.split('T')[1];

                if (timeOffsetPart.indexOf('Z') === -1 && timeOffsetPart.indexOf('+') === -1 && timeOffsetPart.indexOf('-') === -1) {
                    momentDate = bbMoment(value, 'YYYY-MM-DDTHH:mm:ss');
                } else {
                    momentDate = bbMoment(value, 'YYYY-MM-DDThh:mm:ss.sssZ');
                }
            
                /* istanbul ignore else */
                /* sanity check */
                if (momentDate.isValid()) {
                    date = momentDate.toDate();
                }
            }
            return date;
        }

        function getFormatIndex(format) {
            return {
                yearBegin: format.indexOf('y'),
                monthBegin: format.indexOf('M'),
                dayBegin: format.indexOf('d')
            };
        }

        function parseNoSeparatorDateString(value, format) {
            var date = null,
                yearBegin,
                monthBegin,
                dayBegin,
                formatIndex,
                yearIndex,
                monthIndex,
                dayIndex;

            formatIndex = getFormatIndex(format);
            yearBegin = formatIndex.yearBegin;
            monthBegin = formatIndex.monthBegin;
            dayBegin = formatIndex.dayBegin;

            if (angular.isString(value) && value.length === 8 && !isNaN(value)) {
                if ((dayBegin < yearBegin) && (monthBegin < yearBegin)) {
                    yearIndex = 4;
                    if (monthBegin < dayBegin) {
                        dayIndex = 2;
                        monthIndex = 0;
                    } else {
                        dayIndex = 0;
                        monthIndex = 2;
                    }
                } else if ((yearBegin < monthBegin) && (monthBegin < dayBegin)) {
                    yearIndex = 0;
                    monthIndex = 4;
                    dayIndex = 6;
                } else {
                    return null;
                }

                date = new Date(value.substr(yearIndex, 4), (value.substr(monthIndex, 2) - 1), value.substr(dayIndex, 2));
            }
            return date;
        }

        function matchSeparator(value) {
            return value.match(/[.\/\-\s].*?/);
        }

        function getAltInputFormats(format) {
            var altInputFormats = [],
                separator = matchSeparator(format),
                formatIndex = getFormatIndex(format),
                yearBegin,
                monthBegin,
                dayBegin,
                separatorChar;
            
            yearBegin = formatIndex.yearBegin;
            monthBegin = formatIndex.monthBegin;
            dayBegin = formatIndex.dayBegin;

            /*istanbul ignore else */
            /* sanity check */
            if (separator) {
                separatorChar = separator[0];

                /*istanbul ignore else */
                /* sanity check */
                if (separatorChar) {
                    if ((dayBegin < yearBegin) && (monthBegin < yearBegin)) {
                        if (monthBegin < dayBegin) {
                            altInputFormats.push('M!' + separatorChar + 'd!' + separatorChar + 'yyyy');
                        } else {
                            altInputFormats.push('d!' + separatorChar + 'M!' + separatorChar + 'yyyy');
                        }
                    } else if ((yearBegin < monthBegin) && (monthBegin < dayBegin)) {
                        altInputFormats.push('yyyy' + separatorChar + 'M!' + separatorChar + 'd!');
                    }
                }

                return altInputFormats;
            }

        }

        function dateHasSeparator(value) {
            /*
            * Validation criteria:
            * A separator exists
            * There is no separator at the beginning
            * There is no separator at the end
            * Two separators exist
            * All parts of the date have a non-zero value
            */

            var separator = matchSeparator(value),
                valueArray = value.split(separator),
                separatorAtEnd = value.indexOf(separator, value.length - 1) !== -1,
                separatorAtBeginning = value.indexOf(separator) === 0,
                hasTwoSeparators = valueArray.length - 1 === 2,
                anyPartIsZero = valueArray.some(function (e) {
                    return Number(e) === 0;
                });

            return (separator && !separatorAtEnd && !separatorAtBeginning && hasTwoSeparators && !anyPartIsZero);
        }

        function hasValidMomentFormat(format) {
            var formatIndex = getFormatIndex(format);
            return !((formatIndex.monthBegin > formatIndex.yearBegin && formatIndex.yearBegin > formatIndex.dayBegin) ||
                (formatIndex.monthBegin < formatIndex.yearBegin && formatIndex.yearBegin < formatIndex.dayBegin));
        }

        function isMomentParsable(value, format) {
            if (angular.isString(value) && dateHasSeparator(value)) {

                if (value.length < 11 && value.length > 5) {
                    if (hasValidMomentFormat(format)) {
                        return true;
                    }
                } 
            }

            return false;
        }

        function yearInLastPosition(formatIndex) {
            return formatIndex.yearBegin > formatIndex.monthBegin && formatIndex.yearBegin > formatIndex.dayBegin;
        }

        function yearInFirstPosition(formatIndex) {
            return formatIndex.yearBegin < formatIndex.monthBegin && formatIndex.yearBegin < formatIndex.dayBegin;
        }

        function yearPartDoesNotMatchFormat(value, format) {
            var formatIndex = getFormatIndex(format),
                dateParts,
                formatParts,
                separator = matchSeparator(format);

            /* istanbul ignore else */
            /* sanity check */
            if (separator) {
                dateParts = value.split(separator);
                formatParts = format.split(separator);

            
                if (yearInLastPosition(formatIndex)) {
                    return formatParts[2].length === 4 && dateParts[2].length === 2;
                }
                /* istanbul ignore else */
                /* sanity check */
                if (yearInFirstPosition(formatIndex)) {
                    return formatParts[0].length === 4 && dateParts[0].length !== 4;
                }
            }

        }

        function getTwoDigitFormat(format) {
            var formatIndex = getFormatIndex(format),
                formatParts,
                separatorChar,
                separator = matchSeparator(format),
                middleFormat;

            /* istanbul ignore else */
            /* sanity check */
            if (separator) {
                formatParts = format.split(separator);
                separatorChar = separator[0];

                /* istanbul ignore else */
                /* sanity check */
                if (separatorChar) {

                    middleFormat = separatorChar + formatParts[1] + separatorChar;
                    if (yearInLastPosition(formatIndex)) {
                        return formatParts[0] + middleFormat + 'yy';
                    }

                    /* istanbul ignore else */
                    /* sanity check */
                    if (yearInFirstPosition(formatIndex)) {
                        return 'yy' + middleFormat + formatParts[2];
                    }
                }
            }
        }

        function getMomentDate(value, format) {
            var momentDate,
                date;
            
            momentDate = bbMoment(value, format.toUpperCase());
            
            /* istanbul ignore else */
            /* sanity check */
            if (momentDate.isValid()) {
                date = momentDate.toDate();
            }
            return date;
        }

        function parseMoment(value, format) {
            var date = null,
               momentFormat;

            if (isMomentParsable(value, format)) {
                if (yearPartDoesNotMatchFormat(value, format)) {
                    momentFormat = getTwoDigitFormat(format);
                }
                if (!momentFormat) {
                    momentFormat = format;
                }
                date = getMomentDate(value, momentFormat);
               
            }
            return date;
        }

        return {
            parseUTCString: parseUTCString,
            parseNoSeparatorDateString: parseNoSeparatorDateString,
            getAltInputFormats: getAltInputFormats,
            parseMoment: parseMoment,
            runModelParsers: function (value, format) {
                var date = null;

                if (!value || angular.isDate(value) || value === '') {
                    return value;
                }

                date = parseUTCString(value);

                if (angular.isDate(date)) {
                    return date;
                }

                date = parseNoSeparatorDateString(value, format);

                if (angular.isDate(date)) {
                    return date;
                }

                date = parseMoment(value, format);

                return date;
            },

            runParsers: function (value, format) {
                var date = null;

                if (!value || angular.isDate(value) || value === '') {
                    return value;
                }

                date = parseUTCString(value);

                if (angular.isDate(date)) {
                    return date;
                }

                date = parseNoSeparatorDateString(value, format);

                return date;
            }
        };
    }

    bbDatepickerParser.$inject = ['bbMoment'];

    angular.module('sky.datepicker.parser', ['sky.moment'])
        .factory('bbDatepickerParser', bbDatepickerParser);

}());

/*jshint browser: true */
/*global angular */

(function () {
    'use strict';


    function bbDateRangePickerFactory(bbResources) {
        var dateRangeTypes,
            defaultDateRangeOptions,
            specificDateRangeOptions,
            pastDateRangeOptions,
            dateRangeMap;

        dateRangeTypes = {
            AT_ANY_TIME: 0,
            NEXT_WEEK: 1,
            THIS_MONTH: 2,
            NEXT_MONTH: 3,
            THIS_QUARTER: 4,
            NEXT_QUARTER: 5,
            THIS_FISCAL_YEAR: 6,
            NEXT_FISCAL_YEAR: 7,
            THIS_CALENDAR_YEAR: 8,
            NEXT_CALENDAR_YEAR: 9,
            LAST_WEEK: 10,
            LAST_MONTH: 11,
            LAST_QUARTER: 12,
            LAST_FISCAL_YEAR: 13,
            LAST_CALENDAR_YEAR: 14,
            TODAY: 15,
            YESTERDAY: 16,
            TOMORROW: 17,
            THIS_WEEK: 18,
            SPECIFIC_RANGE: 19
        };


        // Deprecated
        defaultDateRangeOptions = [
            dateRangeTypes.AT_ANY_TIME,
            dateRangeTypes.YESTERDAY,
            dateRangeTypes.TODAY,
            dateRangeTypes.TOMORROW,
            dateRangeTypes.LAST_WEEK,
            dateRangeTypes.THIS_WEEK,
            dateRangeTypes.NEXT_WEEK,
            dateRangeTypes.LAST_MONTH,
            dateRangeTypes.THIS_MONTH,
            dateRangeTypes.NEXT_MONTH,
            dateRangeTypes.LAST_QUARTER,
            dateRangeTypes.THIS_QUARTER,
            dateRangeTypes.NEXT_QUARTER,
            dateRangeTypes.LAST_CALENDAR_YEAR,
            dateRangeTypes.THIS_CALENDAR_YEAR,
            dateRangeTypes.NEXT_CALENDAR_YEAR,
            dateRangeTypes.LAST_FISCAL_YEAR,
            dateRangeTypes.THIS_FISCAL_YEAR,
            dateRangeTypes.NEXT_FISCAL_YEAR
        ];

        // Deprecated
        specificDateRangeOptions = defaultDateRangeOptions.concat([dateRangeTypes.SPECIFIC_RANGE]);

        // Deprecated
        pastDateRangeOptions = [
            dateRangeTypes.AT_ANY_TIME,
            dateRangeTypes.YESTERDAY,
            dateRangeTypes.TODAY,
            dateRangeTypes.LAST_WEEK,
            dateRangeTypes.THIS_WEEK,
            dateRangeTypes.LAST_MONTH,
            dateRangeTypes.THIS_MONTH,
            dateRangeTypes.LAST_QUARTER,
            dateRangeTypes.THIS_QUARTER,
            dateRangeTypes.LAST_CALENDAR_YEAR,
            dateRangeTypes.THIS_CALENDAR_YEAR,
            dateRangeTypes.LAST_FISCAL_YEAR,
            dateRangeTypes.THIS_FISCAL_YEAR
        ];

        dateRangeMap = {};
        dateRangeMap[dateRangeTypes.AT_ANY_TIME] = {
            caption: bbResources.date_range_picker_at_any_time,
            description: bbResources.date_range_picker_filter_description_at_any_time
        };
        dateRangeMap[dateRangeTypes.YESTERDAY] = {
            caption: bbResources.date_range_picker_yesterday,
            description: bbResources.date_range_picker_filter_description_yesterday
        };
        dateRangeMap[dateRangeTypes.TODAY] = {
            caption: bbResources.date_range_picker_today,
            description: bbResources.date_range_picker_filter_description_today
        };
        dateRangeMap[dateRangeTypes.TOMORROW] = {
            caption: bbResources.date_range_picker_tomorrow,
            description: bbResources.date_range_picker_filter_description_tomorrow
        };
        dateRangeMap[dateRangeTypes.LAST_WEEK] = {
            caption: bbResources.date_range_picker_last_week,
            description: bbResources.date_range_picker_filter_description_last_week
        };
        dateRangeMap[dateRangeTypes.THIS_WEEK] = {
            caption: bbResources.date_range_picker_this_week,
            description: bbResources.date_range_picker_filter_description_this_week
        };
        dateRangeMap[dateRangeTypes.NEXT_WEEK] = {
            caption: bbResources.date_range_picker_next_week,
            description: bbResources.date_range_picker_filter_description_next_week
        };
        dateRangeMap[dateRangeTypes.LAST_QUARTER] = {
            caption: bbResources.date_range_picker_last_quarter,
            description: bbResources.date_range_picker_filter_description_last_quarter
        };
        dateRangeMap[dateRangeTypes.THIS_QUARTER] = {
            caption: bbResources.date_range_picker_this_quarter,
            description: bbResources.date_range_picker_filter_description_this_quarter
        };
        dateRangeMap[dateRangeTypes.NEXT_QUARTER] = {
            caption: bbResources.date_range_picker_next_quarter,
            description: bbResources.date_range_picker_filter_description_next_quarter
        };
        dateRangeMap[dateRangeTypes.LAST_CALENDAR_YEAR] = {
            caption: bbResources.date_range_picker_last_calendar_year,
            description: bbResources.date_range_picker_filter_description_last_calendar_year
        };
        dateRangeMap[dateRangeTypes.THIS_CALENDAR_YEAR] = {
            caption: bbResources.date_range_picker_this_calendar_year,
            description: bbResources.date_range_picker_filter_description_this_calendar_year
        };
        dateRangeMap[dateRangeTypes.NEXT_CALENDAR_YEAR] = {
            caption: bbResources.date_range_picker_next_calendar_year,
            description: bbResources.date_range_picker_filter_description_next_calendar_year
        };
        dateRangeMap[dateRangeTypes.LAST_FISCAL_YEAR] = {
            caption: bbResources.date_range_picker_last_fiscal_year,
            description: bbResources.date_range_picker_filter_description_last_fiscal_year
        };
        dateRangeMap[dateRangeTypes.THIS_FISCAL_YEAR] = {
            caption: bbResources.date_range_picker_this_fiscal_year,
            description: bbResources.date_range_picker_filter_description_this_fiscal_year
        };
        dateRangeMap[dateRangeTypes.NEXT_FISCAL_YEAR] = {
            caption: bbResources.date_range_picker_next_fiscal_year,
            description: bbResources.date_range_picker_filter_description_next_fiscal_year
        };
        dateRangeMap[dateRangeTypes.THIS_MONTH] = {
            caption: bbResources.date_range_picker_this_month,
            description: bbResources.date_range_picker_filter_description_this_month
        };
        dateRangeMap[dateRangeTypes.NEXT_MONTH] = {
            caption: bbResources.date_range_picker_next_month,
            description: bbResources.date_range_picker_filter_description_next_month
        };
        dateRangeMap[dateRangeTypes.LAST_MONTH] = {
            caption: bbResources.date_range_picker_last_month,
            description: bbResources.date_range_picker_filter_description_last_month
        };
        dateRangeMap[dateRangeTypes.SPECIFIC_RANGE] = {
            caption: bbResources.date_range_picker_specific_range,
            description: bbResources.date_range_picker_filter_description_specific_range
        };

        function getTypeInfoFromDateRangePickerValue(dateRangePickerValue, getDateRangeTypeInfo) {
            var info;
            if (dateRangePickerValue && dateRangePickerValue.dateRangeType) {
                info = getDateRangeTypeInfo(dateRangePickerValue.dateRangeType);
            } else {
                info = getDateRangeTypeInfo(dateRangePickerValue);
            }
            return info;
        }


        function getDateRangeTypeCaption(dateRangePickerValue, getDateRangeTypeInfo) {
            var info;

            if (angular.isFunction(getDateRangeTypeInfo)) {

                info = getTypeInfoFromDateRangePickerValue(dateRangePickerValue, getDateRangeTypeInfo);

                if (info && info.caption) {
                    return info.caption;
                }
            }

            if (angular.isNumber(dateRangePickerValue)) {
                // If the input is the enum value itself, then map it to the object structure we expect before proceeding.
                dateRangePickerValue = { dateRangeType: dateRangePickerValue };
            } else {
                // If the value is undefiend, then map it to a null object.
                dateRangePickerValue = dateRangePickerValue || {};
            }

            if (!angular.isDefined(dateRangePickerValue.dateRangeType)) {
                // If the enum value is undefined, then it represents any time.
                dateRangePickerValue.dateRangeType = dateRangeTypes.AT_ANY_TIME;
            }

            if (angular.isDefined(dateRangeMap[dateRangePickerValue.dateRangeType])) {
                return dateRangeMap[dateRangePickerValue.dateRangeType].caption;
            } else {
                return '';
            }

        }

        function getDateRangeFilterDescription(dateRangePickerValue, getDateRangeTypeInfo) {
            var info;
            if (angular.isFunction(getDateRangeTypeInfo)) {
                info = getTypeInfoFromDateRangePickerValue(dateRangePickerValue, getDateRangeTypeInfo);
                if (info && info.description) {
                    return info.description;
                }
            }

            if (angular.isNumber(dateRangePickerValue)) {
                // If the input is the enum value itself, then map it to the object structure we expect before proceeding.
                dateRangePickerValue = { dateRangeType: dateRangePickerValue };
            } else {
                // If the value is undefiend, then map it to a null object.
                dateRangePickerValue = dateRangePickerValue || {};
            }

            if (!angular.isDefined(dateRangePickerValue.dateRangeType)) {
                // If the enum value is undefined, then it represents any time.
                dateRangePickerValue.dateRangeType = dateRangeTypes.AT_ANY_TIME;
            }
            if (angular.isDefined(dateRangeMap[dateRangePickerValue.dateRangeType])) {
                return dateRangeMap[dateRangePickerValue.dateRangeType].description;
            } else {
                return '';
            }
        }

        function getDateRangeOptions(optionTypes) {
            var dateRangeOptions = [dateRangeTypes.AT_ANY_TIME];
            optionTypes = optionTypes || {};

            if (optionTypes.includeDefault) {
                dateRangeOptions.push(dateRangeTypes.YESTERDAY);
                dateRangeOptions.push(dateRangeTypes.TODAY);
                dateRangeOptions.push(dateRangeTypes.TOMORROW);
                dateRangeOptions.push(dateRangeTypes.LAST_WEEK);
                dateRangeOptions.push(dateRangeTypes.THIS_WEEK);
                dateRangeOptions.push(dateRangeTypes.NEXT_WEEK);
                dateRangeOptions.push(dateRangeTypes.LAST_MONTH);
                dateRangeOptions.push(dateRangeTypes.THIS_MONTH);
                dateRangeOptions.push(dateRangeTypes.NEXT_MONTH);
                dateRangeOptions.push(dateRangeTypes.LAST_QUARTER);
                dateRangeOptions.push(dateRangeTypes.THIS_QUARTER);
                dateRangeOptions.push(dateRangeTypes.NEXT_QUARTER);
                dateRangeOptions.push(dateRangeTypes.LAST_CALENDAR_YEAR);
                dateRangeOptions.push(dateRangeTypes.THIS_CALENDAR_YEAR);
                dateRangeOptions.push(dateRangeTypes.NEXT_CALENDAR_YEAR);
                dateRangeOptions.push(dateRangeTypes.LAST_FISCAL_YEAR);
                dateRangeOptions.push(dateRangeTypes.THIS_FISCAL_YEAR);
                dateRangeOptions.push(dateRangeTypes.NEXT_FISCAL_YEAR);
            }

            if (optionTypes.includePast && !optionTypes.includeDefault) {
                dateRangeOptions.push(dateRangeTypes.YESTERDAY);
                dateRangeOptions.push(dateRangeTypes.TODAY);
                dateRangeOptions.push(dateRangeTypes.LAST_WEEK);
                dateRangeOptions.push(dateRangeTypes.THIS_WEEK);
                dateRangeOptions.push(dateRangeTypes.LAST_MONTH);
                dateRangeOptions.push(dateRangeTypes.THIS_MONTH);
                dateRangeOptions.push(dateRangeTypes.LAST_QUARTER);
                dateRangeOptions.push(dateRangeTypes.THIS_QUARTER);
                dateRangeOptions.push(dateRangeTypes.LAST_CALENDAR_YEAR);
                dateRangeOptions.push(dateRangeTypes.THIS_CALENDAR_YEAR);
                dateRangeOptions.push(dateRangeTypes.LAST_FISCAL_YEAR);
                dateRangeOptions.push(dateRangeTypes.THIS_FISCAL_YEAR);
            }

            if (optionTypes.includeSpecific) {
                dateRangeOptions.push(dateRangeTypes.SPECIFIC_RANGE);
            }

            return dateRangeOptions;
        }

        return {
            
            defaultDateRangeOptions: defaultDateRangeOptions,
            pastDateRangeOptions: pastDateRangeOptions,
            specificDateRangeOptions: specificDateRangeOptions,

            dateRangeTypes: dateRangeTypes,
            getDateRangeOptions: getDateRangeOptions,
            getDateRangeTypeCaption: getDateRangeTypeCaption,
            getDateRangeFilterDescription: getDateRangeFilterDescription
        };
    }

    bbDateRangePickerFactory.$inject = ['bbResources'];

    function bbDateRangePickerDirective(bbDateRangePicker, bbResources) {

        return {
            replace: true,
            restrict: 'E',
            templateUrl: 'sky/templates/daterangepicker/daterangepicker.html',
            scope: {},
            controllerAs: 'bbDateRangePickerCtrl',
            bindToController: {
                bbDateRangePickerValue: "=",
                bbDateRangePickerAutomationId: "=",
                bbDateRangePickerOptions: '=',
                fromDate: '=?bbDateRangePickerFromDate',
                toDate: '=?bbDateRangePickerToDate',
                pickerLabel: '=?bbDateRangePickerLabel',
                isValid: '=?bbDateRangePickerValid'
            },
            controller: ['$scope', function ($scope) {
                var vm = this;
                vm.resources = bbResources;

                vm.defaultDateRangeOptions = bbDateRangePicker.getDateRangeOptions({includeDefault: true});

                vm.getDateRangeTypeCaption = function (dateRangeTypeValue) {
                    var infoFunction;
                    if (vm.bbDateRangePickerOptions && angular.isFunction(vm.bbDateRangePickerOptions.getDateRangeTypeInfo)) {
                        infoFunction = vm.bbDateRangePickerOptions.getDateRangeTypeInfo;
                    }
                    return bbDateRangePicker.getDateRangeTypeCaption(dateRangeTypeValue, infoFunction);
                };

                $scope.$watch(
                    function () {
                        return vm.dateRangeForm.$valid;
                    }, function (newVal) {
                        vm.isValid = newVal;
                    }
                );

                $scope.$watch(
                    function () {
                        return vm.fromDate;
                    }, function (newVal) {
                        /* This prevents minDate from having a reference
                           to fromDate and changing it */
                        vm.minDate = angular.copy(newVal);
                    }
                );

                $scope.$watch(
                    function () {
                        return vm.toDate;
                    }, function (newVal) {
                        /* This prevents maxDate from having a reference
                           to toDate and changing it */
                        vm.maxDate = angular.copy(newVal);
                    }
                );

                $scope.$watch(
                    function () {
                        return vm.bbDateRangePickerValue;
                    }, function (newVal) {
                    if (!newVal) {
                        vm.bbDateRangePickerValue = {
                            dateRangeType: bbDateRangePicker.dateRangeTypes.AT_ANY_TIME
                        };
                        return;
                    }
                    vm.specificRangeIsVisible = vm.bbDateRangePickerValue.dateRangeType === bbDateRangePicker.dateRangeTypes.SPECIFIC_RANGE;
                    newVal.dateRangeType = newVal.dateRangeType || bbDateRangePicker.dateRangeTypes.AT_ANY_TIME;
                }, true);
            }],
            link: function ($scope, el, attr, vm) {
                vm.noLabels = attr.bbDateRangePickerNoLabels;
                if (vm.noLabels) {
                    vm.toPlaceholder = bbResources.date_range_picker_to_date;
                    vm.fromPlaceholder = bbResources.date_range_picker_from_date;
                } else {
                    vm.toPlaceholder = '';
                    vm.fromPlaceholder = '';
                }
            }
        };
    }
    bbDateRangePickerDirective.$inject = ['bbDateRangePicker', 'bbResources'];

    angular.module('sky.daterangepicker', ['sky.resources', 'sky.datepicker'])
        .factory('bbDateRangePicker', bbDateRangePickerFactory)
        .directive('bbDateRangePicker', bbDateRangePickerDirective);
}());

/*global angular */

(function () {
    'use strict';

    function Controller(bbResources) {
        var vm = this;

        function onInit() {
            if (!vm.bbDefinitionListDefaultValue) {
                vm.bbDefinitionListDefaultValue = bbResources.definition_list_none_found;
            }
        }

        vm.$onInit = onInit;
    }

    Controller.$inject = ['bbResources'];
    
    angular.module('sky.definitionlist.component', ['sky.resources'])
        .component('bbDefinitionList', {
            templateUrl: 'sky/templates/definitionlist/definitionlist.component.html',
            controller: Controller,
            bindings: {
                bbDefinitionListLabelWidth: '@?',
                bbDefinitionListDefaultValue: '<?'
            },
            transclude: {
                heading: '?bbDefinitionListHeading', 
                content: 'bbDefinitionListContent'
            }
        });
}());
/*global angular */

(function () {
    'use strict';

    function Controller($element) {
        var vm = this;

        function listHasValue() {
            var valueEl = $element.find('.bb-definition-list-value');
            if (valueEl && valueEl.text() && valueEl.text().trim()) {
                return true;
            }
            return false;
        }

        vm.hasValue = listHasValue;
    }
    
    Controller.$inject = ['$element'];

    angular.module('sky.definitionlistcontent.component', [])
        .component('bbDefinitionListContent', {
            require: {
                definitionCtrl: '^bbDefinitionList'
            },
            templateUrl: 'sky/templates/definitionlist/definitionlistcontent.component.html',
            transclude: {
                value: '?bbDefinitionListValue',
                label: 'bbDefinitionListLabel'
            },
            controller: Controller
        });
}());
/* global angular */
(function () {
    'use strict';

    function BBErrorActionController($scope) {
        var vm = this;

        $scope.$on('$destroy', function () {
            if (angular.isFunction(vm.onDestroy)) {
                vm.onDestroy();
                vm = null;
            }
        });
    }

    BBErrorActionController.$inject = ['$scope'];

    function bbErrorAction() {
        function link(scope, el, attrs, ctrls) {
            var vm = ctrls[0],
                bbError = ctrls[1];

            vm.el = el;

            if (bbError !== null) {
                bbError.setAction(vm);
            }

        }

        return {
            restrict: 'E',
            require: ['bbErrorAction', '?^bbError'],
            controller: BBErrorActionController,
            controllerAs: 'bbErrorAction',
            link: link,
            scope: {}
        };
    }

    angular.module('sky.error.action.directive', [])
        .directive('bbErrorAction', bbErrorAction);
}());

/* global angular */
(function () {
    'use strict';

    function BBErrorDescriptionController($scope, bbResources) {
        var vm = this;

        $scope.$on('$destroy', function () {
            if (angular.isFunction(vm.onDestroy)) {
                vm.onDestroy();
                vm = null;
            }
        });

        $scope.$watch(function () {
            return vm.bbErrorType || vm.errorType;
        }, function (newValue) {
            switch (newValue) {
                case 'broken':
                    vm.description = bbResources.error_description_broken;
                    break;
                case 'construction':
                    vm.description = bbResources.error_description_construction;
                    break;
                case 'notFound':
                    vm.description = '';
            }
        });
    }

    BBErrorDescriptionController.$inject = ['$scope', 'bbResources'];

    function bbErrorDescription() {
        function link(scope, el, attrs, ctrls) {
            var vm = ctrls[0],
                bbError = ctrls[1];

            vm.el = el;

            if (bbError !== null) {
                bbError.setDescription(vm, 'errorDefault' in attrs);
            }

        }

        return {
            restrict: 'E',
            require: ['bbErrorDescription', '?^bbError'],
            controller: BBErrorDescriptionController,
            controllerAs: 'bbErrorDescription',
            bindToController: {
                errorType: '@',
                bbErrorType: '@'
            },
            link: link,
            scope: {},
            transclude: true,
            templateUrl: 'sky/templates/error/error.description.directive.html'
        };
    }

    angular.module('sky.error.description.directive', [])
        .directive('bbErrorDescription', bbErrorDescription);
}());

/*global angular */
(function () {
    'use strict';

    var components = [{
        name: 'Image',
        cls: 'image'
    }, {
        name: 'Title',
        cls: 'title'
    }, {
        name: 'Description',
        cls: 'description'
    }, {
        name: 'Action',
        cls: 'action'
    }];


    function getCtrlPropName(component) {
        var name = component.name;

        return name.charAt(0).toLowerCase() + name.substr(1) + 'Ctrl';
    }

    function getOverridePropName(component) {
        var name = component.name;

        return name.charAt(0).toLowerCase() + name.substr(1) + 'HasOverride';
    }

    function BBErrorController($scope) {
        var vm = this;

        function addComponentSetter(component) {
            var name = component.name;

            vm['set' + name] = function (ctrl, isDefaultError) {
                var ctrlName = getCtrlPropName(component),
                    hasOverride = getOverridePropName(component);

                vm[ctrlName] = ctrl;

                if (!isDefaultError) {
                    vm[hasOverride] = true;
                }

                ctrl.onDestroy = function () {
                    vm[ctrlName] = null;
                };
            };
        }

        $scope.$watch(function () {
            return vm.bbErrorType || vm.errorType;
        }, function (newValue) {
            vm.imageType = newValue;
            vm.titleType =  newValue;
            vm.descriptionType =  newValue;
        });

        components.forEach(addComponentSetter);
    }

    BBErrorController.$inject = ['$scope'];

    function bbError() {
        function link(scope, el, attrs, vm) {
            function watchForComponent(component) {
                scope.$watch(function () {
                    return vm[getCtrlPropName(component)];
                }, function (newValue) {

                    if (newValue) {

                        el.find('.bb-error-' + component.cls)
                            .empty()
                            .append(newValue.el);
                    }
                });
            }

            components.forEach(watchForComponent);
        }

        return {
            restrict: 'E',
            controller: 'BBErrorController',
            controllerAs: 'bbError',
            bindToController: {
                errorType: '@',
                bbErrorType: '@'
            },
            link: link,
            scope: {},
            templateUrl: 'sky/templates/error/error.directive.html',
            transclude: true
        };
    }

    angular.module('sky.error.directive', ['sky.error.image.directive', 'sky.error.title.directive', 'sky.error.description.directive', 'sky.error.action.directive'])
        .controller('BBErrorController', BBErrorController)
        .directive('bbError', bbError);

}());

/* global angular */
(function () {
    'use strict';

    function BBErrorImageController($scope) {
        var vm = this;

        $scope.$on('$destroy', function () {
            if (angular.isFunction(vm.onDestroy)) {
                vm.onDestroy();
                vm = null;
            }
        });


    }

    BBErrorImageController.$inject = ['$scope'];

    function bbErrorImage() {
        function link(scope, el, attrs, ctrls) {
            var vm = ctrls[0],
                bbError = ctrls[1];

            vm.el = el;

            if (bbError !== null) {
                bbError.setImage(vm, 'errorDefault' in attrs);
            }

            if (angular.isDefined(attrs.errorType)) {
                scope.$watch(function () {
                    return vm.errorType;
                }, function (newValue) {
                    /* istanbul ignore else */
                    /* sanity check */
                    if (newValue !== vm.bbErrorType) {
                        vm.bbErrorType = newValue;
                    }
                });
            }
        }

        return {
            restrict: 'E',
            require: ['bbErrorImage', '?^bbError'],
            controller: BBErrorImageController,
            controllerAs: 'bbErrorImage',
            bindToController: {
                errorType: '@',
                bbErrorType: '@'
            },
            link: link,
            scope: {},
            transclude: true,
            templateUrl: 'sky/templates/error/error.image.directive.html'
        };
    }

    angular.module('sky.error.image.directive', [])
        .directive('bbErrorImage', bbErrorImage);
}());

/* global angular */
(function () {
    'use strict';

    function BBErrorTitleController($scope, bbResources) {
        var vm = this;

        $scope.$on('$destroy', function () {
            if (angular.isFunction(vm.onDestroy)) {
                vm.onDestroy();
                vm = null;
            }
        });

        $scope.$watch(function () {
            return vm.bbErrorType || vm.errorType;
        }, function (newValue) {
            switch (newValue) {
                case 'broken':
                    vm.title = bbResources.error_title_broken;
                    break;
                case 'construction':
                    vm.title = bbResources.error_title_construction;
                    break;
                case 'notFound':
                    vm.title = bbResources.error_title_notfound;
                    break;
            }
        });
    }

    BBErrorTitleController.$inject = ['$scope', 'bbResources'];

    function bbErrorTitle() {
        function link(scope, el, attrs, ctrls) {
            var vm = ctrls[0],
                bbError = ctrls[1];

            vm.el = el;

            if (bbError !== null) {
                bbError.setTitle(vm, 'errorDefault' in attrs);
            }

        }

        return {
            restrict: 'E',
            require: ['bbErrorTitle', '?^bbError'],
            controller: BBErrorTitleController,
            controllerAs: 'bbErrorTitle',
            bindToController: {
                errorType: '@',
                bbErrorType: '@'
            },
            link: link,
            scope: {},
            transclude: true,
            templateUrl: 'sky/templates/error/error.title.directive.html'
        };
    }

    angular.module('sky.error.title.directive', [])
        .directive('bbErrorTitle', bbErrorTitle);
}());

/*global angular */

(function () {
    'use strict';

    function BBErrorModalController($uibModalInstance, options) {
        var vm = this;

        vm.options = options;

        vm.close = function () {
            $uibModalInstance.close();
        };
    }

    BBErrorModalController.$inject = ['$uibModalInstance', 'options'];

    angular.module('sky.errormodal.controller', ['sky.error.directive'])
        .controller('BBErrorModalController', BBErrorModalController);
}());

/*global angular */

(function () {
    'use strict';

    function bbErrorModal(bbModal) {
        return {
            open: function (options) {
                return bbModal.open({
                    controller: 'BBErrorModalController as bbErrorModal',
                    templateUrl: 'sky/templates/error/errormodal.template.html',
                    resolve: {
                        options: function () {
                            return options;
                        }
                    }
                });
            }
        };
    }

    bbErrorModal.$inject = ['bbModal'];

    angular.module('sky.errormodal.service', ['sky.errormodal.controller', 'sky.modal'])
        .factory('bbErrorModal', bbErrorModal);
}());

/*jshint browser: true */
/*global angular */

(function () {
    'use strict';

    angular.module(
        'sky.fileattachments',
        [
            'sky.fileattachments.filedrop',
            'sky.fileattachments.fileitem',
            'sky.fileattachments.filesize'
        ]
    );
}());

/*global angular, jQuery */

(function ($) {
    'use strict';

    function run($window) {
        $($window).on('dragover drop', function (e) {
            if (!$(e.target).hasClass('bb-file-drop-target')) {
                e.preventDefault();
            }
        });
    }

    run.$inject = ['$window'];

    function bbFileDrop($parse, $templateCache) {
        return {
            link: function (scope, el, attrs) {
                scope.bbFileDrop = {
                    hasTranscludeContents: $.trim(el.find('.bb-file-drop-contents-custom').html()).length > 0,
                    allowLinks: angular.isDefined(attrs.bbFileDropLink),
                    addLink: function ($event) {
                        $event.preventDefault();
                        scope.bbFileDropLinkChange({
                            link: {
                                url: scope.bbFileDrop.url
                            }
                        });

                        scope.bbFileDrop.url = null;
                    },
                    fileChange: function ($files, $event, $invalidFiles) {
                        if ($files.length > 0 || $invalidFiles.length > 0) {
                            scope.bbFileDropChange({
                                files: $files,
                                rejectedFiles: $invalidFiles
                            });
                        } 
                    },
                    validate: function ($file) {
                        return scope.bbFileDropValidateFn({
                            file: $file
                        });
                    }
                };
            },
            scope: {
                bbFileDropChange: '&',
                bbFileDropLinkChange: '&',
                bbFileDropValidateFn: '&'
            },
            template: function (el, attrs) {
                var dropEl;

                el.html($templateCache.get('sky/templates/fileattachments/filedrop.html'));

                dropEl = el.find('.bb-file-drop');

                dropEl.attr({
                    'ngf-allow-dir': attrs.bbFileDropAllowDir,
                    'ngf-pattern': attrs.bbFileDropAccept,
                    'ngf-multiple': attrs.bbFileDropMultiple || 'true',
                    'ngf-min-size': attrs.bbFileDropMinSize || '0',
                    'ngf-max-size': attrs.bbFileDropMaxSize || '500000'
                });

                if (angular.isDefined(attrs.bbFileDropNoclick)) {
                    dropEl.addClass('bb-file-drop-noclick');
                } else {
                    dropEl.attr('ngf-select', '');
                }
            },
            transclude: true
        };
    }

    bbFileDrop.$inject = ['$parse', '$templateCache'];

    angular.module('sky.fileattachments.filedrop', ['ngFileUpload', 'sky.resources'])
        .run(run)
        .directive('bbFileDrop', bbFileDrop);
}(jQuery));

/*global angular */

(function () {
    'use strict';

    function bbFileItem() {
        return {
            link: function (scope) {
                function getFileTypeUpper() {
                    var fileType = '';

                    if (scope.item) {
                        fileType = scope.item.type || '';
                    }

                    return fileType.toUpperCase();
                }

                function getFileExtensionUpper() {
                    var extension = '',
                        name;

                    if (scope.item) {
                        name = scope.item.name || '';

                        extension = name.substr(name.lastIndexOf('.')) || '';
                    }

                    return extension.toUpperCase();
                }

                scope.bbFileItem = {
                    isFile: function () {
                        var item = scope.item;

                        return item && angular.isDefined(item.size) && item.size !== '' && item.size !== null;
                    },

                    isImg: function () {
                        var fileTypeUpper = getFileTypeUpper(),
                            slashIndex;

                        slashIndex = fileTypeUpper.indexOf('/');

                        if (slashIndex >= 0) {
                            switch (fileTypeUpper.substr(fileTypeUpper.indexOf('/') + 1)) {
                            case 'BMP':
                            case 'GIF':
                            case 'JPEG':
                            case 'PNG':
                                return true;
                            }
                        }

                        return false;
                    }
                };

                scope.$watch('item.type', function () {
                    var cls,
                        extensionUpper = getFileExtensionUpper(),
                        fileTypeUpper;

                    switch (extensionUpper) {
                        case '.PDF':
                            cls = 'pdf';
                            break;
                        case '.GZ':
                        case '.RAR':
                        case '.TGZ':
                        case '.ZIP':
                            cls = 'archive';
                            break;
                        case '.PPT':
                        case '.PPTX':
                            cls = 'powerpoint';
                            break;
                        case '.DOC':
                        case '.DOCX':
                            cls = 'word';
                            break;
                        case '.XLS':
                        case '.XLSX':
                            cls  = 'excel';
                            break;
                        case '.TXT':
                            cls = 'text';
                            break;
                        case '.HTM':
                        case '.HTML':
                            cls = 'code';
                            break;
                    }

                    if (!cls) {
                        fileTypeUpper = getFileTypeUpper();

                        switch (fileTypeUpper.substr(0, fileTypeUpper.indexOf('/'))) {
                            case 'AUDIO':
                                cls = 'audio';
                                break;
                            case 'IMAGE':
                                // Normally images are displayed as thumbnails, but if an image type is not recognized
                                // as being widely supported by modern browsers (e.g. TIFF files) then an icon should
                                // be displayed instead.
                                cls = 'image';
                                break;
                            case 'TEXT':
                                cls = 'text';
                                break;
                            case 'VIDEO':
                                cls = 'video';
                                break;
                        }
                    }

                    scope.bbFileItem.otherCls = 'fa-file-' + (cls ? cls + '-' : '') + 'o';
                });
            },
            scope: {
                item: '=bbFileItem',
                itemDelete: '&bbFileItemDelete'
            },
            templateUrl: 'sky/templates/fileattachments/fileitem.html',
            transclude: true
        };
    }

    angular.module('sky.fileattachments.fileitem', ['ngFileUpload', 'sky.fileattachments.filesize', 'sky.resources'])
        .directive('bbFileItem', bbFileItem);
}());

/*global angular */

(function () {
    'use strict';
    
    function bbFileSize($filter, bbFormat, bbResources) {
        return function (input) {
            var decimalPlaces = 0,
                dividend = 1,
                formattedSize,
                roundedSize,
                template;
            
            if (input === null || angular.isUndefined(input)) {
                return '';
            }
            
            if (Math.abs(input) === 1) {
                template = bbResources.file_size_b_singular;
            } else if (input < 1000) {
                template = bbResources.file_size_b_plural;
            } else if (input < 1e6) {
                template = bbResources.file_size_kb;
                dividend = 1000;
            } else if (input < 1e9) {
                template = bbResources.file_size_mb;
                dividend = 1e6;
                decimalPlaces = 1;
            } else {
                template = bbResources.file_size_gb;
                dividend = 1e9;
                decimalPlaces = 1;
            }

            roundedSize = Math.floor(input / (dividend / Math.pow(10, decimalPlaces))) / Math.pow(10, decimalPlaces);

            formattedSize = $filter('number')(roundedSize);

            return bbFormat.formatText(template, formattedSize);
        };
    }
    
    bbFileSize.$inject = ['$filter', 'bbFormat', 'bbResources'];
    
    angular.module('sky.fileattachments.filesize', ['sky.format', 'sky.resources'])
        .filter('bbFileSize', bbFileSize);
}());
/* global angular */
(function () {
    'use strict';

    angular.module('sky.filter.button.component', ['sky.resources'])
        .component('bbFilterButton', {
            templateUrl: 'sky/templates/filter/filter.button.component.html',
            bindings: {
                bbFilterButtonOnClick: '&',
                bbFilterButtonActive: '<?'
            }
        });
})();
/* global angular */
(function () {
    'use strict';

    angular.module('sky.filter.modal.footer.component', ['sky.resources', 'sky.modal'])
        .component('bbFilterModalFooter', {
            templateUrl: 'sky/templates/filter/filter.modal.footer.component.html',
            bindings: {
                bbFilterModalApply: '&',
                bbFilterModalClear: '&'
            }
        });
})();
/* global angular */
(function () {
    'use strict';

    angular.module('sky.filter.summary.component', ['sky.resources'])
        .component('bbFilterSummary', {
            templateUrl: 'sky/templates/filter/filter.summary.component.html',
            transclude: true
        });
})();
/* global angular */
(function () {
    'use strict';

    function Controller($log) {
        var ctrl = this;

        function summaryItemInit() {
            if (angular.isDefined(ctrl.bbFilterSummaryItemIsDismissable)) {
                $log.warn('bb-filter-summary-item-is-dismissable is deprecated, use bb-filter-summary-item-is-dismissible instead.');
            }

            if (angular.isUndefined(ctrl.bbFilterSummaryItemIsDismissable) && angular.isUndefined(ctrl.bbFilterSummaryItemIsDismissible)) {
                ctrl.bbFilterSummaryItemIsDismissible = true;
            }
        }

        function clearFilter($event) {
            $event.stopPropagation();
            if (angular.isFunction(ctrl.bbFilterSummaryItemOnDismiss)) {
                ctrl.bbFilterSummaryItemOnDismiss();
            }
            
        }

        ctrl.$onInit = summaryItemInit;

        ctrl.clearFilter = clearFilter;
    }

    Controller.$inject = ['$log'];

    angular.module('sky.filter.summary.item.component', [])
        .component('bbFilterSummaryItem', {
            templateUrl: 'sky/templates/filter/filter.summary.item.component.html',
            controller: Controller,
            bindings: {
                bbFilterSummaryItemOnClick: '&?',
                bbFilterSummaryItemOnDismiss: '&?',
                bbFilterSummaryItemIsDismissable: '<?',
                bbFilterSummaryItemIsDismissible: '<?'
            },
            transclude: true
        });
})();
/*global angular */

(function () {
    'use strict';
    var tagsToReplace = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;'
    };

    function replaceTag(tag) {
        return tagsToReplace[tag];
    }

    function isEmpty(str) {
        return str === null || angular.isUndefined(str);
    }

    angular.module('sky.format', [])
        .factory('bbFormat', function () {
            return {
                formatText: function (format) {
                    var args;

                    if (isEmpty(format)) {
                        return '';
                    }

                    args = arguments;

                    return String(format).replace(/\{(\d+)\}/g, function (match, capture) {
                        /*jslint unparam: true */
                        return args[parseInt(capture, 10) + 1];
                    });
                },
                escape: function (str) {
                    if (isEmpty(str)) {
                        return '';
                    }

                    return String(str).replace(/[&<>]/g, replaceTag);
                }
            };
        });
}());

/* global angular */ 
(function () {
    'use strict';

    function bbColumnPicker(bbModal) {
        function openColumnPicker(columnPickerOptions) {
            bbModal.open({
                templateUrl: 'sky/templates/grids/columnpicker.html',
                controller: 'BBGridColumnPickerController',
                resolve: {
                    columns: function () {
                        return columnPickerOptions.columns;
                    },
                    selectedColumnIds: function () {
                        return columnPickerOptions.selectedColumnIds;
                    },
                    columnPickerHelpKey: function () {
                        return columnPickerOptions.helpKey;
                    },
                    subsetLabel: function () {
                        return columnPickerOptions.subsetLabel;
                    },
                    subsetProperty: function () {
                        return columnPickerOptions.subsetProperty;
                    },
                    subsetExclude: function () {
                        return columnPickerOptions.subsetExclude;
                    },
                    onlySelected: function () {
                        return columnPickerOptions.onlySelected;
                    }
                }
            }).result.then(function (selectedColumnIds) {
                columnPickerOptions.selectedColumnIdsChangedCallback(selectedColumnIds);
            }, 
                angular.noop
            );
        }
        return {
            openColumnPicker: openColumnPicker
        };
    }

    bbColumnPicker.$inject = ['bbModal'];

    angular.module('sky.grids.columnpicker.factory', ['sky.modal', 'sky.grids.columnpicker'])
        .factory('bbColumnPicker', bbColumnPicker);
    
})();
/*jslint browser: false, plusplus: true */
/*global angular */

(function () {
    'use strict';

    function buildCategoryList(columns) {
        var categories = [],
            column,
            index,
            len;

        len = columns.length;

        for (index = 0; index < len; index++) {
            column = columns[index];

            if (column.category) {
                if (categories.indexOf(column.category) === -1) {
                    categories.push(column.category);
                }
            }
        }

        return categories;
    }


    function columnCompare(a, b) {
        a = a.title.toLocaleLowerCase();
        b = b.title.toLocaleLowerCase();

        if (a < b) {
            return -1;
        }

        if (a > b) {
            return 1;
        }

        return 0;
    }

    function getInitialSelectedColumns(columns, selectedIds) {
        var selectedColumns = [];

        angular.forEach(columns, function (column) {
            if (selectedIds.indexOf(column.id) >= 0) {
                selectedColumns.push(column);
            }
        });

        return selectedColumns;
    }

    function BBGridColumnPickerController($scope, availableColumns, initialSelectedColumnIds, columnPickerHelpKey, subsetLabel, subsetProperty, subsetExclude, onlySelected) {
        var columns = [],
            initialSelectedColumns;

        angular.forEach(availableColumns, function (column) {
            var newColumn = {
                id: column.id,
                name: column.name,
                title: column.caption,
                category: column.category,
                description: column.description
            };

            if (subsetProperty) {
                newColumn[subsetProperty] = column[subsetProperty];
            }

            columns.push(newColumn);
        });

        initialSelectedColumns = getInitialSelectedColumns(columns, initialSelectedColumnIds);

        columns.sort(columnCompare);

        $scope.columns = columns;
        $scope.categories = buildCategoryList(columns);
        $scope.locals = {};
        $scope.locals.selectedColumns = initialSelectedColumns.slice(0);
        $scope.locals.subsetLabel = subsetLabel;
        $scope.locals.subsetProperty = subsetProperty;

        if (subsetExclude) {
            $scope.locals.subsetExclude = subsetExclude;
        }

        if (onlySelected) {
            $scope.locals.onlySelected = onlySelected;
        }

        $scope.columnPickerHelpKey = columnPickerHelpKey;

        $scope.applyChanges = function () {
            var column,
                scopeColumns = $scope.columns,
                selectedColumns = $scope.locals.selectedColumns,
                columnIds = [],
                i;

            //Loop through previously selected columns.  If they are still selected, add
            //them to the resulting list in their original order.
            angular.forEach(initialSelectedColumnIds, function (columnId) {
                for (i = 0; i < scopeColumns.length; i++) {
                    column = scopeColumns[i];

                    if (column.id === columnId) {
                        if (selectedColumns.indexOf(column) >= 0) {
                            columnIds.push(column.id);
                        }
                        break;
                    }
                }
            });

            //Loop through all columns.  If they are selected and not already in the list
            //then add them to the end.
            angular.forEach(selectedColumns, function (column) {
                var id = column.id;

                if (columnIds.indexOf(id) < 0) {
                    columnIds.push(id);
                }
            });

            $scope.$close(columnIds);
        };
    }

    BBGridColumnPickerController.$inject = ['$scope', 'columns', 'selectedColumnIds', 'columnPickerHelpKey', 'subsetLabel', 'subsetProperty', 'subsetExclude', 'onlySelected'];

    angular.module('sky.grids.columnpicker', ['sky.checklist', 'sky.resources'])
        .controller('BBGridColumnPickerController', BBGridColumnPickerController);
}());

/*global angular */

(function () {
    'use strict';
    
    angular.module('sky.grids.actionbar', ['sky.mediabreakpoints', 'sky.resources'])
    .directive('bbGridActionBar', ['bbMediaBreakpoints', 'bbResources', '$timeout', function (bbMediaBreakpoints, bbResources, $timeout) {
        return {
                require: '^bbGrid',
                replace: true,
                transclude: true,
                restrict: 'E',
                scope: {
                    bbMultiselectActions: '=',
                    bbSelectionsUpdated: '&'
                },
                controller: ['$scope', function ($scope) {
                    $scope.locals = {
                        actions: $scope.bbMultiselectActions,
                        showActionBar: false,
                        mobileButtons: false,
                        showMobileActions: false
                    };

                    $scope.resources = bbResources;
                }],
                link: function ($scope, element, attrs, bbGrid) {
                    /*jslint unparam: true */
                    var visibleSelected = [];
                    
                    function updateActionBar(data, selected) {
                        var action,
                            i,
                            showActionBar;
                        
                        //this notation is necessary because the argument is passed through grid and then to the controller
                        //in which grid resides.
                        visibleSelected = bbGrid.getVisibleSelections(data, selected);
                        
                        $scope.bbSelectionsUpdated({ selections: { selections: visibleSelected } });

                        showActionBar = false;
                        if ($scope.locals.actions) {
                            //only show the action bar if an action has an available selection
                            for (i = 0; i < $scope.locals.actions.length; i++) {
                                action = $scope.locals.actions[i];
                                if (action.selections.length > 0) {
                                    showActionBar = true;
                                }
                            }
                        }
                        
                        $scope.locals.showActionBar = showActionBar;

                        if (showActionBar) {
                            $timeout(function () {
                                bbGrid.syncActionBarViewKeeper();
                            });
                        }
                    }
                    
                    
                    bbGrid.scope.$watchCollection('selectedRows', function (newValue) {
                        updateActionBar(bbGrid.scope.options.data, newValue);
                    });

                    bbGrid.scope.$watchCollection('options.data', function (newValue) {
                        updateActionBar(newValue, bbGrid.scope.selectedRows);
                    });
                    
                    //on mobile do an ng-if that changes the stuff.
                    function mediaBreakpointHandler(newBreakpoints) {
                        $scope.locals.mobileButtons = newBreakpoints.xs;
                    }

                    bbMediaBreakpoints.register(mediaBreakpointHandler);

                    element.on('$destroy', function () {
                        bbMediaBreakpoints.unregister(mediaBreakpointHandler);
                    });

                    $scope.locals.clearSelection = function () {
                        
                        //If the visible selections are the same as the selected rows we can just reset all multiselected rows
                        if (visibleSelected.length === bbGrid.scope.selectedRows.length) {
                            bbGrid.resetMultiselect();
                        } else {
                            bbGrid.toggleMultiselectRows(visibleSelected);
                        }
                        
                    };

                    $scope.locals.chooseAction = function () {
                        $scope.locals.showMobileActions = true;
                    };

                    $scope.locals.cancelChooseAction = function () {
                        $scope.locals.showMobileActions = false;
                    };
                },
                templateUrl: 'sky/templates/grids/actionbar.html'
            };
    }]);
}());
/*global angular */

(function () {
    'use strict';
    angular.module('sky.grids.filters', ['sky.help', 'sky.resources', 'sky.mediabreakpoints'])
    .directive('bbGridFilters', ['bbHelp', 'bbResources', 'bbMediaBreakpoints', function (bbHelp, bbResources, bbMediaBreakpoints) {
        return {
            require: '^bbGrid',
            replace: true,
            transclude: true,
            restrict: 'E',
            scope: {
                bbOptions: "="
            },
            controller: ['$scope', '$log', function ($scope, $log) {

                $log.warn('The bb-grid-filters directive is deprecated. Use a filter modal instead. See http://skyux.developer.blackbaud.com/components/grids/ for examples');

                $scope.applyFilters = function () {
                    var args = {},
                        options = $scope.bbOptions;

                    if (options && options.applyFilters) {
                        options.applyFilters(args);
                        $scope.updateFilters(args.filters);

                        if (bbMediaBreakpoints.getCurrent().xs) {
                            $scope.locals.expanded = false;
                        }
                    }
                };
                $scope.clearFilters = function () {
                    var args = {},
                        options = $scope.bbOptions;

                    if (options && options.clearFilters) {
                        options.clearFilters(args);
                        $scope.updateFilters(args.filters);
                    }
                };
            }],
            link: function ($scope, element, attrs, bbGrid) {
                /*jslint unparam: true */
                var box = element.find('.bb-grid-filters-box'),
                    filtersContainer = element.find('.bb-grid-filters-container');

                $scope.locals = {
                    expanded: false
                };

                $scope.viewKeeperOptions = {};

                bbGrid.viewKeeperChangedHandler = function (val) {
                    $scope.viewKeeperOptions.viewKeeperOffsetElId = val;
                };

                bbGrid.toggleFilterMenu = function (isOpen) {
                    if (angular.isDefined(isOpen)) {
                        $scope.locals.expanded = isOpen;
                    } else {
                        $scope.locals.expanded = !$scope.locals.expanded;
                    }

                    if ($scope.locals.expanded) {
                        bbHelp.close();
                    }
                };

                bbGrid.openFilterMenu = function () {
                    $scope.locals.expanded = true;
                };

                bbGrid.scope.$watch('gridCreated', function (newValue) {
                    /* istanbul ignore else */
                    /* sanity check */
                    if (newValue) {
                        element.parents('.bb-grid-container').prepend(element);
                        element.show();
                    }
                });

                $scope.updateFilters = function (filters) {
                    bbGrid.setFilters(filters);
                };

                $scope.resources = bbResources;

                function animateFilters(isExpanded) {
                    var animationDuration = 250;
                    if (isExpanded) {
                        box.css('left', '240px');
                        filtersContainer.show();
                        box.animate({ 'left': '0' }, animationDuration);
                    } else {
                        box.animate({ 'left': '240px' }, {
                            duration: animationDuration,
                            complete: function () {
                                box.css('left', '0');
                                filtersContainer.hide();
                            }
                        });
                    }
                }

                $scope.$watch('locals.expanded', function (newValue, oldValue) {
                    if (newValue !== oldValue || newValue) {
                        animateFilters(newValue);
                    }
                });

            },
            templateUrl: 'sky/templates/grids/filters.html'
        };
    }])
    .directive('bbGridFiltersGroup', function () {
        return {
            replace: true,
            transclude: true,
            restrict: 'E',
            scope: {
                bbGridFiltersGroupLabel: '=',
                isCollapsed: '=?bbGridFiltersGroupIsCollapsed'
            },
            templateUrl: 'sky/templates/grids/filtersgroup.html'
        };
    })
    .directive('bbGridFiltersSummary', ['bbResources', '$log', function (bbResources, $log) {
        return {
            require: '^bbGrid',
            replace: true,
            transclude: true,
            restrict: 'E',
            scope: {
            },
            bindToController: {
                bbOptions: '=',
                bbGridFiltersSummaryDismissable: '=?'
            },
            controllerAs: 'gridFilterSummary',
            controller: ['$scope', function ($scope) {
                var ctrl = this;

                function onInit() {
                    $log.warn('The bb-grid-filters-summary directive is deprecated. Use the bb-filter-summary component instead. See http://skyux.developer.blackbaud.com/components/grids/ for examples');

                    $scope.clearFilters = function () {
                        var args = {},
                            options = ctrl.bbOptions;

                        if (options && options.clearFilters) {
                            options.clearFilters(args);
                            $scope.updateFilters(args.filters);
                        }
                    };

                    if (angular.isUndefined(ctrl.bbGridFiltersSummaryDismissable)) {
                        ctrl.bbGridFiltersSummaryDismissable = true;
                    }

                    $scope.resources = bbResources;
                }

                ctrl.$onInit = onInit;
            }],
            link: function ($scope, element, attrs, bbGrid) {
                /*jslint unparam: true */

                bbGrid.scope.$watch('gridCreated', function () {
                    var toolbarContainer = element.parents('.bb-grid-container').find('.bb-grid-toolbar-container .bb-grid-filter-summary-container');
                    toolbarContainer.append(element);
                });


                $scope.updateFilters = function (filters) {
                    bbGrid.setFilters(filters);
                };

                $scope.openFilterMenu = function () {
                    if (bbGrid.openFilterMenu) {
                        bbGrid.openFilterMenu();
                    }
                };
                $scope.$watch(function () {
                    return element.is(':visible');
                }, function (newValue, oldValue) {
                    if (newValue !== oldValue) {
                        bbGrid.syncViewKeepers();
                    }
                });
            },
            templateUrl: 'sky/templates/grids/filterssummary.html'
        };
    }]);

}());

/*jslint plusplus: true */
/*global angular, jQuery */

(function ($) {
    'use strict';

    var DEFAULT_ITEMS_PER_PAGE = 5,
        DEFAULT_MAX_PAGES = 5,
        DEFAULT_COLUMN_SIZE = 150,
        MULTISELECT_COLUMN_SIZE = 35,
        DROPDOWN_TOGGLE_COLUMN_SIZE = 40,
        DROPDOWN_TOGGLE_COLUMN_NAME = 'dropdownToggle',
        MULTISELECT_COLUMN_NAME = 'cb';


    function arrayObjectIndexOf(array, obj) {
        var i;
        for (i = 0; i < array.length; i++) {
            if (angular.equals(array[i], obj)) {
                return i;
            }
        }
        return -1;
    }

    angular.module('sky.grids',
            [
                'sky.infinitescroll',
                'sky.contextmenu',
                'sky.mediabreakpoints',
                'sky.viewkeeper',
                'sky.highlight',
                'sky.resources',
                'sky.data',
                'sky.grids.filters',
                'sky.grids.actionbar',
                'sky.window',
                'sky.grids.toolbar'
                ])
        .controller('bbGridContextMenuController', ['$scope', function ($scope) {
            function toggleDropdown($event) {
                $event.preventDefault();
                $event.stopPropagation();
                $scope.locals.is_open = !$scope.locals.is_open;
            }

            $scope.locals = {
                is_open: false,
                items: [],
                toggleDropdown: toggleDropdown
            };

            /*istanbul ignore else */
            /* sanity check */
            if (angular.isFunction($scope.getContextMenuItems)) {
                $scope.locals.items = $scope.getContextMenuItems($scope.rowData.id, $scope.rowData);
            }
        }])


        .directive('bbGrid', ['$window', '$compile', '$templateCache', 'bbMediaBreakpoints', 'bbViewKeeperBuilder', 'bbHighlight', 'bbResources', 'bbData', '$controller', '$timeout', 'bbWindow', '$q',

            function ($window, $compile, $templateCache, bbMediaBreakpoints, bbViewKeeperBuilder, bbHighlight, bbResources, bbData, $controller, $timeout, bbWindow, $q) {
                return {
                    replace: true,
                    transclude: {
                        'bbGridToolbar': '?bbGridToolbar'
                    },
                    require: ['bbGrid', '?^^bbListbuilder'],
                    restrict: 'E',
                    scope: {
                        options: '=bbGridOptions',
                        multiselectActions: '=?bbMultiselectActions',
                        updateMultiselectActions: '&bbSelectionsUpdated',
                        paginationOptions: '=?bbGridPagination',
                        selectedRows: '=?bbSelectedRows',
                        bbGridMultiselectIdProperty: '@?',
                        bbGridMultiselectSelectedIds: '<?'
                    },
                    controller: ['$scope', function ($scope) {
                        var locals,
                            self = this;

                        function onInit() {
                            function searchApplied(searchText) {
                                locals.appliedSearchText = searchText;
                                /*istanbul ignore else */
                                /* sanity check */
                                if (angular.isFunction(locals.highlightSearchText)) {
                                    locals.highlightSearchText(locals.appliedSearchText);
                                }
                            }

                            self.searchApplied = searchApplied;

                            self.setFilters = function (filters) {
                                /*istanbul ignore else */
                                /* sanity check */
                                if (angular.isFunction(locals.setFilters)) {
                                    locals.setFilters(filters);
                                }
                            };

                            self.syncViewKeepers = function () {
                                /*istanbul ignore else */
                                /* sanity check */
                                if ($scope.syncViewKeepers) {
                                    $scope.syncViewKeepers();
                                }
                            };

                            self.syncActionBarViewKeeper = function () {
                                /*istanbul ignore else */
                                /* sanity check */
                                if (angular.isFunction($scope.syncActionBarViewKeeper)) {
                                    $scope.syncActionBarViewKeeper();
                                }
                            };

                            self.resetMultiselect = function () {
                                /*istanbul ignore else */
                                /* sanity check */
                                if (angular.isFunction(locals.resetMultiselect)) {
                                    locals.resetMultiselect();
                                }
                            };

                            self.getVisibleSelections = function (data, selected) {
                                var i,
                                    index,
                                    result = [];

                                for (i = 0; i < selected.length; i++) {
                                    index = arrayObjectIndexOf(data, selected[i]);
                                    if (index > -1) {
                                        result.push(selected[i]);
                                    }
                                }
                                return result;
                            };

                            self.toggleMultiselectRows = function (visibleSelectedRows) {
                                /*istanbul ignore else */
                                /* sanity check */
                                if (angular.isFunction(locals.toggleMultiselectRows)) {
                                    locals.toggleMultiselectRows(visibleSelectedRows);
                                }
                            };

                            self.syncGridHeaderScrollToTopScrollbar = function () {
                                /*istanbul ignore else */
                                /* sanity check */
                                if (angular.isFunction(locals.topScrollbarScroll)) {
                                    locals.topScrollbarScroll();
                                }
                            };

                            self.highlightSearchText = function () {
                                /*istanbul ignore else */
                                /* sanity check */
                                if (angular.isFunction(locals.highlightSearchText)) {
                                    locals.highlightSearchText();
                                }
                            };



                            self.scope = $scope;

                            $scope.resources = bbResources;

                            locals = $scope.locals = {
                                gridId: 'bbgrid-table-' + $scope.$id,
                                hasAdd: false,
                                hasColPicker: true,
                                hasFilters: true,
                                applySearchText: function () {
                                    /*istanbul ignore else */
                                    /* sanity check */
                                    if (angular.isFunction(self.applySearchText)) {
                                        self.applySearchText();
                                    }
                                }
                            };

                            $scope.$watch('options.viewKeeperOffsetElId', function (newValue, oldValue) {
                                if (newValue !== oldValue) {
                                    if (self.viewKeeperChangedHandler) {
                                        self.viewKeeperChangedHandler(newValue);
                                    }
                                }
                            });
                        }

                        self.$onInit = onInit;
                    }],
                    link: function ($scope, element, attr, ctrls, $transclude) {
                        var bbGrid = ctrls[0],
                            listbuilderCtrl = ctrls[1];

                        $scope.hasListbuilder = ctrls[1] !== null;

                        $scope.customToolbar = {
                            hasCustomToolbar: false
                        };
                        $scope.customToolbar.hasCustomToolbar = $transclude.isSlotFilled('bbGridToolbar');

                        $timeout(function () {
                            var breakpoints = {},
                                cellScopes,
                                columnCount = 0,
                                columnModel,
                                compiledTemplates = [],
                                currentExtendedColumnWidth,
                                extendedColumnIndex,
                                extendedColumnName,
                                fullGrid,
                                getContextMenuItems,
                                hasTemplatedColumns,
                                header,
                                id,
                                locals = $scope.locals,
                                localRowSelect = false,
                                needsExtendedColumnResize,
                                originalExtendedColumnWidth,
                                seemore_template = 'sky/templates/grids/seemore.html',
                                dropdown_template = 'sky/templates/grids/dropdown.html',
                                reorderingColumns,
                                tableBody,
                                tableEl = element.find('table'),
                                tableDomEl = tableEl[0],
                                tableWrapper = element.find('.table-responsive'),
                                tableWrapperWidth,
                                toolbarContainer = element.find('.bb-grid-toolbar-viewkeeper'),
                                toolbarContainerId,
                                totalColumnWidth,
                                verticalOffSetElId,
                                vkActionBarAndBackToTop,
                                vkToolbars,
                                vkHeader,
                                windowEl = $($window),
                                windowEventId,
                                resizeStartColWidth,
                                hasPristineColumns = true,
                                columnHasJsonMap,
                                doNotResetRows = false;

                            function getTopScrollbar() {
                                if (!$scope.hasListbuilder) {
                                    return element.find('.bb-grid-top-scrollbar');
                                } else {
                                    return listbuilderCtrl.getListbuilderToolbarTopScrollbarEl();
                                }

                            }

                            function getTopScrollbarDiv() {
                                if (!$scope.hasListbuilder) {
                                    return element.find('.bb-grid-top-scrollbar > div');
                                } else {
                                    return listbuilderCtrl.getListbuilderToolbarTopScrollbarEl().find(' > div');
                                }
                            }

                            function updateGridLoadedTimestampAndRowCount(count) {
                                $scope.locals.timestamp = new Date().getTime();
                                $scope.locals.rowcount = count;
                            }

                            function reInitGrid() {
                                if ($scope.options && $scope.options.selectedColumnIds && $scope.options.selectedColumnIds.length > 0 && tableEl[0].grid) {

                                    initGrid();

                                    if ($scope.options.data && $scope.options.data.length > 0) {
                                        setRows($scope.options.data);
                                    }
                                }
                            }

                            function mediaBreakpointHandler(newBreakpoints) {
                                breakpoints = newBreakpoints;
                                reInitGrid();
                            }

                            function buildColumnClasses(column) {
                                var classes = '';

                                //if this column does not allow search then add the appropriate class. This is used when highlighting search results
                                if (column.exclude_from_search) {
                                    classes += "bb-grid-no-search ";
                                }

                                return classes;
                            }

                            function getEmptyString() {
                                return '';
                            }

                            function buildCellAttribute(rowId, cellValue, rawObject, column) {
                                /*jslint unparam: true*/
                                return "data-grid-field='" + column.name + "'" + "data-bbauto-field='" + column.name + "'" + "data-bbauto-index='" + (tableEl.getInd(rowId) - 1) + "'";
                            }

                            function getColumnById(columns, id) {
                                var column,
                                    i;

                                for (i = 0; i < columns.length; i++) {
                                    column = columns[i];
                                    if (column.id === id) {
                                        return column;
                                    }
                                }
                            }

                            function resetExtendedColumn() {
                                //wipe out extended column stuff
                                extendedColumnName = null;
                                currentExtendedColumnWidth = null;
                                originalExtendedColumnWidth = null;
                                extendedColumnIndex = null;
                                needsExtendedColumnResize = false;
                            }

                            function getBreakpointsWidth(column) {
                                var columnDefault;

                                if (column.width_all > 0) {
                                    columnDefault = column.width_all;
                                } else {
                                    columnDefault = DEFAULT_COLUMN_SIZE;
                                }

                                if (breakpoints.xs) {
                                    return column.width_xs > 0 ? column.width_xs : columnDefault;
                                } else if (breakpoints.sm) {
                                    return column.width_sm > 0 ? column.width_sm : columnDefault;
                                } else if (breakpoints.md) {
                                    return column.width_md > 0 ? column.width_md : columnDefault;
                                } else if (breakpoints.lg) {
                                    return column.width_lg > 0 ? column.width_lg : columnDefault;
                                }

                                return columnDefault;
                            }

                            function buildColumnModel(columns, selectedColumnIds) {
                                var colModel = [],
                                    column,
                                    colWidth,
                                    index,
                                    gridColumn;

                                hasTemplatedColumns = false;

                                if (getContextMenuItems) {
                                    colModel.push({
                                        classes: 'bb-grid-dropdown-cell bb-grid-no-search',
                                        fixed: true,
                                        sortable: false,
                                        name: DROPDOWN_TOGGLE_COLUMN_NAME,
                                        label: ' ',
                                        width: DROPDOWN_TOGGLE_COLUMN_SIZE,
                                        title: false,
                                        hidedlg: true,
                                        resizable: false,
                                        search: false,
                                        template_url: dropdown_template,
                                        controller: 'bbGridContextMenuController',
                                        cellattr: buildCellAttribute,
                                        formatter: getEmptyString,
                                        is_context_menu: true
                                    });

                                    /*istanbul ignore else */
                                    /* sanity check */
                                    if (!compiledTemplates[dropdown_template]) {
                                        compiledTemplates[dropdown_template] = $compile($templateCache.get(dropdown_template));
                                    }

                                    hasTemplatedColumns = true;

                                    totalColumnWidth = totalColumnWidth + DROPDOWN_TOGGLE_COLUMN_SIZE;
                                }

                                resetExtendedColumn();

                                for (index = 0; index < selectedColumnIds.length; index++) {
                                    column = getColumnById(columns, selectedColumnIds[index]);

                                    if (column) {

                                        colWidth = getBreakpointsWidth(column);

                                        //If this is the last selected column and the sum of the columns is shorter than the area available, extend the last column
                                        if ((index === (selectedColumnIds.length - 1)) && (tableWrapper.width() > (colWidth + totalColumnWidth))) {
                                            needsExtendedColumnResize = true;
                                            originalExtendedColumnWidth = colWidth;
                                            extendedColumnName = column.name;
                                            extendedColumnIndex = index;

                                            //If multiselect and/or contextmenu exist, then the last column index is shifted.
                                            if (locals.multiselect) {
                                                extendedColumnIndex =  extendedColumnIndex + 1;
                                            }
                                            if (getContextMenuItems) {
                                                extendedColumnIndex = extendedColumnIndex + 1;
                                            }

                                            colWidth = tableWrapper.width() - totalColumnWidth;
                                            currentExtendedColumnWidth = colWidth;
                                        }

                                        if (column.jsonmap && column.jsonmap !== column.name) {
                                            columnHasJsonMap = true;
                                        }

                                        gridColumn = {
                                            index: column.id.toString(),
                                            sortable: false,
                                            id: column.id,
                                            name: column.name,
                                            label: column.caption,
                                            align: (column.right_align ? 'right' : (column.center_align ? 'center' : 'left')),
                                            classes: buildColumnClasses(column),
                                            cellattr: buildCellAttribute,
                                            controller: column.controller,
                                            template_url: column.template_url,
                                            jsonmap: column.jsonmap,
                                            allow_see_more: column.allow_see_more,
                                            title: angular.isUndefined(column.title) || column.title,
                                            width: colWidth
                                        };

                                        if (column.allow_see_more && !gridColumn.template_url) {
                                            gridColumn.template_url = seemore_template;

                                            if (!compiledTemplates[seemore_template]) {
                                                compiledTemplates[seemore_template] = $compile($templateCache.get(seemore_template));
                                            }
                                        }

                                        if (gridColumn.template_url) {
                                            //Setup a formatter to return an empty string until the
                                            //angular template is processed for the cell.
                                            gridColumn.formatter = getEmptyString;
                                            hasTemplatedColumns = true;
                                        } else if (column.colFormatter) {
                                            gridColumn.formatter = column.colFormatter;
                                        }

                                        colModel.push(gridColumn);

                                        totalColumnWidth = totalColumnWidth + colWidth;
                                    }
                                }

                                return colModel;
                            }

                            function getColumnElementIdFromName(columnName) {
                                return locals.gridId + "_" + columnName;
                            }

                            function getColumnNameFromElementId(columnName) {
                                /*istanbul ignore else */
                                /* sanity check */
                                if (columnName) {
                                    return columnName.replace(locals.gridId + "_", "");
                                }
                            }

                            function getDesiredGridWidth() {
                                var width = tableWrapper.width();

                                if (width < totalColumnWidth) {
                                    width = totalColumnWidth;
                                    tableWrapper.addClass('bb-grid-table-wrapper-overflow');
                                } else {
                                    tableWrapper.addClass('bb-grid-table-wrapper');
                                }

                                return width;
                            }

                            function setScrollbarHeight() {
                                var topScrollbar = getTopScrollbar(),
                                    topScrollbarDiv = getTopScrollbarDiv(),
                                    scrollbarWidth = bbWindow.getScrollbarWidth();
                                if (totalColumnWidth > (tableWrapper.width()) && !breakpoints.xs) {
                                    topScrollbar.height(scrollbarWidth);
                                    topScrollbarDiv.height(scrollbarWidth);
                                } else {
                                    topScrollbar.height(0);
                                    topScrollbarDiv.height(0);
                                }
                            }
                            
                            function resetTopScrollbar() {
                                var topScrollbarDiv = getTopScrollbarDiv();
                                topScrollbarDiv.width(totalColumnWidth);
                                setScrollbarHeight();
                            }

                            function setColumnSize(columnName, columnSize, totalWidth) {
                                var gridHeaders,
                                    colSizePx = columnSize + 'px',
                                    bodyScrollLeft,
                                    tableGrid = tableEl[0].grid;

                                gridHeaders = tableGrid.headers;
                                bodyScrollLeft = tableGrid.bDiv.scrollLeft;
                                /* jqGrid does not provide a function to change a single column column size.
                                   This code snippet mirrors how jqGrid changes column size in their own dragEnd
                                   function.
                                */
                                tableEl[0].p.colModel[extendedColumnIndex].width = columnSize;
                                gridHeaders[extendedColumnIndex].width = columnSize;
                                gridHeaders[extendedColumnIndex].el.style.width = colSizePx;
                                tableGrid.cols[extendedColumnIndex].style.width = colSizePx;
                                /* istanbul ignore next */
                                /* sanity check */
                                tableEl[0].p.tblwidth = totalWidth || tableEl[0].p.tblwidth;
                                tableGrid.hDiv.scrollLeft = bodyScrollLeft;
                            }

                            function resizeExtendedColumn(changedWidth, isIncreasing) {
                                var extendedShrinkWidth = currentExtendedColumnWidth - originalExtendedColumnWidth;

                                //If the extended portion of the last column is less than the amount resized
                                if (extendedShrinkWidth <= changedWidth) {
                                    //decrease extended column to original size


                                    //increase grid width by remainder and wipe out all the extended stuff
                                    if (isIncreasing) {
                                        totalColumnWidth = totalColumnWidth + (changedWidth - extendedShrinkWidth);
                                    } else {
                                        totalColumnWidth = totalColumnWidth - extendedShrinkWidth;
                                    }
                                    setColumnSize(extendedColumnName, originalExtendedColumnWidth, totalColumnWidth);

                                    tableWrapper.addClass('bb-grid-table-wrapper-overflow');
                                    resetExtendedColumn();

                                } else {
                                    //decrease extended column width by changedWidth
                                    currentExtendedColumnWidth = currentExtendedColumnWidth - changedWidth;


                                    if (!isIncreasing) {
                                        totalColumnWidth = totalColumnWidth - changedWidth;
                                    }
                                    setColumnSize(extendedColumnName, currentExtendedColumnWidth, totalColumnWidth);

                                }
                                tableEl.setGridWidth(totalColumnWidth, false);
                                resetTopScrollbar();
                            }

                            function getLastColumnWidth() {
                                return element.find('th.ui-th-column').last().width();
                            }

                            function resetGridWidth(oldWidth, newWidth) {
                                var changedWidth,
                                    topScrollbar = getTopScrollbar(),
                                    width;

                                topScrollbar.width(tableWrapper.width());
                                if (needsExtendedColumnResize && newWidth < oldWidth) {
                                    changedWidth = oldWidth - newWidth;
                                    resizeExtendedColumn(changedWidth, false);
                                } else {
                                    if (totalColumnWidth === oldWidth) {
                                        totalColumnWidth = newWidth;
                                    }

                                    width = getDesiredGridWidth();

                                    /*istanbul ignore else */
                                    /* sanity check */
                                    if (width > 0) {
                                        tableEl.setGridWidth(width);
                                        resetTopScrollbar();

                                        if (needsExtendedColumnResize) {
                                            currentExtendedColumnWidth = getLastColumnWidth();
                                        }
                                    }
                                }
                            }

                            function getLastIndex() {
                                var lastIndex = $scope.options.selectedColumnIds.length - 1;

                                if (locals.multiselect) {
                                    lastIndex = lastIndex + 1;
                                }
                                if (getContextMenuItems) {
                                    lastIndex = lastIndex + 1;
                                }

                                return lastIndex;
                            }

                            function resizeStart(event, index) {
                                var lastIndex = getLastIndex(),
                                    jqGridEl,
                                    thEls;

                                hasPristineColumns = false;

                                jqGridEl = element.find('.ui-jqgrid');

                                //if resizing last element and tableEl smaller than table wrapper

                                if (index === lastIndex && tableWrapperWidth > jqGridEl.width()) {
                                    //increase width of child of table-responsive
                                    jqGridEl.width(tableWrapperWidth);
                                    //increase width of hdiv
                                    element.find('.ui-jqgrid-hdiv').width(tableWrapperWidth);
                                    //make padding right on tr of headers
                                    element.find('.ui-jqgrid-hdiv tr').css('padding-right', tableWrapperWidth.toString() + 'px');
                                }

                                fullGrid.find('.ui-jqgrid-resize-mark').height(fullGrid.height());
                                thEls = element.find('.ui-jqgrid .ui-jqgrid-hdiv .ui-jqgrid-htable th');
                                resizeStartColWidth = parseInt(thEls[index].style.width);

                            }

                            function syncHeaderToTableWrapper() {
                                if (vkHeader && vkHeader.isFixed) {
                                    header.width(tableWrapper.width());
                                    header.scrollLeft(tableWrapper.scrollLeft());
                                }
                            }

                            function resizeStop(newWidth, index) {
                                var changedWidth,
                                    resizedColumnIndex = index;

                                //If multiselect and/or contextmenu exist, then the resized column index is shifted.
                                if (locals.multiselect) {
                                    resizedColumnIndex =  resizedColumnIndex - 1;
                                }
                                if (getContextMenuItems) {
                                    resizedColumnIndex =  resizedColumnIndex - 1;
                                }

                                $scope.$emit("columnsResized", { newWidth: newWidth, index: resizedColumnIndex });

                                tableWrapper.addClass('bb-grid-table-wrapper-overflow');

                                changedWidth = newWidth - resizeStartColWidth;

                                //If your last column was extended and this is the first resize
                                if (needsExtendedColumnResize) {
                                    //If the column you're resizing is not the extended column and you're increasing the size
                                    if (index !== extendedColumnIndex && changedWidth > 0) {

                                        resizeExtendedColumn(changedWidth, true);

                                        resetExtendedColumn();
                                        syncHeaderToTableWrapper();

                                        return;
                                    }
                                    resetExtendedColumn();
                                }

                                totalColumnWidth = totalColumnWidth + changedWidth;
                                tableEl.setGridWidth(totalColumnWidth, false);
                                resetTopScrollbar();
                                syncHeaderToTableWrapper();

                                return;
                            }

                            function setSortStyles() {
                                var className,
                                    headerElId,
                                    sortOptions;
                                /*istanbul ignore else */
                                /* sanity check */
                                if (header) {
                                    header.find('th').removeClass('sorting-asc').removeClass('sorting-desc');
                                    /* istanbul ignore else */
                                    /* sanity check */
                                    if ($scope.options) {
                                        sortOptions = $scope.options.sortOptions;
                                        if (sortOptions && sortOptions.column) {
                                            headerElId = getColumnElementIdFromName(sortOptions.column);

                                            if (sortOptions.descending) {
                                                className = 'sorting-desc';
                                            } else {
                                                className = 'sorting-asc';
                                            }

                                            header.find('#' + headerElId).addClass(className);
                                        }
                                    }
                                }
                            }

                            function columnIsSortable(columnName) {
                                var excludedColumns,
                                    sortOptions = $scope.options.sortOptions;

                                if (columnName === DROPDOWN_TOGGLE_COLUMN_NAME || columnName === MULTISELECT_COLUMN_NAME) {
                                    return false;
                                }


                                /*istanbul ignore else */
                                /* sanity check */
                                if (sortOptions) {
                                    excludedColumns = sortOptions.excludedColumns;
                                    if (excludedColumns) {
                                        if (excludedColumns.indexOf(columnName) > -1) {
                                            return false;
                                        }
                                    }
                                }
                                return true;
                            }

                            function highlightSearchText(highlightText) {
                                var options = $scope.options;

                                if (!$scope.hasListbuilder) {
                                    if (!highlightText && options && options.searchText) {
                                        highlightText = options.searchText;
                                    }

                                    bbHighlight.clear(tableEl);
                                    if (highlightText) {
                                        bbHighlight(tableEl.find("td").not('.bb-grid-no-search'), highlightText, 'highlight');
                                    }
                                } else {
                                    listbuilderCtrl.highlightLastSearchText();
                                }
                            }

                            function linkCellValue(scope, cell, linkFunction) {
                                linkFunction(scope, function (cloned) {
                                    cell.append(cloned);
                                });
                            }

                            function setRowMultiselect(rowid) {
                                var row,
                                    rowIndex = tableEl.getInd(rowid),
                                    multiselectId;


                                row = $scope.options.data[(rowIndex - 1)];

                                if (row) {
                                    multiselectId = getMultiselectId(row);
                                    if (angular.isUndefined(multiselectId) && $scope.selectedRows && $scope.selectedRows.length > 0) {
                                        if (arrayObjectIndexOf($scope.selectedRows, row) > -1) {
                                            tableEl.setSelection(rowid, false);
                                        }
                                    } else if (angular.isDefined(multiselectId)) {
                                        if ($scope.bbGridMultiselectSelectedIds.indexOf(multiselectId) > -1) {
                                            tableEl.setSelection(rowid, false);
                                        }
                                    }
                                }


                            }

                            function afterInsertRow(rowid, rowdata, rowelem) {
                                /*jshint validthis: true */
                                var cell,
                                    column,
                                    columnData,
                                    i,
                                    itemScope,
                                    row;

                                if (hasTemplatedColumns) {

                                    if (!tableBody) {
                                        tableBody = $(this);
                                    }

                                    row = tableBody.find('#' + rowid);

                                    for (i = 0; i < columnModel.length; i++) {
                                        column = columnModel[i];

                                        if (column.template_url) {

                                            cell = row.find('[data-grid-field="' + column.name + '"]');
                                            columnData = rowdata[column.name];

                                            //Create a new scope and apply the cell object's properties to it.
                                            itemScope = $scope.$new(true);

                                            itemScope.data = columnData;
                                            itemScope.rowData = rowelem;

                                            if (column.allow_see_more) {
                                                itemScope.skyResources = $scope.resources;
                                            }

                                            if (column.is_context_menu) {
                                                itemScope.getContextMenuItems = getContextMenuItems;
                                            }

                                            //make the resources from the caller available to the column templates
                                            if ($scope.options.resources) {
                                                itemScope.resources = $scope.options.resources;
                                            }

                                            if (column.controller) {
                                                $controller(column.controller, {
                                                    $scope: itemScope
                                                });
                                            }

                                            cellScopes.push(itemScope); //Stash scope for cleanup later.

                                            linkCellValue(itemScope, cell, compiledTemplates[column.template_url]);
                                        }
                                    }
                                }

                                setRowMultiselect(rowid);

                            }

                            function setColumnHeaderAlignment() {
                                var alignmentClass,
                                    column,
                                    i;

                                for (i = 0; i < columnModel.length; i++) {
                                    column = columnModel[i];
                                    if (column.align === 'center') {
                                        alignmentClass = 'bb-grid-th-center';
                                    } else if (column.align === 'right') {
                                        alignmentClass = 'bb-grid-th-right';
                                    } else {
                                        alignmentClass = 'bb-grid-th-left';
                                    }

                                    tableEl.setLabel(column.name, '', alignmentClass);

                                }
                            }

                            function gridComplete() {
                                setColumnHeaderAlignment();
                            }

                            function gridColumnsReordered(orderedColumns) {
                                var i,
                                    offset = 0,
                                    oldIndex,
                                    selectedColumnIds = $scope.options.selectedColumnIds,
                                    newSelectedColumnIds = [];

                                resetExtendedColumn();

                                //Need to account for context menu if it exists.  It will always be the first
                                //column before and after the reorder
                                if (angular.isFunction(getContextMenuItems)) {
                                    offset += 1;
                                }

                                if (locals.multiselect) {
                                    offset += 1;
                                }

                                for (i = offset; i < orderedColumns.length; i++) {
                                    oldIndex = orderedColumns[i];
                                    newSelectedColumnIds.push(selectedColumnIds[oldIndex - offset]);
                                }

                                reorderingColumns = true;
                                $scope.options.selectedColumnIds = newSelectedColumnIds;
                                $scope.$apply();
                            }

                            function getSortable() {
                                /*  The clone option for jquery ui clones the element that is being dragged.
                                    This prevents the click event from being invoked while users are reordering
                                    columns http://api.jqueryui.com/sortable/#option-helper
                                */
                                var sortable = {
                                    update: gridColumnsReordered,
                                    options: {
                                        helper: 'clone'
                                    }

                                };

                                if (getContextMenuItems) {
                                    sortable.exclude = "#" + $scope.locals.gridId + "_" + DROPDOWN_TOGGLE_COLUMN_NAME;
                                }
                                return sortable;
                            }



                            function addSelectedItem(id, selectedIds) {
                                /* istanbul ignore else */
                                /* sanity check */
                                if (selectedIds.indexOf(id) === -1) {
                                    selectedIds.push(id);
                                }
                            }

                            function removeSelectedItem(id, selectedIds) {
                                var itemIndex = selectedIds.indexOf(id);
                                if (itemIndex !== -1) {
                                    selectedIds.splice(itemIndex, 1);
                                }
                            }

                            function getMultiselectId(row) {
                                var multiselectId;

                                if ($scope.bbGridMultiselectIdProperty) {
                                    multiselectId = $scope.bbGridMultiselectIdProperty;
                                } else if (listbuilderCtrl !== null) {
                                    multiselectId = listbuilderCtrl.getListbuilderMultiselectIdProperty();
                                }

                                return row[multiselectId];
                            }

                            function updateSelectedIds(selectedIds) {
                                $scope.$emit('bbGridMultiselectSelectedIdsChanged', selectedIds);
                            }

                            function toggleSelectedId(isSelected, id) {
                                if (isSelected) {
                                    addSelectedItem(id, $scope.bbGridMultiselectSelectedIds);
                                } else {
                                    removeSelectedItem(id, $scope.bbGridMultiselectSelectedIds);
                                }

                                updateSelectedIds($scope.bbGridMultiselectSelectedIds);
                            }

                            function hasSelectedIdsMultiselect() {
                                return $scope.options && $scope.options.data && $scope.options.data.length > 0 && angular.isDefined(getMultiselectId($scope.options.data[0]));
                            }

                            function clearSelectedRowsObject() {
                                var i,
                                    multiselectId;
                                if (hasSelectedIdsMultiselect()) {
                                    for (i = 0; i < $scope.options.data.length; i++) {
                                        multiselectId = getMultiselectId($scope.options.data[i]);
                                        removeSelectedItem(multiselectId, $scope.bbGridMultiselectSelectedIds);
                                    }
                                } else {
                                    $scope.selectedRows = [];
                                }
                            }

                            function resetMultiselect() {
                                clearSelectedRowsObject();
                                tableEl.resetSelection();
                            }

                            function selectAllItems() {
                                var allRowData,
                                    multiselectId,
                                    i;
                                if (hasSelectedIdsMultiselect()) {
                                    for (i = 0; i < $scope.options.data.length; i++) {
                                        multiselectId = getMultiselectId($scope.options.data[i]);
                                        addSelectedItem(multiselectId, $scope.bbGridMultiselectSelectedIds);
                                    }
                                    updateSelectedIds($scope.bbGridMultiselectSelectedIds);
                                } else {
                                    allRowData = $scope.options.data;
                                    if (allRowData && allRowData.length > 0) {
                                        $scope.selectedRows = allRowData.slice();
                                    }
                                }
                            }

                            function onSelectAll(rowIds, status) {
                                /*jslint unparam: true */

                                localRowSelect = true;

                                clearSelectedRowsObject();

                                if (status === true) {
                                    selectAllItems();
                                } else {
                                    updateSelectedIds($scope.bbGridMultiselectSelectedIds);
                                }
                                $scope.$apply();
                            }


                            function toggleMultiselectRows(visibleSelectedRows) {
                                var i,
                                    index,
                                    rowIds;

                                rowIds = tableEl.getDataIDs();

                                for (i = 0; i < visibleSelectedRows.length; i++) {
                                    index = arrayObjectIndexOf($scope.options.data, visibleSelectedRows[i]);
                                    tableEl.setSelection(rowIds[index], true);
                                }
                            }


                            function onSelectRow(rowId, status) {
                                $timeout(function () {
                                    var index,
                                        rowIndex = tableEl.getInd(rowId),
                                        multiselectId,
                                        row;

                                    row = $scope.options.data[(rowIndex - 1)];

                                    multiselectId = getMultiselectId(row);

                                    localRowSelect = true;

                                    if (angular.isUndefined(multiselectId)) {

                                        index = arrayObjectIndexOf($scope.selectedRows, row);

                                        if (status === true && index === -1 && row) {
                                            $scope.selectedRows.push(row);
                                        } else if (status === false && index > -1) {
                                            $scope.selectedRows.splice(index, 1);
                                        }
                                    } else {
                                        toggleSelectedId(status, multiselectId);
                                    }
                                });
                            }

                            function setMultiselectRow(rowId, rowIndex) {
                                var row,
                                    multiselectId;

                                tableEl.setSelection(rowId, false);
                                row  = $scope.options.data[(rowIndex - 1)];
                                multiselectId = getMultiselectId(row);
                                if (angular.isUndefined(multiselectId)) {
                                    $scope.selectedRows.push(row);
                                } else {
                                    addSelectedItem(multiselectId, $scope.bbGridMultiselectSelectedIds);
                                }

                            }

                            function beforeSelectRow(rowId, e) {
                                var endIndex,
                                    i,
                                    lastSelectedRow,
                                    rowIds,
                                    startIndex = parseInt(tableEl.getInd(rowId));

                                localRowSelect = true;

                                if (e.shiftKey) {
                                    lastSelectedRow = tableEl.getInd(tableEl.getGridParam('selrow'));
                                    resetMultiselect();

                                    //if lastSelectedRow is undefined or null, set to 1
                                    if (angular.isUndefined(lastSelectedRow) || lastSelectedRow === null) {
                                        lastSelectedRow = 1;
                                    }

                                    endIndex = parseInt(lastSelectedRow);

                                    rowIds = tableEl.getDataIDs();

                                    //set shift click selection first so last selected row is set properly
                                    if (endIndex < startIndex) {
                                        for (i = startIndex; i >  endIndex - 1; i = i - 1) {
                                            setMultiselectRow(rowIds[(i - 1)], i);
                                        }
                                    } else if (endIndex > startIndex) {
                                        for (i = startIndex; i <  endIndex + 1; i = i + 1) {
                                            setMultiselectRow(rowIds[(i - 1)], i);
                                        }
                                    } else {
                                        $scope.$apply();
                                        return true;
                                    }

                                    updateSelectedIds($scope.bbGridMultiselectSelectedIds);

                                    $scope.$apply();
                                    return false;
                                }
                                return true;
                            }

                            function pageChanged() {
                                var skip = ($scope.paginationOptions.currentPage - 1) * $scope.paginationOptions.itemsPerPage,
                                    top = $scope.paginationOptions.itemsPerPage;

                                $scope.$emit('loadMoreRows', {top: top, skip: skip});

                            }

                            function initializePagination() {
                                if (angular.isDefined($scope.paginationOptions)) {

                                    if (!$scope.paginationOptions.itemsPerPage) {
                                        $scope.paginationOptions.itemsPerPage = DEFAULT_ITEMS_PER_PAGE;
                                    }

                                    if (!$scope.paginationOptions.maxPages) {
                                        $scope.paginationOptions.maxPages = DEFAULT_MAX_PAGES;
                                    }

                                    if (!$scope.paginationOptions.currentPage) {
                                        $scope.paginationOptions.currentPage = 1;
                                    }

                                    $scope.paginationOptions.pageChanged = pageChanged;


                                }
                            }

                            function fancyCheckOff() {
                                element.find('td .bb-check-checkbox').off();
                            }

                            function wrapCheckboxEl(checkboxEl) {
                                checkboxEl.wrap('<label class="bb-check-wrapper"></label>');
                                checkboxEl.after('<span class="bb-check-checkbox"></span>');
                            }

                            function setUpFancyCheckHeader() {
                                var headerCheckEl =  header.find('th .cbox');
                                wrapCheckboxEl(headerCheckEl);
                            }

                            function setUpFancyCheckCell() {
                                var checkCellEl = element.find('td > .cbox');
                                wrapCheckboxEl(checkCellEl);
                                element.find('td .bb-check-checkbox').on('click', function (event) {
                                    event.preventDefault();
                                });
                            }

                            function getIdPrefix() {
                                return 'bb-grid-row-' + $scope.$id + '-';
                            }

                            function listbuilderSortComponentPresent() {
                                return listbuilderCtrl !== null && listbuilderCtrl.sortComponentPresent();
                            }

                            function createHeaderViewKeeper(hasListbuilder) {
                                var verticalOffSetElId = hasListbuilder ? listbuilderCtrl.getListbuilderToolbarId() : toolbarContainerId;
                                vkHeader = new bbViewKeeperBuilder.create({
                                        el: header[0],
                                        boundaryEl: tableWrapper[0],
                                        verticalOffSetElId: verticalOffSetElId,
                                        setWidth: true,
                                        onStateChanged: function () {
                                            if (vkHeader.isFixed) {
                                                header.scrollLeft(tableWrapper.scrollLeft());
                                            } else {
                                                header.scrollLeft(0);
                                            }

                                        }
                                    });
                            }

                            function initGrid() {
                                var columns,
                                    jqGridOptions,
                                    selectedColumnIds,
                                    useGridView = true,
                                    hoverrows = false;

                                totalColumnWidth = 0;

                                hasPristineColumns = true;

                                tableWrapperWidth = tableWrapper.width();

                                locals.multiselect = false;

                                //Clear reference to the table body since it will be recreated.
                                tableBody = null;

                                //Unload grid if it already exists.
                                tableEl.jqGrid('GridUnload');
                                fancyCheckOff();

                                tableEl = element.find('table');
                                tableDomEl = tableEl[0];

                                /*istanbul ignore else */
                                /* sanity check */
                                if ($scope.options) {

                                    columns = $scope.options.columns;
                                    selectedColumnIds = $scope.options.selectedColumnIds;
                                    getContextMenuItems = $scope.options.getContextMenuItems;

                                    if ($scope.options.multiselect) {
                                        locals.multiselect = true;
                                        hoverrows = true;

                                        totalColumnWidth = totalColumnWidth + MULTISELECT_COLUMN_SIZE;
                                    }
                                    $scope.searchText = $scope.options.searchText;
                                }

                                // Allow grid styles to be changed when grid is in multiselect mode (such as the
                                // header checkbox alignment).
                                element[locals.multiselect ? 'addClass' : 'removeClass']('bb-grid-multiselect');


                                if (getContextMenuItems) {
                                    useGridView = false;
                                }

                                if (columns && selectedColumnIds) {


                                    columnModel = buildColumnModel(columns, selectedColumnIds);
                                    columnCount = columnModel.length;

                                    jqGridOptions = {
                                        afterInsertRow: afterInsertRow,
                                        autoencode: true,
                                        beforeSelectRow: beforeSelectRow,
                                        colModel: columnModel,
                                        datatype: angular.noop,
                                        gridComplete: gridComplete,
                                        gridView: useGridView,
                                        height: 'auto',
                                        hoverrows: hoverrows,
                                        idPrefix: getIdPrefix(),
                                        multiselect: locals.multiselect,
                                        multiselectWidth: MULTISELECT_COLUMN_SIZE,
                                        onSelectAll: onSelectAll,
                                        onSelectRow: onSelectRow,
                                        resizeStart: resizeStart,
                                        resizeStop: resizeStop,
                                        rowNum: -1,
                                        shrinktofit: false,
                                        sortable: getSortable(),
                                        width: getDesiredGridWidth()
                                    };


                                    tableEl.jqGrid(jqGridOptions);

                                    header = $(tableDomEl.grid.hDiv);

                                    //Attach click handler for sorting columns
                                    header.find('th').on('click', function () {
                                        var sortOptions = $scope.options.sortOptions,
                                            columnName;

                                        if (!sortOptions) {
                                            sortOptions = $scope.options.sortOptions = {};
                                        }

                                        columnName = getColumnNameFromElementId(this.id);

                                        if (columnIsSortable(columnName) && !bbGrid.headerSortInactive && !listbuilderSortComponentPresent()) {
                                            sortOptions.column = columnName;
                                            sortOptions.descending = $(this).hasClass('sorting-asc');
                                            $scope.$apply();
                                        }
                                    });

                                    fullGrid = header.parents('.ui-jqgrid:first');

                                    if (vkHeader) {
                                        vkHeader.destroy();
                                    }

                                    $scope.locals.showToolbar = true;

                                    getTopScrollbar().width(tableWrapper.width());
                                    resetTopScrollbar();

                                    if (!$scope.options.fixedToolbar) {
                                        createHeaderViewKeeper($scope.hasListbuilder);
                                    }
                                    setSortStyles();

                                    setUpFancyCheckHeader();

                                    $scope.gridCreated = true;

                                }

                            }

                            function destroyCellScopes() {
                                var i;
                                if (cellScopes) {
                                    for (i = 0; i < cellScopes.length; i++) {
                                        cellScopes[i].$destroy();
                                    }
                                }
                                cellScopes = [];
                            }

                            function loadColumnTemplates(callback) {
                                var columns,
                                    templateUrlsToLoad = {};

                                //Identify any template URLs that haven't been compiled
                                /*istanbul ignore else */
                                /* sanity check */
                                if ($scope.options) {
                                    columns = $scope.options.columns;
                                    /*istanbul ignore else */
                                    /* sanity check */
                                    if (columns) {
                                        angular.forEach(columns, function (column) {
                                            var templateUrl = column.template_url;

                                            if (templateUrl && !compiledTemplates[templateUrl]) {
                                                templateUrlsToLoad[templateUrl] = templateUrl;
                                            }
                                        });
                                    }
                                }

                                //Load template URLs that need compiling
                                bbData.load({
                                    text: templateUrlsToLoad
                                }).then(function (result) {
                                    var p,
                                        template;

                                    // Compile templates and store them for use when adding rows.
                                    for (p in result.text) {
                                        /*istanbul ignore else */
                                        /* sanity check */
                                        if (result.text.hasOwnProperty(p)) {
                                            template = result.text[p];

                                            /*istanbul ignore else */
                                            /* sanity check */
                                            if (template) {
                                                compiledTemplates[p] = $compile(template);
                                            }
                                        }
                                    }

                                    callback();
                                });
                            }

                            function handleTableWrapperResize() {
                                var newWidth = tableWrapper.width(),
                                    topScrollbar = getTopScrollbar();

                                if (tableWrapperWidth && tableWrapperWidth !== newWidth) {
                                    if (hasPristineColumns) {
                                        resetGridWidth(tableWrapperWidth, newWidth);
                                    } else {
                                        topScrollbar.width(newWidth);
                                    }
                                    tableWrapperWidth = newWidth;
                                } else {
                                    tableWrapperWidth = newWidth;
                                }
                            }

                            function newRowsAreConcatenated(newRows, oldRows) {
                                var i;
                                if (newRows && oldRows && newRows.length > oldRows.length && oldRows.length > 0) {
                                    for (i = 0; i < oldRows.length; i++) {
                                        if (oldRows[i] !== newRows[i]) {
                                            return false;
                                        }
                                    }
                                    return true;
                                }
                                return false;
                            }

                            function gridRowsUpdated(newRows) {
                                $timeout(function () {
                                    highlightSearchText(locals.appliedSearchText);
                                });
                                handleTableWrapperResize();
                                /*istanbul ignore next */
                                /* sanity check */
                                updateGridLoadedTimestampAndRowCount(newRows ? newRows.length : 0);

                                setUpFancyCheckCell();
                            }

                            function setRows(rows, oldRows) {
                                var rowData;
                                if (newRowsAreConcatenated(rows, oldRows)) {
                                    if (columnHasJsonMap) {
                                        rowData = convertDataJsonmap(rows.slice(oldRows.length, rows.length));
                                    } else {
                                        rowData = rows.slice(oldRows.length, rows.length);
                                    }
                                    
                                    tableEl.addRowData('', rowData);
                                    gridRowsUpdated(rows);
                                } else if (tableDomEl.addJSONData) {
                                    loadColumnTemplates(function () {

                                        if (locals.multiselect) {
                                            element.find('td').off('mousedown.gridmousedown');
                                        }

                                        tableEl.resetSelection();

                                        fancyCheckOff();

                                        destroyCellScopes();
                                        tableDomEl.addJSONData(rows);
                                        gridRowsUpdated(rows);

                                    });
                                }
                            }

                            function setupToolbarViewKeepers() {
                                if (vkToolbars) {
                                    vkToolbars.destroy();
                                }

                                if (vkActionBarAndBackToTop) {
                                    vkActionBarAndBackToTop.destroy();
                                }

                                /*istanbul ignore else */
                                /* sanity check */
                                if ($scope.options) {
                                    verticalOffSetElId = $scope.options.viewKeeperOffsetElId;
                                }

                                if (!$scope.options || !$scope.options.fixedToolbar) {
                                    vkToolbars = new bbViewKeeperBuilder.create({
                                        el: toolbarContainer[0],
                                        boundaryEl: tableWrapper[0],
                                        setWidth: true,
                                        verticalOffSetElId: verticalOffSetElId,
                                        onStateChanged: function () {
                                            $timeout(function () {
                                                locals.isScrolled = vkToolbars.isFixed;
                                            });
                                        }
                                    });
                                }


                                vkActionBarAndBackToTop = new bbViewKeeperBuilder.create({
                                    el: element.find('.bb-grid-action-bar-and-back-to-top')[0],
                                    boundaryEl: element[0],
                                    setWidth: true,
                                    verticalOffSetElId: verticalOffSetElId,
                                    fixToBottom: true
                                });
                            }

                            function backToTop() {
                                vkToolbars.scrollToTop();
                            }

                            locals.resetMultiselect = resetMultiselect;

                            locals.toggleMultiselectRows = toggleMultiselectRows;

                            locals.highlightSearchText = highlightSearchText;

                            locals.setFilters = function (filters) {
                                $scope.options.filters = filters;
                                $scope.locals.applySearchText();
                            };

                            function convertDataJsonmap(moreRows) {
                                var i,
                                    j,
                                    column,
                                    rowData = [];

                                /* istanbul ignore else */
                                /* sanity check */
                                if ($scope.options.columns) {
                                    for (i = 0; i < moreRows.length; i++) {
                                        rowData.push(moreRows[i]);
                                        for (j = 0; j < $scope.options.columns.length; j++) {
                                            column = $scope.options.columns[j];
                                            if (column.jsonmap && column.jsonmap !== column.name) {
                                                rowData[i][column.name] = moreRows[i][column.jsonmap];
                                            }
                                        }
                                    }
                                }

                                return rowData;
                                
                            }

                            function addMoreRowsToGrid(moreRows) {
                                var rowData;
                                
                                if (moreRows && moreRows.length > 0) {
                                    if (columnHasJsonMap) {
                                        rowData = convertDataJsonmap(moreRows);
                                    } else {
                                        rowData = moreRows;
                                    }
                                            
                                    tableEl.addRowData('', rowData);
                                    $scope.options.data = $scope.options.data.concat(moreRows);
                                    setUpFancyCheckCell();
                                    doNotResetRows = true;
                                }
                            }

                            function loadMore() {
                                var deferred = $q.defer(),
                                    loadMorePromise = deferred.promise;

                                loadMorePromise.then(addMoreRowsToGrid);

                                $scope.$emit('loadMoreRows', {
                                    promise: deferred
                                });

                                return loadMorePromise;

                            }

                            if (angular.isDefined(attr.bbGridInfiniteScroll)) {
                                $scope.locals.hasInfiniteScroll = true;
                            }

                            $scope.locals.loadMore = loadMore;

                            if (angular.isUndefined($scope.selectedRows) || !angular.isArray($scope.selectedRows)) {
                                $scope.selectedRows = [];
                            }

                            id = $scope.$id;
                            toolbarContainerId = id + '-toolbar-container';

                            locals.backToTop = backToTop;

                            //Apply unique id to the table.  ID is required by jqGrid.
                            toolbarContainer.attr('id', toolbarContainerId);

                            $scope.$watch('options.selectedColumnIds', function (newValue) {
                                var columnChangedData;

                                /*istanbul ignore else */
                                /* sanity check */
                                if (newValue) {
                                    if (reorderingColumns) {
                                        reorderingColumns = false;
                                        return;
                                    }

                                    initGrid();

                                    // re-evaluated so the grid won't automatically be reloaded with existing data.
                                    columnChangedData = {
                                        willResetData: false
                                    };

                                    $scope.$emit('includedColumnsChanged', columnChangedData);


                                    if (!columnChangedData.willResetData && $scope.options.data && $scope.options.data.length > 0) {
                                        // Data won't change as a result of the columns changing; reload existing data.
                                        setRows($scope.options.data);
                                    }
                                }
                            }, true);

                            function setGridMultiselectRows(selections, indexCallback) {
                                var i,
                                    index,
                                    rowIds;

                                if (tableEl[0].grid && $scope.options.data && $scope.options.data.length > 0 && selections) {
                                    //blow away existing selections
                                    tableEl.resetSelection();

                                    rowIds = tableEl.getDataIDs();

                                    for (i = 0; i < selections.length; i++) {

                                        index = indexCallback(selections[i]);

                                        if (index > -1) {
                                            tableEl.setSelection(rowIds[index], false);
                                        }

                                    }
                                }
                            }

                            if (!$scope.hasListbuilder) {
                                $scope.$watchCollection('selectedRows', function (newSelections) {

                                    if (localRowSelect) {
                                        localRowSelect = false;
                                        return;
                                    }

                                    function indexCallback(selectedItem) {
                                        return arrayObjectIndexOf($scope.options.data, selectedItem);
                                    }

                                    setGridMultiselectRows(newSelections, indexCallback);

                                });
                            }

                            $scope.$watchCollection('bbGridMultiselectSelectedIds', function (newSelections) {

                                if (localRowSelect) {
                                    localRowSelect = false;
                                    return;
                                }

                                if (angular.isUndefined(newSelections)) {
                                    $scope.bbGridMultiselectSelectedIds = [];
                                    localRowSelect = true;
                                    return;
                                }

                                function indexCallback(selectedItem) {
                                    var i;
                                    for (i = 0; i < $scope.options.data.length; i++) {
                                        if (getMultiselectId($scope.options.data[i]) === selectedItem) {
                                            return i;
                                        }
                                    }
                                    return -1;
                                }

                                setGridMultiselectRows(newSelections, indexCallback);
                            });


                            $scope.$watch('paginationOptions', initializePagination, true);

                            $scope.$watchCollection('options.data', function (newValue, oldValue) {
                                if (doNotResetRows) {
                                    doNotResetRows = false;
                                } else {
                                    setRows(newValue, oldValue);
                                }
                            });

                            $scope.syncViewKeepers = function () {
                                /*istanbul ignore else */
                                /* sanity check */
                                if (vkToolbars) {
                                    vkToolbars.syncElPosition();
                                }
                            };

                            $scope.syncActionBarViewKeeper = function () {
                                /*istanbul ignore else */
                                /* sanity check */
                                if (vkActionBarAndBackToTop) {
                                    vkActionBarAndBackToTop.syncElPosition();
                                }
                            };

                            $scope.$watch('options.sortOptions', setSortStyles, true);

                            $scope.$watchGroup(['options.viewKeeperOffsetElId', 'options.fixedToolbar'], function () {
                                setupToolbarViewKeepers();
                            });

                            $scope.$watch('options.filters', function (f) {
                                $scope.$broadcast('updateAppliedFilters', f);
                            });

                            $scope.$on("reInitGrid", function () {
                                reInitGrid();
                            });

                            bbMediaBreakpoints.register(mediaBreakpointHandler);

                            tableWrapper.on('scroll', function () {

                                /*istanbul ignore else */
                                /* sanity check */
                                if (vkHeader) {
                                    vkHeader.syncElPosition();
                                }

                                if (header.hasClass('bb-viewkeeper-fixed')) {
                                    header.scrollLeft(tableWrapper.scrollLeft());
                                }

                                getTopScrollbar().scrollLeft(tableWrapper.scrollLeft());
                            });

                            windowEventId = 'bbgrid' + id;

                            windowEl.on('resize.' + windowEventId + ', orientationchange.' + windowEventId, function () {
                                handleTableWrapperResize();
                            });

                            // Reinitialize grid when grid element resizes from 0
                            $scope.$watch(function () {
                                return element.width();
                            }, function (newValue, oldValue) {
                                if (newValue !== oldValue && oldValue === 0) {
                                    reInitGrid();
                                }
                            });

                            $scope.locals.topScrollbarScroll = function () {
                                var topScrollbar = getTopScrollbar();
                                tableWrapper.scrollLeft(topScrollbar.scrollLeft());
                                if (header.hasClass('bb-viewkeeper-fixed')) {
                                    header.scrollLeft(topScrollbar.scrollLeft());
                                }
                            };

                            if ($scope.hasListbuilder) {
                                listbuilderCtrl.topScrollbarScrollAction = $scope.locals.topScrollbarScroll;
                            }

                            function destroyListbuilder() {
                                var topScrollbarEl,
                                    topScrollbarDivEl;

                                if ($scope.hasListbuilder) {
                                    listbuilderCtrl.topScrollbarScrollAction = undefined;
                                    topScrollbarEl = getTopScrollbar();
                                    topScrollbarDivEl = getTopScrollbarDiv();
                                    topScrollbarEl.width(0);
                                    topScrollbarEl.height(0);
                                    topScrollbarDivEl.width(0);
                                    topScrollbarDivEl.height(0);
                                }

                            }

                            $scope.locals.hasWaitAndEmpty = function () {
                                return $scope.options && $scope.options.loading && (!$scope.options.data || $scope.options.data.length < 1);
                            };


                            element.on('$destroy', function () {

                                destroyListbuilder();

                                /*istanbul ignore else */
                                /* sanity check */
                                if (vkToolbars) {
                                    vkToolbars.destroy();
                                }

                                /*istanbul ignore else */
                                /* sanity check */
                                if (vkHeader) {
                                    vkHeader.destroy();
                                }

                                /*istanbul ignore else */
                                /* sanity check */
                                if (vkActionBarAndBackToTop) {
                                    vkActionBarAndBackToTop.destroy();
                                }

                                windowEl.off('resize.' + windowEventId + ', orientationchange.' + windowEventId);

                                fancyCheckOff();

                                bbMediaBreakpoints.unregister(mediaBreakpointHandler);
                            });
                        });
                    },
                    templateUrl: 'sky/templates/grids/grid.html'
                };
            }]);
}(jQuery));

/*global angular */

(function () {
    'use strict';


    function BBGridToolbar(bbResources, bbColumnPicker) {
        return {
            require: '?^bbGrid',
            scope: {
                options: '=?bbToolbarOptions',
                bbGridFilterClick: '&?bbGridFilterClick',
                bbGridSearch: '&?bbGridSearch',
                bbGridSearchText: '<?bbGridSearchText',
                bbGridSearchTextChanged: '&?',
                bbGridSearchPlaceholder: '<?bbGridSearchPlaceholder'
            },
            transclude: {
                'bbGridToolbarFilterSummary': '?bbGridToolbarFilterSummary',
                'bbGridToolbarSort': '?bbGridToolbarSort'
            },
            link: function ($scope, el, attr, bbGrid, $transclude) {
                var topScrollbarEl = el.find('.bb-grid-top-scrollbar');

                function applySearchText() {
                    var searchEl;
                    searchEl = el.find('.bb-search-container input');
                    /*istanbul ignore else */
                    /* sanity check */
                    if (angular.isFunction(searchEl.select) && searchEl.length > 0 && $scope.toolbarLocals.searchText) {
                        searchEl.eq(0).select();
                    }

                    $scope.options.searchText = $scope.toolbarLocals.searchText;

                    /*istanbul ignore else */
                    /* sanity check */
                    if (bbGrid !== null) {
                        bbGrid.highlightSearchText();
                    }
                }

                function toolbarSearch(searchText) {
                    $scope.bbGridSearch({searchText: searchText});

                    /*istanbul ignore else */
                    /* sanity check */
                    if (bbGrid !== null) {
                        bbGrid.searchApplied(searchText);
                    }

                }

                function searchTextChanged(searchText) {
                    if (angular.isFunction($scope.bbGridSearchTextChanged)) {
                        $scope.bbGridSearchTextChanged({searchText: searchText});
                    }
                }

                function openColumnPicker() {
                    bbColumnPicker.openColumnPicker({
                        columns: $scope.options.columns,
                        selectedColumnIds: $scope.options.selectedColumnIds,
                        helpKey: $scope.options.columnPickerHelpKey,
                        subsetLabel: $scope.options.columnPickerSubsetLabel,
                        subsetProperty: $scope.options.columnPickerSubsetProperty,
                        subsetExclude: $scope.options.columnPickerSubsetExclude,
                        onlySelected: $scope.options.columnPickerOnlySelected,
                        selectedColumnIdsChangedCallback: function (selectedColumnIds) {
                            $scope.options.selectedColumnIds = selectedColumnIds;
                        }
                    });
                }

                function toggleFilterMenu(isOpen) {
                    if ($scope.options && $scope.options.hasInlineFilters) {
                        if (angular.isDefined(isOpen)) {
                            $scope.toolbarLocals.filtersVisible = isOpen;
                        } else {
                            $scope.toolbarLocals.filtersVisible = !$scope.toolbarLocals.filtersVisible;
                        }
                    /*istanbul ignore else */
                    /* sanity check */
                    } else if (bbGrid !== null && angular.isFunction(bbGrid.toggleFilterMenu)) {
                        bbGrid.toggleFilterMenu(isOpen);
                    }
                }

                function moveInlineFilters() {
                    el.parents('.bb-grid-container').find('.bb-filters-inline')
                        .appendTo(el.find('.bb-grid-filter-inline-container'));

                }

                $scope.toolbarLocals = {
                    applySearchText: applySearchText,
                    searchTextChanged: searchTextChanged,
                    openColumnPicker: openColumnPicker,
                    toggleFilterMenu: toggleFilterMenu,
                    toolbarSearch: toolbarSearch
                };

                $scope.resources = bbResources;

                /*istanbul ignore else */
                /* sanity check */
                if (bbGrid !== null && angular.isUndefined($scope.options)) {
                    $scope.$watch(function () {
                        return bbGrid.scope.options;
                    }, function (newValue) {
                        $scope.options = newValue;
                    });
                }

                //grid columns changed, initialize toolbar stuff
                $scope.$watch('options.selectedColumnIds', function (newValue) {
                    if (angular.isDefined(newValue)) {

                        $scope.toolbarLocals.searchText = $scope.options.searchText;

                        if ($scope.options.hasInlineFilters) {
                            moveInlineFilters();
                        }

                        /*istanbul ignore else */
                        /* sanity check */
                        if (bbGrid !== null) {
                            bbGrid.applySearchText = applySearchText;
                            bbGrid.headerSortInactive = $transclude.isSlotFilled('bbGridToolbarSort');
                        }

                        if (angular.isFunction($scope.options.onAddClick)) {
                            $scope.toolbarLocals.hasAdd = true;
                        }
                    }
                }, true);

                $scope.$watch('options.searchText', function (newValue) {
                    if (newValue !== $scope.toolbarLocals.searchText) {
                        $scope.toolbarLocals.searchText = newValue;
                    }
                });

                $scope.$watch('options.filtersOpen', function (newValue) {
                    if (angular.isDefined(newValue)) {
                        toggleFilterMenu(newValue);
                    }
                });

                /*istanbul ignore else */
                /* sanity check */
                if (bbGrid !== null) {
                    topScrollbarEl.on('scroll', function () {
                        bbGrid.syncGridHeaderScrollToTopScrollbar();
                    });
                }

                $scope.$on('$destroy', function () {
                    /*istanbul ignore else */
                    /* sanity check */
                    if (bbGrid !== null) {
                        topScrollbarEl.off();
                    }
                });


            },
            templateUrl: 'sky/templates/grids/gridtoolbar.html'
        };
    }

    BBGridToolbar.$inject = ['bbResources', 'bbColumnPicker'];

    angular.module('sky.grids.toolbar',
        [
            'sky.resources',
            'sky.grids.columnpicker.factory',
            'sky.filter',
            'sky.search',
            'sky.sort'
        ])
        .directive('bbGridToolbar', BBGridToolbar);
}());

/*jslint browser: true, plusplus: true */
/*global angular, jQuery */

(function () {
    'use strict';

    angular.module('sky.help', ['ui.router'])
        .constant('bbHelpConfig', {
            onHelpLoaded: null,
            productId: 'Sky',
            customLocales: [],
            url: null
        })
        .factory('bbHelp', ['$q', '$state', '$window', 'bbHelpConfig', function ($q, $state, $window, bbHelpConfig) {
            var initPromise;

            function helpwidgetLoaded() {
                return !!($window.BBHELP && $window.BBHELP.HelpWidget);
            }

            function init() {
                var configOnHelpLoaded,
                    deferred;

                if (!initPromise) {
                    deferred = $q.defer();
                    initPromise = deferred.promise;

                    if (helpwidgetLoaded()) {
                        deferred.resolve();
                    } else if (bbHelpConfig.url) {
                        jQuery.ajax({
                            cache: true,
                            dataType: 'script',
                            url: bbHelpConfig.url
                        }).done(function () {
                            var config = angular.extend({}, bbHelpConfig);

                            if (!config.getCurrentHelpKey) {
                                config.getCurrentHelpKey = function () {
                                    // $state.current.helpKeyOverride outranks $state.current.pageData.helpKey
                                    if ($state.current.helpKeyOverride) {
                                        return $state.current.helpKeyOverride;
                                    }

                                    if ($state.current.pageData) {
                                        return $state.current.pageData.helpKey;
                                    }
                                    return null;
                                };
                            }

                            configOnHelpLoaded = config.onHelpLoaded;

                            config.onHelpLoaded = function () {
                                if (angular.isFunction(configOnHelpLoaded)) {
                                    configOnHelpLoaded.apply(this, arguments);
                                }

                                deferred.resolve();
                            };

                            $window.BBHELP.HelpWidget.load(config);
                        });
                    } else {
                        initPromise = null;
                        throw new Error('bbHelpConfig.url is not defined.');
                    }
                }

                return initPromise;
            }

            function open() {
                var args = arguments;

                init().then(function () {
                    $window.BBHELP.HelpWidget.open.apply($window.BBHELP.HelpWidget, args);
                });
            }

            function close() {
                if (helpwidgetLoaded()) {
                    $window.BBHELP.HelpWidget.close.apply($window.BBHELP.HelpWidget, arguments);
                }
            }

            return {
                init: init,
                open: open,
                close: close
            };
        }]);

}());

/*jslint browser: true, plusplus: true */
/*global angular */

(function () {
    'use strict';

    angular.module('sky.helpbutton', ['sky.help', 'sky.resources'])
        .directive('bbHelpButton', ['$state', '$window', 'bbHelp', 'bbResources', function ($state, $window, bbHelp, bbResources) {
            /// <summary>
            /// This directive provides a button that launches the Blackbaud Help Widget.
            /// The bbHelpKey attribute sets the help key. The widget will show the given key's corresponding help page
            /// The bbSetHelpKeyOverride attribute, when set to "true", makes this directive's help key override the current page help key.
            ///     The help key override will be removed when the directive is removed from the page.
            /// </summary>

            function link(scope, el, attrs) {
                /*jslint unparam: true */
                var oldHelpKeyOverride;

                el.addClass('bb-helpbutton fa fa-question-circle close');

                if (attrs.bbSetHelpKeyOverride && attrs.bbSetHelpKeyOverride.toLowerCase() === 'true') {
                    oldHelpKeyOverride = $state.current.helpKeyOverride;
                    $state.current.helpKeyOverride = attrs.bbHelpKey;

                    el.on("remove", function () {
                        $state.current.helpKeyOverride = oldHelpKeyOverride;
                    });
                }

                if (!el.is('button')) {
                    el.attr('role', 'button');
                    el.attr('tabindex', '0');
                }

                if (!el.attr('aria-label')) {
                    el.attr('aria-label', bbResources.help_button_label);
                }

                el.click(function () {
                    bbHelp.open(attrs.bbHelpKey);
                });

                el.on('keyup', function ($event) {
                    if ($event.which === 13) {
                        bbHelp.open(attrs.bbHelpKey);
                    }
                });
            }

            return {
                link: link
            };
        }]);

}());

/*jslint browser: true, plusplus: true */
/*global angular */

(function () {
    'use strict';

    angular.module('sky.highlight', [])
        .factory('bbHighlight', function () {
            var DATA_CLASS_NAME = 'bb-hightlight-class',
                DEFAULT_CLASS_NAME = 'highlight';

            // Copied and modified from here so we don't have yet another jQuery plugin dependency.
            // http://johannburkard.de/blog/programming/javascript/highlight-javascript-text-higlighting-jquery-plugin.html
            function highlight(el, pat, classn) {
                function innerHighlight(node, pat) {
                    var pos,
                        skip = 0,
                        spannode,
                        middlebit,
                        i,
                        middleclone;

                    classn = classn || DEFAULT_CLASS_NAME;

                    el.data(DATA_CLASS_NAME, classn);

                    if (node.nodeType === 3) {
                        pos = node.data.toUpperCase().indexOf(pat);
                        if (pos >= 0) {
                            spannode = document.createElement('span');
                            spannode.className = String(classn);
                            middlebit = node.splitText(pos);
                            middlebit.splitText(pat.length);
                            middleclone = middlebit.cloneNode(true);
                            spannode.appendChild(middleclone);
                            middlebit.parentNode.replaceChild(spannode, middlebit);
                            skip = 1;
                        }
                    } else if (node.nodeType === 1 && node.childNodes && !/(script|style)/i.test(node.tagName)) {
                        for (i = 0; i < node.childNodes.length; ++i) {
                            i += innerHighlight(node.childNodes[i], pat);
                        }
                    }
                    return skip;
                }

                return el.length && pat && pat.length ? el.each(function () {
                    innerHighlight(this, pat.toUpperCase());
                }) : el;
            }

            function removeHighlight(el) {
                var classn = el.data(DATA_CLASS_NAME) || DEFAULT_CLASS_NAME;

                return el.find('span.' + classn).each(function () {
                    var parentNode = this.parentNode;

                    parentNode.replaceChild(this.firstChild, this);
                    parentNode.normalize();
                }).end();
            }

            highlight.clear = removeHighlight;

            return highlight;
        })
        .directive('bbHighlight', ['bbHighlight', function (bbHighlight) {
            return {
                link: function (scope, el, attrs) {
                    function highlight() {
                        var highlightText = scope.$eval(attrs.bbHighlight);

                        bbHighlight.clear(el);

                        if (highlightText) {
                            bbHighlight(el, highlightText);
                        }
                    }

                    scope.$watch(attrs.bbHighlight, function () {
                        highlight();
                    });

                    if (attrs.bbHighlightBeacon) {
                        scope.$watch(attrs.bbHighlightBeacon, function (newValue, oldValue) {
                            if (newValue !== oldValue) {
                                scope.$evalAsync(highlight);
                            }
                        }, true);
                    }

                    if (attrs.ngBind) {
                        scope.$watch(attrs.ngBind, function (newValue, oldValue) {
                            if (newValue !== oldValue) {
                                highlight();
                            }
                        });
                    }
                },
                priority: 1, // Make sure ng-bind (which has a priortiy of 0) is processed before this
                restrict: 'A'
            };
        }]);
}());

/*global angular */
(function () {
    'use strict';
    var nextId = 0;

    function Controller($element, $window, $timeout) {
        var ctrl = this,
            scrollableParentEl,
            scrollableParentIsWindow = false,
            componentId = 'bb-infinitescroll-' + nextId;

        function infiniteScrollInView() {
            if (scrollableParentIsWindow) {
                return scrollableParentEl.scrollTop() + scrollableParentEl.height() > $element.offset().top;
            } else {
                return scrollableParentEl.scrollTop() + scrollableParentEl.height() > $element.position().top;
            }
        }

        function loadComplete() {
            ctrl.isLoading = false;
        }

        function callLoadCallback() {
            var loadPromise;

            loadPromise = ctrl.bbInfiniteScrollLoad();

            if (loadPromise && angular.isFunction(loadPromise.then)) {
                loadPromise.then(function () {
                    loadComplete();
                });
            } else {
                loadComplete();
            }
        }

        function startInfiniteScrollLoad() {
            if (ctrl.bbInfiniteScrollHasMore && !ctrl.isLoading && infiniteScrollInView()) {
                ctrl.isLoading = true;
                
                callLoadCallback();
            }
        }

        function getScrollableParentEl(el) {
            var parentEl = angular.element(el).parent();

            while (parentEl.length > 0 && !parentEl.is('body')) {
                switch (parentEl.css('overflow-y')) {
                    case 'auto':
                    case 'scroll':
                        return parentEl;
                }

                parentEl = parentEl.parent();
            }
            scrollableParentIsWindow = true;
            return angular.element($window);
        }

        function onInit() {
            
            ctrl.isLoading = false;

            scrollableParentEl = getScrollableParentEl($element);
            
            scrollableParentEl.on('scroll.' + componentId, function () {
                // Put in angular digest cycle
                $timeout(function () {
                    startInfiniteScrollLoad();
                });
            });
                
        }

        function onDestroy() {
            scrollableParentEl.off('scroll.' + componentId);
        }

        ctrl.$onInit = onInit;
        ctrl.$onDestroy = onDestroy;

        ctrl.startInfiniteScrollLoad = startInfiniteScrollLoad;
        nextId++;     
    } 

    Controller.$inject = ['$element', '$window', '$timeout'];

    angular.module('sky.infinitescroll.component', ['sky.resources', 'sky.wait'])
        .component('bbInfiniteScroll', {
            templateUrl: 'sky/templates/infinitescroll/infinitescroll.component.html',
            bindings: {
                bbInfiniteScrollHasMore: '<',
                bbInfiniteScrollLoad: '&'
            },
            controller: Controller
        
        });
})();
/*global angular */

(function () {
    'use strict';
    
    angular.module('sky.keyinfo.component', [])
        .component('bbKeyInfo', {
            bindings: {
                bbKeyInfoLayout: '@?'
            }, 
            templateUrl: 'sky/templates/keyinfo/keyinfo.component.html',
            transclude: {
                value: 'bbKeyInfoValue',
                label: 'bbKeyInfoLabel'
            }
        });
}());
/* global angular */
(function () {
    'use strict';

    function Controller(bbResources) {
        var ctrl = this;

        function onInit() {
            if (angular.isUndefined(ctrl.bbListbuilderAddLabel)) {
                ctrl.bbListbuilderAddLabel = bbResources.listbuilder_add_title;
            }
        }

        ctrl.$onInit = onInit;
    }

    Controller.$inject = ['bbResources'];

    angular.module('sky.listbuilder.add.component', ['sky.resources'])
        .component('bbListbuilderAdd', {
            templateUrl: 'sky/templates/listbuilder/listbuilder.add.component.html',
            controller: Controller,
            bindings: {
                bbListbuilderAddAction: '&?',
                bbListbuilderAddLabel: '<?'
            }
        });
}());
/* global angular */
(function () {
    'use strict';

    function Controller($scope) {
        var ctrl = this;

        function listbuilderCardToggled(selectedArgs) {
            ctrl.listbuilderCtrl.itemToggled(selectedArgs.isSelected, ctrl.bbListbuilderCardId);
        }

        function onInit() {
            if (angular.isDefined(ctrl.bbListbuilderCardId)) {
                $scope.$on('bbCardInitialized', function (event, data) {
                    data.cardCtrl.bbCardSelectionToggled = listbuilderCardToggled;
                    event.stopPropagation();
                    event.preventDefault(); 
                });
            }
        }

        function postLink() {
            ctrl.cardsCtrl.addCard();
        }

        ctrl.$postLink = postLink;
        ctrl.$onInit = onInit;
    }

    Controller.$inject = ['$scope'];

    angular.module('sky.listbuilder.card.component', [])
        .component('bbListbuilderCard', {
            templateUrl: 'sky/templates/listbuilder/listbuilder.card.component.html',
            transclude: true,
            controller: Controller,
            require: {
                cardsCtrl: '^bbListbuilderCards',
                listbuilderCtrl: '^^bbListbuilder'
            },
            bindings: {
                bbListbuilderCardId: '<?'
            }

        });
})();
/* global angular */
(function () {
    'use strict';

    function Controller($timeout, bbResources) {
        var ctrl = this;

        function addCard() {
            $timeout(function () {
                ctrl.listbuilderContentCtrl.highlightLastSearchText();
            });
        }

        function viewIsActive() {
            return ctrl.listbuilderContentCtrl.getCurrentView() && ctrl.listbuilderContentCtrl.getCurrentView().viewName === ctrl.viewName;
        }

        function initCards() {
            ctrl.viewName = 'card';
            ctrl.listbuilderContentCtrl.addListbuilderView({ 
                viewName: ctrl.viewName, 
                viewSwitcherClass: 'fa-th-large', 
                highlightClass: 'bb-card',
                viewSwitcherLabel: bbResources.listbuilder_card_switcher
            });

        }

        function onDestroy() {
            ctrl.listbuilderContentCtrl.removeListbuilderView(ctrl.viewName);
        }

        ctrl.$postLink = initCards;
        ctrl.$onDestroy = onDestroy;
        ctrl.addCard = addCard;
        ctrl.viewIsActive = viewIsActive;
    }

    Controller.$inject = ['$timeout', 'bbResources'];

    angular.module('sky.listbuilder.cards.component', ['sky.card', 'sky.resources'])
        .component('bbListbuilderCards', {
            templateUrl: 'sky/templates/listbuilder/listbuilder.cards.component.html',
            transclude: true,
            controller: Controller,
            require: {
                listbuilderContentCtrl: '^bbListbuilderContent'
            }

        });
}());
/* global angular */
(function () {
    'use strict';

    function Controller(bbColumnPicker) {

        var ctrl = this;

        function openColumnPicker() {
            bbColumnPicker.openColumnPicker({
                        columns: ctrl.bbListbuilderColumnPickerColumns,
                        selectedColumnIds: ctrl.bbListbuilderColumnPickerSelectedColumnIds,
                        helpKey: ctrl.bbListbuilderColumnPickerHelpKey,
                        subsetLabel: ctrl.bbListbuilderColumnPickerSubsetLabel,
                        subsetProperty: ctrl.bbListbuilderColumnPickerSubsetProperty,
                        subsetExclude: ctrl.bbListbuilderColumnPickerSubsetExclude,
                        onlySelected: ctrl.bbListbuilderColumnPickerOnlySelected,
                        selectedColumnIdsChangedCallback: function (selectedColumnIds) {
                            ctrl.bbListbuilderColumnPickerSelectedColumnIdsChanged({selectedColumnIds: selectedColumnIds});
                        }
                    });
        }

        ctrl.openColumnPicker = openColumnPicker;
        
    }

    Controller.$inject = ['bbColumnPicker'];

    angular.module('sky.listbuilder.column.picker.component', ['sky.grids.columnpicker.factory', 'sky.resources'])
        .component('bbListbuilderColumnPicker', {
            controller: Controller,
            require: {
                dropdownCtrl: '^^bbListbuilderSecondaryActionsDropdown'
            },
            bindings: {
                bbListbuilderColumnPickerSelectedColumnIds: '<',
                bbListbuilderColumnPickerColumns: '<',
                bbListbuilderColumnPickerHelpKey: '<?',
                bbListbuilderColumnPickerSubsetLabel: '<?',
                bbListbuilderColumnPickerSubsetProperty: '<?',
                bbListbuilderColumnPickerSubsetExclude: '<?',
                bbListbuilderColumnPickerOnlySelected: '<?',
                bbListbuilderColumnPickerSelectedColumnIdsChanged: '&'
            },
            templateUrl: 'sky/templates/listbuilder/listbuilder.column.picker.component.html'
        });
})();
/* global angular */
(function () {
    'use strict';

    function Controller($element) {
        var ctrl = this,
            lastSearchText;

        function highlightLastSearchText() {
            /* istanbul ignore else */
            /* sanity check */
            if (angular.isFunction(ctrl.highlightSearchContent)) {
                ctrl.highlightSearchContent(lastSearchText);
            }
        }

        function getListbuilderToolbarId() {
            /* istanbul ignore else */
            /* sanity check */
            if (angular.isFunction(ctrl.getToolbarId)) {
                return ctrl.getToolbarId();
            }
        }

        function getListbuilderToolbarTopScrollbarEl() {
            /* istanbul ignore else */
            /* sanity check */
            if (angular.isFunction(ctrl.getTopScrollbar)) {
                return ctrl.getTopScrollbar();
            }   
        }

        function sortComponentPresent() {
            /* istanbul ignore else */
            /* sanity check */
            if (angular.isFunction(ctrl.toolbarSortComponentPresent)) {
                return ctrl.toolbarSortComponentPresent();
            }   
        }

        function getListbuilderMultiselectIdProperty() {
            /* istanbul ignore else */
            /* sanity check */
            if (angular.isFunction(ctrl.getMultiselectIdProperty)) {
                return ctrl.getMultiselectIdProperty();
            }
        }

        function updateSelectedIds(selectedIds) {
            /* istanbul ignore else */
            /* sanity check */
            if (angular.isFunction(ctrl.updateMultiselectSelectedIds)) {
                return ctrl.updateMultiselectSelectedIds(selectedIds);
            }
        }

        function highlightSearchText(searchText) {
            lastSearchText = searchText;
            if (angular.isFunction(ctrl.highlightSearchContent)) {
                ctrl.highlightSearchContent(searchText);
            }
        }

        function itemToggled(isSelected, itemId) {
            /* istanbul ignore else */
            /* sanity check */
            if (angular.isFunction(ctrl.multiselectItemToggled)) {
                ctrl.multiselectItemToggled(isSelected, itemId);
            }
        }

        function getContentContainer() {
            return $element.find('.bb-listbuilder-content-container');
        }

        function onInit() {
            ctrl.contentViews = [];
        }

        ctrl.$onInit = onInit;
        ctrl.highlightSearchText = highlightSearchText;
        ctrl.getListbuilderToolbarId = getListbuilderToolbarId;
        ctrl.getListbuilderToolbarTopScrollbarEl = getListbuilderToolbarTopScrollbarEl;
        ctrl.getListbuilderMultiselectIdProperty = getListbuilderMultiselectIdProperty;
        ctrl.sortComponentPresent = sortComponentPresent;
        ctrl.updateSelectedIds = updateSelectedIds;
        ctrl.getContentContainer = getContentContainer;
        ctrl.highlightLastSearchText = highlightLastSearchText;
        ctrl.itemToggled = itemToggled;
    }

    Controller.$inject = ['$element'];

    angular.module('sky.listbuilder.component', [])
        .component('bbListbuilder', {
            templateUrl: 'sky/templates/listbuilder/listbuilder.component.html',
            transclude: {
                bbListbuilderToolbar: '?bbListbuilderToolbar',
                bbListbuilderContent: '?bbListbuilderContent',
                bbListbuilderFooter: '?bbListbuilderFooter'
            },
            controller: Controller
        });
})();
/* global angular */
(function () {
    'use strict';

    function Controller($element, bbHighlight) {

        var ctrl = this,
            lastSearchText;

        function addListbuilderView(newView) {
            ctrl.listbuilderCtrl.contentViews.push(newView);

            if ((ctrl.bbListbuilderContentActiveView && newView.viewName === ctrl.bbListbuilderContentActiveView) || 
                !ctrl.listbuilderCtrl.currentView) {
                ctrl.listbuilderCtrl.currentView = newView;
            } 
        }

        function removeListbuilderView(viewName) {
            var i;

            for (i = 0; i < ctrl.listbuilderCtrl.contentViews.length; i++) {
                if (ctrl.listbuilderCtrl.contentViews[i].viewName === viewName) {
                    ctrl.listbuilderCtrl.contentViews.splice(i, 1);
                    if (ctrl.listbuilderCtrl.currentView.viewName === viewName) {
                        if (ctrl.listbuilderCtrl.contentViews.length > 0) {
                            ctrl.listbuilderCtrl.currentView = ctrl.listbuilderCtrl.contentViews[0];
                        } else {
                            ctrl.listbuilderCtrl.currentView = null;
                        }   
                        
                    }
                    return;
                }
            }
        }

        function highlightSearchContent(searchText) {
            var contentEl,
                highlightSelector;
            /* istanbul ignore else */
            /* sanity check */
            if (ctrl.listbuilderCtrl.currentView.highlightClass) {
                highlightSelector = '.' + ctrl.listbuilderCtrl.currentView.highlightClass;
            } else if (ctrl.listbuilderCtrl.currentView.highlightSelector) {
                highlightSelector = ctrl.listbuilderCtrl.currentView.highlightSelector;
            }
            
            contentEl = $element.find(highlightSelector);
            lastSearchText = searchText;
            /*istanbul ignore else */
            /* sanity check */
            if (contentEl.length > 0) {
                bbHighlight.clear(contentEl);
                if (searchText) {
                    bbHighlight(contentEl.not('.bb-listbuilder-no-search'), searchText, 'highlight');
                }
            }
        }

        function getCurrentView() {
            return ctrl.listbuilderCtrl.currentView;
        }

        function setCurrentView(newView) {
            ctrl.listbuilderCtrl.currentView = newView;
            /* istanbul ignore else */
            /* sanity check */
            if (angular.isFunction(ctrl.bbListbuilderContentViewChanged)) {
                ctrl.bbListbuilderContentViewChanged({ newView: newView.viewName });
            }
        } 

        function setActiveView(viewName) {
            var i;

            if (ctrl.listbuilderCtrl.currentView && ctrl.listbuilderCtrl.currentView.viewName === viewName) {
                return;
            }

            for (i = 0; i < ctrl.listbuilderCtrl.contentViews.length; i++) {
                if (ctrl.listbuilderCtrl.contentViews[i].viewName === viewName) {
                    ctrl.listbuilderCtrl.currentView = ctrl.listbuilderCtrl.contentViews[i];
                    return;
                }
            }
        }

        function updateListbuilderView(viewName, newView) {
            var i;

            for (i = 0; i < ctrl.listbuilderCtrl.contentViews.length; i++) {
                if (ctrl.listbuilderCtrl.contentViews[i].viewName === viewName) {
                    ctrl.listbuilderCtrl.contentViews[i] = newView;
                    if (ctrl.listbuilderCtrl.currentView.viewName === viewName) {
                        setCurrentView(newView);
                    }
                    return;
                }
            }
        }

        function onInit() {
            ctrl.listbuilderCtrl.highlightSearchContent = highlightSearchContent;
            ctrl.listbuilderCtrl.setCurrentView = setCurrentView;
            ctrl.highlightLastSearchText = ctrl.listbuilderCtrl.highlightLastSearchText;
            
            if (ctrl.bbListbuilderContentActiveView) {
                setActiveView(ctrl.bbListbuilderContentActiveView);
            }
        }

        function onChanges(changesObj) {
            var activeView;
            /* istanbul ignore else */
            /* sanity check */
            if (changesObj.bbListbuilderContentActiveView) {
                activeView = changesObj.bbListbuilderContentActiveView;
                /* istanbul ignore else */
                /* sanity check */
                if (activeView.currentValue !== activeView.previousValue) {
                    setActiveView(activeView.currentValue);
                }
            }
        }

        ctrl.$onInit = onInit;
        ctrl.$onChanges = onChanges;
        
        ctrl.addListbuilderView = addListbuilderView;
        ctrl.removeListbuilderView = removeListbuilderView;
        ctrl.updateListbuilderView = updateListbuilderView;
        ctrl.getCurrentView = getCurrentView;

    }

    Controller.$inject = ['$element', 'bbHighlight'];

    angular.module('sky.listbuilder.content.component', ['sky.highlight'])
        .component('bbListbuilderContent', {
            templateUrl: 'sky/templates/listbuilder/listbuilder.content.component.html',
            transclude: true,
            controller: Controller,
            require: {
                listbuilderCtrl: '^bbListbuilder'
            },
            bindings: {
                bbListbuilderContentActiveView: '@?',
                bbListbuilderContentViewChanged: '&?'
            }
        });

})();
/* global angular */
(function () {
    'use strict';

    function Controller($timeout) {
        var ctrl = this;

        function addItem() {
            $timeout(function () {
                ctrl.listbuilderContentCtrl.highlightLastSearchText();
            });
        }

        function getViewObject() {
            return { 
                    viewName: ctrl.bbListbuilderContentCustomViewName, 
                    viewSwitcherClass: ctrl.bbListbuilderContentCustomViewSwitcherClass, 
                    highlightClass: ctrl.bbListbuilderContentCustomHighlightClass,
                    viewSwitcherLabel: ctrl.bbListbuilderContentCustomViewSwitcherLabel
                };
        }

        function initContent() {
            ctrl.viewName = 'card';
            if (ctrl.bbListbuilderContentCustomViewName) {
                ctrl.listbuilderContentCtrl.addListbuilderView(getViewObject());
            }
            
        }

        function viewIsActive() {
            return ctrl.listbuilderContentCtrl.getCurrentView() && ctrl.listbuilderContentCtrl.getCurrentView().viewName === ctrl.bbListbuilderContentCustomViewName;
        }

        function onChanges(changesObj) {
            /* istanbul ignore else */
            /* sanity check */
            if (ctrl.bbListbuilderContentCustomViewName) {
                if (changesObj.bbListbuilderContentCustomViewName) {
                    if (!changesObj.bbListbuilderContentCustomViewName.previousValue) {
                        ctrl.listbuilderContentCtrl.addListbuilderView(getViewObject());
                    } else {
                        ctrl.listbuilderContentCtrl.updateListbuilderView(
                            changesObj.bbListbuilderContentCustomViewName.previousValue,
                            getViewObject());
                    }
                }
                ctrl.listbuilderContentCtrl.updateListbuilderView(
                            ctrl.bbListbuilderContentCustomViewName,
                            getViewObject());
                
            }
        }

        function onDestroy() {
            ctrl.listbuilderContentCtrl.removeListbuilderView(ctrl.bbListbuilderContentCustomViewName);
        }

        ctrl.$postLink = initContent;
        ctrl.$onChanges = onChanges;
        ctrl.$onDestroy = onDestroy;
        ctrl.viewIsActive = viewIsActive;
        ctrl.addItem = addItem;
    }

    Controller.$inject = ['$timeout'];

    angular.module('sky.listbuilder.content.custom.component', [])
        .component('bbListbuilderContentCustom', {
            templateUrl: 'sky/templates/listbuilder/listbuilder.content.custom.component.html',
            transclude: true,
            controller: Controller,
            require: {
                listbuilderContentCtrl: '^bbListbuilderContent'
            },
            bindings: {
                bbListbuilderContentCustomViewName: '@?',
                bbListbuilderContentCustomViewSwitcherClass: '@?',
                bbListbuilderContentCustomHighlightClass: '@?',
                bbListbuilderContentCustomViewSwitcherLabel: '@?'
            }

        });
}());
/* global angular */
(function () {
    'use strict';

    function Controller($scope) {
        var ctrl = this;
        
        function listbuilderCustomItemToggled(selectedArgs) {
            ctrl.listbuilderCtrl.itemToggled(selectedArgs.isSelected, ctrl.geCustomItemId());
        }

        $scope.$on('bbListbuilderCustomItemInitialized', function (event, data) {
            data.customItemCtrl.bbCustomItemSelectionToggled = listbuilderCustomItemToggled;
            event.stopPropagation();
            event.preventDefault(); 
        });
    }

    function linkFn(scope, el, attr, ctrls) {
        var ctrl = ctrls[0],
            customCtrl = ctrls[1];
        customCtrl.addItem();

        ctrl.listbuilderCtrl = ctrls[2];

        function getCustomItemId() {
            return scope.$eval(attr.bbListbuilderContentCustomItemId);
        }

        ctrl.geCustomItemId = getCustomItemId;
    }

    Controller.$inject = ['$scope'];

    angular.module('sky.listbuilder.content.custom.item.directive', [])
        .directive('bbListbuilderContentCustomItem', function () {
            return {
                restrict: 'A',
                link: linkFn,
                require: ['bbListbuilderContentCustomItem', '^^bbListbuilderContentCustom', '^^bbListbuilder'],
                controller: Controller
            };
        });
})();
/* global angular */
(function () {
    'use strict';

    function Controller() {
        var ctrl = this;

        function loadCallback() {
            var loadingPromise = ctrl.bbListbuilderOnLoadMore();

            if (loadingPromise && angular.isFunction(loadingPromise.then)) {
                loadingPromise.then(function () {
                    ctrl.listbuilderCtrl.highlightLastSearchText();
                });
            } else {
                ctrl.listbuilderCtrl.highlightLastSearchText();
            }

            return loadingPromise;
        }

        ctrl.loadCallback = loadCallback;
    }

    angular.module('sky.listbuilder.footer.component', ['sky.resources', 'sky.infinitescroll'])
        .component('bbListbuilderFooter', {
            templateUrl: 'sky/templates/listbuilder/listbuilder.footer.component.html',
            bindings: {
                bbListbuilderOnLoadMore: '&?',
                bbListbuilderShowLoadMore: '<?'
            },
            controller: Controller,
            transclude: true,
            require: {
                listbuilderCtrl: '^bbListbuilder'
            }
        });
}());
/* global angular */
(function () {
    'use strict';

    function Controller(bbResources, $scope) {
        var ctrl = this;

        function viewIsActive() {
            return ctrl.listbuilderContentCtrl.getCurrentView() && ctrl.listbuilderContentCtrl.getCurrentView().viewName === ctrl.viewName;
        }

        function setUpGridMultiselectEvent() {
            $scope.$on('bbGridMultiselectSelectedIdsChanged', function (event, data) {
                ctrl.listbuilderCtrl.updateSelectedIds(data);
                
                event.stopPropagation();
                event.preventDefault(); 
            });
        }

        function initGrid() {
            ctrl.viewName = 'grid';
            ctrl.listbuilderContentCtrl.addListbuilderView({ 
                viewName: ctrl.viewName, 
                viewSwitcherClass: 'fa-table', 
                highlightSelector: 'td:not(.bb-grid-no-search)',
                viewSwitcherLabel: bbResources.listbuilder_grid_switcher,
                viewContentClass: 'bb-listbuilder-content-grid-view'
            });

            setUpGridMultiselectEvent();

        }

        function onDestroy() {
            ctrl.listbuilderContentCtrl.removeListbuilderView(ctrl.viewName);
        }

        ctrl.$postLink = initGrid;
        ctrl.$onDestroy = onDestroy;
        ctrl.viewIsActive = viewIsActive;
    }

    Controller.$inject = ['bbResources', '$scope'];

    angular.module('sky.listbuilder.grid.component', ['sky.resources'])
        .component('bbListbuilderGrid', {
            templateUrl: 'sky/templates/listbuilder/listbuilder.grid.component.html',
            transclude: true,
            controller: Controller,
            require: {
                listbuilderContentCtrl: '^bbListbuilderContent',
                listbuilderCtrl: '^^bbListbuilder'
            }
        });
})();
/* global angular */
(function () {
    'use strict';

    function Controller() {
        var ctrl = this;

        function listbuilderMultiselectToggled(result) {
            if (angular.isArray(result)) {
                ctrl.bbListbuilderMultiselect.multiselectItemsToggled(false, result);
            }
        }

        function clearAllItems() {
            var clearAllResult;
            if (angular.isFunction(ctrl.bbListbuilderMultiselectOnClearAll)) {
                clearAllResult = ctrl.bbListbuilderMultiselectOnClearAll();


                if (clearAllResult && angular.isFunction(clearAllResult.then)) {
                    clearAllResult.then(function (result) {
                        listbuilderMultiselectToggled(result);
                    });
                } else {
                    listbuilderMultiselectToggled(clearAllResult);
                }
            } else {
                ctrl.bbListbuilderMultiselect.toggleAllAvailableItems(false);
            }  
            
        }

        ctrl.clearAllItems = clearAllItems;
    }

    angular.module('sky.listbuilder.multiselect.clearall.component', ['sky.resources'])
        .component('bbListbuilderMultiselectClearAll', {
            templateUrl: 'sky/templates/listbuilder/listbuilder.multiselect.clearall.component.html',
            bindings: {
                bbListbuilderMultiselectOnClearAll: '&?'
            },
            require: {
                bbListbuilderMultiselect: '^^bbListbuilderMultiselect'
            },
            controller: Controller
        });
})();
/* global angular */
(function () {
    'use strict';

    function Controller() {
        var ctrl = this,
            listbuilderSelectedIds;

        function toggleOnlySelected(isSelected) {
            ctrl.bbListbuilderOnShowOnlySelected({showOnlySelected: isSelected});
        }

        function addSelectedItem(id, selectedIds) {
            if (selectedIds.indexOf(id) === -1) {
                selectedIds.push(id);
            }
        }

        function removeSelectedItem(id, selectedIds) {
            var itemIndex = selectedIds.indexOf(id);
            if (itemIndex !== -1) {
                selectedIds.splice(itemIndex, 1);
            }
        }

        function multiselectItemToggled(isSelected, id) {
            if (isSelected) {
                addSelectedItem(id, listbuilderSelectedIds);
            } else {
                removeSelectedItem(id, listbuilderSelectedIds);
            }
            ctrl.bbListbuilderMultiselectItemsChanged({selectedIds: listbuilderSelectedIds, allSelected: false});
        }

        function getIdProperty() {
            return ctrl.bbListbuilderMultiselectItemIdProperty || 'id';
        }

        function getSelectedProperty() {
            return ctrl.bbListbuilderMultiselectItemSelectedProperty || 'selected';
        }

        function setAvailableItems(selectedIds) {
            var idProperty,
                selectedProperty,
                itemsLength,
                i;
            if (angular.isDefined(ctrl.bbListbuilderMultiselectAvailableItems)) {
                idProperty = getIdProperty();
                selectedProperty = getSelectedProperty();

                itemsLength = ctrl.bbListbuilderMultiselectAvailableItems.length;
                for (i = 0; i < itemsLength; i++) {
                    if (selectedIds.indexOf(ctrl.bbListbuilderMultiselectAvailableItems[i][idProperty]) !== -1) {
                        ctrl.bbListbuilderMultiselectAvailableItems[i][selectedProperty] = true;
                    } else {
                        ctrl.bbListbuilderMultiselectAvailableItems[i][selectedProperty] = false;
                    }
                }
            }
        }

        function toggleAllAvailableItems(isSelected) {
            var idProperty,
                selectedProperty,
                i,
                itemsLength;

            if (angular.isDefined(ctrl.bbListbuilderMultiselectAvailableItems)) {
                idProperty = getIdProperty();
                selectedProperty = getSelectedProperty();
                itemsLength = ctrl.bbListbuilderMultiselectAvailableItems.length;
                for (i = 0; i < itemsLength; i++) {
                    ctrl.bbListbuilderMultiselectAvailableItems[i][selectedProperty] = isSelected;
                    if (isSelected) {
                        addSelectedItem(ctrl.bbListbuilderMultiselectAvailableItems[i][idProperty], listbuilderSelectedIds);
                    } else {
                        removeSelectedItem(ctrl.bbListbuilderMultiselectAvailableItems[i][idProperty], listbuilderSelectedIds);
                    }
                }
            }
            ctrl.bbListbuilderMultiselectItemsChanged({selectedIds: listbuilderSelectedIds, allSelected: isSelected});
        }

        function multiselectItemsToggled(isSelected, selectedIds) {
            var length = selectedIds.length,
                i;

            for (i = 0; i < length; i++) {
                if (isSelected) {
                    addSelectedItem(selectedIds[i], listbuilderSelectedIds);
                } else {
                    removeSelectedItem(selectedIds[i], listbuilderSelectedIds);
                }
            }
            setAvailableItems(listbuilderSelectedIds);
            ctrl.bbListbuilderMultiselectItemsChanged({selectedIds: listbuilderSelectedIds, allSelected: isSelected});
        }

        function updateMultiselectSelectedIds(selectedIds) {
            listbuilderSelectedIds = selectedIds;
            setAvailableItems(listbuilderSelectedIds);
            ctrl.bbListbuilderMultiselectItemsChanged({selectedIds: listbuilderSelectedIds, allSelected: false});

        }

        function setListbuilderSelectedItems() {
            if (!angular.isUndefined(ctrl.bbListbuilderMultiselectSelectedIds)) {
                listbuilderSelectedIds = ctrl.bbListbuilderMultiselectSelectedIds;
            } else {
                listbuilderSelectedIds = [];
            }

            setAvailableItems(listbuilderSelectedIds);
        }

        function onInit() {
            if (angular.isFunction(ctrl.bbListbuilderOnShowOnlySelected)) {
                ctrl.hasOnlySelected = true;
            }

            setListbuilderSelectedItems();
            ctrl.listbuilderCtrl.multiselectItemToggled = multiselectItemToggled;
            ctrl.listbuilderCtrl.getMultiselectIdProperty = getIdProperty;
            ctrl.listbuilderCtrl.getMultiselectSelectedProperty = getSelectedProperty;
            ctrl.listbuilderCtrl.updateMultiselectSelectedIds = updateMultiselectSelectedIds;
        }

        function bindingChanges(changesObj) {
            /* istanbul ignore else */
            /* sanity check */
            if (changesObj.bbListbuilderMultiselectSelectedIds || changesObj.bbListbuilderMultiselectAvailableItems) {
                setListbuilderSelectedItems();
            }
        }

        ctrl.toggleOnlySelected = toggleOnlySelected;
        ctrl.multiselectItemToggled = multiselectItemToggled;
        ctrl.multiselectItemsToggled = multiselectItemsToggled;
        ctrl.toggleAllAvailableItems = toggleAllAvailableItems;

        ctrl.$onInit = onInit;
        ctrl.$onChanges = bindingChanges;
    }

    angular.module('sky.listbuilder.multiselect.component', 
      [
          'sky.resources',
          'sky.listbuilder.multiselect.selectall.component',
          'sky.listbuilder.multiselect.clearall.component'
      ])
        .component('bbListbuilderMultiselect', {
            templateUrl: 'sky/templates/listbuilder/listbuilder.multiselect.component.html',
            bindings: {
                bbListbuilderOnShowOnlySelected: '&?',
                bbListbuilderShowOnlySelected: '<?',
                bbListbuilderMultiselectSelectedIds: '<?',
                bbListbuilderMultiselectItemsChanged: '&?',
                bbListbuilderMultiselectAvailableItems: '<?',
                bbListbuilderMultiselectItemIdProperty: '@?',
                bbListbuilderMultiselectItemSelectedProperty: '@?'
            },
            require: {
                listbuilderCtrl: '^^bbListbuilder'
            },
            transclude: true,
            controller: Controller
        });
})();
/* global angular */
(function () {
    'use strict';

    function Controller() {
        var ctrl = this;

        function listbuilderMultiselectToggled(result) {
            if (angular.isArray(result)) {
                ctrl.bbListbuilderMultiselect.multiselectItemsToggled(true, result);
            }
        }

        function selectAllItems() {
            var selectAllResult;
            if (angular.isFunction(ctrl.bbListbuilderMultiselectOnSelectAll)) {
                selectAllResult = ctrl.bbListbuilderMultiselectOnSelectAll();

                if (selectAllResult && angular.isFunction(selectAllResult.then)) {
                    selectAllResult.then(function (result) {
                        listbuilderMultiselectToggled(result);
                    });
                } else {
                    listbuilderMultiselectToggled(selectAllResult);
                }
            } else {
                ctrl.bbListbuilderMultiselect.toggleAllAvailableItems(true);
            }  
        }

        ctrl.selectAllItems = selectAllItems;
    }

    angular.module('sky.listbuilder.multiselect.selectall.component', ['sky.resources'])
        .component('bbListbuilderMultiselectSelectAll', {
            templateUrl: 'sky/templates/listbuilder/listbuilder.multiselect.selectall.component.html',
            bindings: {
                bbListbuilderMultiselectOnSelectAll: '&?'
            },
            require: {
                bbListbuilderMultiselect: '^^bbListbuilderMultiselect'
            },
            controller: Controller
        });
})();
/* global angular */
(function () {
    'use strict';

    function Controller(bbResources, $timeout) {
        var ctrl = this;

        function viewIsActive() {
            return ctrl.listbuilderContentCtrl.getCurrentView() && ctrl.listbuilderContentCtrl.getCurrentView().viewName === ctrl.viewName;
        }

        function addRepeaterItem() {
            $timeout(function () {
                ctrl.listbuilderContentCtrl.highlightLastSearchText();
            });
        }

        function initRepeater() {
            ctrl.viewName = 'repeater';
            ctrl.listbuilderContentCtrl.addListbuilderView({ 
                viewName: ctrl.viewName, 
                viewSwitcherClass: 'fa-list',
                highlightClass: 'bb-repeater-item',
                viewSwitcherLabel: bbResources.listbuilder_repeater_switcher
            });
        }

        function onDestroy() {
            ctrl.listbuilderContentCtrl.removeListbuilderView(ctrl.viewName);
        }

        ctrl.$postLink = initRepeater;
        ctrl.$onDestroy = onDestroy;
        ctrl.viewIsActive = viewIsActive;
        ctrl.addRepeaterItem = addRepeaterItem;

    }

    Controller.$inject = ['bbResources', '$timeout'];

    angular.module('sky.listbuilder.repeater.component', ['sky.repeater', 'sky.resources'])
        .component('bbListbuilderRepeater', {
            templateUrl: 'sky/templates/listbuilder/listbuilder.repeater.component.html',
            transclude: true,
            controller: Controller,
            require: {
                listbuilderContentCtrl: '^bbListbuilderContent'
            }

        });
}());
/* global angular */
(function () {
    'use strict';

    function Controller($scope) {
        var ctrl = this;
        
        function listbuilderRepeaterItemToggled(selectedArgs) {
            ctrl.listbuilderCtrl.itemToggled(selectedArgs.isSelected, ctrl.getRepeaterItemId());
        }

        $scope.$on('bbRepeaterItemInitialized', function (event, data) {
            data.repeaterItemCtrl.bbRepeaterItemSelectionToggled = listbuilderRepeaterItemToggled;
            event.stopPropagation();
            event.preventDefault(); 
        });
    }

    Controller.$inject = ['$scope'];

    function linkFn($scope, el, attr, ctrls) {
        var ctrl = ctrls[0],
            repeaterCtrl = ctrls[1];

        ctrl.listbuilderCtrl = ctrls[2];

        function getRepeaterItemId() {
            return $scope.$eval(attr.bbListbuilderRepeaterItemId);
        }

        ctrl.getRepeaterItemId = getRepeaterItemId;
        
        repeaterCtrl.addRepeaterItem();
    }

    angular.module('sky.listbuilder.repeater.item.directive', [])
        .directive('bbListbuilderRepeaterItem', function () {
            return {
                restrict: 'A',
                link: linkFn,
                controller: Controller,
                require: ['bbListbuilderRepeaterItem', '^^bbListbuilderRepeater', '^^bbListbuilder']
            }; 
        });
}());
/* global angular */
(function () {
    'use strict';

    function Controller() {
        var ctrl = this;

        function onInit() {
            ctrl.dropdownCtrl.dropdownItemChanged(true);
        }

        function onDestroy() {
            ctrl.dropdownCtrl.dropdownItemChanged(false);
        }

        ctrl.$onInit = onInit;
        ctrl.$onDestroy = onDestroy;
    }

    angular.module('sky.listbuilder.secondary.action.component', [])
        .component('bbListbuilderSecondaryAction', {
            templateUrl: 'sky/templates/listbuilder/listbuilder.secondary.action.component.html',
            transclude: true,
            controller: Controller,
            require: {
                dropdownCtrl: '^^bbListbuilderSecondaryActionsDropdown'
            },
            bindings: {
                bbListbuilderSecondaryActionDisabled: '<?',
                bbListbuilderSecondaryActionClick: '&?'
            }
        });
})();
/* global angular */
(function () {
    'use strict';

    function Controller($scope) {
        var ctrl = this;

        function itemChanged(itemAdded) {
            if (itemAdded) {
                ctrl.totalSecondaryActions++;
            } else {
                ctrl.totalSecondaryActions--;
            }
        }

        function onInit() {
            ctrl.secondaryMenuId = 'bb-listbuilder-secondary-actions-' + $scope.$id;
            ctrl.totalSecondaryActions = 0;
        }

        ctrl.itemChanged = itemChanged;

        ctrl.$onInit = onInit;

    }

    Controller.$inject = ['$scope'];

    angular.module('sky.listbuilder.secondary.actions.component', 
        [
            'ui.bootstrap.dropdown', 
            'sky.resources', 
            'sky.listbuilder.secondary.action.component',
            'sky.listbuilder.column.picker.component',
            'sky.listbuilder.secondary.actions.dropdown.component'
        ])
        .component('bbListbuilderSecondaryActions', {
            templateUrl: 'sky/templates/listbuilder/listbuilder.secondary.actions.component.html',
            controller: Controller,
            transclude: true,
            bindings: {
                bbListbuilderSecondaryActionsAppendToBody: '<?'
            },
            require: {
                listbuilderCtrl: '^^bbListbuilder'
            }
        });
})();
/* global angular */
(function () {
    'use strict';

    function Controller() {
        var ctrl = this;

        function dropdownItemChanged(itemAdded) {
            ctrl.bbListbuilderSecondaryActionsItemChanged({itemAdded: itemAdded});
        }

        ctrl.dropdownItemChanged = dropdownItemChanged;
    }

    angular.module('sky.listbuilder.secondary.actions.dropdown.component', [])
        .component('bbListbuilderSecondaryActionsDropdown', {
            controller: Controller,
            transclude: true,
            bindings: {
                bbListbuilderSecondaryActionsItemChanged: '&',
                bbListbuilderSecondaryActionsCurrentView: '<'
            },
            templateUrl: 'sky/templates/listbuilder/listbuilder.secondary.actions.dropdown.component.html'
        });
})();
 /* global angular */
 (function () {
     'use strict';

     function Controller($scope) {
         var ctrl = this;

         function switchView(newView) {
             ctrl.bbListbuilderSwitcherCurrentView = newView;
             /* istanbul ignore else */
             /* sanity check */
             if (angular.isFunction(ctrl.bbListbuilderSwitcherViewChange)) {
                 ctrl.bbListbuilderSwitcherViewChange({newView: newView});
             }
         }

         function onInit() {
             ctrl.switcherId = 'listbuilder-switcher-' + $scope.$id;
         }
         ctrl.switchView = switchView;
         ctrl.$onInit = onInit;
     }

     Controller.$inject = ['$scope']; 

     angular.module('sky.listbuilder.switcher.component', [])
        .component('bbListbuilderSwitcher', {
            templateUrl: 'sky/templates/listbuilder/listbuilder.switcher.component.html',
            transclude: true,
            controller: Controller,
            bindings: {
                bbListbuilderSwitcherViews: '<?',
                bbListbuilderSwitcherCurrentView: '<?',
                bbListbuilderSwitcherViewChange: '&?'
            }
        });
 })();
 
 
/* global angular */
(function () {
    'use strict';

    function Controller($element, bbViewKeeperBuilder, $scope, $transclude) {
        var ctrl = this,
            vkToolbar;

        function applySearchText(searchText) {
            var highlightPromise;

            highlightPromise = ctrl.bbListbuilderOnSearch({searchText: searchText});

            if (highlightPromise && angular.isFunction(highlightPromise.then)) {
                // Allow user to call highlight promise after applying search callback
                highlightPromise.then(function () {
                    ctrl.listbuilderCtrl.highlightSearchText(searchText);
                });
            } else {
                ctrl.listbuilderCtrl.highlightSearchText(searchText);
            }
            
        }

        function searchTextChanged(searchText) {
            if (angular.isFunction(ctrl.bbListbuilderOnSearchTextChanged)) {
                ctrl.bbListbuilderOnSearchTextChanged({searchText: searchText});
            }  
        }

        // Floating headers
        function setupViewKeeper() {
            if (ctrl.bbListbuilderToolbarFixed !== 'true') {

                /* istanbul ignore next */
                /* sanity check */
                if (vkToolbar) {
                    vkToolbar.destroy();
                }

                vkToolbar = new bbViewKeeperBuilder.create({
                    el: $element.find('.bb-listbuilder-toolbar-summary-container'),
                    boundaryEl: ctrl.listbuilderCtrl.getContentContainer(),
                    setWidth: true,
                    verticalOffSetElId: ctrl.bbListbuilderVerticalOffsetElId
                });
            }
        }

        function destroyViewKeeper() {
            if (vkToolbar) {
                vkToolbar.destroy();
            }
        }

        function viewChanged(newView) {
            /* istanbul ignore else */
            /* sanity check */
            if (angular.isFunction(ctrl.listbuilderCtrl.setCurrentView)) {
                ctrl.listbuilderCtrl.setCurrentView(newView);
            }
        }

        // Trigger highlight if bbListbuilderSearchText binding changes from parent.
        function bindingChanges(changesObj) {
            var searchText;
            if (changesObj.bbListbuilderSearchText) {
                searchText = changesObj.bbListbuilderSearchText;
                /* istanbul ignore else */
                /* sanity check */
                if (searchText.currentValue !== searchText.previousValue) {
                    ctrl.listbuilderCtrl.highlightSearchText(searchText.currentValue);
                }
            }
        }

        function getToolbarId() {
            return ctrl.listbuilderToolbarId;
        }

        function getTopScrollbar() {
            return $element.find('.bb-listbuilder-toolbar-top-scrollbar');
        }

        function sortComponentPresent() {
            return $transclude.isSlotFilled('bbListbuilderSort');
        }

        function setupTopScrollbar() {
            var topScrollbarEl = getTopScrollbar();

            /* istanbul ignore else */
            /* sanity check */
            if (topScrollbarEl.length > 0) {
                topScrollbarEl.on('scroll', function () {
                    /* istanbul ignore else */
                    /* sanity check */
                    if (angular.isFunction(ctrl.listbuilderCtrl.topScrollbarScrollAction)) {
                        ctrl.listbuilderCtrl.topScrollbarScrollAction();
                    }
                });
            }
        }

        function destroyTopScrollbar() {
            var topScrollbarEl = getTopScrollbar();

            /* istanbul ignore else */
            /* sanity check */
            if (topScrollbarEl.length > 0) {
                topScrollbarEl.off('scroll');
            }
        }

        function initToolbar() {
            if (ctrl.bbListbuilderSearchText) {
                ctrl.listbuilderCtrl.highlightSearchText(ctrl.bbListbuilderSearchText);
            }

            ctrl.listbuilderCtrl.getToolbarId = getToolbarId;
            ctrl.listbuilderCtrl.getTopScrollbar = getTopScrollbar;
            ctrl.listbuilderCtrl.toolbarSortComponentPresent = sortComponentPresent;

            ctrl.listbuilderToolbarId = 'bb-listbuilder-toolbar-' + $scope.$id;
            
            setupTopScrollbar();
            
            setupViewKeeper();

        }

        function destroyToolbar() {
            destroyViewKeeper();
            destroyTopScrollbar();

        }

        // Lifecycle hooks
        ctrl.$postLink = initToolbar;
        ctrl.$onChanges = bindingChanges;
        ctrl.$onDestroy = destroyToolbar;

        ctrl.applySearchText = applySearchText;

        ctrl.searchTextChanged = searchTextChanged;
        ctrl.viewChanged = viewChanged;

    }

    Controller.$inject = ['$element', 'bbViewKeeperBuilder', '$scope', '$transclude'];

    angular.module('sky.listbuilder.toolbar.component', 
        [
            'sky.resources', 
            'sky.viewkeeper', 
            'sky.listbuilder.add.component',       
            'sky.filter',
            'sky.search',
            'sky.sort',
            'sky.listbuilder.multiselect.component',
            'sky.listbuilder.secondary.actions.component'
        ])
        .component('bbListbuilderToolbar', {
            templateUrl: 'sky/templates/listbuilder/listbuilder.toolbar.component.html',
            bindings: {
                bbListbuilderOnSearch: '&?',
                bbListbuilderOnSearchTextChanged: '&?',
                bbListbuilderSearchText: '<?',
                bbListbuilderSearchPlaceholder: '<?',
                bbListbuilderVerticalOffsetElId: '<?',
                bbListbuilderToolbarFixed: '@?'
            },
            transclude: {
                bbListbuilderAdd: '?bbListbuilderAdd',
                bbListbuilderFilter: '?bbListbuilderFilter',
                bbListbuilderSort: '?bbListbuilderSort',
                bbListbuilderFilterSummary: '?bbListbuilderFilterSummary',
                bbListbuilderToolbarMultiselect: '?bbListbuilderToolbarMultiselect',
                bbListbuilderToolbarSecondaryActions: '?bbListbuilderToolbarSecondaryActions'
            },
            controller: Controller,
            require: {
                listbuilderCtrl: '^bbListbuilder'
            }
        });
}());
/*global angular, define, enquire, require */

(function () {
    'use strict';

    var mediaBreakpointsConfig = {
            mediaQueries: {
                xs: '(max-width: 767px)',
                sm: '(min-width: 768px) and (max-width: 991px)',
                md: '(min-width: 992px) and (max-width: 1199px)',
                lg: '(min-width: 1200px)'
            }
        },
        bp = {},
        handlers = [],
        mediaBreakpoints;



    function runRegisterEnquire($window, $timeout) {
        function registerEnquire(enquire) {
            var mediaQueries = mediaBreakpointsConfig.mediaQueries,
                p;

            function updateStatus(newSize) {
                var handler,
                    i;
                bp.xs = bp.sm = bp.md = bp.lg = false;
                bp[newSize] = true;

                for (i = 0; i < handlers.length; i += 1) {
                    handler = handlers[i];

                    /*istanbul ignore else */
                    if (handler) {
                        handler(bp);
                    }
                }
                $timeout(angular.noop);
            }


            function registerQuery(name) {
                if (!angular.isDefined(enquire.queries[mediaQueries[name]])) {
                    enquire.register(mediaQueries[name], function () {
                        updateStatus(name);
                    });
                }
            }

            for (p in mediaQueries) {
                /*istanbul ignore else */
                if (mediaQueries.hasOwnProperty(p)) {
                    registerQuery(p);
                }
            }
        }

        /* istanbul ignore next */
        /* boilerplate RequireJS detection */
        if (typeof define === 'function' && define.amd) {
            // AMD. Register as an anonymous module.
            require(['enquire.js'], registerEnquire);
        } else if ($window.enquire) {
            // Browser globals
            registerEnquire(enquire);
        }
    }

    runRegisterEnquire.$inject = ['$window', '$timeout'];

    mediaBreakpoints = {
        register: function (callback) {
            handlers.push(callback);

            //Fire handler immediately
            callback(bp);
        },

        unregister: function (callback) {
            var i;

            for (i = 0; i < handlers.length; i += 1) {
                if (handlers[i] === callback) {
                    handlers.splice(i, 1);
                    break;
                }
            }
        },

        getCurrent: function () {
            return bp;
        }
    };

    angular.module('sky.mediabreakpoints', [])
        .constant('bbMediaBreakpointsConfig', mediaBreakpointsConfig)
        .run(runRegisterEnquire)
        .factory('bbMediaBreakpoints', [function () {
            return mediaBreakpoints;
        }]);
}());

/*jshint browser: true */
/*global angular */

(function () {
    'use strict';

    function bbModalBody() {
        function link(scope, el, attrs, modalCtrl) {
            el.addClass('modal-body container-fluid');
            modalCtrl.setBodyEl(el);
        }

        return {
            link: link,
            require: '^bbModal',
            restrict: 'A'
        };
    }

    angular.module('sky.modal.body.directive', ['sky.modal', 'sky.resources', 'ui.bootstrap'])
        .directive('bbModalBody', bbModalBody);
}());

/*jshint browser: true */
/*global angular, jQuery */

(function ($) {
    'use strict';

    function bbModal($timeout, bbViewKeeperBuilder) {
        function getPixelValue(val) {
            val = val || '0';

            return parseFloat(val.replace('px', ''));
        }

        function getModalBodyWrapperMargin(el) {
            var margin = 0;

            while (el.not('.modal-dialog') && 
                    el.length > 0 && 
                    // Don't evaluate any body padding since the modal should cover
                    // the entire screen, including the omnibar.
                    (!el.is(document.body))
            ) {
                margin += el.outerHeight() - el.height();

                el = el.parent();
            }

            return margin;
        }
        
        function link($scope, el) {
            var bodyEl,
                marginStyleEl,
                resizeTimeout,
                viewkeeperMarginBottomOverride,
                viewkeeperMarginTopOverride,
                windowEl = $(window);

            function setViewkeeperMarginTop(margin) {
                /* istanbul ignore else */
                /* sanity check */
                if (!marginStyleEl) {
                    marginStyleEl = $('<style></style>').appendTo(document.body);
                }

                marginStyleEl.text('.bb-modal-fullpage .bb-viewkeeper-fixed {margin-top: ' + margin + 'px !important;}');
            }

            function isFullPage() {
                var modalDialogEl = el.parents('.modal-dialog');
                
                return modalDialogEl.parents('.bb-modal').is('.bb-modal-fullpage');
            }

            function fitToWindow() {
                var footerHeight,
                    fullPage,
                    headerHeight,
                    margin,
                    modalDialogEl,
                    newMaxHeight,
                    newMinHeight,
                    reservedHeight;

                if (bodyEl && bodyEl.length > 0) {
                    modalDialogEl = el.parents('.modal-dialog');

                    if (modalDialogEl.length > 0) {
                        headerHeight = el.find('.modal-header').outerHeight();
                        footerHeight = el.find('.modal-footer').outerHeight();
                        fullPage = isFullPage();

                        if (fullPage) {
                            bodyEl.css({
                                'margin-top': headerHeight,
                                'margin-bottom': footerHeight
                            });
                            reservedHeight = headerHeight + footerHeight;
                            reservedHeight += getModalBodyWrapperMargin(el);
                            newMinHeight = windowEl.height() - reservedHeight;
                            bodyEl.css({
                                'min-height': newMinHeight
                            });
                        } else {
                            margin = getPixelValue(modalDialogEl.css('margin-bottom')) + 
                                getPixelValue(modalDialogEl.css('margin-top'));

                            reservedHeight = margin + headerHeight + footerHeight;

                            // Account for the border, padding, etc. of the elements 
                            // that wrap the modal body.
                            reservedHeight += getModalBodyWrapperMargin(el);

                            newMaxHeight = windowEl.height() - reservedHeight;

                            bodyEl.css('max-height', newMaxHeight);
                        } 
                    }
                }
            }

            $scope.fitToWindow = fitToWindow;

            $scope.$watch('bodyEl', function (newValue) {
                bodyEl = newValue;
                fitToWindow();
            });
            
            $scope.$watch(function () {
                if ($scope.headerEl) {
                    return $scope.headerEl.outerHeight();
                }
            }, function (newValue) {
                if (isFullPage()) {
                    /* istanbul ignore else */
                    /* sanity check */
                    if (!viewkeeperMarginTopOverride) {
                        viewkeeperMarginTopOverride = {};
                        
                        bbViewKeeperBuilder.addViewportMarginTopOverride(
                            viewkeeperMarginTopOverride
                        );
                    }
                    
                    viewkeeperMarginTopOverride.margin = newValue;

                    setViewkeeperMarginTop(newValue);
                }
            });

            $scope.$watch(function () {
                if ($scope.footerEl) {
                    return $scope.footerEl.outerHeight();
                }
            }, function (newValue) {
                if (isFullPage()) {
                    if (!viewkeeperMarginBottomOverride) {
                        viewkeeperMarginBottomOverride = {};
                        
                        bbViewKeeperBuilder.addViewportMarginBottomOverride(
                            viewkeeperMarginBottomOverride
                        );
                    }
                    
                    viewkeeperMarginBottomOverride.margin = newValue;
                }
            });

            $timeout(function () {
                fitToWindow();
            }, 0);

            windowEl.on('resize.bbModal' + $scope.$id, function () {
                $timeout.cancel(resizeTimeout);

                resizeTimeout = $timeout(function () {
                    fitToWindow();
                }, 250);
            });

            el.on('$destroy', function () {
                windowEl.off('.bbModal' + $scope.$id);

                if (viewkeeperMarginBottomOverride) {
                    bbViewKeeperBuilder.removeViewportMarginBottomOverride(
                        viewkeeperMarginBottomOverride
                    );
                }

                if (viewkeeperMarginTopOverride) {
                    bbViewKeeperBuilder.removeViewportMarginTopOverride(
                        viewkeeperMarginTopOverride
                    );
                }

                if (marginStyleEl) {
                    marginStyleEl.remove();
                    marginStyleEl = null;
                }
            });
        }

        function Controller($scope) {
            var ctrl = this;
            function onInit() {
                ctrl.setBodyEl = function (bodyEl) {
                    $scope.bodyEl = bodyEl;
                };

                ctrl.setHeaderEl = function (headerEl) {
                    $scope.headerEl = headerEl;
                };

                ctrl.setFooterEl = function (footerEl) {
                    $scope.footerEl = footerEl;
                };

                ctrl.fitToWindow = function () {
                    $scope.fitToWindow();
                };

                ctrl.dismiss = function (arg) {
                    $scope.$dismiss(arg);
                };
            }

            ctrl.$onInit = onInit;
            
        }

        Controller.$inject = ['$scope'];

        return {
            controller: Controller,
            replace: true,
            transclude: true,
            restrict: 'E',
            templateUrl: 'sky/templates/modal/modal.html',
            link: link
        };
    }

    bbModal.$inject = ['$timeout', 'bbViewKeeperBuilder'];

    angular.module('sky.modal.directive', ['sky.viewkeeper'])
        .directive('bbModal', bbModal);
}(jQuery));

/*jshint browser: true */
/*global angular, jQuery */

(function ($) {
    'use strict';

    var CLS_BODY_FULLPAGE = 'bb-modal-open-fullpage',
        CLS_BODY_MOBILE = 'bb-modal-open-mobile',
        modalCount = 0,
        openFullPageModalCount = 0,
        openModalCount = 0;

    function bbModal($uibModal, $window) {
        return {
            open: function (uibModalOptions, additionalOptions) {
                var animation = true,
                    backdropClass,
                    bodyEl,
                    fullPage,
                    idCls,
                    isIOS,
                    modalInstance,
                    scrollTop,
                    windowClass = 'bb-modal';

                function modalClosed() {
                    $(window).off('resize.' + idCls);

                    openModalCount--;

                    if (fullPage) {
                        openFullPageModalCount--;

                        if (openFullPageModalCount === 0) {
                            bodyEl.removeClass(CLS_BODY_FULLPAGE);
                        }
                    }

                    if (isIOS) {
                        bodyEl
                            .removeClass(CLS_BODY_MOBILE)
                            .scrollTop(scrollTop);
                    }

                    bodyEl = null;
                }

                if (additionalOptions) {
                    fullPage = additionalOptions.fullPage;
                }

                modalCount++;
                idCls = 'bb-modal-id-' + modalCount;

                windowClass += ' ' + idCls;

                if (fullPage) {
                    windowClass += ' bb-modal-fullpage';
                    backdropClass = 'bb-modal-fullpage-backdrop';
                    animation = false;
                }

                isIOS = /iPad|iPod|iPhone/i.test($window.navigator.userAgent);
                bodyEl = $(document.body);

                // Change default values for modal options
                uibModalOptions = angular.extend({
                    animation: animation,
                    backdrop: 'static',
                    backdropClass: backdropClass,
                    windowClass: windowClass
                }, uibModalOptions);

                // Mobile browsers exhibit weird behavior when focusing on an input element
                // inside a position: fixed element (in this case the modal), and it also
                // doesn't propery prohibit scrolling on the window.  Adding this CSS class
                // will change the body position to fixed and the modal position to absolute
                // to work around this behavior.
                if (isIOS) {
                    // Setting the body position to be fixed causes it to be scrolled to the
                    // top.  Cache the current scrollTop and set it back when the modal is
                    // closed.
                    scrollTop = bodyEl.scrollTop();
                    bodyEl.addClass(CLS_BODY_MOBILE);
                }

                if (fullPage) {
                    bodyEl.addClass(CLS_BODY_FULLPAGE);
                    openFullPageModalCount++;
                }

                modalInstance = $uibModal.open(uibModalOptions);

                openModalCount++;

                modalInstance.result.then(modalClosed, modalClosed);

                return modalInstance;
            }
        };
    }    

    bbModal.$inject = ['$uibModal', '$window'];

    angular.module('sky.modal.factory', ['ui.bootstrap'])
        .factory('bbModal', bbModal);
}(jQuery));

/*jshint browser: true */
/*global angular */

(function () {
    'use strict';

    function bbModalFooterButtonCancel(bbResources) {
        return {
            replace: true,
            transclude: true,
            require: ['^bbModal', '^bbModalFooter'],
            restrict: 'E',
            templateUrl: 'sky/templates/modal/modalfooterbuttoncancel.html',
            link: function ($scope, el, attrs, ctrls) {
                $scope.dismiss = ctrls[0].dismiss;
                if (el.contents().length === 0) {
                    el.append("<span>" + bbResources.modal_footer_cancel_button + "</span>");
                }
            }
        };
    }

    bbModalFooterButtonCancel.$inject = ['bbResources'];

    angular.module(
        'sky.modal.footer.button.cancel.directive', 
        [
            'sky.modal.footer.directive', 
            'sky.resources'
        ]
    )
        .directive('bbModalFooterButtonCancel', bbModalFooterButtonCancel);
}());

/*jshint browser: true */
/*global angular */

(function () {
    'use strict';

    function bbModalFooterButton() {
        return {
            replace: true,
            transclude: true,
            require: '^bbModalFooter',
            restrict: 'E',
            templateUrl: 'sky/templates/modal/modalfooterbutton.html'
        };
    }

    angular.module('sky.modal.footer.button.directive', ['sky.helpbutton', 'sky.resources', 'ui.bootstrap'])
        .directive('bbModalFooterButton', bbModalFooterButton);
}());

/*jshint browser: true */
/*global angular */

(function () {
    'use strict';

    function bbModalFooterButtonPrimary(bbResources) {
        return {
            replace: true,
            transclude: true,
            require: '^bbModalFooter',
            restrict: 'E',
            templateUrl: 'sky/templates/modal/modalfooterbuttonprimary.html',
            link: function ($scope, el) {
                if (el.contents().length === 0) {
                    el.append("<span>" + bbResources.modal_footer_primary_button + "</span>");
                }
            }
        };
    }

    bbModalFooterButtonPrimary.$inject = ['bbResources'];

    angular.module(
        'sky.modal.footer.button.primary.directive', 
        [
            'sky.modal.footer.directive',
            'sky.resources'
        ]
    )
        .directive('bbModalFooterButtonPrimary', bbModalFooterButtonPrimary);
}());

/*jshint browser: true */
/*global angular */

(function () {
    'use strict';

    function bbModalFooter() {
        function link(scope, el, attrs, bbModal) {
            bbModal.setFooterEl(el);
        }

        return {
            controller: angular.noop,
            link: link,
            replace: true,
            transclude: true,
            require: '^bbModal',
            restrict: 'E',
            templateUrl: 'sky/templates/modal/modalfooter.html'
        };
    }

    angular.module('sky.modal.footer.directive', ['sky.helpbutton', 'sky.resources', 'ui.bootstrap'])
        .directive('bbModalFooter', bbModalFooter);
}());

/*jshint browser: true */
/*global angular */

(function () {
    'use strict';

    function bbModalHeader() {
        function link(scope, el, attrs, bbModal) {
            scope.dismiss = bbModal.dismiss;
            bbModal.setHeaderEl(el);
        }

        return {
            controller: angular.noop,
            link: link,
            replace: true,
            transclude: true,
            require: '^bbModal',
            restrict: 'E',
            templateUrl: 'sky/templates/modal/modalheader.html',
            scope: {
                bbModalHelpKey: '='
            }
        };
    }

    angular.module(
        'sky.modal.header.directive', 
        [
            'sky.helpbutton', 
            'sky.modal', 
            'sky.resources', 
            'ui.bootstrap'
        ]
    )
        .directive('bbModalHeader', bbModalHeader);
}());

/*global angular, define, require */

(function () {
    'use strict';

    function bbMoment($window) {
        return $window.moment;
    }

    bbMoment.$inject = ['$window'];

    /*istanbul ignore next */
    /* boilerplate require gunk */
    function runRegisterMoment($window) {

        /*istanbul ignore next */
        function registerMoment(moment) {
            $window.moment = moment;
        }

        if (angular.isUndefined($window.moment) && typeof define === 'function' && define.amd) {
            require(['moment'], registerMoment);
        }
    }

    runRegisterMoment.$inject = ['$window'];

    angular.module('sky.moment', [])
        .run(runRegisterMoment)
        .factory('bbMoment', bbMoment);

}());

/*global angular, jQuery */

(function ($) {
    'use strict';

    function toggleOpen(el, action) {
        $(el)[action + 'Class']('open');
    }

    function toggleClick(el) {
        var isOpen = $(el).hasClass('open'),
            action;

        action = isOpen ? 'remove' : 'add';
        toggleOpen(el, action);

    }
    
    function Controller($element) {
        
        /*jslint unparam: true */
        ($element)
        .on('mouseenter', '.dropdown', function () {
            toggleOpen(this, 'add');
        }).on('mouseleave', '.dropdown', function () {
            toggleOpen(this, 'remove');
        }).on('click', '.dropdown', function () {
            toggleClick(this);
        }).on('click', '.dropdown-menu a', function ($event) {
            toggleOpen($('.dropdown', $element), 'remove');
            $event.stopPropagation();
        });
    }
    
    Controller.$inject = ['$element']; 
    angular.module('sky.navbar', [])
        .component('bbNavbar', {
            transclude: true,
            templateUrl: 'sky/templates/navbar/navbar.component.html', 
            controller: Controller 
        });
}(jQuery));

/*global angular, jQuery */

(function ($) {
    'use strict';

    angular.module('sky.omnibar', [])
        .constant('bbOmnibarConfig', {
            appLookupUrl: '',
            enableHelp: false,
            enableSearch: false,
            productId: 'Sky',
            searchPlaceholder: 'Search',
            serviceName: 'Sky',
            signOutUrl: '',
            tenantId: '',
            url: 'https://signin.blackbaud.com/omnibar.min.js'
        })
        .directive('bbOmnibar', ['$window', 'bbOmnibarConfig', function ($window, bbOmnibarConfig) {
            return {
                transclude: true,
                template: '<div class="bb-omnibar-wrap"></div><div class="bb-omnibar-menu-wrap" ng-transclude></div>',
                link: function (scope, el) {
                    var omnibarEl = el.children('.bb-omnibar-wrap'),
                        omnibarMenuEl = el.find('.bb-omnibar-menu-wrap .bb-omnibar-menu');

                    function afterLoad() {
                        var searchBox = omnibarEl.find('.searchbox'),
                            searchContainer = omnibarEl.find('.searchContainer'),
                            searchValue;

                        // No longer need this holding div now that the menu was moved into the right location in the omnibar.
                        el.children(".bb-omnibar-menu-wrap").remove();

                        if (omnibarEl.find(".mobile .productmenucontainer").length === 0) {
                            $(".bb-navbar").addClass("bb-navbar-showmobile");
                        }

                        searchBox.attr('placeholder', bbOmnibarConfig.searchPlaceholder);

                        scope.searchBox = searchBox;

                        searchBox.on('keyup', function (event) {
                            var value = searchBox.val();

                            /*istanbul ignore else */
                            if (value !== searchValue) {
                                searchValue = value;

                                scope.searchText = value;
                                scope.$apply();
                            }

                            scope.$emit('searchBoxKeyUp', event.keyCode);
                        });

                        searchBox.on('click', function () {
                            scope.$emit('searchBoxClicked');
                        });

                        scope.$watch('searching', function (searching) {
                            if (searching) {
                                searchContainer.addClass('searching');
                            } else {
                                searchContainer.removeClass('searching');
                            }
                        });

                        scope.$watch('searchText', function (searchText) {
                            searchText = searchText || '';
                            if (searchText !== searchBox.val()) {
                                searchValue = searchText;
                                searchBox.val(searchText);
                            }
                        });

                        scope.$apply();

                        if (angular.isFunction(bbOmnibarConfig.afterLoad)) {
                            /* jshint validthis: true */
                            bbOmnibarConfig.afterLoad.apply(this, arguments);
                        }
                    }

                    function userLoaded(userData) {
                        var omnibarIndicatesNullUserTime;

                        //If the user ID loaded in the omnibar does not match the user who loaded the page, sign the
                        //user out of the application.  This will result in a redirect back to the auth size to update
                        //the user's claims or ask the user to log back in.
                        if (userData.id !== bbOmnibarConfig.authenticationUserId && bbOmnibarConfig.signOutUrl) {

                            if (userData.id === null) {
                                //If userData.id ==null then it may just means the omnibar is stale or there was a problem
                                //with the interaction of the omnibar and the rex shell SPA client side code.
                                //
                                //If we can use localStorage to track data across sessions, then attempt to log out of NXT once
                                //and see if this fixes it, but avoid an infinite redirect loop with the Auth Svc.
                                //
                                //If the browser doesn't support localStorage, then just return.
                                //
                                //If we don't back to the auth sign in site here, then it will just stay on the current page
                                //with the understanding that the omnibar may be in a state of acting as though the user
                                //is signed out.  The page is still secure because the Auth claims are evaluated on the server.
                                //This special case is just about dealing with an edge case issue with client side javascript.
                                if ($window.localStorage) {
                                    omnibarIndicatesNullUserTime = $window.localStorage.omnibarIndicatesNullUserTime;

                                    if (omnibarIndicatesNullUserTime && (new Date() - Date.parse(omnibarIndicatesNullUserTime)) / 1000 <= 10) {
                                        // We just looped through Auth within the last 10 seconds, so don't leave again now.
                                        return;
                                    }

                                    try {
                                        // Stash the time that we're doing this redirect to avoid infinite loops.
                                        $window.localStorage.omnibarIndicatesNullUserTime = (new Date()).toString();
                                    } catch (e) {
                                        // Safari private browsing will throw an exception on setting localStroage.
                                        /*istanbul ignore next */
                                        /* super edge case */
                                        return;
                                    }
                                } else {
                                    return;
                                }
                            }

                            // Log out and redirect to auth service.
                            $window.location.href = bbOmnibarConfig.signOutUrl;
                        }

                        if (angular.isFunction(bbOmnibarConfig.userLoaded)) {
                            /* jshint validthis: true */
                            bbOmnibarConfig.userLoaded.apply(this, arguments);
                        }
                    }

                    $.ajax({
                        cache: true,
                        dataType: 'script',
                        url: bbOmnibarConfig.url
                    }).done(function () {
                        var loadOptions = angular.extend({}, bbOmnibarConfig, {
                            afterLoad: afterLoad,
                            userLoaded: userLoaded,
                            menuEl: omnibarMenuEl
                        });

                        $window.BBAUTH.Omnibar.load(omnibarEl, loadOptions);
                    });
                }
            };
        }])
        .directive('bbOmnibarMenu', function () {
            return {
                replace: true,
                require: '^bbOmnibar',
                restrict: 'E',
                transclude: true,
                template: '<div class="bb-omnibar-menu" ng-transclude></div>'
            };
        });
}(jQuery));

/*global angular */

(function () {
    'use strict';

    angular.module('sky.page', [])
        .constant('bbPageConfig', {
            redirectUrl: null,
            notFoundUrl: null
        })
        .factory('bbPage', [function () {
            var pageStatuses;

            pageStatuses = {
                LOADING: 0,
                LOADED: 1,
                NOT_AUTHORIZED: 2,
                //ERROR: 3,
                NOT_FOUND: 4
            };

            return {
                pageStatuses: pageStatuses
            };
        }])
        .directive('bbPage', ['$window', 'bbResources', 'bbPage', 'bbPageConfig', 'bbData', '$location',
            function ($window, bbResources, bbPage, bbPageConfig, bbData, $location) {
                function link(scope, element) {
                    var loadManager,
                        locals;

                    function navigateAway() {
                        $window.location.href = bbPageConfig.redirectUrl || $window.location.origin;
                    }

                    function noPageStatusSpecified() {
                        return element.attr('bb-page-status') === undefined;
                    }

                    function onShowing() {
                        if (scope.bbPageUsesLoadManager) {
                            loadManager = locals.loadManager = bbData.loadManager({
                                scope: scope,
                                waitForFirstItem: true,
                                nonblockWaitForAdditionalItems: true,
                                isAggregate: true
                            });
                        }
                    }

                    locals = scope.locals = {
                        navigateAway: navigateAway,
                        noPageStatusSpecified: noPageStatusSpecified,
                        pageStatuses: bbPage.pageStatuses,
                        onShowing: onShowing
                    };

                    scope.resources = bbResources;

                    scope.$watch('bbPageStatus', function (value, oldValue) {
                        scope.value = "something";
                        scope.oldValue = oldValue;

                        if (!value) {
                            scope.$emit("bbBeginWait");
                        } else if (value && !oldValue) {
                            scope.$emit("bbEndWait");
                        }

                        if (value === locals.pageStatuses.NOT_AUTHORIZED) {
                            if (loadManager) {
                                loadManager.cancelWaiting();
                            }
                        } else if (value === locals.pageStatuses.NOT_FOUND) {
                            if (loadManager) {
                                loadManager.cancelWaiting();
                            }

                            $location.path(bbPageConfig.notFoundUrl).replace();
                        }

                    });
                }

                return {
                    restrict: 'E',
                    scope: {
                        bbPageStatus: '=?',
                        bbPageUsesLoadManager: '@?'
                    },
                    templateUrl: 'sky/templates/page/page.html',
                    transclude: true,
                    link: link
                };
            }]);
}());

/*global angular */

(function () {
    'use strict';

    var components = [{
        name: 'Alert',
        cls: 'alert'
    }, {
        name: 'Content',
        cls: 'content'
    }, {
        name: 'KeyInfo',
        cls: 'key-info'
    }, {
        name: 'Image',
        cls: 'image'
    }, {
        name: 'Status',
        cls: 'status'
    }, {
        name: 'Title',
        cls: 'title'
    }, {
        name: 'Subtitle',
        cls: 'subtitle'
    }, {
        name: 'ActionBar',
        cls: 'action-bar'
    }],
    pageSummaryModule = angular.module('sky.pagesummary');

    function makePageSummaryComponent(component) {
        var controllerName,
            name = component.name;

        function Controller($scope) {
            var vm = this;

            $scope.$on('$destroy', function () {
                vm.onDestroy();
                vm = null;
            });
        }

        Controller.$inject = ['$scope'];

        function componentFn() {
            function link(scope, el, attrs, ctrls) {
                var vm = ctrls[0],
                    bbPageSummary = ctrls[1];

                vm.el = el;

                bbPageSummary['set' + name](vm);
            }

            return {
                restrict: 'E',
                require: ['bbPageSummary' + name, '^bbPageSummary'],
                controller: controllerName,
                controllerAs: 'bbPageSummary' + name,
                bindToController: true,
                link: link,
                scope: {}
            };
        }

        controllerName = 'BBPageSummary' + name + 'Controller';

        pageSummaryModule
            .controller(controllerName, Controller)
            .directive('bbPageSummary' + name, componentFn);
    }

    function getCtrlPropName(component) {
        var name = component.name;

        return name.charAt(0).toLowerCase() + name.substr(1) + 'Ctrl';
    }

    function BBPageSummaryController() {
        var vm = this;

        function addComponentSetter(component) {
            var name = component.name;

            vm['set' + name] = function (ctrl) {
                var propName = getCtrlPropName(component);

                vm[propName] = ctrl;

                ctrl.onDestroy = function () {
                    vm[propName] = null;
                };
            };
        }

        components.forEach(addComponentSetter);

        vm.getPageSummaryLeftCls = function () {
            return {
                'col-sm-9': !!vm.keyInfoCtrl
            };
        };
    }

    function bbPageSummary(bbMediaBreakpoints) {
        function link(scope, el, attrs, vm) {
            function watchForComponent(component) {
                scope.$watch(function () {
                    return vm[getCtrlPropName(component)];
                }, function (newValue) {
                    if (newValue) {
                        el.find('.bb-page-summary-' + component.cls)
                            .empty()
                            .append(newValue.el);
                    }
                });
            }

            function mediaBreakpointHandler(breakpoint) {
                var keyInfoEl = el.find('.bb-page-summary-key-info'),
                    toEl;

                if (breakpoint.xs) {
                    toEl = el.find('.bb-page-summary-key-info-xs');
                } else {
                    toEl = el.find('.bb-page-summary-key-info-sm');
                }

                if (!keyInfoEl.parent().is(toEl)) {
                    toEl.append(keyInfoEl);
                }
            }

            components.forEach(watchForComponent);

            bbMediaBreakpoints.register(mediaBreakpointHandler);

            scope.$on('$destroy', function () {
                bbMediaBreakpoints.unregister(mediaBreakpointHandler);
            });
        }

        return {
            restrict: 'E',
            controller: 'BBPageSummaryController',
            controllerAs: 'bbPageSummary',
            bindToController: true,
            link: link,
            scope: {},
            templateUrl: 'sky/templates/pagesummary/pagesummary.directive.html',
            transclude: true
        };
    }

    bbPageSummary.$inject = ['bbMediaBreakpoints'];

    pageSummaryModule
        .controller('BBPageSummaryController', BBPageSummaryController)
        .directive('bbPageSummary', bbPageSummary);

    components.forEach(makePageSummaryComponent);
}());

/*global angular */

(function () {
    'use strict';

    var evtNsPos = 0;

    angular.module('sky.pagination', ['ui.bootstrap.pagination', 'sky.pagination.label', 'sky.pagination.uibpagination'])
        .config(['uibPaginationConfig', function (paginationConfig) {
            paginationConfig.maxSize = 4;
            paginationConfig.itemsPerPage = 5;

            paginationConfig.nextText = paginationConfig.previousText = '';
        }])
        .factory('bbPaging', function () {
            return {
                init: function (sourceData, config) {
                    var paging;

                    function setPageData() {
                        var startingIndex,
                            currentPage;

                        if (!paging.disabled && sourceData) {
                            currentPage = paging.currentPage - 1; // 1-based

                            startingIndex = currentPage * paging.itemsPerPage;

                            paging.items = sourceData.slice(startingIndex, startingIndex + paging.itemsPerPage);
                        }
                    }

                    paging = {
                        currentPage: 1,
                        itemsPerPage: 5,
                        totalItems: sourceData ? sourceData.length : 0,
                        pageChanged: setPageData
                    };

                    angular.extend(paging, config);

                    setPageData();

                    return paging;
                }
            };
        })
        .directive('bbPagination', function () {
            return {
                restrict: 'A',
                scope: {
                    paginationDisabled: '=bbPaginationDisabled'
                },
                compile: function (el, attrs) {
                    var pagedData = attrs.bbPagination;
                    
                    /*jslint white: true */
                    el.html(
                        '<ul uib-pagination ng-show="' + pagedData + '.totalItems > ' + pagedData + '.itemsPerPage" total-items="' + pagedData + '.totalItems" ng-model="' + pagedData + '.currentPage" ng-change="' + pagedData + '.pageChanged()" items-per-page="' + pagedData + '.itemsPerPage"></ul>' +
                        '<div class="clearfix"></div>'
                    );
                    /*jslint white: false */

                    return function (scope, el) {
                        scope.$watch('paginationDisabled', function (newValue) {
                            var paginationDummyEl,
                                paginationEl;

                            // Since we don't have complete control over the Angular Bootstrap UI pagination directive,
                            // we can't disable it directly.  Instead just clone the pagination element, disable it
                            // and show it while hiding the original element when pagination is disabled.
                            if (angular.isDefined(newValue)) {
                                paginationEl = el.find('.pagination');

                                if (newValue) {
                                    paginationDummyEl = paginationEl
                                        .clone()
                                        .addClass('bb-pagination-dummy');

                                    paginationEl
                                        .before(paginationDummyEl)
                                        .hide();

                                    paginationDummyEl.find('li').addClass('disabled');
                                } else {
                                    el.find('.bb-pagination-dummy').remove();
                                    paginationEl.show();
                                }
                            }
                        });
                    };
                }
            };
        })
        .directive('bbPaginationContent', ['$timeout', '$window', '$animate', function ($timeout, $window, $animate) {
            return {
                link: function (scope, el) {
                    var evtNs;

                    evtNsPos += 1;

                    evtNs = "bbPaginationContent" + evtNsPos;

                    function removeWindowResizeHandler() {
                        angular.element($window).off('.' + evtNs);
                    }

                    scope.$watch('pagedData', function () {
                        var pageCount,
                            pagedData,
                            tries = 0,
                            windowResizeTimeout;

                        // Try for 1 second to set a min-height on paged data so the paging bar doesn't jump
                        // up when the user hits a page with less than the max number of items.
                        function trySetMinHeight() {
                            $timeout(function () {
                                var currentPage,
                                    height = el.height(),
                                    i,
                                    maxHeight = 0;

                                function changePage(pageNumber) {
                                    /* Disable animation for the page change
                                       to prevent issues with ng-repeat
                                       that impact min-height measurements */
                                    $animate.enabled(false, el);
                                    pagedData.currentPage = pageNumber;

                                    pagedData.pageChanged();
                                    scope.$apply();
                                    $animate.enabled(true, el);

                                }

                                if (height === 0 && tries < 5) {
                                    tries += 1;
                                    trySetMinHeight();
                                    return;
                                }

                                el.addClass('bb-pagination-content bb-pagination-content-calculating');

                                // Cache the current page so we can put it back.
                                currentPage = pagedData.currentPage;

                                // Reset the min height from any previous iteration.
                                el.css('min-height', 0);

                                // Navigate through each page and find the tallest page.
                                for (i = 1; i <= pageCount; i += 1) {
                                    changePage(i);
                                    maxHeight = Math.max(el.height(), maxHeight);
                                }

                                // Set the min height to the height of the tallest page.
                                el.css('min-height', maxHeight);

                                // Navigate back to the initial page.
                                changePage(currentPage);

                                el.removeClass('bb-pagination-content-calculating');
                            }, 200);
                        }

                        pagedData = scope.pagedData;

                        if (angular.isDefined(scope.pagedData)) {
                            pageCount = Math.ceil(pagedData.totalItems / (pagedData.itemsPerPage || 1));

                            if (pageCount > 1) {
                                trySetMinHeight();

                                removeWindowResizeHandler();

                                angular.element($window).on('resize.' + evtNs, function () {
                                    if (windowResizeTimeout) {
                                        $timeout.cancel(windowResizeTimeout);
                                    }

                                    windowResizeTimeout = $timeout(trySetMinHeight, 500);
                                });

                                el.on('$destroy', removeWindowResizeHandler);
                            }
                        }
                    });
                },
                scope: {
                    pagedData: '=bbPaginationContent'
                }
            };
        }]);
}());

/* global angular */
(function () {
    'use strict';

    function getPaginationLabelDirective(labelText) {
        function link($scope, el) {
            el.find('a').attr('aria-label', labelText);
        }
        return {
            restrict: 'C',
            link: link
        };
    }

    function paginationPrev(bbResources) {
        return getPaginationLabelDirective(bbResources.pagination_previous);
    }

    paginationPrev.$inject = ['bbResources'];

    function paginationNext(bbResources) {
        return getPaginationLabelDirective(bbResources.pagination_next);
    }

    paginationNext.$inject = ['bbResources'];

    angular.module('sky.pagination.label', ['ui.bootstrap.pagination', 'sky.resources'])
        .directive('paginationPrev', paginationPrev)
        .directive('paginationNext', paginationNext);
})();
/*global angular */
(function () {
    'use strict';
    function uibPagination(uibPaginationConfig, $log) {
        return {
            scope: {
                totalItems: '=',
                firstText: '@',
                previousText: '@',
                nextText: '@',
                lastText: '@',
                ngDisabled: '='
            },
            require: ['uibPagination', 'ngModel'],
            restrict: 'E',
            controller: 'UibPaginationController',
            controllerAs: 'pagination',
            replace: true,
            templateUrl: 'sky/templates/pagination/uib.pagination.directive.html',
            link: function (scope, element, attrs, ctrls) {
                var paginationCtrl = ctrls[0], ngModelCtrl = ctrls[1];
                $log.warn('uibPagination should not be used as an element directive, instead use as an attribute directive on a ul element');
                paginationCtrl.init(ngModelCtrl, uibPaginationConfig);
            }
        };
    }

    uibPagination.$inject = ['uibPaginationConfig', '$log'];

    angular.module('sky.pagination.uibpagination', [
            'ui.bootstrap.pagination'
            ])
        .directive('uibPagination', uibPagination);
})();

/*jshint unused: false */
/*global angular, bbPaletteConfig */

(function () {
'use strict';

var bbPaletteConfig;

/* LINES BELOW ARE AUTO GENERATED */
bbPaletteConfig = {
    "multi": [
        "#0091c2",
        "#fbb94c",
        "#7cc452",
        "#ae9abc",
        "#00d1aa",
        "#f1575a",
        "#91959c",
        "#4cd2ff",
        "#fdd189",
        "#b5de9d",
        "#cfc3d7",
        "#55ffdf",
        "#f69093",
        "#b0b2b7"
    ],
    "mono": [
        "#005d7d",
        "#007ca6",
        "#00bcfc",
        "#53d3ff",
        "#a9e9ff"
    ]
};

angular.module('sky.palette.config', [])
    .constant('bbPaletteConfig', bbPaletteConfig);

}());

/*global angular */

(function () {
    'use strict';

    angular.module('sky.palette', ['sky.palette.config'])
        .factory('bbPalette', ['bbPaletteConfig', function (bbPaletteConfig) {

            function getPaletteByType(paletteType) {
                return bbPaletteConfig[paletteType || 'multi'];
            }

            return {
                getColorByIndex: function (index, paletteType) {
                    var palette = getPaletteByType(paletteType);
                    return palette[index % palette.length];
                },
                getColorSequence: function (requestedLength, paletteType) {

                    var i,
                        palette = getPaletteByType(paletteType),
                        paletteLength,
                        r = [];

                    paletteLength = palette.length;
                    requestedLength = requestedLength || paletteLength;

                    for (i = 0; i < requestedLength; i++) {
                        r.push(palette[i % paletteLength]);
                    }

                    return r;
                }
            };
        }]);
}());

/*global angular */
(function () {
    'use strict';

    var bbPhoneFieldConfig = {
        countryIso2: 'us'
    };

    angular.module('sky.phonefield.config', [])
        .constant('bbPhoneFieldConfig', bbPhoneFieldConfig);
}());

/* global angular, intlTelInputUtils*/
(function () {
    'use strict';

    /**
    * bbPhoneField directive controller for bb-phone-field
    */
    function bbPhoneField(bbPhoneFieldConfig, $timeout) {
        function link($scope, el, attrs, ctrls) {
            // ** variables **
            var input = el,
                phoneField = ctrls[0],
                ngModel = ctrls[1];

            /**
            * getFormattedNumber returns the national or internationally formatted phone number in the input
            * based on the currently selected country and the default country
            */
            function getFormattedNumber() {
                var formattedNumber = '',
                    selectedCountryData = input.intlTelInput('getSelectedCountryData');

                // Grab the plugin's version of the formatted phone number
                if (input.val()) {
                    formattedNumber = input.intlTelInput('getNumber', intlTelInputUtils.numberFormat.NATIONAL);
                    // If the currently selected country is also the directive's default country, it is already formatted
                    /* istanbul ignore else */
                    /* sanity check */
                    if (selectedCountryData.iso2 && phoneField.props.countryIso2.toLowerCase() === selectedCountryData.iso2.toLowerCase()) {
                        return formattedNumber;
                    } else if (selectedCountryData && formattedNumber.indexOf('+') < 0) {
                        // Any country with a dial code that starts with 1
                        // is so small that its dial code matches its area code.
                        // So, its dial code should just be 1 because the area code includes the dial code.
                        // Example countries: Bahamas, Cayman Islands, Barbados.
                        if (selectedCountryData.dialCode.toString()[0] === '1') {
                            selectedCountryData.dialCode = 1;
                        }

                        return '+' + selectedCountryData.dialCode + ' ' + formattedNumber;
                    }
                }

                return formattedNumber;
            }

            // ** ng-model settings **
            // anytime ng-model is updated, its final value should be the formatted phone number
            ngModel.$parsers.unshift(function () {
                return getFormattedNumber();
            });
            ngModel.$formatters.unshift(function (value) {
                var formattedNumber;
                if (value) {
                    input.intlTelInput('setNumber', value);
                    formattedNumber = getFormattedNumber();
                    if (input.intlTelInput('isValidNumber')) {
                        ngModel.$setViewValue(formattedNumber);
                    }
                    input.val(formattedNumber);
                }
                return formattedNumber;
            });
            // tie ng-model's format validation to the plugin's validator
            ngModel.$validators.bbPhoneFormat = function (modelValue) {
                return ngModel.$pristine || !modelValue || (modelValue && input.intlTelInput('isValidNumber'));
            };

            // ** bbPhoneFieldConfig properties **
            // if a default country as countryIso2 is not provided, we set it to bbPhoneFieldConfig's countryIso2
            if (!phoneField.props.countryIso2) {
                phoneField.props.countryIso2 = bbPhoneFieldConfig.countryIso2;
            }

            // ** intl-tel-input initilization **
            // initialize the intl-tel-input plugin.
            // nationalMode is true by default, which we want for easy formatting purposes.
            // preferredCountries (the countries shown at the top of the dropdown) should match the scope's default country
            input.intlTelInput({preferredCountries: [phoneField.props.countryIso2]});
            // when the country changes, update the scope's bbPhoneFieldConfig property
            input.on('countrychange', function (e, countryData) {
                ngModel.$setViewValue(getFormattedNumber());
                $timeout(function () {
                        phoneField.props.selectedCountry = countryData;
                    });
            });
            // set the input's selected country to the scope country
            input.intlTelInput('setCountry', phoneField.props.countryIso2);
            // set the scope's selected country data to the input's selected country data
            phoneField.props.selectedCountry = input.intlTelInput('getSelectedCountryData');

            // ** ARIA (Accessibility Rich Internet Applications) **
            // We hide the country dropdown from a screen reader because the "dropdown"
            // is actually an unordered list which is not easily accessed without clicking or arrowing accordingly
            angular.element('.selected-flag').attr('aria-hidden', true);
            // If the screen-reader user does manage to get the dropdown going, we apply the ARIA tags so that they can header the countries
            angular.element('.country-list').attr('role', 'listbox');
            angular.element('.country').attr('role', 'option');
        }

        return {
            bindToController: {
                props: '=bbPhoneField'
            },
            controller: bbPhoneField,
            controllerAs: "bbPhoneField",
            link: link,
            require: ['bbPhoneField', 'ngModel'],
            restrict: 'A'
        };
    }

    bbPhoneField.$inject = ['bbPhoneFieldConfig', '$timeout'];

    angular.module('sky.phonefield.directive', ['sky.phonefield.config'])
        .directive('bbPhoneField', bbPhoneField);
}());

/*global angular */

(function () {
    'use strict';

    function bbPopoverTemplate($compile) {
        return {
            restrict: 'A',
            scope: true,
            link: function ($scope, el) {

                var bbPopoverOpenAttr = 'bbPopoverOpen' + $scope.$id;

                //prevent breaking change by adding quotes around template url and
                //passing to new directive
                /*istanbul ignore else */
                if (!el.attr('bb-uib-popover-template')) {
                    el.attr('bb-uib-popover-template', "'" + el.attr('bb-popover-template') + "'");
                }

                if (!el.attr('popover-is-open')) {
                    el.attr('popover-is-open', bbPopoverOpenAttr);
                }

                $scope.bbPopoverAttr = el.attr('popover-is-open');

                el.removeAttr('bb-popover-template');
                $compile(el)($scope);
            }
        };
    }

    bbPopoverTemplate.$inject = ['$compile'];

    function bbUibPopoverTemplate($uibTooltip) {
        var tooltip = $uibTooltip('bbUibPopoverTemplate', 'popover', 'outsideClick', {
            useContentExp: true
        });

        return tooltip;
    }

    bbUibPopoverTemplate.$inject = ['$uibTooltip'];

    function bbUibPopoverTemplatePopup($parse) {
        return {
            restrict: 'A',
            scope: { uibTitle: '@', contentExp: '&', originScope: '&' },
            link: function ($scope) {

                var origScope = $scope.originScope(),
                    popoverIsOpenAttr;

                popoverIsOpenAttr = origScope.bbPopoverAttr;
                origScope.hide = function () {
                    /* Set the popover is open attribute this way to account for
                       both variables directly on scope as well as using 'controller
                       as'
                    */
                    /* istanbul ignore else */
                    /* sanity check */
                    if (angular.isDefined(origScope.$eval(popoverIsOpenAttr))) {
                        $parse(popoverIsOpenAttr).assign(origScope, false);
                    }

                };
            },
            templateUrl: 'sky/templates/popover/popup.html'
        };
    }

    bbUibPopoverTemplatePopup.$inject = ['$parse'];

    angular.module('sky.popover', ['ui.bootstrap.tooltip'])
        .directive('bbUibPopoverTemplatePopup', bbUibPopoverTemplatePopup)
        .directive('bbUibPopoverTemplate', bbUibPopoverTemplate)
        .directive('bbPopoverTemplate', bbPopoverTemplate);
}());

/*global angular, jQuery */

(function ($) {
    'use strict';
    
    var bbReorder;

    function Controller($element, $filter, $scope, $timeout) {
        var bbAutonumericConfig,
            containerEl = $element.find('.bb-reorder-container'),
            currentRepeaterItems, // the set of items from ng-repeat before sorting starts
            currentSortItemIndex, // the index where the sorting item is currently being placed
            finalIndex = -1, // the final index of the element being sorting after sorting has ended
            originalSortItemIndex, // the original index of th item being sorted before sorting starts
            sortableOptions, // jQuery sortable widget options
            vm = this;
        
        function applyNumberFormatting(index) {
            return $filter('bbAutonumeric')(index, bbAutonumericConfig);
        }

        function setPositionNumberText(item, index) {
            $(item).find('.bb-reorder-list-sorting-number').text(applyNumberFormatting(index));
        }

        function setPositionNumbers(incrementStep, siblingTraversalFunc, displayIndex, placeholder, item) {
            var curSibling;

            // set the position number of the item being sorted to account for how the user moved it
            setPositionNumberText(item, displayIndex);

            curSibling = siblingTraversalFunc.call(placeholder).not(item);
            while (curSibling.length > 0) {
                displayIndex = displayIndex + incrementStep;
                setPositionNumberText(curSibling, displayIndex);
                curSibling = siblingTraversalFunc.call(curSibling).not(item);
            }
        }

        bbAutonumericConfig = {
            mDec: 0 // no decimals
        };

        vm.sorting = false;

        // sends an item to the top of the list with a rising animation
        vm.pushToTop = function (item) {
            var animateCloneEl,
                index,
                toTheTopEl,
                toTheTopElOffset;

            index = vm.bbReorderItems.indexOf(item);

            containerEl.sortable("disable"); // don't allow sorting during animation

            toTheTopEl = $(containerEl.children()[index]);
            toTheTopElOffset = toTheTopEl.position();

            // create a clone of the element being moved to the top so we can animate it without messing with the ng-repeat
            animateCloneEl = toTheTopEl.clone();
            animateCloneEl.addClass('bb-reorder-animate-element');
            animateCloneEl.css({top: toTheTopElOffset.top + "px", left: toTheTopElOffset.left + "px", width: toTheTopEl.outerWidth() + "px"});

            containerEl.append(animateCloneEl);

            toTheTopEl.addClass('bb-reorder-list-row-placeholder');

            // animate that we are moving the item to the top of the list
            $(animateCloneEl).fadeOut(
                {
                    duration: 500, 
                    queue: false, 
                    always: function () {
                        toTheTopEl.removeClass('bb-reorder-list-row-placeholder');

                        animateCloneEl.remove();
                        containerEl.sortable("enable");

                        $scope.$apply(function () {
                            // perform the swap moving the item to the top of the list
                            vm.bbReorderItems.splice(
                                0, 0,
                                vm.bbReorderItems.splice(index, 1)[0]);
                        });
                    }
                }
            );
        };

        //Setup jQuery sortable options for the items being sorted
        sortableOptions = {
            placeholder: 'bb-reorder-list-row-placeholder', // class to put on placeholder element
            axis: 'y', // constrain movement to the Y axis,
            handle: '.bb-reorder-list-col-icon',
            start: function (e, ui) {
                $scope.$apply(function () {
                    vm.sorting = true;
                });

                // need to keep track of the how the items were placed in the DOM since
                // the sortable is going to mess them up which breaks ng-repeat
                currentRepeaterItems = containerEl.contents().not(ui.placeholder);

                ui.item.addClass('bb-reorder-list-sorting-item');

                originalSortItemIndex = ui.item.index();
                currentSortItemIndex = originalSortItemIndex;

                // need to set the height of the placeholder since we need to account for the padding on the row items
                ui.placeholder.height(ui.item.outerHeight());

                // set the current index of all rows for display purposes
                $.each(containerEl.children('.bb-reorder-list-row'), function (i, item) {
                    setPositionNumberText(item, i + 1);
                });
            },
            stop: function (e, ui) {
                // replace the repeater elements and comments so ng-repeat does not break
                currentRepeaterItems.appendTo(containerEl);

                ui.item.removeClass('bb-reorder-list-sorting-item');

                if (finalIndex >= 0 && finalIndex !== originalSortItemIndex) {
                    $scope.$apply(function () {
                        // perform the swap that the user just performed
                        vm.bbReorderItems.splice(
                            finalIndex, 0,
                            vm.bbReorderItems.splice(originalSortItemIndex, 1)[0]);
                    });
                }

                $scope.$apply(function () {
                    vm.sorting = false;
                });

                originalSortItemIndex = null;
                currentSortItemIndex = null;
                finalIndex = -1;
                currentRepeaterItems = null;

                // once the ng-repeat has finished rendering the move, re-enable animations
                $timeout(function () {
                    containerEl.children().removeClass('bb-reorder-list-no-animate');
                });
            },
            update: function (e, ui) {
                // grab the final index of the item being sorted before we cancel
                // the sort and its position gets reset.
                finalIndex = ui.item.index();

                // don't animate the move when sorting
                containerEl.children().addClass('bb-reorder-list-no-animate');

                // stop the sortable from moving the element as we want the ng-repeat directive to do the actual reorder
                containerEl.sortable('cancel');
            },
            change: function (e, ui) {
                var displayIndex,
                    newIndex;

                // Since the element being sorted is positioned absolute it remains in the
                // same position so we can't use its index. Instead use the placeholder since
                // that will be in the right position in the list.
                newIndex = ui.item.siblings().index(ui.placeholder);

                if (newIndex === currentSortItemIndex) {
                    return;
                }

                // the display position shown to the user should start at 1, not 0
                displayIndex = newIndex + 1;

                // when we are sorting, change the position numbers on the rows
                if (newIndex > currentSortItemIndex) {
                    // set the text of all previous siblings to account for change
                    setPositionNumbers(-1, $.fn.prev, displayIndex, ui.placeholder, ui.item);
                } else {
                    // set the text of all next siblings to account for change
                    setPositionNumbers(1, $.fn.next, displayIndex, ui.placeholder, ui.item);
                }

                currentSortItemIndex = newIndex;
            }
        };

        containerEl.sortable(sortableOptions);
    }

    Controller.$inject = ['$element', '$filter', '$scope', '$timeout'];
        
    bbReorder = {
        bindings: {
            bbReorderItems: '='
        },
        controller: Controller,
        templateUrl: 'sky/templates/reorder/reorder.component.html'
    };

    angular.module('sky.reorder.component', ['sky.resources', 'sky.autonumeric', 'ngAnimate'])
        .component('bbReorder', bbReorder);
}(jQuery));

/*global angular, jQuery */

(function ($) {
    'use strict';

    var bbReorderTable;

    function Controller($element, $filter, $scope, $timeout, $compile, $templateCache, $controller) {
        var bbAutonumericConfig,
            cellScopes = {},
            compiledTemplates = {}, // compiled cell templates
            containerEl = $element.find('.bb-reorder-table-body-container'),
            currentRepeaterItems, // the set of items from ng-repeat before sorting starts
            currentSortItemIndex, // the index where the sorting item is currently being placed
            finalIndex = -1, // the final index of the element being sorting after sorting has ended
            originalSortItemIndex, // the original index of th item being sorted before sorting starts
            sortableOptions, // jQuery sortable widget options
            vm = this;

        function applyNumberFormatting(index) {
            return $filter('bbAutonumeric')(index, bbAutonumericConfig);
        }

        function setPositionNumberText(item, index) {
            $(item).find('.bb-reorder-table-sorting-number').text(applyNumberFormatting(index));
        }

        function setPositionNumbers(incrementStep, siblingTraversalFunc, displayIndex, placeholder, item) {
            var curSibling;

            // set the position number of the item being sorted to account for how the user moved it
            setPositionNumberText(item, displayIndex);

            curSibling = siblingTraversalFunc.call(placeholder).not(item);
            while (curSibling.length > 0) {
                displayIndex = displayIndex + incrementStep;
                setPositionNumberText(curSibling, displayIndex);
                curSibling = siblingTraversalFunc.call(curSibling).not(item);
            }
        }

        function reinitTable(vm) {
            vm.options = vm.options || {};
            vm.sortable = !vm.unsortable && vm.options.data && vm.options.data.length > 1 && vm.options.fixed < vm.options.data.length;
            vm.options.fixed = vm.options.fixed || 0;

            if (vm.options.getContextMenuItems) {
                vm.contextMenuItems = {};
                angular.forEach(vm.options.data, function (item, i) {
                    if (!vm.unsortable) {
                        item[vm.options.index] = vm.options.oneIndexed ? i + 1 : i;
                    }
                    vm.contextMenuItems[item[vm.options.index]] = vm.options.getContextMenuItems(item);
                });
            } else {
                if (!vm.unsortable) {
                    angular.forEach(vm.options.data, function (item, i) {
                        item[vm.options.index] = vm.options.oneIndexed ? i + 1 : i;
                    });
                }
            }

            angular.forEach(vm.options.columns, function (col) {

                col.show = col.show === false ? false : true;

                if (col.template_url && !compiledTemplates[col.name]) {
                    compiledTemplates[col.name] = $compile($templateCache.get(col.template_url));
                }

            });
        }

        function isFixed(index) {
            return index < vm.options.fixed;
        }

        function setFixed(index) {
            return isFixed(index) ? 'bb-reorder-table-row-fixed' : 'bb-reorder-table-row';
        }

        // sends an item to the top of the list with a rising animation
        function pushToTop(item) {
            var toTheTopEl,
                index,
                toTheTopElOffset,
                animateCloneEl,
                topIndex;

            index = vm.options.data.indexOf(item);

            if (vm.sortable && index > vm.options.fixed) {

                topIndex = vm.options.fixed;

                containerEl.sortable("disable"); // don't allow sorting during animation

                toTheTopEl = $(containerEl.children()[index]);
                toTheTopElOffset = toTheTopEl.position();

                // create a clone of the element being moved to the top so we can animate it without messing with the ng-repeat
                animateCloneEl = toTheTopEl.clone();
                animateCloneEl.addClass('bb-reorder-table-animate-element');
                animateCloneEl.css({ top: toTheTopElOffset.top + "px", left: toTheTopElOffset.left + "px", width: toTheTopEl.outerWidth() + "px" });

                containerEl.append(animateCloneEl);

                toTheTopEl.addClass('bb-reorder-table-row-placeholder');

                // animate that we are moving the item to the top of the list
                $(animateCloneEl).fadeOut({
                    duration: 500, queue: false, always: function () {
                        toTheTopEl.removeClass('bb-reorder-table-row-placeholder');

                        animateCloneEl.remove();
                        containerEl.sortable("enable");

                        $scope.$apply(function () {
                            // perform the swap moving the item to the top of the list
                            vm.options.data.splice(
                                topIndex, 0,
                                vm.options.data.splice(index, 1)[0]);
                        });
                    }
                });
            }
        }

        function cellLink(row, index, column) {
            var cell,
                itemScope,
                rowElem,
                templateFunction;

            rowElem = $element.find('#bb-reorder-table-' + vm.tableId + '-cell-' + index + '-' + column.name);
            cell = rowElem.children();

            itemScope = $scope.$new(true);
            itemScope.data = row[column.jsonmap];
            itemScope.rowData = row;
            itemScope.resources = vm.options.resources;

            if (column.controller) {
                $controller(column.controller, {
                    $scope: itemScope
                });
            }

            templateFunction = compiledTemplates[column.name];

            cellScopes[itemScope.$id] = itemScope;

            templateFunction(itemScope, function (cloned) {
                cell.append(cloned);
            });

            // Destroys the itemScope and removes it from the
            // scopes when the cell is removed from the page
            cell.on('$destroy', function () {
                itemScope.$destroy();
                cellScopes[itemScope.$id] = null;
                delete cellScopes[itemScope.$id];
            });
            
        }

        bbAutonumericConfig = {
            mDec: 0 // no decimals
        };

        vm.sorting = false;
        vm.tableId = $scope.$id;

        vm.isFixed = isFixed;
        vm.setFixed = setFixed;
        vm.pushToTop = pushToTop;
        vm.cellLink = cellLink;

        //Setup jQuery sortable options for the items being sorted
        sortableOptions = {
            placeholder: 'bb-reorder-table-row-placeholder', // class to put on placeholder element
            axis: 'y', // constrain movement to the Y axis,
            handle: '.bb-reorder-table-col-icon',
            start: function (e, ui) {
                $scope.$apply(function () {
                    vm.sorting = true;
                });

                // need to keep track of the how the items were placed in the DOM since
                // the sortable is going to mess them up which breaks ng-repeat
                currentRepeaterItems = containerEl.contents().not(ui.placeholder);

                ui.item.addClass('bb-reorder-table-sorting-item');

                originalSortItemIndex = ui.item.index();
                currentSortItemIndex = originalSortItemIndex;

                // need to set the height of the placeholder since we need to account for the padding on the row items
                ui.placeholder.height(ui.item.outerHeight());

                // set the current index of all rows for display purposes
                $.each(containerEl.children('.bb-reorder-table-row, .bb-reorder-table-row-fixed'), function (i, item) {
                    setPositionNumberText(item, i + 1);
                });
            },
            stop: function (e, ui) {
                // replace the repeater elements and comments so ng-repeat does not break
                currentRepeaterItems.appendTo(containerEl);

                ui.item.removeClass('bb-reorder-table-sorting-item');

                if (finalIndex >= 0 && finalIndex !== originalSortItemIndex) {
                    $scope.$apply(function () {
                        // perform the swap that the user just performed
                        vm.options.data.splice(
                            finalIndex, 0,
                            vm.options.data.splice(originalSortItemIndex, 1)[0]);
                    });
                }

                $scope.$apply(function () {
                    vm.sorting = false;
                });

                originalSortItemIndex = null;
                currentSortItemIndex = null;
                finalIndex = -1;
                currentRepeaterItems = null;

                // once the ng-repeat has finished rendering the move, re-enable animations
                $timeout(function () {
                    containerEl.children().removeClass('bb-reorder-table-no-animate');
                });

                $scope.$emit("tableReordered");
            },
            update: function (e, ui) {
                // grab the final index of the item being sorted before we cancel
                // the sort and its position gets reset.
                finalIndex = ui.item.index();

                // don't animate the move when sorting
                containerEl.children().addClass('bb-reorder-table-no-animate');

                // stop the sortable from moving the element as we want the ng-repeat directive to do the actual reorder
                containerEl.sortable('cancel');
            },
            change: function (e, ui) {
                var displayIndex,
                    newIndex;

                // Since the element being sorted is positioned absolute it remains in the
                // same position so we can't use its index. Instead use the placeholder since
                // that will be in the right position in the list.
                newIndex = ui.item.siblings().index(ui.placeholder);

                if (newIndex === currentSortItemIndex) {
                    return;
                }

                // the display position shown to the user should start at 1, not 0
                displayIndex = newIndex + 1;

                // when we are sorting, change the position numbers on the rows
                if (newIndex > currentSortItemIndex) {
                    // set the text of all previous siblings to account for change
                    setPositionNumbers(-1, $.fn.prev, displayIndex, ui.placeholder, ui.item);
                } else {
                    // set the text of all next siblings to account for change
                    setPositionNumbers(1, $.fn.next, displayIndex, ui.placeholder, ui.item);
                }

                currentSortItemIndex = newIndex;
            },
            items: ">.bb-reorder-table-row"
        };

        containerEl.sortable(sortableOptions);

        $scope.$watchCollection('$ctrl.options.data', function () {
            reinitTable(vm);
        });

        $scope.$watch('$ctrl.unsortable', function () {
            vm.sortable = !vm.unsortable && vm.options.data && vm.options.data.length > 1 && vm.options.fixed < vm.options.data.length;
        });
    }

    bbReorderTable = {
        bindings: {
            options: '=bbReorderTableOptions',
            unsortable: '=bbReorderTableUnsortable'
        },
        controller: Controller,
        templateUrl: 'sky/templates/reordertable/reordertable.component.html'
    };

    Controller.$inject = ['$element', '$filter', '$scope', '$timeout', '$compile', '$templateCache', '$controller'];

    angular.module('sky.reordertable.component', ['sky.resources', 'sky.autonumeric', 'ngAnimate'])
        .component('bbReorderTable', bbReorderTable);
}(jQuery));
/*global angular */

(function () {
    'use strict';
    
    angular.module('sky.repeater.component', ['sky.repeater.controller'])
        .component('bbRepeater', {
            bindings: {
                bbRepeaterExpandMode: '@?'
            },
            controller: 'BBRepeaterController',
            templateUrl: 'sky/templates/repeater/repeater.component.html',
            transclude: true
        });
})();

/*global angular */

(function () {
    'use strict';

    function BBRepeaterController($scope) {
        var items = [],
            vm = this;

        function expandModeIsMultiple() {
            return vm.bbRepeaterExpandMode === 'multiple';
        }

        function expandModeIsSingle() {
            return vm.bbRepeaterExpandMode === 'single';
        }

        function expandModeIsNone() {
            return !expandModeIsMultiple() && !expandModeIsSingle();
        }

        function updateForExpandMode() {
            var foundExpanded,
                isCollapsible = !expandModeIsNone(),
                isSingle = expandModeIsSingle();

            items.forEach(function (item) {
                item.isCollapsible = isCollapsible;

                if (isSingle && item.bbRepeaterItemExpanded) {
                    if (foundExpanded) {
                        item.bbRepeaterItemExpanded = false;
                    }

                    foundExpanded = true;
                }
            });
        }

        function onInit() {
            vm.addItem = function (item) {
                items.push(item);
            };

            vm.removeItem = function (item) {
                var itemIndex = items.indexOf(item);

                /*istanbul ignore else */
                /* sanity check */
                if (itemIndex >= 0) {
                    items.splice(itemIndex, 1);
                }
            };

            vm.itemExpanded = function (expandedItem) {
                if (vm.bbRepeaterExpandMode === 'single') {
                    items.forEach(function (item) {
                        if (item !== expandedItem) {
                            item.bbRepeaterItemExpanded = false;
                        }
                    });
                }
            };

            $scope.$watch(function () {
                return vm.bbRepeaterExpandMode;
            }, updateForExpandMode);

            $scope.$watchCollection(function () {
                return items;
            }, function () {
                updateForExpandMode();
            });
        }

        vm.$onInit = onInit;
       
    }

    BBRepeaterController.$inject = ['$scope'];

    angular.module('sky.repeater.controller', [])
        .controller('BBRepeaterController', BBRepeaterController);
}());

/*global angular */

(function () {
    'use strict';

    angular.module('sky.repeater.item.contextmenu.component', [])
        .component('bbRepeaterItemContextMenu', {
            templateUrl: 'sky/templates/repeater/repeater.item.contextmenu.component.html',
            transclude: true
        });
})();
/*global angular */

(function () {
    'use strict';

    function bbRepeaterItem($timeout) {
        function BBRepeaterItemController() {
            var vm = this;

            function allowCollapse() {
                return vm.isCollapsible && vm.titleElExists();
            }

            function selectItem() {
                vm.bbRepeaterItemSelected = !vm.bbRepeaterItemSelected;
                vm.repeaterItemSelectionToggled(vm.bbRepeaterItemSelected); 
            }

            function onInit() {
                vm.getCls = function () {
                    var cls = [];

                    if (allowCollapse()) {
                        cls.push('bb-repeater-item-collapsible');
                    }

                    if (vm.contextMenuElExists()) {
                        cls.push('bb-repeater-item-with-context-menu');
                    }

                    if (vm.itemIsSelectable()) {
                        cls.push('bb-repeater-item-selectable');

                        if (vm.bbRepeaterItemSelected) {
                            cls.push('bb-repeater-item-selected');
                        }
                    }

                    return cls;
                };

                vm.selectItem = selectItem;

                vm.headerClick = function ($event) {
                    if (vm.isCollapsible) {
                        vm.bbRepeaterItemExpanded = !vm.bbRepeaterItemExpanded;
                        $event.stopPropagation();
                    } 
                };

                vm.allowCollapse = allowCollapse;
            }

            vm.$onInit = onInit;
            
        }

        function link(scope, el, attrs, ctrls) {
            var animateEnabled,
                bbRepeater = ctrls[1],
                vm = ctrls[0];

            vm.listbuilderRepeaterItemCtrl = ctrls[2];


            function titleElExists() {
                return vm.titleEl[0] && vm.titleEl[0].children.length > 0;
            }

            function contextMenuElExists() {
                return vm.contextMenuEl[0] && vm.contextMenuEl[0].children.length > 0;
            }

            function getContentEl() {
                return el.find('.bb-repeater-item-content');
            }

            function updateForExpandedState() {
                var animate = animateEnabled,
                    contentEl = getContentEl(),
                    method;

                if (!angular.isDefined(vm.bbRepeaterItemExpanded)) {
                    vm.bbRepeaterItemExpanded = false;
                    animate = false;
                }

                if (vm.bbRepeaterItemExpanded || !vm.allowCollapse()) {
                    method = 'slideDown';
                } else {
                    method = 'slideUp';
                }

                contentEl[method]({
                    duration: animate ? 250 : 0
                });

                if (vm.bbRepeaterItemExpanded) {
                    vm.bbRepeater.itemExpanded(vm);
                }
            }

            function syncChevronWithExpanded() {
                vm.chevronDirection = vm.bbRepeaterItemExpanded ? 'up' : 'down';
            }

            vm.titleEl = el.find('.bb-repeater-item-title-container');
            vm.contextMenuEl = el.find('.bb-repeater-item-context-menu-container');

            vm.titleElExists = titleElExists;
            vm.contextMenuElExists = contextMenuElExists;

            vm.bbRepeater = bbRepeater;
            syncChevronWithExpanded();

            scope.$watch(
                titleElExists,
                updateForExpandedState
            );

            function getTitleTextContent() {
                return vm.titleEl.text();
            }

            if (vm.bbRepeaterItemInputLabel === null || angular.isUndefined(vm.bbRepeaterItemInputLabel)) {
                scope.$watch(getTitleTextContent, function (newValue) {
                    vm.bbRepeaterItemInputLabel = newValue;
                });
            }

            scope.$watch(function () {
                return vm.isCollapsible;
            }, function (newValue) {
                if (newValue === false) {
                    vm.bbRepeaterItemExpanded = true;
                }
            });

            scope.$watch(
                function () {
                    return vm.bbRepeaterItemExpanded;
                },
                function () {
                    syncChevronWithExpanded();
                    updateForExpandedState();
                }
            );

            scope.$watch(function () {
                return vm.chevronDirection;
            }, function () {
                if (vm.isCollapsible) {
                    vm.bbRepeaterItemExpanded = vm.chevronDirection !== 'down';
                }
            });

             
            bbRepeater.addItem(vm);

            scope.$on('$destroy', function () {
                bbRepeater.removeItem(vm);
                vm = null;
            });

            function itemIsSelectable() {
                return vm.bbRepeaterItemSelectable === 'true';
            }

            vm.itemIsSelectable = itemIsSelectable;

            function repeaterItemSelectionToggled(isSelected) {
                $timeout(function () {
                    if (angular.isFunction(vm.bbRepeaterItemSelectionToggled)) {
                        vm.bbRepeaterItemSelectionToggled({isSelected: isSelected});
                    }
                });
                
            }

            vm.repeaterItemSelectionToggled = repeaterItemSelectionToggled;

            $timeout(function () {
                // This will enable expand/collapse animation only after the initial load.
                animateEnabled = true;
            });

            scope.$emit('bbRepeaterItemInitialized', {
                repeaterItemCtrl: vm
            });
        }

        return {
            bindToController: {
                bbRepeaterItemExpanded: '=?',
                bbRepeaterItemSelectable: '@?',
                bbRepeaterItemSelected: '=?',
                bbRepeaterItemSelectionToggled: '&?',
                bbRepeaterItemInputLabel: '=?'
            },
            controller: BBRepeaterItemController,
            controllerAs: 'bbRepeaterItem',
            link: link,
            require: ['bbRepeaterItem', '^bbRepeater'],
            scope: {},
            templateUrl: 'sky/templates/repeater/repeater.item.directive.html',
            transclude: {
                bbRepeaterItemContextMenu: '?bbRepeaterItemContextMenu',
                bbRepeaterItemTitle: '?bbRepeaterItemTitle',
                bbRepeaterItemContent: '?bbRepeaterItemContent'
            }
        };
    }

    bbRepeaterItem.$inject = ['$timeout'];


    angular.module('sky.repeater.item.directive', [
            'sky.chevron', 
            'sky.check', 
            'sky.resources', 
            'sky.repeater.item.title.component',
            'sky.repeater.item.contextmenu.component'
            ])
        .directive('bbRepeaterItem', bbRepeaterItem);

})();

/*global angular */

(function () {
    'use strict';

    angular.module('sky.repeater.item.title.component', [])
        .component('bbRepeaterItemTitle', {
            templateUrl: 'sky/templates/repeater/repeater.item.title.component.html',
            transclude: true
        });
})();
/*global angular */

(function () {
    'use strict';

    var serviceModules = [];
    
    function bbResoucesFilter(bbResources) {
        return function (name) {
            return bbResources[name];
        };
    }
    
    bbResoucesFilter.$inject = ['bbResources'];

    angular.module('sky.resources', serviceModules)
        .constant('bbResources', {
            /* Strings are defined in separate JSON files located in js/sky/locales. */
        })
        .filter('bbResources', bbResoucesFilter);
}());
/*jshint browser: true */
/*global angular */

(function () {
    'use strict';

    var CLS_HIGHLIGHTING = 'bb-scroll-into-view-highlighting',
        RETRY_INTERVAL = 100,
        RETRY_MAX = 10;

    angular.module('sky.scrollintoview', [])
        .constant('bbScrollIntoViewConfig', {
            reservedBottom: 0,
            reservedTop: 0
        })
        .factory('bbScrollIntoView', ['$window', 'bbScrollIntoViewConfig', function ($window, bbScrollIntoViewConfig) {
            function highlightEl(el, options) {
                if (options.highlight) {

                    // The automatic CSS class removal should be factored out once we have some more instances
                    // where we use animations.
                    el
                        .addClass(CLS_HIGHLIGHTING)
                        .one(
                            'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
                            /*istanbul ignore next */
                            function () {
                                el.removeClass(CLS_HIGHLIGHTING);
                            }
                        );
                }
            }

            function getScrollableParentEl(el) {
                var overflowY,
                    parentEl = el.parent();

                while (parentEl.length > 0) {
                    if (parentEl.is('body')) {
                        return parentEl;
                    }

                    overflowY = parentEl.css('overflow-y');

                    /*istanbul ignore else */
                    /* sanity check (the computed overflow property will likely never return a non-string value) */
                    if (angular.isString(overflowY)) {
                        switch (overflowY.toUpperCase()) {
                        case 'AUTO':
                        case 'HIDDEN':
                        case 'SCROLL':
                            return parentEl;
                        }
                    }

                    parentEl = parentEl.parent();
                }
            }

            function getHtmlOrBodyScrollTop() {
                return angular.element('html').scrollTop() || angular.element('body').scrollTop();
            }

            function scrollIntoView(el, options) {
                var currentScrollTop,
                    elBottom,
                    elHeight,
                    elOffset,
                    elTop,
                    elToScroll,
                    isScrolledOffBottom,
                    isScrolledOffTop,
                    newScrollTop,
                    parentEl,
                    parentElIsBody,
                    parentHeight,
                    reservedBottom,
                    reservedTop,
                    viewportHeight;

                parentEl = getScrollableParentEl(el);
                parentElIsBody = parentEl.is('body');

                options = options || {};

                reservedBottom = options.reservedBottom;
                reservedTop = options.reservedTop;

                if (!angular.isDefined(reservedBottom)) {
                    reservedBottom = 0;

                    if (parentElIsBody) {
                        reservedBottom = bbScrollIntoViewConfig.reservedBottom || 0;
                    }
                }

                if (!angular.isDefined(reservedTop)) {
                    reservedTop = 0;

                    if (parentElIsBody) {
                        reservedTop = bbScrollIntoViewConfig.reservedTop || 0;
                    }
                }

                if (options.highlight) {
                    reservedBottom += 50;
                    reservedTop += 50;
                }

                if (parentElIsBody) {
                    currentScrollTop = getHtmlOrBodyScrollTop();
                } else {
                    currentScrollTop = parentEl.scrollTop();
                }

                elOffset = el.offset();
                elHeight = el.outerHeight();

                elTop = elOffset.top;

                if (!parentElIsBody) {
                    elTop = (elTop - parentEl.offset().top) + currentScrollTop;
                }

                elBottom = elTop + elHeight;

                parentHeight = parentElIsBody ? angular.element(window).height() : parentEl.height();

                isScrolledOffBottom = elBottom > parentHeight + (currentScrollTop - reservedBottom);
                isScrolledOffTop = elTop < (currentScrollTop + reservedTop);

                if (isScrolledOffBottom || isScrolledOffTop) {
                    if (isScrolledOffBottom) {
                        newScrollTop = elBottom - (parentHeight - reservedBottom);
                    }

                    viewportHeight = parentHeight - (reservedTop + reservedBottom);

                    // Ensure the top of the element is visible after scrolling even if it is currently
                    // scrolled off the bottom of the viewport.
                    if (!isScrolledOffBottom || elHeight > viewportHeight) {
                        newScrollTop = elTop - reservedTop;
                    }

                    elToScroll = parentElIsBody ? angular.element('html, body') : parentEl;

                    elToScroll.animate(
                        {
                            scrollTop: Math.round(newScrollTop)
                        },
                        {
                            duration: 250,
                            always: function () {
                                highlightEl(el, options);
                            }
                        }
                    );
                } else {
                    highlightEl(el, options);
                }
            }

            return scrollIntoView;
        }])
        .directive('bbScrollIntoView', ['$timeout', 'bbScrollIntoViewConfig', 'bbScrollIntoView', function ($timeout, bbScrollIntoViewConfig, bbScrollIntoView) {
            function link(scope, el, attrs) {
                var options,
                    previousTimeout,
                    retryCount;

                function doScroll(firstTry) {
                    if (previousTimeout) {
                        // Make sure any pending scrolling is canceled.
                        $timeout.cancel(previousTimeout);
                    }

                    if (firstTry) {
                        retryCount = 0;
                    }

                    /*istanbul ignore else*/
                    /* hard to reach in a unit test */
                    if (el.is(':visible') && el.children('.collapsing').length === 0) {
                        options = angular.extend({}, bbScrollIntoViewConfig);

                        if (attrs.bbScrollIntoViewHighlight) {
                            options.highlight = scope.$eval(attrs.bbScrollIntoViewHighlight);
                        }

                        bbScrollIntoView(el, options);
                    } else if (retryCount < RETRY_MAX) {
                        // Keep trying to scroll until the element is visible or we run out of retry attempts.
                        retryCount++;
                        previousTimeout = $timeout(doScroll, RETRY_INTERVAL);
                    }
                }

                /*istanbul ignore else */
                /* sanity check */
                if (attrs.bbScrollIntoView) {
                    scope.$watch(attrs.bbScrollIntoView, function (newValue, oldValue) {
                        if (newValue && newValue !== oldValue) {
                            doScroll(true);
                        }
                    });
                }
            }

            return {
                link: link,
                restrict: 'A'
            };
        }]);
}());

/* global angular */

(function () {
    'use strict';

    function linkFn($scope, el) {
        el.addClass('bb-search-input-component-container');
    }

    angular.module('sky.search.container.directive', [])
        .directive('bbSearchContainer', function () {
            return {
                restrict: 'A',
                link: linkFn
            };
        });
})();


/* global angular */
(function () {
    'use strict';


    function Controller($element, bbMediaBreakpoints, bbResources, $scope) {
        var ctrl = this,
            animationSpeed = 150,
            animationEase = 'linear';
            
        function applySearchText(searchText) {
            //select input
            var searchEl = $element.find('.bb-search-input');

            ctrl.showClear = searchText && searchText !== '';

            /*istanbul ignore else */
            /* sanity check */
            if (angular.isFunction(searchEl.select) && searchEl.length > 0 && searchText) {
                searchEl.eq(0).select();
            }

            //search callback
            ctrl.bbOnSearch({searchText: searchText});
        }

        function searchTextChanged(searchText) {
            if (angular.isFunction(ctrl.bbOnSearchTextChanged)) {
                ctrl.bbOnSearchTextChanged({searchText: searchText});
            }
        }

        function setInputFocus() {
            $element.find('input').focus();
        }

        function clearSearchText() {
            ctrl.bbSearchText = '';

            setInputFocus();

            ctrl.showClear = false;
            ctrl.bbOnSearch({searchText: ctrl.bbSearchText});

        }

        function mediaBreakpointCallback(breakpoint) {
            ctrl.currentBreakpoint = breakpoint;
            // Search input should be hidden if screen is xs
            if (breakpoint.xs) {
                dismissSearchInput();
            } else {
                openSearchInput();
            }
        }

        function findDismissEl() {
            return $element.find('.bb-search-btn-dismiss');
        }

        function findOpenEl() {
            return $element.find('.bb-search-open');
        }

        function findSearchAndDismissEl() {
            return $element.find('.bb-search-and-dismiss');
        }

        function findInputContainerEl() {
            return $element.find('.bb-search-input-container');
        }

        function findComponentContainerEl() {
            return $element.parents('.bb-search-input-component-container');
        }

        function getExpectedInputWidth() {
            var openEl,
                offset,
                buttonWidth;

            openEl = findOpenEl();
            offset = $element.position();
            buttonWidth = openEl.outerWidth();

            return offset.left + buttonWidth;
        }

        function toggleMobileInputVisible(isVisible) {
            var searchAndDismissEl = findSearchAndDismissEl(),
                absolutePositionClass = 'bb-search-and-dismiss-absolute',
                containerHiddenClass = 'bb-search-input-component-container-hidden',
                containerEl = findComponentContainerEl();

            if (isVisible) {
                searchAndDismissEl.addClass(absolutePositionClass);
                if (containerEl.length > 0) {
                    containerEl.addClass(containerHiddenClass);
                }
            } else {
                searchAndDismissEl.removeClass(absolutePositionClass);
                if (containerEl.length > 0) {
                    containerEl.removeClass(containerHiddenClass);
                }
            }
        }

        function toggleInputShown(isVisible) {
            var inputContainerEl = findInputContainerEl(),
                inputHiddenClass = 'bb-search-input-container-hidden';

            if (isVisible) {
                inputContainerEl.removeClass(inputHiddenClass);
            } else {
                inputContainerEl.addClass(inputHiddenClass);
            }
        }


        function setupInputAnimation(inputContainerEl, expectedWidth) {
            inputContainerEl.width(expectedWidth);
            toggleInputShown(true);

            // Set opacity to 0 to fade in input initially
            inputContainerEl.css('opacity', '0');
        }

        function toggleDismissShown(isVisible) {
            var dismissBtnEl = findDismissEl(),
                dismissHiddenClass = 'bb-search-btn-dismiss-hidden';
            if (isVisible) {
                dismissBtnEl.removeClass(dismissHiddenClass);
            } else {
                dismissBtnEl.addClass(dismissHiddenClass);
            }
        }

        function openSearchInput(focusInput) {

            var inputContainerEl,
                expectedWidth = getExpectedInputWidth();

            inputContainerEl = findInputContainerEl();

            toggleMobileInputVisible(ctrl.currentBreakpoint && ctrl.currentBreakpoint.xs);

            setupInputAnimation(inputContainerEl, expectedWidth);
            toggleDismissShown(true);
            ctrl.openButtonShown = false;

            inputContainerEl.animate(
                {
                    width: '100%',
                    opacity: 1
                },
                animationSpeed,
                animationEase
            );

            //Do not focus input on mediabreakpoint change, only on actual interaction
            if (focusInput) {
                setInputFocus();
            }

        }

        function dismissSearchInput() {
            var inputContainerEl = findInputContainerEl(),
                expectedWidth = getExpectedInputWidth(),
                widthString;

            widthString = expectedWidth + 'px';
            toggleDismissShown(false);
            ctrl.openButtonShown = true;
            inputContainerEl.animate(
                {
                    opacity: 0,
                    width: widthString
                },
                animationSpeed,
                animationEase,
                function () {
                    toggleMobileInputVisible(false);
                    toggleInputShown(false);
                }
            );


        }

        function inputFocused(isFocused) {
            var inputContainerEl = findInputContainerEl(),
                focusedClass = 'bb-search-input-focused';

            if (isFocused) {
                inputContainerEl.addClass(focusedClass);
            } else {
                inputContainerEl.removeClass(focusedClass);
            }
        }

        function searchTextBindingChanged() {
            ctrl.showClear = angular.isDefined(ctrl.bbSearchText) && ctrl.bbSearchText !== '';
            if (ctrl.currentBreakpoint && ctrl.currentBreakpoint.xs) {
                openSearchInput(true);
            }
        }

        // Trigger highlight if bbListbuilderSearchText binding changes from parent.
        function bindingChanges(changesObj) {
            var searchText;
            /* istanbul ignore else */
            /* sanity check */
            if (changesObj.bbSearchText) {
                searchText = changesObj.bbSearchText;
                /* istanbul ignore else */
                /* sanity check */
                if (searchText.currentValue !== searchText.previousValue) {
                    searchTextBindingChanged();
                }
            }

            if (changesObj.bbSearchPlaceholder) {
                /* istanbul ignore else */
                /* sanity check */
                if (angular.isDefined(changesObj.bbSearchPlaceholder.currentValue)) {
                    ctrl.placeholderText = changesObj.bbSearchPlaceholder.currentValue;
                }
            }
        }

        function listenForApplyEvent() {
            $scope.$on('bbSearchInputApply', function (event, searchText) {
                if (angular.isDefined(searchText)) {
                    ctrl.bbSearchText = searchText;
                }
                applySearchText(ctrl.bbSearchText);
            });
        }

        function initSearch() {
            if (angular.isUndefined(ctrl.bbSearchMobileResponseEnabled) || ctrl.bbSearchMobileResponseEnabled) {
                bbMediaBreakpoints.register(mediaBreakpointCallback);
                ctrl.$onDestroy = destroySearch;
            }
            
            if (ctrl.bbSearchText) {
                searchTextBindingChanged();
            }

            if (angular.isUndefined(ctrl.bbSearchPlaceholder) && angular.isDefined($element.attr('bb-search-placeholder'))) {
                ctrl.placeholderText = bbResources.search_placeholder;
            } else {
                ctrl.placeholderText = ctrl.bbSearchPlaceholder;
            }

            listenForApplyEvent();
        }


        function destroySearch() {
            bbMediaBreakpoints.unregister(mediaBreakpointCallback);
        }

        ctrl.$onInit = initSearch;
        ctrl.$onChanges = bindingChanges;

        ctrl.applySearchText = applySearchText;
        ctrl.searchTextChanged = searchTextChanged;
        ctrl.clearSearchText = clearSearchText;
        ctrl.openSearchInput = openSearchInput;
        ctrl.dismissSearchInput = dismissSearchInput;
        ctrl.inputFocused = inputFocused;
    }

    Controller.$inject = ['$element', 'bbMediaBreakpoints', 'bbResources', '$scope'];

    angular.module('sky.search.input.component', ['sky.resources', 'sky.mediabreakpoints'])
        .component('bbSearchInput', {
            templateUrl: 'sky/templates/search/search.input.component.html',
            controller: Controller,
            bindings: {
                bbOnSearch: '&?',
                bbOnSearchTextChanged: '&?',
                bbSearchText: '<?',
                bbSearchPlaceholder: '<?',
                bbSearchMobileResponseEnabled: '<?',
                bbSearchInputId: '<?',
                bbSearchFullWidth: '<?',
                bbSearchSkipButtonWhileTabbing: '<?'
            }
        });
})();

/* global angular */

(function () {
    'use strict';

    function Controller($scope, $element, $timeout, bbMediaBreakpoints) {
        var defaultSelectedTabIndex = 0,
            noSelectedTabIndex = -1,
            postLinkComplete = false,
            vm = this;

        function getFirstEl(selector) {
            var foundElements = $element.find(selector);
            return foundElements.length > 0 ? angular.element(foundElements[0]) : undefined;
        }

        function getSectionFormController(section) {
            if (section && section.formName && vm.form && vm.form.hasOwnProperty(section.formName)) {
                return vm.form[section.formName];
            }
        }

        function mediaBreakpointHandler(breakpoints) {
            /* istanbul ignore else */
            /* sanity check */
            if (vm.isMobile !== breakpoints.xs) {
                vm.isMobile = breakpoints.xs;
                setInitialState();
            }
        }

        function setInitialState() {
            if (vm.isMobile) {
                if (!angular.isDefined(vm.activeSectionIndex) || vm.activeSectionIndex === null ||  vm.activeSectionIndex < 0) {
                    displayOnlyFormSections();
                } else {
                    displayOnlyFormContent();
                }                
            } else {
                displayFormSectionsAndContent();
            }
        }

        function toggleElementDisplay(selector, show) {
            var el = getFirstEl(selector);

            if (!el) {
                return;
            }

            if (show) {
                el.removeClass('ng-hide');
            } else {
                el.addClass('ng-hide');
            }
        }

        function toggleContentDisplay(show) {
            toggleElementDisplay('.bb-sectionedform .tab-content', show);
        }
        
        function toggleNavivationDisplay(show) {
            toggleElementDisplay('.bb-sectionedform .nav-tabs', show);

            /* istanbul ignore else */
            /* sanity check */
            if (angular.isFunction(vm.onSectionsVisibilityChange)) {
                vm.onSectionsVisibilityChange({ data: { visible: show }});
            }
        }

        function displayFormSectionsAndContent() {
            toggleNavivationDisplay(true);
            toggleContentDisplay(true);
            
            if (angular.isUndefined(vm.activeSectionIndex) || vm.activeSectionIndex <= 0) {
                vm.activeSection = defaultSelectedTabIndex;
                vm.activeSectionIndex = defaultSelectedTabIndex;
                vm.onActiveSectionIndexChange({index: vm.activeSectionIndex});
            }
        }

        function displayOnlyFormContent() {
            toggleNavivationDisplay(false);
            toggleContentDisplay(true);
        }

        function displayOnlyFormSections() {
            toggleNavivationDisplay(true);
            toggleContentDisplay(false);
            vm.activeSection = noSelectedTabIndex;
        }

        vm.buildSectionHeading = function (section) {
            return section.heading + (section.itemCount ? ' (' + section.itemCount + ')' : '');
        };

        vm.sectionHasRequiredField = function (section) {
            var sectionFormController = getSectionFormController(section);
            
            if (sectionFormController) {
                if (sectionFormController.$error && sectionFormController.$error.required) {
                    return sectionFormController.$error.required.length > 0;
                }
            }
        };

        vm.sectionIsInvalid = function (section) {
            var sectionInvalid,
                parentFormSubmitted,
                sectionFormController = getSectionFormController(section);
            
            if (sectionFormController) {
                parentFormSubmitted = vm.form.$submitted;
                sectionInvalid = sectionFormController.$invalid;
            }

            return parentFormSubmitted && sectionInvalid;
        };

        vm.tabSelected = function ($index) {
            if (vm.isMobile) {
                displayOnlyFormContent();
                
                //Only raise onActiveSectionIndexChange after post link sets the initial state.
                if (postLinkComplete && $index !== vm.activeSectionIndex) {
                    vm.onActiveSectionIndexChange({index: $index});
                }
            }
        };

        $scope.$on('reinitializeSectionDisplay', function reinitializeSectionDisplay() {
            /* istanbul ignore else */
            /* sanity check */
            if (vm.isMobile) {
                vm.activeSection = noSelectedTabIndex;
                vm.activeSectionIndex = undefined;
                vm.onActiveSectionIndexChange({index: undefined});
            }
            setInitialState();
        });

        $scope.$watch('$ctrl.activeSection', function (newValue, oldValue) {
            if (newValue !== oldValue) {                
                //When the active section bound to the tab component changes, raise that change out
                //Do not do this on mobile, where the value is set initially to 0 even though the tabs aren't being displayed.  For mobile,
                //this will be triggerd by clicking tabSelected instead of the watch
                if (!vm.isMobile) {
                    vm.onActiveSectionIndexChange({index: newValue});
                }
            }
        });

        $scope.$watch('$ctrl.activeSectionIndex', function () {
            //When input for active section index changes, update the activeSection bound to the tab component.
            if (vm.activeSectionIndex !== vm.activeSection) {
                vm.activeSection = vm.activeSectionIndex;
            }
        });   

        vm.$onDestroy = function () {
            bbMediaBreakpoints.unregister(mediaBreakpointHandler);
        };

        vm.$onInit = function () {
            bbMediaBreakpoints.register(mediaBreakpointHandler);
        };

        vm.$postLink = function () {
            // Ref: https://docs.angularjs.org/guide/component
            // postLink fires before child elements load their templates and since setInitialState tries to manipulate tab elements
            // use $timeout to call setInitialState on the next digest
            $timeout(function () {
                postLinkComplete = true;
                setInitialState();
            });
        };
    }

    Controller.$inject = ['$scope', '$element', '$timeout', 'bbMediaBreakpoints'];

    angular.module('sky.sectionedform.component', ['sky.tabset', 'ui.bootstrap.tabs', 'sky.mediabreakpoints'])
        .component('bbSectionedForm', {
            bindings: {
                onSectionsVisibilityChange: '&bbSectionedFormOnSectionsVisibilityChange',
                sections: '<bbSectionedFormSections',
                activeSectionIndex: '<bbSectionedFormActiveSectionIndex',
                onActiveSectionIndexChange: '&bbSectionedFormOnActiveSectionIndexChange'
            },
            controller: Controller,
            require: {
                form: '^^form'
            },
            templateUrl: 'sky/templates/sectionedform/sectionedform.component.html'
        });
}());
/* global angular */

(function () {
    'use strict';

    angular.module('sky.sectionedform')
        .directive('bbSectionedModal', function () {
            return {
                link: function (scope, el) {
                    el.addClass('bb-sectionedmodal');
                },
                restrict: 'A'
            };
        });
}());
/*global angular */

(function () {
    'use strict';

    function BBSelectFieldController($scope, bbChecklistUtility, bbFormat, bbResources, $filter) {
        var vm = this;

        vm.getFieldInclude = function () {
            var fieldStyle = vm.bbSelectFieldStyle;

            if (fieldStyle !== 'single') {
                fieldStyle = 'multiple';
            }

            return 'sky/templates/selectfield/selectfield' + fieldStyle + '.include.html';
        };

        /* Begin "public" API methods (called by child directives) */
        vm.setPicker = function (picker) {
            vm.picker = picker;
        };

        vm.getSelectedItems = function () {
            var selectedItems = vm.bbSelectFieldSelectedItems;

            // Make a copy of the array so that changes the user makes before confirming the dialog
            // don't make their way back up to the parent scope.
            return angular.isArray(selectedItems) ? selectedItems.slice() : [];
        };

        vm.setSelectedItems = function (selectedItems) {
            vm.bbSelectFieldSelectedItems = selectedItems;
        };

        vm.selectFieldClick = function () {
            if (vm.picker) {
                vm.picker.open();
            }
        };

        vm.getSummaryCountText = function () {
            var selectedItems = vm.bbSelectFieldSelectedItems,
                formattedCount;

            /*istanbul ignore else */
            /* sanity check */
            if (angular.isArray(selectedItems)) {

                formattedCount = $filter('bbAutonumeric')(selectedItems.length, 'number', true);
                return bbFormat.formatText(bbResources.selectfield_summary_text, formattedCount);
            }
        };

        function clearField($event) {
            $event.stopPropagation();
            $event.preventDefault();
            vm.bbSelectFieldSelectedItems = [];
            if (angular.isFunction(vm.setModelTouched)) {
                vm.setModelTouched();
            }
            
        }

        vm.clearField = clearField;

        vm.removeAll = function () {
            vm.bbSelectFieldSelectedItems = [];
        };

        vm.remove = function (item) {
            bbChecklistUtility.remove(vm.bbSelectFieldSelectedItems, item);
        };
        /* End "public" API methods (called by child directives) */
    }

    BBSelectFieldController.$inject = ['$scope', 'bbChecklistUtility', 'bbFormat', 'bbResources', '$filter'];

    angular.module('sky.selectfield.controller', ['sky.autonumeric', 'sky.checklist.utility'])
        .controller('BBSelectFieldController', BBSelectFieldController);

}());

/*global angular */

(function () {
    'use strict';

    function bbSelectField() {
        function link($scope, el, attrs, ctrls) {
            var bbSelectField = ctrls[0];
            if (bbSelectField && ctrls[1]) {
                ctrls[1].$validators.required = function () {
                    return !attrs.required || (angular.isDefined(bbSelectField.bbSelectFieldSelectedItems) && bbSelectField.bbSelectFieldSelectedItems.length > 0);
                };

                attrs.$observe('required', function () {
                    ctrls[1].$validate();
                });

                $scope.$watchCollection(
                    function () {
                        return bbSelectField.bbSelectFieldSelectedItems;
                    },
                    function () {
                        ctrls[1].$validate();
                    }
                );

                bbSelectField.setModelTouched = function () {
                    ctrls[1].$setTouched();
                };
            }

            if (angular.isDefined(attrs.bbSelectFieldClear)) {
                bbSelectField.bbSelectFieldClear = true;
            }
        }

        return {
            require: ['bbSelectField', '?ngModel'],
            restrict: 'E',
            bindToController: {
                bbSelectFieldClick: '&?',
                bbSelectFieldSelectedItems: '=?ngModel',
                bbSelectFieldStyle: '@?',
                bbSelectFieldIcon: '@?',
                bbSelectFieldText: '@?'
            },
            controller: 'BBSelectFieldController',
            controllerAs: 'bbSelectField',
            scope: true,
            templateUrl: 'sky/templates/selectfield/selectfield.directive.html',
            transclude: true,
            link: link
        };
    }

    angular.module('sky.selectfield.directive', ['sky.format', 'sky.resources', 'sky.selectfield.controller'])
        .directive('bbSelectField', bbSelectField);
}());

/*global angular */

(function () {
    'use strict';

    function bbSelectFieldMultipleItemAnimation() {
        var duration = 250;

        function getFadeOptions(doneFn) {
            return {
                duration: duration,
                always: doneFn,
                queue: false
            };
        }

        return {
            enter: function (el, doneFn) {
                el
                    .css({
                        opacity: 0
                    })
                    .animate({
                        opacity: 1,
                        display: 'inline-flex'
                    }, getFadeOptions(doneFn));
            },
            leave: function (el, doneFn) {
                // Take focus off the close button
                el.find('.close').blur();

                el.fadeOut(getFadeOptions(doneFn));
            }
        };
    }

    angular.module('sky.selectfield.item.animation', [])
        .animation('.bb-select-field-multiple-item', bbSelectFieldMultipleItemAnimation);
}());

/*global angular */

(function () {
    'use strict';

    function BBSelectFieldPickerController() {

    }

    function bbSelectFieldPicker(bbModal, bbResources) {
        function link(scope, el, attrs, ctrls) {
            var bbSelectField = ctrls[1],
                modalInstance,
                selectedItems,
                vm = ctrls[0];

            vm.isSingleStyle = function () {
                return bbSelectField.bbSelectFieldStyle === 'single';
            };

            vm.getDialogHeaderText = function () {
                var header = vm.bbSelectFieldPickerHeader;

                if (!header) {
                    header = vm.isSingleStyle() ? bbResources.selectfieldpicker_select_value : bbResources.selectfieldpicker_select_values;
                }

                return header;
            };

            vm.open = function () {
                var pickerSelectedOff;

                function cleanup() {
                    if (angular.isFunction(bbSelectField.setModelTouched)) {
                        bbSelectField.setModelTouched();
                    }

                    if (pickerSelectedOff) {
                        pickerSelectedOff();
                    }

                    modalInstance = null;
                }

                function onPickerSelected(e, args) {
                    selectedItems = args.selectedItems;
                    bbSelectField.setSelectedItems(selectedItems);

                    modalInstance.close();
                }

                function onModalClosed(reason) {
                    if (reason === 'save') {
                        bbSelectField.setSelectedItems(selectedItems);
                    }

                    cleanup();
                }

                function onModalDismissed() {
                    cleanup();
                }

                if (angular.isFunction(bbSelectField.bbSelectFieldClick)) {
                    bbSelectField.bbSelectFieldClick();
                }

                modalInstance = bbModal.open({
                    scope: scope,
                    templateUrl: 'sky/templates/selectfield/selectfieldpicker.directive.html'
                });

                if (vm.isSingleStyle()) {
                    pickerSelectedOff = scope.$on('bbPickerSelected', onPickerSelected);
                }

                modalInstance.result.then(onModalClosed, onModalDismissed);
            };

            vm.okClick = function () {
                /*istanbul ignore else*/
                /* sanity check */
                if (modalInstance) {
                    modalInstance.close('save');
                }
            };

            vm.clearClick = function () {
                /*istanbul ignore else */
                /*sanity check */
                if (modalInstance) {
                    selectedItems = [];
                    modalInstance.close('save');
                }
            };

            scope.$on('bbPickerReady', function (e, args) {
                selectedItems = bbSelectField.getSelectedItems();

                args.setSelectedItems(selectedItems);
            });

            bbSelectField.setPicker(vm);
        }

        return {
            require: ['bbSelectFieldPicker', '^bbSelectField'],
            restrict: 'E',
            bindToController: {
                bbSelectFieldPickerTemplate: '@',
                bbSelectFieldPickerHeader: '@'
            },
            controller: BBSelectFieldPickerController,
            controllerAs: 'bbSelectFieldPicker',
            link: link,
            scope: true
        };
    }

    bbSelectFieldPicker.$inject = ['bbModal', 'bbResources'];

    angular.module('sky.selectfieldpicker.directive', ['sky.modal', 'sky.resources'])
        .directive('bbSelectFieldPicker', bbSelectFieldPicker);
}());

/* global angular */
(function () {
    'use strict';

    function templateFn($element, $attrs) {
        var templateString;
        if (angular.isDefined($attrs.bbSortAppendToBody)) {
            templateString = '<div class="bb-sort" uib-dropdown dropdown-append-to-body>';
        } else {
            templateString = '<div class="bb-sort" uib-dropdown>';
        }

        templateString += ['<button title="{{\'sort_button_label\' | bbResources}}" ',
                                'type="button" class="btn bb-btn-secondary" uib-dropdown-toggle>',
                                '<i class="fa fa-lg fa-sort"></i>',
                            '</button>',
                            '<div class="bb-dropdown-menu dropdown-menu" uib-dropdown-menu role="menu"> ',
                                '<bb-sort-menu>',
                                    '<ng-transclude></ng-transclude>',
                                '</bb-sort-menu>',
                            '</div>',
                        '</div>'].join('');
        return templateString;
    }

    templateFn.$inject = ['$element', '$attrs'];

    angular.module('sky.sort.component', ['ui.bootstrap.dropdown', 'sky.resources', 'sky.sort.menu.component'])
        .component('bbSort', {
            template: templateFn,
            bindings: {
                bbSortAppendToBody: '@?'
            },
            transclude: true
        });
})();
/* global angular */
(function () {
    'use strict';

    function Controller() {
        var self = this;

        function itemSelected() {
            self.sortCtrl.selectItem(self);
            self.bbSortItemSelect();
        }

        function onInit() {
            self.sortCtrl.addItem(self);
            if (self.bbSortItemActive) {
                self.sortCtrl.selectItem(self);
            }
        }

        function onChanges(changesObj) {
            if (changesObj.bbSortItemActive && 
                changesObj.bbSortItemActive.currentValue && 
                changesObj.bbSortItemActive.currentValue !== changesObj.bbSortItemActive.previousValue) {
                
                self.sortCtrl.selectItem(self);
            }
        }

        self.$onInit = onInit;
        self.$onChanges = onChanges;

        self.itemSelected = itemSelected;
    }

    angular.module('sky.sort.item.component', [])
        .component('bbSortItem', {
            require: {
                sortCtrl: '^bbSortMenu'
            },
            templateUrl: 'sky/templates/sort/sort.item.component.html',
            transclude: true,
            controller: Controller,
            bindings: {
                bbSortItemSelect: '&?',
                bbSortItemActive: '<?'
            }
        });
})();
/* global angular */
(function () {
    'use strict';

    function Controller() {
        var self = this;

        function selectItem(sortItem) {
            var i,
                item;
            for (i = 0; i < self.sortItems.length; i++) {
                item = self.sortItems[i];
                if (sortItem === item) {
                    item.isSelected = true;
                } else {
                    item.isSelected = false;
                }
            }
        }

        function addItem(sortItem) {
            self.sortItems.push(sortItem);
        }

        function initSort() {
            self.sortItems = [];
        }

        self.$onInit = initSort;
        self.selectItem = selectItem;
        self.addItem = addItem;
    }


    angular.module('sky.sort.menu.component', ['ui.bootstrap.dropdown', 'sky.resources'])
        .component('bbSortMenu', {
            controller: Controller,
            templateUrl: 'sky/templates/sort/sort.menu.component.html',
            transclude: true
        });
})();
/* global angular */
(function () {
    'use strict';

    angular.module('sky.summary.actionbar.cancel.component', [])
        .component('bbSummaryActionbarCancel', {
            transclude: true,
            templateUrl: 'sky/templates/summaryactionbar/summary.actionbar.cancel.component.html',
            bindings: {
                bbSummaryActionDisabled: '<?',
                bbSummaryActionClick: '&?'
            }
        });
})();
/* global angular */
(function () {
    'use strict';

    function Controller($document, $element, $transclude, $scope, $timeout, $window, bbMediaBreakpoints) {
        var ctrl = this,
            animationSpeed = 150,
            marginTimeout,
            summaryEl,
            actionbarEl;

        function summaryAnimationEnd(closed) {
            var displayType = closed ? 'none' : '';
            
            summaryEl.css({
                display: displayType,
                height: '',
                overflow: ''
            });
                
            addActionbarMargin();
        }

        function getModalBody() {
            var modalDialogEl = $element.parents('.modal-dialog');

            return modalDialogEl.find('.modal-body');
            
        }

        function isInFullPageModal() {
            return $element.parents('.bb-modal.bb-modal-fullpage').length > 0;
        }

        function isInModalFooter() {
            return $element.parents('.modal-footer').length > 0;
        }

        function handleModalAnimationHide(summaryHeight) {
            var bodyHeight,
                newBodyMax,
                modalBodyEl;

            modalBodyEl = getModalBody();

            if (isInFullPageModal()) {
                bodyHeight = parseInt(modalBodyEl.css('min-height'), 10);
                modalBodyEl.css({
                    minHeight: bodyHeight + summaryHeight
                });
            } else {
                
                bodyHeight = parseInt(modalBodyEl.css('max-height'), 10);
                newBodyMax = bodyHeight + summaryHeight;
                modalBodyEl.animate(
                    {
                        maxHeight: newBodyMax
                    },
                    {
                        duration: animationSpeed,
                        queue: false
                    }
                );
            }
        }

        function handleModalAnimationShow(summaryHeight) {
            var modalBodyEl = getModalBody(),
                bodyHeight,
                newBodyMax;

            if (!isInFullPageModal()) {
                bodyHeight = parseInt(modalBodyEl.css('max-height'), 10);
                newBodyMax = bodyHeight - summaryHeight;
                modalBodyEl.animate(
                    {
                        maxHeight: newBodyMax
                    },
                    {
                        duration: animationSpeed,
                        queue: false
                    }
                );
            }
        }


        function hideSummarySection() {

            var summaryHeight = summaryEl.outerHeight();
                 
            ctrl.showExpand = true;

            if (isInModalFooter()) {
                handleModalAnimationHide(summaryHeight);
            } 
            
            summaryEl.css({
                overflow: 'hidden',
                height: summaryHeight
            })
            .animate(
                {
                    height: 0
                }, 
                {
                    duration: animationSpeed,
                    queue: false,
                    complete: function () {
                        summaryAnimationEnd(true);
                    }
                });
        }

        function showSummarySection() {
            var summaryHeight = summaryEl.css({
                display: 'flex'
            }).outerHeight();

            ctrl.showExpand = false;

            if (isInModalFooter()) {
                handleModalAnimationShow(summaryHeight);
            } 

            summaryEl.css({
                overflow: 'hidden',
                height: 0
            })
            .animate(
                {
                    height: summaryHeight
                }, 
                {
                    duration: animationSpeed,
                    queue: false,
                    complete: function () {
                        summaryAnimationEnd(false);
                    }
                });
        }

        function breakpointChanged(breakpoint) {
            ctrl.summaryCollapseMode = breakpoint && breakpoint.xs;
            if (!ctrl.summaryCollapseMode) {
                summaryEl.css('display', '');
                ctrl.showExpand = false;
            }
        }

        function addActionbarMargin() {
            var actionbarHeight;
            $timeout.cancel(marginTimeout);
            marginTimeout = $timeout(function () {
                if (!isInModalFooter()) { 
                    actionbarHeight = actionbarEl.outerHeight();
                    $document.find('body').css('margin-bottom', actionbarHeight);
                } else {
                    ctrl.bbModal.fitToWindow();
                }
            }, 250);
        }

        function getSummaryEl() {
            return $element.find('.bb-summary-actionbar-summary');
        }

        function getActionbar() {
            return $element.find('.bb-summary-actionbar');
        }

        function watchActionBarHeight() {
            $scope.$watch(function () {
                return actionbarEl.outerHeight();
            }, function (newValue, oldValue) {
                
                if (oldValue !== newValue) {
                    addActionbarMargin();
                }
            });
        }

        function windowResize() {
            angular.element($window).on('resize.bbSummaryActionbar' + $scope.$id, function () {
                addActionbarMargin();
            });
        }

        function setModalFooterStyles(shouldAddClass) {
            var footerEl = $element.parents('.modal-footer'),
                method = shouldAddClass ? 'addClass' : 'removeClass' ;

            footerEl[method]('bb-modal-footer-summary-actionbar-container');
        }

        function initializeModalSummary() {
            setModalFooterStyles(true);
            addActionbarMargin();
            if (!isInFullPageModal()) {
                ctrl.summaryCollapseMode = true;
            } else {
                bbMediaBreakpoints.register(breakpointChanged);
            }
        }

        function initializeDocumentSummary() {
            bbMediaBreakpoints.register(breakpointChanged);
            addActionbarMargin();
            watchActionBarHeight();
            windowResize();
        }

        function onInit() {
            actionbarEl = getActionbar();
            summaryEl = getSummaryEl();
            ctrl.summaryContentExists = $transclude.isSlotFilled('bbSummaryActionbarSummary');
            
            if (!isInModalFooter()) {
                initializeDocumentSummary();
            } else {
                initializeModalSummary();
            }
            
        }

        function onDestroy() {
            bbMediaBreakpoints.unregister(breakpointChanged);
            $timeout.cancel(marginTimeout);
            if (!isInModalFooter()) {
                $document.find('body').css('margin-bottom', '');
            } else {
                setModalFooterStyles(false);
            }
            
            angular.element($window).off('resize.bbSummaryActionbar' + $scope.$id);
        }

        ctrl.$postLink = onInit;
        ctrl.$onDestroy = onDestroy;

        ctrl.hideSummarySection = hideSummarySection;
        ctrl.showSummarySection = showSummarySection;
    }

    Controller.$inject = ['$document', '$element', '$transclude', '$scope', '$timeout', '$window', 'bbMediaBreakpoints'];

    angular.module('sky.summary.actionbar.component', ['sky.mediabreakpoints', 'sky.resources'])
        .component('bbSummaryActionbar', {
            templateUrl: 'sky/templates/summaryactionbar/summary.actionbar.component.html',
            controller: Controller,
            require: {
                'bbModal': '?^^bbModal'
            },
            transclude: {
                bbSummaryActionbarActions: '?bbSummaryActionbarActions',
                bbSummaryActionbarSummary: '?bbSummaryActionbarSummary'
            }
        });
})();


/* global angular */
(function () {
    'use strict';

    angular.module('sky.summary.actionbar.primary.component', [])
        .component('bbSummaryActionbarPrimary', {
            transclude: true,
            templateUrl: 'sky/templates/summaryactionbar/summary.actionbar.primary.component.html',
            bindings: {
                bbSummaryActionDisabled: '<?',
                bbSummaryActionClick: '&?'
            }
        });
})();
/* global angular */
(function () {
    'use strict';

    function Controller(bbMediaBreakpoints, $scope) {
        var ctrl = this;

        function addSecondaryButton() {
            ctrl.secondaryButtonCount++;
        }

        function removeSecondaryButton() {
            ctrl.secondaryButtonCount--;
        }

        function breakpointChanged(breakpoint) {
            ctrl.isXsScreen = breakpoint && breakpoint.xs;
        }

        function onInit() {
            ctrl.secondaryButtonCount = 0;
            ctrl.menuId = 'bb-summary-actionbar-secondary-' + $scope.$id;
            bbMediaBreakpoints.register(breakpointChanged);
            
        }

        function onDestroy() {
            bbMediaBreakpoints.unregister(breakpointChanged);
        }

        ctrl.$onInit = onInit;
        ctrl.$onDestroy = onDestroy;

        ctrl.addSecondaryButton = addSecondaryButton;
        ctrl.removeSecondaryButton = removeSecondaryButton;
    }

    Controller.$inject = ['bbMediaBreakpoints', '$scope'];

    angular.module('sky.summary.actionbar.secondary.actions.component', ['ui.bootstrap.dropdown', 'sky.mediabreakpoints', 'sky.resources'])
        .component('bbSummaryActionbarSecondaryActions', {
            transclude: true,
            controller: Controller,
            templateUrl: 'sky/templates/summaryactionbar/summary.actionbar.secondary.actions.component.html'
        });
})();
/* global angular */
(function () {
    'use strict';

    function Controller() {
        var ctrl = this;

        function onInit() {
            ctrl.bbSummaryActionbarSecondaryActions.addSecondaryButton();
        }

        function onDestroy() {
            ctrl.bbSummaryActionbarSecondaryActions.removeSecondaryButton();
        }

        ctrl.$onInit = onInit;
        ctrl.$onDestroy = onDestroy;
    }

    angular.module('sky.summary.actionbar.secondary.component', [])
        .component('bbSummaryActionbarSecondary', {
            transclude: true,
            controller: Controller,
            require: {
                bbSummaryActionbarSecondaryActions: '^bbSummaryActionbarSecondaryActions'
            },
            templateUrl: 'sky/templates/summaryactionbar/summary.actionbar.secondary.component.html',
            bindings: {
                bbSummaryActionDisabled: '<?',
                bbSummaryActionClick: '&?'
            }
        });
})();
/*jslint nomen: true, plusplus: true */
/*global angular, jQuery */

(function ($) {
    'use strict';

    var tabScrollId = 0;
    angular.module('sky.tabscroll', ['sky.tabset', 'ui.bootstrap.tabs'])
        .directive('bbTabScroll', ['$timeout', '$window', function ($timeout, $window) {
            return {
                link: function (scope, el, attrs) {
                    var lastWindowResizeTimeout,
                        lastWindowWidth;

                    function getNavTabsEl() {
                        return el.children('.nav-tabs');
                    }

                    function getScrollLeftForEl(navTabsEl, selector) {
                        var elWidth,
                            scrollLeft,
                            tabEl,
                            tabLeft,
                            tabPosition,
                            tabRight;

                        if (angular.isString(selector)) {
                            tabEl = navTabsEl.children(selector);
                        } else {
                            tabEl = selector;
                        }

                        tabPosition = tabEl.position();

                        if (tabPosition) {
                            tabLeft = tabPosition.left;

                            if (tabLeft < 0) {
                                scrollLeft = tabLeft + navTabsEl[0].scrollLeft;
                            } else {
                                elWidth = el.width();
                                tabRight = tabLeft + tabEl.width();

                                if (tabRight > elWidth) {
                                    scrollLeft = navTabsEl[0].scrollLeft + (tabRight - elWidth);
                                }
                            }
                        }

                        return scrollLeft;
                    }

                    function getScrollLeft(navTabsEl) {
                        return getScrollLeftForEl(navTabsEl, '.active') || 0;
                    }

                    function stopAnimateTabScroll(navTabsEl) {
                        navTabsEl.stop(true, true);
                    }

                    function animateTabScroll(navTabsEl, scrollLeft, duration) {
                        stopAnimateTabScroll(navTabsEl);

                        navTabsEl
                            .animate(
                                {
                                    scrollLeft: scrollLeft
                                },
                                {
                                    duration: duration || 500
                                }
                            );
                    }

                    function showTabsCanScroll(force) {
                        var hasOverflow,
                            navTabsEl = getNavTabsEl(),
                            overflowOccurred,
                            scrollLeft;

                        /*istanbul ignore else */
                        /* sanity check */
                        if (navTabsEl.length > 0) {
                            hasOverflow = angular.isDefined(getScrollLeftForEl(navTabsEl, 'li:first')) ||
                                angular.isDefined(getScrollLeftForEl(navTabsEl, 'li:last'));

                            force = force || angular.isDefined(getScrollLeftForEl(navTabsEl, '.active'));

                            overflowOccurred = !showTabsCanScroll.previousHadOverflow && hasOverflow;

                            if (force || overflowOccurred) {
                                scrollLeft = getScrollLeft(navTabsEl);

                                stopAnimateTabScroll(navTabsEl);

                                if (overflowOccurred) {
                                    navTabsEl.scrollLeft(navTabsEl[0].scrollWidth - el.width());
                                }

                                animateTabScroll(navTabsEl, scrollLeft);
                            }
                        }

                        showTabsCanScroll.previousHadOverflow = hasOverflow;
                    }

                    tabScrollId++;

                    el.addClass('bb-tab-scroll');

                    if (attrs.bbTabScrollReady) {
                        scope.$watch(attrs.bbTabScrollReady, function (newValue, oldValue) {
                            if (newValue && newValue !== oldValue) {
                                showTabsCanScroll(true);
                            }
                        });
                    }

                    lastWindowWidth = $($window).width();

                    // Show initial scroll animation whenever the window width changes.
                    $($window).on('resize.tabscroll' + tabScrollId, function () {
                        var windowWidth = $($window).width();

                        if (lastWindowWidth !== windowWidth) {
                            $timeout.cancel(lastWindowResizeTimeout);

                            lastWindowResizeTimeout = $timeout(function () {
                                showTabsCanScroll();
                            }, 250);
                        }

                        lastWindowWidth = windowWidth;
                    });

                    // Ensure that when a tab is clicked the tab is fully visible and not partially
                    // scrolled off either side.
                    el.on('click', '> .nav-tabs > li', function () {
                        var navTabsEl,
                            scrollLeft;

                        navTabsEl = getNavTabsEl();
                        scrollLeft = getScrollLeftForEl(navTabsEl, $(this));

                        if (angular.isDefined(scrollLeft)) {
                            animateTabScroll(navTabsEl, scrollLeft, 250);
                        }
                    });

                    el.on('$destroy', function () {
                        $($window).off('.tabscroll' + tabScrollId);
                    });
                }
            };
        }]);
}(jQuery));

/*jslint nomen: true, plusplus: true */
/*global angular, jQuery */

(function ($) {
    'use strict';

    var DROPDOWN_CARET_WIDTH = 45,
        TAB_PADDING = 15;

    function getTemplate($templateCache, name) {
        return $templateCache.get('sky/templates/tabset/' + name + '.html');
    }

    function tabset($compile, $templateCache) {
        return {
            link: function ($scope, el, attr) {
                var ulEl,
                    liEl;

                if (angular.isDefined(attr.bbTabsetAdd) || angular.isDefined(attr.bbTabsetOpen)) {
                    ulEl = el.children('ul');
                    liEl = angular.element(getTemplate($templateCache, 'tabbutton'));
                    ulEl.append(liEl);

                    if (angular.isDefined(attr.bbTabsetAdd)) {
                        liEl.append($compile(getTemplate($templateCache, 'addbutton'))($scope));

                        $scope.bbTabAdd = function () {
                            $scope.$eval(attr.bbTabsetAdd);
                        };
                    }

                    if (angular.isDefined(attr.bbTabsetOpen)) {
                        liEl.append($compile(getTemplate($templateCache, 'openbutton'))($scope));

                        $scope.bbTabOpen = function () {
                            $scope.$eval(attr.bbTabsetOpen);
                        };
                    }
                }
            }
        };
    }

    tabset.$inject = ['$compile', '$templateCache'];

    function BBTabsetCollapsibleController($scope, $timeout) {
        var self = this;

        self.updateCollapsibleHeader = function (header) {
            $scope.bbTabsetOptions.selectedTabHeader = header;
        };

        self.tabAdded = function () {
            $timeout(function () {
                $scope.bbTabsetOptions.tabCount++;
                if ($scope.bbTabsetOptions.isSmallScreen) {
                    $scope.setupCollapsibleTabs($scope.bbTabsetOptions.isSmallScreen && $scope.bbTabsetOptions.tabCount > 1);
                }
            });
        };

        self.tabRemoved = function () {
            $scope.bbTabsetOptions.tabCount--;
        };
    }

    BBTabsetCollapsibleController.$inject = ['$scope', '$timeout'];

    function bbTabsetCollapsible($compile, $templateCache, $window, bbMediaBreakpoints) {
        return {
            restrict: 'A',
            controller: BBTabsetCollapsibleController,
            link: function ($scope, el) {
                var lastWindowWidth,
                    tabCollapseId = $scope.$id;

                function hasCollapsedTabs() {
                    return el.children('ul.nav.nav-tabs').length < 1;
                }

                function getTabUl() {
                    var ulEl = el.children('ul.nav.nav-tabs');
                    if (ulEl.length > 0) {
                        return ulEl.eq(0);
                    } else {
                        return el.find('> .bb-tabset-dropdown.nav.nav-tabs > ul').eq(0);
                    }
                }

                function getAddOpenButtons() {
                    if (hasCollapsedTabs()) {
                        return el.find('> .bb-tabset-dropdown > .bb-tab-button-wrap');
                    } else {
                        return el.find('> ul.nav.nav-tabs > li.bb-tab-button > .bb-tab-button-wrap');
                    }
                }

                function getBootstrapTabs() {
                    var ulEl = getTabUl();
                    return ulEl.children('li:not(.bb-tab-button):not(.bb-tabset-dropdown)').eq(0);
                }

                function getDropdownEl() {
                    return angular.element(getTemplate($templateCache, 'dropdown'));
                }

                function setTabMaxWidth() {
                    //later this will resize tabs to fit the window
                    var ulEl = getTabUl();
                    ulEl.find('> li > a').css('max-width', '');
                }

                function setDropdownMaxWidth() {
                    var availableWidth,
                        addOpenWidth = 0,
                        addOpenButtonEl,
                        i,
                        dropdownTextMaxWidth;

                    availableWidth = el.width();

                    addOpenButtonEl = getAddOpenButtons();

                    for (i = 0; i < addOpenButtonEl.length; i++) {
                        addOpenWidth += addOpenButtonEl.eq(i).width();
                    }

                    dropdownTextMaxWidth = availableWidth - addOpenWidth - DROPDOWN_CARET_WIDTH - TAB_PADDING;

                    /* If widths are available, we can override the default max-width of the dropdown button and menu to be more specific */
                    if (dropdownTextMaxWidth > 0) {
                        el.find('> .bb-tabset-dropdown > .bb-tab-dropdown-button > .bb-tab-header-text').css('max-width', (dropdownTextMaxWidth.toString() + 'px'));
                    }

                    if (availableWidth > 0) {
                        el.find('> .bb-tabset-dropdown > ul.dropdown-menu > li >  a').css('max-width', (availableWidth.toString() + 'px'));
                    }

                }

                function setupCollapsibleTabs(isCollapsed) {
                    var tabsEl,
                        dropdownContainerEl,
                        ulEl,
                        dropdownButtonsEl;

                    tabsEl = getBootstrapTabs();
                    dropdownButtonsEl = getAddOpenButtons();
                    ulEl = getTabUl();
                    if (isCollapsed) {
                        dropdownContainerEl = el.children('.bb-tabset-dropdown');

                        ulEl.addClass('dropdown-menu');
                        ulEl.removeClass('nav');
                        ulEl.removeClass('nav-tabs');
                        dropdownContainerEl.append(ulEl);
                        dropdownContainerEl.append(dropdownButtonsEl);
                        setDropdownMaxWidth();
                    } else {
                        ulEl.removeClass('dropdown-menu');
                        ulEl.addClass('nav');
                        ulEl.addClass('nav-tabs');

                        el.prepend(ulEl);

                        ulEl.children('.bb-tab-button').append(dropdownButtonsEl);
                        setTabMaxWidth();
                    }
                }

                $scope.setupCollapsibleTabs = setupCollapsibleTabs;

                function mediaBreakpointHandler(newBreakpoints) {
                    $scope.bbTabsetOptions.isSmallScreen = newBreakpoints.xs;
                    setupCollapsibleTabs(newBreakpoints.xs && ($scope.bbTabsetOptions.tabCount > 1));
                }

                $scope.bbTabsetOptions = {
                    isSmallScreen: false,
                    tabCount: 0
                };

                el.prepend($compile(getDropdownEl())($scope));

                $scope.$watch('bbTabsetOptions.tabCount', function (newValue) {
                    if ($scope.bbTabsetOptions.isSmallScreen) {
                        if (newValue && newValue > 1) {
                            setupCollapsibleTabs(true);
                        } else {
                            setupCollapsibleTabs(false);
                        }
                    }

                });

                bbMediaBreakpoints.register(mediaBreakpointHandler);

                $($window).on('resize.tabcollapse' + tabCollapseId, function () {
                    var windowWidth = $($window).width();

                    /* istanbul ignore else */
                    /* sanity check */
                    if (lastWindowWidth !== windowWidth && $scope.bbTabsetOptions.isSmallScreen && $scope.bbTabsetOptions.tabCount > 1) {
                        setDropdownMaxWidth();
                    }

                    lastWindowWidth = windowWidth;
                });

                $scope.$on('$destroy', function () {
                    bbMediaBreakpoints.unregister(mediaBreakpointHandler);
                    $($window).off('.tabcollapse' + tabCollapseId);
                });
            }
        };
    }

    bbTabsetCollapsible.$inject = ['$compile', '$templateCache', '$window', 'bbMediaBreakpoints'];

    function collapsibleTabTitle($scope, el, bbTabsetCollapsibleCtrl, getTabHeading) {
        //get ui-bootstrap tab scope
        var tabScope = el.isolateScope();
        $scope.$watch(function () {
            return tabScope.active;
        }, function (active) {
            if (active) {
                bbTabsetCollapsibleCtrl.updateCollapsibleHeader(getTabHeading());
            }
        });

        $scope.$watch(function () {
            return getTabHeading();
        }, function (collapseTitle) {
            if (tabScope.active) {
                bbTabsetCollapsibleCtrl.updateCollapsibleHeader(collapseTitle);
            }
        });

        bbTabsetCollapsibleCtrl.tabAdded();

        $scope.$on('$destroy', function () {
            bbTabsetCollapsibleCtrl.tabRemoved();
        });
    }

    function bbTabCollapseHeader() {
        return {
            require: '^bbTabsetCollapsible',
            link: function ($scope, el, attr, bbTabsetCollapsibleCtrl) {
                function getTabHeading() {
                    return $scope.$eval(attr.bbTabCollapseHeader);
                }

                collapsibleTabTitle($scope, el, bbTabsetCollapsibleCtrl, getTabHeading);
            }
        };
    }

    function tab($log, $parse, $timeout) {
        return {
            require: ['?^bbTabsetCollapsible', '^uibTabset'],
            link: function ($scope, el, attr, ctrls) {
                var tabScope = el.isolateScope(),
                    bbTabsetCollapsibleCtrl = ctrls[0],
                    uibTabsetCtrl = ctrls[1],
                    activeModel;

                function getTabHeading() {
                    return tabScope.heading;
                }

                if (bbTabsetCollapsibleCtrl !== null && !angular.isDefined(attr.bbTabCollapseHeader)) {
                    collapsibleTabTitle($scope, el, bbTabsetCollapsibleCtrl, getTabHeading);
                }

                if (angular.isDefined(attr.active)) {
                    $timeout(function () {
                        $log.warn('uibTab active attribute is deprecated, instead track active state on uibTabset');

                        activeModel = $parse(attr.active);


                        $scope.$watch(function () {
                            return activeModel($scope);
                        }, function (newValue) {
                            if (newValue === true && uibTabsetCtrl.active !== tabScope.index) {
                                uibTabsetCtrl.select(tabScope.index);
                            }
                        });

                        tabScope.$watch(function () {
                            return tabScope.active;
                        }, function (newValue) {
                            if (angular.isDefined(newValue) && newValue !== activeModel($scope)) {
                                activeModel.assign($scope, newValue);
                            }
                        });
                    });
                }
            }
        };
    }

    tab.$inject = ['$log', '$parse', '$timeout'];

    function bbTabHeadingXs($compile, $templateCache) {
        return {
            require: 'uibTab',
            link: function ($scope, el, attr) {
                var anchorEl;

                anchorEl = el.children('a');
                anchorEl.wrapInner(getTemplate($templateCache, 'largeheading'));
                anchorEl.append($compile(getTemplate($templateCache, 'smallheading'))($scope));


                $scope.bbTabHeadingXs = attr.bbTabHeadingXs;

                $scope.$watch(function () {
                    return attr.bbTabHeadingXs;
                }, function (newValue) {
                    $scope.bbTabHeadingXs = newValue;
                });
            }
        };
    }

    bbTabHeadingXs.$inject = ['$compile', '$templateCache'];

    function BBVerticalTabsetController() {
        var self = this;

        self.addTabGroup = addTabGroup;
        self.tabGroups = [];

        function addTabGroup(tabGroup) {
            // Property is used in ARIA attributes. Ensure that it is defined
            // so that ARIA attributes are properly initialized.
            tabGroup.isOpen = tabGroup.isOpen || false;
            self.tabGroups.push(tabGroup);
        }
    }

    function bbVerticalTabset($log, $parse, bbMediaBreakpoints) {
        return {
            controller: BBVerticalTabsetController,
            link: link,
            require: ['uibTabset', 'bbVerticalTabset'],
            restrict: 'A'
        };

        function link($scope, el, attr, ctrls) {
            var uibTabsetCtrl = ctrls[0],
                bbVerticalTabsetCtrl = ctrls[1],
                scope = el.isolateScope(),
                unbindWatch;

            if (angular.isDefined(attr.bbTabsetAdd)) {
                $log.warn('uibTabset bbTabsetAdd attribute is incompatible with bbVerticalTabset, it will be ignored');
            }
            if (angular.isDefined(attr.bbTabsetOpen)) {
                $log.warn('uibTabset bbTabsetOpen attribute is incompatible with bbVerticalTabset, it will be ignored');
            }
            if (angular.isDefined(attr.bbTabsetCollapsible)) {
                $log.warn('using the uibTabset bbTabsetCollapsible attribute with bbVerticalTabset is not supported, it may yield undesirable results');
            }
            if (angular.isDefined(attr.justified)) {
                $log.warn('uibTabset justified attribute is incompatible with bbVerticalTabset, it will be ignored');
            }
            if (angular.isDefined(attr.type) && $parse(attr.type)($scope) !== 'tabs') {
                $log.warn('uibTabset type attribute values other than \'tabs\' are incompatible with bbVerticalTabset and will be ignored');
            }
            if (angular.isDefined(attr.vertical) && !$parse(attr.vertical)($scope)) {
                $log.warn('uibTabset vertical attribute values other than true are incompatible with bbVerticalTabset and will be ignored');
            }

            scope.closeOthers = angular.isDefined(attr.bbVerticalTabsetCloseOthers) ?
                $parse(attr.bbVerticalTabsetCloseOthers)($scope) :
                false;
            scope.showTabs = true;

            bbMediaBreakpoints.register(mobileBreakpointHandler);
            $scope.$on('$destroy', function () {
                bbMediaBreakpoints.unregister(mobileBreakpointHandler);
            });
            $scope.$on('reinitializeVerticalTabsetDisplay', function () {
                scope.showTabs = scope.isMobile;
                if (scope.isMobile) {
                    uibTabsetCtrl.active = -1;
                }
            });

            unbindWatch = $scope.$watch(
                function () {
                    return bbVerticalTabsetCtrl.tabGroups.length > 0;
                },
                function (val) {
                    var group;
                    if (!val) {
                        // Remove tablist role for accessibility.
                        group = el.find('.panel-group');
                        group.removeAttr('role');
                    }
                    unbindWatch();
                }
            );
            $scope.$watch(
                function () {
                    return $parse(attr.bbVerticalTabsetCloseOthers)($scope);
                },
                function (val) {
                    scope.closeOthers = val;
                }
            );
            $scope.$watch(
                function () {
                    return uibTabsetCtrl.active;
                },
                function (value) {
                    scope.showTabs = angular.isUndefined(value) || value === null || value < 0;
                    activateTabGroup(value);
                }
            );

            if (angular.isDefined(uibTabsetCtrl.active)) {
                activateTabGroup(uibTabsetCtrl.active);
            }

            function mobileBreakpointHandler(breakpoints) {
                scope.isMobile = breakpoints.xs;
            }

            function activateTabGroup(newIndex) {
                var activeGroup = bbVerticalTabsetCtrl.tabGroups
                    .filter(function (tabGroup) {
                        return tabGroup.tabs.filter(function (tab) {
                            return tab.index === newIndex || tab.active;
                        }).length > 0;
                    });

                bbVerticalTabsetCtrl.tabGroups
                    .forEach(function (tabGroup) {
                        tabGroup.active = false;
                    });

                if (activeGroup.length > 0) {
                    activeGroup[0].activateTabGroup();
                }
            }
        }
    }

    bbVerticalTabset.$inject = ['$log', '$parse', 'bbMediaBreakpoints'];

    function BBVerticalTabsetGroupController() {
        var self = this;

        self.addTab = addTab;
        self.activateTabGroup = activateTabGroup;
        self.tabs = [];

        function addTab(tab) {
            self.tabs.push(tab);
        }
        function activateTabGroup() {
            self.active = true;
            self.isOpen = true;
        }
    }

    function bbVerticalTabsetGroup() {
        return {
            bindToController: true,
            controller: BBVerticalTabsetGroupController,
            controllerAs: 'bbVerticalTabsetGroup',
            link: link,
            replace: true,
            require: ['^bbVerticalTabset', 'bbVerticalTabsetGroup'],
            restrict: 'A',
            scope: {
                heading: '@bbVerticalTabsetGroupHeading',
                isDisabled: '=?bbVerticalTabsetGroupIsDisabled',
                isOpen: '=?bbVerticalTabsetGroupIsOpen'
            },
            templateUrl: function (el, attr) {
                return angular.isDefined(attr.bbVerticalTabsetGroupTemplateUrl) ?
                    attr.bbVerticalTabsetGroupTemplateUrl :
                    'sky/templates/tabset/verticaltabsetgroup.html';
            },
            transclude: true
        };

        function link($scope, el, attr, ctrls) {
            var bbVerticalTabsetCtrl = ctrls[0],
                bbVerticalTabsetGroupCtrl = ctrls[1];

            bbVerticalTabsetCtrl.addTabGroup(bbVerticalTabsetGroupCtrl);
        }
    }

    function uibTabsetDirectiveDecorator($delegate) {
        decorateTemplateUrl(
             $delegate[0],
            'sky/templates/tabset/verticaltabset.html',
            function (el, attr) {
                return angular.isDefined(attr.bbVerticalTabset);
            }
        );
        return $delegate;
    }

    uibTabsetDirectiveDecorator.$inject = ['$delegate'];

    function uibTabDirectiveDecorator($delegate) {
        decorateLink(
            $delegate[0],
            '^bbVerticalTabsetGroup',
            function ($scope, el, attr, ctrl) {
                ctrl.addTab($scope);
            }
        );
        return $delegate;
    }

    uibTabDirectiveDecorator.$inject = ['$delegate'];

    function decorateTemplateUrl(delegate, newTemplateUrl, conditionFn) {
        var originalTemplateUrl = delegate.templateUrl;
        delegate.templateUrl = function (el, attr) {
            if (conditionFn(el, attr)) {
                return angular.isDefined(attr.templateUrl) ?
                    attr.templateUrl :
                    newTemplateUrl;
            }
            return angular.isFunction(originalTemplateUrl) ?
                originalTemplateUrl.apply(this, arguments) :
                /* istanbul ignore next: sanity check */
                originalTemplateUrl;
        };
    }

    function decorateLink(delegate, requiredDirective, linkFn) {
        var originalRequireIsArray = angular.isArray(delegate.require),
            originalLink = delegate.link,
            newDir = '?'.concat(requiredDirective);
        delegate.require = originalRequireIsArray ?
            /* istanbul ignore next: sanity check */
            [newDir].concat(delegate.require) :
            [newDir, delegate.require];
        delegate.compile = function () {
            return function ($scope, el, attr, ctrls, transclude) {
                if (ctrls[0] !== null) {
                    linkFn.call(this, $scope, el, attr, ctrls[0], transclude);
                }
                return originalLink.call(
                    this,
                    $scope,
                    el,
                    attr,
                    originalRequireIsArray ?
                        /* istanbul ignore next: sanity check */
                        ctrls.slice(1) :
                        ctrls[1],
                    transclude
                );
            };
        };
    }

    angular.module('sky.tabset', ['ui.bootstrap.tabs', 'sky.mediabreakpoints', 'sky.resources'])
        .directive('uibTabset', tabset)
        .directive('bbTabsetCollapsible', bbTabsetCollapsible)
        .directive('bbTabCollapseHeader', bbTabCollapseHeader)
        .directive('uibTab', tab)
        .directive('bbTabHeadingXs', bbTabHeadingXs)
        .directive('bbVerticalTabset', bbVerticalTabset)
        .directive('bbVerticalTabsetGroup', bbVerticalTabsetGroup)
        .decorator('uibTabsetDirective', uibTabsetDirectiveDecorator)
        .decorator('uibTabDirective', uibTabDirectiveDecorator);

}(jQuery));

/*global angular */

(function () {
    'use strict';

    function evaluateAngularExpression(exp, scope) {
        return angular.copy(scope.$eval(exp)) || null;
    }

    function checkForAndWrapRefWithStateName(ref, $state) {
        var newRef,
            parsedRef;

        // Match against statename({ param: value }) syntax, as specified for ui-sref in angular-ui-router v0.2.15
        // Produces the following matches, in this order, if no statename is present:
        //   - original string, Ex: statename({ param: value })
        //   - parameter object string, Ex: { param: value }
        parsedRef = ref.match(/^\s*({[^}]*})\s*$/);

        // Wrap the parameter string with the current statename if no statename was provided
        if (parsedRef && $state.current) {
            newRef = $state.current.name + '(' + parsedRef[1] + ')';
        }

        return newRef || ref;
    }

    function parseAndValidateRef(ref) {
        // Match against statename({ param: value }) syntax, as specified for ui-sref in angular-ui-router v0.2.15
        // Produces the following matches in this order:
        //   - original string, Ex: statename({ param: value })
        //   - state name, Ex: statename
        //   - parameter object string w/ wrapping parenthesis, Ex: ({ param: value })
        //   - parameter object string, Ex: { param: value }
        var parsedRefSubstrings = ref.replace(/\n/g, " ").match(/^([^(]+?)\s*(\((.*)\))?$/);

        if (!parsedRefSubstrings || parsedRefSubstrings.length !== 4) {
            throw new Error("Invalid state ref '" + ref + "'");
        }

        return parsedRefSubstrings;
    }

    function parseStateRef(ref, scope, $state) {
        var parsedRef;

        ref = checkForAndWrapRefWithStateName(ref, $state);

        parsedRef = parseAndValidateRef(ref);

        return {
            state: parsedRef[1],
            params: evaluateAngularExpression(parsedRef[3], scope)
        };
    }

    function findTabNumberIndex(index, tabsetCtrl) {
        var i;
        for (i = 0; i < tabsetCtrl.tabs.length; i++) {
            if (tabsetCtrl.tabs[i].index === index) {
                return i;
            }
        }
    }

    function setActiveTab(sref, el, tabsetCtrl, $state) {
        var index;
        if ($state.includes(sref.state)) {
            index = el.isolateScope().index;
            if (angular.isNumber(index)) {
                tabsetCtrl.select(index);
            } else {
                tabsetCtrl.select(findTabNumberIndex(index, tabsetCtrl));
            }
           
        }
    }

    angular.module('sky.tabsref', ['sky.tabset', 'ui.bootstrap.tabs'])
        .directive('bbTabSref', ['$rootScope', '$state', '$timeout', function ($rootScope, $state, $timeout) {
            return {
                require: '^uibTabset',
                link: function (scope, el, attrs, tabsetCtrl) {
                    var sref = parseStateRef(attrs.bbTabSref, scope, $state),
                        stateChangeDeregistration;

                    /*istanbul ignore else */
                    /* sanity check */
                    if (sref.state) {
                        setActiveTab(sref, el, tabsetCtrl, $state);

                        stateChangeDeregistration = $rootScope.$on('$stateChangeSuccess', function () {
                            setActiveTab(sref, el, tabsetCtrl, $state);
                        });

                        scope.$watch(function () {
                            return tabsetCtrl.active;
                        }, function (newValue) {
                            if (newValue === el.isolateScope().index && !$state.includes(sref.state)) {
                                // JPB - Delay calling state.go because the state change will fail
                                // if it is triggered while in the middle of processing of another state change.
                                // This can happen if you browse to the page without specifying the state of a particular tab
                                // and then this code tries to switch you over to the state of the first tab.
                                $timeout(function () {
                                    $state.go(sref.state, sref.params);
                                });
                            }
                        });

                        scope.$on('$destroy', function () {
                            stateChangeDeregistration();
                        });
                    }
                }
            };
        }]);
}());

/*jslint nomen: true, plusplus: true */
/*global angular */

(function () {
    'use strict';

    var BB_TEMPLATE_RESULT = 'bb-template-result';

    function createItemClassName(index) {
        return 'bb-template-item-' + index;
    }

    function insertTemplateItems(templateEl, items) {
        var i,
            n;

        // Move each item into the template element.
        for (i = 0, n = items.length; i < n; i++) {
            items[i].appendTo(templateEl.find('.' + createItemClassName(i)));
        }
    }

    angular.module('sky.templating', ['sky.format'])
        .directive('bbTemplate', ['bbFormat', function (bbFormat) {
            function createTemplateHtml(template) {
                // The template string itself should not contain HTML, so be sure to escape it to avoid HTML injection.
                template = bbFormat.escape(template);

                // Replace {0}, {1}, etc. with span elements that will serve as placeholders for the item elements.
                return template.replace(/\{(\d+)\}/g, function (match, number) {
                    /*jslint unparam: true */
                    return '<span class="' + createItemClassName(number) + '"></span>';
                });
            }

            return {
                controller: ['$scope', function ($scope) {
                    $scope.items = [];

                    this.addItem = function (item) {
                        $scope.items.push(item);
                    };
                }],
                link: function (scope, el) {

                    scope.$watch('template', function (newValue) {
                        var newEl,
                            oldEl = el.find('.' + BB_TEMPLATE_RESULT),
                            templateHtml;

                        if (angular.isDefined(newValue)) {
                            templateHtml = createTemplateHtml(newValue);

                            // Create and append a new template item, move the existing items to it, then
                            // destroy the old items.  Doing it in this order should ensure any elements
                            // with bindings remain bound after being moved.
                            newEl = angular.element('<span class="' + BB_TEMPLATE_RESULT + '">' + templateHtml + '</span>')
                                .appendTo(el);

                            insertTemplateItems(newEl, scope.items);

                            // Remove old elements if they exist.
                            oldEl.remove();
                        }
                    });
                },
                scope: {
                    template: '=bbTemplate'
                },
                restrict: 'A'
            };
        }])
        .directive('bbTemplateItem', function () {
            return {
                link: function (scope, el, attr, bbFormatCtrl) {
                    /*jslint unparam: true */
                    bbFormatCtrl.addItem(el);
                },
                require: '^bbTemplate',
                restrict: 'AE'
            };
        });
}());

/*jslint plusplus: true */
/*global angular */

(function () {
    'use strict';

    var modules = [
            'sky.resources',
            'sky.scrollintoview',
            'sky.modal'
        ];

    function getNewlineCount(value) {
        var matches = value.match(/\n/gi);

        if (matches) {
            return matches.length;
        }

        return 0;
    }

    function createEl($templateCache, templateName) {
        return angular.element($templateCache.get('sky/templates/textexpand/' + templateName + '.html'));
    }

    function BBTextExpandController(textExpandContent, headerContent, closeText) {
        var self = this;
        self.textExpandContent = textExpandContent;
        self.headerContent = headerContent;
        self.closeText = closeText;
    }

    BBTextExpandController.$inject = ['textExpandContent', 'headerContent', 'closeText'];

    angular.module('sky.textexpand', modules)
        .directive('bbTextExpandRepeater', ['$templateCache', 'bbResources', function ($templateCache, bbResources) {
            function link(scope, el, attrs) {
                scope.$watch(attrs.bbTextExpandRepeaterData, function (data) {
                    var length,
                        maxToShow,
                        seeMoreEl,
                        seeMoreText = bbResources.text_expand_see_more,
                        seeLessText = bbResources.text_expand_see_less;

                    if (data) {
                        length = data.length;
                        maxToShow = +attrs.bbTextExpandRepeaterMax;
                        seeMoreEl = createEl($templateCache, 'seemore').text(seeMoreText);

                        if (length > maxToShow) {
                            el.find('li:gt(' + (maxToShow - 1) + ')').addClass('bb-text-expand-toggle-li').hide().end().append(
                                seeMoreEl.click(function () {
                                    seeMoreEl.siblings('.bb-text-expand-toggle-li').toggle(100);
                                    if (seeMoreEl.hasClass('bb-text-expand-see-more')) {
                                        seeMoreEl.text(seeLessText);
                                    } else {
                                        seeMoreEl.text(seeMoreText);
                                    }

                                    seeMoreEl.toggleClass('bb-text-expand-see-more');

                                    return false;
                                })
                            );
                        }
                    }
                });
            }

            return {
                link: link
            };
        }])
        .directive('bbTextExpand', ['$templateCache', 'bbResources', 'bbScrollIntoView', 'bbModal', function ($templateCache, bbResources, bbScrollIntoView, bbModal) {
            function link(scope, el, attrs) {
                var isExpanded,
                    maxLength = +attrs.bbTextExpandMaxLength || 200,
                    maxExpandedLength = +attrs.bbTextExpandMaxExpandedLength || 600,
                    maxNewlines = 1,
                    maxExpandedNewlines = +attrs.bbTexExpandMaxExpandedNewlines || 3;

                function getTruncatedText(value, length, newlines) {
                    var i;

                    if (newlines && getNewlineCount(value) >= newlines) {
                        value = value.replace(/\s+/gi, ' ');
                    }

                    // Jump ahead one character and see if it's a space, and if it isn't,
                    // back up to the first space and break there so a word doesn't get cut
                    // in half.
                    for (i = length; i > length - 10; i--) {
                        if (/\s/.test(value.charAt(i))) {
                            length = i;
                            break;
                        }
                    }

                    return value.substr(0, length);
                }

                scope.$watch(attrs.bbTextExpand, function (newValue) {
                    var collapsedText,
                        expandedText,
                        containerEl,
                        currentHeight,
                        ellipsisEl,
                        expandEl,
                        newHeight,
                        textEl,
                        spaceEl;

                    function animateText(previousText, newText, newExpandText, showEllipsis) {
                        // Measure the current height so we can animate from it.
                        currentHeight = containerEl.height();

                        expandEl.text(newExpandText);
                        textEl.text(newText);

                        newHeight = containerEl.height();

                        if (newHeight < currentHeight) {
                            // The new text is smaller than the old text, so put the old text back before doing
                            // the collapse animation to avoid showing a big chunk of whitespace.
                            textEl.text(previousText);
                        }

                        ellipsisEl.text(showEllipsis ? '...' : '');

                        containerEl
                            .height(currentHeight)
                            .animate(
                                {
                                    height: newHeight
                                },
                                250,
                                function () {
                                    if (newHeight < currentHeight) {
                                        textEl.text(newText);
                                    }
                                    containerEl.css('height', 'auto');
                                }
                            );
                    }

                    containerEl = createEl($templateCache, 'container');

                    /* istanbul ignore else */
                    /* nothing happens when there's no value, so there's nothing to test. */
                    if (newValue) {
                        collapsedText = getTruncatedText(newValue, maxLength, maxNewlines);
                        expandedText = getTruncatedText(newValue, maxExpandedLength, maxExpandedNewlines); // Get text based on max expanded length

                        if (collapsedText !== newValue) {
                            isExpanded = true;

                            textEl = createEl($templateCache, 'text').text(collapsedText);
                            ellipsisEl = createEl($templateCache, 'ellipsis');
                            spaceEl = createEl($templateCache, 'space');
                            expandEl = createEl($templateCache, 'seemore').text(bbResources.text_expand_see_more);


                            containerEl
                                .empty()
                                .append(textEl)
                                .append(ellipsisEl)
                                .append(spaceEl)
                                .append(expandEl);

                            if (getNewlineCount(newValue) >= maxExpandedNewlines || newValue.length > maxExpandedLength) {
                                expandEl.on('click', function () {
                                    bbModal.open({
                                        templateUrl: 'sky/templates/textexpand/expandmodal.html',
                                        controller: BBTextExpandController,
                                        controllerAs: 'expandCtrl',
                                        resolve: {
                                            textExpandContent: function () {
                                                return newValue;
                                            },
                                            headerContent: function () {
                                                return scope.$eval(attrs.bbTextExpandModalTitle) || bbResources.text_expand_modal_title;
                                            },
                                            closeText: function () {
                                                return bbResources.text_expand_close_text;
                                            }
                                        }
                                    });
                                });

                            } else {
                                expandEl.on('click', function () {
                                    if (isExpanded) {
                                        animateText(collapsedText, expandedText, bbResources.text_expand_see_less, (expandedText !== newValue));
                                    } else {
                                        animateText(expandedText, collapsedText, bbResources.text_expand_see_more, true);
                                    }

                                    bbScrollIntoView(expandEl);
                                    isExpanded = !isExpanded;

                                    return false;
                                });
                            }


                        } else {
                            containerEl.text(newValue);
                        }
                    }

                    el.empty().append(containerEl);

                    /* istanbul ignore next */
                    /* these internal variables can't be tested. */
                    el.on('$destroy', function () {
                        containerEl = null;
                        expandEl = null;
                        textEl = null;
                        spaceEl = null;
                    });
                });
            }

            return {
                link: link
            };
        }]);
}());

/*jslint browser: true, plusplus: true */
/*global angular */

(function () {
    'use strict';

    //Removes the specified tiles from the source container and appends them
    //in the specified order to the target container.
    function moveTilesToContainer(sourceContainer, targetContainer, tiles) {
        angular.forEach(tiles, function (tileId) {
            var tile = sourceContainer.find('[data-tile-id="' + tileId + '"]');
            targetContainer.append(tile);
        });
    }

    //Returns an array of tile names in the order they appear in the specified container.
    function parseTileOrder(container) {
        var tiles = [];
        container.find('[data-tile-id]').each(function () {
            tiles.push(angular.element(this).data('tile-id'));
        });
        return tiles;
    }

    function BBTileController($scope, $timeout, bbResources) {
        var vm = this,
            displayModeChanging = false;

        function onInit() {
            vm.setHeaderContentEl = function (el) {
                vm.headerContentEl = el;

                /* istanbul ignore else */
                /* sanity check */
                if (angular.isFunction(vm.updateHeaderContent)) {
                    vm.updateHeaderContent();
                }
            };

            vm.updateTileState = updateTileState;

            vm.isCollapsed = vm.bbTileCollapsed || false;
            vm.smallTileDisplayMode = false;
            vm.tileId = '';
            vm.resources = bbResources;

            vm.titleClick = function () {
                vm.isCollapsed = !vm.isCollapsed;
                vm.scrollIntoView = !vm.isCollapsed;
            };

            //listens for the tileModeChanged event from the tileDashboard and updates the collapsed state of the tiles based on whether or not the tiles are in small display mode
            $scope.$on('tileDisplayModeChanged', function (event, data) {
                /*jslint unparam: true */
                vm.smallTileDisplayMode = data.smallTileDisplayMode || false;

                if (vm.tileInitialized) {
                    displayModeChanging = true;
                    vm.updateTileState(data.tiles);
                }
            });

            //if the collapsed state changes, notify the tileDashboard
            $scope.$watch(function () {
                return vm.isCollapsed;
            }, function () {
                if (vm.tileInitialized && !displayModeChanging) {
                    $timeout(function () {
                        $scope.$emit('tileStateChanged', {
                            tileId: vm.tileId,
                            collapsed: vm.isCollapsed
                        });
                    });
                }
                displayModeChanging = false;

                if (!vm.isCollapsed) {
                    $timeout(function () {
                        $scope.$broadcast('tileRepaint');
                    });
                }

                vm.bbTileCollapsed = vm.isCollapsed;

            });
        }

        //determines whether or not a tile is collapsed
        function tileIsCollapsed(tileId, tiles) {
            var i,
                len = tiles.length,
                tile;

            for (i = 0; i < len; i++) {
                tile = tiles[i];

                if (tile.id === tileId) {
                    return vm.smallTileDisplayMode ? tile.collapsed_small : tile.collapsed;
                }
            }

            return !!vm.smallTileDisplayMode;
        }

        //sets the collapsed state of the tile based on the tile settings and the display mode
        function updateTileState(tiles) {
            var collapsed,
                oldCollapsed;

            tiles = tiles || /*istanbul ignore next: default value */ [];

            oldCollapsed = vm.isCollapsed;

            collapsed = tileIsCollapsed(vm.tileId, tiles);

            if (oldCollapsed === collapsed) {
                displayModeChanging = false;
            }

            vm.isCollapsed = collapsed;

        }

        vm.$onInit = onInit;
       
    }

    BBTileController.$inject = ['$scope', '$timeout', 'bbResources'];

    function bbTile($timeout) {
        function link($scope, el, attrs, ctrls) {
            var dashboardCtrl = ctrls[1],
                vm = ctrls[0],
                dashboardState = {};

            function updateHeaderContent() {
                var wrapperEl;

                vm.hasHeaderContent = !!vm.headerContentEl;

                if (vm.headerContentEl) {
                    wrapperEl = el.find('.bb-tile-header-with-content:first');

                    wrapperEl.append(vm.headerContentEl);
                }
            }

            vm.updateHeaderContent = updateHeaderContent;

            function initializeTile(data) {
                $timeout(function () {
                    var tiles = data.tiles || /*istanbul ignore next */ [];

                    if (!vm.tileInitialized) {
                        //retrieve the tile id from the parent container
                        vm.tileId = el.parent().attr('data-tile-id') || /*istanbul ignore next */ '';
                        vm.smallTileDisplayMode = data.smallTileDisplayMode || false;
                    }

                    vm.updateTileState(tiles);

                    vm.tileInitialized = true;
                });
            }

            //listens for the tilesInitialized event from the tileDashboard and updates the initial collapsed state of the tiles
            $scope.$on('tilesInitialized', function (event, data) {
                /*jslint unparam: true */

                initializeTile(data);
            });

            if (attrs.bbTileCollapsed) {
                $scope.$watch(function () {
                    return vm.bbTileCollapsed;
                }, function (newValue) {
                    vm.isCollapsed = newValue;
                });
            }

            vm.hasSettings = !!attrs.bbTileSettingsClick;

            updateHeaderContent();

            //If the dashboard has already been initialized and this tile hasn't, initialize tile.
            if (dashboardCtrl !== null) {
                if (dashboardCtrl.dashboardInitialized && !vm.tileInitialized) {
                    dashboardState = dashboardCtrl.getDashboardState();
                    initializeTile(dashboardState);
                    dashboardCtrl.layoutTiles();
                }
            }
        }
        return {
            link: link,
            replace: true,
            restrict: 'E',
            require: ['bbTile', '?^^bbTileDashboard'],
            scope: {},
            controller: BBTileController,
            controllerAs: 'bbTile',
            bindToController: {
                bbTileCollapsed: '=?',
                bbTileSettingsClick: '&?',
                tileHeader: '=bbTileHeader'
            },
            templateUrl: 'sky/templates/tiles/tile.html',
            transclude: true
        };
    }

    bbTile.$inject = ['$timeout'];

    function bbTileHeaderContent() {
        return {
            replace: true,
            require: '^bbTile',
            restrict: 'E',
            link: function (scope, el, attrs, tileCtrl) {
                tileCtrl.setHeaderContentEl(el);
            },
            templateUrl: 'sky/templates/tiles/tileheadercontent.html',
            transclude: true
        };
    }

    function bbTileHeaderCheck() {
        return {
            replace: true,
            require: '^bbTileHeaderContent',
            restrict: 'E',
            templateUrl: 'sky/templates/tiles/tileheadercheck.html'
        };
    }

    function bbTileSection() {
        return {
            restrict: 'A',
            template: function (el) {
                el.addClass('bb-tile-content-section');
            }
        };
    }

    function BBTileDashboardController($scope, $timeout) {
        var vm = this;

        function fireDisplayModeChanged() {
            $scope.$broadcast('tileDisplayModeChanged', {
                smallTileDisplayMode: vm.smallTileDisplayMode,
                tiles: vm.tiles
            });
        }

        vm.getDashboardState = function () {
            return {tiles: vm.tiles, smallTileDisplayMode: vm.smallTileDisplayMode};
        };

        vm.layoutTiles = function () {
            /* This timeout is in place to allow a state change to
               complete before laying out tiles
            */
            $timeout(function () {
                vm.layoutTileColumns();
            });
        };

        vm.dashboardInitialized = false;
        vm.smallTileDisplayMode = false;

        vm.fireDisplayModeChanged = fireDisplayModeChanged;

        $scope.$watch(function () {
            return vm.tiles;
        }, function () {
            $timeout(function () {
                vm.layoutTileColumns();
                $scope.$broadcast('tilesInitialized', {
                    smallTileDisplayMode: vm.smallTileDisplayMode,
                    tiles: vm.tiles
                });

                vm.dashboardInitialized = true;
            });
        });

        $scope.$watch(function () {
            return vm.allCollapsed;
        }, function (newValue) {
            var i,
                n,
                tiles = vm.tiles;

            // Check for an explicit true/false here since null/undefined is the
            // indeterminate state.
            if (newValue === true || newValue === false) {
                for (i = 0, n = tiles.length; i < n; i++) {
                    if (vm.smallTileDisplayMode) {
                        tiles[i].collapsed_small = newValue;
                    } else {
                        tiles[i].collapsed = newValue;
                    }
                }

                vm.fireDisplayModeChanged();
            }
        });
    }

    BBTileDashboardController.$inject = ['$scope', '$timeout'];

    function bbTileDashboard($timeout, bbMediaBreakpoints) {

        function link($scope, element, attrs, vm) {
            var column1 = element.find('[data-dashboard-column="1"]'),
                column2 = element.find('[data-dashboard-column="2"]'),
                singleColumnMode = false,
                sortableOptions;

            //Layouts out the tiles based on the current one column or two column configuration
            function layoutTileColumns() {
                var layout = vm.layout;

                if (layout) {
                    if (singleColumnMode) {
                        moveTilesToContainer(element, column1, layout.one_column_layout);
                    } else {
                        moveTilesToContainer(element, column1, layout.two_column_layout[0]);
                        moveTilesToContainer(element, column2, layout.two_column_layout[1]);
                    }
                }
            }

            vm.layoutTileColumns = layoutTileColumns;


            //Inspects the tiles in each column and updates model accordingly.
            function parseColumnTiles() {
                $scope.$apply(function () {
                    var layout = vm.layout;

                    if (singleColumnMode) {
                        layout.one_column_layout = parseTileOrder(column1);
                    } else {
                        layout.two_column_layout[0] = parseTileOrder(column1);
                        layout.two_column_layout[1] = parseTileOrder(column2);
                    }
                });
            }

            function mediabreakpointChangeHandler(breakPoints) {
                singleColumnMode = (breakPoints.xs || breakPoints.sm);
                vm.layoutTileColumns();

                if (singleColumnMode) {
                    element.removeClass('bb-page-content-multicolumn');
                    column2.hide();
                } else {
                    element.addClass('bb-page-content-multicolumn');
                    column2.show();
                }

                vm.smallTileDisplayMode = breakPoints.xs;

                vm.fireDisplayModeChanged();
            }

            //Setup jQuery sortable (drag and drop) options for the dashboard columns
            sortableOptions = {
                connectWith: '[data-dashboard-column]',
                update: parseColumnTiles,
                opacity: 0.8,
                handle: '.bb-tile-grab-handle',
                placeholder: 'placeholder bb-tile',
                forcePlaceholderSize: true,
                revert: 250
            };

            //Setup jQuery sortable drag/drop for the columns
            column1.sortable(sortableOptions);
            column2.sortable(sortableOptions);

            bbMediaBreakpoints.register(mediabreakpointChangeHandler);

            element.on('$destroy', function () {
                bbMediaBreakpoints.unregister(mediabreakpointChangeHandler);
            });

            $scope.$on('tileStateChanged', function (event, data) {
                /*jslint unparam: true */
                $scope.$apply(function () {
                    var allCollapsed = null,
                        collapsed,
                        collapsedProp,
                        i,
                        n,
                        tile,
                        tileId = data.tileId || /*istanbul ignore next */ '',
                        tiles = vm.tiles;

                    collapsed = data.collapsed || false;
                    collapsedProp = vm.smallTileDisplayMode ? 'collapsed_small' : 'collapsed';

                    for (i = 0, n = tiles.length; i < n; i++) {
                        tile = tiles[i];

                        if (tile.id === tileId) {
                            tile[collapsedProp] = collapsed;
                        }

                        if (i > 0 && tile[collapsedProp] !== allCollapsed) {
                            allCollapsed = null;
                        } else {
                            allCollapsed = tile[collapsedProp];
                        }
                    }

                    if (attrs.bbTileDashboardAllCollapsed) {
                        vm.allCollapsed = allCollapsed;
                    }
                });
            });
        }

        return {
            replace: true,
            require: 'bbTileDashboard',
            restrict: 'E',
            bindToController: {
                tiles: '=bbTiles',
                layout: '=bbLayout',
                allCollapsed: '=bbTileDashboardAllCollapsed'
            },
            scope: {},
            link: link,
            controller: BBTileDashboardController,
            controllerAs: 'bbTileDashboard',
            templateUrl: 'sky/templates/tiles/tiledashboard.html'
        };
    }

    bbTileDashboard.$inject = ['$timeout', 'bbMediaBreakpoints'];

    angular.module('sky.tiles', ['sky.mediabreakpoints', 'sky.resources'])
        .directive('bbTile', bbTile)
        .directive('bbTileHeaderContent', bbTileHeaderContent)
        .directive('bbTileHeaderCheck', bbTileHeaderCheck)
        .directive('bbTileSection', bbTileSection)
        .directive('bbTileDashboard', bbTileDashboard);
}());

/*jslint browser: true, plusplus: true */
/*global angular */

(function () {
    'use strict';

    var DEFAULT_TIMEOUT = 10000;

    function nextId() {
        nextId.index = nextId.index || 0;
        nextId.index++;
        return 'bbtoast-' + nextId.index;
    }

    function validateOptions(opts) {
        if (opts.message && opts.templateUrl) {
            throw 'You must not provide both a message and a templateUrl.';
        } else if (!opts.message && !opts.templateUrl) {
            throw 'You must provide either a message or a templateUrl.';
        }

        switch (opts.toastType) {
        case 'info':
        case 'warning':
        case 'success':
        case 'error':
            break;
        case 'danger':
            opts.toastType = 'error';
            break;
        default:
            opts.toastType = 'info';
        }
    }

    angular.module('sky.toast', ['toastr'])
        .config(['toastrConfig', function (toastrConfig) {
            angular.extend(toastrConfig, {
                closeButton: true,
                extendedTimeOut: DEFAULT_TIMEOUT,
                newestOnTop: true,
                positionClass: 'toast-bottom-right',
                tapToDismiss: false,
                timeOut: DEFAULT_TIMEOUT,
                toastClass: 'toast bb-toast'
            });
        }])
        .factory('bbToast', ['toastr', '$templateCache', '$compile', '$controller', '$rootScope', '$q', '$injector', function (toastr, $templateCache, $compile, $controller, $rootScope, $q, $injector) {
            //Based on $modal approach to resolves
            function getResolvePromises(resolves) {
                var promisesArr = [];
                angular.forEach(resolves, function (value) {
                    if (angular.isFunction(value) || angular.isArray(value)) {
                        promisesArr.push($q.when($injector.invoke(value)));
                    }
                });
                return promisesArr;
            }

            function open(message, config, opts) {
                config = config || {};

                config.iconClass = 'bb-toast-' + opts.toastType;

                switch (opts.timeout) {
                case 'infinite':
                    config.timeOut = config.extendedTimeOut = 0;
                    break;
                default:
                    if (!isNaN(opts.timeout)) {
                        config.timeOut = config.extendedTimeOut = +opts.timeout;
                    }
                }

                return toastr[opts.toastType](message, '', config);
            }

            function openMessage(opts) {
                return open(opts.message, null, opts);
            }

            function openWithTemplate(opts) {
                var controller = opts.controller,
                    controllerLocals,
                    elId,
                    resolveIter = 0,
                    resolvesPromise,
                    templateHtml,
                    toast,
                    toastScope;

                function insertTemplateInToast() {
                    var templateEl = toast.el.find('#' + elId);

                    templateEl.html(templateHtml);

                    if (controller) {
                        $controller(controller, controllerLocals);
                        $compile(templateEl)(controllerLocals.$scope);
                    }
                }

                opts.resolve = opts.resolve || {};

                resolvesPromise = $q.all(getResolvePromises(opts.resolve));

                resolvesPromise.then(function (resolvedVars) {
                    if (controller) {
                        controllerLocals = {};
                        controllerLocals.$scope = $rootScope.$new();
                        angular.forEach(opts.resolve, function (value, key) {
                            controllerLocals[key] = resolvedVars[resolveIter++];
                        });
                    }

                    templateHtml = $templateCache.get(opts.templateUrl);

                    elId = nextId();

                    toast = open("<div id='" + elId + "'></div>", { allowHtml: true }, opts);
                    toastScope = toast.scope;

                    //We need to hook in after the toast element has been created and the temporary message
                    //defined above exists, but before the toast is visually displayed.  The toastr code adds
                    //an init function to the scope when the toast directive is being linked.  An EvalAsync
                    //after this occurs will allow us to hook in at the correct moment.
                    toastScope.$watch('init', function () {
                        toastScope.$evalAsync(function () {
                            insertTemplateInToast();
                        });
                    });
                });
            }

            return {
                open: function (opts) {
                    // Clone the options so as we make changes we don't alter the object
                    // passed to us.
                    opts = angular.extend({}, opts);

                    validateOptions(opts);

                    if (opts.templateUrl) {
                        openWithTemplate(opts);
                    } else {
                        openMessage(opts);
                    }
                }
            };
        }]);
}());

/*global angular */

(function () {
    'use strict';

    angular.module('sky.utilities', ['sky.format'])
        .filter('encodeURIComponent', ['$window', function ($window) {
            return function (value) {
                return $window.encodeURIComponent(value);
            };
        }])
        .filter('format', ['bbFormat', function (bbFormat) {
            return function () {
                return bbFormat.formatText.apply(this, arguments);
            };
        }]);
}());

/*global angular */

(function () {
    'use strict';
    angular.module('sky.validation', [])
        .directive('bbEmailValidation', [function () {
            var EMAIL_REGEXP = /[\w\-]+@([\w\-]+\.)+[\w\-]+/;
            return {
                require: 'ngModel',
                restrict: '',
                link: function (scope, elm, attrs, ctrl) {
                    /*jslint unparam: true */
                    if (ctrl && ctrl.$validators.email) {
                        ctrl.$validators.email = function (modelValue) {
                            return ctrl.$isEmpty(modelValue) || EMAIL_REGEXP.test(modelValue);
                        };
                    }
                }
            };
        }]);
}());

/*jslint browser: true, plusplus: true */
/*global angular */

(function () {
    'use strict';

    var CLS_VIEWKEEPER_FIXED = 'bb-viewkeeper-fixed',
        CLS_VIEWKEEPER_NO_OMNIBAR = 'bb-viewkeeper-no-omnibar',
        marginBottomOverrides = [],
        marginTopOverrides = [],
        config = {
            viewportMarginTop: 0,
            hasOmnibar: true
        },
        ViewKeeper;

    function nextId() {
        nextId.index = nextId.index || 0;
        nextId.index++;
        return 'viewkeeper-' + nextId.index;
    }

    function getSpacerId(vk) {
        return vk.id + "-spacer";
    }

    function setElPosition(elQ, left, top, bottom, width) {
        elQ.css({
            "top": top,
            "bottom": bottom,
            "left": left
        });

        /*istanbul ignore else*/
        /* sanity check */
        if (width !== null) {
            elQ.css({ "width": width });
        }
    }

    function fixEl(vk, boundaryInfo, fixedStyles) {
        var elQ = angular.element(vk.el),
            spacerHeight,
            width;

        if (boundaryInfo.spacerQ.length === 0) {
            if (vk.setPlaceholderHeight) {
                spacerHeight = boundaryInfo.elHeight;
            } else {
                spacerHeight = 0;
            }
            elQ.after(
                '<div id="' + 
                boundaryInfo.spacerId + 
                '" style="height: ' + 
                spacerHeight + 
                'px;"></div>'
            );
        }

        elQ.addClass(CLS_VIEWKEEPER_FIXED);

        vk.currentElFixedTop = fixedStyles.elFixedTop;
        vk.currentElFixedBottom = fixedStyles.elFixedBottom;
        vk.currentElFixedLeft = fixedStyles.elFixedLeft;
        vk.currentElFixedWidth = fixedStyles.elFixedWidth;

        if (vk.setWidth) {
            width = fixedStyles.elFixedWidth;
        }

        setElPosition(
            elQ, 
            fixedStyles.elFixedLeft, 
            fixedStyles.elFixedTop, 
            fixedStyles.elFixedBottom, 
            width
        );
    }

    function unfixEl(vk) {
        var elQ = angular.element(vk.el),
            width;

        angular.element("#" + getSpacerId(vk)).remove();

        elQ.removeClass(CLS_VIEWKEEPER_FIXED);

        vk.currentElFixedLeft = null;
        vk.currentElFixedTop = null;
        vk.currentElFixedBottom = null;
        vk.currentElFixedWidth = null;

        if (vk.setWidth) {
            width = "auto";
        }
        setElPosition(elQ, "", "", "", width);
    }

    function getViewportMarginTop() {
        return marginTopOverrides.length > 0 ? 
            marginTopOverrides[marginTopOverrides.length - 1].margin : 
            config.viewportMarginTop;
    }

    function getViewportMarginBottom() {
        return marginBottomOverrides.length > 0 ? 
            marginBottomOverrides[marginBottomOverrides.length - 1].margin : 
            0;
    }

    function calculateVerticalOffset(vk) {
        var offset,
            verticalOffSetElTop;

        offset = vk.verticalOffSet;

        if (vk.verticalOffSetEl) {
            verticalOffSetElTop = vk.verticalOffSetEl.css('top');

            /*istanbul ignore else*/
            /* sanity check */
            if (verticalOffSetElTop) {
                verticalOffSetElTop = parseInt(verticalOffSetElTop, 10);
                if (isNaN(verticalOffSetElTop)) {
                    verticalOffSetElTop = 0;
                }
            }

            offset += (vk.verticalOffSetEl.outerHeight() + verticalOffSetElTop);
        }

        return offset;
    }

    function getBoundaryInfo(vk) {
        var boundaryBottom,
            boundaryOffset,
            boundaryTop,
            boundaryQ,
            documentQ,
            elQ,
            scrollLeft,
            scrollTop,
            spacerId,
            spacerQ,
            elHeight;

        elQ = angular.element(vk.el);

        boundaryQ = angular.element(vk.boundaryEl);
        spacerId = getSpacerId(vk);

        spacerQ = angular.element("#" + spacerId);
        documentQ = angular.element(window.document);

        boundaryOffset = boundaryQ.offset();
        boundaryTop = boundaryOffset.top;
        boundaryBottom = boundaryTop + boundaryQ.height();

        scrollLeft = documentQ.scrollLeft();
        scrollTop = documentQ.scrollTop();

        elHeight = elQ.outerHeight(true);

        return {
            boundaryBottom: boundaryBottom,
            boundaryOffset: boundaryOffset,
            boundaryQ: boundaryQ,
            elHeight: elHeight,
            scrollLeft: scrollLeft,
            scrollTop: scrollTop,
            spacerId: spacerId,
            spacerQ: spacerQ
        };
    }

    function shouldFixEl(vk, boundaryInfo, verticalOffSet) {
        var anchorHeight,
            anchorTop,
            doFixEl,
            elQ;

        elQ = angular.element(vk.el);

        if (boundaryInfo.spacerQ.length > 0) {
            anchorTop = boundaryInfo.spacerQ.offset().top;
            anchorHeight = boundaryInfo.spacerQ.outerHeight(true);
        } else {
            anchorTop = elQ.offset().top;
            anchorHeight = boundaryInfo.elHeight;
        }

        if (vk.fixToBottom) {
            //Fix el if the natural bottom of the element would not be on the screen
            doFixEl = 
                anchorTop + anchorHeight > 
                boundaryInfo.scrollTop + (window.innerHeight - getViewportMarginBottom());
        } else {
            doFixEl = boundaryInfo.scrollTop + verticalOffSet + getViewportMarginTop() > anchorTop;
        }

        return doFixEl;
    }

    function getFixedStyles(vk, boundaryInfo, verticalOffSet) {
        var elFixedBottom,
            elFixedLeft,
            elFixedTop,
            elFixedWidth;

        if (vk.fixToBottom) {
            elFixedBottom = getViewportMarginBottom();
        } else {
            // If the element needs to be fixed, this will calculate its position.  The position 
            // will be 0 (fully visible) unless the user is scrolling the boundary out of view.  
            // In that case, the element should begin to scroll out of view with the
            // rest of the boundary by setting its top position to a negative value.
            elFixedTop = Math.min(
                (boundaryInfo.boundaryBottom - boundaryInfo.elHeight) - boundaryInfo.scrollTop, 
                verticalOffSet
            );
        }

        elFixedWidth = boundaryInfo.boundaryQ.width();
        elFixedLeft = boundaryInfo.boundaryOffset.left - boundaryInfo.scrollLeft;

        return {
            elFixedBottom: elFixedBottom,
            elFixedLeft: elFixedLeft,
            elFixedTop: elFixedTop,
            elFixedWidth: elFixedWidth
        };
    }

    function needsUpdating(vk, doFixEl, fixedStyles) {
        if (
            (
                doFixEl && 
                vk.currentElFixedLeft === fixedStyles.elFixedLeft && 
                vk.currentElFixedTop === fixedStyles.elFixedTop && 
                vk.currentElFixedBottom === fixedStyles.elFixedBottom && 
                vk.currentElFixedWidth === fixedStyles.elFixedWidth
            ) || 
            (
                !doFixEl && 
                !(vk.currentElFixedLeft !== undefined && vk.currentElFixedLeft !== null)
            )
        ) {
            // The element is either currently fixed and its position and width do not need 
            // to change, or the element is not currently fixed and does not need to be fixed.  
            // No changes are needed.
            return false;
        }

        return true;
    }

    ViewKeeper = function (options) {
        var id,
            vk = this;

        options = options || /* istanbul ignore next */ {};

        vk.fixToBottom = options.fixToBottom;
        vk.setWidth = options.setWidth;
        vk.id = id = nextId();
        vk.el = options.el;
        vk.boundaryEl = options.boundaryEl;
        vk.verticalOffSet = options.verticalOffSet || 0;
        vk.setPlaceholderHeight = (options.setPlaceholderHeight !== false);
        vk.onStateChanged = options.onStateChanged;
        vk.isFixed = false;
        
        if (options.verticalOffSetElId) {
            vk.verticalOffSetEl = angular.element('#' + options.verticalOffSetElId);

            vk.verticalOffSetEl.on('afterViewKeeperSync.' + id, function () {
                vk.syncElPosition();
            });
        }

        angular.element(window).on("scroll." + id + ", resize." + id + ", orientationchange." + id, function () {
            vk.syncElPosition();
        });
    };

    ViewKeeper.prototype = {

        syncElPosition: function () {
            var boundaryInfo,
                doFixEl,
                isCurrentlyFixed,
                fixedStyles,
                elQ,
                verticalOffSet,
                vk = this;

            isCurrentlyFixed = vk.isFixed;

            verticalOffSet = calculateVerticalOffset(vk);

            elQ = angular.element(vk.el);

            // When the element isn't visible, its size can't be calculated, so don't attempt syncing position in this case.
            if (!elQ.is(':visible')) {
                return;
            }

            boundaryInfo = getBoundaryInfo(vk);
            fixedStyles = getFixedStyles(vk, boundaryInfo, verticalOffSet);

            doFixEl = shouldFixEl(vk, boundaryInfo, verticalOffSet);

            if (needsUpdating(vk, doFixEl, fixedStyles)) {
                if (doFixEl) {
                    vk.isFixed = true;
                    fixEl(vk, boundaryInfo, fixedStyles);
                } else {
                    vk.isFixed = false;
                    unfixEl(vk);
                }

                //If we changed if the item is fixed, fire the callback
                if (vk.onStateChanged && isCurrentlyFixed !== vk.isFixed) {
                    vk.onStateChanged();
                }
            }
            elQ.trigger('afterViewKeeperSync');
        },

        scrollToTop: function () {
            var anchorTop,
                elQ,
                documentQ,
                spacerId,
                spacerQ,
                verticalOffset,
                vk = this;

            verticalOffset = calculateVerticalOffset(vk);

            documentQ = angular.element(window.document);
            spacerId = getSpacerId(vk);
            spacerQ = angular.element("#" + spacerId);
            elQ = angular.element(vk.el);

            if (spacerQ.length > 0) {
                anchorTop = spacerQ.offset().top;
            } else {
                anchorTop = elQ.offset().top;
            }

            documentQ.scrollTop(anchorTop - verticalOffset - getViewportMarginTop());
        },

        destroy: function () {
            var id,
                vk = this;

            if (!vk.isDestroyed) {
                id = vk.id;

                angular.element(window).off("scroll." + id + ", resize." + id + ", orientationchange." + id);
                unfixEl(vk);

                if (vk.verticalOffSetEl) {
                    vk.verticalOffSetEl.off("afterViewKeeperSync." + vk.id);
                    vk.verticalOffSetEl = null;
                }

                vk.isDestroyed = true;
            }
        }

    };

    angular.module('sky.viewkeeper', ['sky.mediabreakpoints', 'sky.window'])
        .constant('bbViewKeeperConfig', config)
        .factory('bbViewKeeperBuilder', function () {
            return {
                create: function (options) {
                    return new ViewKeeper(options);
                },
                addViewportMarginBottomOverride: function (value) {
                    marginBottomOverrides.push(value);
                },
                removeViewportMarginBottomOverride: function (value) {
                    var index = marginBottomOverrides.indexOf(value);

                    /*istanbul ignore else */
                    if (index > -1) {
                        marginBottomOverrides.splice(index, 1);
                    }
                },
                addViewportMarginTopOverride: function (value) {
                    marginTopOverrides.push(value);
                },
                removeViewportMarginTopOverride: function (value) {
                    var index = marginTopOverrides.indexOf(value);

                    /*istanbul ignore else */
                    if (index > -1) {
                        marginTopOverrides.splice(index, 1);
                    }
                }
            };
        })
        .run(['$document', '$window', 'bbMediaBreakpoints', 'bbViewKeeperConfig', function ($document, $window, bbMediaBreakpoints, bbViewKeeperConfig) {
            function mediaBreakpointHandler(breakpoints) {
                //For user agents in which the omnibar follows you down the page, the ViewKeeper needs
                //to adjust for the height of the omnibar.
                if (bbViewKeeperConfig.hasOmnibar) {
                    //Ideally these values should be driven from a more appropriate source (omnibar js?)
                    bbViewKeeperConfig.viewportMarginTop = breakpoints.xs ? 50 : 30;
                    angular.element('body').removeClass(CLS_VIEWKEEPER_NO_OMNIBAR);
                } else {
                    angular.element('body').addClass(CLS_VIEWKEEPER_NO_OMNIBAR);
                }
            }

            if (/iPad|iPod|iPhone/i.test($window.navigator.userAgent)) {
                //On iOS the omnibar doesn't scroll with you.  Need to account for this on the styling.
                angular.element('body').addClass('omnibar-not-fixed');

                //On iOS we need to have special handling when entering textboxes to correct an issue with fixed
                //elements used by view keeper when the keyboard flys out.
                angular.element(document).on('focus', 'input', function () {
                    angular.element('body').addClass('bb-viewkeeper-ignore-fixed');
                }).on('blur', 'input', function () {
                    angular.element('body').removeClass('bb-viewkeeper-ignore-fixed');
                });
            } else {
                bbMediaBreakpoints.register(mediaBreakpointHandler);
            }
        }])
        .directive('bbViewKeeper', ['bbViewKeeperBuilder', function (bbViewKeeperBuilder) {
            function link(scope, el) {
                var vk;

                function destroyVk() {
                    if (vk) {
                        vk.destroy();
                        vk = null;
                    }
                }

                el.on('$destroy', function () {
                    destroyVk();
                });

                scope.$watch('bbBoundaryElId', function () {
                    var boundaryEl,
                        bbBoundaryElId = scope.bbBoundaryElId;

                    /*istanbul ignore else */
                    if (bbBoundaryElId) {
                        boundaryEl = angular.element('#' + bbBoundaryElId);

                        /*istanbul ignore else */
                        if (boundaryEl.length === 1) {
                            destroyVk();

                            vk = bbViewKeeperBuilder.create({
                                el: el[0],
                                boundaryEl: boundaryEl[0],
                                setWidth: true
                            });
                        }
                    }
                });
            }
            return {
                link: link,
                restrict: 'A',
                scope: {
                    bbBoundaryElId: '='
                }
            };
        }])
        .directive('bbScrollingViewKeeper', ['$window', 'bbWindow', function ($window, bbWindow) {
            return {
                scope: {
                    bbScrollingViewKeeper: "="
                },
                link: function (scope, element) {
                    var elementStart,
                        scrollPos,
                        prevScroll,
                        scrollingDown = true,
                        tempTop,
                        verticalOffset,
                        id = scope.$id;

                    function scroll() {
                        if (!element.is(':visible')) {
                            return;
                        }

                        if (angular.element('.bb-omnibar>.desktop').is(':visible')) {
                            verticalOffset = angular.element('.bb-omnibar>.desktop>.bar').outerHeight();
                        } else {
                            verticalOffset = 0;
                        }

                        if (scope.bbScrollingViewKeeper && scope.bbScrollingViewKeeper.viewKeeperOffsetElId) {
                            verticalOffset += angular.element('#' + scope.bbScrollingViewKeeper.viewKeeperOffsetElId).outerHeight();
                        }

                        if (!elementStart) {
                            elementStart = element.offset().top;
                        }
                        scrollPos = $window.scrollY || $window.pageYOffset || $window.document.body.scrollTop || 0;
                        if (prevScroll > scrollPos) {
                            scrollingDown = false;
                        } else {
                            scrollingDown = true;
                        }
                        prevScroll = scrollPos;

                        if (scrollPos >= elementStart - verticalOffset && element.height() + verticalOffset <= $window.document.body.offsetHeight) {
                            if (element.height() + verticalOffset < $window.innerHeight) {
                                tempTop = 0;

                                element.removeClass('bb-grid-filters-fixed-bottom').addClass('bb-grid-filters-fixed-top');

                                element.css({
                                    top: verticalOffset + 'px'
                                });
                            } else if (scrollingDown) {
                                if (element.offset().top + element.height() >= scrollPos + $window.innerHeight) {
                                    /*istanbul ignore else*/
                                    /* sanity check */
                                    if (!tempTop) {
                                        tempTop = element.offset().top - elementStart;
                                    }

                                    element.removeClass('bb-grid-filters-fixed-top bb-grid-filters-fixed-bottom');

                                    element.css({
                                        top: tempTop
                                    });
                                } else {
                                    tempTop = 0;
                                    element.css({
                                        top: ''
                                    });
                                    element.removeClass('bb-grid-filters-fixed-top').addClass('bb-grid-filters-fixed-bottom');
                                }
                            } else {
                                if (element.offset().top < scrollPos + verticalOffset) {
                                    /*istanbul ignore else*/
                                    /* sanity check */
                                    if (!tempTop) {
                                        tempTop = element.offset().top - elementStart;
                                    }

                                    element.removeClass('bb-grid-filters-fixed-top bb-grid-filters-fixed-bottom ');

                                    element.css({
                                        top: tempTop
                                    });
                                } else {
                                    tempTop = 0;

                                    element.removeClass('bb-grid-filters-fixed-bottom').addClass('bb-grid-filters-fixed-top');

                                    element.css({
                                        top: verticalOffset + 'px'
                                    });
                                }
                            }
                        } else {
                            tempTop = 0;
                            element.removeClass('bb-grid-filters-fixed-top bb-grid-filters-fixed-bottom grid-filters-fixed-top grid-filters-fixed-bottom');
                            element.css({
                                top: 0
                            });
                        }
                    }

                    if (!bbWindow.isIosUserAgent()) {
                        angular.element($window).on('scroll.' + id + ', orientationchange.' + id, scroll);

                        element.on('$destroy', function () {
                            angular.element($window).off("scroll." + id + ", orientationchange." + id);
                        });
                    }
                },
                restrict: 'A'
            };
        }]);
}());

/*jslint browser: true */
/*global angular */

(function () {
    'use strict';

    angular.module('sky.wait.directive', [])
        .directive('bbWait', ['bbWait', function (bbWait) {
            /// <summary>
            /// This directive provides an attribute that can be placed on elements indicating whether they should or shouldn't be blocked for waiting.
            /// </summary>
            return {
                restrict: 'A',
                link: function (scope, el, attrs) {
                    var firstScopeLoad = true;
                    scope.$watch(attrs.bbWait, function (value, oldValue) {
                        if (value && (!oldValue || firstScopeLoad)) {
                            bbWait.beginElWait(el);
                        } else if (oldValue && !value) {
                            bbWait.endElWait(el);
                        }
                        firstScopeLoad = false;
                    });
                }
            };
        }]);
}());

/*jslint browser: true */
/*global angular, jQuery */

(function ($) {
    'use strict';

    angular.module('sky.wait.factory', [])
        .factory('bbWait', ['$timeout', function ($timeout) {

            var addWait,
                removeWait,
                clearBlockOptions,
                fullPageClearBlockOptions,
                fullPageVisibleBlockOptions,
                fullPageZIndex = 20000,
                nonBlockWaitCountAttr = 'bb-wait-non-block-count',
                visibleBlockOptions,
                showingWaitAttr = 'bb-wait-showingwait',
                waitCountAttr = 'bb-wait-count';

            visibleBlockOptions = {
                message: '<div class="bb-wait-wrap"><div class="bb-wait-spinner"></div></div>'
            };

            clearBlockOptions = {
                message: "",
                fadeOut: 0,
                fadeIn: 0,
                overlayCSS: {
                    opacity: 0
                }
            };

            fullPageClearBlockOptions = angular.copy(clearBlockOptions);
            fullPageClearBlockOptions.overlayCSS["z-index"] = fullPageZIndex;

            fullPageVisibleBlockOptions = angular.copy(visibleBlockOptions);
            fullPageVisibleBlockOptions.overlayCSS = { "z-index": fullPageZIndex };
            fullPageVisibleBlockOptions.css = { "z-index": fullPageZIndex + 1 };

            function isBlockUISupported() {
                // Returns whether jquery.blockUI is loaded.
                return ($ && $.blockUI);
            }

            function isFullPage(el) {
                // Returns whether the element specified should be causing a
                // full page wait rather than just on the element itself.
                return $(el)[0] === document.body;
            }

            function getWaitCount(el, nonblocking) {
                // Returns the elements current wait count
                var attr = nonblocking ? nonBlockWaitCountAttr : waitCountAttr;
                return parseInt($(el).data(attr) || 0, 10);
            }

            function setWaitCount(el, count, nonblocking) {
                var attr = nonblocking ? nonBlockWaitCountAttr : waitCountAttr;

                // Sets the elements current wait count
                if (!count) {
                    $(el).removeData(attr);
                } else {
                    $(el).data(attr, count);
                }
            }

            function nonblockEl(el, options) {
                var childOptions = angular.extend({}, options),
                    nonblock = $(el).children(".bb-wait-nonblock");

                if (nonblock.length === 0) {
                    nonblock = $("<div class='bb-wait-nonblock'></div>");
                    $(el).append(nonblock);
                    $(nonblock).click(function () {
                        nonblock.hide();
                    });
                }
                nonblock.show();

                childOptions.nonblocking = false;

                addWait(nonblock[0], childOptions);
            }

            function unNonblockEl(el, options) {
                var childOptions = angular.extend({}, options),
                    nonblock = $(el).children(".bb-wait-nonblock");

                if (nonblock.length > 0) {
                    childOptions.nonblocking = false;
                    removeWait(nonblock[0], childOptions);
                }
            }

            function blockEl(el, options) {
                // Shows the element block UI.

                var customBlockOptions,
                    $el = $(el);

                if (!isBlockUISupported()) {
                    return;
                }

                /* istanbul ignore if: this doesn't seem ever be hit; maybe revisit. */
                if ($el.data(showingWaitAttr)) {
                    // If we're already showing the block, then don't start this again.
                    // Using a different flag than the count itself to support delaying the unblock.
                    return;
                }

                function showFullBlock() {
                    /* istanbul ignore if: this doesn't seem ever be hit; maybe revisit. */
                    if (!$el.data(showingWaitAttr)) {
                        // If we're no longer showing the wait then the block was removed before the visible block was added.
                        // We shouldn't continue to add the visible block.
                        return;
                    }

                    if (isFullPage(el)) {
                        $.blockUI(angular.extend({}, fullPageVisibleBlockOptions, customBlockOptions));
                    } else {
                        $el.block(angular.extend({}, visibleBlockOptions, customBlockOptions));
                    }
                }

                options = angular.extend({}, {
                    visualBlockDelay: 300
                }, options || /* istanbul ignore next */ {});

                customBlockOptions = {
                    fadeIn: options.fadeIn
                };

                $el.data(showingWaitAttr, true);

                if (options.visualBlockDelay) {
                    if (isFullPage(el)) {
                        $.blockUI(fullPageClearBlockOptions);
                    } else {
                        $el.block(clearBlockOptions);
                    }

                    $timeout(showFullBlock, options.visualBlockDelay);
                } else {
                    showFullBlock();
                }
            }

            function unblockEl(el) {
                // Removes the element block UI.

                // Including a setTimeout here so that if a block is immediately re-added, then there won't be a blink
                // between turning off the current block and then adding another.
                // This timeout could default to something higher than 0 or we could make it configurable if needed.
                // A set timeout of 0 handles blocks added without async operations before starting another, which
                // would indicate that the block should have been maintained anyways.
                $timeout(function () {
                    var $el;

                    /* istanbul ignore else*/
                    /* sanity check */
                    if (getWaitCount(el) === 0) {
                        $el = $(el);

                        if (!isBlockUISupported()) {
                            return;
                        }

                        if (isFullPage(el)) {
                            $.unblockUI();
                        } else {
                            $el.unblock();
                        }
                        $el.removeData(showingWaitAttr);
                    }
                }, 0);
            }

            addWait = function (el, options) {
                var count;
                options = options || {};

                // Increases the element wait count and shows the wait if the count is above 0.
                count = getWaitCount(el, options.nonblocking);
                count += 1;

                setWaitCount(el, count, options.nonblocking);
                if (count === 1) {
                    if (options.nonblocking) {
                        nonblockEl(el, options);
                    } else {
                        blockEl(el, options);
                    }
                }
            };

            removeWait = function (el, options) {
                var count;
                options = options || {};

                // Decreases the element wait count and hides the wait if the count is at 0.
                count = getWaitCount(el, options.nonblocking);
                if (count > 0) {
                    count -= 1;

                    setWaitCount(el, count, options.nonblocking);
                    if (count === 0) {
                        if (options.nonblocking) {
                            unNonblockEl(el, options);
                        } else {
                            unblockEl(el, options);
                        }
                    }
                }
            };

            function clearAllWaits(el) {
                // Forcibly clears out the wait count for an element
                setWaitCount(el, 0);
                unblockEl(el);
                setWaitCount(el, 0, true);
                unNonblockEl(el);
            }

            if (isBlockUISupported()) {
                // Clear any blockUI defaults.  Specifying these in the block call itself just gets appended to the defaults
                // but is incapable of generically clearing them all.
                $.blockUI.defaults.css = {};
                $.blockUI.defaults.overlayCSS = {};
            }

            return {
                beginElWait: function (el, options) {
                    addWait(el, options);
                },
                beginPageWait: function (options) {
                    addWait(document.body, options);
                },
                clearElWait: function (el) {
                    clearAllWaits(el);
                },
                clearPageWait: function () {
                    clearAllWaits(document.body);
                },
                endElWait: function (el, options) {
                    removeWait(el, options);
                },
                endPageWait: function (options) {
                    removeWait(document.body, options);
                }
            };
        }]);

}(jQuery));


/*global angular*/

(function () {
    'use strict';

    angular.module('sky.window', [])
        .constant('bbWindowConfig', {
            productName: ''
        })
        .factory('bbWindow', ['$window', 'bbWindowConfig', '$timeout', '$document', function ($window, bbWindowConfig, $timeout, $document) {
            var scrollbarWidth;

            function calculateScrollbarWidth() {
                var inner,
                    outer,
                    w1,
                    w2;

                inner = angular.element('<p></p>');
                inner.css('width', '100%');
                inner.css('height', '200px');

                outer = angular.element('<div></div>');
                outer.css('position', 'absolute');
                outer.css('top', '0px');
                outer.css('left', '0px');
                outer.css('visibility', 'hidden');
                outer.css('width', '200px');
                outer.css('height', '150px');
                outer.css('overflow', 'hidden');

                outer.append(inner);

                $document.find('body').append(outer);

                w1 = inner[0].offsetWidth;

                outer.css('overflow', 'scroll');
                w2 = inner[0].offsetWidth;

                /*istanbul ignore next: sanity check */
                if (w1 === w2) {
                    w2 = outer[0].clientWidth;
                }
                outer.remove();
                return (w1 - w2);
            }

            return {
                setWindowTitle: function (title) {
                    var textToAppend = bbWindowConfig.productName;

                    if (textToAppend) {
                        title = title || '';

                        if (title) {
                            title += ' - ';
                        }

                        title += textToAppend;
                    }

                    //Adding a delay so the setWindowTitle method can be safely called after an angular
                    //state change without taking affect until after the browser has completed its
                    //state change.  Without this, the previous page will be renamed in the browser history.
                    $timeout(function () {
                        $window.document.title = title;
                    });
                },
                getScrollbarWidth: function () {
                    if (!scrollbarWidth && scrollbarWidth !== 0) {
                        scrollbarWidth = calculateScrollbarWidth();
                    }

                    return scrollbarWidth;
                },
                isIosUserAgent: function () {
                    return /iPad|iPod|iPhone/i.test($window.navigator.userAgent);
                }
            };
        }]);
}());

/*jslint browser: true, plusplus: true */
/*global angular */

(function () {
    'use strict';

    angular.module('sky.wizard', ['sky.resources', 'sky.tabset', 'ui.bootstrap.tabs'])
        .directive('bbWizard', function () {
            return {
                link: function (scope, el) {
                    /*jslint unparam: true */
                    el.addClass('bb-wizard');
                },
                restrict: 'A'
            };
        })
        .directive('bbWizardStepComplete', function () {
            return {
                link: function (scope, el, attrs) {
                    scope.$watch(attrs.bbWizardStepComplete, function (newValue) {
                        el[newValue ? 'addClass' : 'removeClass']('bb-wizard-step-complete');
                    });
                }
            };
        })
        .factory('bbWizardNavigator', ['bbResources', function (bbResources) {
            function stepIsDisabled(step) {
                return angular.isFunction(step.disabled) && step.disabled();
            }

            return {
                init: function (options) {
                    /*jslint unparam: true */
                    var steps,
                        finish;

                    function getPreviousStep() {
                        var i,
                            index,
                            n,
                            previousStep,
                            step;
                        for (i = 0, n = steps.length; i < n; i++) {
                            step = steps[i];
                            index = step.index || i;

                            if ((step.active || options.active === index) && i > 0) {
                                previousStep = steps[i - 1];

                                if (!stepIsDisabled(previousStep)) {
                                    if (angular.isDefined(options.active)) {
                                        return previousStep.index || (i - 1);
                                    } else {
                                        return previousStep;
                                    }

                                }

                                break;
                            }
                        }

                        return null;
                    }

                    function getNextStep() {
                        var i,
                            index,
                            n,
                            nextStep,
                            step;

                        for (i = 0, n = steps.length; i < n; i++) {
                            step = steps[i];
                            index = step.index || i;

                            if ((step.active || options.active === index) && i + 1 < n) {
                                nextStep = steps[i + 1];

                                if (!stepIsDisabled(nextStep)) {
                                    if (angular.isDefined(options.active)) {
                                        return nextStep.index || (i + 1); // There can be a custom index name, or the position of the tab
                                    } else {
                                        return nextStep;
                                    }

                                }

                                break;
                            }
                        }

                        return null;
                    }

                    function setActiveStep(step) {
                        if (step !== null) {
                            if (angular.isDefined(options.active)) {
                                options.active = step;
                            } else {
                                step.active = true;
                            }

                        }

                    }

                    function lastStepIsActive() {
                        if (angular.isDefined(options.active)) {
                            return options.active === steps[steps.length - 1].index || options.active === steps.length - 1;
                        } else {
                            return steps[steps.length - 1].active;
                        }

                    }

                    options = options || {};

                    steps = options.steps;
                    finish = options.finish;

                    return {
                        previousText: function () {
                            return bbResources.wizard_navigator_previous;
                        },
                        nextText: function () {
                            return lastStepIsActive() ? bbResources.wizard_navigator_finish : bbResources.wizard_navigator_next;
                        },
                        goToPrevious: function () {
                            setActiveStep(getPreviousStep());
                        },
                        goToNext: function () {
                            if (lastStepIsActive()) {

                                if (angular.isFunction(finish)) {
                                    finish();
                                }
                            } else {
                                setActiveStep(getNextStep());
                            }

                        },
                        previousDisabled: function () {
                            return getPreviousStep() === null;
                        },
                        nextDisabled: function () {
                            return (getNextStep() === null) && !lastStepIsActive();
                        }
                    };
                }
            };
        }]);
}());

/*jslint browser: true */
/*global angular */

(function () {
    'use strict';

    var modules = [
        'sky.accordion',
        'sky.actionbar',
        'sky.alert',
        'sky.autonumeric',
        'sky.avatar',
        'sky.card',
        'sky.carousel',
        'sky.check',
        'sky.checklist',
        'sky.chevron',
        'sky.contextmenu',
        'sky.data',
        'sky.datepicker',
        'sky.daterangepicker',
        'sky.definitionlist', 
        'sky.error',
        'sky.format',
        'sky.filter',
        'sky.grids',
        'sky.help',
        'sky.helpbutton',
        'sky.highlight',
        'sky.infinitescroll',
        'sky.keyinfo',
        'sky.listbuilder',
        'sky.mediabreakpoints',
        'sky.modal',
        'sky.moment',
        'sky.navbar',
        'sky.omnibar',
        'sky.palette',
        'sky.page',
        'sky.pagesummary',
        'sky.pagination',
        'sky.phonefield',
        'sky.popover',
        'sky.reorder',
        'sky.reordertable',
        'sky.repeater',
        'sky.resources',
        'sky.scrollintoview',
        'sky.search',
        'sky.sectionedform',
        'sky.selectfield',
        'sky.sort',
        'sky.summary.actionbar',
        'sky.tabscroll',
        'sky.tabset',
        'sky.tabsref',
        'sky.templates',
        'sky.templating',
        'sky.textexpand',
        'sky.tiles',
        'sky.utilities',
        'sky.validation',
        'sky.viewkeeper',
        'sky.wait',
        'sky.window',
        'sky.wizard'
    ];

    try {
        angular.module('toastr');
        modules.push('sky.toast');
    } catch (ignore) {
        /* The toastr module isn't defined.  Do not load sky.toast module */
    }

    try {
        angular.module('ngFileUpload');
        modules.push('sky.fileattachments');
    } catch (ignore) {

    }

    angular.module('sky', modules);

}());

/*jshint unused: false */
/*global angular */

(function () {
'use strict';

var bbResourcesOverrides;

bbResourcesOverrides = {"action_bar_actions":"Actions","alert_close":"Close","autonumeric_abbr_billions":"b","autonumeric_abbr_millions":"m","autonumeric_abbr_thousands":"k","avatar_error_not_image_description":"Please choose a file that is a valid image.","avatar_error_not_image_title":"File is not an image.","avatar_error_too_large_description":"Please choose an image that is less than {0}.","avatar_error_too_large_title":"File is too large.","card_select":"Select card","carousel_button_label_next":"Go to next item","carousel_button_label_previous":"Go to previous item","carousel_dot_label":"Go to item {0}","checklist_select_all":"Select all","checklist_clear_all":"Clear all","checklist_only_selected_items":"Only show selected items","checklist_no_items":"No items found","checklist_check_title":"Select item","checklist_search_label":"Search","checklist_categories_label":"Categories","chevron_collapse":"Collapse","chevron_expand":"Expand","context_menu_default_label":"Context menu","definition_list_none_found":"None found","grid_back_to_top":"Back to top","grid_column_picker_all_categories":"All categories","grid_column_picker_description_header":"Description","grid_column_picker_header":"Choose columns to show in the list","grid_column_picker_name_header":"Column","grid_column_picker_search_placeholder":"Search by name","grid_column_picker_submit":"Apply changes","grid_columns_button":" Choose columns","grid_filters_apply":"Apply filters","grid_filters_button":"Filters","grid_filters_clear":"Clear","grid_filters_header":"Filter","grid_filters_hide":"Hide","grid_filters_summary_header":"Filter:","grid_load_more":"Load more","grid_search_placeholder":"Find in this list","grid_column_picker_search_no_columns":"No columns found","infinite_scroll_load_more":"Load more","modal_footer_cancel_button":"Cancel","modal_footer_primary_button":"Save","month_short_april":"Apr","month_short_august":"Aug","month_short_december":"Dec","month_short_february":"Feb","month_short_january":"Jan","month_short_july":"Jul","month_short_june":"Jun","month_short_march":"Mar","month_short_may":"May","month_short_november":"Nov","month_short_october":"Oct","month_short_september":"Sep","page_noaccess_button":"Return to a non-classified page","page_noaccess_description":"Sorry, you don't have rights to this page.\nIf you feel you should, please contact your system administrator.","page_noaccess_header":"Move along, there's nothing to see here","text_expand_see_less":"See less","text_expand_see_more":"See more","text_expand_modal_title":"Expanded view","text_expand_close_text":"Close","grid_action_bar_clear_selection":"Clear selection","grid_action_bar_cancel_mobile_actions":"Cancel","grid_action_bar_choose_action":"Choose an action","date_field_invalid_date_message":"Please enter a valid date","date_range_picker_this_week":"This week","date_range_picker_last_week":"Last week","date_range_picker_next_week":"Next week","date_range_picker_this_month":"This month","date_range_picker_last_month":"Last month","date_range_picker_next_month":"Next month","date_range_picker_this_calendar_year":"This calendar year","date_range_picker_last_calendar_year":"Last calendar year","date_range_picker_next_calendar_year":"Next calendar year","date_range_picker_this_fiscal_year":"This fiscal year","date_range_picker_last_fiscal_year":"Last fiscal year","date_range_picker_next_fiscal_year":"Next fiscal year","date_range_picker_this_quarter":"This quarter","date_range_picker_last_quarter":"Last quarter","date_range_picker_next_quarter":"Next quarter","date_range_picker_at_any_time":"At any time","date_range_picker_today":"Today","date_range_picker_tomorrow":"Tomorrow","date_range_picker_yesterday":"Yesterday","date_range_picker_specific_range":"Specific range","date_range_picker_filter_description_this_week":"{0} for this week","date_range_picker_filter_description_last_week":"{0} from last week","date_range_picker_filter_description_next_week":"{0} for next week","date_range_picker_filter_description_this_month":"{0} for this month","date_range_picker_filter_description_last_month":"{0} from last month","date_range_picker_filter_description_next_month":"{0} for next month","date_range_picker_filter_description_this_calendar_year":"{0} for this calendar year","date_range_picker_filter_description_last_calendar_year":"{0} from last calendar year","date_range_picker_filter_description_next_calendar_year":"{0} for next calendar year","date_range_picker_filter_description_this_fiscal_year":"{0} for this fiscal year","date_range_picker_filter_description_last_fiscal_year":"{0} from last fiscal year","date_range_picker_filter_description_next_fiscal_year":"{0} for next fiscal year","date_range_picker_filter_description_this_quarter":"{0} for this quarter","date_range_picker_filter_description_last_quarter":"{0} from last quarter","date_range_picker_filter_description_next_quarter":"{0} for next quarter","date_range_picker_filter_description_at_any_time":"{0} at any time","date_range_picker_filter_description_today":"{0} for today","date_range_picker_filter_description_yesterday":"{0} from yesterday","date_range_picker_filter_description_tomorrow":"{0} for tomorrow","date_range_picker_filter_description_specific_range":"{0} from {1} to {2}","date_range_picker_from_date":"From date","date_range_picker_to_date":"To date","date_range_picker_min_date_error":"End date must be after start date","date_range_picker_max_date_error":"Start date must be before end date","errormodal_ok":"OK","error_description_broken":"Try to refresh this page or come back later.","error_description_construction":"Thanks for your patience while improvements are made!\nPlease check back in a little while.","error_title_broken":"Sorry, something went wrong.","error_title_construction":"This page will return soon.","error_title_notfound":"Sorry, we can't reach that page.","file_size_b_plural":"{0} bytes","file_size_b_singular":"{0} byte","file_size_kb":"{0} KB","file_size_mb":"{0} MB","file_size_gb":"{0} GB","file_upload_drag_or_click":"Drag a file here or click to browse","file_upload_drag_file_here":"Drag a file here","file_upload_drop_files_here":"Drop files here","file_upload_invalid_file":"This file type is invalid","file_upload_link_placeholder":"http://www.something.com/file","file_upload_or_click_to_browse":"or click to browse","file_upload_paste_link":"Paste a link to a file","file_upload_paste_link_done":"Done","file_upload_link_input":"Add a link to a file","file_item_delete":"Delete file","help_button_label":"Open help","listbuilder_footer_back_to_top":"Back to top","listbuilder_add_title":"Add","listbuilder_card_switcher":"Switch to card view","listbuilder_grid_switcher":"Switch to grid view","listbuilder_repeater_switcher":"Switch to repeater view","listbuilder_show_only_selected":"Show only selected","listbuilder_multiselect_select_all":"Select all","listbuilder_multiselect_clear_all":"Clear all","listbuilder_pick_columns":"Choose columns","listbuilder_show_secondary_actions":"Show secondary actions","modal_close":"Close modal","search_label":"Search items","search_open":"Open search","search_dismiss":"Dismiss search","search_placeholder":"Find in this list","searchfield_searching":"Searching...","searchfield_no_records":"Sorry, no matching records found","selectfield_summary_text":"{0} items selected","selectfield_remove":"Remove","selectfieldpicker_select":"Select","selectfieldpicker_select_value":"Select value","selectfieldpicker_select_values":"Select values","selectfieldpicker_clear":"Clear selection","tile_chevron_label":"Expand or collapse","wizard_navigator_finish":"Finish","wizard_navigator_next":"Next","wizard_navigator_previous":"Previous","datepicker_today":"Today","datepicker_clear":"Clear","datepicker_close":"Done","datepicker_open":"Open datepicker","reorder_top":"Top","tab_add":"Add tab","tab_open":"Open","filter_modal_apply":"Apply filters","filter_modal_clear":"Clear all filters","filter_button_title":"Filters","filter_summary_header":"Filter","filter_summary_close":"Close","sort_menu_heading":"Sort by","sort_button_label":"Sort","summary_actionbar_open_secondary":"Show secondary actions","summary_actionbar_show_summary":"Show summary","summary_actionbar_hide_summary":"Hide summary","pagination_previous":"Previous","pagination_next":"Next"};

angular.module('sky.resources')
    .config(['bbResources', function (bbResources) {
        angular.extend(bbResources, bbResourcesOverrides);
    }]);
}());

angular.module('sky.templates', []).run(['$templateCache', function($templateCache) {
    $templateCache.put('sky/templates/accordion/uib.accordiongroup.directive.html',
        '<div class="panel" ng-class="panelClass || \'panel-default\'">\n' +
        '  <div role="tab" id="{{::headingId}}" aria-selected="{{isOpen}}" class="panel-heading" ng-keypress="toggleOpen($event)">\n' +
        '    <h4 class="panel-title">\n' +
        '      <a role="button" data-toggle="collapse" href aria-expanded="{{isOpen}}" aria-controls="{{::panelId}}" tabindex="0" class="accordion-toggle" ng-click="toggleOpen()" uib-accordion-transclude="heading"><span uib-accordion-header ng-class="{\'text-muted\': isDisabled}">{{heading}}</span></a>\n' +
        '    </h4>\n' +
        '  </div>\n' +
        '  <div id="{{::panelId}}" aria-labelledby="{{::headingId}}" aria-hidden="{{!isOpen}}" role="tabpanel" class="panel-collapse collapse" uib-collapse="!isOpen">\n' +
        '    <div class="panel-body" ng-transclude></div>\n' +
        '  </div>\n' +
        '</div>');
    $templateCache.put('sky/templates/actionbar/actionbar.html',
        '<div class="bb-action-bar">\n' +
        '    <ng-transclude></ng-transclude>\n' +
        '</div>\n' +
        '');
    $templateCache.put('sky/templates/actionbar/actionbaritem.html',
        '<button class="btn bb-btn-secondary bb-action-bar-item-button" type="button" ng-attr-aria-label="{{bbActionBarItem.bbActionBarItemLabel}}">\n' +
        '    <ng-transclude></ng-transclude>\n' +
        '</button>\n' +
        '');
    $templateCache.put('sky/templates/actionbar/actionbaritemgroup.html',
        '<div class="bb-action-bar-group">\n' +
        '    <div class="bb-action-bar-buttons hidden-xs">\n' +
        '        <ng-transclude />\n' +
        '    </div>\n' +
        '    <div class="bb-action-bar-dropdown hidden-sm hidden-md hidden-lg">\n' +
        '        <div uib-dropdown>\n' +
        '             <button ng-attr-aria-controls="{{bbActionBarItemGroup.toggleId}}" class="btn bb-btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" >\n' +
        '            {{bbActionBarItemGroup.title}}<span class="caret"/>\n' +
        '            </button>\n' +
        '\n' +
        '            <ul role="menu" uib-dropdown-menu ng-attr-id="{{bbActionBarItemGroup.toggleId}}">\n' +
        '\n' +
        '            </ul>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</span>\n' +
        '');
    $templateCache.put('sky/templates/alert/alert.html',
        '<div class="alert" ng-class="[\'alert-\' + ($ctrl.bbAlertType || \'warning\'), $ctrl.bbAlertCloseable === \'true\' ? \'alert-dismissible\' : null]" ng-show="!$ctrl.bbAlertClosed" role="alert">\n' +
        '    <div class="alert-content" ng-transclude></div>\n' +
        '    <button ng-show="$ctrl.bbAlertCloseable === \'true\'" type="button" class="close" ng-click="$ctrl.close({$event: $event})">\n' +
        '        <span aria-hidden="true">&times;</span>\n' +
        '        <span class="sr-only">{{\'alert_close\' | bbResources}}</span>\n' +
        '    </button>\n' +
        '</div>\n' +
        '');
    $templateCache.put('sky/templates/avatar/avatar.component.html',
        '<div class="bb-avatar" ng-switch="$ctrl.canChange">\n' +
        '  <div ng-switch-when="true">\n' +
        '    <div\n' +
        '       class="bb-avatar-file-drop"\n' +
        '       bb-file-drop\n' +
        '       bb-file-drop-change="$ctrl.photoDrop(files, rejectedFiles)"\n' +
        '       bb-file-drop-accept="\'image/*\'"\n' +
        '       >\n' +
        '      <ng-include src="\'sky/templates/avatar/avatarinner.include.html\'" onload="$ctrl.onTemplateLoad()"></ng-include>\n' +
        '    </div>\n' +
        '  </div>\n' +
        '  <div ng-switch-default>\n' +
        '    <ng-include src="\'sky/templates/avatar/avatarinner.include.html\'" onload="$ctrl.onTemplateLoad()"></ng-include>\n' +
        '  </div>\n' +
        '</div>\n' +
        '');
    $templateCache.put('sky/templates/avatar/avatarinner.include.html',
        '<div class="bb-avatar-wrapper">\n' +
        '  <div class="bb-avatar-image" ng-show="$ctrl.bbAvatarSrc"></div>\n' +
        '  <canvas class="bb-avatar-initials" ng-show="$ctrl.showInitials()"></canvas>\n' +
        '</div>\n' +
        '');
    $templateCache.put('sky/templates/card/card.directive.html',
        '<section class="bb-card" ng-class="bbCard.getClass()">\n' +
        '  <header ng-show="bbCard.headingLeftCtrl || bbCard.titleCtrl || bbCard.headingRightCtrl || bbCard.cardIsSelectable()">\n' +
        '    <label class="bb-card-header">\n' +
        '      <div class="bb-card-heading-left" ng-if="bbCard.headingLeftCtrl"></div>\n' +
        '      <div class="bb-card-heading-middle">\n' +
        '        <h1 class="bb-card-title" ng-if="bbCard.titleCtrl"></h1>\n' +
        '      </div>\n' +
        '      <div class="bb-card-heading-right" ng-if="bbCard.headingRightCtrl &amp;&amp; !bbCard.cardIsSelectable()"></div>\n' +
        '      <div class="bb-card-check" ng-if="bbCard.cardIsSelectable()">\n' +
        '        <input \n' +
        '            type="checkbox" \n' +
        '            ng-attr-id="{{bbCard.cardCheckId}}"\n' +
        '            bb-check \n' +
        '            ng-model="bbCard.bbCardSelected" \n' +
        '            ng-change="bbCard.cardSelectionToggled(bbCard.bbCardSelected)"/>\n' +
        '      </div>\n' +
        '    </label>\n' +
        '  </header>\n' +
        '  <label class="bb-card-content" for="{{bbCard.cardCheckId}}"></label>\n' +
        '  <div class="bb-card-actions" ng-if="bbCard.actionsCtrl"></div>\n' +
        '  <ng-transclude></ng-transclude>\n' +
        '</section>\n' +
        '');
    $templateCache.put('sky/templates/carousel/carousel.component.html',
        '<div \n' +
        '    class="bb-carousel-wrapper"\n' +
        '    ng-class="{\n' +
        '      \'bb-carousel-card\': !$ctrl.bbCarouselStyle || $ctrl.bbCarouselStyle === \'card-large\',\n' +
        '      \'bb-carousel-card-small\': $ctrl.bbCarouselStyle === \'card-small\'\n' +
        '    }"\n' +
        '>\n' +
        '  <div class="bb-carousel-contents">\n' +
        '    <button \n' +
        '        type="button" \n' +
        '        class="bb-carousel-btn bb-carousel-btn-previous"\n' +
        '        ng-click="$ctrl.previousCard()" \n' +
        '        ng-show="$ctrl.allowPrevious"\n' +
        '        aria-label="{{::\'carousel_button_label_previous\' | bbResources}}"\n' +
        '    >\n' +
        '        <i class="fa fa-chevron-left"></i>\n' +
        '    </button>\n' +
        '    <div \n' +
        '        class="bb-carousel" \n' +
        '        ng-swipe-left="$ctrl.nextCard()"\n' +
        '        ng-swipe-right="$ctrl.previousCard()"\n' +
        '        ng-swipe-disable-mouse\n' +
        '    >\n' +
        '        <ng-transclude></ng-transclude>\n' +
        '    </div>\n' +
        '    <button \n' +
        '        type="button" \n' +
        '        class="bb-carousel-btn bb-carousel-btn-next"\n' +
        '        ng-click="$ctrl.nextCard()" \n' +
        '        ng-show="$ctrl.allowNext"\n' +
        '        aria-label="{{::\'carousel_button_label_next\' | bbResources}}"\n' +
        '    >\n' +
        '        <i class="fa fa-chevron-right"></i>\n' +
        '    </button>\n' +
        '  </div>\n' +
        '  <div class="bb-carousel-dots">\n' +
        '    <button\n' +
        '        type="button"\n' +
        '        class="bb-carousel-dot-btn"\n' +
        '        ng-class="{\n' +
        '            \'bb-carousel-dot-btn-selected\': $ctrl.dotIsSelected(dot)\n' +
        '        }"\n' +
        '        ng-repeat="dot in $ctrl.dots"\n' +
        '        ng-click="$ctrl.setSelectedItem(dot)"\n' +
        '        aria-label="{{::$ctrl.getDotLabel(dot)}}"\n' +
        '    >\n' +
        '      <div class="bb-carousel-dot-content"></div>\n' +
        '    </button>\n' +
        '  </div>\n' +
        '</div>');
    $templateCache.put('sky/templates/carousel/carousel.item.component.html',
        '<div class="bb-carousel-item" ng-click="$ctrl.itemClick()">\n' +
        '  <ng-transclude></ng-transclude>\n' +
        '</div>');
    $templateCache.put('sky/templates/check/labeltext.html',
        '<span class="bb-check-label-text"></span>\n' +
        '');
    $templateCache.put('sky/templates/check/styledcheckbox.html',
        '<span class="bb-check-checkbox"></span>\n' +
        '');
    $templateCache.put('sky/templates/check/styledradio.html',
        '<span class="bb-check-radio"></span>');
    $templateCache.put('sky/templates/check/wrapper.html',
        '<label class="bb-check-wrapper"></label>\n' +
        '');
    $templateCache.put('sky/templates/checklist/checklist.directive.html',
        '<div>\n' +
        '  <div>\n' +
        '    <div ng-if="bbChecklist.bbChecklistIncludeSearch" class="bb-checklist-filter-bar">\n' +
        '      <div class="bb-checklist-search" ng-class="{\'bb-search-disabled\': bbChecklist.onlyShowSelected}">\n' +
        '        <input\n' +
        '          type="text"\n' +
        '          class="bb-checklist-search-box"\n' +
        '          maxlength="255"\n' +
        '          placeholder="{{bbChecklist.bbChecklistSearchPlaceholder}}"\n' +
        '          ng-model="bbChecklist.searchText"\n' +
        '          ng-model-options="{debounce: bbChecklist.bbChecklistSearchDebounce}"\n' +
        '          ng-disabled="bbChecklist.onlyShowSelected"\n' +
        '          data-bbauto-field="ChecklistSearch"\n' +
        '          ng-attr-autofocus="{{bbChecklist.focusSearch}}"\n' +
        '          ng-attr-aria-label="{{\'checklist_search_label\' | bbResources}}" />\n' +
        '        <div class="bb-checklist-search-icon">\n' +
        '          <i class="fa fa-search"></i>\n' +
        '        </div>\n' +
        '      </div>\n' +
        '    </div>\n' +
        '    <div ng-if="(bbChecklist.bbChecklistCategories &amp;&amp; bbChecklist.bbChecklistCategories.length > 0) || bbChecklist.bbChecklistSubsetLabel" class="bb-checklist-filter-bar bb-checklist-category-bar bb-filters-inline form-inline">\n' +
        '      <div class="form-group" ng-if="bbChecklist.bbChecklistCategories &amp;&amp; bbChecklist.bbChecklistCategories.length > 0">\n' +
        '        <select ng-attr-aria-label="{{\'checklist_categories_label\' | bbResources}}" class="form-control" ng-model="bbChecklist.selectedOption" ng-disabled="bbChecklist.onlyShowSelected">\n' +
        '          <option ng-value="bbChecklist.allCategories">{{bbChecklist.bbChecklistAllCategoriesLabel}}</option>\n' +
        '          <option ng-repeat="category in bbChecklist.bbChecklistCategories">{{category}}</option>\n' +
        '        </select>\n' +
        '      </div>\n' +
        '      <div class="form-group">\n' +
        '\n' +
        '        <label class="control-label" ng-if="bbChecklist.bbChecklistSubsetLabel">\n' +
        '          <input class="bb-checklist-subset-input" bb-check type="checkbox" ng-model="bbChecklist.subsetSelected" ng-disabled="bbChecklist.onlyShowSelected"/>\n' +
        '          {{bbChecklist.bbChecklistSubsetLabel}}\n' +
        '        </label>\n' +
        '      </div>\n' +
        '    </div>\n' +
        '    <div class="bb-checklist-filter-bar bb-checklist-select-all-bar" ng-show="!bbChecklist.isSingleSelect()">\n' +
        '      <button type="button" class="btn btn-link" data-bbauto-field="ChecklistSelectAll" ng-click="bbChecklist.selectAll()">{{\'checklist_select_all\' | bbResources}}</button>\n' +
        '      <button type="button" class="btn btn-link bb-checklist-clear" data-bbauto-field="ChecklistClear" ng-click="bbChecklist.clear()">{{\'checklist_clear_all\' | bbResources}}</button>\n' +
        '      <label class="control-label" ng-if="bbChecklist.onlySelectedAvailable">\n' +
        '        <input bb-check type="checkbox" ng-model="bbChecklist.onlyShowSelected" />\n' +
        '        {{\'checklist_only_selected_items\' | bbResources}}\n' +
        '      </label>\n' +
        '    </div>\n' +
        '  </div>\n' +
        '  <div class="bb-checklist-wrapper" bb-wait="bbChecklist.bbChecklistIsLoading" ng-switch="bbChecklist.bbChecklistMode" ng-class="bbChecklist.getChecklistCls()">\n' +
        '    <div ng-switch-when="list" data-bbauto-repeater="ChecklistItems" data-bbauto-repeater-count="{{bbChecklist.filteredItems.length}}">\n' +
        '      <div ng-switch="bbChecklist.isSingleSelect()">\n' +
        '        <div ng-switch-when="true" role="radiogroup">\n' +
        '          <button\n' +
        '            ng-repeat="item in bbChecklist.filteredItems"\n' +
        '            role="radio" \n' +
        '            type="button"\n' +
        '            ng-attr-aria-checked="{{bbChecklist.itemIsSelected(item)}}"\n' +
        '            class="bb-checklist-list-row" \n' +
        '            ng-class="bbChecklist.getRowCls(item)" \n' +
        '            data-bbauto-field="{{item.name}}" \n' +
        '            ng-click="bbChecklist.singleSelectRowClick(item)">\n' +
        '            <ng-include class="bb-checklist-list-col" src="\'sky/templates/checklist/checklistlistrow.include.html\'"></ng-include>\n' +
        '          </button>\n' +
        '        </div>\n' +
        '        <div ng-switch-default>\n' +
        '          <div ng-repeat="item in bbChecklist.filteredItems" class="bb-checklist-list-row" ng-click="bbChecklist.rowClicked(item)" ng-class="bbChecklist.getRowCls(item)" data-bbauto-field="{{item.name}}">\n' +
        '            <div class="bb-checklist-list-col bb-checklist-list-col-checkbox">\n' +
        '              <input ng-attr-aria-label="{{item.title}}" ng-click="bbChecklist.inputClicked($event)" bb-check type="checkbox" checklist-model="bbChecklist.bbChecklistSelectedItems" checklist-value="item" checklist-select-style="bbChecklist.bbChecklistSelectStyle" />\n' +
        '            </div>\n' +
        '            <ng-include class="bb-checklist-list-col" src="\'sky/templates/checklist/checklistlistrow.include.html\'"></ng-include>\n' +
        '          </div>\n' +
        '        </div>\n' +
        '      </div>\n' +
        '    </div>\n' +
        '    <table class="table bb-checklist-table" ng-switch-default>\n' +
        '      <thead>\n' +
        '        <tr>\n' +
        '          <th scope="col" class="bb-checklist-checkbox-column"  ng-attr-title="{{\'checklist_check_title\' | bbResources}}"></th>\n' +
        '          <th scope="col" ng-repeat="column in bbChecklist.columns" class="{{column.class}}" ng-style="{\'width\': column.width}">{{column.caption}}</th>\n' +
        '        </tr>\n' +
        '      </thead>\n' +
        '      <tbody bb-highlight="bbChecklist.searchText" bb-highlight-beacon="bbChecklist.highlightRefresh" data-bbauto-repeater="ChecklistItems" data-bbauto-repeater-count="{{bbChecklist.filteredItems.length}}">\n' +
        '        <tr ng-repeat="item in bbChecklist.filteredItems" ng-click="bbChecklist.rowClicked(item);" class="bb-checklist-row">\n' +
        '          <td>\n' +
        '            <input ng-attr-aria-label="{{item.column}}" ng-click="bbChecklist.inputClicked($event)" bb-check type="checkbox" checklist-model="bbChecklist.bbChecklistSelectedItems" checklist-value="item" data-bbauto-field="{{item[bbChecklist.bbChecklistAutomationField]}}" />\n' +
        '          </td>\n' +
        '          <td ng-repeat="column in bbChecklist.columns" class="{{column.class}}" data-bbauto-field="{{column.automationId}}" data-bbauto-index="{{$parent.$index}}">{{item[column.field]}}</td>\n' +
        '        </tr>\n' +
        '      </tbody>\n' +
        '    </table>\n' +
        '    <div class="bb-checklist-no-items" ng-if="!bbChecklist.filteredItems.length">{{bbChecklist.bbChecklistNoItemsMessage || (\'checklist_no_items\' | bbResources)}}</div>\n' +
        '  </div>\n' +
        '  <div ng-transclude></div>\n' +
        '</div>\n' +
        '');
    $templateCache.put('sky/templates/checklist/checklistlistrow.include.html',
        '<div>\n' +
        '  <div class="bb-checklist-list-title" bb-highlight="bbChecklist.searchText" ng-bind="item.title"></div>\n' +
        '  <div class="bb-checklist-list-description" bb-highlight="bbChecklist.searchText" ng-bind="item.description"></div>\n' +
        '</div>\n' +
        '');
    $templateCache.put('sky/templates/chevron/chevron.component.html',
        '<button type="button" class="bb-chevron" ng-class="$ctrl.getCls()" ng-click="$ctrl.click($event)" aria-label="{{$ctrl.getLabel()}}">\n' +
        '  <i class="bb-chevron-part bb-chevron-left"></i>\n' +
        '  <i class="bb-chevron-part bb-chevron-right"></i>\n' +
        '</button>\n' +
        '');
    $templateCache.put('sky/templates/contextmenu/contextmenu.html',
        '<div class="bb-context-menu" data-bbauto-field="ContextMenuActions" uib-dropdown>\n' +
        '    <bb-context-menu-button data-bbauto-field="ContextMenuAnchor" ng-click="bbContextMenu.contextButtonStopPropagation($event)" bb-context-menu-button-dropdown-toggle></bb-context-menu-button>\n' +
        '    <div class="bb-dropdown-menu" uib-dropdown-menu role="menu">\n' +
        '        <ng-transclude></ng-transclude>\n' +
        '    </div>\n' +
        '</div>\n' +
        '');
    $templateCache.put('sky/templates/contextmenu/menubutton.html',
        '<button type="button" class="btn bb-btn-secondary bb-context-menu-btn" aria-label="{{bbContextMenuButton.getAriaLabel()}}">\n' +
        '  <i class="fa fa-ellipsis-h"></i>\n' +
        '</button>\n' +
        '');
    $templateCache.put('sky/templates/contextmenu/menuitem.html',
        '<div class="bb-dropdown-item" role="presentation">\n' +
        '  <a role="menuitem" href="javascript:void(0)" ng-click="bbContextMenuItem.clickItem()">\n' +
        '    <ng-transclude></ng-transclude>\n' +
        '  </a>\n' +
        '</div>\n' +
        '');
    $templateCache.put('sky/templates/contextmenu/submenu.accordiongroup.html',
        '<div class="panel" ng-class="panelClass || \'panel-default\'">\n' +
        '  <div role="tab" aria-expanded="{{isOpen}}" aria-controls="{{::panelId}}" id="{{::headingId}}" aria-selected="{{isOpen}}" class="panel-heading" tabindex="0" ng-keypress="toggleOpen()">\n' +
        '    <h4 class="panel-title">\n' +
        '      <div data-toggle="collapse" class="accordion-toggle" uib-accordion-transclude="heading"><span uib-accordion-header ng-class="{\'text-muted\': isDisabled}">{{heading}}</span></div>\n' +
        '    </h4>\n' +
        '  </div>\n' +
        '  <div id="{{::panelId}}" aria-labelledby="{{::headingId}}" aria-hidden="{{!isOpen}}" role="tabpanel" class="panel-collapse collapse" uib-collapse="!isOpen">\n' +
        '    <div class="panel-body" ng-transclude></div>\n' +
        '  </div>\n' +
        '</div>');
    $templateCache.put('sky/templates/contextmenu/submenu.html',
        '<div class="bb-submenu">\n' +
        '    <uib-accordion>\n' +
        '        <div uib-accordion-group template-url="sky/templates/contextmenu/submenu.accordiongroup.html" is-open="bbSubmenu.accordionOpen">\n' +
        '            <uib-accordion-heading ng-if="bbSubmenu.staticHeader">\n' +
        '                <div role="button" ng-click="bbSubmenu.toggleAccordion($event)">\n' +
        '                    <span>\n' +
        '                        {{bbSubmenu.heading}}\n' +
        '                    <span>\n' +
        '                    <i ng-class="\'fa-chevron-\' + (bbSubmenu.accordionOpen ? \'up\' : \'down\')" class="fa bb-submenu-chevron"></i>\n' +
        '                </div>\n' +
        '            </uib-accordion-heading>\n' +
        '            <ng-transclude></ng-transclude>\n' +
        '        </div>\n' +
        '    </uib-accordion>\n' +
        '</div>\n' +
        '');
    $templateCache.put('sky/templates/contextmenu/submenuheading.html',
        '<uib-accordion-heading>\n' +
        '    <div role="button" ng-click="bbSubmenuHeading.toggleAccordion($event)">\n' +
        '        <ng-transclude></ng-transclude>\n' +
        '        <i ng-class="\'fa-chevron-\' + (bbSubmenuHeading.submenuCtrl.accordionOpen ? \'up\' : \'down\')" class="fa bb-submenu-chevron"></i>\n' +
        '    </div>\n' +
        '</uib-accordion-heading>\n' +
        '');
    $templateCache.put('sky/templates/datefield/datefield.html',
        '<span class="add-on input-group-btn">\n' +
        '    <button type="button" class="btn btn-default bb-date-field-calendar-button">\n' +
        '        <i class="fa fa-calendar"></i>\n' +
        '    </button>\n' +
        '</span>\n' +
        '');
    $templateCache.put('sky/templates/datepicker/datepicker.directive.html',
        '<div>\n' +
        '    <div ng-if="bbDatepicker.loaded" class="input-group bb-datefield">\n' +
        '\n' +
        '        <input name="{{bbDatepicker.inputName}}"\n' +
        '                type="text"\n' +
        '                class="form-control"\n' +
        '                placeholder="{{bbDatepicker.bbPlaceholder}}"\n' +
        '\n' +
        '                ng-model="bbDatepicker.pickerDate"\n' +
        '                ng-model-options="{ allowInvalid: true }"\n' +
        '                ng-keydown="bbDatepicker.enterPress($event)"\n' +
        '\n' +
        '                is-open="bbDatepicker.pickerOpened"\n' +
        '                datepicker-options="bbDatepicker.pickerOptions"\n' +
        '                uib-datepicker-popup="{{bbDatepicker.format}}"\n' +
        '                show-button-bar="bbDatepicker.showButtonBar"\n' +
        '                current-text="{{bbDatepicker.resources.datepicker_today}}"\n' +
        '                clear-text="{{bbDatepicker.resources.datepicker_clear}}"\n' +
        '                close-text="{{bbDatepicker.resources.datepicker_close}}"\n' +
        '                datepicker-append-to-body="{{bbDatepicker.appendToBody}}"\n' +
        '                close-on-date-selection="{{bbDatepicker.closeOnSelection}}"\n' +
        '                alt-input-formats="bbDatepicker.altInputFormats"\n' +
        '\n' +
        '                bb-datepicker-custom-validate="{{bbDatepicker.hasCustomValidation}}"\n' +
        '                bb-datepicker-min-date\n' +
        '                bb-datepicker-max-date\n' +
        '\n' +
        '                 />\n' +
        '        <span class="bb-datepicker-button-container add-on input-group-btn" ng-class="{\'bb-datefield-open\': bbDatepicker.pickerOpened}">\n' +
        '            <button \n' +
        '                type="button" \n' +
        '                class="btn btn-default bb-date-field-calendar-button" \n' +
        '                ng-click="bbDatepicker.open($event)" \n' +
        '                ng-attr-aria-label="{{\'datepicker_open\' | bbResources}}"\n' +
        '				ng-attr-tabindex="{{bbDatepicker.bbDatepickerSkipButtonWhileTabbing === true ? \'-1\' : undefined}}">\n' +
        '                <i class="fa fa-calendar"></i>\n' +
        '            </button>\n' +
        '        </span>\n' +
        '    </div>\n' +
        '</div>\n' +
        '');
    $templateCache.put('sky/templates/daterangepicker/daterangepicker.html',
        '<div class="form-inline" ng-form="bbDateRangePickerCtrl.dateRangeForm">\n' +
        '    <div class="form-group bb-date-range-picker-form-group">\n' +
        '      <label class="bb-date-range-picker-label" ng-if="bbDateRangePickerCtrl.pickerLabel && !bbDateRangePickerCtrl.noLabels">{{bbDateRangePickerCtrl.pickerLabel}}</label>\n' +
        '      <select data-bbauto-field="{{bbDateRangePickerCtrl.bbDateRangePickerAutomationId}}_DateRangeType"\n' +
        '        class="form-control"\n' +
        '        ng-options="bbDateRangePickerCtrl.getDateRangeTypeCaption(t) for t in (bbDateRangePickerCtrl.bbDateRangePickerOptions.availableDateRangeTypes || bbDateRangePickerCtrl.defaultDateRangeOptions)"\n' +
        '        ng-model="bbDateRangePickerCtrl.bbDateRangePickerValue.dateRangeType" />\n' +
        '    </div>\n' +
        '    <div class="form-group bb-date-range-picker-form-group" ng-if="bbDateRangePickerCtrl.specificRangeIsVisible">\n' +
        '      <label class="bb-date-range-picker-label" ng-if="!bbDateRangePickerCtrl.noLabels">{{::bbDateRangePickerCtrl.resources.date_range_picker_from_date}}</label>\n' +
        '      <bb-datepicker\n' +
        '        ng-model="bbDateRangePickerCtrl.fromDate"\n' +
        '        bb-datepicker-max="bbDateRangePickerCtrl.maxDate"\n' +
        '        bb-datepicker-name="fromDate"\n' +
        '        bb-datepicker-append-to-body="true"\n' +
        '        bb-datepicker-placeholder="bbDateRangePickerCtrl.fromPlaceholder">\n' +
        '      </bb-datepicker>\n' +
        '      <label class="bb-date-range-picker-date-format-error error" ng-show="bbDateRangePickerCtrl.dateRangeForm.fromDate.$error.dateFormat">{{::bbDateRangePickerCtrl.resources.date_field_invalid_date_message}}</label>\n' +
        '      <label class="bb-date-range-picker-date-max-error error" ng-show="bbDateRangePickerCtrl.dateRangeForm.fromDate.$error.maxDate">{{::bbDateRangePickerCtrl.resources.date_range_picker_max_date_error}}</label>\n' +
        '    </div>\n' +
        '    <div class="form-group bb-date-range-picker-form-group" ng-if="bbDateRangePickerCtrl.specificRangeIsVisible">\n' +
        '      <label class="bb-date-range-picker-label" ng-if="!bbDateRangePickerCtrl.noLabels">{{::bbDateRangePickerCtrl.resources.date_range_picker_to_date}}</label>\n' +
        '      <bb-datepicker\n' +
        '        ng-model="bbDateRangePickerCtrl.toDate"\n' +
        '        bb-datepicker-min="bbDateRangePickerCtrl.minDate"\n' +
        '        bb-datepicker-name="toDate"\n' +
        '        bb-datepicker-append-to-body="true"\n' +
        '        bb-datepicker-placeholder="bbDateRangePickerCtrl.toPlaceholder">\n' +
        '      </bb-datepicker>\n' +
        '      <label class="bb-date-range-picker-date-format-error error" ng-show="bbDateRangePickerCtrl.dateRangeForm.toDate.$error.dateFormat">{{::bbDateRangePickerCtrl.resources.date_field_invalid_date_message}}</label>\n' +
        '      <label class="bb-date-range-picker-date-min-error error" ng-show="bbDateRangePickerCtrl.dateRangeForm.toDate.$error.minDate">{{::bbDateRangePickerCtrl.resources.date_range_picker_min_date_error}}</label>\n' +
        '    </div>\n' +
        '</div>\n' +
        '');
    $templateCache.put('sky/templates/definitionlist/definitionlist.component.html',
        '<div class="bb-definition-list">\n' +
        '    <div class="bb-subsection-heading bb-definition-list-heading" ng-transclude="heading"></div>\n' +
        '    <div class="bb-definition-list-content" ng-transclude="content"></div>\n' +
        '</div>');
    $templateCache.put('sky/templates/definitionlist/definitionlistcontent.component.html',
        '<div class="bb-definition-list-content-component">\n' +
        '    <div ng-style="{width: $ctrl.definitionCtrl.bbDefinitionListLabelWidth}" class="bb-field-label bb-definition-list-label" ng-transclude="label"></div>\n' +
        '    <div class="bb-definition-list-value" ng-transclude="value" ng-show="$ctrl.hasValue()"></div>\n' +
        '    <div class="bb-definition-list-no-value bb-deemphasized" ng-show="!$ctrl.hasValue()">{{$ctrl.definitionCtrl.bbDefinitionListDefaultValue}}</div>\n' +
        '</div>\n' +
        '');
    $templateCache.put('sky/templates/error/error.description.directive.html',
        '<div class="bb-error-description-container">\n' +
        '  <span ng-if="bbErrorDescription.description">{{bbErrorDescription.description}}</span>\n' +
        '</div>\n' +
        '<ng-transclude></ng-transclude>\n' +
        '');
    $templateCache.put('sky/templates/error/error.directive.html',
        '<div class="row bb-error">\n' +
        '  <section class="col-xs-12 text-center">\n' +
        '    <div class="bb-error-image" ng-show="bbError.imageCtrl">\n' +
        '      <bb-error-image error-default error-type="{{bbError.imageType}}" ng-if="bbError.imageType !== \'\' && !bbError.imageHasOverride">\n' +
        '      </bb-error-image>\n' +
        '    </div>\n' +
        '    <div class="bb-error-title" ng-show="bbError.titleCtrl">\n' +
        '      <bb-error-title error-default error-type="{{bbError.titleType}}" ng-if="bbError.titleType !== \'\' && !bbError.titleHasOverride">\n' +
        '      </bb-error-title>\n' +
        '    </div>\n' +
        '    <div class="bb-error-description" ng-show="bbError.descriptionCtrl">\n' +
        '      <bb-error-description error-default error-type="{{bbError.descriptionType}}" ng-if="bbError.descriptionType !== \'\' && !bbError.descriptionHasOverride">\n' +
        '      </bb-error-description>\n' +
        '    </div>\n' +
        '    <div class="bb-error-action" ng-show="bbError.actionCtrl"></div>\n' +
        '    <ng-transclude></ng-transclude>\n' +
        '  </section>\n' +
        '</div>\n' +
        '');
    $templateCache.put('sky/templates/error/error.image.directive.html',
        '<div ng-if="bbErrorImage.bbErrorType" class="bb-error-image-container">\n' +
        '  <div class="bb-error-image-broken" ng-if="bbErrorImage.bbErrorType === \'broken\'">\n' +
        '  </div>\n' +
        '\n' +
        '  <div class="bb-error-image-construction" ng-if="bbErrorImage.bbErrorType === \'construction\'">\n' +
        '  </div>\n' +
        '\n' +
        '  <div class="bb-error-image-notfound" ng-if="bbErrorImage.bbErrorType === \'notFound\'">\n' +
        '  </div>\n' +
        '</div>\n' +
        '<ng-transclude></ng-transclude>\n' +
        '');
    $templateCache.put('sky/templates/error/error.title.directive.html',
        '<div class="bb-error-title-container">\n' +
        '  <span ng-if="bbErrorTitle.title">{{bbErrorTitle.title}}</span>\n' +
        '  <ng-transclude></ng-transclude>\n' +
        '</div>\n' +
        '');
    $templateCache.put('sky/templates/error/errormodal.template.html',
        '<bb-modal>\n' +
        '  <div class="modal-form">\n' +
        '    <div bb-modal-body>\n' +
        '      <bb-error>\n' +
        '        <bb-error-title>\n' +
        '          {{bbErrorModal.options.errorTitle}}\n' +
        '        </bb-error-title>\n' +
        '        <bb-error-description>\n' +
        '          {{bbErrorModal.options.errorDescription}}\n' +
        '        </bb-error-description>\n' +
        '        <bb-error-action>\n' +
        '          <button type="button" class="btn btn-primary" ng-click="bbErrorModal.close()">{{\'errormodal_ok\' | bbResources}}</button>\n' +
        '        </bb-error-action>\n' +
        '      </bb-error>\n' +
        '    </div>\n' +
        '  </div>\n' +
        '</bb-modal>\n' +
        '');
    $templateCache.put('sky/templates/fileattachments/filedrop.html',
        '<div class="row bb-file-drop-row">\n' +
        '    <div class="col-xs-12 bb-file-drop-col" ng-class="{\'col-sm-6\': bbFileDrop.allowLinks}">\n' +
        '        <button\n' +
        '             type="button"\n' +
        '             ng-attr-aria-label="{{\'file_upload_drag_or_click\' | bbResources}}"\n' +
        '             class="bb-file-drop bb-file-drop-target"\n' +
        '             ngf-drop\n' +
        '             ngf-keep="false"\n' +
        '             ngf-drag-over-class="{accept: \'bb-file-drop-accept\', reject: \'bb-file-drop-reject\'}"\n' +
        '             ngf-change="bbFileDrop.fileChange($files, $event, $invalidFiles)"\n' +
        '             ngf-validate-fn="bbFileDrop.validate($file)"\n' +
        '             >\n' +
        '            <div class="bb-file-drop-contents" ng-if="!bbFileDrop.hasTranscludeContents">\n' +
        '                <div class="bb-file-drop-contents-not-over">\n' +
        '                    <h4>{{\'file_upload_drag_file_here\' | bbResources}}</h4>\n' +
        '                    <h5>{{\'file_upload_or_click_to_browse\' | bbResources}}</h5>\n' +
        '                    <i class="fa fa-cloud-upload bb-file-upload-icon"></i>\n' +
        '                </div>\n' +
        '                <div class="bb-file-drop-contents-accept">\n' +
        '                    <h4>{{\'file_upload_drop_files_here\' | bbResources}}</h4>\n' +
        '                    <i class="fa fa-bullseye bb-file-upload-icon"></i>\n' +
        '                </div>\n' +
        '                <div class="bb-file-drop-contents-reject">\n' +
        '                    <h4>{{\'file_upload_invalid_file\' | bbResources}}</h4>\n' +
        '                    <i class="fa fa-times-circle bb-file-upload-icon"></i>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '            <div class="bb-file-drop-contents-custom" ng-transclude></div>\n' +
        '        </button>\n' +
        '    </div>\n' +
        '    <div class="col-sm-6 col-xs-12 bb-file-drop-col" ng-if="bbFileDrop.allowLinks">\n' +
        '        <div class="bb-file-drop-contents">\n' +
        '            <div class="bb-file-drop-link">\n' +
        '                <h4 class="bb-file-drop-link-header">{{\'file_upload_paste_link\' | bbResources}}</h4>\n' +
        '                <div class="form-group">\n' +
        '                    <input\n' +
        '                           type="text"\n' +
        '                           class="form-control"\n' +
        '                           placeholder="{{\'file_upload_link_placeholder\' | bbResources}}"\n' +
        '                           ng-model="bbFileDrop.url"\n' +
        '                           ng-keypress="$event.keyCode === 13 &amp;&amp; bbFileDrop.addLink($event)"\n' +
        '                           ng-attr-aria-label="{{\'file_upload_link_input\' | bbResources}}"\n' +
        '                           />\n' +
        '                </div>\n' +
        '                <button type="button" class="btn btn-primary" ng-disabled="!bbFileDrop.url" ng-click="bbFileDrop.addLink($event)">\n' +
        '                    {{\'file_upload_paste_link_done\' | bbResources}}\n' +
        '                </button>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>\n' +
        '');
    $templateCache.put('sky/templates/fileattachments/fileitem.html',
        '<div class="bb-file-item">\n' +
        '    <div class="row bb-file-item-title">\n' +
        '        <div class="col-xs-10">\n' +
        '            <div class="bb-file-item-name">\n' +
        '                <strong>{{item.name || item.url}}</strong>\n' +
        '            </div>\n' +
        '            <div class="bb-file-item-size" ng-if="bbFileItem.isFile()">\n' +
        '                ({{item.size | bbFileSize}})\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="col-xs-2">\n' +
        '            <div class="pull-right">\n' +
        '                <button type="button" class="btn bb-btn-secondary bb-file-item-btn-delete" ng-attr-aria-label="{{\'file_item_delete\' | bbResources}}" ng-click="itemDelete()">\n' +
        '                    <i class="glyphicon glyphicon-trash"></i>\n' +
        '                </button>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '    <div class="row">\n' +
        '        <div ng-switch="bbFileItem.isImg()" class="col-xs-3">\n' +
        '            <div ng-switch-when="true" class="center-block">\n' +
        '              <img ng-if="item.url" class="bb-file-item-preview-img" ng-src="{{item.url}}" />\n' +
        '              <img ng-if="!item.url" class="bb-file-item-preview-img" ngf-src="item" />\n' +
        '            </div>\n' +
        '            <div ng-switch-when="false" class="bb-file-item-preview-other">\n' +
        '                <i class="fa" ng-class="bbFileItem.otherCls"></i>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="col-xs-9" ng-transclude>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>\n' +
        '');
    $templateCache.put('sky/templates/filter/filter.button.component.html',
        '<button \n' +
        '    ng-attr-title="{{\'filter_button_title\' | bbResources}}" \n' +
        '    ng-class="{\'bb-filter-btn-active\': $ctrl.bbFilterButtonActive}" \n' +
        '    data-bbauto-field="FilterButton" \n' +
        '    type="button" \n' +
        '    class="btn bb-btn-secondary" \n' +
        '    ng-click="$ctrl.bbFilterButtonOnClick()">\n' +
        '    <i class="fa fa-lg fa-filter"></i>\n' +
        '</button>');
    $templateCache.put('sky/templates/filter/filter.modal.footer.component.html',
        '<bb-modal-footer>\n' +
        '    <bb-modal-footer-button-primary ng-click="$ctrl.bbFilterModalApply()" >{{\'filter_modal_apply\' | bbResources}}</bb-modal-footer-button-primary>\n' +
        '    <button type="button" class="btn btn-link" ng-click="$ctrl.bbFilterModalClear()">{{\'filter_modal_clear\' | bbResources}}</button>\n' +
        '    <bb-modal-footer-button-cancel></bb-modal-footer-button-cancel>\n' +
        '</bb-modal-footer>');
    $templateCache.put('sky/templates/filter/filter.summary.component.html',
        '<div class="bb-filter-summary">\n' +
        '    <span class="bb-filter-summary-header">{{::\'filter_summary_header\' | bbResources}}:</span>\n' +
        '    <div class="bb-filter-summary-items">\n' +
        '        <ng-transclude></ng-transclude>\n' +
        '    </div>\n' +
        '</div>');
    $templateCache.put('sky/templates/filter/filter.summary.item.component.html',
        '<div \n' +
        '    role="button" \n' +
        '    tabindex="0" \n' +
        '    class="bb-filter-summary-item" \n' +
        '    ng-click="$ctrl.bbFilterSummaryItemOnClick()"\n' +
        '    ng-keypress="$event.keyCode === 13 &amp;&amp; $ctrl.bbFilterSummaryItemOnClick()">\n' +
        '    <ng-transclude></ng-transclude>\n' +
        '    <span \n' +
        '        ng-attr-aria-label="{{\'filter_summary_close\' | bbResources}}"\n' +
        '        ng-if="$ctrl.bbFilterSummaryItemIsDismissable || $ctrl.bbFilterSummaryItemIsDismissible" \n' +
        '        role="button" \n' +
        '        tabindex="0" \n' +
        '        class="fa fa-times close" \n' +
        '        ng-click="$ctrl.clearFilter($event)"\n' +
        '        ng-keypress="$event.keyCode === 13 &amp;&amp; $ctrl.clearFilter($event)">\n' +
        '    </span>\n' +
        '</div>');
    $templateCache.put('sky/templates/grids/actionbar.html',
        '<div ng-show="locals.showActionBar" data-bbauto-view="GridActionBar">\n' +
        '    <div ng-if="!locals.showMobileActions" class="bb-grid-action-bar">\n' +
        '        <div ng-if="!locals.mobileButtons" class="bb-grid-action-bar-buttons" ng-repeat="action in locals.actions">\n' +
        '            <button type="button" class="btn" ng-class="{\'btn-primary\': action.isPrimary, \'bb-btn-secondary\': !action.isPrimary}" data-bbauto-field="{{action.automationId}}" ng-click="action.actionCallback()" ng-disabled="action.selections.length < 1">{{action.title}} ({{action.selections.length}})</button>\n' +
        '        </div>\n' +
        '        <div ng-if="locals.mobileButtons" class="bb-grid-action-bar-buttons">\n' +
        '            <button type="button" class="btn btn-primary" ng-click="locals.chooseAction()">\n' +
        '                <span>{{resources.grid_action_bar_choose_action}}</span>\n' +
        '            </button>\n' +
        '        </div>\n' +
        '        <button type="button" class="btn bb-grid-action-bar-clear-selection" ng-click="locals.clearSelection()">\n' +
        '            {{resources.grid_action_bar_clear_selection}}\n' +
        '        </button>\n' +
        '    </div>\n' +
        '    <div ng-if="locals.showMobileActions" class="bb-grid-action-bar-mobile-buttons">\n' +
        '        <div class="bb-grid-action-bar-btn-container">\n' +
        '            <div ng-repeat="action in locals.actions">\n' +
        '                <button type="button" class="bb-grid-action-bar-mobile-btn btn btn-block btn-lg" ng-class="{\'btn-primary\': action.isPrimary, \'bb-btn-secondary\': !action.isPrimary}" ng-click="action.actionCallback()" ng-disabled="action.selections.length < 1">{{action.title}} ({{action.selections.length}})</button>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <button type="button" class="btn bb-grid-action-bar-mobile-cancel bb-grid-action-bar-clear-selection" ng-click="locals.cancelChooseAction()">\n' +
        '            {{resources.grid_action_bar_cancel_mobile_actions}}\n' +
        '        </button>\n' +
        '    </div>\n' +
        '</div>\n' +
        '');
    $templateCache.put('sky/templates/grids/columnpicker.html',
        '<bb-modal data-bbauto-view="ColumnPicker">\n' +
        '  <bb-modal-header bb-modal-help-key="$parent.columnPickerHelpKey">{{\'grid_column_picker_header\' | bbResources}}</bb-modal-header>\n' +
        '  <div bb-modal-body>\n' +
        '    <bb-checklist\n' +
        '                  bb-checklist-items="columns"\n' +
        '                  bb-checklist-selected-items="locals.selectedColumns"\n' +
        '                  bb-checklist-include-search="\'true\'"\n' +
        '                  bb-checklist-search-placeholder="{{\'grid_column_picker_search_placeholder\' | bbResources}}"\n' +
        '                  bb-checklist-no-items-message="{{\'grid_column_picker_search_no_columns\' | bbResources}}"\n' +
        '                  bb-checklist-categories="categories"\n' +
        '                  bb-checklist-mode="list"\n' +
        '                  bb-checklist-filter-local\n' +
        '                  bb-checklist-subset-label="locals.subsetLabel"\n' +
        '                  bb-checklist-subset-property="{{locals.subsetProperty}}"\n' +
        '                  ng-attr-bb-checklist-subset-exclude="{{locals.subsetExclude}}"\n' +
        '                  ng-attr-bb-checklist-only-selected="{{locals.onlySelected}}"\n' +
        '                  >\n' +
        '    </bb-checklist>\n' +
        '  </div>\n' +
        '  <bb-modal-footer>\n' +
        '    <bb-modal-footer-button-primary data-bbauto-field="ColumnPickerSubmit" ng-click="applyChanges()">{{\'grid_column_picker_submit\' | bbResources}}</bb-modal-footer-button-primary>\n' +
        '    <bb-modal-footer-button-cancel data-bbauto-field="ColumnPickerCancel"></bb-modal-footer-button-cancel>\n' +
        '  </bb-modal-footer>\n' +
        '</bb-modal>\n' +
        '');
    $templateCache.put('sky/templates/grids/dropdown.html',
        '<div class="bb-context-menu" data-bbauto-field="ContextMenuActions" uib-dropdown dropdown-append-to-body ng-if="locals.items.length > 0" is-open="locals.is_open">\n' +
        '    <bb-context-menu-button data-bbauto-field="ContextMenuAnchor" ng-click="locals.toggleDropdown($event)">\n' +
        '    </bb-context-menu-button>\n' +
        '    <div class="bb-dropdown-menu" uib-dropdown-menu role="menu">\n' +
        '        <bb-context-menu-item ng-repeat="item in locals.items" bb-context-menu-action="item.cmd()">{{item.title}}</bb-context-menu-item>\n' +
        '    </div>\n' +
        '</div>\n' +
        '');
    $templateCache.put('sky/templates/grids/filters.html',
        '<div style="display:none;">\n' +
        '    <div bb-scrolling-view-keeper="viewKeeperOptions" class="bb-grid-filters grid-filters">\n' +
        '        <div class="bb-grid-filters-box" bb-scroll-into-view="locals.expanded">\n' +
        '            <div class="bb-grid-filters-icon" ng-click="locals.expanded = !locals.expanded"></div>\n' +
        '            <div class="bb-grid-filters-container" style="display:none;">\n' +
        '                <div class="bb-grid-filters-header" ng-click="locals.expanded = !locals.expanded">\n' +
        '                    <h4 class="bb-grid-filters-header-title">{{resources.grid_filters_header}}</h4>\n' +
        '                    <span class="bb-grid-filters-header-hide">{{resources.grid_filters_hide}}</span>\n' +
        '                </div>\n' +
        '                <div class="bb-grid-filters-body" ng-transclude></div>\n' +
        '                <div class="bb-grid-filters-footer">\n' +
        '                    <button data-bbauto-field="ApplyGridFilters" class="btn btn-primary" type="submit" ng-click="applyFilters()">{{resources.grid_filters_apply}}</button>\n' +
        '                    <button data-bbauto-field="ClearGridFilters" class="btn bb-btn-secondary" type="button" ng-click="clearFilters()">{{resources.grid_filters_clear}}</button>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>\n' +
        '');
    $templateCache.put('sky/templates/grids/filtersgroup.html',
        '<div class="form-group" ng-class="isCollapsed ? \'collapsed\' : \'collapsible\'">\n' +
        '    <div ng-click="isCollapsed = !isCollapsed">\n' +
        '        <i ng-class="\'glyphicon-chevron-\' + (isCollapsed ? \'down\' : \'up\')" class="bb-grid-filters-body-group-header-icon glyphicon"></i>\n' +
        '        <label>{{bbGridFiltersGroupLabel}}</label>\n' +
        '    </div>\n' +
        '    <div class="bb-grid-filters-body-group-content" uib-collapse="!!isCollapsed" ng-transclude></div>\n' +
        '</div>\n' +
        '');
    $templateCache.put('sky/templates/grids/filterssummary.html',
        '<div class="toolbar bb-table-toolbar bb-applied-filter-bar">\n' +
        '    <div class="bb-applied-filter-header">\n' +
        '        <span>{{resources.grid_filters_summary_header}}</span>\n' +
        '    </div>\n' +
        '    <div class="bb-applied-filter-content-container">\n' +
        '      <div \n' +
        '        ng-class="{\'bb-applied-filter-content-no-dismiss\': !gridFilterSummary.bbGridFiltersSummaryDismissable}"\n' +
        '        tabindex="0" \n' +
        '        role="button" \n' +
        '        class="bb-applied-filter-content" \n' +
        '        ng-click="openFilterMenu()">\n' +
        '          <span class="bb-applied-filter-text" data-bbauto-field="FilterSummaryText" ng-transclude></span>\n' +
        '          <span \n' +
        '            tabindex="0" \n' +
        '            role="button" \n' +
        '            class="fa fa-times close" \n' +
        '            data-bbauto-field="FilterSummaryRemove" \n' +
        '            ng-click="clearFilters(); $event.stopPropagation();">\n' +
        '        </span>\n' +
        '      </div>\n' +
        '    </div>\n' +
        '\n' +
        '</div>\n' +
        '');
    $templateCache.put('sky/templates/grids/grid.html',
        '<section class="bb-grid-container" data-bbauto-grid="{{options.automationId}}" data-bbauto-timestamp="{{locals.timestamp}}" data-bbauto-repeater="{{options.automationId}}" data-bbauto-repeater-count="{{locals.rowcount}}">\n' +
        '\n' +
        '\n' +
        '    <div class="bb-grid-toolbar-viewkeeper" ng-if="!hasListbuilder">\n' +
        '        <div ng-show="locals.showToolbar">\n' +
        '            <bb-grid-toolbar ng-if="!customToolbar.hasCustomToolbar">\n' +
        '                <ng-transclude></ng-transclude>\n' +
        '            </bb-grid-toolbar>\n' +
        '            <div ng-if="customToolbar.hasCustomToolbar">\n' +
        '                <ng-transclude ng-transclude-slot="bbGridToolbar">\n' +
        '                </ng-transclude>\n' +
        '                <ng-transclude></ng-transclude>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '\n' +
        '    <div class="clearfix" ng-if="!hasListbuilder"></div>\n' +
        '\n' +
        '    <div class="table-responsive" bb-wait="options.loading">\n' +
        '        <table id="{{locals.gridId}}" class="bb-grid-table" ng-class="{\'grid-multiselect\' : locals.multiselect}"></table>\n' +
        '        <div class="bb-grid-empty-wait" ng-if="locals.hasWaitAndEmpty()"></div>\n' +
        '    </div>\n' +
        '\n' +
        '    <div ng-if="!paginationOptions &amp;&amp; !locals.hasInfiniteScroll &amp;&amp; !hasListbuilder" class="bb-table-loadmore" data-bbauto-field="LoadMoreButton" ng-show="options.hasMoreRows" ng-click="locals.loadMore()">\n' +
        '        <span class="fa fa-cloud-download"></span>\n' +
        '        <button type="button" class="btn btn-link">{{resources.grid_load_more}}</button>\n' +
        '    </div>\n' +
        '\n' +
        '    <div ng-if="!paginationOptions &amp;&amp; locals.hasInfiniteScroll &amp;&amp; !hasListbuilder">\n' +
        '        <bb-infinite-scroll\n' +
        '            bb-infinite-scroll-load="locals.loadMore()"\n' +
        '            bb-infinite-scroll-has-more="options.hasMoreRows">\n' +
        '        </bb-infinite-scroll>        \n' +
        '    </div>\n' +
        '\n' +
        '    <div ng-if="paginationOptions &amp;&amp; !hasListbuilder" class="bb-grid-pagination-container">\n' +
        '        <ul \n' +
        '            uib-pagination \n' +
        '            ng-show="paginationOptions.recordCount > options.data.length" \n' +
        '            total-items="paginationOptions.recordCount" \n' +
        '            items-per-page="paginationOptions.itemsPerPage" \n' +
        '            ng-model="paginationOptions.currentPage" \n' +
        '            ng-change="paginationOptions.pageChanged()" \n' +
        '            max-size="paginationOptions.maxPages" \n' +
        '            boundary-link-numbers="paginationOptions.boundaryLinks" \n' +
        '            force-ellipses="paginationOptions.boundaryLinks">\n' +
        '        </ul>\n' +
        '        <div class="clearfix"></div>\n' +
        '    </div>\n' +
        '\n' +
        '    <div class="bb-grid-action-bar-and-back-to-top" ng-if="!hasListbuilder">\n' +
        '        <bb-grid-action-bar ng-if="locals.multiselect && multiselectActions && updateMultiselectActions" bb-multiselect-actions="multiselectActions" bb-selections-updated="updateMultiselectActions(selections)">\n' +
        '        </bb-grid-action-bar>\n' +
        '        <div class="bb-table-backtotop" data-bbauto-field="BackToTopButton" ng-show="locals.isScrolled" ng-click="locals.backToTop();">\n' +
        '            <span style="float:left">\n' +
        '                <span class="fa fa-arrow-up "></span>\n' +
        '                <button type="button" class="btn btn-link">{{resources.grid_back_to_top}}</button>\n' +
        '            </span>\n' +
        '            <span style="float:right">\n' +
        '                <span class="fa fa-arrow-up "></span>\n' +
        '                <button type="button" class="btn btn-link">{{resources.grid_back_to_top}}</button>\n' +
        '            </span>\n' +
        '            <div class="clearfix"></div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</section>\n' +
        '');
    $templateCache.put('sky/templates/grids/gridtoolbar.html',
        '<div class="bb-grid-toolbar-container">\n' +
        '    <div class="clearfix toolbar bb-table-toolbar" bb-search-container>\n' +
        '\n' +
        '        <button \n' +
        '            type="button" \n' +
        '            ng-attr-title="{{options.onAddClickLabel}}"\n' +
        '            data-bbauto-field="AddButton" \n' +
        '            class="bb-grid-toolbar-btn btn-primary btn" \n' +
        '            ng-show="toolbarLocals.hasAdd" \n' +
        '            ng-click="options.onAddClick()">\n' +
        '            <i class="fa fa-lg fa-plus-circle"></i>\n' +
        '        </button>\n' +
        '        <div class="bb-grid-toolbar-button-container">\n' +
        '            <ng-transclude></ng-transclude>\n' +
        '        </div>\n' +
        '\n' +
        '        <div ng-if="!bbGridSearch" class="bb-search-container">\n' +
        '            <input \n' +
        '                type="text" \n' +
        '                placeholder="{{resources.grid_search_placeholder}}" \n' +
        '                ng-model="toolbarLocals.searchText" \n' +
        '                ng-keyup="$event.keyCode == 13 && toolbarLocals.applySearchText()" \n' +
        '                data-bbauto-field="SearchBox" />\n' +
        '            <div \n' +
        '                class="bb-search-icon fa fa-lg fa-search" \n' +
        '                data-bbauto-field="SearchButton" \n' +
        '                ng-click="toolbarLocals.applySearchText()"></div>\n' +
        '        </div>\n' +
        '\n' +
        '        <bb-search-input \n' +
        '            ng-if="bbGridSearch"\n' +
        '            bb-search-text="bbGridSearchText"\n' +
        '            bb-on-search="toolbarLocals.toolbarSearch(searchText)"\n' +
        '            bb-on-search-text-changed="toolbarLocals.searchTextChanged(searchText)"\n' +
        '            bb-search-placeholder="bbGridSearchPlaceholder"\n' +
        '            >\n' +
        '        </bb-search-input>\n' +
        '\n' +
        '        <button \n' +
        '            type="button" \n' +
        '            class="btn bb-btn-secondary bb-grid-toolbar-btn bb-column-picker-btn"\n' +
        '            ng-attr-title="{{::\'grid_columns_button\' | bbResources}}"       \n' +
        '            data-bbauto-field="ColumnPickerButton" \n' +
        '            ng-show="!options.hideColPicker" \n' +
        '            ng-click="toolbarLocals.openColumnPicker()">\n' +
        '            <span class="fa fa-lg fa-columns"></span>\n' +
        '        </button>\n' +
        '        <button \n' +
        '            type="button" \n' +
        '            class="btn bb-btn-secondary bb-grid-toolbar-btn bb-filter-btn" \n' +
        '            ng-class="{\'bb-filters-inline-active\': options.filtersAreActive}" \n' +
        '            data-bbauto-field="FilterButton" \n' +
        '            ng-if="!options.hideFilters &amp;&amp; !bbGridFilterClick" \n' +
        '            ng-click="toolbarLocals.toggleFilterMenu()">\n' +
        '            \n' +
        '            <span class="fa fa-lg fa-filter"></span>\n' +
        '        \n' +
        '        </button>\n' +
        '        \n' +
        '        <bb-filter-button \n' +
        '            class="bb-filter-btn"\n' +
        '            ng-if="!options.hideFilters &amp;&amp; bbGridFilterClick"\n' +
        '            bb-filter-button-on-click="bbGridFilterClick()"\n' +
        '            bb-filter-button-active="options.filtersAreActive"\n' +
        '            >\n' +
        '        </bb-filter-button>\n' +
        '        <div class="bb-grid-toolbar-sort-container">\n' +
        '            <div ng-transclude="bbGridToolbarSort">\n' +
        '                \n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '    <div class="bb-grid-filter-summary-container">\n' +
        '        <div ng-transclude="bbGridToolbarFilterSummary">\n' +
        '        </div>\n' +
        '    </div>\n' +
        '    <div class="bb-grid-filter-inline-container" ng-hide="options.hasInlineFilters && !toolbarLocals.filtersVisible">\n' +
        '    </div>\n' +
        '    <div class="bb-grid-top-scrollbar">\n' +
        '        <div></div>\n' +
        '    </div>\n' +
        '</div>\n' +
        '');
    $templateCache.put('sky/templates/grids/seemore.html',
        '<div bb-text-expand="data" bb-text-expand-max-length="100" style="white-space: pre-wrap"></div>\n' +
        '');
    $templateCache.put('sky/templates/infinitescroll/infinitescroll.component.html',
        '<div class="bb-infinite-scroll" ng-if="$ctrl.bbInfiniteScrollHasMore">\n' +
        '  <button type="button" class="btn bb-btn-secondary" ng-if="!$ctrl.isLoading" ng-click="$ctrl.startInfiniteScrollLoad()">{{::\'infinite_scroll_load_more\' | bbResources}}</button>\n' +
        '  <div bb-wait="$ctrl.isLoading">\n' +
        '  </div>\n' +
        '</div>');
    $templateCache.put('sky/templates/keyinfo/keyinfo.component.html',
        '<div ng-class="{\'bb-key-info-horizontal\': $ctrl.bbKeyInfoLayout === \'horizontal\'}" class="bb-key-info">\n' +
        '    <div class="bb-key-info-value" ng-transclude="value"></div>\n' +
        '    <div class="bb-key-info-label" ng-transclude="label"></div>\n' +
        '</div>');
    $templateCache.put('sky/templates/listbuilder/listbuilder.add.component.html',
        '<button ng-attr-title="{{$ctrl.bbListbuilderAddLabel}}" type="button" ng-click="$ctrl.bbListbuilderAddAction()" class="btn btn-primary">\n' +
        '    <i class="fa fa-lg fa-plus-circle"></i>\n' +
        '</button>');
    $templateCache.put('sky/templates/listbuilder/listbuilder.card.component.html',
        '<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">\n' +
        '    <ng-transclude>\n' +
        '    </ng-transclude>\n' +
        '</div>');
    $templateCache.put('sky/templates/listbuilder/listbuilder.cards.component.html',
        '<div class="row" ng-if="$ctrl.viewIsActive()">\n' +
        '    <ng-transclude></ng-transclude>\n' +
        '</div>');
    $templateCache.put('sky/templates/listbuilder/listbuilder.column.picker.component.html',
        '<div class="bb-listbuilder-column-picker" ng-if="$ctrl.dropdownCtrl.bbListbuilderSecondaryActionsCurrentView &amp;&amp; $ctrl.dropdownCtrl.bbListbuilderSecondaryActionsCurrentView.viewName === \'grid\'">\n' +
        '    <bb-listbuilder-secondary-action\n' +
        '        bb-listbuilder-secondary-action-click="$ctrl.openColumnPicker()">\n' +
        '        {{\'listbuilder_pick_columns\' | bbResources}}\n' +
        '    </bb-listbuilder-secondary-action>\n' +
        '</div>\n' +
        '');
    $templateCache.put('sky/templates/listbuilder/listbuilder.component.html',
        '<div class="bb-listbuilder">\n' +
        '    <div class="bb-listbuilder-toolbar-container" ng-transclude="bbListbuilderToolbar">\n' +
        '    </div>\n' +
        '\n' +
        '    <div class="bb-listbuilder-content-container" ng-transclude="bbListbuilderContent">\n' +
        '    </div>\n' +
        '\n' +
        '    <div class="bb-listbuilder-footer-container" ng-transclude="bbListbuilderFooter">\n' +
        '    </div>\n' +
        '</div>');
    $templateCache.put('sky/templates/listbuilder/listbuilder.content.component.html',
        '<div ng-class="$ctrl.listbuilderCtrl.currentView.viewContentClass" class="bb-listbuilder-content">\n' +
        '    <ng-transclude></ng-transclude>\n' +
        '</div>');
    $templateCache.put('sky/templates/listbuilder/listbuilder.content.custom.component.html',
        '<div class="bb-listbuilder-content-custom" ng-if="$ctrl.viewIsActive()">\n' +
        '    <ng-transclude></ng-transclude>\n' +
        '</div>');
    $templateCache.put('sky/templates/listbuilder/listbuilder.footer.component.html',
        '<div class="bb-listbuilder-footer">\n' +
        '\n' +
        '    <ng-transclude></ng-transclude>\n' +
        '\n' +
        '    <bb-infinite-scroll\n' +
        '        bb-infinite-scroll-has-more="$ctrl.bbListbuilderShowLoadMore && $ctrl.listbuilderCtrl.currentView.viewName"\n' +
        '        bb-infinite-scroll-load="$ctrl.loadCallback()">\n' +
        '    </bb-infinite-scroll>\n' +
        '\n' +
        '</div>\n' +
        '');
    $templateCache.put('sky/templates/listbuilder/listbuilder.grid.component.html',
        '<div ng-if="$ctrl.viewIsActive()">\n' +
        '    <ng-transclude></ng-transclude>\n' +
        '</div>');
    $templateCache.put('sky/templates/listbuilder/listbuilder.multiselect.clearall.component.html',
        '<button class="btn btn-link bb-listbuilder-clear-all" ng-click="$ctrl.clearAllItems()">\n' +
        '    {{\'listbuilder_multiselect_clear_all\' | bbResources}}\n' +
        '</button>');
    $templateCache.put('sky/templates/listbuilder/listbuilder.multiselect.component.html',
        '<div class="bb-listbuilder-multiselect">\n' +
        '  <ng-transclude></ng-transclude>\n' +
        '  <label ng-if="$ctrl.hasOnlySelected" class="control-label bb-listbuilder-show-selected">\n' +
        '    <input \n' +
        '        type="checkbox" \n' +
        '        bb-check \n' +
        '        ng-model="$ctrl.bbListbuilderShowOnlySelected" \n' +
        '        ng-change="$ctrl.toggleOnlySelected($ctrl.bbListbuilderShowOnlySelected)">\n' +
        '    {{\'listbuilder_show_only_selected\' | bbResources}}\n' +
        '  </label>\n' +
        '\n' +
        '</div>');
    $templateCache.put('sky/templates/listbuilder/listbuilder.multiselect.selectall.component.html',
        '<button class="btn btn-link bb-listbuilder-select-all" ng-click="$ctrl.selectAllItems()">\n' +
        '    {{\'listbuilder_multiselect_select_all\' | bbResources}}\n' +
        '</button>');
    $templateCache.put('sky/templates/listbuilder/listbuilder.repeater.component.html',
        '<div ng-if="$ctrl.viewIsActive()">\n' +
        '    <ng-transclude></ng-transclude>\n' +
        '</div>');
    $templateCache.put('sky/templates/listbuilder/listbuilder.secondary.action.component.html',
        '<div class="bb-dropdown-item" role="presentation"> \n' +
        '    <button \n' +
        '        role="menuitem" \n' +
        '        class="btn bb-btn-secondary"\n' +
        '        ng-disabled="$ctrl.bbListbuilderSecondaryActionDisabled" \n' +
        '        ng-click="$ctrl.bbListbuilderSecondaryActionClick()">\n' +
        '        <ng-transclude></ng-transclude>\n' +
        '    </button>\n' +
        '</div>');
    $templateCache.put('sky/templates/listbuilder/listbuilder.secondary.actions.component.html',
        '<div \n' +
        '    ng-show="$ctrl.totalSecondaryActions > 0"\n' +
        '    class="bb-listbuilder-secondary-actions"\n' +
        '    uib-dropdown \n' +
        '    ng-attr-dropdown-append-to-body="{{$ctrl.bbListbuilderSecondaryActionsAppendToBody}}">\n' +
        '    <button \n' +
        '        type="button" \n' +
        '        class="btn bb-btn-secondary" \n' +
        '        uib-dropdown-toggle\n' +
        '        ng-attr-aria-controls="{{$ctrl.secondaryMenuId}}"\n' +
        '        ng-attr-title="{{\'listbuilder_show_secondary_actions\' | bbResources}}">\n' +
        '        <i class="fa fa-lg fa-ellipsis-h"></i>\n' +
        '    </button>\n' +
        '    <div\n' +
        '        uib-dropdown-menu \n' +
        '        ng-attr-id="{{$ctrl.secondaryMenuId}}" \n' +
        '        role="menu"\n' +
        '        class="bb-dropdown-menu">\n' +
        '        <bb-listbuilder-secondary-actions-dropdown\n' +
        '             bb-listbuilder-secondary-actions-item-changed="$ctrl.itemChanged(itemAdded)"\n' +
        '             bb-listbuilder-secondary-actions-current-view="$ctrl.listbuilderCtrl.currentView">\n' +
        '            <ng-transclude></ng-transclude>\n' +
        '        </bb-listbuilder-secondary-actions-dropdown>\n' +
        '    </div>\n' +
        '</div>');
    $templateCache.put('sky/templates/listbuilder/listbuilder.secondary.actions.dropdown.component.html',
        '<div>\n' +
        '    <ng-transclude></ng-transclude>\n' +
        '</div>');
    $templateCache.put('sky/templates/listbuilder/listbuilder.switcher.component.html',
        '<div \n' +
        '    class="bb-listbuilder-switcher" \n' +
        '    uib-dropdown \n' +
        '    dropdown-append-to-body \n' +
        '    ng-if="$ctrl.bbListbuilderSwitcherViews.length > 1">\n' +
        '    <button \n' +
        '        class="btn bb-btn-secondary" \n' +
        '        type="button"\n' +
        '        ng-attr-aria-controls="{{$ctrl.switcherId}}" \n' +
        '        uib-dropdown-toggle\n' +
        '        ng-attr-title="{{$ctrl.bbListbuilderSwitcherCurrentView.viewSwitcherLabel}}">\n' +
        '        <i \n' +
        '          class="fa fa-lg" \n' +
        '          ng-class="$ctrl.bbListbuilderSwitcherCurrentView.viewSwitcherClass"\n' +
        '          ></i>\n' +
        '    </button>\n' +
        '    <ul \n' +
        '        ng-attr-id="{{$ctrl.switcherId}}"\n' +
        '        class="dropdown-menu bb-listbuilder-switcher-menu" \n' +
        '        uib-dropdown-menu \n' +
        '        role="menu">\n' +
        '        <li role="presentation" ng-repeat="view in $ctrl.bbListbuilderSwitcherViews" ng-if="view.viewName !== $ctrl.bbListbuilderSwitcherCurrentView.viewName">\n' +
        '            <a \n' +
        '                role="menuitem"\n' +
        '                href="javascript:void(0)" \n' +
        '                ng-click="$ctrl.switchView(view)"\n' +
        '                ng-attr-title="{{view.viewSwitcherLabel}}">\n' +
        '                <i \n' +
        '                    class="fa fa-lg" \n' +
        '                    ng-class="view.viewSwitcherClass"\n' +
        '                    ></i>\n' +
        '            </a>\n' +
        '        </li>\n' +
        '    </ul>\n' +
        '</div>');
    $templateCache.put('sky/templates/listbuilder/listbuilder.toolbar.component.html',
        '<div class="bb-listbuilder-toolbar-summary-container" ng-attr-id="{{$ctrl.listbuilderToolbarId}}">\n' +
        '    <div class="bb-listbuilder-toolbar" bb-search-container>\n' +
        '        <div class="bb-listbuilder-toolbar-item bb-listbuilder-add-container" ng-transclude="bbListbuilderAdd">\n' +
        '        </div>\n' +
        '        <div class="bb-listbuilder-toolbar-item">\n' +
        '            <bb-search-input\n' +
        '                bb-search-text="$ctrl.bbListbuilderSearchText"\n' +
        '                bb-on-search-text-changed="$ctrl.searchTextChanged(searchText)"\n' +
        '                bb-search-placeholder="$ctrl.bbListbuilderSearchPlaceholder"\n' +
        '                bb-on-search="$ctrl.applySearchText(searchText)"\n' +
        '                >\n' +
        '            </bb-search-input>\n' +
        '        </div>\n' +
        '        \n' +
        '        <div class="bb-listbuilder-toolbar-item" ng-transclude="bbListbuilderFilter">\n' +
        '\n' +
        '        </div>\n' +
        '\n' +
        '        <div class="bb-listbuilder-toolbar-item" ng-transclude="bbListbuilderSort">\n' +
        '\n' +
        '        </div>\n' +
        '\n' +
        '        <div class="bb-listbuilder-toolbar-item" ng-transclude="bbListbuilderToolbarSecondaryActions">\n' +
        '        \n' +
        '        </div>\n' +
        '\n' +
        '        <ng-transclude></ng-transclude>\n' +
        '        \n' +
        '        <div class="bb-listbuilder-toolbar-switcher-container">\n' +
        '            <bb-listbuilder-switcher \n' +
        '                bb-listbuilder-switcher-views="$ctrl.listbuilderCtrl.contentViews" \n' +
        '                bb-listbuilder-switcher-current-view="$ctrl.listbuilderCtrl.currentView"\n' +
        '                bb-listbuilder-switcher-view-change="$ctrl.viewChanged(newView)"\n' +
        '                >\n' +
        '            </bb-listbuilder-switcher>\n' +
        '        </div>    \n' +
        '    </div>\n' +
        '\n' +
        '    <div class="bb-listbuilder-filter-summary-container">\n' +
        '        <div ng-transclude="bbListbuilderFilterSummary">\n' +
        '        </div>\n' +
        '    </div>\n' +
        '\n' +
        '    <div class="bb-listbuilder-toolbar-multiselect-container">\n' +
        '        <div ng-transclude="bbListbuilderToolbarMultiselect">\n' +
        '        </div>\n' +
        '    </div>\n' +
        '\n' +
        '    <div class="bb-listbuilder-toolbar-top-scrollbar">\n' +
        '        <div></div>    \n' +
        '    </div>\n' +
        '    \n' +
        '</div>');
    $templateCache.put('sky/templates/modal/modal.html',
        '<div class="bb-modal-content-wrapper" ng-transclude></div>');
    $templateCache.put('sky/templates/modal/modalfooter.html',
        '<div class="modal-footer" ng-transclude></div>\n' +
        '');
    $templateCache.put('sky/templates/modal/modalfooterbutton.html',
        '<button class="btn bb-btn-secondary" type="button" ng-transclude></button>\n' +
        '');
    $templateCache.put('sky/templates/modal/modalfooterbuttoncancel.html',
        '<button class="btn btn-link" type="button" ng-click="dismiss(\'cancel\');" ng-transclude></button>');
    $templateCache.put('sky/templates/modal/modalfooterbuttonprimary.html',
        '<button class="btn btn-primary" type="submit" ng-transclude></button>');
    $templateCache.put('sky/templates/modal/modalheader.html',
        '<div class="modal-header">\n' +
        '    <h1 class="bb-dialog-header" ng-transclude></h1>\n' +
        '    <div bb-help-button bb-help-key="{{bbModalHelpKey}}" bb-set-help-key-override="true" data-bbauto-field="ModalHelpButton" ng-if="bbModalHelpKey"></div>\n' +
        '    <div \n' +
        '        role="button" \n' +
        '        aria-label="{{\'modal_close\' | bbResources}}"\n' +
        '        tabindex="0" \n' +
        '        class="fa fa-times close" \n' +
        '        ng-click="dismiss(\'close\');"\n' +
        '        ng-keyup="$event.which === 13 &amp;&amp; dismiss(\'close\');">\n' +
        '    </div>\n' +
        '    \n' +
        '</div>\n' +
        '');
    $templateCache.put('sky/templates/navbar/navbar.component.html',
        '<nav class="navbar navbar-default bb-navbar" ng-transclude></nav>');
    $templateCache.put('sky/templates/page/page.html',
        '<section ng-if="locals.noPageStatusSpecified() || bbPageStatus === locals.pageStatuses.LOADED">\n' +
        '    <div ng-transclude ng-init="locals.onShowing()"></div>\n' +
        '</section>\n' +
        '<section class="container-fluid bb-page-content-column-container" ng-show="bbPageStatus === locals.pageStatuses.NOT_AUTHORIZED">\n' +
        '    <div class="row">\n' +
        '        <section class="bb-page-content-column col-xs-12 text-center">\n' +
        '            <div class="m">\n' +
        '                <h3>\n' +
        '                    {{resources.page_noaccess_header}}\n' +
        '                </h3>\n' +
        '            </div>\n' +
        '            <div class="bb-page-noaccess-description">{{resources.page_noaccess_description}}</div>\n' +
        '            <div class="m-lg">\n' +
        '                <button type="button" class="btn btn-lg btn-primary" ng-click="locals.navigateAway()" data-bbauto-field="NavigateAwayButton">\n' +
        '                    {{resources.page_noaccess_button}}\n' +
        '                </button>\n' +
        '            </div>\n' +
        '        </section>\n' +
        '    </div>\n' +
        '</section>\n' +
        '');
    $templateCache.put('sky/templates/pagesummary/pagesummary.directive.html',
        '<div class="bb-page-header">\n' +
        '  <div class="container-fluid">\n' +
        '    <div class="bb-page-summary-alert"></div>\n' +
        '    <div class="row">\n' +
        '      <div class="bb-page-summary-left col-xs-12" ng-class="bbPageSummary.getPageSummaryLeftCls()">\n' +
        '        <div class="bb-page-summary-image" ng-show="bbPageSummary.imageCtrl"></div>\n' +
        '        <div>\n' +
        '          <h1 class="bb-page-summary-title" ng-show="bbPageSummary.titleCtrl"></h1>\n' +
        '          <div class="bb-page-summary-subtitle" ng-show="bbPageSummary.subtitleCtrl"></div>\n' +
        '          <div class="bb-page-summary-status" ng-show="bbPageSummary.statusCtrl"></div>\n' +
        '          <div class="bb-page-summary-key-info-xs"></div>\n' +
        '          <div class="bb-page-summary-content"></div>\n' +
        '        </div>\n' +
        '      </div>\n' +
        '      <div class="bb-page-summary-key-info-sm col-sm-3 hidden-xs" ng-class="bbPageSummary.getKeyInfoCls()">\n' +
        '        <div class="bb-page-summary-key-info"></div>\n' +
        '      </div>\n' +
        '    </div>\n' +
        '  </div>\n' +
        '  <ng-transclude></ng-transclude>\n' +
        '</div>\n' +
        '<div class="bb-page-summary-action-bar"></div>\n' +
        '');
    $templateCache.put('sky/templates/pagination/uib.pagination.directive.html',
        '<ul class="pagination">\n' +
        '  <li ng-if="::boundaryLinks" ng-class="{disabled: noPrevious()||ngDisabled}" class="pagination-first"><a href ng-click="selectPage(1, $event)" ng-disabled="noPrevious()||ngDisabled" uib-tabindex-toggle>{{::getText(\'first\')}}</a></li>\n' +
        '  <li ng-if="::directionLinks" ng-class="{disabled: noPrevious()||ngDisabled}" class="pagination-prev"><a href ng-click="selectPage(page - 1, $event)" ng-disabled="noPrevious()||ngDisabled" uib-tabindex-toggle>{{::getText(\'previous\')}}</a></li>\n' +
        '  <li ng-repeat="page in pages track by $index" ng-class="{active: page.active,disabled: ngDisabled&&!page.active}" class="pagination-page"><a href ng-click="selectPage(page.number, $event)" ng-disabled="ngDisabled&&!page.active" uib-tabindex-toggle>{{page.text}}</a></li>\n' +
        '  <li ng-if="::directionLinks" ng-class="{disabled: noNext()||ngDisabled}" class="pagination-next"><a href ng-click="selectPage(page + 1, $event)" ng-disabled="noNext()||ngDisabled" uib-tabindex-toggle>{{::getText(\'next\')}}</a></li>\n' +
        '  <li ng-if="::boundaryLinks" ng-class="{disabled: noNext()||ngDisabled}" class="pagination-last"><a href ng-click="selectPage(totalPages, $event)" ng-disabled="noNext()||ngDisabled" uib-tabindex-toggle>{{::getText(\'last\')}}</a></li>\n' +
        '</ul>');
    $templateCache.put('sky/templates/popover/popup.html',
        '<div class="arrow"></div>\n' +
        '\n' +
        '<div class="popover-inner">\n' +
        '    <h3 class="popover-title" ng-bind="uibTitle" ng-if="uibTitle"></h3>\n' +
        '    <div class="popover-content"\n' +
        '      uib-tooltip-template-transclude="contentExp()"\n' +
        '      tooltip-template-transclude-scope="originScope()"></div>\n' +
        '</div>\n' +
        '');
    $templateCache.put('sky/templates/reorder/reorder.component.html',
        '<div class="bb-reorder-container">\n' +
        '  <div ng-repeat="item in $ctrl.bbReorderItems" class="bb-reorder-list-row">\n' +
        '    <div class="bb-reorder-list-row-container">\n' +
        '      <div class="bb-reorder-list-col bb-reorder-list-col-icon">\n' +
        '        <i class="fa fa-arrows"></i>\n' +
        '      </div>\n' +
        '      <div class="bb-reorder-list-col bb-reorder-list-col-content">\n' +
        '        <div class="bb-reorder-list-title">{{item.title}}</div>\n' +
        '        <div class="bb-reorder-list-description">{{item.description}}</div>\n' +
        '      </div>\n' +
        '      <button \n' +
        '          type="button" \n' +
        '          ng-show="!$first &amp;&amp; !$ctrl.sorting" \n' +
        '          ng-click="$ctrl.pushToTop(item)" \n' +
        '          class="bb-reorder-list-col bb-reorder-list-col-top btn btn-link"\n' +
        '      >\n' +
        '        <i class="fa fa-arrow-circle-up"></i>\n' +
        '        <span>{{\'reorder_top\' | bbResources}}</span>\n' +
        '      </button>\n' +
        '      <div ng-show="$ctrl.sorting" class="bb-reorder-list-col">\n' +
        '        <span class="bb-reorder-list-sorting-number"></span>\n' +
        '      </div>\n' +
        '    </div>\n' +
        '  </div>\n' +
        '</div>\n' +
        '');
    $templateCache.put('sky/templates/reordertable/reordertable.component.html',
        '<div class="bb-reorder-table">\n' +
        '    <div class="bb-reorder-table-container">\n' +
        '        <div class="bb-reorder-table-header-container table-responsive">\n' +
        '            <div class="bb-reorder-table-header">\n' +
        '                <div class="bb-reorder-table-labels">\n' +
        '                    <div ng-if="$ctrl.sortable" class="bb-reorder-table-label-cell bb-reorder-table-label-icon"></div>\n' +
        '                    <div ng-if="$ctrl.contextMenuItems" class="bb-reorder-table-label-cell bb-reorder-table-label-context"></div>\n' +
        '                    <div ng-if="column.show" ng-repeat="column in $ctrl.options.columns" class="bb-reorder-table-label-cell" ng-style="{ \'width\': column.width }">\n' +
        '                        <div ng-if="column.title || column.title === \'\'">\n' +
        '                            {{column.title}}\n' +
        '                        </div>\n' +
        '                        <div ng-if="!column.title && column.title !== \'\'">\n' +
        '                            {{column.name}}\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                    <div ng-if="$ctrl.sortable" class="bb-reorder-table-label-cell bb-reorder-table-label-top"></div>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="bb-reorder-table-body-container">\n' +
        '            <div ng-repeat="item in $ctrl.options.data" ng-class="$ctrl.setFixed($index, $ctrl.options.fixed)" ng-init="rowIndex=$index">\n' +
        '                <div class="bb-reorder-table-row-container">\n' +
        '                    <div ng-if="$ctrl.sortable" class="bb-reorder-table-col-icon">\n' +
        '                        <i class="fa fa-arrows"></i>\n' +
        '                    </div>\n' +
        '                    <div ng-if="$ctrl.contextMenuItems" class="bb-reorder-table-col-context">\n' +
        '                        <div class="bb-reorder-table-cell">\n' +
        '                            <bb-context-menu ng-if="$ctrl.contextMenuItems[item[$ctrl.options.index]].length > 0" bb-context-menu-label="Reorder Table Context">\n' +
        '                                <bb-context-menu-item ng-repeat="action in $ctrl.contextMenuItems[item[$ctrl.options.index]]" bb-context-menu-action="action.cmd()">{{action.title}}</bb-context-menu-item>\n' +
        '                            </bb-context-menu>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                    <div ng-if="column.show" ng-repeat="column in $ctrl.options.columns" class="bb-reorder-table-col" ng-style="{ \'width\': column.width }"\n' +
        '                        id="{{\'bb-reorder-table-\' + $ctrl.tableId + \'-cell-\' + rowIndex + \'-\' + column.name}}">\n' +
        '                        <div ng-if="!column.template_url" class="bb-reorder-table-cell">{{item[column.jsonmap]}}</div>\n' +
        '                        <div ng-if="column.template_url" class="bb-reorder-table-cell" ng-init="$ctrl.cellLink(item, rowIndex, column)"></div>\n' +
        '                    </div>\n' +
        '                    <div ng-if="$ctrl.sortable" class="bb-reorder-table-col-top">\n' +
        '                        <div class="bb-reorder-table-cell">\n' +
        '                            <button type="button" ng-if="!$ctrl.sorting && $ctrl.options.fixed < $index" ng-click="$ctrl.pushToTop(item)" class="btn btn-link"> \n' +
        '                              <i class="fa fa-arrow-circle-up"></i>\n' +
        '                              <span>Top</span>\n' +
        '                           </button>\n' +
        '                        </div>\n' +
        '                        <div ng-if="$ctrl.sorting && !$ctrl.isFixed($index)" class="bb-reorder-table-cell">\n' +
        '                            <span class="bb-reorder-table-sorting-number"></span>\n' +
        '                        </div>\n' +
        '                        <div ng-if="$ctrl.isFixed($index)" class="bb-reorder-table-cell bb-reorder-table-lock">\n' +
        '                            <span class="fa fa-lock"></span>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>');
    $templateCache.put('sky/templates/repeater/repeater.component.html',
        '<div class="bb-repeater-component bb-repeater">\n' +
        '  <ng-transclude></ng-transclude>\n' +
        '</div>\n' +
        '');
    $templateCache.put('sky/templates/repeater/repeater.item.contextmenu.component.html',
        '<div class="bb-repeater-item-context-menu" ng-transclude>\n' +
        '</div>');
    $templateCache.put('sky/templates/repeater/repeater.item.directive.html',
        '<section class="bb-repeater-item" ng-class="bbRepeaterItem.getCls()">\n' +
        '  <div class="bb-repeater-item-left">\n' +
        '    <div class="bb-repeater-item-multiselect" ng-show="bbRepeaterItem.itemIsSelectable()">\n' +
        '      <input \n' +
        '        ng-attr-aria-label="{{bbRepeaterItem.bbRepeaterItemInputLabel}}" \n' +
        '        type="checkbox" \n' +
        '        bb-check \n' +
        '        ng-model="bbRepeaterItem.bbRepeaterItemSelected"\n' +
        '        ng-change="bbRepeaterItem.repeaterItemSelectionToggled(bbRepeaterItem.bbRepeaterItemSelected)" />\n' +
        '    </div>\n' +
        '    <div class="bb-repeater-item-context-menu-container" ng-transclude="bbRepeaterItemContextMenu">\n' +
        '    </div>\n' +
        '  </div>\n' +
        '  <div class="bb-repeater-item-right" ng-click="bbRepeaterItem.selectItem()">\n' +
        '    <header class="bb-repeater-item-header" ng-click="bbRepeaterItem.headerClick($event)">\n' +
        '      <div class="bb-repeater-item-title-container" ng-transclude="bbRepeaterItemTitle"></div>\n' +
        '      <bb-chevron bb-chevron-direction="bbRepeaterItem.chevronDirection"></bb-chevron>\n' +
        '    </header>\n' +
        '    <div class="bb-repeater-item-content" ng-transclude="bbRepeaterItemContent">\n' +
        '    </div>\n' +
        '  </div>\n' +
        '</section>\n' +
        '');
    $templateCache.put('sky/templates/repeater/repeater.item.title.component.html',
        '<h1 class="bb-repeater-item-title" ng-transclude>\n' +
        '</h1>');
    $templateCache.put('sky/templates/search/search.input.component.html',
        '<div class="bb-search-input-inline" ng-class="{\'bb-search-full-width\': $ctrl.bbSearchFullWidth}">\n' +
        '    <div \n' +
        '        class="bb-search-open-wrapper"\n' +
        '        ng-show="$ctrl.currentBreakpoint.xs"\n' +
        '        ng-class="{\'bb-search-open-applied\': $ctrl.showClear, \'bb-search-open-hidden\': !$ctrl.openButtonShown}">\n' +
        '\n' +
        '        <button \n' +
        '            type="button" \n' +
        '            class="btn bb-btn-secondary bb-search-btn-open" \n' +
        '            title="{{::\'search_open\' | bbResources}}" \n' +
        '            ng-click="$ctrl.openSearchInput(true)">\n' +
        '            <i class="fa fa-search fa-lg"></i>\n' +
        '        </button>\n' +
        '    </div>\n' +
        '    <div class="bb-search-and-dismiss">\n' +
        '\n' +
        '        <div class="bb-search-item-input">\n' +
        '            <div class="bb-search-input-container input-group">\n' +
        '                <input\n' +
        '                    type="text" \n' +
        '                    class="form-control bb-search-input"\n' +
        '                    ng-model="$ctrl.bbSearchText"\n' +
        '                    ng-change="$ctrl.searchTextChanged($ctrl.bbSearchText)"\n' +
        '                    ng-keyup="$event.keyCode == 13 && $ctrl.applySearchText($ctrl.bbSearchText)" \n' +
        '                    ng-focus="$ctrl.inputFocused(true)"\n' +
        '                    ng-blur="$ctrl.inputFocused(false)"\n' +
        '                    data-bbauto-field="SearchBox"\n' +
        '                    ng-attr-aria-label="{{::\'search_label\' | bbResources}}" \n' +
        '                    ng-attr-placeholder="{{$ctrl.placeholderText}}"\n' +
        '                    ng-attr-id="{{$ctrl.bbSearchInputId}}"\n' +
        '                    />    \n' +
        '\n' +
        '                <span class="input-group-btn">\n' +
        '                    \n' +
        '                    <button  \n' +
        '                        tabindex="-1"\n' +
        '                        aria-hidden="true"\n' +
        '                        ng-show="$ctrl.showClear && !$ctrl.openButtonShown" \n' +
        '                        type="button"\n' +
        '                        class="btn bb-search-btn-input-group bb-search-btn-clear"\n' +
        '                        ng-click="$ctrl.clearSearchText()">\n' +
        '                        <i class="fa fa-times"></i>\n' +
        '                    </button>\n' +
        '\n' +
        '                    <button\n' +
        '			ng-attr-tabindex="{{$ctrl.bbSearchSkipButtonWhileTabbing === true ? \'-1\' : undefined}}"\n' +
        '                        data-bbauto-field="SearchButton"          \n' +
        '                        type="button"\n' +
        '                        class="btn bb-search-btn-input-group bb-search-btn-apply"\n' +
        '                        ng-click="$ctrl.applySearchText($ctrl.bbSearchText)"\n' +
        '                        aria-label="{{::\'search_label\' | bbResources}}" >\n' +
        '                        <i class="fa fa-search fa-lg"></i>\n' +
        '                    </button>\n' +
        '                    \n' +
        '                </span>\n' +
        '                \n' +
        '            </div>\n' +
        '        </div>\n' +
        '        \n' +
        '        <div class="bb-search-item-dismiss" ng-show="$ctrl.currentBreakpoint.xs &amp;&amp; !$ctrl.openButtonShown">\n' +
        '            <button \n' +
        '                type="button" \n' +
        '                title="{{::\'search_dismiss\' | bbResources}}" \n' +
        '                class="btn bb-btn-secondary bb-search-btn-dismiss" \n' +
        '                ng-click="$ctrl.dismissSearchInput()">\n' +
        '                <i class="fa fa-chevron-circle-left fa-lg">\n' +
        '                </i>\n' +
        '            </button>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '\n' +
        '    \n' +
        '</div>\n' +
        '');
    $templateCache.put('sky/templates/sectionedform/sectionedform.component.html',
        '<uib-tabset active="$ctrl.activeSection" class="bb-sectionedform" vertical="true">\n' +
        '    <uib-tab ng-repeat="section in $ctrl.sections" select="$ctrl.tabSelected($index)">\n' +
        '        <uib-tab-heading>\n' +
        '            <span class="control-label" ng-class="{\'required\': $ctrl.sectionHasRequiredField(section) && !$ctrl.sectionIsInvalid(section), \'invalid\': $ctrl.sectionIsInvalid(section)}">{{$ctrl.buildSectionHeading(section)}}</span>\n' +
        '            <span class="fa fa-chevron-right bb-sectionedform-navigationicon" ng-show="$ctrl.isMobile"></span>\n' +
        '        </uib-tab-heading>\n' +
        '        <ng-include src="section.templateUrl"></ng-include>\n' +
        '    </uib-tab>\n' +
        '</uib-tabset>');
    $templateCache.put('sky/templates/selectfield/selectfield.directive.html',
        '<ng-include src="bbSelectField.getFieldInclude()"></ng-include>\n' +
        '<div ng-transclude></div>\n' +
        '');
    $templateCache.put('sky/templates/selectfield/selectfieldmultiple.include.html',
        '<button type="button" class="btn btn-link bb-select-field-multiple" ng-click="bbSelectField.selectFieldClick()">\n' +
        '  <i class="fa fa-plus-circle"></i> <span class="bb-select-field-multiple-title">{{bbSelectField.bbSelectFieldText}}</span>\n' +
        '</button>\n' +
        '<div>\n' +
        '  <div class="bb-select-field-multiple-items">\n' +
        '    <span class="bb-select-field-multiple-item" ng-if="bbSelectField.bbSelectFieldSelectedItems.length <= 5" ng-repeat="selectedItem in bbSelectField.bbSelectFieldSelectedItems">\n' +
        '      <div class="bb-select-field-multiple-item-title">\n' +
        '        {{selectedItem.title}}\n' +
        '      </div>\n' +
        '      <button class="close bb-select-field-multiple-item-delete" ng-click="bbSelectField.remove(selectedItem); bbSelectField.setModelTouched()">\n' +
        '        <span aria-hidden="true">&times;</span>\n' +
        '        <span class="sr-only">{{\'selectfield_remove\' | bbResources}}</span>\n' +
        '      </button>\n' +
        '    </span>\n' +
        '    <span class="bb-select-field-multiple-item" ng-if="bbSelectField.bbSelectFieldSelectedItems.length > 5">\n' +
        '      <div class="bb-select-field-multiple-item-title bb-select-field-multiple-summary">\n' +
        '        {{bbSelectField.getSummaryCountText()}}\n' +
        '      </div>\n' +
        '      <button \n' +
        '        type="button"\n' +
        '        class="close bb-select-field-multiple-item-delete" \n' +
        '        ng-click="bbSelectField.removeAll(); bbSelectField.setModelTouched()">\n' +
        '        <span aria-hidden="true">&times;</span>\n' +
        '        <span class="sr-only">{{\'selectfield_remove\' | bbResources}}</span>\n' +
        '      </button>\n' +
        '    </span>\n' +
        '  </ul>\n' +
        '</div>\n' +
        '');
    $templateCache.put('sky/templates/selectfield/selectfieldpicker.directive.html',
        '<bb-modal>\n' +
        '  <div class="modal-form">\n' +
        '    <bb-modal-header>{{bbSelectFieldPicker.getDialogHeaderText()}}</bb-modal-header>\n' +
        '    <div bb-modal-body>\n' +
        '      <ng-include src="bbSelectFieldPicker.bbSelectFieldPickerTemplate"></ng-include>\n' +
        '    </div>\n' +
        '  </div>\n' +
        '  <bb-modal-footer ng-if="!bbSelectFieldPicker.isSingleStyle()">\n' +
        '    <bb-modal-footer-button-primary ng-click="bbSelectFieldPicker.okClick()">\n' +
        '      {{\'selectfieldpicker_select\' | bbResources}}\n' +
        '    </bb-modal-footer-button-primary>\n' +
        '    <bb-modal-footer-button-cancel></bb-modal-footer-button-cancel>\n' +
        '  </bb-modal-footer>\n' +
        '  <bb-modal-footer ng-if="bbSelectFieldPicker.isSingleStyle()">\n' +
        '    <bb-modal-footer-button ng-click="bbSelectFieldPicker.clearClick()">\n' +
        '      {{\'selectfieldpicker_clear\' | bbResources}}\n' +
        '    </bb-modal-footer-button>\n' +
        '  </bb-modal-footer>\n' +
        '</bb-modal>\n' +
        '');
    $templateCache.put('sky/templates/selectfield/selectfieldsingle.include.html',
        '<div \n' +
        '    role="button" \n' +
        '    tabindex="0" \n' +
        '    class="btn btn-default bb-select-field-single" \n' +
        '    ng-click="bbSelectField.selectFieldClick()"\n' +
        '    ng-keypress="$event.keyCode === 13 &amp;&amp; bbSelectField.selectFieldClick()">\n' +
        '  <div class="bb-select-field-single-inner">\n' +
        '    <div class="bb-select-field-single-title">{{bbSelectField.bbSelectFieldSelectedItems[0].title}}<span class="bb-select-field-single-title-placeholder" ng-if="!bbSelectField.bbSelectFieldSelectedItems[0].title">{{bbSelectField.bbSelectFieldText}}</span></div>\n' +
        '    <span \n' +
        '        role="button"\n' +
        '        class="bb-select-field-clear"\n' +
        '        tabindex="0"\n' +
        '        ng-show="bbSelectField.bbSelectFieldClear &amp;&amp; bbSelectField.bbSelectFieldSelectedItems.length > 0"\n' +
        '        ng-click="bbSelectField.clearField($event)"\n' +
        '        ng-keypress="$event.keyCode === 13 &amp;&amp; bbSelectField.clearField($event)"\n' +
        '        ng-attr-aria-label="{{\'selectfieldpicker_clear\' | bbResources}}">\n' +
        '        <i class="fa fa-times"></i>\n' +
        '    </span>\n' +
        '    <div class="bb-select-field-single-icon">\n' +
        '        <i \n' +
        '            ng-class="{\'fa-sort\': bbSelectField.bbSelectFieldIcon !== \'search\', \n' +
        '                \'fa-search\': bbSelectField.bbSelectFieldIcon === \'search\'}"     \n' +
        '            class="fa">\n' +
        '        </i>\n' +
        '    </div>\n' +
        '  </div>\n' +
        '</div>\n' +
        '');
    $templateCache.put('sky/templates/sort/sort.component.html',
        '<div class="bb-sort" uib-dropdown>\n' +
        '    <button title="{{\'sort_button_label\' | bbResources}}" type="button" class="btn bb-btn-secondary" uib-dropdown-toggle>\n' +
        '        <i class="fa fa-lg fa-sort"></i>\n' +
        '    </button>\n' +
        '    <div class="bb-dropdown-menu dropdown-menu" uib-dropdown-menu role="menu"> \n' +
        '        <bb-sort-menu>\n' +
        '            <ng-transclude></ng-transclude>\n' +
        '        </bb-sort-menu>\n' +
        '    </div>\n' +
        '</div>');
    $templateCache.put('sky/templates/sort/sort.item.component.html',
        '<div \n' +
        '    class="bb-dropdown-item" \n' +
        '    ng-class="{\'bb-sort-selected\': $ctrl.isSelected }" role="menuitem">\n' +
        '    <a \n' +
        '        ng-class="{\'bb-emphasized\': $ctrl.isSelected }" \n' +
        '        href="javascript:void(0)" \n' +
        '        ng-click="$ctrl.itemSelected()">\n' +
        '        <ng-transclude></ng-transclude>\n' +
        '    </a>\n' +
        '</div>');
    $templateCache.put('sky/templates/sort/sort.menu.component.html',
        '<div> \n' +
        '    <div class="bb-dropdown-item" role="presentation">\n' +
        '        <a \n' +
        '            class="bb-subsection-heading bb-sort-heading" \n' +
        '            href="javascript:void(0)" \n' +
        '            aria-disabled="true" \n' +
        '            tabindex="-1">\n' +
        '        {{\'sort_menu_heading\' | bbResources}}\n' +
        '        </a>\n' +
        '    </div>\n' +
        '    <div class="bb-dropdown-item bb-sort-heading-divider divider"></div>\n' +
        '    <ng-transclude></ng-transclude>\n' +
        '</div>');
    $templateCache.put('sky/templates/summaryactionbar/summary.actionbar.cancel.component.html',
        '<button class="btn btn-link" type="button" ng-disabled="$ctrl.bbSummaryActionDisabled" ng-click="$ctrl.bbSummaryActionClick()">\n' +
        '    <ng-transclude></ng-transclude>\n' +
        '</button>');
    $templateCache.put('sky/templates/summaryactionbar/summary.actionbar.component.html',
        '<div class="bb-summary-actionbar" ng-class="{\'bb-summary-actionbar-summary-collapsed\': $ctrl.summaryCollapseMode}">\n' +
        '  <div class="bb-summary-actionbar-actions" ng-transclude="bbSummaryActionbarActions">\n' +
        '  </div>\n' +
        '  <div class="bb-summary-actionbar-summary" ng-hide="!$ctrl.summaryContentExists">\n' +
        '    <div class="bb-summary-actionbar-summary-items" ng-transclude="bbSummaryActionbarSummary">\n' +
        '    </div>\n' +
        '    <div class="bb-summary-actionbar-details-collapse" ng-show="$ctrl.summaryCollapseMode &amp;&amp; $ctrl.summaryContentExists">\n' +
        '      <button \n' +
        '        class="btn bb-btn-secondary" \n' +
        '        type="button"\n' +
        '        ng-click="$ctrl.hideSummarySection()"\n' +
        '        ng-attr-title="{{\'summary_actionbar_hide_summary\' | bbResources}}">\n' +
        '        <i class="fa fa-chevron-down"></i>\n' +
        '      </button>\n' +
        '    </div>\n' +
        '  </div>\n' +
        '  <div class="bb-summary-actionbar-details-expand" ng-show="$ctrl.showExpand &amp;&amp; $ctrl.summaryCollapseMode &amp;&amp; $ctrl.summaryContentExists">\n' +
        '    <button \n' +
        '      class="btn bb-btn-secondary" \n' +
        '      type="button"\n' +
        '      ng-click="$ctrl.showSummarySection()"\n' +
        '      ng-attr-title="{{\'summary_actionbar_show_summary\' | bbResources}}">\n' +
        '      <i class="fa fa-chevron-up"></i>\n' +
        '    </button>\n' +
        '  </div>\n' +
        '</div>');
    $templateCache.put('sky/templates/summaryactionbar/summary.actionbar.primary.component.html',
        '<button type="button" class="btn btn-primary" ng-disabled="$ctrl.bbSummaryActionDisabled" ng-click="$ctrl.bbSummaryActionClick()">\n' +
        '    <ng-transclude></ng-transclude>\n' +
        '</button>');
    $templateCache.put('sky/templates/summaryactionbar/summary.actionbar.secondary.actions.component.html',
        '<div class="bb-summary-actionbar-secondary-actions">\n' +
        '    <div class="bb-summary-actionbar-secondary-buttons" ng-show="!$ctrl.isXsScreen &amp;&amp; $ctrl.secondaryButtonCount < 5" role="menubar">\n' +
        '        <ng-transclude></ng-transclude>\n' +
        '    </div>\n' +
        '    <div ng-show="$ctrl.isXsScreen || $ctrl.secondaryButtonCount > 4">\n' +
        '        <div class="dropup" uib-dropdown>\n' +
        '            <button \n' +
        '                type="button" \n' +
        '                class="btn bb-btn-secondary" \n' +
        '                ng-attr-title="{{\'summary_actionbar_open_secondary\' | bbResources}}"\n' +
        '                uib-dropdown-toggle\n' +
        '                ng-attr-aria-controls="{{$ctrl.menuId}}">\n' +
        '                <i class="fa fa-lg fa-ellipsis-h"></i>\n' +
        '            </button>\n' +
        '            <div ng-attr-id="{{$ctrl.menuId}}" class="bb-dropdown-menu" uib-dropdown-menu role="menu">\n' +
        '                <ng-transclude></ng-transclude>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>    \n' +
        '</div>');
    $templateCache.put('sky/templates/summaryactionbar/summary.actionbar.secondary.component.html',
        '<div class="bb-dropdown-item" role="presentation"> \n' +
        '    <button type="button" class="btn bb-btn-secondary" role="menuitem" ng-disabled="$ctrl.bbSummaryActionDisabled" ng-click="$ctrl.bbSummaryActionClick()">\n' +
        '        <ng-transclude></ng-transclude>\n' +
        '    </button>\n' +
        '</div>');
    $templateCache.put('sky/templates/tabset/addbutton.html',
        '<button ng-click="bbTabAdd()" type="button" class="bb-tab-button-wrap btn bb-tab-button-add bb-btn-secondary" aria-label="{{\'tab_add\' | bbResources}}">\n' +
        '  <span class="btn bb-btn-secondary"><i class="fa fa-lg fa-plus-circle"></i></span>\n' +
        '</button>\n' +
        '');
    $templateCache.put('sky/templates/tabset/dropdown.html',
        '<div class="bb-tabset-dropdown nav nav-tabs" uib-dropdown ng-show="bbTabsetOptions.isSmallScreen &amp;&amp; bbTabsetOptions.tabCount > 1">\n' +
        '  <button type="button" class="btn btn-primary bb-tab-dropdown-button" uib-dropdown-toggle><div class="bb-tab-header-text">{{bbTabsetOptions.selectedTabHeader}}</div><i class="fa fa-caret-down"></i></button>\n' +
        '</div>\n' +
        '');
    $templateCache.put('sky/templates/tabset/largeheading.html',
        '<div class="hidden-xs"></div>\n' +
        '');
    $templateCache.put('sky/templates/tabset/openbutton.html',
        '<button ng-click="bbTabOpen()" type="button" class="bb-tab-button-wrap bb-tab-button-open btn bb-btn-secondary" aria-label="{{\'tab_open\' | bbResources}}">\n' +
        '  <span class="btn bb-btn-secondary"><i class="fa fa-lg fa-folder-open-o"></i></span>\n' +
        '</button>\n' +
        '');
    $templateCache.put('sky/templates/tabset/smallheading.html',
        '<div class="visible-xs">{{bbTabHeadingXs}}</div>\n' +
        '');
    $templateCache.put('sky/templates/tabset/tabbutton.html',
        '<li class="bb-tab-button"></li>\n' +
        '');
    $templateCache.put('sky/templates/tabset/verticaltabset.html',
        '<div class="bb-vertical-tabset">\n' +
        '  <uib-accordion class="bb-vertical-tabset-tabs"\n' +
        '      close-others="closeOthers"\n' +
        '      ng-hide="isMobile && !showTabs">\n' +
        '    <ul class="nav nav-tabs nav-stacked"\n' +
        '        ng-transclude></ul>\n' +
        '  </uib-accordion>\n' +
        '  <div class="tab-content"\n' +
        '      ng-hide="isMobile && showTabs">\n' +
        '    <div class="tab-pane"\n' +
        '         ng-repeat="tab in tabset.tabs"\n' +
        '         ng-class="{active: tabset.active === tab.index}"\n' +
        '         uib-tab-content-transclude="tab">\n' +
        '    </div>\n' +
        '  </div>\n' +
        '</div>\n' +
        '');
    $templateCache.put('sky/templates/tabset/verticaltabsetgroup.html',
        '<li>\n' +
        '    <div uib-accordion-group\n' +
        '        class="bb-vertical-tabset-group"\n' +
        '        is-open="bbVerticalTabsetGroup.isOpen"\n' +
        '        is-disabled="bbVerticalTabsetGroup.isDisabled">\n' +
        '        <uib-accordion-heading>\n' +
        '            <div class="bb-vertical-tabset-group-heading">\n' +
        '                <span ng-class="{\'bb-vertical-tabset-group-active\':bbVerticalTabsetGroup.active}">\n' +
        '                    {{bbVerticalTabsetGroup.heading}}\n' +
        '                </span>\n' +
        '                <span class="bb-vertical-tabset-group-chevron"\n' +
        '                    ng-class="{\'bb-vertical-tabset-group-chevron-open\':bbVerticalTabsetGroup.isOpen}"></span>\n' +
        '            </div>\n' +
        '        </uib-accordion-heading>\n' +
        '        <ul class="nav nav-tabs nav-stacked"\n' +
        '            ng-transclude>\n' +
        '        </ul>\n' +
        '    </div>\n' +
        '</li>\n' +
        '');
    $templateCache.put('sky/templates/textexpand/container.html',
        '<div class="bb-text-expand-container"></div>\n' +
        '');
    $templateCache.put('sky/templates/textexpand/ellipsis.html',
        '<span class="bb-text-expand-ellipsis">...</span>\n' +
        '');
    $templateCache.put('sky/templates/textexpand/expandmodal.html',
        '<bb-modal>\n' +
        '  <bb-modal-header>\n' +
        '    {{expandCtrl.headerContent}}\n' +
        '  </bb-modal-header>\n' +
        '  <div class="modal-form">\n' +
        '    <div bb-modal-body>\n' +
        '      <div>\n' +
        '        <span class="bb-text-expand-text">{{expandCtrl.textExpandContent}}</span>\n' +
        '      </div>\n' +
        '    </div>\n' +
        '    <bb-modal-footer>\n' +
        '      <bb-modal-footer-button-cancel>{{::expandCtrl.closeText}}</bb-modal-footer-button-cancel>\n' +
        '    </bb-modal-footer>\n' +
        '  </div>\n' +
        '</bb-modal>\n' +
        '');
    $templateCache.put('sky/templates/textexpand/seemore.html',
        '<button type="button" class="btn bb-btn-link-inline bb-text-expand-see-more"></button>\n' +
        '');
    $templateCache.put('sky/templates/textexpand/space.html',
        '<span class="bb-text-expand-space"> </span>\n' +
        '');
    $templateCache.put('sky/templates/textexpand/text.html',
        '<span class="bb-text-expand-text"></span>\n' +
        '');
    $templateCache.put('sky/templates/tiles/tile.html',
        '<section ng-class="{ \'collapsed\': bbTile.isCollapsed }" class="bb-tile">\n' +
        '    <div bb-scroll-into-view="bbTile.scrollIntoView">\n' +
        '        <div class="bb-tile-title" ng-click="bbTile.titleClick()">\n' +
        '            <div class="bb-tile-header-with-content">\n' +
        '                <h2 class="bb-tile-header">{{bbTile.tileHeader}}</h2>\n' +
        '            </div>\n' +
        '            <div class="bb-tile-header-column-tools">\n' +
        '                <div class="bb-tile-tools">\n' +
        '                    <button ng-attr-aria-label="{{bbTile.resources.tile_chevron_label}}" type="button" ng-class="\'fa-chevron-\' + (bbTile.isCollapsed ? \'down\' : \'up\')" class="fa bb-tile-chevron"></button>\n' +
        '                    <button type="button" ng-if="bbTile.hasSettings" class="bb-tile-settings bb-icon bb-icon-config" ng-click="$event.stopPropagation();bbTile.bbTileSettingsClick();"></button>\n' +
        '                    <i class="bb-tile-grab-handle glyphicon glyphicon-th" ng-click="$event.stopPropagation()"></i>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div uib-collapse="bbTile.isCollapsed" class="bb-tile-content in collapse" ng-transclude>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</section>\n' +
        '');
    $templateCache.put('sky/templates/tiles/tiledashboard.html',
        '<div class="row">\n' +
        '  <div class="col-md-6 bb-page-content-tile-column bb-page-content-tile-column-sortable" data-dashboard-column="1">\n' +
        '    <div ng-repeat="tile in bbTileDashboard.tiles" data-tile-id="{{tile.id}}" data-ui-view="{{tile.view_name}}" id="{{tile.view_name}}">\n' +
        '    </div>\n' +
        '  </div>\n' +
        '\n' +
        '  <div class="col-md-6 bb-page-content-tile-column bb-page-content-tile-column-sortable" data-dashboard-column="2">\n' +
        '  </div>\n' +
        '</div>\n' +
        '');
    $templateCache.put('sky/templates/tiles/tileheadercheck.html',
        '<i class="fa fa-check bb-tile-header-check"></i>');
    $templateCache.put('sky/templates/tiles/tileheadercontent.html',
        '<div class="bb-tile-header-content" ng-transclude></div>');
}]);

//# sourceMappingURL=sky.js.map