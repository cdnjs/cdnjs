/* Tabulator v4.2.5 (c) Oliver Folkerd */

//public group object
var GroupComponent = function GroupComponent(group) {
	this._group = group;
	this.type = "GroupComponent";
};

GroupComponent.prototype.getKey = function () {
	return this._group.key;
};

GroupComponent.prototype.getElement = function () {
	return this._group.element;
};

GroupComponent.prototype.getRows = function () {
	return this._group.getRows(true);
};

GroupComponent.prototype.getSubGroups = function () {
	return this._group.getSubGroups(true);
};

GroupComponent.prototype.getParentGroup = function () {
	return this._group.parent ? this._group.parent.getComponent() : false;
};

GroupComponent.prototype.getVisibility = function () {
	return this._group.visible;
};

GroupComponent.prototype.show = function () {
	this._group.show();
};

GroupComponent.prototype.hide = function () {
	this._group.hide();
};

GroupComponent.prototype.toggle = function () {
	this._group.toggleVisibility();
};

GroupComponent.prototype._getSelf = function () {
	return this._group;
};

GroupComponent.prototype.getTable = function () {
	return this._group.groupManager.table;
};

//////////////////////////////////////////////////
//////////////// Group Functions /////////////////
//////////////////////////////////////////////////

var Group = function Group(groupManager, parent, level, key, field, generator, oldGroup) {

	this.groupManager = groupManager;
	this.parent = parent;
	this.key = key;
	this.level = level;
	this.field = field;
	this.hasSubGroups = level < groupManager.groupIDLookups.length - 1;
	this.addRow = this.hasSubGroups ? this._addRowToGroup : this._addRow;
	this.type = "group"; //type of element
	this.old = oldGroup;
	this.rows = [];
	this.groups = [];
	this.groupList = [];
	this.generator = generator;
	this.elementContents = false;
	this.height = 0;
	this.outerHeight = 0;
	this.initialized = false;
	this.calcs = {};
	this.initialized = false;
	this.modules = {};
	this.arrowElement = false;

	this.visible = oldGroup ? oldGroup.visible : typeof groupManager.startOpen[level] !== "undefined" ? groupManager.startOpen[level] : groupManager.startOpen[0];

	this.createElements();
	this.addBindings();

	this.createValueGroups();
};

Group.prototype.wipe = function () {
	if (this.groupList.length) {
		this.groupList.forEach(function (group) {
			group.wipe();
		});
	} else {
		this.element = false;
		this.arrowElement = false;
		this.elementContents = false;
	}
};

Group.prototype.createElements = function () {
	this.element = document.createElement("div");
	this.element.classList.add("tabulator-row");
	this.element.classList.add("tabulator-group");
	this.element.classList.add("tabulator-group-level-" + this.level);
	this.element.setAttribute("role", "rowgroup");

	this.arrowElement = document.createElement("div");
	this.arrowElement.classList.add("tabulator-arrow");

	//setup movable rows
	if (this.groupManager.table.options.movableRows !== false && this.groupManager.table.modExists("moveRow")) {
		this.groupManager.table.modules.moveRow.initializeGroupHeader(this);
	}
};

Group.prototype.createValueGroups = function () {
	var _this = this;

	var level = this.level + 1;
	if (this.groupManager.allowedValues && this.groupManager.allowedValues[level]) {
		this.groupManager.allowedValues[level].forEach(function (value) {
			_this._createGroup(value, level);
		});
	}
};

