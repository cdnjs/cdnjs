(function () {
/**
 * almond 0.1.4 Copyright (c) 2011, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/almond for details
 */
//Going sloppy to avoid 'use strict' string cost, but strict practices should
//be followed.
/*jslint sloppy: true */
/*global setTimeout: false */

var requirejs, require, define;
(function (undef) {
    var main, req,
        defined = {},
        waiting = {},
        config = {},
        defining = {},
        aps = [].slice;

    /**
     * Given a relative module name, like ./something, normalize it to
     * a real name that can be mapped to a path.
     * @param {String} name the relative name
     * @param {String} baseName a real name that the name arg is relative
     * to.
     * @returns {String} normalized name
     */
    function normalize(name, baseName) {
        var nameParts, nameSegment, mapValue, foundMap,
            foundI, foundStarMap, starI, i, j, part,
            baseParts = baseName && baseName.split("/"),
            map = config.map,
            starMap = (map && map['*']) || {};

        //Adjust any relative paths.
        if (name && name.charAt(0) === ".") {
            //If have a base name, try to normalize against it,
            //otherwise, assume it is a top-level require that will
            //be relative to baseUrl in the end.
            if (baseName) {
                //Convert baseName to array, and lop off the last part,
                //so that . matches that "directory" and not name of the baseName's
                //module. For instance, baseName of "one/two/three", maps to
                //"one/two/three.js", but we want the directory, "one/two" for
                //this normalization.
                baseParts = baseParts.slice(0, baseParts.length - 1);

                name = baseParts.concat(name.split("/"));

                //start trimDots
                for (i = 0; i < name.length; i += 1) {
                    part = name[i];
                    if (part === ".") {
                        name.splice(i, 1);
                        i -= 1;
                    } else if (part === "..") {
                        if (i === 1 && (name[2] === '..' || name[0] === '..')) {
                            //End of the line. Keep at least one non-dot
                            //path segment at the front so it can be mapped
                            //correctly to disk. Otherwise, there is likely
                            //no path mapping for a path starting with '..'.
                            //This can still fail, but catches the most reasonable
                            //uses of ..
                            break;
                        } else if (i > 0) {
                            name.splice(i - 1, 2);
                            i -= 2;
                        }
                    }
                }
                //end trimDots

                name = name.join("/");
            }
        }

        //Apply map config if available.
        if ((baseParts || starMap) && map) {
            nameParts = name.split('/');

            for (i = nameParts.length; i > 0; i -= 1) {
                nameSegment = nameParts.slice(0, i).join("/");

                if (baseParts) {
                    //Find the longest baseName segment match in the config.
                    //So, do joins on the biggest to smallest lengths of baseParts.
                    for (j = baseParts.length; j > 0; j -= 1) {
                        mapValue = map[baseParts.slice(0, j).join('/')];

                        //baseName segment has  config, find if it has one for
                        //this name.
                        if (mapValue) {
                            mapValue = mapValue[nameSegment];
                            if (mapValue) {
                                //Match, update name to the new value.
                                foundMap = mapValue;
                                foundI = i;
                                break;
                            }
                        }
                    }
                }

                if (foundMap) {
                    break;
                }

                //Check for a star map match, but just hold on to it,
                //if there is a shorter segment match later in a matching
                //config, then favor over this star map.
                if (!foundStarMap && starMap && starMap[nameSegment]) {
                    foundStarMap = starMap[nameSegment];
                    starI = i;
                }
            }

            if (!foundMap && foundStarMap) {
                foundMap = foundStarMap;
                foundI = starI;
            }

            if (foundMap) {
                nameParts.splice(0, foundI, foundMap);
                name = nameParts.join('/');
            }
        }

        return name;
    }

    function makeRequire(relName, forceSync) {
        return function () {
            //A version of a require function that passes a moduleName
            //value for items that may need to
            //look up paths relative to the moduleName
            return req.apply(undef, aps.call(arguments, 0).concat([relName, forceSync]));
        };
    }

    function makeNormalize(relName) {
        return function (name) {
            return normalize(name, relName);
        };
    }

    function makeLoad(depName) {
        return function (value) {
            defined[depName] = value;
        };
    }

    function callDep(name) {
        if (waiting.hasOwnProperty(name)) {
            var args = waiting[name];
            delete waiting[name];
            defining[name] = true;
            main.apply(undef, args);
        }

        if (!defined.hasOwnProperty(name)) {
            throw new Error('No ' + name);
        }
        return defined[name];
    }

    /**
     * Makes a name map, normalizing the name, and using a plugin
     * for normalization if necessary. Grabs a ref to plugin
     * too, as an optimization.
     */
    function makeMap(name, relName) {
        var prefix, plugin,
            index = name.indexOf('!');

        if (index !== -1) {
            prefix = normalize(name.slice(0, index), relName);
            name = name.slice(index + 1);
            plugin = callDep(prefix);

            //Normalize according
            if (plugin && plugin.normalize) {
                name = plugin.normalize(name, makeNormalize(relName));
            } else {
                name = normalize(name, relName);
            }
        } else {
            name = normalize(name, relName);
        }

        //Using ridiculous property names for space reasons
        return {
            f: prefix ? prefix + '!' + name : name, //fullName
            n: name,
            p: plugin
        };
    }

    function makeConfig(name) {
        return function () {
            return (config && config.config && config.config[name]) || {};
        };
    }

    main = function (name, deps, callback, relName) {
        var cjsModule, depName, ret, map, i,
            args = [],
            usingExports;

        //Use name if no relName
        relName = relName || name;

        //Call the callback to define the module, if necessary.
        if (typeof callback === 'function') {

            //Pull out the defined dependencies and pass the ordered
            //values to the callback.
            //Default to [require, exports, module] if no deps
            deps = !deps.length && callback.length ? ['require', 'exports', 'module'] : deps;
            for (i = 0; i < deps.length; i += 1) {
                map = makeMap(deps[i], relName);
                depName = map.f;

                //Fast path CommonJS standard dependencies.
                if (depName === "require") {
                    args[i] = makeRequire(name);
                } else if (depName === "exports") {
                    //CommonJS module spec 1.1
                    args[i] = defined[name] = {};
                    usingExports = true;
                } else if (depName === "module") {
                    //CommonJS module spec 1.1
                    cjsModule = args[i] = {
                        id: name,
                        uri: '',
                        exports: defined[name],
                        config: makeConfig(name)
                    };
                } else if (defined.hasOwnProperty(depName) || waiting.hasOwnProperty(depName)) {
                    args[i] = callDep(depName);
                } else if (map.p) {
                    map.p.load(map.n, makeRequire(relName, true), makeLoad(depName), {});
                    args[i] = defined[depName];
                } else if (!defining[depName]) {
                    throw new Error(name + ' missing ' + depName);
                }
            }

            ret = callback.apply(defined[name], args);

            if (name) {
                //If setting exports via "module" is in play,
                //favor that over return value and exports. After that,
                //favor a non-undefined return value over exports use.
                if (cjsModule && cjsModule.exports !== undef &&
                        cjsModule.exports !== defined[name]) {
                    defined[name] = cjsModule.exports;
                } else if (ret !== undef || !usingExports) {
                    //Use the return value from the function.
                    defined[name] = ret;
                }
            }
        } else if (name) {
            //May just be an object definition for the module. Only
            //worry about defining if have a module name.
            defined[name] = callback;
        }
    };

    requirejs = require = req = function (deps, callback, relName, forceSync, alt) {
        if (typeof deps === "string") {
            //Just return the module wanted. In this scenario, the
            //deps arg is the module name, and second arg (if passed)
            //is just the relName.
            //Normalize module name, if it contains . or ..
            return callDep(makeMap(deps, callback).f);
        } else if (!deps.splice) {
            //deps is a config object, not an array.
            config = deps;
            if (callback.splice) {
                //callback is an array, which means it is a dependency list.
                //Adjust args if there are dependencies
                deps = callback;
                callback = relName;
                relName = null;
            } else {
                deps = undef;
            }
        }

        //Support require(['a'])
        callback = callback || function () {};

        //If relName is a function, it is an errback handler,
        //so remove it.
        if (typeof relName === 'function') {
            relName = forceSync;
            forceSync = alt;
        }

        //Simulate async callback;
        if (forceSync) {
            main(undef, deps, callback, relName);
        } else {
            setTimeout(function () {
                main(undef, deps, callback, relName);
            }, 15);
        }

        return req;
    };

    /**
     * Just drops the config on the floor, but returns req in case
     * the config return value is used.
     */
    req.config = function (cfg) {
        config = cfg;
        return req;
    };

    define = function (name, deps, callback) {

        //This module may not have dependencies
        if (!deps.splice) {
            //deps is not an array, so probably means
            //an object literal or factory function for
            //the value. Adjust args.
            callback = deps;
            deps = [];
        }

        waiting[name] = [name, deps, callback];
    };

    define.amd = {
        jQuery: true
    };
}());

define("almond", function(){});

//Wrapped in an outer function to preserve global this
(function (root) { var amdExports; define('bootstrap/bootstrap-transition',['jquery'], function () { (function () {

/* ===================================================
 * bootstrap-transition.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#transitions
 * ===================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

   // jshint ;_;


  /* CSS TRANSITION SUPPORT (http://www.modernizr.com/)
   * ======================================================= */

  $(function () {

    $.support.transition = (function () {

      var transitionEnd = (function () {

        var el = document.createElement('bootstrap')
          , transEndEventNames = {
               'WebkitTransition' : 'webkitTransitionEnd'
            ,  'MozTransition'    : 'transitionend'
            ,  'OTransition'      : 'oTransitionEnd otransitionend'
            ,  'transition'       : 'transitionend'
            }
          , name

        for (name in transEndEventNames){
          if (el.style[name] !== undefined) {
            return transEndEventNames[name]
          }
        }

      }())

      return transitionEnd && {
        end: transitionEnd
      }

    })()

  })

}(window.jQuery);


}.call(root));
    return amdExports;
}); }(this));

//Wrapped in an outer function to preserve global this
(function (root) { var amdExports; define('bootstrap/bootstrap-affix',['bootstrap/bootstrap-transition'], function () { (function () {

/* ==========================================================
 * bootstrap-affix.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#affix
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

   // jshint ;_;


 /* AFFIX CLASS DEFINITION
  * ====================== */

  var Affix = function (element, options) {
    this.options = $.extend({}, $.fn.affix.defaults, options)
    this.$window = $(window)
      .on('scroll.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.affix.data-api',  $.proxy(function () { setTimeout($.proxy(this.checkPosition, this), 1) }, this))
    this.$element = $(element)
    this.checkPosition()
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var scrollHeight = $(document).height()
      , scrollTop = this.$window.scrollTop()
      , position = this.$element.offset()
      , offset = this.options.offset
      , offsetBottom = offset.bottom
      , offsetTop = offset.top
      , reset = 'affix affix-top affix-bottom'
      , affix

    if (typeof offset != 'object') offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function') offsetTop = offset.top()
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom()

    affix = this.unpin != null && (scrollTop + this.unpin <= position.top) ?
      false    : offsetBottom != null && (position.top + this.$element.height() >= scrollHeight - offsetBottom) ?
      'bottom' : offsetTop != null && scrollTop <= offsetTop ?
      'top'    : false

    if (this.affixed === affix) return

    this.affixed = affix
    this.unpin = affix == 'bottom' ? position.top - scrollTop : null

    this.$element.removeClass(reset).addClass('affix' + (affix ? '-' + affix : ''))
  }


 /* AFFIX PLUGIN DEFINITION
  * ======================= */

  var old = $.fn.affix

  $.fn.affix = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('affix')
        , options = typeof option == 'object' && option
      if (!data) $this.data('affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.affix.Constructor = Affix

  $.fn.affix.defaults = {
    offset: 0
  }


 /* AFFIX NO CONFLICT
  * ================= */

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


 /* AFFIX DATA-API
  * ============== */

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
        , data = $spy.data()

      data.offset = data.offset || {}

      data.offsetBottom && (data.offset.bottom = data.offsetBottom)
      data.offsetTop && (data.offset.top = data.offsetTop)

      $spy.affix(data)
    })
  })


}(window.jQuery);


}.call(root));
    return amdExports;
}); }(this));

//Wrapped in an outer function to preserve global this
(function (root) { var amdExports; define('bootstrap/bootstrap-alert',['bootstrap/bootstrap-transition'], function () { (function () {

/* ==========================================================
 * bootstrap-alert.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#alerts
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

   // jshint ;_;


 /* ALERT CLASS DEFINITION
  * ====================== */

  var dismiss = '[data-dismiss="alert"]'
    , Alert = function (el) {
        $(el).on('click', dismiss, this.close)
      }

  Alert.prototype.close = function (e) {
    var $this = $(this)
      , selector = $this.attr('data-target')
      , $parent

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    $parent = $(selector)

    e && e.preventDefault()

    $parent.length || ($parent = $this.hasClass('alert') ? $this : $this.parent())

    $parent.trigger(e = $.Event('close'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      $parent
        .trigger('closed')
        .remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent.on($.support.transition.end, removeElement) :
      removeElement()
  }


 /* ALERT PLUGIN DEFINITION
  * ======================= */

  var old = $.fn.alert

  $.fn.alert = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('alert')
      if (!data) $this.data('alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.alert.Constructor = Alert


 /* ALERT NO CONFLICT
  * ================= */

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


 /* ALERT DATA-API
  * ============== */

  $(document).on('click.alert.data-api', dismiss, Alert.prototype.close)

}(window.jQuery);


}.call(root));
    return amdExports;
}); }(this));

//Wrapped in an outer function to preserve global this
(function (root) { var amdExports; define('bootstrap/bootstrap-button',['bootstrap/bootstrap-transition'], function () { (function () {

/* ============================================================
 * bootstrap-button.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#buttons
 * ============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function ($) {

   // jshint ;_;


 /* BUTTON PUBLIC CLASS DEFINITION
  * ============================== */

  var Button = function (element, options) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.button.defaults, options)
  }

  Button.prototype.setState = function (state) {
    var d = 'disabled'
      , $el = this.$element
      , data = $el.data()
      , val = $el.is('input') ? 'val' : 'html'

    state = state + 'Text'
    data.resetText || $el.data('resetText', $el[val]())

    $el[val](data[state] || this.options[state])

    // push to event loop to allow forms to submit
    setTimeout(function () {
      state == 'loadingText' ?
        $el.addClass(d).attr(d, d) :
        $el.removeClass(d).removeAttr(d)
    }, 0)
  }

  Button.prototype.toggle = function () {
    var $parent = this.$element.closest('[data-toggle="buttons-radio"]')

    $parent && $parent
      .find('.active')
      .removeClass('active')

    this.$element.toggleClass('active')
  }


 /* BUTTON PLUGIN DEFINITION
  * ======================== */

  var old = $.fn.button

  $.fn.button = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('button')
        , options = typeof option == 'object' && option
      if (!data) $this.data('button', (data = new Button(this, options)))
      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  $.fn.button.defaults = {
    loadingText: 'loading...'
  }

  $.fn.button.Constructor = Button


 /* BUTTON NO CONFLICT
  * ================== */

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


 /* BUTTON DATA-API
  * =============== */

  $(document).on('click.button.data-api', '[data-toggle^=button]', function (e) {
    var $btn = $(e.target)
    if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
    $btn.button('toggle')
  })

}(window.jQuery);


}.call(root));
    return amdExports;
}); }(this));

//Wrapped in an outer function to preserve global this
(function (root) { var amdExports; define('bootstrap/bootstrap-carousel',['bootstrap/bootstrap-transition'], function () { (function () {

/* ==========================================================
 * bootstrap-carousel.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#carousel
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

   // jshint ;_;


 /* CAROUSEL CLASS DEFINITION
  * ========================= */

  var Carousel = function (element, options) {
    this.$element = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options = options
    this.options.pause == 'hover' && this.$element
      .on('mouseenter', $.proxy(this.pause, this))
      .on('mouseleave', $.proxy(this.cycle, this))
  }

  Carousel.prototype = {

    cycle: function (e) {
      if (!e) this.paused = false
      if (this.interval) clearInterval(this.interval);
      this.options.interval
        && !this.paused
        && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))
      return this
    }

  , getActiveIndex: function () {
      this.$active = this.$element.find('.item.active')
      this.$items = this.$active.parent().children()
      return this.$items.index(this.$active)
    }

  , to: function (pos) {
      var activeIndex = this.getActiveIndex()
        , that = this

      if (pos > (this.$items.length - 1) || pos < 0) return

      if (this.sliding) {
        return this.$element.one('slid', function () {
          that.to(pos)
        })
      }

      if (activeIndex == pos) {
        return this.pause().cycle()
      }

      return this.slide(pos > activeIndex ? 'next' : 'prev', $(this.$items[pos]))
    }

  , pause: function (e) {
      if (!e) this.paused = true
      if (this.$element.find('.next, .prev').length && $.support.transition.end) {
        this.$element.trigger($.support.transition.end)
        this.cycle(true)
      }
      clearInterval(this.interval)
      this.interval = null
      return this
    }

  , next: function () {
      if (this.sliding) return
      return this.slide('next')
    }

  , prev: function () {
      if (this.sliding) return
      return this.slide('prev')
    }

  , slide: function (type, next) {
      var $active = this.$element.find('.item.active')
        , $next = next || $active[type]()
        , isCycling = this.interval
        , direction = type == 'next' ? 'left' : 'right'
        , fallback  = type == 'next' ? 'first' : 'last'
        , that = this
        , e

      this.sliding = true

      isCycling && this.pause()

      $next = $next.length ? $next : this.$element.find('.item')[fallback]()

      e = $.Event('slide', {
        relatedTarget: $next[0]
      , direction: direction
      })

      if ($next.hasClass('active')) return

      if (this.$indicators.length) {
        this.$indicators.find('.active').removeClass('active')
        this.$element.one('slid', function () {
          var $nextIndicator = $(that.$indicators.children()[that.getActiveIndex()])
          $nextIndicator && $nextIndicator.addClass('active')
        })
      }

      if ($.support.transition && this.$element.hasClass('slide')) {
        this.$element.trigger(e)
        if (e.isDefaultPrevented()) return
        $next.addClass(type)
        $next[0].offsetWidth // force reflow
        $active.addClass(direction)
        $next.addClass(direction)
        this.$element.one($.support.transition.end, function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () { that.$element.trigger('slid') }, 0)
        })
      } else {
        this.$element.trigger(e)
        if (e.isDefaultPrevented()) return
        $active.removeClass('active')
        $next.addClass('active')
        this.sliding = false
        this.$element.trigger('slid')
      }

      isCycling && this.cycle()

      return this
    }

  }


 /* CAROUSEL PLUGIN DEFINITION
  * ========================== */

  var old = $.fn.carousel

  $.fn.carousel = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('carousel')
        , options = $.extend({}, $.fn.carousel.defaults, typeof option == 'object' && option)
        , action = typeof option == 'string' ? option : options.slide
      if (!data) $this.data('carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  $.fn.carousel.defaults = {
    interval: 5000
  , pause: 'hover'
  }

  $.fn.carousel.Constructor = Carousel


 /* CAROUSEL NO CONFLICT
  * ==================== */

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }

 /* CAROUSEL DATA-API
  * ================= */

  $(document).on('click.carousel.data-api', '[data-slide], [data-slide-to]', function (e) {
    var $this = $(this), href
      , $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
      , options = $.extend({}, $target.data(), $this.data())
      , slideIndex

    $target.carousel(options)

    if (slideIndex = $this.attr('data-slide-to')) {
      $target.data('carousel').pause().to(slideIndex).cycle()
    }

    e.preventDefault()
  })

}(window.jQuery);


}.call(root));
    return amdExports;
}); }(this));

