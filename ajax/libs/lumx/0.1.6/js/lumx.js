/* global angular */

angular.module('lumx.utils', [
    'lumx.utils.transclude',
    'lumx.utils.transclude-replace'
]);

angular.module('lumx', [
    'lumx.utils',
    'lumx.ripple',
    'lumx.notification',
    'lumx.dropdown',
    'lumx.input-group',
    'lumx.dialog',
    'lumx.select',
    'lumx.scrollbar',
    'lumx.thumbnail',
    'lumx.tabs',
    'lumx.tooltip',
    'lumx.file-input',
    'lumx.progress'
]);
/* global angular */
'use strict'; // jshint ignore:line


angular.module('lumx.dialog', [])
    .service('LxDialogService', ['$timeout', function($timeout)
    {
        var self = this,
            dialogFilter,
            scopeMap = {};

        this.registerScope = function(dialogId, dialogScope)
        {
            scopeMap[dialogId] = dialogScope;
        };

        this.open = function(dialogId)
        {
            dialogFilter = angular.element('<div/>', {
                class: 'dialog-filter'
            });

            dialogFilter
                .appendTo('body')
                .bind('click', function()
                {
                    self.close(dialogId);
                });

            scopeMap[dialogId].element
                .appendTo('body')
                .show();

            $timeout(function()
            {
                dialogFilter.addClass('dialog-filter--is-shown');
                scopeMap[dialogId].element.addClass('dialog--is-shown');
            });
        };

        this.close = function(dialogId)
        {
            dialogFilter.removeClass('dialog-filter--is-shown');
            scopeMap[dialogId].element.removeClass('dialog--is-shown');

            $timeout(function()
            {
                dialogFilter.remove();

                scopeMap[dialogId].element
                    .hide()
                    .appendTo(scopeMap[dialogId].parent);
            }, 600);
        };
    }])
    .controller('LxDialogController', ['$scope', 'LxDialogService', function($scope, LxDialogService)
    {
        var dialogScope = $scope.$new();

        this.init = function(element, dialogId)
        {
            dialogScope.element = element;
            dialogScope.parent = element.parent();

            LxDialogService.registerScope(dialogId, dialogScope);
        };

        $scope.$on('$destroy', function()
        {
            dialogScope.$destroy();
        });
    }])
    .directive('lxDialog', function()
    {
        return {
            restrict: 'A',
            controller: 'LxDialogController',
            scope: {},
            link: function(scope, element, attrs, ctrl)
            {
                scope.$watch(function()
                {
                    return attrs.id;
                },
                function(newValue)
                {
                    if (newValue)
                    {
                        ctrl.init(element, attrs.id);
                    }
                });
            }
        };
    })
    .directive('lxDialogClose', ['LxDialogService', function(LxDialogService)
    {
        return {
            restrict: 'A',
            link: function(scope, element)
            {
                element.bind('click', function()
                {
                    LxDialogService.close(element.parents('.dialog').attr('id'));
                });
            }
        };
    }]);
/* global angular */
/* global window */
'use strict'; // jshint ignore:line


angular.module('lumx.notification', [])
    .service('LxNotificationService', ['$rootScope', '$compile', '$timeout' , function($rootScope, $compile, $timeout)
    {
        //
        // PRIVATE MEMBERS
        //
        var notificationList = [],
            dialogFilter,
            dialog;

        //
        // NOTIFICATION
        //

        // private
        function getElementHeight(elem)
        {
            return parseFloat(window.getComputedStyle(elem, null).height);
        }

        // private
        function moveNotificationUp()
        {
            for (var idx in notificationList)
            {
                var intIdx = parseInt(idx);

                if (angular.isUndefined(notificationList[idx].height))
                {
                    notificationList[idx].height = getElementHeight(notificationList[idx].elem[0]);
                }

                if (angular.isDefined(notificationList[intIdx + 1]))
                {
                    if (angular.isUndefined(notificationList[intIdx + 1].height))
                    {
                        notificationList[intIdx + 1].height = getElementHeight(notificationList[intIdx + 1].elem[0]);
                    }

                    notificationList[idx].margin += 24 + notificationList[intIdx + 1].height;
                }

                notificationList[idx].elem.css('marginBottom', notificationList[idx].margin + 'px');
            }
        }

        // private
        function deleteNotification(notification)
        {
            var notifIndex = notificationList.indexOf(notification);

            for(var idx = 0; idx < notificationList.length && idx < notifIndex; idx++)
            {
                if (angular.isDefined(notificationList[idx + 1]))
                {
                    notificationList[idx].margin -= 24 + notificationList[idx + 1].height;
                    notificationList[idx].elem.css('marginBottom', notificationList[idx].margin + 'px');
                }
            }

            notification.elem.remove();
            notificationList.splice(notifIndex, 1);
        }

        function notify(text, icon, sticky, color)
        {
            var notificationTimeout;
            var notification = angular.element('<div/>', {
                class: 'notification'
            });

            var notificationText = angular.element('<span/>', {
                class: 'notification__content',
                text: text
            });

            if (angular.isDefined(icon))
            {
                var notificationIcon = angular.element('<i/>', {
                    class: 'notification__icon mdi mdi--' + icon
                });

                notification
                    .addClass('notification--has-icon')
                    .append(notificationIcon);
            }

            if (angular.isDefined(color))
            {
                notification.addClass('notification--' + color);
            }

            notification
                .append(notificationText)
                .appendTo('body');

            var data = { elem: notification, margin: 0 };
            notificationList.push(data);
            moveNotificationUp();

            notification.bind('click', function()
            {
                deleteNotification(data);

                if(angular.isDefined(notificationTimeout))
                {
                    $timeout.cancel(notificationTimeout);
                }
            });

            if (angular.isUndefined(sticky) || !sticky)
            {
                notificationTimeout = $timeout(function()
                {
                    deleteNotification(data);
                }, 6000);
            }
        }

        function success(text, sticky)
        {
            notify(text, 'check', sticky, 'green');
        }

        function error(text, sticky)
        {
            notify(text, 'error', sticky, 'red');
        }

        function warning(text, sticky)
        {
            notify(text, 'warning', sticky, 'orange');
        }

        function info(text, sticky)
        {
            notify(text, 'info-outline', sticky, 'blue');
        }


        //
        // ALERT & CONFIRM
        //

        // private
        function buildDialogContent(title, text)
        {
            // DOM elements
            var dialogContent = angular.element('<div/>', {
                class: 'dialog__content'
            });

            var dialogTitle = angular.element('<strong/>', {
                class: 'dialog__title',
                text: title
            });

            var dialogText = angular.element('<p/>', {
                class: 'dialog__text',
                text: text
            });

            // DOM link
            dialogContent
                .append(dialogTitle)
                .append(dialogText);

            return dialogContent;
        }

        // private
        function buildDialogActions(buttons, callback)
        {
            // DOM elements
            var dialogActions = angular.element('<div/>', {
                class: 'dialog__actions'
            });

            var dialogLastBtn = angular.element('<button/>', {
                class: 'btn btn--l btn--blue btn--flat',
                text: buttons.ok
            });

            // Cancel button
            if(angular.isDefined(buttons.cancel))
            {
                // DOM elements
                var dialogFirstBtn = angular.element('<button/>', {
                    class: 'btn btn--l btn--red btn--flat',
                    text: buttons.cancel
                });

                // Compilation
                dialogFirstBtn.attr('lx-ripple', '');
                $compile(dialogFirstBtn)($rootScope);

                // DOM link
                dialogActions.append(dialogFirstBtn);

                // Event management
                dialogFirstBtn.bind('click', function()
                {
                    callback(false);
                    closeDialog();
                });
            }

            // Compilation
            dialogLastBtn.attr('lx-ripple', '');
            $compile(dialogLastBtn)($rootScope);

            // DOM link
            dialogActions.append(dialogLastBtn);

            // Event management
            dialogLastBtn.bind('click', function()
            {
                callback(true);
                closeDialog();
            });

            return dialogActions;
        }

        function confirm(title, text, buttons, callback)
        {
            // DOM elements
            dialogFilter = angular.element('<div/>', {
                class: 'dialog-filter'
            });

            dialog = angular.element('<div/>', {
                class: 'dialog dialog--alert'
            });

            var dialogContent = buildDialogContent(title, text);
            var dialogActions = buildDialogActions(buttons, callback);

            // DOM link
            dialogFilter.appendTo('body');

            dialog
                .append(dialogContent)
                .append(dialogActions)
                .appendTo('body');

            // Starting animaton
            $timeout(function()
            {
                dialogFilter.addClass('dialog-filter--is-shown');
                dialog.addClass('dialog--is-shown');
            });
        }

        function alert(title, text, button, callback)
        {
            // DOM elements
            dialogFilter = angular.element('<div/>', {
                class: 'dialog-filter'
            });

            dialog = angular.element('<div/>', {
                class: 'dialog dialog--alert'
            });

            var dialogContent = buildDialogContent(title, text);
            var dialogActions = buildDialogActions({ ok: button }, callback);

            // DOM link
            dialogFilter.appendTo('body');

            dialog
                .append(dialogContent)
                .append(dialogActions)
                .appendTo('body');

            // Starting animaton
            $timeout(function()
            {
                dialogFilter.addClass('dialog-filter--is-shown');
                dialog.addClass('dialog--is-shown');
            });
        }

        // private
        function closeDialog()
        {
            // Starting animaton
            dialogFilter.removeClass('dialog-filter--is-shown');
            dialog.removeClass('dialog--is-shown');

            // After animaton
            $timeout(function()
            {
                dialogFilter.remove();
                dialog.remove();
            }, 600);
        }

        // Public API
        return {
            alert: alert,
            confirm: confirm,
            error: error,
            info: info,
            notify: notify,
            success: success,
            warning: warning
        };
    }]);

