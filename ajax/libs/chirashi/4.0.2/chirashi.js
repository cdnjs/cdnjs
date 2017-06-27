/*!
 * Chirashi.js v4.0.2
 * (c) 2016 Alex Toudic
 * Released under the MIT License.
 */
(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
   typeof define === 'function' && define.amd ? define(factory) :
   (global.Chirashi = factory());
}(this, function () { 'use strict';

   /**
    * User Agent in lower case.
    */

   var ua$1 = navigator.userAgent.toLowerCase();

   /**
    * Variable true if the device is running Android based on User Agent.
    */
   var isAndroid = /android/i.test(ua$1);

   /**
    * Variable true if the device is an Android Tablet based on User Agent.
    */
   var isAndroidTablet = isAndroid && !/mobile/i.test(ua$1);

   /**
    * Navigator's vendor in lower case.
    */

   var vendor = navigator.vendor && navigator.vendor.toLowerCase();

   /**
    * Variable true if the browser is Chrome or Chromium based on User Agent.
    */
   var isChrome = /chrome|chromium/i.test(ua$1) && /google inc/.test(vendor);

   /**
    * Variable true if the browser is Firefox based on User Agent.
    */
   var isFirefox = /firefox/i.test(ua$1);

   /**
    * Version number if the browser is Internet Explorer or false based on User Agent.
    */
   var isIE = ua$1.indexOf('msie') != -1 ? parseInt(ua$1.split('msie')[1], 10) : false;

   /**
    * Variable true if the device is running iOS based on User Agent.
    */
   var isIOS = /iphone|ipad|ipod/i.test(ua$1);

   /**
    * Variable true if the device is an iPad based on User Agent.
    */
   var isIPad = /ipad/i.test(ua$1);

   /**
    * Variable true if the device is an iPhone based on User Agent.
    */
   var isIPhone = /iphone/i.test(ua$1);

   /**
    * Variable true if the device is an iPod based on User Agent.
    */
   var isIPod = /ipod/i.test(ua$1);

   /**
    * Variable true if the device is running Windows based on User Agent.
    */

   var isWindows = /win/i.test('navigator' in window && 'appVersion' in navigator && navigator.appVersion.toLowerCase() || '');

   /**
    * Variable true if the device handle touches events.
    */

   var isTouchable = !!('ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch);

   /**
    * Variable true if the device is a mobile based on User Agent.
    */
   var isMobile = isIOS || isAndroid || isWindows && isTouchable;

   /**
    * Variable true if the browser is Safari based on User Agent.
    */
   var isSafari = /safari/i.test(ua$1) && /apple computer/.test(vendor);

   /**
    * Variable true if the device is a Windows Phone based on User Agent.
    */
   var isWindowsPhone = isWindows && /phone/i.test(ua);

   /**
    * Variable true if the device is a Windows Tablet based on User Agent.
    */
   var isWindowsTablet = isWindows && !isWindowsPhone && isTouchable;

   /**
    * Variable true if the device is a tablet based on User Agent.
    */
   var isTablet = isIPad || isAndroidTablet || isWindowsTablet;

   var prefix = (Array.prototype.slice.call(window.getComputedStyle(document.documentElement, '')).join('').match(/-(moz|webkit|ms)-/) || styles.OLink === '' && ['', 'o'])[1];

   document.documentElement.style[prefix + 'matrix'] = 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)';
   var support3D = document.documentElement.style[prefix + 'matrix'];
   document.documentElement.style[prefix + 'matrix'] = '';

   /**
    * Get array of dom elements from selector.
    * @param {string} selector - The query selector
    * @return {Array} domElements - The dom elements matching selector
    */
   function getSelectorAll(selector) {
     return [].slice.call(document.querySelectorAll(selector));
   }

   /**
    * Test if element is a dom element.
    * @param {HTMLElement | window | document | SVGElement} element - If element doesn't match of this types false will be returned
    * @return {bool} isDomElement - true if element is a dom element, false otherwise
    */
   function isDomElement(element) {
     return element instanceof HTMLElement || element === window || element === document || element instanceof SVGElement;
   }

   /**
    * Get a dom element from selector.
    * @param {string} selector - The query selector
    * @return {HTMLElement | window | document | SVGElement} domElement - The first dom element matching selector
    */
   function getSelector(selector) {
     return document.querySelector(selector);
   }

   /**
    * Get Dom Element from iterable or selector.
    * @param {string | Array | HTMLElement | window | document | SVGElement} element - The iterable or selector
    * @return {HTMLElement | window | document | SVGElement} domElement - The dom element from element
    */
   function getElement(element) {
     if (typeof element == 'string') return getSelector(element);

     if (element instanceof Array) return getElement(element[0]);

     return isDomElement(element) ? element : null;
   }

   /**
    * Iterates over elements and apply callback on each one.
    * @param {string | Array | NodeList | HTMLCollection} elements - The iterable
    * @param {function} callback - The function to call for each iteratee
    * @param {bool} [forceOrder=false] - Respect elements order
    * @return {string | Array | NodeList | HTMLCollection} elements for chaining
    */
   function forEach$1(elements, callback) {
       var forceOrder = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

       if (!elements) return;

       if (!(elements instanceof Array || elements instanceof NodeList || elements instanceof HTMLCollection)) {
           callback(elements, 0);
       } else {
           if (!forceOrder) {
               var i = elements.length;
               while (i--) {
                   callback(elements[i], i);
               }
           } else {
               var _i = -1,
                   len = elements.length;
               while (++_i < len) {
                   callback(elements[_i], _i);
               }
           }
       }

       return elements;
   }

   /**
    * Get Dom Element from iterable or selector.
    * @param {string | Array | HTMLElement | window | document | SVGElement} elements - The iterable or selector
    * @return {HTMLElement | window | document | SVGElement} domElements - The dom elements from elements
    */
   function getElements(elements) {
     if (typeof elements == 'string') return getSelectorAll(elements);

     if (elements instanceof Array) {
       var _ret = function () {
         var parsedElements = [];
         forEach$1(elements, function (element) {
           var newElements = getElements(element);
           if (newElements) parsedElements = parsedElements.concat(newElements);
         });

         return {
           v: parsedElements
         };
       }();

       if (typeof _ret === "object") return _ret.v;
     }

     if (elements instanceof NodeList) return [].slice.call(elements);

     return isDomElement(elements) ? [elements] : null;
   }

   /**
    * Iterates over dom elements and apply callback on each one.
    * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
    * @param {function} callback - The function to call for each iteratee
    * @param {bool} [forceOrder=false] - Respect elements order
    * @return {string | Array | NodeList | HTMLCollection} elements for chaining
    */
   function forElements(elements, callback) {
     var forceOrder = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

     return forEach$1(getElements(elements), callback, forceOrder);
   }

   /**
    * Iterates over object's keys and apply callback on each one.
    * @param {Object} object - The iterable
    * @param {function} callback - The function to call for each iteratee
    * @param {bool} [forceOrder=false] - Respect keys order
    * @return {Object} object - The iterable for chaining
    */
   function forIn(object, callback) {
       var forceOrder = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

       if (typeof object != 'object') return;

       var keys = Object.keys(object);

       if (!forceOrder) {
           var i = keys.length;

           while (i--) {
               var key = keys[i];
               callback(key, object[key]);
           }
       } else {
           var _i = -1,
               len = keys.length;
           while (++_i < len) {
               var _key = keys[_i];
               callback(_key, object[_key]);
           }
       }

       return object;
   }

   /**
    * Add all classes on each elements.
    * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
    * @param {string} classes - The classes seperated with spaces
    * @return {string | Array | NodeList | HTMLCollection} elements - The iterable for chaining
    */
   function addClass(elements, classes) {
       classes = classes.split(' ');

       return forElements(elements, function (element) {
           if (!element.classList) return;

           var i = classes.length;
           while (i--) {
               element.classList.add(classes[i]);
           }
       });
   }

   /**
    * Create a dom element from an HTML string or tag.
    * @param {string | HTMLElement | SVGElement} string - The html string or tag
    * @param {object} [attributes={}] - The object of attributes
    * @return {HTMLElement | SVGElement} element - The dom element created from the string
    */
   function createElement(string) {
       var attributes = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

       var strAttributes = "";

       forIn(attributes, function (name, value) {
           strAttributes += ' ' + name + '="' + value + '"';
       });

       if (string.indexOf('<') == -1) string = '<' + string + strAttributes + '></' + string + '>';

       var temp = document.createElement('div');
       temp.innerHTML = string;

       return temp.firstChild;
   }

   /**
    * Append node to each element of elements.
    * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
    * @param {string | HTMLElement | SVGElement} node - Dom element or html string or tag to create it
    * @param {object} [attributes={}] - The object of attributes, only used with node creation
    * @return {string | Array | NodeList | HTMLCollection} elements - The iterable for chaining
    */
   function append(elements, node) {
       var attributes = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

       if (typeof node == 'string') node = createElement(node, attributes);else if (!isDomElement(node)) return elements;

       return forElements(elements, function (element) {
           if (!element.appendChild) return;

           element.appendChild(node);
       });
   }

   /**
    * Set attributes from attributes object keys to values on elements
    * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
    * @param {Object} attributes - attribute names and values association
    * @return {string | Array | NodeList | HTMLCollection} elements - The iterable for chaining
    */
   function setAttr(elements, attributes) {
       var attributesName = Object.keys(attributes);

       return forElements(elements, function (element) {
           if (!element.setAttribute) return;

           var i = attributesName.length,
               attributeName = void 0,
               value = void 0;
           while (i--) {
               attributeName = attributesName[i];
               value = attributes[attributeName];

               if (value) element.setAttribute(attributeName, value);else element.removeAttribute(name);
           }
       });
   }

   /**
    * Get value of the name attribute on element.
    * @param {string | HTMLElement | window | document | SVGElement} element - The selector or dom element
    * @param {string} name - The attribute's name
    * @return {string} value - The value for the attribute
    */
   function getAttr(element, name) {
     element = getElement(element);

     return !!element && element.getAttribute && element.getAttribute(name);
   }

   /**
    * Get attribute option from element if option is a string,
    * set attributes from option keys to option values on elements
    * if option is an object.
    * @param {string | Array | HTMLElement | window | document | SVGElement} elements - The iterable, selector or dom element
    * @param {string | Object} option - attribute name or attribute names and values association
    * @return {string | Array | HTMLElement | window | document | SVGElement} value or elements - Value for option attribute or elements for chaining
    */
   function attr(elements, option) {
     return typeof option == 'object' ? setAttr(elements, option) : getAttr(elements, option);
   }

   /**
    * Clone element.
    * @param {string | HTMLElement | SVGElement} element - The dom element or selector
    * @return {HTMLElement | SVGElement} clone - The clone of element
    */
   function clone(element) {
     element = getElement(element);

     return !!element && element.cloneNode(true);
   }

   /**
    * Get closest element matching the tested value traveling up the DOM tree from element.
    * @param {string | HTMLElement | SVGElement} element - The dom element or selector
    * @param {string | HTMLElement | SVGElement} tested - The selector or dom element to match
    * @param {{value: number}} [level] - The value is incremented for each parent tested
    * @return {bool | HTMLElement | SVGElement} matchedElement - The matched element or false
    */
   function closest(element, tested, level) {
     if (level && typeof level.value != 'undefined') ++level.value;

     element = getElement(element);

     return !element || element === window || element === document ? false : typeof tested == 'string' && element.matches(tested) || element == tested ? element : closest(element.parentNode, tested, level);
   }

   /**
    * Set data attributes from attributes object keys to values on elements
    * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
    * @param {Object} attributes - attribute names and values association
    * @return {string | Array | NodeList | HTMLCollection} elements - The iterable for chaining
    */
   function setData(elements, attributes) {
       var attributesName = Object.keys(attributes);

       return forElements(elements, function (element) {
           if (!element.setAttribute) return;

           var i = attributesName.length,
               attributeName = void 0;
           while (i--) {
               attributeName = attributesName[i];
               value = attributes[attributeName];

               if (value) element.setAttribute('data-' + attributeName, value);else element.removeAttribute(name);
           }
       });
   }

   /**
    * Get value of the name date attribute on element.
    * @param {string | HTMLElement | window | document | SVGElement} element - The selector or dom element
    * @param {string} name - The data attribute's name
    * @return {string} value - The value for the data attribute
    */
   function getData(element, name) {
     return getAttr(element, 'data-' + name);
   }

   /**
    * Get data attribute option from element if option is a string,
    * set data attributes from option keys to option values on elements
    * if option is an object.
    * @param {string | Array | HTMLElement | window | document | SVGElement} elements - The iterable, selector or dom element
    * @param {string | Object} option - data attribute name or data attribute names and values association
    * @return {string | Array | HTMLElement | window | document | SVGElement} value or elements - Value for option data attribute or elements for chaining
    */
   function data(elements, option) {
     return typeof option == 'object' ? setData(elements, option) : getData(elements, option);
   }

   /**
    * Set inner html of elements to string.
    * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
    * @param {string} string - The content to inject in the elements
    * @return {string | Array | NodeList | HTMLCollection} elements - The iterable for chaining
    */
   function setHtml(elements, string) {
       return forElements(elements, function (element) {
           element.innerHTML = string;
       });
   }

   /**
    * Remove children of provided dom elements.
    * @param {string | Array | HTMLElement | window | document | SVGElement} elements - The iterable, selector or dom element
    * @return {string | Array | HTMLElement | window | document | SVGElement} elements - The iterable for chaining
    */
   function empty(elements) {
     return setHtml(elements, '');
   }

   /**
    * Filter items matching the tested value from elements.
    * @param {string | Array | HTMLElement | window | document | SVGElement} elements - The iterable, selector or dom element
    * @param {string | HTMLElement | SVGElement} tested - The selector or dom element to match
    */
   function filter(elements, tested) {
       var matching = [];

       forElements(elements, function (element) {
           if (!!element && element !== window && element !== document && (typeof tested == 'string' && element.matches(tested) || element == tested)) matching.push(element);
       });

       return matching;
   }

   /**
    * Find the first element's child matching the selector.
    * @param {string | HTMLElement | window | document | SVGElement} element - The selector or dom element
    * @param {string} selector - The selector
    * @return {HTMLElement | SVGElement} element - The first child of element matching the selector
    */
   function findOne(element, selector) {
     element = getElement(element);

     return !!element && element.querySelector(selector);
   }

   /**
    * Find the element's children matching the selector.
    * @param {string | HTMLElement | window | document | SVGElement} element - The selector or dom element
    * @param {string} selector - The selector
    * @return {Array} elements - The children of element matching the selector
    */
   function find(element, selector) {
     element = getElement(element);

     return !element ? [] : [].slice.call(element.querySelectorAll(selector));
   }

   /**
    * Get the inner html of the element.
    * @param {string | HTMLElement | SVGElement} element - The selector or dom element
    * @return {string} innerHTML - The inner html of the element
    */
   function getHtml(element) {
     element = getElement(element);

     return !!element && element.innerHTML;
   }

   /**
    * Get the value for the property name on the element.
    * @param {string | HTMLElement | window | document | SVGElement} element - The selector or dom element
    * @param {string} name - The name of the property
    * @return {string} innerHTML - The inner html of the element
    */
   function getProp(element, name) {
     element = getElement(element);

     return !!element && element[name];
   }

   /**
    * Test if element has all the classes.
    * @param {string | HTMLElement | window | document | SVGElement} element - The selector or dom element
    * @param {string} classes - The classes seperated with spaces
    * @return {bool} hasClass - True if element has all the classes, false otherwise
    */
   function hasClass(element, classes) {
       element = getElement(element);
       if (!element || !element.classList) return;

       classes = classes.split(' ');

       var i = classes.length,
           found = false;
       while (i-- && (found = element.classList.contains(classes[i]))) {}

       return found;
   }

   /**
    * Set inner html of elements if string is provided, get it otherwise.
    * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
    * @param {string} [string] - The content to inject in the elements
    * @return {string | Array | HTMLElement | window | document | SVGElement} innerHTML or elements - The inner html of the elements or elements for chaining
    */
   function html(elements, string) {
     return typeof string == 'string' ? setHtml(elements, string) : getHtml(elements);
   }

   /**
    * Get the position of element in his parent's children.
    * @param {string | HTMLElement | SVGElement} element - The selector or dom element
    * @return {number} index - The position of element in his parent's children
    */
   function indexInParent(element) {
       element = getElement(element);
       if (!element) return;

       var currentElement = element,
           parent = element.parentNode,
           i = 0;

       while (currentElement.previousElementSibling) {
           ++i;
           currentElement = currentElement.previousElementSibling;
       }

       return element === parent.children[i] ? i : -1;
   }

   /**
    * Insert node to each element's parent of elements after element.
    * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
    * @param {string | HTMLElement | SVGElement} node - Dom element or html string or tag to create it
    * @return {string | Array | NodeList | HTMLCollection} elements - The iterable for chaining
    */
   function insertAfter(elements, node) {
       if (typeof node == 'string') node = createElement(node);

       return forElements(elements, function (element) {
           if (!element.parentNode) return;

           element.parentNode.insertBefore(node, element.nextElementSibling);
       });
   }

   /**
    * Insert node to each element's parent of elements after element.
    * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
    * @param {string | HTMLElement | SVGElement} node - Dom element or html string or tag to create it
    * @return {string | Array | NodeList | HTMLCollection} elements - The iterable for chaining
    */
   function insertBefore(elements, node) {
       if (typeof node == 'string') node = createElement(node);

       return forElements(elements, function (element) {
           if (!element.parentNode) return;

           element.parentNode.insertBefore(node, element);
       });
   }

   /**
    * Get the next sibling of element.
    * @param {string | HTMLElement | SVGElement} element - The selector or dom element
    * @return {HTMLElement | SVGElement} element - The next element
    */
   function next(element) {
     element = getElement(element);
     if (!element) return;

     return element.nextElementSibling;
   }

   /**
    * Get the parent node of the element.
    * @param {string | HTMLElement | SVGElement} element - The selector or dom element
    * @return {HTMLElement | SVGElement} element - The parent node
    */
   function parent(element) {
     element = getElement(element);

     return !!element && element.parentNode;
   }

   /**
    * Get the previous sibling of element.
    * @param {string | HTMLElement | SVGElement} element - The selector or dom element
    * @return {HTMLElement | SVGElement} element - The previous element
    */
   function prev(element) {
     element = getElement(element);

     return !!element && element.previousElementSibling;
   }

   /**
    * Set properties from props object keys to values on elements
    * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
    * @param {Object} props - properties names and values association
    * @return {string | Array | NodeList | HTMLCollection} elements - The iterable for chaining
    */
   function setProp(elements, props) {
     return forElements(elements, function (element) {
       return Objec.assign(element, props);
     });
   }

   /**
    * Get property option from element if option is a string,
    * set properties from option keys to option values on elements
    * if option is an object.
    * @param {string | Array | HTMLElement | window | document | SVGElement} elements - The iterable, selector or dom element
    * @return {string | Array | HTMLElement | window | document | SVGElement} value or elements - Value for option property or elements for chaining
    */
   function prop(elements, option) {
     return typeof option == 'object' ? setProp(elements, option) : getProp(elements, option);
   }

   /**
    * Remove all classes on each elements.
    * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
    * @param {string} classes - The classes seperated with spaces
    * @return {string | Array | NodeList | HTMLCollection} elements - The iterable for chaining
    */
   function removeClass(elements, classes) {
       classes = classes.split(' ');

       return forElements(elements, function (element) {
           if (!element.classList) return;

           var i = classes.length;
           while (i--) {
               element.classList.remove(classes[i]);
           }
       });
   }

   /**
    * Remove all elements from dom.
    * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
    * @return {string | Array | NodeList | HTMLCollection} elements - The removed elements
    */
   function remove(elements) {
       return forElements(elements, function (element) {
           if (!element.parentNode) return;

           element.parentNode.removeChild(element);
       });
   }

   /**
    * Toggle all classes on each elements.
    * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
    * @param {string} classes - The classes seperated with spaces
    * @return {string | Array | NodeList | HTMLCollection} elements - The iterable for chaining
    */
   function toggleClass(elements, classes) {
       classes = classes.split(' ');

       return forElements(elements, function (element) {
           if (!element.classList) return;

           var i = classes.length;
           while (i--) {
               element.classList.toggle(classes[i]);
           }
       });
   }

   /**
    * Bind events listener on each element of elements.
    * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
    * @param {string} events - The events that should be bound seperated with spaces
    * @param {function} callback - The callback used for event binding
    * @return {string | Array | NodeList | HTMLCollection} elements - The iterable for chaining
    */
   function on(elements, events, callback) {
       events = events.split(' ');

       return forElements(elements, function (element) {
           if (!element.addEventListener) return;

           var i = events.length;
           while (i--) {
               element.addEventListener(events[i], callback);
           }
       });
   }

   /**
    * Bind drag listener on each element of elements.
    * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
    * @param {function} move - The move callback
    * @param {function} begin - The begin callback
    * @param {function} end - The end callback
    * @return {object} offObject - An object with off method for unbinding
    */
   function drag(elements, move, begin, end) {
       var undragProperties = [];

       forElements(elements, function (element) {
           var dragging = false;

           var undragProperty = {
               element: element,

               begin: function (e) {
                   e.preventDefault();
                   e.stopPropagation();

                   if ('touches' in e && e.touches.length) e = e.touches[0];

                   dragging = true;

                   if (begin) begin({ x: e.pageX, y: e.pageY });
               },
               move: function (e) {
                   if (!dragging) return;

                   e.preventDefault();
                   e.stopPropagation();

                   if ('touches' in e && e.touches.length) e = e.touches[0];

                   if (move) move({ x: e.pageX, y: e.pageY });
               },
               end: function (e) {
                   if (!dragging) return;

                   e.preventDefault();
                   e.stopPropagation();

                   if ('touches' in e && e.touches.length) e = e.touches[0];

                   dragging = false;

                   if (end) end({ x: e.pageX, y: e.pageY });
               }
           };

           on(element, 'touchstart mousedown', undragProperty.begin);
           on(document.body, 'touchmove mousemove', undragProperty.move);
           on(document.body, 'touchend mouseup', undragProperty.end);

           undragProperties.push(undragProperty);
       });

       return {
           off: function () {
               forEach(undragProperties, function (undragProperty) {
                   off(undragProperty.element, 'touchstart, mousedown', undragProperty.begin);
                   off(document.body, 'touchmove, mousemove', undragProperty.move);
                   off(document.body, 'touchend, mouseup', undragProperty.end);
               });
           }
       };
   }

   /**
    * Bind hover listener on each element of elements.
    * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
    * @param {function} enter - The enter callback
    * @param {function} leave - The leave callback
    * @return {object} offObject - An object with off method for unbinding
    */
   function hover(elements, enter, leave) {
       forElements(elements, function (element) {
           if (enter) on(element, 'mouseenter', enter);
           if (leave) on(element, 'mouseleave', leave);
       });

       return {
           off: function () {
               forElements(elements, function (element) {
                   if (enter) off(element, 'mouseenter', enter);
                   if (leave) off(element, 'mouseleave', leave);
               });
           }
       };
   }

   /**
    * Bind hover listener on each element of elements.
    * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
    * @param {string} events - The events that should be bound seperated with spaces
    * @param {function} callback - The callback used for event binding
    * @return {string | Array | NodeList | HTMLCollection} elements - The iterable for chaining
    */
   function off$1(elements, events, callback) {
       events = events.split(' ');

       return forElements(elements, function (element) {
           if (!element.removeEventListener) return;

           var i = events.length;
           while (i--) {
               element.removeEventListener(events[i], callback);
           }
       });
   }

   /**
    * Bind hover listener on each element of elements.
    * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
    * @param {function} eachCallback - The callback on each load event
    * @param {function} allCallback - The callback when all elements have been loaded
    * @param {bool} [once] = true - Trigger only once for each media if true
    * @param {bool} [testSrc] = true - If true callback will be called with error when an element doesn't have src
    * @return {object} offObject - An object with off method for unbinding
    */
   function load(elements, eachCallback, allCallback) {
       var once = arguments.length <= 3 || arguments[3] === undefined ? true : arguments[3];
       var testSrc = arguments.length <= 4 || arguments[4] === undefined ? true : arguments[4];

       elements = getElements(elements);

       if (!elements || elements.length == 0) {
           if (allCallback) allCallback();

           return;
       }

       var n = {
           value: elements.length
       };

       callback = function (event, element, error) {
           if (event) {
               element = event.target;
               if (event.type == 'error') error = event;
           }

           if (once) off$1(element, 'load loadedmetadata error', callback);

           if (eachCallback) eachCallback(element, error);

           if (! --n.value && allCallback) allCallback();
       };

       forEach$1(elements, function (element) {
           if (testSrc && !element.src) callback(null, element, 'image without src');else if (element.naturalWidth || element.loadedmetadata) callback(null, element, null);else on(element, 'load loadedmetadata error', callback);
       });

       return {
           off: function () {
               forEach$1(elements, function (element) {
                   return off$1(element, 'load loadedmetadata error', callback);
               });
           }
       };
   }

   /**
    * Execute callback when dom is ready.
    * @param {function} callback - The callback
    */
   function ready(callback) {
     on(document, 'DOMContentLoaded', callback);
   }

   /**
    * Trigger events on elements with data
    * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
    * @param {string} events - The events that should be tiggered seperated with spaces
    * @param {object} data - The events' data
    * @return {string | Array | NodeList | HTMLCollection} elements - The iterable for chaining
    */
   function trigger(elements, events, data) {
       events = events.split(' ');
       var i = events.length;

       elements = getElements(elements);

       var _loop = function () {
           var event = events[i];

           if (window.CustomEvent) {
               event = new CustomEvent(event, { detail: data });
           } else {
               event = document.createEvent('CustomEvent');
               event.initCustomEvent(event, true, true, data);
           }

           forEach(elements, function (element) {
               if (!element.dispatchEvent) return;

               element.dispatchEvent(event);
           });
       };

       while (i--) {
           _loop();
       }

       return elements;
   }

   /**
    * Get height in pixels of element.
    * @param {string | HTMLElement | window | document | SVGElement} element - The selector or dom element
    * @return {number} height - The height in pixels
    */
   function getHeight(element) {
     element = getElement(element);

     return !!element && element.offsetHeight;
   }

   /**
    * Get size in pixels of element.
    * @param {string | HTMLElement | window | document | SVGElement} element - The selector or dom element
    * @return {number} size - The size in pixels
    */
   function getSize(element) {
      element = getElement(element);

      return !!element && {
         width: element.offsetWidth,
         height: element.offsetHeight
      };
   }

   /**
    * Get style property of element.
    * @param {string | HTMLElement | window | document | SVGElement} element - The selector or dom element
    * @return {number} value - The value for the property
    */
   function getStyle(element, property) {
     element = getElement(element);
     if (!element) return;

     var ret = getComputedStyle(element)[property];

     return ret.indexOf('px') == -1 ? ret : parseInt(ret, 10);
   }

   /**
    * Get width in pixels of element.
    * @param {string | HTMLElement | window | document | SVGElement} element - The selector or dom element
    * @return {number} width - The width in pixels
    */
   function getWidth(element) {
     element = getElement(element);

     return !!element && element.offsetWidth;
   }

   /**
   * Set the provided height to elements
   * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
   * @param {number} height - The height
   * @return {string | Array | NodeList | HTMLCollection} elements - The iterable for chaining
   */
   function setHeight(elements, height) {
       if (typeof height == 'number') height += 'px';

       return forElements(elements, function (element) {
           if (!element.style) return;

           element.style.height = height;
       });
   }

   /**
    * Get height in pixels of element or first element of elements if height is undefined,
    * else set height to all element of elements.
    * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
    * @param {number} [height] - The height
    * @return {number | string | Array | NodeList | HTMLCollection} height | elements - The height in pixels | elements for chaining
    */
   function height(elements, height) {
     return typeof height != 'undefined' ? setHeight(elements, height) : getHeight(elements);
   }

   /**
    * Hide each element of elements using visibility.
    * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
    * @return {string | Array | NodeList | HTMLCollection} elements for chaining
    */
   function hide(elements) {
       return forElements(elements, function (element) {
           if (!element.style) return;

           element.style.visibility = 'hidden';
       });
   }

   function applyPropertyToMatrix(property, value, matrix) {
       switch (property) {
           case 'x':
               matrix[4] += value;
               break;

           case 'y':
               matrix[5] += value;
               break;

           case 'rotate':
               var cosValue = Math.cos(value),
                   sinValue = Math.sin(value);
               matrix[0] *= cosValue;
               matrix[1] += sinValue;
               matrix[2] -= sinValue;
               matrix[3] *= cosValue;
               break;

           case 'scale':
               matrix[0] *= value;
               matrix[2] *= value;
               break;

           case 'scaleX':
               matrix[0] *= value;
               break;

           case 'scaleY':
               matrix[3] *= value;
               break;

           case 'skew':
               var tanValue = Math.tan(value);
               matrix[2] += tanValue;
               matrix[1] += tanValue;
               break;

           case 'skewX':
               matrix[2] += Math.tan(value);
               break;

           case 'skewY':
               matrix[1] += Math.tan(value);
               break;
       }
   }

   /**
    * Convert a transformation as object to a 2d matrix as object
    * @param {object} transformation - The transformation object
    * @return {Array} matrix - The 2d matrix
    */
   function transformTo2DMatrix(transformation) {
       var properties = Object.keys(transformation),
           i = properties.length,
           matrix = [1, 0, 0, 1, 0, 0];

       while (i--) {
           var property = properties[i],
               value = transformation[property];

           if (typeof value == 'object') {
               var subProperties = Object.keys(value),
                   j = subProperties.length;

               while (j--) {
                   var subProperty = subProperties[j];
                   applyPropertyToMatrix(property + subProperty.toUpperCase(), value[subProperty], matrix);
               }
           } else {
               applyPropertyToMatrix(property, value, matrix);
           }
       }

       return matrix;
   }

   /**
   * Apply the provided transformation as a 2D matrix on each element of elements
   * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
   * @param {object} transformation - The transformation object
   * @return {string | Array | NodeList | HTMLCollection} elements for chaining
   */
   function matrix2D$1(elements, transformation) {
       var matrix = transformTo2DMatrix(transformation);

       matrix = 'matrix(' + matrix.join(',') + ')';

       return forElements(elements, function (element) {
           if (!element.style) return;

           element.style[prefix + 'transform'] = matrix;
           element.style.transform = matrix;
       });
   }

   function applyPropertyToMatrix$1(property, value, matrix) {
       switch (property) {
           case 'x':
               matrix[12] += value;
               break;

           case 'y':
               matrix[13] += value;
               break;

           case 'z':
               matrix[14] += value;
               break;

           case 'rotate':
               var cosValue = Math.cos(value),
                   sinValue = Math.sin(value);
               matrix[0] *= cosValue;
               matrix[1] += sinValue;
               matrix[4] -= sinValue;
               matrix[5] *= cosValue;
               break;

           case 'rotateX':
               var cosValue2 = Math.cos(value),
                   sinValue2 = Math.sin(value);
               matrix[5] *= cosValue2;
               matrix[6] += sinValue2;
               matrix[9] -= sinValue2;
               matrix[10] *= cosValue2;
               break;

           case 'rotateY':
               var cosValue3 = Math.cos(value),
                   sinValue3 = Math.sin(value);
               matrix[0] *= cosValue3;
               matrix[2] -= sinValue3;
               matrix[8] += sinValue3;
               matrix[10] *= cosValue3;
               break;

           case 'rotateZ':
               var cosValue4 = Math.cos(value),
                   sinValue4 = Math.sin(value);
               matrix[0] *= cosValue4;
               matrix[1] += sinValue4;
               matrix[4] -= sinValue4;
               matrix[5] *= cosValue4;
               break;

           case 'scale':
               matrix[0] *= value;
               matrix[5] *= value;
               break;

           case 'scaleX':
               matrix[0] *= value;
               break;

           case 'scaleY':
               matrix[5] *= value;
               break;

           case 'scaleZ':
               matrix[10] *= value;
               break;

           case 'skew':
               var tanValue = Math.tan(value);
               matrix[4] += tanValue;
               matrix[1] += tanValue;
               break;

           case 'skewX':
               matrix[4] += Math.tan(value);
               break;

           case 'skewY':
               matrix[1] += Math.tan(value);
               break;
       }
   }

   /**
    * Convert a transformation as object to a 3d matrix as object
    * @param {object} transformation - The transformation object
    * @return {Array} matrix - The 3d matrix
    */
   function transformTo3DMatrix(transformation) {
       var properties = Object.keys(transformation),
           i = properties.length,
           matrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

       while (i--) {
           var property = properties[i],
               value = transformation[property];

           if (typeof value == 'object') {
               var subProperties = Object.keys(value),
                   j = subProperties.length;

               while (j--) {
                   var subProperty = subProperties[j];
                   applyPropertyToMatrix$1(property + subProperty.toUpperCase(), value[subProperty], matrix);
               }
           } else {
               applyPropertyToMatrix$1(property, value, matrix);
           }
       }

       return matrix;
   }

   /**
   * Apply the provided transformation as a 3D matrix on each element of elements
   * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
   * @param {object} transformation - The transformation object
   * @return {string | Array | NodeList | HTMLCollection} elements for chaining
   */
   function matrix3D$1(elements, transformation) {
       var matrix = transformTo3DMatrix(transformation);

       matrix = 'matrix3d(' + matrix.join(',') + ')';

       return forElements(elements, function (element) {
           if (!element.style) return;

           element.style[prefix + 'transform'] = matrix;
           element.style.transform = matrix;
       });
   }

   /**
   * Apply the provided transformation as a matrix (3d if supported) on each element of elements
   * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
   * @param {object} transformation - The transformation object
   * @return {string | Array | NodeList | HTMLCollection} elements for chaining
   */
   function matrix(elements, transformation) {
       return support3D ? matrix3D(elements, transformation) : matrix2D(elements, transformation);
   }

   /**
   * Return the top and left offset of an element. Offset is relative to web page
   * @param {string | HTMLElement | window | document | SVGElement} element - The selector or dom element
   * @return {object} offset
   */
   function offset(element) {
       element = getElement(element);
       if (!element) return false;

       var rect = element.getBoundingClientRect();

       return {
           top: rect.top + (document.documentElement.scrollTop || document.body.scrollTop),
           left: rect.left + (document.documentElement.scrollLeft || document.body.scrollLeft)
       };
   }

   /**
   * Return the top and left position of an element. Position is relative to parent
   * @param {string | HTMLElement | window | document | SVGElement} element - The selector or dom element
   * @return {object} position
   */
   function position(element) {
       element = getElement(element);

       return !!element && {
           top: element.offsetTop,
           left: element.offsetLeft
       };
   }

   /**
   * Apply the provided scale transformation on each element of elements
   * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
   * @param {object} transformation - The transformation object
   * @param {bool} [keep] - Preserve previous transformation
   * @return {string | Array | NodeList | HTMLCollection} elements for chaining
   */
   function scale2D(elements, transformation, keep) {
       var scaleX = 'scaleX' in transformation ? transformation.scaleX : 'scale' in transformation ? transformation.scale : 1,
           scaleY = 'scaleY' in transformation ? transformation.scaleY : 'scale' in transformation ? transformation.scale : 1;

       var style = 'scale(' + scaleX + ',' + scaleY + ')';

       return forElements(elements, function (element) {
           if (!element.style) return;

           if (keep) {
               element.style[prefix + 'transform'] += ' ' + style;
               element.style.transform += ' ' + style;
           } else {
               element.style[prefix + 'transform'] = style;
               element.style.transform = style;
           }
       });
   }

   /**
   * Apply the provided 3D scale transformation on each element of elements
   * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
   * @param {object} transformation - The transformation object
   * @param {bool} [keep] - Preserve previous transformation
   * @return {string | Array | NodeList | HTMLCollection} elements for chaining
   */
   function scale3D(elements, transformation, keep) {
       var scaleX = 'scaleX' in transformation ? transformation.scaleX : 'scale' in transformation ? transformation.scale : 1,
           scaleY = 'scaleY' in transformation ? transformation.scaleY : 'scale' in transformation ? transformation.scale : 1,
           scaleZ = 'scaleZ' in transformation ? transformation.scaleZ : 1;

       var style = 'scale3d(' + scaleX + ',' + scaleY + ',' + scaleZ + ')';

       return forElements(elements, function (element) {
           if (!element.style) return;

           if (keep) {
               element.style[prefix + 'transform'] += ' ' + style;
               element.style.transform += ' ' + style;
           } else {
               element.style[prefix + 'transform'] = style;
               element.style.transform = style;
           }
       });
   }

   /**
   * Apply the provided scale transformation (3d if supported) on each element of elements
   * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
   * @param {object} transformation - The transformation object
   * @param {bool} [keep] - Preserve previous transformation
   * @return {string | Array | NodeList | HTMLCollection} elements for chaining
   */
   function scale(elements, transformation, keep) {
       return support3D ? scale3D(elements, transformation, keep) : scale2D(elements, transformation, keep);
   }

   /**
   * Return the screen relative position of an element
   * @param {string | HTMLElement | window | document | SVGElement} element - The selector or dom element
   * @return {object} screenPosition
   */
   function screenPosition(element) {
       element = getElement(element);

       return !!element && element.getBoundingClientRect();
   }

   /**
   * Set the provided size to elements
   * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
   * @param {object} size - The size as an object with width and height
   * @return {string | Array | NodeList | HTMLCollection} elements - The iterable for chaining
   */
   function setSize(elements, size) {
       var width = size.width,
           height = size.height;

       if (typeof width == 'number') width += 'px';
       if (typeof height == 'number') height += 'px';

       return forElements(elements, function (element) {
           if (!element.style) return;

           Object.assign(element.style, { width: width, height: height });
       });
   }

   var unitLessAttributes = ['z-index', 'zoom', 'font-weight', 'line-height', 'counter-reset', 'counter-increment', 'volume', 'stress', 'pitch-range', 'richness', 'opacity'];

   /**
   * Set the provided style to elements
   * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
   * @param {object} style - The style options as object linking value to property
   * @return {string | Array | NodeList | HTMLCollection} elements - The iterable for chaining
   */
   function setStyle(elements, style) {
       var properties = Object.keys(style);

       var i = properties.length;
       while (i--) {
           var property = properties[i];

           if (unitLessAttributes.indexOf(property) == -1) {
               var value = style[property];

               if (typeof value == 'number') style[property] += 'px';
           }
       }

       return forElements(elements, function (element) {
           if (!element.style) return;

           Object.assign(element.style, style);
       });
   }

   /**
   * Set the provided width to elements
   * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
   * @param {number} width - The width
   * @return {string | Array | NodeList | HTMLCollection} elements - The iterable for chaining
   */
   function setWidth(elements, width) {
       if (typeof width == 'number') width += 'px';

       return forElements(elements, function (element) {
           if (!element.style) return;

           element.style.width = width;
       });
   }

   /**
   * Reset visibility style attribute for elements
   * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
   * @return {string | Array | NodeList | HTMLCollection} elements - The iterable for chaining
   */
   function show(elements) {
       return forElements(elements, function (element) {
           if (!element.style) return;

           element.style.visibility = '';
       });
   }

   /**
    * Get size in pixels of element or first element of elements if size is undefined,
    * else set size to all element of elements.
    * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
    * @param {object} [size] - The size as an object with width and height
    * @return {object | string | Array | NodeList | HTMLCollection} size | elements - The size as an object with width and height in pixels | elements for chaining
    */
   function size(elements, size) {
       if (typeof object != 'object') return getSize(elements);else return setSize(elements, object);
   }

   function style(elements, option) {
     if (typeof option == 'object') {
       return setStyle(elements, option);
     } else if (typeof option == 'string') {
       return getStyle(elements, option);
     }
   }

   /**
   * Apply the provided translate transformation on each element of elements
   * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
   * @param {object} transformation - The transformation object
   * @param {bool} [keep] - Preserve previous transformation
   * @return {string | Array | NodeList | HTMLCollection} elements for chaining
   */
   function translate2D(elements, transformation, keep) {
       var x = 'x' in transformation ? transformation.x : 0,
           y = 'y' in transformation ? transformation.y : 0;

       if (typeof x == 'number') x += 'px';
       if (typeof y == 'number') y += 'px';

       var style = 'translate(' + x + ',' + y + ')';

       return forElements(elements, function (element) {
           if (!element.style) return;

           if (keep) {
               element.style[prefix + 'transform'] += ' ' + style;
               element.style.transform += ' ' + style;
           } else {
               element.style[prefix + 'transform'] = style;
               element.style.transform = style;
           }
       });
   }

   /**
   * Apply the provided 3D translate transformation on each element of elements
   * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
   * @param {object} transformation - The transformation object
   * @param {bool} [keep] - Preserve previous transformation
   * @return {string | Array | NodeList | HTMLCollection} elements for chaining
   */
   function translate3D(elements, transformation, keep) {
       var x = 'x' in transformation ? transformation.x : 0,
           y = 'y' in transformation ? transformation.y : 0,
           z = 'z' in transformation ? transformation.z : 0;

       if (typeof x == 'number') x += 'px';
       if (typeof y == 'number') y += 'px';
       if (typeof z == 'number') z += 'px';

       var style = 'translate3d(' + x + ',' + y + ',' + z + ')';

       return forElements(elements, function (element) {
           if (!element.style) return;

           if (keep) {
               element.style[prefix + 'transform'] += ' ' + style;
               element.style.transform += ' ' + style;
           } else {
               element.style[prefix + 'transform'] = style;
               element.style.transform = style;
           }
       });
   }

   /**
   * Apply the provided translate transformation (3d if supported) on each element of elements
   * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
   * @param {object} transformation - The transformation object
   * @param {bool} [keep] - Preserve previous transformation
   * @return {string | Array | NodeList | HTMLCollection} elements for chaining
   */
   function translate(elements, transformation, keep) {
       return support3D ? translate3D(elements, transformation, keep) : translate2D(elements, transformation, keep);
   }

   /**
    * Set the provided transformation to all elements using a matrix if needed and 3D if supported.
    * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
    * @param {object} [transformation] - The transformation as an object
    * @return {object | string | Array | NodeList | HTMLCollection} size | elements - The size as an object with width and height in pixels | elements for chaining
    */
   function transform(elements, transformation) {
      // if skew or rotation use matrix
      if ('skew' in transformation || 'skewX' in transformation || 'skewY' in transformation || 'rotate' in transformation || 'rotateX' in transformation || 'rotateY' in transformation || 'rotateZ' in transformation) {
         return matrix(elements, transformation);
      } else {
         var shouldKeep = false; // don't crush translate property

         if (shouldKeep = 'x' in transformation || 'y' in transformation || 'z' in transformation) return translate(elements, transformation);

         if ('scale' in transformation || 'scaleX' in transformation || 'scaleY' in transformation || 'scaleZ' in transformation) return scale(elements, transformation, shouldKeep);
      }
   }

   /**
    * Get width in pixels of element or first element of elements if width is undefined,
    * else set width to all element of elements.
    * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
    * @param {number} [width] - The width
    * @return {number | string | Array | NodeList | HTMLCollection} width | elements - The width in pixels | elements for chaining
    */
   function width(elements, width) {
     return typeof width != 'undefined' ? setWidth(elements, width) : getWidth(elements);
   }

   /**
    * Execute callback once for all fired during a waiting time.
    * @param {function} callback - The callback function
    * @param {number} wait - The waiting time in milliseconds
    * @param {bool} [immediate=false] - Execute callback on first trigger
    * @return {function} debounced - The debounced callback with cancel method
    */
   function debounce(callback, wait) {
       var immediate = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

       var canCall = immediate,
           timeout = void 0;

       var applyCallback = function () {
           canCall = false;
           callback.call.apply(callback, [this].concat(Array.prototype.slice.call(arguments)));

           timeout = setTimeout(function () {
               canCall = immediate;
           }, wait);
       };

       var debounced = function () {
           clearTimeout(timeout);

           if (canCall) applyCallback.call.apply(applyCallback, [this].concat(Array.prototype.slice.call(arguments)));else timeout = setTimeout(applyCallback.bind(this, arguments), wait);

           debounced.cancel = function () {
               clearTimeout(timeout);
               canCall = true;
               timeout = null;
           };
       };

       return debounced;
   }

   /**
    * Return a deep clone of object.
    * @param {object} object - The object to clone
    * @return {object} clone - The clone of the object
    */
   function deepClone(object) {
       if (object == null || typeof object !== 'object') return object;

       var clone = object.constructor();
       for (var attr in object) {
           if (object.hasOwnProperty(attr)) clone[attr] = object[attr];
       }return clone;
   }

   /**
    * Copy all defaults properties to options.
    * @param {object} options - The received options
    * @param {object} defaults - The default values
    * @return {object} merge - The merged options
    */
   function defaultify(options, defaults) {
     return Object.assign(options, defaults);
   }

   /**
    * Cache callbacks result for arguments and return cached results when called with the same ones
    * @param {function} callback - The function to call
    * @return {function} memoized - The memoized callback
    */
   function memoize(callback) {
       var cache = {};

       return function () {
           var args = JSON.stringify(arguments);

           return args in cache ? cache[args] : cache[args] = callback.call.apply(callback, [this].concat(Array.prototype.slice.call(arguments)));
       };
   }

   /**
    * Return a random number between two values
    * @param {number} max - The maximum value
    * @param {number} [min=0] - The minimum value
    * @return {function} value - A random value between min and max
    */
   function randomBetween(max) {
     var min = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

     return Math.random() * (max - min + 1) + min;
   }

   /**
    * Return a random integer between two integers
    * @param {number} max - The maximum integer
    * @param {number} [min=0] - The minimum integer
    * @return {function} value - A random interger between min and max
    */
   function randomIntBetween(max) {
     var min = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

     return ~ ~(Math.random() * (max - min + 1)) + min;
   }

   /**
    * Return value if in the range, max if greater, min if lower
    * @param {number} value - The tested value
    * @param {number} [max=1] - The maximum value
    * @param {number} [min=0] - The minimum value
    * @return {function} value - A random interger between min and max or max if value isn't a number
    */
   function range(value) {
     var max = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];
     var min = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

     return isNaN(value) ? max : Math.min(Math.max(value, min), max);
   }

   /**
    * Execute callback at most once in wait time.
    * @param {function} callback - The callback function
    * @param {number} wait - The waiting time in milliseconds
    * @param {bool} [leading=false] - Execute callback on first trigger
    * @param {bool} [trailing=false] - Execute callback wait time after last execution
    * @return {function} throttled - The throttled callback with cancel method
    */
   function throttle(callback, wait) {
       var leading = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];
       var trailing = arguments.length <= 3 || arguments[3] === undefined ? true : arguments[3];

       var last = 0,
           timeout = void 0;

       var applyCallback = function () {
           timeout = null;
           last = leading ? performance.now() : 0;
           callback.call.apply(callback, [this].concat(Array.prototype.slice.call(arguments)));
       };

       var throttled = function () {
           var now = performance.now();

           if (!last && !leading) last = now;

           var remaining = wait - (now - last);

           if (remaining < 0 || remaining > wait) applyCallback.call.apply(applyCallback, [this].concat(Array.prototype.slice.call(arguments)));else if (trailing && !timeout) timeout = setTimeout(applyCallback.bind(this, arguments), remaining);

           throttled.cancel = function () {
               clearTimeout(timeout);
               last = 0;
               timeout = null;
           };
       };

       return throttled;
   }

   var index = {
       isAndroidTablet: isAndroidTablet,
       isAndroid: isAndroid,
       isChrome: isChrome,
       isFirefox: isFirefox,
       isIe: isIE,
       isIos: isIOS,
       isIpad: isIPad,
       isIphone: isIPhone,
       isIpod: isIPod,
       isMobile: isMobile,
       isSafari: isSafari,
       isTablet: isTablet,
       isTouchable: isTouchable,
       isWindowsPhone: isWindowsPhone,
       isWindowsTablet: isWindowsTablet,
       isWindows: isWindows,
       prefix: prefix,
       support3D: support3D,
       ua: ua$1,
       vendor: vendor,
       forEach: forEach$1,
       forElements: forElements,
       forIn: forIn,
       getElement: getElement,
       getElements: getElements,
       getSelectorAll: getSelectorAll,
       getSelector: getSelector,
       isDomElement: isDomElement,
       addClass: addClass,
       append: append,
       attr: attr,
       clone: clone,
       closest: closest,
       createElement: createElement,
       data: data,
       empty: empty,
       filter: filter,
       findOne: findOne,
       find: find,
       getAttr: getAttr,
       getData: getData,
       getHtml: getHtml,
       getProp: getProp,
       hasClass: hasClass,
       html: html,
       indexInParent: indexInParent,
       insertAfter: insertAfter,
       insertBefore: insertBefore,
       next: next,
       parent: parent,
       prev: prev,
       prop: prop,
       removeClass: removeClass,
       remove: remove,
       setAttr: setAttr,
       setData: setData,
       setHtml: setHtml,
       setProp: setProp,
       toggleClass: toggleClass,
       drag: drag,
       hover: hover,
       load: load,
       off: off$1,
       on: on,
       ready: ready,
       trigger: trigger,
       getHeight: getHeight,
       getSize: getSize,
       getStyle: getStyle,
       getWidth: getWidth,
       height: height,
       hide: hide,
       matrix: matrix,
       matrix2D: matrix2D$1,
       matrix3D: matrix3D$1,
       offset: offset,
       position: position,
       scale: scale,
       scale2D: scale2D,
       scale3D: scale3D,
       screenPosition: screenPosition,
       setHeight: setHeight,
       setSize: setSize,
       setStyle: setStyle,
       setWidth: setWidth,
       show: show,
       size: size,
       style: style,
       transform: transform,
       translate: translate,
       translate2D: translate2D,
       translate3D: translate3D,
       width: width,
       debounce: debounce,
       deepClone: deepClone,
       defaultify: defaultify,
       memoize: memoize,
       randomBetween: randomBetween,
       randomIntBetween: randomIntBetween,
       range: range,
       throttle: throttle,
       transformTo2DMatrix: transformTo2DMatrix,
       transformTo3DMatrix: transformTo3DMatrix
   };

   return index;

}));