/*
 * Gijgo Tree v1.9.13
 * http://gijgo.com/tree
 *
 * Copyright 2014, 2019 gijgo.com
 * Released under the MIT license
 */
/* global window alert jQuery gj */
/**  */gj.tree = {
    plugins: {}
};

gj.tree.config = {
    base: {

        params: {},

        /** When this setting is enabled the content of the tree will be loaded automatically after the creation of the tree.         */        autoLoad: true,

        /** The type of the node selection.<br/>
         * If the type is set to multiple the user will be able to select more then one node in the tree.         */        selectionType: 'single',

        /** This setting enable cascade selection and unselection of children         */        cascadeSelection: false,

        /** The data source of tree.         */        dataSource: undefined,

        /** Primary key field name.         */        primaryKey: undefined,

        /** Text field name.         */        textField: 'text',

        /** Children field name.         */        childrenField: 'children',

        /** The name of the field that indicates if the node has children. Shows expand icon if the node has children.         */        hasChildrenField: 'hasChildren',

        /** Image css class field name.         */        imageCssClassField: 'imageCssClass',

        /** Image url field name.         */        imageUrlField: 'imageUrl',

        /** Image html field name.         */        imageHtmlField: 'imageHtml',

        /** Disabled field name. Assume that the item is not disabled if not set.         */        disabledField: 'disabled',

        /** Width of the tree.         */        width: undefined,

        /** When this setting is enabled the content of the tree will be wrapped by borders.         */        border: false,

        /** The name of the UI library that is going to be in use.         */        uiLibrary: 'materialdesign',

        /** The name of the icons library that is going to be in use. Currently we support Material Icons, Font Awesome and Glyphicons.         */        iconsLibrary: 'materialicons',

        autoGenId: 1,

        autoGenFieldName: 'autoId_b5497cc5-7ef3-49f5-a7dc-4a932e1aee4a',

        indentation: 24,

        style: {
            wrapper: 'gj-unselectable',
            list: 'gj-list gj-list-md',
            item: undefined,
            active: 'gj-list-md-active',
            leafIcon: undefined,
            border: 'gj-tree-md-border'
        },

        icons: {
            /** Expand icon definition.             */            expand: '<i class="gj-icon chevron-right" />',

            /** Collapse icon definition.             */            collapse: '<i class="gj-icon chevron-down" />'
        }
    },

    bootstrap: {
        style: {
            wrapper: 'gj-unselectable gj-tree-bootstrap-3',
            list: 'gj-list gj-list-bootstrap list-group',
            item: 'list-group-item',
            active: 'active',
            border: 'gj-tree-bootstrap-border'
        },
        iconsLibrary: 'glyphicons'
    },

    bootstrap4: {
        style: {
            wrapper: 'gj-unselectable gj-tree-bootstrap-4',
            list: 'gj-list gj-list-bootstrap',
            item: 'list-group-item',
            active: 'active',
            border: 'gj-tree-bootstrap-border'
        },
        icons: {
            expand: '<i class="gj-icon plus" />',
            collapse: '<i class="gj-icon minus" />'
        }
    },

    materialicons: {
        style: {
            expander: 'gj-tree-material-icons-expander'
        }
    },

    fontawesome: {
        style: {
            expander: 'gj-tree-font-awesome-expander'
        },
        icons: {
            expand: '<i class="fa fa-plus" aria-hidden="true"></i>',
            collapse: '<i class="fa fa-minus" aria-hidden="true"></i>'
        }
    },

    glyphicons: {
        style: {
            expander: 'gj-tree-glyphicons-expander'
        },
        icons: {
            expand: '<span class="glyphicon glyphicon-plus" />',
            collapse: '<span class="glyphicon glyphicon-minus" />'
        }
    }
};
/**  */gj.tree.events = {

    /**
     * Event fires when the tree is initialized     */    initialized: function ($tree) {
        $tree.triggerHandler('initialized');
    },

    /**
     * Event fired before data binding takes place.     */    dataBinding: function ($tree) {
        $tree.triggerHandler('dataBinding');
    },

    /**
     * Event fires after the loading of the data in the tree.     */    dataBound: function ($tree) {
        $tree.triggerHandler('dataBound');
    },

    /**
     * Event fires after selection of tree node.     */    select: function ($tree, $node, id) {
        return $tree.triggerHandler('select', [$node, id]);
    },

    /**
     * Event fires on un selection of tree node     */    unselect: function ($tree, $node, id) {
        return $tree.triggerHandler('unselect', [$node, id]);
    },

    /**
     * Event fires before node expand.     */    expand: function ($tree, $node, id) {
        return $tree.triggerHandler('expand', [$node, id]);
    },

    /**
     * Event fires before node collapse.     */    collapse: function ($tree, $node, id) {
        return $tree.triggerHandler('collapse', [$node, id]);
    },

    /**
     * Event fires on enable of tree node.     */    enable: function ($tree, $node) {
        return $tree.triggerHandler('enable', [$node]);
    },

    /**
     * Event fires on disable of tree node.     */    disable: function ($tree, $node) {
        return $tree.triggerHandler('disable', [$node]);
    },

    /**
     * Event fires before tree destroy     */    destroying: function ($tree) {
        return $tree.triggerHandler('destroying');
    },

    /**
     * Event fires when the data is bound to node.     */    nodeDataBound: function ($tree, $node, id, record) {
        return $tree.triggerHandler('nodeDataBound', [$node, id, record]);
    }
}
/*global gj $*/
gj.tree.methods = {

    init: function (jsConfig) {
        gj.widget.prototype.init.call(this, jsConfig, 'tree');

        gj.tree.methods.initialize.call(this);

        if (this.data('autoLoad')) {
            this.reload();
        }
        return this;
    },

    initialize: function () {
        var data = this.data(),
            $root = $('<ul class="' + data.style.list + '"/>');
        this.empty().addClass(data.style.wrapper).append($root);
        if (data.width) {
            this.width(data.width);
        }
        if (data.border) {
            this.addClass(data.style.border);
        }
        gj.tree.events.initialized(this);
    },

    useHtmlDataSource: function ($tree, data) {
        data.dataSource = [];
    },

    render: function ($tree, response) {
        var data;
        if (response) {
            if (typeof (response) === 'string' && JSON) {
                response = JSON.parse(response);
            }
            data = $tree.data();
            data.records = response;
            if (!data.primaryKey) {
                gj.tree.methods.genAutoId(data, data.records);
            }
            gj.tree.methods.loadData($tree);
        }
        return $tree;
    },

    filter: function ($tree) {
        return $tree.data().dataSource;
    },

    genAutoId: function (data, records) {
        var i;
        for (i = 0; i < records.length; i++) {
            records[i][data.autoGenFieldName] = data.autoGenId++;
            if (records[i][data.childrenField] && records[i][data.childrenField].length) {
                gj.tree.methods.genAutoId(data, records[i][data.childrenField]);
            }
        }
    },

    loadData: function ($tree) {
        var i,
            records = $tree.data('records'),
            $root = $tree.children('ul');

        gj.tree.events.dataBinding($tree);
        $root.off().empty();
        for (i = 0; i < records.length; i++) {
            gj.tree.methods.appendNode($tree, $root, records[i], 1);
        }
        gj.tree.events.dataBound($tree);
    },

    appendNode: function ($tree, $parent, nodeData, level, position) {
        var i, $node, $newParent, $span, $img,
            data = $tree.data(),
            id = data.primaryKey ? nodeData[data.primaryKey] : nodeData[data.autoGenFieldName];
            $node = $('<li data-id="' + id + '" data-role="node" />').addClass(data.style.item),
            $wrapper = $('<div data-role="wrapper" />'),
            $expander = $('<span data-role="expander" data-mode="close"></span>').addClass(data.style.expander),
            $display = $('<span data-role="display">' + nodeData[data.textField] + '</span>'),
            hasChildren = typeof (nodeData[data.hasChildrenField]) !== 'undefined' && nodeData[data.hasChildrenField].toString().toLowerCase() === 'true',
            disabled = typeof (nodeData[data.disabledField]) !== 'undefined' && nodeData[data.disabledField].toString().toLowerCase() === 'true';

        if (data.indentation) {
            $wrapper.append('<span data-role="spacer" style="width: ' + (data.indentation * (level - 1)) + 'px;"></span>');
        }

        if (disabled) {
            gj.tree.methods.disableNode($tree, $node);
        } else {
            $expander.on('click', gj.tree.methods.expanderClickHandler($tree));
            $display.on('click', gj.tree.methods.displayClickHandler($tree));
        }
        $wrapper.append($expander);
        $wrapper.append($display);
        $node.append($wrapper);

        if (position) {
            $parent.find('li:eq(' + (position - 1) + ')').before($node);
        } else {
            $parent.append($node);
        }

        if (data.imageCssClassField && nodeData[data.imageCssClassField]) {
            $span = $('<span data-role="image"><span class="' + nodeData[data.imageCssClassField] + '"></span></span>');
            $span.insertBefore($display);
        } else if (data.imageUrlField && nodeData[data.imageUrlField]) {
            $span = $('<span data-role="image"></span>');
            $span.insertBefore($display);
            $img = $('<img src="' + nodeData[data.imageUrlField] + '"></img>');
            $img.attr('width', $span.width()).attr('height', $span.height());
            $span.append($img);
        } else if (data.imageHtmlField && nodeData[data.imageHtmlField]) {
            $span = $('<span data-role="image">' + nodeData[data.imageHtmlField] + '</span>');
            $span.insertBefore($display);
        }

        if ((nodeData[data.childrenField] && nodeData[data.childrenField].length) || hasChildren) {
            $expander.empty().append(data.icons.expand);
            $newParent = $('<ul />').addClass(data.style.list).addClass('gj-hidden');
            $node.append($newParent);

            if (nodeData[data.childrenField] && nodeData[data.childrenField].length) {
                for (i = 0; i < nodeData[data.childrenField].length; i++) {
                    gj.tree.methods.appendNode($tree, $newParent, nodeData[data.childrenField][i], level + 1);
                }
            }
        } else {
            data.style.leafIcon ? $expander.addClass(data.style.leafIcon) : $expander.html('&nbsp;');
        }

        gj.tree.events.nodeDataBound($tree, $node, nodeData.id, nodeData);
    },

    expanderClickHandler: function ($tree) {
        return function (e) {
            var $expander = $(this),
                $node = $expander.closest('li');
            if ($expander.attr('data-mode') === 'close') {
                $tree.expand($node);
            } else {
                $tree.collapse($node);
            }
        }
    },

    expand: function ($tree, $node, cascade) {
        var $children, i,
            $expander = $node.find('>[data-role="wrapper"]>[data-role="expander"]'),
            data = $tree.data(),
            id = $node.attr('data-id'),
            $list = $node.children('ul');
        if (gj.tree.events.expand($tree, $node, id) !== false && $list && $list.length) {
            $list.show();
            $expander.attr('data-mode', 'open');
            $expander.empty().append(data.icons.collapse);
            if (cascade) {
                $children = $node.find('ul>li');
                for (i = 0; i < $children.length; i++) {
                    gj.tree.methods.expand($tree, $($children[i]), cascade);
                }
            }
        }
        return $tree;
    },

    collapse: function ($tree, $node, cascade) {
        var $children, i,
            $expander = $node.find('>[data-role="wrapper"]>[data-role="expander"]'),
            data = $tree.data(),
            id = $node.attr('data-id'),
            $list = $node.children('ul');
        if (gj.tree.events.collapse($tree, $node, id) !== false && $list && $list.length) {
            $list.hide();
            $expander.attr('data-mode', 'close');
            $expander.empty().append(data.icons.expand);
            if (cascade) {
                $children = $node.find('ul>li');
                for (i = 0; i < $children.length; i++) {
                    gj.tree.methods.collapse($tree, $($children[i]), cascade);
                }
            }
        }
        return $tree;
    },

    expandAll: function ($tree) {
        var i, $nodes = $tree.find('ul>li');
        for (i = 0; i < $nodes.length; i++) {
            gj.tree.methods.expand($tree, $($nodes[i]), true);
        }
        return $tree;
    },

    collapseAll: function ($tree) {
        var i, $nodes = $tree.find('ul>li');
        for (i = 0; i < $nodes.length; i++) {
            gj.tree.methods.collapse($tree, $($nodes[i]), true);
        }
        return $tree;
    },

    displayClickHandler: function ($tree) {
        return function (e) {
            var $display = $(this),
                $node = $display.closest('li'),
                cascade = $tree.data().cascadeSelection;
            if ($node.attr('data-selected') === 'true') {
                gj.tree.methods.unselect($tree, $node, cascade);
            } else {
                if ($tree.data('selectionType') === 'single') {
                    gj.tree.methods.unselectAll($tree);
                }
                gj.tree.methods.select($tree, $node, cascade);
            }
        }
    },

    selectAll: function ($tree) {
        var i, $nodes = $tree.find('ul>li');
        for (i = 0; i < $nodes.length; i++) {
            gj.tree.methods.select($tree, $($nodes[i]), true);
        }
        return $tree;
    },

    select: function ($tree, $node, cascade) {
        var i, $children, data = $tree.data();
        if ($node.attr('data-selected') !== 'true' && gj.tree.events.select($tree, $node, $node.attr('data-id')) !== false) {
            $node.addClass(data.style.active).attr('data-selected', 'true');
            if (cascade) {
                $children = $node.find('ul>li');
                for (i = 0; i < $children.length; i++) {
                    gj.tree.methods.select($tree, $($children[i]), cascade);
                }
            }
        }
    },
    
    unselectAll: function ($tree) {
        var i, $nodes = $tree.find('ul>li');
        for (i = 0; i < $nodes.length; i++) {
            gj.tree.methods.unselect($tree, $($nodes[i]), true);
        }
        return $tree;
    },

    unselect: function ($tree, $node, cascade) {
        var i, $children, data = $tree.data();
        if ($node.attr('data-selected') === 'true' && gj.tree.events.unselect($tree, $node, $node.attr('data-id')) !== false) {
            $node.removeClass($tree.data().style.active).removeAttr('data-selected');
            if (cascade) {
                $children = $node.find('ul>li');
                for (i = 0; i < $children.length; i++) {
                    gj.tree.methods.unselect($tree, $($children[i]), cascade);
                }
            }
        }
    },

    getSelections: function ($list) {
        var i, $node, children,
            result = [],
            $nodes = $list.children('li');
        if ($nodes && $nodes.length) {
            for (i = 0; i < $nodes.length; i++) {
                $node = $($nodes[i]);
                if ($node.attr('data-selected') === 'true') {
                    result.push($node.attr('data-id'));
                } else if ($node.has('ul')) {
                    children = gj.tree.methods.getSelections($node.children('ul'));
                    if (children.length) {
                        result = result.concat(children);
                    }
                }
            }
        }

        return result;
    },

    getDataById: function ($tree, id, records) {
        var i, data = $tree.data(), result = undefined;
        for (i = 0; i < records.length; i++) {
            if (data.primaryKey && records[i][data.primaryKey] == id) {
                result = records[i];
                break;
            } else if (records[i][data.autoGenFieldName] == id) {
                result = records[i];
                break;
            } else if (records[i][data.childrenField] && records[i][data.childrenField].length) {
                result = gj.tree.methods.getDataById($tree, id, records[i][data.childrenField]);
                if (result) {
                    break;
                }
            }
        }
        return result;
    },

    getDataByText: function ($tree, text, records) {
        var i, id,
            result = undefined,
            data = $tree.data();
        for (i = 0; i < records.length; i++) {
            if (text === records[i][data.textField]) {
                result = records[i];
                break;
            } else if (records[i][data.childrenField] && records[i][data.childrenField].length) {
                result = gj.tree.methods.getDataByText($tree, text, records[i][data.childrenField]);
                if (result) {
                    break;
                }
            }
        }
        return result;
    },

    getNodeById: function ($list, id) {
        var i, $node,
            $result = undefined,
            $nodes = $list.children('li');
        if ($nodes && $nodes.length) {
            for (i = 0; i < $nodes.length; i++) {
                $node = $($nodes[i]);
                if (id == $node.attr('data-id')) {
                    $result = $node;
                    break;
                } else if ($node.has('ul')) {
                    $result = gj.tree.methods.getNodeById($node.children('ul'), id);
                    if ($result) {
                        break;
                    }
                }
            }
        }
        return $result;
    },

    getNodeByText: function ($list, text) {
        var i, $node,
            $result = undefined,
            $nodes = $list.children('li');
        if ($nodes && $nodes.length) {
            for (i = 0; i < $nodes.length; i++) {
                $node = $($nodes[i]);
                if (text === $node.find('>[data-role="wrapper"]>[data-role="display"]').text()) {
                    $result = $node;
                    break;
                } else if ($node.has('ul')) {
                    $result = gj.tree.methods.getNodeByText($node.children('ul'), text);
                    if ($result) {
                        break;
                    }
                }
            }
        }
        return $result;
    },

    addNode: function ($tree, nodeData, $parent, position) {
        var level, record, data = $tree.data();

        if (!$parent || !$parent.length) {
            $parent = $tree.children('ul');
            $tree.data('records').push(nodeData);
        } else {
            if ($parent[0].tagName.toLowerCase() === 'li') {
                if ($parent.children('ul').length === 0) {
                    $parent.find('[data-role="expander"]').empty().append(data.icons.collapse);
                    $parent.append($('<ul />').addClass(data.style.list));
                }
                $parent = $parent.children('ul');
            }
            record = $tree.getDataById($parent.parent().data('id'));
            if (!record[data.childrenField]) {
                record[data.childrenField] = [];
            }
            record[data.childrenField].push(nodeData);
        }
        level = $parent.parentsUntil('[data-type="tree"]', 'ul').length + 1;
        if (!data.primaryKey) {
            gj.tree.methods.genAutoId(data, [nodeData]);
        }

        gj.tree.methods.appendNode($tree, $parent, nodeData, level, position);

        return $tree;
    },

    remove: function ($tree, $node) {
        gj.tree.methods.removeDataById($tree, $node.attr('data-id'), $tree.data('records'));
        $node.remove();
        return $tree;
    },

    removeDataById: function ($tree, id, records) {
        var i, data = $tree.data();
        for (i = 0; i < records.length; i++) {
            if (data.primaryKey && records[i][data.primaryKey] == id) {
                records.splice(i, 1);
                break;
            } else if (records[i][data.autoGenFieldName] == id) {
                records.splice(i, 1);
                break;
            } else if (records[i][data.childrenField] && records[i][data.childrenField].length) {
                gj.tree.methods.removeDataById($tree, id, records[i][data.childrenField]);
            }
        }
    },

    update: function ($tree, id, newRecord) {
        var data = $tree.data(),
            $node = $tree.getNodeById(id),
            oldRecord = $tree.getDataById(id);
        oldRecord = newRecord;
        $node.find('>[data-role="wrapper"]>[data-role="display"]').html(newRecord[data.textField]);
        gj.tree.events.nodeDataBound($tree, $node, id, newRecord);
        return $tree;
    },

    getChildren: function ($tree, $node, cascade) {
        var result = [], i, $children,
            cascade = typeof (cascade) === 'undefined' ? true : cascade;

        if (cascade) {
            $children = $node.find('ul li');
        } else {
            $children = $node.find('>ul>li');
        }

        for (i = 0; i < $children.length; i++) {
            result.push($($children[i]).data('id'));
        }

        return result;
    },

    enableAll: function ($tree) {
        var i, $children = $tree.find('ul>li');
        for (i = 0; i < $children.length; i++) {
            gj.tree.methods.enableNode($tree, $($children[i]), true);
        }
        return $tree;
    },

    enableNode: function ($tree, $node, cascade) {
        var i, $children,
            $expander = $node.find('>[data-role="wrapper"]>[data-role="expander"]'),
            $display = $node.find('>[data-role="wrapper"]>[data-role="display"]'),
            cascade = typeof (cascade) === 'undefined' ? true : cascade;

        $node.removeClass('disabled');
        $expander.on('click', gj.tree.methods.expanderClickHandler($tree));
        $display.on('click', gj.tree.methods.displayClickHandler($tree));
        gj.tree.events.enable($tree, $node);
        if (cascade) {
            $children = $node.find('ul>li');
            for (i = 0; i < $children.length; i++) {
                gj.tree.methods.enableNode($tree, $($children[i]), cascade);
            }
        }
    },

    disableAll: function ($tree) {
        var i, $children = $tree.find('ul>li');
        for (i = 0; i < $children.length; i++) {
            gj.tree.methods.disableNode($tree, $($children[i]), true);
        }
        return $tree;
    },

    disableNode: function ($tree, $node, cascade) {
        var i, $children,
            $expander = $node.find('>[data-role="wrapper"]>[data-role="expander"]'),
            $display = $node.find('>[data-role="wrapper"]>[data-role="display"]'),
            cascade = typeof (cascade) === 'undefined' ? true : cascade;

        $node.addClass('disabled');
        $expander.off('click');
        $display.off('click');
        gj.tree.events.disable($tree, $node);
        if (cascade) {
            $children = $node.find('ul>li');
            for (i = 0; i < $children.length; i++) {
                gj.tree.methods.disableNode($tree, $($children[i]), cascade);
            }
        }
    },

    destroy: function ($tree) {
        var data = $tree.data();
        if (data) {
            gj.tree.events.destroying($tree);
            $tree.xhr && $tree.xhr.abort();
            $tree.off();
            $tree.removeData();
            $tree.removeAttr('data-type');
            $tree.removeClass().empty();
        }
        return $tree;
    },

    pathFinder: function (data, list, id, parents) {
        var i, result = false;

        for (i = 0; i < list.length; i++) {
            if (list[i].id == id) {
                result = true;
                break;
            } else if (gj.tree.methods.pathFinder(data, list[i][data.childrenField], id, parents)) {
                parents.push(list[i].data[data.textField]);
                result = true;
                break;
            }
        }

        return result;
    }
}
/**  */gj.tree.widget = function ($element, jsConfig) {
    var self = this,
        methods = gj.tree.methods;

    /**
     * Reload the tree.     */    self.reload = function (params) {
        return gj.widget.prototype.reload.call(this, params);
    };

    /**
     * Render data in the tree     */    self.render = function (response) {
        return methods.render(this, response);
    };

    /**
     * Add node to the tree.     */    self.addNode = function (data, $parentNode, position) {
        return methods.addNode(this, data, $parentNode, position);
    };

    /**
     * Remove node from the tree.     */    self.removeNode = function ($node) {
        return methods.remove(this, $node);
    };

    /**
     * Update node from the tree.     */    self.updateNode = function (id, record) {
        return methods.update(this, id, record);
    };

    /**
     * Destroy the tree.     */    self.destroy = function () {
        return methods.destroy(this);
    };

    /**
     * Expand node from the tree.     */    self.expand = function ($node, cascade) {
        return methods.expand(this, $node, cascade);
    };

    /**
     * Collapse node from the tree.     */    self.collapse = function ($node, cascade) {
        return methods.collapse(this, $node, cascade);
    };

    /**
     * Expand all tree nodes     */    self.expandAll = function () {
        return methods.expandAll(this);
    };

    /**
     * Collapse all tree nodes     */    self.collapseAll = function () {
        return methods.collapseAll(this);
    };

    /**
     * Return node data by id of the record.     */    self.getDataById = function (id) {
        return methods.getDataById(this, id, this.data('records'));
    };

    /**
     * Return node data by text.     */    self.getDataByText = function (text) {
        return methods.getDataByText(this, text, this.data('records'));
    };

    /**
     * Return node by id of the record.     */    self.getNodeById = function (id) {
        return methods.getNodeById(this.children('ul'), id);
    };

    /**
     * Return node by text.     */    self.getNodeByText = function (text) {
        return methods.getNodeByText(this.children('ul'), text);
    };

    /**
     * Return an array with all records presented in the tree.     */    self.getAll = function () {
        return this.data('records');
    };

    /**
     * Select node from the tree.     */    self.select = function ($node) {
        return methods.select(this, $node);
    };

    /**
     * Unselect node from the tree.     */    self.unselect = function ($node) {
        return methods.unselect(this, $node);
    };

    /**
     * Select all tree nodes     */    self.selectAll = function () {
        return methods.selectAll(this);
    };

    /**
     * Unselect all tree nodes     */    self.unselectAll = function () {
        return methods.unselectAll(this);
    };

    /**
     * Return an array with the ids of the selected nodes.     */    self.getSelections = function () {
        return methods.getSelections(this.children('ul'));
    };

    /**
     * Return an array with the ids of all children.     */    self.getChildren = function ($node, cascade) {
        return methods.getChildren(this, $node, cascade);
    };

    /**
     * Return an array with the names of all parents.     */    self.parents = function (id) {
        var parents = [], data = this.data();
        methods.pathFinder(data, data.records, id, parents);
        return parents.reverse();
    };

    /**
     * Enable node from the tree.     */    self.enable = function ($node, cascade) {
        return methods.enableNode(this, $node, cascade);
    };

    /**
     * Enable all nodes from the tree.     */    self.enableAll = function () {
        return methods.enableAll(this);
    };

    /**
     * Disable node from the tree.     */    self.disable = function ($node, cascade) {
        return methods.disableNode(this, $node, cascade);
    };

    /**
     * Disable all nodes from the tree.     */    self.disableAll = function () {
        return methods.disableAll(this);
    };

    $.extend($element, self);
    if ('tree' !== $element.attr('data-type')) {
        methods.init.call($element, jsConfig);
    }

    return $element;
};

