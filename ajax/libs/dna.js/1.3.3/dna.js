// dna.js v1.3.3 ~~ dnajs.org ~~ MIT
// Copyright (c) 2013-2017 individual contributors to dna.js

var dna = {
   // API:
   //    dna.clone()
   //    dna.cloneSub()
   //    dna.createTemplate()
   //    dna.rest.get()
   //    dna.getModel()
   //    dna.empty()
   //    dna.refresh()
   //    dna.refreshAll()
   //    dna.destroy()
   //    dna.getClone()
   //    dna.getClones()
   //    dna.getIndex()
   //    dna.up()
   //    dna.down()
   //    dna.bye()
   //    dna.registerInitializer()
   //    dna.clearInitializers()
   //    dna.registerContext()
   //    dna.info()
   // See: http://dnajs.org/docs/#api
   clone: function(name, data, options) {
      // Generates a copy of the template and populates the fields, attributes, and
      // classes from the supplied data.
      var defaults = {
         fade:      false,
         top:       false,
         container: null,
         empty:     false,
         clones:    1,
         html:      false,
         transform: null,
         callback:  null
         };
      var settings = $.extend(defaults, options);
      var template = dna.store.getTemplate(name);
      if (template.nested && !settings.container)
         dna.core.berserk('Container missing for nested template: ' + name);
      if (settings.empty)
         dna.empty(name);
      var list = [];
      while (settings.clones--)
         list = list.concat(data);
      var clones = $();
      function addClone(i, d) { clones = clones.add(dna.core.replicate(template, d, i, settings)); }
      $.each(list, addClone);
      dna.placeholder.setup();  //TODO: optimize
      var first = clones.first();
      first.closest('.dna-menu, .dna-panels').each(dna.panels.refresh);
      first.parents('.dna-hide').removeClass('dna-hide').addClass('dna-unhide');
      return clones;
      },
   cloneSub: function(holderClone, arrayField, data, options) {
      // Clones a sub-template to append onto an array loop.
      var name = dna.compile.subTemplateName(holderClone, arrayField);
      var selector = '.dna-contains-' + name;
      var settings = $.extend({ container: holderClone.find(selector).addBack(selector) }, options);
      dna.clone(name, data, settings);
      var array = dna.getModel(holderClone)[arrayField];
      function append(i, value) { array.push(value); }
      $.each(data instanceof Array ? data : [data], append);
      return holderClone;
      },
   createTemplate: function(name, html, holder) {
      // Generates a template from an HTML string.
      $(html).attr({ id: name }).addClass('dna-template').appendTo(holder);
      return dna.store.getTemplate(name);
      },
   rest: {
      // Makes a GET request to the url and then generates a copy of the template
      // and populates the fields, attributes, and classes from the JSON response.
      // NOTE: Experimental -- currently very limited functionality
      get: function(name, url, options) {
         function processJson(data) {
            if (!data.error)
               dna.clone(name, data, options);
            }
         return $.getJSON(url, processJson);
         }
      },
   getModel: function(elemOrName, options) {
      // Returns the underlying data of the clone.
      function getOneModel(elem) {
         return dna.getClone(elem, options).data('dnaModel');
         }
      function getAllModels(name) {
         var model = [];
         function addToModel(i, elem) { model.push(dna.getModel($(elem))); }
         dna.getClones(name).each(addToModel);
         return model;
         }
      return (elemOrName instanceof $ ? getOneModel : getAllModels)(elemOrName);
      },
   empty: function(name, options) {
      // Deletes all clones generated from the template.
      var settings = $.extend({ fade: false }, options);
      var clones = dna.store.getTemplate(name).container.find('.dna-clone');
      return settings.fade ? dna.ui.slideFadeDelete(clones) : dna.core.remove(clones);
      },
   refresh: function(clone, options) {
      // Updates an existing clone to reflect changes to the data model.
      var settings = $.extend({ html: false }, options);
      var elem = dna.getClone(clone, options);
      var data = settings.data ? settings.data : dna.getModel(elem);
      return dna.core.inject(elem, data, null, settings);
      },
   refreshAll: function(name) {
      // Updates all the clones of the specified template.
      function refresh(i, elem) { dna.refresh($(elem)); }
      return dna.getClones(name).each(refresh);
      },
   destroy: function(clone, options) {
      // Removes an existing clone from the DOM.
      var settings = $.extend({ fade: false }, options);
      clone = dna.getClone(clone, options);
      function removeArrayItem(field) {
         dna.getModel(clone.parent())[field].splice(dna.getIndex(clone), 1);
         }
      if (clone.hasClass('dna-sub-clone'))
         removeArrayItem(clone.data().dnaRules.array);
      return settings.fade ? dna.ui.slideFadeDelete(clone) : dna.core.remove(clone);
      },
   getClone: function(elem, options) {
      // Returns the clone (or sub-clone) for the specified element.
      var settings = $.extend({ main: false }, options);
      var selector = settings.main ? '.dna-clone:not(.dna-sub-clone)' : '.dna-clone';
      return elem instanceof $ ? elem.closest(selector) : $();
      },
   getClones: function(name) {
      // Returns an array of all the existing clones for the given template.
      return dna.store.getTemplate(name).container.children().filter('.dna-clone');
      },
   getIndex: function(elem, options) {
      // Returns the index of the clone.
      var clone = dna.getClone(elem, options);
      return clone.parent().children('.dna-clone').index(clone);
      },
   up: function(elemOrEventOrIndex) {
      // Smoothly moves a clone up one slot effectively swapping its position with the previous
      // clone.
      return dna.ui.smoothMove(dna.getClone(dna.ui.toElem(elemOrEventOrIndex, this)), true);
      },
   down: function(elemOrEventOrIndex) {
      // Smoothly moves a clone down one slot effectively swapping its position with the next
      // clone.
      return dna.ui.smoothMove(dna.getClone(dna.ui.toElem(elemOrEventOrIndex, this)), false);
      },
   bye: function(elemOrEventOrIndex) {
      // Performs a sliding fade out effect on the clone and then removes the element.
      return dna.destroy(dna.ui.toElem(elemOrEventOrIndex, this), { fade: true });
      },
   registerInitializer: function(func, options) {
      // Adds a callback function to the list of initializers that are run on all DOM elements.
      var settings = $.extend({ onDocumentLoad: true }, options);
      if (settings.onDocumentLoad)
         dna.util.apply(func, [settings.selector ? $(settings.selector).not(
            '.dna-template ' + settings.selector).addClass('dna-initialized') :
            $(window.document)].concat(settings.params));
      return dna.events.initializers.push(
         { func: func, selector: settings.selector, params: settings.params });
      },
   clearInitializers: function() {
      // Deletes all initializers.
      dna.events.initializers = [];
      },
   registerContext: function(contextName, contextObjectOrFunction) {
      // Registers an application object or individual function to enable it to be used for event
      // callbacks.  Registration is needed when global namespace is not available to dna.js, such
      // as when using webpack to load dna.js as a module.
      dna.events.context[contextName] = contextObjectOrFunction;
      return dna.events.context;
      },
   info: function() {
      // Returns status information about templates on the current web page.
      var names = Object.keys(dna.store.templates);
      function addToSum(sum, name) { return sum + dna.store.templates[name].clones; }
      return {
         version:      '1.3.3',
         templates:    names.length,
         clones:       names.reduce(addToSum, 0),
         names:        names,
         store:        dna.store.templates,
         initializers: dna.events.initializers
         };
      }
   };

