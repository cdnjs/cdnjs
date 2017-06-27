/* Form JS - A Classic Form Styling With Ease
Copyright (c)2017 Abdalla Mahmoud - MIT License

Resources:
https://goo.gl/sgCBNG
https://goo.gl/MxsV9S
https://goo.gl/afpURT
https://goo.gl/ZxwQ
*/

function DisableErrorGlowOnFocus() {
	$("input:not([type=submit]):not([type=button]):not([type=radio]):not([type=checkbox]):not([type=file]).disableonfocus").on('focus', function() {
		$(this).removeClass("formjs-error");
		$(this).removeClass("disableonfocus");
	});
	$("textarea.disableonfocus").on('focus', function() {
		$(this).removeClass("formjs-error");
		$(this).removeClass("disableonfocus");
	});
}
function customizeCheckbox() {
	$('.checkbox-group > input:checkbox.formjs-sm').each(function(){
	    $(this).next('span').addBack().wrapAll("<label class='fc-contain-sm checkbox-status'></label>");
	});
	$( ".checkbox-status > .formjs-sm" ).after( "<div class='fc-status-sm'></div>" );
	$('.checkbox-group > input:checkbox.formjs').each(function(){
	    $(this).next('span').addBack().wrapAll("<label class='fc-contain checkbox-status'></label>");
	});
	$( ".checkbox-status > .formjs" ).after( "<div class='fc-status'></div>" );
	$('.checkbox-group > input:checkbox.formjs-lg').each(function(){
	    $(this).next('span').addBack().wrapAll("<label class='fc-contain-lg checkbox-status'></label>");
	});
	$( ".checkbox-status > .formjs-lg" ).after( "<div class='fc-status-lg'></div>" );
}
function customizeRadio() {
	$('.radio-group > input:radio.formjs-sm').each(function(){
	    $(this).next('span').addBack().wrapAll("<label class='fr-contain-sm radio-status'></label>");
	});
	$( ".radio-status > .formjs-sm" ).after( "<div class='fr-status-sm'></div>" );
	$('.radio-group > input:radio.formjs').each(function(){
	    $(this).next('span').addBack().wrapAll("<label class='fr-contain radio-status'></label>");
	});
	$( ".radio-status > .formjs" ).after( "<div class='fr-status'></div>" );
	$('.radio-group > input:radio.formjs-lg').each(function(){
	    $(this).next('span').addBack().wrapAll("<label class='fr-contain-lg radio-status'></label>");
	});
	$( ".radio-status > .formjs-lg" ).after( "<div class='fr-status-lg'></div>" );
}
function addArrowToSelect() {
	$( "select:not([multiple]).formjs-sm" ).after( "<div class='select-arrow-sm'></div>" );
	$('.select-group > select:not([multiple]).formjs-sm').each(function(){
	    $(this).next('.select-arrow-sm').addBack().wrapAll("<div class='formjs-select-sm'></div>");
	});
	$( "select:not([multiple]).formjs" ).after( "<div class='select-arrow'></div>" );
	$('.select-group > select:not([multiple]).formjs').each(function(){
	    $(this).next('.select-arrow').addBack().wrapAll("<div class='formjs-select'></div>");
	});
	$( "select:not([multiple]).formjs-lg" ).after( "<div class='select-arrow-lg'></div>" );
	$('.select-group > select:not([multiple]).formjs-lg').each(function(){
	    $(this).next('.select-arrow-lg').addBack().wrapAll("<div class='formjs-select-lg'></div>");
	});
}
function disableDisabledInputs() {
	$('.checkbox-group input:disabled.formjs-sm').each(function() {
	    $(this).parent().addClass("disabled");
	});
	$('.checkbox-group input:disabled.formjs').each(function() {
	    $(this).parent().addClass("disabled");
	});
	$('.checkbox-group input:disabled.formjs-lg').each(function() {
	    $(this).parent().addClass("disabled");
	});
	$('.radio-group input:disabled.formjs-sm').each(function() {
	    $(this).parent().addClass("disabled");
	});
	$('.radio-group input:disabled.formjs').each(function() {
	    $(this).parent().addClass("disabled");
	});
	$('.radio-group input:disabled.formjs-lg').each(function() {
	    $(this).parent().addClass("disabled");
	});
	$("input:not([type=submit]):not([type=button]):not([type=radio]):not([type=checkbox]):not([type=file]).disabled").attr("disabled", true);
	$("textarea.disabled").attr("disabled", true);
}
window.onbeforeunload = function disable() {
	var inputs = document.getElementsByTagName("INPUT");
		for (var i = 0; i < inputs.length; i++) {
		if (inputs[i].type == "button" || inputs[i].type == "submit") {
			inputs[i].disabled = true;
		}
	}
}
function runFormJS() {
	DisableErrorGlowOnFocus();
	customizeCheckbox();
	customizeRadio();
	addArrowToSelect();
	disableDisabledInputs();
}

// run Form JS
runFormJS();