/*! backbone.paginator - v0.1.5 - 3/30/2012
* http://github.com/addyosmani/backbone.paginator
* Copyright (c) 2012 Addy Osmani; Licensed MIT */

Backbone.Paginator = (function (Backbone, _, $) {
	"use strict";

	var Paginator = {};
	Paginator.version = "0.15";

	// @name: clientPager
	//
	// @tagline: Paginator for client-side data
	//
	// @description:
	// This paginator is responsible for providing pagination
	// and sort capabilities for a single payload of data
	// we wish to paginate by the UI for easier browsering.
	//
	Paginator.clientPager = Backbone.Collection.extend({

		sync: function (method, model, options) {

			var queryMap = {};
				queryMap[this.perPageAttribute] =  this.perPage;
				queryMap[this.skipAttribute] = this.page * this.perPage;
				queryMap[this.orderAttribute] =  this.sortField;
				queryMap[this.customAttribute1] =  this.customParam1;
				queryMap[this.formatAttribute] =  this.format;
				queryMap[this.customAttribute2] = this.customParam2;
				queryMap[this.queryAttribute] =  this.query; 

			var params = _.extend({
				type: 'GET',
				dataType: 'jsonp',
				jsonpCallback: 'callback',
				data: decodeURIComponent($.param(queryMap)),
				url: this.url,
				processData: false
			}, options);

			return $.ajax(params);
		},

		nextPage: function () {
			this.page = ++this.page;
			this.pager();
		},

		previousPage: function () {
			this.page = --this.page || 1;
			this.pager();
		},

		goTo: function (page) {
			if(page !== undefined){
				this.page = parseInt(page, 10);
				this.pager();
			}
		},

		howManyPer: function (perPage) {
			if(perPage !== undefined){
				this.displayPerPage = parseInt(perPage, 10);
				this.pager();
			}
		},


		// where column is the key to sort on
		setSort: function (column, direction) {
			if(column !==undefined && direction !==undefined){
				this.pager(column, direction);
			}
		},

		pager: function (sort, direction) {
			var self = this,
				disp = this.displayPerPage,
				start = (self.page - 1) * disp,
				stop = start + disp;

			if (self.origModels === undefined) {
				self.origModels = self.models;
			}

			self.models = self.origModels;

			if (sort) {
				self.models = self._sort(self.models, sort, direction);
			}
			self.reset(self.models.slice(start, stop));
		},

		_sort: function (models, sort, direction) {
			models = models.sort(function (a, b) {
				var ac = a.get(sort),
					bc = b.get(sort);

				if (direction === 'desc') {
					if (ac > bc) {
						return -1;
					}

					if (ac < bc) {
						return 1;
					}
				} else {
					if (ac < bc) {
						return -1;
					}

					if (ac > bc) {
						return 1;
					}
				}

				return 0;
			});

			return models;
		},

		info: function () {
			var self = this,
				info = {},
				totalRecords = (self.origModels) ? self.origModels.length : self.length,
				totalPages = Math.ceil(totalRecords / self.displayPerPage);

			info = {
				totalRecords: totalRecords,
				page: self.page,
				perPage: this.displayPerPage,
				totalPages: totalPages,
				lastPage: totalPages,
				lastPagem1: totalPages - 1,
				previous: false,
				next: false,
				page_set: [],
				startRecord: (self.page - 1) * this.displayPerPage + 1,
				endRecord: Math.min(totalRecords, self.page * this.displayPerPage)
			};

			if (self.page > 1) {
				info.prev = self.page - 1;
			}

			if (self.page < info.totalPages) {
				info.next = self.page + 1;
			}

			info.pageSet = self.setPagination(info);

			self.information = info;			
			return info;
		},


		setPagination: function (info) {
			var pages = [], i = 0, l = 0;


			// How many adjacent pages should be shown on each side?
			var ADJACENT = 3,
				ADJACENTx2 = ADJACENT * 2,
				LASTPAGE = Math.ceil(info.totalRecords / info.perPage),
				LPM1 = -1;

			if (LASTPAGE > 1) {
				// not enough pages to bother breaking it up
				if (LASTPAGE < (7 + ADJACENTx2)) {
					for (i = 1, l = LASTPAGE; i <= l; i++) {
						pages.push(i);
					}
				}
				// enough pages to hide some
				else if (LASTPAGE > (5 + ADJACENTx2)) {

					//close to beginning; only hide later pages
					if (info.page < (1 + ADJACENTx2)) {
						for (i = 1, l = 4 + ADJACENTx2; i < l; i++) {
							pages.push(i);
						}
					}

					// in middle; hide some front and some back
					else if (LASTPAGE - ADJACENTx2 > info.page && info.page > ADJACENTx2) {
						for (i = info.page - ADJACENT; i <= info.page + ADJACENT; i++) {
							pages.push(i);
						}
					}
					// close to end; only hide early pages
					else {
						for (i = LASTPAGE - (2 + ADJACENTx2); i <= LASTPAGE; i++) {
							pages.push(i);
						}
					}
				}
			}

			return pages;
		}

	});


	// @name: requestPager
	//
	// Paginator for server-side data being requested from a backend/API
	//
	// @description:
	// This paginator is responsible for providing pagination
	// and sort capabilities for requests to a server-side
	// data service (e.g an API)
	//
	Paginator.requestPager = Backbone.Collection.extend({

		sync: function (method, model, options) {

			var queryMap = {}, params;
				queryMap[this.perPageAttribute] =  this.perPage;
				queryMap[this.skipAttribute] = this.page * this.perPage;
				queryMap[this.orderAttribute] =  this.sortField;
				queryMap[this.customAttribute1] =  this.customParam1;
				queryMap[this.formatAttribute] =  this.format;
				queryMap[this.customAttribute2] = this.customParam2;
				queryMap[this.queryAttribute] =  this.query;

				params = _.extend({
				type: 'GET',
				dataType: 'jsonp',
				jsonpCallback: 'callback',
				data: decodeURIComponent($.param(queryMap)),
				url: this.url,
				processData: false
			}, options);

			return $.ajax(params);
		},


		requestNextPage: function () {
			if (this.page !== undefined) {
				this.page += 1;
				// customize as needed. For the Netflix API, skipping ahead based on
				// page * number of results per page was necessary. You may have a
				// simpler server-side pagination API where just updating 
				// the 'page' value is all you need to do.
				// This applies similarly to requestPreviousPage()
				this.pager();
			}
		},

		requestPreviousPage: function () {
			if (this.page !== undefined) {
				this.page -= 1;
				// customize as needed.
				this.pager();
			}
		},

		updateOrder: function (column) {
			if (column !== undefined) {
				this.sortField = column;
				this.pager();
			}

		},

		goTo: function (page) {
			if(page !== undefined){
				this.page = parseInt(page, 10);
				this.pager();				
			}
		},

		howManyPer: function (count) {
			if(count !== undefined){
				this.page = this.firstPage;
				this.perPage = count;
				this.pager();				
			}
		},

		sort: function () {
			//assign to as needed.
		},

		info: function () {

			var info = {
				page: this.page,
				firstPage: this.firstPage,
				totalPages: this.totalPages,
				lastPage: this.totalPages,
				perPage: this.perPage
			};

			this.information = info;
			return info;
		},

		// fetches the latest results from the server
		pager: function () {
			this.fetch({});
		}


	});

	return Paginator;

}(Backbone, _, $));