Group.prototype.addBindings = function () {
	var self = this,
	    dblTap,
	    tapHold,
	    tap,
	    toggleElement;

	//handle group click events
	if (self.groupManager.table.options.groupClick) {
		self.element.addEventListener("click", function (e) {
			self.groupManager.table.options.groupClick(e, self.getComponent());
		});
	}

	if (self.groupManager.table.options.groupDblClick) {
		self.element.addEventListener("dblclick", function (e) {
			self.groupManager.table.options.groupDblClick(e, self.getComponent());
		});
	}

	if (self.groupManager.table.options.groupContext) {
		self.element.addEventListener("contextmenu", function (e) {
			self.groupManager.table.options.groupContext(e, self.getComponent());
		});
	}

	if (self.groupManager.table.options.groupTap) {

		tap = false;

		self.element.addEventListener("touchstart", function (e) {
			tap = true;
		});

		self.element.addEventListener("touchend", function (e) {
			if (tap) {
				self.groupManager.table.options.groupTap(e, self.getComponent());
			}

			tap = false;
		});
	}

	if (self.groupManager.table.options.groupDblTap) {

		dblTap = null;

		self.element.addEventListener("touchend", function (e) {

			if (dblTap) {
				clearTimeout(dblTap);
				dblTap = null;

				self.groupManager.table.options.groupDblTap(e, self.getComponent());
			} else {

				dblTap = setTimeout(function () {
					clearTimeout(dblTap);
					dblTap = null;
				}, 300);
			}
		});
	}

	if (self.groupManager.table.options.groupTapHold) {

		tapHold = null;

		self.element.addEventListener("touchstart", function (e) {
			clearTimeout(tapHold);

			tapHold = setTimeout(function () {
				clearTimeout(tapHold);
				tapHold = null;
				tap = false;
				self.groupManager.table.options.groupTapHold(e, self.getComponent());
			}, 1000);
		});

		self.element.addEventListener("touchend", function (e) {
			clearTimeout(tapHold);
			tapHold = null;
		});
	}

	if (self.groupManager.table.options.groupToggleElement) {
		toggleElement = self.groupManager.table.options.groupToggleElement == "arrow" ? self.arrowElement : self.element;

		toggleElement.addEventListener("click", function (e) {
			e.stopPropagation();
			e.stopImmediatePropagation();
			self.toggleVisibility();
		});
	}
};

Group.prototype._createGroup = function (groupID, level) {
	var groupKey = level + "_" + groupID;
	var group = new Group(this.groupManager, this, level, groupID, this.groupManager.groupIDLookups[level].field, this.groupManager.headerGenerator[level] || this.groupManager.headerGenerator[0], this.old ? this.old.groups[groupKey] : false);

	this.groups[groupKey] = group;
	this.groupList.push(group);
};

Group.prototype._addRowToGroup = function (row) {

	var level = this.level + 1;

	if (this.hasSubGroups) {
		var groupID = this.groupManager.groupIDLookups[level].func(row.getData()),
		    groupKey = level + "_" + groupID;

		if (this.groupManager.allowedValues && this.groupManager.allowedValues[level]) {
			if (this.groups[groupKey]) {
				this.groups[groupKey].addRow(row);
			}
		} else {
			if (!this.groups[groupKey]) {
				this._createGroup(groupID, level);
			}

			this.groups[groupKey].addRow(row);
		}
	}
};

Group.prototype._addRow = function (row) {
	this.rows.push(row);
	row.modules.group = this;
};

Group.prototype.insertRow = function (row, to, after) {
	var data = this.conformRowData({});

	row.updateData(data);

	var toIndex = this.rows.indexOf(to);

	if (toIndex > -1) {
		if (after) {
			this.rows.splice(toIndex + 1, 0, row);
		} else {
			this.rows.splice(toIndex, 0, row);
		}
	} else {
		if (after) {
			this.rows.push(row);
		} else {
			this.rows.unshift(row);
		}
	}

	row.modules.group = this;

	this.generateGroupHeaderContents();

	if (this.groupManager.table.modExists("columnCalcs") && this.groupManager.table.options.columnCalcs != "table") {
		this.groupManager.table.modules.columnCalcs.recalcGroup(this);
	}

	this.groupManager.updateGroupRows(true);
};

Group.prototype.scrollHeader = function (left) {
	this.arrowElement.style.marginLeft = left;

	this.groupList.forEach(function (child) {
		child.scrollHeader(left);
	});
};

Group.prototype.getRowIndex = function (row) {};

//update row data to match grouping contraints
Group.prototype.conformRowData = function (data) {
	if (this.field) {
		data[this.field] = this.key;
	} else {
		console.warn("Data Conforming Error - Cannot conform row data to match new group as groupBy is a function");
	}

	if (this.parent) {
		data = this.parent.conformRowData(data);
	}

	return data;
};

Group.prototype.removeRow = function (row) {
	var index = this.rows.indexOf(row);
	var el = row.getElement();

	if (index > -1) {
		this.rows.splice(index, 1);
	}

	if (!this.groupManager.table.options.groupValues && !this.rows.length) {
		if (this.parent) {
			this.parent.removeGroup(this);
		} else {
			this.groupManager.removeGroup(this);
		}

		this.groupManager.updateGroupRows(true);
	} else {

		if (el.parentNode) {
			el.parentNode.removeChild(el);
		}

		this.generateGroupHeaderContents();

		if (this.groupManager.table.modExists("columnCalcs") && this.groupManager.table.options.columnCalcs != "table") {
			this.groupManager.table.modules.columnCalcs.recalcGroup(this);
		}
	}
};

