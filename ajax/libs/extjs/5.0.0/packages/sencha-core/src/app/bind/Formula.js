/**
 * This class manages a formula defined for an `Ext.app.ViewModel`.
 *
 * ## Formula Basics
 *
 * Formulas in a `ViewModel` can be defined as simply as just a function:
 *
 *      formulas: {
 *          xy: function (get) { return get('x') * get('y'); }
 *      }
 *
 * When you need to be more explicit, "xy" can become an object. The following means the
 * same thing as above:
 *
 *      formulas: {
 *          xy: {
 *              get: function (get) { return get('x') * get('y'); }
 *          }
 *      }
 *
 * ### Data Dependencies
 *
 * One of the important aspects of a `ViewModel` is notification of change. In order to
 * manage this, a `ViewModel` *must* know the dependencies between data. In the above case
 * this is accomplished by **parsing the text of the function**. While this is convenient
 * and reduces the maintenance/risk that would come from explicitly listing dependencies
 * separately, there are some rules to be aware of:
 *
 *   * All dependencies are resolved by matching the binding statements in the getter function.
 *   * If you need to use these values in other ways, cache them as a `var` (following
 *     the first rule to capture the value) and use that `var`.
 *
 * In the above formulas, the "xy" formula depends on "x" and "y" in the `ViewModel`. As
 * these values change, the formula is called to produce the correct value for "xy". This
 * in turn can be used by other formulas. For example:
 *
 *      formulas: {
 *          xy: function (get) {  // "get" is arbitrary but a good convention
 *              return get('x') * get('y');
 *          },
 *
 *          xyz: function (get) {
 *              return get('xy') * get('z');
 *          }
 *      }
 *
 * In the above, "xyz" depends on "xy" and "z" values in the `ViewModel`.
 *
 * ### The Getter Method
 *
 * The argument passed to the formula is a function that allows you to retrieve
 * the matched bind statements.
 *
 *      formulas: {
 *          foo: function (get) {
 *              return get('theUser.address.city');
 *          }
 *      }
 *
 * In the above, the dependency is resolved to `theUser.address.city`. The formula will not
 * be triggered until the value for `city` is present.
 *
 * ### Capturing Values
 *
 * If values need to be used repeatedly, you can use a `var` as long as the Rules are not
 * broken.
 *
 *      formulas: {
 *          x2y2: function (get) {
 *              // These are still "visible" as "get('x')" and "get('y')" so this is OK:
 *              var x = get('x'),
 *                  y = get('y');
 *
 *              return x * x * y * y;
 *          }
 *      }
 *
 * ## Explicit Binding
 *
 * While function parsing is convenient, there are times it is not the best solution. In
 * these cases, an explicit `bind` can be given. To revisit the previous example with an
 * explicit binding:
 *
 *      formulas: {
 *          zip: {
 *              bind: '{foo.bar.zip}',
 *
 *              get: function (zip) {
 *                  // NOTE: the only thing we get is what our bind produces.
 *                  return zip * 2;
 *              }
 *          }
 *      }
 *
 * In this case we have given the formula an explicit `bind` value so it will no longer
 * parse the `get` function. Instead, it will call `{@link Ext.app.ViewModel#bind}` with
 * the value of the `bind` property and pass the produced value to `get` whenever it
 * changes.
 *
 * ## Settable Formulas
 *
 * When a formula is "reversible" it can be given a `set` method to allow it to participate
 * in two-way binding. For example:
 *
 *      formulas: {
 *             fullName: {
 *                 get: function (get) {
 *                     var ret = get('firstName') || '';
 *
 *                     if (get('lastName')) {
 *                         ret += ' ' +  get('lastName');
 *                     }
 *
 *                     return ret;
 *                 },
 *
 *                 set: function (value) {
 *                     var space = value.indexOf(' '),
 *                         split = (space < 0) ? value.length : space;
 *
 *                     this.set({
 *                         firstName: value.substring(0, split),
 *                         lastName: value.substring(split + 1)
 *                     });
 *                 }
 *             }
 *         }
 *
 * When the `set` method is called the `this` reference is the `Ext.app.ViewModel` so it
 * just calls its `{@link Ext.app.ViewModel#method-set set method}`.
 *
 * ## Single Run Formulas
 *
 * If a formula only needs to produce an initial value, it can be marked as `single`.
 *
 *      formulas: {
 *          xy: {
 *              single: true,
 *
 *              get: function (get) {
 *                  return get('x') * get('y');
 *              }
 *          }
 *      }
 *
 * This formulas `get` method will be called with `x` and `y` once and then its binding
 * to these properties will be destroyed. This means the `get` method (and hence the value
 * of `xy`) will only be executed/calculated once.
 */
