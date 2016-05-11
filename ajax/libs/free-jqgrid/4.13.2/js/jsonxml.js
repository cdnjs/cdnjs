/**
	The below work is licensed under Creative Commons GNU LGPL License.

	Original work:

	License:     http://creativecommons.org/licenses/LGPL/2.1/
	Author:      Stefan Goessner/2006
	Web:         http://goessner.net/

	Modifications made:

	Version:     0.9-p5
	Description: Restructured code, JSLint validated (no strict whitespaces),
				 added handling of empty arrays, empty strings, and int/floats values.
	Author:      Michael Schøler/2008-01-29
	Web:         http://michael.hinnerup.net/blog/2008/01/26/converting-json-to-xml-and-xml-to-json/

	Description: json2xml added support to convert functions as CDATA
				 so it will be easy to write characters that cause some problems when convert
	Author:      Tony Tomov
*/

/*global alert, define */
/*jslint browser: true, vars: true, regexp: true, white: true */

(function (factory) {
	"use strict";
	if (typeof define === "function" && define.amd) {
		// AMD. Register as an anonymous module.
		define(["jquery"], factory);
	} else if (typeof exports === "object") {
		// Node/CommonJS
		factory(require("jquery"));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function () {
	"use strict";
	// begin module jsonxml
	var xmlJsonClass = {
			// Param "xml": Element or document DOM node.
			// Param "tab": Tab or indent string for pretty output formatting omit or use empty string "" to supress.
			// Returns:     JSON string
			xml2json: function (xml, tab) {
				if (xml.nodeType === 9) {
					// document node
					xml = xml.documentElement;
				}
				var nws = this.removeWhite(xml),
					obj = this.toObj(nws),
					json = this.toJson(obj, xml.nodeName, "\t");
				return "{\n" + tab + (tab ? json.replace(/\t/g, tab) : json.replace(/\t|\n/g, "")) + "\n}";
			},

			// Param "o":   JavaScript object
			// Param "tab": tab or indent string for pretty output formatting omit or use empty string "" to supress.
			// Returns:     XML string
			json2xml: function (o, tab) {
				var toXml = function (v, name, ind) {
						var xml = "", i, n, sXml, hasChild, m;
						if (v instanceof Array) {
							if (v.length === 0) {
								xml += ind + "<" + name + ">__EMPTY_ARRAY_</" + name + ">\n";
							} else {
								for (i = 0, n = v.length; i < n; i += 1) {
									sXml = ind + toXml(v[i], name, ind + "\t") + "\n";
									xml += sXml;
								}
							}
						} else if (typeof v === "object") {
							hasChild = false;
							xml += ind + "<" + name;
							for (m in v) {
								if (v.hasOwnProperty(m)) {
									if (m.charAt(0) === "@") {
										xml += " " + m.substr(1) + "=\"" + v[m].toString() + "\"";
									} else {
										hasChild = true;
									}
								}
							}
							xml += hasChild ? ">" : "/>";
							if (hasChild) {
								for (m in v) {
									if (v.hasOwnProperty(m)) {
										if (m === "#text") {
											xml += v[m];
										} else if (m === "#cdata") {
											xml += "<![CDATA[" + v[m] + "]]>";
										} else if (m.charAt(0) !== "@") {
											xml += toXml(v[m], m, ind + "\t");
										}
									}
								}
								xml += (xml.charAt(xml.length - 1) === "\n" ? ind : "") + "</" + name + ">";
							}
						} else if (typeof v === "function") {
							xml += ind + "<" + name + ">" + "<![CDATA[" + v + "]]>" + "</" + name + ">";
						} else {
							if (v === undefined) {
								v = "";
							}
							if (v.toString() === "\"\"" || v.toString().length === 0) {
								xml += ind + "<" + name + ">__EMPTY_STRING_</" + name + ">";
							} else {
								xml += ind + "<" + name + ">" + v.toString() + "</" + name + ">";
							}
						}
						return xml;
					},
					xml1 = "",
					p;

				for (p in o) {
					if (o.hasOwnProperty(p)) {
						xml1 += toXml(o[p], p, "");
					}
				}
				return tab ? xml1.replace(/\t/g, tab) : xml1.replace(/\t|\n/g, "");
			},
			// Internal methods
			toObj: function (xml) {
				var o = {}, funcTest = /function/i, i, textChild = 0, cdataChild = 0, hasElementChild = false, n;
				if (xml.nodeType === 1) {
					// element node ..
					if (xml.attributes.length) {
						// element with attributes ..
						for (i = 0; i < xml.attributes.length; i += 1) {
							o["@" + xml.attributes[i].nodeName] = (xml.attributes[i].nodeValue || "").toString();
						}
					}
					if (xml.firstChild) {
						// element has child nodes ..
						for (n = xml.firstChild; n; n = n.nextSibling) {
							if (n.nodeType === 1) {
								hasElementChild = true;
							} else if (n.nodeType === 3 && n.nodeValue.match(/[^ \f\n\r\t\v]/)) {
								// non-whitespace text
								textChild += 1;
							} else if (n.nodeType === 4) {
								// cdata section node
								cdataChild += 1;
							}
						}
						if (hasElementChild) {
							if (textChild < 2 && cdataChild < 2) {
								// structured element with evtl. a single text or/and cdata node ..
								this.removeWhite(xml);
								for (n = xml.firstChild; n; n = n.nextSibling) {
									if (n.nodeType === 3) {
										// text node
										o["#text"] = this.escape(n.nodeValue);
									} else if (n.nodeType === 4) {
										// cdata node
										if (funcTest.test(n.nodeValue)) {
											o[n.nodeName] = [o[n.nodeName], n.nodeValue];
										} else {
											o["#cdata"] = this.escape(n.nodeValue);
										}
									} else if (o[n.nodeName]) {
										// multiple occurence of element ..
										if (o[n.nodeName] instanceof Array) {
											o[n.nodeName][o[n.nodeName].length] = this.toObj(n);
										} else {
											o[n.nodeName] = [o[n.nodeName], this.toObj(n)];
										}
									} else {
										// first occurence of element ..
										o[n.nodeName] = this.toObj(n);
									}
								}
							} else {
								// mixed content
								if (!xml.attributes.length) {
									o = this.escape(this.innerXml(xml));
								} else {
									o["#text"] = this.escape(this.innerXml(xml));
								}
							}
						} else if (textChild) {
							// pure text
							if (!xml.attributes.length) {
								o = this.escape(this.innerXml(xml));
								if (o === "__EMPTY_ARRAY_") {
									o = "[]";
								} else if (o === "__EMPTY_STRING_") {
									o = "";
								}
							} else {
								o["#text"] = this.escape(this.innerXml(xml));
							}
						} else if (cdataChild) {
							// cdata
							if (cdataChild > 1) {
								o = this.escape(this.innerXml(xml));
							} else {
								for (n = xml.firstChild; n; n = n.nextSibling) {
									if (funcTest.test(xml.firstChild.nodeValue)) {
										o = xml.firstChild.nodeValue;
										break;
									}
									o["#cdata"] = this.escape(n.nodeValue);
								}
							}
						}
					}
					if (!xml.attributes.length && !xml.firstChild) {
						o = null;
					}
				} else if (xml.nodeType === 9) {
					// document.node
					o = this.toObj(xml.documentElement);
				} else {
					alert("unhandled node type: " + xml.nodeType);
				}
				return o;
			},
			toJson: function (o, name, ind, wellform) {
				if (wellform === undefined) {
					wellform = true;
				}
				var json = name ? ("\"" + name + "\"") : "", tab = "\t", newline = "\n", n, i, ar = [], arr = [], m;
				if (!wellform) {
					tab = "";
					newline = "";
				}

				if (o === "[]") {
					json += (name ? ":[]" : "[]");
				} else if (o instanceof Array) {
					for (i = 0, n = o.length; i < n; i += 1) {
						ar[i] = this.toJson(o[i], "", ind + tab, wellform);
					}
					json += (name ? ":[" : "[") + (ar.length > 1 ? (newline + ind + tab + ar.join("," + newline + ind + tab) + newline + ind) : ar.join("")) + "]";
				} else if (o === null) {
					json += (name && ":") + "null";
				} else if (typeof o === "object") {
					for (m in o) {
						if (o.hasOwnProperty(m)) {
							arr[arr.length] = this.toJson(o[m], m, ind + tab, wellform);
						}
					}
					json += (name ? ":{" : "{") + (arr.length > 1 ? (newline + ind + tab + arr.join("," + newline + ind + tab) + newline + ind) : arr.join("")) + "}";
				} else if (typeof o === "string") {
					json += (name && ":") + "\"" + o.replace(/\\/g, "\\\\").replace(/\"/g, '\\"') + "\"";
				} else {
					json += (name && ":") +  o.toString();
				}
				return json;
			},
			innerXml: function (node) {
				var s = "", child,
					asXml = function (n) {
						var str = "", i, c;
						if (n.nodeType === 1) {
							str += "<" + n.nodeName;
							for (i = 0; i < n.attributes.length; i += 1) {
								str += " " + n.attributes[i].nodeName + "=\"" + (n.attributes[i].nodeValue || "").toString() + "\"";
							}
							if (n.firstChild) {
								str += ">";
								for (c = n.firstChild; c; c = c.nextSibling) {
									str += asXml(c);
								}
								str += "</" + n.nodeName + ">";
							} else {
								str += "/>";
							}
						} else if (n.nodeType === 3) {
							str += n.nodeValue;
						} else if (n.nodeType === 4) {
							str += "<![CDATA[" + n.nodeValue + "]]>";
						}
						return str;
					};
				if (node.hasOwnProperty("innerHTML")) {
					s = node.innerHTML;
				} else {
					for (child = node.firstChild; child; child = child.nextSibling) {
						s += asXml(child);
					}
				}
				return s;
			},
			escape: function (txt) {
				return txt.replace(/[\\]/g, "\\\\").replace(/[\"]/g, '\\"').replace(/[\n]/g, "\\n").replace(/[\r]/g, "\\r");
			},
			removeWhite: function (e) {
				e.normalize();
				var n = e.firstChild, nxt;
				while (n) {
					if (n.nodeType === 3) {
						// text node
						if (!n.nodeValue.match(/[^ \f\n\r\t\v]/)) {
							// pure whitespace text node
							nxt = n.nextSibling;
							e.removeChild(n);
							n = nxt;
						} else {
							n = n.nextSibling;
						}
					} else if (n.nodeType === 1) {
						// element node
						this.removeWhite(n);
						n = n.nextSibling;
					} else {
						// any other node
						n = n.nextSibling;
					}
				}
				return e;
			}
		};
	window.xmlJsonClass = xmlJsonClass;
	// end module jsonxml
}));
