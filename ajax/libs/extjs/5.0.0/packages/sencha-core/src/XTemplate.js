/**
 * A template class that supports advanced functionality like:
 *
 * - Autofilling arrays using templates and sub-templates
 * - Conditional processing with basic comparison operators
 * - Basic math function support
 * - Execute arbitrary inline code with special built-in template variables
 * - Custom member functions
 * - Many special tags and built-in operators that aren't defined as part of the API, but are supported in the templates that can be created
 *
 * XTemplate provides the templating mechanism built into {@link Ext.view.View}.
 *
 * The {@link Ext.Template} describes the acceptable parameters to pass to the constructor. The following examples
 * demonstrate all of the supported features.
 *
 * # Sample Data
 *
 * This is the data object used for reference in each code example:
 *
 *     var data = {
 *         name: 'Don Griffin',
 *         title: 'Senior Technomage',
 *         company: 'Sencha Inc.',
 *         drinks: ['Coffee', 'Water', 'More Coffee'],
 *         kids: [
 *             { name: 'Aubrey',  age: 17 },
 *             { name: 'Joshua',  age: 13 },
 *             { name: 'Cale',    age: 10 },
 *             { name: 'Nikol',   age: 5 },
 *             { name: 'Solomon', age: 0 }
 *         ]
 *     };
 *
 * # Auto filling of arrays
 *
 * The **tpl** tag and the **for** operator are used to process the provided data object:
 *
 * - If the value specified in for is an array, it will auto-fill, repeating the template block inside the tpl
 *   tag for each item in the array.
 * - If for="." is specified, the data object provided is examined.
 * - If between="..." is specified, the provided value will be inserted between the items.
 *   This is also supported in the "foreach" looping template.
 * - While processing an array, the special variable {#} will provide the current array index + 1 (starts at 1, not 0).
 *
 * Examples:
 *
 *     <tpl for=".">...</tpl>       // loop through array at root node
 *     <tpl for="foo">...</tpl>     // loop through array at foo node
 *     <tpl for="foo.bar">...</tpl> // loop through array at foo.bar node
 *     <tpl for="." between=",">...</tpl> // loop through array at root node and insert ',' between each item
 *
 * Using the sample data above:
 *
 *     var tpl = new Ext.XTemplate(
 *         '<p>Kids: ',
 *         '<tpl for=".">',       // process the data.kids node
 *             '<p>{#}. {name}</p>',  // use current array index to autonumber
 *         '</tpl></p>'
 *     );
 *     tpl.overwrite(panel.body, data.kids); // pass the kids property of the data object
 *
 * An example illustrating how the **for** property can be leveraged to access specified members of the provided data
 * object to populate the template:
 *
 *     var tpl = new Ext.XTemplate(
 *         '<p>Name: {name}</p>',
 *         '<p>Title: {title}</p>',
 *         '<p>Company: {company}</p>',
 *         '<p>Kids: ',
 *         '<tpl for="kids">',     // interrogate the kids property within the data
 *             '<p>{name}</p>',
 *         '</tpl></p>'
 *     );
 *     tpl.overwrite(panel.body, data);  // pass the root node of the data object
 *
 * Flat arrays that contain values (and not objects) can be auto-rendered using the special **`{.}`** variable inside a
 * loop. This variable will represent the value of the array at the current index:
 *
 *     var tpl = new Ext.XTemplate(
 *         '<p>{name}\'s favorite beverages:</p>',
 *         '<tpl for="drinks">',
 *             '<div> - {.}</div>',
 *         '</tpl>'
 *     );
 *     tpl.overwrite(panel.body, data);
 *
 * When processing a sub-template, for example while looping through a child array, you can access the parent object's
 * members via the **parent** object:
 *
 *     var tpl = new Ext.XTemplate(
 *         '<p>Name: {name}</p>',
 *         '<p>Kids: ',
 *         '<tpl for="kids">',
 *             '<tpl if="age &gt; 1">',
 *                 '<p>{name}</p>',
 *                 '<p>Dad: {parent.name}</p>',
 *             '</tpl>',
 *         '</tpl></p>'
 *     );
 *     tpl.overwrite(panel.body, data);
 *     
 * The **foreach** operator is used to loop over an object's properties.  The following
 * example demonstrates looping over the main data object's properties:
 * 
 *     var tpl = new Ext.XTemplate(
 *         '<dl>',
 *             '<tpl foreach=".">',
 *                 '<dt>{$}</dt>', // the special **`{$}`** variable contains the property name
 *                 '<dd>{.}</dd>', // within the loop, the **`{.}`** variable is set to the property value
 *             '</tpl>',
 *         '</dl>'
 *     );
 *     tpl.overwrite(panel.body, data);
 *
 * # Conditional processing with basic comparison operators
 *
 * The **tpl** tag and the **if** operator are used to provide conditional checks for deciding whether or not to render
 * specific parts of the template.
 *
 * Using the sample data above:
 *
 *     var tpl = new Ext.XTemplate(
 *         '<p>Name: {name}</p>',
 *         '<p>Kids: ',
 *         '<tpl for="kids">',
 *             '<tpl if="age &gt; 1">',
 *                 '<p>{name}</p>',
 *             '</tpl>',
 *         '</tpl></p>'
 *     );
 *     tpl.overwrite(panel.body, data);
 *
 * More advanced conditionals are also supported:
 *
 *     var tpl = new Ext.XTemplate(
 *         '<p>Name: {name}</p>',
 *         '<p>Kids: ',
 *         '<tpl for="kids">',
 *             '<p>{name} is a ',
 *             '<tpl if="age &gt;= 13">',
 *                 '<p>teenager</p>',
 *             '<tpl elseif="age &gt;= 2">',
 *                 '<p>kid</p>',
 *             '<tpl else>',
 *                 '<p>baby</p>',
 *             '</tpl>',
 *         '</tpl></p>'
 *     );
 *
 *     var tpl = new Ext.XTemplate(
 *         '<p>Name: {name}</p>',
 *         '<p>Kids: ',
 *         '<tpl for="kids">',
 *             '<p>{name} is a ',
 *             '<tpl switch="name">',
 *                 '<tpl case="Aubrey" case="Nikol">',
 *                     '<p>girl</p>',
 *                 '<tpl default>',
 *                     '<p>boy</p>',
 *             '</tpl>',
 *         '</tpl></p>'
 *     );
 *
 * A `break` is implied between each case and default, however, multiple cases can be listed
 * in a single &lt;tpl&gt; tag.
 *
 * # Using double quotes
 *
 * Examples:
 *
 *     var tpl = new Ext.XTemplate(
 *         "<tpl if='age &gt; 1 && age &lt; 10'>Child</tpl>",
 *         "<tpl if='age &gt;= 10 && age &lt; 18'>Teenager</tpl>",
 *         "<tpl if='this.isGirl(name)'>...</tpl>",
 *         '<tpl if="id == \'download\'">...</tpl>',
 *         "<tpl if='needsIcon'><img src='{icon}' class='{iconCls}'/></tpl>",
 *         "<tpl if='name == \"Don\"'>Hello</tpl>"
 *     );
 *
 * # Basic math support
 *
 * The following basic math operators may be applied directly on numeric data values:
 *
 *     + - * /
 *
 * For example:
 *
 *     var tpl = new Ext.XTemplate(
 *         '<p>Name: {name}</p>',
 *         '<p>Kids: ',
 *         '<tpl for="kids">',
 *             '<tpl if="age &gt; 1">',  // <-- Note that the > is encoded
 *                 '<p>{#}: {name}</p>',  // <-- Auto-number each item
 *                 '<p>In 5 Years: {age+5}</p>',  // <-- Basic math
 *                 '<p>Dad: {parent.name}</p>',
 *             '</tpl>',
 *         '</tpl></p>'
 *     );
 *     tpl.overwrite(panel.body, data);
 *
 * # Execute arbitrary inline code with special built-in template variables
 *
 * Anything between `{[ ... ]}` is considered code to be executed in the scope of the template.
 * The expression is evaluated and the result is included in the generated result. There are
 * some special variables available in that code:
 *
 * - **out**: The output array into which the template is being appended (using `push` to later
 *   `join`).
 * - **values**: The values in the current scope. If you are using scope changing sub-templates,
 *   you can change what values is.
 * - **parent**: The scope (values) of the ancestor template.
 * - **xindex**: If you are in a "for" or "foreach" looping template, the index of the loop you are in (1-based).
 * - **xcount**: If you are in a "for" looping template, the total length of the array you are looping.
 * - **xkey**: If you are in a "foreach" looping template, the key of the current property
 * being examined.
 *
 * This example demonstrates basic row striping using an inline code block and the xindex variable:
 *
 *     var tpl = new Ext.XTemplate(
 *         '<p>Name: {name}</p>',
 *         '<p>Company: {[values.company.toUpperCase() + ", " + values.title]}</p>',
 *         '<p>Kids: ',
 *         '<tpl for="kids">',
 *             '<div class="{[xindex % 2 === 0 ? "even" : "odd"]}">',
 *             '{name}',
 *             '</div>',
 *         '</tpl></p>'
 *      );
 *
 * Any code contained in "verbatim" blocks (using "{% ... %}") will be inserted directly in
 * the generated code for the template. These blocks are not included in the output. This
 * can be used for simple things like break/continue in a loop, or control structures or
 * method calls (when they don't produce output). The `this` references the template instance.
 *
 *     var tpl = new Ext.XTemplate(
 *         '<p>Name: {name}</p>',
 *         '<p>Company: {[values.company.toUpperCase() + ", " + values.title]}</p>',
 *         '<p>Kids: ',
 *         '<tpl for="kids">',
 *             '{% if (xindex % 2 === 0) continue; %}',
 *             '{name}',
 *             '{% if (xindex > 100) break; %}',
 *             '</div>',
 *         '</tpl></p>'
 *      );
 *
 * # Template member functions
 *
 * One or more member functions can be specified in a configuration object passed into the XTemplate constructor for
 * more complex processing:
 *
 *     var tpl = new Ext.XTemplate(
 *         '<p>Name: {name}</p>',
 *         '<p>Kids: ',
 *         '<tpl for="kids">',
 *             '<tpl if="this.isGirl(name)">',
 *                 '<p>Girl: {name} - {age}</p>',
 *             '<tpl else>',
 *                 '<p>Boy: {name} - {age}</p>',
 *             '</tpl>',
 *             '<tpl if="this.isBaby(age)">',
 *                 '<p>{name} is a baby!</p>',
 *             '</tpl>',
 *         '</tpl></p>',
 *         {
 *             // XTemplate configuration:
 *             disableFormats: true,
 *             // member functions:
 *             isGirl: function(name){
 *                return name == 'Aubrey' || name == 'Nikol';
 *             },
 *             isBaby: function(age){
 *                return age < 1;
 *             }
 *         }
 *     );
 *     tpl.overwrite(panel.body, data);
 */
