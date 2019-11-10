//   _______    ________  _______    ______   ______   ______   _________
// /_______/\  /_______/\/______/\  /_____/\ /_____/\ /_____/\ /________/\
// \::: _  \ \ \__.::._\/\::::__\/__\::::_\/_\:::_ \ \\:::_ \ \\__.::.__\/
//  \::(_)  \/_   \::\ \  \:\ /____/\\:\/___/\\:\ \ \ \\:\ \ \ \  \::\ \
//   \::  _  \ \  _\::\ \__\:\\_  _\/ \:::._\/ \:\ \ \ \\:\ \ \ \  \::\ \
//    \::(_)  \ \/__\::\__/\\:\_\ \ \  \:\ \    \:\_\ \ \\:\_\ \ \  \::\ \
//     \_______\/\________\/ \_____\/   \_\/     \_____\/ \_____\/   \__\/
//         _________________________________________________________________
//        /________________________________________________________________/\
//        \________________________________________________________________\/

// PURPOSE -----
// Looks through the page's markup to identify footnote links/ content.
// It then creates footnote buttons in place of the footnote links and hides the content.
// Finally, creates and positions footnotes when the generated buttons are pressed.

// IN ----------
// An optional object literal specifying script settings.

// OUT ---------
// Returns an object with the following methods:
// close: closes footnotes matching the jQuery selector passed to the function.
// activate: activates the footnote button matching the jQuery selector passed to the function.

// INFO --------
// Developed and maintained by Chris Sauve (http://pxldot.com)
// Documentation, license, and other information can be found at http://cmsauve.com/projects/bigfoot.

// TODO --------
// - Better handling of hover
// - Ability to position/ size popover relative to a containing element (rather than the window)
// - Update numbered style to handle more than 9 footnotes
// - A new property to normalize the popover text size for a zoom
// - Make button use actual `button` element instead of `a`
// - Prevent bottom popovers from covering the popover button



