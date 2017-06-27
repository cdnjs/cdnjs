// dna.js Template Cloner ~~ v0.2.1
// MIT/GPLv3 ~~ dnajs.org/license.html
// Copyright (c) 2013-2014 Center Key Software and other contributors

var dna = {};

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
      // Example true values:  true,  7, '7', [5], 't', 'T', 'TRue',  {}
      // Example false values: false, 0, '0', [],  'f', 'F', 'faLSE', null, undefined, NaN
      function falseyStr() { return /^(f|false|0)$/i.test(value); }
      function emptyArray() { return value instanceof Array && value.length === 0; }
      return value ? !emptyArray() && !falseyStr() : false;
      },
   call: function(func, param) {  //calls func (string name or actual function) passing in param
      // Example: dna.util.call('app.cart.buy', 7); ==> app.cart.buy(7);
      function contextCall(obj, names) {
         if (!obj)
            dna.core.berserk('Invalid name before "' + names[0] + '" in: ' + func);
         else if (names.length == 1)
            obj[names[0]](param);  //'app.cart.buy' -> window['app']['cart']['buy'](param);
         else
            contextCall(obj[names[0]], names.slice(1));
         }
      if (typeof(func) === 'string')
         contextCall(window, func.split('.'));
      else if (func instanceof Function)
         func(param);
      return param;
      },
   apply: function(elem, selector, func, param) {  //calls func for each element (param is optional)
      return elem.find(selector).addBack(selector).each(func);
      },
   toElem: function(elemOrEventOrIndex, that) {
      return elemOrEventOrIndex instanceof jQuery ? elemOrEventOrIndex :
         elemOrEventOrIndex.target ? $(elemOrEventOrIndex.target) : $(that);
      },
   deleteElem: function() {  //example: $('.box').fadeOut(dna.util.deleteElem);
      return $(this).remove();
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
      return dna.util.slideFade(elem, callback, true);
      },
   slideFadeOut: function(elem, callback) {
      return dna.util.slideFade(elem, callback, false);
      },
   slideFadeToggle: function(elem, callback) {
      return dna.util.slideFade(elem, callback, !elem.is(':visible'));
      },
   slideFadeDelete: function(elem) {
      return dna.util.slideFadeOut(elem, dna.util.deleteElem);
      }
   };

dna.compile = {
   // Pre-compile                             Post-compile class + data
   // -----------                             --------------------------
   // class=dna-template                 -->  dna-clone
   // <span>~~field~~</span>             -->  dna-field + data.dna-field='field'
   // <span>~~field~~</span>             -->  dna-data +  data.dna.text='field'  ***WIP***
   // id=pre~~field~~post                -->  dna-attr +  data.dna=['id', ['pre', 'field', 'post']]
   // data-dna-attr-id=pre~~field~~post  -->  dna-attr +  data.dna=['id', ['pre', 'field', 'post']]
   // id=pre~~field~~post                -->  dna-data +  data.dna.attr=['id', ['pre', 'field', 'post']]  ***WIP***
   // data-dna-attr-id=pre~~field~~post  -->  dna-data +  data.dna.attr=['id', ['pre', 'field', 'post']]  ***WIP***
   // data-dna-class=~~field1,field2~~   -->  dna-data +  data.dna.class='field1,field2'
   // data-dna-require=~~field~~         -->  dna-data +  data.dna.require='field'
   // data-dna-missing=~~field~~         -->  dna-data +  data.dna.missing='field'
   // data-dna-truthy=~~field~~          -->  dna-data +  data.dna.truthy='field'
   // data-dna-falsey=~~field~~          -->  dna-data +  data.dna.falsey='field'
   regexDnaField: /^[\s]*(~~|\{\{).*(~~|\}\})[\s]*$/,  //example: ~~title~~
   regexDnaBasePair: /~~|{{|}}/,  //matches the '~~' string
   regexDnaBasePairs: /~~|\{\{|\}\}/g,  //matches the two '~~' strings so they can be removed
   isDnaField: function() {
      var firstNode = $(this)[0].childNodes[0];
      return firstNode && firstNode.nodeValue &&
         firstNode.nodeValue.match(dna.compile.regexDnaField);
      },
   field: function() {
      var elem = $(this);
      elem.addClass('dna-field').data('dna-field',
         $.trim(elem.text()).replace(dna.compile.regexDnaBasePairs, '')).empty();
      return elem;
      },
   attrs: function() {
      var elem = $(this);
      var list = [];
      function compile() {
         if (this.value.split(dna.compile.regexDnaBasePair).length === 3)
            list.push(this.name.replace(/^data-dna-attr-/, ''),
               this.value.split(dna.compile.regexDnaBasePair));
         }
      $.each(elem.get(0).attributes, compile);
      if (list.length > 0)
         elem.addClass('dna-attr').data('dna', list);
      return elem;
      },
   getDataField: function(elem, type) {
      return $.trim(elem.data('dna-' + type)
         .replace(dna.compile.regexDnaBasePairs, ''));
      },
   addDataToElems: function(elems, type) {
      // Example with "require" type:
      //    data-dna-require=~~title~~  ==>  data-dna-rules = { require: "title" }
      function add() {
         var elem = $(this);
         var dnaData = elem.data('dna-rules') ? elem.data('dna-rules') : {};
         dnaData[type] = dna.compile.getDataField(elem, type);
         elem.data('dna-rules', dnaData).addClass('dna-data');
         }
      return elems.filter('[data-dna-' + type + ']').each(add);
      },
   template: function(template) {  //prepare template to be cloned
      var elems = template.elem.find('*').addBack();
      elems.filter(dna.compile.isDnaField).each(dna.compile.field);
      elems.each(dna.compile.attrs);
      dna.compile.addDataToElems(elems, 'class');
      dna.compile.addDataToElems(elems, 'require');
      dna.compile.addDataToElems(elems, 'missing');
      dna.compile.addDataToElems(elems, 'truthy');
      dna.compile.addDataToElems(elems, 'falsey');
      template.elem.removeClass('dna-template').addClass('dna-clone').addClass(template.name);
      template.compiled = true;
      return template;
      }
   };

