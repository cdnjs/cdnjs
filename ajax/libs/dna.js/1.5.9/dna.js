// dna.js ~~ MIT License

const dna = {
   version: '[VERSION]',
   // API:
   //    dna.clone()
   //    dna.cloneSub()
   //    dna.createTemplate()
   //    dna.getModel()
   //    dna.empty()
   //    dna.insert()
   //    dna.refresh()
   //    dna.refreshAll()
   //    dna.updateField()
   //    dna.recount()
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
   // See: https://dnajs.org/docs/#api
   clone: (name, data, options) => {
      // Generates a copy of the template and populates the fields, attributes, and
      // classes from the supplied data.
      const defaults = {
         fade:      false,
         top:       false,
         container: null,
         empty:     false,
         clones:    1,
         html:      false,
         transform: null,
         callback:  null
         };
      const settings = Object.assign(defaults, options);
      const template = dna.store.getTemplate(name);
      if (template.nested && !settings.container)
         dna.core.berserk('Container missing for nested template: ' + name);
      if (settings.empty)
         dna.empty(name);
      const list = [].concat(...Array(settings.clones).fill(data));
      let clones = $();
      const addClone = (data, index) =>
         clones = clones.add(dna.core.replicate(template, data, index, settings));
      list.forEach(addClone);
      dna.placeholder.setup();
      dna.panels.initialize(clones.first().closest('.dna-panels'));
      clones.first().parents('.dna-hide').removeClass('dna-hide').addClass('dna-unhide');
      return clones;
      },
   cloneSub: (holderClone, arrayField, data, options) => {
      // Clones a sub-template to append onto an array loop.
      const name = dna.compile.subTemplateName(holderClone, arrayField);
      const selector = '.dna-contains-' + name;
      const settings = { container: holderClone.find(selector).addBack(selector) };
      const clones = dna.clone(name, data, Object.assign(settings, options));
      dna.core.updateArray(clones);
      return clones;
      },
   createTemplate: (name, html, holder) => {
      // Generates a template from an HTML string.
      $(html).attr({ id: name }).addClass('dna-template').appendTo(holder);
      return dna.store.getTemplate(name);
      },
   getModel: (elemOrName, options) => {
      // Returns the underlying data of the clone.
      const getAllModels = (name) => {
         const model = [];
         const addToModel = (i, elem) => model.push(dna.getModel($(elem)));
         dna.getClones(name).each(addToModel);
         return model;
         };
      const getOneModel = (elem) => dna.getClone($(elem), options).data('dnaModel');
      return typeof elemOrName === 'string' ? getAllModels(elemOrName) : getOneModel(elemOrName);
      },
   empty: (name, options) => {
      // Deletes all clones generated from the template.
      const settings = Object.assign({ fade: false, callback: null }, options);
      const template = dna.store.getTemplate(name);
      const clones = template.container.children('.dna-clone');
      if (template.container.data().dnaCountsMap)
         template.container.data().dnaCountsMap[name] = 0;
      const fadeDelete = () => dna.ui.slideFadeDelete(clones, settings.callback);
      return settings.fade ? fadeDelete() : dna.core.remove(clones, settings.callback);
      },
   insert: (name, data, options) => {
      // Updates the first clone if it already exists otherwise creates the first clone.
      const clone = dna.getClones(name).first();
      return clone.length ? dna.refresh(clone, { data: data, html: options && options.html }) :
         dna.clone(name, data, options);
      },
   refresh: (clone, options) => {
      // Updates an existing clone to reflect changes to the data model.
      const settings = Object.assign({ html: false }, options);
      const elem = dna.getClone(clone, options);
      const data = settings.data ? settings.data : dna.getModel(elem);
      return dna.core.inject(elem, data, elem.data().dnaCount, settings);
      },
   refreshAll: (name, options) => {
      // Updates all the clones of the specified template.
      const refresh = (i, elem) => dna.refresh($(elem), options);
      return dna.getClones(name).each(refresh);
      },
   updateField: (inputElem, value) => {
      const field = inputElem.data() && inputElem.data().dnaField;
      const update = () => {
         if (inputElem.is('input:checkbox'))
            inputElem.prop('checked', value);
         else if (inputElem.is('input:radio'))
            inputElem.prop('checked', value);  //TOOD: if true, deselect other buttons in model
         else if (inputElem.is('input, select, textarea'))
            inputElem.val(value);
         dna.getModel(inputElem)[field] = value;
         };
      if (field)
         update();
      return inputElem;
      },
   recount: (clone, options) => {
      // Renumbers the counters starting from 1 for the clone and its siblings based on DOM order.
      clone = dna.getClone(clone);
      const renumber = () => {
         const name = clone.data().dnaRules.template;
         const update = (i, elem) => {
            elem = $(elem);
            elem.data().dnaCount = i + 1;
            dna.refresh(elem, options);
            };
         const container = clone.parent();
         const clones = container.children('.dna-clone.' + name).each(update);
         container.data().dnaCountsMap = container.data().dnaCountsMap || {};
         container.data().dnaCountsMap[name] = clones.length;
         };
      if (clone.length)
         renumber();
      return clone;
      },
   destroy: (clone, options) => {
      // Removes an existing clone from the DOM.
      const settings = Object.assign({ fade: false, callback: null }, options);
      clone = dna.getClone(clone, options);
      const removeArrayItem = (field) =>
         dna.getModel(clone.parent())[field].splice(dna.getIndex(clone), 1);
      if (clone.hasClass('dna-sub-clone'))
         removeArrayItem(clone.data().dnaRules.array);
      const fadeDelete = () => dna.ui.slideFadeDelete(clone, settings.callback);
      return settings.fade ? fadeDelete() : dna.core.remove(clone, settings.callback);
      },
   getClone: (elem, options) => {
      // Returns the clone (or sub-clone) for the specified element.
      const settings = Object.assign({ main: false }, options);
      const selector = settings.main ? '.dna-clone:not(.dna-sub-clone)' : '.dna-clone';
      return elem instanceof $ ? elem.closest(selector) : $();
      },
   getClones: (name) => {
      // Returns an array of all the existing clones for the given template.
      return dna.store.getTemplate(name).container.children('.dna-clone.' + name);
      },
   getIndex: (elem, options) => {
      // Returns the index of the clone.
      const clone = dna.getClone(elem, options);
      return clone.parent().children('.dna-clone.' + clone.data().dnaRules.template).index(clone);
      },
   up: function(elemOrEventOrIndex, callback) {
      // Smoothly moves a clone up one slot effectively swapping its position with the previous
      // clone.
      return dna.ui.smoothMoveUp(dna.getClone(dna.ui.toElem(elemOrEventOrIndex, this)), callback);
      },
   down: function(elemOrEventOrIndex, callback) {
      // Smoothly moves a clone down one slot effectively swapping its position with the next
      // clone.
      return dna.ui.smoothMoveDown(dna.getClone(dna.ui.toElem(elemOrEventOrIndex, this)), callback);
      },
   bye: function(elemOrEventOrIndex, callback) {
      // Performs a sliding fade out effect on the clone and then removes the element.
      const elem = dna.ui.toElem(elemOrEventOrIndex, this);
      const options = { fade: true, callback: typeof callback === 'function' ? callback : null };
      return dna.destroy(elem, options);
      },
   registerInitializer: (func, options) => {
      // Adds a callback function to the list of initializers that are run on all DOM elements.
      const settings = Object.assign({ onDocumentLoad: true }, options);
      if (settings.onDocumentLoad)
         dna.util.apply(func, [settings.selector ? $(settings.selector).not(
            '.dna-template ' + settings.selector).addClass('dna-initialized') :
            $(window.document)].concat(settings.params));
      return dna.events.initializers.push(
         { func: func, selector: settings.selector, params: settings.params });
      },
   clearInitializers: () => {
      // Deletes all initializers.
      dna.events.initializers = [];
      },
   registerContext: (contextName, contextObjOrFn) => {
      // Registers an application object or individual function to enable it to be used for event
      // callbacks.  Registration is needed when global namespace is not available to dna.js, such
      // as when using webpack to load dna.js as a module.
      dna.events.context[contextName] = contextObjOrFn;
      return dna.events.context;
      },
   info: () => {
      // Returns status information about templates on the current web page.
      const names =  Object.keys(dna.store.templates);
      const panels = $('.dna-menu.dna-panels-initialized');
      return {
         version:      dna.version,
         templates:    names.length,
         clones:       $('.dna-clone:not(.dna-sub-clone)').length,
         subs:         $('.dna-sub-clone').length,
         names:        names,
         store:        dna.store.templates,
         initializers: dna.events.initializers,
         panels:       panels.toArray().map(elem => $(elem).attr('data-nav'))
         };
      }
   };

