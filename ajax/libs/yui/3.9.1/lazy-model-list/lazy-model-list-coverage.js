if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["build/lazy-model-list/lazy-model-list.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/lazy-model-list/lazy-model-list.js",
    code: []
};
_yuitest_coverage["build/lazy-model-list/lazy-model-list.js"].code=["YUI.add('lazy-model-list', function (Y, NAME) {","","/**","Provides the LazyModelList class, which is a ModelList subclass that manages","plain objects instead of fully instantiated model instances.","","@module app","@submodule lazy-model-list","@since 3.6.0","**/","","/**","LazyModelList is a subclass of ModelList that maintains a list of plain","JavaScript objects rather than a list of Model instances. This makes it","well-suited for managing large amounts of data (on the order of thousands of","items) that would tend to bog down a vanilla ModelList.","","The API presented by LazyModelList is the same as that of ModelList, except that","in every case where ModelList would provide a Model instance, LazyModelList","provides a plain JavaScript object. LazyModelList also provides a `revive()`","method that can convert the plain object at a given index into a full Model","instance.","","Since the items stored in a LazyModelList are plain objects and not full Model","instances, there are a few caveats to be aware of:","","  * Since items are plain objects and not Model instances, they contain","    properties rather than Model attributes. To retrieve a property, use","    `item.foo` rather than `item.get('foo')`. To set a property, use","    `item.foo = 'bar'` rather than `item.set('foo', 'bar')`.","","  * Model attribute getters and setters aren't supported, since items in the","    LazyModelList are stored and manipulated as plain objects with simple","    properties rather than YUI attributes.","","  * Changes made to the plain object version of an item will not trigger or","    bubble up Model `change` events. However, once an item is revived into a","    full Model using the `revive()` method, changes to that Model instance","    will trigger and bubble change events as expected.","","  * Custom `idAttribute` fields are not supported.","","  * `id` and `clientId` properties _are_ supported. If an item doesn't have a","    `clientId` property, one will be generated automatically when the item is","    added to a LazyModelList.","","LazyModelList is generally much more memory efficient than ModelList when","managing large numbers of items, and adding/removing items is significantly","faster. However, the tradeoff is that LazyModelList is only well-suited for","storing very simple items without complex attributes, and consumers must","explicitly revive items into full Model instances as needed (this is not done","transparently for performance reasons).","","@class LazyModelList","@extends ModelList","@constructor","@since 3.6.0","**/","","var AttrProto = Y.Attribute.prototype,","    GlobalEnv = YUI.namespace('Env.Model'),","    Lang      = Y.Lang,","    YArray    = Y.Array,","","    EVT_ADD   = 'add',","    EVT_ERROR = 'error',","    EVT_RESET = 'reset';","","Y.LazyModelList = Y.Base.create('lazyModelList', Y.ModelList, [], {","    // -- Lifecycle ------------------------------------------------------------","    initializer: function () {","        this.after('*:change', this._afterModelChange);","    },","","    // -- Public Methods -------------------------------------------------------","","    /**","    Deletes the specified model from the model cache to release memory. The","    model won't be destroyed or removed from the list, just freed from the","    cache; it can still be instantiated again using `revive()`.","","    If no model or model index is specified, all cached models in this list will","    be freed.","","    Note: Specifying an index is faster than specifying a model instance, since","    the latter requires an `indexOf()` call.","","    @method free","    @param {Model|Number} [model] Model or index of the model to free. If not","        specified, all instantiated models in this list will be freed.","    @chainable","    @see revive()","    **/","    free: function (model) {","        var index;","","        if (model) {","            index = Lang.isNumber(model) ? model : this.indexOf(model);","","            if (index >= 0) {","                // We don't detach the model because it's not being removed from","                // the list, just being freed from memory. If something else","                // still holds a reference to it, it may still bubble events to","                // the list, but that's okay.","                //","                // `this._models` is a sparse array, which ensures that the","                // indices of models and items match even if we don't have model","                // instances for all items.","                delete this._models[index];","            }","        } else {","            this._models = [];","        }","","        return this;","    },","","    /**","    Overrides ModelList#get() to return a map of property values rather than","    performing attribute lookups.","","    @method get","    @param {String} name Property name.","    @return {String[]} Array of property values.","    @see ModelList.get()","    **/","    get: function (name) {","        if (this.attrAdded(name)) {","            return AttrProto.get.apply(this, arguments);","        }","","        return YArray.map(this._items, function (item) {","            return item[name];","        });","    },","","    /**","    Overrides ModelList#getAsHTML() to return a map of HTML-escaped property","    values rather than performing attribute lookups.","","    @method getAsHTML","    @param {String} name Property name.","    @return {String[]} Array of HTML-escaped property values.","    @see ModelList.getAsHTML()","    **/","    getAsHTML: function (name) {","        if (this.attrAdded(name)) {","            return Y.Escape.html(AttrProto.get.apply(this, arguments));","        }","","        return YArray.map(this._items, function (item) {","            return Y.Escape.html(item[name]);","        });","    },","","    /**","    Overrides ModelList#getAsURL() to return a map of URL-encoded property","    values rather than performing attribute lookups.","","    @method getAsURL","    @param {String} name Property name.","    @return {String[]} Array of URL-encoded property values.","    @see ModelList.getAsURL()","    **/","    getAsURL: function (name) {","        if (this.attrAdded(name)) {","            return encodeURIComponent(AttrProto.get.apply(this, arguments));","        }","","        return YArray.map(this._items, function (item) {","            return encodeURIComponent(item[name]);","        });","    },","","    /**","    Returns the index of the given object or Model instance in this","    LazyModelList.","","    @method indexOf","    @param {Model|Object} needle The object or Model instance to search for.","    @return {Number} Item index, or `-1` if not found.","    @see ModelList.indexOf()","    **/","    indexOf: function (model) {","        return YArray.indexOf(model && model._isYUIModel ?","            this._models : this._items, model);","    },","","    /**","    Overrides ModelList#reset() to work with plain objects.","","    @method reset","    @param {Object[]|Model[]|ModelList} [models] Models to add.","    @param {Object} [options] Options.","    @chainable","    @see ModelList.reset()","    **/","    reset: function (items, options) {","        items || (items  = []);","        options || (options = {});","","        var facade = Y.merge({src: 'reset'}, options);","","        // Convert `items` into an array of plain objects, since we don't want","        // model instances.","        items = items._isYUIModelList ? items.map(this._modelToObject) :","            YArray.map(items, this._modelToObject);","","        facade.models = items;","","        if (options.silent) {","            this._defResetFn(facade);","        } else {","            // Sort the items before firing the reset event.","            if (this.comparator) {","                items.sort(Y.bind(this._sort, this));","            }","","            this.fire(EVT_RESET, facade);","        }","","        return this;","    },","","    /**","    Revives an item (or all items) into a full Model instance. The _item_","    argument may be the index of an object in this list, an actual object (which","    must exist in the list), or may be omitted to revive all items in the list.","","    Once revived, Model instances are attached to this list and cached so that","    reviving them in the future doesn't require another Model instantiation. Use","    the `free()` method to explicitly uncache and detach a previously revived","    Model instance.","","    Note: Specifying an index rather than an object will be faster, since","    objects require an `indexOf()` lookup in order to retrieve the index.","","    @method revive","    @param {Number|Object} [item] Index of the object to revive, or the object","        itself. If an object, that object must exist in this list. If not","        specified, all items in the list will be revived and an array of models","        will be returned.","    @return {Model|Model[]|null} Revived Model instance, array of revived Model","        instances, or `null` if the given index or object was not found in this","        list.","    @see free()","    **/","    revive: function (item) {","        var i, len, models;","","        if (item || item === 0) {","            return this._revive(Lang.isNumber(item) ? item :","                this.indexOf(item));","        } else {","            models = [];","","            for (i = 0, len = this._items.length; i < len; i++) {","                models.push(this._revive(i));","            }","","            return models;","        }","    },","","    /**","    Overrides ModelList#toJSON() to use toArray() instead, since it's more","    efficient for LazyModelList.","","    @method toJSON","    @return {Object[]} Array of objects.","    @see ModelList.toJSON()","    **/","    toJSON: function () {","        return this.toArray();","    },","","    // -- Protected Methods ----------------------------------------------------","","    /**","    Overrides ModelList#add() to work with plain objects.","","    @method _add","    @param {Object|Model} item Object or model to add.","    @param {Object} [options] Options.","    @return {Object} Added item.","    @protected","    @see ModelList._add()","    **/","    _add: function (item, options) {","        var facade;","","        options || (options = {});","","        // If the item is a model instance, convert it to a plain object.","        item = this._modelToObject(item);","","        // Ensure that the item has a clientId.","        if (!('clientId' in item)) {","            item.clientId = this._generateClientId();","        }","","        if (this._isInList(item)) {","            this.fire(EVT_ERROR, {","                error: 'Model is already in the list.',","                model: item,","                src  : 'add'","            });","","            return;","        }","","        facade = Y.merge(options, {","            index: 'index' in options ? options.index : this._findIndex(item),","            model: item","        });","","        options.silent ? this._defAddFn(facade) : this.fire(EVT_ADD, facade);","","        return item;","    },","","    /**","    Overrides ModelList#clear() to support `this._models`.","","    @method _clear","    @protected","    @see ModelList.clear()","    **/","    _clear: function () {","        YArray.each(this._models, this._detachList, this);","","        this._clientIdMap = {};","        this._idMap       = {};","        this._items       = [];","        this._models      = [];","    },","","    /**","    Generates an ad-hoc clientId for a non-instantiated Model.","","    @method _generateClientId","    @return {String} Unique clientId.","    @protected","    **/","    _generateClientId: function () {","        GlobalEnv.lastId || (GlobalEnv.lastId = 0);","        return this.model.NAME + '_' + (GlobalEnv.lastId += 1);","    },","","    /**","    Returns `true` if the given item is in this list, `false` otherwise.","","    @method _isInList","    @param {Object} item Plain object item.","    @return {Boolean} `true` if the item is in this list, `false` otherwise.","    @protected","    **/","    _isInList: function (item) {","        return !!(('clientId' in item && this._clientIdMap[item.clientId]) ||","                ('id' in item && this._idMap[item.id]));","    },","","    /**","    Converts a Model instance into a plain object. If _model_ is not a Model","    instance, it will be returned as is.","","    This method differs from Model#toJSON() in that it doesn't delete the","    `clientId` property.","","    @method _modelToObject","    @param {Model|Object} model Model instance to convert.","    @return {Object} Plain object.","    @protected","    **/","    _modelToObject: function (model) {","        if (model._isYUIModel) {","            model = model.getAttrs();","            delete model.destroyed;","            delete model.initialized;","        }","","        return model;","    },","","    /**","    Overrides ModelList#_remove() to convert Model instances to indices","    before removing to ensure consistency in the `remove` event facade.","","    @method _remove","    @param {Object|Model} item Object or model to remove.","    @param {Object} [options] Options.","    @return {Object} Removed object.","    @protected","    **/","    _remove: function (item, options) {","        // If the given item is a model instance, turn it into an index before","        // calling the parent _remove method, since we only want to deal with","        // the plain object version.","        if (item._isYUIModel) {","            item = this.indexOf(item);","        }","","        return Y.ModelList.prototype._remove.call(this, item, options);","    },","","    /**","    Revives a single model at the specified index and returns it. This is the","    underlying implementation for `revive()`.","","    @method _revive","    @param {Number} index Index of the item to revive.","    @return {Model} Revived model.","    @protected","    **/","    _revive: function (index) {","        var item, model;","","        if (index < 0) {","            return null;","        }","","        item = this._items[index];","","        if (!item) {","            return null;","        }","","        model = this._models[index];","","        if (!model) {","            model = new this.model(item);","","            // The clientId attribute is read-only, but revived models should","            // have the same clientId as the original object, so we need to set","            // it manually.","            model._set('clientId', item.clientId);","","            this._attachList(model);","            this._models[index] = model;","        }","","        return model;","    },","","    // -- Event Handlers -------------------------------------------------------","","    /**","    Handles `change` events on revived models and updates the original objects","    with the changes.","","    @method _afterModelChange","    @param {EventFacade} e","    @protected","    **/","    _afterModelChange: function (e) {","        var changed = e.changed,","            item    = this._clientIdMap[e.target.get('clientId')],","            name;","","        if (item) {","            for (name in changed) {","                if (changed.hasOwnProperty(name)) {","                    item[name] = changed[name].newVal;","                }","            }","        }","    },","","    // -- Default Event Handlers -----------------------------------------------","","    /**","    Overrides ModelList#_defAddFn() to support plain objects.","","    @method _defAddFn","    @param {EventFacade} e","    @protected","    **/","    _defAddFn: function (e) {","        var item = e.model;","","        this._clientIdMap[item.clientId] = item;","","        if (Lang.isValue(item.id)) {","            this._idMap[item.id] = item;","        }","","        this._items.splice(e.index, 0, item);","    },","","    /**","    Overrides ModelList#_defRemoveFn() to support plain objects.","","    @method _defRemoveFn","    @param {EventFacade} e","    @protected","    **/","    _defRemoveFn: function (e) {","        var index = e.index,","            item  = e.model,","            model = this._models[index];","","        delete this._clientIdMap[item.clientId];","","        if ('id' in item) {","            delete this._idMap[item.id];","        }","","        if (model) {","            this._detachList(model);","        }","","        this._items.splice(index, 1);","        this._models.splice(index, 1);","    }","});","","","}, '@VERSION@', {\"requires\": [\"model-list\"]});"];
_yuitest_coverage["build/lazy-model-list/lazy-model-list.js"].lines = {"1":0,"60":0,"69":0,"72":0,"95":0,"97":0,"98":0,"100":0,"109":0,"112":0,"115":0,"128":0,"129":0,"132":0,"133":0,"147":0,"148":0,"151":0,"152":0,"166":0,"167":0,"170":0,"171":0,"185":0,"199":0,"200":0,"202":0,"206":0,"209":0,"211":0,"212":0,"215":0,"216":0,"219":0,"222":0,"249":0,"251":0,"252":0,"255":0,"257":0,"258":0,"261":0,"274":0,"290":0,"292":0,"295":0,"298":0,"299":0,"302":0,"303":0,"309":0,"312":0,"317":0,"319":0,"330":0,"332":0,"333":0,"334":0,"335":0,"346":0,"347":0,"359":0,"376":0,"377":0,"378":0,"379":0,"382":0,"399":0,"400":0,"403":0,"416":0,"418":0,"419":0,"422":0,"424":0,"425":0,"428":0,"430":0,"431":0,"436":0,"438":0,"439":0,"442":0,"456":0,"460":0,"461":0,"462":0,"463":0,"479":0,"481":0,"483":0,"484":0,"487":0,"498":0,"502":0,"504":0,"505":0,"508":0,"509":0,"512":0,"513":0};
_yuitest_coverage["build/lazy-model-list/lazy-model-list.js"].functions = {"initializer:71":0,"free:94":0,"(anonymous 2):132":0,"get:127":0,"(anonymous 3):151":0,"getAsHTML:146":0,"(anonymous 4):170":0,"getAsURL:165":0,"indexOf:184":0,"reset:198":0,"revive:248":0,"toJSON:273":0,"_add:289":0,"_clear:329":0,"_generateClientId:345":0,"_isInList:358":0,"_modelToObject:375":0,"_remove:395":0,"_revive:415":0,"_afterModelChange:455":0,"_defAddFn:478":0,"_defRemoveFn:497":0,"(anonymous 1):1":0};
_yuitest_coverage["build/lazy-model-list/lazy-model-list.js"].coveredLines = 101;
_yuitest_coverage["build/lazy-model-list/lazy-model-list.js"].coveredFunctions = 23;
_yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 1);
YUI.add('lazy-model-list', function (Y, NAME) {

/**
Provides the LazyModelList class, which is a ModelList subclass that manages
plain objects instead of fully instantiated model instances.

@module app
@submodule lazy-model-list
@since 3.6.0
**/

/**
LazyModelList is a subclass of ModelList that maintains a list of plain
JavaScript objects rather than a list of Model instances. This makes it
well-suited for managing large amounts of data (on the order of thousands of
items) that would tend to bog down a vanilla ModelList.

The API presented by LazyModelList is the same as that of ModelList, except that
in every case where ModelList would provide a Model instance, LazyModelList
provides a plain JavaScript object. LazyModelList also provides a `revive()`
method that can convert the plain object at a given index into a full Model
instance.

Since the items stored in a LazyModelList are plain objects and not full Model
instances, there are a few caveats to be aware of:

  * Since items are plain objects and not Model instances, they contain
    properties rather than Model attributes. To retrieve a property, use
    `item.foo` rather than `item.get('foo')`. To set a property, use
    `item.foo = 'bar'` rather than `item.set('foo', 'bar')`.

  * Model attribute getters and setters aren't supported, since items in the
    LazyModelList are stored and manipulated as plain objects with simple
    properties rather than YUI attributes.

  * Changes made to the plain object version of an item will not trigger or
    bubble up Model `change` events. However, once an item is revived into a
    full Model using the `revive()` method, changes to that Model instance
    will trigger and bubble change events as expected.

  * Custom `idAttribute` fields are not supported.

  * `id` and `clientId` properties _are_ supported. If an item doesn't have a
    `clientId` property, one will be generated automatically when the item is
    added to a LazyModelList.

LazyModelList is generally much more memory efficient than ModelList when
managing large numbers of items, and adding/removing items is significantly
faster. However, the tradeoff is that LazyModelList is only well-suited for
storing very simple items without complex attributes, and consumers must
explicitly revive items into full Model instances as needed (this is not done
transparently for performance reasons).

@class LazyModelList
@extends ModelList
@constructor
@since 3.6.0
**/

_yuitest_coverfunc("build/lazy-model-list/lazy-model-list.js", "(anonymous 1)", 1);
_yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 60);
var AttrProto = Y.Attribute.prototype,
    GlobalEnv = YUI.namespace('Env.Model'),
    Lang      = Y.Lang,
    YArray    = Y.Array,

    EVT_ADD   = 'add',
    EVT_ERROR = 'error',
    EVT_RESET = 'reset';

_yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 69);
Y.LazyModelList = Y.Base.create('lazyModelList', Y.ModelList, [], {
    // -- Lifecycle ------------------------------------------------------------
    initializer: function () {
        _yuitest_coverfunc("build/lazy-model-list/lazy-model-list.js", "initializer", 71);
_yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 72);
this.after('*:change', this._afterModelChange);
    },

    // -- Public Methods -------------------------------------------------------

    /**
    Deletes the specified model from the model cache to release memory. The
    model won't be destroyed or removed from the list, just freed from the
    cache; it can still be instantiated again using `revive()`.

    If no model or model index is specified, all cached models in this list will
    be freed.

    Note: Specifying an index is faster than specifying a model instance, since
    the latter requires an `indexOf()` call.

    @method free
    @param {Model|Number} [model] Model or index of the model to free. If not
        specified, all instantiated models in this list will be freed.
    @chainable
    @see revive()
    **/
    free: function (model) {
        _yuitest_coverfunc("build/lazy-model-list/lazy-model-list.js", "free", 94);
_yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 95);
var index;

        _yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 97);