dna.store = {
   // Handles storage and retrieval of templates
   templates: {},
   stash: function(name, isNested) {
      var elem = $('#' + name);
      function stashSubTemplate() {
         var elem = $(this);
         var holder = elem.parent();
         var dnaData = holder.data('dna-rules') ? elem.data('dna-rules') : {};
         dnaData.array = dna.compile.getDataField(elem, 'array');
         holder.data('dna-rules', dnaData).addClass('dna-data');
         holder.data('dna-array-index', elem.index());
         elem.attr('id', name + '-' + dnaData.array + '-instance');
         }
      if (!isNested) {
         elem.find('[data-dna-array]').addClass('dna-template').each(stashSubTemplate);
         elem.find('.dna-template').each(dna.store.stashNested);
         }
      if (elem.hasClass('dna-template'))
         dna.store.templates[name] = {
            name:      name,
            elem:      elem,
            container: elem.parent().addClass('dna-contains-' + name).data('dna-contains', name),
            compiled:  false,
            clones:    0
            };
      elem.removeAttr('id').detach();
      return dna.store.templates[name];
      },
   stashNested: function() {
      return dna.store.stash($(this).attr('id'), true);
      },
   getTemplate: function(name) {
      var template = dna.store.templates[name] || dna.store.stash(name);
      if (!template)
         dna.core.berserk('Template not found: ' + name);
      if (!template.compiled)
         dna.compile.template(template);
      return template;
      }
   };

dna.events = {
	ready: false,
	runner: function(elem, type) {
	   elem = elem.closest('[data-dna-' + type + ']');
      return dna.util.call(elem.data('dna-' + type), elem);
	   },
	click: function(event) {
	   return dna.events.runner($(event.target), 'click');
	   },
	change: function(event) {
	   return dna.events.runner($(event.target), 'change');
	   },
   setup: function() {
      $(document).click(dna.events.click).change(dna.events.change);
      dna.events.ready = true;
      }
   };

