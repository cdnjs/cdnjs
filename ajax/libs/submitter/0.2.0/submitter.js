/*!
 * Submitter v0.2.1
 * https://github.com/fengyuanchen/submitter
 *
 * Copyright 2014 Fengyuan Chen
 * Released under the MIT license
 */

(function(factory) {
    if (typeof define === "function" && define.amd) {
        // AMD. Register as anonymous module.
        define(["jquery"], factory);
    } else {
        // Browser globals.
        factory(jQuery);
    }
}(function($) {

    "use strict";

    var Submitter = function(form, options) {
            options = $.isPlainObject(options) ? options : {};
            this.$form = $(form);
            this.defaults = $.extend(true, {}, Submitter.defaults, options);
            this.init();
        };

    Submitter.prototype = {
        constructor: Submitter,

        support: {
            formData: !!window.FormData
        },

        init: function() {
            var url = this.defaults.ajaxOptions.url || this.defaults.url || this.$form.attr("action") || "",
                settings,
                defaults,
                $submit,
                $reset;

            if (!url) {
                return;
            }

            $submit = this.$form.find(":submit");

            this.url = url;

            defaults = {
                type: this.$form.attr("method") || "GET"
            };

            settings = {
                beforeSend: $.proxy(this.start, this),
                success: $.proxy(this.done, this),
                error: $.proxy(this.fail, this),
                complete: $.proxy(this.end, this)
            };

            this.ajaxOptions = $.extend({}, defaults, this.defaults.ajaxOptions, settings);

            if (!this.defaults.async) {
                this.initIframe();
            }

            if (this.$form.find(":file").length > 0 && !this.support.formData) {
                this.defaults.async = false;
                this.initIframe();
            }

            if ($submit.length === 0) {
                $submit = $("<button type=\"submit\" style=\"display:none;\">Submit</button>");
                this.$form.append($submit);
            }

            this.$submit = $submit;

            if (this.defaults.resetAfterDone) {
                $reset = this.$form.find(":reset");

                if ($reset.length === 0) {
                    $reset = $("<button type=\"reset\" style=\"display:none;\">Reset</button>");
                    this.$form.append($reset);
                }

                this.$reset = $reset;
            }

            this.formTarget = this.$form.attr("target");

            this.enable();
        },

        enable: function() {
            this.$form.on("submit", $.proxy(this.submit, this));
        },

        disable: function() {
            this.$form.attr("target", this.formTarget).off(this.submit);
            this.$form = null;

            if (this.$iframe) {
                this.$iframe.off("load").remove();
                this.$iframe = null;
            }

            this.$submit = null;
            this.$reset = null;
            this.ajaxOptions = null;
            this.defaults = null;
        },

        submit: function() {
            if (!this.defaults.isValidated()) {
                return false;
            }

            if (!this.defaults.async) {
                this.start(null); // submit by iframe
            } else {
                this.ajaxSubmit(); // submit by ajax
                return false;
            }
        },

        start: function() {
            this.$submit.prop("disabled", true);

            if ($.isFunction(this.defaults.start)) {
                this.defaults.start("submitStart");
            }

            if ($.isFunction(this.defaults.ajaxOptions.beforeSend)) {
                this.defaults.ajaxOptions.beforeSend(arguments);
            }
        },

        done: function(data) {
            if ($.isFunction(this.defaults.done)) {
                this.defaults.done(data, "submitSuccess");
            }

            if ($.isFunction(this.defaults.ajaxOptions.success)) {
                this.defaults.ajaxOptions.success(arguments);
            }

            if (this.defaults.resetAfterDone && this.$reset) {
                this.$reset.click();
            }
        },

        fail: function() {
            if ($.isFunction(this.defaults.fail)) {
                this.defaults.fail("submitError");
            }

            if ($.isFunction(this.defaults.ajaxOptions.error)) {
                this.defaults.ajaxOptions.error(arguments);
            }
        },

        end: function() {
            this.$submit.prop("disabled", false);

            if ($.isFunction(this.defaults.end)) {
                this.defaults.end("submitComplete");
            }

            if ($.isFunction(this.defaults.ajaxOptions.complete)) {
                this.defaults.ajaxOptions.complete(arguments);
            }
        },

        ajaxSubmit: function() {
            var ajaxOptions = $.extend({}, this.ajaxOptions);

            if (this.support.formData) {
                ajaxOptions.data = new FormData(this.$form[0]);
                ajaxOptions.type = "POST";
                ajaxOptions.processData = false;
                ajaxOptions.contentType = false;
            } else {
                ajaxOptions.data = this.$form.serialize();
            }

            $.ajax(this.url, ajaxOptions);
        },

        initIframe: function() {
            var iframeName = "submitter-" + Math.random().toString().replace("0.", ""),
                $iframe = $("<iframe name=\"" + iframeName + "\" style=\"display:none;\"></iframe>"),
                that = this;

            $iframe.on("load", function() {
                var data,
                    win,
                    doc;

                try {
                    win = this.contentWindow;
                    doc = this.contentDocument;

                    doc = doc ? doc : win.document;
                    data = doc ? doc.body.innerText : null;
                    data = typeof data === "string" ? $.parseJSON(data) : data;
                } catch (e) {
                    // throw new Error(e.message);
                    that.fail(null, "submitError", e.message);
                }

                if (!data) {
                    return;
                }

                if ($.isPlainObject(data)) {
                    that.done(data, "submitSuccess", null);
                } else {
                    that.fail(null, "submitError", "The response data must be JSON.");
                }

                that.end(null, "submitComplete");
            });

            if (this.defaults.ajaxOptions.type) {
                this.$form.attr("method", this.defaults.ajaxOptions.type);
            }

            this.$form.attr("target", iframeName).after($iframe);
            this.$iframe = $iframe;
        }
    };

    Submitter.defaults = {
        async: true,
        resetAfterDone: false,
        url: undefined,

        ajaxOptions: {
            dataType: "json"
        },

        messages: {
            start: "Submit start.",
            done: "Submit done.",
            fail: "Submit fail.",
            end: "Submit end."
        },

        isValidated: function() {
            // prevent to submit form, return "true" to submit and "false" to cancel
            return true;
        },

        start: function(/* textStatus */) {
            // console.log(this.messages.start);
        },

        done: function(/* data, textStatus */) {
            // console.log(this.messages.done);
        },

        fail: function(/* textStatus */) {
            // console.log(this.messages.fail);
        },

        end: function(/* textStatus */) {
            // console.log(this.messages.end);
        }
    };

    Submitter.setDefaults = function(options) {
        $.extend(Submitter.defaults, options);
    };

    // Register as jQuery plugin
    $.fn.submitter = function(options) {
        return this.each(function() {
            $(this).data("submitter", new Submitter(this, options));
        });
    };

    $.fn.submitter.Constructor = Submitter;
    $.fn.submitter.setDefaults = Submitter.setDefaults;

}));
