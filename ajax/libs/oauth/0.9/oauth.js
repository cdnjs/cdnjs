(function() {
	"use strict";
	var config = {
		oauthd_url: 'https://oauth.io/auth'
	};

	if ( ! window.OAuth) {
		if (typeof jQuery == 'undefined')
		{
			var _preloadcalls = [];
			var e = document.createElement("script");
			e.src = "http://code.jquery.com/jquery.min.js";
			e.type = "text/javascript";
			e.onload = function() {
				buildOAuth(jQuery);
				console.log(_preloadcalls);
				for (var i in _preloadcalls)
					window.OAuth[_preloadcalls[i].method].apply(window.OAuth, _preloadcalls[i].args);
			};
			document.getElementsByTagName("head")[0].appendChild(e);

			var methods = ["initialize", "popup", "redirect", "callback", "http"];
			window.OAuth = {};
			var push_method = function(method) {
				window.OAuth[method] = function() {
					var args_copy = [];
					for (var arg in arguments)
						args_copy[arg] = arguments[arg];
					_preloadcalls.push({method:method, args:args_copy});
				};
			};
			for (var i in methods)
				push_method(methods[i]);
		}
		else
			buildOAuth(jQuery);
	}

	config.oauthd_base = getAbsUrl(config.oauthd_url).match(/^.{2,5}:\/\/[^/]+/)[0];

	var client_states = [];

	var oauth_result;
	(function parse_urlfragment() {
		var results = /[\\#&]oauthio=([^&]*)/.exec(document.location.hash);
		if (results) {
			document.location.hash = '';
			oauth_result = decodeURIComponent(results[1].replace(/\+/g, " "));
			var cookie_state = readCookie("oauthio_state");
			if (cookie_state) {
				client_states.push(cookie_state);
				eraseCookie("oauthio_state");
			}
		}
	})();

	function getAbsUrl(url) {
		if (url[0] === '/')
			url = document.location.protocol + '//' + document.location.host + url;
		else if ( ! url.match(/^.{2,5}:\/\//))
			url = document.location.protocol + '//' + document.location.host + document.location.pathname + '/' + url;
		return url;
	}

	function replaceParam(param, rep) {
		return param.replace(/\{\{(.*?)\}\}/g, function(m,v) {
			return rep[v] || "";
		});
	}

	function sendCallback(opts) {
		var data;
		var err;

		try {
			data = JSON.parse(opts.data);
		} catch (e) {}

		if ( ! data || ! data.provider)
			return;

		if (opts.provider && data.provider.toLowerCase() !== opts.provider.toLowerCase())
			return;

		if (data.status === 'error' || data.status === 'fail') {
			err = new Error(data.message);
			err.body = data.data;
			return opts.callback(err);
		}

		if (data.status !== 'success' || ! data.data) {
			err = new Error();
			err.body = data.data;
			return opts.callback(err);
		}

		if ( ! data.state || client_states.indexOf(data.state) == -1)
			return opts.callback(new Error('State is not matching'));

		if ( ! opts.provider)
			data.data.provider = data.provider;

		function make_res(provider, tokens, request, method) {
			return function(opts) {
				var options = {};
				if (typeof opts === 'string')
					options = {url:opts};
				else if (typeof opts === 'object')
					for (var i in opts) { options[i] = opts[i]; }
				options.type = options.type || method;
				options.oauthio = {provider:provider, tokens:tokens, request:request};
				return OAuth.http(options);
			};
		}

		var res = data.data;
		var request = res.request;
		delete res.request;
		var tokens;
		if (res.access_token)
			tokens = { access_token: res.access_token };
		else if (res.oauth_token && res.oauth_token_secret)
			tokens = { oauth_token: res.oauth_token, oauth_token_secret: res.oauth_token_secret};

		res.get = make_res(data.provider, tokens, request, 'GET');
		res.post = make_res(data.provider, tokens, request, 'POST');
		res.put = make_res(data.provider, tokens, request, 'PUT');
		res.patch = make_res(data.provider, tokens, request, 'PATCH');
		res.del = make_res(data.provider, tokens, request, 'DELETE');

		return opts.callback(null, res, request);
	}

	function buildOAuth($) {
		window.OAuth = {
			initialize: function(public_key) {
				config.key = public_key;
			},
			popup: function(provider, opts, callback) {
				var wnd;
				if ( ! config.key)
					return callback(new Error('OAuth object must be initialized'));
				if (arguments.length == 2) {
					callback = opts;
					opts = {};
				}
				if ( ! opts.state) {
					opts.state = create_hash();
					opts.state_type = "client";
				}
				client_states.push(opts.state);

				var url = config.oauthd_base + '/auth/' + provider + "?k=" + config.key;
				url += '&d=' + encodeURIComponent(getAbsUrl('/'));
				if (opts)
					url += "&opts=" + encodeURIComponent(JSON.stringify(opts));

				// create popup
				var wnd_settings = {
					width: Math.floor(window.outerWidth * 0.8),
					height: Math.floor(window.outerHeight * 0.5)
				};
				if (wnd_settings.height < 350)
					wnd_settings.height = 350;
				if (wnd_settings.width < 800)
					wnd_settings.width = 800;
				wnd_settings.left = window.screenX + (window.outerWidth - wnd_settings.width) / 2;
				wnd_settings.top = window.screenY + (window.outerHeight - wnd_settings.height) / 8;
				var wnd_options = "width=" + wnd_settings.width + ",height=" + wnd_settings.height;
				wnd_options += ",toolbar=0,scrollbars=1,status=1,resizable=1,location=1,menuBar=0";
				wnd_options += ",left=" + wnd_settings.left + ",top=" + wnd_settings.top;

				opts = {provider:provider};
				function getMessage(e) {
					if (e.source !== wnd || e.origin !== config.oauthd_base)
						return;
					opts.data = e.data;
					return sendCallback(opts);
				}
				opts.callback = function(e, r) {
					if (window.removeEventListener)
						window.removeEventListener("message", getMessage, false);
					else if (window.detachEvent)
						window.detachEvent("onmessage", getMessage);
					else if (document.detachEvent)
						document.detachEvent("onmessage", getMessage);
					opts.callback = function() {};
					return callback(e,r);
				};

				if (window.attachEvent)
					window.attachEvent("onmessage", getMessage);
				else if (document.attachEvent)
					document.attachEvent("onmessage", getMessage);
				else if (window.addEventListener)
					window.addEventListener("message", getMessage, false);

				setTimeout(function() {
					opts.callback(new Error('Authorization timed out'));
				}, 600 * 1000);

				wnd = window.open(url, "Authorization", wnd_options);
				if (wnd)
					wnd.focus();
			},
			redirect: function(provider, opts, url) {
				if (arguments.length == 2) {
					url = opts;
					opts = {};
				}
				if ( ! opts.state) {
					opts.state = create_hash();
					opts.state_type = "client";
				}
				createCookie("oauthio_state", opts.state);
				var redirect_uri = encodeURIComponent(getAbsUrl(url));
				url = config.oauthd_base + '/auth/' + provider + "?k=" + config.key;
				url += "&redirect_uri=" + redirect_uri;
				if (opts)
					url += "&opts=" + encodeURIComponent(JSON.stringify(opts));
				document.location.href = url;
			},
			callback: function(provider, callback) {
				if ( ! oauth_result)
					return;

				if (arguments.length === 1)
					return sendCallback({data:oauth_result, callback:provider});

				return sendCallback({data:oauth_result, provider:provider, callback:callback});
			},
			http: function(opts) {
				var options = {};
				var i;
				for (i in opts) { options[i] = opts[i]; }
				if ( ! options.oauthio.request.cors) {
					if (options.url && options.url[0] != '/' )
						options.url = '/' + options.url;
					options.url = config.oauthd_base + '/request/' + options.oauthio.provider + options.url;
					options.headers = options.headers || {};
					options.headers.oauthio = 'k=' + config.key;
					if (options.oauthio.tokens.oauth_token && options.oauthio.tokens.oauth_token_secret)
						options.headers.oauthio += '&oauthv=1'; // make sure to use oauth 1
					for (var k in options.oauthio.tokens)
						options.headers.oauthio += '&' + encodeURIComponent(k) + '=' + encodeURIComponent(options.oauthio.tokens[k]);
					delete options.oauthio;
					return $.ajax(options);
				}
				if (options.oauthio.tokens.access_token) {

					if ( ! options.url.match(/^[a-z]{2,16}:\/\//)) {
						if (options.url[0] !== '/')
							options.url = '/' + options.url;
						options.url = options.oauthio.request.url + options.url;
					}

					var qs = [];
					for (i in (options.oauthio.request.query||{}))
						qs.push(encodeURIComponent(i) + '=' + encodeURIComponent(
							replaceParam(options.oauthio.request.query[i], {
								token: options.oauthio.tokens.access_token
							})
						));
					qs = qs.join('&');

					if (options.url.indexOf('?') !== -1)
						options.url += '&' + qs;
					else
						options.url += '?' + qs;

					for (i in (options.oauthio.request.headers||{}))
						options.headers[i] = replaceParam(options.oauthio.request.headers[i], {
							token: options.oauthio.tokens.access_token
						});

					delete options.oauthio;
					return $.ajax(options);
				}
			}
		};
	}

	function create_hash() {
		var hash = b64_sha1((new Date()).getTime() + ':' + Math.floor(Math.random()*9999999));
		return hash.replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '');
	}

	function createCookie(name, value) {
		eraseCookie(name);
		var date = new Date();
		date.setTime(date.getTime() + 600000); // +10 mins
		var expires = "; expires="+date.toGMTString();
		document.cookie = name+"="+value+expires+"; path=/";
	}

	function readCookie(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) === ' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	}

	function eraseCookie(name) {
		var date = new Date();
		date.setTime(date.getTime() - 86400000);
		document.cookie = name+"=; expires="+date.toGMTString()+"; path=/";
	}

/*
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-1, as defined
 * in FIPS 180-1
 * Version 2.2 Copyright Paul Johnston 2000 - 2009.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for details.
 */

/*
 * Configurable variables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */
var hexcase = 0;  /* hex output format. 0 - lowercase; 1 - uppercase        */
var b64pad  = ""; /* base-64 pad character. "=" for strict RFC compliance   */

/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */
function hex_sha1(s)    { return rstr2hex(rstr_sha1(str2rstr_utf8(s))); }
function b64_sha1(s)    { return rstr2b64(rstr_sha1(str2rstr_utf8(s))); }
function any_sha1(s, e) { return rstr2any(rstr_sha1(str2rstr_utf8(s)), e); }
function hex_hmac_sha1(k, d)
	{ return rstr2hex(rstr_hmac_sha1(str2rstr_utf8(k), str2rstr_utf8(d))); }
function b64_hmac_sha1(k, d)
	{ return rstr2b64(rstr_hmac_sha1(str2rstr_utf8(k), str2rstr_utf8(d))); }
function any_hmac_sha1(k, d, e)
	{ return rstr2any(rstr_hmac_sha1(str2rstr_utf8(k), str2rstr_utf8(d)), e); }

/*
 * Perform a simple self-test to see if the VM is working
 */
function sha1_vm_test()
{
	return hex_sha1("abc").toLowerCase() == "a9993e364706816aba3e25717850c26c9cd0d89d";
}

/*
 * Calculate the SHA1 of a raw string
 */
function rstr_sha1(s)
{
	return binb2rstr(binb_sha1(rstr2binb(s), s.length * 8));
}

/*
 * Calculate the HMAC-SHA1 of a key and some data (raw strings)
 */
function rstr_hmac_sha1(key, data)
{
	var bkey = rstr2binb(key);
	if(bkey.length > 16) bkey = binb_sha1(bkey, key.length * 8);

	var ipad = Array(16), opad = Array(16);
	for(var i = 0; i < 16; i++)
	{
		ipad[i] = bkey[i] ^ 0x36363636;
		opad[i] = bkey[i] ^ 0x5C5C5C5C;
	}

	var hash = binb_sha1(ipad.concat(rstr2binb(data)), 512 + data.length * 8);
	return binb2rstr(binb_sha1(opad.concat(hash), 512 + 160));
}

/*
 * Convert a raw string to a hex string
 */
function rstr2hex(input)
{
	try { hexcase } catch(e) { hexcase=0; }
	var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
	var output = "";
	var x;
	for(var i = 0; i < input.length; i++)
	{
		x = input.charCodeAt(i);
		output += hex_tab.charAt((x >>> 4) & 0x0F)
					 +  hex_tab.charAt( x        & 0x0F);
	}
	return output;
}

/*
 * Convert a raw string to a base-64 string
 */
function rstr2b64(input)
{
	try { b64pad } catch(e) { b64pad=''; }
	var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	var output = "";
	var len = input.length;
	for(var i = 0; i < len; i += 3)
	{
		var triplet = (input.charCodeAt(i) << 16)
								| (i + 1 < len ? input.charCodeAt(i+1) << 8 : 0)
								| (i + 2 < len ? input.charCodeAt(i+2)      : 0);
		for(var j = 0; j < 4; j++)
		{
			if(i * 8 + j * 6 > input.length * 8) output += b64pad;
			else output += tab.charAt((triplet >>> 6*(3-j)) & 0x3F);
		}
	}
	return output;
}

/*
 * Convert a raw string to an arbitrary string encoding
 */
function rstr2any(input, encoding)
{
	var divisor = encoding.length;
	var remainders = Array();
	var i, q, x, quotient;

	/* Convert to an array of 16-bit big-endian values, forming the dividend */
	var dividend = Array(Math.ceil(input.length / 2));
	for(i = 0; i < dividend.length; i++)
	{
		dividend[i] = (input.charCodeAt(i * 2) << 8) | input.charCodeAt(i * 2 + 1);
	}

	/*
	 * Repeatedly perform a long division. The binary array forms the dividend,
	 * the length of the encoding is the divisor. Once computed, the quotient
	 * forms the dividend for the next step. We stop when the dividend is zero.
	 * All remainders are stored for later use.
	 */
	while(dividend.length > 0)
	{
		quotient = Array();
		x = 0;
		for(i = 0; i < dividend.length; i++)
		{
			x = (x << 16) + dividend[i];
			q = Math.floor(x / divisor);
			x -= q * divisor;
			if(quotient.length > 0 || q > 0)
				quotient[quotient.length] = q;
		}
		remainders[remainders.length] = x;
		dividend = quotient;
	}

	/* Convert the remainders to the output string */
	var output = "";
	for(i = remainders.length - 1; i >= 0; i--)
		output += encoding.charAt(remainders[i]);

	/* Append leading zero equivalents */
	var full_length = Math.ceil(input.length * 8 /
																		(Math.log(encoding.length) / Math.log(2)))
	for(i = output.length; i < full_length; i++)
		output = encoding[0] + output;

	return output;
}

/*
 * Encode a string as utf-8.
 * For efficiency, this assumes the input is valid utf-16.
 */
function str2rstr_utf8(input)
{
	var output = "";
	var i = -1;
	var x, y;

	while(++i < input.length)
	{
		/* Decode utf-16 surrogate pairs */
		x = input.charCodeAt(i);
		y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
		if(0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF)
		{
			x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
			i++;
		}

		/* Encode output as utf-8 */
		if(x <= 0x7F)
			output += String.fromCharCode(x);
		else if(x <= 0x7FF)
			output += String.fromCharCode(0xC0 | ((x >>> 6 ) & 0x1F),
																		0x80 | ( x         & 0x3F));
		else if(x <= 0xFFFF)
			output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F),
																		0x80 | ((x >>> 6 ) & 0x3F),
																		0x80 | ( x         & 0x3F));
		else if(x <= 0x1FFFFF)
			output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07),
																		0x80 | ((x >>> 12) & 0x3F),
																		0x80 | ((x >>> 6 ) & 0x3F),
																		0x80 | ( x         & 0x3F));
	}
	return output;
}

/*
 * Encode a string as utf-16
 */
function str2rstr_utf16le(input)
{
	var output = "";
	for(var i = 0; i < input.length; i++)
		output += String.fromCharCode( input.charCodeAt(i)        & 0xFF,
																	(input.charCodeAt(i) >>> 8) & 0xFF);
	return output;
}

function str2rstr_utf16be(input)
{
	var output = "";
	for(var i = 0; i < input.length; i++)
		output += String.fromCharCode((input.charCodeAt(i) >>> 8) & 0xFF,
																	 input.charCodeAt(i)        & 0xFF);
	return output;
}

/*
 * Convert a raw string to an array of big-endian words
 * Characters >255 have their high-byte silently ignored.
 */
function rstr2binb(input)
{
	var output = Array(input.length >> 2);
	for(var i = 0; i < output.length; i++)
		output[i] = 0;
	for(var i = 0; i < input.length * 8; i += 8)
		output[i>>5] |= (input.charCodeAt(i / 8) & 0xFF) << (24 - i % 32);
	return output;
}

/*
 * Convert an array of big-endian words to a string
 */
function binb2rstr(input)
{
	var output = "";
	for(var i = 0; i < input.length * 32; i += 8)
		output += String.fromCharCode((input[i>>5] >>> (24 - i % 32)) & 0xFF);
	return output;
}

/*
 * Calculate the SHA-1 of an array of big-endian words, and a bit length
 */
function binb_sha1(x, len)
{
	/* append padding */
	x[len >> 5] |= 0x80 << (24 - len % 32);
	x[((len + 64 >> 9) << 4) + 15] = len;

	var w = Array(80);
	var a =  1732584193;
	var b = -271733879;
	var c = -1732584194;
	var d =  271733878;
	var e = -1009589776;

	for(var i = 0; i < x.length; i += 16)
	{
		var olda = a;
		var oldb = b;
		var oldc = c;
		var oldd = d;
		var olde = e;

		for(var j = 0; j < 80; j++)
		{
			if(j < 16) w[j] = x[i + j];
			else w[j] = bit_rol(w[j-3] ^ w[j-8] ^ w[j-14] ^ w[j-16], 1);
			var t = safe_add(safe_add(bit_rol(a, 5), sha1_ft(j, b, c, d)),
											 safe_add(safe_add(e, w[j]), sha1_kt(j)));
			e = d;
			d = c;
			c = bit_rol(b, 30);
			b = a;
			a = t;
		}

		a = safe_add(a, olda);
		b = safe_add(b, oldb);
		c = safe_add(c, oldc);
		d = safe_add(d, oldd);
		e = safe_add(e, olde);
	}
	return Array(a, b, c, d, e);

}

/*
 * Perform the appropriate triplet combination function for the current
 * iteration
 */
function sha1_ft(t, b, c, d)
{
	if(t < 20) return (b & c) | ((~b) & d);
	if(t < 40) return b ^ c ^ d;
	if(t < 60) return (b & c) | (b & d) | (c & d);
	return b ^ c ^ d;
}

/*
 * Determine the appropriate additive constant for the current iteration
 */
function sha1_kt(t)
{
	return (t < 20) ?  1518500249 : (t < 40) ?  1859775393 :
				 (t < 60) ? -1894007588 : -899497514;
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y)
{
	var lsw = (x & 0xFFFF) + (y & 0xFFFF);
	var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
	return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function bit_rol(num, cnt)
{
	return (num << cnt) | (num >>> (32 - cnt));
}

})();