dna.core = {
   inject: function(clone, data, count, settings) {  //insert data into new clone
      clone.data('dna-model', data);
      function injectField() {
         var elem = $(this);
         var field = elem.data('dna-field');
         var value = typeof data === 'object' ? dna.util.value(data, field) :
            field === '[count]' ? count : field === '[value]' ? data : null;
         function printable(value) {
            return ['string', 'number', 'boolean'].indexOf(typeof value) !== -1;
            }
         if (printable(value))
            elem = settings.html ? elem.html(value) : elem.text(value);
         }
      dna.util.apply(clone, '.dna-field', injectField);
      var list, attr, parts, value;
      function injectAttr() {
         var elem = $(this);
         list = $(this).data('dna');
         for (var x = 0; x < list.length / 2; x++) {
            attr = list[x*2];
            parts = list[x*2 + 1];  //ex: 'J~~code.num~~' --> ['J', 'code.num', '']
            value = [parts[0], dna.util.value(data, parts[1]), parts[2]].join('');
            elem.attr(attr, value);
            if (attr === 'value')
               elem.val(value);
            }
         }
      dna.util.apply(clone, '.dna-attr', injectAttr);
      },
   cloneSubTemplate: function(holder, dataArray) {
      var templateName = holder.data('dna-contains');
      holder.find('.' + templateName).remove();
      if (dataArray)
         dna.clone(templateName, dataArray, { holder: holder });
      },
   processElem: function(elem, data) {
      var dnaData = elem.data('dna-rules');
      function processClass() { elem.addClass(dna.util.value(data, this)); }
      if (dnaData['class'])
         $.each(('' + dnaData['class']).split(','), processClass);
      if (dnaData.require)
         elem.toggle(dna.util.value(data, dnaData.require) !== undefined);
      if (dnaData.missing)
         elem.toggle(dna.util.value(data, dnaData.missing) === undefined);
      if (dnaData.truthy)
         elem.toggle(dna.util.realTruth(dna.util.value(data, dnaData.truthy)));
      if (dnaData.falsey)
         elem.toggle(!dna.util.realTruth(dna.util.value(data, dnaData.falsey)));
      if (dnaData.array)
         dna.core.cloneSubTemplate(elem, data[elem.data('dna-rules').array]);
      return elem;
      },
   replicate: function(template, data, count, settings) {  //make and setup the clone
      var clone = template.elem.clone(true, true);
      template.clones++;
      dna.core.inject(clone, data, count, settings);
      function process() { dna.core.processElem($(this), data); }
      clone.find('.dna-data').addBack('.dna-data').each(process);
      var selector = '.dna-contains-' + template.name;
      var container = settings.holder ?  //TODO: switch to '[dna-contains=' + template.name + ']'
         settings.holder.find(selector).addBack(selector) : template.container;
      container[settings.top ? 'prepend' : 'append'](clone);
      if (settings.callback)
         settings.callback(clone, data);
      if (settings.fade)
         dna.util.slideFadeIn(clone);
      return clone;
      },
   unload: function(name, data, options) {  //use rest data to make clone
      if (!data.error)
         dna.api.clone(name, data, options);
      },
   berserk: function(message) {  //oops, file a tps report
      throw 'dna.js error -> ' + message;
      }
   };

dna.api = {  //see: http://dnajs.org/manual.html#api
   clone: function(name, data, options) {
      var settings = { fade: false, top: false, holder: null, empty: false,
         html: false, callback: null };
      $.extend(settings, options);
      if (!dna.events.ready)
         dna.events.setup();
      var template = dna.store.getTemplate(name);
      if (settings.empty)
         dna.api.empty(name);
      var list = data instanceof Array ? data : [data];
      var clones = $();
      for (var index = 0; index < list.length; index++)
         clones = clones.add(dna.core.replicate(template, list[index], index + 1, settings));
      return clones;
      },
   load: function(name, url, options) {
      function processJson(data) { dna.core.unload(name, data, options); }
      return $.getJSON(url, processJson);
      },
   getModel: function(nameOrClone) {
      function getModelArray() {
         var model = [];
         dna.getClones(nameOrClone).each(
            function() { model.push($(this).data('dna-model')); });
         return model;
         }
      return nameOrClone instanceof jQuery ?
         dna.getClone(nameOrClone).data('dna-model') : getModelArray();
      },
   empty: function(name, options) {
      var settings = { fade: false };
      $.extend(settings, options);
      var clones = dna.store.getTemplate(name).container.find('.dna-clone');
      return settings.fade ? dna.util.slideFadeDelete(clones) : clones.remove();
      },
   mutate: function(clone, data, options) {
      var settings = { html: false };
      $.extend(settings, options);
      clone = dna.getClone(clone);
      if (!data)
         data = dna.getModel(clone);
      dna.core.inject(clone, data, null, settings);
      function process() { dna.core.processElem($(this), data); }  //TODO: verify it's ok to processElem when mutating (not just initial cloning)
      clone.find('.dna-data').addBack('.dna-data').each(process);
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
      return settings.fade ? dna.util.slideFadeDelete(clone) : clone.remove();
      },
   getClone: function(elem) {
      return elem instanceof jQuery ? elem.closest('.dna-clone') : $();
      },
   getClones: function(name) {
      return dna.store.getTemplate(name).container.children().filter('.dna-clone');
      },
   bye: function(elemOrEventOrIndex) {
      return dna.destroy(dna.util.toElem(elemOrEventOrIndex, this), { fade: true });
      },
   info: function() {
      console.log('~~ dns.js v0.2.1 ~~');
      console.log('count:', Object.keys(dna.store.templates).length);
      console.log('names:', Object.keys(dna.store.templates));
      console.log('templates:', dna.store.templates);
      return navigator.appVersion;
      }
   };

dna.clone =     dna.api.clone;
dna.load =      dna.api.load;
dna.getModel =  dna.api.getModel;
dna.empty =     dna.api.empty;
dna.mutate =    dna.api.mutate;
dna.mutateAll = dna.api.mutateAll;
dna.destroy =   dna.api.destroy;
dna.getClone =  dna.api.getClone;
dna.getClones = dna.api.getClones;
dna.bye =       dna.api.bye;
dna.info =      dna.api.info;
