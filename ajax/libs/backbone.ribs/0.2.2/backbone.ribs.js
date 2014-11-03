//     Backbone.Ribs.js 0.2.2

//     (c) 2014 Valeriy Zaytsev
//     Ribs may be freely distributed under the MIT license.
//     For all details and documentation:
//     https://github.com/ZaValera/backbone.ribs

(function(root, factory) {

    if (typeof exports !== 'undefined') {
        // Define as CommonJS export:
        module.exports = factory(require('underscore'), require('backbone'));
    } else if (typeof define === 'function' && define.amd) {
        // Define as AMD:
        define(['underscore', 'backbone'], factory);
    } else {
        // Just run it:
        factory(root._, root.Backbone);
    }

}(this, function(_, Backbone) {
    var Ribs = Backbone.Ribs = {
        version: '0.2.2'
    };

    var _super = function (self, method, args) {
        return self._super.prototype[method].apply(self, args);
    };

    var _split = function (str) {
        if (str.indexOf('!.') === -1) {
            return str.split('.');
        }

        var path = [],
            item = '',
            ch = str.charAt(0),
            pch;

        for (var i = 0, l = str.length; i < l; i++) {
            nch = str.charAt(i + 1);

            if (ch === '.' && pch === '!') {
                item += '.';
            } else if (ch === '.' && pch !== '!') {
                path.push(item);
                item = '';
            } else if (ch !== '!' || nch !== '.') {
                item += ch;
            }

            pch = ch;
            ch = nch;
        }

        path.push(item);

        return path;
    };

    var getPath = function (path, obj) {
        var p;

        if (typeof path === 'string') {
            path = _split(path);
        } else {
            path = path.slice();
        }

        while (path.length) {
            p = path.shift();

            if (obj.hasOwnProperty(p)) {
                obj = obj[p];
            } else {
                if (path.length) {
                    throw new Error('can\'t get "' + path.shift() + '" of "' + p + '", "' + p +'" is undefined');
                } else {
                    return undefined;
                }
            }
        }

        return obj;
    };

    var deletePath = function (path, obj) {
        var p;

        path = path.slice();

        while (path.length) {
            p = path.shift();

            if (!path.length) {
                delete obj[p];
            } else {
                if (obj.hasOwnProperty(p)) {
                    obj = obj[p];
                } else {
                    break;
                }
            }
        }
    };

    var Computed = function (data, name, model) {
        this.name = name;

        if (typeof data === 'function') {
            this.get = function () {return data.apply(model, arguments)};
            this.set = function () {
                throw new Error('set: computed "' + name + '" has no set method');
            };
            this._simple = true;
            return this;
        }

        this._deps = data.deps;
        this._get = data.get;
        this.set = function () {return data.set.apply(model, arguments)};
        this._model = model;

        return this;
    };

    Computed.prototype.update = function (options) {
        if (this._simple) {
            return;
        }

        var deps = [],
            val;

        this._previous = this.value;

        if (this._deps instanceof Array) {
            for (var i = 0; i < this._deps.length; i++) {
                try {
                    val = this._model.get(this._deps[i]);
                } catch (e) {
                    val = undefined;
                }

                deps.push(val);
            }
        }

        this.value = this._get.apply(this._model, deps);

        if (!_.isEqual(this._previous, this.value)) {
            this._model.trigger('change:' + this.name, this._model, this.value, options);
        }
    };

    Computed.prototype.get = function () {
        return this.value;
    };

    var _addHandler = function (type, binding) {
        var handlers = this.view.handlers;

        if (handlers[type].multiple) {
            for (var attr in binding) {
                if (binding.hasOwnProperty(attr)) {
                    this.addHandler(type, binding[attr], attr);
                }
            }
        } else {
            this.addHandler(type, binding);
        }
    };

    var Binding = function (view, selector, bindings) {
        var binding;

        this.selector = selector;
        this.view = view;
        this.mods = {};

        this._setEl();

        this.handlers = [];

        for (var type in bindings) {
            if (bindings.hasOwnProperty(type) && type !== 'collection') {
                binding = bindings[type];

                if (binding instanceof Array) {
                    for (var i = 0; i < binding.length; i++) {
                        _addHandler.call(this, type, binding[i]);
                    }
                } else {
                    _addHandler.call(this, type, binding);
                }
            }
        }
    };

    Binding.prototype._unbind = function () {
        var handlers = this.handlers,
            col = [],
            paths,
            path,
            model,
            attrArray,
            ch,
            handler,
            i, j, k;

        for (i = 0; i < handlers.length; i++) {
            handler = handlers[i];
            /*if (handler.get) {
                this.$el.off(handler.events, handler.get);
            }*/

            paths = handler.paths;

            for (j = 0; j < paths.length; j++) {
                path = paths[j];
                attrArray = _split(path.attr);
                model = path.model;
                ch = '';

                if (this.view[model] instanceof Backbone.Collection) {
                    if (col.indexOf(model) === -1) {
                        col.push(model);
                        this.view[model].off('add remove reset sort', handler.set);
                    }
                }

                for (k = 0; k < attrArray.length; k++) {
                    if (ch) {
                        ch += '.';
                    }
                    
                    ch += attrArray[k];
                    this.view[model].off('change:' + ch, handler.set);
                }
            }
        }
    };

    var splitModelAttr = function (modelAttr) {
        var parsed = modelAttr.match(/^(?:!\.|[^.])+/),
            model,
            attr;

        try {
            model = parsed[0];
            attr = modelAttr.slice(model.length + 1);
            if (!attr.length || !model.length) {
                throw '';
            }
        } catch (e) {
            throw new Error('wrong binging data"' + modelAttr + '"');
        }

        return {
            model: model,
            attr: attr
        };
    };

    Binding.prototype.addHandler = function (type, binding, bindAttr) {
        var _binding = binding,
            filter = binding.filter,
            events = binding.events || 'change',
            filters = this.view.filters,
            paths = [],
            i, l;

        if (typeof binding !== 'string') {
            binding = binding.data;
        }

        if (typeof binding === 'string') {
            paths.push(splitModelAttr(binding));
        } else {
            for (i = 0, l = binding.length; i < l; i++) {
                paths.push(splitModelAttr(binding[i]));
            }
        }

        var attrs = [],
            col = [],
            self = this,
            path,
            model,
            attr,
            attrArray,
            ch,
            modelAttr,
            handler = {
                paths: paths
            },
            set = this.view.handlers[type],
            get;

        if (typeof set !== 'function') {
            get = set.get;
            set = set.set;
        }

        if (typeof filter === 'string') {
            if (!filters.hasOwnProperty(filter)) {
                throw new Error('unknown filter "' + filter + '"');
            }

            filter = filters[filter];
        }

        var setter = function () {
            var attrs = [],
                attr,
                path;

            for (var i = 0; i < paths.length; i++) {
                path = paths[i];

                if (self.view[path.model] instanceof Backbone.Collection) {
                    attrs.push(self.view[path.model].pluck(path.attr));
                } else {
                    attrs.push(self.view[path.model].get(path.attr));
                }
            }

            if (filter) {
                attr = filter.apply(self.view, attrs);
            } else {
                attr = attrs[0];
            }

            set.call(self, self.$el, attr, bindAttr, _binding);
        };

        for (i = 0; i < paths.length; i++) {
            path = paths[i];
            model = path.model;
            attr = path.attr;
            attrArray = _split(attr);
            ch = '';

            if (this.view[model] instanceof Backbone.Collection) {
                attrs.push(this.view[model].pluck(attr));
                if (col.indexOf(model) === -1) {
                    col.push(model);
                    this.view[model].on('add remove reset sort', setter);
                }
            } else {
                attrs.push(this.view[model].get(attr));
            }

            for (var j = 0; j < attrArray.length; j++) {
                if (ch) {
                    ch += '.';
                }

                ch += attrArray[j];
                this.view[model].on('change:' + ch, setter);
            }
        }

        if (filter) {
            modelAttr = filter.apply(this.view, attrs);
        } else {
            modelAttr = attrs[0];
        }

        set.call(this, this.$el, modelAttr, bindAttr, _binding);

        if (get) {
            var getter = function () {
                    self.view[model].set(attr, get.call(self, self.$el));
                };

            this.view.$el.on(events + '.bindingHandlers' + this.view.cid, this.selector, getter);
            //this.$el.on(events, getter);

            handler.events = events;
            handler.get = getter;
        }

        handler.set = setter;
        this.handlers.push(handler);
    };

    Binding.prototype._setEl = function () {
        var selector = this.selector;

        if (selector === 'el') {
            this.$el = this.view.$el;
        } else {
            this.$el = this.view.$(selector);
        }
    };

    var filters = {
        not: function (val) {
            return !val;
        },

        length: function (val) {
            if (val.hasOwnProperty('length')) {
                return val.length;
            } else {
                return 0;
            }
        }
    };

    var handlers = {
        text: function ($el, value) {
            $el.text(value);
        },

        value: {
            set: function ($el, value) {
                if ($el.val() !== value) {
                    $el.val(value);
                }
            },
            get: function ($el) {
                return $el.val();
            }
        },

        css: {
            set: function ($el, value, style) {
                $el.css(style, value);
            },
            multiple: true
        },

        attr: {
            set: function ($el, value, attr) {
                $el.attr(attr, value);
            },
            multiple: true
        },

        classes: {
            set: function ($el, value, cl) {
                $el.toggleClass(cl, !!value);
            },
            multiple: true
        },

        html: function ($el, value) {
            $el.html(value);
        },

        toggle: function ($el, value) {
            $el.toggle(!!value);
        },

        disabled: function ($el, value) {
            $el.prop('disabled', !!value);
        },

        enabled: function ($el, value) {
            $el.prop('disabled', !value);
        },

        checked: {
            set: function ($el, value) {
                $el.prop('checked', false);

                if (value instanceof Array) {
                    for (var i = 0; i < value.length; i++) {
                        $el.filter('[value="' + value[i] + '"]').prop('checked', true);
                    }
                } else if (typeof value === 'boolean') {
                    $el.prop('checked', value);
                } else {
                    $el.filter('[value="' + value + '"]').prop('checked', true);
                }
            },

            get: function ($el) {
                var type = $el.attr('type'),
                    checkedEl = $el.filter(':checked');

                if (type === 'checkbox') {
                    var checked = [];

                    if ($el.length === 1) {
                        return !!checkedEl.length;
                    } else {
                        checkedEl.each(function (i, el) {
                            checked.push($(el).val());
                        });

                        return checked;
                    }
                } else {
                    return checkedEl.val();
                }
            }
        },

        options: {
            set: function ($el, value) {
                $el.val(value);
            },

            get: function ($el) {
                return $el.val() || [];
            }
        },

        mod: {
            set: function ($el, value, cl, binding) {
                var modifier = this.mods[binding];

                if (modifier) {
                    $el.removeClass(modifier);
                }

                modifier = cl + value;
                this.mods[binding] = modifier;
                $el.addClass(modifier);
            },
            multiple: true
        }
    };

    Ribs.Model = Backbone.Model.extend({
        _super: Backbone.Model,

        constructor: function(attributes, options) {
            this._ribs = {
                computeds: {},
                computedsDeps: {}
            };

            var attrs = attributes || {};
            options || (options = {});
            this.cid = _.uniqueId('c');
            this.attributes = {};
            if (options.collection) this.collection = options.collection;
            if (options.parse) attrs = this.parse(attrs, options) || {};
            attrs = _.defaults({}, attrs, _.result(this, 'defaults'));

            var escapedAttrs = {};

            for (var attr in attrs) {
                if (attrs.hasOwnProperty(attr)) {
                    escapedAttrs[attr.replace('.', '!.')] = attrs[attr];
                }
            }

            this.set(escapedAttrs, options);
            this.changed = {};

            this._initComputeds();
            this.initialize.apply(this, arguments);
        },

        get: function (attr) {
            if (typeof attr !== 'string') {
                return undefined;
            }

            var computeds = this._ribs.computeds;

            if (attr in computeds) {
                return computeds[attr].get();
            }

            var path = _split(attr);

            if (path.length === 1) {
                return _super(this, 'get', [path[0]]);
            } else {
                return getPath(path, this.attributes);
            }
        },

        set: function (key, val, options) {
            if (key == null) {
                return this;
            }

            var attrs,changes,changing,current,prev,silent,unset,path,escapedPath,attr,i,j,l;

            if (typeof key === 'object') {
                attrs = key;
                options = val;
            } else {
                attrs = {};
                attrs[key] = val;
            }

            options || (options = {});

            if (!this._validate(attrs, options)) {
                return false;
            }

            unset           = options.unset;
            silent          = options.silent;
            changes         = [];
            changing        = this._changing;
            this._changing  = true;

            //new from Ribs
            //Заменяем все computeds на обычные аргументы
            var computeds = this._ribs.computeds,
                realAttrs = _.clone(attrs),
                computedsAttrs = {},
                newAttrs,
                hasComputed = true,
                firstLoop = true;


            while (hasComputed) {
                hasComputed = false;
                newAttrs = {};

                for (attr in attrs) {
                    if (attrs.hasOwnProperty(attr)) {
                        if (attr in computeds) {
                            hasComputed = true;
                            _.extend(newAttrs, computeds[attr].set(attrs[attr]));
                            if (firstLoop) {
                                computedsAttrs[attr] = attrs[attr];
                            }

                            delete attrs[attr];
                            _.extend(attrs, newAttrs);
                        }
                    }
                }

                firstLoop = false;
            }
            ////////////////////////

            if (!changing) {
                this._previousAttributes = _.clone(this.attributes);

                var previousComputeds = {};

                for (attr in computeds) {
                    if (computeds.hasOwnProperty(attr)) {
                        previousComputeds[attr] = computeds[attr].value;
                    }
                }

                _.extend(this._previousAttributes, previousComputeds);

                this.changed = {};
            }

            current = this.attributes;
            prev = this._previousAttributes;

            if (this.idAttribute in attrs) this.id = attrs[this.idAttribute];

            //new from Ribs
            for (attr in attrs) {
                if (attrs.hasOwnProperty(attr)) {
                    val = attrs[attr];
                    path = _split(attr);
                    if (!_.isEqual(getPath(path, current), val)) {
                        escapedPath = path.slice();
                        
                        for (i = 0; i < escapedPath.length; i++) {
                            escapedPath[i] = escapedPath[i].replace('.', '!.');
                        }

                        changes.push({
                            path: path,
                            escapedPath: escapedPath,
                            attr: attr,
                            val: val
                        });
                    }

                    if (!_.isEqual(getPath(path, prev), val)) {
                        this.changed[attr] = val;
                    } else {
                        delete this.changed[attr];
                    }

                    if (unset && (attr in realAttrs)) {
                        deletePath(path, current);
                    } else {
                        this._setPath(path, val);
                    }
                }
            }

            //Если передан флаг unset удаляем computed
            for (attr in computedsAttrs) {
                if (computedsAttrs.hasOwnProperty(attr) && unset) {
                    this.removeComputed(attr);
                    delete computedsAttrs[attr];
                }
            }

            var computedsDeps = this._ribs.computedsDeps,
                computedsToUpdate = [],
                deps,
                dep;

            for (i = 0, l = changes.length; i < l; i++) {
                attr = changes[i].attr;
                deps = computedsDeps['change:' + attr];

                if (deps) {
                    for (j = 0; j < deps.length; j++) {
                        dep = deps[j];

                        if (computedsToUpdate.indexOf(dep) === -1) {
                            computedsToUpdate.push(dep);
                        }
                    }
                }
            }

            if (!silent) {
                l = changes.length;

                if (l) {
                    this._pending = options;
                }

                for (i = 0; i < l; i++) {
                    this.trigger('change:' + changes[i].attr, this, changes[i].val, options);

                    if (options.propagation) {
                        escapedPath = changes[i].escapedPath.slice();

                        if (escapedPath.length) {
                            while (escapedPath.length - 1) {
                                escapedPath.length--;

                                this.trigger('change:' + escapedPath.join('.'), this, undefined, options);
                            }
                        }
                    }
                }
            }

            for (i = 0; i < computedsToUpdate.length; i++) {
                computeds[computedsToUpdate[i]].update(options);
            }
            /////////////////////////////

            if (changing) {
                return this;
            }

            if (!silent) {
                while (this._pending) {
                    options = this._pending;
                    this._pending = false;
                    this.trigger('change', this, options);
                }
            }
            this._pending = false;
            this._changing = false;
            return this;
        },

        trigger: function(name) {
            var computedsDeps = this._ribs.computedsDeps,
                options = arguments[3],
                i, l;

            if (typeof name === 'string' && name in computedsDeps) {
                var computeds = this._ribs.computeds,
                    deps = computedsDeps[name],
                    computed;

                for (i = 0, l = deps.length; i < l; i++) {
                    computed = computeds[deps[i]];
                    computed.update(options);
                }
            }

            if (options && options.silent) {
                return this;
            }

            return _super(this, 'trigger', arguments);
        },

        _setPath: function (path, val) {
            var attr = this.attributes,
                p;

            path = path.slice();

            while (path.length) {
                p = path.shift();

                if (path.length) {
                    if (!(attr.hasOwnProperty(p) && attr[p] instanceof Object)) {
                        throw new Error('set: can\'t set anything to "' + p + '", typeof == "' + typeof attr[p] + '"');
                    }

                    attr = attr[p];
                } else {
                    attr[p] = val;
                }
            }
        },

        _initComputeds: function () {
            var computeds = this.computeds,
                name;

            for (name in computeds) {
                if (computeds.hasOwnProperty(name)) {
                    this.addComputed(name, computeds[name], {silent: true});
                }
            }

            //Это не ошибка, сначала создаем все computeds, а потом обновляем
            for (name in computeds) {
                if (computeds.hasOwnProperty(name)) {
                    this._ribs.computeds[name].update();
                }
            }
        },

        addComputed: function (name, computed) {
            if (name in this.attributes || name in this._ribs.computeds) {
                throw new Error('addComputed: computed name "' + name + '" is already used');
            }

            var deps = computed.deps,
                computedsDeps = this._ribs.computedsDeps,
                depArr,
                dep;

            if (deps instanceof Array) {
                for (var i = 0; i < deps.length; i++) {
                    depArr = _split(deps[i]);
                    dep = 'change:' + depArr[0].replace('.', '!.');

                    for (var j = 0; j < depArr.length; j++) {
                        if (dep in computedsDeps) {
                            if (computedsDeps[dep].indexOf(name) === -1) {
                                computedsDeps[dep].push(name);
                            }
                        } else {
                            computedsDeps[dep] = [name];
                        }

                        if (depArr[j + 1]) {
                            dep += '.' + depArr[j + 1].replace('.', '!.');
                        }
                    }
                }
            }

            this._ribs.computeds[name] = new Computed(computed, name, this);

            var options = arguments[2] || {};

            if (!options.silent) {
                this._ribs.computeds[name].update();
            }
            return this;
        },

        removeComputed: function (name) {
            var computedsDeps = this._ribs.computedsDeps,
                dep,
                attr,
                index;

            for (attr in computedsDeps) {
                if (computedsDeps.hasOwnProperty(attr)) {
                    dep = computedsDeps[attr];
                    index = dep.indexOf(name);

                    if (index !== -1) {
                        dep.splice(index, 1);
                    }

                    if (!dep.length) {
                        delete computedsDeps[attr];
                    }
                }
            }

            delete this._ribs.computeds[name];
            return this;
        }
    });

    Ribs.View = Backbone.View.extend({
        _super: Backbone.View,

        constructor: function(attributes, options) {
            this._ribs = {
                _bindings: this.bindings || {},
                bindings: [],
                collections: {}
            };

            this.filters = this.filters || {};
            this.handlers = this.handlers || {};

            _.extend(this.filters, filters);
            _.extend(this.handlers, handlers);

            _super(this, 'constructor', arguments);

            if (!this._ribs.preventBindings) {
                this.applyBindings();
            }
        },

        preventBindings: function () {
            this._ribs.preventBindings = true;
        },

        applyBindings: function () {
            this.removeBindings();

            var _bindings = this._ribs._bindings;

            for (var s in _bindings) {
                if (_bindings.hasOwnProperty(s)) {
                    this.addBinding(s, _bindings[s]);
                }
            }
        },

        addBinding: function (selector, bindings) {
            var _bindings = this._ribs._bindings,
                hasBindings = false;

            if (!_bindings.hasOwnProperty(selector)) {
                _bindings[selector] = bindings;
            }

            if (bindings.collection) {
                var colBind = bindings.collection;

                this.applyCollection(selector, this[colBind.col], this[colBind.view]);
            }

            for (var b in bindings) {
                if (bindings.hasOwnProperty(b)) {
                    hasBindings = true;
                }
            }

            if (hasBindings) {
                this._ribs.bindings.push(new Binding(this, selector, bindings));
            }
        },

        removeBindings: function () {
            var bindings = this._ribs.bindings,
                collections = this._ribs.collections;

            this.$el.off('.bindingHandlers' + this.cid);

            for (var i = 0; i < bindings.length; i++) {
                bindings[i]._unbind();
            }

            for (var cols in collections) {
                if (collections.hasOwnProperty(cols)) {
                    cols = collections[cols];

                    for (var ribsCol in cols) {
                        if (cols.hasOwnProperty(ribsCol)) {
                            ribsCol = cols[ribsCol];
                            ribsCol.collection.off('sort', this._onSort, this);
                            ribsCol.collection.off('add', this._onaddView, this);
                            ribsCol.collection.off('remove', this._removeView, this);
                            ribsCol.collection.off('reset', this._onReset, this);

                            for (var v in ribsCol.views) {
                                if (ribsCol.views.hasOwnProperty(v)) {
                                    ribsCol.views[v].remove();
                                }
                            }
                        }
                    }
                }
            }

            this._ribs.collections = {};
            this._ribs.bindings = [];
        },

        updateBindings: function () {
            var bindings = this._ribs.bindings,
                binding;

            for (var i = 0; i < bindings.length; i++) {
                binding = bindings[i];
                binding._setEl();

                for (var j = 0; j < binding.handlers.length; j++) {
                    binding.handlers[j].set();
                }
            }
        },

        applyCollection: function (selector, collection, View, data) {
            var bindId = _.uniqueId('bc'),
                views = {},
                col,
                view,
                model,
                $el;

            data = data || {};

            if (selector instanceof $) {
                $el = selector;
            } else if (selector === 'el') {
                $el = this.$el;
            } else {
                $el = this.$(selector);
            }

            if (collection.comparator) {
                collection.sort();
            }

            if (!collection.cid) {
                collection.cid = _.uniqueId('col');
            }

            col = this._ribs.collections[collection.cid];

            if (!col) {
                col = this._ribs.collections[collection.cid] = {};

                collection.on('sort', this._onSort, this);
                collection.on('add', this._onaddView, this);
                collection.on('remove', this._removeView, this);
                collection.on('reset', this._onReset, this);
            }

            col[bindId] = {
                collection: collection,
                $el: $el,
                View: View,
                data: data,
                views: views
            };

            var fragment = document.createDocumentFragment();

            for (var i = 0; i < collection.length; i++) {
                model = collection.at(i);
                view = new View(_.extend(data, {model: model, collection: collection}));
                views[model.cid] = view;
                fragment.appendChild(view.el);
            }

            $el.append(fragment);

            return bindId;
        },

        _onSort: function (collection) {
            this.renderCollection(collection);
        },

        renderCollection: function (collection, bindId) {
            var cols = this._ribs.collections[collection.cid],
                ribsCol,
                views,
                view;

            for (var c in cols) {
                if (cols.hasOwnProperty(c) && (!bindId || c === bindId)) {
                    ribsCol = cols[c];
                    if (!ribsCol) {
                        throw new Error('can\'t render collection without binding');
                    }

                    views = ribsCol.views;

                    for (view in views) {
                        if (views.hasOwnProperty(view)) {
                            views[view].$el.detach();
                        }
                    }

                    for (var i = 0; i < collection.length; i++) {
                        view = views[collection.at(i).cid];

                        if (!view) {
                            this._addView(collection.at(i), collection, c);
                        } else {
                            ribsCol.$el.append(view.$el);
                        }
                    }
                }
            }
        },

        _onaddView: function (model, collection) {
            this._addView(model, collection);
        },

        _addView: function (model, collection, bindId) {
            var cols = this._ribs.collections[collection.cid],
                modelCid = model.cid,
                ribsCol,
                views,
                cid,
                view,
                index;

            for (var c in cols) {
                if (cols.hasOwnProperty(c) && (!bindId || c === bindId)) {
                    ribsCol = cols[c];
                    views = ribsCol.views;
                    view = new ribsCol.View(_.extend(ribsCol.data, {model: model, collection: collection}));

                    index = undefined;

                    for (var i = 0; i < collection.length; i++) {
                        cid = collection.at(i).cid;

                        if (cid === modelCid) {
                            if (index === undefined) {
                                ribsCol.$el.prepend(view.$el)
                            } else {
                                views[index].$el.after(view.$el);
                            }
                            break;
                        }

                        if (cid in views) {
                            index = cid;
                        }
                    }

                    views[modelCid] = view;
                }
            }
        },


        /*_addView2: function (model, collection, bindId) {
            var cols = this._ribs.collections[collection.cid],
                ribsCol,
                view,
                index;

            for (var c in cols) {
                if (cols.hasOwnProperty(c) && (!bindId || c === bindId)) {
                    ribsCol = cols[c];
                    view = new ribsCol.View(_.extend(ribsCol.data, {model: model, collection: collection}));

                    ribsCol.views[model.cid] = view;

                    index = collection.models.indexOf(model);

                    if (index) {
                        ribsCol.views[collection.at(index - 1).cid].$el.after(view.$el);
                    } else {
                        if (collection.length > 1) {
                            var nextView = ribsCol.views[collection.at(1).cid];

                            if (nextView) {
                                nextView.$el.before(view.$el);
                            } else {
                                ribsCol.$el.append(view.$el);
                            }
                        } else {
                            ribsCol.$el.append(view.$el);
                        }
                    }
                }
            }
        },*/

        _removeView: function (model, collection) {
            var cols = this._ribs.collections[collection.cid],
                ribsCol,
                view;

            for (var c in cols) {
                if (cols.hasOwnProperty(c)) {
                    ribsCol = cols[c];
                    view = ribsCol.views[model.cid];

                    view.remove();
                    delete ribsCol.views[model.cid];
                }
            }
        },

        _onReset: function (collection) {
            var cols = this._ribs.collections[collection.cid],
                ribsCol,
                views;

            for (var c in cols) {
                if (cols.hasOwnProperty(c)) {
                    ribsCol = cols[c];
                    views = ribsCol.views;

                    for (var view in views) {
                        if (views.hasOwnProperty(view)) {
                            view = views[view];
                            view.remove();
                        }
                    }

                    ribsCol.views = {};

                    for (var i = 0; i < collection.length; i++) {
                        this._addView(collection.at(i), collection);
                    }
                }
            }
        }
    });

    return Ribs;
}));