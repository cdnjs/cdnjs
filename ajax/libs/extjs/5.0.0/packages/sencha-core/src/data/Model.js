/**
 * A Model or Entity represents some object that your application manages. For example, one
 * might define a Model for Users, Products, Cars, or other real-world object that we want
 * to model in the system. Models are used by {@link Ext.data.Store stores}, which are in
 * turn used by many of the data-bound components in Ext.
 *
 * # Fields
 *
 * Models are defined as a set of fields and any arbitrary methods and properties relevant
 * to the model. For example:
 *
 *     Ext.define('User', {
 *         extend: 'Ext.data.Model',
 *         fields: [
 *             {name: 'name',  type: 'string'},
 *             {name: 'age',   type: 'int', convert: null},
 *             {name: 'phone', type: 'string'},
 *             {name: 'alive', type: 'boolean', defaultValue: true, convert: null}
 *         ],
 *
 *         changeName: function() {
 *             var oldName = this.get('name'),
 *                 newName = oldName + " The Barbarian";
 *
 *             this.set('name', newName);
 *         }
 *     });
 *
 * Now we can create instances of our User model and call any model logic we defined:
 *
 *     var user = Ext.create('User', {
 *         id   : 'ABCD12345',
 *         name : 'Conan',
 *         age  : 24,
 *         phone: '555-555-5555'
 *     });
 *
 *     user.changeName();
 *     user.get('name'); //returns "Conan The Barbarian"
 *
 * By default, the built in field types such as number and boolean coerce string values
 * in the raw data by virtue of their {@link Ext.data.field.Field#method-convert} method.
 * When the server can be relied upon to send data in a format that does not need to be
 * converted, disabling this can improve performance. The {@link Ext.data.reader.Json Json}
 * and {@link Ext.data.reader.Array Array} readers are likely candidates for this
 * optimization. To disable field conversions you simply specify `null` for the field's
 * {@link Ext.data.field.Field#cfg-convert convert config}.
 *
 * ## The "id" Field and `idProperty`
 *
 * A Model definition always has an *identifying field* which should yield a unique key
 * for each instance. By default, a field named "id" will be created with a
 * {@link Ext.data.Field#mapping mapping} of "id". This happens because of the default
 * {@link #idProperty} provided in Model definitions.
 *
 * To alter which field is the identifying field, use the {@link #idProperty} config.
 *
 * # Validators
 *
 * Models have built-in support for field validators. Validators are added to models as in
 * the follow example:
 *
 *     Ext.define('User', {
 *         extend: 'Ext.data.Model',
 *         fields: [
 *             { name: 'name',     type: 'string' },
 *             { name: 'age',      type: 'int' },
 *             { name: 'phone',    type: 'string' },
 *             { name: 'gender',   type: 'string' },
 *             { name: 'username', type: 'string' },
 *             { name: 'alive',    type: 'boolean', defaultValue: true }
 *         ],
 *
 *         validators: {
 *             age: 'presence',
 *             name: { type: 'length', min: 2 },
 *             gender: { type: 'inclusion', list: ['Male', 'Female'] },
 *             username: [
 *                 { type: 'exclusion', list: ['Admin', 'Operator'] },
 *                 { type: 'format', matcher: /([a-z]+)[0-9]{2,3}/i }
 *             ]
 *         }
 *     });
 *
 * The derived type of `Ext.data.field.Field` can also provide validation. If `validators`
 * need to be duplicated on multiple fields, instead consider creating a custom field type.
 *
 * ## Validation
 *
 * The results of the validators can be retrieved via the "associated" validation record:
 *
 *     var instance = Ext.create('User', {
 *         name: 'Ed',
 *         gender: 'Male',
 *         username: 'edspencer'
 *     });
 *
 *     var validation = instance.getValidation();
 *
 * The returned object is an instance of `Ext.data.Validation` and has as its fields the
 * result of the field `validators`. The validation object is "dirty" if there are one or
 * more validation errors present.
 *
 * This record is also available when using data binding as a "pseudo-association" called
 * "validation". This pseudo-association can be hidden by an explicitly declared
 * association by the same name (for compatibility reasons), but doing so is not
 * recommended.
 *
 * The `{@link Ext.Component#modelValidation}` config can be used to enable automatic
 * binding from the "validation" of a record to the form fields that may be bound to its
 * values.
 *
 * # Associations
 *
 * Models often have associations with other Models. These associations can be defined by
 * fields (often called "foreign keys") or by other data such as a many-to-many (or "matrix").
 *
 * ## Foreign-Key Associations - One-to-Many
 *
 * The simplest way to define an association from one Model to another is to add a
 * {@link Ext.data.field.Field#cfg-reference reference config} to the appropriate field.
 *
 *      Ext.define('Post', {
 *          extend: 'Ext.data.Model',
 *
 *          fields: [
 *              { name: 'user_id', reference: 'User' }
 *          ]
 *      });
 *
 *      Ext.define('Comment', {
 *          extend: 'Ext.data.Model',
 *
 *          fields: [
 *              { name: 'user_id', reference: 'User' },
 *              { name: 'post_id', reference: 'Post' }
 *          ]
 *      });
 *
 *      Ext.define('User', {
 *          extend: 'Ext.data.Model',
 *
 *          fields: [
 *              'name'
 *          ]
 *      });
 *
 * The placement of `reference` on the appropriate fields tells the Model which field has
 * the foreign-key and the type of Model it identifies. That is, the value of these fields
 * is set to value of the `idProperty` field of the target Model.
 *
 * ### One-to-Many Without Foreign-Keys
 *
 * To define an association without a foreign-key field, you will need to use either the
 * `{@link #cfg-hasMany}` or `{@link #cfg-belongsTo}`.
 *
 *      Ext.define('Post', {
 *          extend: 'Ext.data.Model',
 *
 *          belongsTo: 'User'
 *      });
 *
 *      Ext.define('Comment', {
 *          extend: 'Ext.data.Model',
 *
 *          belongsTo: [ 'Post', 'User' ]
 *      });
 *
 *      // User is as above
 *
 * These declarations have changed slightly from previous releases. In previous releases
 * both "sides" of an association had to declare their particular roles. This is now only
 * required if the defaults assumed for names are not satisfactory.
 *
 * ## Foreign-Key Associations - One-to-One
 *
 * A special case of one-to-many associations is the one-to-one case. This is defined as
 * a `{@link Ext.data.field.Field#reference unique reference}`.
 *
 *      Ext.define('Address', {
 *          extend: 'Ext.data.Model',
 *
 *          fields: [
 *              'address',
 *              'city',
 *              'state'
 *          ]
 *      });
 *
 *      Ext.define('User', {
 *          extend: 'Ext.data.Model',
 *
 *          fields: [{
 *              name: 'addressId',
 *              reference: 'Address',
 *              unique: true
 *          }]
 *      });
 *
 * ## Many-to-Many
 *
 * The classic use case for many-to-many is a User and Group. Users can belong to many
 * Groups and Groups can contain many Users. This association is declared using the
 * `{@link #cfg-manyToMany}` config like so:
 *
 *
 *      Ext.define('User', {
 *          extend: 'Ext.data.Model',
 *
 *          fields: [
 *              'name'
 *          ],
 *
 *          manyToMany: 'Group'
 *      });
 *
 *      Ext.define('Group', {
 *          extend: 'Ext.data.Model',
 *
 *          fields: [
 *              'name'
 *          ],
 *
 *          manyToMany: 'User'
 *      });
 *
 * As with other associations, only one "side" needs to be declared.
 *
 * To manage the relationship between a `manyToMany` relationship, a {@link Ext.data.Session}
 * must be used.
 *
 * # Using a Proxy
 *
 * Models are great for representing types of data and relationships, but sooner or later we're going to want to load or
 * save that data somewhere. All loading and saving of data is handled via a {@link Ext.data.proxy.Proxy Proxy}, which
 * can be set directly on the Model:
 *
 *     Ext.define('User', {
 *         extend: 'Ext.data.Model',
 *         fields: ['id', 'name', 'email'],
 *
 *         proxy: {
 *             type: 'rest',
 *             url : '/users'
 *         }
 *     });
 *
 * Here we've set up a {@link Ext.data.proxy.Rest Rest Proxy}, which knows how to load and save data to and from a
 * RESTful backend. Let's see how this works:
 *
 *     var user = Ext.create('User', {name: 'Ed Spencer', email: 'ed@sencha.com'});
 *
 *     user.save(); //POST /users
 *
 * Calling {@link #save} on the new Model instance tells the configured RestProxy that we wish to persist this Model's
 * data onto our server. RestProxy figures out that this Model hasn't been saved before because it doesn't have an id,
 * and performs the appropriate action - in this case issuing a POST request to the url we configured (/users). We
 * configure any Proxy on any Model and always follow this API - see {@link Ext.data.proxy.Proxy} for a full list.
 *
 * Loading data via the Proxy is accomplished with the static `load` method:
 *
 *     //Uses the configured RestProxy to make a GET request to /users/123
 *     User.load(123, {
 *         success: function(user) {
 *             console.log(user.getId()); //logs 123
 *         }
 *     });
 *
 * Models can also be updated and destroyed easily:
 *
 *     //the user Model we loaded in the last snippet:
 *     user.set('name', 'Edward Spencer');
 *
 *     //tells the Proxy to save the Model. In this case it will perform a PUT request to /users/123 as this Model already has an id
 *     user.save({
 *         success: function() {
 *             console.log('The User was updated');
 *         }
 *     });
 *
 *     //tells the Proxy to destroy the Model. Performs a DELETE request to /users/123
 *     user.erase({
 *         success: function() {
 *             console.log('The User was destroyed!');
 *         }
 *     });
 * 
 * # HTTP Parameter names when using a {@link Ext.data.proxy.Ajax Ajax proxy}
 *
 * By default, the model ID is specified in an HTTP parameter named `id`. To change the
 * name of this parameter use the Proxy's {@link Ext.data.proxy.Ajax#idParam idParam}
 * configuration.
 *
 * Parameters for other commonly passed values such as
 * {@link Ext.data.proxy.Ajax#pageParam page number} or
 * {@link Ext.data.proxy.Ajax#startParam start row} may also be configured.
 *
 * # Usage in Stores
 *
 * It is very common to want to load a set of Model instances to be displayed and manipulated in the UI. We do this by
 * creating a {@link Ext.data.Store Store}:
 *
 *     var store = Ext.create('Ext.data.Store', {
 *         model: 'User'
 *     });
 *
 *     //uses the Proxy we set up on Model to load the Store data
 *     store.load();
 *
 * A Store is just a collection of Model instances - usually loaded from a server somewhere. Store can also maintain a
 * set of added, updated and removed Model instances to be synchronized with the server via the Proxy. See the {@link
 * Ext.data.Store Store docs} for more information on Stores.
 */
