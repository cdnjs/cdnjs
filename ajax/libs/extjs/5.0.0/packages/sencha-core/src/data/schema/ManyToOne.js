/**
 * This type of association describes the case where one entity is referenced by zero or
 * more other entities typically using a "foreign key" field.
 * 
 * The way this is defined is for one entity to have a field that holds the unique id (also
 * known as "Primary Key" or, more specifically, as the {@link Ext.data.Model#idProperty}
 * field) of the related entity. These fields have a {@link Ext.data.field.Field#reference}
 * in their definition. The value in the `reference` field of an entity instance holds the
 * value of the id of the related entity instance. Since many entities can hold the same
 * value in a `reference` field, this allows many entities to reference one entity.
 * 
 * Example 1:
 * 
 * OrderItem has a foreign key to Order.
 * 
 *      OrderItem -> Order
 * 
 * OrderItem is on the "left" and Order is on the "right". This is because the owner of
 * the foreign key is always on the "left". Many OrderItem's refer to one Order. The
 * default name of this association would be "Order_OrderItems".
 * 
 *      var Order_OrderItems = {
 *          name: 'Order_OrderItems',
 *          owner: Order_OrderItems.right,
 *          left: {
 *              cls: OrderItem,
 *              type: 'OrderItem',
 *              association: Order_OrderItems,
 *              left: true,
 *              owner: false,
 *              autoLoad: true,
 *              isMany: true,
 *              inverse: Order_OrderItems.right,
 *              role: 'orderItems'
 *          },
 *          right: {
 *              cls: Order,
 *              type: 'Order',
 *              association: Order_OrderItems,
 *              left: false,
 *              owner: true,
 *              autoLoad: true,
 *              isMany: false,
 *              inverse: Order_OrderItems.left,
 *              role: 'order'
 *          }
 *      };
 *      
 *      OrderItem.associations.order = Order_OrderItems.left;
 *      Order.associations.orderItems = Order_OrderItems.right;
 * 
 * Example 2:
 * 
 * Ticket entity has a "creator" backed by the creatorId foreign key. Like Order_OrderItems
 * this is a foreign-key based, many-to-one association. The Ticket entity has the foreign
 * key so it is the "left" and User is on the "right".
 * 
 *      var User_Creator_Tickets = {
 *          name: 'User_Creator_Tickets',
 *          owner: null,
 *          left: {
 *              cls: Ticket,
 *              type: 'Ticket',
 *              association: User_Creator_Tickets,
 *              left: true,
 *              owner: false,
 *              autoLoad: true,
 *              isMany: true,
 *              inverse: User_Creator_Tickets.right,
 *              role: 'creatorTickets',
 *              getterName: 'tickets'
 *          },
 *          right: {
 *              cls: User,
 *              type: 'User',
 *              association: User_Creator_Tickets,
 *              left: false,
 *              owner: false,
 *              autoLoad: true,
 *              isMany: false,
 *              inverse: User_Creator_Tickets.left,
 *              role: 'creator',
 *              getterName: 'getCreator'
 *          }
 *      };
 *      
 *      Ticket.associations.creator = User_Creator_Tickets.left;
 *      User.associations.creatorTickets = User_Creator_Tickets.right;
 */
