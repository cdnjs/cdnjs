/* ===========================================================
 * trumbowyg.cleanpaste.js v1.0
 * Font Clean paste plugin for Trumbowyg
 * http://alex-d.github.com/Trumbowyg
 * ===========================================================
 * Authors : Eric Radin
 *           Todd Graham (slackwalker)
 *
 * This plugin will perform a "cleaning" on any paste, in particular
 * it will clean pasted content of microsoft word document tags and classes.
 */

(function ($) {
    'use strict';

    function checkValidTags(snippet) {
        var theString = snippet;

        // Replace uppercase element names with lowercase
        theString = theString.replace(/<[^> ]*/g, function (match) {
            return match.toLowerCase();
        });

        // Replace uppercase attribute names with lowercase
        theString = theString.replace(/<[^>]*>/g, function (match) {
            match = match.replace(/ [^=]+=/g, function (match2) {
                return match2.toLowerCase();
            });
            return match;
        });

        // Put quotes around unquoted attributes
        theString = theString.replace(/<[^>]*>/g, function (match) {
            match = match.replace(/( [^=]+=)([^"][^ >]*)/g, '$1\"$2\"');
            return match;
        });

        return theString;
    }

    function cleanIt(html) {
        // first make sure all tags and attributes are made valid
        html = checkValidTags(html);

        // Replace opening bold tags with strong
        html = html.replace(/<b(\s+|>)/g, '<strong$1');
        // Replace closing bold tags with closing strong
        html = html.replace(/<\/b(\s+|>)/g, '</strong$1');

        // Replace italic tags with em
        html = html.replace(/<i(\s+|>)/g, '<em$1');
        // Replace closing italic tags with closing em
        html = html.replace(/<\/i(\s+|>)/g, '</em$1');

        // strip out comments -cgCraft
        html = html.replace(/<!(?:--[\s\S]*?--\s*)?>\s*/g, '');

        // strip out &nbsp; -cgCraft
        html = html.replace(/&nbsp;/gi, ' ');
        // strip out extra spaces -cgCraft
        html = html.replace(/ <\//gi, '</');

        // Remove multiple spaces
        html.replace(/\s+/g, ' ');

        // strip &nbsp; -cgCraft
        html = html.replace(/^\s*|\s*$/g, '');

        // Strip out unaccepted attributes
        html = html.replace(/<[^>]*>/g, function (match) {
            match = match.replace(/ ([^=]+)="[^"]*"/g, function (match2, attributeName) {
                if (['alt', 'href', 'src', 'title'].indexOf(attributeName) !== -1) {
                    return match2;
                }
                return '';
            });
            return match;
        });

        // Final clean out for MS Word crud
        html = html.replace(/<\?xml[^>]*>/g, '');
        html = html.replace(/<[^ >]+:[^>]*>/g, '');
        html = html.replace(/<\/[^ >]+:[^>]*>/g, '');

        // remove unwanted tags
        html = html.replace(/<(div|span|style|meta|link).*?>/gi, '');

        return html;
    }

    // clean editor
    // this will clean the inserted contents
    // it does a compare, before and after paste to determine the
    // pasted contents
    $.extend(true, $.trumbowyg, {
        plugins: {
            cleanPaste: {
                init: function (trumbowyg) {
                    trumbowyg.pasteHandlers.push(function (pasteEvent) {
                        setTimeout(function () {
                            try {
                                trumbowyg.saveRange();

                                var clipboardData = (pasteEvent.originalEvent || pasteEvent).clipboardData,
                                pastedData = clipboardData.getData('Text'),
                                node = trumbowyg.doc.getSelection().focusNode,
                                range = trumbowyg.doc.createRange(),
                                cleanedPaste = cleanIt(pastedData.trim()),
                                newNode = $(cleanedPaste)[0] || trumbowyg.doc.createTextNode(cleanedPaste);

                                if (trumbowyg.$ed.html() === '') {
                                    // simply append if there is no content in editor
                                    trumbowyg.$ed[0].appendChild(newNode);
                                } else {
                                    // insert pasted content behind last focused node
                                    range.setStartAfter(node);
                                    range.setEndAfter(node);
                                    trumbowyg.doc.getSelection().removeAllRanges();
                                    trumbowyg.doc.getSelection().addRange(range);

                                    trumbowyg.range.insertNode(newNode);
                                }

                                // now set cursor right after pasted content
                                range = trumbowyg.doc.createRange();
                                range.setStartAfter(newNode);
                                range.setEndAfter(newNode);
                                trumbowyg.doc.getSelection().removeAllRanges();
                                trumbowyg.doc.getSelection().addRange(range);

                                // prevent defaults
                                pasteEvent.stopPropagation();
                                pasteEvent.preventDefault();

                                // save new node as focused node
                                trumbowyg.saveRange();
                                trumbowyg.syncCode();
                                trumbowyg.$c.trigger('tbwchange');
                            } catch (c) {
                            }
                        }, 0);
                    });
                }
            }
        }
    });
})(jQuery);
