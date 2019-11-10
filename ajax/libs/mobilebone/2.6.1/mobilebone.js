/*
 * mobilebone.js
 * by zhangxinxu(.com) 2014-09-26
 * https://github.com/zhangxinxu/mobilebone
 * bone of switch for mobile web app 
**/

(function(root, factory) {
	if (document.MBLOADED) { return; }
	// Set up Mobilebone appropriately for the environment.
	if (typeof define === 'function' && (define.amd || define.cmd)) {
		define('mobilebone', function(exports) {
			return factory(root, exports);
		});
	// Finally, as a browser global.
	} else {
		root.Mobilebone = factory(root, {});
	}
})(this, function(root, Mobilebone) {
	if (document.MBLOADED) {
		return 'Don\'t repeat load Mobilebone!';
	}
	
	// Avoid repeated callbacks
	var store = {};
	
	// Create local references to array methods we'll want to use later.
	var array = [];
	var slice = array.slice;
	
	// Is it a id selector
	var isSimple = /^#?\w+(?:[\-_]\w+)*$/i;
	
	// Is it webkit
	var isWebkit = 'WebkitAppearance' in document.documentElement.style || typeof document.webkitHidden != "undefined";
	
	// Is it suppory history API
	var supportHistory = "pushState" in history && "replaceState" in history;
		
	Mobilebone.support = supportHistory;
	
	var hasInited = false;
	
	/**
	 * Current version of the library. Keep in sync with `package.json`.
	 *
	 * @type string
	**/
	Mobilebone.VERSION = '2.6.1';
	
	/**
	 * Whether catch attribute of href from element with tag 'a'
	 * If the value set to false, jump links in a refresh form(not slide)
	 * In most cases, you do not need to care about this parameter. 
	   Except some special pages that should refresh all links, as test/index.html show.
	   However, if your only want several links refesh, you can use data-ajax="false" or data-rel="external"
	 *
	 * @type boolean
	**/
	Mobilebone.captureLink = true;
	
	/**
	 * Whether catch events of 'submit' from <form> element
	 * If the value set to false, <form> is a normal form except data-ajax="true"
	 * If the value set to true, <form> will submit as a ajax request, 
	   and the return value will be used to create a new page and transition into meanwhile.
	   However, if data-ajax="false", <form> won't submit as a ajax.
	 *
	 * @type boolean
	**/
	Mobilebone.captureForm = true;
	
	/**
	 * The root of transition-callback
	 * Default value is 'root', you can consider as window-object. 
	   However, there are may many callbacks, it's impossible that all functions are global function.
	   We may custom a global object to store our callbacks, such as:
	   Callback = {
		 fun1: function() {}, 
		 fun2: function() {}, 
		 fun3: function() {},  
	   }
	   In this case, the value of 'obilebone.rootTransition' should set Callback;
	 *
	 * @type object
	**/
	Mobilebone.rootTransition = root;
	
	/**
	 * Whether merge(vs cover) global callback and local callback
	 *
	 * @type boolean
	**/
	Mobilebone.mergeCallback = true;

	/**
	 *  className of animation
	 *
	 * @type string
	**/
	Mobilebone.classAnimation = "slide";
	/**
	 *  for mark page element
	 *
	 * @type string
	**/
	Mobilebone.classPage = "page";
	/**
	 * className for mark mask element
	 *
	 * @type string
	**/
	Mobilebone.classMask = "mask";
	/**
	 * Whether url changes when history changes
	 * If this value is false, the url will be no change.
	 *
	 * @type boolean
	**/
	Mobilebone.pushStateEnabled = true;
	/**
	 * Whether excute JavaScript when ajax HTML loaded
	 * If this value is true, the script will excute.
	 *
	 * @type boolean
	**/
	Mobilebone.evalScript = false;
	
	
	if (// When running inside a FF iframe, calling replaceState causes an error. So set 'pushStateEnabled = false' 
		(window.navigator.userAgent.indexOf( "Firefox" ) >= 0 && window.top !== window)
	) {
		Mobilebone.pushStateEnabled = false;
	}
	
	/**
	 * if browser do not support history/classList, stop here
	**/
	if (supportHistory == false) return Mobilebone;
	
	/**
	 * don't excute window.onpopstate when page load
	**/
	history.popstate = false;
	
	/**
	 * Function for transition
	 * In most cases, you are unnecessary to use this function , unlike Mobilebone.createPage
	 
	 * @params  pageInto: dom-object. Element which will transform into. - Necessary
	            pageOut:  dom-object. Element which will transform out.   - Optional
			    back:     boolean.    Direction of transition.          - Optional
			    options:  object.     Cover or add parameters.           - Optional
	 * @returns undefined
	 * @example Mobilebone.transition(element);
	            Mobilebone.transition(element1, element2);
		        Mobilebone.transition(element1, element2, true);
		        Mobilebone.transition(element1, element2, { id: "only" });
		        Mobilebone.transition(element1, element2, true, { id: "only" });
	**/
	Mobilebone.transition = function(pageInto, pageOut, back, options) {
		if (arguments.length == 0 || pageInto == pageOut) return;
		if (arguments.length == 3 && isNaN(back * 1) == true) {
			options = back;
			back = options.back;
		};

		//if those parameters is missing
		pageOut = pageOut || null, back = back || false, options = options || {};
		
		// defaults parameters
		var defaults = {
			// the value of callback is a key name, and the host is root here. 
			// eg. if the name of animationstart is 'doLoading', so the script will execute 'root.doLoading()'
			// By default, the value of root is 'window'
			root: this.rootTransition,
			// the form of transition, the value (eg. 'slide') will be a className to add or remove. 
			// of course, u can set to other valeu, for example, 'fade' or 'flip'. However, u shou add corresponding CSS3 code.
			form: this.form || this.classAnimation,
			// 'animationstart/animationend/...' are callbacks params
			// Note: those all global callbacks!
			onpagefirstinto: this.onpagefirstinto,
			animationstart: this.animationstart,
			animationend: this.animationend,
			preventdefault: this.preventdefault,
			fallback: this.fallback,
			callback: this.callback
		}, params = function(element) {
			if (!element || !element.getAttribute) return {};
			
			var _params = {}, _dataparams = _queryToObject(element.getAttribute("data-params") || '');
			
			// rules as follow:
			// data-* > data-params > options > defaults	
			["title", "root", "form"].forEach(function(key) {	
				_params[key] = element.getAttribute("data-" + key) || _dataparams[key] || options[key] || defaults[key];
			});
			
			if (typeof _params.root == "string") {
				_params.root = Mobilebone.getFunction(_params.root);
			}
			
			["onpagefirstinto", "callback", "fallback", "animationstart", "animationend", "preventdefault"].forEach(function(key) {
				if (Mobilebone.mergeCallback == true && typeof defaults[key] == "function") {
					// merge global callback
					var local_function_key = element.getAttribute("data-" + key) || _dataparams[key];
					if (typeof _params.root[local_function_key] == "function") {		
						_params[key] = function() {
							defaults[key].apply(this, arguments);
							_params.root[local_function_key].apply(this, arguments);
						}
					} else if (typeof options[key] == "function") {
						_params[key] = function() {
							defaults[key].apply(this, arguments);
							options[key].apply(this, arguments);
						}
					} else {
						_params[key] = defaults[key];
					}
				} else {
					// replace global callback
					_params[key] = element.getAttribute("data-" + key) || _dataparams[key] || options[key] || defaults[key];
				}
			});
			
			return _params;
		};
		
		// get params of each 
		var params_out = params(pageOut), params_in = params(pageInto);
		
		if (pageOut != null && pageOut.classList) {
			// weather prevent transition
			var preventOut = params_out.preventdefault, isPreventOut = false;
			if (typeof preventOut == "string") preventOut = params_out.root[preventOut];
		}
		if (pageInto != null && pageInto.classList) {
			// weather prevent transition
			var preventInto = params_in.preventdefault, isPreventInto = false;
			if (typeof preventInto == "string") preventInto = params_in.root[preventInto];
			
		}
		if (typeof preventOut == "function") isPreventOut = preventOut.call(params_out.root, pageInto, pageOut, options);
		
		// if functions of 'preventdefault' are same for pageIn and pageout, just excute once.
		if (isPreventOut == true && preventOut === preventInto) return false;
		
		if (typeof preventInto == "function") isPreventInto = preventInto.call(params_in.root, pageInto, pageOut, options);
		// if pageinto stopped, stop all
		if (isPreventInto == true) {
			// only run here and nothing more
			return false;	
		}
		
		// set animation callback as a method
		var fun_animationCall = function(page, data) {
			if (page.flagAniBind == true) return;
			// do callback when animation start/end
			["animationstart", "animationend"].forEach(function(animationkey, index) {
				var animition = params_in[animationkey], webkitkey = "webkit" + animationkey.replace(/^a|s|e/g, function(matchs) {
					return matchs.toUpperCase();
				});
				var animateEventName = isWebkit? webkitkey: animationkey;
				// if it's the out element, hide it when 'animationend'
				index && page.addEventListener(animateEventName, function() {
					if (this.classList.contains("in") == false) {
						this.style.display = "none";
						// add on v2.5.5
						// move here on v2.5.8
						if (this.removeSelf == true) {
							this.parentElement.removeChild(this);	
							this.removeSelf = null;		
						}
					}
					this.classList.remove(params(this).form);
				});
				// bind animation events
				if (typeof animition == "string" && params_in.root[animition]) {
					page.addEventListener(animateEventName, function() {
						data.root[animition].call(data.root, this, this.classList.contains("in")? "into": "out", options);
					});
				} else if (typeof animition == "function") {
					page.addEventListener(animateEventName, function() {
						animition.call(data.root, this, this.classList.contains("in")? "into": "out", options);	
					});
				}
				// set a flag
				page.flagAniBind = true;
			});
		};
		
		if (pageOut != null && pageOut.classList) {
			// do transition if there are no 'prevent'
			if (isPreventOut != true) {
				pageOut.classList.add(params_out.form);
				// reflow
				pageOut.offsetWidth = pageOut.offsetWidth;
				// go, go, go
				pageOut.style.display = "block";
				pageOut.classList.add("out");
				pageOut.classList.remove("in");
				// if reverse direction
				pageOut.classList[back? "add": "remove"]("reverse");
				
				// add on v2.5.5
				pageOut.removeSelf = pageOut.removeSelf || null;
				
				// set animation callback for 'pageInto'
				// for issues #153
				fun_animationCall(pageOut, params_out);
				
				// do fallback every time
				var fallback = params_out.fallback;
				if (typeof fallback == "string") fallback = params_out.root[fallback];
				if (typeof fallback == "function") fallback.call(params_out.root, pageInto, pageOut, options);
			}
		}
		
		if (pageInto != null && pageInto.classList) {				
			// for title change
			var title = params_in.title, 
			    header = document.querySelector("h1"), 
			    first_page = document.querySelector("." + this.classPage);	
				
			// do title change	
			if (title && options.title !== false) {
				document.title = title;
				if (header) {
					header.innerHTML = title;
					header.title = title;
				}
			} else if (first_page == pageInto && !pageOut && document.title) {
				// set data-title for first visibie page
				pageInto.setAttribute("data-title", document.title);
			}
						
			// delete page with same id when options.remove !== false
			var pageid = options.id || pageInto.id, hashid = options.id || pageInto.id;
			
			if (options.id) {
				pageid = pageid.split("?")[0];
			}
			var relid = store["_" + pageid];
			
			if (options.remove !== false && store[pageid] && store[pageid] != pageInto) {
				// hashid may store the same page, we should delete also
				// when data-reload not 'false' or null
				// v2.4.4+
				if (relid && store[relid] && options.reload == true) {
					delete store[relid];
					delete store["_" + pageid];
				}
								
				if (options.reload == true) {
					// v2.5.8 for issues #147
					pageInto.removeSelf = true;
				}
				
				if (store[pageid] != pageOut) {
					store[pageid].parentElement && store[pageid].parentElement.removeChild(store[pageid]);					
				} else {
					pageOut.removeSelf = true;
				}
				delete store[pageid];
			}	
			
			
			// do transition
			if (pageOut) pageInto.classList.add(params_in.form);
			// iOS bug 
			// reflow for fixing issues #80, #86
			pageInto.offsetWidth = pageInto.offsetWidth;
			// go~ as normal
			pageInto.style.display = "block";
			pageInto.classList.remove("out");
			pageInto.classList.add("in");
			// if reverse direction
			pageInto.classList[back? "add": "remove"]("reverse");

			// do callback when come in first time
			var onpagefirstinto = params_in.onpagefirstinto;
			// first judge change to pageInto store
			// v2.5.5 add for fix issues #138
			if (!pageInto.firstintoBind) {
				if (typeof onpagefirstinto == "string" && params_in.root[onpagefirstinto]) {
					params_in.root[onpagefirstinto].call(params_in.root, pageInto, pageOut, options);
				} else if (typeof onpagefirstinto == "function") {
					onpagefirstinto.call(params_in.root, pageInto, pageOut, options);
				}
				// capture form submit
				slice.call(pageInto.querySelectorAll("form")).forEach(function(form) {
					Mobilebone.submit(form);
				});	
				
				pageInto.firstintoBind = true;
			}
			
			// set animation callback for 'pageInto'
			fun_animationCall(pageInto, params_in);
			
			// history
			// hashid should a full url address
			// different with pageid
			// add on 2.4.2
			var url_push = hashid, url_push_replaced = '';
			if (url_push && /^#/.test(url_push) == false) {
				url_push = "#" + url_push;
			}
			url_push_replaced = url_push.replace(/^#/, "#&");
			
			if (supportHistory && this.pushStateEnabled && options.history !== false && url_push 
				// hash should be different
				// can fix issues #79, #87 maybe
				&& url_push_replaced != location.hash
			) {
				// don't trigger 'popstate' events
				history.popstate = false;
				// if only pageIn, use 'replaceState'
				history[pageOut? "pushState": "replaceState"](null, document.title, url_push.replace(/^#/, "#&"));
			}
			
			// store page-id, just once
			if (!store[pageid]) {
				store[pageid] = pageInto;
				// when we back/prev, we need to get true 
				if (hashid !== pageid) {
					store[hashid] = pageInto;
					store["_" + pageid] = hashid;
				}
			}
			
			// do callback every time
			var callback = params_in.callback;
			
			if (typeof callback == "string") callback = params_in.root[callback];
			if (typeof callback == "function") callback.call(params_in.root, pageInto, pageOut, options);
			
			// Safari do 'popstate' after 'pushState/replaceState'
			// So, we neet setTimeout to avoid excuting 'Mobilebone.transition()' twice
			setTimeout(function() {
				// reset to popable state
				history.popstate = true;	
			}, 17);
		}
	};
	
	
	/**
	 * For getting whole ajax url
	 * In most cases, you are unnecessary to use this function
	 
	 * @params  trigger: dom-object. element with tag-"a".  - Optional(at least one)
	            url:     string. ajax url.                  - Optional(at least one)
			    params:  string|object. ajax params.        - Optional
	 * @returns string
	 * @example Mobilebone.getCleanUrl(elementOfA);
	            Mobilebone.getCleanUrl(elementOfForm);
	            Mobilebone.getCleanUrl(elementOfA, '', "a=1&b=2");
		        Mobilebone.getCleanUrl(null, "xxx.html");
		        Mobilebone.getCleanUrl(null, "xxx.html?a=1&b=2");
		        Mobilebone.getCleanUrl(null, "xxx.html", "a=1&b=2");
	**/
	Mobilebone.getCleanUrl = function(trigger, url, params) {
		var href = "", formdata = "", clean_url = "";
		if (trigger) {
			 if (trigger.nodeType == 1) {
				 // form element
				 if (trigger.action) {
					 href = trigger.getAttribute("action");
					 // add on v2.4.1
					 if (trigger.method && trigger.method.toUpperCase() == "POST") {
						 return href;
					 } else if (window.$ && $.fn && $.fn.serialize) {
						// use jquery serialize()
						formdata = $(trigger).serialize();
					 } else {
						formdata = {};
						// simple serialize from Mobilebone
						slice.call(trigger.querySelectorAll("input,select,textarea")).forEach(function(control) {
							if (control.name && !control.disabled) {
								var val = control.value.trim(), name = control.name;
								if (/^radio|checkbox/i.test(control.type)) {
									if (control.checked) {
										if (formdata[name]) {
											formdata[name].push(val);
										} else {
											formdata[name] = [val];
										}
									}
								} else {
									formdata[name] = [val];
								}
							}
						});
					 }
				 } else {
					// a element
					href = trigger.getAttribute("href");
					formdata = trigger.getAttribute("data-formdata") || trigger.getAttribute("data-data") || "";
					// v2.6.1 for #107
					// remember container when refresh
					var str_container = "container", attr_container = trigger.getAttribute("data-" + str_container);
					if (formdata.indexOf(str_container) == -1 && attr_container) {
						var query_container = str_container + "=" + attr_container;
						formdata = formdata? formdata + "&" + query_container: query_container;
					}
				 }
			 } else if (trigger.url) {
				 href = trigger.url;
				 formdata = trigger.data;
			 }
		}

		if (!(href = href || url)) return '';
		
		// get formdata
		formdata = formdata || params || "";

		if (typeof formdata == "object") {
			var arr_data = [];
			for (key in formdata) {
				if (!formdata[key].forEach) {
					formdata[key] = [formdata[key]];					
				}
				formdata[key].forEach(function(keyValue) {
					arr_data.push(key + "=" + encodeURIComponent(keyValue));		
				});
				
			}
			if (arr_data.length > 0) {
				formdata = arr_data.join("&");
			} else {
				formdata = "";
			}
		}
		
		// get url of root
		clean_url = href.split("#")[0].replace(/&+$/, "");

		if (clean_url.slice(-1) == "?") {
			clean_url = clean_url.split("?")[0];	
		}
		// url = root_url + joiner + formdata
		if (formdata != "") {						
			if (/\?/.test(clean_url)) {
				formdata = formdata.replace(/^&|\?/, "");
				clean_url = clean_url + "&" + formdata;
			} else if (formdata != "") {
				formdata = formdata.replace("?", "");
				clean_url = clean_url + "?" + formdata;
			}
		}
		return clean_url;
	};
	
	/**
	 * Create page according to given Dom-element or HTML string. And, notice!!!!! will do transition auto.
	 
	 * @params  domHtml:        dom-object|string. Create this to dom element as a role of into-page.               - Necessary
	            eleOrObj: dom-object|object. '.page element', or 'a element', or 'options' for get out-page   - Optional
				options:            object.            basically, options = ajax options, of course, u can custom it!   - Optional
	 * @returns undefined
	 * @example Mobilebone.createPage(pageDom);
	            Mobilebone.createPage(generalDom);
		        Mobilebone.createPage('<div class="page out">xxx</div>');
		        Mobilebone.createPage('<p>xxx</p>');
		        Mobilebone.createPage(pageDom, triggerLink);
		        Mobilebone.createPage(pageDom, { response: '<div...>' });
		        Mobilebone.createPage(pageDom, triggerLink, { response: '<div...>' });
	 *
	**/
	Mobilebone.createPage = function(domHtml, eleOrObj, options) {
		var response = null, container = null, classPage = this.classPage, isreload = null;
		// 'eleOrObj' can '.page element', or 'a element', or 'options'
		// basically, options = ajax options, of course, u can custom it!		
		if (!domHtml) return;
		if (typeof options == "undefined" && typeof eleOrObj == "object") {
			options = eleOrObj;
		}
		options = options || {};
		
		// 'options' that 'Mobilebone.transition()' needs
		var optionsTransition = {};
		
		// get page-title from eleOrObj or options
		var page_title, id_container, classPageInside;
		
		if (eleOrObj) {
			if (eleOrObj.nodeType == 1) {
				// legal elements
				if (eleOrObj.href || eleOrObj.action) {
					page_title = eleOrObj.getAttribute("data-title") || options.title;
				}
				response = options.response;
				id_container = eleOrObj.getAttribute("data-container");
				container = document.getElementById(id_container);
				classPageInside = eleOrObj.getAttribute("data-classpage");
				// pass element as target params, add on v2.3.0
				optionsTransition.target = eleOrObj;
				// v2.4.4 is_root → isreload
				isreload = eleOrObj.getAttribute("data-reload");
				if (eleOrObj.tagName.toLowerCase() == "form" || (isreload !== null && isreload != "false")) {
					optionsTransition.reload = true;
				}
				// v2.5.2
				// is back? for issues #128
				optionsTransition.back = eleOrObj.getAttribute("data-rel") == "back";	
				
				// v2.6.0 history
				if (eleOrObj.getAttribute("data-history") == "false") {
					optionsTransition.history = false;
				}
			} else {
				response = eleOrObj.response || options.response;	
				page_title = eleOrObj.title || options.title;
				container = eleOrObj.container || options.container;
				classPageInside = eleOrObj.classPage || options.classPage;
				optionsTransition.target = eleOrObj.target;
				// v2.5.2
				// is back? for issues #128
				optionsTransition.back = eleOrObj.back || options.back;		
			}
			if (container && classPageInside) classPage = classPageInside;	
		}
		
		// get current page(will be out) according to 'page_or_child'
		var current_page = (classPage == classPageInside? container : document).querySelector(".in." + classPage);

		// get create page (will be into) according to 'domHtml'
		var create_page = null;
		
		var create = document.createElement("div");
		if (typeof domHtml == "string") {
			create.innerHTML = domHtml;
		} else {
			create.appendChild(domHtml);
		}
		
		// excute inline JavaScript
		if (Mobilebone.evalScript == true && domHtml.firstintoBind != true) {
			slice.call(create.getElementsByTagName("script")).forEach(function(originScript) {
				var scriptContent = originScript.innerHTML.trim(), type = originScript.getAttribute("type");
				if (scriptContent.trim() == "" || originScript.src) return;
				var head = document.getElementsByTagName("head")[0] || document.documentElement,
				script = document.createElement("script");
				if (type) script.type = type;
				script.appendChild(document.createTextNode(scriptContent));
				setTimeout(function() {
					head.insertBefore(script, head.firstChild);
					head.removeChild(script);
					script = null;
				}, 17);
				originScript = null;
			});
		}
		
		var create_title = create.getElementsByTagName("title")[0];
		
		// get the page element
		if (!(create_page = create.querySelector("." + classPage))) {
			// if there no .page, create as create_page
			create.className = classPage + " out";
			create_page = create;
		}
		// set and store title
		if (typeof page_title == "string") {
			create_page.setAttribute("data-title", page_title);
		} else if (create_title && create_title.innerText) { // the judge behind '&&' for issues #144 
			create_page.setAttribute("data-title", create_title.innerText);
		}
		
		// insert create page as a last-child
		(container || document.body).appendChild(create_page);
		
		// release memory
		create = null;
		
		// do transition
		optionsTransition.response = response || domHtml;
		optionsTransition.id = this.getCleanUrl(eleOrObj) || create_page.id || ("unique" + Date.now());
		
		// 'if' statement below added on v2.0.0
		if (typeof options == "object") { 
			if (typeof options.history != "undefined") {
				optionsTransition.history = options.history;
			}
			if (typeof options.remove != "undefined") {
				optionsTransition.remove = options.remove;
			}
			if (typeof options.target != "undefined") {
				optionsTransition.target = options.target;
			}
			if (typeof options.title != "undefined") {
				optionsTransition.title = options.title;
			}
		}
		if (classPage == classPageInside) {
			optionsTransition.history = false;
			optionsTransition.classPage = classPage;
		}
		
		// do transition
		this.transition(create_page, current_page, optionsTransition);
	};
	
	/**
	 * For ajax callback. 
	 * For example, data-success="a.b.c". We can't use 'a.b.c' as a function, because it's a string. We should do some work to get it!
	 
	 * @params  keys:        string. - Necessary
	 * @returns function
	            undefined keys is not string
				window    keys undefined
	 * @example Mobilebone.getFunction("a.b.c");
	 *
	**/
	Mobilebone.getFunction = function(keys) {
		if (typeof keys != "string") return;
		// eg. 'globalObject.functionName'
		var fun = root, arr_key = keys.split(".");
		for (var index=0; index<arr_key.length; index+=1) {
			if (!(fun = fun[arr_key[index]])) {
				break;
			}
		}
		return fun;
	};
		
	/**
	 * For ajax request to get HTML or JSON. 
	 
	 * @params  aOrFormOrObj        - Necessary  
	            1. dom-object:<a>|<form>.
				2. object.  
	 * @returns undefined
	 * @example Mobilebone.ajax(document.querySelector("a"));
	            Mobilebone.ajax({
				  url: 'xxx.html',
				  success: function() {}
		    	});
	 *
	**/
	Mobilebone.ajax = function(aOrFormOrObj) {
		if (!aOrFormOrObj) return;
		
		// default params
		var defaults = {
			url: "",
			type: "",
			dataType: "",
			data: {},
			timeout: 10000,
			async: true,
			username: "",
			password: "",
			success: function() {},
			error: function() {},
			complete: function() {}	
		};
		
		var params = {}, ele_mask = null, formData = null;
		
		// if 'aOrFormOrObj' is a element, we should turn it to options-object
		var params_from_trigger = {}, attr_mask;
		if (aOrFormOrObj.nodeType == 1) {
			params_from_trigger = _queryToObject(aOrFormOrObj.getAttribute("data-params") || "");
			// get params
			for (key in defaults) {
				// data-* > data-params > defaults
				params[key] = aOrFormOrObj.getAttribute("data-" + key) || params_from_trigger[key] || defaults[key];
				if (typeof defaults[key] == "function" && typeof params[key] == "string") {
					// eg. globalObject.functionName
					params[key] = this.getFunction(params[key]);
					if (typeof params[key] != "function") {
						params[key] = defaults[key];
					}
				}
			}
			
			// address of ajax url
			params.url = this.getCleanUrl(aOrFormOrObj, params.url);	
			params.target = aOrFormOrObj;
			// v2.5.2
			// is back? for issues #128
			params.back = aOrFormOrObj.getAttribute("data-rel") == "back";	
			
			var tagName = aOrFormOrObj.tagName.toLowerCase();
			if (tagName == "form") {
				params.type = aOrFormOrObj.method;
				
				formData = new FormData(aOrFormOrObj);
			} else if (tagName == "a") {
				// v2.5.8 for issues #157
				var idContainer = aOrFormOrObj.getAttribute("data-container"),
					classPageInside = aOrFormOrObj.getAttribute("data-classpage"),
					container = idContainer && document.getElementById(idContainer);
				if (container && classPageInside && classPageInside != Mobilebone.classPage) {
					// inner ajax no history change
					params.history = false;
					// title do not change
					params.title = false;
				}
			}
			
			// get mask element
			attr_mask = aOrFormOrObj.getAttribute("data-mask");
			if (attr_mask == "true" || attr_mask == "") {
				ele_mask = aOrFormOrObj.querySelector("." + this.classMask);
			}
		}
		// if 'aOrFormOrObj' is a object
		else if (aOrFormOrObj.url) {
			// get params
			for (key2 in defaults) {
				params[key2] = aOrFormOrObj[key2] || defaults[key2];
			}
			// get url
			params.url = this.getCleanUrl(null, params.url, params.data);
			// here params.title will become page title;
			params.title = aOrFormOrObj.title;
			// v2.5.2
			// is back? for issues #128
			// when history.back()
			params.back = aOrFormOrObj.back;
			// v2.6.1
			params.container = aOrFormOrObj.container;
		} else {
			return;	
		}
		
		// do ajax
		// get mask and loading element
		var body = container || document.body;
		if (typeof attr_mask != "string") {
			ele_mask = body.querySelector("." + this.classMask);
		}
		if (ele_mask == null) {
			ele_mask = document.createElement("div");
			ele_mask.className = this.classMask;
			ele_mask.innerHTML = '<i class="loading"></i>';
			if (typeof attr_mask == "string") {
				aOrFormOrObj.appendChild(ele_mask);
			} else {
				body.appendChild(ele_mask);
			}
		}
		// show loading
		ele_mask.style.display = "block";
		
		// ajax request
		var xhr = new XMLHttpRequest();			
		xhr.open(params.type || "GET", params.url + (/\?/.test(params.url)? "&" : "?") + "r=" + Date.now(), params.async, params.username, params.password);
		xhr.timeout = params.timeout;
		
		xhr.onload = function() {
			// so far, many browser hasn't supported responseType = 'json', so, use JSON.parse instead
			var response = null;
			
			if (xhr.status == 200) {
				if (params.dataType == "json" || params.dataType == "JSON") {
					try {
						response = JSON.parse(xhr.response);
						params.response = response;
						Mobilebone.createPage(Mobilebone.jsonHandle(response), aOrFormOrObj, params);
					} catch (e) {
						params.message = "JSON parse error：" + e.message;
						params.error.call(params, xhr, xhr.status);
					}
				} else if (params.dataType == "unknown") {
					// ajax send by url
					// no history hush					
					params.history = false;
					// I don't remember why add 'params.remove = false' here, 
					// but it seems that this will cause issues #147
					// no element remove
					// del → v2.5.8 // params.remove = false;
					try {
						// as json
						response = JSON.parse(xhr.response);
						params.response = response;
						Mobilebone.createPage(Mobilebone.jsonHandle(response), aOrFormOrObj, params);
					} catch (e) {
						// as html
						response = xhr.response;
						Mobilebone.createPage(response, aOrFormOrObj, params);
					}
				} else {
					response = xhr.response;
					// 'response' is string
					Mobilebone.createPage(response, aOrFormOrObj, params);
				}
				params.success.call(params, response, xhr.status);
			} else {
				params.message = "The status code exception!";
				params.error.call(params, xhr, xhr.status);
			}
			
			params.complete.call(params, xhr, xhr.status);
			
			// hide loading
			ele_mask.style.display = "none";
		}
		
		xhr.onerror = function(e) {
			params.message = "Illegal request address or an unexpected network error!";
			params.error.call(params, xhr, xhr.status);
			// hide loading
			ele_mask.style.display = "none";
		}
		
		xhr.ontimeout = function() {
			params.message = "The request timeout!";
			params.error.call(params, xhr, xhr.status);
			// hide loading
			ele_mask.style.display = "none";
		};
		
		// set request header for server
		xhr.setRequestHeader("Type", "ajax");
		xhr.setRequestHeader("From", "mobilebone");
		
		xhr.send(formData);
	};
	
	/**
	 * capture form submit events to a ajax request.
	 
	 * @params  form:        formElement. - Necessary
	 * @example Mobilebone.form(document.querySelector("form"));
	 *
	**/
	Mobilebone.submit = function(form) {
		if (!form || typeof form.action != "string") return; 
		var ajax = form.getAttribute("data-ajax");
		if (ajax == "false" || (Mobilebone.captureForm == false && ajax != "true")) return;
		
		form.addEventListener("submit", function(event) {
			// prevent detect
			var attrPrevent = this.getAttribute("data-preventdefault");
			// get 'preventDefault' function
			var funPrevent = Mobilebone.getFunction(attrPrevent);
			if (typeof funPrevent == "function" && funPrevent(this) == true) {
				// if the return value of prevent function is true, prevent everything~
				event.preventDefault();
				return false;
			}
			
			Mobilebone.ajax(this);
			event.preventDefault();
		});
	};
	
	
	/**
	 * Sometime we don't know direction of transition. Such as browser history change, or data-rel="auto".
	   In this case, we ensure the direction(back or prev) by the sorts of two pages(into or out)
	 
	 * @params  page_in  dom-object      - Necessary  
	            page_out  dom-object      - Optional 
				
	 * @returns boolean
	 *
	**/
	Mobilebone.isBack = function(page_in, page_out) {
		// back or forword, according to the order of two pages
		if (history.tempBack == true) {
			// backwords
			history.tempBack = null;
			return true;
		}
		if (typeof page_in == "undefined") return true;
		if (!page_out) return false;
		return page_in.compareDocumentPosition(page_out) == 4;
	};
	
	/**
	 * If dataType of ajax is 'json', we can't convert json-data to page-element. 
	   So, we export a function names 'jsonHandle' to handle json-data.
	 * Attention, it's a global interface. If your project has many json call, you should use JSON itself to make a distinction.
	   For example, every JSON include the only json-id:
	   {
		  "id": "homePage" ,
		  "data": []  
	   }
	   different with
	   {
		  "id": "listPage" ,
		  "data": []  
	   }
	 *
	 * @params  json    - Necessary 		
	 * @returns dom-object|string
	 *
	**/
	Mobilebone.jsonHandle = function(json) {
		return '<p style="text-align:center;">Dear master, if you see me, show that JSON parsing function is undefined!</p>';
	},
		
	/**
	 * Initialization. Load page according to location.hash. And bind link-catch events.
	**/
	Mobilebone.init = function() {	
		if (hasInited == true) return 'Don\'t repeat initialization!';

		var hash = location.hash.replace("#&", "#"), ele_in = null, container = null;
		
		if (hash == "" || hash == "#") {
			this.transition(document.querySelector("." + this.classPage));
		} else if (isSimple.test(hash) == true && (ele_in = document.querySelector(hash)) && ele_in.classList.contains(this.classPage)) { // 'ele_in' must be a page element
			this.transition(ele_in);	
		} else {
			// add on v2.6.1
			if (hash.split("container=").length == 2) {
				container = document.getElementById(hash.split("container=")[1].split("&")[0]);
			}
			// as a ajax
			this.ajax({
				url: hash.replace("#", ""),
				dataType: "unknown",
				container: container,
				error: function() {
					ele_in = document.querySelector("." + Mobilebone.classPage);	
					Mobilebone.transition(ele_in);
				}
			});	
		}
		
		// Initialization link-catch events.
		var $ = root.$ || root.jQuery || root.Zepto;
		if ($ && $.fn && $.fn.tap && ('ontouchstart' in window == true)) {
			// for some unknown 'tap' plugin
			$(document).tap(this.handleTapEvent);
			
			// zepto tap event.preventDefault can't prevent default click-events
			document.addEventListener("click", function(event) {
				var target = event.target;
				if (!target) return;
				if (target.tagName.toLowerCase() != "a" && !(target = target.getParentElementByTag("a"))) {
					return;
				}
				var ajax = target.getAttribute("data-ajax"), href = target.href;
				// if not ajax request
				if (target.getAttribute("data-rel") == "external" 
					|| ajax == "false"
					|| (href.replace("://", "").split("/")[0] !== location.href.replace("://", "").split("/")[0] && ajax != "true")
					|| (Mobilebone.captureLink == false && ajax != "true")
				) {
					// issues #123 #137 #142
					if (/^http/i.test(href)) location.href = href;
					return;
				}
				event.preventDefault();
			});			
		} else {
			document.addEventListener("click", this.handleTapEvent);	
		}

		// Important: 
		// In ios7+, swipe the edge of page will navigate Safari
		// that will trigger 'popstate' events and the page will transition twice
		var isSafari7 = !!navigator.userAgent.match(/safari/i) && !navigator.userAgent.match(/chrome/i) && typeof document.hidden !== "undefined" && !window.chrome;
		if ('ontouchstart' in window == true && isSafari7) {
			document.addEventListener("touchmove", function() {
				history.popstateswipe = true;	
			});	
			document.addEventListener("touchend", function() {
				history.popstateswipe = false;	
			});
		}
		
		// change flag-var for avoiding repeat init
		hasInited = true;
	};
	
	/**
	 * If 'a' element has href, slide auto when tapping~
	**/
	Mobilebone.handleTapEvent = function(event) {
		/**
		// iscroll(set tap: true) may cause twice tap problem 
		// which is none of Mobilebone's business
		// However, you can let code below go to avoid twice tap in Mobilebone
		// but the tap event bind out of Mobilebone also has bug
		// so my advice is that: 
		// 1. use Date.now to judge as Mobilebone did; 
		// or
		// 2. keep this code in the form of comment and fixed bug outside
		if (store.timerTap && Date.now() - store.timerTap < 100) {	
			event.preventDefault();
			return false;
		}
		store.timerTap = Date.now();
		*/
		var target = null;
		// you can pass target as params directly
		if (event && event.nodeType == 1) { 
			target = event;
			target.preventDefault = function() {};
		}
		// get target and href
		target = target || event.target || event.touches[0], href = target.href;
		if ((!href || /a/i.test(target.tagName) == false) && (target = target.getParentElementByTag("a"))) {
			href = target.href;
		}
		// the page that current touched or actived
		var self_page = document.querySelector(".in." + Mobilebone.classPage);
		
		if (self_page == null || !target) return;

		// optional params for Mobilebone.transition
		var options = {
			target: target	
		};
		
		// prevent detect
		var attrPrevent = target.getAttribute("data-preventdefault") 
			|| _queryToObject(target.getAttribute("data-params") || "").preventdefault;
		// get 'preventDefault' function
		var funPrevent = Mobilebone.getFunction(attrPrevent);
		if (typeof funPrevent == "function" && funPrevent(target) == true) {
			// if the return value of prevent function is true, prevent everything~
			event.preventDefault();
			return false;
		}
		
		// if mask element exist and displaying, prevent double trigger
		var ele_mask = target.getElementsByClassName(Mobilebone.classMask)[0];
		if (ele_mask && ele_mask.style.display != "none") {
			event.preventDefault();
			return false;
		}
		
		var idContainer = target.getAttribute("data-container"),
			classPageInside = target.getAttribute("data-classpage"),
			container = idContainer && document.getElementById(idContainer);
		if (container && classPageInside && classPageInside != Mobilebone.classPage) {
			self_page = container.querySelector(".in." + classPageInside) || container.querySelector(classPageInside);
			// if (self_page == null) return false;
			options.history = false;
			options.title = false;
			options.classPage = classPageInside;
		}
		
		// if captureLink
		var capture = (Mobilebone.captureLink == true);
		// get rel
		var rel = target.getAttribute("data-rel");
		// if back
		var back = false;
		if (rel == "back") {
			back = true;
		}
				
		// if external link
		var external = (rel == "external");
		
		// if the 'href' is not legal, return
		// include:
		// 1. undefined
		// 2. javascript: (except data-rel="back")
		// 3. cros, or not capture (except data-ajax="true")
		if (!href) return;
		
		href = href.replace("#&", "#");
		
		if (target.getAttribute("href").replace(/#/g, "") === "") {
			event.preventDefault();
			return;
		}
		if (/^javascript/.test(href)) {
			if (back == false) return;	
		} else {
			external = external || (href.replace("://", "").split("/")[0] !== location.href.replace("://", "").split("/")[0]);
			if ((external == true || capture == false) && target.getAttribute("data-ajax") != "true") return;
		}
		
		// judge that if it's a ajax request
		if (/^#/.test(target.getAttribute("href")) == true) {
			// hash slide
			var idTargetPage = href.split("#")[1], eleTargetPage = idTargetPage && document.getElementById(idTargetPage);
			if (back == false && rel == "auto") {
				back = Mobilebone.isBack(eleTargetPage, self_page);
			}
			
			if (eleTargetPage) {
				Mobilebone.transition(eleTargetPage, self_page, back, options);
			}
			event.preventDefault();
		} else if (/^javascript/.test(href)) {
			// back
			history.tempBack = true;
			history.back();
		} else if (target.getAttribute("data-ajax") != "false") {				
			// get a clean ajax url as page id
			var clean_url = Mobilebone.getCleanUrl(target);
			
			// if has loaded and the value of 'data-reload' is not 'true'
			var attr_reload = target.getAttribute("data-reload"), id = target.getAttribute("href");
			
			if ((attr_reload == null || attr_reload == "false") && store[clean_url]) {
				if (back == false && rel == "auto") {
					back = Mobilebone.isBack(store[clean_url], self_page);
				}
				options.id = clean_url;
				
				var body = container || document.body;
				
				if (body.contains(store[clean_url]) == false) {
					body.appendChild(store[clean_url]);
				}
				Mobilebone.transition(store[clean_url], self_page, back, options);
			} else {
				Mobilebone.ajax(target);
			}
			event.preventDefault();
		}
	};
	
	
	/**
	 * prototype extend method: get parent element by tagName
	**/
	Element.prototype.getParentElementByTag = function(tag) {
		if (!tag) return null;
		var element = null, parent = this;
		var popup = function() {
			parent = parent.parentElement;
			if (!parent) return null;
			var tagParent = parent.tagName.toLowerCase();
			if (tagParent === tag) {
				element = parent;
			} else if (tagParent == "body") {
				element = null;
			} else {
				popup();
			}
		};
		popup();
		return element;
	};
	
	/**
	 * private method: convert query string to key-value object
	**/
	var _queryToObject = function(string) {
		var obj = {};
		if (typeof string == "string") {
			string.split("&").forEach(function(part) {
				var arr_part = part.split("=");
				if (arr_part.length > 1) {
					obj[arr_part[0]] = part.replace(arr_part[0] + "=", "");
				}
			});
		}
		return obj;
	};
	
	/**
	 * auto init
	**/
	window.addEventListener("DOMContentLoaded", function() {
		if (hasInited == false) {
			Mobilebone.init();
		}
	});
	
	/**
	 * page change when history change
	**/
	window.addEventListener("popstate", function() {
		if (history.popstateswipe == true) {
			location.reload();
			history.popstateswipe = false;
			return;
		}
		if (history.popstate == false) {
			history.popstate = true;
			return;
		}
		
		var hash = location.hash.replace("#&", "").replace(/^#/, ""), page_in = null
			// add on v2.6.1
			, container = null;
		
		if (hash == "") {
			// if no hash, get first page as 'page_in'
			page_in = document.querySelector("." + Mobilebone.classPage);
			if (page_in.id) return;			
		} else {
			page_in = store[hash];
			
			// add on v2.6.1
			if (hash.split("container=").length == 2) {
				container = document.getElementById(hash.split("container=")[1].split("&")[0]);
			}

			if (page_in && isSimple.test(hash) == false) {
				// ajax store
				Mobilebone.createPage(page_in, {
					url: hash,
					dataType: "unknown",
					history: false,
					back: true,
					container: container
				});
				return;
			}
		}
		
		if (!page_in) {
			if (isSimple.test(hash) == false) {
				// as a url
				Mobilebone.ajax({
					url: hash,
					dataType: "unknown",
					back: Mobilebone.isBack(),
					container: container
				});	
				return;
			}
			page_in =  document.querySelector("#" + hash)
		}
		
		var page_out = document.querySelector(".in." + Mobilebone.classPage);
		
		if ((page_in && page_in == page_out) || Mobilebone.pushStateEnabled == false) return;

		// hash ↔ id													
		if (page_in) {
			Mobilebone.transition(page_in, page_out, Mobilebone.isBack(page_in, page_out), {
				id: hash,  // fix issue #83
				history: false,
				remove: false
			});
		}
	});
	
	document.MBLOADED = true;
		
	return Mobilebone;
});