dna.array = {
   find: (array, value, key) => {
      // Returns the index and a reference to the first array element with a key equal to the
      // supplied value.  The default key is "code".
      // Example:
      //    const array = [{ code: 'a', word: 'Ant' }, { code: 'b', word: 'Bat' }];
      //    dna.array.find(array, 'b').item.word === 'Bat';
      //    dna.array.find(array, 'b').index === 1;
      //    dna.array.find(array, 'x').item === undefined;
      key = key || 'code';
      const valid = Array.isArray(array);
      let i = 0;
      if (valid)
         while (i < array.length && array[i][key] !== value)
            i++;
      return valid && i < array.length ?
         { item: array[i],  index: i } :
         { item: undefined, index: -1 };
      },
   last: (array) => {
      // Returns the last element of the array (or undefined if not possible).
      // Example:
      //    dna.array.last([3, 21, 7]) === 7;
      return Array.isArray(array) && array.length ? array[array.length - 1] : undefined;
      },
   fromMap: (map, options) => {
      // Converts an object (hash map) into an array of objects.  The default key is "code".
      // Example:
      //    dna.array.fromMap({ a: { word: 'Ant' }, b: { word: 'Bat' } })
      // converts:
      //    { a: { word: 'Ant' }, b: { word: 'Bat' } }
      // to:
      //    [{ code: 'a', word: 'Ant' }, { code: 'b', word: 'Bat' }]
      const settings = Object.assign({ key: 'code', kebabCodes: false }, options);
      const array = [];
      const toObj = (item) => item instanceof Object ? item : { value: item };
      for (let property in map)
         array[array.push(toObj(map[property])) - 1][settings.key] =
            settings.kebabCodes ? dna.util.toKebab(property) : property;
      return array;
      },
   toMap: (array, options) => {
      // Converts an array of objects into an object (hash map).  The default key is "code".
      // Example:
      //    dna.array.toMap([{ code: 'a', word: 'Ant' }, { code: 'b', word: 'Bat' }])
      // converts:
      //    [{ code: 'a', word: 'Ant' }, { code: 'b', word: 'Bat' }]
      // to:
      //    { a: { code: 'a', word: 'Ant' }, b: { code: 'b', word: 'Bat' } }
      const settings = Object.assign({ key: 'code', camelKeys: false }, options);
      const map = {};
      const addObj = (obj) => map[obj[settings.key]] = obj;
      const addObjCamelKey = (obj) => map[dna.util.toCamel(obj[settings.key])] = obj;
      array.forEach(settings.camelKeys ? addObjCamelKey : addObj);
      return map;
      },
   wrap: (objOrArray) => {
      // Returns the given array if it is an array or returns a new array with the given object as
      // the first item.
      return !objOrArray ? [] : objOrArray instanceof Array ? objOrArray : [objOrArray];
      }
   };

dna.browser = {
   getUrlParams: () => {
      // Returns the query parameters as an object literal.
      // Example:
      //    https://example.com?lang=jp&code=7 ==> { lang: 'jp', code: 7 }
      const params = {};
      const addParam = (pair) => params[pair.split('=')[0]] = pair.split('=')[1];
      window.location.search.slice(1).split('&').forEach(pair => pair && addParam(pair));
      return params;
      }
   };

dna.pageToken = {
   // A simple key/value store specific to the page (URL path) that is cleared out when the
   // user's browser session ends.
   put: (key, value) => {
      // Example:
      //   dna.pageToken.put('favorite', 7);  //saves 7
      window.sessionStorage[key + window.location.pathname] = JSON.stringify(value);
      return value;
      },
   get: (key, defaultValue) => {
      // Example:
      //   dna.pageToken.get('favorite', 0);  //returns 0 if not set
      const value = window.sessionStorage[key + window.location.pathname];
      return value === undefined ? defaultValue : JSON.parse(value);
      }
   };

