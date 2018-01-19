/*
 * angular-tooltips
 *
 * Angular.js tooltips module.
 * http://720kb.github.io/angular-tooltips
 * 
 * MIT license
 * 2015-11-30T21:04:28.478Z
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
        tooltippedContent.text
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
  , tooltipDirective = /*@ngInject*/ ["$log", "$http", "$compile", "$timeout", function tooltipDirective($log, $http, $compile, $timeout) {

    var linkingFunction = function linkingFunction(scope, element, attrs) {

      var oldTooltipSide = '_top'
      , oldTooltipShowTrigger = 'mouseover'
      , oldTooltipHideTrigger = 'mouseleave'
      , oldTooltipClass
      , oldSize
      , oldSpeed = '_steady'
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
      , unregisterOnTooltipSpeedChange = attrs.$observe('tooltipSpeed', onTooltipSpeedChange);

      attrs.tooltipSide = attrs.tooltipSide || 'top';
      attrs.tooltipShowTrigger = attrs.tooltipShowTrigger || 'mouseover';
      attrs.tooltipHideTrigger = attrs.tooltipHideTrigger || 'mouseleave';
      attrs.tooltipClass = attrs.tooltipClass || '';
      attrs.tooltipSmart = attrs.tooltipSmart === 'true';
      attrs.tooltipCloseButton = attrs.tooltipCloseButton === 'true';
      attrs.tooltipSpeed = attrs.tooltipSpeed || 'steady';
      resizeObserver.add(function registerResize() {

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
  .directive(directiveName, tooltipDirective);
}(angular, window));
