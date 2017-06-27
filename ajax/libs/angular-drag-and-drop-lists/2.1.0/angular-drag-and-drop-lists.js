/**
 * angular-drag-and-drop-lists v2.1.0
 *
 * Copyright (c) 2014 Marcel Juenemann marcel@juenemann.cc
 * Copyright (c) 2014-2017 Google Inc.
 * https://github.com/marceljuenemann/angular-drag-and-drop-lists
 *
 * License: MIT
 */
(function(dndLists) {

  // In standard-compliant browsers we use a custom mime type and also encode the dnd-type in it.
  // However, IE and Edge only support a limited number of mime types. The workarounds are described
  // in https://github.com/marceljuenemann/angular-drag-and-drop-lists/wiki/Data-Transfer-Design
  var MIME_TYPE = 'application/x-dnd';
  var EDGE_MIME_TYPE = 'application/json';
  var MSIE_MIME_TYPE = 'Text';

  // All valid HTML5 drop effects, in the order in which we prefer to use them.
  var ALL_EFFECTS = ['move', 'copy', 'link'];

  /**
   * Use the dnd-draggable attribute to make your element draggable
   *
   * Attributes:
   * - dnd-draggable      Required attribute. The value has to be an object that represents the data
   *                      of the element. In case of a drag and drop operation the object will be
   *                      serialized and unserialized on the receiving end.
   * - dnd-effect-allowed Use this attribute to limit the operations that can be performed. Valid
   *                      options are "move", "copy" and "link", as well as "all", "copyMove",
   *                      "copyLink" and "linkMove". The semantics of these operations are up to you
   *                      and have to be implemented using the callbacks described below. If you
   *                      allow multiple options, the user can choose between them by using the
   *                      modifier keys (OS specific). The cursor will be changed accordingly,
   *                      expect for IE and Edge, where this is not supported.
   * - dnd-type           Use this attribute if you have different kinds of items in your
   *                      application and you want to limit which items can be dropped into which
   *                      lists. Combine with dnd-allowed-types on the dnd-list(s). This attribute
   *                      must be a lower case string. Upper case characters can be used, but will
   *                      be converted to lower case automatically.
   * - dnd-disable-if     You can use this attribute to dynamically disable the draggability of the
   *                      element. This is useful if you have certain list items that you don't want
   *                      to be draggable, or if you want to disable drag & drop completely without
   *                      having two different code branches (e.g. only allow for admins).
   *
   * Callbacks:
   * - dnd-dragstart      Callback that is invoked when the element was dragged. The original
   *                      dragstart event will be provided in the local event variable.
   * - dnd-moved          Callback that is invoked when the element was moved. Usually you will
   *                      remove your element from the original list in this callback, since the
   *                      directive is not doing that for you automatically. The original dragend
   *                      event will be provided in the local event variable.
   * - dnd-copied         Same as dnd-moved, just that it is called when the element was copied
   *                      instead of moved, so you probably want to implement a different logic.
   * - dnd-linked         Same as dnd-moved, just that it is called when the element was linked
   *                      instead of moved, so you probably want to implement a different logic.
   * - dnd-canceled       Callback that is invoked if the element was dragged, but the operation was
   *                      canceled and the element was not dropped. The original dragend event will
   *                      be provided in the local event variable.
   * - dnd-dragend        Callback that is invoked when the drag operation ended. Available local
   *                      variables are event and dropEffect.
   * - dnd-selected       Callback that is invoked when the element was clicked but not dragged.
   *                      The original click event will be provided in the local event variable.
   * - dnd-callback       Custom callback that is passed to dropzone callbacks and can be used to
   *                      communicate between source and target scopes. The dropzone can pass user
   *                      defined variables to this callback.
   *
   * CSS classes:
   * - dndDragging        This class will be added to the element while the element is being
   *                      dragged. It will affect both the element you see while dragging and the
   *                      source element that stays at it's position. Do not try to hide the source
   *                      element with this class, because that will abort the drag operation.
   * - dndDraggingSource  This class will be added to the element after the drag operation was
   *                      started, meaning it only affects the original element that is still at
   *                      it's source position, and not the "element" that the user is dragging with
   *                      his mouse pointer.
   */
  dndLists.directive('dndDraggable', ['$parse', '$timeout', function($parse, $timeout) {
    return function(scope, element, attr) {
      // Set the HTML5 draggable attribute on the element.
      element.attr("draggable", "true");

      // If the dnd-disable-if attribute is set, we have to watch that.
      if (attr.dndDisableIf) {
        scope.$watch(attr.dndDisableIf, function(disabled) {
          element.attr("draggable", !disabled);
        });
      }

      /**
       * When the drag operation is started we have to prepare the dataTransfer object,
       * which is the primary way we communicate with the target element
       */
      element.on('dragstart', function(event) {
        event = event.originalEvent || event;

        // Check whether the element is draggable, since dragstart might be triggered on a child.
        if (element.attr('draggable') == 'false') return true;

        // Initialize global state.
        dndState.isDragging = true;
        dndState.itemType = attr.dndType && scope.$eval(attr.dndType).toLowerCase();

        // Set the allowed drop effects. See below for special IE handling.
        dndState.dropEffect = "none";
        dndState.effectAllowed = attr.dndEffectAllowed || ALL_EFFECTS[0];
        event.dataTransfer.effectAllowed = dndState.effectAllowed;

        // Internet Explorer and Microsoft Edge don't support custom mime types, see design doc:
        // https://github.com/marceljuenemann/angular-drag-and-drop-lists/wiki/Data-Transfer-Design
        var item = scope.$eval(attr.dndDraggable);
        var mimeType = MIME_TYPE + (dndState.itemType ? ('-' + dndState.itemType) : '');
        try {
          event.dataTransfer.setData(mimeType, angular.toJson(item));
        } catch (e) {
          // Setting a custom MIME type did not work, we are probably in IE or Edge.
          var data = angular.toJson({item: item, type: dndState.itemType});
          try {
            event.dataTransfer.setData(EDGE_MIME_TYPE, data);
          } catch (e) {
            // We are in Internet Explorer and can only use the Text MIME type. Also note that IE
            // does not allow changing the cursor in the dragover event, therefore we have to choose
            // the one we want to display now by setting effectAllowed.
            var effectsAllowed = filterEffects(ALL_EFFECTS, dndState.effectAllowed);
            event.dataTransfer.effectAllowed = effectsAllowed[0];
            event.dataTransfer.setData(MSIE_MIME_TYPE, data);
          }
        }

        // Add CSS classes. See documentation above.
        element.addClass("dndDragging");
        $timeout(function() { element.addClass("dndDraggingSource"); }, 0);

        // Try setting a proper drag image if triggered on a dnd-handle (won't work in IE).
        if (event._dndHandle && event.dataTransfer.setDragImage) {
          event.dataTransfer.setDragImage(element[0], 0, 0);
        }

        // Invoke dragstart callback and prepare extra callback for dropzone.
        $parse(attr.dndDragstart)(scope, {event: event});
        if (attr.dndCallback) {
          var callback = $parse(attr.dndCallback);
          dndState.callback = function(params) { return callback(scope, params || {}); };
        }

        event.stopPropagation();
      });

      /**
       * The dragend event is triggered when the element was dropped or when the drag
       * operation was aborted (e.g. hit escape button). Depending on the executed action
       * we will invoke the callbacks specified with the dnd-moved or dnd-copied attribute.
       */
      element.on('dragend', function(event) {
        event = event.originalEvent || event;

        // Invoke callbacks. Usually we would use event.dataTransfer.dropEffect to determine
        // the used effect, but Chrome has not implemented that field correctly. On Windows
        // it always sets it to 'none', while Chrome on Linux sometimes sets it to something
        // else when it's supposed to send 'none' (drag operation aborted).
        scope.$apply(function() {
          var dropEffect = dndState.dropEffect;
          var cb = {copy: 'dndCopied', link: 'dndLinked', move: 'dndMoved', none: 'dndCanceled'};
          $parse(attr[cb[dropEffect]])(scope, {event: event});
          $parse(attr.dndDragend)(scope, {event: event, dropEffect: dropEffect});
        });

        // Clean up
        dndState.isDragging = false;
        dndState.callback = undefined;
        element.removeClass("dndDragging");
        element.removeClass("dndDraggingSource");
        event.stopPropagation();

        // In IE9 it is possible that the timeout from dragstart triggers after the dragend handler.
        $timeout(function() { element.removeClass("dndDraggingSource"); }, 0);
      });

      /**
       * When the element is clicked we invoke the callback function
       * specified with the dnd-selected attribute.
       */
      element.on('click', function(event) {
        if (!attr.dndSelected) return;

        event = event.originalEvent || event;
        scope.$apply(function() {
          $parse(attr.dndSelected)(scope, {event: event});
        });

        // Prevent triggering dndSelected in parent elements.
        event.stopPropagation();
      });

      /**
       * Workaround to make element draggable in IE9
       */
      element.on('selectstart', function() {
        if (this.dragDrop) this.dragDrop();
      });
    };
  }]);

  /**
   * Use the dnd-list attribute to make your list element a dropzone. Usually you will add a single
   * li element as child with the ng-repeat directive. If you don't do that, we will not be able to
   * position the dropped element correctly. If you want your list to be sortable, also add the
   * dnd-draggable directive to your li element(s).
   *
   * Attributes:
   * - dnd-list             Required attribute. The value has to be the array in which the data of
   *                        the dropped element should be inserted. The value can be blank if used
   *                        with a custom dnd-drop handler that always returns true.
   * - dnd-allowed-types    Optional array of allowed item types. When used, only items that had a
   *                        matching dnd-type attribute will be dropable. Upper case characters will
   *                        automatically be converted to lower case.
   * - dnd-effect-allowed   Optional string expression that limits the drop effects that can be
   *                        performed in the list. See dnd-effect-allowed on dnd-draggable for more
   *                        details on allowed options. The default value is all.
   * - dnd-disable-if       Optional boolean expresssion. When it evaluates to true, no dropping
   *                        into the list is possible. Note that this also disables rearranging
   *                        items inside the list.
   * - dnd-horizontal-list  Optional boolean expresssion. When it evaluates to true, the positioning
   *                        algorithm will use the left and right halfs of the list items instead of
   *                        the upper and lower halfs.
   * - dnd-external-sources Optional boolean expression. When it evaluates to true, the list accepts
   *                        drops from sources outside of the current browser tab. This allows to
   *                        drag and drop accross different browser tabs. The only major browser
   *                        that does not support this is currently Microsoft Edge.
   *
   * Callbacks:
   * - dnd-dragover         Optional expression that is invoked when an element is dragged over the
   *                        list. If the expression is set, but does not return true, the element is
   *                        not allowed to be dropped. The following variables will be available:
   *                        - event: The original dragover event sent by the browser.
   *                        - index: The position in the list at which the element would be dropped.
   *                        - type: The dnd-type set on the dnd-draggable, or undefined if non was
   *                          set. Will be null for drops from external sources in IE and Edge,
   *                          since we don't know the type in those cases.
   *                        - dropEffect: One of move, copy or link, see dnd-effect-allowed.
   *                        - external: Whether the element was dragged from an external source.
   *                        - callback: If dnd-callback was set on the source element, this is a
   *                          function reference to the callback. The callback can be invoked with
   *                          custom variables like this: callback({var1: value1, var2: value2}).
   *                          The callback will be executed on the scope of the source element. If
   *                          dnd-external-sources was set and external is true, this callback will
   *                          not be available.
   * - dnd-drop             Optional expression that is invoked when an element is dropped on the
   *                        list. The same variables as for dnd-dragover will be available, with the
   *                        exception that type is always known and therefore never null. There
   *                        will also be an item variable, which is the transferred object. The
   *                        return value determines the further handling of the drop:
   *                        - falsy: The drop will be canceled and the element won't be inserted.
   *                        - true: Signalises that the drop is allowed, but the dnd-drop
   *                          callback already took care of inserting the element.
   *                        - otherwise: All other return values will be treated as the object to
   *                          insert into the array. In most cases you want to simply return the
   *                          item parameter, but there are no restrictions on what you can return.
   * - dnd-inserted         Optional expression that is invoked after a drop if the element was
   *                        actually inserted into the list. The same local variables as for
   *                        dnd-drop will be available. Note that for reorderings inside the same
   *                        list the old element will still be in the list due to the fact that
   *                        dnd-moved was not called yet.
   *
   * CSS classes:
   * - dndPlaceholder       When an element is dragged over the list, a new placeholder child
   *                        element will be added. This element is of type li and has the class
   *                        dndPlaceholder set. Alternatively, you can define your own placeholder
   *                        by creating a child element with dndPlaceholder class.
   * - dndDragover          Will be added to the list while an element is dragged over the list.
   */
  dndLists.directive('dndList', ['$parse', function($parse) {
    return function(scope, element, attr) {
      // While an element is dragged over the list, this placeholder element is inserted
      // at the location where the element would be inserted after dropping.
      var placeholder = getPlaceholderElement();
      placeholder.remove();

      var placeholderNode = placeholder[0];
      var listNode = element[0];
      var listSettings = {};

      /**
       * The dragenter event is fired when a dragged element or text selection enters a valid drop
       * target. According to the spec, we either need to have a dropzone attribute or listen on
       * dragenter events and call preventDefault(). It should be noted though that no browser seems
       * to enforce this behaviour.
       */
      element.on('dragenter', function (event) {
        event = event.originalEvent || event;

        // Calculate list properties, so that we don't have to repeat this on every dragover event.
        var types = attr.dndAllowedTypes && scope.$eval(attr.dndAllowedTypes);
        listSettings = {
          allowedTypes: angular.isArray(types) && types.join('|').toLowerCase().split('|'),
          disabled: attr.dndDisableIf && scope.$eval(attr.dndDisableIf),
          externalSources: attr.dndExternalSources && scope.$eval(attr.dndExternalSources),
          horizontal: attr.dndHorizontalList && scope.$eval(attr.dndHorizontalList)
        };

        var mimeType = getMimeType(event.dataTransfer.types);
        if (!mimeType || !isDropAllowed(getItemType(mimeType))) return true;
        event.preventDefault();
      });

      /**
       * The dragover event is triggered "every few hundred milliseconds" while an element
       * is being dragged over our list, or over an child element.
       */
      element.on('dragover', function(event) {
        event = event.originalEvent || event;

        // Check whether the drop is allowed and determine mime type.
        var mimeType = getMimeType(event.dataTransfer.types);
        var itemType = getItemType(mimeType);
        if (!mimeType || !isDropAllowed(itemType)) return true;

        // Make sure the placeholder is shown, which is especially important if the list is empty.
        if (placeholderNode.parentNode != listNode) {
          element.append(placeholder);
        }

        if (event.target != listNode) {
          // Try to find the node direct directly below the list node.
          var listItemNode = event.target;
          while (listItemNode.parentNode != listNode && listItemNode.parentNode) {
            listItemNode = listItemNode.parentNode;
          }

          if (listItemNode.parentNode == listNode && listItemNode != placeholderNode) {
            // If the mouse pointer is in the upper half of the list item element,
            // we position the placeholder before the list item, otherwise after it.
            var rect = listItemNode.getBoundingClientRect();
            if (listSettings.horizontal) {
              var isFirstHalf = event.clientX < rect.left + rect.width / 2;
            } else {
              var isFirstHalf = event.clientY < rect.top + rect.height / 2;
            }
            listNode.insertBefore(placeholderNode,
                isFirstHalf ? listItemNode : listItemNode.nextSibling);
          }
        }

        // In IE we set a fake effectAllowed in dragstart to get the correct cursor, we therefore
        // ignore the effectAllowed passed in dataTransfer. We must also not access dataTransfer for
        // drops from external sources, as that throws an exception.
        var ignoreDataTransfer = mimeType == MSIE_MIME_TYPE;
        var dropEffect = getDropEffect(event, ignoreDataTransfer);
        if (dropEffect == 'none') return stopDragover();

        // At this point we invoke the callback, which still can disallow the drop.
        // We can't do this earlier because we want to pass the index of the placeholder.
        if (attr.dndDragover && !invokeCallback(attr.dndDragover, event, dropEffect, itemType)) {
          return stopDragover();
        }

        // Set dropEffect to modify the cursor shown by the browser, unless we're in IE, where this
        // is not supported. This must be done after preventDefault in Firefox.
        event.preventDefault();
        if (!ignoreDataTransfer) {
          event.dataTransfer.dropEffect = dropEffect;
        }

        element.addClass("dndDragover");
        event.stopPropagation();
        return false;
      });

      /**
       * When the element is dropped, we use the position of the placeholder element as the
       * position where we insert the transferred data. This assumes that the list has exactly
       * one child element per array element.
       */
      element.on('drop', function(event) {
        event = event.originalEvent || event;

        // Check whether the drop is allowed and determine mime type.
        var mimeType = getMimeType(event.dataTransfer.types);
        var itemType = getItemType(mimeType);
        if (!mimeType || !isDropAllowed(itemType)) return true;

        // The default behavior in Firefox is to interpret the dropped element as URL and
        // forward to it. We want to prevent that even if our drop is aborted.
        event.preventDefault();

        // Unserialize the data that was serialized in dragstart.
        try {
          var data = JSON.parse(event.dataTransfer.getData(mimeType));
        } catch(e) {
          return stopDragover();
        }

        // Drops with invalid types from external sources might not have been filtered out yet.
        if (mimeType == MSIE_MIME_TYPE || mimeType == EDGE_MIME_TYPE) {
          itemType = data.type || undefined;
          data = data.item;
          if (!isDropAllowed(itemType)) return stopDragover();
        }

        // Special handling for internal IE drops, see dragover handler.
        var ignoreDataTransfer = mimeType == MSIE_MIME_TYPE;
        var dropEffect = getDropEffect(event, ignoreDataTransfer);
        if (dropEffect == 'none') return stopDragover();

        // Invoke the callback, which can transform the transferredObject and even abort the drop.
        var index = getPlaceholderIndex();
        if (attr.dndDrop) {
          data = invokeCallback(attr.dndDrop, event, dropEffect, itemType, index, data);
          if (!data) return stopDragover();
        }

        // The drop is definitely going to happen now, store the dropEffect.
        dndState.dropEffect = dropEffect;
        if (!ignoreDataTransfer) {
          event.dataTransfer.dropEffect = dropEffect;
        }

        // Insert the object into the array, unless dnd-drop took care of that (returned true).
        if (data !== true) {
          scope.$apply(function() {
            scope.$eval(attr.dndList).splice(index, 0, data);
          });
        }
        invokeCallback(attr.dndInserted, event, dropEffect, itemType, index, data);

        // Clean up
        stopDragover();
        event.stopPropagation();
        return false;
      });

      /**
       * We have to remove the placeholder when the element is no longer dragged over our list. The
       * problem is that the dragleave event is not only fired when the element leaves our list,
       * but also when it leaves a child element. Therefore, we determine whether the mouse cursor
       * is still pointing to an element inside the list or not.
       */
      element.on('dragleave', function(event) {
        event = event.originalEvent || event;

        var newTarget = document.elementFromPoint(event.clientX, event.clientY);
        if (listNode.contains(newTarget) && !event._dndPhShown) {
          // Signalize to potential parent lists that a placeholder is already shown.
          event._dndPhShown = true;
        } else {
          stopDragover();
        }
      });

      /**
       * Given the types array from the DataTransfer object, returns the first valid mime type.
       * A type is valid if it starts with MIME_TYPE, or it equals MSIE_MIME_TYPE or EDGE_MIME_TYPE.
       */
      function getMimeType(types) {
        if (!types) return MSIE_MIME_TYPE; // IE 9 workaround.
        for (var i = 0; i < types.length; i++) {
          if (types[i] == MSIE_MIME_TYPE || types[i] == EDGE_MIME_TYPE ||
              types[i].substr(0, MIME_TYPE.length) == MIME_TYPE) {
            return types[i];
          }
        }
        return null;
      }

      /**
       * Determines the type of the item from the dndState, or from the mime type for items from
       * external sources. Returns undefined if no item type was set and null if the item type could
       * not be determined.
       */
      function getItemType(mimeType) {
        if (dndState.isDragging) return dndState.itemType || undefined;
        if (mimeType == MSIE_MIME_TYPE || mimeType == EDGE_MIME_TYPE) return null;
        return (mimeType && mimeType.substr(MIME_TYPE.length + 1)) || undefined;
      }

      /**
       * Checks various conditions that must be fulfilled for a drop to be allowed, including the
       * dnd-allowed-types attribute. If the item Type is unknown (null), the drop will be allowed.
       */
      function isDropAllowed(itemType) {
        if (listSettings.disabled) return false;
        if (!listSettings.externalSources && !dndState.isDragging) return false;
        if (!listSettings.allowedTypes || itemType === null) return true;
        return itemType && listSettings.allowedTypes.indexOf(itemType) != -1;
      }

      /**
       * Determines which drop effect to use for the given event. In Internet Explorer we have to
       * ignore the effectAllowed field on dataTransfer, since we set a fake value in dragstart.
       * In those cases we rely on dndState to filter effects. Read the design doc for more details:
       * https://github.com/marceljuenemann/angular-drag-and-drop-lists/wiki/Data-Transfer-Design
       */
      function getDropEffect(event, ignoreDataTransfer) {
        var effects = ALL_EFFECTS;
        if (!ignoreDataTransfer) {
          effects = filterEffects(effects, event.dataTransfer.effectAllowed);
        }
        if (dndState.isDragging) {
          effects = filterEffects(effects, dndState.effectAllowed);
        }
        if (attr.dndEffectAllowed) {
          effects = filterEffects(effects, attr.dndEffectAllowed);
        }
        // MacOS automatically filters dataTransfer.effectAllowed depending on the modifier keys,
        // therefore the following modifier keys will only affect other operating systems.
        if (!effects.length) {
          return 'none';
        } else if (event.ctrlKey && effects.indexOf('copy') != -1) {
          return 'copy';
        } else if (event.altKey && effects.indexOf('link') != -1) {
          return 'link';
        } else {
          return effects[0];
        }
      }

      /**
       * Small helper function that cleans up if we aborted a drop.
       */
      function stopDragover() {
        placeholder.remove();
        element.removeClass("dndDragover");
        return true;
      }

      /**
       * Invokes a callback with some interesting parameters and returns the callbacks return value.
       */
      function invokeCallback(expression, event, dropEffect, itemType, index, item) {
        return $parse(expression)(scope, {
          callback: dndState.callback,
          dropEffect: dropEffect,
          event: event,
          external: !dndState.isDragging,
          index: index !== undefined ? index : getPlaceholderIndex(),
          item: item || undefined,
          type: itemType
        });
      }

      /**
       * We use the position of the placeholder node to determine at which position of the array the
       * object needs to be inserted
       */
      function getPlaceholderIndex() {
        return Array.prototype.indexOf.call(listNode.children, placeholderNode);
      }

      /**
       * Tries to find a child element that has the dndPlaceholder class set. If none was found, a
       * new li element is created.
       */
      function getPlaceholderElement() {
        var placeholder;
        angular.forEach(element.children(), function(childNode) {
          var child = angular.element(childNode);
          if (child.hasClass('dndPlaceholder')) {
            placeholder = child;
          }
        });
        return placeholder || angular.element("<li class='dndPlaceholder'></li>");
      }
    };
  }]);

  /**
   * Use the dnd-nodrag attribute inside of dnd-draggable elements to prevent them from starting
   * drag operations. This is especially useful if you want to use input elements inside of
   * dnd-draggable elements or create specific handle elements. Note: This directive does not work
   * in Internet Explorer 9.
   */
  dndLists.directive('dndNodrag', function() {
    return function(scope, element, attr) {
      // Set as draggable so that we can cancel the events explicitly
      element.attr("draggable", "true");

      /**
       * Since the element is draggable, the browser's default operation is to drag it on dragstart.
       * We will prevent that and also stop the event from bubbling up.
       */
      element.on('dragstart', function(event) {
        event = event.originalEvent || event;

        if (!event._dndHandle) {
          // If a child element already reacted to dragstart and set a dataTransfer object, we will
          // allow that. For example, this is the case for user selections inside of input elements.
          if (!(event.dataTransfer.types && event.dataTransfer.types.length)) {
            event.preventDefault();
          }
          event.stopPropagation();
        }
      });

      /**
       * Stop propagation of dragend events, otherwise dnd-moved might be triggered and the element
       * would be removed.
       */
      element.on('dragend', function(event) {
        event = event.originalEvent || event;
        if (!event._dndHandle) {
          event.stopPropagation();
        }
      });
    };
  });

  /**
   * Use the dnd-handle directive within a dnd-nodrag element in order to allow dragging with that
   * element after all. Therefore, by combining dnd-nodrag and dnd-handle you can allow
   * dnd-draggable elements to only be dragged via specific "handle" elements. Note that Internet
   * Explorer will show the handle element as drag image instead of the dnd-draggable element. You
   * can work around this by styling the handle element differently when it is being dragged. Use
   * the CSS selector .dndDragging:not(.dndDraggingSource) [dnd-handle] for that.
   */
  dndLists.directive('dndHandle', function() {
    return function(scope, element, attr) {
      element.attr("draggable", "true");

      element.on('dragstart dragend', function(event) {
        event = event.originalEvent || event;
        event._dndHandle = true;
      });
    };
  });

  /**
   * Filters an array of drop effects using a HTML5 effectAllowed string.
   */
  function filterEffects(effects, effectAllowed) {
    if (effectAllowed == 'all') return effects;
    return effects.filter(function(effect) {
      return effectAllowed.toLowerCase().indexOf(effect) != -1;
    });
  }

  /**
   * For some features we need to maintain global state. This is done here, with these fields:
   * - callback: A callback function set at dragstart that is passed to internal dropzone handlers.
   * - dropEffect: Set in dragstart to "none" and to the actual value in the drop handler. We don't
   *   rely on the dropEffect passed by the browser, since there are various bugs in Chrome and
   *   Safari, and Internet Explorer defaults to copy if effectAllowed is copyMove.
   * - effectAllowed: Set in dragstart based on dnd-effect-allowed. This is needed for IE because
   *   setting effectAllowed on dataTransfer might result in an undesired cursor.
   * - isDragging: True between dragstart and dragend. Falsy for drops from external sources.
   * - itemType: The item type of the dragged element set via dnd-type. This is needed because IE
   *   and Edge don't support custom mime types that we can use to transfer this information.
   */
  var dndState = {};

})(angular.module('dndLists', []));