dna.ui = {
   deleteElem: function(elemOrEventOrIndex, callback) {
      // A flexible function for removing a jQuery element.
      // Example:
      //    $('.box').fadeOut(dna.ui.deleteElem);
      callback = typeof callback === 'function' ? callback : null;
      return dna.core.remove(dna.ui.toElem(elemOrEventOrIndex, this), callback);
      },
   focus: (elem) => {
      // Sets focus on an element.
      return elem.trigger('focus');
      },
   getAttrs: (elem) => {
      // Returns the attributes of the DOM node in a regular array.
      return elem[0] ? Object.values(elem[0].attributes) : [];
      },
   getComponent: (elem) => {
      // Returns the component (container element with a <code>data-component</code> attribute) to
      // which the element belongs.
      return elem.closest('[data-component]');
      },
   pulse: (elem, options) => {
      // Fades in an element after hiding it to create a single smooth flash effect.  The optional
      // interval fades out the element.
      const settings = Object.assign({ duration: 400, interval: null, out: 5000 }, options);
      const css = { hide: { opacity: 0 }, show: { opacity: 1 } };
      elem.stop(true).slideDown().css(css.hide).animate(css.show, settings.duration);
      if (settings.interval)
         elem.animate(css.show, settings.interval).animate(css.hide, settings.out);
      return elem;
      },
   slideFade: (elem, callback, show) => {
      // Smooth slide plus fade effect.
      const obscure = { opacity: 0, transition: 'opacity 0s' };
      const easeIn =  { opacity: 1, transition: 'opacity 0.4s' };
      const easeOut = { opacity: 0, transition: 'opacity 0.4s' };
      const reset =   { transition: 'opacity 0s' };
      const doEaseIn = () => elem.css(easeIn);
      const clearTransition = () => elem.css(reset);
      if (show && window.setTimeout(doEaseIn, 200))
         elem.css(obscure).hide().delay(100).slideDown(callback);
      else
         elem.css(easeOut).delay(100).slideUp(callback);
      elem.delay(200).promise().then(clearTransition);  //keep clean for other animations
      return elem;
      },
   slideFadeIn: (elem, callback) => {
      // Smooth slide plus fade effect.
      return dna.ui.slideFade(elem, callback, true);
      },
   slideFadeOut: (elem, callback) => {
      // Smooth slide plus fade effect.
      return dna.ui.slideFade(elem, callback, false);
      },
   slideFadeToggle: (elem, callback) => {
      // Smooth slide plus fade effect.
      return dna.ui.slideFade(elem, callback, elem.is(':hidden'));
      },
   slideFadeDelete: (elem, callback) => {
      // Smooth slide plus fade effect.
      return dna.ui.slideFadeOut(elem, () => dna.ui.deleteElem(elem, callback));
      },
   smoothHeightSetBaseline: (container) => {
      // See: smoothHeightAnimate below
      dna.ui.$container = container = container || $('body');
      const height = container.outerHeight();
      return container.css({ minHeight: height, maxHeight: height, overflow: 'hidden' });
      },
   smoothHeightAnimate: (delay, container) => {
      // Smoothly animates the height of a container element from a beginning height to a final
      // height.
      container = container || dna.ui.$container;
      const animate = () => {
         container.css({ minHeight: 0, maxHeight: '100vh' });
         const turnOffTransition = () => container.css({ transition: 'none', maxHeight: 'none' });
         window.setTimeout(turnOffTransition, 1000);  //allow 1s transition to finish
         };
      window.setTimeout(animate, delay || 50);  //allow container time to draw
      const setAnimationLength = () => container.css({ transition: 'all 1s' });
      window.setTimeout(setAnimationLength, 10);  //allow baseline to lock in height
      return container;
      },
   smoothMove: (elem, up, callback) => {
      // Uses animation to smoothly slide an element up or down one slot amongst its siblings.
      callback = typeof callback === 'function' ? callback : null;
      const move = () => {
         const ghostElem = submissiveElem.clone(true);
         if (up)
            elem.after(submissiveElem.hide()).before(ghostElem);
         else
            elem.before(submissiveElem.hide()).after(ghostElem);
         let finishes = 0;
         const finish = () => finishes++ && callback && callback(elem);
         const animate = () => {
            dna.ui.slideFadeIn(submissiveElem, finish);
            dna.ui.slideFadeDelete(ghostElem, finish);
            };
         window.setTimeout(animate);
         };
      const submissiveElem = up ? elem.prev() : elem.next();
      if (submissiveElem.length)
         move();
      else if (callback)
         callback(elem);
      return elem;
      },
   smoothMoveUp: (elem, callback) => {
      // Uses animation to smoothly slide an element up one slot amongst its siblings.
      return dna.ui.smoothMove(elem, true, callback);
      },
   smoothMoveDown: (elem, callback) => {
      // Uses animation to smoothly slide an element down one slot amongst its siblings.
      return dna.ui.smoothMove(elem, false, callback);
      },
   toElem: (elemOrEventOrIndex, that) => {
      // A flexible way to get the jQuery element whether it is passed in directly, is a DOM
      // element, is the target of an event, or comes from the jQuery context.
      const elem = elemOrEventOrIndex instanceof $ && elemOrEventOrIndex;
      const target = elemOrEventOrIndex && elemOrEventOrIndex.target;
      return elem || $(target || elemOrEventOrIndex || that);
      },
   };

