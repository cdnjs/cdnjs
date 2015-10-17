/*! jqBootstrapValidation - v1.3.7 - 2013-05-03
* http://reactiveraven.github.com/jqBootstrapValidation
* Copyright (c) 2013 David Godfrey; Licensed MIT */

(function( $ ){

	var createdElements = [];

	var defaults = {
		options: {
			prependExistingHelpBlock: false,
			sniffHtml: true, // sniff for 'required', 'maxlength', etc
			preventSubmit: true, // stop the form submit event from firing if validation fails
			submitError: false, // function called if there is an error when trying to submit
			submitSuccess: false, // function called just before a successful submit event is sent to the server
            semanticallyStrict: false, // set to true to tidy up generated HTML output
            bindEvents: [],
			autoAdd: {
				helpBlocks: true
			},
      filter: function () {
        // return $(this).is(":visible"); // only validate elements you can see
        return true; // validate everything
      }
		},
    methods: {
      init : function( options ) {

        var settings = $.extend(true, {}, defaults);

        settings.options = $.extend(true, settings.options, options);

        var $siblingElements = this;

        var uniqueForms = $.unique(
          $siblingElements.map( function () {
            return $(this).parents("form")[0];
          }).toArray()
        );

        $(uniqueForms).bind("submit", function (e) {
          var $form = $(this);
          var warningsFound = 0;
          var $inputs = $form.find("input,textarea,select").not("[type=submit],[type=image]").filter(settings.options.filter);
          $inputs.trigger("submit.validation").trigger("validationLostFocus.validation");

          $inputs.each(function (i, el) {
            var $this = $(el),
              $controlGroup = $this.parents(".control-group").first();
            if (
              $controlGroup.hasClass("warning") || $controlGroup.hasClass("error")
            ) {
              $controlGroup.removeClass("warning").addClass("error");
              warningsFound++;
            }
          });

          if (warningsFound) {
            if (settings.options.preventSubmit) {
              e.preventDefault();
              e.stopImmediatePropagation();
            }
            $form.addClass("error");
            if ($.isFunction(settings.options.submitError)) {
              settings.options.submitError($form, e, $inputs.jqBootstrapValidation("collectErrors", true));
            }
          } else {
            $form.removeClass("error");
            if ($.isFunction(settings.options.submitSuccess)) {
              settings.options.submitSuccess($form, e);
            }
          }
        });

        return this.each(function(){

          // Get references to everything we're interested in
          var $this = $(this),
            $controlGroup = $this.parents(".control-group").first(),
            $helpBlock = $controlGroup.find(".help-block").first(),
            $form = $this.parents("form").first(),
            validatorNames = [];

          // create message container if not exists
          if (!$helpBlock.length && settings.options.autoAdd && settings.options.autoAdd.helpBlocks) {
              $helpBlock = $('<div class="help-block" />');
              $controlGroup.find('.controls').append($helpBlock);
							createdElements.push($helpBlock[0]);
          }

          // =============================================================
          //                                     SNIFF HTML FOR VALIDATORS
          // =============================================================

          // *snort sniff snuffle*

          if (settings.options.sniffHtml) {
            var message;
            // ---------------------------------------------------------
            //                                                   PATTERN
            // ---------------------------------------------------------
            if ($this.data("validationPatternPattern")) {
              $this.attr("pattern", $this.data("validationPatternPattern"));
            }
            if ($this.attr("pattern") !== undefined) {
              message = "Not in the expected format<!-- data-validation-pattern-message to override -->";
              if ($this.data("validationPatternMessage")) {
                message = $this.data("validationPatternMessage");
              }
              $this.data("validationPatternMessage", message);
              $this.data("validationPatternRegex", $this.attr("pattern"));
            }
            // ---------------------------------------------------------
            //                                                       MAX
            // ---------------------------------------------------------
            if ($this.attr("max") !== undefined || $this.attr("aria-valuemax") !== undefined) {
              var max = ($this.attr("max") !== undefined ? $this.attr("max") : $this.attr("aria-valuemax"));
              message = "Too high: Maximum of '" + max + "'<!-- data-validation-max-message to override -->";
              if ($this.data("validationMaxMessage")) {
                message = $this.data("validationMaxMessage");
              }
              $this.data("validationMaxMessage", message);
              $this.data("validationMaxMax", max);
            }
            // ---------------------------------------------------------
            //                                                       MIN
            // ---------------------------------------------------------
            if ($this.attr("min") !== undefined || $this.attr("aria-valuemin") !== undefined) {
              var min = ($this.attr("min") !== undefined ? $this.attr("min") : $this.attr("aria-valuemin"));
              message = "Too low: Minimum of '" + min + "'<!-- data-validation-min-message to override -->";
              if ($this.data("validationMinMessage")) {
                message = $this.data("validationMinMessage");
              }
              $this.data("validationMinMessage", message);
              $this.data("validationMinMin", min);
            }
            // ---------------------------------------------------------
            //                                                 MAXLENGTH
            // ---------------------------------------------------------
            if ($this.attr("maxlength") !== undefined) {
              message = "Too long: Maximum of '" + $this.attr("maxlength") + "' characters<!-- data-validation-maxlength-message to override -->";
              if ($this.data("validationMaxlengthMessage")) {
                message = $this.data("validationMaxlengthMessage");
              }
              $this.data("validationMaxlengthMessage", message);
              $this.data("validationMaxlengthMaxlength", $this.attr("maxlength"));
            }
            // ---------------------------------------------------------
            //                                                 MINLENGTH
            // ---------------------------------------------------------
            if ($this.attr("minlength") !== undefined) {
              message = "Too short: Minimum of '" + $this.attr("minlength") + "' characters<!-- data-validation-minlength-message to override -->";
              if ($this.data("validationMinlengthMessage")) {
                message = $this.data("validationMinlengthMessage");
              }
              $this.data("validationMinlengthMessage", message);
              $this.data("validationMinlengthMinlength", $this.attr("minlength"));
            }
            // ---------------------------------------------------------
            //                                                  REQUIRED
            // ---------------------------------------------------------
            if ($this.attr("required") !== undefined || $this.attr("aria-required") !== undefined) {
              message = settings.builtInValidators.required.message;
              if ($this.data("validationRequiredMessage")) {
                message = $this.data("validationRequiredMessage");
              }
              $this.data("validationRequiredMessage", message);
            }
            // ---------------------------------------------------------
            //                                                    NUMBER
            // ---------------------------------------------------------
            if ($this.attr("type") !== undefined && $this.attr("type").toLowerCase() === "number") {
              message = settings.validatorTypes.number.message; // TODO: fix this
              if ($this.data("validationNumberMessage")) {
                message = $this.data("validationNumberMessage");
              }
              $this.data("validationNumberMessage", message);
              
              var step = settings.validatorTypes.number.step; // TODO: and this
              if ($this.data("validationNumberStep")) {
                  step = $this.data("validationNumberStep");
              }
              $this.data("validationNumberStep", step);
              
              var decimal = settings.validatorTypes.number.decimal;
              if ($this.data("validationNumberDecimal")) {
                  decimal = $this.data("validationNumberDecimal");
              }
              $this.data("validationNumberDecimal", decimal);
            }
            // ---------------------------------------------------------
            //                                                     EMAIL
            // ---------------------------------------------------------
            if ($this.attr("type") !== undefined && $this.attr("type").toLowerCase() === "email") {
              message = "Not a valid email address<!-- data-validation-email-message to override -->";
              if ($this.data("validationEmailMessage")) {
                message = $this.data("validationEmailMessage");
              }
              $this.data("validationEmailMessage", message);
            }
            // ---------------------------------------------------------
            //                                                MINCHECKED
            // ---------------------------------------------------------
            if ($this.attr("minchecked") !== undefined) {
              message = "Not enough options checked; Minimum of '" + $this.attr("minchecked") + "' required<!-- data-validation-minchecked-message to override -->";
              if ($this.data("validationMincheckedMessage")) {
                message = $this.data("validationMincheckedMessage");
              }
              $this.data("validationMincheckedMessage", message);
              $this.data("validationMincheckedMinchecked", $this.attr("minchecked"));
            }
            // ---------------------------------------------------------
            //                                                MAXCHECKED
            // ---------------------------------------------------------
            if ($this.attr("maxchecked") !== undefined) {
              message = "Too many options checked; Maximum of '" + $this.attr("maxchecked") + "' required<!-- data-validation-maxchecked-message to override -->";
              if ($this.data("validationMaxcheckedMessage")) {
                message = $this.data("validationMaxcheckedMessage");
              }
              $this.data("validationMaxcheckedMessage", message);
              $this.data("validationMaxcheckedMaxchecked", $this.attr("maxchecked"));
            }
          }

          // =============================================================
          //                                       COLLECT VALIDATOR NAMES
          // =============================================================

          // Get named validators
          if ($this.data("validation") !== undefined) {
            validatorNames = $this.data("validation").split(",");
          }

          // Get extra ones defined on the element's data attributes
          $.each($this.data(), function (i, el) {
            var parts = i.replace(/([A-Z])/g, ",$1").split(",");
            if (parts[0] === "validation" && parts[1]) {
              validatorNames.push(parts[1]);
            }
          });

          // =============================================================
          //                                     NORMALISE VALIDATOR NAMES
          // =============================================================

          var validatorNamesToInspect = validatorNames;
          var newValidatorNamesToInspect = [];
          
          var uppercaseEachValidatorName = function (i, el) {
            validatorNames[i] = formatValidatorName(el);
          };
      
          var inspectValidators = function(i, el) {
            if ($this.data("validation" + el + "Shortcut") !== undefined) {
              // Are these custom validators?
              // Pull them out!
              $.each($this.data("validation" + el + "Shortcut").split(","), function(i2, el2) {
                newValidatorNamesToInspect.push(el2);
              });
            } else if (settings.builtInValidators[el.toLowerCase()]) {
              // Is this a recognised built-in?
              // Pull it out!
              var validator = settings.builtInValidators[el.toLowerCase()];
              if (validator.type.toLowerCase() === "shortcut") {
                $.each(validator.shortcut.split(","), function (i, el) {
                  el = formatValidatorName(el);
                  newValidatorNamesToInspect.push(el);
                  validatorNames.push(el);
                });
              }
            }
          };

          do // repeatedly expand 'shortcut' validators into their real validators
          {
            // Uppercase only the first letter of each name
            $.each(validatorNames, uppercaseEachValidatorName);

            // Remove duplicate validator names
            validatorNames = $.unique(validatorNames);

            // Pull out the new validator names from each shortcut
            newValidatorNamesToInspect = [];
            $.each(validatorNamesToInspect, inspectValidators);

            validatorNamesToInspect = newValidatorNamesToInspect;

          } while (validatorNamesToInspect.length > 0);

          // =============================================================
          //                                       SET UP VALIDATOR ARRAYS
          // =============================================================

          var validators = {};

          $.each(validatorNames, function (i, el) {
            // Set up the 'override' message
            var message = $this.data("validation" + el + "Message");
            var hasOverrideMessage = !!message;
            var foundValidator = false;
            if (!message) {
              message = "'" + el + "' validation failed <!-- Add attribute 'data-validation-" + el.toLowerCase() + "-message' to input to change this message -->";
            }

            $.each(
              settings.validatorTypes,
              function (validatorType, validatorTemplate) {
                if (validators[validatorType] === undefined) {
                  validators[validatorType] = [];
                }
                if (!foundValidator && $this.data("validation" + el + formatValidatorName(validatorTemplate.name)) !== undefined) {
                  var initted = validatorTemplate.init($this, el);
                  if (hasOverrideMessage) {
                    initted.message = message;
                  }
                  
                  validators[validatorType].push(
                    $.extend(
                      true,
                      {
                        name: formatValidatorName(validatorTemplate.name),
                        message: message
                      },
                      initted
                    )
                  );
                  foundValidator = true;
                }
              }
            );

            if (!foundValidator && settings.builtInValidators[el.toLowerCase()]) {

              var validator = $.extend(true, {}, settings.builtInValidators[el.toLowerCase()]);
              if (hasOverrideMessage) {
                validator.message = message;
              }
              var validatorType = validator.type.toLowerCase();

              if (validatorType === "shortcut") {
                foundValidator = true;
              } else {
                $.each(
                  settings.validatorTypes,
                  function (validatorTemplateType, validatorTemplate) {
                    if (validators[validatorTemplateType] === undefined) {
                      validators[validatorTemplateType] = [];
                    }
                    if (!foundValidator && validatorType === validatorTemplateType.toLowerCase()) {
                      $this.data(
                        "validation" + el + formatValidatorName(validatorTemplate.name),
                        validator[validatorTemplate.name.toLowerCase()]
                      );
                      validators[validatorType].push(
                        $.extend(
                          validator,
                          validatorTemplate.init($this, el)
                        )
                      );
                      foundValidator = true;
                    }
                  }
                );
              }
            }

            if (! foundValidator) {
              $.error("Cannot find validation info for '" + el + "'");
            }
          });

          // =============================================================
          //                                         STORE FALLBACK VALUES
          // =============================================================

          $helpBlock.data(
            "original-contents",
            (
              $helpBlock.data("original-contents") ?
                $helpBlock.data("original-contents") : 
                $helpBlock.html()
            )
          );

          $helpBlock.data(
            "original-role",
            (
              $helpBlock.data("original-role") ?
                $helpBlock.data("original-role") :
                $helpBlock.attr("role")
            )
          );

          $controlGroup.data(
            "original-classes",
            (
              $controlGroup.data("original-clases") ?
                $controlGroup.data("original-classes") :
                $controlGroup.attr("class")
            )
          );

          $this.data(
            "original-aria-invalid",
            (
              $this.data("original-aria-invalid") ?
                $this.data("original-aria-invalid") :
                $this.attr("aria-invalid")
            )
          );

          // =============================================================
          //                                                    VALIDATION
          // =============================================================

          $this.bind(
            "validation.validation",
            function (event, params) {

              var value = getValue($this);

              // Get a list of the errors to apply
              var errorsFound = [];

              $.each(validators, function (validatorType, validatorTypeArray) {
                if (
                    value || // has a truthy value
                    value.length || // not an empty string
                    ( // am including empty values
                      (
                        params && 
                        params.includeEmpty 
                      ) ||
                      !!settings.validatorTypes[validatorType].includeEmpty
                    ) ||
                    ( // validator is blocking submit
                      !!settings.validatorTypes[validatorType].blockSubmit &&
                      params &&
                      !!params.submitting
                    )
                  ) 
                {
                  $.each(
                    validatorTypeArray,
                    function (i, validator) {
                      if (settings.validatorTypes[validatorType].validate($this, value, validator)) {
                        errorsFound.push(validator.message);
                      }
                    }
                  );
                }
              });

              return errorsFound;
            }
          );

          $this.bind(
            "getValidators.validation",
            function () {
              return validators;
            }
          );

          // =============================================================
          //                                             WATCH FOR CHANGES
          // =============================================================
          $this.bind(
            "submit.validation",
            function () {
              return $this.triggerHandler("change.validation", {submitting: true});
            }
          );
          $this.bind(
            (
                settings.options.bindEvents.length > 0 ?
                settings.options.bindEvents :
                [
                    "keyup",
                    "focus",
                    "blur",
                    "click",
                    "keydown",
                    "keypress",
                    "change"
                ]
            ).concat(["revalidate"]).join(".validation ") + ".validation",
            function (e, params) {

              var value = getValue($this);

              var errorsFound = [];
              
              if (params && !!params.submitting) {
                $controlGroup.data("jqbvIsSubmitting", true);
              } else if (e.type !== "revalidate") {
                $controlGroup.data("jqbvIsSubmitting", false);
              }
              
              var formIsSubmitting = !!$controlGroup.data("jqbvIsSubmitting");

              $controlGroup.find("input,textarea,select").each(function (i, el) {
                var oldCount = errorsFound.length;
                $.each($(el).triggerHandler("validation.validation", params), function (j, message) {
                  errorsFound.push(message);
                });
                if (errorsFound.length > oldCount) {
                  $(el).attr("aria-invalid", "true");
                } else {
                  var original = $this.data("original-aria-invalid");
                  $(el).attr("aria-invalid", (original !== undefined ? original : false));
                }
              });

              $form.find("input,select,textarea").not($this).not("[name=\"" + $this.attr("name") + "\"]").trigger("validationLostFocus.validation");

              errorsFound = $.unique(errorsFound.sort());

              // Were there any errors?
              if (errorsFound.length) {
                // Better flag it up as a warning.
                $controlGroup.removeClass("success error warning").addClass(formIsSubmitting ? "error" : "warning");

                // How many errors did we find?
                if (settings.options.semanticallyStrict && errorsFound.length === 1) {
                  // Only one? Being strict? Just output it.
                  $helpBlock.html(errorsFound[0] + 
                    ( settings.options.prependExistingHelpBlock ? $helpBlock.data("original-contents") : "" ));
                } else {
                  // Multiple? Being sloppy? Glue them together into an UL.
                  $helpBlock.html("<ul role=\"alert\"><li>" + errorsFound.join("</li><li>") + "</li></ul>" +
                    ( settings.options.prependExistingHelpBlock ? $helpBlock.data("original-contents") : "" ));
                }
              } else {
                $controlGroup.removeClass("warning error success");
                if (value.length > 0) {
                  $controlGroup.addClass("success");
                }
                $helpBlock.html($helpBlock.data("original-contents"));
              }

              if (e.type === "blur") {
                $controlGroup.removeClass("success");
              }
            }
          );
          $this.bind("validationLostFocus.validation", function () {
            $controlGroup.removeClass("success");
          });
        });
      },
      destroy : function( ) {

        return this.each(
          function() {

            var
              $this = $(this),
              $controlGroup = $this.parents(".control-group").first(),
              $helpBlock = $controlGroup.find(".help-block").first();

            // remove our events
            $this.unbind('.validation'); // events are namespaced.
            // reset help text
            $helpBlock.html($helpBlock.data("original-contents"));
            // reset classes
            $controlGroup.attr("class", $controlGroup.data("original-classes"));
            // reset aria
            $this.attr("aria-invalid", $this.data("original-aria-invalid"));
            // reset role
            $helpBlock.attr("role", $this.data("original-role"));
            // remove all elements we created
            if ($.inArray($helpBlock[0], createdElements) > -1) {
                $helpBlock.remove();
            }

          }
        );

      },
      collectErrors : function(includeEmpty) {

        var errorMessages = {};
        this.each(function (i, el) {
          var $el = $(el);
          var name = $el.attr("name");
          var errors = $el.triggerHandler("validation.validation", {includeEmpty: true});
          errorMessages[name] = $.extend(true, errors, errorMessages[name]);
        });

        $.each(errorMessages, function (i, el) {
          if (el.length === 0) {
            delete errorMessages[i];
          }
        });

        return errorMessages;

      },
      hasErrors: function() {

        var errorMessages = [];

        this.find('input,select,textarea').add(this).each(function (i, el) {
          errorMessages = errorMessages.concat(
            $(el).triggerHandler("getValidators.validation") ? $(el).triggerHandler("validation.validation", {submitting: true}) : []
          );
        });

        return (errorMessages.length > 0);
      },
      override : function (newDefaults) {
        defaults = $.extend(true, defaults, newDefaults);
      }
    },
		validatorTypes: {
      callback: {
                name: "callback",
                init: function($this, name) {
                    var result = {
                        validatorName: name,
                        callback: $this.data("validation" + name + "Callback"),
                        lastValue: $this.val(),
                        lastValid: true,
                        lastFinished: true
                    };

                    var message = "Not valid";
                    if ($this.data("validation" + name + "Message")) {
                        message = $this.data("validation" + name + "Message");
                    }
                    result.message = message;

                    return result;
                },
                validate: function($this, value, validator) {
                    if (validator.lastValue === value && validator.lastFinished) {
                        return !validator.lastValid;
                    }

                    if (validator.lastFinished === true)
                    {
                        validator.lastValue = value;
                        validator.lastValid = true;
                        validator.lastFinished = false;

                        var rrjqbvValidator = validator;
                        var rrjqbvThis = $this;
                        executeFunctionByName(
                            validator.callback,
                            window,
                            $this,
                            value,
                            function(data) {
                                if (rrjqbvValidator.lastValue === data.value) {
                                    rrjqbvValidator.lastValid = data.valid;
                                    if (data.message) {
                                        rrjqbvValidator.message = data.message;
                                    }
                                    rrjqbvValidator.lastFinished = true;
                                    rrjqbvThis.data(
                                        "validation" + rrjqbvValidator.validatorName + "Message", 
                                        rrjqbvValidator.message
                                    );
                                    
                                    // Timeout is set to avoid problems with the events being considered 'already fired'
                                    setTimeout(function() {
                                        if (!$this.is(":focus") && $this.parents("form").first().data("jqbvIsSubmitting")) {
                                            rrjqbvThis.trigger("blur.validation");
                                        } else {
                                            rrjqbvThis.trigger("revalidate.validation");
                                        }
                                    }, 1); // doesn't need a long timeout, just long enough for the event bubble to burst
                                }
                            }
                        );
                    }

                    return false;

                }
      },
      ajax: {
        name: "ajax",
        init: function ($this, name) {
          return {
            validatorName: name,
            url: $this.data("validation" + name + "Ajax"),
            lastValue: $this.val(),
            lastValid: true,
            lastFinished: true
          };
        },
        validate: function ($this, value, validator) {
          if (""+validator.lastValue === ""+value && validator.lastFinished === true) {
            return validator.lastValid === false;
          }

          if (validator.lastFinished === true)
          {
            validator.lastValue = value;
            validator.lastValid = true;
            validator.lastFinished = false;
            $.ajax({
              url: validator.url,
              data: "value=" + encodeURIComponent(value) + "&field=" + $this.attr("name"),
              dataType: "json",
              success: function (data) {
                if (""+validator.lastValue === ""+data.value) {
                  validator.lastValid = !!(data.valid);
                  if (data.message) {
                    validator.message = data.message;
                  }
                  validator.lastFinished = true;
                  $this.data("validation" + validator.validatorName + "Message", validator.message);
                  // Timeout is set to avoid problems with the events being considered 'already fired'
                  setTimeout(function () {
                    $this.trigger("revalidate.validation");
                  }, 1); // doesn't need a long timeout, just long enough for the event bubble to burst
                }
              },
              failure: function () {
                validator.lastValid = true;
                validator.message = "ajax call failed";
                validator.lastFinished = true;
                $this.data("validation" + validator.validatorName + "Message", validator.message);
                // Timeout is set to avoid problems with the events being considered 'already fired'
                setTimeout(function () {
                  $this.trigger("revalidate.validation");
                }, 1); // doesn't need a long timeout, just long enough for the event bubble to burst
              }
            });
          }

          return false;

        }
      },
			regex: {
				name: "regex",
				init: function ($this, name) {
          var result = {};
          var regexString = $this.data("validation" + name + "Regex");
          result.regex = regexFromString(regexString);
          if (regexString === undefined) {
            $.error("Can't find regex for '" + name + "' validator on '" + $this.attr("name") + "'");
          }
          
          var message = "Not in the expected format";
          if ($this.data("validation" + name + "Message")) {
            message = $this.data("validation" + name + "Message");
          }
        
          result.message = message;
        
          result.originalName = name;
					return result;
				},
				validate: function ($this, value, validator) {
					return (!validator.regex.test(value) && ! validator.negative) || 
						(validator.regex.test(value) && validator.negative);
				}
			},
			email: {
				name: "email",
				init: function ($this, name) {
          var result = {};
          result.regex = regexFromString('[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}');
          
          var message = "Not a valid email address";
          if ($this.data("validation" + name + "Message")) {
            message = $this.data("validation" + name + "Message");
          }
        
          result.message = message;
        
          result.originalName = name;
					return result;
				},
				validate: function ($this, value, validator) {
					return (!validator.regex.test(value) && ! validator.negative) || 
						(validator.regex.test(value) && validator.negative);
				}
			},
			required: {
				name: "required",
				init: function ($this, name) {
          var message = "This is required";
          if ($this.data("validation" + name + "Message")) {
            message = $this.data("validation" + name + "Message");
          }
          
					return {message: message};
				},
				validate: function ($this, value, validator) {
					return !!(value.length === 0  && ! validator.negative) ||
						!!(value.length > 0 && validator.negative);
				},
        blockSubmit: true
			},
			match: {
				name: "match",
				init: function ($this, name) {
          var elementName = $this.data("validation" + name + "Match");
          var $form = $this.parents("form").first();
					var $element = $form.find("[name=\"" + elementName + "\"]").first();
					$element.bind("validation.validation", function () {
						$this.trigger("revalidate.validation", {submitting: true});
					});
          var result = {};
          result.element = $element;
          
          if ($element.length === 0) {
            $.error("Can't find field '" + elementName + "' to match '" + $this.attr("name") + "' against in '" + name + "' validator");
          }
        
          var message = "Must match";
          var $label = null;
          if (($label = $form.find("label[for=\"" + elementName + "\"]")).length) {
            message += " '" + $label.text() + "'";
          } else if (($label = $element.parents(".control-group").first().find("label")).length) {
            message += " '" + $label.first().text() + "'";
          }
        
          if ($this.data("validation" + name + "Message")) {
            message = $this.data("validation" + name + "Message");
          }
        
          result.message = message;
        
					return result;
				},
				validate: function ($this, value, validator) {
					return (value !== validator.element.val() && ! validator.negative) || 
						(value === validator.element.val() && validator.negative);
				},
        blockSubmit: true,
        includeEmpty: true
			},
			max: {
				name: "max",
				init: function ($this, name) {
          var result = {};
          
          result.max = $this.data("validation" + name + "Max");
          
          result.message = "Too high: Maximum of '" + result.max + "'";
          if ($this.data("validation" + name + "Message")) {
            result.message = $this.data("validation" + name + "Message");
          }
          
					return result;
				},
				validate: function ($this, value, validator) {
					return (parseFloat(value, 10) > parseFloat(validator.max, 10) && ! validator.negative) ||
						(parseFloat(value, 10) <= parseFloat(validator.max, 10) && validator.negative);
				}
			},
			min: {
				name: "min",
				init: function ($this, name) {
					var result = {};
          
          result.min = $this.data("validation" + name + "Min");
          
          result.message = "Too low: Minimum of '" + result.min + "'";
          if ($this.data("validation" + name + "Message")) {
            result.message = $this.data("validation" + name + "Message");
          }
          
					return result;
				},
				validate: function ($this, value, validator) {
					return (parseFloat(value) < parseFloat(validator.min) && ! validator.negative) ||
						(parseFloat(value) >= parseFloat(validator.min) && validator.negative);
				}
			},
			maxlength: {
				name: "maxlength",
				init: function ($this, name) {
          var result = {};
          
          result.maxlength = $this.data("validation" + name + "Maxlength");
          
          result.message = "Too long: Maximum of '" + result.maxlength + "' characters";
          if ($this.data("validation" + name + "Message")) {
            result.message = $this.data("validation" + name + "Message");
          }
          
					return result;
				},
				validate: function ($this, value, validator) {
					return ((value.length > validator.maxlength) && ! validator.negative) ||
						((value.length <= validator.maxlength) && validator.negative);
				}
			},
			minlength: {
				name: "minlength",
				init: function ($this, name) {
					var result = {};
          
          result.minlength = $this.data("validation" + name + "Minlength");
          
          result.message = "Too short: Minimum of '" + result.minlength + "' characters";
          if ($this.data("validation" + name + "Message")) {
            result.message = $this.data("validation" + name + "Message");
          }
          
					return result;
				},
				validate: function ($this, value, validator) {
					return ((value.length < validator.minlength) && ! validator.negative) ||
						((value.length >= validator.minlength) && validator.negative);
				}
			},
			maxchecked: {
				name: "maxchecked",
				init: function ($this, name) {
          var result = {};
          
					var elements = $this.parents("form").first().find("[name=\"" + $this.attr("name") + "\"]");
					elements.bind("change.validation click.validation", function () {
						$this.trigger("revalidate.validation", {includeEmpty: true});
					});
          
          result.elements = elements;
          result.maxchecked = $this.data("validation" + name + "Maxchecked");
          
          var message = "Too many: Max '" + result.maxchecked + "' checked";
          if ($this.data("validation" + name + "Message")) {
            message = $this.data("validation" + name + "Message");
          }
          result.message = message;
          
					return result;
				},
				validate: function ($this, value, validator) {
					return (validator.elements.filter(":checked").length > validator.maxchecked && ! validator.negative) ||
						(validator.elements.filter(":checked").length <= validator.maxchecked && validator.negative);
				},
        blockSubmit: true
			},
			minchecked: {
				name: "minchecked",
				init: function ($this, name) {
          var result = {};
          
					var elements = $this.parents("form").first().find("[name=\"" + $this.attr("name") + "\"]");
					elements.bind("change.validation click.validation", function () {
						$this.trigger("revalidate.validation", {includeEmpty: true});
					});
          
          result.elements = elements;
          result.minchecked = $this.data("validation" + name + "Minchecked");
          
          var message = "Too few: Min '" + result.minchecked + "' checked";
          if ($this.data("validation" + name + "Message")) {
            message = $this.data("validation" + name + "Message");
          }
          result.message = message;
          
					return result;
				},
				validate: function ($this, value, validator) {
					return (validator.elements.filter(":checked").length < validator.minchecked && ! validator.negative) ||
						(validator.elements.filter(":checked").length >= validator.minchecked && validator.negative);
				},
        blockSubmit: true,
        includeEmpty: true
			},
      number: {
        name: "number",
        init: function ($this, name) {
          var result = {};
          result.step = 1;
          if ($this.attr("step")) {
            result.step = $this.attr("step");
          }
          if ($this.data("validation" + name + "Step")) {
            result.step = $this.data("validation" + name + "Step");
          }
        
          result.decimal = ".";
          if ($this.data("validation" + name + "Decimal")) {
            result.decimal = $this.data("validation" + name + "Decimal");
          }
        
          result.thousands = "";
          if ($this.data("validation" + name + "Thousands")) {
            result.thousands = $this.data("validation" + name + "Thousands");
          }
        
          result.regex = regexFromString("([+-]?\\d+(\\" + result.decimal + "\\d+)?)?");
          
          result.message = "Must be a number";
          var dataMessage = $this.data("validation" + name + "Message");
          if (dataMessage) {
            result.message = dataMessage;
          }
                  
          return result;
        },
        validate: function ($this, value, validator) {
          var globalValue = value.replace(validator.decimal, ".").replace(validator.thousands, "");
          var multipliedValue = parseFloat(globalValue);
          var multipliedStep = parseFloat(validator.step);
          while (multipliedStep % 1 !== 0) {
            multipliedStep *= 10;
            multipliedValue *= 10;
          }
          var regexResult = validator.regex.test(value);
          var stepResult = parseFloat(multipliedValue) % parseFloat(multipliedStep) === 0;
          var typeResult = !isNaN(parseFloat(globalValue)) && isFinite(globalValue);
          var result = !(regexResult && stepResult && typeResult);
          return result;
        },
        message: "Must be a number"
      }
		},
		builtInValidators: {
			email: {
				name: "Email",
				type: "email"
			},
			passwordagain: {
				name: "Passwordagain",
				type: "match",
				match: "password",
				message: "Does not match the given password<!-- data-validator-paswordagain-message to override -->"
			},
			positive: {
				name: "Positive",
				type: "shortcut",
				shortcut: "number,positivenumber"
			},
			negative: {
				name: "Negative",
				type: "shortcut",
				shortcut: "number,negativenumber"
			},
			integer: {
				name: "Integer",
				type: "regex",
				regex: "[+-]?\\d+",
				message: "No decimal places allowed<!-- data-validator-integer-message to override -->"
			},
			positivenumber: {
				name: "Positivenumber",
				type: "min",
				min: 0,
				message: "Must be a positive number<!-- data-validator-positivenumber-message to override -->"
			},
			negativenumber: {
				name: "Negativenumber",
				type: "max",
				max: 0,
				message: "Must be a negative number<!-- data-validator-negativenumber-message to override -->"
			},
			required: {
				name: "Required",
				type: "required",
				message: "This is required<!-- data-validator-required-message to override -->"
			},
			checkone: {
				name: "Checkone",
				type: "minchecked",
				minchecked: 1,
				message: "Check at least one option<!-- data-validation-checkone-message to override -->"
			},
      number: {
        name: "Number",
        type: "number",
        decimal: ".",
        step: "1"
			},
      pattern: {
        name: "Pattern",
        type: "regex",
        message: "Not in expected format"
      }
		}
	};

	var formatValidatorName = function (name) {
		return name
			.toLowerCase()
			.replace(
				/(^|\s)([a-z])/g ,
				function(m,p1,p2) {
					return p1+p2.toUpperCase();
				}
			)
		;
	};

	var getValue = function ($this) {
		// Extract the value we're talking about
		var value = $this.val();
		var type = $this.attr("type");
    var parent = null;
    var hasParent = !!(parent = $this.parents("form").first()) || !!(parent = $this.parents(".control-group").first());
		if (type === "checkbox") {
      value = ($this.is(":checked") ? value : "");
      if (hasParent) {
        value = parent.find("input[type='checkbox'][name='" + $this.attr("name") + "']:checked").map(function (i, el) { return $(el).val(); }).toArray().join(",");
      }
		}
		if (type === "radio") {
			value = ($('input[name="' + $this.attr("name") + '"]:checked').length > 0 ? value : "");
      if (hasParent) {
        value = parent.find("input[type='radio'][name='" + $this.attr("name") + "']:checked").map(function (i, el) { return $(el).val(); }).toArray().join(",");
      }
		}
		return value;
	};

  function regexFromString(inputstring) {
		return new RegExp("^" + inputstring + "$");
	}

  /**
   * Thanks to Jason Bunting / Alex Nazarov via StackOverflow.com
   *
   * http://stackoverflow.com/a/4351575
  **/
function executeFunctionByName(functionName, context /*, args */) {
    var args = Array.prototype.slice.call(arguments, 2);
    var namespaces = functionName.split(".");
    var func = namespaces.pop();
    for (var i = 0; i < namespaces.length; i++) {
        context = context[namespaces[i]];
    }
    return context[func].apply(context, args);
}

$.fn.jqBootstrapValidation = function( method ) {

	if ( defaults.methods[method] ) {
		return defaults.methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
	} else if ( typeof method === 'object' || ! method ) {
		return defaults.methods.init.apply( this, arguments );
	} else {
	$.error( 'Method ' +  method + ' does not exist on jQuery.jqBootstrapValidation' );
		return null;
	}

};

  $.jqBootstrapValidation = function (options) {
    $(":input").not("[type=image],[type=submit]").jqBootstrapValidation.apply(this,arguments);
  };

})( jQuery );
