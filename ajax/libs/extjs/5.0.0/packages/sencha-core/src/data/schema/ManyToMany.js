/**
 * This relationship describes the case where any one entity of one type may relate to any
 * number of entities of another type, and also in the reverse.
 * 
 * This form of association cannot store id's in the related entities since that would
 * limit the number of related entities to one for the entity with the foreign key. Instead,
 * these relationships are typically implemented using a so-called "matrix" table. This
 * table typically has two columns to hold the id's of a pair of related entities. This
 * pair of id's is unique in the matrix table.
 * 
 * # Declaration Forms
 * 
 *      // Fully spelled out - all properties are their defaults:
 *      
 *      Ext.define('App.models.Group', {
 *          extend: 'Ext.data.Model',
 *          
 *          manyToMany: {
 *              UserGroups: {
 *                  type: 'User',
 *                  role: 'users',
 *                  field: 'userId',
 *                  right: {
 *                      field: 'groupId',
 *                      role: 'groups'
 *                  }
 *              }
 *          }
 *      });
 *
 *      // Eliminate "right" object and use boolean to indicate Group is on the
 *      // right. By default, left/right is determined by alphabetic order.
 *      
 *      Ext.define('App.models.Group', {
 *          extend: 'Ext.data.Model',
 *          
 *          manyToMany: {
 *              UserGroups: {
 *                  type: 'User',
 *                  role: 'users',
 *                  field: 'userId',
 *                  right: true
 *              }
 *          }
 *      });
 *
 *      // Eliminate object completely and rely on string to name the other type. Still
 *      // keep Group on the "right".
 *      
 *      Ext.define('App.models.Group', {
 *          extend: 'Ext.data.Model',
 *          
 *          manyToMany: {
 *              UserGroups: 'User#'   // '#' is on the side (left or right) of Group
 *          }
 *      });
 *
 *      // Remove explicit matrix name and keep Group on the "right". Generated matrixName
 *      // remains "UserGroups".
 *      
 *      Ext.define('App.models.Group', {
 *          extend: 'Ext.data.Model',
 *          
 *          manyToMany: [
 *              'User#'
 *          ]
 *      });
 *
 *      // Minimal definition but now Group is on the "left" since "Group" sorts before
 *      // "User". Generated matrixName is now "GroupUsers".
 *      
 *      Ext.define('App.models.Group', {
 *          extend: 'Ext.data.Model',
 *          
 *          manyToMany: [
 *              'User'
 *          ]
 *      });
 */