Ext.define('Ext.app.bind.Formula', {
    extend: 'Ext.util.Schedulable',

    requires: [
        'Ext.util.LruCache'
    ],

    statics: {
        getFormulaParser: function(name) {
            var cache = this.formulaCache,
                parser, s;

            if (!cache) {
                cache = this.formulaCache = new Ext.util.LruCache({
                    maxSize: 20
                });
            }

            parser = cache.get(name);
            if (!parser) {
                // Unescaped: [^\.a-z0-9_]NAMEHERE\((['"])(.*?)\1\)
                s = '[^\\.a-z0-9_]' + name + '\\(([\'"])(.*?)\\1\\)';
                parser = new RegExp(s, 'gi');
                cache.add(name, parser);
            }
            return parser;
        }
    },

    isFormula: true,

    calculation: null,

    explicit: false,

    /**
     * @cfg {Object} [bind]
     * An explicit bind request to produce data to provide the `get` function. If this is
     * specified, the result of this bind is the first argument to `get`. If not given,
     * then `get` receives a getter function that can retrieve bind expressions. For details on what can
     * be specified for this property see `{@link Ext.app.ViewModel#bind}`.
     * @since 5.0.0
     */

    /**
     * @cfg {Function} get
     * The function to call to calculate the formula's value. The `get` method executes
     * with a `this` pointer of the `ViewModel` and receives a getter function or the result of a configured `bind`.
     * @since 5.0.0
     */

    /**
     * @cfg {Function} [set]
     * If provided this method allows a formula to be set. This method is typically called
     * when `{@link Ext.app.bind.Binding#setValue}` is called. The `set` method executes
     * with a `this` pointer of the `ViewModel`. Whatever values need to be updated can
     * be set by calling `{@link Ext.app.ViewModel#set}`.
     * @since 5.0.0
     */
    set: null,

    /**
     * @cfg {Boolean} [single=false]
     * This option instructs the binding to call its `destroy` method immediately after
     * delivering the initial value.
     * @since 5.0.0
     */
    single: false,

    argumentNamesRe: /^function\s*\(\s*([^,\)\s]+)/,

    constructor: function (stub, formula) {
        var me = this,
            owner = stub.owner,
            bindTo, expressions, getter, options;

        me.owner = owner;
        me.stub = stub;

        me.callParent();

        if (formula instanceof Function) {
            me.get = getter = formula;
        } else {
            me.get = getter = formula.get;
            me.set = formula.set;
            expressions = formula.bind;

            if (formula.single) {
                me.single = formula.single;
            }

            if (expressions) {
                bindTo = expressions.bindTo;

                if (bindTo) {
                    options = Ext.apply({}, expressions);
                    delete options.bindTo;
                    expressions = bindTo;
                }
            }
        }

        //<debug>
        if (!getter) {
            Ext.Error.raise('Must specify a getter method for a formula');
        }
        //</debug>

        if (expressions) {
            me.explicit = true;
        } else {
            expressions = getter.$expressions || me.parseFormula(getter);
        }

        me.binding = owner.bind(expressions, me.onChange, me, options);
    },

    destroy: function () {
        var me = this,
            binding = me.binding,
            stub = me.stub;

        if (binding) {
            binding.destroy();
            me.binding = null;
        }

        if (stub) {
            stub.formula = null;
        }

        me.callParent();

        // Save for last because this is used to remove us from the Scheduler
        me.getterFn = me.owner = null;
    },

    getFullName: function () {
        return this.fullName ||
              (this.fullName = this.stub.getFullName() + '=' + this.callParent() + ')');
    },

    getRawValue: function () {
        return this.calculation;
    },

    onChange: function () {
        if (!this.scheduled) {
            this.schedule();
        }
    },

    parseFormula: function (formula) {
        var str = formula.toString(),
            expressions = {
                $literal: true
            },
            match, getterProp, formulaRe, expr;

        match = this.argumentNamesRe.exec(str);
        getterProp = match ? match[1] : 'get';
        formulaRe = Ext.app.bind.Formula.getFormulaParser(getterProp);

        while ((match = formulaRe.exec(str))) {
            expr = match[2];
            expressions[expr] = expr;
        }

        expressions.$literal = true;

        // We store the parse results on the function object because we might reuse the
        // formula function (typically when a ViewModel class is created a 2nd+ time).
        formula.$expressions = expressions;

        return expressions;
    },

    react: function () {
        var me = this,
            owner = me.owner,
            data = me.binding.lastValue,
            getterFn = me.getterFn,
            arg;

        if (me.explicit) {
            arg = data;
        } else {
            arg = owner.getFormulaFn(data);
        }
        me.settingValue = true;
        me.stub.set(me.calculation = me.get.call(owner, arg));
        me.settingValue = false;

        if (me.single) {
            me.destroy();
        }
    },

    privates: {
        getScheduler: function () {
            var owner = this.owner;
            return owner && owner.getScheduler();
        },
        
        sort: function () {
            var me = this,
                binding = me.binding;

            // Our binding may be single:true
            if (!binding.destroyed) {
                me.scheduler.sortItem(binding);
            }

            // Schedulable#sort === emptyFn
            //me.callParent();
        }
    }
});
