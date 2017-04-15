// SpryValidationTextField.js - version 0.37 - Spry Pre-Release 1.6.1
//
// Copyright (c) 2006. Adobe Systems Incorporated.
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
//   * Redistributions of source code must retain the above copyright notice,
//     this list of conditions and the following disclaimer.
//   * Redistributions in binary form must reproduce the above copyright notice,
//     this list of conditions and the following disclaimer in the documentation
//     and/or other materials provided with the distribution.
//   * Neither the name of Adobe Systems Incorporated nor the names of its
//     contributors may be used to endorse or promote products derived from this
//     software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
// AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
// ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
// LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
// CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
// SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
// INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
// CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
// ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
// POSSIBILITY OF SUCH DAMAGE.

var Spry;
if (!Spry) Spry = {};
if (!Spry.Widget) Spry.Widget = {};

Spry.Widget.BrowserSniff = function()
{
	var b = navigator.appName.toString();
	var up = navigator.platform.toString();
	var ua = navigator.userAgent.toString();

	this.mozilla = this.ie = this.opera = this.safari = false;
	var re_opera = /Opera.([0-9\.]*)/i;
	var re_msie = /MSIE.([0-9\.]*)/i;
	var re_gecko = /gecko/i;
	var re_safari = /(applewebkit|safari)\/([\d\.]*)/i;
	var r = false;

	if ( (r = ua.match(re_opera))) {
		this.opera = true;
		this.version = parseFloat(r[1]);
	} else if ( (r = ua.match(re_msie))) {
		this.ie = true;
		this.version = parseFloat(r[1]);
	} else if ( (r = ua.match(re_safari))) {
		this.safari = true;
		this.version = parseFloat(r[2]);
	} else if (ua.match(re_gecko)) {
		var re_gecko_version = /rv:\s*([0-9\.]+)/i;
		r = ua.match(re_gecko_version);
		this.mozilla = true;
		this.version = parseFloat(r[1]);
	}
	this.windows = this.mac = this.linux = false;

	this.Platform = ua.match(/windows/i) ? "windows" :
					(ua.match(/linux/i) ? "linux" :
					(ua.match(/mac/i) ? "mac" :
					ua.match(/unix/i)? "unix" : "unknown"));
	this[this.Platform] = true;
	this.v = this.version;

	if (this.safari && this.mac && this.mozilla) {
		this.mozilla = false;
	}
};

Spry.is = new Spry.Widget.BrowserSniff();

Spry.Widget.ValidationTextField = function(element, type, options)
{
	type = Spry.Widget.Utils.firstValid(type, "none");
	if (typeof type != 'string') {
		this.showError('The second parameter in the constructor should be the validation type, the options are the third parameter.');
		return;
	}
	if (typeof Spry.Widget.ValidationTextField.ValidationDescriptors[type] == 'undefined') {
		this.showError('Unknown validation type received as the second parameter.');
		return;
	}
	options = Spry.Widget.Utils.firstValid(options, {});
	this.type = type;
	if (!this.isBrowserSupported()) {
		//disable character masking and pattern behaviors for low level browsers
		options.useCharacterMasking = false;
	}
	this.init(element, options);

	//make sure we validate at least on submit
	var validateOn = ['submit'].concat(Spry.Widget.Utils.firstValid(this.options.validateOn, []));
	validateOn = validateOn.join(",");

	this.validateOn = 0;
	this.validateOn = this.validateOn | (validateOn.indexOf('submit') != -1 ? Spry.Widget.ValidationTextField.ONSUBMIT : 0);
	this.validateOn = this.validateOn | (validateOn.indexOf('blur') != -1 ? Spry.Widget.ValidationTextField.ONBLUR : 0);
	this.validateOn = this.validateOn | (validateOn.indexOf('change') != -1 ? Spry.Widget.ValidationTextField.ONCHANGE : 0);

	if (Spry.Widget.ValidationTextField.onloadDidFire)
		this.attachBehaviors();
	else
		Spry.Widget.ValidationTextField.loadQueue.push(this);
};

Spry.Widget.ValidationTextField.ONCHANGE = 1;
Spry.Widget.ValidationTextField.ONBLUR = 2;
Spry.Widget.ValidationTextField.ONSUBMIT = 4;

Spry.Widget.ValidationTextField.ERROR_REQUIRED = 1;
Spry.Widget.ValidationTextField.ERROR_FORMAT = 2;
Spry.Widget.ValidationTextField.ERROR_RANGE_MIN = 4;
Spry.Widget.ValidationTextField.ERROR_RANGE_MAX = 8;
Spry.Widget.ValidationTextField.ERROR_CHARS_MIN = 16;
Spry.Widget.ValidationTextField.ERROR_CHARS_MAX = 32;

/* validation parameters:
 *  - characterMasking : prevent typing of characters not matching an regular expression
 *  - regExpFilter : additional regular expression to disalow typing of characters 
 *		(like the "-" sign in the middle of the value); use for partial matching of the currently typed value;
 * 		the typed value must match regExpFilter at any moment
 *  - pattern : enforce character on each position inside a pattern (AX0?)
 *  - validation : function performing logic validation; return false if failed and the typedValue value on success
 *  - minValue, maxValue : range validation; check if typedValue inside the specified range
 *  - minChars, maxChars : value length validation; at least/at most number of characters
 * */
