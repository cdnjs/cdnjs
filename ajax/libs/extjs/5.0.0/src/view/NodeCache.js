/**
 * @private
 * A cache of View elements keyed using the index of the associated record in the store.
 * 
 * This implements the methods of {Ext.dom.CompositeElement} which are used by {@link Ext.view.AbstractView}
 * to privide a map of record nodes and methods to manipulate the nodes.
 * @class Ext.view.NodeCache
 */
Ext.define('Ext.view.NodeCache', {
    statics: {
        importElementMethods: Ext.dom.CompositeElementLite.importElementMethods,
        range: document.createRange && document.createRange()
    },

    constructor: function(view) {
        this.view = view;
        this.clear();
        this.el = new Ext.dom.Fly();
    },

    /**
    * Removes all elements from this NodeCache.
    * @param {Boolean} [removeDom] True to also remove the elements from the document.
    */
    clear: function(removeDom) {
        var me = this,
            elements = this.elements,
            i, el,
            range = me.statics().range;

        if (me.count && removeDom) {
            if (range) {
                range.setStartBefore(elements[me.startIndex]);
                range.setEndAfter(elements[me.endIndex]);
                range.deleteContents();
             } else {
                for (i in elements) {
                    el = elements[i];
                    el.parentNode.removeChild(el);
                }
            }
        }
        me.elements = {};
        me.count = me.startIndex = 0;
        me.endIndex = -1;
    },

    /**
    * Clears this NodeCache and adds the elements passed.
    * @param {HTMLElement[]} els An array of DOM elements from which to fill this NodeCache.
    * @return {Ext.view.NodeCache} this
    */
    fill: function(newElements, startIndex, fixedNodes) {
        fixedNodes = fixedNodes || 0;
        var me = this,
            elements = me.elements = {},
            i,
            len = newElements.length - fixedNodes;

        if (!startIndex) {
            startIndex = 0;
        }
        for (i = 0; i < len; i++) {
            elements[startIndex + i] = newElements[i + fixedNodes];
        }
        me.startIndex = startIndex;
        me.endIndex = startIndex + len - 1;
        me.count = len;
        return this;
    },

    insert: function(insertPoint, nodes) {
        var me = this,
            elements = me.elements,
            i,
            nodeCount = nodes.length;

        // If not inserting into empty cache, validate, and possibly shuffle.
        if (me.count) {
            //<debug>
            if (insertPoint > me.endIndex + 1 || insertPoint + nodes.length - 1 < me.startIndex) {
                Ext.Error.raise('Discontiguous range would result from inserting ' + nodes.length + ' nodes at ' + insertPoint);
            }
            //</debug>

            // Move following nodes forwards by <nodeCount> positions
            if (insertPoint < me.count) {
                for (i = me.endIndex + nodeCount; i >= insertPoint + nodeCount; i--) {
                    elements[i] = elements[i - nodeCount];
                    elements[i].setAttribute('data-recordIndex', i);
                }
            }
            me.endIndex = me.endIndex + nodeCount;
        }
        // Empty cache. set up counters
        else {
            me.startIndex = insertPoint;
            me.endIndex = insertPoint + nodeCount - 1;
        }

        // Insert new nodes into place
        for (i = 0; i < nodeCount; i++, insertPoint++) {
            elements[insertPoint] = nodes[i];
            elements[insertPoint].setAttribute('data-recordIndex', insertPoint);
        }
        me.count += nodeCount;
    },

    invoke: function(fn, args) {
        var me = this,
            element,
            i;

        fn = Ext.dom.Element.prototype[fn];
        for (i = me.startIndex; i <= me.endIndex; i++) {
            element = me.item(i);
            if (element) {
                fn.apply(element, args);
            }
        }
        return this;
    },

    item: function(index, asDom) {
        var el = this.elements[index],
            result = null;

        if (el) {
            result = asDom ? this.elements[index] : this.el.attach(this.elements[index]);
        }
        return result;
    },

    first: function(asDom) {
        return this.item(this.startIndex, asDom);
    },

    last: function(asDom) {
        return this.item(this.endIndex, asDom);
    },

    getCount : function() {
        return this.count;
    },

    slice: function(start, end) {
        var elements = this.elements,
            result = [],
            i;

        if (!end) {
            end = this.endIndex;
        } else {
            end = Math.min(this.endIndex, end - 1);
        }
        for (i = start||this.startIndex; i <= end; i++) {
            result.push(elements[i]);
        }
        return result;
    },

    /**
    * Replaces the specified element with the passed element.
    * @param {String/HTMLElement/Ext.dom.Element/Number} el The id of an element, the Element itself, the index of the
    * element in this composite to replace.
    * @param {String/Ext.dom.Element} replacement The id of an element or the Element itself.
    * @param {Boolean} [domReplace] True to remove and replace the element in the document too.
    */
    replaceElement: function(el, replacement, domReplace) {
        var elements = this.elements,
            index = (typeof el === 'number') ? el : this.indexOf(el);

        if (index > -1) {
            replacement = Ext.getDom(replacement);
            if (domReplace) {
                el = elements[index];
                el.parentNode.insertBefore(replacement, el);
                Ext.removeNode(el);
                replacement.setAttribute('data-recordIndex', index);
            }
            this.elements[index] = replacement;
        }
        return this;
    },

    /**
    * Find the index of the passed element within the composite collection.
    * @param {String/HTMLElement/Ext.dom.Element/Number} el The id of an element, or an Ext.dom.Element, or an HTMLElement
    * to find within the composite collection.
    * @return {Number} The index of the passed Ext.dom.Element in the composite collection, or -1 if not found.
    */
    indexOf: function(el) {
        var elements = this.elements,
            index;

        el = Ext.getDom(el);
        for (index = this.startIndex; index <= this.endIndex; index++) {
            if (elements[index] === el) {
                return index;
            }
        }
        return -1;
    },

    removeRange: function(start, end, removeDom) {
        var me = this,
            elements = me.elements,
            el,
            i, removeCount, fromPos;

        if (end == null) {
            end = me.endIndex + 1;
        } else {
            end = Math.min(me.endIndex + 1, end + 1);
        }
        if (start == null) {
            start = me.startIndex;
        }
        removeCount = end - start;
        for (i = start, fromPos = end; i <= me.endIndex; i++, fromPos++) {
            // Within removal range and we are removing from DOM
            if (removeDom && i < end) {
                Ext.removeNode(elements[i]);
            }
            // If the from position is occupied, shuffle that entry back into reference "i"
            if (fromPos <= me.endIndex) {
                el = elements[i] = elements[fromPos];
                el.setAttribute('data-recordIndex', i);
            }
            // The from position has walked off the end, so delete reference "i"
            else {
                delete elements[i];
            }
        }
        me.count -= removeCount;
        me.endIndex -= removeCount;
    },

    /**
    * Removes the specified element(s).
    * @param {String/HTMLElement/Ext.dom.Element/Number} el The id of an element, the Element itself, the index of the
    * element in this composite or an array of any of those.
    * @param {Boolean} [removeDom] True to also remove the element from the document
    */
    removeElement: function(keys, removeDom) {
        var me = this,
            inKeys,
            key,
            elements = me.elements,
            el,
            deleteCount,
            keyIndex = 0, index,
            fromIndex;

        // Sort the keys into ascending order so that we can iterate through the elements
        // collection, and delete items encountered in the keys array as we encounter them.
        if (Ext.isArray(keys)) {
            inKeys = keys;
            keys = [];
            deleteCount = inKeys.length;
            for (keyIndex = 0; keyIndex < deleteCount; keyIndex++) {
                key = inKeys[keyIndex];
                if (typeof key !== 'number') {
                    key = me.indexOf(key);
                }
                // Could be asked to remove data above the start, or below the end of rendered zone in a buffer rendered view
                // So only collect keys which are within our range
                if (key >= me.startIndex && key <= me.endIndex) {
                    keys[keys.length] = key;
                }
            }
            Ext.Array.sort(keys);
            deleteCount = keys.length;
        } else {
            // Could be asked to remove data above the start, or below the end of rendered zone in a buffer rendered view
            if (keys < me.startIndex || keys > me.endIndex) {
                return;
            }
            deleteCount = 1;
            keys = [keys];
        }

        // Iterate through elements starting at the element referenced by the first deletion key.
        // We also start off and index zero in the keys to delete array.
        for (index = fromIndex = keys[0], keyIndex = 0; index <= me.endIndex; index++, fromIndex++) {

            // If the current index matches the next key in the delete keys array, this 
            // entry is being deleted, so increment the fromIndex to skip it.
            // Advance to next entry in keys array.
            if (keyIndex < deleteCount && index === keys[keyIndex]) {
                fromIndex++;
                keyIndex++;
                if (removeDom) {
                    Ext.removeNode(elements[index]);
                }
            }

            // Shuffle entries forward of the delete range back into contiguity.
            if (fromIndex <= me.endIndex && fromIndex >= me.startIndex) {
                el = elements[index] = elements[fromIndex];
                el.setAttribute('data-recordIndex', index);
            } else {
                delete elements[index];
            }
        }
        me.endIndex -= deleteCount;
        me.count -= deleteCount;
    },

    /**
     * Appends/prepends records depending on direction flag
     * @param {Ext.data.Model[]} newRecords Items to append/prepend
     * @param {Number} direction `-1' = scroll up, `0` = scroll down.
     * @param {Number} removeCount The number of records to remove from the end. if scrolling
     * down, rows are removed from the top and the new rows are added at the bottom.
     */
    scroll: function(newRecords, direction, removeCount) {
        var me = this,
            view = me.view,
            store = view.store,
            elements = me.elements,
            recCount = newRecords.length,
            i, el, removeEnd,
            newNodes,
            nodeContainer = view.getNodeContainer(),
            frag = document.createDocumentFragment(),
            fireItemRemove = view.hasListeners.itemremove,
            fireItemAdd = view.hasListeners.itemadd,
            range = me.statics().range;

        // Scrolling up (content moved down - new content needed at top, remove from bottom)
        if (direction === -1) {
            if (removeCount) {
                if (range) {
                    range.setStartBefore(elements[(me.endIndex - removeCount) + 1]);
                    range.setEndAfter(elements[me.endIndex]);
                    range.deleteContents();
                    for (i = (me.endIndex - removeCount) + 1; i <= me.endIndex; i++) {
                        el = elements[i];
                        delete elements[i];
                        if (fireItemRemove) {
                            view.fireEvent('itemremove', store.getByInternalId(el.getAttribute('data-recordId')), i, el, view);
                        }
                    }
                } else {
                    for (i = (me.endIndex - removeCount) + 1; i <= me.endIndex; i++) {
                        el = elements[i];
                        delete elements[i];
                        el.parentNode.removeChild(el);
                        if (fireItemRemove) {
                            view.fireEvent('itemremove', store.getByInternalId(el.getAttribute('data-recordId')), i, el, view);
                        }
                    }
                }
                me.endIndex -= removeCount;
            }

            // Only do rendering if there are rows to render.
            // This could have been a remove only operation due to a view resize event.
            if (newRecords.length) {

                // grab all nodes rendered, not just the data rows
                newNodes = view.bufferRender(newRecords, me.startIndex -= recCount);
                for (i = 0; i < recCount; i++) {
                    elements[me.startIndex + i] = newNodes[i];
                    frag.appendChild(newNodes[i]);
                }
                nodeContainer.insertBefore(frag, nodeContainer.firstChild);

                // pass the new DOM to any interested parties
                if (fireItemAdd) {
                    view.fireEvent('itemadd', newRecords, me.startIndex, newNodes);
                }
            }
        }

        // Scrolling down (content moved up - new content needed at bottom, remove from top)
        else {
            if (removeCount) {
                removeEnd = me.startIndex + removeCount;
                if (range) {
                    range.setStartBefore(elements[me.startIndex]);
                    range.setEndAfter(elements[removeEnd - 1]);
                    range.deleteContents();
                    for (i = me.startIndex; i < removeEnd; i++) {
                        el = elements[i];
                        delete elements[i];
                        if (fireItemRemove) {
                            view.fireEvent('itemremove', store.getByInternalId(el.getAttribute('data-recordId')), i, el, view);
                        }
                    }
                } else {
                    for (i = me.startIndex; i < removeEnd; i++) {
                        el = elements[i];
                        delete elements[i];
                        el.parentNode.removeChild(el);
                        if (fireItemRemove) {
                            view.fireEvent('itemremove', store.getByInternalId(el.getAttribute('data-recordId')), i, el, view);
                        }
                    }
                }
                me.startIndex = removeEnd;
            }

            // grab all nodes rendered, not just the data rows
            newNodes = view.bufferRender(newRecords, me.endIndex + 1);
            for (i = 0; i < recCount; i++) {
                elements[me.endIndex += 1] = newNodes[i];
                frag.appendChild(newNodes[i]);
            }
            nodeContainer.appendChild(frag);

            // pass the new DOM to any interested parties
            if (fireItemAdd) {
                view.fireEvent('itemadd', newRecords, me.endIndex + 1, newNodes);
            }
        }
        // Keep count consistent.
        me.count = me.endIndex - me.startIndex + 1;
    },

    sumHeights: function() {
        var result = 0,
            elements = this.elements,
            i;

        for (i = this.startIndex; i <= this.endIndex; i++) {
            result += elements[i].offsetHeight;
        }
        return result;
    }
}, function() {
    this.importElementMethods();
});