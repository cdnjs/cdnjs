/*!
 * Nestable jQuery Plugin - Copyright (c) 2014 Ramon Smit - https://github.com/RamonSmit/Nestable
 */

(function($, window, document, undefined) {
    var hasTouch = 'ontouchstart' in document;

    /**
     * Detect CSS pointer-events property
     * events are normally disabled on the dragging element to avoid conflicts
     * https://github.com/ausi/Feature-detection-technique-for-pointer-events/blob/master/modernizr-pointerevents.js
     */
    var hasPointerEvents = (function() {
        var el = document.createElement('div'),
            docEl = document.documentElement;
        if (!('pointerEvents' in el.style)) {
            return false;
        }
        el.style.pointerEvents = 'auto';
        el.style.pointerEvents = 'x';
        docEl.appendChild(el);
        var supports = window.getComputedStyle && window.getComputedStyle(el, '').pointerEvents === 'auto';
        docEl.removeChild(el);
        return !!supports;
    })();

    var defaults = {
        contentCallback: function(item) {return item.content || '' ? item.content : item.id;},
        listNodeName: 'ol',
        itemNodeName: 'li',
        handleNodeName: 'div',
        contentNodeName: 'span',
        rootClass: 'dd',
        listClass: 'dd-list',
        itemClass: 'dd-item',
        dragClass: 'dd-dragel',
        handleClass: 'dd-handle',
        contentClass: 'dd-content',
        collapsedClass: 'dd-collapsed',
        placeClass: 'dd-placeholder',
        noDragClass: 'dd-nodrag',
        noChildrenClass: 'dd-nochildren',
        emptyClass: 'dd-empty',
        expandBtnHTML: '<button class="dd-expand" data-action="expand" type="button">Expand</button>',
        collapseBtnHTML: '<button class="dd-collapse" data-action="collapse" type="button">Collapse</button>',
        group: 0,
        maxDepth: 5,
        threshold: 20,
        fixedDepth: false, //fixed item's depth
        fixed: false,
        includeContent: false,
        scroll: false,
        scrollSensitivity: 1,
        scrollSpeed: 5,
        scrollTriggers: {
            top: 40,
            left: 40,
            right: -40,
            bottom: -40
        },
        effect: {
            animation: 'none',
            time: 'slow'
        },
        callback: function(l, e, p) {},
        onDragStart: function(l, e, p) {},
        beforeDragStop: function(l, e, p) {},
        listRenderer: function(children, options) {
            var html = '<' + options.listNodeName + ' class="' + options.listClass + '">';
            html += children;
            html += '</' + options.listNodeName + '>';

            return html;
        },
        itemRenderer: function(item_attrs, content, children, options, item) {
            var item_attrs_string = $.map(item_attrs, function(value, key) {
                return ' ' + key + '="' + value + '"';
            }).join(' ');

            var html = '<' + options.itemNodeName + item_attrs_string + '>';
            html += '<' + options.handleNodeName + ' class="' + options.handleClass + '">';
            html += '<' + options.contentNodeName + ' class="' + options.contentClass + '">';
            html += content;
            html += '</' + options.contentNodeName + '>';
            html += '</' + options.handleNodeName + '>';
            html += children;
            html += '</' + options.itemNodeName + '>';

            return html;
        }
    };

    function Plugin(element, options) {
        this.w  = $(document);
        this.el = $(element);
        options = options || defaults;

        if (options.rootClass !== undefined && options.rootClass !== 'dd') {
            options.listClass       = options.listClass ? options.listClass : options.rootClass + '-list';
            options.itemClass       = options.itemClass ? options.itemClass : options.rootClass + '-item';
            options.dragClass       = options.dragClass ? options.dragClass : options.rootClass + '-dragel';
            options.handleClass     = options.handleClass ? options.handleClass : options.rootClass + '-handle';
            options.collapsedClass  = options.collapsedClass ? options.collapsedClass : options.rootClass + '-collapsed';
            options.placeClass      = options.placeClass ? options.placeClass : options.rootClass + '-placeholder';
            options.noDragClass     = options.noDragClass ? options.noDragClass : options.rootClass + '-nodrag';
            options.noChildrenClass = options.noChildrenClass ? options.noChildrenClass : options.rootClass + '-nochildren';
            options.emptyClass      = options.emptyClass ? options.emptyClass : options.rootClass + '-empty';
        }

        this.options = $.extend({}, defaults, options);

        // build HTML from serialized JSON if passed
        if (this.options.json !== undefined) {
            this._build();
        }

        this.init();
    }

    Plugin.prototype = {

        init: function() {
            var list = this;

            list.reset();
            list.el.data('nestable-group', this.options.group);
            list.placeEl = $('<div class="' + list.options.placeClass + '"/>');

            var items = this.el.find(list.options.itemNodeName);
            $.each(items, function(k, el) {
                var item = $(el),
                    parent = item.parent();
                list.setParent(item);
                if (parent.hasClass(list.options.collapsedClass)) {
                    list.collapseItem(parent.parent());
                }
            });

            // Append the .dd-empty div if the list don't have any items on init
            if (!items.length) {
                this.appendEmptyElement(this.el);
            }

            list.el.on('click', 'button', function(e) {
                if (list.dragEl) {
                    return;
                }
                var target = $(e.currentTarget),
                    action = target.data('action'),
                    item = target.parents(list.options.itemNodeName).eq(0);
                if (action === 'collapse') {
                    list.collapseItem(item);
                }
                if (action === 'expand') {
                    list.expandItem(item);
                }
            });

            var onStartEvent = function(e) {
                var handle = $(e.target);
                if (!handle.hasClass(list.options.handleClass)) {
                    if (handle.closest('.' + list.options.noDragClass).length) {
                        return;
                    }
                    handle = handle.closest('.' + list.options.handleClass);
                }
                if (!handle.length || list.dragEl) {
                    return;
                }

                list.isTouch = /^touch/.test(e.type);
                if (list.isTouch && e.touches.length !== 1) {
                    return;
                }

                e.preventDefault();
                list.dragStart(e.touches ? e.touches[0] : e);
            };

            var onMoveEvent = function(e) {
                if (list.dragEl) {
                    e.preventDefault();
                    list.dragMove(e.touches ? e.touches[0] : e);
                }
            };

            var onEndEvent = function(e) {
                if (list.dragEl) {
                    e.preventDefault();
                    list.dragStop(e.touches ? e.changedTouches[0] : e);
                }
            };

            if (hasTouch) {
                list.el[0].addEventListener('touchstart', onStartEvent, false);
                window.addEventListener('touchmove', onMoveEvent, false);
                window.addEventListener('touchend', onEndEvent, false);
                window.addEventListener('touchcancel', onEndEvent, false);
            }

            list.el.on('mousedown', onStartEvent);
            list.w.on('mousemove', onMoveEvent);
            list.w.on('mouseup', onEndEvent);

            var destroyNestable = function()
            {
                if (hasTouch) {
                    list.el[0].removeEventListener('touchstart', onStartEvent, false);
                    window.removeEventListener('touchmove', onMoveEvent, false);
                    window.removeEventListener('touchend', onEndEvent, false);
                    window.removeEventListener('touchcancel', onEndEvent, false);
                }

                list.el.off('mousedown', onStartEvent);
                list.w.off('mousemove', onMoveEvent);
                list.w.off('mouseup', onEndEvent);

                list.el.off('click');
                list.el.unbind('destroy-nestable');

                list.el.data("nestable", null);
            };

            list.el.bind('destroy-nestable', destroyNestable);

        },

        destroy: function ()
        {
            this.el.trigger('destroy-nestable');
        },

        add: function (item)
        {
            var listClassSelector = '.' + this.options.listClass;
            var tree = $(this.el).children(listClassSelector);

            if (item.parent_id !== undefined) {
                tree = tree.find('[data-id="' + item.parent_id + '"]');
                delete item.parent_id;

                if (tree.children(listClassSelector).length === 0) {
                    tree = tree.append(this.options.listRenderer('', this.options));
                }

                tree = tree.find(listClassSelector + ':first');
                this.setParent(tree.parent());
            }

            tree.append(this._buildItem(item, this.options));
        },

        replace: function (item)
        {
            var html = this._buildItem(item, this.options);

            this._getItemById(item.id)
                .replaceWith(html);
        },

        //removes item and additional elements from list
        removeItem: function (item){
            var opts = this.options,
                el   = this.el;

            // remove item
            item = item || this;
            item.remove();

            // remove empty children lists
            var emptyListsSelector = '.' + opts.listClass
                + ' .' + opts.listClass + ':not(:has(*))';
            $(el).find(emptyListsSelector).remove();

            // remove buttons if parents do not have children
            var buttonsSelector = '[data-action="expand"], [data-action="collapse"]';
            $(el).find(buttonsSelector).each(function() {
                var siblings = $(this).siblings('.' + opts.listClass);
                if (siblings.length === 0) {
                    $(this).remove();
                }
            });
        },

        //removes item by itemId and run callback at the end
        remove: function (itemId, callback)
        {
            var opts = this.options;
            var list = this;
            var item = this._getItemById(itemId);

            //animation style
            var animation = opts.effect.animation || 'fade';

            //animation time
            var time = opts.effect.time || 'slow';

            //add fadeOut effect when removing
            if (animation === 'fade'){
                item.fadeOut(time, function(){
                    list.removeItem(item);
                });
            }
            else {
                this.removeItem(item);
            }

            if (callback) callback();
        },

        //removes all items from the list and run callback at the end
        removeAll: function(callback){

            var list  = this,
                opts  = this.options,
                node  = list.el.find(opts.listNodeName).first(),
                items = node.children(opts.itemNodeName);

            //animation style
            var animation = opts.effect.animation || 'fade';

            //animation time
            var time = opts.effect.time || 'slow';

            function remove(){
                //Removes each item and its children.
                items.each(function() {
                    list.removeItem($(this));
                });
                //Now we can again show our node element
                node.show();
                if (callback) callback();
            }

            //add fadeOut effect when removing
            if (animation === 'fade'){
                node.fadeOut(time, remove);
            }
            else {
                remove();
            }
        },

        _getItemById: function(itemId) {
            return $(this.el).children('.' + this.options.listClass)
                .find('[data-id="' + itemId + '"]');
        },

        _build: function() {
            var json = this.options.json;

            if (typeof json === 'string') {
                json = JSON.parse(json);
            }

            $(this.el).html(this._buildList(json, this.options));
        },

        _buildList: function(items, options) {
            if (!items) {
                return '';
            }

            var children = '';
            var that = this;

            $.each(items, function(index, sub) {
                children += that._buildItem(sub, options);
            });

            return options.listRenderer(children, options);
        },

        _buildItem: function(item, options) {
            function escapeHtml(text) {
                var map = {
                    '&': '&amp;',
                    '<': '&lt;',
                    '>': '&gt;',
                    '"': '&quot;',
                    "'": '&#039;'
                };

                return text + "".replace(/[&<>"']/g, function(m) { return map[m]; });
            }

            function filterClasses(classes) {
                var new_classes = {};

                for (var k in classes) {
                    // Remove duplicates
                    new_classes[classes[k]] = classes[k];
                }

                return new_classes;
            }

            function createClassesString(item, options) {
                var classes = item.classes || {};

                if (typeof classes === 'string') {
                    classes = [classes];
                }

                var item_classes = filterClasses(classes);
                item_classes[options.itemClass] = options.itemClass;

                // create class string
                return $.map(item_classes, function(val) {
                    return val;
                }).join(' ');
            }

            function createDataAttrs(attr) {
                attr = $.extend({}, attr);

                delete attr.children;
                delete attr.classes;
                delete attr.content;

                var data_attrs = {};

                $.each(attr, function(key, value) {
                    if (typeof value === 'object') {
                        value = JSON.stringify(value);
                    }

                    data_attrs["data-" + key] = escapeHtml(value);
                });

                return data_attrs;
            }

            var item_attrs = createDataAttrs(item);
            item_attrs["class"] = createClassesString(item, options);

            var content = options.contentCallback(item);
            var children = this._buildList(item.children, options);
            var html = $(options.itemRenderer(item_attrs, content, children, options, item));

            this.setParent(html);

            return html[0].outerHTML;
        },

        serialize: function() {
            var data, list = this, step = function(level) {
                var array = [],
                    items = level.children(list.options.itemNodeName);
                items.each(function() {
                    var li = $(this),
                        item = $.extend({}, li.data()),
                        sub = li.children(list.options.listNodeName);

                    if (list.options.includeContent) {
                        var content = li.find('.' + list.options.contentClass).html();

                        if (content) {
                            item.content = content;
                        }
                    }

                    if (sub.length) {
                        item.children = step(sub);
                    }
                    array.push(item);
                });
                return array;
            };
            data = step(list.el.find(list.options.listNodeName).first());
            return data;
        },

        asNestedSet: function() {
            var list = this, o = list.options, depth = -1, ret = [], lft = 1;
            var items = list.el.find(o.listNodeName).first().children(o.itemNodeName);

            items.each(function () {
                lft = traverse(this, depth + 1, lft);
            });

            ret = ret.sort(function(a,b){ return (a.lft - b.lft); });
            return ret;

            function traverse(item, depth, lft) {
                var rgt = lft + 1, id, pid;

                if ($(item).children(o.listNodeName).children(o.itemNodeName).length > 0 ) {
                    depth++;
                    $(item).children(o.listNodeName).children(o.itemNodeName).each(function () {
                        rgt = traverse($(this), depth, rgt);
                    });
                    depth--;
                }

                id = $(item).attr('data-id');
                if (isInt(id)) {
                    id = parseInt(id);
                }

                pid = $(item).parent(o.listNodeName).parent(o.itemNodeName).attr('data-id') || '';
                if (isInt(pid)) {
                    id = parseInt(pid);
                }

                if (id) {
                    ret.push({"id": id, "parent_id": pid, "depth": depth, "lft": lft, "rgt": rgt});
                }

                lft = rgt + 1;
                return lft;
            }

            function isInt(value) {
                return $.isNumeric(value) && Math.floor(value) == value;
            }
        },

        returnOptions: function() {
            return this.options;
        },

        serialise: function() {
            return this.serialize();
        },

        toHierarchy: function(options) {

            var o = $.extend({}, this.options, options),
                ret = [];

            $(this.element).children(o.items).each(function() {
                var level = _recursiveItems(this);
                ret.push(level);
            });

            return ret;

            function _recursiveItems(item) {
                var id = ($(item).attr(o.attribute || 'id') || '').match(o.expression || (/(.+)[-=_](.+)/));
                if (id) {
                    var currentItem = {
                        "id": id[2]
                    };
                    if ($(item).children(o.listType).children(o.items).length > 0) {
                        currentItem.children = [];
                        $(item).children(o.listType).children(o.items).each(function() {
                            var level = _recursiveItems(this);
                            currentItem.children.push(level);
                        });
                    }
                    return currentItem;
                }
            }
        },

        toArray: function() {

            var o = $.extend({}, this.options, this),
                sDepth = o.startDepthCount || 0,
                ret = [],
                left = 2,
                list = this,
                element = list.el.find(list.options.listNodeName).first();

            var items = element.children(list.options.itemNodeName);
            items.each(function() {
                left = _recursiveArray($(this), sDepth + 1, left);
            });

            ret = ret.sort(function(a, b) {
                return (a.left - b.left);
            });

            return ret;

            function _recursiveArray(item, depth, left) {

                var right = left + 1,
                    id,
                    pid;

                if (item.children(o.options.listNodeName).children(o.options.itemNodeName).length > 0) {
                    depth++;
                    item.children(o.options.listNodeName).children(o.options.itemNodeName).each(function() {
                        right = _recursiveArray($(this), depth, right);
                    });
                    depth--;
                }

                id = item.data().id;


                if (depth === sDepth + 1) {
                    pid = o.rootID;
                } else {

                    var parentItem = (item.parent(o.options.listNodeName)
                        .parent(o.options.itemNodeName)
                        .data());
                    pid = parentItem.id;

                }

                if (id) {
                    ret.push({
                        "id": id,
                        "parent_id": pid,
                        "depth": depth,
                        "left": left,
                        "right": right
                    });
                }

                left = right + 1;
                return left;
            }

        },

        reset: function() {
            this.mouse = {
                offsetX: 0,
                offsetY: 0,
                startX: 0,
                startY: 0,
                lastX: 0,
                lastY: 0,
                nowX: 0,
                nowY: 0,
                distX: 0,
                distY: 0,
                dirAx: 0,
                dirX: 0,
                dirY: 0,
                lastDirX: 0,
                lastDirY: 0,
                distAxX: 0,
                distAxY: 0
            };
            this.isTouch = false;
            this.moving = false;
            this.dragEl = null;
            this.dragRootEl = null;
            this.dragDepth = 0;
            this.hasNewRoot = false;
            this.pointEl = null;
        },

        expandItem: function(li) {
            li.removeClass(this.options.collapsedClass);
        },

        collapseItem: function(li) {
            var lists = li.children(this.options.listNodeName);
            if (lists.length) {
                li.addClass(this.options.collapsedClass);
            }
        },

        expandAll: function() {
            var list = this;
            list.el.find(list.options.itemNodeName).each(function() {
                list.expandItem($(this));
            });
        },

        collapseAll: function() {
            var list = this;
            list.el.find(list.options.itemNodeName).each(function() {
                list.collapseItem($(this));
            });
        },

        setParent: function(li) {
            //Check if li is an element of itemNodeName type and has children
            if (li.is(this.options.itemNodeName) && li.children(this.options.listNodeName).length) {
                // make sure NOT showing two or more sets data-action buttons
                li.children('[data-action]').remove();
                li.prepend($(this.options.expandBtnHTML));
                li.prepend($(this.options.collapseBtnHTML));
            }
        },

        unsetParent: function(li) {
            li.removeClass(this.options.collapsedClass);
            li.children('[data-action]').remove();
            li.children(this.options.listNodeName).remove();
        },

        dragStart: function(e) {
            var mouse = this.mouse,
                target = $(e.target),
                dragItem = target.closest(this.options.itemNodeName),
                position = {
                    top  : e.pageY,
                    left : e.pageX
                };

            var continueExecution = this.options.onDragStart.call(this, this.el, dragItem, position);

            if (typeof continueExecution !== 'undefined' && continueExecution === false) {
                return;
            }

            this.placeEl.css('height', dragItem.height());

            mouse.offsetX = e.pageX - dragItem.offset().left;
            mouse.offsetY = e.pageY - dragItem.offset().top;
            mouse.startX = mouse.lastX = e.pageX;
            mouse.startY = mouse.lastY = e.pageY;

            this.dragRootEl = this.el;
            this.dragEl = $(document.createElement(this.options.listNodeName)).addClass(this.options.listClass + ' ' + this.options.dragClass);
            this.dragEl.css('width', dragItem.outerWidth());

            this.setIndexOfItem(dragItem);

            // fix for zepto.js
            //dragItem.after(this.placeEl).detach().appendTo(this.dragEl);
            dragItem.after(this.placeEl);
            dragItem[0].parentNode.removeChild(dragItem[0]);
            dragItem.appendTo(this.dragEl);

            $(document.body).append(this.dragEl);
            this.dragEl.css({
                'left': e.pageX - mouse.offsetX,
                'top': e.pageY - mouse.offsetY
            });
            // total depth of dragging item
            var i, depth,
                items = this.dragEl.find(this.options.itemNodeName);
            for (i = 0; i < items.length; i++) {
                depth = $(items[i]).parents(this.options.listNodeName).length;
                if (depth > this.dragDepth) {
                    this.dragDepth = depth;
                }
            }
        },

        //Create sublevel.
        //  element : element which become parent
        //  item    : something to place into new sublevel
        createSubLevel: function(element, item) {
            var list = $('<' + this.options.listNodeName + '/>').addClass(this.options.listClass);
            if (item) list.append(item);
            element.append(list);
            this.setParent(element);
            return list;
        },

        setIndexOfItem: function(item, index) {
            index = index || [];

            index.unshift(item.index());

            if ($(item[0].parentNode)[0] !== this.dragRootEl[0]) {
                this.setIndexOfItem($(item[0].parentNode), index);
            }
            else {
                this.dragEl.data('indexOfItem', index);
            }
        },

        restoreItemAtIndex: function(dragElement, indexArray) {
            var currentEl = this.el,
                lastIndex = indexArray.length - 1;

            //Put drag element at current element position.
            function placeElement(currentEl, dragElement) {
                if (indexArray[lastIndex] === 0) {
                    $(currentEl).prepend(dragElement.clone(true)); //using true saves added to element events.
                }
                else {
                    $(currentEl.children[indexArray[lastIndex] - 1]).after(dragElement.clone(true)); //using true saves added to element events.
                }
            }
            //Diggin through indexArray to get home for dragElement.
            for (var i = 0; i < indexArray.length; i++) {
                if (lastIndex === parseInt(i)) {
                    placeElement(currentEl, dragElement);
                    return;
                }
                //element can have no indexes, so we have to use conditional here to avoid errors.
                //if element doesn't exist we defenetly need to add new list.
                var element = (currentEl[0]) ? currentEl[0] : currentEl;
                var nextEl  = element.children[indexArray[i]];
                currentEl   = (!nextEl) ? this.createSubLevel($(element)) : nextEl;
            }
        },

        dragStop: function(e) {
            // fix for zepto.js
            //this.placeEl.replaceWith(this.dragEl.children(this.options.itemNodeName + ':first').detach());
            var position = {
                top  : e.pageY,
                left : e.pageX
            };
            //Get indexArray of item at drag start.
            var srcIndex = this.dragEl.data('indexOfItem');

            var el = this.dragEl.children(this.options.itemNodeName).first();

            el[0].parentNode.removeChild(el[0]);

            this.dragEl.remove(); //Remove dragEl, cause it can affect on indexing in html collection.

            //Before drag stop callback
            var continueExecution = this.options.beforeDragStop.call(this, this.el, el, this.placeEl.parent());
            if (typeof continueExecution !== 'undefined' && continueExecution === false) {
                var parent = this.placeEl.parent();
                this.placeEl.remove();
                if (!parent.children().length) {
                    this.unsetParent(parent.parent());
                }
                this.restoreItemAtIndex(el, srcIndex);
                this.reset();
                return;
            }

            this.placeEl.replaceWith(el);

            if (this.hasNewRoot) {
                if (this.options.fixed === true) {
                    this.restoreItemAtIndex(el, srcIndex);
                }
                else {
                    this.el.trigger('lostItem');
                }
                this.dragRootEl.trigger('gainedItem');
            }
            else {
                this.dragRootEl.trigger('change');
            }

            this.options.callback.call(this, this.dragRootEl, el, position);

            this.reset();
        },

        dragMove: function(e) {
            var list, parent, prev, next, depth,
                opt = this.options,
                mouse = this.mouse;

            this.dragEl.css({
                'left': e.pageX - mouse.offsetX,
                'top': e.pageY - mouse.offsetY
            });

            // mouse position last events
            mouse.lastX = mouse.nowX;
            mouse.lastY = mouse.nowY;
            // mouse position this events
            mouse.nowX = e.pageX;
            mouse.nowY = e.pageY;
            // distance mouse moved between events
            mouse.distX = mouse.nowX - mouse.lastX;
            mouse.distY = mouse.nowY - mouse.lastY;
            // direction mouse was moving
            mouse.lastDirX = mouse.dirX;
            mouse.lastDirY = mouse.dirY;
            // direction mouse is now moving (on both axis)
            mouse.dirX = mouse.distX === 0 ? 0 : mouse.distX > 0 ? 1 : -1;
            mouse.dirY = mouse.distY === 0 ? 0 : mouse.distY > 0 ? 1 : -1;
            // axis mouse is now moving on
            var newAx = Math.abs(mouse.distX) > Math.abs(mouse.distY) ? 1 : 0;

            // do nothing on first move
            if (!mouse.moving) {
                mouse.dirAx = newAx;
                mouse.moving = true;
                return;
            }

            // do scrolling if enable
            if (opt.scroll) {
                if (typeof window.jQuery.fn.scrollParent !== 'undefined') {
                    var scrolled = false;
                    var scrollParent = this.el.scrollParent()[0];
                    if (scrollParent !== document && scrollParent.tagName !== 'HTML') {
                        if ((opt.scrollTriggers.bottom + scrollParent.offsetHeight) - e.pageY < opt.scrollSensitivity)
                            scrollParent.scrollTop = scrolled = scrollParent.scrollTop + opt.scrollSpeed;
                        else if (e.pageY - opt.scrollTriggers.top < opt.scrollSensitivity)
                            scrollParent.scrollTop = scrolled = scrollParent.scrollTop - opt.scrollSpeed;

                        if ((opt.scrollTriggers.right + scrollParent.offsetWidth) - e.pageX < opt.scrollSensitivity)
                            scrollParent.scrollLeft = scrolled = scrollParent.scrollLeft + opt.scrollSpeed;
                        else if (e.pageX - opt.scrollTriggers.left < opt.scrollSensitivity)
                            scrollParent.scrollLeft = scrolled = scrollParent.scrollLeft - opt.scrollSpeed;
                    } else {
                        if (e.pageY - $(document).scrollTop() < opt.scrollSensitivity)
                            scrolled = $(document).scrollTop($(document).scrollTop() - opt.scrollSpeed);
                        else if ($(window).height() - (e.pageY - $(document).scrollTop()) < opt.scrollSensitivity)
                            scrolled = $(document).scrollTop($(document).scrollTop() + opt.scrollSpeed);

                        if (e.pageX - $(document).scrollLeft() < opt.scrollSensitivity)
                            scrolled = $(document).scrollLeft($(document).scrollLeft() - opt.scrollSpeed);
                        else if ($(window).width() - (e.pageX - $(document).scrollLeft()) < opt.scrollSensitivity)
                            scrolled = $(document).scrollLeft($(document).scrollLeft() + opt.scrollSpeed);
                    }
                } else {
                    console.warn('To use scrolling you need to have scrollParent() function, check documentation for more information');
                }
            }

            if (this.scrollTimer) {
                clearTimeout(this.scrollTimer);
            }

            if (opt.scroll && scrolled) {
                this.scrollTimer = setTimeout(function() {
                    $(window).trigger(e);
                }, 10);
            }

            // calc distance moved on this axis (and direction)
            if (mouse.dirAx !== newAx) {
                mouse.distAxX = 0;
                mouse.distAxY = 0;
            }
            else {
                mouse.distAxX += Math.abs(mouse.distX);
                if (mouse.dirX !== 0 && mouse.dirX !== mouse.lastDirX) {
                    mouse.distAxX = 0;
                }
                mouse.distAxY += Math.abs(mouse.distY);
                if (mouse.dirY !== 0 && mouse.dirY !== mouse.lastDirY) {
                    mouse.distAxY = 0;
                }
            }
            mouse.dirAx = newAx;

            /**
             * move horizontal
             */
            if (mouse.dirAx && mouse.distAxX >= opt.threshold) {
                // reset move distance on x-axis for new phase
                mouse.distAxX = 0;
                prev = this.placeEl.prev(opt.itemNodeName);
                // increase horizontal level if previous sibling exists, is not collapsed, and can have children
                if (mouse.distX > 0 && prev.length && !prev.hasClass(opt.collapsedClass) && !prev.hasClass(opt.noChildrenClass)) {
                    // cannot increase level when item above is collapsed
                    list = prev.find(opt.listNodeName).last();
                    // check if depth limit has reached
                    depth = this.placeEl.parents(opt.listNodeName).length;
                    if (depth + this.dragDepth <= opt.maxDepth) {
                        // create new sub-level if one doesn't exist
                        if (!list.length) {
                            this.createSubLevel(prev, this.placeEl);
                        }
                        else {
                            // else append to next level up
                            list = prev.children(opt.listNodeName).last();
                            list.append(this.placeEl);
                        }
                    }
                }
                // decrease horizontal level
                if (mouse.distX < 0) {
                    // we can't decrease a level if an item preceeds the current one
                    next = this.placeEl.next(opt.itemNodeName);
                    if (!next.length) {
                        parent = this.placeEl.parent();
                        this.placeEl.closest(opt.itemNodeName).after(this.placeEl);
                        if (!parent.children().length) {
                            this.unsetParent(parent.parent());
                        }
                    }
                }
            }

            var isEmpty = false;

            // find list item under cursor
            if (!hasPointerEvents) {
                this.dragEl[0].style.visibility = 'hidden';
            }
            this.pointEl = $(document.elementFromPoint(e.pageX - document.body.scrollLeft, e.pageY - (window.pageYOffset || document.documentElement.scrollTop)));
            if (!hasPointerEvents) {
                this.dragEl[0].style.visibility = 'visible';
            }
            if (this.pointEl.hasClass(opt.handleClass)) {
                this.pointEl = this.pointEl.closest(opt.itemNodeName);
            }
            if (this.pointEl.hasClass(opt.emptyClass)) {
                isEmpty = true;
            }
            else if (!this.pointEl.length || !this.pointEl.hasClass(opt.itemClass)) {
                return;
            }

            // find parent list of item under cursor
            var pointElRoot = this.pointEl.closest('.' + opt.rootClass),
                isNewRoot = this.dragRootEl.data('nestable-id') !== pointElRoot.data('nestable-id');

            /**
             * move vertical
             */
            if (!mouse.dirAx || isNewRoot || isEmpty) {
                // check if groups match if dragging over new root
                if (isNewRoot && opt.group !== pointElRoot.data('nestable-group')) {
                    return;
                }

                // fixed item's depth, use for some list has specific type, eg:'Volume, Section, Chapter ...'
                if (this.options.fixedDepth && this.dragDepth + 1 !== this.pointEl.parents(opt.listNodeName).length) {
                    return;
                }

                // check depth limit
                depth = this.dragDepth - 1 + this.pointEl.parents(opt.listNodeName).length;
                if (depth > opt.maxDepth) {
                    return;
                }
                var before = e.pageY < (this.pointEl.offset().top + this.pointEl.height() / 2);
                parent = this.placeEl.parent();
                // if empty create new list to replace empty placeholder
                if (isEmpty) {
                    list = $(document.createElement(opt.listNodeName)).addClass(opt.listClass);
                    list.append(this.placeEl);
                    this.pointEl.replaceWith(list);
                }
                else if (before) {
                    this.pointEl.before(this.placeEl);
                }
                else {
                    this.pointEl.after(this.placeEl);
                }
                if (!parent.children().length) {
                    this.unsetParent(parent.parent());
                }
                if (!this.dragRootEl.find(opt.itemNodeName).length) {
                    this.appendEmptyElement(this.dragRootEl);
                }
                // parent root list has changed
                this.dragRootEl = pointElRoot;
                if (isNewRoot) {
                    this.hasNewRoot = this.el[0] !== this.dragRootEl[0];
                }
            }
        },

        // Append the .dd-empty div to the list so it can be populated and styled
        appendEmptyElement: function(element) {
            element.append('<div class="' + this.options.emptyClass + '"/>');
        }
    };

    $.fn.nestable = function(params) {
        var lists  = this,
            retval = this,
            args   = arguments;

        if (!('Nestable' in window)) {
            window.Nestable = {};
            Nestable.counter = 0;
        }

        lists.each(function() {
            var plugin = $(this).data("nestable");

            if (!plugin) {
                Nestable.counter++;
                $(this).data("nestable", new Plugin(this, params));
                $(this).data("nestable-id", Nestable.counter);
            }
            else {
                if (typeof params === 'string' && typeof plugin[params] === 'function') {
                    if (args.length > 1){
                        var pluginArgs = [];
                        for (var i = 1; i < args.length; i++) {
                            pluginArgs.push(args[i]);
                        }
                        retval = plugin[params].apply(plugin, pluginArgs);
                    }
                    else {
                        retval = plugin[params]();
                    }
                }
            }
        });

        return retval || lists;
    };

})(window.jQuery || window.Zepto, window, document);
