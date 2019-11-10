/**
 * angular-elastic-input
 * A directive for AngularJS which automatically resizes the width of input field according to the content, while typing.
 * @author: Jacek Pulit <jacek.pulit@gmail.com>
 * @license: MIT License
 */
'use strict';
angular.module('puElasticInput', []).directive('puElasticInput', [
  '$document',
  '$window',
  function ($document, $window) {
    var wrapper = angular.element('<div style="position:fixed; top:-999px; left:0;"></div>');
    angular.element($document[0].body).append(wrapper);
    function setMirrorStyle(mirror, element, attrs) {
      var style = $window.getComputedStyle(element[0]);
      var defaultMaxWidth = style.maxWidth === 'none' ? element.parent().prop('clientWidth') : style.maxWidth;
      element.css('minWidth', attrs.puElasticInputMinwidth || style.minWidth);
      element.css('maxWidth', attrs.puElasticInputMaxwidth || defaultMaxWidth);
      angular.forEach([
        'fontFamily',
        'fontSize',
        'fontWeight',
        'fontStyle',
        'letterSpacing',
        'textTransform',
        'wordSpacing'
      ], function (value) {
        mirror.css(value, style[value]);
      });
      mirror.css('paddingLeft', style.textIndent);
      if (style.boxSizing === 'border-box') {
        angular.forEach([
          'paddingLeft',
          'paddingRight',
          'borderLeftStyle',
          'borderLeftWidth',
          'borderRightStyle',
          'borderRightWidth'
        ], function (value) {
          mirror.css(value, style[value]);
        });
      } else if (style.boxSizing === 'padding-box') {
        angular.forEach([
          'paddingLeft',
          'paddingRight'
        ], function (value) {
          mirror.css(value, style[value]);
        });
      }
    }
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        // Disable trimming inputs by default
        attrs.$set('ngTrim', attrs.ngTrim === 'true' ? 'true' : 'false');
        var mirror = angular.element('<span style="white-space:pre;"></span>');
        setMirrorStyle(mirror, element, attrs);
        wrapper.append(mirror);
        function update() {
          mirror.text(element.val() || attrs.placeholder || '');
          var delta = parseInt(attrs.puElasticInputWidthDelta) || 1;
          element.css('width', mirror.prop('offsetWidth') + delta + 'px');
        }
        update();
        if (attrs.ngModel) {
          scope.$watch(attrs.ngModel, update);
        } else {
          element.on('keydown keyup focus input propertychange change', update);
        }
        scope.$on('$destroy', function () {
          mirror.remove();
        });
      }
    };
  }
]);