if (model) {
            _yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 98);
index = Lang.isNumber(model) ? model : this.indexOf(model);

            _yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 100);
if (index >= 0) {
                // We don't detach the model because it's not being removed from
                // the list, just being freed from memory. If something else
                // still holds a reference to it, it may still bubble events to
                // the list, but that's okay.
                //
                // `this._models` is a sparse array, which ensures that the
                // indices of models and items match even if we don't have model
                // instances for all items.
                _yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 109);
delete this._models[index];
            }
        } else {
            _yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 112);
this._models = [];
        }

        _yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 115);
return this;
    },

    /**
    Overrides ModelList#get() to return a map of property values rather than
    performing attribute lookups.

    @method get
    @param {String} name Property name.
    @return {String[]} Array of property values.
    @see ModelList.get()
    **/
    get: function (name) {
        _yuitest_coverfunc("build/lazy-model-list/lazy-model-list.js", "get", 127);
_yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 128);
if (this.attrAdded(name)) {
            _yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 129);
return AttrProto.get.apply(this, arguments);
        }

        _yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 132);
return YArray.map(this._items, function (item) {
            _yuitest_coverfunc("build/lazy-model-list/lazy-model-list.js", "(anonymous 2)", 132);
_yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 133);
return item[name];
        });
    },

    /**
    Overrides ModelList#getAsHTML() to return a map of HTML-escaped property
    values rather than performing attribute lookups.

    @method getAsHTML
    @param {String} name Property name.
    @return {String[]} Array of HTML-escaped property values.
    @see ModelList.getAsHTML()
    **/
    getAsHTML: function (name) {
        _yuitest_coverfunc("build/lazy-model-list/lazy-model-list.js", "getAsHTML", 146);
_yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 147);
if (this.attrAdded(name)) {
            _yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 148);
