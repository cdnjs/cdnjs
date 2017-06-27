// dna.js Template Cloner ~~ v0.2.2
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
      // Example true values:  true,  7, '7', [5], 't', 'T', 'TRue',  {},   'Colbert'
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
   // Pre-compile  Example                           Post-compile class + data().dnaRules
   // -----------  --------------------------------  -------------------------------
   // templates    <p id=ad class=dna-template>      class=dna-clone
   // arrays       <p data-dna-array=~~tags~~>       class=dna-nucleotide + array='tags'
   // fields       <p>~~tag~~</p>                    class=dna-nucleotide + text='tag'
   // attributes   <p id=~~num~~>                    class=dna-nucleotide + attrs=['id', ['', 'num', '']]
   // rules        <p data-dna-truthy=~~on~~>        class=dna-nucleotide + truthy='on'
   // attr rules   <p data-dna-attr-src=~~url~~>     class=dna-nucleotide + attrs=['src', ['', 'url', '']]
   // prop rules   <input data-dna-prop-checked=~~on~~>  class=dna-nucleotide + props=['checked', 'on']
   //
   // Rules                                          data().dnaRules
   // ---------------------------------------------  ----------
   // data-dna-class=~~field,name-true,name-false~~  class=['field','name-true','name-false']
   // data-dna-attr-{NAME}=pre~~field~~post          attrs=['{NAME}', ['pre', 'field', 'post']]
   // data-dna-prop-{NAME}=pre~~field~~post          props=['{NAME}', 'field']
   // data-dna-require=~~field~~                     require='field'
   // data-dna-missing=~~field~~                     missing='field'
   // data-dna-truthy=~~field~~                      truthy='field'
   // data-dna-falsey=~~field~~                      falsey='field'
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
      //    <option data-dna-prop-selected=~~set~~>  ==>  <option class=dna-nucleotide + data-dnaRules={ props: ['selected', 'set'] }>
      //    <p id=~~num~~>                 ==>  <p class=dna-nucleotide + data-dnaRules={ attrs: ['id', ['', 'num', '']] }>
      //    <p data-dna-attr-src=~~url~~>  ==>  <p class=dna-nucleotide + data-dnaRules={ attrs: ['src', ['', 'url', '']] }>
      var elem = $(this);
      var props = [];
      var attrs = [];
      function compile() {
         if ((/^data-dna-prop-/).test(this.name))
            props.push(this.name.replace(/^data-dna-prop-/, ''),
               this.value.replace(dna.compile.regexDnaBasePairs, ''));
         else if (this.value.split(dna.compile.regexDnaBasePair).length === 3)
            attrs.push(this.name.replace(/^data-dna-attr-/, ''),
               this.value.split(dna.compile.regexDnaBasePair));
         //TODO: handle data-dna-array data-dna-prop-{NAME} plus removeAttr(data-dna-attr-*)
         }
      $.each(elem.get(0).attributes, compile);
      if (props.length > 0)
         dna.compile.setupNucleotide(elem).data().dnaRules.props = props;
      if (attrs.length > 0)
         dna.compile.setupNucleotide(elem).data().dnaRules.attrs = attrs;
      return elem;
      },
   getDataField: function(elem, type) {
      // Example:
      //    <p dna-array=~~tags~~>, 'array'  ==>  'tags'
      return $.trim(elem.data('dna-' + type).replace(dna.compile.regexDnaBasePairs, ''));
      },
   rules: function(elems, type, isList) {
      // Example:
      //    <p data-dna-require=~~title~~>, 'require'  ==>  <p data-dnaRules={ require: 'title' }>
      function add() {
         var elem = dna.compile.setupNucleotide($(this));
         var field = dna.compile.getDataField(elem, type);
         elem.data().dnaRules[type] = isList ? field.split(',') : field;
         }
      return elems.filter('[data-dna-' + type + ']').each(add).removeAttr('data-dna-' + type);
      },
   template: function(name) {  //prepare template to be cloned
      var elem = $('#' + name);
      if (!elem.length)
         dna.core.berserk('Template not found: ' + name);
      function saveName() { $(this).data().dnaRules = { template: $(this).attr('id') }; }
      elem.find('.dna-template').addBack().each(saveName);
      var elems = elem.find('*').addBack();
      elems.filter(dna.compile.isDnaField).each(dna.compile.field);
      dna.compile.rules(elems, 'array').addClass('dna-array');
      dna.compile.rules(elems, 'class', true);
      dna.compile.rules(elems, 'require');
      dna.compile.rules(elems, 'missing');
      dna.compile.rules(elems, 'truthy');
      dna.compile.rules(elems, 'falsey');
      elems.each(dna.compile.propsAndAttrs).removeAttr('id');
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
         // Pre (sub-template array loops -- data-dna-array):
         //    class=dna-array data().dnaRules.array='field'
         // Post (elem):
         //    data().dnaRules.template='{NAME}-{FIELD}-instance'
         // Post (container)
         //    class=dna-nucleotide + data().dnaRules.loop={ name: '{NAME}-{FIELD}-instance', field: 'field' }
         var elem = $(this);
         var field = elem.data().dnaRules.array;
         var sub = name + '-' + field + '-instance';
         dna.compile.setupNucleotide(elem.parent()).data().dnaRules.loop = { name: sub, field: field };
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
   runner: function(elem, eventType) {
      // Finds elements for eventType (click|change) and executes callback
      elem = elem.closest('[data-dna-' + eventType + ']');
      return dna.util.call(elem.data('dna-' + eventType), elem);
      },
   handleClick: function(event) {
      return dna.events.runner($(event.target), 'click');
      },
   handleChange: function(event) {
      return dna.events.runner($(event.target), 'change');
      },
   setup: function() {
      $(document).click(dna.events.handleClick).change(dna.events.handleChange);
      }
   };

$(dna.events.setup);

dna.core = {
   inject: function(clone, data, count, settings) {
      // Inserts data into clone and runs rules
      function injectField(elem, field) {
         var value = typeof data === 'object' ? dna.util.value(data, field) :
            field === '[count]' ? count : field === '[value]' ? data : null;
         var printableTypes = ['string', 'number', 'boolean'];
         function printable(value) { return printableTypes.indexOf(typeof value) !== -1; }
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
      return clone.data('dna-model', data);
      },
   replicate: function(template, data, count, settings) {  //make and setup the clone
      var clone = template.elem.clone(true, true);
      template.clones++;
      dna.core.inject(clone, data, count, settings);
      var selector = '.dna-contains-' + template.name;
      var container = settings.container ?
         settings.container.find(selector).addBack(selector) : template.container;
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
      var settings = { fade: false, top: false, container: null, empty: false,
         html: false, callback: null };
      $.extend(settings, options);
      var template = dna.store.getTemplate(name);
      if (template.nested && !settings.container)
         dna.core.berserk('Container missing for nested template: ' + name);
      if (settings.empty)
         dna.api.empty(name);
      var list = data instanceof Array ? data : [data];
      var clones = $();
      for (var i = 0; i < list.length; i++)
         clones = clones.add(dna.core.replicate(template, list[i], i + 1, settings));
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
      console.log('~~ dns.js v0.2.2 ~~');
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
