// dna.js Template Cloner ~~ v0.1.6
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
   value: function(data, fields) {  //example: { a: { b: 7 }}, 'a.b' ==> 7
      if (typeof fields === 'string')
         fields = fields.split('.');
      return (data === null || data === undefined || fields === undefined) ? null :
         (fields.length === 1 ? data[fields[0]] : this.value(data[fields[0]], fields.slice(1)));
      },
   call: function(fnName, elem) {  //example: 'app.cart.buy' ==> window['app']['cart']['buy'](elem);
      function contextCall(obj, names) {
         if (!obj)
            dna.core.berserk('Invalid name before "' + names[0] + '" in: ' + fnName);
         else if (names.length == 1)
            obj[names[0]](elem);
         else
            contextCall(obj[names[0]], names.slice(1));
         }
      if (fnName && elem.length)
         contextCall(window, fnName.split('.'));
      },
   apply: function(elem, selector, func, param) {  //calls func for each element (param is optional)
      elem.find(selector).addBack(selector).each(func);
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
      },
   getDataField: function(elem, type) {
      return $.trim(elem.data('dna-' + type)
         .replace(dna.compile.regexDnaBasePairs, ''));
      },
   addDataToElems: function(elems, type) {
      // Example with "require" type:
      //    data-dna-require=~~title~~  ==>  data-dna-model = { require: "title" }
      function add() {
         var elem = $(this);
         var dnaData = elem.data('dna-model') ? elem.data('dna-model') : {};
         dnaData[type] = dna.compile.getDataField(elem, type);
         elem.data('dna-model', dnaData).addClass('dna-data');
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
      template.elem.removeClass('dna-template').addClass('dna-clone').addClass(template.name);
      template.compiled = true;
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
         var dnaData = holder.data('dna-model') ? elem.data('dna-model') : {};
         dnaData.array = dna.compile.getDataField(elem, 'array');
         holder.data('dna-model', dnaData).addClass('dna-data');
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
      dna.store.stash($(this).attr('id'), true);
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

dna.core = {
   inject: function(clone, data, count, settings) {  //insert data into new clone
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
      if (dataArray)
         dna.clone(templateName, dataArray, { holder: holder });
      },
   processElem: function(elem, data) {
      var dnaData = elem.data('dna-model');
      function processClass() { elem.addClass(dna.util.value(data, this)); }
      if (dnaData['class'])
         $.each(('' + dnaData['class']).split(','), processClass);
      if (dnaData.require)
         elem.toggle(dna.util.value(data, dnaData.require) !== undefined);
      if (dnaData.missing)
         elem.toggle(dna.util.value(data, dnaData.missing) === undefined);
      if (dnaData.array)
         dna.core.cloneSubTemplate(elem, data[elem.data('dna-model').array]);
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
      if (settings.task)  //DEPRECATED
         settings.task(clone, data);
      if (settings.fade)
         clone.hide().fadeIn();
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
         task: null,  //DEPRECATED
         html: false, callback: null };
      $.extend(settings, options);
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
      $.getJSON(url, processJson);
      },
   empty: function(name, options) {
      var settings = { fade: false };
      $.extend(settings, options);
      var clones = dna.store.getTemplate(name).container.find('.dna-clone');
      function deleteElem() { $(this).remove(); }
      if (settings.fade)
         clones.fadeOut('normal', deleteElem);
      else
         clones.remove();
      return clones;
      },
   mutate: function(clone, data, options) {
      var settings = { html: false };
      $.extend(settings, options);
      dna.core.inject(clone, data, null, settings);
      function process() { dna.core.processElem($(this), data); }  //TODO: verify it's ok to processElem when mutating (not just initial cloning)
      clone.find('.dna-data').addBack('.dna-data').each(process);
      },
   info: function() {
      console.log('~~ dns.js v0.1.6 ~~');
      console.log('count:', Object.keys(dna.store.templates).length);
      console.log('names:', Object.keys(dna.store.templates));
      console.log('templates:', dna.store.templates);
      return navigator.appVersion;
      }
   };

dna.clone =  dna.api.clone;
dna.load =   dna.api.load;
dna.empty =  dna.api.empty;
dna.mutate = dna.api.mutate;
dna.info =   dna.api.info;
