/*
 * Chained - jQuery / Zepto chained selects plugin
 *
 * Copyright (c) 2010-2017 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   http://www.appelsiini.net/projects/chained
 *
 * Version: 2.0.0-beta.2
 *
 */

;(function($, window, document, undefined) {
    "use strict";

    $.fn.chained = function(parentSelector) {
        return this.each(function() {

            /* Save this to child because this changes when scope changes. */
            var child   = this;
            var backup = $(child).clone();

            /* Handles maximum two parents now. */
            $(parentSelector).each(function() {
                $(this).bind("change", function() {
                    updateChildren();
                });

                /* Force IE to see something selected on first page load, */
                /* unless something is already selected */
                if (!$("option:selected", this).length) {
                    $("option", this).first().attr("selected", "selected");
                }

                /* Force updating the children. */
                updateChildren();
            });

            function updateChildren() {
                var triggerChange = true;
                var currentlySelectedValue = $("option:selected", child).val();

                $(child).html(backup.html());

                /* If multiple parents build value like foo+bar. */
                var selected = "";
                $(parentSelector).each(function() {
                    var selectedValue = $("option:selected", this).val();
                    if (selectedValue) {
                        if (selected.length > 0) {
                            selected += "+";
                        }
                        selected += selectedValue;
                    }
                });

                /* Also check for first parent without subclassing. */
                /* TODO: This should be dynamic and check for each parent */
                /*       without subclassing. */
                var first;
                if ($.isArray(parentSelector)) {
                    first = $(parentSelector[0]).first();
                } else {
                    first = $(parentSelector).first();
                }
                var selectedFirst = $("option:selected", first).val();

                $("option", child).each(function() {
                    /* Always leave the default value in place. */
                    if ($(this).val() === "") {
                        return;
                    }
                    var matches = [];
                    var data = $(this).data("chained");
                    if (data) {
                        matches = data.split(" ");
                    }
                    if ((matches.indexOf(selected) > -1) || (matches.indexOf(selectedFirst) > -1)) {
                        if ($(this).val() === currentlySelectedValue) {
                            $(this).prop("selected", true);
                            triggerChange = false;
                        }
                    } else {
                        $(this).remove();
                    }
                });

                /* If we have only the default value disable select. */
                if (1 === $("option", child).length && $(child).val() === "") {
                    $(child).prop("disabled", true);
                } else {
                    $(child).prop("disabled", false);
                }
                if (triggerChange) {
                    $(child).trigger("change");
                }
            }
        });
    };

    /* Alias for those who like to use more English like syntax. */
    $.fn.chainedTo = $.fn.chained;

    /* Default settings for plugin. */
    $.fn.chained.defaults = {};

})(window.jQuery || window.Zepto, window, document);
