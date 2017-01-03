/**
 * This class manages models and their associations. Instances of `Session` are typically
 * associated with some `Component` (perhaps the Viewport or a Window) and then used by
 * their `{@link Ext.app.ViewModel view models}` to enable data binding.
 *
 * The primary job of a Session is to manage a collection of records of many different
 * types and their associations. This often starts by loading records when requested (via
 * bind - see below) and culminates when it is time to save to the server.
 *
 * Because the Session tracks all records it loads, it ensures that for any given type of
 * model, only one record exists with a given `id`. This means that all edits of that
 * record are properly targeted at that one instance.
 *
 * Similarly, when associations are loaded, the `Ext.data.Store` created to hold the
 * associated records is tracked by the Session. So all requests for the "OrderItems" of
 * a particular Order id will result in the same Store. Adding and removing items from
 * that Order then is sure to remain consistent.
 *
 * # Data
 *
 * Since the Session is managing all this data, there are several methods it provides
 * to give convenient access to that data. The most important of these is `update` and
 * `getChanges`.
 *
 * The `update` and `getChanges` methods both operate on object that contains a summary
 * of records and associations and different CRUD operations.
 *
 * TODO
 *
 * ## Saving
 *
 * There are two basic ways to save the contents of a Session: `getChanges` and
 * `getSaveBatch`. We've already seen `getChanges`. The data contained in the CRUD object
 * can be translated into whatever shape is needed by the server.
 *
 * To leverage the `{@link Ext.data.Model#proxy proxy}` facilities defined by each Model
 * class, there is the `getSaveBatch` method. That method returns an `Ext.data.Batch`
 * object populated with the necessary `create`, `update` and `destory` operations to
 * save all of the changes in the Session.
 *
 * # Binding
 *
 * Most forms of data binding start with a `{@link Ext.app.ViewModel}` rather than a
 * session, but the session does provide binding for records and associations. These
 * forms of binding consist of an object with a `reference` and `id` property.
 *
 * ## Record Binding
 *
 * When a record of a particular `Ext.data.Model` derived type is desired, it can be bound
 * like so (we'll simplify this using links next):
 *
 *      viewModel.bind({
 *              reference: 'User',
 *              id: 42
 *          },
 *          function (user) {
 *              // called when the User with id=42 is loaded
 *          });
 *
 * ## Association Binding
 *
 * Similarly we can request an association by adding the `association` property.
 *
 *      viewModel.bind({
 *              reference: 'User',
 *              id: 42,
 *              association: 'groups'
 *          },
 *          function (groups) {
 *              // called when the "groups" for User id=42 are loaded
 *              // this will be an Ext.data.Store
 *          });
 */
