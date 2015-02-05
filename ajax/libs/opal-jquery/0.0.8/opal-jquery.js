(function(__opal) {
  var self = __opal.top, __scope = __opal, nil = __opal.nil, $mm = __opal.mm, __breaker = __opal.breaker, __slice = __opal.slice, __klass = __opal.klass;
  return (function(__base, __super){
    function Element() {};
    Element = __klass(__base, __super, "Element", Element);

    var def = Element.prototype, __scope = Element._scope, _a, _b, _c, _d, _e, _f, TMP_1, super_TMP_2, TMP_3, TMP_4, TMP_7, TMP_9, TMP_11;
    def.selector = nil;

    ((_a = Element).$include || $mm('include')).call(_a, ((_b = __scope.Enumerable) == null ? __opal.cm("Enumerable") : _b));

    Element._defs('$find', function(selector) {
      
      return $(selector);
    });

    Element._defs('$id', function(id) {
      
      
      var el = document.getElementById(id);

      if (!el) {
        return nil;
      }

      return $(el);
    
    });

    Element._defs('$new', function(tag) {
      if (tag == null) {
        tag = "div"
      }
      return $(document.createElement(tag));
    });

    Element._defs('$parse', function(str) {
      
      return $(str);
    });

    Element._defs('$expose', function(methods) {
      methods = __slice.call(arguments, 0);
      
      for (var i = 0, length = methods.length, method; i < length; i++) {
        method = methods[i];
        this.prototype['$' + method] = this.prototype[method];
      }

      return nil;
    
    });

    ((_b = Element).$expose || $mm('expose')).call(_b, "after", "before", "parent", "parents", "prepend", "prev", "remove");

    ((_c = Element).$expose || $mm('expose')).call(_c, "hide", "show", "toggle", "children", "blur", "closest", "data");

    ((_d = Element).$expose || $mm('expose')).call(_d, "focus", "find", "next", "siblings", "text", "trigger", "append");

    ((_e = Element).$expose || $mm('expose')).call(_e, "height", "width", "serialize", "is", "filter", "last", "first");

    ((_f = Element).$expose || $mm('expose')).call(_f, "wrap", "stop", "clone");

    def.$selector = function() {
      
      return this.selector
    }, nil;

    def['$[]='] = def.attr;

    def.$add_class = def.addClass;

    def.$append_to = def.appendTo;

    def['$has_class?'] = def.hasClass;

    def['$html='] = def.html;

    def.$remove_attr = def.removeAttr;

    def.$remove_class = def.removeClass;

    def['$text='] = def.text;

    def.$toggle_class = def.toggleClass;

    def['$value='] = def.val;

    def['$scroll_left='] = def.scrollLeft;

    def.$scroll_left = def.scrollLeft;

    def.$remove_attribute = def.removeAttr;

    def.$slide_down = def.slideDown;

    def.$slide_up = def.slideUp;

    def.$slide_toggle = def.slideToggle;

    def.$fade_toggle = def.fadeToggle;

    super_TMP_2 = def.$method_missing;
    def.$method_missing = TMP_1 = function(symbol, args) {
      var block;
      block = TMP_1._p || nil, TMP_1._p = null;
      args = __slice.call(arguments, 1);
      
      if (this[symbol]) {
        return this[symbol].apply(this, args);
      }
    
      return super_TMP_2.apply(this, __slice.call(arguments));
    };

    def['$[]'] = function(name) {
      
      return this.attr(name) || "";
    };

    def.$add_attribute = function(name) {
      var _a;
      return ((_a = this)['$[]='] || $mm('[]=')).call(_a, name, "");
    };

    def['$has_attribute?'] = function(name) {
      
      return !!this.attr(name);
    };

    def['$<<'] = def.$append;

    def.$append_to_body = function() {
      
      return this.appendTo(document.body);
    };

    def.$append_to_head = function() {
      
      return this.appendTo(document.head);
    };

    def.$at = function(index) {
      
      
      var length = this.length;

      if (index < 0) {
        index += length;
      }

      if (index < 0 || index >= length) {
        return nil;
      }

      return $(this[index]);
    
    };

    def.$class_name = function() {
      
      
      var first = this[0];
      return (first && first.className) || "";
    
    };

    def['$class_name='] = function(name) {
      
      
      for (var i = 0, length = this.length; i < length; i++) {
        this[i].className = name;
      }
    
      return this;
    };

    def.$css = function(name, value) {
      var _a, _b, _c, _d, _e;if (value == null) {
        value = nil
      }
      if ((_a = (_b = ((_b = value)['$nil?'] || $mm('nil?')).call(_b), _b !== false && _b !== nil ? ((_c = name)['$is_a?'] || $mm('is_a?')).call(_c, ((_d = __scope.String) == null ? __opal.cm("String") : _d)) : _b)) !== false && _a !== nil) {
        return this.css(name)
        } else {
        if ((_a = ((_d = name)['$is_a?'] || $mm('is_a?')).call(_d, ((_e = __scope.Hash) == null ? __opal.cm("Hash") : _e))) !== false && _a !== nil) {
          this.css(((_a = name).$to_native || $mm('to_native')).call(_a));
          } else {
          this.css(name, value);
        }
      };
      return this;
    };

    def.$animate = TMP_3 = function(params) {
      var speed = nil, _a, _b, _c, _d, block;
      block = TMP_3._p || nil, TMP_3._p = null;
      
      speed = (function() { if ((_a = ((_b = params)['$has_key?'] || $mm('has_key?')).call(_b, "speed")) !== false && _a !== nil) {
        return ((_a = params).$delete || $mm('delete')).call(_a, "speed")
        } else {
        return 400
      }; return nil; }).call(this);
      
      this.animate(((_c = params).$to_native || $mm('to_native')).call(_c), speed, function() {
        if ((block !== nil)) {
        ((_d = block).$call || $mm('call')).call(_d)
      }
      })
    ;
    };

    def.$effect = TMP_4 = function(name, args) {
      var TMP_5, _a, _b, TMP_6, _c, _d, _e, block;
      block = TMP_4._p || nil, TMP_4._p = null;
      args = __slice.call(arguments, 1);
      name = (_a = ((_b = name).$gsub || $mm('gsub')), _a._p = (TMP_5 = function(match) {

        var self = TMP_5._s || this, _a, _b;
        if (match == null) match = nil;

        return ((_a = ((_b = match)['$[]'] || $mm('[]')).call(_b, 1)).$upcase || $mm('upcase')).call(_a)
      }, TMP_5._s = this, TMP_5), _a).call(_b, /_\w/);
      args = ((_a = (_c = ((_d = args).$map || $mm('map')), _c._p = (TMP_6 = function(a) {

        var self = TMP_6._s || this, _a, _b;
        if (a == null) a = nil;

        if ((_a = ((_b = a)['$respond_to?'] || $mm('respond_to?')).call(_b, "to_native")) !== false && _a !== nil) {
          return ((_a = a).$to_native || $mm('to_native')).call(_a)
          } else {
          return nil
        }
      }, TMP_6._s = this, TMP_6), _c).call(_d)).$compact || $mm('compact')).call(_a);
      ((_c = args)['$<<'] || $mm('<<')).call(_c, function() { if ((block !== nil)) {
        ((_e = block).$call || $mm('call')).call(_e)
      } });
      return this[name].apply(this, args);
    };

    def['$visible?'] = function() {
      
      return this.is(':visible');
    };

    def.$offset = function() {
      var _a, _b;
      return ((_a = ((_b = __scope.Hash) == null ? __opal.cm("Hash") : _b)).$from_native || $mm('from_native')).call(_a, this.offset());
    };

    def.$each = TMP_7 = function() {
      var __yield;
      __yield = TMP_7._p || nil, TMP_7._p = null;
      
      for (var i = 0, length = this.length; i < length; i++) {
      if (__yield.call(null, $(this[i])) === __breaker) return __breaker.$v;
      };
      return this;
    };

    def.$map = TMP_9 = function() {
      var list = nil, TMP_8, _a, _b, __yield;
      __yield = TMP_9._p || nil, TMP_9._p = null;
      
      list = [];
      (_a = ((_b = this).$each || $mm('each')), _a._p = (TMP_8 = function(el) {

        var self = TMP_8._s || this, _a, _b;
        if (el == null) el = nil;

        return ((_a = list)['$<<'] || $mm('<<')).call(_a, (((_b = __yield.call(null, el)) === __breaker) ? __breaker.$v : _b))
      }, TMP_8._s = this, TMP_8), _a).call(_b);
      return list;
    };

    def.$to_a = function() {
      var TMP_10, _a, _b;
      return (_a = ((_b = this).$map || $mm('map')), _a._p = (TMP_10 = function(el) {

        var self = TMP_10._s || this;
        if (el == null) el = nil;

        return el
      }, TMP_10._s = this, TMP_10), _a).call(_b);
    };

    def.$first = function() {
      
      return this.length ? this.first() : nil;
    };

    def.$html = function() {
      
      return this.html() || "";
    };

    def.$id = function() {
      
      
      var first = this[0];
      return (first && first.id) || "";
    
    };

    def['$id='] = function(id) {
      
      
      var first = this[0];

      if (first) {
        first.id = id;
      }

      return this;
    
    };

    def.$tag_name = function() {
      
      return this.length > 0 ? this[0].tagName.toLowerCase() : nil;
    };

    def.$inspect = function() {
      
      
      var val, el, str, result = [];

      for (var i = 0, length = this.length; i < length; i++) {
        el  = this[i];
        str = "<" + el.tagName.toLowerCase();

        if (val = el.id) str += (' id="' + val + '"');
        if (val = el.className) str += (' class="' + val + '"');

        result.push(str + '>');
      }

      return '[' + result.join(', ') + ']';
    
    };

    def.$length = function() {
      
      return this.length;
    };

    def['$any?'] = function() {
      
      return this.length > 0;
    };

    def['$empty?'] = function() {
      
      return this.length === 0;
    };

    def['$empty?'] = def['$none?'];

    def.$on = TMP_11 = function(name, sel) {
      var block;
      block = TMP_11._p || nil, TMP_11._p = null;
      if (sel == null) {
        sel = nil
      }
      sel === nil ? this.on(name, block) : this.on(name, sel, block);
      return block;
    };

    def.$off = function(name, sel, block) {
      if (block == null) {
        block = nil
      }
      return block === nil ? this.off(name, sel) : this.off(name, sel, block);
    };

    def.$size = def.$length;

    def.$succ = def.$next;

    def.$value = function() {
      
      return this.val() || "";
    };

    return nil;
  })(self, jQuery)
})(Opal);
(function(__opal) {
  var _a, _b, self = __opal.top, __scope = __opal, nil = __opal.nil, $mm = __opal.mm, __breaker = __opal.breaker, __slice = __opal.slice, __gvars = __opal.gvars;
  __gvars["document"] = ((_a = ((_b = __scope.Element) == null ? __opal.cm("Element") : _b)).$find || $mm('find')).call(_a, document);
  (function(){var __scope = this._scope, def = this.prototype;def['$ready?'] = TMP_1 = function() {
    var block;
    block = TMP_1._p || nil, TMP_1._p = null;
    
    
      if (block === nil) {
        return nil;
      }

      $(block);
      return nil;
    
  };
  def.$title = function() {
    
    return document.title;
  };
  return def['$title='] = function(title) {
    
    return document.title = title;
  };}).call(((_b = __gvars["document"]).$singleton_class || $mm('singleton_class')).call(_b));
  return __scope.Document = __gvars["document"];
})(Opal);
(function(__opal) {
  var self = __opal.top, __scope = __opal, nil = __opal.nil, $mm = __opal.mm, __breaker = __opal.breaker, __slice = __opal.slice, __klass = __opal.klass;
  return (function(__base, __super){
    function Event() {};
    Event = __klass(__base, __super, "Event", Event);

    var def = Event.prototype, __scope = Event._scope;

    def['$[]'] = function(name) {
      
      return this[name];
    };

    def.$current_target = function() {
      
      return $(this.currentTarget);
    };

    def['$default_prevented?'] = function() {
      
      return this.isDefaultPrevented();
    };

    def.$kill = function() {
      var _a, _b;
      ((_a = this).$stop_propagation || $mm('stop_propagation')).call(_a);
      return ((_b = this).$prevent_default || $mm('prevent_default')).call(_b);
    };

    def.$prevent_default = def.preventDefault;

    def.$page_x = function() {
      
      return this.pageX;
    };

    def.$page_y = function() {
      
      return this.pageY;
    };

    def['$propagation_stopped?'] = def.propagationStopped;

    def.$stop_propagation = def.stopPropagation;

    def.$stop_immediate_propagation = def.stopImmediatePropagation;

    def.$target = function() {
      
      return $(this.target);
    };

    def.$touch_x = function() {
      
      return this.originalEvent.touches[0].pageX;
    };

    def.$touch_y = function() {
      
      return this.originalEvent.touches[0].pageY;
    };

    def.$type = function() {
      
      return this.type;
    };

    def.$which = function() {
      
      return this.which;
    };

    return nil;
  })(self, $.Event)
})(Opal);
(function(__opal) {
  var self = __opal.top, __scope = __opal, nil = __opal.nil, $mm = __opal.mm, __breaker = __opal.breaker, __slice = __opal.slice, __klass = __opal.klass, __hash2 = __opal.hash2;
  return (function(__base, __super){
    function HTTP() {};
    HTTP = __klass(__base, __super, "HTTP", HTTP);

    var def = HTTP.prototype, __scope = HTTP._scope, TMP_1, TMP_2, TMP_3, TMP_4, TMP_5, TMP_6;
    def.body = def.error_message = def.method = def.status_code = def.url = def.xhr = def.errback = def.json = def.ok = def.settings = def.callback = nil;

    def.$body = function() {
      
      return this.body
    }, 
    def.$error_message = function() {
      
      return this.error_message
    }, 
    def.$method = function() {
      
      return this.method
    }, 
    def.$status_code = function() {
      
      return this.status_code
    }, 
    def.$url = function() {
      
      return this.url
    }, 
    def.$xhr = function() {
      
      return this.xhr
    }, nil;

    HTTP._defs('$get', TMP_1 = function(url, opts) {
      var _a, _b, block;
      block = TMP_1._p || nil, TMP_1._p = null;
      if (opts == null) {
        opts = __hash2([], {})
      }
      return ((_a = ((_b = this).$new || $mm('new')).call(_b, url, "GET", opts, block))['$send!'] || $mm('send!')).call(_a)
    });

    HTTP._defs('$post', TMP_2 = function(url, opts) {
      var _a, _b, block;
      block = TMP_2._p || nil, TMP_2._p = null;
      if (opts == null) {
        opts = __hash2([], {})
      }
      return ((_a = ((_b = this).$new || $mm('new')).call(_b, url, "POST", opts, block))['$send!'] || $mm('send!')).call(_a)
    });

    HTTP._defs('$put', TMP_3 = function(url, opts) {
      var _a, _b, block;
      block = TMP_3._p || nil, TMP_3._p = null;
      if (opts == null) {
        opts = __hash2([], {})
      }
      return ((_a = ((_b = this).$new || $mm('new')).call(_b, url, "PUT", opts, block))['$send!'] || $mm('send!')).call(_a)
    });

    HTTP._defs('$delete', TMP_4 = function(url, opts) {
      var _a, _b, block;
      block = TMP_4._p || nil, TMP_4._p = null;
      if (opts == null) {
        opts = __hash2([], {})
      }
      return ((_a = ((_b = this).$new || $mm('new')).call(_b, url, "DELETE", opts, block))['$send!'] || $mm('send!')).call(_a)
    });

    def.$initialize = function(url, method, options, handler) {
      var http = nil, payload = nil, settings = nil, _a, _b, _c, _d, _e;if (handler == null) {
        handler = nil
      }
      this.url = url;
      this.method = method;
      this.ok = true;
      this.xhr = nil;
      http = this;
      payload = ((_a = options).$delete || $mm('delete')).call(_a, "payload");
      settings = ((_b = options).$to_native || $mm('to_native')).call(_b);
      if (handler !== false && handler !== nil) {
        this.callback = this.errback = handler
      };
      
      if (typeof(payload) === 'string') {
        settings.data = payload;
      }
      else if (payload !== nil) {
        settings.data = payload.$to_json();
        settings.contentType = 'application/json';
      }

      settings.url  = url;
      settings.type = method;

      settings.success = function(data, status, xhr) {
        http.body = data;
        http.xhr = xhr;

        if (typeof(data) === 'object') {
          http.json = ((_c = ((_d = __scope.JSON) == null ? __opal.cm("JSON") : _d)).$from_object || $mm('from_object')).call(_c, data);
        }

        return ((_d = http).$succeed || $mm('succeed')).call(_d);
      };

      settings.error = function(xhr, status, error) {
        http.body = xhr.responseText;
        http.xhr = xhr;

        return ((_e = http).$fail || $mm('fail')).call(_e);
      };
    
      return this.settings = settings;
    };

    def.$callback = TMP_5 = function() {
      var block;
      block = TMP_5._p || nil, TMP_5._p = null;
      
      this.callback = block;
      return this;
    };

    def.$errback = TMP_6 = function() {
      var block;
      block = TMP_6._p || nil, TMP_6._p = null;
      
      this.errback = block;
      return this;
    };

    def.$fail = function() {
      var _a;
      this.ok = false;
      if ((_a = this.errback) !== false && _a !== nil) {
        return ((_a = this.errback).$call || $mm('call')).call(_a, this)
        } else {
        return nil
      };
    };

    def.$json = function() {
      var _a, _b, _c;
      return ((_a = this.json), _a !== false && _a !== nil ? _a : ((_b = ((_c = __scope.JSON) == null ? __opal.cm("JSON") : _c)).$parse || $mm('parse')).call(_b, this.body));
    };

    def['$ok?'] = function() {
      
      return this.ok;
    };

    def['$send!'] = function() {
      
      $.ajax(this.settings);
      return this;
    };

    def.$succeed = function() {
      var _a;
      if ((_a = this.callback) !== false && _a !== nil) {
        return ((_a = this.callback).$call || $mm('call')).call(_a, this)
        } else {
        return nil
      };
    };

    def.$get_header = function(key) {
      var _a;
      return ((_a = this).$xhr || $mm('xhr')).call(_a).getResponseHeader(key);
    };

    return nil;
  })(self, null)
})(Opal);
(function(__opal) {
  var self = __opal.top, __scope = __opal, nil = __opal.nil, $mm = __opal.mm, __breaker = __opal.breaker, __slice = __opal.slice, __module = __opal.module;
  return (function(__base){
    function Kernel() {};
    Kernel = __module(__base, "Kernel", Kernel);
    var def = Kernel.prototype, __scope = Kernel._scope;

    def.$alert = function(msg) {
      
      alert(msg);
      return nil;
    }
        ;Kernel._donate(["$alert"]);
  })(self)
})(Opal);
(function(__opal) {
  var self = __opal.top, __scope = __opal, nil = __opal.nil, $mm = __opal.mm, __breaker = __opal.breaker, __slice = __opal.slice;
  return ;
})(Opal);
