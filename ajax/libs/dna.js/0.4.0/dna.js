// dna.js Template Cloner ~~ v0.4.0
// MIT/GPLv3 ~~ dnajs.org/license.html
// Copyright (c) 2013-2015 Center Key Software and other contributors

var dna = {
   // API:
   //    dna.clone()
   //    dna.cloneSubTemplate()
   //    dna.createTemplate()
   //    dna.load()
   //    dna.getModel()
   //    dna.empty()
   //    dna.refresh()
   //    dna.refreshAll()
   //    dna.destroy()
   //    dna.getClone()
   //    dna.getClones()
   //    dna.getIndex()
   //    dna.bye()
   //    dna.registerInitializer()
   //    dna.clearInitializers()
   //    dna.info()
   // See: http://dnajs.org/manual.html#api
   clone: function(name, data, options) {
      var settings = $.extend(
         { fade: false, top: false, container: null, empty: false, html: false, callback: null },
         options);
      var template = dna.store.getTemplate(name);
      if (template.nested && !settings.container)
         dna.core.berserk('Container missing for nested template: ' + name);
      if (settings.empty)
         dna.empty(name);
      var list = data instanceof Array ? data : [data];
      var clones = $();
      for (var i = 0; i < list.length; i++)
         clones = clones.add(dna.core.replicate(template, list[i], i, settings));
      dna.placeholder.setup();  //TODO: optimize
      if (clones.first().closest('.dna-menu, .dna-panels').length)
         dna.panels.refresh();
      return clones;
      },
   cloneSubTemplate: function(holderClone, arrayField, data, options) {
      var name = dna.compile.subTemplateName(holderClone, arrayField);
      var selector = '.dna-contains-' + name;
      var settings = $.extend({ container: holderClone.find(selector).addBack(selector) }, options);
      dna.clone(name, data, settings);
      var array = dna.getModel(holderClone)[arrayField];
      function append() { array.push(this); }
      $.each(data instanceof Array ? data : [data], append);
      return holderClone;
      },
   createTemplate: function(name, html, holder) {
      $(html).attr('id', name).addClass('dna-template').appendTo(holder);
      return dna.store.getTemplate(name);
      },
   load: function(name, url, options) {
      function processJson(data) { dna.core.unload(name, data, options); }
      return $.getJSON(url, processJson);
      },
   getModel: function(elemOrName, options) {
      function getOneModel(elem) {
         return dna.getClone(elem, options).data('dnaModel');
         }
      function getAllModels(name) {
         var model = [];
         function addToModel() { model.push(dna.getModel($(this))); }
         dna.getClones(name).each(addToModel);
         return model;
         }
      return (elemOrName instanceof jQuery ? getOneModel : getAllModels)(elemOrName);
      },
   empty: function(name, options) {
      var settings = $.extend({ fade: false }, options);
      var clones = dna.store.getTemplate(name).container.find('.dna-clone');
      return settings.fade ? dna.ui.slideFadeDelete(clones) : dna.core.remove(clones);
      },
   refresh: function(clone, options) {
      var settings = $.extend({ html: false }, options);
      var elem = dna.getClone(clone, options);
      var data = settings.data ? settings.data : dna.getModel(elem);
      return dna.core.inject(elem, data, null, settings);
      },
   refreshAll: function(name) {
      function refresh() { dna.refresh($(this)); }
      return dna.getClones(name).each(refresh);
      },
   mutate: function(clone, data, options) {  //DEPRECATED
      return dna.refresh(clone, $.extend({ data: data }, options));
      },
   destroy: function(clone, options) {
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
      var settings = $.extend({ main: false }, options);
      var selector = settings.main ? '.dna-clone:not(.dna-sub-clone)' : '.dna-clone';
      return elem instanceof jQuery ? elem.closest(selector) : $();
      },
   getClones: function(name) {
      return dna.store.getTemplate(name).container.children().filter('.dna-clone');
      },
   getIndex: function(elem, options) {
      var clone = dna.getClone(elem, options);
      return clone.parent().children('.dna-clone').index(clone);
      },
   bye: function(elemOrEventOrIndex) {
      return dna.destroy(dna.ui.toElem(elemOrEventOrIndex, this), { fade: true });
      },
   registerInitializer: function(func, options) {
      var settings = $.extend({ onDocumentLoad: true }, options);
      if (settings.onDocumentLoad)
         dna.util.apply(func, [settings.selector ? $(settings.selector).not('.dna-template ' +
            settings.selector).addClass('dna-initialized') : $(document)].concat(settings.params));
      return dna.events.initializers.push(
         { func: func, selector: settings.selector, params: settings.params });
      },
   clearInitializers: function() {
      dna.events.initializers = [];
      },
   info: function() {
      var names = Object.keys(dna.store.templates);
      console.log('~~ dna.js v0.4.0 ~~');
      console.log('templates:', names.length);
      console.log('names:', names);
      console.log('store:', dna.store.templates);
      console.log('initializers:', dna.events.initializers.length);
      return navigator.appVersion;
      }
   };

