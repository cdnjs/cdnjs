/* Umbrella JS
 * -----------
 * Covers your needs
 *
 * NOTE: this is only the "core", see "umbrella.js" at the root
 *
 * Small, lightweight jQuery alternative
 * By Francisco Presencia Fandos
 * Inspired by http://youmightnotneedjquery.com/
 * Analyze: http://www.jshint.com/
 * Compat: http://caniuse.com/#feat=queryselector
 * Order of include is irrelevant http://stackoverflow.com/q/7609276
 *
 * Umbrella JS selector is faster than jQuery:
 * classes: http://jsperf.com/umbrella-vs-jquery-class/2
 * tags: http://jsperf.com/umbrella-vs-jquery-tag/2
 * ids: http://jsperf.com/umbrella-vs-jquery-id/2
 * complex: http://jsperf.com/umbrella-vs-jquery-complex/2
 */


// INIT
// It should make sure that there's at least one element in nodes
var u = function(parameter, context) {

  // Make sure that we are always working with the u object
  // This is only so we can avoid selector = new u("whatever");
  // and use u("whatever").bla();
  // Reference: http://stackoverflow.com/q/24019863
  if (!(this instanceof u)) {    // !() http://stackoverflow.com/q/8875878
    return new u(parameter, context);
    }


  // Check if it's a selector or an object
  if (typeof parameter == "string") {

    // Store the selector
    this.selector = parameter;

    // Store the nodes
    this.nodes = this.findNodes(parameter, context);
  }

  // If we're referring a specific node as in click(){ u(this) }
  else if (typeof parameter == "object" && parameter.nodeName) {

    // Store the node as an array
    this.nodes = [parameter];
  }

  // If we pass an array assume we want to make it the new nodes
  else if (Array.isArray(parameter)) {
    this.nodes = parameter.slice();
  }


  return this;
};