/* global angular */
'use strict'; // jshint ignore:line


angular.module('lumx.progress', [])
    .service('LxProgressService', ['$timeout', '$interval', function($timeout, $interval)
    {
        var progressCircularIsShown = false,
            progressCircularInterval,
            progressCircular,
            progressCircularBackground,
            progressCircularMask1,
            progressCircularMask2,
            progressCircularMask3,
            progressCircularMask3Translate,
            progressCircularCenter,
            progressLinearIsShown = false,
            progressLinear,
            progressLinearBackground,
            progressLinearFirstBar,
            progressLinearSecondBar;

        function init()
        {
            // Circular
            progressCircular = angular.element('<div/>', { class: 'progress-circular' });
            progressCircularBackground = angular.element('<div/>', { class: 'progress-circular__background' });
            progressCircularMask1 = angular.element('<div/>', { class: 'progress-circular__mask1' });
            progressCircularMask2 = angular.element('<div/>', { class: 'progress-circular__mask2' });
            progressCircularMask3 = angular.element('<div/>', { class: 'progress-circular__mask3' });
            progressCircularMask3Translate = angular.element('<div/>', { class: 'progress-circular__mask3-translate' });
            progressCircularCenter = angular.element('<div/>', { class: 'progress-circular__center' });

            progressCircularMask3.append(progressCircularMask3Translate);

            progressCircular
                .append(progressCircularBackground)
                .append(progressCircularMask1)
                .append(progressCircularMask2)
                .append(progressCircularMask3)
                .append(progressCircularCenter);

            // Linear
            progressLinear = angular.element('<div/>', { class: 'progress-linear' });
            progressLinearBackground = angular.element('<div/>', { class: 'progress-linear__background' });
            progressLinearFirstBar = angular.element('<div/>', { class: 'progress-linear__bar progress-linear__bar--first' });
            progressLinearSecondBar = angular.element('<div/>', { class: 'progress-linear__bar progress-linear__bar--second' });

            progressLinear
                .append(progressLinearBackground)
                .append(progressLinearFirstBar)
                .append(progressLinearSecondBar);
        }

        function showCircular(foreground, background, container)
        {
            if (!progressCircularIsShown)
            {
                showCircularProgress(foreground, background, container);
            }
        }

        function hideCircular()
        {
            if (progressCircularIsShown)
            {
                hideCircularProgress();
            }
        }

        function showCircularProgress(foreground, background, container)
        {
            progressCircularIsShown = true;

            progressCircularBackground.css({ backgroundColor: foreground });
            progressCircularMask1.removeAttr('style').css({ backgroundColor: background });
            progressCircularMask2.removeAttr('style').css({ backgroundColor: background });
            progressCircularMask3.removeAttr('style');
            progressCircularMask3Translate.removeAttr('style').css({ backgroundColor: background });
            progressCircularCenter.css({ backgroundColor: background });

            progressCircularMask1.css({ transform: 'rotate(-10deg)' });
            progressCircularMask2.css({ transform: 'rotate(10deg)' });

            if (angular.isDefined(container))
            {
                progressCircular.appendTo(container);
            }
            else
            {
                progressCircular.appendTo('body');
            }

            $timeout(function()
            {
                progressCircular.addClass('progress-circular--is-shown');

                animateCircularProgress();

                progressCircularInterval = $interval(animateCircularProgress, 2000);
            });
        }

        function hideCircularProgress()
        {
            progressCircular.removeClass('progress-circular--is-shown');

            $timeout(function()
            {
                progressCircularMask1.transitionStop();
                progressCircularMask2.transitionStop();
                progressCircularMask3.transitionStop();
                progressCircularMask3Translate.transitionStop();

                progressCircular.remove();

                progressCircularIsShown = false;

                $interval.cancel(progressCircularInterval);
            }, 600);
        }

        function animateCircularProgress()
        {
            progressCircularMask1
                .transition({ rotate: '+=250deg', delay: 1000 }, 1000, 'easeInOutQuint');

            progressCircularMask2
                .transition({ rotate: '+=250deg' }, 1000, 'easeInOutQuint');

            progressCircularMask3
                .transition({ rotate: '+=125deg' }, 1000, 'easeInOutQuint')
                .transition({ rotate: '+=125deg' }, 1000, 'easeInOutQuint');

            progressCircularMask3Translate
                .transition({ y: '25px' }, 1000, 'easeInOutQuint')
                .transition({ y: '0' }, 1000, 'easeInOutQuint');
        }

        function showLinear(color, container)
        {
            if (!progressLinearIsShown)
            {
                showLinearProgress(color, container);
            }
        }

        function hideLinear()
        {
            if (progressLinearIsShown)
            {
                hideLinearProgress();
            }
        }

        function showLinearProgress(color, container)
        {
            progressLinearIsShown = true;

            progressLinearBackground.css({ backgroundColor: color });
            progressLinearFirstBar.css({ backgroundColor: color });
            progressLinearSecondBar.css({ backgroundColor: color });

            if (angular.isDefined(container))
            {
                progressLinear.appendTo(container);
            }
            else
            {
                progressLinear.appendTo('body');
            }

            $timeout(function()
            {
                progressLinear.addClass('progress-linear--is-shown');
            });
        }

        function hideLinearProgress()
        {
            progressLinear.removeClass('progress-linear--is-shown');

            $timeout(function()
            {
                progressLinear.remove();

                progressLinearIsShown = false;
            }, 400);
        }

        init();

        return {
            circular: {
                show: showCircular,
                hide: hideCircular
            },
            linear: {
                show: showLinear,
                hide: hideLinear
            }
        };
    }]);

