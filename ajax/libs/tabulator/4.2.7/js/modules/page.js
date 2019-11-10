/* Tabulator v4.2.7 (c) Oliver Folkerd */

var Page = function Page(table) {

	this.table = table; //hold Tabulator object

	this.mode = "local";
	this.progressiveLoad = false;

	this.size = 0;
	this.page = 1;
	this.count = 5;
	this.max = 1;

	this.displayIndex = 0; //index in display pipeline

	this.pageSizes = [];

	this.createElements();
};

Page.prototype.createElements = function () {

	var button;

	this.element = document.createElement("span");
	this.element.classList.add("tabulator-paginator");

	this.pagesElement = document.createElement("span");
	this.pagesElement.classList.add("tabulator-pages");

	button = document.createElement("button");
	button.classList.add("tabulator-page");
	button.setAttribute("type", "button");
	button.setAttribute("role", "button");
	button.setAttribute("aria-label", "");
	button.setAttribute("title", "");

	this.firstBut = button.cloneNode(true);
	this.firstBut.setAttribute("data-page", "first");

	this.prevBut = button.cloneNode(true);
	this.prevBut.setAttribute("data-page", "prev");

	this.nextBut = button.cloneNode(true);
	this.nextBut.setAttribute("data-page", "next");

	this.lastBut = button.cloneNode(true);
	this.lastBut.setAttribute("data-page", "last");

	if (this.table.options.paginationSizeSelector) {
		this.pageSizeSelect = document.createElement("select");
		this.pageSizeSelect.classList.add("tabulator-page-size");
	}
};

Page.prototype.generatePageSizeSelectList = function () {
	var _this = this;

	var pageSizes = [];

	if (this.pageSizeSelect) {

		if (Array.isArray(this.table.options.paginationSizeSelector)) {
			pageSizes = this.table.options.paginationSizeSelector;
			this.pageSizes = pageSizes;

			if (this.pageSizes.indexOf(this.size) == -1) {
				pageSizes.unshift(this.size);
			}
		} else {

			if (this.pageSizes.indexOf(this.size) == -1) {
				pageSizes = [];

				for (var i = 1; i < 5; i++) {
					pageSizes.push(this.size * i);
				}

				this.pageSizes = pageSizes;
			} else {
				pageSizes = this.pageSizes;
			}
		}

		while (this.pageSizeSelect.firstChild) {
			this.pageSizeSelect.removeChild(this.pageSizeSelect.firstChild);
		}pageSizes.forEach(function (item) {
			var itemEl = document.createElement("option");
			itemEl.value = item;
			itemEl.innerHTML = item;

			_this.pageSizeSelect.appendChild(itemEl);
		});

		this.pageSizeSelect.value = this.size;
	}
};