// Select the adecuate part from the context
u.prototype.findNodes = function(parameter, context) {

  // querySelector is the only one that accepts documentFragment
  if (context){
    return this.cssNodes(parameter, context);
  }

  // If we're matching a class
  if (parameter.match(/^\.[a-zA-Z0-9_]+$/)) {

    return this.classNodes(parameter.substring(1));
  }

  // If we're matching a tag
  else if (parameter.match(/^[a-zA-Z]+$/)) {

    return this.tagNodes(parameter);
  }

  // If we match an id
  else if (parameter.match(/^\#[a-zA-Z0-9_]+$/)) {

    return this.idNodes(parameter.substring(1));
  }

  // A full css selector
  return this.cssNodes(parameter);
};


// This change made the code faster than jQuery ^_^
// Read "Defining class methods" in https://developers.google.com/speed/articles/optimizing-javascript
// The tag nodes
u.prototype.tagNodes = function(tagName) {

  return Array.prototype.slice.call(
    document.getElementsByTagName(tagName), 0);
};


// The id nodes
u.prototype.idNodes = function(id) {

  return [document.getElementById(id)];
};


// The class nodes
u.prototype.classNodes = function(className) {

  return Array.prototype.slice.call(
    document.getElementsByClassName(className), 0);
};


u.prototype.cssNodes = function(parameter, context) {

  context = context || document;

  // Store all the nodes as an array
  // http://toddmotto.com/a-comprehensive-dive-into-nodelists-arrays-converting-nodelists-and-understanding-the-dom/
  return Array.prototype.slice.call(
    context.querySelectorAll(parameter), 0);
};

// This also made the code faster
// Read "Initializing instance variables" in https://developers.google.com/speed/articles/optimizing-javascript
// Default selector
u.prototype.selector = "";

// Default value
u.prototype.nodes = [];

// Options
u.options = {};
/**
 * .addClass(name1, name2, ...)
 * 
 * Add a class to the matched nodes
 * Possible polyfill: https://github.com/eligrey/classList.js
 * @return this Umbrella object
 */
u.prototype.addClass = function(){
  
  // Normalize the arguments to a string of comma separated elements
  // Allow for several class names like "a b c" and several parameters
  // toString() is to flatten the array: http://stackoverflow.com/q/22920305
  var args = Array.prototype.slice.call(arguments).toString().split(/[\s,]+/);
  
  // Loop through all the nodes
  return this.each(function(el){
    
    // Loop and add each of the classes
    args.forEach(function(name){
      if (name) el.classList.add(name);
    });
  });
};

/**
 * .adjacent(position, text)
 * 
 * Add text in the specified position. It is used by other functions
 */
u.prototype.adjacent = function(position, text) {
  
  // Loop through all the nodes
  return this.each(function(node) {
    
    // http://stackoverflow.com/a/23589438
    // Ref: https://developer.mozilla.org/en-US/docs/Web/API/Element.insertAdjacentHTML
    node.insertAdjacentHTML(position, text);
    });
  };

/**
 * .after(html)
 * 
 * Add child after all of the current nodes
 * @param String html to be inserted
 * @return this Umbrella object
 */
u.prototype.after = function(text) {
  
  return this.adjacent('afterend', text);
};

/**
 * .ajax(success, error, before)
 * 
 * Create a POST request for whenever the matched form submits
 * @param function success called function when the post is okay
 * @param function error called function when the post was NOT okay
 * @param function before called function before sending the request
 */
u.prototype.ajax = function(success, error, before) {
  
  // Loop through all the nodes
  this.on("submit", function(e) {
    
    // Stop the browser from sending the request
    e.preventDefault();
    
    // Post the actual data
    ajax(
      u(this).attr("action"),
      u(this).serialize(),
      success,
      error,
      before);
    });
  
  return this;
  };


/**
 * .append(html)
 * 
 * Add child the last thing inside each node
 * @param String html to be inserted
 * @return this Umbrella object
 */
u.prototype.append = function(html) {
  
  return this.adjacent('beforeend', html);
};

/**
 * .attr(name, value)
 *
 * Retrieve or set the data for an attribute of the first matched node
 * @param String name the attribute to search
 * @param String value optional atribute to set
 * @return this|String
 */
// ATTR
// Return the fist node attribute
u.prototype.attr = function(name, value) {
  
  if (value !== undefined){
    var nm = name;
    name = {};
    name[nm] = value;
  }
  
  if (typeof name === 'object') {
    return this.each(function(node){
      for(var key in name) {
        if (name[key] !== null){
          node.setAttribute(key, name[key]);
        } else {
          node.removeAttribute(key);
        }
      }
    });
  }
  
  return this.first().getAttribute(name);
};

/**
 * .before(html)
 * 
 * Add child before all of the current nodes
 * @param String html to be inserted
 * @return this Umbrella object
 */
u.prototype.before = function(html) {
  
  this.adjacent('beforebegin', html);
  
  return this;
  };

/**
 * .children()
 * 
 * Travel the matched elements one node down
 * @return this Umbrella object
 */
u.prototype.children = function(selector) {
  
  var newNodes = [];
  
  // Loop through all the nodes
  this.each(function() {
    
    // Assign the new nodes to the array
    newNodes.concat(this.children);
    });
  
  this.nodes = newNodes;
  
  return this;
  }

/**
 * .click(callback)
 * 
 * Alternative name for .on('click', callback)
 * @param function callback function called when the event triggers
 * @return this Umbrella object
 */
u.prototype.click = function(callback) {
  
  // Loop through all the nodes
  this.on('click', callback);
  
  return this;
  };


/**
 * .closest()
 * 
 * Find a node that matches the passed selector
 * @return this Umbrella object
 */
u.prototype.closest = function(selector) {
  
  var newNodes = [];
  
  // Loop through all the nodes
  this.each(function() {
    
    var current = this;
    
    while (current) {
      
      // Native function
      if (typeof current.matches === "function" &&
          current.matches(selector)) {
        newNodes.unshift(current);
        }
      
      else {
        if (typeof current.msMatchesSelector === "function" &&
            current.msMatchesSelector(selector)) {
          newNodes.unshift(current);
          }
          
        if (typeof current.mozMatchesSelector === "function" &&
            current.mozMatchesSelector(selector)) {
          newNodes.unshift(current);
          }
        
        if (typeof current.webkitMatchesSelector === "function" &&
            current.webkitMatchesSelector(selector)) {
          newNodes.unshift(current);
          }
        
        if (typeof current.oMatchesSelector === "function" &&
            current.oMatchesSelector(selector)) {
          newNodes.unshift(current);
          }
        }

      
      current = current.parentNode;
      }
    // Assign the new nodes to the array
    newNodes.concat(this.children);
    });
  
  this.nodes = newNodes;
  
  return this;
  }

/**
 * .each()
 * Loops through every node from the current call
 * it accepts a callback that will be executed on each node
 * The context for 'this' within the callback is the html node
 * The callback has two parameters, the node and the index
 */
u.prototype.each = function(callback) {
  
  // Loop through all the nodes
  for (var i = 0; i < this.nodes.length; i++) {
    
    // Perform the callback for this node
    // By doing callback.call we allow "this" to be the context for
    // the callback (see http://stackoverflow.com/q/4065353 precisely)
    var ret = callback.call(this.nodes[i], this.nodes[i], i);
    
    // Something is returned to change the node
    if (ret)
      
      // Assign the new node the returned value
      this.nodes[i] = ret;
  }
  
  return this;
};

/**
 * Find all the nodes children of the current ones matched by a selector
 */
u.prototype.find = function(selector) {
  
  selector = selector || "*";
  
  var newNodes = [];
  
  this.each(function(){
    // newNodes.push(u(selector, this).nodes);
    var list = this.querySelectorAll(selector);
    newNodes = newNodes.concat(Array.prototype.slice.call(list, 0));
  });
  
  this.nodes = newNodes;
  return this;
};

/**
 * Get the first of the nodes
 * @return htmlnode the first html node in the matched nodes
 */
u.prototype.first = function() {
  
  if (this.nodes.length > 0) {
    return this.nodes[0];
    }
  };

/**
* ajax(url, data, success, error, before);
* 
* Perform a POST request to the given url
* @param String url the place to send the request
* @param String data the ready to send string of data
* @param function success optional callback if everything goes right
* @param function error optional callback if anything goes south
* @param function before optional previous callback
*/
function ajax(url, data, success, error, before) {
  
  // Make them truly optional
  var nf = function(){};
  success = success || nf;
  error = error || nf;
  before = before || nf;
  
  // Load the callback before anything happens
  before();
  
  // Add the umbrella parameter
  data = data + "&umbrella=true";
  
  // Create and send the actual request
  var request = new XMLHttpRequest();
  
  // Create a request of type POST to the URL and ASYNC
  request.open('POST', url, true);
  
  request.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
  
  request.send(data);
  
  // When the request is sent
  request.onload = function() {
    
    var status = this.status;
    
    // Error
    if (status < 200 || status >= 400) {
      error(status);
      
      return false;
    }
    
    var rawresponse = this.response;
    
    // Check if valid json
    if (!isJson(rawresponse)) {
      console.log("Response isn't json");
      success(rawresponse);
      return false;
    }
    
    // The response is right
    success(JSON.parse(rawresponse));
  };
  
  return request;
}

/**
 * isJson(json)
 * 
 * Check wether the passed string is valid json or not
 * @param String json the string to check
 * @return boolean true if the string is json
 */
function isJson(jsonString){
  try {
    var o = JSON.parse(jsonString);
    // Handle non-exception-throwing cases:
    // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
    // but... JSON.parse(null) returns 'null', and typeof null === "object", 
    // so we must check for that, too.
    if (o && typeof o === "object" && o !== null) {
        return o;
      }
    }
  catch (e) {}

  return false;
  }

/**
 * node(selector)
 * 
 * Return the first matched HTML NODE; only for the brave
 * @param String selector same as in u(selector)
 * @return htmlNode the first matched node
 */
function node(selector) {
  
  // Get the first from Umbrella JS
  return u(selector).first();
  }


/**
 * .hasClass(name)
 * 
 * Find out whether the matched elements have a class or not
 * @param String name the class name we want to find
 * @return boolean wether the nodes have the class or not
 */
u.prototype.hasClass = function(name) {
  
  // Default value
  var doesItContain = false;
  
  // Loop through all of the matched elements
  this.each(function(){
    
    // Check for multiple classes
    name.split(" ").forEach(function(value){
      
      // This check is needed to avoid setting it to false
      if (this.classList.contains(value))
        
        // Store the value
        doesItContain = true;
      }, this);
    });
  
  return doesItContain;
  };

/**
 * .html(text)
 * 
 * Set or retrieve the html from the matched node(s)
 * @param text optional some text to set as html
 * @return this|html Umbrella object
 */
u.prototype.html = function(text) {
  
  // If we're attempting to set some text
  if (text !== undefined) {
    
    // Loop through all the nodes
    this.each(function() {
      
      // Set the inner html to the node
      this.innerHTML = text;
      });
    return this;
    }
  
  else {
    return this.first().innerHTML;
    }
  };

/**
 * .on(event, callback)
 * 
 * Attach the callback to the event listener for each node
 * @param String event(s) the type of event ('click', 'submit', etc)
 * @param function callback function called when the event triggers
 * @return this Umbrella object
 */
u.prototype.on = function(events, callback) {
  
  // Separate the events
  var evts = events.split(' ');
  
  // Loop through each event
  for (var i=0; i < evts.length; i++) {
  
    // Loop through all the nodes
    this.each(function() {
      
      // Add each event listener to each node
      this.addEventListener(evts[i], callback);
      });
    }
  
  return this;
  };

/**
 * .parent()
 * 
 * Travel the matched elements one node up
 * @return this Umbrella object
 */
u.prototype.parent = function() {
  
  // Clone it
  return u(this.nodes).each(function(el) {
    
    // Select each node's parent
    return el.parentNode;
  });
};

/**
 * .prepend(html)
 * 
 * Add child the first thing inside each node
 * @param String html to be inserted
 * @return this Umbrella object
 */
u.prototype.prepend = function(html) {
  
  this.adjacent('afterbegin', html);
  
  return this;
  };

/**
 * .remove()
 * 
 * Delete the matched nodes from the html tree
 */
u.prototype.remove = function() {
  
  // Loop through all the nodes
  this.each(function(node) {
    
    // Perform the removal
    node.parentNode.removeChild(node);
    });
  };

/**
 * .removeClass(name)
 *
 * Removes a class from all of the matched nodes
 * @param String name the class name we want to remove
 * @return this Umbrella object
 */
u.prototype.removeClass = function(name) {
  
  // Loop through all the nodes
  this.each(function() {
    
    // Remove the class from the node
    this.classList.remove(name.split(" "));
    });
  
  return this;
  };

/**
 * .serialize()
 * 
 * Convert al html form elements into a string
 * The <input> and <button> without type will be parsed as default
 * NOTE: select-multiple for <select> is disabled on purpose
 * Source: http://stackoverflow.com/q/11661187
 * @return String the string to be sent through a Post or Get
 */
u.prototype.serialize = function() {
  
  // Store the class in a variable for manipulation
  var form = this.first();
  
  // Variables to store the work
  var i, query = "";
  
  // Encode the values https://gist.github.com/brettz9/7147458
  function en(str) {
   return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
    }
  
  for (i = form.elements.length - 1; i >= 0; i = i - 1) {
    
    // Store ELEMENT
    var el = form.elements[i];
    
    // Make sure the element has name
    if (el.name === "") {
      continue;
      }
    
    
    switch (el.type) {
      // Don't add files
      case 'file':
        break;
      
      // Don't add checkbox or radio if they are not checked
      case 'checkbox':
      case 'radio':
        if (!el.checked)
          break;
      
      // All other cases
      default:
        query += "&" + en(el.name) + "=" + en(el.value);
      }
    }
  
  // Join the query and return it
  return query;
  };

/**
 * u.setOptions(where, options);
 *
 * Define some options for the plugins of Umbrella JS
 * @param String where the name of the plugin
 * @param Object options the object's options
 * Example:
 * 
 *   u.setOptions('track', { url: "/trackb/" });
 *
 * Note: do NOT attempt to access u.options straight away
 */
u.setOptions = function(where, options){
  
  // Default options for each plugin is empty object
  u.options[where] = u.options[where] || {};
  
  // Loop through the outside functions
  for(var key in options) {
    
    // Set each of them
    u.options[where][key] = options[key];
    }
  };

/**
 * u.status = function(activate, deactivate, has, name){
 *
 * Define a status that can be used in the code. Example:
 * u.status('activate', 'deactivate', 'isActive', 'active')
 * 
 * Then you can do this along your code:
 * if(u(".article").isActive())
 *   u(".article").deactivate();
 */
u.status = function(activate, deactivate, has, name){
  name = name || activate;
  
  if (activate) {
    u.prototype[activate] = function() {
      this.addClass(name);
      return this;
      };
    }
  
  if (deactivate) {
    u.prototype[deactivate] = function() {
      this.removeClass(name);
      return this;
      };
    }
  
  if (has) {
    u.prototype[has] = function() {
      return this.hasClass(name);
      };
    }
  };