return Y.Escape.html(AttrProto.get.apply(this, arguments));
        }

        _yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 151);
return YArray.map(this._items, function (item) {
            _yuitest_coverfunc("build/lazy-model-list/lazy-model-list.js", "(anonymous 3)", 151);
_yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 152);
return Y.Escape.html(item[name]);
        });
    },

    /**
    Overrides ModelList#getAsURL() to return a map of URL-encoded property
    values rather than performing attribute lookups.

    @method getAsURL
    @param {String} name Property name.
    @return {String[]} Array of URL-encoded property values.
    @see ModelList.getAsURL()
    **/
    getAsURL: function (name) {
        _yuitest_coverfunc("build/lazy-model-list/lazy-model-list.js", "getAsURL", 165);
_yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 166);
if (this.attrAdded(name)) {
            _yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 167);
return encodeURIComponent(AttrProto.get.apply(this, arguments));
        }

        _yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 170);
return YArray.map(this._items, function (item) {
            _yuitest_coverfunc("build/lazy-model-list/lazy-model-list.js", "(anonymous 4)", 170);
_yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 171);
return encodeURIComponent(item[name]);
        });
    },

    /**
    Returns the index of the given object or Model instance in this
    LazyModelList.

    @method indexOf
    @param {Model|Object} needle The object or Model instance to search for.
    @return {Number} Item index, or `-1` if not found.
    @see ModelList.indexOf()
    **/
    indexOf: function (model) {
        _yuitest_coverfunc("build/lazy-model-list/lazy-model-list.js", "indexOf", 184);
_yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 185);
return YArray.indexOf(model && model._isYUIModel ?
            this._models : this._items, model);
    },

    /**
    Overrides ModelList#reset() to work with plain objects.

    @method reset
    @param {Object[]|Model[]|ModelList} [models] Models to add.
    @param {Object} [options] Options.
    @chainable
    @see ModelList.reset()
    **/
    reset: function (items, options) {
        _yuitest_coverfunc("build/lazy-model-list/lazy-model-list.js", "reset", 198);
_yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 199);
items || (items  = []);
        _yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 200);
