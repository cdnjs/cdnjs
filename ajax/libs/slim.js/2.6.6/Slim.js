class Slim extends HTMLElement {

    /**
     * Auto-detect if the browser supports web-components. If it does not,
     * it will add a script tag with the required url.
     * Best practice to call polyfill in <head> section of the HTML
     * @example
     *      <head>
     *          <script src="./path/to/slim/Slim.min.js></script>
     *          <script>
     *              Slim.polyfill('./path/to/web-components-polyfill.js');
     *          </script>
     *      </head>
     * @param url
     */
    static polyfill(url) {
        if (Slim.__isWCSupported) return;
        document.write('<script src="' + url + '"></script>');
    }

    /**
     * Declares a slim component
     *
     * @param {String} tag html tag name
     * @param {String|class|function} clazzOrTemplate the template string or the class itself
     * @param {class|function} clazz if not given as second argument, mandatory after the template
     */
    static tag(tag, clazzOrTemplate, clazz) {
        if (clazz === undefined) {
            clazz = clazzOrTemplate;
        } else {
            Slim.__templateDict[tag] = clazzOrTemplate;
        }
        Slim.__prototypeDict[tag] = clazz;
        // window.customElements.define(tag, clazz);
        document.registerElement(tag, clazz);
    }

    //noinspection JSUnusedGlobalSymbols
    /**
     *
     * @param {class|function} clazz returns the tag declared for a given class or constructor
     * @returns {string}
     */
    static getTag(clazz) {
        for (let tag in Slim.__prototypeDict) {
            if (Slim.__prototypeDict[tag] === clazz)
                return tag;
        }
    }

    /**
     * Supported HTML events built-in on slim components
     * @returns {Array<String>}
     */
    static get interactionEventNames() {
        return ['click','mouseover','mouseout','mousemove','mouseenter','mousedown','mouseup','dblclick','contextmenu','wheel',
            'mouseleave','select','pointerlockchange','pointerlockerror','focus','blur',
            'input', 'error', 'invalid',
            'animationstart','animationend','animationiteration','reset','submit','resize','scroll',
            'keydown','keypress','keyup', 'change']
    }

    /**
     * Aspect oriented functions to handle lifecycle phases of elements. The plugin function should gets the element as an argument.
     * This is used to extend elements' capabilities or data injections across the application
     * @param {String} phase
     * @param {function} plugin
     */
    static plugin(phase, plugin) {
        if (['create','beforeRender','beforeRemove','afterRender'].indexOf(phase) === -1) {
            throw "Supported phase can be create, beforeRemove, beforeRender or afterRender only"
        }
        Slim.__plugins[phase].push(plugin)
    }

    //noinspection JSUnusedGlobalSymbols
    /**
     * This is used to extend Slim. All custom attributes handlers would recieve the function and the value of the attribute when relevant.
     * @param {String} attr attribute name
     * @param {function} fn
     */
    static registerCustomAttribute(attr, fn) {
        Slim.__customAttributeProcessors[attr] = Slim.__customAttributeProcessors[attr] || [];
        Slim.__customAttributeProcessors[attr].push(fn);
    }

    /**
     * @param phase
     * @param element
     * @private
     */
    static __runPlugins(phase, element) {
        Slim.__plugins[phase].forEach( fn => {
            fn(element)
        })
    }

    /**
     *
     * @param source
     * @param target
     * @param activate
     * @private
     */
    static __moveChildrenBefore(source, target, activate) {
        while (source.firstChild) {
            target.parentNode.insertBefore(source.firstChild, target)
        }
        let children = Slim.selectorToArr(target, '*');
        for (let child of children) {
            if (activate && child.isSlim) {
                child.createdCallback()
            }
        }
    }

    /**
     *
     * @param source
     * @param target
     * @param activate
     * @private
     */
    static __moveChildren(source, target, activate) {
        while (source.firstChild) {
            target.appendChild(source.firstChild)
        }
        let children = Slim.selectorToArr(target, '*');
        for (let child of children) {
            if (activate && child.isSlim) {
                child.createdCallback()
            }
        }
    }

    /**
     *
     * @param obj
     * @param desc
     * @returns {{source: *, prop: *, obj: *}}
     * @private
     */
    static __lookup(obj, desc) {
        let arr = desc.split(".");
        let prop = arr[0];
        while(arr.length && obj) {
            obj = obj[prop = arr.shift()]
        }
        return {source: desc, prop:prop, obj:obj};
    }

    /**
     *
     * @param descriptor
     * @private
     */
    static __createRepeater(descriptor) {
        if (Slim.__prototypeDict['slim-repeat'] === undefined) {
            Slim.__initRepeater();
        }
        let repeater;
        if (Slim.__isWCSupported) {
            repeater = document.createElement('slim-repeat');
            repeater.sourceNode = descriptor.target;
            descriptor.target.parentNode.insertBefore(repeater, descriptor.target);
            descriptor.repeater = repeater
        } else {
            descriptor.target.insertAdjacentHTML('beforebegin', '<slim-repeat slim-new="true"></slim-repeat>');
            repeater = descriptor.target.parentNode.querySelector('slim-repeat[slim-new="true"]');
            repeater.__proto__ = window.SlimRepeater.prototype;
            repeater.sourceNode = descriptor.target;
            repeater.removeAttribute('slim-new');

            repeater.createdCallback()
        }
        repeater._boundParent = descriptor.source;
        descriptor.target.parentNode.removeChild(descriptor.target);
        repeater._isAdjacentRepeater = descriptor.repeatAdjacent;
        repeater.setAttribute('source', descriptor.properties[0]);
        repeater.setAttribute('target-attr', descriptor.targetAttribute);
        descriptor.repeater = repeater
    }

    /**
     *
     * @param dash
     * @returns {XML|void|string|*}
     * @private
     */
    static __dashToCamel(dash) {
        return dash.indexOf('-') < 0 ? dash : dash.replace(/-[a-z]/g, m => {return m[1].toUpperCase()})
    }

    //noinspection JSUnusedGlobalSymbols
    /**
     *
     * @param camel
     * @returns {string}
     * @private
     */
    static __camelToDash(camel) {
        return camel.replace(/([A-Z])/g, '-$1').toLowerCase();
    }

    constructor() {
        super();
        this.createdCallback();
    }

    find(selector) {
        return this.querySelector(selector);
    }

    //noinspection JSUnusedGlobalSymbols
    findAll(selector) {
        return Slim.selectorToArr(this, selector);
    }

    watch(prop, executor) {
        let descriptor = {
            type: 'W',
            properties: [ prop ],
            executor: executor,
            target: this,
            source: this
        };
        this._bindings = this._bindings || {};
        this._boundParent = this._boundParent || this;
        this.__bind(descriptor)
    }

    /**
     * Function delegation in the DOM chain is supported by this function. All slim components are capable of triggering
     * delegated methods using callAttribute and send any payload as they define in their API.
     * @param {String} attributeName
     * @param {any} value
     */
    callAttribute(attributeName, value) {
        if (!this._boundParent) {
            throw 'Unable to call attribute-bound method when no bound parent available';
        }
        let fnName = this.getAttribute(attributeName);
        if (fnName === null) {
            console.warn && console.warn('Unable to call null attribute-bound method on bound parent ' + this._boundParent.outerHTML);
            return;
        }
        if (typeof this[fnName] === 'function') {
            this[fnName](value)
        } else if (typeof this._boundParent[fnName] === 'function') {
            this._boundParent[fnName](value)
        } else if (this._boundParent && this._boundParent._boundParent && typeof this._boundParent._boundParent[fnName] === 'function') {
            // safari, firefox
            this._boundParent._boundParent[fnName](value)
        } else if (this._boundRepeaterParent && typeof this._boundRepeaterParent[fnName] === 'function') {
            this._boundRepeaterParent[fnName](value)
        } else {
            throw "Unable to call attribute-bound method: " + fnName + ' on bound parent ' + this._boundParent.outerHTML + ' with value ' + value
        }
        if (typeof this.update === 'function' && (this.isInteractive || Slim.autoAttachInteractionEvents || this.getAttribute('interactive'))) {
            this.update()
        }
    }

    /**
     *
     * @param descriptor
     * @private
     */
    __bind(descriptor) {
        descriptor.properties.forEach(
            prop => {
                let rootProp;
                if (prop.indexOf('.') > 0) {
                    rootProp = prop.split('.')[0]
                } else {
                    rootProp = prop
                }
                let source = descriptor.source || descriptor.target._boundParent || descriptor.parentNode;
                source._bindings = source._bindings || {};
                source._bindings[rootProp] = source._bindings[rootProp] || {
                        value: source[rootProp],
                        executors: []
                    };
                if (!source.__lookupGetter__(prop)) source.__defineGetter__(prop, function() {
                    return this._bindings[prop].value
                });
                if (!source.__lookupSetter__(prop)) source.__defineSetter__(prop, function(x) {
                    this._bindings[prop].value = x;
                    if (descriptor.sourceText) {
                        descriptor.target.innerText = descriptor.sourceText
                    }
                    this._executeBindings(prop);
                    if (typeof this[prop + 'Changed'] === 'function') {
                        this[prop + 'Changed'](x);
                    }
                });
                let executor;
                if (descriptor.type === 'C') {
                    executor = () => {
                        descriptor.executor()
                    }
                } else if (descriptor.type === 'P') {
                    executor = () => {
                        if (!descriptor.target.hasAttribute('slim-repeat')) {
                            let sourceRef = descriptor.target._boundRepeaterParent;
                            let value = Slim.__lookup((sourceRef || source), prop).obj || Slim.__lookup(descriptor.target, prop).obj;
                            descriptor.target[ Slim.__dashToCamel(descriptor.attribute) ] = value;
                            descriptor.target.setAttribute( descriptor.attribute, value )
                        }
                    }
                } else if (descriptor.type === 'M') {
                    executor = () => {
                        if (!descriptor.target.hasAttribute('slim-repeat')) {
                            let sourceRef = descriptor.target._boundRepeaterParent || source;
                            let value = sourceRef[ descriptor.method ].apply( sourceRef,
                                descriptor.properties.map( prop => { return descriptor.target[prop] || sourceRef[prop] }));
                            descriptor.target[ Slim.__dashToCamel(descriptor.attribute) ] = value;
                            descriptor.target.setAttribute( descriptor.attribute, value )
                        }
                    }
                } else if (descriptor.type === 'T') {
                    executor = () => {
                        let source = descriptor.target._boundParent;
                        descriptor.target.innerText = descriptor.target.innerText.replace(`[[${prop}]]`, Slim.__lookup(source, prop).obj)
                    }
                } else if (descriptor.type === 'R') {
                    executor = () => {
                        descriptor.repeater.renderList()
                    }
                } else if (descriptor.type === 'W') {
                    executor = () => {
                        descriptor.executor(Slim.__lookup(source, prop).obj)
                    }
                }
                executor.descriptor = descriptor;
                source._bindings[rootProp].executors.push( executor )
            }
        )
    }

    /**
     *
     * @param attribute
     * @param child
     * @returns {{type: string, target: *, targetAttribute: *, repeatAdjacent: boolean, attribute: string, properties: [*], source: (*|Slim)}}
     * @private
     */
    static __processRepeater(attribute, child) {
        return {
            type: 'R',
            target: child,
            targetAttribute: child.getAttribute('slim-repeat-as') ? child.getAttribute('slim-repeat-as') : 'data',
            repeatAdjacent: child.hasAttribute('slim-repeat-adjacent') || child.localName === 'option',
            attribute: attribute.nodeName,
            properties: [ attribute.nodeValue ],
            source: child._boundParent
        }
    }

    /**
     *
     * @param attribute
     * @param child
     * @returns {{type: string, target: *, properties: [*], executor: (function())}}
     * @private
     */
    static __processCustomAttribute(attribute, child) {
        return {
            type: "C",
            target: child,
            properties: [attribute.nodeValue],
            executor: () => {
                Slim.__customAttributeProcessors[attribute.nodeName].forEach( customAttrProcessor => {
                    customAttrProcessor(child, attribute.nodeValue);
                });
            }
        };
    }

    /**
     * Extracts a value by using dot-notation from a target
     * @param target
     * @param expression
     * @returns {*}
     */
    static extract(target, expression) {
        const rxInject = Slim.rxInject.exec(expression);
        const rxProp = Slim.rxProp.exec(expression);
        const rxMethod = Slim.rxMethod.exec(expression);

        if (rxProp) {
            return target[rxProp[1]]
        } else if (rxMethod) {
            return target[ rxMethod[1] ].apply( target, rxMethod[3].replace(' ','').split(',') );
        }
    }

    /**
     *
     * @param attribute
     * @param child
     * @returns {*}
     * @private
     */
    static __processAttribute(attribute, child) {
        if (attribute.nodeName === 'slim-repeat') {
            return Slim.__processRepeater(attribute, child)
        }

        if (Slim.__customAttributeProcessors[attribute.nodeName]) {
            return Slim.__processCustomAttribute(attribute, child);
        }

        const rxInject = Slim.rxInject.exec(attribute.nodeValue);
        const rxProp = Slim.rxProp.exec(attribute.nodeValue);
        const rxMethod = Slim.rxMethod.exec(attribute.nodeValue);

        if (rxMethod) {
            return {
                type: 'M',
                target: child,
                attribute: attribute.nodeName,
                method: rxMethod[1],
                properties: rxMethod[3].replace(' ','').split(',')
            }
        } else if (rxProp) {
            return {
                type: 'P',
                target: child,
                attribute: attribute.nodeName,
                properties: [ rxProp[1] ]
            }
        } else if (rxInject) {
            return {
                type: 'I',
                target: child,
                attribute: attribute.nodeName,
                factory: rxInject[1]
            }
        }
    }

    /**
     * Checks if the element is actually placed on the DOM or is a template element only
     * @returns {boolean}
     */
    get isVirtual() {
        let node = this;
        while (node) {
            node = node.parentNode;
            if (!node) {
                return true
            }
            if (node.nodeName === 'BODY' || node.host) {
                return false
            }
        }
        return true
    }

    /**
     * By default, Slim components does not use shadow dom. Override and return true if you wish to use shadow dom.
     * @returns {boolean}
     */
    get useShadow() {
        return false;
    }

    /**
     * Returns the element or it's shadow root, depends on the result from useShadow()
     * @returns {*}
     */
    get rootElement() {
        if (this.useShadow && this.createShadowRoot) {
            this.__shadowRoot = this.__shadowRoot || this.createShadowRoot();
            return this.__shadowRoot
        }
        return this
    }

    /**
     * Part of the standard web-component lifecycle. Overriding it is not recommended.
     */
    createdCallback() {
        // __createdCallbackRunOnce is required for babel louzy transpiling
        if (this.isVirtual) return;
        if (this.__createdCallbackRunOnce) return;
        this.__createdCallbackRunOnce = true;
        this.initialize();
        this.onBeforeCreated();
        this._captureBindings();
        Slim.__runPlugins('create', this);
        this.onCreated();
        this.__onCreatedComplete = true;
        this.onBeforeRender();
        Slim.__runPlugins('beforeRender', this);
        Slim.__moveChildren( this._virtualDOM, this.rootElement, true );
        this.onAfterRender();
        Slim.__runPlugins('afterRender', this);
        this.update()
    }

    //noinspection JSUnusedGlobalSymbols
    /**
     * Part of the standard web-component lifecycle. Overriding it is not recommended.
     */
    detachedCallback() {
        Slim.__runPlugins('beforeRemove', this);
        this.onRemoved()
    }

    /**
     *
     * @private
     */
    _initInteractiveEvents() {
        if (!this.__eventsInitialized && (Slim.autoAttachInteractionEvents || this.isInteractive || this.hasAttribute('interactive'))) Slim.interactionEventNames.forEach(eventType => {
            this.addEventListener(eventType, e => { this.handleEvent(e) })
        })
    }

    /**
     * Part of the non-standard slim web-component's lifecycle. Overriding it is not recommended.
     */
    initialize() {
        this._bindings = this._bindings || {};
        this._boundChildren = this._boundChildren || [];
        this._initInteractiveEvents();
        this.__eventsInitialized = true;
        this.alternateTemplate = this.alternateTemplate || null;
        this._virtualDOM = this._virtualDOM || document.createDocumentFragment();
    }

    /**
     * Simple test if an HTML element is a Slim elememnt.
     * @returns {boolean}
     */
    get isSlim() { return true }

    /**
     * Override and provide a template, if not given in the tag creation process.
     * @returns {*|null}
     */
    get template() {
        return (Slim.__templateDict[ this.nodeName.toLowerCase()]) || null;
    }

    /**
     * By default, interactive events are registered only if returns true, or directly requested for.
     * @returns {boolean}
     */
    get isInteractive() { return false }

    /**
     * Handles interactive events, overriding this is not recommended.
     * @param e
     */
    handleEvent(e) {
        if (this.hasAttribute('on' + e.type)) {
            this.callAttribute('on' + e.type, e)
        } else if (this.hasAttribute(e.type)) {
            this.callAttribute(e.type, e)
        }
    }

    /**
     * Part of the standard web-component lifecycle. Overriding it is not recommended.
     */
    connectedCallback() {
        this.attachedCallback();
    }

    /**
     * Part of the standard web-component lifecycle. Overriding it is not recommended.
     */
    disconnectedCallback() {
        this.detachedCallback();
    }

    //noinspection JSUnusedGlobalSymbols
    /**
     * Part of the standard web-component lifecycle. Overriding it is not recommended.
     */
    attachedCallback() {
        this.onAdded();
    }

    onAdded() { /* abstract */ }
    onRemoved() { /* abstract */ }
    onBeforeCreated() { /* abstract */ }
    onCreated() { /* abstract */}
    onBeforeRender() { /* abstract */ }
    onAfterRender() { /* abstract */ }
    onBeforeUpdate() { /* abstract */ }
    onAfterUpdate() { /* abstract */ }

    /**
     * Part of Slim's lifecycle, overriding is not recommended without calling super.update()
     */
    update() {
        this.onBeforeUpdate();
        this._executeBindings();
        this.onAfterUpdate()
    }

    /**
     * Part of Slim's lifecycle, overriding is not recommended without calling super.render()
     */
    render(template) {
        Slim.__runPlugins('beforeRender', this);
        this.onBeforeRender();
        this.alternateTemplate = template;
        this.initialize();
        this.rootElement.innerHTML = '';
        this._captureBindings();
        this._executeBindings();
        Slim.__moveChildren( this._virtualDOM, this.rootElement, true );
        this.onAfterRender();
        Slim.__runPlugins('afterRender', this)
    }

    /**
     *
     * @param prop
     * @private
     */
    _executeBindings(prop) {
        if (!this._bindings) return;
        // reset bound texts
        this._boundChildren.forEach( child => {
            // this._boundChildren.forEach( child => {
            if (child.hasAttribute('bind') && child.sourceText !== undefined) {
                child.innerText = child.sourceText
            }
        });

        // execute specific binding or all
        const properties = prop ? [ prop ] : Object.keys(this._bindings);
        properties.forEach( property => {
            this._bindings[property].executors.forEach( fn => {
                if (fn.descriptor.type !== 'T') fn()
            } )
        });

        // execute text bindings always
        Object.keys(this._bindings).forEach( property => {
            this._bindings[property].executors.forEach( fn => {
                if (fn.descriptor.type === 'T') {
                    fn();
                }
            })
        })
    }

    /**
     *
     * @private
     */
    _captureBindings() {
        const self = this;
        let $tpl = this.alternateTemplate || this.template;
        if (!$tpl) {
            while (this.firstChild) {
                // TODO: find why this line is needed for babel!!!
                self._virtualDOM = this._virtualDOM || document.createDocumentFragment();
                self._virtualDOM.appendChild( this.firstChild )
            }
        } else if (typeof($tpl) === 'string') {
            const frag = document.createRange().createContextualFragment($tpl);
            while (frag.firstChild) {
                this._virtualDOM.appendChild(frag.firstChild);
            }
            let virtualContent = this._virtualDOM.querySelector('slim-content');
            if (virtualContent) {
                while (self.firstChild) {
                    self.firstChild._boundParent = this.firstChild._boundParent || this;
                    virtualContent.appendChild( this.firstChild )
                }
            }
        }

        let allChildren = Slim.selectorToArr(this._virtualDOM, '*');
        for (let child of allChildren) {
            child._sourceOuterHTML = child.outerHTML;
            child._boundParent = child._boundParent || this;
            self._boundChildren = this._boundChildren || [];
            self._boundChildren.push(child);
            self._boundChildren.push(child);
            if (child.getAttribute('slim-id')) {
                child._boundParent[ Slim.__dashToCamel(child.getAttribute('slim-id')) ] = child
            }
            let slimID = child.getAttribute('slim-id');
            if (slimID) this[slimID] = child;
            let descriptors = [];
            if (child.attributes) for (let i = 0; i < child.attributes.length; i++) {
                if (!child.isSlim && !child.__eventsInitialized && Slim.interactionEventNames.indexOf(child.attributes[i].nodeName) >= 0) {
                    child.isInteractive = true;
                    child.handleEvent = self.handleEvent.bind(child);
                    child.callAttribute = self.callAttribute.bind(child);
                    child.addEventListener(child.attributes[i].nodeName, child.handleEvent);
                    child.__eventsInitialized = true;
                }
                let desc = Slim.__processAttribute(child.attributes[i], child);
                if (desc) descriptors.push(desc);
                child[Slim.__dashToCamel(child.attributes[i].nodeName)] = child.attributes[i].nodeValue;
                if (child.attributes[i].nodeName.indexOf('#') == '0') {
                    let refName = child.attributes[i].nodeName.slice(1);
                    this[refName] = child
                }
            }

            descriptors = descriptors.sort( (a) => {
                if (a.type === 'I') { return -1 }
                else if (a.type === 'R') return 1
                else if (a.type === 'C') return 2
                return 0
            });

            descriptors.forEach(
                descriptor => {
                    if (descriptor.type === 'P' || descriptor.type === 'M' || descriptor.type === 'C') {
                        this.__bind(descriptor)
                    } else if (descriptor.type === 'I') {
                        Slim.__inject(descriptor)
                    } else if (descriptor.type === 'R') {
                        Slim.__createRepeater(descriptor);
                        this.__bind(descriptor)
                    }
                }
            )
        }

        allChildren = Slim.selectorToArr(this._virtualDOM, '*[bind]');

        for (let child of allChildren) {
            let match = child.innerText.match(/\[\[([\w|.]+)\]\]/g);
            if (match && child.children.firstChild) {
                throw 'Bind Error: Illegal bind attribute use on element type ' + child.localName + ' with nested children.\n' + child.outerHTML;
            }
            if (match) {
                let properties = [];
                for (let i = 0; i < match.length; i++) {
                    let lookup = match[i].match(/([^\[].+[^\]])/)[0];
                    properties.push(lookup)
                }
                let descriptor = {
                    type: 'T',
                    properties: properties,
                    target: child,
                    sourceText: child.innerText
                };
                child.sourceText = child.innerText;
                this.__bind(descriptor)
            }
        }
    }

}