gj.tree.widget.prototype = new gj.widget();
gj.tree.widget.constructor = gj.tree.widget;

(function ($) {
    $.fn.tree = function (method) {
        var $widget;
        if (this && this.length) {
            if (typeof method === 'object' || !method) {
                return new gj.tree.widget(this, method);
            } else {
                $widget = new gj.tree.widget(this, null);
                if ($widget[method]) {
                    return $widget[method].apply(this, Array.prototype.slice.call(arguments, 1));
                } else {
                    throw 'Method ' + method + ' does not exist.';
                }
            }
        }
    };
})(jQuery);
/**  */gj.tree.plugins.checkboxes = {
    config: {
        base: {
            /** Add checkbox for each node, if set to true.              */            checkboxes: undefined,

            /** Name of the source field, that indicates if the checkbox is checked.             */            checkedField: 'checked',

            /** This setting enable cascade check and uncheck of children             */            cascadeCheck: true,
        }
    },

    private: {
        dataBound: function ($tree) {
            var $nodes;
            if ($tree.data('cascadeCheck')) {
                $nodes = $tree.find('li[data-role="node"]');
                $.each($nodes, function () {
                    var $node = $(this),
                        state = $node.find('[data-role="checkbox"] input[type="checkbox"]').checkbox('state');
                    if (state === 'checked') {
                        gj.tree.plugins.checkboxes.private.updateChildrenState($node, state);
                        gj.tree.plugins.checkboxes.private.updateParentState($node, state);
                    }
                });
            }
        },

        nodeDataBound: function ($tree, $node, id, record) {
            var data, $expander, $checkbox, $wrapper, disabled;

            if ($node.find('> [data-role="wrapper"] > [data-role="checkbox"]').length === 0) {
                data = $tree.data();
                $expander = $node.find('> [data-role="wrapper"] > [data-role="expander"]');
                $checkbox = $('<input type="checkbox"/>');
                $wrapper = $('<span data-role="checkbox"></span>').append($checkbox);
                disabled = typeof (record[data.disabledField]) !== 'undefined' && record[data.disabledField].toString().toLowerCase() === 'true';

                $checkbox = $checkbox.checkbox({
                    uiLibrary: data.uiLibrary,
                    iconsLibrary: data.iconsLibrary,
                    change: function (e, state) {
                        gj.tree.plugins.checkboxes.events.checkboxChange($tree, $node, record, $checkbox.state());
                    }
                });
                disabled && $checkbox.prop('disabled', true);
                record[data.checkedField] && $checkbox.state('checked');
                $checkbox.on('click', function (e) {
                    var $node = $checkbox.closest('li'),
                        state = $checkbox.state();
                    if (data.cascadeCheck) {
                        gj.tree.plugins.checkboxes.private.updateChildrenState($node, state);
                        gj.tree.plugins.checkboxes.private.updateParentState($node, state);
                    }
                });
                $expander.after($wrapper);
            }
        },

        updateParentState: function ($node, state) {
            var $parentNode, $parentCheckbox, $siblingCheckboxes, allChecked, allUnchecked, parentState;

            $parentNode = $node.parent('ul').parent('li');
            if ($parentNode.length === 1) {
                $parentCheckbox = $node.parent('ul').parent('li').find('> [data-role="wrapper"] > [data-role="checkbox"] input[type="checkbox"]');
                $siblingCheckboxes = $node.siblings().find('> [data-role="wrapper"] > span[data-role="checkbox"] input[type="checkbox"]');
                allChecked = (state === 'checked');
                allUnchecked = (state === 'unchecked');
                parentState = 'indeterminate';
                $.each($siblingCheckboxes, function () {
                    var state = $(this).checkbox('state');
                    if (allChecked && state !== 'checked') {
                        allChecked = false;
                    }
                    if (allUnchecked && state !== 'unchecked') {
                        allUnchecked = false;
                    }
                });
                if (allChecked && !allUnchecked) {
                    parentState = 'checked';
                }
                if (!allChecked && allUnchecked) {
                    parentState = 'unchecked';
                }
                $parentCheckbox.checkbox('state', parentState);
                gj.tree.plugins.checkboxes.private.updateParentState($parentNode, $parentCheckbox.checkbox('state'));
            }
        },

        updateChildrenState: function ($node, state) {
            var $childrenCheckboxes = $node.find('ul li [data-role="wrapper"] [data-role="checkbox"] input[type="checkbox"]');
            if ($childrenCheckboxes.length > 0) {
                $.each($childrenCheckboxes, function () {
                    $(this).checkbox('state', state);
                });
            }
        },

        update: function ($tree, $node, state) {
            var checkbox = $node.find('[data-role="checkbox"] input[type="checkbox"]').first();
            $(checkbox).checkbox('state', state);
            if ($tree.data().cascadeCheck) {
                gj.tree.plugins.checkboxes.private.updateChildrenState($node, state);
                gj.tree.plugins.checkboxes.private.updateParentState($node, state);
            }
        }
    },

    public: {

        /** Get ids of all checked nodes         */        getCheckedNodes: function () {
            var result = [],
                checkboxes = this.find('li [data-role="checkbox"] input[type="checkbox"]');
            $.each(checkboxes, function () {
                var checkbox = $(this);
                if (checkbox.checkbox('state') === 'checked') {
                    result.push(checkbox.closest('li').data('id'));
                }
            });
            return result;
        },

        /**
         * Check all tree nodes         */        checkAll: function () {
            var $checkboxes = this.find('li [data-role="checkbox"] input[type="checkbox"]');
            $.each($checkboxes, function () {
                $(this).checkbox('state', 'checked');
            });
            return this;
        },

        /**
         * Uncheck all tree nodes         */        uncheckAll: function () {
            var $checkboxes = this.find('li [data-role="checkbox"] input[type="checkbox"]');
            $.each($checkboxes, function () {
                $(this).checkbox('state', 'unchecked');
            });
            return this;
        },

        /**
         * Check tree node.         */        check: function ($node) {
            gj.tree.plugins.checkboxes.private.update(this, $node, 'checked');
            return this;
        },

        /**
         * Uncheck tree node.         */        uncheck: function ($node) {
            gj.tree.plugins.checkboxes.private.update(this, $node, 'unchecked');
            return this;
        }
    },

    events: {
        /**
         * Event fires when the checkbox state is changed.         */        checkboxChange: function ($tree, $node, record, state) {
            return $tree.triggerHandler('checkboxChange', [$node, record, state]);
        }
    },

    configure: function ($tree) {
        if ($tree.data('checkboxes') && gj.checkbox) {
            $.extend(true, $tree, gj.tree.plugins.checkboxes.public);
            $tree.on('nodeDataBound', function (e, $node, id, record) {
                gj.tree.plugins.checkboxes.private.nodeDataBound($tree, $node, id, record);
            });
            $tree.on('dataBound', function () {
                gj.tree.plugins.checkboxes.private.dataBound($tree);
            });
            $tree.on('enable', function (e, $node) {
                $node.find('>[data-role="wrapper"]>[data-role="checkbox"] input[type="checkbox"]').prop('disabled', false);
            });
            $tree.on('disable', function (e, $node) {
                $node.find('>[data-role="wrapper"]>[data-role="checkbox"] input[type="checkbox"]').prop('disabled', true);
            });
        }
    }
};