dna.array = {
   find: function(array, value, key) {
      // Returns the first array element with a key equal to the supplied value.  The default key
      // is "code".
      // Example:
      //    var array = [{ code: 'a', word: 'Ant' }, { code: 'b', word: 'Bat' }];
      //    dna.array.find(array, 'b').word === 'Bat';
      key = key || 'code';
      function found(obj) { return obj[key] === value; }
      var objs = array.filter(found);
      return objs.length ? objs[0] : null;
      },
   fromMap: function(map, key) {
      // Converts an object (hash map) into an array of objects.  The default key is "code".
      //    var map = { a: { word: 'Ant' }, b: { word: 'Bat' } };
      //    var array = dna.array.fromMap(map, 'code');
      //       ==> [{ code: 'a', word: 'Ant' }, { code: 'b', word: 'Bat' }]
      key = key || 'code';
      var array = [];
      function toObj(item) { return item instanceof Object ? item : { value: item }; }
      for (var property in map)
         array[array.push(toObj(map[property])) - 1][key] = property;
      return array;
      },
   last: function(array) {
      // Returns the last element of the array (or undefined if not possible).
      // Example:
      //    dna.array.last([3, 21, 7]) === 7;
      return array && array.length ? array[array.length - 1] : undefined;
      },
   toMap: function(array, key) {
      // Converts an array of objects into an object (hash map).  The default key is "code".
      //    var array = [{ code: 'a', word: 'Ant' }, { code: 'b', word: 'Bat' }];
      //    var map = dna.array.toMap(array, 'code');
      //       ==> { a: { word: 'Ant' }, b: { word: 'Bat' } }
      key = key || 'code';
      var map = {};
      function addObj(obj) { map[obj[key]] = obj; }
      array.forEach(addObj);
      return map;
      }
   };

dna.browser = {
   getUrlParams: function() {
      // Returns the query parameters as an object literal.
      // Example:
      //    http://example.com?lang=jp&code=7 ==> { lang: 'jp', code: 7 }
      var params = {};
      function addParam(pair) { if (pair) params[pair.split('=')[0]] = pair.split('=')[1]; }
      window.location.search.slice(1).split('&').forEach(addParam);
      return params;
      },
   iOS: function() {
      // Returns a boolean indicating if the browser is running on an iOS device.
      return /iPad|iPhone|iPod/.test(window.navigator.userAgent) &&
         /Apple/.test(window.navigator.vendor);
      }
   };
dna.browser.getParams = dna.browser.getUrlParams;  //DEPRECATED

dna.pageToken = {
   // A simple key/value store specific to the page (URL path) that is cleared out when the
   // user's browser session ends.
   put: function(key, value) {
      // Example:
      //   dna.pageToken.put('favorite', 7);  //saves 7
      window.sessionStorage[key + window.location.pathname] = JSON.stringify(value);
      return value;
      },
   get: function(key, defaultValue) {
      // Example:
      //   dna.pageToken.get('favorite', 0);  //returns 0 if not set
      var value = window.sessionStorage[key + window.location.pathname];
      return value === undefined ? defaultValue : JSON.parse(value);
      }
   };

