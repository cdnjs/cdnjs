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
    function getStyle(oElm, css3Prop) {
      var strValue = '';
      if (window.getComputedStyle) {
        strValue = getComputedStyle(oElm).getPropertyValue(css3Prop);
      } else if (oElm.currentStyle) {
        //IE
        try {
          strValue = oElm.currentStyle[css3Prop];
        } catch (e) {
        }
      }
      return strValue;
    }
    function getParentWidth(element) {
      var parent = element[0], width;
      do {
        parent = parent.parentNode;
        width = parseInt(getStyle(parent, 'width'), 10) - parseInt(getStyle(parent, 'padding-left'), 10) - parseInt(getStyle(parent, 'padding-right'), 10);
      } while (getStyle(parent, 'display') != 'block' && parent.nodeName.toLowerCase() != 'body');
      return width + 'px';
    }
    function setMirrorStyle(mirror, element, attrs) {
      var style = $window.getComputedStyle(element[0]);
      var defaultMaxWidth = style.maxWidth === 'none' ? getParentWidth(element) : style.maxWidth;
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
        // Initial value of mirror is null character what should trigger initial width update
        var mirror = angular.element('<span style="white-space:pre;">&#000;</span>');
        setMirrorStyle(mirror, element, attrs);
        wrapper.append(mirror);
        function update() {
          var newValue = element.val() || attrs.placeholder || '';
          // If new value is the same value as previous one there is no need to update the styling
          if (mirror.text() == newValue)
            return;
          mirror.text(newValue);
          var delta = parseInt(attrs.puElasticInputWidthDelta) || 1;
          element.css('width', mirror.prop('offsetWidth') + delta + 'px');
        }
        update();
        scope.$watch(attrs.ngModel, update);
        element.on('keydown keyup focus input propertychange change', update);
        scope.$on('$destroy', function () {
          mirror.remove();
        });
      }
    };
  }
]);