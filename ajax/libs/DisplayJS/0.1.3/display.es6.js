class DisplayJS { 
	constructor (obj) {
		this.obj = obj;
	}
	var (push) {
		const var_push = () => {
			this.if()
			this.else()
			const elements = document.querySelectorAll("[var]");
			for (let i = 0; i < elements.length; i++) {
				const attr = elements[i].getAttribute("var");
				elements[i].innerHTML = this.obj[attr];
			}
		}
		if (!push) {
			var_push();
		}
		else if (push == true) {
			var_push();
			this.live(this.obj, () => {var_push();});
		}
		else {
			window.setInterval(() => {
				var_push();
			}, push);
		}
				
	}
	target (callback) {
		if (!callback) {
			var callback = () => {
				this.var()
			}
		}
		const addEventListener = ((() => {
		    if(document.addEventListener) {
		        return (element, event, handler) => {
		            element.addEventListener(event, handler, false);
		        };
		    }
		    else {
		        return (element, event, handler) => {
		            element.attachEvent(`on${event}`, handler);
		        };
		    }
		})());
		const obj = this.obj;
		[].forEach.call(document.querySelectorAll('[target]'), (x, i, a) => {
		    addEventListener(a[i], "change", function () {
		    	const attr1 = a[i].getAttribute("target");
		    	if (this.type == "checkbox") {
		    		obj[attr1] = this.checked;
		    	}
		    	else {
		    		obj[attr1] = this.value;
		    	}
		        callback();
		    });
		    addEventListener(a[i], "keydown", function () {
		    	const attr2 = a[i].getAttribute("target");
		    	if (this.type == "checkbox") {
		    		obj[attr2] = this.checked;
		    	}
		    	else {
		    		obj[attr2] = this.value;
		    	}
		        callback();
		    });
		    addEventListener(a[i], "input", function () {
		    	const attr3 = a[i].getAttribute("target");
		        if (this.type == "checkbox") {
		    		obj[attr3] = this.checked;
		    	}
		    	else {
		    		obj[attr3] = this.value;
		    	}
		        callback();
		    });
		    addEventListener(a[i], "paste", function () {
		    	const attr4 = a[i].getAttribute("target");
		        if (this.type == "checkbox") {
		    		obj[attr4] = this.checked;
		    	}
		    	else {
		    		obj[attr4] = this.value;
		    	}
		        callback();
		    });
		});
	}
	if (push) {
		const if_push = () => {
			const elements = document.querySelectorAll("[if]");
			for (let i = 0; i < elements.length; i++) {
				const attr = elements[i].getAttribute("if");
				var el = []
				el.push(elements[i])
				if (this.obj[attr] == true) {
					this.show(el);
				}
				else {
					this.hide(el);
				}
			}
		}
		if (!push) {
			if_push();
		}
		else if (push == true) {
			if_push();
			this.live(this.obj, () => {if_push();});
		}
		else {
			window.setInterval(() => {
				if_push();
			}, push);
		}
	}
	else (push) {
		const else_push = () => {
			const elements = document.querySelectorAll("[else]");
			for (let i = 0; i < elements.length; i++) {
				const attr = elements[i].getAttribute("else");
				var el = []
				el.push(elements[i])
				if (this.obj[attr] == true) {
					this.hide(el);
				}
				else {
					this.show(el);
				}
			}
		}
		if (!push) {
			else_push();
		}
		else if (push == true) {
			else_push();
			this.live(this.obj, () => {else_push();});
		}
		else {
			window.setInterval(() => {
				else_push();
			}, push);
		}
	}
	custom (targetAttr,push) {
		const var_push = () => {
			const elements = document.querySelectorAll(`[${targetAttr}]`);
			for (let i = 0; i < elements.length; i++) {
				const attr = elements[i].getAttribute(targetAttr);
				elements[i].innerHTML = this.obj[attr];
			}
		}
		if (!push) {
			var_push();
		}
		else if (push == true) {
			var_push();
			this.live(this.obj, () => {var_push()});
		}
		else {
			window.setInterval(() => {
				var_push();
			}, push);
		}
				
	}
	live (watched,  callback) {
		const ObjUtils = {
			watch(object, property, onPropertyChange) {
				const descriptor = Object.getOwnPropertyDescriptor(object, property);
				
				if(typeof descriptor === "undefined") 
					throw new Error(`Invalid descriptor for property: ${property}, object: ${object}`);

				if (typeof onPropertyChange !== "function") 
					throw new Error(`Invalid onPropertyChange handler: ${onPropertyChange}`);

				let value = object[property];

				Object.defineProperty(object, property, {
					enumerable: true,
					configurable: true,
					get() { return value },
					set(newValue) {
						if (newValue === value) return;
						onPropertyChange(object, property, newValue, value);
						return value = newValue;
					}
				});
			},

			watchAll(object, onPropertyChange) {
				if (typeof onPropertyChange !== "function") 
					throw new Error(`Invalid onPropertyChange handler: ${onPropertyChange}`);

				for (const property in object) {
					this.watch(object, property, onPropertyChange);
				}
			}
		};
		ObjUtils.watchAll(watched, (obj, prop, newVal, oldVal) => {
			callback(obj, prop, newVal, oldVal);
		});
	}
	all (element, callback) {
		element.forEach((data) =>{
			const node = [];
			node.push(data)
			callback(node);
		});
	}
	text (element, text) {
		element[0].innerHTML = text;
	}
	prepend (element, html) {
	    const div = document.createElement('div');
	    div.innerHTML = html;
	    element[0].insertBefore(div, element.firstChild);
	}
	append (element, html) {
	    element[0].innerHTML += html;
	}
	after (element, html) {
		element[0].insertAdjacentHTML('afterend', html);
	}
	before (element, html) {
		element[0].insertAdjacentHTML('beforebegin', html);
	}
	clone (element) {
		element[0].cloneNode(true);
	}
	is (el1, el2) {
		if (el1 === el2) {
			return true;
		}
		else {
			return false;
		}
	}
	select (str) {
		const obj = document.querySelectorAll(str);
		return obj;
	}
	empty (element) {
		element[0].innerHTML = null;
	}
	remove (element) {
		element[0].parentNode.removeChild(element);
	}
	on (element, event, callback) {
		element[0].addEventListener(event, callback);
	}
	show (element) {
        element[0].style.display='block'; 
        return true;
	}
	hide (element) {
        element[0].style.display='none';
        return true;
	}
	style (element, st1, val) {
		element[0].style[st1] = val;
	}
	ajax (url, method, data, callback, header) {
		const request = new XMLHttpRequest();
		request.open(method, url, true);
		if (header) {
			request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
		}
		request.onload = () => {
		  if (request.status >= 200 && request.status < 400) {
		    const data = request.responseText;
		    callback(data);
		  } else {
		    console.error("DisplayJS error: The ajax request returned an error.");
		  }
		};

		request.onerror = () => {
		  // There was a connection error of some sort
		  console.error("DisplayJS error: The ajax request returned an error.");
		};

		request.send(data);
	}
	hasClass (element, className) {
	    if (element[0].classList)
	        return element[0].classList.contains(className);
	    return !!element[0].className.match(new RegExp(`(\\s|^)${className}(\\s|$)`));
	}
	addClass (element, className) {
	    if (element[0].classList)
	        element[0].classList.add(className)
	    else if (!this.hasClass(element, className))
	        element[0].className += ` ${className}`;
	}
	removeClass (element, className) {
	    if (element[0].classList)
	        element[0].classList.remove(className)
	    else if (this.hasClass(element, className))
	    {
	        const reg = new RegExp(`(\\s|^)${className}(\\s|$)`);
	        element[0].className = element[0].className.replace(reg, ' ');
	    }
	}
	toggleClass (element, className) {
	  if (this.hasClass(element, className)) {
	  	this.removeClass(element, className);
	  }
	  else {
	  	this.addClass(element, className);
	  }
	}
	each (elements, callback) {
		for (let i = 0; i < elements.length; i++) {
			callback(elements[i]);
		}
	}
	style (element, name, value) {
		element[0].style[name] = value;
	}
	getStyle (element, styleProp) {
        let value;
        const defaultView = (element[0].ownerDocument || document).defaultView;
        // W3C standard way:
        if (defaultView && defaultView.getComputedStyle) {
          // sanitize property name to css notation
          // (hypen separated words eg. font-Size)
          styleProp = styleProp.replace(/([A-Z])/g, "-$1").toLowerCase();
          return defaultView.getComputedStyle(element, null).getPropertyValue(styleProp);
        } else if (element[0].currentStyle) { // IE
          // sanitize property name to camelCase
          styleProp = styleProp.replace(/\-(\w)/g, (str, letter) => letter.toUpperCase());
          value = element[0].currentStyle[styleProp];
          // convert other units to pixels on IE
          if (/^\d+(em|pt|%|ex)?$/i.test(value)) { 
            return ((value => {
                const oldLeft = element[0].style.left;
                const oldRsLeft = element[0].runtimeStyle.left;
                element[0].runtimeStyle.left = element[0].currentStyle.left;
                element[0].style.left = value || 0;
                value = `${element.style.pixelLeft}px`;
                element[0].style.left = oldLeft;
                element[0].runtimeStyle.left = oldRsLeft;
                return value;
            }))(value);
          }
          return value;
        }
    }
    load (element, url) {
    	const request = new XMLHttpRequest();
		request.open("GET", url, true);

		request.onload = () => {
		  if (request.status >= 200 && request.status < 400) {
		    const data = request.responseText;
		    json = mapDOM(data, true);
			element[0].innerHTML = json[element[0]];

			function mapDOM(element, json) {
			    const treeObject = {};

			    // If string convert to document Node
			    if (typeof element === "string") {
			        if (window.DOMParser) {
			              parser = new DOMParser();
			              docNode = parser.parseFromString(element,"text/xml");
			        } else { // Microsoft strikes again
			              docNode = new ActiveXObject("Microsoft.XMLDOM");
			              docNode.async = false;
			              docNode.loadXML(element); 
			        } 
			        element = docNode.firstChild;
			    }

			    //Recursively loop through DOM elements and assign properties to object
			    function treeHTML(element, object) {
			        object["type"] = element.nodeName;
			        const nodeList = element.childNodes;
			        if (nodeList != null) {
			            if (nodeList.length) {
			                object["content"] = [];
			                for (var i = 0; i < nodeList.length; i++) {
			                    if (nodeList[i].nodeType == 3) {
			                        object["content"].push(nodeList[i].nodeValue);
			                    } else {
			                        object["content"].push({});
			                        treeHTML(nodeList[i], object["content"][object["content"].length -1]);
			                    }
			                }
			            }
			        }
			        if (element.attributes != null) {
			            if (element.attributes.length) {
			                object["attributes"] = {};
			                for (var i = 0; i < element.attributes.length; i++) {
			                    object["attributes"][element.attributes[i].nodeName] = element.attributes[i].nodeValue;
			                }
			            }
			        }
			    }
			    treeHTML(element, treeObject);

			    return (json) ? JSON.stringify(treeObject) : treeObject;
			}
		  } else {
		    console.error("DisplayJS error: The load request returned an error.");
		  }
		};

		request.onerror = () => {
		  console.error("DisplayJS error: The load request returned an error. Please, check your connection.");
		};

		request.send();
    }
    fadeIn (el) {
    	el.style.opacity = 0;

	    let last = +new Date();
		const tick = () => {
			el.style.opacity = +el.style.opacity + (new Date() - last) / 400;
			last = +new Date();
		    if (+el.style.opacity < 1) {
		    	(window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
		    }
		};
		tick();
    }
    extend(out={}) {
        for (let i = 1; i < arguments.length; i++) {
          if (!arguments[i])
            continue;

          for (const key in arguments[i]) {
            if (arguments[i].hasOwnProperty(key))
              out[key] = arguments[i][key];
          }
        }

        return out;
    }
}
// Retro compatibility
class _DOM_DJS extends DisplayJS {}