dna.ui = {
   deleteElem: function(elemOrEventOrIndex) {
      // A flexible function for removing a jQuery element.
      // Example:
      //    $('.box').fadeOut(dna.ui.deleteElem);
      var elem = dna.ui.toElem(elemOrEventOrIndex, this);
      dna.core.remove(elem);
      return elem;
      },
   focus: function(elem) {
      // Sets focus on an element.
      return elem.focus();
      },
   getComponent: function(elem) {
      // Returns the component (container element with a <code>data-component</code> attribute) to
      // which the element belongs.
      return elem.closest('[data-component]');
      },
   slideFade: function(elem, callback, show) {
      // Smooth slide plus fade effect.
      var obscure = { opacity: 0.0, transition: 'opacity 0s ease 0s' };
      var easyIn =  { opacity: 1.0, transition: 'opacity 0.4s ease-in' };
      var easyOut = { opacity: 0.0, transition: 'opacity 0.4s ease-out' };
      var reset =   { transition: 'opacity 0s ease 0s' };
      function clearOpacityTransition() { elem.css(reset); }
      window.setTimeout(clearOpacityTransition, 1000);  //keep clean for other animations
      if (show)
         elem.css(obscure).hide().slideDown({ complete: callback }).css(easyIn);
      else
         elem.css(easyOut).slideUp({ complete: callback });
      return elem;
      },
   slideFadeIn: function(elem, callback) {
      // Smooth slide plus fade effect.
      return dna.ui.slideFade(elem, callback, true);
      },
   slideFadeOut: function(elem, callback) {
      // Smooth slide plus fade effect.
      return dna.ui.slideFade(elem, callback, false);
      },
   slideFadeToggle: function(elem, callback) {
      // Smooth slide plus fade effect.
      return dna.ui.slideFade(elem, callback, elem.is(':hidden'));
      },
   slideFadeDelete: function(elem) {
      // Smooth slide plus fade effect.
      return dna.ui.slideFadeOut(elem, dna.ui.deleteElem);
      },
   slidingFlasher: function(elem, callback) {
      // Uses a smooth slide down plus fade in effect on an element if it is hidden or a smooth
      // fade in flash if the element is already visible -- intended to display an error message.
      return elem.is(':hidden') ? dna.ui.slideFadeIn(elem, callback) : elem.hide().fadeIn();
      },
   smoothHeightSetBaseline: function(container) {
      // See: smoothHeightAnimate below
      dna.ui.$container = container = container || $('body');
      var height = container.outerHeight();
      return container.css({ minHeight: height, maxHeight: height, overflow: 'hidden' });
      },
   smoothHeightAnimate: function(delay, container) {
      // Smoothly animates the height of a container element from a beginning height to a final
      // height.
      container = container || dna.ui.$container;
      window.console.log([delay, container]);
      function animate() {
         container.css({ minHeight: 0, maxHeight: '100vh' });
         function turnOffTransition() { container.css({ transition: 'none', maxHeight: 'none' }); }
         window.setTimeout(turnOffTransition, 1000);  //allow 1s transition to finish
         }
      window.setTimeout(animate, delay || 50);  //allow container time to draw
      function setAnimationLength() { container.css({ transition: 'all 1s' }); }
      window.setTimeout(setAnimationLength, 10);  //allow baseline to lock in height
      return container;
      },
   smoothMove: function(elem, up) {
      // Uses animation to smoothly slide an element up or down one slot amongst its siblings.
      function move() {
         var ghostElem = submissiveElem.clone();
         if (up)
            elem.after(submissiveElem.hide()).before(ghostElem);
         else
            elem.before(submissiveElem.hide()).after(ghostElem);
         dna.ui.slideFadeIn(submissiveElem);
         dna.ui.slideFadeDelete(ghostElem);
         }
      var submissiveElem = up ? elem.prev() : elem.next();
      if (submissiveElem.length)
         move();
      return elem;
      },
   toElem: function(elemOrEventOrIndex, that) {
      // A flexible way to get the jQuery element whether it is passed in directly, the target of
      // an event, or comes from the jQuery context.
      return elemOrEventOrIndex instanceof $ ? elemOrEventOrIndex :
         $(elemOrEventOrIndex ? elemOrEventOrIndex.target : that);
      }
   };

dna.util = {
   apply: function(fn, params) {
      // Calls fn (string name or actual function) passing in params.
      // Usage:
      //    dna.util.apply('app.cart.buy', 7); ==> app.cart.buy(7);
      var args = params === undefined ? [] : [].concat(params);
      var elem = args[0];
      var result;
      function contextApply(context, names) {
         if (!context || (names.length === 1 && typeof context[names[0]] !== 'function'))
            dna.core.berserk('Callback function not found: ' + fn);
         else if (names.length === 1)
            result = context[names[0]].apply(elem, args);  //'app.cart.buy' ==> window['app']['cart']['buy']
         else
            contextApply(context[names[0]], names.slice(1));
         }
      function findFn(names) {
         if (elem instanceof $)
            args.push(dna.ui.getComponent(elem));
         contextApply(dna.events.context[names[0]] ? dna.events.context : window, names);
         }
      if (elem instanceof $ && elem.length === 0)  //noop for emply list of elems
         result = elem;
      else if (typeof fn === 'function')  //run regular function with supplied arguments
         result = fn.apply(elem, args);
      else if (elem && elem[fn])  //run element's jQuery function
         result = elem[fn](args[1], args[2], args[3]);
      else if (fn === '' || { number: true, boolean: true}[typeof fn])
         dna.core.berserk('Invalid callback function: ' + fn);
      else if (typeof fn === 'string' && fn.length > 0)
         findFn(fn.split('.'));
      return result;
      },
   printf: function(format) {
      // Builds a formatted string by replacing the format specifiers with the supplied arguments.
      // Usage:
      //    dna.util.printf('%s: %s', 'Lives', 3) === 'Lives: 3';
      var values = Array.prototype.slice.call(arguments, 1);
      function insert(str, val) { return str.replace(/%s/, val); }
      return values.reduce(insert, format);
      },
   realTruth: function(value) {
      // Returns the "real" boolean truth of a value.
      // Examples:
      //    true values  ==> true,  7, '7', [5], 't', 'T', 'TRue',  {},   'Colbert'
      //    false values ==> false, 0, '0', [],  'f', 'F', 'faLSE', null, undefined, NaN
      function falseyStr() { return /^(f|false|0)$/i.test(value); }
      function emptyArray() { return value instanceof Array && value.length === 0; }
      return value ? !emptyArray() && !falseyStr() : false;
      },
   toCamel: function(kebabStr) {
      // Converts a kebab-case string (a code made of lowercase letters and dashes) to camelCase.
      // Example:
      //    dna.util.toCamel('ready-set-go') === 'readySetGo'
      function hump(match, char) { return char.toUpperCase(); }
      return ('' + kebabStr).replace(/\-(.)/g, hump);
      },
   toKebab: function(camelStr) {
      // Converts a camelCase string to kebab-case (a code made of lowercase letters and dashes).
      // Example:
      //    dna.util.toKebab('readySetGo') === 'ready-set-go'
      function dash(word) { return '-' + word.toLowerCase(); }
      return ('' + camelStr).replace(/([A-Z]+)/g, dash).replace(/\s|^-/g, '');
      },
   value: function(data, field) {
      // Returns the value of the field from the data object.
      // Example:
      //    dna.util.value({ a: { b: 7 }}, 'a.b') === 7
      if (typeof field === 'string')
         field = field.split('.');
      return (data === null || data === undefined || field === undefined) ? null :
         (field.length === 1 ? data[field[0]] : this.value(data[field[0]], field.slice(1)));
      }
   };

