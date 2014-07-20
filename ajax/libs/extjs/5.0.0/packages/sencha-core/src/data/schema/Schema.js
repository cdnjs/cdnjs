/**
 * A Schema is a collection of related {@link Ext.data.Model entities} and their respective
 * {@link Ext.data.schema.Association associations}.
 * 
 * # Schema Instances
 * 
 * By default a single instance of this class is created which serves as the schema for all
 * entities that do not have an explicit `{@link Ext.data.Model#cfg-schema schema}` config
 * either specified or inherited. This is sufficient in most cases.
 * 
 * When an entity does specify a `{@link Ext.data.Model#cfg-schema schema}`, however, that
 * looks up (or creates) an instance for that entity class which is then inherited.
 * 
 * **Important:** All related entities *must* belong to a single schema instance in order
 * to properly link up their associations.
 * 
 * ## Configuring Schemas
 * 
 * The best way to control the configuration of your `schema` is to define a base class for
 * all of your entities and use the `{@link Ext.data.Model#cfg-schema schema}` config like
 * this:
 * 
 *      Ext.define('MyApp.models.Base', {
 *          extend: 'Ext.data.Model',
 *
 *          // This configures the default schema because we don't assign an "id":
 *          schema: {
 *              // configs go here
 *          }
 *      });
 * 
 * **Note:** Only one explicit configuration can be applied to the default schema. In most
 * applications this will not be an issue.
 *
 * By using a base class for your entities you can ensure that the default schema is fully
 * configured before declaration of your classes proceeds. This is especially helpful if
 * you need to set the `namespace` for your schema (see below).
 *
 * ## Relative Naming
 * 
 * When describing associations between entities, it is desirable to use shorthand names
 * that do not contain the common namespace portion. This is called the `entityName` as
 * opposed to its class name. By default, the `entityName` is the full class name. However,
 * if a namespace is used, the common portion can be discarded and we can derive a shorter name.
 * In the following code, `"MyApp.models.Foo"` has an `entityName` of `"Foo"` and the schema has
 * a `namespace` of "MyApp.models".
 * 
 * If you use deeper nesting for entities, you may need to set the `namespace` config to
 * account for this. For example:
 * 
 *      Ext.define('MyApp.models.Base', {
 *          extend: 'Ext.data.Model',
 *
 *          schema: {
 *              namespace: 'MyApp.models'
 *          }
 *      });
 *
 * Your derived classes now will generate proper default `entityName` values even if they
 * have further namespaces. For example, "MyApp.models.foo.Thing" will produce "foo.Thing"
 * as the `entityName` given the above as a base class.
 *
 * # Association Naming
 * 
 * There are various terms involved when describing associations. Perhaps the simplest
 * example that will clarify these terms is that of the common many-to-many association
 * of User and Group.
 * 
 *   * `entityName` - The names "User" and "Group" are the `entityName` values associated
 *   with these two classes. These are derived from their full classnames (perhaps
 *   something like "App.models.User" and "App.models.Group").
 *   
 *   * `associationName` - When talking about associations, especially the many-to-many
 *   variety, it is important to give them names. Associations are not owned by either of
 *   the entities involved, so this name is similar to an `entityName`. In the case of
 *   "User" and "Group", the default `associationName` would be "GroupUsers".
 *   
 *   * `left` and `right` - Associations describe a relationship between two entities. To
 *   talk about specific associations we would use the `entityName` of the parties (such
 *   as "User" or "Group"). When discussing associations in the abstract, however, it is
 *   very helpful to be able to talk about the entities in an association in a general way.
 *   In the case of the "GroupUsers" association, "User" is said to be the `left` while
 *   "Group" is said to be the `right`. In a many-to-many association the selection of
 *   `left` and `right` is arbitrary. When a foreign-key is involved, the `left` entity
 *   is the one containing the foreign-key.
 *   
 *   * `role` - @TODO
 *   
 *   * `inverse` - @TODO
 *
 * ## Custom Naming Conventions
 * 
 * One of the jobs the the `Schema` is to manage name generation (such as `entityName`).
 * This job is delegated to a class called the `namer`. If you need to generate names in
 * other ways, you can provide a custom `namer` for your classes:
 *
 *      Ext.define('MyApp.models.Base', {
 *          extend: 'Ext.data.Model',
 *
 *          schema: {
 *              namespace: 'MyApp.models',
 *              namer: 'custom'
 *          }
 *      });
 *
 * This will create a class using the alias "namer.custom". For example:
 *
 *      Ext.define('MyApp.models.CustomNamer', {
 *          extend: 'Ext.data.schema.Namer',
 *
 *          alias: 'namer.custom',
 *          ...
 *      });
 *
 * For details see the documentation for {@link Ext.data.schema.Namer Namer}.
 */
