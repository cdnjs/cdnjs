    // @tag class
/**
 * @class Ext.Inventory
 * @private
 */
Ext.Inventory = function () {
// @define Ext.Script
// @define Ext.Inventory
// @require Ext.Function
    var me = this;

    me.names = [];
    me.paths = {};

    me.alternateToName = {};
    me.aliasToName = {};
    me.nameToAliases = {};
    me.nameToAlternates = {};
};

Ext.Inventory.prototype = {
    _array1: [0],

    prefixes: null,

    dotRe: /\./g,
    wildcardRe: /\*/g,

    addAlias: function (className, alias) {
        return this.addMapping(className, alias, this.aliasToName, this.nameToAliases);
    },

    addAlternate: function (className, alternate) {
        return this.addMapping(className, alternate, this.alternateToName, this.nameToAlternates);
    },

    addMapping: function (className, alternate, toName, nameTo) {
        var name = className.$className || className,
            mappings = name,
            array = this._array1,
            a, aliases, cls, i, length,
            nameMapping;

        if (Ext.isString(name)) {
            mappings = {};
            mappings[name] = alternate;
        }

        for (cls in mappings) {
            aliases = mappings[cls];
            if (Ext.isString(aliases)) {
                array[0] = aliases;
                aliases = array;
            }

            length = aliases.length;
            nameMapping = nameTo[cls] || (nameTo[cls] = []);
            for (i = 0; i < length; ++i) {
                if (!(a = aliases[i])) {
                    continue;
                }

                if (toName[a] !== cls) {
                    //<debug>
                    if (toName[a]) {
                        Ext.log.warn("Overriding existing mapping: '" + a + "' From '" +
                            toName[a] + "' to '" + cls + "'. Is this intentional?");
                    }
                    //</debug>

                    toName[a] = cls;
                    nameMapping.push(a);
                }
            }
        }
    },

    /**
     * Get the aliases of a class by the class name
     *
     * @param {String} name
     * @return {Array} aliases
     */
    getAliasesByName: function (name) {
        return this.nameToAliases[name] || null;
    },

    getAlternatesByName: function (name) {
        return this.nameToAliases[name] || null;
    },

    /**
     * Get the name of a class by its alias.
     *
     * @param {String} alias
     * @return {String} className
     */
    getNameByAlias: function(alias) {
        return this.aliasToName[alias] || '';
    },

    /**
     * Get the name of a class by its alternate name.
     *
     * @param {String} alternate
     * @return {String} className
     */
    getNameByAlternate: function (alternate) {
        return this.alternateToName[alternate] || '';
    },

    /**
     * Converts a string expression to an array of matching class names. An expression can
     * either refers to class aliases or class names. Expressions support wildcards:
     *
     *      // returns ['Ext.window.Window']
     *     var window = Ext.ClassManager.getNamesByExpression('widget.window');
     *
     *     // returns ['widget.panel', 'widget.window', ...]
     *     var allWidgets = Ext.ClassManager.getNamesByExpression('widget.*');
     *
     *     // returns ['Ext.data.Store', 'Ext.data.ArrayProxy', ...]
     *     var allData = Ext.ClassManager.getNamesByExpression('Ext.data.*');
     *
     * @param {String/String[]} expression
     * @param {Object} [exclude=null] An object keyed by class name containing classes to
     * exclude from the returned classes. This must be provided if `accumulate` is set to
     * `true`.
     * @param {Boolean} [accumulate=false] Pass `true` to add matching classes to the
     * specified `exclude` object.
     * @return {String[]} An array of class names.
     */
    getNamesByExpression: function (expression, exclude, accumulate) {
        var me = this,
            aliasToName = me.aliasToName,
            alternateToName = me.alternateToName,
            nameToAliases = me.nameToAliases,
            nameToAlternates = me.nameToAlternates,
            map = accumulate ? exclude : {},
            names = [],
            expressions = Ext.isString(expression) ? [expression] : expression,
            length = expressions.length,
            wildcardRe = me.wildcardRe,
            expr, i, list, match, n, name, regex;

        for (i = 0; i < length; ++i) {
            if ((expr = expressions[i]).indexOf('*') < 0) {
                // No wildcard
                if (!(name = aliasToName[expr])) {
                    if (!(name = alternateToName[expr])) {
                        name = expr;
                    }
                }

                if (!(name in map) && !(exclude && (name in exclude))) {
                    map[name] = 1;
                    names.push(name);
                }
            } else {
                regex = new RegExp('^' + expr.replace(wildcardRe, '(.*?)') + '$');

                for (name in nameToAliases) {
                    if (!(name in map) && !(exclude && (name in exclude))) {
                        if (!(match = regex.test(name))) {
                            n = (list = nameToAliases[name]).length;
                            while (!match && n-- > 0) {
                                match = regex.test(list[n]);
                            }

                            list = nameToAlternates[name];
                            if (list && !match) {
                                n = list.length;
                                while (!match && n-- > 0) {
                                    match = regex.test(list[n]);
                                }
                            }
                        }

                        if (match) {
                            map[name] = 1;
                            names.push(name);
                        }
                    }
                }
            }
        }

        return names;
    },

    getPath: function (className) {
        var me = this,
            paths = me.paths,
            ret = '',
            prefix;

        if (className in paths) {
            ret = paths[className];
        } else {
            prefix = me.getPrefix(className);
            if (prefix) {
                className = className.substring(prefix.length + 1);
                ret = paths[prefix];
                if (ret) {
                    ret += '/';
                }
            }

            ret += className.replace(me.dotRe, '/') + '.js';
        }

        return ret;
    },

    getPrefix: function (className) {
        if (className in this.paths) {
            return className;
        }

        var prefixes = this.getPrefixes(),
            i = prefixes.length,
            length, prefix;

        // Walk the prefixes backwards so we consider the longest ones first.
        while (i-- > 0) {
            length = (prefix = prefixes[i]).length;
            if (length < className.length && className.charAt(length) === '.'
                                          && prefix === className.substring(0, length)) {
                return prefix;
            }
        }

        return '';
    },

    getPrefixes: function () {
        var me = this,
            prefixes = me.prefixes;

        if (!prefixes) {
            me.prefixes = prefixes = me.names.slice(0);
            prefixes.sort(me._compareNames);
        }

        return prefixes;
    },

    removeName: function (name) {
        var me = this,
            aliasToName = me.aliasToName,
            alternateToName = me.alternateToName,
            nameToAliases = me.nameToAliases,
            nameToAlternates = me.nameToAlternates,
            aliases = nameToAliases[name],
            alternates = nameToAlternates[name],
            i, a;

        delete nameToAliases[name];
        delete nameToAlternates[name];

        if (aliases) {
            for (i = aliases.length; i--;) {
                // Aliases can be reassigned so if this class is the current mapping of
                // the alias, remove it. Since there is no chain to restore what was
                // removed this is not perfect.
                if (name === (a = aliases[i])) {
                    delete aliasToName[a];
                }
            }
        }

        if (alternates) {
            for (i = alternates.length; i--; ) {
                // Like aliases, alternate class names can also be remapped.
                if (name === (a = alternates[i])) {
                    delete alternateToName[a];
                }
            }
        }
    },

    resolveName: function (name) {
        var me = this,
            trueName;

        // If the name has a registered alias, it is a true className (not an alternate)
        // so we can stop now.
        if (!(name in me.nameToAliases)) {
            // The name is not a known class name, so check to see if it is a known alias:
            if (!(trueName = me.aliasToName[name])) {
                // The name does not correspond to a known alias, so check if it is a known
                // alternateClassName:
                trueName = me.alternateToName[name];
            }
        }

        return trueName || name;
    },

    /**
     * This method returns a selector object that produces a selection of classes and
     * delivers them to the desired `receiver`.
     * 
     * The returned selector object has the same methods as the given `receiver` object
     * but these methods on the selector accept a first argument that expects a pattern
     * or array of patterns. The actual method on the `receiver` will be called with an
     * array of classes that match these patterns but with any patterns passed to an
     * `exclude` call removed.
     * 
     * For example:
     * 
     *      var sel = inventory.select({
     *              require: function (classes) {
     *                  console.log('Classes: ' + classes.join(','));
     *              }
     *          });
     * 
     *      sel.exclude('Ext.chart.*').exclude('Ext.draw.*').require('*');
     *      
     *      // Logs all classes except those in the Ext.chart and Ext.draw namespaces.
     * 
     * @param {Object} receiver
     * @param {Object} [scope] Optional scope to use when calling `receiver` methods.
     * @return {Object} An object with the same methods as `receiver` plus `exclude`.
     */
    select: function (receiver, scope) {
        var me = this,
            excludes = {},
            ret = {
                excludes: excludes,

                exclude: function () {
                    me.getNamesByExpression(arguments, excludes, true);
                    return this;
                }
            },
            name;

        for (name in receiver) {
            ret[name] = me.selectMethod(excludes, receiver[name], scope || receiver);
        }

        return ret;
    },

    selectMethod: function (excludes, fn, scope) {
        var me = this;

        return function (include) {
            var args = Ext.Array.slice(arguments, 1);
            
            args.unshift(me.getNamesByExpression(include, excludes));

            return fn.apply(scope, args);
        };
    },

    /**
     * Sets the path of a namespace.
     * For Example:
     *
     *      inventory.setPath('Ext', '.');
     *      inventory.setPath({
     *          Ext: '.'
     *      });
     *
     * @param {String/Object} name The name of a single mapping or an object of mappings.
     * @param {String} [path] If `name` is a String, then this is the path for that name.
     * Otherwise this parameter is ignored.
     * @return {Ext.Inventory} this
     * @method
     */
    setPath: Ext.Function.flexSetter(function (name, path) {
        var me = this;

        me.paths[name] = path;
        me.names.push(name);

        me.prefixes = null;

        return me;
    }),

    _compareNames: function (lhs, rhs) {
        var cmp = lhs.length - rhs.length;
        if (!cmp) {
            cmp = (lhs < rhs) ? -1 : 1;
        }
        return cmp;
    }
};
