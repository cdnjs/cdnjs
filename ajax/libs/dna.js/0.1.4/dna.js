// dna.js Template Cloner ~~ v0.1.4
// MIT/GPLv3 ~~ dnajs.org/license.html
// Copyright (c) 2013-2014 Center Key Software and other contributors

var dna = {};

dna.util = {
   value: function(data, fields) {  //example: { a: { b: 7 }}, 'a.b' --> 7
      if (typeof fields === 'string')
         fields = fields.split('.');
      return (data === null || data === undefined || fields === undefined) ? null :
         (fields.length === 1 ? data[fields[0]] : this.value(data[fields[0]], fields.slice(1)));
      },
   findAll: function(elem, selector) {  //returns selected elements including nested elements
      return elem.find(selector).addBack(selector);
      },
   apply: function(elem, selector, func) {  //calls func for each element
      dna.util.findAll(elem, selector).each(func);
      }
   };

dna.compile = {
   // Pre-compile                        Post-compile class + data
   // -----------                        --------------------------
   // class=dna-template            -->  dna-clone
   // <span>~~field~~</span>        -->  dna-field + data.dna-field='field'
   // id=pre~~field~~post           -->  dna-attr +  data.dna=['id', ['pre', 'field', 'post']]
   // data-dna-attr-id=~~field~~    -->  dna-attr +  data.dna=['id', ['pre', 'field', 'post']]
   // data-dna-add-class=~~field~~  -->  dna-class + data.dna-class=['field']
   // data-dna-require=~~field~~    -->  dna-require
   // data-dna-missing=~~field~~    -->  dna-missing
   regexDnaField: /^[\s]*(~~|\{\{).*(~~|\}\})[\s]*$/,  //example: ~~title~~
   regexDnaBasePair: /~~|{{|}}/,  //matches the '~~' string
   regexDnaBasePairs: /~~|\{\{|\}\}/g,  //matches the two '~~' strings so they can be removed
   isDnaField: function() {
      var firstNode = $(this)[0].childNodes[0];
      return firstNode && firstNode.nodeValue &&
         firstNode.nodeValue.match(dna.compile.regexDnaField);
      },
   fieldElem: function() {
      $(this).addClass('dna-field').data('dna-field',
         $.trim($(this).text()).replace(dna.compile.regexDnaBasePairs, '')).empty();
      },
   attrElem: function() {
      var list = [];
      $.each(this.attributes, function() {
         if (this.value.split(dna.compile.regexDnaBasePair).length === 3)
            list.push(this.name.replace(/^data-dna-attr-/, ''),
               this.value.split(dna.compile.regexDnaBasePair));
         });
      if (list.length > 0)
         $(this).addClass('dna-attr').data('dna', list);
      },
   classElem: function() {
      var list = $(this).data('dna-add-class').split(',');
      $(this).addClass('dna-class').data('dna-class', list);
      },
   template: function(template) {  //prepare template to be cloned
      var elems = template.elem.find('*').addBack();
      elems.filter(dna.compile.isDnaField).each(dna.compile.fieldElem);
      elems.each(dna.compile.attrElem);
      elems.filter('[data-dna-add-class]').each(dna.compile.classElem);
      elems.filter('[data-dna-require]').addClass('dna-require');
      elems.filter('[data-dna-missing]').addClass('dna-missing');
      template.elem.removeClass('dna-template').addClass('dna-clone');
      template.compiled = true;
      }
   };

dna.store = {
   // Handles storage and retrieval of templates
   templates: {},
   stash: function(name, isNested) {
      var elem = $('#' + name);
      if (!isNested) {
         elem.find('[data-dna-array]').addClass('dna-template').each(function () {
            var elem = $(this);
            elem.attr('id', name + '-array-' + elem.data('dna-array'));
            elem.parent().addClass('dna-array').data('dna-array-field',
               $(this).data('dna-array')).data('dna-array-insert', elem.index());  //note: index not implemented yet
            });
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
   inject: function(clone, data, settings) {  //insert data into new clone
      dna.util.apply(clone, '.dna-field', function() {
         var value = dna.util.value(data, $(this).data('dna-field'));
         if (typeof value === 'string')
            var x = settings.html ? $(this).html(value) : $(this).text(value);
         });
      var list, attr, parts, value;
      dna.util.apply(clone, '.dna-attr', function() {
         list = $(this).data('dna');
         for (var x = 0; x < list.length / 2; x++) {
            attr = list[x*2];
            parts = list[x*2 + 1];  //ex: 'J~~code.num~~' --> ['J', 'code.num', '']
            value = [parts[0], dna.util.value(data, parts[1]), parts[2]].join('');
            $(this).attr(attr, value);
            if (attr === 'value')
               $(this).val(value);
            }
         });
      dna.util.apply(clone, '.dna-class', function() {
         list = $(this).data('dna-class');
         for (var i = 0; i < list.length; i++)
            $(this).addClass(dna.util.value(data, list[i]));
         });
      dna.util.apply(clone, '.dna-array', function() {
         var holder = $(this);
         var templateName = holder.data('dna-contains');
         var dataArray = data[holder.data('dna-array-field')];
         if (dataArray)
            dna.clone(templateName, dataArray, { holder: $(this) });
         });
      },
   thimblerig: function(clone, data) {  //apply logic to hide specific elements
      dna.util.apply(clone, '.dna-require', function() {
         $(this).toggle(dna.util.value(data, $(this).data('dna-require')) !== undefined);
         });
      dna.util.apply(clone, '.dna-missing', function() {
         $(this).toggle(dna.util.value(data, $(this).data('dna-missing')) === undefined);
         });
      },
   replicate: function(template, data, settings) {  //make and setup the clone
      var clone = template.elem.clone(true, true);
      template.clones++;
      dna.core.inject(clone, data, settings);
      dna.core.thimblerig(clone, data);
      var container = settings.holder ? dna.util.findAll(settings.holder,
         '.dna-contains-' + template.name) : template.container;  //TODO: switch to '[dna-contains=' + template.name + ']'
      if (settings.top)
         container.prepend(clone);
      else
         container.append(clone);
      if (settings.task)
         settings.task(clone, data);
      if (settings.fade)
         clone.hide().fadeIn();
      return clone;
      },
   unload: function(name, data, options) {  //use rest data to make clone
      if (!data.error)
         dna.api.clone(name, data, options);
      },
   berserk: function(msg) {  //oops, file a tps report
      throw 'dna.js error -> ' + msg;
      }
   };

dna.api = {  //see: http://dnajs.org/manual.html#api
   clone: function(name, data, options) {
      var settings = { fade: false, top: false, holder: null, empty: false,
         html: false, task: null };
      $.extend(settings, options);
      var template = dna.store.getTemplate(name);
      if (settings.empty)
         dna.api.empty(name);
      var list = data instanceof Array ? data : [data];
      var clones = $();
      for (var count = 0; count < list.length; count++)
         clones = clones.add(dna.core.replicate(template, list[count], settings));
      return clones;
      },
   load: function(name, url, options) {
      $.getJSON(url, function(data) { dna.core.unload(name, data, options); });
      },
   empty: function(name, options) {
      var settings = { fade: false };
      $.extend(settings, options);
      var clones = dna.store.getTemplate(name).container.find('.dna-clone');
      if (settings.fade)
         clones.fadeOut('normal', function() { $(this).remove(); });
      else
         clones.remove();
      return clones;
      },
   mutate: function(clone, data, options) {
      var settings = { html: false };
      $.extend(settings, options);
      dna.core.inject(clone, data, settings);
      },
   info: function() {
      console.log('~~ dns.js v0.1.4 ~~');
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