(function($) {

    $.bigfoot = function(options) {


        //  ______   ______   _________  _________  ________  ___   __    _______    ______
        // /_____/\ /_____/\ /________/\/________/\/_______/\/__/\ /__/\ /______/\  /_____/\
        // \::::_\/_\::::_\/_\__.::.__\/\__.::.__\/\__.::._\/\::\_\\  \ \\::::__\/__\::::_\/_
        //  \:\/___/\\:\/___/\  \::\ \     \::\ \     \::\ \  \:. `-\  \ \\:\ /____/\\:\/___/\
        //   \_::._\:\\::___\/_  \::\ \     \::\ \    _\::\ \__\:. _    \ \\:\\_  _\/ \_::._\:\
        //     /____\:\\:\____/\  \::\ \     \::\ \  /__\::\__/\\. \`-\  \ \\:\_\ \ \   /____\:\
        //     \_____\/ \_____\/   \__\/      \__\/  \________\/ \__\/ \__\/ \_____\/   \_____\/
        //

        var bigfoot;

        var settings = $.extend(
            {
                actionOriginalFN    : "hide", // "delete", "hide", or "ignore"
                activateCallback    : function() {},
                activateOnHover     : false,
                allowMultipleFN     : false,
                breakpoints         : {},
                deleteOnUnhover     : false,
                hoverDelay          : 250,
                maxWidthRelativeTo  : undefined,
                numberResetSelector : undefined,
                popoverDeleteDelay  : 300,
                popoverCreateDelay  : 100,
                positionContent     : true,
                preventPageScroll   : true,
                scope               : false,
                useFootnoteOnlyOnce : true,

                contentMarkup       : "<aside class=\"footnote-content bottom\"" +
                                            "data-footnote-number=\"{{FOOTNOTENUM}}\" " +
                                            "data-footnote-identifier=\"{{FOOTNOTEID}}\" " +
                                            "alt=\"Footnote {{FOOTNOTENUM}}\">" +
                                                "<div class=\"footnote-main-wrapper\">" +
                                                    "<div class=\"footnote-content-wrapper\">" +
                                                        "{{FOOTNOTECONTENT}}" +
                                                "</div></div>" +
                                            "<div class=\"bigfoot-tooltip\"></div>" +
                                        "</aside>",

                buttonMarkup        :   "<div class='footnote-container'>" +
                                        "<a href=\"#\" class=\"footnote-button\" " +
                                            "id=\"{{SUP:data-footnote-backlink-ref}}\" " +
                                            "data-footnote-number=\"{{FOOTNOTENUM}}\" " +
                                            "data-footnote-identifier=\"{{FOOTNOTEID}}\" " +
                                            "alt=\"See Footnote {{FOOTNOTENUM}}\" " +
                                            "rel=\"footnote\"" +
                                            "data-footnote-content=\"{{FOOTNOTECONTENT}}\">" +
                                                "<span class=\"footnote-circle\" data-footnote-number=\"{{FOOTNOTENUM}}\"></span>" +
                                                "<span class=\"footnote-circle\"></span>" +
                                                "<span class=\"footnote-circle\"></span>" +
                                        "</a></div>"
            }, options);

        var popoverStates = {};



        //  ________  ___   __     ________  _________
        // /_______/\/__/\ /__/\  /_______/\/________/\
        // \__.::._\/\::\_\\  \ \ \__.::._\/\__.::.__\/
        //    \::\ \  \:. `-\  \ \   \::\ \    \::\ \
        //    _\::\ \__\:. _    \ \  _\::\ \__  \::\ \
        //   /__\::\__/\\. \`-\  \ \/__\::\__/\  \::\ \
        //   \________\/ \__\/ \__\/\________\/   \__\/
        //


        // FUNCTION ----
        // Footnote button/ content initializer (run on doc.ready)

        // PURPOSE -----
        // Finds the likely footnote links and then uses their target to find the content

        var footnoteInit = function() {

            // Get all of the possible footnote links
            var footnoteButtonSearchQuery;
            footnoteButtonSearchQuery = !settings.scope ? "a[href*=\"#\"]" : settings.scope + " a[href*=\"#\"]";

            // Filter down to links that:
            // - have an HREF referencing a footnote, OR
            // - have a rel attribute of footnote
            // AND that aren't a descendant of a footnote (prevents backlinks)
            var $footnoteAnchors = $(footnoteButtonSearchQuery).filter(function() {
                var $this = $(this);
                var relAttr = $this.attr("rel");
                if(!relAttr || relAttr == "null") {
                    relAttr = "";
                }
                return ($this.attr("href") + relAttr).match(/(fn|footnote|note)[:\-_\d]/gi) && $this.closest("[class*=footnote]:not(a):not(sup)").length < 1;
            }); // End of footnote link .filter()

            var footnotes       = [],
                footnoteLinks   = [],
                finalFNLinks    = [],
                relatedFN,
                $closestFootnoteLi,
                $actualFootnoteLi;

            // Resolve issues with superscript/ anchor combination
            cleanFootnoteLinks($footnoteAnchors, footnoteLinks);

            // Get the footnote that the link was pointing to
            $(footnoteLinks).each(function() {
                // escape symbols with special jQuery/ CSS selector meaning
                relatedFN = $(this).attr("data-footnote-ref").replace(/[:.+~*\]\[]/g, "\\$&");
                if(settings.useFootnoteOnlyOnce) relatedFN = relatedFN + ":not(.footnote-processed)";
                $closestFootnoteLi = $(relatedFN).closest("li");

                if($closestFootnoteLi.length > 0) {
                    footnotes.push($closestFootnoteLi.first().addClass("footnote-processed"));
                    finalFNLinks.push(this);
                }
            });

            var $lastResetElement,
                $curResetElement,
                footnoteNum = 1,
                footnoteContent,
                footnoteIDNum,
                $currentLastFootnoteLink,
                $relevantFNLink,
                $relevantFootnote,
                footnoteButton,
                $footnoteButton;

            // If there are already footnote links, look for the last one and set
            // it as the beginning value for the next set of footnotes.
            $currentLastFootnoteLink = $("[data-footnote-identifier]:last");
            if($currentLastFootnoteLink.length > 0) {
                footnoteIDNum = +$currentLastFootnoteLink.data("footnote-identifier");
            } else {
                footnoteIDNum = 0;
            }

            // Initiates the button with the footnote content
            // Also performs the desired action on the original footnotes
            for(var i = 0; i<footnotes.length; i++) {

                // Removes any backlinks and hackily encodes double quotes and >/< symbols to prevent conflicts
                footnoteContent = removeBackLinks($(footnotes[i]).html().trim(), $(finalFNLinks[i])
                                    .data("footnote-backlink-ref")).replace(/"/g, "&quot;")
                                    .replace(/&lt;/g, "&ltsym;").replace(/&gt;/g, "&gtsym;");
                footnoteIDNum += 1;
                footnoteButton = "";
                $relevantFNLink = $(finalFNLinks[i]);
                $relevantFootnote = $(footnotes[i]);

                // Determines whether this is in the same number reset container (as defined in settings)
                // as the last footnote and changes the footnote number accordingly
                if(settings.numberResetSelector) {
                    $curResetElement = $relevantFNLink.closest(settings.numberResetSelector);
                    if($curResetElement.is($lastResetElement)) {
                        footnoteNum += 1;
                    } else {
                        footnoteNum = 1;
                    }
                    $lastResetElement = $curResetElement;
                } else {
                    footnoteNum = footnoteIDNum;
                }

                // Add a paragraph container if the footnote was written directly in the list element
                if(footnoteContent.indexOf("<") !== 0) {
                    footnoteContent = "<p>" + footnoteContent + "</p>";
                }

                // Gives default button markup unless custom one is defined
                // Gets the easy replacements out of the way
                footnoteButton = settings.buttonMarkup.replace(/\{\{FOOTNOTENUM\}\}/g, footnoteNum)
                                    .replace(/\{\{FOOTNOTEID\}\}/g, footnoteIDNum)
                                    .replace(/\{\{FOOTNOTECONTENT\}\}/g, footnoteContent);

                // Handles replacements of SUP/FN attribute requests
                footnoteButton = replaceWithReferenceAttributes(footnoteButton, "SUP", $relevantFNLink);
                footnoteButton = replaceWithReferenceAttributes(footnoteButton, "FN", $relevantFootnote);

                $footnoteButton = $(footnoteButton).insertBefore($relevantFNLink);

                var $parent = $relevantFootnote.parent();
                switch(settings.actionOriginalFN.toLowerCase()) {
                    case "delete":
                        $relevantFNLink.remove();
                        $relevantFootnote.remove();
                        deleteEmptyOrHR($parent);
                        break;
                    case "hide":
                        $relevantFNLink.addClass("footnote-print-only");
                        $relevantFootnote.addClass("footnote-print-only");
                        deleteEmptyOrHR($parent);
                        break;
                    case "ignore":
                        $relevantFNLink.addClass("footnote-print-only");
                        break;
                }
            } // end of loop through footnotes
        };


        // FUNCTION ----
        // cleanFootnoteLinks

        // PURPOSE -----
        // Groups the ID and HREF of a superscript/ anchor tag pair in data attributes
        // This resolves the issue of the href and backlink id being separated between the two elements

        // IN ----------
        // Anchors that link to footnotes

        // OUT ---------
        // Array of top-level emenets with data attributes for combined ID/ HREF

        var cleanFootnoteLinks = function($footnoteAnchors, footnoteLinks) {
            var $supParent,
                $supChild,
                linkHREF,
                linkID;

            // Problem: backlink ID might point to containing superscript of the fn link
            // Solution: Check if there is a superscript and move the href/ ID up to it.
            // The combined id/ href of the sup/a pair are stored in sup using data attributes
            $footnoteAnchors.each(function() {
                var $this = $(this);
                linkHREF = "#" + ($this.attr("href")).split("#")[1]; // just the fragment ID
                $supParent = $this.closest("sup");
                $supChild = $this.find("sup");

                if($supParent.length > 0) {
                    // Assign the link ID to be the parent's and child's combined
                    linkID = ($supParent.attr("id") || "") + ($this.attr("id") || "");
                    footnoteLinks.push(
                        $supParent.attr({
                            "data-footnote-backlink-ref": linkID,
                            "data-footnote-ref": linkHREF
                        })
                    );
                } else if($supChild.length > 0) {
                    linkID = ($supChild.attr("id") || "") + ($this.attr("id") || "");
                    footnoteLinks.push(
                        $this.attr({
                            "data-footnote-backlink-ref": linkID,
                            "data-footnote-ref": linkHREF
                        })
                    );
                } else {
                    // || "" protects against undefined ID's
                    linkID = $this.attr("id") || "";
                    footnoteLinks.push(
                        $this.attr({
                            "data-footnote-backlink-ref": linkID,
                            "data-footnote-ref": linkHREF
                        })
                    );
                }
            });
        };


        // FUNCTION ----
        // deleteEmptyOrHR

        // PURPOSE -----
        // Propogates the decision of deleting/ hiding the original footnotes up the hierarchy,
        // eliminating any empty/ fully-hidden elements containing the footnotes and
        // any horizontal rules used to denote the start of the footnote section

        // IN ----------
        // Container of the footnote that was deleted/ hidden

        // OUT ---------
        // Array of top-level emenets with data attributes for combined ID/ HREF

        var deleteEmptyOrHR = function($el) {

            var $parent;
            // If it has no children or all children have been hidden
            if($el.is(":empty") || $el.children(":not(.footnote-print-only)").length === 0) {
                $parent = $el.parent();
                if(settings.actionOriginalFN.toLowerCase() === "delete") {
                    $el.remove();
                } else {
                    $el.addClass("footnote-print-only");
                }

                // Propogate up to the container element
                deleteEmptyOrHR($parent);

            } else if($el.children(":not(.footnote-print-only)").length == $el.children("hr:not(.footnote-print-only)").length) {

                // If the only child not hidden/ removed is a horizontal rule, remove the entire container
                $parent = $el.parent();
                if(settings.actionOriginalFN.toLowerCase() === "delete") {
                    $el.remove();
                } else {
                    $el.children("hr").addClass("footnote-print-only");
                    $el.addClass("footnote-print-only");
                }

                // Propogate up to the container element
                deleteEmptyOrHR($parent);
            }
        };


        // FUNCTION ----
        // removeBackLinks

        // PURPOSE -----
        // Removes any links from the footnote back to the footnote link
        // as these don't make sense when the footnote is shown inline

        // IN ----------
        // HTML of the footnote possibly containing the backlink and
        // the ID(s) of the footnote link

        // OUT ---------
        // New HTML string with relevant links taken out

        var removeBackLinks = function(footnoteHTML, backlinkID) {

            // First, though, take care of multiple ID's by getting rid of spaces
            if(backlinkID.indexOf(" ") >= 0) {
                backlinkID = backlinkID.trim().replace(/ +/g, "|").replace(/(.*)/g, "($1)");
            }

            // Regex finds the preceding space/ nbsp, the anchor tag and contents
            var regex = new RegExp("(\\s|&nbsp;)*<\\s*a[^#<]*#" + backlinkID + "[^>]*>(.*?)<\\s*/\\s*a>", "g");
            return footnoteHTML.replace(regex, "").replace("[]", "");
        };


        // FUNCTION ----
        // replaceWithReferenceAttributes

        // PURPOSE -----
        // Replaces the reference attributes (encased in {{}}) with the relevant attributes
        // from the desired element; for example, {{SUP:id}} will be replaced with the ID of the
        // superscript element passed as $referenceElement

        // IN ----------
        // String to do replacements on, the reference keyword to look for (i.e., BUTTON or SUP),
        // and the associated element to search through for the identified attribute(s)

        // OUT ---------
        // New string with replacements performed

        var replaceWithReferenceAttributes = function(string, referenceKeyword, $referenceElement) {
            var refRegex = new RegExp("\\{\\{" + referenceKeyword + ":([^\\}]*)\\}\\}", "g"),
                refMatches,
                refReplaceText,
                refReplaceRegex;

            // Performs the regex and does the replacement until it doesn't find any more matches
            refMatches = refRegex.exec(string);
            while (refMatches) {
                // refMatches[1] stores the attribute that is to be matched
                 if(refMatches[1]) {
                    refReplaceText = $referenceElement.attr(refMatches[1]) || "";
                    string = string.replace("{{" + referenceKeyword + ":" + refMatches[1] + "}}", refReplaceText);
                }
                refMatches = refRegex.exec(string);
            }
            return string;
        };



        //  ________   ______  _________  ________  __   __   ________   _________  ______
        // /_______/\ /_____/\/________/\/_______/\/_/\ /_/\ /_______/\ /________/\/_____/\
        // \::: _  \ \\:::__\/\__.::.__\/\__.::._\/\:\ \\ \ \\::: _  \ \\__.::.__\/\::::_\/_
        //  \::(_)  \ \\:\ \  __ \::\ \     \::\ \  \:\ \\ \ \\::(_)  \ \  \::\ \   \:\/___/\
        //   \:: __  \ \\:\ \/_/\ \::\ \    _\::\ \__\:\_/.:\ \\:: __  \ \  \::\ \   \::___\/_
        //    \:.\ \  \ \\:\_\ \ \ \::\ \  /__\::\__/\\ ..::/ / \:.\ \  \ \  \::\ \   \:\____/\
        //     \__\/\__\/ \_____\/  \__\/  \________\/ \___/_(   \__\/\__\/   \__\/    \_____\/
        //


        // FUNCTION ----
        // buttonHover

        // PURPOSE -----
        // To activate the popover of a hovered footnote button
        // Also removes other popovers, if allowMultipleFN is false

        // IN ----------
        // Event that contains the target of the mouseenter event

        var buttonHover = function(e) {
            if(settings.activateOnHover) {
                var $buttonHovered = $(e.target).closest(".footnote-button"),
                    dataIdentifier = "[data-footnote-identifier=\"" + $buttonHovered.attr("data-footnote-identifier") + "\"]";
                if($buttonHovered.hasClass("active")) return;

                $buttonHovered.addClass("hover-instantiated");

                // Delete other popovers, unless overriden in the settings
                if(!settings.allowMultipleFN) {
                    var otherPopoverSelector = ".footnote-content:not(" + dataIdentifier + ")";
                    removePopovers(otherPopoverSelector);
                }
                createPopover(".footnote-button" + dataIdentifier).addClass("hover-instantiated");
            }
        };


        // FUNCTION ----
        // touchClick

        // PURPOSE -----
        // Activates the button the was clicked/ taps
        // Also removes other popovers, if allowMultipleFN is false
        // Finally, removes all popovers if something non-fn related was clicked/ tapped

        // IN ----------
        // Event that contains the target of the tap/click event

        var touchClick = function(e){
            var $target         = $(e.target),
                $nearButton     = $target.closest(".footnote-button");
                $nearFootnote   = $target.closest(".footnote-content");

            // If a button was tapped/ clicked
            if($nearButton.length > 0) {
                // Button was clicked
                // Cancel the link, if it exists
                e.preventDefault();

                // Do the button clicking
                clickButton($nearButton);

            } else if($nearFootnote.length < 1) {
                // Something other than a button or popover was pressed
                if($(".footnote-content").length > 0) {
                    removePopovers();
                }

            }
        };


        // FUNCTION ----
        // clickButton

        // PURPOSE -----
        // Handles the logic of clicking/ tapping the footnote button
        // That is, activates the popover if it isn't already active (+ deactivate others, if appropriate)
        // or, deactivates the popover if it is already active

        // IN ----------
        // Button being clicked/ pressed

        var clickButton = function($button) {

            // Cancel blur
            $button.blur();

            // Get the identifier of the footnote
            var dataIdentifier = "data-footnote-identifier=\"" + $button.attr("data-footnote-identifier") + "\"";

            // Only create footnote if it's not already active
            // If it's activating, ignore the new activation until the popover is fully formed.
            if($button.hasClass("changing")) {

                return;

            } else if(!$button.hasClass("active")) {

                $button.addClass("changing");
                setTimeout(function() {
                    $button.removeClass("changing");
                }, settings.popoverCreateDelay);
                createPopover(".footnote-button[" + dataIdentifier + "]");
                $button.addClass("click-instantiated");

                // Delete all other footnote popovers if we are only allowing one
                if(!settings.allowMultipleFN) {
                    removePopovers(".footnote-content:not([" + dataIdentifier + "])");
                }

            } else {

                // A fully instantiated footnote; either remove it or all footnotes, depending on settings
                if(!settings.allowMultipleFN) {
                    removePopovers();
                } else {
                    removePopovers(".footnote-content[" + dataIdentifier + "]");
                }

            }
        };


        // FUNCTION ----
        // createPopover

        // PURPOSE -----
        // Instantiates the footnote popover of the buttons matching the passed selector.
        // This includes replacing any variables in the content markup, decoding any special characters,
        // Adding the new element to the page, calling the position function, and adding the scroll handler

        // IN ----------
        // Selector of buttons that are to be activated

        // OUT ---------
        // All footnotes activated by the function

        var createPopover = function(selector) {

            selector = selector || ".footnote-button";

            // Activate all matching if multiple footnotes are allowed
            // Or only the first matching element otherwise
            var $buttons;
            if(typeof(selector) !== "string" && settings.allowMultipleFN) {
                $buttons = selector;
            } else if(typeof(selector) !== "string") {
                $buttons = selector.first();
            } else if(settings.allowMultipleFN) {
                $buttons = $(selector).closest(".footnote-button");
            } else {
                $buttons = $(selector + ":first").closest(".footnote-button");
            }

            var $popoversCreated = $();

            $buttons.each(function() {
                var $this = $(this),
                    content;

                try {
                    // Gets the easy replacements out of the way (try is there to ignore the "replacing undefined" error if it's activated too freuqnetly)
                    content = settings.contentMarkup
                                .replace(/\{\{FOOTNOTENUM\}\}/g, $this.attr("data-footnote-number"))
                                .replace(/\{\{FOOTNOTEID\}\}/g, $this.attr("data-footnote-identifier"))
                                .replace(/\{\{FOOTNOTECONTENT\}\}/g, $this.attr("data-footnote-content"))
                                .replace(/\&gtsym\;/gi, "&gt;")
                                .replace(/\&ltsym\;/gi, "&lt;");

                    // Handles replacements of BUTTON attribute requests
                    content = replaceWithReferenceAttributes(content, "BUTTON", $this);
                } finally {

                    // Create content and activate user-defined callback on it
                    $content = $(content);
                    try { settings.activateCallback($content, $this); } catch(err) {}

                    $content.insertAfter($buttons);

                    // Default state is init to allow the initial positioning to set transform-origin
                    popoverStates[$this.attr("data-footnote-identifier")] = "init";

                    // Instantiate the max-width for storage and use in repositioning
                    // Adjust the max-width for the relevant units
                    $content.attr("bigfoot-max-width", calculatePixelDimension($content.css("max-width"), $content));
                    // Max max-width non-restricting
                    $content.css("max-width", 10000);

                    // Instantiate the max-height for storage and use in repositioning
                    // Adjust the max-height for the relevant units
                    var $contentContainer = $content.find(".footnote-content-wrapper");
                    $content.attr("data-bigfoot-max-height", calculatePixelDimension($contentContainer.css("max-height"), $contentContainer));

                    repositionFeet();
                    $this.addClass("active");

                    // Bind the scroll handler to the popover
                    $content.find(".footnote-content-wrapper").bindScrollHandler();
                    $popoversCreated = $popoversCreated.add($content);
                }
            });

            // Add active class after a delay to give it time to transition
            setTimeout(function() {
                $popoversCreated.addClass("active");
            }, settings.popoverCreateDelay);

            return $popoversCreated;
        };


        // FUNCTION ----
        // baseFontSize

        // PURPOSE -----
        // Calculates the base font size for `rem`-based sizing

        var baseFontSize = function() {
            var el = document.createElement("div");
            el.style.cssText = "display:inline-block;padding:0;line-height:1;position:absolute;visibility:hidden;font-size:1em;";
            el.appendChild(document.createElement("M"));
            document.body.appendChild(el);

            var size = el.offsetHeight;
            document.body.removeChild(el);

            return size;
        };


        // FUNCTION ----
        // calculatePixelDimension

        // PURPOSE -----
        // Calculates a pixel dimension (as a regular integer)
        // based on a string with an unknown unit.

        // IN ----------
        // (String) dimension to be evaluated.
        // (jQuery) element that is being measured (for `em` calculations)

        var calculatePixelDimension = function(dim, $el) {
            if(dim == "none") {
                // No value set, make it non-restricting
                dim = 10000;
            } else if(dim.indexOf("rem") >= 0) {
                // Set in rem
                dim = parseFloat(dim)*baseFontSize();
            } else if(dim.indexOf("em") >= 0) {
                // Set in em
                dim = parseFloat(dim)*parseFloat($el.css("font-size"));
            } else if(dim.indexOf("px") >= 0) {
                // Set in px
                dim = parseFloat(dim);
            } else if(dim.indexOf("%") >= 0) {
                // Set in percentages
                dim = parseFloat(dim)/100;
            }

            return dim;
        };


        // FUNCTION ----
        // bindScrollHandler

        // PURPOSE -----
        // Prevents scrolling of the page when you reach the top/ bottom
        // of scrolling a scrollable footnote popover

        // IN ----------
        // Run on popover(s) that are to have the event bound

        // SOURCE ------
        // adapted from: http://stackoverflow.com/questions/16323770/stop-page-from-scrolling-if-hovering-div

        $.fn.bindScrollHandler = function() {
            // Don't even bother checking if option is set to false
            if(!settings.preventPageScroll) { return; }

            $(this).on("DOMMouseScroll mousewheel", function(e) {

                var $this = $(this),
                    scrollTop = $this.scrollTop(),
                    scrollHeight = $this[0].scrollHeight,
                    height = parseInt($this.css("height")),
                    $popover = $this.closest(".footnote-content");

                // Fix for Safari 7 not properly calculating scrollHeight()
                // Just add the class as soon as there is any scrolling
                if($this.scrollTop() > 0 && $this.scrollTop() < 10) {
                    $popover.addClass("scrollable");
                }

                // Return if the element isn't scrollable
                if(!$popover.hasClass("scrollable")) { return; }

                var delta = (e.type == 'DOMMouseScroll' ?
                             e.originalEvent.detail * -40 :
                             e.originalEvent.wheelDelta), // Get the change in scroll position
                    up = delta > 0; // Decide whether the scroll was up or down

                var prevent = function() {
                    e.stopPropagation();
                    e.preventDefault();
                    e.returnValue = false;
                    return false;
                };

                if(!up && -delta > scrollHeight - height - scrollTop) {

                    // Scrolling down, but this will take us past the bottom.
                    $this.scrollTop(scrollHeight);
                    $popover.addClass("fully-scrolled"); // Give a class for removal of scroll-related styles
                    return prevent();
                } else if(up && delta > scrollTop) {

                    // Scrolling up, but this will take us past the top.
                    $this.scrollTop(0);
                    $popover.removeClass("fully-scrolled");
                    return prevent();
                } else {
                    $popover.removeClass("fully-scrolled");
                }
            });
        };



        //  ______   ______   ________   ______  _________  ________  __   __   ________   _________  ______
        // /_____/\ /_____/\ /_______/\ /_____/\/________/\/_______/\/_/\ /_/\ /_______/\ /________/\/_____/\
        // \:::_ \ \\::::_\/_\::: _  \ \\:::__\/\__.::.__\/\__.::._\/\:\ \\ \ \\::: _  \ \\__.::.__\/\::::_\/_
        //  \:\ \ \ \\:\/___/\\::(_)  \ \\:\ \  __ \::\ \     \::\ \  \:\ \\ \ \\::(_)  \ \  \::\ \   \:\/___/\
        //   \:\ \ \ \\::___\/_\:: __  \ \\:\ \/_/\ \::\ \    _\::\ \__\:\_/.:\ \\:: __  \ \  \::\ \   \::___\/_
        //    \:\/.:| |\:\____/\\:.\ \  \ \\:\_\ \ \ \::\ \  /__\::\__/\\ ..::/ / \:.\ \  \ \  \::\ \   \:\____/\
        //     \____/_/ \_____\/ \__\/\__\/ \_____\/  \__\/  \________\/ \___/_(   \__\/\__\/   \__\/    \_____\/
        //

        // FUNCTION ----
        // unhoverFeet

        // PURPOSE -----
        // Removes the unhovered footnote content if deleteOnUnhover is true

        // IN ----------
        // Event that contains the target of the mouseout event

        var unhoverFeet = function(e) {
            if(settings.deleteOnUnhover && settings.activateOnHover) {
                setTimeout(function() {
                    // If the new element is NOT a descendant of the footnote button
                    var $target = $(e.target).closest(".footnote-content, .footnote-button");
                    if($(".footnote-button:hover, .footnote-content:hover").length < 1) {
                        removePopovers();
                    }
                }, settings.hoverDelay);
            }
        };


        // FUNCTION ----
        // escapeKeypress

        // PURPOSE -----
        // Removes all popovers on keypress

        // IN ----------
        // Event that contains the key that was pressed

        var escapeKeypress = function(e) {
            if(e.keyCode == 27) {
                removePopovers();
            }
        };


        // FUNCTION ----
        // removePopovers

        // PURPOSE -----
        // Removes/ adds appropriate classes to the footnote content and button
        // After a delay (to allow for transitions) it removes the actual footnote content

        // IN ----------
        // Selector of footnotes to deactivate and timeout before deleting actual elements

        // OUT ---------
        // Footnote buttons that were deactivated

        var removePopovers = function(footnotes, timeout) {
            footnotes = footnotes || ".footnote-content";
            timeout = timeout || settings.popoverDeleteDelay;

            var $buttonsClosed = $(),
                footnoteID,
                $linkedButton,
                $this;

            $(footnotes).each(function() {
                $this = $(this);
                footnoteID = $this.attr("data-footnote-identifier");
                $linkedButton = $(".footnote-button[data-footnote-identifier=\"" + footnoteID + "\"]");

                if(!$linkedButton.hasClass("changing")) {

                    $buttonsClosed = $buttonsClosed.add($linkedButton);
                    $linkedButton.removeClass("active hover-instantiated click-instantiated").addClass("changing");
                    $this.removeClass("active").addClass("disapearing");

                    // Gets rid of the footnote after the timeout
                    setTimeout(function() {
                        $this.remove();
                        delete popoverStates[footnoteID];
                        $linkedButton.removeClass("changing");
                    }, timeout);
                }
            });

            return $buttonsClosed;
        };



        //  ______    ______   ______   ______   ______    ________  _________  ________  ______   ___   __
        // /_____/\  /_____/\ /_____/\ /_____/\ /_____/\  /_______/\/________/\/_______/\/_____/\ /__/\ /__/\
        // \:::_ \ \ \::::_\/_\:::_ \ \\:::_ \ \\::::_\/_ \__.::._\/\__.::.__\/\__.::._\/\:::_ \ \\::\_\\  \ \
        //  \:(_) ) )_\:\/___/\\:(_) \ \\:\ \ \ \\:\/___/\   \::\ \    \::\ \     \::\ \  \:\ \ \ \\:. `-\  \ \
        //   \: __ `\ \\::___\/_\: ___\/ \:\ \ \ \\_::._\:\  _\::\ \__  \::\ \    _\::\ \__\:\ \ \ \\:. _    \ \
        //    \ \ `\ \ \\:\____/\\ \ \    \:\_\ \ \ /____\:\/__\::\__/\  \::\ \  /__\::\__/\\:\_\ \ \\. \`-\  \ \
        //     \_\/ \_\/ \_____\/ \_\/     \_____\/ \_____\/\________\/   \__\/  \________\/ \_____\/ \__\/ \__\/
        //


        // FUNCTION ----
        // repositionFeet

        // PURPOSE -----
        // Positions each footnote relative to its button

        var repositionFeet = function(e) {
            if(settings.positionContent) {

                var type = e ? e.type : "resize";

                $(".footnote-content").each(function() {

                    // Element Definitions
                    var $this               = $(this),
                        identifier          = $this.attr("data-footnote-identifier"),
                        dataIdentifier      = "data-footnote-identifier=\"" + identifier + "\"",
                        $contentWrapper     = $this.find(".footnote-content-wrapper"),
                        $button             = $this.siblings(".footnote-button");

                    // Spacing Information
                    var roomLeft            = roomCalc($button),
                        marginSize          = parseFloat($this.css("margin-top")),
                        maxHeightInCSS      = +($this.attr("data-bigfoot-max-height")),
                        totalHeight         = 2*marginSize + $this.outerHeight(),
                        maxHeightOnScreen   = 10000;

                    // Position tooltip on top if:
                    // total space on bottom is not enough to hold footnote AND
                    // top room is larger than bottom room
                    var positionOnTop = (roomLeft.bottomRoom < totalHeight && roomLeft.topRoom > roomLeft.bottomRoom),
                        lastState = popoverStates[identifier];

                    if(positionOnTop) {
                        // Previous state was bottom, switch it and change classes
                        if(lastState != "top") {
                            popoverStates[identifier] = "top";
                            $this.addClass("top").removeClass("bottom");
                            $this.css("transform-origin", (roomLeft.leftRelative*100) + "% 100%");
                        }
                        maxHeightOnScreen = roomLeft.topRoom - marginSize - 15;
                    } else {
                        // Previous state was top, switch it and change classes
                        if(lastState != "bottom" || lastState == "init") {
                            popoverStates[identifier] = "bottom";
                            $this.removeClass("top").addClass("bottom");
                            $this.css("transform-origin", (roomLeft.leftRelative*100) + "% 0%");
                        }
                        maxHeightOnScreen = roomLeft.bottomRoom - marginSize - 15;
                    }

                    // Sets the max height so that there is no footnote overflow
                    $this.find(".footnote-content-wrapper").css({"max-height": Math.min(maxHeightOnScreen, maxHeightInCSS) + "px"});

                    // Only perform sizing operations when the actual window was resized.
                    if(type == "resize") {

                        var maxWidthInCSS = parseFloat($this.attr("bigfoot-max-width")),
                            $mainWrap = $this.find(".footnote-main-wrapper"),
                            maxWidth = maxWidthInCSS; // default to assuming pixel/em/rem value

                        if(maxWidthInCSS <= 1) {
                            // Max width in CSS set as a percentage

                            // If a relative element has been set for max width, the actual max width
                            // by which to multiply the percentage is the lesser of the element's width
                            // and the width of the viewport
                            var relativeToWidth = (function() {
                                // Width of user-specified element width, set to non-constraining
                                // value in case it does not exist
                                var userSpecifiedRelativeElWidth = 10000;
                                if(settings.maxWidthRelativeTo) {
                                    var jq = $(settings.maxWidthRelativeTo);
                                    if(jq.length > 0) { userSpecifiedRelativeElWidth = jq.outerWidth(); }
                                }

                                return Math.min(window.innerWidth, userSpecifiedRelativeElWidth);
                            })();

                            // Applicable constraining width times the percentage in CSS
                            maxWidth = relativeToWidth*maxWidthInCSS;
                        }

                        // Set the max width to the smaller of the calculated width based on the
                        // percentage/ other value and the width of the actual content (prevents
                        // excess width for small footnotes)
                        maxWidth = Math.min(
                            maxWidth,
                            $this.find(".footnote-content-wrapper").outerWidth() + 1
                        );

                        // Set this on the main wrapper. This allows the footnote-content div
                        // to be displayed as inline-block, wrapping it around the content.
                        $mainWrap.css("max-width", maxWidth + "px");

                        // Positions the popover
                        $this.css({"left": (-roomLeft.leftRelative*maxWidth + parseFloat($button.css("margin-left")) + $button.outerWidth()/2) + "px"});

                        // Position the tooltip
                        positionTooltip($this, roomLeft.leftRelative);
                    }

                    // Give scrollable class if the content hight is larger than the container
                    if(parseInt($this.outerHeight()) < $this.find(".footnote-content-wrapper")[0].scrollHeight) {
                        $this.addClass("scrollable");
                    }
                });
            }
        };




        // FUNCTION ----
        // positionTooltip

        // PURPOSE -----
        // Positions the tooltip at the same relative horizontal position as the button

        // IN ----------
        // Footnote popover to get the tooltip of and the relative horizontal position (as a decimal)

        var positionTooltip = function($popover, leftRelative) {
            leftRelative = leftRelative || 0.5; // default to 50%
            var $tooltip = $popover.find(".bigfoot-tooltip");

            if($tooltip.length > 0) {
                $tooltip.css({"left": leftRelative*100 + "%"});
            }
        };


        // FUNCTION ----
        // roomCalc

        // PURPOSE -----
        // Calculates area on the top, left, bottom and right of the element
        // Also calculates the relative position to the left and top of the screen

        // IN ----------
        // Element to calculate screen position of

        // OUT ---------
        // Object containing room on all sides and top/ left relative positions
        // All measurements are relative to the middle of the element

        var roomCalc = function($el) {

            var elLeftMargin = parseFloat($el.css("margin-left")),
                elWidth      = parseFloat($el.outerWidth()) - elLeftMargin,
                elHeight     = parseFloat($el.outerHeight()),
                w            = viewportDetails(),
                topRoom      = $el.offset().top - w.scrollY + elHeight/2,
                leftRoom     = $el.offset().left - w.scrollX + elWidth/2;

            return {
                topRoom         : topRoom,
                bottomRoom      : w.height - topRoom,
                leftRoom        : leftRoom,
                rightRoom       : w.width - leftRoom,
                leftRelative    : leftRoom / w.width,
                topRelative     : topRoom / w.height
            };
        };


        // FUNCTION ----
        // viewportDetails

        // PURPOSE -----
        // Calculates the dimensions of the viewport

        // OUT ---------
        // Object with width, height, and scrollX/Y properties

        var viewportDetails = function() {
            return {
                width: window.innerWidth,
                height: window.innerHeight,
                scrollX: window.scrollX,
                scrollY: window.scrollY
            };
        };



        //    _______   ______    ______   ________   ___   ___   ______   ______    ________  ___   __    _________  ______
        //  /_______/\ /_____/\  /_____/\ /_______/\ /___/\/__/\ /_____/\ /_____/\  /_______/\/__/\ /__/\ /________/\/_____/\
        //  \::: _  \ \\:::_ \ \ \::::_\/_\::: _  \ \\::.\ \\ \ \\:::_ \ \\:::_ \ \ \__.::._\/\::\_\\  \ \\__.::.__\/\::::_\/_
        //   \::(_)  \/_\:(_) ) )_\:\/___/\\::(_)  \ \\:: \/_) \ \\:(_) \ \\:\ \ \ \   \::\ \  \:. `-\  \ \  \::\ \   \:\/___/\
        //    \::  _  \ \\: __ `\ \\::___\/_\:: __  \ \\:. __  ( ( \: ___\/ \:\ \ \ \  _\::\ \__\:. _    \ \  \::\ \   \_::._\:\
        //     \::(_)  \ \\ \ `\ \ \\:\____/\\:.\ \  \ \\: \ )  \ \ \ \ \    \:\_\ \ \/__\::\__/\\. \`-\  \ \  \::\ \    /____\:\
        //      \_______\/ \_\/ \_\/ \_____\/ \__\/\__\/ \__\/\__\/  \_\/     \_____\/\________\/ \__\/ \__\/   \__\/    \_____\/
        //


        // FUNCTION ----
        // addBreakpoint

        // PURPOSE -----
        // Adds a breakpoint within the HTML at which a user-defined function
        // will be called. The minimum requirement is that a min/ max size is
        // provided; after that point, the footnote will stop being positioned
        // (i.e., to allow for bottom-fixed footnotes on small screens).

        // IN ----------
        // size: Size to break at. Can be simple (i.e., ">10px" or "<10em"), full
        // media query (i.e., "(max-width: 400px)"), or a MediaQueryList object.
        // deleteDelay: the delay by which to wait when closing/ reopening footnotes
        // on breakpoint changes. Defaults to settings.popoverDeleteDelay.
        // removeOpen: whether or not to close (and reopen) footnotes that are open
        // at the time the breakpoint changes. Defaults to true.
        // trueCallback: function to call when the media query is initially matched.
        // will be passed the removeOpen option and a copy of the bigfoot object.
        // falseCallback: function to call when the media query is initially not matched.
        // The same variables are passed in.

        // OUT ---------
        // Object indicating whether the breakpoint was added and, if so, the MQList object
        // and listener function.

        var addBreakpoint = function(size, deleteDelay, removeOpen,
                                trueCallback, falseCallback) {

            // Set defaults
            deleteDelay = deleteDelay || settings.popoverDeleteDelay;
            if(removeOpen === null || removeOpen !== false) removeOpen = true;

            var mql, minMax, s;

            // If they passed a string representation
            if(typeof(size) === "string") {

                // Repalce special strings with corresponding widths
                if(size.toLowerCase() === "iphone") {
                    s = "<320px";
                } else if(size.toLowerCase() === "ipad") {
                    s = "<768px";
                } else {
                    s = size;
                }

                // Check on the nature of the string (simple or full media query)
                if(s.charAt(0) === ">") {
                    minMax = "min";
                } else if(s.charAt(0) === "<") {
                    minMax = "max";
                } else {
                    minMax = null;
                }

                // Create the media query
                var query = minMax ? "(" + minMax + "-width: " + s.substring(1) + ")" : s;
                mql = window.matchMedia(query);

            } else {

                // Assumption is that a MediaQueryList object was passed.
                mql = size;
            }

            // If a non-MQList object is passed on the media is invalid
            if(mql.media && mql.media === "invalid") return {
                added: false,
                mq: mql,
                listener: null
            };

            // Determine whether to close/ remove popovers on the true/false callbacks
            var trueDefaultPositionSetting = minMax === "min",
                falseDefaultPositionSetting = minMax === "max";

            // Create default trueCallback
            trueCallback = trueCallback ||
                            makeDefaultCallbacks(
                                removeOpen, deleteDelay,
                                trueDefaultPositionSetting, function($popover) {
                                    $popover.addClass("fixed-bottom");
                                }
                            );

            // Create default falseCallback
            falseCallback = falseCallback ||
                            makeDefaultCallbacks(
                                removeOpen, deleteDelay,
                                falseDefaultPositionSetting, function() {}
                            );

            // MQ Listener function
            var mqListener = function(mq) {
                if(mq.matches) {
                    trueCallback(removeOpen, bigfoot);
                } else {
                    falseCallback(removeOpen, bigfoot);
                }
            };

            // Attach listener and call it for the initial match/ non-match
            mql.addListener(mqListener);
            mqListener(mql);

            // Add to the breakpoints setting
            settings.breakpoints[size] = {
                added: true,
                mq: mql,
                listener: mqListener
            };

            return settings.breakpoints[size];

        };


        // FUNCTION ----
        // makeDefaultCallbacks

        // PURPOSE -----
        // Creates the default callbacks to attach to the MQ events.

        // IN ----------
        // See above for the first three variables.
        // callback: The function to be assigned to the "activateCallback" setting
        // (called when creating new footnotes)

        // OUT ---------
        // Default MQ matches/ non-matches function.

        var makeDefaultCallbacks = function(removeOpen, deleteDelay, position, callback) {
            return function(removeOpen, bigfoot) {
                var $closedPopovers;

                if(removeOpen) {
                    $closedPopovers = bigfoot.close();
                    bigfoot.updateSetting("activateCallback", callback);
                }
                setTimeout(function() {
                    bigfoot.updateSetting("positionContent", position);
                    if(removeOpen) bigfoot.activate($closedPopovers);
                }, deleteDelay);
            };
        };


        // FUNCTION ----
        // removeBreakpoint

        // PURPOSE -----
        // Removes a previously-created breakpoint, calling the false condition
        // before doing so (or, a user-provided function instead).

        // IN ----------
        // target: the media query to remove, either by passing the string used to create
        // the breakpoint initially, or by passing the associated MediaQueryList object.
        // callback: the (optional) function to call before removing the listener.

        // OUT ---------
        // true if a media query was found and deleted, false otherwise.

        var removeBreakpoint = function(target, callback) {
            var mq = null,
                b, mqFount = false;
            if(typeof(target) === "string") {
                mqFound = settings.breakpoints[target] !== undefined;
            } else {
                for(b in settings.breakpoints) {
                    if(settings.breakpoints.hasOwnProperty(b) && settings.breakpoints[b].mq === target) {
                        mqFound = true;
                        break;
                    }
                }
            }

            if(mqFound) {
                var breakpoint = settings.breakpoints[b || target];
                // Calls the non-matching callback one last time
                if(callback) {
                    callback({matches: false});
                } else {
                    breakpoint.listener({matches: false});
                }
                breakpoint.mq.removeListener(breakpoint.listener);
                delete settings.breakpoints[b || target];
            }

            return mqFound;
        };



        //  ______   _________  ___   ___   ______   ______
        // /_____/\ /________/\/__/\ /__/\ /_____/\ /_____/\
        // \:::_ \ \\__.::.__\/\::\ \\  \ \\::::_\/_\:::_ \ \
        //  \:\ \ \ \  \::\ \   \::\/_\ .\ \\:\/___/\\:(_) ) )_
        //   \:\ \ \ \  \::\ \   \:: ___::\ \\::___\/_\: __ `\ \
        //    \:\_\ \ \  \::\ \   \: \ \\::\ \\:\____/\\ \ `\ \ \
        //     \_____\/   \__\/    \__\/ \::\/ \_____\/ \_\/ \_\/
        //


        // FUNCTION ----
        // updateSetting

        // PURPOSE -----
        // Updates the specified setting(s) with the value(s) you pass

        // IN ----------
        // Setting to adjust and new value for the setting (or an object
        // with all setting-new value pairs)

        // OUT ---------
        // Returns the old value for the setting (or an object with old settings
        // for each assigned property, if more than one were set)

        var updateSetting = function(newSettings, value) {

            var oldValue;

            if(typeof(newSettings) === "string") {

                oldValue = settings[newSettings];
                settings[newSettings] = value;

            } else {

                oldValue = {};

                for(var prop in newSettings) {
                    if(newSettings.hasOwnProperty(prop)) {
                        oldValue[prop] = settings[prop];
                        settings[prop] = newSettings[prop];
                    }
                }

            }

            return oldValue;
        };


        // FUNCTION ----
        // getSetting

        // PURPOSE -----
        // Returns the settings object

        var getSetting = function(setting) {

            return settings[setting];
        };



        //   _______    ________  ___   __    ______    ________  ___   __    _______
        // /_______/\  /_______/\/__/\ /__/\ /_____/\  /_______/\/__/\ /__/\ /______/\
        // \::: _  \ \ \__.::._\/\::\_\\  \ \\:::_ \ \ \__.::._\/\::\_\\  \ \\::::__\/__
        //  \::(_)  \/_   \::\ \  \:. `-\  \ \\:\ \ \ \   \::\ \  \:. `-\  \ \\:\ /____/\
        //   \::  _  \ \  _\::\ \__\:. _    \ \\:\ \ \ \  _\::\ \__\:. _    \ \\:\\_  _\/
        //    \::(_)  \ \/__\::\__/\\. \`-\  \ \\:\/.:| |/__\::\__/\\. \`-\  \ \\:\_\ \ \
        //     \_______\/\________\/ \__\/ \__\/ \____/_/\________\/ \__\/ \__\/ \_____\/
        //

        $(document).ready(function() {

            footnoteInit();

            $(document).on("mouseenter", ".footnote-button", buttonHover);
            $(document).on("touchend click", touchClick);
            $(document).on("mouseout", ".hover-instantiated", unhoverFeet);
            $(document).on("keyup", escapeKeypress);
            $(window).on("scroll resize", repositionFeet);
            $(document).on("gestureend", function(e) {
                repositionFeet();
            });
        });



        //  ______    ______   _________  __  __   ______    ___   __
        // /_____/\  /_____/\ /________/\/_/\/_/\ /_____/\  /__/\ /__/\
        // \:::_ \ \ \::::_\/_\__.::.__\/\:\ \:\ \\:::_ \ \ \::\_\\  \ \
        //  \:(_) ) )_\:\/___/\  \::\ \   \:\ \:\ \\:(_) ) )_\:. `-\  \ \
        //   \: __ `\ \\::___\/_  \::\ \   \:\ \:\ \\: __ `\ \\:. _    \ \
        //    \ \ `\ \ \\:\____/\  \::\ \   \:\_\:\ \\ \ `\ \ \\. \`-\  \ \
        //     \_\/ \_\/ \_____\/   \__\/    \_____\/ \_\/ \_\/ \__\/ \__\/
        //

        bigfoot = {
            close: function(footnotes, timeout) {
                return removePopovers(footnotes, timeout);
            },
            activate: function(button) {
                return createPopover(button);
            },
            reposition: function() {
                return repositionFeet();
            },
            addBreakpoint: function(size, deleteDelay, removeOpen, trueCallback, falseCallback) {
                return addBreakpoint(size, deleteDelay, removeOpen, trueCallback, falseCallback);
            },
            removeBreakpoint: function(target, callback) {
                return removeBreakpoint(target, callback);
            },
            getSetting: function(setting) {
                return getSetting(setting);
            },
            updateSetting: function(setting, newValue) {
                return updateSetting(setting, newValue);
            }
        };

        return bigfoot;
    };

})(jQuery);