dna.placeholder = {  //TODO: optimize
   // A template placeholder is only shown when its corresponding template is empty (has zero
   // clones).  The "data-placeholder" attribute specifies the name of the template.
   setup: function() {
      $('option.dna-template').closest('select').addClass('dna-hide');
      function fade(i, elem) {
         var input = $(elem).stop();
         return dna.getClones(input.data().placeholder).length ? input.fadeOut() : input.fadeIn();
         }
      $('[data-placeholder]').each(fade);
      }
   };

dna.panels = {
   // Each click of a menu item displays its corresponding panel and optionally passes the panel
   // element and hash to the function specified by the "data-callback" attribute.
   // Usage:
   //    <nav id={ID} class=dna-menu data-callback=app.displayPanel>
   //       <button>See X1</button>
   //       <button>See X2</button>
   //    </nav>
   //    <div id={ID}-panels class=dna-panels>
   //       <section data-hash=x1>The X1</section>
   //       <section data-hash=x2>The X2</section>
   //    </div>
   // The optional "data-hash" attribute specifies the hash (URL fragment ID) and updates the
   // location bar.
   display: function(menu, loc, updateUrl) {
      // Shows the panel at the given index (loc)
      var panels, panel;
      var key = menu.data().dnaKey;
      var menuItems = menu.find('.menu-item');
      if (loc === undefined)
         loc = dna.pageToken.get(key, 0);
      loc = Math.max(0, Math.min(loc, menuItems.length - 1));
      menu[0].selectedIndex = loc;  //case where menu is a drop-down elem (<select>)
      menuItems.removeClass('selected').addClass('unselected')
         .eq(loc).addClass('selected').removeClass('unselected');
      panels = $(key).children().hide().removeClass('displayed').addClass('hidden');
      panel = panels.eq(loc).fadeIn().addClass('displayed').removeClass('hidden');
      var hash = panel.data().hash;
      dna.pageToken.put(key, loc);
      if (updateUrl && hash)
         window.history.pushState(null, null, '#' + hash);
      dna.util.apply(menu.data().callback, [panel, hash]);
      },
   clickRotate: function(event) {
      // Moves to the selected panel
      var item = $(event.target).closest('.menu-item');
      var menu = item.closest('.dna-menu');
      dna.panels.display(menu, menu.find('.menu-item').index(item), true);
      },
   selectRotate: function(event) {
      // Moves to the selected panel
      var menu = $(event.target);
      dna.panels.display(menu, menu.find('option:selected').index(), true);
      },
   reload: function(name) {
      // Refreshes the currently displayed panel
      dna.panels.display($('#' + name));
      },
   refresh: function(i, elem) {
      var menu = $(elem);
      if (menu.hasClass('dna-panels'))  //special case for panels that are templates
         menu = $('#' + menu.attr('id').replace('-panels', ''));
      var hash = window.location.hash.slice(1);
      var key = menu.data().dnaKey = '#' + menu.attr('id') + '-panels';
      var panels = $(key).children().addClass('panel');
      if (menu.find('.menu-item').length === 0)  //set .menu-item elems if not set in the html
         menu.children().addClass('menu-item');
      function partOfTemplate(elems) { return elems.first().closest('.dna-template').length > 0; }
      function findPanelLoc(panels) {
         return hash && panels.first().data().hash ?
            panels.filter('[data-hash=' + hash + ']').index() : dna.pageToken.get(key, 0);
         }
      if (!partOfTemplate(panels) && !partOfTemplate(menu.children()))
         dna.panels.display(menu, findPanelLoc(panels));
      },
   setup: function() {
      $('.dna-menu').each(dna.panels.refresh);
      $(window.document).on({ click:  dna.panels.clickRotate },  '.dna-menu .menu-item');
      $(window.document).on({ change: dna.panels.selectRotate }, '.dna-menu');
      }
   };

