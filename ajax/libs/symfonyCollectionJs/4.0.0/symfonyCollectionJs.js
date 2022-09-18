// Polyfill from https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
(function () {

  if ( typeof window.CustomEvent === "function" ) return false;

  function CustomEvent ( event, params ) {
    params = params || { bubbles: false, cancelable: false, detail: null };
    var evt = document.createEvent( 'CustomEvent' );
    evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
    return evt;
   }

  window.CustomEvent = CustomEvent;
})();

var formCollection = function(nodeList, options, param) {
    var settings;
    var eventPrototypeModified              = 'prototypeModified';
    var eventAddMethodCalled                = 'addMethodCalled';
    var eventDeleteMethodCalled             = 'deleteMethodCalled';
    var eventClearMethodCalled              = 'clearMethodCalled';
    var eventRefreshAttributesMethodCalled  = 'refreshAttributesMethodCalled';

    var extend = function (a, b) {
        for (var key in b) {
            if (b.hasOwnProperty(key)) {
                a[key] = b[key];
            }
        }
        return a;
    }

    if (options === undefined || typeof options === 'object') {
        var defaults = {
            max_elems: 100,
            call_post_add_on_init: false,
            post_add: function(new_elem, context) {
                return true;
            },
            post_delete: function(delete_elem, context) {
                return true;
            },
            post_up: function(elem, switched_elem) {
                return true;
            },
            post_down: function(elem, switched_elem) {
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
            console.log('Invalid options');
            return false;
        } else if (options === 'delete' && param === undefined) {
            console.log('Missing index');
            return false;
        }
    }
    if (nodeList instanceof Node)
        nodeList = [nodeList];
    // at this point nodeList is either a real NodeList, or an array
    for (var i = 0; i < nodeList.length; i++) {
        var collection_root        = nodeList[i];

            switch (options) { // particular case, so it's better to have it at the top and forget it
            case 'add':
            collection_root.dispatchEvent(new Event(eventAddMethodCalled));
            return;
            break;
            case 'delete':
            collection_root.dispatchEvent(new CustomEvent(eventDeleteMethodCalled, {detail: param}));
            return;
            break;
            case 'clear':
            collection_root.dispatchEvent(new Event(eventClearMethodCalled));
            return;
            break;
            case 'refreshAttributes':
            collection_root.dispatchEvent(new CustomEvent(eventRefreshAttributesMethodCalled, {detail: param}));
            return;
            break;
        }
        var prototype               = collection_root.getAttribute('data-prototype');
        var n                       = collection_root.children.length;
        var needed_data_for_update  = [];

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
                add_elem_bottom(formCollection.POST_ADD_CONTEXT.ADD_METHOD);
            });

             collection_root.addEventListener(eventDeleteMethodCalled, function(e){
                var param = e.detail;
                var elem = collection_root.children[param];
                delete_elem(elem);
                settings.post_delete(elem, formCollection.POST_DELETE_CONTEXT.DELETE_METHOD);
            });

             collection_root.addEventListener(eventClearMethodCalled, function(e){
                collection_root.textContent = ""; //innerHTML has a bug on IE, and is slower anyway
                n = 0;
            });

             collection_root.addEventListener(eventRefreshAttributesMethodCalled, function(e){
                var param = e.detail;
                update_indexes_from(param);
            });

             var build_node_needed_data_for_update = function(path, attributes) {
                var obj = {
                    path:       path,
                    attributes: attributes
                };
                return obj;
            };

            var createNode = function(html) { // equivalent of JQuery(html)
                var div = document.createElement('div');
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
             var inspect_model_tree = function(modelNode, currentPath) {
                /* First the root, simple (if it's a wrapper there should be nothing, but it can be an input too) */
                var attrs = getAttributesWithThisValue(modelNode, settings.prototype_name); // get attributes with placeholders
                if (Object.keys(attrs).length > 0) {
                    /* the path is an empty array for the root node */
                    needed_data_for_update.push(build_node_needed_data_for_update(currentPath, attrs));
                }
                if ('data-prototype' in attrs) // if the current node is a subcollection
                    return; // no need to dig in its childs, it will be handled separately
                /* Then we need to traverse */
                var modelNodeChilds = modelNode.children;
                for (var i = 0; i < modelNodeChilds.length; i++) {
                    inspect_model_tree(modelNodeChilds[i], currentPath.concat([i]));//concat creates a new array
                }
            };

            var init_needed_data_for_update = function() {
                var modelElement = createNode(prototype);
                inspect_model_tree(modelElement, []);
            };

            var init_elem_listeners = function(elem) {
                var btnAdds = elem.querySelectorAll(settings.btn_add_selector);
                for (var i = 0; i < btnAdds.length; i++) {
                    btnAdds[i].addEventListener('click', function() {
                        var new_elem = add_elem_down(elem);
                        settings.post_add(new_elem, formCollection.POST_ADD_CONTEXT.BTN_ADD);
                    });
                }
                var btnDeletes = elem.querySelectorAll(settings.btn_delete_selector);
                for (var i = 0; i < btnDeletes.length; i++) {
                    btnDeletes[i].addEventListener('click', function() {
                        delete_elem(elem);
                        settings.post_delete(elem, formCollection.POST_DELETE_CONTEXT.BTN_DELETE);
                    });
                }
                var btnUps = elem.querySelectorAll(settings.btn_up_selector);
                for (var i = 0; i < btnUps.length; i++) {
                    btnUps[i].addEventListener('click', function() {
                        var switched_elem = move_elem_up(elem);
                        if (switched_elem) {
                            settings.post_up(elem, switched_elem);
                        }
                    });
                }
                var btnDowns = elem.querySelectorAll(settings.btn_down_selector);
                for (var i = 0; i < btnDowns.length; i++) {
                    btnDowns[i].addEventListener('click', function() {
                        var switched_elem = move_elem_down(elem);
                        if (switched_elem) {
                            settings.post_down(elem, switched_elem);
                        }
                    });
                }
            };

            var getAttributesWithThisValue = function(elem, value) {
                var result = {};
                for (var i = 0; i < elem.attributes.length; i++) {
                    var attr = elem.attributes[i];
                    if (attr.value && attr.value.indexOf(value) !== -1) {
                        result[attr.name] = attr.value;
                    }
                }
                return result;
            };

            var update_index = function(elem, index) {
                /* without regexp, replace only replaces the first occurrence */
                var prototypeNameRegexp = new RegExp(settings.prototype_name, 'g');
                for (var i = 0; i < needed_data_for_update.length; i++) { 
                    var nodeData = needed_data_for_update[i];
                    var node = elem;
                    for (var j = 0; j < nodeData.path.length; j++) {  // we follow the path
                        var childIndex = nodeData.path[j];
                        node = node.children[childIndex];
                    };
                    //now we have the right node
                    var attributesNames = Object.keys(nodeData.attributes);
                    for (var j = 0; j < attributesNames.length; j++) {
                        var name = attributesNames[j];
                        var value = nodeData.attributes[name]; //value has a placeholder
                        node.setAttribute(name, value.replace(prototypeNameRegexp, index));
                    };
                    if ('data-prototype' in node.attributes) // if this node is a subcollection container
                        node.dispatchEvent(new Event(eventPrototypeModified));
                }
            };

            // if i > to the max index, it doesn't cause problems
            var update_indexes_from = function(i) {
                var elements = collection_root.children;
                for (var j = i; j < elements.length; j++) {
                    update_index(elements[j], j);
                }
            };

            var create_elem = function(index) {
                if (index === undefined)
                    index = n;
                var newFormHtml = prototype; // we create an elem with the prototype, but placeholders must be replaced
                var prototypeNameRegexp = new RegExp(settings.prototype_name, 'g');
                //won't replace the ones in data since we put an alias
                newFormHtml = newFormHtml.replace(prototypeNameRegexp, index);
                var newForm = createNode(newFormHtml);
                init_elem_listeners(newForm);
                return newForm;
            };

            var sibling_index = function(node) {
                var i = 0;
                while ((node = node.previousElementSibling) != null) { //previousSibling finds some invisible text elements
                    i++;
                }
                return i;
            };

            var insert_before = function (node, toInsert) {
                // Only supported for HTMLElement, not all Element objects, such as SVGElement.
                node.insertAdjacentElement('beforebegin', toInsert);
            };

            var insert_after = function (node, toInsert) {
                // Only supported for HTMLElement, not all Element objects, such as SVGElement.
                node.insertAdjacentElement('afterend', toInsert);
            };

            var add_elem_down = function(elem) {
                if (n >= settings.max_elems)
                    return false;
                var new_elem = create_elem(sibling_index(elem) + 1);
                insert_after(elem, new_elem);
                n++;
                update_indexes_from(sibling_index(elem) + 2);
                return new_elem;
            };

            var add_elem_bottom = function(context) {
                if (n >= settings.max_elems)
                    return false;
                var new_elem = create_elem();
                collection_root.appendChild(new_elem);
                n++;
                settings.post_add(new_elem, context);
            };

            var delete_elem = function(elem) {
                var index = sibling_index(elem);
                elem.parentNode.removeChild(elem);
                n--;
                update_indexes_from(index);
            };

            var move_elem_up = function(elem) {
                var prev = elem.previousElementSibling; //previousSibling finds some invisible text elements
                if (!prev)
                    return false;
                var newIndex = sibling_index(prev);
                insert_before(prev, elem);
                update_index(elem, newIndex);
                update_index(prev, newIndex + 1);

                return prev;
            };

            var move_elem_down = function(elem) {
                var next = elem.nextElementSibling; //nextSibling finds some invisible text elements
                if (!next)
                    return false;
                var newIndex = sibling_index(next);
                insert_after(next, elem);
                update_index(elem, newIndex);
                update_index(next, newIndex - 1);

                return next;
            };

            var init_existing = function() {
                for (var i = 0; i < collection_root.children.length; i++) {
                    var child = collection_root.children[i];
                    init_elem_listeners(child);
                    if (settings.call_post_add_on_init)
                        settings.post_add(child, formCollection.POST_ADD_CONTEXT.INIT);
                }
            };

            init_existing();
            init_needed_data_for_update();
            if (settings.other_btn_add) {
                var otherBtnAdds = null;
                if (typeof settings.other_btn_add === 'string')
                    otherBtnAdds = document.querySelectorAll(settings.other_btn_add);
                else if (settings.other_btn_add instanceof Node)
                    otherBtnAdds = [settings.other_btn_add];
                else if ((formCollection.jQuery && settings.other_btn_add instanceof formCollection.jQuery) || settings.other_btn_add instanceof NodeList)
                    otherBtnAdds = settings.other_btn_add;
                else {
                    console.log('other_btn_add: bad value, can be a selector or nodes, or a jQuery object.');
                }
                if (otherBtnAdds) {
                    for (var i = 0; i < otherBtnAdds.length; i++) {
                        otherBtnAdds[i].addEventListener('click', function() {
                            add_elem_bottom(formCollection.POST_ADD_CONTEXT.OTHER_BTN_ADD);
                        });
                    }
                }
            }
        };
};

formCollection.POST_ADD_CONTEXT = {
    BTN_ADD:        4,
    OTHER_BTN_ADD:  8,
    INIT:           15,
    ADD_METHOD:     16
};
formCollection.POST_DELETE_CONTEXT = {
    BTN_DELETE:     23,
    DELETE_METHOD:  42
};
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
            var nodeArray = [];
            for (var i = 0; i < this.length; i++) {
                nodeArray.push(this[i]);
            }
            var ret = formCollection(nodeArray, options, param);
            if (!Array.isArray(ret))
                return ret;
            return $(this);
        };
    }
    return formCollection;
}));
