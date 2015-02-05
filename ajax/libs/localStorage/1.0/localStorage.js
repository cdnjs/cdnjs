/*jslint devel: true, white: true, browser: true*/
/*global unescape: true, escape: true, ActiveXObject: true, google: true, swfobject: true*/
(function (w, d, l, n, host, string, number, div, script, iframe, local, doc, 
		   domain, not, nil, text, keyW, select, from, value, where, one, t, f, 
		   name) {
	"use strict";
	var Storage = function () {
		var loaded = f, isLoaded = function (fn) {
			var loadInterval;
			setTimeout(function () {
				loadInterval = setInterval(function () {
					if (loaded) {
						clearInterval(loadInterval);
						fn.call(this);	
					}
				}, 10);
			}, 1);
		}, globalStorage = function () {
			var storage;
			if (l.hostname === (local + host)) {
				storage = w.globalStorage[local + host + "." + local + domain];
			} else {
				storage = w.globalStorage[l.hostname];
			}

			return {
				length : storage.length,
				
				key : function (index) {
					var obj = null;
					if (!isNaN(parseInt(index, 10)) && typeof index === number) {
						obj = storage.key(index);
					}
					return obj;
				},

				getItem : function (key) {
					var obj = null;
					if (key && typeof key === string) {
						obj = storage.getItem(key);
					}
					return obj;
				},
				
				setItem : function (key, data) {
					if (key && data && typeof key === string && 
						typeof data === string) {
						storage.setItem(key, data);
						this.length += ((this.getItem(key) === null) ? 
							0 : 1);
					}
				},

				removeItem : function (key) {
					if (key && typeof key === string) {
						storage.removeItem(key);
						this.length = Math.max(0, this.length-1);	
					}
				},

				clear : function () {
					var i;
					for (i = this.length-1; i > -1; i -= 1) {
						this.removeItem(this.key(i));
						this.length = Math.max(0, this.length-1);
					}
				}
			};
		}, userData = function () {
			var storage, storageOwner, AXO, attr, 
			forbidden = new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g"),
			fixKey = function (key) {
				return key.replace(/^d/, '___$&').replace(forbidden, '___');
			};
			try {
				AXO = new ActiveXObject("htmlfile");
				AXO.open();
				AXO.write(
					"<" + script + ">" + 
					doc + ".w=window;" + 
					doc + "." + domain + "=" + l.protocol + "//" + d.domain +
					"</" + script + ">" + 
					"<" + iframe + " src=\"/favicon.ico\"></" + iframe + ">"
				);
				AXO.close();
				storageOwner = AXO.body.lastChild.document;
				storage = storageOwner.createElement(div);
			} catch(e) {
				storage = null;
				try {
					storage = d.createElement("<" + div + ">");
				} catch (ignore) {}
				if (!storage) {
					storage = d.createElement(div);
				}
				storageOwner = d.body;
			}
			storage.style.display = "none";
			storage.style.behavior = "url('#default#userData')";
			storageOwner.insertBefore(storage, storageOwner.lastChild.nextSibling);

			try {
				storage.load(name + "_" + d.domain);
			} catch (ignore) {}
			attr = storage.XMLDocument.documentElement.attributes;

			return {
				length : attr.length,

				key : function (index) {
					if (!isNaN(parseInt(index, 10)) && 
						typeof index === number && 
						index >= 0 && 
						index < this.length) {
						return (index >= this.length) ? 
							null : attr[index].name;
					}
					return null;
				},

				getItem : function (key) {
					var obj = null;
					if (key && typeof key === string) {
						obj = storage.getAttribute(fixKey(key)) || null;
					}
					return obj;
				},

				setItem : function (key, data) {
					if (key && data && typeof key === string && 
						typeof data === string) {
						storage.setAttribute(fixKey(key), data);
						storage.save(name + "_" + d.domain);
						this.length += (
							(storage.getAttribute(fixKey(key)) === data) ? 1 : 0
						);
					}
				},

				removeItem : function (key) {
					if (key && typeof key === string) {
						if (storage.getAttribute(fixKey(key)) !== null) {
							storage.removeAttribute(fixKey(key));
							storage.save(name + "_" + d.domain);
							this.length = Math.max(0, this.length-1);
						}
					}
				},

				clear : function () {
					while (this.length) {
						this.length = Math.max(0, this.length-1);
						storage.removeAttribute(attr[this.length].name);
					}
					storage.save(name + "_" + d.domain);
				}
			};
		}, gears = function () {
			var execute, storage;
			execute = function (sql, args, process) {
        		var db, cur, res = null;
				db = google.gears.factory.create("beta.database");
        		db.open(name + "-db");
       			db.execute(
					"CREATE TABLE IF" + not + "EXISTS " + name + " (" + keyW + text + "UNIQUE" + not + nil + "PRIMARY KEY," + value + text + not + nil +")"
				);
				cur = db.execute(sql, args);
				if (process) {
					res = process(cur);
				}
				cur.close();
				db.close();

        		return res;
			};

			storage = {
				length : 0,

       			key: function key(index) {
					var obj = null;
					if (!isNaN(parseInt(index, 10)) && typeof index === number) {
						obj = execute(
							select + keyW + from + name + " " +
							"ORDER BY" + keyW + "ASC " + "LIMIT " + one + " OFFSET ?", 
							[index], 
							function (result) {
								return result.field(0);
							}
						);
					}
					return obj;
				},

				getItem: function getItem(key) {
					var obj = null;
					if (key && typeof key === string) {
						obj = execute(
							select + value + from + name + " " + where + keyW + "=?", 
							[key], 
							function (result) {
								var o = null; 
								if (result.isValidRow()) {
									o = result.field(0);
								} 
								return o;
							}
						);
					}
					return obj;
        		},

       			setItem: function setItem(key, value) {
					if (key && typeof key === string) {
						execute(
							"INSERT OR REPLACE INTO " + name + " VALUES (?, ?)", 
							[key, value]
						);
					}
        		},
        
				removeItem: function removeItem(key) {
					if (key && typeof key === string) {
						execute(
							"DELETE " + from + name + " " + where + keyW + "=?", 
							[key]
						);
					}
				},

				clear: function clear() {
					execute("DELETE " + from + name);
				}
			};
			storage.length = execute(
				select + " COUNT(*) " + from + name, 
				[], 
				function (result) {
					return result.field(0);
				}
			);
			return storage;
		}, cookie = function (fallback) {
			var storage = {
				length : 0,

				key : function (index) {
					var obj = null;
					if (index && typeof index === number) {
						obj = unescape(
							d.cookie.replace(/\s*\=(?:.(?!;))*$/, "")
								.split(/\s*\=(?:[^;](?!;))*[^;]?;\s*/)[index]
						);
					}
					return obj;
				},

				getItem : function (key) {
					var obj = null;
					if (key && typeof key === string && this.hasOwnProperty(key)) {
						obj = unescape(
							d.cookie.replace(
								new RegExp(
									"(?:^|.*;\\s*)" + 
									escape(key).replace(/[\-\.\+\*]/g, "\\$&") + 
									"\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"
								), 
								"$1"
							)
						);
					}
					return obj;
				},

				setItem : function (key, data) {
					if (key && data && typeof key === string && 
						typeof data === string) {

						if (data.length > 4096) {
							throw {
								name : "CookieQuotaExceeded",
								message : "The cookie is too big"
							};
						}

						d.cookie = escape(key) + "=" + escape(data) + 
							"; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/";	
						this.length += ((this.getItem(key) === data) ? 
							1 : 0);
					}
				},
			
				removeItem : function (key) {
					if (key && typeof key === string) {
						d.cookie = escape(key) + 
							"=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";	
						this.length = Math.max(0, this.length-1);
					}
				},

				clear : function () {
					var i, key;
					for (i = this.length-1; i > -1; i -= 1) {
						key = this.key(i);	
						this.removeItem(key);
						this.length = Math.max(0, this.length-1);
					}
				},

				hasOwnProperty : function (key) {
					return (
						new RegExp(
							"(?:^|;\\s*)" + 
							escape(key).replace(/[\-\.\+\*]/g, "\\$&") + 
							"\\s*\\="
						)
					).test(d.cookie);
				}
			};
			storage.length = (d.cookie.match(/\=/g) || storage).length;
			
			if (fallback) {
				w.localStorage = storage;
				return;
			}

			return storage;
		}, dummy = function (fallback) {
			var storage = {
				length : 0,
				
				key : function () {
					return null;
				},

				getItem : function () {
					return null;
				},

				setItem : function () {},

				removeItem : function () {},

				clear : function () {}
			};

			if (fallback) {
				w.localStorage = storage;
				return;
			}
			return storage;
		}, flash = function () {
			var storageOwner = null, storage, swfLoadEvent;
			try {
				storageOwner = d.createElement(
					"<" + div + " id='" + name + "'>"
				);	
			} catch (ignore){}
			if (!storageOwner) {
				storageOwner = d.createElement(div);
				storageOwner.id = name;
			}
			d.body.insertBefore(storageOwner, d.body.lastChild);

    		swfLoadEvent = function (e, fn) {
				var loadCheckInterval;
				if (typeof fn === "function") {
					setTimeout(function () {
						if (e.ref.hasOwnProperty("PercentLoaded")) {
							loadCheckInterval = setInterval(function (){
								if (e.ref.PercentLoaded() === 100) {
									clearInterval(loadCheckInterval);
									fn.call(this);
								}
							}, 10);
						} else {
							clearInterval(loadCheckInterval);
							if (n.cookieEnabled) {
								cookie(t);
							} else {
								dummy(t);
							}
						}
					}, 50);
				}
				return; 
			};

			swfobject.embedSWF(
				name + ".swf", name, one, one, "9.0.0", null, 
				{
//					logfn : "window.console.log"	
				},
				{
					allowScriptAccess : "always",
					wmode : "transparent"
				},
				{
					id : name,
					name : name 
				},
				function (e) {
					if (!e.success || !e.ref){
						cookie(t);
						return;
					}
 
    				swfLoadEvent(e, function () {
						storage = d[name] || d.getElementById(name) || d.embeds[name];
						w.localStorage = {
							length : 0,

							key : function (index) {
								return storage.key(index);
							},

							getItem : function (key) {
								return storage.getItem(key);
							},

							setItem : function (key, data) {
								storage.setItem(key, data);
								this.length += (storage.getItem(key) === data) 
									? 1 : 0;
							},

							removeItem : function(key) {
								storage.removeItem(key);
								this.length = Math.max(0, this.length-1);
							},

							clear : function () {
								storage.clear();
								this.length = 0;
							}					 
						};
						w.localStorage.length = storage.length();
						loaded = t;
    				});
				}
			);
		};

		/**
		 * Using globalStorage to simulate localStorage abilities
		 */
		if (w.globalStorage) {
			return globalStorage();
		}

		/**
		 * Using userData Behaviour to simulate localStorage abilities
		 */
		if (d.documentElement.addBehavior) {
			return userData();
		}

		/**
		 * Using gears sqllite database to simulate localStorage abilities
		 */
		if (w.google && google.gears) {
			return gears();
		}

		/**
		 * Using flash SharedObject to simulate localStorage abilities
		 */
		if (w.swfobject && swfobject.getFlashPlayerVersion().major >= 9) {
			w.swfLoaded = function (fn) {
				isLoaded(fn);
			};
			flash();
		} else 

		/**
		 * Using javascript cookies to simulate localStorage abilities
		 */
		if (n.cookieEnabled) {
			return cookie();
		}

		return dummy();
	};

	if (!w.localStorage) {
		w.localStorage = new Storage();
	}
}(window, window.document, window.location, window.navigator, "host", "string", 
  "number", "div", "script", "iframe", "local", "document", "domain", " NOT ", 
  " NULL ", " TEXT ", " key ", " SELECT ", " FROM ", " value ", " WHERE ", "1", 
  true, false, "localStorage"));