dna.compile = {
   // Pre-compile  Example                           Post-compile class + data().dnaRules
   // -----------  --------------------------------  ------------------------------------
   // template     <p id=x1 class=dna-template>      class=dna-clone
   // array        <p data-array=~~tags~~>           class=dna-nucleotide + array='tags'
   // field        <p>~~tag~~</p>                    class=dna-nucleotide + text='tag'
   // attribute    <p id=~~num~~>                    class=dna-nucleotide + attrs=['id', ['', 'num', '']]
   // rule         <p data-truthy=~~on~~>            class=dna-nucleotide + truthy='on'
   // attr rule    <p data-attr-src=~~url~~>         class=dna-nucleotide + attrs=['src', ['', 'url', '']]
   // prop rule    <input data-prop-checked=~~on~~>  class=dna-nucleotide + props=['checked', 'on']
   // select rule  <select data-option=~~day~~>      class=dna-nucleotide + option='day'
   // transform    <p data-transform=app.enhance>    class=dna-nucleotide + transform='app.enhance'
   // callback     <p data-callback=app.configure>   class=dna-nucleotide + callback='app.configure'
   //
   // Rules                                      data().dnaRules
   // -----------------------------------------  ---------------
   // data-class=~~field,name-true,name-false~~  class=['field','name-true','name-false']
   // data-attr-{NAME}=pre~~field~~post          attrs=['{NAME}', ['pre', 'field', 'post']]
   // data-prop-{NAME}=pre~~field~~post          props=['{NAME}', 'field']
   // data-option=~~field~~                      option='field'
   // data-require=~~field~~                     require='field'
   // data-missing=~~field~~                     missing='field'
   // data-truthy=~~field~~                      truthy='field'
   // data-falsey=~~field~~                      falsey='field'
   // data-transform=func                        transform='func'
   // data-callback=func                         callback='func'
   //
   regexDnaField: /^[\s]*(~~|\{\{).*(~~|\}\})[\s]*$/,  //example: ~~title~~
   regexDnaBasePair: /~~|{{|}}/,  //matches the '~~' string
   regexDnaBasePairs: /~~|\{\{|\}\}/g,  //matches the two '~~' strings so they can be removed
   setupNucleotide: function(elem) {
      if (elem.data().dnaRules === undefined)
         elem.data().dnaRules = {};
      return elem.addClass('dna-nucleotide');
      },
   isDnaField: function(i, elem) {
      var firstNode = elem.childNodes[0];
      return firstNode && firstNode.nodeValue &&
         firstNode.nodeValue.match(dna.compile.regexDnaField);
      },
   field: function(i, elem) {
      // Example:
      //    <p>~~name~~</p>  ==>  <p class=dna-nucleotide data-dnaRules={ text: 'name' }></p>
      elem = dna.compile.setupNucleotide($(elem));
      elem.data().dnaRules.text = $.trim(elem.text()).replace(dna.compile.regexDnaBasePairs, '');
      return elem.empty();
      },
   propsAndAttrs: function(i, elem) {
      // Examples:
      //    <option data-prop-selected=~~set~~>  ==>  <option class=dna-nucleotide + data-dnaRules={ props: ['selected', 'set'] }>
      //    <p id=~~num~~>                       ==>  <p class=dna-nucleotide + data-dnaRules={ attrs: ['id', ['', 'num', '']] }>
      //    <p data-attr-src=~~url~~>            ==>  <p class=dna-nucleotide + data-dnaRules={ attrs: ['src', ['', 'url', '']] }>
      //    <p data-tag=~~[value]~~>             ==>  <p class=dna-nucleotide + data-dnaRules={ attrs: ['data-tag', ['', true, '']] }>
      elem = $(elem);
      var props = [];
      var attrs = [];
      var names = [];
      function compileProp(key, value) {
         names.push(key);
         key = key.replace(/^data-prop-/, '').toLowerCase();
         value = value.replace(dna.compile.regexDnaBasePairs, '');
         props.push(key, value);
         if (key === 'checked' && elem.is('input'))
            elem.addClass('dna-update-model').data().dnaField = value;
         else if (key === 'selected' && elem.is('option'))
            elem.parent().addClass('dna-update-model').end().data().dnaField = value;
         }
      function compileAttr(key, value) {
         var parts = value.split(dna.compile.regexDnaBasePair);
         if (parts[1] === '[value]')
            parts[1] = true;
         attrs.push(key.replace(/^data-attr-/, ''), parts);
         names.push(key);
         var textInput = 'input:not(:checkbox, :radio)';
         if (key === 'value' && elem.is(textInput) && parts[0] === '' && parts[2] === '')
            elem.addClass('dna-update-model').data().dnaField = parts[1];
         }
      function compile(i, attr) {
         if (/^data-prop-/.test(attr.name))
            compileProp(attr.name, attr.value);
         else if (attr.value.split(dna.compile.regexDnaBasePair).length === 3)
            compileAttr(attr.name, attr.value);
         }
      $.each(elem.get(0).attributes, compile);
      if (props.length > 0)
         dna.compile.setupNucleotide(elem).data().dnaRules.props = props;
      if (attrs.length > 0)
         dna.compile.setupNucleotide(elem).data().dnaRules.attrs = attrs;
      if (elem.data().transform)  //TODO: Determine if it's better to process only at top-level of clone
         dna.compile.setupNucleotide(elem).data().dnaRules.transform = elem.data().transform;  //TODO: string to fn
      if (elem.data().callback)
         dna.compile.setupNucleotide(elem).data().dnaRules.callback = elem.data().callback;
      return elem.removeAttr(names.join(' '));
      },
   getDataField: function(elem, type) {
      // Example:
      //    <p data-array=~~tags~~>, 'array'  ==>  'tags'
      return $.trim(elem.data(type).replace(dna.compile.regexDnaBasePairs, ''));
      },
   subTemplateName: function(holder, arrayField) {  //holder can be element or template name
      // Example:
      //    subTemplateName('book', 'authors') ==> 'book-authors-instance'
      var mainTemplateName = holder instanceof $ ?
         dna.getClone(holder).data().dnaRules.template : holder;
      return mainTemplateName + '-' + arrayField + '-instance';
      },
   rules: function(elems, type, isList) {
      // Example:
      //    <p data-require=~~title~~>, 'require'  ==>  <p data-dnaRules={ require: 'title' }>
      function add(i, elem) {
         elem = dna.compile.setupNucleotide($(elem));
         var field = dna.compile.getDataField(elem, type);
         elem.data().dnaRules[type] = isList ? field.split(',') : field;
         }
      return elems.filter('[data-' + type + ']').each(add).removeAttr('data-' + type);
      },
   separators: function(elem) {
      // Convert: data-separator=", "  ==>  <span class=dna-separator>, </span>
      function isWhitespaceNode(i, elem) { return elem.nodeType === 3 && !/\S/.test(elem.nodeValue); }
      function append(templateElem, text, className) {
         if (text) {
            templateElem.contents().last().filter(isWhitespaceNode).remove();
            templateElem.append($('<span>').addClass(className).html(text));
            }
         }
      function processTemplate(i, elem) {
         var templateElem = $(elem);
         append(templateElem, templateElem.data().separator,     'dna-separator');
         append(templateElem, templateElem.data().lastSeparator, 'dna-last-separator');
         }
      elem.find('.dna-template, .dna-sub-clone').addBack().each(processTemplate);
      },
   template: function(name) {  //prepare and stash template so it can be cloned
      var elem = $('#' + name);
      if (!elem.length)
         dna.core.berserk('Template not found: ' + name);
      function saveName(i, elem) { $(elem).data().dnaRules = { template: $(elem).attr('id') }; }
      elem.find('.dna-template').addBack().each(saveName).removeAttr('id');
      var elems = elem.find('*').addBack();
      elems.filter(dna.compile.isDnaField).each(dna.compile.field);
      dna.compile.rules(elems, 'array').addClass('dna-sub-clone');
      dna.compile.rules(elems, 'class', true);
      dna.compile.rules(elems, 'require');
      dna.compile.rules(elems, 'missing');
      dna.compile.rules(elems, 'truthy');
      dna.compile.rules(elems, 'falsey');
      dna.compile.rules(elems.filter('select'), 'option').addClass('dna-update-model');
      elems.each(dna.compile.propsAndAttrs);
      dna.compile.separators(elem);
      //support html5 values for "type" attribute
      function setTypeAttr(i, elem) { $(elem).attr({ type: $(elem).data().attrType }); }
      $('input[data-attr-type]').each(setTypeAttr);
      return dna.store.stash(elem);
      }
   };

