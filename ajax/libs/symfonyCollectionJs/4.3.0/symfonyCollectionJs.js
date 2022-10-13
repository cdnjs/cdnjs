// Polyfill from https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
(function () {

  if ( typeof window.CustomEvent === "function" ) return false;

  function CustomEvent ( event, params ) {
    params = params || { bubbles: false, cancelable: false, detail: null };
    let evt = document.createEvent( 'CustomEvent' );
    evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
    return evt;
   }

  window.CustomEvent = CustomEvent;
})();

let formCollection = function(nodeList, options, param) {
    let settings;
    let eventPrototypeModified              = 'prototypeModified';
    let eventAddMethodCalled                = 'addMethodCalled';
    let eventDeleteMethodCalled             = 'deleteMethodCalled';
    let eventClearMethodCalled              = 'clearMethodCalled';
    let eventRefreshAttributesMethodCalled  = 'refreshAttributesMethodCalled';

    let extend = function (a, b) {
        for (let key in b) {
            if (b.hasOwnProperty(key)) {
                a[key] = b[key];
            }
        }
        return a;
    };

    let getEvent = function(eventName) {
        if (typeof(Event) === 'function') {
            return new Event(eventName);
        }
        let event = document.createEvent('Event');
        event.initEvent(eventName, true, true);
        return event;
    };

    if (options === undefined || typeof options === 'object') {
        let defaults = {
            max_elems: 100,
            call_pre_add_on_init: false,
            call_post_add_on_init: false,
            pre_add: function(context, index) {
                return true;
            },
            post_add: function(new_elem, context, index) {
                return true;
            },
            pre_delete: function(delete_elem, context, index) {
                return true;
            },
            post_delete: function(delete_elem, context, index) {
                return true;
            },
            pre_up: function(elem, switched_elem, index) {
                return true;
            },
            post_up: function(elem, switched_elem, index) {
                return true;
            },
            pre_down: function(elem, switched_elem, index) {
                return true;
            },
            post_down: function(elem, switched_elem, index) {
                return true;
            },
            other_btn_add: null,
            btn_add_selector: '.collection-add',
            btn_delete_selector: '.collection-delete',
            btn_up_selector: '.collection-up',
            btn_down_selector: '.collection-down',
            prototype_name: '__name__'
        };
        settings = extend(defaults, options);
    } else if (typeof options === 'string') {
        if (['add', 'delete', 'clear', 'refreshAttributes'].indexOf(options) === -1) {
            console.error('Invalid options');
            return false;
        } else if (options === 'delete' && param === undefined) {
            console.error('Missing index');
            return false;
        }
    }
    if (nodeList instanceof Node)
        nodeList = [nodeList];
    // at this point nodeList is either a real NodeList, or an array
    for (let i = 0; i < nodeList.length; i++) {
        let collection_root        = nodeList[i];

            switch (options) { // particular case, so it's better to have it at the top and forget it
            case 'add':
            collection_root.dispatchEvent(getEvent(eventAddMethodCalled));
            return;
            break;
            case 'delete':
            collection_root.dispatchEvent(new CustomEvent(eventDeleteMethodCalled, {detail: param}));
            return;
            break;
            case 'clear':
            collection_root.dispatchEvent(getEvent(eventClearMethodCalled));
            return;
            break;
            case 'refreshAttributes':
            collection_root.dispatchEvent(new CustomEvent(eventRefreshAttributesMethodCalled, {detail: param}));
            return;
            break;
        }
        let prototype               = collection_root.getAttribute('data-prototype');
        let n                       = collection_root.children.length;
        let needed_data_for_update  = [];

        /* triggered by a parent collection if this collection is a subcollection */
        collection_root.addEventListener(eventPrototypeModified, function(e){
                if (e.target !== e.currentTarget) // we don't want a parent collection to get events of subcollections
                    return;
                needed_data_for_update  = [];
                prototype               = this.getAttribute('data-prototype'); // not data() ! it doesn't recheck this attribute
                init_needed_data_for_update();
                update_indexes_from(0);
            });

            /* 
             * the listener way below is a trick to allow a second call to formCollection to access the same
             * data (elements, options)
             */
            collection_root.addEventListener(eventAddMethodCalled, function(e){
                add_elem_bottom(formCollection.ADD_CONTEXT.ADD_METHOD);
            });

            collection_root.addEventListener(eventDeleteMethodCalled, function(e){
                let param = e.detail;
                let elem = collection_root.children[param];
                if (settings.pre_delete(elem, formCollection.DELETE_CONTEXT.DELETE_METHOD, param) === false)
                    return;
                delete_elem(elem);
                settings.post_delete(elem, formCollection.DELETE_CONTEXT.DELETE_METHOD, param);
            });

            collection_root.addEventListener(eventClearMethodCalled, function(e){
                collection_root.textContent = ""; //innerHTML has a bug on IE, and is slower anyway
                n = 0;
            });

            collection_root.addEventListener(eventRefreshAttributesMethodCalled, function(e){
                let param = e.detail;
                update_indexes_from(param);
            });

            let build_node_needed_data_for_update = function(path, attributes) {
                let obj = {
                    path:       path,
                    attributes: attributes
                };
                return obj;
            };

            let createNode = function(html) { // equivalent of JQuery(html)
                let div = document.createElement('div');
                div.innerHTML = html.trim();

                // Should be childNodes and not firstChild if there can be several unwrapped elements. But not here
                return div.firstChild; 
            }
            /*
             *
             * Example of result for needed_data_for_update:
             * [
             *      {
             *          path: [],
             *          attributes: [
             *                          name:   'address[__name__]',
             *                          id:     'address___name__',
             *                      ]
             *      },
             *      {
             *          path: [1, 2, 1],
             *          attributes: [
             *                          name:   'address_checbok[__name__]',
             *                          id:     'address_checkbox___name__',
             *                      ]
             *      },
             * ]
             */
            let inspect_model_tree = function(modelNode, currentPath) {
                /* First the root, simple (if it's a wrapper there should be nothing, but it can be an input too) */
                let attrs = getAttributesWithThisValue(modelNode, settings.prototype_name); // get attributes with placeholders
                if (Object.keys(attrs).length > 0) {
                    /* the path is an empty array for the root node */
                    needed_data_for_update.push(build_node_needed_data_for_update(currentPath, attrs));
                }
                if ('data-prototype' in attrs) // if the current node is a subcollection
                    return; // no need to dig in its childs, it will be handled separately
                /* Then we need to traverse */
                let modelNodeChilds = modelNode.children;
                for (let i = 0; i < modelNodeChilds.length; i++) {
                    inspect_model_tree(modelNodeChilds[i], currentPath.concat([i]));//concat creates a new array
                }
            };

            let init_needed_data_for_update = function() {
                let modelElement = createNode(prototype);
                inspect_model_tree(modelElement, []);
            };

            // note : don't calculate the index outside the listeners
            let init_elem_listeners = function(elem) {
                let btnAdds = elem.querySelectorAll(settings.btn_add_selector);
                for (let i = 0; i < btnAdds.length; i++) {
                    btnAdds[i].addEventListener('click', function() {
                        let index = sibling_index(elem) + 1;
                        if (settings.pre_add(formCollection.ADD_CONTEXT.BTN_ADD, index) === false)
                            return;
                        let new_elem = add_elem_down(elem);
                        settings.post_add(new_elem, formCollection.ADD_CONTEXT.BTN_ADD, index);
                    });
                }
                let btnDeletes = elem.querySelectorAll(settings.btn_delete_selector);
                for (let i = 0; i < btnDeletes.length; i++) {
                    btnDeletes[i].addEventListener('click', function() {
                        let index = sibling_index(elem);
                        if (settings.pre_delete(elem, formCollection.DELETE_CONTEXT.BTN_DELETE, index) === false)
                            return;
                        delete_elem(elem);
                        settings.post_delete(elem, formCollection.DELETE_CONTEXT.BTN_DELETE, index);
                    });
                }
                let btnUps = elem.querySelectorAll(settings.btn_up_selector);
                for (let i = 0; i < btnUps.length; i++) {
                    btnUps[i].addEventListener('click', function() {
                        let index = sibling_index(elem);
                        let switched_elem = elem.previousElementSibling; // previousSibling finds some invisible text elements
                        if (!switched_elem || settings.pre_up(elem, switched_elem, index) === false)
                            return;
                        switched_elem = move_elem_up(elem);
                        if (switched_elem) { // should always be true, but I prefer to keep it
                            settings.post_up(elem, switched_elem, index);
                        }
                    });
                }
                let btnDowns = elem.querySelectorAll(settings.btn_down_selector);
                for (let i = 0; i < btnDowns.length; i++) {
                    btnDowns[i].addEventListener('click', function() {
                        let index = sibling_index(elem);
                        let switched_elem = elem.nextElementSibling; // nextSibling finds some invisible text elements
                        if (!switched_elem || settings.pre_down(elem, switched_elem, index) === false)
                            return;
                        switched_elem = move_elem_down(elem);
                        if (switched_elem) { // should always be true, but I prefer to keep it
                            settings.post_down(elem, switched_elem, index);
                        }
                    });
                }
            };

            let getAttributesWithThisValue = function(elem, value) {
                let result = {};
                for (let i = 0; i < elem.attributes.length; i++) {
                    let attr = elem.attributes[i];
                    if (attr.value && attr.value.indexOf(value) !== -1) {
                        result[attr.name] = attr.value;
                    }
                }
                return result;
            };

            let update_index = function(elem, index) {
                /* without regexp, replace only replaces the first occurrence */
                let prototypeNameRegexp = new RegExp(settings.prototype_name, 'g');
                for (let i = 0; i < needed_data_for_update.length; i++) { 
                    let nodeData = needed_data_for_update[i];
                    let node = elem;
                    for (let j = 0; j < nodeData.path.length; j++) {  // we follow the path
                        let childIndex = nodeData.path[j];
                        node = node.children[childIndex];
                    };
                    //now we have the right node
                    let attributesNames = Object.keys(nodeData.attributes);
                    for (let j = 0; j < attributesNames.length; j++) {
                        let name = attributesNames[j];
                        let value = nodeData.attributes[name]; //value has a placeholder
                        node.setAttribute(name, value.replace(prototypeNameRegexp, index));
                    };
                    if ('data-prototype' in node.attributes) // if this node is a subcollection container
                        node.dispatchEvent(getEvent(eventPrototypeModified));
                }
            };

            // if i > to the max index, it doesn't cause problems
            let update_indexes_from = function(i) {
                let elements = collection_root.children;
                for (let j = i; j < elements.length; j++) {
                    update_index(elements[j], j);
                }
            };

            let create_elem = function(index) {
                if (index === undefined)
                    index = n;
                let newFormHtml = prototype; // we create an elem with the prototype, but placeholders must be replaced
                let prototypeNameRegexp = new RegExp(settings.prototype_name, 'g');
                //won't replace the ones in data since we put an alias
                newFormHtml = newFormHtml.replace(prototypeNameRegexp, index);
                let newForm = createNode(newFormHtml);
                init_elem_listeners(newForm);
                return newForm;
            };

            let sibling_index = function(node) {
                let i = 0;
                while ((node = node.previousElementSibling) != null) { //previousSibling finds some invisible text elements
                    i++;
                }
                return i;
            };

            let insert_before = function (node, toInsert) {
                // Only supported for HTMLElement, not all Element objects, such as SVGElement.
                node.insertAdjacentElement('beforebegin', toInsert);
            };

            let insert_after = function (node, toInsert) {
                // Only supported for HTMLElement, not all Element objects, such as SVGElement.
                node.insertAdjacentElement('afterend', toInsert);
            };

            let add_elem_down = function(elem) {
                if (n >= settings.max_elems)
                    return false;
                let new_elem = create_elem(sibling_index(elem) + 1);
                insert_after(elem, new_elem);
                n++;
                update_indexes_from(sibling_index(elem) + 2);
                return new_elem;
            };

            let add_elem_bottom = function(context) {
                if (n >= settings.max_elems)
                    return false;
                if (settings.pre_add(context, n) === false)
                    return;
                let new_elem = create_elem();
                collection_root.appendChild(new_elem);
                n++;
                settings.post_add(new_elem, context, n - 1);
            };

            let delete_elem = function(elem) {
                let index = sibling_index(elem);
                elem.parentNode.removeChild(elem);
                n--;
                update_indexes_from(index);
            };

            let move_elem_up = function(elem) {
                let prev = elem.previousElementSibling; //previousSibling finds some invisible text elements
                if (!prev)
                    return false;
                let newIndex = sibling_index(prev);
                insert_before(prev, elem);
                update_index(elem, newIndex);
                update_index(prev, newIndex + 1);

                return prev;
            };

            let move_elem_down = function(elem) {
                let next = elem.nextElementSibling; //nextSibling finds some invisible text elements
                if (!next)
                    return false;
                let newIndex = sibling_index(next);
                insert_after(next, elem);
                update_index(elem, newIndex);
                update_index(next, newIndex - 1);

                return next;
            };

            let init_existing = function() {
                for (let i = 0; i < collection_root.children.length; i++) {
                    /*
                     * Doesn't prevent the init if returns false (because it's necessary since the element is there anyway)
                     * But could remove the element in future development?
                     */
                    if (settings.call_pre_add_on_init)
                        settings.pre_add(formCollection.ADD_CONTEXT.INIT, i);
                    let child = collection_root.children[i];
                    init_elem_listeners(child);
                    if (settings.call_post_add_on_init)
                        settings.post_add(child, formCollection.ADD_CONTEXT.INIT, i);
                }
            };

            init_existing();
            init_needed_data_for_update();
            if (settings.other_btn_add) {
                let otherBtnAdds = null;
                if (typeof settings.other_btn_add === 'string')
                    otherBtnAdds = document.querySelectorAll(settings.other_btn_add);
                else if (settings.other_btn_add instanceof Node)
                    otherBtnAdds = [settings.other_btn_add];
                else if ((formCollection.jQuery && settings.other_btn_add instanceof formCollection.jQuery) || settings.other_btn_add instanceof NodeList)
                    otherBtnAdds = settings.other_btn_add;
                else {
                    console.error('other_btn_add: bad value, can be a selector or nodes, or a jQuery object.');
                }
                if (otherBtnAdds) {
                    for (let i = 0; i < otherBtnAdds.length; i++) {
                        otherBtnAdds[i].addEventListener('click', function() {
                            add_elem_bottom(formCollection.ADD_CONTEXT.OTHER_BTN_ADD);
                        });
                    }
                }
            }
        };
};