Ext.define('Ext.data.schema.Schema', {
    mixins: [
        'Ext.mixin.Factoryable'
    ],

    requires: [
        'Ext.util.ObjectTemplate',

        'Ext.data.schema.OneToOne',
        'Ext.data.schema.ManyToOne',
        'Ext.data.schema.ManyToMany',
        'Ext.data.schema.Namer'
    ],

    alias: 'schema.default', // also configures Factoryable

    aliasPrefix: 'schema.',

    isSchema: true,

    /**
     * @property {String} type
     * The name of the schema's type. This should be the suffix of the `alias` for this
     * class following the "schema." prefix. For example, if the `alias` for a schema is
     * "schema.foo" then `type` should "foo". If an `alias` is specified on the derived
     * class, this property is set automatically.
     * @readonly
     */
    type: 'default',

    statics: {
        /**
         * @property {Object} instances
         * A collection of `Schema` instances keyed by its `type`.
         * 
         *      var mySchema = Ext.data.schema.Schema.instances.mySchema;
         *
         * If the `Schema` may not have been created yet, use the {@link #get} method to
         * create the instance on first request:
         * 
         *      var mySchema = Ext.data.schema.Schema.get('mySchema');
         * 
         * @readonly
         * @private
         */
        instances: {},

        /**
         * Returns the `Schema` instance given its `id` or config object. If only the `id`
         * is specified, that `Schema` instance is looked up and returned. If there is no
         * instance already created, the `id` is assumed to be the `type`. For example:
         *
         *      schema: 'foo'
         *
         * Would be created from the alias `"schema.foo"` and assigned the `id` of "foo"
         * as well.
         *
         * @param {String/Object} config The id, type or config object of the schema.
         * @param {String} [config.type] The type alias of the schema. A "schema." prefix
         * is added to this string, if provided, to complete the alias. This should match
         * match the "alias" of some class derived from `Ext.data.schema.Schema`.
         * @return {Ext.data.schema.Schema} The previously existing or newly created
         * instance.
         */
        get: function (config) {
            var Schema = this,
                cache = Schema.instances,
                id = 'default',
                isString = config && Ext.isString(config),
                instance, newConfig;

            if (config) {
                if (config.isSchema) {
                    return config;
                }
                id = isString ? config : (config.id || id);
            }

            if (!(instance = cache[id])) {
                cache[id] = instance = Schema.create(config);
                instance.id = id;
            } else if (config && !isString) {
                //<debug>
                if (id !== 'default') {
                    Ext.Error.raise('Only the default Schema instance can be reconfigured');
                }
                //</debug>

                // When a Model contains a "schema" config object it is allowed to set the
                // configuration of the default schema. This is the default behavior of
                // this config on a model unless there is an "id" specified on it. So
                // the trick is that we already have an instance so we want to merge the
                // incoming config with the initial config of the default schema and then
                // make that the effective initial config.
                newConfig = Ext.merge({}, instance.config);
                Ext.merge(newConfig, config);
                instance.setConfig(newConfig);
                instance.config = newConfig;

                //<debug>
                instance.setConfig = function () {
                    Ext.Error.raise('The schema can only be reconfigured once');
                };
                //</debug>
            }

            return instance;
        },

        lookupEntity: function (entity) {
            var ret = null,
                instances = this.instances,
                match, name, schema;

            if (entity) {
                if (entity.isEntity) {
                    ret = entity.self; // a record
                } else if (Ext.isFunction(entity)) {
                    // A function (assume that a constructor is the Class).
                    ret = entity;
                } else if (Ext.isString(entity)) {
                    for (name in instances) {
                        schema = instances[name];
                        match = schema.getEntity(entity);
                        if (match) {
                            if (ret) {
                                Ext.Error.raise('Ambiguous entity name "' + entity + 
                                        '". Defined by schema "' + ret.schema.type +
                                        '" and "' + name + '"');
                            }
                            ret = match;
                        }
                    }
                    if (!ret) {
                        Ext.Error.raise('No such Entity "' + entity + '".');
                    }
                }
            }

            return ret;
        }
    },

    /**
     * @property {Number} assocCount The number of {@link Ext.data.schema.Association associations}
     * in this `schema`.
     * @readonly
     */
    assocCount: 0,

    /**
     * @property {Number} entityCount The number of {@link Ext.data.Model entities} in this
     * `schema`.
     * @readonly
     */
    entityCount: 0,

    config: {
        /**
         * @cfg {Object} defaultIdentifier
         * This config is used to initialize the `{@link Ext.data.Model#identifier}` config
         * for classes that do not define one.
         */
        defaultIdentifier: null,

        /**
         * @cfg {String/Object/Ext.data.schema.Namer} namer
         * Specifies or configures the name generator for the schema.
         */
        namer: 'default',

        /**
         * @cfg {String} namespace
         * The namespace for entity classes in this schema.
         */
        namespace: null,

        /**
         * @cfg {Object/Ext.util.ObjectTemplate} proxy
         * This is a template used to produce `Ext.data.proxy.Proxy` configurations for
         * Models that do not define an explicit `{@link Ext.data.Model#cfg-proxy proxy}`.
         *
         * This template is processed with the Model class as the data object which means
         * any static properties of the Model are available. The most useful of these are
         *
         *  * `prefix` - The `urlPrefix` property of this instance.
         *  * `entityName` - The {@link Ext.data.Model#entityName name} of the Model
         *      (for example, "User").
         *  * `schema` - This instance.
         */
        proxy: {
            type: 'ajax',
            url: '{prefix}/{entityName}',
            reader: {
                type: 'json'
            }
        },

        /**
         * @cfg {String} [urlPrefix=""]
         * This is the URL prefix used for all requests to the server. It could be something
         * like "/~api". This value is included in the `proxy` template data as "prefix".
         */
        urlPrefix: ''
    },

    onClassExtended: function (cls, data) {
        var alias = data.alias;

        if (alias && !data.type) {
            if (!Ext.isString(alias)) {
                alias = alias[0];
            }

            cls.prototype.type = alias.substring(this.prototype.aliasPrefix.length);
        }
    },

    constructor: function (config) {
        this.initConfig(config);
        this.clear();
    },

    //-------------------------------------------------------------------------
    // Config
    // <editor-fold>

    applyDefaultIdentifier: function (identifier) {
        return identifier && Ext.Factory.dataIdentifier(identifier);
    },

    applyNamer: function (namer) {
        var ret = Ext.data.schema.Namer.create(namer);
        ret.schema = this;
        return ret;
    },

    applyNamespace: function (namespace) {
        if (namespace) {
            var end = namespace.length - 1;
            if (namespace.charAt(end) !== '.') {
                namespace += '.';
            }
        }

        return namespace;
    },

    applyProxy: function (proxy) {
        return Ext.util.ObjectTemplate.create(proxy);
    },

    // </editor-fold>

    //-------------------------------------------------------------------------
    // Public

    eachAssociation: function (fn, scope) {
        var associations = this.associations,
            name;

        for (name in associations) {
            if (associations.hasOwnProperty(name)) {
                if (fn.call(scope, name, associations[name]) === false) {
                    break;
                }
            }
        }
    },

    eachEntity: function (fn, scope) {
        var entities = this.entities,
            name;

        for (name in entities) {
            if (entities.hasOwnProperty(name)) {
                if (fn.call(scope, name, entities[name].cls) === false) {
                    break;
                }
            }
        }
    },

    /**
     * Returns an `Association` by name.
     * @param {String} name The name of the association.
     * @return {Ext.data.schema.Association} The association instance.
     */
    getAssociation: function (name) {
        var entry = this.associations[name];
        return entry || null;
    },

    /**
     * Returns an entity by name.
     * @param {String} name The name of the entity
     * @return {Ext.data.Model} The entity class.
     */
    getEntity: function (name) {
        var entry = this.entityClasses[name] || this.entities[name];
        return (entry && entry.cls) || null;
    },
    
    /**
     * Get the entity name taking into account the {@link #namespace}.
     * @param {String/Ext.data.Model} cls The model class or name of the class.
     * @return {String} The entity name
     */
    getEntityName: function (cls) {
        var ns = this.getNamespace(),
            index, name;
            
        if (typeof cls === 'string') {
            name = cls;
        } else {
            name = cls.$className || null;
        }

        if (name) { // if (not anonymous class)
            if (ns) {
                index = ns.length;
                if (name.substring(0, index) !== ns) {
                    return name;
                }
            }

            if (index) {
                name = name.substring(index);
            }
        }

        return name;
    },
    
    /**
     * Checks if the passed entity has attached associations that need to be read when
     * using nested loading.
     * 
     * @param {String/Ext.Class/Ext.data.Model} The name, instance or Model class.
     * @return {Boolean} `true` if there are associations attached to the entity.
     */
    hasAssociations: function(name) {
        name = name.entityName || name;
        return !!this.associationEntityMap[name];  
    },
    
    /**
     * Checks if an entity is defined
     * @param {String/Ext.data.Model} entity The name or model
     * @return {Boolean} True if this entity is defined
     */
    hasEntity: function (entity) {
        var name = this.getEntityName(entity);
        return !!(this.entities[name] || this.entityClasses[name]);
    },

    //-------------------------------------------------------------------------
    // Protected

    /**
     * Adds an entry from a {@link Ext.data.Model#manyToMany matrix config} declared by an
     * entity.
     * 
     * This is the ideal method to override in a derived class if the standard, default
     * naming conventions need to be adjusted. In the override, apply whatever logic is
     * appropriate to determine the missing values and pass along the proper results to
     * this method in the `callParent`.
     * 
     * @param {Ext.Class} entityType A class derived from `Ext.data.Model`.
     *
     * @param {String} matrixName The name of the matrix association.
     *
     * @param {String} [relation] A base name for the matrix. For information about the
     * meaning of this see {@link Ext.data.Model#manyToMany}.
     * 
     * @param {Object} left The descriptor for the "left" of the matrix.
     * @param {String} left.type The type of the entity on the "left" of the matrix.
     * 
     * @param {String} [left.field] The name of the field in the matrix table for the "left"
     * side entity. If not provided, this defaults to the `left.type` name
     * {@link Ext.util.Inflector#singularize singularized} and uncapitalized followed by
     * "Id". For example, "userId" for a `left.type` of "Users".
     * 
     * @param {String} [left.role] The name of the relationship from the `left.type` to the
     * `right.type`. If not provided, this defaults to the `left.type` name
     * {@link Ext.util.Inflector#pluralize pluralized} and uncapitalized. For exmaple,
     * "users" for a `left.type` of "User".
     * 
     * @param {Object} right The descriptor for the "right" of the matrix.
     * @param {String} right.type The type of the entity on the "right" of the matrix.
     * 
     * @param {String} [right.field] The name of the field in the matrix table for the
     * "right" side entity. If not provided, this defaults in the same way as `left.field`
     * except this is based on `right.type`.
     * 
     * @param {String} [right.role] The name of the relationship from the `right.type` to
     * the `left.type`. If not provided, this defaults in the same way as `left.role`
     * except this is based on `right.type`.
     * 
     * @protected
     */
    addMatrix: function (entityType, matrixName, relation, left, right) {
        var me = this,
            namer = me.getNamer(),
            associations = me.associations,
            entities = me.entities,
            leftType   = left.type,
            rightType  = right.type,
            leftField  = left.field  || namer.apply('idField', leftType),
            rightField = right.field || namer.apply('idField', rightType),
            leftRole   = left.role   || namer.matrixRole(relation, leftType),
            rightRole  = right.role  || namer.matrixRole(relation, rightType),
            matrix, leftEntry, rightEntry;

        leftEntry = entities[leftType] || 
                   (entities[leftType] = { cls: null, name: leftType, associations: {} });

        rightEntry = entities[rightType] ||
                    (entities[rightType] = { cls: null, name: rightType, associations: {} });

        ++me.assocCount;
        associations[matrixName] = matrix = new Ext.data.schema.ManyToMany({
            name: matrixName,
            schema: me,
            definedBy: entityType,
            left: {
                cls: leftEntry.cls,
                type: leftType,
                role: leftRole,
                field: leftField
            },
            right: {
                cls: rightEntry.cls,
                type: rightType,
                role: rightRole,
                field: rightField
            }
        });

        leftEntry.associations[matrix.right.role] = matrix.right;
        rightEntry.associations[matrix.left.role] = matrix.left;

        me.associationEntityMap[entityType.entityName] = true;

        me.decorateModel(matrix);
    },

    /**
     * Adds a {@link Ext.data.Field#reference reference} field association for an entity
     * to this `schema`.
     * 
     * This is the ideal method to override in a derived class if the standard, default
     * naming conventions need to be adjusted. In the override, apply whatever logic is
     * appropriate to determine the missing values and pass along the proper results to
     * this method in the `callParent`.
     * 
     * @param {Ext.Class} entityType A class derived from `Ext.data.Model`.
     * 
     * @param {Ext.data.field.Field} referenceField The `field` with the `reference` config.
     * 
     * @param {String} [association] The name of the association. If empty or null, this
     * will be derived from `entityType`, `role`, `inverse` and
     * `referenceField.unique`.
     * 
     * @param {String} [role] The name of the relationship from `entityType` to the target
     * `type`. If not specified, the default is the `referenceField.name` (minus any "Id"
     * suffix if present).
     * 
     * @param {String} [inverse] The name of the relationship from the target `type`
     * to the `entityType`. If not specifed, this is derived from the
     * {@link Ext.data.Model#entityName entityName} of the `entityType`
     * ({@link Ext.util.Inflector#singularize singularized} or
     * {@link Ext.util.Inflector#pluralize pluralized} based on `referenceField.unique`).
     * 
     * @param {String} type The {@link Ext.data.Model#entityName entityName} of the target
     * of the reference.
     * 
     * @param {Object} [descr] The `reference` descriptor from the `referenceField` if one
     * was given in the field definition.
     *
     * @param {Boolean} [unique=false] Indicates if the reference is one-to-one.
     * 
     * @protected
     */
    addReference: function (entityType, referenceField, descr, unique) {
        var me = this,
            namer = me.getNamer(),
            entities = me.entities,
            associations = me.associations,
            entityName  = entityType.entityName,
            association = descr.association,
            legacy      = !!descr.legacy,
            child       = descr.child,
            parent      = descr.parent,
            rightRole   = descr.role,
            // Allow { child: 'OrderItem' } or the reverse (for one-to-one mostly):
            rightType   = descr.type || parent || child,
            leftVal     = descr.inverse,
            left        = Ext.isString(leftVal) ? { role: leftVal } : leftVal,
            leftRole    = left && left.role,
            entry, T;

        if (!rightRole) {
            // In a FK association, the left side has the key in a field named something
            // like "orderId". The default implementation of "fieldRole" namer is to drop
            // the id suffix which gives is the role of the right side.
            if (legacy) {
                rightRole = namer.apply('uncapitalize', rightType);
            } else {
                rightRole = namer.apply('fieldRole', referenceField.name);
            }
        }

        if (!leftRole) {
            leftRole = namer.inverseFieldRole(entityName, unique, rightRole, rightType);
        }

        if (!association) {
            if (unique) {
                association = namer.oneToOne(entityType, leftRole, rightType, rightRole);
            } else {
                association = namer.manyToOne(entityType, leftRole, rightType, rightRole);
            }
        }

        //<debug>
        if (association in associations) {
            Ext.Error.raise('Duplicate association: "' + association + '" declared by ' +
                    entityName + '.' + referenceField.name + ' (collides with ' +
                    associations[association].definedBy.entityName + ')');
        }
        if (referenceField && referenceField.definedBy === entities[rightType]) {
            Ext.Error.raise('ForeignKey reference should not be owned by the target model');
        }
        //</debug>

        // Lookup the entry for the target of the reference. Since it may not as yet be
        // defined, we may need to create the entry.
        entry = entities[rightType] ||
               (entities[rightType] = { cls: null, name: rightType, associations: {} });

        // as a field w/reference we are always "left":
        T = unique ? Ext.data.schema.OneToOne : Ext.data.schema.ManyToOne;
        association = new T({
            name: association,
            // Note: "parent" or "child" can be strings so don't assume otherwise
            owner: child ? 'left' : (parent ? 'right' : null),
            definedBy: entityType,
            schema: me,
            field: referenceField,
            nullable: referenceField ? !!referenceField.allowBlank : true,
            legacy: descr.legacy,
            left: {
                cls: entityType,
                type: entityName,
                role: leftRole,
                extra: left
            },
            right: {
                cls: entry.cls,
                type: rightType,
                role: rightRole,
                extra: descr
            }
        });

        // Add the left and right association "sides" to the appropriate collections, but
        // remember that the right-side entity class may not yet be declared (that's ok as
        // we store the associations in the entry):
        entityType.associations[rightRole] = association.right;
        entry.associations[leftRole] = association.left;
        if (referenceField) {
            // Store the role on the FK field. This "upgrades" legacy associations to the
            // new "field.reference" form.
            referenceField.reference = association.right;
            entityType.references.push(referenceField);
        }

        ++me.assocCount;
        me.associationEntityMap[entityName] = true;
        if (entry.cls) {
            me.associationEntityMap[entry.cls.entityName] = true;
        }
        associations[association.name] = association;
        
        if (association.right.cls) {
            me.decorateModel(association);
        }
    },

    //-------------------------------------------------------------------------
    // Private

    privates: {
        /**
         * Adds an {@link Ext.data.Model entity} to this `schema`.
         * @param {Ext.Class} entityType A class derived from {@link Ext.data.Model}.
         * @private
         */
        addEntity: function (entityType) {
            var me = this,
                entities = me.entities,
                entityName = entityType.entityName,
                entry = entities[entityName],
                fields = entityType.fields,
                associations, field, i, length, name;

            if (!entry) {
                entities[entityName] = entry = {
                    name: entityName,
                    associations: {}
                };
            }
            //<debug>
            else if (entry.cls) {
                Ext.Error.raise('Duplicate entity name "' + entityName + '": ' +
                        entry.cls.$className + ' and ' + entityType.$className);
            }
            //</debug>
            else {
                associations = entry.associations;
                for (name in associations) {
                    // the associations collection describes the types to which this entity is
                    // related, but the inverse descriptors need this entityType:
                    associations[name].inverse.cls = entityType;

                    me.associationEntityMap[entityName] = true;

                    // We already have an entry, which means other associations have likely been added
                    // for us, so go ahead and do the inverse decoration
                    me.decorateModel(associations[name].association);
                }
            }

            entry.cls = entityType;
            entityType.prototype.associations = entityType.associations = entry.associations;
            me.entityClasses[entityType.$className] = entry;

            ++me.entityCount;

            for (i = 0, length = fields.length; i < length; ++i) {
                field = fields[i];
                if (field.reference) {
                    me.addReferenceDescr(entityType, field);
                }
            }
        },

        /**
         * Adds the matrix associations of an {@link Ext.data.Model entity} to this `schema`.
         * @param {Ext.Class} entityType A class derived from {@link Ext.data.Model Entity}.
         * @param {Object/String[]} matrices The manyToMany matrices for the class.
         * @private
         */
        addMatrices: function (entityType, matrices) {
            var me = this,
                i, length, matrixName;

            if (Ext.isString(matrices)) {
                me.addMatrixDescr(entityType, null, matrices);
            } else if (matrices[0]) { // if (isArray)
                for (i = 0, length = matrices.length; i < length; ++i) {
                    me.addMatrixDescr(entityType, null, matrices[i]);
                }
            } else {
                for (matrixName in matrices) {
                    me.addMatrixDescr(entityType, matrixName, matrices[matrixName]);
                }
            }
        },

        /**
         * Adds an entry from a {@link Ext.data.Model#manyToMany matrix config} declared by an
         * {@link Ext.data.Model entity}.
         *
         * @param {Ext.Class} entityType A class derived from {@link Ext.data.Model Entity}.
         * @param {String} [matrixName] The name of the matrix association.
         * @param {String/Object} matrixDef A {@link Ext.data.Model#manyToMany matrix config}
         * declared by an {@link Ext.data.Model entity}.
         * @private
         */
        addMatrixDescr: function (entityType, matrixName, matrixDef) {
            var me = this,
                entityName = entityType.entityName,
                associations = me.associations,
                namer = me.getNamer(),
                left = matrixDef.left,
                right = matrixDef.right,
                last, relation;

            if (Ext.isString(matrixDef)) {
                if (matrixDef.charAt(0) === '#') {  // "#User" (entity is on the left)
                    /*
                     *  Ext.define('User', {
                     *      extend: 'Ext.data.Model',
                     *      manyToMany: '#Group'
                     *  });
                     */
                    left  = { type: entityName };  // User
                    right = { type: matrixDef.substring(1) };  // Group
                }
                else if (matrixDef.charAt(last = matrixDef.length - 1) === '#') { // "User#"
                    /*
                     *  Ext.define('Group', {
                     *      extend: 'Ext.data.Model',
                     *      manyToMany: 'User#'
                     *  });
                     */
                    left  = { type: matrixDef.substring(0, last) }; // User
                    right = { type: entityName };  // Group
                }
                else if (namer.apply('multiRole', entityName) <
                         namer.apply('multiRole', matrixDef)) {
                    /*
                     *  Ext.define('Group', {
                     *      extend: 'Ext.data.Model',
                     *      manyToMany: 'User'
                     *  });
                     */
                    left  = { type: entityName };  // Group
                    right = { type: matrixDef };  // User
                }
                else {
                    /*
                     *  Ext.define('User', {
                     *      extend: 'Ext.data.Model',
                     *      manyToMany: 'Group'
                     *  });
                     */
                    left  = { type: matrixDef };  // Group
                    right = { type: entityName };  // User
                }
            } else {
                //<debug>
                Ext.Assert.isString(matrixDef.type, 'No "type" for manyToMany in ' + entityName);
                //</debug>

                relation = matrixDef.relation;

                if (left || (!right && namer.apply('multiRole', entityName) <
                                       namer.apply('multiRole', matrixDef.type))) {
                    if (!left || left === true) {
                        /*
                         *  Ext.define('User', {
                         *      extend: 'Ext.data.Model',
                         *      manyToMany: {
                         *          type: 'Group',
                         *          left: true
                         *      }
                         *  });
                         */
                        left = { type: entityName }; // User
                    } else {
                        /*
                         *  Ext.define('User', {
                         *      extend: 'Ext.data.Model',
                         *      manyToMany: {
                         *          type: 'Group',
                         *          left: {
                         *              role: 'useroids'
                         *          }
                         *      }
                         *  });
                         */
                        left = Ext.apply({ type: entityName }, left); // User
                    }
                    right = matrixDef;  // Group
                } else {
                    if (!right || right === true) {
                        /*
                         *  Ext.define('Group', {
                         *      extend: 'Ext.data.Model',
                         *      manyToMany: {
                         *          type: 'User',
                         *          right: true
                         *      }
                         *  });
                         */
                        right = { type: entityName }; // Group
                    } else {
                        /*
                         *  Ext.define('Group', {
                         *      extend: 'Ext.data.Model',
                         *      manyToMany: {
                         *          type: 'User',
                         *          right: {
                         *              role: 'groupoids'
                         *          }
                         *      }
                         *  });
                         */
                        right = Ext.apply({ type: entityName }, right); // Group
                    }
                    left = matrixDef; // User
                }
            }

            if (!matrixName) {
                matrixName = namer.manyToMany(relation, left.type, right.type);
            }

            if (!(matrixName in associations)) {
                me.addMatrix(entityType, matrixName, relation, left, right);
            }
            //<debug>
            //
            // In the case of a matrix assocation, both sides may need to declare it to allow
            // them to be used w/o the other present. In development mode, we want to check
            // that they declare the same thing!
            //
            else {
                var entry = associations[matrixName],
                    before = [entry.kind, entry.left.type, entry.left.role, entry.left.field,
                              entry.right.type, entry.right.role, entry.right.field].join('|');

                // Call back in to bypass this check and realize the new association:
                delete associations[matrixName];
                me.addMatrix(entityType, matrixName, relation, left, right);
                var after = associations[matrixName];

                // Restore the originals so we match production behavior (for testing)
                associations[matrixName] = entry;
                entry.left.cls.associations[entry.right.role] = entry.right;
                entry.right.cls.associations[entry.left.role] = entry.left;
                --me.assocCount;

                // Now we can compare the old and the new to see if they are the same.
                after = [after.kind, after.left.type, after.left.role, after.left.field,
                         after.right.type, after.right.role, after.right.field].join('|');

                if (before != after) {
                    Ext.log.warn(matrixName + '(' + entry.definedBy.entityName + '): ' + before);
                    Ext.log.warn(matrixName + '(' + entityName + '): ' + after);
                    Ext.Error.raise('Conflicting association: "' + matrixName + '" declared by ' +
                        entityName + ' was previously declared by ' + entry.definedBy.entityName);
                }
            }
            //</debug>
        },

        /**
         * Adds a {@link Ext.data.Field#reference reference} {@link Ext.data.Field field}
         * association for an entity to this `schema`. This method decodes the `reference`
         * config of the `referenceField` and calls {@link #addReference}.
         *
         * @param {Ext.Class} entityType A class derived from {@link Ext.data.Model Nodel}.
         * @param {Ext.data.Field} referenceField The `field` with the `reference` config.
         * @private
         */
        addReferenceDescr: function (entityType, referenceField) {
            var me = this,
                descr = referenceField.$reference;

            if (Ext.isString(descr)) {
                descr = {
                    type: descr
                };
            } else {
                descr = Ext.apply({}, descr);
            }
            if (descr.legacy) {
                if (descr.single) {
                    me.addLegacySingle(entityType, descr);
                } else {
                    me.addLegacyHasMany(entityType, descr);
                }
            } else {
                me.addReference(entityType, referenceField, descr, referenceField.unique);
            }
        },

        // Using 0 = belongsTo
        //       1 = hasOne
        //       2 = hasMany
        addPending: function(name, entityType, assoc, type) {
            var pending = this.pending;
            if (!pending[name]) {
                pending[name] = [];
            }
            pending[name].push([entityType, assoc, type]);
        },

        addLegacyBelongsTo: function(entityType, assoc) {
            this.addLegacySingle(entityType, assoc);
        },

        addLegacyHasOne: function(entityType, assoc) {
            this.addLegacySingle(entityType, assoc);
        },

        addLegacySingle: function(entityType, assoc) {
            var foreignKey, name, referenceField;

            assoc = this.constructLegacyAssociation(entityType, assoc);
            assoc.single = true;

            name = assoc.type;

            foreignKey = assoc.foreignKey || (name.toLowerCase() + '_id');
            referenceField = entityType.getField(foreignKey);
            if (referenceField) {
                referenceField.$reference = assoc;
            }
            this.addReference(entityType, referenceField, assoc, true);
        },

        addLegacyHasMany: function (entityType, assoc) {
            var me = this,
                entities = me.entities,
                pending = me.pending,
                associationKey = assoc.associationKey,
                cls, name,
                referenceField, target, foreignKey,
                assocName;

            assoc = this.constructLegacyAssociation(entityType, assoc);

            name = assoc.type;
            target = entities[name];
            if (target && target.cls) {
                assoc.type = entityType.entityName;
                foreignKey = assoc.foreignKey || (assoc.type.toLowerCase() + '_id');
                cls = target.cls;
                referenceField = cls.getField(foreignKey);
                assoc.inverse = assoc;
                assocName = assoc.name;
                if (assocName || associationKey) {
                    assoc.inverse = {};
                    if (assocName) {
                        assoc.inverse.role = assocName;
                    }
                    if (associationKey) {
                        assoc.inverse.associationKey = associationKey;
                    }
                }

                if (referenceField) {
                    referenceField.$reference = assoc;
                }
                // We already have the entity, we can process it
                me.addReference(cls, referenceField, assoc, false);
            } else {
                // Pending, push it in the queue for when we load it
                if (!pending[name]) {
                    pending[name] = [];
                }
                pending[name].push([entityType, assoc]);
            }
        },

        constructLegacyAssociation: function(entityType, assoc) {
            if (Ext.isString(assoc)) {
                assoc = {
                    model: assoc
                };
            }
            assoc.legacy = true;
            assoc.type = this.getEntityName(assoc.model);
            if (assoc.associatedName) {
                assoc.role = assoc.associatedName;
            }
            return assoc;
        },

        afterLegacyAssociations: function(cls) {
            var pending = this.pending,
                name = cls.entityName,
                mine = pending[name],
                i, len;

            if (mine) {
                for (i = 0, len = mine.length; i < len; ++i) {
                    this.addLegacyHasMany.apply(this, mine[i]);
                }
                delete pending[name];
            }
        },

        clear: function(clearNamespace) {
            // for testing
            var me = this;

            delete me.setConfig;

            me.associations = {};
            me.associationEntityMap = {};
            me.entities = {};
            me.entityClasses = {};
            me.pending = {};
            me.assocCount = me.entityCount = 0;
            if (clearNamespace) {
                me.setNamespace(null);
            }
        },

        constructProxy: function (Model) {
            var me = this,
                data = Ext.Object.chain(Model),
                proxy = me.getProxy();

            data.schema = me;
            data.prefix = me.getUrlPrefix();

            return proxy.apply(data);
        },

        applyDecoration: function (role) {
            var me = this,
                // To decorate a role like "users" (of a User / Group matrix) we need to add
                // getter/setter methods to access the "users" collection ... to Group! All
                // other data about the "users" role and the User class belong to the given
                // "role" but the receiver class is the inverse.
                cls = role.inverse.cls,
                namer = me.getNamer(),
                getterName, setterName, proto;

            // The cls may not be loaded yet, so we need to check if it is before
            // we can decorate it.
            if (cls && !role.decorated) {
                role.decorated = true;

                proto = cls.prototype;

                if (!(getterName = role.getterName)) {
                    role.getterName = getterName = namer.getterName(role);
                }
                proto[getterName] = role.createGetter();

                // Not all associations will create setters
                if (role.createSetter) {
                    if (!(setterName = role.setterName)) {
                        role.setterName = setterName = namer.setterName(role);
                    }
                    proto[setterName] = role.createSetter();
                }
            }
        },

        decorateModel: function (association) {
            this.applyDecoration(association.left);
            this.applyDecoration(association.right);
        },

        rankEntities: function () {
            var me = this,
                entities = me.entities,
                entityNames = Ext.Object.getKeys(entities),
                length = entityNames.length,
                entityType, i;

            me.nextRank = 1;

            // We do an alpha sort to make the results more stable.
            entityNames.sort();

            for (i = 0; i < length; ++i) {
                entityType = entities[entityNames[i]].cls;

                if (!entityType.rank) {
                    me.rankEntity(entityType);
                }
            }

            //<debug>
            me.topoStack = null; // cleanup diagnostic stack
            //</debug>
        },

        rankEntity: function (entityType) {
            var associations = entityType.associations,
                associatedType, role, roleName;

            //<debug>
            var topoStack = this.topoStack || (this.topoStack = []),
                entityName = entityType.entityName;

            topoStack.push(entityName);

            if (entityType.rank === 0) {
                Ext.Error.raise(entityName + " has circular foreign-key references: " +
                                topoStack.join(" --> "));
            }

            entityType.rank = 0; // mark as "adding" so we can detect cycles
            //</debug>

            for (roleName in associations) {
                role = associations[roleName];
                // The role describes the thing to which entityType is associated, so we
                // want to know about *this* type and whether it has a foreign-key to the
                // associated type. The left side is the FK owner so if the associated
                // type is !left then entityType is left.
                //
                if (!role.left && role.association.field) {
                    // This entityType has a foreign-key to the associated type, so add
                    // that type first.
                    associatedType = role.cls;
                    if (!associatedType.rank) {
                        this.rankEntity(associatedType);
                    }
                }
            }

            entityType.rank = this.nextRank++;

            //<debug>
            topoStack.pop();
            //</debug>
        }
    } // private
});