/* global angular */
'use strict'; // jshint ignore:line


angular.module('lumx.ripple', [])
    .directive('lxRipple', function()
    {
        return {
            restrict: 'A',
            link: function(scope, element)
            {
                var ripple, d, x, y;

                element
                    .css({
                        position: 'relative',
                        overflow: 'hidden'
                    })
                    .bind('mousedown', function(e)
                    {
                        if (element.find('.ripple').length === 0)
                        {
                            ripple = angular.element('<span/>', {
                                class: 'ripple'
                            });

                            element.prepend(ripple);
                        }
                        else
                        {
                            ripple = element.find('.ripple');
                        }
                             
                        ripple.removeClass('ripple--is-animated');
                         
                        if (!ripple.height() && !ripple.width())
                        {
                            d = Math.max(element.outerWidth(), element.outerHeight());

                            ripple.css({ height: d, width: d });
                        }
                         
                        x = e.pageX - element.offset().left - ripple.width() / 2;
                        y = e.pageY - element.offset().top - ripple.height() / 2;
                         
                        ripple.css({ top: y+'px', left: x+'px' }).addClass('ripple--is-animated');
                    });
            }
        };
    });
/* global angular */
'use strict'; // jshint ignore:line


angular.module('lumx.scrollbar', [])
    .controller('LxScrollbarController', ['$scope', '$window', function($scope, $window)
    {
        var mousePosition,
            scrollbarContainer,
            scrollbarContainerHeight,
            scrollbarContent,
            scrollbarContentHeight,
            scrollbarYAxis,
            scrollbarYAxisHandle,
            scrollbarYAxisHandlePosition,
            scrollBottom;

        this.init = function(element)
        {
            scrollbarContainer = element;

            scrollbarContainer
                .addClass('scrollbar-container')
                .wrapInner('<div class="scrollbar-content"></div>');

            scrollbarContent = scrollbarContainer.find('.scrollbar-content');

            scrollbarYAxis = angular.element('<div/>', {
                class: 'scrollbar-y-axis'
            });

            scrollbarYAxisHandle = angular.element('<div/>', {
                class: 'scrollbar-y-axis__handle'
            });

            scrollbarYAxis
                .append(scrollbarYAxisHandle)
                .prependTo(scrollbarContainer);

            scrollbarYAxisHandle.bind('mousedown', function()
            {
                var handlePosition,
                    scrollPercent,
                    scrollPosition;

                angular.element($window).bind('mousemove', function(event)
                {
                    if ($window.innerWidth >= 1024)
                    {
                        event.preventDefault();

                        scrollbarYAxis.addClass('scrollbar-y-axis--is-dragging');

                        if (angular.isUndefined(mousePosition))
                        {
                            mousePosition = event.pageY;
                        }

                        if (angular.isUndefined(scrollbarYAxisHandlePosition))
                        {
                            scrollbarYAxisHandlePosition = scrollbarYAxisHandle.position().top;
                        }

                        handlePosition = (event.pageY - mousePosition) + scrollbarYAxisHandlePosition;
                        scrollPercent = handlePosition / (scrollbarContainerHeight - scrollbarYAxisHandle.outerHeight());
                        scrollPosition = scrollBottom * scrollPercent;

                        updateScroll(handlePosition, scrollPosition);
                    }
                });
            });

            angular.element($window).bind('mouseup', function()
            {
                if ($window.innerWidth >= 1024)
                {
                    scrollbarYAxis.removeClass('scrollbar-y-axis--is-dragging');

                    mousePosition = undefined;
                    scrollbarYAxisHandlePosition = undefined;

                    angular.element($window).unbind('mousemove');
                }
            });

            scrollbarContainer.bind('mousewheel', function(event)
            {
                if ($window.innerWidth >= 1024)
                {
                    event.preventDefault();

                    var scrollPercent = scrollbarContainer.scrollTop() / scrollBottom,
                        scrollPosition = (scrollbarContainerHeight - scrollbarYAxisHandle.outerHeight()) * scrollPercent;

                    updateScroll(scrollPosition, scrollbarContainer.scrollTop() + event.originalEvent.wheelDelta * -1);
                }
            });

            $scope.$watch(function()
            {
                return scrollbarContainer.outerHeight() || scrollbarContent.outerHeight();
            },
            function(newValue)
            {
                if (angular.isNumber(newValue) && $window.innerWidth >= 1024)
                {
                    initScrollbar();
                }
            });
        };

        function initScrollbar()
        {
            scrollbarContainerHeight = scrollbarContainer.outerHeight();
            scrollbarContentHeight = scrollbarContent.outerHeight();
            scrollBottom = scrollbarContentHeight - scrollbarContainerHeight;

            if (scrollbarContentHeight <= scrollbarContainerHeight)
            {
                scrollbarYAxis.hide();
            }
            else
            {
                scrollbarYAxis.show();

                updatePosition(0, 0);
            
                scrollbarYAxis.css({ height: scrollbarContainerHeight });
                scrollbarYAxisHandle.css({ height: (scrollbarContainerHeight / scrollbarContentHeight) * 100 + '%' });
            }
        }

        function updateScroll(handlePosition, scrollPosition)
        {
            if (scrollPosition >= 0 && scrollPosition <= scrollBottom)
            {
                updatePosition(handlePosition, scrollPosition);
            }
            else
            {
                if (scrollPosition < 0)
                {
                    updatePosition(0, 0);
                }
                else
                {
                    updatePosition(scrollbarContainerHeight - scrollbarYAxisHandle.outerHeight(), scrollBottom);
                }
            }
        }

        function updatePosition(handlePosition, scrollPosition)
        {
            scrollbarYAxisHandle.css({ top: handlePosition });
            scrollbarYAxis.css({ top: scrollPosition });
            scrollbarContainer.scrollTop(scrollPosition);
        }

        angular.element($window).bind('resize', function()
        {
            if ($window.innerWidth < 1024)
            {
                scrollbarYAxis.hide();
            }
            else
            {
                initScrollbar();
            }
        });
    }])
    .directive('lxScrollbar', function()
    {
        return {
            restrict: 'AE',
            controller: 'LxScrollbarController',
            link: function(scope, element, attrs, ctrl)
            {
                ctrl.init(element);
            }
        };
    });
