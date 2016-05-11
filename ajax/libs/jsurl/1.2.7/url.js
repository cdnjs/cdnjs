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
				auth   = url.match( /\/\/(.*?)(?::(.*?))?@/) || [],
				i
			;

			link.href = url;

			for (i in map) {
				self[i] = link[map[i]] || '';
			}

			// fix-up some parts
			self.protocol = self.protocol.replace( /:$/, '');
			self.query    = self.query.replace( /^\?/, '');
			self.hash     = decode(self.hash.replace( /^#/, ''));
			self.user     = decode(auth[1] || '');
			self.pass     = decode(auth[2] || '');
			self.port     = (
				defaultPorts[self.protocol] == self.port || self.port == 0
			) ? '' : self.port; // IE fix, Android browser fix

			if (!self.protocol && !/^([a-z]+:)?\/\//.test( url)) {
				// is IE and path is relative
				var
					base     = new Url( d.location.href.match(/(.*\/)/)[0]),
					basePath = base.path.split( '/'),
					selfPath = self.path.split( '/'),
					props = ['protocol','user','pass','host','port'],
					s = props.length
				;

				basePath.pop();

				for (i = 0; i < s; i++) {
					self[props[i]] = base[props[i]];
				}

				while (selfPath[0] == '..') { // skip all "../
					basePath.pop();
					selfPath.shift();
				}

				self.path =
					(url.charAt(0) != '/' ? basePath.join( '/') : '') +
					'/' + selfPath.join( '/')
				;
			}

			else {
				// fix absolute URL's path in IE
				self.path = self.path.replace( /^\/?/, '/');
			}

			self.paths((self.path.charAt(0) == '/' ?
				self.path.slice(1) : self.path).split('/')
			);

			parseQs( self);
		},

		encode = function(s) {
			return encodeURIComponent(s).replace(/'/g, '%27');
		},

		decode = function(s) {
			s = s.replace( /\+/g, ' ');

			s = s.replace(/%([ef][0-9a-f])%([89ab][0-9a-f])%([89ab][0-9a-f])/gi,
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
					for (var key in this) {
						if (!(this[key] instanceof Function)) {
							delete this[key];
						}
					}
				};

				this.count = function() {
					var count = 0, key;
					for (key in this) {
						if (!(this[key] instanceof Function)) {
							count++;
						}
					}
					return count;
				};

				this.isEmpty = function() {
					return this.count() === 0;	
				};

				this.toString = function() {
					var s = '', e = encode, i, ii;

					for (i in this) {
						if (this[i] instanceof Function) {
							continue;
						}

						if (this[i] instanceof Array) {
							var len = this[i].length;

							if (len) {
								for (ii = 0; ii < len; ii++) {
									s += s ? '&' : '';
									s += e( i) + '=' + e( this[i][ii]);
								}
							}

							else {
								// parameter is an empty array, so treat as
								// an empty argument
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
		this.paths = function( paths) {
			var prefix = '', i = 0, s;

			if (paths && paths.length && paths + '' !== paths) {
				if (this.isAbsolute()) {
					prefix = '/';
				}

				for (s = paths.length; i < s; i++) {
					paths[i] = encode(paths[i]);
				}

				this.path = prefix + paths.join('/');
			}

			paths = (this.path.charAt(0) === '/' ?
				this.path.slice(1) : this.path).split('/');

			for (i = 0, s = paths.length; i < s; i++) {
				paths[i] = decode(paths[i]);
			}

			return paths;
		};

		this.encode = encode;
		this.decode = decode;

		this.isAbsolute = function() {
			return this.protocol || this.path.charAt(0) === '/';
		};

		this.toString = function() {
			return (
				(this.protocol && (this.protocol + '://')) +
				(this.user && (
					encode(this.user) + (this.pass && (':' + encode(this.pass))
				) + '@')) +
				(this.host && this.host) +
				(this.port && (':' + this.port)) +
				(this.path && this.path) +
				(this.query.toString() && ('?' + this.query)) +
				(this.hash && ('#' + encode(this.hash)))
			);
		};

		parse( this, url);
	};
}());
