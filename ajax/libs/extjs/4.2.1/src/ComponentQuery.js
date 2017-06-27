/*
This file is part of Ext JS 4.2

Copyright (c) 2011-2013 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as
published by the Free Software Foundation and appearing in the file LICENSE included in the
packaging of this file.

Please review the following information to ensure the GNU General Public License version 3.0
requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department
at http://www.sencha.com/contact.

Build date: 2013-05-16 14:36:50 (f9be68accb407158ba2b1be2c226a6ce1f649314)
*/
/**
 * Provides searching of Components within Ext.ComponentManager (globally) or a specific
 * Ext.container.Container on the document with a similar syntax to a CSS selector.
 * Returns Array of matching Components, or empty Array.
 *
 * ## Basic Component lookup
 *
 * Components can be retrieved by using their {@link Ext.Component xtype}:
 *
 * - `component`
 * - `gridpanel`
 *
 * Matching by `xtype` matches inherited types, so in the following code, the previous field
 * *of any type which inherits from `TextField`* will be found:
 *
 *     prevField = myField.previousNode('textfield');
 *
 * To match only the exact type, pass the "shallow" flag by adding `(true)` to xtype
 * (See AbstractComponent's {@link Ext.AbstractComponent#isXType isXType} method):
 *
 *     prevTextField = myField.previousNode('textfield(true)');
 *
 * You can search Components by their `id` or `itemId` property, prefixed with a #:
 *
 *     #myContainer
 *
 * Component `xtype` and `id` or `itemId` can be used together to avoid possible
 * id collisions between Components of different types:
 *
 *     panel#myPanel
 *
 * ## Traversing Component tree
 *
 * Components can be found by their relation to other Components. There are several
 * relationship operators, mostly taken from CSS selectors:
 *
 * - **`E F`** All descendant Components of E that match F
 * - **`E > F`** All direct children Components of E that match F
 * - **`E ^ F`** All parent Components of E that match F
 *
 * Expressions between relationship operators are matched left to right, i.e. leftmost
 * selector is applied first, then if one or more matches are found, relationship operator
 * itself is applied, then next selector expression, etc. It is possible to combine
 * relationship operators in complex selectors:
 *
 *     window[title="Input form"] textfield[name=login] ^ form > button[action=submit]
 *
 * That selector can be read this way: Find a window with title "Input form", in that
 * window find a TextField with name "login" at any depth (including subpanels and/or
 * FieldSets), then find an `Ext.form.Panel` that is a parent of the TextField, and in
 * that form find a direct child that is a button with custom property `action` set to
 * value "submit".
 *
 * Whitespace on both sides of `^` and `>` operators is non-significant, i.e. can be
 * omitted, but usually is used for clarity.
 *
 * ## Searching by Component attributes
 *
 * Components can be searched by their object property values (attributes). To do that,
 * use attribute matching expression in square brackets:
 *
 * - `component[autoScroll]` - matches any Component that has `autoScroll` property with
 * any truthy (non-empty, not `false`) value.
 * - `panel[title="Test"]` - matches any Component that has `title` property set to
 * "Test". Note that if the value does not contain spaces, the quotes are optional.
 *
 * Attributes can use any of the operators in {@link Ext.dom.Query DomQuery}'s
 * {@link Ext.dom.Query#operators operators} to compare values.
 *
 * Prefixing the attribute name with an at sign `@` means that the property must be
 * the object's `ownProperty`, not a property from the prototype chain.
 *
 * Specifications like `[propName]` check that the property is a truthy value. To check
 * that the object has an `ownProperty` of a certain name, regardless of the value use
 * the form `[?propName]`.
 *
 * The specified value is coerced to match the type of the property found in the
 * candidate Component using {@link Ext#coerce}.
 *
 * If you need to find Components by their `itemId` property, use `#id` form; it will
 * do the same but is easier to read.
 *
 * ## Attribute matching operators
 *
 * The '=' operator will return the results that **exactly** match the
 * specified object property (attribute):
 *
 *     Ext.ComponentQuery.query('panel[cls=my-cls]');
 *
 * Will match the following Component:
 *
 *     Ext.create('Ext.window.Window', {
 *         cls: 'my-cls'
 *     });
 *
 * But will not match the following Component, because 'my-cls' is one value
 * among others:
 *
 *      Ext.create('Ext.panel.Panel', {
 *          cls: 'foo-cls my-cls bar-cls'
 *      });
 *
 * You can use the '~=' operator instead, it will return Components with
 * the property that **exactly** matches one of the whitespace-separated
 * values. This is also true for properties that only have *one* value:
 *
 *     Ext.ComponentQuery.query('panel[cls~=my-cls]');
 *
 * Will match both Components:
 *
 *     Ext.create('Ext.panel.Panel', {
 *         cls: 'foo-cls my-cls bar-cls'
 *     });
 *     
 *     Ext.create('Ext.window.Window', {
 *         cls: 'my-cls'
 *     });
 *
 * Generally, '=' operator is more suited for object properties other than
 * CSS classes, while '~=' operator will work best with properties that
 * hold lists of whitespace-separated CSS classes.
 *
 * The '^=' operator will return Components with specified attribute that
 * start with the passed value:
 *
 *     Ext.ComponentQuery.query('panel[title^=Sales]');
 *
 * Will match the following Component:
 *
 *     Ext.create('Ext.panel.Panel', {
 *         title: 'Sales estimate for Q4'
 *     });
 *
 * The '$=' operator will return Components with specified properties that
 * end with the passed value:
 *
 *     Ext.ComponentQuery.query('field[fieldLabel$=name]');
 *
 * Will match the following Component:
 *
 *     Ext.create('Ext.form.field.Text', {
 *         fieldLabel: 'Enter your name'
 *     });
 *
 * The following test will find panels with their `ownProperty` collapsed being equal to
 * `false`. It will **not** match a collapsed property from the prototype chain.
 *
 *     Ext.ComponentQuery.query('panel[@collapsed=false]');
 *
 * Member expressions from candidate Components may be tested. If the expression returns
 * a *truthy* value, the candidate Component will be included in the query:
 *
 *     var disabledFields = myFormPanel.query("{isDisabled()}");
 *
 * Such expressions are executed in Component's context, and the above expression is
 * similar to running this snippet for every Component in your application:
 *
 *      if (component.isDisabled()) {
 *          matches.push(component);
 *      }
 *
 * It is important to use only methods that are available in **every** Component instance
 * to avoid run time exceptions. If you need to match your Components with a custom
 * condition formula, you can augment `Ext.Component` to provide custom matcher that
 * will return `false` by default, and override it in your custom classes:
 * 
 *      Ext.define('My.Component', {
 *          override: 'Ext.Component',
 *          myMatcher: function() { return false; }
 *      });
 *
 *      Ext.define('My.Panel', {
 *          extend: 'Ext.panel.Panel',
 *          requires: ['My.Component'],     // Ensure that Component override is applied
 *          myMatcher: function(selector) {
 *              return selector === 'myPanel';
 *          }
 *      });
 *
 * After that you can use a selector with your custom matcher to find all instances
 * of `My.Panel`:
 *
 *      Ext.ComponentQuery.query("{myMatcher('myPanel')}");
 *
 * However if you really need to use a custom matcher, you may find it easier to implement
 * a custom Pseudo class instead (see below).
 *
 * ## Conditional matching
 *
 * Attribute matchers can be combined to select only Components that match **all**
 * conditions (logical AND operator):
 *
 *     Ext.ComponentQuery.query('panel[cls~=my-cls][floating=true][title$="sales data"]');
 *
 * E.g., the query above will match only a Panel-descended Component that has 'my-cls'
 * CSS class *and* is floating *and* with a title that ends with "sales data".
 *
 * Expressions separated with commas will match any Component that satisfies
 * *either* expression (logical OR operator):
 *
 *     Ext.ComponentQuery.query('field[fieldLabel^=User], field[fieldLabel*=password]');
 *
 * E.g., the query above will match any field with field label starting with "User",
 * *or* any field that has "password" in its label.
 *
 * ## Pseudo classes
 *
 * Pseudo classes may be used to filter results in the same way as in
 * {@link Ext.dom.Query}. There are five default pseudo classes:
 *
 * * `not` Negates a selector.
 * * `first` Filters out all except the first matching item for a selector.
 * * `last` Filters out all except the last matching item for a selector.
 * * `focusable` Filters out all except Components which are currently able to recieve
 * focus.
 * * `nth-child` Filters Components by ordinal position in the selection.
 *
 * These pseudo classes can be used with other matchers or without them:
 *
 *      // Select first direct child button in any panel
 *      Ext.ComponentQuery.query('panel > button:first');
 *
 *      // Select last field in Profile form
 *      Ext.ComponentQuery.query('form[title=Profile] field:last');
 * 
 *      // Find first focusable Component in a panel and focus it
 *      panel.down(':focusable').focus();
 * 
 *      // Select any field that is not hidden in a form
 *      form.query('field:not(hiddenfield)');
 *
 * Pseudo class `nth-child` can be used to find any child Component by its
 * position relative to its siblings. This class' handler takes one argument
 * that specifies the selection formula as `Xn` or `Xn+Y`:
 *
 *      // Find every odd field in a form
 *      form.query('field:nth-child(2n+1)'); // or use shortcut: :nth-child(odd)
 *
 *      // Find every even field in a form
 *      form.query('field:nth-child(2n)');   // or use shortcut: :nth-child(even)
 *
 *      // Find every 3rd field in a form
 *      form.query('field:nth-child(3n)');
 *
 * Pseudo classes can be combined to further filter the results, e.g., in the
 * form example above we can modify the query to exclude hidden fields:
 *
 *      // Find every 3rd non-hidden field in a form
 *      form.query('field:not(hiddenfield):nth-child(3n)');
 *
 * Note that when combining pseudo classes, whitespace is significant, i.e.
 * there should be no spaces between pseudo classes. This is a common mistake;
 * if you accidentally type a space between `field` and `:not`, the query
 * will not return any result because it will mean "find *field's children
 * Components* that are not hidden fields...".
 *
 * ## Custom pseudo classes
 *
 * It is possible to define your own custom pseudo classes. In fact, a
 * pseudo class is just a property in `Ext.ComponentQuery.pseudos` object
 * that defines pseudo class name (property name) and pseudo class handler
 * (property value):
 *
 *     // Function receives array and returns a filtered array.
 *     Ext.ComponentQuery.pseudos.invalid = function(items) {
 *         var i = 0, l = items.length, c, result = [];
 *         for (; i < l; i++) {
 *             if (!(c = items[i]).isValid()) {
 *                 result.push(c);
 *             }
 *         }
 *         return result;
 *     };
 * 
 *     var invalidFields = myFormPanel.query('field:invalid');
 *     if (invalidFields.length) {
 *         invalidFields[0].getEl().scrollIntoView(myFormPanel.body);
 *         for (var i = 0, l = invalidFields.length; i < l; i++) {
 *             invalidFields[i].getEl().frame("red");
 *         }
 *     }
 *
 * Pseudo class handlers can be even more flexible, with a selector
 * argument used to define the logic:
 *
 *      // Handler receives array of itmes and selector in parentheses
 *      Ext.ComponentQuery.pseudos.titleRegex = function(components, selector) {
 *          var i = 0, l = components.length, c, result = [], regex = new RegExp(selector);
 *          for (; i < l; i++) {
 *              c = components[i];
 *              if (c.title && regex.test(c.title)) {
 *                  result.push(c);
 *              }
 *          }
 *          return result;
 *      }
 *
 *      var salesTabs = tabPanel.query('panel:titleRegex("sales\\s+for\\s+201[123]")');
 *
 * Be careful when using custom pseudo classes with MVC Controllers: when
 * you use a pseudo class in Controller's `control` or `listen` component
 * selectors, the pseudo class' handler function will be called very often
 * and may slow down your application significantly. A good rule of thumb
 * is to always specify Component xtype with the pseudo class so that the
 * handlers are only called on Components that you need, and try to make
 * the condition checks as cheap in terms of execution time as possible.
 * Note how in the example above, handler function checks that Component
 * *has* a title first, before running regex test on it.
 *
 * ## Query examples
 *
 * Queries return an array of Components. Here are some example queries:
 *
 *     // retrieve all Ext.Panels in the document by xtype
 *     var panelsArray = Ext.ComponentQuery.query('panel');
 *
 *     // retrieve all Ext.Panels within the container with an id myCt
 *     var panelsWithinmyCt = Ext.ComponentQuery.query('#myCt panel');
 *
 *     // retrieve all direct children which are Ext.Panels within myCt
 *     var directChildPanel = Ext.ComponentQuery.query('#myCt > panel');
 *
 *     // retrieve all grids or trees
 *     var gridsAndTrees = Ext.ComponentQuery.query('gridpanel, treepanel');
 *     
 *     // Focus first Component
 *     myFormPanel.child(':focusable').focus();
 *
 *     // Retrieve every odd text field in a form
 *     myFormPanel.query('textfield:nth-child(odd)');
 *
 *     // Retrieve every even field in a form, excluding hidden fields
 *     myFormPanel.query('field:not(hiddenfield):nth-child(even)');
 *
 * For easy access to queries based from a particular Container see the
 * {@link Ext.container.Container#query}, {@link Ext.container.Container#down} and
 * {@link Ext.container.Container#child} methods. Also see
 * {@link Ext.Component#up}.
 */
