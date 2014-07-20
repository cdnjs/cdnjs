/**
 * This class provides name derivation methods for use by a `Schema`.
 * 
 * # Caching
 * 
 * Because most name derivations are only textual manipulations of input strings, the
 * results can be cached. This is handled by the `apply` method by giving it the name of
 * the method to call. For example:
 * 
 *      var str = namer.capitalize('foo'); //  = "Foo"
 *      
 *      var str = namer.apply('capitalize', 'foo');
 * 
 * The return value of the second call (using `apply`) is the same as the first, however,
 * the results of `capitalize` are cached. This allows repeated calls to `apply` given the
 * same operation and string to avoid the extra string manipulation.
 * 
 * # Usage
 * 
 * This class is not intended to be created by application code. It is created by `Schema`
 * instances as directed by the `namer` config. Application code can derive from this
 * class and set the `namer` config to customize naming conventions used by the `Schema`.
 * 
 * @protected
 */
Ext.define('Ext.data.schema.Namer', {
    mixins: [
        'Ext.mixin.Factoryable'
    ],

    requires: [
        'Ext.util.Inflector'
    ],

    alias: 'namer.default', // also configures Factoryable

    isNamer: true,

    //-------------------------------------------------------------------------
    // Cacheable methods

    capitalize: function (name) {
        return Ext.String.capitalize(name);
    },

    /**
     * Given the name of a foreign key field, return the role of the related entity. For
     * example, fields like "fooId" or "foo_id" this implementation returns "foo".
     * @template
     */
    fieldRole: function (name) {
        var match = name.match(this.endsWithIdRe, '');
        if (match) {
            name = name.substr(0, name.length - (match[1] || match[2]).length);
        }
        return this.apply('uncapitalize', name);
    },

    idField: function (name) {
        // ex: User ==> userId
        return this.apply('uncapitalize,singularize', name) + 'Id';
    },

    multiRole: function (name) {
        return this.apply('undotted,uncapitalize,pluralize', name);
    },

    pluralize: function (name) {
        return Ext.util.Inflector.pluralize(name);
    },
    
    readerRoot: function (roleName) {
        return this.apply('uncapitalize', roleName);
    },

    singularize: function (name) {
        return Ext.util.Inflector.singularize(name);
    },

    storeName: function (roleName) {
        return this.apply('underscore', roleName);
    },

    uncapitalize: function (name) {
        return Ext.String.uncapitalize(name);
    },

    underscore: function (name) {
        return '_' + name;
    },

    uniRole: function (name) {
        return this.apply('undotted,uncapitalize,singularize', name);
    },

    undotted: function (name) {
        if (name.indexOf('.') < 0) {
            return name;
        }

        var parts = name.split('.'),
            index = parts.length;

        while (index-- > 1) {
            parts[index] = this.apply('capitalize', parts[index]);
        }

        return parts.join('');
    },

    //-------------------------------------------------------------------------
    // Non-Cacheable methods

    getterName: function (role) {
        var name = role.role;

        if (role && role.isMany) {
            //return this.apply('uncapitalize,pluralize', name);
            return name;
        }

        //return this.apply('capitalize,singularize', name);
        return 'get' + this.apply('capitalize', name);
    },

    inverseFieldRole: function (leftType, unique, rightRole, rightType) {
        // In a FK association, the left side may be unique in which case we have a
        // one-to-one otherwise we have a one-to-many. If the FK field is just the
        // name of the right side class (e.g., if it is "order"), then we don't want
        // to include the field name in the left role.
        var me = this,
            leftRole = me.apply(unique ? 'uniRole' : 'multiRole', leftType),
            s1 = me.apply('pluralize', rightRole),
            s2 = me.apply('undotted,pluralize', rightType);

        if (s1.toLowerCase() !== s2.toLowerCase()) {
            // Otherwise, we have something like "creatorId" on Ticket that holds a
            // reference to User. This makes the right role "creator" so rather than
            // make the left role "tickets" we make it "creatorTickets".
            leftRole = rightRole + me.apply('capitalize', leftRole);
        }

        return leftRole;
    },

    manyToMany: function (relation, leftType, rightType) {
        var me = this,
            // ex: UserGroups
            ret = me.apply('undotted,capitalize,singularize', leftType) +
                  me.apply('undotted,capitalize,pluralize', rightType);

        if (relation) {
            ret = me.apply('capitalize', relation + ret);
        }

        return ret;
    },

    /**
     * Returns the name for a one-to-many association given the left and right type and
     * the associating `role`.
     * 
     * In many cases the `role` matches the target type. For example, an OrderItem might
     * have an "orderId" field which would have a `role` of "order". If this is a reference
     * to an Order entity then the association name will be "OrderOrderItems".
     * 
     * When the `role` does not match, it is included in the association name. For example,
     * consider a Ticket entity with a "creatorId" field that references a User entity.
     * The `role` of that field will (by default) be "creator". The returned association
     * name will be "UserCreatorTickets".
     */
    manyToOne: function (leftType, leftRole, rightType, rightRole) {
        // ex: OrderItem -> Order  ==> OrderOrderItems
        //  Ticket (creator) -> User ==> UserCreatorTickets
        return this.apply('capitalize,singularize', rightType) +
               this.apply('capitalize', leftRole);
    },

    matrixRole: function (relation, entityType) {
        var ret = this.apply(relation ? 'multiRole,capitalize' : 'multiRole', entityType);
        return relation ? relation + ret : ret;
    },

    oneToOne: function (leftType, leftRole, rightType, rightRole) {
        return this.apply('undotted,capitalize,singularize', rightType) +
               this.apply('capitalize', leftRole);
    },

    setterName: function (role) {
        return 'set' + this.apply('capitalize', role.role);
    },
    
    //-------------------------------------------------------------------------
    // Private

    endsWithIdRe: /(?:(_id)|[^A-Z](Id))$/,

    cache: {},

    apply: function (operation, name) {
        var me = this,
            cache = me.cache,
            entry = cache[name] || (cache[name] = {}),
            ret = entry[operation],
            i, length, operations;

        if (!ret) {
            if (operation.indexOf(',') < 0) {
                ret = me[operation](name);
            } else {
                length = (operations = operation.split(',')).length;
                ret = name;
                for (i = 0; i < length; ++i) {
                    ret = me.apply(operations[i], ret);
                }
            }

            entry[operation] = ret;
        }

        return ret;
    }
});