Group.prototype.removeGroup = function (group) {
	var groupKey = group.level + "_" + group.key,
	    index;

	if (this.groups[groupKey]) {
		delete this.groups[groupKey];

		index = this.groupList.indexOf(group);

		if (index > -1) {
			this.groupList.splice(index, 1);
		}

		if (!this.groupList.length) {
			if (this.parent) {
				this.parent.removeGroup(this);
			} else {
				this.groupManager.removeGroup(this);
			}
		}
	}
};

Group.prototype.getHeadersAndRows = function (noCalc) {
	var output = [];

	output.push(this);

	this._visSet();

	if (this.visible) {

		if (this.groupList.length) {
			this.groupList.forEach(function (group) {
				output = output.concat(group.getHeadersAndRows(noCalc));
			});
		} else {
			if (!noCalc && this.groupManager.table.options.columnCalcs != "table" && this.groupManager.table.modExists("columnCalcs") && this.groupManager.table.modules.columnCalcs.hasTopCalcs()) {
				if (this.calcs.top) {
					this.calcs.top.detachElement();
				}

				this.calcs.top = this.groupManager.table.modules.columnCalcs.generateTopRow(this.rows);
				output.push(this.calcs.top);
			}

			output = output.concat(this.rows);

			if (!noCalc && this.groupManager.table.options.columnCalcs != "table" && this.groupManager.table.modExists("columnCalcs") && this.groupManager.table.modules.columnCalcs.hasBottomCalcs()) {

				if (this.calcs.bottom) {
					this.calcs.bottom.detachElement();
				}

				this.calcs.bottom = this.groupManager.table.modules.columnCalcs.generateBottomRow(this.rows);
				output.push(this.calcs.bottom);
			}
		}
	} else {
		if (!this.groupList.length && this.groupManager.table.options.columnCalcs != "table" && this.groupManager.table.options.groupClosedShowCalcs) {
			if (this.groupManager.table.modExists("columnCalcs")) {
				if (!noCalc && this.groupManager.table.modules.columnCalcs.hasTopCalcs()) {
					if (this.calcs.top) {
						this.calcs.top.detachElement();
					}
					this.calcs.top = this.groupManager.table.modules.columnCalcs.generateTopRow(this.rows);
					output.push(this.calcs.top);
				}

				if (!noCalc && this.groupManager.table.modules.columnCalcs.hasBottomCalcs()) {
					if (this.calcs.bottom) {
						this.calcs.bottom.detachElement();
					}
					this.calcs.bottom = this.groupManager.table.modules.columnCalcs.generateBottomRow(this.rows);
					output.push(this.calcs.bottom);
				}
			}
		}
	}

	return output;
};

Group.prototype.getData = function (visible, transform) {
	var self = this,
	    output = [];

	this._visSet();

	if (!visible || visible && this.visible) {
		this.rows.forEach(function (row) {
			output.push(row.getData(transform || "data"));
		});
	}

	return output;
};

// Group.prototype.getRows = function(){
// 	this._visSet();

// 	return this.visible ? this.rows : [];
// };

Group.prototype.getRowCount = function () {
	var count = 0;

	if (this.groupList.length) {
		this.groupList.forEach(function (group) {
			count += group.getRowCount();
		});
	} else {
		count = this.rows.length;
	}
	return count;
};

Group.prototype.toggleVisibility = function () {
	if (this.visible) {
		this.hide();
	} else {
		this.show();
	}
};

Group.prototype.hide = function () {
	this.visible = false;

	if (this.groupManager.table.rowManager.getRenderMode() == "classic" && !this.groupManager.table.options.pagination) {

		this.element.classList.remove("tabulator-group-visible");

		if (this.groupList.length) {
			this.groupList.forEach(function (group) {

				var rows = group.getHeadersAndRows();

				rows.forEach(function (row) {
					row.detachElement();
				});
			});
		} else {
			this.rows.forEach(function (row) {
				var rowEl = row.getElement();
				rowEl.parentNode.removeChild(rowEl);
			});
		}

		this.groupManager.table.rowManager.setDisplayRows(this.groupManager.updateGroupRows(), this.groupManager.getDisplayIndex());

		this.groupManager.table.rowManager.checkClassicModeGroupHeaderWidth();
	} else {
		this.groupManager.updateGroupRows(true);
	}

	this.groupManager.table.options.groupVisibilityChanged.call(this.table, this.getComponent(), false);
};

