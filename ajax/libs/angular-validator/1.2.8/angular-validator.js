angular.module('angularValidator', []);

angular.module('angularValidator').directive('angularValidator', ['$injector', '$parse',
    function($injector, $parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs, fn) {

                // This is the DOM form element
                var DOMForm = angular.element(element)[0];

                // an array to store all the watches for form elements
                var watches = [];

                // This is the the scope form model
                // All validation states are contained here
                var form_name = DOMForm.attributes['name'].value;
                var scopeForm = $parse(form_name)(scope);

                // Set the default submitted state to false
                scopeForm.submitted = false;
                
                // Watch form length to add watches for new form elements
                scope.$watch(function(){return Object.keys(scopeForm).length;}, function(){
                    // Destroy all the watches
                    // This is cleaner than figuring out which items are already being watched and only un-watching those.
                    angular.forEach(watches, function(watch){watch();});
                    setupWatches(DOMForm);
                });
              

                // Intercept and handle submit events of the form
                element.on('submit', function(event) {
                    event.preventDefault();
                    scope.$apply(function() {
                        scopeForm.submitted = true;
                    });

                    // If the form is valid then call the function that is declared in the angular-validator-submit attribute on the form element
                    if (scopeForm.$valid) {
                        scope.$apply(function() {
                            scope.$eval(DOMForm.attributes["angular-validator-submit"].value);
                        });
                    }
                });


                scopeForm.reset = function(){
                    // Clear all the form values
                    for (var i = 0; i < DOMForm.length; i++) {
                        if (DOMForm[i].name){
                            scopeForm[DOMForm[i].name].$setViewValue("");
                            scopeForm[DOMForm[i].name].$render();
                        }
                    }
                    scopeForm.submitted = false;
                    scopeForm.$setPristine();
                };


                // Setup watches on all form fields 
                setupWatches(DOMForm);

                  //check if there is invalid message service for the entire form; if yes, return the injected service; if no, return false;
                function hasFormInvalidMessage(formElement) {
                    if (formElement && 'invalid-message' in formElement.attributes) {
                        return $injector.get(formElement.attributes['invalid-message'].value);
                    } else {
                        return false;
                    }
                }

                // Iterate through the form fields and setup watches on each one
                function setupWatches(formElement) {
                    var formInvalidMessage = hasFormInvalidMessage(formElement);
                    for (var i = 0; i < formElement.length; i++) {
                        // This ensures we are only watching form fields
                        if (i in formElement) {
                            setupWatch(formElement[i], formInvalidMessage);
                        }
                    }
                }


                // Setup $watch on a single formfield
                function setupWatch(elementToWatch, formInvalidMessage) {
                    // If element is set to validate on blur then update the element on blur
                    if ("validate-on" in elementToWatch.attributes && elementToWatch.attributes["validate-on"].value === "blur") {
                        angular.element(elementToWatch).on('blur', function() {
                            updateValidationMessage(elementToWatch, formInvalidMessage);
                            updateValidationClass(elementToWatch);
                        });
                    }

                    var watch = scope.$watch(function() {
                            return elementToWatch.value + elementToWatch.required + scopeForm.submitted + checkElementValidity(elementToWatch) + getDirtyValue(scopeForm[elementToWatch.name]) + getValidValue(scopeForm[elementToWatch.name]);
                        },
                        function() {
                           
                            if (scopeForm.submitted){
                                updateValidationMessage(elementToWatch, formInvalidMessage);
                                updateValidationClass(elementToWatch);
                            }
                            else {
                                // Determine if the element in question is to be updated on blur
                                var isDirtyElement = "validate-on" in elementToWatch.attributes && elementToWatch.attributes["validate-on"].value === "dirty";

                                if (isDirtyElement){
                                    updateValidationMessage(elementToWatch, formInvalidMessage);
                                    updateValidationClass(elementToWatch);
                                }
                                // This will get called in the case of resetting the form. This only gets called for elements that update on blur and submit.
                                else if (scopeForm[elementToWatch.name] && scopeForm[elementToWatch.name].$pristine){
                                    updateValidationMessage(elementToWatch, formInvalidMessage);
                                    updateValidationClass(elementToWatch);
                                }
                            }

                        });

                    watches.push(watch);
                }


                // Returns the $dirty value of the element if it exists
                function getDirtyValue(element) {
                    if (element) {
                        if ("$dirty" in element) {
                            return element.$dirty;
                        }
                    }
                }


                function getValidValue(element) {
                    if (element) {
                        if ("$valid" in element) {
                            return element.$valid;
                        }
                    }
                }


                function checkElementValidity(element) {
                    // If element has a custom validation function
                    if ("validator" in element.attributes) {
                        // Call the custom validator function
                        var isElementValid = scope.$eval(element.attributes.validator.value);
                        scopeForm[element.name].$setValidity("angularValidator", isElementValid);
                        return isElementValid;
                    }
                }


                // Adds and removes an error message as a sibling element of the form field
                // depending on the validity of the form field and the submitted state of the form.
                // Will use default message if a custom message is not given
                function updateValidationMessage(element, formInvalidMessage) {

                    var defaultRequiredMessage = function() {
                        return "<i class='fa fa-times'></i> Required";
                    };
                    var defaultInvalidMessage = function() {
                        return "<i class='fa fa-times'></i> Invalid";
                    };

                    // Make sure the element is a form field and not a button for example
                    // Only form elements should have names. 
                    if (!(element.name in scopeForm)) {
                        return;
                    }

                    var scopeElementModel = scopeForm[element.name];

                    // Remove all validation messages 
                    var validationMessageElement = isValidationMessagePresent(element);
                    if (validationMessageElement) {
                        validationMessageElement.remove();
                    }


                    // Only add validation messages if the form field is $dirty or the form has been submitted
                    if (scopeElementModel.$dirty || (scope[element.form.name] && scope[element.form.name].submitted)) {

                        if (scopeElementModel.$error.required) {
                            // If there is a custom required message display it
                            if ("required-message" in element.attributes) {
                                angular.element(element).after(generateErrorMessage(element.attributes['required-message'].value));
                            }
                            // Display the default required message
                            else {
                                angular.element(element).after(generateErrorMessage(defaultRequiredMessage));
                            }
                        } else if (!scopeElementModel.$valid) {
                            // If there is a custom validation message add it
                            if ("invalid-message" in element.attributes) {
                                angular.element(element).after(generateErrorMessage(element.attributes['invalid-message'].value));
                            }
                            // Display error message provided by custom service
                            else if (formInvalidMessage) {
                                angular.element(element).after(generateErrorMessage(formInvalidMessage.message(scopeElementModel, element)));
                            }
                            // Display the default error message
                            else {
                                angular.element(element).after(generateErrorMessage(defaultInvalidMessage));
                            }
                        }
                    }
                }


                function generateErrorMessage(messageText) {
                    return "<label class='control-label has-error validationMessage'>" + scope.$eval(messageText) + "</label>";
                }


                // Returns the validation message element or False
                function isValidationMessagePresent(element) {
                    var elementSiblings = angular.element(element).parent().children();
                    for (var i = 0; i < elementSiblings.length; i++) {
                        if (angular.element(elementSiblings[i]).hasClass("validationMessage")) {
                            return angular.element(elementSiblings[i]);
                        }
                    }
                    return false;
                }


                // Adds and removes .has-error class to both the form element and the form element's parent
                // depending on the validity of the element and the submitted state of the form
                function updateValidationClass(element) {
                    // Make sure the element is a form field and not a button for example
                    // Only form fields should have names. 
                    if (!(element.name in scopeForm)) {
                        return;
                    }
                    var formField = scopeForm[element.name];

                    // This is extra for users wishing to implement the .has-error class on the field itself
                    // instead of on the parent element. Note that Bootstrap requires the .has-error class to be on the parent element
                    angular.element(element).removeClass('has-error');
                    angular.element(element.parentNode).removeClass('has-error');


                    // Only add/remove validation classes if the field is $dirty or the form has been submitted
                    if (formField.$dirty || (scope[element.form.name] && scope[element.form.name].submitted)) {
                      if (formField.$invalid) {
                            angular.element(element.parentNode).addClass('has-error');

                            // This is extra for users wishing to implement the .has-error class on the field itself
                            // instead of on the parent element. Note that Bootstrap requires the .has-error class to be on the parent element
                            angular.element(element).addClass('has-error');
                        }
                    }
                }

            }
        };
    }]
);
