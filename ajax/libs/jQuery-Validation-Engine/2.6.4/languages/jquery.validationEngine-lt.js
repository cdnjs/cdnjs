(function($) {
  $.fn.validationEngineLanguage = function() {
	};
	$.validationEngineLanguage = {
		newLang : function() {
			$.validationEngineLanguage.allRules = {

				// global messages
				"required" : { // Add your regex rules here, you can take
								// telephone as an example
					"regex" : "none",
					"alertText" : "* Privalomas laukas",
					"alertTextCheckboxMultiple" : "* Pasirinkite reikšmę",
					"alertTextCheckboxe" : "* Pasirinkite reikšmę",
					"alertTextDateRange" : "* Pasirinkite reikšmę"
				},
				"requiredInFunction" : {
					"func" : function(field, rules, i, options) {
						return (field.val() == "test") ? true : false;
					},
					"alertText" : "* Laukas turi būti lygus test laukui"
				},
				"dateRange" : {
					"regex" : "none",
					"alertText" : "* Neteisinga reikšmė ",
					"alertText2" : "Datos intervalas"
				},
				"dateTimeRange" : {
					"regex" : "none",
					"alertText" : "* Neteisinga reikšmė ",
					"alertText2" : "Datos ir laiko intervalas"
				},
				"minSize" : {
					"regex" : "none",
					"alertText" : "* Ne mažiau ",
					"alertText2" : " simbolių"
				},
				"maxSize" : {
					"regex" : "none",
					"alertText" : "* Ne daugiau ",
					"alertText2" : " simbolių"
				},
				"groupRequired" : {
					"regex" : "none",
					"alertText" : "* Užpildykite šiuos laukus "
				},
				"min" : {
					"regex" : "none",
					"alertText" : "* Mažiausia galima reikšmė: "
				},
				"max" : {
					"regex" : "none",
					"alertText" : "* Didžiausia galima reikšmė: "
				},
				"past" : {
					"regex" : "none",
					"alertText" : "* Data iki "
				},
				"future" : {
					"regex" : "none",
					"alertText" : "* Data po "
				},
				"maxCheckbox" : {
					"regex" : "none",
					"alertText" : "* Daugiausiai ",
					"alertText2" : " leidžiama pasirinkti"
				},
				"minCheckbox" : {
					"regex" : "none",
					"alertText" : "* Pasirinkite ",
					"alertText2" : " laukus"
				},
				"equals" : {
					"regex" : "none",
					"alertText" : "* Laukai nesutampa"
				},
				"creditCard" : {
					"regex" : "none",
					"alertText" : "* Neteisingi kreditinės kortelės duomenys"
				},
				"phone" : {
					// credit: jquery.h5validate.js / orefalo
					"regex" : /^([\+][0-9]{1,3}[\ \.\-])?([\(]{1}[0-9]{2,6}[\)])?([0-9\ \.\-\/]{3,20})((x|ext|extension)[\ ]?[0-9]{1,4})?$/,
					"alertText" : "* Invalid phone number"
				},
				"email" : {
					// HTML5 compatible email regex (
					// http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#
					// e-mail-state-%28type=email%29 )
					"regex" : /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
					"alertText" : "* Neteisingas el. pašto adresas"
				},
				"integer" : {
					"regex" : /^[\-\+]?\d+$/,
					"alertText" : "* Neteisingai įvestas skaičius"
				},
				"number" : {
					// Number, including positive, negative, and floating
					// decimal. credit: orefalo
					"regex" : /^[\-\+]?((([0-9]{1,3})([,][0-9]{3})*)|([0-9]+))?([\.]([0-9]+))?$/,
					"alertText" : "* Neteisingai įvestas skaičius"
				},
				"date" : {
					// Check if date is valid by leap year
					"func" : function(field) {
						var pattern = new RegExp(
								/^(\d{4})[\/\-\.](0?[1-9]|1[012])[\/\-\.](0?[1-9]|[12][0-9]|3[01])$/);
						var match = pattern.exec(field.val());
						if (match == null)
							return false;

						var year = match[1];
						var month = match[2] * 1;
						var day = match[3] * 1;
						var date = new Date(year, month - 1, day); // because
																	// months
																	// starts
																	// from 0.

						return (date.getFullYear() == year
								&& date.getMonth() == (month - 1) && date
								.getDate() == day);
					},
					"alertText" : "* Datos formatas: YYYY-MM-DD"
				},
				"ipv4" : {
					"regex" : /^((([01]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))[.]){3}(([0-1]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))$/,
					"alertText" : "* Neteisingas IP adresas"
				},
				"url" : {
					"regex" : /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,
					"alertText" : "* Neteisinga nuoroda"
				},
				"onlyNumberSp" : {
					"regex" : /^[0-9\ ]+$/,
					"alertText" : "* Tik skaičiai"
				},
				"onlyLetterSp" : {
					"regex" : /^[a-zA-Z\ \']+$/,
					"alertText" : "* Tik raidės"
				},
				"onlyLetterNumber" : {
					"regex" : /^[0-9a-zA-Z]+$/,
					"alertText" : "* Specialūs simboliai neleidžiami"
				},
				// tls warning:homegrown not fielded
				"dateFormat" : {
					"regex" : /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(?:(?:0?[1-9]|1[0-2])(\/|-)(?:0?[1-9]|1\d|2[0-8]))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(0?2(\/|-)29)(\/|-)(?:(?:0[48]00|[13579][26]00|[2468][048]00)|(?:\d\d)?(?:0[48]|[2468][048]|[13579][26]))$/,
					"alertText" : "* Neteisinga data"
				},
				// tls warning:homegrown not fielded
				"dateTimeFormat" : {
					"regex" : /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1}$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^((1[012]|0?[1-9]){1}\/(0?[1-9]|[12][0-9]|3[01]){1}\/\d{2,4}\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1})$/,
					"alertText" : "* Neteisingai įvesta data ar laikas",
					"alertText2" : "Teisingas formatas: ",
					"alertText3" : "mm/dd/yyyy hh:mm:ss AM|PM or ",
					"alertText4" : "yyyy-mm-dd hh:mm:ss AM|PM"
				}
			};

		}
	};

	$.validationEngineLanguage.newLang();

})(jQuery);
