/*
 * angular-tooltips
 * 1.0.2
 * 
 * Angular.js tooltips module.
 * http://720kb.github.io/angular-tooltips
 * 
 * MIT license
 * Tue Dec 01 2015
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
      , resize = function resize() {

        window.requestAnimationFrame(runCallbacks);
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
      }
    };
  }())
  , getElementHTML = function getElementHTML(element) {
    var txt
      , el = window.document.createElement('div')
      , attributesToAdd = [{
        'key': directiveName,
        'value': ''
      }];

    element.removeAttr(directiveName);
    if (element.attr('tooltip-template') !== undefined) {

      attributesToAdd.push({
        'key': 'tooltip-template',
        'value': element.attr('tooltip-template')
      });
      element.removeAttr('tooltip-template');
    }

    if (element.attr('tooltip-template-url') !== undefined) {

      attributesToAdd.push({
        'key': 'tooltip-template-url',
        'value': element.attr('tooltip-template-url')
      });
      element.removeAttr('tooltip-template-url');
    }

    if (element.attr('tooltip-controller') !== undefined) {

      attributesToAdd.push({
        'key': 'tooltip-controller',
        'value': element.attr('tooltip-controller')
      });
      element.removeAttr('tooltip-controller');
    }

    if (element.attr('tooltip-side') !== undefined) {

      attributesToAdd.push({
        'key': 'tooltip-side',
        'value': element.attr('tooltip-side')
      });
      element.removeAttr('tooltip-side');
    }

    if (element.attr('tooltip-show-trigger') !== undefined) {

      attributesToAdd.push({
        'key': 'tooltip-show-trigger',
        'value': element.attr('tooltip-show-trigger')
      });
      element.removeAttr('tooltip-show-trigger');
    }

    if (element.attr('tooltip-hide-trigger') !== undefined) {

      attributesToAdd.push({
        'key': 'tooltip-hide-trigger',
        'value': element.attr('tooltip-hide-trigger')
      });
      element.removeAttr('tooltip-hide-trigger');
    }

    if (element.attr('tooltip-smart') !== undefined) {

      attributesToAdd.push({
        'key': 'tooltip-smart',
        'value': element.attr('tooltip-smart')
      });
      element.removeAttr('tooltip-smart');
    }

    if (element.attr('tooltip-class') !== undefined) {

      attributesToAdd.push({
        'key': 'tooltip-class',
        'value': element.attr('tooltip-class')
      });
      element.removeAttr('tooltip-class');
    }

    if (element.attr('tooltip-close-button') !== undefined) {

      attributesToAdd.push({
        'key': 'tooltip-close-button',
        'value': element.attr('tooltip-close-button')
      });
      element.removeAttr('tooltip-close-button');
    }

    if (element.attr('tooltip-size') !== undefined) {

      attributesToAdd.push({
        'key': 'tooltip-size',
        'value': element.attr('tooltip-size')
      });
      element.removeAttr('tooltip-size');
    }

    if (element.attr('tooltip-speed') !== undefined) {

      attributesToAdd.push({
        'key': 'tooltip-speed',
        'value': element.attr('tooltip-speed')
      });
      element.removeAttr('tooltip-speed');
    }

    el.appendChild(element.clone()[0]);
    txt = el.innerHTML;
    el = null;
    return {
      'text': txt,
      'attrs': attributesToAdd
    };
  }
  , trasformTooltipContent = function trasformTooltipContent(tooltippedContent, tooltipTemplate, isTemplateUrl) {
    var attributes = ''
      , toReturn = [];

    tooltippedContent.attrs.forEach(function iterator(anElement) {

      if (anElement &&
        anElement.key) {

        attributes += anElement.key + '="' + anElement.value + '"';
      }
    });

    toReturn = [
      '<tooltip ' + attributes + ' class="tooltips">',
        '<tip-cont>',
          tooltippedContent.text,
        '</tip-cont>'
      ];
    if (tooltipTemplate ||
      isTemplateUrl) {

      toReturn = toReturn.concat([
        '<tip class="_hidden">',
          '<tip-tip>',
            '<span id="close-button">&times;</span>',
            tooltipTemplate,
          '</tip-tip>',
          '<tip-arrow></tip-arrow>',
        '</tip>'
      ]);
    }
    toReturn.push('</tooltip>');
    return toReturn.join(' ');
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

        if (configuration) {
          var configurationKeys = Object.keys(tooltipConfiguration)
            , configurationIndex = 0
            , aConfigurationKey;
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
  , tooltipDirective = /*@ngInject*/ ["$log", "$http", "$compile", "$timeout", "tooltipsConf", function tooltipDirective($log, $http, $compile, $timeout, tooltipsConf) {

    var linkingFunction = function linkingFunction(scope, element, attrs) {

      var oldTooltipSide = '_' + tooltipsConf.side
      , oldTooltipShowTrigger = tooltipsConf.showTrigger
      , oldTooltipHideTrigger = tooltipsConf.hideTrigger
      , oldTooltipClass
      , oldSize = tooltipsConf.size
      , oldSpeed = '_' + tooltipsConf.speed
      , whenActivateMultilineCalculation = function whenActivateMultilineCalculation() {

        return element.find('tip-cont').html();
      }
      , calculateIfMultiLine = function calculateIfMultiLine() {

        if (element.find('tip-cont')[0].getClientRects().length > 1) {

          element.addClass('_multiline');
        } else {

          element.removeClass('_multiline');
        }
      }
      , onTooltipShow = function onTooltipShow(event) {
        var tipElement = element.find('tip');

        tipElement.addClass('_hidden');
        if (attrs.tooltipSmart) {

          switch (attrs.tooltipSide) {
            case 'top': {

              if (isOutOfPage(tipElement)) {

                element.removeClass('_top');
                element.addClass('_left');
                if (isOutOfPage(tipElement)) {

                  element.removeClass('_left');
                  element.addClass('_bottom');
                  if (isOutOfPage(tipElement)) {

                    element.removeClass('_bottom');
                    element.addClass('_right');
                    if (isOutOfPage(tipElement)) {

                      element.removeClass('_right');
                      element.addClass('_top');
                    }
                  }
                }
              }
              break;
            }

            case 'left': {

              if (isOutOfPage(tipElement)) {

                element.removeClass('_left');
                element.addClass('_bottom');
                if (isOutOfPage(tipElement)) {

                  element.removeClass('_bottom');
                  element.addClass('_right');
                  if (isOutOfPage(tipElement)) {

                    element.removeClass('_right');
                    element.addClass('_top');
                    if (isOutOfPage(tipElement)) {

                      element.removeClass('_top');
                      element.addClass('_left');
                    }
                  }
                }
              }
              break;
            }

            case 'bottom': {

              if (isOutOfPage(tipElement)) {

                element.removeClass('_bottom');
                element.addClass('_left');
                if (isOutOfPage(tipElement)) {

                  element.removeClass('_left');
                  element.addClass('_top');
                  if (isOutOfPage(tipElement)) {

                    element.removeClass('_top');
                    element.addClass('_right');
                    if (isOutOfPage(tipElement)) {

                      element.removeClass('_right');
                      element.addClass('_bottom');
                    }
                  }
                }
              }
              break;
            }

            case 'right': {

              if (isOutOfPage(tipElement)) {

                element.removeClass('_right');
                element.addClass('_top');
                if (isOutOfPage(tipElement)) {

                  element.removeClass('_top');
                  element.addClass('_left');
                  if (isOutOfPage(tipElement)) {

                    element.removeClass('_left');
                    element.addClass('_bottom');
                    if (isOutOfPage(tipElement)) {

                      element.removeClass('_bottom');
                      element.addClass('_right');
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

        tipElement.removeClass('_hidden');
        if (event) {

          element.addClass('active');
        }
      }
      , onTooltipHide = function onTooltipHide() {

        element.removeClass('active');
      }
      , onTooltipTemplateChange = function onTooltipTemplateChange(newValue) {

        if (newValue) {

          $timeout(function doLater() {

            onTooltipShow();
          });
        }
      }
      , onTooltipTemplateUrlChange = function onTooltipTemplateUrlChange(newValue) {

        if (newValue) {

          $http.get(newValue).then(function onResponse(response) {

            if (response &&
              response.data) {
              var tipElement = getElementHTML(element.find('tip-tip').append(response.data)).text;

              element.find('tip-tip').replaceWith($compile(tipElement)(scope));
              $timeout(function doLater() {

                onTooltipShow();
              });
            }
          });
        }
      }
      , onTooltipTemplateControllerChange = function onTooltipTemplateControllerChange(newValue) {

        if (newValue) {

          element.find('tip-tip').attr('ng-controller', newValue);
          /*eslint-disable no-use-before-define*/
          unregisterOnTooltipControllerChange();
          /*eslint-enable no-use-before-define*/
        }
      }
      , onTooltipSideChange = function onTooltipSideChange(newValue) {

        if (newValue) {

          if (oldTooltipSide) {

            element.removeAttr('_' + oldTooltipSide);
          }
          element.addClass('_' + newValue);
          oldTooltipSide = newValue;
        }
      }
      , onTooltipShowTrigger = function onTooltipShowTrigger(newValue) {

        if (newValue) {

          if (oldTooltipShowTrigger) {

            element.off(oldTooltipShowTrigger);
          }
          element.on(newValue, onTooltipShow);
          oldTooltipShowTrigger = newValue;
        }
      }
      , onTooltipHideTrigger = function onTooltipHideTrigger(newValue) {

        if (newValue) {

          if (oldTooltipHideTrigger) {

            element.off(oldTooltipHideTrigger);
          }
          element.on(newValue, onTooltipHide);
          oldTooltipHideTrigger = newValue;
        }
      }
      , onTooltipClassChange = function onTooltipClassChange(newValue) {
        var tipElement = element.find('tip-tip');

        if (newValue) {

          if (oldTooltipClass) {

            tipElement.removeClass(oldTooltipClass);
          }
          tipElement.addClass(newValue);
          oldTooltipClass = newValue;
        }
      }
      , onTooltipCloseButtonChange = function onTooltipCloseButtonChange(newValue) {
        var theXButton = angular.element(element.find('tip-tip').children()[0])
          , enableButton = newValue === 'true';

        if (enableButton) {

          theXButton.on('click', onTooltipHide);
          theXButton.css('display', 'block');
        } else {

          theXButton.off('click');
          theXButton.css('display', 'none');
        }
      }
      , onTooltipSizeChange = function onTooltipSizeChange(newValue) {
        var tipElement = element.find('tip-tip');

        if (newValue) {

          if (oldSize) {

            tipElement.removeClass('_' + oldSize);
          }
          tipElement.addClass('_' + newValue);
          oldSize = newValue;
        }
      }
      , onTooltipSpeedChange = function onTooltipSpeedChange(newValue) {

        if (newValue) {

          if (oldSpeed) {

            element.removeClass('_' + oldSpeed);
          }
          element.addClass('_' + newValue);
          oldSpeed = newValue;
        }
      }
      , unregisterOnTooltipTemplateChange = attrs.$observe('tooltipTemplate', onTooltipTemplateChange)
      , unregisterOnTooltipTemplateUrlChange = attrs.$observe('tooltipTemplateUrl', onTooltipTemplateUrlChange)
      , unregisterOnTooltipControllerChange = attrs.$observe('tooltipController', onTooltipTemplateControllerChange)
      , unregisterOnTooltipSideChangeObserver = attrs.$observe('tooltipSide', onTooltipSideChange)
      , unregisterOnTooltipShowTrigger = attrs.$observe('tooltipShowTrigger', onTooltipShowTrigger)
      , unregisterOnTooltipHideTrigger = attrs.$observe('tooltipHideTrigger', onTooltipHideTrigger)
      , unregisterOnTooltipClassChange = attrs.$observe('tooltipClass', onTooltipClassChange)
      , unregisterOnTooltipCloseButtonChange = attrs.$observe('tooltipCloseButton', onTooltipCloseButtonChange)
      , unregisterOnTooltipSizeChange = attrs.$observe('tooltipSize', onTooltipSizeChange)
      , unregisterOnTooltipSpeedChange = attrs.$observe('tooltipSpeed', onTooltipSpeedChange)
      , unregisterTipContentChangeWatcher = scope.$watch(whenActivateMultilineCalculation, calculateIfMultiLine);

      attrs.tooltipSide = attrs.tooltipSide || tooltipsConf.side;
      attrs.tooltipShowTrigger = attrs.tooltipShowTrigger || tooltipsConf.showTrigger;
      attrs.tooltipHideTrigger = attrs.tooltipHideTrigger || tooltipsConf.hideTrigger;
      attrs.tooltipClass = attrs.tooltipClass || tooltipsConf.class;
      attrs.tooltipSmart = attrs.tooltipSmart === 'true' || tooltipsConf.smart;
      attrs.tooltipCloseButton = attrs.tooltipCloseButton === 'true' || tooltipsConf.closeButton;
      attrs.tooltipSize = attrs.tooltipSize || tooltipsConf.size;
      attrs.tooltipSpeed = attrs.tooltipSpeed || tooltipsConf.speed;
      resizeObserver.add(function registerResize() {

        calculateIfMultiLine();
        onTooltipShow();
      });

      $timeout(function doLater() {

        onTooltipShow();
        element.find('tip').removeClass('_hidden');
        element.addClass('_ready');
      });

      scope.$on('$destroy', function unregisterListeners() {

        unregisterOnTooltipTemplateChange();
        unregisterOnTooltipTemplateUrlChange();
        unregisterOnTooltipSideChangeObserver();
        unregisterOnTooltipShowTrigger();
        unregisterOnTooltipHideTrigger();
        unregisterOnTooltipClassChange();
        unregisterOnTooltipCloseButtonChange();
        unregisterOnTooltipSizeChange();
        unregisterOnTooltipSpeedChange();
        unregisterTipContentChangeWatcher();
        element.off(attrs.tooltipShowTrigger + ' ' + attrs.tooltipHideTrigger);
      });
    };

    return {
      'restrict': 'A',
      'scope': true,
      'compile': function compiling(compileElement, compileAttributes) {

        if (compileAttributes.tooltipTemplate &&
          compileAttributes.tooltipTemplateUrl) {

          throw new Error('You can not define tooltip-template and tooltip-url together');
        }

        if (!(compileAttributes.tooltipTemplateUrl || compileAttributes.tooltipTemplate) &&
          compileAttributes.tooltipController) {

          throw new Error('You can not have a controller without a template or templateUrl defined');
        }

        var initialElement = getElementHTML(compileElement)
          , startingTooltipContent = trasformTooltipContent(initialElement,
            compileAttributes.tooltipTemplate,
            !!compileAttributes.tooltipTemplateUrl);

        compileElement.replaceWith(startingTooltipContent);
        return linkingFunction;
      }
    };
  }];

  angular.module('720kb.tooltips', [])
  .provider(directiveName + 'Conf', tooltipConfigurationProvider)
  .directive(directiveName, tooltipDirective);
}(angular, window));