options || (options = {});

        _yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 202);
var facade = Y.merge({src: 'reset'}, options);

        // Convert `items` into an array of plain objects, since we don't want
        // model instances.
        _yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 206);
items = items._isYUIModelList ? items.map(this._modelToObject) :
            YArray.map(items, this._modelToObject);

        _yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 209);
facade.models = items;

        _yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 211);
if (options.silent) {
            _yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 212);
this._defResetFn(facade);
        } else {
            // Sort the items before firing the reset event.
            _yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 215);
if (this.comparator) {
                _yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 216);
items.sort(Y.bind(this._sort, this));
            }

            _yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 219);
this.fire(EVT_RESET, facade);
        }

        _yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 222);
return this;
    },

    /**
    Revives an item (or all items) into a full Model instance. The _item_
    argument may be the index of an object in this list, an actual object (which
    must exist in the list), or may be omitted to revive all items in the list.

    Once revived, Model instances are attached to this list and cached so that
    reviving them in the future doesn't require another Model instantiation. Use
    the `free()` method to explicitly uncache and detach a previously revived
    Model instance.

    Note: Specifying an index rather than an object will be faster, since
    objects require an `indexOf()` lookup in order to retrieve the index.

    @method revive
    @param {Number|Object} [item] Index of the object to revive, or the object
        itself. If an object, that object must exist in this list. If not
        specified, all items in the list will be revived and an array of models
        will be returned.
    @return {Model|Model[]|null} Revived Model instance, array of revived Model
        instances, or `null` if the given index or object was not found in this
        list.
    @see free()
    **/
    revive: function (item) {
        _yuitest_coverfunc("build/lazy-model-list/lazy-model-list.js", "revive", 248);
_yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 249);
var i, len, models;

        _yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 251);