Group.prototype.show = function () {
	var self = this;

	self.visible = true;

	if (this.groupManager.table.rowManager.getRenderMode() == "classic" && !this.groupManager.table.options.pagination) {

		this.element.classList.add("tabulator-group-visible");

		var prev = self.getElement();

		if (this.groupList.length) {
			this.groupList.forEach(function (group) {
				var rows = group.getHeadersAndRows();

				rows.forEach(function (row) {
					var rowEl = row.getElement();
					prev.parentNode.insertBefore(rowEl, prev.nextSibling);
					row.initialize();
					prev = rowEl;
				});
			});
		} else {
			self.rows.forEach(function (row) {
				var rowEl = row.getElement();
				prev.parentNode.insertBefore(rowEl, prev.nextSibling);
				row.initialize();
				prev = rowEl;
			});
		}

		this.groupManager.table.rowManager.setDisplayRows(this.groupManager.updateGroupRows(), this.groupManager.getDisplayIndex());

		this.groupManager.table.rowManager.checkClassicModeGroupHeaderWidth();
	} else {
		this.groupManager.updateGroupRows(true);
	}

	this.groupManager.table.options.groupVisibilityChanged.call(this.table, this.getComponent(), true);
};

Group.prototype._visSet = function () {
	var data = [];

	if (typeof this.visible == "function") {

		this.rows.forEach(function (row) {
			data.push(row.getData());
		});

		this.visible = this.visible(this.key, this.getRowCount(), data, this.getComponent());
	}
};

Group.prototype.getRowGroup = function (row) {
	var match = false;
	if (this.groupList.length) {
		this.groupList.forEach(function (group) {
			var result = group.getRowGroup(row);

			if (result) {
				match = result;
			}
		});
	} else {
		if (this.rows.find(function (item) {
			return item === row;
		})) {
			match = this;
		}
	}

	return match;
};

Group.prototype.getSubGroups = function (component) {
	var output = [];

	this.groupList.forEach(function (child) {
		output.push(component ? child.getComponent() : child);
	});

	return output;
};

Group.prototype.getRows = function (compoment) {
	var output = [];

	this.rows.forEach(function (row) {
		output.push(compoment ? row.getComponent() : row);
	});

	return output;
};

Group.prototype.generateGroupHeaderContents = function () {
	var data = [];

	this.rows.forEach(function (row) {
		data.push(row.getData());
	});

	this.elementContents = this.generator(this.key, this.getRowCount(), data, this.getComponent());

	while (this.element.firstChild) {
		this.element.removeChild(this.element.firstChild);
	}if (typeof this.elementContents === "string") {
		this.element.innerHTML = this.elementContents;
	} else {
		this.element.appendChild(this.elementContents);
	}

	this.element.insertBefore(this.arrowElement, this.element.firstChild);
};

////////////// Standard Row Functions //////////////

Group.prototype.getElement = function () {
	this.addBindingsd = false;

	this._visSet();

	if (this.visible) {
		this.element.classList.add("tabulator-group-visible");
	} else {
		this.element.classList.remove("tabulator-group-visible");
	}

	for (var i = 0; i < this.element.childNodes.length; ++i) {
		this.element.childNodes[i].parentNode.removeChild(this.element.childNodes[i]);
	}

	this.generateGroupHeaderContents();

	// this.addBindings();

	return this.element;
};

Group.prototype.detachElement = function () {
	if (this.element && this.element.parentNode) {
		this.element.parentNode.removeChild(this.element);
	}
};

//normalize the height of elements in the row
Group.prototype.normalizeHeight = function () {
	this.setHeight(this.element.clientHeight);
};

Group.prototype.initialize = function (force) {
	if (!this.initialized || force) {
		this.normalizeHeight();
		this.initialized = true;
	}
};

Group.prototype.reinitialize = function () {
	this.initialized = false;
	this.height = 0;

	if (Tabulator.prototype.helpers.elVisible(this.element)) {
		this.initialize(true);
	}
};

Group.prototype.setHeight = function (height) {
	if (this.height != height) {
		this.height = height;
		this.outerHeight = this.element.offsetHeight;
	}
};

//return rows outer height
Group.prototype.getHeight = function () {
	return this.outerHeight;
};

Group.prototype.getGroup = function () {
	return this;
};

Group.prototype.reinitializeHeight = function () {};
Group.prototype.calcHeight = function () {};
Group.prototype.setCellHeight = function () {};
Group.prototype.clearCellHeight = function () {};