//setup pageination
Page.prototype.initialize = function (hidden) {
	var self = this,
	    pageSelectLabel;

	//update param names
	for (var key in self.table.options.paginationDataSent) {
		self.paginationDataSentNames[key] = self.table.options.paginationDataSent[key];
	}

	for (var _key in self.table.options.paginationDataReceived) {
		self.paginationDataReceivedNames[_key] = self.table.options.paginationDataReceived[_key];
	}

	//build pagination element

	//bind localizations
	self.table.modules.localize.bind("pagination|first", function (value) {
		self.firstBut.innerHTML = value;
	});

	self.table.modules.localize.bind("pagination|first_title", function (value) {
		self.firstBut.setAttribute("aria-label", value);
		self.firstBut.setAttribute("title", value);
	});

	self.table.modules.localize.bind("pagination|prev", function (value) {
		self.prevBut.innerHTML = value;
	});

	self.table.modules.localize.bind("pagination|prev_title", function (value) {
		self.prevBut.setAttribute("aria-label", value);
		self.prevBut.setAttribute("title", value);
	});

	self.table.modules.localize.bind("pagination|next", function (value) {
		self.nextBut.innerHTML = value;
	});

	self.table.modules.localize.bind("pagination|next_title", function (value) {
		self.nextBut.setAttribute("aria-label", value);
		self.nextBut.setAttribute("title", value);
	});

	self.table.modules.localize.bind("pagination|last", function (value) {
		self.lastBut.innerHTML = value;
	});

	self.table.modules.localize.bind("pagination|last_title", function (value) {
		self.lastBut.setAttribute("aria-label", value);
		self.lastBut.setAttribute("title", value);
	});

	//click bindings
	self.firstBut.addEventListener("click", function () {
		self.setPage(1);
	});

	self.prevBut.addEventListener("click", function () {
		self.previousPage();
	});

	self.nextBut.addEventListener("click", function () {
		self.nextPage().then(function () {}).catch(function () {});
	});

	self.lastBut.addEventListener("click", function () {
		self.setPage(self.max);
	});

	if (self.table.options.paginationElement) {
		self.element = self.table.options.paginationElement;
	}

	if (this.pageSizeSelect) {
		pageSelectLabel = document.createElement("label");

		self.table.modules.localize.bind("pagination|page_size", function (value) {
			self.pageSizeSelect.setAttribute("aria-label", value);
			self.pageSizeSelect.setAttribute("title", value);
			pageSelectLabel.innerHTML = value;
		});

		self.element.appendChild(pageSelectLabel);
		self.element.appendChild(self.pageSizeSelect);

		self.pageSizeSelect.addEventListener("change", function (e) {
			self.setPageSize(self.pageSizeSelect.value);
			self.setPage(1).then(function () {}).catch(function () {});
		});
	}

	//append to DOM
	self.element.appendChild(self.firstBut);
	self.element.appendChild(self.prevBut);
	self.element.appendChild(self.pagesElement);
	self.element.appendChild(self.nextBut);
	self.element.appendChild(self.lastBut);

	if (!self.table.options.paginationElement && !hidden) {
		self.table.footerManager.append(self.element, self);
	}

	//set default values
	self.mode = self.table.options.pagination;
	self.size = self.table.options.paginationSize || Math.floor(self.table.rowManager.getElement().clientHeight / 24);
	self.count = self.table.options.paginationButtonCount;

	self.generatePageSizeSelectList();
};

Page.prototype.initializeProgressive = function (mode) {
	this.initialize(true);
	this.mode = "progressive_" + mode;
	this.progressiveLoad = true;
};

Page.prototype.setDisplayIndex = function (index) {
	this.displayIndex = index;
};

Page.prototype.getDisplayIndex = function () {
	return this.displayIndex;
};

//calculate maximum page from number of rows
Page.prototype.setMaxRows = function (rowCount) {
	if (!rowCount) {
		this.max = 1;
	} else {
		this.max = Math.ceil(rowCount / this.size);
	}

	if (this.page > this.max) {
		this.page = this.max;
	}
};

//reset to first page without triggering action
Page.prototype.reset = function (force) {
	if (this.mode == "local" || force) {
		this.page = 1;
	}
	return true;
};

//set the maxmum page
Page.prototype.setMaxPage = function (max) {

	max = parseInt(max);

	this.max = max || 1;

	if (this.page > this.max) {
		this.page = this.max;
		this.trigger();
	}
};

//set current page number
Page.prototype.setPage = function (page) {
	var _this2 = this;

	return new Promise(function (resolve, reject) {

		page = parseInt(page);

		if (page > 0 && page <= _this2.max) {
			_this2.page = page;
			_this2.trigger().then(function () {
				resolve();
			}).catch(function () {
				reject();
			});
		} else {
			console.warn("Pagination Error - Requested page is out of range of 1 - " + _this2.max + ":", page);
			reject();
		}
	});
};

Page.prototype.setPageToRow = function (row) {
	var _this3 = this;

	return new Promise(function (resolve, reject) {

		var rows = _this3.table.rowManager.getDisplayRows(_this3.displayIndex - 1);
		var index = rows.indexOf(row);

		if (index > -1) {
			var page = Math.ceil((index + 1) / _this3.size);

			_this3.setPage(page).then(function () {
				resolve();
			}).catch(function () {
				reject();
			});
		} else {
			console.warn("Pagination Error - Requested row is not visible");
			reject();
		}
	});
};

Page.prototype.setPageSize = function (size) {
	size = parseInt(size);

	if (size > 0) {
		this.size = size;
	}

	if (this.pageSizeSelect) {
		// this.pageSizeSelect.value = size;
		this.generatePageSizeSelectList();
	}
};

