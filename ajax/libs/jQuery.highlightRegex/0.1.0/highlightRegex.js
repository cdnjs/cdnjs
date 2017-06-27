/*
 * jQuery Highlight Regex Plugin v0.1.0
 *
 * Based on highlight v3 by Johann Burkard
 * http://johannburkard.de/blog/programming/javascript/highlight-javascript-text-higlighting-jquery-plugin.html
 *
 * (c) 2009-10 Jacob Rothstein
 * MIT license
 */

;(function($) {
    var normalize = function(node) {
        if (!( node && node.childNodes )) return;

        var children = $.makeArray(node.childNodes), prevTextNode = null;
        $.each (children, function(i, child) {
            if (child.nodeType === 3) {
                if (child.nodeValue === "") {
                    node.removeChild(child)
                } else if (prevTextNode !== null) {
                    prevTextNode.nodeValue += child.nodeValue;
                    node.removeChild(child);
                } else { prevTextNode = child; }
            } else {
                prevTextNode = null
                if (child.childNodes) normalize(child)
            }
        })

    }

    $.fn.highlightRegex = function(regex) {
        if (typeof regex === 'undefined' || regex.source === '') {
            $(this).find('span.highlight').each(function() {
                $(this).replaceWith($(this).text());
                normalize ($(this).parent().get(0));
            });
        } else {
            $(this).each(function() {
                var elt = $(this).get(0)

                normalize(elt)

                $.each($.makeArray(elt.childNodes), function(i, searchnode){
                    var spannode, middlebit, middleclone, pos, match, parent;
                    normalize(searchnode)

                    if(searchnode.nodeType == 3) {
                        while (searchnode.data && (pos = searchnode.data.search(regex)) >= 0) {

                            match = searchnode.data.slice(pos).match(regex)[0];

                            if (match.length > 0) {
                                spannode = document.createElement('span');
                                spannode.className = 'highlight';

                                parent      = searchnode.parentNode;
                                middlebit   = searchnode.splitText(pos);
                                searchnode  = middlebit.splitText(match.length);
                                middleclone = middlebit.cloneNode(true);

                                spannode.appendChild(middleclone);
                                parent.replaceChild(spannode, middlebit);

                            } else break;
                        }
                    } else {
                        $(searchnode).highlightRegex(regex);
                    }
                })
                    })
                }
        return $(this);
    }
})(jQuery);
