/**
 * @private
 */
Ext.define('Ext.data.schema.Role', {
    /**
     * @property {Ext.data.schema.Association} association
     * @readonly
     */

    isRole: true,

    /**
     * @property {Boolean} left
     * @readonly
     */
    left: true,

    /**
     * @property {Boolean} owner
     * @readonly
     */
    owner: false,

    /**
     * @property {String} side
     * @readonly
     */
    side: 'left',

    /**
     * @property {Boolean} isMany
     * @readonly
     */
    isMany: false,

    /**
     * @property {Ext.Class} cls
     * The `Ext.data.Model` derived class.
     * @readonly
     */

    /**
     * @property {Ext.data.schema.Role} inverse
     * @readonly
     */

    /**
     * @property {String} type
     * The `{@link Ext.data.Model#entityName}` derived class.
     * @readonly
     */

    /**
     * @property {String} role
     * @readonly
     */

    defaultReaderType: 'json',

    constructor: function (association, config) {
        var me = this,
            extra = config.extra;

        Ext.apply(me, config);
        if (extra) {
            delete extra.type;
            Ext.apply(me, extra);
            delete me.extra;
        }

        me.association = association;

        // The Association's owner property starts as either "left" or "right" (a string)
        // and we promote it to a reference to the appropriate Role instance here.
        if (association.owner === me.side) {
            association.owner = me;
            me.owner = true;
        }
    },

    processUpdate: function() {
        Ext.Error.raise('Only the "many" for an association may be processed. "' + this.role + '" is not valid.');
    },

    /**
     * Exclude any locally modified records that don't belong in the store. Include locally
     * modified records that should be in the store.
     * 
     * @param {Ext.data.Session} session The session holding the records
     * @param {Ext.data.Model} associatedEntity The entity that owns the records.
     * @param {Ext.data.Model[]} records The records to check.
     * @return {Ext.data.Model[]} The corrected set of records.
     *
     * @private
     */
    validateAssociationRecords: function(session, associatedEntity, records) {
        return records;
    },

    createAssociationStore: function (session, from, records, isComplete) {
        var me = this,
            association = me.association,
            foreignKeyName = association.getFieldName(),
            isMany = association.isManyToMany,
            storeConfig = me.storeConfig,
            id = from.getId(),
            config = {
                model: me.cls,
                data: records,
                role: me,
                session: session,
                associatedEntity: from,
                disableMetaChangeEvent: true,
                pageSize: null,
                remoteFilter: true,
                trackRemoved: !session
            },
            matrix, store;

        if (isMany) {
            // For many-to-many associations each role has a field
            config.filters = [{
                property  : me.inverse.field, // @TODO filterProperty
                value     : id,
                exactMatch: true
            }];
        } else if (foreignKeyName) {
            config.filters = [{
                property  : foreignKeyName, // @TODO filterProperty
                value     : id,
                exactMatch: true
            }];
            config.foreignKeyName = foreignKeyName;
        }

        if (storeConfig) {
            Ext.apply(config, storeConfig);
        }

        store = Ext.Factory.store(config);
        if (records) {
            store.complete = !!isComplete;
        }
        if (isMany) {
            if (session) {
                // If we are creating a store of say Groups in a UserGroups matrix, we want
                // to traverse the inverse side of the matrix (Users) because the id we have
                // is that of the User to which these Groups are associated.
                matrix = session.getMatrixSlice(me.inverse, id);

                matrix.attach(store);
                matrix.notify = me.onMatrixUpdate;
                matrix.scope = me;
            }
        }

        if (foreignKeyName || (isMany && session)) {
            store.on({
                add: 'onAddToMany',
                remove: 'onRemoveFromMany',
                clear: 'onRemoveFromMany',
                scope: me
            });
            if (records) {
                me.onAddToMany(store, store.getData().items, true);
            }
        }

        return store;
    },

    getAssociatedStore: function (inverseRecord, options, scope, records, isComplete) {
        // Consider the Comment entity with a ticketId to a Ticket entity. The Comment
        // is on the left (the FK holder's side) so we are implementing the guts of
        // the comments() method to load the Store of Comment entities. This trek
        // begins from a Ticket (inverseRecord).

        var me = this,
            propertyName = me.storeName || me.getStoreName(),
            store = inverseRecord[propertyName],
            load = options && options.reload,
            source = inverseRecord.$source,
            session = inverseRecord.session,
            args, i, len, raw, rec, sourceStore;

        if (!store) {
            // We want to check whether we can automatically get the store contents from the parent session.
            // For this to occur, we need to have a parent in the session, and the store needs to be created
            // and loaded with the initial dataset.
            if (!records && source) {
                source = source[propertyName];
                if (source && !source.isLoading()) {
                    sourceStore = source;
                    records = [];
                    raw = source.getData().items;

                    for (i = 0, len = raw.length; i < len; ++i) {
                        rec = raw[i];
                        records.push(session.getRecord(rec.self, rec.id));
                    }
                    isComplete = true;
                }
            }
            store = me.createAssociationStore(session, inverseRecord, records, isComplete);
            store.$source = sourceStore;

            if (!records && (me.autoLoad || options)) {
                load = true;
            }

            inverseRecord[propertyName] = store;
        }

        if (options) {
            // We need to trigger a load or the store is already loading. Defer
            // callbacks until that happens
            if (load || store.isLoading()) {
                store.on('load', function(store, records, success, operation) {
                    args = [store, operation];
                    scope = scope || options.scope || inverseRecord;

                    if (success) {
                        Ext.callback(options.success, scope, args);
                    } else {
                        Ext.callback(options.failure, scope, args);
                    }
                    args.push(success);
                    Ext.callback(options, scope, args);
                    Ext.callback(options.callback, scope, args);
                }, null, {single: true});
            } else {
                // Trigger straight away
                args = [store, null];
                scope = scope || options.scope || inverseRecord;

                Ext.callback(options.success, scope, args);
                args.push(true);
                Ext.callback(options, scope, args);
                Ext.callback(options.callback, scope, args);
            }
        }

        if (load && !store.isLoading()) {
            store.load();
        }

        return store;
    },
    
    /**
     * Gets the store/record associated with this role from an existing record.
     * Will only return if the value is loaded.
     * 
     * @param {Ext.data.Model} rec The record
     * 
     * @return {Ext.data.Model/Ext.data.Store} The associated item. `null` if not loaded.
     * @private
     */
    getAssociatedItem: function(rec) {
        var key = this.isMany ? this.getStoreName() : this.role;
        return rec[key] || null;
    },

    getReaderRoot: function() {
        var me = this;

        return me.associationKey ||
              (me.associationKey = me.association.schema.getNamer().readerRoot(me.role));
    },
    
    getReader: function() {
        var me = this,
            reader = me.reader,
            Model = me.cls,
            useSimpleAccessors = !me.associationKey,
            root = this.getReaderRoot();
            
        if (reader) {
            if (Ext.isString(reader)) {
                reader = {
                    type: reader,
                    rootProperty: root,
                    useSimpleAccessors: useSimpleAccessors
                };
            }
            if (reader.isReader) {
                reader.setModel(Model);
                reader.setRootProperty(root);
                reader.setUseSimpleAccessors(useSimpleAccessors);
            } else {
                Ext.applyIf(reader, {
                    model: Model,
                    rootProperty: root,
                    useSimpleAccessors: useSimpleAccessors,
                    type: me.defaultReaderType
                });
            }
            reader = me.reader = Ext.createByAlias('reader.' + reader.type, reader);
        }   
        return reader; 
    },

    getStoreName: function () {
        var me = this;
        return me.storeName ||
               (me.storeName = me.association.schema.getNamer().storeName(me.role));
    },
    
    constructReader: function(fromReader) {
        var me = this,
            reader = me.getReader(),
            Model = me.cls,
            useSimpleAccessors = !me.associationKey,
            root = me.getReaderRoot(),
            proxy;
        
        // No reader supplied
        if (!reader) {
            proxy = Model.getProxy();
            // if the associated model has a Reader already, use that, otherwise attempt to create a sensible one
            if (proxy) {
                reader = proxy.getReader();
                me.savedRoot = reader.getRootProperty();
                reader.setRootProperty(root);
            } else {
                reader = new fromReader.self({
                    model: Model,
                    useSimpleAccessors: useSimpleAccessors,
                    rootProperty: root
                });
            }
        }
        return reader;
    },
    
    read: function (record, data, fromReader, readOptions) {
        var me = this,
            reader = this.constructReader(fromReader),
            result = reader.read(data, readOptions),
            saved = me.savedRoot;
        
        if (saved !== undefined) {
            reader.setRootProperty(saved);
            delete me.savedRoot;
        }
        return result;
    },

    getCallbackOptions: function(options, scope, defaultScope) {
        if (typeof options === 'function') {
            options = {
                callback: options,
                scope: scope || defaultScope
            };
        } else if (options) {
            options = Ext.apply({}, options);
            options.scope = scope || options.scope || defaultScope;
        }
        return options;
    },

    doGetFK: function (leftRecord, options, scope) {
        // Consider the Department entity with a managerId to a User entity. This method
        // is the guts of the getManager method that we place on the Department entity to
        // acquire a User entity. We are the "manager" role and that role describes a
        // User. This method is called, however, given a Department (leftRecord) as the
        // start of this trek.

        var me           = this,    // the "manager" role
            cls          = me.cls,  // User
            foreignKey   = me.association.getFieldName(),  // "managerId"
            propertyName = me.role,  // "manager"
            rightRecord  = leftRecord[propertyName], // = department.manager
            reload       = options && options.reload,
            done         = rightRecord !== undefined && !reload,
            session      = leftRecord.session,
            foreignKeyId, args;

        if (!done) {
            // We don't have the User record yet, so try to get it.

            if (session) {
                foreignKeyId = leftRecord.get(foreignKey);
                if (foreignKeyId || foreignKeyId === 0) {
                    done = session.peekRecord(cls, foreignKeyId, true) && !reload;
                    rightRecord = session.getRecord(cls, foreignKeyId, false);
                } else {
                    done = true;
                    leftRecord[propertyName] = rightRecord = null;
                }
            } else if (foreignKey) {
                // The good news is that we do indeed have a FK so we can do a load using
                // the value of the FK.

                foreignKeyId = leftRecord.get(foreignKey);
                if (!foreignKeyId && foreignKeyId !== 0) {
                    // A value of null ends that hope though... but we still need to do
                    // some callbacks perhaps.
                    done = true;
                    leftRecord[propertyName] = rightRecord = null;
                } else {
                    // foreignKeyId is the managerId from the Department (record), so
                    // make a new User, set its idProperty and load the real record via
                    // User.load method.
                    if (!rightRecord) {
                        // We may be reloading, let's check if we have one.
                        rightRecord = cls.createWithId(foreignKeyId);
                    }
                    // we are not done in this case, so don't set "done"
                }
            } else {
                // Without a FK value by which to request the User record, we cannot do
                // anything. Declare victory and get out.
                done = true;
            }
        } else if (rightRecord) {
            // If we're still loading, call load again which will handle the extra callbacks.
            done = !rightRecord.isLoading();
        }

        if (done) {
            if (options) {
                args = [rightRecord, null];
                scope = scope || options.scope || leftRecord;

                Ext.callback(options.success, scope, args);
                args.push(true);
                Ext.callback(options, scope, args);
                Ext.callback(options.callback, scope, args);
            }
        } else {
            leftRecord[propertyName] = rightRecord;
            options = me.getCallbackOptions(options, scope, leftRecord);
            rightRecord.load(options);
        }

        return rightRecord;
    },

    doSetFK: function (leftRecord, rightRecord, options, scope) {
        // Consider the Department entity with a managerId to a User entity. This method
        // is the guts of the setManager method that we place on the Department entity to
        // store the User entity. We are the "manager" role and that role describes a
        // User. This method is called, however, given a Department (record) and the User
        // (value).

        var me = this,
            foreignKey = me.association.getFieldName(),  // "managerId"
            propertyName = me.role,  // "managerDepartment"
            ret = leftRecord[propertyName],
            inverse = me.inverse,
            inverseSetter = inverse.setterName,  // setManagerDepartment for User
            session = leftRecord.session,
            modified;

        if (rightRecord && rightRecord.isEntity) {
            if (ret !== rightRecord) {
                leftRecord[propertyName] = rightRecord;

                if (foreignKey) {
                    leftRecord.set(foreignKey, rightRecord.getId());
                }

                if (inverseSetter) {
                    // Because the rightRecord has a reference back to the leftRecord
                    // we pass on to its setter (if there is one). We've already set
                    // the value on this side so we won't recurse back-and-forth.
                    rightRecord[inverseSetter](leftRecord);
                }
            }
        } else {
            // The value we received could just be the id of the rightRecord so we just
            // need to set the FK accordingly and cleanup any cached references.

            //<debug>
            if (!foreignKey) {
                Ext.Error.raise('No foreignKey specified for "' + me.association.left.role +
                    '" by ' + leftRecord.$className);
            }
            //</debug>

            modified = (leftRecord.changingKey && !inverse.isMany) || leftRecord.set(foreignKey, rightRecord);
            // set returns the modifiedFieldNames[] or null if nothing was change

            if (modified && ret && ret.isEntity && !ret.isEqual(ret.getId(), rightRecord)) {
                // If we just modified the FK value and it no longer matches the id of the
                // record we had cached (ret), remove references from *both* sides:
                ret[inverse.role] = leftRecord[propertyName] = undefined;
            }
        }

        if (options) {
            if (Ext.isFunction(options)) {
                options = {
                    callback: options,
                    scope: scope || leftRecord
                };
            }
            return leftRecord.save(options);
        }
    }
});