Ext.define('Ext.data.Session', {
    requires: [
        'Ext.data.schema.Schema',
        'Ext.data.Batch',
        'Ext.data.matrix.Matrix',
        'Ext.data.session.ChangesVisitor',
        'Ext.data.session.ChildChangesVisitor',
        'Ext.data.session.BatchVisitor'
    ],

    isSession: true,

    config: {
        /**
         * @cfg {String/Ext.data.schema.Schema} schema
         */
        schema: 'default',

        /**
         * @cfg {Ext.data.Session} parent
         * The parent session for this session.
         */
        parent: null,

        crudProperties: {
            create: 'C',
            read:   'R',
            update: 'U',
            drop:   'D'
        }
    },

    destroyed: false,

    crudOperations: [{
        type: 'R',
        entityMethod: 'readEntities'
    }, {
        type: 'C',
        entityMethod: 'createEntities'
    }, {
        type: 'U',
        entityMethod: 'updateEntities'
    }, {
        type: 'D',
        entityMethod: 'dropEntities'
    }],

    crudKeys: {
        C: 1,
        R: 1,
        U: 1,
        D: 1
    },

    constructor: function (config) {
        var me = this;

        /*
         * {
         *     User: {
         *         1: {
         *             record: user1Instance,
         *             refs: {
         *                 posts: {
         *                     101: post101Instance,
         *                     102: post202Instance
         *                 }
         *             }
         *         }
         *     }
         * }
         */
        me.data = {};

        /*
         *  {
         *      UserGroups: new Ext.data.matrix.Matrix({
         *          association: UserGroups
         *      })
         *  }
         */
        me.matrices = {};

        me.identifierCache = {};

        // Bind ourselves so we're always called in our own scope.
        me.recordCreator = me.recordCreator.bind(me);

        me.initConfig(config);
    },

    destroy: function () {
        var me = this,
            matrices = me.matrices,
            data = me.data,
            entityName, entities,
            record, id;

        for (id in matrices) {
            matrices[id].destroy();
        }

        for (entityName in data) {
            entities = data[entityName];
            for (id in entities) {
                record = entities[id].record;
                if (record) {
                    // Clear up any source if we pushed one on, remove
                    // the session reference
                    record.$source = record.session = null;
                }
            }
        }

        me.recordCreator = me.matrices = me.data = null;
        me.setSchema(null);
        me.callParent();
    },

    /**
     * Adds an existing record instance to the session. The record
     * may not belong to another session. The record cannot be a phantom record, instead
     * use {@link #createRecord}.
     * @param {Ext.data.Model} record The record to adopt.
     */
    adopt: function(record) {
        //<debug>
        this.checkModelType(record.self);
        if (record.session && record.session !== this) {
            Ext.Error.raise('Record already belongs to an existing session');
        }
        if (record.phantom) {
            Ext.Error.raise('Phantom records cannot be adopted, use the createRecord method');
        }
        //</debug>
        if (record.session !== this) {
            record.session = this;
            this.add(record);
        }
    },

    commit: function() {
        // TODO
    },

    /**
     * Creates a new record and tracks it in this session.
     *
     * @param {String/Ext.Class} type The `entityName` or the actual class of record to create.
     * @param {Object} [data] The data for the record.
     * @return {Ext.data.Model} The new record.
     */
    createRecord: function (type, data) {
        //<debug>
        this.checkModelType(type);
        //</debug>
        var Model = type.$isClass ? type : this.getSchema().getEntity(type),
            parent = this.getParent(),
            id;

        if (parent) {
            id = Model.getIdFromData(data);
            if (parent.peekRecord(Model, id)) {
                Ext.Error.raise('A parent session already contains an entry for ' + Model.entityName + ': ' + id);
            }
        }
        // By passing the session to the constructor, it will call session.add()
        return new Model(data, this);
    },

    /**
     * Returns an object describing all of the modified fields, created or dropped records
     * and many-to-many association changes maintained by this session.
     *
     * @return {Object} An object in the CRUD format (see the intro docs). `null` if there are no changes.
     */
    getChanges: function () {
        var visitor = new Ext.data.session.ChangesVisitor(this);
        this.visitData(visitor);
        return visitor.result;
    },

    /**
     * The same functionality as {@link #getChanges}, however we also take into account our
     * parent session.
     * 
     * @return {Object} An object in the CRUD format (see the intro docs). `null` if there are no changes.
     *
     * @protected
     */
    getChangesForParent: function() {
        var visitor = new Ext.data.session.ChildChangesVisitor(this);
        this.visitData(visitor);
        return visitor.result;
    },

    /**
     * Get a cached record from the session. If the record does not exist, it will
     * be created. If the `autoLoad` parameter is not set to `false`, the record will
     * be loaded via the {@link Ext.data.Model#proxy proxy} of the Model. 
     * 
     * If this session is configured with a `{@link #parent}` session, a *copy* of any existing record 
     * in the `parent` will be adopted into this session. If the `parent` does not contain the record,
     * the record will be created and *not* inserted into the parent.
     * 
     * See also {@link #peekRecord}.
     *
     * @param {String/Ext.Class} type The `entityName` or the actual class of record to create.
     * @param {Object} id The id of the record.
     * @param {Boolean/Object} [autoLoad=true] `false` to prevent the record from being loaded if
     * it does not exist. If this parameter is an object, it will be passed to the {@link Ext.data.Model#load} call.
     * @return {Ext.data.Model} The record.
     */
    getRecord: function(type, id, autoLoad) {
        var me = this,
            record = me.peekRecord(type, id),
            Model, parent, parentRec;

        if (!record) {
            Model = type.$isClass ? type : me.getSchema().getEntity(type);
            parent = me.getParent();
            if (parent) {
                parentRec = parent.peekRecord(Model, id);
            }
            if (parentRec && !parentRec.isLoading()) {
                record = parentRec.copy(undefined, me);
                record.$source = parentRec;
            } else {
                record = Model.createWithId(id, null, me);
                if (autoLoad !== false) {
                    record.load(Ext.isObject(autoLoad) ? autoLoad : undefined);
                }
            }
        }
        return record;
    },

    /**
     * Returns an `Ext.data.Batch` containing the `Ext.data.operation.Operation` instances
     * that are needed to save all of the changes in this session. This sorting is based
     * on operation type, associations and foreign keys. Generally speaking the operations
     * in the batch can be committed to a server sequentially and the server will never be
     * sent a request with an invalid (client-generated) id in a foreign key field.
     *
     * @param {Boolean} [sort=true] Pass `false` to disable the batch operation sort.
     * @return {Ext.data.Batch}
     */
    getSaveBatch: function (sort) {
        var visitor = new Ext.data.session.BatchVisitor();

        this.visitData(visitor);

        return visitor.getBatch(sort);
    },

    /**
     * Triggered when an associated item from {@link #update} references a record
     * that does not exist in the session.
     * @param {Ext.Class} entityType The entity type.
     * @param {Object} id The id of the model.
     *
     * @protected
     * @template
     */
    onInvalidAssociationEntity: function(entityType, id) {
        Ext.Error.raise('Unable to read association entity: ' + this.getModelIdentifier(entityType, id));
    },

    /**
     * Triggered when an drop block from {@link #update} tries to create a record
     * that already exists.
     * @param {Ext.Class} entityType The entity type.
     * @param {Object} id The id of the model.
     *
     * @protected
     * @template
     */
    onInvalidEntityCreate: function(entityType, id) {
        Ext.Error.raise('Cannot create, record already not exists: ' + this.getModelIdentifier(entityType, id));
    },

    /**
     * Triggered when an drop block from {@link #update} references a record
     * that does not exist in the session.
     * @param {Ext.Class} entityType The entity type.
     * @param {Object} id The id of the model.
     *
     * @protected
     * @template
     */
    onInvalidEntityDrop: function(entityType, id) {
        Ext.Error.raise('Cannot drop, record does not exist: ' + this.getModelIdentifier(entityType, id));
    },

    /**
     * Triggered when an drop block from {@link #update} tries to create a record
     * that already exists.
     * @param {Ext.Class} entityType The entity type.
     * @param {Object} id The id of the model.
     *
     * @protected
     * @template
     */
    onInvalidEntityRead: function(entityType, id) {
        Ext.Error.raise('Cannot read, record already not exists: ' + this.getModelIdentifier(entityType, id));
    },

    /**
     * Triggered when an update block from {@link #update} references a record
     * that does not exist in the session.
     * @param {Ext.Class} entityType The entity type.
     * @param {Object} id The id of the model.
     * @param {Boolean} dropped `true` if the record was dropped.
     *
     * @protected
     * @template
     */
    onInvalidEntityUpdate: function(entityType, id, dropped) {
        if (dropped) {
            Ext.Error.raise('Cannot update, record dropped: ' + this.getModelIdentifier(entityType, id));
        } else {
            Ext.Error.raise('Cannot update, record does not exist: ' + this.getModelIdentifier(entityType, id));
        }
    },

    /**
     * Gets an existing record from the session. The record will *not* be created if it does
     * not exist.
     *
     * See also: {@link #getRecord}.
     * 
     * @param {String/Ext.Class} type The `entityName` or the actual class of record to create.
     * @param {Object} id The id of the record.
     * @param {Boolean} [deep=false] `true` to consult 
     * @return {Ext.data.Model} The record, `null` if it does not exist.
     */
    peekRecord: function(type, id, deep) {
        // Duplicate some of this logic from getEntry here to prevent the creation
        // of entries when asking for the existence of records. We may not need them
        //<debug>
        this.checkModelType(type);
        //</debug>
        var entityType = type.$isClass ? type : this.getSchema().getEntity(type),
            entityName = entityType.entityName,
            entry = this.data[entityName],
            ret, parent;

        entry = entry && entry[id];
        ret = entry && entry.record;

        if (!ret && deep) {
            parent = this.getParent();
            ret = parent && parent.peekRecord(type, id, deep);
        }
        return ret || null;
    },

    /**
     * Save any changes in this session to a {@link #parent} session.
     */
    save: function() {
        //<debug>
        if (!this.getParent()) {
            Ext.Error.raise('Cannot commit session, no parent exists');
        }
        //</debug>
        var visitor = new Ext.data.session.ChildChangesVisitor(this);
        this.visitData(visitor);
        this.getParent().update(visitor.result);
    },

    /**
     * Create a child session with this session as the {@link #parent}.
     * @return {Ext.data.Session} The copied session.
     */
    spawn: function () {
        return new this.self({
            schema: this.getSchema(),
            parent: this
        });
    },

    /**
     * Complete a bulk update for this session.
     * @param {Object} data Data in the CRUD format (see the intro docs).
     */
    update: function(data) {
        var me = this,
            schema = me.getSchema(),
            crudOperations = me.crudOperations,
            len = crudOperations.length,
            crudKeys = me.crudKeys,
            entityName, entityType, entityInfo, i,
            operation, item, associations, key, role, associationData;

        // Do a first pass to setup all the entities first
        for (entityName in data) {
            entityType = schema.getEntity(entityName);
            //<debug>
            if (!entityType) {
                Ext.Error.raise('Invalid entity type: ' + entityName);
            }
            //</debug>
            entityInfo = data[entityName];

            for (i = 0; i < len; ++i) {
                operation = crudOperations[i];
                item = entityInfo[operation.type];
                if (item) {
                    me[operation.entityMethod](entityType, item);
                }
            }
        }

        // A second pass to process associations once we have all the entities in place
        for (entityName in data) {
            entityType = schema.getEntity(entityName);
            associations = entityType.associations;
            entityInfo = data[entityName];

            for (key in entityInfo) {
                // Skip over CRUD, just looking for associations here
                if (crudKeys[key]) {
                    continue;
                }
                role = associations[key];
                //<debug>
                if (!role) {
                    Ext.Error.raise('Invalid association key for ' + entityName + ', "' + key + '"');
                }
                //</debug>
                associationData = entityInfo[role.role];
                role.processUpdate(me, associationData);
            }
        }
    }, 

    //-------------------------------------------------------------------------
    privates: {
        /**
         * Add a record instance to this session. Called by model.
         * @param {Ext.data.Model} record The record.
         * 
         * @private
         */
        add: function (record) {
            var me = this,
                id = record.id,
                matrices = me.matrices,
                entry = me.getEntry(record.self, id),
                associations, roleName, role;

            //<debug>
            if (entry.record) {
                Ext.Error.raise('Duplicate id ' + record.id + ' for ' + record.entityName);
            }
            //</debug>

            entry.record = record;

            me.registerReferences(record);
            associations = record.associations;
            for (roleName in associations) {
                role = associations[roleName];
                association = role.association;
                matrix = matrices[association.name];
                if (association.isManyToMany && matrix) {
                    role.checkMembership(me, record, matrix);
                }
            }
        },

        /**
         * @private
         */
        applySchema: function (schema) {
            return Ext.data.schema.Schema.get(schema);
        },

        //<debug>
        /**
         * Checks if the model type being referenced is valid for this session. That includes checking
         * if the model name is correct & is one used in this {@link #schema} for this session. Will raise
         * an exception if the model type is not correct.
         * @param {String/Ext.Class} name The model name or model type.
         *
         * @private
         */
        checkModelType: function(name) {
            if (name.$isClass) {
                name = name.entityName;
            }

            if (!name) {
                Ext.Error.raise('Unable to use anonymous models in a Session');
            } else if (!this.getSchema().getEntity(name)) {
                Ext.Error.raise('Unknown entity type ' + name);
            }
        },
        //</debug>

        /**
         * Process a create block of entities from the {@link #update} method.
         * @param {Ext.Class} entityType The entity type.
         * @param {Object[]} items The data objects to create.
         *
         * @private
         */
        createEntities: function(entityType, items) {
            var len = items.length,
                i, data, rec, id;

            for (i = 0; i < len; ++i) {
                data = items[i];
                id = entityType.getIdFromData(data);
                rec = this.peekRecord(entityType, id);
                if (!rec) {
                    rec = this.createRecord(entityType, data);
                } else {
                    this.onInvalidEntityCreate(entityType, id);
                }
                // This record has been marked as being created, so we must
                // be a phantom
                rec.phantom = true;
            }
        },

        /**
         * Process a drop block for entities from the {@link #update} method.
         * @param {Ext.Class} entityType The entity type.
         * @param {Object[]} ids The identifiers of the items to drop.
         *
         * @private
         */
        dropEntities: function(entityType, ids) {
            var len = ids.length,
                i, rec, id;

            for (i = 0; i < len; ++i) {
                id = ids[i];
                rec = this.peekRecord(entityType, id);
                if (rec) {
                    rec.drop();
                } else {
                    this.onInvalidEntityDrop(entityType, id);
                }
            }
        },

        /**
         * Transforms a list of ids into a list of records for a particular type.
         * @param {Ext.Class} entityType The entity type.
         * @param {Object[]} ids The ids to transform.
         * @return {Ext.data.Model[]} The models corresponding to the ids.
         */
        getEntityList: function(entityType, ids) {
            var len = ids.length,
                i, id, rec, invalid;

            for (i = 0; i < len; ++i) {
                id = ids[i];
                rec = this.peekRecord(entityType, id);
                if (rec) {
                    ids[i] = rec;
                } else {
                    invalid = true;
                    ids[i] = null;
                    this.onInvalidAssociationEntity(entityType, id);
                }
            }
            if (invalid) {
                ids = Ext.Array.clean(ids);
            }
            return ids;
        },

        /**
         * Return an entry for the data property for a particular type/id.
         * @param {String/Ext.Class} type The entity name or model type.
         * @param {Object} id The id of the record
         * @return {Object} The data entry.
         *
         * @private
         */
        getEntry: function(type, id) {
            var entityType = type.$isClass ? type : this.getSchema().getEntity(type),
                entityName = entityType.entityName,
                data = this.data,
                entry;

            entry = data[entityName] || (data[entityName] = {});
            entry = entry[id] || (entry[id] = {});

            return entry;
        },

        getIdentifier: function (entityType) {
            var cache = this.identifierCache,
                identifier = entityType.identifier,
                key = identifier.id || entityType.entityName,
                ret = cache[key];

            if (!ret) {
                if (identifier.clone) {
                    ret = identifier.clone({
                        cache: cache
                    });
                } else {
                    ret = identifier;
                }

                cache[key] = ret;
            }

            return ret;
        },

        getMatrix: function (matrix) {
            var name = matrix.isManyToMany ? matrix.name : matrix,
                matrices = this.matrices;

            return matrices[name] ||
                   (matrices[name] = new Ext.data.matrix.Matrix(this, matrix));
        },

        getMatrixSlice: function (role, id) {
            var matrix = this.getMatrix(role.association),
                side = matrix[role.side];

            return side.get(id);
        },

        /**
         * Gets a user friendly identifier for a Model.
         * @param {Ext.Class} entityType The entity type.
         * @param {Object} id The id of the entity.
         * @return {String} The identifier.
         */
        getModelIdentifier: function(entityType, id) {
            return id + '@' + entityType.entityName;
        },

        onIdChanged: function (record, oldId, newId) {
            var me = this,
                entityName = record.entityName,
                id = record.id,
                bucket = me.data[entityName],
                entry = bucket[oldId],
                associations = record.associations,
                refs = entry.refs,
                setNoRefs = me._setNoRefs,
                association, fieldName, matrix, refId, role, roleName, roleRefs, store;

            //<debug>
            if (bucket[newId]) {
                Ext.Error.raise('Cannot change ' + entityName + ' id from ' + oldId +
                                ' to ' + newId + ' id already exists');
            }
            //</debug>

            delete bucket[oldId];
            bucket[newId] = entry;

            for (roleName in associations) {
                role = associations[roleName];
                if (role.isMany) {
                    store = role.getAssociatedItem(record);
                    if (store) {
                        matrix = store.matrix;
                        if (matrix) {
                            matrix.changeId(newId);
                        }
                    }
                }
            }

            if (refs) {
                for (roleName in refs) {
                    roleRefs = refs[roleName];
                    role = associations[roleName];
                    association = role.association;

                    if (association.isManyToMany) {
                        // TODO
                    } else {
                        fieldName = association.field.name;

                        for (refId in roleRefs) {
                            roleRefs[refId].set(fieldName, id, setNoRefs);
                        }
                    }
                }
            }

            me.registerReferences(record, oldId);
        },

        processManyBlock: function(entityType, role, items, processor) {
            var me = this,
                id, record, store;

            if (items) {
                for (id in items) {
                    record = me.peekRecord(entityType, id);
                    if (record) {
                        records = me.getEntityList(role.cls, items[id]);
                        store = role.getAssociatedItem(record);
                        me[processor](role, store, record, records);
                    } else {
                        me.onInvalidAssociationEntity(entityType, id);
                    }
                }
            }
        },

        processManyCreate: function(role, store, record, records) {
            if (store) {
                // Will handle any duplicates
                store.add(records);
            } else {
                record[role.getterName](null, null, records);
            }
                 
        },

        processManyDrop: function(role, store, record, records) {
            if (store) {
                store.remove(records);
            }
        },

        processManyRead: function(role, store, record, records) {
            if (store) {
                store.setRecords(records);
            } else {
                // We don't have a store. Create it and add the records.
                record[role.getterName](null, null, records);
            }
        },

        /**
         * Process a read block of entities from the {@link #update} method.
         * @param {Ext.Class} entityType The entity type.
         * @param {Object[]} items The data objects to read.
         *
         * @private
         */
        readEntities: function(entityType, items) {
            var len = items.length,
                i, data, rec, id;

            for (i = 0; i < len; ++i) {
                data = items[i];
                id = entityType.getIdFromData(data);
                rec = this.peekRecord(entityType, id);
                if (!rec) {
                    rec = this.createRecord(entityType, data);
                } else {
                    this.onInvalidEntityRead(entityType, id);
                }
                // We've been read from a "server", so we aren't a phantom,
                // regardless of whether or not we have an id
                rec.phantom = false;
            }
        },

        recordCreator: function (data, Model) {
            var me = this,
                id = Model.getIdFromData(data),
                record = me.peekRecord(Model, id, true);

            // It doesn't exist anywhere, create it
            if (!record) {
                // We may have a stub that is loading the record (in fact this may be the
                // call coming from that Reader), but the resolution is simple. By creating
                // the record it is registered in the data[entityName][id] entry anyway
                // and the stub will deal with it onLoad.
                record = new Model(data, me);
            } else {
                //TODO no easy answer here... we are trying to create a record and have
                //TODO some (potentially new) data. We probably should check for mid-air
                //TODO collisions using versionProperty but for now we just ignore the
                //TODO new data in favor of our potentially edited data.
                
                // Peek checks if it exists at any level, by getting it we ensure that the record is copied down
                record = me.getRecord(Model, id);
            }

            return record;
        },

        registerReferences: function (record, oldId) {
            var entityName = record.entityName,
                id = record.id,
                recordData = record.data,
                remove = oldId || oldId === 0,
                entry, i, fk, len, reference, references, refs, roleName;

            // Register this records references to other records
            len = (references = record.references).length;

            for (i = 0; i < len; ++i) {
                reference = references[i];  // e.g., an orderId field
                fk = recordData[reference.name];  // the orderId

                if (fk || fk === 0) {
                    reference = reference.reference; // the "order" association role
                    entityName = reference.type;
                    roleName = reference.inverse.role;

                    // Track down the entry for the associated record
                    entry = this.getEntry(reference.cls, fk);
                    refs = entry.refs || (entry.refs = {});
                    refs = refs[roleName] || (refs[roleName] = {});

                    refs[id] = record;
                    if (remove) {
                        delete refs[oldId];
                    }
                }
            }
        },

        /**
         * Process an update block for entities from the {@link #update} method.
         * @param {Ext.Class} entityType The entity type.
         * @param {Object[]} items The data objects to update.
         *
         * @private
         */
        updateEntities: function(entityType, items) {
            var len = items.length,
                i, data, rec, id, modified;

            // Repeating some code here, but we want to optimize this for speed
            if (Ext.isArray(items)) {
                for (i = 0; i < len; ++i) {
                    data = items[i];
                    id = entityType.getIdFromData(data);
                    rec = this.peekRecord(entityType, id);
                    if (rec) {
                        rec.set(data);
                    } else {
                        this.onInvalidEntityUpdate(entityType, id);
                    }
                }
            } else {
                for (id in items) {
                    data = items[id];
                    rec = this.peekRecord(entityType, id);
                    if (rec && !rec.dropped) {
                        modified = rec.set(data);
                    } else {
                        this.onInvalidEntityUpdate(entityType, id, !!rec);
                    }
                }
            }
        },

        updateReference: function (record, field, newValue, oldValue) {
            var reference = field.reference,
                entityName = reference.type,
                roleName = reference.inverse.role,
                id = record.id,
                entry, refs;

            if (oldValue || oldValue === 0) {
                // We must be already in this entry.refs collection
                refs = this.getEntry(entityName, oldValue).refs[roleName];
                delete refs[id];
            }

            if (newValue || newValue === 0) {
                entry = this.getEntry(entityName, newValue);
                refs = entry.refs || (entry.refs = {});
                refs = refs[roleName] || (refs[roleName] = {});
                refs[id] = record;
            }
        },

        /**
         * Walks the internal data tracked by this session and calls methods on the provided
         * `visitor` object. The visitor can then accumulate whatever data it finds important.
         * The visitor object can provide a number of methods, but all are optional.
         *
         * This method does not enumerate associations since these can be traversed given the
         * records that are enumerated. For many-to-many associations, however, this method
         * does enumerate the changes because these changes are not "owned" by either side of
         * such associations.
         *
         * @param {Object} visitor
         * @param {Function} [visitor.onCleanRecord] This method is called to describe a record
         * that is known but unchanged.
         * @param {Ext.data.Model} visitor.onCleanRecord.record The unmodified record.
         * @param {Function} [visitor.onDirtyRecord] This method is called to describe a record
         * that has either been created, dropped or modified.
         * @param {Ext.data.Model} visitor.onDirtyRecord.record The modified record.
         * @param {Function} [visitor.onMatrixChange] This method is called to describe a
         * change in a many-to-many association (a "matrix").
         * @param {Ext.data.schema.Association} visitor.onMatrixChange.association The object
         * describing the many-to-many ("matrix") association.
         * @param {Mixed} visitor.onMatrixChange.leftId The `idProperty` of the record on the
         * "left" of the association.
         * @param {Mixed} visitor.onMatrixChange.rightId The `idProperty` of the record on the
         * "right" of the association.
         * @param {Number} visitor.onMatrixChange.state A negative number if the two records
         * are being disassociated or a positive number if they are being associated. For
         * example, when adding User 10 to Group 20, this would be 1. When removing the User
         * this argument would be -1.
         * @return {Object} The visitor instance
         */
        visitData: function (visitor) {
            var me = this,
                data = me.data,
                matrices = me.matrices,
                all, assoc, id, id2, matrix, members, name, record, slice, slices, state;

            for (name in data) {
                all = data[name];  // all entities of type "name"

                for (id in all) {
                    record = all[id].record;

                    if (record) {
                        if (record.phantom || record.dirty || record.dropped) {
                            if (visitor.onDirtyRecord) {
                                visitor.onDirtyRecord(record);
                            }
                        } else if (visitor.onCleanRecord) {
                            visitor.onCleanRecord(record);
                        }
                    }
                }
            }

            if (visitor.onMatrixChange) {
                for (name in matrices) {
                    matrix = matrices[name].left;  // e.g., UserGroups.left (Users)
                    slices = matrix.slices;
                    assoc = matrix.role.association;

                    for (id in slices) {
                        slice = slices[id];
                        members = slice.members;

                        for (id2 in members) {
                            state = (record = members[id2])[2];

                            if (state) {
                                visitor.onMatrixChange(assoc, record[0], record[1], state);
                            }
                        }
                    }
                }
            }

            return visitor;
        },

        //---------------------------------------------------------------------
        // Record callbacks called because we are the "session" for the record.

        _setNoRefs: {
            refs: false
        }
    }
});
