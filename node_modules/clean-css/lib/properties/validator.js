
// Validates various CSS property values

module.exports = (function () {
  // Regexes used for stuff
  var widthKeywords = ['thin', 'thick', 'medium', 'inherit', 'initial'];
  var cssUnitRegexStr = '(\\-?\\.?\\d+\\.?\\d*(px|%|em|rem|in|cm|mm|ex|pt|pc|vw|vh|vmin|vmax|)|auto|inherit)';
  var cssFunctionNoVendorRegexStr = '[A-Z]+(\\-|[A-Z]|[0-9])+\\(([A-Z]|[0-9]|\\ |\\,|\\#|\\+|\\-|\\%|\\.)*\\)';
  var cssFunctionVendorRegexStr = '\\-(\\-|[A-Z]|[0-9])+\\(([A-Z]|[0-9]|\\ |\\,|\\#|\\+|\\-|\\%|\\.)*\\)';
  var cssFunctionAnyRegexStr = '(' + cssFunctionNoVendorRegexStr + '|' + cssFunctionVendorRegexStr + ')';
  var cssUnitAnyRegexStr = '(none|' + widthKeywords.join('|') + '|' + cssUnitRegexStr + '|' + cssFunctionNoVendorRegexStr + '|' + cssFunctionVendorRegexStr + ')';

  var backgroundRepeatKeywords = ['repeat', 'no-repeat', 'repeat-x', 'repeat-y', 'inherit'];
  var backgroundAttachmentKeywords = ['inherit', 'scroll', 'fixed', 'local'];
  var backgroundPositionKeywords = ['center', 'top', 'bottom', 'left', 'right'];
  var listStyleTypeKeywords = ['armenian', 'circle', 'cjk-ideographic', 'decimal', 'decimal-leading-zero', 'disc', 'georgian', 'hebrew', 'hiragana', 'hiragana-iroha', 'inherit', 'katakana', 'katakana-iroha', 'lower-alpha', 'lower-greek', 'lower-latin', 'lower-roman', 'none', 'square', 'upper-alpha', 'upper-latin', 'upper-roman'];
  var listStylePositionKeywords = ['inside', 'outside', 'inherit'];
  var outlineStyleKeywords = ['auto', 'inherit', 'hidden', 'none', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset'];

  var validator = {
    isValidHexColor: function (s) {
      return (s.length === 4 || s.length === 7) && s[0] === '#';
    },
    isValidRgbaColor: function (s) {
      s = s.split(' ').join('');
      return s.length > 0 && s.indexOf('rgba(') === 0 && s.indexOf(')') === s.length - 1;
    },
    isValidHslaColor: function (s) {
      s = s.split(' ').join('');
      return s.length > 0 && s.indexOf('hsla(') === 0 && s.indexOf(')') === s.length - 1;
    },
    isValidNamedColor: function (s) {
      // We don't really check if it's a valid color value, but allow any letters in it
      return s !== 'auto' && (s === 'transparent' || s === 'inherit' || /^[a-zA-Z]+$/.test(s));
    },
    isValidColor: function (s) {
      return validator.isValidNamedColor(s) || validator.isValidHexColor(s) || validator.isValidRgbaColor(s) || validator.isValidHslaColor(s);
    },
    isValidUrl: function (s) {
      // NOTE: at this point all URLs are replaced with placeholders by clean-css, so we check for those placeholders
      return s.indexOf('__ESCAPED_URL_CLEAN_CSS') === 0;
    },
    isValidUnit: function (s) {
      return new RegExp('^' + cssUnitAnyRegexStr + '$', 'gi').test(s);
    },
    isValidUnitWithoutFunction: function (s) {
      return new RegExp('^' + cssUnitRegexStr + '$', 'gi').test(s);
    },
    isValidFunctionWithoutVendorPrefix: function (s) {
      return new RegExp('^' + cssFunctionNoVendorRegexStr + '$', 'gi').test(s);
    },
    isValidFunctionWithVendorPrefix: function (s) {
      return new RegExp('^' + cssFunctionVendorRegexStr + '$', 'gi').test(s);
    },
    isValidFunction: function (s) {
      return new RegExp('^' + cssFunctionAnyRegexStr + '$', 'gi').test(s);
    },
    isValidBackgroundRepeat: function (s) {
      return backgroundRepeatKeywords.indexOf(s) >= 0;
    },
    isValidBackgroundAttachment: function (s) {
      return backgroundAttachmentKeywords.indexOf(s) >= 0;
    },
    isValidBackgroundPositionPart: function (s) {
      if (backgroundPositionKeywords.indexOf(s) >= 0)
        return true;

      return new RegExp('^' + cssUnitRegexStr + '$', 'gi').test(s);
    },
    isValidBackgroundPosition: function (s) {
      if (s === 'inherit')
        return true;

      return s.split(' ').filter(function (p) {
        return p !== '';
      }).every(function(p) {
        return validator.isValidBackgroundPositionPart(p);
      });
    },
    isValidListStyleType: function (s) {
      return listStyleTypeKeywords.indexOf(s) >= 0;
    },
    isValidListStylePosition: function (s) {
      return listStylePositionKeywords.indexOf(s) >= 0;
    },
    isValidOutlineColor: function (s) {
      return s === 'invert' || validator.isValidColor(s) || validator.isValidVendorPrefixedValue(s);
    },
    isValidOutlineStyle: function (s) {
      return outlineStyleKeywords.indexOf(s) >= 0;
    },
    isValidOutlineWidth: function (s) {
      return validator.isValidUnit(s) || widthKeywords.indexOf(s) >= 0;
    },
    isValidVendorPrefixedValue: function (s) {
      return /^-([A-Za-z0-9]|-)*$/gi.test(s);
    },
    areSameFunction: function (a, b) {
      if (!validator.isValidFunction(a) || !validator.isValidFunction(b)) {
        return false;
      }
      var f1name = a.substring(0, a.indexOf('('));
      var f2name = b.substring(0, b.indexOf('('));

      return f1name === f2name;
    }
  };

  validator.cssUnitRegexStr = cssUnitRegexStr;
  validator.cssFunctionNoVendorRegexStr = cssFunctionNoVendorRegexStr;
  validator.cssFunctionVendorRegexStr = cssFunctionVendorRegexStr;
  validator.cssFunctionAnyRegexStr = cssFunctionAnyRegexStr;
  validator.cssUnitAnyRegexStr = cssUnitAnyRegexStr;

  return validator;
})();
