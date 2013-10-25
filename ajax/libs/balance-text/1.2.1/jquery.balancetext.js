/*
 * Copyright (c) 2012 Adobe Systems Incorporated. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License. *
 */
/**
 * jquery.balancetext.js
 *
 * Author: Randy Edmunds
 */

/*jslint vars: true, plusplus: true, devel: true, browser: true, nomen: true, indent: 4, maxerr: 50 */
/*global jQuery, $ */

(function ($) {
    "use strict";

    var style = document.documentElement.style,
        hasTextWrap = (style.textWrap || style.WebkitTextWrap || style.MozTextWrap || style.MsTextWrap || style.OTextWrap);

    function NextWS_params() {
        this.reset();
    }
    NextWS_params.prototype.reset = function () {
        this.index = 0;
        this.width = 0;
    };

    /**
     * Returns true iff c is an HTML space character.
     */
    var isWS = function (c) {
        return Boolean(c.match(/^\s$/));
    };

    var removeTags = function ($el) {
        $el.find('br[data-owner="balance-text"]').replaceWith(document.createTextNode(" "));
        var $span = $el.find('span[data-owner="balance-text"]');
        if ($span.length > 0) {
            var txt = "";
            $span.each(function () {
                txt += $(this).text();
                $(this).remove();
            });
            $el.html(txt);
        }
    };

    /**
     * Checks to see if we should justify the balanced text with the 
     * element based on the textAlign property in the computed CSS
     * 
     * @param $el        - $(element)
     */
    var isJustified = function ($el) {
        style = $el.get(0).currentStyle || window.getComputedStyle($el.get(0), null);
        return (style.textAlign === 'justify');
    };

    /**
     * Add whitespace after words in text to justify the string to
     * the specified size.
     * 
     * @param txt      - text string
     * @param conWidth - container width
     */
    var justify = function ($el, txt, conWidth) {
        txt = $.trim(txt);
        var words = txt.split(' ').length;
        txt = txt + ' ';

        // if we don't have at least 2 words, no need to justify.
        if (words < 2) {
            return txt;
        }

        // Find width of text in the DOM
        var tmp = $('<span></span>').html(txt);
        $el.append(tmp);
        var size = tmp.width();
        tmp.remove();

        // Figure out our word spacing and return the element
        var wordSpacing = Math.floor((conWidth - size) / (words - 1));
        tmp.css('word-spacing', wordSpacing + 'px')
            .attr('data-owner', 'balance-text');

        return $('<div></div>').append(tmp).html();
    };

    /**
     * In the current simple implementation, an index i is a break
     * opportunity in txt iff it is 0, txt.length, or the
     * index of a non-whitespace char immediately preceded by a
     * whitespace char.  (Thus, it doesn't honour 'white-space' or
     * any Unicode line-breaking classes.)
     *
     * @precondition 0 <= index && index <= txt.length
     */
    var isBreakOpportunity = function (txt, index) {
        return ((index === 0) || (index === txt.length) ||
                (isWS(txt.charAt(index - 1)) && !isWS(txt.charAt(index))));
    };

    /**
     * Finds the first break opportunity (@see isBreakOpportunity)
     * in txt that's both after-or-equal-to index c in the direction dir
     * and resulting in line width equal to or past clamp(desWidth,
     * 0, conWidth) in direction dir.  Sets ret.index and ret.width
     * to the corresponding index and line width (from the start of
     * txt to ret.index).
     *
     * @param $el      - $(element)
     * @param txt      - text string
     * @param conWidth - container width
     * @param desWidth - desired width
     * @param dir      - direction (-1 or +1)
     * @param c        - char index (0 <= c && c <= txt.length)
     * @param ret      - return object; index and width of previous/next break
     *
     */
    var findBreakOpportunity = function ($el, txt, conWidth, desWidth, dir, c, ret) {
        var w;

        for(;;) {
            while (!isBreakOpportunity(txt, c)) {
                c += dir;
            }

            $el.text(txt.substr(0, c));
            w = $el.width();

            if ((dir < 0)
                    ? ((w <= desWidth) || (w <= 0) || (c === 0))
                    : ((desWidth <= w) || (conWidth <= w) || (c === txt.length))) {
                break;
            }
            c += dir;
        }
        ret.index = c;
        ret.width = w;
    };

    $.fn.balanceText = function () {
        if (hasTextWrap) {
            // browser supports text-wrap, so do nothing
            return this;
        }

        return this.each(function () {
            var $this = $(this);

            // In a lower level language, this algorithm takes time
            // comparable to normal text layout other than the fact
            // that we do two passes instead of one, so we should
            // be able to do without this limit.
            var maxTextWidth = 5000;

            removeTags($this);                        // strip balance-text tags
            var containerWidth = $this.width();
            var containerHeight = $this.height();

            // save settings
            var oldWS = $this.css('white-space');
            var oldFloat = $this.css('float');
            var oldDisplay = $this.css('display');
            var oldPosition = $this.css('position');

            // temporary settings
            $this.css({
                'white-space': 'nowrap',
                'float': 'none',
                'display': 'inline',
                'position': 'static'
            });

            var nowrapWidth = $this.width();
            var nowrapHeight = $this.height();

            // An estimate of the average line width reduction due
            // to trimming trailing space that we expect over all
            // lines other than the last.
            var guessSpaceWidth = ((oldWS === 'pre-wrap') ? 0 : nowrapHeight / 4);

            if (containerWidth > 0 &&                  // prevent divide by zero
                    nowrapWidth > containerWidth &&    // text is more than 1 line
                    nowrapWidth < maxTextWidth) {      // text is less than arbitrary limit (make this a param?)

                var remainingText = $this.text();
                var newText = "";
                var lineText = "";
                var shouldJustify = isJustified($this);
                var totLines = Math.round(containerHeight / nowrapHeight);
                var remLines = totLines;

                // Determine where to break:
                while (remLines > 1) {

                    var desiredWidth = Math.round((nowrapWidth + guessSpaceWidth)
                                                  / remLines
                                                  - guessSpaceWidth);

                    // Guessed char index
                    var guessIndex = Math.round((remainingText.length + 1) / remLines) - 1;

                    var le = new NextWS_params();

                    // Find a breaking space somewhere before (or equal to) desired width,
                    // not necessarily the closest to the desired width.
                    findBreakOpportunity($this, remainingText, containerWidth, desiredWidth, -1, guessIndex, le);

                    // Find first breaking char after (or equal to) desired width.
                    var ge = new NextWS_params();
                    guessIndex = le.index;
                    findBreakOpportunity($this, remainingText, containerWidth, desiredWidth, +1, guessIndex, ge);

                    // Find first breaking char before (or equal to) desired width.
                    le.reset();
                    guessIndex = ge.index;
                    findBreakOpportunity($this, remainingText, containerWidth, desiredWidth, -1, guessIndex, le);

                    // Find closest string to desired length
                    var splitIndex;
                    if (le.index === 0) {
                        splitIndex = ge.index;
                    } else if ((containerWidth < ge.width) || (le.index === ge.index)) {
                        splitIndex = le.index;
                    } else {
                        splitIndex = ((Math.abs(desiredWidth - le.width) < Math.abs(ge.width - desiredWidth))
                                           ? le.index
                                           : ge.index);
                    }

                    // Break string
                    lineText = remainingText.substr(0, splitIndex);
                    if (shouldJustify) {
                        newText += justify($this, lineText, containerWidth);
                    } else {
                        newText += lineText;
                        newText += '<br data-owner="balance-text" />';
                    }
                    remainingText = remainingText.substr(splitIndex);

                    // update counters
                    remLines--;
                    $this.text(remainingText);
                    nowrapWidth = $this.width();
                }

                if (shouldJustify) {
                    $this.html(newText + justify($this, remainingText, containerWidth));
                } else {
                    $this.html(newText + remainingText);
                }
            }

            // restore settings
            $this.css({
                'position': oldPosition,
                'display': oldDisplay,
                'float': oldFloat,
                'white-space': oldWS
            });
        });
    };


    // Call the balanceText plugin on the elements with "balance-text" class. When a browser
    // has native support for the text-wrap property, the text balanceText plugin will let
    // the browser handle it natively, otherwise it will apply its own text balancing code.
    function applyBalanceText() {
        $(".balance-text").balanceText();
    }

    applyBalanceText();

    // Reapply on resize
    $(window).resize(applyBalanceText);

}(jQuery));
