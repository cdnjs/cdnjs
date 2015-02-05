YUI.add('model-sync-local', function (Y, NAME) {

/*
An extension which provides a sync implementation through locally stored
key value pairs, either through the HTML localStorage API or falling back
onto an in-memory cache, that can be mixed into a Model or ModelList subclass.

@module app
@submodule model-sync-local
@since 3.13.0
**/

/**
An extension which provides a sync implementation through locally stored
key value pairs, either through the HTML localStorage API or falling back
onto an in-memory cache, that can be mixed into a Model or ModelList subclass.

A group of Models/ModelLists is serialized in localStorage by either its
class name, or a specified 'root' that is provided.

    var User = Y.Base.create('user', Y.Model, [Y.ModelSync.Local], {
        root: 'user'
    });

    var Users = Y.Base.create('users', Y.ModelList, [Y.ModelSync.Local], {
        model: User,
    });

@class ModelSync.Local
@extensionfor Model
@extensionfor ModelList
@since 3.13.0
**/
function LocalSync() {}

/**
Properties that shouldn't be turned into ad-hoc attributes when passed to a
Model or ModelList constructor.

@property _NON_ATTRS_CFG
@type Array
@default ['root']
@static
@protected
@since 3.13.0
**/
LocalSync._NON_ATTRS_CFG = ['root'];

/**
Feature testing for `localStorage` availability.
Will return falsey for browsers with `localStorage`, but that don't
actually work, such as iOS Safari in private browsing mode.

@property _hasLocalStorage
@type Boolean
@private
**/
LocalSync._hasLocalStorage = (function () {
    var LS   = Y.config.win.localStorage,
        test = Y.guid();

    try {
        LS.setItem(test, test);
        LS.removeItem(test);
        return true;
    } catch (e) {
        return false;
    }
})(),

/**
Object of key/value pairs to fall back on when localStorage is not available.

@property _data
@type Object
@private
**/
LocalSync._data = {};

/**
Cache to quickly access a specific object with a given ID.
This maps a model's ID to its reference inside of `LocalSync._data`.

@property _idMap
@type Object
@private
**/

LocalSync._idMap = {};

LocalSync.prototype = {

    // -- Public Methods -------------------------------------------------------
    
    /**
    Root used as the key inside of localStorage and/or the in-memory store.
    
    @property root
    @type String
    @default ""
    @since 3.13.0
    **/
    root: '',

    /**
    Shortcut for access to localStorage.
    
    @property storage
    @type Storage
    @default null
    @since 3.13.0
    **/
    storage: null,

    // -- Lifecycle Methods -----------------------------------------------------
    initializer: function (config) {
        var store, data;

        config || (config = {});

        if ('root' in config) {
            this.root = config.root || '';
        }

        // This is checking to see if the sync layer is being applied to
        // a ModelList, and if so, is looking for a `root` property on its
        // Model's prototype instead.
        if (!this.root && this.model && this.model.prototype.root) {
            this.root = this.model.prototype.root;
        }

        if (LocalSync._hasLocalStorage) {
            this.storage = Y.config.win.localStorage;
            store = this.storage.getItem(this.root);
        } else {
        }

        // Pull in existing data from localStorage, if possible.
        // Otherwise, see if there's existing data on the local cache.
        if (store) {
            try {
                LocalSync._data[this.root] = Y.JSON.parse(store);
            } catch (e) {
                LocalSync._data[this.root] = [];
            }
        } else {
            LocalSync._data[this.root] || (LocalSync._data[this.root] = []);
        }

        // Map each model's ID to its reference inside of data, if there
        // are already existing models inside of `localStorage`.
        LocalSync._idMap[this.root] || (LocalSync._idMap[this.root] = {});
        Y.Array.each(LocalSync._data[this.root], function (item) {
            var id = item.id;
            if (id) {
                LocalSync._idMap[this.root][id] = item;
            }
        }, this);
    },
    
    // -- Public Methods -----------------------------------------------------------
    
    /**
    Creates a synchronization layer with the localStorage API, if available.
    Otherwise, falls back to a in-memory data store.

    This method is called internally by load(), save(), and destroy().

    @method sync
    @param {String} action Sync action to perform. May be one of the following:

      * **create**: Store a newly-created model for the first time.
      * **read**  : Load an existing model.
      * **update**: Update an existing model.
      * **delete**: Delete an existing model.

    @param {Object} [options] Sync options
    @param {callback} [callback] Called when the sync operation finishes.
      @param {Error|null} callback.err If an error occurred, this parameter will
        contain the error. If the sync operation succeeded, _err_ will be
        falsey.
      @param {Any} [callback.response] The response from our sync. This value will
        be passed to the parse() method, which is expected to parse it and
        return an attribute hash.
    **/
    sync: function (action, options, callback) {
        options || (options = {});
        var response, errorInfo;

        try {
            switch (action) {
                case 'read':
                    if (this._isYUIModelList) {
                        response = this._index(options);
                    } else {
                        response = this._show(options);
                    }
                    break;
                case 'create':
                    response = this._create(options);
                    break;
                case 'update':
                    response = this._update(options);
                    break;
                case 'delete':
                    response = this._destroy(options);
                    break;
            }
        } catch (error) {
            errorInfo = error.message;
        }

        if (response) {
            callback(null, response);
        } else if (errorInfo) {
            callback(errorInfo);
        } else {
            callback("Data not found in LocalStorage");
        }
    },

    /**
    Generate a random GUID for our Models. This can be overriden if you have
    another method of generating different IDs.
    
    @method generateID
    @protected
    @param {String} pre Optional GUID prefix
    **/
    generateID: function (pre) {
        return Y.guid(pre + '_');
    },

    // -- Protected Methods ----------------------------------------------------

    /**
    Sync method correlating to the "read" operation, for a Model List
    
    @method _index
    @return {Object[]} Array of objects found for that root key
    @protected
    @since 3.13.0
    **/
    _index: function () {
        return LocalSync._data[this.root];
    },

    /**
    Sync method correlating to the "read" operation, for a Model
    
    @method _show
    @return {Object} Object found for that root key and model ID
    @protected
    @since 3.13.0
    **/
    _show: function () {
        return LocalSync._idMap[this.root][this.get('id')] || null;
    },
    
    /**
    Sync method correlating to the "create" operation
    
    @method _show
    @return {Object} The new object created.
    @protected
    @since 3.13.0
    **/
    _create: function () {
        var hash  = this.toJSON(),
            data  = LocalSync._data[this.root],
            idMap = LocalSync._idMap[this.root];
        
        hash.id = this.generateID(this.root);
        data.push(hash);
        idMap[hash.id] = hash;

        this._save();
        return hash;
    },

    /**
    Sync method correlating to the "update" operation

    @method _update
    @return {Object} The updated object.
    @protected
    @since 3.13.0
    **/
    _update: function () {
        var hash = Y.merge(this.toJSON());
        LocalSync._idMap[this.get('id')] = hash;
        
        this._save();
        return hash;
    },

    /**
    Sync method correlating to the "delete" operation.  Deletes the data
    from the in-memory object, and saves into localStorage if available.
    
    @method _destroy
    @return {Object} The deleted object.
    @protected
    @since 3.13.0
    **/
    _destroy: function () {
        delete LocalSync._idMap[this.get('id')];
        this._save();
        return this.toJSON();
    },
    
    /**
    Saves the current in-memory store into a localStorage key/value pair
    if localStorage is available; otherwise, does nothing.
    
    @method _save
    @protected
    @since 3.13.0
    **/
    _save: function () {
        if (LocalSync._hasLocalStorage) {
            this.storage && this.storage.setItem(
                this.root,
                Y.JSON.stringify(LocalSync._data[this.root])
            );
        }
    }
};

// -- Namespace ---------------------------------------------------------------

Y.namespace('ModelSync').Local = LocalSync;


}, '@VERSION@', {"requires": ["model", "json-stringify"]});
