/*!
 * Guards JavaScript jQuery Plugin v1.5.1
 * https://github.com/on-site/guards.js
 *
 * Copyright 2010-2015, On-Site.com, http://www.on-site.com/
 * Licensed under the MIT license.
 *
 * Includes code for email and phone number validation from the jQuery
 * Validation plugin.  http://docs.jquery.com/Plugins/Validation
 *
 * Date: Tue Jan 13 17:54:45 2015 -0800
 */

/**
 * This plugin is initially inspired by the standard Validation jQuery
 * plugin (http://plugins.jquery.com/validation/).
 */
(function($) {
    /*jshint devel:true, jquery:true */
    "use strict";

    /**
     * @page Global Functions
     * @section guard
     * @signature jQuery.guard(selector)
     * @since 1.0.0
     *
     * <p>
     *   Guard elements with the given selector when the form is guarded.  This is the way to add
     *   new guards to form inputs.  It returns a <a href="guard_type.html"><code>Guards</code></a>
     *   instance which has chainable methods to define the attributes of the guard.
     * </p>
     *
     * <div class="example">
     *   <div class="display">
     *     <script>
     *       $.guard(".guarded").using("required").message("Please provide a value.");
     *     </script>
     *
     *     <p>
     *       <input class="guarded" type="text" /><br />
     *       <small>Required field</small>
     *     </p>
     *   </div>
     * </div>
     */
    $.guard = function(selector) {
        return $.guards.add(selector);
    };

    $.guard.version = "1.5.1";

    $.Guards = function() {
        var self = this;
        this._guards = [];
        this.named = {};

        this.options = {
            stackErrors: false
        };

        this.constants = {
            notChecked: ""
        };

        this.defaults = {
            grouped: false,
            guard: "required",
            invalidClass: "invalid-field",

            liveCallback: function(e) {
                var $element = $(e.target);

                if (!$element.is(":guardable")) {
                    return;
                }

                $element.clearErrors();

                self.applyGuards(function(guard) {
                    if (guard.isGrouped()) {
                        if (guard.appliesTo($element)) {
                            return self.parentContext($element).find(":guardable");
                        } else {
                            return false;
                        }
                    } else {
                        return $element;
                    }
                });
            },

            messageClass: "error-message",

            messages: {
                "undefined": "Please fix this field."
            },

            style: {
                field: {
                    "background-color": "#ffff66"
                },

                message: {
                    color: "#ff0000",
                    "margin-left": "10px"
                }
            },

            submitCallback: function() { return self.guard($(this)); },
            tag: "span",

            target: function(errorElement) {
                var last = $(this).filter(":last");

                if (last.is(":radio,:checkbox") && last[0].nextSibling) {
                    last = $(last[0].nextSibling);
                }

                var next = last.next();

                while (next.size() > 0 && next[0].isGuardError) {
                    last = next;
                    next = last.next();
                }

                errorElement.insertAfter(last);
                return false;
            }
        };

        /**
         * @page Named Guards
         * @section allow
         * @since 1.0.0
         *
         * <p>
         *   Only values found in the given list are considered valid.  Anything else triggers a failure.
         *   This guard <strong>requires</strong> an array parameter of the valid values.
         * </p>
         *
         * <div class="example">
         *   <div class="display">
         *     <script>
         *       $.guard(".primary-color").using("allow", ["red", "yellow", "blue"]);
         *     </script>
         *
         *     <p>
         *       <input class="primary-color" type="text" /><br />
         *       <small>Allowed values: red, yellow, blue</small>
         *     </p>
         *   </div>
         * </div>
         *
         * <p>
         *   As of version 1.3.1, the allowed words can be specified via an object with a string property
         *   named <code>words</code> delimited by spaces by default, or delimited with the
         *   <code>delimiter</code> property.  This is primarily to support the <a href="data_attributes.html">data attributes</a>
         *   form of guards.
         * </p>
         *
         * <div class="example">
         *   <div class="display">
         *     <script>
         *       $.guard(".primary-color-2").using("allow", { words: "red yellow blue" });
         *       $.guard(".country").using("allow", { words: "United States,Canada", delimiter: "," });
         *     </script>
         *
         *     <p>
         *       <input class="primary-color" type="text" /><br />
         *       <small>Allowed values: red, yellow, blue</small>
         *     </p>
         *
         *     <p>
         *       <input class="country" type="text" /><br />
         *       <small>Allowed values: United States, Canada</small>
         *     </p>
         *   </div>
         * </div>
         */
        this.name("allow").using(this.aggregate(this.isAllValid, this.isAllowed)).message(this.wordsArrayMessage("Please enter one of: #{0}."));

        /**
         * @page Named Guards
         * @section always
         * @since 1.0.0
         *
         * <p>
         *   Always fail, no matter what.  For this guard to pass, either the guard must be removed, or
         *   the element(s) guarded must be removed.  No parameters are accepted.
         * </p>
         *
         * <div class="example">
         *   <div class="display">
         *     <script>
         *       $.guard(".always").using("always");
         *     </script>
         *
         *     <p>
         *       <input class="always" type="text" /><br />
         *       <small>Always fails, no matter what</small>
         *     </p>
         *   </div>
         * </div>
         */
        this.name("always").using(this.aggregate(this.isAllValid, this.always)).message("There was an error.");

        /**
         * @page Named Guards
         * @section different
         * @since 1.0.0
         *
         * <p>
         *   This is a grouped guard where every field must have a different value.
         * </p>
         *
         * <div class="example">
         *   <div class="display">
         *     <script>
         *       $.guard(".unique").using("different");
         *     </script>
         *
         *     <p>
         *       <input class="unique" type="text" value="Unique Required" /><br />
         *       <input class="unique" type="text" value="Unique Required" /><br />
         *       <small>Each value must be unique</small>
         *     </p>
         *   </div>
         * </div>
         */
        this.name("different").grouped().using(this.aggregate(this.passThrough, this.isDifferent)).message("These values must all be different.");

        /**
         * @page Named Guards
         * @section disallow
         * @since 1.0.0
         *
         * <p>
         *   Guard against specific values.  This guard <strong>requires</strong> an array parameter
         *   of the invalid values.
         * </p>
         *
         * <div class="example">
         *   <div class="display">
         *     <script>
         *       $.guard(".not-primary-color").using("disallow", ["red", "yellow", "blue"]);
         *     </script>
         *
         *     <p>
         *       <input class="not-primary-color" type="text" value="red" /><br />
         *       <small>Disallowed values: red, yellow, blue</small>
         *     </p>
         *   </div>
         * </div>
         *
         * <p>
         *   As of version 1.3.1, the disallowed words can be specified via an object with a string property
         *   named <code>words</code> delimited by spaces by default, or delimited with the
         *   <code>delimiter</code> property.  This is primarily to support the <a href="data_attributes.html">data attributes</a>
         *   form of guards.
         * </p>
         *
         * <div class="example">
         *   <div class="display">
         *     <script>
         *       $.guard(".not-primary-color-2").using("disallow", { words: "red yellow blue" });
         *       $.guard(".not-country").using("disallow", { words: "United States,Canada", delimiter: "," });
         *     </script>
         *
         *     <p>
         *       <input class="not-primary-color-2" type="text" /><br />
         *       <small>Disallowed values: red, yellow, blue</small>
         *     </p>
         *
         *     <p>
         *       <input class="not-country" type="text" /><br />
         *       <small>Disallowed values: United States, Canada</small>
         *     </p>
         *   </div>
         * </div>
         */
        this.name("disallow").using(this.aggregate(this.isAllValid, this.isDisallowed)).message(this.wordsArrayMessage("Please don't enter: #{0}."));

        /**
         * @page Named Guards
         * @section dateUS
         * @since 1.1.0
         *
         * <p>
         *   Guard for a US date.  Month and day value validations
         *   exist, though may not conver all invalid dates (so,
         *   13/32/2013 is invalid, but 2/31/2013 might not properly
         *   fail at this point in time).  An empty value is
         *   considered valid.
         * </p>
         *
         * <div class="example">
         *   <div class="display">
         *     <script>
         *       $.guard(".date").using("dateUS");
         *     </script>
         *
         *     <p>
         *       <input class="date" type="text" value="not valid" /><br />
         *       <small>US date of any value</small>
         *     </p>
         *   </div>
         * </div>
         */
        this.name("dateUS").using(this.aggregate(this.isAllValid, this.isValidDateUS)).message("Please use: dd/mm/yyyy.");

        /**
         * @page Named Guards
         * @section timeUS
         * @since 1.1.0
         *
         * <p>
         *   Guard for a US time.  Military time is not currently
         *   supported.  An empty value is considered valid.
         * </p>
         *
         * <div class="example">
         *   <div class="display">
         *     <script>
         *       $.guard(".time").using("timeUS");
         *     </script>
         *
         *     <p>
         *       <input class="time" type="text" value="not valid" /><br />
         *       <small>US time of any value</small>
         *     </p>
         *   </div>
         * </div>
         */
        this.name("timeUS").using(this.aggregate(this.isAllValid, this.isValidTimeUS)).message("Please use: hh:mm&nbsp;am/pm.");

        /**
         * @page Named Guards
         * @section email
         * @since 1.0.0
         *
         * <p>
         *   Guard for a valid email address.  An empty value is ignored, so only once a value exists will
         *   this guard start checking for an email address.  An optional argument of
         *   <code>{ allowDisplay: true }</code> is allowed that may specify whether display emails of the
         *   form <code>John Doe &lt;john@example.com&gt;</code> are allowed.
         * </p>
         *
         * <div class="example">
         *   <div class="display">
         *     <script>
         *       $.guard(".email1").using("email");
         *       $.guard(".email2").using("email", { allowDisplay: true });
         *     </script>
         *
         *     <p>
         *       <input class="email1" type="text" value="invalid" /><br />
         *       <small>Email address of the form "john@example.com"</small>
         *     </p>
         *
         *     <p>
         *       <input class="email2" type="text" value="Still &lt;invalid&gt;" /><br />
         *       <small>Email address of the form "John Doe &lt;john@example.com&gt;"</small>
         *     </p>
         *   </div>
         * </div>
         */
        this.name("email").using(this.aggregate(this.isAllValid, this.isValidEmail)).message("Please enter a valid email address.");

        /**
         * @page Named Guards
         * @section float
         * @since 1.0.0
         *
         * <p>
         *   Guard for a floating point number.  Optionally, an object parameter may be passed with
         *   <code>min</code> and/or <code>max</code>.  Min will restrict the minimum value, while
         *   max restricts the maximum.  An empty value is considered valid.
         * </p>
         *
         * <div class="example">
         *   <div class="display">
         *     <script>
         *       $.guard(".float1").using("float");
         *       $.guard(".float2").using("float", { min: -5.5 });
         *       $.guard(".float3").using("float", { max: 42.0 });
         *       $.guard(".float4").using("float", { min: 0.0, max: 10.0 });
         *     </script>
         *
         *     <p>
         *       <input class="float1" type="text" value="not valid" /><br />
         *       <small>A number of any value</small>
         *     </p>
         *
         *     <p>
         *       <input class="float2" type="text" value="-10.5" /><br />
         *       <small>A number no smaller than -5.5</small>
         *     </p>
         *
         *     <p>
         *       <input class="float3" type="text" value="64.32" /><br />
         *       <small>A number no bigger than 42</small>
         *     </p>
         *
         *     <p>
         *       <input class="float4" type="text" value="11" /><br />
         *       <small>A number from 0 to 10</small>
         *     </p>
         *   </div>
         * </div>
         */
        this.name("float").using(this.aggregate(this.isAllValid, this.isValidFloat)).message(this.minMaxMessage({
            minAndMax: "Please enter a number from #{0} to #{1}.",
            min: "Please enter a number no less than #{0}.",
            max: "Please enter a number no greater than #{0}.",
            invalid: "Please enter a number."
        }));

        /**
         * @page Named Guards
         * @section int
         * @since 1.0.0
         *
         * <p>
         *   Guard for an integer number.  Optionally, an object parameter may be passed with
         *   <code>min</code> and/or <code>max</code>.  Min will restrict the minimum value, while
         *   max restricts the maximum.  An empty value is considered valid.
         * </p>
         *
         * <div class="example">
         *   <div class="display">
         *     <script>
         *       $.guard(".int1").using("int");
         *       $.guard(".int2").using("int", { min: -5 });
         *       $.guard(".int3").using("int", { max: 42 });
         *       $.guard(".int4").using("int", { min: 0, max: 10 });
         *     </script>
         *
         *     <p>
         *       <input class="int1" type="text" value="not valid" /><br />
         *       <small>An integer of any value</small>
         *     </p>
         *
         *     <p>
         *       <input class="int2" type="text" value="-10.5" /><br />
         *       <small>An integer no smaller than -5</small>
         *     </p>
         *
         *     <p>
         *       <input class="int3" type="text" value="64.32" /><br />
         *       <small>An integer no bigger than 42</small>
         *     </p>
         *
         *     <p>
         *       <input class="int4" type="text" value="11" /><br />
         *       <small>An integer from 0 to 10</small>
         *     </p>
         *   </div>
         * </div>
         */
        this.name("int").using(this.aggregate(this.isAllValid, this.isValidInt)).message(this.minMaxMessage({
            minAndMax: "Please enter a number from #{0} to #{1}.",
            min: "Please enter a number no less than #{0}.",
            max: "Please enter a number no greater than #{0}.",
            invalid: "Please enter a number."
        }));

        /**
         * @page Named Guards
         * @section moneyUS
         * @since 1.0.0
         *
         * <p>
         *   Guard for a US dollar amount.  Optionally, an object parameter may be passed with
         *   <code>min</code> and/or <code>max</code>.  Min will restrict the minimum value, while
         *   max restricts the maximum.  An empty value is considered valid.
         * </p>
         *
         * <div class="example">
         *   <div class="display">
         *     <script>
         *       $.guard(".money1").using("moneyUS");
         *       $.guard(".money2").using("moneyUS", { min: -5.50 });
         *       $.guard(".money3").using("moneyUS", { max: 42.02 });
         *       $.guard(".money4").using("moneyUS", { min: 0, max: 10 });
         *     </script>
         *
         *     <p>
         *       <input class="money1" type="text" value="not valid" /><br />
         *       <small>US money of any value</small>
         *     </p>
         *
         *     <p>
         *       <input class="money2" type="text" value="-$10.55" /><br />
         *       <small>US money no smaller than -$5.50</small>
         *     </p>
         *
         *     <p>
         *       <input class="money3" type="text" value="$64.32" /><br />
         *       <small>US money no bigger than $42.02</small>
         *     </p>
         *
         *     <p>
         *       <input class="money4" type="text" value="$11" /><br />
         *       <small>US money from $0 to $10</small>
         *     </p>
         *   </div>
         * </div>
         */
        this.name("moneyUS").using(this.aggregate(this.isAllValid, this.isValidMoneyUS)).message(this.minMaxMessage({
            minAndMax: "Please enter a dollar amount from #{0} to #{1}.",
            min: "Please enter a dollar amount no less than #{0}.",
            max: "Please enter a dollar amount no greater than #{0}.",
            invalid: "Please enter a dollar amount."
        }, function(x) { return x.toFixed(2); }));

        /**
         * @page Named Guards
         * @section never
         * @since 1.0.0
         *
         * <p>
         *   Never fail, no matter what.  For this guard to fail, it must be manually triggered via
         *   <a href="guard_type.html#triggerError"><code>guard.triggerError(selector)</code></a>.
         *   This guard can be useful for marking a field as having an error immediately when the page
         *   loads (such as for a server detected error).
         * </p>
         *
         * <div class="example">
         *   <div class="display">
         *     <script>
         *       var guard = $.guard(".never").using("never");
         *       $(function() { guard.triggerError(".never"); });
         *     </script>
         *
         *     <p>
         *       <input class="never" type="text" /><br />
         *       <small>Never fails, except manually</small>
         *     </p>
         *   </div>
         * </div>
         */
        this.name("never").using(this.aggregate(this.isAllValid, this.never)).message("There was an error.");

        /**
         * @page Named Guards
         * @section oneRequired
         * @since 1.0.0
         *
         * <p>
         *   This is a grouped guard where a single field of all the selected fields must have a value.
         * </p>
         *
         * <div class="example">
         *   <div class="display">
         *     <script>
         *       $.guard(".oneRequired").using("oneRequired");
         *     </script>
         *
         *     <p>
         *       <input class="oneRequired" type="text" value="" /><br />
         *       <input class="oneRequired" type="text" value="" /><br />
         *       <small>One value is required</small>
         *     </p>
         *   </div>
         * </div>
         */
        this.name("oneRequired").grouped().using(this.aggregate(this.isAnyValid, this.isPresent)).message("Specify at least one.");

        /**
         * @page Named Guards
         * @section phoneUS
         * @since 1.0.0
         *
         * <p>
         *   The guarded field is considered valid if no value is given, or if the value given appears
         *   to be a valid US phone number.  The number must include an area code.  Whitespace is ignored.
         * </p>
         *
         * <div class="example">
         *   <div class="display">
         *     <script>
         *       $.guard(".phone").using("phoneUS");
         *     </script>
         *
         *     <p>
         *       <input class="phone" type="text" value="555-1234" /><br />
         *       <small>A valid US phone number like (555) 555-1234</small>
         *     </p>
         *   </div>
         * </div>
         */
        this.name("phoneUS").using(this.aggregate(this.isAllValid, this.isValidPhoneUS)).message("Please enter a valid phone number.");

        /**
         * @page Named Guards
         * @section regex
         * @since 1.2.0
         *
         * <p>
         *   These guarded fields must match the provided regex to pass.  An empty value is considered valid.
         * </p>
         *
         * <div class="example">
         *   <div class="display">
         *     <script>
         *       $.guard(".regex1").using("regex", /^abc\d{1,3}$/);
         *     </script>
         *
         *     <p>
         *       <input class="regex1" type="text" /><br />
         *       <small>abc with 1-3 digits is required, like 'abc123'</small>
         *     </p>
         *   </div>
         * </div>
         *
         * <p>
         *   As of version 1.3.1, the regex can be specified via an object with a string property named
         *   <code>pattern</code>.  This is primarily to support the <a href="data_attributes.html">data attributes</a>
         *   form of guards.
         * </p>
         *
         * <div class="example">
         *   <div class="display">
         *     <script>
         *       $.guard(".regex2").using("regex", { pattern: "^abc\\d{1,3}$" });
         *     </script>
         *
         *     <p>
         *       <input class="regex2" type="text" /><br />
         *       <small>abc with 1-3 digits is required, like 'abc123'</small>
         *     </p>
         *   </div>
         * </div>
         */
        this.name("regex").using(this.aggregate(this.isAllValid, this.matchesRegex)).message("Please enter valid input.");

        /**
         * @page Named Guards
         * @section required
         * @since 1.0.0
         *
         * <p>
         *   These guarded fields must have a value to pass.  Only whitespace is not considered a value.
         *   If no named or custom guard is defined, this is the default guard used.
         * </p>
         *
         * <div class="example">
         *   <div class="display">
         *     <script>
         *       $.guard(".required1").using("required");
         *       $.guard(".required2");
         *     </script>
         *
         *     <p>
         *       <input class="required1" type="text" /><br />
         *       <small>A value is required</small>
         *     </p>
         *
         *     <p>
         *       <input class="required2" type="text" /><br />
         *       <small>A value is required</small>
         *     </p>
         *   </div>
         * </div>
         */
        this.name("required").using(this.aggregate(this.isAllValid, this.isPresent)).message("This field is required.");

        /**
         * @page Named Guards
         * @section same
         * @since 1.0.0
         *
         * <p>
         *   This is a grouped guard where every field must have the same value.  For example, this guard can
         *   be used to implement a password confirmation field.
         * </p>
         *
         * <div class="example">
         *   <div class="display">
         *     <script>
         *       $.guard(".same").using("same");
         *     </script>
         *
         *     <p>
         *       <input class="same" type="text" value="Same Required" /><br />
         *       <input class="same" type="text" value="The Same Required" /><br />
         *       <small>Each value must be the same</small>
         *     </p>
         *   </div>
         * </div>
         */
        this.name("same").grouped().using(this.aggregate(this.passThrough, this.isSame)).message("These values must all match.");

        /**
         * @page Named Guards
         * @section string
         * @since 1.0.0
         *
         * <p>
         *   Validate the length of the string provided.  This requires an object parameter with
         *   <code>min</code> and/or <code>max</code>.  Min will restrict the minimum length, while
         *   max restricts the maximum length.
         * </p>
         *
         * <div class="example">
         *   <div class="display">
         *     <script>
         *       $.guard(".string1").using("string", { min: 3 });
         *       $.guard(".string2").using("string", { max: 7 });
         *       $.guard(".string3").using("string", { min: 2, max: 4 });
         *     </script>
         *
         *     <p>
         *       <input class="string1" type="text" value="I" /><br />
         *       <small>A string with at lease 3 characters</small>
         *     </p>
         *
         *     <p>
         *       <input class="string2" type="text" value="Hello World" /><br />
         *       <small>A string with no more than 7 characters</small>
         *     </p>
         *
         *     <p>
         *       <input class="string3" type="text" value="Goodnight Moon" /><br />
         *       <small>A string with at least 2 characters and no more than 5</small>
         *     </p>
         *   </div>
         * </div>
         */
        this.name("string").using(this.aggregate(this.isAllValid, this.isValidString)).message(this.minMaxMessage({
            minAndMax: "Please enter a string with length #{0} to #{1}.",
            min: "Please enter a string with length at least #{0}.",
            max: "Please enter a string with length no greater than #{0}."
        }));
    };

    /**
     * @page Guards Type
     * @section version
     * @signature jQuery.guards.version
     * @since 1.0.0
     *
     * <p>
     *   This version of guards.js library as a string, like <code>"1.0.0"</code>.
     * </p>
     */
    $.Guards.prototype.version = "1.5.1";

    $.Guards.prototype.parentContext = function(element) {
        var $element = $(element);
        var context = $element.parents("form:first");

        if (context.size() === 0) {
            context = $element.parents("*:last");
        }

        return context;
    };

    /**
     * @page Guards Type
     * @section name
     * @signature jQuery.guards.name(guardName)
     * @since 1.0.0
     *
     * <p>
     *   Name a guard.  This behaves the same way as
     *   <a href="global_functions.html#guard"><code>$.guard(selector)</code></a>, except it uses
     *   the parameter to define a named guard with the given name, instead of defining a new
     *   guard affecting the given selector.  Any attributes applied to it will be passed on to
     *   any guards that utilize this named guard.  A named guard may be utilized by passing the
     *   name on to the <a href="guard_type.html#using"><code>using</code></a> method.
     * </p>
     *
     * <div class="example">
     *   <div class="display">
     *     <script>
     *       $.guards.name("notTest").using(function(value, element) {
     *         return value !== "test";
     *       }).message("Must not be test.");
     *       $.guard(".named").using("notTest");
     *     </script>
     *
     *     <p>
     *       <input class="named" type="text" value="test" /><br />
     *       <small>Anything except 'test'</small>
     *     </p>
     *   </div>
     * </div>
     */
    $.Guards.prototype.name = function(name) {
        var guard = new $.Guard({ guards: this, named: true, name: name });
        this.named[name] = guard;
        return guard;
    };

    $.Guards.prototype.aggregate = function(aggregator, validator) {
        var self = this;

        var result = function() {
            var args = $.makeArray(arguments);

            return function(value) {
                return aggregator.call(self, value, function(v) {
                    return validator.apply(self, $.merge([v], args));
                });
            };
        };

        result.acceptsArguments = true;
        return result;
    };

    $.Guards.prototype.wordsArrayMessage = function(formatting) {
        var self = this;
        var formattingFn = this.arrayMessage(formatting);

        return function(array) {
            array = self.getWordsArray(array);
            return formattingFn(array);
        };
    };

    $.Guards.prototype.arrayMessage = function(formatting) {
        var self = this;

        return function(array) {
            return self.format(formatting, $.map(array, function(x) { return $.trim("" + x); }).join(", "));
        };
    };

    $.Guards.prototype.minMaxMessage = function(formatting, minMaxFormat) {
        var self = this;

        return function(options) {
            if (self.isNullOrUndefined(options)) {
                options = {};
            }

            if (!$.isFunction(minMaxFormat)) {
                minMaxFormat = function(x) { return x; };
            }

            var minDefined = !self.isNullOrUndefined(options.min);
            var maxDefined = !self.isNullOrUndefined(options.max);

            if (minDefined && maxDefined) {
                return self.format(formatting.minAndMax, minMaxFormat(options.min), minMaxFormat(options.max));
            }

            if (minDefined) {
                return self.format(formatting.min, minMaxFormat(options.min));
            }

            if (maxDefined) {
                return self.format(formatting.max, minMaxFormat(options.max));
            }

            if (formatting.invalid) {
                return formatting.invalid;
            }

            return self.defaults.messages["undefined"];
        };
    };

    // Check if the name is valid as a data attribute based guard name
    $.Guards.prototype.isValidDataName = function(name) {
        return name && /^[a-zA-Z0-9_-]+$/.test(name);
    };

    // Alias for console.log, but check that such a thing exists.
    $.Guards.prototype.log = function(message) {
        if (console && console.log) {
            console.log(message);
        }
    };

    // Utility method to trigger live events, but works against any
    // jQuery version that supports live events.
    $.Guards.prototype.on = function(selector, event, callback) {
        if ($.fn.on) {
            $(document).on(event, selector, callback);
        } else if ($.fn.delegate) {
            $(document).delegate(selector, event, callback);
        } else {
            this.log("Could not bind event handlers, probably because jQuery is too old.");
        }
    };

    // Utility method to remove live events, but works against any
    // jQuery version that supports live events.
    $.Guards.prototype.off = function(selector, event, callback) {
        if ($.fn.off) {
            $(document).off(event, selector, callback);
        } else if ($.fn.undelegate) {
            $(document).undelegate(selector, event, callback);
        } else {
            this.log("Could not unbind event handlers, probably because jQuery is too old.");
        }
    };

    // Implementation of $.enableGuards(selector);
    $.Guards.prototype.enableGuards = function(selector) {
        this.on(selector, "submit", this.defaults.submitCallback);
    };

    // Implementation of $.disableGuards(selector);
    $.Guards.prototype.disableGuards = function(selector) {
        this.off(selector, "submit", this.defaults.submitCallback);
    };

    // Implementation of $.liveGuard(selector);
    $.Guards.prototype.liveGuard = function(selector) {
        this.enableGuards(selector);
        this.on(selector, "change blur", this.defaults.liveCallback);
    };

    // Implementation of $.disableLiveGuard(selector);
    $.Guards.prototype.disableLiveGuard = function(selector) {
        this.disableGuards(selector);
        this.off(selector, "change blur", this.defaults.liveCallback);
    };

    $.Guards.prototype.camelize = function(word) {
        // This code is from jQuery, but it is not a public function
        // so let's juse reuse it.
        return word.replace(/-([\da-z])/gi, function(_, letter) {
            return letter.toUpperCase();
        });
    };

    $.Guards.prototype.capitalize = function(word) {
        return word.substring(0, 1).toUpperCase() + word.substring(1, word.length);
    };

    /**
     * Format all arguments into the first argument.  This is a
     * convenience function similar to the C sprintf function, though
     * only with simple replacements.  Replacements are formatted like
     * #{i} where i is a zero based index into the additional
     * arguments passed in to format beyond the first.
     *
     * Additional parameters not used will be ignored.
     *
     * Including formatting requests for parameters that don't exist
     * will throw an exception.
     *
     * The first argument must be the string that needs to be
     * formatted.  Additional arguments are formatted into that
     * string.
     *
     * If any of the arguments to the format string include a string
     * that matches the #{i} format, the result could be erroneous.
     *
     * Example: $.guards.format("#{2} #{0} #{1}", "hello", "world", 3); // "3 hello world"
     * Example: $.guards.format("#{0} #{1}", "hello", "world", 3);      // "hello world".
     * Example: $.guards.format("#{2} #{0} #{1}", "hello", "world");    // throws exception
     */
    $.Guards.prototype.format = function() {
        var str = arguments[0];

        if (arguments.length > 1) {
            for (var i = 1; i < arguments.length; i++) {
                var regex = "\\#\\{" + (i - 1) + "\\}";
                str = str.replace(new RegExp(regex, "g"), arguments[i]);
            }
        }

        if (/\#\{\d+\}/.test(str)) {
            throw new Error("Unmatched formatting found!");
        }

        return str;
    };

    /**
     * @page Guards Type
     * @section style
     * @signature jQuery.guards.style([customStyling])
     * @since 1.0.0
     *
     * <p>
     *   Insert a style element to the document head that will style guard errors and invalid fields.
     *   This will default to styling <code>.invalid-field</code> with a background color of
     *   <code>#ffff66</code> and <code>.error-message</code> with a color of <code>#ff0000</code>
     *   and a left margin of <code>10px</code>.
     * </p>
     *
     * <p>
     *   There are 2 optional arguments for this method.  The first is an optional css scope to restrict
     *   the styling affects with.  The second is an object expected to contain a <code>field</code>
     *   and/or <code>message</code> property with css styles desired for that aspect of the styling.
     *   The <code>field</code> property will add styling for invalid fields while the <code>message</code>
     *   property will add styling for error messages.  The properties of these objects may contain any
     *   key that is a valid css attribute, with an appropriate value.
     * </p>
     *
     * <div class="example">
     *   <div class="display">
     *     <script>
     *       $.guards.style("#styled-fields", {
     *         message: {
     *           "color": "#ee0000",
     *           "font-weight": "bold"
     *         },
     *         field: {
     *           "background-color": "#ffe099"
     *         }
     *       });
     *
     *       $.guard(".styled-field").using("required");
     *     </script>
     *
     *     <p id="styled-fields">
     *       <input class="styled-field" type="text" />
     *     </p>
     *   </div>
     * </div>
     */
    $.Guards.prototype.style = function() {
        $("head").append(this.styleHtml.apply(this, arguments));
    };

    // Retrieve the style html as a string to use for the $.guards.style() function.
    // The documentation for that function applies to this as well.
    $.Guards.prototype.styleHtml = function() {
        var fieldStyle = {};
        var messageStyle = {};
        var fieldSelector = "." + this.defaults.invalidClass;
        var messageSelector = "." + this.defaults.messageClass;
        var selectorScope, styles;

        if (this.defaults.style && this.defaults.style.field) {
            fieldStyle = this.defaults.style.field;
        }

        if (this.defaults.style && this.defaults.style.message) {
            messageStyle = this.defaults.style.message;
        }

        if (arguments.length === 1) {
            if (typeof(arguments[0]) === "string") {
                selectorScope = arguments[0];
            } else {
                styles = arguments[0];
            }
        } else if (arguments.length === 2) {
            selectorScope = arguments[0];
            styles = arguments[1];
        }

        if (styles && styles.field) {
            fieldStyle = styles.field;
        }

        if (styles && styles.message) {
            messageStyle = styles.message;
        }

        var result = "<style>\n";

        var addStyles = function(selector, styles) {
            result += "  " + selector + " {";

            if (styles) {
                $.each(styles, function(key, value) {
                    result += " " + key + ": " + value +  ";";
                });
            }

            result += " }\n";
        };

        if (selectorScope) {
            fieldSelector = selectorScope + " " + fieldSelector;
            messageSelector = selectorScope + " " + messageSelector;
        }

        addStyles(fieldSelector, fieldStyle);
        addStyles(messageSelector, messageStyle);
        result += "</style>";
        return result;
    };

    /**
     * This guard test method is intended to always fail, thus it
     * returns false no matter what.
     */
    $.Guards.prototype.always = function() {
        return false;
    };

    /**
     * The given object will either already be an array, or will be an
     * object describing the array (a string words property with
     * implicitly " " delimiter, or an explicit delimiter property).
     */
    $.Guards.prototype.getWordsArray = function(obj) {
        if ($.type(obj) === "object" && !this.isNullOrUndefined(obj.words)) {
            return obj.words.split(obj.delimiter || " ");
        }

        if ($.type(obj) === "array") {
            return obj;
        }

        throw new Error("Invalid type, expecting array or object with words property and optional delimiter property, got " + $.type(obj));
    };

    /**
     * Return whether or not the value exists in the given allowed
     * list.  The allowed parameter must be an array of valid values.
     * Blank is considered invalid unless it exists in the list.
     * Whitespace is ignored.
     */
    $.Guards.prototype.isAllowed = function(value, allowed) {
        value = $.trim(value);
        allowed = this.getWordsArray(allowed);
        return $.inArray(value, $.map(allowed, function(x) { return $.trim("" + x); })) !== -1;
    };

    /**
     * If the given values is an array, this will return false if the
     * given fn returns false for any value in the array.  If the
     * given values is not an array, the result of calling the given
     * fn on that value is returned directly.
     *
     * Example: $.guards.isAllValid([true, false, true], function(x) { return x; }); // false
     * Example: $.guards.isAllValid(true, function(x) { return x; });                // true
     */
    $.Guards.prototype.isAllValid = function(values, fn) {
        if ($.isArray(values)) {
            var result = true;

            $.each(values, function(_, x) {
                if (!fn(x)) {
                    result = false;
                    return false;
                }
            });

            return result;
        }

        return fn(values);
    };

    /**
     * If the given values is an array, this will return true if the
     * given fn returns true for any value in the array.  If the given
     * values is not an array, the result of calling the given fn on
     * that value is returned directly.
     *
     * Example: $.guards.isAnyValid([false, false, true], function(x) { return x; }); // true
     * Example: $.guards.isAnyValid(false, function(x) { return x; });                // false
     */
    $.Guards.prototype.isAnyValid = function(values, fn) {
        if ($.isArray(values)) {
            var result = false;

            $.each(values, function(_, x) {
                if (fn(x)) {
                    result = true;
                    return false;
                }
            });

            return result;
        }

        return fn(values);
    };

    /**
     * Return true if the value is null, undefined, an empty string,
     * or a string of just spaces.
     */
    $.Guards.prototype.isBlank = function(value) {
        return this.isNullOrUndefined(value) || $.trim(value) === "";
    };

    /**
     * Return whether all the values in the given array are different.
     */
    $.Guards.prototype.isDifferent = function(values) {
        if (values.length < 2) {
            return true;
        }

        var found = {};
        var result = true;

        $.each(values, function(_, x) {
            if (found[x] === true) {
                result = false;
                return false;
            }

            found[x] = true;
        });

        return result;
    };

    /**
     * Return whether or not the value doesn't exist in the given
     * disallowed list.  The disallowed parameter must be an array of
     * invalid values.  Blank is considered valid unless it exists in
     * the list.  Whitespace is ignored.
     */
    $.Guards.prototype.isDisallowed = function(value, disallowed) {
        return !this.isAllowed(value, disallowed);
    };

    /**
     * Return true if the value is null or undefined.
     */
    $.Guards.prototype.isNullOrUndefined = function(value) {
        return value === null || value === undefined;
    };

    /**
     * Return the negation of calling isBlank(value).
     */
    $.Guards.prototype.isPresent = function(value) {
        return !this.isBlank(value);
    };

    /**
     * Return whether all the values in the given array are the same.
     */
    $.Guards.prototype.isSame = function(values) {
        if (values.length < 2) {
            return true;
        }

        var value = values[0];
        var result = true;

        $.each(values, function(_, x) {
            if (x !== value) {
                result = false;
                return false;
            }
        });

        return result;
    };

    /**
     * Return true if the given value is greater than or equal to
     * options.min (if options.min is defined) and less than or equal
     * to options.max (if options.max is defined).
     */
    $.Guards.prototype.isInRange = function(value, options) {
        if (this.isNullOrUndefined(options)) {
            options = {};
        }

        var bigEnough = this.isNullOrUndefined(options.min) || value >= options.min;
        var smallEnough = this.isNullOrUndefined(options.max) || value <= options.max;
        return bigEnough && smallEnough;
    };

    /**
     * Return whether or not the value is a valid integer.
     * Appropriate options are min, max, both or neither.  Blank is
     * valid as a number.
     */
    $.Guards.prototype.isValidInt = function(value, options) {
        value = $.trim(value);

        if (value === "") {
            return true;
        }

        if (!/^(-|\+)?\d+$/.test(value)) {
            return false;
        }

        value = parseInt(value, 10);
        return this.isInRange(value, options);
    };

    /**
     * Return whether or not the value is a valid float.  Appropriate
     * options are min, max, both or neither.  Blank is valid as a
     * number.
     */
    $.Guards.prototype.isValidFloat = function(value, options) {
        value = $.trim(value);

        if (value === "") {
            return true;
        }

        if (!/^(-|\+)?(\d+)?\.?\d+$/.test(value)) {
            return false;
        }

        value = parseFloat(value);
        return this.isInRange(value, options);
    };

    /**
     * Validates the given value is a valid US money value.  It
     * optionally accepts min and max to specify the minimum or
     * maximum values.  Blank is a valid money.
     */
    $.Guards.prototype.isValidMoneyUS = function(value, options) {
        value = $.trim(value);

        if (value === "") {
            return true;
        }

        if (!/^\$?(-|\+)?\$?([\d,]+)?\.?\d+$/.test(value)) {
            return false;
        }

        // Only allow 1 $.
        var $i = value.indexOf("$");
        if ($i >= 0 && value.indexOf("$", $i + 1) >= 0) {
            return false;
        }

        // Ensure if there are commas they are every 3 digits
        if (value.indexOf(",") >= 0 && !/^\$?(-|\+)?\$?[1-9]\d{0,2}(,\d{3,3})+(\.\d+)?$/.test(value)) {
            return false;
        }

        // Ensure no more than 2 digits after decimal
        if (value.indexOf(".") >= 0 && /\.\d{3,}$/.test(value)) {
            return false;
        }

        value = parseFloat(value.replace(/[\$,]/g, ""));
        return this.isInRange(value, options);
    };

    /**
     * Validates for a valid US date.
     */
    $.Guards.prototype.isValidDateUS = function(value) {
        value = $.trim(value);

        if (value === "") {
            return true;
        }

        return /^(0?[1-9]|1[0-2])\/(0?[1-9]|[1-2]\d|3[0-1])\/(\d{3}\d+)$/.test(value);
    };

    /**
     * Validates for a valid US time.
     */
    $.Guards.prototype.isValidTimeUS = function(value) {
        value = $.trim(value);

        if (value === "") {
            return true;
        }

        return /^(0?[1-9]|1[0-2]):([0-5]\d)\s*(a|p)m$/i.test(value);
    };

    /**
     * Validates the given value is a valid email.  If options is
     * passed with allowDisplay as true, display emails will be
     * considered valid.  A display email differs from a regular email
     * in that it can be contained with < and > with some text ahead
     * of that.  Thus "John Doe <jdoe@example.com>" would be valid.
     */
    $.Guards.prototype.isValidEmail = function(value, options) {
        if (options && options.allowDisplay) {
            var result = /.*<([^>]+)>\s*$/.exec(value);

            if (result) {
                value = result[1];
            }
        }

        return value === "" || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(value);
    };

    /**
     * Validates the given value is a valid US phone number.
     */
    $.Guards.prototype.isValidPhoneUS = function(value) {
        value = value.replace(/\s+/g, "");
        return value === "" || value.length > 9 &&
              value.match(/^(1-?)?(\([2-9]\d{2}\)|[2-9]\d{2})-?[2-9]\d{2}-?\d{4}$/);
    };

    /**
     * Return whether or not the value is a valid string.  Appropriate
     * options are min or max (or both).  Whitespace is not
     * considered.
     */
    $.Guards.prototype.isValidString = function(value, options) {
        value = $.trim(value);
        return this.isValidInt("" + value.length, options);
    };

    /**
     * Validates the given value matches the given regex.
     */
    $.Guards.prototype.matchesRegex = function(value, regex) {
        if ($.type(regex) === "object" && regex.pattern) {
            regex = new RegExp(regex.pattern);
        }

        if ($.type(regex) !== "regexp") {
            throw new Error("The regex must be provided as an option!");
        }

        return value === "" || regex.test(value);
    };

    /**
     * This guard test method is intended to never fail, thus it
     * returns true no matter what.  It is intended to be used to set
     * up a guard that is triggered manually via triggerError().
     */
    $.Guards.prototype.never = function() {
        return true;
    };

    /**
     * This is a utility function to act like isAnyValid or
     * isAllValid, except instead of aggregating the function results,
     * it passes the arguments on to the function and returns the
     * results.  It makes the argument an array always.
     *
     * Example: $.guards.passThrough([true, false, true], function(x) { return x[1]; }); // false
     * Example: $.guards.passThrough(true, function(x) { return x[0]; });                // true
     */
    $.Guards.prototype.passThrough = function(values, fn) {
        if (!$.isArray(values)) {
            values = [values];
        }

        return fn(values);
    };

    /**
     * Guard all elements with the specified jQuery selector.  Using
     * is implicitly called with $.guards.defaults.guard, which
     * defaults to "required".  Note that it is simpler to use
     * $.guard(selector) instead of $.guards.add(selector).
     *
     * Example: $.guards.add(".validPhone").using("phoneUS");
     * Example: $.guards.add(".custom").using(function(value, element) {
     *            return value !== "invalid";
     *          }).message("Don't use the keyword 'invalid'.");
     * Example: $.guards.add(".custom").grouped().using(function(values, elements) {
     *            return $.inArray("invalid", values) == -1;
     *          }).target("#custom-error-location").tag("div")
     *              .message("Don't use the keyword 'invalid'.");
     */
    $.Guards.prototype.add = function(selector) {
        var guard = new $.Guard({ selector: selector, guards: this });
        this._guards.push(guard);
        return guard;
    };

    /**
     * Clear all errors on the form's guard fields, then invoke each
     * guard on the fields in order and guard them, adding errors
     * along the way as needed.  Once done, focus the first visible
     * field with an error.
     */
    $.Guards.prototype.guard = function(form) {
        var fields = form.guardableFields().clearErrors();
        var result = this.applyGuards(function() { return fields; });
        fields.filter(":visible:has-error").eq(0).focus();
        return result;
    };

    /**
     * Apply all the guards to the fields returned from the given
     * callback.  The callback will receive the guard, and is expected
     * to return the fields to guard against.  If it returns false,
     * that guard is skipped and does not affect the return value.
     */
    $.Guards.prototype.applyGuards = function(callback) {
        var result = true;
        var self = this;

        $.each(this._guards, function(_, guard) {
            var fields = callback(guard);

            if (fields !== false && !self.test(guard, fields)) {
                result = false;
            }
        });

        $.each(this.named, function(_, guard) {
            var fields = callback(guard);

            if (fields !== false && !self.test(guard, fields)) {
                result = false;
            }
        });

        return result;
    };

    $.Guards.prototype.groupByGroups = function(guard, fields) {
        if (this.isBlank(guard.name)) {
            return [fields];
        }

        var self = this;
        var ungrouped = [];
        var grouped = {};
        var dataAttrName = "guard" + this.capitalize(this.camelize(guard.name)) + "Group";
        var dashedDataAttrName = "guard-" + guard.name + "-group";

        fields.each(function(_, element) {
            var $element = $(element);
            var groups = $element.data(dataAttrName) || $element.data(dashedDataAttrName);

            if (self.isBlank(groups)) {
                ungrouped.push(element);
                return;
            }

            $.each(groups.split(" "), function(_, group) {
                if (self.isBlank(group)) {
                    return;
                }

                grouped[group] = grouped[group] || [];
                grouped[group].push(element);
            });
        });

        var results = [];

        if (ungrouped.length !== 0) {
            results.push($(ungrouped));
        }

        $.each(grouped, function(_, elements) {
            results.push($(elements));
        });

        return results;
    };

    /**
     * Use the given guard to test the given guarded fields.  Errors
     * will be applied if the field doesn't have an error yet.
     */
    $.Guards.prototype.test = function(guard, fields) {
        var result = true;

        if (guard.isGrouped()) {
            $.each(this.groupByGroups(guard, fields), function(_, groupedFields) {
                if (!guard.test(groupedFields)) {
                    result = false;
                }
            });
        } else {
            fields.each(function() {
                if (!guard.test(this)) {
                    result = false;
                }
            });
        }

        return result;
    };

    $.Guards.prototype.triggerImmediateDataErrors = function() {
        var self = this;

        $("[data-immediate-guard-error]").each(function() {
            var guard = new $.Guard({ selector: this, guards: self });
            var $this = $(this);
            guard.using("never").message($this.data("immediate-guard-error") || "");
            guard.triggerError();
            $this.removeAttr("data-immediate-guard-error");
        });
    };

    $.Guard = function(options) {
        this.name = options.name;
        this._named = options.named;
        this._guards = options.guards || $.guards;
        this._selector = options.selector;
        this._guard = null;

        if (options.named && !options.selector && this._guards.isValidDataName(options.name)) {
            this._selector = "[data-guard~='" + options.name + "']";
        }

        if (!options.named) {
            this.using(this._guards.defaults.guard);
        }
    };

    $.Guard.prototype.cloneGuard = function(guard, args) {
        var self = this;
        var namedGuard = this._guards.named[guard];

        if (this._guards.isNullOrUndefined(namedGuard)) {
            throw new Error("There is no named guard '" + guard + "'");
        }

        var copyAttribute = function(attribute) {
            if (self[attribute] !== undefined || namedGuard[attribute] === undefined) {
                return;
            }

            self[attribute] = namedGuard[attribute];
        };

        copyAttribute("_grouped");
        copyAttribute("_tag");
        copyAttribute("_messageClass");
        copyAttribute("_invalidClass");
        copyAttribute("_target");
        copyAttribute("_precondition");
        this._guard = namedGuard._guard;
        this._guardArguments = args;

        if (!this._named) {
            this.name = guard;
        }

        return this.message(namedGuard._message, true);
    };

    /**
     * @page Guard Type
     * @section using
     * @signature guard.using(name | customFunction)
     * @since 1.0.0
     *
     * <p>
     *   Guard inputs with the specified name guard, or with a custom function.  If the first argument
     *   provided is a string, it must correspond to a named guard.  This may be one of the
     *   <a href="named_guards.html"><code>default named guards</code></a>, or a guard named via
     *   <a href="guards_type.html#name"><code>$.guards.name(name)</code></a>.  Additional arguments
     *   may be given as options to the named guard.  All attributes specified by the named guard
     *   will be copied over when the <code>using</code> method is invoked.
     * </p>
     *
     * <p>
     *   Alternatively, a function may be provided as the custom guard function.  This function is invoked
     *   when guards are being tested with the value of the element guarded, and the element being
     *   guarded.  If the guard is grouped, it will be an array of values with the corresponding array
     *   of elements.
     * </p>
     *
     * <div class="example">
     *   <div class="display">
     *     <script>
     *       $.guard(".using1").using("required");
     *       $.guard(".using2").using(function(value, element) {
     *         return value !== "invalid";
     *       }).message("Custom guard.");
     *       $.guard(".using3").grouped().using(function(values, elements) {
     *         return $.inArray("test", values) >= 0;
     *       }).message("One must be 'test'");
     *     </script>
     *
     *     <p>
     *       <input class="using1" type="text" /><br />
     *       <small>Required field</small>
     *     </p>
     *
     *     <p>
     *       <input class="using2" type="text" value="invalid" /><br />
     *       <small>Field must not be 'invalid'</small>
     *     </p>
     *
     *     <p>
     *       <input class="using3" type="text" value="Something" /><br />
     *       <input class="using3" type="text" value="Somewhere" /><br />
     *       <small>One must be 'test'</small>
     *     </p>
     *   </div>
     * </div>
     */
    $.Guard.prototype.using = function(guard) {
        if (typeof(guard) === "string") {
            var args = [];

            if (arguments.length > 1) {
                args = $.makeArray(arguments).slice(1);
            }

            return this.cloneGuard(guard, args);
        }

        this._guard = guard;
        return this.message(this._guards.defaults.messages["undefined"], true);
    };

    $.Guard.prototype.getPrecondition = function() {
        if (this._precondition === undefined) {
            return this._guards.defaults.precondition;
        }

        return this._precondition;
    };

    /**
     * @page Guard Type
     * @section precondition
     * @signature guard.precondition(preconditionFunction)
     * @since 1.0.0
     *
     * <p>
     *   Specify a precondition for this guard.  A parameter is required with the precondition
     *   function.  This function accepts the element and element value as the parameters, like
     *   a custom guard function.  The precondition is executed before the guard when any given
     *   input is about to be guarded.  If the precondition returns false explicitly, the guard
     *   will not be executed and the field will be considered valid.  Any other return value
     *   means the precondition passed (even no return).  If the guard is grouped, the parameters
     *   will be the array of values and elements (like for a custom guard function).
     * </p>
     *
     * <div class="example">
     *   <div class="display">
     *     <script>
     *       $.guard(".with-precondition").using("required").precondition(function(value, element) {
     *         return $("#precondition-checkbox").is(":checked");
     *       });
     *     </script>
     *
     *     <p>
     *       <input type="checkbox" id="precondition-checkbox" checked="checked" />
     *         <label for="precondition-checkbox">Guard this field</label><br />
     *       <input class="with-precondition" type="text" /><br />
     *       <small>Guarded with <code>required</code> if the checkbox is checked</small>
     *     </p>
     *   </div>
     * </div>
     */
    $.Guard.prototype.precondition = function(fn) {
        this._precondition = fn;
        return this;
    };

    $.Guard.prototype.isGrouped = function() {
        if (this._grouped === undefined) {
            return this._guards.defaults.grouped;
        }

        return this._grouped;
    };

    /**
     * @page Guard Type
     * @section grouped
     * @signature guard.grouped([true | false])
     * @since 1.0.0
     *
     * <p>
     *   Mark this guard as being grouped.  A grouped guard will guard all affected elements
     *   at once, instead of individually.  Each guarded element with an error will still be marked
     *   as an error, but only one error message will be added.  Custom guard functions will receive
     *   all elements and their values at once instead of individually.  By default, a guard is
     *   not considered grouped.  Name guards, however, carry their grouped status on, so a guard
     *   using <a href="named_guards.html#oneRequired"><code>oneRequired</code></a>,
     *   <a href="named_guards.html#different"><code>different</code></a>, and
     *   <a href="named_guards.html#same"><code>same</code></a> will be grouped by default.
     * </p>
     *
     * <p>
     *   If no argument is given, the guard will be marked as grouped, otherwise the parameter is
     *   exoected to be a boolean indicating whether the guard should be grouped.
     * </p>
     *
     * <div class="example">
     *   <div class="display">
     *     <script>
     *       $.guard(".grouped1").using("oneRequired").grouped(false).message("No longer grouped.");
     *       $.guard(".grouped2").grouped().using(function(values, elements) {
     *         return $.inArray("test", values) >= 0;
     *       }).message("One must be 'test'");
     *     </script>
     *
     *     <p>
     *       <input class="grouped1" type="text" /><br />
     *       <input class="grouped1" type="text" /><br />
     *       <small>These are effectively guarded with 'required' now</small>
     *     </p>
     *
     *     <p>
     *       <input class="grouped2" type="text" value="Something" /><br />
     *       <input class="grouped2" type="text" value="Somewhere" /><br />
     *       <small>One must be 'test'</small>
     *     </p>
     *   </div>
     * </div>
     */
    $.Guard.prototype.grouped = function() {
        if (arguments.length === 0) {
            return this.grouped(true);
        }

        this._grouped = arguments[0];
        return this;
    };

    $.Guard.prototype.getTag = function() {
        if (this._tag === undefined) {
            return this._guards.defaults.tag;
        }

        return this._tag;
    };

    /**
     * @page Guard Type
     * @section tag
     * @signature guard.tag(htmlTag)
     * @since 1.0.0
     *
     * <p>
     *   Change the tag type that surrounds the error message.  By default, a <code>span</code> tag is
     *   used.
     * </p>
     *
     * <div class="example">
     *   <div class="display">
     *     <script>
     *       $.guard(".custom-tag").using("required").tag("div");
     *     </script>
     *
     *     <p>
     *       <input class="custom-tag" type="text" />
     *     </p>
     *   </div>
     * </div>
     */
    $.Guard.prototype.tag = function(tag) {
        this._tag = tag;
        return this.resetMessageFn();
    };

    $.Guard.prototype.getMessageClass = function() {
        if (this._messageClass === undefined) {
            return this._guards.defaults.messageClass;
        }

        return this._messageClass;
    };

    /**
     * @page Guard Type
     * @section messageClass
     * @signature guard.messageClass(cssClass)
     * @since 1.0.0
     *
     * <p>
     *   Change what class is used for error messages added due to failed guards.  By default, the
     *   error element has the class <code>error-message</code>, but that class will not be userd
     *   if a different one is specified with this method.
     * </p>
     *
     * <div class="example">
     *   <div class="display">
     *     <style>
     *       .green-message { color: #00aa00; }
     *       .blue-message { color: #0000aa; }
     *     </style>
     *
     *     <script>
     *       $.guard(".custom-message-class1").using("required").messageClass("green-message");
     *       $.guard(".custom-message-class2").using("required").messageClass("blue-message");
     *     </script>
     *
     *     <p>
     *       <input class="custom-message-class1" type="text" />
     *     </p>
     *
     *     <p>
     *       <input class="custom-message-class2" type="text" />
     *     </p>
     *   </div>
     * </div>
     */
    $.Guard.prototype.messageClass = function(messageClass) {
        this._messageClass = messageClass;
        return this.resetMessageFn();
    };

    /**
     * @page Guard Type
     * @section message
     * @signature guard.message(errorMessage)
     * @since 1.0.0
     *
     * <p>
     *   Customize the error message displayed if the guard fails.  The
     *   <a href="named_guards.html"><code>default named guards</code></a>
     *   have messages already defined, but they may be changed with this method.
     * </p>
     *
     * <div class="example">
     *   <div class="display">
     *     <script>
     *       $.guard(".message").using("required").message("This error message is customized.");
     *     </script>
     *
     *     <p>
     *       <input class="message" type="text" />
     *     </p>
     *   </div>
     * </div>
     */
    $.Guard.prototype.message = function(message, implicit) {
        if (implicit && this._explicitMessage === true) {
            return this;
        }

        this._message = message;
        this._explicitMessage = !implicit;
        return this.resetMessageFn();
    };

    $.Guard.prototype.getInvalidClass = function() {
        if (this._invalidClass === undefined) {
            return this._guards.defaults.invalidClass;
        }

        return this._invalidClass;
    };

    /**
     * @page Guard Type
     * @section invalidClass
     * @signature guard.invalidClass(cssClass)
     * @since 1.0.0
     *
     * <p>
     *   Change what class is added to invalid fields.  By default, the invalid class added is
     *   <code>invalid</code>, but that class will not be added if a different one is specified
     *   with this method.
     * </p>
     *
     * <div class="example">
     *   <div class="display">
     *     <style>
     *       .green-invalid { background-color: #66ff66; }
     *       .blue-invalid { background-color: #6666ff; }
     *     </style>
     *
     *     <script>
     *       $.guard(".custom-invalid1").using("required").invalidClass("green-invalid");
     *       $.guard(".custom-invalid2").using("required").invalidClass("blue-invalid");
     *     </script>
     *
     *     <p>
     *       <input class="custom-invalid1" type="text" />
     *     </p>
     *
     *     <p>
     *       <input class="custom-invalid2" type="text" />
     *     </p>
     *   </div>
     * </div>
     */
    $.Guard.prototype.invalidClass = function(invalidClass) {
        this._invalidClass = invalidClass;
        return this;
    };

    $.Guard.prototype.resetMessageFn = function() {
        var self = this;
        return this.messageFn(function(elements) {
            var msg = self._message;
            var dataMsg = self.getGuardDataArguments(elements, "message", true);

            if (dataMsg !== null) {
                msg = dataMsg;
            } else if ($.isFunction(msg)) {
                msg = msg.apply(self, self.getGuardArguments(elements));
            }

            return $('<' + self.getTag() + ' class="' + self.getMessageClass() + '"/>').html(msg);
        });
    };

    $.Guard.prototype.messageFn = function(messageFn) {
        this._messageFn = messageFn;
        return this;
    };

    $.Guard.prototype.errorElement = function(elements) {
        var element = this._messageFn(elements);
        element[0].isGuardError = true;
        return element;
    };

    $.Guard.prototype.attachError = function(elements, errorElement) {
        var target = this.getTarget(elements);

        if (target && $.isFunction(target)) {
            var result = target.call(elements, errorElement);

            if (result !== false) {
                errorElement.appendTo($(result).eq(0));
            }
        } else if (target) {
            errorElement.appendTo($(target).eq(0));
        } else {
            throw new Error("The target must be a function or selector!");
        }
    };

    $.Guard.prototype.getTarget = function(elements) {
        var dataTarget = this.getGuardDataArguments(elements, "target", true);

        if (dataTarget !== null) {
            return dataTarget;
        }

        if (this._target === undefined) {
            return this._guards.defaults.target;
        }

        return this._target;
    };

    /**
     * @page Guard Type
     * @section target
     * @signature guard.target(selector | targetingFunction)
     * @since 1.0.0
     *
     * <p>
     *   Specify where the error will be placed in the DOM when this guard fails.  The argument can be
     *   a jQuery selector, element, set of elements, jQuery selected set of elements, or a function.
     *   If the argument is anything except a function, it will be passed to the jQuery function and
     *   the first element will be retrieved and used as the place to append the error message.
     *   If it is a function, the function may either insert the error message itself, or return the
     *   location to place the error message.
     * </p>
     *
     * <p>
     *   When provided a function, the function will be called when an error has happened.  The function's
     *   <code>this</code> reference will be set to the error element (or set of elements in the case of
     *   a grouped guard) that had the error.  The argument will be the error message element that will be
     *   appended.  When <code>false</code> is returned, the function is expected to have inserted the
     *   provided error message in the DOM.  Otherwise, the return value is expected to be a jQuery
     *   selector, element, set of elements or jQuery selected set of elements of which the first will
     *   have the error element appended to it.
     * </p>
     *
     * <p>
     *   The default behavior is to append the error message after the last error element that is guarded.
     *   If the last element is a radio button or checkbox, it will be appended after the first sibling
     *   of the radio button or checkbox, which is expected to be the label for the radio button or
     *   checkbox.  If there is already a guard error message there, it will be appended after the last
     *   guard error message (so guard messages show up in the proper order as they are specified).
     * </p>
     *
     * <div class="example">
     *   <div class="display">
     *     <script>
     *       $.guard(".custom-target1").using("required").target("#custom-target-1-error");
     *       $.guard(".custom-target2").using("required").target(function(errorMessage) {
     *         return $(this).nextAll(".custom-target-error:first");
     *       });
     *       $.guard(".custom-target3").using("required").target(function(errorMessage) {
     *         $(this).nextAll(".custom-target-error:first").append(errorMessage);
     *         return false;
     *       });
     *     </script>
     *
     *     <p>
     *       <input class="custom-target1" type="text" />
     *       Error message targeted with selector:
     *       <span id="custom-target-1-error"></span>
     *     </p>
     *
     *     <p>
     *       <input class="custom-target2" type="text" />
     *       Error message targeted with function:
     *       <span class="custom-target-error"></span>
     *     </p>
     *
     *     <p>
     *       <input class="custom-target3" type="text" />
     *       Error message inserted manually:
     *       <span class="custom-target-error"></span>
     *     </p>
     *   </div>
     * </div>
     */
    $.Guard.prototype.target = function(target) {
        this._target = target;
        return this;
    };

    $.Guard.prototype.bind = function(event, callback) {
        var self = this;
        this._eventHandlers = this._eventHandlers || {};

        $.each(event.split(" "), function(_, eventName) {
            if (self._guards.isBlank(eventName)) {
                return;
            }

            self._eventHandlers[eventName] = self._eventHandlers[eventName] || [];
            self._eventHandlers[eventName].push(callback);
        });

        return this;
    };

    $.Guard.prototype.trigger = function(event, target) {
        if (!this._eventHandlers || !this._eventHandlers[event.type]) {
            return;
        }

        $.each(this._eventHandlers[event.type], function(_, handler) {
            if (event.isPropagationStopped() || event.isImmediatePropagationStopped()) {
                return false;
            }

            handler.call(target, event);
        });

        return this;
    };

    /**
     * @page Guard Type
     * @section onGuardError
     * @signature guard.onGuardError(callback)
     * @since 1.4.0
     *
     * <p>
     *   When a guard triggers an error, the callback provided to this function will be called with an
     *   event object.  This event can also be captured by binding for jQuery events on the individual
     *   form fields with the "guardError" event.
     * </p>
     *
     * <p>
     *   If preventDefault() is called on the event, then the error will be prevented.  If
     *   stopPropagation() or stopImmediatePropagation() is called on the event, then no other event
     *   handlers will receive the event (including jQuery event handlers).
     * </p>
     *
     * <div class="example">
     *   <div class="display">
     *     <script>
     *       $.guard(".guard-error1").using("required").onGuardError(function(e) {
     *         alert("This guarded input is watching for errors.");
     *       });
     *       $.guard(".guard-error2").using("required");
     *     </script>
     *
     *     <p>
     *       <input class="guard-error1" type="text" /><br />
     *       <small>Alerts on error.</small>
     *     </p>
     *
     *     <p>
     *       <input class="guard-error2" type="text" />
     *     </p>
     *   </div>
     * </div>
     */
    $.Guard.prototype.onGuardError = function(callback) {
        return this.bind("guardError", callback);
    };

    /**
     * @page Guard Type
     * @section onGuardFormError
     * @signature guard.onGuardFormError(callback)
     * @since 1.4.0
     *
     * <p>
     *   When a guard triggers an error, the callback provided to this function will be called with an
     *   event object.  This event can also be captured by binding for jQuery events on the top level
     *   form element with the "guardFormError" event.
     * </p>
     *
     * <p>
     *   If preventDefault() is called on the event, then the error will be prevented.  If
     *   stopPropagation() or stopImmediatePropagation() is called on the event, then no other event
     *   handlers will receive the event (including jQuery event handlers).
     * </p>
     *
     * <div class="example">
     *   <div class="display">
     *     <script>
     *       $.guard(".guard-form-error1").using("required").onGuardFormError(function(e) {
     *         alert("This guarded input is watching for errors.");
     *       });
     *       $.guard(".guard-form-error2").using("required");
     *     </script>
     *
     *     <p>
     *       <input class="guard-form-error1" type="text" /><br />
     *       <small>Alerts on error.</small>
     *     </p>
     *
     *     <p>
     *       <input class="guard-form-error2" type="text" />
     *     </p>
     *   </div>
     * </div>
     */
    $.Guard.prototype.onGuardFormError = function(callback) {
        return this.bind("guardFormError", callback);
    };

    /**
     * @page Guard Type
     * @section onAfterGuardError
     * @signature guard.onAfterGuardError(callback)
     * @since 1.4.0
     *
     * <p>
     *   When a guard triggers an error, the callback provided to this function will be called with an
     *   event object.  This event can also be captured by binding for jQuery events on the individual
     *   form fields with the "afterGuardError" event.  This event is triggered after the error has
     *   been applied, unlike the guardError and guardFormError events.
     * </p>
     *
     * <p>
     *   Calling preventDefault() has no effect.  If stopPropagation() or stopImmediatePropagation() is
     *   called on the event, then no other event handlers will receive the event (including jQuery
     *   event handlers).
     * </p>
     *
     * <div class="example">
     *   <div class="display">
     *     <script>
     *       $.guard(".after-guard-error1").using("required").onAfterGuardError(function(e) {
     *         alert("This guarded input is watching for errors.");
     *       });
     *       $.guard(".after-guard-error2").using("required");
     *     </script>
     *
     *     <p>
     *       <input class="after-guard-error1" type="text" /><br />
     *       <small>Alerts on error.</small>
     *     </p>
     *
     *     <p>
     *       <input class="after-guard-error2" type="text" />
     *     </p>
     *   </div>
     * </div>
     */
    $.Guard.prototype.onAfterGuardError = function(callback) {
        return this.bind("afterGuardError", callback);
    };

    /**
     * @page Guard Type
     * @section onAfterGuardFormError
     * @signature guard.onAfterGuardFormError(callback)
     * @since 1.4.0
     *
     * <p>
     *   When a guard triggers an error, the callback provided to this function will be called with an
     *   event object.  This event can also be captured by binding for jQuery events on the top level
     *   form element with the "afterGuardFormError" event.  This event is triggered after the error
     *   has been applied, unlike the guardError and guardFormError events.
     * </p>
     *
     * <p>
     *   Calling preventDefault() has no effect.  If stopPropagation() or stopImmediatePropagation() is
     *   called on the event, then no other event handlers will receive the event (including jQuery
     *   event handlers).
     * </p>
     *
     * <div class="example">
     *   <div class="display">
     *     <script>
     *       $.guard(".after-guard-form-error1").using("required").onAfterGuardFormError(function(e) {
     *         alert("This guarded input is watching for errors.");
     *       });
     *       $.guard(".after-guard-form-error2").using("required");
     *     </script>
     *
     *     <p>
     *       <input class="after-guard-form-error1" type="text" /><br />
     *       <small>Alerts on error.</small>
     *     </p>
     *
     *     <p>
     *       <input class="after-guard-form-error2" type="text" />
     *     </p>
     *   </div>
     * </div>
     */
    $.Guard.prototype.onAfterGuardFormError = function(callback) {
        return this.bind("afterGuardFormError", callback);
    };

    /**
     * @page Guard Type
     * @section onClearGuardError
     * @signature guard.onClearGuardError(callback)
     * @since 1.4.0
     *
     * <p>
     *   When a guard error is cleared, the callback provided to this function will be called with an
     *   event object.  This event can also be captured by binding for jQuery events on the individual
     *   form fields with the "clearGuardError" event.
     * </p>
     *
     * <p>
     *   If preventDefault() is called on the event, then the error will not be cleared.  If
     *   stopPropagation() or stopImmediatePropagation() is called on the event, then no other event
     *   handlers will receive the event (including jQuery event handlers).
     * </p>
     *
     * <div class="example">
     *   <div class="display">
     *     <script>
     *       $.guard(".clear-guard-error1").using("required").onClearGuardError(function(e) {
     *         alert("This guarded input is watching for clearing of errors.");
     *       });
     *       $.guard(".clear-guard-error2").using("required");
     *     </script>
     *
     *     <p>
     *       <input class="clear-guard-error1" type="text" /><br />
     *       <small>Alerts when errors are cleared.</small>
     *     </p>
     *
     *     <p>
     *       <input class="clear-guard-error2" type="text" />
     *     </p>
     *   </div>
     * </div>
     */
    $.Guard.prototype.onClearGuardError = function(callback) {
        return this.bind("clearGuardError", callback);
    };

    /**
     * @page Guard Type
     * @section onClearGuardFormError
     * @signature guard.onClearGuardFormError(callback)
     * @since 1.4.0
     *
     * <p>
     *   When a guard error is cleared, the callback provided to this function will be called with an
     *   event object.  This event can also be captured by binding for jQuery events on the top level
     *   form element with the "clearGuardFormError" event.
     * </p>
     *
     * <p>
     *   If preventDefault() is called on the event, then the error will not be cleared.  If
     *   stopPropagation() or stopImmediatePropagation() is called on the event, then no other event
     *   handlers will receive the event (including jQuery event handlers).
     * </p>
     *
     * <div class="example">
     *   <div class="display">
     *     <script>
     *       $.guard(".clear-guard-form-error1").using("required").onClearGuardFormError(function(e) {
     *         alert("This guarded input is watching for clearing of errors.");
     *       });
     *       $.guard(".clear-guard-form-error2").using("required");
     *     </script>
     *
     *     <p>
     *       <input class="clear-guard-form-error1" type="text" /><br />
     *       <small>Alerts when errors are cleared.</small>
     *     </p>
     *
     *     <p>
     *       <input class="clear-guard-form-error2" type="text" />
     *     </p>
     *   </div>
     * </div>
     */
    $.Guard.prototype.onClearGuardFormError = function(callback) {
        return this.bind("clearGuardFormError", callback);
    };

    /**
     * @page Guard Type
     * @section onAfterClearGuardError
     * @signature guard.onAfterClearGuardError(callback)
     * @since 1.4.0
     *
     * <p>
     *   When a guard error is cleared, the callback provided to this function will be called with an
     *   event object.  This event can also be captured by binding for jQuery events on the individual
     *   form fields with the "afterClearGuardError" event.  This event is triggered after the error has
     *   been cleared, unlike the clearGuardError and clearGuardFormError events.
     * </p>
     *
     * <p>
     *   Calling preventDefault() has no effect.  If stopPropagation() or stopImmediatePropagation() is
     *   called on the event, then no other event handlers will receive the event (including jQuery
     *   event handlers).
     * </p>
     *
     * <div class="example">
     *   <div class="display">
     *     <script>
     *       $.guard(".after-clear-guard-error1").using("required").onAfterClearGuardError(function(e) {
     *         alert("This guarded input is watching for clearing of errors.");
     *       });
     *       $.guard(".after-clear-guard-error2").using("required");
     *     </script>
     *
     *     <p>
     *       <input class="after-clear-guard-error1" type="text" /><br />
     *       <small>Alerts when errors are cleared.</small>
     *     </p>
     *
     *     <p>
     *       <input class="after-clear-guard-error2" type="text" />
     *     </p>
     *   </div>
     * </div>
     */
    $.Guard.prototype.onAfterClearGuardError = function(callback) {
        return this.bind("afterClearGuardError", callback);
    };

    /**
     * @page Guard Type
     * @section onAfterClearGuardFormError
     * @signature guard.onAfterClearGuardFormError(callback)
     * @since 1.4.0
     *
     * <p>
     *   When a guard error is cleared, the callback provided to this function will be called with an
     *   event object.  This event can also be captured by binding for jQuery events on the top level
     *   form element with the "afterClearGuardFormError" event.  This event is triggered after the error
     *   has been cleared, unlike the clearGuardError and clearGuardFormError events.
     * </p>
     *
     * <p>
     *   Calling preventDefault() has no effect.  If stopPropagation() or stopImmediatePropagation() is
     *   called on the event, then no other event handlers will receive the event (including jQuery
     *   event handlers).
     * </p>
     *
     * <div class="example">
     *   <div class="display">
     *     <script>
     *       $.guard(".after-clear-guard-form-error1").using("required").onAfterClearGuardFormError(function(e) {
     *         alert("This guarded input is watching for clearing of errors.");
     *       });
     *       $.guard(".after-clear-guard-form-error2").using("required");
     *     </script>
     *
     *     <p>
     *       <input class="after-clear-guard-form-error1" type="text" /><br />
     *       <small>Alerts when errors are cleared.</small>
     *     </p>
     *
     *     <p>
     *       <input class="after-clear-guard-form-error2" type="text" />
     *     </p>
     *   </div>
     * </div>
     */
    $.Guard.prototype.onAfterClearGuardFormError = function(callback) {
        return this.bind("afterClearGuardFormError", callback);
    };

    // Determine if the guard applies to given element(s)
    $.Guard.prototype.appliesTo = function(element) {
        return $(element).filter(this._selector).size() > 0;
    };

    $.Guard.prototype.getGuardDataArguments = function(elements, attributeName, includeForm) {
        if (this._guards.isNullOrUndefined(elements)) {
            return null;
        }

        var $elements = $(elements);

        if ($elements.size() === 0 || this._guards.isNullOrUndefined(this.name) || !this._guards.isValidDataName(this.name)) {
            return null;
        }

        var dashedAttrPrefix = "guard-" + this.name + "-";

        if (attributeName) {
            dashedAttrPrefix = dashedAttrPrefix + attributeName;
        }

        var result = null;
        var attrPrefix = this._guards.camelize(dashedAttrPrefix.replace(/-+$/, ""));
        var data = $elements.data() || {};

        if (includeForm) {
            var formData = $elements.parents("form:first").data() || {};
            data = $.extend({}, formData, data);
        }

        $.each(data, function(key, value) {
            var isDashed = key.indexOf(dashedAttrPrefix) === 0;

            if (key.indexOf(attrPrefix) !== 0 && !isDashed) {
                return;
            }

            var attrName;

            if (isDashed) {
                attrName = key.substring(dashedAttrPrefix.length, key.length);
            } else {
                attrName = key.substring(attrPrefix.length, key.length);
            }

            if (!isDashed) {
                // Un-capitalize the first letter
                attrName = attrName.replace(/^(.)/, function(_, letter) {
                    return letter.toLowerCase();
                });
            }

            if (attributeName) {
                // Grabbing just this attribute, so must be an exact
                // match, and only 1 result
                if (attrName === "") {
                    result = value;
                    return false;
                } else {
                    return;
                }
            }

            if (result === null) {
                result = {};
            }

            result[attrName] = value;
        });

        return result;
    };

    $.Guard.prototype.getGuardArguments = function(elements) {
        var result = this._guardArguments;

        if (this._guards.isNullOrUndefined(result)) {
            result = [];
        }

        // Currently only support single argument hash types for data
        // attribute arguments overriding javascript arguments
        if (result.length > 1 || (result.length === 1 && $.type(result[0]) !== "object")) {
            return result;
        }

        var dataArgs = this.getGuardDataArguments(elements);

        if (!this._guards.isNullOrUndefined(dataArgs)) {
            if (result.length === 1) {
                result[0] = $.extend({}, result[0], dataArgs);
            } else {
                result.push(dataArgs);
            }
        }

        return result;
    };

    // Tests this guard against element(s).  Element(s) should be field elements.  Returns false
    // but doesn't apply guard if there are already errors detected.  Returns true if the selector
    // defined for this guard doesn't apply to this element(s).  Otherwise applies and adds an
    // error if it fails.
    $.Guard.prototype.test = function(element) {
        var self = this;
        var $elements = $(element).filter(this._selector);

        if ($elements.size() === 0) {
            return true;
        }

        if (!this._guards.options.stackErrors && $elements.hasErrors()) {
            return false;
        }

        var result, elements, values;

        // Grouped expects a group of elements, while non-grouped
        // expects a single element.
        if (this.isGrouped()) {
            values = [];
            elements = [];

            $elements.each(function() {
                values.push($(this).inputValue(self._guards));
                elements.push(this);
            });
        } else {
            values = $elements.inputValue(this._guards);
            elements = element;
        }

        if (!this.testPrecondition(values, elements)) {
            result = true;
        } else {
            try {
                var guardFn = this._guard;

                if (guardFn.acceptsArguments) {
                    guardFn = this._guard.apply(this._guards, this.getGuardArguments(elements));
                }

                result = guardFn(values, elements);
            } catch(e) {
                this._guards.log("A guard threw an error: " + e);
                result = false;
            }
        }

        if (!result) {
            var check = new NotUsedExternally();
            this.triggerError($elements, check);
            result = !!check.defaultPrevented;
        }

        return result;
    };

    // Test the precondition, if there is one.  Returns true if there is none, or if it
    // doesn't return false.  Returns false if the precondition throws an exception or if
    // the precondition returns false.  No return, undefined, null, 0 or anything else is
    // considered passing.
    $.Guard.prototype.testPrecondition = function(values, elements) {
        var precondition = this.getPrecondition();

        if (!precondition) {
            return true;
        }

        try {
            return precondition(values, elements) !== false;
        } catch(e) {
            this._guards.log("A precondition threw an error: " + e);
            return false;
        }
    };

    /**
     * @page Guard Type
     * @section triggerError
     * @signature guard.triggerError([selector])
     * @since 1.0.0
     *
     * <p>
     *   Exlicitly trigger an error for this guard on all elements provided to this function.
     *   The argument provided is wrapped as a jQuery object, so it may be a selector, jQuery
     *   object, element, or array of elements (or anything valid for a jQuery object).  Note
     *   that the elements provided will have the guard applied, regardless of whether they
     *   match the guard selector.
     * </p>
     *
     * <p>
     *   This method may alternatively be invoked with no arguments.  If this is done, the
     *   selector used with the guard is used to select the elents to trigger the guard error.
     * </p>
     *
     * <div class="example">
     *   <div class="display">
     *     <script>
     *       var guard1 = $.guard(".nothingToSelect").using("never").message("Error #1");
     *       var guard2 = $.guard(".triggerError2").using("never").message("Error #2");
     *       $(function() {
     *         guard1.triggerError(".triggerError1");
     *         guard2.triggerError();
     *       });
     *     </script>
     *
     *     <p>
     *       <input class="triggerError1" type="text" /><br />
     *       <small>Triggered with a different selector</small>
     *     </p>
     *
     *     <p>
     *       <input class="triggerError2" type="text" /><br />
     *       <small>Triggered using the guard's selector</small>
     *     </p>
     *   </div>
     * </div>
     */
    $.Guard.prototype.triggerError = function() {
        var elements;
        var check = null;

        if (arguments.length === 0) {
            elements = this._selector;
        } else if (arguments.length === 1 && arguments[0].constructor === NotUsedExternally) {
            elements = this._selector;
            check = arguments[0];
        } else if (arguments.length === 1) {
            elements = arguments[0];
        } else if (arguments.length === 2 && arguments[1].constructor === NotUsedExternally) {
            elements = arguments[0];
            check = arguments[1];
        } else {
            throw new Error("Expected 0 or 1 argument to triggerError, got " + arguments.length);
        }

        if (this.isGrouped()) {
            $(elements).addSingleError(this, check || new NotUsedExternally());
        } else {
            $(elements).addError(this, check || new NotUsedExternally());
        }

        return this;
    };

    $.Guard.prototype.sendEvent = function(name, selectedElements, forForm, errorMessageElement) {
        var event = $.Event(name);
        event.guard = this;
        event.errorElements = selectedElements.toArray();
        var target = selectedElements;

        if (forForm) {
            target = target.parents("form");
        }

        if (errorMessageElement) {
            event.errorMessage = $(errorMessageElement)[0];
        }

        this.trigger(event, target);

        if (!event.isPropagationStopped() && !event.isImmediatePropagationStopped()) {
            target.trigger(event);
        }

        return event;
    };

    $.GuardError = function(guard, element, errorElement, linked) {
        this._guard = guard;
        this._element = element;
        this._errorElement = errorElement;
        this._linked = linked;
        this._cleared = false;
    };

    /**
     * Clear this error and any errors linked with it (grouped guards
     * and radio buttons cause all elements involved to be linked).
     */
    $.GuardError.prototype.clear = function(forLinked) {
        if (this._cleared) {
            return;
        }

        var selected = [];
        var $selected;

        if (!forLinked) {
            for (var i = 0; i < this._linked.length; i++) {
                selected.push(this._linked[i]._element);
            }

            $selected = $(selected);
            var clearGuardErrorPrevented = this._guard.sendEvent("clearGuardError", $selected, false, this._errorElement).isDefaultPrevented();
            var clearGuardFormErrorPrevented = this._guard.sendEvent("clearGuardFormError", $selected, true, this._errorElement).isDefaultPrevented();

            if (clearGuardErrorPrevented || clearGuardFormErrorPrevented) {
                return;
            }
        }

        this._errorElement.remove();
        var index = $.inArray(this, this._element.errors);
        var $element = $(this._element);

        if (index >= 0) {
            this._element.errors.splice(index, 1);
        }

        if (!$element.hasErrorsWithInvalidClass(this._guard.getInvalidClass())) {
            $element.removeClass(this._guard.getInvalidClass());
        }

        this._cleared = true;

        while (this._linked.length > 0) {
            this._linked.shift().clear(true);
        }

        if (!forLinked) {
            this._guard.sendEvent("afterClearGuardError", $selected, false);
            this._guard.sendEvent("afterClearGuardFormError", $selected, true);
        }
    };

    /**
     * Simple object that can be type checked so it is guaranteed to
     * not be used externally, and can pass information back to
     * callers.
     */
    function NotUsedExternally() {
    }

    /**
     * Find any applicable fields for this selected item.  Applicable
     * fields are any inputs, textareas or selects.
     */
    $.fn.guardableFields = function() {
        var results = this.filter(":guardable");
        return results.add(this.find(":guardable"));
    };

    /**
     * @page jQuery Methods
     * @section guard
     * @signature selected.guard()
     * @since 1.0.0
     *
     * <p>
     *   Clear any guard errors present on the form fields within the selected form (or other
     *   containing element around form elements), and then test each element in order against
     *   each guard in the order the guards were defined.  If any of the fields had an error,
     *   focus the first such field.
     * </p>
     *
     * <p>
     *   As of version 1.5.1, directly selected form fields will be guarded as well.  The
     *   order of evaluating selected fields is undefined, as it is dependent on jQuery.
     * </p>
     *
     * <div class="example">
     *   <div class="display">
     *     <script>
     *       $.guard(".guarded-field").using("required");
     *       $(function() {
     *         $("#invoke-guard").click(function() {
     *           $("#guard-container, #uncontained-field").guard();
     *           return false;
     *         });
     *       });
     *     </script>
     *
     *     <div id="guard-container">
     *       <p>
     *         <input class="guarded-field" type="text" />
     *       </p>
     *     </div>
     *
     *     <div>
     *       <p>
     *         <input id="uncontained-field" class="guarded-field" type="text" />
     *       </p>
     *     </div>
     *
     *     <p>
     *       <input id="invoke-guard" type="button" value="Test Guards" />
     *     </p>
     *   </div>
     * </div>
     */
    $.fn.guard = function() {
        return $.guards.guard(this);
    };

    /**
     * Explicitly trigger the given guard's error all the selected
     * elements.  Note that the selected elements don't have to be
     * valid for this guard to be applied.  This is equivalent to
     * calling guard.triggerError($this);
     */
    $.fn.triggerError = function(guard) {
        guard.triggerError(this);
    };

    /**
     * Add a single error message, but mark every selected element as
     * in error pointing to the single error message.  This differs
     * from addError because addError will add a new error message for
     * each selected element instead of just 1.
     */
    $.fn.addSingleError = function(guard) {
        if (this.size() === 0) {
            $.guards.log("Attempted to add error to nothing.");
            return this;
        }

        // Don't add the error if it is already there.
        if (this.hasError(guard)) {
            return this;
        }

        var guardErrorPrevented = guard.sendEvent("guardError", this).isDefaultPrevented();
        var guardFormErrorPrevented = guard.sendEvent("guardFormError", this, true).isDefaultPrevented();

        if (guardErrorPrevented || guardFormErrorPrevented) {
            if (arguments.length === 2 && arguments[1].constructor === NotUsedExternally) {
                arguments[1].defaultPrevented = true;
            }

            return this;
        }

        var element = guard.errorElement(this);
        guard.attachError(this, element);
        this.addClass(guard.getInvalidClass());
        var linked = [];

        this.each(function() {
            if (!this.errors) {
                this.errors = [];
            }

            var error = new $.GuardError(guard, this, element, linked);
            linked.push(error);
            this.errors.push(error);
        });

        guard.sendEvent("afterGuardError", this, false, element);
        guard.sendEvent("afterGuardFormError", this, true, element);
        return this;
    };

    /**
     * Add an error message to each of the selected elements, with an
     * optional error target to place it.  The target can be a
     * selector, though it will use the first selected element as the
     * target.
     */
    $.fn.addError = function(guard) {
        var check = arguments[1] || new NotUsedExternally();
        var radiosAdded = {};

        return this.each(function() {
            var $this = $(this);

            if ($this.is(":radio")) {
                var name = $this.attr("name");

                if (radiosAdded[name]) {
                    return;
                }

                radiosAdded[name] = true;
                var context = guard._guards.parentContext($this);
                var radios = $("input[name='" + name + "']:radio", context);
                radios.addSingleError(guard, check);
            } else {
                $this.addSingleError(guard, check);
            }
        });
    };

    /**
     * Obtain all errors attached to the selected elements.
     */
    $.fn.errors = function() {
        var result = [];

        this.each(function() {
            if (this.errors && this.errors.length > 0) {
                result.push.apply(result, this.errors);
            }
        });

        return result;
    };

    /**
     * @page jQuery Methods
     * @section clearErrors
     * @signature selected.clearErrors()
     * @since 1.0.0
     *
     * <p>
     *   Clear any guard errors on the selected elements.
     * </p>
     *
     * <div class="example">
     *   <div class="display">
     *     <script>
     *       $(function() {
     *         $.guard(".field-to-clear").using("required").triggerError();
     *         $("#clear-errors").click(function() {
     *           $(".field-to-clear").clearErrors();
     *           return false;
     *         });
     *       });
     *     </script>
     *
     *     <div>
     *       <p>
     *         <input class="field-to-clear" type="text" />
     *       </p>
     *     </div>
     *
     *     <p>
     *       <input id="clear-errors" type="button" value="Clear Errors" />
     *     </p>
     *   </div>
     * </div>
     */
    $.fn.clearErrors = function() {
        $.each(this.errors(), function(_, error) {
            error.clear();
        });

        return this;
    };

    /**
     * Determine if the given guard already has an error in the
     * selected elements.
     */
    $.fn.hasError = function(guard) {
        var result = false;

        $.each(this.errors(), function(_, error) {
            if (error._guard === guard) {
                result = true;
                return false;
            }
        });

        return result;
    };

    /**
     * Determine if any errors exist in the selected elements.
     */
    $.fn.hasErrors = function() {
        return this.errors().length > 0;
    };

    $.fn.hasErrorsWithInvalidClass = function(invalidClass) {
        var result = false;

        $.each(this.errors(), function(_, error) {
            if (error._guard.getInvalidClass() === invalidClass) {
                result = true;
                return false;
            }
        });

        return result;
    };

    /**
     * Obtain the value of the first selected input.  This differs
     * from val() in that it will properly get the value of a set of
     * radio buttons.
     */
    $.fn.inputValue = function(guards) {
        guards = guards || $.guards;

        if (this.is(":radio")) {
            var checked = $("input[name='" + this.attr("name") + "']:radio:checked", guards.parentContext(this));

            if (checked.size() === 0) {
                return guards.constants.notChecked;
            }

            return checked.val();
        }

        if (this.is(":checkbox")) {
            if (this.is(":checked")) {
                return this.val();
            }

            return guards.constants.notChecked;
        }

        return this.val();
    };

    /**
     * Enable guards of this form by attaching a submit button to it
     * that returns the result of calling guard().  This will block
     * any other submit event handlers and prevent the form from being
     * submitted if guarding fails.
     */
    $.fn.enableGuards = function() {
        return this.bind("submit", $.guards.defaults.submitCallback);
    };

    /**
     * Disable form submit callbacks set up via the enableGuards
     * function.
     */
    $.fn.disableGuards = function() {
        return this.unbind("submit", $.guards.defaults.submitCallback);
    };

    /**
     * @page Global Functions
     * @section enableGuards
     * @signature jQuery.enableGuards(selector)
     * @since 1.0.0
     *
     * <p>
     *   Enable guards for a given selector.  This will turn on live submit events to guard
     *   the children of the selected forms/elements.  Since these are live events, this
     *   function need not be called when the elements actually exist (so they need not be in
     *   a DOM onready handler).
     * </p>
     *
     * <div class="example not-auto-guarded">
     *   <div class="display">
     *     <script>
     *       $.guard("input.guardable").using("required");
     *       $.enableGuards("form.guardable");
     *     </script>
     *
     *     <form class="guardable">
     *       <p>
     *         <input class="guardable" type="text" />
     *       </p>
     *
     *       <p>
     *         <input type="submit" />
     *       </p>
     *     </form>
     *   </div>
     * </div>
     */
    $.enableGuards = function(selector) {
        $.guards.enableGuards(selector);
    };

    /**
     * @page Global Functions
     * @section disableGuards
     * @signature jQuery.disableGuards(selector)
     * @since 1.0.0
     *
     * <p>
     *   Disable guards that was previously enabled for the given selector.
     * </p>
     *
     * <div class="example not-auto-guarded">
     *   <div class="display">
     *     <script>
     *       $.guard("input.guardable2").using("required");
     *       $.enableGuards("form.guardable2");
     *       $(function() {
     *         $("#disable-guards").click(function() {
     *           $.disableGuards("form.guardable2");
     *           return false;
     *         });
     *       });
     *     </script>
     *
     *     <form class="guardable2">
     *       <p>
     *         <input class="guardable2" type="text" />
     *       </p>
     *
     *       <p>
     *         <input type="submit" />
     *       </p>
     *
     *       <p>
     *         <input id="disable-guards" type="button" value="Disable Guards" />
     *       </p>
     *     </form>
     *   </div>
     * </div>
     */
    $.disableGuards = function(selector) {
        $.guards.disableGuards(selector);
    };

    /**
     * @page Global Functions
     * @section liveGuard
     * @signature jQuery.liveGuard(selector)
     * @since 1.0.0
     *
     * <p>
     *   Enable live guards for a given selector.  This will turn on live submit, change and blur
     *   events to guard the children of the selected forms/elements.  Since these are live events,
     *   this function need not be called when the elements actually exist (so they need not be in
     *   a DOM onready handler).
     * </p>
     *
     * <div class="example not-auto-guarded">
     *   <div class="display">
     *     <script>
     *       $.guard(".live-guarded").using("required");
     *       $.liveGuard(".live-guard");
     *     </script>
     *
     *     <form class="live-guard">
     *       <p>
     *         <input class="live-guarded" type="text" />
     *       </p>
     *
     *       <p>
     *         <input type="submit" />
     *       </p>
     *     </form>
     *   </div>
     * </div>
     */
    $.liveGuard = function(selector) {
        $.guards.liveGuard(selector);
    };

    /**
     * @page Global Functions
     * @section disableLiveGuard
     * @signature jQuery.disableLiveGuard(selector)
     * @since 1.0.0
     *
     * <p>
     *   Disable live guards that was previously enabled for the given selector.
     * </p>
     *
     * <div class="example not-auto-guarded">
     *   <div class="display">
     *     <script>
     *       $.guard(".live-guarded2").using("required");
     *       $.liveGuard(".live-guard2");
     *       $(function() {
     *         $("#disable-live-guards").click(function() {
     *           $.disableLiveGuard(".live-guard2");
     *           return false;
     *         });
     *       });
     *     </script>
     *
     *     <form class="live-guard2">
     *       <p>
     *         <input class="live-guarded2" type="text" />
     *       </p>
     *
     *       <p>
     *         <input type="submit" />
     *       </p>
     *
     *       <p>
     *         <input id="disable-live-guards" type="button" value="Disable Guards" />
     *       </p>
     *     </form>
     *   </div>
     * </div>
     */
    $.disableLiveGuard = function(selector) {
        $.guards.disableLiveGuard(selector);
    };

    $.extend($.expr[":"], {
        /**
         * @page jQuery Methods
         * @section :has-error
         * @signature jQuery("selector:has-error")
         * @since 1.0.0
         *
         * <p>
         *   This is a jQuery selector that can be used to select elements that currently have an error.
         * </p>
         *
         * <div class="example">
         *   <div class="display">
         *     <script>
         *       $.guard(".field-to-select").using("required");
         *       $(function() {
         *         $("#select-errors").click(function() {
         *           var count = $(".field-to-select:has-error").size();
         *           $("#selected-error-count").text("Number of errors: " + count);
         *           return false;
         *         });
         *       });
         *     </script>
         *
         *     <div>
         *       <p>
         *         <input class="field-to-select" type="text" />
         *       </p>
         *
         *       <p>
         *         <input class="field-to-select" type="text" />
         *       </p>
         *     </div>
         *
         *     <p>
         *       <input id="select-errors" type="button" value="Count errors" /><br />
         *       <span id="selected-error-count"></span>
         *     </p>
         *   </div>
         * </div>
         */
        "has-error": function(x) {
            return !!(x.errors && x.errors.length > 0);
        },
        "guardable": function(x) {
            var tagName = x.tagName.toLowerCase();
            return tagName === "input" || tagName === "textarea" || tagName === "select" || tagName === "button";
        }
    });

    $.guards = new $.Guards();

    // Clear errors when the user expresses intent to fix the errors.
    var clearFn = function() { $(this).clearErrors(); };
    $.guards.on(":has-error", "change", clearFn);
    $.guards.on(":has-error:radio,:has-error:checkbox", "mouseup", clearFn);
    $.guards.on("select:has-error", "mousedown", clearFn);

    // Make sure we don't clear it if there was no error when the
    // keydown happened, otherwise a submit on enter will have the
    // error flash and then go away on the keyup.
    $.guards.on(":has-error", "keydown", function() { this.clearable = true; });
    $.guards.on(":has-error", "keyup", function() {
        if (this.clearable) {
            this.clearable = false;
            $(this).clearErrors();
        }
    });

    // Data driven guards
    $.liveGuard("[data-live-guarded]");
    $.enableGuards("[data-guarded]");
    $(function() { $.guards.triggerImmediateDataErrors(); });
})(jQuery);