if (item || item === 0) {
            _yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 252);
return this._revive(Lang.isNumber(item) ? item :
                this.indexOf(item));
        } else {
            _yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 255);
models = [];

            _yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 257);
for (i = 0, len = this._items.length; i < len; i++) {
                _yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 258);
models.push(this._revive(i));
            }

            _yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 261);
return models;
        }
    },

    /**
    Overrides ModelList#toJSON() to use toArray() instead, since it's more
    efficient for LazyModelList.

    @method toJSON
    @return {Object[]} Array of objects.
    @see ModelList.toJSON()
    **/
    toJSON: function () {
        _yuitest_coverfunc("build/lazy-model-list/lazy-model-list.js", "toJSON", 273);
_yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 274);
return this.toArray();
    },

    // -- Protected Methods ----------------------------------------------------

    /**
    Overrides ModelList#add() to work with plain objects.

    @method _add
    @param {Object|Model} item Object or model to add.
    @param {Object} [options] Options.
    @return {Object} Added item.
    @protected
    @see ModelList._add()
    **/
    _add: function (item, options) {
        _yuitest_coverfunc("build/lazy-model-list/lazy-model-list.js", "_add", 289);
_yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 290);
var facade;

        _yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 292);
options || (options = {});

        // If the item is a model instance, convert it to a plain object.
        _yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 295);
