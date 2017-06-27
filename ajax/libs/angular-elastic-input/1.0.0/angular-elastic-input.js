/**
 * angular-elastic-input
 * A directive for AngularJS which automatically resizes the width of input field according to the content, while typing.
 * @version: 1.0.0
 * @author: Jacek Pulit <jacek.pulit@gmail.com>
 * @license: MIT License
 */
'use strict';
angular.module('ngElasticInput', []).directive('elasticInput', function () {
  return {
    restrict: 'A',
    link: function postLink(scope, element, attrs) {
      var wrapper = angular.element('<div style="position:fixed; top:-999px; left:0;"></div>');
      var mirror = angular.element('<span style="white-space:pre;"></span>');
      var defaultMaxwidth = element.css('maxWidth') === 'none' ? element.parent().innerWidth() : element.css('maxWidth');
      element.css('minWidth', attrs.elasticInputMinwidth || element.css('minWidth'));
      element.css('maxWidth', attrs.elasticInputMaxwidth || defaultMaxwidth);
      angular.forEach([
        'fontFamily',
        'fontSize',
        'fontWeight',
        'fontStyle',
        'letterSpacing',
        'textTransform',
        'wordSpacing',
        'textIndent',
        'boxSizing',
        'borderRightWidth',
        'borderLeftWidth',
        'borderLeftStyle',
        'borderRightStyle',
        'paddingLeft',
        'paddingRight',
        'marginLeft',
        'marginRight'
      ], function (value) {
        mirror.css(value, element.css(value));
      });
      angular.element('body').append(wrapper.append(mirror));
      function update() {
        mirror.text(element.val());
        element.css('width', mirror.outerWidth() + 1);
      }
      update();
      element.on('keydown keyup focus input propertychange change', function () {
        update();
      });
    }
  };
});