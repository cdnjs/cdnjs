var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* Tabulator v4.2.7 (c) Oliver Folkerd */

var Edit = function Edit(table) {
	this.table = table; //hold Tabulator object
	this.currentCell = false; //hold currently editing cell
	this.mouseClick = false; //hold mousedown state to prevent click binding being overriden by editor opening
	this.recursionBlock = false; //prevent focus recursion
	this.invalidEdit = false;
};

//initialize column editor
Edit.prototype.initializeColumn = function (column) {
	var self = this,
	    config = {
		editor: false,
		blocked: false,
		check: column.definition.editable,
		params: column.definition.editorParams || {}
	};

	//set column editor
	switch (_typeof(column.definition.editor)) {
		case "string":

			if (column.definition.editor === "tick") {
				column.definition.editor = "tickCross";
				console.warn("DEPRECATION WANRING - the tick editor has been depricated, please use the tickCross editor");
			}

			if (self.editors[column.definition.editor]) {
				config.editor = self.editors[column.definition.editor];
			} else {
				console.warn("Editor Error - No such editor found: ", column.definition.editor);
			}
			break;

		case "function":
			config.editor = column.definition.editor;
			break;

		case "boolean":

			if (column.definition.editor === true) {

				if (typeof column.definition.formatter !== "function") {

					if (column.definition.formatter === "tick") {
						column.definition.formatter = "tickCross";
						console.warn("DEPRECATION WANRING - the tick editor has been depricated, please use the tickCross editor");
					}

					if (self.editors[column.definition.formatter]) {
						config.editor = self.editors[column.definition.formatter];
					} else {
						config.editor = self.editors["input"];
					}
				} else {
					console.warn("Editor Error - Cannot auto lookup editor for a custom formatter: ", column.definition.formatter);
				}
			}
			break;
	}

	if (config.editor) {
		column.modules.edit = config;
	}
};

Edit.prototype.getCurrentCell = function () {
	return this.currentCell ? this.currentCell.getComponent() : false;
};

Edit.prototype.clearEditor = function () {
	var cell = this.currentCell,
	    cellEl;

	this.invalidEdit = false;

	if (cell) {
		this.currentCell = false;

		cellEl = cell.getElement();
		cellEl.classList.remove("tabulator-validation-fail");
		cellEl.classList.remove("tabulator-editing");
		while (cellEl.firstChild) {
			cellEl.removeChild(cellEl.firstChild);
		}cell.row.getElement().classList.remove("tabulator-row-editing");
	}
};

Edit.prototype.cancelEdit = function () {

	if (this.currentCell) {
		var cell = this.currentCell;
		var component = this.currentCell.getComponent();

		this.clearEditor();
		cell.setValueActual(cell.getValue());

		if (cell.column.cellEvents.cellEditCancelled) {
			cell.column.cellEvents.cellEditCancelled.call(this.table, component);
		}

		this.table.options.cellEditCancelled.call(this.table, component);
	}
};

//return a formatted value for a cell
Edit.prototype.bindEditor = function (cell) {
	var self = this,
	    element = cell.getElement();

	element.setAttribute("tabindex", 0);

	element.addEventListener("click", function (e) {
		if (!element.classList.contains("tabulator-editing")) {
			element.focus();
		}
	});

	element.addEventListener("mousedown", function (e) {
		self.mouseClick = true;
	});

	element.addEventListener("focus", function (e) {
		if (!self.recursionBlock) {
			self.edit(cell, e, false);
		}
	});
};

Edit.prototype.focusCellNoEvent = function (cell) {
	this.recursionBlock = true;
	if (this.table.browser !== "ie") {
		cell.getElement().focus();
	}
	this.recursionBlock = false;
};

Edit.prototype.editCell = function (cell, forceEdit) {
	this.focusCellNoEvent(cell);
	this.edit(cell, false, forceEdit);
};