dna.array = {
   find: function(array, code) {
      function found(obj) { return obj.code === code; }
      var objs = array.filter(found);
      return objs.length ? objs[0] : null;
      },
   last: function(array) {
      // Example:
      //    library.array([3, 21, 7]) === 7;
      return array && array.length ? array[array.length - 1] : undefined;
      },
   toMap: function(array, key) {
      // Converts an array of objects into a hash map
      //    var array = [{code: 'a', word: 'Ant'}, {code: 'b', word: 'Bat'}];
      //    library.array.toMap(array, 'code').b.word === 'Bat';
      var map = {};
      function addObj(obj) { map[obj[key]] = obj; }
      array.forEach(addObj);
      return map;
      }
   };

dna.browser = {
   getParams: function() {
      // Example:
      //   http://example.com?lang=jp&code=7  ==>  { lang: 'jp', code: 7 }
      var params = {};
      function addParam(pair) { params[pair.split('=')[0]] = pair.split('=')[1]; }
      window.location.search.slice(1).split('&').forEach(addParam);
      return params;
      }
   };

dna.util = {
   toCamel: function(codeStr) {  //example: 'ready-set-go' ==> 'readySetGo'
      function hump(match, char) { return char.toUpperCase(); }
      return ('' + codeStr).replace(/\-(.)/g, hump);
      },
   toCode: function(camelCaseStr) {  //example: 'readySetGo' ==> 'ready-set-go'
      function dash(word) { return '-' + word.toLowerCase(); }
      return ('' + camelCaseStr).replace(/([A-Z]+)/g, dash).replace(/\s|^-/g, '');
      },
   value: function(data, field) {  //example: dna.util.value({ a: { b: 7 }}, 'a.b'); ==> 7
      if (typeof field === 'string')
         field = field.split('.');
      return (data === null || data === undefined || field === undefined) ? null :
         (field.length === 1 ? data[field[0]] : this.value(data[field[0]], field.slice(1)));
      },
   realTruth: function(value) {  //returns a boolean
      // Example true values:  true,  7, '7', [5], 't', 'T', 'TRue',  {},   'Colbert'
      // Example false values: false, 0, '0', [],  'f', 'F', 'faLSE', null, undefined, NaN
      function falseyStr() { return /^(f|false|0)$/i.test(value); }
      function emptyArray() { return value instanceof Array && value.length === 0; }
      return value ? !emptyArray() && !falseyStr() : false;
      },
   printf: function(format) {
      // Usage:
      //    dna.util.printf('%s: %s', 'Lives', 3) === 'Lives: 3';
      var values = Array.prototype.slice.call(arguments, 1);
      function insert(str, val) { return str.replace(/%s/, val); }
      return values.reduce(insert, format);
      },
   apply: function(func, params) {  //calls func (string name or actual function) passing in params
      // Example: dna.util.apply('app.cart.buy', 7); ==> app.cart.buy(7);
      var args = [].concat(params);
      var elem = args[0], result;
      function contextApply(obj, names) {
         if (!obj || (names.length == 1 && typeof obj[names[0]] !== 'function'))
            dna.core.berserk('Callback function not found: ' + func);
         else if (names.length == 1)
            result = obj[names[0]].apply(elem, args);  //'app.cart.buy' ==> window['app']['cart']['buy']
         else
            contextApply(obj[names[0]], names.slice(1));
         }
      if (elem instanceof jQuery && elem.length === 0)
         result = elem;
      else if (typeof func === 'function')
         result = func.apply(elem, args);
      else if (elem && elem[func])
         result = elem[func](args[1], args[2], args[3]);
      else if (func === '' || { number: true, boolean: true}[typeof func])
         dna.core.berserk('Invalid callback function: ' + func);
      else if (typeof func === 'string' && func.length > 0)
         contextApply(window, func.split('.'));
      return result;
      }
   };