/* global angular */
/* global Image */
'use strict'; // jshint ignore:line


angular.module('lumx.thumbnail', [])
    .controller('LxThumbnailController', ['$rootScope', '$scope', function($rootScope, $scope)
        {
            var scope = $scope.$new();

            this.init = function(element, attrs)
            {
                scope.element = element;

                scope.thumbnailSrc = attrs.thumbnailSrc;
                scope.thumbnailWidth = attrs.thumbnailWidth;
                scope.thumbnailHeight = attrs.thumbnailHeight;

                this.prepareImage();
            };

            this.prepareImage = function()
            {
                var self = this,
                    img = new Image();

                img.src = scope.thumbnailSrc;

                scope.element.css({
                    'width': scope.thumbnailWidth,
                    'height': scope.thumbnailHeight
                });

                scope.element.addClass('thumbnail--is-loading');

                img.onload = function()
                {
                    scope.originalWidth = img.width;
                    scope.originalHeight = img.height;

                    self.addImage();
                };
            };

            this.addImage = function()
            {
                var imageSizeWidthRatio = scope.thumbnailWidth / scope.originalWidth,
                    imageSizeWidth = scope.thumbnailWidth,
                    imageSizeHeight = scope.originalHeight * imageSizeWidthRatio;

                if (imageSizeHeight < scope.thumbnailHeight)
                {
                    var resizeFactor = scope.thumbnailHeight / imageSizeHeight;

                    imageSizeHeight = scope.thumbnailHeight;
                    imageSizeWidth = resizeFactor * imageSizeWidth;
                }

                scope.element.removeClass('thumbnail--is-loading');

                scope.element.css({
                    'background': 'url(' + scope.thumbnailSrc + ') no-repeat',
                    'background-position': 'center',
                    'background-size': imageSizeWidth + 'px ' + imageSizeHeight + 'px',
                    'overflow': 'hidden'
                });

                $rootScope.$broadcast('THUMBNAIL_LOADED', scope.thumbnailSrc);
            };
        }])
    .directive('lxThumbnail', function()
    {
        return {
            restrict: 'A',
            controller: 'LxThumbnailController',
            scope: {},
            link: function(scope, element, attrs, ctrl)
            {
                scope.init = 0;

                attrs.$observe('thumbnailSrc', function()
                {
                    if (attrs.thumbnailSrc)
                    {
                        scope.init = scope.init + 1;
                    }
                });

                attrs.$observe('thumbnailWidth', function()
                {
                    if (attrs.thumbnailWidth)
                    {
                        scope.init = scope.init + 1;
                    }
                });

                attrs.$observe('thumbnailHeight', function()
                {
                    if (attrs.thumbnailHeight)
                    {
                        scope.init = scope.init + 1;
                    }
                });

                scope.$watch('init', function(newValue)
                {
                    if (newValue === 3)
                    {
                        ctrl.init(element, attrs);
                        element.addClass('thumbnail');
                    }
                });

                scope.$watch(function()
                {
                    return attrs.thumbnailSrc;
                },
                function(newValue, oldValue)
                {
                    if (newValue !== oldValue)
                    {
                        ctrl.init(element, attrs);
                    }
                });

                scope.$watch(function()
                {
                    return attrs.thumbnailWidth;
                },
                function(newValue, oldValue)
                {
                    if (newValue !== oldValue)
                    {
                        ctrl.init(element, attrs);
                    }
                });

                scope.$watch(function()
                {
                    return attrs.thumbnailHeight;
                },
                function(newValue, oldValue)
                {
                    if (newValue !== oldValue)
                    {
                        ctrl.init(element, attrs);
                    }
                });
            }
        };
    });
/* global angular */
'use strict'; // jshint ignore:line