/** */gj.tree.plugins.dragAndDrop = {
	config: {
		base: {
			/** Enables drag and drop functionality for each node.              */			dragAndDrop: undefined,

			style: {
			    dragEl: 'gj-tree-drag-el gj-tree-md-drag-el',
                dropAsChildIcon: 'gj-cursor-pointer gj-icon plus',
			    dropAbove: 'gj-tree-drop-above',
			    dropBelow: 'gj-tree-drop-below'
			}
        },

        bootstrap: {
            style: {
                dragEl: 'gj-tree-drag-el gj-tree-bootstrap-drag-el',
                dropAsChildIcon: 'glyphicon glyphicon-plus',
                dropAbove: 'drop-above',
                dropBelow: 'drop-below'
            }
        },

        bootstrap4: {
            style: {
                dragEl: 'gj-tree-drag-el gj-tree-bootstrap-drag-el',
                dropAsChildIcon: 'gj-cursor-pointer gj-icon plus',
                dropAbove: 'drop-above',
                dropBelow: 'drop-below'
            }
        }
	},

	private: {
	    nodeDataBound: function ($tree, $node) {
	        var $wrapper = $node.children('[data-role="wrapper"]'),
    	        $display = $node.find('>[data-role="wrapper"]>[data-role="display"]');
            if ($wrapper.length && $display.length) {
                $display.on('mousedown', gj.tree.plugins.dragAndDrop.private.createNodeMouseDownHandler($tree));
                $display.on('mousemove', gj.tree.plugins.dragAndDrop.private.createNodeMouseMoveHandler($tree, $node, $display));
                $display.on('mouseup', gj.tree.plugins.dragAndDrop.private.createNodeMouseUpHandler($tree));
		    }
        },

        createNodeMouseDownHandler: function ($tree) {
            return function (e) {
                $tree.data('dragReady', true);
            }
        },

        createNodeMouseUpHandler: function ($tree) {
            return function (e) {
                $tree.data('dragReady', false);
            }
        },

	    createNodeMouseMoveHandler: function ($tree, $node, $display) {
            return function (e) {
                if ($tree.data('dragReady')) {
                    var data = $tree.data(), $dragEl, $wrapper, offsetTop, offsetLeft;

                    $tree.data('dragReady', false);
                    $dragEl = $display.clone().wrap('<div data-role="wrapper"/>').closest('div')
                        .wrap('<li class="' + data.style.item + '" />').closest('li')
                        .wrap('<ul class="' + data.style.list + '" />').closest('ul');
                    $('body').append($dragEl);
                    $dragEl.attr('data-role', 'draggable-clone').addClass('gj-unselectable').addClass(data.style.dragEl);
                    $dragEl.find('[data-role="wrapper"]').prepend('<span data-role="indicator" />');
                    $dragEl.draggable({
                        drag: gj.tree.plugins.dragAndDrop.private.createDragHandler($tree, $node, $display),
                        stop: gj.tree.plugins.dragAndDrop.private.createDragStopHandler($tree, $node, $display)
                    });
                    $wrapper = $display.parent();
                    offsetTop = $display.offset().top;
                    offsetTop -= parseInt($wrapper.css("border-top-width")) + parseInt($wrapper.css("margin-top")) + parseInt($wrapper.css("padding-top"));
                    offsetLeft = $display.offset().left;
                    offsetLeft -= parseInt($wrapper.css("border-left-width")) + parseInt($wrapper.css("margin-left")) + parseInt($wrapper.css("padding-left"));
                    offsetLeft -= $dragEl.find('[data-role="indicator"]').outerWidth(true);
                    $dragEl.css({
                        position: 'absolute', top: offsetTop, left: offsetLeft, width: $display.outerWidth(true)
                    });
                    if ($display.attr('data-droppable') === 'true') {
                        $display.droppable('destroy');
                    }
                    gj.tree.plugins.dragAndDrop.private.getTargetDisplays($tree, $node, $display).each(function () {
                        var $dropEl = $(this);
                        if ($dropEl.attr('data-droppable') === 'true') {
                            $dropEl.droppable('destroy');
                        }
                        $dropEl.droppable();
                    });
                    gj.tree.plugins.dragAndDrop.private.getTargetDisplays($tree, $node).each(function () {
                        var $dropEl = $(this);
                        if ($dropEl.attr('data-droppable') === 'true') {
                            $dropEl.droppable('destroy');
                        }
                        $dropEl.droppable();
                    });
                    $dragEl.trigger('mousedown');
                }
		    };
	    },

	    getTargetDisplays: function ($tree, $node, $display) {
	        return $tree.find('[data-role="display"]').not($display).not($node.find('[data-role="display"]'));
	    },

	    getTargetWrappers: function ($tree, $node) {
	        return $tree.find('[data-role="wrapper"]').not($node.find('[data-role="wrapper"]'));
	    },

	    createDragHandler: function ($tree, $node, $display) {
	        var $displays = gj.tree.plugins.dragAndDrop.private.getTargetDisplays($tree, $node, $display),
                $wrappers = gj.tree.plugins.dragAndDrop.private.getTargetWrappers($tree, $node),
	            data = $tree.data();
	        return function (e, offset, mousePosition) {
	            var $dragEl = $(this), success = false;
	            $displays.each(function () {
	                var $targetDisplay = $(this),
	                    $indicator;
	                if ($targetDisplay.droppable('isOver', mousePosition)) {
	                    $indicator = $dragEl.find('[data-role="indicator"]');
	                    data.style.dropAsChildIcon ? $indicator.addClass(data.style.dropAsChildIcon) : $indicator.text('+');
	                    success = true;
	                    return false;
	                } else {
	                    $dragEl.find('[data-role="indicator"]').removeClass(data.style.dropAsChildIcon).empty();
                    }
	            });
	            $wrappers.each(function () {
	                var $wrapper = $(this),
                        $indicator, middle;
	                if (!success && $wrapper.droppable('isOver', mousePosition)) {
	                    middle = $wrapper.position().top + ($wrapper.outerHeight() / 2);
	                    if (mousePosition.y < middle) {
	                        $wrapper.addClass(data.style.dropAbove).removeClass(data.style.dropBelow);
	                    } else {
	                        $wrapper.addClass(data.style.dropBelow).removeClass(data.style.dropAbove);
	                    }
	                } else {
	                    $wrapper.removeClass(data.style.dropAbove).removeClass(data.style.dropBelow);
	                }
	            });
	        };
        },

	    createDragStopHandler: function ($tree, $sourceNode, $sourceDisplay) {
	        var $displays = gj.tree.plugins.dragAndDrop.private.getTargetDisplays($tree, $sourceNode, $sourceDisplay),
                $wrappers = gj.tree.plugins.dragAndDrop.private.getTargetWrappers($tree, $sourceNode),
	            data = $tree.data();
	        return function (e, mousePosition) {
                var success = false, record, $targetNode, $sourceParentNode, parent;
	            $(this).draggable('destroy').remove();
	            $displays.each(function () {
	                var $targetDisplay = $(this), $ul;
	                if ($targetDisplay.droppable('isOver', mousePosition)) {
	                    $targetNode = $targetDisplay.closest('li');
	                    $sourceParentNode = $sourceNode.parent('ul').parent('li');
	                    $ul = $targetNode.children('ul');
	                    if ($ul.length === 0) {
	                        $ul = $('<ul />').addClass(data.style.list);
	                        $targetNode.append($ul);
	                    }
	                    if (gj.tree.plugins.dragAndDrop.events.nodeDrop($tree, $sourceNode.data('id'), $targetNode.data('id'), $ul.children('li').length + 1) !== false) {
                            $ul.append($sourceNode);

                            //BEGIN: Change node position inside the backend data
                            record = $tree.getDataById($sourceNode.data('id'));
                            gj.tree.methods.removeDataById($tree, $sourceNode.data('id'), data.records);
                            parent = $tree.getDataById($ul.parent().data('id'));
                            if (parent[data.childrenField] === undefined) {
                                parent[data.childrenField] = [];
                            }
                            parent[data.childrenField].push(record);
                            //END

	                        gj.tree.plugins.dragAndDrop.private.refresh($tree, $sourceNode, $targetNode, $sourceParentNode);
	                    }
	                    success = true;
	                    return false;
	                }
	                $targetDisplay.droppable('destroy');
	            });
	            if (!success) {
	                $wrappers.each(function () {
	                    var $targetWrapper = $(this), prepend, orderNumber, sourceNodeId;
	                    if ($targetWrapper.droppable('isOver', mousePosition)) {
	                        $targetNode = $targetWrapper.closest('li');
	                        $sourceParentNode = $sourceNode.parent('ul').parent('li');
	                        prepend = mousePosition.y < ($targetWrapper.position().top + ($targetWrapper.outerHeight() / 2));
	                        sourceNodeId = $sourceNode.data('id');
	                        orderNumber = $targetNode.prevAll('li:not([data-id="' + sourceNodeId + '"])').length + (prepend ? 1 : 2);
                            if (gj.tree.plugins.dragAndDrop.events.nodeDrop($tree, sourceNodeId, $targetNode.parent('ul').parent('li').data('id'), orderNumber) !== false) {
                                //BEGIN: Change node position inside the backend data
                                record = $tree.getDataById($sourceNode.data('id'));
                                gj.tree.methods.removeDataById($tree, $sourceNode.data('id'), data.records);
                                $tree.getDataById($targetNode.parent().data('id'))[data.childrenField].splice($targetNode.index() + (prepend ? 0 : 1), 0, record);
                                //END

	                            if (prepend) {
                                    $sourceNode.insertBefore($targetNode);
	                            } else {
	                                $sourceNode.insertAfter($targetNode);
                                }

                                gj.tree.plugins.dragAndDrop.private.refresh($tree, $sourceNode, $targetNode, $sourceParentNode);
	                        }
	                        return false;
	                    }
	                    $targetWrapper.droppable('destroy');
	                });
                }
	        }
	    },

	    refresh: function ($tree, $sourceNode, $targetNode, $sourceParentNode) {
	        var data = $tree.data();
	        gj.tree.plugins.dragAndDrop.private.refreshNode($tree, $targetNode);
	        gj.tree.plugins.dragAndDrop.private.refreshNode($tree, $sourceParentNode);
	        gj.tree.plugins.dragAndDrop.private.refreshNode($tree, $sourceNode);
	        $sourceNode.find('li[data-role="node"]').each(function () {
	            gj.tree.plugins.dragAndDrop.private.refreshNode($tree, $(this));
	        });
	        $targetNode.children('[data-role="wrapper"]').removeClass(data.style.dropAbove).removeClass(data.style.dropBelow);
        },

	    refreshNode: function ($tree, $node) {
	        var $wrapper = $node.children('[data-role="wrapper"]'),
	            $expander = $wrapper.children('[data-role="expander"]'),
	            $spacer = $wrapper.children('[data-role="spacer"]'),
	            $list = $node.children('ul'),
                data = $tree.data(),
	            level = $node.parentsUntil('[data-type="tree"]', 'ul').length;

	        if ($list.length && $list.children().length) {
	            if ($list.is(':visible')) {
	                $expander.empty().append(data.icons.collapse);
	            } else {
	                $expander.empty().append(data.icons.expand);
	            }
	        } else {
	            $expander.empty();
	        }
	        $wrapper.removeClass(data.style.dropAbove).removeClass(data.style.dropBelow);

	        $spacer.css('width', (data.indentation * (level - 1)));
	    }
	},

	public: {
	},

	events: {
	    /**
         * Event fires when the node is dropped.         */	    nodeDrop: function ($tree, id, parentId, orderNumber) {
	        return $tree.triggerHandler('nodeDrop', [id, parentId, orderNumber]);
        }
    },

	configure: function ($tree) {
		$.extend(true, $tree, gj.tree.plugins.dragAndDrop.public);
		if ($tree.data('dragAndDrop') && gj.draggable && gj.droppable) {
			$tree.on('nodeDataBound', function (e, $node) {
				gj.tree.plugins.dragAndDrop.private.nodeDataBound($tree, $node);
			});
		}
	}
};

