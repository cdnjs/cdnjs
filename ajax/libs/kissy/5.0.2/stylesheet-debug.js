/*
Copyright 2014, modulex-stylesheet@1.0.1
MIT Licensed
build time: Thu, 16 Oct 2014 06:43:35 GMT
*/
modulex.add("stylesheet", ["dom"], function(require, exports, module) {
var dom = require("dom");
/*
combined modules:
stylesheet
*/
var stylesheet;
stylesheet = function (exports) {
  /**
   * @ignore
   * Normalize operation about stylesheet
   * @author yiminghe@gmail.com
   */
  var Dom = dom;
  /**
   * Normalize operation about stylesheet
   * @class KISSY.StyleSheet
   * @param el {HTMLElement} style/link element
   */
  function StyleSheet(el) {
    /**
     * style/link element or selector
     * @cfg {HTMLElement|String} el
     */
    /**
     * style/link element
     * @type {HTMLElement}
     * @property el
     */
    if (el.el) {
      el = el.el;
    }
    el = this.el = Dom.get(el);
    // http://msdn.microsoft.com/en-us/library/ie/ms535871(v=vs.85).aspx
    // firefox 跨域时抛出异常
    var sheet = el.sheet || el.styleSheet;
    this.sheet = sheet;
    var cssRules = {};
    this.cssRules = cssRules;
    var rulesName = sheet && 'cssRules' in sheet ? 'cssRules' : 'rules';
    this.rulesName = rulesName;
    var domCssRules = sheet[rulesName];
    var i, rule, selectorText, styleDeclaration;
    for (i = domCssRules.length - 1; i >= 0; i--) {
      rule = domCssRules[i];
      selectorText = rule.selectorText;
      // 去重
      if (styleDeclaration = cssRules[selectorText]) {
        styleDeclaration.style.cssText += ';' + styleDeclaration.style.cssText;
        deleteRule(sheet, i);
      } else {
        cssRules[selectorText] = rule;
      }
    }
  }
  StyleSheet.prototype = {
    constructor: StyleSheet,
    /**
     * Make current stylesheet enabled.
     * @chainable
     */
    enable: function () {
      this.sheet.disabled = false;
      return this;
    },
    /**
     * Make current stylesheet disabled.
     * @chainable
     */
    disable: function () {
      this.sheet.disabled = true;
      return this;
    },
    /**
     * Whether current stylesheet is enabled.
     * @return {Boolean}
     */
    isEnabled: function () {
      return !this.sheet.disabled;
    },
    /**
     * Set sheet's rule by selectorText and css.
     * @param {String} selectorText selector text separated by ,
     * @param {Object} css style declaration object. set value to "" to unset
     *
     * for example:
     *      // set
     *      set('p',{color:'red'})
     *      // unset
     *      set('p',{color:''})
     * @chainable
     */
    set: function (selectorText, css) {
      var sheet = this.sheet;
      var rulesName = this.rulesName;
      var cssRules = this.cssRules;
      var rule = cssRules[selectorText];
      var multiSelector = selectorText.split(/\s*,\s*/);
      var i;
      if (multiSelector.length > 1) {
        for (i = 0; i < multiSelector.length - 1; i++) {
          this.set(multiSelector[i], css);
        }
        return this;
      }
      if (rule) {
        css = toCssText(css, rule.style.cssText);
        if (css) {
          rule.style.cssText = css;
        } else {
          // unset remove this rule
          delete cssRules[selectorText];
          for (i = sheet[rulesName].length - 1; i >= 0; i--) {
            if (sheet[rulesName][i] === rule) {
              deleteRule(sheet, i);
              break;
            }
          }
        }
      } else {
        var len = sheet[rulesName].length;
        css = toCssText(css);
        if (css) {
          insertRule(sheet, selectorText, css, len);
          cssRules[selectorText] = sheet[rulesName][len];
        }
      }
      return this;
    },
    /**
     * Get cssText corresponding to specified selectorText
     * @param {String} selectorText specified selector as string
     * @return {String} CssText corresponding to specified selectorText
     */
    get: function (selectorText) {
      var rule, css, selector, cssRules = this.cssRules;
      if (selectorText) {
        rule = cssRules[selectorText];
        return rule ? rule.style.cssText : null;
      } else {
        css = [];
        for (selector in cssRules) {
          rule = cssRules[selector];
          css.push(rule.selectorText + ' {' + rule.style.cssText + '}');
        }
        return css.join('\n');
      }
    }
  };
  // # ------------------ private start
  var workerElement = document.createElement('p');
  function toCssText(css, base) {
    workerElement.style.cssText = base || '';
    Dom.css(workerElement, css);
    return workerElement.style.cssText;
  }
  function deleteRule(sheet, i) {
    if (sheet.deleteRule) {
      sheet.deleteRule(i);
    } else if (sheet.removeRule) {
      sheet.removeRule(i);
    }
  }
  function insertRule(sheet, sel, css, i) {
    if (sheet.insertRule) {
      sheet.insertRule(sel + ' {' + css + '}', i);
    } else if (sheet.addRule) {
      sheet.addRule(sel, css, i);
    }
  }
  // # ------------------ private end
  exports = StyleSheet;
  StyleSheet.version = '1.0.1';
  return exports;
}();
module.exports = stylesheet;
});