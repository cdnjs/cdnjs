/*
* FooTable v3 - FooTable is a jQuery plugin that aims to make HTML tables on smaller devices look awesome.
* @version 3.1.4
* @link http://fooplugins.com
* @copyright Steven Usher & Brad Vincent 2015
* @license Released under the GPLv3 license.
*/
(function($, F){

	F.Pager = F.Class.extend(/** @lends FooTable.Pager */{
		/**
		 * The pager object contains the page number and direction to page to.
		 * @constructs
		 * @extends FooTable.Class
		 * @param {number} total - The total number of pages available.
		 * @param {number} current - The current page number.
		 * @param {number} size - The number of rows per page.
		 * @param {number} page - The page number to goto.
		 * @param {boolean} forward - A boolean indicating the direction of paging, TRUE = forward, FALSE = back.
		 * @returns {FooTable.Pager}
		 */
		construct: function(total, current, size, page, forward){
			/**
			 * The total number of pages available.
			 * @type {number}
			 */
			this.total = total;
			/**
			 * The current page number.
			 * @type {number}
			 */
			this.current = current;
			/**
			 * The number of rows per page.
			 * @type {number}
			 */
			this.size = size;
			/**
			 * The page number to goto.
			 * @type {number}
			 */
			this.page = page;
			/**
			 * A boolean indicating the direction of paging, TRUE = forward, FALSE = back.
			 * @type {boolean}
			 */
			this.forward = forward;
		}
	});

})(jQuery, FooTable);
(function($, F){
	F.Paging = F.Component.extend(/** @lends FooTable.Paging */{
		/**
		 * The paging component adds a pagination control to the table allowing users to navigate table rows via pages.
		 * @constructs
		 * @extends FooTable.Component
		 * @param {FooTable.Table} table - The parent {@link FooTable.Table} object for the component.
		 * @returns {FooTable.Filtering}
		 */
		construct: function(table){
			// call the base constructor
			this._super(table, table.o.paging.enabled);

			/* PROTECTED */
			/**
			 * An object containing the strings used by the paging buttons.
			 * @type {{ first: string, prev: string, next: string, last: string }}
			 */
			this.strings = table.o.paging.strings;

			/* PUBLIC */
			/**
			 * The current page number to display.
			 * @instance
			 * @type {number}
			 */
			this.current = table.o.paging.current;
			/**
			 * The number of rows to display per page.
			 * @instance
			 * @type {number}
			 */
			this.size = table.o.paging.size;
			/**
			 * The maximum number of page links to display at once.
			 * @instance
			 * @type {number}
			 */
			this.limit = table.o.paging.limit;
			/**
			 * The position of the pagination control within the paging rows cell.
			 * @instance
			 * @type {string}
			 */
			this.position = table.o.paging.position;
			/**
			 * The format string used to generate the text displayed under the pagination control.
			 * @instance
			 * @type {string}
			 */
			this.countFormat = table.o.paging.countFormat;
			/**
			 * The total number of pages.
			 * @instance
			 * @type {number}
			 */
			this.total = -1;
			/**
			 * The number of rows in the {@link FooTable.Rows#array} before paging is applied.
			 * @instance
			 * @type {number}
			 */
			this.totalRows = 0;
			/**
			 * A number indicating the previous page displayed.
			 * @instance
			 * @type {number}
			 */
			this.previous = -1;
			/**
			 * The count string generated using the {@link FooTable.Filtering#countFormat} option. This value is only set after the first call to the {@link FooTable.Filtering#predraw} method.
			 * @instance
			 * @type {string}
			 */
			this.formattedCount = null;
			/**
			 * The jQuery row object that contains all the paging specific elements.
			 * @instance
			 * @type {jQuery}
			 */
			this.$row = null;
			/**
			 * The jQuery cell object that contains the pagination control and total count.
			 * @instance
			 * @type {jQuery}
			 */
			this.$cell = null;
			/**
			 * The jQuery object that contains the links for the pagination control.
			 * @instance
			 * @type {jQuery}
			 */
			this.$pagination = null;
			/**
			 * The jQuery object that contains the row count.
			 * @instance
			 * @type {jQuery}
			 */
			this.$count = null;
			/**
			 * Whether or not the pagination row is detached from the table.
			 * @instance
			 * @type {boolean}
			 */
			this.detached = true;

			/* PRIVATE */
			/**
			 * Used to hold the number of page links created.
			 * @instance
			 * @type {number}
			 * @private
			 */
			this._createdLinks = 0;
		},

		/* PROTECTED */
		/**
		 * Checks the supplied data and options for the paging component.
		 * @instance
		 * @protected
		 * @param {object} data - The jQuery data object from the parent table.
		 * @fires FooTable.Paging#"preinit.ft.paging"
		 */
		preinit: function(data){
			var self = this;
			/**
			 * The preinit.ft.paging event is raised before the UI is created and provides the tables jQuery data object for additional options parsing.
			 * Calling preventDefault on this event will disable the component.
			 * @event FooTable.Paging#"preinit.ft.paging"
			 * @param {jQuery.Event} e - The jQuery.Event object for the event.
			 * @param {FooTable.Table} ft - The instance of the plugin raising the event.
			 * @param {object} data - The jQuery data object of the table raising the event.
			 */
			this.ft.raise('preinit.ft.paging', [data]).then(function(){
				if (self.ft.$el.hasClass('footable-paging'))
					self.enabled = true;
				self.enabled = F.is.boolean(data.paging)
					? data.paging
					: self.enabled;

				if (!self.enabled) return;

				self.size = F.is.number(data.pagingSize)
					? data.pagingSize
					: self.size;

				self.current = F.is.number(data.pagingCurrent)
					? data.pagingCurrent
					: self.current;

				self.limit = F.is.number(data.pagingLimit)
					? data.pagingLimit
					: self.limit;

				if (self.ft.$el.hasClass('footable-paging-left'))
					self.position = 'left';
				if (self.ft.$el.hasClass('footable-paging-center'))
					self.position = 'center';
				if (self.ft.$el.hasClass('footable-paging-right'))
					self.position = 'right';

				self.position = F.is.string(data.pagingPosition)
					? data.pagingPosition
					: self.position;

				self.countFormat = F.is.string(data.pagingCountFormat)
					? data.pagingCountFormat
					: self.countFormat;

				self.total = Math.ceil(self.ft.rows.all.length / self.size);
			}, function(){
				self.enabled = false;
			});
		},
		/**
		 * Initializes the paging component for the plugin using the supplied table and options.
		 * @instance
		 * @protected
		 * @fires FooTable.Paging#"init.ft.paging"
		 */
		init: function(){
			/**
			 * The init.ft.paging event is raised before its UI is generated.
			 * Calling preventDefault on this event will disable the component.
			 * @event FooTable.Paging#"init.ft.paging"
			 * @param {jQuery.Event} e - The jQuery.Event object for the event.
			 * @param {FooTable.Table} ft - The instance of the plugin raising the event.
			 */
			var self = this;
			this.ft.raise('init.ft.paging').then(function(){
				self.$create();
			}, function(){
				self.enabled = false;
			});
		},
		/**
		 * Destroys the paging component removing any UI generated from the table.
		 * @instance
		 * @protected
		 * @fires FooTable.Paging#"destroy.ft.paging"
		 */
		destroy: function () {
			/**
			 * The destroy.ft.paging event is raised before its UI is removed.
			 * Calling preventDefault on this event will prevent the component from being destroyed.
			 * @event FooTable.Paging#"destroy.ft.paging"
			 * @param {jQuery.Event} e - The jQuery.Event object for the event.
			 * @param {FooTable.Table} ft - The instance of the plugin raising the event.
			 */
			var self = this;
			this.ft.raise('destroy.ft.paging').then(function(){
				self.ft.$el.removeClass('footable-paging')
					.find('tfoot > tr.footable-paging').remove();
				self.detached = true;
				self._createdLinks = 0;
			});
		},
		/**
		 * Performs the actual paging against the {@link FooTable.Rows#current} array removing all rows that are not on the current visible page.
		 * @instance
		 * @protected
		 */
		predraw: function(){
			this.total = Math.ceil(this.ft.rows.array.length / this.size);
			this.current = this.current > this.total ? this.total : (this.current < 1 ? 1 : this.current);
			this.totalRows = this.ft.rows.array.length;
			if (this.totalRows > this.size){
				this.ft.rows.array = this.ft.rows.array.splice((this.current - 1) * this.size, this.size);
			}
			this.formattedCount = this.format(this.countFormat);
		},
		/**
		 * Updates the paging UI setting the state of the pagination control.
		 * @instance
		 * @protected
		 */
		draw: function(){
			if (this.total <= 1){
				if (!this.detached){
					this.$row.detach();
					this.detached = true;
				}
			} else {
				if (this.detached){
					var $tfoot = this.ft.$el.children('tfoot');
					if ($tfoot.length == 0){
						$tfoot = $('<tfoot/>');
						this.ft.$el.append($tfoot);
					}
					this.$row.appendTo($tfoot);
					this.detached = false;
				}
				this.$cell.attr('colspan', this.ft.columns.visibleColspan);
				this._createLinks();
				this._setVisible(this.current, this.current > this.previous);
				this._setNavigation(true);
				this.$count.text(this.formattedCount);
			}
		},
		/**
		 * Creates the paging UI from the current options setting the various jQuery properties of this component.
		 * @instance
		 * @protected
		 */
		$create: function(){
			this._createdLinks = 0;
			var position = 'footable-paging-center';
			switch (this.position){
				case 'left': position = 'footable-paging-left'; break;
				case 'right': position = 'footable-paging-right'; break;
			}
			this.ft.$el.addClass('footable-paging').addClass(position);
			this.$cell = $('<td/>').attr('colspan', this.ft.columns.visibleColspan);
			var $tfoot = this.ft.$el.children('tfoot');
			if ($tfoot.length == 0){
				$tfoot = $('<tfoot/>');
				this.ft.$el.append($tfoot);
			}
			this.$row = $('<tr/>', { 'class': 'footable-paging' }).append(this.$cell).appendTo($tfoot);
			this.$pagination = $('<ul/>', { 'class': 'pagination' }).on('click.footable', 'a.footable-page-link', { self: this }, this._onPageClicked);
			this.$count = $('<span/>', { 'class': 'label label-default' });
			this.$cell.append(this.$pagination, $('<div/>', {'class': 'divider'}), this.$count);
			this.detached = false;
		},

		/* PUBLIC */
		/**
		 * @summary Uses the supplied format string and replaces the placeholder strings with the current values.
		 * @description This method is used to generate the short description label for the pagination control. i.e. Showing X of Y records. The placeholders for this string are the following:
		 * * {CP} - The current page number.
		 * * {TP} - The total number of pages.
		 * * {PF} - The first row of the current page.
		 * * {PL} - The last row of the current page.
		 * * {TR} - The total rows available.
		 * These placeholders can be supplied in a string like; "Showing {PF} to {PL} of {TR} rows."
		 * @param {string} formatString - The string to be formatted with the paging specific variables.
		 * @returns {string}
		 */
		format: function(formatString){
			var firstRow = (this.size * (this.current - 1)) + 1,
				lastRow = this.size * this.current;
			if (this.ft.rows.array.length == 0){
				firstRow = 0;
				lastRow = 0;
			} else {
				lastRow = lastRow > this.totalRows ? this.totalRows : lastRow;
			}
			return formatString.replace(/\{CP}/g, this.current)
				.replace(/\{TP}/g, this.total)
				.replace(/\{PF}/g, firstRow)
				.replace(/\{PL}/g, lastRow)
				.replace(/\{TR}/g, this.totalRows);
		},
		/**
		 * Pages to the first page.
		 * @instance
		 * @returns {jQuery.Promise}
		 * @fires FooTable.Paging#"before.ft.paging"
		 * @fires FooTable.Paging#"after.ft.paging"
		 */
		first: function(){
			return this._set(1);
		},
		/**
		 * Pages to the previous page.
		 * @instance
		 * @returns {jQuery.Promise}
		 * @fires FooTable.Paging#"before.ft.paging"
		 * @fires FooTable.Paging#"after.ft.paging"
		 */
		prev: function(){
			return this._set(this.current - 1 > 0 ? this.current - 1 : 1);
		},
		/**
		 * Pages to the next page.
		 * @instance
		 * @returns {jQuery.Promise}
		 * @fires FooTable.Paging#"before.ft.paging"
		 * @fires FooTable.Paging#"after.ft.paging"
		 */
		next: function(){
			return this._set(this.current + 1 < this.total ? this.current + 1 : this.total);
		},
		/**
		 * Pages to the last page.
		 * @instance
		 * @returns {jQuery.Promise}
		 * @fires FooTable.Paging#"before.ft.paging"
		 * @fires FooTable.Paging#"after.ft.paging"
		 */
		last: function(){
			return this._set(this.total);
		},
		/**
		 * Pages to the specified page.
		 * @instance
		 * @param {number} page - The page number to go to.
		 * @returns {jQuery.Promise}
		 * @fires FooTable.Paging#"before.ft.paging"
		 * @fires FooTable.Paging#"after.ft.paging"
		 */
		goto: function(page){
			return this._set(page > this.total ? this.total : (page < 1 ? 1 : page));
		},
		/**
		 * Shows the previous X number of pages in the pagination control where X is the value set by the {@link FooTable.Defaults#paging} - limit option value.
		 * @instance
		 */
		prevPages: function(){
			var page = this.$pagination.children('li.footable-page.visible:first').data('page') - 1;
			this._setVisible(page, true);
			this._setNavigation(false);
		},
		/**
		 * Shows the next X number of pages in the pagination control where X is the value set by the {@link FooTable.Defaults#paging} - limit option value.
		 * @instance
		 */
		nextPages: function(){
			var page = this.$pagination.children('li.footable-page.visible:last').data('page') + 1;
			this._setVisible(page, false);
			this._setNavigation(false);
		},
		/**
		 * Gets or sets the current page size
		 * @instance
		 * @param {number} [value] - The new page size to use.
		 * @returns {(number|undefined)}
		 */
		pageSize: function(value){
			if (!F.is.number(value)){
				return this.size;
			}
			this.size = value;
			this.total = Math.ceil(this.ft.rows.all.length / this.size);
			if (F.is.jq(this.$row)) this.$row.remove();
			this.$create();
			this.ft.draw();
		},

		/* PRIVATE */
		/**
		 * Performs the required steps to handle paging including the raising of the {@link FooTable.Paging#"before.ft.paging"} and {@link FooTable.Paging#"after.ft.paging"} events.
		 * @instance
		 * @private
		 * @param {number} page - The page to set.
		 * @returns {jQuery.Promise}
		 * @fires FooTable.Paging#"before.ft.paging"
		 * @fires FooTable.Paging#"after.ft.paging"
		 */
		_set: function(page){
			var self = this,
				pager = new F.Pager(self.total, self.current, self.size, page, page > self.current);
			/**
			 * The before.ft.paging event is raised before a sort is applied and allows listeners to modify the pager or cancel it completely by calling preventDefault on the jQuery.Event object.
			 * @event FooTable.Paging#"before.ft.paging"
			 * @param {jQuery.Event} e - The jQuery.Event object for the event.
			 * @param {FooTable.Table} ft - The instance of the plugin raising the event.
			 * @param {FooTable.Pager} pager - The pager that is about to be applied.
			 */
			return self.ft.raise('before.ft.paging', [pager]).then(function(){
				pager.page = pager.page > pager.total ? pager.total	: pager.page;
				pager.page = pager.page < 1 ? 1 : pager.page;
				if (self.current == page) return $.when();
				self.previous = self.current;
				self.current = pager.page;
				return self.ft.draw().then(function(){
					/**
					 * The after.ft.paging event is raised after a pager has been applied.
					 * @event FooTable.Paging#"after.ft.paging"
					 * @param {jQuery.Event} e - The jQuery.Event object for the event.
					 * @param {FooTable.Table} ft - The instance of the plugin raising the event.
					 * @param {FooTable.Pager} pager - The pager that has been applied.
					 */
					self.ft.raise('after.ft.paging', [pager]);
				});
			});
		},
		/**
		 * Creates the pagination links using the current state of the plugin. If the total number of pages is the same as
		 * the last time this function was executed it does nothing.
		 * @instance
		 * @private
		 */
		_createLinks: function(){
			if (this._createdLinks === this.total) return;
			var self = this,
				multiple = self.total > 1,
				link = function(attr, html, klass){
					return $('<li/>', {
						'class': klass
					}).attr('data-page', attr)
						.append($('<a/>', {
							'class': 'footable-page-link',
							href: '#'
						}).data('page', attr).html(html));
				};
			self.$pagination.empty();
			if (multiple) {
				self.$pagination.append(link('first', self.strings.first, 'footable-page-nav'));
				self.$pagination.append(link('prev', self.strings.prev, 'footable-page-nav'));
				if (self.limit > 0 && self.limit < self.total){
					self.$pagination.append(link('prev-limit', self.strings.prevPages, 'footable-page-nav'));
				}
			}
			for (var i = 0, $li; i < self.total; i++){
				$li = link(i + 1, i + 1, 'footable-page');
				self.$pagination.append($li);
			}
			if (multiple){
				if (self.limit > 0 && self.limit < self.total){
					self.$pagination.append(link('next-limit', self.strings.nextPages, 'footable-page-nav'));
				}
				self.$pagination.append(link('next', self.strings.next, 'footable-page-nav'));
				self.$pagination.append(link('last', self.strings.last, 'footable-page-nav'));
			}
			self._createdLinks = self.total;
		},
		/**
		 * Sets the state for the navigation links of the pagination control and optionally sets the active class state on the current page link.
		 * @instance
		 * @private
		 * @param {boolean} active - Whether or not to set the active class state on the individual page links.
		 */
		_setNavigation: function(active){
			if (this.current == 1) {
				this.$pagination.children('li[data-page="first"],li[data-page="prev"]').addClass('disabled');
			} else {
				this.$pagination.children('li[data-page="first"],li[data-page="prev"]').removeClass('disabled');
			}

			if (this.current == this.total) {
				this.$pagination.children('li[data-page="next"],li[data-page="last"]').addClass('disabled');
			} else {
				this.$pagination.children('li[data-page="next"],li[data-page="last"]').removeClass('disabled');
			}

			if ((this.$pagination.children('li.footable-page.visible:first').data('page') || 1) == 1) {
				this.$pagination.children('li[data-page="prev-limit"]').addClass('disabled');
			} else {
				this.$pagination.children('li[data-page="prev-limit"]').removeClass('disabled');
			}

			if ((this.$pagination.children('li.footable-page.visible:last').data('page') || this.limit) == this.total) {
				this.$pagination.children('li[data-page="next-limit"]').addClass('disabled');
			} else {
				this.$pagination.children('li[data-page="next-limit"]').removeClass('disabled');
			}

			if (this.limit > 0 && this.total < this.limit){
				this.$pagination.children('li[data-page="prev-limit"],li[data-page="next-limit"]').css('display', 'none');
			} else {
				this.$pagination.children('li[data-page="prev-limit"],li[data-page="next-limit"]').css('display', '');
			}

			if (active){
				this.$pagination.children('li.footable-page').removeClass('active').filter('li[data-page="' + this.current + '"]').addClass('active');
			}
		},
		/**
		 * Sets the visible page using the supplied parameters.
		 * @instance
		 * @private
		 * @param {number} page - The page to make visible.
		 * @param {boolean} right - If set to true the supplied page will be the right most visible pagination link.
		 */
		_setVisible: function(page, right){
			if (this.limit > 0 && this.total > this.limit){
				if (!this.$pagination.children('li.footable-page[data-page="'+page+'"]').hasClass('visible')){
					var start = 0, end = 0;
					if (right == true){
						end = page > this.total ? this.total : page;
						start = end - this.limit;
					} else {
						start = page < 1 ? 0 : page - 1;
						end = start + this.limit;
					}
					if (start < 0){
						start = 0;
						end = this.limit > this.total ? this.total : this.limit;
					}
					if (end > this.total){
						end = this.total;
						start = this.total - this.limit < 0 ? 0 : this.total - this.limit;
					}
					this.$pagination.children('li.footable-page').removeClass('visible').slice(start, end).addClass('visible');
				}
			} else {
				this.$pagination.children('li.footable-page').removeClass('visible').slice(0, this.total).addClass('visible');
			}
		},
		/**
		 * Handles the click event for all links in the pagination control.
		 * @instance
		 * @private
		 * @param {jQuery.Event} e - The event object for the event.
		 */
		_onPageClicked: function(e){
			e.preventDefault();
			if ($(e.target).closest('li').is('.active,.disabled')) return;

			var self = e.data.self, page = $(this).data('page');
			switch(page){
				case 'first': self.first();
					return;
				case 'prev': self.prev();
					return;
				case 'next': self.next();
					return;
				case 'last': self.last();
					return;
				case 'prev-limit': self.prevPages();
					return;
				case 'next-limit': self.nextPages();
					return;
				default: self._set(page);
					return;
			}
		}
	});

	F.components.register('paging', F.Paging, 400);

})(jQuery, FooTable);
(function(F){
	/**
	 * An object containing the paging options for the plugin. Added by the {@link FooTable.Paging} component.
	 * @type {object}
	 * @prop {boolean} enabled=false - Whether or not to allow paging on the table.
	 * @prop {string} countFormat="{CP} of {TP}" - A string format used to generate the page count text.
	 * @prop {number} current=1 - The page number to display.
	 * @prop {number} limit=5 - The maximum number of page links to display at once.
	 * @prop {string} position="center" - The string used to specify the alignment of the pagination control.
	 * @prop {number} size=10 - The number of rows displayed per page.
	 * @prop {object} strings - An object containing the strings used by the paging buttons.
	 * @prop {string} strings.first="&laquo;" - The string used for the 'first' button.
	 * @prop {string} strings.prev="&lsaquo;" - The string used for the 'previous' button.
	 * @prop {string} strings.next="&rsaquo;" - The string used for the 'next' button.
	 * @prop {string} strings.last="&raquo;" - The string used for the 'last' button.
	 * @prop {string} strings.prevPages="..." - The string used for the 'previous X pages' button.
	 * @prop {string} strings.nextPages="..." - The string used for the 'next X pages' button.
	 */
	F.Defaults.prototype.paging = {
		enabled: false,
		countFormat: '{CP} of {TP}',
		current: 1,
		limit: 5,
		position: 'center',
		size: 10,
		strings: {
			first: '&laquo;',
			prev: '&lsaquo;',
			next: '&rsaquo;',
			last: '&raquo;',
			prevPages: '...',
			nextPages: '...'
		}
	};
})(FooTable);
(function(F){
	/**
	 * Navigates to the specified page number. Added by the {@link FooTable.Paging} component.
	 * @instance
	 * @param {number} num - The page number to go to.
	 * @returns {jQuery.Promise}
	 * @fires FooTable.Paging#paging_changing
	 * @fires FooTable.Paging#paging_changed
	 * @see FooTable.Paging#goto
	 */
	F.Table.prototype.gotoPage = function(num){
		return this.use(F.Paging).goto(num);
	};

	/**
	 * Navigates to the next page. Added by the {@link FooTable.Paging} component.
	 * @instance
	 * @returns {jQuery.Promise}
	 * @fires FooTable.Paging#paging_changing
	 * @fires FooTable.Paging#paging_changed
	 * @see FooTable.Paging#next
	 */
	F.Table.prototype.nextPage = function(){
		return this.use(F.Paging).next();
	};

	/**
	 * Navigates to the previous page. Added by the {@link FooTable.Paging} component.
	 * @instance
	 * @returns {jQuery.Promise}
	 * @fires FooTable.Paging#paging_changing
	 * @fires FooTable.Paging#paging_changed
	 * @see FooTable.Paging#prev
	 */
	F.Table.prototype.prevPage = function(){
		return this.use(F.Paging).prev();
	};

	/**
	 * Navigates to the first page. Added by the {@link FooTable.Paging} component.
	 * @instance
	 * @returns {jQuery.Promise}
	 * @fires FooTable.Paging#paging_changing
	 * @fires FooTable.Paging#paging_changed
	 * @see FooTable.Paging#first
	 */
	F.Table.prototype.firstPage = function(){
		return this.use(F.Paging).first();
	};

	/**
	 * Navigates to the last page. Added by the {@link FooTable.Paging} component.
	 * @instance
	 * @returns {jQuery.Promise}
	 * @fires FooTable.Paging#paging_changing
	 * @fires FooTable.Paging#paging_changed
	 * @see FooTable.Paging#last
	 */
	F.Table.prototype.lastPage = function(){
		return this.use(F.Paging).last();
	};

	/**
	 * Shows the next X number of pages in the pagination control where X is the value set by the {@link FooTable.Defaults#paging} - limit.size option value. Added by the {@link FooTable.Paging} component.
	 * @instance
	 * @see FooTable.Paging#nextPages
	 */
	F.Table.prototype.nextPages = function(){
		return this.use(F.Paging).nextPages();
	};

	/**
	 * Shows the previous X number of pages in the pagination control where X is the value set by the {@link FooTable.Defaults#paging} - limit.size option value. Added by the {@link FooTable.Paging} component.
	 * @instance
	 * @see FooTable.Paging#prevPages
	 */
	F.Table.prototype.prevPages = function(){
		return this.use(F.Paging).prevPages();
	};

	/**
	 * Gets or sets the current page size
	 * @instance
	 * @param {number} [value] - The new page size to use.
	 * @returns {(number|undefined)}
	 * @see FooTable.Paging#pageSize
	 */
	F.Table.prototype.pageSize = function(value){
		return this.use(F.Paging).pageSize(value);
	};
})(FooTable);