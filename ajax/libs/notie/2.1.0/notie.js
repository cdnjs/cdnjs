/*
 * notie.js - A clean and simple notification plugin (alert/growl style) for javascript, with no dependencies.
 *
 * Copyright (c) 2015 Jared Reich
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 * https://jaredreich.com/projects/notie.js
 *
 * Version:  2.1.0
 *
*/

var notie = function(){

    // SETTINGS
    // *********************************************
    
    // General
    var shadow = true;
    var font_size_small = '18px';
    var font_size_big = '24px';
    var font_change_screen_width = 600;
    var animation_delay = 0.3;
    var background_click_dismiss = true;
    
    // notie.alert colors
    var alert_color_success_background = '#57BF57';
    var alert_color_warning_background = '#E3B771';
    var alert_color_error_background = '#E1715B';
    var alert_color_info_background = '#4D82D6';
    var alert_color_text = '#FFF';

    // notie.confirm colors
    var confirm_and_input_color_background = '#4D82D6';
    var confirm_and_input_color_yes_background = '#57BF57';
    var confirm_and_input_color_no_background = '#E1715B';
    var confirm_and_input_color_text = '#FFF';
    var confirm_and_input_color_yes_text = '#FFF';
    var confirm_and_input_color_no_text = '#FFF';
    
    // ID's for use within your own .css file (OPTIONAL)
    // (Be sure to use !important to override the javascript)
    // Example: #notie-alert-inner { padding: 30px !important; }
    var alert_outer_id = 'notie-alert-outer';
    var alert_inner_id = 'notie-alert-inner';
    var alert_text_id = 'notie-alert-text';
    var confirm_outer_id = 'notie-confirm-outer';
    var confirm_inner_id = 'notie-confirm-inner';
    var confirm_background_id = 'notie-confirm-background';
    var confirm_yes_id = 'notie-confirm-yes';
    var confirm_no_id = 'notie-confirm-no';
    var confirm_text_id = 'notie-confirm-text';
    var confirm_yes_text_id = 'notie-confirm-yes-text';
    var confirm_no_text_id = 'notie-confirm-no-text';
    var input_outer_id = 'notie-input-outer';
    var input_inner_id = 'notie-input-inner';
    var input_background_id = 'notie-input-background';
    var input_div_id = 'notie-input-div';
    var input_field_id = 'notie-input-field';
    var input_yes_id = 'notie-input-yes';
    var input_no_id = 'notie-input-no';
    var input_text_id = 'notie-input-text';
    var input_yes_text_id = 'notie-input-yes-text';
    var input_no_text_id = 'notie-input-no-text';
    
    // *********************************************
    
    
    
    
    
    // HELPERS
    // *********************************************
    
    // Function for resize listeners for font-size
    var resizeListener = function resizeListener(ele) {
        if (window.innerWidth <= font_change_screen_width) { ele.style.fontSize = font_size_small; }
        else { ele.style.fontSize = font_size_big; }
    };
    
    
    // Debounce function (credit to Underscore.js)
    var debounce_time = 500;
    var debounce = function debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
    
    
    // Event listener for enter and escape keys
    window.addEventListener('keydown', function(event) {
        var enter_clicked = (event.which == 13 || event.keyCode == 13);
        var escape_clicked = (event.which == 27 || event.keyCode == 27);
        if (alert_is_showing) {
            if (enter_clicked || escape_clicked) {
                clearTimeout(alert_timeout_1);
                clearTimeout(alert_timeout_2);
                alert_hide();
            }
        }
        else if (confirm_is_showing) {
            if (enter_clicked) {
                confirm_yes.click();
            }
            else if (escape_clicked) {
                confirm_no.click();
            }
        }
        else if (input_is_showing) {
            if (enter_clicked) {
                input_yes.click();
            }
            else if (escape_clicked) {
                input_no.click();
            }
        }
    });
    
    
    // addEventListener polyfill, fixes a style.height issue for IE8
    if (typeof Element.prototype.addEventListener === 'undefined') {
        Element.prototype.addEventListener = Window.prototype.addEventListener = function (e, callback) {
            e = 'on' + e;
            return this.attachEvent(e, callback);
        };
    }


    // Scroll disable and enable for notie.confirm and notie.input
    var original_body_height, original_body_overflow;
    function scroll_disable() {
        original_body_height = document.body.style.height;
        original_body_overflow = document.body.style.overflow;
        document.body.style.height = '100%';
        document.body.style.overflow = 'hidden';
    }
    function scroll_enable() {
        document.body.style.height = original_body_height;
        document.body.style.overflow = original_body_overflow;
    }
    // *********************************************
    
    
    
    // NOTIE.ALERT
    // *********************************************

    // notie elements and styling
    var alert_outer = document.createElement('div');
    alert_outer.id = alert_outer_id;
    alert_outer.style.position = 'fixed';
    alert_outer.style.top = '0';
    alert_outer.style.left = '0';
    alert_outer.style.zIndex = '999999999';
    alert_outer.style.height = 'auto';
    alert_outer.style.width = '100%';
    alert_outer.style.display = 'none';
    alert_outer.style.textAlign = 'center';
    alert_outer.style.cursor = 'default';
    alert_outer.style.MozTransition = '';
    alert_outer.style.WebkitTransition = '';
    alert_outer.style.transition = '';
    alert_outer.style.cursor = 'pointer';
    
    // Hide alert on click
    alert_outer.onclick = function() {
        clearTimeout(alert_timeout_1);
        clearTimeout(alert_timeout_2);
        alert_hide();
    };
    
    var alert_inner = document.createElement('div');
    alert_inner.id = alert_inner_id;
    alert_inner.style.padding = '20px';
    alert_inner.style.display = 'table-cell';
    alert_inner.style.verticalAlign = 'middle';
    alert_outer.appendChild(alert_inner);
    
    // Initialize notie text
    var alert_text = document.createElement('span');
    alert_text.id = alert_text_id;
    alert_text.style.color = alert_color_text;
    if (window.innerWidth <= font_change_screen_width) { alert_text.style.fontSize = font_size_small; }
    else { alert_text.style.fontSize = font_size_big; }
    window.addEventListener('resize', debounce(resizeListener.bind(null, alert_text), debounce_time), true);
    alert_inner.appendChild(alert_text);

    // Attach notie to the body element
    document.body.appendChild(alert_outer);

    // Declare variables
    var height = 0;
    var alert_is_showing = false;
    var alert_timeout_1;
    var alert_timeout_2;
    var was_clicked_counter = 0;

    function alert(type, message, seconds) {
        
        // Blur active element for use of enter key, focus input
        document.activeElement.blur();

        was_clicked_counter++;

        setTimeout(function() {
            was_clicked_counter--;
        }, (animation_delay * 1000 + 10));

        if (was_clicked_counter == 1) {

            if (alert_is_showing) {

                clearTimeout(alert_timeout_1);
                clearTimeout(alert_timeout_2);

                alert_hide(function() {
                    alert_show(type, message, seconds);
                });

            }
            else {
                alert_show(type, message, seconds);
            }

        }

    }

    function alert_show(type, message, seconds) {

        alert_is_showing = true;

        var duration = 0;
        if (typeof seconds == 'undefined') {
            var duration = 3000;
        }
        else if (seconds < 1) {
            duration = 1000;
        }
        else {
            duration = seconds * 1000;
        }

        // Set notie type (background color)
        switch(type) {
            case 1:
                alert_outer.style.backgroundColor = alert_color_success_background;
                break;
            case 2:
                alert_outer.style.backgroundColor = alert_color_warning_background;
                break;
            case 3:
                alert_outer.style.backgroundColor = alert_color_error_background;
                break;
            case 4:
                alert_outer.style.backgroundColor = alert_color_info_background;
                break;
        }

        // Set notie text
        alert_text.innerHTML = message;

        // Get notie's height
        alert_outer.style.top = '-10000px';
        alert_outer.style.display = 'table';
        alert_outer.style.top = '-' + alert_outer.offsetHeight - 5 + 'px';

        alert_timeout_1 = setTimeout(function() {

            if (shadow) { alert_outer.style.boxShadow = '0px 0px 10px 0px rgba(0,0,0,0.5)'; }
            alert_outer.style.MozTransition = 'all ' + animation_delay + 's ease';
            alert_outer.style.WebkitTransition = 'all ' + animation_delay + 's ease';
            alert_outer.style.transition = 'all ' + animation_delay + 's ease';

            alert_outer.style.top = 0;

            alert_timeout_2 = setTimeout(function() {

                alert_hide(function() {
                    // Nothing
                });

            }, duration);

        }, 20);

    }

    function alert_hide(callback) {

        alert_outer.style.top = '-' + alert_outer.offsetHeight - 5 + 'px';

        setTimeout(function() {

            if (shadow) { alert_outer.style.boxShadow = ''; }
            alert_outer.style.MozTransition = '';
            alert_outer.style.WebkitTransition = '';
            alert_outer.style.transition = '';
            
            alert_outer.style.top = '-10000px';

            alert_is_showing = false;

            if (callback) { callback(); }

        }, (animation_delay * 1000 + 10));

    }



    // NOTIE.CONFIRM
    // *********************************************

    // confirm elements and styling
    var confirm_outer = document.createElement('div');
    confirm_outer.id = confirm_outer_id;
    confirm_outer.style.position = 'fixed';
    confirm_outer.style.top = '0';
    confirm_outer.style.left = '0';
    confirm_outer.style.zIndex = '999999998';
    confirm_outer.style.height = 'auto';
    confirm_outer.style.width = '100%';
    confirm_outer.style.display = 'none';
    confirm_outer.style.textAlign = 'center';
    confirm_outer.style.MozTransition = '';
    confirm_outer.style.WebkitTransition = '';
    confirm_outer.style.transition = '';

    var confirm_background = document.createElement('div');
    confirm_background.id = confirm_background_id;
    confirm_background.style.position = 'fixed';
    confirm_background.style.top = '0';
    confirm_background.style.left = '0';
    confirm_background.style.zIndex = '999999997';
    confirm_background.style.height = '100%';
    confirm_background.style.width = '100%';
    confirm_background.style.display = 'none';
    confirm_background.style.backgroundColor = 'white';
    confirm_background.style.MozTransition = 'all ' + animation_delay + 's ease';
    confirm_background.style.WebkitTransition = 'all ' + animation_delay + 's ease';
    confirm_background.style.transition = 'all ' + animation_delay + 's ease';
    confirm_background.style.opacity = '0';
    
    // Hide notie.confirm on background click
    confirm_background.onclick = function() {
        if (background_click_dismiss) {
            confirm_hide();
        }
    };

    var confirm_inner = document.createElement('div');
    confirm_inner.id = confirm_inner_id;
    confirm_inner.style.boxSizing = 'border-box';
    confirm_inner.style.width = '100%';
    confirm_inner.style.padding = '20px';
    confirm_inner.style.display = 'block';
    confirm_inner.style.cursor = 'default';
    confirm_inner.style.backgroundColor = confirm_and_input_color_background;
    confirm_outer.appendChild(confirm_inner);

    var confirm_yes = document.createElement('div');
    confirm_yes.id = confirm_yes_id;
    confirm_yes.style.cssFloat = 'left';
    confirm_yes.style.height = '50px';
    confirm_yes.style.lineHeight = '50px';
    confirm_yes.style.width = '50%';
    confirm_yes.style.cursor = 'pointer';
    confirm_yes.style.backgroundColor = confirm_and_input_color_yes_background;
    confirm_outer.appendChild(confirm_yes);

    var confirm_no = document.createElement('div');
    confirm_no.id = confirm_no_id;
    confirm_no.style.cssFloat = 'right';
    confirm_no.style.height = '50px';
    confirm_no.style.lineHeight = '50px';
    confirm_no.style.width = '50%';
    confirm_no.style.cursor = 'pointer';
    confirm_no.style.backgroundColor = confirm_and_input_color_no_background;
    confirm_no.onclick = function() { confirm_hide(); }
    confirm_outer.appendChild(confirm_no);

    // Initialize confirm text
    var confirm_text = document.createElement('span');
    confirm_text.id = confirm_text_id;
    confirm_text.style.color = confirm_and_input_color_text;
    if (window.innerWidth <= font_change_screen_width) { confirm_text.style.fontSize = font_size_small; }
    else { confirm_text.style.fontSize = font_size_big; }
    window.addEventListener('resize', debounce(resizeListener.bind(null, confirm_text), debounce_time), true);
    confirm_inner.appendChild(confirm_text);

    var confirm_yes_text = document.createElement('span');
    confirm_yes_text.id = confirm_yes_text_id;
    confirm_yes_text.style.color = confirm_and_input_color_yes_text;
    if (window.innerWidth <= font_change_screen_width) { confirm_yes_text.style.fontSize = font_size_small; }
    else { confirm_yes_text.style.fontSize = font_size_big; }
    window.addEventListener('resize', debounce(resizeListener.bind(null, confirm_yes_text), debounce_time), true);
    confirm_yes.appendChild(confirm_yes_text);

    var confirm_no_text = document.createElement('span');
    confirm_no_text.id = confirm_no_text_id;
    confirm_no_text.style.color = confirm_and_input_color_no_text;
    if (window.innerWidth <= font_change_screen_width) { confirm_no_text.style.fontSize = font_size_small; }
    else { confirm_no_text.style.fontSize = font_size_big; }
    window.addEventListener('resize', debounce(resizeListener.bind(null, confirm_no_text), debounce_time), true);
    confirm_no.appendChild(confirm_no_text);

    // Attach confirm elements to the body element
    document.body.appendChild(confirm_outer);
    document.body.appendChild(confirm_background);

    // Declare variables
    var confirm_height = 0;
    var confirm_is_showing = false;

    function confirm(title, yes_text, no_text, yes_callback) {
        
        // Blur active element for use of enter key
        document.activeElement.blur();
        
        if (alert_is_showing) {
            // Hide notie.alert
            clearTimeout(alert_timeout_1);
            clearTimeout(alert_timeout_2);
            alert_hide(function() {
                confirm_show(title, yes_text, no_text, yes_callback);
            });
        }
        else {
            confirm_show(title, yes_text, no_text, yes_callback);
        }
        

    }
    function confirm_show(title, yes_text, no_text, yes_callback) {

        scroll_disable();

        // Yes callback function
        confirm_yes.onclick = function() {
            confirm_hide();
            setTimeout(function() {
                yes_callback();
            }, (animation_delay * 1000 + 10));
        }

        function confirm_show_inner() {

            // Set confirm text
            confirm_text.innerHTML = title;
            confirm_yes_text.innerHTML = yes_text;
            confirm_no_text.innerHTML = no_text;

            // Get confirm's height
            confirm_outer.style.top = '-10000px';
            confirm_outer.style.display = 'table';
            confirm_outer.style.top = '-' + confirm_outer.offsetHeight - 5 + 'px';
            confirm_background.style.display = 'block';

            setTimeout(function() {

                if (shadow) { confirm_outer.style.boxShadow = '0px 0px 10px 0px rgba(0,0,0,0.5)'; }
                confirm_outer.style.MozTransition = 'all ' + animation_delay + 's ease';
                confirm_outer.style.WebkitTransition = 'all ' + animation_delay + 's ease';
                confirm_outer.style.transition = 'all ' + animation_delay + 's ease';

                confirm_outer.style.top = 0;
                confirm_background.style.opacity = '0.75';

                setTimeout(function() {
                    confirm_is_showing = true;
                }, (animation_delay * 1000 + 10));

            }, 20);

        }

        if (confirm_is_showing) {
            confirm_hide();
            setTimeout(function() {
                confirm_show_inner();
            }, (animation_delay * 1000 + 10));
        }
        else {
            confirm_show_inner();
        }

    }

    function confirm_hide() {

        confirm_outer.style.top = '-' + confirm_outer.offsetHeight - 5 + 'px';
        confirm_background.style.opacity = '0';

        setTimeout(function() {

            if (shadow) { confirm_outer.style.boxShadow = ''; }
            confirm_outer.style.MozTransition = '';
            confirm_outer.style.WebkitTransition = '';
            confirm_outer.style.transition = '';
            confirm_background.style.display = 'none';
            
            confirm_outer.style.top = '-10000px';

            scroll_enable();

            confirm_is_showing = false;

        }, (animation_delay * 1000 + 10));

    }
    
    
    
    
    // NOTIE.INPUT
    // *********************************************

    // input elements and styling
    var input_outer = document.createElement('div');
    input_outer.id = input_outer_id;
    input_outer.style.position = 'fixed';
    input_outer.style.top = '0';
    input_outer.style.left = '0';
    input_outer.style.zIndex = '999999998';
    input_outer.style.height = 'auto';
    input_outer.style.width = '100%';
    input_outer.style.display = 'none';
    input_outer.style.textAlign = 'center';
    input_outer.style.MozTransition = '';
    input_outer.style.WebkitTransition = '';
    input_outer.style.transition = '';

    var input_background = document.createElement('div');
    input_background.id = input_background_id;
    input_background.style.position = 'fixed';
    input_background.style.top = '0';
    input_background.style.left = '0';
    input_background.style.zIndex = '999999997';
    input_background.style.height = '100%';
    input_background.style.width = '100%';
    input_background.style.display = 'none';
    input_background.style.backgroundColor = 'white';
    input_background.style.MozTransition = 'all ' + animation_delay + 's ease';
    input_background.style.WebkitTransition = 'all ' + animation_delay + 's ease';
    input_background.style.transition = 'all ' + animation_delay + 's ease';
    input_background.style.opacity = '0';
    
    // Hide notie.input on background click
    input_background.onclick = function() {
        if (background_click_dismiss) {
            input_hide();
        }
    };

    var input_inner = document.createElement('div');
    input_inner.id = input_inner_id;
    input_inner.style.boxSizing = 'border-box';
    input_inner.style.width = '100%';
    input_inner.style.padding = '20px';
    input_inner.style.display = 'block';
    input_inner.style.cursor = 'default';
    input_inner.style.backgroundColor = confirm_and_input_color_background;
    input_outer.appendChild(input_inner);
    
    var input_div = document.createElement('div');
    input_div.id = input_div_id;
    input_div.style.boxSizing = 'border-box';
    input_div.style.height = '55px';
    input_div.style.width = '100%';
    input_div.style.display = 'block';
    input_div.style.cursor = 'default';
    input_div.style.backgroundColor = '#FFF';
    input_outer.appendChild(input_div);
    
    var input_field = document.createElement('input');
    input_field.id = input_field_id;    
    input_field.setAttribute('autocomplete', 'off');
    input_field.setAttribute('autocorrect', 'off');
    input_field.setAttribute('autocapitalize', 'off');
    input_field.setAttribute('spellcheck', 'false');
    input_field.style.boxSizing = 'border-box';
    input_field.style.height = '55px';
    input_field.style.width = '100%';
    input_field.style.textAlign = 'center';
    input_field.style.textIndent = '10px';
    input_field.style.paddingRight = '10px';
    input_field.style.outline = '0';
    input_field.style.border = '0';
    input_field.style.fontFamily = 'inherit';
    input_field.style.fontSize = font_size_big;
    if (window.innerWidth <= font_change_screen_width) { input_field.style.fontSize = font_size_small; }
    else { input_field.style.fontSize = font_size_big; }
    window.addEventListener('resize', debounce(resizeListener.bind(null, input_field), debounce_time), true);
    input_div.appendChild(input_field);

    var input_yes = document.createElement('div');
    input_yes.id = input_yes_id;
    input_yes.style.cssFloat = 'left';
    input_yes.style.height = '50px';
    input_yes.style.lineHeight = '50px';
    input_yes.style.width = '50%';
    input_yes.style.cursor = 'pointer';
    input_yes.style.backgroundColor = confirm_and_input_color_yes_background;
    input_outer.appendChild(input_yes);

    var input_no = document.createElement('div');
    input_no.id = input_no_id;
    input_no.style.cssFloat = 'right';
    input_no.style.height = '50px';
    input_no.style.lineHeight = '50px';
    input_no.style.width = '50%';
    input_no.style.cursor = 'pointer';
    input_no.style.backgroundColor = confirm_and_input_color_no_background;
    input_no.onclick = function() { input_hide(); }
    input_outer.appendChild(input_no);

    // Initialize input text
    var input_text = document.createElement('span');
    input_text.id = input_text_id;
    input_text.style.color = confirm_and_input_color_text;
    if (window.innerWidth <= font_change_screen_width) { input_text.style.fontSize = font_size_small; }
    else { input_text.style.fontSize = font_size_big; }
    window.addEventListener('resize', debounce(resizeListener.bind(null, input_text), debounce_time), true);
    input_inner.appendChild(input_text);

    var input_yes_text = document.createElement('span');
    input_yes_text.id = input_yes_text_id;
    input_yes_text.style.color = confirm_and_input_color_yes_text;
    if (window.innerWidth <= font_change_screen_width) { input_yes_text.style.fontSize = font_size_small; }
    else { input_yes_text.style.fontSize = font_size_big; }
    window.addEventListener('resize', debounce(resizeListener.bind(null, input_yes_text), debounce_time), true);
    input_yes.appendChild(input_yes_text);

    var input_no_text = document.createElement('span');
    input_no_text.id = input_no_text_id;
    input_no_text.style.color = confirm_and_input_color_no_text;
    if (window.innerWidth <= font_change_screen_width) { input_no_text.style.fontSize = font_size_small; }
    else { input_no_text.style.fontSize = font_size_big; }
    window.addEventListener('resize', debounce(resizeListener.bind(null, input_no_text), debounce_time), true);
    input_no.appendChild(input_no_text);

    // Attach input elements to the body element
    document.body.appendChild(input_outer);
    document.body.appendChild(input_background);

    // Declare variables
    var input_height = 0;
    var input_is_showing = false;

    function input(title, submit_text, cancel_text, type, placeholder, submit_callback, prefilled_value_optional) {
        
        // Blur active element for use of enter key, focus input
        document.activeElement.blur();
        setTimeout(function() { input_field.focus(); }, (animation_delay * 1000));
        
        input_field.setAttribute('type', type);
        input_field.setAttribute('placeholder', placeholder);
        input_field.value = '';
        if (typeof prefilled_value_optional !== 'undefined' && prefilled_value_optional.length > 0) { input_field.value = prefilled_value_optional }
        
        if (alert_is_showing) {
            // Hide notie.alert
            clearTimeout(alert_timeout_1);
            clearTimeout(alert_timeout_2);
            alert_hide(function() {
                input_show(title, submit_text, cancel_text, submit_callback);
            });
        }
        else {
            input_show(title, submit_text, cancel_text, submit_callback);
        }

    }
    function input_show(title, submit_text, cancel_text, submit_callback) {

        scroll_disable();

        // Yes callback function
        input_yes.onclick = function() {
            input_hide();
            setTimeout(function() {
                submit_callback(input_field.value);
            }, (animation_delay * 1000 + 10));
        }

        function input_show_inner() {

            // Set input text
            input_text.innerHTML = title;
            input_yes_text.innerHTML = submit_text;
            input_no_text.innerHTML = cancel_text;

            // Get input's height
            input_outer.style.top = '-10000px';
            input_outer.style.display = 'table';
            input_outer.style.top = '-' + input_outer.offsetHeight - 5 + 'px';
            input_background.style.display = 'block';

            setTimeout(function() {

                if (shadow) { input_outer.style.boxShadow = '0px 0px 10px 0px rgba(0,0,0,0.5)'; }
                input_outer.style.MozTransition = 'all ' + animation_delay + 's ease';
                input_outer.style.WebkitTransition = 'all ' + animation_delay + 's ease';
                input_outer.style.transition = 'all ' + animation_delay + 's ease';

                input_outer.style.top = 0;
                input_background.style.opacity = '0.75';

                setTimeout(function() {
                    input_is_showing = true;
                }, (animation_delay * 1000 + 10));

            }, 20);

        }

        if (input_is_showing) {
            input_hide();
            setTimeout(function() {
                input_show_inner();
            }, (animation_delay * 1000 + 10));
        }
        else {
            input_show_inner();
        }

    }

    function input_hide() {

        input_outer.style.top = '-' + input_outer.offsetHeight - 5 + 'px';
        input_background.style.opacity = '0';

        setTimeout(function() {

            if (shadow) { input_outer.style.boxShadow = ''; }
            input_outer.style.MozTransition = '';
            input_outer.style.WebkitTransition = '';
            input_outer.style.transition = '';
            input_background.style.display = 'none';
            
            input_outer.style.top = '-10000px';

            scroll_enable();

            input_is_showing = false;

        }, (animation_delay * 1000 + 10));

    }
    
    
    
    return {
        alert: alert,
        confirm: confirm,
        input: input
    };

}();

if (typeof module !== 'undefined' && module) {
    module.exports = notie;
}