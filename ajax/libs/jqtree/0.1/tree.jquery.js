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
// todo: test on different browsers
// todo: plugins (also for dnd and state)?
// todo: rename to jquery.tree.js? also css-file?
// todo: move a node to root position
// todo: prevent accidental move on touchpad

_TestClasses = {};

(function($) {
    var indexOf = function(elem, array) {
        for (var i = 0, length = array.length; i < length; i++) {
            if (array[i] == elem) {
                return i;
            }
        }

        return -1;
    };

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

    _TestClasses.Position = Position;

    var Node = function(name) {
        this.init(name);
    };

    _TestClasses.Node = Node;

    $.extend(Node.prototype, {
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
                target_node.addChild(moved_node);
            }
        }
    });

    Node.createFromData = function(data) {
        var tree = new Tree();
        tree.loadFromData(data);
        return tree;
    };

    var Tree = Node;

    _TestClasses.Tree = Tree;

    var Area = function(left, top, right, bottom) {
        this.init(left, top, right, bottom);
    };

    _TestClasses.Area = Area;

    $.extend(Area.prototype, {
         init: function(left, top, right, bottom) {
             this.left = left;
             this.top = top;
             this.right = right;
             this.bottom = bottom;

             this.children = [];
         },

        addArea: function(area) {
            this.children.push(area);
        },

        findIntersectingArea: function(area) {
            if (! this.intersects(area)) {
                return null;
            }
            else {
                for (var i=0; i < this.children.length; i++) {
                    var result = this.children[i].findIntersectingArea(area);
                    if (result) {
                        return result;
                    }
                }

                return this;
            }
        },

        intersects: function(area) {
            return (
                (this.bottom >= area.top) &&
                (this.top <= area.bottom) &&
                (this.right >= area.left) &&
                (this.left <= area.right)
            );
        },

        duplicate: function() {
            return new Area(
                this.left,
                this.top,
                this.right,
                this.bottom
            );
        },

        iterate: function(callback) {
            callback(this);

            $.each(this.children, function(i, area) {
                area.iterate(callback);
            });
        },

        setMinimumWidth: function(minimum_width) {
            var width = this.right - this.left;
            if (width < minimum_width) {
                this.right = this.left + minimum_width;
            }
        }
    });

    Area.createFromElement = function($element) {
        var offset = $element.offset();

        return new Area(
            offset.left,
            offset.top,
            offset.left + $element.outerWidth(),
            offset.top + $element.outerHeight()
        );
    };

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
            displayTestNodes: false
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

        getSelectedNode: function() {
            return this.selected_node;
        },

        _create: function() {
            this.tree = Tree.createFromData(this.options.data);
            this._openNodes();

            this._createDomElements(this.tree);
            this.element.click($.proxy(this._click, this));
            this.element.bind('contextmenu', $.proxy(this._contextmenu, this));

            this._mouseInit();

            this.hovered_rectangle = null;
            this.selected_node = null;
            this.$ghost = null;
            this.hint_nodes = [];
        },

        _destroy: function() {
            this.element.empty();
            this.tree = null;

            this._mouseDestroy();
            return this;
        },

        _getState: function() {
            var state = [];

            this.tree.iterate(function(node) {
                if (
                    node.is_open &&
                    node.id &&
                    node.hasChildren()
                ) {
                    state.push(node.id);
                }
                return true;
            });

            return state.join(',');
        },

        _setState: function(state) {
            var open_nodes = state.split(',');
            this.tree.iterate(function(node) {
                if (
                    node.id &&
                    node.hasChildren() &&
                    (indexOf(node.id, open_nodes) != -1)
                ) {
                    node.is_open = true;
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
                    if (this.options.selectable) {
                        if (this.selected_node) {
                            this._getNodeElementForNode(this.selected_node).deselect();
                        }

                        this._getNodeElementForNode(node).select();

                        this.selected_node = node;
                    }

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

            this.current_item = this._getNodeElement($(event.target));

            return (this.current_item != null);
        },

        _mouseStart: function(event) {
            if (! this.options.dragAndDrop) {
                return;
            }

            var $element = this.current_item.$element;

            //The element's absolute position on the page minus margins
            var offset = $element.offset();

            this.offset = {
                top: offset.top - (parseInt($element.css("marginTop"), 10) || 0),
                left: offset.left - (parseInt($element.css("marginLeft"), 10) || 0)
            };

            $.extend(this.offset, {
                //Where the click happened, relative to the element
                click: {
                    left: event.pageX - this.offset.left,
                    top: event.pageY - this.offset.top
                }
            });

            $element.hide();

            this._refreshHitAreas();

            //Create and append the visible helper
            this.helper = this._createHelper();
            return true;
        },

        _mouseDrag: function(event) {
            if (! this.options.dragAndDrop) {
                return;
            }

            //Compute the helpers position
            this.position = this._generatePosition(event);
            this.positionAbs = this.position;
            this.helper.offset(this.position);

            var hovered_rectangle = this._findHoveredRectangle();

            var cursor = this.helper.offset();
            cursor.right = cursor.left + this.current_item.$element.outerWidth();
            cursor.bottom = cursor.top + this.current_item.$element.outerHeight();

            if (
                ! ((hovered_rectangle) && hovered_rectangle.node)
            ) {
                this._removeGhost();
                this._removeHover();
                this._stopOpenFolderTimer();
            }
            else {
                if (this.hovered_rectangle != hovered_rectangle) {
                    this.hovered_rectangle = hovered_rectangle;

                    var $ghost = this._getGhost();
                    $ghost.detach();

                    this._stopOpenFolderTimer();
                    var node = this.hovered_rectangle.node;

                    if (node.hasChildren() && !node.is_open) {
                        this._startOpenFolderTimer(node);
                    }
                    else {
                        this._getNodeElementForNode(hovered_rectangle.node)
                            .appendGhost($ghost, hovered_rectangle.move_to);
                    }
                }
            }

            return true;
        },

        _mouseStop: function() {
            if (! this.options.dragAndDrop) {
                return;
            }

            this._moveItem();
            this._clear();
            this._removeHover();
            this._removeGhost();
            this._removeHintNodes();

            this.current_item.$element.show();
            return false;
        },

        _getPointerRectangle: function() {
            var offset = this.helper.offset();

            return {
                left: offset.left,
                top: offset.top,
                right: offset.left + this.current_item.$element.outerWidth(),
                bottom: offset.top + this.current_item.$element.outerHeight()
            };
        },

        _findHoveredRectangle: function() {
            return this.area.findIntersectingArea(
                this._getPointerRectangle()
            );
        },

        _getGhost: function() {
             if (! this.$ghost) {
                this.$ghost = this.current_item.createGhost();
                this.element.append(this.$ghost);
            }
            return this.$ghost;
        },

        _moveItem: function() {
            if (this.hovered_rectangle) {
                this.tree.moveNode(
                    this.current_item.node,
                    this.hovered_rectangle.node,
                    this.hovered_rectangle.move_to
                );

                if (this.hovered_rectangle.move_to == Position.INSIDE) {
                    this.hovered_rectangle.node.is_open = true;
                }

                if (this.options.onMoveNode) {
                    this.options.onMoveNode(
                        this.current_item.node,
                        this.hovered_rectangle.node,
                        Position.getName(this.hovered_rectangle.move_to)
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

        _generatePosition: function(event) {
            return {
                left: event.pageX - this.offset.click.left,
                top: event.pageY - this.offset.click.top
            };
        },

        _refreshHitAreas: function() {
            this.area = this._generateAreaAndChildren();
            this._removeHintNodes();

            if (this.options.displayTestNodes) {
                this.hint_nodes = this._createHintNodes(this.area);
            }
        },

        _generateAreaAndChildren: function() {
            var self = this;

            function getHitAreaForNode(node) {
                var $span = $(node.element).find('span:first');
                var offset = $span.offset();

                var area = new Area(
                    offset.left,
                    offset.top,
                    offset.left + $span.outerWidth(),
                    offset.top + $span.outerHeight()
                );

                var height = area.bottom - area.top;
                area.top += (height / 2) - 1;
                area.bottom = area.top + 2;

                area.name = node.name;
                return area;
            }

            function getHitAreaForFolder(folder) {
                var $li = $(folder.element);
                var $span = $(folder.element).find('span:first');
                var offset = $li.offset();
                var span_height = $span.outerHeight();
                var top = $li.offset().top + span_height;

                var area = new Area(
                    offset.left + 6,
                    top,
                    offset.left + 8,
                    top + $li.height() - span_height
                );
                area.name = folder.name;
                return area;
            }

            function addHitAreasForNode(node, parent_area) {
                // after node
                var node_area = getHitAreaForNode(node);

                var area = node_area.duplicate();
                area.node = node;
                area.name = node.name;
                area.move_to = Position.AFTER;

                area.left += 12;
                area.right = area.left + 24;
                area.color = 'blue';

                parent_area.addArea(area);

                // inside node
                area = node_area.duplicate();
                area.left += 36;
                area.setMinimumWidth(24);

                area.move_to = Position.INSIDE;
                area.name = node.name;
                area.node = node;
                parent_area.addArea(area);
            }

            function addHitAreasForOpenFolder(folder, parent_area) {
                // after folder
                var area = getHitAreaForFolder(folder);
                area.node = folder;
                area.name = folder.name;
                area.move_to = Position.AFTER;
                parent_area.addArea(area);

                // before first child in folder
                area = getHitAreaForNode(folder);
                area.node = folder.children[0];
                area.move_to = Position.BEFORE;
                area.name = folder.children[0].name;
                parent_area.addArea(area);
            }

            function addHitAreasForClosedFolder(folder, parent_area) {
                var area = getHitAreaForNode(folder);
                area.node = folder;
                area.name = folder.name;
                area.move_to = Position.INSIDE;
                parent_area.addArea(area);
            }

            function addNodes(children, parent_area) {
                $.each(children, function(i, node) {
                    var area = Area.createFromElement($(node.element));
                    area.name = node.name;
                    parent_area.addArea(area);

                    var must_add_hit_areas = true;
                    if (self.options.onMustAddHitArea) {
                        must_add_hit_areas = self.options.onMustAddHitArea(node);
                    }

                    if (must_add_hit_areas) {
                        if (! node.hasChildren()) {
                            addHitAreasForNode(node, area);
                        }
                        else {
                            if (node.is_open) {
                                addHitAreasForOpenFolder(node, area);
                            }
                            else {
                                addHitAreasForClosedFolder(node, area);
                            }
                        }
                    }

                    if (node.hasChildren() && node.is_open) {
                        addNodes(node.children, area);
                    }
                });
            }

            var main_area = Area.createFromElement(this.element);
            main_area.name = 'tree';
            addNodes(this.tree.children, main_area);
            return main_area;
        },

        _createHintNodes: function(main_area) {
            var hint_nodes = [];

            var self = this;
            main_area.iterate(function(area) {
                if (area.node) {
                    var color = area.color || '#000';
                    var $span = $('<span class="hit"></span>');
                    $span.css({
                        position: 'absolute',
                        left: area.left,
                        top: area.top,
                        display: 'block',
                        width: area.right - area.left,
                        height: area.bottom - area.top,
                        opacity: '0.5',
                        border: 'solid 1px ' + color
                     });
                    self.element.append($span);
                    hint_nodes.push($span);
                }
            });

            return hint_nodes;
        },

        _removeHover: function() {
            this.hovered_rectangle = null;
        },

        _removeGhost: function() {
            if (this.$ghost) {
                this.$ghost.remove();
                this.$ghost = null;
            }
        },

        _removeHintNodes: function() {
            $.each(this.hint_nodes, function() {
                this.detach();
            });

            this.hint_nodes = [];
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
            this.open_folder_timer = setTimeout(
                function() {
                    self._getNodeElementForNode(folder).open(
                        function() {
                            self._refreshHitAreas();
                        }
                    );
                },
                500
            );
        },

        _stopOpenFolderTimer: function() {
            if (this.open_folder_timer) {
                clearTimeout(this.open_folder_timer);
                this.open_folder_timer = null;
            }
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
            $helper.addClass('dragging');
            return $helper;
        },

        appendGhost: function($ghost, move_to) {
            var classes = ['ghost'];

            if (move_to == Position.AFTER) {
                this.$element.after($ghost);

                if (this.node.hasChildren()) {
                    classes.push('folder');
                }
            }
            else if (move_to == Position.BEFORE) {
                this.$element.before($ghost);
            }
            else if (move_to == Position.INSIDE) {
                this.$element.after($ghost);
                classes.push('inside');
            }

            var $span = $ghost.children('span:first');
            $span.attr('class', classes.join(' '));
        },

        createGhost: function() {
           return $('<li><span class="ghost">'+ this.node.name +'</span></li>');
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
        }
    });
})(jQuery);
