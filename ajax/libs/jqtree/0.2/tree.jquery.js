/*
Copyright 2011 Marco Braak

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
// todo: check for invalid move
// todo: drag handle
// todo: display move hint
// todo: change cursor for moving / over node that can be moved
// todo: easier (alternative) syntax for input json data (string instead of 'label', array instead of 'children')
// todo: use jqueryui icons for folder triangles
// todo: documentation
// todo: scroll while moving a node?
// todo: smooth animation while moving node
// todo: plugins (also for dnd and state)?
// todo: rename to jquery.tree.js? also css-file?
// todo: move a node to root position
// todo: prevent accidental move on touchpad
// todo: display icon if position is invalid for dropping
// todo: test on ie
// todo: change onMustAddHitArea event to function that tests if move is legal

window.Tree = {};

(function($) {
    function indexOf(array, item) {
        if (array.indexOf) {
            return array.indexOf(item);
        }
        else {
            var i, l;
            for (i = 0, l = array.length; i < l; i++) {
                if (array[i] === item) {
                    return i;
                }
            }
            return -1;
        }
    }

    // toJson function; copied from jsons2
    var escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,meta={"\u0008":"\\b","\t":"\\t","\n":"\\n","\u000c":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};
    function toJson(p,g,h){function m(a){escapable.lastIndex=0;return escapable.test(a)?'"'+a.replace(escapable,function(a){var c=meta[a];return typeof c==="string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function j(g,h){var c,i,e,k,l=a,d,b=h[g];typeof f==="function"&&(b=f.call(h,g,b));switch(typeof b){case "string":return m(b);case "number":return isFinite(b)?String(b):"null";case "boolean":case "null":return String(b);case "object":if(!b)return"null";a+=n;d=[];if(Object.prototype.toString.apply(b)===
    "[object Array]"){k=b.length;for(c=0;c<k;c+=1)d[c]=j(c,b)||"null";e=d.length===0?"[]":a?"[\n"+a+d.join(",\n"+a)+"\n"+l+"]":"["+d.join(",")+"]";a=l;return e}if(f&&typeof f==="object"){k=f.length;for(c=0;c<k;c+=1)typeof f[c]==="string"&&(i=f[c],(e=j(i,b))&&d.push(m(i)+(a?": ":":")+e))}else for(i in b)Object.prototype.hasOwnProperty.call(b,i)&&(e=j(i,b))&&d.push(m(i)+(a?": ":":")+e);e=d.length===0?"{}":a?"{\n"+a+d.join(",\n"+a)+"\n"+l+"}":"{"+d.join(",")+"}";a=l;return e}}var o,f,a="",n="";if(typeof h===
    "number")for(o=0;o<h;o+=1)n+=" ";else typeof h==="string"&&(n=h);if((f=g)&&typeof g!=="function"&&(typeof g!=="object"||typeof g.length!=="number"))throw Error("JSON.stringify");return j("",{"":p})};

    var Position = {
        BEFORE: 1,
        AFTER: 2,
        INSIDE: 3,

        getName: function(position) {
            return this._getNames()[position];
        },

        _getNames: function() {
            // todo: cache
            var names = {};
            names[Position.BEFORE] = 'before';
            names[Position.AFTER] = 'after';
            names[Position.INSIDE] = 'inside';
            return names;
        }
    };

    window.Tree.Position = Position;

    var Node = function(name) {
        this.init(name);
    };

    window.Tree.Node = Node;

    Node.prototype = {
        init: function(name) {
            this.name = name;
            this.children = [];
            this.parent = null;
        },

        /* Create tree from data.

          Structure of data is:
            [
                {
                    label: 'node1',
                    children: [
                        { label: 'child1' },
                        { label: 'child2' }
                    ]
                },
                {
                    label: 'node2'
                }
            ]
        */
        loadFromData: function(data) {
            this.children = [];

            var self = this;
            $.each(data, function() {
                // todo: node property is 'name', but we use 'label' here
                var node = new Node(this.label);

                $.each(this, function(key, value) {
                    if (key != 'label') {
                        node[key] = value;
                    }
                });

                self.addChild(node);

                if (this.children) {
                    node.loadFromData(this.children);
                }
            });
        },

        /*
        Add child.

        tree.addChild(
            new Node('child1')
        );
        */
        addChild: function(node) {
            this.children.push(node);
            node.parent = this;
        },

        /*
        Add child at position. Index starts at 0.

        tree.addChildAtPosition(
            new Node('abc'),
            1
        );
        */
        addChildAtPosition: function(node, index) {
            this.children.splice(index, 0, node);
            node.parent = this;
        },

        /*
        Remove child.

        tree.removeChile(tree.children[0]);
        */
        removeChild: function(node) {
            this.children.splice(
                this.getChildIndex(node),
                1
            );
        },

        /*
        Get child index.

        var index = getChildIndex(node);
        */
        getChildIndex: function(node) {
            return $.inArray(node, this.children);
        },

        /*
        Does the tree have children?

        if (tree.hasChildren()) {
            //
        }
        */
        hasChildren: function() {
            return (this.children.length != 0);
        },

        /*
        Iterate over all the nodes in the tree.

        Calls callback with (node, level).

        The callback must return true to continue the iteration on current node.

        tree.iterate(
            function(node, level) {
               console.log(node.name);

               // stop iteration after level 2
               return (level <= 2);
            }
        );

        Todo: remove level parameter, use different function for recursion (_iterate).
        */
        iterate: function(callback, level) {
            if (! level) {
                level = 0;
            }

            $.each(this.children, function() {
                var result = callback(this, level);

                if (this.hasChildren() && result) {
                    this.iterate(callback, level + 1);
                }
            });
        },

        /*
        Move node relative to another node.

        Argument position: Position.BEFORE, Position.AFTER or Position.Inside

        // move node1 after node2
        tree.moveNode(node1, node2, Position.AFTER);
        */
        moveNode: function(moved_node, target_node, position) {
            // todo: check for illegal move
            moved_node.parent.removeChild(moved_node);
            if (position == Position.AFTER) {
                target_node.parent.addChildAtPosition(
                    moved_node,
                    target_node.parent.getChildIndex(target_node) + 1
                );
            }
            else if (position == Position.BEFORE) {
                target_node.parent.addChildAtPosition(
                    moved_node,
                    target_node.parent.getChildIndex(target_node)
                );
            }
            else if (position == Position.INSIDE) {
                // move inside as first child
                target_node.addChildAtPosition(moved_node, 0);
            }
        }
    };

    Node.createFromData = function(data) {
        var tree = new Node();
        tree.loadFromData(data);
        return tree;
    };

    window.Tree.Tree = Node;

    $.widget("ui.tree", $.ui.mouse, {
        widgetEventPrefix: "tree",
        options: {
            autoOpen: false,  // true / false / int (open n levels starting at 0)
            saveState: false,  // true / false / string (cookie name)
            dragAndDrop: false,
            selectable: false,
            onClick: null,  // todo: renamed to onClickNode?
            onContextMenu: null,
            onMoveNode: null,
            onSetStateFromStorage: null,
            onGetStateFromStorage: null,
            onCreateLi: null,
            onMustAddHitArea: null,
            onIsMoveHandle: null
        },

        getTree: function() {
            return this.tree;
        },

        // todo: is toggle really used?
        toggle: function(node, on_finished) {
            if (node.hasChildren()) {
                new FolderElement(node).toggle(on_finished);
            }

            if (this.options.saveState) {
                this._saveState();
            }
        },

        selectNode: function(node) {
            if (this.options.selectable) {
                if (this.selected_node) {
                    this._getNodeElementForNode(this.selected_node).deselect();
                }

                this._getNodeElementForNode(node).select();
                this.selected_node = node;

                if (this.options.saveState) {
                    this._saveState();
                }
            }
        },

        getSelectedNode: function() {
            return this.selected_node || false;
        },

        _create: function() {
            this.tree = Node.createFromData(this.options.data);
            this.selected_node = null;
            this._openNodes();

            this._createDomElements(this.tree);

            if (this.selected_node) {
                var node_element = this._getNodeElementForNode(this.selected_node);
                if (node_element) {
                    node_element.select();
                }
            }

            this.element.click($.proxy(this._click, this));
            this.element.bind('contextmenu', $.proxy(this._contextmenu, this));

            this._mouseInit();

            this.hovered_area = null;
            this.$ghost = null;
            this.hit_areas = [];
        },

        destroy: function() {
            this.element.empty();
            this.element.unbind();
            this.tree = null;

            this._mouseDestroy();
            $.Widget.prototype.destroy.call(this);
        },

        _getState: function() {
            var open_nodes = [];

            this.tree.iterate(function(node) {
                if (
                    node.is_open &&
                    node.id &&
                    node.hasChildren()
                ) {
                    open_nodes.push(node.id);
                }
                return true;
            });

            var selected_node = '';
            if (this.selected_node) {
                selected_node = this.selected_node.id;
            }

            return toJson({
                open_nodes: open_nodes,
                selected_node: selected_node
            });
        },

        _setState: function(state) {
            var data = $.parseJSON(state);
            var open_nodes = data.open_nodes;
            var selected_node_id = data.selected_node;

            var self = this;
            this.tree.iterate(function(node) {
                if (
                    node.id &&
                    node.hasChildren() &&
                    (indexOf(open_nodes, node.id) >= 0)
                ) {
                    node.is_open = true;
                }

                if (selected_node_id && (node.id == selected_node_id)) {
                    self.selected_node = node;
                }

                return true;
            });
        },

        _saveState: function() {
            if (this.options.onSetStateFromStorage) {
                this.options.onSetStateFromStorage(this._getState());
            }
            else {
                $.cookie(
                    this._getCookieName(),
                    this._getState(),
                    {path: '/'}
                );
            }
        },

        _restoreState: function() {
            var state;

            if (this.options.onGetStateFromStorage) {
                state = this.options.onGetStateFromStorage();
            }
            else {
                state = $.cookie(
                    this._getCookieName(),
                    {path: '/'}
                );
            }

            if (! state) {
                return false;
            }
            else {
                this._setState(state);
                return true;
            }
        },

        _getCookieName: function() {
            if (typeof this.options.saveState == 'string') {
                return this.options.saveState;
            }
            else {
                return 'tree';
            }
        },

        _createDomElements: function(tree) {
            var self = this;

            function createUl(depth, is_open) {
                var classes = [];
                if (! depth) {
                    classes.push('tree');
                }

                var $element = $('<ul />');
                $element.addClass(classes.join(' '));
                return $element;
            }

            function createLi(node) {
                var $li;
                if (node.hasChildren()) {
                    $li = createFolderLi(node);
                }
                else {
                    $li = createNodeLi(node);
                }

                if (self.options.onCreateLi) {
                    self.options.onCreateLi(node, $li);
                }

                return $li;
            }

            function createNodeLi(node) {
                return $('<li><span>'+ node.name +'</span></li>');
            }

            function createFolderLi(node) {
                var button_classes = ['toggler'];

                if (! node.is_open) {
                    button_classes.push('closed');
                }

                var $li = $('<li><a class="'+ button_classes.join(' ') +'">&raquo;</a><span>'+ node.name +'</span></li>');

                // todo: add li class in text
                var folder_classes = ['folder'];
                if (! node.is_open) {
                    folder_classes.push('closed');
                }
                $li.addClass(folder_classes.join(' '));
                return $li;
            }

            function doCreateDomElements($element, children, depth, is_open) {
                var ul = createUl(depth, is_open);
                $element.append(ul);

                $.each(children, function() {
                    var $li = createLi(this);
                    ul.append($li);

                    this.element = $li[0];
                    $li.data('node', this);

                    if (this.hasChildren()) {
                        doCreateDomElements($li, this.children, depth + 1, this.is_open);
                    }
                });
            }

            doCreateDomElements(this.element, tree.children, 0, true);
        },

        _click: function(e) {
            // todo: handle rightclick
            if (e.ctrlKey) {
                return;
            }

            var $target = $(e.target);

            if ($target.is('a.toggler')) {
                var node_element = this._getNodeElement($target);
                if (node_element && (node_element.node.hasChildren())) {
                    node_element.toggle();

                    if (this.options.saveState) {
                        this._saveState();
                    }

                    e.preventDefault();
                    e.stopPropagation();
                }
            }
            else if ($target.is('span')) {
                var node = this._getNode($target);
                if (node) {
                    this.selectNode(node);

                    if (this.options.onClick) {
                        this.options.onClick(node);
                    }
                }
            }
        },

        _contextmenu: function(e) {
            if (! this.options.onContextMenu) {
                return;
            }

            var $target = $(e.target);

            if (
                ($target.is('span')) &&
                (! $target.is('span.folder'))
            ) {
                var node = this._getNode($target);
                if (node) {
                    e.preventDefault();
                    e.stopPropagation();

                    this.options.onContextMenu(e, node);
                    return false;
                }
            }
        },

        _getNode: function($element) {
            var $li = $element.closest('li');
            if ($li.length == 0) {
                return null;
            }
            else {
                return $li.data('node');
            }
        },

        _getNodeElement: function($element) {
            var node = this._getNode($element);
            if (node) {
                return this._getNodeElementForNode(node);
            }
            else {
                return null;
            }
        },

        _getNodeElementForNode: function(node) {
            if (node.hasChildren()) {
                return new FolderElement(node);
            }
            else {
                return new NodeElement(node);
            }
        },

        _mouseCapture: function(event) {
            if (! this.options.dragAndDrop) {
                return;
            }

            var $element = $(event.target);
            if (this.options.onIsMoveHandle && !this.options.onIsMoveHandle($element)) {
                return null;
            }
            this.current_item = this._getNodeElement($(event.target));

            return (this.current_item != null);
        },

        _mouseStart: function(event) {
            if (! this.options.dragAndDrop) {
                return;
            }

            this.current_item.$element.hide();
            this._refreshHitAreas();
            this.helper = this._createHelper();

            return true;
        },

        _mouseDrag: function(event) {
            if (! this.options.dragAndDrop) {
                return;
            }

            this.helper.offset({
                left: event.pageX + 16,
                top: event.pageY
            });

            var area = this.findHoveredArea(event.pageX, event.pageY);
            if (! area) {
                this._removeDropHint();
                this._removeHover();
                this._stopOpenFolderTimer();
            }
            else {
                if (this.hovered_area != area) {
                    this.hovered_area = area;

                    this._updateDropHint();
                }
            }

            return true;
        },

        _updateDropHint: function() {
            // stop open folder times
            this._stopOpenFolderTimer();

            if (! this.hovered_area) {
                return;
            }

            // if this is a closed folder, start timer to open it
            var node = this.hovered_area.node;
            if (
                node.hasChildren() &&
                !node.is_open &&
                this.hovered_area.position == Position.INSIDE
            ) {
                this._startOpenFolderTimer(node);
            }

            // remove previous drop hint
            this._removeDropHint();

            // add new drop hint
            var node_element = this._getNodeElementForNode(this.hovered_area.node);
            this.previous_ghost = node_element.addDropHint(this.hovered_area.position);
        },

        _mouseStop: function() {
            if (! this.options.dragAndDrop) {
                return;
            }

            this._moveItem();
            this._clear();
            this._removeHover();
            this._removeDropHint();
            this._removeHitAreas();

            this.current_item.$element.show();
            return false;
        },

        _mouseMove: function(event) {
            // Prevent jqueryui from triggering mouseup in ie8.
            if ($.browser.msie && document.documentMode == 8 && !event.button) {
                event.button = 1;
            }

            return $.ui.mouse.prototype._mouseMove.call(this, event);
        },

        _moveItem: function() {
            if (this.hovered_area) {
                this.tree.moveNode(
                    this.current_item.node,
                    this.hovered_area.node,
                    this.hovered_area.position
                );

                if (this.hovered_area.position == Position.INSIDE) {
                    this.hovered_area.node.is_open = true;
                }

                if (this.options.onMoveNode) {
                    this.options.onMoveNode(
                        this.current_item.node,
                        this.hovered_area.node,
                        Position.getName(this.hovered_area.position)
                    );
                }
            }

            this.element.empty();
            this._createDomElements(this.tree);
        },

        _createHelper: function() {
            var $helper = this.current_item.createHelper();
            $helper.css("position", "absolute");
            this.element.append($helper);
            return $helper;
        },

        _clear: function() {
            this.helper.remove();
            this.helper = null;
        },

        _refreshHitAreas: function() {
            this._removeHitAreas();
            this._generateHitAreas();
        },

        _generateHitAreas: function() {
            var self = this;
            var positions = [];
            var last_top = 0;

            function getTop($element) {
                return $element.offset().top;
            }

            function addPosition(node, position, top) {
                positions.push({
                    top: top,
                    node: node,
                    position: position
                });

                last_top = top;
            }

            function groupPositions(handle_group) {
                var previous_top = -1;
                var group = [];

                $.each(positions, function() {
                    if (this.top != previous_top) {
                        if (group.length) {
                            handle_group(group, previous_top, this.top);
                        }

                        previous_top = this.top;
                        group = [];
                    }

                    group.push(this);
                });

                handle_group(
                    group,
                    previous_top,
                    self.element.offset().top + self.element.height()
                );
            }

            function handleNode(node, $element) {
                var top = getTop($element);
                addPosition(node, Position.INSIDE, top);
                addPosition(node, Position.AFTER, top);
            }

            function handleOpenFolder(node, $element) {
                addPosition(
                    node,
                    Position.INSIDE,
                    getTop($element)
                );
            }

            function handleAfterOpenFolder(node, $element) {
                addPosition(node, Position.AFTER, last_top);
            }

            function handleClosedFolder(node, $element) {
                var top = getTop($element);
                addPosition(node, Position.INSIDE, top);
                addPosition(node, Position.AFTER, top);
            }

            this._iterateVisibleNodes(
                handleNode, handleOpenFolder, handleClosedFolder, handleAfterOpenFolder
            );

            var hit_areas = [];

            groupPositions(function(positions_in_group, top, bottom) {
                var area_height = (bottom - top) / positions_in_group.length;
                var area_top = top;

                $.each(positions_in_group, function() {
                    hit_areas.push({
                        top: area_top,
                        bottom: area_top + area_height,
                        node: this.node,
                        position: this.position
                    });

                    area_top += area_height;
                });
            });

            this.hit_areas = hit_areas;
        },

        findHoveredArea: function(x, y) {
            var tree_offset = this.element.offset();
            if (
                x < tree_offset.left ||
                y < tree_offset.top ||
                x > (tree_offset.left + this.element.width()) ||
                y > (tree_offset.top + this.element.height())
            ) {
                return null;
            }

            var low = 0;
            var high = this.hit_areas.length;
            var area, mid;
            while (low < high) {
                mid = (low + high) >> 1;
                area = this.hit_areas[mid];

                if (y < area.top) {
                    high = mid;
                }
                else if (y > area.bottom) {
                    low = mid + 1;
                }
                else {
                    return area;
                }
            }
            return null;
        },

        _iterateVisibleNodes: function(
            handle_node, handle_open_folder, handle_closed_folder, handle_after_open_folder
        ) {
            var self = this;

            function iterate(node) {
                if (node.element) {
                    var $element = $(node.element);

                    if (! $element.is(':visible')) {
                        return;
                    }

                    if (self.options.onMustAddHitArea) {
                        if (! self.options.onMustAddHitArea(node)) {
                            return;
                        }
                    }

                    if (! node.hasChildren()) {
                        handle_node(node, $element);
                    }
                    else if (node.is_open) {
                        handle_open_folder(node, $element);
                    }
                    else {
                        handle_closed_folder(node, $element);
                    }
                }

                if ((node.is_open || !node.element) && node.hasChildren()) {
                    $.each(node.children, function() {
                        iterate(this);
                    });

                    if (node.is_open) {
                        handle_after_open_folder(node, $element);
                    }
                }
            }

            iterate(this.tree);
        },

        _removeHover: function() {
            this.hovered_area = null;
        },

        _removeDropHint: function() {
            if (this.previous_ghost) {
                this.previous_ghost.remove();
            }
        },

        _removeHitAreas: function() {
            this.hit_areas = [];
        },

        _openNodes: function() {
            var max_level;

            if (this.options.saveState) {
                if (this._restoreState()) {
                    return;
                }
            }

            if (this.options.autoOpen === false) {
                return;
            }
            else if (this.options.autoOpen === true) {
                max_level = -1;
            }
            else {
                max_level = parseInt(this.options.autoOpen);
            }

            this.tree.iterate(function(node, level) {
                node.is_open = true;
                return (level != max_level);
            });
        },

        _startOpenFolderTimer: function(folder) {
            var self = this;

            function openFolder() {
                self._getNodeElementForNode(folder).open(
                    function() {
                        self._refreshHitAreas();
                        self._updateDropHint();
                    }
                );
            }

            this.open_folder_timer = setTimeout(openFolder, 500);
        },

        _stopOpenFolderTimer: function() {
            if (this.open_folder_timer) {
                clearTimeout(this.open_folder_timer);
                this.open_folder_timer = null;
            }
        }
    });

    var GhostDropHint = function(node, $element, position) {
        this.$element = $element;
        var $span = $element.find('span:first');

        this.node = node;

        this.$ghost = $('<li class="ghost"><span class="circle"></span><span class="line"></span></li>');
        this.$ghost.css({
            width: $span.width() + 8
        });

        if (position == Position.AFTER) {
            this.moveAfter();
        }
        else if (position == Position.BEFORE) {
            this.moveBefore();
        }
        else if (position == Position.INSIDE) {
            if (node.hasChildren() && node.is_open) {
                this.moveInsideOpenFolder();
            }
            else {
                this.moveInside();
            }
        }
    };

    $.extend(GhostDropHint.prototype, {
        remove: function() {
            this.$ghost.remove();
        },

        moveAfter: function() {
            this.$element.after(this.$ghost);
        },

        moveBefore: function() {
            this.$element.before(this.$ghost);
        },

        moveInsideOpenFolder: function() {
            $(this.node.children[0].element).before(this.$ghost);
        },

        moveInside: function() {
            this.$element.after(this.$ghost);
            this.$ghost.addClass('inside');
        }
    });

    var BorderDropHint = function($element) {
        var $span = $element.find('span:first');
        var offset = $span.offset();

        this.$hint = $('<span class="border"></span>');
        $element.append(this.$hint);

        this.$hint.css({
            left: offset.left - 4,
            top: offset.top - 4,
            width: $span.width() + 8,
            height: $span.height() + 4
        });
    };

    $.extend(BorderDropHint.prototype, {
        remove: function() {
            this.$hint.remove();
        }
    });

    var NodeElement = function(node) {
        this.init(node);
    };

    $.extend(NodeElement.prototype, {
        init: function(node) {
            this.node = node;
            this.$element = $(node.element)
        },

        getUl: function() {
            return this.$element.children('ul:first');
        },

        getSpan: function() {
            return this.$element.children('span:first');
        },

        getLi: function() {
            return this.$element;
        },

        createHelper: function() {
            var $helper = this.getSpan().clone();
            $helper.addClass('tree-dragging');
            return $helper;
        },

        addDropHint: function(position) {
            if (position == Position.INSIDE) {
                return new BorderDropHint(this.$element);
            }
            else {
                return new GhostDropHint(this.node, this.$element, position);
            }
        },

        select: function() {
            this.getSpan().addClass('selected');
        },

        deselect: function() {
            this.getSpan().removeClass('selected');
        }
    });

    var FolderElement = function(node) {
        this.init(node);
    };

    $.extend(FolderElement.prototype, NodeElement.prototype, {
        toggle: function(on_finished) {
            if (this.node.is_open) {
                this.close(on_finished);
            }
            else {
                this.open(on_finished);
            }
        },

        open: function(on_finished) {
            this.node.is_open = true;
            this.getButton().removeClass('closed');

            this.getUl().slideDown(
                'fast',
                $.proxy(
                    function() {
                        this.getLi().removeClass('closed');
                        if (on_finished) {
                            on_finished();
                        }
                    },
                    this
                )
            );
        },

        close: function(on_finished) {
            this.node.is_open = false;
            this.getButton().addClass('closed');

            this.getUl().slideUp(
                'fast',
                $.proxy(
                    function() {
                        this.getLi().addClass('closed');
                        if (on_finished) {
                            on_finished();
                        }
                    },
                    this
                )
            );
        },

        getButton: function() {
            return this.$element.children('a.toggler');
        },

        addDropHint: function(position) {
            if (! this.node.is_open && position == Position.INSIDE) {
                return new BorderDropHint(this.$element);
            }
            else {
                return new GhostDropHint(this.node, this.$element, position);
            }
        }
    });
})(jQuery);
