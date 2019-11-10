/*
* FooTable v3 - FooTable is a jQuery plugin that aims to make HTML tables on smaller devices look awesome.
* @version 3.1.5
* @link http://fooplugins.com
* @copyright Steven Usher & Brad Vincent 2015
* @license Released under the GPLv3 license.
*/
(function($, F){

	F.Editing = F.Component.extend(/** @lends FooTable.Editing */{
		/**
		 * The editing component adds a column with edit and delete buttons to each row as well as a single add row button in the footer.
		 * @constructs
		 * @extends FooTable.Component
		 * @param {FooTable.Table} table - The parent {@link FooTable.Table} object for the component.
		 * @returns {FooTable.Editing}
		 */
		construct: function(table){
			// call the base constructor
			this._super(table, table.o.editing.enabled);

			/**
			 * Whether or not to automatically page to a new row when it is added to the table.
			 * @type {boolean}
			 */
			this.pageToNew = table.o.editing.pageToNew;

			/**
			 * Whether or not the editing column and add row button are always visible.
			 * @type {boolean}
			 */
			this.alwaysShow = table.o.editing.alwaysShow;

			/**
			 * The options for the editing column. @see {@link FooTable.EditingColumn} for more info.
			 * @type {object}
			 * @prop {string} classes="footable-editing" - A space separated string of class names to apply to all cells in the column.
			 * @prop {string} name="editing" - The name of the column.
			 * @prop {string} title="" - The title displayed in the header row of the table for the column.
			 * @prop {boolean} filterable=false - Whether or not the column should be filterable when using the filtering component.
			 * @prop {boolean} sortable=false - Whether or not the column should be sortable when using the sorting component.
			 */
			this.column = $.extend(true, {}, table.o.editing.column, {visible: this.alwaysShow});

			/**
			 * The position of the editing column in the table as well as the alignment of the buttons.
			 * @type {string}
			 */
			this.position = table.o.editing.position;


			/**
			 * The text that appears in the show button. This can contain HTML.
			 * @type {string}
			 */
			this.showText = table.o.editing.showText;

			/**
			 * The text that appears in the hide button. This can contain HTML.
			 * @type {string}
			 */
			this.hideText = table.o.editing.hideText;

			/**
			 * The text that appears in the add button. This can contain HTML.
			 * @type {string}
			 */
			this.addText = table.o.editing.addText;

			/**
			 * The text that appears in the edit button. This can contain HTML.
			 * @type {string}
			 */
			this.editText = table.o.editing.editText;

			/**
			 * The text that appears in the delete button. This can contain HTML.
			 * @type {string}
			 */
			this.deleteText = table.o.editing.deleteText;
			
			/**
			 * The text that appears in the view button. This can contain HTML.
			 * @type {string}
			 */
			this.viewText = table.o.editing.viewText;

			/**
			 * Whether or not to show the Add Row button.
			 * @type {boolean}
			 */
			this.allowAdd = table.o.editing.allowAdd;

			/**
			 * Whether or not to show the Edit Row button.
			 * @type {boolean}
			 */
			this.allowEdit = table.o.editing.allowEdit;

			/**
			 * Whether or not to show the Delete Row button.
			 * @type {boolean}
			 */
			this.allowDelete = table.o.editing.allowDelete;

			/**
			 * Whether or not to show the View Row button.
			 * @type {boolean}
			 */
			this.allowView = table.o.editing.allowView;

			/**
			 * Caches the row button elements to help with performance.
			 * @type {(null|jQuery)}
			 * @private
			 */
			this._$buttons = null;

			/**
			 * This object is used to contain the callbacks for the add, edit and delete row buttons.
			 * @type {object}
			 * @prop {function} addRow
			 * @prop {function} editRow
			 * @prop {function} deleteRow
			 * @prop {function} viewRow
			 */
			this.callbacks = {
				addRow: F.checkFnValue(this, table.o.editing.addRow),
				editRow: F.checkFnValue(this, table.o.editing.editRow),
				deleteRow: F.checkFnValue(this, table.o.editing.deleteRow),
				viewRow: F.checkFnValue(this, table.o.editing.viewRow)
			};
		},
		/* PROTECTED */
		/**
		 * Checks the supplied data and options for the editing component.
		 * @instance
		 * @protected
		 * @param {object} data - The jQuery data object from the parent table.
		 * @fires FooTable.Editing#"preinit.ft.editing"
		 */
		preinit: function(data){
			var self = this;
			/**
			 * The preinit.ft.editing event is raised before the UI is created and provides the tables jQuery data object for additional options parsing.
			 * Calling preventDefault on this event will disable the component.
			 * @event FooTable.Editing#"preinit.ft.editing"
			 * @param {jQuery.Event} e - The jQuery.Event object for the event.
			 * @param {FooTable.Table} ft - The instance of the plugin raising the event.
			 * @param {object} data - The jQuery data object of the table raising the event.
			 */
			this.ft.raise('preinit.ft.editing', [data]).then(function(){
				if (self.ft.$el.hasClass('footable-editing'))
					self.enabled = true;

				self.enabled = F.is.boolean(data.editing)
					? data.editing
					: self.enabled;

				if (!self.enabled) return;

				self.pageToNew = F.is.boolean(data.editingPageToNew) ? data.editingPageToNew : self.pageToNew;

				self.alwaysShow = F.is.boolean(data.editingAlwaysShow) ? data.editingAlwaysShow : self.alwaysShow;

				self.position = F.is.string(data.editingPosition) ? data.editingPosition : self.position;

				self.showText = F.is.string(data.editingShowText) ? data.editingShowText : self.showText;

				self.hideText = F.is.string(data.editingHideText) ? data.editingHideText : self.hideText;

				self.addText = F.is.string(data.editingAddText) ? data.editingAddText : self.addText;

				self.editText = F.is.string(data.editingEditText) ? data.editingEditText : self.editText;

				self.deleteText = F.is.string(data.editingDeleteText) ? data.editingDeleteText : self.deleteText;

				self.viewText = F.is.string(data.editingViewText) ? data.editingViewText : self.viewText;

				self.allowAdd = F.is.boolean(data.editingAllowAdd) ? data.editingAllowAdd : self.allowAdd;

				self.allowEdit = F.is.boolean(data.editingAllowEdit) ? data.editingAllowEdit : self.allowEdit;

				self.allowDelete = F.is.boolean(data.editingAllowDelete) ? data.editingAllowDelete : self.allowDelete;

				self.allowView = F.is.boolean(data.editingAllowView) ? data.editingAllowView : self.allowView;

				self.column = new F.EditingColumn(self.ft, self, $.extend(true, {}, self.column, data.editingColumn, {visible: self.alwaysShow}));

				if (self.ft.$el.hasClass('footable-editing-left'))
					self.position = 'left';

				if (self.ft.$el.hasClass('footable-editing-right'))
					self.position = 'right';

				if (self.position === 'right'){
					self.column.index = self.ft.columns.array.length;
				} else {
					self.column.index = 0;
					for (var i = 0, len = self.ft.columns.array.length; i < len; i++){
						self.ft.columns.array[i].index += 1;
					}
				}
				self.ft.columns.array.push(self.column);
				self.ft.columns.array.sort(function(a, b){ return a.index - b.index; });

				self.callbacks.addRow = F.checkFnValue(self, data.editingAddRow, self.callbacks.addRow);
				self.callbacks.editRow = F.checkFnValue(self, data.editingEditRow, self.callbacks.editRow);
				self.callbacks.deleteRow = F.checkFnValue(self, data.editingDeleteRow, self.callbacks.deleteRow);
				self.callbacks.viewRow = F.checkFnValue(self, data.editingViewRow, self.callbacks.viewRow);
			}, function(){
				self.enabled = false;
			});
		},
		/**
		 * Initializes the editing component for the plugin using the supplied table and options.
		 * @instance
		 * @protected
		 * @fires FooTable.Editing#"init.ft.editing"
		 */
		init: function(){
			/**
			 * The init.ft.editing event is raised before its UI is generated.
			 * Calling preventDefault on this event will disable the component.
			 * @event FooTable.Editing#"init.ft.editing"
			 * @param {jQuery.Event} e - The jQuery.Event object for the event.
			 * @param {FooTable.Table} ft - The instance of the plugin raising the event.
			 */
			var self = this;
			this.ft.raise('init.ft.editing').then(function(){
				self.$create();
			}, function(){
				self.enabled = false;
			});
		},
		/**
		 * Destroys the editing component removing any UI generated from the table.
		 * @instance
		 * @protected
		 * @fires FooTable.Editing#"destroy.ft.editing"
		 */
		destroy: function () {
			/**
			 * The destroy.ft.editing event is raised before its UI is removed.
			 * Calling preventDefault on this event will prevent the component from being destroyed.
			 * @event FooTable.Editing#"destroy.ft.editing"
			 * @param {jQuery.Event} e - The jQuery.Event object for the event.
			 * @param {FooTable.Table} ft - The instance of the plugin raising the event.
			 */
			var self = this;
			this.ft.raise('destroy.ft.editing').then(function(){
				self.ft.$el.removeClass('footable-editing footable-editing-always-show footable-editing-no-add footable-editing-no-edit footable-editing-no-delete footable-editing-no-view')
					.off('click.ft.editing').find('tfoot > tr.footable-editing').remove();
			});
		},
		/**
		 * Creates the editing UI from the current options setting the various jQuery properties of this component.
		 * @instance
		 * @protected
		 */
		$create: function(){
			var self = this, position = self.position === 'right' ? 'footable-editing-right' : 'footable-editing-left';
			self.ft.$el.addClass('footable-editing').addClass(position)
				.on('click.ft.editing', '.footable-show', {self: self}, self._onShowClick)
				.on('click.ft.editing', '.footable-hide', {self: self}, self._onHideClick)
				.on('click.ft.editing', '.footable-edit', {self: self}, self._onEditClick)
				.on('click.ft.editing', '.footable-delete', {self: self}, self._onDeleteClick)
				.on('click.ft.editing', '.footable-view', {self: self}, self._onViewClick)
				.on('click.ft.editing', '.footable-add', {self: self}, self._onAddClick);

			self.$cell = $('<td/>').attr('colspan', self.ft.columns.visibleColspan).append(self.$buttonShow());
			if (self.allowAdd){
				self.$cell.append(self.$buttonAdd());
			}
			self.$cell.append(self.$buttonHide());

			if (self.alwaysShow){
				self.ft.$el.addClass('footable-editing-always-show');
			}

			if (!self.allowAdd) self.ft.$el.addClass('footable-editing-no-add');
			if (!self.allowEdit) self.ft.$el.addClass('footable-editing-no-edit');
			if (!self.allowDelete) self.ft.$el.addClass('footable-editing-no-delete');
			if (!self.allowView) self.ft.$el.addClass('footable-editing-no-view');

			var $tfoot = self.ft.$el.children('tfoot');
			if ($tfoot.length == 0){
				$tfoot = $('<tfoot/>');
				self.ft.$el.append($tfoot);
			}
			self.$row = $('<tr/>', { 'class': 'footable-editing' }).append(self.$cell).appendTo($tfoot);
		},
		/**
		 * Creates the show button for the editing component.
		 * @instance
		 * @protected
		 * @returns {(string|HTMLElement|jQuery)}
		 */
		$buttonShow: function(){
			return '<button type="button" class="btn btn-primary footable-show">' + this.showText + '</button>';
		},
		/**
		 * Creates the hide button for the editing component.
		 * @instance
		 * @protected
		 * @returns {(string|HTMLElement|jQuery)}
		 */
		$buttonHide: function(){
			return '<button type="button" class="btn btn-default footable-hide">' + this.hideText + '</button>';
		},
		/**
		 * Creates the add button for the editing component.
		 * @instance
		 * @protected
		 * @returns {(string|HTMLElement|jQuery)}
		 */
		$buttonAdd: function(){
			return '<button type="button" class="btn btn-primary footable-add">' + this.addText + '</button> ';
		},
		/**
		 * Creates the edit button for the editing component.
		 * @instance
		 * @protected
		 * @returns {(string|HTMLElement|jQuery)}
		 */
		$buttonEdit: function(){
			return '<button type="button" class="btn btn-default footable-edit">' + this.editText + '</button> ';
		},
		/**
		 * Creates the delete button for the editing component.
		 * @instance
		 * @protected
		 * @returns {(string|HTMLElement|jQuery)}
		 */
		$buttonDelete: function(){
			return '<button type="button" class="btn btn-default footable-delete">' + this.deleteText + '</button>';
		},
		/**
		 * Creates the view button for the editing component.
		 * @instance
		 * @protected
		 * @returns {(string|HTMLElement|jQuery)}
		 */
		$buttonView: function(){
			return '<button type="button" class="btn btn-default footable-view">' + this.viewText + '</button> ';
		},
		/**
		 * Creates the button group for the row buttons.
		 * @instance
		 * @protected
		 * @returns {(string|HTMLElement|jQuery)}
		 */
		$rowButtons: function(){
			if (F.is.jq(this._$buttons)) return this._$buttons.clone();
			this._$buttons = $('<div class="btn-group btn-group-xs" role="group"></div>');
			if (this.allowView) this._$buttons.append(this.$buttonView());
			if (this.allowEdit) this._$buttons.append(this.$buttonEdit());
			if (this.allowDelete) this._$buttons.append(this.$buttonDelete());
			return this._$buttons;
		},
		/**
		 * Performs the drawing of the component.
		 */
		draw: function(){
			this.$cell.attr('colspan', this.ft.columns.visibleColspan);
		},
		/**
		 * Handles the edit button click event.
		 * @instance
		 * @private
		 * @param {jQuery.Event} e - The jQuery.Event object for the event.
		 * @fires FooTable.Editing#"edit.ft.editing"
		 */
		_onEditClick: function(e){
			e.preventDefault();
			var self = e.data.self, row = $(this).closest('tr').data('__FooTableRow__');
			if (row instanceof F.Row){
				/**
				 * The edit.ft.editing event is raised before its callback is executed.
				 * Calling preventDefault on this event will prevent the callback from being executed.
				 * @event FooTable.Editing#"edit.ft.editing"
				 * @param {jQuery.Event} e - The jQuery.Event object for the event.
				 * @param {FooTable.Table} ft - The instance of the plugin raising the event.
				 * @param {FooTable.Row} row - The row to be edited.
				 */
				self.ft.raise('edit.ft.editing', [row]).then(function(){
					self.callbacks.editRow.call(self.ft, row);
				});
			}
		},
		/**
		 * Handles the delete button click event.
		 * @instance
		 * @private
		 * @param {jQuery.Event} e - The jQuery.Event object for the event.
		 * @fires FooTable.Editing#"delete.ft.editing"
		 */
		_onDeleteClick: function(e){
			e.preventDefault();
			var self = e.data.self, row = $(this).closest('tr').data('__FooTableRow__');
			if (row instanceof F.Row){
				/**
				 * The delete.ft.editing event is raised before its callback is executed.
				 * Calling preventDefault on this event will prevent the callback from being executed.
				 * @event FooTable.Editing#"delete.ft.editing"
				 * @param {jQuery.Event} e - The jQuery.Event object for the event.
				 * @param {FooTable.Table} ft - The instance of the plugin raising the event.
				 * @param {FooTable.Row} row - The row to be deleted.
				 */
				self.ft.raise('delete.ft.editing', [row]).then(function(){
					self.callbacks.deleteRow.call(self.ft, row);
				});
			}
		},
		/**
		 * Handles the view button click event.
		 * @instance
		 * @private
		 * @param {jQuery.Event} e - The jQuery.Event object for the event.
		 * @fires FooTable.Editing#"view.ft.editing"
		 */
		_onViewClick: function(e){
			e.preventDefault();
			var self = e.data.self, row = $(this).closest('tr').data('__FooTableRow__');
			if (row instanceof F.Row){
				/**
				 * The view.ft.editing event is raised before its callback is executed.
				 * Calling preventDefault on this event will prevent the callback from being executed.
				 * @event FooTable.Editing#"view.ft.editing"
				 * @param {jQuery.Event} e - The jQuery.Event object for the event.
				 * @param {FooTable.Table} ft - The instance of the plugin raising the event.
				 * @param {FooTable.Row} row - The row to be viewed.
				 */
				self.ft.raise('view.ft.editing', [row]).then(function(){
					self.callbacks.viewRow.call(self.ft, row);
				});
			}
		},
		/**
		 * Handles the add button click event.
		 * @instance
		 * @private
		 * @param {jQuery.Event} e - The jQuery.Event object for the event.
		 * @fires FooTable.Editing#"add.ft.editing"
		 */
		_onAddClick: function(e){
			e.preventDefault();
			var self = e.data.self;
			/**
			 * The add.ft.editing event is raised before its callback is executed.
			 * Calling preventDefault on this event will prevent the callback from being executed.
			 * @event FooTable.Editing#"add.ft.editing"
			 * @param {jQuery.Event} e - The jQuery.Event object for the event.
			 * @param {FooTable.Table} ft - The instance of the plugin raising the event.
			 */
			self.ft.raise('add.ft.editing').then(function(){
				self.callbacks.addRow.call(self.ft);
			});
		},
		/**
		 * Handles the show button click event.
		 * @instance
		 * @private
		 * @param {jQuery.Event} e - The jQuery.Event object for the event.
		 * @fires FooTable.Editing#"show.ft.editing"
		 */
		_onShowClick: function(e){
			e.preventDefault();
			var self = e.data.self;
			/**
			 * The show.ft.editing event is raised before its callback is executed.
			 * Calling preventDefault on this event will prevent the callback from being executed.
			 * @event FooTable.Editing#"show.ft.editing"
			 * @param {jQuery.Event} e - The jQuery.Event object for the event.
			 * @param {FooTable.Table} ft - The instance of the plugin raising the event.
			 */
			self.ft.raise('show.ft.editing').then(function(){
				self.ft.$el.addClass('footable-editing-show');
				self.column.visible = true;
				self.ft.draw();
			});
		},
		/**
		 * Handles the hide button click event.
		 * @instance
		 * @private
		 * @param {jQuery.Event} e - The jQuery.Event object for the event.
		 * @fires FooTable.Editing#"show.ft.editing"
		 */
		_onHideClick: function(e){
			e.preventDefault();
			var self = e.data.self;
			/**
			 * The hide.ft.editing event is raised before its callback is executed.
			 * Calling preventDefault on this event will prevent the callback from being executed.
			 * @event FooTable.Editing#"hide.ft.editing"
			 * @param {jQuery.Event} e - The jQuery.Event object for the event.
			 * @param {FooTable.Table} ft - The instance of the plugin raising the event.
			 */
			self.ft.raise('hide.ft.editing').then(function(){
				self.ft.$el.removeClass('footable-editing-show');
				self.column.visible = false;
				self.ft.draw();
			});
		}
	});

	F.components.register('editing', F.Editing, 850);

})(jQuery, FooTable);