Edit.prototype.edit = function (cell, e, forceEdit) {
	var self = this,
	    allowEdit = true,
	    rendered = function rendered() {},
	    element = cell.getElement(),
	    cellEditor,
	    component,
	    params;

	//prevent editing if another cell is refusing to leave focus (eg. validation fail)
	if (this.currentCell) {
		if (!this.invalidEdit) {
			this.cancelEdit();
		}
		return;
	}

	//handle successfull value change
	function success(value) {

		if (self.currentCell === cell) {
			var valid = true;

			if (cell.column.modules.validate && self.table.modExists("validate")) {
				valid = self.table.modules.validate.validate(cell.column.modules.validate, cell.getComponent(), value);
			}

			if (valid === true) {
				self.clearEditor();
				cell.setValue(value, true);

				if (self.table.options.dataTree && self.table.modExists("dataTree")) {
					self.table.modules.dataTree.checkForRestyle(cell);
				}
			} else {
				self.invalidEdit = true;
				element.classList.add("tabulator-validation-fail");
				self.focusCellNoEvent(cell);
				rendered();
				self.table.options.validationFailed.call(self.table, cell.getComponent(), value, valid);
			}
		} else {
			// console.warn("Edit Success Error - cannot call success on a cell that is no longer being edited");
		}
	}

	//handle aborted edit
	function cancel() {
		if (self.currentCell === cell) {
			self.cancelEdit();

			if (self.table.options.dataTree && self.table.modExists("dataTree")) {
				self.table.modules.dataTree.checkForRestyle(cell);
			}
		} else {
			// console.warn("Edit Success Error - cannot call cancel on a cell that is no longer being edited");
		}
	}

	function onRendered(callback) {
		rendered = callback;
	}

	if (!cell.column.modules.edit.blocked) {
		if (e) {
			e.stopPropagation();
		}

		switch (_typeof(cell.column.modules.edit.check)) {
			case "function":
				allowEdit = cell.column.modules.edit.check(cell.getComponent());
				break;

			case "boolean":
				allowEdit = cell.column.modules.edit.check;
				break;
		}

		if (allowEdit || forceEdit) {

			self.cancelEdit();

			self.currentCell = cell;

			component = cell.getComponent();

			if (this.mouseClick) {
				this.mouseClick = false;

				if (cell.column.cellEvents.cellClick) {
					cell.column.cellEvents.cellClick.call(this.table, e, component);
				}
			}

			if (cell.column.cellEvents.cellEditing) {
				cell.column.cellEvents.cellEditing.call(this.table, component);
			}

			self.table.options.cellEditing.call(this.table, component);

			params = typeof cell.column.modules.edit.params === "function" ? cell.column.modules.edit.params(component) : cell.column.modules.edit.params;

			cellEditor = cell.column.modules.edit.editor.call(self, component, onRendered, success, cancel, params);

			//if editor returned, add to DOM, if false, abort edit
			if (cellEditor !== false) {

				if (cellEditor instanceof Node) {
					element.classList.add("tabulator-editing");
					cell.row.getElement().classList.add("tabulator-row-editing");
					while (element.firstChild) {
						element.removeChild(element.firstChild);
					}element.appendChild(cellEditor);

					//trigger onRendered Callback
					rendered();

					//prevent editing from triggering rowClick event
					var children = element.children;

					for (var i = 0; i < children.length; i++) {
						children[i].addEventListener("click", function (e) {
							e.stopPropagation();
						});
					}
				} else {
					console.warn("Edit Error - Editor should return an instance of Node, the editor returned:", cellEditor);
					element.blur();
					return false;
				}
			} else {
				element.blur();
				return false;
			}

			return true;
		} else {
			this.mouseClick = false;
			element.blur();
			return false;
		}
	} else {
		this.mouseClick = false;
		element.blur();
		return false;
	}
};

