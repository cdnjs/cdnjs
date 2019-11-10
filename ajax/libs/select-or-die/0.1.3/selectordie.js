/* ===========================================================
 *
 *  Name:          selectordie.js
 *  Updated:       2014-04-28
 *  Version:       0.1.3
 *  Created by:    Per V @ Vst.mn
 *  What?:         The Select or Die JS
 *
 *  Copyright (c) 2014 Per Vestman
 *  Dual licensed under the MIT and GPL licenses.
 *
 *  To much comments in the code. Please, I know.
 *
 *  Beards, Rock & Loud Guns | Cogs 'n Kegs
 *
 * =========================================================== */

; (function ($) {
    $.fn.selectOrDie = function (method) {
        "use strict";

        var $defaults = {
                customID:      null,          // String - "" by default - Adds an ID to the SoD
                customClass:   "",            // String - "" by default - Adds a class to the SoD
                placeholder:   null,          // String - "" by default - Adds a placeholder that will be shown before a selection has been made
                prefix:        null,          // String - "" by default - Adds a prefix that always will be shown before the selected value
                cycle:         false,         // Boolean - false by default - Should keyboard cycle through options or not?
                links:         false,         // Boolean - false by default - Should the options be treated as links?
                linksExternal: false,         // Boolean - false by default - Should the options be treated as links and open in a new window/tab?
                size:          0,             // Integer - 0 by default - The value set equals the amount of items before scroll is needed
                tabIndex:      0,             // integer - 0 by default
                onChange:      $.noop         // Adds a callback function for when the SoD gets changed
            },
            $_settings = {},
            $_sodFilterTimeout, $_sodViewportTimeout;

        var _private = {

            initSoD: function (options) {
                $_settings = $.extend({}, $defaults, options);

                return this.each(function (i) {

                    if ( !$(this).parent().hasClass("sod_select") ) {
                        var $select                = $(this),
                            $settingsId            = $_settings.customID ? $_settings.customID : ( $select.data("custom-id") ? $select.data("custom-id") : $_settings.customID ),
                            $settingsClass         = $_settings.customClass ? $_settings.customClass : ( $select.data("custom-class") ? $select.data("custom-class") : $_settings.customClass ),
                            $settingsPrefix        = $_settings.prefix ? $_settings.prefix : ( $select.data("prefix") ? $select.data("prefix") : $_settings.prefix ),
                            $settingsPlaceholder   = $_settings.placeholder ? $_settings.placeholder : ( $select.data("placeholder") ? $select.data("placeholder") : $_settings.placeholder ),
                            $settingsCycle         = ( $_settings.cycle || $select.data("cycle") ) ? true : $_settings.cycle,
                            $settingsLinks         = ( $_settings.links || $select.data("links") ) ? true : $_settings.links,
                            $settingsLinksExternal = ( $_settings.linksExternal || $select.data("links-external") ) ? true : $_settings.linksExternal,
                            $settingsSize          = $_settings.size ? $_settings.size : ( $select.data("size") ? $select.data("size") : $_settings.size ),
                            $settingsTabIndex      = $_settings.tabIndex ? $_settings.tabIndex : ( $select.data("tabindex") ? $select.data("tabindex") : ( $select.attr("tabindex") ? $select.attr("tabindex") : $_settings.tabIndex ) ),
                            $selectTitle           = $select.prop("title") ? $select.prop("title") : null,
                            $selectDisabled        = $select.is(":disabled") ? " disabled" : "",
                            $sodPrefix             = "",
                            $sodHtml               = "",
                            $sodHeight             = 0,
                            $sod, $sodListWrapper, $sodList;

                        // If there's a prefix defined
                        if ( $settingsPrefix ) {
                            $sodPrefix = "<span class=\"sod_prefix\">" + $settingsPrefix + "</span> ";
                        }

                        // If there's a placeholder defined
                        if ( $settingsPlaceholder && !$settingsPrefix ) {
                            $sodHtml += "<div class=\"sod_label sod_placeholder\">" + $settingsPlaceholder + "</span>";
                        } else {
                            $sodHtml += "<div class=\"sod_label\">" + $sodPrefix + "</div>";
                        }

                        // Inserts a new element that will act like our new <select>
                        $sod = $("<div/>", {
                            id:                    $settingsId,
                            "class":               "sod_select " + $settingsClass + $selectDisabled,
                            title:                 $selectTitle,
                            tabindex:              $settingsTabIndex,
                            html:                  $sodHtml,
                            "data-cycle":          $settingsCycle,
                            "data-links":          $settingsLinks,
                            "data-links-external": $settingsLinksExternal,
                            "data-placeholder":    $settingsPlaceholder,
                            "data-prefix":         $settingsPrefix,
                            "data-filter":         ""
                        }).insertAfter( this );

                        // If it's a touch device
                        if ( _private.isTouch() ) {
                            $sod.addClass("touch");
                        }

                        // Add a wrapper for the option list
                        $sodListWrapper = $("<div/>", {
                            "class": "sod_list"
                        }).appendTo($sod);

                        // Inserts a <ul> into our wrapper created above. It will host our <option>:s
                        $sodList = $("<ul/>").appendTo($sodListWrapper);

                        // Inserts a <li> for each <option>
                        $("option, optgroup", $select).each(function (i) {
                            _private.populateSoD($(this), $sodList, $sod);
                        });

                        // If the setting size is set, then add a max-height to the SoD
                        if ( $settingsSize ) {
                            // Show the SoD options
                            $sodListWrapper.show();

                            // Calculate a max-height
                            $("li:lt(" + $settingsSize + ")", $sodList).each(function (i) {
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
                            .on("click", "li", _private.optionClick)
                            .on("mousemove", "li", _private.optionHover)
                            .on("keydown keypress", _private.keyboardUse);

                        // Bind change event to the <select>
                        $select.on("change", _private.selectChange);

                        // Blur the SoD when clicking outside it
                        $("html").on("click", function() {
                            _private.blurSod($sod);
                        });

                        // When a label for the native select is clicked we want to focus the SoD
                        $(document).on("click", "label[for='" + $select.attr("id") + "']", function(e) {
                            e.preventDefault();
                            $sod.focus();
                        });
                    } else {
                        console.log("Select or Die: It looks like the SoD already exists");
                    }

                });
            }, // initSoD


            populateSoD: function ($option, $sodList, $sod) {
                var $sodPlaceholder     = $sod.data("placeholder"),
                    $sodPrefix          = $sod.data("prefix"),
                    $optionParent       = $option.parent(),
                    $optionText         = $option.text(),
                    $optionValue        = $option.val(),
                    $optionCustomId     = $option.data("custom-id") ? $option.data("custom-id") : null,
                    $optionCustomClass  = $option.data("custom-class") ? $option.data("custom-class") : "",
                    $optionIsDisabled   = $option.is(":disabled") ? " disabled " : "",
                    $optionIsSelected   = $option.is(":selected") ? " selected active " : "",
                    $optionLink         = $option.data("link") ? " link " : "",
                    $optionLinkExternal = $option.data("link-external") ? " linkexternal" : "";

                // Create <li> for each <option>
                if ( $option.is("option") ) { // If <option>
                    $("<li/>", {
                        "class":      $optionCustomClass + $optionIsDisabled + $optionIsSelected + $optionLink + $optionLinkExternal,
                        id:           $optionCustomId,
                        title:        $optionText,
                        html:         $optionText,
                        "data-value": $optionValue
                    }).appendTo( $sodList );

                    // If selected and no placeholder is set, update label
                    if ( $optionIsSelected && !$sodPlaceholder || $optionIsSelected && $sodPrefix ) {
                        $sod.find(".sod_label").append($optionText);
                    }

                    // Set the SoD data-label (used in the blur event)
                    if ( $optionIsSelected && $sodPlaceholder && !$sodPrefix ) {
                        $sod.data("label", $sodPlaceholder);
                    } else if ( $optionIsSelected ) {
                        $sod.data("label", $optionText);
                    }

                    // If child of an <optgroup>
                    if ( $optionParent.is("optgroup") ) {
                        $sodList.find("li:last").addClass("groupchild");

                        // If <optgroup> disabled
                        if ( $optionParent.is(":disabled") ) {
                            $sodList.find("li:last").addClass("disabled");
                        }
                    }
                } else { // If <<optgroup>
                    $("<li/>", {
                        "class":      "optgroup " + $optionIsDisabled,
                        title:        $option.prop("label"),
                        html:         $option.prop("label"),
                        "data-label": $option.prop("label")
                    }).appendTo( $sodList );
                }
            }, // populateSoD


            focusSod: function () {
                var $sod = $(this);

                // If not disabled we'll add focus and an .active class to enable keyboard
                if ( !$sod.hasClass("disabled") ) {
                    $sod.addClass("focus");
                } else {
                    _private.blurSod($sod);
                }
            }, // focusSod


            triggerSod: function (e) {
                e.stopPropagation();

                var $sod            = $(this),
                    $sodList        = $sod.find("ul"),
                    $sodPlaceholder = $sod.data("placeholder"),
                    $optionSelected = $sod.find(".selected");

                // Trigger the SoD if it's not disabled, already open or a touch device
                if ( !$sod.hasClass("disabled") && !$sod.hasClass("open") && !$sod.hasClass("touch") ) {
                    // Add the .open class to display list
                    $sod.addClass("open");

                    // Close all other SoD's except for the current one
                    $(".sod_select").not(this).removeClass("open focus");

                    // If a placeholder is set, then show it
                    if ( $sodPlaceholder && !$sod.data("prefix") ) {
                        $sod.find(".sod_label").addClass("sod_placeholder").html($sodPlaceholder);
                    }

                    // Scroll list to selected item
                    _private.listScroll($sodList, $optionSelected);

                    // Check if the option list fits in the viewport
                    _private.checkViewport($sod, $sodList);
                } else {
                    // Clears viewport check timeout
                    clearTimeout($_sodViewportTimeout);
                    $sod.removeClass("open above");
                }
            }, // triggerSod


            keyboardUse: function (e) {
                var $sod            = $(this),
                    $sodList        = $sod.find("ul"),
                    $sodOptions     = $sod.find("li"),
                    $sodLabel       = $sod.find(".sod_label"),
                    $sodCycle       = $sod.data("cycle"),
                    $optionActive   = $sodOptions.filter(".active"),
                    $sodFilterHit, $optionNext, $optionCycle, $scrollList, $scrollOption;

                // "Filter" options list using keybaord based input
                if ( e.which !== 0 && e.charCode !== 0 ) {
                    // Clears data-filter timeout
                    clearTimeout($_sodFilterTimeout);

                    // Append the data-filter with typed character
                    $sod.data("filter", $sod.data("filter") + String.fromCharCode(e.keyCode|e.charCode));

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
                    }

                    // Set a timeout to empty the data-filter
                    $_sodFilterTimeout = setTimeout( function() {
                        $sod.data("filter", "");
                    }, 500);
                }

                // Highlight prev/next element if up/down key pressed
                if ( e.which > 36 && e.which < 41 ) {

                    // Set $optionNext and $optionCycle
                    if ( e.which === 37 || e.which === 38 ) { // Left/Up key
                        $optionNext  = $optionActive.prevAll(":not('.disabled, .optgroup')").first();
                        $optionCycle = $sodOptions.not(".disabled, .optgroup").last();
                    } else if ( e.which === 39 || e.which === 40 ) { // Right/Down key
                        $optionNext  = $optionActive.nextAll(":not('.disabled, .optgroup')").first();
                        $optionCycle = $sodOptions.not(".disabled, .optgroup").first();
                    }

                    // If there's no option before/after and cycle is enabled
                    if ( !$optionNext.is("li") && $sodCycle ) {
                        $optionNext = $optionCycle;
                    }

                    // Add .active to the next option, update the label and scroll the list
                    if ( $optionNext.is("li") || $sodCycle ) {
                        $optionActive.removeClass("active");
                        $optionNext.addClass("active");
                        $sodLabel.get(0).lastChild.nodeValue = $optionNext.text();
                        _private.listScroll($sodList, $optionNext);
                    }

                    // Disables the up/down keys from scrolling the page
                    return false;
                } else if ( e.which === 13 || (e.which === 32 && $sod.hasClass("open") && $sod.data("filter") === "") ) { // Enter key or space, simulate click() function
                    e.preventDefault();
                    $optionActive.click();
                } else if ( e.which === 32 && !$sod.hasClass("open") && $sod.data("filter") === "" ) { // Space bar, Opens the SoD if already closed
                    e.preventDefault();
                    $sod.click();
                } else if ( e.which === 27 ) { // Esc key, hides dropdown
                    _private.blurSod($sod);
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
                    $optionIndex    = $sod.find("li:not('.optgroup')").index(this);

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
                $sod.removeClass("open above");
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
                } else if ( $sod.data("links-external") || $optionSelected.data("link-external") ) {
                    window.open($optionSelected.val(),"_blank");
                }
            }, // selectChange


            blurSod: function ($sod) {
                if ( $("body").find($sod).length ) {
                    var $sodLabel       = $sod.data("label"),
                        $optionActive   = $sod.find(".active"),
                        $optionSelected = $sod.find(".selected");

                    // Clear viewport check timeout
                    clearTimeout($_sodViewportTimeout);

                    // Remove above/open class
                    $sod.removeClass("open focus above");

                    // Restore the select if no change has been made
                    if ( !$optionActive.hasClass("selected") ) {
                        $sod.find(".sod_label").get(0).lastChild.nodeValue = $sodLabel;
                        $optionActive.removeClass("active");
                        $optionSelected.addClass("active");
                    }

                    $sod.blur();
                }
            }, // blurSod


            checkViewport: function ($sod, $sodList) {
                var $sodPosition   = $sod[0].getBoundingClientRect(),
                    $sodListHeight = $sodList.outerHeight();

                // If the list is below the viewport AND fits above, then show it above
                if ( ($sodPosition.bottom + $sodListHeight + 10) > $(window).height() && ($sodPosition.top - $sodListHeight) > 10 ) {
                    $sod.addClass("above");
                } else {
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
                return (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
            } // isTouch

        };

        var methods = {

            destroy: function () {
                return this.each(function (i) {
                    var $select = $(this),
                        $sod    = $select.parent();

                    // Destroy the SoD
                    if ( $sod.hasClass("sod_select") ) {
                        // Unbind the change event on the real <select>
                        $select.off("change");

                        // Restore DOM
                        $sod.find("div").remove();
                        $select.unwrap();
                    } else {
                        console.log("Select or Die: There's no SoD to destroy");
                    }
                });
            }, // destroy


            update: function () {
                return this.each(function (i) {
                    var $select  = $(this),
                        $sod     = $select.parent(),
                        $sodList = $sod.find("ul:first");

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

                        // Inserts a <li> for each <option>
                        $("option, optgroup", $select).each(function (i) {
                            _private.populateSoD($(this), $sodList, $sod);
                        });
                    } else {
                        console.log("Select or Die: There's no SoD to update");
                    }
                });

            }, // update


            disable: function ($value) {
                return this.each(function (i) {
                    var $select = $(this),
                        $sod    = $select.parent();

                    // Check for the SoD
                    if ( $sod.hasClass("sod_select") ) {
                        if ( typeof $value !== "undefined" ) { // Disable option/optgroup

                            // Disables the option (and possible children if optgroup) in the SoD
                            $sod.find("ul:first li[data-value='" + $value + "']").addClass("disabled");
                            $sod.find("ul:first li[data-label='" + $value + "']").nextUntil(":not(.groupchild)").addClass("disabled");

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
                return this.each(function (i) {
                    var $select = $(this),
                        $sod    = $select.parent();

                    // Check for the SoD
                    if ( $sod.hasClass("sod_select") ) {
                        if ( typeof $value !== "undefined" ) { // Enable option/optgroup

                            // Enables the option (and possible children if optgroup) in the SoD
                            $sod.find("ul:first li[data-value='" + $value + "']").removeClass("disabled");
                            $sod.find("ul:first li[data-label='" + $value + "']").nextUntil(":not(.groupchild)").removeClass("disabled");

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
