/**
 * @alternateClassName Ext.DomHelper
 *
 * The DomHelper class provides a layer of abstraction from DOM and transparently supports creating elements via DOM or
 * using HTML fragments. It also has the ability to create HTML fragment templates from your DOM building code.
 *
 * ## DomHelper element specification object
 *
 * A specification object is used when creating elements. Attributes of this object are assumed to be element
 * attributes, except for 4 special attributes:
 *
 * * **tag**: The tag name of the element
 * * **children (or cn)**: An array of the same kind of element definition objects to be created and appended. These
 * can be nested as deep as you want.
 * * **cls**: The class attribute of the element. This will end up being either the "class" attribute on a HTML
 * fragment or className for a DOM node, depending on whether DomHelper is using fragments or DOM.
 * * **html**: The innerHTML for the element
 *
 * ## Insertion methods
 *
 * Commonly used insertion methods:
 *
 * * {@link #append}
 * * {@link #insertBefore}
 * * {@link #insertAfter}
 * * {@link #overwrite}
 * * {@link #insertHtml}
 *
 * ## Example
 *
 * This is an example, where an unordered list with 3 children items is appended to an existing element with id
 * 'my-div':
 *
 *     var dh = Ext.DomHelper; // create shorthand alias
 *     // specification object
 *     var spec = {
 *         id: 'my-ul',
 *         tag: 'ul',
 *         cls: 'my-list',
 *         // append children after creating
 *         children: [     // may also specify 'cn' instead of 'children'
 *             {tag: 'li', id: 'item0', html: 'List Item 0'},
 *             {tag: 'li', id: 'item1', html: 'List Item 1'},
 *             {tag: 'li', id: 'item2', html: 'List Item 2'}
 *         ]
 *     };
 *     var list = dh.append(
 *         'my-div', // the context element 'my-div' can either be the id or the actual node
 *         spec      // the specification object
 *     );
 *
 * Element creation specification parameters in this class may also be passed as an Array of specification objects.
 * This can be used to insert multiple sibling nodes into an existing container very efficiently. For example, to add
 * more list items to the example above:
 *
 *     dh.append('my-ul', [
 *         {tag: 'li', id: 'item3', html: 'List Item 3'},
 *         {tag: 'li', id: 'item4', html: 'List Item 4'}
 *     ]);
 *
 * ## Templating
 *
 * The real power is in the built-in templating. Instead of creating or appending any elements, createTemplate returns
 * a Template object which can be used over and over to insert new elements. Revisiting the example above, we could
 * utilize templating this time:
 *
 *     // create the node
 *     var list = dh.append('my-div', {tag: 'ul', cls: 'my-list'});
 *     // get template
 *     var tpl = dh.createTemplate({tag: 'li', id: 'item{0}', html: 'List Item {0}'});
 *
 *     for(var i = 0; i < 5; i++){
 *         tpl.append(list, i); // use template to append to the actual node
 *     }
 *
 * An example using a template:
 *
 *     var html = '"{0}" href="{1}" class="nav">{2}';
 *
 *     var tpl = new Ext.DomHelper.createTemplate(html);
 *     tpl.append('blog-roll', ['link1', 'http://www.tommymaintz.com/', "Tommy's Site"]);
 *     tpl.append('blog-roll', ['link2', 'http://www.avins.org/', "Jamie's Site"]);
 *
 * The same example using named parameters:
 *
 *     var html = '"{id}" href="{url}" class="nav">{text}';
 *
 *     var tpl = new Ext.DomHelper.createTemplate(html);
 *     tpl.append('blog-roll', {
 *         id: 'link1',
 *         url: 'http://www.tommymaintz.com/',
 *         text: "Tommy's Site"
 *     });
 *     tpl.append('blog-roll', {
 *         id: 'link2',
 *         url: 'http://www.avins.org/',
 *         text: "Jamie's Site"
 *     });
 *
 * ## Compiling Templates
 *
 * Templates are applied using regular expressions. The performance is great, but if you are adding a bunch of DOM
 * elements using the same template, you can increase performance even further by "compiling" the template. The way
 * "compile()" works is the template is parsed and broken up at the different variable points and a dynamic function is
 * created and eval'ed. The generated function performs string concatenation of these parts and the passed variables
 * instead of using regular expressions.
 *
 *     var html = '"{id}" href="{url}" class="nav">{text}';
 *
 *     var tpl = new Ext.DomHelper.createTemplate(html);
 *     tpl.compile();
 *
 *     // ... use template like normal
 *
 * ## Performance Boost
 *
 * DomHelper will transparently create HTML fragments when it can. Using HTML fragments instead of DOM can
 * significantly boost performance.
 *
 * Element creation specification parameters may also be strings which are used as innerHTML.
 */
