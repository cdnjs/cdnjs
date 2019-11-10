/* ===========================================================
 * trumbowyg.cleanpaste.js v1.0
 * Font Clean paste plugin for Trumbowyg
 * http://alex-d.github.com/Trumbowyg
 * ===========================================================
 * Author : Eric Radin
 */

/**
 * This plugin will perform a "cleaning" on any paste, in particular
 * it will clean pasted content of microsoft word document tags and classes.
 */
(function ($) {
    'use strict';

    function reverse(sentString) {
        var theString = '';
        for (var i = sentString.length - 1; i >= 0; i -= 1) {
            theString += sentString.charAt(i);
        }
        return theString;
    }

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

    function cleanIt(htmlBefore, htmlAfter) {
        var matchedHead = '';
        var matchedTail = '';
        var afterStart;
        var afterFinish;
        var newSnippet;
        var minLength = Math.min(htmlBefore.length, htmlAfter.length);

        // we need to extract the inserted block
        for (afterStart = 0; htmlAfter.charAt(afterStart) === htmlBefore.charAt(afterStart) && afterStart <= minLength; afterStart += 1) {
            matchedHead += htmlAfter.charAt(afterStart);
        }

        // If afterStart is inside a HTML tag, move to opening brace of tag
        for (var i = afterStart; i >= 0; i -= 1) {
            if (htmlBefore.charAt(i) === '<') {
                afterStart = i;
                matchedHead = htmlBefore.substring(0, afterStart);
                break;
            } else if (htmlBefore.charAt(i) === '>') {
                break;
            }
        }

        // now reverse string and work from the end in
        htmlAfter = reverse(htmlAfter);
        htmlBefore = reverse(htmlBefore);

        // Find end of both strings that matches
        for (afterFinish = 0; htmlAfter.charAt(afterFinish) === htmlBefore.charAt(afterFinish) && afterFinish <= minLength; afterFinish += 1) {
            matchedTail += htmlAfter.charAt(afterFinish);
        }

        // If afterFinish is inside a HTML tag, move to closing brace of tag
        for (var j = afterFinish; j >= 0; j -= 1) {
            if (htmlBefore.charAt(j) === '>') {
                afterFinish = j;
                matchedTail = htmlBefore.substring(0, afterFinish);
                break;
            } else if (htmlBefore.charAt(j) === '<') {
                break;
            }
        }

        matchedTail = reverse(matchedTail);

        // If there's no difference in pasted content
        if (afterStart === (htmlAfter.length - afterFinish)) {
            return false;
        }

        htmlAfter = reverse(htmlAfter);
        newSnippet = htmlAfter.substring(afterStart, htmlAfter.length - afterFinish);

        // first make sure all tags and attributes are made valid
        newSnippet = checkValidTags(newSnippet);

        // Replace opening bold tags with strong
        newSnippet = newSnippet.replace(/<b(\s+|>)/g, '<strong$1');
        // Replace closing bold tags with closing strong
        newSnippet = newSnippet.replace(/<\/b(\s+|>)/g, '</strong$1');

        // Replace italic tags with em
        newSnippet = newSnippet.replace(/<i(\s+|>)/g, '<em$1');
        // Replace closing italic tags with closing em
        newSnippet = newSnippet.replace(/<\/i(\s+|>)/g, '</em$1');

        // strip out comments -cgCraft
        newSnippet = newSnippet.replace(/<!(?:--[\s\S]*?--\s*)?>\s*/g, '');

        // strip out &nbsp; -cgCraft
        newSnippet = newSnippet.replace(/&nbsp;/gi, ' ');
        // strip out extra spaces -cgCraft
        newSnippet = newSnippet.replace(/ <\//gi, '</');

        while (newSnippet.indexOf('  ') !== -1) {
            var anArray = newSnippet.split('  ');
            newSnippet = anArray.join(' ');
        }

        // strip &nbsp; -cgCraft
        newSnippet = newSnippet.replace(/^\s*|\s*$/g, '');

        // Strip out unaccepted attributes
        newSnippet = newSnippet.replace(/<[^>]*>/g, function (match) {
            match = match.replace(/ ([^=]+)="[^"]*"/g, function (match2, attributeName) {
                if (['alt', 'href', 'src', 'title'].indexOf(attributeName) !== -1) {
                    return match2;
                }
                return '';
            });
            return match;
        });

        // Final cleanout for MS Word crud
        newSnippet = newSnippet.replace(/<\?xml[^>]*>/g, '');
        newSnippet = newSnippet.replace(/<[^ >]+:[^>]*>/g, '');
        newSnippet = newSnippet.replace(/<\/[^ >]+:[^>]*>/g, '');

        // remove unwanted tags
        newSnippet = newSnippet.replace(/<(div|span|style|meta|link){1}.*?>/gi, '');

        htmlAfter = matchedHead + newSnippet + matchedTail;
        return htmlAfter;
    }

    // clean editor
    // this will clean the inserted contents
    // it does a compare, before and after paste to determine the
    // pasted contents
    $.extend(true, $.trumbowyg, {
        plugins: {
            cleanPaste: {
                init: function (trumbowyg) {
                    trumbowyg.pasteHandlers.push(function () {
                        try {
                            var contentBefore = trumbowyg.$ed.html();
                            setTimeout(function () {
                                var contentAfter = trumbowyg.$ed.html();
                                contentAfter = cleanIt(contentBefore, contentAfter);
                                trumbowyg.$ed.html(contentAfter);
                            }, 0);
                        } catch (c) {
                        }
                    });
                }
            }
        }
    });
})(jQuery);


