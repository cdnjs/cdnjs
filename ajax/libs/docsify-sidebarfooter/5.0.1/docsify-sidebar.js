/*! docsify-sidebarFooter.js v5.0.1 | (c) Mark Battistella */
'use strict';

// MARK: - check if object exists and is not empty
function doesObjectExists(obj) {
	return (
		obj !== undefined &&
		obj !== null &&
		obj.constructor === Object &&
		Object.keys(obj).length > 0
	);
}


// MARK: - update the `options` object
function getFooter(options) {

	// -- get this year
	let date = new Date().getFullYear();

	// -- update the variables
	options.name ? options.name : null;
	options.url ? options.url : null;
	options.copyYear ? options.copyYear : date;
	options.policy ? options.policy : false;
	options.terms ? options.terms : false;
	options.cookies ? options.cookies : false;
	options.customStyle ? options.customStyle : false;
}


// defaults - and setup
const options = {
	name:        '',
	url:         '',
	copyYear:    '',
	policy:      true,
	terms:       true,
	cookies:     true,
	customStyle: false
};


// -- run the function
function autoFooter(hook, vm) {

	// MARK: run with docsify init
	hook.init(function () {

		// -- initialise the options
		getFooter(options);


		// -- check the options for bool or string
		if (typeof options.customStyle === "boolean" || typeof options.customStyle === "string") {

			// -- dont continue if using custom styles
			if ((typeof options.customStyle === "boolean" && options.customStyle === true)) {
				return;
			}

			// -- global style
			let style = `#mb-footer { border-top: 1px solid; font-size: 0.8em; line-height: 1.5; transition: all var(--sidebar-transition-duration) ease-out; }`;

			// -- custom style for sidebar
			if ((typeof options.customStyle === "boolean" && options.customStyle === false) ||
				(options.customStyle === "sidebar")
			) {
				style += `#mb-footer { padding-top: 1.5rem; margin-top: 1.5rem; } #mb-footer .footer-text, #mb-footer .footer-text a { font-weight: bold; }`;
			}

			// -- custom style for sidebar
			if (options.customStyle === "body") {
				
				// --> if there is a sidebar
				if( $docsify.loadSidebar || $docsify.loadSidebar === null || !$docsify.hideSidebar ) {
					style += `body #mb-footer { margin-left: var(--sidebar-width); } body.close #mb-footer { margin-left: 0; }`;
				}

				// --> standard
				style += `#mb-footer { padding: 1.5rem; } #mb-footer .footer-container { max-width: var(--content-max-width); margin: 0 auto; } #mb-footer .footer-container { display: grid; grid-template-columns: auto auto; } #mb-footer .footer-container a { margin-left: 2em; } #mb-footer .footer-link { text-align: right; }`;

				// --> media queries
				style += `@media (max-width: 680px) { #mb-footer .footer-container { grid-template-columns: auto; }#mb-footer .footer-text, #mb-footer .footer-link { text-align: center; } } @media (max-width: 400px) { #mb-footer .footer-text, #mb-footer .footer-link { text-align: left; } #mb-footer span { display: block; } #mb-footer .footer-container a { margin: 0; } }`;
			}

			// create the variables
			const head = document.querySelector("head"),
				  sheet = document.createElement("style");

			// add to the page
			head.appendChild(sheet);
			sheet.appendChild(document.createTextNode(style));
		}
	});


	// MARK: after the HTML appended to DOM
	hook.doneEach(function () {

		// set the scope
		const contentScope = document.getElementById("mb-footer");

		// if the scope is empty
		if (!contentScope) { return; }

		//
		// MARK: - add the info
		//

		// get the date
		const date = new Date().getFullYear(),

			// -- url building
			baseUrl = window.location.origin + window.location.pathname + "#/",

			// -- check if link is internal or external
			isExternalLink = (url) => {
				const tmp = document.createElement('a');
				tmp.href = url;
				return tmp.host !== window.location.host;
			},

			// -- link generator
			createLink = (option, linkText, defaultLink, className) => {
				let result = "";

				// --> only accept bool and string
				if (typeof option === "boolean" || typeof option === "string") {

					// --> if bool, and true
					if (typeof option === "boolean" && option) {

						// --> use the default options
						result = `<a href="${baseUrl + defaultLink}">${linkText}</a>`;

						// --> if it is a string url
					} else if (typeof option === "string") {

						// --> is the link external
						result = isExternalLink(option)

							// --> if external, add the _blank
							? `<a target="_blank" href="${option}">${linkText}</a>`

							// --> if internal, then add the page name
							: `<a href="${baseUrl + option}">${linkText}</a>`;
					}
				}

				// --> if the result is not empty
				if (result) {

					// --> create the class name
					const classname = `${className.toLowerCase().replace(/\s+/g, '-')}`;

					// -- compile the elements
					result = `<span class="${classname}">${result}</span>`;
				}

				return result;
			},

			// MARK: - html elements

			divclose = `</div>`,

			// -- divs
			div1open = `<div class="footer-container">`,
			div2open = `<div class="footer-text">`,
			div3open = `<div class="footer-link">`,

			// -- text
			copyright = (
				`<span class="footer-text-copyright">Copyright &copy; ${
					options.copyYear && options.copyYear <= date
						? `${options.copyYear}${options.copyYear < date ? "&#45;" + date : ""}`
						: date
				}</span>`
			),
			author = createLink( options.url, options.name, '', 'footer-text-author'),

			// -- links
			policyURL = createLink(options.policy, 'Policy', '_policy', 'footer-links-policy'),
			termsURL = createLink(options.terms, 'Terms', '_terms', 'footer-links-terms' ),
			cookiesURL = createLink(options.cookies, 'Cookies', '_cookies', 'footer-links-cookies'),

			// output
			output = (
				div1open +
					div2open + copyright + author +	divclose +
					div3open + policyURL + termsURL + cookiesURL + divclose +
				divclose
			);

		contentScope.innerHTML = output;
	});
}


// MARK: - check options is defined and not empty
if (typeof options !== 'undefined' && doesObjectExists(options)) {

	// -- find footer plugin options
	window.$docsify.autoFooter = Object.assign(
		options,
		window.$docsify.autoFooter
	);
	window.$docsify.plugins = [].concat(autoFooter, window.$docsify.plugins);

} else {

	// -- log the error
	console.error(
		"ERROR: sidebar-footer configuration not set" + "\n" +
		"This error appears when:" + "\n" +
		"  - the `autoSidebar` not found index.html file" + "\n" +
		"  - the `autoSidebar` is empty"
	);
}