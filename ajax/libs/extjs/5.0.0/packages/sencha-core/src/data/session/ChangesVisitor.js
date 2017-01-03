/**
 * This class is used internally by `{@link Ext.data.session.Session#getChanges}` to build
 * up an object describing changes in the session. It is not intended for public use but
 * can be used as an example of the visitor `{@link Ext.data.session.Session#visitData}`
 * requires.
 * @protected
 * @since 5.0.0
 */
Ext.define('Ext.data.session.ChangesVisitor', {
    constructor: function (session) {
        var me = this,
            crud;

        me.session = session;
        crud = session.getCrudProperties();
        me.result = null;

        me.writerOptions = {
            /*
             * Keyed by the $className of a Model, e.g. "Foo", and to cache data from
             * Foo.getProxy().getWriter (called "writer" in the pseudo code below):
             *
             *  Foo: {
             *      drop: {
             *          all: writer.getWriteAllFields(),
             *      },
             *      allDataOptions: Ext.apply(Ext.Object.chain(writer.getAllDataOptions()), {
             *          serialize: true
             *      }),
             *      partialDataOptions: Ext.apply(Ext.Object.chain(writer.getPartialDataOptions()), {
             *          serialize: true
             *      })
             *  }
             */
        };

        me.createKey = crud.create;
        me.readKey = crud.read;
        me.updateKey = crud.update;
        me.dropKey = crud.drop;
    },

    onDirtyRecord: function (record) {
        var me = this,
            crud = me.crud,
            created = record.phantom,
            dropped = record.dropped,
            updated = !created && !dropped,
            type = record.$className,
            prop = (created || dropped) ? 'allDataOptions' : 'partialDataOptions',
            writerOptions = me.writerOptions,
            name = record.entityName,
            options, bucket, entry, result;

        if (created && dropped) {
            return false;
        }

        crud = created ? me.createKey : (dropped ? me.dropKey : me.updateKey);
        writerOptions = writerOptions[type] || (writerOptions[type] = {});

        if (dropped) {
            // If the Writer says "writeAllFields" then we want to use allDataOptions
            // for the prop (set already). Otherwise we just want to encode the id.
            if (!(options = writerOptions.drop)) {
                writerOptions.drop = options = {
                    all: record.getProxy().getWriter().getWriteAllFields()
                };
            }
            if (!options.all) {
                entry = record.id;
            }
            // else entry is unset so we'll ask for the prop and call record.getData
        }

        if (!entry) {
            // Consult the Writer for the entity to determine its preferences for writing
            // complete or partial data. We rely on the serialization of the record's
            // getData method whereas the Writer has its own ideas on the matter.
            if (!(options = writerOptions[prop])) {
                options = record.getProxy().getWriter().getConfig(prop);
                writerOptions[prop] = options = Ext.Object.chain(options);
                options.serialize = true;
            }

            entry = record.getData(options);
        }

        //  User: {
        //      C: [
        //          { id: 20, name: 'Don' }
        //      ],
        //      U: [
        //          { id: 30, name: 'Don' }
        //      ],
        //      D: [ 40, 50 ]
        //  }
        result = me.result || (me.result = {});
        bucket = result[name] || (result[name] = {});
        bucket = bucket[crud] || (bucket[crud] = []);
        bucket.push(entry);
    },

    onMatrixChange: function (association, id1, id2, state) {
        var me = this,
            name = association.left.type, // e.g., "User"
            assocName = association.right.role, // e.g., "groups"
            operation = state < 0 ? me.dropKey : me.createKey,
            bucket, result;

        //  User: {
        //      groups: {
        //          C: {
        //              20: [ 30, 40 ]  // associate User 20 w/Groups 30 & 40
        //          },
        //          D: {
        //              10: [ 50 ]  // disassociate User 10 w/Group 50
        //          }
        //      }
        //  }
        result = me.result || (me.result = {});
        bucket = result[name] || (result[name] = {}); // User
        bucket = bucket[assocName] || (bucket[assocName] = {}); // groups
        bucket = bucket[operation] || (bucket[operation] = {}); // C or D
        bucket = bucket[id1] || (bucket[id1] = []);

        bucket.push(id2);
    }
});