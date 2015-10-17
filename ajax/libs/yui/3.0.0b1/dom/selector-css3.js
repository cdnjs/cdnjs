YUI.add('selector-css3', function(Y) {

/*
    an+b = get every _a_th node starting at the _b_th
    0n+b = no repeat ("0" and "n" may both be omitted (together) , e.g. "0n+1" or "1", not "0+1"), return only the _b_th element
    1n+b =  get every element starting from b ("1" may may be omitted, e.g. "1n+0" or "n+0" or "n")
    an+0 = get every _a_th element, "0" may be omitted 
*/

Y.Selector._reNth = /^(?:([-]?\d*)(n){1}|(odd|even)$)*([-+]?\d*)$/;

Y.Selector._getNth = function(node, expr, tag, reverse) {
    Y.Selector._reNth.test(expr);
    var a = parseInt(RegExp.$1, 10), // include every _a_ elements (zero means no repeat, just first _a_)
        n = RegExp.$2, // "n"
        oddeven = RegExp.$3, // "odd" or "even"
        b = parseInt(RegExp.$4, 10) || 0, // start scan from element _b_
        result = [],
        op;

    var siblings = node.parentNode.children || Y.Selector._children(node.parentNode); 
    if (oddeven) {
        a = 2; // always every other
        op = '+';
        n = 'n';
        b = (oddeven === 'odd') ? 1 : 0;
    } else if ( isNaN(a) ) {
        a = (n) ? 1 : 0; // start from the first or no repeat
    }

    if (a === 0) { // just the first
        if (reverse) {
            b = siblings.length - b + 1; 
        }

        if (siblings[b - 1] === node) {
            return true;
        } else {
            return false;
        }

    } else if (a < 0) {
        reverse = !!reverse;
        a = Math.abs(a);
    }

    if (!reverse) {
        for (var i = b - 1, len = siblings.length; i < len; i += a) {
            if ( i >= 0 && siblings[i] === node ) {
                return true;
            }
        }
    } else {
        for (var i = siblings.length - b, len = siblings.length; i >= 0; i -= a) {
            if ( i < len && siblings[i] === node ) {
                return true;
            }
        }
    }
    return false;
};

Y.mix(Y.Selector.pseudos, {
    'root': function(node) {
        return node === node.ownerDocument.documentElement;
    },

    'nth-child': function(node, m) {
        return Y.Selector._getNth(node, m[1]);
    },

    'nth-last-child': function(node, m) {
        return Y.Selector._getNth(node, m[1], null, true);
    },

    'nth-of-type': function(node, m) {
        return Y.Selector._getNth(node, m[1], node.tagName);
    },
     
    'nth-last-of-type': function(node, m) {
        return Y.Selector._getNth(node, m[1], node.tagName, true);
    },
     
    'last-child': function(node) {
        var children = node.parentNode.children || Y.Selector._children(node.parentNode);
        return children[children.length - 1] === node;
    },

    'first-of-type': function(node) {
        return Y.DOM._childrenByTag(node.parentNode, node.tagName)[0];
    },
     
    'last-of-type': function(node) {
        var children = Y.DOM._childrenByTag(node.parentNode, node.tagName);
        return children[children.length - 1];
    },
     
    'only-child': function(node) {
        var children = node.parentNode.children || Y.Selector._children(node.parentNode);
        return children.length === 1 && children[0] === node;
    },

    'only-of-type': function(node) {
        return Y.DOM._childrenByTag(node.parentNode, node.tagName).length === 1;
    },

    'empty': function(node) {
        return node.childNodes.length === 0;
    },

    'not': function(node, m) {
        return !Y.Selector.test(node, m[1]);
    },

    'contains': function(node, m) {
        var text = node.innerText || node.textContent || '';
        return text.indexOf(m[1]) > -1;
    },

    'checked': function(node) {
        return node.checked === true;
    }
});

Y.mix(Y.Selector.operators, {
    '^=': '^{val}', // Match starts with value
    '$=': '{val}$', // Match ends with value
    '*=': '{val}' // Match contains value as substring 
});

Y.Selector.combinators['~'] = function(node, token) {
    var sib = node.previousSibling;
    while (sib) {
        if (sib.nodeType === 1 && Y.Selector._testToken(sib, null, null, token.previous)) {
            return true;
        }
        sib = sib.previousSibling;
    }

    return false;
}


}, '@VERSION@' ,{requires:['dom-base', 'selector'], skinnable:false});
