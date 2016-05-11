// Umbrella JS
// -----------
// Covers your basic javascript needs

// Small, lightweight jQuery alternative
// @author Francisco Presencia Fandos http://francisco.io/
// @inspiration http://youmightnotneedjquery.com/

// INIT
// It should make sure that there's at least one element in nodes
var u = function(parameter, context) {

  // Make it an instance of u() to avoid needing 'new' as in 'new u()' and just
  // use 'u().bla();'. Reference: http://stackoverflow.com/q/24019863
  if (!(this instanceof u)) {    // !() http://stackoverflow.com/q/8875878
    return new u(parameter, context);
  }

  // Check if it's a css selector
  if (typeof parameter == "string") {

    // Find and store the node(s)
    parameter = this.select(parameter, context);
  }
  
  // If we're referring a specific node as in on('click', function(){ u(this) })
  // or the select() function returned a single node such as in '#id'
  if (parameter && parameter.nodeName) {

    // Store the node as an array
    parameter = [parameter];
  }
  
  // Convert to an array, since there are many 'array-like' stuff in js-land
  if (!Array.isArray(parameter)) {
    parameter = this.slice(parameter);
  }
  
  this.nodes = parameter;

  return this;
};


// Map u(...).length to u(...).nodes.length
u.prototype = {
  get length(){
    return this.nodes.length;
  }
  // ,
  // 
  // get innerHTML(){
  //   return this.html();
  // },
  // 
  // set innerHTML(val){
  //   return this.html(val);
  // }
};




// Force it to be an array AND also it clones them
// http://toddmotto.com/a-comprehensive-dive-into-nodelists-arrays-converting-nodelists-and-understanding-the-dom/
u.prototype.slice = function(pseudo) {
  return pseudo ? [].slice.call(pseudo, 0) : [];
};


// Flatten an array using 
u.prototype.str = function(node, i){
  return function(arg){
    
    // Call the function with the corresponding nodes
    if (typeof arg === 'function') {
      return arg.call(this, node, i);
    }
    
    // From an array or other 'weird' things
    return arg.toString();
  }
}

// Normalize the arguments to an array of strings
// Allow for several class names like "a b, c" and several parameters
u.prototype.args = function(args, node, i){
  
  // First flatten it all to a string http://stackoverflow.com/q/22920305
  // If we try to slice a string bad things happen: ['n', 'a', 'm', 'e']
  if (typeof args !== 'string') {
    args = this.slice(args).map(this.str(node, i));
  }
    
  // Then convert that string to an array of not-null strings
  return args.toString().split(/[\s,]+/).filter(function(e){ return e.length; });
};

// Make the nodes unique. This is needed for some specific methods
u.prototype.unique = function(){
  
  return u(this.nodes.reduce(function(clean, node){
    return (node && clean.indexOf(node) === -1) ? clean.concat(node) : clean;
  }, []));
};

// Encode the different strings https://gist.github.com/brettz9/7147458
u.prototype.uri = function(str){
  return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
}

// Parametize an object: { a: 'b', c: 'd' } => 'a=b&c=d'
u.prototype.param = function(obj){
  
  // Note: while this is ~10% slower (~3us/operation) than with a simple for(in)
  // I find it more legible and more 'logical' (however right now a test fails)
  // return Object.keys(obj).map(function(key) {
  //   return this.uri(key) + '=' + this.uri(obj[key]);
  // }).join('&');
  
  
  var query = '';
  for(var key in obj) {
    query += '&' + this.uri(key) + '=' + this.uri(obj[key]);
  }
  return query.slice(1);
}

// This made the code faster, read "Initializing instance variables" in
// https://developers.google.com/speed/articles/optimizing-javascript

// Default value
u.prototype.nodes = [];

/**
 * .addClass(name1, name2, ...)
 * 
 * Add a class to the matched nodes
 * Possible polyfill: https://github.com/eligrey/classList.js
 * @return this Umbrella object
 */