//////////////// Object Generation /////////////////
Group.prototype.getComponent = function () {
	return new GroupComponent(this);
};

//////////////////////////////////////////////////
////////////// Group Row Extension ///////////////
//////////////////////////////////////////////////

var GroupRows = function GroupRows(table) {

	this.table = table; //hold Tabulator object

	this.groupIDLookups = false; //enable table grouping and set field to group by
	this.startOpen = [function () {
		return false;
	}]; //starting state of group
	this.headerGenerator = [function () {
		return "";
	}];
	this.groupList = []; //ordered list of groups
	this.allowedValues = false;
	this.groups = {}; //hold row groups
	this.displayIndex = 0; //index in display pipeline
};

//initialize group configuration
GroupRows.prototype.initialize = function () {
	var self = this,
	    groupBy = self.table.options.groupBy,
	    startOpen = self.table.options.groupStartOpen,
	    groupHeader = self.table.options.groupHeader;

	this.allowedValues = self.table.options.groupValues;

	self.headerGenerator = [function () {
		return "";
	}];
	this.startOpen = [function () {
		return false;
	}]; //starting state of group

	self.table.modules.localize.bind("groups|item", function (langValue, lang) {
		self.headerGenerator[0] = function (value, count, data) {
			//header layout function
			return (typeof value === "undefined" ? "" : value) + "<span>(" + count + " " + (count === 1 ? langValue : lang.groups.items) + ")</span>";
		};
	});

	this.groupIDLookups = [];

	if (Array.isArray(groupBy) || groupBy) {
		if (this.table.modExists("columnCalcs") && this.table.options.columnCalcs != "table" && this.table.options.columnCalcs != "both") {
			this.table.modules.columnCalcs.removeCalcs();
		}
	} else {
		if (this.table.modExists("columnCalcs") && this.table.options.columnCalcs != "group") {

			var cols = this.table.columnManager.getRealColumns();

			cols.forEach(function (col) {
				if (col.definition.topCalc) {
					self.table.modules.columnCalcs.initializeTopRow();
				}

				if (col.definition.bottomCalc) {
					self.table.modules.columnCalcs.initializeBottomRow();
				}
			});
		}
	}

	if (!Array.isArray(groupBy)) {
		groupBy = [groupBy];
	}

	groupBy.forEach(function (group, i) {
		var lookupFunc, column;

		if (typeof group == "function") {
			lookupFunc = group;
		} else {
			column = self.table.columnManager.getColumnByField(group);

			if (column) {
				lookupFunc = function lookupFunc(data) {
					return column.getFieldValue(data);
				};
			} else {
				lookupFunc = function lookupFunc(data) {
					return data[group];
				};
			}
		}

		self.groupIDLookups.push({
			field: typeof group === "function" ? false : group,
			func: lookupFunc,
			values: self.allowedValues ? self.allowedValues[i] : false
		});
	});

	if (startOpen) {

		if (!Array.isArray(startOpen)) {
			startOpen = [startOpen];
		}

		startOpen.forEach(function (level) {
			level = typeof level == "function" ? level : function () {
				return true;
			};
		});

		self.startOpen = startOpen;
	}

	if (groupHeader) {
		self.headerGenerator = Array.isArray(groupHeader) ? groupHeader : [groupHeader];
	}

	this.initialized = true;
};

GroupRows.prototype.setDisplayIndex = function (index) {
	this.displayIndex = index;
};

GroupRows.prototype.getDisplayIndex = function () {
	return this.displayIndex;
};

//return appropriate rows with group headers
GroupRows.prototype.getRows = function (rows) {
	if (this.groupIDLookups.length) {

		this.table.options.dataGrouping.call(this.table);

		this.generateGroups(rows);

		if (this.table.options.dataGrouped) {
			this.table.options.dataGrouped.call(this.table, this.getGroups(true));
		}

		return this.updateGroupRows();
	} else {
		return rows.slice(0);
	}
};

GroupRows.prototype.getGroups = function (compoment) {
	var groupComponents = [];

	this.groupList.forEach(function (group) {
		groupComponents.push(compoment ? group.getComponent() : group);
	});

	return groupComponents;
};

GroupRows.prototype.wipe = function () {
	this.groupList.forEach(function (group) {
		group.wipe();
	});
};

