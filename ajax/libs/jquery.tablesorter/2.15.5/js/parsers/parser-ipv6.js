/*! IPv6 Address parser (WIP)
* IPv6 Address (ffff:0000:0000:0000:0000:0000:0000:0000)
* needs to support short versions like "::8" or "1:2::7:8"
* and "::00:192.168.10.184" (embedded IPv4 address)
* see http://www.intermapper.com/support/tools/IPV6-Validator.aspx
*/
/*global jQuery: false */
;(function($){
	"use strict";

	var ts = $.tablesorter;

	$.extend( ts.regex, {}, {
		ipv4Validate : /((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})/,
		ipv4Extract  : /([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})/,

	// simplified regex from http://www.intermapper.com/support/tools/IPV6-Validator.aspx
	// (specifically from http://download.dartware.com/thirdparty/ipv6validator.js)
		ipv6Validate : /^\s*((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/i
	});

	ts.addParser({
		id: "ipv6Address",
		is: function(s) {
			return ts.regex.ipv6Validate.test(s);
		},
		format: function(address, table) {
			// code modified from http://forrst.com/posts/JS_Expand_Abbreviated_IPv6_Addresses-1OR
			var i, t, sides, groups, groupsPresent,
				hex = table ? (typeof table === "boolean" ? table : table && table.config.ipv6HexFormat || false) : false,
				fullAddress = '',
				expandedAddress = '',
				validGroupCount = 8,
				validGroupSize = 4;
			// remove any extra spaces
			address = address.replace(/\s*/g, '');
			// look for embedded ipv4
			if (ts.regex.ipv4Validate.test(address)) {
				groups = address.match(ts.regex.ipv4Extract);
				t = '';
				for (i = 1; i < groups.length; i++){
					t += ('00' + (parseInt(groups[i], 10).toString(16)) ).slice(-2) + ( i === 2 ? ':' : '' );
				}
				address = address.replace( ts.regex.ipv4Extract, t );
			}

			if (address.indexOf("::") == -1) {
				// All eight groups are present
				fullAddress = address;
			} else {
				// Consecutive groups of zeroes have been collapsed with "::".
				sides = address.split("::");
				groupsPresent = 0;
				for (i = 0; i < sides.length; i++) {
					groupsPresent += sides[i].split(":").length;
				}
				fullAddress += sides[0] + ":";
				for (i = 0; i < validGroupCount - groupsPresent; i++) {
					fullAddress += "0000:";
				}
				fullAddress += sides[1];
			}
			groups = fullAddress.split(":");
			for (i = 0; i < validGroupCount; i++) {
				// it's fastest & easiest for tablesorter to sort decimal values (vs hex)
				groups[i] = hex ? ('0000' + groups[i]).slice(-4) :
					('00000' + (parseInt(groups[i], 16) || 0)).slice(-5);
				expandedAddress += ( i != validGroupCount-1) ? groups[i] + ':' : groups[i];
			}
			return hex ? expandedAddress : expandedAddress.replace(/:/g, '');
		},
		// uses natural sort hex compare
		type: "numeric"
	});

})(jQuery);