angular.module('lumx.tooltip', [])
    .controller('LxTooltipController', ['$scope', '$timeout', function($scope, $timeout)
    {
        var self = this,
            tooltip,
            tooltipContent,
            tooltipPosition,
            tooltipColor,
            tooltipLabel,
            tooltipBackground,
            tooltipTrigger;

        this.init = function(element, attrs)
        {
            tooltipTrigger = element;

            tooltipContent = attrs.lxTooltip;
            tooltipPosition = angular.isDefined(attrs.tooltipPosition) ? attrs.tooltipPosition : 'top';
            tooltipColor = angular.isDefined(attrs.tooltipColor) ? attrs.tooltipColor : 'black';

            tooltip = angular.element('<div/>',
            {
                class: 'tooltip tooltip--' + tooltipPosition + ' tooltip--' + tooltipColor
            });

            tooltipBackground = angular.element('<div/>',
            {
                class: 'tooltip__background'
            });

            tooltipLabel = angular.element('<span/>',
            {
                class: 'tooltip__label',
                text: tooltipContent
            });

            tooltipTrigger
                .bind('mouseenter', function()
                {
                    self.showTooltip();
                });

            tooltipTrigger
                .bind('mouseleave', function()
                {
                    self.hideTooltip();
                });
        };

        this.showTooltip = function()
        {
            var width = tooltipTrigger.outerWidth(),
                height = tooltipTrigger.outerHeight(),
                top = tooltipTrigger.offset().top,
                left = tooltipTrigger.offset().left;

            tooltip
                .append(tooltipBackground)
                .append(tooltipLabel)
                .appendTo('body');

            if (tooltipPosition === 'top')
            {
                tooltip.css(
                {
                    left: left - (tooltip.outerWidth() / 2) + (width / 2),
                    top: top - tooltip.outerHeight()
                });
            }
            else if (tooltipPosition === 'bottom')
            {
                tooltip.css(
                {
                    left: left - (tooltip.outerWidth() / 2) + (width / 2),
                    top: top + height
                });
            }
            else if (tooltipPosition === 'left')
            {
                tooltip.css(
                {
                    left: left - tooltip.outerWidth(),
                    top: top + (height / 2) - (tooltip.outerHeight() / 2)
                });
            }
            else if (tooltipPosition === 'right')
            {
                tooltip.css(
                {
                    left: left + width,
                    top: top + (height / 2) - (tooltip.outerHeight() / 2)
                });
            }

            tooltip.addClass('tooltip--is-active');
        };

        this.hideTooltip = function()
        {
            tooltip.removeClass('tooltip--is-active');

            $timeout(function()
            {
                tooltip.remove();
            }, 200);
        };
    }])
    .directive('lxTooltip', function()
    {
        return {
            restrict: 'A',
            controller: 'LxTooltipController',
            link: function(scope, element, attrs, ctrl)
            {
                attrs.$observe('lxTooltip', function()
                {
                    if (attrs.lxTooltip)
                    {
                        ctrl.init(element, attrs);
                    }
                });
            }
        };
    });
/* global angular */
'use strict'; // jshint ignore:line


angular.module('lumx.utils.transclude', [])
    .config(function($provide)
    {
        $provide.decorator('ngTranscludeDirective', ['$delegate', function($delegate)
        {
            $delegate.shift();
            
            return $delegate;
        }]);
    })
    .directive('ngTransclude', function()
    {
        return {
            restrict: 'EAC',
            link: function(scope, element, attrs, ctrl, transclude)
            {
                var iScopeType = attrs.ngTransclude || 'sibling';

                switch (iScopeType)
                {
                    case 'sibling':
                        transclude( function(clone)
                        {
                            element.empty();
                            element.append(clone);
                        });
                        break;
                    case 'parent':
                        transclude( scope, function(clone)
                        {
                            element.empty();
                            element.append(clone);
                        });
                        break;
                    case 'child':
                        var iChildScope = scope.$new();
                        
                        transclude(iChildScope, function(clone)
                        {
                            element.empty();
                            element.append(clone);
                            element.on('$destroy', function()
                            {
                                iChildScope.$destroy();
                            });            
                        });
                        break;
                }
            }
        };
    });
/* global angular */
'use strict'; // jshint ignore:line


angular.module('lumx.utils.transclude-replace', [])
    .directive('ngTranscludeReplace', ['$log', function ($log) {
        return {
            terminal: true,
            restrict: 'EA',
            link: function ($scope, $element, $attr, ctrl, transclude)
            {
                if (!transclude)
                {
                    $log.error('orphan',
                         'Illegal use of ngTranscludeReplace directive in the template! ' +
                         'No parent directive that requires a transclusion found. ');
                    return;
                }

                transclude(function(clone)
                {
                    if (clone.length)
                    {
                        $element.replaceWith(clone);
                    }
                    else
                    {
                        $element.remove();
                    }
                });
            }
        };
    }]);
/* global angular */
'use strict'; // jshint ignore:line