dna.ui = {
   toElem: function(elemOrEventOrIndex, that) {
      return elemOrEventOrIndex instanceof jQuery ? elemOrEventOrIndex :
         elemOrEventOrIndex ? $(elemOrEventOrIndex.target) : $(that);
      },
   deleteElem: function(elemOrEventOrIndex) {  //example: $('.box').fadeOut(dna.ui.deleteElem);
      var elem = dna.ui.toElem(elemOrEventOrIndex, this);
      dna.core.remove(elem);
      return elem;
      },
   slideFade: function(elem, callback, show) {
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
      return dna.ui.slideFade(elem, callback, true);
      },
   slideFadeOut: function(elem, callback) {
      return dna.ui.slideFade(elem, callback, false);
      },
   slideFadeToggle: function(elem, callback) {
      return dna.ui.slideFade(elem, callback, elem.is(':hidden'));
      },
   slideFadeDelete: function(elem) {
      return dna.ui.slideFadeOut(elem, dna.ui.deleteElem);
      },
   slidingFlasher: function(elem, callback) {
      return elem.is(':hidden') ? dna.ui.slideFadeIn(elem, callback) : elem.hide().fadeIn();
      }
   };

dna.placeholder = {  //TODO: optimize
   setup: function() {
      function fade() {
         var elem = $(this).stop();
         return dna.getClones(elem.data().placeholder).length ? elem.fadeOut() : elem.fadeIn();
         }
      $('[data-placeholder]').each(fade);
      }
   };
$(dna.placeholder.setup);

dna.pageToken = {
   // Page specific (url path) key/value temporary storage
   put: function(key, value) {
      // Example:
      //   dna.pageToken.put('favorite', 7);  //saves 7
      sessionStorage[key + window.location.pathname] = JSON.stringify(value);
      return value;
      },
   get: function(key, defaultValue) {
      // Example:
      //   dna.pageToken.get('favorite', 0);  //returns 0 if not set
      var value = sessionStorage[key + window.location.pathname];
      return value === undefined ? defaultValue : JSON.parse(value);
      }
   };

dna.panels = {
   // Each click of a menu item displays its corresponding panel and passes the panel
   // element to the callback.
   // Usage:
   //    <ul id={ID} class=dna-menu data-callback=app.displayPanel>
   //       <li>See X1</li>
   //       <li>See X2</li>
   //    </ul>
   //    <div id={ID}-panels class=dna-panels>
   //       <section data-hash=x1>The X1</section>
   //       <section data-hash=x2>The X2</section>
   //    </div>
   // Leave out the "data-hash" attribute to disable updating of the location bar.
   key: function(menu) {
      return '#' + menu.attr('id') + '-panels';
      },
   display: function(menu, loc, updateUrl) {  //shows the panel at the given index (loc)
      var panels, panel;
      var key = dna.panels.key(menu);
      var menuItems = menu.find('.menu-item');
      if (loc === undefined)
         loc = dna.pageToken.get(key, 0);
      loc = Math.max(0, Math.min(loc, menuItems.length - 1));
      menuItems.removeClass('selected').eq(loc).addClass('selected');
      panels = $(key).children().hide().removeClass('displayed');
      panel = panels.eq(loc).fadeIn().addClass('displayed');
      function saveState() {
         dna.pageToken.put(key, loc);
         if (updateUrl && panel.data().hash)
            window.history.pushState(null, null, '#' + panel.data().hash);
         }
      saveState();
      dna.util.apply(menu.data().callback, panel);
      },
   rotate: function(event) {  //moves to the selected panel
      var item = $(event.target).closest('.menu-item');
      var menu = item.closest('.dna-menu');
      dna.panels.display(menu, menu.find('.menu-item').index(item), true);
      },
   reload: function(name) {  //refreshes the currently displayed panel
      dna.panels.display($('#' + name));
      },
   refresh: function() {
      var hash = window.location.hash.slice(1);
      function findPanelLoc(panels) { return panels.filter('[data-hash=' + hash + ']').index(); }
      function partOfTemplate(elems) { return elems.first().closest('.dna-template').length > 0; }
      function init() {
         var menu = $(this);
         var key = dna.panels.key(menu);
         var panels = $(key).children().addClass('panel');
         if (menu.find('.menu-item').length === 0)
            menu.children().addClass('menu-item');
         if (!partOfTemplate(panels) && !partOfTemplate(menu.children())) {
            var loc = hash && panels.first().data().hash ? findPanelLoc(panels) : dna.pageToken.get(key, 0);
            dna.panels.display(menu, loc);
            }
         }
      $('.dna-menu').each(init);
      },
   setup: function() {
      dna.panels.refresh();
      $(document).on('click', '.dna-menu .menu-item', dna.panels.rotate);
      }
   };