u.prototype.addClass = function(){
  
  // Loop the combination of each node with each argument
  return this.eacharg(arguments, function(el, name){
    
    // Add the class using the native method
    el.classList.add(name);
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
 * .ajax(done, before)
 * 
 * Create a POST request for whenever the matched form submits
 * @param function done called when response is received
 * @param function before called function before sending the request
 */
u.prototype.ajax = function(done, before) {
  
  // Attach the event submit to all of the nodes
  return this.on("submit", function(e) {
    
    // Stop the browser from sending the request
    e.preventDefault();
    
    // Post the actual data
    ajax(u(this).attr("method"), u(this).attr("action"), u(this).serialize(), done, before);
  });
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
  
  return this.nodes.length ? this.first().getAttribute(name) : "";
};

/**
 * .before(html)
 * 
 * Add child before all of the current nodes
 * @param String html to be inserted
 * @return this Umbrella object
 */
u.prototype.before = function(html) {
  
  return this.adjacent('beforebegin', html);
};

/**
 * .children()
 * 
 * Travel the matched elements one node down
 * @return this Umbrella object
 */
u.prototype.children = function(selector) {
  
  var self = this;
  
  return this.join(function(node){
    return self.slice(node.children);
  }).filter(selector);
};


/**
 * .closest()
 * 
 * Find a node that matches the passed selector
 * @return this Umbrella object
 */
u.prototype.closest = function(selector) {
  
  return this.join(function(node) {
    
    // Keep going up and up on the tree. First element is also checked
    do {
      if (u(node).is(selector)) {
        return node;
      }
    } while (node = node.parentNode)
    
  });
};

/**
 * .data(name, value)
 *
 * Retrieve or set the data-* attributes of the first matched node
 * @param String name the data-* attribute to search
 * @param String value optional atribute to set
 * @return this|String
 */
// ATTR
// Return the fist node attribute
u.prototype.data = function(name, value) {
  if (typeof name === 'object') {
    var new_name = {};
    for(var key in name) {
      new_name['data-' + key] = name[key];
    }
    return this.attr(new_name);
  }
  return this.attr('data-' + name, value);
};

/**
 * .each()
 * Loops through every node from the current call
 * it accepts a callback that will be executed on each node
 * The callback has two parameters, the node and the index
 */
u.prototype.each = function(callback) {
  
  // Loop through all the nodes
  this.nodes.forEach(function(node, i){
    
    // Perform the callback for this node
    // By doing callback.call we allow "this" to be the context for
    // the callback (see http://stackoverflow.com/q/4065353 precisely)
    callback.call(this, node, i);
  }, this);
  
  return this;
};

/**
 * .eacharg()
 * Loops through the combination of every node and every argument
 * it accepts a callback that will be executed on each combination
 * The callback has two parameters, the node and the index
 */
u.prototype.eacharg = function(args, callback) {
  
  return this.each(function(node, i){
    
    this.args(args, node, i).forEach(function(arg){
      
      // Perform the callback for this node
      // By doing callback.call we allow "this" to be the context for
      // the callback (see http://stackoverflow.com/q/4065353 precisely)
      callback.call(this, node, arg);
    });
  });
};

// .filter(selector)
// Delete all of the nodes that don't pass the selector
u.prototype.filter = function(selector){
  
  // The default function if it's a css selector
  // Cannot change name to 'selector' since it'd mess with it inside this fn
  var callback = function(node){
    
    // Make it compatible with some other browsers
    node.matches = node.matches || node.msMatchesSelector || node.webkitMatchesSelector;
    
    // Check if it's the same element (or any element if no selector was passed)
    return node.matches(selector || "*");
  }
  
  // filter() receives a function as in .filter(e => u(e).children().length)
  if (typeof selector == 'function') callback = selector;
  
  // filter() receives an instance of Umbrella as in .filter(u('a'))
  if (selector instanceof u) {
    callback = function(node){
      return (selector.nodes).indexOf(node) !== -1;
    };
  }
  
  // Just a native filtering function for ultra-speed
  return u(this.nodes.filter(callback));
};
/**
 * Find all the nodes children of the current ones matched by a selector
 */
u.prototype.find = function(selector) {
  
  return this.join(function(node){
    return u(selector || "*", node).nodes;
  });
};

/**
 * Get the first of the nodes
 * @return htmlnode the first html node in the matched nodes
 */
u.prototype.first = function() {
  
  return this.nodes[0] || false;
};

/**
* ajax(url, data, success, error, before);
* 
* Perform a POST request to the given url
* @param String method the method to send the data, defaults to GET
* @param String url the place to send the request
* @param String data the ready to send string of data
* @param function success optional callback if everything goes right
* @param function error optional callback if anything goes south
* @param function before optional previous callback
*/
function ajax(method, url, data, done, before) {
  
  // To avoid repeating it
  done = done || Function;
  
  // Create and send the actual request
  var request = new XMLHttpRequest;
  
  // An error is just an error
  // This uses a little hack of passing an array to u() so it handles it as
  // an array of nodes, hence we can use 'on'. However a single element wouldn't
  // work since it a) doesn't have nodeName and b) it will be sliced, failing
  u([request]).on('error timeout abort', function(){
    done(new Error, null, request);
  }).on('load', function() {
    
    // Also an error if it doesn't start by 2 or 3...
    // This is valid as there's no code 2x nor 2, nor 3x nor 3, only 2xx and 3xx
    var err = !/^(2|3)/.test(request.status) ? new Error(request.status) : null;
    
    // Attempt to parse the body into JSON
    var body = parseJson(request.response) || request.response;
    
    return done(err, body, request);
  });
  
  // Create a request of type POST to the URL and ASYNC
  request.open(method || 'GET', url);
  
  request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  
  // Load the callback before sending the data
  if (before) before(request);
  
  request.send(typeof data == 'string' ? data : u().param(data));
  
  return request;
}
/**
 * parseJson(json)
 * 
 * Parse JSON without throwing an error
 * @param String json the string to check
 * @return object from the json or false
 */
function parseJson(jsonString){
  try {
    var o = JSON.parse(jsonString);
    // Handle non-exception-throwing cases:
    // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking
    // so we must check for that, too.
    if (o && typeof o === "object") {
      return o;
    }
  } catch (e) {}

  return false;
}

/**
 * .hasClass(name)
 * 
 * Find out whether the matched elements have a class or not
 * @param String name the class name we want to find
 * @return boolean wether the nodes have the class or not
 */
u.prototype.hasClass = function(names) {
  
  names = this.args(arguments);
  
  // Attempt to find a node that passes the conditions
  return this.nodes.some(function(node){
    
    // Check if the current node has all of the classes
    return names.every(function(name){
      
      //  Check whether
      return node.classList.contains(name)
    });
  });
};

/**
 * .html(text)
 * 
 * Set or retrieve the html from the matched node(s)
 * @param text optional some text to set as html
 * @return this|html Umbrella object
 */
u.prototype.html = function(text) {
  
  // Needs to check undefined as it might be ""
  if (text === undefined) {
    return this.first().innerHTML || "";
  }
  
  
  // If we're attempting to set some text  
  // Loop through all the nodes
  return this.each(function(node) {
    
    // Set the inner html to the node
    node.innerHTML = text;
  });
};

// .is(selector)
// Check whether any of the nodes matches the selector
u.prototype.is = function(selector){
  return this.filter(selector).nodes.length > 0;
};
/**
 * Merge all of the nodes that the callback returns
 */
u.prototype.join = function(callback) {
  
  return u(this.nodes.reduce(function(newNodes, node, i){
    
    return newNodes.concat(callback(node, i));
  }, [])).unique();
};

// .not(elems)
// Delete all of the nodes that equals filter
u.prototype.not = function(filter){
  return this.filter(function(node){
    return !u(node).is(filter || true);
  });
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
  
  return this.each(function(node){
    this.args(events).forEach(function(event){
      node.addEventListener(event, callback);
    });
  });
};

/**
 * .parent()
 * 
 * Travel the matched elements one node up
 * @return this Umbrella object
 */
u.prototype.parent = function(selector) {
  
  return this.join(function(node){
    return node.parentNode;
  }).filter(selector);
};

/**
 * .prepend(html)
 * 
 * Add child the first thing inside each node
 * @param String html to be inserted
 * @return this Umbrella object
 */
u.prototype.prepend = function(html) {
  
  return this.adjacent('afterbegin', html);
};

/**
 * .remove()
 * 
 * Delete the matched nodes from the html tree
 */
u.prototype.remove = function() {
  
  // Loop through all the nodes
  return this.each(function(node) {
    
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
u.prototype.removeClass = function() {
  
  // Loop the combination of each node with each argument
  return this.eacharg(arguments, function(el, name){
    
    // Remove the class using the native method
    el.classList.remove(name);
  });
};



// Select the adecuate part from the context
u.prototype.select = function(parameter, context) {
  
  // querySelector is the only one that accepts documentFragment
  return context ? this.select.byCss(parameter, context)
    
    // If we're matching a class
    : /^\.[\w\-]+$/.test(parameter) ? this.select.byClass(parameter.substring(1))
    
    // If we're matching a tag
    : /^\w+$/.test(parameter) ? this.select.byTag(parameter)
    
      // If we match an id
    : /^\#[\w\-]+$/.test(parameter) ? this.select.byId(parameter.substring(1))
    
    // A full css selector
    : this.select.byCss(parameter);
};

// The tag nodes
u.prototype.select.byTag = document.getElementsByTagName.bind(document);

// Find some html nodes using an Id
u.prototype.select.byId = document.getElementById.bind(document);

// Find some html nodes using a Class
u.prototype.select.byClass = document.getElementsByClassName.bind(document);

// Select some elements using a css Selector
u.prototype.select.byCss = function(parameter, context) {

  return (context || document).querySelectorAll(parameter);
};
/**
 * .serialize()
 * 
 * Convert al html form elements into an object
 * The <input> and <button> without type will be parsed as default
 * NOTE: select-multiple for <select> is disabled on purpose
 * Source: http://stackoverflow.com/q/11661187
 * @return string from the form's data
 */
u.prototype.serialize = function() {
  
  // Store the class in a variable for manipulation
  return this.param(this.slice(this.first().elements).reduce(function(obj, el) {
    
    // We only want to match elements with names, but not files
    if (el.name && el.type !== 'file'
    
    // Ignore the checkboxes that are not checked
    && (!/(checkbox|radio)/.test(el.type) || el.checked)) {
      
      // Add the element to the object
      obj[el.name] = el.value;
    }
    
    return obj;
  }, {}));
};

/**
 * .siblings()
 * 
 * Travel the matched elements at the same level
 * @return this Umbrella object
 */
u.prototype.siblings = function(selector) {
  return this.parent().children(selector).not(this);
};
/**
 * .toggleClass('name1, name2, nameN' ...[, addOrRemove])
 * 
 * Toggles classes on the matched nodes
 * Possible polyfill: https://github.com/eligrey/classList.js
 * @return this Umbrella object
 */
u.prototype.toggleClass = function(classes, addOrRemove){
  
  //check if addOrRemove was passed as a boolean
  if (!!addOrRemove === addOrRemove) {

    // return the corresponding Umbrella method
    return this[addOrRemove ? 'addClass' : 'removeClass'](classes);
  }
  
  // Loop through all the nodes and classes combinations
  return this.eacharg(classes, function(el, name){
    el.classList.toggle(name);
  });
};

/**
 * .trigger(name)
 * ----------
 * Call an event manually on all the nodes
 * @param event: the event or event name to call
 * @return u: an instance of umbrella
 */
u.prototype.trigger = function(event) {
  
  // Allow the event to bubble up and to be cancelable (default)
  var opts = { bubbles: true, cancelable: true };
  
  try {
    // Accept different types of event names or an event itself
    event = (typeof event == 'string') ? new Event(event, opts) : event;
  } catch(e) {
    var name = event;
    event = document.createEvent('Event');
    event.initEvent(name, opts.bubbles, opts.cancelable);
  }
    
  // Loop all of the nodes
  return this.each(function(node){
    
    // Actually trigger the event
    node.dispatchEvent(event);
  });
};