item = this._modelToObject(item);

        // Ensure that the item has a clientId.
        _yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 298);
if (!('clientId' in item)) {
            _yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 299);
item.clientId = this._generateClientId();
        }

        _yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 302);
if (this._isInList(item)) {
            _yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 303);
this.fire(EVT_ERROR, {
                error: 'Model is already in the list.',
                model: item,
                src  : 'add'
            });

            _yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 309);
return;
        }

        _yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 312);
facade = Y.merge(options, {
            index: 'index' in options ? options.index : this._findIndex(item),
            model: item
        });

        _yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 317);
options.silent ? this._defAddFn(facade) : this.fire(EVT_ADD, facade);

        _yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 319);
return item;
    },

    /**
    Overrides ModelList#clear() to support `this._models`.

    @method _clear
    @protected
    @see ModelList.clear()
    **/
    _clear: function () {
        _yuitest_coverfunc("build/lazy-model-list/lazy-model-list.js", "_clear", 329);
_yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 330);
YArray.each(this._models, this._detachList, this);

        _yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 332);
this._clientIdMap = {};
        _yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 333);
this._idMap       = {};
        _yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 334);
this._items       = [];
        _yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 335);
this._models      = [];
    },

    /**
    Generates an ad-hoc clientId for a non-instantiated Model.

    @method _generateClientId
    @return {String} Unique clientId.
    @protected
    **/
    _generateClientId: function () {
        _yuitest_coverfunc("build/lazy-model-list/lazy-model-list.js", "_generateClientId", 345);
_yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 346);
GlobalEnv.lastId || (GlobalEnv.lastId = 0);
        _yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 347);