dna.store = {
   // Handles storage and retrieval of templates
   templates: {},
   stash: function(elem) {
      var name = elem.data().dnaRules.template;
      function move(i, elem) {
         elem = $(elem);
         var name = elem.data().dnaRules.template;
         var template = {
            name:       name,
            elem:       elem,
            container:  elem.parent().addClass('dna-container').addClass('dna-contains-' + name),
            nested:     elem.parent().closest('.dna-clone').length !== 0,
            separators: elem.find('.dna-separator, .dna-last-separator').length,
            index:      elem.index(),
            elemsAbove: elem.index() > 0,
            elemsBelow: elem.nextAll().length > 0,
            clones:     0
            };
         dna.store.templates[name] = template;
         elem.removeClass('dna-template').addClass('dna-clone').addClass(name).detach();
         }
      function prepLoop(i, elem) {
         // Pre (sub-template array loops -- data-array):
         //    class=dna-sub-clone data().dnaRules.array='field'
         // Post (elem):
         //    data().dnaRules.template='{NAME}-{FIELD}-instance'
         // Post (container)
         //    class=dna-nucleotide +
         //       data().dnaRules.loop={ name: '{NAME}-{FIELD}-instance', field: 'field' }
         elem = $(elem);
         var field = elem.data().dnaRules.array;
         var sub = dna.compile.subTemplateName(name, field);
         dna.compile.setupNucleotide(elem.parent().addClass('dna-array')).data().dnaRules.loop =
            { name: sub, field: field };
         elem.data().dnaRules.template = sub;
         }
      elem.find('.dna-template').addBack().each(move);
      elem.find('.dna-sub-clone').each(prepLoop).each(move);
      return dna.store.templates[name];
      },
   getTemplate: function(name) {
      return dna.store.templates[name] || dna.compile.template(name);
      }
   };