/**  */gj.tree.plugins.lazyLoading = {
    config: {
        base: {

            paramNames: {

                /** The name of the parameter that is going to send the parent identificator.
                 * Lazy Loading needs to be enabled in order this parameter to be in use.                 */                parentId: 'parentId'
            },

            /** Enables lazy loading              */            lazyLoading: false
        }
    },

    private: {
        nodeDataBound: function ($tree, $node, id, record) {
            var data = $tree.data(),
                $expander = $node.find('> [data-role="wrapper"] > [data-role="expander"]');

            if (record.hasChildren) {
                $expander.empty().append(data.icons.expand);
            }
        },

        createDoneHandler: function ($tree, $node) {
            return function (response) {
                var i, $expander, $list, data = $tree.data();
                if (typeof (response) === 'string' && JSON) {
                    response = JSON.parse(response);
                }
                if (response && response.length) {
                    $list = $node.children('ul');
                    if ($list.length === 0) {
                        $list = $('<ul />').addClass(data.style.list);
                        $node.append($list);
                    }
                    for (i = 0; i < response.length; i++) {
                        $tree.addNode(response[i], $list);
                    }
                    $expander = $node.find('>[data-role="wrapper"]>[data-role="expander"]'),
                    $expander.attr('data-mode', 'open');
                    $expander.empty().append(data.icons.collapse);
                    gj.tree.events.dataBound($tree);
                }
            };
        },

        expand: function ($tree, $node, id) {
            var ajaxOptions, data = $tree.data(), params = {},
                $children = $node.find('>ul>li');

            if (!$children || !$children.length) {
                if (typeof (data.dataSource) === 'string') {
                    params[data.paramNames.parentId] = id;
                    ajaxOptions = { url: data.dataSource, data: params };
                    if ($tree.xhr) {
                        $tree.xhr.abort();
                    }
                    $tree.xhr = $.ajax(ajaxOptions).done(gj.tree.plugins.lazyLoading.private.createDoneHandler($tree, $node)).fail($tree.createErrorHandler());
                }
            }
        }
    },

    public: {},

    events: {},

    configure: function ($tree, fullConfig, clientConfig) {
        if (clientConfig.lazyLoading) {
            $tree.on('nodeDataBound', function (e, $node, id, record) {
                gj.tree.plugins.lazyLoading.private.nodeDataBound($tree, $node, id, record);
            });
            $tree.on('expand', function (e, $node, id) {
                gj.tree.plugins.lazyLoading.private.expand($tree, $node, id);
            });
        }
    }
};