$(dna.panels.setup);

dna.compile = {
   // Pre-compile  Example                           Post-compile class + data().dnaRules
   // -----------  --------------------------------  ------------------------------------
   // template     <p id=ad class=dna-template>      class=dna-clone
   // array        <p data-array=~~tags~~>           class=dna-nucleotide + array='tags'
   // field        <p>~~tag~~</p>                    class=dna-nucleotide + text='tag'
   // attribute    <p id=~~num~~>                    class=dna-nucleotide + attrs=['id', ['', 'num', '']]
   // rule         <p data-truthy=~~on~~>            class=dna-nucleotide + truthy='on'
   // attr rule    <p data-attr-src=~~url~~>         class=dna-nucleotide + attrs=['src', ['', 'url', '']]
   // prop rule    <input data-prop-checked=~~on~~>  class=dna-nucleotide + props=['checked', 'on']
   // transform    <p data-transform=app.enhance>    class=dna-nucleotide + transform='app.enhance'
   // callback     <p data-callback=app.configure>   class=dna-nucleotide + callback='app.configure'
   //
   // Rules                                      data().dnaRules
   // -----------------------------------------  ---------------
   // data-class=~~field,name-true,name-false~~  class=['field','name-true','name-false']
   // data-attr-{NAME}=pre~~field~~post          attrs=['{NAME}', ['pre', 'field', 'post']]
   // data-prop-{NAME}=pre~~field~~post          props=['{NAME}', 'field']
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
   isDnaField: function() {
      var firstNode = $(this)[0].childNodes[0];
      return firstNode && firstNode.nodeValue &&
         firstNode.nodeValue.match(dna.compile.regexDnaField);
      },
   field: function() {
      // Example:
      //    <p>~~name~~</p>  ==>  <p class=dna-nucleotide data-dnaRules={ text: 'name' }></p>
      var elem = dna.compile.setupNucleotide($(this));
      elem.data().dnaRules.text = $.trim(elem.text()).replace(dna.compile.regexDnaBasePairs, '');
      return elem.empty();
      },
   propsAndAttrs: function() {
      // Examples:
      //    <option data-prop-selected=~~set~~>  ==>  <option class=dna-nucleotide + data-dnaRules={ props: ['selected', 'set'] }>
      //    <p id=~~num~~>                       ==>  <p class=dna-nucleotide + data-dnaRules={ attrs: ['id', ['', 'num', '']] }>
      //    <p data-attr-src=~~url~~>            ==>  <p class=dna-nucleotide + data-dnaRules={ attrs: ['src', ['', 'url', '']] }>
      //    <p data-tag=~~[value]~~>             ==>  <p class=dna-nucleotide + data-dnaRules={ attrs: ['data-tag', ['', true, '']] }>
      var elem = $(this);
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
         if (key === 'value' && elem.is('input:text') && parts[0] === '' && parts[2] === '')
            elem.addClass('dna-update-model').data().dnaField = parts[1];
         }
      function compile() {
         if (/^data-prop-/.test(this.name))
            compileProp(this.name, this.value);
         else if (this.value.split(dna.compile.regexDnaBasePair).length === 3)
            compileAttr(this.name, this.value);
         }
      $.each(elem.get(0).attributes, compile);
      if (props.length > 0)
         dna.compile.setupNucleotide(elem).data().dnaRules.props = props;
      if (attrs.length > 0)
         dna.compile.setupNucleotide(elem).data().dnaRules.attrs = attrs;
      if (elem.data().transform)  //TODO: Determine if it's better to process only at top-level of clone
         dna.compile.setupNucleotide(elem).data().dnaRules.transform = elem.data().transform;
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
      var mainTemplateName = holder instanceof jQuery ?
         dna.getClone(holder).data().dnaRules.template : holder;
      return mainTemplateName + '-' + arrayField + '-instance';
      },
   rules: function(elems, type, isList) {
      // Example:
      //    <p data-require=~~title~~>, 'require'  ==>  <p data-dnaRules={ require: 'title' }>
      function add() {
         var elem = dna.compile.setupNucleotide($(this));
         var field = dna.compile.getDataField(elem, type);
         elem.data().dnaRules[type] = isList ? field.split(',') : field;
         }
      return elems.filter('[data-' + type + ']').each(add).removeAttr('data-' + type);
      },
   separators: function(elem) {
      // Convert: data-separator=", "  ==>  <span class=dna-separator>, </span>
      function isWhitespaceNode() { return this.nodeType === 3 && !/\S/.test(this.nodeValue); }
      function append(templateElem, text, className) {
         if (text) {
            templateElem.contents().last().filter(isWhitespaceNode).remove();
            templateElem.append($('<span>').addClass(className).html(text));
            }
         }
      function processTemplate() {
         var templateElem = $(this);
         append(templateElem, templateElem.data().separator,     'dna-separator');
         append(templateElem, templateElem.data().lastSeparator, 'dna-last-separator');
         }
      elem.find('.dna-template, .dna-sub-clone').addBack().each(processTemplate);
      },
   template: function(name) {  //prepare and stash template so it can be cloned
      var elem = $('#' + name);
      if (!elem.length)
         dna.core.berserk('Template not found: ' + name);
      function saveName() { $(this).data().dnaRules = { template: $(this).attr('id') }; }
      elem.find('.dna-template').addBack().each(saveName).removeAttr('id');
      var elems = elem.find('*').addBack();
      elems.filter(dna.compile.isDnaField).each(dna.compile.field);
      dna.compile.rules(elems, 'array').addClass('dna-sub-clone');
      dna.compile.rules(elems, 'class', true);
      dna.compile.rules(elems, 'require');
      dna.compile.rules(elems, 'missing');
      dna.compile.rules(elems, 'truthy');
      dna.compile.rules(elems, 'falsey');
      elems.each(dna.compile.propsAndAttrs);
      dna.compile.separators(elem);
      return dna.store.stash(elem);
      }
   };