Ext.define('Ext.dom.Helper', function() {
    var afterbegin = 'afterbegin',
        afterend = 'afterend',
        beforebegin = 'beforebegin',
        beforeend = 'beforeend',
        bbValues = ['BeforeBegin', 'previousSibling'],
        aeValues = ['AfterEnd', 'nextSibling'],
        bb_ae_PositionHash = {
            beforebegin: bbValues,
            afterend: aeValues
        },
        fullPositionHash = {
            beforebegin: bbValues,
            afterend: aeValues,
            afterbegin: ['AfterBegin', 'firstChild'],
            beforeend: ['BeforeEnd', 'lastChild']
        };

    return {
        singleton: true,

        alternateClassName: [
            'Ext.DomHelper',
            'Ext.core.DomHelper'
        ],

        emptyTags: /^(?:br|frame|hr|img|input|link|meta|range|spacer|wbr|area|param|col)$/i,
        confRe: /^(?:tag|children|cn|html|tpl|tplData)$/i,
        endRe: /end/i,

        // Since cls & for are reserved words, we need to transform them
        attributeTransform: { cls : 'class', htmlFor : 'for' },

        closeTags: {},

        detachedDiv: document.createElement('div'),

        decamelizeName: function () {
            var camelCaseRe = /([a-z])([A-Z])/g,
                cache = {};

            function decamel (match, p1, p2) {
                return p1 + '-' + p2.toLowerCase();
            }

            return function (s) {
                return cache[s] || (cache[s] = s.replace(camelCaseRe, decamel));
            };
        }(),

        generateMarkup: function(spec, buffer) {
            var me = this,
                specType = typeof spec,
                attr, val, tag, i, closeTags;

            if (specType === "string" || specType === "number") {
                buffer.push(spec);
            } else if (Ext.isArray(spec)) {
                for (i = 0; i < spec.length; i++) {
                    if (spec[i]) {
                        me.generateMarkup(spec[i], buffer);
                    }
                }
            } else {
                tag = spec.tag || 'div';
                buffer.push('<', tag);

                for (attr in spec) {
                    if (spec.hasOwnProperty(attr)) {
                        val = spec[attr];
                        if (val !== undefined && !me.confRe.test(attr)) {
                            if (typeof val === "object") {
                                buffer.push(' ', attr, '="');
                                me.generateStyles(val, buffer, true).push('"');
                            } else {
                                buffer.push(' ', me.attributeTransform[attr] || attr, '="', val, '"');
                            }
                        }
                    }
                }

                // Now either just close the tag or try to add children and close the tag.
                if (me.emptyTags.test(tag)) {
                    buffer.push('/>');
                } else {
                    buffer.push('>');

                    // Apply the tpl html, and cn specifications
                    if ((val = spec.tpl)) {
                        val.applyOut(spec.tplData, buffer);
                    }
                    if ((val = spec.html)) {
                        buffer.push(val);
                    }
                    if ((val = spec.cn || spec.children)) {
                        me.generateMarkup(val, buffer);
                    }

                    // we generate a lot of close tags, so cache them rather than push 3 parts
                    closeTags = me.closeTags;
                    buffer.push(closeTags[tag] || (closeTags[tag] = '</' + tag + '>'));
                }
            }

            return buffer;
        },

        /**
         * Converts the styles from the given object to text. The styles are CSS style names
         * with their associated value.
         * 
         * The basic form of this method returns a string:
         * 
         *      var s = Ext.DomHelper.generateStyles({
         *          backgroundColor: 'red'
         *      });
         *      
         *      // s = 'background-color:red;'
         *
         * Alternatively, this method can append to an output array.
         * 
         *      var buf = [];
         *
         *      ...
         *
         *      Ext.DomHelper.generateStyles({
         *          backgroundColor: 'red'
         *      }, buf);
         *
         * In this case, the style text is pushed on to the array and the array is returned.
         * 
         * @param {Object} styles The object describing the styles.
         * @param {String[]} [buffer] The output buffer.
         * @param {Boolean} [encode] `true` to {@link Ext.String#htmlEncode} property values if they
         * are going to be inserted as HTML attributes.
         * @return {String/String[]} If buffer is passed, it is returned. Otherwise the style
         * string is returned.
         */
        generateStyles: function (styles, buffer, encode) {
            var a = buffer || [],
                name, val;

            for (name in styles) {
                if (styles.hasOwnProperty(name)) {
                    val = styles[name];
                    // Since a majority of attributes won't have html characters (basically
                    // restricted to fonts), we'll check first before we try and encode it
                    // because it's less expensive and this method gets called a lot.
                    name = this.decamelizeName(name);
                    if (encode && Ext.String.hasHtmlCharacters(val)) {
                        val = Ext.String.htmlEncode(val);
                    }
                    a.push(name, ':', val, ';');
                }
            }

            return buffer || a.join('');
        },

        /**
         * Returns the markup for the passed Element(s) config.
         * @param {Object} spec The DOM object spec (and children).
         * @return {String}
         */
        markup: function(spec) {
            if (typeof spec === "string") {
                return spec;
            }

            var buf = this.generateMarkup(spec, []);
            return buf.join('');
        },

        /**
         * Applies a style specification to an element.
         * @param {String/HTMLElement} el The element to apply styles to
         * @param {String/Object/Function} styles A style specification string e.g. 'width:100px', or object in the form {width:'100px'}, or
         * a function which returns such a specification.
         */
        applyStyles: function(el, styles) {
            Ext.fly(el).applyStyles(styles);
        },

        /**
         * @private
         * Fix for browsers which do not support createContextualFragment
         */
        createContextualFragment: function(html){
            var div = this.detachedDiv,
                fragment = document.createDocumentFragment(),
                length, childNodes;

            div.innerHTML = html;
            childNodes = div.childNodes;
            length = childNodes.length;

            // Move nodes into fragment, don't clone: http://jsperf.com/create-fragment
            while (length--) {
                fragment.appendChild(childNodes[0]);
            }
            return fragment;
        },

        /**
         * Creates new DOM element(s) without inserting them to the document.
         * @param {Object/String} o The DOM object spec (and children) or raw HTML blob
         * @return {HTMLElement} The new uninserted node
         */
        createDom: function(o, parentNode){
            var me = this,
                markup = me.markup(o),
                div = me.detachedDiv;

            div.innerHTML = markup;

            return div.firstChild;
        },

        /**
         * Inserts an HTML fragment into the DOM.
         * @param {String} where Where to insert the html in relation to el - beforeBegin, afterBegin, beforeEnd, afterEnd.
         *
         * For example take the following HTML: `<div>Contents</div>`
         *
         * Using different `where` values inserts element to the following places:
         *
         * - beforeBegin: `<HERE><div>Contents</div>`
         * - afterBegin: `<div><HERE>Contents</div>`
         * - beforeEnd: `<div>Contents<HERE></div>`
         * - afterEnd: `<div>Contents</div><HERE>`
         *
         * @param {HTMLElement/TextNode} el The context element
         * @param {String} html The HTML fragment
         * @return {HTMLElement} The new node
         */
        insertHtml: function(where, el, html) {
            var me = this,
                hashVal,
                range,
                rangeEl,
                setStart,
                frag;

            where = where.toLowerCase();

            // Has fast HTML insertion into existing DOM: http://www.w3.org/TR/html5/apis-in-html-documents.html#insertadjacenthtml
            if (el.insertAdjacentHTML) {

                if (me.ieInsertHtml) {
                    // hook for IE table hack - impl in ext package override
                    frag = me.ieInsertHtml(where, el, html);
                    if (frag) {
                        return frag;
                    }
                }

                hashVal = fullPositionHash[where];
                if (hashVal) {
                    if (Ext.global.MSApp && Ext.global.MSApp.execUnsafeLocalFunction) {
                        //ALLOW MS TO EXECUTE THIS CODE FOR NATIVE WINDOWS 8 DESKTOP APPS
                        MSApp.execUnsafeLocalFunction(function () {
                            el.insertAdjacentHTML(hashVal[0], html);
                        });
                    } else {
                        el.insertAdjacentHTML(hashVal[0], html);
                    }

                    return el[hashVal[1]];
                }
                // if (not IE and context element is an HTMLElement) or TextNode
            } else {
                // we cannot insert anything inside a textnode so...
                if (el.nodeType === 3) {
                    where = where === afterbegin ? beforebegin : where;
                    where = where === beforeend ? afterend : where;
                }
                range = Ext.supports.CreateContextualFragment ? el.ownerDocument.createRange() : undefined;
                setStart = 'setStart' + (this.endRe.test(where) ? 'After' : 'Before');
                if (bb_ae_PositionHash[where]) {
                    if (range) {
                        range[setStart](el);
                        frag = range.createContextualFragment(html);
                    } else {
                        frag = this.createContextualFragment(html);
                    }
                    el.parentNode.insertBefore(frag, where === beforebegin ? el : el.nextSibling);
                    return el[(where === beforebegin ? 'previous' : 'next') + 'Sibling'];
                } else {
                    rangeEl = (where === afterbegin ? 'first' : 'last') + 'Child';
                    if (el.firstChild) {
                        if (range) {
                            // Creating ranges on a hidden element throws an error, checking for
                            // visibility is expensive, so we'll catch the error and fall back to
                            // using the full fragment
                            try {
                                range[setStart](el[rangeEl]);
                                frag = range.createContextualFragment(html);
                            }
                            catch(e) {
                                frag = this.createContextualFragment(html);
                            }
                        } else {
                            frag = this.createContextualFragment(html);
                        }

                        if (where === afterbegin) {
                            el.insertBefore(frag, el.firstChild);
                        } else {
                            el.appendChild(frag);
                        }
                    } else {
                        el.innerHTML = html;
                    }
                    return el[rangeEl];
                }
            }
            //<debug>
            Ext.Error.raise({
                sourceClass: 'Ext.DomHelper',
                sourceMethod: 'insertHtml',
                htmlToInsert: html,
                targetElement: el,
                msg: 'Illegal insertion point reached: "' + where + '"'
            });
            //</debug>
        },

        /**
         * Creates new DOM element(s) and inserts them before el.
         * @param {String/HTMLElement/Ext.dom.Element} el The context element
         * @param {Object/String} o The DOM object spec (and children) or raw HTML blob
         * @param {Boolean} [returnElement] true to return a Ext.Element
         * @return {HTMLElement/Ext.dom.Element} The new node
         */
        insertBefore: function(el, o, returnElement) {
            return this.doInsert(el, o, returnElement, beforebegin);
        },

        /**
         * Creates new DOM element(s) and inserts them after el.
         * @param {String/HTMLElement/Ext.dom.Element} el The context element
         * @param {Object} o The DOM object spec (and children)
         * @param {Boolean} [returnElement] true to return a Ext.Element
         * @return {HTMLElement/Ext.dom.Element} The new node
         */
        insertAfter: function(el, o, returnElement) {
            return this.doInsert(el, o, returnElement, afterend);
        },

        /**
         * Creates new DOM element(s) and inserts them as the first child of el.
         * @param {String/HTMLElement/Ext.dom.Element} el The context element
         * @param {Object/String} o The DOM object spec (and children) or raw HTML blob
         * @param {Boolean} [returnElement] true to return a Ext.Element
         * @return {HTMLElement/Ext.dom.Element} The new node
         */
        insertFirst: function(el, o, returnElement) {
            return this.doInsert(el, o, returnElement, afterbegin);
        },

        /**
         * Creates new DOM element(s) and appends them to el.
         * @param {String/HTMLElement/Ext.dom.Element} el The context element
         * @param {Object/String} o The DOM object spec (and children) or raw HTML blob
         * @param {Boolean} [returnElement] true to return a Ext.Element
         * @return {HTMLElement/Ext.dom.Element} The new node
         */
        append: function(el, o, returnElement) {
            return this.doInsert(el, o, returnElement, beforeend);
        },

        /**
         * Creates new DOM element(s) and overwrites the contents of el with them.
         * @param {String/HTMLElement/Ext.dom.Element} el The context element
         * @param {Object/String} o The DOM object spec (and children) or raw HTML blob
         * @param {Boolean} [returnElement=false] true to return an Ext.Element
         * @return {HTMLElement/Ext.dom.Element} The new node
         */
        overwrite: function(el, html, returnElement) {
            var me = this,
                newNode;

            el = Ext.getDom(el);
            html = me.markup(html);

            if (me.ieOverwrite) {
                // hook for IE table hack - impl in ext package override
                newNode = me.ieOverwrite(el, html);
            }
            if (!newNode) {
                el.innerHTML = html;
                newNode = el.firstChild;
            }
            return returnElement ? Ext.get(newNode) : newNode;
        },

        doInsert: function(el, o, returnElement, where) {
            var me = this,
                newNode;

            el = el.dom || Ext.getDom(el);

            if ('innerHTML' in el) {
                // regular dom node
                // For standard HTMLElements, we insert as innerHTML instead of
                // createElement/appenChild because it is much faster in all versions of
                // IE: https://fiddle.sencha.com/#fiddle/tj
                newNode = me.insertHtml(where, el, me.markup(o));
            } else {
                // document fragment does not support innerHTML
                newNode = me.createDom(o, null);

                // we cannot insert anything inside a textnode so...
                if (el.nodeType === 3) {
                    where = where === afterbegin ? beforebegin : where;
                    where = where === beforeend ? afterend : where;
                }
                if (bb_ae_PositionHash[where]) {
                    el.parentNode.insertBefore(newNode, where === beforebegin ? el : el.nextSibling);
                } else if (el.firstChild && where === afterbegin) {
                    el.insertBefore(newNode, el.firstChild);
                } else {
                    el.appendChild(newNode);
                }
            }

            return returnElement ? Ext.get(newNode) : newNode;
        },

        /**
         * Creates a new Ext.Template from the DOM object spec.
         * @param {Object} o The DOM object spec (and children)
         * @return {Ext.Template} The new template
         */
        createTemplate: function(o) {
            var html = this.markup(o);
            return new Ext.Template(html);
        },

        /**
         * @method createHtml
         * Alias for {@link #markup}.
         * @inheritdoc Ext.dom.AbstractHelper#markup
         * @deprecated 5.0.0
         */
        createHtml: function(spec) {
            return this.markup(spec);
        }
    };
});
