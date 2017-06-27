// dna.js Template Cloner ~~ v0.3.0
// MIT/GPLv3 ~~ dnajs.org/license.html
// Copyright (c) 2013-2014 Center Key Software and other contributors

var dna = {
   // API:
   //    dna.clone()
   //    dna.cloneSubTemplate()
   //    dna.load()
   //    dna.getModel()
   //    dna.empty()
   //    dna.mutate()
   //    dna.mutateAll()
   //    dna.destroy()
   //    dna.getClone()
   //    dna.getClones()
   //    dna.bye()
   //    dna.registerInitializer()
   //    dna.clearInitializers()
   //    dna.info()
   // See: http://dnajs.org/manual.html#api
   clone: function(name, data, options) {
      var settings = { fade: false, top: false, container: null, empty: false,
         html: false, callback: null };
      $.extend(settings, options);
      var template = dna.store.getTemplate(name);
      if (template.nested && !settings.container)
         dna.core.berserk('Container missing for nested template: ' + name);
      if (settings.empty)
         dna.empty(name);
      var list = data instanceof Array ? data : [data];
      var clones = $();
      for (var i = 0; i < list.length; i++)
         clones = clones.add(dna.core.replicate(template, list[i], i, settings));
      return clones;
      },
   cloneSubTemplate: function(holderClone, arrayField, data, options) {
      var name = dna.compile.subTemplateName(holderClone, arrayField);
      var selector = '.dna-contains-' + name;
      var settings = { container: holderClone.find(selector).addBack(selector) };
      $.extend(settings, options);
      dna.clone(name, data, settings);
      var array = dna.getModel(holderClone)[arrayField];
      function append() { array.push(this); }
      $.each(data instanceof Array ? data : [data], append);
      return holderClone;
      },
   load: function(name, url, options) {
      function processJson(data) { dna.core.unload(name, data, options); }
      return $.getJSON(url, processJson);
      },
   getModel: function(nameOrClone) {
      function getModelArray() {
         var model = [];
         dna.getClones(nameOrClone).each(
            function() { model.push($(this).data().dnaModel); });
         return model;
         }
      return nameOrClone instanceof jQuery ?
         dna.getClone(nameOrClone).data().dnaModel : getModelArray();
      },
   empty: function(name, options) {
      var settings = { fade: false };
      $.extend(settings, options);
      var clones = dna.store.getTemplate(name).container.find('.dna-clone');
      return settings.fade ? dna.ui.slideFadeDelete(clones) : clones.remove();
      },
   mutate: function(clone, data, options) {
      var settings = { html: false };
      $.extend(settings, options);
      clone = dna.getClone(clone);
      if (!data)
         data = dna.getModel(clone);
      dna.core.inject(clone, data, null, settings);
      return clone;
      },
   mutateAll: function(name) {
      function mutate() { dna.mutate($(this)); }
      return dna.getClones(name).each(mutate);
      },
   destroy: function(clone, options) {
      var settings = { fade: false };
      $.extend(settings, options);
      clone = dna.getClone(clone);
      function removeArrayItem(holder, field) {
         var arrayClones = holder.children('.' + dna.compile.subTemplateName(holder, field));
         dna.getModel(holder)[field].splice(arrayClones.index(clone), 1);
         }
      if (clone.hasClass('dna-array'))
         removeArrayItem(clone.parent(), clone.data().dnaRules.array);
      return settings.fade ? dna.ui.slideFadeDelete(clone) : clone.remove();
      },
   getClone: function(elem) {
      return elem instanceof jQuery ? elem.closest('.dna-clone') : $();
      },
   getClones: function(name) {
      return dna.store.getTemplate(name).container.children().filter('.dna-clone');
      },
   bye: function(elemOrEventOrIndex) {
      return dna.destroy(dna.ui.toElem(elemOrEventOrIndex, this), { fade: true });
      },
   registerInitializer: function(func, options) {
      var settings = { onDocumentLoad: true };
      $.extend(settings, options);
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
      console.log('~~ dns.js v0.3.0 ~~');
      console.log('templates:', names.length);
      console.log('names:', names);
      console.log('store:', dna.store.templates);
      console.log('initializers:', dna.events.initializers.length);
      return navigator.appVersion;
      }
   };