//setup the pagination buttons
Page.prototype._setPageButtons = function () {
	var self = this;

	var leftSize = Math.floor((this.count - 1) / 2);
	var rightSize = Math.ceil((this.count - 1) / 2);
	var min = this.max - this.page + leftSize + 1 < this.count ? this.max - this.count + 1 : Math.max(this.page - leftSize, 1);
	var max = this.page <= rightSize ? Math.min(this.count, this.max) : Math.min(this.page + rightSize, this.max);

	while (self.pagesElement.firstChild) {
		self.pagesElement.removeChild(self.pagesElement.firstChild);
	}if (self.page == 1) {
		self.firstBut.disabled = true;
		self.prevBut.disabled = true;
	} else {
		self.firstBut.disabled = false;
		self.prevBut.disabled = false;
	}

	if (self.page == self.max) {
		self.lastBut.disabled = true;
		self.nextBut.disabled = true;
	} else {
		self.lastBut.disabled = false;
		self.nextBut.disabled = false;
	}

	for (var i = min; i <= max; i++) {
		if (i > 0 && i <= self.max) {
			self.pagesElement.appendChild(self._generatePageButton(i));
		}
	}

	this.footerRedraw();
};

Page.prototype._generatePageButton = function (page) {
	var self = this,
	    button = document.createElement("button");

	button.classList.add("tabulator-page");
	if (page == self.page) {
		button.classList.add("active");
	}

	button.setAttribute("type", "button");
	button.setAttribute("role", "button");
	button.setAttribute("aria-label", "Show Page " + page);
	button.setAttribute("title", "Show Page " + page);
	button.setAttribute("data-page", page);
	button.textContent = page;

	button.addEventListener("click", function (e) {
		self.setPage(page);
	});

	return button;
};

//previous page
Page.prototype.previousPage = function () {
	var _this4 = this;

	return new Promise(function (resolve, reject) {
		if (_this4.page > 1) {
			_this4.page--;
			_this4.trigger().then(function () {
				resolve();
			}).catch(function () {
				reject();
			});
		} else {
			console.warn("Pagination Error - Previous page would be less than page 1:", 0);
			reject();
		}
	});
};

//next page
Page.prototype.nextPage = function () {
	var _this5 = this;

	return new Promise(function (resolve, reject) {
		if (_this5.page < _this5.max) {
			_this5.page++;
			_this5.trigger().then(function () {
				resolve();
			}).catch(function () {
				reject();
			});
		} else {
			if (!_this5.progressiveLoad) {
				console.warn("Pagination Error - Next page would be greater than maximum page of " + _this5.max + ":", _this5.max + 1);
			}
			reject();
		}
	});
};

//return current page number
Page.prototype.getPage = function () {
	return this.page;
};

//return max page number
Page.prototype.getPageMax = function () {
	return this.max;
};

Page.prototype.getPageSize = function (size) {
	return this.size;
};

Page.prototype.getMode = function () {
	return this.mode;
};

//return appropriate rows for current page
Page.prototype.getRows = function (data) {
	var output, start, end;

	if (this.mode == "local") {
		output = [];
		start = this.size * (this.page - 1);
		end = start + parseInt(this.size);

		this._setPageButtons();

		for (var i = start; i < end; i++) {
			if (data[i]) {
				output.push(data[i]);
			}
		}

		return output;
	} else {

		this._setPageButtons();

		return data.slice(0);
	}
};

Page.prototype.trigger = function () {
	var _this6 = this;

	var left;

	return new Promise(function (resolve, reject) {

		switch (_this6.mode) {
			case "local":
				left = _this6.table.rowManager.scrollLeft;

				_this6.table.rowManager.refreshActiveData("page");
				_this6.table.rowManager.scrollHorizontal(left);

				_this6.table.options.pageLoaded.call(_this6.table, _this6.getPage());
				resolve();
				break;

			case "remote":
			case "progressive_load":
			case "progressive_scroll":
				_this6.table.modules.ajax.blockActiveRequest();
				_this6._getRemotePage().then(function () {
					resolve();
				}).catch(function () {
					reject();
				});
				break;

			default:
				console.warn("Pagination Error - no such pagination mode:", _this6.mode);
				reject();
		}
	});
};