dna.events = {
   context: {},  //storage to register callbacks when dna.js is module loaded without window scope (webpack)
   initializers: [],  //example: [{ func: 'app.bar.setup', selector: '.progress-bar' }]
   elementSetup: function(root, data) {
      // Example:
      //    <p data-on-load=app.cart.setup>
      function setup(i, elem) {
         elem = $(elem);
         dna.util.apply(elem.data().onLoad, data ? [elem, data] : elem);
         }
      var selector = '[data-on-load]';
      var elems = root ? root.find(selector).addBack(selector) : $(selector);
      return elems.not('.dna-initialized').each(setup).addClass('dna-initialized');
      },
   runInitializers: function(elem, data) {
      // Executes data-on-load and data-callback functions plus registered initializers
      dna.events.elementSetup(elem, data);
      function init(i, initializer) {
         var elems = initializer.selector ?
            elem.find(initializer.selector).addBack(initializer.selector) : elem;
         dna.util.apply(initializer.func,
            [elems.addClass('dna-initialized')].concat(initializer.params));
         }
      $.each(dna.events.initializers, init);
      return elem;
      },
   setup: function() {
      function runner(elem, type, event) {
         // Finds elements for given event type and executes callback passing in the element,
         //    event, and component (container element with "data-component" attribute)
         // Types: click|change|input|key-up|key-down|key-press|enter-key
         elem = elem.closest('[data-' + type + ']');
         var fn = elem.data(type);
         if (type === 'click' && elem.prop('tagName') === 'A' && fn && fn.match(/^dna[.]/))
            event.preventDefault();
         return dna.util.apply(fn, [elem, event]);
         }
      function handle(event) {
         var target = $(event.target);
         function field(data) { return (data.dnaRules && data.dnaRules.option) || data.dnaField; }
         function updateField(elem, calc) { dna.getModel(elem)[field(elem.data())] = calc(elem); }
         function getValue(elem) { return elem.val(); }
         function isChecked(elem) { return elem.is(':checked'); }
         function updateOption(i, elem) { updateField($(elem), isChecked); }
         function updateModel() {
            var mainClone = dna.getClone(target, { main: true });
            if (mainClone.length === 0) {  //TODO: figure out why some events are captured on the template instead of the clone
               //console.log('Error -- event not on clone:', event.timeStamp, event.type, target);
               return;
               }
            if (target.is('input:checkbox'))
               updateField(target, isChecked);
            else if (target.is('input:radio'))
               $('input:radio[name=' + target.attr('name') + ']').each(updateOption);
            else if (target.is('input') || target.data().dnaRules.option)
               updateField(target, getValue);
            else if (target.is('select'))
               target.find('option').each(updateOption);
            dna.refresh(mainClone);
            }
         if (target.hasClass('dna-update-model'))
            updateModel();
         return runner(target, event.type.replace('key', 'key-'), event);
         }
      function handleEnterKey(event) {
         if (event.which === 13)
            runner($(event.target), 'enter-key', event);
         }
      function handleSmartUpdate(event) {
         var defaultThrottle = 1000;  //default 1 second delay between callbacks
         var elem = $(event.target);
         var data = elem.data();
         function smartUpdate() {
            function doCallback() {
               data.dnaLastUpdated = Date.now();
               data.dnaTimeoutId = undefined;
               runner(elem, 'smart-update', event);
               }
            function handleChange() {
               var throttle = data.smartThrottle ? +data.smartThrottle : defaultThrottle;
               data.dnaLastValue = elem.val();
               if (!data.dnaTimeoutId)
                  if (Date.now() < data.dnaLastUpdated + throttle)
                     data.dnaTimeoutId = window.setTimeout(doCallback, throttle);
                  else
                     doCallback();
               }
            if (event.type === 'keydown' && data.dnaLastValue === undefined)
               data.dnaLastValue = elem.val();
            if (event.type !== 'keydown' && elem.val() !== data.dnaLastValue)
               handleChange();
            }
         if (data.smartUpdate)
            smartUpdate();
         }
      function jumpToUrl(event) {
         // Usage:
         //    <button data-href=http://dnajs.org>dna.js</button>
         // If element (or parent) has the class "external-site", page will be opened in a new tab.
         var elem = $(event.target);
         var newTab = !dna.browser.iOS() && elem.closest('.external-site').length;
         window.open(elem.closest('[data-href]').data().href, newTab ? '_blank' : '_self');
         }
      $(window.document)
         .click(handle)
         .change(handle)
         .keyup(handle)
         .keyup(handleEnterKey)
         .keydown(handle)
         .keypress(handle)
         .keydown(handleSmartUpdate)
         .keyup(handleSmartUpdate)
         .change(handleSmartUpdate)  //TODO: handle paste events on iOS
         .on({ input: handle })
         .on({ click: jumpToUrl }, '[data-href]');
      dna.events.elementSetup();
      }
   };

