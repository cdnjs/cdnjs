/*jshint browser:true */
/*global jQuery */
(function($) {
	"use strict";

	var XmlRpcFault = function() {
		Error.apply(this, arguments);
	};
	XmlRpcFault.prototype = new Error();
	XmlRpcFault.prototype.type = 'XML-RPC fault';

	var xmlrpc = $.xmlrpc = function(url, settings) {

		if (arguments.length === 2) {
			settings.url = url;
		} else {
			settings = url;
			url = settings.url;
		}

		settings.dataType = 'xml json';
		settings.type = 'POST';
		settings.contentType = 'text/xml';
		settings.converters = {'xml json': xmlrpc.parseDocument};

		var xmlDoc = xmlrpc.document(settings.methodName, settings.params || []);

		if ("XMLSerializer" in window) {
			settings.data = new window.XMLSerializer().serializeToString(xmlDoc);
		} else {
			// IE does not have XMLSerializer
			settings.data = xmlDoc.xml;
		}

		return $.ajax(settings);
	};

	/**
	* Make an XML document node.
	*/
	xmlrpc.createXMLDocument = function () {

		if (document.implementation && "createDocument" in document.implementation) {
			// Most browsers support createDocument
			return document.implementation.createDocument(null, null, null);

		} else {
			// IE uses ActiveXObject instead of the above.
			var i, length, activeX = [
				"MSXML6.DomDocument", "MSXML3.DomDocument",
				"MSXML2.DomDocument", "MSXML.DomDocument", "Microsoft.XmlDom"
			];
			for (i = 0, length = activeX.length; i < length; i++) {
				try {
					return new ActiveXObject(activeX[i]);
				} catch(_) {}
			}
		}
	};

	/**
	* Make an XML-RPC document from a method name and a set of parameters
	*/
	xmlrpc.document = function(name, params) {
		var doc = xmlrpc.createXMLDocument();


		var $xml = function(name) {
			return $(doc.createElement(name));
		};

		var $methodName = $xml('methodName').text(name);
		var $params = $xml('params').append($.map(params, function(param) {
			var $value = $xml('value').append(xmlrpc.toXmlRpc(param, $xml));
			return $xml('param').append($value);
		}));
		var $methodCall = $xml('methodCall').append($methodName, $params);
		doc.appendChild($methodCall.get(0));
		return doc;
	};

	var _isInt = function(x) {
		return (x === parseInt(x, 10)) && !isNaN(x);
	};

	/**
	* Take a JavaScript value, and return an XML node representing the value
	* in XML-RPC style. If the value is one of the `XmlRpcType`s, that type is
	* used. Otherwise, a best guess is made as to its type. The best guess is
	* good enough in the vast majority of cases.
	*/
	xmlrpc.toXmlRpc = function(item, $xml) {

		if (item instanceof XmlRpcType) {
			return item.toXmlRpc($xml);
		}

		var types = $.xmlrpc.types;
		var type = $.type(item);

		switch (type) {
			case "undefined":
			case "null":
				return types.nil.encode(item, $xml);

			case "date":
				return types['datetime.iso8601'].encode(item, $xml);

			case "object":
				if (item instanceof ArrayBuffer) {
					return types.base64.encode(item, $xml);
				} else {
					return types.struct.encode(item, $xml);
				}
				break;


			case "number":
				// Ints and Floats encode differently
				if (_isInt(item)) {
					return types['int'].encode(item, $xml);
				} else {
					return types['double'].encode(item, $xml);
				}
				break;

			case "array":
			case "boolean":
			case "string":
				return types[type].encode(item, $xml);

			default:
				throw new Error("Unknown type", item);
		}
	};

	/**
	* Take an XML-RPC document and decode it to an equivalent JavaScript
	* representation.
	*
	* If the XML-RPC document represents a fault, then an equivalent
	* XmlRpcFault will be thrown instead
	*/
	xmlrpc.parseDocument = function(doc) {
		var $doc = $(doc);
		var $response = $doc.children('methodresponse');

		var $fault = $response.find('> fault');
		if ($fault.length === 0) {
			var $params = $response.find('> params > param > value > *');
			var json = $params.toArray().map(xmlrpc.parseNode);
			return json;
		} else {
			var fault = xmlrpc.parseNode($fault.find('> value > *').get(0));
			var err = new XmlRpcFault(fault.faultString);
			err.msg = err.message = fault.faultString;
			err.type = err.code = fault.faultCode;
			throw err;
		}
	};

	/*
	* Take an XML-RPC node, and return the JavaScript equivalent
	*/
	xmlrpc.parseNode = function(node) {

		// Some XML-RPC services return empty <value /> elements. This is not
		// legal XML-RPC, but we may as well handle it.
		if (node === undefined) {
			return null;
		}
		var nodename = node.nodeName.toLowerCase();
		if (nodename in xmlrpc.types) {
			return xmlrpc.types[nodename].decode(node);
		} else {
			throw new Error('Unknown type ' + nodename);
		}
	};

	/*
	* Take a <value> node, and return the JavaScript equivalent.
	*/
	xmlrpc.parseValue = function(value) {
		var child = $(value).children()[0];
		if (child) {
			// Child nodes should be decoded.
			return xmlrpc.parseNode(child);
		} else {
			// If no child nodes, the value is a plain text node.
			return $(value).text();
		}
	};

	var XmlRpcType = function() { };

	$.xmlrpc.types = {};

	/**
	* Make a XML-RPC type. We use these to encode and decode values. You can
	* also force a values type using this. See `$.xmlrpc.force()`
	*/
	xmlrpc.makeType = function(tagName, simple, encode, decode) {
		var Type;

		Type = function(value) {
			this.value = value;
		};
		Type.prototype = new XmlRpcType();
		Type.prototype.tagName = tagName;

		if (simple) {
			var simpleEncode = encode, simpleDecode = decode;
			encode = function(value, $xml) {
				var text = simpleEncode(value);
				return $xml(Type.tagName).text(text);
			};
			decode = function(node) {
				return simpleDecode($(node).text(), node);
			};
		}
		Type.prototype.toXmlRpc = function($xml) {
			return Type.encode(this.value, $xml);
		};

		Type.tagName = tagName;
		Type.encode = encode;
		Type.decode = decode;

		xmlrpc.types[tagName.toLowerCase()] = Type;
	};


	// Number types
	var _fromInt = function(value) { return '' + Math.floor(value); };
	var _toInt = function(text, _) { return parseInt(text, 10); };

	xmlrpc.makeType('int', true, _fromInt, _toInt);
	xmlrpc.makeType('i4', true, _fromInt, _toInt);
	xmlrpc.makeType('i8', true, _fromInt, _toInt);
	xmlrpc.makeType('i16', true, _fromInt, _toInt);
	xmlrpc.makeType('i32', true, _fromInt, _toInt);

	xmlrpc.makeType('double', true, String, function(text) {
		return parseFloat(text, 10);
	});

	// String type. Fairly simple
	xmlrpc.makeType('string', true, String, String);

	// Boolean type. True == '1', False == '0'
	xmlrpc.makeType('boolean', true, function(value) {
		return value ? '1' : '0';
	}, function(text) {
		return text === '1';
	});

	// Dates are a little trickier
	var _pad = function(n) { return n<10 ? '0'+n : n; };

	xmlrpc.makeType('dateTime.iso8601', true, function(d) {
		return [
			d.getUTCFullYear(), '-', _pad(d.getUTCMonth()+1), '-',
			_pad(d.getUTCDate()), 'T', _pad(d.getUTCHours()), ':',
			_pad(d.getUTCMinutes()), ':', _pad(d.getUTCSeconds()), 'Z'
		].join('');
	}, function(text) {
		return new Date(text);
	});

	// Go between a base64 string and an ArrayBuffer
	xmlrpc.binary = (function() {
		var pad = '=';
		var toChars = ('ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
			'abcdefghijklmnopqrstuvwxyz0123456789+/').split("");
		var fromChars = toChars.reduce(function(acc, chr, i) {
			acc[chr] = i;
			return acc;
		}, {});

		/*
		* In the following, three bytes are added together into a 24-bit
		* number, which is then split up in to 4 6-bit numbers - or vice versa.
		* That is why there is lots of shifting by multiples of 6 and 8, and
		* the magic numbers 3 and 4.
		*
		* The modulo 64 is for converting to base 64, and the modulo 256 is for
		* converting to 8-bit numbers.
		*/
		return {
			toBase64: function(ab) {
				var acc = [];

				var int8View = new Uint8Array(ab);
				var int8Index = 0, int24;
				for (; int8Index < int8View.length; int8Index += 3) {

					// Grab three bytes
					int24 =
						(int8View[int8Index + 0] << 16) +
						(int8View[int8Index + 1] << 8) +
						(int8View[int8Index + 2] << 0);

					// Push four chars
					acc.push(toChars[(int24 >> 18) % 64]);
					acc.push(toChars[(int24 >> 12) % 64]);
					acc.push(toChars[(int24 >> 6) % 64]);
					acc.push(toChars[(int24 >> 0)% 64]);
				}

				// Set the last few characters to the padding character
				var padChars = 3 - ((ab.byteLength % 3) || 3);
				while (padChars--) {
					acc[acc.length - padChars - 1] = pad;
				}

				return acc.join('');
			},

			fromBase64: function(base64) {
				var base64Len = base64.length;

				// Work out the length of the data, accommodating for padding
				var abLen = (base64Len / 4) * 3;
				if (base64.charAt(base64Len - 1) === pad) { abLen--; }
				if (base64.charAt(base64Len - 2) === pad) { abLen--; }

				// Make the ArrayBuffer, and an Int8Array to work with it
				var ab = new ArrayBuffer(abLen);
				var int8View = new Uint8Array(ab);

				var base64Index = 0, int8Index = 0, int24;
				for (; base64Index < base64Len; base64Index += 4, int8Index += 3) {

					// Grab four chars
					int24 =
						(fromChars[base64[base64Index + 0]] << 18) +
						(fromChars[base64[base64Index + 1]] << 12) +
						(fromChars[base64[base64Index + 2]] << 6) +
						(fromChars[base64[base64Index + 3]] << 0);

					// Push three bytes
					int8View[int8Index + 0] = (int24 >> 16) % 256;
					int8View[int8Index + 1] = (int24 >> 8) % 256;
					int8View[int8Index + 2] = (int24 >> 0) % 256;

				}

				return ab;
			}
		};
	})();

	xmlrpc.makeType('base64', true, function(ab) {
		return xmlrpc.binary.toBase64(ab);
	}, function(text) {
		return xmlrpc.binary.fromBase64(text);
	});

	// Nil/null
	xmlrpc.makeType('nil', false,
		function(val, $xml) { return $xml('nil'); },
		function(_) { return null; }
	);

	// Structs/Objects
	xmlrpc.makeType('struct', false, function(value, $xml) {
		var $struct = $xml('struct');

		$.each(value, function(name, value) {
			var $name = $xml('name').text(name);
			var $value = $xml('value').append(xmlrpc.toXmlRpc(value, $xml));
			$struct.append($xml('member').append($name, $value));
		});

		return $struct;

	}, function(node) {
		return $(node)
			.find('> member')
			.toArray()
			.reduce(function(struct, el) {
				var $el = $(el);
				var key = $el.find('> name').text();
				var value = xmlrpc.parseValue($el.find('> value'));

				struct[key] = value;
				return struct;
			}, {});

	});

	// Arrays
	xmlrpc.makeType('array', false, function(value, $xml) {
		var $array = $xml('array');
		var $data = $xml('data');
		$.each(value, function(i, val) {
			$data.append($xml('value').append(xmlrpc.toXmlRpc(val, $xml)));
		});
		$array.append($data);
		return $array;
	}, function(node) {
		return $(node).find('> data > value').toArray()
			.map(xmlrpc.parseValue);
	});


	/**
	* Force a value to an XML-RPC type. All the usual XML-RPC types are
	* supported
	*/
	xmlrpc.force = function(type, value) {
		return new xmlrpc.types[type](value);
	};

})(jQuery);