Ext.define('Ext.data.Model', {
    alternateClassName: 'Ext.data.Record',

    requires: [
        'Ext.data.ErrorCollection',
        'Ext.data.operation.*',
        'Ext.data.field.*',
        'Ext.data.validator.Validator',
        'Ext.data.schema.Schema',
        'Ext.data.identifier.Generator',
        'Ext.data.identifier.Sequential'
    ],
    uses: [
        'Ext.data.Validation'
    ],

    /**
     * @property {Boolean} isEntity
     * The value `true` to identify this class and its subclasses.
     * @readonly
     */
    isEntity: true,

    /**
     * @property {Boolean} isModel
     * The value `true` to identify this class and its subclasses.
     * @readonly
     */
    isModel: true,

    // Record ids are more flexible.
    validIdRe: null,

    observableType: 'record',

    constructor: function (data, session) {
        var me = this,
            cls = me.self,
            identifier = cls.identifier,
            Model = Ext.data.Model,
            modelIdentifier = Model.identifier,
            idProperty = me.idField.name,
            array, id, initializeFn, internalId, len, i, fields;

        me.data = data || (data = {});
        me.session = session || null;
        me.internalId = internalId = modelIdentifier.generate();

        //<debug>
        if (session && !session.isSession) {
            Ext.Error.raise('Bad Model constructor argument 2 - "session" is not a Session');
        }
        //</debug>

        if ((array = data) instanceof Array) {
            me.data = data = {};
            fields = me.getFields();
            len = Math.min(fields.length, array.length);
            for (i = 0; i < len; ++i) {
                data[fields[i].name] = array[i];
            }
        }

        if (!(initializeFn = cls.initializeFn)) {
            cls.initializeFn = initializeFn = Model.makeInitializeFn(cls);
        }
        if (!initializeFn.$nullFn) {
            cls.initializeFn(me);
        }

        // Must do this after running the initializeFn due to converters on idField
        if (!(me.id = id = data[idProperty]) && id !== 0) {
            if (session) {
                identifier = session.getIdentifier(cls);
                id = identifier.generate();
            } else if (modelIdentifier === identifier) {
                id = internalId;
            } else {
                id = identifier.generate();
            }

            data[idProperty] = me.id = id;
            me.phantom = true;
        }

        if (session) {
            session.add(me);
        }

        if (me.init && Ext.isFunction(me.init)) {
            me.init();
        }
    },

    /**
     * @property {String} entityName
     * The short name of this entity class. This name is derived from the `namespace` of
     * the associated `schema` and this class name. By default, this name is the leaf name
     * of the class, or if the full class name contains `".model."`, the `entityName` will
     * default to the tail of the class name following that segment. For this class:
     * 
     *      Ext.define('MyApp.model.Foo', {
     *          extend: 'Ext.data.Model',
     *          ...
     *      });
     *
     *      // entityName == 'Foo'
     *
     *      Ext.define('MyApp.model.sub.Bar', {
     *          extend: 'Ext.data.Model',
     *          ...
     *      });
     *
     *      // entityName == 'sub.Bar'
     *
     * All entities in a given `schema` must have a unique `entityName`.
     * 
     * For more details see "Relative Naming" in {@link Ext.data.schema.Schema}.
     */

    /**
     * @property {Boolean} editing
     * Internal flag used to track whether or not the model instance is currently being edited.
     * @readonly
     */
    editing: false,

    /**
     * @property {Boolean} dirty
     * True if this record has been modified.
     * @readonly
     */
    dirty: false,

    /**
     * @property {Ext.data.Session} session
     * The {@link Ext.data.Session} for this record.
     * @readonly
     */
    session: null,

    /**
     * @property {Boolean} dropped
     * True if this record is pending delete on the server. This is set by the `drop`
     * method and transmitted to the server by the `save` method.
     * @readonly
     */
    dropped: false,
    
    /**
     * @property {Boolean} erased
     * True if this record has been erased on the server. This flag is set of the `erase`
     * method.
     * @readonly
     */
    erased: false,

    /**
     * @cfg {String} [clientIdProperty]
     * The name of the property a server will use to send back a client-generated id in a
     * `create` or `update` `{@link Ext.data.operation.Operation operation}`.
     *
     * If specified, this property cannot have the same name as any other field.
     *
     * For example:
     *
     *      Ext.define('Person', {
     *          idProperty: 'id',  // this is the default value (for clarity)
     *
     *          clientIdProperty: 'clientId',
     *
     *          identifier: 'negative', // to generate -1, -2 etc on the client
     *
     *          fields: [ 'name' ]
     *      });
     *
     *      var person = new Person({
     *          // no id provided, so -1 is generated
     *          name: 'Clark Kent'
     *      });
     *
     * The server is given this data during the `create`:
     *
     *      {
     *          id: -1,
     *          name: 'Clark Kent'
     *      }
     *
     * The server allocates a real id and responds like so:
     *
     *      {
     *          id: 427,
     *          clientId: -1
     *      }
     *
     * This property is most useful when creating multiple entities in a single call to
     * the server in a `{@link Ext.data.operation.Create create operation}`. Alternatively,
     * the server could respond with records that correspond one-to-one to those sent in
     * the `operation`.
     *
     * For example the client could send a `create` with this data:
     *
     *      [ { id: -1, name: 'Clark Kent' },
     *        { id: -2, name: 'Peter Parker' },
     *        { id: -3, name: 'Bruce Banner' } ]
     *
     * And the server could respond in the same order:
     *
     *      [ { id: 427 },      // updates id = -1
     *        { id: 428 },      // updates id = -2
     *        { id: 429 } ]     // updates id = -3
     *
     * Or using `clientIdProperty` the server could respond in arbitrary order:
     *
     *      [ { id: 427, clientId: -3 },
     *        { id: 428, clientId: -1 },
     *        { id: 429, clientId: -2 } ]
     *
     * **IMPORTANT:** When upgrading from previous versions be aware that this property
     * used to perform the role of `{@link Ext.data.writer.Writer#clientIdProperty}` as
     * well as that described above. To continue send a client-generated id as other than
     * the `idProperty`, set `clientIdProperty` on the `writer`. A better solution, however,
     * is most likely a properly configured `identifier` as that would work better with
     * associations.
     */
    clientIdProperty: null,

    evented: false,

    /**
     * @property {Boolean} phantom
     * True when the record does not yet exist in a server-side database. Any record which
     * has a real database identity set as its `idProperty` is NOT a phantom -- it's real.
     */
    phantom: false,

    /**
     * @cfg {String} [idProperty='id']
     * The name of the field treated as this Model's unique id.
     *
     * If defining an **abstract** base Model class, the `idProperty` may be configured
     * as `null` which will mean that no identifying field will be generated. Concrete
     * derived classes must eventually provide a value for this property.
     *
     * The data values for this field must be unique or there will be id value collisions
     * in the {@link Ext.data.Store Store}.
     */
    idProperty: 'id',

    /**
     * @cfg {String/Object} identifier
     * The id generator to use for this model. The default id generator does not generate
     * values for the {@link #idProperty}.
     *
     * This can be overridden at the model level to provide a custom generator for a model.
     * The simplest form of this would be:
     *
     *      Ext.define('MyApp.data.MyModel', {
     *          extend: 'Ext.data.Model',
     *          requires: ['Ext.data.identifier.Sequential'],
     *          identifier: 'sequential',
     *          ...
     *      });
     *
     * The above would generate {@link Ext.data.identifier.Sequential sequential} id's such
     * as 1, 2, 3 etc..
     *
     * Another useful id generator is {@link Ext.data.identifier.Uuid}:
     *
     *      Ext.define('MyApp.data.MyModel', {
     *          extend: 'Ext.data.Model',
     *          requires: ['Ext.data.identifier.Uuid'],
     *          identifier: 'uuid',
     *          ...
     *      });
     *
     * An id generator can also be further configured:
     *
     *      Ext.define('MyApp.data.MyModel', {
     *          extend: 'Ext.data.Model',
     *          identifier: {
     *              type: 'sequential',
     *              seed: 1000,
     *              prefix: 'ID_'
     *          }
     *      });
     *
     * The above would generate id's such as ID_1000, ID_1001, ID_1002 etc..
     *
     * If multiple models share an id space, a single generator can be shared:
     *
     *      Ext.define('MyApp.data.MyModelX', {
     *          extend: 'Ext.data.Model',
     *          identifier: {
     *              type: 'sequential',
     *              id: 'xy'
     *          }
     *      });
     *
     *      Ext.define('MyApp.data.MyModelY', {
     *          extend: 'Ext.data.Model',
     *          identifier: {
     *              type: 'sequential',
     *              id: 'xy'
     *          }
     *      });
     *
     * For more complex, shared id generators, a custom generator is the best approach.
     * See {@link Ext.data.identifier.Generator} for details on creating custom id generators.
     */
    identifier: null,

    // Fields config and property
    /**
     * @cfg {Object[]/String[]} fields
     * The fields for this model. This is an Array of `Ext.data.field.Field` definition
     * objects or simply the field name. If just a name is given, the field type defaults
     * to `auto`.
     */
    /**
     * @property {Ext.data.field.Field[]} fields
     * An array fields defined for this Model (including fields defined in superclasses)
     * in ordinal order; that is in declaration order.
     * @private
     * @readonly
     */

    /**
     * @property {Object} fieldOrdinals
     * This property is indexed by field name and contains the ordinal of that field. The
     * ordinal often has meaning to servers and is derived based on the position in the
     * `fields` array.
     * 
     * This can be used like so:
     * 
     *      Ext.define('MyApp.models.User', {
     *          extend: 'Ext.data.Model',
     *
     *          fields: [
     *              { name: 'name' }
     *          ]
     *      });
     * 
     *      var nameOrdinal = MyApp.models.User.fieldOrdinals.name;
     *      
     *      // or, if you have an instance:
     *
     *      var user = new MyApp.models.User();
     *      var nameOrdinal = user.fieldOrdinals.name;
     *
     * @private
     * @readonly
     */

     /**
      * @property {Object} modified
      * A hash of field values which holds the initial values of fields before a set of edits
      * are {@link #commit committed}.
      */

    /**
     * @property {Object} previousValues
     * This object is similar to the `modified` object except it holds the data values as
     * they were prior to the most recent change.
     * @readonly
     * @private
     */
    previousValues: undefined, // Not "null" so getPrevious returns undefined first time

    /**
     * @cfg {String/Object/Ext.data.proxy.Proxy} proxy
     * The {@link Ext.data.proxy.Proxy proxy} to use for this class.
     */
    proxy: undefined,

    /**
     * @cfg {String/Object} [schema='default']
     * The name of the {@link Ext.data.schema.Schema schema} to which this entity and its
     * associations belong. For details on custom schemas see `Ext.data.schema.Schema`.
     */
    /**
     * @property {Ext.data.schema.Schema} schema
     * The `Ext.data.schema.Schema` to which this entity and its associations belong.
     * @readonly
     */
    schema: 'default',

    /**
     * @cfg {String} [versionProperty]
     * If specified, this is the name of the property that contains the entity "version".
     * The version property is used to manage a long-running transaction and allows the
     * detection of simultaneous modification.
     * 
     * The way a version property is used is that the client receives the version as it
     * would any other entity property. When saving an entity, this property is always
     * included in the request and the server uses the value in a "conditional update".
     * If the current version of the entity on the server matches the version property
     * sent by the client, the update is allowed. Otherwise, the update fails.
     * 
     * On successful update, both the client and server increment the version. This is
     * done on the server in the conditional update and on the client when it receives a
     * success on its update request.
     */
    versionProperty: null,

    /**
     * @property {Number} generation
     * This property is incremented on each modification of a record.
     * @readonly
     * @since 5.0.0
     */
    generation: 1,

    /**
     * @cfg {Object[]} validators
     * An array of {@link Ext.data.validator.Validator validators} for this model.
     */

    /**
     * @cfg {String} [validationSeparator=null]
     * If specified this property is used to concatenate multiple errors for each field
     * as reported by the `validators`.
     */
    validationSeparator: null,

    /**
     * @cfg {Boolean} [convertOnSet=true]
     * Set to `false` to  prevent any converters from being called during a set operation.
     */
     convertOnSet: true,

    // Associations configs and properties
    /**
     * @cfg {Object[]} associations
     * An array of {@link Ext.data.schema.Association associations} for this model.
     */
    /**
     * @cfg {String/Object/String[]/Object[]} hasMany
     * One or more {@link Ext.data.HasManyAssociation HasMany associations} for this model.
     */
    /**
     * @cfg {String/Object/String[]/Object[]} belongsTo
     * One or more {@link Ext.data.BelongsToAssociation BelongsTo associations} for this model.
     */

    /**
     * Begins an edit. While in edit mode, no events (e.g.. the `update` event) are
     * relayed to the containing store. When an edit has begun, it must be followed by
     * either `endEdit` or `cancelEdit`.
     */
    beginEdit: function () {
        var me = this,
            modified = me.modified,
            previousValues = me.previousValues;

        if (!me.editing) {
            me.editing = true;

            me.editMemento = {
                dirty: me.dirty,
                data: Ext.apply({}, me.data),
                generation: me.generation,
                modified: modified && Ext.apply({}, modified),
                previousValues: previousValues && Ext.apply({}, previousValues)
            };
        }
    },

    /**
     * Cancels all changes made in the current edit operation.
     */
    cancelEdit: function () {
        var me = this,
            editMemento = me.editMemento;

        if (editMemento) {
            me.editing = false;

            // reset the modified state, nothing changed since the edit began
            Ext.apply(me, editMemento);
            me.editMemento = null;
        }
    },

    /**
     * Ends an edit. If any data was modified, the containing store is notified
     * (ie, the store's `update` event will fire).
     * @param {Boolean} [silent] True to not notify any stores of the change.
     * @param {String[]} [modifiedFieldNames] Array of field names changed during edit.
     */
    endEdit: function (silent, modifiedFieldNames) {
        var me = this,
            editMemento = me.editMemento;

        if (editMemento) {
            me.editing = false;
            me.editMemento = null;

            // Since these reflect changes we never notified others about, the real set
            // of "previousValues" is what we captured in the memento:
            me.previousValues = editMemento.previousValues;

            if (!silent) {
                if (!modifiedFieldNames) {
                    modifiedFieldNames = me.getModifiedFieldNames(editMemento.data);
                }

                if (me.dirty || (modifiedFieldNames && modifiedFieldNames.length)) {
                    me.callJoined('afterEdit', [modifiedFieldNames]);
                }
            }
        }
    },

    getField: function (name) {
        return this.self.getField(name);
    },

    /**
     * Get the fields array for this model.
     * @return {Ext.data.field.Field[]} The fields array
     */
    getFields: function () {
        return this.self.getFields();
    },

    getFieldsMap: function () {
        return this.fieldsMap;
    },

    /**
     * Get the idProperty for this model.
     * @return {String} The idProperty
     */
    getIdProperty: function () {
        return this.idProperty;
    },

    /**
     * Returns the unique ID allocated to this model instance as defined by `idProperty`.
     * @return {Number/String} The id
     */
    getId: function () {
        return this.id;
    },

    /**
     * Return a unique observable ID. Model is not observable but tree nodes (`Ext.data.NodeInterface`) are, so
     * they must be globally unique within the {@link #observableType}.
     * @protected
     */
    getObservableId: function() {
        return this.internalId;
    },

    /**
     * Sets the model instance's id field to the given id.
     * @param {Number/String} id The new id
     */
    setId: function (id) {
        this.set(this.idProperty, id);
    },

    /**
     * This method returns the value of a field given its name prior to its most recent
     * change.
     * @param {String} fieldName The field's {@link Ext.data.field.Field#name name}.
     * @return {Object} The value of the given field prior to its current value. `undefined`
     * if there is no previous value;
     */
    getPrevious: function (fieldName) {
        var previousValues = this.previousValues;
        return previousValues && previousValues[fieldName];
    },

    /**
     * Returns true if the passed field name has been `{@link #modified}` since the load or last commit.
     * @param {String} fieldName The field's {@link Ext.data.field.Field#name name}.
     * @return {Boolean}
     */
    isModified: function (fieldName) {
        var modified = this.modified;
        return !!(modified && modified.hasOwnProperty(fieldName));
    },
    
    /**
     * Returns the original value of a modified field. If there is no modified value,
     * `undefined` will be return. Also see {@link #isModified}.
     * @return {Object} modified
     */
    getModified: function (fieldName) {
        var out;
        if (this.isModified(fieldName)) {
            out = this.modified[fieldName];
        }
        return out;
    },

    /**
     * Returns the value of the given field.
     * @param {String} fieldName The name of the field.
     * @return {Object} The value of the specified field.
     */
    get: function (fieldName) {
        return this.data[fieldName];
    },

    // This object is used whenever the set() method is called and given a string as the
    // first argument. This approach saves memory (and GC costs) since we could be called
    // a lot.
    _singleProp: {},

    _rejectOptions: {
        convert: false,
        commit: true,
        silent: true
    },

    /**
     * Sets the given field to the given value, marks the instance as dirty
     * @param {String/Object} fieldName The field to set, or an object containing key/value pairs
     * @param {Object} newValue The value for the field (if `fieldName` is a string).
     * @param {Object} [options] Options for governing this update.
     * @param {Boolean} [options.convert=true] Set to `false` to  prevent any converters from 
     * being called during the set operation. This may be useful when setting a large bunch of raw values.
     * @param {Boolean} [options.dirty=true] Pass `false` if the field values are to be
     * understood as non-dirty (fresh from the server). When `true`, this change will be
     * reflected in the `modified` collection.
     * @param {Boolean} [options.commit=false] Pass `true` to call the {@link #commit} method after
     * setting fields. If this option is passed, the usual after change processing will be
     * bypassed. {@link #commit Commit} will be called even if there are no field changes.
     * @param {Boolean} [options.silent=false] Pass `true` to suppress notification of any
     * changes made by this call. Use with caution.
     * @return {String[]} The array of modified field names or null if nothing was modified.
     */
    set: function (fieldName, newValue, options) {
        var me = this,
            cls = me.self,
            data = me.data,
            modified = me.modified,
            prevVals = me.previousValues,
            session = me.session,
            single = Ext.isString(fieldName),
            opt = (single ? options : newValue),
            convertOnSet = opt ? opt.convert !== false : me.convertOnSet,
            fieldsMap = me.fieldsMap,
            silent = opt && opt.silent,
            commit = opt && opt.commit,
            updateRefs = !(opt && opt.refs === false) && session,
            // Don't need to do dirty processing with commit, since we'll always
            // end up with nothing modified and not dirty
            dirty = !(opt && opt.dirty === false && !commit),
            modifiedFieldNames = null,
            currentValue, field, idChanged, key, name, oldId, comparator, dep, dependents,
            i, dirtyRank=0, numFields, newId, rankedFields, reference, value, values;

        if (single) {
            values = me._singleProp;
            values[fieldName] = newValue;
        } else {
            values = fieldName;
        }

        if (!(rankedFields = cls.rankedFields)) {
            // On the first edit of a record of this type we need to ensure we have the
            // topo-sort done:
            rankedFields = cls.rankFields();
        }
        numFields = rankedFields.length;

        do {
            for (name in values) {
                value = values[name];
                currentValue = data[name];
                comparator = me;
                field = fieldsMap[name];

                if (field) {
                    if (convertOnSet && field.convert) {
                        value = field.convert(value, me);
                    }
                    comparator = field;
                    reference = field.reference;
                } else {
                    reference = null;
                }

                if (comparator.isEqual(currentValue, value)) {
                    continue; // new value is the same, so no change...
                }

                data[name] = value;
                (modifiedFieldNames || (modifiedFieldNames = [])).push(name);
                (prevVals || (me.previousValues = prevVals = {}))[name] = currentValue;

                // We need the cls to be present because it means the association class is loaded,
                // otherwise it could be pending.
                if (reference && reference.cls) {
                    if (updateRefs) {
                        session.updateReference(me, field, value, currentValue);
                    }
                    reference.onValueChange(me, session, value, currentValue);
                }

                i = (dependents = field && field.dependents) && dependents.length;
                while (i-- > 0) {
                    // we use the field instance to hold the dirty bit to avoid any
                    // extra allocations... we'll clear this before we depart. We do
                    // this so we can perform the fewest recalculations possible as
                    // each dependent field only needs to be recalculated once.
                    (dep = dependents[i]).dirty = true;
                    dirtyRank = dirtyRank ? Math.min(dirtyRank, dep.rank) : dep.rank;
                }

                if (!field || field.persist) {
                    if (modified && modified.hasOwnProperty(name)) {
                        if (!dirty || comparator.isEqual(modified[name], value)) {
                            // The original value in me.modified equals the new value, so
                            // the field is no longer modified:
                            delete modified[name];
                            me.dirty = -1; // fix me.dirty later (still truthy)
                        }
                    } else if (dirty) {
                        if (!modified) {
                            me.modified = modified = {}; // create only when needed
                        }
                        me.dirty = true;
                        modified[name] = currentValue;
                    }
                }

                if (name === me.idField.name) {
                    idChanged = true;
                    oldId = currentValue;
                    newId = value;
                }
            }

            if (!dirtyRank) {
                // Unless there are dependent fields to process we can break now. This is
                // what will happen for all code pre-dating the depends or simply not
                // using it, so it will add very little overhead when not used.
                break;
            }

            // dirtyRank has the minimum rank (a 1-based value) of any dependent field
            // that needs recalculating due to changes above. The way we go about this
            // is to use our helper object for processing single argument invocations
            // to process just this one field. This is because the act of setting it
            // may cause another field to be invalidated, so while we cannot know at
            // this moment all the fields we need to recalculate, we know that only
            // those following this field in rankedFields can possibly be among them.

            field = rankedFields[dirtyRank - 1]; // dirtyRank is 1-based
            field.dirty = false; // clear just this field's dirty state

            if (single) {
                delete values[fieldName]; // cleanup last value
            } else {
                values = me._singleProp; // switch over
                single = true;
            }

            fieldName = field.name;
            values[fieldName] = data[fieldName];
            // We are now processing a dependent field, so we want to force a
            // convert to occur because it's the only way it will get a value
            convertOnSet = true;

            // Since dirtyRank is 1-based and refers to the field we need to handle
            // on this pass, we can treat it like an index for a minute and look at
            // the next field on towards the end to find the index of the next dirty
            // field.
            for ( ; dirtyRank < numFields; ++dirtyRank) {
                if (rankedFields[dirtyRank].dirty) {
                    break;
                }
            }

            if (dirtyRank < numFields) {
                // We found a field after this one marked as dirty so make the index
                // a proper 1-based rank:
                ++dirtyRank;
            } else {
                // We did not find any more dirty fields after this one, so clear the
                // dirtyRank and we will perhaps fall out after the next update
                dirtyRank = 0;
            }
        } while (1);

        if (me.dirty < 0) {
            // We might have removed the last modified field, so check to see if there
            // are any modified fields remaining and correct me.dirty:
            me.dirty = false;
            for (key in modified) {
                if (modified.hasOwnProperty(key)) {
                    me.dirty = true;
                    break;
                }
            }
        }

        if (single) {
            // cleanup our reused object for next time... important to do this before
            // we fire any events or call anyone else (like afterEdit)!
            delete values[fieldName];
        }

        ++me.generation;

        if (idChanged) {
            me.id = newId;
            me.callJoined('onIdChanged', [oldId, newId]);
        }

        if (commit) {
            me.commit(silent, modifiedFieldNames);
        } else if (!silent && !me.editing && modifiedFieldNames) {
            me.callJoined('afterEdit', [modifiedFieldNames]);
        }

        return modifiedFieldNames;
    },

    /**
     * Usually called by the {@link Ext.data.Store} to which this model instance has been {@link #join joined}. Rejects
     * all changes made to the model instance since either creation, or the last commit operation. Modified fields are
     * reverted to their original values.
     *
     * Developers should subscribe to the {@link Ext.data.Store#event-update} event to have their code notified of reject
     * operations.
     *
     * @param {Boolean} [silent=false] `true` to skip notification of the owning store of the change.
     */
    reject: function (silent) {
        var me = this,
            modified = me.modified;

        if (modified) {
            me.set(modified, me._rejectOptions);
        }

        me.clearState();

        if (!silent) {
            me.callJoined('afterReject');
        }
    },
    
    /**
     * Usually called by the {@link Ext.data.Store} which owns the model instance. Commits all changes made to the
     * instance since either creation or the last commit operation.
     *
     * Developers should subscribe to the {@link Ext.data.Store#event-update} event to have their code notified of commit
     * operations.
     *
     * @param {Boolean} [silent=false] Pass `true` to skip notification of the owning store of the change.
     * @param {String[]} [modifiedFieldNames] Array of field names changed during sync with server if known.
     * Omit or pass `null` if unknown. An empty array means that it is known that no fields were modified
     * by the server's response.
     * Defaults to false.
     */
    commit: function (silent, modifiedFieldNames) {
        var me = this,
            erased;

        me.clearState();

        me.phantom = false;
        if (me.dropped) {
            me.erased = erased = true;
        }

        if (!silent) {
            if (erased) {
                me.callJoined('afterErase');
            } else {
                me.callJoined('afterCommit', [modifiedFieldNames]);
            }
        }
    },
    
    clearState: function() {
        var me = this;
        
        me.dirty = me.editing = false;
        me.editMemento = me.modified = null;
    },

    /**
     * Marks this record as `dropped` and waiting to be deleted on the server. When a
     * record is dropped, it is automatically removed from all association stores and
     * any child records associated to this record are also dropped (a "cascade delete")
     * depending on the `cascade` parameter.
     *
     * @param {Boolean} [cascade=true] Pass `false` to disable the cascade to drop child
     * records.
     * @since 5.0.0
     */
    drop: function (cascade) {
        //TODO - implement cascade
        this.dropped = true;
        this.callJoined('afterDrop');
    },

    /**
     * Tells this model instance that an observer is looking at it.
     * @param {Ext.data.Store} item The store to which this model has been added.
     */
    join: function (item) {
        var me = this,
            joined = me.joined;

        // Optimize this, gets called a lot
        if (!joined) {
            joined = me.joined = [item];
        } else if (!joined.length) {
            joined[0] = item;
        } else {
            // TODO: do we need joined here? Perhaps push will do.
            Ext.Array.include(joined, item);
        }

        if (item.isStore) {
            /**
            * @property {Ext.data.Store} store
            * The {@link Ext.data.Store Store} to which this instance belongs. NOTE: If this
            * instance is bound to multiple stores, this property will reference only the
            * first. To examine all the stores, use the {@link #stores} property instead.
            */
            me.store = me.store || item;
        }
    },

    /**
     * Tells this model instance that it has been removed from the store.
     * @param {Ext.data.Store} store The store from which this model has been removed.
     */
    unjoin: function (item) {
        var me = this,
            joined = me.joined,
            len = joined.length,
            store = me.store,
            i;

        if (joined.length === 1 && joined[0] === item) {
            joined.length = 0;
        } else if (len) {
            Ext.Array.remove(joined, item);
        }

        if (store === item) {
            store = null;
            for (i = 0, len = joined.length; i < len; ++i) {
                item = joined[i];
                if (item.isStore) {
                    store = item;
                    break;
                }
            }
            me.store = store;
        }
    },

    /**
     * Creates a clone of this record. States like `dropped`, `phantom` and `dirty` are
     * all preserved in the cloned record.
     *
     * @param {Ext.data.session.Session} [session] The session to which the new record
     * belongs.
     * @return {Ext.data.Model} The cloned record.
     */
    clone: function (session) {
        var me = this,
            modified = me.modified,
            ret = me.copy(me.id, session);

        if (modified) {
            // Restore the modified fields state
            ret.modified = Ext.apply({}, modified);
        }

        ret.dirty = me.dirty;
        ret.dropped = me.dropped;
        ret.phantom = me.phantom;

        return ret;
    },

    /**
     * Creates a clean copy of this record. The returned record will not consider any its
     * fields as modified.
     *
     * To generate a phantom instance with a new id pass `null`:
     *
     *     var rec = record.copy(null); // clone the record but no id (one is generated)
     *
     * @param {String} [newId] A new id, defaults to the id of the instance being copied.
     * See `{@link Ext.data.Model#id id}`.
     * @param {Ext.data.Session} [session] The session to which the new record
     * belongs.
     *
     * @return {Ext.data.Model}
     */
    copy: function (newId, session) {
        var me = this,
            data = Ext.apply({}, me.data),
            idProperty = me.idProperty,
            T = me.self;

        if (newId || newId === 0) {
            data[idProperty] = newId;
        } else if (newId === null) {
            delete data[idProperty];
        }

        return new T(data, session);
    },

    /**
     * Returns the configured Proxy for this Model.
     * @return {Ext.data.proxy.Proxy} The proxy
     */
    getProxy: function() {
        return this.self.getProxy();
    },

    /**
     * Returns the `Ext.data.Validation` record holding the results of this record's
     * `validators`. This record is lazily created on first request and is then kept on
     * this record to be updated later.
     *
     * See the class description for more about `validators`.
     *
     * @param {Boolean} [refresh] Pass `false` to not call the `refresh` method on the
     * validation instance prior to returning it. Pass `true` to force a `refresh` of the
     * validation instance. By default the returned record is only refreshed if changes
     * have been made to this record.
     * @return {Ext.data.Validation} The `Validation` record for this record.
     * @since 5.0.0
     */
    getValidation: function (refresh) {
        var me = this,
            ret = me.validation;

        if (!ret) {
            me.validation = ret = new Ext.data.Validation();
            ret.attach(me);
        }

        if (refresh === true || (refresh !== false && ret.syncGeneration !== me.generation)) {
            ret.refresh(refresh);
        }

        return ret;
    },

    /**
     * Validates the current data against all of its configured {@link #validators}. The
     * returned collection holds an object for each reported problem from a `validator`.
     *
     * @return {Ext.data.ErrorCollection} The errors collection.
     * @deprecated 5.0 Use `getValidation` instead.
     */
    validate: function() {
        return new Ext.data.ErrorCollection().init(this);
    },

    /**
     * Checks if the model is valid. See {@link #getValidation}.
     * @return {Boolean} True if the model is valid.
     */
    isValid: function () {
        var val = this.getValidation();
        return !val.dirty;
    },

    /**
     * Destroys the model using the configured proxy.
     * @param {Object} options Options to pass to the proxy. Config object for {@link Ext.data.operation.Operation}.
     * @return {Ext.data.operation.Operation} The operation
     */
    erase: function(options) {
        this.drop();
        return this.save(options);
    },
    
    setErased: function() {
        this.erased = true;
        this.callJoined('afterErase');
    },

    /**
     * Gets an object of only the fields that have been modified since this record was
     * created or committed. Only persistent fields are tracked in the `modified` set so
     * this method will only return changes to persistent fields.
     *
     * For more control over the returned data, see `{@link #getData}`.
     * @return {Object}
     */
    getChanges: function () {
        return this.getData(this._getChangesOptions);
    },

    /**
     * Returns the array of fields that are declared as critical (must always send).
     * @return {Ext.data.field.Field[]}
     */
    getCriticalFields: function () {
        var cls = this.self,
            ret = cls.criticalFields;

        if (!ret) {
            cls.rankFields();
            ret = cls.criticalFields;
        }

        return ret;
    },

    /**
     * This method is called by the {@link Ext.data.reader.Reader} after loading a model from
     * the server. This is after processing any inline associations that are available.
     * 
     * @method onLoad
     *
     * @protected
     * @template
     */

    /**
     * Gets all of the data from this Models *loaded* associations. It does this
     * recursively. For example if we have a User which hasMany Orders, and each Order
     * hasMany OrderItems, it will return an object like this:
     *
     *     {
     *         orders: [
     *             {
     *                 id: 123,
     *                 status: 'shipped',
     *                 orderItems: [
     *                     ...
     *                 ]
     *             }
     *         ]
     *     }
     *
     * @param {Object} [result] The object on to which the associations will be added. If
     * no object is passed one is created. This object is then returned.
     * @return {Object} The nested data set for the Model's loaded associations.
     */
    getAssociatedData: function (result) {
        var me = this,
            associations = me.associations,
            i, item, items, itemData, length, record, role, roleName;

        result = result || {};

        me.$gathering = 1;

        for (roleName in associations) {
            role = associations[roleName];
            item = role.getAssociatedItem(me);
            if (!item || item.$gathering) {
                continue;
            }

            if (item.isStore) {
                item.$gathering = 1;

                items = item.getData().items; // get the records for the store
                length = items.length;
                itemData = [];

                for (i = 0; i < length; ++i) {
                    // NOTE - we don't check whether the record is gathering here because
                    // we cannot remove it from the store (it would invalidate the index
                    // values and misrepresent the content). Instead we tell getData to
                    // only get the fields vs descend further.
                    record = items[i];
                    record.$gathering = 1;
                    itemData.push(record.getData(!record.$gathering));
                    delete record.$gathering;
                }

                delete item.$gathering;
            } else {
                itemData = item.getData(true);
            }

            result[roleName] = itemData;
        }

        delete me.$gathering;

        return result;
    },

    /**
     * Gets all values for each field in this model and returns an object containing the
     * current data. This can be tuned by passing an `options` object with various
     * properties describing the desired result. Passing `true` simply returns all fields
     * *and* all associated record data.
     *
     * @param {Boolean/Object} [options] An object containing options describing the data
     * desired. If `true` is passed it is treated as an object with `associated` set to
     * `true`.
     * @param {Boolean} [options.associated=false] Pass `true` to include associated data.
     * This is equivalent to pass `true` as the only argument. See `getAssociatedData`.
     * @param {Boolean} [options.changes=false] Pass `true` to only include fields that
     * have been modified. Note that field modifications are only tracked for fields that
     * are not declared with `persist` set to `false`. In other words, only persistent
     * fields have changes tracked so passing `true` for this means `options.persist` is
     * redundant.
     * @param {Boolean} [options.critical] Pass `true` to include fields set as `critical`.
     * This is only meaningful when `options.changes` is `true` since critical fields may
     * not have been modified.
     * @param {Boolean} [options.persist] Pass `true` to only return persistent fields.
     * This is implied when `options.changes` is set to `true`.
     * @param {Boolean} [options.serialize=false] Pass `true` to invoke the `serialize`
     * method on the returned fields.
     * @return {Object} An object containing all the values in this model.
     */
    getData: function (options) {
        var me = this,
            ret = {},
            opts = (options === true) ? me._getAssociatedOptions : (options || ret), //cheat
            data = me.data,
            associated = opts.associated,
            changes = opts.changes,
            critical = changes && opts.critical,
            content = changes ? me.modified : data,
            fieldsMap = me.fieldsMap,
            persist = opts.persist,
            serialize = opts.serialize,
            criticalFields, field, n, name, value;

        // DON'T use "opts" from here on...

        // Keep in mind the two legacy use cases:
        //  - getData() ==> Ext.apply({}, me.data)
        //  - getData(true) ==> Ext.apply(Ext.apply({}, me.data), me.getAssociatedData())

        if (content) { // when processing only changes, me.modified could be null
            for (name in content) {
                value = data[name];

                field = fieldsMap[name];
                if (field) {
                    if (persist && !field.persist) {
                        continue;
                    }
                    if (serialize && field.serialize) {
                        value = field.serialize(value, me);
                    }
                }

                ret[name] = value;
            }
        }

        if (critical) {
            criticalFields = me.self.criticalFields || me.getCriticalFields();
            for (n = criticalFields.length; n-- > 0; ) {
                name = (field = criticalFields[n]).name;

                if (!(name in ret)) {
                    value = data[name];
                    if (serialize && field.serialize) {
                        value = field.serialize(value, me);
                    }
                    ret[name] = value;
                }
            }
        }

        if (associated) {
            me.getAssociatedData(ret); // pass ret so new data is added to our object
        }

        return ret;
    },

    /**
     * Returns the array of fields that are declared as non-persist or "transient".
     * @return {Ext.data.field.Field[]}
     * @since 5.0.0
     */
    getTransientFields: function () {
        var cls = this.self,
            ret = cls.transientFields;

        if (!ret) {
            cls.rankFields(); // populates transientFields as well as rank
            ret = cls.transientFields;
        }

        return ret;
    },

    /**
     * Checks whether this model is loading data from the {@link #proxy}.
     * @return {Boolean} `true` if in a loading state.
     */
    isLoading: function() {
        return !!this.loadOperation;
    },

    /**
     * Aborts a pending {@link #load} operation. If the record is not loading, this does nothing.
     */
    abort: function() {
        var operation = this.loadOperation;
        if (operation) {
            operation.abort();
        }
    },

    /**
     * Load the model instance using the configured proxy.
     *
     *     Ext.define('MyApp.User', {
     *         extend: 'Ext.data.Model',
     *         fields: [
     *             {name: 'id', type: 'int'},
     *             {name: 'name', type: 'string'}
     *         ]
     *     });
     *
     *     var user = new MyApp.User();
     *     user.load({
     *         scope: this,
     *         failure: function(record, operation) {
     *             //do something if the load failed
     *         },
     *         success: function(record, operation) {
     *             //do something if the load succeeded
     *         },
     *         callback: function(record, operation, success) {
     *             //do something whether the load succeeded or failed
     *         }
     *     });
     *
     * @param {Object} [options] Config options for this load.
     * @param {Function} options.success A function to be called when the
     * model is loaded successfully.
     * The callback is passed the following parameters:
     * @param {Ext.data.Model} options.success.record The record.
     * @param {Ext.data.operation.Operation} options.success.operation The operation.
     * 
     * @param {Function} options.failure A function to be called when the
     * model is unable to be loadedy.
     * The callback is passed the following parameters:
     * @param {Ext.data.Model} options.failure.record The record (`null` for a failure). 
     * @param {Ext.data.operation.Operation} options.failure.operation The operation.
     * 
     * @param {Function} options.callback A function to be called after a load,
     * whether it was successful or not.
     * The callback is passed the following parameters:
     * @param {Ext.data.Model} options.callback.record The record (`null` for a failure). 
     * @param {Ext.data.operation.Operation} options.callback.operation The operation.
     * @param {Boolean} options.callback.success `true` if the operation was successful
     * and the model was loaded.
     * 
     * @param {Object} options.scope The scope in which to execute the callback functions.
     *
     * @return {Ext.data.Operation} The operation object for loading this model.
     */
    load: function(options) {
        options = Ext.apply({}, options);

        var me = this,
            scope = options.scope || me,
            proxy = me.getProxy(),
            callback = options.callback,
            operation = me.loadOperation,
            id = me.getId(),
            extras;

        if (operation) {
            // Already loading, push any callbacks on and jump out
            extras = operation.extraCalls;
            if (!extras) {
                extras = operation.extraCalls = [];
            }
            extras.push(options);
            return operation;
        }

        //<debug>
        if (me.phantom) {
            Ext.Error.raise('Cannot load phantom model');
        }
        //</debug>

        options.id = id;

        // Always set the recordCreator. If we have a session, we're already
        // part of said session, so we don't need to handle that.
        options.recordCreator = function(data, type, readOptions) {
            // Important to change this here, because we might be loading associations,
            // so we do not want this to propagate down. If we have a session, use that
            // so that we end up getting the same record. Otherwise, just remove it.
            var session = me.session;
            readOptions.recordCreator = session ? session.recordCreator : null;
            me.set(data, me._commitOptions);  
            //<debug>
            // Do the id check after set since converters may have run
            if (me.getId() !== id) {
                Ext.Error.raise('Invalid record id returned for ' + id + '@' + me.entityName);
            }
            //</debug>
            return me;
        };

        options.internalCallback = function(operation) {
            var success = operation.wasSuccessful() && operation.getRecords().length > 0,
                op = me.loadOperation,
                extras = op.extraCalls,
                successFailArgs = [me, operation],
                callbackArgs = [me, operation, success],
                i, len;

            me.loadOperation = null;

            if (success) {
                Ext.callback(options.success, scope, successFailArgs);
            } else {
                Ext.callback(options.failure, scope, successFailArgs);
            }
            Ext.callback(callback, scope, callbackArgs);

            // Some code repetition here, however in a vast majority of cases
            // we'll only have a single callback, so optimize for that case rather
            // than setup arrays for all the callback options
            if (extras) {
                for (i = 0, len = extras.length; i < len; ++i) {
                    options = extras[i];
                    if (success) {
                        Ext.callback(options.success, scope, successFailArgs);
                    } else {
                        Ext.callback(options.failure, scope, successFailArgs);
                    }
                    Ext.callback(options.callback, scope, callbackArgs);
                }
            }
            me.callJoined('afterLoad');
        };
        delete options.callback;

        me.loadOperation = operation = proxy.createOperation('read', options);
        operation.execute();

        return operation;
    },

    /**
     * Saves the model instance using the configured proxy.
     * @param {Object} [options] Options to pass to the proxy. Config object for {@link Ext.data.operation.Operation}.
     * @return {Ext.data.operation.Operation} The operation
     */
    save: function(options) {
        options = Ext.apply({}, options);
        
        var me = this,
            phantom = me.phantom,
            dropped = me.dropped,
            action = dropped ? 'destroy' : (phantom ? 'create' : 'update'),
            scope  = options.scope || me,
            callback = options.callback,
            proxy = me.getProxy(),
            operation;
            
        options.records = [me];
        options.internalCallback = function(operation) {
            var args = [me, operation],
                success = operation.wasSuccessful();
            if (success) {
                Ext.callback(options.success, scope, args);
            } else {
                Ext.callback(options.failure, scope, args);
            }
            args.push(success);
            Ext.callback(callback, scope, args);
        };
        delete options.callback;
        
        operation = proxy.createOperation(action, options);

        // Not a phantom, then we must perform this operation on the remote datasource.
        // Record will be removed from the store in the callback upon a success response
        if (dropped && phantom) {
            // If it's a phantom, then call the callback directly with a dummy successful ResultSet
            operation.setResultSet(Ext.data.reader.Reader.prototype.nullResultSet);
            me.setErased();
            operation.setSuccessful(true);
        } else {
            operation.execute();
        }
        return operation;
    },

    //-------------------------------------------------------------------------
    // Statics

    inheritableStatics: {
        /**
         * This method adds the given set of fields to this model class.
         *
         * @param {String[]/Object[]} newFields The new fields to add. Based on the `name`
         * of a field this may replace a previous field definition.
         *
         * @protected
         * @since 5.0.0
         */
        addFields: function (newFields) {
            this.replaceFields(newFields);
        },

        /**
         * This method replaces the specified set of fields with a given set of new fields.
         * Fields should normally be considered immutable, but if the timing is right (that
         * is, before derived classes are declared), it is permissible to change the fields
         * collection.
         *
         * @param {String[]/Object[]} newFields The new fields to add. Based on the `name`
         * of a field this may replace a previous field definition.
         * @param {Boolean/String[]} removeFields The names of fields to remove or `true`
         * to remove all existing fields. Removes are processed first followed by adds so
         * if a field name appears in `newFields` as well that field will effectively be
         * added (however, in that case there is no need to include the field in this
         * array).
         *
         * @protected
         * @since 5.0.0
         */
        replaceFields: function (newFields, removeFields) {
            var me = this,
                proto = me.prototype,
                Field = Ext.data.field.Field,
                fields = me.fields,
                fieldsMap = me.fieldsMap,
                ordinals = me.fieldOrdinals,
                field, i, idField, len, name, ordinal;

            if (removeFields === true) {
                fields.length = 0;
                me.fieldsMap = fieldsMap = {};
                me.fieldOrdinals = ordinals = {};
            } else if (removeFields) {
                for (i = removeFields.length; i-- > 0; ) {
                    name = removeFields[i];
                    if (name in ordinals) {
                        delete ordinals[name];
                        delete fieldsMap[name];
                    }
                }

                for (i = 0, len = fields.length; i < len; ++i) {
                    name = (field = fields[i]).name;

                    if (name in ordinals) {
                        ordinals[name] = i;
                    } else {
                        // This field is being removed (it is no longer in ordinals).
                        fields.splice(i, 1);
                        --i;
                        --len;
                        // we need to do this forwards so that ordinals don't become
                        // invalid due to a splice
                    }
                }
            }

            for (i = 0, len = newFields ? newFields.length : 0; i < len; i++) {
                name = (field = newFields[i]).name;

                if (!(name in ordinals)) {
                    ordinals[name] = ordinal = fields.length; // 0-based
                    fields.push(field = Field.create(field));

                    fieldsMap[name] = field;
                    field.ordinal = ordinal;
                    field.definedBy = field.owner = this; // Ext.data.NodeInterface
                }
            }

            // The idField could have been replaced, so reacquire it.
            me.idField = proto.idField = idField = fieldsMap[proto.idProperty];
            idField.allowNull = idField.critical = idField.identifier = true;
            idField.defaultValue = null;

            // In case we've created the initializer we need to zap it so we recreate it
            // next time. Likewise with field ranking.
            me.initializeFn = me.rankedFields = me.transientFields = me.criticalFields = null;
        },

        /**
         * Removes the given set of fields from this model.
         *
         * @param {Boolean/String[]} removeFields The names of fields to remove or `true`
         * to remove all existing fields. Removes are processed first followed by adds so
         * if a field name appears in `newFields` as well that field will effectively be
         * added (however, in that case there is no need to include the field in this
         * array).
         *
         * @protected
         * @since 5.0.0
         */
        removeFields: function (remove) {
            this.replaceFields(null, remove);
        },

        getIdFromData: function(data) {
            var T = this,
                idField = T.idField;
                id = idField.calculated ? (new T(data)).id : data[idField.name];

            return id;
        },

        createWithId: function (id, data, session) {
            var d = data,
                T = this;

            if (id || id === 0) {
                d = {};
                if (data) {
                    Ext.apply(d, data);
                }

                d[T.idField.name] = id;
            }

            return new T(d, session);
        },
        
        getFields: function() {
            return this.fields;    
        },

        getFieldsMap: function() {
            return this.fieldsMap;
        },

        getField: function (name) {
            return this.fieldsMap[name] || null;
        },

        /**
         * Returns the configured Proxy for this Model.
         * @return {Ext.data.proxy.Proxy} The proxy
         * @static
         * @inheritable
         */
        getProxy: function() {
            var me = this,
                proxy = me.proxy,
                defaults;

            if (!proxy) {
                // Check what was defined by the class (via onClassExtended):
                proxy = me.proxyConfig;

                if (!proxy || !proxy.isProxy) {
                    // We have nothing or a config for the proxy. Get some defaults from
                    // the Schema and smash anything we've provided over the top.
                    defaults = me.schema.constructProxy(me);
                    proxy = proxy ? Ext.merge(defaults, proxy) : defaults;
                }

                proxy = me.setProxy(proxy);
            }

            return proxy;
        },

        /**
         * Sets the Proxy to use for this model. Accepts any options that can be accepted by
         * {@link Ext#createByAlias Ext.createByAlias}.
         * @param {String/Object/Ext.data.proxy.Proxy} proxy The proxy
         * @return {Ext.data.proxy.Proxy}
         * @static
         * @inheritable
         */
        setProxy: function (proxy) {
            var me = this,
                model;

            if (proxy) {
                if (!proxy.isProxy) {
                    proxy = Ext.Factory.proxy(proxy);
                } else {
                    model = proxy.getModel();
                    if (model && model !== me) {
                        proxy = proxy.clone();
                    }
                }

                proxy.setModel(me);
            }

            return (me.prototype.proxy = me.proxy = proxy);
        },

        /**
         * Asynchronously loads a model instance by id. Sample usage:
         *
         *     Ext.define('MyApp.User', {
         *         extend: 'Ext.data.Model',
         *         fields: [
         *             {name: 'id', type: 'int'},
         *             {name: 'name', type: 'string'}
         *         ]
         *     });
         *
         *     MyApp.User.load(10, {
         *         scope: this,
         *         failure: function(record, operation) {
         *             //do something if the load failed
         *         },
         *         success: function(record, operation) {
         *             //do something if the load succeeded
         *         },
         *         callback: function(record, operation, success) {
         *             //do something whether the load succeeded or failed
         *         }
         *     });
         *
         * @param {Number/String} id The id of the model to load
         * @param {Object} [options] Config options for this load.
         * @param {Function} options.success A function to be called when the
         * model is loaded successfully.
         * The callback is passed the following parameters:
         * @param {Ext.data.Model} options.success.record The record.
         * @param {Ext.data.operation.Operation} options.success.operation The operation.
         * 
         * @param {Function} options.failure A function to be called when the
         * model is unable to be loadedy.
         * The callback is passed the following parameters:
         * @param {Ext.data.Model} options.failure.record The record (`null` for a failure). 
         * @param {Ext.data.operation.Operation} options.failure.operation The operation.
         * 
         * @param {Function} options.callback A function to be called after a load,
         * whether it was successful or not.
         * The callback is passed the following parameters:
         * @param {Ext.data.Model} options.callback.record The record (`null` for a failure). 
         * @param {Ext.data.operation.Operation} options.callback.operation The operation.
         * @param {Boolean} options.callback.success `true` if the operation was successful
         * and the model was loaded.
         * 
         * @param {Object} options.scope The scope in which to execute the callback functions.
         *
         * @param {Ext.data.Session} session The session for this record.
         *
         * @return {Ext.data.Model} The newly created model. Note that the model will (probably) still
         * be loading once it is returned from this method. To do any post-processing on the data, the
         * appropriate place to do see is in the callback.
         * 
         * @static
         * @inheritable
         */
        load: function(id, options, session) {
            var rec = new this({
                id: id
            }, session);
            rec.load(options);
            return rec;
        }
    },

    deprecated: {
        5: {
            methods: {
                hasId: null,
                markDirty: null,
                setDirty: null,
                eachStore: function (callback, scope) {
                    var me = this,
                        stores = me.stores,
                        len = stores.length,
                        i;

                    for (i = 0; i < len; ++i) {
                        callback.call(scope, stores[i]);
                    }
                },

                join: function(item) {
                    var me = this,
                        stores = me.stores,
                        joined = me.joined;

                    if (!joined) {
                        joined = me.joined = [item];
                    } else {
                        joined.push(item);
                    }

                    if (item.isStore) {
                        me.store = me.store || item;
                        if (!stores) {
                            stores = me.stores = [];
                        }
                        stores.push(item);
                    }
                },

                unjoin: function(item) {
                    var me = this,
                        stores = me.stores,
                        joined = me.joined;

                    if (joined.length === 1) {
                        joined.length = 0;
                    } else {
                        Ext.Array.remove(joined, item);
                    }

                    if (item.isStore) {
                        Ext.Array.remove(stores, item);
                        me.store = stores[0] || null;
                    }
                }
            },
            properties: {
                persistenceProperty: null
            },
            inheritableStatics: {
                methods: {
                    setFields: null
                }
            }
        }
    },

    //-------------------------------------------------------------------------
    privates: {
        _commitOptions: {
            commit: true
        },
        _getChangesOptions: {
            changes: true
        },
        _getAssociatedOptions: {
            associated: true
        },

        /**
         * Copies data from the passed record into this record. If the passed record is undefined, does nothing.
         *
         * If this is a phantom record (represented only in the client, with no corresponding database entry), and
         * the source record is not a phantom, then this record acquires the id of the source record.
         *
         * @param {Ext.data.Model} sourceRecord The record to copy data from.
         * @return {String[]} The names of the fields which changed value.
         * @private
         */
        copyFrom: function (sourceRecord) {
            var me = this,
                fields = me.fields,
                fieldCount = fields.length,
                modifiedFieldNames = [],
                field, i = 0,
                myData,
                sourceData,
                idProperty = me.idProperty,
                name,
                value;

            if (sourceRecord) {
                myData = me.data;
                sourceData = sourceRecord.data;
                for (; i < fieldCount; i++) {
                    field = fields[i];
                    name = field.name;

                    // Do not use setters.
                    // Copy returned values in directly from the data object.
                    // Converters have already been called because new Records
                    // have been created to copy from.
                    // This is a direct record-to-record value copy operation.
                    // don't copy the id, we'll do it at the end
                    if (name != idProperty) {
                        value = sourceData[name];

                        // If source property is specified, and value is different
                        // copy field value in and build updatedFields
                        if (value !== undefined && !me.isEqual(myData[name], value)) {
                            myData[name] = value;
                            modifiedFieldNames.push(name);
                        }
                    }
                }

                // If this is a phantom record being updated from a concrete record, copy the ID in.
                if (me.phantom && !sourceRecord.phantom) {
                    // beginEdit to prevent events firing
                    // commit at the end to prevent dirty being set
                    me.beginEdit();
                    me.setId(sourceRecord.getId());
                    me.endEdit(true);
                    me.commit(true);
                }
            }
            return modifiedFieldNames;
        },

        /**
         * Helper function used by afterEdit, afterReject and afterCommit. Calls the given
         * method on the `Ext.data.Store` that this instance has {@link #join joined}, if any.
         * The store function will always be called with the model instance as its single
         * argument. If this model is joined to a Ext.data.NodeStore, then this method calls
         * the given method on the NodeStore and the associated Ext.data.TreeStore.
         * @param {String} funcName The name function to call on each store.
         * @param {Array} [args] The arguments to pass to the method. This instance is
         * always inserted as the first argument.
         * @private
         */
        callJoined: function (funcName, args) {
            var me = this,
                joined = me.joined,
                session = me.session,
                i, len, fn, item;

            if (!joined && !session) {
                return;
            }

            if (args) {
                args.unshift(me);
            } else {
                args = [me];
            }

            if (session && (fn = session[funcName])) {
                fn.apply(session, args);
            }

            if (joined) {
                for (i = 0, len = joined.length; i < len; ++i) {
                    item = joined[i];
                    if (item && (fn = item[funcName])) {
                        fn.apply(item, args);
                    }
                }
            }
        },
        
        /**
         * Set the session for this record.
         * @param {Ext.data.Session} session The session
         */
        setSession: function(session) {
            //<debug>
            if (session) {
                if (this.session) {
                    Ext.Error.raise('This model already belongs to a session.');
                }
                if (!this.id) {
                    Ext.Error.raise('The model must have an id to participate in a session.');
                }
            }
            //</debug>
            this.session = session;
            if (session) {
                session.add(this);
            }
        },

        /**
         * Gets the names of all the fields that were modified during an edit.
         * @param {Object} [old] The saved data from `beginEdit`.
         * @return {String[]} The array of modified field names.
         * @private
         */
        getModifiedFieldNames: function (old) {
            var me = this,
                data = me.data,
                modified = [],
                oldData = old || me.editMemento.data,
                key;

            for (key in data) {
                if (data.hasOwnProperty(key)) {
                    if (!me.isEqual(data[key], oldData[key], key)) {
                        modified.push(key);
                    }
                }
            }

            return modified;
        },

        /**
         * Checks if two values are equal, taking into account certain special factors, for
         * example dates.
         * @param {Object} lhs The first value.
         * @param {Object} rhs The second value.
         * @return {Boolean} True if the values are equal.
         * @private
         */
        isEqual: function (lhs, rhs, field) {
            var f;

            if (field) {
                f = field.isField ? field : this.fieldsMap[field];
                if (f) {
                    return f.compare(lhs, rhs) === 0;
                }
            }

            // instanceof is ~10 times faster then Ext.isDate. Values here will not be
            // cross-document objects
            if (lhs instanceof Date && rhs instanceof Date) {
                return lhs.getTime() === rhs.getTime();
            }
            return lhs === rhs;
        },

        statics: {
            /**
             * @property
             * @static
             * @private
             * @readonly
             * @deprecated
             * The update operation of type 'edit'. Used by {@link Ext.data.Store#event-update Store.update} event.
             */
            EDIT   : 'edit',
            /**
             * @property
             * @static
             * @private
             * @readonly
             * @deprecated
             * The update operation of type 'reject'. Used by {@link Ext.data.Store#event-update Store.update} event.
             */
            REJECT : 'reject',
            /**
             * @property
             * @static
             * @private
             * @readonly
             * @deprecated
             * The update operation of type 'commit'. Used by {@link Ext.data.Store#event-update Store.update} event.
             */
            COMMIT : 'commit',

            rankFields: function () {
                var cls = this,
                    prototype = cls.prototype,
                    fields = cls.fields,
                    length = fields.length,
                    rankedFields = [],
                    criticalFields = [],
                    transientFields = [],
                    evilFields, field, i;

                cls.rankedFields = prototype.rankedFields = rankedFields;
                cls.criticalFields = prototype.criticalFields = criticalFields;
                cls.transientFields = prototype.transientFields = transientFields;

                // This first pass brings over any fields that have no dependencies at all
                // and gathers the evil fields to the side (the fields that could depend on
                // anything). This avoids the call to topoAdd that we must perform on all of
                // the fields that do have depends (which is good since most fields will be
                // handled here).
                for (i = 0; i < length; ++i) {
                    field = fields[i];
                    if (field.critical) {
                        criticalFields.push(field);
                    }
                    if (!field.persist) {
                        transientFields.push(field);
                    }
                    if (field.evil) {
                        (evilFields || (evilFields = [])).push(field);
                    } else if (!field.depends) {
                        rankedFields.push(field);
                        field.rank = rankedFields.length; // 1-based
                    }
                }

                for (i = 0; i < length; ++i) {
                    if (!(field = fields[i]).rank && !field.evil) {
                        cls.topoAdd(field);
                    }
                }

                if (evilFields) {
                    for (i = 0, length = evilFields.length; i < length; ++i) {
                        rankedFields.push(field = evilFields[i]);
                        field.rank = rankedFields.length; // 1-based
                    }
                }

                //<debug>
                cls.topoStack = null; // cleanup diagnostic stack
                //</debug>

                return rankedFields;
            },

            topoAdd: function (field) {
                var cls = this,
                    dep = field.depends,
                    dependsLength = dep ? dep.length : 0,
                    rankedFields = cls.rankedFields,
                    i, targetField;

                //<debug>
                var topoStack = cls.topoStack || (cls.topoStack = []);
                topoStack.push(field.name);

                if (field.rank === 0) { // if (adding)
                    Ext.Error.raise(cls.$className + " has circular field dependencies: " +
                            topoStack.join(" --> "));
                }

                if (topoStack.length && field.evil) {
                    Ext.Error.raise(cls.$className + ": Field " +
                            topoStack[topoStack.length - 1] +
                            " cannot depend on depends-less field " + field.name);
                }

                field.rank = 0; // adding (falsey but we can still detect cycles)
                //</debug>

                for (i = 0; i < dependsLength; ++i) {
                    // Get the targetField on which we depend and add this field to the
                    // targetField.dependents[]
                    targetField = cls.fieldsMap[dep[i]];
                    //<debug>
                    if (!targetField) {
                        Ext.Error.raise(cls.$className + ": Field " + field.name + " depends on undefined field " + dep[i]);
                    }
                    //</debug>
                    (targetField.dependents || (targetField.dependents = [])).push(field);

                    if (!targetField.rank) { // if (!added)
                        cls.topoAdd(targetField);
                    }
                }

                rankedFields.push(field);
                field.rank = rankedFields.length; // 1-based (truthy to track "added" state)

                //<debug>
                topoStack.pop();
                //</debug>
            },

            initFields: function(data, cls, proto) {
                var Field = Ext.data.field.Field,
                    fieldDefs = data.fields,
                    // allocate fields [] and ordinals {} for the new class:
                    fields = [],
                    fieldOrdinals = {},
                    fieldsMap = {},
                    references = [],
                    superFields = proto.fields,
                    versionProperty = data.versionProperty || proto.versionProperty,
                    idProperty = data.idProperty || proto.idProperty,
                    idField, field, i, length, name, ordinal, reference;

                // Process any inherited fields to produce a fields [] and ordinals {} for
                // this class:
                cls.fields = proto.fields = fields;
                cls.fieldOrdinals = proto.fieldOrdinals = fieldOrdinals;
                cls.fieldsMap = proto.fieldsMap = fieldsMap;
                cls.references = proto.references = references;

                if (superFields) {
                    // We chain the super field so we can write to it
                    for (i = 0, length = superFields.length; i < length; ++i) {
                        fields[i] = field = Ext.Object.chain(superFields[i]);

                        field.dependents = null; // we need to recalculate these
                        field.owner = cls;
                        fieldOrdinals[name = field.name] = i;
                        fieldsMap[name] = field;
                    }
                }

                // Merge in any fields from this class:
                if (fieldDefs) {
                    //<debug>
                    var superFieldNames;
                    if (superFields) {
                         superFieldNames = Ext.Array.toMap(superFields, 'name');
                    }
                    //</debug>
                    delete data.fields;
                    for (i = 0, length = fieldDefs.length; i < length; ++i) {
                        field = fieldDefs[i];
                        reference = field.reference;
                        // Create a copy of the reference since we'll modify
                        // the reference on the field. Needed for subclasses
                        if (reference && typeof reference !== 'string') {
                            // Can have child objects, so merge it deeply
                            reference = Ext.merge({}, reference);
                        }
                        field.$reference = reference;
                        field = Field.create(fieldDefs[i]);
                        name = field.name;
                        //<debug>
                        if (superFields && name in superFieldNames) {
                            Ext.log.warn('Redefining field "' + name + '" in ' + cls.$className);
                        }
                        //</debug>
                        ordinal = fieldOrdinals[name];
                        if (ordinal === undefined) {
                            // If the field is new, add it to the end of the fields[]
                            fieldOrdinals[name] = ordinal = fields.length;
                        }
                        // else, overwrite the field at the established ordinal

                        fieldsMap[name] = field;
                        fields[ordinal] = field;
                        field.definedBy = field.owner = cls;
                        field.ordinal = ordinal;
                        if (name === versionProperty) {
                            field.critical = true;
                        }
                    }
                }

                // Lookup the idProperty in the ordinals map and create a synthetic field if
                // we don't have one.
                if (!(idField = fieldsMap[idProperty])) {
                    idField = new Field(idProperty);
                    ordinal = fields.length;
                    fields[ordinal] = idField;
                    fieldOrdinals[idProperty] = ordinal;
                    fieldsMap[idProperty] = idField;
                    idField.definedBy = cls;
                    idField.ordinal = ordinal;
                }

                idField.allowNull = idField.critical = idField.identifier = true;
                idField.defaultValue = null;

                cls.idField = proto.idField = idField;

                // NOTE: Be aware that the one fellow that manipulates these after this
                // point is Ext.data.NodeInterface.
            },

            initAssociations: function (schema, data, cls) {
                    // The 4 legacy associations:
                var associations = data.associations,
                    belongsTo = data.belongsTo,
                    hasMany = data.hasMany,
                    hasOne = data.hasOne,
                    // The new one:
                    matrices = data.manyToMany,
                    i, length, assoc;

                //<debug>
                if (data.belongsTo) {
                    Ext.log.warn('Use of "belongsTo" is obsolete' +
                        (cls.$className ? ' in ' + cls.$className : ''));
                    delete data.belongsTo;
                }
                //</debug>

                delete data.manyToMany;
                if (matrices) {
                    schema.addMatrices(cls, matrices);
                }

                // Legacy:
                delete data.associations;
                delete data.belongsTo;
                delete data.hasMany;
                delete data.hasOne;

                if (associations) {
                    associations = Ext.isArray(associations) ? associations : [ associations ];
                    for (i = 0, length = associations.length; i < length; ++i) {
                        assoc = associations[i];
                        switch (assoc.type) {
                            case 'belongsTo':
                                schema.addLegacyBelongsTo(cls, assoc);
                                break;
                            case 'hasMany':
                                schema.addLegacyHasMany(cls, assoc);
                                break;
                            case 'hasOne':
                                schema.addLegacyHasOne(cls, assoc);
                                break;

                            //<debug>
                            default:
                                Ext.Error.raise('Invalid association type: "' + assoc.type + '"');
                            //</debug>
                        }
                    }
                }

                if (belongsTo) {
                    belongsTo = Ext.isArray(belongsTo) ? belongsTo : [ belongsTo ];
                    for (i = 0, length = belongsTo.length; i < length; ++i) {
                        schema.addLegacyBelongsTo(cls, belongsTo[i]);
                    }
                }

                if (hasMany) {
                    hasMany = Ext.isArray(hasMany) ? hasMany : [ hasMany ];
                    for (i = 0, length = hasMany.length; i < length; ++i) {
                        schema.addLegacyHasMany(cls, hasMany[i]);
                    }
                }

                if (hasOne) {
                    hasOne = Ext.isArray(hasOne) ? hasOne : [ hasOne ];
                    for (i = 0, length = hasOne.length; i < length; ++i) {
                        schema.addLegacyHasOne(cls, hasOne[i]);
                    }
                }
                schema.afterLegacyAssociations(cls);
            },

            initIdentifier: function (data, cls, proto) {
                var identifier = data.identifier || data.idgen,
                    superIdent = proto.identifier || cls.schema._defaultIdentifier,
                    generatorPrefix;

                //<debug>
                if (data.idgen) {
                    Ext.log.warn('Ext.data.Model: idgen has been deprecated. Please use identifier instead.');
                }
                //</debug>

                if (identifier) {
                    delete data.identifier;
                    delete data.idgen;

                    // An idgen was specified on the definition, use it explicitly.
                    identifier = Ext.Factory.dataIdentifier(identifier);
                } else if (superIdent) {
                    // If we have a cloneable instance, and we don't have an id
                    // clone it. If we have an id, then we should use the same
                    // instance since it's the same as looking it up via id.
                    if (superIdent.clone && !superIdent.getId()) {
                        identifier = superIdent.clone();
                    } else if (superIdent.isGenerator) {
                        identifier = superIdent;
                    } else {
                        identifier = Ext.Factory.dataIdentifier(superIdent);
                    }
                }

                cls.identifier = proto.identifier = identifier;

                if (!identifier) {
                    // If we didn't find one, create it and push it onto the class.
                    // Don't put it on the prototype, so a subclass will create
                    // it's own generator. If we have an anonymous model, go ahead and
                    // generate a unique prefix for it.
                    generatorPrefix = cls.entityName;
                    if (!generatorPrefix) {
                        generatorPrefix = Ext.id(null, 'extModel');
                    }
                    cls.identifier = Ext.Factory.dataIdentifier({
                        type: 'sequential',
                        prefix: generatorPrefix + '-'
                    });
                }
            },

            findValidator: function(validators, name, cfg) {
                var type = cfg.type || cfg,
                    field = validators[name],
                    len, i, item;

                if (field) {
                    for (i = 0, len = field.length; i < len; ++i) {
                        item = field[i];
                        if (item.type === type) {
                            return item;
                        }
                    }
                }
                return null;
            },

            initValidators: function(data, cls, proto) {
                var Validator = Ext.data.validator.Validator,
                    superValidators = proto.validators,
                    validators, field, copy, validatorDefs,
                    i, length, existing, validator, fieldValidator, name,
                    item, type;

                if (superValidators) {
                    validators = {};
                    for (field in superValidators) {
                        if (superValidators.hasOwnProperty(field)) {
                            // copy the array so we don't modify the superclass.
                            fieldValidator = superValidators[field];
                            copy = [];
                            for (i = 0, length = fieldValidator.length; i < length; ++i) {
                                copy[i] = fieldValidator[i].clone();
                            }
                            validators[field] = copy;
                        }
                    }
                }

                validatorDefs = data.validators || data.validations;
                //<debug>
                if (data.validations) {
                    delete data.validations;
                    Ext.log.warn((cls.$className || 'Ext.data.Model' ) +
                          ': validations has been deprecated. Please use validators instead.');
                }
                //</debug>
                if (validatorDefs) {
                    delete data.validators;

                    validators = validators || {};

                    // Support older array syntax
                    if (Ext.isArray(validatorDefs)) {
                        copy = {};
                        for (i = 0, length = validatorDefs.length; i < length; ++i) {
                            item = validatorDefs[i];
                            name = item.field;
                            if (!copy[name]) {
                                copy[name] = [];
                            }
                            // Check for function form
                            item = item.fn || item;
                            copy[name].push(item);
                        }
                        validatorDefs = copy;
                    }

                    for (name in validatorDefs) {
                        if (validatorDefs.hasOwnProperty(name)) {
                            item = validatorDefs[name];
                            if (!Ext.isArray(item)) {
                                item = [item];
                            }
                            for (i = 0, length = item.length; i < length; ++i) {
                                validator = item[i];
                                type = typeof validator;
                                if (type === 'function') {
                                    // If we have a function we have no way of "matching" it,
                                    // so always go ahead and add it
                                    validator = new Validator(validator);
                                } else {
                                    if (superValidators) {
                                        existing = this.findValidator(validators, name, validator);
                                    }
                                    if (type === 'string') {
                                        // If we have a string and an existing validator, then
                                        // we do nothing, since we can't "improve" upon it
                                        if (!existing) {
                                            validator = Validator.create({
                                                type: validator
                                            });
                                        } else {
                                            validator = null;
                                        }
                                    } else {
                                        // If we have an existing one, then "merge" them
                                        // together
                                        if (!existing) {
                                            validator = Validator.create(validator);
                                        } else {
                                            existing.setConfig(validator);
                                            validator = null;
                                        }
                                    }
                                }
                                if (validator) {
                                    fieldValidator = validators[name];
                                    if (!fieldValidator) {
                                        fieldValidator = validators[name] = [];
                                    }
                                    fieldValidator.push(validator);
                                }
                            }
                        }
                    }
                }
                cls.validators = proto.validators = validators;
            },

            /**
             * This method produces the `initializeFn` for this class. If there are no fields
             * requiring {@link Ext.data.field.Field#cfg-convert conversion} and no fields requiring
             * a {@link Ext.data.field.Field#defaultValue default value} then this method will
             * return `null`.
             * @return {Function} The `initializeFn` for this class (or null).
             * @private
             */
            makeInitializeFn: function (cls) {
                var code = ['var '],
                    body = ['\nreturn function (e) {\n    var data = e.data, v;\n'],
                    fieldVars = [],
                    work = 0,
                    bc, ec, // == beginClone, endClone
                    convert, expr, factory, field, fields, fs, hasDefValue, i, length;

                if (!(fields = cls.rankedFields)) {
                    // On the first edit of a record of this type we need to ensure we have the
                    // topo-sort done:
                    fields = cls.rankFields();
                }

                for (i = 0, length = fields.length; i < length; ++i) {
                    // The generated method declares vars for each field using "f0".."fN' as the
                    // name. These are used to access properties of the field (e.g., the convert
                    // method or defaultValue).
                    field = fields[i];
                    fieldVars[i] = fs = 'f' + i;
                    convert = field.convert;

                    if (i) {
                        code.push(',  \n    ');
                    }
                    code.push(fs, ' = $fields[' + i + ']');
                    //<debug>
                    // this can be helpful when debugging (at least in Chrome):
                    code.push('  /*  ', field.name, '  */');
                    //</debug>

                    // NOTE: added string literals are "folded" by the compiler so we
                    // are better off doing an "'foo' + 'bar'" then "'foo', 'bar'". But
                    // for variables we are better off pushing them into the array for
                    // the final join.

                    if ((hasDefValue = (field.defaultValue !== undefined)) || convert) {
                        // For non-calculated fields that have some work required (a convert method
                        // and/or defaultValue), generate a chunk of logic appropriate for the
                        // field.
                        //expr = data["fieldName"];
                        expr = 'data["' + field.name + '"]';
                        ++work;

                        bc = ec = '';
                        if (field.cloneDefaultValue) {
                            bc = 'Ext.clone(';
                            ec = ')';
                        }

                        body.push('\n');
                        if (convert && hasDefValue) {
                            // v = data.fieldName;
                            // if (v !== undefined) {
                            //     v = f2.convert(v, e);
                            // }
                            // if (v === undefined) {
                            //     v = f2.defaultValue;
                            //      // or
                            //     v = Ext.clone(f2.defaultValue);
                            // }
                            // data.fieldName = v;
                            //
                            body.push('    v = ', expr, ';\n' +
                                      '    if (v !== undefined) {\n' +
                                      '        v = ', fs, '.convert(v, e);\n' +
                                      '    }\n' +
                                      '    if (v === undefined) {\n' +
                                      '        v = ', bc, fs, '.defaultValue',ec,';\n' +
                                      '    }\n' +
                                      '    ', expr, ' = v;');
                        } else if (convert) { // no defaultValue
                            // v = f2.convert(data.fieldName,e);
                            // if (v !== undefined) {
                            //     data.fieldName = v;
                            // }
                            //
                            body.push('    v = ', fs, '.convert(', expr, ',e);\n' +
                                      '    if (v !== undefined) {\n' +
                                      '        ', expr, ' = v;\n' +
                                      '    }\n');
                        } else if (hasDefValue) { // no convert
                            // if (data.fieldName === undefined) {
                            //     data.fieldName = f2.defaultValue;
                            //          // or
                            //     data.fieldName = Ext.clone(f2.defaultValue);
                            // }
                            //
                            body.push('    if (', expr, ' === undefined) {\n' +
                                      '        ', expr, ' = ',bc,fs,'.defaultValue',ec,';\n' +
                                      '    }\n');
                        }
                    }
                }

                if (!work) {
                    // There are no fields that need special processing
                    return Ext.emptyFn;
                }

                code.push(';\n');
                code.push.apply(code, body);
                code.push('}');
                code = code.join('');

                factory = new Function('$fields', code);

                return factory(fields);
            }
        } // static
    } // privates
},
function () {
    var Model = this,
        proto = Model.prototype,
        Schema = Ext.data.schema.Schema,
        defaultSchema;

    Model.proxyConfig = proto.proxy;
    delete proto.proxy;

    Model.schema = proto.schema = Schema.get(proto.schema);
    proto.idField = new Ext.data.field.Field(proto.idProperty);
    Model.identifier = new Ext.data.identifier.Sequential();

    Model.onExtended(function (cls, data) {
        var proto = cls.prototype,
            schemaName = data.schema,
            superCls = proto.superclass.self,
            schema, entityName, proxy;
            
        cls.idProperty = proto.idProperty;

        if (schemaName) {
            delete data.schema;
            schema = Schema.get(schemaName);
        } else if (!(schema = proto.schema)) {
            schema = defaultSchema || (defaultSchema = Schema.get('default'));
        }

        // These are in "privates" so we manually make them inherited:
        cls.rankFields = Model.rankFields;
        cls.topoAdd = Model.topoAdd;

        // if we picked up a schema from cls.prototype.schema, it is because it was found
        // in the prototype chain on a base class.
        proto.schema = cls.schema = schema;

        // Unless specified on the declaration data, we need to provide the entityName of
        // the new Entity-derived class. Store it on the prototype and the class.
        if (!(entityName = data.entityName)) {
            proto.entityName = entityName = schema.getEntityName(cls);
            //<debug>
            if (!entityName) {
                if (data.associations) {
                    Ext.Error.raise('Anonymous entities cannot specify "associations"');
                }
                if (data.belongsTo) {
                    Ext.Error.raise('Anonymous entities cannot specify "belongsTo"');
                }
                if (data.hasMany) {
                    Ext.Error.raise('Anonymous entities cannot specify "hasMany"');
                }
                if (data.hasOne) {
                    Ext.Error.raise('Anonymous entities cannot specify "hasOne"');
                }
                if (data.matrices) {
                    Ext.Error.raise('Anonymous entities cannot specify "manyToMany"');
                }
            }
            //</debug>
        }
        cls.entityName = entityName;
        cls.fieldExtractors = {};
        
        Model.initIdentifier(data, cls, proto);
        Model.initFields(data, cls, proto);

        // This is a compat hack to allow "rec.fields.items" to work as it used to when
        // fields was a MixedCollection
        cls.fields.items = cls.fields;

        if (entityName) {
            schema.addEntity(cls);
            Model.initAssociations(schema, data, cls);
        }

        Model.initValidators(data, cls, proto);

        proxy = data.proxy;
        if (proxy) {
            delete data.proxy;
        } else {
            proxy = superCls.proxyConfig || superCls.proxy;
        }

        cls.proxyConfig = proxy;
    });
});