Spry.Widget.ValidationTextField.ValidationDescriptors = {
	'none': {
	},
	'custom': {
	},
	'integer': {
		characterMasking: /[\-\+\d]/,
		regExpFilter: /^[\-\+]?\d*$/,
		validation: function(value, options) {
			if (value == '' || value == '-' || value == '+') {
				return false;
			}
			var regExp = /^[\-\+]?\d*$/;
			if (!regExp.test(value)) {
				return false;
			}
			options = options || {allowNegative:false};
			var ret = parseInt(value, 10);
			if (!isNaN(ret)) {
				var allowNegative = true;
				if (typeof options.allowNegative != 'undefined' && options.allowNegative == false) {
					allowNegative = false;
				}
				if (!allowNegative && value < 0) {
					ret = false;
				}
			} else {
				ret = false;
			}
			return ret;
		}
	},
	'real': {
		characterMasking: /[\d\.,\-\+e]/i,
		regExpFilter: /^[\-\+]?\d(?:|\.,\d{0,2})|(?:|e{0,1}[\-\+]?\d{0,})$/i,
		validation: function (value, options) {
			var regExp = /^[\+\-]?[0-9]+([\.,][0-9]+)?([eE]{0,1}[\-\+]?[0-9]+)?$/;
			if (!regExp.test(value)) {
				return false;
			}
			var ret = parseFloat(value);
			if (isNaN(ret)) {
				ret = false;
			}
			return ret;
		}
	},
	'currency': {
		formats: {
			'dot_comma': {
				characterMasking: /[\d\.\,\-\+\$]/,
				regExpFilter: /^[\-\+]?(?:[\d\.]*)+(|\,\d{0,2})$/,
				validation: function(value, options) {
					var ret = false;
					//2 or no digits after the comma
					if (/^(\-|\+)?\d{1,3}(?:\.\d{3})*(?:\,\d{2}|)$/.test(value) || /^(\-|\+)?\d+(?:\,\d{2}|)$/.test(value)) {
						value = value.toString().replace(/\./gi, '').replace(/\,/, '.');
						ret = parseFloat(value);
					}
					return ret;
				}
			},
			'comma_dot': {
				characterMasking: /[\d\.\,\-\+\$]/,
				regExpFilter: /^[\-\+]?(?:[\d\,]*)+(|\.\d{0,2})$/,
				validation: function(value, options) {
					var ret = false;
					//2 or no digits after the comma
					if (/^(\-|\+)?\d{1,3}(?:\,\d{3})*(?:\.\d{2}|)$/.test(value) || /^(\-|\+)?\d+(?:\.\d{2}|)$/.test(value)) {
						value = value.toString().replace(/\,/gi, '');
						ret = parseFloat(value);
					}
					return ret;
				}
			}
		}
	},
	'email': {
		characterMasking: /[^\s]/,
		validation: function(value, options) {
			var rx = /^[\w\.-]+@[\w\.-]+\.\w+$/i;
			return rx.test(value);
		}
	},
	'date': {
		validation: function(value, options) {
			var formatRegExp = /^([mdy]+)[\.\-\/\\\s]+([mdy]+)[\.\-\/\\\s]+([mdy]+)$/i;
			var valueRegExp = this.dateValidationPattern;
			var formatGroups = options.format.match(formatRegExp);
			var valueGroups = value.match(valueRegExp);
			if (formatGroups !== null && valueGroups !== null) {
				var dayIndex = -1;
				var monthIndex = -1;
				var yearIndex = -1;
				for (var i=1; i<formatGroups.length; i++) {
					switch (formatGroups[i].toLowerCase()) {
						case "dd":
							dayIndex = i;
							break;
						case "mm":
							monthIndex = i;
							break;
						case "yy":
						case "yyyy":
							yearIndex = i;
							break;
					}
				}
				if (dayIndex != -1 && monthIndex != -1 && yearIndex != -1) {
					var maxDay = -1;
					var theDay = parseInt(valueGroups[dayIndex], 10);
					var theMonth = parseInt(valueGroups[monthIndex], 10);
					var theYear = parseInt(valueGroups[yearIndex], 10);

					// Check month value to be between 1..12
					if (theMonth < 1 || theMonth > 12) {
						return false;
					}
					
					// Calculate the maxDay according to the current month
					switch (theMonth) {
						case 1:	// January
						case 3: // March
						case 5: // May
						case 7: // July
						case 8: // August
						case 10: // October
						case 12: // December
							maxDay = 31;
							break;
						case 4:	// April
						case 6: // June
						case 9: // September
						case 11: // November
							maxDay = 30;
							break;
						case 2: // February
							if ((parseInt(theYear/4, 10) * 4 == theYear) && (theYear % 100 != 0 || theYear % 400 == 0)) {
								maxDay = 29;
							} else {
								maxDay = 28;
							}
							break;
					}

					// Check day value to be between 1..maxDay
					if (theDay < 1 || theDay > maxDay) {
						return false;
					}
					
					// If successfull we'll return the date object
					return (new Date(theYear, theMonth - 1, theDay));   //JavaScript requires a month between 0 and 11
				}
			} else {
				return false;
			}
		}
	},
	'time': {
		validation: function(value, options) {
			//	HH:MM:SS T
			var formatRegExp = /([hmst]+)/gi;
			var valueRegExp = /(\d+|AM?|PM?)/gi;
			var formatGroups = options.format.match(formatRegExp);
			var valueGroups = value.match(valueRegExp);
			//mast match and have same length
			if (formatGroups !== null && valueGroups !== null) {
				if (formatGroups.length != valueGroups.length) {
					return false;
				}

				var hourIndex = -1;
				var minuteIndex = -1;
				var secondIndex = -1;
				//T is AM or PM
				var tIndex = -1;
				var theHour = 0, theMinute = 0, theSecond = 0, theT = 'AM';
				for (var i=0; i<formatGroups.length; i++) {
					switch (formatGroups[i].toLowerCase()) {
						case "hh":
							hourIndex = i;
							break;
						case "mm":
							minuteIndex = i;
							break;
						case "ss":
							secondIndex = i;
							break;
						case "t":
						case "tt":
							tIndex = i;
							break;
					}
				}
				if (hourIndex != -1) {
					var theHour = parseInt(valueGroups[hourIndex], 10);
					if (isNaN(theHour) || theHour > (formatGroups[hourIndex] == 'HH' ? 23 : 12 )) {
						return false;
					}
				}
				if (minuteIndex != -1) {
					var theMinute = parseInt(valueGroups[minuteIndex], 10);
					if (isNaN(theMinute) || theMinute > 59) {
						return false;
					}
				}
				if (secondIndex != -1) {
					var theSecond = parseInt(valueGroups[secondIndex], 10);
					if (isNaN(theSecond) || theSecond > 59) {
						return false;
					}
				}
				if (tIndex != -1) {
					var theT = valueGroups[tIndex].toUpperCase();
					if (
						formatGroups[tIndex].toUpperCase() == 'TT' && !/^a|pm$/i.test(theT) || 
						formatGroups[tIndex].toUpperCase() == 'T' && !/^a|p$/i.test(theT)
					) {
						return false;
					}
				}
				var date = new Date(2000, 0, 1, theHour + (theT.charAt(0) == 'P'?12:0), theMinute, theSecond);
				return date;
			} else {
				return false;
			}
		}
	},
	'credit_card': {
		characterMasking: /\d/,
		validation: function(value, options) {
			var regExp = null;
			options.format = options.format || 'ALL';
			switch (options.format.toUpperCase()) {
				case 'ALL': regExp = /^[3-6]{1}[0-9]{12,18}$/; break;
				case 'VISA': regExp = /^4(?:[0-9]{12}|[0-9]{15})$/; break;
				case 'MASTERCARD': regExp = /^5[1-5]{1}[0-9]{14}$/; break;
				case 'AMEX': regExp = /^3(4|7){1}[0-9]{13}$/; break;
				case 'DISCOVER': regExp = /^6011[0-9]{12}$/; break;
				case 'DINERSCLUB': regExp = /^3(?:(0[0-5]{1}[0-9]{11})|(6[0-9]{12})|(8[0-9]{12}))$/; break;
			}
			if (!regExp.test(value)) {
				return false;
			}
			var digits = [];
			var j = 1, digit = '';
			for (var i = value.length - 1; i >= 0; i--) {
				if ((j%2) == 0) {
					digit = parseInt(value.charAt(i), 10) * 2;
					digits[digits.length] = digit.toString().charAt(0);
					if (digit.toString().length == 2) {
						digits[digits.length] = digit.toString().charAt(1);
					}
				} else {
					digit = value.charAt(i);
					digits[digits.length] = digit;
				}
				j++;
			}
			var sum = 0;
			for(i=0; i < digits.length; i++ ) {
				sum += parseInt(digits[i], 10);
			}
			if ((sum%10) == 0) {
				return true;
			}
			return false;
		}
	},
	'zip_code': {
		formats: {
			'zip_us9': {
				pattern:'00000-0000'
			},
			'zip_us5': {
				pattern:'00000'
			},
			'zip_uk': {
				characterMasking: /[\dA-Z\s]/,
				validation: function(value, options) {
					//check one of the following masks
					// AN NAA, ANA NAA, ANN NAA, AAN NAA, AANA NAA, AANN NAA
					return /^[A-Z]{1,2}\d[\dA-Z]?\s?\d[A-Z]{2}$/.test(value);
				}
			},
			'zip_canada': {
				characterMasking: /[\dA-Z\s]/,
				pattern: 'A0A 0A0'
			},
			'zip_custom': {}
		}
	},
	'phone_number': {
		formats: {
			//US phone number; 10 digits
			'phone_us': {
				pattern:'(000) 000-0000'
			},
			'phone_custom': {}
		}
	},
	'social_security_number': {
		pattern:'000-00-0000'
	},
	'ip': {
		characterMaskingFormats: {
			'ipv4': /[\d\.]/i,
			'ipv6_ipv4': /[\d\.\:A-F\/]/i,
			'ipv6': /[\d\.\:A-F\/]/i
		},
		validation: function (value, options) {
			return Spry.Widget.ValidationTextField.validateIP(value, options.format);
		}
	},

	'url': {
		characterMasking: /[^\s]/,
		validation: function(value, options) {
			//fix for ?ID=223429 and ?ID=223387
			/* the following regexp matches components of an URI as specified in http://tools.ietf.org/html/rfc3986#page-51 page 51, Appendix B.
				scheme    = $2
				authority = $4
				path      = $5
				query     = $7
				fragment  = $9
			*/
			var URI_spliter = /^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
			var parts = value.match(URI_spliter);
			if (parts && parts[4]) {
				//encode each component of the domain name using Punycode encoding scheme: http://tools.ietf.org/html/rfc3492
				var host  = parts[4].split(".");
				var punyencoded = '';
				for (var i=0; i<host.length; i++) {
					punyencoded = Spry.Widget.Utils.punycode_encode(host[i], 64);
					if (!punyencoded) {
						return false;
					} else {
						if (punyencoded != (host[i] + "-")) {
							host[i] = 'xn--' + punyencoded;
						}
					}
				}
				host = host .join(".");
				//the encoded domain name is replaced into the original URL to be validated again later as URL
				value = value.replace(URI_spliter, "$1//" + host + "$5$6$8");
			}

			//fix for ?ID=223358 and ?ID=223594
			//the following validates an URL using ABNF rules as defined in http://tools.ietf.org/html/rfc3986 , Appendix A., page 49
			//except host which is extracted by match[1] and validated separately
			/*
			 * userinfo=	(?:(?:[a-z0-9\-\._~\!\$\&\'\(\)\*\+\,\;\=:]|%[0-9a-f]{2,2})*\@)?
			 * host=			(?:((?:(?:[a-z0-9][a-z0-9\-]*[a-z0-9]|[a-z0-9])\.)*(?:[a-z][a-z0-9\-]*[a-z0-9]|[a-z])|(?:\[[^\]]*\]))
			 * pathname=	(?:\/(?:[a-z0-9\-\._~\!\$\&\'\(\)\*\+\,\;\=\:\@]|%[0-9a-f]{2,2})*)*
			 * query=			(?:\?(?:[a-z0-9\-\._~\!\$\&\'\(\)\*\+\,\;\=\:\@\/\?]|%[0-9a-f]{2,2})*)?
			 * anchor=		(?:\#(?:[a-z0-9\-\._~\!\$\&\'\(\)\*\+\,\;\=\:\@\/\?]|%[0-9a-f]{2,2})*)?
			 */
			var regExp = /^(?:https?|ftp)\:\/\/(?:(?:[a-z0-9\-\._~\!\$\&\'\(\)\*\+\,\;\=:]|%[0-9a-f]{2,2})*\@)?(?:((?:(?:[a-z0-9][a-z0-9\-]*[a-z0-9]|[a-z0-9])\.)*(?:[a-z][a-z0-9\-]*[a-z0-9]|[a-z])|(?:\[[^\]]*\]))(?:\:[0-9]*)?)(?:\/(?:[a-z0-9\-\._~\!\$\&\'\(\)\*\+\,\;\=\:\@]|%[0-9a-f]{2,2})*)*(?:\?(?:[a-z0-9\-\._~\!\$\&\'\(\)\*\+\,\;\=\:\@\/\?]|%[0-9a-f]{2,2})*)?(?:\#(?:[a-z0-9\-\._~\!\$\&\'\(\)\*\+\,\;\=\:\@\/\?]|%[0-9a-f]{2,2})*)?$/i;

			var valid = value.match(regExp);
			if (valid) {
				//extract the  address from URL
				var address = valid[1];

				if (address) {
					if (address == '[]') {
						return false;
					}
					if (address.charAt(0) == '[' ) {
						//IPv6 address or IPv4 enclosed in square brackets
						address = address.replace(/^\[|\]$/gi, '');
						return Spry.Widget.ValidationTextField.validateIP(address, 'ipv6_ipv4');
					} else {
						if (/[^0-9\.]/.test(address)) {
							return true;
						} else {
							//check if hostname is all digits and dots and then check for IPv4
							return Spry.Widget.ValidationTextField.validateIP(address, 'ipv4');
						}
					}
				} else {
					return true;
				}
			} else {
				return false;
			}
		}
	}
};

/*
2.2.1. Preferred
x:x:x:x:x:x:x:x, where the 'x's are the hexadecimal values of the eight 16-bit pieces of the address.
Examples:
	FEDC:BA98:7654:3210:FEDC:BA98:7654:3210
	1080:0:0:0:8:800:200C:417A
Note that it is not necessary to write the leading zeros in an
individual field, but there must be at least one numeral in every
field (except for the case described in 2.2.2.).

2.2.2. Compressed
The use of "::" indicates multiple groups of 16-bits of zeros.
The "::" can only appear once in an address.  The "::" can also be
used to compress the leading and/or trailing zeros in an address.
	1080:0:0:0:8:800:200C:417A --> 1080::8:800:200C:417A
	FF01:0:0:0:0:0:0:101 --> FF01::101
	0:0:0:0:0:0:0:1 --> ::1
	0:0:0:0:0:0:0:0 --> ::

2.5.4 IPv6 Addresses with Embedded IPv4 Addresses
	IPv4-compatible IPv6 address (tunnel IPv6 packets over IPv4 routing infrastructures)
	::0:129.144.52.38
	IPv4-mapped IPv6 address (represent the addresses of IPv4-only nodes as IPv6 addresses)
	::ffff:129.144.52.38

The text representation of IPv6 addresses and prefixes in Augmented BNF (Backus-Naur Form) [ABNF] for reference purposes.
[ABNF http://tools.ietf.org/html/rfc2234]
      IPv6address = hexpart [ ":" IPv4address ]
      IPv4address = 1*3DIGIT "." 1*3DIGIT "." 1*3DIGIT "." 1*3DIGIT

      IPv6prefix  = hexpart "/" 1*2DIGIT

      hexpart = hexseq | hexseq "::" [ hexseq ] | "::" [ hexseq ]
      hexseq  = hex4 *( ":" hex4)
      hex4    = 1*4HEXDIG
*/
Spry.Widget.ValidationTextField.validateIP = function (value, format)
{
	var validIPv6Addresses = [
		//preferred
		/^(?:[a-f0-9]{1,4}:){7}[a-f0-9]{1,4}(?:\/\d{1,3})?$/i,

		//various compressed
		/^[a-f0-9]{0,4}::(?:\/\d{1,3})?$/i,
		/^:(?::[a-f0-9]{1,4}){1,6}(?:\/\d{1,3})?$/i,
		/^(?:[a-f0-9]{1,4}:){1,6}:(?:\/\d{1,3})?$/i,
		/^(?:[a-f0-9]{1,4}:)(?::[a-f0-9]{1,4}){1,6}(?:\/\d{1,3})?$/i,
		/^(?:[a-f0-9]{1,4}:){2}(?::[a-f0-9]{1,4}){1,5}(?:\/\d{1,3})?$/i,
		/^(?:[a-f0-9]{1,4}:){3}(?::[a-f0-9]{1,4}){1,4}(?:\/\d{1,3})?$/i,
		/^(?:[a-f0-9]{1,4}:){4}(?::[a-f0-9]{1,4}){1,3}(?:\/\d{1,3})?$/i,
		/^(?:[a-f0-9]{1,4}:){5}(?::[a-f0-9]{1,4}){1,2}(?:\/\d{1,3})?$/i,
		/^(?:[a-f0-9]{1,4}:){6}(?::[a-f0-9]{1,4})(?:\/\d{1,3})?$/i,


		//IPv6 mixes with IPv4
		/^(?:[a-f0-9]{1,4}:){6}(?:\d{1,3}\.){3}\d{1,3}(?:\/\d{1,3})?$/i,
		/^:(?::[a-f0-9]{1,4}){0,4}:(?:\d{1,3}\.){3}\d{1,3}(?:\/\d{1,3})?$/i,
		/^(?:[a-f0-9]{1,4}:){1,5}:(?:\d{1,3}\.){3}\d{1,3}(?:\/\d{1,3})?$/i,
		/^(?:[a-f0-9]{1,4}:)(?::[a-f0-9]{1,4}){1,4}:(?:\d{1,3}\.){3}\d{1,3}(?:\/\d{1,3})?$/i,
		/^(?:[a-f0-9]{1,4}:){2}(?::[a-f0-9]{1,4}){1,3}:(?:\d{1,3}\.){3}\d{1,3}(?:\/\d{1,3})?$/i,	
		/^(?:[a-f0-9]{1,4}:){3}(?::[a-f0-9]{1,4}){1,2}:(?:\d{1,3}\.){3}\d{1,3}(?:\/\d{1,3})?$/i,
		/^(?:[a-f0-9]{1,4}:){4}(?::[a-f0-9]{1,4}):(?:\d{1,3}\.){3}\d{1,3}(?:\/\d{1,3})?$/i
	];
	var validIPv4Addresses = [
		//IPv4
		/^(\d{1,3}\.){3}\d{1,3}$/i
	];
	var validAddresses = [];
	if (format == 'ipv6' || format == 'ipv6_ipv4') {
		validAddresses = validAddresses.concat(validIPv6Addresses);
	}
	if (format == 'ipv4' || format == 'ipv6_ipv4') {
		validAddresses = validAddresses.concat(validIPv4Addresses);
	}

	var ret = false;
	for (var i=0; i<validAddresses.length; i++) {
		if (validAddresses[i].test(value)) {
			ret = true;
			break;
		}
	}

	if (ret && value.indexOf(".") != -1) {
		//if address contains IPv4 fragment, it must be valid; all 4 groups must be less than 256
		var ipv4 = value.match(/:?(?:\d{1,3}\.){3}\d{1,3}/i);
		if(!ipv4) {
			return false;
		}
		ipv4 = ipv4[0].replace(/^:/, '');
		var pieces = ipv4.split('.');
		if (pieces.length != 4) {
			return false;
		}
		var regExp = /^[\-\+]?\d*$/;
		for (var i=0; i< pieces.length; i++) {
			if (pieces[i] == '') {
				return false;
			}
			var piece = parseInt(pieces[i], 10);
			if (isNaN(piece) || piece > 255 || !regExp.test(pieces[i]) || pieces[i].length>3 || /^0{2,3}$/.test(pieces[i])) {
				return false;
			}
		}
	}
	if (ret && value.indexOf("/") != -1) {
		// if prefix-length is specified must be in [1-128]
		var prefLen = value.match(/\/\d{1,3}$/);
		if (!prefLen) return false;
		var prefLenVal = parseInt(prefLen[0].replace(/^\//,''), 10);
		if (isNaN(prefLenVal) || prefLenVal > 128 || prefLenVal < 1) {
			return false;
		}
	}
	return ret;
};

Spry.Widget.ValidationTextField.onloadDidFire = false;
Spry.Widget.ValidationTextField.loadQueue = [];

Spry.Widget.ValidationTextField.prototype.isBrowserSupported = function()
{
	return Spry.is.ie && Spry.is.v >= 5 && Spry.is.windows
		||
	Spry.is.mozilla && Spry.is.v >= 1.4
		||
	Spry.is.safari
		||
	Spry.is.opera && Spry.is.v >= 9;
};

Spry.Widget.ValidationTextField.prototype.init = function(element, options)
{
	this.element = this.getElement(element);
	this.errors = 0;
	this.flags = {locked: false, restoreSelection: true};
	this.options = {};
	this.event_handlers = [];

	this.validClass = "textfieldValidState";
	this.focusClass = "textfieldFocusState";
	this.requiredClass = "textfieldRequiredState";
	this.hintClass = "textfieldHintState";
	this.invalidFormatClass = "textfieldInvalidFormatState";
	this.invalidRangeMinClass = "textfieldMinValueState";
	this.invalidRangeMaxClass = "textfieldMaxValueState";
	this.invalidCharsMinClass = "textfieldMinCharsState";
	this.invalidCharsMaxClass = "textfieldMaxCharsState";
	this.textfieldFlashTextClass = "textfieldFlashText";
	if (Spry.is.safari) {
		this.flags.lastKeyPressedTimeStamp = 0;
	}

	switch (this.type) {
		case 'phone_number':options.format = Spry.Widget.Utils.firstValid(options.format, 'phone_us');break;
		case 'currency':options.format = Spry.Widget.Utils.firstValid(options.format, 'comma_dot');break;
		case 'zip_code':options.format = Spry.Widget.Utils.firstValid(options.format, 'zip_us5');break;
		case 'date':
			options.format = Spry.Widget.Utils.firstValid(options.format, 'mm/dd/yy');
			break;
		case 'time':
			options.format = Spry.Widget.Utils.firstValid(options.format, 'HH:mm');
			options.pattern = options.format.replace(/[hms]/gi, "0").replace(/TT/gi, 'AM').replace(/T/gi, 'A');
			break;
		case 'ip':
			options.format = Spry.Widget.Utils.firstValid(options.format, 'ipv4');
			options.characterMasking = Spry.Widget.ValidationTextField.ValidationDescriptors[this.type].characterMaskingFormats[options.format]; 
			break;
	}

	//retrieve the validation type descriptor to be used with this instance (base on type and format)
	//widgets may have different validations depending on format (like zip_code with formats)
	var validationDescriptor = {};
	if (options.format && Spry.Widget.ValidationTextField.ValidationDescriptors[this.type].formats) {
		if (Spry.Widget.ValidationTextField.ValidationDescriptors[this.type].formats[options.format]) {
			Spry.Widget.Utils.setOptions(validationDescriptor, Spry.Widget.ValidationTextField.ValidationDescriptors[this.type].formats[options.format]);
		}
	} else {
		Spry.Widget.Utils.setOptions(validationDescriptor, Spry.Widget.ValidationTextField.ValidationDescriptors[this.type]);
	}

	//set default values for some parameters which were not aspecified
	options.useCharacterMasking = Spry.Widget.Utils.firstValid(options.useCharacterMasking, false);
	options.hint = Spry.Widget.Utils.firstValid(options.hint, '');
	options.isRequired = Spry.Widget.Utils.firstValid(options.isRequired, true);
	options.additionalError = Spry.Widget.Utils.firstValid(options.additionalError, false);
	if (options.additionalError)
		options.additionalError = this.getElement(options.additionalError);

	//set widget validation parameters
	//get values from validation type descriptor
	//use the user specified values, if defined
	options.characterMasking = Spry.Widget.Utils.firstValid(options.characterMasking, validationDescriptor.characterMasking);
	options.regExpFilter = Spry.Widget.Utils.firstValid(options.regExpFilter, validationDescriptor.regExpFilter);
	options.pattern = Spry.Widget.Utils.firstValid(options.pattern, validationDescriptor.pattern);
	options.validation = Spry.Widget.Utils.firstValid(options.validation, validationDescriptor.validation);
	if (typeof options.validation == 'string') {
		options.validation = eval(options.validation);
	}

	options.minValue = Spry.Widget.Utils.firstValid(options.minValue, validationDescriptor.minValue);
	options.maxValue = Spry.Widget.Utils.firstValid(options.maxValue, validationDescriptor.maxValue);

	options.minChars = Spry.Widget.Utils.firstValid(options.minChars, validationDescriptor.minChars);
	options.maxChars = Spry.Widget.Utils.firstValid(options.maxChars, validationDescriptor.maxChars);

	Spry.Widget.Utils.setOptions(this, options);
	Spry.Widget.Utils.setOptions(this.options, options);
};

Spry.Widget.ValidationTextField.prototype.destroy = function() {
	if (this.event_handlers)
		for (var i=0; i<this.event_handlers.length; i++) {
			Spry.Widget.Utils.removeEventListener(this.event_handlers[i][0], this.event_handlers[i][1], this.event_handlers[i][2], false);
		}
	try { delete this.element; } catch(err) {}
	try { delete this.input; } catch(err) {}
	try { delete this.form; } catch(err) {}
	try { delete this.event_handlers; } catch(err) {}
	try { this.selection.destroy(); } catch(err) {}
	try { delete this.selection; } catch(err) {}

	var q = Spry.Widget.Form.onSubmitWidgetQueue;
	var qlen = q.length;
	for (var i = 0; i < qlen; i++) {
		if (q[i] == this) {
			q.splice(i, 1);
			break;
		}
	}
};

Spry.Widget.ValidationTextField.prototype.attachBehaviors = function()
{
	if (this.element) {
		if (this.element.nodeName == "INPUT") {
			this.input = this.element;
		} else {
			this.input = Spry.Widget.Utils.getFirstChildWithNodeNameAtAnyLevel(this.element, "INPUT");
		}
	}

	if (this.input) {
		if (this.maxChars) {
			this.input.removeAttribute("maxLength");
		}
		this.putHint();
		this.compilePattern();
		if (this.type == 'date') {
			this.compileDatePattern();
		}
		this.input.setAttribute("AutoComplete", "off");
		this.selection = new Spry.Widget.SelectionDescriptor(this.input);
		this.oldValue = this.input.value;

		var self = this;
		this.event_handlers = [];

		this.event_handlers.push([this.input, "keydown", function(e) { if (self.isDisabled()) return true; return self.onKeyDown(e || event); }]);
		this.event_handlers.push([this.input, "keypress", function(e) { if (self.isDisabled()) return true; return self.onKeyPress(e || event); }]);
		if (Spry.is.opera) {
			this.event_handlers.push([this.input, "keyup", function(e) { if (self.isDisabled()) return true; return self.onKeyUp(e || event); }]);
		}

		this.event_handlers.push([this.input, "focus", function(e) { if (self.isDisabled()) return true; return self.onFocus(e || event); }]);
		this.event_handlers.push([this.input, "blur", function(e) { if (self.isDisabled()) return true; return self.onBlur(e || event); }]);

		this.event_handlers.push([this.input, "mousedown", function(e) { if (self.isDisabled()) return true; return self.onMouseDown(e || event); }]);

		var changeEvent = 
			Spry.is.mozilla || Spry.is.opera || Spry.is.safari?"input":
			Spry.is.ie?"propertychange":
			"change";
		this.event_handlers.push([this.input, changeEvent, function(e) { if (self.isDisabled()) return true; return self.onChange(e || event); }]);

		if (Spry.is.mozilla || Spry.is.safari) {
			//oninput event on mozilla does not fire ondragdrop
			this.event_handlers.push([this.input, "dragdrop", function(e) { if (self.isDisabled()) return true; self.removeHint();return self.onChange(e || event); }]);
		} else if (Spry.is.ie){
			//ondrop&onpropertychange crash on IE 
			this.event_handlers.push([this.input, "drop", function(e) { if (self.isDisabled()) return true; return self.onDrop(e || event); }]);
		}

		for (var i=0; i<this.event_handlers.length; i++) {
			Spry.Widget.Utils.addEventListener(this.event_handlers[i][0], this.event_handlers[i][1], this.event_handlers[i][2], false);
		}

		// submit
		this.form = Spry.Widget.Utils.getFirstParentWithNodeName(this.input, "FORM");
		if (this.form) {
			// if no "onSubmit" handler has been attached to the current form, attach one
			if (!this.form.attachedSubmitHandler && !this.form.onsubmit) {
				this.form.onsubmit = function(e) { e = e || event; return Spry.Widget.Form.onSubmit(e, e.srcElement || e.currentTarget) };
				this.form.attachedSubmitHandler = true;                 
			}
			if (!this.form.attachedResetHandler) {
				Spry.Widget.Utils.addEventListener(this.form, "reset", function(e) { e = e || event; return Spry.Widget.Form.onReset(e, e.srcElement || e.currentTarget) }, false);
				this.form.attachedResetHandler = true;                 
			}
			// add the currrent widget to the "onSubmit" check queue;
			Spry.Widget.Form.onSubmitWidgetQueue.push(this);
		}
	}	
};

Spry.Widget.ValidationTextField.prototype.isDisabled = function() {
	return this.input && (this.input.disabled || this.input.readOnly) || !this.input;
};

Spry.Widget.ValidationTextField.prototype.getElement = function(ele)
{
	if (ele && typeof ele == "string")
		return document.getElementById(ele);
	return ele;
};

Spry.Widget.ValidationTextField.addLoadListener = function(handler)
{
	if (typeof window.addEventListener != 'undefined')
		window.addEventListener('load', handler, false);
	else if (typeof document.addEventListener != 'undefined')
		document.addEventListener('load', handler, false);
	else if (typeof window.attachEvent != 'undefined')
		window.attachEvent('onload', handler);
};

Spry.Widget.ValidationTextField.processLoadQueue = function(handler)
{
	Spry.Widget.ValidationTextField.onloadDidFire = true;
	var q = Spry.Widget.ValidationTextField.loadQueue;
	var qlen = q.length;
	for (var i = 0; i < qlen; i++)
		q[i].attachBehaviors();
};

Spry.Widget.ValidationTextField.addLoadListener(Spry.Widget.ValidationTextField.processLoadQueue);
Spry.Widget.ValidationTextField.addLoadListener(function(){
	Spry.Widget.Utils.addEventListener(window, "unload", Spry.Widget.Form.destroyAll, false);
});

Spry.Widget.ValidationTextField.prototype.setValue = function(newValue) {
	this.flags.locked = true;
	this.input.value = newValue;
	this.flags.locked = false;
	this.oldValue = newValue;
	if (!Spry.is.ie) {
		this.onChange();
	}
};

/**
 * save the state of the input (selection and value) so we can revert to it
 * should call this just before modifying the input value
 */
Spry.Widget.ValidationTextField.prototype.saveState = function()
{
	this.oldValue = this.input.value;
	this.selection.update();
};

Spry.Widget.ValidationTextField.prototype.revertState = function(revertValue)
{
	if (revertValue != this.input.value) {
		this.input.readOnly = true;
		this.input.value = revertValue;
		this.input.readOnly = false;
		if (Spry.is.safari && this.flags.active) {
			this.input.focus();
		}
	}
  if (this.flags.restoreSelection) {
	this.selection.moveTo(this.selection.start, this.selection.end);
  }

	this.redTextFlash();
};

Spry.Widget.ValidationTextField.prototype.removeHint = function()
{
	if (this.flags.hintOn) {
		this.input.value = "";
		this.flags.hintOn = false;
		this.removeClassName(this.element, this.hintClass);
		this.removeClassName(this.additionalError, this.hintClass);
	}
};

Spry.Widget.ValidationTextField.prototype.putHint = function()
{
	if(this.hint && this.input && this.input.type == "text" && this.input.value == "") {
		this.flags.hintOn = true;
		this.input.value = this.hint;
		this.addClassName(this.element, this.hintClass);
		this.addClassName(this.additionalError, this.hintClass);
	}
};

Spry.Widget.ValidationTextField.prototype.redTextFlash = function()
{
	var self = this;
	this.addClassName(this.element, this.textfieldFlashTextClass);
	setTimeout(function() {
		self.removeClassName(self.element, self.textfieldFlashTextClass)
	}, 100);
};

Spry.Widget.ValidationTextField.prototype.doValidations = function(testValue, revertValue)
{
	if (this.isDisabled()) return false;

	if (this.flags.locked) {
		return false;
	}

	if (testValue.length == 0 && !this.isRequired) {
		this.errors = 0;
		return false;
	}
	this.flags.locked = true;

	var mustRevert = false;
	var continueValidations = true;
	if (!this.options.isRequired && testValue.length == 0) {
		continueValidations = false;
	}

	var errors = 0;
	var fixedValue = testValue;

	//characterMasking - test if all characters are valid with the characterMasking (keyboard filter)
	if (this.useCharacterMasking && this.characterMasking) {
		for(var i=0; i<testValue.length; i++) {
			if (!this.characterMasking.test(testValue.charAt(i))) {
				errors = errors | Spry.Widget.ValidationTextField.ERROR_FORMAT;
				fixedValue = revertValue;
				mustRevert = true;
				break;
			}
		}
	}

	//regExpFilter - character mask positioning (additional mask to restrict some characters only in some position)
	if (!mustRevert && this.useCharacterMasking && this.regExpFilter) {
		if (!this.regExpFilter.test(fixedValue)) {
			errors = errors | Spry.Widget.ValidationTextField.ERROR_FORMAT;
			mustRevert = true;
		}
	}

	//pattern - testValue matches the pattern so far
	if (!mustRevert && this.pattern) {
		var currentRegExp = this.patternToRegExp(testValue.length);
		if (!currentRegExp.test(testValue)) {
			errors = errors | Spry.Widget.ValidationTextField.ERROR_FORMAT;
			mustRevert = true;
		} else if (this.patternLength != testValue.length) {
			//testValue matches pattern so far, but it's not ok if it does not have the proper length
			//do not revert, but should show the error
			errors = errors | Spry.Widget.ValidationTextField.ERROR_FORMAT;
		}
	}

	if (fixedValue == '') {
		errors = errors | Spry.Widget.ValidationTextField.ERROR_REQUIRED;
	}

	if (!mustRevert && this.pattern && this.useCharacterMasking) {
		var n = this.getAutoComplete(testValue.length);
		if (n) {
			fixedValue += n;
		}
	}

	if(!mustRevert && this.minChars !== null  && continueValidations) {
		if (testValue.length < this.minChars) {
			errors = errors | Spry.Widget.ValidationTextField.ERROR_CHARS_MIN;
			continueValidations = false;
		}
	}

	if(!mustRevert && this.maxChars !== null && continueValidations) {
		if (testValue.length > this.maxChars) {
			errors = errors | Spry.Widget.ValidationTextField.ERROR_CHARS_MAX;
			continueValidations = false;
		}
	}

	//validation - testValue passes widget validation function
	if (!mustRevert && this.validation && continueValidations) {
		var value = this.validation(fixedValue, this.options);
		if (false === value) {
			errors = errors | Spry.Widget.ValidationTextField.ERROR_FORMAT;
			continueValidations = false;
		} else {
			this.typedValue = value;
		}
	}

	if(!mustRevert && this.validation && this.minValue !== null && continueValidations) {
		var minValue = this.validation(this.minValue.toString(), this.options);
		if (minValue !== false) {
			if (this.typedValue < minValue) {
				errors = errors | Spry.Widget.ValidationTextField.ERROR_RANGE_MIN;
				continueValidations = false;
			}
		}
	}

	if(!mustRevert && this.validation && this.maxValue !== null && continueValidations) {
		var maxValue = this.validation(this.maxValue.toString(), this.options);
		if (maxValue !== false) {
			if( this.typedValue > maxValue) {
				errors = errors | Spry.Widget.ValidationTextField.ERROR_RANGE_MAX;
				continueValidations = false;
			}
		}
	}

	//an invalid value was tested; must make sure it does not get inside the input
	if (this.useCharacterMasking && mustRevert) {
		this.revertState(revertValue);
	}

	this.errors = errors;
	this.fixedValue = fixedValue;

	this.flags.locked = false;

	return mustRevert;
};

Spry.Widget.ValidationTextField.prototype.onChange = function(e)
{
	if (Spry.is.opera && this.flags.operaRevertOnKeyUp) {
		return true;
	}
	if (Spry.is.ie && e && e.propertyName != 'value') {
		return true;
	}

	if (this.flags.drop) {
		//delay this if it's a drop operation
		var self = this;
		setTimeout(function() {
			self.flags.drop = false;
			self.onChange(null);
		}, 0);
		return;
	}

	if (this.flags.hintOn) {
		return true;
	}

	if (this.keyCode == 8 || this.keyCode == 46 ) {
		var mustRevert = this.doValidations(this.input.value, this.input.value);
		this.oldValue = this.input.value;
		if ((mustRevert || this.errors) && this.validateOn & Spry.Widget.ValidationTextField.ONCHANGE) {
			var self = this;
			setTimeout(function() {self.validate();}, 0);
			return true;
		}
	}

	var mustRevert = this.doValidations(this.input.value, this.oldValue);
	if ((!mustRevert || this.errors) && this.validateOn & Spry.Widget.ValidationTextField.ONCHANGE) {
		var self = this;
		setTimeout(function() {self.validate();}, 0);
	}
	return true;
};

Spry.Widget.ValidationTextField.prototype.onKeyUp = function(e) {
	if (this.flags.operaRevertOnKeyUp) {
		this.setValue(this.oldValue);
		Spry.Widget.Utils.stopEvent(e);
		this.selection.moveTo(this.selection.start, this.selection.start);
		this.flags.operaRevertOnKeyUp = false;
		return false;
	}
	if (this.flags.operaPasteOperation) {
		window.clearInterval(this.flags.operaPasteOperation);
		this.flags.operaPasteOperation = null;
	}
};

Spry.Widget.ValidationTextField.prototype.operaPasteMonitor = function() {
	if (this.input.value != this.oldValue) {
		var mustRevert = this.doValidations(this.input.value, this.input.value);
		if (mustRevert) {
			this.setValue(this.oldValue);
			this.selection.moveTo(this.selection.start, this.selection.start);
		} else {
			this.onChange();
		}
	}
};


Spry.Widget.ValidationTextField.prototype.compileDatePattern = function () 
{
	var dateValidationPatternString = "";
	var groupPatterns = [];
	var fullGroupPatterns = [];
	var autocompleteCharacters = [];
	
	
	var formatRegExp = /^([mdy]+)([\.\-\/\\\s]+)([mdy]+)([\.\-\/\\\s]+)([mdy]+)$/i;
	var formatGroups = this.options.format.match(formatRegExp);
	if (formatGroups !== null) {
		for (var i=1; i<formatGroups.length; i++) {
			switch (formatGroups[i].toLowerCase()) {
				case "dd":
					groupPatterns[i-1] = "\\d{1,2}";
					fullGroupPatterns[i-1] = "\\d\\d";
					dateValidationPatternString += "(" + groupPatterns[i-1] + ")";
					autocompleteCharacters[i-1] = null;
					break;
				case "mm":
					groupPatterns[i-1] = "\\d{1,2}";
					fullGroupPatterns[i-1] = "\\d\\d";
					dateValidationPatternString += "(" + groupPatterns[i-1] + ")";
					autocompleteCharacters[i-1] = null;
					break;
				case "yy":
					groupPatterns[i-1] = "\\d{1,2}";
					fullGroupPatterns[i-1] = "\\d\\d";
					dateValidationPatternString += "(\\d\\d)";
					autocompleteCharacters[i-1] = null;
					break;
				case "yyyy":
					groupPatterns[i-1] = "\\d{1,4}";
					fullGroupPatterns[i-1] = "\\d\\d\\d\\d";
					dateValidationPatternString += "(\\d\\d\\d\\d)";
					autocompleteCharacters[i-1] = null;
					break;
				default:
					groupPatterns[i-1] = fullGroupPatterns[i-1] = Spry.Widget.ValidationTextField.regExpFromChars(formatGroups[i]);
					dateValidationPatternString += "["+ groupPatterns[i-1] + "]";
					autocompleteCharacters[i-1] = formatGroups[i];
			}
		}
	}
	this.dateValidationPattern = new RegExp("^" + dateValidationPatternString + "$" , "");
	this.dateAutocompleteCharacters = autocompleteCharacters;
	this.dateGroupPatterns = groupPatterns;
	this.dateFullGroupPatterns = fullGroupPatterns;
	this.lastDateGroup = formatGroups.length-2;
};

Spry.Widget.ValidationTextField.prototype.getRegExpForGroup = function (group) 
{
	var ret = '^';
	for (var j = 0; j <= group; j++) ret += this.dateGroupPatterns[j];
	ret += '$';
	return new RegExp(ret, "");	
};

Spry.Widget.ValidationTextField.prototype.getRegExpForFullGroup = function (group) 
{
	var ret = '^';
	for (var j = 0; j < group; j++) ret += this.dateGroupPatterns[j];
	ret += this.dateFullGroupPatterns[group];
	return new RegExp(ret, "");	
};

Spry.Widget.ValidationTextField.prototype.getDateGroup = function(value, pos) 
{
	if (pos == 0) return 0;
	var test_value = value.substring(0, pos);
	for (var i=0; i <= this.lastDateGroup; i++) 
		if (this.getRegExpForGroup(i).test(test_value)) return i;
	return -1;
};


Spry.Widget.ValidationTextField.prototype.isDateGroupFull = function(value, group) 
{
	return this.getRegExpForFullGroup(group).test(value);
};

Spry.Widget.ValidationTextField.prototype.isValueValid = function(value, pos, group) 
{
	var test_value = value.substring(0, pos);
	return this.getRegExpForGroup(group).test(test_value);
};


Spry.Widget.ValidationTextField.prototype.isPositionAtEndOfGroup = function (value, pos, group)
{
	var test_value = value.substring(0, pos);
	return this.getRegExpForFullGroup(group).test(test_value);
};

Spry.Widget.ValidationTextField.prototype.nextDateDelimiterExists = function (value, pos, group)
{
	var autocomplete = this.dateAutocompleteCharacters[group+1];
	if (value.length < pos  + autocomplete.length) 
		return false;
	else 
	{
		var test_value = value.substring(pos, pos+autocomplete.length);
		if (test_value == autocomplete) 
			return true;
	}
	return false;
};



Spry.Widget.ValidationTextField.prototype.onKeyPress = function(e)
{
	if (this.flags.skp) {
		this.flags.skp = false;
		Spry.Widget.Utils.stopEvent(e);
		return false;
	}

	if (e.ctrlKey || e.metaKey || !this.useCharacterMasking) {
		return true;
	}
/*
	if (Spry.is.safari) {
		if ( (e.timeStamp - this.flags.lastKeyPressedTimeStamp)<10 ) {
			return true;
		}
		this.flags.lastKeyPressedTimeStamp = e.timeStamp;
	}
*/
	if (Spry.is.opera && this.flags.operaRevertOnKeyUp) {
		Spry.Widget.Utils.stopEvent(e);
		return false;
	}

	if (this.keyCode == 8 || this.keyCode == 46) {
		var mr = this.doValidations(this.input.value, this.input.value);
		if (mr) {
			return true;
		}
	}

	var pressed = Spry.Widget.Utils.getCharacterFromEvent(e);

	if (pressed && this.characterMasking) {
		if (!this.characterMasking.test(pressed)) {
			Spry.Widget.Utils.stopEvent(e);
			this.redTextFlash();
			return false;
		}
	}

	if(pressed && this.pattern) {
		var currentPatternChar = this.patternCharacters[this.selection.start];
		if (/[ax]/i.test(currentPatternChar)) {
			//convert the entered character to the pattern character case
			if (currentPatternChar.toLowerCase() == currentPatternChar) {
				pressed = pressed.toLowerCase();
			} else {
				pressed = pressed.toUpperCase();
			}
		}

		var autocomplete = this.getAutoComplete(this.selection.start);
		if (this.selection.start == this.oldValue.length) {
			if (this.oldValue.length < this.patternLength) {
				if (autocomplete) {
					Spry.Widget.Utils.stopEvent(e);
					var futureValue = this.oldValue.substring(0, this.selection.start) + autocomplete + pressed;
					var mustRevert = this.doValidations(futureValue, this.oldValue);
					if (!mustRevert) {
						this.setValue(this.fixedValue);
						this.selection.moveTo(this.fixedValue.length, this.fixedValue.length);
					} else {
						this.setValue(this.oldValue.substring(0, this.selection.start) + autocomplete);
						this.selection.moveTo(this.selection.start + autocomplete.length, this.selection.start + autocomplete.length);
					}
					return false;
				}
			} else {
				Spry.Widget.Utils.stopEvent(e);
				this.setValue(this.input.value);
				return false;
			}
		} else if (autocomplete) {
			Spry.Widget.Utils.stopEvent(e);
			this.selection.moveTo(this.selection.start + autocomplete.length, this.selection.start + autocomplete.length);
			return false;
		}

		Spry.Widget.Utils.stopEvent(e);

		var futureValue = this.oldValue.substring(0, this.selection.start) + pressed + this.oldValue.substring(this.selection.start + 1);
		var mustRevert = this.doValidations(futureValue, this.oldValue);

		if (!mustRevert) {
			autocomplete = this.getAutoComplete(this.selection.start + 1);
			this.setValue(this.fixedValue);
			this.selection.moveTo(this.selection.start + 1 + autocomplete.length, this.selection.start + 1 + autocomplete.length);
		} else {
			this.selection.moveTo(this.selection.start, this.selection.start);
		}

		return false;
	}
	
	
	if (pressed && this.type == 'date' && this.useCharacterMasking) 
	{
		var group = this.getDateGroup(this.oldValue, this.selection.start);
		if (group != -1) {
			Spry.Widget.Utils.stopEvent(e);
			if ( (group % 2) !=0 ) 
				group ++;
			
			if (this.isDateGroupFull(this.oldValue, group)) 
			{
				if(this.isPositionAtEndOfGroup(this.oldValue, this.selection.start, group))
				{
					if(group == this.lastDateGroup) 
					{
						this.redTextFlash(); return false;
					}
					else 
					{
						// add or jump over autocomplete delimiter
						var autocomplete = this.dateAutocompleteCharacters[group+1];
						
						if (this.nextDateDelimiterExists(this.oldValue, this.selection.start, group))
						{
							var autocomplete = this.dateAutocompleteCharacters[group+1];
							
							this.selection.moveTo(this.selection.start + autocomplete.length, this.selection.start + autocomplete.length);
							if (pressed == autocomplete) 
								return false;
							
							if (this.isDateGroupFull(this.oldValue, group+2)) 
								// need to overwrite first char in the next digit group
								futureValue = this.oldValue.substring(0, this.selection.start) + pressed + this.oldValue.substring(this.selection.start + 1);
							else
								futureValue = this.oldValue.substring(0, this.selection.start) + pressed + this.oldValue.substring(this.selection.start);
								
							if (!this.isValueValid(futureValue, this.selection.start + 1, group +2 )) 
							{
								this.redTextFlash(); return false;						
							}
							else
							{
								this.setValue (futureValue);
								this.selection.moveTo(this.selection.start + 1, this.selection.start + 1);									
							}
							return false;					
						}
						else 
						{
							var autocomplete = this.dateAutocompleteCharacters[group+1];
							
							var insertedValue = autocomplete + pressed;
							futureValue = this.oldValue.substring(0, this.selection.start) + insertedValue + this.oldValue.substring(this.selection.start);
							if (!this.isValueValid(futureValue, this.selection.start + insertedValue.length, group +2 )) 
							{
								// block this type
								insertedValue = autocomplete;
								futureValue = this.oldValue.substring(0, this.selection.start) + insertedValue + this.oldValue.substring(this.selection.start);
								this.setValue (futureValue);
								this.selection.moveTo(this.selection.start + insertedValue.length, this.selection.start + insertedValue.length);									
								this.redTextFlash(); return false;
							}
							else 
							{
								this.setValue (futureValue);
								this.selection.moveTo(this.selection.start + insertedValue.length, this.selection.start + insertedValue.length);									
								return false;
							}
						}
						
					}
				}
				else
				{
					// it's not the end of the full digits group
					
					// overwrite
					var movePosition = 1;
					futureValue = this.oldValue.substring(0, this.selection.start) + pressed + this.oldValue.substring(this.selection.start + 1);
					if (!this.isValueValid(futureValue, this.selection.start + 1, group)) 
					{
						this.redTextFlash(); return false;
					}
					else 
					{
						if(this.isPositionAtEndOfGroup(futureValue, this.selection.start+1, group)) 
						{
							if (group != this.lastDateGroup)
							{
								if (this.nextDateDelimiterExists(futureValue, this.selection.start + 1, group))
								{
									var autocomplete = this.dateAutocompleteCharacters[group+1];
									movePosition = 1 + autocomplete.length;
								}
								else
								{
									var autocomplete = this.dateAutocompleteCharacters[group+1];
									futureValue = this.oldValue.substring(0, this.selection.start) + pressed + autocomplete + this.oldValue.substring(this.selection.start + 1);
									movePosition = 1 + autocomplete.length;
								}
							}
						}
						this.setValue (futureValue);
						this.selection.moveTo(this.selection.start + movePosition, this.selection.start + movePosition);									
						return false;							
					}			
				}
			}
			else
			{
				// date group is not full
				// insert
				futureValue = this.oldValue.substring(0, this.selection.start) + pressed + this.oldValue.substring(this.selection.start);
				var movePosition = 1;
				if (!this.isValueValid(futureValue, this.selection.start + 1, group) && !this.isValueValid(futureValue, this.selection.start + 1, group+1)) 
				{
					this.redTextFlash(); return false;
				}
				else 
				{
					var autocomplete = this.dateAutocompleteCharacters[group+1];
					if (pressed == autocomplete) 
					{
						if (this.nextDateDelimiterExists(this.oldValue, this.selection.start, group))
						{
							futureValue = this.oldValue;
							movePosition = 1;
						}
					}
					else
					{
						if(this.isPositionAtEndOfGroup(futureValue, this.selection.start+1, group)) 
						{
							if (group != this.lastDateGroup)
							{
								if (this.nextDateDelimiterExists(futureValue, this.selection.start + 1, group))
								{
									var autocomplete = this.dateAutocompleteCharacters[group+1];
									movePosition = 1 + autocomplete.length;
								}
								else
								{
									var autocomplete = this.dateAutocompleteCharacters[group+1];
									futureValue = this.oldValue.substring(0, this.selection.start) + pressed + autocomplete + this.oldValue.substring(this.selection.start + 1);
									movePosition = 1 + autocomplete.length;
								}
							}
						}
					}
					this.setValue (futureValue);
					this.selection.moveTo(this.selection.start + movePosition, this.selection.start + movePosition);									
					return false;						
				}	
			}
		}
		return false;
	}
	
};

Spry.Widget.ValidationTextField.prototype.onKeyDown = function(e)
{
	this.saveState();
	this.keyCode = e.keyCode;

	if (Spry.is.opera) {
		if (this.flags.operaPasteOperation) {
			window.clearInterval(this.flags.operaPasteOperation);
			this.flags.operaPasteOperation = null;
		}
		if (e.ctrlKey) {
			var pressed = Spry.Widget.Utils.getCharacterFromEvent(e);
			if (pressed && 'vx'.indexOf(pressed.toLowerCase()) != -1) {
				var self = this;
				this.flags.operaPasteOperation = window.setInterval(function() { self.operaPasteMonitor();}, 1);
				return true;
			}
		}
	}

	if (this.keyCode != 8 && this.keyCode != 46 && Spry.Widget.Utils.isSpecialKey(e)) {
		return true;
	}
	if (this.keyCode == 8 || this.keyCode == 46 ) {
		var mr = this.doValidations(this.input.value, this.input.value);
		if (mr) {
			return true;
		}
	}

	//DELETE
	if (this.useCharacterMasking && this.pattern && this.keyCode == 46) {
		if (e.ctrlKey) {
			//delete from selection until end
			this.setValue(this.input.value.substring(0, this.selection.start));
		} else if (this.selection.end == this.input.value.length || this.selection.start == this.input.value.length-1){
			//allow key if selection is at end (will delete selection)
			return true;
		} else {
			this.flags.operaRevertOnKeyUp = true;
		}
		if (Spry.is.mozilla && Spry.is.mac) {
			this.flags.skp = true;
		}
		Spry.Widget.Utils.stopEvent(e);
		return false;
	}

	//BACKSPACE
	if (this.useCharacterMasking && this.pattern && !e.ctrlKey && this.keyCode == 8) {
		if (this.selection.start == this.input.value.length) {
			//delete with BACKSPACE from the end of the input value only
			var n = this.getAutoComplete(this.selection.start, -1);
			this.setValue(this.input.value.substring(0, this.input.value.length - (Spry.is.opera?0:1) - n.length));
			if (Spry.is.opera) {
				//cant stop the event on Opera, we'll just preserve the selection so delete will act on it
				this.selection.start = this.selection.start - 1 - n.length;
				this.selection.end = this.selection.end - 1 - n.length;
			}
		} else if (this.selection.end == this.input.value.length){
			//allow BACKSPACE if selection is at end (will delete selection)
			return true;
		} else {
			this.flags.operaRevertOnKeyUp = true;
		}
		if (Spry.is.mozilla && Spry.is.mac) {
			this.flags.skp = true;
		} 
		Spry.Widget.Utils.stopEvent(e);
		return false;
	}

	return true;
};

Spry.Widget.ValidationTextField.prototype.onMouseDown = function(e)
{
	if (this.flags.active) {
		//mousedown fires before focus
		//avoid double saveState on first focus by mousedown by checking if the control has focus
		//do nothing if it's not focused because saveState will be called onfocus
		this.saveState();
	}
};

Spry.Widget.ValidationTextField.prototype.onDrop = function(e)
{
	//mark that a drop operation is in progress to avoid race conditions with event handlers for other events
	//especially onchange and onfocus
	this.flags.drop = true;
	this.removeHint();
	this.saveState();
	this.flags.active = true;
	this.addClassName(this.element, this.focusClass);
	this.addClassName(this.additionalError, this.focusClass);
};

Spry.Widget.ValidationTextField.prototype.onFocus = function(e)
{
	if (this.flags.drop) {
		return;
	}
	this.removeHint();

	if (this.pattern && this.useCharacterMasking) {
		var autocomplete = this.getAutoComplete(this.selection.start);
		this.setValue(this.input.value + autocomplete);
		this.selection.moveTo(this.input.value.length, this.input.value.length);
	}
	
	this.saveState();
	this.flags.active = true;
	this.addClassName(this.element, this.focusClass);
	this.addClassName(this.additionalError, this.focusClass);
};
	
Spry.Widget.ValidationTextField.prototype.onBlur = function(e)
{
	this.flags.active = false;
	this.removeClassName(this.element, this.focusClass);
	this.removeClassName(this.additionalError, this.focusClass);
	this.flags.restoreSelection = false;
	var mustRevert = this.doValidations(this.input.value, this.input.value);
	this.flags.restoreSelection = true;

	if (this.validateOn & Spry.Widget.ValidationTextField.ONBLUR) {
		this.validate();
	}
	var self = this;
	setTimeout(function() {self.putHint();}, 10);
	return true;
};

Spry.Widget.ValidationTextField.prototype.compilePattern = function() {
	if (!this.pattern) {
		return;
	}
	var compiled = [];
	var regexps = [];
	var patternCharacters = [];
	var idx = 0;
	var c = '', p = '';
	for (var i=0; i<this.pattern.length; i++) {
		c = this.pattern.charAt(i);
		if (p == '\\') {
			if (/[0ABXY\?]/i.test(c)) {
				regexps[idx - 1] = c;
			} else {
				regexps[idx - 1] = Spry.Widget.ValidationTextField.regExpFromChars(c);
			}
			compiled[idx - 1] = c;
			patternCharacters[idx - 1] = null;
			p = '';
			continue;
		}
		regexps[idx] = Spry.Widget.ValidationTextField.regExpFromChars(c);
		if (/[0ABXY\?]/i.test(c)) {
			compiled[idx] = null;
			patternCharacters[idx] = c;
		} else if (c == '\\') {
			compiled[idx] = c;
			patternCharacters[idx] = '\\';
		} else {
			compiled[idx] = c;
			patternCharacters[idx] = null;
		}
		idx++;
		p = c;
	}

	this.autoCompleteCharacters = compiled;
	this.compiledPattern = regexps;
	this.patternCharacters = patternCharacters;
	this.patternLength = compiled.length;
};

Spry.Widget.ValidationTextField.prototype.getAutoComplete = function(from, direction) {
	if (direction == -1) {
		var n = '', m = '';
		while(from && (n = this.getAutoComplete(--from) )) {
			m = n;
		}
		return m;
	}
	var ret = '', c = '';
	for (var i=from; i<this.autoCompleteCharacters.length; i++) {
		c = this.autoCompleteCharacters[i];
		if (c) {
			ret += c;
		} else {
			break;
		}
	}
	return ret;
};

Spry.Widget.ValidationTextField.regExpFromChars = function (string) {
	//string contains pattern characters
	var ret = '', character = '';
	for (var i = 0; i<string.length; i++) {
		character = string.charAt(i);
		switch (character) {
			case '0': ret += '\\d';break;
			case 'A': ret += '[A-Z]';break;
//			case 'A': ret += '[\u0041-\u005A\u0061-\u007A\u0100-\u017E\u0180-\u0233\u0391-\u03CE\u0410-\u044F\u05D0-\u05EA\u0621-\u063A\u0641-\u064A\u0661-\u06D3\u06F1-\u06FE]';break;
			case 'a': ret += '[a-z]';break;
//			case 'a': ret += '[\u0080-\u00FF]';break;
			case 'B': case 'b': ret += '[a-zA-Z]';break;
			case 'x': ret += '[0-9a-z]';break;
			case 'X': ret += '[0-9A-Z]';break;
			case 'Y': case 'y': ret += '[0-9a-zA-Z]';break;
			case '?': ret += '.';break;
			case '1':case '2':case '3':case '4':case '5':case '6':case '7':case '8':case '9':
				ret += character;
				break;
			case 'c': case 'C': case 'e': case 'E': case 'f': case 'F':case 'r':case 'd': case 'D':case 'n':case 's':case 'S':case 'w':case 'W':case 't':case 'v':
				ret += character;
				break;
			default: ret += '\\' + character;
		}
	}
	return ret;
};

Spry.Widget.ValidationTextField.prototype.patternToRegExp = function(len) {
	var ret = '^';
	var end = Math.min(this.compiledPattern.length, len);
	for (var i=0; i < end; i++) {
		ret += this.compiledPattern[i];
	}
	ret += '$';
	ret = new RegExp(ret, "");
	return ret;
};

Spry.Widget.ValidationTextField.prototype.resetClasses = function() {
	var classes = [this.requiredClass, this.invalidFormatClass, this.invalidRangeMinClass, this.invalidRangeMaxClass, this.invalidCharsMinClass, this.invalidCharsMaxClass, this.validClass];
	for (var i=0; i < classes.length; i++)
	{
		this.removeClassName(this.element, classes[i]);
		this.removeClassName(this.additionalError, classes[i]);
	}
};

Spry.Widget.ValidationTextField.prototype.reset = function() {
	this.removeHint();
	this.oldValue = this.input.defaultValue;
	
	this.resetClasses();
	if (Spry.is.ie) {
		//this will fire the onpropertychange event right after the className changed on the container element
		//IE6 will not fire the first onpropertychange on an input type text after a onreset handler if inside that handler the className of one of the elements inside the form has been changed
		//to reproduce: change the className of one of the elements inside the form from within the onreset handler; then the onpropertychange does not fire the first time
		this.input.forceFireFirstOnPropertyChange = true;
		this.input.removeAttribute("forceFireFirstOnPropertyChange");
	}
	var self = this;
	setTimeout(function() {self.putHint();}, 10);
};

Spry.Widget.ValidationTextField.prototype.validate = function() {

	this.resetClasses();
	//possible states: required, format, rangeMin, rangeMax, charsMin, charsMax
	if (this.validateOn & Spry.Widget.ValidationTextField.ONSUBMIT) {

		this.removeHint();
		this.doValidations(this.input.value, this.input.value);

		if(!this.flags.active) {
			var self = this;
			setTimeout(function() {self.putHint();}, 10);
		}
	}

	if (this.isRequired && this.errors & Spry.Widget.ValidationTextField.ERROR_REQUIRED) {
		this.addClassName(this.element, this.requiredClass);
		this.addClassName(this.additionalError, this.requiredClass);
		return false;
	}

	if (this.errors & Spry.Widget.ValidationTextField.ERROR_FORMAT) {
		this.addClassName(this.element, this.invalidFormatClass);
		this.addClassName(this.additionalError, this.invalidFormatClass);
		return false;
	}

	if (this.errors & Spry.Widget.ValidationTextField.ERROR_RANGE_MIN) {
		this.addClassName(this.element, this.invalidRangeMinClass);
		this.addClassName(this.additionalError, this.invalidRangeMinClass);
		return false;
	}

	if (this.errors & Spry.Widget.ValidationTextField.ERROR_RANGE_MAX) {
		this.addClassName(this.element, this.invalidRangeMaxClass);
		this.addClassName(this.additionalError, this.invalidRangeMaxClass);
		return false;
	}

	if (this.errors & Spry.Widget.ValidationTextField.ERROR_CHARS_MIN) {
		this.addClassName(this.element, this.invalidCharsMinClass);
		this.addClassName(this.additionalError, this.invalidCharsMinClass);
		return false;
	}

	if (this.errors & Spry.Widget.ValidationTextField.ERROR_CHARS_MAX) {
		this.addClassName(this.element, this.invalidCharsMaxClass);
		this.addClassName(this.additionalError, this.invalidCharsMaxClass);
		return false;
	}

	this.addClassName(this.element, this.validClass);
	this.addClassName(this.additionalError, this.validClass);
	return true;
};

Spry.Widget.ValidationTextField.prototype.addClassName = function(ele, className)
{
	if (!ele || !className || (ele.className && ele.className.search(new RegExp("\\b" + className + "\\b")) != -1))
		return;
	ele.className += (ele.className ? " " : "") + className;
};

Spry.Widget.ValidationTextField.prototype.removeClassName = function(ele, className)
{
	if (!ele || !className || (ele.className && ele.className.search(new RegExp("\\b" + className + "\\b")) == -1))
		return;
	ele.className = ele.className.replace(new RegExp("\\s*\\b" + className + "\\b", "g"), "");
};
Spry.Widget.ValidationTextField.prototype.showError = function(msg)
{
	alert('Spry.Widget.TextField ERR: ' + msg);
};
/**
 * SelectionDescriptor is a wrapper for input type text selection methods and properties 
 * as implemented by various  browsers
 */
Spry.Widget.SelectionDescriptor = function (element)
{
	this.element = element;
	this.update();
};

Spry.Widget.SelectionDescriptor.prototype.update = function()
{
	if (Spry.is.ie && Spry.is.windows) {
		var sel = this.element.ownerDocument.selection;
		if (this.element.nodeName == "TEXTAREA") {
			if (sel.type != 'None') {
				try{var range = sel.createRange();}catch(err){return;}
				if (range.parentElement() == this.element){
					var range_all = this.element.ownerDocument.body.createTextRange();
					range_all.moveToElementText(this.element);
					for (var sel_start = 0; range_all.compareEndPoints('StartToStart', range) < 0; sel_start ++){
						range_all.moveStart('character', 1);
					}
					this.start = sel_start;
					// create a selection of the whole this.element
					range_all = this.element.ownerDocument.body.createTextRange();
					range_all.moveToElementText(this.element);
					for (var sel_end = 0; range_all.compareEndPoints('StartToEnd', range) < 0; sel_end++){
						range_all.moveStart('character', 1);
					}
					this.end = sel_end;
					this.length = this.end - this.start;
					// get selected and surrounding text
					this.text = range.text;
		 		}
			}        
		} else if (this.element.nodeName == "INPUT"){
			try{this.range = sel.createRange();}catch(err){return;}
			this.length = this.range.text.length;
			var clone = this.range.duplicate();
			this.start = -clone.moveStart("character", -10000);
			clone = this.range.duplicate();
			clone.collapse(false);
			this.end = -clone.moveStart("character", -10000);
			this.text = this.range.text;
		}
	} else {
		var tmp = this.element;
		var selectionStart = 0;
		var selectionEnd = 0;
        
		try { selectionStart = tmp.selectionStart;} catch(err) {}
		try { selectionEnd = tmp.selectionEnd;} catch(err) {}

		if (Spry.is.safari) {
			if (selectionStart == 2147483647) {
				selectionStart = 0;
			}
			if (selectionEnd == 2147483647) {
				selectionEnd = 0;
			}
		}
		this.start = selectionStart;
		this.end = selectionEnd;
		this.length = selectionEnd - selectionStart;
		this.text = this.element.value.substring(selectionStart, selectionEnd);
	}
};

Spry.Widget.SelectionDescriptor.prototype.destroy = function() {
	try { delete this.range} catch(err) {}
	try { delete this.element} catch(err) {}
};

Spry.Widget.SelectionDescriptor.prototype.move = function(amount)
{
	if (Spry.is.ie && Spry.is.windows) {
		this.range.move("character", amount);
		this.range.select();
	} else {
		try { this.element.selectionStart++;}catch(err) {}
	}
	this.update();
};

Spry.Widget.SelectionDescriptor.prototype.moveTo = function(start, end)
{
	if (Spry.is.ie && Spry.is.windows) {
		if (this.element.nodeName == "TEXTAREA") {
			var ta_range = this.element.createTextRange();
			this.range = this.element.createTextRange();
			this.range.move("character", start);
			this.range.moveEnd("character", end - start);
			
			var c1 = this.range.compareEndPoints("StartToStart", ta_range);
			if (c1 < 0) {
				this.range.setEndPoint("StartToStart", ta_range);
			}

			var c2 = this.range.compareEndPoints("EndToEnd", ta_range);
			if (c2 > 0) {
				this.range.setEndPoint("EndToEnd", ta_range);
			}
		} else if (this.element.nodeName == "INPUT"){
			this.range = this.element.ownerDocument.selection.createRange();
			this.range.move("character", -10000);
			this.start = this.range.moveStart("character", start);
			this.end = this.start + this.range.moveEnd("character", end - start);
		}
		this.range.select();
	} else {
		this.start = start;
		try { this.element.selectionStart = start;} catch(err) {}
		this.end = end;
		try { this.element.selectionEnd = end;} catch(err) {}
	}
	this.ignore = true;
	this.update();
};

Spry.Widget.SelectionDescriptor.prototype.moveEnd = function(amount)
{
	if (Spry.is.ie && Spry.is.windows) {
		this.range.moveEnd("character", amount);
		this.range.select();
	} else {
		try { this.element.selectionEnd++;} catch(err) {}
	}
	this.update();
};

Spry.Widget.SelectionDescriptor.prototype.collapse = function(begin)
{
	if (Spry.is.ie && Spry.is.windows) {
		this.range = this.element.ownerDocument.selection.createRange();
		this.range.collapse(begin);
		this.range.select();
	} else {
		if (begin) {
			try { this.element.selectionEnd = this.element.selectionStart;} catch(err) {}
		} else {
			try { this.element.selectionStart = this.element.selectionEnd;} catch(err) {}
		}
	}

	this.update();
};

//////////////////////////////////////////////////////////////////////
//
// Spry.Widget.Form - common for all widgets
//
//////////////////////////////////////////////////////////////////////

if (!Spry.Widget.Form) Spry.Widget.Form = {};
if (!Spry.Widget.Form.onSubmitWidgetQueue) Spry.Widget.Form.onSubmitWidgetQueue = [];

if (!Spry.Widget.Form.validate) {
	Spry.Widget.Form.validate = function(vform) {
		var isValid = true;
		var isElementValid = true;
		var q = Spry.Widget.Form.onSubmitWidgetQueue;
		var qlen = q.length;
		for (var i = 0; i < qlen; i++) {
			if (!q[i].isDisabled() && q[i].form == vform) {
				isElementValid = q[i].validate();
				isValid = isElementValid && isValid;
			}
		}
		return isValid;
	}
};

if (!Spry.Widget.Form.onSubmit) {
	Spry.Widget.Form.onSubmit = function(e, form)
	{
		if (Spry.Widget.Form.validate(form) == false) {
			return false;
		}
		return true;
	};
};

if (!Spry.Widget.Form.onReset) {
	Spry.Widget.Form.onReset = function(e, vform)
	{
		var q = Spry.Widget.Form.onSubmitWidgetQueue;
		var qlen = q.length;
		for (var i = 0; i < qlen; i++) {
			if (!q[i].isDisabled() && q[i].form == vform && typeof(q[i].reset) == 'function') {
				q[i].reset();
			}
		}
		return true;
	};
};

if (!Spry.Widget.Form.destroy) {
	Spry.Widget.Form.destroy = function(form)
	{
		var q = Spry.Widget.Form.onSubmitWidgetQueue;
		for (var i = 0; i < Spry.Widget.Form.onSubmitWidgetQueue.length; i++) {
			if (q[i].form == form && typeof(q[i].destroy) == 'function') {
				q[i].destroy();
				i--;
			}
		}
	}
};

if (!Spry.Widget.Form.destroyAll) {
	Spry.Widget.Form.destroyAll = function()
	{
		var q = Spry.Widget.Form.onSubmitWidgetQueue;
		for (var i = 0; i < Spry.Widget.Form.onSubmitWidgetQueue.length; i++) {
			if (typeof(q[i].destroy) == 'function') {
				q[i].destroy();
				i--;
			}
		}
	}
};

//////////////////////////////////////////////////////////////////////
//
// Spry.Widget.Utils
//
//////////////////////////////////////////////////////////////////////

if (!Spry.Widget.Utils)	Spry.Widget.Utils = {};

Spry.Widget.Utils.punycode_constants = {
	base : 36, tmin : 1, tmax : 26, skew : 38, damp : 700,
  initial_bias : 72, initial_n : 0x80, delimiter : 0x2D,
  maxint : 2<<26-1
};

Spry.Widget.Utils.punycode_encode_digit = function (d) {
  return String.fromCharCode(d + 22 + 75 * (d < 26));
};

Spry.Widget.Utils.punycode_adapt = function (delta, numpoints, firsttime) {
	delta = firsttime ? delta / this.punycode_constants.damp : delta >> 1;
	delta += delta / numpoints;
	
	for (var k = 0; delta > ((this.punycode_constants.base - this.punycode_constants.tmin) * this.punycode_constants.tmax) / 2; k += this.punycode_constants.base) {
		delta /= this.punycode_constants.base - this.punycode_constants.tmin;
	}
	return k + (this.punycode_constants.base - this.punycode_constants.tmin + 1) * delta / (delta + this.punycode_constants.skew);
};

/**
 * returns a 	Punicode representation of a UTF-8 string
 * adapted from http://tools.ietf.org/html/rfc3492
 */
Spry.Widget.Utils.punycode_encode = function (input, max_out) {
	var inputc = input.split("");
	input = [];
	for(var i=0; i<inputc.length; i++) {
		input.push(inputc[i].charCodeAt(0));
	}
	var output = '';

  var h, b, j, m, q, k, t;
	var input_len = input.length;
  var n = this.punycode_constants.initial_n;
  var delta = 0;
  var bias = this.punycode_constants.initial_bias;
  var out = 0;

  for (j = 0; j < input_len; j++) {
		if (input[j] < 128) {
			if (max_out - out < 2) {
				return false;
			}
			output += String.fromCharCode(input[j]);
			out++;
		}
	}

	h = b = out;
	if (b > 0) {
		output += String.fromCharCode(this.punycode_constants.delimiter);
		out++;
	}

  while (h < input_len)	{
		for (m = this.punycode_constants.maxint, j = 0; j < input_len; j++) {
			if (input[j] >= n && input[j] < m) {
				m = input[j];
			}
		}
		if (m - n > (this.punycode_constants.maxint - delta) / (h + 1)) {
			return false;
		}
		
		delta += (m - n) * (h + 1);
		n = m;

		for (j = 0; j < input_len; j++) {
			if (input[j] < n ) {
				if (++delta == 0) {
					return false;
				}
			}

			if (input[j] == n) {
				for (q = delta, k = this.punycode_constants.base; true; k += this.punycode_constants.base) {
					if (out >= max_out) {
						return false;
					}

					t = k <= bias ? this.punycode_constants.tmin : k >= bias + this.punycode_constants.tmax ? this.punycode_constants.tmax : k - bias;
					if (q < t) {
						break;
					}

					output += this.punycode_encode_digit(t + (q - t) % (this.punycode_constants.base - t));
					out++;
					q = (q - t) / (this.punycode_constants.base - t);
				}

				output += this.punycode_encode_digit(q);
				out++;
				bias = this.punycode_adapt(delta, h + 1, h == b);
				delta = 0;
				h++;
			}
		}
		delta++, n++;
	}

  return output;
};

Spry.Widget.Utils.setOptions = function(obj, optionsObj, ignoreUndefinedProps)
{
	if (!optionsObj)
		return;
	for (var optionName in optionsObj)
	{
		if (ignoreUndefinedProps && optionsObj[optionName] == undefined)
			continue;
		obj[optionName] = optionsObj[optionName];
	}
};

Spry.Widget.Utils.firstValid = function() {
	var ret = null;
	for(var i=0; i<Spry.Widget.Utils.firstValid.arguments.length; i++) {
		if (typeof(Spry.Widget.Utils.firstValid.arguments[i]) != 'undefined') {
			ret = Spry.Widget.Utils.firstValid.arguments[i];
			break;
		}
	}
	return ret;
};


Spry.Widget.Utils.specialCharacters = ",8,9,16,17,18,20,27,33,34,35,36,37,38,40,45,144,192,63232,";
Spry.Widget.Utils.specialSafariNavKeys = "63232,63233,63234,63235,63272,63273,63275,63276,63277,63289,";
Spry.Widget.Utils.specialNotSafariCharacters = "39,46,91,92,93,";

Spry.Widget.Utils.specialCharacters += Spry.Widget.Utils.specialSafariNavKeys;

if (!Spry.is.safari) {
	Spry.Widget.Utils.specialCharacters += Spry.Widget.Utils.specialNotSafariCharacters;
}

Spry.Widget.Utils.isSpecialKey = function (ev) {
	return Spry.Widget.Utils.specialCharacters.indexOf("," + ev.keyCode + ",") != -1;
};

Spry.Widget.Utils.getCharacterFromEvent = function(e){
	var keyDown = e.type == "keydown";

	var code = null;
	var character = null;
	if(Spry.is.mozilla && !keyDown){
		if(e.charCode){
			character = String.fromCharCode(e.charCode);
		} else {
			code = e.keyCode;
		}
	} else {
		code = e.keyCode || e.which;
		if (code != 13) {
			character = String.fromCharCode(code);
		}
	}

	if (Spry.is.safari) {
		if (keyDown) {
			code = e.keyCode || e.which;
			character = String.fromCharCode(code);
		} else {
			code = e.keyCode || e.which;
			if (Spry.Widget.Utils.specialCharacters.indexOf("," + code + ",") != -1) {
				character = null;
			} else {
				character = String.fromCharCode(code);
			}
		}
	}

	if(Spry.is.opera) {
		if (Spry.Widget.Utils.specialCharacters.indexOf("," + code + ",") != -1) {
			character = null;
		} else {
			character = String.fromCharCode(code);
		}
	}

	return character;
};

Spry.Widget.Utils.getFirstChildWithNodeNameAtAnyLevel = function(node, nodeName)
{
	var elements  = node.getElementsByTagName(nodeName);
	if (elements) {
		return elements[0];
	}
	return null;
};

Spry.Widget.Utils.getFirstParentWithNodeName = function(node, nodeName)
{
	while (node.parentNode
			&& node.parentNode.nodeName.toLowerCase() != nodeName.toLowerCase()
			&& node.parentNode.nodeName != 'BODY') {
		node = node.parentNode;
	}

	if (node.parentNode && node.parentNode.nodeName.toLowerCase() == nodeName.toLowerCase()) {
		return node.parentNode;
	} else {
		return null;
	}
};

Spry.Widget.Utils.destroyWidgets = function (container)
{
	if (typeof container == 'string') {
		container = document.getElementById(container);
	}

	var q = Spry.Widget.Form.onSubmitWidgetQueue;
	for (var i = 0; i < Spry.Widget.Form.onSubmitWidgetQueue.length; i++) {
		if (typeof(q[i].destroy) == 'function' && Spry.Widget.Utils.contains(container, q[i].element)) {
			q[i].destroy();
			i--;
		}
	}
};

Spry.Widget.Utils.contains = function (who, what)
{
	if (typeof who.contains == 'object') {
		return what && who && (who == what || who.contains(what));
	} else {
		var el = what;
		while(el) {
			if (el == who) {
				return true;
			}
			el = el.parentNode;
		}
		return false;
	}
};

Spry.Widget.Utils.addEventListener = function(element, eventType, handler, capture)
{
	try
	{
		if (element.addEventListener)
			element.addEventListener(eventType, handler, capture);
		else if (element.attachEvent)
			element.attachEvent("on" + eventType, handler, capture);
	}
	catch (e) {}
};

Spry.Widget.Utils.removeEventListener = function(element, eventType, handler, capture)
{
	try
	{
		if (element.removeEventListener)
			element.removeEventListener(eventType, handler, capture);
		else if (element.detachEvent)
			element.detachEvent("on" + eventType, handler, capture);
	}
	catch (e) {}
};

Spry.Widget.Utils.stopEvent = function(ev)
{
	try
	{
		this.stopPropagation(ev);
		this.preventDefault(ev);
	}
	catch (e) {}
};

/**
 * Stops event propagation
 * @param {Event} ev the event
 */
Spry.Widget.Utils.stopPropagation = function(ev)
{
	if (ev.stopPropagation)
	{
		ev.stopPropagation();
	}
	else
	{
		ev.cancelBubble = true;
	}
};

/**
 * Prevents the default behavior of the event
 * @param {Event} ev the event
 */
Spry.Widget.Utils.preventDefault = function(ev)
{
	if (ev.preventDefault)
	{
		ev.preventDefault();
	}
	else
	{
		ev.returnValue = false;
	}
};
