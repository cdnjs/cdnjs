/*
 * angular-tooltips
 * 1.1.4
 * 
 * Angular.js tooltips module.
 * http://720kb.github.io/angular-tooltips
 * 
 * MIT license
 * Mon Jun 06 2016
 */
/*global angular,window*/
(function withAngular(angular, window) {
  'use strict';

  var directiveName = 'tooltips'
  , resizeObserver = (function resizeObserver() {

    var callbacks = []
      , lastTime = 0
      , runCallbacks = function runCallbacks(currentTime) {

        if (currentTime - lastTime >= 15) {

          callbacks.forEach(function iterator(callback) {

            callback();
          });
          lastTime = currentTime;
        } else {

          window.console.log('Skipped!');
        }
      }
      , resizeTimeout
      , resize = function resize() {
        window.clearTimeout(resizeTimeout);
        resizeTimeout = window.setTimeout(function onResizeTimeout() {
          window.requestAnimationFrame(runCallbacks);
        }, 500);
      }
      , addCallback = function addCallback(callback) {

        if (callback) {

          callbacks.push(callback);
        }
      };

    return {
      'add': function add(callback) {

        if (!callbacks.length) {

          window.addEventListener('resize', resize);
        }
        addCallback(callback);
      },
      'remove': function remove() {
        if (!callbacks.length) {
          window.clearTimeout(resizeTimeout);
          window.removeEventListener('resize', resize);
        }
      }
    };
  }())
  , getAttributesToAdd = function getAttributesToAdd(element) {
    var attributesToAdd = {};

    element.removeAttr(directiveName);
    if (element.attr('tooltip-template') !== undefined) {

      attributesToAdd['tooltip-template'] = element.attr('tooltip-template');
      element.removeAttr('tooltip-template');
    }

    if (element.attr('tooltip-template-url') !== undefined) {

      attributesToAdd['tooltip-template-url'] = element.attr('tooltip-template-url');
      element.removeAttr('tooltip-template-url');
    }

    if (element.attr('tooltip-controller') !== undefined) {

      attributesToAdd['tooltip-controller'] = element.attr('tooltip-controller');
      element.removeAttr('tooltip-controller');
    }

    if (element.attr('tooltip-side') !== undefined) {

      attributesToAdd['tooltip-side'] = element.attr('tooltip-side');
      element.removeAttr('tooltip-side');
    }

    if (element.attr('tooltip-show-trigger') !== undefined) {

      attributesToAdd['tooltip-show-trigger'] = element.attr('tooltip-show-trigger');
      element.removeAttr('tooltip-show-trigger');
    }

    if (element.attr('tooltip-hide-trigger') !== undefined) {

      attributesToAdd['tooltip-hide-trigger'] = element.attr('tooltip-hide-trigger');
      element.removeAttr('tooltip-hide-trigger');
    }

    if (element.attr('tooltip-smart') !== undefined) {

      attributesToAdd['tooltip-smart'] = element.attr('tooltip-smart');
      element.removeAttr('tooltip-smart');
    }

    if (element.attr('tooltip-class') !== undefined) {

      attributesToAdd['tooltip-class'] = element.attr('tooltip-class');
      element.removeAttr('tooltip-class');
    }

    if (element.attr('tooltip-close-button') !== undefined) {

      attributesToAdd['tooltip-close-button'] = element.attr('tooltip-close-button');
      element.removeAttr('tooltip-close-button');
    }

    if (element.attr('tooltip-size') !== undefined) {

      attributesToAdd['tooltip-size'] = element.attr('tooltip-size');
      element.removeAttr('tooltip-size');
    }

    if (element.attr('tooltip-speed') !== undefined) {

      attributesToAdd['tooltip-speed'] = element.attr('tooltip-speed');
      element.removeAttr('tooltip-speed');
    }

    return attributesToAdd;
  }
  , getStyle = function getStyle(anElement) {

    if (window.getComputedStyle) {

      return window.getComputedStyle(anElement, '');
    } else if (anElement.currentStyle) {

      return anElement.currentStyle;
    }
  }
  , getAppendedTip = function getAppendedTip(theTooltipElement) {
    var tipsInBody = window.document.querySelectorAll('._exradicated-tooltip')
      , aTipInBody
      , tipsInBodyIndex = 0
      , tipsInBodyLength = tipsInBody.length
      , angularizedElement;

    for (; tipsInBodyIndex < tipsInBodyLength; tipsInBodyIndex += 1) {

      aTipInBody = tipsInBody.item(tipsInBodyIndex);
      if (aTipInBody) {

        angularizedElement = angular.element(aTipInBody);
        if (angularizedElement.data('_tooltip-parent') &&
          angularizedElement.data('_tooltip-parent') === theTooltipElement) {

          return angularizedElement;
        }
      }
    }
  }
  , removeAppendedTip = function removeAppendedTip(theTooltipElement) {
    var tipElement = getAppendedTip(theTooltipElement);

    if (tipElement) {

      tipElement.remove();
    }
  }
  , isOutOfPage = function isOutOfPage(theTipElement) {

    if (theTipElement) {
      var squarePosition = theTipElement[0].getBoundingClientRect();

      if (squarePosition.top < 0 ||
        squarePosition.top > window.document.body.offsetHeight ||
        squarePosition.left < 0 ||
        squarePosition.left > window.document.body.offsetWidth ||
        squarePosition.bottom < 0 ||
        squarePosition.bottom > window.document.body.offsetHeight ||
        squarePosition.right < 0 ||
        squarePosition.right > window.document.body.offsetWidth) {

        theTipElement.css({
          'top': '',
          'left': '',
          'bottom': '',
          'right': ''
        });
        return true;
      }

      return false;
    }

    throw new Error('You must provide a position');
  }
  , tooltipConfigurationProvider = function tooltipConfigurationProvider() {

    var tooltipConfiguration = {
      'side': 'top',
      'showTrigger': 'mouseover',
      'hideTrigger': 'mouseleave',
      'class': '',
      'smart': false,
      'closeButton': false,
      'size': '',
      'speed': 'steady'
    };

    return {
      'configure': function configure(configuration) {
        var configurationKeys = Object.keys(tooltipConfiguration)
          , configurationIndex = 0
          , aConfigurationKey;

        if (configuration) {

          for (; configurationIndex < configurationKeys.length; configurationIndex += 1) {

            aConfigurationKey = configurationKeys[configurationIndex];
            if (aConfigurationKey &&
              configuration[aConfigurationKey]) {

              tooltipConfiguration[aConfigurationKey] = configuration[aConfigurationKey];
            }
          }
        }
      },
      '$get': /*@ngInject*/ function instantiateProvider() {

        return tooltipConfiguration;
      }
    };
  }
  , tooltipDirective = /*@ngInject*/ ["$log", "$http", "$compile", "$timeout", "$controller", "$injector", "tooltipsConf", function tooltipDirective($log, $http, $compile, $timeout, $controller, $injector, tooltipsConf) {

    var linkingFunction = function linkingFunction($scope, $element, $attrs, $controllerDirective, $transcludeFunc) {

      if ($attrs.tooltipTemplate &&
        $attrs.tooltipTemplateUrl) {

        throw new Error('You can not define tooltip-template and tooltip-template-url together');
      }

      if (!($attrs.tooltipTemplateUrl || $attrs.tooltipTemplate) &&
        $attrs.tooltipController) {

        throw new Error('You can not have a controller without a template or templateUrl defined');
      }

      var oldTooltipSide = '_' + tooltipsConf.side
        , oldTooltipShowTrigger = tooltipsConf.showTrigger
        , oldTooltipHideTrigger = tooltipsConf.hideTrigger
        , oldTooltipClass
        , oldSize = tooltipsConf.size
        , oldSpeed = '_' + tooltipsConf.speed;

      $attrs.tooltipSide = $attrs.tooltipSide || tooltipsConf.side;
      $attrs.tooltipShowTrigger = $attrs.tooltipShowTrigger || tooltipsConf.showTrigger;
      $attrs.tooltipHideTrigger = $attrs.tooltipHideTrigger || tooltipsConf.hideTrigger;
      $attrs.tooltipClass = $attrs.tooltipClass || tooltipsConf.class;
      $attrs.tooltipSmart = $attrs.tooltipSmart === 'true' || tooltipsConf.smart;
      $attrs.tooltipCloseButton = $attrs.tooltipCloseButton || tooltipsConf.closeButton.toString();
      $attrs.tooltipSize = $attrs.tooltipSize || tooltipsConf.size;
      $attrs.tooltipSpeed = $attrs.tooltipSpeed || tooltipsConf.speed;
      $attrs.tooltipAppendToBody = $attrs.tooltipAppendToBody === 'true';

      $transcludeFunc($scope, function onTransclusionDone(element, scope) {
        var attributes = getAttributesToAdd(element)
          , tooltipElement = angular.element(window.document.createElement('tooltip'))
          , tipContElement = angular.element(window.document.createElement('tip-cont'))
          , tipElement = angular.element(window.document.createElement('tip'))
          , tipTipElement = angular.element(window.document.createElement('tip-tip'))
          , closeButtonElement = angular.element(window.document.createElement('span'))
          , tipArrowElement = angular.element(window.document.createElement('tip-arrow'))
          , whenActivateMultilineCalculation = function whenActivateMultilineCalculation() {

            return tipContElement.html();
          }
          , calculateIfMultiLine = function calculateIfMultiLine(newValue) {

            if (newValue !== undefined &&
              tipContElement[0].getClientRects().length > 1) {

              tooltipElement.addClass('_multiline');
            } else {

              tooltipElement.removeClass('_multiline');
            }
          }
          , onTooltipShow = function onTooltipShow(event) {

            tipElement.addClass('_hidden');
            if ($attrs.tooltipSmart) {

              switch ($attrs.tooltipSide) {
                case 'top': {

                  if (isOutOfPage(tipElement)) {

                    tooltipElement.removeClass('_top');
                    tooltipElement.addClass('_left');
                    if (isOutOfPage(tipElement)) {

                      tooltipElement.removeClass('_left');
                      tooltipElement.addClass('_bottom');
                      if (isOutOfPage(tipElement)) {

                        tooltipElement.removeClass('_bottom');
                        tooltipElement.addClass('_right');
                        if (isOutOfPage(tipElement)) {

                          tooltipElement.removeClass('_right');
                          tooltipElement.addClass('_top');
                        }
                      }
                    }
                  }
                  break;
                }

                case 'left': {

                  if (isOutOfPage(tipElement)) {

                    tooltipElement.removeClass('_left');
                    tooltipElement.addClass('_bottom');
                    if (isOutOfPage(tipElement)) {

                      tooltipElement.removeClass('_bottom');
                      tooltipElement.addClass('_right');
                      if (isOutOfPage(tipElement)) {

                        tooltipElement.removeClass('_right');
                        tooltipElement.addClass('_top');
                        if (isOutOfPage(tipElement)) {

                          tooltipElement.removeClass('_top');
                          tooltipElement.addClass('_left');
                        }
                      }
                    }
                  }
                  break;
                }

                case 'bottom': {

                  if (isOutOfPage(tipElement)) {

                    tooltipElement.removeClass('_bottom');
                    tooltipElement.addClass('_left');
                    if (isOutOfPage(tipElement)) {

                      tooltipElement.removeClass('_left');
                      tooltipElement.addClass('_top');
                      if (isOutOfPage(tipElement)) {

                        tooltipElement.removeClass('_top');
                        tooltipElement.addClass('_right');
                        if (isOutOfPage(tipElement)) {

                          tooltipElement.removeClass('_right');
                          tooltipElement.addClass('_bottom');
                        }
                      }
                    }
                  }
                  break;
                }

                case 'right': {

                  if (isOutOfPage(tipElement)) {

                    tooltipElement.removeClass('_right');
                    tooltipElement.addClass('_top');
                    if (isOutOfPage(tipElement)) {

                      tooltipElement.removeClass('_top');
                      tooltipElement.addClass('_left');
                      if (isOutOfPage(tipElement)) {

                        tooltipElement.removeClass('_left');
                        tooltipElement.addClass('_bottom');
                        if (isOutOfPage(tipElement)) {

                          tooltipElement.removeClass('_bottom');
                          tooltipElement.addClass('_right');
                        }
                      }
                    }
                  }
                  break;
                }
                default: {

                  throw new Error('Position not supported');
                }
              }
            }

            if ($attrs.tooltipAppendToBody) {

              var tipTipElementStyle = getStyle(tipTipElement[0])
                , tipArrowElementStyle = getStyle(tipArrowElement[0])
                , tipElementStyle = getStyle(tipElement[0])
                , tipElementBoundingClientRect = tipElement[0].getBoundingClientRect()
                , exradicatedTipElement = angular.copy(tipElement)
                , tipTipStyleIndex = 0
                , tipTipStyleLength = tipTipElementStyle.length
                , tipArrowStyleIndex = 0
                , tipArrowStyleLength = tipArrowElementStyle.length
                , tipStyleIndex = 0
                , tipStyleLength = tipElementStyle.length
                , aStyleKey
                , tipTipCssToSet = {}
                , tipCssToSet = {}
                , tipArrowCssToSet = {}
                , paddingTopValue
                , paddingBottomValue
                , paddingLeftValue
                , paddingRightValue;

              tipElement.removeClass('_hidden');
              exradicatedTipElement.removeClass('_hidden');
              exradicatedTipElement.data('_tooltip-parent', tooltipElement);
              removeAppendedTip(tooltipElement);

              for (; tipTipStyleIndex < tipTipStyleLength; tipTipStyleIndex += 1) {

                aStyleKey = tipTipElementStyle[tipTipStyleIndex];
                if (aStyleKey &&
                  tipTipElementStyle.getPropertyValue(aStyleKey)) {

                  tipTipCssToSet[aStyleKey] = tipTipElementStyle.getPropertyValue(aStyleKey);
                }
              }

              for (; tipArrowStyleIndex < tipArrowStyleLength; tipArrowStyleIndex += 1) {

                aStyleKey = tipArrowElementStyle[tipArrowStyleIndex];
                if (aStyleKey &&
                  tipArrowElementStyle.getPropertyValue(aStyleKey)) {

                  tipArrowCssToSet[aStyleKey] = tipArrowElementStyle.getPropertyValue(aStyleKey);
                }
              }

              for (; tipStyleIndex < tipStyleLength; tipStyleIndex += 1) {

                aStyleKey = tipElementStyle[tipStyleIndex];
                if (aStyleKey &&
                    aStyleKey !== 'position' &&
                    aStyleKey !== 'display' &&
                    aStyleKey !== 'opacity' &&
                    aStyleKey !== 'z-index' &&
                    aStyleKey !== 'bottom' &&
                    aStyleKey !== 'height' &&
                    aStyleKey !== 'left' &&
                    aStyleKey !== 'right' &&
                    aStyleKey !== 'top' &&
                    aStyleKey !== 'width' &&
                  tipElementStyle.getPropertyValue(aStyleKey)) {

                  tipCssToSet[aStyleKey] = tipElementStyle.getPropertyValue(aStyleKey);
                }
              }
              paddingTopValue = window.parseInt(tipElementStyle.getPropertyValue('padding-top'), 10);
              paddingBottomValue = window.parseInt(tipElementStyle.getPropertyValue('padding-bottom'), 10);
              paddingLeftValue = window.parseInt(tipElementStyle.getPropertyValue('padding-left'), 10);
              paddingRightValue = window.parseInt(tipElementStyle.getPropertyValue('padding-right'), 10);

              tipCssToSet.top = tipElementBoundingClientRect.top + window.pageYOffset + 'px';
              tipCssToSet.left = tipElementBoundingClientRect.left + window.pageXOffset + 'px';
              tipCssToSet.height = tipElementBoundingClientRect.height - (paddingTopValue + paddingBottomValue) + 'px';
              tipCssToSet.width = tipElementBoundingClientRect.width - (paddingLeftValue + paddingRightValue) + 'px';

              exradicatedTipElement.css(tipCssToSet);

              exradicatedTipElement.children().css(tipTipCssToSet);
              exradicatedTipElement.children().next().css(tipArrowCssToSet);
              if (event &&
                $attrs.tooltipHidden !== 'true') {

                exradicatedTipElement.addClass('_exradicated-tooltip');
                angular.element(window.document.body).append(exradicatedTipElement);
              }
            } else {

              tipElement.removeClass('_hidden');
              if (event &&
                $attrs.tooltipHidden !== 'true') {

                tooltipElement.addClass('active');
              }
            }
          }
          , onTooltipHide = function onTooltipHide() {

            if ($attrs.tooltipAppendToBody) {

              removeAppendedTip(tooltipElement);
            } else {

              tooltipElement.removeClass('active');
            }
          }
          , registerOnScrollFrom = function registerOnScrollFrom(theElement) {
            var parentElement = theElement.parent()
              , timer;

            if (theElement[0] &&
              (theElement[0].scrollHeight > theElement[0].clientHeight ||
              theElement[0].scrollWidth > theElement[0].clientWidth)) {

              theElement.on('scroll', function onScroll() {
                var that = this;

                if (timer) {

                  $timeout.cancel(timer);
                }

                timer = $timeout(function doLater() {

                  var theTipElement = getAppendedTip(tooltipElement)
                    , tooltipBoundingRect = tooltipElement[0].getBoundingClientRect()
                    , thatBoundingRect = that.getBoundingClientRect();

                  if (tooltipBoundingRect.top < thatBoundingRect.top ||
                    tooltipBoundingRect.bottom > thatBoundingRect.bottom ||
                    tooltipBoundingRect.left < thatBoundingRect.left ||
                    tooltipBoundingRect.right > thatBoundingRect.right) {

                    removeAppendedTip(tooltipElement);
                  } else if (theTipElement) {

                    onTooltipShow(true);
                  }
                });
              });
            }

            if (parentElement &&
              parentElement.length) {

              registerOnScrollFrom(parentElement);
            }
          }
          , onTooltipTemplateChange = function onTooltipTemplateChange(newValue) {

            if (newValue) {
              tooltipElement.removeClass('_force-hidden'); //see lines below, this forces to hide tooltip when is empty
              tipTipElement.empty();
              tipTipElement.append(closeButtonElement);
              tipTipElement.append(newValue);
              $timeout(function doLaterShow() {

                onTooltipShow();
              });
            } else {
              //hide tooltip because is empty
              tipTipElement.empty();
              tooltipElement.addClass('_force-hidden'); //force to be hidden if empty
            }
          }
          , onTooltipTemplateUrlChange = function onTooltipTemplateUrlChange(newValue) {

            if (newValue) {

              $http.get(newValue).then(function onResponse(response) {

                if (response &&
                  response.data) {

                  tooltipElement.removeClass('_force-hidden'); //see lines below, this forces to hide tooltip when is empty
                  tipTipElement.empty();
                  tipTipElement.append(closeButtonElement);
                  tipTipElement.append($compile(response.data)(scope));
                  $timeout(function doLater() {

                    onTooltipShow();
                  });
                }
              });
            } else {
              //hide tooltip because is empty
              tipTipElement.empty();
              tooltipElement.addClass('_force-hidden'); //force to be hidden if empty
            }
          }
          , onTooltipSideChange = function onTooltipSideChange(newValue) {

            if (newValue) {

              if (oldTooltipSide) {

                tooltipElement.removeAttr('_' + oldTooltipSide);
              }
              tooltipElement.addClass('_' + newValue);
              oldTooltipSide = newValue;
            }
          }
          , onTooltipShowTrigger = function onTooltipShowTrigger(newValue) {

            if (newValue) {

              if (oldTooltipShowTrigger) {

                tooltipElement.off(oldTooltipShowTrigger);
              }
              tooltipElement.on(newValue, onTooltipShow);
              oldTooltipShowTrigger = newValue;
            }
          }
          , onTooltipHideTrigger = function onTooltipHideTrigger(newValue) {

            if (newValue) {

              if (oldTooltipHideTrigger) {

                tooltipElement.off(oldTooltipHideTrigger);
              }
              tooltipElement.on(newValue, onTooltipHide);
              oldTooltipHideTrigger = newValue;
            }
          }
          , onTooltipClassChange = function onTooltipClassChange(newValue) {

            if (newValue) {

              if (oldTooltipClass) {

                tipElement.removeClass(oldTooltipClass);
              }
              tipElement.addClass(newValue);
              oldTooltipClass = newValue;
            }
          }
          , onTooltipSmartChange = function onTooltipSmartChange() {

            if (typeof $attrs.tooltipSmart !== 'boolean') {

              $attrs.tooltipSmart = $attrs.tooltipSmart === 'true';
            }
          }
          , onTooltipCloseButtonChange = function onTooltipCloseButtonChange(newValue) {
            var enableButton = newValue === 'true';

            if (enableButton) {

              closeButtonElement.on('click', onTooltipHide);
              closeButtonElement.css('display', 'block');
            } else {

              closeButtonElement.off('click');
              closeButtonElement.css('display', 'none');
            }
          }
          , onTooltipTemplateControllerChange = function onTooltipTemplateControllerChange(newValue) {

            if (newValue) {

              var tipController = $controller(newValue, {
                  '$scope': scope
                })
                , newScope = scope.$new(false, scope)
                , indexOfAs = newValue.indexOf('as')
                , controllerName;

              if (indexOfAs >= 0) {

                controllerName = newValue.substr(indexOfAs + 3);
                newScope[controllerName] = tipController;
              } else {

                angular.extend(newScope, tipController);
              }

              tipTipElement.replaceWith($compile(tipTipElement)(newScope));
              /*eslint-disable no-use-before-define*/
              unregisterOnTooltipControllerChange();
              /*eslint-enable no-use-before-define*/
            }
          }
          , onTooltipSizeChange = function onTooltipSizeChange(newValue) {

            if (newValue) {

              if (oldSize) {

                tipTipElement.removeClass('_' + oldSize);
              }
              tipTipElement.addClass('_' + newValue);
              oldSize = newValue;
            }
          }
          , onTooltipSpeedChange = function onTooltipSpeedChange(newValue) {

            if (newValue) {

              if (oldSpeed) {

                tooltipElement.removeClass('_' + oldSpeed);
              }
              tooltipElement.addClass('_' + newValue);
              oldSpeed = newValue;
            }
          }
          , unregisterOnTooltipTemplateChange = $attrs.$observe('tooltipTemplate', onTooltipTemplateChange)
          , unregisterOnTooltipTemplateUrlChange = $attrs.$observe('tooltipTemplateUrl', onTooltipTemplateUrlChange)
          , unregisterOnTooltipSideChangeObserver = $attrs.$observe('tooltipSide', onTooltipSideChange)
          , unregisterOnTooltipShowTrigger = $attrs.$observe('tooltipShowTrigger', onTooltipShowTrigger)
          , unregisterOnTooltipHideTrigger = $attrs.$observe('tooltipHideTrigger', onTooltipHideTrigger)
          , unregisterOnTooltipClassChange = $attrs.$observe('tooltipClass', onTooltipClassChange)
          , unregisterOnTooltipSmartChange = $attrs.$observe('tooltipSmart', onTooltipSmartChange)
          , unregisterOnTooltipCloseButtonChange = $attrs.$observe('tooltipCloseButton', onTooltipCloseButtonChange)
          , unregisterOnTooltipControllerChange = $attrs.$observe('tooltipController', onTooltipTemplateControllerChange)
          , unregisterOnTooltipSizeChange = $attrs.$observe('tooltipSize', onTooltipSizeChange)
          , unregisterOnTooltipSpeedChange = $attrs.$observe('tooltipSpeed', onTooltipSpeedChange)
          , unregisterTipContentChangeWatcher = scope.$watch(whenActivateMultilineCalculation, calculateIfMultiLine);

        closeButtonElement.attr({
          'id': 'close-button'
        });
        closeButtonElement.html('&times;');

        tipElement.addClass('_hidden');

        tipTipElement.append(closeButtonElement);
        tipTipElement.append($attrs.tooltipTemplate);

        tipElement.append(tipTipElement);
        tipElement.append(tipArrowElement);

        tipContElement.append(element);

        tooltipElement.attr(attributes);
        tooltipElement.addClass('tooltips');

        tooltipElement.append(tipContElement);
        tooltipElement.append(tipElement);
        $element.after(tooltipElement);

        if ($attrs.tooltipAppendToBody) {

          resizeObserver.add(function onResize() {

            registerOnScrollFrom(tooltipElement);
          });
          registerOnScrollFrom(tooltipElement);
        }

        resizeObserver.add(function registerResize() {

          calculateIfMultiLine();
          onTooltipShow();
        });

        $timeout(function doLater() {

          onTooltipShow();
          tipElement.removeClass('_hidden');
          tooltipElement.addClass('_ready');
        });

        scope.$on('$destroy', function unregisterListeners() {

          unregisterOnTooltipTemplateChange();
          unregisterOnTooltipTemplateUrlChange();
          unregisterOnTooltipSideChangeObserver();
          unregisterOnTooltipShowTrigger();
          unregisterOnTooltipHideTrigger();
          unregisterOnTooltipClassChange();
          unregisterOnTooltipSmartChange();
          unregisterOnTooltipCloseButtonChange();
          unregisterOnTooltipSizeChange();
          unregisterOnTooltipSpeedChange();
          unregisterTipContentChangeWatcher();
          resizeObserver.remove();
          element.off($attrs.tooltipShowTrigger + ' ' + $attrs.tooltipHideTrigger);
        });
      });
    };

    return {
      'restrict': 'A',
      'transclude': 'element',
      'priority': 1,
      'terminal': true,
      'link': linkingFunction
    };
  }];

  angular.module('720kb.tooltips', [])
  .provider(directiveName + 'Conf', tooltipConfigurationProvider)
  .directive(directiveName, tooltipDirective);
}(angular, window));
