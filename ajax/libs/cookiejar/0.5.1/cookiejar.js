var CookieJar = Class.create();

CookieJar.prototype = {

  /**
  * Prepend before all cookie names to differentiate them.
  */
  prependString: "__CJ_",

  /**
  * Initializes the cookie jar with the options.
  */
  initialize: function(options) {
    this.options = {
      expires: 3600,    // seconds (1 hr)
      path: '',         // cookie path
      domain: '',       // cookie domain
      secure: ''        // secure ?
    };
    Object.extend(this.options, options || {});

    if (this.options.expires != '') {
      var date = new Date();
      date = new Date(date.getTime() + (this.options.expires * 1000));
      this.options.expires = '; expires=' + date.toGMTString();
    }
    if (this.options.path != '') {
      this.options.path = '; path=' + escape(this.options.path);
    }
    if (this.options.domain != '') {
      this.options.domain = '; domain=' + escape(this.options.domain);
    }
    if (this.options.secure == 'secure') {
      this.options.secure = '; secure';
    } else {
      this.options.secure = '';
    }
  },

  /**
  * Adds a name value pair.
  */
  put: function(name, value) {
    name = this.prependString + name;
    cookie = this.options;
    var type = typeof value;
    switch(type) {
      case 'undefined':
      case 'function' :
      case 'unknown'  : return false;
      case 'boolean'  : 
      case 'string'   : 
      case 'number'   : value = String(value.toString());
    }
    var cookie_str = name + "=" + escape(Object.toJSON(value));
    try {
      document.cookie = cookie_str + cookie.expires + cookie.path + cookie.domain + cookie.secure;
    } catch (e) {
      return false;
    }
    return true;
  },
  
  set: function(name, value){
    this.put(name, value);
  },

  /**
  * Removes a particular cookie (name value pair) from the Cookie Jar.
  */
  remove: function(name) {
    name = this.prependString + name;
    cookie = this.options;
    try {
      var date = new Date();
      date.setTime(date.getTime() - (3600 * 1000));
      var expires = '; expires=' + date.toGMTString();
      document.cookie = name + "=" + expires + cookie.path + cookie.domain + cookie.secure;
    } catch (e) {
      return false;
    }
    return true;
  },

  /**
  * Return a particular cookie by name;
  */
  get: function(name) {
    name = this.prependString + name;
    var cookies = document.cookie.match(name + '=(.*?)(;|$)');
    if (cookies) {
      return (unescape(cookies[1])).evalJSON();
    } else {
      return null;
    }
  },

  /**
  * Empties the Cookie Jar. Deletes all the cookies.
  */
  empty: function() {
    keys = this.getKeys();
    size = keys.size();
    for(var i=0; i<size; i++) {
      this.remove(keys[i]);
    }
  },

  /**
  * Returns all cookies as a single object
  */
  getPack: function() {
    pack = {};
    keys = this.getKeys();

    size = keys.size();
    for(i=0; i<size; i++) {
      pack[keys[i]] = this.get(keys[i]);
    }
    return pack;
  },

  /**
  * Returns all keys.
  */
  getKeys: function() {
    keys = $A();
    keyRe= /[^=; ]+(?=\=)/g;
    str  = document.cookie;
    CJRe = new RegExp("^" + this.prependString);
    while((match = keyRe.exec(str)) != undefined) {
      if (CJRe.test(match[0].strip())) {
        keys.push(match[0].strip().gsub(CJRe,""));
      }
    }
    return keys;
  }
};
