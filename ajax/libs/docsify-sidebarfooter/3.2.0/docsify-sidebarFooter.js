/*! docsify-sidebarFooter.js v3.2.0 | (c) Mark Battistella */
'use strict';

function getFooter( footerOptions ) {

	// if it is empty
	if(
		!footerOptions.name      ||
		!footerOptions.copyYear
	) {
		return 'No config set'
	}

	// get this year
	let date = new Date().getFullYear();

	// create the array variables
	let name		= footerOptions.name ?
									footerOptions.name : null;
	let url			= footerOptions.url ?
									footerOptions.url : null;
	let copyYear	= footerOptions.copyYear ?
									footerOptions.copyYear : date;
    let policy		= footerOptions.policy ?
									footerOptions.policy : null;
	let terms		= footerOptions.terms ?
									footerOptions.terms : null;
	let cookies		= footerOptions.cookies ?
									footerOptions.cookies : null;

	// build the array
	var outputArray = [ name, url, copyYear, policy, terms, cookies ];

	return outputArray;
}

// defaults - and setup
const footerOptions = {
	name:		'', // required
	url:		'', // optional
	copyYear:	'', // required
	policy:		'', // optional
	terms:		'', // optional
	cookies:	''  // optional
};


// the function
function autoFooter( hook, vm ) {

	// after initial completion
	hook.doneEach(function() {

		// get the variables from the cofig
		const	footerOptionsArray = getFooter( footerOptions ),

				// create them easier to read
				arrayName		= footerOptionsArray[0],
				arrayUrl		= footerOptionsArray[1],
				arrayCopyYear	= footerOptionsArray[2],
				arrayPolicy		= footerOptionsArray[3],
				arrayTerms		= footerOptionsArray[4],
				arrayCookies	= footerOptionsArray[5];


		//
		// MARK: - set the scope of the autoFooter
		//

		// set the scope
		const contentScope = document.getElementById("mb-footer");

		// if the scope is empty
		if( !contentScope ) {
			return;
		}

		// if the array doesnt have the minimum entries
		if( footerOptionsArray === "No config set" ) {
			return;
		}


		//
		// MARK: - add the info
		//

			// get the date
		var date = new Date().getFullYear(),

			// url building
			baseUrl = window.location.origin + window.location.pathname + "#/",

			// divider
			a = "<hr/>",

			// create the footer
			b = "<div style='font-size:70%;'>",

				// copyright data
				c = "<div>",

					d = "&copy; ",

					// get the start copy year
					// --> if is empty OR greater than current year
					e = ( (arrayCopyYear == null) || (arrayCopyYear > date) ? date : arrayCopyYear ),

					// get the current year
					// --> do we add the "-YYYY" range or not
					f = ( (arrayCopyYear != null) && (arrayCopyYear < date) ? "&mdash;" + date : ""),

				g = "</div>",

				// company details
				h = ( arrayUrl == null ? "<div>" :
								"<a target='_blank' href='" + arrayUrl + "'>" ),

					i = arrayName,

				j = ( arrayUrl === "" ? "</div>" : "</a>" ),

				// policy details
                k = ( typeof arrayPolicy === "boolean" ||
                      typeof arrayPolicy === "string"
                    ) ?
                        ( typeof arrayPolicy === "boolean" ?
                            "<a href='" + baseUrl + "_policy'>Policy</a>"
                        :
                            "<a href='" + baseUrl + arrayPolicy + "'>Policy</a>"
                    ) : "",

                // terms details
                l = ( typeof arrayTerms === "boolean" ||
                      typeof arrayTerms === "string"
                    ) ?
                        ( typeof arrayTerms === "boolean" ?
                            "<a href='" + baseUrl + "_terms'>Terms</a>"
                        :
                            "<a href='" + baseUrl + arrayTerms + "'>Terms</a>"
                    ) : "",


				// cookies details
                m = ( typeof arrayCookies === "boolean" ||
                      typeof arrayCookies === "string"
                    ) ?
                        ( typeof arrayTerms === "boolean" ?
                            "<a href='" + baseUrl + "_cookies'>Cookies</a>"
                        :
                            "<a href='" + baseUrl + arrayCookies + "'>Cookies</a>"
                    ) : "",


			n = "</div>";



		const output =
						a +				// ------------------
						b +	c +			//
						d + e + f + 	// (c) 1990-2020
						g + 			//
						h + i + j +		// Company Name
						k +				// Policy
						l + 			// Terms
						m +				// Cookies
						n;				//

		contentScope.innerHTML = output;

	});
}


// find footer plugin options
window.$docsify.autoFooter = Object.assign(
	footerOptions,
	window.$docsify.autoFooter
);
window.$docsify.plugins = [].concat(autoFooter, window.$docsify.plugins);