Slim.rxInject = /\{(.+[^(\((.+)\))])\}/
Slim.rxProp = /\[\[(.+[^(\((.+)\))])\]\]/
Slim.rxMethod = /\[\[(.+)(\((.+)\)){1}\]\]/
Slim.__customAttributeProcessors = {};
Slim.__prototypeDict = {};
Slim.__templateDict = {};
Slim.__plugins = {
    'create': [],
    'beforeRender': [],
    'afterRender': [],
    'beforeRemove': []
};

try {
    Slim.__isWCSupported = (function() {
        return ('registerElement' in document
        && 'import' in document.createElement('link')
        && 'content' in document.createElement('template'))
    })()
}
catch (err) {
    Slim.__isWCSupported = false
}

if (Slim.__isWCSupported) {
    Slim.selectorToArr = function(target, selector) {
        return target.querySelectorAll(selector);
    }
} else {
    Slim.selectorToArr = function(target, selector) {
        return Array.prototype.slice.call( target.querySelectorAll(selector) );
    }
}

/**
 *
 * @private
 */
Slim.__initRepeater = function() {
    class SlimRepeater extends Slim {
        get useShadow() {
            return false;
        }

        get sourceData() {
            try {
                let lookup = Slim.__lookup(this._boundParent, this.getAttribute('source'));
                return lookup.obj || []
            }
            catch (err) {
                return []
            }
        }

        onRemoved() {
            this.sourceData.unregisterSlimRepeater(this)
        }

        registerForRender() {
            if (this.pendingRender) return;
            this.pendingRender = true;
            setTimeout( () => {
                this.checkoutRender();
            }, 0);
        }

        checkoutRender() {
            this.pendingRender = false;
            this.renderList();
        }

        renderList() {
            let targetPropName = this.getAttribute('target-attr');
            if (!this.sourceNode) return;
            this.clones && this.clones.forEach( clone => {
                clone.remove();
            });
            this.clones = [];
            //noinspection JSUnusedGlobalSymbols

            this.sourceData.registerSlimRepeater(this);
            this.sourceData.forEach( (dataItem, index) => {
                let clone = this.sourceNode.cloneNode(true);
                clone.removeAttribute('slim-repeat');
                clone.removeAttribute('slim-repeat-as');
                clone.setAttribute('slim-repeat-index', index);
                if (!Slim.__isWCSupported) {
                    this.insertAdjacentHTML('beforeEnd', clone.outerHTML);
                    clone = this.find('*[slim-repeat-index="' + index.toString() + '"]')
                }
                clone[targetPropName] = dataItem;
                clone.data_index = index;
                clone.data_source = this.sourceData;
                clone.sourceText = clone.innerText;
                if (Slim.__isWCSupported) {
                    this.insertAdjacentElement('beforeEnd', clone)
                }
                this.clones.push(clone)
            });
            this._captureBindings();
            for (let clone of this.clones) {
                clone[targetPropName] = clone[targetPropName];
                clone._boundRepeaterParent = this._boundParent;
                if (Slim.__prototypeDict[clone.localName] !== undefined || clone.isSlim) {
                    clone._boundParent = this._boundParent
                }
                else {
                    clone._boundParent = clone
                }
                Slim.selectorToArr(clone, '*').forEach( element => {
                    element._boundParent = clone._boundParent;
                    element._boundRepeaterParent = clone._boundRepeaterParent;
                    element[targetPropName] = clone[targetPropName];
                    element.data_index = clone.data_index;
                    element.data_source = clone.data_source;
                })
            }

            this._executeBindings();
            if (this._isAdjacentRepeater) {
                Slim.__moveChildrenBefore(this._virtualDOM, this, true)
            } else {
                Slim.__moveChildren(this._virtualDOM, this, true)
            }
        }
    }
    Slim.tag('slim-repeat', SlimRepeater);

    window.SlimRepeater = SlimRepeater
};
window.Slim = Slim

// monkey punching array to be observable by slim repeaters
;(function() {

    const originals = {};
    ['push','pop','shift', 'unshift', 'splice', 'sort', 'reverse'].forEach( function(method) {
        originals[method] = Array.prototype[method];
        Array.prototype[method] = function() {
            let result = originals[method].apply(this, arguments);
            if (this.registeredSlimRepeaters) {
                this.registeredSlimRepeaters.forEach( repeater => {
                    repeater.registerForRender();
                })
            }
            return result
        }
    });


    Array.prototype.registerSlimRepeater = function(repeater) {
        if (this.registeredSlimRepeaters === undefined) {
            Object.defineProperty(this, 'registeredSlimRepeaters', {
                enumerable: false,
                configurable: false,
                value: []
            });
        }

        if (this.registeredSlimRepeaters.indexOf(repeater) < 0) {
            this.registeredSlimRepeaters.push(repeater)
        }
    };

    Array.prototype.unregisterSlimRepeater = function(repeater) {
        if (this.registeredSlimRepeaters && this.registeredSlimRepeaters.indexOf(repeater) >= 0) {
            this.registeredSlimRepeaters.splice( this.registeredSlimRepeaters.indexOf(repeater), 1)
        }
    }

})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports.Slim = Slim
}