GroupRows.prototype.pullGroupListData = function (groupList) {
	var self = this;
	var groupListData = [];

	groupList.forEach(function (group) {
		var groupHeader = {};
		groupHeader.level = 0;
		groupHeader.rowCount = 0;
		groupHeader.headerContent = "";
		var childData = [];

		if (group.hasSubGroups) {
			childData = self.pullGroupListData(group.groupList);

			groupHeader.level = group.level;
			groupHeader.rowCount = childData.length - group.groupList.length; // data length minus number of sub-headers
			groupHeader.headerContent = group.generator(group.key, groupHeader.rowCount, group.rows, group);

			groupListData.push(groupHeader);
			groupListData = groupListData.concat(childData);
		} else {
			groupHeader.level = group.level;
			groupHeader.headerContent = group.generator(group.key, group.rows.length, group.rows, group);
			groupHeader.rowCount = group.getRows().length;

			groupListData.push(groupHeader);

			group.getRows().forEach(function (row) {
				groupListData.push(row.getData("data"));
			});
		}
	});

	return groupListData;
};

GroupRows.prototype.getGroupedData = function () {

	return this.pullGroupListData(this.groupList);
};

GroupRows.prototype.getRowGroup = function (row) {
	var match = false;

	this.groupList.forEach(function (group) {
		var result = group.getRowGroup(row);

		if (result) {
			match = result;
		}
	});

	return match;
};

GroupRows.prototype.countGroups = function () {
	return this.groupList.length;
};

GroupRows.prototype.generateGroups = function (rows) {
	var self = this,
	    oldGroups = self.groups;

	self.groups = {};
	self.groupList = [];

	if (this.allowedValues && this.allowedValues[0]) {
		this.allowedValues[0].forEach(function (value) {
			self.createGroup(value, 0, oldGroups);
		});

		rows.forEach(function (row) {
			self.assignRowToExistingGroup(row, oldGroups);
		});
	} else {
		rows.forEach(function (row) {
			self.assignRowToGroup(row, oldGroups);
		});
	}
};

GroupRows.prototype.createGroup = function (groupID, level, oldGroups) {
	var groupKey = level + "_" + groupID,
	    group;

	oldGroups = oldGroups || [];

	group = new Group(this, false, level, groupID, this.groupIDLookups[0].field, this.headerGenerator[0], oldGroups[groupKey]);

	this.groups[groupKey] = group;
	this.groupList.push(group);
};

GroupRows.prototype.assignRowToGroup = function (row, oldGroups) {
	var groupID = this.groupIDLookups[0].func(row.getData()),
	    groupKey = "0_" + groupID;

	if (!this.groups[groupKey]) {
		this.createGroup(groupID, 0, oldGroups);
	}

	this.groups[groupKey].addRow(row);
};

GroupRows.prototype.assignRowToExistingGroup = function (row, oldGroups) {
	var groupID = this.groupIDLookups[0].func(row.getData()),
	    groupKey = "0_" + groupID;

	if (this.groups[groupKey]) {
		this.groups[groupKey].addRow(row);
	}
};

GroupRows.prototype.assignRowToGroup = function (row, oldGroups) {
	var groupID = this.groupIDLookups[0].func(row.getData()),
	    newGroupNeeded = !this.groups["0_" + groupID];

	if (newGroupNeeded) {
		this.createGroup(groupID, 0, oldGroups);
	}

	this.groups["0_" + groupID].addRow(row);

	return !newGroupNeeded;
};

GroupRows.prototype.updateGroupRows = function (force) {
	var self = this,
	    output = [],
	    oldRowCount;

	self.groupList.forEach(function (group) {
		output = output.concat(group.getHeadersAndRows());
	});

	//force update of table display
	if (force) {

		var displayIndex = self.table.rowManager.setDisplayRows(output, this.getDisplayIndex());

		if (displayIndex !== true) {
			this.setDisplayIndex(displayIndex);
		}

		self.table.rowManager.refreshActiveData("group", true, true);
	}

	return output;
};

GroupRows.prototype.scrollHeaders = function (left) {
	left = left + "px";

	this.groupList.forEach(function (group) {
		group.scrollHeader(left);
	});
};

GroupRows.prototype.removeGroup = function (group) {
	var groupKey = group.level + "_" + group.key,
	    index;

	if (this.groups[groupKey]) {
		delete this.groups[groupKey];

		index = this.groupList.indexOf(group);

		if (index > -1) {
			this.groupList.splice(index, 1);
		}
	}
};

Tabulator.prototype.registerModule("groupRows", GroupRows);