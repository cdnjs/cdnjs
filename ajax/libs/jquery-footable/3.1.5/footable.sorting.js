/*
* FooTable v3 - FooTable is a jQuery plugin that aims to make HTML tables on smaller devices look awesome.
* @version 3.1.5
* @link http://fooplugins.com
* @copyright Steven Usher & Brad Vincent 2015
* @license Released under the GPLv3 license.
*/
(function($, F){

	F.Sorter = F.Class.extend(/** @lends FooTable.Sorter */{
		/**
		 * The sorter object contains the column and direction to sort by.
		 * @constructs
		 * @extends FooTable.Class
		 * @param {FooTable.Column} column - The column to sort.
		 * @param {string} direction - The direction to sort by.
		 * @returns {FooTable.Sorter}
		 */
		construct: function(column, direction){
			/**
			 * The column to sort.
			 * @type {FooTable.Column}
			 */
			this.column = column;
			/**
			 * The direction to sort by.
			 * @type {string}
			 */
			this.direction = direction;
		}
	});

})(jQuery, FooTable);
(function ($, F) {
	F.Sorting = F.Component.extend(/** @lends FooTable.Sorting */{
		/**
		 * The sorting component adds a small sort button to specified column headers allowing users to sort those columns in the table.
		 * @constructs
		 * @extends FooTable.Component
		 * @param {FooTable.Table} table - The parent {@link FooTable.Table} object for the component.
		 * @returns {FooTable.Sorting}
		 */
		construct: function (table) {
			// call the constructor of the base class
			this._super(table, table.o.sorting.enabled);

			/* PROTECTED */
			/**
			 * This provides a shortcut to the {@link FooTable.Table#options}.[sorting]{@link FooTable.Defaults#sorting} object.
			 * @instance
			 * @protected
			 * @type {object}
			 */
			this.o = table.o.sorting;
			/**
			 * The current sorted column.
			 * @instance
			 * @type {FooTable.Column}
			 */
			this.column = null;
			/**
			 * Whether or not to allow sorting to occur, should be set using the {@link FooTable.Sorting#toggleAllowed} method.
			 * @instance
			 * @type {boolean}
			 */
			this.allowed = true;
			/**
			 * The initial sort state of the table, this value is used for determining if the sorting has occurred or to reset the state to default.
			 * @instance
			 * @type {{isset: boolean, rows: Array.<FooTable.Row>, column: string, direction: ?string}}
			 */
			this.initial = null;
		},

		/* PROTECTED */
		/**
		 * Checks the supplied data and options for the sorting component.
		 * @instance
		 * @protected
		 * @param {object} data - The jQuery data object from the parent table.
		 * @fires FooTable.Sorting#"preinit.ft.sorting"
		 * @this FooTable.Sorting
		 */
		preinit: function(data){
			var self = this;
			/**
			 * The preinit.ft.sorting event is raised before the UI is created and provides the tables jQuery data object for additional options parsing.
			 * Calling preventDefault on this event will disable the component.
			 * @event FooTable.Sorting#"preinit.ft.sorting"
			 * @param {jQuery.Event} e - The jQuery.Event object for the event.
			 * @param {FooTable.Table} ft - The instance of the plugin raising the event.
			 * @param {object} data - The jQuery data object of the table raising the event.
			 */
			this.ft.raise('preinit.ft.sorting', [data]).then(function(){
				if (self.ft.$el.hasClass('footable-sorting'))
					self.enabled = true;
				self.enabled = F.is.boolean(data.sorting)
					? data.sorting
					: self.enabled;
				if (!self.enabled) return;
				self.column = F.arr.first(self.ft.columns.array, function(col){ return col.sorted; });
			}, function(){
				self.enabled = false;
			});
		},
		/**
		 * Initializes the sorting component for the plugin using the supplied table and options.
		 * @instance
		 * @protected
		 * @fires FooTable.Sorting#"init.ft.sorting"
		 * @this FooTable.Sorting
		 */
		init: function () {
			/**
			 * The init.ft.sorting event is raised before its UI is generated.
			 * Calling preventDefault on this event will disable the component.
			 * @event FooTable.Sorting#"init.ft.sorting"
			 * @param {jQuery.Event} e - The jQuery.Event object for the event.
			 * @param {FooTable.Table} ft - The instance of the plugin raising the event.
			 */
			var self = this;
			this.ft.raise('init.ft.sorting').then(function(){
				if (!self.initial){
					var isset = !!self.column;
					self.initial = {
						isset: isset,
						// grab a shallow copy of the rows array prior to sorting - allows us to reset without an initial sort
						rows: self.ft.rows.all.slice(0),
						// if there is a sorted column store its name and direction
						column: isset ? self.column.name : null,
						direction: isset ? self.column.direction : null
					}
				}
				F.arr.each(self.ft.columns.array, function(col){
					if (col.sortable){
						col.$el.addClass('footable-sortable').append($('<span/>', {'class': 'fooicon fooicon-sort'}));
					}
				});
				self.ft.$el.on('click.footable', '.footable-sortable', { self: self }, self._onSortClicked);
			}, function(){
				self.enabled = false;
			});
		},
		/**
		 * Destroys the sorting component removing any UI generated from the table.
		 * @instance
		 * @protected
		 * @fires FooTable.Sorting#"destroy.ft.sorting"
		 */
		destroy: function () {
			/**
			 * The destroy.ft.sorting event is raised before its UI is removed.
			 * Calling preventDefault on this event will prevent the component from being destroyed.
			 * @event FooTable.Sorting#"destroy.ft.sorting"
			 * @param {jQuery.Event} e - The jQuery.Event object for the event.
			 * @param {FooTable.Table} ft - The instance of the plugin raising the event.
			 */
			var self = this;
			this.ft.raise('destroy.ft.paging').then(function(){
				self.ft.$el.off('click.footable', '.footable-sortable', self._onSortClicked);
				self.ft.$el.children('thead').children('tr.footable-header')
					.children('.footable-sortable').removeClass('footable-sortable footable-asc footable-desc')
					.find('span.fooicon').remove();
			});
		},
		/**
		 * Performs the actual sorting against the {@link FooTable.Rows#current} array.
		 * @instance
		 * @protected
		 */
		predraw: function () {
			if (!this.column) return;
			var self = this, col = self.column;
			self.ft.rows.array.sort(function (a, b) {
				return col.direction == 'DESC'
						? col.sorter(b.cells[col.index].sortValue, a.cells[col.index].sortValue)
						: col.sorter(a.cells[col.index].sortValue, b.cells[col.index].sortValue);
			});
		},
		/**
		 * Updates the sorting UI setting the state of the sort buttons.
		 * @instance
		 * @protected
		 */
		draw: function () {
			if (!this.column) return;
			var self = this,
				$sortable = self.ft.$el.find('thead > tr > .footable-sortable'),
				$active = self.column.$el;

			$sortable.removeClass('footable-asc footable-desc').children('.fooicon').removeClass('fooicon-sort fooicon-sort-asc fooicon-sort-desc');
			$sortable.not($active).children('.fooicon').addClass('fooicon-sort');
			$active.addClass(self.column.direction == 'DESC' ? 'footable-desc' : 'footable-asc')
				.children('.fooicon').addClass(self.column.direction == 'DESC' ? 'fooicon-sort-desc' : 'fooicon-sort-asc');
		},

		/* PUBLIC */
		/**
		 * Sets the sorting options and calls the {@link FooTable.Table#draw} method to perform the actual sorting.
		 * @instance
		 * @param {(string|number|FooTable.Column)} column - The column name, index or the actual {@link FooTable.Column} object to sort by.
		 * @param {string} [direction="ASC"] - The direction to sort by, either ASC or DESC.
		 * @returns {jQuery.Promise}
		 * @fires FooTable.Sorting#"before.ft.sorting"
		 * @fires FooTable.Sorting#"after.ft.sorting"
		 */
		sort: function(column, direction){
			return this._sort(column, direction);
		},
		/**
		 * Toggles whether or not sorting is currently allowed.
		 * @param {boolean} [state] - You can optionally specify the state you want it to be, if not supplied the current value is flipped.
		 */
		toggleAllowed: function(state){
			state = F.is.boolean(state) ? state : !this.allowed;
			this.allowed = state;
			this.ft.$el.toggleClass('footable-sorting-disabled', !this.allowed);
		},
		/**
		 * Checks whether any sorting has occurred for the table.
		 * @returns {boolean}
		 */
		hasChanged: function(){
			return !(!this.initial || !this.column ||
				(this.column.name === this.initial.column &&
					(this.column.direction === this.initial.direction || (this.initial.direction === null && this.column.direction === 'ASC')))
			);
		},
		/**
		 * Resets the table sorting to the initial state recorded in the components init method.
		 */
		reset: function(){
			if (!!this.initial){
				if (this.initial.isset){
					// if the initial value specified a column, sort by it
					this.sort(this.initial.column, this.initial.direction);
				} else {
					// if there was no initial column then we need to reset the rows to there original order
					if (!!this.column){
						// if there is a currently sorted column remove the asc/desc classes and set it to null.
						this.column.$el.removeClass('footable-asc footable-desc');
						this.column = null;
					}
					// replace the current all rows array with the one stored in the initial value
					this.ft.rows.all = this.initial.rows;
					// force the table to redraw itself using the updated rows array
					this.ft.draw();
				}
			}
		},

		/* PRIVATE */
		/**
		 * Performs the required steps to handle sorting including the raising of the {@link FooTable.Sorting#"before.ft.sorting"} and {@link FooTable.Sorting#"after.ft.sorting"} events.
		 * @instance
		 * @private
		 * @param {(string|number|FooTable.Column)} column - The column name, index or the actual {@link FooTable.Column} object to sort by.
		 * @param {string} [direction="ASC"] - The direction to sort by, either ASC or DESC.
		 * @returns {jQuery.Promise}
		 * @fires FooTable.Sorting#"before.ft.sorting"
		 * @fires FooTable.Sorting#"after.ft.sorting"
		 */
		_sort: function(column, direction){
			if (!this.allowed) return $.Deferred().reject('sorting disabled');
			var self = this;
			var sorter = new F.Sorter(self.ft.columns.get(column), F.Sorting.dir(direction));
			/**
			 * The before.ft.sorting event is raised before a sort is applied and allows listeners to modify the sorter or cancel it completely by calling preventDefault on the jQuery.Event object.
			 * @event FooTable.Sorting#"before.ft.sorting"
			 * @param {jQuery.Event} e - The jQuery.Event object for the event.
			 * @param {FooTable.Table} ft - The instance of the plugin raising the event.
			 * @param {FooTable.Sorter} sorter - The sorter that is about to be applied.
			 */
			return self.ft.raise('before.ft.sorting', [sorter]).then(function(){
				F.arr.each(self.ft.columns.array, function(col){
					if (col != self.column) col.direction = null;
				});
				self.column = self.ft.columns.get(sorter.column);
				if (self.column) self.column.direction = F.Sorting.dir(sorter.direction);
				return self.ft.draw().then(function(){
					/**
					 * The after.ft.sorting event is raised after a sorter has been applied.
					 * @event FooTable.Sorting#"after.ft.sorting"
					 * @param {jQuery.Event} e - The jQuery.Event object for the event.
					 * @param {FooTable.Table} ft - The instance of the plugin raising the event.
					 * @param {FooTable.Sorter} sorter - The sorter that has been applied.
					 */
					self.ft.raise('after.ft.sorting', [sorter]);
				});
			});
		},
		/**
		 * Handles the sort button clicked event.
		 * @instance
		 * @private
		 * @param {jQuery.Event} e - The event object for the event.
		 */
		_onSortClicked: function (e) {
			var self = e.data.self, $header = $(this).closest('th,td'),
				direction = $header.is('.footable-asc, .footable-desc')
					? ($header.hasClass('footable-desc') ? 'ASC' : 'DESC')
					: 'ASC';
			self._sort($header.index(), direction);
		}
	});

	/**
	 * Checks the supplied string is a valid direction and if not returns ASC as default.
	 * @static
	 * @protected
	 * @param {string} str - The string to check.
	 */
	F.Sorting.dir = function(str){
		return F.is.string(str) && (str == 'ASC' || str == 'DESC') ? str : 'ASC';
	};

	F.components.register('sorting', F.Sorting, 600);

})(jQuery, FooTable);
(function(F){

	/**
	 * The value used by the sorting component during sort operations. Can be set using the data-sort-value attribute on the cell itself.
	 * If this is not supplied it is set to the result of the toString method called on the value for the cell. Added by the {@link FooTable.Sorting} component.
	 * @type {string}
	 * @default null
	 */
	F.Cell.prototype.sortValue = null;

	// this is used to define the sorting specific properties on cell creation
	F.Cell.prototype.__sorting_define__ = function(valueOrElement){
		this.sortValue = this.column.sortValue.call(this.column, valueOrElement);
	};

	// this is used to update the sortValue property whenever the cell value is changed
	F.Cell.prototype.__sorting_val__ = function(value){
		if (F.is.defined(value)){
			// set only
			this.sortValue = this.column.sortValue.call(this.column, value);
		}
	};

	// overrides the public define method and replaces it with our own
	F.Cell.extend('define', function(valueOrElement){
		this._super(valueOrElement);
		this.__sorting_define__(valueOrElement);
	});
	// overrides the public val method and replaces it with our own
	F.Cell.extend('val', function(value, redraw, redrawSelf){
		var val = this._super(value, redraw, redrawSelf);
		this.__sorting_val__(value);
		return val;
	});
})(FooTable);
(function($, F){
	/**
	 * The direction to sort if the {@link FooTable.Column#sorted} property is set to true. Can be "ASC", "DESC" or NULL. Added by the {@link FooTable.Sorting} component.
	 * @type {string}
	 * @default null
	 */
	F.Column.prototype.direction = null;
	/**
	 * Whether or not the column can be sorted. Added by the {@link FooTable.Sorting} component.
	 * @type {boolean}
	 * @default true
	 */
	F.Column.prototype.sortable = true;
	/**
	 * Whether or not the column is sorted. Added by the {@link FooTable.Sorting} component.
	 * @type {boolean}
	 * @default false
	 */
	F.Column.prototype.sorted = false;

	/**
	 * This is supplied two values from the column for a comparison to be made and the result returned. Added by the {@link FooTable.Sorting} component.
	 * @param {*} a - The first value to be compared.
	 * @param {*} b - The second value to compare to the first.
	 * @returns {number}
	 * @example <caption>This example shows using pseudo code what a sort function would look like.</caption>
	 * "sorter": function(a, b){
	 * 	if (a is less than b by some ordering criterion) {
	 * 		return -1;
	 * 	}
	 * 	if (a is greater than b by the ordering criterion) {
	 * 		return 1;
	 * 	}
	 * 	// a must be equal to b
	 * 	return 0;
	 * }
	 */
	F.Column.prototype.sorter = function(a, b){
		if (typeof a === 'string') a = a.toLowerCase();
		if (typeof b === 'string') b = b.toLowerCase();
		if (a === b) return 0;
		if (a < b) return -1;
		return 1;
	};

	/**
	 * This is supplied either the cell value or jQuery object to parse. A value must be returned from this method and will be used during sorting operations.
	 * @param {(*|jQuery)} valueOrElement - The value or jQuery cell object.
	 * @returns {*}
	 * @this FooTable.Column
	 */
	F.Column.prototype.sortValue = function(valueOrElement){
		// if we have an element or a jQuery object use jQuery to get the value
		if (F.is.element(valueOrElement) || F.is.jq(valueOrElement)){
			var data = $(valueOrElement).data('sortValue');
			return F.is.defined(data) ? data : this.parser(valueOrElement);
		}
		// if options are supplied with the value
		if (F.is.hash(valueOrElement) && F.is.hash(valueOrElement.options)){
			if (F.is.string(valueOrElement.options.sortValue)) return valueOrElement.options.sortValue;
			if (F.is.defined(valueOrElement.value)) valueOrElement = valueOrElement.value;
		}
		if (F.is.defined(valueOrElement) && valueOrElement != null) return valueOrElement;
		return null;
	};

	// this is used to define the sorting specific properties on column creation
	F.Column.prototype.__sorting_define__ = function(definition){
		this.sorter = F.checkFnValue(this, definition.sorter, this.sorter);
		this.direction = F.is.type(definition.direction, 'string') ? F.Sorting.dir(definition.direction) : null;
		this.sortable = F.is.boolean(definition.sortable) ? definition.sortable : true;
		this.sorted = F.is.boolean(definition.sorted) ? definition.sorted : false;
		this.sortValue = F.checkFnValue(this, definition.sortValue, this.sortValue);
	};

	// overrides the public define method and replaces it with our own
	F.Column.extend('define', function(definition){
		this._super(definition);
		this.__sorting_define__(definition);
	});

})(jQuery, FooTable);
(function(F){
	/**
	 * An object containing the sorting options for the plugin. Added by the {@link FooTable.Sorting} component.
	 * @type {object}
	 * @prop {boolean} enabled=false - Whether or not to allow sorting on the table.
	 */
	F.Defaults.prototype.sorting = {
		enabled: false
	};
})(FooTable);
(function($, F){

	F.HTMLColumn.extend('__sorting_define__', function(definition){
		this._super(definition);
		this.sortUse = F.is.string(definition.sortUse) && $.inArray(definition.sortUse, ['html','text']) !== -1 ? definition.sortUse : 'html';
	});

	/**
	 * This is supplied either the cell value or jQuery object to parse. A value must be returned from this method and will be used during sorting operations.
	 * @param {(*|jQuery)} valueOrElement - The value or jQuery cell object.
	 * @returns {*}
	 * @this FooTable.HTMLColumn
	 */
	F.HTMLColumn.prototype.sortValue = function(valueOrElement){
		// if we have an element or a jQuery object use jQuery to get the data value or pass it off to the parser
		if (F.is.element(valueOrElement) || F.is.jq(valueOrElement)){
			var data = $(valueOrElement).data('sortValue');
			return F.is.defined(data) ? data : this.parser(valueOrElement);
		}
		// if options are supplied with the value
		if (F.is.hash(valueOrElement) && F.is.hash(valueOrElement.options)){
			if (F.is.string(valueOrElement.options.sortValue)) return valueOrElement.options.sortValue;
			if (F.is.defined(valueOrElement.value)) valueOrElement = valueOrElement.value;
		}
		if (F.is.defined(valueOrElement) && valueOrElement != null) return valueOrElement;
		return null;
	};

})(jQuery, FooTable);
(function($, F){

	/**
	 * This is supplied either the cell value or jQuery object to parse. A value must be returned from this method and will be used during sorting operations.
	 * @param {(*|jQuery)} valueOrElement - The value or jQuery cell object.
	 * @returns {*}
	 */
	F.NumberColumn.prototype.sortValue = function(valueOrElement){
		// if we have an element or a jQuery object use jQuery to get the data value or pass it off to the parser
		if (F.is.element(valueOrElement) || F.is.jq(valueOrElement)){
			var data = $(valueOrElement).data('sortValue');
			return F.is.number(data) ? data : this.parser(valueOrElement);
		}
		// if options are supplied with the value
		if (F.is.hash(valueOrElement) && F.is.hash(valueOrElement.options)){
			if (F.is.string(valueOrElement.options.sortValue)) return this.parser(valueOrElement);
			if (F.is.number(valueOrElement.options.sortValue)) return valueOrElement.options.sortValue;
			if (F.is.number(valueOrElement.value)) return valueOrElement.value;
		}
		if (F.is.string(valueOrElement)) return this.parser(valueOrElement);
		if (F.is.number(valueOrElement)) return valueOrElement;
		return null;
	};

})(jQuery, FooTable);
(function(F){
	/**
	 * Sort the table using the specified column and direction. Added by the {@link FooTable.Sorting} component.
	 * @instance
	 * @param {(string|number|FooTable.Column)} column - The column name, index or the actual {@link FooTable.Column} object to sort by.
	 * @param {string} [direction="ASC"] - The direction to sort by, either ASC or DESC.
	 * @returns {jQuery.Promise}
	 * @fires FooTable.Sorting#"change.ft.sorting"
	 * @fires FooTable.Sorting#"changed.ft.sorting"
	 * @see FooTable.Sorting#sort
	 */
	F.Table.prototype.sort = function(column, direction){
		return this.use(F.Sorting).sort(column, direction);
	};
})(FooTable);