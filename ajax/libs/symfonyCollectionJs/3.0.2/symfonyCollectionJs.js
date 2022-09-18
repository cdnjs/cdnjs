// Uses CommonJS, AMD or browser globals to create a jQuery plugin.
(function(factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = function(root, jQuery) {
            if (jQuery === undefined) {
                // require('jQuery') returns a factory that requires window to
                // build a jQuery instance, we normalize how we use modules
                // that require this pattern but the window provided is a noop
                // if it's defined (how jquery works)
                if (typeof window !== 'undefined') {
                    jQuery = require('jquery');
                } else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery);
            return jQuery;
        };
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function($) {
    $.fn.formCollection = function(options, param) {
        var settings;
        var eventPrototypeModified              = 'prototypeModified';
        var eventAddMethodCalled                = 'addMethodCalled';
        var eventDeleteMethodCalled             = 'deleteMethodCalled';
        var eventClearMethodCalled              = 'clearMethodCalled';
        var eventRefreshAttributesMethodCalled  = 'refreshAttributesMethodCalled';

        if (options === undefined || typeof options === 'object') {
            var defaults = {
                max_elems: 100,
                call_post_add_on_init: false,
                post_add: function($new_elem, context) {
                    return true;
                },
                post_delete: function($delete_elem, context) {
                    return true;
                },
                post_up: function($elem, $switched_elem) {
                    return true;
                },
                post_down: function($elem, $switched_elem) {
                    return true;
                },
                other_btn_add: null,
                btn_add_selector: '.collection-add',
                btn_delete_selector: '.collection-delete',
                btn_up_selector: '.collection-up',
                btn_down_selector: '.collection-down',
                prototype_name: '__name__'
            };
            settings = $.extend(true, {}, defaults, options);
        } else if (typeof options === 'string') {
            if ($.inArray(options, ['add', 'delete', 'clear', 'refreshAttributes']) === -1) {
                console.log('Invalid options');
                return false;
            } else if (options === 'delete' && param === undefined) {
                console.log('Missing index');
                return false;
            }
        }
        return $(this).each(function() {
            var $collection_root        = $(this);

            switch (options) { // particular case, so it's better to have it at the top and forget it
                case 'add':
                    $collection_root.trigger(eventAddMethodCalled);
                    return;
                    break;
                case 'delete':
                    $collection_root.trigger(eventDeleteMethodCalled, [param]);
                    return;
                    break;
                case 'clear':
                    $collection_root.trigger(eventClearMethodCalled);
                    return;
                    break;
                case 'refreshAttributes':
                    $collection_root.trigger(eventRefreshAttributesMethodCalled, [param]);
                    return;
                    break;
            }
            var prototype               = $(this).data('prototype');
            var n                       = $(this).children().length;
            var needed_data_for_update  = [];

            /* triggered by a parent collection if this collection is a subcollection */
            $collection_root.on(eventPrototypeModified, function(e){
                if (e.target !== e.currentTarget) // we don't want a parent collection to get events of subcollections
                    return;
                needed_data_for_update  = [];
                prototype               = $(this).attr('data-prototype'); // not data() ! it doesn't recheck this attribute
                init_needed_data_for_update();
                update_indexes_from(0);
            });

            /* 
             * the listener way below is a trick to allow a second call to formCollection to access the same
             * data (elements, options)
             */
            $collection_root.on(eventAddMethodCalled, function(e){
                add_elem_bottom($.fn.formCollection.POST_ADD_CONTEXT.ADD_METHOD);
            });

            $collection_root.on(eventDeleteMethodCalled, function(e, param){
                var $elem = $collection_root.children().eq(param);
                delete_elem($elem);
                settings.post_delete($elem, $.fn.formCollection.POST_DELETE_CONTEXT.DELETE_METHOD);
            });

            $collection_root.on(eventClearMethodCalled, function(e){
                $collection_root.empty();
                n = 0;
            });

            $collection_root.on(eventRefreshAttributesMethodCalled, function(e, param){
                update_indexes_from(param);
            });

            var build_node_needed_data_for_update = function(path, attributes) {
                var obj = {
                    path:       path,
                    attributes: attributes
                };
                return obj;
            };

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
            var inspect_model_tree = function($modelNode, currentPath) {
                /* First the root, simple (if it's a wrapper there should be nothing, but it can be an input too) */
                var attrs = getAttributesWithThisValue($modelNode, settings.prototype_name); // get attributes with placeholders
                if (!$.isEmptyObject(attrs)) {
                    /* the path is an empty array for the root node */
                    needed_data_for_update.push(build_node_needed_data_for_update(currentPath, attrs));
                }
                if ('data-prototype' in attrs) // if the current node is a subcollection
                    return; // no need to dig in its childs, it will be handled separately
                /* Then we need to traverse */
                var $modelNodeChilds = $modelNode.children();
                for (var i = 0; i < $modelNodeChilds.length; i++) {
                    inspect_model_tree($modelNodeChilds.eq(i), currentPath.concat([i]));//concat creates a new array
                }
            };

            var init_needed_data_for_update = function() {
                var $modelElement = $(prototype);

                inspect_model_tree($modelElement, []);
            };

            var init_elem_listeners = function($elem) {
                $elem.find(settings.btn_add_selector).click(function() {
                    var $new_elem = add_elem_down($elem);
                    settings.post_add($new_elem, $.fn.formCollection.POST_ADD_CONTEXT.BTN_ADD);
                });
                $elem.find(settings.btn_delete_selector).click(function() {
                    delete_elem($elem);
                    settings.post_delete($elem, $.fn.formCollection.POST_DELETE_CONTEXT.BTN_DELETE);
                });
                $elem.find(settings.btn_up_selector).click(function() {
                    var $switched_elem = move_elem_up($elem);
                    if ($switched_elem) {
                        settings.post_up($elem, $switched_elem);
                    }
                });
                $elem.find(settings.btn_down_selector).click(function() {
                    var $switched_elem = move_elem_down($elem);
                    if ($switched_elem) {
                        settings.post_down($elem, $switched_elem);
                    }
                });
            };

            var getAttributesWithThisValue = function($elem, value) {
                var result = {};
                $.each($elem[0].attributes, function() {
                    if (this.value && this.value.indexOf(value) !== -1) {
                        result[this.name] = this.value;
                    }
                });
                return result;
            };

            var update_index = function($elem, index) {
                /* without regexp, replace only replaces the first occurrence */
                var prototypeNameRegexp = new RegExp(settings.prototype_name, 'g');
                $.each(needed_data_for_update, function(i, nodeData) {
                    var $node = $elem;
                    $.each(nodeData.path, function(j, childIndex) { // we follow the path
                        $node = $node.children().eq(childIndex);
                    });
                    //now we have the right node
                    $.each(nodeData.attributes, function(name, value) { //value has a placeholder
                        $node.attr(name, value.replace(prototypeNameRegexp, index));
                    });
                    if ('data-prototype' in $node[0].attributes) // if this node is a subcollection container
                        $node.trigger(eventPrototypeModified);
                });
            };

            // if i > to the max index, it doesn't cause problems
            var update_indexes_from = function(i) {
                $collection_root.children().slice(i).each(function() {
                    update_index($(this), i);
                    i++;
                });
            };

            var create_elem = function(index) {
                if (index === undefined)
                    index = n;
                var newFormHtml = prototype; // we create an elem with the prototype, but placeholders must be replaced
                var prototypeNameRegexp = new RegExp(settings.prototype_name, 'g');
                //won't replace the ones in data since we put an alias
                newFormHtml = newFormHtml.replace(prototypeNameRegexp, index);
                var $newForm = $(newFormHtml);
                init_elem_listeners($newForm);
                return $newForm;
            };

            var add_elem_down = function($elem) {
                if (n >= settings.max_elems)
                    return false;
                var $new_elem = create_elem($elem.index() + 1);
                $elem.after($new_elem);
                n++;
                update_indexes_from($elem.index() + 2);
                return $new_elem;
            };

            var add_elem_bottom = function(context) {
                if (n >= settings.max_elems)
                    return false;
                var $new_elem = create_elem();
                $collection_root.append($new_elem);
                n++;
                settings.post_add($new_elem, context);
            };

            var delete_elem = function($elem) {
                var index = $elem.index();
                $elem.remove();
                n--;
                update_indexes_from(index);
            };

            var move_elem_up = function($elem) {
                var $prev = $elem.prev();
                if (!$prev)
                    return false;
                var newIndex = $prev.index();
                $prev.before($elem);
                update_index($elem, newIndex);
                update_index($prev, newIndex + 1);

                return $prev;
            };

            var move_elem_down = function($elem) {
                var $next = $elem.next();
                if (!$next)
                    return false;
                var newIndex = $next.index();
                $next.after($elem);
                update_index($elem, newIndex);
                update_index($next, newIndex - 1);

                return $next;
            };

            var init_existing = function() {
                $collection_root.children().each(function() {
                    init_elem_listeners($(this));
                    if (settings.call_post_add_on_init)
                        settings.post_add($(this), $.fn.formCollection.POST_ADD_CONTEXT.INIT);
                });
            };

            init_existing();
            init_needed_data_for_update();
            if (settings.other_btn_add) {
                var $otherBtnAdd = null;
                if (typeof settings.other_btn_add === 'string')
                    $otherBtnAdd = $(settings.other_btn_add);
                else if (settings.other_btn_add instanceof jQuery)
                    $otherBtnAdd = settings.other_btn_add;
                else {
                    console.log('other_btn_add: bad value, can be a selector or a jQuery object.');
                }
                if ($otherBtnAdd) {
                    $otherBtnAdd.click(function() {
                        add_elem_bottom($.fn.formCollection.POST_ADD_CONTEXT.OTHER_BTN_ADD);
                    });
                }
            }
        });
    };
    $.fn.formCollection.POST_ADD_CONTEXT = {
        BTN_ADD:        4,
        OTHER_BTN_ADD:  8,
        INIT:           15,
        ADD_METHOD:     16
    };
    $.fn.formCollection.POST_DELETE_CONTEXT = {
        BTN_DELETE:     23,
        DELETE_METHOD:  42
    };
}));