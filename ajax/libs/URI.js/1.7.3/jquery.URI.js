/*!
 * URI.js - Mutating URLs
 * jQuery Plugin
 *
 * Version: 1.7.3
 *
 * Author: Rodney Rehm
 * Web: http://medialize.github.com/URI.js/jquery-uri-plugin.html
 *
 * Licensed under
 *   MIT License http://www.opensource.org/licenses/mit-license
 *   GPL v3 http://opensource.org/licenses/GPL-3.0
 *
 */

(function($, undefined){

var URI = typeof module !== "undefined" && module.exports
    ? require('./URIjs')
    : window.URI;

function escapeRegEx(string) {
    // https://github.com/medialize/URI.js/commit/85ac21783c11f8ccab06106dba9735a31a86924d#commitcomment-821963
    return string.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
}

function getUriProperty(elem) {
    var property;
    
    // Note: IE9 will report img.href, so check img.src first (Issue #48)
    $.each(['src', 'href', 'action'], function(k, v) {
        if (v in elem ) {
            property = v;
            return false;
        }
    
        return true;
    });
    
    // compensate ambiguous <input>
    if (elem.nodeName.toLowerCase() === 'input' && elem.type !== 'image') {
        return undefined;
    }
    
    return property;
}

var pseudo = /^([a-zA-Z]+)\s*([\^\$*]?=|:)\s*(['"]?)(.+)\3|^\s*([a-zA-Z0-9]+)\s*$/,
    comparable = {},
    // https://developer.mozilla.org/en/CSS/Attribute_selectors
    compare = {
        // equals 
        '=': function(value, target) {
            return value === target;
        },
        // ~= translates to value.match((?:^|\s)target(?:\s|$)) which is useless for URIs
        // |= translates to value.match((?:\b)target(?:-|\s|$)) which is useless for URIs
        // begins with
        '^=': function(value, target, property) {
            return !!(value + "").match(new RegExp('^' + escapeRegEx(target), 'i'));
        },
        // ends with
        '$=': function(value, target, property) {
            return !!(value + "").match(new RegExp(escapeRegEx(target) + '$', 'i'));
        },
        // contains
        '*=': function(value, target, property) {
            if (property == 'directory') {
                // add trailing slash so /dir/ will match the deep-end as well
                value += '/';
            }
            
            return !!(value + "").match(new RegExp(escapeRegEx(target), 'i'));
        },
        'equals:': function(uri, target) {
            return uri.equals(target);
        },
        'is:': function(uri, target) {
            return uri.is(target);
        }
    },
    generateAccessor = function(property) {
        return {
            get: function(elem) {
                return $(elem).uri()[property]();
            },
            set: function(elem, value) {
                $(elem).uri()[property](value);
                return value;
            }
        };
    };

// populate lookup table and register $.attr('uri:accessor') handlers
$.each('authority directory domain filename fragment hash host hostname href password path pathname port protocol query scheme search subdomain suffix tld username'.split(" "), function(k, v) {
    comparable[v] = true;
    $.attrHooks['uri:' + v] = generateAccessor(v);
});

// general URI accessor
$.fn.uri = function(uri) {
    var $this = this.first(),
        elem = $this.get(0),
        property = getUriProperty(elem);
    
    if (!property) {
        throw new Error('Element "' + elem.nodeName + '" does not have either property: href, src, action');
    }
    
    if (uri !== undefined) {
        var old = $this.data('uri');
        if (old) {
            return old.href(uri);
        }
        
        if (!(uri instanceof URI)) {
            uri = URI(uri);
        }
    } else {
        uri = $this.data('uri');
        if (uri) {
            return uri;
        } else {
    		uri = URI($this.attr(property));
        }
    }
    
    uri._dom_element = elem;
    uri._dom_attribute = property;
    uri.normalize();
    $this.data('uri', uri);
    return uri;
};

// overwrite URI.build() to update associated DOM element if necessary
URI.prototype.build = function(deferBuild) {
    if (this._dom_element) {
        // cannot defer building when hooked into a DOM element
        this._string = URI.build(this._parts);
        this._deferred_build = false;
        this._dom_element.setAttribute(this._dom_attribute, this._string);
        this._dom_element[this._dom_attribute] = this._string;
    } else if (deferBuild === true) {
        this._deferred_build = true;
    } else if (deferBuild === undefined || this._deferred_build) {
        this._string = URI.build(this._parts);
        this._deferred_build = false;
    }
    
    return this;
};

// :uri() pseudo-selector for $.find(), $.filter() $.is(), et al.
$.expr.filters.uri = function(elem, index, matches) {
    // documentation on this is scarce, look into
    //  - https://github.com/jquery/sizzle/wiki/Sizzle-Home
    //  - https://github.com/jquery/sizzle/blob/master/sizzle.js#L626

    // skip anything without src|href|action and bad :uri() syntax
    if (!getUriProperty(elem) || !matches[3]) {
        return false;
    }
    
    var t = matches[3].match(pseudo),
        property,
        uri;

    if (!t || (!t[5] && t[2] !== ':' && !compare[t[2]])) {
        // abort because the given selector cannot be executed
        // filers seem to fail silently
        return false;
    }

    uri = $(elem).uri();
    
    if (t[5]) {
        return uri.is(t[5]);
    } else if (t[2] === ':') {
        property = t[1].toLowerCase() + ':';
        if (!compare[property]) {
            // filers seem to fail silently
            return false;
        }
        
        return compare[property](uri, t[4]);
    } else {
        property = t[1].toLowerCase();
        if (!comparable[property]) {
            // filers seem to fail silently
            return false;
        }
        
        return compare[t[2]](uri[property](), t[4], property);
    }

    return false;
};

// pipe $.attr('src') and $.attr('href') through URI.js
var _attrHooks = {
    get: function(elem) {
        return $(elem).uri();
    },
    set: function(elem, value) {
        return $(elem).uri().href(value).toString();
    }
};
$.each(['src', 'href', 'action', 'uri'], function(k, v) {
    $.attrHooks[v] = {
        set: _attrHooks.set
    };
});
$.attrHooks.uri.get = _attrHooks.get;


})(jQuery);