(function($, F){

	F.EditingColumn = F.Column.extend(/** @lends FooTable.EditingColumn */{
		/**
		 * The Editing column class is used to create the column containing the editing buttons.
		 * @constructs
		 * @extends FooTable.Column
		 * @param {FooTable.Table} instance -  The parent {@link FooTable.Table} this column belongs to.
		 * @param {FooTable.Editing} editing - The parent {@link FooTable.Editing} component this column is used with.
		 * @param {object} definition - An object containing all the properties to set for the column.
		 * @returns {FooTable.EditingColumn}
		 */
		construct: function(instance, editing, definition){
			this._super(instance, definition, 'editing');
			this.editing = editing;
			this.internal = true;
		},
		/**
		 * After the column has been defined this ensures that the $el property is a jQuery object by either creating or updating the current value.
		 * @instance
		 * @protected
		 * @this FooTable.Column
		 */
		$create: function(){
			(this.$el = !this.virtual && F.is.jq(this.$el) ? this.$el : $('<th/>', {'class': 'footable-editing'})).html(this.title);
		},
		/**
		 * This is supplied either the cell value or jQuery object to parse. Any value can be returned from this method and
		 * will be provided to the {@link FooTable.EditingColumn#format} function
		 * to generate the cell contents.
		 * @instance
		 * @protected
		 * @param {(*|jQuery)} valueOrElement - The value or jQuery cell object.
		 * @returns {(jQuery)}
		 */
		parser: function(valueOrElement){
			if (F.is.string(valueOrElement)) valueOrElement = $($.trim(valueOrElement));
			if (F.is.element(valueOrElement)) valueOrElement = $(valueOrElement);
			if (F.is.jq(valueOrElement)){
				var tagName = valueOrElement.prop('tagName').toLowerCase();
				if (tagName == 'td' || tagName == 'th') return valueOrElement.data('value') || valueOrElement.contents();
				return valueOrElement;
			}
			return null;
		},
		/**
		 * Creates a cell to be used in the supplied row for this column.
		 * @param {FooTable.Row} row - The row to create the cell for.
		 * @returns {FooTable.Cell}
		 */
		createCell: function(row){
			var $buttons = this.editing.$rowButtons(), $cell = $('<td/>').append($buttons);
			if (F.is.jq(row.$el)){
				if (this.index === 0){
					$cell.prependTo(row.$el);
				} else {
					$cell.insertAfter(row.$el.children().eq(this.index-1));
				}
			}
			return new F.Cell(this.ft, row, this, $cell || $cell.html());
		}
	});

	F.columns.register('editing', F.EditingColumn);

})(jQuery, FooTable);
(function($, F) {

	/**
	 * An object containing the editing options for the plugin. Added by the {@link FooTable.Editing} component.
	 * @type {object}
	 * @prop {boolean} enabled=false - Whether or not to allow editing on the table.
	 * @prop {boolean} pageToNew=true - Whether or not to automatically page to a new row when it is added to the table.
	 * @prop {string} position="right" - The position of the editing column in the table as well as the alignment of the buttons.
	 * @prop {boolean} alwaysShow=false - Whether or not the editing column and add row button are always visible.
	 * @prop {function} addRow - The callback function to execute when the add row button is clicked.
	 * @prop {function} editRow - The callback function to execute when the edit row button is clicked.
	 * @prop {function} deleteRow - The callback function to execute when the delete row button is clicked.
	 * @prop {function} viewRow - The callback function to execute when the view row button is clicked.
	 * @prop {string} showText - The text that appears in the show button. This can contain HTML.
	 * @prop {string} hideText - The text that appears in the hide button. This can contain HTML.
	 * @prop {string} addText - The text that appears in the add button. This can contain HTML.
	 * @prop {string} editText - The text that appears in the edit button. This can contain HTML.
	 * @prop {string} deleteText - The text that appears in the delete button. This can contain HTML.
	 * @prop {string} viewText - The text that appears in the view button. This can contain HTML.
	 * @prop {boolean} allowAdd - Whether or not to show the Add Row button.
	 * @prop {boolean} allowEdit - Whether or not to show the Edit Row button.
	 * @prop {boolean} allowDelete - Whether or not to show the Delete Row button.
	 * @prop {boolean} allowView - Whether or not to show the View Row button.
	 * @prop {object} column - The options for the editing column. @see {@link FooTable.EditingColumn} for more info.
	 * @prop {string} column.classes="footable-editing" - A space separated string of class names to apply to all cells in the column.
	 * @prop {string} column.name="editing" - The name of the column.
	 * @prop {string} column.title="" - The title displayed in the header row of the table for the column.
	 * @prop {boolean} column.filterable=false - Whether or not the column should be filterable when using the filtering component.
	 * @prop {boolean} column.sortable=false - Whether or not the column should be sortable when using the sorting component.
	 */
	F.Defaults.prototype.editing = {
		enabled: false,
		pageToNew: true,
		position: 'right',
		alwaysShow: false,
		addRow: function(){},
		editRow: function(row){},
		deleteRow: function(row){},
		viewRow: function(row){},
		showText: '<span class="fooicon fooicon-pencil" aria-hidden="true"></span> Edit rows',
		hideText: 'Cancel',
		addText: 'New row',
		editText: '<span class="fooicon fooicon-pencil" aria-hidden="true"></span>',
		deleteText: '<span class="fooicon fooicon-trash" aria-hidden="true"></span>',
		viewText: '<span class="fooicon fooicon-stats" aria-hidden="true"></span>',
		allowAdd: true,
		allowEdit: true,
		allowDelete: true,
		allowView: false,
		column: {
			classes: 'footable-editing',
			name: 'editing',
			title: '',
			filterable: false,
			sortable: false
		}
	};

})(jQuery, FooTable);