dna.store = {
   // Handles storage and retrieval of templates
   templates: {},
   stash: function(elem) {
      var name = elem.data().dnaRules.template;
      function move() {
         var elem = $(this);
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
      function prepLoop() {
         // Pre (sub-template array loops -- data-array):
         //    class=dna-sub-clone data().dnaRules.array='field'
         // Post (elem):
         //    data().dnaRules.template='{NAME}-{FIELD}-instance'
         // Post (container)
         //    class=dna-nucleotide +
         //       data().dnaRules.loop={ name: '{NAME}-{FIELD}-instance', field: 'field' }
         var elem = $(this);
         var field = elem.data().dnaRules.array;
         var sub = dna.compile.subTemplateName(name, field);
         dna.compile.setupNucleotide(elem.parent()).data().dnaRules.loop =
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
   initializers: [],  //example: [{ func: 'app.bar.setup', selector: '.progress-bar' }]
   elementSetup: function(root, data) {
      // Example:
      //    <p data-on-load=app.cart.setup>
      function setup() { dna.util.apply($(this).data().onLoad, [$(this), data]); }
      var selector = '[data-on-load]';
      var elems = root ? root.find(selector).addBack(selector) : $(selector);
      return elems.not('.dna-initialized').each(setup).addClass('dna-initialized');
      },
   runInitializers: function(elem, data) {
      // Executes data-on-load and data-callback functions plus registered initializers
      dna.events.elementSetup(elem, data);
      function init() {
         var elems = this.selector ? elem.find(this.selector).addBack(this.selector) : elem;
         dna.util.apply(this.func, [elems.addClass('dna-initialized')].concat(this.params));
         }
      $.each(dna.events.initializers, init);
      return elem;
      },
   setup: function() {
      function runner(elem, type, event) {
         // Finds elements for given event type and executes callback passing in the element and event
         // Types: click|change|key-up|key-down|key-press|enter-key
         elem = elem.closest('[data-' + type + ']');
         return dna.util.apply(elem.data(type), [elem, event]);
         }
      function handle(event) {
         var target = $(event.target);
         function updateField(elem, calc) { dna.getModel(elem)[elem.data().dnaField] = calc(elem); }
         function getValue(elem) { return elem.val(); }
         function isChecked(elem) { return elem.is(':checked'); }
         function updateOption() { updateField($(this), isChecked); }
         function updateModel() {
            var mainClone = dna.getClone(target, { main: true });
            if (mainClone.length === 0) {  //TODO: figure out why some events are captured on the template instead of the clone
               //console.log('Error -- event not on clone:', event.timeStamp, event.type, target);
               return;
               }
            if (target.is('input:text'))
               updateField(target, getValue);
            else if (target.is('input:checkbox'))
               updateField(target, isChecked);
            else if (target.is('input:radio'))
               $('input:radio[name=' + target.attr('name') + ']').each(updateOption);
            else if (target.is('select'))
               target.find('option').each(updateOption);
            dna.refresh(mainClone);
            }
         if (target.hasClass('dna-update-model'))
            updateModel();
         runner(target, event.type.replace('key', 'key-'), event);
         }
      function handleEnterKey(event) {
         if (event.which === 13)
            runner($(event.target), 'enter-key', event);
         }
      function handleSmartUpdate(event) {
         var defaultThrottle = 2000;  //default 2 second delay between callbacks
         var elem = $(event.target);
         var data = elem.data();
         function smartUpdate() {
            function doCallback() {
               data.dnaLastUpdated = Date.now();
               data.dnaTimeoutId = undefined;
               runner(elem, 'smart-update', event);
               }
            var throttle = data.smartThrottle ? Number(data.smartThrottle) : defaultThrottle;
            data.dnaLastValue = elem.val();
            if (!data.dnaTimeoutId)
               if (Date.now() < data.dnaLastUpdated + throttle)
                  data.dnaTimeoutId = window.setTimeout(doCallback, throttle);
               else
                  doCallback();
            }
         if (data.smartUpdate && elem.val() !== data.dnaLastValue)
            smartUpdate();
         }
      function setupJumpToUrl() {
         // Usage:
         //    <button data-href="/">Home</button>
         function jump() { window.location = $(this).data().href; }
         $(document).on('click', '[data-href]', jump);
         }
      $(document)
         .click(handle)
         .change(handle)
         .keyup(handle)
         .keyup(handleEnterKey)
         .keyup(handleSmartUpdate)
         .keydown(handle)
         .keypress(handle);
      setupJumpToUrl();
      dna.events.elementSetup();
      }
   };
$(dna.events.setup);

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
            var parts = attrs[attr*2 + 1];  //example: 'J~~code.num~~' --> ['J', 'code.num', '']
            var core = parts[1] === true ? data : dna.util.value(data, parts[1]);
            var value = [parts[0], core, parts[2]].join('');
            elem.attr(key, value);
            if (/^data-./.test(key))
               elem.data(key.substring(5), value);
            if (key === 'value' && value !== elem.val())  //set elem val for input fields (example: <input value=~~tag~~>)
               elem.val(value);
            }
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
         if (dataArray)
            dna.clone(loop.name, dataArray, { container: elem, html: settings.html });
         else
            data[loop.field] = [];
         }
      function process() {
         var elem = $(this);
         var dnaRules = elem.data().dnaRules;
         if (dnaRules.transform)
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
         if (dnaRules.callback)
            dna.util.apply(dnaRules.callback, elem);
         }
      clone.find('.dna-sub-clone').remove();
      clone.find('.dna-nucleotide').addBack('.dna-nucleotide').each(process);
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
      var selector = '.dna-contains-' + template.name;
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
   unload: function(name, data, options) {  //use rest data to make clone
      if (!data.error)
         dna.clone(name, data, options);
      },
   remove: function(clone) {  //TODO: optimize
      clone.remove();
      dna.placeholder.setup();
      return clone;
      },
   berserk: function(message) {  //oops, file a tps report
      throw 'dna.js error -> ' + message;
      }
   };