Ext.define('Ext.data.schema.ManyToOne', {
    extend: 'Ext.data.schema.Association',

    isManyToOne: true,

    isToOne: true,

    kind: 'many-to-one',

    Left: Ext.define(null, {
        extend: 'Ext.data.schema.Role',

        isMany: true,

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
                        } else {
                            // We don't have a store. Create it and add the records.
                            record[me.getterName](null, null, records);
                        }
                    } else {
                        session.onInvalidAssociationEntity(entityType, id);
                    }
                }
            }
        },

        validateAssociationRecords: function(session, associatedEntity, records) {
            var refs = session.getEntry(associatedEntity.self, associatedEntity.id).refs,
                ret = [],
                key = this.association.getFieldName(),
                seen, rec, id;

            refs = refs && refs[this.role];
            if (refs) {
                if (records) {
                    seen = {};
                    // Loop over the records returned by the server and
                    // check they all still belong
                    for (i = 0, len = records.length; i < len; ++i) {
                        rec = records[i];
                        id = rec.id;
                        if (refs[id]) {
                            ret.push(rec);
                        }
                        seen[id] = true;
                    }
                }

                // Loop over the expected set and include any missing records.
                for (id in refs) {
                    if (!seen || !seen[id]) {
                        ret.push(refs[id]);
                    }
                }
            }
            return ret;
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

        createSetter: null, // no setter for an isMany side

        onAddToMany: function (store, records) {
            this.syncFK(records, store.associatedEntity, false);
        },

        onRemoveFromMany: function (store, records) {
            this.syncFK(records, store.associatedEntity, true);
        },

        read: function(record, node, fromReader, readOptions) {
            var me = this,
                // We use the inverse role here since we're setting ourselves
                // on the other record
                key = me.inverse.role,
                result = me.callParent([ record, node, fromReader, readOptions ]),
                store, items, len, i;
            
            // Did the root exist in the data?
            if (result.getReadRoot()) {
                store = record[me.getterName](null, null, result.getRecords());
                items = store.data.items;
                len = items.length;

                for (i = 0; i < len; ++i) {
                    items[i][key] = record;
                }
            }
        },

        syncFK: function (records, foreignKeyValue, clearing) {
            // We are called to set things like the FK (ticketId) of an array of Comment
            // entities. The best way to do that is call the setter on the Comment to set
            // the Ticket. Since we are setting the Ticket, the name of that setter is on
            // our inverse role.

            var foreignKeyName = this.association.getFieldName(),
                setter = this.inverse.setterName, // setTicket
                i = records.length,
                newVal = clearing ? null : foreignKeyValue.getId(),
                different, rec;

            while (i-- > 0) {
                rec = records[i];
                different = !rec.isEqual(foreignKeyValue.getId(), rec.get(foreignKeyName));

                if (different !== clearing) {
                    // clearing === true
                    //      different === true  :: leave alone (not associated anymore)
                    //   ** different === false :: null the value (no longer associated)
                    //
                    // clearing === false
                    //   ** different === true  :: set the value (now associated)
                    //      different === false :: leave alone (already associated)
                    //
                    rec.changingKey = true;
                    if (setter) {
                        rec[setter](newVal);
                    } else {
                        rec.set(foreignKeyName, newVal);
                    }
                    rec.changingKey = false;
                }
            }
        }
    }),

    Right: Ext.define(null, {
        extend: 'Ext.data.schema.Role',

        left: false,
        side: 'right',

        createGetter: function() {
            // As the target of the FK (say "ticket" for the Comment entity) this
            // getter is responsible for getting the entity referenced by the FK value.
            var me = this;

            return function (options, scope) {
                // 'this' refers to the Comment instance inside this function
                return me.doGetFK(this, options, scope);
            };
        },
        
        createSetter: function() {
            var me = this;

            return function (rightRecord, options, scope) {
                // 'this' refers to the Comment instance inside this function
                return me.doSetFK(this, rightRecord, options, scope);
            };
        },

        onValueChange: function(leftRecord, session, newValue, oldValue) {
            // If we have a session, we may be able to find the new store this belongs to
            // If not, the best we can do is to remove the record from the associated store/s.
            var joined, store, i, len, associated;

            if (leftRecord.changingKey) {
                return;
            }

            if (session) {
                // Find the store that holds this record and remove it if possible.
                store = this.getSessionStore(session, oldValue);
                if (store) {
                    store.remove(leftRecord);
                }
                // If we have a new value, try and find it and push it into the new store.
                if (newValue || newValue === 0) {
                    store = this.getSessionStore(session, newValue);
                    if (store && !store.isLoading()) {
                        store.add(leftRecord);
                    }
                }
            } else {
                joined = leftRecord.joined;
                if (joined) {
                    for (i = 0, len = joined.length; i < len; ++i) {
                        store = joined[i];
                        if (store.isStore) {
                            associated = store.getAssociatedEntity();
                            if (associated && associated.self === this.cls && associated.getId() === oldValue) {
                                store.remove(leftRecord);
                            }
                        }
                    }
                }
            }
        },

        getSessionStore: function(session, value) {
            var rec = session.peekRecord(this.cls, value);

            if (rec) {
                return this.inverse.getAssociatedItem(rec);
            }
        },
        
        read: function(record, node, fromReader, readOptions) {
            var result = this.callParent([ record, node, fromReader, readOptions ]),
                other = result.getRecords()[0];

            if (other) {
                record[this.role] = other;
            }
        }
    })
});
