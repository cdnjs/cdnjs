/*! docsify-sidebarFooter.js v4.0.0 | (c) Mark Battistella */
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
	let onBody		= footerOptions.onBody ?
									footerOptions.onBody : false;

	// build the array
	var outputArray = [
		name,
		url,
		copyYear,
		policy,
		terms,
		cookies,
		onBody
	];

	return outputArray;
}

// defaults - and setup
const footerOptions = {
	name:		'',    // required
	url:		'',    // optional
	copyYear:	'',    // required
	policy:		false, // optional
	terms:		false, // optional
	cookies:	false, // optional
	onBody:		false  // optional
};


// the function
function autoFooter( hook, vm ) {

	// get the variables from the cofig
	const	footerOptionsArray = getFooter( footerOptions ),

			// create them easier to read
			arrayName		= footerOptionsArray[0],
			arrayUrl		= footerOptionsArray[1],
			arrayCopyYear	= footerOptionsArray[2],
			arrayPolicy		= footerOptionsArray[3],
			arrayTerms		= footerOptionsArray[4],
			arrayCookies	= footerOptionsArray[5],
			arraySidebar	= footerOptionsArray[6];

	// when script starts running
	hook.init(function() {



		function rgb2hex( rgb ) {
		    rgb = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/);
		    function hex(x) {
		        return ("0" + parseInt(x).toString(16)).slice(-2);
		    }
		    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
		}



		// detect if we have a light or dark text
		// -- https://stackoverflow.com/a/35970186/1086990
		function invertColor( hex, bw ) {
			if (hex.indexOf('#') === 0) {
				hex = hex.slice(1);
			}

			// convert 3-digit hex to 6-digits.
			if( hex.length === 3 ) {
				hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
			}

			// no background colour: default white
			if( hex.length === 0 ) {
				hex = "FFFFFF"
			}

			// not HEX or greater than 6 chars
    		if( hex.length !== 6 ) {

				hex = rgb2hex( hex );


				// throw new Error('Invalid HEX color.');
			}

			// get the RGB values
    		var r = parseInt(hex.slice(0, 2), 16),
        		g = parseInt(hex.slice(2, 4), 16),
        		b = parseInt(hex.slice(4, 6), 16);

			//
			if( bw ) {
        		return (r * 0.299 + g * 0.587 + b * 0.114) > 186
            		? '#000000'
            		: '#FFFFFF';
    		}

			const zeros = new Array(2).join('0');

    		// invert color components
			r = (zeros + (( 255 - r ).toString(16))).slice(-2),
			g = (zeros + (( 255 - g ).toString(16))).slice(-2),
			b = (zeros + (( 255 - b ).toString(16))).slice(-2);


    		// pad each with zeros and return
			return "#" + r + g + b;
		}


		// add in the style
		if( typeof arraySidebar === "boolean" && arraySidebar ) {

			// create the variables
			const	head	= document.querySelector( "head" ),
					sheet	= document.createElement( "style" ),

					// body background and inverse
					bodyBG	= (document.body.style.backgroundColor === "" ? "#FFF" : document.body.style.backgroundColor ),
					bodyIBG	= invertColor( bodyBG, true ),

					// styling
					style 	 = "#mb-footer { position: fixed; bottom: 0; left: 50%; border-radius: 10em 10em 0 0; max-width: var(--content-max-width, 800px); width: 100%; padding: 0 45px; text-align: center; box-shadow: 0 -1em 1em 0 rgba(0,0,0,0.05); transform: translateX(-50%); background: " + bodyBG + "; line-height: 2em; } #mb-footer, #mb-footer a { color: " + bodyIBG + "; } #mb-footer > div > div, #mb-footer > div a { display: inline-block; margin-right: 1em; } @media( max-width: 430px ){ #mb-footer { position: relative; left: auto; transform: none; } #mb-footer span { display: inline-block; } }";

			// add to the page
			head.appendChild( sheet );
			sheet.appendChild( document.createTextNode( style ) );
		}
	});


	// after initial completion
	hook.doneEach(function() {

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
		const date = new Date().getFullYear(),

			// url building
			baseUrl = window.location.origin + window.location.pathname + "#/",

			// divider
			a = ( (typeof arraySidebar === "boolean" && arraySidebar) ? "" : "<hr/>"),

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


		// output them to the body
		const output =
						a +				// ------------------
						b +	c +			//
						d + e + f + 	// (c) 1990-2020
						g + 			//
						h + i + j +		// Company Name
						"<span>" +
						k +				// Policy
						l + 			// Terms
						m +				// Cookies
						"</span>" +
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
