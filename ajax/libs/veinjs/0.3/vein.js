/**
 *  vein.js - version 0.3
 *
 *  by Danny Povolotski (dannypovolotski@gmail.com)
 **/

!function (name, definition) {
    if (typeof module != 'undefined') module.exports = definition()
    else if (typeof define == 'function' && define.amd) define(name, definition)
    else this[name] = definition()
}('vein', function () {
    var vein = function(){};

    // Kudos to: http://youmightnotneedjquery.com/
    var extend = function(out) {
      out = out || {};

      for (var i = 1; i < arguments.length; i++) {
        if (!arguments[i])
          continue;

        for (var key in arguments[i]) {
          if (arguments[i].hasOwnProperty(key))
            out[key] = arguments[i][key];
        }
      }

      return out;
    };

    var findOrDeleteBySelector = function(selector, stylesheet, css){
        var matches = [],
            rules = stylesheet[ document.all ? 'rules' : 'cssRules' ],
            selectorCompare = selector.replace(/\s/g,''),
            ri, rl;

        // Since there could theoretically be multiple versions of the same rule,
        // we will first iterate
        for(ri = 0, rl = rules.length; ri < rl; ri++) {
            if(
                // regular style selector
                (rules[ri].selectorText === selector)   ||
                // for media queries, remove spaces and see if the query matches
                (rules[ri].type === 4 && rules[ri].cssText.replace(/\s/g,'').substring(0, selectorCompare.length) == selectorCompare)
            ) {
                if(css === null) {
                    // If we set css to null, let's delete that ruleset altogether
                    stylesheet.deleteRule(ri);
                }
                else {
                    // Otherwise - we push it into the matches array
                    matches.push(rules[ri]);
                }
            }
        }

        return matches;
    };

    var cssToString = function(css){
        cssArray = [];

        for(property in css) {
            if (css.hasOwnProperty(property)) {
                cssArray.push(property + ': ' + css[property] + ';');
            }
        }
        cssText = cssArray.join('');
        return cssText;
    };

    // Get the stylesheet we use to inject stuff or create it if it doesn't exist yet
    vein.getStylesheet = function() {
        var self = this,
            si, sl;

        if(!self.element) {
            self.element = document.createElement("style");
            self.element.setAttribute('type', 'text/css');
            self.element.setAttribute('id', 'vein');
            document.getElementsByTagName("head")[0].appendChild(self.element);

            // We have just appended our Stylesheet, - it's the last one in HEAD
            // so we start from the end, and just in case, we would check backwards
            // until we find the right one
            for(si = document.styleSheets.length - 1; si >= 0; si--) {
                if((document.styleSheets[si].ownerNode || document.styleSheets[si].owningElement) === self.element){
                    self.stylesheet = document.styleSheets[si];
                    break;
                }
            }
        }

        return self.stylesheet;
    };

    var getRulesFromStylesheet = function(stylesheet){
        return stylesheet[ document.all ? 'rules' : 'cssRules' ];
    }

    var insertRule = function(selector, cssText, stylesheet){
        var rules = getRulesFromStylesheet(stylesheet);

        if(stylesheet.insertRule) {
            // Supported by all modern browsers
            stylesheet.insertRule(selector + '{' + cssText + '}', rules.length);
        } else {
            // Old IE compatability
            stylesheet.addRule(selector, cssText, rules.length);
        }
    };

    // Let's inject some CSS. We can supply an array (or string) of selectors, and an object
    // with CSS value and property pairs.
    vein.inject = function(selectors, css, options) {
        options = extend({}, options);

        var self        =   this,
            stylesheet  =   options.stylesheet || self.getStylesheet(),
            rules       =   getRulesFromStylesheet(stylesheet),
            si, sl, query, matches, cssText, property, mi, ml, qi, ql;

        if(typeof selectors === 'string') {
            selectors = [selectors];
        }

        for(si = 0, sl = selectors.length; si < sl; si++) {
            if(typeof selectors[si] === 'object' && stylesheet.insertRule){
                for(query in selectors[si]) {
                    matches = findOrDeleteBySelector(query, stylesheet, css);

                    if(matches.length === 0){
                        cssText = cssToString(css);
                        for(qi = 0, ql = selectors[si][query].length; qi < ql; qi++) {
                            insertRule(query, selectors[si][query][qi] + '{' + cssText + '}', stylesheet);
                        }
                    } else {
                        for(mi = 0, ml = matches.length; mi < ml; mi++) {
                            self.inject(selectors[si][query], css, {stylesheet: matches[mi]});
                        }
                    }
                }
            } else {
                matches = findOrDeleteBySelector(selectors[si], stylesheet, css);

                // If all we wanted is to delete that ruleset, we're done here
                if(css === null) return;

                // If no rulesets have been found for the selector, we will create it below
                if(matches.length === 0) {
                    cssText = cssToString(css);
                    insertRule(selectors[si], cssText, stylesheet);
                }

                // Otherwise, we're just going to modify the property
                else {
                    for(mi = 0, ml = matches.length; mi < ml; mi++) {
                        for(property in css) {
                            if (css.hasOwnProperty(property)) {
                                // TODO: Implement priority
                                if(matches[mi].style.setProperty) {
                                    matches[mi].style.setProperty(property, css[property], '');
                                } else {
                                    //IE8
                                    matches[mi].style.setAttribute(property, css[property], '');
                                }
                            }
                        }
                    }
                }
            }
        }

        return self;
    };

    return vein;
});