dna.util = {
   toCamel: function(codeStr) {  //example: 'ready-set-go' ==> 'readySetGo'
      function hump(match, char) { return char.toUpperCase(); }
      return ('' + codeStr).replace(/\-(.)/g, hump);
      },
   toCode: function(camelCaseStr) {  //example: 'readySetGo' ==> 'ready-set-go'
      function dash(word) { return '-' + word.toLowerCase(); }
      return ('' + camelCaseStr).replace(/([A-Z])/g, dash).replace(/\s|^-/g, '');
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
      else if (func === '' || $.inArray(typeof func, ['number', 'boolean']) !== -1)
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
      return dna.ui.toElem(elemOrEventOrIndex, this).remove();
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

dna.compile = {
   // Pre-compile  Example                           Post-compile class + data().dnaRules
   // -----------  --------------------------------  ------------------------------------
   // templates    <p id=ad class=dna-template>      class=dna-clone
   // arrays       <p data-array=~~tags~~>           class=dna-nucleotide + array='tags'
   // fields       <p>~~tag~~</p>                    class=dna-nucleotide + text='tag'
   // attributes   <p id=~~num~~>                    class=dna-nucleotide + attrs=['id', ['', 'num', '']]
   // rules        <p data-truthy=~~on~~>            class=dna-nucleotide + truthy='on'
   // attr rules   <p data-attr-src=~~url~~>         class=dna-nucleotide + attrs=['src', ['', 'url', '']]
   // prop rules   <input data-prop-checked=~~on~~>  class=dna-nucleotide + props=['checked', 'on']
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
      var elem = $(this);
      var props = [];
      var attrs = [];
      var names = [];
      function compile() {
         if ((/^data-prop-/).test(this.name))
            props.push(this.name.replace(/^data-prop-/, ''),
               this.value.replace(dna.compile.regexDnaBasePairs, ''));
         else if (this.value.split(dna.compile.regexDnaBasePair).length === 3)
            attrs.push(this.name.replace(/^data-attr-/, ''),
               this.value.split(dna.compile.regexDnaBasePair));
         else
            return;
         names.push(this.name);
         }
      $.each(elem.get(0).attributes, compile);
      if (props.length > 0)
         dna.compile.setupNucleotide(elem).data().dnaRules.props = props;
      if (attrs.length > 0)
         dna.compile.setupNucleotide(elem).data().dnaRules.attrs = attrs;
      return elem.removeAttr(names.join(' '));
      },
   getDataField: function(elem, type) {
      // Example:
      //    <p data-array=~~tags~~>, 'array'  ==>  'tags'
      return $.trim(elem.data(type).replace(dna.compile.regexDnaBasePairs, ''));
      },
   subTemplateName: function(holder, arrayField) {  //holder can be element or template name
      // Example: subTemplateName('book', 'authors') ==> 'book-authors-instance'
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
   template: function(name) {  //prepare template to be cloned
      var elem = $('#' + name);
      if (!elem.length)
         dna.core.berserk('Template not found: ' + name);
      function saveName() { $(this).data().dnaRules = { template: $(this).attr('id') }; }
      elem.find('.dna-template').addBack().each(saveName).removeAttr('id');
      var elems = elem.find('*').addBack();
      elems.filter(dna.compile.isDnaField).each(dna.compile.field);
      dna.compile.rules(elems, 'array').addClass('dna-array');
      dna.compile.rules(elems, 'class', true);
      dna.compile.rules(elems, 'require');
      dna.compile.rules(elems, 'missing');
      dna.compile.rules(elems, 'truthy');
      dna.compile.rules(elems, 'falsey');
      elems.each(dna.compile.propsAndAttrs);
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
            name:      name,
            elem:      elem,
            container: elem.parent().addClass('dna-container').addClass('dna-contains-' + name),
            nested:    elem.parent().closest('.dna-clone').length !== 0,
            index:     elem.index(),
            clones:    0
            };
         dna.store.templates[name] = template;
         elem.removeClass('dna-template').addClass('dna-clone').addClass(name).detach();
         }
      function prepLoop() {
         // Pre (sub-template array loops -- data-array):
         //    class=dna-array data().dnaRules.array='field'
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
      elem.find('.dna-array').each(prepLoop).each(move);
      return dna.store.templates[name];
      },
   getTemplate: function(name) {
      return dna.store.templates[name] || dna.compile.template(name);
      }
   };

dna.events = {
   initializers: [],  //example: [{ func: 'app.bar.setup', selector: '.progress-bar' }]
   elementSetup: function(root, data) {
      // Example (outside of template):
      //    <p class=dna-setup data-setup=app.cart.setup>
      // Example (within template):
      //    <select data-setup=app.dropDown.setup>
      function setup() { dna.util.apply($(this).data().setup, [$(this), data]); }
      var selector = '[data-setup]';
      var elems = root ? root.find(selector).addBack(selector) : $('.dna-setup');
      return elems.each(setup).addClass('dna-initialized');
      },
   runInitializers: function(elem, data) {
      // Executes both the data-setup functions and the registered initializers
      dna.events.elementSetup(elem, data);
      function init() { dna.util.apply(this.func, [(this.selector ?
         elem.find(this.selector).addBack(this.selector) : elem).addClass('dna-initialized')]
            .concat(this.params)); }
      $.each(dna.events.initializers, init);
      return elem;
      },
   runner: function(elem, type, event) {
      // Finds elements for given type and executes callback passing in the element and the event
      // Types: click|change|key-up|key-down|key-press|enter-key
      elem = elem.closest('[data-' + type + ']');
      return dna.util.apply(elem.data(type), [elem, event]);
      },
   handle: function(event) {
      return dna.events.runner($(event.target), event.type.replace('key', 'key-'), event);
      },
   handleEnterKey: function(event) {
      return event.which === 13 ? dna.events.runner($(event.target), 'enter-key', event) : null;
      },
   setup: function() {
      $(document)
         .click(dna.events.handle)
         .change(dna.events.handle)
         .keyup(dna.events.handle)
         .keyup(dna.events.handleEnterKey)
         .keydown(dna.events.handle)
         .keypress(dna.events.handle);
      dna.events.elementSetup();
      }
   };

$(dna.events.setup);

dna.core = {
   inject: function(clone, data, index, settings) {
      // Inserts data into clone and runs rules
      function injectField(elem, field) {
         var value = typeof data === 'object' ? dna.util.value(data, field) :
            field === '[count]' ? index + 1 : field === '[value]' ? data : null;
         var printableTypes = ['string', 'number', 'boolean'];
         function printable(value) { return $.inArray(typeof value, printableTypes) !== -1; }
         if (printable(value))
            elem = settings.html ? elem.html(value) : elem.text(value);
         }
      function injectProps(elem, props) {
         for (var x = 0; x < props.length / 2; x++)
            elem.prop(props[x*2], dna.util.realTruth(dna.util.value(data, props[x*2 + 1])));
         }
      function injectAttrs(elem, attrs) {
         for (var x = 0; x < attrs.length / 2; x++) {
            var attr = attrs[x*2];
            var parts = attrs[x*2 + 1];  //ex: 'J~~code.num~~' --> ['J', 'code.num', '']
            var value = [parts[0], dna.util.value(data, parts[1]), parts[2]].join('');
            elem.attr(attr, value);
            if (attr === 'value')
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
            dna.clone(loop.name, dataArray, { container: elem });
         else
            data[loop.field] = [];
         }
      function process() {
         var elem = $(this);
         var dnaRules = elem.data().dnaRules;
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
         }
      clone.find('.dna-array').remove();
      clone.find('.dna-nucleotide').addBack('.dna-nucleotide').each(process);
      clone.data().dnaModel = data;
      return clone;
      },
   replicate: function(template, data, index, settings) {  //make and setup the clone
      function addSeparators() {
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
      container[settings.top ? 'prepend' : 'append'](clone);
      if (true || template.hasSeparators)  //TODO: optimize by setting hasSeparators during compile
         addSeparators();
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
   berserk: function(message) {  //oops, file a tps report
      throw 'dna.js error -> ' + message;
      }
   };