angular.module('lumx.dropdown', [])
    .service('LxDropdownService', ['$document', function($document)
    {
        var openScope = null;

        this.open = function(dropdownScope)
        {
            if (!openScope && !dropdownScope.keepOpened)
            {
                $document.bind('click', closeDropdown);
            }

            if (openScope && openScope !== dropdownScope)
            {
                openScope.isOpen = false;
            }

            openScope = dropdownScope;
        };

        this.close = function(dropdownScope)
        {
            if (dropdownScope === undefined)
            {
                openScope.isOpen = false;
            }

            if (dropdownScope === undefined || openScope === dropdownScope)
            {
                openScope = null;
                $document.unbind('click', closeDropdown);
            }
        };

        var closeDropdown = function()
        {
            openScope.$apply(function()
            {
                openScope.isOpen = false;
            });
        };
    }])
    .controller('LxDropdownController', ['$scope', 'LxDropdownService', function($scope, LxDropdownService)
    {
        var self = this,
            scope = $scope.$new();

        this.init = function(element, attrs)
        {
            self.$element = element;

            scope.isOpen = false;

            if (angular.isDefined(attrs.keepOpened))
            {
                scope.keepOpened = true;
            }
            else
            {
                scope.keepOpened = false;
            }
        };

        this.getContainer = function()
        {
            return self.$element;
        };

        this.isOpen = function()
        {
            return scope.isOpen;
        };

        this.toggle = function()
        {
            scope.isOpen = !scope.isOpen;
        };

        scope.$watch('isOpen', function(isOpen)
        {
            if (isOpen)
            {
                self.$element.addClass('dropdown--is-active');
                LxDropdownService.open(scope);
            }
            else
            {
                self.$element.removeClass('dropdown--is-active');
                LxDropdownService.close(scope);
            }
        });

        $scope.$on('$locationChangeSuccess', function()
        {
            scope.isOpen = false;
        });

        $scope.$on('$destroy', function()
        {
            scope.$destroy();
        });
    }])
    .directive('lxDropdown', function()
    {
        return {
            restrict: 'AE',
            controller: 'LxDropdownController',
            templateUrl: 'lumx.dropdown.html',
            transclude: true,
            replace: true,
            scope: {},
            link: function(scope, element, attrs, ctrl)
            {
                ctrl.init(element, attrs);
            }
        };
    })
    .directive('lxDropdownToggle', function()
    {
        return {
            restrict: 'AE',
            require: '^lxDropdown',
            scope: {},
            link: function(scope, element, attrs, ctrl)
            {
                element.bind('click', function(event)
                {
                    event.stopPropagation();

                    scope.$apply(function()
                    {
                        ctrl.toggle();
                    });
                });
            }
        };
    })
    .directive('lxDropdownMenu', ['$timeout', '$window', function($timeout, $window)
    {
        return {
            restrict: 'AE',
            require: '^lxDropdown',
            templateUrl: 'lumx.dropdown_menu.html',
            transclude: true,
            replace: true,
            scope: {},
            link: function(scope, element, attrs, ctrl)
            {
                scope.position = angular.isDefined(attrs.position) ? attrs.position : 'left';

                if (angular.isDefined(attrs.fullWidth))
                {
                    scope.fullWidth = attrs.fullWidth ? parseInt(attrs.fullWidth) : 0;
                }

                element.bind('click', function()
                {
                    scope.$apply(function()
                    {
                        ctrl.toggle();
                    });
                });

                scope.$watch(ctrl.isOpen, function(isOpen)
                {
                    if (isOpen)
                    {
                        unlinkList();
                    }
                    else
                    {
                        linkList();
                    }
                });

                angular.element($window).bind('resize, scroll', function()
                {
                    if (scope.isDropped)
                    {
                        setDropdownMenuCss();
                    }
                });

                function linkList()
                {
                    scope.isDropped = false;

                    closeDropdownMenu();
                }

                function unlinkList()
                {
                    element.appendTo('body');

                    scope.isDropped = true;

                    $timeout(function()
                    {
                        setDropdownMenuCss();
                        openDropdownMenu();
                    }, 100);
                }

                function setDropdownMenuCss()
                {
                    var container = ctrl.getContainer(),
                        top,
                        left = 'auto',
                        right = 'auto',
                        containerWidth = container.outerWidth();

                    if (angular.isDefined(attrs.fromTop))
                    {
                        top = container.offset().top;
                    }
                    else
                    {
                        top = container.offset().top + container.outerHeight();
                    }

                    if (scope.position === 'left')
                    {
                        left = container.offset().left;
                    }
                    else if (scope.position === 'right')
                    {
                        right = angular.element($window).width() - (container.offset().left + container.outerWidth());
                    }
                    else if (scope.position === 'center')
                    {
                        left = (container.offset().left - (element.outerWidth() / 2)) + (container.outerWidth() / 2);
                    }

                    element.css(
                    {
                        left: left,
                        right: right,
                        top: top
                    });

                    if (angular.isDefined(scope.fullWidth))
                    {
                        element.css('width', containerWidth + scope.fullWidth);
                    }
                }

                function openDropdownMenu()
                {
                    var containerWidth = element.outerWidth(),
                        containerHeight = element.outerHeight();

                    element.css({
                        width: 0,
                        height: 0,
                        opacity: 1
                    });

                    element.find('.dropdown-menu__content').css({
                        width: containerWidth,
                        height: containerHeight
                    });

                    element.velocity({ 
                        width: containerWidth
                    }, {
                        duration: 200,
                        easing: 'easeOutQuint',
                        queue: false
                    });

                    element.velocity({ 
                        height: containerHeight
                    }, {
                        duration: 500,
                        easing: 'easeOutQuint',
                        queue: false,
                        complete: function()
                        {
                            if (angular.isDefined(scope.fullWidth))
                            {
                                element.css({ height: 'auto' });
                            }
                            else
                            {
                                element.css({ width: 'auto', height: 'auto' });
                            }

                            element.find('.dropdown-menu__content').removeAttr('style');
                        }
                    });
                }

                function closeDropdownMenu()
                {
                    element.velocity({ 
                        width: 0,
                        height: 0,
                    }, {
                        duration: 200,
                        easing: 'easeOutQuint',
                        complete: function()
                        {
                            var container = ctrl.getContainer();

                            element
                                .appendTo(container)
                                .removeAttr('style');
                        }
                    });
                }
            }
        };
    }])
    .directive('lxDropdownFilter', ['$timeout', function($timeout)
    {
        return {
            restrict: 'A',
            link: function(scope, element)
            {
                element.bind('click', function(event)
                {
                    event.stopPropagation();
                });

                $timeout(function()
                {
                    element
                        .css({ width: element.parent().outerWidth() - 56 })
                        .focus();
                }, 200);
            }
        };
    }]);
/* global angular */
'use strict'; // jshint ignore:line


angular.module('lumx.file-input', [])
    .directive('lxFileInput', ['$timeout', function($timeout)
    {
        return {
            restrict: 'E',
            scope: {
                label: '='
            },
            templateUrl: 'lumx.file_input.html',
            transclude: true,
            replace: true,
            link: function(scope, element)
            {
                var $input = element.find('input');
                var $fileName = element.find('.input-file__filename');

                $input
                    .addClass('input-file__input')
                    .on('change', function()
                    {
                        var file = $input.val().replace(/C:\\fakepath\\/i, '');

                        $fileName.text(file);

                        $timeout(function()
                        {
                            element.addClass('input-file--is-focused input-file--is-active');
                        });
                    })
                    .on('blur', function()
                    {
                        element.removeClass('input-file--is-focused');
                    });
            }
        };
    }]);
/* global angular */
'use strict'; // jshint ignore:line


angular.module('lumx.input-group', [])
    .directive('lxInputGroup', function()
    {
        return {
            restrict: 'E',
            scope: {
                label: '=',
                isDisabled: '=',
                hasError: '='
            },
            templateUrl: 'lumx.input_group.html',
            transclude: true,
            replace: true,
            link: function(scope, element)
            {
                var $input = element.find('input, textarea');

                $input.addClass('input-group__input');

                if ($input.val())
                {
                    element.addClass('input-group--is-active');
                }

                $input.on('focus', function()
                {
                    element.addClass('input-group--is-focused input-group--is-active');
                });

                $input.on('blur', function()
                {
                    element.removeClass('input-group--is-focused');

                    if (!$input.val())
                    {
                        element.removeClass('input-group--is-active');
                    }
                });
            }
        };
    });
/* global angular */
/* global _ */
'use strict'; // jshint ignore:line