Ext.define('Ext.data.schema.ManyToMany', {
    extend: 'Ext.data.schema.Association',
    
    isManyToMany: true,

    isToMany: true,

    kind: 'many-to-many',

    Left: Ext.define(null, {
        extend: 'Ext.data.schema.Role',

        isMany: true,

        digitRe: /^\d+$/,

        validateAssociationRecords: function(session, associatedEntity, records) {
            var slice = session.getMatrixSlice(this.inverse, associatedEntity.id),
                members = slice.members,
                cls = this.cls,
                ret = [], 
                seen, i, len, id, member;

            if (records) {
                seen = {};
                // Loop over the records returned by the server and
                // check they all still belong
                for (i = 0, len = records.length; i < len; ++i) {
                    rec = records[i];
                    id = rec.id;
                    member = members[id];
                    if (!(member && member[2] === -1)) {
                        ret.push(rec);
                    }
                    seen[id] = true;
                }
            }

            // Loop over the expected set and include any missing records.
            for (id in members) {
                member = members[id];
                if (!seen || !seen[id] && (member && member[2] !== -1)) {
                    rec = session.peekRecord(cls, id);
                    if (rec) {
                        ret.push(rec);
                    }
                }
            }
            return ret;
        },

        processUpdate: function(session, associationData) {
            var me = this,
                entityType = me.inverse.cls,
                items = associationData.R,
                id, record, store;

            if (items) {
                for (id in items) {
                    record = session.peekRecord(entityType, id);
                    if (record) {
                        records = session.getEntityList(me.cls, items[id]);
                        store = me.getAssociatedItem(record);
                        if (store) {
                            records = me.validateAssociationRecords(session, record, records);
                            store.loadRecords(records);
                            store.complete = true;
                            me.onAddToMany(store, records, true);
                        } else {
                            // We don't have a store. Create it and add the records.
                            record[me.getterName](null, null, records);
                        }
                    } else {
                        session.onInvalidAssociationEntity(entityType, id);
                    }
                }
            }
            me.processMatrixBlock(session, associationData.C, 1);
            me.processMatrixBlock(session, associationData.D, -1);
        },

        checkMembership: function(session, record, matrix) {
            var side = this.left ? matrix.right : matrix.left,
                entityType = side.inverse.role.cls,
                inverse = this.inverse,
                slices = side.slices,
                slice, id, members, member, inverseRecord;

            if (slices) {
                slice = slices[record.id];
                if (slice) {
                    members = slice.members;
                    for (id in members) {
                        member = members[id];
                        if (member[2] !== -1) {
                            // Do we have the record in the session? If so, do we also have the store?
                            inverseRecord = session.peekRecord(entityType, id);
                            if (inverseRecord) {
                                store = inverse.getAssociatedItem(inverseRecord);
                                if (store) {
                                    store.matrixUpdate = 1;
                                    store.add(record);
                                    store.matrixUpdate = 0;
                                }
                            }
                        }
                    }
                }
            }
        },

        processMatrixBlock: function(session, items, state) {
            var inverse = this.inverse,
                digitRe = this.digitRe,
                slice, id;

            if (items) {
                for (id in items) {
                    // We may not have the record available to pull out the id, so the best we can
                    // do here is try to detect a number id.
                    if (digitRe.test(id)) {
                        id = parseInt(id, 10);
                    }
                    slice = session.getMatrixSlice(inverse, id);
                    slice.update(items[id], state);
                }
            }
        },

        createGetter: function() {
            var me = this;

            return function (options, scope, records) {
                // 'this' refers to the Model instance inside this function
                var session = this.session,
                    hadRecords;

                if (session) {
                    hadRecords = !!records;
                    records = me.validateAssociationRecords(session, this, records);
                    if (!hadRecords && !records.length) {
                        records = null;
                    }
                }
                return me.getAssociatedStore(this, options, scope, records, hadRecords);
            };
        },

        /*
         * This method is called when records are added to the association store. If this
         * is happening as a side-effect of the underlying matrix update, we skip telling
         * the matrix what it already knows. Otherwise we need to tell the matrix of the
         * changes on this side so that they can be reflected on the other side.
         */
        onAddToMany: function (store, records, load) {
            if (!store.matrixUpdate) {
                store.matrixUpdate = 1;
                // By default the "load" param is really the index, but we call this manually in a few
                // spots to indicate it's a default load
                store.matrix.update(records, load === true ? 0 : 1);
                store.matrixUpdate = 0;
            }
        },

        /*
         * This method is called when records are removed from the association store. The
         * same logic applies here as in onAddToMany with respect to the update that may
         * or may not be taking place on the underlying matrix.
         */
        onRemoveFromMany: function (store, records) {
            if (!store.matrixUpdate) {
                store.matrixUpdate = 1;
                store.matrix.update(records, -1);
                store.matrixUpdate = 0;
            }
        },

        read: function(record, node, fromReader, readOptions) {
            var me = this,
                // We use the inverse role here since we're setting ourselves
                // on the other record
                key = me.inverse.role,
                result = me.callParent([ record, node, fromReader, readOptions ]);
            
            // Did the root exist in the data?
            if (result.getReadRoot()) {
                // Create the store and dump the data
                record[me.getterName](null, null, result.getRecords());
            }
            
        },

        onMatrixUpdate: function (matrixSlice, id, state) {
            var store = matrixSlice.store,
                index, record, entry;

            if (store && !store.loading && !store.matrixUpdate) {
                store.matrixUpdate = 1;

                index = store.indexOfId(id);
                if (state < 0) {
                    if (index >= 0) {
                        store.remove([ index ]);
                    }
                } else if (index < 0) {
                    entry = store.getSession().getEntry(this.type, id);
                    record = entry && entry.record;

                    if (record) {
                        store.add(record);
                    }
                }

                store.matrixUpdate = 0;
            }
        }
    },
    function () {
        var Left = this; // Left is created but ManyToMany may not yet be created

        Ext.ClassManager.onCreated(function () {
            Ext.data.schema.ManyToMany.prototype.Right = Ext.define(null, {
                extend: Left,
                left: false,
                side: 'right'
            });
        }, null, 'Ext.data.schema.ManyToMany');
    })
});
