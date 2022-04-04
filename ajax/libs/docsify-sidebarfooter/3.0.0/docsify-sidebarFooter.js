/*! docsify-sidebarFooter.js v3.0.0 | (c) Mark Battistella */
'use strict';

function getFooter( footerOptions ) {

	// if it is empty
	if( !footerOptions.name	) {
		return 'No config set'
	}

	// get this year
	let date = new Date().getFullYear();

	let name		= footerOptions.name		? footerOptions.name	 : null;
	let url			= footerOptions.url			? footerOptions.url		 : null;
	let copyYear	= footerOptions.copyYear	? footerOptions.copyYear : date;
	let policy		= footerOptions.policy		? true	: false;
	let terms		= footerOptions.terms		? true	: false;

	var outputArray = [ name, url, copyYear, policy, terms ];

	return outputArray;
}

// defaults - and setup
const footerOptions = {
	name:		'',
	url:		'',
	copyYear:	'',
	policy:		'',
	terms:		''
};


// the function
function autoFooter( hook, vm ) {

	// after initial completion
	hook.doneEach(function() {

		// get the variables from the cofig
		const	footerOptionsArray = getFooter( footerOptions ),

				// create them easier to read
				aName		= footerOptionsArray[0],
				aUrl		= footerOptionsArray[1],
				aCopyYear	= footerOptionsArray[2],
				aPolicy		= footerOptionsArray[3],
				aTerms		= footerOptionsArray[4];

		//
		// MARK: - set the scope of the autoFooter
		//

		// set the scope
		const contentScope = document.getElementById("mb-footer");

		// if the scope is empty
		if( !contentScope ) {
			return;
		}

		// if the array is empty
		if( footerOptionsArray === "No config set" ) {
			return;
		}

		//
		// MARK: - add the info
		//



		var date = new Date().getFullYear(),


			a = "<hr/>",

			b = "<div style=\"font-size:70%;\">",

				// copyright data
				c = "<div>",

					d = "&copy; ",
					z = ( (aCopyYear == null) || (aCopyYear > date) ? date : aCopyYear ),

					y = ( (aCopyYear != null) && (aCopyYear < date) ? "&mdash;" + date : ""),

				f = "</div>",

				// company details
				g = ( aUrl == null ? "<div>" :
								"<a target='_blank' href='" + aUrl + "'>" ),

					h = aName,

				i = ( aUrl === "" ? "</div>" : "</a>" ),

				// policy details
				j = ( aPolicy ? "<a href='/#/_policy'>Policy</a>" : ""),

				// terms details
				m = ( aTerms ? "<a href='/#/_terms'>Terms</a>" : "" ),

			p = "</div>";



		const output = a+b+c+d+z+y+f+g+h+i+j+m+p;

		contentScope.innerHTML = output;

	});
}


// find footer plugin options
window.$docsify.autoFooter = Object.assign(
	footerOptions,
	window.$docsify.autoFooter
);
window.$docsify.plugins = [].concat(autoFooter, window.$docsify.plugins);