angular.module('lumx.select', [])
    .controller('LxSelectController', ['$scope', '$compile', '$interpolate', '$sce', function($scope, $compile, $interpolate, $sce)
    {
        var self = this;

        this.init = function(element, attrs)
        {
            $scope.multiple = angular.isDefined(attrs.multiple);
            $scope.tree = angular.isDefined(attrs.tree);
        };
        
        this.select = function(choice)
        {
            if ($scope.multiple)
            {
                if (_.indexOf($scope.selected, choice) === -1)
                {
                    $scope.selected.push(choice);
                }
            }
            else
            {
                $scope.selected = [choice];
            }
        };
        
        this.unselect = function(element)
        {
            if (_.indexOf($scope.selected, element) !== -1)
            {
                $scope.selected.splice(_.indexOf($scope.selected, element), 1);
            }
        };

        this.selectedElements = function()
        {
            return angular.isDefined($scope.selected) ? $scope.selected : [];
        };

        this.getPlaceholder = function()
        {
            return $scope.placeholder;
        };

        this.getSelectedTemplate = function()
        {
            return $sce.trustAsHtml($scope.selectedTemplate);
        };
        
        this.isMultiple = function()
        {
            return $scope.multiple;
        };

        this.isTree = function()
        {
            return $scope.tree;
        };

        $scope.$watch('selected', function(newValue)
        {
            if (angular.isDefined(newValue) && angular.isDefined(self.selectedTransclude))
            {
                var newScope = $scope.$new();

                $scope.selectedTemplate = '';

                angular.forEach(newValue, function(selectedElement)
                {
                    newScope.$selected = selectedElement;

                    self.selectedTransclude(newScope, function(clone)
                    {
                        var div = angular.element('<div/>'),
                            element = $compile(clone)(newScope),
                            content = $interpolate(clone.html())(newScope);

                        element.html(content);

                        div.append(element);

                        if (self.isMultiple())
                        {
                            div.find('span').addClass('lx-select__tag');
                        }

                        $scope.selectedTemplate += div.html();
                    });
                });

                // Exec function callback if set
                if(angular.isDefined($scope.change)) {
                    $scope.change();
                }
            }
        }, true);
    }])
    .directive('lxSelect', function()
    {
        return {
            restrict: 'E',
            controller: 'LxSelectController',
            scope: {
                selected: '=',
                placeholder: '=',
                change: '&change'
            },
            templateUrl: 'lumx.select.html',
            transclude: true,
            replace: true,
            link: function(scope, element, attrs, ctrl)
            {
                ctrl.init(element, attrs);
            }
        };
    })
    .directive('lxSelectSelected', function()
    {
        return {
            restrict: 'E',
            require: '^lxSelect',
            scope: {},
            templateUrl: 'lumx.select_selected.html',
            transclude: true,
            controller: function($scope)
            {
                $scope.unselect = function(element)
                {
                    $scope.selectController.unselect(element);
                };
            },
            link: function(scope, element, attrs, ctrl, transclude)
            {
                scope.selectController = ctrl;

                ctrl.selectedTransclude = transclude;
            }
        };
    })
    .directive('lxSelectChoices', function()
    {
        return {
            restrict: 'E',
            require: '^lxSelect',
            scope: {
                choices: '='
            },
            templateUrl: 'lumx.select_choices.html',
            transclude: true,
            controller: function($scope)
            {
                $scope.select = function(choice, event)
                {
                    if (angular.isDefined(event) && $scope.selectController.isMultiple())
                    {
                        event.stopPropagation();
                    }

                    if ($scope.selectController.isMultiple())
                    {
                        if ($scope.isSelected(choice))
                        {
                            $scope.selectController.unselect(choice);
                        }
                        else
                        {
                            $scope.selectController.select(choice);
                        }
                    }
                    else
                    {
                        $scope.selectController.select(choice);
                    }
                };

                $scope.isSelected = function(choice)
                {
                    return _.indexOf($scope.selectController.selectedElements(), choice) > -1;
                };
            },
            link: function(scope, element, attrs, ctrl)
            {
                scope.selectController = ctrl;
            }
        };
    });
/* global angular */
'use strict'; // jshint ignore:line


angular.module('lumx.tabs', [])
    .controller('LxTabsController', function()
    {
        var tabs = [],
            activeTab = 0;

        this.addTab = function(heading, active)
        {
            tabs.push({ heading: heading });

            if (active)
            {
                activeTab = tabs.length - 1;
            }

            return (tabs.length - 1);
        };

        this.getTabs = function()
        {
            return tabs;
        };

        this.getActiveTab = function()
        {
            return activeTab;
        };

        this.switchTab = function(index)
        {
            activeTab = index;
        };
    })
    .directive('lxTabs', function()
    {
        return {
            restrict: 'E',
            controller: 'LxTabsController',
            templateUrl: 'lumx.tabs.html',
            transclude: true,
            replace: true,
            link: function(scope, element, attrs, ctrl)
            {
                scope.tabsCtrl = ctrl;
            }
        };
    })
    .directive('lxTab', function()
    {
        return {
            require: '^lxTabs',
            restrict: 'E',
            scope: {
                active: '@',
                heading: '@'
            },
            templateUrl: 'lumx.tab.html',
            transclude: true,
            replace: true,
            link: function(scope, element, attrs, ctrl)
            {
                scope.tabsCtrl = ctrl;
                scope.index = ctrl.addTab(scope.heading, scope.active);
            }
        };
    })
    .directive('lxTabIndicator', function()
    {
        return {
            require: '^lxTabs',
            restrict: 'A',
            link: function(scope, element, attrs, ctrl)
            {
                scope.activeTab = ctrl.getActiveTab();

                function setIndicatorPosition(init)
                {
                    var direction;

                    if (ctrl.getActiveTab() > scope.activeTab)
                    {
                        direction = 'right';
                    }
                    else
                    {
                        direction = 'left';
                    }

                    scope.activeTab = ctrl.getActiveTab();

                    var tabsLength = ctrl.getTabs().length,
                        indicatorWidth = 100 / tabsLength,
                        indicatorLeft = (indicatorWidth * scope.activeTab),
                        indicatorRight = 100 - (indicatorLeft + indicatorWidth);

                    if (init)
                    {
                        element.css({
                            left: indicatorLeft + '%',
                            right: indicatorRight  + '%'
                        });
                    }
                    else
                    {
                        if (direction === 'left')
                        {
                            element.velocity({ 
                                left: indicatorLeft + '%'
                            }, {
                                duration: 200,
                                easing: 'easeOutQuint'
                            });

                            element.velocity({ 
                                right: indicatorRight  + '%'
                            }, {
                                duration: 200,
                                easing: 'easeOutQuint'
                            });
                        }
                        else
                        {
                            element.velocity({ 
                                right: indicatorRight  + '%'
                            }, {
                                duration: 200,
                                easing: 'easeOutQuint'
                            });

                            element.velocity({ 
                                left: indicatorLeft + '%'
                            }, {
                                duration: 200,
                                easing: 'easeOutQuint'
                            });
                        }
                    }
                }

                setIndicatorPosition(true);

                scope.$watch(function()
                {
                    return ctrl.getActiveTab();
                },
                function(newValue, oldValue)
                {
                    if (newValue !== oldValue)
                    {
                        setIndicatorPosition(false);
                    }
                });
            }
        };
    });
