/*

notie - a clean and simple notification suite for javascript, with no dependencies

Copyright (c) 2016 Jared Reich

Licensed under the MIT license:
http://www.opensource.org/licenses/mit-license.php

Project demo:
https://jaredreich.com/projects/notie

Version:  3.1.0

*/

var notie = function() {
	
	// Default options
	var options = {
		animationDelay: 300,
		backgroundClickDismiss: true
	}	
	function setOptions(customOptions) {
		// Custom options
		for (var key in customOptions) {
			options[key] = customOptions[key];
		}
	}
	
	
	// alert
    // **************
	
	// create alert container
	var alertOuter = document.createElement('div');
	alertOuter.id = 'notie-alert-outer';
	
	// Hide alert on click
    alertOuter.onclick = function() {
        clearTimeout(alertTimeout1);
        clearTimeout(alertTimeout2);
        alertHide();
    };
	
	// add alert to body
	document.body.appendChild(alertOuter);
	
	// create alert inner container
	var alertInner = document.createElement('div');
    alertInner.id = 'notie-alert-inner';
    alertOuter.appendChild(alertInner);
	
	// create alert content container
	var alertContent = document.createElement('div');
    alertContent.id = 'notie-alert-content';
    alertInner.appendChild(alertContent);
	
	// Initialize alert text
    var alertText = document.createElement('span');
    alertText.id = 'notie-alert-text';
    alertContent.appendChild(alertText);
	
	// alert helper variables
    var alertIsShowing = false;
    var alertTimeout1;
    var alertTimeout2;
    var wasClickedCounter = 0;
	
	function alert(type, message, seconds) {
		
		blur();

        wasClickedCounter++;

        setTimeout(function() {
            wasClickedCounter--;
        }, (options.animationDelay + 10));

        if (wasClickedCounter === 1) {

            if (alertIsShowing) {

                clearTimeout(alertTimeout1);
                clearTimeout(alertTimeout2);

                alertHide(function() {
                    alertShow(type, message, seconds);
                });

            }
            else {
                alertShow(type, message, seconds);
            }

        }

    }

    function alertShow(type, message, seconds) {

        alertIsShowing = true;

        var duration = 0;
        if (typeof seconds === 'undefined' || seconds === 0) {
            var duration = 86400000;
        }
        else if (seconds > 0 && seconds < 1) {
            duration = 1000;
        }
        else {
            duration = seconds * 1000;
        }
		
		// Remove all color classes first
		removeClass(alertOuter, 'notie-background-success');
		removeClass(alertOuter, 'notie-background-warning');
		removeClass(alertOuter, 'notie-background-error');
		removeClass(alertOuter, 'notie-background-info');
		
        // Set notie type (background color)
        switch(type) {
            case 1:
				addClass(alertOuter, 'notie-background-success');
                break;
            case 2:
                addClass(alertOuter, 'notie-background-warning');
                break;
            case 3:
                addClass(alertOuter, 'notie-background-error');
                break;
            case 4:
                addClass(alertOuter, 'notie-background-info');
                break;
        }

        // Set notie text
        alertText.innerHTML = message;

        alertOuter.style.top = '-10000px';
        alertOuter.style.display = 'table';
        alertOuter.style.top = '-' + alertOuter.offsetHeight - 5 + 'px';

        alertTimeout1 = setTimeout(function() {
			
			addClass(alertOuter, 'notie-transition');

            alertOuter.style.top = 0;

            alertTimeout2 = setTimeout(function() {

                alertHide(function() {
                    // Nothing
                });

            }, duration);

        }, 20);
		
    }

    function alertHide(callback) {

        alertOuter.style.top = '-' + alertOuter.offsetHeight - 5 + 'px';

        setTimeout(function() {
			
			removeClass(alertOuter, 'notie-transition');
            
            alertOuter.style.top = '-10000px';

            alertIsShowing = false;

            if (callback) { callback(); }

        }, (options.animationDelay + 10));

    }
	
	
	
	// confirm
    // **************
	
	var confirmOuter = document.createElement('div');
    confirmOuter.id = 'notie-confirm-outer';
	
	var confirmInner = document.createElement('div');
    confirmInner.id = 'notie-confirm-inner';
    confirmOuter.appendChild(confirmInner);
	
	var confirmText = document.createElement('span');
    confirmText.id = 'notie-confirm-text';
    confirmInner.appendChild(confirmText);
	
	var confirmYes = document.createElement('div');
    confirmYes.id = 'notie-confirm-yes'
    confirmOuter.appendChild(confirmYes);

    var confirmNo = document.createElement('div');
   	confirmNo.id = 'notie-confirm-no';
	confirmOuter.appendChild(confirmNo);
	
	var confirmTextYes = document.createElement('span');
    confirmTextYes.id = 'notie-confirm-text-yes';
    confirmYes.appendChild(confirmTextYes);

    var confirmTextNo = document.createElement('span');
    confirmTextNo.id = 'notie-confirm-text-no';
    confirmNo.appendChild(confirmTextNo);
	
	var confirmBackground = document.createElement('div');
    confirmBackground.id = 'notie-confirm-background';
	addClass(confirmBackground, 'notie-transition');
	
	// Hide notie.confirm on no click and background click
    confirmBackground.onclick = function() {
        if (options.backgroundClickDismiss) {
            confirmHide();
        }
    };
	
	// Attach confirm elements to the body element
    document.body.appendChild(confirmOuter);
    document.body.appendChild(confirmBackground);
	
	// confirm helper variables
    var confirmIsShowing = false;

    function confirm(title, yesText, noText, yesCallback, noCallback) {
		
		blur();
        
        if (alertIsShowing) {
            // Hide notie.alert
            clearTimeout(alertTimeout1);
            clearTimeout(alertTimeout2);
            alertHide(function() {
                confirmShow(title, yesText, noText, yesCallback, noCallback);
            });
        }
        else {
            confirmShow(title, yesText, noText, yesCallback, noCallback);
        }
        

    }
    function confirmShow(title, yesText, noText, yesCallback, noCallback) {

        scrollDisable();

        // Yes callback function
        confirmYes.onclick = function() {
            confirmHide();
			if (yesCallback) {
				setTimeout(function() {
					yesCallback();
				}, (options.animationDelay + 10));
			}
        }
		
		// No callback function
		confirmNo.onclick = function() {
            confirmHide();
            if (noCallback) {
				setTimeout(function() {
					noCallback();
				}, (options.animationDelay + 10));
			}
        }

        function confirmShowInner() {

            // Set confirm text
            confirmText.innerHTML = title;
            confirmTextYes.innerHTML = yesText;
            confirmTextNo.innerHTML = noText;

            // Get confirm's height
            confirmOuter.style.top = '-10000px';
            confirmOuter.style.display = 'table';
            confirmOuter.style.top = '-' + confirmOuter.offsetHeight - 5 + 'px';
            confirmBackground.style.display = 'block';

            setTimeout(function() {
				
                addClass(confirmOuter, 'notie-transition');

                confirmOuter.style.top = 0;
                confirmBackground.style.opacity = '0.75';

                setTimeout(function() {
                    confirmIsShowing = true;
                }, (options.animationDelay + 10));

            }, 20);

        }

        if (confirmIsShowing) {
            confirmHide();
            setTimeout(function() {
                confirmShowInner();
            }, (options.animationDelay + 10));
        }
        else {
            confirmShowInner();
        }

    }

    function confirmHide() {

        confirmOuter.style.top = '-' + confirmOuter.offsetHeight - 5 + 'px';
        confirmBackground.style.opacity = '0';

        setTimeout(function() {
			
            removeClass(confirmOuter, 'notie-transition');
			confirmOuter.style.top = '-10000px';
            confirmBackground.style.display = 'none';

            scrollEnable();

            confirmIsShowing = false;

        }, (options.animationDelay + 10));

    }
	
	
	
	
	// input
    // **********

    var inputOuter = document.createElement('div');
    inputOuter.id = 'notie-input-outer';
	
	var inputBackground = document.createElement('div');
    inputBackground.id = 'notie-input-background';
	addClass(inputBackground, 'notie-transition');
	
	var inputInner = document.createElement('div');
    inputInner.id = 'notie-input-inner';
    inputOuter.appendChild(inputInner);
	
    var inputField = document.createElement('input');
    inputField.id = 'notie-input-field';
	inputField.setAttribute('autocomplete', 'off');
    inputField.setAttribute('autocorrect', 'off');
    inputField.setAttribute('autocapitalize', 'off');
    inputField.setAttribute('spellcheck', 'false');
	inputOuter.appendChild(inputField);
    
    var inputYes = document.createElement('div');
    inputYes.id = 'notie-input-yes';
    inputOuter.appendChild(inputYes);

    var inputNo = document.createElement('div');
    inputNo.id = 'notie-input-no';
    inputOuter.appendChild(inputNo);
	
    var inputText = document.createElement('span');
    inputText.id = 'notie-input-text';
    inputInner.appendChild(inputText);

    var inputYesText = document.createElement('span');
    inputYesText.id = 'notie-input-text-yes';
    inputYes.appendChild(inputYesText);

    var inputNoText = document.createElement('span');
    inputNoText.id = 'notie-input-text-no';
    inputNo.appendChild(inputNoText);

    // Attach input elements to the body element
    document.body.appendChild(inputOuter);
    document.body.appendChild(inputBackground);	
	
	// Hide input on no click and background click
    inputBackground.onclick = function() {
        if (options.backgroundClickDismiss) {
            inputHide();
        }
    };
	
	// input helper variables
    var inputIsShowing = false;
	
	function input(options, title, submitText, cancelText, submitCallback, cancelCallback) {
		
		blur();
		
		if (typeof options.type !== 'undefined' && options.type) {
			inputField.setAttribute('type', options.type);
		}
		else {
			inputField.setAttribute('type', 'text');
		}
		
		if (typeof options.placeholder !== 'undefined' && options.placeholder) {
			inputField.setAttribute('placeholder', options.placeholder);
		}
		else {
			// Do not set placeholder
		}
		
        if (typeof options.prefilledValue !== 'undefined' && options.prefilledValue) {
			inputField.value = options.prefilledValue;
		}
		else {
			inputField.value = '';
		}
        
        if (alertIsShowing) {
			
            // Hide alert
            clearTimeout(alertTimeout1);
            clearTimeout(alertTimeout2);
            alertHide(function() {
                inputShow(title, submitText, cancelText, submitCallback, cancelCallback);
            });
			
        }
        else {
            inputShow(title, submitText, cancelText, submitCallback, cancelCallback);
        }

    }
    function inputShow(title, submitText, cancelText, submitCallback, cancelCallback) {

        scrollDisable();

        // Yes callback function
        inputYes.onclick = function() {
            inputHide();
			if (submitCallback) {
				setTimeout(function() {
					submitCallback(inputField.value);
				}, (options.animationDelay + 10));
			}
        }
		
		// No callback function
		inputNo.onclick = function() {
            inputHide();
            if (cancelCallback) {
				setTimeout(function() {
					cancelCallback(inputField.value);
				}, (options.animationDelay + 10));
			}
        }

        function inputShowInner() {

            // Set input text
            inputText.innerHTML = title;
            inputYesText.innerHTML = submitText;
            inputNoText.innerHTML = cancelText;

            // Get input's height
            inputOuter.style.top = '-10000px';
            inputOuter.style.display = 'table';
            inputOuter.style.top = '-' + inputOuter.offsetHeight - 5 + 'px';
            inputBackground.style.display = 'block';

            setTimeout(function() {

				addClass(inputOuter, 'notie-transition');
				
                inputOuter.style.top = 0;
                inputBackground.style.opacity = '0.75';

                setTimeout(function() {
                    inputIsShowing = true;
					
					// put focus on input field
					inputField.focus();
					
                }, (options.animationDelay + 10));

            }, 20);

        }

        if (inputIsShowing) {
            inputHide();
            setTimeout(function() {
                inputShowInner();
            }, (options.animationDelay + 10));
        }
        else {
            inputShowInner();
        }

    }

    function inputHide() {

        inputOuter.style.top = '-' + inputOuter.offsetHeight - 5 + 'px';
        inputBackground.style.opacity = '0';

        setTimeout(function() {
			
			removeClass(inputOuter, 'notie-transition');
            inputBackground.style.display = 'none';
            
            inputOuter.style.top = '-10000px';

            scrollEnable();

            inputIsShowing = false;

        }, (options.animationDelay + 10));

    }
	
	
	
	// select
    // **************
	
	var selectOuter = document.createElement('div');
    selectOuter.id = 'notie-select-outer';
	
	var selectInner = document.createElement('div');
    selectInner.id = 'notie-select-inner';
    selectOuter.appendChild(selectInner);
	
	var selectText = document.createElement('span');
    selectText.id = 'notie-select-text';
	selectInner.appendChild(selectText);
	
	var selectBackground = document.createElement('div');
    selectBackground.id = 'notie-select-background';
	addClass(selectBackground, 'notie-transition');
	
	var selectChoices = document.createElement('div');
	selectChoices.id = 'notie-select-choices';
	selectOuter.appendChild(selectChoices);
	
	var selectCancel = document.createElement('div');
    selectCancel.id = 'notie-select-cancel';
	selectCancel.innerHTML = 'Cancel';
    selectOuter.appendChild(selectCancel);
	
	// Attach select elements to the body element
    document.body.appendChild(selectOuter);
    document.body.appendChild(selectBackground);
	
	// Hide input on no click and background click
    selectBackground.onclick = function() {
        if (options.backgroundClickDismiss) {
            selectHide();
        }
    };
	
	selectCancel.onclick = function() {
		selectHide();
	}
	
	// select helper variables
    var selectIsShowing = false;
	
	function select(title, choices /*, callback1, callback2, ... */) {
		
		var funcs = [];
		for (var i = 0; i < arguments.length - 2; i++) {
			funcs[i] = arguments[i + 2];
		}
		
		if (funcs.length === choices.length) {
			
			blur();
        
			if (alertIsShowing) {
				// Hide notie.alert
				clearTimeout(alertTimeout1);
				clearTimeout(alertTimeout2);
				alertHide(function() {
					selectShow(title, choices, funcs);
				});
			}
			else {
				selectShow(title, choices, funcs);
			}
			
		}
		else {
			throw 'notie.select number of choices must match number of functions';
		}

    }
	
	function selectShow(title, choices, funcs) {
		
		scrollDisable();
		
		document.getElementById('notie-select-choices').innerHTML = '';
		
		for (var i = 0; i < choices.length; i++) {
			
			var selectChoice = document.createElement('div');
			selectChoice.innerHTML = choices[i].title;
			if (choices[i].color) {
				selectChoice.style.backgroundColor = choices[i].color;
			}
			if (i < choices.length - 1) {
				selectChoice.style.borderBottom = '1px solid rgba(255, 255, 255, 0.15)';
			}
			addClass(selectChoice, 'notie-select-choice');
			selectChoices.appendChild(selectChoice);
			
			// onclick for this choice
			selectChoice.onclick = (function(i) { return function() {
				selectHide();
				setTimeout(function() {
					funcs[i]();
				}, (options.animationDelay + 10));
			};})(i);
			
		}

        function selectShowInner(title) {

            // Set select text
            selectText.innerHTML = title;

            // Get select's height
            selectOuter.style.bottom = '-10000px';
            selectOuter.style.display = 'table';
            selectOuter.style.bottom = '-' + selectOuter.offsetHeight - 5 + 'px';
            selectBackground.style.display = 'block';

            setTimeout(function() {
				
                addClass(selectOuter, 'notie-transition');

                selectOuter.style.bottom = 0;
                selectBackground.style.opacity = '0.75';

                setTimeout(function() {
                    selectIsShowing = true;
                }, (options.animationDelay + 10));

            }, 20);

        }

        if (selectIsShowing) {
            selectHide();
            setTimeout(function() {
                selectShowInner(title);
            }, (options.animationDelay + 10));
        }
        else {
            selectShowInner(title);
        }
		
	}
	
	function selectHide() {
		
		selectOuter.style.bottom = '-' + selectOuter.offsetHeight - 5 + 'px';
        selectBackground.style.opacity = '0';

        setTimeout(function() {
			
            removeClass(selectOuter, 'notie-transition');
			selectOuter.style.bottom = '-10000px';
            selectBackground.style.display = 'none';

            scrollEnable();

            selectIsShowing = false;

        }, (options.animationDelay + 10));
		
	}
	
	
	// Internal helper functions
	// #################
	
	function addClass(element, className) {
		if (element.classList) {
			element.classList.add(className);
		}
		else {
			element.className += ' ' + className;
		}
	}
	function removeClass(element, className) {
		if (element.classList) {
			element.classList.remove(className);
		}
		else {
			element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
		}
	}
	
	function blur() {
		document.activeElement.blur();
	}
	
	var originalBodyHeight, originalBodyOverflow;
    function scrollDisable() {
        originalBodyHeight = document.body.style.height;
        originalBodyOverflow = document.body.style.overflow;
        document.body.style.height = '100%';
        document.body.style.overflow = 'hidden';
    }
    function scrollEnable() {
        document.body.style.height = originalBodyHeight;
        document.body.style.overflow = originalBodyOverflow;
    }
	
	// Event listener for keydown enter and escape keys
    window.addEventListener('keydown', function(event) {
        var enterClicked = (event.which == 13 || event.keyCode == 13);
        var escapeClicked = (event.which == 27 || event.keyCode == 27);
        if (alertIsShowing) {
            if (enterClicked || escapeClicked) {
                clearTimeout(alertTimeout1);
                clearTimeout(alertTimeout2);
                alertHide();
            }
        }
        else if (confirmIsShowing) {
            if (enterClicked) {
                confirmYes.click();
            }
            else if (escapeClicked) {
                confirmHide();
            }
        }
        else if (inputIsShowing) {
            if (enterClicked) {
                inputYes.click();
            }
            else if (escapeClicked) {
                inputHide();
            }
        }
		else if (selectIsShowing) {
			if (escapeClicked) {
                selectHide();
            }
		}
    });
	
	
	
	
    return {
		setOptions: setOptions,
        alert: alert,
        confirm: confirm,
        input: input,
		select: select
    };

}();

// Node.js
if (typeof module === 'object' && module.exports) {
    module.exports = notie;
}