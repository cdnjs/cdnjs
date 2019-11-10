/* ===========================================================
 *
 *  Name:          selectordie.js
 *  Updated:       2014-10-11
 *  Version:       0.1.8
 *  Created by:    Per V @ Vst.mn
 *  What?:         The Select or Die JS
 *
 *  Copyright (c) 2014 Per Vestman
 *  Dual licensed under the MIT and GPL licenses.
 *
 *  To much comments in the code. Please, I know.
 *
 *  Oddny | Cogs 'n Kegs
 *
 * =========================================================== */

; (function ($) {
    "use strict";

    $.fn.selectOrDie = function (method) {

        var $defaults = {
                customID:          null,      // String  - "" by default - Adds an ID to the SoD
                customClass:       "",        // String  - "" by default - Adds a class to the SoD
                placeholder:       null,      // String  - "" by default - Adds a placeholder that will be shown before a selection has been made
                placeholderOption: false,     // Boolean - false by default - Same as above, but it uses the first option in the <select> as a placeholder (and hides it from the list)
                prefix:            null,      // String  - "" by default - Adds a prefix that always will be shown before the selected value
                cycle:             false,     // Boolean  - false by default - Should keyboard cycle through options or not?
                stripEmpty:        false,     // Boolean  - false by default - Should empty <option>'s be stripped from the <select>
                links:             false,     // Boolean  - false by default - Should the options be treated as links?
                linksExternal:     false,     // Boolean  - false by default - Should the options be treated as links and open in a new window/tab?
                size:              0,         // Integer  - 0 by default - The value set equals the amount of items before scroll is needed
                tabIndex:          0,         // integer  - 0 by default
                onChange:          $.noop     // Adds a callback function for when the SoD gets changed
            },
            $_settings = {},
            $_sodKeysWhenClosed = false,
            $_sodFilterTimeout, $_sodViewportTimeout;

        var _private = {

            initSoD: function (options) {
                $_settings = $.extend({}, $defaults, options);

                return this.each(function () {

                    if ( !$(this).parent().hasClass("sod_select") ) {
                        var $select                    = $(this),
                            $settingsId                = $select.data("custom-id") ? $select.data("custom-id") : $_settings.customID,
                            $settingsClass             = $select.data("custom-class") ? $select.data("custom-class") : $_settings.customClass,
                            $settingsPrefix            = $select.data("prefix") ? $select.data("prefix") : $_settings.prefix,
                            $settingsPlaceholder       = $select.data("placeholder") ? $select.data("placeholder") : $_settings.placeholder,
                            $settingsPlaceholderOption = $select.data("placeholder-option") ? $select.data("placeholder-option") : $_settings.placeholderOption,
                            $settingsCycle             = $select.data("cycle") ? $select.data("cycle") : $_settings.cycle,
                            $settingsLinks             = $select.data("links") ? $select.data("links") : $_settings.links,
                            $settingsLinksExternal     = $select.data("links-external") ? $select.data("links-external") : $_settings.linksExternal,
                            $settingsSize              = parseInt($select.data("size")) ? $select.data("size") : $_settings.size,
                            $settingsTabIndex          = parseInt($select.data("tabindex")) ? $select.data("tabindex") : ( $_settings.tabIndex ? $_settings.tabIndex : ( $select.attr("tabindex") ? $select.attr("tabindex") : $_settings.tabIndex ) ),
                            $settingsStripEmpty        = $select.data("strip-empty") ? $select.data("strip-empty") : $_settings.stripEmpty,
                            $selectTitle               = $select.prop("title") ? $select.prop("title") : null,
                            $selectDisabled            = $select.is(":disabled") ? " disabled" : "",
                            $sodPrefix                 = "",
                            $sodHtml                   = "",
                            $sodHeight                 = 0,
                            $sod, $sodListWrapper, $sodList;

                        // If there's a prefix defined
                        if ( $settingsPrefix ) {
                            $sodPrefix = "<span class=\"sod_prefix\">" + $settingsPrefix + "</span> ";
                        }

                        // If there's a placeholder defined
                        if ( $settingsPlaceholder && !$settingsPrefix ) {
                            $sodHtml += "<span class=\"sod_label sod_placeholder\">" + $settingsPlaceholder + "</span>";
                        }
                        else {
                            $sodHtml += "<span class=\"sod_label\">" + $sodPrefix + "</span>";
                        }

                        // Inserts a new element that will act like our new <select>
                        $sod = $("<span/>", {
                            id:                        $settingsId,
                            "class":                   "sod_select " + $settingsClass + $selectDisabled,
                            title:                     $selectTitle,
                            tabindex:                  $settingsTabIndex,
                            html:                      $sodHtml,
                            "data-cycle":              $settingsCycle,
                            "data-links":              $settingsLinks,
                            "data-links-external":     $settingsLinksExternal,
                            "data-placeholder":        $settingsPlaceholder,
                            "data-placeholder-option": $settingsPlaceholderOption,
                            "data-prefix":             $settingsPrefix,
                            "data-filter":             ""
                        }).insertAfter( this );

                        // If it's a touch device
                        if ( _private.isTouch() ) {
                            $sod.addClass("touch");
                        }

                        // Add a wrapper for the option list
                        $sodListWrapper = $("<span/>", {
                            "class": "sod_list_wrapper"
                        }).appendTo($sod);

                        // Inserts a <span> into our wrapper created above. It will host our <option>:s
                        $sodList = $("<span/>", {
                            "class": "sod_list"
                        }).appendTo($sodListWrapper);

                        // Inserts an option <span> for each <option>
                        $("option, optgroup", $select).each(function (i) {
                            var $this = $(this);

                            if ( $settingsStripEmpty && !$.trim($this.text()) ) { // Strip empty <option>'s from the <select>
                                $this.remove();
                            } else if ( i === 0 && $settingsPlaceholderOption && !$sodPrefix )
                                _private.populateSoD($this, $sodList, $sod, true);
                            else {
                                _private.populateSoD($this, $sodList, $sod, false);
                            }
                        });

                        // If the setting size is set, then add a max-height to the SoD
                        if ( $settingsSize ) {
                            // Show the SoD options
                            $sodListWrapper.show();

                            // Calculate a max-height
                            $(".sod_option:lt(" + $settingsSize + ")", $sodList).each(function () {
                                $sodHeight += $(this).outerHeight();
                            });

                            // Hide the SoD list wrapper and set a "max-height" to the list itself
                            $sodListWrapper.removeAttr("style");
                            $sodList.css({"max-height": $sodHeight });
                        }

                        // Move the <select> into the SoD element
                        $select.appendTo( $sod );

                        // Bind events to the SoD
                        $sod.on("focusin", _private.focusSod)
                            .on("click", _private.triggerSod)
                            .on("click", ".sod_option", _private.optionClick)
                            .on("mousemove", ".sod_option", _private.optionHover)
                            .on("keydown", _private.keyboardUse);

                        // Bind change event to the <select>
                        $select.on("change", _private.selectChange);

                        // When a label for the native select is clicked we want to focus the SoD
                        $(document).on("click", "label[for='" + $select.attr("id") + "']", function(e) {
                            e.preventDefault();
                            $sod.focus();
                        });
                    }
                    else {
                        console.log("Select or Die: It looks like the SoD already exists");
                    }

                });
            }, // initSoD


            populateSoD: function ($option, $sodList, $sod, $isPlaceholder) {
                var $sodPlaceholder       = $sod.data("placeholder"),
                    $sodPlaceholderOption = $sod.data("placeholder-option"),
                    $sodPrefix            = $sod.data("prefix"),
                    $sodLabel             = $sod.find(".sod_label"),
                    $optionParent         = $option.parent(),
                    $optionText           = $option.text(),
                    $optionValue          = $option.val(),
                    $optionCustomId       = $option.data("custom-id") ? $option.data("custom-id") : null,
                    $optionCustomClass    = $option.data("custom-class") ? $option.data("custom-class") : "",
                    $optionIsDisabled     = $option.is(":disabled") ? " disabled " : "",
                    $optionIsSelected     = $option.is(":selected") ? " selected active " : "",
                    $optionLink           = $option.data("link") ? " link " : "",
                    $optionLinkExternal   = $option.data("link-external") ? " linkexternal" : "",
                    $optgroupLabel        = $option.prop("label");

                // Create <li> for each <option>
                if ( $option.is("option") ) { // If <option>
                    $("<span/>", {
                        "class":      "sod_option " + $optionCustomClass + $optionIsDisabled + $optionIsSelected + $optionLink + $optionLinkExternal,
                        id:           $optionCustomId,
                        title:        $optionText,
                        html:         $optionText,
                        "data-value": $optionValue
                    }).appendTo( $sodList );

                    // Set the SoD data-label (used in the blur event)
                    if ( $isPlaceholder && !$sodPrefix ) { // Various things if the first option should be used as a placeholder
                        $sod.data("label", $optionText);
                        $sod.data("placeholder", $optionText);
                        $option.prop("disabled", true);
                        $sodList.find(".sod_option:last").addClass("is-placeholder disabled");

                        if ( $optionIsSelected ) {
                            $sodLabel.addClass("sod_placeholder");
                        }
                    }
                    else if ( $optionIsSelected && $sodPlaceholder && !$sodPlaceholderOption && !$sodPrefix ) { // If the option is selected and the placeholder option is used
                        $sod.data("label", $sodPlaceholder);
                    }
                    else if ( $optionIsSelected ) { // If the option is selected
                        $sod.data("label", $optionText);
                    }

                    // If selected and no placeholder is set, update label,
                    // added in v.0.1.8: if the placeholder-option is set we'll update the label
                    if ( $optionIsSelected && !$sodPlaceholder || $optionIsSelected && $sodPlaceholderOption || $optionIsSelected && $sodPrefix ) {
                        $sodLabel.append($optionText);
                    }

                    // If child of an <optgroup>
                    if ( $optionParent.is("optgroup") ) {
                        $sodList.find(".sod_option:last").addClass("groupchild");

                        // If <optgroup> disabled
                        if ( $optionParent.is(":disabled") ) {
                            $sodList.find(".sod_option:last").addClass("disabled");
                        }
                    }
                }
                else { // If <<optgroup>
                    $("<span/>", {
                        "class":      "sod_option optgroup " + $optionIsDisabled,
                        title:        $optgroupLabel,
                        html:         $optgroupLabel,
                        "data-label": $optgroupLabel
                    }).appendTo( $sodList );
                }
            }, // populateSoD


            focusSod: function () {
                var $sod = $(this);

                // If not disabled we'll add focus (and blur other active SoD's)
                if ( !$sod.hasClass("disabled") ) {
                    _private.blurSod($(".sod_select.focus").not($sod));
                    $sod.addClass("focus");

                    // Blur the SoD when clicking outside it
                    $("html").on("click.sodBlur", function() {
                        _private.blurSod($sod);
                    });
                }
                else {
                    _private.blurSod($sod);
                }
            }, // focusSod


            triggerSod: function (e) {
                e.stopPropagation();

                var $sod            = $(this),
                    $sodList        = $sod.find(".sod_list"),
                    $sodPlaceholder = $sod.data("placeholder"),
                    $optionActive   = $sod.find(".active"),
                    $optionSelected = $sod.find(".selected");

                // Trigger the SoD if it's not disabled, already open or a touch device
                if ( !$sod.hasClass("disabled") && !$sod.hasClass("open") && !$sod.hasClass("touch") ) {
                    // Add the .open class to display list
                    $sod.addClass("open");

                    // If a placeholder is set, then show it
                    if ( $sodPlaceholder && !$sod.data("prefix") ) {
                        $sod.find(".sod_label").addClass("sod_placeholder").html($sodPlaceholder);
                    }

                    // Scroll list to selected item
                    _private.listScroll($sodList, $optionSelected);

                    // Check if the option list fits in the viewport
                    _private.checkViewport($sod, $sodList);
                }
                else {
                    // Clears viewport check timeout
                    clearTimeout($_sodViewportTimeout);
                    $sod.removeClass("open");

                    // If a placeholder is set, make sure the placeholder text is removed if
                    // the user toggles the select using his mouse
                    if ( $sodPlaceholder ) {
                        $sod.find(".sod_label").get(0).lastChild.nodeValue = $optionActive.text();
                    }
                }
            }, // triggerSod


            keyboardUse: function (e) {
                var $sod            = $(this),
                    $sodList        = $sod.find(".sod_list"),
                    $sodOptions     = $sod.find(".sod_option"),
                    $sodLabel       = $sod.find(".sod_label"),
                    $sodCycle       = $sod.data("cycle"),
                    $optionActive   = $sodOptions.filter(".active"),
                    $sodFilterHit, $optionNext, $optionCycle;

                // Highlight prev/next element if up/down key pressed
                if ( e.which > 36 && e.which < 41 ) {

                    // Set $optionNext and $optionCycle
                    if ( e.which === 37 || e.which === 38 ) { // Left/Up key
                        $optionNext  = $optionActive.prevAll(":not('.disabled, .optgroup')").first();
                        $optionCycle = $sodOptions.not(".disabled, .optgroup").last();
                    }
                    else if ( e.which === 39 || e.which === 40 ) { // Right/Down key
                        $optionNext  = $optionActive.nextAll(":not('.disabled, .optgroup')").first();
                        $optionCycle = $sodOptions.not(".disabled, .optgroup").first();
                    }

                    // If there's no option before/after and cycle is enabled
                    if ( !$optionNext.hasClass("sod_option") && $sodCycle ) {
                        $optionNext = $optionCycle;
                    }

                    // Add .active to the next option, update the label and scroll the list
                    if ( $optionNext.hasClass("sod_option") || $sodCycle ) {
                        $optionActive.removeClass("active");
                        $optionNext.addClass("active");
                        $sodLabel.get(0).lastChild.nodeValue = $optionNext.text();
                        _private.listScroll($sodList, $optionNext);

                        // If the user used his keys when the SoD was closed we'll
                        // update the $_sodKeysWhenClosed flag that we use in blurSod()
                        if ( !$sod.hasClass("open") ) {
                            $_sodKeysWhenClosed = true;
                            // $sod.data("closed-keys", true);
                        }

                    }

                    // Disables the up/down keys from scrolling the page
                    return false;
                }
                else if ( e.which === 13 || (e.which === 32 && $sod.hasClass("open") && ($sod.data("filter")[0] === ' ' || $sod.data("filter") === "") ) ) { // Enter key or space, simulate click() function
                    e.preventDefault();
                    $optionActive.click();
                }
                else if ( e.which === 32 && !$sod.hasClass("open") && ($sod.data("filter")[0] === ' ' || $sod.data("filter") === "") ) { // Space bar, Opens the SoD if already closed
                    e.preventDefault();
                    $_sodKeysWhenClosed = false;
                    $sod.click();
                }
                else if ( e.which === 27 ) { // Esc key, blur the SoD
                    _private.blurSod($sod);
                }

                // "Filter" options list using keybaord based input
                if ( e.which !== 0) {
                    // Clears data-filter timeout
                    clearTimeout($_sodFilterTimeout);

                    // Append the data-filter with typed character
                    $sod.data("filter", $sod.data("filter") + String.fromCharCode(e.which));

                    // Check for matches of the typed string
                    $sodFilterHit = $sodOptions.filter(function() {
                        return $(this).text().toLowerCase().indexOf($sod.data("filter").toLowerCase()) === 0;
                    }).not(".disabled, .optgroup").first();

                    // If the typed value is a hit, then set it to active
                    if ( $sodFilterHit.length ) {
                        $optionActive.removeClass("active");
                        $sodFilterHit.addClass("active");
                        _private.listScroll($sodList, $sodFilterHit);
                        $sodLabel.get(0).lastChild.nodeValue = $sodFilterHit.text();

                        if ( !$sod.hasClass("open") ) {
                            $_sodKeysWhenClosed = true;
                        }
                    }

                    // Set a timeout to empty the data-filter
                    $_sodFilterTimeout = setTimeout( function() {
                        $sod.data("filter", "");
                    }, 500);
                }
            }, // keyboardUse


            optionHover: function () {
                var $option = $(this);

                // Mousemove event on option to make the SoD behave just like a native select
                if ( !$option.hasClass("disabled") && !$option.hasClass("optgroup") ) {
                    $option.siblings().removeClass("active").end().addClass("active");
                }
            }, // optionHover


            optionClick: function (e) {
                e.stopPropagation();

                var $clicked        = $(this),
                    $sod            = $clicked.closest(".sod_select"),
                    $optionDisabled = $clicked.hasClass("disabled"),
                    $optionOptgroup = $clicked.hasClass("optgroup"),
                    $optionIndex    = $sod.find(".sod_option:not('.optgroup')").index(this);

                // Fixes https://github.com/vestman/Select-or-Die/issues/8, thanks builtbylane
                if ( $sod.hasClass("touch") ) {
                    return;
                }

                // If not disabled or optgroup
                if ( !$optionDisabled && !$optionOptgroup ) {
                    $sod.find(".selected, .sod_placeholder").removeClass("selected sod_placeholder");
                    $clicked.addClass("selected");
                    $sod.find("select option")[$optionIndex].selected = true;
                    $sod.find("select").change();
                }

                // Clear viewport check timeout
                clearTimeout($_sodViewportTimeout);

                // Hide the list
                $sod.removeClass("open");
            }, // optionClick


            selectChange: function () {
                var $select         = $(this),
                    $optionSelected = $select.find(":selected"),
                    $optionText     = $optionSelected.text(),
                    $sod            = $select.closest(".sod_select");

                $sod.find(".sod_label").get(0).lastChild.nodeValue = $optionText;
                $sod.data("label", $optionText);

                // Triggers the onChange callback
                $_settings.onChange.call(this);

                // If $_settings.links, send the user to the URL
                if ( ($sod.data("links") || $optionSelected.data("link")) && !$optionSelected.data("link-external") ) {
                    window.location.href = $optionSelected.val();
                }
                else if ( $sod.data("links-external") || $optionSelected.data("link-external") ) {
                    window.open($optionSelected.val(),"_blank");
                }
            }, // selectChange


            blurSod: function ($sod) {
                if ( $("body").find($sod).length ) {
                    var $sodLabel         = $sod.data("label"),
                        $sodPlaceholder   = $sod.data("placeholder"),
                        $optionActive     = $sod.find(".active"),
                        $optionSelected   = $sod.find(".selected"),
                        $optionHasChanged = false;

                    // Clear viewport check timeout
                    clearTimeout($_sodViewportTimeout);

                    // Check the $sod for changes. If the user has used his keys when the SoD was closed
                    // we'll set the currently active option to selected. If the user used his keys when
                    // the SoD was open but did NOT make a selection, then we'll restore the SoD
                    if ( $_sodKeysWhenClosed && !$optionActive.hasClass("selected") ) {
                        $optionActive.click();
                        $optionHasChanged = true;
                    }
                    else if ( !$optionActive.hasClass("selected") ) {
                        $optionActive.removeClass("active");
                        $optionSelected.addClass("active");
                    }

                    if ( !$optionHasChanged && $sodPlaceholder ) {
                        $sod.find(".sod_label").get(0).lastChild.nodeValue = $optionSelected.text();
                    } else if ( !$optionHasChanged ) {
                        $sod.find(".sod_label").get(0).lastChild.nodeValue = $sodLabel;
                    }

                    // Reset the flag indicating whether the user has used his arrow keys when the SoD
                    // was closed or not
                    $_sodKeysWhenClosed = false;

                    // Remove open/focus class
                    $sod.removeClass("open focus");

                    // Blur the SOD
                    $sod.blur();

                    // Unbind the
                    $("html").off(".sodBlur");
                }
            }, // blurSod


            checkViewport: function ($sod, $sodList) {
                var $sodPosition   = $sod[0].getBoundingClientRect(),
                    $sodListHeight = $sodList.outerHeight();

                // If the list is below the viewport AND fits above, then show it above
                if ( ($sodPosition.bottom + $sodListHeight + 10) > $(window).height() && ($sodPosition.top - $sodListHeight) > 10 ) {
                    $sod.addClass("above");
                }
                else {
                    $sod.removeClass("above");
                }

                // This was fun, lets do it again and again.
                $_sodViewportTimeout = setTimeout( function() {
                    _private.checkViewport($sod, $sodList);
                }, 200);
            }, // checkViewport


            listScroll: function ($sodList, $option) {
                var $scrollList   = $sodList[0].getBoundingClientRect(), // getBoundingClientRect FTW!
                    $scrollOption = $option[0].getBoundingClientRect();

                // Scroll list up and down
                if ( $scrollList.top > $scrollOption.top ) {
                    $sodList.scrollTop($sodList.scrollTop() - $scrollList.top + $scrollOption.top);
                } else if ( $scrollList.bottom < $scrollOption.bottom ) {
                    $sodList.scrollTop($sodList.scrollTop() - $scrollList.bottom + $scrollOption.bottom);
                }
            }, // listScroll


            isTouch: function () {
                return (("ontouchstart" in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
            } // isTouch

        };

        var methods = {

            destroy: function () {
                return this.each(function () {
                    var $select = $(this),
                        $sod    = $select.parent();

                    // Destroy the SoD
                    if ( $sod.hasClass("sod_select") ) {
                        // Unbind the change event on the real <select>
                        $select.off("change");

                        // Restore DOM
                        $sod.find("span").remove();
                        $select.unwrap();
                    } else {
                        console.log("Select or Die: There's no SoD to destroy");
                    }
                });
            }, // destroy


            update: function () {
                return this.each(function () {
                    var $select  = $(this),
                        $sod     = $select.parent(),
                        $sodList = $sod.find(".sod_list:first");

                    // Check for the SoD
                    if ( $sod.hasClass("sod_select") ) {
                        // Empty current list of options in faux <select>
                        $sodList.empty();

                        // Clear the label (but keep prefix)
                        $sod.find(".sod_label").get(0).lastChild.nodeValue = "";

                        // Disable the SoD if the select is disabled
                        if ( $select.is(":disabled") ) {
                            $sod.addClass("disabled");
                        }

                        // Inserts a <span class="sod_option"> for each <option>
                        $("option, optgroup", $select).each(function () {
                            _private.populateSoD($(this), $sodList, $sod);
                        });
                    } else {
                        console.log("Select or Die: There's no SoD to update");
                    }
                });

            }, // update


            disable: function ($value) {
                return this.each(function () {
                    var $select = $(this),
                        $sod    = $select.parent();

                    // Check for the SoD
                    if ( $sod.hasClass("sod_select") ) {
                        if ( typeof $value !== "undefined" ) { // Disable option/optgroup

                            // Disables the option (and possible children if optgroup) in the SoD
                            $sod.find(".sod_list:first .sod_option[data-value='" + $value + "']").addClass("disabled");
                            $sod.find(".sod_list:first .sod_option[data-label='" + $value + "']").nextUntil(":not(.groupchild)").addClass("disabled");

                            // Disables the option/optgroup in the real <select>
                            $("option[value='" + $value + "'], optgroup[label='" + $value + "']", this).prop("disabled", true);

                        } else if ( $sod.hasClass("sod_select") ) { // Disable select/SoD
                            $sod.addClass("disabled");
                            $select.prop("disabled", true);
                        }
                    } else {
                        console.log("Select or Die: There's no SoD to disable");
                    }
                });
            }, // disable


            enable: function ($value) {
                return this.each(function () {
                    var $select = $(this),
                        $sod    = $select.parent();

                    // Check for the SoD
                    if ( $sod.hasClass("sod_select") ) {
                        if ( typeof $value !== "undefined" ) { // Enable option/optgroup

                            // Enables the option (and possible children if optgroup) in the SoD
                            $sod.find(".sod_list:first .sod_option[data-value='" + $value + "']").removeClass("disabled");
                            $sod.find(".sod_list:first .sod_option[data-label='" + $value + "']").nextUntil(":not(.groupchild)").removeClass("disabled");

                            // Enables the option in the real <select>
                            $("option[value='" + $value + "'], optgroup[label='" + $value + "']", this).prop("disabled", false);

                        } else if ( $sod.hasClass("sod_select") ) { // Enable select/SoD
                            $sod.removeClass("disabled");
                            $select.prop("disabled", false);
                        }
                    } else {
                        console.log("Select or Die: There's no SoD to enable");
                    }
                });
            } // enable

        };

        if ( methods[method] ) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if ( typeof method === "object" || !method ) {
            return _private.initSoD.apply(this, arguments);
        } else {
            $.error("Select or Die: Oh no! No such method \"" + method + "\" for the SoD instance");
        }
    };

})(jQuery);