(function($, F){

	if (F.is.defined(F.Paging)){
		/**
		 * Holds a shallow clone of the un-paged {@link FooTable.Rows#array} value before paging occurs and superfluous rows are removed. Added by the {@link FooTable.Editing} component.
		 * @instance
		 * @public
		 * @type {Array<FooTable.Row>}
		 */
		F.Paging.prototype.unpaged = [];

		// override the default predraw method with one that sets the unpaged property.
		F.Paging.extend('predraw', function(){
			this.unpaged = this.ft.rows.array.slice(0); // create a shallow clone for later use
			this._super(); // call the original method
		});
	}

})(jQuery, FooTable);
(function($, F){

	/**
	 * Adds the row to the table.
	 * @param {boolean} [redraw=true] - Whether or not to redraw the table, defaults to true but for bulk operations this
	 * can be set to false and then followed by a call to the {@link FooTable.Table#draw} method.
	 * @returns {jQuery.Deferred}
	 */
	F.Row.prototype.add = function(redraw){
		redraw = F.is.boolean(redraw) ? redraw : true;
		var self = this;
		return $.Deferred(function(d){
			var index = self.ft.rows.all.push(self) - 1;
			if (redraw){
				return self.ft.draw().then(function(){
					d.resolve(index);
				});
			} else {
				d.resolve(index);
			}
		});
	};

	/**
	 * Removes the row from the table.
	 * @param {boolean} [redraw=true] - Whether or not to redraw the table, defaults to true but for bulk operations this
	 * can be set to false and then followed by a call to the {@link FooTable.Table#draw} method.
	 * @returns {jQuery.Deferred}
	 */
	F.Row.prototype.delete = function(redraw){
		redraw = F.is.boolean(redraw) ? redraw : true;
		var self = this;
		return $.Deferred(function(d){
			var index = self.ft.rows.all.indexOf(self);
			if (F.is.number(index) && index >= 0 && index < self.ft.rows.all.length){
				self.ft.rows.all.splice(index, 1);
				if (redraw){
					return self.ft.draw().then(function(){
						d.resolve(self);
					});
				}
			}
			d.resolve(self);
		});
	};

	if (F.is.defined(F.Paging)){
		// override the default add method with one that supports paging
		F.Row.extend('add', function(redraw){
			redraw = F.is.boolean(redraw) ? redraw : true;
			var self = this,
				added = this._super(redraw),
				editing = self.ft.use(F.Editing),
				paging;
			if (editing && editing.pageToNew && (paging = self.ft.use(F.Paging)) && redraw){
				return added.then(function(){
					var index = paging.unpaged.indexOf(self); // find this row in the unpaged array (this array will be sorted and filtered)
					var page = Math.ceil((index + 1) / paging.size); // calculate the page the new row is on
					if (paging.current !== page){ // goto the page if we need to
						return paging.goto(page);
					}
				});
			}
			return added;
		});
	}

	if (F.is.defined(F.Sorting)){
		// override the default val method with one that supports sorting and paging
		F.Row.extend('val', function(data, redraw){
			redraw = F.is.boolean(redraw) ? redraw : true;
			var result = this._super(data);
			if (!F.is.hash(data)){
				return result;
			}
			var self = this;
			if (redraw){
				self.ft.draw().then(function(){
					var editing = self.ft.use(F.Editing), paging;
					if (F.is.defined(F.Paging) && editing && editing.pageToNew && (paging = self.ft.use(F.Paging))){
						var index = paging.unpaged.indexOf(self); // find this row in the unpaged array (this array will be sorted and filtered)
						var page = Math.ceil((index + 1) / paging.size); // calculate the page the new row is on
						if (paging.current !== page){ // goto the page if we need to
							return paging.goto(page);
						}
					}
				});
			}
			return result;
		});
	}

})(jQuery, FooTable);
(function(F){

	/**
	 * Adds a row to the underlying {@link FooTable.Rows#all} array.
	 * @param {(object|FooTable.Row)} dataOrRow - A hash containing the row values or an actual {@link FooTable.Row} object.
	 * @param {boolean} [redraw=true] - Whether or not to redraw the table, defaults to true but for bulk operations this
	 * can be set to false and then followed by a call to the {@link FooTable.Table#draw} method.
	 */
	F.Rows.prototype.add = function(dataOrRow, redraw){
		var row = dataOrRow;
		if (F.is.hash(dataOrRow)){
			row = new FooTable.Row(this.ft, this.ft.columns.array, dataOrRow);
		}
		if (row instanceof FooTable.Row){
			row.add(redraw);
		}
	};

	/**
	 * Updates a row in the underlying {@link FooTable.Rows#all} array.
	 * @param {(number|FooTable.Row)} indexOrRow - The index to update or the actual {@link FooTable.Row} object.
	 * @param {object} data - A hash containing the new row values.
	 * @param {boolean} [redraw=true] - Whether or not to redraw the table, defaults to true but for bulk operations this
	 * can be set to false and then followed by a call to the {@link FooTable.Table#draw} method.
	 */
	F.Rows.prototype.update = function(indexOrRow, data, redraw){
		var len = this.ft.rows.all.length, 
			row = indexOrRow;
		if (F.is.number(indexOrRow) && indexOrRow >= 0 && indexOrRow < len){
			row = this.ft.rows.all[indexOrRow];
		}
		if (row instanceof FooTable.Row && F.is.hash(data)){
			row.val(data, redraw);
		}
	};

	/**
	 * Deletes a row from the underlying {@link FooTable.Rows#all} array.
	 * @param {(number|FooTable.Row)} indexOrRow - The index to delete or the actual {@link FooTable.Row} object.
	 * @param {boolean} [redraw=true] - Whether or not to redraw the table, defaults to true but for bulk operations this
	 * can be set to false and then followed by a call to the {@link FooTable.Table#draw} method.
	 */
	F.Rows.prototype.delete = function(indexOrRow, redraw){
		var len = this.ft.rows.all.length, 
			row = indexOrRow;
		if (F.is.number(indexOrRow) && indexOrRow >= 0 && indexOrRow < len){
			row = this.ft.rows.all[indexOrRow];
		}
		if (row instanceof FooTable.Row){
			row.delete(redraw);
		}
	};

})(FooTable);