formCollection.ADD_CONTEXT = {
    BTN_ADD:        4,
    OTHER_BTN_ADD:  8,
    INIT:           15,
    ADD_METHOD:     16
};
formCollection.DELETE_CONTEXT = {
    BTN_DELETE:     23,
    DELETE_METHOD:  42
};
formCollection.POST_ADD_CONTEXT = formCollection.ADD_CONTEXT; // to avoid breaking changes, for now
formCollection.POST_DELETE_CONTEXT = formCollection.DELETE_CONTEXT; // to avoid breaking changes, for now
formCollection.jQuery = null;
// UMD : Uses CommonJS, AMD or browser globals to create a jQuery plugin (if jQuery is there)
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals
        if (typeof jQuery !== 'undefined')
            root.returnExports = factory(jQuery);
        else
            root.returnExports = factory();
    }
}(this, function($) {
    if (typeof jQuery !== 'undefined' && jQuery) {
        formCollection.jQuery = $; // jQuery is not necessarily global so it's better to know easily if it's available
        $.fn.formCollection = function (options, param) {
            let nodeArray = [];
            for (let i = 0; i < this.length; i++) {
                nodeArray.push(this[i]);
            }
            let ret = formCollection(nodeArray, options, param);
            if (!Array.isArray(ret))
                return ret;
            return $(this);
        };
    }
    return formCollection;
}));
