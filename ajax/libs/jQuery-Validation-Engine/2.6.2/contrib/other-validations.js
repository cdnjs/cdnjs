/*
 This file contains validations that are too specific to be part of the core
 Please reference the file AFTER the translation file or the rules will be overwritten
 Use at your own risk. We can't provide support for most of the validations
*/
(function($){
	if($.validationEngineLanguage == undefined || $.validationEngineLanguage.allRules == undefined )
		alert("Please include other-validations.js AFTER the translation file");
	else {
		$.validationEngineLanguage.allRules["postcodeUK"] = {
		        // UK zip codes
		        "regex": /^([A-PR-UWYZa-pr-uwyz]([0-9]{1,2}|([A-HK-Ya-hk-y][0-9]|[A-HK-Ya-hk-y][0-9]([0-9]|[ABEHMNPRV-Yabehmnprv-y]))|[0-9][A-HJKS-UWa-hjks-uw])\ {0,1}[0-9][ABD-HJLNP-UW-Zabd-hjlnp-uw-z]{2}|([Gg][Ii][Rr]\ 0[Aa][Aa])|([Ss][Aa][Nn]\ {0,1}[Tt][Aa]1)|([Bb][Ff][Pp][Oo]\ {0,1}([Cc]\/[Oo]\ )?[0-9]{1,4})|(([Aa][Ss][Cc][Nn]|[Bb][Bb][Nn][Dd]|[BFSbfs][Ii][Qq][Qq]|[Pp][Cc][Rr][Nn]|[Ss][Tt][Hh][Ll]|[Tt][Dd][Cc][Uu]|[Tt][Kk][Cc][Aa])\ {0,1}1[Zz][Zz]))$/,
				"alertText": "* Invalid postcode"
		};
		$.validationEngineLanguage.allRules["postcodeNL"] = {
                // NL zip codes |  Accepts 1234AA format zipcodes
                "regex": /^\d{4}[a-zA-Z]{2}?$/,
                "alertText": "* Ongeldige postcode, formaat moet 1234AA zijn"
        };
		$.validationEngineLanguage.allRules["postcodeUS"] = {
		        // US zip codes | Accepts 12345 and 12345-1234 format zipcodes
                "regex": /^\d{5}(-\d{4})?$/,
                "alertText": "* Invalid zipcode"
		};
		$.validationEngineLanguage.allRules["postcodeDE"] = {
		        // Germany zip codes | Accepts 12345 format zipcodes
                "regex": /^\d{5}?$/,
                "alertText": "* Invalid zipcode"
		};
		$.validationEngineLanguage.allRules["postcodeAT"] = {
		        // Austrian zip codes | Accepts 1234 format zipcodes
                "regex": /^\d{4}?$/,
                "alertText": "* Invalid zipcode"
		};
		$.validationEngineLanguage.allRules["postcodePL"] = {
		        // Polish zip codes | Accepts 80-000 format zipcodes
                "regex": /^\d{2}-\d{3}$/,
                "alertText": "* Niepoprawny kod pocztowy, poprawny format to: 12-345"
		};
		
    $.validationEngineLanguage.allRules["postcodeJP"] = {
      // JP zip codes | Accepts 123 and 123-1234 format zipcodes
      "regex": /^\d{3}(-\d{4})?$/,
      "alertText": "* 郵便番号が正しくありません"
    };
		$.validationEngineLanguage.allRules["onlyLetNumSpec"] = {
				// Good for database fields
				"regex": /^[0-9a-zA-Z_-]+$/,
				"alertText": "* Only Letters, Numbers, hyphen(-) and underscore(_) allowed"
		};
	//	# more validations may be added after this point
	}
})(jQuery);