dna.core = {
   inject: function(clone, data, index, settings) {
      // Inserts data into clone and runs rules
      function injectField(elem, field) {
         var value = field === '[count]' ? index + 1 : field === '[value]' ? data :
            dna.util.value(data, field);
         var printable = { string: true, number: true, boolean: true };
         if (printable[typeof value])
            elem = settings.html ? elem.html(value) : elem.text(value);
         }
      function injectProps(elem, props) {  //example props: ['selected', 'set']
         for (var prop = 0; prop < props.length/2; prop++)  //each prop has a key and a field name
            elem.prop(props[prop*2], dna.util.realTruth(dna.util.value(data, props[prop*2 + 1])));
         }
      function injectAttrs(elem, attrs) {  //example attrs: ['data-tag', ['', 'tag', '']]
         for (var attr = 0; attr < attrs.length / 2; attr++) {  //each attr has a key and parts
            var key = attrs[attr*2];
            var parts = attrs[attr*2 + 1];  //example: 'J~~code.num~~' ==> ['J', 'code.num', '']
            var core = parts[1] === true ? data : dna.util.value(data, parts[1]);
            var value = [parts[0], core, parts[2]].join('');
            elem.attr(key, value);
            if (/^data-./.test(key))
               elem.data(key.substring(5), value);
            if (key === 'value' && value !== elem.val())  //set elem val for input fields (example: <input value=~~tag~~>)
               elem.val(value);
            }
         }
      function injectDropDown(elem, value) {
         if (value !== null)
            elem.val(value);
         }
      function injectClass(elem, classList) {
         // classList = ['field', 'class-true', 'class-false']
         var value = dna.util.value(data, classList[0]);
         var truth = dna.util.realTruth(value);
         if (classList.length === 1) {
            elem.addClass(value);
            }
         else if (classList.length > 1) {
            elem.toggleClass(classList[1], truth);
            if (classList[2])
               elem.toggleClass(classList[2], !truth);
            }
         }
      function processLoop(elem, loop) {
         var dataArray = dna.util.value(data, loop.field);
         var subClones = elem.children('.' + loop.name.replace(/[.]/g, '\\.'));
         function injectSubClone(i, elem) { dna.core.inject($(elem), dataArray[i], i, settings); }
         function rebuildSubClones() {
            subClones.remove();
            dna.clone(loop.name, dataArray, { container: elem, html: settings.html });
            }
         if (!dataArray)
            data[loop.field] = [];
         else if (dataArray.length === subClones.length)
            subClones.each(injectSubClone);
         else
            rebuildSubClones();
         }
      function process(i, elem) {
         elem = $(elem);
         var dnaRules = elem.data().dnaRules;
         if (dnaRules.transform)  //alternate version of the "transform" option
            dna.util.apply(dnaRules.transform, data);
         if (dnaRules.text)
            injectField(elem, dnaRules.text);
         if (dnaRules.props)
            injectProps(elem, dnaRules.props);
         if (dnaRules.attrs)
            injectAttrs(elem, dnaRules.attrs);
         if (dnaRules.class)
            injectClass(elem, dnaRules.class);
         if (dnaRules.require)
            elem.toggle(dna.util.value(data, dnaRules.require) !== undefined);
         if (dnaRules.missing)
            elem.toggle(dna.util.value(data, dnaRules.missing) === undefined);
         if (dnaRules.truthy)
            elem.toggle(dna.util.realTruth(dna.util.value(data, dnaRules.truthy)));
         if (dnaRules.falsey)
            elem.toggle(!dna.util.realTruth(dna.util.value(data, dnaRules.falsey)));
         if (dnaRules.loop)
            processLoop(elem, dnaRules.loop);
         if (dnaRules.option)
            injectDropDown(elem, dna.util.value(data, dnaRules.option));
         if (dnaRules.callback)
            dna.util.apply(dnaRules.callback, elem);
         }
      function dig(elems) {
         elems.filter('.dna-nucleotide').each(process);
         if (elems.length)
            dig(elems.children().not('.dna-sub-clone'));
         }
      if (settings.transform)  //alternate version of data-transform
         settings.transform(data);
      dig(clone);
      clone.data().dnaModel = data;
      return clone;
      },
   replicate: function(template, data, index, settings) {  //make and setup the clone
      function displaySeparators() {
         var clones = container.children('.' + template.name);
         clones.find('.dna-separator').show().end().last().find('.dna-separator').hide();
         clones.find('.dna-last-separator').hide().end().eq(-2).find('.dna-last-separator').show()
            .closest('.dna-clone').find('.dna-separator').hide();
         }
      var clone = template.elem.clone(true, true);
      template.clones++;
      dna.core.inject(clone, data, index, settings);
      var selector =  '.dna-contains-' + template.name.replace(/[.]/g, '\\.');
      var container = settings.container ?
         settings.container.find(selector).addBack(selector) : template.container;
      if (settings.top && !template.elemsAbove)
         container.prepend(clone);
      else if (!settings.top && !template.elemsBelow)
         container.append(clone);
      else if (settings.top)
         container.children().eq(template.index - 1).after(clone);
      else
         container.children().eq(template.index +
            container.children().filter('.dna-clone').length).before(clone);
      if (template.separators)
         displaySeparators();
      dna.events.runInitializers(clone, data);
      if (settings.callback)
         settings.callback(clone, data);
      if (settings.fade)
         dna.ui.slideFadeIn(clone);
      return clone;
      },
   remove: function(clone) {  //TODO: optimize
      clone.remove();
      dna.placeholder.setup();
      return clone;
      },
   berserk: function(message) {  //oops, file a tps report
      throw new Error('dna.js -> ' + message);
      },
   plugin: function() {
      // Example:
      //    dna.getClone(elem).dna('up');
      // Supported actions:
      //    'bye', 'clone-sub', 'destroy', 'down', 'refresh', 'up'
      $.fn.dna = function(action) {  //any additional parameters are passed to the api call
         var params = [arguments[1], arguments[2], arguments[3]];
         var dnaApi = dna[dna.util.toCamel(action)];
         if (!dnaApi)
            dna.core.berserk('Unknown plugin action: ' + action);
         function callApi(i, elem) { dnaApi($(elem), params[0], params[1], params[2]); }
         return this.each(callApi);
         };
      },
   initModule: function(thisWindow, thisJQuery) {
      window = thisWindow;
      $ = thisJQuery;
      window.dna = dna;
      dna.core.setup();
      return dna;
      },
   setup: function() {
      dna.core.plugin();
      $(dna.placeholder.setup);
      $(dna.panels.setup);
      $(dna.events.setup);
      }
   };

if (typeof module === 'object')           //Node.js module loading system (CommonJS)
   module.exports = dna.core.initModule;  //const dna = require('dna.js')(window, jQuery);
else
   dna.core.setup();