return this.model.NAME + '_' + (GlobalEnv.lastId += 1);
    },

    /**
    Returns `true` if the given item is in this list, `false` otherwise.

    @method _isInList
    @param {Object} item Plain object item.
    @return {Boolean} `true` if the item is in this list, `false` otherwise.
    @protected
    **/
    _isInList: function (item) {
        _yuitest_coverfunc("build/lazy-model-list/lazy-model-list.js", "_isInList", 358);
_yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 359);
return !!(('clientId' in item && this._clientIdMap[item.clientId]) ||
                ('id' in item && this._idMap[item.id]));
    },

    /**
    Converts a Model instance into a plain object. If _model_ is not a Model
    instance, it will be returned as is.

    This method differs from Model#toJSON() in that it doesn't delete the
    `clientId` property.

    @method _modelToObject
    @param {Model|Object} model Model instance to convert.
    @return {Object} Plain object.
    @protected
    **/
    _modelToObject: function (model) {
        _yuitest_coverfunc("build/lazy-model-list/lazy-model-list.js", "_modelToObject", 375);
_yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 376);
if (model._isYUIModel) {
            _yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 377);
model = model.getAttrs();
            _yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 378);
delete model.destroyed;
            _yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 379);
delete model.initialized;
        }

        _yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 382);
