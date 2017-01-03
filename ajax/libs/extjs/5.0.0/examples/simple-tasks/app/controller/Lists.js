/**
 * @class SimpleTasks.controller.Lists
 * @extends Ext.app.Controller
 */
Ext.define('SimpleTasks.controller.Lists', {
    extend: 'Ext.app.Controller',

    models: ['List'],
    stores: ['Lists', 'Tasks'],

    views: [
        'lists.Tree',
        'lists.ContextMenu',
        'Toolbar'
    ],

    refs: [
        {
            ref: 'listTree',
            selector: 'listTree'
        },
        {
            ref: 'taskGrid',
            selector: 'taskGrid'
        },
        {
            ref: 'taskForm',
            selector: 'taskForm'
        },
        {
            ref: 'contextMenu',
            selector: 'listsContextMenu',
            xtype: 'listsContextMenu',
            autoCreate: true
        }
    ],

    init: function() {
        var me = this,
            listsStore = me.getListsStore();

        me.control({
            '[iconCls=tasks-new-list]': {
                click: me.handleNewListClick
            },
            '[iconCls=tasks-new-folder]': {
                click: me.handleNewFolderClick
            },
            '[iconCls=tasks-delete-list]': {
                click: me.handleDeleteClick
            },
            '[iconCls=tasks-delete-folder]': {
                click: me.handleDeleteClick
            },
            'listTree': {
                afterrender: me.handleAfterListTreeRender,
                edit: me.updateList,
                completeedit: me.handleCompleteEdit,
                canceledit: me.handleCancelEdit,
                deleteclick: me.handleDeleteIconClick,
                selectionchange: me.filterTaskGrid,
                taskdrop: me.updateTaskList,
                listdrop: me.reorderList,
                itemmouseenter: me.showActions,
                itemmouseleave: me.hideActions,
                itemcontextmenu: me.showContextMenu
            }
        });

        if(listsStore.isLoading()) {
            listsStore.on('load', me.handleListsLoad, me);
        } else {
            me.handleListsLoad(listsStore);
        }
        listsStore.on('write', me.syncListsStores, me, {
            buffer: 1
        });
    },

    /**
     * Handles a click on the "New List" button or context menu item.
     * @param {Ext.Component} component
     * @param {Ext.EventObject} e
     */
    handleNewListClick: function(component, e) {
        this.addList(true);
    },

    /**
     * Handles a click on the "New Folder" button or context menu item.
     * @param {Ext.Component} component
     * @param {Ext.EventObject} e
     */
    handleNewFolderClick: function(component, e) {
        this.addList();
    },

    /**
     * Adds an empty list to the lists store and starts editing the new list
     * @param {Boolean} leaf    True if the new node should be a leaf node.
     */
    addList: function(leaf) {
        var me = this,
            listTree = me.getListTree(),
            cellEditingPlugin = listTree.cellEditingPlugin,
            selectionModel = listTree.getSelectionModel(),
            selectedList = selectionModel.getSelection()[0],
            parentList = selectedList.isLeaf() ? selectedList.parentNode : selectedList,
            newList = Ext.create('SimpleTasks.model.List', {
                name: 'New ' + (leaf ? 'List' : 'Folder'),
                leaf: leaf,
                loaded: true // set loaded to true, so the tree won't try to dynamically load children for this node when expanded
            }),
            expandAndEdit = function() {
                if(parentList.isExpanded()) {
                    selectionModel.select(newList);
                    me.addedNode = newList;
                    cellEditingPlugin.startEdit(newList, 0);
                } else {
                    listTree.on('afteritemexpand', function startEdit(list) {
                        if(list === parentList) {
                            selectionModel.select(newList);
                            me.addedNode = newList;
                            cellEditingPlugin.startEdit(newList, 0);
                            // remove the afterexpand event listener
                            listTree.un('afteritemexpand', startEdit);
                        }
                    });
                    parentList.expand();
                }
            };
            
        parentList.appendChild(newList);
        listTree.getStore().sync();
        if(listTree.getView().isVisible(true)) {
            expandAndEdit();
        } else {
            listTree.on('expand', function onExpand() {
                expandAndEdit();
                listTree.un('expand', onExpand);
            });
            listTree.expand();
        }
    },

    /**
     * Handles the list list's "edit" event.
     * Updates the list on the server whenever a list record is updated using the tree editor.
     * @param {Ext.grid.plugin.CellEditing} editor
     * @param {Object} e                                an edit event object
     */
    updateList: function(editor, e) {
        var me = this,
            list = e.record;

        list.save({
            success: function(list, operation) {
                // filter the task list by the currently selected list.  This is necessary for newly added lists
                // since this is the first point at which we have a primary key "id" from the server.
                // If we don't filter here then any new tasks that are added will not appear until the filter is triggered by a selection change.
                me.filterTaskGrid(me.getListTree().getSelectionModel(), [list]);
            },
            failure: function(list, operation) {
                var error = operation.getError(),
                    msg = Ext.isObject(error) ? error.status + ' ' + error.statusText : error;

                Ext.MessageBox.show({
                    title: 'Update List Failed',
                    msg: msg,
                    icon: Ext.Msg.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        });
    },
    
    /**
     * Handles the list tree's complete edit event
     * @param {Ext.grid.plugin.CellEditing} editor
     * @param {Object} e                                an edit event object
     */
    handleCompleteEdit: function(editor, e){
        delete this.addedNode;
    },

    /**
     * Handles the list tree's cancel edit event
     * removes a newly added node if editing is cancelled before the node has been saved to the server
     * @param {Ext.grid.plugin.CellEditing} editor
     * @param {Object} e                                an edit event object
     */
    handleCancelEdit: function(editor, e) {
        var list = e.record,
            parent = list.parentNode,
            added = this.addedNode;

        delete this.addedNode;
        if (added === list) {
            // Only remove it if it's been newly added
            parent.removeChild(list);
            this.getListTree().getStore().sync();
            this.getListTree().getSelectionModel().select([parent]);
        }
    },

    /**
     * Handles a click on a delete icon in the list tree.
     * @param {Ext.tree.View} view
     * @param {Number} rowIndex
     * @param {Number} colIndex
     * @param {Ext.grid.column.Action} column
     * @param {EventObject} e
     */
    handleDeleteIconClick: function(view, rowIndex, colIndex, column, e) {
        this.deleteList(view.getRecord(view.findTargetByEvent(e)));
    },

    /**
     * Handles a click on the "Delete List" or "Delete Folder" button or menu item
     * @param {Ext.Component} component
     * @param {Ext.EventObject} e
     */
    handleDeleteClick: function(component, e) {
        this.deleteList(this.getListTree().getSelectionModel().getSelection()[0]);
    },

    /**
     * Deletes a list from the server and updates the view.
     * @param {SimpleTasks.model.List} list
     */
    deleteList: function(list) {
        var me = this,
            listTree = me.getListTree(),
            listName = list.get('name'),
            selModel = listTree.getSelectionModel(),
            tasksStore = me.getTasksStore(),
            listsStore = me.getListsStore(),
            isLocal = SimpleTasks.Settings.useLocalStorage,
            tasks;

        Ext.Msg.show({
            title: 'Delete List?',
            msg: 'Are you sure you want to permanently delete the "' + listName + '" list and all its tasks?',
            buttons: Ext.Msg.YESNO,
            fn: function(response) {
                if(response === 'yes') {
                    // recursively remove any tasks from the store that are associated with the list being deleted or any of its children.
                    (function deleteTasks(list) {
                        tasks = tasksStore.queryBy(function(task, id) {
                            return task.get('list_id') === list.get('id');
                        });
                        tasksStore.remove(tasks.getRange(0, tasks.getCount()), !isLocal);

                        list.eachChild(function(child) {
                            deleteTasks(child);
                        });
                    })(list);

                    // destroy the tree node on the server
                    list.parentNode.removeChild(list);
                    listsStore.sync({
                        failure: function(batch, options) {
                            var error = batch.exceptions[0].getError(),
                                msg = Ext.isObject(error) ? error.status + ' ' + error.statusText : error;

                            Ext.MessageBox.show({
                                title: 'Delete List Failed',
                                msg: msg,
                                icon: Ext.Msg.ERROR,
                                buttons: Ext.Msg.OK
                            });
                        }
                    });

                    if(isLocal) {
                        // only need to sync the tasks store when using local storage.
                        // when using an ajax proxy we will allow the server to handle deleting any tasks associated with the deleted list(s)
                        tasksStore.sync();
                    }

                    // If there is no selection, or the selection no longer exists in the store (it was part of the deleted node(s))
                    // then select the "All Lists" root
                    if (!selModel.hasSelection() || !listsStore.getNodeById(selModel.getSelection()[0].getId())) {
                        selModel.select(0);
                    }
                    
                    // refresh the list view so the task counts will be accurate
                    listTree.refreshView();
                }
            }
        });

    },

    /**
     * Handles the list tree's "selectionchange" event.
     * Filters the task store based on the selected list.
     * @param {Ext.selection.RowModel} selModel
     * @param {SimpleTasks.model.List[]} lists
     */
    filterTaskGrid: function(selModel, lists) {
        if (lists.length === 0) {
            return;
        }
        
        var list = lists[0],
            tasksStore = this.getTasksStore(),
            listIds = [],
            deleteListBtn = Ext.getCmp('delete-list-btn'),
            deleteFolderBtn = Ext.getCmp('delete-folder-btn'),
            i = 0;

        // build an array of all the list_id's in the hierarchy of the selected list
        list.cascadeBy(function(list) {
            listIds.push(list.get('id'));
        });

        tasksStore.addFilter({
            property: "list_id",
            value: new RegExp('^' + listIds.join('$|^') + '$')
        });

        // set the center panel's title to the name of the currently selected list
        this.getTaskGrid().setTitle(list.get('name'));

        // enable or disable the "delete list" and "delete folder" buttons depending on what type of node is selected
        if(list.get('id') === -1) {
            deleteListBtn.disable();
            deleteFolderBtn.disable();
        } else if(list.isLeaf()) {
            deleteListBtn.enable();
            deleteFolderBtn.disable();
        } else {
            deleteListBtn.disable();
            deleteFolderBtn.enable();
        }

        // make the currently selected list the default value for the list field on the new task form
        this.getTaskForm().query('[name=list_id]')[0].setValue(list.get('id'));
    },

    /**
     * Handles the list view's "taskdrop" event.  Runs when a task is dragged and dropped on a list.
     * Updates the task to belong to the list it was dropped on.
     * @param {SimpleTasks.model.Task} task       The Task record that was dropped
     * @param {SimpleTasks.model.List} list       The List record that the mouse was over when the drop happened
     */
    updateTaskList: function(task, list) {
        var me = this,
            listId = list.get('id');

        // set the tasks list_id field to the id of the list it was dropped on
        task.set('list_id', listId);
        // save the task to the server
        task.save({
            success: function(task, operation) {
                // refresh the lists view so the task counts will be updated.
                me.getListTree().refreshView();
            },
            failure: function(task, operation) {
                var error = operation.getError(),
                    msg = Ext.isObject(error) ? error.status + ' ' + error.statusText : error;

                Ext.MessageBox.show({
                    title: 'Move Task Failed',
                    msg: msg,
                    icon: Ext.Msg.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        });
    },

    /**
     * Handles the list view's "listdrop" event.  Runs after a list is reordered by dragging and dropping.
     * Commits the lists new position in the tree to the server.
     * @param {SimpleTasks.model.List} list         The List that was dropped
     * @param {SimpleTasks.model.List} overList     The List that the List was dropped on
     * @param {String} position               `"before"` or `"after"` depending on whether the mouse is above or below the midline of the node.
     */
    reorderList: function(list, overList, position) {
        var listsStore = this.getListsStore();

        if(SimpleTasks.Settings.useLocalStorage) {
            listsStore.sync();
        } else {
            Ext.Ajax.request({
                url: 'php/list/move.php',
                jsonData: {
                    id: list.get('id'),
                    relatedId: overList.get('id'),
                    position: position
                },
                success: function(response, options) {
                    var responseData = Ext.decode(response.responseText);

                    if(!responseData.success) {
                        Ext.MessageBox.show({
                            title: 'Move Task Failed',
                            msg: responseData.message,
                            icon: Ext.Msg.ERROR,
                            buttons: Ext.Msg.OK
                        });
                    }
                },
                failure: function(response, options) {
                    Ext.MessageBox.show({
                        title: 'Move Task Failed',
                        msg: response.status + ' ' + response.statusText,
                        icon: Ext.Msg.ERROR,
                        buttons: Ext.Msg.OK
                    });
                }
            });
        }
        
        // refresh the lists view so the task counts will be updated.
        this.getListTree().refreshView();
    },

    /**
     * Handles the initial tasks store "load" event,
     * refreshes the List tree view then removes itself as a handler.
     * @param {SimpleTasks.store.Tasks} tasksStore
     * @param {SimpleTasks.model.Task[]} tasks
     * @param {Boolean} success
     * @param {Ext.data.Operation} operation
     */
    handleTasksLoad: function(tasksStore, tasks, success, operation) {
        var me = this,
            listTree = me.getListTree(),
            selectionModel = listTree.getSelectionModel();

        // refresh the lists view so the task counts will be updated.
        listTree.refreshView();
        // filter the task grid by the selected list
        me.filterTaskGrid(selectionModel, selectionModel.getSelection());
        // remove the event listener after the first run
        tasksStore.un('load', this.handleTasksLoad, this);
    },

    /**
     * Handles the initial lists store "load" event,
     * selects the list tree's root node if the list tree exists, loads the tasks store, then removes itself as a handler.
     * @param {SimpleTasks.store.Lists} listsStore
     * @param {SimpleTasks.model.List[]} lists
     * @param {Boolean} success
     * @param {Ext.data.Operation} operation
     */
    handleListsLoad: function(listsStore, lists, success, operation) {
        var me = this,
            listTree = me.getListTree(),
            tasksStore = me.getTasksStore();
        
        if(listTree) {
            // if the list tree exists when the lists store is first loaded, select the root node.
            // when using a server proxy, the list tree will always exist at this point since asyncronous loading of data allows time for the list tree to be created and rendered.
            // when using a local storage proxy, the list tree will not yet exist at this point, so we'll have to select the root node on render instead (see handleAfterListTreeRender)
            listTree.getSelectionModel().select(0);
        }
        // wait until lists are done loading to load tasks since the task grid's "list" column renderer depends on lists store being loaded
        me.getTasksStore().load();
        // if the tasks store is asynchronous (server proxy) attach load handler for refreshing the list counts after loading is complete
        // if local storage is being used, isLoading will be false here since load() will run syncronously, so there is no need
        // to refresh the lists view because load will have happened before the list tree is even rendered
        if(tasksStore.isLoading()) {
            tasksStore.on('load', me.handleTasksLoad, me);
        }
        // remove the event listener after the first run
        listsStore.un('load', me.handleListsLoad, me);
    },

    /**
     * Handles the list tree's "afterrender" event
     * Selects the lists tree's root node, if the list tree exists
     * @param {SimpleTasks.view.lists.Tree} listTree
     */
    handleAfterListTreeRender: function(listTree) {
        listTree.getSelectionModel().select(0);
    },

    /**
     * Handles the lists store's write event.
     * Syncronizes the other read only list stores with the newly saved data
     * @param {SimpleTasks.store.Lists} listsStore
     * @param {Ext.data.Operation} operation
     */
    syncListsStores: function(listsStore, operation) {
        var me = this,
            stores = [
                Ext.getStore('Lists-TaskGrid'),
                Ext.getStore('Lists-TaskEditWindow'),
                Ext.getStore('Lists-TaskForm')
            ],
            storesLen = stores.length,
            records = operation.getRecords(),
            recordsLen = records.length, 
            i, j, listToSync, node, list, store;
            
        for (i = 0; i < recordsLen; ++i) {
            list = records[i];
            for (j = 0; j < storesLen; ++j) {
                store = stores[j];
                if (store) {
                    listToSync = store.getNodeById(list.getId());
                    switch(operation.action) {
                        case 'create':
                            node = store.getNodeById(list.parentNode.getId()) || store.getRoot();
                            node.appendChild(list.copy(list.getId()));
                            break;
                        case 'update':
                            if(listToSync) {
                                listToSync.set(list.data);
                                listToSync.commit();
                            }
                            break;
                        case 'destroy':
                            if(listToSync) {
                                listToSync.remove(false);
                            }
                    }
                }
            }
        }
    },

    /**
     * Handles a mouseenter event on a list tree node.
     * Shows the node's action icons.
     * @param {Ext.tree.View} view
     * @param {SimpleTasks.model.List} list
     * @param {HTMLElement} node
     * @param {Number} rowIndex
     * @param {Ext.EventObject} e
     */
    showActions: function(view, list, node, rowIndex, e) {
        var icons = Ext.fly(node).query('.x-action-col-icon');
        if(view.getRecord(node).get('id') > 0) {
            Ext.each(icons, function(icon){
                Ext.get(icon).removeCls('x-hidden');
            });
        }
    },

    /**
     * Handles a mouseleave event on a list tree node.
     * Hides the node's action icons.
     * @param {Ext.tree.View} view
     * @param {SimpleTasks.model.List} list
     * @param {HTMLElement} node
     * @param {Number} rowIndex
     * @param {Ext.EventObject} e
     */
    hideActions: function(view, list, node, rowIndex, e) {
        var icons = Ext.fly(node).query('.x-action-col-icon');
        Ext.each(icons, function(icon){
            Ext.get(icon).addCls('x-hidden');
        });
    },

    /**
     * Handles the list tree's itemcontextmenu event
     * Shows the list context menu.
     * @param {Ext.grid.View} view
     * @param {SimpleTasks.model.List} list
     * @param {HTMLElement} node
     * @param {Number} rowIndex
     * @param {Ext.EventObject} e
     */
    showContextMenu: function(view, list, node, rowIndex, e) {
        var contextMenu = this.getContextMenu(),
            newListItem = Ext.getCmp('new-list-item'),
            newFolderItem = Ext.getCmp('new-folder-item'),
            deleteFolderItem = Ext.getCmp('delete-folder-item'),
            deleteListItem = Ext.getCmp('delete-list-item');

        if(list.isLeaf()) {
            newListItem.hide();
            newFolderItem.hide();
            deleteFolderItem.hide();
            deleteListItem.show();
        } else {
            newListItem.show();
            newFolderItem.show();
            if(list.isRoot()) {
                deleteFolderItem.hide();
            } else {
                deleteFolderItem.show();
            }
            deleteListItem.hide();
        }
        contextMenu.setList(list);
        contextMenu.showAt(e.getX(), e.getY());
        e.preventDefault();
    }

});
