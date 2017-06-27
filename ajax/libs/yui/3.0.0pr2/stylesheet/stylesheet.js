YUI.add('stylesheet', function(Y) {

var d = Y.config.doc,
    p = d.createElement('p'), // Have to hold on to the node (see notes)
    style  = p.style, // worker style collection
    sheets = {},
    floatAttr = ('cssFloat' in style) ? 'cssFloat' : 'styleFloat',
    _toCssText,
    _unsetOpacity,
    _unsetProperty;


_unsetOpacity = ('opacity' in style) ?
    function (style) { style.opacity = ''; } :
    function (style) { style.filter = ''; };
        
style.border = "1px solid red";
style.border = ''; // IE doesn't unset child properties
_unsetProperty = style.borderLeft ?
    function (style,prop) {
        var p;
        if (prop !== floatAttr && prop.toLowerCase().indexOf('float') != -1) {
            prop = floatAttr;
        }
        if (typeof style[prop] === 'string') {
            switch (prop) {
                case 'opacity':
                case 'filter' : _unsetOpacity(style); break;
                case 'font'   :
                    style.font       = style.fontStyle = style.fontVariant =
                    style.fontWeight = style.fontSize  = style.lineHeight  =
                    style.fontFamily = '';
                    break;
                default       :
                    for (p in style) {
                        if (p.indexOf(prop) === 0) {
                            style[p] = '';
                        }
                    }
            }
        }
    } :
    function (style,prop) {
        if (prop !== floatAttr && prop.toLowerCase().indexOf('float') != -1) {
            prop = floatAttr;
        }
        if (Y.Lang.isString(style[prop])) {
            if (prop === 'opacity') {
                _unsetOpacity(style);
            } else {
                style[prop] = '';
            }
        }
    };
    
function StyleSheet(seed, name) {
    var head,
        node,
        sheet,
        cssRules = {},
        _rules,
        _insertRule,
        _deleteRule;

    // Factory or constructor
    if (!(this instanceof arguments.callee)) {
        return new arguments.callee(seed,name);
    }

    head = d.getElementsByTagName('head')[0];
    if (!head) {
        Y.fail('HEAD element not found to append STYLE node');
    }

    // TODO: use DOM?
    node = seed && (seed.nodeName ? seed :
            d.getElementById(seed.replace(/^#/,'')));
    if (seed && sheets[seed]) {
        return sheets[seed];
    } else if (node && sheets[Y.stamp(node)]) {
        return sheets[Y.stamp(node)];
    }

    if (!node || !/^(?:style|link)$/i.test(node.nodeName)) {
        node = d.createElement('style');
        node.type = 'text/css';
    }

    if (typeof seed === 'string') {
        // Create entire sheet from seed cssText
        if (seed.indexOf('{') != -1) {
            // Not a load-time fork because low run-time impact and IE fails
            // test for s.styleSheet at page load time (oddly)
            if (node.styleSheet) {
                node.styleSheet.cssText = seed;
            } else {
                node.appendChild(d.createTextNode(seed));
            }
        } else if (!name) {
            name = seed;
        }
    }

    if (node.parentNode !== head) {
        // styleSheet isn't available on the style node in FF2 until appended
        // to the head element.  style nodes appended to body do not affect
        // change in Safari.
        head.appendChild(node);
    }

    // IE stores StyleSheet under the "styleSheet" property
    sheet = node.sheet || node.styleSheet;

    // IE stores the rules collection under the "rules" property
    _rules = ('cssRules' in sheet) ? 'cssRules' : 'rules';

    // IE supports removeRule
    _deleteRule = ('deleteRule' in sheet) ?
        function (i) { sheet.deleteRule(i); } :
        function (i) { sheet.removeRule(i); };

    // IE supports addRule with different signature
    _insertRule = ('insertRule' in sheet) ?
        function (sel,css,i) { sheet.insertRule(sel+' '+css,i); } :
        function (sel,css,i) { sheet.addRule(sel,css,i); };

    // Initialize the cssRules map from the node
    // TODO if xdomain link node, copy to a local style block and replace the
    // link node with the style node.  CAVEAT: alternate stylesheet, @media
    // TODO: test existing node with funky selectors
    // TODO: Split comma delimited rules
    var i,r,sel;
    for (i = sheet[_rules].length - 1; i >= 0; --i) {
        r   = sheet[_rules][i];
        sel = r.selectorText;

        if (cssRules[sel]) {
            cssRules[sel].style.cssText += ';' + r.style.cssText;
            _deleteRule(i);
        } else {
            cssRules[sel] = r;
        }
    }

    // Cache the sheet by the generated Id
    StyleSheet.register(Y.stamp(node),this);
    if (name) {
        StyleSheet.register(name,this);
    }

    // Public API
    Y.mix(this,{
        getId : function () { return Y.stamp(node); },

        // Enabling/disabling the stylesheet.  Changes may be made to rules
        // while disabled.
        enable : function () { sheet.disabled = false; return this; },

        disable : function () { sheet.disabled = true; return this; },

        isEnabled : function () { return !sheet.disabled; },

        /**
         * Update style for a rule.  Add the rule if it's not present already.
         *
         */
        set : function (sel,css) {
            var rule = cssRules[sel],
                multi = sel.split(/\s*,\s*/),i,
                idx;

            // IE's addRule doesn't support multiple comma delimited selectors
            if (multi.length > 1) {
                for (i = multi.length - 1; i >= 0; --i) {
                    this.set(multi[i], css);
                }
                return this;
            }

            // Some selector values can cause IE to hang
            if (!StyleSheet.isValidSelector(sel)) {
                return this;
            }

            // Opera throws an error if there's a syntax error in assigned
            // cssText. Avoid this using a worker styls collection, then
            // assigning the resulting cssText.
            if (rule) {
                rule.style.cssText = StyleSheet.toCssText(css,rule.style.cssText);
            } else {
                idx = sheet[_rules].length;
                _insertRule(sel, '{'+StyleSheet.toCssText(css)+'}', idx);

                // Safari replaces the rules collection, but maintains the rule
                // instances in the new collection when rules are added/removed
                cssRules[sel] = sheet[_rules][idx];
            }
            return this;
        },

        // remove rule properties or an entire rule
        unset : function (sel,css) {
            var rule = cssRules[sel],
                remove = !css,
                rules, i;

            if (rule) {
                if (!remove) {
                    css = Y.Array(css);

                    style.cssText = rule.style.cssText;
                    for (i = css.length - 1; i >= 0; --i) {
                        _unsetProperty(style,css[i]);
                    }

                    if (style.cssText) {
                        rule.style.cssText = style.cssText;
                    } else {
                        remove = true;
                    }
                }
                
                if (remove) { // remove the rule altogether
                    rules = sheet[_rules];
                    for (i = rules.length - 1; i >= 0; --i) {
                        if (rules[i] === rule) {
                            delete cssRules[sel];
                            _deleteRule(i);
                            break;
                        }
                    }
                }
            }
            return this;
        }
    },true);

}

_toCssText = function (css,base) {
    var f = css.styleFloat || css.cssFloat || css['float'], prop;

    style.cssText = base || '';

    if (f && !css[floatAttr]) {
        css = Y.merge(css);
        delete css.styleFloat; delete css.cssFloat; delete css['float'];
        css[floatAttr] = f;
    }

    for (prop in css) {
        if (css.hasOwnProperty(prop)) {
            // IE throws Invalid Value errors
            try {
                // IE doesn't like values with whitespace ala ' red' or 'red '
                style[prop] = Y.Lang.trim(css[prop]);
            }
            catch (e) {
            }
        }
    }
    return style.cssText;
};

Y.mix(StyleSheet, {
// Wrap IE's toCssText to catch opacity.  The copy/merge is to preserve the
// input object's integrity, but if float and opacity are set, the input will
// be copied twice in IE.  Is there a way to avoid this without increasing the
// byte count?
    toCssText : ('opacity' in style) ? _toCssText :
        function (css, cssText) {
            if ('opacity' in css) {
                css = Y.merge(css,{
                        filter: 'alpha(opacity='+(css.opacity*100)+')'
                      });
                delete css.opacity;
            }
            return _toCssText(css,cssText);
        },

    register : function (name,sheet) {
        return !!(name && sheet instanceof StyleSheet &&
                  !sheets[name] && (sheets[name] = sheet));
    },

    // TODO: Selector should provide
    isValidSelector : function (sel) {
        // IE locks up on addRule(BAD_SELECTOR, '{..}');
        // BAD_SELECTOR : unescaped `~!@$%^&()+=|{}[];'"?< or space, ., or #
        //                followed by anything other than an alphanumeric
        //                -abc or .-abc or #_abc or '# ' all fail (prob more)
        // TODO: this will fail tag[prop=val] tests
        return !/[^\\][`~!@$%\^&()+=|{}\[\];'"?<]|^\s*[^a-z0-9*#.]|[\s.#][^a-z0-9]/i.test(sel);
    }
});

Y.StyleSheet = StyleSheet;

/*

NOTES
 * Style node must be added to the head element.  Safari does not honor styles
   applied to StyleSheet objects on style nodes in the body.
 * StyleSheet object is created on the style node when the style node is added
   to the head element in Firefox 2 (and maybe 3?)
 * The cssRules collection is replaced after insertRule/deleteRule calls in
   Safari 3.1.  Existing Rules are used in the new collection, so the collection
   cannot be cached, but the rules can be.
 * Opera requires that the index be passed with insertRule.
 * Same-domain restrictions prevent modifying StyleSheet objects attached to
   link elements with remote href (or "about:blank" or "javascript:false")
 * IE names StyleSheet related properties and methods differently (see code)
 * IE converts tag names to upper case in the Rule's selectorText
 * IE converts empty string assignment to complex properties to value settings
   for all child properties.  E.g. style.background = '' sets non-'' values on
   style.backgroundPosition, style.backgroundColor, etc.  All else clear
   style.background and all child properties.
 * IE assignment style.filter = '' will result in style.cssText == 'FILTER:'
 * All browsers support Rule.style.cssText as a read/write property, leaving
   only opacity needing to be accounted for.
 * Benchmarks of style.property = value vs style.cssText += 'property: value'
   indicate cssText is slightly slower for single property assignment.  For
   multiple property assignment, cssText speed stays relatively the same where
   style.property speed decreases linearly by the number of properties set.
   Exception being Opera 9.27, where style.property is always faster than
   style.cssText.
 * Opera 9.5b throws a syntax error when assigning cssText with a syntax error.
 * Opera 9.5 doesn't honor rule.style.cssText = ''.  Previous style persists.
   You have to remove the rule altogether.
 * Stylesheet properties set with !important will trump inline style set on an
   element or in el.style.property.
 * Creating a worker style collection like document.createElement('p').style;
   will fail after a time in FF (~5secs of inactivity).  Property assignments
   will not alter the property or cssText.  It may be the generated node is
   garbage collected and the style collection becomes inert (speculation).
 * IE locks up when attempting to add a rule with a selector including at least
   characters {[]}~`!@%^&*()+=|? (unescaped) and leading _ or -
   such as addRule('-foo','{ color: red }') or addRule('._abc','{...}')
 * IE's addRule doesn't support comma separated selectors such as
   addRule('.foo, .bar','{..}')
 * IE throws an error on valid values with leading/trailing white space.
 * When creating an entire sheet at once, only FF2/3 & Opera allow creating a
   style node, setting its innerHTML and appending to head.
 * When creating an entire sheet at once, Safari requires the style node to be
   created with content in innerHTML of another element.
 * When creating an entire sheet at once, IE requires the style node content to
   be set via node.styleSheet.cssText
 * When creating an entire sheet at once in IE, styleSheet.cssText can't be
   written until node.type = 'text/css'; is performed.
 * When creating an entire sheet at once in IE, load-time fork on
   var styleNode = d.createElement('style'); _method = styleNode.styleSheet ?..
   fails (falsey).  During run-time, the test for .styleSheet works fine
 * Setting complex properties in cssText will SOMETIMES allow child properties
   to be unset
   set         unset              FF2  FF3  S3.1  IE6  IE7  Op9.27  Op9.5
   ----------  -----------------  ---  ---  ----  ---  ---  ------  -----
   border      -top               NO   NO   YES   YES  YES  YES     YES
               -top-color         NO   NO   YES             YES     YES
               -color             NO   NO   NO              NO      NO
   background  -color             NO   NO   YES             YES     YES
               -position          NO   NO   YES             YES     YES
               -position-x        NO   NO   NO              NO      NO
   font        line-height        YES  YES  NO    NO   NO   NO      YES
               -style             YES  YES  NO              YES     YES
               -size              YES  YES  NO              YES     YES
               -size-adjust       ???  ???  n/a   n/a  n/a  ???     ???
   padding     -top               NO   NO   YES             YES     YES
   margin      -top               NO   NO   YES             YES     YES
   list-style  -type              YES  YES  YES             YES     YES
               -position          YES  YES  YES             YES     YES
   overflow    -x                 NO   NO   YES             n/a     YES

   ??? - unsetting font-size-adjust has the same effect as unsetting font-size
*/



}, '@VERSION@' );