Page.prototype._getRemotePage = function () {
	var _this7 = this;

	var self = this,
	    oldParams,
	    pageParams;

	return new Promise(function (resolve, reject) {

		if (!self.table.modExists("ajax", true)) {
			reject();
		}

		//record old params and restore after request has been made
		oldParams = Tabulator.prototype.helpers.deepClone(self.table.modules.ajax.getParams() || {});
		pageParams = self.table.modules.ajax.getParams();

		//configure request params
		pageParams[_this7.paginationDataSentNames.page] = self.page;

		//set page size if defined
		if (_this7.size) {
			pageParams[_this7.paginationDataSentNames.size] = _this7.size;
		}

		//set sort data if defined
		if (_this7.table.options.ajaxSorting && _this7.table.modExists("sort")) {
			var sorters = self.table.modules.sort.getSort();

			sorters.forEach(function (item) {
				delete item.column;
			});

			pageParams[_this7.paginationDataSentNames.sorters] = sorters;
		}

		//set filter data if defined
		if (_this7.table.options.ajaxFiltering && _this7.table.modExists("filter")) {
			var filters = self.table.modules.filter.getFilters(true, true);
			pageParams[_this7.paginationDataSentNames.filters] = filters;
		}

		self.table.modules.ajax.setParams(pageParams);

		self.table.modules.ajax.sendRequest(_this7.progressiveLoad).then(function (data) {
			self._parseRemoteData(data);
			resolve();
		}).catch(function (e) {
			reject();
		});

		self.table.modules.ajax.setParams(oldParams);
	});
};

Page.prototype._parseRemoteData = function (data) {
	var self = this,
	    left,
	    data,
	    margin;

	if (typeof data[this.paginationDataReceivedNames.last_page] === "undefined") {
		console.warn("Remote Pagination Error - Server response missing '" + this.paginationDataReceivedNames.last_page + "' property");
	}

	if (data[this.paginationDataReceivedNames.data]) {
		this.max = parseInt(data[this.paginationDataReceivedNames.last_page]) || 1;

		if (this.progressiveLoad) {
			switch (this.mode) {
				case "progressive_load":
					this.table.rowManager.addRows(data[this.paginationDataReceivedNames.data]);
					if (this.page < this.max) {
						setTimeout(function () {
							self.nextPage().then(function () {}).catch(function () {});
						}, self.table.options.ajaxProgressiveLoadDelay);
					}
					break;

				case "progressive_scroll":
					data = this.table.rowManager.getData().concat(data[this.paginationDataReceivedNames.data]);

					this.table.rowManager.setData(data, true);

					margin = this.table.options.ajaxProgressiveLoadScrollMargin || this.table.rowManager.element.clientHeight * 2;

					if (self.table.rowManager.element.scrollHeight <= self.table.rowManager.element.clientHeight + margin) {
						self.nextPage().then(function () {}).catch(function () {});
					}
					break;
			}
		} else {
			left = this.table.rowManager.scrollLeft;

			this.table.rowManager.setData(data[this.paginationDataReceivedNames.data]);

			this.table.rowManager.scrollHorizontal(left);

			this.table.columnManager.scrollHorizontal(left);

			this.table.options.pageLoaded.call(this.table, this.getPage());
		}
	} else {
		console.warn("Remote Pagination Error - Server response missing '" + this.paginationDataReceivedNames.data + "' property");
	}
};

//handle the footer element being redrawn
Page.prototype.footerRedraw = function () {
	var footer = this.table.footerManager.element;

	if (Math.ceil(footer.clientWidth) - footer.scrollWidth < 0) {
		this.pagesElement.style.display = 'none';
	} else {
		this.pagesElement.style.display = '';

		if (Math.ceil(footer.clientWidth) - footer.scrollWidth < 0) {
			this.pagesElement.style.display = 'none';
		}
	}
};

//set the paramter names for pagination requests
Page.prototype.paginationDataSentNames = {
	"page": "page",
	"size": "size",
	"sorters": "sorters",
	// "sort_dir":"sort_dir",
	"filters": "filters"
};

//set the property names for pagination responses
Page.prototype.paginationDataReceivedNames = {
	"current_page": "current_page",
	"last_page": "last_page",
	"data": "data"
};

Tabulator.prototype.registerModule("page", Page);