dna.util = {
   apply: (fn, params) => {
      // Calls fn (string name or actual function) passing in params.
      // Usage:
      //    dna.util.apply('app.cart.buy', 7); ==> app.cart.buy(7);
      const args = params === undefined ? [] : [].concat(params);
      const elem = args[0];
      let result;
      const contextApply = (context, names) => {
         if (!context || (names.length === 1 && typeof context[names[0]] !== 'function'))
            dna.core.berserk('Callback function not found: ' + fn);
         else if (names.length === 1)
            result = context[names[0]].apply(elem, args);  //'app.cart.buy' ==> window['app']['cart']['buy']
         else
            contextApply(context[names[0]], names.slice(1));
         };
      const findFn = (names) => {
         if (elem instanceof $)
            args.push(dna.ui.getComponent(elem));
         const name = names[0];
         const identifierPattern = /^[_$a-zA-Z][_$a-zA-Z0-9]*$/;
         const unknown = (name) => window[name] === undefined && !dna.events.context[name];
         const topLevelGet = (null, eval);
         const callable = (name) => ['object', 'function'].includes(topLevelGet('typeof ' + name));
         if (identifierPattern.test(name) && unknown(name) && callable(name))
            dna.registerContext(name, topLevelGet(name));
         contextApply(dna.events.context[name] ? dna.events.context : window, names);
         };
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
   assign: (data, field, value) => {
      // Sets the field in the data object to the new value and returns the updated data object.
      // Example:
      //    dna.util.assign({ a: { b: 7 } }, 'a.b', 21);  //{ a: { b: 21 } }
      const fields = typeof field === 'string' ? field.split('.') : field;
      const name = fields[0];
      const dataObj = $.isPlainObject(data) ? data : {};
      const nestedData = () => dataObj[name] === undefined ? dataObj[name] = {} : dataObj[name];
      if (fields.length === 1)
         dataObj[name] = value;
      else
         dna.util.assign(nestedData(), fields.slice(1), value);
      return dataObj;
      },
   printf: (format, ...values) => {
      // Builds a formatted string by replacing the format specifiers with the supplied arguments.
      // Usage:
      //    dna.util.printf('%s: %s', 'Items in cart', 3) === 'Items in cart: 3';
      return values.reduce((str, value) => str.replace(/%s/, value), format);
      },
   realTruth: (value) => {
      // Returns the "real" boolean truth of a value.
      // Examples:
      //    const trues =  [true,  1, '1', 't', 'T', 'TRue',  'Y', 'yes', 77, [5], {}, 'Colbert',  Infinity];
      //    const falses = [false, 0, '0', 'f', 'F', 'faLSE', 'N', 'no',  '', [], null, undefined, NaN];
      const falseyStr = () => /^(f|false|n|no|0)$/i.test(value);
      const emptyArray = () => value instanceof Array && value.length === 0;
      return value ? !emptyArray() && !falseyStr() : false;
      },
   toCamel: (kebabStr) => {
      // Converts a kebab-case string (a code made of lowercase letters and dashes) to camelCase.
      // Example:
      //    dna.util.toCamel('ready-set-go') === 'readySetGo'
      const hump = (match, letter) => letter.toUpperCase();
      return ('' + kebabStr).replace(/\-(.)/g, hump);
      },
   toKebab: (camelStr) => {
      // Converts a camelCase string to kebab-case (a code made of lowercase letters and dashes).
      // Example:
      //    dna.util.toKebab('readySetGo') === 'ready-set-go'
      const dash = (word) => '-' + word.toLowerCase();
      return ('' + camelStr).replace(/([A-Z]+)/g, dash).replace(/\s|^-/g, '');
      },
   value: (data, field) => {
      // Returns the value of the field from the data object.
      // Example:
      //    dna.util.value({ a: { b: 7 } }, 'a.b') === 7
      if (typeof field === 'string')
         field = field.split('.');
      return (data === null || data === undefined || field === undefined) ? null :
         (field.length === 1 ? data[field[0]] : dna.util.value(data[field[0]], field.slice(1)));
      }
   };

dna.placeholder = {  //TODO: optimize
   // A template placeholder is only shown when its corresponding template is empty (has zero
   // clones).  The "data-placeholder" attribute specifies the name of the template.
   setup: () => {
      $('option.dna-template').closest('select').addClass('dna-hide');
      const fade = (i, elem) => {
         const input = $(elem).stop(true);
         return dna.getClones(input.data().placeholder).length ? input.fadeOut() : input.fadeIn();
         };
      $('[data-placeholder]').each(fade);
      }
   };

dna.panels = {
   // Each click of a menu item displays its corresponding panel and optionally passes the panel
   // element and hash to the function specified by the "data-callback" attribute.
   // Usage:
   //    <nav class=dna-menu data-nav={NAME} data-callback=app.displayPanel>
   //       <button>See X1</button>
   //       <button>See X2</button>
   //    </nav>
   //    <div class=dna-panels data-nav={NAME}>
   //       <section data-hash=x1>The X1</section>
   //       <section data-hash=x2>The X2</section>
   //    </div>
   // The optional "data-hash" attribute specifies the hash (URL fragment ID) and updates the
   // location bar.  The "data-nav" attributes can be omitted if the ".dna-panels" element
   // immediately follows the ".dna-menu" element.
   display: (menu, location, updateUrl) => {
      // Shows the panel at the given location (index)
      const panels =    menu.data().dnaPanels;
      const navName =   menu.data().nav;
      const menuItems = menu.find('.menu-item');
      const bound = (loc) => Math.max(0, Math.min(loc, menuItems.length - 1));
      const index = bound(location === undefined ? dna.pageToken.get(navName, 0) : location);
      menu[0].selectedIndex = index;  //case where menu is a drop-down elem (<select>)
      menuItems.removeClass('selected').addClass('unselected');
      menuItems.eq(index).addClass('selected').removeClass('unselected');
      panels.hide().removeClass('displayed').addClass('hidden');
      const panel = panels.eq(index).fadeIn().addClass('displayed').removeClass('hidden');
      const hash = panel.data().hash;
      dna.pageToken.put(navName, index);
      if (updateUrl && hash)
         window.history.pushState(null, null, '#' + hash);
      dna.util.apply(menu.data().callback, [panel, hash]);
      },
   clickRotate: (event) => {
      // Moves to the selected panel
      const item = $(event.target).closest('.menu-item');
      const menu = item.closest('.dna-menu');
      dna.panels.display(menu, menu.find('.menu-item').index(item), true);
      },
   selectRotate: (event) => {
      // Moves to the selected panel
      const menu = $(event.target);
      dna.panels.display(menu, menu.find('option:selected').index(), true);
      },
   nextNav: 1,
   initialize: (panelHolder) => {
      const initialized = 'dna-panels-initialized';
      const supportLegacyIDs = (navName) => {  //TODO: remove backward compatibility
         panelHolder.attr('data-nav', navName).addClass('dna-legacy-id');
         $('#' + navName + '-menu').attr('data-nav', navName).addClass('dna-legacy-id');
         panelHolder.data().nav = navName;
         };
      const generateNavName = () => {
         const navName = 'dna-panels-' + dna.panels.nextNav++;
         panelHolder.attr('data-nav', navName).prev('.dna-menu').attr('data-nav', navName);
         return navName;
         };
      const init = () => {
         if (!panelHolder.data().nav && /-panels$/.test(panelHolder.attr('id')))
            supportLegacyIDs(panelHolder.attr('id').replace(/-panels$/, ''));
         const navName =    panelHolder.data().nav || generateNavName();
         const menu =       $('.dna-menu[data-nav=' + navName + ']').addClass(initialized);
         const panels =     panelHolder.addClass(initialized).children().addClass('panel');
         const hash =       window.location.hash.slice(1);
         const hashIndex =  () => panels.filter('[data-hash=' + hash + ']').index();
         const savedIndex = () => dna.pageToken.get(navName, 0);
         const loc =        hash && panels.first().data().hash ? hashIndex() : savedIndex();
         if (!menu.length)
            dna.core.berserk('Menu not found for panels: ' + navName);
         menu.data().dnaPanels = panels;
         if (!menu.find('.menu-item').length)  //set .menu-item elems if not set in the html
            menu.children().addClass('menu-item');
         dna.panels.display(menu, loc);
         };
      if (panelHolder.length && !panelHolder.hasClass(initialized) && !panelHolder.children().hasClass('dna-template'))
         init();
      },
   setup: () => {
      $('.dna-panels').each((i, elem) => dna.panels.initialize($(elem)));
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
   // rule         <p data-true=~~on~~>              class=dna-nucleotide + true='on'
   // attr rule    <p data-attr-src=~~url~~>         class=dna-nucleotide + attrs=['src', ['', 'url', '']]
   // prop rule    <input data-prop-checked=~~on~~>  class=dna-nucleotide + props=['checked', 'on']
   // select rule  <select data-option=~~day~~>      class=dna-nucleotide + option='day'
   // transform    <p data-transform=app.enhance>    class=dna-nucleotide + transform='app.enhance'
   // callback     <p data-callback=app.configure>   class=dna-nucleotide + callback='app.configure'
   //
   // Rules                                      data().dnaRules
   // -----------------------------------------  ---------------
   // data-class=~~field,name-true,name-false~~  class=[['field','name-true','name-false']]
   // data-attr-{NAME}=pre~~field~~post          attrs=['{NAME}', ['pre', 'field', 'post']]
   // data-prop-{NAME}=pre~~field~~post          props=['{NAME}', 'field']
   // data-option=~~field~~                      option='field'
   // data-require=~~field~~                     require='field'
   // data-missing=~~field~~                     missing='field'
   // data-true=~~field~~                        true='field'
   // data-false=~~field~~                       false='field'
   // data-transform=func                        transform='func'
   // data-callback=func                         callback='func'
   //
   regexDnaField: /^[\s]*(~~|\{\{).*(~~|\}\})[\s]*$/,  //example: ~~title~~
   regexDnaBasePair: /~~|{{|}}/,  //matches the '~~' string
   regexDnaBasePairs: /~~|\{\{|\}\}/g,  //matches the two '~~' strings so they can be removed
   setupNucleotide: (elem) => {
      if (!elem.data().dnaRules)
         elem.data().dnaRules = {};
      return elem.addClass('dna-nucleotide');
      },
   isDnaField: (i, elem) => {
      const firstNode = elem.childNodes[0];
      const matches = () => firstNode.nodeValue.match(dna.compile.regexDnaField);
      return firstNode && firstNode.nodeValue && matches();
      },
   field: (i, elem) => {
      // Examples:
      //    <p>~~name~~</p>  ==>
      //       <p class=dna-nucleotide data-dnaField=name data-dnaRules={ text: true }></p>
      //    <textarea>~~address~~</textarea>  ==>
      //       <textarea class=dna-nucleotide data-dnaField=address data-dnaRules={ textarea: true }></p>
      elem = dna.compile.setupNucleotide($(elem));
      elem.data().dnaField = elem.text().replace(dna.compile.regexDnaBasePairs, '').trim();
      if (elem.is('textarea'))
         elem.addClass('dna-update-model').data().dnaRules.val = true;
      else
         elem.data().dnaRules.text = true;
      return elem.empty();
      },
   propsAndAttrs: (i, elem) => {
      // Examples:
      //    <p id=~~num~~>                  ==>  <p class=dna-nucleotide + data-dnaRules={ attrs: ['id', ['', 'num', '']] }>
      //    <p data-attr-src=~~url~~>       ==>  <p class=dna-nucleotide + data-dnaRules={ attrs: ['src', ['', 'url', '']] }>
      //    <p data-tag=~~[count]~~>        ==>  <p class=dna-nucleotide + data-dnaRules={ attrs: ['data-tag', ['', 1, '']] }>
      //    <p data-tag=~~[value]~~>        ==>  <p class=dna-nucleotide + data-dnaRules={ attrs: ['data-tag', ['', 2, '']] }>
      //    <input type=checkbox data-prop-checked=~~set~~>
      //                                    ==>  <option class=dna-nucleotide + data-dnaRules={ props: ['selected', 'set'] }>
      //    <select data-option=~~color~~>  ==>  <select class=dna-nucleotide + data-dnaRules={ val: true } + data-dnaField=color>
      elem = $(elem);
      const props = [];
      const attrs = [];
      const names = [];
      const compileProp = (key, value) => {
         names.push(key);
         key = key.replace(/^data-prop-/, '').toLowerCase();
         value = value.replace(dna.compile.regexDnaBasePairs, '');
         props.push(key, value);
         if (key === 'checked' && elem.is('input'))
            elem.addClass('dna-update-model').data().dnaField = value;
         };
      const compileAttr = (key, value) => {
         const parts = value.split(dna.compile.regexDnaBasePair);
         if (parts[1] === '[count]')
            parts[1] = 1;
         else if (parts[1] === '[value]')
            parts[1] = 2;
         attrs.push(key.replace(/^data-attr-/, ''), parts);
         names.push(key);
         const makeUpdatable = () => {
            dna.compile.setupNucleotide(elem).addClass('dna-update-model');
            elem.data().dnaField = parts[1];
            elem.data().dnaRules.val = true;
            };
         const hasTextVal = elem.is('input:not(:checkbox, :radio)') &&
            key === 'value' && parts[0] === '' && parts[2] === '';
         if (hasTextVal || (elem.is('select') && key === 'data-option'))
            makeUpdatable();
         };
      const compile = (attr) => {
         if (/^data-prop-/.test(attr.name))
            compileProp(attr.name, attr.value);
         else if (attr.value.split(dna.compile.regexDnaBasePair).length === 3)
            compileAttr(attr.name, attr.value);
         };
      dna.ui.getAttrs(elem).forEach(compile);
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
   getDataField: (elem, type) => {
      // Example:
      //    <p data-array=~~tags~~>, 'array'  ==>  'tags'
      return $.trim(elem.data(type).replace(dna.compile.regexDnaBasePairs, ''));
      },
   subTemplateName: (holder, arrayField) => {  //holder can be element or template name
      // Example:
      //    subTemplateName('book', 'authors') ==> 'book-authors-instance'
      const getClone = () => dna.getClone(holder, { main: true });
      const templateName = holder instanceof $ && getClone().data().dnaRules.template;
      return (templateName || holder) + '-' + arrayField + '-instance';
      },
   rules: (elems, type, isLists) => {
      // Example:
      //    <p data-require=~~title~~>, 'require'  ==>  <p data-dnaRules={ require: 'title' }>
      const addRule = (i, elem) => {
         elem = dna.compile.setupNucleotide($(elem));
         const field = dna.compile.getDataField(elem, type);
         const makeLists = () => field.split(';').map(list => list.split(','));
         elem.data().dnaRules[type] = isLists ? makeLists() : field;
         };
      return elems.filter('[data-' + type + ']').each(addRule).removeAttr('data-' + type);
      },
   separators: (elem) => {
      // Convert: data-separator=", "  ==>  <span class=dna-separator>, </span>
      const isWhitespaceNode = (i, elem) => elem.nodeType === 3 && !/\S/.test(elem.nodeValue);
      const append = (templateElem, text, className) => {
         const doAppend = () => {
            templateElem.contents().last().filter(isWhitespaceNode).remove();
            templateElem.append($('<span>').addClass(className).html(text));
            };
         return text && doAppend();
         };
      const processTemplate = (i, elem) => {
         const templateElem = $(elem);
         append(templateElem, templateElem.data().separator,     'dna-separator');
         append(templateElem, templateElem.data().lastSeparator, 'dna-last-separator');
         };
      elem.find('.dna-template, .dna-sub-clone').addBack().each(processTemplate);
      },
   template: (name) => {  //prepare and stash template so it can be cloned
      const elem = $('#' + name);
      if (!elem.length)
         dna.core.berserk('Template not found: ' + name);
      const saveName = (i, elem) => $(elem).data().dnaRules = { template: $(elem).attr('id') };
      elem.find('.dna-template').addBack().each(saveName).removeAttr('id');
      const elems = elem.find('*').addBack();
      elems.filter(dna.compile.isDnaField).each(dna.compile.field).addClass('dna-field');
      dna.compile.rules(elems, 'array').addClass('dna-sub-clone');
      dna.compile.rules(elems, 'class', true);
      dna.compile.rules(elems, 'require');
      dna.compile.rules(elems, 'missing');
      dna.compile.rules(elems, 'true');
      dna.compile.rules(elems, 'false');
      elems.each(dna.compile.propsAndAttrs);
      dna.compile.separators(elem);
      //support html5 values for "type" attribute
      const setTypeAttr = (i, elem) => $(elem).attr({ type: $(elem).data().attrType });
      $('input[data-attr-type]').each(setTypeAttr);
      return dna.store.stash(elem);
      }
   };

dna.store = {
   // Handles storage and retrieval of templates
   templates: {},
   stash: (elem) => {
      const name = elem.data().dnaRules.template;
      const move = (i, elem) => {
         elem = $(elem);
         const name = elem.data().dnaRules.template;
         const container = elem.parent();
         const wrapped = container.children().length === 1 && !container.hasClass('dna-container');
         const compileSiblings = () => {
            container.data().dnaContents = true;
            const templateName = (elem) => {
               elem = $(elem);
               const compileToName = (id) => id ? dna.compile.template(id).name : name;
               return elem.hasClass('dna-template') ? compileToName(elem.attr('id')) :
                  elem.hasClass('dna-sub-clone') ? elem.data().dnaRules.template : false;
               };
            container.data().dnaContents = container.children().toArray().map(templateName);
            };
         if (!wrapped && !container.data().dnaContents)
            compileSiblings();
         const template = {
            name:       name,
            elem:       elem,
            container:  container.addClass('dna-container').addClass('dna-contains-' + name),
            nested:     container.closest('.dna-clone').length !== 0,
            separators: elem.find('.dna-separator, .dna-last-separator').length,
            wrapped:    wrapped
            };
         dna.store.templates[name] = template;
         elem.removeClass('dna-template').addClass('dna-clone').addClass(name).detach();
         };
      const prepLoop = (i, elem) => {
         // Pre (sub-template array loops -- data-array):
         //    class=dna-sub-clone data().dnaRules.array='field'
         // Post (elem):
         //    data().dnaRules.template='{NAME}-{FIELD}-instance'
         // Post (container)
         //    class=dna-nucleotide +
         //       data().dnaRules.loop={ name: '{NAME}-{FIELD}-instance', field: 'field' }
         elem = $(elem);
         const field = elem.data().dnaRules.array;
         const sub = dna.compile.subTemplateName(name, field);
         const parent = elem.parent().addClass('dna-array');
         dna.compile.setupNucleotide(parent).data().dnaRules.loop = { name: sub, field: field };
         elem.data().dnaRules.template = sub;
         };
      elem.find('.dna-template').addBack().each(move);
      elem.find('.dna-sub-clone').each(prepLoop).each(move);
      return dna.store.templates[name];
      },
   getTemplate: (name) => {
      return dna.store.templates[name] || dna.compile.template(name);
      }
   };

dna.events = {
   context: {},  //storage to register callbacks when dna.js is module loaded without window scope (webpack)
   initializers: [],  //example: [{ func: 'app.bar.setup', selector: '.progress-bar' }]
   runOnLoads: () => {
      // Example:
      //    <p data-on-load=app.cart.setup>
      const run = (i, elem) => dna.util.apply($(elem).data().onLoad, $(elem));
      return $('[data-on-load]').not('.dna-loaded').each(run).addClass('dna-loaded');
      },
   runInitializers: (elem) => {
      // Executes data-callback functions plus registered initializers
      const init = (initializer) => {
         const find = () => elem.find(initializer.selector).addBack(initializer.selector);
         const elems = initializer.selector ? find() : elem;
         const params = [elems.addClass('dna-initialized')].concat(initializer.params);
         dna.util.apply(initializer.func, params);
         };
      dna.events.initializers.forEach(init);
      return elem;
      },
   setup: () => {
      const runner = (elem, type, event) => {
         // Finds elements for given event type and executes callback passing in the element,
         //    event, and component (container element with "data-component" attribute)
         // Types: click|change|input|key-up|key-down|key-press|enter-key
         elem = elem.closest('[data-' + type + ']');
         const fn = elem.data(type);
         if (type === 'click' && elem.prop('tagName') === 'A' && fn && fn.match(/^dna[.]/))
            event.preventDefault();
         return dna.util.apply(fn, [elem, event]);
         };
      const handle = (event) => {
         const target = $(event.target);
         const updateField = (elem, calc) =>
            dna.util.assign(dna.getModel(elem), elem.data().dnaField, calc(elem));
         const getValue = (elem) => elem.val();
         const isChecked = (elem) => elem.is(':checked');
         const updateOption = (i, elem) => updateField($(elem), isChecked);
         const updateModel = () => {
            const mainClone = dna.getClone(target, { main: true });
            if (mainClone.length === 0) {  //TODO: figure out why some events are captured on the template instead of the clone
               //console.log('Error -- event not on clone:', event.timeStamp, event.type, target);
               return;
               }
            if (target.is('input:checkbox'))
               updateField(target, isChecked);
            else if (target.is('input:radio'))
               $('input:radio[name=' + target.attr('name') + ']').each(updateOption);
            else if (target.data().dnaRules.val)
               updateField(target, getValue);
            dna.refresh(mainClone);
            };
         if (target.hasClass('dna-update-model'))
            updateModel();
         return runner(target, event.type.replace('key', 'key-'), event);
         };
      const handleEnterKey = (event) => {
         if (event.which === 13)
            runner($(event.target), 'enter-key', event);
         };
      const handleSmartUpdate = (event) => {
         const defaultThrottle = 1000;  //default 1 second delay between callbacks
         const elem = $(event.target);
         const data = elem.data();
         const doCallback = () => {
            data.dnaLastUpdated = Date.now();
            data.dnaLastValue = elem.val();
            data.dnaTimeoutId = null;
            runner(elem, 'smart-update', event);
            };
         const handleChange = () => {
            const throttle = data.smartThrottle ? +data.smartThrottle : defaultThrottle;
            if (Date.now() < data.dnaLastUpdated + throttle)
               data.dnaTimeoutId = window.setTimeout(doCallback, throttle);
            else
               doCallback();
            };
         const checkForValueChange = () => {
            if (elem.val() !== data.dnaLastValue && !data.dnaTimeoutId)
               handleChange();
            };
         const processSmartUpdate = () => {
            if (event.type === 'keydown' && data.dnaLastValue === undefined)
               data.dnaLastValue = elem.val();
            window.setTimeout(checkForValueChange);  //requeue so elem.val() is ready on paste event
            };
         if (data.smartUpdate)
            processSmartUpdate();
         };
      const jumpToUrl = (event) => {
         // Usage:
         //    <button data-href=https://dnajs.org>dna.js</button>
         // If element (or parent) has the class "external-site", page will be opened in a new tab.
         const elem = $(event.target);
         const iOS = /iPad|iPhone|iPod/.test(window.navigator.userAgent) &&
            /Apple/.test(window.navigator.vendor);
         const newTab = !iOS && elem.closest('.external-site').length;
         window.open(elem.closest('[data-href]').data().href, newTab ? '_blank' : '_self');
         };
      $(window.document)
         .on({
            click:    handle,
            change:   handle,
            keydown:  handle,
            keypress: handle,
            keyup:    handle,
            input:    handle
            })
         .on({
            keydown: handleSmartUpdate,
            keyup:   handleSmartUpdate,
            change:  handleSmartUpdate,
            cut:     handleSmartUpdate,
            paste:   handleSmartUpdate
            })
         .on({ keyup: handleEnterKey })
         .on({ click: jumpToUrl }, '[data-href]');
      dna.events.runOnLoads();
      }
   };

dna.core = {
   inject: (clone, data, count, settings) => {
      // Inserts data into clone and runs rules
      const injectField = (elem, field) => {
         const value = field === '[count]' ? count : field === '[value]' ? data :
            dna.util.value(data, field);
         const printable = { string: true, number: true, boolean: true };
         if (printable[typeof value])
            elem = settings.html ? elem.html(value) : elem.text(value);
         };
      const injectValue = (elem, field) => {
         const value = field === '[count]' ? count : field === '[value]' ? data :
            dna.util.value(data, field);
         if (value !== null && value !== elem.val())
            elem.val(value);
         };
      const injectProps = (elem, props) => {  //example props: ['selected', 'set']
         for (let prop = 0; prop < props.length/2; prop++)  //each prop has a key and a field name
            elem.prop(props[prop*2], dna.util.realTruth(dna.util.value(data, props[prop*2 + 1])));
         };
      const injectAttrs = (elem, attrs) => {  //example attrs: ['data-tag', ['', 'tag', '']]
         for (let attr = 0; attr < attrs.length / 2; attr++) {  //each attr has a key and parts
            const key = attrs[attr*2];
            const parts = attrs[attr*2 + 1];  //example: 'J~~code.num~~' ==> ['J', 'code.num', '']
            const field = parts[1];
            const core = field === 1 ? count : field === 2 ? data : dna.util.value(data, field);
            const value = [parts[0], core, parts[2]].join('');
            elem.attr(key, value);
            if (/^data-./.test(key))
               elem.data(key.substring(5), value);
            if (key === 'value' && value !== elem.val())  //set elem val for input fields (example: <input value=~~tag~~>)
               elem.val(value);
            }
         };
      const injectClass = (elem, classLists) => {
         // classLists = [['field', 'class-true', 'class-false'], ...]
         const process = (classList) => {
            const value = dna.util.value(data, classList[0]);
            const truth = dna.util.realTruth(value);
            const setBooleanClasses = () => {
               elem.toggleClass(classList[1], truth);
               if (classList[2])
                  elem.toggleClass(classList[2], !truth);
               };
            if (classList.length === 1)
               elem.addClass(value);
            else if (classList.length > 1)
               setBooleanClasses();
            };
         classLists.forEach(process);
         };
      const fieldExists = (fieldName) => {
         const value = dna.util.value(data, fieldName);
         return value !== undefined && value !== null;
         };
      const processLoop = (elem, loop) => {
         const dataArray = dna.util.value(data, loop.field);
         const subClones = elem.children('.' + loop.name.replace(/[.]/g, '\\.'));
         const injectSubClone = (i, elem) => {
            elem = $(elem);
            if (!elem.is('option'))  //prevent select from closing on chrome
               dna.core.inject(elem, dataArray[i], i + 1, settings);
            };
         const rebuildSubClones = () => {
            subClones.remove();
            dna.clone(loop.name, dataArray, { container: elem, html: settings.html });
            };
         if (!dataArray)
            data[loop.field] = [];
         else if (dataArray.length === subClones.length)
            subClones.each(injectSubClone);
         else
            rebuildSubClones();
         };
      const process = (i, elem) => {
         elem = $(elem);
         const dnaRules = elem.data().dnaRules;
         if (dnaRules.transform)  //alternate version of the "transform" option
            dna.util.apply(dnaRules.transform, data);
         if (dnaRules.loop)
            processLoop(elem, dnaRules.loop);
         if (dnaRules.text)
            injectField(elem, elem.data().dnaField);
         if (dnaRules.val)
            injectValue(elem, elem.data().dnaField);
         if (dnaRules.props)
            injectProps(elem, dnaRules.props);
         if (dnaRules.attrs)
            injectAttrs(elem, dnaRules.attrs);
         if (dnaRules.class)
            injectClass(elem, dnaRules.class);
         if (dnaRules.require)
            elem.toggle(fieldExists(dnaRules.require));
         if (dnaRules.missing)
            elem.toggle(!fieldExists(dnaRules.missing));
         if (dnaRules.true)
            elem.toggle(dna.util.realTruth(dna.util.value(data, dnaRules.true)));
         if (dnaRules.false)
            elem.toggle(!dna.util.realTruth(dna.util.value(data, dnaRules.false)));
         if (dnaRules.callback)
            dna.util.apply(dnaRules.callback, elem);
         };
      const dig = (elems) => {
         elems.filter('.dna-nucleotide').each(process);
         if (elems.length)
            dig(elems.children().not('.dna-sub-clone'));
         };
      if (settings.transform)  //alternate version of data-transform
         settings.transform(data);
      dig(clone);
      clone.data().dnaModel = data;
      clone.data().dnaCount = count;
      return clone;
      },
   replicate: (template, data, index, settings) => {  //make and setup the clone
      const displaySeparators = () => {
         const clones = container.children('.' + template.name);
         clones.find('.dna-separator').show().end().last().find('.dna-separator').hide();
         clones.find('.dna-last-separator').hide().end().eq(-2).find('.dna-last-separator').show()
            .closest('.dna-clone').find('.dna-separator').hide();
         };
      const selector =  '.dna-contains-' + template.name.replace(/[.]/g, '\\.');
      const container = settings.container ?
         settings.container.find(selector).addBack(selector) : template.container;
      const clone = template.elem.clone(true, true);
      const name = clone.data().dnaRules.template;
      if (!container.data().dnaCountsMap)
         container.data().dnaCountsMap = {};
      const countsMap = container.data().dnaCountsMap;
      countsMap[name] = (countsMap[name] || 0) + 1;
      dna.core.inject(clone, data, countsMap[name], settings);
      const intoUnwrapped = () => {
         const firstClone = () => {
            const contents = container.data().dnaContents;
            const i = contents.indexOf(template.name);
            const adjustment = (clonesAbove, name) =>
               clonesAbove + (name && contents.indexOf(name) < i ?
                  allClones.filter('.' + name).length - 1 : 0);
            const target = container.children().eq(i + contents.reduce(adjustment, 0));
            if (target.length)
               target.before(clone);
            else
               container.append(clone);
            };
         const allClones = container.children('.dna-clone');
         const sameClones = allClones.filter('.' + template.name);
         if (!sameClones.length)
            firstClone();
         else if (settings.top)
            sameClones.first().before(clone);
         else
            sameClones.last().after(clone);
         };
      if (!template.wrapped)
         intoUnwrapped();
      else if (settings.top)
         container.prepend(clone);
      else
         container.append(clone);
      if (template.separators)
         displaySeparators();
      dna.events.runInitializers(clone, data);
      if (settings.callback)
         settings.callback(clone, data);
      if (settings.fade)
         dna.ui.slideFadeIn(clone);
      return clone;
      },
   updateArrayByName: (clone, arrayField) => {
      const container = dna.getClone(clone);
      const update = () => {
         const template = container.data().dnaRules.template;
         const arrayClones = container.find('.' + template + '-' + arrayField + '-instance');
         dna.getModel(container)[arrayField] = arrayClones.get().map(dna.getModel);
         return clone;
         };
      return container.hasClass('dna-container') && arrayField ? update() : clone;
      },
   updateArray: (subClone) => {
      subClone = dna.getClone(subClone.first());
      if (subClone.hasClass('dna-sub-clone'))
         dna.core.updateArrayByName(subClone.parent(), subClone.data().dnaRules.array);
      return subClone;
      },
   remove: (clone, callback) => {
      const container = clone.parent();
      clone.detach();
      dna.core.updateArrayByName(container, clone.length && clone.data().dnaRules.array);
      dna.placeholder.setup();
      clone.remove();
      if (callback)
         callback(clone);
      return clone;
      },
   berserk: (message) => {  //oops, file a tps report
      throw Error('dna.js -> ' + message);
      },
   plugin: () => {
      // Example:
      //    dna.getClone(elem).dna('up');
      // Supported actions:
      //    'bye', 'clone-sub', 'destroy', 'down', 'refresh', 'up'
      $.fn.dna = function(action) {  //any additional parameters are passed to the api call
         const params = [arguments[1], arguments[2], arguments[3]];
         const dnaApi = dna[dna.util.toCamel(action)];
         if (!dnaApi)
            dna.core.berserk('Unknown plugin action: ' + action);
         const callApi = (i, elem) => dnaApi($(elem), params[0], params[1], params[2]);
         return this.each(callApi);
         };
      },
   initModule: (thisWindow, thisJQuery) => {
      window = thisWindow;
      $ = thisJQuery;
      window.dna = dna;
      dna.core.setup();
      return dna;
      },
   setup: () => {
      dna.core.plugin();
      $(dna.placeholder.setup);
      $(dna.panels.setup);
      $(dna.events.setup);
      }
   };

if (typeof window === 'object')
   window.dna = dna;  //support both global and window property
if (typeof module === 'object')  //const dna = require('dna.js')(window, jQuery);
   module.exports = dna.core.initModule;  //node module loading system (CommonJS)
else
   dna.core.setup();
