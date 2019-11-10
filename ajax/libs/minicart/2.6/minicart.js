/*!
 * MiniCart
 *
 * @author Jeff Harrell <https://github.com/jeffharrell/>
 * @license MIT <https://github.com/jeffharrell/MiniCart/blob/master/LICENSE>
 */
if (typeof PAYPAL === 'undefined' || !PAYPAL) {
	var PAYPAL = {};
}

PAYPAL.apps = PAYPAL.apps || {};


(function () {
	'use strict';

	/**
	 * Default configuration
	 */
	var config = {
		/**
		 * The parent element the cart should "pin" to
		 */
		parent: document.body,

		/**
		 * Edge of the window to pin the cart to
		 */
		displayEdge: 'right',

		/**
		 * Distance from the edge of the window
		 */
		edgeDistance: '50px',

		/**
		 * HTML target property for the checkout form
		 */
		formTarget: null,

		/**
		 * The base path of your website to set the cookie to
		 */
		cookiePath: '/',

		/**
		 * The number of days to keep the cart data
		 */
		cartDuration: 30,

		/**
		 * Strings used for display text
		 */
		strings: {
			button: 'Checkout',
			subtotal: 'Subtotal: ',
			discount: 'Discount: ',
			shipping: 'does not include shipping &amp; tax',
			processing: 'Processing...'
		},

		/**
		 * Unique ID used on the wrapper element
		 */
		name: 'PPMiniCart',

		/**
		 * Boolean to determine if the cart should "peek" when it's hidden with items
		 */
		peekEnabled: true,

		/**
		 * The URL of the PayPal website
		 */
		paypalURL: 'https://www.paypal.com/cgi-bin/webscr',

		/**
		 * The base URL to the visual assets
		 */
		assetURL: 'http://www.minicartjs.com/build/',

		events: {
			/**
			 * Custom event fired before the cart is rendered
			 */
			onRender: null,

			/**
			 * Custom event fired after the cart is rendered
			 */
			afterRender: null,

			/**
			 * Custom event fired before the cart is hidden
			 *
			 * @param e {event} The triggering event
			 */
			onHide: null,

			/**
			 * Custom event fired after the cart is hidden
			 *
			 * @param e {event} The triggering event
			 */
			afterHide: null,

			/**
			 * Custom event fired before the cart is shown
			 *
			 * @param e {event} The triggering event
			 */
			onShow: null,

			/**
			 * Custom event fired after the cart is shown
			 *
			 * @param e {event} The triggering event
			 */
			afterShow: null,

			/**
			 * Custom event fired before a product is added to the cart
			 *
			 * @param data {object} Product object
			 */
			onAddToCart: null,

			/**
			 * Custom event fired after a product is added to the cart
			 *
			 * @param data {object} Product object
			 */
			afterAddToCart: null,

			/**
			 * Custom event fired before a product is removed from the cart
			 *
			 * @param data {object} Product object
			 */
			onRemoveFromCart: null,

			/**
			 * Custom event fired after a product is removed from the cart
			 *
			 * @param data {object} Product object
			 */
			afterRemoveFromCart: null,

			/**
			 * Custom event fired before the checkout action takes place
			 *
			 * @param e {event} The triggering event
			 */
			onCheckout: null,

			/**
			 * Custom event fired before the cart is reset
			 */
			onReset: null,

			/**
			 * Custom event fired after the cart is reset
			 */
			afterReset: null
		}
	};


	if (!PAYPAL.apps.MiniCart) {

		/**
		 * Mini Cart application
		 */
		PAYPAL.apps.MiniCart = (function () {

			var minicart = {},
				isShowing = false,
				isRendered = false;


			/** PRIVATE **/

			/**
			 * PayPal form cmd values which are supported
			 */
			var SUPPORTED_CMDS = { _cart: true, _xclick: true };


			/**
			 * The form origin that is passed to PayPal
			 */
			var BN_VALUE = 'MiniCart_AddToCart_WPS_US';


			/**
			 * Regex filter for cart settings, which appear only once in a cart
			 */
			var SETTING_FILTER = /^(?:business|currency_code|lc|paymentaction|no_shipping|cn|no_note|invoice|handling_cart|weight_cart|weight_unit|tax_cart|page_style|image_url|cpp_|cs|cbt|return|cancel_return|notify_url|rm|custom|charset)/;


			/**
			 * Adds the cart's CSS to the page in a <style> element.
			 * The CSS lives in this file so that it can leverage properties from the config
			 * and doesn't require an additional download. To override the CSS see the FAQ.
			 */
			var _addCSS = function () {
				var name = config.name,
					css = [],
					style, head;

				css.push('#' + name + ' form { position:fixed; float:none; top:-250px; ' + config.displayEdge + ':' + config.edgeDistance + '; width:265px; margin:0; padding:50px 10px 0; min-height:170px; background:#fff url(' + config.assetURL + 'images/minicart_sprite.png) no-repeat -125px -60px; border:1px solid #999; border-top:0; font:13px/normal arial, helvetica; color:#333; text-align:left; -moz-border-radius:0 0 8px 8px; -webkit-border-radius:0 0 8px 8px; border-radius:0 0 8px 8px; -moz-box-shadow:1px 1px 1px rgba(0, 0, 0, 0.1); -webkit-box-shadow:1px 1px 1px rgba(0, 0, 0, 0.1); box-shadow:1px 1px 1px rgba(0, 0, 0, 0.1); } ');
				css.push('#' + name + ' ul { position:relative; overflow-x:hidden; overflow-y:auto; height:130px; margin:0 0 7px; padding:0; list-style-type:none; border-top:1px solid #ccc; border-bottom:1px solid #ccc; } ');
				css.push('#' + name + ' li { position:relative; margin:-1px 0 0; padding:6px 5px 6px 0; border-top:1px solid #f2f2f2; } ');
				css.push('#' + name + ' li a { display: block; width: 155px; color:#333; text-decoration:none; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; } ');
				css.push('#' + name + ' li a span { color:#999; font-size:10px; } ');
				css.push('#' + name + ' li .quantity { position:absolute; top:.5em; right:78px; width:22px; padding:1px; border:1px solid #83a8cc; text-align:right; } ');
				css.push('#' + name + ' li .price { position:absolute; top:.5em; right:4px; } ');
				css.push('#' + name + ' li .remove { position:absolute; top:9px; right:60px; width:14px; height:14px; background:url(' + config.assetURL + 'images/minicart_sprite.png) no-repeat -134px -4px; border:0; cursor:pointer; } ');
				css.push('#' + name + ' p { margin:0; padding:0 0 0 20px; background:url(' + config.assetURL + 'images/minicart_sprite.png) no-repeat; font-size:13px; font-weight:bold; } ');
				css.push('#' + name + ' p:hover { cursor:pointer; } ');
				css.push('#' + name + ' p input { float:right; margin:4px 0 0; padding:1px 4px; text-decoration:none; font-weight:normal; color:#333; background:#ffa822 url(' + config.assetURL + 'images/minicart_sprite.png) repeat-x left center; border:1px solid #d5bd98; border-right-color:#935e0d; border-bottom-color:#935e0d; -moz-border-radius:2px; -webkit-border-radius:2px; border-radius:2px; } ');
				css.push('#' + name + ' p .shipping { display:block; font-size:10px; font-weight:normal; color:#999; } ');

				style = document.createElement('style');
				style.type = 'text/css';

				if (style.styleSheet) {
					style.styleSheet.cssText = css.join('');
				} else {
					style.appendChild(document.createTextNode(css.join('')));
				}

				head = document.getElementsByTagName('head')[0];
				head.appendChild(style);
			};


			/**
			 * Builds the DOM elements required by the cart
			 */
			var _buildDOM = function () {
				var UI = minicart.UI,
					cmd, type, bn, parent, version;

				UI.wrapper = document.createElement('div');
				UI.wrapper.id = config.name;

				cmd = document.createElement('input');
				cmd.type = 'hidden';
				cmd.name = 'cmd';
				cmd.value = '_cart';

				type = cmd.cloneNode(false);
				type.name = 'upload';
				type.value = '1';

				bn = cmd.cloneNode(false);
				bn.name = 'bn';
				bn.value = BN_VALUE;

				UI.cart = document.createElement('form');
				UI.cart.method = 'post';
				UI.cart.action = config.paypalURL;

				if (config.formTarget) {
					UI.cart.target = config.formTarget;
				}

				UI.cart.appendChild(cmd);
				UI.cart.appendChild(type);
				UI.cart.appendChild(bn);
				UI.wrapper.appendChild(UI.cart);

				UI.itemList = document.createElement('ul');
				UI.cart.appendChild(UI.itemList);

				UI.summary = document.createElement('p');
				UI.cart.appendChild(UI.summary);

				UI.button = document.createElement('input');
				UI.button.type = 'submit';
				UI.button.value = config.strings.button;
				UI.summary.appendChild(UI.button);

				UI.subtotal = document.createElement('span');
				UI.subtotal.innerHTML = config.strings.subtotal;

				UI.subtotalAmount = document.createElement('span');
				UI.subtotalAmount.innerHTML = '0.00';

				UI.subtotal.appendChild(UI.subtotalAmount);
				UI.summary.appendChild(UI.subtotal);

				UI.shipping = document.createElement('span');
				UI.shipping.className = 'shipping';
				UI.shipping.innerHTML = config.strings.shipping;
				UI.summary.appendChild(UI.shipping);

				// Workaround: IE 6 and IE 7/8 in quirks mode do not support position: fixed in CSS
				if (window.attachEvent && !window.opera) {
					version = navigator.userAgent.match(/MSIE\s([^;]*)/);

					if (version) {
						version = parseFloat(version[1]);

						if (version < 7 || (version >= 7 && document.compatMode === 'BackCompat')) {
							UI.cart.style.position = 'absolute';
							UI.wrapper.style[config.displayEdge] = '0';
							UI.wrapper.style.setExpression('top', 'x = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop');
						}
					}
				}

				parent = (typeof config.parent === 'string') ? document.getElementById(config.parent) : config.parent;
				parent.appendChild(UI.wrapper);
			};


			/**
			 * Attaches the cart events to it's DOM elements
			 */
			var _bindEvents = function () {
				var ui = minicart.UI,
					forms, form, i;

				// Look for all "Cart" and "Buy Now" forms on the page and attach events
				forms = document.getElementsByTagName('form');

				for (i = 0; i < forms.length; i++) {
					form = forms[i];

					if (form.cmd && SUPPORTED_CMDS[form.cmd.value]) {
						minicart.bindForm(form);
					}
				}

				// Hide the Mini Cart for all non-cart related clicks
				$.event.add(document, 'click', function (e) {
					if (isShowing) {
						var target = e.target,
							cartEl = ui.cart;

						if (!(/input|button|select|option/i.test(target.tagName))) {
							while (target.nodeType === 1) {
								if (target === cartEl) {
									return;
								}

								target = target.parentNode;
							}

							minicart.hide(null);
						}
					}
				});

				// Run the checkout code when submitting the form
				$.event.add(ui.cart, 'submit', function (e) {
					_checkout(e);
				});

				// Show the cart when clicking on the summary
				$.event.add(ui.summary, 'click', function (e) {
					var target = e.target;

					if (target !== ui.button) {
						minicart.toggle(e);
					}
				});

				// Redraw the cart if the back/forward cache doesn't re-render
				$.event.add(window, 'pageshow', function (e) {
					if (e.persisted) {
						_redrawCartItems(true);
						minicart.hide();
					}
				});

				// Update other windows when HTML5 localStorage is updated
				if (window.attachEvent && !window.opera) {
					$.event.add(document, 'storage', function (e) {
						// IE needs a delay in order to properly see the change
						setTimeout(_redrawCartItems, 100);
					});
				} else {
					$.event.add(window, 'storage', function (e) {
						// Safari, Chrome, and Opera can filter on updated storage key
						// Firefox can't so it uses a brute force approach
						if ((e.key && e.key === config.name) || !e.key) {
							_redrawCartItems();
						}
					});
				}
			};


			/**
			 * Parses the userConfig (if applicable) and overwrites the default values
			 */
			var _parseUserConfig = function (userConfig) {
				var key;

				// TODO: This should recursively merge the config values
				for (key in userConfig) {
					if (typeof config[key] !== undefined) {
						config[key] = userConfig[key];
					}
				}
			};


			/**
			 * Loads the stored data and builds the cart
			 */
			var _parseStorage = function () {
				var data, length, i;

				if ((data = $.storage.load())) {
					length = data.length;

					for (i = 0; i < length; i++) {
						if (_renderProduct(data[i])) {
							isShowing = true;
						}
					}
				}
			};


			/**
			 * Data parser used for forms
			 *
			 * @param form {HTMLElement} An HTML form
			 * @return {object}
			 */
			var _parseForm = function (form) {
				var raw = form.elements,
					data = {},
					pair, value, i, len;

				for (i = 0, len = raw.length; i < len; i++) {
					pair = raw[i];

					if ((value = $.util.getInputValue(pair))) {
						data[pair.name] = value;
					}
				}

				return data;
			};


			/**
			 * Massage's a object's data in preparation for adding it to the user's cart
			 *
			 * @param data {object} An object of WPS xclick style data to add to the cart. The format is { product: '', settings: '' }.
			 * @return {object}
			 */
			var _parseData = function (data) {
				var product = {},
					settings = {},
					existing, option_index, key, len, match, i, j;

				// Parse the data into a two categories: product and settings
				for (key in data) {
					if (SETTING_FILTER.test(key)) {
						settings[key] = data[key];
					} else {
						product[key] = data[key];
					}
				}

				// Check the products to see if this variation already exists
				// If it does then reuse the same object
				for (i = 0, len = minicart.products.length; i < len; i++) {
					existing = minicart.products[i].product;

					// Do the product name and number match
					if (product.item_name === existing.item_name && product.item_number === existing.item_number) {
						// Products are a match so far; Now do all of the products options match?
						match = true;
						j = 0;

						while (existing['os' + j]) {
							if (product['os' + j] !== existing['os' + j]) {
								match = false;
								break;
							}

							j++;
						}

						if (match) {
							product.offset = existing.offset;
							break;
						}
					}
				}

				// Normalize the values
				product.href = product.href || window.location.href;
				product.quantity = product.quantity || 1;
				product.amount = product.amount || 0;

				// Add Mini Cart specific settings
				if (settings['return'] && settings['return'].indexOf('#') === -1) {
					settings['return'] += '#' + config.name + '=reset';
				}

				// Add option amounts to the total amount
				option_index = (product.option_index) ? product.option_index : 0;

				while (product['os' + option_index]) {
					i = 0;

					while (typeof product['option_select' + i] !== 'undefined') {
						if (product['option_select' + i] === product['os' + option_index]) {
							product.amount = product.amount + parseFloat(product['option_amount' + i]);
							break;
						}

						i++;
					}

					option_index++;
				}

				return {
					product: product,
					settings: settings
				};
			};


			/**
			 * Resets the cart and renders the products
			 */
			var _redrawCartItems = function (silent) {
				minicart.products = [];
				minicart.UI.itemList.innerHTML = '';
				minicart.UI.subtotalAmount.innerHTML = '';
				minicart.UI.button.value = config.strings.button;

				_parseStorage();
				minicart.updateSubtotal(silent);
			};


			/**
			 * Renders the product in the cart
			 *
			 * @param data {object} The data for the product
			 */
			var _renderProduct = function (data) {
				var ui = minicart.UI,
					cartEl = ui.cart,
					product = new ProductNode(data, minicart.UI.itemList.children.length + 1),
					offset = data.product.offset,
					keyupTimer, hiddenInput, key;

				minicart.products[offset] = product;

				// Add hidden settings data to parent form
				for (key in data.settings) {
					if (cartEl.elements[key]) {
						if (cartEl.elements[key].value) {
							cartEl.elements[key].value = data.settings[key];
						} else {
							cartEl.elements[key] = data.settings[key];
						}
					} else {
						hiddenInput = document.createElement('input');
						hiddenInput.type = 'hidden';
						hiddenInput.name = key;
						hiddenInput.value = data.settings[key];

						cartEl.appendChild(hiddenInput);
					}
				}

				// if the product has no name or number then don't add it
				if (product.isPlaceholder) {
					return false;
				// otherwise, setup the new element
				} else {
					// Click event for "x"
					$.event.add(product.removeInput, 'click', function () {
						_removeProduct(product, offset);
					});

					// Event for changing quantities
					var currentValue = product.quantityInput.value;

					$.event.add(product.quantityInput, 'keyup', function () {
						var that = this;

						keyupTimer = setTimeout(function () {
							var value = parseInt(that.value, 10);

							if (!isNaN(value) && value !== currentValue) {
								currentValue = value;

								product.setQuantity(value);

								// Delete the product
								if (!product.getQuantity()) {
									_removeProduct(product, offset);
								}

								minicart.updateSubtotal();
								$.storage.save(minicart.products);
							}
						}, 250);
					});

					// Add the item and fade it in
					ui.itemList.insertBefore(product.liNode, ui.itemList.firstChild);
					$.util.animate(product.liNode, 'opacity', { from: 0, to: 1 });

					return true;
				}
			};


			/**
			 * Removes a product from the cart
			 *
			 * @param product {ProductNode} The product object
			 * @param offset {Number} The offset for the product in the cart
			 */
			var _removeProduct = function (product, offset) {
				var events = config.events,
					onRemoveFromCart = events.onRemoveFromCart,
					afterRemoveFromCart = events.afterRemoveFromCart;

				if (typeof onRemoveFromCart === 'function') {
					if (onRemoveFromCart.call(minicart, product) === false) {
						return;
					}
				}

				product.setQuantity(0);
				product.quantityInput.style.display = 'none';

				$.util.animate(product.liNode, 'opacity', { from: 1, to: 0 }, function () {
					$.util.animate(product.liNode, 'height', { from: 18, to: 0 }, function () {
						try {
							product.liNode.parentNode.removeChild(product.liNode);
						} catch (e) {
							// fail
						}

						// regenerate the form element indexes
						var products = minicart.UI.cart.getElementsByTagName('li'),
							products_len = products.length,
							inputs,
							inputs_len,
							input,
							matches,
							i, j, k = 1;

						for (i = 0 ; i < products_len; i++) {
							inputs = products[i].getElementsByTagName('input');
							inputs_len = inputs.length;

							for (j = 0; j < inputs_len; j++) {
								input = inputs[j];
								matches = /(.+)_[0-9]+$/.exec(input.name);

								if (matches && matches[1]) {
									input.name = matches[1] + '_' + k;
								}
							}

							k++;
						}

						if (typeof afterRemoveFromCart === 'function') {
							afterRemoveFromCart.call(minicart, product);
						}
					});
				});

				minicart.products[offset].product.item_name = '';
				minicart.products[offset].product.item_number = '';

				minicart.updateSubtotal();
				$.storage.save(minicart.products, config.cartDuration);
			};


			/**
			 * Event when the cart form is submitted
			 *
			 * @param e {event} The form submission event
			 */
			var _checkout = function (e) {
				var onCheckout = config.events.onCheckout;

				if (typeof onCheckout === 'function') {
					if (onCheckout.call(minicart, e) === false) {
						e.preventDefault();
						return;
					}
				}

				minicart.UI.button.value = config.strings.processing;
			};


			/** PUBLIC **/


			/**
			 * Array of ProductNode
			 */
			minicart.products = [];


			/**
			 * Container for UI elements
			 */
			minicart.UI = {};


			/**
			 * Renders the cart, creates the configuration and loads the data
			 *
			 * @param userConfig {object} User settings which override the default configuration
			 */
			minicart.render = function (userConfig) {
				var events, onRender, afterRender, hash, cmd;

				// Overwrite default configuration with user settings
				_parseUserConfig(userConfig);

				events = config.events;
				onRender = events.onRender;
				afterRender = events.afterRender;

				if (typeof onRender === 'function') {
					if (onRender.call(minicart) === false) {
						return;
					}
				}

				if (!isRendered) {
					// Render the cart UI
					_addCSS();
					_buildDOM();
					_bindEvents();

					// Check if a transaction was completed
					// The "return" form param is modified to contain a hash value
					// with "PPMiniCart=reset". If this is seen then it's assumed
					// that a transaction was completed and we should reset the cart.
					hash = location.hash.substring(1);

					if (hash.indexOf(config.name + '=') === 0) {
						cmd = hash.split('=')[1];

						if (cmd === 'reset') {
							minicart.reset();
							location.hash = '';
						}
					}
				}

				// Process any stored data and render it
				// TODO: _parseStorage shouldn't be so tightly coupled here and one
				// should be able to redraw without re-parsing the storage
				_redrawCartItems(true);

				// Trigger the cart to peek on first load if any products were loaded
				if (!isRendered) {
					if (isShowing) {
						setTimeout(function () {
							minicart.hide(null);
						}, 500);
					} else {
						$.storage.remove();
					}
				}

				isRendered = true;

				if (typeof afterRender === 'function') {
					afterRender.call(minicart);
				}
			};


			/**
			 * Binds a form to the Mini Cart
			 *
			 * @param form {HTMLElement} The form element to bind
			 */
			minicart.bindForm = function (form) {
				if (form.add) {
					$.event.add(form, 'submit', function (e) {
						e.preventDefault(e);

						var data = _parseForm(e.target);
						minicart.addToCart(data);
					});
				} else if (form.display) {
					$.event.add(form, 'submit', function (e) {
						e.preventDefault();
						minicart.show(e);
					});
				} else {
					return false;
				}

				return true;
			};

			/**
			 * Adds a product to the cart
			 *
			 * @param data {object} Product object. See _parseData for format
			 * @return {boolean} True if the product was added, false otherwise
			 */
			minicart.addToCart = function (data) {
				var events = config.events,
					onAddToCart = events.onAddToCart,
					afterAddToCart = events.afterAddToCart,
					success = false,
					productNode, offset;

				data = _parseData(data);
				offset = data.product.offset;

				if (typeof onAddToCart === 'function') {
					if (onAddToCart.call(minicart, data.product) === false) {
						return;
					}
				}

				// Check if the product has already been added; update if so
				if ((productNode = this.getProductAtOffset(offset))) {
					productNode.product.quantity += parseInt(data.product.quantity || 1, 10);
					productNode.setPrice(data.product.amount * productNode.product.quantity);
					productNode.setQuantity(productNode.product.quantity);

					success = true;
				// Add a new DOM element for the product
				} else {
					data.product.offset = minicart.products.length;
					success = _renderProduct(data);
				}

				minicart.updateSubtotal();
				minicart.show(null);

				$.storage.save(minicart.products, config.cartDuration);

				if (typeof afterAddToCart === 'function') {
					afterAddToCart.call(minicart, data);
				}

				return success;
			};


			/**
			 * Returns a product from the Mini Cart's interal storage
			 *
			 * @param offset {number} The offset of the product
			 * @return {ProductNode}
			 */
			minicart.getProductAtOffset = function (offset) {
				return (typeof offset !== 'undefined' && this.products[offset]);
			};


			/**
			 * Iterates over each product and calculates the subtotal
			 *
			 * @return {number} The subtotal
			 */
			minicart.calculateSubtotal = function () {
				var amount = 0,
					products = minicart.products,
					product, item, price, discount, len, i;

				for (i = 0, len = products.length; i < len; i++) {
					item = products[i];

					if ((product = item.product)) {
						if (product.quantity && product.amount) {
							price = product.amount;
							discount = item.getDiscount();

							amount += parseFloat((price * product.quantity) - discount);
						}
					}
				}

				return amount.toFixed(2);
			};


			/**
			 * Updates the UI with the current subtotal and currency code
			 */
			minicart.updateSubtotal = function (silent) {
				var ui = minicart.UI,
					cartEl = ui.cart.elements,
					subtotalEl = ui.subtotalAmount,
					subtotal = minicart.calculateSubtotal(),
					level = 1,
					currency_code, currency_symbol, hex, len, i;

				// Get the currency
				currency_code = '';
				currency_symbol = '';

				if (cartEl.currency_code) {
					currency_code = cartEl.currency_code.value || cartEl.currency_code;
				} else {
					for (i = 0, len = cartEl.length; i < len; i++) {
						if (cartEl[i].name === 'currency_code') {
							currency_code = cartEl[i].value || cartEl[i];
							break;
						}
					}
				}

				// Update the UI
				subtotalEl.innerHTML = $.util.formatCurrency(subtotal, currency_code);

				// Yellow fade on update
				if (!silent) {
					(function doFade() {
						hex = level.toString(16);
						level++;

						subtotalEl.style.backgroundColor = '#ff' + hex;

						if (level >= 15) {
							subtotalEl.style.backgroundColor = 'transparent';

							// hide the cart if there's no total
							if (subtotal === '0.00') {
								minicart.reset();
							}

							return;
						}

						setTimeout(doFade, 30);
					})();
				}
			};


			/**
			 * Shows the cart
			 *
			 * @param e {event} The triggering event
			 */
			minicart.show = function (e) {
				var from = parseInt(minicart.UI.cart.offsetTop, 10),
					to = 0,
					events = config.events,
					onShow = events.onShow,
					afterShow = events.afterShow;

				if (e && e.preventDefault) { e.preventDefault(); }

				if (typeof onShow === 'function') {
					if (onShow.call(minicart, e) === false) {
						return;
					}
				}

				$.util.animate(minicart.UI.cart, 'top', { from: from, to: to }, function () {
					if (typeof afterShow === 'function') {
						afterShow.call(minicart, e);
					}
				});

				minicart.UI.summary.style.backgroundPosition = '-195px 2px';
				isShowing = true;
			};


			/**
			 * Hides the cart off the screen
			 *
			 * @param e {event} The triggering event
			 * @param fully {boolean} Should the cart be fully hidden? Optional. Defaults to false.
			 */
			minicart.hide = function (e, fully) {
				var ui = minicart.UI,
					cartEl = ui.cart,
					summaryEl = ui.summary,
					cartHeight = (cartEl.offsetHeight) ? cartEl.offsetHeight : document.defaultView.getComputedStyle(cartEl, '').getPropertyValue('height'),
					summaryHeight = (summaryEl.offsetHeight) ? summaryEl.offsetHeight : document.defaultView.getComputedStyle(summaryEl, '').getPropertyValue('height'),
					from = parseInt(cartEl.offsetTop, 10),
					events = config.events,
					onHide = events.onHide,
					afterHide = events.afterHide,
					to;

				// make the cart fully hidden
				if (fully || minicart.products.length === 0 || !config.peekEnabled) {
					to = cartHeight * -1;
				// otherwise only show a little teaser portion of it
				} else {
					to = (cartHeight - summaryHeight - 8) * -1;
				}

				if (e && e.preventDefault) { e.preventDefault(); }

				if (typeof onHide === 'function') {
					if (onHide.call(minicart, e) === false) {
						return;
					}
				}

				$.util.animate(cartEl, 'top', { from: from, to: to }, function () {
					if (typeof afterHide === 'function') {
						afterHide.call(minicart, e);
					}
				});

				summaryEl.style.backgroundPosition = '-195px -32px';
				isShowing = false;
			};


			/**
			 * Toggles the display of the cart
			 *
			 * @param e {event} The triggering event
			 */
			minicart.toggle = function (e) {
				if (isShowing) {
					minicart.hide(e);
				} else {
					minicart.show(e);
				}
			};


			/**
			 * Resets the cart to it's initial state
			 */
			minicart.reset = function () {
				var ui = minicart.UI,
					events = config.events,
					onReset = events.onReset,
					afterReset = events.afterReset;

				if (typeof onReset === 'function') {
					if (onReset.call(minicart) === false) {
						return;
					}
				}

				minicart.products = [];

				if (isShowing) {
					ui.itemList.innerHTML = '';
					ui.subtotalAmount.innerHTML = '';
					minicart.hide(null, true);
				}

				$.storage.remove();

				if (typeof afterReset === 'function') {
					afterReset.call(minicart);
				}
			};


			// Expose the object as public methods
			return minicart;
		})();



		/**
		 * An HTMLElement which displays each product
		 *
		 * @param data {object} The data for the product
		 * @param position {number} The product number
		 */
		var ProductNode = function (data, position) {
			this._view(data, position);
		};


		ProductNode.prototype = {
			/**
			 * Creates the DOM nodes and adds the product content
			 *
			 * @param data {object} The data for the product
			 * @param position {number} The product number
			 */
			_view: function (data, position) {
				var name, price, quantity, discount, options, hiddenInput, key;

				this.product = data.product;
				this.settings = data.settings;

				this.liNode = document.createElement('li');
				this.nameNode = document.createElement('a');
				this.metaNode = document.createElement('span');
				this.discountNode = document.createElement('span');
				this.discountInput = document.createElement('input');
				this.priceNode = document.createElement('span');
				this.quantityInput = document.createElement('input');
				this.removeInput = document.createElement('input');

				// Don't add blank products
				if (!this.product || (!this.product.item_name && !this.product.item_number)) {
					this.isPlaceholder = true;
					return;
				}

				// Name
				if (this.product.item_name) {
					name = this.product.item_name;
				}

				this.nameNode.innerHTML = name;
				this.nameNode.title = name;
				this.nameNode.href = this.product.href;
				this.nameNode.appendChild(this.metaNode);

				// Meta info
				if (this.product.item_number) {
					this.metaNode.innerHTML = '<br />#' + this.product.item_number;
				}

				// Options
				options = this.getOptions();

				for (key in options) {
					this.metaNode.innerHTML += '<br />' + key + ': ' + options[key];
				}

				// Discount
				discount = this.getDiscount();

				if (discount) {
					this.discountInput.type = 'hidden';
					this.discountInput.name = 'discount_amount_' + position;
					this.discountInput.value = discount;

					this.metaNode.appendChild(this.discountNode);
				}

				// Price
				price = this.getPrice();
				this.priceNode.className = 'price';

				// Quantity
				quantity = this.getQuantity();

				this.quantityInput.name = 'quantity_' + position;
				this.quantityInput.className = 'quantity';
				this.quantityInput.setAttribute('autocomplete', 'off');

				this.setQuantity(quantity);

				// Remove button
				this.removeInput.type = 'button';
				this.removeInput.className = 'remove';

				// Build out the DOM
				this.liNode.appendChild(this.nameNode);
				this.liNode.appendChild(this.quantityInput);

				if (discount) {
					this.liNode.appendChild(this.discountInput);
				}

				this.liNode.appendChild(this.removeInput);
				this.liNode.appendChild(this.priceNode);

				// Add in hidden product data
				for (key in this.product) {
					if (key !== 'quantity' && key.indexOf('discount_') === -1) {
						hiddenInput = document.createElement('input');
						hiddenInput.type = 'hidden';
						hiddenInput.name = key + '_' + position;
						hiddenInput.value = this.product[key];

						this.liNode.appendChild(hiddenInput);
					}
				}
			},


			/**
			 * Calculates the discount for a product
			 *
			 * @return {Object} An object with the discount amount or percentage
			 */
			getDiscount: function () {
				var discount = 0,
					discountNum = this.product.discount_num || -1,
					quantity;

				// Discounts: Amount-based
				if (this.product.discount_amount) {
					// Discount amount for the first item
					discount = parseFloat(this.product.discount_amount);

					// Discount amount for each additional item
					if (this.product.discount_amount2) {
						quantity = this.getQuantity();

						if (quantity > 1) {
							discount += Math.max(quantity - 1, discountNum) * parseFloat(this.product.discount_amount2);
						}
					}

				// Discounts: Percentage-based
				} else if (this.product.discount_rate) {
					// Discount amount on the first item
					discount = this.product.amount * parseFloat(this.product.discount_rate) / 100;

					// Discount amount for each additional item
					if (this.product.discount_rate2) {
						quantity = this.getQuantity();

						if (quantity > 1) {
							discount += Math.max(quantity - 1, discountNum) * this.product.amount * parseFloat(this.product.discount_amount2) / 100;
						}
					}
				}

				return discount && discount.toFixed(2);
			},


			/**
			 * Returns an object of options for the product
			 *
			 * @return {Object}
			 */
			getOptions: function () {
				var options = {},
					i = 0;

				while (typeof this.product['on' + i] !== 'undefined') {
					options[this.product['on' + i]] = this.product['os' + i];
					i++;
				}

				return options;
			},


			/**
			 * Utility function to set the quantity of this product
			 *
			 * @param value {number} The new value
			 */
			setQuantity: function (value) {
				var discount;

				value = parseInt(value, 10);
				this.product.quantity = value;

				if (this.quantityInput.value !== value) {
					this.quantityInput.value = value;

					if ((discount = this.getDiscount())) {
						this.discountInput.value = discount;

						/**
						 * Append the discount node if it doesn't already exist
						 *
						 * @author Ethan Schroeder <ethan.schroeder@gmail.com>
						 */
						if (!this.discountNode.innerHTML) {
							this.metaNode.appendChild(this.discountNode);
						}

						this.discountNode.innerHTML  = '<br />';
						this.discountNode.innerHTML += config.strings.discount;
						this.discountNode.innerHTML += $.util.formatCurrency(discount, this.settings.currency_code);
					}
				}

				this.setPrice(this.product.amount * value);
			},


			/**
			 * Utility function to get the quantity of this product
			 *
			 * @return {number}
			 */
			getQuantity: function () {
				return (typeof this.product.quantity !== undefined) ? this.product.quantity : 1;
			},


			/**
			 * Utility function to set the price of this product
			 *
			 * @param value {number} The new value
			 */
			setPrice: function (value) {
				value = parseFloat(value, 10);

				this.priceNode.innerHTML = $.util.formatCurrency(value.toFixed(2), this.settings.currency_code);
			},


			/**
			 * Utility function to get the price of this product
			 *
			 * @return {number}
			 */
			getPrice: function () {
				return (this.product.amount * this.getQuantity()).toFixed(2);
			}
		};



		/** UTILITY **/

		var $ = {};

		$.storage = (function () {
			var name = config.name;

			// Use HTML5 client side storage
			if (window.localStorage) {
				return {

					/**
					 * Loads the saved data
					 *
					 * @return {object}
					 */
					load: function () {
						var data = localStorage.getItem(name),
							todayDate, expiresDate;

						if (data) {
							data = JSON.parse(decodeURIComponent(data));
						}

						if (data && data.expires) {
							todayDate = new Date();
							expiresDate = new Date(data.expires);

							if (todayDate > expiresDate) {
								$.storage.remove();
								return;
							}
						}

						// A little bit of backwards compatibility for the moment
						if (data && data.value) {
							return data.value;
						} else {
							return data;
						}
					},


					/**
					 * Saves the data
					 *
					 * @param items {object} The list of items to save
					 * @param duration {Number} The number of days to keep the data
					 */
					save: function (items, duration) {
						var date = new Date(),
							data = [],
							wrappedData, item, len, i;

						if (items) {
							for (i = 0, len = items.length; i < len; i++) {
								item = items[i];
								data.push({
									product: item.product,
									settings: item.settings
								});
							}

							date.setTime(date.getTime() + duration * 24 * 60 * 60 * 1000);
							wrappedData = {
								value: data,
								expires: date.toGMTString()
							};

							localStorage.setItem(name, encodeURIComponent(JSON.stringify(wrappedData)));
						}
					},


					/**
					 * Removes the saved data
					 */
					remove: function () {
						localStorage.removeItem(name);
					}
				};

			// Otherwise use cookie based storage
			} else {
				return {

					/**
					 * Loads the saved data
					 *
					 * @return {object}
					 */
					load: function () {
						var key = name + '=',
							data, cookies, cookie, value, i;

						try {
							cookies = document.cookie.split(';');

							for (i = 0; i < cookies.length; i++) {
								cookie = cookies[i];

								while (cookie.charAt(0) === ' ') {
									cookie = cookie.substring(1, cookie.length);
								}

								if (cookie.indexOf(key) === 0) {
									value = cookie.substring(key.length, cookie.length);
									data = JSON.parse(decodeURIComponent(value));
								}
							}
						} catch (e) {}

						return data;
					},


					/**
					 * Saves the data
					 *
					 * @param items {object} The list of items to save
					 * @param duration {Number} The number of days to keep the data
					 */
					save: function (items, duration) {
						var date = new Date(),
							data = [],
							item, len, i;

						if (items) {
							for (i = 0, len = items.length; i < len; i++) {
								item = items[i];
								data.push({
									product: item.product,
									settings: item.settings
								});
							}

							date.setTime(date.getTime() + duration * 24 * 60 * 60 * 1000);
							document.cookie = config.name + '=' + encodeURIComponent(JSON.stringify(data)) + '; expires=' + date.toGMTString() + '; path=' + config.cookiePath;
						}
					},


					/**
					 * Removes the saved data
					 */
					remove: function () {
						this.save(null, -1);
					}
				};
			}
		})();


		$.event = (function () {
			/**
			 * Events are added here for easy reference
			 */
			var cache = [];

			// Non-IE events
			if (document.addEventListener) {
				return {
					/**
					 * Add an event to an object and optionally adjust it's scope
					 *
					 * @param obj {HTMLElement} The object to attach the event to
					 * @param type {string} The type of event excluding "on"
					 * @param fn {function} The function
					 * @param scope {object} Object to adjust the scope to (optional)
					 */
					add: function (obj, type, fn, scope) {
						scope = scope || obj;

						var wrappedFn = function (e) { fn.call(scope, e); };

						obj.addEventListener(type, wrappedFn, false);
						cache.push([obj, type, fn, wrappedFn]);
					},


					/**
					 * Remove an event from an object
					 *
					 * @param obj {HTMLElement} The object to remove the event from
					 * @param type {string} The type of event excluding "on"
					 * @param fn {function} The function
					 */
					remove: function (obj, type, fn) {
						var wrappedFn, item, len = cache.length, i;

						for (i = 0; i < len; i++) {
							item = cache[i];

							if (item[0] === obj && item[1] === type && item[2] === fn) {
								wrappedFn = item[3];

								if (wrappedFn) {
									obj.removeEventListener(type, wrappedFn, false);
									delete cache[i];
								}
							}
						}
					}
				};

			// IE events
			} else if (document.attachEvent) {
				return {
					/**
					 * Add an event to an object and optionally adjust it's scope (IE)
					 *
					 * @param obj {HTMLElement} The object to attach the event to
					 * @param type {string} The type of event excluding "on"
					 * @param fn {function} The function
					 * @param scope {object} Object to adjust the scope to (optional)
					 */
					add: function (obj, type, fn, scope) {
						scope = scope || obj;

						var wrappedFn = function () {
							var e = window.event;
							e.target = e.target || e.srcElement;

							e.preventDefault = function () {
								e.returnValue = false;
							};

							fn.call(scope, e);
						};

						obj.attachEvent('on' + type, wrappedFn);
						cache.push([obj, type, fn, wrappedFn]);
					},


					/**
					 * Remove an event from an object (IE)
					 *
					 * @param obj {HTMLElement} The object to remove the event from
					 * @param type {string} The type of event excluding "on"
					 * @param fn {function} The function
					 */
					remove: function (obj, type, fn) {
						var wrappedFn, item, len = cache.length, i;

						for (i = 0; i < len; i++) {
							item = cache[i];

							if (item[0] === obj && item[1] === type && item[2] === fn) {
								wrappedFn = item[3];

								if (wrappedFn) {
									obj.detachEvent('on' + type, wrappedFn);
									delete cache[i];
								}
							}
						}
					}
				};
			}
		})();


		$.util = {
			/**
			 * Animation method for elements
			 *
			 * @param el {HTMLElement} The element to animate
			 * @param prop {string} Name of the property to change
			 * @param config {object} Properties of the animation
			 * @param callback {function} Callback function after the animation is complete
			 */
			animate: function (el, prop, config, callback) {
				config = config || {};
				config.from = config.from || 0;
				config.to = config.to || 0;
				config.duration = config.duration || 10;
				config.unit = (/top|bottom|left|right|width|height/.test(prop)) ? 'px' : '';

				var step = (config.to - config.from) / 20,
					current = config.from;

				(function doAnimate() {
					el.style[prop] = current + config.unit;
					current += step;

					if ((step > 0 && current > config.to) || (step < 0 && current < config.to) || step === 0) {
						el.style[prop] = config.to + config.unit;

						if (typeof callback === 'function') {
							callback();
						}

						return;
					}

					setTimeout(doAnimate, config.duration);
				})();
			},


			/**
			 * Convenience method to return the value of any type of form input
			 *
			 * @param input {HTMLElement} The element who's value is returned
			 */
			getInputValue: function (input) {
				var tag = input.tagName.toLowerCase();

				if (tag === 'select') {
					return input.options[input.selectedIndex].value;
				} else if (tag === 'textarea') {
					return input.innerHTML;
				} else {
					if (input.type === 'radio') {
						return (input.checked) ? input.value : null;
					} else if (input.type === 'checkbox') {
						return (input.checked) ? input.value : null;
					} else {
						return input.value;
					}
				}
			},


			/**
			 * Formats a float into a currency
			 *
			 * @param amount {float} The currency amount
			 * @param code {string} The three letter currency code
			 */
			formatCurrency: function (amount, code) {
				// TODO: The supported currency patterns need to be refined and
				// should support values for before, after, decimal, and separator.
				var currencies = {
						AED: { before: '\u062c' },
						ANG: { before: '\u0192' },
						ARS: { before: '$' },
						AUD: { before: '$' },
						AWG: { before: '\u0192' },
						BBD: { before: '$' },
						BGN: { before: '\u043b\u0432' },
						BMD: { before: '$' },
						BND: { before: '$' },
						BRL: { before: 'R$' },
						BSD: { before: '$' },
						CAD: { before: '$' },
						CHF: { before: '' },
						CLP: { before: '$' },
						CNY: { before: '\u00A5' },
						COP: { before: '$' },
						CRC: { before: '\u20A1' },
						CZK: { before: 'Kc' },
						DKK: { before: 'kr' },
						DOP: { before: '$' },
						EEK: { before: 'kr' },
						EUR: { before: '\u20AC' },
						GBP: { before: '\u00A3' },
						GTQ: { before: 'Q' },
						HKD: { before: '$' },
						HRK: { before: 'kn' },
						HUF: { before: 'Ft' },
						IDR: { before: 'Rp' },
						ILS: { before: '\u20AA' },
						INR: { before: 'Rs.' },
						ISK: { before: 'kr' },
						JMD: { before: 'J$' },
						JPY: { before: '\u00A5' },
						KRW: { before: '\u20A9' },
						KYD: { before: '$' },
						LTL: { before: 'Lt' },
						LVL: { before: 'Ls' },
						MXN: { before: '$' },
						MYR: { before: 'RM' },
						NOK: { before: 'kr' },
						NZD: { before: '$' },
						PEN: { before: 'S/' },
						PHP: { before: 'Php' },
						PLN: { before: 'z' },
						QAR: { before: '\ufdfc' },
						RON: { before: 'lei' },
						RUB: { before: '\u0440\u0443\u0431' },
						SAR: { before: '\ufdfc' },
						SEK: { before: 'kr' },
						SGD: { before: '$' },
						THB: { before: '\u0E3F' },
						TRY: { before: 'TL' },
						TTD: { before: 'TT$' },
						TWD: { before: 'NT$' },
						UAH: { before: '\u20b4' },
						USD: { before: '$' },
						UYU: { before: '$U' },
						VEF: { before: 'Bs' },
						VND: { before: '\u20ab' },
						XCD: { before: '$' },
						ZAR: { before: 'R' }
					},
					currency = currencies[code] || {},
					before = currency.before || '',
					after = currency.after || '';

				return before + amount + after;
			}
		};

	}

})();

