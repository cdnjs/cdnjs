(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define(["jquery"], function (a0) {
      return (factory(a0));
    });
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require("jquery"));
  } else {
    factory(root["jQuery"]);
  }
}(this, function (jQuery) {

/**
 * jQuery Form Validator Module: Color
 * ------------------------------------------
 * Created by dszymczuk <https://github.com/dszymczuk>
 *
 *
 * This form validation module adds validators for some color formats like: hex, rgb, rgba, hsl, hsla.
 * Also it allow to use transparent as color
 * This module adds the following validators:
 *  - color
 *
 * @license MIT
 */
(function($) {

  $.formUtils.registerLoadedModule('color');

  /*
    HELPER FUNCTIONS
   */
  var filterFloat = function(value) {
    if (/^(\-|\+)?([0-9]+(\.[0-9]+)?|Infinity)$/
        .test(value)) {
      return Number(value);
    }

    return NaN;
  };

  var isBetween0and1 = function(value) {
    return value > 0 && value < 1;
  };

  // workaround for PhantomJS
  // https://github.com/ariya/phantomjs/issues/14014
  // can't use Number.isInteger
  var isInteger = function(value) {
    return Math.floor(value) === value && $.isNumeric(value);
  };

  /**
   * Check HEX format
   */
  $.formUtils.addValidator({
    name: 'hex',
    validatorFunction: function(val, $el) {
      if ($el.valAttr('allow-transparent') === 'true' && val === 'transparent') {
        return true;
      }

      var startWithHex = val[0] === '#';
      if (!startWithHex) {
        return false;
      }

      var isCorrectLength = val.length === 4 || val.length === 7;

      if (isCorrectLength) {
        var regex = /[0-9a-f]/i;
        var valueSliced = val.slice(1).split('');
        var isValid = true;
        valueSliced.forEach(function(i) {
          if (i.match(regex) === null) {
            isValid = false;
          }
        });
        return isValid;
      }

      return false;
    },
    errorMessage: '',
    errorMessageKey: 'badHex'
  });

  /**
   * Check RGB format
   */
  $.formUtils.addValidator({
    name: 'rgb',
    validatorFunction: function(val, $el) {
      if ($el.valAttr('allow-transparent') === 'true' && val === 'transparent') {
        return true;
      }

      var removedSpace = val.replace(/ /g, '');
      var regex = /rgb\([0-9]{1,3},[0-9]{1,3},[0-9]{1,3}\)/i;

      if (removedSpace.match(regex)) {
        var removeRgbCall = removedSpace.replace(/rgb/g, '');
        var removeBrackets = removeRgbCall.replace(/\(/g, '').replace(/\)/g, '');
        var valueSliced = removeBrackets.split(',');
        var isValid = true;

        valueSliced.forEach(function(i) {
          var parsedInt = parseInt(i, 10);
          if ((isInteger(parsedInt) && 0 <= parsedInt && parsedInt <= 255) === false) {
            isValid = false;
          }
        });
        return isValid;
      }

      return false;
    },
    errorMessage: '',
    errorMessageKey: 'badRgb'
  });

  /**
   * Check RGBA format
   */
  $.formUtils.addValidator({
    name: 'rgba',
    validatorFunction: function(val, $el) {
      if ($el.valAttr('allow-transparent') === 'true' && val === 'transparent') {
        return true;
      }

      var removedSpace = val.replace(/ /g, '');
      var regex = /rgba\([0-9]{1,3},[0-9]{1,3},[0-9]{1,3},[0,1]?.?[0-9]*\)/i;

      if (removedSpace.match(regex)) {
        var removeRgbaCall = removedSpace.replace(/rgba/g, '');
        var removeBrackets = removeRgbaCall.replace(/\(/g, '').replace(/\)/g, '');
        var valueSliced = removeBrackets.split(',');
        var isValid = true;

        valueSliced.forEach(function(i, index) {
          var value = filterFloat(i);
          if (isInteger(value)) {
            var isInRange = value >= 0 && value <= 255;
            if (!isInRange) {
              isValid = false;
            }

            if (isValid && index === 3) {
              isValid = value >= 0 && value < 2;
            }
          } else if (!isBetween0and1(i)) {
            isValid = false;
          }
        });
        return isValid;
      }

      return false;
    },
    errorMessage: '',
    errorMessageKey: 'badRgba'
  });

  /**
   * Check HSL format
   */
  $.formUtils.addValidator({
    name: 'hsl',
    validatorFunction: function(val, $el) {
      if ($el.valAttr('allow-transparent') === 'true' && val === 'transparent') {
        return true;
      }

      var removedSpace = val.replace(/ /g, '');
      var regex = /hsl\(-?[0-9]{1,3},[0-9]{1,3}%,[0-9]{1,3}%\)/i;

      if (removedSpace.match(regex)) {
        var removeHslCall = removedSpace.replace(/hsl/g, '');
        var removeBrackets = removeHslCall.replace(/\(/g, '').replace(/\)/g, '');
        var valueSliced = removeBrackets.split(',');
        var isValid = true;

        valueSliced.forEach(function(i, index) {
          var parsedInt = parseInt(i, 10);

          if (isInteger(parsedInt)) {
            if (index !== 0) {
              var isInRange = parsedInt >= 0 && parsedInt <= 100;
              if (!isInRange) {
                isValid = false;
              }
            }
          } else {
            isValid = false;
          }
        });
        return isValid;
      }

      return false;
    },
    errorMessage: '',
    errorMessageKey: 'badHsl'
  });

  /**
   * Check HSLA format
   */
  $.formUtils.addValidator({
    name: 'hsla',
    validatorFunction: function(val, $el) {
      if ($el.valAttr('allow-transparent') === 'true' && val === 'transparent') {
        return true;
      }

      var isInRange;
      var removedSpace = val.replace(/ /g, '');
      var regex = /hsla\(-?[0-9]{1,3},[0-9]{1,3}%,[0-9]{1,3}%,[0,1]?.?[0-9]*\)/i;

      if (removedSpace.match(regex)) {
        var removeHslaCall = removedSpace.replace(/hsla/g, '');
        var removeBrackets = removeHslaCall.replace(/\(/g, '').replace(/\)/g, '');
        var valueSliced = removeBrackets.split(',');
        var isValid = true;

        valueSliced.forEach(function(i, index) {
          var value = filterFloat(i);
          var parsedInt = parseInt(i, 10);

          if (isInteger(value)) {
            if (index !== 0 && index !== 3) {
              isInRange = value >= 0 && value <= 100;
              if (!isInRange) {
                isValid = false;
              }
            }

            if (isValid && index === 3) {
              isValid = value >= 0 && value < 2;
            }
          } else if (isNaN(value) && isInteger(parsedInt)) {
            isInRange = parsedInt >= 0 && parsedInt <= 100;
            if (!isInRange) {
              isValid = false;
            }
          } else {
            value = filterFloat(Number(i).toFixed(20));

            isInRange = value >= 0 && value <= 1;
            if (!isInRange) {
              isValid = false;
            }
          }
        });

        return isValid;
      }

      return false;
    },
    errorMessage: '',
    errorMessageKey: 'badHsla'
  });

})(jQuery);


}));