return model;
    },

    /**
    Overrides ModelList#_remove() to convert Model instances to indices
    before removing to ensure consistency in the `remove` event facade.

    @method _remove
    @param {Object|Model} item Object or model to remove.
    @param {Object} [options] Options.
    @return {Object} Removed object.
    @protected
    **/
    _remove: function (item, options) {
        // If the given item is a model instance, turn it into an index before
        // calling the parent _remove method, since we only want to deal with
        // the plain object version.
        _yuitest_coverfunc("build/lazy-model-list/lazy-model-list.js", "_remove", 395);
_yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 399);
if (item._isYUIModel) {
            _yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 400);
item = this.indexOf(item);
        }

        _yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 403);
return Y.ModelList.prototype._remove.call(this, item, options);
    },

    /**
    Revives a single model at the specified index and returns it. This is the
    underlying implementation for `revive()`.

    @method _revive
    @param {Number} index Index of the item to revive.
    @return {Model} Revived model.
    @protected
    **/
    _revive: function (index) {
        _yuitest_coverfunc("build/lazy-model-list/lazy-model-list.js", "_revive", 415);
_yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 416);
var item, model;

        _yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 418);
if (index < 0) {
            _yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 419);
return null;
        }

        _yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 422);
item = this._items[index];

        _yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 424);
if (!item) {
            _yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 425);
return null;
        }

        _yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 428);
model = this._models[index];

        _yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 430);
if (!model) {
            _yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 431);
model = new this.model(item);

            // The clientId attribute is read-only, but revived models should
            // have the same clientId as the original object, so we need to set
            // it manually.
            _yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 436);
model._set('clientId', item.clientId);

            _yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 438);
this._attachList(model);
            _yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 439);
this._models[index] = model;
        }

        _yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 442);
return model;
    },

    // -- Event Handlers -------------------------------------------------------

    /**
    Handles `change` events on revived models and updates the original objects
    with the changes.

    @method _afterModelChange
    @param {EventFacade} e
    @protected
    **/
    _afterModelChange: function (e) {
        _yuitest_coverfunc("build/lazy-model-list/lazy-model-list.js", "_afterModelChange", 455);
_yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 456);
var changed = e.changed,
            item    = this._clientIdMap[e.target.get('clientId')],
            name;

        _yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 460);
if (item) {
            _yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 461);
for (name in changed) {
                _yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 462);
if (changed.hasOwnProperty(name)) {
                    _yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 463);
item[name] = changed[name].newVal;
                }
            }
        }
    },

    // -- Default Event Handlers -----------------------------------------------

    /**
    Overrides ModelList#_defAddFn() to support plain objects.

    @method _defAddFn
    @param {EventFacade} e
    @protected
    **/
    _defAddFn: function (e) {
        _yuitest_coverfunc("build/lazy-model-list/lazy-model-list.js", "_defAddFn", 478);
_yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 479);
var item = e.model;

        _yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 481);
this._clientIdMap[item.clientId] = item;

        _yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 483);
if (Lang.isValue(item.id)) {
            _yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 484);
this._idMap[item.id] = item;
        }

        _yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 487);
this._items.splice(e.index, 0, item);
    },

    /**
    Overrides ModelList#_defRemoveFn() to support plain objects.

    @method _defRemoveFn
    @param {EventFacade} e
    @protected
    **/
    _defRemoveFn: function (e) {
        _yuitest_coverfunc("build/lazy-model-list/lazy-model-list.js", "_defRemoveFn", 497);
_yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 498);
var index = e.index,
            item  = e.model,
            model = this._models[index];

        _yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 502);
delete this._clientIdMap[item.clientId];

        _yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 504);
if ('id' in item) {
            _yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 505);
delete this._idMap[item.id];
        }

        _yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 508);
if (model) {
            _yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 509);
this._detachList(model);
        }

        _yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 512);
this._items.splice(index, 1);
        _yuitest_coverline("build/lazy-model-list/lazy-model-list.js", 513);
this._models.splice(index, 1);
    }
});


}, '@VERSION@', {"requires": ["model-list"]});
