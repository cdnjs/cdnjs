
Ink.createModule('Ink.UI.DragDrop', 1, ['Ink.Dom.Element_1', 'Ink.Dom.Event_1', 'Ink.Dom.Css_1', 'Ink.Util.Array_1', 'Ink.UI.Common_1', 'Ink.Dom.Selector_1'], function(InkElement, InkEvent, InkCss, InkArray, UICommon, Selector){
    'use strict';

    function findElementUnderMouse(opt) {
        // TODO take advantage of getElementsFromPoint when it comes out
        opt.exceptFor.style.display = 'none';

        var ret = document.elementFromPoint(
            opt.x,
            opt.y);

        opt.exceptFor.style.display = '';

        return ret;
    }

    function DragDrop() {
        UICommon.BaseUIComponent.apply(this, arguments);
    }

    DragDrop._name = 'DragDrop_1';

    DragDrop._optionDefinition = {
        // dragdropContainer: ['Element', '.dragdrop-container'], - is this._element
        dragItem:       ['String', '.drag-item'],
        dragHandle:     ['String', '.drag-handle'],
        dropZone:       ['String', '.drop-zone'],
        ignoreDrag:     ['String', '.drag-ignore'],
        draggedCloneClass: ['String', 'drag-cloned-item'],
        placeholderClass: ['String', 'drag-placeholder-item'],
        onDrag:         ['Function', null],
        onDrop:         ['Function', null]
    };

    DragDrop.prototype = {
        /**
         * A replacement for Draggables, Droppables, and SortableList. It aims to be good at creating draggables, droppables and sortable lists at the same time while keeping it simple for everyone.
         *
         * A DragDrop component may contain one or more "dropZone"s, which are the areas where the "dragItem"s can be dropped. You can identify elements as being a dropZone or a dragItem by using the correct selectors (".drag-item" and ".drop-zone").
         *
         * @class Ink.UI.DragDrop
         * @constructor
         * @version 1
         * @param {Element} [element] Root element for the DragDrop. It can contain one or more dropzones.
         * @param {Object} [options]
         *  Options object, containing:
         * @param {String} [options.dragItem='.drag-item']
         *  Selector for the items to be dragged
         * @param {String} [options.dragHandle='.drag-handle']
         *  Selector for a dragging handle. You won't be able to drag other parts of the dragItem.
         * @param {String} [options.dropZone='.drop-zone']
         *  Selector of drop zones. Should add this to the element itself.
         * @param {String} [options.ignoreDrag='.drag-ignore']
         *  Selector of places where you can't drag.
         * @param {String} [options.draggedCloneClass='drag-cloned-item']
         *  Class for the cloned (and position:fixed'ed) element.
         * @param {String} [options.placeholderClass='drag-placeholder-item']
         *  Class for the placeholder clone
         * @param {Function} [options.onDrag]
         *  Called when dragging starts. Takes an `{ dragItem, dropZone }` object.
         * @param {Function} [options.onDrop]
         *  Called when dragging ends. Takes an `{ origin, dragItem, dropZone }` object.
         *
         * @sample Ink_UI_DragDrop_1.html
         **/
        _init: function() {
            this._dragActive = false;

            this._draggedElm = null;
            this._clonedElm = null;
            this._placeholderElm = null;
            this._originalDrop = null;

            this._mouseDelta = [0, 0];

            this._addEvents();
        },

        _addEvents: function() {
            InkEvent.on(this._element, 'mousedown touchstart', Ink.bindEvent(this._onMouseDown, this));
        },

        _onMouseDown: function(event) {
            var tgt = InkEvent.element(event);

            var draggedElm = InkElement.findUpwardsBySelector(tgt, this._options.dragItem);

            var elmIgnoreDraggable = InkElement.findUpwardsBySelector(tgt, this._options.ignoreDrag);

            if(draggedElm && !elmIgnoreDraggable) {
                // has handler
                var handleElm = Ink.s(this._options.dragHandle, draggedElm);
                if(handleElm && InkElement.findUpwardsBySelector(tgt, this._options.dragHandle)) {
                    this._dragActive = true;
                } else if (!handleElm) {
                    this._dragActive = true;
                }

                if (this._dragActive) {
                    InkEvent.stopDefault(event);
                    this._startDrag(event, draggedElm);
                }
            }
        },

        _startDrag: function(event, draggedElm) {
            // TODO rename
            this._clonedElm = draggedElm.cloneNode(true);
            this._placeholderElm = draggedElm.cloneNode(false);

            InkCss.addClassName(this._clonedElm, this._options.draggedCloneClass);
            this._clonedElm.removeAttribute('id');

            InkCss.addClassName(this._placeholderElm, this._options.placeholderClass);
            this._placeholderElm.removeAttribute('id');

            var rect = draggedElm.getBoundingClientRect();
            var dragElmDims = [
                rect.right - rect.left,
                rect.bottom - rect.top
            ];

            this._clonedElm.style.width = dragElmDims[0] + 'px';
            this._clonedElm.style.height = dragElmDims[1] + 'px';

            this._placeholderElm.style.width = dragElmDims[0] + 'px';
            this._placeholderElm.style.height = dragElmDims[1] + 'px';
            this._placeholderElm.style.visibility = 'hidden';

            // TODO goes in style
            this._clonedElm.style.position = 'fixed';
            this._clonedElm.style.zIndex = '1000';
            this._clonedElm.style.left = rect.left + 'px';
            this._clonedElm.style.top = rect.top + 'px';

            var mousePos = InkEvent.pointer(event);
            var dragElmPos = InkElement.offset(draggedElm);
            this._mouseDelta = [
                (mousePos.x - dragElmPos[0]),
                (mousePos.y - dragElmPos[1])
            ];

            this._clonedElm.style.opacity = '0.6';

            draggedElm.parentNode.insertBefore(this._clonedElm, draggedElm);

            // TODO rename
            this._draggedElm = draggedElm;

            draggedElm.parentNode.insertBefore(this._placeholderElm, draggedElm);
            InkCss.addClassName(draggedElm, 'hide-all');

            var hasOnDrag = typeof this._options.onDrag === 'function';
            var hasOnDrop = typeof this._options.onDrop === 'function';

            if (hasOnDrag || hasOnDrop) {
                var dragEvent = {
                    dragItem: this._draggedElm,
                    dropZone: this.getDropZone(this._draggedElm)
                };

                if (hasOnDrag) {
                    this._options.onDrag.call(this, dragEvent);
                }

                if (hasOnDrop) {
                    this._originalDrop = dragEvent.dropZone;
                }
            }

            var mouseMoveThrottled = InkEvent.throttle(this._onMouseMove, 50, {
                // Prevent the default of events
                preventDefault: true,
                bind: this
            });

            InkEvent.on(document, 'mousemove.inkdraggable touchmove.inkdraggable', mouseMoveThrottled);
            InkEvent.on(document, 'mouseup.inkdraggable touchend.inkdraggable',
                Ink.bindEvent(this._onMouseUp, this));
        },

        _onMouseMove: function(event) {
            if (!this._dragActive) { return; }

            var mousePos = InkEvent.pointer(event);

            var scrollLeft = InkElement.scrollWidth();
            var scrollTop = InkElement.scrollHeight();

            this._clonedElm.style.left =
                (mousePos.x - this._mouseDelta[0] - scrollLeft) + 'px';
            this._clonedElm.style.top =
                (mousePos.y - this._mouseDelta[1] - scrollTop) + 'px';

            var elUnderMouse = findElementUnderMouse({
                x: mousePos.x - scrollLeft,
                y: mousePos.y - scrollTop,
                exceptFor: this._clonedElm
            });

            var dropZoneUnderMouse =
                this.getDropZone(elUnderMouse);

            var isMyDropZone = dropZoneUnderMouse && (
                InkElement.isAncestorOf(this._element, dropZoneUnderMouse) ||
                this._element === dropZoneUnderMouse);

            if(dropZoneUnderMouse && isMyDropZone) {
                var otherDragItem =
                    InkElement.findUpwardsBySelector(elUnderMouse, this._options.dragItem);

                if (otherDragItem && this.isDragItem(otherDragItem)) {
                    // The mouse cursor is over another drag-item
                    this._insertPlaceholder(otherDragItem);
                } else if (this._dropZoneIsEmpty(dropZoneUnderMouse)) {
                    // The mouse cursor is over an empty dropzone, so there is nowhere to put it "after" or "before"
                    dropZoneUnderMouse.appendChild(this._placeholderElm);
                }
            }
            // Otherwise, the cursor is outside anything useful
        },

        /**
         * Returns whether a given .drag-item element is a plain old .drag-item element
         * and not one of the clones we're creating or the element we're really dragging.
         *
         * Used because the selector ".drag-item" finds these elements we don't consider drag-items
         *
         * @method isDragItem
         * @param elm {Element} The element to test.
         * @public
         **/
        isDragItem: function (elm) {
            return (
                Selector.matchesSelector(elm, this._options.dragItem) &&
                elm !== this._draggedElm &&
                elm !== this._placeholderElm &&
                elm !== this._clonedElm);
        },

        _dropZoneIsEmpty: function (dropZone) {
            // Find elements with the class .drag-item in the drop-zone
            var dragItems = Ink.ss(this._options.dragItem, dropZone);

            // Make sure none of these elements are actually the dragged element,
            // the placeholder, or the position:fixed clone.
            return !InkArray.some(dragItems, Ink.bindMethod(this, 'isDragItem'));
        },

        _onMouseUp: function() {
            if (!this._dragActive) { return; }

            // The actual dropping is just putting our *real* node where the placeholder once was.
            InkElement.insertBefore(this._draggedElm, this._placeholderElm);

            InkElement.remove(this._placeholderElm);
            InkElement.remove(this._clonedElm);

            InkCss.removeClassName(this._draggedElm, 'hide-all');

            InkEvent.off(document, '.inkdraggable');

            this._dragActive = false;

            if (typeof this._options.onDrop === 'function') {
                this._options.onDrop.call(this, {
                    origin: this._originalDrop,
                    dragItem: this._draggedElm,
                    dropZone: this.getDropZone(this._draggedElm)
                });
            }

            this._placeholderElm = null;
            this._clonedElm = null;
            this._draggedElm = null;
            this._originalDrop = null;
        },

        /**
         * Get the dropZone containing the given element.
         *
         * @method getDropZone
         * @param dragItem {Element} The dragItem to find the dropZone of
         * @returns {Element}
         * @public
         **/
        getDropZone: function (dragItem) {
            var ret = InkElement.findUpwardsBySelector(
                dragItem, this._options.dropZone) || this._element;

            if (InkElement.isAncestorOf(this._element, ret) || ret === this._element) {
                return ret;
            }

            return null;
        },

        /**
         * Returns what element the user is dragging, or `null` if no drag is occurring.
         *
         * @method getDraggedElement
         * @returns {Element|null} Element being dragged
         * @public
         **/
        getDraggedElement: function () {
            if (!this.dragActive) {
                return null;
            }

            return this._draggedElm;
        },

        /**
         * Called when mouse has moved over a new element
         *
         * Given a competitor drag-item, it figures out
         * whether we want to put our placeholder *after* it or *before* it.
         *
         **/
        _insertPlaceholder: function(elm) {
            var goesAfter = true;

            if (!InkArray.inArray(this._placeholderElm, InkElement.previousSiblings(elm))) {
                goesAfter = false;
            }

            if(goesAfter) {
                InkElement.insertAfter(this._placeholderElm, elm);
            } else {
                InkElement.insertBefore(this._placeholderElm, elm);
            }
        },

        /**
         * Destroy your DragDrop, removing it from the DOM
         *
         * @method destroy
         * @public
         * @returns {void}
         **/
        destroy: function () {
            if (this._dragActive) {
                InkEvent.off(document, '.inkdraggable');
            }
            UICommon.destroyComponent.call(this);
        }
    };

    UICommon.createUIComponent(DragDrop);

    return DragDrop;
});