Ext.define('Ext.ComponentQuery', {
    singleton: true,
    requires: [
        'Ext.ComponentManager',
        'Ext.dom.Query'
    ]
}, function() {

    var cq = this,
        domQueryOperators = Ext.dom.Query.operators,
        nthRe = /(\d*)n\+?(\d*)/,
        nthRe2 = /\D/,

        // A function source code pattern with a placeholder which accepts an expression which yields a truth value when applied
        // as a member on each item in the passed array.
        filterFnPattern = [
            'var r = [],',
                'i = 0,',
                'it = items,',
                'l = it.length,',
                'c;',
            'for (; i < l; i++) {',
                'c = it[i];',
                'if (c.{0}) {',
                   'r.push(c);',
                '}',
            '}',
            'return r;'
        ].join(''),

        filterItems = function(items, operation) {
            // Argument list for the operation is [ itemsArray, operationArg1, operationArg2...]
            // The operation's method loops over each item in the candidate array and
            // returns an array of items which match its criteria
            return operation.method.apply(this, [ items ].concat(operation.args));
        },

        getItems = function(items, mode) {
            var result = [],
                i = 0,
                length = items.length,
                candidate,
                deep = mode !== '>';
                
            for (; i < length; i++) {
                candidate = items[i];
                if (candidate.getRefItems) {
                    result = result.concat(candidate.getRefItems(deep));
                }
            }
            return result;
        },

        getAncestors = function(items) {
            var result = [],
                i = 0,
                length = items.length,
                candidate;
            for (; i < length; i++) {
                candidate = items[i];
                while (!!(candidate = candidate.getRefOwner())) {
                    result.push(candidate);
                }
            }
            return result;
        },

        // Filters the passed candidate array and returns only items which match the passed xtype
        filterByXType = function(items, xtype, shallow) {
            if (xtype === '*') {
                return items.slice();
            }
            else {
                var result = [],
                    i = 0,
                    length = items.length,
                    candidate;
                for (; i < length; i++) {
                    candidate = items[i];
                    if (candidate.isXType(xtype, shallow)) {
                        result.push(candidate);
                    }
                }
                return result;
            }
        },

        // Filters the passed candidate array and returns only items which have the passed className
        filterByClassName = function(items, className) {
            var result = [],
                i = 0,
                length = items.length,
                candidate;
            for (; i < length; i++) {
                candidate = items[i];
                if (candidate.hasCls(className)) {
                    result.push(candidate);
                }
            }
            return result;
        },

        // Filters the passed candidate array and returns only items which have the specified property match
        filterByAttribute = function(items, property, operator, compareTo) {
            var result = [],
                i = 0,
                length = items.length,
                mustBeOwnProperty,
                presenceOnly,
                candidate, propValue,
                j, propLen;

            // Prefixing property name with an @ means that the property must be in the candidate, not in its prototype
            if (property.charAt(0) === '@') {
                mustBeOwnProperty = true;
                property = property.substr(1);
            }
            if (property.charAt(0) === '?') {
                mustBeOwnProperty = true;
                presenceOnly = true;
                property = property.substr(1);
            }

            for (; i < length; i++) {
                candidate = items[i];

                // Check candidate hasOwnProperty is propName prefixed with a bang.
                if (!mustBeOwnProperty || candidate.hasOwnProperty(property)) {

                    // pull out property value to test
                    propValue = candidate[property];

                    if (presenceOnly) {
                        result.push(candidate);
                    }
                    // implies property is an array, and we must compare value against each element.
                    else if (operator === '~=') {
                        if (propValue) {
                            //We need an array
                            if (!Ext.isArray(propValue)) {
                                propValue = propValue.split(' ');
                            }

                            for (j = 0, propLen = propValue.length; j < propLen; j++) {
                                if (domQueryOperators[operator](Ext.coerce(propValue[j], compareTo), compareTo)) {
                                    result.push(candidate);
                                    break;
                                }
                            }
                        }
                    } else if (!compareTo ? !!candidate[property] : domQueryOperators[operator](Ext.coerce(propValue, compareTo), compareTo)) {
                        result.push(candidate);
                    }
                }
            }
            return result;
        },

        // Filters the passed candidate array and returns only items which have the specified itemId or id
        filterById = function(items, id) {
            var result = [],
                i = 0,
                length = items.length,
                candidate;
            for (; i < length; i++) {
                candidate = items[i];
                if (candidate.getItemId() === id) {
                    result.push(candidate);
                }
            }
            return result;
        },

        // Filters the passed candidate array and returns only items which the named pseudo class matcher filters in
        filterByPseudo = function(items, name, value) {
            return cq.pseudos[name](items, value);
        },

        // Determines leading mode
        // > for direct child, and ^ to switch to ownerCt axis
        modeRe = /^(\s?([>\^])\s?|\s|$)/,

        // Matches a token with possibly (true|false) appended for the "shallow" parameter
        tokenRe = /^(#)?([\w\-]+|\*)(?:\((true|false)\))?/,

        matchers = [{
            // Checks for .xtype with possibly (true|false) appended for the "shallow" parameter
            re: /^\.([\w\-]+)(?:\((true|false)\))?/,
            method: filterByXType
        }, {
            // checks for [attribute=value], [attribute^=value], [attribute$=value], [attribute*=value], [attribute~=value], [attribute%=value], [attribute!=value]
            // Allow [@attribute] to check truthy ownProperty
            // Allow [?attribute] to check for presence of ownProperty
            re: /^(?:\[((?:@|\?)?[\w\-\$]*[^\^\$\*~%!])\s?(?:(=|.=)\s?['"]?(.*?)["']?)?\])/,
            method: filterByAttribute
        }, {
            // checks for #cmpItemId
            re: /^#([\w\-]+)/,
            method: filterById
        }, {
            // checks for :<pseudo_class>(<selector>)
            re: /^\:([\w\-]+)(?:\(((?:\{[^\}]+\})|(?:(?!\{)[^\s>\/]*?(?!\})))\))?/,
            method: filterByPseudo
        }, {
            // checks for {<member_expression>}
            re: /^(?:\{([^\}]+)\})/,
            method: filterFnPattern
        }];

    // Internal class Ext.ComponentQuery.Query
    cq.Query = Ext.extend(Object, {
        constructor: function(cfg) {
            cfg = cfg || {};
            Ext.apply(this, cfg);
        },

        // Executes this Query upon the selected root.
        // The root provides the initial source of candidate Component matches which are progressively
        // filtered by iterating through this Query's operations cache.
        // If no root is provided, all registered Components are searched via the ComponentManager.
        // root may be a Container who's descendant Components are filtered
        // root may be a Component with an implementation of getRefItems which provides some nested Components such as the
        // docked items within a Panel.
        // root may be an array of candidate Components to filter using this Query.
        execute : function(root) {
            var operations = this.operations,
                i = 0,
                length = operations.length,
                operation,
                workingItems;

            // no root, use all Components in the document
            if (!root) {
                workingItems = Ext.ComponentManager.all.getArray();
            }
            // Root is an iterable object like an Array, or system Collection, eg HtmlCollection
            else if (Ext.isIterable(root)) {
                workingItems = root;
            }
            // Root is a MixedCollection
            else if (root.isMixedCollection) {
                workingItems = root.items;
            }

            // We are going to loop over our operations and take care of them
            // one by one.
            for (; i < length; i++) {
                operation = operations[i];

                // The mode operation requires some custom handling.
                // All other operations essentially filter down our current
                // working items, while mode replaces our current working
                // items by getting children from each one of our current
                // working items. The type of mode determines the type of
                // children we get. (e.g. > only gets direct children)
                if (operation.mode === '^') {
                    workingItems = getAncestors(workingItems || [root]);
                }
                else if (operation.mode) {
                    workingItems = getItems(workingItems || [root], operation.mode);
                }
                else {
                    workingItems = filterItems(workingItems || getItems([root]), operation);
                }

                // If this is the last operation, it means our current working
                // items are the final matched items. Thus return them!
                if (i === length -1) {
                    return workingItems;
                }
            }
            return [];
        },

        is: function(component) {
            var operations = this.operations,
                components = Ext.isArray(component) ? component : [component],
                originalLength = components.length,
                lastOperation = operations[operations.length-1],
                ln, i;

            components = filterItems(components, lastOperation);
            if (components.length === originalLength) {
                if (operations.length > 1) {
                    for (i = 0, ln = components.length; i < ln; i++) {
                        if (Ext.Array.indexOf(this.execute(), components[i]) === -1) {
                            return false;
                        }
                    }
                }
                return true;
            }
            return false;
        }
    });

    Ext.apply(this, {

        // private cache of selectors and matching ComponentQuery.Query objects
        cache: {},

        // private cache of pseudo class filter functions
        pseudos: {
            not: function(components, selector){
                var CQ = Ext.ComponentQuery,
                    i = 0,
                    length = components.length,
                    results = [],
                    index = -1,
                    component;
                
                for(; i < length; ++i) {
                    component = components[i];
                    if (!CQ.is(component, selector)) {
                        results[++index] = component;
                    }
                }
                return results;
            },
            first: function(components) {
                var ret = [];
                    
                if (components.length > 0) {
                    ret.push(components[0]);
                }
                return ret;       
            },
            last: function(components) {
                var len = components.length,
                    ret = [];
                    
                if (len > 0) {
                    ret.push(components[len - 1]);
                }
                return ret;
            },
            focusable: function(cmps) {
                var len = cmps.length,
                    results = [],
                    i = 0,
                    c;

                for (; i < len; i++) {
                    c = cmps[i];
                    // If this is a generally focusable Component (has a focusEl, is rendered, enabled and visible)
                    // then it is currently focusable if focus management is enabled or if it is an input field, a button or a menu item
                    if (c.isFocusable()) {
                        results.push(c);
                    }
                }

                return results;
            },
            "nth-child" : function(c, a) {
                var result = [],
                    m = nthRe.exec(a == "even" && "2n" || a == "odd" && "2n+1" || !nthRe2.test(a) && "n+" + a || a),
                    f = (m[1] || 1) - 0, l = m[2] - 0,
                    i, n, nodeIndex;
                for (i = 0; n = c[i]; i++) {
                    nodeIndex = i + 1;
                    if (f == 1) {
                        if (l == 0 || nodeIndex == l) {
                            result.push(n);
                        }
                    } else if ((nodeIndex + l) % f == 0){
                        result.push(n);
                    }
                }

                return result;
            }
        },

        /**
         * Returns an array of matched Components from within the passed root object.
         *
         * This method filters returned Components in a similar way to how CSS selector based DOM
         * queries work using a textual selector string.
         *
         * See class summary for details.
         *
         * @param {String} selector The selector string to filter returned Components
         * @param {Ext.container.Container} [root] The Container within which to perform the query.
         * If omitted, all Components within the document are included in the search.
         * 
         * This parameter may also be an array of Components to filter according to the selector.
         * @returns {Ext.Component[]} The matched Components.
         * 
         * @member Ext.ComponentQuery
         */
        query: function(selector, root) {
            var selectors = selector.split(','),
                length = selectors.length,
                i = 0,
                results = [],
                noDupResults = [], 
                dupMatcher = {}, 
                query, resultsLn, cmp;

            for (; i < length; i++) {
                selector = Ext.String.trim(selectors[i]);
                query = this.cache[selector] || (this.cache[selector] = this.parse(selector));
                results = results.concat(query.execute(root));
            }

            // multiple selectors, potential to find duplicates
            // lets filter them out.
            if (length > 1) {
                resultsLn = results.length;
                for (i = 0; i < resultsLn; i++) {
                    cmp = results[i];
                    if (!dupMatcher[cmp.id]) {
                        noDupResults.push(cmp);
                        dupMatcher[cmp.id] = true;
                    }
                }
                results = noDupResults;
            }
            return results;
        },

        /**
         * Tests whether the passed Component matches the selector string.
         * @param {Ext.Component} component The Component to test
         * @param {String} selector The selector string to test against.
         * @return {Boolean} True if the Component matches the selector.
         * @member Ext.ComponentQuery
         */
        is: function(component, selector) {
            if (!selector) {
                return true;
            }
            var selectors = selector.split(','),
                length = selectors.length,
                i = 0,
                query;

            for (; i < length; i++) {
                selector = Ext.String.trim(selectors[i]);
                query = this.cache[selector] || (this.cache[selector] = this.parse(selector));
                if (query.is(component)) {
                    return true;
                }
            }
            return false;
        },

        parse: function(selector) {
            var operations = [],
                length = matchers.length,
                lastSelector,
                tokenMatch,
                matchedChar,
                modeMatch,
                selectorMatch,
                i, matcher, method;

            // We are going to parse the beginning of the selector over and
            // over again, slicing off the selector any portions we converted into an
            // operation, until it is an empty string.
            while (selector && lastSelector !== selector) {
                lastSelector = selector;

                // First we check if we are dealing with a token like #, * or an xtype
                tokenMatch = selector.match(tokenRe);

                if (tokenMatch) {
                    matchedChar = tokenMatch[1];

                    // If the token is prefixed with a # we push a filterById operation to our stack
                    if (matchedChar === '#') {
                        operations.push({
                            method: filterById,
                            args: [Ext.String.trim(tokenMatch[2])]
                        });
                    }
                    // If the token is prefixed with a . we push a filterByClassName operation to our stack
                    // FIXME: Not enabled yet. just needs \. adding to the tokenRe prefix
                    else if (matchedChar === '.') {
                        operations.push({
                            method: filterByClassName,
                            args: [Ext.String.trim(tokenMatch[2])]
                        });
                    }
                    // If the token is a * or an xtype string, we push a filterByXType
                    // operation to the stack.
                    else {
                        operations.push({
                            method: filterByXType,
                            args: [Ext.String.trim(tokenMatch[2]), Boolean(tokenMatch[3])]
                        });
                    }

                    // Now we slice of the part we just converted into an operation
                    selector = selector.replace(tokenMatch[0], '');
                }

                // If the next part of the query is not a space or > or ^, it means we
                // are going to check for more things that our current selection
                // has to comply to.
                while (!(modeMatch = selector.match(modeRe))) {
                    // Lets loop over each type of matcher and execute it
                    // on our current selector.
                    for (i = 0; selector && i < length; i++) {
                        matcher = matchers[i];
                        selectorMatch = selector.match(matcher.re);
                        method = matcher.method;

                        // If we have a match, add an operation with the method
                        // associated with this matcher, and pass the regular
                        // expression matches are arguments to the operation.
                        if (selectorMatch) {
                            operations.push({
                                method: Ext.isString(matcher.method)
                                    // Turn a string method into a function by formatting the string with our selector matche expression
                                    // A new method is created for different match expressions, eg {id=='textfield-1024'}
                                    // Every expression may be different in different selectors.
                                    ? Ext.functionFactory('items', Ext.String.format.apply(Ext.String, [method].concat(selectorMatch.slice(1))))
                                    : matcher.method,
                                args: selectorMatch.slice(1)
                            });
                            selector = selector.replace(selectorMatch[0], '');
                            break; // Break on match
                        }
                        // Exhausted all matches: It's an error
                        if (i === (length - 1)) {
                            Ext.Error.raise('Invalid ComponentQuery selector: "' + arguments[0] + '"');
                        }
                    }
                }

                // Now we are going to check for a mode change. This means a space
                // or a > to determine if we are going to select all the children
                // of the currently matched items, or a ^ if we are going to use the
                // ownerCt axis as the candidate source.
                if (modeMatch[1]) { // Assignment, and test for truthiness!
                    operations.push({
                        mode: modeMatch[2]||modeMatch[1]
                    });
                    selector = selector.replace(modeMatch[0], '');
                }
            }

            //  Now that we have all our operations in an array, we are going
            // to create a new Query using these operations.
            return new cq.Query({
                operations: operations
            });
        }
    });
});