Ext.define('Ext.XTemplate', {
    extend: 'Ext.Template',

    requires: [
        'Ext.util.XTemplateCompiler'
    ],

    /**
     * @private
     */
    emptyObj: {},

    /**
     * @cfg {Boolean} compiled
     * Only applies to {@link Ext.Template}, XTemplates are compiled automatically on the
     * first call to {@link #apply} or {@link #applyOut}.
     * @hide
     */

    /**
     * @cfg {String/Array} definitions
     * Optional. A statement, or array of statements which set up `var`s which may then
     * be accessed within the scope of the generated function.
     */

    /**
     * @property {Function} fn
     * The function that applies this template. This is created on first use of the
     * template (calls to `apply` or `applyOut`).
     * @private
     * @readonly
     */
    fn: null,

    /**
     * @cfg {Boolean} [strict=false]
     * Expressions in templates that traverse "dot paths" and fail (due to `null` at some
     * stage) have always been expanded as empty strings. This is convenient in most cases
     * but doing so can also mask errors in the template. Setting this to `true` changes
     * this default so that any expression errors will be thrown as exceptions.
     */
    strict: false,

    apply: function(values, parent) {
        return this.applyOut(values, [], parent).join('');
    },

    applyOut: function(values, out, parent) {
        var me = this,
            compiler;

        if (!me.fn) {
            compiler = new Ext.util.XTemplateCompiler({
                useFormat: me.disableFormats !== true,
                definitions: me.definitions,
                strict: me.strict
            });

            me.fn = compiler.compile(me.html);
        }

        if (me.strict) {
            me.fn(out, values, parent || me.emptyObj, 1, 1);
        } else {
            try {
                me.fn(out, values, parent || me.emptyObj, 1, 1);
            } catch (e) {
                //<debug>
                Ext.log.warn('XTemplate evaluation exception: ' + e.message);
                //</debug>
            }
        }

        return out;
    },

    /**
     * Does nothing. XTemplates are compiled automatically, so this function simply returns this.
     * @return {Ext.XTemplate} this
     */
    compile: function() {
        return this;
    },

    statics: {
        /**
         * Gets an `XTemplate` from an object (an instance of an {@link Ext#define}'d class).
         * Many times, templates are configured high in the class hierarchy and are to be
         * shared by all classes that derive from that base. To further complicate matters,
         * these templates are seldom actual instances but are rather configurations. For
         * example:
         *
         *      Ext.define('MyApp.Class', {
         *          extraCls: 'extra-class',
         *
         *          someTpl: [
         *              '<div class="{%this.emitClass(out)%}"></div>',
         *          {
         *              // Member fn - outputs the owing class's extra CSS class
         *              emitClass: function(out) {
         *                  out.push(this.owner.extraCls);
         *              }
         *          }]
         *      });
         *
         * The goal being to share that template definition with all instances and even
         * instances of derived classes, until `someTpl` is overridden. This method will
         * "upgrade" these configurations to be real `XTemplate` instances *in place* (to
         * avoid creating one instance per object).
         *
         * The resulting XTemplate will have an `owner` reference injected which refers back
         * to the owning object whether that is an object which has an *own instance*, or a
         * class prototype. Through this link, XTemplate member functions will be able to access
         * prototype properties of its owning class.
         *
         * @param {Object} instance The object from which to get the `XTemplate` (must be
         * an instance of an {@link Ext#define}'d class).
         * @param {String} name The name of the property by which to get the `XTemplate`.
         * @return {Ext.XTemplate} The `XTemplate` instance or null if not found.
         * @protected
         * @static
         */
        getTpl: function (instance, name) {
            var tpl = instance[name], // go for it! 99% of the time we will get it!
                owner;

            if (tpl && !tpl.isTemplate) { // tpl is just a configuration (not an instance)
                // create the template instance from the configuration:
                tpl = Ext.ClassManager.dynInstantiate('Ext.XTemplate', tpl);

                // and replace the reference with the new instance:
                if (instance.hasOwnProperty(name)) { // the tpl is on the instance
                    owner = instance;
                } else { // must be somewhere in the prototype chain
                    for (owner = instance.self.prototype; owner && !owner.hasOwnProperty(name); owner = owner.superclass) {
                    }
                }
                owner[name] = tpl;
                tpl.owner = owner;
            }
            // else !tpl (no such tpl) or the tpl is an instance already... either way, tpl
            // is ready to return

            return tpl || null;
        }
    }
});