//Wrapped in an outer function to preserve global this
(function (root) { var amdExports; define('bootstrap/bootstrap-collapse',['bootstrap/bootstrap-transition'], function () { (function () {

/* =============================================================
 * bootstrap-collapse.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#collapse
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function ($) {

   // jshint ;_;


 /* COLLAPSE PUBLIC CLASS DEFINITION
  * ================================ */

  var Collapse = function (element, options) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.collapse.defaults, options)

    if (this.options.parent) {
      this.$parent = $(this.options.parent)
    }

    this.options.toggle && this.toggle()
  }

  Collapse.prototype = {

    constructor: Collapse

  , dimension: function () {
      var hasWidth = this.$element.hasClass('width')
      return hasWidth ? 'width' : 'height'
    }

  , show: function () {
      var dimension
        , scroll
        , actives
        , hasData

      if (this.transitioning || this.$element.hasClass('in')) return

      dimension = this.dimension()
      scroll = $.camelCase(['scroll', dimension].join('-'))
      actives = this.$parent && this.$parent.find('> .accordion-group > .in')

      if (actives && actives.length) {
        hasData = actives.data('collapse')
        if (hasData && hasData.transitioning) return
        actives.collapse('hide')
        hasData || actives.data('collapse', null)
      }

      this.$element[dimension](0)
      this.transition('addClass', $.Event('show'), 'shown')
      $.support.transition && this.$element[dimension](this.$element[0][scroll])
    }

  , hide: function () {
      var dimension
      if (this.transitioning || !this.$element.hasClass('in')) return
      dimension = this.dimension()
      this.reset(this.$element[dimension]())
      this.transition('removeClass', $.Event('hide'), 'hidden')
      this.$element[dimension](0)
    }

  , reset: function (size) {
      var dimension = this.dimension()

      this.$element
        .removeClass('collapse')
        [dimension](size || 'auto')
        [0].offsetWidth

      this.$element[size !== null ? 'addClass' : 'removeClass']('collapse')

      return this
    }

  , transition: function (method, startEvent, completeEvent) {
      var that = this
        , complete = function () {
            if (startEvent.type == 'show') that.reset()
            that.transitioning = 0
            that.$element.trigger(completeEvent)
          }

      this.$element.trigger(startEvent)

      if (startEvent.isDefaultPrevented()) return

      this.transitioning = 1

      this.$element[method]('in')

      $.support.transition && this.$element.hasClass('collapse') ?
        this.$element.one($.support.transition.end, complete) :
        complete()
    }

  , toggle: function () {
      this[this.$element.hasClass('in') ? 'hide' : 'show']()
    }

  }


 /* COLLAPSE PLUGIN DEFINITION
  * ========================== */

  var old = $.fn.collapse

  $.fn.collapse = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('collapse')
        , options = $.extend({}, $.fn.collapse.defaults, $this.data(), typeof option == 'object' && option)
      if (!data) $this.data('collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.collapse.defaults = {
    toggle: true
  }

  $.fn.collapse.Constructor = Collapse


 /* COLLAPSE NO CONFLICT
  * ==================== */

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


 /* COLLAPSE DATA-API
  * ================= */

  $(document).on('click.collapse.data-api', '[data-toggle=collapse]', function (e) {
    var $this = $(this), href
      , target = $this.attr('data-target')
        || e.preventDefault()
        || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
      , option = $(target).data('collapse') ? 'toggle' : $this.data()
    $this[$(target).hasClass('in') ? 'addClass' : 'removeClass']('collapsed')
    $(target).collapse(option)
  })

}(window.jQuery);


}.call(root));
    return amdExports;
}); }(this));

//Wrapped in an outer function to preserve global this
(function (root) { var amdExports; define('bootstrap/bootstrap-dropdown',['bootstrap/bootstrap-transition'], function () { (function () {

/* ============================================================
 * bootstrap-dropdown.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#dropdowns
 * ============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function ($) {

   // jshint ;_;


 /* DROPDOWN CLASS DEFINITION
  * ========================= */

  var toggle = '[data-toggle=dropdown]'
    , Dropdown = function (element) {
        var $el = $(element).on('click.dropdown.data-api', this.toggle)
        $('html').on('click.dropdown.data-api', function () {
          $el.parent().removeClass('open')
        })
      }

  Dropdown.prototype = {

    constructor: Dropdown

  , toggle: function (e) {
      var $this = $(this)
        , $parent
        , isActive

      if ($this.is('.disabled, :disabled')) return

      $parent = getParent($this)

      isActive = $parent.hasClass('open')

      clearMenus()

      if (!isActive) {
        if ('ontouchstart' in document.documentElement) {
          // if mobile we we use a backdrop because click events don't delegate
          $('<div class="dropdown-backdrop"/>').insertBefore($(this)).on('click', clearMenus)
        }
        $parent.toggleClass('open')
      }

      $this.focus()

      return false
    }

  , keydown: function (e) {
      var $this
        , $items
        , $active
        , $parent
        , isActive
        , index

      if (!/(38|40|27)/.test(e.keyCode)) return

      $this = $(this)

      e.preventDefault()
      e.stopPropagation()

      if ($this.is('.disabled, :disabled')) return

      $parent = getParent($this)

      isActive = $parent.hasClass('open')

      if (!isActive || (isActive && e.keyCode == 27)) {
        if (e.which == 27) $parent.find(toggle).focus()
        return $this.click()
      }

      $items = $('[role=menu] li:not(.divider):visible a', $parent)

      if (!$items.length) return

      index = $items.index($items.filter(':focus'))

      if (e.keyCode == 38 && index > 0) index--                                        // up
      if (e.keyCode == 40 && index < $items.length - 1) index++                        // down
      if (!~index) index = 0

      $items
        .eq(index)
        .focus()
    }

  }

  function clearMenus() {
    $('.dropdown-backdrop').remove()
    $(toggle).each(function () {
      getParent($(this)).removeClass('open')
    })
  }

  function getParent($this) {
    var selector = $this.attr('data-target')
      , $parent

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    $parent = selector && $(selector)

    if (!$parent || !$parent.length) $parent = $this.parent()

    return $parent
  }


  /* DROPDOWN PLUGIN DEFINITION
   * ========================== */

  var old = $.fn.dropdown

  $.fn.dropdown = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('dropdown')
      if (!data) $this.data('dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.dropdown.Constructor = Dropdown


 /* DROPDOWN NO CONFLICT
  * ==================== */

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  /* APPLY TO STANDARD DROPDOWN ELEMENTS
   * =================================== */

  $(document)
    .on('click.dropdown.data-api', clearMenus)
    .on('click.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.dropdown.data-api'  , toggle, Dropdown.prototype.toggle)
    .on('keydown.dropdown.data-api', toggle + ', [role=menu]' , Dropdown.prototype.keydown)

}(window.jQuery);



}.call(root));
    return amdExports;
}); }(this));

//Wrapped in an outer function to preserve global this
(function (root) { var amdExports; define('bootstrap/bootstrap-modal',['bootstrap/bootstrap-transition'], function () { (function () {

/* =========================================================
 * bootstrap-modal.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#modals
 * =========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */


!function ($) {

   // jshint ;_;


 /* MODAL CLASS DEFINITION
  * ====================== */

  var Modal = function (element, options) {
    this.options = options
    this.$element = $(element)
      .delegate('[data-dismiss="modal"]', 'click.dismiss.modal', $.proxy(this.hide, this))
    this.options.remote && this.$element.find('.modal-body').load(this.options.remote)
  }

  Modal.prototype = {

      constructor: Modal

    , toggle: function () {
        return this[!this.isShown ? 'show' : 'hide']()
      }

    , show: function () {
        var that = this
          , e = $.Event('show')

        this.$element.trigger(e)

        if (this.isShown || e.isDefaultPrevented()) return

        this.isShown = true

        this.escape()

        this.backdrop(function () {
          var transition = $.support.transition && that.$element.hasClass('fade')

          if (!that.$element.parent().length) {
            that.$element.appendTo(document.body) //don't move modals dom position
          }

          that.$element.show()

          if (transition) {
            that.$element[0].offsetWidth // force reflow
          }

          that.$element
            .addClass('in')
            .attr('aria-hidden', false)

          that.enforceFocus()

          transition ?
            that.$element.one($.support.transition.end, function () { that.$element.focus().trigger('shown') }) :
            that.$element.focus().trigger('shown')

        })
      }

    , hide: function (e) {
        e && e.preventDefault()

        var that = this

        e = $.Event('hide')

        this.$element.trigger(e)

        if (!this.isShown || e.isDefaultPrevented()) return

        this.isShown = false

        this.escape()

        $(document).off('focusin.modal')

        this.$element
          .removeClass('in')
          .attr('aria-hidden', true)

        $.support.transition && this.$element.hasClass('fade') ?
          this.hideWithTransition() :
          this.hideModal()
      }

    , enforceFocus: function () {
        var that = this
        $(document).on('focusin.modal', function (e) {
          if (that.$element[0] !== e.target && !that.$element.has(e.target).length) {
            that.$element.focus()
          }
        })
      }

    , escape: function () {
        var that = this
        if (this.isShown && this.options.keyboard) {
          this.$element.on('keyup.dismiss.modal', function ( e ) {
            e.which == 27 && that.hide()
          })
        } else if (!this.isShown) {
          this.$element.off('keyup.dismiss.modal')
        }
      }

    , hideWithTransition: function () {
        var that = this
          , timeout = setTimeout(function () {
              that.$element.off($.support.transition.end)
              that.hideModal()
            }, 500)

        this.$element.one($.support.transition.end, function () {
          clearTimeout(timeout)
          that.hideModal()
        })
      }

    , hideModal: function () {
        var that = this
        this.$element.hide()
        this.backdrop(function () {
          that.removeBackdrop()
          that.$element.trigger('hidden')
        })
      }

    , removeBackdrop: function () {
        this.$backdrop && this.$backdrop.remove()
        this.$backdrop = null
      }

    , backdrop: function (callback) {
        var that = this
          , animate = this.$element.hasClass('fade') ? 'fade' : ''

        if (this.isShown && this.options.backdrop) {
          var doAnimate = $.support.transition && animate

          this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
            .appendTo(document.body)

          this.$backdrop.click(
            this.options.backdrop == 'static' ?
              $.proxy(this.$element[0].focus, this.$element[0])
            : $.proxy(this.hide, this)
          )

          if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

          this.$backdrop.addClass('in')

          if (!callback) return

          doAnimate ?
            this.$backdrop.one($.support.transition.end, callback) :
            callback()

        } else if (!this.isShown && this.$backdrop) {
          this.$backdrop.removeClass('in')

          $.support.transition && this.$element.hasClass('fade')?
            this.$backdrop.one($.support.transition.end, callback) :
            callback()

        } else if (callback) {
          callback()
        }
      }
  }


 /* MODAL PLUGIN DEFINITION
  * ======================= */

  var old = $.fn.modal

  $.fn.modal = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('modal')
        , options = $.extend({}, $.fn.modal.defaults, $this.data(), typeof option == 'object' && option)
      if (!data) $this.data('modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option]()
      else if (options.show) data.show()
    })
  }

  $.fn.modal.defaults = {
      backdrop: true
    , keyboard: true
    , show: true
  }

  $.fn.modal.Constructor = Modal


 /* MODAL NO CONFLICT
  * ================= */

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


 /* MODAL DATA-API
  * ============== */

  $(document).on('click.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this = $(this)
      , href = $this.attr('href')
      , $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) //strip for ie7
      , option = $target.data('modal') ? 'toggle' : $.extend({ remote:!/#/.test(href) && href }, $target.data(), $this.data())

    e.preventDefault()

    $target
      .modal(option)
      .one('hide', function () {
        $this.focus()
      })
  })

}(window.jQuery);



}.call(root));
    return amdExports;
}); }(this));