/*
    json2.js
    2012-10-08

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html


    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.


    This file creates a global JSON object containing two methods: stringify
    and parse.

        JSON.stringify(value, replacer, space)
            value       any JavaScript value, usually an object or array.

            replacer    an optional parameter that determines how object
                        values are stringified for objects. It can be a
                        function or an array of strings.

            space       an optional parameter that specifies the indentation
                        of nested structures. If it is omitted, the text will
                        be packed without extra whitespace. If it is a number,
                        it will specify the number of spaces to indent at each
                        level. If it is a string (such as '\t' or '&nbsp;'),
                        it contains the characters used to indent at each level.

            This method produces a JSON text from a JavaScript value.

            When an object value is found, if the object contains a toJSON
            method, its toJSON method will be called and the result will be
            stringified. A toJSON method does not serialize: it returns the
            value represented by the name/value pair that should be serialized,
            or undefined if nothing should be serialized. The toJSON method
            will be passed the key associated with the value, and this will be
            bound to the value

            For example, this would serialize Dates as ISO strings.

                Date.prototype.toJSON = function (key) {
                    function f(n) {
                        // Format integers to have at least two digits.
                        return n < 10 ? '0' + n : n;
                    }

                    return this.getUTCFullYear()   + '-' +
                         f(this.getUTCMonth() + 1) + '-' +
                         f(this.getUTCDate())      + 'T' +
                         f(this.getUTCHours())     + ':' +
                         f(this.getUTCMinutes())   + ':' +
                         f(this.getUTCSeconds())   + 'Z';
                };

            You can provide an optional replacer method. It will be passed the
            key and value of each member, with this bound to the containing
            object. The value that is returned from your method will be
            serialized. If your method returns undefined, then the member will
            be excluded from the serialization.

            If the replacer parameter is an array of strings, then it will be
            used to select the members to be serialized. It filters the results
            such that only members with keys listed in the replacer array are
            stringified.

            Values that do not have JSON representations, such as undefined or
            functions, will not be serialized. Such values in objects will be
            dropped; in arrays they will be replaced with null. You can use
            a replacer function to replace those with JSON values.
            JSON.stringify(undefined) returns undefined.

            The optional space parameter produces a stringification of the
            value that is filled with line breaks and indentation to make it
            easier to read.

            If the space parameter is a non-empty string, then that string will
            be used for indentation. If the space parameter is a number, then
            the indentation will be that many spaces.

            Example:

            text = JSON.stringify(['e', {pluribus: 'unum'}]);
            // text is '["e",{"pluribus":"unum"}]'


            text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
            // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

            text = JSON.stringify([new Date()], function (key, value) {
                return this[key] instanceof Date ?
                    'Date(' + this[key] + ')' : value;
            });
            // text is '["Date(---current time---)"]'


        JSON.parse(text, reviver)
            This method parses a JSON text to produce an object or array.
            It can throw a SyntaxError exception.

            The optional reviver parameter is a function that can filter and
            transform the results. It receives each of the keys and values,
            and its return value is used instead of the original value.
            If it returns what it received, then the structure is not modified.
            If it returns undefined then the member is deleted.

            Example:

            // Parse the text. Values that look like ISO date strings will
            // be converted to Date objects.

            myData = JSON.parse(text, function (key, value) {
                var a;
                if (typeof value === 'string') {
                    a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                    if (a) {
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
                    }
                }
                return value;
            });

            myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
                var d;
                if (typeof value === 'string' &&
                        value.slice(0, 5) === 'Date(' &&
                        value.slice(-1) === ')') {
                    d = new Date(value.slice(5, -1));
                    if (d) {
                        return d;
                    }
                }
                return value;
            });


    This is a reference implementation. You are free to copy, modify, or
    redistribute.
*/

/*jslint evil: true, regexp: true */

/*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
    call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/


// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

if (typeof JSON !== 'object') {
    JSON = {};
}

(function () {
    'use strict';

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function (key) {

            return isFinite(this.valueOf())
                ? this.getUTCFullYear()     + '-' +
                    f(this.getUTCMonth() + 1) + '-' +
                    f(this.getUTCDate())      + 'T' +
                    f(this.getUTCHours())     + ':' +
                    f(this.getUTCMinutes())   + ':' +
                    f(this.getUTCSeconds())   + 'Z'
                : null;
        };

        String.prototype.toJSON      =
            Number.prototype.toJSON  =
            Boolean.prototype.toJSON = function (key) {
                return this.valueOf();
            };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string'
                ? c
                : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

        case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

            if (!value) {
                return 'null';
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// Is the value an array?

            if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0
                    ? '[]'
                    : gap
                    ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
                    : '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    if (typeof rep[i] === 'string') {
                        k = rep[i];
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0
                ? '{}'
                : gap
                ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
                : '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                    typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'': value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/
                    .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                        .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                        .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function'
                    ? walk({'': j}, '')
                    : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }
}());
