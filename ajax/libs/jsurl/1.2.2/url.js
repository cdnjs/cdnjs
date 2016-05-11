/*!
 * Lightweight URL manipulation with JavaScript
 * This library is independent of any other libraries and has pretty simple interface
 * and lightweight code-base.
 * Some ideas of query string parsing had been taken from Jan Wolter
 * @see http://unixpapa.com/js/querystring.html
 * 
 * @license MIT
 * @author Mykhailo Stadnyk <mikhus@gmail.com>
 */
; var Url = (function() {
	"use strict";

	var
		// mapping between what we want and <a> element properties
		map = {
			protocol : 'protocol',
			host     : 'hostname',
			port     : 'port',
			path     : 'pathname',
			query    : 'search',
			hash     : 'hash'
		},

		/**
		 * default ports as defined by http://url.spec.whatwg.org/#default-port
		 * We need them to fix IE behavior, @see https://github.com/Mikhus/jsurl/issues/2
		 */
		defaultPorts = {
			"ftp"    : 21,
			"gopher" : 70,
			"http"   : 80,
			"https"  : 443,
			"ws"     : 80,
			"wss"    : 443
		},

		parse = function( self, url) {
			var
				d      = document,
				link   = d.createElement( 'a'),
				url    = url || d.location.href,
				auth   = url.match( /\/\/(.*?)(?::(.*?))?@/) || []
			;

			link.href = url;

			for (var i in map) {
				self[i] = link[map[i]] || '';
			}

			// fix-up some parts
			self.protocol = self.protocol.replace( /:$/, '');
			self.query    = self.query.replace( /^\?/, '');
			self.hash     = self.hash.replace( /^#/, '');
			self.user     = auth[1] || '';
			self.pass     = auth[2] || '';
			self.port     = (defaultPorts[self.protocol] == self.port || self.port == 0) ? '' : self.port; // IE fix, Android browser fix

			if (!self.protocol && !/^([a-z]+:)?\/\//.test( url)) { // is IE and path is relative
				var
					base     = new Url( d.location.href.match(/(.*\/)/)[0]),
					basePath = base.path.split( '/'),
					selfPath = self.path.split( '/')
				;

				basePath.pop();

				for (var i = 0, props = ['protocol','user','pass','host','port'], s = props.length; i < s; i++) {
					self[props[i]] = base[props[i]];
				}

				while (selfPath[0] == '..') { // skip all "../
					basePath.pop();
					selfPath.shift();
				}

				self.path = (url.substring(0, 1) != '/' ? basePath.join( '/') : '') + '/' + selfPath.join( '/');
			}

			else {
				// fix absolute URL's path in IE
				self.path = self.path.replace( /^\/?/, '/');
			}

			parseQs( self);
		},
		
		decode = function(s) {
			s = s.replace( /\+/g, ' ');

			s = s.replace( /%([ef][0-9a-f])%([89ab][0-9a-f])%([89ab][0-9a-f])/gi,
				function( code, hex1, hex2, hex3) {
					var
						n1 = parseInt( hex1, 16) - 0xE0,
						n2 = parseInt( hex2, 16) - 0x80
					;
	
					if (n1 == 0 && n2 < 32) {
						return code;
					}
	
					var
						n3 = parseInt( hex3, 16) - 0x80,
						n = (n1 << 12) + (n2 << 6) + n3
					;
	
					if (n > 0xFFFF) {
						return code;
					}
	
					return String.fromCharCode( n);
				}
			);

			s = s.replace( /%([cd][0-9a-f])%([89ab][0-9a-f])/gi,
				function( code, hex1, hex2) {
					var n1 = parseInt(hex1, 16) - 0xC0;
	
					if (n1 < 2) {
						return code;
					}
	
					var n2 = parseInt(hex2, 16) - 0x80;
	
					return String.fromCharCode( (n1 << 6) + n2);
				}
			);

			s = s.replace( /%([0-7][0-9a-f])/gi,
				function( code, hex) {
					return String.fromCharCode( parseInt(hex, 16));
				}
			);

			return s;
		},

		parseQs = function( self) {
			var qs = self.query;

			self.query = new (function( qs) {
				var re = /([^=&]+)(=([^&]*))?/g, match;

				while ((match = re.exec( qs))) {
					var
						key = decodeURIComponent(match[1].replace(/\+/g, ' ')),
						value = match[3] ? decode(match[3]) : ''
					;

					if (this[key] != null) {
						if (!(this[key] instanceof Array)) {
							this[key] = [this[key]];
						}

						this[key].push( value);
					}

					else {
						this[key] = value;
					}
				}

				this.clear = function() {
					for (key in this) {
						if (!(this[key] instanceof Function)) {
							delete this[key];
						}
					}
				};

				this.toString = function() {
					var
						s = '',
						e = encodeURIComponent
					;

					for (var i in this) {
						if (this[i] instanceof Function) {
							continue;
						}

						if (this[i] instanceof Array) {
							var len = this[i].length;

							if (len) {
								for (var ii = 0; ii < len; ii++) {
									s += s ? '&' : '';
									s += e( i) + '=' + e( this[i][ii]);
								}
							}

							else { // parameter is an empty array, so treat as an empty argument
								s += (s ? '&' : '') + e( i) + '=';
							}
						}

						else {
							s += s ? '&' : '';
							s += e( i) + '=' + e( this[i]);
						}
					}

					return s;
				};
			})( qs);
		}
	;

	return function( url) {
		this.toString = function() {
			return (
				(this.protocol && (this.protocol + '://')) +
				(this.user && (this.user + (this.pass && (':' + this.pass)) + '@')) +
				(this.host && this.host) +
				(this.port && (':' + this.port)) +
				(this.path && this.path) +
				(this.query.toString() && ('?' + this.query)) +
				(this.hash && ('#' + this.hash))
			);
		};

		parse( this, url);
	};
}());