//Wrapped in an outer function to preserve global this
(function (root) { var amdExports; define('bootstrap/bootstrap-tooltip',['bootstrap/bootstrap-transition'], function () { (function () {

/* ===========================================================
 * bootstrap-tooltip.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#tooltips
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ===========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

   // jshint ;_;


 /* TOOLTIP PUBLIC CLASS DEFINITION
  * =============================== */

  var Tooltip = function (element, options) {
    this.init('tooltip', element, options)
  }

  Tooltip.prototype = {

    constructor: Tooltip

  , init: function (type, element, options) {
      var eventIn
        , eventOut
        , triggers
        , trigger
        , i

      this.type = type
      this.$element = $(element)
      this.options = this.getOptions(options)
      this.enabled = true

      triggers = this.options.trigger.split(' ')

      for (i = triggers.length; i--;) {
        trigger = triggers[i]
        if (trigger == 'click') {
          this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
        } else if (trigger != 'manual') {
          eventIn = trigger == 'hover' ? 'mouseenter' : 'focus'
          eventOut = trigger == 'hover' ? 'mouseleave' : 'blur'
          this.$element.on(eventIn + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
          this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
        }
      }

      this.options.selector ?
        (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
        this.fixTitle()
    }

  , getOptions: function (options) {
      options = $.extend({}, $.fn[this.type].defaults, this.$element.data(), options)

      if (options.delay && typeof options.delay == 'number') {
        options.delay = {
          show: options.delay
        , hide: options.delay
        }
      }

      return options
    }

  , enter: function (e) {
      var defaults = $.fn[this.type].defaults
        , options = {}
        , self

      this._options && $.each(this._options, function (key, value) {
        if (defaults[key] != value) options[key] = value
      })

      self = $(e.currentTarget)[this.type](options).data(this.type)

      if (!self.options.delay || !self.options.delay.show) return self.show()

      clearTimeout(this.timeout)
      self.hoverState = 'in'
      this.timeout = setTimeout(function() {
        if (self.hoverState == 'in') self.show()
      }, self.options.delay.show)
    }

  , leave: function (e) {
      var self = $(e.currentTarget)[this.type](this._options).data(this.type)

      if (this.timeout) clearTimeout(this.timeout)
      if (!self.options.delay || !self.options.delay.hide) return self.hide()

      self.hoverState = 'out'
      this.timeout = setTimeout(function() {
        if (self.hoverState == 'out') self.hide()
      }, self.options.delay.hide)
    }

  , show: function () {
      var $tip
        , pos
        , actualWidth
        , actualHeight
        , placement
        , tp
        , e = $.Event('show')

      if (this.hasContent() && this.enabled) {
        this.$element.trigger(e)
        if (e.isDefaultPrevented()) return
        $tip = this.tip()
        this.setContent()

        if (this.options.animation) {
          $tip.addClass('fade')
        }

        placement = typeof this.options.placement == 'function' ?
          this.options.placement.call(this, $tip[0], this.$element[0]) :
          this.options.placement

        $tip
          .detach()
          .css({ top: 0, left: 0, display: 'block' })

        this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)

        pos = this.getPosition()

        actualWidth = $tip[0].offsetWidth
        actualHeight = $tip[0].offsetHeight

        switch (placement) {
          case 'bottom':
            tp = {top: pos.top + pos.height, left: pos.left + pos.width / 2 - actualWidth / 2}
            break
          case 'top':
            tp = {top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2}
            break
          case 'left':
            tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth}
            break
          case 'right':
            tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width}
            break
        }

        this.applyPlacement(tp, placement)
        this.$element.trigger('shown')
      }
    }

  , applyPlacement: function(offset, placement){
      var $tip = this.tip()
        , width = $tip[0].offsetWidth
        , height = $tip[0].offsetHeight
        , actualWidth
        , actualHeight
        , delta
        , replace

      $tip
        .offset(offset)
        .addClass(placement)
        .addClass('in')

      actualWidth = $tip[0].offsetWidth
      actualHeight = $tip[0].offsetHeight

      if (placement == 'top' && actualHeight != height) {
        offset.top = offset.top + height - actualHeight
        replace = true
      }

      if (placement == 'bottom' || placement == 'top') {
        delta = 0

        if (offset.left < 0){
          delta = offset.left * -2
          offset.left = 0
          $tip.offset(offset)
          actualWidth = $tip[0].offsetWidth
          actualHeight = $tip[0].offsetHeight
        }

        this.replaceArrow(delta - width + actualWidth, actualWidth, 'left')
      } else {
        this.replaceArrow(actualHeight - height, actualHeight, 'top')
      }

      if (replace) $tip.offset(offset)
    }

  , replaceArrow: function(delta, dimension, position){
      this
        .arrow()
        .css(position, delta ? (50 * (1 - delta / dimension) + "%") : '')
    }

  , setContent: function () {
      var $tip = this.tip()
        , title = this.getTitle()

      $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
      $tip.removeClass('fade in top bottom left right')
    }

  , hide: function () {
      var that = this
        , $tip = this.tip()
        , e = $.Event('hide')

      this.$element.trigger(e)
      if (e.isDefaultPrevented()) return

      $tip.removeClass('in')

      function removeWithAnimation() {
        var timeout = setTimeout(function () {
          $tip.off($.support.transition.end).detach()
        }, 500)

        $tip.one($.support.transition.end, function () {
          clearTimeout(timeout)
          $tip.detach()
        })
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        removeWithAnimation() :
        $tip.detach()

      this.$element.trigger('hidden')

      return this
    }

  , fixTitle: function () {
      var $e = this.$element
      if ($e.attr('title') || typeof($e.attr('data-original-title')) != 'string') {
        $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
      }
    }

  , hasContent: function () {
      return this.getTitle()
    }

  , getPosition: function () {
      var el = this.$element[0]
      return $.extend({}, (typeof el.getBoundingClientRect == 'function') ? el.getBoundingClientRect() : {
        width: el.offsetWidth
      , height: el.offsetHeight
      }, this.$element.offset())
    }

  , getTitle: function () {
      var title
        , $e = this.$element
        , o = this.options

      title = $e.attr('data-original-title')
        || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

      return title
    }

  , tip: function () {
      return this.$tip = this.$tip || $(this.options.template)
    }

  , arrow: function(){
      return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }

  , validate: function () {
      if (!this.$element[0].parentNode) {
        this.hide()
        this.$element = null
        this.options = null
      }
    }

  , enable: function () {
      this.enabled = true
    }

  , disable: function () {
      this.enabled = false
    }

  , toggleEnabled: function () {
      this.enabled = !this.enabled
    }

  , toggle: function (e) {
      var self = e ? $(e.currentTarget)[this.type](this._options).data(this.type) : this
      self.tip().hasClass('in') ? self.hide() : self.show()
    }

  , destroy: function () {
      this.hide().$element.off('.' + this.type).removeData(this.type)
    }

  }


 /* TOOLTIP PLUGIN DEFINITION
  * ========================= */

  var old = $.fn.tooltip

  $.fn.tooltip = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('tooltip')
        , options = typeof option == 'object' && option
      if (!data) $this.data('tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tooltip.Constructor = Tooltip

  $.fn.tooltip.defaults = {
    animation: true
  , placement: 'top'
  , selector: false
  , template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
  , trigger: 'hover focus'
  , title: ''
  , delay: 0
  , html: false
  , container: false
  }


 /* TOOLTIP NO CONFLICT
  * =================== */

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(window.jQuery);



}.call(root));
    return amdExports;
}); }(this));

//Wrapped in an outer function to preserve global this
(function (root) { var amdExports; define('bootstrap/bootstrap-popover',['bootstrap/bootstrap-transition','bootstrap/bootstrap-tooltip'], function () { (function () {

/* ===========================================================
 * bootstrap-popover.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#popovers
 * ===========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =========================================================== */


!function ($) {

   // jshint ;_;


 /* POPOVER PUBLIC CLASS DEFINITION
  * =============================== */

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }


  /* NOTE: POPOVER EXTENDS BOOTSTRAP-TOOLTIP.js
     ========================================== */

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype, {

    constructor: Popover

  , setContent: function () {
      var $tip = this.tip()
        , title = this.getTitle()
        , content = this.getContent()

      $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
      $tip.find('.popover-content')[this.options.html ? 'html' : 'text'](content)

      $tip.removeClass('fade top bottom left right in')
    }

  , hasContent: function () {
      return this.getTitle() || this.getContent()
    }

  , getContent: function () {
      var content
        , $e = this.$element
        , o = this.options

      content = (typeof o.content == 'function' ? o.content.call($e[0]) :  o.content)
        || $e.attr('data-content')

      return content
    }

  , tip: function () {
      if (!this.$tip) {
        this.$tip = $(this.options.template)
      }
      return this.$tip
    }

  , destroy: function () {
      this.hide().$element.off('.' + this.type).removeData(this.type)
    }

  })


 /* POPOVER PLUGIN DEFINITION
  * ======================= */

  var old = $.fn.popover

  $.fn.popover = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('popover')
        , options = typeof option == 'object' && option
      if (!data) $this.data('popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.popover.Constructor = Popover

  $.fn.popover.defaults = $.extend({} , $.fn.tooltip.defaults, {
    placement: 'right'
  , trigger: 'click'
  , content: ''
  , template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


 /* POPOVER NO CONFLICT
  * =================== */

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(window.jQuery);



}.call(root));
    return amdExports;
}); }(this));

//Wrapped in an outer function to preserve global this
(function (root) { var amdExports; define('bootstrap/bootstrap-scrollspy',['bootstrap/bootstrap-transition'], function () { (function () {

/* =============================================================
 * bootstrap-scrollspy.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#scrollspy
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================== */


!function ($) {

   // jshint ;_;


 /* SCROLLSPY CLASS DEFINITION
  * ========================== */

  function ScrollSpy(element, options) {
    var process = $.proxy(this.process, this)
      , $element = $(element).is('body') ? $(window) : $(element)
      , href
    this.options = $.extend({}, $.fn.scrollspy.defaults, options)
    this.$scrollElement = $element.on('scroll.scroll-spy.data-api', process)
    this.selector = (this.options.target
      || ((href = $(element).attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
      || '') + ' .nav li > a'
    this.$body = $('body')
    this.refresh()
    this.process()
  }

  ScrollSpy.prototype = {

      constructor: ScrollSpy

    , refresh: function () {
        var self = this
          , $targets

        this.offsets = $([])
        this.targets = $([])

        $targets = this.$body
          .find(this.selector)
          .map(function () {
            var $el = $(this)
              , href = $el.data('target') || $el.attr('href')
              , $href = /^#\w/.test(href) && $(href)
            return ( $href
              && $href.length
              && [[ $href.position().top + (!$.isWindow(self.$scrollElement.get(0)) && self.$scrollElement.scrollTop()), href ]] ) || null
          })
          .sort(function (a, b) { return a[0] - b[0] })
          .each(function () {
            self.offsets.push(this[0])
            self.targets.push(this[1])
          })
      }

    , process: function () {
        var scrollTop = this.$scrollElement.scrollTop() + this.options.offset
          , scrollHeight = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight
          , maxScroll = scrollHeight - this.$scrollElement.height()
          , offsets = this.offsets
          , targets = this.targets
          , activeTarget = this.activeTarget
          , i

        if (scrollTop >= maxScroll) {
          return activeTarget != (i = targets.last()[0])
            && this.activate ( i )
        }

        for (i = offsets.length; i--;) {
          activeTarget != targets[i]
            && scrollTop >= offsets[i]
            && (!offsets[i + 1] || scrollTop <= offsets[i + 1])
            && this.activate( targets[i] )
        }
      }

    , activate: function (target) {
        var active
          , selector

        this.activeTarget = target

        $(this.selector)
          .parent('.active')
          .removeClass('active')

        selector = this.selector
          + '[data-target="' + target + '"],'
          + this.selector + '[href="' + target + '"]'

        active = $(selector)
          .parent('li')
          .addClass('active')

        if (active.parent('.dropdown-menu').length)  {
          active = active.closest('li.dropdown').addClass('active')
        }

        active.trigger('activate')
      }

  }


 /* SCROLLSPY PLUGIN DEFINITION
  * =========================== */

  var old = $.fn.scrollspy

  $.fn.scrollspy = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('scrollspy')
        , options = typeof option == 'object' && option
      if (!data) $this.data('scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.scrollspy.Constructor = ScrollSpy

  $.fn.scrollspy.defaults = {
    offset: 10
  }


 /* SCROLLSPY NO CONFLICT
  * ===================== */

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


 /* SCROLLSPY DATA-API
  * ================== */

  $(window).on('load', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      $spy.scrollspy($spy.data())
    })
  })

}(window.jQuery);


}.call(root));
    return amdExports;
}); }(this));

//Wrapped in an outer function to preserve global this
(function (root) { var amdExports; define('bootstrap/bootstrap-tab',['bootstrap/bootstrap-transition'], function () { (function () {

/* ========================================================
 * bootstrap-tab.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#tabs
 * ========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================== */


!function ($) {

   // jshint ;_;


 /* TAB CLASS DEFINITION
  * ==================== */

  var Tab = function (element) {
    this.element = $(element)
  }

  Tab.prototype = {

    constructor: Tab

  , show: function () {
      var $this = this.element
        , $ul = $this.closest('ul:not(.dropdown-menu)')
        , selector = $this.attr('data-target')
        , previous
        , $target
        , e

      if (!selector) {
        selector = $this.attr('href')
        selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
      }

      if ( $this.parent('li').hasClass('active') ) return

      previous = $ul.find('.active:last a')[0]

      e = $.Event('show', {
        relatedTarget: previous
      })

      $this.trigger(e)

      if (e.isDefaultPrevented()) return

      $target = $(selector)

      this.activate($this.parent('li'), $ul)
      this.activate($target, $target.parent(), function () {
        $this.trigger({
          type: 'shown'
        , relatedTarget: previous
        })
      })
    }

  , activate: function ( element, container, callback) {
      var $active = container.find('> .active')
        , transition = callback
            && $.support.transition
            && $active.hasClass('fade')

      function next() {
        $active
          .removeClass('active')
          .find('> .dropdown-menu > .active')
          .removeClass('active')

        element.addClass('active')

        if (transition) {
          element[0].offsetWidth // reflow for transition
          element.addClass('in')
        } else {
          element.removeClass('fade')
        }

        if ( element.parent('.dropdown-menu') ) {
          element.closest('li.dropdown').addClass('active')
        }

        callback && callback()
      }

      transition ?
        $active.one($.support.transition.end, next) :
        next()

      $active.removeClass('in')
    }
  }


 /* TAB PLUGIN DEFINITION
  * ===================== */

  var old = $.fn.tab

  $.fn.tab = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('tab')
      if (!data) $this.data('tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tab.Constructor = Tab


 /* TAB NO CONFLICT
  * =============== */

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


 /* TAB DATA-API
  * ============ */

  $(document).on('click.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
    e.preventDefault()
    $(this).tab('show')
  })

}(window.jQuery);


}.call(root));
    return amdExports;
}); }(this));

//Wrapped in an outer function to preserve global this
(function (root) { var amdExports; define('bootstrap/bootstrap-typeahead',['bootstrap/bootstrap-transition'], function () { (function () {

/* =============================================================
 * bootstrap-typeahead.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#typeahead
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function($){

   // jshint ;_;


 /* TYPEAHEAD PUBLIC CLASS DEFINITION
  * ================================= */

  var Typeahead = function (element, options) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.typeahead.defaults, options)
    this.matcher = this.options.matcher || this.matcher
    this.sorter = this.options.sorter || this.sorter
    this.highlighter = this.options.highlighter || this.highlighter
    this.updater = this.options.updater || this.updater
    this.source = this.options.source
    this.$menu = $(this.options.menu)
    this.shown = false
    this.listen()
  }

  Typeahead.prototype = {

    constructor: Typeahead

  , select: function () {
      var val = this.$menu.find('.active').attr('data-value')
      this.$element
        .val(this.updater(val))
        .change()
      return this.hide()
    }

  , updater: function (item) {
      return item
    }

  , show: function () {
      var pos = $.extend({}, this.$element.position(), {
        height: this.$element[0].offsetHeight
      })

      this.$menu
        .insertAfter(this.$element)
        .css({
          top: pos.top + pos.height
        , left: pos.left
        })
        .show()

      this.shown = true
      return this
    }

  , hide: function () {
      this.$menu.hide()
      this.shown = false
      return this
    }

  , lookup: function (event) {
      var items

      this.query = this.$element.val()

      if (!this.query || this.query.length < this.options.minLength) {
        return this.shown ? this.hide() : this
      }

      items = $.isFunction(this.source) ? this.source(this.query, $.proxy(this.process, this)) : this.source

      return items ? this.process(items) : this
    }

  , process: function (items) {
      var that = this

      items = $.grep(items, function (item) {
        return that.matcher(item)
      })

      items = this.sorter(items)

      if (!items.length) {
        return this.shown ? this.hide() : this
      }

      return this.render(items.slice(0, this.options.items)).show()
    }

  , matcher: function (item) {
      return ~item.toLowerCase().indexOf(this.query.toLowerCase())
    }

  , sorter: function (items) {
      var beginswith = []
        , caseSensitive = []
        , caseInsensitive = []
        , item

      while (item = items.shift()) {
        if (!item.toLowerCase().indexOf(this.query.toLowerCase())) beginswith.push(item)
        else if (~item.indexOf(this.query)) caseSensitive.push(item)
        else caseInsensitive.push(item)
      }

      return beginswith.concat(caseSensitive, caseInsensitive)
    }

  , highlighter: function (item) {
      var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&')
      return item.replace(new RegExp('(' + query + ')', 'ig'), function ($1, match) {
        return '<strong>' + match + '</strong>'
      })
    }

  , render: function (items) {
      var that = this

      items = $(items).map(function (i, item) {
        i = $(that.options.item).attr('data-value', item)
        i.find('a').html(that.highlighter(item))
        return i[0]
      })

      items.first().addClass('active')
      this.$menu.html(items)
      return this
    }

  , next: function (event) {
      var active = this.$menu.find('.active').removeClass('active')
        , next = active.next()

      if (!next.length) {
        next = $(this.$menu.find('li')[0])
      }

      next.addClass('active')
    }

  , prev: function (event) {
      var active = this.$menu.find('.active').removeClass('active')
        , prev = active.prev()

      if (!prev.length) {
        prev = this.$menu.find('li').last()
      }

      prev.addClass('active')
    }

  , listen: function () {
      this.$element
        .on('focus',    $.proxy(this.focus, this))
        .on('blur',     $.proxy(this.blur, this))
        .on('keypress', $.proxy(this.keypress, this))
        .on('keyup',    $.proxy(this.keyup, this))

      if (this.eventSupported('keydown')) {
        this.$element.on('keydown', $.proxy(this.keydown, this))
      }

      this.$menu
        .on('click', $.proxy(this.click, this))
        .on('mouseenter', 'li', $.proxy(this.mouseenter, this))
        .on('mouseleave', 'li', $.proxy(this.mouseleave, this))
    }

  , eventSupported: function(eventName) {
      var isSupported = eventName in this.$element
      if (!isSupported) {
        this.$element.setAttribute(eventName, 'return;')
        isSupported = typeof this.$element[eventName] === 'function'
      }
      return isSupported
    }

  , move: function (e) {
      if (!this.shown) return

      switch(e.keyCode) {
        case 9: // tab
        case 13: // enter
        case 27: // escape
          e.preventDefault()
          break

        case 38: // up arrow
          e.preventDefault()
          this.prev()
          break

        case 40: // down arrow
          e.preventDefault()
          this.next()
          break
      }

      e.stopPropagation()
    }

  , keydown: function (e) {
      this.suppressKeyPressRepeat = ~$.inArray(e.keyCode, [40,38,9,13,27])
      this.move(e)
    }

  , keypress: function (e) {
      if (this.suppressKeyPressRepeat) return
      this.move(e)
    }

  , keyup: function (e) {
      switch(e.keyCode) {
        case 40: // down arrow
        case 38: // up arrow
        case 16: // shift
        case 17: // ctrl
        case 18: // alt
          break

        case 9: // tab
        case 13: // enter
          if (!this.shown) return
          this.select()
          break

        case 27: // escape
          if (!this.shown) return
          this.hide()
          break

        default:
          this.lookup()
      }

      e.stopPropagation()
      e.preventDefault()
  }

  , focus: function (e) {
      this.focused = true
    }

  , blur: function (e) {
      this.focused = false
      if (!this.mousedover && this.shown) this.hide()
    }

  , click: function (e) {
      e.stopPropagation()
      e.preventDefault()
      this.select()
      this.$element.focus()
    }

  , mouseenter: function (e) {
      this.mousedover = true
      this.$menu.find('.active').removeClass('active')
      $(e.currentTarget).addClass('active')
    }

  , mouseleave: function (e) {
      this.mousedover = false
      if (!this.focused && this.shown) this.hide()
    }

  }


  /* TYPEAHEAD PLUGIN DEFINITION
   * =========================== */

  var old = $.fn.typeahead

  $.fn.typeahead = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('typeahead')
        , options = typeof option == 'object' && option
      if (!data) $this.data('typeahead', (data = new Typeahead(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.typeahead.defaults = {
    source: []
  , items: 8
  , menu: '<ul class="typeahead dropdown-menu"></ul>'
  , item: '<li><a href="#"></a></li>'
  , minLength: 1
  }

  $.fn.typeahead.Constructor = Typeahead


 /* TYPEAHEAD NO CONFLICT
  * =================== */

  $.fn.typeahead.noConflict = function () {
    $.fn.typeahead = old
    return this
  }


 /* TYPEAHEAD DATA-API
  * ================== */

  $(document).on('focus.typeahead.data-api', '[data-provide="typeahead"]', function (e) {
    var $this = $(this)
    if ($this.data('typeahead')) return
    $this.typeahead($this.data())
  })

}(window.jQuery);



}.call(root));
    return amdExports;
}); }(this));

/*
 * Fuel UX Checkbox
 * https://github.com/ExactTarget/fuelux
 *
 * Copyright (c) 2012 ExactTarget
 * Licensed under the MIT license.
 */

define('fuelux/checkbox',['require','jquery'],function (require) {

	var $   = require('jquery');
	var old = $.fn.checkbox;

	// CHECKBOX CONSTRUCTOR AND PROTOTYPE

	var Checkbox = function (element, options) {

		this.$element = $(element);
		this.options = $.extend({}, $.fn.checkbox.defaults, options);

		// cache elements
		this.$label = this.$element.parent();
		this.$icon = this.$label.find('i');
		this.$chk = this.$label.find('input[type=checkbox]');

		// set default state
		this.setState(this.$chk);

		// handle events
		this.$chk.on('change', $.proxy(this.itemchecked, this));
	};

	Checkbox.prototype = {

		constructor: Checkbox,

		setState: function ($chk) {
			$chk = $chk || this.$chk;

			var checked = $chk.is(':checked');
			var disabled = !!$chk.prop('disabled');

			// reset classes
			this.$icon.removeClass('checked disabled');

			// set state of checkbox
			if (checked === true) {
				this.$icon.addClass('checked');
			}
			if (disabled === true) {
				this.$icon.addClass('disabled');
			}
		},

		enable: function () {
			this.$chk.attr('disabled', false);
			this.$icon.removeClass('disabled');
		},

		disable: function () {
			this.$chk.attr('disabled', true);
			this.$icon.addClass('disabled');
		},

		toggle: function () {
			this.$chk.click();
		},

		itemchecked: function (e) {
			var chk = $(e.target);
			this.setState(chk);
		},
		
		check: function () {
            this.$chk.prop('checked', true);
            this.setState(this.$chk);
		},
		
		uncheck: function () {
            this.$chk.prop('checked', false);
            this.setState(this.$chk);
		},
		
		isChecked: function () {
            return this.$chk.is(':checked');
		}
	};


	// CHECKBOX PLUGIN DEFINITION

	$.fn.checkbox = function (option) {
		var args = Array.prototype.slice.call( arguments, 1 );
		var methodReturn;

		var $set = this.each(function () {
			var $this   = $( this );
			var data    = $this.data('checkbox');
			var options = typeof option === 'object' && option;

			if( !data ) $this.data('checkbox', (data = new Checkbox(this, options)));
			if( typeof option === 'string' ) methodReturn = data[ option ].apply( data, args );
		});

		return ( methodReturn === undefined ) ? $set : methodReturn;
	};

	$.fn.checkbox.defaults = {};

	$.fn.checkbox.Constructor = Checkbox;

	$.fn.checkbox.noConflict = function () {
		$.fn.checkbox = old;
		return this;
	};


	// CHECKBOX DATA-API

	$(function () {
		$(window).on('load', function () {
			//$('i.checkbox').each(function () {
			$('.checkbox-custom > input[type=checkbox]').each(function () {
				var $this = $(this);
				if ($this.data('checkbox')) return;
				$this.checkbox($this.data());
			});
		});
	});
});
/*
 * Fuel UX Utilities
 * https://github.com/ExactTarget/fuelux
 *
 * Copyright (c) 2012 ExactTarget
 * Licensed under the MIT license.
 */

define('fuelux/util',['require','jquery'],function (require) {

	var $ = require('jquery');

	// custom case-insensitive match expression
	function fuelTextExactCI(elem, text) {
		return (elem.textContent || elem.innerText || $(elem).text() || '').toLowerCase() === (text || '').toLowerCase();
	}

	$.expr[':'].fuelTextExactCI = $.expr.createPseudo ?
		$.expr.createPseudo(function (text) {
			return function (elem) {
				return fuelTextExactCI(elem, text);
			};
		}) :
		function (elem, i, match) {
			return fuelTextExactCI(elem, match[3]);
		};

});
/*
 * Fuel UX Combobox
 * https://github.com/ExactTarget/fuelux
 *
 * Copyright (c) 2012 ExactTarget
 * Licensed under the MIT license.
 */

define('fuelux/combobox',['require','jquery','./util'],function (require) {

	var $   = require('jquery');
	var old = $.fn.combobox;
	require('./util');

	// COMBOBOX CONSTRUCTOR AND PROTOTYPE

	var Combobox = function (element, options) {
		this.$element = $(element);
		this.options = $.extend({}, $.fn.combobox.defaults, options);
		this.$element.on('click', 'a', $.proxy(this.itemclicked, this));
		this.$element.on('change', 'input', $.proxy(this.inputchanged, this));
		this.$input = this.$element.find('input');
		this.$button = this.$element.find('.btn');

		// set default selection
		this.setDefaultSelection();
	};

	Combobox.prototype = {

		constructor: Combobox,

		selectedItem: function () {
			var item = this.$selectedItem;
			var data = {};

			if (item) {
				var txt = this.$selectedItem.text();
				data = $.extend({ text: txt }, this.$selectedItem.data());
			}
			else {
				data = { text: this.$input.val()};
			}

			return data;
		},

		selectByText: function (text) {
			var selector = 'li:fuelTextExactCI(' + text + ')';
			this.selectBySelector(selector);
		},

		selectByValue: function (value) {
			var selector = 'li[data-value="' + value + '"]';
			this.selectBySelector(selector);
		},

		selectByIndex: function (index) {
			// zero-based index
			var selector = 'li:eq(' + index + ')';
			this.selectBySelector(selector);
		},

		selectBySelector: function (selector) {
			var $item = this.$element.find(selector);

			if (typeof $item[0] !== 'undefined') {
				this.$selectedItem = $item;
				this.$input.val(this.$selectedItem.text());
			}
			else {
				this.$selectedItem = null;
			}
		},

		setDefaultSelection: function () {
			var selector = 'li[data-selected=true]:first';
			var item = this.$element.find(selector);

			if (item.length > 0) {
				// select by data-attribute
				this.selectBySelector(selector);
				item.removeData('selected');
				item.removeAttr('data-selected');
			}
		},

		enable: function () {
			this.$input.removeAttr('disabled');
			this.$button.removeClass('disabled');
		},

		disable: function () {
			this.$input.attr('disabled', true);
			this.$button.addClass('disabled');
		},

		itemclicked: function (e) {
			this.$selectedItem = $(e.target).parent();

			// set input text and trigger input change event marked as synthetic
			this.$input.val(this.$selectedItem.text()).trigger('change', { synthetic: true });

			// pass object including text and any data-attributes
			// to onchange event
			var data = this.selectedItem();

			// trigger changed event
			this.$element.trigger('changed', data);

			e.preventDefault();
		},

		inputchanged: function (e, extra) {

			// skip processing for internally-generated synthetic event
			// to avoid double processing
			if (extra && extra.synthetic) return;

			var val = $(e.target).val();
			this.selectByText(val);

			// find match based on input
			// if no match, pass the input value
			var data = this.selectedItem();
			if (data.text.length === 0) {
				data = { text: val };
			}

			// trigger changed event
			this.$element.trigger('changed', data);

		}

	};


	// COMBOBOX PLUGIN DEFINITION

	$.fn.combobox = function (option) {
		var args = Array.prototype.slice.call( arguments, 1 );
		var methodReturn;

		var $set = this.each(function () {
			var $this   = $( this );
			var data    = $this.data( 'combobox' );
			var options = typeof option === 'object' && option;

			if( !data ) $this.data('combobox', (data = new Combobox( this, options ) ) );
			if( typeof option === 'string' ) methodReturn = data[ option ].apply( data, args );
		});

		return ( methodReturn === undefined ) ? $set : methodReturn;
	};

	$.fn.combobox.defaults = {};

	$.fn.combobox.Constructor = Combobox;

	$.fn.combobox.noConflict = function () {
		$.fn.combobox = old;
		return this;
	};


	// COMBOBOX DATA-API

	$(function () {
		$(window).on('load', function () {
			$('.combobox').each(function () {
				var $this = $(this);
				if ($this.data('combobox')) return;
				$this.combobox($this.data());
			});
		});

		$('body').on('mousedown.combobox.data-api', '.combobox', function () {
			var $this = $(this);
			if ($this.data('combobox')) return;
			$this.combobox($this.data());
		});
	});
});
/*
 * Fuel UX Datagrid
 * https://github.com/ExactTarget/fuelux
 *
 * Copyright (c) 2012 ExactTarget
 * Licensed under the MIT license.
 */

define('fuelux/datagrid',['require','jquery'],function (require) {

	var $   = require('jquery');
	var old = $.fn.datagrid;

	// Relates to thead .sorted styles in datagrid.less
	var SORTED_HEADER_OFFSET = 22;


	// DATAGRID CONSTRUCTOR AND PROTOTYPE

	var Datagrid = function (element, options) {
		this.$element = $(element);
		this.$thead = this.$element.find('thead');
		this.$tfoot = this.$element.find('tfoot');
		this.$footer = this.$element.find('tfoot th');
		this.$footerchildren = this.$footer.children().show().css('visibility', 'hidden');
		this.$topheader = this.$element.find('thead th');
		this.$searchcontrol = this.$element.find('.datagrid-search');
		this.$filtercontrol = this.$element.find('.filter');
		this.$pagesize = this.$element.find('.grid-pagesize');
		this.$pageinput = this.$element.find('.grid-pager input');
		this.$pagedropdown = this.$element.find('.grid-pager .dropdown-menu');
		this.$prevpagebtn = this.$element.find('.grid-prevpage');
		this.$nextpagebtn = this.$element.find('.grid-nextpage');
		this.$pageslabel = this.$element.find('.grid-pages');
		this.$countlabel = this.$element.find('.grid-count');
		this.$startlabel = this.$element.find('.grid-start');
		this.$endlabel = this.$element.find('.grid-end');

		this.$tbody = $('<tbody>').insertAfter(this.$thead);
		this.$colheader = $('<tr>').appendTo(this.$thead);

		this.options = $.extend(true, {}, $.fn.datagrid.defaults, options);

		// Shim until v3 -- account for FuelUX select or native select for page size:
		if (this.$pagesize.hasClass('select')) {
			this.$pagesize.select('selectByValue', this.options.dataOptions.pageSize);
			this.options.dataOptions.pageSize = parseInt(this.$pagesize.select('selectedItem').value, 10);
		} else {
			var pageSize = this.options.dataOptions.pageSize;
			this.$pagesize.find('option').filter(function() {
				return $(this).text() === pageSize.toString();
			}).attr('selected', true);
			this.options.dataOptions.pageSize = parseInt(this.$pagesize.val(), 10);
		}

		// Shim until v3 -- account for older search class:
		if (this.$searchcontrol.length <= 0) {
			this.$searchcontrol = this.$element.find('.search');
		}

		this.columns = this.options.dataSource.columns();

		this.$nextpagebtn.on('click', $.proxy(this.next, this));
		this.$prevpagebtn.on('click', $.proxy(this.previous, this));
		this.$searchcontrol.on('searched cleared', $.proxy(this.searchChanged, this));
		this.$filtercontrol.on('changed', $.proxy(this.filterChanged, this));
		this.$colheader.on('click', 'th', $.proxy(this.headerClicked, this));

		if (this.$pagesize.hasClass('select')) {
			this.$pagesize.on('changed', $.proxy(this.pagesizeChanged, this));
		} else {
			this.$pagesize.on('change', $.proxy(this.pagesizeChanged, this));
		}

		this.$pageinput.on('change', $.proxy(this.pageChanged, this));

		this.renderColumns();

		if (this.options.stretchHeight) this.initStretchHeight();

		this.renderData();
	};

	Datagrid.prototype = {

		constructor: Datagrid,

		renderColumns: function () {
			var $target;

			this.$footer.attr('colspan', this.columns.length);
			this.$topheader.attr('colspan', this.columns.length);

			var colHTML = '';

			$.each(this.columns, function (index, column) {
				colHTML += '<th data-property="' + column.property + '"';
				if (column.sortable) colHTML += ' class="sortable"';
				colHTML += '>' + column.label + '</th>';
			});

			this.$colheader.append(colHTML);

			if (this.options.dataOptions.sortProperty) {
				$target = this.$colheader.children('th[data-property="' + this.options.dataOptions.sortProperty + '"]');
				this.updateColumns($target, this.options.dataOptions.sortDirection);
			}
		},

		updateColumns: function ($target, direction) {
			this._updateColumns(this.$colheader, $target, direction);

			if (this.$sizingHeader) {
				this._updateColumns(this.$sizingHeader, this.$sizingHeader.find('th').eq($target.index()), direction);
			}
		},

		_updateColumns: function ($header, $target, direction) {
			var className = (direction === 'asc') ? 'icon-chevron-up' : 'icon-chevron-down';
			$header.find('i.datagrid-sort').remove();
			$header.find('th').removeClass('sorted');
			$('<i>').addClass(className + ' datagrid-sort').appendTo($target);
			$target.addClass('sorted');
		},

		updatePageDropdown: function (data) {
			var pageHTML = '';

			for (var i = 1; i <= data.pages; i++) {
				pageHTML += '<li><a>' + i + '</a></li>';
			}

			this.$pagedropdown.html(pageHTML);
		},

		updatePageButtons: function (data) {
			if (data.page === 1) {
				this.$prevpagebtn.attr('disabled', 'disabled');
			} else {
				this.$prevpagebtn.removeAttr('disabled');
			}

			if (data.page === data.pages) {
				this.$nextpagebtn.attr('disabled', 'disabled');
			} else {
				this.$nextpagebtn.removeAttr('disabled');
			}
		},

		renderData: function () {
			var self = this;

			this.$tbody.html(this.placeholderRowHTML(this.options.loadingHTML));

			this.options.dataSource.data(this.options.dataOptions, function (data) {
				if (typeof data === 'string') {
					// Error-handling

					self.$footerchildren.css('visibility', 'hidden');

					self.$tbody.html(self.errorRowHTML(data));
					self.stretchHeight();

					self.$element.trigger('loaded');
					return;
				}

				var itemdesc = (data.count === 1) ? self.options.itemText : self.options.itemsText;
				var rowHTML = '';

				self.$footerchildren.css('visibility', function () {
					return (data.count > 0) ? 'visible' : 'hidden';
				});

				self.$pageinput.val(data.page);
				self.$pageslabel.text(data.pages);
				self.$countlabel.text(data.count + ' ' + itemdesc);
				self.$startlabel.text(data.start);
				self.$endlabel.text(data.end);

				self.updatePageDropdown(data);
				self.updatePageButtons(data);

				$.each(data.data, function (index, row) {
					rowHTML += '<tr>';
					$.each(self.columns, function (index, column) {
						rowHTML += '<td';
						if (column.cssClass) {
							rowHTML += ' class="' + column.cssClass + '"';
						}
						rowHTML += '>' + row[column.property] + '</td>';
					});
					rowHTML += '</tr>';
				});

				if (!rowHTML) rowHTML = self.placeholderRowHTML(self.options.noDataFoundHTML);

				self.$tbody.html(rowHTML);
				self.stretchHeight();

				self.$element.trigger('loaded');
			});

		},

		errorRowHTML: function (content) {
			return '<tr><td style="text-align:center;padding:20px 20px 0 20px;border-bottom:none;" colspan="' +
				this.columns.length + '"><div class="alert alert-error">' + content + '</div></td></tr>';
		},

		placeholderRowHTML: function (content) {
			return '<tr><td style="text-align:center;padding:20px;border-bottom:none;" colspan="' +
				this.columns.length + '">' + content + '</td></tr>';
		},

		headerClicked: function (e) {
			var $target = $(e.target);
			if (!$target.hasClass('sortable')) return;

			var direction = this.options.dataOptions.sortDirection;
			var sort = this.options.dataOptions.sortProperty;
			var property = $target.data('property');

			if (sort === property) {
				this.options.dataOptions.sortDirection = (direction === 'asc') ? 'desc' : 'asc';
			} else {
				this.options.dataOptions.sortDirection = 'asc';
				this.options.dataOptions.sortProperty = property;
			}

			this.options.dataOptions.pageIndex = 0;
			this.updateColumns($target, this.options.dataOptions.sortDirection);
			this.renderData();
		},

		pagesizeChanged: function (e, pageSize) {
			if (pageSize) {
				this.options.dataOptions.pageSize = parseInt(pageSize.value, 10);
			} else {
				this.options.dataOptions.pageSize = parseInt($(e.target).val(), 10);
			}

			this.options.dataOptions.pageIndex = 0;
			this.renderData();
		},

		pageChanged: function (e) {
			var pageRequested = parseInt($(e.target).val(), 10);
			pageRequested = (isNaN(pageRequested)) ? 1 : pageRequested;
			var maxPages = this.$pageslabel.text();

			this.options.dataOptions.pageIndex =
				(pageRequested > maxPages) ? maxPages - 1 : pageRequested - 1;

			this.renderData();
		},

		searchChanged: function (e, search) {
			this.options.dataOptions.search = search;
			this.options.dataOptions.pageIndex = 0;
			this.renderData();
		},

		filterChanged: function (e, filter) {
			this.options.dataOptions.filter = filter;
			this.options.dataOptions.pageIndex = 0;
			this.renderData();
		},

		previous: function () {
			this.$nextpagebtn.attr('disabled', 'disabled');
			this.$prevpagebtn.attr('disabled', 'disabled');
			this.options.dataOptions.pageIndex--;
			this.renderData();
		},

		next: function () {
			this.$nextpagebtn.attr('disabled', 'disabled');
			this.$prevpagebtn.attr('disabled', 'disabled');
			this.options.dataOptions.pageIndex++;
			this.renderData();
		},

		reload: function () {
			this.options.dataOptions.pageIndex = 0;
			this.renderData();
		},

		initStretchHeight: function () {
			this.$gridContainer = this.$element.parent();

			this.$element.wrap('<div class="datagrid-stretch-wrapper">');
			this.$stretchWrapper = this.$element.parent();

			this.$headerTable = $('<table>').attr('class', this.$element.attr('class'));
			this.$footerTable = this.$headerTable.clone();

			this.$headerTable.prependTo(this.$gridContainer).addClass('datagrid-stretch-header');
			this.$thead.detach().appendTo(this.$headerTable);

			this.$sizingHeader = this.$thead.clone();
			this.$sizingHeader.find('tr:first').remove();

			this.$footerTable.appendTo(this.$gridContainer).addClass('datagrid-stretch-footer');
			this.$tfoot.detach().appendTo(this.$footerTable);
		},

		stretchHeight: function () {
			if (!this.$gridContainer) return;

			this.setColumnWidths();

			var targetHeight = this.$gridContainer.height();
			var headerHeight = this.$headerTable.outerHeight();
			var footerHeight = this.$footerTable.outerHeight();
			var overhead = headerHeight + footerHeight;

			this.$stretchWrapper.height(targetHeight - overhead);
		},

		setColumnWidths: function () {
			if (!this.$sizingHeader) return;

			this.$element.prepend(this.$sizingHeader);

			var $sizingCells = this.$sizingHeader.find('th');
			var columnCount = $sizingCells.length;

			function matchSizingCellWidth(i, el) {
				if (i === columnCount - 1) return;

				var $el = $(el);
				var $sourceCell = $sizingCells.eq(i);
				var width = $sourceCell.width();

				// TD needs extra width to match sorted column header
				if ($sourceCell.hasClass('sorted') && $el.prop('tagName') === 'TD') width = width + SORTED_HEADER_OFFSET;

				$el.width(width);
			}

			this.$colheader.find('th').each(matchSizingCellWidth);
			this.$tbody.find('tr:first > td').each(matchSizingCellWidth);

			this.$sizingHeader.detach();
		}
	};


	// DATAGRID PLUGIN DEFINITION

	$.fn.datagrid = function (option) {
		var args = Array.prototype.slice.call( arguments, 1 );
		var methodReturn;

		var $set = this.each(function () {
			var $this   = $( this );
			var data    = $this.data( 'datagrid' );
			var options = typeof option === 'object' && option;

			if( !data ) $this.data('datagrid', (data = new Datagrid( this, options ) ) );
			if( typeof option === 'string' ) methodReturn = data[ option ].apply( data, args );
		});

		return ( methodReturn === undefined ) ? $set : methodReturn;
	};

	$.fn.datagrid.defaults = {
		dataOptions: { pageIndex: 0, pageSize: 10 },
		loadingHTML: '<div class="progress progress-striped active" style="width:50%;margin:auto;"><div class="bar" style="width:100%;"></div></div>',
		itemsText: 'items',
		itemText: 'item',
        noDataFoundHTML: '0 items'
	};

	$.fn.datagrid.Constructor = Datagrid;

	$.fn.datagrid.noConflict = function () {
		$.fn.datagrid = old;
		return this;
	};
});

/*
 * Fuel UX Datepicker
 * https://github.com/ExactTarget/fuelux
 *
 * Copyright (c) 2013 ExactTarget
 * Licensed under the MIT license.
 */

define('fuelux/datepicker',['require','jquery'],function (require) {

	var $   = require('jquery');
	var old = $.fn.datepicker;

	// DATEPICKER CONSTRUCTOR AND PROTOTYPE

	var Datepicker = function (element, options) {
		this.$element = $(element);

		this.options = $.extend(true, {}, $.fn.datepicker.defaults, options);

		this.formatDate    = ( Boolean( this.options.createInput ) && Boolean( this.options.createInput.native ) ) ? this.formatNativeDate : this.options.formatDate || this.formatDate;
		this.parseDate     = this.options.parseDate || this.parseDate;
		this.blackoutDates = this.options.blackoutDates || this.blackoutDates;

		this.date = this.options.date || new Date();
		this.date = this.parseDate( this.date );

		this.viewDate   = new Date( this.date.valueOf() );
		this.stagedDate = new Date( this.date.valueOf() );
		this.viewDate.setHours( 0,0,0,0 );
		this.stagedDate.setHours( 0,0,0,0 );

		this.done      = false;
		this.callbacks = [];

		this.minDate = new Date();
		this.minDate.setDate( this.minDate.getDate() - 1 );
		this.minDate.setHours( 0,0,0,0 );

		this.maxDate = new Date();
		this.maxDate.setFullYear( this.maxDate.getFullYear() + 10 );
		this.maxDate.setHours( 23,59,59,999 );

		this.years = this._yearRange( this.viewDate );

		this.bindingsAdded = false;

		// OPTIONS
		this.options.dropdownWidth = this.options.dropdownWidth || 170;
		this.options.monthNames    = this.options.monthNames || [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
		this.options.weekdays      = this.options.weekdays || [ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

		this.options.showYears  = false;
		this.options.showDays   = true;
		this.options.showMonths = false;

		this.options.restrictLastMonth = Boolean( this.options.restrictDateSelection );
		this.options.restrictNextMonth = false;

		this.months = [
			{ abbreviation: this.options.monthNames[0], 'class': '', number: 0 },
			{ abbreviation: this.options.monthNames[1], 'class': '', number: 1 },
			{ abbreviation: this.options.monthNames[2], 'class': '', number: 2 },
			{ abbreviation: this.options.monthNames[3], 'class': '', number: 3 },
			{ abbreviation: this.options.monthNames[4], 'class': '', number: 4 },
			{ abbreviation: this.options.monthNames[5], 'class': '', number: 5 },
			{ abbreviation: this.options.monthNames[6], 'class': '', number: 6 },
			{ abbreviation: this.options.monthNames[7], 'class': '', number: 7 },
			{ abbreviation: this.options.monthNames[8], 'class': '', number: 8 },
			{ abbreviation: this.options.monthNames[9], 'class': '', number: 9 },
			{ abbreviation: this.options.monthNames[10], 'class': '', number: 10 },
			{ abbreviation: this.options.monthNames[11], 'class': '', number: 11 }
		];

		if( Boolean( this.options.createInput ) ) {
			if( typeof this.options.createInput === "boolean" && Boolean( this.options.createInput ) ) {
				this.options.createInput = {};
			}

			if( typeof this.options.createInput === 'object' && isNaN( this.options.createInput.length ) ) {
				this.options.createInput.inputSize = this.options.createInput.inputSize || 'span3';
				this._renderInput();
			} else {
				throw new Error( 'createInput option needs to be an object or boolean true' );
			}
		} else {
			this._render();
		}
	};

	Datepicker.prototype = {

		constructor: Datepicker,

		// functions that can be called on object
		disable: function() {
			this.$element.find('input, button').attr( 'disabled', true );
		},

		enable: function() {
			this.$element.find('input, button').attr( 'disabled', false );
		},

		getFormattedDate: function() {
			return this.formatDate( this.date );
		},

		getDate: function( options ) {
			if( Boolean( options ) && Boolean( options.unix ) ) {
				return this.date.getTime();
			} else {
				return this.date;
			}
		},

		setDate: function( date, inputUpdate ) {
			inputUpdate     = inputUpdate || false;
			this.date       = this.parseDate( date, inputUpdate );
			this.stagedDate = new Date( this.date );
			this.viewDate   = new Date( this.date );
			this._render();
			this.$element.trigger( 'changed', this.date );
			return this.date;
		},

		formatDate: function( date ) {
			// this.pad to is function on extension
			return this.padTwo( date.getMonth() + 1 ) + '-' + this.padTwo( date.getDate() ) + '-' + date.getFullYear();
		},

		formatNativeDate: function( date ) {
			return date.getFullYear() + '-' + this.padTwo( date.getMonth() + 1 ) + '-' + this.padTwo( date.getDate() );
		},

		//some code ripped from http://stackoverflow.com/questions/2182246/javascript-dates-in-ie-nan-firefox-chrome-ok
		parseDate: function( date, inputUpdate ) {
			var dt, isoExp, month, parts;

			if( Boolean( date) && new Date( date ) !== 'Invalid Date' ) {
				if( typeof( date ) === 'string' && !inputUpdate  ) {
					date   = date.split( 'T' )[ 0 ];
					isoExp = /^\s*(\d{4})-(\d\d)-(\d\d)\s*$/;
					dt     = new Date( NaN );
					parts  = isoExp.exec( date );

					if( parts ) {
						month = +parts[ 2 ];
						dt.setFullYear( parts[ 1 ], month - 1, parts[ 3 ] );
						if( month !== dt.getMonth() + 1 ) {
								dt.setTime( NaN );
						}
					}
					return dt;
				}
				return new Date( date );
			} else {
				throw new Error( 'could not parse date' );
			}
		},

		blackoutDates: function( date ) {
			date = date;
			return false;
		},

		padTwo: function( value ) {
			var s = '0' + value;
			return s.substr( s.length - 2 );
		},

		_restrictDateSelectionSetup: function() {
			var scopedLastMonth, scopedNextMonth;
			if( Boolean( this.options ) ) {
				if( !this.options.restrictDateSelection ) {
					scopedLastMonth = false;
					scopedNextMonth = false;
				} else {
					scopedNextMonth = ( this.viewDate.getMonth() < new Date().getMonth() ) ? true : false;
					scopedLastMonth = ( this.viewDate.getMonth() > new Date().getMonth() ) ? false : true;
				}
			}
			this.options.restrictLastMonth = scopedLastMonth;
			this.options.restrictNextMonth = scopedNextMonth;
		},

		_repeat: function( head, collection, iterator, tail) {
			var value = head;
			for (var i = 0, ii = collection.length; i < ii; i++) {
				value += iterator( collection[i] );
			}
			value += tail;
			return value;
		},

		_getDaysInMonth: function( month, year ) {
			return 32 - new Date( year, month, 32 ).getDate();
		},

		_range: function( start, end ) {
			var numbers = [];
			for ( var i = start; i < end; i++ ) {
				numbers[ numbers.length ] = i;
			}
			return numbers;
		},

		_yearRange: function( date ) {
			var start    = ( Math.floor(date.getFullYear() / 10 ) * 10) - 1;
			var end      = start + 12;
			var years    = this._range(start, end);
			var interval = [];

			for (var i = 0, ii = years.length; i < ii; i++) {
				var clazz = '';
				if( i === 0 ) {
					clazz = 'previous';
				}
				if( i === years.length - 1 ) {
					clazz = 'next';
				}
				interval[i] = {
					number: years[ i ],
					'class': clazz
				};
			}
			return interval;
		},

		_killEvent: function( e ) {
			e.stopPropagation();
			e.preventDefault();
			return false;
		},

		_applySize: function( elements, size ) {
			for (var i = 0; i < elements.length; i++) {
				$(elements[ i ]).css({
					'width': size,
					'height': size,
					'line-height': size
				});
			}
		},

		_show: function( show ) {
			return show ? '' : 'display: none;';
		},

		_hide: function( hide ) {
			return this._show( !hide );
		},

		_runCallbacks: function() {
			for (var i = 0; i < this.callbacks.length; i++) {
				this.callbacks[ i ]( this.date );
			}
		},

		_showView: function( view ) {
			if( view === 1 ) {
				this.options.showDays   = true;
				this.options.showMonths = false;
				this.options.showYears  = false;
			} else if( view === 2 ) {
				this.options.showDays   = false;
				this.options.showMonths = true;
				this.options.showYears  = false;
			} else if( view === 3 ) {
				this.options.showDays   = false;
				this.options.showMonths = false;
				this.options.showYears  = true;
			}
		},

		_updateCalendarData: function() {
			var viewedMonth            = this.viewDate.getMonth();
			var viewedYear             = this.viewDate.getFullYear();
			var selectedDay            = this.stagedDate.getDate();
			var selectedMonth          = this.stagedDate.getMonth();
			var selectedYear           = this.stagedDate.getFullYear();
			var firstDayOfMonthWeekday = new Date( viewedYear, viewedMonth, 1 ).getDay();
			var lastDayOfMonth         = this._getDaysInMonth( viewedMonth, viewedYear );
			var lastDayOfLastMonth     = this._getDaysInMonth( viewedMonth - 1, viewedYear );

			if( firstDayOfMonthWeekday === 0 ) {
				firstDayOfMonthWeekday = 7;
			}

			var addToEnd = ( 42 - lastDayOfMonth ) - firstDayOfMonthWeekday;

			this.daysOfLastMonth = this._range( lastDayOfLastMonth - firstDayOfMonthWeekday + 1, lastDayOfLastMonth + 1 );
			this.daysOfNextMonth = this._range( 1, addToEnd + 1 );

			// blackout functionality for dates of last month on current calendar view
			for( var x = 0, xx = this.daysOfLastMonth.length; x < xx; x++ ) {
				var tmpLastMonthDaysObj        = {};
				tmpLastMonthDaysObj.number     = this.daysOfLastMonth[ x ];
				tmpLastMonthDaysObj[ 'class' ] = '';

				if( Boolean( this.blackoutDates( new Date( viewedYear, viewedMonth + 1, this.daysOfLastMonth[ x ], 0, 0, 0, 0 ) ) ) ) {
					tmpLastMonthDaysObj[ 'class' ] = 'restrict blackout';
				}

				this.daysOfLastMonth[ x ] = tmpLastMonthDaysObj;
			}

			// blackout functionality for dates of next month on current calendar view
			for( var b = 0, bb = this.daysOfNextMonth.length; b < bb; b++ ) {
				var tmpNextMonthDaysObj        = {};
				tmpNextMonthDaysObj.number     = this.daysOfNextMonth[ b ];
				tmpNextMonthDaysObj[ 'class' ] = '';

				if( Boolean( this.blackoutDates( new Date( viewedYear, viewedMonth + 1, this.daysOfNextMonth[ b ], 0, 0, 0, 0 ) ) ) ) {
					tmpNextMonthDaysObj[ 'class' ] = 'restrict blackout';
				}

				this.daysOfNextMonth[ b ] = tmpNextMonthDaysObj;
			}

			var now                  = new Date();
			var currentDay           = now.getDate();
			var currentMonth         = now.getMonth();
			var currentYear          = now.getFullYear();
			var viewingCurrentMonth  = viewedMonth === currentMonth;
			var viewingCurrentYear   = viewedYear === currentYear;
			var viewingSelectedMonth = viewedMonth === selectedMonth;
			var viewingSelectedYear  = viewedYear === selectedYear;

			var daysOfThisMonth  = this._range( 1, lastDayOfMonth + 1 );
			this.daysOfThisMonth = [];

			for( var i = 0, ii = daysOfThisMonth.length; i < ii; i++) {

				var weekDay      = new Date(viewedYear, viewedMonth, daysOfThisMonth[ i ]).getDay();
				var weekDayClass = 'weekday';

				if(weekDay === 6 || weekDay === 0) {
					weekDayClass = 'weekend';
				}
				if( weekDay === 1 ) {
					weekDayClass = '';
				}
				weekDayClass += ' weekday' + weekDay;

				if( daysOfThisMonth[ i ] === selectedDay && viewingSelectedMonth && viewingSelectedYear ) {
					weekDayClass += ' selected';
				} else if( daysOfThisMonth[ i ] === currentDay && viewingCurrentMonth && viewingCurrentYear ) {
					weekDayClass += ' today';
				}

				var dt = new Date( viewedYear, viewedMonth, daysOfThisMonth[ i ], 0, 0, 0, 0 );
				if( dt <= this.minDate || dt >= this.maxDate ) {
					if ( Boolean( this.blackoutDates( dt ) ) ) {
						weekDayClass += ' restrict blackout';
					} else if ( Boolean( this.options ) && Boolean( this.options.restrictDateSelection ) ) {
						weekDayClass += ' restrict';
					} else {
						weekDayClass += ' past';
					}
				} else if(  Boolean( this.blackoutDates( dt ) ) ) {
					weekDayClass += ' restrict blackout';
				}

				this.daysOfThisMonth[ this.daysOfThisMonth.length ] = {
					'number': daysOfThisMonth[ i ],
					'class' : weekDayClass
				};
			}

			var daysInMonth = this._getDaysInMonth( this.minDate.getFullYear(), this.minDate.getMonth() );
			for( var j = 0, jj = this.months.length; j < jj; j++ ) {

				this.months[ j ][ 'class' ] = '';
				if( viewingCurrentYear && j === currentMonth ) {
					this.months[ j ][ 'class' ] += ' today';
				}
				if( j === selectedMonth && viewingSelectedYear ) {
					this.months[ j ][ 'class' ] += ' selected';
				}

				var minDt = new Date( viewedYear, j, daysInMonth, 23, 59, 59, 999 );
				var maxDt = new Date( viewedYear, j, 0, 0, 0, 0, 0 );
				if( minDt <= this.minDate || maxDt >= this.maxDate ) {
					if( Boolean( this.options.restrictDateSelection ) ) {
						this.months[ j ][ 'class' ] += ' restrict';
					}
				}
			}

			this.years  = this._yearRange( this.viewDate);
			daysInMonth = this._getDaysInMonth( this.minDate.getFullYear(), 11 );

			for( var z = 0, zz = this.years.length; z < zz; z++ ) {
				if( this.years[ z ].number === currentYear ) {
					this.years[ z ][ 'class' ] += ' today';
				}
				if( this.years[ z ].number === selectedYear ) {
					this.years[ z ][ 'class' ] += ' selected';
				}

				var minDt2 = new Date( this.years[ z ].number, 11, daysInMonth, 23, 59, 59, 999);
				var maxDt2 = new Date( this.years[ z ].number, 0, 0, 0, 0, 0, 0);
				if( minDt2 <= this.minDate || maxDt2 >= this.maxDate ) {
					if( Boolean( this.options.restrictDateSelection ) ) {
						this.years[ z ]['class'] += ' restrict';
					}
				}
			}
		},

		_updateCss: function() {
			while( this.options.dropdownWidth % 7 !== 0 ) {
				this.options.dropdownWidth++;
			}

			this.$view.css('width', this.options.dropdownWidth + 'px' );
			this.$header.css('width', this.options.dropdownWidth + 'px' );
			this.$labelDiv.css('width', ( this.options.dropdownWidth - 60 ) + 'px' );
			this.$footer.css('width', this.options.dropdownWidth + 'px' );
			var labelSize     = ( this.options.dropdownWidth * 0.25 ) - 2;
			var paddingTop    = Math.round( ( this.options.dropdownWidth - ( labelSize * 3 ) ) / 2 );
			var paddingBottom = paddingTop;
			while( paddingBottom + paddingTop + ( labelSize * 3 ) < this.options.dropdownWidth ) {
				paddingBottom += 0.1;
			}
			while( paddingBottom + paddingTop + ( labelSize * 3 ) > this.options.dropdownWidth ) {
				paddingBottom -= 0.1;
			}
			
			this.$calendar.css({
				'float': 'left'
			});

			this.$monthsView.css({
				'width': this.options.dropdownWidth + 'px',
				'padding-top': paddingTop + 'px',
				'padding-bottom': paddingBottom + 'px'
			});

			this.$yearsView.css({
				'width': this.options.dropdownWidth + 'px',
				'padding-top': paddingTop + 'px',
				'padding-bottom': paddingBottom + 'px'
			});

			var cellSize       = Math.round( this.options.dropdownWidth / 7.0 ) - 2 + 'px';
			var headerCellSize = Math.round( this.options.dropdownWidth / 7.0 ) + 'px';
			this._applySize( this.$yearsView.children(), labelSize + 'px' );
			this._applySize( this.$monthsView.children(), labelSize + 'px' );
			this._applySize( this.$weekdaysDiv.children(), headerCellSize );
			this._applySize( this.$lastMonthDiv.children(), cellSize );
			this._applySize( this.$thisMonthDiv.children(), cellSize );
			this._applySize( this.$nextMonthDiv.children(), cellSize );
		},

		_close: function() {
			this.$input.dropdown( 'toggle' );
		},

		_select: function( e ) {
			if( e.target.className.indexOf( 'restrict' ) > -1 ) {
				return this._killEvent(e);
			} else {
				this._killEvent( e );
				this._close();
			}

			this.stagedDate = this.viewDate;
			this.stagedDate.setDate( parseInt( e.target.innerHTML, 10 ) );

			this.setDate( this.stagedDate );
			this._render();
			this.done = true;
			this._runCallbacks();
		},

		_pickYear: function( e ) {
			var year = parseInt( $( e.target ).data( 'yearNumber' ), 10 );
			if( e.target.className.indexOf('restrict') > -1 ) {
				return this._killEvent(e);
			}

			this.viewDate = new Date( year, this.viewDate.getMonth(), 1 );
			this._showView( 2 );
			this._render();

			return this._killEvent(e);
		},

		_pickMonth: function( e ) {
			var month = parseInt( $(e.target).data( 'monthNumber' ), 10 );
			if( e.target.className.indexOf( 'restrict' ) > -1 ) {
				return this._killEvent(e);
			}

			this.viewDate = new Date( this.viewDate.getFullYear(), month, 1 );
			this._showView( 1 );
			this._render();

			return this._killEvent(e);
		},

		_previousSet: function( e ) {
			this._previous( e, true );
		},

		_previous: function( e, set ) {
			if( e.target.className.indexOf( 'restrict' ) > -1 ) {
				return this._killEvent(e);
			}
			
			if( this.options.showDays) {
				this.viewDate = new Date( this.viewDate.getFullYear(), this.viewDate.getMonth() - 1, 1 );
			} else if( this.options.showMonths ) {
				this.viewDate = new Date( this.viewDate.getFullYear() - 1, this.viewDate.getMonth(), 1 );
			} else if( this.options.showYears ) {
				this.viewDate = new Date( this.viewDate.getFullYear() - 10, this.viewDate.getMonth(), 1 );
			}

			if( Boolean( set ) ) {
				this._select( e );
			} else {
				this._render();
			}
			// move this below 'this._render()' if you want it to go to the previous month when you select a day from the current month
			return this._killEvent( e );
		},

		_nextSet: function( e ) {
			this._next( e, true );
		},

		_next: function( e, set ) {
			if( e.target.className.indexOf('restrict') > -1 ) {
				return this._killEvent(e);
			}
			
			if( this.options.showDays ) {
				this.viewDate = new Date( this.viewDate.getFullYear(), this.viewDate.getMonth() + 1, 1 );
			} else if( this.options.showMonths ) {
				this.viewDate = new Date( this.viewDate.getFullYear() + 1, this.viewDate.getMonth(), 1 );
			} else if( this.options.showYears ) {
				this.viewDate = new Date( this.viewDate.getFullYear() + 10, this.viewDate.getMonth(), 1 );
			}

			if( Boolean( set ) ) {
				this._select( e );
			} else {
				this._render();
			}
			// move this below 'this._render()' if you want it to go to the next month when you select a day from the current month
			return this._killEvent(e);
		},

		_today: function( e ) {
			this.viewDate = new Date();
			this._showView( 1 );
			this._render();
			return this._killEvent(e);
		},

		_emptySpace: function( e ) {
			if( Boolean( this.done ) ) {
				this.done = false;
			}
			return this._killEvent(e);
		},

		_monthLabel: function() {
			return this.options.monthNames[ this.viewDate.getMonth() ];
		},

		_yearLabel: function() {
			return this.viewDate.getFullYear();
		},

		_monthYearLabel: function() {
			var label;
			if( this.options.showDays ) {
				label = this._monthLabel() + ' ' + this._yearLabel();
			} else if( this.options.showMonths ) {
				label = this._yearLabel();
			} else if( this.options.showYears ) {
				label = this.years[ 0 ].number + ' - ' + this.years[ this.years.length - 1 ].number;
			}
			return label;
		},

		_toggleMonthYearPicker: function( e ) {
			if( this.options.showDays ) {
				this._showView( 2 );
			} else if( this.options.showMonths ) {
				this._showView( 3 );
			} else if( this.options.showYears ) {
				this._showView( 1 );
			}
			this._render();
			return this._killEvent( e );
		},

		_renderCalendar: function() {
			var self = this;
			self._restrictDateSelectionSetup();

			return '<div class="calendar">' +
				'<div class="header clearfix">' +
					'<div class="left hover"><div class="leftArrow"></div></div>' +
					'<div class="right hover"><div class="rightArrow"></div></div>' +
					'<div class="center hover">' + self._monthYearLabel() + '</div>' +
				'</div>' +
				'<div class="daysView" style="' + self._show( self.options.showDays ) + '">' +

					self._repeat( '<div class="weekdays">', self.options.weekdays,
						function( weekday ) {
							return '<div >' + weekday + '</div>';
						}, '</div>' ) +

					self._repeat( '<div class="lastmonth">', self.daysOfLastMonth,
						function( day ) {
							if( self.options.restrictLastMonth ) {
								day['class'] = day['class'].replace('restrict', '') + " restrict";
							}
							return '<div class="' + day[ 'class' ] + '">' + day.number + '</div>';
						}, '</div>' ) +

					self._repeat( '<div class="thismonth">', self.daysOfThisMonth,
						function( day ) {
							return '<div class="' + day[ 'class' ] + '">' + day.number + '</div>';
						}, '</div>' ) +

					self._repeat( '<div class="nextmonth">', self.daysOfNextMonth,
						function( day ) {
							if( self.options.restrictNextMonth ) {
								day['class'] = day['class'].replace('restrict', '') + " restrict";
							}
							return '<div class="' + day[ 'class' ] + '">' + day.number + '</div>';
						}, '</div>' ) +
				'</div>' +

				self._repeat( '<div class="monthsView" style="' + self._show( self.options.showMonths ) + '">', self.months,
					function( month ) {
						return '<div data-month-number="' + month.number +
							'" class="' + month[ 'class' ] + '">' + month.abbreviation + '</div>';
					}, '</div>' ) +

				self._repeat( '<div class="yearsView" style="' + self._show( self.options.showYears ) + '">', self.years,
					function( year ) {
						return '<div data-year-number="' + year.number +
							'" class="' + year[ 'class' ] + '">' + year.number + '</div>';
					}, '</div>' ) +

				'<div class="footer">' +
					'<div class="center hover">Today</div>' +
				'</div>' +
			'</div>';
		},

		_render: function() {
			this._insertDateIntoInput();
			this._updateCalendarData();
			if ( Boolean( this.bindingsAdded ) ) this._removeBindings();
			this.$element.find( '.dropdown-menu' ).html( this._renderCalendar() );
			this._initializeCalendarElements();
			this._addBindings();
			this._updateCss();
		},

		_renderInput: function() {
			var input = ( Boolean( this.options.createInput.native ) ) ? this._renderInputNative() : this._renderInputHTML();
			this.$element.html( input );
			this._render();
		},

		_renderInputNative: function() {
			return '<input type="date" value="' + this.formatDate( this.date ) + '"' + this._calculateInputSize( [ 'native' ] ) + '>';
		},

		_renderInputHTML: function() {
			var inputClass = ( Boolean( this.options.createInput.dropDownBtn ) ) ? 'input-append' : 'input-group';

			var dropdownHtml = '<div class="' + inputClass + '">' +
						'<div class="dropdown-menu"></div>' +
						'<input type="text" '+ this._calculateInputSize() +' value="'+this.formatDate( this.date ) +'" data-toggle="dropdown">';
			
			if( Boolean( this.options.createInput.dropDownBtn ) ) {
				dropdownHtml = dropdownHtml + '<button type="button" class="btn" data-toggle="dropdown"><i class="icon-calendar"></i></button>';
			}

			dropdownHtml = dropdownHtml + '</div>';

			return '<div class="datepicker dropdown">' + dropdownHtml + '</div>';
		},

		_calculateInputSize: function( options ) {
			if( Boolean( parseInt( this.options.createInput.inputSize, 10 ) ) ) {
				return 'style="width:'+ this.options.createInput.inputSize +'px"';
			} else {
				options = ( Boolean( options ) ) ? " " + options.join(' ') : '';
				return 'class="' + this.options.createInput.inputSize + options + '"';
			}

		},

		_insertDateIntoInput: function() {
			this.$element.find('input[type="text"]').val( this.formatDate( this.date ) );
		},

		_keyupDateUpdate: function( e ) {
			var validLength = this.formatDate( this.date ).length;
			var inputValue  = this.$input.val();

			if( validLength === inputValue.length && this._checkKeyCode( e ) ) {
				this.setDate( inputValue, true );
			}
		},

		_checkKeyCode: function( e ) {
			// only allow numbers, function keys, and date formatting symbols
			// Allow: Ctrl+A
			// Allow: home, end, left, right
			if ( $.inArray( e.keyCode, [ 46,8,9,27,13,32 ] ) !== -1 || ( e.keyCode === 65 && e.ctrlKey === true ) || ( e.keyCode >= 35 && e.keyCode <= 39 ) ) {
				// let it happen, don't do anything
				return false;
			} else if ( e.shiftKey || ( e.keyCode >= 48 || e.keyCode <= 57 ) || ( e.keyCode >= 96 || e.keyCode <= 105 ) || e.keyCode === 110 ||  e.keyCode === 190 || e.keyCode === 191 ) {
				// Ensure that it is a number and return true
				return true;
			} else {
				return false;
			}
		},

		_initializeCalendarElements: function() {
			this.$input        = this.$element.find( 'input[type="text"]' );
			this.$calendar     = this.$element.find('div.calendar');
			this.$header       = this.$calendar.children().eq(0);
			this.$labelDiv     = this.$header.children().eq(2);
			this.$view         = this.$calendar.children().eq(1);
			this.$monthsView   = this.$calendar.children().eq(2);
			this.$yearsView    = this.$calendar.children().eq(3);
			this.$weekdaysDiv  = this.$view.children().eq(0);
			this.$lastMonthDiv = this.$view.children().eq(1);
			this.$thisMonthDiv = this.$view.children().eq(2);
			this.$nextMonthDiv = this.$view.children().eq(3);
			this.$footer       = this.$calendar.children().eq(4);
		},

		_addBindings: function() {
			this.$input.on( 'keyup', $.proxy( this._keyupDateUpdate, this ) );
			this.$calendar.on( 'click', $.proxy( this._emptySpace, this) );

			this.$header.find( '.left' ).on( 'click', $.proxy( this._previous, this ) );
			this.$header.find( '.right' ).on( 'click', $.proxy( this._next, this ) );
			this.$header.find( '.center' ).on( 'click', $.proxy( this._toggleMonthYearPicker, this ) );

			this.$lastMonthDiv.find( 'div' ).on( 'click', $.proxy( this._previousSet, this ) );
			this.$thisMonthDiv.find( 'div' ).on( 'click', $.proxy( this._select, this ) );
			this.$nextMonthDiv.find( 'div' ).on( 'click', $.proxy( this._nextSet, this ) );

			this.$monthsView.find( 'div' ).on( 'click', $.proxy( this._pickMonth, this ) );
			this.$yearsView.find( 'div' ).on( 'click', $.proxy( this._pickYear, this ) );
			this.$footer.find( '.center' ).on( 'click', $.proxy( this._today, this ) );

			this.bindingsAdded = true;
		},

		_removeBindings: function() {
			this.$input.off( 'keyup' );
			this.$calendar.off( 'click' );

			this.$header.find( '.left' ).off( 'click' );
			this.$header.find( '.right' ).off( 'click' );
			this.$header.find( '.center' ).off( 'click' );

			this.$lastMonthDiv.find( 'div' ).off( 'click' );
			this.$thisMonthDiv.find( 'div' ).off( 'click' );
			this.$nextMonthDiv.find( 'div' ).off( 'click' );

			this.$monthsView.find( 'div' ).off( 'click' );
			this.$yearsView.find( 'div' ).off( 'click' );
			this.$footer.find( '.center' ).off( 'click' );

			this.bindingsAdded = false;
		}
	};


	// DATEPICKER PLUGIN DEFINITION

	$.fn.datepicker = function (option) {
		var args = Array.prototype.slice.call( arguments, 1 );
		var methodReturn;

		var $set = this.each(function () {
			var $this   = $( this );
			var data    = $this.data( 'datepicker' );
			var options = typeof option === 'object' && option;

			if( !data ) $this.data('datepicker', (data = new Datepicker( this, options ) ) );
			if( typeof option === 'string' ) methodReturn = data[ option ].apply( data, args );
		});

		return ( methodReturn === undefined ) ? $set : methodReturn;
	};

	$.fn.datepicker.defaults = {
		date: new Date(),
		createInput: false,
		dropdownWidth: 170,
		restrictDateSelection: true
	};

	$.fn.datepicker.Constructor = Datepicker;

	$.fn.datepicker.noConflict = function () {
		$.fn.datepicker = old;
		return this;
	};
});
/*
 * Fuel UX Intelligent Bootstrap Dropdowns
 * https://github.com/ExactTarget/fuelux
 *
 * Copyright (c) 2013 ExactTarget
 * Licensed under the MIT license.
 */

define('fuelux/intelligent-dropdown',[ "jquery", "fuelux/all"], function($) {

	$(function() {
		$(document.body).on("click", "[data-toggle=dropdown][data-direction]", function( event ) {

			var dataDirection = $(this).data().direction;

			// if data-direction is not auto or up, default to bootstraps dropdown
			if( dataDirection === "auto" || dataDirection === "up" ) {
				// only changing css positioning if position is set to static
				// if this doesn"t happen, dropUp will not be correct
				// works correctly for absolute, relative, and fixed positioning
				if( $(this).parent().css("position") === "static" ) {
					$(this).parent().css({ position: "relative"});
				}

				// only continue into this function if the click came from a user
				if( event.hasOwnProperty("originalEvent") ) {
					// stopping bootstrap event propagation
					event.stopPropagation();

					// deciding what to do based on data-direction attribute
					if( dataDirection === "auto" ) {
						// have the drop down intelligently decide where to place itself
						forceAutoDropDown( $(this) );
					} else if ( dataDirection === "up" ) {
						forceDropUp( $(this) );
					}
				}
			}

		});

		function forceDropUp( element ) {
			var dropDown      = element.next();
			var dropUpPadding = 5;
			var topPosition;

			$(dropDown).addClass("dropUp");
			topPosition = ( ( dropDown.outerHeight() + dropUpPadding ) * -1 ) + "px";

			dropDown.css({
				visibility: "visible",
				top: topPosition
			});
			element.click();
		}

		function forceAutoDropDown( element ) {
			var dropDown      = element.next();
			var dropUpPadding = 5;
			var topPosition;

			// setting this so I can get height of dropDown without it being shown
			dropDown.css({ visibility: "hidden" });

			// deciding where to put menu
			if( dropUpCheck( dropDown ) ) {
				$(dropDown).addClass("dropUp");
				topPosition = ( ( dropDown.outerHeight() + dropUpPadding ) * -1 ) + "px";
			} else {
				$(dropDown).removeClass("dropUp");
				topPosition = "auto";
			}

			dropDown.css({
				visibility: "visible",
				top: topPosition
			});
			element.click();
		}

		function dropUpCheck( element ) {
			// caching container
			var $container = getContainer( element );

			// building object with measurementsances for later use
			var measurements                = {};
			measurements.parentHeight       = element.parent().outerHeight();
			measurements.parentOffsetTop    = element.parent().offset().top;
			measurements.dropdownHeight     = element.outerHeight();
			measurements.containerHeight    = $container.overflowElement.outerHeight();

			// this needs to be different if the window is the container or another element is
			measurements.containerOffsetTop = ( !! $container.isWindow ) ? $container.overflowElement.scrollTop() : $container.overflowElement.offset().top;

			// doing the calculations
			measurements.fromTop    = measurements.parentOffsetTop - measurements.containerOffsetTop;
			measurements.fromBottom = measurements.containerHeight - measurements.parentHeight - ( measurements.parentOffsetTop - measurements.containerOffsetTop );

			// actual determination of where to put menu
			// false = drop down
			// true = drop up
			if( measurements.dropdownHeight < measurements.fromBottom ) {
				return false;
			} else if ( measurements.dropdownHeight < measurements.fromTop ) {
				return true;
			} else if ( measurements.dropdownHeight >= measurements.fromTop && measurements.dropdownHeight >= measurements.fromBottom ) {
				// decide which one is bigger and put it there
				if( measurements.fromTop >= measurements.fromBottom ) {
					return true;
				} else {
					return false;
				}
			}
		}

		function getContainer( element ) {
			var containerElement = window;
			var isWindow         = true;
			$.each( element.parents(), function(index, value) {
				if( $(value).css('overflow') !== 'visible' ) {
					containerElement = value;
					isWindow         = false;
					return false;
				}
			});
			return {
				overflowElement: $( containerElement ),
				isWindow: isWindow
			};
		}
	});
});
/*
 * Fuel UX Pillbox
 * https://github.com/ExactTarget/fuelux
 *
 * Copyright (c) 2012 ExactTarget
 * Licensed under the MIT license.
 */

define('fuelux/pillbox',['require','jquery'],function(require) {

	var $   = require('jquery');
	var old = $.fn.pillbox;

	// PILLBOX CONSTRUCTOR AND PROTOTYPE

	var Pillbox = function (element, options) {
		this.$element = $(element);
		this.options = $.extend({}, $.fn.pillbox.defaults, options);
		this.$element.on('click', 'li', $.proxy(this.itemclicked, this));
	};

	Pillbox.prototype = {
		constructor : Pillbox,

		items: function() {
			return this.$element.find('li').map(function() {
				var $this = $(this);
				return $.extend({
					text : $this.text()
				}, $this.data());
			}).get();
		},

		itemclicked: function(e) {

			var $li = $(e.currentTarget);
			var data = $.extend({
				text : $li.html()
			}, $li.data());

			$li.remove();
			e.preventDefault();

			this.$element.trigger('removed', data);
		},

		itemCount: function() {

			return this.$element.find('li').length;
		},

		addItem: function(text, value) {

			value = value || text;

			//<li data-value="foo">Item One</li>

			var $li = $('<li data-value="' + value + '">' + text + '</li>');

			this.$element.find('ul').append($li);

			return $li;
		},

		removeBySelector: function(selector) {

			this.$element.find('ul').find(selector).remove();
		},

		removeByValue: function(value) {

			var selector = 'li[data-value="' + value + '"]';

			this.removeBySelector(selector);
		},

		removeByText: function(text) {

			var selector = 'li:contains("' + text + '")';

			this.removeBySelector(selector);
		},

		clear: function() {

			this.$element.find('ul').empty();
		}
	};

	// PILLBOX PLUGIN DEFINITION

	$.fn.pillbox = function (option) {
		var args = Array.prototype.slice.call( arguments, 1 );
		var methodReturn;

		var $set = this.each(function () {
			var $this   = $( this );
			var data    = $this.data( 'pillbox' );
			var options = typeof option === 'object' && option;

			if( !data ) $this.data('pillbox', (data = new Pillbox( this, options ) ) );
			if( typeof option === 'string' ) methodReturn = data[ option ].apply( data, args );
		});

		return ( methodReturn === undefined ) ? $set : methodReturn;
	};

	$.fn.pillbox.defaults = {};

	$.fn.pillbox.Constructor = Pillbox;

	$.fn.pillbox.noConflict = function () {
		$.fn.pillbox = old;
		return this;
	};


	// PILLBOX DATA-API

	$(function () {
		$('body').on('mousedown.pillbox.data-api', '.pillbox', function () {
			var $this = $(this);
			if ($this.data('pillbox')) return;
			$this.pillbox($this.data());
		});
	});
});
/*
 * Fuel UX Radio
 * https://github.com/ExactTarget/fuelux
 *
 * Copyright (c) 2012 ExactTarget
 * Licensed under the MIT license.
 */

define('fuelux/radio',['require','jquery'],function (require) {

	var $   = require('jquery');
	var old = $.fn.radio;

	// RADIO CONSTRUCTOR AND PROTOTYPE

	var Radio = function (element, options) {
		this.$element = $(element);
		this.options = $.extend({}, $.fn.radio.defaults, options);

		// cache elements
		this.$label = this.$element.parent();
		this.$icon = this.$label.find('i');
		this.$radio = this.$label.find('input[type=radio]');
		this.groupName = this.$radio.attr('name');

		// set default state
		this.setState(this.$radio);

		// handle events
		this.$radio.on('change', $.proxy(this.itemchecked, this));
	};

	Radio.prototype = {

		constructor: Radio,

		setState: function ($radio) {
			$radio = $radio || this.$radio;

			var checked = $radio.is(':checked');
			var disabled = !!$radio.prop('disabled');

			this.$icon.removeClass('checked disabled');
			this.$label.removeClass('checked');

			// set state of radio
			if (checked === true) {
				this.$icon.addClass('checked');
				this.$label.addClass('checked');
			}
			if (disabled === true) {
				this.$icon.addClass('disabled');
			}
		},

		resetGroup: function () {
			var group = $('input[name="' + this.groupName + '"]');

			// reset all radio buttons in group
			group.next().removeClass('checked');
			group.parent().removeClass('checked');
		},

		enable: function () {
			this.$radio.attr('disabled', false);
			this.$icon.removeClass('disabled');
		},

		disable: function () {
			this.$radio.attr('disabled', true);
			this.$icon.addClass('disabled');
		},

		itemchecked: function (e) {
			var radio = $(e.target);

			this.resetGroup();
			this.setState(radio);
		},

		check: function () {
			this.resetGroup();
			this.$radio.prop('checked', true);
			this.setState(this.$radio);
		},

		uncheck: function () {
			this.$radio.prop('checked', false);
			this.setState(this.$radio);
		},

		isChecked: function () {
			return this.$radio.is(':checked');
		}
	};


	// RADIO PLUGIN DEFINITION

	$.fn.radio = function (option) {
		var args = Array.prototype.slice.call( arguments, 1 );
		var methodReturn;

		var $set = this.each(function () {
			var $this   = $( this );
			var data    = $this.data( 'radio' );
			var options = typeof option === 'object' && option;

			if( !data ) $this.data('radio', (data = new Radio( this, options ) ) );
			if( typeof option === 'string' ) methodReturn = data[ option ].apply( data, args );
		});

		return ( methodReturn === undefined ) ? $set : methodReturn;
	};

	$.fn.radio.defaults = {};

	$.fn.radio.Constructor = Radio;

	$.fn.radio.noConflict = function () {
		$.fn.radio = old;
		return this;
	};


	// RADIO DATA-API

	$(function () {
		$(window).on('load', function () {
			//$('i.radio').each(function () {
			$('.radio-custom > input[type=radio]').each(function () {
				var $this = $(this);
				if ($this.data('radio')) return;
				$this.radio($this.data());
			});
		});
	});
});
/*
 * Fuel UX Select
 * https://github.com/ExactTarget/fuelux
 *
 * Copyright (c) 2012 ExactTarget
 * Licensed under the MIT license.
 */

define('fuelux/select',['require','jquery','./util'],function(require) {

    var $   = require('jquery');
    var old = $.fn.select;
    require('./util');

    // SELECT CONSTRUCTOR AND PROTOTYPE

    var Select = function (element, options) {
        this.$element = $(element);
        this.options = $.extend({}, $.fn.select.defaults, options);
        this.$element.on('click', 'a', $.proxy(this.itemclicked, this));
        this.$button = this.$element.find('.btn');
        this.$hiddenField = this.$element.find('.hidden-field');
        this.$label = this.$element.find('.dropdown-label');
        this.setDefaultSelection();

        if (options.resize === 'auto') {
            this.resize();
        }
    };

    Select.prototype = {

        constructor: Select,

        itemclicked: function (e) {
            this.$selectedItem = $(e.target).parent();
            this.$hiddenField.val(this.$selectedItem.attr('data-value'));
            this.$label.text(this.$selectedItem.text());

            // pass object including text and any data-attributes
            // to onchange event
            var data = this.selectedItem();

            // trigger changed event
            this.$element.trigger('changed', data);

            e.preventDefault();
        },

        resize: function() {
            var newWidth = 0;
            var sizer = $('<div/>').addClass('select-sizer');
            var width = 0;

            $('body').append(sizer);

            // iterate through each item to find longest string
            this.$element.find('a').each(function () {
                sizer.text($(this).text());
                newWidth = sizer.outerWidth();
                if(newWidth > width) {
                    width = newWidth;
                }
            });

            sizer.remove();

            this.$label.width(width);
        },

        selectedItem: function() {
            var txt = this.$selectedItem.text();
            return $.extend({ text: txt }, this.$selectedItem.data());
        },

        selectByText: function(text) {
            var selector = 'li a:fuelTextExactCI(' + text + ')';
            this.selectBySelector(selector);
        },

        selectByValue: function(value) {
            var selector = 'li[data-value="' + value + '"]';
            this.selectBySelector(selector);
        },

        selectByIndex: function(index) {
            // zero-based index
            var selector = 'li:eq(' + index + ')';
            this.selectBySelector(selector);
        },

        selectBySelector: function(selector) {
            var item = this.$element.find(selector);

            this.$selectedItem = item;
            this.$hiddenField.val(this.$selectedItem.attr('data-value'));
            this.$label.text(this.$selectedItem.text());
        },

        setDefaultSelection: function() {
            var selector = 'li[data-selected=true]:first';
            var item = this.$element.find(selector);
            if(item.length === 0) {
                // select first item
                this.selectByIndex(0);
            }
            else {
                // select by data-attribute
                this.selectBySelector(selector);
                item.removeData('selected');
                item.removeAttr('data-selected');
            }
        },

        enable: function() {
            this.$button.removeClass('disabled');
        },

        disable: function() {
            this.$button.addClass('disabled');
        }

    };


    // SELECT PLUGIN DEFINITION

    $.fn.select = function (option) {
        var args = Array.prototype.slice.call(arguments, 1);
        var methodReturn;

        var $set = this.each(function () {
            var $this = $(this);
            var data = $this.data('select');
            var options = typeof option === 'object' && option;

            if (!data) $this.data('select', (data = new Select(this, options)));
            if (typeof option === 'string') methodReturn = data[option].apply(data, args);
        });

        return ( methodReturn === undefined ) ? $set : methodReturn;
    };

    $.fn.select.defaults = {};

    $.fn.select.Constructor = Select;

    $.fn.select.noConflict = function () {
      $.fn.select = old;
      return this;
    };


    // SELECT DATA-API

    $(function () {

        $(window).on('load', function () {
            $('.select').each(function () {
                var $this = $(this);
                if ($this.data('select')) return;
                $this.select($this.data());
            });
        });

        $('body').on('mousedown.select.data-api', '.select', function () {
            var $this = $(this);
            if ($this.data('select')) return;
            $this.select($this.data());
        });
    });

});

/*
 * Fuel UX Spinner
 * https://github.com/ExactTarget/fuelux
 *
 * Copyright (c) 2012 ExactTarget
 * Licensed under the MIT license.
 */

define('fuelux/spinner',['require','jquery'],function(require) {

	var $   = require('jquery');
	var old = $.fn.spinner;

	// SPINNER CONSTRUCTOR AND PROTOTYPE

	var Spinner = function (element, options) {
		this.$element = $(element);
		this.options = $.extend({}, $.fn.spinner.defaults, options);
		this.$input = this.$element.find('.spinner-input');
		this.$element.on('keyup', this.$input, $.proxy(this.change, this));

		if (this.options.hold) {
			this.$element.on('mousedown', '.spinner-up', $.proxy(function() { this.startSpin(true); } , this));
			this.$element.on('mouseup', '.spinner-up, .spinner-down', $.proxy(this.stopSpin, this));
			this.$element.on('mouseout', '.spinner-up, .spinner-down', $.proxy(this.stopSpin, this));
			this.$element.on('mousedown', '.spinner-down', $.proxy(function() {this.startSpin(false);} , this));
		} else {
			this.$element.on('click', '.spinner-up', $.proxy(function() { this.step(true); } , this));
			this.$element.on('click', '.spinner-down', $.proxy(function() { this.step(false); }, this));
		}

		this.switches = {
			count: 1,
			enabled: true
		};

		if (this.options.speed === 'medium') {
			this.switches.speed = 300;
		} else if (this.options.speed === 'fast') {
			this.switches.speed = 100;
		} else {
			this.switches.speed = 500;
		}

		this.lastValue = null;

		this.render();

		if (this.options.disabled) {
			this.disable();
		}
	};

	Spinner.prototype = {
		constructor: Spinner,

		render: function () {
			var inputValue = this.$input.val();

			if (inputValue) {
				this.value(inputValue);
			} else {
				this.$input.val(this.options.value);
			}

			this.$input.attr('maxlength', (this.options.max + '').split('').length);
		},

		change: function () {
			var newVal = this.$input.val();

			if(newVal/1){
				this.options.value = newVal/1;
			}else{
				newVal = newVal.replace(/[^0-9]/g,'') || '';
				this.$input.val(newVal);
				this.options.value = newVal/1;
			}

			this.triggerChangedEvent();
		},

		stopSpin: function () {
            if(this.switches.timeout!==undefined){
                clearTimeout(this.switches.timeout);
                this.switches.count = 1;
                this.triggerChangedEvent();
            }
		},

		triggerChangedEvent: function () {
			var currentValue = this.value();
			if (currentValue === this.lastValue) return;

			this.lastValue = currentValue;

			// Primary changed event
			this.$element.trigger('changed', currentValue);

			// Undocumented, kept for backward compatibility
			this.$element.trigger('change');
		},

		startSpin: function (type) {

			if (!this.options.disabled) {
				var divisor = this.switches.count;

				if (divisor === 1) {
					this.step(type);
					divisor = 1;
				} else if (divisor < 3){
					divisor = 1.5;
				} else if (divisor < 8){
					divisor = 2.5;
				} else {
					divisor = 4;
				}

				this.switches.timeout = setTimeout($.proxy(function() {this.iterator(type);} ,this),this.switches.speed/divisor);
				this.switches.count++;
			}
		},

		iterator: function (type) {
			this.step(type);
			this.startSpin(type);
		},

		step: function (dir) {
			var curValue = this.options.value;
			var limValue = dir ? this.options.max : this.options.min;

			if ((dir ? curValue < limValue : curValue > limValue)) {
				var newVal = curValue + (dir ? 1 : -1) * this.options.step;

				if (dir ? newVal > limValue : newVal < limValue) {
					this.value(limValue);
				} else {
					this.value(newVal);
				}
			} else if (this.options.cycle) {
				var cycleVal = dir ? this.options.min : this.options.max;
				this.value(cycleVal);
			}
		},

		value: function (value) {
			if (!isNaN(parseFloat(value)) && isFinite(value)) {
				value = parseFloat(value);
				this.options.value = value;
				this.$input.val(value);
				return this;
			} else {
				return this.options.value;
			}
		},

		disable: function () {
			this.options.disabled = true;
			this.$input.attr('disabled','');
			this.$element.find('button').addClass('disabled');
		},

		enable: function () {
			this.options.disabled = false;
			this.$input.removeAttr("disabled");
			this.$element.find('button').removeClass('disabled');
		}
	};


	// SPINNER PLUGIN DEFINITION

	$.fn.spinner = function (option) {
		var args = Array.prototype.slice.call( arguments, 1 );
		var methodReturn;

		var $set = this.each(function () {
			var $this   = $( this );
			var data    = $this.data( 'spinner' );
			var options = typeof option === 'object' && option;

			if( !data ) $this.data('spinner', (data = new Spinner( this, options ) ) );
			if( typeof option === 'string' ) methodReturn = data[ option ].apply( data, args );
		});

		return ( methodReturn === undefined ) ? $set : methodReturn;
	};

	$.fn.spinner.defaults = {
		value: 1,
		min: 1,
		max: 999,
		step: 1,
		hold: true,
		speed: 'medium',
		disabled: false
	};

	$.fn.spinner.Constructor = Spinner;

	$.fn.spinner.noConflict = function () {
		$.fn.spinner = old;
		return this;
	};


	// SPINNER DATA-API

	$(function () {
		$('body').on('mousedown.spinner.data-api', '.spinner', function () {
			var $this = $(this);
			if ($this.data('spinner')) return;
			$this.spinner($this.data());
		});
	});
});
/*
 * Fuel UX Scheduler
 * https://github.com/ExactTarget/fuelux
 *
 * Copyright (c) 2012 ExactTarget
 * Licensed under the MIT license.
 */

define('fuelux/scheduler',['require','jquery','fuelux/combobox','fuelux/datepicker','fuelux/radio','fuelux/select','fuelux/spinner'],function(require) {
    var $ = require('jquery');
    var old = $.fn.scheduler;

    require('fuelux/combobox');
    require('fuelux/datepicker');
    require('fuelux/radio');
    require('fuelux/select');
    require('fuelux/spinner');

    // SCHEDULER CONSTRUCTOR AND PROTOTYPE

    var Scheduler = function (element, options) {
        var self = this;

        this.$element = $(element);
        this.options = $.extend({}, $.fn.scheduler.defaults, options);

        // cache elements
        this.$startDate = this.$element.find('.scheduler-start .datepicker');
        this.$startTime = this.$element.find('.scheduler-start .combobox');

        this.$timeZone = this.$element.find('.scheduler-timezone .select');

        this.$repeatIntervalPanel = this.$element.find('.repeat-interval-panel');
        this.$repeatIntervalSelect = this.$element.find('.repeat-interval .select');
        this.$repeatIntervalSpinner = this.$element.find('.repeat-interval-panel .spinner');
        this.$repeatIntervalTxt = this.$element.find('.repeat-interval-text');

        this.$end = this.$element.find('.scheduler-end');
        this.$endAfter = this.$end.find('.spinner');
        this.$endSelect= this.$end.find('.select');
        this.$endDate = this.$end.find('.datepicker');

        // panels
        this.$recurrencePanels = this.$element.find('.recurrence-panel');

        // bind events
        this.$element.find('.scheduler-weekly .btn-group .btn').on('click', function(e, data){ self.changed(e, data, true); });
        this.$element.find('.combobox').on('changed', $.proxy(this.changed, this));
        this.$element.find('.datepicker').on('changed', $.proxy(this.changed, this));
        this.$element.find('.select').on('changed', $.proxy(this.changed, this));
        this.$element.find('.spinner').on('changed', $.proxy(this.changed, this));
        this.$element.find('.scheduler-monthly label.radio, .scheduler-yearly label.radio').on('mouseup', $.proxy(this.changed, this));

        this.$repeatIntervalSelect.on('changed', $.proxy(this.repeatIntervalSelectChanged, this));
        this.$endSelect.on('changed', $.proxy(this.endSelectChanged, this));

        //initialize sub-controls
        this.$startDate.datepicker();
        this.$startTime.combobox();
        if(this.$startTime.find('input').val()===''){
            this.$startTime.combobox('selectByIndex', 0);
        }
        this.$repeatIntervalSpinner.spinner();
        this.$endAfter.spinner();
        this.$endDate.datepicker();
    };

    Scheduler.prototype = {
        constructor: Scheduler,

        changed: function(e, data, propagate){
            if(!propagate){
                e.stopPropagation();
            }
            this.$element.trigger('changed', {
                data: (data!==undefined) ? data : $(e.currentTarget).data(),
                originalEvent: e,
                value: this.getValue()
            });
        },

        disable: function(){
            this.toggleState('disable');
        },

        enable: function(){
            this.toggleState('enable');
        },

        // called when the end range changes
        // (Never, After, On date)
        endSelectChanged: function(e, data) {
            var selectedItem, val;

            if(!data){
                selectedItem = this.$endSelect.select('selectedItem');
                val = selectedItem.value;
            }else{
                val = data.value;
            }

            // hide all panels
            this.$endAfter.hide();
            this.$endDate.hide();

            if(val==='after'){
                this.$endAfter.show();
            }else if(val==='date'){
                this.$endDate.show();
            }
        },

        getValue: function(){
            // FREQ = frequency (hourly, daily, monthly...)
            // BYDAY = when picking days (MO,TU,WE,etc)
            // BYMONTH = when picking months (Jan,Feb,March) - note the values should be 1,2,3...
            // BYMONTHDAY = when picking days of the month (1,2,3...)
            // BYSETPOS = when picking First,Second,Third,Fourth,Last (1,2,3,4,-1)

            var interval = this.$repeatIntervalSpinner.spinner('value');
            var pattern = '';
            var repeat = this.$repeatIntervalSelect.select('selectedItem').value;
            var startTime = this.$startTime.combobox('selectedItem').text.toLowerCase();
            var timeZone = this.$timeZone.select('selectedItem');
            var getFormattedDate = function(dateObj, dash){
                var fdate = '';
                var item;

                fdate += dateObj.getFullYear();
                fdate += dash;
                item = dateObj.getMonth() + 1;  //because 0 indexing makes sense when dealing with months /sarcasm
                fdate += (item<10) ? '0' + item : item;
                fdate += dash;
                item = dateObj.getDate();
                fdate += (item<10) ? '0' + item : item;

                return fdate;
            };
            var day, days, hasAm, hasPm, month, pos, startDateTime, type;

            startDateTime = '' + getFormattedDate(this.$startDate.datepicker('getDate'), '-');

            startDateTime += 'T';
            hasAm = (startTime.search('am')>=0);
            hasPm = (startTime.search('pm')>=0);
            startTime = $.trim(startTime.replace(/am/g, '').replace(/pm/g, '')).split(':');
            startTime[0] = parseInt(startTime[0], 10);
            startTime[1] = parseInt(startTime[1], 10);
            if(hasAm && startTime[0]>11){
                startTime[0] = 0;
            }else if(hasPm && startTime[0]<12){
                startTime[0] += 12;
            }
            startDateTime += (startTime[0]<10) ? '0' + startTime[0] : startTime[0];
            startDateTime += ':';
            startDateTime += (startTime[1]<10) ? '0' + startTime[1] : startTime[1];

            startDateTime += (timeZone.offset==='+00:00') ? 'Z' : timeZone.offset;

            if(repeat === 'none') {
                pattern = 'FREQ=DAILY;INTERVAL=1;COUNT=1;';
            }
            else if(repeat === 'hourly') {
                pattern = 'FREQ=HOURLY;';
                pattern += 'INTERVAL=' + interval + ';';
            }
            else if(repeat === 'daily') {
                pattern += 'FREQ=DAILY;';
                pattern += 'INTERVAL=' + interval + ';';
            }
            else if(repeat === 'weekdays') {
                pattern += 'FREQ=DAILY;';
                pattern += 'BYDAY=MO,TU,WE,TH,FR;';
                pattern += 'INTERVAL=1;';
            }
            else if(repeat === 'weekly') {
                days = [];
                this.$element.find('.scheduler-weekly .btn-group button.active').each(function() {
                    days.push($(this).data().value);
                });

                pattern += 'FREQ=WEEKLY;';
                pattern += 'BYDAY=' + days.join(',') + ';';
                pattern += 'INTERVAL=' + interval + ';';
            }
            else if(repeat === 'monthly') {
                pattern += 'FREQ=MONTHLY;';
                pattern += 'INTERVAL=' + interval + ';';

                type = parseInt(this.$element.find('input[name=scheduler-month]:checked').val(), 10);
                if(type === 1) {
                    day = parseInt(this.$element.find('.scheduler-monthly-date .select').select('selectedItem').text, 10);
                    pattern += 'BYMONTHDAY=' + day + ';';
                }
                else if(type === 2) {
                    days = this.$element.find('.month-days').select('selectedItem').value;
                    pos = this.$element.find('.month-day-pos').select('selectedItem').value;

                    pattern += 'BYDAY=' + days + ';';
                    pattern += 'BYSETPOS=' + pos + ';';
                }
            }
            else if(repeat === 'yearly') {
                pattern += 'FREQ=YEARLY;';

                type = parseInt(this.$element.find('input[name=scheduler-year]:checked').val(), 10);
                if(type === 1) {
                    month = this.$element.find('.scheduler-yearly-date .year-month').select('selectedItem').value;
                    day = this.$element.find('.year-month-day').select('selectedItem').text;

                    pattern += 'BYMONTH=' + month + ';';
                    pattern += 'BYMONTHDAY=' + day + ';';
                }
                else if(type === 2) {
                    days = this.$element.find('.year-month-days').select('selectedItem').value;
                    pos = this.$element.find('.year-month-day-pos').select('selectedItem').value;
                    month = this.$element.find('.scheduler-yearly-day .year-month').select('selectedItem').value;

                    pattern += 'BYDAY=' + days + ';';
                    pattern += 'BYSETPOS=' + pos + ';';
                    pattern += 'BYMONTH=' + month + ';';
                }
            }

            var end = this.$endSelect.select('selectedItem').value;
            var duration = '';

            // if both UNTIL and COUNT are not specified, the recurrence will repeat forever
            // http://tools.ietf.org/html/rfc2445#section-4.3.10
            if(repeat !=='none'){
                if(end === 'after') {
                    duration = 'COUNT=' + this.$endAfter.spinner('value') + ';';
                }
                else if(end === 'date') {
                    duration = 'UNTIL=' + getFormattedDate(this.$endDate.datepicker('getDate'), '') + ';';
                }
            }

            pattern += duration;

            var data = {
                startDateTime: startDateTime,
                timeZone: {
                    name: timeZone.name,
                    offset: timeZone.offset
                },
                recurrencePattern: pattern
            };

            return data;
        },

        // called when the repeat interval changes
        // (None, Hourly, Daily, Weekdays, Weekly, Monthly, Yearly
        repeatIntervalSelectChanged: function(e, data) {
            var selectedItem, val, txt;

            if(!data){
                selectedItem = this.$repeatIntervalSelect.select('selectedItem');
                val = selectedItem.value;
                txt = selectedItem.text;
            }else{
                val = data.value;
                txt = data.text;
            }

            // set the text
            this.$repeatIntervalTxt.text(txt);

            switch(val.toLowerCase()) {
                case 'hourly':
                case 'daily':
                case 'weekly':
                case 'monthly':
                    this.$repeatIntervalPanel.show();
                    break;
                default:
                    this.$repeatIntervalPanel.hide();
                    break;
            }

            // hide all panels
            this.$recurrencePanels.hide();

            // show panel for current selection
            this.$element.find('.scheduler-' + val).show();

            // the end selection should only be shown when
            // the repeat interval is not "None (run once)"
            if(val === 'none') {
                this.$end.hide();
            }
            else {
                this.$end.show();
            }
        },

        setValue: function(options){
            var hours, i, item, l, minutes, period, recur, temp;

            if(options.startDateTime){
                temp = options.startDateTime.split('T');
                this.$startDate.datepicker('setDate', temp[0]);

                if(temp[1]){
                    temp[1] = temp[1].split(':');
                    hours = parseInt(temp[1][0], 10);
                    minutes = (temp[1][1]) ? parseInt(temp[1][1].split('+')[0].split('-')[0].split('Z')[0], 10) : 0;
                    period = (hours<12) ? 'AM' : 'PM';

                    if(hours===0){
                        hours = 12;
                    }else if(hours>12){
                        hours -= 12;
                    }
                    minutes = (minutes<10) ? '0' + minutes : minutes;

                    temp = hours + ':' + minutes + ' ' + period;
                    this.$startTime.find('input').val(temp);
                    this.$startTime.combobox('selectByText', temp);
                }
            }

            item = 'li[data';
            if(options.timeZone){
                if(typeof(options.timeZone)==='string'){
                    item += '-name="' + options.timeZone;
                }else{
                    if(options.timeZone.name){
                        item += '-name="' + options.timeZone.name;
                    }else{
                        item += '-offset="' + options.timeZone.offset;
                    }
                }
                item += '"]';
                this.$timeZone.select('selectBySelector', item);
            }else if(options.startDateTime){
                temp = options.startDateTime.split('T')[1];
                if(temp){
                    if(temp.search(/\+/)>-1){
                        temp = '+' + $.trim(temp.split('+')[1]);
                    }else if(temp.search(/\-/)>-1){
                        temp = '-' + $.trim(temp.split('-')[1]);
                    }else{
                        temp = '+00:00';
                    }
                }else{
                    temp = '+00:00';
                }
                item += '-offset="' + temp + '"]';
                this.$timeZone.select('selectBySelector', item);
            }

            if(options.recurrencePattern){
                recur = {};
                temp = options.recurrencePattern.toUpperCase().split(';');
                for(i=0, l=temp.length; i<l; i++){
                    if(temp[i]!==''){
                        item = temp[i].split('=');
                        recur[item[0]] = item[1];
                    }
                }

                if(recur.FREQ==='DAILY'){
                    if(recur.BYDAY==='MO,TU,WE,TH,FR'){
                        item = 'weekdays';
                    }else{
                        if(recur.INTERVAL==='1' && recur.COUNT==='1'){
                            item = 'none';
                        }else{
                            item = 'daily';
                        }
                    }
                }else if(recur.FREQ==='HOURLY'){
                    item = 'hourly';
                }else if(recur.FREQ==='WEEKLY'){
                    if(recur.BYDAY){
                        item = this.$element.find('.scheduler-weekly .btn-group');
                        item.find('button').removeClass('active');
                        temp = recur.BYDAY.split(',');
                        for(i=0,l=temp.length; i<l; i++){
                            item.find('button[data-value="' + temp[i] + '"]').addClass('active');
                        }
                    }
                    item = 'weekly';
                }else if(recur.FREQ==='MONTHLY'){
                    this.$element.find('.scheduler-monthly input').removeClass('checked');
                    if(recur.BYMONTHDAY){
                        temp = this.$element.find('.scheduler-monthly-date');
                        temp.find('input').addClass('checked');
                        temp.find('.select').select('selectByValue', recur.BYMONTHDAY);
                    }else if(recur.BYDAY){
                        temp = this.$element.find('.scheduler-monthly-day');
                        temp.find('input').addClass('checked');
                        if(recur.BYSETPOS){
                            temp.find('.month-day-pos').select('selectByValue', recur.BYSETPOS);
                        }
                        temp.find('.month-days').select('selectByValue', recur.BYDAY);
                    }
                    item = 'monthly';
                }else if(recur.FREQ==='YEARLY'){
                    this.$element.find('.scheduler-yearly input').removeClass('checked');
                    if(recur.BYMONTHDAY){
                        temp = this.$element.find('.scheduler-yearly-date');
                        temp.find('input').addClass('checked');
                        if(recur.BYMONTH){
                            temp.find('.year-month').select('selectByValue', recur.BYMONTH);
                        }
                        temp.find('.year-month-day').select('selectByValue', recur.BYMONTHDAY);
                    }else if(recur.BYSETPOS){
                        temp = this.$element.find('.scheduler-yearly-day');
                        temp.find('input').addClass('checked');
                        temp.find('.year-month-day-pos').select('selectByValue', recur.BYSETPOS);
                        if(recur.BYDAY){
                            temp.find('.year-month-days').select('selectByValue', recur.BYDAY);
                        }
                        if(recur.BYMONTH){
                            temp.find('.year-month').select('selectByValue', recur.BYMONTH);
                        }
                    }
                    item = 'yearly';
                }else{
                    item = 'none';
                }

                if(recur.COUNT){
                    this.$endAfter.spinner('value', parseInt(recur.COUNT, 10));
                    this.$endSelect.select('selectByValue', 'after');
                }else if(recur.UNTIL){
                    temp = recur.UNTIL;
                    if(temp.length===8){
                        temp = temp.split('');
                        temp.splice(4, 0, '-');
                        temp.splice(7, 0, '-');
                        temp = temp.join('');
                    }
                    this.$endDate.datepicker('setDate', temp);
                    this.$endSelect.select('selectByValue', 'date');
                }
                this.endSelectChanged();

                if(recur.INTERVAL){
                    this.$repeatIntervalSpinner.spinner('value', parseInt(recur.INTERVAL, 10));
                }
                this.$repeatIntervalSelect.select('selectByValue', item);
                this.repeatIntervalSelectChanged();
            }
        },

        toggleState: function(action){
            this.$element.find('.combobox').combobox(action);
            this.$element.find('.datepicker').datepicker(action);
            this.$element.find('.select').select(action);
            this.$element.find('.spinner').spinner(action);
            this.$element.find('.radio').radio(action);

            if(action==='disable'){
                action = 'addClass';
            }else{
                action = 'removeClass';
            }
            this.$element.find('.scheduler-weekly .btn-group')[action]('disabled');
        },

        value: function(options) {
            if(options){
                return this.setValue(options);
            }else{
                return this.getValue();
            }
        }
    };


    // SCHEDULER PLUGIN DEFINITION

    $.fn.scheduler = function (option) {
        var args = Array.prototype.slice.call( arguments, 1 );
        var methodReturn;

        var $set = this.each(function () {
            var $this = $(this);
            var data = $this.data('scheduler');
            var options = typeof option === 'object' && option;

            if (!data) $this.data('scheduler', (data = new Scheduler(this, options)));
            if( typeof option === 'string' ) methodReturn = data[ option ].apply( data, args );
        });

        return ( methodReturn === undefined ) ? $set : methodReturn;
    };

    $.fn.scheduler.defaults = {};

    $.fn.scheduler.Constructor = Scheduler;

    $.fn.scheduler.noConflict = function () {
        $.fn.scheduler = old;
        return this;
    };

    // SCHEDULER DATA-API

    $(function () {
        $('body').on('mousedown.scheduler.data-api', '.scheduler', function () {
            var $this = $(this);
            if ($this.data('scheduler')) return;
            $this.scheduler($this.data());
        });
    });

});

/*
 * Fuel UX Search
 * https://github.com/ExactTarget/fuelux
 *
 * Copyright (c) 2012 ExactTarget
 * Licensed under the MIT license.
 */

define('fuelux/search',['require','jquery'],function(require) {

	var $   = require('jquery');
	var old = $.fn.search;

	// SEARCH CONSTRUCTOR AND PROTOTYPE

	var Search = function (element, options) {
		this.$element = $(element);
		this.options = $.extend({}, $.fn.search.defaults, options);

		this.$button = this.$element.find('button')
			.on('click', $.proxy(this.buttonclicked, this));

		this.$input = this.$element.find('input')
			.on('keydown', $.proxy(this.keypress, this))
			.on('keyup', $.proxy(this.keypressed, this));

		this.$icon = this.$element.find('i');
		this.activeSearch = '';
	};

	Search.prototype = {

		constructor: Search,

		search: function (searchText) {
			this.$icon.attr('class', 'icon-remove');
			this.activeSearch = searchText;
			this.$element.trigger('searched', searchText);
		},

		clear: function () {
			this.$icon.attr('class', 'icon-search');
			this.activeSearch = '';
			this.$input.val('');
			this.$element.trigger('cleared');
		},

		action: function () {
			var val = this.$input.val();
			var inputEmptyOrUnchanged = val === '' || val === this.activeSearch;

			if (this.activeSearch && inputEmptyOrUnchanged) {
				this.clear();
			} else if (val) {
				this.search(val);
			}
		},

		buttonclicked: function (e) {
			e.preventDefault();
			if ($(e.currentTarget).is('.disabled, :disabled')) return;
			this.action();
		},

		keypress: function (e) {
			if (e.which === 13) {
				e.preventDefault();
			}
		},

		keypressed: function (e) {
			var val, inputPresentAndUnchanged;

			if (e.which === 13) {
				e.preventDefault();
				this.action();
			} else {
				val = this.$input.val();
				inputPresentAndUnchanged = val && (val === this.activeSearch);
				this.$icon.attr('class', inputPresentAndUnchanged ? 'icon-remove' : 'icon-search');
			}
		},

		disable: function () {
			this.$input.attr('disabled', 'disabled');
			this.$button.addClass('disabled');
		},

		enable: function () {
			this.$input.removeAttr('disabled');
			this.$button.removeClass('disabled');
		}

	};


	// SEARCH PLUGIN DEFINITION

	$.fn.search = function (option) {
		var args = Array.prototype.slice.call( arguments, 1 );
		var methodReturn;

		var $set = this.each(function () {
			var $this = $( this );
			var data = $this.data( 'search' );
			var options = typeof option === 'object' && option;

			if (!data) $this.data('search', (data = new Search(this, options)));
			if (typeof option === 'string') methodReturn = data[ option ].apply( data, args );
		});

		return ( methodReturn === undefined ) ? $set : methodReturn;
	};

	$.fn.search.defaults = {};

	$.fn.search.Constructor = Search;

	$.fn.search.noConflict = function () {
		$.fn.search = old;
		return this;
	};


	// SEARCH DATA-API

	$(function () {
		$('body').on('mousedown.search.data-api', '.search', function () {
			var $this = $(this);
			if ($this.data('search')) return;
			$this.search($this.data());
		});
	});
});
/*
 * Fuel UX Tree
 * https://github.com/ExactTarget/fuelux
 *
 * Copyright (c) 2012 ExactTarget
 * Licensed under the MIT license.
 */

define('fuelux/tree',['require','jquery'],function(require) {

	var $   = require('jquery');
	var old = $.fn.tree;

	// TREE CONSTRUCTOR AND PROTOTYPE

	var Tree = function (element, options) {
		this.$element = $(element);
		this.options = $.extend({}, $.fn.tree.defaults, options);

		this.$element.on('click', '.tree-item', $.proxy( function(ev) { this.selectItem(ev.currentTarget); } ,this));
		this.$element.on('click', '.tree-folder-header', $.proxy( function(ev) { this.selectFolder(ev.currentTarget); }, this));

		this.render();
	};

	Tree.prototype = {
		constructor: Tree,

		render: function () {
			this.populate(this.$element);
		},

		populate: function ($el) {
			var self = this;
			var $parent = $el.parent();
			var loader = $parent.find('.tree-loader:eq(0)');

			loader.show();
			this.options.dataSource.data($el.data(), function (items) {
				loader.hide();

				$.each( items.data, function(index, value) {
					var $entity;

					if(value.type === "folder") {
						$entity = self.$element.find('.tree-folder:eq(0)').clone().show();
						$entity.find('.tree-folder-name').html(value.name);
						$entity.find('.tree-loader').html(self.options.loadingHTML);
						$entity.find('.tree-folder-header').data(value);
					} else if (value.type === "item") {
						$entity = self.$element.find('.tree-item:eq(0)').clone().show();
						$entity.find('.tree-item-name').html(value.name);
						$entity.data(value);
					}

					// Decorate $entity with data making the element
					// easily accessable with libraries like jQuery.
					//
					// Values are contained within the object returned
					// for folders and items as dataAttributes:
					//
					// {
					//     name: "An Item",
					//     type: 'item',
					//     dataAttributes = {
					//         'classes': 'required-item red-text',
					//         'data-parent': parentId,
					//         'guid': guid
					//     }
					// };

					var dataAttributes = value.dataAttributes || [];
					$.each(dataAttributes, function(key, value) {
						switch (key) {
						case 'class':
						case 'classes':
						case 'className':
							$entity.addClass(value);
							break;

						// id, style, data-*
						default:
							$entity.attr(key, value);
							break;
						}
					});

					if($el.hasClass('tree-folder-header')) {
						$parent.find('.tree-folder-content:eq(0)').append($entity);
					} else {
						$el.append($entity);
					}
				});

				// return newly populated folder
				self.$element.trigger('loaded', $parent);
			});
		},

		selectItem: function (el) {
			var $el = $(el);
			var $all = this.$element.find('.tree-selected');
			var data = [];

			if (this.options.multiSelect) {
				$.each($all, function(index, value) {
					var $val = $(value);
					if($val[0] !== $el[0]) {
						data.push( $(value).data() );
					}
				});
			} else if ($all[0] !== $el[0]) {
				$all.removeClass('tree-selected')
					.find('i').removeClass('icon-ok').addClass('tree-dot');
				data.push($el.data());
			}

			var eventType = 'selected';
			if($el.hasClass('tree-selected')) {
				eventType = 'unselected';
				$el.removeClass('tree-selected');
				$el.find('i').removeClass('icon-ok').addClass('tree-dot');
			} else {
				$el.addClass ('tree-selected');
				$el.find('i').removeClass('tree-dot').addClass('icon-ok');
				if (this.options.multiSelect) {
					data.push( $el.data() );
				}
			}

			if(data.length) {
				this.$element.trigger('selected', {info: data});
			}

			// Return new list of selected items, the item
			// clicked, and the type of event:
			$el.trigger('updated', {
				info: data,
				item: $el,
				eventType: eventType
			});
		},

		selectFolder: function (el) {
			var $el = $(el);
			var $parent = $el.parent();
			var $treeFolderContent = $parent.find('.tree-folder-content');
			var $treeFolderContentFirstChild = $treeFolderContent.eq(0);

			var eventType, classToTarget, classToAdd;
			if ($el.find('.icon-folder-close').length) {
				eventType = 'opened';
				classToTarget = '.icon-folder-close';
				classToAdd = 'icon-folder-open';

				$treeFolderContentFirstChild.show();
				if (!$treeFolderContent.children().length) {
					this.populate($el);
				}
			} else {
				eventType = 'closed';
				classToTarget = '.icon-folder-open';
				classToAdd = 'icon-folder-close';

				$treeFolderContentFirstChild.hide();
				if (!this.options.cacheItems) {
					$treeFolderContentFirstChild.empty();
				}
			}

			$parent.find(classToTarget).eq(0)
				.removeClass('icon-folder-close icon-folder-open')
				.addClass(classToAdd);

			this.$element.trigger(eventType, $el.data());
		},

		selectedItems: function () {
			var $sel = this.$element.find('.tree-selected');
			var data = [];

			$.each($sel, function (index, value) {
				data.push($(value).data());
			});
			return data;
		},

		// collapses open folders
		collapse: function () {
			var cacheItems = this.options.cacheItems;

			// find open folders
			this.$element.find('.icon-folder-open').each(function () {
				// update icon class
				var $this = $(this)
					.removeClass('icon-folder-close icon-folder-open')
					.addClass('icon-folder-close');

				// "close" or empty folder contents
				var $parent = $this.parent().parent();
				var $folder = $parent.children('.tree-folder-content');

				$folder.hide();
				if (!cacheItems) {
					$folder.empty();
				}
			});
		}
	};


	// TREE PLUGIN DEFINITION

	$.fn.tree = function (option) {
		var args = Array.prototype.slice.call( arguments, 1 );
		var methodReturn;

		var $set = this.each(function () {
			var $this   = $( this );
			var data    = $this.data( 'tree' );
			var options = typeof option === 'object' && option;

			if( !data ) $this.data('tree', (data = new Tree( this, options ) ) );
			if( typeof option === 'string' ) methodReturn = data[ option ].apply( data, args );
		});

		return ( methodReturn === undefined ) ? $set : methodReturn;
	};

	$.fn.tree.defaults = {
		multiSelect: false,
		loadingHTML: '<div>Loading...</div>',
		cacheItems: true
	};

	$.fn.tree.Constructor = Tree;

	$.fn.tree.noConflict = function () {
		$.fn.tree = old;
		return this;
	};
});
/*
 * Fuel UX Wizard
 * https://github.com/ExactTarget/fuelux
 *
 * Copyright (c) 2012 ExactTarget
 * Licensed under the MIT license.
 */

define('fuelux/wizard',['require','jquery'],function (require) {

	var $   = require('jquery');
	var old = $.fn.wizard;

	// WIZARD CONSTRUCTOR AND PROTOTYPE

	var Wizard = function (element, options) {
		var kids;

		this.$element = $(element);
		this.options = $.extend({}, $.fn.wizard.defaults, options);
		this.options.disablePreviousStep = ( this.$element.data().restrict === "previous" ) ? true : false;
		this.currentStep = this.options.selectedItem.step;
		this.numSteps = this.$element.find('.steps li').length;
		this.$prevBtn = this.$element.find('button.btn-prev');
		this.$nextBtn = this.$element.find('button.btn-next');

		kids = this.$nextBtn.children().detach();
		this.nextText = $.trim(this.$nextBtn.text());
		this.$nextBtn.append(kids);

		// handle events
		this.$prevBtn.on('click', $.proxy(this.previous, this));
		this.$nextBtn.on('click', $.proxy(this.next, this));
		this.$element.on('click', 'li.complete', $.proxy(this.stepclicked, this));
		
		if(this.currentStep > 1) {
			this.selectedItem(this.options.selectedItem);
		}

		if( this.options.disablePreviousStep ) {
			this.$prevBtn.attr( 'disabled', true );
			this.$element.find( '.steps' ).addClass( 'previous-disabled' );
		}
	};

	Wizard.prototype = {

		constructor: Wizard,

		setState: function () {
			var canMovePrev = (this.currentStep > 1);
			var firstStep = (this.currentStep === 1);
			var lastStep = (this.currentStep === this.numSteps);

			// disable buttons based on current step
			if( !this.options.disablePreviousStep ) {
				this.$prevBtn.attr('disabled', (firstStep === true || canMovePrev === false));
			}

			// change button text of last step, if specified
			var data = this.$nextBtn.data();
			if (data && data.last) {
				this.lastText = data.last;
				if (typeof this.lastText !== 'undefined') {
					// replace text
					var text = (lastStep !== true) ? this.nextText : this.lastText;
					var kids = this.$nextBtn.children().detach();
					this.$nextBtn.text(text).append(kids);
				}
			}

			// reset classes for all steps
			var $steps = this.$element.find('.steps li');
			$steps.removeClass('active').removeClass('complete');
			$steps.find('span.badge').removeClass('badge-info').removeClass('badge-success');

			// set class for all previous steps
			var prevSelector = '.steps li:lt(' + (this.currentStep - 1) + ')';
			var $prevSteps = this.$element.find(prevSelector);
			$prevSteps.addClass('complete');
			$prevSteps.find('span.badge').addClass('badge-success');

			// set class for current step
			var currentSelector = '.steps li:eq(' + (this.currentStep - 1) + ')';
			var $currentStep = this.$element.find(currentSelector);
			$currentStep.addClass('active');
			$currentStep.find('span.badge').addClass('badge-info');

			// set display of target element
			var target = $currentStep.data().target;
			this.$element.next('.step-content').find('.step-pane').removeClass('active');
			$(target).addClass('active');

			// reset the wizard position to the left
			this.$element.find('.steps').first().attr('style','margin-left: 0');

			// check if the steps are wider than the container div
			var totalWidth = 0;
			this.$element.find('.steps > li').each(function () {
				totalWidth += $(this).outerWidth();
			});
			var containerWidth = 0;
			if (this.$element.find('.actions').length) {
				containerWidth = this.$element.width() - this.$element.find('.actions').first().outerWidth();
			} else {
				containerWidth = this.$element.width();
			}
			if (totalWidth > containerWidth) {
			
				// set the position so that the last step is on the right
				var newMargin = totalWidth - containerWidth;
				this.$element.find('.steps').first().attr('style','margin-left: -' + newMargin + 'px');
				
				// set the position so that the active step is in a good
				// position if it has been moved out of view
				if (this.$element.find('li.active').first().position().left < 200) {
					newMargin += this.$element.find('li.active').first().position().left - 200;
					if (newMargin < 1) {
						this.$element.find('.steps').first().attr('style','margin-left: 0');
					} else {
						this.$element.find('.steps').first().attr('style','margin-left: -' + newMargin + 'px');
					}
				}
			}

			this.$element.trigger('changed');
		},

		stepclicked: function (e) {
			var li          = $(e.currentTarget);
			var index       = this.$element.find('.steps li').index(li);
			var canMovePrev = true;

			if( this.options.disablePreviousStep ) {
				if( index < this.currentStep ) {
					canMovePrev = false;
				}
			}

			if( canMovePrev ) {
				var evt = $.Event('stepclick');
				this.$element.trigger(evt, {step: index + 1});
				if (evt.isDefaultPrevented()) return;

				this.currentStep = (index + 1);
				this.setState();
			}
		},

		previous: function () {
			var canMovePrev = (this.currentStep > 1);
			if( this.options.disablePreviousStep ) {
				canMovePrev = false;
			}
			if (canMovePrev) {
				var e = $.Event('change');
				this.$element.trigger(e, {step: this.currentStep, direction: 'previous'});
				if (e.isDefaultPrevented()) return;

				this.currentStep -= 1;
				this.setState();
			}
		},

		next: function () {
			var canMoveNext = (this.currentStep + 1 <= this.numSteps);
			var lastStep = (this.currentStep === this.numSteps);

			if (canMoveNext) {
				var e = $.Event('change');
				this.$element.trigger(e, {step: this.currentStep, direction: 'next'});

				if (e.isDefaultPrevented()) return;

				this.currentStep += 1;
				this.setState();
			}
			else if (lastStep) {
				this.$element.trigger('finished');
			}
		},

		selectedItem: function (selectedItem) {
			var retVal, step;

			if(selectedItem) {

				step = selectedItem.step || -1;

				if(step >= 1 && step <= this.numSteps) {
					this.currentStep = step;
					this.setState();
				}

				retVal = this;
			}
			else {
				retVal = { step: this.currentStep };
			}

			return retVal;
		}
	};


	// WIZARD PLUGIN DEFINITION

	$.fn.wizard = function (option) {
		var args = Array.prototype.slice.call( arguments, 1 );
		var methodReturn;

		var $set = this.each(function () {
			var $this   = $( this );
			var data    = $this.data( 'wizard' );
			var options = typeof option === 'object' && option;

			if( !data ) $this.data('wizard', (data = new Wizard( this, options ) ) );
			if( typeof option === 'string' ) methodReturn = data[ option ].apply( data, args );
		});

		return ( methodReturn === undefined ) ? $set : methodReturn;
	};

	$.fn.wizard.defaults = {
        selectedItem: {step:1}
	};

	$.fn.wizard.Constructor = Wizard;

	$.fn.wizard.noConflict = function () {
		$.fn.wizard = old;
		return this;
	};


	// WIZARD DATA-API

	$(function () {
		$('body').on('mouseover.wizard.data-api', '.wizard', function () {
			var $this = $(this);
			if ($this.data('wizard')) return;
			$this.wizard($this.data());
		});
	});
});
/*
 * Fuel UX
 * https://github.com/ExactTarget/fuelux
 *
 * Copyright (c) 2012 ExactTarget
 * Licensed under the MIT license.
 */

define('fuelux/all',['require','jquery','bootstrap/bootstrap-affix','bootstrap/bootstrap-alert','bootstrap/bootstrap-button','bootstrap/bootstrap-carousel','bootstrap/bootstrap-collapse','bootstrap/bootstrap-dropdown','bootstrap/bootstrap-modal','bootstrap/bootstrap-popover','bootstrap/bootstrap-scrollspy','bootstrap/bootstrap-tab','bootstrap/bootstrap-tooltip','bootstrap/bootstrap-transition','bootstrap/bootstrap-typeahead','fuelux/checkbox','fuelux/combobox','fuelux/datagrid','fuelux/datepicker','fuelux/intelligent-dropdown','fuelux/pillbox','fuelux/radio','fuelux/scheduler','fuelux/search','fuelux/spinner','fuelux/select','fuelux/tree','fuelux/wizard'],function (require) {
	require('jquery');
	require('bootstrap/bootstrap-affix');
	require('bootstrap/bootstrap-alert');
	require('bootstrap/bootstrap-button');
	require('bootstrap/bootstrap-carousel');
	require('bootstrap/bootstrap-collapse');
	require('bootstrap/bootstrap-dropdown');
	require('bootstrap/bootstrap-modal');
	require('bootstrap/bootstrap-popover');
	require('bootstrap/bootstrap-scrollspy');
	require('bootstrap/bootstrap-tab');
	require('bootstrap/bootstrap-tooltip');
	require('bootstrap/bootstrap-transition');
	require('bootstrap/bootstrap-typeahead');
	require('fuelux/checkbox');
	require('fuelux/combobox');
	require('fuelux/datagrid');
	require('fuelux/datepicker');
	require('fuelux/intelligent-dropdown');
	require('fuelux/pillbox');
	require('fuelux/radio');
    require('fuelux/scheduler');
	require('fuelux/search');
	require('fuelux/spinner');
	require('fuelux/select');
	require('fuelux/tree');
	require('fuelux/wizard');
});

/*
 * Fuel UX
 * https://github.com/ExactTarget/fuelux
 *
 * Copyright (c) 2012 ExactTarget
 * Licensed under the MIT license.
 */

define('jquery', [], function () { return jQuery; });

define('fuelux/loader', ['fuelux/all'], function () {});

require('fuelux/loader');}());