//default data editors
Edit.prototype.editors = {

	//input element
	input: function input(cell, onRendered, success, cancel, editorParams) {

		//create and style input
		var cellValue = cell.getValue(),
		    input = document.createElement("input");

		input.setAttribute("type", "text");

		input.style.padding = "4px";
		input.style.width = "100%";
		input.style.boxSizing = "border-box";

		input.value = typeof cellValue !== "undefined" ? cellValue : "";

		onRendered(function () {
			input.focus();
			input.style.height = "100%";
		});

		function onChange(e) {
			if ((cellValue === null || typeof cellValue === "undefined") && input.value !== "" || input.value != cellValue) {
				success(input.value);
			} else {
				cancel();
			}
		}

		//submit new value on blur or change
		input.addEventListener("change", onChange);
		input.addEventListener("blur", onChange);

		//submit new value on enter
		input.addEventListener("keydown", function (e) {
			switch (e.keyCode) {
				case 13:
					success(input.value);
					break;

				case 27:
					cancel();
					break;
			}
		});

		return input;
	},

	//resizable text area element
	textarea: function textarea(cell, onRendered, success, cancel, editorParams) {
		var self = this,
		    cellValue = cell.getValue(),
		    value = String(cellValue !== null && cellValue !== "undefined" ? cellValue : ""),
		    count = (value.match(/(?:\r\n|\r|\n)/g) || []).length + 1,
		    input = document.createElement("textarea"),
		    scrollHeight = 0;

		//create and style input
		input.style.display = "block";
		input.style.padding = "2px";
		input.style.height = "100%";
		input.style.width = "100%";
		input.style.boxSizing = "border-box";
		input.style.whiteSpace = "pre-wrap";
		input.style.resize = "none";

		input.value = value;

		onRendered(function () {
			input.focus();
			input.style.height = "100%";
		});

		function onChange(e) {

			if ((cellValue === null || typeof cellValue === "undefined") && input.value !== "" || input.value != cellValue) {
				success(input.value);
				setTimeout(function () {
					cell.getRow().normalizeHeight();
				}, 300);
			} else {
				cancel();
			}
		}

		//submit new value on blur or change
		input.addEventListener("change", onChange);
		input.addEventListener("blur", onChange);

		input.addEventListener("keyup", function () {

			input.style.height = "";

			var heightNow = input.scrollHeight;

			input.style.height = heightNow + "px";

			if (heightNow != scrollHeight) {
				scrollHeight = heightNow;
				cell.getRow().normalizeHeight();
			}
		});

		input.addEventListener("keydown", function (e) {
			if (e.keyCode == 27) {
				cancel();
			}
		});

		return input;
	},

	//input element with type of number
	number: function number(cell, onRendered, success, cancel, editorParams) {

		var cellValue = cell.getValue(),
		    input = document.createElement("input");

		input.setAttribute("type", "number");

		if (typeof editorParams.max != "undefined") {
			input.setAttribute("max", editorParams.max);
		}

		if (typeof editorParams.min != "undefined") {
			input.setAttribute("min", editorParams.min);
		}

		if (typeof editorParams.step != "undefined") {
			input.setAttribute("step", editorParams.step);
		}

		//create and style input
		input.style.padding = "4px";
		input.style.width = "100%";
		input.style.boxSizing = "border-box";

		input.value = cellValue;

		var blurFunc = function blurFunc(e) {
			onChange();
		};

		onRendered(function () {
			//submit new value on blur
			input.removeEventListener("blur", blurFunc);

			input.focus();
			input.style.height = "100%";

			//submit new value on blur
			input.addEventListener("blur", blurFunc);
		});

		function onChange() {
			var value = input.value;

			if (!isNaN(value) && value !== "") {
				value = Number(value);
			}

			if (value != cellValue) {
				success(value);
			} else {
				cancel();
			}
		}

		//submit new value on enter
		input.addEventListener("keydown", function (e) {
			switch (e.keyCode) {
				case 13:
				case 9:
					onChange();
					break;

				case 27:
					cancel();
					break;
			}
		});

		return input;
	},

	//input element with type of number
	range: function range(cell, onRendered, success, cancel, editorParams) {

		var cellValue = cell.getValue(),
		    input = document.createElement("input");

		input.setAttribute("type", "range");

		if (typeof editorParams.max != "undefined") {
			input.setAttribute("max", editorParams.max);
		}

		if (typeof editorParams.min != "undefined") {
			input.setAttribute("min", editorParams.min);
		}

		if (typeof editorParams.step != "undefined") {
			input.setAttribute("step", editorParams.step);
		}

		//create and style input
		input.style.padding = "4px";
		input.style.width = "100%";
		input.style.boxSizing = "border-box";

		input.value = cellValue;

		onRendered(function () {
			input.focus();
			input.style.height = "100%";
		});

		function onChange() {
			var value = input.value;

			if (!isNaN(value) && value !== "") {
				value = Number(value);
			}

			if (value != cellValue) {
				success(value);
			} else {
				cancel();
			}
		}

		//submit new value on blur
		input.addEventListener("blur", function (e) {
			onChange();
		});

		//submit new value on enter
		input.addEventListener("keydown", function (e) {
			switch (e.keyCode) {
				case 13:
				case 9:
					onChange();
					break;

				case 27:
					cancel();
					break;
			}
		});

		return input;
	},

	//select
	select: function select(cell, onRendered, success, cancel, editorParams) {
		var self = this,
		    cellEl = cell.getElement(),
		    initialValue = cell.getValue(),
		    input = document.createElement("input"),
		    listEl = document.createElement("div"),
		    dataItems = [],
		    displayItems = [],
		    currentItem = {},
		    blurable = true;

		if (Array.isArray(editorParams) || !Array.isArray(editorParams) && (typeof editorParams === "undefined" ? "undefined" : _typeof(editorParams)) === "object" && !editorParams.values) {
			console.warn("DEPRECATION WANRING - values for the select editor must now be passed into the values property of the editorParams object, not as the editorParams object");
			editorParams = { values: editorParams };
		}

		function getUniqueColumnValues() {
			var output = {},
			    column = cell.getColumn()._getSelf(),
			    data = self.table.getData();

			data.forEach(function (row) {
				var val = column.getFieldValue(row);

				if (val !== null && typeof val !== "undefined" && val !== "") {
					output[val] = true;
				}
			});

			if (editorParams.sortValuesList) {
				if (editorParams.sortValuesList == "asc") {
					output = Object.keys(output).sort();
				} else {
					output = Object.keys(output).sort().reverse();
				}
			} else {
				output = Object.keys(output);
			}

			return output;
		}

		function parseItems(inputValues, curentValue) {
			var dataList = [];
			var displayList = [];

			function processComplexListItem(item) {
				var item = {
					label: editorParams.listItemFormatter ? editorParams.listItemFormatter(item.value, item.label) : item.label,
					value: item.value,
					element: false
				};

				if (item.value === curentValue || !isNaN(parseFloat(item.value)) && !isNaN(parseFloat(item.value)) && parseFloat(item.value) === parseFloat(curentValue)) {
					setCurrentItem(item);
				}

				dataList.push(item);
				displayList.push(item);

				return item;
			}

			if (typeof inputValues == "function") {
				inputValues = inputValues(cell);
			}

			if (Array.isArray(inputValues)) {
				inputValues.forEach(function (value) {
					var item;

					if ((typeof value === "undefined" ? "undefined" : _typeof(value)) === "object") {

						if (value.options) {
							item = {
								label: value.label,
								group: true,
								element: false
							};

							displayList.push(item);

							value.options.forEach(function (item) {
								processComplexListItem(item);
							});
						} else {
							processComplexListItem(value);
						}
					} else {

						item = {
							label: editorParams.listItemFormatter ? editorParams.listItemFormatter(value, value) : value,
							value: value,
							element: false
						};

						if (item.value === curentValue || !isNaN(parseFloat(item.value)) && !isNaN(parseFloat(item.value)) && parseFloat(item.value) === parseFloat(curentValue)) {
							setCurrentItem(item);
						}

						dataList.push(item);
						displayList.push(item);
					}
				});
			} else {
				for (var key in inputValues) {
					var item = {
						label: editorParams.listItemFormatter ? editorParams.listItemFormatter(key, inputValues[key]) : inputValues[key],
						value: key,
						element: false
					};

					if (item.value === curentValue || !isNaN(parseFloat(item.value)) && !isNaN(parseFloat(item.value)) && parseFloat(item.value) === parseFloat(curentValue)) {
						setCurrentItem(item);
					}

					dataList.push(item);
					displayList.push(item);
				}
			}

			dataItems = dataList;
			displayItems = displayList;

			fillList();
		}

		function fillList() {
			while (listEl.firstChild) {
				listEl.removeChild(listEl.firstChild);
			}displayItems.forEach(function (item) {
				var el = item.element;

				if (!el) {

					if (item.group) {
						el = document.createElement("div");
						el.classList.add("tabulator-edit-select-list-group");
						el.tabIndex = 0;
						el.innerHTML = item.label === "" ? "&nbsp;" : item.label;
					} else {
						el = document.createElement("div");
						el.classList.add("tabulator-edit-select-list-item");
						el.tabIndex = 0;
						el.innerHTML = item.label === "" ? "&nbsp;" : item.label;

						el.addEventListener("click", function () {
							setCurrentItem(item);
							chooseItem();
						});

						if (item === currentItem) {
							el.classList.add("active");
						}
					}

					el.addEventListener("mousedown", function () {
						blurable = false;

						setTimeout(function () {
							blurable = true;
						}, 10);
					});

					item.element = el;
				}

				listEl.appendChild(el);
			});
		}

		function setCurrentItem(item) {

			if (currentItem && currentItem.element) {
				currentItem.element.classList.remove("active");
			}

			currentItem = item;
			input.value = item.label === "&nbsp;" ? "" : item.label;

			if (item.element) {
				item.element.classList.add("active");
			}
		}

		function chooseItem() {
			hideList();

			if (initialValue !== currentItem.value) {
				initialValue = currentItem.value;
				success(currentItem.value);
			} else {
				cancel();
			}
		}

		function cancelItem() {
			hideList();
			cancel();
		}

		function showList() {
			if (!listEl.parentNode) {

				if (editorParams.values === true) {
					parseItems(getUniqueColumnValues(), initialValue);
				} else {
					parseItems(editorParams.values || [], initialValue);
				}

				var offset = Tabulator.prototype.helpers.elOffset(cellEl);

				listEl.style.minWidth = cellEl.offsetWidth + "px";

				listEl.style.top = offset.top + cellEl.offsetHeight + "px";
				listEl.style.left = offset.left + "px";
				document.body.appendChild(listEl);
			}
		}

		function hideList() {
			if (listEl.parentNode) {
				listEl.parentNode.removeChild(listEl);
			}
		}

		//style input
		input.setAttribute("type", "text");

		input.style.padding = "4px";
		input.style.width = "100%";
		input.style.boxSizing = "border-box";
		input.readOnly = true;

		input.value = typeof initialValue !== "undefined" || initialValue === null ? initialValue : "";

		if (editorParams.values === true) {
			parseItems(getUniqueColumnValues(), initialValue);
		} else {
			parseItems(editorParams.values || [], initialValue);
		}

		//allow key based navigation
		input.addEventListener("keydown", function (e) {
			var index;

			switch (e.keyCode) {
				case 38:
					//up arrow
					e.stopImmediatePropagation();
					e.stopPropagation();
					e.preventDefault();

					index = dataItems.indexOf(currentItem);

					if (index > 0) {
						setCurrentItem(dataItems[index - 1]);
					}
					break;

				case 40:
					//down arrow
					e.stopImmediatePropagation();
					e.stopPropagation();
					e.preventDefault();

					index = dataItems.indexOf(currentItem);

					if (index < dataItems.length - 1) {
						if (index == -1) {
							setCurrentItem(dataItems[0]);
						} else {
							setCurrentItem(dataItems[index + 1]);
						}
					}
					break;

				case 37: //left arrow
				case 39:
					//right arrow
					e.stopImmediatePropagation();
					e.stopPropagation();
					e.preventDefault();
					break;

				case 13:
					//enter
					chooseItem();
					break;

				case 27:
					//escape
					cancelItem();
					break;
			}
		});

		input.addEventListener("blur", function (e) {
			if (blurable) {
				cancelItem();
			}
		});

		input.addEventListener("focus", function (e) {
			showList();
		});

		//style list element
		listEl = document.createElement("div");
		listEl.classList.add("tabulator-edit-select-list");

		onRendered(function () {
			input.style.height = "100%";
			input.focus();
		});

		return input;
	},

	//autocomplete
	autocomplete: function autocomplete(cell, onRendered, success, cancel, editorParams) {
		var self = this,
		    cellEl = cell.getElement(),
		    initialValue = cell.getValue(),
		    input = document.createElement("input"),
		    listEl = document.createElement("div"),
		    allItems = [],
		    displayItems = [],
		    values = [],
		    currentItem = {},
		    blurable = true;

		function getUniqueColumnValues() {
			var output = {},
			    column = cell.getColumn()._getSelf(),
			    data = self.table.getData();

			data.forEach(function (row) {
				var val = column.getFieldValue(row);

				if (val !== null && typeof val !== "undefined" && val !== "") {
					output[val] = true;
				}
			});

			if (editorParams.sortValuesList) {
				if (editorParams.sortValuesList == "asc") {
					output = Object.keys(output).sort();
				} else {
					output = Object.keys(output).sort().reverse();
				}
			} else {
				output = Object.keys(output);
			}

			return output;
		}

		function parseItems(inputValues, curentValue) {
			var itemList = [];

			if (Array.isArray(inputValues)) {
				inputValues.forEach(function (value) {
					var item = {
						title: editorParams.listItemFormatter ? editorParams.listItemFormatter(value, value) : value,
						value: value,
						element: false
					};

					if (item.value === curentValue || !isNaN(parseFloat(item.value)) && !isNaN(parseFloat(item.value)) && parseFloat(item.value) === parseFloat(curentValue)) {
						setCurrentItem(item);
					}

					itemList.push(item);
				});
			} else {
				for (var key in inputValues) {
					var item = {
						title: editorParams.listItemFormatter ? editorParams.listItemFormatter(key, inputValues[key]) : inputValues[key],
						value: key,
						element: false
					};

					if (item.value === curentValue || !isNaN(parseFloat(item.value)) && !isNaN(parseFloat(item.value)) && parseFloat(item.value) === parseFloat(curentValue)) {
						setCurrentItem(item);
					}

					itemList.push(item);
				}
			}

			if (editorParams.searchFunc) {
				itemList.forEach(function (item) {
					item.search = {
						title: item.title,
						value: item.value
					};
				});
			}

			allItems = itemList;
		}

		function filterList(term, intialLoad) {
			var matches = [],
			    searchObjs = [],
			    searchResults = [];

			if (editorParams.searchFunc) {

				allItems.forEach(function (item) {
					searchObjs.push(item.search);
				});

				searchResults = editorParams.searchFunc(term, searchObjs);

				searchResults.forEach(function (result) {
					var match = allItems.find(function (item) {
						return item.search === result;
					});

					if (match) {
						matches.push(match);
					}
				});
			} else {
				if (term === "") {

					if (editorParams.showListOnEmpty) {
						allItems.forEach(function (item) {
							matches.push(item);
						});
					}
				} else {
					allItems.forEach(function (item) {

						if (item.value !== null || typeof item.value !== "undefined") {
							if (String(item.value).toLowerCase().indexOf(String(term).toLowerCase()) > -1 || String(item.title).toLowerCase().indexOf(String(term).toLowerCase()) > -1) {
								matches.push(item);
							}
						}
					});
				}
			}

			displayItems = matches;

			fillList(intialLoad);
		}

		function fillList(intialLoad) {
			var current = false;

			while (listEl.firstChild) {
				listEl.removeChild(listEl.firstChild);
			}displayItems.forEach(function (item) {
				var el = item.element;

				if (!el) {
					el = document.createElement("div");
					el.classList.add("tabulator-edit-select-list-item");
					el.tabIndex = 0;
					el.innerHTML = item.title;

					el.addEventListener("click", function () {
						setCurrentItem(item);
						chooseItem();
					});

					el.addEventListener("mousedown", function () {
						blurable = false;

						setTimeout(function () {
							blurable = true;
						}, 10);
					});

					item.element = el;

					if (intialLoad && item.value == initialValue) {
						input.value = item.title;
						item.element.classList.add("active");
						current = true;
					}

					if (item === currentItem) {
						item.element.classList.add("active");
						current = true;
					}
				}

				listEl.appendChild(el);
			});

			if (!current) {
				setCurrentItem(false);
			}
		}

		function setCurrentItem(item, showInputValue) {
			if (currentItem && currentItem.element) {
				currentItem.element.classList.remove("active");
			}

			currentItem = item;

			if (item && item.element) {
				item.element.classList.add("active");
			}
		}

		function chooseItem() {
			hideList();

			if (currentItem) {
				if (initialValue !== currentItem.value) {
					initialValue = currentItem.value;
					input.value = currentItem.title;
					success(currentItem.value);
				} else {
					cancel();
				}
			} else {
				if (editorParams.freetext) {
					initialValue = input.value;
					success(input.value);
				} else {
					if (editorParams.allowEmpty && input.value === "") {
						initialValue = input.value;
						success(input.value);
					} else {
						cancel();
					}
				}
			}
		}

		function cancelItem() {
			hideList();
			cancel();
		}

		function showList() {
			if (!listEl.parentNode) {
				while (listEl.firstChild) {
					listEl.removeChild(listEl.firstChild);
				}if (editorParams.values === true) {
					values = getUniqueColumnValues();
				} else {
					values = editorParams.values || [];
				}

				parseItems(values, initialValue);

				var offset = Tabulator.prototype.helpers.elOffset(cellEl);

				listEl.style.minWidth = cellEl.offsetWidth + "px";

				listEl.style.top = offset.top + cellEl.offsetHeight + "px";
				listEl.style.left = offset.left + "px";
				document.body.appendChild(listEl);
			}
		}

		function hideList() {
			if (listEl.parentNode) {
				listEl.parentNode.removeChild(listEl);
			}
		}

		//style input
		input.setAttribute("type", "search");

		input.style.padding = "4px";
		input.style.width = "100%";
		input.style.boxSizing = "border-box";

		//allow key based navigation
		input.addEventListener("keydown", function (e) {
			var index;

			switch (e.keyCode) {
				case 38:
					//up arrow
					e.stopImmediatePropagation();
					e.stopPropagation();
					e.preventDefault();

					index = displayItems.indexOf(currentItem);

					if (index > 0) {
						setCurrentItem(displayItems[index - 1]);
					} else {
						setCurrentItem(false);
					}
					break;

				case 40:
					//down arrow
					e.stopImmediatePropagation();
					e.stopPropagation();
					e.preventDefault();

					index = displayItems.indexOf(currentItem);

					if (index < displayItems.length - 1) {
						if (index == -1) {
							setCurrentItem(displayItems[0]);
						} else {
							setCurrentItem(displayItems[index + 1]);
						}
					}
					break;

				case 37: //left arrow
				case 39:
					//right arrow
					e.stopImmediatePropagation();
					e.stopPropagation();
					e.preventDefault();
					break;

				case 13:
					//enter
					chooseItem();
					break;

				case 27:
					//escape
					cancelItem();
					break;

				case 36: //home
				case 35:
					//end
					//prevent table navigation while using input element
					e.stopImmediatePropagation();
					break;
			}
		});

		input.addEventListener("keyup", function (e) {

			switch (e.keyCode) {
				case 38: //up arrow
				case 37: //left arrow
				case 39: //up arrow
				case 40: //right arrow
				case 13: //enter
				case 27:
					//escape
					break;

				default:
					filterList(input.value);
			}
		});

		input.addEventListener("search", function (e) {
			filterList(input.value);
		});

		input.addEventListener("blur", function (e) {
			if (blurable) {
				chooseItem();
			}
		});

		input.addEventListener("focus", function (e) {
			var value = typeof initialValue !== "undefined" || initialValue === null ? initialValue : "";
			showList();
			input.value = value;
			filterList(value, true);
		});

		//style list element
		listEl = document.createElement("div");
		listEl.classList.add("tabulator-edit-select-list");

		onRendered(function () {
			input.style.height = "100%";
			input.focus();
		});

		return input;
	},

	//start rating
	star: function star(cell, onRendered, success, cancel, editorParams) {
		var self = this,
		    element = cell.getElement(),
		    value = cell.getValue(),
		    maxStars = element.getElementsByTagName("svg").length || 5,
		    size = element.getElementsByTagName("svg")[0] ? element.getElementsByTagName("svg")[0].getAttribute("width") : 14,
		    stars = [],
		    starsHolder = document.createElement("div"),
		    star = document.createElementNS('http://www.w3.org/2000/svg', "svg");

		//change star type
		function starChange(val) {
			stars.forEach(function (star, i) {
				if (i < val) {
					if (self.table.browser == "ie") {
						star.setAttribute("class", "tabulator-star-active");
					} else {
						star.classList.replace("tabulator-star-inactive", "tabulator-star-active");
					}

					star.innerHTML = '<polygon fill="#488CE9" stroke="#014AAE" stroke-width="37.6152" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="259.216,29.942 330.27,173.919 489.16,197.007 374.185,309.08 401.33,467.31 259.216,392.612 117.104,467.31 144.25,309.08 29.274,197.007 188.165,173.919 "/>';
				} else {
					if (self.table.browser == "ie") {
						star.setAttribute("class", "tabulator-star-inactive");
					} else {
						star.classList.replace("tabulator-star-active", "tabulator-star-inactive");
					}

					star.innerHTML = '<polygon fill="#010155" stroke="#686868" stroke-width="37.6152" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="259.216,29.942 330.27,173.919 489.16,197.007 374.185,309.08 401.33,467.31 259.216,392.612 117.104,467.31 144.25,309.08 29.274,197.007 188.165,173.919 "/>';
				}
			});
		}

		//build stars
		function buildStar(i) {

			var starHolder = document.createElement("span");
			var nextStar = star.cloneNode(true);

			stars.push(nextStar);

			starHolder.addEventListener("mouseenter", function (e) {
				e.stopPropagation();
				e.stopImmediatePropagation();
				starChange(i);
			});

			starHolder.addEventListener("mousemove", function (e) {
				e.stopPropagation();
				e.stopImmediatePropagation();
			});

			starHolder.addEventListener("click", function (e) {
				e.stopPropagation();
				e.stopImmediatePropagation();
				success(i);
			});

			starHolder.appendChild(nextStar);
			starsHolder.appendChild(starHolder);
		}

		//handle keyboard navigation value change
		function changeValue(val) {
			value = val;
			starChange(val);
		}

		//style cell
		element.style.whiteSpace = "nowrap";
		element.style.overflow = "hidden";
		element.style.textOverflow = "ellipsis";

		//style holding element
		starsHolder.style.verticalAlign = "middle";
		starsHolder.style.display = "inline-block";
		starsHolder.style.padding = "4px";

		//style star
		star.setAttribute("width", size);
		star.setAttribute("height", size);
		star.setAttribute("viewBox", "0 0 512 512");
		star.setAttribute("xml:space", "preserve");
		star.style.padding = "0 1px";

		//create correct number of stars
		for (var i = 1; i <= maxStars; i++) {
			buildStar(i);
		}

		//ensure value does not exceed number of stars
		value = Math.min(parseInt(value), maxStars);

		// set initial styling of stars
		starChange(value);

		starsHolder.addEventListener("mousemove", function (e) {
			starChange(0);
		});

		starsHolder.addEventListener("click", function (e) {
			success(0);
		});

		element.addEventListener("blur", function (e) {
			cancel();
		});

		//allow key based navigation
		element.addEventListener("keydown", function (e) {
			switch (e.keyCode) {
				case 39:
					//right arrow
					changeValue(value + 1);
					break;

				case 37:
					//left arrow
					changeValue(value - 1);
					break;

				case 13:
					//enter
					success(value);
					break;

				case 27:
					//escape
					cancel();
					break;
			}
		});

		return starsHolder;
	},

	//draggable progress bar
	progress: function progress(cell, onRendered, success, cancel, editorParams) {
		var element = cell.getElement(),
		    max = typeof editorParams.max === "undefined" ? element.getElementsByTagName("div")[0].getAttribute("max") || 100 : editorParams.max,
		    min = typeof editorParams.min === "undefined" ? element.getElementsByTagName("div")[0].getAttribute("min") || 0 : editorParams.min,
		    percent = (max - min) / 100,
		    value = cell.getValue() || 0,
		    handle = document.createElement("div"),
		    bar = document.createElement("div"),
		    mouseDrag,
		    mouseDragWidth;

		//set new value
		function updateValue() {
			var calcVal = percent * Math.round(bar.offsetWidth / (element.clientWidth / 100)) + min;
			success(calcVal);
			element.setAttribute("aria-valuenow", calcVal);
			element.setAttribute("aria-label", value);
		}

		//style handle
		handle.style.position = "absolute";
		handle.style.right = "0";
		handle.style.top = "0";
		handle.style.bottom = "0";
		handle.style.width = "5px";
		handle.classList.add("tabulator-progress-handle");

		//style bar
		bar.style.display = "inline-block";
		bar.style.position = "relative";
		// bar.style.top = "8px";
		// bar.style.bottom = "8px";
		// bar.style.left = "4px";
		// bar.style.marginRight = "4px";
		bar.style.height = "100%";
		bar.style.backgroundColor = "#488CE9";
		bar.style.maxWidth = "100%";
		bar.style.minWidth = "0%";

		//style cell
		element.style.padding = "4px 4px";

		//make sure value is in range
		value = Math.min(parseFloat(value), max);
		value = Math.max(parseFloat(value), min);

		//workout percentage
		value = Math.round((value - min) / percent);
		// bar.style.right = value + "%";
		bar.style.width = value + "%";

		element.setAttribute("aria-valuemin", min);
		element.setAttribute("aria-valuemax", max);

		bar.appendChild(handle);

		handle.addEventListener("mousedown", function (e) {
			mouseDrag = e.screenX;
			mouseDragWidth = bar.offsetWidth;
		});

		handle.addEventListener("mouseover", function () {
			handle.style.cursor = "ew-resize";
		});

		element.addEventListener("mousemove", function (e) {
			if (mouseDrag) {
				bar.style.width = mouseDragWidth + e.screenX - mouseDrag + "px";
			}
		});

		element.addEventListener("mouseup", function (e) {
			if (mouseDrag) {
				e.stopPropagation();
				e.stopImmediatePropagation();

				mouseDrag = false;
				mouseDragWidth = false;

				updateValue();
			}
		});

		//allow key based navigation
		element.addEventListener("keydown", function (e) {
			switch (e.keyCode) {
				case 39:
					//right arrow
					bar.style.width = bar.clientWidth + element.clientWidth / 100 + "px";
					break;

				case 37:
					//left arrow
					bar.style.width = bar.clientWidth - element.clientWidth / 100 + "px";
					break;

				case 13:
					//enter
					updateValue();
					break;

				case 27:
					//escape
					cancel();
					break;

			}
		});

		element.addEventListener("blur", function () {
			cancel();
		});

		return bar;
	},

	//checkbox
	tickCross: function tickCross(cell, onRendered, success, cancel, editorParams) {
		var value = cell.getValue(),
		    input = document.createElement("input"),
		    tristate = editorParams.tristate,
		    indetermValue = typeof editorParams.indeterminateValue === "undefined" ? null : editorParams.indeterminateValue,
		    indetermState = false;

		input.setAttribute("type", "checkbox");
		input.style.marginTop = "5px";
		input.style.boxSizing = "border-box";

		input.value = value;

		if (tristate && (typeof value === "undefined" || value === indetermValue || value === "")) {
			indetermState = true;
			input.indeterminate = true;
		}

		if (this.table.browser != "firefox") {
			//prevent blur issue on mac firefox
			onRendered(function () {
				input.focus();
			});
		}

		input.checked = value === true || value === "true" || value === "True" || value === 1;

		function setValue(blur) {
			if (tristate) {
				if (!blur) {
					if (input.checked && !indetermState) {
						input.checked = false;
						input.indeterminate = true;
						indetermState = true;
						return indetermValue;
					} else {
						indetermState = false;
						return input.checked;
					}
				} else {
					if (indetermState) {
						return indetermValue;
					} else {
						return input.checked;
					}
				}
			} else {
				return input.checked;
			}
		}

		//submit new value on blur
		input.addEventListener("change", function (e) {
			success(setValue());
		});

		input.addEventListener("blur", function (e) {
			success(setValue(true));
		});

		//submit new value on enter
		input.addEventListener("keydown", function (e) {
			if (e.keyCode == 13) {
				success(setValue());
			}
			if (e.keyCode == 27) {
				cancel();
			}
		});

		return input;
	}
};

Tabulator.prototype.registerModule("edit", Edit);