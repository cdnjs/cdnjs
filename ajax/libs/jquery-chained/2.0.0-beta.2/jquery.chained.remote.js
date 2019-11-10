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

    $.fn.remoteChained = function(options) {

        var settings = $.extend({}, $.fn.remoteChained.defaults, options);

        /* Loading text always clears the select. */
        if (settings.loading) {
            settings.clear = true;
        }

        return this.each(function() {

            /* Save this to self because this changes when scope changes. */
            var self = this;
            var request = false; /* Track xhr requests. */

            $(settings.parents).each(function() {
                $(this).bind("change", function() {

                    /* Build data array from parents values. */
                    var data = {};
                    $(settings.parents).each(function() {
                        var id = $(this).attr(settings.attribute);
                        var value = ($(this).is("select") ? $(":selected", this) : $(this)).val();
                        data[id] = value;

                        /* Optionally also depend on values from these inputs. */
                        if (settings.depends) {
                            $(settings.depends).each(function() {
                                /* Do not include own value. */
                                if (self !== this) {
                                    var id = $(this).attr(settings.attribute);
                                    var value = $(this).val();
                                    data[id] = value;
                                }
                            });
                        }
                    });

                    /* If previous request running, abort it. */
                    /* TODO: Probably should use Sinon to test this. */
                    if (request && $.isFunction(request.abort)) {
                        request.abort();
                        request = false;
                    }

                    if (settings.clear) {
                        if (settings.loading) {
                            /* Clear the select and show loading text. */
                            build.call(self, {"" : settings.loading});
                        } else {
                            /* Clear the select. */
                            $("option", self).remove();
                        }

                        /* Force updating the children to clear too. */
                        $(self).trigger("change");
                    }

                    request = $.getJSON(settings.url, data, function(json) {
                        json = settings.data(json);
                        build.call(self, json);
                        /* Force updating the children. */
                        $(self).trigger("change");
                    });
                });

                /* If we have bootstrapped data given in options. */
                if (settings.bootstrap) {
                    build.call(self, settings.bootstrap);
                    settings.bootstrap = null;
                }
            });

            /* Build the select from given data. */
            function build(json) {
                /* If select already had something selected, preserve it. */
                var selectedKey = $(":selected", self).val();

                /* Clear the select. */
                $("option", self).remove();

                if ($.isArray(json)) {
                    /* Add new options from json which is an array of objects. */
                    /* [ {"":"--"},{"series-1":"1 series"},{"series-3"}:{"3 series"}] */
                    $.each(json, function(key, value) {
                        $.each(value, function(key, value) {
                            if ("selected" === key) {
                                selectedKey = value;
                            } else {
                                var option = $("<option />").val(key).append(value);
                                $(self).append(option);
                            }
                        });
                    });
                } else {
                    /* Add new options from json which is an object. */
                    /* {"":"--","series-1":"1 series","series-3":"3 series"} */
                    $.each(json, function(key, value) {
                        if (json.hasOwnProperty(key)) {
                            /* Set the selected option from JSON. */
                            if ("selected" === key) {
                                selectedKey = value;
                            } else {
                                var option = $("<option />").val(key).append(value);
                                $(self).append(option);
                            }
                        }
                    });
                }

                /* Loop option again to set selected. IE needed this... */
                $(self).children().each(function() {
                    if ($(this).val() === selectedKey + "") {
                        $(this).attr("selected", "selected");
                    }
                });

                /* If we have only the default value disable select. */
                if (1 === $("option", self).length && $(self).val() === "") {
                    $(self).prop("disabled", true);
                } else {
                    $(self).prop("disabled", false);
                }
            }
        });
    };

    /* Alias for those who like to use more English like syntax. */
    $.fn.remoteChainedTo = $.fn.remoteChained;

    /* Default settings for plugin. */
    $.fn.remoteChained.defaults = {
        attribute: "name",
        depends: null,
        bootstrap: null,
        loading: null,
        clear: false,
        data: function(json) { return json; }
    };

})(window.jQuery || window.Zepto, window, document);
