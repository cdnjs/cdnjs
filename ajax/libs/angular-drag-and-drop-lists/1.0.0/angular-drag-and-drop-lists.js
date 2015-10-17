/**
 * angular-drag-and-drop-lists v1.0.0
 *
 * Copyright (c) 2014 Marcel Juenemann mail@marcel-junemann.de
 * https://github.com/marceljuenemann/angular-drag-and-drop-lists
 *
 * License: MIT
 */
angular.module('dndLists', [])

    /**
     * Use the dnd-draggable attribute to make your element draggable
     *
     * Attributes:
     * - dnd-draggable      Required attribute. The value has to be an object that represents the data
     *                      of the element. In case of a drag and drop operation the object will be
     *                      serialized and unserialized on the receiving end.
     * - dnd-selected       Callback that is invoked when the element was clicked but not dragged
     * - dnd-effect-allowed Use this attribute to limit the operations that can be performed. Options are:
     *                      - "move": The drag operation will move the element. This is the default
     *                      - "copy": The drag operation will copy the element. There will be a copy cursor.
     *                      - "copyMove": The user can choose between copy and move by pressing the ctrl
     *                        or shift key. *Not supported in IE:* In Internet Explorer this option
     *                        will be the same as "copy". *Not fully supported in Chrome on Windows:*
     *                        In the Windows version of Chrome the cursor will always be the move cursor.
     *                        However, when the user drops an element and has the ctrl key pressed, we
     *                        will perform a copy anyways.
     *                      - HTML5 also specifies the "link" option, but this library does not actively
     *                        support it yet, so use it at your own risk.
     * - dnd-moved          Callback that is invoked when the element was moved. Usually you will remove
     *                      your element from the original list in this callback, since the directive
     *                      is not doing that for you automatically.
     * - dnd-copied         Same as dnd-moved, just that it is called when the element was copied
     *                      instead of moved.
     *
     * CSS classes:
     * - dndDragging        This class will be added to the element while the element is being dragged.
     *                      It will affect both the element you see while dragging and the source
     *                      element that stays at it's position. Do not try to hide the source element
     *                      with this class, because that will abort the drag operation.
     * - dndDraggingSource  This class will be added to the element after the drag operation was started,
     *                      meaning it only affects the original element that is still at it's source
     *                      position, and not the "element" that the user is dragging with his mouse pointer
     */
    .directive('dndDraggable', ['$parse', '$timeout', 'dndDropEffectWorkaround', 'dndDragTypeWorkaround',
                        function($parse,   $timeout,   dndDropEffectWorkaround,   dndDragTypeWorkaround) {
        return function(scope, element, attr) {
            // Set the HTML5 draggable attribute on the element
            element.attr("draggable", "true");

            /**
             * When the drag operation is started we have to prepare the dataTransfer object,
             * which is the primary way we communicate with the target element
             */
            element.on('dragstart', function(event) {
                // Serialize the data associated with this element. IE only supports the Text drag type
                event.dataTransfer.setData("Text", angular.toJson(scope.$eval(attr.dndDraggable)));

                // Only allow actions specified in dnd-effect-allowed attribute
                event.dataTransfer.effectAllowed = attr.dndEffectAllowed || "move";

                // Add CSS classes. See documentation above
                element.addClass("dndDragging");
                $timeout(function() { element.addClass("dndDraggingSource"); }, 0);

                // Workarounds for stupid browsers, see description below
                dndDropEffectWorkaround.dropEffect = "none";
                dndDragTypeWorkaround.isDragging = true;

                event.stopPropagation();
            });

            /**
             * The dragend event is triggered when the element was dropped or when the drag
             * operation was aborted (e.g. hit escape button). Depending on the executed action
             * we will invoke the callbacks specified with the dnd-moved or dnd-copied attribute.
             */
            element.on('dragend', function(event) {
                // If the dropEffect is none it means that the drag action was aborted or
                // that the browser does not support this field. In either case we use
                // the fallback which was initialized to none
                var dropEffect = event.dataTransfer.dropEffect !== "none"
                               ? event.dataTransfer.dropEffect : dndDropEffectWorkaround.dropEffect;

                // Invoke callbacks
                scope.$apply(function() {
                    switch (dropEffect) {
                        case "move":
                            $parse(attr.dndMoved)(scope);
                            break;

                        case "copy":
                            $parse(attr.dndCopied)(scope);
                            break;
                    }
                });

                // Clean up
                element.removeClass("dndDragging");
                element.removeClass("dndDraggingSource");
                dndDragTypeWorkaround.isDragging = false;
                event.stopPropagation();
            });

            /**
             * When the element is clicked we invoke the callback function
             * specified with the dnd-selected attribute.
             */
            element.on('click', function(event) {
                scope.$apply(function() {
                    $parse(attr.dndSelected)(scope);
                });

                event.stopPropagation();
            });

            /**
             * Workaround to make element draggable in IE9
             */
            element.on('selectstart', function() {
                this.dragDrop();
                return false;
            });
        };
    }])

    /**
     * Use the dnd-list attribute to make your list element a dropzone. Usually you will add a single li
     * element as child with the ng-repeat directive. If you don't do that, we will not be able to position
     * the dropped element correctly. If you want your list to be sortable, also add the dnd-draggable
     * directive to your li element(s). Both the dnd-list and it's direct children must have position: relative
     * CSS style, otherwise the positioning algorithm will not be able to determine the correct placeholder
     * position in all browsers. If you use nested dnd-lists, make sure that all elements excecpt for the
     * dnd-lists and it's direct children have the pointer-events: none CSS style.
     *
     * Attributes:
     * - dnd-list           Required attribute. The value has to be the array in which the data of the
     *                      dropped element should be inserted.
     *
     * CSS classes:
     * - dndPlaceholder     When an element is dragged over the list, a new placeholder child element will be
     *                      added. This element is of type li and has the class dndPlaceholder set.
     * - dndDragover        This class will be added to the list while an element is being dragged over the list.
     */
    .directive('dndList', ['$timeout', 'dndDropEffectWorkaround', 'dndDragTypeWorkaround',
                   function($timeout,   dndDropEffectWorkaround,   dndDragTypeWorkaround) {
        return function(scope, element, attr) {
            // While an element is dragged over the list, this placeholder element is inserted
            // at the location where the element would be inserted after dropping
            var placeholder = angular.element("<li class='dndPlaceholder'></li>");
            var placeholderNode = placeholder[0];
            var listNode = element[0];

            /**
             * The dragover event is triggered "every few hundred milliseconds" while an element
             * is being dragged over our list, or over an child element.
             */
            element.on('dragover', function(event) {
                // Disallow drop if it comes from an external source or is not text.
                // Usually we would use a custom drag type for this, but IE doesn't support that.
                if (!dndDragTypeWorkaround.isDragging) return true;
                if (!isDropAllowed(event.dataTransfer.types)) return true;

                // First of all, make sure that the placeholder is shown
                // This is especially important if the list is empty
                if (placeholderNode.parentNode != listNode) {
                    element.append(placeholder);
                }

                if (event.target.parentNode === listNode && event.target !== placeholderNode) {
                    // The element is being dragged over one of our child nodes. Now we have
                    // to decide at which position to show the placeholder: If the mouse pointer
                    // is in the upper half of the child element, we place it before the child
                    // element, otherwise below it. In Chrome we can just use offsetY, but in
                    // Firefox we have to use layerY, which only works if the child element has
                    // position relative. In IE this branch is never reached because the dragover
                    // event is only fired for the listNode, not for it's children
                    var beforeOrAfter = (event.offsetY || event.layerY) < event.target.offsetHeight / 2;
                    listNode.insertBefore(placeholderNode, beforeOrAfter ? event.target : event.target.nextSibling);
                } else if (event.target === listNode) {
                    // This branch is reached when we are dragging directly over the list element.
                    // Usually we wouldn't need to do anything here, but the IE does not fire it's
                    // events for the child element, only for the list directly. Therefore we repeat
                    // the positioning algorithm for IE here.
                    // The logic is the same as above: If the mouse pointer is in the upper half of
                    // an element, we position the placeholder above that element. The only difference
                    // is that this time the mouse position is relative to the listNode, and not to
                    // the child element.
                    // The code could be simplified by simply looping through all elements, but this
                    // implementation is more efficent because it usually only checks one neighbor element
                    if (event.offsetY < placeholderNode.offsetTop) {
                        // Check if we should move the placeholder element one spot towards the top
                        // Note that display none elements will have offsetTop and offsetHeight set to
                        // zero, therefore we need a special check for them
                        while (placeholderNode.previousElementSibling
                               && (placeholderNode.previousElementSibling.offsetHeight === 0
                                   || event.offsetY < placeholderNode.previousElementSibling.offsetTop
                                                    + placeholderNode.previousElementSibling.offsetHeight / 2)) {
                            listNode.insertBefore(placeholderNode, placeholderNode.previousElementSibling);
                        }
                    } else {
                        // Check if we should move the placeholder element one spot towards the bottom
                        while (placeholderNode.nextElementSibling &&
                               event.offsetY > placeholderNode.nextElementSibling.offsetTop
                                             + placeholderNode.nextElementSibling.offsetHeight / 2) {
                            listNode.insertBefore(placeholderNode, placeholderNode.nextElementSibling.nextElementSibling);
                        }
                    }
                }

                element.addClass("dndDragover");
                event.preventDefault();
                event.stopPropagation();
                return false;
            });

            /**
             * When the element is dropped, we use the position of the placeholder element as the
             * position where we insert the transferred data. This assumes that the list has exactly
             * one child element per array element.
             */
            element.on('drop', function(event) {
                // Unserialize the data that was serialized in dragstart. According to the HTML5 specs,
                // the "Text" drag type will be converted to text/plain, but IE does not do that.
                var transferredObject = JSON.parse(event.dataTransfer.getData("Text")
                                                || event.dataTransfer.getData("text/plain"));

                // Retrieve the JSON array in which we are going to insert the transferred object
                var targetArray = scope.$eval(attr.dndList);

                // We use the position of the placeholder node to determine at which
                // position of the array we will insert the object
                var placeholderIndex = Array.prototype.indexOf.call(listNode.children, placeholderNode);
                scope.$apply(function() {
                    targetArray.splice(placeholderIndex, 0, transferredObject);
                });

                // In Chrome on Windows the dropEffect will always be none...
                // We have to determine the actual effect manually from the allowed effects
                if (event.dataTransfer.dropEffect === "none") {
                    dndDropEffectWorkaround.dropEffect = event.dataTransfer.effectAllowed === "copyMove"
                                                       ? (event.ctrlKey ? "copy" : "move")
                                                       :  event.dataTransfer.effectAllowed;
                }

                // Clean up
                placeholder.remove();
                element.removeClass("dndDragover");
                event.preventDefault();
                event.stopPropagation();
                return false;
            });

            /**
             * We have to remove the placeholder when the element is no longer being dragged over our list.
             * The problem is that the dragleave event is not only fired when the element leaves our list,
             * but also when it leaves a child element -- so practically it's fired all the time. As a
             * workaround we wait a few milliseconds and then check if the dndDragover class was added
             * again. If it is there, dragover must have been called in the meantime, i.e. the element
             * is still dragging over the list. If you know a better way of doing this, please tell me!
             */
            element.on('dragleave', function(event) {
                element.removeClass("dndDragover");
                $timeout(function() {
                    if (!element.hasClass("dndDragover")) {
                        placeholder.remove();
                    }
                }, 100);
            });

            /**
             * Check if the dataTransfer object contains a drag type that we can handle. In old versions of
             * IE the types collection will not even be there, so we just assume a drop is possible.
             */
            function isDropAllowed(types) {
                if (!types) return true;
                for (var i = 0; i < types.length; i++) {
                    if (types[i] === "Text" || types[i] === "text/plain") return true;
                }

                return false;
            }
        };
    }])

    /**
     * This workaround handles the fact that Internet Explorer does not support drag types other than "Text"
     * and "URL". That means we can not know whether the data comes from one of our elements or is just some
     * other data like a text selection. As a workaround we save the isDragging flag in here. When a dropover
     * event occurs, we only allow the drop if we are already dragging, because that means the element is ours.
     * Note that this workaround also prevents the cool feature of dragging list elements accross browser tabs.
     */
    .factory('dndDragTypeWorkaround', function(){ return {} })

    /**
     * Chrome on Windows does not set the dropEffect field, which we need in dragend to determine whether a drag
     * operation was successful. Therefore we have to maintain it in this global variable. The bug report for
     * that has been open for years: https://code.google.com/p/chromium/issues/detail?id=39399
     */
    .factory('dndDropEffectWorkaround', function(){ return {} });