/* global angular */
'use strict'; // jshint ignore:line

var sidebar = angular.module('Sidebar', []).service('SidebarService', function()
{
    var sidebarIsShown = false;

    function toggleSidebar()
    {
        sidebarIsShown = !sidebarIsShown;
    }

    return {
        isSidebarShown: function()
        {
            return sidebarIsShown;
        },
        toggleSidebar: toggleSidebar
    };
});

angular.module("lumx.dropdown").run(['$templateCache', function(a) { a.put('lumx.dropdown_menu.html', '<div class="dropdown-menu dropdown-menu--{{ position }}" ng-class="{ \'dropdown__menu--is-dropped\': isDropped }">\n' +
    '    <div class="dropdown-menu__content" ng-transclude ng-if="isDropped"></div>\n' +
    '</div>');
	a.put('lumx.dropdown.html', '<div class="dropdown" ng-transclude></div>');
	 }]);
angular.module("lumx.file-input").run(['$templateCache', function(a) { a.put('lumx.file_input.html', '<div class="input-file" ng-class="{ \'input-file--has-error\': hasError }">\n' +
    '    <label>\n' +
    '        <span class="input-file__label">{{ label }}</span>\n' +
    '        <span class="input-file__filename"></span>\n' +
    '        <div ng-transclude-replace></div>\n' +
    '    </label>\n' +
    '</div>');
	 }]);
angular.module("lumx.input-group").run(['$templateCache', function(a) { a.put('lumx.input_group.html', '<div class="input-group" ng-class="{ \'input-group--has-error\': hasError, \'input-group--is-disabled\': isDisabled }">\n' +
    '    <label class="input-group__label">{{ label }}</label>\n' +
    '    <div ng-transclude-replace></div>\n' +
    '</div>');
	 }]);
angular.module("lumx.select").run(['$templateCache', function(a) { a.put('lumx.select_selected.html', '<div lx-dropdown-toggle>\n' +
    '    <div class="lx-select__selected"\n' +
    '         ng-class="{ \'lx-select__selected--is-unique\': !selectController.isMultiple(),\n' +
    '                     \'lx-select__selected--is-multiple\': selectController.isMultiple(),\n' +
    '                     \'lx-select__selected--placeholder\': selectController.selectedElements().length === 0 }"\n' +
    '         lx-ripple>\n' +
    '        <span ng-if="selectController.selectedElements().length === 0">{{ selectController.getPlaceholder() }}</span>\n' +
    '\n' +
    '        <div ng-repeat="$selected in selectController.selectedElements()"\n' +
    '             ng-if="!selectController.isMultiple()">\n' +
    '            <span ng-transclude="child"></span>\n' +
    '        </div>\n' +
    '\n' +
    '        <div ng-if="selectController.isMultiple()">\n' +
    '            <span class="lx-select__tag"\n' +
    '                  ng-repeat="$selected in selectController.selectedElements()"\n' +
    '                  ng-transclude="child"></span>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>');
	a.put('lumx.select_choices.html', '<lx-dropdown-menu full-width="32" from-top class="lx-select__choices">\n' +
    '    <ul ng-if="!selectController.isTree()">\n' +
    '        <li ng-if="selectController.selectedElements().length > 0">\n' +
    '            <div class="lx-select__chosen"\n' +
    '                 ng-class="{ \'lx-select__chosen--is-multiple\': selectController.isMultiple() }"\n' +
    '                 ng-bind-html="selectController.getSelectedTemplate()"></div>\n' +
    '        </li>\n' +
    '\n' +
    '        <li>\n' +
    '            <div class="lx-select__filter dropdown-filter">\n' +
    '                <input type="text" ng-model="search" lx-dropdown-filter>\n' +
    '            </div>\n' +
    '        </li>\n' +
    '\n' +
    '        <li ng-repeat="$choice in choices | filter:search">\n' +
    '            <a class="lx-select__choice dropdown-link"\n' +
    '               ng-class="{ \'lx-select__choice--is-multiple\': selectController.isMultiple(),\n' +
    '                           \'lx-select__choice--is-selected\': isSelected($choice) }"\n' +
    '               ng-click="select($choice, $event)"\n' +
    '               ng-transclude="child"></a>\n' +
    '        </li>\n' +
    '    </ul>\n' +
    '</lx-dropdown-menu>');
	a.put('lumx.select.html', '<div class="lx-select"\n' +
    '     ng-class="{ \'lx-select--is-unique\': !multiple,\n' +
    '                 \'lx-select--is-multiple\': multiple }">\n' +
    '    <lx-dropdown>\n' +
    '        <div ng-transclude></div>\n' +
    '    </lx-dropdown>\n' +
    '</div>');
	 }]);
angular.module("lumx.tabs").run(['$templateCache', function(a) { a.put('lumx.tabs.html', '<div class="tabs">\n' +
    '    <ul class="tabs__links">\n' +
    '        <li ng-repeat="tab in tabsCtrl.getTabs()">\n' +
    '            <a class="tabs-link"\n' +
    '               ng-class="{ \'tabs-link--is-active\': $index === tabsCtrl.getActiveTab() }"\n' +
    '               ng-click="tabsCtrl.switchTab($index)"\n' +
    '               lx-ripple>\n' +
    '               {{ tab.heading }}\n' +
    '            </a>\n' +
    '        </li>\n' +
    '    </ul>\n' +
    '\n' +
    '    <div class="tabs__panes" ng-transclude></div>\n' +
    '\n' +
    '    <div class="tabs__indicator" lx-tab-indicator></div>\n' +
    '</div>');
	a.put('lumx.tab.html', '<div class="tabs-pane" ng-class="{ \'tabs-pane--is-active\': index === tabsCtrl.getActiveTab() }" ng-transclude></div>');
	 }]);