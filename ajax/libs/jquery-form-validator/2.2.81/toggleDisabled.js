/**
 *  JQUERY-FORM-VALIDATOR
 *
 *  @website by 
 *  @license MIT
 *  @version 2.2.81
 */
!function(a,b,c){"use strict";var d=function(a,b){"disabled"==b?a.find('*[type="submit"]').addClass("disabled").attr("disabled","disabled"):a.find('*[type="submit"]').removeClass("disabled").removeAttr("disabled")},e=!1;a(b).bind("validatorsLoaded formValidationSetup",function(b,f,g){var h=g.disabledFormFilter?f.filter(g.disabledFormFilter):f,i=g.showErrorDialogs===c||g.showErrorDialogs;h.addClass(i?"disabled-with-errors":"disabled-without-errors").find("*[data-validation]").attr("data-validation-event","keyup").on("validation",function(b,c){if(!e){e=!0;var f=a(this).closest("form");c&&f.isValid(g,g.language,!1)?d(f,"enabled"):d(f,"disabled"),e=!1}}),d(h,"disabled"),h.validateOnEvent(g.language,g)}).on("validationErrorDisplay",function(a,b,c){b.closest("form").hasClass("disabled-without-errors")&&c.hide()})}(jQuery,window);