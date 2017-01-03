/**
 * @class SimpleTasks.controller.Tasks
 * @extends Ext.app.Controller
 */
Ext.define('SimpleTasks.controller.Tasks', {
    extend: 'Ext.app.Controller',

    models: ['Task'],
    stores: ['Tasks'],

    views: [
        'tasks.Grid',
        'tasks.Form',
        'tasks.EditWindow',
        'tasks.DefaultTimeWindow',
        'tasks.ReminderWindow',
        'tasks.ContextMenu'
    ],

    refs: [
        {
            ref: 'listTree',
            selector: 'listTree'
        },
        {
            ref: 'taskForm',
            selector: 'taskForm'
        },
        {
            ref: 'taskGrid',
            selector: 'taskGrid'
        },
        {
            ref: 'tasksToolbar',
            selector: 'tasksToolbar'
        },
        {
            ref: 'taskEditWindow',
            selector: 'taskEditWindow',
            xtype: 'taskEditWindow',
            autoCreate: true
        },
        {
            ref: 'defaultTimeWindow',
            selector: 'defaultTimeWindow',
            xtype: 'defaultTimeWindow',
            autoCreate: true
        },
        {
            ref: 'reminderWindow',
            selector: 'reminderWindow',
            xtype: 'reminderWindow',
            forceCreate: true
        },
        {
            ref: 'contextMenu',
            selector: 'tasksContextMenu',
            xtype: 'tasksContextMenu',
            autoCreate: true
        }
    ],

    init: function() {
        var me = this;
        me.control(
            {
                'taskForm textfield': {
                    specialkey: me.handleSpecialKey
                },
                '[iconCls=tasks-new]': {
                    click: me.focusTaskForm
                },
                '#delete-task-btn': {
                    click: me.handleDeleteClick
                },
                '#delete-task-item': {
                    click: me.handleDeleteClick
                },
                '#mark-complete-item': {
                    click: me.markComplete
                },
                '#mark-complete-btn': {
                    click: me.markComplete
                },
                '#mark-active-item': {
                    click: me.markActive
                },
                '#mark-active-btn': {
                    click: me.markActive
                },
                '#show-all-btn': {
                    click: me.filterAll
                },
                '#show-active-btn': {
                    click: me.filterActive
                },
                '#show-complete-btn': {
                    click: me.filterComplete
                },
                '#edit-task-item': {
                    click: me.handleEditItemClick
                },
                'taskGrid': {
                    recordedit: me.updateTask,
                    deleteclick: me.handleDeleteIconClick,
                    editclick: me.handleEditIconClick,
                    reminderselect: me.setReminder,
                    itemmouseenter: me.showActions,
                    itemmouseleave: me.hideActions,
                    selectionchange: me.toggleButtons,
                    columnresize: me.syncTaskFormFieldWidth,
                    itemcontextmenu: me.showContextMenu
                },
                'tasksToolbar': {
                    afterrender: me.initShowAll
                },
                'taskEditWindow [name=has_reminder]': {
                    change: me.toggleReminderFields
                },
                '#cancel-task-edit-btn': {
                    click: me.hideEditWindow
                },
                '#save-task-edit-btn': {
                    click: me.handleSaveTaskClick
                },
                'taskEditWindow [name=reminder_date]': {
                    change: me.syncReminderField
                },
                'taskEditWindow [name=reminder_time]': {
                    change: me.syncReminderField
                },
                '#toggle-complete-btn': {
                    click: me.toggleCompleteField
                },
                '#delete-task-window-btn': {
                    click: me.deleteTaskAndCloseEditWindow
                },
                'defaultTimeWindow [name=default_time]': {
                    
                },
                '#cancel-default-time-edit-btn': {
                    click: me.hideDefaultTimeWindow
                },
                '#save-default-time-btn': {
                    click: me.saveDefaultTime
                },
                '[cls=snooze-btn]': {
                    click: me.snooze
                },
                '[cls=dismiss-reminder-btn]': {
                    click: me.dismissReminder
                }
            }
        );

        me.initReminderInterval();
    },

    /**
     * Handles a "specialkey" event on an field on the task form.
     * Creates a new task if the enter key is pressed.
     * @param {Ext.form.field.Text} field
     * @param {Ext.EventObject} e
     */
    handleSpecialKey: function(field, e) {
        if(e.getKey() === e.ENTER) {
            this.newTask();
        }
    },

    /**
     * Creates a new task based on the data currently contained in the task form.
     * Saves the new task to the server and adds it to the task list view.
     */
    newTask: function() {
        var me = this,
            form = me.getTaskForm(),
            basicForm = form.getForm(),
            formEl = form.getEl(),
            titleField = form.getForm().findField('title'),
            task = Ext.create('SimpleTasks.model.Task');

        // require title field to have a value
        if(!titleField.getValue()) {
            return;
        }

        // update the new task record with the data from the form.
        basicForm.updateRecord(task);

        // try to blur all of this form's items to make sure that the user can't type into a field while saving
        form.items.each(function(item) {
            var inputEl = item.getEl().down('input');
            if(inputEl) {
                inputEl.blur();
            }
        });

        // mask the form element while saving
        formEl.mask('saving . . .');
        // save the task to the server
        task.save({
            success: function(task, operation) {
                me.getTasksStore().add(task);
                me.refreshListTree();
                me.getTasksStore().sort();
                titleField.reset();
                titleField.focus();
                formEl.unmask();
            },
            failure: function(task, operation) {
                var error = operation.getError(),
                    msg = Ext.isObject(error) ? error.status + ' ' + error.statusText : error;

                Ext.MessageBox.show({
                    title: 'Add Task Failed',
                    msg: msg,
                    icon: Ext.Msg.ERROR,
                    buttons: Ext.Msg.OK
                });
                formEl.unmask();
            }
        });
    },

    /**
     * Handles the task list's "recordedit" event.
     * Updates the task on the server whenever a task is updated using the task grid's cell editor
     * @param {SimpleTasks.model.Task} task    The task record that was edited
     */
    updateTask: function(task) {
        var me = this;

        if(task.modified.done === false) {
            task.set('reminder', null);
        }
        task.save({
            success: function(task, operation) {
                me.refreshListTree();
                me.getTasksStore().sort();
            },
            failure: function(task, operation) {
                var error = operation.getError(),
                    msg = Ext.isObject(error) ? error.status + ' ' + error.statusText : error;

                Ext.MessageBox.show({
                    title: 'Update Task Failed',
                    msg: msg,
                    icon: Ext.Msg.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        });
    },

    /**
     * Handles a click on a delete icon in the task grid.
     * @param {Ext.grid.View} view
     * @param {Number} rowIndex
     * @param {Number} colIndex
     * @param {Ext.grid.column.Action} column
     * @param {EventObject} e
     */
    handleDeleteIconClick: function(view, rowIndex, colIndex, column, e) {
        this.deleteTask(this.getTasksStore().getAt(rowIndex));
    },

    /**
     * Handles a click on the "delete task" button or context menu item
     * @param {Ext.button.Button} button
     * @param {Ext.EventObject} e
     */
    handleDeleteClick: function(button, e) {
        this.deleteTask(this.getTaskGrid().getSelectionModel().getSelection()[0]);
    },

    /**
     * Deletes the task from the server and updates the view.
     * @param {SimpleTasks.model.Task} task
     * @param {Function} successCallback           A function to call after the task has been deleted successfully
     */
    deleteTask: function(task, successCallback) {
        var me = this;
        
        Ext.Msg.show({
            title: 'Delete Task?',
            msg: 'Are you sure you want to delete this task?',
            buttons: Ext.Msg.YESNO,
            fn: function(response) {
                if(response === 'yes') {
                    task.erase({
                        success: function(task, operation) {
                            me.getTasksStore().remove(task);
                            me.refreshListTree();
                            if(successCallback) {
                                successCallback();
                            }
                        },
                        failure: function(task, operation) {
                            var error = operation.getError(),
                                msg = Ext.isObject(error) ? error.status + ' ' + error.statusText : error;

                            Ext.MessageBox.show({
                                title: 'Delete Task Failed',
                                msg: msg,
                                icon: Ext.Msg.ERROR,
                                buttons: Ext.Msg.OK
                            });
                        }
                    });
                }
            }
        });
    },

    /**
     * Refreshes the task grid's list filter, and the task counts in the list tree
     */
    refreshListTree: function() {
        // refresh the lists list view so that the task counts will be correct
        this.getListTree().refreshView();
    },

    /**
     * Handles a click on the "Edit" context menu item
     * @param {Ext.menu.Item} item
     * @param {EventObject} e
     */
    handleEditItemClick: function(item, e) {
        this.showEditWindow(this.getContextMenu().getTask());
    },

    /**
     * Handles a click on the "Edit Task" action column
     * @param {Ext.grid.View} view
     * @param {Number} rowIndex
     * @param {Number} colIndex
     * @param {Ext.grid.column.Action} column
     * @param {EventObject} e
     */
    handleEditIconClick: function(view, rowIndex, colIndex, column, e) {
        this.showEditWindow(view.getRecord(view.findTargetByEvent(e)));
    },

    /**
     * Handles the task grid's "selectionchange" event.
     * Disables or enables the task-related toolbar buttons depending on whether or not there is a selection.
     * @param {Ext.selection.RowModel} selModel
     * @param {SimpleTasks.model.Task[]} tasks
     */
    toggleButtons: function(selModel, tasks) {
        var deleteTaskBtn = Ext.getCmp('delete-task-btn'),
            markCompleteBtn = Ext.getCmp('mark-complete-btn'),
            markActiveBtn = Ext.getCmp('mark-active-btn');

        if(tasks.length === 0) {
            deleteTaskBtn.disable();
            markCompleteBtn.disable();
            markActiveBtn.disable();
        } else {
            deleteTaskBtn.enable();
            markCompleteBtn.enable();
            markActiveBtn.enable();
        }
    },

    /**
     * Handles a click on the "New Task" button or context menu item
     * focuses the title field on the new task form
     * @param {Ext.Component} component
     * @param {Ext.EventObject} e
     */
    focusTaskForm: function(component, e) {
        this.getTaskForm().query('[name=title]')[0].focus();
    },

    /**
     * Handles a click on the "Mark Complete" button or menu item
     * Sets the selected task's "done" field to true
     * @param {Ext.Component} component
     * @param {Ext.EventObject} e
     */
    markComplete: function(component, e) {
        var contextMenu = this.getContextMenu(),
            task = contextMenu.isVisible() ? contextMenu.getTask() : this.getTaskGrid().getSelectionModel().getSelection()[0];

        task.set('done', true);
        task.set('reminder', null);
        task.save({
            failure: function(task, operation) {
                var error = operation.getError(),
                    msg = Ext.isObject(error) ? error.status + ' ' + error.statusText : error;

                Ext.MessageBox.show({
                    title: 'Mark Complete Failed',
                    msg: msg,
                    icon: Ext.Msg.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        });
        this.refreshListTree();
    },

    /**
     * Handles a click on the "Mark Active" button
     * Sets the selected task's "done" field to false
     * @param {Ext.button.Button} button
     * @param {Ext.EventObject} e
     */
    markActive: function(button, e) {
        var contextMenu = this.getContextMenu(),
            task = contextMenu.isVisible() ? contextMenu.getTask() : this.getTaskGrid().getSelectionModel().getSelection()[0];

        task.set('done', false);
        task.save({
            failure: function(task, operation) {
                var error = operation.getError(),
                    msg = Ext.isObject(error) ? error.status + ' ' + error.statusText : error;

                Ext.MessageBox.show({
                    title: 'Mark Active Failed',
                    msg: msg,
                    icon: Ext.Msg.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        });
        this.refreshListTree();
    },

    /**
     * Handles the task grid columnresize event.
     * Synchronizes the width the column's associated form field with the width of the column
     * @param {Ext.grid.header.Container} headerContainer
     * @param {Ext.column.Column} column
     * @param {Number} width The new column width
     */
    syncTaskFormFieldWidth: function(headerContainer, column, width) {
        var field = this.getTaskForm().query('[name=' + column.dataIndex + ']')[0];
        if (field) {
            field.setWidth(width - 5);
        }
    },

    /**
     * Handles a click on the "Show All" button. Removes any filter on the done field so that all tasks will be displayed
     * @param {Ext.button.Button} button
     * @param {Ext.EventObject} e
     */
    filterAll: function(button, e) {
        this.getTasksStore().clearFilter();
        this.refreshListTree();
    },

    /**
     * Handles a click on the "Show Active" button. Filters tasks by done = false
     * @param {Ext.button.Button} button
     * @param {Ext.EventObject} e
     */
    filterActive: function(button, e) {
        this.getTasksStore().addFilter({
            property: 'done',
            value: false
        });
        this.refreshListTree();
    },

    /**
     * Handles a click on the "Show Complete" button. Filters tasks by done = true.
     * @param {Ext.button.Button} button
     * @param {Ext.EventObject} e
     */
    filterComplete: function(button, e) {
        this.getTasksStore().addFilter({
            property: 'done',
            value: true
        });
        this.refreshListTree();
    },

    /**
     * Handles the tasks toolbar's render event
     * Initializes the "Show All" Button to the pressed state
     * @param {SimpleTasks.view.Toolbar} toolbar
     */
    initShowAll: function(toolbar) {
        toolbar.getComponent('show-all-btn').toggle();
    },

    /**
     * Handles a mouseenter event on a task grid item.
     * Shows the item's action icons.
     * @param {Ext.grid.View} view
     * @param {SimpleTasks.model.Task} task
     * @param {HTMLElement} node
     * @param {Number} rowIndex
     * @param {Ext.EventObject} e
     */
    showActions: function(view, task, node, rowIndex, e) {
        var icons = Ext.fly(node).query('.x-action-col-icon');
        Ext.each(icons, function(icon){
            Ext.get(icon).removeCls('x-hidden');
        });
    },

    /**
     * Handles a mouseleave event on a task grid item.
     * Hides the item's action icons.
     * @param {Ext.grid.View} view
     * @param {SimpleTasks.model.Task} task
     * @param {HTMLElement} node
     * @param {Number} rowIndex
     * @param {Ext.EventObject} e
     */
    hideActions: function(view, task, node, rowIndex, e) {
        var icons = Ext.fly(node).query('.x-action-col-icon');
        Ext.each(icons, function(icon){
            Ext.get(icon).addCls('x-hidden');
        });
    },

    /**
     * Handles the task grid's itemcontextmenu event
     * Shows the task context menu.
     * @param {Ext.grid.View} view
     * @param {SimpleTasks.model.Task} task
     * @param {HTMLElement} node
     * @param {Number} rowIndex
     * @param {Ext.EventObject} e
     */
    showContextMenu: function(view, task, node, rowIndex, e) {
        var contextMenu = this.getContextMenu(),
            markCompleteItem = Ext.getCmp('mark-complete-item'),
            markActiveItem = Ext.getCmp('mark-active-item');

        if(task.get('done')) {
            markCompleteItem.hide();
            markActiveItem.show();
        } else {
            markCompleteItem.show();
            markActiveItem.hide();
        }
        contextMenu.setTask(task);
        contextMenu.showAt(e.getX(), e.getY());
        e.preventDefault();
    },

    /**
     * Shows the "Edit Task" window
     * @param {SimpleTasks.model.Task} task       the task to edit
     */
    showEditWindow: function(task) {
        var me = this,
            taskEditWindow = me.getTaskEditWindow(),
            form =  taskEditWindow.down('form').getForm(),
            reminderCheckbox = form.findField('has_reminder'),
            dateField = form.findField('reminder_date'),
            timeField = form.findField('reminder_time'),
            reminder = task.get('reminder');

        // Set the tasks title as the title of the edit window
        taskEditWindow.setTitle('Edit Task - ' + task.get('title'));
        // load the task data into the form
        taskEditWindow.down('form').loadRecord(task);
        // set the text of the toggle-complete button depending on the tasks "done" value
        Ext.getCmp('toggle-complete-btn').setText(task.get('done') ? 'Mark Active' : 'Mark Complete');
        taskEditWindow.show();

        if(task.get('reminder')) {
            // if the task already has a reminder set check the reminder checkbox and populate the reminder date and reminder time fields
            reminderCheckbox.setValue(true);
            dateField.setValue(Ext.Date.clearTime(reminder, true));
            timeField.setValue(Ext.Date.format(reminder, timeField.format)); 
        } else {
            // if the task does not have a reminder set uncheck the reminder checkbox and set the reminder date and time fields to null
            reminderCheckbox.setValue(false);
            dateField.setValue(null);
            timeField.setValue(null); 
        }

        if(task.get('done')) {
            // if the task is done disable the reminder checkbox (reminders cannot be set on completed tasks)
            reminderCheckbox.disable();
        } else {
            reminderCheckbox.enable();
        }

    },

    /**
     * Handles a click on the "Edit Task" window's cancel button
     * Hides the "Edit Task" window
     * @param {Ext.Button} button
     * @param {Ext.EventObject} e
     */
    hideEditWindow: function(button, e) {
        this.getTaskEditWindow().close();
    },

    /**
     * Handles the change event on the task edit window's "has_reminder" checkbox
     * Toggles the visibility of the reminder date and time fields
     * @param {Ext.form.field.Checkbox} checkbox
     * @param {Boolean} newValue
     * @param {Boolean} oldValue
     */
    toggleReminderFields: function(checkbox, newValue, oldValue) {
        var taskEditWindow = this.getTaskEditWindow(),
            windowEl = taskEditWindow.getEl(),
            form = taskEditWindow.down('form').getForm(),
            task = form.getRecord(),
            dateField = form.findField('reminder_date'),
            timeField = form.findField('reminder_time'),
            defaultTimeDate, defaultTimeMilliseconds;
        
        if(newValue) { // if the "has reminder" checkbox was checked
            windowEl.mask('loading');
            // get the default reminder time from the server or cache
            this.getDefaultReminderTime(function(defaultTime) {
                // enable the date and time fields
                dateField.enable();
                timeField.enable();
                if(!dateField.getValue()) {
                    // if the reminder date has not already been set, default the reminder date to the task's due date
                    // or the current date if the task does not have a due date
                    dateField.setValue(task.get('due') || Ext.Date.clearTime(new Date()));
                    timeField.setValue(defaultTime);
                }
                // set the form's hidden reminder field by combining the reminder date and time fields
                defaultTimeDate = timeField.getValue();
                defaultTimeMilliseconds = defaultTimeDate - Ext.Date.clearTime(defaultTimeDate, true);
                form.findField('reminder').setValue(new Date(dateField.getValue().getTime() + defaultTimeMilliseconds));
                windowEl.unmask();
            }, timeField.format);
        } else { // if the "has reminder" checkbox was unchecked
            // nullify the form's hidden reminder field and disable the reminder date and time fields
            form.findField('reminder').setValue(null);
            dateField.disable();
            timeField.disable();
        }
    },

    /**
     * Handles a click on the "Task Edit" window's save button.
     * @param {Ext.button.Button} button
     * @param {Ext.EventObject} e
     */
    handleSaveTaskClick: function(button, e) {
        this.saveEditWindow();
    },

    /**
     * Updates the task record with the form data from the edit window and saves the task to the server.
     */
    saveEditWindow: function() {
        var taskEditWindow = this.getTaskEditWindow(),
            windowEl = taskEditWindow.getEl(),
            form = taskEditWindow.down('form').getForm(),
            task = form.getRecord();

        if(form.isValid()) {
            windowEl.mask('saving');
            form.updateRecord(task);
            if(task.modified.done === false) {
                task.set('reminder', null);
            }
            task.save({
                success: function(task, operation) {
                    windowEl.unmask();
                    taskEditWindow.close();
                },
                failure: function(task, operation) {
                    var error = operation.getError(),
                       msg = Ext.isObject(error) ? error.status + ' ' + error.statusText : error;

                    Ext.MessageBox.show({
                        title: 'Edit Task Failed',
                        msg: msg,
                        icon: Ext.Msg.ERROR,
                        buttons: Ext.Msg.OK
                    });
                    windowEl.unmask();
                }
            })
        } else {
            Ext.Msg.alert('Invalid Data', 'Please correct form errors');
        }
    },

    /**
     * Syncronizes the value of the edit window's hidden reminder field whenever "reminder_date", or "reminder_time" is changed
     * @param {Ext.form.field.Picker} field     the date or time picker
     * @param {Date} oldValue
     * @param {Date} newValue
     */
    syncReminderField: function(field, oldValue, newValue) {
        var form = this.getTaskEditWindow().down('form').getForm(),
            reminderField = form.findField('reminder'),
            date = form.findField('reminder_date').getValue(),
            timeDate = form.findField('reminder_time').getValue(),
            time, reminderDate;

        if(date && timeDate) {
            time = timeDate - Ext.Date.clearTime(timeDate, true);
            reminderDate = new Date(date.getTime() + time);
            reminderField.setValue(reminderDate); 
        }
    },

    /**
     * Toggles the edit window's "done" field to true when the "Mark Complete" or "Mark Active" button on the edit window is clicked
     * @param {Ext.button.Button} button
     * @param {Ext.EventObject} e
     */
    toggleCompleteField: function(button, e) {
        var taskEditWindow = this.getTaskEditWindow(),
            doneField = taskEditWindow.down('form').getForm().findField('done');

        if(doneField.getValue() === 'true') {
            doneField.setValue(false);
        } else {
            doneField.setValue(true);
        }
        this.saveEditWindow();
    },

    /**
     * Handles a click on the "Delete" button on the edit window.
     * Deletes the task and closes the edit window
     * @param {Ext.button.Button} button
     * @param {Ext.EventObject} e
     */
    deleteTaskAndCloseEditWindow: function(button, e) {
        var me = this,
            taskEditWindow = me.getTaskEditWindow(),
            task = taskEditWindow.down('form').getRecord();

        me.deleteTask(task, function() {
            me.getTaskEditWindow().close();
        });
    },

    /**
     * Handles the Task Grid's `reminderselect` event
     * Sets a task's reminder
     * @param {SimpleTasks.model.Task} task    the underlying record of the row that was clicked to show the reminder menu
     * @param {String|Number} value      The value that was selected
     */
    setReminder: function(task, value) {
        var me = this,
            defaultTimeWindow = me.getDefaultTimeWindow(),
            defaultTimeField = defaultTimeWindow.down('form').getForm().findField('default_time'),
            defaultTimeDate, defaultTimeMilliseconds;

        me.getDefaultReminderTime(function(defaultTime) {
            if(value === 'set') {
                // if the user selected "Set Default Time", show the default time window.
                defaultTimeField.setValue(defaultTime);
                defaultTimeWindow.show();
            } else {
                if(Ext.isNumber(value)) {
                    // if the user selected a reminder time, set the reminder by adding the user selected value to the due date
                    defaultTimeDate = Ext.Date.parse(defaultTime, defaultTimeField.format);
                    defaultTimeMilliseconds = defaultTimeDate - Ext.Date.clearTime(defaultTimeDate, true);
                    task.set('reminder', new Date(task.get('due').getTime() - (value * 86400000) + defaultTimeMilliseconds));
                } else {
                    // if the user selected "No Reminder" set the reminder field to null
                    task.set('reminder', null);
                }
                task.save({
                    failure: function(task, operation) {
                        var error = operation.getError(),
                           msg = Ext.isObject(error) ? error.status + ' ' + error.statusText : error;

                        Ext.MessageBox.show({
                            title: 'Set Reminder Failed',
                            msg: msg,
                            icon: Ext.Msg.ERROR,
                            buttons: Ext.Msg.OK
                        });
                    }
                });
            }
        }, defaultTimeField.format);
    },

    /**
     * Gets the default reminder time and passes it to the callback function.
     * Retrieves default reminder time from the server on the first call, then caches it for future calls.
     * @param {Function} callback
     * @param {String} timeFormat, the time format used to encode the time: the time format of the destination TimeField
     */
    getDefaultReminderTime: function(callback, timeFormat) {
        var me = this,
            defaultReminderTime;

        if(me.defaultReminderTime) {
            callback(me.defaultReminderTime);
        } else {
            me.defaultReminderTime = Ext.Date.format(Ext.Date.parse('8', 'g'), timeFormat || "g:i A"); // the default time if no value can be retrieved from storage
            if (SimpleTasks.Settings.useLocalStorage) {
                defaultReminderTime = localStorage.getItem('SimpleTasks-defaultReminderTime');
                if (defaultReminderTime && Ext.Date.parse(defaultReminderTime, timeFormat)) {
                    me.defaultReminderTime = defaultReminderTime;
                }
                callback(me.defaultReminderTime);
            } else {
                Ext.Ajax.request({
                    url: 'php/config/read.php',
                    params: {
                        key: 'default.reminder.time'
                    },
                    success: function(response, options) {
                        var responseData = Ext.decode(response.responseText);
                        if(responseData.success && responseData.value && Ext.Date.parse(responseData.value, timeFormat)) {
                            me.defaultReminderTime = responseData.value;
                        }
                        callback(me.defaultReminderTime);
                    },
                    failure: function(response, options) {
                        callback(me.defaultReminderTime);
                    }
                });
            }
        }
    },

    /**
     * Hides the default reminder time window when the cancel button is clicked
     * @param {Ext.button.Button} button
     * @param {Ext.EventObject} e
     */
    hideDefaultTimeWindow: function(button, e) {
        this.getDefaultTimeWindow().close();
    },

    /**
     * Saves the default reminder time to the server when the OK button is clicked
     * @param {Ext.button.Button} button
     * @param {Ext.EventObject} e
     */
    saveDefaultTime: function(button, e) {
        var me = this,
            defaultTimeWindow = me.getDefaultTimeWindow(),
            windowEl = defaultTimeWindow.getEl(),
            field = defaultTimeWindow.down('form').getForm().findField('default_time'),
            time = field.getRawValue();
            
        if (!field.isValid()) {
            return;
        }

        if (SimpleTasks.Settings.useLocalStorage) {
            localStorage.setItem('SimpleTasks-defaultReminderTime', time);
            me.defaultReminderTime = time;
            defaultTimeWindow.close();
        } else {
            windowEl.mask('saving');
            Ext.Ajax.request({
                url: 'php/config/update.php',
                params: {
                    key: 'default.reminder.time',
                    value: time
                },
                success: function(response, options) {
                    var responseData = Ext.decode(response.responseText);

                    if(responseData.success) {
                        me.defaultReminderTime = time;
                        defaultTimeWindow.close();
                    } else {
                        Ext.MessageBox.show({
                            title: 'Set Default Time Failed',
                            msg: responseData.message,
                            icon: Ext.Msg.ERROR,
                            buttons: Ext.Msg.OK
                        });
                    }
                    windowEl.unmask();
                },
                failure: function(response, options) {
                    Ext.MessageBox.show({
                        title: 'Set Default Time Failed',
                        msg: response.status + ' ' + response.statusText,
                        icon: Ext.Msg.ERROR,
                        buttons: Ext.Msg.OK
                    });
                    windowEl.unmask();
                }
            });
        }
    },

    /**
     * Initializes checking for tasks that have passed their reminder date at 10 second intervals.
     */
    initReminderInterval: function() {
        var me = this,
            now, reminderDate;

        setInterval(function() {
            now = new Date();
            me.getTasksStore().each(function(task) {
                reminderDate = task.get('reminder');
                if(reminderDate && reminderDate < now && !task.get('done')) {
                    me.showReminderWindow(task);
                }
            });
        }, 10000);
    },

    /**
     * Shows the reminder window for a given task
     * @param {SimpleTasks.model.Task} task
     */
    showReminderWindow: function(task) {
        var reminderWindow = this.getReminderWindow(),
            reminderDetailsBox = reminderWindow.down('[cls=tasks-reminder-details]'),
            title = task.get('title');

        task.set('reminder', null);
        task.save({
            failure: function(task, operation) {
                var error = operation.getError(),
                   msg = Ext.isObject(error) ? error.status + ' ' + error.statusText : error;

                Ext.MessageBox.show({
                    title: 'Clear Reminder Failed',
                    msg: msg,
                    icon: Ext.Msg.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        });
        reminderWindow.setTask(task);
        reminderWindow.setTitle('Reminder - ' + title);
        reminderDetailsBox.update({
            title: title,
            due: task.get('due')
        });
        reminderWindow.show();
    },


    /**
     * Handles a click on the snooze button on the reminder window.
     * Sets the task's reminder date to the current date plus snooze time selected
     * @param {Ext.button.Button} button
     * @param {Ext.EventObject} e
     */
    snooze: function(button, e) {
        var reminderWindow = button.findParentByType('window'),
            task = reminderWindow.getTask(),
            snoozeMilliseconds = reminderWindow.down('[name=snooze_time]').getValue() * 60000,
            reminderDate = new Date(new Date().getTime() + snoozeMilliseconds);

        task.set('reminder', reminderDate);
        task.save({
            failure: function(task, operation) {
                var error = operation.getError(),
                   msg = Ext.isObject(error) ? error.status + ' ' + error.statusText : error;

                Ext.MessageBox.show({
                    title: 'Set Reminder Failed',
                    msg: msg,
                    icon: Ext.Msg.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        });
        reminderWindow.close();
    },

    /**
     * Handle's a click on the reminder window's dismiss button.
     * Hides the reminder window.
     * @param {Ext.button.Button} button
     * @param {Ext.EventObject} e
     */
    dismissReminder: function(button, e) {
        button.findParentByType('window').close();
    }

});